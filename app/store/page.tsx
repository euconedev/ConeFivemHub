"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { getProducts } from "@/lib/storage"

const categories = [
  { id: "all", name: "Todos", icon: "🎮" },
  { id: "script", name: "Scripts", icon: "⚙️" },
  { id: "asset", name: "Assets", icon: "🎨" },
  { id: "mlo", name: "MLOs", icon: "🏢" },
  { id: "vehicle", name: "Veículos", icon: "🚗" },
  { id: "weapon", name: "Armas", icon: "🔫" },
]

export default function StorePage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [products, setProducts] = useState(getProducts())

  useEffect(() => {
    setProducts(getProducts())
  }, [])

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,255,156,0.1),transparent_50%)]" />

          <div className="container mx-auto max-w-7xl relative">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
                Explore nosso catálogo de <span className="text-primary">produtos premium</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 text-pretty">
                Scripts, MLOs, veículos e muito mais para o seu servidor FiveM
              </p>

              {/* Search Bar */}
              <div className="relative max-w-xl">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar produtos..."
                  className="pl-10 h-12 bg-card/50 backdrop-blur-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 px-4 border-y border-border/50 bg-card/30 backdrop-blur-sm">
          <div className="container mx-auto max-w-7xl">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className="whitespace-nowrap"
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold">Produtos</h2>
                <p className="text-muted-foreground">
                  {filteredProducts.length}{" "}
                  {filteredProducts.length === 1 ? "produto encontrado" : "produtos encontrados"}
                </p>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">Nenhum produto encontrado</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
