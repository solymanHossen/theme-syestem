import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      // Performance: Use CSS custom properties for dynamic theming
      colors: {
        // Theme-aware colors using CSS variables
        "theme-primary": "rgb(var(--theme-primary) / <alpha-value>)",
        "theme-secondary": "rgb(var(--theme-secondary) / <alpha-value>)",
        "theme-background": "rgb(var(--theme-background) / <alpha-value>)",
        "theme-card": "rgb(var(--theme-card) / <alpha-value>)",
        "theme-border": "rgb(var(--theme-border) / <alpha-value>)",
        "theme-text": "rgb(var(--theme-text) / <alpha-value>)",
        "theme-muted": "rgb(var(--theme-muted) / <alpha-value>)",
        "theme-accent": "rgb(var(--theme-accent) / <alpha-value>)",
        "theme-success": "rgb(var(--theme-success) / <alpha-value>)",
        "theme-warning": "rgb(var(--theme-warning) / <alpha-value>)",
        "theme-error": "rgb(var(--theme-error) / <alpha-value>)",

        // shadcn/ui colors
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "fade-out": "fadeOut 0.3s ease-in-out",
        "slide-in": "slideIn 0.3s ease-out",
        "slide-out": "slideOut 0.3s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
        "scale-out": "scaleOut 0.2s ease-out",
        "theme-switch": "themeSwitch 0.5s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        slideIn: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideOut: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        scaleOut: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(0.95)", opacity: "0" },
        },
        themeSwitch: {
          "0%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(180deg) scale(1.1)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      transitionProperty: {
        'theme': 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
      },
      transitionTimingFunction: {
        'theme': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        'theme': '200ms',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
