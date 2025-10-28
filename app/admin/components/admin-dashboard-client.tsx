"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Users, Key, DollarSign, TrendingUp, ShoppingCart } from "lucide-react"
import { getProducts as getSupabaseProducts, getLicenses as getSupabaseLicenses, type StorageProduct, type StorageLicense } from "@/lib/supabase-storage"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"

interface AdminDashboardPageProps {
  initialActiveUsers: number;
}

export default function AdminDashboardClient({ initialActiveUsers }: AdminDashboardPageProps) {
  const [products, setProducts] = useState<StorageProduct[]>([])
  const [licenses, setLicenses] = useState<StorageLicense[]>([])
  const [activeUsers, setActiveUsers] = useState<number>(initialActiveUsers)
  const supabase = getSupabaseBrowserClient()

  useEffect(() => {
    const fetchSupabaseData = async () => {
      const fetchedProducts = await getSupabaseProducts();
      const fetchedLicenses = await getSupabaseLicenses();
      setProducts(fetchedProducts);
      setLicenses(fetchedLicenses);
    };
    fetchSupabaseData();
  }, [])

  const totalRevenue = licenses.reduce((sum, license) => {
    const product = products.find((p) => p.id === license.productId)
    return sum + (product?.price || 0)
  }, 0)

  const stats = [
    {
      title: "Receita Total",
      value: `R$ ${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      description: "+12.5% em relação ao mês passado",
      trend: "up",
    },
    {
      title: "Total de Produtos",
      value: products.length,
      icon: Package,
      description: "Produtos ativos na loja",
      trend: "neutral",
    },
    {
      title: "Usuários Ativos",
      value: activeUsers,
      icon: Users,
      description: "Usuários registrados no sistema",
      trend: "up",
    },
    {
      title: "Licenças Vendidas",
      value: licenses.length,
      icon: Key,
      description: "Total de licenças ativas",
      trend: "neutral",
    },
  ]

  const recentSales = licenses.slice(0, 5).map((license) => {
    const product = products.find((p) => p.id === license.productId)
    return {
      ...license,
      product,
    }
  })

  const topProducts = [...products].sort((a, b) => b.downloads - a.downloads).slice(0, 5)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard Administrativo</h1>
        <p className="text-muted-foreground">Visão geral do seu negócio</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  {stat.trend === "up" && <TrendingUp className="h-3 w-3 text-primary" />}
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Sales */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Vendas Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentSales.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>Nenhuma venda registrada ainda</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentSales.map((sale) => (
                  <div key={sale.id} className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                    <div className="flex items-center gap-3">
                      {sale.product && (
                        <div className="h-10 w-10 rounded-lg overflow-hidden bg-muted">
                          <img
                            src={sale.product.image || "/placeholder.svg"}
                            alt={sale.product.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-sm">{sale.productName}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(sale.purchaseDate).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary">R$ {sale.product?.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Produtos Mais Vendidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            {topProducts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>Nenhum produto cadastrado ainda</p>
              </div>
            ) : (
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={product.id} className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-sm font-bold text-primary">#{index + 1}</span>
                      </div>
                      <div className="h-10 w-10 rounded-lg overflow-hidden bg-muted">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.downloads} downloads</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary">R$ {product.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
