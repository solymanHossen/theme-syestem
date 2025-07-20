'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Check, Palette } from 'lucide-react'
import { useEffect, useState } from 'react'

interface ThemeColor {
  name: string
  value: string
  primary: string
  accent: string
}

const themeColors: ThemeColor[] = [
  {
    name: 'Blue',
    value: 'blue',
    primary: 'rgb(59 130 246)',
    accent: 'rgb(99 102 241)',
  },
  {
    name: 'Green',
    value: 'green',
    primary: 'rgb(34 197 94)',
    accent: 'rgb(22 163 74)',
  },
  {
    name: 'Purple',
    value: 'purple',
    primary: 'rgb(147 51 234)',
    accent: 'rgb(124 58 237)',
  },
  {
    name: 'Pink',
    value: 'pink',
    primary: 'rgb(236 72 153)',
    accent: 'rgb(219 39 119)',
  },
  {
    name: 'Orange',
    value: 'orange',
    primary: 'rgb(249 115 22)',
    accent: 'rgb(234 88 12)',
  },
]

export function ThemeColorPicker() {
  const [currentTheme, setCurrentTheme] = useState('blue')

  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme-color')
    if (savedTheme) {
      setCurrentTheme(savedTheme)
      document.documentElement.setAttribute('data-theme', savedTheme)
    }
  }, [])

  const handleThemeChange = (themeValue: string) => {
    setCurrentTheme(themeValue)
    document.documentElement.setAttribute('data-theme', themeValue)
    localStorage.setItem('theme-color', themeValue)
  }

  const getCurrentTheme = () => {
    return (
      themeColors.find(theme => theme.value === currentTheme) || themeColors[0]
    )
  }

  const currentThemeData = getCurrentTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <div
            className="w-4 h-4 rounded-full border border-theme-border"
            style={{ backgroundColor: currentThemeData.primary }}
          />
          <Palette className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {themeColors.map(theme => (
          <DropdownMenuItem
            key={theme.value}
            onClick={() => handleThemeChange(theme.value)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full border border-theme-border"
                style={{ backgroundColor: theme.primary }}
              />
              <span>{theme.name}</span>
            </div>
            {currentTheme === theme.value && (
              <Check className="h-4 w-4 text-theme-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
