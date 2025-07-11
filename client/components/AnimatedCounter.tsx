import { useCounterAnimation } from "@/hooks/use-counter-animation";

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  start?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({
  end,
  duration = 2000,
  start = 0,
  decimals = 0,
  prefix = "",
  suffix = "",
  className = "",
}: AnimatedCounterProps) {
  const { count, elementRef } = useCounterAnimation({
    end,
    duration,
    start,
    decimals,
  });

  const formatNumber = (num: number) => {
    if (suffix === "%" || suffix === "★" || suffix === "/5") {
      return num.toFixed(decimals);
    }
    if (suffix === "+" && num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toFixed(decimals);
  };

  return (
    <div ref={elementRef} className={className}>
      {prefix}
      {formatNumber(count)}
      {suffix}
    </div>
  );
}
