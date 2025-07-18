export interface ThemeMode {
  id: "light" | "dark"
  name: string
  description: string
  palette: {
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
}

export interface CustomTheme {
  id: string
  name: string
  description: string
  category: "outdoor" | "modern" | "classic" | "vibrant" | "nature" | "minimal"
  isCustom?: boolean
  createdAt?: string
  lightMode: ThemeMode
  darkMode: ThemeMode
  // Add new customization options
  radius: {
    button: "none" | "sm" | "md" | "lg" | "xl" | "full"
    card: "none" | "sm" | "md" | "lg" | "xl" | "full"
    input: "none" | "sm" | "md" | "lg" | "xl" | "full"
    image: "none" | "sm" | "md" | "lg" | "xl" | "full"
    badge: "none" | "sm" | "md" | "lg" | "xl" | "full"
  }
  spacing: {
    scale: "compact" | "normal" | "relaxed"
    padding: "xs" | "sm" | "md" | "lg" | "xl"
    margin: "xs" | "sm" | "md" | "lg" | "xl"
    gap: "xs" | "sm" | "md" | "lg" | "xl"
  }
  typography: {
    fontFamily: {
      primary: string
      secondary: string
      mono: string
    }
    fontSize: {
      xs: string
      sm: string
      base: string
      lg: string
      xl: string
      "2xl": string
      "3xl": string
      "4xl": string
      "5xl": string
      "6xl": string
    }
    fontWeight: {
      light: string
      normal: string
      medium: string
      semibold: string
      bold: string
      extrabold: string
    }
    lineHeight: {
      tight: string
      snug: string
      normal: string
      relaxed: string
      loose: string
    }
    letterSpacing: {
      tighter: string
      tight: string
      normal: string
      wide: string
      wider: string
      widest: string
    }
  }
  components: {
    button: {
      size: "xs" | "sm" | "md" | "lg" | "xl"
      variant: "solid" | "outline" | "ghost" | "link"
    }
    card: {
      padding: "xs" | "sm" | "md" | "lg" | "xl"
      shadow: "none" | "sm" | "md" | "lg" | "xl"
    }
    input: {
      size: "xs" | "sm" | "md" | "lg" | "xl"
      variant: "outline" | "filled" | "underline"
    }
  }
  shadows: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
    "2xl": string
    inner: string
  }
  preview: {
    buttonStyle: string
    cardStyle: string
  }
}

// Update each theme in the themes array to include the new properties
const defaultCustomizations = {
  radius: {
    button: "md" as const,
    card: "lg" as const,
    input: "md" as const,
    image: "md" as const,
    badge: "full" as const,
  },
  spacing: {
    scale: "normal" as const,
    padding: "md" as const,
    margin: "md" as const,
    gap: "md" as const,
  },
  typography: {
    fontFamily: {
      primary: "Inter, system-ui, sans-serif",
      secondary: "Inter, system-ui, sans-serif",
      mono: "JetBrains Mono, Consolas, monospace",
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "3.75rem",
    },
    fontWeight: {
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
    },
    lineHeight: {
      tight: "1.25",
      snug: "1.375",
      normal: "1.5",
      relaxed: "1.625",
      loose: "2",
    },
    letterSpacing: {
      tighter: "-0.05em",
      tight: "-0.025em",
      normal: "0em",
      wide: "0.025em",
      wider: "0.05em",
      widest: "0.1em",
    },
  },
  components: {
    button: {
      size: "md" as const,
      variant: "solid" as const,
    },
    card: {
      padding: "md" as const,
      shadow: "sm" as const,
    },
    input: {
      size: "md" as const,
      variant: "outline" as const,
    },
  },
  shadows: {
    xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    sm: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
  },
}

// Apply these defaults to all existing themes
export const themes: CustomTheme[] = [
  {
    id: "minimal-white",
    name: "Minimal White",
    description: "Clean, minimal design perfect for modern eCommerce",
    category: "minimal",
    lightMode: {
      id: "light",
      name: "Light Mode",
      description: "Clean, bright theme",
      palette: {
        primary: "#1a202c",
        secondary: "#4a5568",
        background: "#ffffff",
        card: "#f7fafc",
        border: "#e2e8f0",
        text: "#2d3748",
        muted: "#718096",
        accent: "#3182ce",
        success: "#38a169",
        warning: "#d69e2e",
        error: "#e53e3e",
      },
    },
    darkMode: {
      id: "dark",
      name: "Dark Mode",
      description: "Sleek dark theme",
      palette: {
        primary: "#f8fafc",
        secondary: "#e2e8f0",
        background: "#0f172a",
        card: "#1e293b",
        border: "#334155",
        text: "#f8fafc",
        muted: "#94a3b8",
        accent: "#3b82f6",
        success: "#48bb78",
        warning: "#f6ad55",
        error: "#f56565",
      },
    },
    preview: {
      buttonStyle: "bg-slate-800 text-white hover:bg-slate-700",
      cardStyle: "bg-gray-50 border-gray-200",
    },
    ...defaultCustomizations,
  },
  {
    id: "nature-green",
    name: "Nature Green",
    description: "Eco-friendly green theme perfect for outdoor gear",
    category: "nature",
    lightMode: {
      id: "light",
      name: "Light Mode",
      description: "Fresh green theme",
      palette: {
        primary: "#065f46",
        secondary: "#047857",
        background: "#f0fdf4",
        card: "#dcfce7",
        border: "#bbf7d0",
        text: "#064e3b",
        muted: "#6b7280",
        accent: "#10b981",
        success: "#48bb78",
        warning: "#f6ad55",
        error: "#f56565",
      },
    },
    darkMode: {
      id: "dark",
      name: "Dark Mode",
      description: "Dark nature theme",
      palette: {
        primary: "#34d399",
        secondary: "#6ee7b7",
        background: "#0c1f17",
        card: "#1a2e23",
        border: "#2d4a37",
        text: "#d1fae5",
        muted: "#9ca3af",
        accent: "#10b981",
        success: "#48bb78",
        warning: "#f6ad55",
        error: "#f56565",
      },
    },
    preview: {
      buttonStyle: "bg-green-700 text-white hover:bg-green-800",
      cardStyle: "bg-green-50 border-green-200",
    },
    ...defaultCustomizations,
  },
  {
    id: "ocean-blue",
    name: "Ocean Blue",
    description: "Calming blue theme inspired by ocean waves",
    category: "nature",
    lightMode: {
      id: "light",
      name: "Light Mode",
      description: "Ocean blue theme",
      palette: {
        primary: "#1e40af",
        secondary: "#3b82f6",
        background: "#f0f9ff",
        card: "#e0f2fe",
        border: "#bae6fd",
        text: "#1e3a8a",
        muted: "#64748b",
        accent: "#0ea5e9",
        success: "#48bb78",
        warning: "#f6ad55",
        error: "#f56565",
      },
    },
    darkMode: {
      id: "dark",
      name: "Dark Mode",
      description: "Deep ocean theme",
      palette: {
        primary: "#60a5fa",
        secondary: "#93c5fd",
        background: "#0c1426",
        card: "#1e293b",
        border: "#334155",
        text: "#e0f2fe",
        muted: "#94a3b8",
        accent: "#0ea5e9",
        success: "#48bb78",
        warning: "#f6ad55",
        error: "#f56565",
      },
    },
    preview: {
      buttonStyle: "bg-blue-700 text-white hover:bg-blue-800",
      cardStyle: "bg-blue-50 border-blue-200",
    },
    ...defaultCustomizations,
  },
  {
    id: "sunset-orange",
    name: "Sunset Orange",
    description: "Warm orange theme evoking adventure spirit",
    category: "vibrant",
    lightMode: {
      id: "light",
      name: "Light Mode",
      description: "Warm sunset theme",
      palette: {
        primary: "#c2410c",
        secondary: "#ea580c",
        background: "#fff7ed",
        card: "#fed7aa",
        border: "#fdba74",
        text: "#9a3412",
        muted: "#78716c",
        accent: "#f97316",
        success: "#48bb78",
        warning: "#f6ad55",
        error: "#f56565",
      },
    },
    darkMode: {
      id: "dark",
      name: "Dark Mode",
      description: "Dark sunset theme",
      palette: {
        primary: "#fb923c",
        secondary: "#fdba74",
        background: "#1c1917",
        card: "#292524",
        border: "#44403c",
        text: "#fed7aa",
        muted: "#a8a29e",
        accent: "#f97316",
        success: "#48bb78",
        warning: "#f6ad55",
        error: "#f56565",
      },
    },
    preview: {
      buttonStyle: "bg-orange-700 text-white hover:bg-orange-800",
      cardStyle: "bg-orange-50 border-orange-200",
    },
    ...defaultCustomizations,
  },
  {
    id: "forest-brown",
    name: "Forest Brown",
    description: "Earthy brown theme for rustic outdoor equipment",
    category: "nature",
    lightMode: {
      id: "light",
      name: "Light Mode",
      description: "Earthy forest theme",
      palette: {
        primary: "#78350f",
        secondary: "#92400e",
        background: "#fefdf8",
        card: "#fef3c7",
        border: "#fde68a",
        text: "#78350f",
        muted: "#6b7280",
        accent: "#d97706",
        success: "#48bb78",
        warning: "#f6ad55",
        error: "#f56565",
      },
    },
    darkMode: {
      id: "dark",
      name: "Dark Mode",
      description: "Dark forest theme",
      palette: {
        primary: "#fbbf24",
        secondary: "#fcd34d",
        background: "#1c1917",
        card: "#292524",
        border: "#44403c",
        text: "#fef3c7",
        muted: "#a8a29e",
        accent: "#d97706",
        success: "#48bb78",
        warning: "#f6ad55",
        error: "#f56565",
      },
    },
    preview: {
      buttonStyle: "bg-amber-800 text-white hover:bg-amber-900",
      cardStyle: "bg-amber-50 border-amber-200",
    },
    ...defaultCustomizations,
  },
  {
    id: "arctic-white",
    name: "Arctic White",
    description: "Pure white theme for winter sports gear",
    category: "minimal",
    lightMode: {
      id: "light",
      name: "Light Mode",
      description: "Arctic white theme",
      palette: {
        primary: "#374151",
        secondary: "#4b5563",
        background: "#ffffff",
        card: "#f9fafb",
        border: "#e5e7eb",
        text: "#111827",
        muted: "#9ca3af",
        accent: "#6366f1",
        success: "#48bb78",
        warning: "#f6ad55",
        error: "#f56565",
      },
    },
    darkMode: {
      id: "dark",
      name: "Dark Mode",
      description: "Arctic night theme",
      palette: {
        primary: "#d1d5db",
        secondary: "#e5e7eb",
        background: "#111827",
        card: "#1f2937",
        border: "#374151",
        text: "#f9fafb",
        muted: "#9ca3af",
        accent: "#6366f1",
        success: "#48bb78",
        warning: "#f6ad55",
        error: "#f56565",
      },
    },
    preview: {
      buttonStyle: "bg-gray-700 text-white hover:bg-gray-800",
      cardStyle: "bg-gray-50 border-gray-200",
    },
    ...defaultCustomizations,
  },
  {
    id: "mountain-purple",
    name: "Mountain Purple",
    description: "Majestic purple theme inspired by mountain peaks",
    category: "vibrant",
    lightMode: {
      id: "light",
      name: "Light Mode",
      description: "Mountain purple theme",
      palette: {
        primary: "#581c87",
        secondary: "#7c3aed",
        background: "#faf5ff",
        card: "#f3e8ff",
        border: "#e9d5ff",
        text: "#581c87",
        muted: "#6b7280",
        accent: "#8b5cf6",
        success: "#48bb78",
        warning: "#f6ad55",
        error: "#f56565",
      },
    },
    darkMode: {
      id: "dark",
      name: "Dark Mode",
      description: "Dark mountain theme",
      palette: {
        primary: "#a855f7",
        secondary: "#c084fc",
        background: "#1e1b4b",
        card: "#312e81",
        border: "#4c1d95",
        text: "#f3e8ff",
        muted: "#a8a29e",
        accent: "#8b5cf6",
        success: "#48bb78",
        warning: "#f6ad55",
        error: "#f56565",
      },
    },
    preview: {
      buttonStyle: "bg-purple-800 text-white hover:bg-purple-900",
      cardStyle: "bg-purple-50 border-purple-200",
    },
    ...defaultCustomizations,
  },
  {
    id: "desert-sand",
    name: "Desert Sand",
    description: "Warm sand colors for desert camping gear",
    category: "nature",
    lightMode: {
      id: "light",
      name: "Light Mode",
      description: "Desert sand theme",
      palette: {
        primary: "#92400e",
        secondary: "#b45309",
        background: "#fffbeb",
        card: "#fef3c7",
        border: "#fde68a",
        text: "#92400e",
        muted: "#78716c",
        accent: "#f59e0b",
        success: "#48bb78",
        warning: "#f6ad55",
        error: "#f56565",
      },
    },
    darkMode: {
      id: "dark",
      name: "Dark Mode",
      description: "Desert night theme",
      palette: {
        primary: "#fbbf24",
        secondary: "#fcd34d",
        background: "#1c1917",
        card: "#292524",
        border: "#44403c",
        text: "#fef3c7",
        muted: "#a8a29e",
        accent: "#f59e0b",
        success: "#48bb78",
        warning: "#f6ad55",
        error: "#f56565",
      },
    },
    preview: {
      buttonStyle: "bg-yellow-700 text-white hover:bg-yellow-800",
      cardStyle: "bg-yellow-50 border-yellow-200",
    },
    ...defaultCustomizations,
  },
  {
    id: "glacier-blue",
    name: "Glacier Blue",
    description: "Cool glacier blue for winter equipment",
    category: "nature",
    lightMode: {
      id: "light",
      name: "Light Mode",
      description: "Glacier blue theme",
      palette: {
        primary: "#0c4a6e",
        secondary: "#0369a1",
        background: "#f0f9ff",
        card: "#e0f2fe",
        border: "#bae6fd",
        text: "#0c4a6e",
        muted: "#64748b",
        accent: "#0284c7",
        success: "#48bb78",
        warning: "#f6ad55",
        error: "#f56565",
      },
    },
    darkMode: {
      id: "dark",
      name: "Dark Mode",
      description: "Glacier night theme",
      palette: {
        primary: "#38bdf8",
        secondary: "#7dd3fc",
        background: "#0c1426",
        card: "#1e293b",
        border: "#334155",
        text: "#e0f2fe",
        muted: "#94a3b8",
        accent: "#0284c7",
        success: "#48bb78",
        warning: "#f6ad55",
        error: "#f56565",
      },
    },
    preview: {
      buttonStyle: "bg-sky-800 text-white hover:bg-sky-900",
      cardStyle: "bg-sky-50 border-sky-200",
    },
    ...defaultCustomizations,
  },
  {
    id: "campfire-red",
    name: "Campfire Red",
    description: "Bold red theme evoking campfire warmth",
    category: "vibrant",
    lightMode: {
      id: "light",
      name: "Light Mode",
      description: "Campfire red theme",
      palette: {
        primary: "#991b1b",
        secondary: "#dc2626",
        background: "#fef2f2",
        card: "#fecaca",
        border: "#fca5a5",
        text: "#991b1b",
        muted: "#6b7280",
        accent: "#ef4444",
        success: "#48bb78",
        warning: "#f6ad55",
        error: "#f56565",
      },
    },
    darkMode: {
      id: "dark",
      name: "Dark Mode",
      description: "Dark campfire theme",
      palette: {
        primary: "#f87171",
        secondary: "#fca5a5",
        background: "#1f1f1f",
        card: "#292929",
        border: "#404040",
        text: "#fecaca",
        muted: "#a3a3a3",
        accent: "#ef4444",
        success: "#48bb78",
        warning: "#f6ad55",
        error: "#f56565",
      },
    },
    preview: {
      buttonStyle: "bg-red-800 text-white hover:bg-red-900",
      cardStyle: "bg-red-50 border-red-200",
    },
    ...defaultCustomizations,
  },
  {
    id: "midnight-black",
    name: "Midnight Black",
    description: "Sophisticated black theme for premium equipment",
    category: "modern",
    lightMode: {
      id: "light",
      name: "Light Mode",
      description: "Elegant light theme",
      palette: {
        primary: "#000000",
        secondary: "#1f2937",
        background: "#ffffff",
        card: "#f9fafb",
        border: "#e5e7eb",
        text: "#111827",
        muted: "#6b7280",
        accent: "#fbbf24",
        success: "#48bb78",
        warning: "#f6ad55",
        error: "#f56565",
      },
    },
    darkMode: {
      id: "dark",
      name: "Dark Mode",
      description: "Midnight black theme",
      palette: {
        primary: "#ffffff",
        secondary: "#e5e7eb",
        background: "#000000",
        card: "#1f1f1f",
        border: "#374151",
        text: "#ffffff",
        muted: "#9ca3af",
        accent: "#fbbf24",
        success: "#48bb78",
        warning: "#f6ad55",
        error: "#f56565",
      },
    },
    preview: {
      buttonStyle: "bg-black text-white hover:bg-gray-900",
      cardStyle: "bg-gray-900 border-gray-700",
    },
    ...defaultCustomizations,
  },
  {
    id: "coral-pink",
    name: "Coral Pink",
    description: "Vibrant coral theme for modern outdoor lifestyle",
    category: "vibrant",
    lightMode: {
      id: "light",
      name: "Light Mode",
      description: "Coral pink theme",
      palette: {
        primary: "#be185d",
        secondary: "#ec4899",
        background: "#fdf2f8",
        card: "#fce7f3",
        border: "#f9a8d4",
        text: "#be185d",
        muted: "#6b7280",
        accent: "#f472b6",
        success: "#48bb78",
        warning: "#f6ad55",
        error: "#f56565",
      },
    },
    darkMode: {
      id: "dark",
      name: "Dark Mode",
      description: "Dark coral theme",
      palette: {
        primary: "#f472b6",
        secondary: "#f9a8d4",
        background: "#1f1a1e",
        card: "#2d1b2e",
        border: "#4a2545",
        text: "#fce7f3",
        muted: "#a8a29e",
        accent: "#f472b6",
        success: "#48bb78",
        warning: "#f6ad55",
        error: "#f56565",
      },
    },
    preview: {
      buttonStyle: "bg-pink-700 text-white hover:bg-pink-800",
      cardStyle: "bg-pink-50 border-pink-200",
    },
    ...defaultCustomizations,
  },
  {
    id: "emerald-forest",
    name: "Emerald Forest",
    description: "Rich emerald green for forest adventures",
    category: "nature",
    lightMode: {
      id: "light",
      name: "Light Mode",
      description: "Emerald forest theme",
      palette: {
        primary: "#047857",
        secondary: "#059669",
        background: "#ecfdf5",
        card: "#d1fae5",
        border: "#a7f3d0",
        text: "#064e3b",
        muted: "#6b7280",
        accent: "#10b981",
        success: "#48bb78",
        warning: "#f6ad55",
        error: "#f56565",
      },
    },
    darkMode: {
      id: "dark",
      name: "Dark Mode",
      description: "Dark emerald theme",
      palette: {
        primary: "#34d399",
        secondary: "#6ee7b7",
        background: "#0f1f13",
        card: "#1a2e1e",
        border: "#2d4a32",
        text: "#d1fae5",
        muted: "#9ca3af",
        accent: "#10b981",
        success: "#48bb78",
        warning: "#f6ad55",
        error: "#f56565",
      },
    },
    preview: {
      buttonStyle: "bg-emerald-700 text-white hover:bg-emerald-800",
      cardStyle: "bg-emerald-50 border-emerald-200",
    },
    ...defaultCustomizations,
  },
  {
    id: "royal-purple",
    name: "Royal Purple",
    description: "Luxurious purple theme for premium products",
    category: "vibrant",
    lightMode: {
      id: "light",
      name: "Light Mode",
      description: "Royal purple theme",
      palette: {
        primary: "#6b21a8",
        secondary: "#8b5cf6",
        background: "#faf5ff",
        card: "#f3e8ff",
        border: "#e9d5ff",
        text: "#581c87",
        muted: "#6b7280",
        accent: "#a855f7",
        success: "#48bb78",
        warning: "#f6ad55",
        error: "#f56565",
      },
    },
    darkMode: {
      id: "dark",
      name: "Dark Mode",
      description: "Dark royal theme",
      palette: {
        primary: "#a855f7",
        secondary: "#c084fc",
        background: "#1e1b4b",
        card: "#312e81",
        border: "#4c1d95",
        text: "#f3e8ff",
        muted: "#a8a29e",
        accent: "#a855f7",
        success: "#48bb78",
        warning: "#f6ad55",
        error: "#f56565",
      },
    },
    preview: {
      buttonStyle: "bg-purple-700 text-white hover:bg-purple-800",
      cardStyle: "bg-purple-50 border-purple-200",
    },
    ...defaultCustomizations,
  },
  {
    id: "golden-sunset",
    name: "Golden Sunset",
    description: "Warm golden theme inspired by sunset adventures",
    category: "vibrant",
    lightMode: {
      id: "light",
      name: "Light Mode",
      description: "Golden sunset theme",
      palette: {
        primary: "#d97706",
        secondary: "#f59e0b",
        background: "#fffbeb",
        card: "#fef3c7",
        border: "#fde68a",
        text: "#92400e",
        muted: "#78716c",
        accent: "#fbbf24",
        success: "#48bb78",
        warning: "#f6ad55",
        error: "#f56565",
      },
    },
    darkMode: {
      id: "dark",
      name: "Dark Mode",
      description: "Dark golden theme",
      palette: {
        primary: "#fbbf24",
        secondary: "#fcd34d",
        background: "#1c1917",
        card: "#292524",
        border: "#44403c",
        text: "#fef3c7",
        muted: "#a8a29e",
        accent: "#fbbf24",
        success: "#48bb78",
        warning: "#f6ad55",
        error: "#f56565",
      },
    },
    preview: {
      buttonStyle: "bg-amber-700 text-white hover:bg-amber-800",
      cardStyle: "bg-amber-50 border-amber-200",
    },
    ...defaultCustomizations,
  },
  {
    id: "steel-gray",
    name: "Steel Gray",
    description: "Industrial steel gray for rugged equipment",
    category: "modern",
    lightMode: {
      id: "light",
      name: "Light Mode",
      description: "Steel gray theme",
      palette: {
        primary: "#475569",
        secondary: "#64748b",
        background: "#f8fafc",
        card: "#f1f5f9",
        border: "#e2e8f0",
        text: "#334155",
        muted: "#64748b",
        accent: "#0ea5e9",
        success: "#48bb78",
        warning: "#f6ad55",
        error: "#f56565",
      },
    },
    darkMode: {
      id: "dark",
      name: "Dark Mode",
      description: "Dark steel theme",
      palette: {
        primary: "#94a3b8",
        secondary: "#cbd5e1",
        background: "#0f172a",
        card: "#1e293b",
        border: "#334155",
        text: "#f1f5f9",
        muted: "#94a3b8",
        accent: "#0ea5e9",
        success: "#48bb78",
        warning: "#f6ad55",
        error: "#f56565",
      },
    },
    preview: {
      buttonStyle: "bg-slate-700 text-white hover:bg-slate-800",
      cardStyle: "bg-slate-50 border-slate-200",
    },
    ...defaultCustomizations,
  },
  {
    id: "lime-green",
    name: "Lime Green",
    description: "Fresh lime green for eco-friendly products",
    category: "vibrant",
    lightMode: {
      id: "light",
      name: "Light Mode",
      description: "Lime green theme",
      palette: {
        primary: "#65a30d",
        secondary: "#84cc16",
        background: "#f7fee7",
        card: "#ecfccb",
        border: "#d9f99d",
        text: "#365314",
        muted: "#6b7280",
        accent: "#a3e635",
        success: "#48bb78",
        warning: "#f6ad55",
        error: "#f56565",
      },
    },
    darkMode: {
      id: "dark",
      name: "Dark Mode",
      description: "Dark lime theme",
      palette: {
        primary: "#a3e635",
        secondary: "#bef264",
        background: "#1a1f0f",
        card: "#2a2f1a",
        border: "#3a4a2a",
        text: "#ecfccb",
        muted: "#a8a29e",
        accent: "#a3e635",
        success: "#48bb78",
        warning: "#f6ad55",
        error: "#f56565",
      },
    },
    preview: {
      buttonStyle: "bg-lime-700 text-white hover:bg-lime-800",
      cardStyle: "bg-lime-50 border-lime-200",
    },
    ...defaultCustomizations,
  },
  {
    id: "rose-gold",
    name: "Rose Gold",
    description: "Elegant rose gold for premium outdoor fashion",
    category: "classic",
    lightMode: {
      id: "light",
      name: "Light Mode",
      description: "Rose gold theme",
      palette: {
        primary: "#be123c",
        secondary: "#e11d48",
        background: "#fff1f2",
        card: "#ffe4e6",
        border: "#fecdd3",
        text: "#881337",
        muted: "#6b7280",
        accent: "#f43f5e",
        success: "#48bb78",
        warning: "#f6ad55",
        error: "#f56565",
      },
    },
    darkMode: {
      id: "dark",
      name: "Dark Mode",
      description: "Dark rose theme",
      palette: {
        primary: "#fb7185",
        secondary: "#fda4af",
        background: "#1f1a1b",
        card: "#2d1b1f",
        border: "#4a252a",
        text: "#ffe4e6",
        muted: "#a8a29e",
        accent: "#f43f5e",
        success: "#48bb78",
        warning: "#f6ad55",
        error: "#f56565",
      },
    },
    preview: {
      buttonStyle: "bg-rose-700 text-white hover:bg-rose-800",
      cardStyle: "bg-rose-50 border-rose-200",
    },
    ...defaultCustomizations,
  },
  {
    id: "teal-ocean",
    name: "Teal Ocean",
    description: "Refreshing teal inspired by ocean depths",
    category: "nature",
    lightMode: {
      id: "light",
      name: "Light Mode",
      description: "Teal ocean theme",
      palette: {
        primary: "#0f766e",
        secondary: "#14b8a6",
        background: "#f0fdfa",
        card: "#ccfbf1",
        border: "#99f6e4",
        text: "#134e4a",
        muted: "#6b7280",
        accent: "#2dd4bf",
        success: "#48bb78",
        warning: "#f6ad55",
        error: "#f56565",
      },
    },
    darkMode: {
      id: "dark",
      name: "Dark Mode",
      description: "Dark teal theme",
      palette: {
        primary: "#5eead4",
        secondary: "#7dd3fc",
        background: "#0f1f1c",
        card: "#1a2e2a",
        border: "#2d4a44",
        text: "#ccfbf1",
        muted: "#9ca3af",
        accent: "#2dd4bf",
        success: "#48bb78",
        warning: "#f6ad55",
        error: "#f56565",
      },
    },
    preview: {
      buttonStyle: "bg-teal-700 text-white hover:bg-teal-800",
      cardStyle: "bg-teal-50 border-teal-200",
    },
    ...defaultCustomizations,
  },
]

export const themeCategories = [
  { id: "all", name: "All Themes", count: themes.length },
  { id: "outdoor", name: "Outdoor", count: themes.filter((t) => t.category === "outdoor").length },
  { id: "modern", name: "Modern", count: themes.filter((t) => t.category === "modern").length },
  { id: "classic", name: "Classic", count: themes.filter((t) => t.category === "classic").length },
  { id: "vibrant", name: "Vibrant", count: themes.filter((t) => t.category === "vibrant").length },
  { id: "nature", name: "Nature", count: themes.filter((t) => t.category === "nature").length },
  { id: "minimal", name: "Minimal", count: themes.filter((t) => t.category === "minimal").length },
]
