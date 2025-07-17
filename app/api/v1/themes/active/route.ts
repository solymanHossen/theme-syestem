import { type NextRequest, NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongoose"
import { ActiveTheme } from "@/lib/models/theme"

export async function GET() {
  try {
    await connectToDatabase()

    let activeTheme = await ActiveTheme.findOne()
    
    // If no active theme exists, create a default one
    if (!activeTheme) {
      activeTheme = await ActiveTheme.create({
        themeId: "minimal-white",
        updatedAt: new Date()
      })
    }

    return NextResponse.json({
      themeId: activeTheme.themeId,
      updatedAt: activeTheme.updatedAt.toISOString(),
    })
  } catch (error) {
    console.error("Error fetching active theme:", error)
    return NextResponse.json({ error: "Failed to fetch active theme" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { themeId } = body

    if (!themeId || typeof themeId !== "string") {
      return NextResponse.json({ error: "Invalid theme ID" }, { status: 400 })
    }

    await connectToDatabase()

    // Update or create the active theme record
    const activeTheme = await ActiveTheme.findOneAndUpdate(
      {}, // Find any document (there should only be one)
      { 
        themeId, 
        updatedAt: new Date() 
      },
      { 
        upsert: true, // Create if doesn't exist
        new: true // Return the updated document
      }
    )

    return NextResponse.json({
      themeId: activeTheme.themeId,
      updatedAt: activeTheme.updatedAt.toISOString(),
      message: "Theme updated successfully",
    })
  } catch (error) {
    console.error("Error updating active theme:", error)
    return NextResponse.json({ error: "Failed to update active theme" }, { status: 500 })
  }
}
