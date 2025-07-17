import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongoose"
import { CustomTheme } from "@/lib/models/theme"

export async function POST() {
  try {
    await connectToDatabase()

    // Find all themes and group by ID
    const allThemes = await CustomTheme.find({}).sort({ createdAt: 1 })
    const duplicateGroups = new Map<string, any[]>()

    // Group themes by ID to find duplicates
    allThemes.forEach(theme => {
      const id = theme.id
      if (!duplicateGroups.has(id)) {
        duplicateGroups.set(id, [])
      }
      duplicateGroups.get(id)!.push(theme)
    })

    let removedCount = 0
    const cleanupResults = []

    // Process each group of themes with the same ID
    for (const [themeId, themes] of duplicateGroups) {
      if (themes.length > 1) {
        // Keep the most recent custom theme, or the first predefined theme
        const customThemes = themes.filter(t => t.isCustom === true)
        const predefinedThemes = themes.filter(t => t.isCustom !== true)

        let themeToKeep
        let themesToRemove = []

        if (customThemes.length > 0) {
          // Keep the most recent custom theme
          themeToKeep = customThemes.sort((a, b) => 
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          )[0]
          themesToRemove = [
            ...customThemes.slice(1),
            ...predefinedThemes
          ]
        } else {
          // Keep the first predefined theme
          themeToKeep = predefinedThemes[0]
          themesToRemove = predefinedThemes.slice(1)
        }

        // Remove duplicate themes
        for (const theme of themesToRemove) {
          await CustomTheme.findByIdAndDelete(theme._id)
          removedCount++
        }

        cleanupResults.push({
          themeId,
          duplicatesFound: themes.length,
          duplicatesRemoved: themesToRemove.length,
          keptTheme: {
            id: themeToKeep.id,
            name: themeToKeep.name,
            isCustom: themeToKeep.isCustom,
            createdAt: themeToKeep.createdAt
          }
        })
      }
    }

    return NextResponse.json({
      message: "Theme cleanup completed",
      totalDuplicatesRemoved: removedCount,
      processedThemes: cleanupResults.length,
      details: cleanupResults
    })

  } catch (error) {
    console.error("Error cleaning up themes:", error)
    return NextResponse.json({ error: "Failed to cleanup themes" }, { status: 500 })
  }
}
