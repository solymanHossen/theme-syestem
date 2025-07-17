import connectToDatabase from "@/lib/mongoose"
import { CustomTheme } from "@/lib/models/theme"
import { themes } from "@/lib/themeData"

async function seedDatabase() {
  try {
    await connectToDatabase()
    console.log("Connected to database")

    // Clear existing predefined themes (not custom ones)
    await CustomTheme.deleteMany({ isCustom: { $ne: true } })
    console.log("Cleared existing predefined themes")

    // Insert predefined themes from themeData.ts
    const predefinedThemes = themes.map(theme => ({
      ...theme,
      isCustom: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }))

    if (predefinedThemes.length > 0) {
      await CustomTheme.insertMany(predefinedThemes)
      console.log(`Inserted ${predefinedThemes.length} predefined themes`)
    }

    console.log("Database seeding completed successfully")
  } catch (error) {
    console.error("Error seeding database:", error)
  }
}

// Run the seeder
seedDatabase()
