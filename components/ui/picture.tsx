"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface PictureProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Image source URL */
  src: string
  /** Alt text for accessibility */
  alt: string
  /** Image width (optional, will be responsive if not provided) */
  width?: number
  /** Image height (optional, will be responsive if not provided) */
  height?: number
  /** Aspect ratio (e.g., "16/9", "4/3", "1/1") */
  aspectRatio?: string
  /** Placeholder image while loading */
  placeholder?: string
  /** Fallback image if main image fails to load */
  fallback?: string
  /** Loading behavior */
  loading?: "lazy" | "eager"
  /** Sizes attribute for responsive images */
  sizes?: string
  /** Source set for responsive images */
  srcSet?: string
  /** Object fit behavior */
  objectFit?: "cover" | "contain" | "fill" | "scale-down" | "none"
  /** Object position */
  objectPosition?: string
  /** Show loading skeleton */
  showSkeleton?: boolean
  /** Custom skeleton component */
  skeleton?: React.ComponentType
  /** Priority loading (disables lazy loading) */
  priority?: boolean
  /** Blur up effect */
  blurDataURL?: string
  /** Quality of the image (1-100) */
  quality?: number
  /** Callback when image loads */
  onLoad?: () => void
  /** Callback when image fails to load */
  onError?: () => void
  /** Enable zoom on hover */
  enableZoom?: boolean
  /** Rounded corners */
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "full"
  /** Shadow */
  shadow?: "none" | "sm" | "md" | "lg" | "xl"
}

const Picture = React.forwardRef<HTMLDivElement, PictureProps>(
  (
    {
      src,
      alt,
      width,
      height,
      aspectRatio,
      placeholder = "/placeholder.svg",
      fallback = "/placeholder.svg",
      loading = "lazy",
      sizes,
      srcSet,
      objectFit = "cover",
      objectPosition = "center",
      showSkeleton = true,
      skeleton: CustomSkeleton,
      priority = false,
      blurDataURL,
      quality = 75,
      onLoad,
      onError,
      enableZoom = false,
      rounded = "none",
      shadow = "none",
      className,
      ...props
    },
    ref
  ) => {
    const [isLoading, setIsLoading] = React.useState(true)
    const [hasError, setHasError] = React.useState(false)
    const [imageSrc, setImageSrc] = React.useState(src)
    const [isIntersecting, setIsIntersecting] = React.useState(false)
    const imgRef = React.useRef<HTMLImageElement>(null)
    const containerRef = React.useRef<HTMLDivElement>(null)

    // Intersection Observer for lazy loading
    React.useEffect(() => {
      if (priority || loading === "eager") {
        setIsIntersecting(true)
        return
      }

      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries
          if (entry?.isIntersecting) {
            setIsIntersecting(true)
            observer.disconnect()
          }
        },
        {
          threshold: 0.1,
          rootMargin: "50px",
        }
      )

      if (containerRef.current) {
        observer.observe(containerRef.current)
      }

      return () => observer.disconnect()
    }, [priority, loading])

    // Handle image loading
    const handleLoad = React.useCallback(() => {
      setIsLoading(false)
      setHasError(false)
      onLoad?.()
    }, [onLoad])

    // Handle image error
    const handleError = React.useCallback(() => {
      setIsLoading(false)
      setHasError(true)
      if (fallback && imageSrc !== fallback) {
        setImageSrc(fallback)
      }
      onError?.()
    }, [fallback, imageSrc, onError])

    // Retry loading
    const retryLoad = React.useCallback(() => {
      setIsLoading(true)
      setHasError(false)
      setImageSrc(src)
    }, [src])

    // Get rounded classes
    const getRoundedClass = (rounded: string) => {
      const roundedClasses = {
        none: "",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        "2xl": "rounded-2xl",
        full: "rounded-full",
      }
      return roundedClasses[rounded as keyof typeof roundedClasses] || ""
    }

    // Get shadow classes
    const getShadowClass = (shadow: string) => {
      const shadowClasses = {
        none: "",
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
        xl: "shadow-xl",
      }
      return shadowClasses[shadow as keyof typeof shadowClasses] || ""
    }

    // Get object fit classes
    const getObjectFitClass = (fit: string) => {
      const objectFitClasses = {
        cover: "object-cover",
        contain: "object-contain",
        fill: "object-fill",
        "scale-down": "object-scale-down",
        none: "object-none",
      }
      return objectFitClasses[fit as keyof typeof objectFitClasses] || "object-cover"
    }

    // Default skeleton component
    const DefaultSkeleton = () => (
      <div className="animate-pulse bg-gray-300 dark:bg-gray-700 w-full h-full rounded-inherit" />
    )

    const SkeletonComponent = CustomSkeleton || DefaultSkeleton

    return (
      <div
        ref={containerRef}
        className={cn(
          "relative overflow-hidden bg-gray-100 dark:bg-gray-800",
          getRoundedClass(rounded),
          getShadowClass(shadow),
          enableZoom && "group cursor-pointer",
          className
        )}
        style={{
          aspectRatio: aspectRatio,
          width: width ? `${width}px` : "100%",
          height: height ? `${height}px` : aspectRatio ? "auto" : "100%",
        }}
        {...props}
      >
        {/* Loading skeleton */}
        {(isLoading || !isIntersecting) && showSkeleton && (
          <div className="absolute inset-0 z-10">
            <SkeletonComponent />
          </div>
        )}

        {/* Error state */}
        {hasError && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
            <svg
              className="w-8 h-8 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <p className="text-sm text-center px-2">Failed to load image</p>
            <button
              onClick={retryLoad}
              className="mt-2 px-3 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Main image */}
        {isIntersecting && (
          <img
            ref={imgRef}
            src={imageSrc}
            alt={alt}
            width={width}
            height={height}
            sizes={sizes}
            srcSet={srcSet}
            loading={priority ? "eager" : "lazy"}
            onLoad={handleLoad}
            onError={handleError}
            className={cn(
              "w-full h-full transition-all duration-300",
              getObjectFitClass(objectFit),
              enableZoom && "group-hover:scale-105",
              isLoading && "opacity-0",
              !isLoading && "opacity-100"
            )}
            style={{
              objectPosition,
              filter: blurDataURL && isLoading ? "blur(5px)" : "none",
            }}
          />
        )}

        {/* Blur placeholder */}
        {blurDataURL && isLoading && (
          <img
            src={blurDataURL}
            alt=""
            className={cn(
              "absolute inset-0 w-full h-full",
              getObjectFitClass(objectFit),
              "filter blur-sm scale-105"
            )}
            style={{ objectPosition }}
          />
        )}
      </div>
    )
  }
)

Picture.displayName = "Picture"

export { Picture }
