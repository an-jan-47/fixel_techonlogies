import { useState, useEffect, useCallback, useRef } from "react";

// Optimized scroll hook with RAF and throttling
export function useOptimizedScroll() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");
  const [isScrolling, setIsScrolling] = useState(false);
  const rafId = useRef<number>();
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout>();

  const updateScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    // Determine scroll direction
    if (currentScrollY > lastScrollY.current) {
      setScrollDirection("down");
    } else if (currentScrollY < lastScrollY.current) {
      setScrollDirection("up");
    }

    setScrollY(currentScrollY);
    lastScrollY.current = currentScrollY;
    setIsScrolling(true);

    // Clear existing timeout
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    // Set scrolling to false after 150ms of no scrolling
    scrollTimeout.current = setTimeout(() => {
      setIsScrolling(false);
    }, 150);
  }, []);

  const handleScroll = useCallback(() => {
    // Cancel previous RAF
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }

    // Schedule update for next frame
    rafId.current = requestAnimationFrame(updateScroll);
  }, [updateScroll]);

  useEffect(() => {
    // Passive listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial scroll position
    setScrollY(window.scrollY);
    lastScrollY.current = window.scrollY;

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [handleScroll]);

  return { scrollY, scrollDirection, isScrolling };
}

// Optimized intersection observer hook
export function useOptimizedIntersection(
  options: IntersectionObserverInit = {},
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const elementRef = useRef<Element>(null);
  const observerRef = useRef<IntersectionObserver>();

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Create optimized intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsIntersecting(entry.isIntersecting);
          if (entry.isIntersecting && !hasIntersected) {
            setHasIntersected(true);
          }
        });
      },
      {
        rootMargin: "50px 0px",
        threshold: 0.1,
        ...options,
      },
    );

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasIntersected, options]);

  return { elementRef, isIntersecting, hasIntersected };
}

// Optimized resize hook
export function useOptimizedResize() {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  const rafId = useRef<number>();

  const updateDimensions = useCallback(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  const handleResize = useCallback(() => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }
    rafId.current = requestAnimationFrame(updateDimensions);
  }, [updateDimensions]);

  useEffect(() => {
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [handleResize]);

  return dimensions;
}

// Smooth scroll utility
export function smoothScrollTo(targetPosition: number, duration: number = 800) {
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  const startTime = Date.now();

  function easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  }

  function animate() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = easeInOutCubic(progress);

    window.scrollTo(0, startPosition + distance * ease);

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}

// Debounced function utility
export function useDebounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number,
): T {
  const timeoutRef = useRef<NodeJS.Timeout>();

  return useCallback(
    ((...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        func(...args);
      }, delay);
    }) as T,
    [func, delay],
  );
}

// Throttled function utility
export function useThrottle<T extends (...args: any[]) => any>(
  func: T,
  delay: number,
): T {
  const lastCall = useRef(0);

  return useCallback(
    ((...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastCall.current >= delay) {
        lastCall.current = now;
        return func(...args);
      }
    }) as T,
    [func, delay],
  );
}

// Performance monitoring hook
export function usePerformanceMonitor() {
  const [fps, setFps] = useState(60);
  const frameCount = useRef(0);
  const lastTime = useRef(Date.now());
  const rafId = useRef<number>();

  const measureFPS = useCallback(() => {
    frameCount.current++;
    const currentTime = Date.now();

    if (currentTime - lastTime.current >= 1000) {
      setFps(frameCount.current);
      frameCount.current = 0;
      lastTime.current = currentTime;
    }

    rafId.current = requestAnimationFrame(measureFPS);
  }, []);

  useEffect(() => {
    rafId.current = requestAnimationFrame(measureFPS);

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [measureFPS]);

  return { fps };
}
