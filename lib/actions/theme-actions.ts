'use server'

import { revalidatePath } from 'next/cache'
import connectToDatabase from '@/lib/mongoose'
import { CustomTheme, ActiveTheme, ThemeSettings } from '@/lib/models/theme'
import { redirect } from 'next/navigation'
import { z } from 'zod'

// Schema validation for theme actions
const ThemeSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  category: z.enum(['outdoor', 'modern', 'classic', 'vibrant', 'nature', 'minimal']),
  isCustom: z.boolean().default(true),
  lightMode: z.object({
    id: z.literal('light'),
    name: z.string(),
    description: z.string(),
    palette: z.object({
      primary: z.string(),
      secondary: z.string(),
      background: z.string(),
      card: z.string(),
      border: z.string(),
      text: z.string(),
      muted: z.string(),
      accent: z.string(),
      success: z.string(),
      warning: z.string(),
      error: z.string(),
    }),
  }),
  darkMode: z.object({
    id: z.literal('dark'),
    name: z.string(),
    description: z.string(),
    palette: z.object({
      primary: z.string(),
      secondary: z.string(),
      background: z.string(),
      card: z.string(),
      border: z.string(),
      text: z.string(),
      muted: z.string(),
      accent: z.string(),
      success: z.string(),
      warning: z.string(),
      error: z.string(),
    }),
  }),
})

const ThemeSettingsSchema = z.object({
  themeId: z.string().min(1),
  mode: z.enum(['light', 'dark']),
})

// Server action for saving custom themes
export async function saveCustomThemeAction(
  prevState: { success: boolean; message: string } | null,
  formData: FormData
) {
  try {
    const rawData = Object.fromEntries(formData.entries())
    const themeData = JSON.parse(rawData.themeData as string)
    
    const validatedTheme = ThemeSchema.parse(themeData)
    
    await connectToDatabase()
    
    // Check if theme exists
    const existingTheme = await CustomTheme.findOne({ id: validatedTheme.id })
    
    if (existingTheme && existingTheme.isCustom) {
      // Update existing custom theme
      await CustomTheme.findOneAndUpdate(
        { id: validatedTheme.id },
        validatedTheme,
        { new: true }
      )
    } else if (!existingTheme) {
      // Create new custom theme
      await CustomTheme.create(validatedTheme)
    } else {
      throw new Error('Cannot modify predefined theme')
    }
    
    revalidatePath('/admin/themes')
    revalidatePath('/')
    
    return { success: true, message: 'Theme saved successfully' }
  } catch (error) {
    console.error('Theme save error:', error)
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Failed to save theme' 
    }
  }
}

// Server action for setting active theme
export async function setActiveThemeAction(
  prevState: { success: boolean; message: string } | null,
  formData: FormData
) {
  try {
    const themeId = formData.get('themeId') as string
    const mode = formData.get('mode') as string
    
    const validatedSettings = ThemeSettingsSchema.parse({ themeId, mode })
    
    await connectToDatabase()
    
    // Update active theme
    await ActiveTheme.findOneAndUpdate(
      {},
      { themeId: validatedSettings.themeId, updatedAt: new Date() },
      { upsert: true, new: true }
    )
    
    // Update theme settings
    await ThemeSettings.findOneAndUpdate(
      {},
      { 
        themeId: validatedSettings.themeId, 
        mode: validatedSettings.mode,
        updatedAt: new Date() 
      },
      { upsert: true, new: true }
    )
    
    revalidatePath('/')
    revalidatePath('/admin')
    
    return { success: true, message: 'Theme activated successfully' }
  } catch (error) {
    console.error('Theme activation error:', error)
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Failed to activate theme' 
    }
  }
}

// Server action for deleting custom theme
export async function deleteCustomThemeAction(
  prevState: { success: boolean; message: string } | null,
  formData: FormData
) {
  try {
    const themeId = formData.get('themeId') as string
    
    if (!themeId) {
      throw new Error('Theme ID is required')
    }
    
    await connectToDatabase()
    
    const deletedTheme = await CustomTheme.findOneAndDelete({ 
      id: themeId, 
      isCustom: true 
    })
    
    if (!deletedTheme) {
      throw new Error('Custom theme not found or cannot delete predefined theme')
    }
    
    // If deleted theme was active, switch to default
    const activeTheme = await ActiveTheme.findOne()
    if (activeTheme?.themeId === themeId) {
      await ActiveTheme.findOneAndUpdate(
        {},
        { themeId: 'minimal-white', updatedAt: new Date() },
        { upsert: true }
      )
      
      await ThemeSettings.findOneAndUpdate(
        {},
        { themeId: 'minimal-white', mode: 'light', updatedAt: new Date() },
        { upsert: true }
      )
    }
    
    revalidatePath('/admin/themes')
    revalidatePath('/')
    
    return { success: true, message: 'Theme deleted successfully' }
  } catch (error) {
    console.error('Theme deletion error:', error)
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Failed to delete theme' 
    }
  }
}

// Server action for database seeding
export async function seedDatabaseAction() {
  try {
    await connectToDatabase()
    
    // Your existing seed logic here
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/v1/admin/seed`, {
      method: 'POST',
    })
    
    if (!response.ok) {
      throw new Error('Database seeding failed')
    }
    
    revalidatePath('/admin')
    
    return { success: true, message: 'Database seeded successfully' }
  } catch (error) {
    console.error('Database seeding error:', error)
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Failed to seed database' 
    }
  }
}

// Server action for cleaning up duplicate themes
export async function cleanupThemesAction() {
  try {
    await connectToDatabase()
    
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/v1/themes/cleanup`, {
      method: 'POST',
    })
    
    if (!response.ok) {
      throw new Error('Theme cleanup failed')
    }
    
    const result = await response.json()
    
    revalidatePath('/admin/themes')
    revalidatePath('/')
    
    return { 
      success: true, 
      message: `Cleanup completed. Removed ${result.totalDuplicatesRemoved} duplicate themes.`,
      details: result
    }
  } catch (error) {
    console.error('Theme cleanup error:', error)
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Failed to cleanup themes' 
    }
  }
}
