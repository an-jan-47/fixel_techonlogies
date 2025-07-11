import React, { useState, useRef, useEffect } from "react";
import {
  useLazyIntersection,
  usePerformanceConfig,
} from "../hooks/use-device-optimization";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  placeholder?: string;
  blurDataURL?: string;
  quality?: number;
  priority?: boolean;
  sizes?: string;
  loading?: "lazy" | "eager";
  onLoad?: () => void;
  onError?: () => void;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = "",
  width,
  height,
  placeholder,
  blurDataURL,
  quality = 75,
  priority = false,
  sizes,
  loading = "lazy",
  onLoad,
  onError,
}) => {
  const config = usePerformanceConfig();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string>(
    priority ? src : placeholder || "",
  );
  const { elementRef, isIntersecting } = useLazyIntersection(
    config.imageLazyLoadThreshold,
  );

  // Should load image based on priority or intersection
  const shouldLoad = priority || isIntersecting;

  useEffect(() => {
    if (!shouldLoad || currentSrc === src) return;

    // Create image element to preload
    const img = new Image();

    img.onload = () => {
      setCurrentSrc(src);
      setIsLoaded(true);
      onLoad?.();
    };

    img.onerror = () => {
      setIsError(true);
      onError?.();
    };

    // For low-end devices, reduce quality
    const adaptedQuality = config.isLowEnd ? Math.min(quality, 60) : quality;

    // Generate optimized src with quality parameter if supported
    let optimizedSrc = src;
    if (src.includes("?")) {
      optimizedSrc += `&q=${adaptedQuality}`;
    } else {
      optimizedSrc += `?q=${adaptedQuality}`;
    }

    img.src = optimizedSrc;
  }, [shouldLoad, src, currentSrc, quality, config.isLowEnd, onLoad, onError]);

  // Generate responsive srcSet for different device capabilities
  const generateSrcSet = () => {
    if (!width || config.isLowEnd) return undefined;

    const baseUrl = src.split("?")[0];
    const params = src.split("?")[1] || "";

    const widths = [width * 0.5, width, width * 1.5, width * 2];
    return widths
      .map((w) => {
        const adaptedQuality = config.isLowEnd ? 60 : quality;
        const queryParams = params
          ? `${params}&w=${Math.round(w)}&q=${adaptedQuality}`
          : `w=${Math.round(w)}&q=${adaptedQuality}`;
        return `${baseUrl}?${queryParams} ${Math.round(w)}w`;
      })
      .join(", ");
  };

  // Generate sizes attribute based on device capabilities
  const generateSizes = () => {
    if (sizes) return sizes;

    const deviceSizes = {
      small: "(max-width: 640px) 100vw",
      medium: "(max-width: 1024px) 50vw",
      large: "25vw",
    };

    return `${deviceSizes.small}, ${deviceSizes.medium}, ${deviceSizes.large}`;
  };

  // Placeholder component
  const PlaceholderComponent = () => {
    if (blurDataURL && !config.isLowEnd) {
      return (
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-300 ${
            isLoaded ? "opacity-0" : "opacity-100"
          }`}
          style={{
            backgroundImage: `url(${blurDataURL})`,
            filter: "blur(10px)",
            transform: "scale(1.1)",
          }}
        />
      );
    }

    return (
      <div
        className={`absolute inset-0 bg-gray-300 animate-pulse transition-opacity duration-300 ${
          isLoaded ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="w-full h-full bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-pulse" />
      </div>
    );
  };

  // Error component
  const ErrorComponent = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    </div>
  );

  return (
    <div
      ref={elementRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {isError ? (
        <ErrorComponent />
      ) : (
        <>
          {!isLoaded && <PlaceholderComponent />}
          {shouldLoad && (
            <img
              src={currentSrc}
              alt={alt}
              width={width}
              height={height}
              srcSet={generateSrcSet()}
              sizes={generateSizes()}
              loading={loading}
              decoding={config.isLowEnd ? "sync" : "async"}
              className={`transition-opacity duration-300 ${
                isLoaded ? "opacity-100" : "opacity-0"
              } ${config.isLowEnd ? "" : "transform-gpu"}`}
              style={{
                willChange: isLoaded ? "auto" : "opacity",
                transform: config.isLowEnd ? undefined : "translateZ(0)",
              }}
            />
          )}
        </>
      )}
    </div>
  );
};

// Image gallery component with adaptive loading
interface ImageGalleryProps {
  images: Array<{
    src: string;
    alt: string;
    width?: number;
    height?: number;
  }>;
  className?: string;
  maxConcurrentLoads?: number;
}

export const AdaptiveImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  className = "",
  maxConcurrentLoads,
}) => {
  const config = usePerformanceConfig();
  const [loadedCount, setLoadedCount] = useState(0);

  // Determine max concurrent loads based on device capabilities
  const adaptedMaxLoads =
    maxConcurrentLoads ||
    (config.isLowEnd ? 2 : config.connectionSpeed === "slow" ? 3 : 6);

  const handleImageLoad = () => {
    setLoadedCount((prev) => prev + 1);
  };

  return (
    <div className={className}>
      {images.map((image, index) => {
        // Determine if this image should be prioritized
        const shouldPrioritize = index < adaptedMaxLoads;

        return (
          <OptimizedImage
            key={index}
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            priority={shouldPrioritize}
            onLoad={handleImageLoad}
            className="w-full h-auto"
          />
        );
      })}
    </div>
  );
};

// Background image component with adaptive quality
interface AdaptiveBackgroundProps {
  src: string;
  children: React.ReactNode;
  className?: string;
  overlay?: boolean;
  overlayOpacity?: number;
}

export const AdaptiveBackground: React.FC<AdaptiveBackgroundProps> = ({
  src,
  children,
  className = "",
  overlay = false,
  overlayOpacity = 0.5,
}) => {
  const config = usePerformanceConfig();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setIsLoaded(true);

    // Reduce quality for low-end devices
    const quality = config.isLowEnd ? 50 : 75;
    const optimizedSrc = src.includes("?")
      ? `${src}&q=${quality}`
      : `${src}?q=${quality}`;

    img.src = optimizedSrc;
  }, [src, config.isLowEnd]);

  const backgroundStyle: React.CSSProperties = {
    backgroundImage: isLoaded ? `url(${src})` : undefined,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  // Disable background attachment for mobile devices for better performance
  if (!config.isMobile && !config.isLowEnd) {
    backgroundStyle.backgroundAttachment = "fixed";
  }

  return (
    <div className={`relative ${className}`} style={backgroundStyle}>
      {overlay && (
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
