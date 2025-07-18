"use client"

import type React from "react"
import { createContext, useContext, useEffect } from "react"

import { useThemeStore } from "@/lib/stores/themeStore"
import type { ThemeMode } from "@/lib/themeData"

interface ThemeContextType {
  currentTheme: ThemeMode
  mode: "light" | "dark"
  toggleMode: () => void
  setMode: (mode: "light" | "dark") => void
  isPreview: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { getCurrentThemeMode, initialize, mode, toggleMode, setMode, previewTheme, isInitialized, isLoading } = useThemeStore()
  const currentTheme = getCurrentThemeMode()
  const isPreview = previewTheme !== null

  useEffect(() => {
    // Initialize theme store when component mounts
    initialize()
  }, [initialize])

  useEffect(() => {
    // Only apply theme when initialized
    if (!isInitialized) return

    // Apply theme CSS variables to document root
    const root = document.documentElement
    const theme = currentTheme

    // Apply color variables
    root.style.setProperty("--theme-primary", theme.palette.primary)
    root.style.setProperty("--theme-secondary", theme.palette.secondary)
    root.style.setProperty("--theme-background", theme.palette.background)
    root.style.setProperty("--theme-card", theme.palette.card)
    root.style.setProperty("--theme-border", theme.palette.border)
    root.style.setProperty("--theme-text", theme.palette.text)
    root.style.setProperty("--theme-muted", theme.palette.muted)
    root.style.setProperty("--theme-accent", theme.palette.accent)
    root.style.setProperty("--theme-success", theme.palette.success)
    root.style.setProperty("--theme-warning", theme.palette.warning)
    root.style.setProperty("--theme-error", theme.palette.error)

    // Update document class for dark mode
    if (mode === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }

    // Update body background
    document.body.style.backgroundColor = theme.palette.background
    document.body.style.color = theme.palette.text
  }, [currentTheme, mode, isInitialized])

  // Show loading state until theme is initialized
  if (!isInitialized && isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          <span className="text-gray-600 dark:text-gray-300">Loading theme...</span>
        </div>
      </div>
    )
  }

  return (
    <ThemeContext.Provider value={{ currentTheme, mode, toggleMode, setMode, isPreview }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
