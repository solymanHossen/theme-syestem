"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cn } from "@/lib/utils"

export interface AvatarProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  /** Avatar size */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
  /** Avatar shape */
  shape?: "circle" | "square"
  /** Image source */
  src?: string
  /** Alt text for the image */
  alt?: string
  /** Fallback text (usually initials) */
  fallback?: string
  /** Show online status indicator */
  showStatus?: boolean
  /** Online status */
  status?: "online" | "offline" | "away" | "busy"
  /** Custom status color */
  statusColor?: string
  /** Loading state */
  loading?: boolean
  /** Custom loading component */
  LoadingComponent?: React.ComponentType
  /** Image quality */
  quality?: number
  /** Placeholder image */
  placeholder?: string
  /** Border width */
  borderWidth?: number
  /** Border color */
  borderColor?: string
  /** Custom ring color */
  ringColor?: string
  /** Show ring */
  showRing?: boolean
  /** Ring width */
  ringWidth?: number
  /** Enable hover effect */
  enableHover?: boolean
  /** Custom hover component */
  HoverComponent?: React.ComponentType
  /** Click handler */
  onClick?: () => void
  /** Custom class for the image */
  imageClassName?: string
  /** Custom class for the fallback */
  fallbackClassName?: string
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(
  (
    {
      className,
      size = "md",
      shape = "circle",
      src,
      alt,
      fallback,
      showStatus = false,
      status = "offline",
      statusColor,
      loading = false,
      LoadingComponent,
      quality = 75,
      placeholder = "/placeholder-user.jpg",
      borderWidth = 0,
      borderColor = "transparent",
      ringColor,
      showRing = false,
      ringWidth = 2,
      enableHover = false,
      HoverComponent,
      onClick,
      imageClassName,
      fallbackClassName,
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(!!src)

    // Size classes
    const sizeClasses = {
      xs: "h-6 w-6 text-xs",
      sm: "h-8 w-8 text-sm",
      md: "h-10 w-10 text-base",
      lg: "h-12 w-12 text-lg",
      xl: "h-16 w-16 text-xl",
      "2xl": "h-20 w-20 text-2xl",
    }

    // Shape classes
    const shapeClasses = {
      circle: "rounded-full",
      square: "rounded-lg",
    }

    // Status indicator size classes
    const statusSizeClasses = {
      xs: "h-1.5 w-1.5",
      sm: "h-2 w-2",
      md: "h-2.5 w-2.5",
      lg: "h-3 w-3",
      xl: "h-3.5 w-3.5",
      "2xl": "h-4 w-4",
    }

    // Status colors
    const statusColors = {
      online: "bg-green-500",
      offline: "bg-gray-400",
      away: "bg-yellow-500",
      busy: "bg-red-500",
    }

    // Ring classes
    const ringClasses = showRing
      ? `ring-${ringWidth} ring-offset-2 ring-offset-background`
      : ""

    // Handle image load
    const handleImageLoad = () => {
      setIsLoading(false)
      setImageError(false)
    }

    // Handle image error
    const handleImageError = () => {
      setIsLoading(false)
      setImageError(true)
    }

    // Default loading component
    const DefaultLoadingComponent = () => (
      <div className="animate-pulse bg-gray-300 dark:bg-gray-600 w-full h-full rounded-inherit" />
    )

    // Generate initials from name
    const generateInitials = (name: string) => {
      return name
        .split(" ")
        .map((word) => word.charAt(0))
        .join("")
        .toUpperCase()
        .slice(0, 2)
    }

    // Get fallback text
    const getFallbackText = () => {
      if (fallback) {
        return fallback.length > 2 ? generateInitials(fallback) : fallback
      }
      return alt ? generateInitials(alt) : "?"
    }

    return (
      <div className="relative inline-flex">
        <AvatarPrimitive.Root
          ref={ref}
          className={cn(
            "relative flex shrink-0 overflow-hidden",
            sizeClasses[size],
            shapeClasses[shape],
            ringClasses,
            ringColor && `ring-${ringColor}`,
            enableHover && "cursor-pointer transition-transform hover:scale-105",
            onClick && "cursor-pointer",
            className
          )}
          style={{
            borderWidth: borderWidth > 0 ? `${borderWidth}px` : undefined,
            borderColor: borderWidth > 0 ? borderColor : undefined,
          }}
          onClick={onClick}
          {...props}
        >
          {/* Loading state */}
          {loading && (
            <div className="absolute inset-0 z-10">
              {LoadingComponent ? <LoadingComponent /> : <DefaultLoadingComponent />}
            </div>
          )}

          {/* Image */}
          {src && !imageError && (
            <AvatarPrimitive.Image
              src={src}
              alt={alt}
              className={cn(
                "aspect-square h-full w-full object-cover",
                isLoading && "opacity-0",
                !isLoading && "opacity-100",
                imageClassName
              )}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          )}

          {/* Fallback */}
          <AvatarPrimitive.Fallback
            className={cn(
              "flex h-full w-full items-center justify-center bg-muted font-medium text-muted-foreground",
              shapeClasses[shape],
              fallbackClassName
            )}
            delayMs={src ? 600 : 0}
          >
            {getFallbackText()}
          </AvatarPrimitive.Fallback>

          {/* Hover overlay */}
          {enableHover && HoverComponent && (
            <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity bg-black/50 flex items-center justify-center">
              <HoverComponent />
            </div>
          )}
        </AvatarPrimitive.Root>

        {/* Status indicator */}
        {showStatus && (
          <div
            className={cn(
              "absolute bottom-0 right-0 rounded-full border-2 border-background",
              statusSizeClasses[size],
              statusColors[status]
            )}
            style={{
              backgroundColor: statusColor || undefined,
            }}
          />
        )}
      </div>
    )
  }
)

Avatar.displayName = "Avatar"

export { Avatar }
