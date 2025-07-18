import { Plus, Edit, Trash2, Eye } from "lucide-react"

import { AdminLayout } from "@/components/admin/admin-layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const mockProducts = [
  {
    id: "1",
    name: "Professional 4-Season Tent",
    price: 299,
    stock: 45,
    status: "active",
    category: "Tents",
  },
  {
    id: "2",
    name: "Ultralight Backpacking Tent",
    price: 199,
    stock: 23,
    status: "active",
    category: "Tents",
  },
  {
    id: "3",
    name: "Family Camping Tent",
    price: 159,
    stock: 0,
    status: "out_of_stock",
    category: "Tents",
  },
]

export default function AdminProductsPage() {
  return (
    <AdminLayout currentPage="products">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Products</h1>
            <p className="text-muted-foreground">Manage your product inventory</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Product List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium">{product.name}</h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <span>${product.price}</span>
                      <span>Stock: {product.stock}</span>
                      <Badge variant={product.status === "active" ? "default" : "destructive"}>
                        {product.status === "active" ? "Active" : "Out of Stock"}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
