/**
 * Convert hex color to RGB values (space-separated string for CSS variables)
 */
export function hexToRgb(hex: string): string {
  // Remove # if present
  const cleanHex = hex.replace('#', '')
  
  // Parse hex values
  const r = parseInt(cleanHex.slice(0, 2), 16)
  const g = parseInt(cleanHex.slice(2, 4), 16)
  const b = parseInt(cleanHex.slice(4, 6), 16)
  
  // Return space-separated RGB values
  return `${r} ${g} ${b}`
}

/**
 * Convert hex color to HSL values (space-separated string for CSS variables)
 */
export function hexToHsl(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const diff = max - min
  const sum = max + min
  const l = sum / 2

  let h = 0
  let s = 0

  if (diff !== 0) {
    s = l < 0.5 ? diff / sum : diff / (2 - sum)

    switch (max) {
      case r:
        h = ((g - b) / diff) + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / diff + 2
        break
      case b:
        h = (r - g) / diff + 4
        break
    }
    h /= 6
  }

  const hDeg = Math.round(h * 360)
  const sPercent = Math.round(s * 100)
  const lPercent = Math.round(l * 100)

  return `${hDeg} ${sPercent}% ${lPercent}%`
}

/**
 * Apply theme to CSS variables
 */
export function applyThemeVariables(theme: any, mode: 'light' | 'dark', customTheme?: any) {
  const root = document.documentElement
  const palette = theme.palette

  // Apply theme-specific RGB variables for custom components
  root.style.setProperty('--theme-primary', hexToRgb(palette.primary))
  root.style.setProperty('--theme-secondary', hexToRgb(palette.secondary))
  root.style.setProperty('--theme-background', hexToRgb(palette.background))
  root.style.setProperty('--theme-card', hexToRgb(palette.card))
  root.style.setProperty('--theme-border', hexToRgb(palette.border))
  root.style.setProperty('--theme-text', hexToRgb(palette.text))
  root.style.setProperty('--theme-muted', hexToRgb(palette.muted))
  root.style.setProperty('--theme-accent', hexToRgb(palette.accent))
  root.style.setProperty('--theme-success', hexToRgb(palette.success))
  root.style.setProperty('--theme-warning', hexToRgb(palette.warning))
  root.style.setProperty('--theme-error', hexToRgb(palette.error))

  // Apply shadcn/ui HSL variables for component consistency
  root.style.setProperty('--background', hexToHsl(palette.background))
  root.style.setProperty('--foreground', hexToHsl(palette.text))
  root.style.setProperty('--card', hexToHsl(palette.card))
  root.style.setProperty('--card-foreground', hexToHsl(palette.text))
  root.style.setProperty('--popover', hexToHsl(palette.card))
  root.style.setProperty('--popover-foreground', hexToHsl(palette.text))
  root.style.setProperty('--primary', hexToHsl(palette.primary))
  root.style.setProperty('--primary-foreground', hexToHsl(mode === 'light' ? '#ffffff' : palette.background))
  root.style.setProperty('--secondary', hexToHsl(palette.secondary))
  root.style.setProperty('--secondary-foreground', hexToHsl(palette.text))
  root.style.setProperty('--muted', hexToHsl(palette.muted))
  root.style.setProperty('--muted-foreground', hexToHsl(palette.text))
  root.style.setProperty('--accent', hexToHsl(palette.accent))
  root.style.setProperty('--accent-foreground', hexToHsl(mode === 'light' ? '#ffffff' : palette.background))
  root.style.setProperty('--destructive', hexToHsl(palette.error))
  root.style.setProperty('--destructive-foreground', hexToHsl('#ffffff'))
  root.style.setProperty('--border', hexToHsl(palette.border))
  root.style.setProperty('--input', hexToHsl(palette.border))
  root.style.setProperty('--ring', hexToHsl(palette.accent))

  // Apply radius variables if custom theme is provided
  if (customTheme?.radius) {
    const radiusMap = {
      none: '0px',
      sm: '0.125rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      full: '9999px'
    }
    
    root.style.setProperty('--radius', radiusMap[customTheme.radius.button as keyof typeof radiusMap] || '0.5rem')
    root.style.setProperty('--card-radius', radiusMap[customTheme.radius.card as keyof typeof radiusMap] || '0.5rem')
    root.style.setProperty('--input-radius', radiusMap[customTheme.radius.input as keyof typeof radiusMap] || '0.375rem')
  }

  // Apply typography variables if custom theme is provided
  if (customTheme?.typography) {
    const typography = customTheme.typography
    
    // Font families
    root.style.setProperty('--font-primary', typography.fontFamily.primary)
    root.style.setProperty('--font-secondary', typography.fontFamily.secondary)
    root.style.setProperty('--font-mono', typography.fontFamily.mono)
    
    // Font sizes
    Object.entries(typography.fontSize).forEach(([key, value]) => {
      root.style.setProperty(`--font-size-${key}`, value as string)
    })
    
    // Font weights
    Object.entries(typography.fontWeight).forEach(([key, value]) => {
      root.style.setProperty(`--font-weight-${key}`, value as string)
    })
  }

  // Update body styles
  document.body.style.backgroundColor = palette.background
  document.body.style.color = palette.text
  
  // Apply font family to body if available
  if (customTheme?.typography?.fontFamily?.primary) {
    document.body.style.fontFamily = customTheme.typography.fontFamily.primary
  }
  
  // Toggle dark class
  if (mode === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}
