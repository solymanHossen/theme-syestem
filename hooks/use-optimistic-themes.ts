'use client'

import { useOptimistic, useActionState, useTransition } from 'react'
import { useCallback, useMemo } from 'react'
import type { CustomTheme } from '@/lib/themeData'

// React 19 optimized hook for theme management
export function useOptimisticThemes(initialThemes: CustomTheme[]) {
  const [isPending, startTransition] = useTransition()
  const [optimisticThemes, addOptimisticTheme] = useOptimistic(
    initialThemes,
    (state, newTheme: CustomTheme) => [...state, newTheme]
  )

  const addTheme = useCallback((theme: CustomTheme) => {
    startTransition(() => {
      addOptimisticTheme(theme)
    })
  }, [addOptimisticTheme])

  const memoizedThemes = useMemo(() => optimisticThemes, [optimisticThemes])

  return {
    themes: memoizedThemes,
    addTheme,
    isPending,
  }
}

// React 19 form action hook
export function useThemeAction(action: (formData: FormData) => Promise<any>) {
  const [state, formAction, isPending] = useActionState(action, null)

  return {
    state,
    formAction,
    isPending,
  }
}

// Performance-optimized theme selector
export function useThemeSelector<T>(
  themes: CustomTheme[],
  selector: (themes: CustomTheme[]) => T,
  deps: React.DependencyList = []
) {
  return useMemo(() => selector(themes), [themes, ...deps])
}
