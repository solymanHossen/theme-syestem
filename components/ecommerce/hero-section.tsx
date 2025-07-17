"use client"
import { Button } from "@/components/ui/button"
import { ArrowRight, Mountain } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export function HeroSection() {
  const { currentTheme } = useTheme()

  return (
    <section
      className="relative py-20 px-4 themed-background"
      style={{ backgroundColor: currentTheme.palette.background }}
    >
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex justify-center mb-6">
            <Mountain className="w-16 h-16" style={{ color: currentTheme.palette.primary }} />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold themed-text" style={{ color: currentTheme.palette.text }}>
            Adventure Awaits
          </h1>

          <p className="text-xl md:text-2xl max-w-2xl mx-auto" style={{ color: currentTheme.palette.muted }}>
            Discover premium outdoor gear and camping equipment for your next adventure
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button
              size="lg"
              className="themed-button text-white"
              style={{ backgroundColor: currentTheme.palette.primary }}
            >
              Shop Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="themed-button bg-transparent"
              style={{
                borderColor: currentTheme.palette.border,
                color: currentTheme.palette.text,
                backgroundColor: currentTheme.palette.background,
              }}
            >
              View Catalog
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
