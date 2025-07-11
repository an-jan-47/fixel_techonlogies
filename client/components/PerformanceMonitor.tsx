import React, { useState, useEffect, useRef } from "react";
import {
  useAdaptiveFrameRate,
  useMemoryMonitor,
  useDeviceCapabilities,
} from "../hooks/use-device-optimization";

interface PerformanceBudget {
  maxMemoryUsage: number; // Percentage
  minFPS: number;
  maxLoadTime: number; // milliseconds
  maxDOMNodes: number;
  maxImageSize: number; // KB
  maxJavaScriptTime: number; // milliseconds per frame
}

interface PerformanceMetrics {
  fps: number;
  memoryUsage: number;
  loadTime: number;
  domNodes: number;
  javaScriptTime: number;
  isWithinBudget: boolean;
  warnings: string[];
}

// Performance budget hook
export function usePerformanceBudget(): {
  metrics: PerformanceMetrics;
  budget: PerformanceBudget;
  violations: string[];
} {
  const capabilities = useDeviceCapabilities();
  const { currentFPS } = useAdaptiveFrameRate();
  const { memoryUsagePercentage } = useMemoryMonitor();
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    memoryUsage: 0,
    loadTime: 0,
    domNodes: 0,
    javaScriptTime: 0,
    isWithinBudget: true,
    warnings: [],
  });

  // Define adaptive budget based on device capabilities
  const budget: PerformanceBudget = {
    maxMemoryUsage: capabilities.isLowEnd ? 60 : 80,
    minFPS: capabilities.isLowEnd ? 24 : 30,
    maxLoadTime: capabilities.connectionSpeed === "slow" ? 5000 : 3000,
    maxDOMNodes: capabilities.isLowEnd ? 1000 : 2000,
    maxImageSize: capabilities.connectionSpeed === "slow" ? 100 : 500,
    maxJavaScriptTime: capabilities.isLowEnd ? 10 : 16,
  };

  useEffect(() => {
    const measurePerformance = () => {
      const domNodes = document.querySelectorAll("*").length;
      const warnings: string[] = [];

      // Check performance violations
      if (currentFPS < budget.minFPS) {
        warnings.push(`Low FPS: ${currentFPS} (min: ${budget.minFPS})`);
      }

      if (memoryUsagePercentage > budget.maxMemoryUsage) {
        warnings.push(
          `High memory usage: ${memoryUsagePercentage.toFixed(1)}% (max: ${budget.maxMemoryUsage}%)`,
        );
      }

      if (domNodes > budget.maxDOMNodes) {
        warnings.push(
          `Too many DOM nodes: ${domNodes} (max: ${budget.maxDOMNodes})`,
        );
      }

      // Measure JavaScript execution time
      const start = performance.now();
      setTimeout(() => {
        const jsTime = performance.now() - start;

        const newMetrics: PerformanceMetrics = {
          fps: currentFPS,
          memoryUsage: memoryUsagePercentage,
          loadTime: performance.timing
            ? performance.timing.loadEventEnd -
              performance.timing.navigationStart
            : 0,
          domNodes,
          javaScriptTime: jsTime,
          isWithinBudget: warnings.length === 0,
          warnings,
        };

        setMetrics(newMetrics);
      }, 0);
    };

    const interval = setInterval(measurePerformance, 2000);
    measurePerformance();

    return () => clearInterval(interval);
  }, [
    currentFPS,
    memoryUsagePercentage,
    budget.minFPS,
    budget.maxMemoryUsage,
    budget.maxDOMNodes,
  ]);

  const violations = metrics.warnings;

  return { metrics, budget, violations };
}

// Performance warning component
export const PerformanceWarning: React.FC<{
  violations: string[];
  onClose?: () => void;
}> = ({ violations, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(violations.length > 0);
  }, [violations]);

  if (!isVisible || violations.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-yellow-500 text-black p-4 rounded-lg shadow-lg z-50 max-w-sm">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-sm">Performance Warning</h3>
        <button
          onClick={() => {
            setIsVisible(false);
            onClose?.();
          }}
          className="text-black hover:text-gray-700 ml-2"
        >
          ×
        </button>
      </div>
      <ul className="text-xs space-y-1">
        {violations.map((violation, index) => (
          <li key={index}>• {violation}</li>
        ))}
      </ul>
    </div>
  );
};

// Performance dashboard component (for development)
export const PerformanceDashboard: React.FC<{
  showInProduction?: boolean;
}> = ({ showInProduction = false }) => {
  const { metrics, budget, violations } = usePerformanceBudget();
  const capabilities = useDeviceCapabilities();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development or if explicitly enabled
    const isDev = process.env.NODE_ENV === "development";
    setIsVisible(isDev || showInProduction);
  }, [showInProduction]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 left-4 bg-black bg-opacity-90 text-white p-4 rounded-lg text-xs font-mono z-50 max-w-xs">
      <h3 className="font-bold mb-2 text-green-400">Performance Monitor</h3>

      <div className="space-y-1 mb-3">
        <div className="flex justify-between">
          <span>FPS:</span>
          <span
            className={
              metrics.fps >= budget.minFPS ? "text-green-400" : "text-red-400"
            }
          >
            {metrics.fps}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Memory:</span>
          <span
            className={
              metrics.memoryUsage <= budget.maxMemoryUsage
                ? "text-green-400"
                : "text-red-400"
            }
          >
            {metrics.memoryUsage.toFixed(1)}%
          </span>
        </div>

        <div className="flex justify-between">
          <span>DOM Nodes:</span>
          <span
            className={
              metrics.domNodes <= budget.maxDOMNodes
                ? "text-green-400"
                : "text-red-400"
            }
          >
            {metrics.domNodes}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Load Time:</span>
          <span
            className={
              metrics.loadTime <= budget.maxLoadTime
                ? "text-green-400"
                : "text-red-400"
            }
          >
            {metrics.loadTime}ms
          </span>
        </div>
      </div>

      <div className="border-t border-gray-600 pt-2 mb-2">
        <h4 className="font-semibold text-blue-400 mb-1">Device Info</h4>
        <div className="space-y-1">
          <div>Memory: {capabilities.memorySize}GB</div>
          <div>Cores: {capabilities.cores}</div>
          <div>Connection: {capabilities.connectionSpeed}</div>
          <div>
            Type: {capabilities.isLowEnd ? "Low-end" : "High-end"}{" "}
            {capabilities.isMobile ? "Mobile" : "Desktop"}
          </div>
        </div>
      </div>

      {violations.length > 0 && (
        <div className="border-t border-gray-600 pt-2">
          <h4 className="font-semibold text-red-400 mb-1">Violations</h4>
          <div className="space-y-1">
            {violations.slice(0, 3).map((violation, index) => (
              <div key={index} className="text-red-300 text-xs">
                {violation}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-2 text-xs text-gray-400">
        Status:{" "}
        <span
          className={metrics.isWithinBudget ? "text-green-400" : "text-red-400"}
        >
          {metrics.isWithinBudget ? "✓ Within Budget" : "⚠ Over Budget"}
        </span>
      </div>
    </div>
  );
};

// Performance optimization suggestions
export function usePerformanceOptimizations() {
  const { violations, metrics } = usePerformanceBudget();
  const capabilities = useDeviceCapabilities();

  const suggestions = React.useMemo(() => {
    const tips: string[] = [];

    if (metrics.fps < 30) {
      tips.push("Consider reducing animation complexity or frequency");
      tips.push("Enable hardware acceleration with transform3d");
    }

    if (metrics.memoryUsage > 70) {
      tips.push("Clean up unused components and event listeners");
      tips.push("Implement component lazy loading");
    }

    if (metrics.domNodes > 1500) {
      tips.push("Consider virtualizing long lists");
      tips.push("Remove unnecessary DOM elements");
    }

    if (capabilities.connectionSpeed === "slow") {
      tips.push("Optimize image sizes and formats");
      tips.push("Enable image lazy loading");
      tips.push("Reduce JavaScript bundle size");
    }

    if (capabilities.isLowEnd) {
      tips.push("Disable non-essential animations");
      tips.push("Reduce visual effects and gradients");
      tips.push("Implement aggressive caching");
    }

    return tips;
  }, [violations, metrics, capabilities]);

  return suggestions;
}

// Auto-optimization component
export const AutoPerformanceOptimizer: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { violations } = usePerformanceBudget();
  const [optimizationsApplied, setOptimizationsApplied] = useState<string[]>(
    [],
  );

  useEffect(() => {
    const applyOptimizations = () => {
      violations.forEach((violation) => {
        if (
          violation.includes("Low FPS") &&
          !optimizationsApplied.includes("reduce-animations")
        ) {
          // Dynamically reduce animations
          document.body.classList.add("reduce-animations");
          setOptimizationsApplied((prev) => [...prev, "reduce-animations"]);
        }

        if (
          violation.includes("High memory") &&
          !optimizationsApplied.includes("cleanup-dom")
        ) {
          // Trigger garbage collection hints
          if ("gc" in window && typeof (window as any).gc === "function") {
            (window as any).gc();
          }
          setOptimizationsApplied((prev) => [...prev, "cleanup-dom"]);
        }
      });
    };

    if (violations.length > 0) {
      applyOptimizations();
    }
  }, [violations, optimizationsApplied]);

  return <>{children}</>;
};
