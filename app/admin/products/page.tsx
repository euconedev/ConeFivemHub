"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react"
import { ProductForm } from "@/components/product-form"
import Link from "next/link"
import type { Product } from "@/lib/types"

export default function AdminProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [products, setProducts] = useState<Product[]>([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | undefined>()

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const mapped: Product[] = (data || []).map((p: any) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        price: p.price,
        category: p.category,
        image: p.image || p.image_url || "",
        features: p.features || [],
        version: p.version || "",
        downloads: p.downloads ?? 0,
        rating: p.rating ?? 0,
        isNew: p.isNew ?? p.is_new ?? false,
        isFeatured: p.isFeatured ?? p.is_featured ?? false,
        tags: p.tags || [],
      }))
      setProducts(mapped);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSaveProduct = () => {
    fetchProducts(); // Re-fetch products after saving
    setIsFormOpen(false)
    setEditingProduct(undefined)
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setIsFormOpen(true)
  }

  const handleDeleteProduct = async (productId: string) => {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        const response = await fetch(`/api/products?id=${productId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        fetchProducts(); // Re-fetch products after deleting
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  }

  if (isFormOpen) {
    return (
      <div className="space-y-6">
        <ProductForm
          product={editingProduct}
          onSave={handleSaveProduct}
          onCancel={() => {
            setIsFormOpen(false)
            setEditingProduct(undefined)
          }}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Gerenciar Produtos</h1>
          <p className="text-muted-foreground">Adicione, edite ou remova produtos da loja</p>
        </div>
        <Button className="gap-2" onClick={() => setIsFormOpen(true)}>
          <Plus className="h-4 w-4" />
          Novo Produto
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar produtos..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Products Table */}
      <Card className="border-border/50 bg-card">
        <CardHeader>
          <CardTitle>Produtos ({filteredProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>Nenhum produto cadastrado ainda</p>
              <Button className="mt-4 gap-2" onClick={() => setIsFormOpen(true)}>
                <Plus className="h-4 w-4" />
                Adicionar Primeiro Produto
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-background"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="h-16 w-16 rounded-lg overflow-hidden bg-muted">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{product.name}</h4>
                        {product.isNew && <Badge className="bg-primary text-primary-foreground">Novo</Badge>}
                        {product.isFeatured && <Badge variant="secondary">Destaque</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1">{product.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span>v{product.version}</span>
                        <span>{product.downloads} downloads</span>
                        <span>⭐ {product.rating}</span>
                        <Badge variant="outline" className="capitalize">
                          {product.category}
                        </Badge>
                      </div>
                      {product.tags && product.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {product.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-primary">R$ {product.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/store/${product.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleEditProduct(product)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
