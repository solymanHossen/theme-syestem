import { type NextRequest, NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongoose"
import { ThemeSettings } from "@/lib/models/theme"

export async function GET() {
  try {
    await connectToDatabase()

    let settings = await ThemeSettings.findOne()
    
    // If no settings exist, create default ones
    if (!settings) {
      settings = await ThemeSettings.create({
        themeId: "minimal-white",
        mode: "light",
        updatedAt: new Date()
      })
    }

    return NextResponse.json({
      themeId: settings.themeId,
      mode: settings.mode,
      updatedAt: settings.updatedAt.toISOString(),
    })
  } catch (error) {
    console.error("Error fetching theme settings:", error)
    return NextResponse.json({ error: "Failed to fetch theme settings" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { themeId, mode } = body

    if (!themeId || !mode || (mode !== "light" && mode !== "dark")) {
      return NextResponse.json({ error: "Invalid theme settings" }, { status: 400 })
    }

    await connectToDatabase()

    // Update or create the settings record
    const settings = await ThemeSettings.findOneAndUpdate(
      {}, // Find any document (there should only be one)
      { 
        themeId, 
        mode, 
        updatedAt: new Date() 
      },
      { 
        upsert: true, // Create if doesn't exist
        new: true // Return the updated document
      }
    )

    return NextResponse.json({
      themeId: settings.themeId,
      mode: settings.mode,
      updatedAt: settings.updatedAt.toISOString(),
      message: "Theme settings updated successfully",
    })
  } catch (error) {
    console.error("Error updating theme settings:", error)
    return NextResponse.json({ error: "Failed to update theme settings" }, { status: 500 })
  }
}
