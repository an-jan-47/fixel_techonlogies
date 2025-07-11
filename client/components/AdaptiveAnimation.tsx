import React, { useEffect, useState, useRef } from "react";
import {
  usePerformanceConfig,
  useAdaptiveFrameRate,
} from "../hooks/use-device-optimization";

interface AdaptiveAnimationProps {
  children: React.ReactNode;
  className?: string;
  animationType?: "fade" | "slide" | "scale" | "rotate" | "bounce";
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  distance?: number;
  fallbackClassName?: string;
  triggerOnce?: boolean;
  threshold?: number;
}

export const AdaptiveAnimation: React.FC<AdaptiveAnimationProps> = ({
  children,
  className = "",
  animationType = "fade",
  direction = "up",
  delay = 0,
  duration,
  distance = 30,
  fallbackClassName = "",
  triggerOnce = true,
  threshold = 0.1,
}) => {
  const config = usePerformanceConfig();
  const { adaptedTarget } = useAdaptiveFrameRate();
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver>();

  // Use adaptive duration or provided duration
  const adaptedDuration = duration || config.animationDuration;

  // Determine if animation should be enabled
  const shouldAnimate = config.enableAnimations && !config.reducedMotion;

  useEffect(() => {
    if (!shouldAnimate) {
      setIsVisible(true);
      return;
    }

    const element = elementRef.current;
    if (!element) return;

    // Create intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && (!triggerOnce || !hasAnimated)) {
            setTimeout(() => {
              setIsVisible(true);
              setHasAnimated(true);
            }, delay);

            if (triggerOnce) {
              observerRef.current?.unobserve(element);
            }
          } else if (!triggerOnce && !entry.isIntersecting) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin: "50px 0px",
      },
    );

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [shouldAnimate, delay, triggerOnce, hasAnimated, threshold]);

  // Generate animation classes based on type and direction
  const getAnimationClasses = () => {
    if (!shouldAnimate) {
      return fallbackClassName;
    }

    const baseClasses = "transition-all ease-out";
    let transformClasses = "";
    let opacityClasses = "";

    // Set animation duration based on performance config
    const durationClass =
      adaptedDuration <= 150
        ? "duration-150"
        : adaptedDuration <= 300
          ? "duration-300"
          : adaptedDuration <= 500
            ? "duration-500"
            : "duration-700";

    switch (animationType) {
      case "fade":
        opacityClasses = isVisible ? "opacity-100" : "opacity-0";
        break;

      case "slide":
        const slideDistance = config.isLowEnd
          ? Math.min(distance, 15)
          : distance;
        switch (direction) {
          case "up":
            transformClasses = isVisible
              ? "translate-y-0"
              : `translate-y-${slideDistance > 20 ? "8" : "4"}`;
            break;
          case "down":
            transformClasses = isVisible
              ? "translate-y-0"
              : `-translate-y-${slideDistance > 20 ? "8" : "4"}`;
            break;
          case "left":
            transformClasses = isVisible
              ? "translate-x-0"
              : `translate-x-${slideDistance > 20 ? "8" : "4"}`;
            break;
          case "right":
            transformClasses = isVisible
              ? "translate-x-0"
              : `-translate-x-${slideDistance > 20 ? "8" : "4"}`;
            break;
        }
        opacityClasses = isVisible ? "opacity-100" : "opacity-0";
        break;

      case "scale":
        const scaleValue = config.isLowEnd ? "95" : "90";
        transformClasses = isVisible ? "scale-100" : `scale-${scaleValue}`;
        opacityClasses = isVisible ? "opacity-100" : "opacity-0";
        break;

      case "rotate":
        if (!config.isLowEnd) {
          transformClasses = isVisible ? "rotate-0" : "rotate-3";
        }
        opacityClasses = isVisible ? "opacity-100" : "opacity-0";
        break;

      case "bounce":
        if (!config.isLowEnd && adaptedTarget >= 30) {
          transformClasses = isVisible
            ? "translate-y-0 scale-100"
            : "translate-y-2 scale-95";
        } else {
          transformClasses = isVisible ? "translate-y-0" : "translate-y-1";
        }
        opacityClasses = isVisible ? "opacity-100" : "opacity-0";
        break;
    }

    return `${baseClasses} ${durationClass} ${transformClasses} ${opacityClasses}`.trim();
  };

  // Performance-based style optimization
  const getInlineStyles = (): React.CSSProperties => {
    const styles: React.CSSProperties = {};

    // Add will-change for better performance, but only when animating
    if (shouldAnimate && !isVisible) {
      styles.willChange = "transform, opacity";
    } else if (isVisible) {
      styles.willChange = "auto";
    }

    // Force hardware acceleration for non-low-end devices
    if (!config.isLowEnd && shouldAnimate) {
      styles.transform = styles.transform || "translateZ(0)";
    }

    return styles;
  };

  return (
    <div
      ref={elementRef}
      className={`${getAnimationClasses()} ${className}`}
      style={getInlineStyles()}
    >
      {children}
    </div>
  );
};

// Optimized stagger animation component
interface StaggerAnimationProps {
  children: React.ReactNode[];
  staggerDelay?: number;
  maxConcurrent?: number;
  className?: string;
  animationType?: AdaptiveAnimationProps["animationType"];
  direction?: AdaptiveAnimationProps["direction"];
}

export const StaggerAnimation: React.FC<StaggerAnimationProps> = ({
  children,
  staggerDelay = 100,
  maxConcurrent,
  className = "",
  animationType = "fade",
  direction = "up",
}) => {
  const config = usePerformanceConfig();

  // Adapt stagger delay and max concurrent based on performance
  const adaptedStaggerDelay = config.isLowEnd
    ? Math.max(staggerDelay, 200)
    : staggerDelay;
  const adaptedMaxConcurrent =
    maxConcurrent ||
    (config.isLowEnd
      ? Math.min(config.maxConcurrentAnimations, 2)
      : config.maxConcurrentAnimations);

  return (
    <div className={className}>
      {children.map((child, index) => {
        // Batch animations to prevent overwhelming low-end devices
        const batchIndex = Math.floor(index / adaptedMaxConcurrent);
        const delayInBatch =
          (index % adaptedMaxConcurrent) * adaptedStaggerDelay;
        const totalDelay =
          batchIndex * (adaptedMaxConcurrent * adaptedStaggerDelay) +
          delayInBatch;

        return (
          <AdaptiveAnimation
            key={index}
            animationType={animationType}
            direction={direction}
            delay={totalDelay}
            triggerOnce={true}
          >
            {child}
          </AdaptiveAnimation>
        );
      })}
    </div>
  );
};

// Reduced motion fallback component
export const ReducedMotionWrapper: React.FC<{
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}> = ({ children, fallback, className = "" }) => {
  const config = usePerformanceConfig();

  if (!config.enableAnimations) {
    return (
      <div className={`${className} opacity-100`}>{fallback || children}</div>
    );
  }

  return <div className={className}>{children}</div>;
};
