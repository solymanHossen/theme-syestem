import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongoose"
import { CustomTheme, ActiveTheme, ThemeSettings } from "@/lib/models/theme"

export async function GET() {
  try {
    await connectToDatabase()

    const [
      totalThemes,
      customThemes,
      predefinedThemes,
      activeTheme,
      settings
    ] = await Promise.all([
      CustomTheme.countDocuments({}),
      CustomTheme.countDocuments({ isCustom: true }),
      CustomTheme.countDocuments({ isCustom: { $ne: true } }),
      ActiveTheme.findOne(),
      ThemeSettings.findOne()
    ])

    return NextResponse.json({
      database: {
        connected: true,
        status: "healthy"
      },
      themes: {
        total: totalThemes,
        custom: customThemes,
        predefined: predefinedThemes
      },
      activeTheme: activeTheme ? {
        themeId: activeTheme.themeId,
        updatedAt: activeTheme.updatedAt
      } : null,
      settings: settings ? {
        themeId: settings.themeId,
        mode: settings.mode,
        updatedAt: settings.updatedAt
      } : null
    })
  } catch (error) {
    console.error("Error checking database status:", error)
    return NextResponse.json({
      database: {
        connected: false,
        status: "error",
        error: error instanceof Error ? error.message : "Unknown error"
      }
    }, { status: 500 })
  }
}
