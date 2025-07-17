// Tailwind CSS v4 Configuration (Beta)
// If you want to upgrade to v4, replace tailwind.config.ts with this file
// and update your CSS imports

import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    '*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Use CSS-first approach in v4
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        // ... other colors
      },
      // v4 uses different animation approach
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config

// Note: To use Tailwind v4 (beta), you'll need to:
// 1. Install: npm install tailwindcss@next
// 2. Update your CSS file to use @import instead of @tailwind directives
// 3. Update your PostCSS config
// 4. This is still experimental - use with caution in production
