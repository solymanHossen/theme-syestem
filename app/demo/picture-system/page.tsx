"use client"

import { Picture } from "@/components/ui/picture"
import { ImageGallery } from "@/components/ui/image-gallery"
import { Avatar } from "@/components/ui/avatar-enhanced"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "@/components/theme-provider"

// Sample image data
const sampleImages = [
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Sample Image 1",
    title: "Beautiful Landscape",
    description: "A stunning view of mountains and valleys",
  },
  {
    src: "/placeholder.svg?height=600&width=400",
    alt: "Sample Image 2",
    title: "City Skyline",
    description: "Modern architecture against the sky",
  },
  {
    src: "/placeholder.svg?height=400&width=400",
    alt: "Sample Image 3",
    title: "Nature Close-up",
    description: "Detailed view of natural elements",
  },
  {
    src: "/placeholder.svg?height=300&width=400",
    alt: "Sample Image 4",
    title: "Abstract Art",
    description: "Creative and colorful composition",
  },
]

export default function PictureSystemDemo() {
  const { currentTheme } = useTheme()

  return (
    <div 
      className="min-h-screen p-8 space-y-12"
      style={{ backgroundColor: currentTheme.palette.background }}
    >
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 
            className="text-4xl font-bold mb-4"
            style={{ color: currentTheme.palette.text }}
          >
            Picture System Demo
          </h1>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: currentTheme.palette.muted }}
          >
            Comprehensive image handling with Tailwind CSS v4
          </p>
        </div>

        {/* Picture Component Examples */}
        <section className="mb-16">
          <h2 
            className="text-2xl font-semibold mb-8"
            style={{ color: currentTheme.palette.text }}
          >
            Picture Component Examples
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Basic Picture */}
            <Card style={{ backgroundColor: currentTheme.palette.card }}>
              <CardHeader>
                <CardTitle style={{ color: currentTheme.palette.text }}>
                  Basic Picture
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Picture
                  src="/placeholder.svg?height=200&width=300"
                  alt="Basic example"
                  aspectRatio="3/2"
                  rounded="lg"
                  shadow="md"
                />
              </CardContent>
            </Card>

            {/* Picture with Zoom */}
            <Card style={{ backgroundColor: currentTheme.palette.card }}>
              <CardHeader>
                <CardTitle style={{ color: currentTheme.palette.text }}>
                  Picture with Zoom
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Picture
                  src="/placeholder.svg?height=200&width=300"
                  alt="Zoom example"
                  aspectRatio="3/2"
                  rounded="lg"
                  shadow="md"
                  enableZoom={true}
                />
              </CardContent>
            </Card>

            {/* Square Picture */}
            <Card style={{ backgroundColor: currentTheme.palette.card }}>
              <CardHeader>
                <CardTitle style={{ color: currentTheme.palette.text }}>
                  Square Picture
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Picture
                  src="/placeholder.svg?height=200&width=200"
                  alt="Square example"
                  aspectRatio="1/1"
                  rounded="xl"
                  shadow="lg"
                  objectFit="cover"
                />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Image Gallery Examples */}
        <section className="mb-16">
          <h2 
            className="text-2xl font-semibold mb-8"
            style={{ color: currentTheme.palette.text }}
          >
            Image Gallery Examples
          </h2>

          <div className="space-y-12">
            {/* Grid Gallery */}
            <Card style={{ backgroundColor: currentTheme.palette.card }}>
              <CardHeader>
                <CardTitle style={{ color: currentTheme.palette.text }}>
                  Grid Gallery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ImageGallery
                  images={sampleImages}
                  layout="grid"
                  columns={3}
                  gap="md"
                  aspectRatio="4/3"
                  rounded="lg"
                  shadow="sm"
                />
              </CardContent>
            </Card>

            {/* Masonry Gallery */}
            <Card style={{ backgroundColor: currentTheme.palette.card }}>
              <CardHeader>
                <CardTitle style={{ color: currentTheme.palette.text }}>
                  Masonry Gallery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ImageGallery
                  images={sampleImages}
                  layout="masonry"
                  gap="md"
                  rounded="lg"
                  shadow="sm"
                />
              </CardContent>
            </Card>

            {/* Carousel Gallery */}
            <Card style={{ backgroundColor: currentTheme.palette.card }}>
              <CardHeader>
                <CardTitle style={{ color: currentTheme.palette.text }}>
                  Carousel Gallery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ImageGallery
                  images={sampleImages}
                  layout="carousel"
                  aspectRatio="16/9"
                  showArrows={true}
                  showDots={true}
                  autoPlay={true}
                  autoPlayInterval={4000}
                  rounded="lg"
                  shadow="md"
                />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Avatar Examples */}
        <section className="mb-16">
          <h2 
            className="text-2xl font-semibold mb-8"
            style={{ color: currentTheme.palette.text }}
          >
            Enhanced Avatar Examples
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Basic Avatars */}
            <Card style={{ backgroundColor: currentTheme.palette.card }}>
              <CardHeader>
                <CardTitle style={{ color: currentTheme.palette.text }}>
                  Different Sizes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Avatar
                    src="/placeholder-user.jpg"
                    alt="User 1"
                    size="xs"
                    fallback="U1"
                  />
                  <Avatar
                    src="/placeholder-user.jpg"
                    alt="User 2"
                    size="sm"
                    fallback="U2"
                  />
                  <Avatar
                    src="/placeholder-user.jpg"
                    alt="User 3"
                    size="md"
                    fallback="U3"
                  />
                  <Avatar
                    src="/placeholder-user.jpg"
                    alt="User 4"
                    size="lg"
                    fallback="U4"
                  />
                  <Avatar
                    src="/placeholder-user.jpg"
                    alt="User 5"
                    size="xl"
                    fallback="U5"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Status Avatars */}
            <Card style={{ backgroundColor: currentTheme.palette.card }}>
              <CardHeader>
                <CardTitle style={{ color: currentTheme.palette.text }}>
                  With Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Avatar
                    src="/placeholder-user.jpg"
                    alt="Online User"
                    size="lg"
                    fallback="ON"
                    showStatus={true}
                    status="online"
                  />
                  <Avatar
                    src="/placeholder-user.jpg"
                    alt="Away User"
                    size="lg"
                    fallback="AW"
                    showStatus={true}
                    status="away"
                  />
                  <Avatar
                    src="/placeholder-user.jpg"
                    alt="Busy User"
                    size="lg"
                    fallback="BS"
                    showStatus={true}
                    status="busy"
                  />
                  <Avatar
                    src="/placeholder-user.jpg"
                    alt="Offline User"
                    size="lg"
                    fallback="OF"
                    showStatus={true}
                    status="offline"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Shape Variations */}
            <Card style={{ backgroundColor: currentTheme.palette.card }}>
              <CardHeader>
                <CardTitle style={{ color: currentTheme.palette.text }}>
                  Shape Variations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Avatar
                    src="/placeholder-user.jpg"
                    alt="Circle Avatar"
                    size="lg"
                    shape="circle"
                    fallback="CI"
                    showRing={true}
                  />
                  <Avatar
                    src="/placeholder-user.jpg"
                    alt="Square Avatar"
                    size="lg"
                    shape="square"
                    fallback="SQ"
                    showRing={true}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Feature Highlights */}
        <section className="mb-16">
          <h2 
            className="text-2xl font-semibold mb-8"
            style={{ color: currentTheme.palette.text }}
          >
            Key Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card style={{ backgroundColor: currentTheme.palette.card }}>
              <CardContent className="p-6">
                <Badge className="mb-4">Performance</Badge>
                <h3 className="font-semibold mb-2" style={{ color: currentTheme.palette.text }}>
                  Optimized Loading
                </h3>
                <p className="text-sm" style={{ color: currentTheme.palette.muted }}>
                  Lazy loading, intersection observer, and progressive enhancement
                </p>
              </CardContent>
            </Card>

            <Card style={{ backgroundColor: currentTheme.palette.card }}>
              <CardContent className="p-6">
                <Badge className="mb-4">Responsive</Badge>
                <h3 className="font-semibold mb-2" style={{ color: currentTheme.palette.text }}>
                  Mobile First
                </h3>
                <p className="text-sm" style={{ color: currentTheme.palette.muted }}>
                  Responsive design with proper aspect ratios and breakpoints
                </p>
              </CardContent>
            </Card>

            <Card style={{ backgroundColor: currentTheme.palette.card }}>
              <CardContent className="p-6">
                <Badge className="mb-4">Accessible</Badge>
                <h3 className="font-semibold mb-2" style={{ color: currentTheme.palette.text }}>
                  A11y Ready
                </h3>
                <p className="text-sm" style={{ color: currentTheme.palette.muted }}>
                  Screen reader support, keyboard navigation, and semantic HTML
                </p>
              </CardContent>
            </Card>

            <Card style={{ backgroundColor: currentTheme.palette.card }}>
              <CardContent className="p-6">
                <Badge className="mb-4">Themeable</Badge>
                <h3 className="font-semibold mb-2" style={{ color: currentTheme.palette.text }}>
                  Theme Integration
                </h3>
                <p className="text-sm" style={{ color: currentTheme.palette.muted }}>
                  Works seamlessly with your theme system and color palette
                </p>
              </CardContent>
            </Card>

            <Card style={{ backgroundColor: currentTheme.palette.card }}>
              <CardContent className="p-6">
                <Badge className="mb-4">Interactive</Badge>
                <h3 className="font-semibold mb-2" style={{ color: currentTheme.palette.text }}>
                  Rich Features
                </h3>
                <p className="text-sm" style={{ color: currentTheme.palette.muted }}>
                  Zoom, lightbox, galleries, and interactive elements
                </p>
              </CardContent>
            </Card>

            <Card style={{ backgroundColor: currentTheme.palette.card }}>
              <CardContent className="p-6">
                <Badge className="mb-4">Customizable</Badge>
                <h3 className="font-semibold mb-2" style={{ color: currentTheme.palette.text }}>
                  Flexible API
                </h3>
                <p className="text-sm" style={{ color: currentTheme.palette.muted }}>
                  Extensive props and customization options for any use case
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="text-center">
          <Button
            size="lg"
            className="text-white mr-4"
            style={{ backgroundColor: currentTheme.palette.primary }}
          >
            Get Started
          </Button>
          <Button
            size="lg"
            variant="outline"
            style={{
              borderColor: currentTheme.palette.border,
              color: currentTheme.palette.text,
            }}
          >
            View Documentation
          </Button>
        </div>
      </div>
    </div>
  )
}
