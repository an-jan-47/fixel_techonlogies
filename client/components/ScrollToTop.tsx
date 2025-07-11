import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import {
  useOptimizedScroll,
  smoothScrollTo,
} from "@/hooks/use-optimized-scroll";

export default function ScrollToTop() {
  const { scrollY } = useOptimizedScroll();
  const isVisible = scrollY > 300;

  const scrollToTop = useCallback(() => {
    smoothScrollTo(0, 600);
  }, []);

  return (
    <div
      className={`fixed bottom-6 left-6 z-40 transition-all duration-300 gpu-accelerated ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-16 scale-90 pointer-events-none"
      }`}
      style={{
        willChange: isVisible ? "auto" : "opacity, transform",
        contain: "layout style",
      }}
    >
      <Button
        onClick={scrollToTop}
        size="icon"
        className="w-12 h-12 rounded-full bg-gradient-to-r from-fixel-blue to-fixel-purple hover:from-fixel-blue/80 hover:to-fixel-purple/80 text-white shadow-lg hover:shadow-2xl hover:shadow-fixel-blue/25 transition-all duration-300 hover:scale-110 group gpu-accelerated"
        aria-label="Scroll to top"
        style={{
          willChange: "transform, box-shadow, background-color",
        }}
      >
        <ArrowUp className="w-5 h-5 group-hover:animate-bounce gpu-accelerated" />
      </Button>
    </div>
  );
}
