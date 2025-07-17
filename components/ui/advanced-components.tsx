'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Toast, ToastAction, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from '@/components/ui/toast'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { 
  Palette, 
  Settings, 
  Monitor, 
  Smartphone, 
  Tablet, 
  Sun, 
  Moon, 
  Eye, 
  EyeOff, 
  Copy, 
  Download, 
  Upload, 
  Trash2, 
  Edit, 
  Save, 
  X,
  Check,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  Info,
  AlertCircle,
  CheckCircle,
  XCircle,
  Loader2
} from 'lucide-react'
import { useMediaQuery } from '@/hooks/modern-hooks'

// Theme Card Component Variants
const themeCardVariants = cva(
  "relative group overflow-hidden rounded-lg border transition-all duration-200 hover:shadow-lg",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        active: "bg-primary/5 border-primary ring-2 ring-primary/20",
        preview: "bg-muted/50 border-dashed",
      },
      size: {
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

export interface ThemeCardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof themeCardVariants> {
  theme: {
    id: string
    name: string
    description?: string
    category?: string
    palette: Record<string, string>
  }
  isActive?: boolean
  isPreview?: boolean
  onActivate?: () => void
  onEdit?: () => void
  onDelete?: () => void
  onDuplicate?: () => void
}

export function ThemeCard({ 
  theme, 
  isActive, 
  isPreview, 
  variant,
  size,
  className,
  onActivate,
  onEdit,
  onDelete,
  onDuplicate,
  ...props 
}: ThemeCardProps) {
  const cardVariant = isActive ? 'active' : isPreview ? 'preview' : variant
  
  return (
    <Card 
      className={cn(themeCardVariants({ variant: cardVariant, size, className }))} 
      {...props}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{theme.name}</CardTitle>
            {theme.description && (
              <CardDescription className="text-sm">{theme.description}</CardDescription>
            )}
          </div>
          <div className="flex items-center gap-2">
            {theme.category && (
              <Badge variant="secondary" className="capitalize text-xs">
                {theme.category}
              </Badge>
            )}
            {isActive && (
              <Badge variant="default" className="text-xs">
                <CheckCircle className="w-3 h-3 mr-1" />
                Active
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Color Palette Preview */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Color Palette</Label>
          <div className="grid grid-cols-5 gap-2">
            {Object.entries(theme.palette).slice(0, 10).map(([key, color]) => (
              <TooltipProvider key={key}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className="w-full h-8 rounded-md border cursor-pointer hover:scale-105 transition-transform"
                      style={{ backgroundColor: color }}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">{key}: {color}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-2 pt-2">
          {onActivate && !isActive && (
            <Button size="sm" onClick={onActivate} className="flex-1">
              <Palette className="w-4 h-4 mr-2" />
              Activate
            </Button>
          )}
          
          {onEdit && (
            <Button size="sm" variant="outline" onClick={onEdit}>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          )}
          
          {onDuplicate && (
            <Button size="sm" variant="outline" onClick={onDuplicate}>
              <Copy className="w-4 h-4 mr-2" />
              Duplicate
            </Button>
          )}
          
          {onDelete && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Theme</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete "{theme.name}"? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={onDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Color Picker Component
export interface ColorPickerProps {
  value: string
  onChange: (value: string) => void
  label?: string
  disabled?: boolean
}

export function ColorPicker({ value, onChange, label, disabled }: ColorPickerProps) {
  return (
    <div className="space-y-2">
      {label && <Label className="text-sm font-medium">{label}</Label>}
      <div className="flex items-center gap-2">
        <div 
          className="w-10 h-10 rounded-md border cursor-pointer hover:scale-105 transition-transform"
          style={{ backgroundColor: value }}
          onClick={() => {
            if (!disabled) {
              const input = document.createElement('input')
              input.type = 'color'
              input.value = value
              input.onchange = (e) => onChange((e.target as HTMLInputElement).value)
              input.click()
            }
          }}
        />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#000000"
          className="font-mono text-sm"
          disabled={disabled}
        />
      </div>
    </div>
  )
}

// Theme Mode Toggle
export interface ThemeModeToggleProps {
  mode: 'light' | 'dark'
  onModeChange: (mode: 'light' | 'dark') => void
  disabled?: boolean
}

export function ThemeModeToggle({ mode, onModeChange, disabled }: ThemeModeToggleProps) {
  return (
    <div className="flex items-center gap-2">
      <Sun className="w-4 h-4" />
      <Switch
        checked={mode === 'dark'}
        onCheckedChange={(checked: boolean) => onModeChange(checked ? 'dark' : 'light')}
        disabled={disabled}
      />
      <Moon className="w-4 h-4" />
    </div>
  )
}

// Advanced Form Field Components
export interface FormFieldProps {
  label: string
  description?: string
  error?: string
  required?: boolean
  children: React.ReactNode
}

export function FormField({ label, description, error, required, children }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {children}
      {error && (
        <div className="flex items-center gap-2 text-sm text-destructive">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}
    </div>
  )
}

// Responsive Dialog/Drawer
export interface ResponsiveModalProps {
  trigger: React.ReactNode
  title: string
  description?: string
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function ResponsiveModal({ 
  trigger, 
  title, 
  description, 
  children, 
  open, 
  onOpenChange 
}: ResponsiveModalProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    )
  }
  
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          {description && <DrawerDescription>{description}</DrawerDescription>}
        </DrawerHeader>
        <div className="px-4 pb-4">
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  )
}

// Loading States
export interface LoadingStateProps {
  isLoading: boolean
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function LoadingState({ isLoading, children, fallback }: LoadingStateProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        {fallback || (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading...
          </div>
        )}
      </div>
    )
  }
  
  return <>{children}</>
}

// Preview Frame Component
export interface PreviewFrameProps {
  children: React.ReactNode
  device?: 'desktop' | 'tablet' | 'mobile'
  className?: string
}

export function PreviewFrame({ children, device = 'desktop', className }: PreviewFrameProps) {
  const frameClasses = {
    desktop: 'w-full max-w-6xl mx-auto',
    tablet: 'w-full max-w-2xl mx-auto',
    mobile: 'w-full max-w-sm mx-auto',
  }
  
  const deviceIcon = {
    desktop: Monitor,
    tablet: Tablet,
    mobile: Smartphone,
  }
  
  const Icon = deviceIcon[device]
  
  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <Icon className="w-4 h-4" />
        {device.charAt(0).toUpperCase() + device.slice(1)} Preview
      </div>
      <div className={cn("border rounded-lg overflow-hidden bg-background", frameClasses[device])}>
        <div className="border-b bg-muted/30 px-4 py-2 flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex-1 text-center text-sm text-muted-foreground">
            Theme Preview
          </div>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  )
}

// Status Indicator
export interface StatusIndicatorProps {
  status: 'success' | 'error' | 'warning' | 'info' | 'loading'
  message: string
  className?: string
}

export function StatusIndicator({ status, message, className }: StatusIndicatorProps) {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
    loading: Loader2,
  }
  
  const colors = {
    success: 'text-green-600',
    error: 'text-red-600',
    warning: 'text-yellow-600',
    info: 'text-blue-600',
    loading: 'text-muted-foreground',
  }
  
  const Icon = icons[status]
  
  return (
    <div className={cn("flex items-center gap-2 text-sm", colors[status], className)}>
      <Icon className={cn("w-4 h-4", status === 'loading' && 'animate-spin')} />
      {message}
    </div>
  )
}

// Advanced Slider with Labels
export interface LabeledSliderProps {
  label: string
  value: number[]
  onValueChange: (value: number[]) => void
  min?: number
  max?: number
  step?: number
  unit?: string
  disabled?: boolean
}

export function LabeledSlider({ 
  label, 
  value, 
  onValueChange, 
  min = 0, 
  max = 100, 
  step = 1, 
  unit = '',
  disabled 
}: LabeledSliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">{label}</Label>
        <span className="text-sm text-muted-foreground">
          {value[0]}{unit}
        </span>
      </div>
      <Slider
        value={value}
        onValueChange={onValueChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className="w-full"
      />
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  )
}
