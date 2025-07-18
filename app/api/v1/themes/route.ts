import { NextResponse } from "next/server"

import { CustomTheme } from "@/lib/models/theme"
import connectToDatabase from "@/lib/mongoose"
import { themes } from "@/lib/themeData"

export async function GET() {
  try {
    await connectToDatabase()
    
    // Get all themes from database (both predefined and custom)
    const dbThemes = await CustomTheme.find({})
      .sort({ createdAt: -1 })
      .lean()

    // If no themes in database, use predefined themes from themeData.ts
    if (dbThemes.length === 0) {
      return NextResponse.json({
        themes,
        count: themes.length,
        predefinedCount: themes.length,
        customCount: 0,
      })
    }

    // Group themes by source
    const predefinedThemes = dbThemes.filter(theme => !theme.isCustom)
    const customThemes = dbThemes.filter(theme => theme.isCustom)

    // If no predefined themes in database, fallback to themeData.ts
    // This prevents duplicates if seeding hasn't run
    const allThemes = predefinedThemes.length > 0 
      ? [...predefinedThemes, ...customThemes]
      : [...themes, ...customThemes]

    return NextResponse.json({
      themes: allThemes,
      count: allThemes.length,
      predefinedCount: predefinedThemes.length > 0 ? predefinedThemes.length : themes.length,
      customCount: customThemes.length,
    })
  } catch (error) {
    console.error("Error fetching all themes:", error)
    
    // Fallback to predefined themes on error
    return NextResponse.json({
      themes,
      count: themes.length,
      predefinedCount: themes.length,
      customCount: 0,
    })
  }
}
