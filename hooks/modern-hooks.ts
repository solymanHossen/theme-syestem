'use client'

import { useActionState, useOptimistic, startTransition, use, useTransition } from 'react'
import { useFormStatus } from 'react-dom'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useThemeStore, useThemeActions } from '@/lib/stores/themeStore.v2'
import { CustomTheme } from '@/lib/themeData'

// Modern server action hook with optimistic updates
export function useServerAction<T extends Record<string, any>, R>(
  action: (state: T, formData: FormData) => Promise<R>,
  initialState: T,
  optimisticUpdateFn?: (state: T, formData: FormData) => T
) {
  const [state, formAction] = useActionState(action, initialState)
  const [optimisticState, setOptimisticState] = useOptimistic(state, optimisticUpdateFn)
  const { pending } = useFormStatus()
  
  const wrappedAction = useCallback(async (formData: FormData) => {
    if (optimisticUpdateFn) {
      setOptimisticState(formData)
    }
    
    await formAction(formData)
  }, [formAction, optimisticUpdateFn, setOptimisticState])
  
  return {
    state: optimisticState,
    action: wrappedAction,
    isPending: pending,
  }
}

// Theme-specific hooks
export function useThemeTransition() {
  const [isPending, startTransition] = useTransition()
  const { setOptimisticActiveTheme, revertOptimisticChanges } = useThemeActions()
  
  const switchTheme = useCallback((theme: CustomTheme) => {
    setOptimisticActiveTheme(theme)
    
    startTransition(async () => {
      try {
        const response = await fetch('/api/v1/themes/active', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ themeId: theme.id }),
        })
        
        if (!response.ok) {
          throw new Error('Failed to switch theme')
        }
      } catch (error) {
        // Revert optimistic update on error
        revertOptimisticChanges()
        throw error
      }
    })
  }, [setOptimisticActiveTheme, revertOptimisticChanges])
  
  return {
    switchTheme,
    isPending,
  }
}

// Advanced theme customization hook
export function useThemeCustomization() {
  const [customizations, setCustomizations] = useState<Record<string, any>>({})
  const [previewMode, setPreviewMode] = useState(false)
  
  const applyCustomization = useCallback((key: string, value: any) => {
    setCustomizations(prev => ({
      ...prev,
      [key]: value,
    }))
    
    // Apply to CSS variables immediately for preview
    if (typeof window !== 'undefined') {
      document.documentElement.style.setProperty(`--theme-${key}`, value)
    }
  }, [])
  
  const commitCustomizations = useCallback(() => {
    // Convert customizations to theme object and save
    setPreviewMode(false)
    // Implementation depends on your theme structure
  }, [customizations])
  
  const resetCustomizations = useCallback(() => {
    setCustomizations({})
    setPreviewMode(false)
    
    // Reset CSS variables
    if (typeof window !== 'undefined') {
      Object.keys(customizations).forEach(key => {
        document.documentElement.style.removeProperty(`--theme-${key}`)
      })
    }
  }, [customizations])
  
  return {
    customizations,
    previewMode,
    applyCustomization,
    commitCustomizations,
    resetCustomizations,
    setPreviewMode,
  }
}

// Debounced value hook for theme customization
export function useDebounced<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])
  
  return debouncedValue
}

// Local storage hook with SSR safety
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }
    
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })
  
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }, [key, storedValue])
  
  return [storedValue, setValue] as const
}

// Theme persistence hook
export function useThemePersistence() {
  const activeTheme = useThemeStore(state => state.activeTheme)
  const mode = useThemeStore(state => state.mode)
  const { setActiveTheme, setMode } = useThemeActions()
  
  // Persist to localStorage
  useEffect(() => {
    if (activeTheme) {
      localStorage.setItem('active-theme', JSON.stringify(activeTheme))
    }
  }, [activeTheme])
  
  useEffect(() => {
    localStorage.setItem('theme-mode', mode)
  }, [mode])
  
  // Restore from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('active-theme')
    const savedMode = localStorage.getItem('theme-mode')
    
    if (savedTheme) {
      try {
        const theme = JSON.parse(savedTheme)
        setActiveTheme(theme)
      } catch (error) {
        console.error('Failed to restore active theme:', error)
      }
    }
    
    if (savedMode && (savedMode === 'light' || savedMode === 'dark')) {
      setMode(savedMode)
    }
  }, [setActiveTheme, setMode])
}

// Media query hook for responsive design
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)
  
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const media = window.matchMedia(query)
    setMatches(media.matches)
    
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }
    
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [query])
  
  return matches
}

// Theme CSS variables hook
export function useThemeCSSVariables() {
  const activeTheme = useThemeStore(state => state.getCurrentTheme())
  const mode = useThemeStore(state => state.mode)
  
  useEffect(() => {
    if (!activeTheme || typeof window === 'undefined') return
    
    const palette = mode === 'dark' ? activeTheme.darkMode.palette : activeTheme.lightMode.palette
    const root = document.documentElement
    
    // Apply theme colors
    Object.entries(palette).forEach(([key, value]) => {
      root.style.setProperty(`--theme-${key}`, value)
    })
    
  }, [activeTheme, mode])
}

// Form state management hook
export function useFormState<T>(initialState: T) {
  const [state, setState] = useState<T>(initialState)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  
  const updateField = useCallback((field: keyof T, value: any) => {
    setState(prev => ({ ...prev, [field]: value }))
    setTouched(prev => ({ ...prev, [field]: true }))
    
    // Clear error when field is updated
    if (errors[field as string]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field as string]
        return newErrors
      })
    }
  }, [errors])
  
  const setError = useCallback((field: string, error: string) => {
    setErrors(prev => ({ ...prev, [field]: error }))
  }, [])
  
  const clearErrors = useCallback(() => {
    setErrors({})
  }, [])
  
  const reset = useCallback(() => {
    setState(initialState)
    setErrors({})
    setTouched({})
  }, [initialState])
  
  return {
    state,
    errors,
    touched,
    updateField,
    setError,
    clearErrors,
    reset,
  }
}

// Intersection Observer hook for animations
export function useIntersectionObserver(
  ref: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  
  useEffect(() => {
    const element = ref.current
    if (!element) return
    
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      options
    )
    
    observer.observe(element)
    
    return () => observer.disconnect()
  }, [ref, options])
  
  return isIntersecting
}
