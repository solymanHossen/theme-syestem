'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { CustomTheme } from '@/lib/themeData'
import { 
  Palette, 
  Copy, 
  Download, 
  Upload, 
  RotateCcw,
  Lightbulb,
  Moon,
  Sun,
  Shuffle
} from 'lucide-react'

type PaletteColor = {
  name: string
  key: string
  value: string
  description: string
}

interface AdvancedPaletteSwitcherProps {
  theme: CustomTheme
  onThemeChange: (theme: CustomTheme) => void
  className?: string
}

export function AdvancedPaletteSwitcher({ 
  theme, 
  onThemeChange, 
  className = '' 
}: AdvancedPaletteSwitcherProps) {
  const [activeMode, setActiveMode] = useState<'light' | 'dark'>('light')
  const [copiedColor, setCopiedColor] = useState<string | null>(null)
  
  const currentPalette = activeMode === 'light' ? theme.lightMode.palette : theme.darkMode.palette
  
  const paletteColors: PaletteColor[] = [
    { name: 'Primary', key: 'primary', value: currentPalette.primary, description: 'Main brand color' },
    { name: 'Secondary', key: 'secondary', value: currentPalette.secondary, description: 'Supporting color' },
    { name: 'Background', key: 'background', value: currentPalette.background, description: 'Main background' },
    { name: 'Card', key: 'card', value: currentPalette.card, description: 'Card backgrounds' },
    { name: 'Text', key: 'text', value: currentPalette.text, description: 'Primary text' },
    { name: 'Border', key: 'border', value: currentPalette.border, description: 'Element borders' },
    { name: 'Muted', key: 'muted', value: currentPalette.muted, description: 'Muted backgrounds' },
    { name: 'Accent', key: 'accent', value: currentPalette.accent, description: 'Accent highlights' },
    { name: 'Success', key: 'success', value: currentPalette.success, description: 'Success states' },
    { name: 'Warning', key: 'warning', value: currentPalette.warning, description: 'Warning states' },
    { name: 'Error', key: 'error', value: currentPalette.error, description: 'Error states' },
  ]
  
  const handleColorChange = (colorKey: string, newValue: string) => {
    const updatedTheme = { ...theme }
    if (activeMode === 'light') {
      updatedTheme.lightMode.palette[colorKey as keyof typeof currentPalette] = newValue
    } else {
      updatedTheme.darkMode.palette[colorKey as keyof typeof currentPalette] = newValue
    }
    onThemeChange(updatedTheme)
  }
  
  const copyColorToClipboard = async (color: string, colorName: string) => {
    try {
      await navigator.clipboard.writeText(color)
      setCopiedColor(color)
      setTimeout(() => setCopiedColor(null), 2000)
    } catch (err) {
      console.error('Failed to copy color:', err)
    }
  }
  
  const generateRandomPalette = () => {
    const colors = [
      '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16',
      '#22c55e', '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9',
      '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef',
      '#ec4899', '#f43f5e'
    ]
    
    const randomColor = () => colors[Math.floor(Math.random() * colors.length)]
    
    const newPalette = {
      primary: randomColor(),
      secondary: randomColor(),
      background: activeMode === 'light' ? '#ffffff' : '#0f172a',
      card: activeMode === 'light' ? '#f9fafb' : '#1e293b',
      text: activeMode === 'light' ? '#111827' : '#f1f5f9',
      border: activeMode === 'light' ? '#e5e7eb' : '#374151',
      muted: activeMode === 'light' ? '#f3f4f6' : '#1f2937',
      accent: randomColor(),
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
    }
    
    const updatedTheme = { ...theme }
    if (activeMode === 'light') {
      updatedTheme.lightMode.palette = newPalette
    } else {
      updatedTheme.darkMode.palette = newPalette
    }
    onThemeChange(updatedTheme)
  }
  
  const resetToDefaults = () => {
    const defaultPalette = {
      primary: '#000000',
      secondary: '#6b7280',
      background: activeMode === 'light' ? '#ffffff' : '#0f172a',
      card: activeMode === 'light' ? '#f9fafb' : '#1e293b',
      text: activeMode === 'light' ? '#111827' : '#f1f5f9',
      border: activeMode === 'light' ? '#e5e7eb' : '#374151',
      muted: activeMode === 'light' ? '#f3f4f6' : '#1f2937',
      accent: '#f59e0b',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
    }
    
    const updatedTheme = { ...theme }
    if (activeMode === 'light') {
      updatedTheme.lightMode.palette = defaultPalette
    } else {
      updatedTheme.darkMode.palette = defaultPalette
    }
    onThemeChange(updatedTheme)
  }
  
  const exportPalette = () => {
    const paletteData = {
      name: theme.name,
      mode: activeMode,
      palette: currentPalette,
      exportedAt: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(paletteData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${theme.name}-${activeMode}-palette.json`
    a.click()
    URL.revokeObjectURL(url)
  }
  
  return (
    <Card className={`w-full max-w-4xl mx-auto ${className}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Advanced Palette Editor
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={generateRandomPalette}>
              <Shuffle className="w-4 h-4 mr-2" />
              Random
            </Button>
            <Button variant="outline" size="sm" onClick={resetToDefaults}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button variant="outline" size="sm" onClick={exportPalette}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeMode} onValueChange={(value) => setActiveMode(value as 'light' | 'dark')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="light" className="flex items-center gap-2">
              <Sun className="w-4 h-4" />
              Light Mode
            </TabsTrigger>
            <TabsTrigger value="dark" className="flex items-center gap-2">
              <Moon className="w-4 h-4" />
              Dark Mode
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeMode} className="space-y-6">
            {/* Color Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {paletteColors.map((color) => (
                <div key={color.key} className="space-y-2">
                  <Label className="text-sm font-medium flex items-center justify-between">
                    {color.name}
                    <Badge variant="secondary" className="text-xs">
                      {color.key}
                    </Badge>
                  </Label>
                  <div className="flex gap-2">
                    <div 
                      className="w-12 h-10 rounded-md border border-gray-300 cursor-pointer relative overflow-hidden"
                      style={{ backgroundColor: color.value }}
                      onClick={() => copyColorToClipboard(color.value, color.name)}
                    >
                      {copiedColor === color.value && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <Copy className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <Input
                        type="color"
                        value={color.value}
                        onChange={(e) => handleColorChange(color.key, e.target.value)}
                        className="w-full h-8"
                      />
                      <Input
                        type="text"
                        value={color.value}
                        onChange={(e) => handleColorChange(color.key, e.target.value)}
                        className="w-full h-8 text-xs font-mono"
                        placeholder="#000000"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{color.description}</p>
                </div>
              ))}
            </div>
            
            {/* Preview Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Preview</h3>
              <div 
                className="p-6 rounded-lg border"
                style={{ 
                  backgroundColor: currentPalette.background,
                  borderColor: currentPalette.border,
                  color: currentPalette.text
                }}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div 
                      className="px-4 py-2 rounded-md font-medium"
                      style={{ backgroundColor: currentPalette.primary, color: '#ffffff' }}
                    >
                      Primary Button
                    </div>
                    <div 
                      className="px-4 py-2 rounded-md font-medium border"
                      style={{ 
                        backgroundColor: currentPalette.background,
                        borderColor: currentPalette.border,
                        color: currentPalette.text
                      }}
                    >
                      Secondary Button
                    </div>
                  </div>
                  
                  <div 
                    className="p-4 rounded-md"
                    style={{ 
                      backgroundColor: currentPalette.card,
                      borderColor: currentPalette.border
                    }}
                  >
                    <h4 className="font-semibold mb-2">Card Component</h4>
                    <p className="text-sm" style={{ color: currentPalette.text }}>
                      This is how your card components will look with the selected palette.
                    </p>
                    <div className="flex gap-2 mt-3">
                      <span 
                        className="px-2 py-1 rounded text-xs"
                        style={{ backgroundColor: currentPalette.success, color: '#ffffff' }}
                      >
                        Success
                      </span>
                      <span 
                        className="px-2 py-1 rounded text-xs"
                        style={{ backgroundColor: currentPalette.warning, color: '#ffffff' }}
                      >
                        Warning
                      </span>
                      <span 
                        className="px-2 py-1 rounded text-xs"
                        style={{ backgroundColor: currentPalette.error, color: '#ffffff' }}
                      >
                        Error
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Accessibility Check */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Accessibility Notes</h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Ensure sufficient contrast between text and background colors</p>
                <p>• Test your color combinations for color blindness accessibility</p>
                <p>• Consider using tools like WebAIM's Contrast Checker</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
