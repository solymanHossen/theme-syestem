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
  const { getCurrentThemeMode, loadThemeSettings, mode, toggleMode, setMode, previewTheme } = useThemeStore()
  const currentTheme = getCurrentThemeMode()
  const isPreview = previewTheme !== null

  useEffect(() => {
    loadThemeSettings()
  }, [loadThemeSettings])

  useEffect(() => {
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
  }, [currentTheme, mode])

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
