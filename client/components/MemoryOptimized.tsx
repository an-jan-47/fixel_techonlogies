import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  lazy,
  Suspense,
} from "react";
import {
  useMemoryMonitor,
  usePerformanceConfig,
  useLazyComponent,
} from "../hooks/use-device-optimization";

// Memory-efficient lazy loader with cleanup
export const MemoryEfficientLoader: React.FC<{
  children: React.ReactNode;
  threshold?: number;
  cleanupDelay?: number;
  fallback?: React.ReactNode;
}> = ({ children, threshold = 200, cleanupDelay = 30000, fallback }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [hasRendered, setHasRendered] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver>();
  const cleanupTimeoutRef = useRef<NodeJS.Timeout>();
  const { isHighMemoryUsage } = useMemoryMonitor();
  const config = usePerformanceConfig();

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldRender(true);
            setHasRendered(true);

            // Clear any pending cleanup
            if (cleanupTimeoutRef.current) {
              clearTimeout(cleanupTimeoutRef.current);
              cleanupTimeoutRef.current = undefined;
            }
          } else if (hasRendered && (isHighMemoryUsage || config.isLowEnd)) {
            // Schedule cleanup for non-visible components on low-end devices
            cleanupTimeoutRef.current = setTimeout(() => {
              setShouldRender(false);
            }, cleanupDelay);
          }
        });
      },
      {
        rootMargin: `${threshold}px 0px`,
        threshold: 0.01,
      },
    );

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (cleanupTimeoutRef.current) {
        clearTimeout(cleanupTimeoutRef.current);
      }
    };
  }, [
    threshold,
    cleanupDelay,
    hasRendered,
    isHighMemoryUsage,
    config.isLowEnd,
  ]);

  return (
    <div ref={elementRef}>
      {shouldRender
        ? children
        : fallback || <div style={{ height: "200px" }} />}
    </div>
  );
};

// Virtualized list component for large datasets
interface VirtualizedListProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
  overscan?: number;
}

export function VirtualizedList<T>({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  className = "",
  overscan = 3,
}: VirtualizedListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const config = usePerformanceConfig();

  // Adapt overscan for low-end devices
  const adaptedOverscan = config.isLowEnd ? Math.min(overscan, 1) : overscan;

  const visibleRange = useMemo(() => {
    const start = Math.floor(scrollTop / itemHeight);
    const end = Math.min(
      start + Math.ceil(containerHeight / itemHeight) + adaptedOverscan,
      items.length,
    );

    return {
      start: Math.max(0, start - adaptedOverscan),
      end,
    };
  }, [scrollTop, itemHeight, containerHeight, items.length, adaptedOverscan]);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  const visibleItems = useMemo(() => {
    return items.slice(visibleRange.start, visibleRange.end).map((item, i) => ({
      item,
      index: visibleRange.start + i,
    }));
  }, [items, visibleRange]);

  return (
    <div
      className={className}
      style={{ height: containerHeight, overflow: "auto" }}
      onScroll={handleScroll}
    >
      <div style={{ height: items.length * itemHeight, position: "relative" }}>
        {visibleItems.map(({ item, index }) => (
          <div
            key={index}
            style={{
              position: "absolute",
              top: index * itemHeight,
              left: 0,
              right: 0,
              height: itemHeight,
            }}
          >
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </div>
  );
}

// Memory-aware section component
export const MemoryAwareSection: React.FC<{
  children: React.ReactNode;
  className?: string;
  priority?: "high" | "medium" | "low";
  fallback?: React.ReactNode;
}> = ({ children, className = "", priority = "medium", fallback }) => {
  const { memoryUsagePercentage } = useMemoryMonitor();
  const config = usePerformanceConfig();
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Adjust rendering based on memory usage and priority
    if (config.isLowEnd && memoryUsagePercentage > 70) {
      if (priority === "low") {
        setShouldRender(false);
      } else if (priority === "medium" && memoryUsagePercentage > 85) {
        setShouldRender(false);
      }
    } else if (memoryUsagePercentage < 50) {
      setShouldRender(true);
    }
  }, [memoryUsagePercentage, priority, config.isLowEnd]);

  if (!shouldRender) {
    return fallback ? (
      <div className={className}>{fallback}</div>
    ) : (
      <div className={`${className} h-32 bg-gray-100 animate-pulse`} />
    );
  }

  return <div className={className}>{children}</div>;
};

// Optimized component factory for lazy loading
export function createOptimizedComponent<P = {}>(
  importFunc: () => Promise<{ default: React.ComponentType<P> }>,
  fallback?: React.ReactNode,
): React.ComponentType<P> {
  const LazyComponent = lazy(importFunc);

  return React.memo((props: P) => {
    const config = usePerformanceConfig();

    return (
      <Suspense
        fallback={
          fallback || (
            <div className="animate-pulse bg-gray-200 h-32 rounded-lg" />
          )
        }
      >
        <LazyComponent {...(props as any)} />
      </Suspense>
    );
  }) as React.ComponentType<P>;
}

// Resource pool for managing expensive operations
class ResourcePool<T> {
  private pool: T[] = [];
  private factory: () => T;
  private cleanup?: (item: T) => void;
  private maxSize: number;

  constructor(
    factory: () => T,
    maxSize: number = 10,
    cleanup?: (item: T) => void,
  ) {
    this.factory = factory;
    this.maxSize = maxSize;
    this.cleanup = cleanup;
  }

  acquire(): T {
    if (this.pool.length > 0) {
      return this.pool.pop()!;
    }
    return this.factory();
  }

  release(item: T): void {
    if (this.pool.length < this.maxSize) {
      this.pool.push(item);
    } else if (this.cleanup) {
      this.cleanup(item);
    }
  }

  clear(): void {
    if (this.cleanup) {
      this.pool.forEach(this.cleanup);
    }
    this.pool = [];
  }
}

// Hook for using resource pools
export function useResourcePool<T>(
  factory: () => T,
  cleanup?: (item: T) => void,
  maxSize?: number,
) {
  const poolRef = useRef<ResourcePool<T>>();
  const config = usePerformanceConfig();

  // Adjust pool size based on device capabilities
  const adaptedMaxSize = maxSize || (config.isLowEnd ? 3 : 10);

  if (!poolRef.current) {
    poolRef.current = new ResourcePool(factory, adaptedMaxSize, cleanup);
  }

  useEffect(() => {
    return () => {
      poolRef.current?.clear();
    };
  }, []);

  return poolRef.current;
}

// Memory-efficient event handler
export function useOptimizedEventHandler<T extends (...args: any[]) => any>(
  handler: T,
  deps: React.DependencyList,
): T {
  const handlerRef = useRef<T>(handler);
  const { memoryUsagePercentage } = useMemoryMonitor();

  // Update handler reference only when dependencies change or memory is low
  const shouldUpdate = useMemo(() => {
    return memoryUsagePercentage < 80;
  }, [memoryUsagePercentage]);

  useEffect(() => {
    if (shouldUpdate) {
      handlerRef.current = handler;
    }
  }, [...deps, shouldUpdate]);

  return useCallback(
    ((...args: Parameters<T>) => {
      return handlerRef.current(...args);
    }) as T,
    [shouldUpdate],
  );
}

// Component cleanup utility
export function useComponentCleanup(
  cleanup: () => void,
  shouldCleanup: boolean = false,
) {
  const cleanupRef = useRef(cleanup);
  cleanupRef.current = cleanup;

  useEffect(() => {
    if (shouldCleanup) {
      return () => {
        cleanupRef.current();
      };
    }
  }, [shouldCleanup]);
}

// Progressive enhancement hook
export function useProgressiveEnhancement<T>(
  baseValue: T,
  enhancedValue: T,
  condition?: boolean,
): T {
  const config = usePerformanceConfig();

  const shouldEnhance = condition !== undefined ? condition : !config.isLowEnd;

  return shouldEnhance ? enhancedValue : baseValue;
}
