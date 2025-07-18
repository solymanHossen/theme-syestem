import { type NextRequest, NextResponse } from "next/server"

import { CustomTheme } from "@/lib/models/theme"
import connectToDatabase from "@/lib/mongoose"

export async function GET() {
  try {
    await connectToDatabase()
    
    const themes = await CustomTheme.find({ isCustom: true })
      .sort({ createdAt: -1 })
      .lean()

    return NextResponse.json({
      themes,
      count: themes.length,
    })
  } catch (error) {
    console.error("Error fetching custom themes:", error)
    return NextResponse.json({ error: "Failed to fetch custom themes" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const themeData = await request.json()

    // Validate theme structure
    if (!themeData.id || !themeData.name || !themeData.lightMode || !themeData.darkMode) {
      return NextResponse.json({ error: "Invalid theme structure" }, { status: 400 })
    }

    await connectToDatabase()

    // Check if theme with the same ID already exists
    const existingTheme = await CustomTheme.findOne({ id: themeData.id })
    if (existingTheme) {
      return NextResponse.json({ error: "Theme with this ID already exists" }, { status: 409 })
    }

    // Create custom theme
    const customTheme = await CustomTheme.create({
      ...themeData,
      isCustom: true,
    })

    return NextResponse.json({
      theme: customTheme,
      message: "Custom theme created successfully",
    })
  } catch (error) {
    console.error("Error creating custom theme:", error)
    return NextResponse.json({ error: "Failed to create custom theme" }, { status: 500 })
  }
}
