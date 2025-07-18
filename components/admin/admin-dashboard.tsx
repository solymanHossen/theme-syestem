"use client"

import { ShoppingBag, Users, DollarSign, TrendingUp, Eye, Settings, Palette, Moon, Sun } from "lucide-react"
import Link from "next/link"

import { useTheme } from "@/components/theme-provider"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useThemeStore } from "@/lib/stores/themeStore"


export function AdminDashboard() {
  const { currentTheme, mode } = useTheme()
  const { toggleMode } = useThemeStore()

  const stats = [
    {
      title: "Total Sales",
      value: "$12,345",
      change: "+12.5%",
      icon: DollarSign,
      color: currentTheme.palette.success,
    },
    {
      title: "Orders",
      value: "1,234",
      change: "+8.2%",
      icon: ShoppingBag,
      color: currentTheme.palette.primary,
    },
    {
      title: "Customers",
      value: "856",
      change: "+15.3%",
      icon: Users,
      color: currentTheme.palette.accent,
    },
    {
      title: "Growth",
      value: "23.1%",
      change: "+2.4%",
      icon: TrendingUp,
      color: currentTheme.palette.warning,
    },
  ]

  const recentActivity = [
    { action: "New order #1234", time: "2 minutes ago", type: "order" },
    { action: "User John Doe registered", time: "5 minutes ago", type: "user" },
    { action: "Product 'Alpine Tent' updated", time: "10 minutes ago", type: "product" },
    { action: "Theme switched to dark mode", time: "15 minutes ago", type: "system" },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold themed-text" style={{ color: currentTheme.palette.text }}>
            Welcome back, Admin! 👋
          </h1>
          <p className="text-muted-foreground mt-1" style={{ color: currentTheme.palette.muted }}>
            Here&apos;s what&apos;s happening with your store today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            {mode === "light" ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
            {mode === "light" ? "Light Mode" : "Dark Mode"}
          </Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="themed-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium themed-text" style={{ color: currentTheme.palette.muted }}>
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4" style={{ color: stat.color }} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold themed-text" style={{ color: currentTheme.palette.text }}>
                  {stat.value}
                </div>
                <p className="text-xs" style={{ color: currentTheme.palette.success }}>
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card className="themed-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 themed-text" style={{ color: currentTheme.palette.text }}>
              <Settings className="w-5 h-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/admin/themes">
              <Button
                variant="outline"
                className="w-full justify-start gap-3 themed-button bg-transparent"
                style={{
                  borderColor: currentTheme.palette.border,
                  color: currentTheme.palette.text,
                }}
              >
                <Palette className="w-4 h-4" />
                Manage Themes
              </Button>
            </Link>

            <Button
              variant="outline"
              className="w-full justify-start gap-3 themed-button bg-transparent"
              onClick={toggleMode}
              style={{
                borderColor: currentTheme.palette.border,
                color: currentTheme.palette.text,
              }}
            >
              {mode === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              Switch to {mode === "light" ? "Dark" : "Light"} Mode
            </Button>

            <Link href="/">
              <Button
                variant="outline"
                className="w-full justify-start gap-3 themed-button bg-transparent"
                style={{
                  borderColor: currentTheme.palette.border,
                  color: currentTheme.palette.text,
                }}
              >
                <Eye className="w-4 h-4" />
                View Store
              </Button>
            </Link>

            <Button
              className="w-full justify-start gap-3 text-white"
              style={{ backgroundColor: currentTheme.palette.primary }}
            >
              <ShoppingBag className="w-4 h-4" />
              Add New Product
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="themed-card">
          <CardHeader>
            <CardTitle className="themed-text" style={{ color: currentTheme.palette.text }}>
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor:
                        activity.type === "order"
                          ? currentTheme.palette.success
                          : activity.type === "user"
                            ? currentTheme.palette.accent
                            : activity.type === "product"
                              ? currentTheme.palette.warning
                              : currentTheme.palette.primary,
                    }}
                  />
                  <div className="flex-1">
                    <p className="text-sm themed-text" style={{ color: currentTheme.palette.text }}>
                      {activity.action}
                    </p>
                    <p className="text-xs" style={{ color: currentTheme.palette.muted }}>
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Theme Status */}
      <Card className="themed-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 themed-text" style={{ color: currentTheme.palette.text }}>
            <Palette className="w-5 h-5" />
            Current Theme Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-medium mb-2 themed-text" style={{ color: currentTheme.palette.text }}>
                Active Mode
              </h4>
              <div className="flex items-center gap-2">
                {mode === "light" ? (
                  <Sun className="w-4 h-4 text-yellow-500" />
                ) : (
                  <Moon className="w-4 h-4 text-blue-500" />
                )}
                <span className="text-sm" style={{ color: currentTheme.palette.muted }}>
                  {mode === "light" ? "Light Mode" : "Dark Mode"}
                </span>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2 themed-text" style={{ color: currentTheme.palette.text }}>
                Primary Color
              </h4>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded border" style={{ backgroundColor: currentTheme.palette.primary }} />
                <span className="text-sm font-mono" style={{ color: currentTheme.palette.muted }}>
                  {currentTheme.palette.primary}
                </span>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2 themed-text" style={{ color: currentTheme.palette.text }}>
                Background
              </h4>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded border" style={{ backgroundColor: currentTheme.palette.background }} />
                <span className="text-sm font-mono" style={{ color: currentTheme.palette.muted }}>
                  {currentTheme.palette.background}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
