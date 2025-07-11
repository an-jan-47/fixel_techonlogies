import { useState, useEffect, useRef, useCallback } from "react";

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafId = useRef<number>();
  const ticking = useRef(false);

  // Optimized scroll progress calculation
  const updateScrollProgress = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const scrollPercent = scrollTop / (docHeight - winHeight);
    const scrollPercentRounded = Math.round(scrollPercent * 100);

    setScrollProgress(Math.min(Math.max(scrollPercentRounded, 0), 100));
    ticking.current = false;
  }, []);

  // RAF-optimized scroll handler
  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      rafId.current = requestAnimationFrame(updateScrollProgress);
      ticking.current = true;
    }
  }, [updateScrollProgress]);

  useEffect(() => {
    // Use passive listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initialize scroll progress
    updateScrollProgress();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [handleScroll, updateScrollProgress]);

  return (
    <>
      {/* Top progress bar */}
      <div
        className="fixed top-0 left-0 right-0 h-1 bg-muted/20 z-50 gpu-accelerated"
        style={{ willChange: "transform" }}
      >
        <div
          className="h-full bg-gradient-to-r from-fixel-blue via-fixel-purple to-fixel-cyan transition-transform duration-75 ease-out origin-left"
          style={{
            transform: `scaleX(${scrollProgress / 100})`,
            willChange: "transform",
            contain: "strict",
          }}
        />
      </div>

      {/* Circular progress indicator */}
      <div
        className={`fixed bottom-6 right-6 z-40 transition-all duration-300 ${
          scrollProgress > 5
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-4 scale-90 pointer-events-none"
        }`}
        style={{
          willChange: "opacity, transform",
          contain: "layout style paint",
        }}
      >
        <div className="relative w-12 h-12 gpu-accelerated">
          <svg
            className="w-12 h-12 transform -rotate-90 gpu-accelerated"
            viewBox="0 0 100 100"
            style={{ willChange: "transform" }}
          >
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-muted/20"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="url(#gradient)"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - scrollProgress / 100)}`}
              className="transition-all duration-150 ease-out gpu-accelerated"
              strokeLinecap="round"
              style={{
                willChange: "stroke-dashoffset",
                contain: "layout",
              }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--fixel-blue))" />
                <stop offset="50%" stopColor="hsl(var(--fixel-purple))" />
                <stop offset="100%" stopColor="hsl(var(--fixel-cyan))" />
              </linearGradient>
            </defs>
          </svg>
          <div
            className="absolute inset-0 flex items-center justify-center gpu-accelerated"
            style={{ contain: "layout style" }}
          >
            <span
              className="text-xs font-medium text-fixel-blue tabular-nums"
              style={{ willChange: "contents" }}
            >
              {scrollProgress}%
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
