import { NextRequest, NextResponse } from "next/server"

import { CustomTheme } from "@/lib/models/theme"
import connectToDatabase from "@/lib/mongoose"
import { themes } from "@/lib/themeData"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json({ error: "Theme ID is required" }, { status: 400 })
    }

    // First, check predefined themes
    const predefinedTheme = themes.find(theme => theme.id === id)
    if (predefinedTheme) {
      return NextResponse.json({ theme: predefinedTheme })
    }

    // If not found in predefined themes, check custom themes in database
    await connectToDatabase()
    const customTheme = await CustomTheme.findOne({ id }).lean()

    if (!customTheme) {
      return NextResponse.json({ error: "Theme not found" }, { status: 404 })
    }

    return NextResponse.json({ theme: customTheme })
  } catch (error) {
    console.error("Error fetching theme:", error)
    return NextResponse.json({ error: "Failed to fetch theme" }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const themeData = await request.json()

    if (!id) {
      return NextResponse.json({ error: "Theme ID is required" }, { status: 400 })
    }

    await connectToDatabase()

    // Only allow updating custom themes
    const updatedTheme = await CustomTheme.findOneAndUpdate(
      { id, isCustom: true },
      { ...themeData, id }, // Ensure ID doesn't change
      { new: true }
    )

    if (!updatedTheme) {
      return NextResponse.json({ 
        error: "Custom theme not found or cannot update predefined theme" 
      }, { status: 404 })
    }

    return NextResponse.json({
      theme: updatedTheme,
      message: "Theme updated successfully",
    })
  } catch (error) {
    console.error("Error updating theme:", error)
    return NextResponse.json({ error: "Failed to update theme" }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json({ error: "Theme ID is required" }, { status: 400 })
    }

    await connectToDatabase()

    // Only allow deleting custom themes
    const deletedTheme = await CustomTheme.findOneAndDelete({ 
      id, 
      isCustom: true 
    })

    if (!deletedTheme) {
      return NextResponse.json({ 
        error: "Custom theme not found or cannot delete predefined theme" 
      }, { status: 404 })
    }

    return NextResponse.json({
      message: "Theme deleted successfully",
      deletedTheme: { id: deletedTheme.id, name: deletedTheme.name }
    })
  } catch (error) {
    console.error("Error deleting theme:", error)
    return NextResponse.json({ error: "Failed to delete theme" }, { status: 500 })
  }
}
