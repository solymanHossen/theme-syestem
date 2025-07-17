"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Check, Palette, Settings2, Sun, Moon } from "lucide-react"
import type { CustomTheme } from "@/lib/themeData"
import { useThemeStore } from "@/lib/stores/themeStore"

interface ThemePreviewCardProps {
  theme: CustomTheme
  isActive: boolean
  currentMode: "light" | "dark"
  isAdmin?: boolean
  onCustomize?: () => void
}

export function ThemePreviewCard({
  theme,
  isActive,
  currentMode,
  isAdmin = false,
  onCustomize,
}: ThemePreviewCardProps) {
  const { setPreviewTheme, setActiveTheme, clearPreview, isLoading } = useThemeStore()

  const handlePreview = () => {
    setPreviewTheme(theme)
  }

  const handleSetActive = async () => {
    await setActiveTheme(theme.id)
  }

  const currentThemeMode = theme[(currentMode + "Mode") as keyof CustomTheme] as any

  return (
    <Card className="relative overflow-hidden transition-all duration-200 hover:shadow-lg">
      {isActive && (
        <div className="absolute top-2 right-2 z-10">
          <Badge variant="default" className="bg-green-600 text-white">
            <Check className="w-3 h-3 mr-1" />
            Active
          </Badge>
        </div>
      )}

      {theme.isCustom && (
        <div className="absolute top-2 left-2 z-10">
          <Badge variant="secondary" className="bg-blue-600 text-white">
            Custom
          </Badge>
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{theme.name}</CardTitle>
            <CardDescription className="text-sm mt-1">{theme.description}</CardDescription>
            <Badge variant="outline" className="mt-2 capitalize">
              {theme.category}
            </Badge>
          </div>
          <Palette className="w-5 h-5 text-muted-foreground" />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Mode Toggle Preview */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-medium">Color Modes</h4>
            <div className="flex items-center gap-1">
              <Sun className="w-3 h-3 text-yellow-500" />
              <Moon className="w-3 h-3 text-blue-500" />
            </div>
          </div>

          {/* Light Mode Colors */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Sun className="w-3 h-3 text-yellow-500" />
              <span className="text-xs font-medium">Light Mode</span>
            </div>
            <div className="grid grid-cols-6 gap-1">
              {Object.entries(theme.lightMode.palette)
                .slice(0, 6)
                .map(([key, color]) => (
                  <div
                    key={key}
                    className="w-6 h-6 rounded border"
                    style={{ backgroundColor: color }}
                    title={`${key}: ${color}`}
                  />
                ))}
            </div>
          </div>

          {/* Dark Mode Colors */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Moon className="w-3 h-3 text-blue-500" />
              <span className="text-xs font-medium">Dark Mode</span>
            </div>
            <div className="grid grid-cols-6 gap-1">
              {Object.entries(theme.darkMode.palette)
                .slice(0, 6)
                .map(([key, color]) => (
                  <div
                    key={key}
                    className="w-6 h-6 rounded border"
                    style={{ backgroundColor: color }}
                    title={`${key}: ${color}`}
                  />
                ))}
            </div>
          </div>
        </div>

        {/* Current Mode Preview */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Current Preview ({currentMode === "light" ? "Light" : "Dark"} Mode)</h4>
          <div
            className="p-3 rounded border"
            style={{
              backgroundColor: currentThemeMode.palette.card,
              borderColor: currentThemeMode.palette.border,
              color: currentThemeMode.palette.text,
            }}
          >
            <div className="space-y-2">
              <div
                className="px-3 py-1.5 text-white text-sm font-medium inline-block rounded"
                style={{ backgroundColor: currentThemeMode.palette.primary }}
              >
                Shop Now
              </div>
              <p className="text-xs" style={{ color: currentThemeMode.palette.muted }}>
                Sample product description text
              </p>
            </div>
          </div>
        </div>

        {/* Admin Actions */}
        {isAdmin && (
          <div className="flex gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={handlePreview} className="flex-1 bg-transparent">
              <Eye className="w-4 h-4 mr-1" />
              Preview
            </Button>

            {onCustomize && (
              <Button variant="outline" size="sm" onClick={onCustomize} className="flex-1 bg-transparent">
                <Settings2 className="w-4 h-4 mr-1" />
                Customize
              </Button>
            )}

            {!isActive && (
              <Button onClick={handleSetActive} disabled={isLoading} size="sm" className="flex-1">
                {isLoading ? "Setting..." : "Set Active"}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
