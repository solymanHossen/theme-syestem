'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { CustomTheme } from '@/lib/themeData'
import { 
  ThemeGallery, 
  ThemeQuickActions, 
  ThemeEditorModal,
  ThemeActionCard
} from '@/components/modern/theme-action-components'
import { AdvancedPaletteSwitcher } from '@/components/ui/advanced-palette-switcher'
import { 
  Palette, 
  Settings, 
  Users, 
  BarChart3, 
  Plus,
  Menu,
  Search,
  Bell,
  Home,
  Layers,
  FileText,
  Database,
  Cpu,
  Zap,
  Shield,
  Globe
} from 'lucide-react'

interface AdminDashboardProps {
  themes: CustomTheme[]
  activeThemeId: string | null
  onThemeEdit: (theme: CustomTheme) => void
  onThemeChange: (theme: CustomTheme) => void
}

export function AdminDashboard({ 
  themes, 
  activeThemeId, 
  onThemeEdit, 
  onThemeChange 
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('themes')
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [editingTheme, setEditingTheme] = useState<CustomTheme | undefined>()
  const [selectedTheme, setSelectedTheme] = useState<CustomTheme | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  const handleCreateTheme = () => {
    setEditingTheme(undefined)
    setIsEditorOpen(true)
  }
  
  const handleEditTheme = (theme: CustomTheme) => {
    setEditingTheme(theme)
    setIsEditorOpen(true)
    onThemeEdit(theme)
  }
  
  const handleImportTheme = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const themes = JSON.parse(e.target?.result as string)
        console.log('Imported themes:', themes)
        // Handle import logic here
      } catch (error) {
        console.error('Failed to import themes:', error)
      }
    }
    reader.readAsText(file)
  }
  
  const handleExportTheme = () => {
    const exportData = {
      themes: themes.filter(t => t.isCustom),
      exportedAt: new Date().toISOString(),
      version: '1.0.0'
    }
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `themes-export-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }
  
  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'themes', label: 'Themes', icon: Palette },
    { id: 'palette', label: 'Palette Editor', icon: Layers },
    { id: 'components', label: 'Components', icon: Cpu },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'themes':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Theme Management</h2>
                <p className="text-muted-foreground">
                  Create, edit, and manage your custom themes
                </p>
              </div>
              <ThemeQuickActions
                onCreateTheme={handleCreateTheme}
                onImportTheme={handleImportTheme}
                onExportTheme={handleExportTheme}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Total Themes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{themes.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {themes.filter(t => t.isCustom).length} custom themes
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Active Theme</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {themes.find(t => t.id === activeThemeId)?.name || 'None'}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Currently applied
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {new Set(themes.map(t => t.category)).size}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Different categories
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium">Active</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    System operational
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <ThemeGallery
              themes={themes}
              activeThemeId={activeThemeId}
              onThemeEdit={handleEditTheme}
            />
          </div>
        )
      
      case 'palette':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Palette Editor</h2>
                <p className="text-muted-foreground">
                  Fine-tune colors for your themes
                </p>
              </div>
              <div className="flex gap-2">
                {themes.slice(0, 3).map((theme) => (
                  <Button
                    key={theme.id}
                    variant={selectedTheme?.id === theme.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedTheme(theme)}
                  >
                    {theme.name}
                  </Button>
                ))}
              </div>
            </div>
            
            {selectedTheme ? (
              <AdvancedPaletteSwitcher
                theme={selectedTheme}
                onThemeChange={(updatedTheme) => {
                  setSelectedTheme(updatedTheme)
                  onThemeChange(updatedTheme)
                }}
              />
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <Palette className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Select a Theme</h3>
                    <p className="text-muted-foreground">
                      Choose a theme from the options above to edit its palette
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )
      
      case 'components':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Component Library</h2>
              <p className="text-muted-foreground">
                Preview and test components with current theme
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Buttons</CardTitle>
                  <CardDescription>Various button styles</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex gap-2">
                    <Button size="sm">Primary</Button>
                    <Button variant="outline" size="sm">Outline</Button>
                    <Button variant="ghost" size="sm">Ghost</Button>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="destructive" size="sm">Danger</Button>
                    <Button variant="secondary" size="sm">Secondary</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Badges</CardTitle>
                  <CardDescription>Status indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Cards</CardTitle>
                  <CardDescription>Content containers</CardDescription>
                </CardHeader>
                <CardContent>
                  <Card className="p-4">
                    <h4 className="font-semibold mb-2">Nested Card</h4>
                    <p className="text-sm text-muted-foreground">
                      This is a card inside another card.
                    </p>
                  </Card>
                </CardContent>
              </Card>
            </div>
          </div>
        )
      
      case 'analytics':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Analytics</h2>
              <p className="text-muted-foreground">
                Theme usage and performance metrics
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Usage Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {themes.slice(0, 5).map((theme) => (
                      <div key={theme.id} className="flex items-center justify-between">
                        <span className="text-sm">{theme.name}</span>
                        <Badge variant="secondary">
                          {Math.floor(Math.random() * 100)}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Load Time</span>
                      <span className="text-sm font-medium">42ms</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Cache Hit</span>
                      <span className="text-sm font-medium">98%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Errors</span>
                      <span className="text-sm font-medium">0</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )
      
      default:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Overview</h2>
              <p className="text-muted-foreground">
                Welcome to your theme management dashboard
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Themes</CardTitle>
                  <Palette className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{themes.length}</div>
                  <p className="text-xs text-muted-foreground">
                    +2 from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,234</div>
                  <p className="text-xs text-muted-foreground">
                    +12% from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Performance</CardTitle>
                  <Zap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">99.9%</div>
                  <p className="text-xs text-muted-foreground">
                    Uptime this month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Security</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Secure</div>
                  <p className="text-xs text-muted-foreground">
                    All systems protected
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )
    }
  }
  
  return (
    <div className="flex h-screen bg-background">
      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0">
          <div className="flex flex-col h-full">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">Theme Admin</h2>
            </div>
            <ScrollArea className="flex-1 px-4">
              <div className="space-y-2 py-4">
                {sidebarItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={activeTab === item.id ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => {
                      setActiveTab(item.id)
                      setSidebarOpen(false)
                    }}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>
      
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 flex-col border-r bg-card">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Theme Admin</h2>
        </div>
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-2 py-4">
            {sidebarItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab(item.id)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="md:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-semibold capitalize">
                {activeTab === 'overview' ? 'Dashboard' : activeTab}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Globe className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6">
          {renderTabContent()}
        </main>
      </div>
      
      {/* Theme Editor Modal */}
      <ThemeEditorModal
        trigger={<></>}
        theme={editingTheme}
        isOpen={isEditorOpen}
        onOpenChange={setIsEditorOpen}
      />
    </div>
  )
}
