"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  image: string
  category: string
  isNew?: boolean
  isSale?: boolean
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { currentTheme } = useTheme()

  return (
    <Card className="group overflow-hidden transition-all duration-200 hover:shadow-lg themed-card">
      <div className="aspect-square overflow-hidden">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
        />
      </div>

      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Badge variant="secondary" className="text-xs mb-2">
              {product.category}
            </Badge>
            <h3 className="font-semibold line-clamp-2 themed-text">{product.name}</h3>
          </div>
          {product.isNew && <Badge className="bg-green-600 text-white">New</Badge>}
          {product.isSale && <Badge className="bg-red-600 text-white">Sale</Badge>}
        </div>

        <div className="flex items-center gap-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">({product.reviews})</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold themed-text" style={{ color: currentTheme.palette.primary }}>
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
            )}
          </div>

          <Button
            size="sm"
            className="themed-button text-white"
            style={{ backgroundColor: currentTheme.palette.primary }}
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
