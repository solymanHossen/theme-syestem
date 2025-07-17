import mongoose, { Document, Schema } from 'mongoose'

// Theme Mode interface
export interface IThemeMode {
  id: 'light' | 'dark'
  name: string
  description: string
  palette: {
    primary: string
    secondary: string
    background: string
    card: string
    border: string
    text: string
    muted: string
    accent: string
    success: string
    warning: string
    error: string
  }
}

// Custom Theme interface
export interface ICustomTheme extends Document {
  id: string
  name: string
  description: string
  category: 'outdoor' | 'modern' | 'classic' | 'vibrant' | 'nature' | 'minimal'
  isCustom?: boolean
  createdAt: Date
  updatedAt: Date
  lightMode: IThemeMode
  darkMode: IThemeMode
  radius: {
    button: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
    card: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
    input: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
    image: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
    badge: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  }
  spacing: {
    scale: 'compact' | 'normal' | 'relaxed'
    padding: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    margin: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    gap: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  }
  typography: {
    fontFamily: {
      primary: string
      secondary: string
      mono: string
    }
    fontSize: {
      xs: string
      sm: string
      base: string
      lg: string
      xl: string
      '2xl': string
      '3xl': string
      '4xl': string
      '5xl': string
      '6xl': string
    }
    fontWeight: {
      light: string
      normal: string
      medium: string
      semibold: string
      bold: string
      extrabold: string
    }
    lineHeight: {
      tight: string
      snug: string
      normal: string
      relaxed: string
      loose: string
    }
    letterSpacing: {
      tighter: string
      tight: string
      normal: string
      wide: string
      wider: string
      widest: string
    }
  }
  components: {
    button: {
      size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
      variant: 'solid' | 'outline' | 'ghost' | 'link'
    }
    card: {
      padding: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
      shadow: 'none' | 'sm' | 'md' | 'lg' | 'xl'
    }
    input: {
      size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
      variant: 'outline' | 'filled' | 'underline'
    }
  }
  shadows: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
    '2xl': string
    inner: string
  }
  preview: {
    buttonStyle: string
    cardStyle: string
  }
}

// Active Theme interface
export interface IActiveTheme extends Document {
  themeId: string
  updatedAt: Date
}

// Theme Settings interface
export interface IThemeSettings extends Document {
  themeId: string
  mode: 'light' | 'dark'
  updatedAt: Date
}

// Theme Palette Schema
const ThemePaletteSchema = new Schema({
  primary: { type: String, required: true },
  secondary: { type: String, required: true },
  background: { type: String, required: true },
  card: { type: String, required: true },
  border: { type: String, required: true },
  text: { type: String, required: true },
  muted: { type: String, required: true },
  accent: { type: String, required: true },
  success: { type: String, required: true },
  warning: { type: String, required: true },
  error: { type: String, required: true }
})

// Theme Mode Schema
const ThemeModeSchema = new Schema({
  id: { type: String, enum: ['light', 'dark'], required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  palette: { type: ThemePaletteSchema, required: true }
})

// Custom Theme Schema
const CustomThemeSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['outdoor', 'modern', 'classic', 'vibrant', 'nature', 'minimal'], 
    required: true 
  },
  isCustom: { type: Boolean, default: false },
  lightMode: { type: ThemeModeSchema, required: true },
  darkMode: { type: ThemeModeSchema, required: true },
  radius: {
    button: { type: String, enum: ['none', 'sm', 'md', 'lg', 'xl', 'full'], default: 'md' },
    card: { type: String, enum: ['none', 'sm', 'md', 'lg', 'xl', 'full'], default: 'lg' },
    input: { type: String, enum: ['none', 'sm', 'md', 'lg', 'xl', 'full'], default: 'md' },
    image: { type: String, enum: ['none', 'sm', 'md', 'lg', 'xl', 'full'], default: 'md' },
    badge: { type: String, enum: ['none', 'sm', 'md', 'lg', 'xl', 'full'], default: 'full' }
  },
  spacing: {
    scale: { type: String, enum: ['compact', 'normal', 'relaxed'], default: 'normal' },
    padding: { type: String, enum: ['xs', 'sm', 'md', 'lg', 'xl'], default: 'md' },
    margin: { type: String, enum: ['xs', 'sm', 'md', 'lg', 'xl'], default: 'md' },
    gap: { type: String, enum: ['xs', 'sm', 'md', 'lg', 'xl'], default: 'md' }
  },
  typography: {
    fontFamily: {
      primary: { type: String, default: 'Inter, system-ui, sans-serif' },
      secondary: { type: String, default: 'Inter, system-ui, sans-serif' },
      mono: { type: String, default: 'JetBrains Mono, Consolas, monospace' }
    },
    fontSize: {
      xs: { type: String, default: '0.75rem' },
      sm: { type: String, default: '0.875rem' },
      base: { type: String, default: '1rem' },
      lg: { type: String, default: '1.125rem' },
      xl: { type: String, default: '1.25rem' },
      '2xl': { type: String, default: '1.5rem' },
      '3xl': { type: String, default: '1.875rem' },
      '4xl': { type: String, default: '2.25rem' },
      '5xl': { type: String, default: '3rem' },
      '6xl': { type: String, default: '3.75rem' }
    },
    fontWeight: {
      light: { type: String, default: '300' },
      normal: { type: String, default: '400' },
      medium: { type: String, default: '500' },
      semibold: { type: String, default: '600' },
      bold: { type: String, default: '700' },
      extrabold: { type: String, default: '800' }
    },
    lineHeight: {
      tight: { type: String, default: '1.25' },
      snug: { type: String, default: '1.375' },
      normal: { type: String, default: '1.5' },
      relaxed: { type: String, default: '1.625' },
      loose: { type: String, default: '2' }
    },
    letterSpacing: {
      tighter: { type: String, default: '-0.05em' },
      tight: { type: String, default: '-0.025em' },
      normal: { type: String, default: '0em' },
      wide: { type: String, default: '0.025em' },
      wider: { type: String, default: '0.05em' },
      widest: { type: String, default: '0.1em' }
    }
  },
  components: {
    button: {
      size: { 
        type: String, 
        enum: ['xs', 'sm', 'md', 'lg', 'xl'], 
        default: 'md' 
      },
      variant: { 
        type: String, 
        enum: ['solid', 'outline', 'ghost', 'link'], 
        default: 'solid' 
      }
    },
    card: {
      padding: { 
        type: String, 
        enum: ['xs', 'sm', 'md', 'lg', 'xl'], 
        default: 'md' 
      },
      shadow: { 
        type: String, 
        enum: ['none', 'sm', 'md', 'lg', 'xl'], 
        default: 'sm' 
      }
    },
    input: {
      size: { 
        type: String, 
        enum: ['xs', 'sm', 'md', 'lg', 'xl'], 
        default: 'md' 
      },
      variant: { 
        type: String, 
        enum: ['outline', 'filled', 'underline'], 
        default: 'outline' 
      }
    }
  },
  shadows: {
    xs: { type: String, default: '0 1px 2px 0 rgb(0 0 0 / 0.05)' },
    sm: { type: String, default: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)' },
    md: { type: String, default: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' },
    lg: { type: String, default: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' },
    xl: { type: String, default: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' },
    '2xl': { type: String, default: '0 25px 50px -12px rgb(0 0 0 / 0.25)' },
    inner: { type: String, default: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)' }
  },
  preview: {
    buttonStyle: { type: String, default: 'bg-slate-800 text-white hover:bg-slate-700' },
    cardStyle: { type: String, default: 'bg-gray-50 border-gray-200' }
  }
}, {
  timestamps: true
})

// Active Theme Schema
const ActiveThemeSchema = new Schema({
  themeId: { type: String, required: true, unique: true },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
})

// Theme Settings Schema
const ThemeSettingsSchema = new Schema({
  themeId: { type: String, required: true },
  mode: { type: String, enum: ['light', 'dark'], required: true },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
})

// Export models
export const CustomTheme = mongoose.models.CustomTheme || mongoose.model<ICustomTheme>('CustomTheme', CustomThemeSchema)
export const ActiveTheme = mongoose.models.ActiveTheme || mongoose.model<IActiveTheme>('ActiveTheme', ActiveThemeSchema)
export const ThemeSettings = mongoose.models.ThemeSettings || mongoose.model<IThemeSettings>('ThemeSettings', ThemeSettingsSchema)
