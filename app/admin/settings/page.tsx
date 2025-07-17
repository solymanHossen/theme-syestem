"use client"

import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"
import { useTheme } from "@/components/theme-provider"

export default function AdminSettingsPage() {
  const { mode } = useTheme()

  return (
    <AdminLayout currentPage="settings">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your store settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Store Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="store-name">Store Name</Label>
                <Input id="store-name" defaultValue="TentShop" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="store-description">Description</Label>
                <Input id="store-description" defaultValue="Premium outdoor gear and camping equipment" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="store-email">Contact Email</Label>
                <Input id="store-email" type="email" defaultValue="contact@tentshop.com" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Theme Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Currently using {mode === "light" ? "Light" : "Dark"} mode
                  </p>
                </div>
                <ThemeToggle />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Store Logo</Label>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                    T
                  </div>
                  <Button variant="outline">Upload New Logo</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
