"use client"

import { Home, Settings, Palette, Users, ShoppingBag, BarChart3, Menu, X, LogOut, Bell } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type React from "react"
import { useState } from "react"

import { useTheme } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"


interface AdminLayoutProps {
  children: React.ReactNode
  currentPage?: string
}

const sidebarItems = [
  { icon: Home, label: "Dashboard", href: "/admin", id: "dashboard" },
  { icon: Palette, label: "Themes", href: "/admin/themes", id: "themes" },
  { icon: ShoppingBag, label: "Products", href: "/admin/products", id: "products" },
  { icon: Users, label: "Users", href: "/admin/users", id: "users" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics", id: "analytics" },
  { icon: Settings, label: "Settings", href: "/admin/settings", id: "settings" },
]

export function AdminLayout({ children, currentPage = "dashboard" }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { currentTheme, mode } = useTheme()
  const router = useRouter()

  return (
    <div className="min-h-screen flex themed-background" style={{ backgroundColor: currentTheme.palette.background }}>
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className="flex flex-col h-full themed-card border-r"
          style={{
            backgroundColor: currentTheme.palette.card,
            borderColor: currentTheme.palette.border,
          }}
        >
          {/* Sidebar Header */}
          <div
            className="flex items-center justify-between p-4 border-b"
            style={{ borderColor: currentTheme.palette.border }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: currentTheme.palette.primary }}
              >
                T
              </div>
              <div>
                <h2 className="font-semibold themed-text" style={{ color: currentTheme.palette.text }}>
                  TentShop
                </h2>
                <p className="text-xs" style={{ color: currentTheme.palette.muted }}>
                  Admin Panel
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              const isActive = currentPage === item.id
              return (
                <Link key={item.id} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`w-full justify-start gap-3 ${isActive ? "text-white" : "hover:bg-opacity-50"}`}
                    style={
                      isActive
                        ? { backgroundColor: currentTheme.palette.primary }
                        : {
                            color: currentTheme.palette.text,
                            backgroundColor: "transparent",
                          }
                    }
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              )
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t space-y-3" style={{ borderColor: currentTheme.palette.border }}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium themed-text">Theme Mode</span>
              <ThemeToggle />
            </div>
            <Badge variant="outline" className="w-full justify-center">
              {mode === "light" ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </Badge>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <header
          className="h-16 border-b flex items-center justify-between px-4 lg:px-6 themed-card"
          style={{
            backgroundColor: currentTheme.palette.card,
            borderColor: currentTheme.palette.border,
          }}
        >
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold themed-text" style={{ color: currentTheme.palette.text }}>
                {sidebarItems.find((item) => item.id === currentPage)?.label ?? "Dashboard"}
              </h1>
              <p className="text-sm" style={{ color: currentTheme.palette.muted }}>
                Manage your eCommerce store
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <Link href="/">
              <Button variant="outline" size="sm">
                <Home className="h-4 w-4 mr-2" />
                View Store
              </Button>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
