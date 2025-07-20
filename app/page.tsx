'use client'

import Link from 'next/link'

import { HeroSection } from '@/components/ecommerce/hero-section'
import { ProductCard } from '@/components/ecommerce/product-card'
import { ThemeColorPicker } from '@/components/theme-color-picker'
import { useTheme } from '@/components/theme-provider'
import { ThemeToggle } from '@/components/theme-toggle'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

// Mock product data
const products = [
  {
    id: '1',
    name: 'Professional 4-Season Tent',
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    reviews: 124,
    image: '/placeholder.svg?height=300&width=300',
    category: 'Tents',
    isNew: true,
    isSale: true,
  },
  {
    id: '2',
    name: 'Ultralight Backpacking Tent',
    price: 199,
    rating: 4.6,
    reviews: 89,
    image: '/placeholder.svg?height=300&width=300',
    category: 'Tents',
    isNew: false,
  },
  {
    id: '3',
    name: 'Family Camping Tent - 6 Person',
    price: 159,
    rating: 4.4,
    reviews: 67,
    image: '/placeholder.svg?height=300&width=300',
    category: 'Tents',
  },
  {
    id: '4',
    name: 'Dome Tent with Vestibule',
    price: 129,
    originalPrice: 179,
    rating: 4.5,
    reviews: 45,
    image: '/placeholder.svg?height=300&width=300',
    category: 'Tents',
    isSale: true,
  },
  {
    id: '5',
    name: 'Instant Setup Pop-up Tent',
    price: 89,
    rating: 4.2,
    reviews: 156,
    image: '/placeholder.svg?height=300&width=300',
    category: 'Tents',
    isNew: true,
  },
  {
    id: '6',
    name: 'Mountaineering Expedition Tent',
    price: 449,
    rating: 4.9,
    reviews: 23,
    image: '/placeholder.svg?height=300&width=300',
    category: 'Tents',
  },
]

export default function HomePage() {
  const { mode } = useTheme()

  return (
    <div className="min-h-screen bg-theme-background transition-theme">
      {/* Navigation */}
      <nav className="border-b border-theme-border py-4 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold bg-theme-primary">
              T
            </div>
            <div>
              <h1 className="text-xl font-bold text-theme-primary">TentShop</h1>
              <Badge variant="outline" className="text-xs">
                eCommerce
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="hidden sm:flex">
              {mode === 'light' ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </Badge>
            <ThemeColorPicker />
            <ThemeToggle />
            <Link href="/admin">
              <Button variant="outline" size="sm">
                Admin Panel
              </Button>
            </Link>
            <Button
              size="sm"
              className="text-white bg-theme-primary hover:bg-theme-primary/90"
            >
              Cart (0)
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection />

      {/* Products Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-theme-text">
              Featured Tents
            </h2>
            <p className="text-lg max-w-2xl mx-auto text-theme-muted">
              Discover our premium collection of tents for every adventure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-theme-border text-theme-text hover:bg-theme-card transition-theme"
            >
              View All Products
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-theme-border bg-theme-card py-8 px-4 mt-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded flex items-center justify-center text-white font-bold text-sm bg-theme-primary">
                  T
                </div>
                <h3 className="font-bold text-theme-text">TentShop</h3>
              </div>
              <p className="text-sm text-theme-muted">
                Premium outdoor gear and camping equipment for your next
                adventure.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-theme-text">Products</h4>
              <ul className="space-y-2 text-sm text-theme-muted">
                <li>Tents</li>
                <li>Sleeping Bags</li>
                <li>Backpacks</li>
                <li>Accessories</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-theme-text">Support</h4>
              <ul className="space-y-2 text-sm text-theme-muted">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Returns</li>
                <li>Shipping</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-theme-text">Company</h4>
              <ul className="space-y-2 text-sm text-theme-muted">
                <li>About</li>
                <li>Careers</li>
                <li>Privacy</li>
                <li>Terms</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-theme-border mt-8 pt-8 text-center">
            <p className="text-sm text-theme-muted">
              © 2024 TentShop. Built with Tailwind CSS v4 theming system.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
