'use client'

import type React from 'react'
import { createContext, useContext, useEffect } from 'react'

import { useThemeStore } from '@/lib/stores/themeStore'
import type { ThemeMode } from '@/lib/themeData'
import { applyThemeVariables } from '@/lib/utils/theme'

interface ThemeContextType {
  currentTheme: ThemeMode
  mode: 'light' | 'dark'
  toggleMode: () => void
  setMode: (mode: 'light' | 'dark') => void
  isPreview: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const {
    getCurrentTheme,
    getCurrentThemeMode,
    initialize,
    mode,
    toggleMode,
    setMode,
    previewTheme,
    isInitialized,
    isLoading,
  } = useThemeStore()
  
  const currentTheme = getCurrentThemeMode()
  const fullTheme = getCurrentTheme() // Get the full theme object for typography, radius, etc.
  const isPreview = previewTheme !== null

  useEffect(() => {
    // Initialize theme store when component mounts
    initialize()
  }, [initialize])

  useEffect(() => {
    // Only apply theme when initialized and we have a theme
    if (!isInitialized || !currentTheme) return

    // Apply theme CSS variables to document root
    applyThemeVariables(currentTheme, mode, fullTheme)
  }, [currentTheme, mode, isInitialized, fullTheme])

  // Show loading state until theme is initialized
  if (!isInitialized && isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          <span className="text-gray-600 dark:text-gray-300">
            Loading theme...
          </span>
        </div>
      </div>
    )
  }

  return (
    <ThemeContext.Provider
      value={{ currentTheme, mode, toggleMode, setMode, isPreview }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
