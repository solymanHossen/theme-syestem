'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Check, Palette } from 'lucide-react'
import { useThemeStore } from '@/lib/stores/themeStore'
import { useTheme } from './theme-provider'

export function ThemeColorPicker() {
  const { themes, activeThemeId, setActiveTheme } = useThemeStore()
  const { currentTheme } = useTheme()

  const availableThemes = themes.filter(theme => 
    ['minimal-white', 'nature-green', 'ocean-blue', 'sunset-orange', 'royal-purple'].includes(theme.id)
  )

  const handleThemeChange = async (themeId: string) => {
    await setActiveTheme(themeId)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <div
            className="w-4 h-4 rounded-full border border-border"
            style={{ backgroundColor: currentTheme.palette.primary }}
          />
          <Palette className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {availableThemes.map(theme => (
          <DropdownMenuItem
            key={theme.id}
            onClick={() => handleThemeChange(theme.id)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full border border-border"
                style={{ backgroundColor: currentTheme.palette.primary }}
              />
              <div>
                <div className="font-medium">{theme.name}</div>
                <div className="text-xs text-muted-foreground">{theme.description}</div>
              </div>
            </div>
            {activeThemeId === theme.id && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
