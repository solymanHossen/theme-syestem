"use client"

import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export function ThemeToggle() {
  const { mode, toggleMode } = useTheme()

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleMode}
      className="themed-button bg-transparent"
      title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
    >
      {mode === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
