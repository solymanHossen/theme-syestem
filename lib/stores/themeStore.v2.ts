'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { subscribeWithSelector } from 'zustand/middleware'
import { CustomTheme } from '@/lib/themeData'

export interface ThemeState {
  // Core theme state
  activeTheme: CustomTheme | null
  customThemes: CustomTheme[]
  mode: 'light' | 'dark'
  
  // UI state
  isLoading: boolean
  error: string | null
  
  // Optimistic state
  optimisticActiveTheme: CustomTheme | null
  optimisticCustomThemes: CustomTheme[]
  
  // Hydration state
  hasHydrated: boolean
  
  // Actions
  setActiveTheme: (theme: CustomTheme) => void
  setCustomThemes: (themes: CustomTheme[]) => void
  setMode: (mode: 'light' | 'dark') => void
  
  // Optimistic actions
  setOptimisticActiveTheme: (theme: CustomTheme) => void
  setOptimisticCustomThemes: (themes: CustomTheme[]) => void
  revertOptimisticChanges: () => void
  
  // Utility actions
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setHasHydrated: (hydrated: boolean) => void
  
  // Theme operations
  addCustomTheme: (theme: CustomTheme) => void
  updateCustomTheme: (theme: CustomTheme) => void
  deleteCustomTheme: (themeId: string) => void
  
  // Getters
  getCurrentTheme: () => CustomTheme | null
  getThemeById: (id: string) => CustomTheme | null
  isThemeActive: (themeId: string) => boolean
}

export const useThemeStore = create<ThemeState>()(
  subscribeWithSelector(
    persist(
      immer((set, get) => ({
        // Initial state
        activeTheme: null,
        customThemes: [],
        mode: 'light',
        isLoading: false,
        error: null,
        optimisticActiveTheme: null,
        optimisticCustomThemes: [],
        hasHydrated: false,
        
        // Core actions
        setActiveTheme: (theme) => set((state) => {
          state.activeTheme = theme
          state.optimisticActiveTheme = theme
          state.error = null
        }),
        
        setCustomThemes: (themes) => set((state) => {
          state.customThemes = themes
          state.optimisticCustomThemes = themes
          state.error = null
        }),
        
        setMode: (mode) => set((state) => {
          state.mode = mode
          state.error = null
        }),
        
        // Optimistic actions
        setOptimisticActiveTheme: (theme) => set((state) => {
          state.optimisticActiveTheme = theme
        }),
        
        setOptimisticCustomThemes: (themes) => set((state) => {
          state.optimisticCustomThemes = themes
        }),
        
        revertOptimisticChanges: () => set((state) => {
          state.optimisticActiveTheme = state.activeTheme
          state.optimisticCustomThemes = state.customThemes
        }),
        
        // Utility actions
        setLoading: (loading) => set((state) => {
          state.isLoading = loading
        }),
        
        setError: (error) => set((state) => {
          state.error = error
          state.isLoading = false
        }),
        
        setHasHydrated: (hydrated) => set((state) => {
          state.hasHydrated = hydrated
        }),
        
        // Theme operations
        addCustomTheme: (theme) => set((state) => {
          state.customThemes.push(theme)
          state.optimisticCustomThemes.push(theme)
        }),
        
        updateCustomTheme: (theme) => set((state) => {
          const index = state.customThemes.findIndex(t => t.id === theme.id)
          if (index !== -1) {
            state.customThemes[index] = theme
            state.optimisticCustomThemes[index] = theme
          }
          
          // Update active theme if it's the same
          if (state.activeTheme?.id === theme.id) {
            state.activeTheme = theme
            state.optimisticActiveTheme = theme
          }
        }),
        
        deleteCustomTheme: (themeId) => set((state) => {
          state.customThemes = state.customThemes.filter(t => t.id !== themeId)
          state.optimisticCustomThemes = state.optimisticCustomThemes.filter(t => t.id !== themeId)
          
          // Clear active theme if it's the deleted one
          if (state.activeTheme?.id === themeId) {
            state.activeTheme = null
            state.optimisticActiveTheme = null
          }
        }),
        
        // Getters
        getCurrentTheme: () => {
          const state = get()
          return state.optimisticActiveTheme || state.activeTheme
        },
        
        getThemeById: (id) => {
          const state = get()
          return state.optimisticCustomThemes.find(t => t.id === id) || 
                 state.customThemes.find(t => t.id === id) || 
                 null
        },
        
        isThemeActive: (themeId) => {
          const state = get()
          return (state.optimisticActiveTheme?.id || state.activeTheme?.id) === themeId
        },
      })),
      {
        name: 'theme-store',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          activeTheme: state.activeTheme,
          customThemes: state.customThemes,
          mode: state.mode,
        }),
        onRehydrateStorage: () => (state) => {
          state?.setHasHydrated(true)
        },
      }
    )
  )
)

// Selectors for performance optimization
export const useActiveTheme = () => useThemeStore(state => state.getCurrentTheme())
export const useCustomThemes = () => useThemeStore(state => state.optimisticCustomThemes.length > 0 ? state.optimisticCustomThemes : state.customThemes)
export const useThemeMode = () => useThemeStore(state => state.mode)
export const useThemeLoading = () => useThemeStore(state => state.isLoading)
export const useThemeError = () => useThemeStore(state => state.error)
export const useHasHydrated = () => useThemeStore(state => state.hasHydrated)

// Advanced selectors
export const useThemeById = (id: string) => 
  useThemeStore(state => state.getThemeById(id))

export const useIsThemeActive = (themeId: string) => 
  useThemeStore(state => state.isThemeActive(themeId))

export const useThemeActions = () => useThemeStore(state => ({
  setActiveTheme: state.setActiveTheme,
  setCustomThemes: state.setCustomThemes,
  setMode: state.setMode,
  setOptimisticActiveTheme: state.setOptimisticActiveTheme,
  setOptimisticCustomThemes: state.setOptimisticCustomThemes,
  revertOptimisticChanges: state.revertOptimisticChanges,
  addCustomTheme: state.addCustomTheme,
  updateCustomTheme: state.updateCustomTheme,
  deleteCustomTheme: state.deleteCustomTheme,
  setLoading: state.setLoading,
  setError: state.setError,
}))

// Theme store effects (for side effects)
export const useThemeEffects = () => {
  useThemeStore.subscribe(
    (state) => state.mode,
    (mode) => {
      // Apply theme mode to document
      if (typeof window !== 'undefined') {
        document.documentElement.classList.toggle('dark', mode === 'dark')
      }
    }
  )
  
  useThemeStore.subscribe(
    (state) => state.getCurrentTheme(),
    (theme) => {
      // Apply theme CSS variables
      if (typeof window !== 'undefined' && theme) {
        const palette = theme.lightMode.palette
        const root = document.documentElement
        
        Object.entries(palette).forEach(([key, value]) => {
          root.style.setProperty(`--theme-${key}`, value)
        })
      }
    }
  )
}
