import { type NextRequest, NextResponse } from "next/server"

import { ThemeSettings } from "@/lib/models/theme"
import connectToDatabase from "@/lib/mongoose"

export async function GET() {
  try {
    await connectToDatabase()

    let settings = await ThemeSettings.findOne()
    
    // If no settings exist, create default ones
    settings ??= await ThemeSettings.create({
      themeId: "minimal-white",
      mode: "light",
      updatedAt: new Date()
    })

    return NextResponse.json({
      mode: settings.mode,
      updatedAt: settings.updatedAt.toISOString(),
    })
  } catch (error) {
    console.error("Error fetching theme mode:", error)
    return NextResponse.json({ error: "Failed to fetch theme mode" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { mode } = body

    if (!mode || (mode !== "light" && mode !== "dark")) {
      return NextResponse.json({ error: "Invalid theme mode" }, { status: 400 })
    }

    await connectToDatabase()

    // Update or create the settings record
    const settings = await ThemeSettings.findOneAndUpdate(
      {}, // Find any document (there should only be one)
      { 
        mode, 
        updatedAt: new Date() 
      },
      { 
        upsert: true, // Create if doesn't exist
        new: true // Return the updated document
      }
    )

    return NextResponse.json({
      mode: settings.mode,
      updatedAt: settings.updatedAt.toISOString(),
      message: "Theme mode updated successfully",
    })
  } catch (error) {
    console.error("Error updating theme mode:", error)
    return NextResponse.json({ error: "Failed to update theme mode" }, { status: 500 })
  }
}
