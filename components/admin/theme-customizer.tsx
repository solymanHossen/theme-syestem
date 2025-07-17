"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Palette,
  Eye,
  Save,
  RotateCcw,
  Download,
  Upload,
  Type,
  Layout,
  Circle,
  Square,
  BracketsIcon as Spacing,
  Component,
  Settings2,
} from "lucide-react"
import type { CustomTheme } from "@/lib/themeData"
import { useThemeStore } from "@/lib/stores/themeStore"
import { themeCategories } from "@/lib/themeData"

interface ThemeCustomizerProps {
  theme?: CustomTheme
  onSave: (theme: CustomTheme) => void
  onCancel: () => void
}

export function ThemeCustomizer({ theme, onSave, onCancel }: ThemeCustomizerProps) {
  const { setPreviewTheme, generateUniqueThemeId, isLoading, error } = useThemeStore()
  
  const [customTheme, setCustomTheme] = useState<CustomTheme>(
    theme || {
      id: "", // Will be generated when saving
      name: "Custom Theme",
      description: "My custom theme",
      category: "modern",
      isCustom: true,
      lightMode: {
        id: "light",
        name: "Light Mode",
        description: "Light mode colors",
        palette: {
          primary: "#1a202c",
          secondary: "#4a5568",
          background: "#ffffff",
          card: "#f7fafc",
          border: "#e2e8f0",
          text: "#2d3748",
          muted: "#718096",
          accent: "#3182ce",
          success: "#38a169",
          warning: "#d69e2e",
          error: "#e53e3e",
        },
      },
      darkMode: {
        id: "dark",
        name: "Dark Mode",
        description: "Dark mode colors",
        palette: {
          primary: "#f8fafc",
          secondary: "#e2e8f0",
          background: "#0f172a",
          card: "#1e293b",
          border: "#334155",
          text: "#f8fafc",
          muted: "#94a3b8",
          accent: "#3b82f6",
          success: "#48bb78",
          warning: "#f6ad55",
          error: "#f56565",
        },
      },
      radius: {
        button: "md",
        card: "lg",
        input: "md",
        image: "md",
        badge: "full",
      },
      spacing: {
        scale: "normal",
        padding: "md",
        margin: "md",
        gap: "md",
      },
      typography: {
        fontFamily: {
          primary: "Inter, system-ui, sans-serif",
          secondary: "Inter, system-ui, sans-serif",
          mono: "JetBrains Mono, Consolas, monospace",
        },
        fontSize: {
          xs: "0.75rem",
          sm: "0.875rem",
          base: "1rem",
          lg: "1.125rem",
          xl: "1.25rem",
          "2xl": "1.5rem",
          "3xl": "1.875rem",
          "4xl": "2.25rem",
          "5xl": "3rem",
          "6xl": "3.75rem",
        },
        fontWeight: {
          light: "300",
          normal: "400",
          medium: "500",
          semibold: "600",
          bold: "700",
          extrabold: "800",
        },
        lineHeight: {
          tight: "1.25",
          snug: "1.375",
          normal: "1.5",
          relaxed: "1.625",
          loose: "2",
        },
        letterSpacing: {
          tighter: "-0.05em",
          tight: "-0.025em",
          normal: "0em",
          wide: "0.025em",
          wider: "0.05em",
          widest: "0.1em",
        },
      },
      components: {
        button: {
          size: "md",
          variant: "solid",
        },
        card: {
          padding: "md",
          shadow: "sm",
        },
        input: {
          size: "md",
          variant: "outline",
        },
      },
      shadows: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        sm: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
        inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
      },
      preview: {
        buttonStyle: "bg-slate-800 text-white hover:bg-slate-700",
        cardStyle: "bg-gray-50 border-gray-200",
      },
    },
  )

  const [activeMode, setActiveMode] = useState<"light" | "dark">("light")
  const [isSaving, setIsSaving] = useState(false)

  const updateTheme = (updates: Partial<CustomTheme>) => {
    const newTheme = { ...customTheme, ...updates }
    setCustomTheme(newTheme)
    setPreviewTheme(newTheme)
  }

  const updatePalette = (mode: "light" | "dark", key: string, value: string) => {
    const modeKey = (mode + "Mode") as keyof CustomTheme
    const currentMode = customTheme[modeKey] as any
    updateTheme({
      [modeKey]: {
        ...currentMode,
        palette: { ...currentMode.palette, [key]: value },
      },
    })
  }

  const updateRadius = (
    key: keyof CustomTheme["radius"],
    value: CustomTheme["radius"][keyof CustomTheme["radius"]],
  ) => {
    updateTheme({
      radius: { ...customTheme.radius, [key]: value },
    })
  }

  const updateSpacing = (key: keyof CustomTheme["spacing"], value: any) => {
    updateTheme({
      spacing: { ...customTheme.spacing, [key]: value },
    })
  }

  const updateTypography = (category: keyof CustomTheme["typography"], key: string, value: string) => {
    updateTheme({
      typography: {
        ...customTheme.typography,
        [category]: { ...customTheme.typography[category], [key]: value },
      },
    })
  }

  const updateComponents = (category: keyof CustomTheme["components"], key: string, value: any) => {
    updateTheme({
      components: {
        ...customTheme.components,
        [category]: { ...customTheme.components[category], [key]: value },
      },
    })
  }

  const updateShadows = (key: keyof CustomTheme["shadows"], value: string) => {
    updateTheme({
      shadows: { ...customTheme.shadows, [key]: value },
    })
  }

  const exportTheme = () => {
    const dataStr = JSON.stringify(customTheme, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
    const exportFileDefaultName = `${customTheme.name.toLowerCase().replace(/\s+/g, "-")}-theme.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const importTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const importedTheme = JSON.parse(e.target?.result as string)
          setCustomTheme(importedTheme)
          setPreviewTheme(importedTheme)
        } catch (error) {
          console.error("Failed to import theme:", error)
        }
      }
      reader.readAsText(file)
    }
  }

  const radiusOptions = [
    { value: "none", label: "None", preview: "0px" },
    { value: "sm", label: "Small", preview: "2px" },
    { value: "md", label: "Medium", preview: "6px" },
    { value: "lg", label: "Large", preview: "8px" },
    { value: "xl", label: "Extra Large", preview: "12px" },
    { value: "full", label: "Full", preview: "9999px" },
  ]

  const fontFamilies = [
    "Inter, system-ui, sans-serif",
    "Roboto, system-ui, sans-serif",
    "Open Sans, system-ui, sans-serif",
    "Poppins, system-ui, sans-serif",
    "Nunito, system-ui, sans-serif",
    "Lato, system-ui, sans-serif",
    "Montserrat, system-ui, sans-serif",
    "Source Sans Pro, system-ui, sans-serif",
    "Raleway, system-ui, sans-serif",
    "Ubuntu, system-ui, sans-serif",
    "Merriweather, serif",
    "Playfair Display, serif",
    "Crimson Text, serif",
    "Lora, serif",
    "PT Serif, serif",
  ]

  const monoFonts = [
    "JetBrains Mono, Consolas, monospace",
    "Fira Code, Consolas, monospace",
    "Source Code Pro, Consolas, monospace",
    "Monaco, Consolas, monospace",
    "Roboto Mono, Consolas, monospace",
    "Ubuntu Mono, Consolas, monospace",
  ]

  const currentModeData = customTheme[(activeMode + "Mode") as keyof CustomTheme] as any

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await onSave(customTheme)
    } catch (error) {
      console.error("Failed to save theme:", error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Advanced Theme Customizer</h2>
          <p className="text-muted-foreground">Create and customize every aspect of your theme</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={exportTheme}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" onClick={() => document.getElementById("import-theme")?.click()}>
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <input id="import-theme" type="file" accept=".json" onChange={importTheme} className="hidden" />
          <Button variant="outline" onClick={onCancel}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4zm16 0a8 8 0 01-8 8v-8h8z"
                  />
                </svg>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Theme
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="basic">Basic</TabsTrigger>
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="typography">Typography</TabsTrigger>
          <TabsTrigger value="radius">Radius</TabsTrigger>
          <TabsTrigger value="spacing">Spacing</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        {/* Basic Info Tab */}
        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings2 className="w-5 h-5" />
                Theme Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="theme-name">Theme Name</Label>
                  <Input
                    id="theme-name"
                    value={customTheme.name}
                    onChange={(e) => updateTheme({ name: e.target.value })}
                    placeholder="Enter theme name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="theme-category">Category</Label>
                  <Select
                    value={customTheme.category}
                    onValueChange={(value) => updateTheme({ category: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {themeCategories.slice(1).map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="theme-description">Description</Label>
                <Textarea
                  id="theme-description"
                  value={customTheme.description}
                  onChange={(e) => updateTheme({ description: e.target.value })}
                  placeholder="Describe your theme"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Colors Tab */}
        <TabsContent value="colors" className="space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <Label>Editing Mode:</Label>
            <div className="flex items-center gap-2">
              <Button
                variant={activeMode === "light" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveMode("light")}
              >
                ☀️ Light Mode
              </Button>
              <Button
                variant={activeMode === "dark" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveMode("dark")}
              >
                🌙 Dark Mode
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                {activeMode === "light" ? "Light Mode" : "Dark Mode"} Colors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {Object.entries(currentModeData.palette).map(([key, value]) => (
                  <div key={key} className="space-y-3">
                    <Label className="capitalize font-medium">{key.replace(/([A-Z])/g, " $1")}</Label>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-lg border-2 border-gray-200 shadow-sm"
                        style={{ backgroundColor: value as string }}
                      />
                      <div className="flex-1 space-y-2">
                        <Input
                          type="color"
                          value={value as string}
                          onChange={(e) => updatePalette(activeMode, key, e.target.value)}
                          className="w-full h-10 cursor-pointer"
                        />
                        <Input
                          type="text"
                          value={value as string}
                          onChange={(e) => updatePalette(activeMode, key, e.target.value)}
                          className="font-mono text-sm"
                          placeholder="#000000"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Typography Tab */}
        <TabsContent value="typography" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Font Families */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Type className="w-5 h-5" />
                  Font Families
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Primary Font</Label>
                  <Select
                    value={customTheme.typography.fontFamily.primary}
                    onValueChange={(value) => updateTypography("fontFamily", "primary", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fontFamilies.map((font) => (
                        <SelectItem key={font} value={font}>
                          <span style={{ fontFamily: font.split(",")[0] }}>{font.split(",")[0]}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Secondary Font</Label>
                  <Select
                    value={customTheme.typography.fontFamily.secondary}
                    onValueChange={(value) => updateTypography("fontFamily", "secondary", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fontFamilies.map((font) => (
                        <SelectItem key={font} value={font}>
                          <span style={{ fontFamily: font.split(",")[0] }}>{font.split(",")[0]}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Monospace Font</Label>
                  <Select
                    value={customTheme.typography.fontFamily.mono}
                    onValueChange={(value) => updateTypography("fontFamily", "mono", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {monoFonts.map((font) => (
                        <SelectItem key={font} value={font}>
                          <span style={{ fontFamily: font.split(",")[0] }}>{font.split(",")[0]}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Font Sizes */}
            <Card>
              <CardHeader>
                <CardTitle>Font Sizes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(customTheme.typography.fontSize).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <Label className="capitalize">{key}</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="text"
                        value={value}
                        onChange={(e) => updateTypography("fontSize", key, e.target.value)}
                        className="flex-1 font-mono text-sm"
                        placeholder="1rem"
                      />
                      <div
                        className="px-2 py-1 border rounded text-center min-w-[60px]"
                        style={{
                          fontSize: value,
                          fontFamily: customTheme.typography.fontFamily.primary.split(",")[0],
                        }}
                      >
                        Aa
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Font Weights */}
            <Card>
              <CardHeader>
                <CardTitle>Font Weights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(customTheme.typography.fontWeight).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <Label className="capitalize">{key}</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="text"
                        value={value}
                        onChange={(e) => updateTypography("fontWeight", key, e.target.value)}
                        className="flex-1 font-mono text-sm"
                        placeholder="400"
                      />
                      <div
                        className="px-2 py-1 border rounded text-center min-w-[60px]"
                        style={{
                          fontWeight: value,
                          fontFamily: customTheme.typography.fontFamily.primary.split(",")[0],
                        }}
                      >
                        Text
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Line Height & Letter Spacing */}
            <Card>
              <CardHeader>
                <CardTitle>Text Properties</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <h4 className="font-medium">Line Height</h4>
                  {Object.entries(customTheme.typography.lineHeight).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <Label className="capitalize">{key}</Label>
                      <Input
                        type="text"
                        value={value}
                        onChange={(e) => updateTypography("lineHeight", key, e.target.value)}
                        className="font-mono text-sm"
                        placeholder="1.5"
                      />
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Letter Spacing</h4>
                  {Object.entries(customTheme.typography.letterSpacing).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <Label className="capitalize">{key}</Label>
                      <Input
                        type="text"
                        value={value}
                        onChange={(e) => updateTypography("letterSpacing", key, e.target.value)}
                        className="font-mono text-sm"
                        placeholder="0em"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Radius Tab */}
        <TabsContent value="radius" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Circle className="w-5 h-5" />
                Border Radius Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(customTheme.radius).map(([key, value]) => (
                  <div key={key} className="space-y-3">
                    <Label className="capitalize">{key} Radius</Label>
                    <Select
                      value={value}
                      onValueChange={(newValue) => updateRadius(key as keyof CustomTheme["radius"], newValue as any)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {radiusOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center gap-3">
                              <div className="w-6 h-6 bg-primary" style={{ borderRadius: option.preview }} />
                              <span>{option.label}</span>
                              <Badge variant="outline" className="text-xs">
                                {option.preview}
                              </Badge>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {/* Preview */}
                    <div className="p-4 border rounded-md bg-muted/50">
                      <div
                        className="w-full h-12 bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium"
                        style={{
                          borderRadius: radiusOptions.find((r) => r.value === value)?.preview || "0px",
                        }}
                      >
                        {key.charAt(0).toUpperCase() + key.slice(1)} Preview
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Spacing Tab */}
        <TabsContent value="spacing" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Spacing className="w-5 h-5" />
                  Spacing Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Overall Scale</Label>
                  <Select value={customTheme.spacing.scale} onValueChange={(value) => updateSpacing("scale", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compact">Compact (0.75x)</SelectItem>
                      <SelectItem value="normal">Normal (1x)</SelectItem>
                      <SelectItem value="relaxed">Relaxed (1.25x)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Padding Scale</Label>
                  <Select
                    value={customTheme.spacing.padding}
                    onValueChange={(value) => updateSpacing("padding", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="xs">Extra Small</SelectItem>
                      <SelectItem value="sm">Small</SelectItem>
                      <SelectItem value="md">Medium</SelectItem>
                      <SelectItem value="lg">Large</SelectItem>
                      <SelectItem value="xl">Extra Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Margin Scale</Label>
                  <Select value={customTheme.spacing.margin} onValueChange={(value) => updateSpacing("margin", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="xs">Extra Small</SelectItem>
                      <SelectItem value="sm">Small</SelectItem>
                      <SelectItem value="md">Medium</SelectItem>
                      <SelectItem value="lg">Large</SelectItem>
                      <SelectItem value="xl">Extra Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Gap Scale</Label>
                  <Select value={customTheme.spacing.gap} onValueChange={(value) => updateSpacing("gap", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="xs">Extra Small</SelectItem>
                      <SelectItem value="sm">Small</SelectItem>
                      <SelectItem value="md">Medium</SelectItem>
                      <SelectItem value="lg">Large</SelectItem>
                      <SelectItem value="xl">Extra Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Spacing Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-md bg-muted/50">
                    <div
                      className="bg-primary text-primary-foreground rounded p-2 text-center"
                      style={{
                        padding:
                          customTheme.spacing.padding === "xs"
                            ? "0.25rem"
                            : customTheme.spacing.padding === "sm"
                              ? "0.5rem"
                              : customTheme.spacing.padding === "md"
                                ? "1rem"
                                : customTheme.spacing.padding === "lg"
                                  ? "1.5rem"
                                  : "2rem",
                      }}
                    >
                      Padding Preview
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <p>Scale: {customTheme.spacing.scale}</p>
                    <p>Padding: {customTheme.spacing.padding}</p>
                    <p>Margin: {customTheme.spacing.margin}</p>
                    <p>Gap: {customTheme.spacing.gap}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shadow Settings */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Shadow Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(customTheme.shadows).map(([key, value]) => (
                    <div key={key} className="space-y-3">
                      <Label className="capitalize">{key} Shadow</Label>
                      <Input
                        type="text"
                        value={value}
                        onChange={(e) => updateShadows(key as keyof CustomTheme["shadows"], e.target.value)}
                        className="font-mono text-sm"
                        placeholder="0 4px 6px -1px rgb(0 0 0 / 0.1)"
                      />

                      {/* Preview */}
                      <div className="p-4 bg-muted/50 rounded-md">
                        <div
                          className="w-full h-16 bg-card border rounded-md flex items-center justify-center text-sm font-medium"
                          style={{ boxShadow: value }}
                        >
                          {key.toUpperCase()} Shadow Preview
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Components Tab */}
        <TabsContent value="components" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Button Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Square className="w-5 h-5" />
                  Button Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Default Size</Label>
                  <Select
                    value={customTheme.components.button.size}
                    onValueChange={(value) => updateComponents("button", "size", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="xs">Extra Small</SelectItem>
                      <SelectItem value="sm">Small</SelectItem>
                      <SelectItem value="md">Medium</SelectItem>
                      <SelectItem value="lg">Large</SelectItem>
                      <SelectItem value="xl">Extra Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Default Variant</Label>
                  <Select
                    value={customTheme.components.button.variant}
                    onValueChange={(value) => updateComponents("button", "variant", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="solid">Solid</SelectItem>
                      <SelectItem value="outline">Outline</SelectItem>
                      <SelectItem value="ghost">Ghost</SelectItem>
                      <SelectItem value="link">Link</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Button Preview */}
                <div className="space-y-2">
                  <Label>Preview</Label>
                  <div className="p-4 border rounded-md bg-muted/50 flex gap-2">
                    <button
                      className={`px-4 py-2 rounded font-medium ${
                        customTheme.components.button.size === "xs"
                          ? "px-2 py-1 text-xs"
                          : customTheme.components.button.size === "sm"
                            ? "px-3 py-1.5 text-sm"
                            : customTheme.components.button.size === "md"
                              ? "px-4 py-2 text-sm"
                              : customTheme.components.button.size === "lg"
                                ? "px-6 py-3 text-base"
                                : "px-8 py-4 text-lg"
                      }`}
                      style={{
                        backgroundColor: currentModeData.palette.primary,
                        color: "white",
                        borderRadius:
                          radiusOptions.find((r) => r.value === customTheme.radius.button)?.preview || "6px",
                      }}
                    >
                      {customTheme.components.button.size.toUpperCase()} Button
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layout className="w-5 h-5" />
                  Card Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Default Padding</Label>
                  <Select
                    value={customTheme.components.card.padding}
                    onValueChange={(value) => updateComponents("card", "padding", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="xs">Extra Small</SelectItem>
                      <SelectItem value="sm">Small</SelectItem>
                      <SelectItem value="md">Medium</SelectItem>
                      <SelectItem value="lg">Large</SelectItem>
                      <SelectItem value="xl">Extra Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Default Shadow</Label>
                  <Select
                    value={customTheme.components.card.shadow}
                    onValueChange={(value) => updateComponents("card", "shadow", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="sm">Small</SelectItem>
                      <SelectItem value="md">Medium</SelectItem>
                      <SelectItem value="lg">Large</SelectItem>
                      <SelectItem value="xl">Extra Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Card Preview */}
                <div className="space-y-2">
                  <Label>Preview</Label>
                  <div
                    className="border rounded-md"
                    style={{
                      backgroundColor: currentModeData.palette.card,
                      borderColor: currentModeData.palette.border,
                      borderRadius: radiusOptions.find((r) => r.value === customTheme.radius.card)?.preview || "8px",
                      boxShadow:
                        customTheme.shadows[customTheme.components.card.shadow as keyof CustomTheme["shadows"]],
                      padding:
                        customTheme.components.card.padding === "xs"
                          ? "0.5rem"
                          : customTheme.components.card.padding === "sm"
                            ? "1rem"
                            : customTheme.components.card.padding === "md"
                              ? "1.5rem"
                              : customTheme.components.card.padding === "lg"
                                ? "2rem"
                                : "2.5rem",
                    }}
                  >
                    <h4 className="font-semibold mb-2" style={{ color: currentModeData.palette.text }}>
                      Sample Card
                    </h4>
                    <p className="text-sm" style={{ color: currentModeData.palette.muted }}>
                      This is how cards will appear with your settings.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Input Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Input Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Default Size</Label>
                  <Select
                    value={customTheme.components.input.size}
                    onValueChange={(value) => updateComponents("input", "size", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="xs">Extra Small</SelectItem>
                      <SelectItem value="sm">Small</SelectItem>
                      <SelectItem value="md">Medium</SelectItem>
                      <SelectItem value="lg">Large</SelectItem>
                      <SelectItem value="xl">Extra Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Default Variant</Label>
                  <Select
                    value={customTheme.components.input.variant}
                    onValueChange={(value) => updateComponents("input", "variant", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="outline">Outline</SelectItem>
                      <SelectItem value="filled">Filled</SelectItem>
                      <SelectItem value="underline">Underline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Input Preview */}
                <div className="space-y-2">
                  <Label>Preview</Label>
                  <div className="p-4 border rounded-md bg-muted/50">
                    <input
                      type="text"
                      placeholder="Sample input field"
                      className={`w-full border rounded font-medium ${
                        customTheme.components.input.size === "xs"
                          ? "px-2 py-1 text-xs"
                          : customTheme.components.input.size === "sm"
                            ? "px-3 py-1.5 text-sm"
                            : customTheme.components.input.size === "md"
                              ? "px-3 py-2 text-sm"
                              : customTheme.components.input.size === "lg"
                                ? "px-4 py-3 text-base"
                                : "px-5 py-4 text-lg"
                      }`}
                      style={{
                        backgroundColor: currentModeData.palette.background,
                        borderColor: currentModeData.palette.border,
                        color: currentModeData.palette.text,
                        borderRadius: radiusOptions.find((r) => r.value === customTheme.radius.input)?.preview || "6px",
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Preview Tab */}
        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Complete Theme Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {/* Light Mode Preview */}
                <div>
                  <h4 className="font-medium mb-4 flex items-center gap-2">
                    ☀️ Light Mode Preview
                    <Badge variant="outline">Complete Theme</Badge>
                  </h4>
                  <div
                    className="p-8 rounded-lg border space-y-6"
                    style={{
                      backgroundColor: customTheme.lightMode.palette.background,
                      borderColor: customTheme.lightMode.palette.border,
                      color: customTheme.lightMode.palette.text,
                      fontFamily: customTheme.typography.fontFamily.primary.split(",")[0],
                    }}
                  >
                    <div>
                      <h3
                        className="font-bold mb-2"
                        style={{
                          color: customTheme.lightMode.palette.text,
                          fontSize: customTheme.typography.fontSize["2xl"],
                          fontWeight: customTheme.typography.fontWeight.bold,
                          lineHeight: customTheme.typography.lineHeight.tight,
                        }}
                      >
                        Premium Outdoor Tent
                      </h3>
                      <p
                        style={{
                          color: customTheme.lightMode.palette.muted,
                          fontSize: customTheme.typography.fontSize.base,
                          lineHeight: customTheme.typography.lineHeight.normal,
                        }}
                      >
                        Experience the perfect blend of durability and comfort with our premium outdoor tent.
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <button
                        className="font-medium text-white transition-all"
                        style={{
                          backgroundColor: customTheme.lightMode.palette.primary,
                          borderRadius:
                            radiusOptions.find((r) => r.value === customTheme.radius.button)?.preview || "6px",
                          boxShadow:
                            customTheme.shadows[customTheme.components.card.shadow as keyof CustomTheme["shadows"]],
                          padding:
                            customTheme.components.button.size === "xs"
                              ? "0.25rem 0.5rem"
                              : customTheme.components.button.size === "sm"
                                ? "0.375rem 0.75rem"
                                : customTheme.components.button.size === "md"
                                  ? "0.5rem 1rem"
                                  : customTheme.components.button.size === "lg"
                                    ? "0.75rem 1.5rem"
                                    : "1rem 2rem",
                          fontSize:
                            customTheme.components.button.size === "xs"
                              ? customTheme.typography.fontSize.xs
                              : customTheme.components.button.size === "sm"
                                ? customTheme.typography.fontSize.sm
                                : customTheme.components.button.size === "md"
                                  ? customTheme.typography.fontSize.sm
                                  : customTheme.components.button.size === "lg"
                                    ? customTheme.typography.fontSize.base
                                    : customTheme.typography.fontSize.lg,
                        }}
                      >
                        Add to Cart - $299
                      </button>

                      <button
                        className="font-medium border transition-all"
                        style={{
                          backgroundColor: customTheme.lightMode.palette.card,
                          color: customTheme.lightMode.palette.text,
                          borderColor: customTheme.lightMode.palette.border,
                          borderRadius:
                            radiusOptions.find((r) => r.value === customTheme.radius.button)?.preview || "6px",
                          padding:
                            customTheme.components.button.size === "xs"
                              ? "0.25rem 0.5rem"
                              : customTheme.components.button.size === "sm"
                                ? "0.375rem 0.75rem"
                                : customTheme.components.button.size === "md"
                                  ? "0.5rem 1rem"
                                  : customTheme.components.button.size === "lg"
                                    ? "0.75rem 1.5rem"
                                    : "1rem 2rem",
                          fontSize:
                            customTheme.components.button.size === "xs"
                              ? customTheme.typography.fontSize.xs
                              : customTheme.components.button.size === "sm"
                                ? customTheme.typography.fontSize.sm
                                : customTheme.components.button.size === "md"
                                  ? customTheme.typography.fontSize.sm
                                  : customTheme.components.button.size === "lg"
                                    ? customTheme.typography.fontSize.base
                                    : customTheme.typography.fontSize.lg,
                        }}
                      >
                        View Details
                      </button>
                    </div>

                    <div
                      className="border"
                      style={{
                        backgroundColor: customTheme.lightMode.palette.card,
                        borderColor: customTheme.lightMode.palette.border,
                        borderRadius: radiusOptions.find((r) => r.value === customTheme.radius.card)?.preview || "8px",
                        boxShadow:
                          customTheme.shadows[customTheme.components.card.shadow as keyof CustomTheme["shadows"]],
                        padding:
                          customTheme.components.card.padding === "xs"
                            ? "0.5rem"
                            : customTheme.components.card.padding === "sm"
                              ? "1rem"
                              : customTheme.components.card.padding === "md"
                                ? "1.5rem"
                                : customTheme.components.card.padding === "lg"
                                  ? "2rem"
                                  : "2.5rem",
                      }}
                    >
                      <h4
                        className="font-semibold mb-3"
                        style={{
                          color: customTheme.lightMode.palette.text,
                          fontSize: customTheme.typography.fontSize.lg,
                          fontWeight: customTheme.typography.fontWeight.semibold,
                        }}
                      >
                        Product Features
                      </h4>
                      <ul className="space-y-2">
                        <li
                          style={{
                            color: customTheme.lightMode.palette.muted,
                            fontSize: customTheme.typography.fontSize.sm,
                          }}
                        >
                          ✓ Waterproof and windproof design
                        </li>
                        <li
                          style={{
                            color: customTheme.lightMode.palette.muted,
                            fontSize: customTheme.typography.fontSize.sm,
                          }}
                        >
                          ✓ Easy 5-minute setup
                        </li>
                        <li
                          style={{
                            color: customTheme.lightMode.palette.muted,
                            fontSize: customTheme.typography.fontSize.sm,
                          }}
                        >
                          ✓ Spacious interior for 4 people
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <Label style={{ color: customTheme.lightMode.palette.text }}>Email Address</Label>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full border"
                        style={{
                          backgroundColor: customTheme.lightMode.palette.background,
                          borderColor: customTheme.lightMode.palette.border,
                          color: customTheme.lightMode.palette.text,
                          borderRadius:
                            radiusOptions.find((r) => r.value === customTheme.radius.input)?.preview || "6px",
                          padding:
                            customTheme.components.input.size === "xs"
                              ? "0.25rem 0.5rem"
                              : customTheme.components.input.size === "sm"
                                ? "0.375rem 0.75rem"
                                : customTheme.components.input.size === "md"
                                  ? "0.5rem 0.75rem"
                                  : customTheme.components.input.size === "lg"
                                    ? "0.75rem 1rem"
                                    : "1rem 1.25rem",
                          fontSize:
                            customTheme.components.input.size === "xs"
                              ? customTheme.typography.fontSize.xs
                              : customTheme.components.input.size === "sm"
                                ? customTheme.typography.fontSize.sm
                                : customTheme.components.input.size === "md"
                                  ? customTheme.typography.fontSize.sm
                                  : customTheme.components.input.size === "lg"
                                    ? customTheme.typography.fontSize.base
                                    : customTheme.typography.fontSize.lg,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Dark Mode Preview */}
                <div>
                  <h4 className="font-medium mb-4 flex items-center gap-2">
                    🌙 Dark Mode Preview
                    <Badge variant="outline">Complete Theme</Badge>
                  </h4>
                  <div
                    className="p-8 rounded-lg border space-y-6"
                    style={{
                      backgroundColor: customTheme.darkMode.palette.background,
                      borderColor: customTheme.darkMode.palette.border,
                      color: customTheme.darkMode.palette.text,
                      fontFamily: customTheme.typography.fontFamily.primary.split(",")[0],
                    }}
                  >
                    <div>
                      <h3
                        className="font-bold mb-2"
                        style={{
                          color: customTheme.darkMode.palette.text,
                          fontSize: customTheme.typography.fontSize["2xl"],
                          fontWeight: customTheme.typography.fontWeight.bold,
                          lineHeight: customTheme.typography.lineHeight.tight,
                        }}
                      >
                        Premium Outdoor Tent
                      </h3>
                      <p
                        style={{
                          color: customTheme.darkMode.palette.muted,
                          fontSize: customTheme.typography.fontSize.base,
                          lineHeight: customTheme.typography.lineHeight.normal,
                        }}
                      >
                        Experience the perfect blend of durability and comfort with our premium outdoor tent.
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <button
                        className="font-medium text-white transition-all"
                        style={{
                          backgroundColor: customTheme.darkMode.palette.primary,
                          borderRadius:
                            radiusOptions.find((r) => r.value === customTheme.radius.button)?.preview || "6px",
                          boxShadow:
                            customTheme.shadows[customTheme.components.card.shadow as keyof CustomTheme["shadows"]],
                          padding:
                            customTheme.components.button.size === "xs"
                              ? "0.25rem 0.5rem"
                              : customTheme.components.button.size === "sm"
                                ? "0.375rem 0.75rem"
                                : customTheme.components.button.size === "md"
                                  ? "0.5rem 1rem"
                                  : customTheme.components.button.size === "lg"
                                    ? "0.75rem 1.5rem"
                                    : "1rem 2rem",
                          fontSize:
                            customTheme.components.button.size === "xs"
                              ? customTheme.typography.fontSize.xs
                              : customTheme.components.button.size === "sm"
                                ? customTheme.typography.fontSize.sm
                                : customTheme.components.button.size === "md"
                                  ? customTheme.typography.fontSize.sm
                                  : customTheme.components.button.size === "lg"
                                    ? customTheme.typography.fontSize.base
                                    : customTheme.typography.fontSize.lg,
                        }}
                      >
                        Add to Cart - $299
                      </button>

                      <button
                        className="font-medium border transition-all"
                        style={{
                          backgroundColor: customTheme.darkMode.palette.card,
                          color: customTheme.darkMode.palette.text,
                          borderColor: customTheme.darkMode.palette.border,
                          borderRadius:
                            radiusOptions.find((r) => r.value === customTheme.radius.button)?.preview || "6px",
                          padding:
                            customTheme.components.button.size === "xs"
                              ? "0.25rem 0.5rem"
                              : customTheme.components.button.size === "sm"
                                ? "0.375rem 0.75rem"
                                : customTheme.components.button.size === "md"
                                  ? "0.5rem 1rem"
                                  : customTheme.components.button.size === "lg"
                                    ? "0.75rem 1.5rem"
                                    : "1rem 2rem",
                          fontSize:
                            customTheme.components.button.size === "xs"
                              ? customTheme.typography.fontSize.xs
                              : customTheme.components.button.size === "sm"
                                ? customTheme.typography.fontSize.sm
                                : customTheme.components.button.size === "md"
                                  ? customTheme.typography.fontSize.sm
                                  : customTheme.components.button.size === "lg"
                                    ? customTheme.typography.fontSize.base
                                    : customTheme.typography.fontSize.lg,
                        }}
                      >
                        View Details
                      </button>
                    </div>

                    <div
                      className="border"
                      style={{
                        backgroundColor: customTheme.darkMode.palette.card,
                        borderColor: customTheme.darkMode.palette.border,
                        borderRadius: radiusOptions.find((r) => r.value === customTheme.radius.card)?.preview || "8px",
                        boxShadow:
                          customTheme.shadows[customTheme.components.card.shadow as keyof CustomTheme["shadows"]],
                        padding:
                          customTheme.components.card.padding === "xs"
                            ? "0.5rem"
                            : customTheme.components.card.padding === "sm"
                              ? "1rem"
                              : customTheme.components.card.padding === "md"
                                ? "1.5rem"
                                : customTheme.components.card.padding === "lg"
                                  ? "2rem"
                                  : "2.5rem",
                      }}
                    >
                      <h4
                        className="font-semibold mb-3"
                        style={{
                          color: customTheme.darkMode.palette.text,
                          fontSize: customTheme.typography.fontSize.lg,
                          fontWeight: customTheme.typography.fontWeight.semibold,
                        }}
                      >
                        Product Features
                      </h4>
                      <ul className="space-y-2">
                        <li
                          style={{
                            color: customTheme.darkMode.palette.muted,
                            fontSize: customTheme.typography.fontSize.sm,
                          }}
                        >
                          ✓ Waterproof and windproof design
                        </li>
                        <li
                          style={{
                            color: customTheme.darkMode.palette.muted,
                            fontSize: customTheme.typography.fontSize.sm,
                          }}
                        >
                          ✓ Easy 5-minute setup
                        </li>
                        <li
                          style={{
                            color: customTheme.darkMode.palette.muted,
                            fontSize: customTheme.typography.fontSize.sm,
                          }}
                        >
                          ✓ Spacious interior for 4 people
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <Label style={{ color: customTheme.darkMode.palette.text }}>Email Address</Label>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full border"
                        style={{
                          backgroundColor: customTheme.darkMode.palette.background,
                          borderColor: customTheme.darkMode.palette.border,
                          color: customTheme.darkMode.palette.text,
                          borderRadius:
                            radiusOptions.find((r) => r.value === customTheme.radius.input)?.preview || "6px",
                          padding:
                            customTheme.components.input.size === "xs"
                              ? "0.25rem 0.5rem"
                              : customTheme.components.input.size === "sm"
                                ? "0.375rem 0.75rem"
                                : customTheme.components.input.size === "md"
                                  ? "0.5rem 0.75rem"
                                  : customTheme.components.input.size === "lg"
                                    ? "0.75rem 1rem"
                                    : "1rem 1.25rem",
                          fontSize:
                            customTheme.components.input.size === "xs"
                              ? customTheme.typography.fontSize.xs
                              : customTheme.components.input.size === "sm"
                                ? customTheme.typography.fontSize.sm
                                : customTheme.components.input.size === "md"
                                  ? customTheme.typography.fontSize.sm
                                  : customTheme.components.input.size === "lg"
                                    ? customTheme.typography.fontSize.base
                                    : customTheme.typography.fontSize.lg,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Typography Showcase */}
                <div>
                  <h4 className="font-medium mb-4 flex items-center gap-2">
                    <Type className="w-4 h-4" />
                    Typography Showcase
                  </h4>
                  <div
                    className="p-6 rounded-lg border space-y-4"
                    style={{
                      backgroundColor: currentModeData.palette.card,
                      borderColor: currentModeData.palette.border,
                      color: currentModeData.palette.text,
                    }}
                  >
                    {Object.entries(customTheme.typography.fontSize).map(([size, value]) => (
                      <div key={size} className="flex items-center gap-4">
                        <Badge variant="outline" className="min-w-[60px] justify-center">
                          {size}
                        </Badge>
                        <div
                          style={{
                            fontSize: value,
                            fontFamily: customTheme.typography.fontFamily.primary.split(",")[0],
                            color: currentModeData.palette.text,
                          }}
                        >
                          The quick brown fox jumps over the lazy dog
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Component Sizes Showcase */}
                <div>
                  <h4 className="font-medium mb-4 flex items-center gap-2">
                    <Component className="w-4 h-4" />
                    Component Sizes
                  </h4>
                  <div
                    className="p-6 rounded-lg border space-y-6"
                    style={{
                      backgroundColor: currentModeData.palette.card,
                      borderColor: currentModeData.palette.border,
                    }}
                  >
                    {/* Button Sizes */}
                    <div>
                      <h5 className="font-medium mb-3" style={{ color: currentModeData.palette.text }}>
                        Button Sizes
                      </h5>
                      <div className="flex flex-wrap gap-3">
                        {["xs", "sm", "md", "lg", "xl"].map((size) => (
                          <button
                            key={size}
                            className="font-medium text-white"
                            style={{
                              backgroundColor: currentModeData.palette.primary,
                              borderRadius:
                                radiusOptions.find((r) => r.value === customTheme.radius.button)?.preview || "6px",
                              padding:
                                size === "xs"
                                  ? "0.25rem 0.5rem"
                                  : size === "sm"
                                    ? "0.375rem 0.75rem"
                                    : size === "md"
                                      ? "0.5rem 1rem"
                                      : size === "lg"
                                        ? "0.75rem 1.5rem"
                                        : "1rem 2rem",
                              fontSize:
                                size === "xs"
                                  ? customTheme.typography.fontSize.xs
                                  : size === "sm"
                                    ? customTheme.typography.fontSize.sm
                                    : size === "md"
                                      ? customTheme.typography.fontSize.sm
                                      : size === "lg"
                                        ? customTheme.typography.fontSize.base
                                        : customTheme.typography.fontSize.lg,
                            }}
                          >
                            {size.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Input Sizes */}
                    <div>
                      <h5 className="font-medium mb-3" style={{ color: currentModeData.palette.text }}>
                        Input Sizes
                      </h5>
                      <div className="space-y-3">
                        {["xs", "sm", "md", "lg", "xl"].map((size) => (
                          <input
                            key={size}
                            type="text"
                            placeholder={`${size.toUpperCase()} input field`}
                            className="w-full border"
                            style={{
                              backgroundColor: currentModeData.palette.background,
                              borderColor: currentModeData.palette.border,
                              color: currentModeData.palette.text,
                              borderRadius:
                                radiusOptions.find((r) => r.value === customTheme.radius.input)?.preview || "6px",
                              padding:
                                size === "xs"
                                  ? "0.25rem 0.5rem"
                                  : size === "sm"
                                    ? "0.375rem 0.75rem"
                                    : size === "md"
                                      ? "0.5rem 0.75rem"
                                      : size === "lg"
                                        ? "0.75rem 1rem"
                                        : "1rem 1.25rem",
                              fontSize:
                                size === "xs"
                                  ? customTheme.typography.fontSize.xs
                                  : size === "sm"
                                    ? customTheme.typography.fontSize.sm
                                    : size === "md"
                                      ? customTheme.typography.fontSize.sm
                                      : size === "lg"
                                        ? customTheme.typography.fontSize.base
                                        : customTheme.typography.fontSize.lg,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
