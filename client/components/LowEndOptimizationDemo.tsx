import React from "react";
import {
  AdaptiveAnimation,
  StaggerAnimation,
  ReducedMotionWrapper,
} from "./AdaptiveAnimation";
import { OptimizedImage, AdaptiveImageGallery } from "./OptimizedImage";
import {
  MemoryEfficientLoader,
  VirtualizedList,
  MemoryAwareSection,
} from "./MemoryOptimized";
import {
  PerformanceDashboard,
  PerformanceWarning,
  AutoPerformanceOptimizer,
  usePerformanceBudget,
} from "./PerformanceMonitor";
import {
  usePerformanceConfig,
  useDeviceCapabilities,
} from "../hooks/use-device-optimization";

// Example of how to integrate low-end device optimizations
export const LowEndOptimizationDemo: React.FC = () => {
  const config = usePerformanceConfig();
  const capabilities = useDeviceCapabilities();
  const { violations } = usePerformanceBudget();

  // Sample data for demonstration
  const sampleItems = Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    title: `Item ${i + 1}`,
    description: `This is item number ${i + 1}`,
  }));

  const sampleImages = [
    {
      src: "https://picsum.photos/400/300?random=1",
      alt: "Sample image 1",
      width: 400,
      height: 300,
    },
    {
      src: "https://picsum.photos/400/300?random=2",
      alt: "Sample image 2",
      width: 400,
      height: 300,
    },
    {
      src: "https://picsum.photos/400/300?random=3",
      alt: "Sample image 3",
      width: 400,
      height: 300,
    },
  ];

  return (
    <AutoPerformanceOptimizer>
      <div
        className={`min-h-screen bg-gray-900 text-white p-8 ${
          config.isLowEnd ? "memory-efficient" : ""
        } ${capabilities.batteryLevel && capabilities.batteryLevel < 0.2 ? "battery-save" : ""}`}
      >
        {/* Performance monitoring components */}
        <PerformanceDashboard showInProduction={false} />
        <PerformanceWarning violations={violations} />

        {/* Device info section */}
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-6">
            Low-End Device Optimization Demo
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Device Info</h3>
              <ul className="space-y-2 text-sm">
                <li>Type: {capabilities.isLowEnd ? "Low-end" : "High-end"}</li>
                <li>Memory: {capabilities.memorySize}GB</li>
                <li>Cores: {capabilities.cores}</li>
                <li>Connection: {capabilities.connectionSpeed}</li>
                <li>
                  Mobile: {capabilities.isMobile ? "Yes" : "No"} (DPR:{" "}
                  {capabilities.devicePixelRatio})
                </li>
                <li>
                  Reduced Motion:{" "}
                  {capabilities.reducedMotion ? "Enabled" : "Disabled"}
                </li>
                {capabilities.batteryLevel && (
                  <li>
                    Battery: {(capabilities.batteryLevel * 100).toFixed(0)}%{" "}
                    {capabilities.isCharging ? "(Charging)" : ""}
                  </li>
                )}
              </ul>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Performance Config</h3>
              <ul className="space-y-2 text-sm">
                <li>Animations: {config.enableAnimations ? "On" : "Off"}</li>
                <li>Duration: {config.animationDuration}ms</li>
                <li>Particles: {config.enableParticles ? "On" : "Off"}</li>
                <li>Blur Effects: {config.enableBlurEffects ? "On" : "Off"}</li>
                <li>Gradients: {config.enableGradients ? "On" : "Off"}</li>
                <li>
                  Hover Effects: {config.enableHoverEffects ? "On" : "Off"}
                </li>
                <li>Max Animations: {config.maxConcurrentAnimations}</li>
                <li>Target FPS: {config.frameRateTarget}</li>
              </ul>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Optimizations</h3>
              <ul className="space-y-2 text-sm">
                <li>✓ Device capability detection</li>
                <li>✓ Adaptive animations</li>
                <li>✓ Memory-aware rendering</li>
                <li>✓ Lazy loading</li>
                <li>✓ Performance monitoring</li>
                <li>✓ Auto-optimization</li>
                <li>✓ Battery awareness</li>
                <li>✓ Connection awareness</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Adaptive animation examples */}
        <MemoryAwareSection priority="high" className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Adaptive Animations</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Individual Animations</h3>

              <AdaptiveAnimation animationType="fade" delay={0}>
                <div className="bg-blue-600 p-4 rounded-lg">Fade Animation</div>
              </AdaptiveAnimation>

              <AdaptiveAnimation
                animationType="slide"
                direction="left"
                delay={200}
              >
                <div className="bg-green-600 p-4 rounded-lg">
                  Slide Left Animation
                </div>
              </AdaptiveAnimation>

              <AdaptiveAnimation animationType="scale" delay={400}>
                <div className="bg-purple-600 p-4 rounded-lg">
                  Scale Animation
                </div>
              </AdaptiveAnimation>

              <ReducedMotionWrapper fallback={<div>Static Content</div>}>
                <AdaptiveAnimation animationType="bounce" delay={600}>
                  <div className="bg-pink-600 p-4 rounded-lg">
                    Bounce Animation (Hidden if reduced motion)
                  </div>
                </AdaptiveAnimation>
              </ReducedMotionWrapper>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Stagger Animation</h3>
              <StaggerAnimation
                staggerDelay={100}
                animationType="slide"
                direction="up"
              >
                {Array.from({ length: 6 }, (_, i) => (
                  <div
                    key={i}
                    className="bg-orange-600 p-3 rounded-lg mb-2 text-center"
                  >
                    Staggered Item {i + 1}
                  </div>
                ))}
              </StaggerAnimation>
            </div>
          </div>
        </MemoryAwareSection>

        {/* Optimized images */}
        <MemoryAwareSection priority="medium" className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Optimized Images</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Individual Images</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {sampleImages.map((image, index) => (
                  <OptimizedImage
                    key={index}
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    className="rounded-lg"
                    priority={index === 0}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Gallery Component</h3>
              <AdaptiveImageGallery
                images={sampleImages}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                maxConcurrentLoads={config.isLowEnd ? 2 : 4}
              />
            </div>
          </div>
        </MemoryAwareSection>

        {/* Memory-efficient components */}
        <MemoryAwareSection priority="low" className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Memory Optimization</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">
                Memory-Efficient Loader
              </h3>
              <MemoryEfficientLoader
                threshold={100}
                cleanupDelay={config.isLowEnd ? 10000 : 30000}
                fallback={
                  <div className="bg-gray-700 p-8 rounded-lg text-center animate-pulse">
                    Loading heavy component...
                  </div>
                }
              >
                <div className="bg-gray-700 p-8 rounded-lg">
                  <h4 className="text-lg font-semibold mb-4">
                    Heavy Component
                  </h4>
                  <p>
                    This component is only rendered when visible and cleaned up
                    on low-end devices when not in view.
                  </p>
                  <div className="mt-4 grid grid-cols-4 gap-2">
                    {Array.from({ length: 16 }, (_, i) => (
                      <div
                        key={i}
                        className="bg-blue-500 h-8 rounded animate-pulse"
                        style={{ animationDelay: `${i * 100}ms` }}
                      />
                    ))}
                  </div>
                </div>
              </MemoryEfficientLoader>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Virtualized List</h3>
              <div className="bg-gray-800 rounded-lg overflow-hidden">
                <VirtualizedList
                  items={sampleItems}
                  itemHeight={60}
                  containerHeight={300}
                  className="bg-gray-800"
                  overscan={config.isLowEnd ? 1 : 3}
                  renderItem={(item, index) => (
                    <div className="flex items-center p-4 border-b border-gray-700 hover:bg-gray-700 transition-colors">
                      <div className="w-8 h-8 bg-blue-500 rounded-full mr-3 flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-semibold">{item.title}</div>
                        <div className="text-sm text-gray-400">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  )}
                />
              </div>
              <p className="text-sm text-gray-400 mt-2">
                Showing 1000 items with virtualization (only visible items are
                rendered)
              </p>
            </div>
          </div>
        </MemoryAwareSection>

        {/* Usage instructions */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">How to Use</h2>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">
              Integration in Your Components
            </h3>

            <div className="space-y-4 text-sm font-mono">
              <div>
                <div className="text-green-400 mb-2">
                  1. Import the hooks and components:
                </div>
                <div className="bg-gray-900 p-3 rounded">
                  {`import { usePerformanceConfig, useDeviceCapabilities } from './hooks/use-device-optimization';
import { AdaptiveAnimation } from './components/AdaptiveAnimation';
import { OptimizedImage } from './components/OptimizedImage';`}
                </div>
              </div>

              <div>
                <div className="text-green-400 mb-2">
                  2. Use in your components:
                </div>
                <div className="bg-gray-900 p-3 rounded">
                  {`const config = usePerformanceConfig();
const capabilities = useDeviceCapabilities();

// Conditionally render based on device capabilities
if (config.enableAnimations) {
  return <AdaptiveAnimation>...</AdaptiveAnimation>;
}

// Apply CSS classes based on performance config
<div className={\`\${config.isLowEnd ? 'memory-efficient' : ''}\`}>
  <OptimizedImage src="image.jpg" alt="Description" />
</div>`}
                </div>
              </div>

              <div>
                <div className="text-green-400 mb-2">
                  3. Add performance monitoring:
                </div>
                <div className="bg-gray-900 p-3 rounded">
                  {`import { PerformanceDashboard, AutoPerformanceOptimizer } from './components/PerformanceMonitor';

<AutoPerformanceOptimizer>
  <PerformanceDashboard />
  <YourAppContent />
</AutoPerformanceOptimizer>`}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AutoPerformanceOptimizer>
  );
};

export default LowEndOptimizationDemo;
