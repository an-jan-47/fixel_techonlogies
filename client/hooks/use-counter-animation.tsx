import { useState, useEffect, useRef } from "react";

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
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now();
    const range = end - start;

    const updateCount = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      const currentCount = start + range * easeOutExpo;
      setCount(parseFloat(currentCount.toFixed(decimals)));

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [isVisible, end, start, duration, decimals]);

  return { count, elementRef };
}
