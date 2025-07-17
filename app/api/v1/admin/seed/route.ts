import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongoose"
import { CustomTheme, ActiveTheme, ThemeSettings } from "@/lib/models/theme"
import { themes } from "@/lib/themeData"

export async function POST() {
  try {
    await connectToDatabase()

    // Clear existing predefined themes (not custom ones)
    await CustomTheme.deleteMany({ isCustom: { $ne: true } })

    // Insert predefined themes from themeData.ts
    const predefinedThemes = themes.map(theme => ({
      ...theme,
      isCustom: false,
    }))

    let insertedCount = 0
    if (predefinedThemes.length > 0) {
      // Use insertMany with ordered: false to handle any duplicate IDs gracefully
      try {
        const result = await CustomTheme.insertMany(predefinedThemes, { ordered: false })
        insertedCount = result.length
      } catch (error: any) {
        // Handle duplicate key errors gracefully
        if (error.code === 11000) {
          console.warn("Some themes already exist, skipping duplicates")
          // Count how many were actually inserted
          const existingThemes = await CustomTheme.find({ isCustom: { $ne: true } })
          insertedCount = existingThemes.length
        } else {
          throw error
        }
      }
    }

    // Create default active theme if it doesn't exist
    const activeTheme = await ActiveTheme.findOne()
    if (!activeTheme) {
      await ActiveTheme.create({
        themeId: "minimal-white",
        updatedAt: new Date()
      })
    }

    // Create default settings if they don't exist
    const settings = await ThemeSettings.findOne()
    if (!settings) {
      await ThemeSettings.create({
        themeId: "minimal-white",
        mode: "light",
        updatedAt: new Date()
      })
    }

    return NextResponse.json({
      message: "Database seeded successfully",
      insertedThemes: insertedCount,
      totalPredefinedThemes: themes.length,
    })
  } catch (error) {
    console.error("Error seeding database:", error)
    return NextResponse.json({ error: "Failed to seed database" }, { status: 500 })
  }
}
