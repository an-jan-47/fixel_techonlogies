import { memo } from "react";
import {
  useCounterAnimation,
  formatCounterNumber,
} from "@/hooks/use-counter-animation";

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  start?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

const AnimatedCounter = memo(function AnimatedCounter({
  end,
  duration = 2000,
  start = 0,
  decimals = 0,
  prefix = "",
  suffix = "",
  className = "",
}: AnimatedCounterProps) {
  const { count, elementRef, hasAnimated } = useCounterAnimation({
    end,
    duration,
    start,
    decimals,
  });

  return (
    <span
      ref={elementRef as React.RefObject<HTMLSpanElement>}
      className={`gpu-accelerated ${className}`}
      style={{
        willChange: hasAnimated ? "auto" : "contents",
        contain: "layout style",
      }}
    >
      {prefix}
      {formatCounterNumber(count, decimals, suffix)}
      {suffix}
    </span>
  );
});

export { AnimatedCounter };
