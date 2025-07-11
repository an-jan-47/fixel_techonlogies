import { useState, useEffect, useCallback, useRef } from "react";

// Device capability and performance detection
export interface DeviceCapabilities {
  isLowEnd: boolean;
  memorySize: number;
  cores: number;
  connectionSpeed: "slow" | "medium" | "fast";
  reducedMotion: boolean;
  isMobile: boolean;
  batteryLevel?: number;
  isCharging?: boolean;
  devicePixelRatio: number;
  viewportSize: "small" | "medium" | "large";
}

export interface PerformanceConfig {
  enableAnimations: boolean;
  animationDuration: number;
  enableParticles: boolean;
  enableBlurEffects: boolean;
  enableGradients: boolean;
  maxConcurrentAnimations: number;
  imageLazyLoadThreshold: number;
  enableHoverEffects: boolean;
  enableTransitions: boolean;
  frameRateTarget: number;
  // Device capabilities for convenience
  isLowEnd: boolean;
  isMobile: boolean;
  reducedMotion: boolean;
  connectionSpeed: "slow" | "medium" | "fast";
}

// Device detection hook
export function useDeviceCapabilities(): DeviceCapabilities {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    isLowEnd: false,
    memorySize: 4,
    cores: 4,
    connectionSpeed: "fast",
    reducedMotion: false,
    isMobile: false,
    devicePixelRatio: 1,
    viewportSize: "large",
  });

  useEffect(() => {
    const detectCapabilities = () => {
      // Memory detection
      const memorySize = (navigator as any).deviceMemory || 4;

      // CPU cores detection
      const cores = navigator.hardwareConcurrency || 4;

      // Connection speed detection
      const connection =
        (navigator as any).connection ||
        (navigator as any).mozConnection ||
        (navigator as any).webkitConnection;
      let connectionSpeed: "slow" | "medium" | "fast" = "fast";

      if (connection) {
        const effectiveType = connection.effectiveType;
        if (effectiveType === "slow-2g" || effectiveType === "2g") {
          connectionSpeed = "slow";
        } else if (effectiveType === "3g") {
          connectionSpeed = "medium";
        }
      }

      // Reduced motion preference
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      // Mobile detection
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        ) || window.innerWidth <= 768;

      // Device pixel ratio
      const devicePixelRatio = window.devicePixelRatio || 1;

      // Viewport size classification
      const width = window.innerWidth;
      const viewportSize: "small" | "medium" | "large" =
        width <= 640 ? "small" : width <= 1024 ? "medium" : "large";

      // Low-end device detection algorithm
      const isLowEnd =
        memorySize <= 2 ||
        cores <= 2 ||
        connectionSpeed === "slow" ||
        (isMobile && devicePixelRatio <= 1.5) ||
        reducedMotion;

      const newCapabilities: DeviceCapabilities = {
        isLowEnd,
        memorySize,
        cores,
        connectionSpeed,
        reducedMotion,
        isMobile,
        devicePixelRatio,
        viewportSize,
      };

      // Battery API detection (experimental)
      if ("getBattery" in navigator) {
        (navigator as any)
          .getBattery()
          .then((battery: any) => {
            newCapabilities.batteryLevel = battery.level;
            newCapabilities.isCharging = battery.charging;
            setCapabilities((prev) => ({ ...prev, ...newCapabilities }));
          })
          .catch(() => {
            setCapabilities(newCapabilities);
          });
      } else {
        setCapabilities(newCapabilities);
      }
    };

    detectCapabilities();

    // Listen for changes
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    mediaQuery.addEventListener("change", detectCapabilities);

    window.addEventListener("resize", detectCapabilities);

    return () => {
      mediaQuery.removeEventListener("change", detectCapabilities);
      window.removeEventListener("resize", detectCapabilities);
    };
  }, []);

  return capabilities;
}

// Performance configuration hook
export function usePerformanceConfig(): PerformanceConfig {
  const capabilities = useDeviceCapabilities();
  const [config, setConfig] = useState<PerformanceConfig>({
    enableAnimations: true,
    animationDuration: 300,
    enableParticles: true,
    enableBlurEffects: true,
    enableGradients: true,
    maxConcurrentAnimations: 10,
    imageLazyLoadThreshold: 200,
    enableHoverEffects: true,
    enableTransitions: true,
    frameRateTarget: 60,
  });

  useEffect(() => {
    const optimizedConfig: PerformanceConfig = {
      // Base configuration
      enableAnimations: !capabilities.reducedMotion,
      animationDuration: capabilities.isLowEnd ? 150 : 300,
      enableParticles: !capabilities.isLowEnd && !capabilities.isMobile,
      enableBlurEffects: !capabilities.isLowEnd && capabilities.cores > 2,
      enableGradients: !capabilities.isLowEnd || capabilities.cores > 2,
      maxConcurrentAnimations: capabilities.isLowEnd ? 3 : 10,
      imageLazyLoadThreshold:
        capabilities.connectionSpeed === "slow" ? 50 : 200,
      enableHoverEffects: !capabilities.isMobile && !capabilities.isLowEnd,
      enableTransitions: !capabilities.reducedMotion,
      frameRateTarget: capabilities.isLowEnd ? 30 : 60,
    };

    // Additional optimizations for very low-end devices
    if (capabilities.memorySize <= 1 || capabilities.cores <= 1) {
      optimizedConfig.enableAnimations = false;
      optimizedConfig.enableParticles = false;
      optimizedConfig.enableBlurEffects = false;
      optimizedConfig.maxConcurrentAnimations = 1;
      optimizedConfig.frameRateTarget = 24;
    }

    // Battery optimization
    if (
      capabilities.batteryLevel !== undefined &&
      capabilities.batteryLevel < 0.2 &&
      !capabilities.isCharging
    ) {
      optimizedConfig.enableAnimations = false;
      optimizedConfig.enableParticles = false;
      optimizedConfig.enableBlurEffects = false;
      optimizedConfig.frameRateTarget = 24;
    }

    setConfig(optimizedConfig);
  }, [capabilities]);

  return config;
}

// Adaptive frame rate hook
export function useAdaptiveFrameRate() {
  const { frameRateTarget } = usePerformanceConfig();
  const [currentFPS, setCurrentFPS] = useState(60);
  const [adaptedTarget, setAdaptedTarget] = useState(frameRateTarget);
  const frameCount = useRef(0);
  const lastTime = useRef(Date.now());
  const rafId = useRef<number>();
  const performanceHistory = useRef<number[]>([]);

  const measureAndAdapt = useCallback(() => {
    frameCount.current++;
    const currentTime = Date.now();

    if (currentTime - lastTime.current >= 1000) {
      const fps = frameCount.current;
      setCurrentFPS(fps);

      // Track performance history
      performanceHistory.current.push(fps);
      if (performanceHistory.current.length > 10) {
        performanceHistory.current.shift();
      }

      // Adaptive logic
      const avgFPS =
        performanceHistory.current.reduce((a, b) => a + b, 0) /
        performanceHistory.current.length;

      if (avgFPS < frameRateTarget * 0.8) {
        // Performance is struggling, reduce target
        setAdaptedTarget(Math.max(24, frameRateTarget * 0.7));
      } else if (avgFPS > frameRateTarget * 1.1) {
        // Performance is good, increase target if possible
        setAdaptedTarget(Math.min(60, frameRateTarget * 1.2));
      }

      frameCount.current = 0;
      lastTime.current = currentTime;
    }

    rafId.current = requestAnimationFrame(measureAndAdapt);
  }, [frameRateTarget]);

  useEffect(() => {
    rafId.current = requestAnimationFrame(measureAndAdapt);

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [measureAndAdapt]);

  return { currentFPS, adaptedTarget, frameRateTarget };
}

// Memory usage monitoring
export function useMemoryMonitor() {
  const [memoryUsage, setMemoryUsage] = useState({
    used: 0,
    total: 0,
    limit: 0,
  });

  useEffect(() => {
    const checkMemory = () => {
      if ("memory" in performance) {
        const memory = (performance as any).memory;
        setMemoryUsage({
          used: memory.usedJSHeapSize,
          total: memory.totalJSHeapSize,
          limit: memory.jsHeapSizeLimit,
        });
      }
    };

    const interval = setInterval(checkMemory, 5000);
    checkMemory();

    return () => clearInterval(interval);
  }, []);

  const isHighMemoryUsage = memoryUsage.used > memoryUsage.limit * 0.8;
  const memoryUsagePercentage = (memoryUsage.used / memoryUsage.limit) * 100;

  return { memoryUsage, isHighMemoryUsage, memoryUsagePercentage };
}

// Component lazy loading utility
export function useLazyComponent<T>(
  importFunc: () => Promise<{ default: T }>,
  shouldLoad: boolean = true,
) {
  const [Component, setComponent] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!shouldLoad || Component) return;

    setLoading(true);
    importFunc()
      .then((module) => {
        setComponent(module.default);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [shouldLoad, Component, importFunc]);

  return { Component, loading, error };
}

// Optimized intersection observer for lazy loading
export function useLazyIntersection(threshold: number = 200) {
  const { imageLazyLoadThreshold } = usePerformanceConfig();
  const adaptedThreshold = Math.min(threshold, imageLazyLoadThreshold);

  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef<Element>(null);
  const observerRef = useRef<IntersectionObserver>();

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsIntersecting(true);
            // Disconnect after first intersection for performance
            observerRef.current?.unobserve(element);
          }
        });
      },
      {
        rootMargin: `${adaptedThreshold}px 0px`,
        threshold: 0.01,
      },
    );

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [adaptedThreshold]);

  return { elementRef, isIntersecting };
}
