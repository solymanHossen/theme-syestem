import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import type React from 'react'

import { ClientOnly } from '@/components/client-only'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TentShop - Dark/Light Mode',
  description: 'SaaS eCommerce platform with simple dark/light mode toggle',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>
          <ThemeProvider>{children}</ThemeProvider>
        </ClientOnly>
      </body>
    </html>
  )
}
