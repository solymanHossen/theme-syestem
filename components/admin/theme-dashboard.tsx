"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff, Palette, Settings, Plus, Search, Filter } from "lucide-react"
import { ThemePreviewCard } from "./theme-preview-card"
import { ThemeCustomizer } from "./theme-customizer"
import { themes, themeCategories, type CustomTheme } from "@/lib/themeData"
import { useThemeStore } from "@/lib/stores/themeStore"
import { useTheme } from "@/components/theme-provider"

export function ThemeDashboard() {
  const {
    activeThemeId,
    mode,
    previewTheme,
    themes: allThemes,
    clearPreview,
    loadThemeSettings,
    setActiveTheme,
    saveCustomTheme,
    updateCustomTheme,
    generateUniqueThemeId,
    isLoading,
    error,
  } = useThemeStore()

  const { isPreview } = useTheme()

  const [isCustomizing, setIsCustomizing] = useState(false)
  const [customizingTheme, setCustomizingTheme] = useState<CustomTheme | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  useEffect(() => {
    loadThemeSettings()
  }, [loadThemeSettings])

  const handleCreateCustomTheme = () => {
    setCustomizingTheme(null)
    setIsCustomizing(true)
  }

  const handleCustomizeTheme = (theme: CustomTheme) => {
    setCustomizingTheme(theme)
    setIsCustomizing(true)
  }

  const handleSaveCustomTheme = async (theme: CustomTheme) => {
    try {
      let savedTheme: CustomTheme
      
      if (customizingTheme && customizingTheme.isCustom) {
        // Update existing custom theme - use the original theme ID
        const themeToUpdate = { ...theme, id: customizingTheme.id }
        savedTheme = await updateCustomTheme(themeToUpdate)
      } else {
        // Create new custom theme from predefined theme or completely new
        let newTheme = { ...theme }
        
        // If customizing a predefined theme, create a unique ID and name
        if (customizingTheme && !customizingTheme.isCustom) {
          newTheme.id = generateUniqueThemeId(theme.name)
          newTheme.name = `${theme.name} (Custom)`
          newTheme.isCustom = true
        } else if (!theme.id || theme.id.startsWith('custom-')) {
          // Completely new theme or ensure unique ID
          newTheme.id = generateUniqueThemeId(theme.name)
          newTheme.isCustom = true
        }
        
        savedTheme = await saveCustomTheme(newTheme)
      }
      
      setIsCustomizing(false)
      setCustomizingTheme(null)
      
      // Set as active theme
      await setActiveTheme(savedTheme.id)
    } catch (error) {
      console.error("Failed to save theme:", error)
      // Error is handled by the store, don't close the customizer
    }
  }

  const handleCancelCustomization = () => {
    clearPreview()
    setIsCustomizing(false)
    setCustomizingTheme(null)
  }

  // Filter themes based on search and category
  const filteredThemes = allThemes.filter((theme) => {
    const matchesSearch =
      theme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      theme.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || theme.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  if (isCustomizing) {
    return (
      <ThemeCustomizer theme={customizingTheme} onSave={handleSaveCustomTheme} onCancel={handleCancelCustomization} />
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Theme Management</h1>
          <p className="text-muted-foreground mt-1">Manage and customize your eCommerce store themes</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleCreateCustomTheme}>
            <Plus className="w-4 h-4 mr-2" />
            Create Custom Theme
          </Button>
          <Badge variant="outline" className="flex items-center gap-1">
            <Palette className="w-3 h-3" />
            {allThemes.length} Themes Available
          </Badge>
        </div>
      </div>

      {/* Current Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Current Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-medium mb-1">Active Theme</h4>
              <p className="text-sm text-muted-foreground">
                {themes.find((t) => t.id === activeThemeId)?.name || "Unknown"}
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Current Mode</h4>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{mode === "light" ? "☀️ Light Mode" : "🌙 Dark Mode"}</Badge>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-1">Preview Mode</h4>
              <div className="flex items-center gap-2">
                {isPreview ? (
                  <>
                    <Badge variant="secondary">
                      <Eye className="w-3 h-3 mr-1" />
                      Previewing: {previewTheme?.name}
                    </Badge>
                    <Button variant="outline" size="sm" onClick={clearPreview}>
                      <EyeOff className="w-4 h-4 mr-1" />
                      Exit Preview
                    </Button>
                  </>
                ) : (
                  <span className="text-sm text-muted-foreground">None</span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search themes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {themeCategories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name} ({category.count})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Theme Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">
            {selectedCategory === "all" ? "All Themes" : themeCategories.find((c) => c.id === selectedCategory)?.name}
          </h2>
          <Badge variant="outline">
            {filteredThemes.length} theme{filteredThemes.length !== 1 ? "s" : ""} found
          </Badge>
        </div>

        {filteredThemes.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Palette className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No themes found</h3>
              <p className="text-muted-foreground text-center mb-4">
                Try adjusting your search or filter criteria, or create a new custom theme.
              </p>
              <Button onClick={handleCreateCustomTheme}>
                <Plus className="w-4 h-4 mr-2" />
                Create Custom Theme
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredThemes.map((theme) => (
              <ThemePreviewCard
                key={theme.id}
                theme={theme}
                isActive={activeThemeId === theme.id}
                currentMode={mode}
                isAdmin={true}
                onCustomize={() => handleCustomizeTheme(theme)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{error}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
