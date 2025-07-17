import { create } from "zustand"
import { persist } from "zustand/middleware"
import { type CustomTheme, type ThemeMode, themes as predefinedThemes } from "../themeData"

interface ThemeStore {
  activeThemeId: string
  mode: "light" | "dark"
  previewTheme: CustomTheme | null
  themes: CustomTheme[]
  isLoading: boolean
  error: string | null

  // Actions
  setActiveTheme: (themeId: string) => Promise<void>
  setMode: (mode: "light" | "dark") => void
  toggleMode: () => void
  setPreviewTheme: (theme: CustomTheme | null) => void
  clearPreview: () => void
  loadThemeSettings: () => Promise<void>
  loadAllThemes: () => Promise<void>
  saveThemeSettings: (themeId: string, mode: "light" | "dark") => Promise<void>
  saveCustomTheme: (theme: CustomTheme) => Promise<CustomTheme>
  updateCustomTheme: (theme: CustomTheme) => Promise<CustomTheme>
  deleteCustomTheme: (themeId: string) => Promise<void>
  generateUniqueThemeId: (baseName: string) => string

  // Getters
  getCurrentTheme: () => CustomTheme
  getCurrentThemeMode: () => ThemeMode
  getThemeById: (id: string) => CustomTheme | undefined
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      activeThemeId: "minimal-white",
      mode: "light",
      previewTheme: null,
      themes: predefinedThemes,
      isLoading: false,
      error: null,

      setActiveTheme: async (themeId: string) => {
        set({ activeThemeId: themeId, previewTheme: null })
        
        // Update active theme in database
        try {
          await fetch("/api/v1/themes/active", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ themeId }),
          })
        } catch (error) {
          console.error("Failed to update active theme:", error)
        }
        
        await get().saveThemeSettings(themeId, get().mode)
      },

      setMode: (mode: "light" | "dark") => {
        set({ mode })
        get().saveThemeSettings(get().activeThemeId, mode)
      },

      toggleMode: () => {
        const currentMode = get().mode
        const newMode = currentMode === "light" ? "dark" : "light"
        get().setMode(newMode)
      },

      setPreviewTheme: (theme: CustomTheme | null) => {
        set({ previewTheme: theme })
      },

      clearPreview: () => {
        set({ previewTheme: null })
      },

      loadAllThemes: async () => {
        set({ isLoading: true, error: null })

        try {
          const response = await fetch("/api/v1/themes")
          if (response.ok) {
            const data = await response.json()
            set({ themes: data.themes || predefinedThemes })
          } else {
            throw new Error("Failed to fetch themes")
          }
        } catch (error) {
          console.error("Failed to load themes:", error)
          set({ 
            error: "Failed to load themes",
            themes: predefinedThemes 
          })
        } finally {
          set({ isLoading: false })
        }
      },

      loadThemeSettings: async () => {
        set({ isLoading: true, error: null })

        try {
          // Load all themes first
          await get().loadAllThemes()
          
          // Then load settings
          const response = await fetch("/api/v1/themes/settings")

          if (response.ok) {
            const data = await response.json()
            const themeId = data.themeId || "minimal-white"
            const mode = data.mode === "dark" ? "dark" : "light"
            set({ activeThemeId: themeId, mode })
          } else {
            set({ activeThemeId: "minimal-white", mode: "light" })
          }
        } catch (error) {
          console.error("Failed to load theme settings:", error)
          set({
            error: "Failed to load theme settings",
            activeThemeId: "minimal-white",
            mode: "light",
          })
        } finally {
          set({ isLoading: false })
        }
      },

      saveThemeSettings: async (themeId: string, mode: "light" | "dark") => {
        try {
          const response = await fetch("/api/v1/themes/settings", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ themeId, mode }),
          })

          if (!response.ok) {
            throw new Error("Failed to save theme settings")
          }
        } catch (error) {
          console.error("Failed to save theme settings:", error)
          set({ error: "Failed to save theme settings" })

          // Fallback: save to localStorage if API fails
          localStorage.setItem("theme-settings", JSON.stringify({ themeId, mode }))
        }
      },

      // Helper function to generate unique theme ID
      generateUniqueThemeId: (baseName: string): string => {
        const timestamp = Date.now()
        const random = Math.random().toString(36).substring(2, 8)
        const cleanName = baseName.toLowerCase().replace(/[^a-z0-9]/g, '-')
        return `custom-${cleanName}-${timestamp}-${random}`
      },

      saveCustomTheme: async (theme: CustomTheme) => {
        set({ isLoading: true, error: null })
        
        try {
          const response = await fetch("/api/v1/themes/custom", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(theme),
          })

          if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error || "Failed to save custom theme")
          }

          const data = await response.json()
          const savedTheme = data.theme

          // Update themes list
          const currentThemes = get().themes
          set({ 
            themes: [...currentThemes, savedTheme],
            error: null
          })

          return savedTheme
        } catch (error) {
          console.error("Failed to save custom theme:", error)
          const errorMessage = error instanceof Error ? error.message : "Failed to save custom theme"
          set({ error: errorMessage })
          throw error
        } finally {
          set({ isLoading: false })
        }
      },

      updateCustomTheme: async (theme: CustomTheme) => {
        set({ isLoading: true, error: null })
        
        try {
          const response = await fetch(`/api/v1/themes/${theme.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(theme),
          })

          if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error || "Failed to update custom theme")
          }

          const data = await response.json()
          const updatedTheme = data.theme

          // Update themes list
          const currentThemes = get().themes
          const updatedThemes = currentThemes.map(t => 
            t.id === theme.id ? updatedTheme : t
          )
          
          set({ 
            themes: updatedThemes,
            error: null
          })

          return updatedTheme
        } catch (error) {
          console.error("Failed to update custom theme:", error)
          const errorMessage = error instanceof Error ? error.message : "Failed to update custom theme"
          set({ error: errorMessage })
          throw error
        } finally {
          set({ isLoading: false })
        }
      },

      deleteCustomTheme: async (themeId: string) => {
        set({ isLoading: true, error: null })
        
        try {
          const response = await fetch(`/api/v1/themes/${themeId}`, {
            method: "DELETE",
          })

          if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error || "Failed to delete custom theme")
          }

          // Update themes list
          const currentThemes = get().themes
          const filteredThemes = currentThemes.filter(t => t.id !== themeId)
          
          set({ 
            themes: filteredThemes,
            error: null
          })

          // If the deleted theme was active, switch to default
          if (get().activeThemeId === themeId) {
            await get().setActiveTheme("minimal-white")
          }
        } catch (error) {
          console.error("Failed to delete custom theme:", error)
          const errorMessage = error instanceof Error ? error.message : "Failed to delete custom theme"
          set({ error: errorMessage })
          throw error
        } finally {
          set({ isLoading: false })
        }
      },

      getCurrentTheme: () => {
        const state = get()
        if (state.previewTheme) {
          return state.previewTheme
        }
        return state.themes.find((theme) => theme.id === state.activeThemeId) || state.themes[0]
      },

      getCurrentThemeMode: () => {
        const state = get()
        const theme = state.getCurrentTheme()
        return theme[(state.mode + "Mode") as keyof CustomTheme] as ThemeMode
      },

      getThemeById: (id: string) => {
        const state = get()
        return state.themes.find((theme) => theme.id === id)
      },
    }),
    {
      name: "theme-store",
      partialize: (state) => ({
        activeThemeId: state.activeThemeId,
        mode: state.mode,
      }),
    },
  ),
)
