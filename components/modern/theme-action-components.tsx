'use client'

import { useActionState, useOptimistic, startTransition, useEffect } from 'react'
import { useFormStatus } from 'react-dom'
import { saveCustomThemeAction, setActiveThemeAction, deleteCustomThemeAction } from '@/lib/actions/theme-actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { CustomTheme } from '@/lib/themeData'
import { toast } from 'sonner'
import { useState } from 'react'
import { 
  Palette, 
  CheckCircle, 
  Edit, 
  Trash2, 
  XCircle, 
  Download, 
  Upload, 
  Plus,
  Copy,
  Eye,
  Settings,
  Loader2,
  AlertCircle,
  Check
} from 'lucide-react'

// Types
type OptimisticThemeAction = {
  type: 'SET_ACTIVE' | 'DELETE_THEME' | 'SAVE_THEME'
  themeId: string
  mode?: 'light' | 'dark'
}

type ActionResult = {
  success: boolean
  message: string
  error?: string
}

type ThemeCategory = 'outdoor' | 'modern' | 'classic' | 'vibrant' | 'nature' | 'minimal'

type ThemePalette = {
  primary: string
  secondary: string
  background: string
  card: string
  border: string
  text: string
  muted: string
  accent: string
  success: string
  warning: string
  error: string
}

type OptimisticTheme = CustomTheme & {
  isDeleting?: boolean
}

// Helper Components
function StatusIndicator({ status, message }: { status: 'loading' | 'error' | 'success'; message: string }) {
  const Icon = status === 'loading' ? Loader2 : status === 'error' ? AlertCircle : Check
  const className = status === 'loading' ? 'animate-spin' : ''
  
  return (
    <div className={`flex items-center gap-2 ${status === 'error' ? 'text-destructive' : status === 'success' ? 'text-green-600' : ''}`}>
      <Icon className={`w-4 h-4 ${className}`} />
      <span className="text-sm">{message}</span>
    </div>
  )
}

function LoadingState({ isLoading, children }: { isLoading: boolean; children: React.ReactNode }) {
  return (
    <div className={`relative ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}>
      {children}
    </div>
  )
}

function ResponsiveModal({ 
  trigger, 
  title, 
  description, 
  open, 
  onOpenChange, 
  children 
}: {
  trigger: React.ReactNode
  title: string
  description: string
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}

function FormField({ 
  label, 
  required, 
  children 
}: { 
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      {children}
    </div>
  )
}

function ColorPicker({ 
  label, 
  value, 
  onChange 
}: { 
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="flex gap-2">
        <input 
          type="color" 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          className="w-12 h-10 border rounded cursor-pointer"
        />
        <Input 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          className="flex-1"
        />
      </div>
    </div>
  )
}

// Custom hooks
function useThemeTransition() {
  const [isPending, setIsPending] = useState(false)
  
  const switchTheme = async (theme: CustomTheme) => {
    setIsPending(true)
    try {
      const formData = new FormData()
      formData.append('themeId', theme.id)
      formData.append('mode', 'light')
      
      const result = await setActiveThemeAction(null, formData)
      if (!result.success) {
        throw new Error(result.message)
      }
    } finally {
      setIsPending(false)
    }
  }
  
  return { switchTheme, isPending }
}

function useThemeActions() {
  const deleteCustomTheme = async (themeId: string) => {
    const formData = new FormData()
    formData.append('themeId', themeId)
    
    const result = await deleteCustomThemeAction(null, formData)
    if (!result.success) {
      throw new Error(result.message)
    }
  }
  
  return { deleteCustomTheme }
}

// Modern form submit button with React 19 useFormStatus
function SubmitButton({ 
  children, 
  variant = 'default',
  size = 'default' 
}: { 
  children: React.ReactNode
  variant?: 'default' | 'destructive' | 'outline'
  size?: 'default' | 'sm' | 'lg'
}) {
  const { pending } = useFormStatus()
  
  return (
    <Button type="submit" disabled={pending} variant={variant} size={size}>
      {pending ? (
        <StatusIndicator status="loading" message="Processing..." />
      ) : (
        children
      )}
    </Button>
  )
}

// Theme Card Component
function ThemeCard({ 
  theme, 
  isActive, 
  onActivate, 
  onEdit, 
  onDelete, 
  onDuplicate 
}: {
  theme: CustomTheme
  isActive: boolean
  onActivate: () => void
  onEdit: () => void
  onDelete: () => void
  onDuplicate: () => void
}) {
  return (
    <Card className={`transition-all duration-200 ${isActive ? 'ring-2 ring-primary' : ''}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              {theme.name}
              {isActive && (
                <Badge variant="default" className="ml-2">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Active
                </Badge>
              )}
            </CardTitle>
            <CardDescription>{theme.description}</CardDescription>
          </div>
          <Badge variant="outline" className="capitalize">
            {theme.category}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {/* Theme Preview */}
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 rounded-md border" style={{ 
              backgroundColor: theme.lightMode.palette.background,
              borderColor: theme.lightMode.palette.border 
            }}>
              <div className="text-xs font-medium mb-1" style={{ color: theme.lightMode.palette.text }}>
                Light Mode
              </div>
              <div className="flex gap-1">
                {Object.entries(theme.lightMode.palette).slice(0, 5).map(([key, value]) => (
                  <div 
                    key={key} 
                    className="w-3 h-3 rounded-sm border border-white/20"
                    style={{ backgroundColor: value }}
                  />
                ))}
              </div>
            </div>
            
            <div className="p-3 rounded-md border" style={{ 
              backgroundColor: theme.darkMode.palette.background,
              borderColor: theme.darkMode.palette.border 
            }}>
              <div className="text-xs font-medium mb-1" style={{ color: theme.darkMode.palette.text }}>
                Dark Mode
              </div>
              <div className="flex gap-1">
                {Object.entries(theme.darkMode.palette).slice(0, 5).map(([key, value]) => (
                  <div 
                    key={key} 
                    className="w-3 h-3 rounded-sm border border-white/20"
                    style={{ backgroundColor: value }}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            {!isActive && (
              <Button onClick={onActivate} size="sm">
                <CheckCircle className="w-4 h-4 mr-2" />
                Activate
              </Button>
            )}
            
            <Button
              variant="outline"
              size="sm"
              onClick={onEdit}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={onDuplicate}
            >
              <Copy className="w-4 h-4 mr-2" />
              Duplicate
            </Button>
            
            {theme.isCustom && (
              <Button
                variant="destructive"
                size="sm"
                onClick={onDelete}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Enhanced Theme Action Card
export function ThemeActionCard({ 
  theme, 
  isActive, 
  onEdit 
}: { 
  theme: CustomTheme
  isActive: boolean
  onEdit: (theme: CustomTheme) => void
}) {
  const { switchTheme, isPending } = useThemeTransition()
  const { deleteCustomTheme } = useThemeActions()
  
  const handleActivate = async () => {
    try {
      await switchTheme(theme)
      toast.success('Theme activated successfully')
    } catch (error) {
      toast.error('Failed to activate theme')
    }
  }
  
  const handleDelete = async () => {
    try {
      await deleteCustomTheme(theme.id)
      toast.success('Theme deleted successfully')
    } catch (error) {
      toast.error('Failed to delete theme')
    }
  }
  
  const handleDuplicate = () => {
    const duplicatedTheme = {
      ...theme,
      id: `${theme.id}-copy-${Date.now()}`,
      name: `${theme.name} Copy`,
    }
    onEdit(duplicatedTheme)
  }
  
  return (
    <LoadingState isLoading={isPending}>
      <ThemeCard
        theme={theme}
        isActive={isActive}
        onActivate={handleActivate}
        onEdit={() => onEdit(theme)}
        onDelete={handleDelete}
        onDuplicate={handleDuplicate}
      />
    </LoadingState>
  )
}

// Theme Creation/Edit Modal
export function ThemeEditorModal({ 
  trigger, 
  theme, 
  isOpen, 
  onOpenChange 
}: { 
  trigger: React.ReactNode
  theme?: CustomTheme
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}) {
  const defaultPalette: ThemePalette = {
    primary: '#000000',
    secondary: '#6b7280',
    background: '#ffffff',
    card: '#f9fafb',
    text: '#111827',
    border: '#e5e7eb',
    muted: '#f3f4f6',
    accent: '#f59e0b',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  }

  const [formData, setFormData] = useState({
    name: theme?.name || '',
    description: theme?.description || '',
    category: (theme?.category || 'minimal') as ThemeCategory,
    palette: theme?.lightMode.palette || defaultPalette,
  })
  
  const [saveState, saveAction] = useActionState(saveCustomThemeAction, null)
  
  // Effect to handle save state changes
  useEffect(() => {
    if (saveState?.success) {
      toast.success('Theme saved successfully')
      onOpenChange(false)
    } else if (saveState && !saveState.success) {
      toast.error(saveState.message || 'Failed to save theme')
    }
  }, [saveState, onOpenChange])
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const themeData: CustomTheme = {
      id: theme?.id || `custom-${Date.now()}`,
      name: formData.name,
      description: formData.description,
      category: formData.category,
      isCustom: true,
      lightMode: {
        id: 'light',
        name: 'Light Mode',
        description: 'Light theme variant',
        palette: formData.palette,
      },
      darkMode: {
        id: 'dark',
        name: 'Dark Mode',
        description: 'Dark theme variant',
        palette: {
          ...formData.palette,
          background: '#0f172a',
          card: '#1e293b',
          text: '#f1f5f9',
        },
      },
      radius: {
        button: 'md',
        card: 'md',
        input: 'md',
        image: 'md',
        badge: 'md'
      },
      spacing: {
        scale: 'normal',
        padding: 'md',
        margin: 'md',
        gap: 'md'
      },
      typography: {
        fontFamily: {
          primary: 'Inter',
          secondary: 'Inter',
          mono: 'Monaco'
        },
        fontSize: {
          xs: '12px',
          sm: '14px',
          base: '16px',
          lg: '18px',
          xl: '20px',
          '2xl': '24px',
          '3xl': '30px',
          '4xl': '36px',
          '5xl': '48px',
          '6xl': '60px'
        },
        fontWeight: {
          light: '300',
          normal: '400',
          medium: '500',
          semibold: '600',
          bold: '700',
          extrabold: '800'
        },
        lineHeight: {
          tight: '1.25',
          snug: '1.375',
          normal: '1.5',
          relaxed: '1.625',
          loose: '2'
        },
        letterSpacing: {
          tighter: '-0.05em',
          tight: '-0.025em',
          normal: '0',
          wide: '0.025em',
          wider: '0.05em',
          widest: '0.1em'
        }
      },
      components: {
        button: {
          size: 'md',
          variant: 'solid'
        },
        card: {
          padding: 'md',
          shadow: 'md'
        },
        input: {
          size: 'md',
          variant: 'outline'
        }
      },
      shadows: {
        xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)'
      },
      preview: {
        buttonStyle: 'modern',
        cardStyle: 'elevated'
      }
    }
    
    const formDataObj = new FormData()
    formDataObj.append('themeData', JSON.stringify(themeData))
    
    startTransition(async () => {
      await saveAction(formDataObj)
    })
  }
  
  return (
    <ResponsiveModal
      trigger={trigger}
      title={theme ? 'Edit Theme' : 'Create New Theme'}
      description="Customize your theme colors and settings"
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField label="Theme Name" required>
          <Input
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Enter theme name"
            required
          />
        </FormField>
        
        <FormField label="Description">
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe your theme"
            rows={3}
          />
        </FormField>
        
        <FormField label="Category">
          <Select 
            value={formData.category} 
            onValueChange={(value: ThemeCategory) => setFormData(prev => ({ ...prev, category: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="minimal">Minimal</SelectItem>
              <SelectItem value="modern">Modern</SelectItem>
              <SelectItem value="classic">Classic</SelectItem>
              <SelectItem value="vibrant">Vibrant</SelectItem>
              <SelectItem value="nature">Nature</SelectItem>
              <SelectItem value="outdoor">Outdoor</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
        
        <div className="space-y-4">
          <h3 className="font-medium">Color Palette</h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(formData.palette).map(([key, color]) => (
              <ColorPicker
                key={key}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                value={color}
                onChange={(value: string) => setFormData(prev => ({
                  ...prev,
                  palette: { ...prev.palette, [key]: value }
                }))}
              />
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-2 pt-4">
          <SubmitButton>
            {theme ? 'Update Theme' : 'Create Theme'}
          </SubmitButton>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </div>
        
        {saveState && !saveState.success && (
          <StatusIndicator status="error" message={saveState.message} />
        )}
      </form>
    </ResponsiveModal>
  )
}

// Theme Gallery Component
export function ThemeGallery({ 
  themes, 
  activeThemeId, 
  onThemeEdit 
}: { 
  themes: CustomTheme[]
  activeThemeId: string | null
  onThemeEdit: (theme: CustomTheme) => void
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {themes.map((theme) => (
        <ThemeActionCard
          key={theme.id}
          theme={theme}
          isActive={activeThemeId === theme.id}
          onEdit={onThemeEdit}
        />
      ))}
    </div>
  )
}

// Theme Quick Actions
export function ThemeQuickActions({ 
  onCreateTheme, 
  onImportTheme, 
  onExportTheme 
}: {
  onCreateTheme: () => void
  onImportTheme: (file: File) => void
  onExportTheme: () => void
}) {
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onImportTheme(file)
    }
  }
  
  return (
    <div className="flex items-center gap-2">
      <Button onClick={onCreateTheme}>
        <Plus className="w-4 h-4 mr-2" />
        Create New Theme
      </Button>
      
      <Button variant="outline" onClick={onExportTheme}>
        <Download className="w-4 h-4 mr-2" />
        Export Themes
      </Button>
      
      <Button variant="outline" asChild>
        <label htmlFor="import-themes" className="cursor-pointer">
          <Upload className="w-4 h-4 mr-2" />
          Import Themes
          <input
            id="import-themes"
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
          />
        </label>
      </Button>
    </div>
  )
}

// Optimistic Theme Card with Server Actions
export function OptimisticThemeCard({ 
  theme, 
  isActive, 
  onEdit 
}: {
  theme: CustomTheme
  isActive: boolean
  onEdit: (theme: CustomTheme) => void
}) {
  const [activateState, activateAction] = useActionState(setActiveThemeAction, null)
  const [deleteState, deleteAction] = useActionState(deleteCustomThemeAction, null)
  
  // Effects to handle state changes
  useEffect(() => {
    if (activateState?.success) {
      toast.success('Theme activated successfully')
    } else if (activateState && !activateState.success) {
      toast.error(activateState.message || 'Failed to activate theme')
    }
  }, [activateState])
  
  useEffect(() => {
    if (deleteState?.success) {
      toast.success('Theme deleted successfully')
    } else if (deleteState && !deleteState.success) {
      toast.error(deleteState.message || 'Failed to delete theme')
    }
  }, [deleteState])
  
  // Optimistic state for theme operations
  const [optimisticTheme, setOptimisticTheme] = useOptimistic(
    theme as OptimisticTheme,
    (state: OptimisticTheme, action: OptimisticThemeAction): OptimisticTheme => {
      switch (action.type) {
        case 'DELETE_THEME':
          return { ...state, isDeleting: true }
        default:
          return state
      }
    }
  )
  
  const [optimisticActive, setOptimisticActive] = useOptimistic(
    isActive,
    (state: boolean, action: OptimisticThemeAction): boolean => {
      if (action.type === 'SET_ACTIVE' && action.themeId === theme.id) {
        return true
      }
      return state
    }
  )
  
  // Handle activation with optimistic update
  const handleActivate = async (formData: FormData) => {
    setOptimisticActive({ type: 'SET_ACTIVE', themeId: theme.id, mode: 'light' })
    
    startTransition(async () => {
      await activateAction(formData)
    })
  }
  
  // Handle deletion with optimistic update
  const handleDelete = async (formData: FormData) => {
    setOptimisticTheme({ type: 'DELETE_THEME', themeId: theme.id })
    
    startTransition(async () => {
      await deleteAction(formData)
    })
  }
  
  if (optimisticTheme.isDeleting) {
    return (
      <Card className="opacity-50 animate-pulse">
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            Deleting theme...
          </div>
        </CardContent>
      </Card>
    )
  }
  
  return (
    <Card className={`transition-all duration-200 ${optimisticActive ? 'ring-2 ring-primary' : ''}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              {theme.name}
              {optimisticActive && (
                <Badge variant="default" className="ml-2">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Active
                </Badge>
              )}
            </CardTitle>
            <CardDescription>{theme.description}</CardDescription>
          </div>
          <Badge variant="outline" className="capitalize">
            {theme.category}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {/* Theme Preview */}
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 rounded-md border" style={{ 
              backgroundColor: theme.lightMode.palette.background,
              borderColor: theme.lightMode.palette.border 
            }}>
              <div className="text-xs font-medium mb-1" style={{ color: theme.lightMode.palette.text }}>
                Light Mode
              </div>
              <div className="flex gap-1">
                {Object.entries(theme.lightMode.palette).slice(0, 5).map(([key, value]) => (
                  <div 
                    key={key} 
                    className="w-3 h-3 rounded-sm border border-white/20"
                    style={{ backgroundColor: value }}
                  />
                ))}
              </div>
            </div>
            
            <div className="p-3 rounded-md border" style={{ 
              backgroundColor: theme.darkMode.palette.background,
              borderColor: theme.darkMode.palette.border 
            }}>
              <div className="text-xs font-medium mb-1" style={{ color: theme.darkMode.palette.text }}>
                Dark Mode
              </div>
              <div className="flex gap-1">
                {Object.entries(theme.darkMode.palette).slice(0, 5).map(([key, value]) => (
                  <div 
                    key={key} 
                    className="w-3 h-3 rounded-sm border border-white/20"
                    style={{ backgroundColor: value }}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            {!optimisticActive && (
              <form action={handleActivate}>
                <input type="hidden" name="themeId" value={theme.id} />
                <input type="hidden" name="mode" value="light" />
                <SubmitButton>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Activate
                </SubmitButton>
              </form>
            )}
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(theme)}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            
            {theme.isCustom && (
              <form action={handleDelete}>
                <input type="hidden" name="themeId" value={theme.id} />
                <SubmitButton variant="destructive" size="sm">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </SubmitButton>
              </form>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Theme save form with server actions
export function ThemeSaveForm({ 
  theme, 
  onSuccess 
}: { 
  theme: CustomTheme
  onSuccess: () => void
}) {
  const [saveState, saveAction] = useActionState(saveCustomThemeAction, null)
  
  // Effect to handle save state changes
  useEffect(() => {
    if (saveState?.success) {
      toast.success('Theme saved successfully')
      onSuccess()
    } else if (saveState && !saveState.success) {
      toast.error(saveState.message || 'Failed to save theme')
    }
  }, [saveState, onSuccess])
  
  const handleSave = async (formData: FormData) => {
    startTransition(async () => {
      await saveAction(formData)
    })
  }
  
  return (
    <form action={handleSave} className="space-y-4">
      <input 
        type="hidden" 
        name="themeData" 
        value={JSON.stringify(theme)} 
      />
      
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onSuccess}>
          Cancel
        </Button>
        <SubmitButton>
          Save Theme
        </SubmitButton>
      </div>
      
      {saveState && !saveState.success && (
        <div className="text-red-600 text-sm">
          <XCircle className="w-4 h-4 inline mr-1" />
          {saveState.message}
        </div>
      )}
    </form>
  )
}
