"use client"

import * as React from "react"
import { Picture } from "./picture"
import { Button } from "./button"
import { Dialog, DialogContent, DialogTrigger } from "./dialog"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react"

export interface ImageGalleryProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Array of image objects */
  images: {
    src: string
    alt: string
    thumbnail?: string
    title?: string
    description?: string
  }[]
  /** Gallery layout */
  layout?: "grid" | "masonry" | "carousel"
  /** Number of columns for grid layout */
  columns?: 1 | 2 | 3 | 4 | 5 | 6
  /** Gap between images */
  gap?: "sm" | "md" | "lg"
  /** Aspect ratio for images */
  aspectRatio?: string
  /** Enable lightbox */
  enableLightbox?: boolean
  /** Enable zoom in lightbox */
  enableZoom?: boolean
  /** Show thumbnails in lightbox */
  showThumbnails?: boolean
  /** Auto-play carousel */
  autoPlay?: boolean
  /** Auto-play interval in milliseconds */
  autoPlayInterval?: number
  /** Show navigation arrows */
  showArrows?: boolean
  /** Show dots indicator */
  showDots?: boolean
  /** Rounded corners */
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "full"
  /** Shadow */
  shadow?: "none" | "sm" | "md" | "lg" | "xl"
  /** Custom image component */
  ImageComponent?: React.ComponentType<any>
  /** Custom thumbnail component */
  ThumbnailComponent?: React.ComponentType<any>
  /** Callback when image is clicked */
  onImageClick?: (index: number) => void
  /** Custom loading component */
  LoadingComponent?: React.ComponentType
  /** Custom error component */
  ErrorComponent?: React.ComponentType<{ onRetry: () => void }>
}

const ImageGallery = React.forwardRef<HTMLDivElement, ImageGalleryProps>(
  (
    {
      images,
      layout = "grid",
      columns = 3,
      gap = "md",
      aspectRatio = "1/1",
      enableLightbox = true,
      enableZoom = true,
      showThumbnails = true,
      autoPlay = false,
      autoPlayInterval = 5000,
      showArrows = true,
      showDots = true,
      rounded = "lg",
      shadow = "sm",
      ImageComponent,
      ThumbnailComponent,
      onImageClick,
      LoadingComponent,
      ErrorComponent,
      className,
      ...props
    },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const [isLightboxOpen, setIsLightboxOpen] = React.useState(false)
    const [zoomLevel, setZoomLevel] = React.useState(1)
    const [isAutoPlaying, setIsAutoPlaying] = React.useState(autoPlay)
    const intervalRef = React.useRef<NodeJS.Timeout | null>(null)

    // Auto-play functionality
    React.useEffect(() => {
      if (isAutoPlaying && layout === "carousel") {
        intervalRef.current = setInterval(() => {
          setCurrentIndex((prev) => (prev + 1) % images.length)
        }, autoPlayInterval)
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
      }

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
      }
    }, [isAutoPlaying, autoPlayInterval, images.length, layout])

    // Keyboard navigation
    React.useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (!isLightboxOpen) return

        switch (e.key) {
          case "ArrowLeft":
            e.preventDefault()
            goToPrevious()
            break
          case "ArrowRight":
            e.preventDefault()
            goToNext()
            break
          case "Escape":
            setIsLightboxOpen(false)
            break
          case "=":
          case "+":
            e.preventDefault()
            zoomIn()
            break
          case "-":
            e.preventDefault()
            zoomOut()
            break
        }
      }

      document.addEventListener("keydown", handleKeyDown)
      return () => document.removeEventListener("keydown", handleKeyDown)
    }, [isLightboxOpen])

    const goToPrevious = () => {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    }

    const goToNext = () => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }

    const zoomIn = () => {
      setZoomLevel((prev) => Math.min(prev + 0.5, 3))
    }

    const zoomOut = () => {
      setZoomLevel((prev) => Math.max(prev - 0.5, 0.5))
    }

    const handleImageClick = (index: number) => {
      setCurrentIndex(index)
      onImageClick?.(index)
      if (enableLightbox) {
        setIsLightboxOpen(true)
      }
    }

    const getGridCols = () => {
      const colsMap = {
        1: "grid-cols-1",
        2: "grid-cols-1 md:grid-cols-2",
        3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
        5: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
        6: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
      }
      return colsMap[columns]
    }

    const getGapClass = () => {
      const gapMap = {
        sm: "gap-2",
        md: "gap-4",
        lg: "gap-6",
      }
      return gapMap[gap]
    }

    // Grid Layout
    const renderGrid = () => (
      <div className={cn("grid", getGridCols(), getGapClass())}>
        {images.map((image, index) => (
          <div
            key={index}
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => handleImageClick(index)}
          >
            <Picture
              src={image.thumbnail || image.src}
              alt={image.alt}
              aspectRatio={aspectRatio}
              rounded={rounded}
              shadow={shadow}
              enableZoom={false}
              className="w-full"
            />
          </div>
        ))}
      </div>
    )

    // Masonry Layout
    const renderMasonry = () => (
      <div className={cn("columns-1 md:columns-2 lg:columns-3", getGapClass())}>
        {images.map((image, index) => (
          <div
            key={index}
            className="break-inside-avoid mb-4 cursor-pointer transition-transform hover:scale-105"
            onClick={() => handleImageClick(index)}
          >
            <Picture
              src={image.thumbnail || image.src}
              alt={image.alt}
              rounded={rounded}
              shadow={shadow}
              enableZoom={false}
              className="w-full"
            />
          </div>
        ))}
      </div>
    )

    // Carousel Layout
    const renderCarousel = () => (
      <div className="relative">
        <div className="overflow-hidden rounded-lg">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <Picture
                  src={image.src}
                  alt={image.alt}
                  aspectRatio={aspectRatio}
                  rounded="none"
                  shadow="none"
                  enableZoom={false}
                  className="w-full cursor-pointer"
                  onClick={() => handleImageClick(index)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        {showArrows && images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
              onClick={goToNext}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}

        {/* Dots Indicator */}
        {showDots && images.length > 1 && (
          <div className="flex justify-center mt-4 space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  index === currentIndex ? "bg-primary" : "bg-gray-300"
                )}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        )}

        {/* Auto-play control */}
        {autoPlay && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute bottom-2 right-2 bg-black/50 hover:bg-black/70 text-white"
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          >
            {isAutoPlaying ? "Pause" : "Play"}
          </Button>
        )}
      </div>
    )

    // Lightbox component
    const renderLightbox = () => (
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-screen-lg w-full h-full p-0 bg-black/90">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
              onClick={() => setIsLightboxOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Zoom controls */}
            {enableZoom && (
              <div className="absolute top-4 left-4 z-50 flex space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                  onClick={zoomOut}
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                  onClick={zoomIn}
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </div>
            )}

            {/* Main image */}
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              <img
                src={images[currentIndex]?.src}
                alt={images[currentIndex]?.alt}
                className="max-w-full max-h-full object-contain transition-transform duration-200"
                style={{ transform: `scale(${zoomLevel})` }}
              />
            </div>

            {/* Navigation */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
                  onClick={goToPrevious}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
                  onClick={goToNext}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </>
            )}

            {/* Image info */}
            {(images[currentIndex]?.title || images[currentIndex]?.description) && (
              <div className="absolute bottom-4 left-4 right-4 text-white">
                {images[currentIndex]?.title && (
                  <h3 className="text-lg font-semibold mb-1">
                    {images[currentIndex].title}
                  </h3>
                )}
                {images[currentIndex]?.description && (
                  <p className="text-sm opacity-75">
                    {images[currentIndex].description}
                  </p>
                )}
              </div>
            )}

            {/* Thumbnails */}
            {showThumbnails && images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-black/50 rounded-lg p-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    className={cn(
                      "w-12 h-12 rounded-md overflow-hidden border-2 transition-all",
                      index === currentIndex
                        ? "border-white scale-110"
                        : "border-transparent opacity-60 hover:opacity-80"
                    )}
                    onClick={() => setCurrentIndex(index)}
                  >
                    <img
                      src={image.thumbnail || image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    )

    if (images.length === 0) {
      return (
        <div className="flex items-center justify-center h-64 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">No images to display</p>
        </div>
      )
    }

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        {layout === "grid" && renderGrid()}
        {layout === "masonry" && renderMasonry()}
        {layout === "carousel" && renderCarousel()}
        {enableLightbox && renderLightbox()}
      </div>
    )
  }
)

ImageGallery.displayName = "ImageGallery"

export { ImageGallery }
