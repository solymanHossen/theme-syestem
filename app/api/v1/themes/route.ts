import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongoose"
import { CustomTheme } from "@/lib/models/theme"
import { themes } from "@/lib/themeData"

export async function GET() {
  try {
    await connectToDatabase()
    
    // Get custom themes from database
    const customThemes = await CustomTheme.find({ isCustom: true })
      .sort({ createdAt: -1 })
      .lean()

    // Combine predefined themes with custom themes
    const allThemes = [
      ...themes, // Predefined themes from themeData.ts
      ...customThemes // Custom themes from database
    ]

    return NextResponse.json({
      themes: allThemes,
      count: allThemes.length,
      predefinedCount: themes.length,
      customCount: customThemes.length,
    })
  } catch (error) {
    console.error("Error fetching all themes:", error)
    return NextResponse.json({ error: "Failed to fetch themes" }, { status: 500 })
  }
}
