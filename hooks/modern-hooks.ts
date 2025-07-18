'use client'

import { useEffect, useState } from 'react'

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