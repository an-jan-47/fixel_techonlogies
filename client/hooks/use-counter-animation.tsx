import { useState, useEffect, useRef, useCallback } from "react";
import { useOptimizedIntersection } from "./use-optimized-scroll";

interface UseCounterAnimationProps {
  end: number;
  duration?: number;
  start?: number;
  decimals?: number;
}

export function useCounterAnimation({
  end,
  duration = 2000,
  start = 0,
  decimals = 0,
}: UseCounterAnimationProps) {
  const [count, setCount] = useState(start);
  const [hasAnimated, setHasAnimated] = useState(false);
  const rafId = useRef<number>();
  const startTimeRef = useRef<number>();

  // Use optimized intersection observer
  const { elementRef, isIntersecting, hasIntersected } =
    useOptimizedIntersection({
      threshold: 0.3,
      rootMargin: "50px 0px",
    });

  // Optimized easing function for smooth animation
  const easeOutExpo = useCallback((t: number): number => {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }, []);

  // High-performance animation function using RAF
  const animate = useCallback(
    (currentTime: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime;
      }

      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Apply easing
      const easedProgress = easeOutExpo(progress);

      // Calculate current value
      const range = end - start;
      const currentValue = start + range * easedProgress;

      // Update count with proper decimals
      setCount(parseFloat(currentValue.toFixed(decimals)));

      // Continue animation if not complete
      if (progress < 1) {
        rafId.current = requestAnimationFrame(animate);
      } else {
        setHasAnimated(true);
      }
    },
    [duration, end, start, decimals, easeOutExpo],
  );

  // Start animation when element comes into view
  useEffect(() => {
    if (isIntersecting && !hasAnimated) {
      // Reset refs
      startTimeRef.current = undefined;

      // Start animation
      rafId.current = requestAnimationFrame(animate);

      // Cleanup function
      return () => {
        if (rafId.current) {
          cancelAnimationFrame(rafId.current);
        }
      };
    }
  }, [isIntersecting, hasAnimated, animate]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return { count, elementRef, hasAnimated };
}

// High-performance number formatter
export function formatCounterNumber(
  num: number,
  decimals: number = 0,
  suffix: string = "",
): string {
  if (suffix === "%" || suffix === "★" || suffix === "/5" || suffix === "/7") {
    return num.toFixed(decimals);
  }

  if (suffix === "+" && num >= 1000) {
    // Format large numbers efficiently
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(decimals > 0 ? 1 : 0) + "k";
    }
  }

  return num.toFixed(decimals);
}

// Optimized typewriter effect hook
export function useTypewriterEffect(
  text: string,
  speed: number = 50,
  startDelay: number = 0,
) {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const { elementRef, isIntersecting } = useOptimizedIntersection();
  const timeoutId = useRef<NodeJS.Timeout>();
  const currentIndex = useRef(0);
  const hasStarted = useRef(false);

  const typeNextCharacter = useCallback(() => {
    if (currentIndex.current < text.length) {
      setDisplayText((prev) => prev + text[currentIndex.current]);
      currentIndex.current++;

      timeoutId.current = setTimeout(typeNextCharacter, speed);
    } else {
      setIsComplete(true);
    }
  }, [text, speed]);

  useEffect(() => {
    if (isIntersecting && !hasStarted.current) {
      hasStarted.current = true;

      // Start typing after delay
      timeoutId.current = setTimeout(() => {
        typeNextCharacter();
      }, startDelay);
    }

    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, [isIntersecting, typeNextCharacter, startDelay]);

  // Reset on text change
  useEffect(() => {
    setDisplayText("");
    setIsComplete(false);
    currentIndex.current = 0;
    hasStarted.current = false;

    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
  }, [text]);

  return { displayText, isComplete, elementRef };
}

// Staggered animation hook for multiple elements
export function useStaggeredAnimation(
  itemCount: number,
  staggerDelay: number = 100,
  baseDelay: number = 0,
) {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const { elementRef, isIntersecting } = useOptimizedIntersection();
  const timeoutIds = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    if (isIntersecting) {
      // Clear any existing timeouts
      timeoutIds.current.forEach((id) => clearTimeout(id));
      timeoutIds.current = [];

      // Stagger the appearance of items
      for (let i = 0; i < itemCount; i++) {
        const timeout = setTimeout(
          () => {
            setVisibleItems((prev) => new Set([...prev, i]));
          },
          baseDelay + i * staggerDelay,
        );

        timeoutIds.current.push(timeout);
      }
    }

    return () => {
      timeoutIds.current.forEach((id) => clearTimeout(id));
    };
  }, [isIntersecting, itemCount, staggerDelay, baseDelay]);

  const isItemVisible = useCallback(
    (index: number) => visibleItems.has(index),
    [visibleItems],
  );

  return { elementRef, isItemVisible };
}
