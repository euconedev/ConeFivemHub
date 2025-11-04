"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Key, Download } from "lucide-react"
import Link from "next/link"
import { getUserLicenses, getProducts } from "@/lib/storage"

export default function DashboardPage() {
  const { user } = useAuth()
  const [licenses, setLicenses] = useState(getUserLicenses(user?.id || ""))
  const [products, setProducts] = useState(getProducts())

  useEffect(() => {
    if (user) {
      setLicenses(getUserLicenses(user.id))
      setProducts(getProducts())
    }
  }, [user])

  const stats = [
    {
      title: "Produtos Comprados",
      value: licenses.length,
      icon: ShoppingBag,
      description: "Total de produtos",
    },
    {
      title: "Licenças Ativas",
      value: licenses.filter((l) => l.status === "active").length,
      icon: Key,
      description: "Licenças válidas",
    },
    {
      title: "Downloads",
      value: licenses.length * 3,
      icon: Download,
      description: "Total de downloads",
    },
  ]

  const recentLicenses = licenses.slice(0, 3)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Bem-vindo de volta!</h1>
        <p className="text-muted-foreground">{user?.email}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="border-border/50 bg-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Licenses */}
      <Card className="border-border/50 bg-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Licenças Recentes</CardTitle>
            <Link href="/dashboard/licenses">
              <Button variant="ghost" size="sm">
                Ver todas
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {recentLicenses.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Você ainda não possui licenças</p>
              <Link href="/store">
                <Button className="mt-4">Explorar Loja</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentLicenses.map((license) => {
                const product = products.find((p) => p.id === license.productId)
                return (
                  <div
                    key={license.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-background"
                  >
                    <div className="flex items-center gap-4">
                      {product && (
                        <div className="h-12 w-12 rounded-lg overflow-hidden bg-muted">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      )}
                      <div>
                        <h4 className="font-semibold">{license.productName}</h4>
                        <p className="text-sm text-muted-foreground">
                          Comprado em {new Date(license.purchaseDate).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                    </div>
                    <Badge variant={license.status === "active" ? "default" : "secondary"}>
                      {license.status === "active" ? "Ativa" : "Inativa"}
                    </Badge>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-border/50 bg-card">
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <Link href="/store">
            <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4 bg-transparent">
              <ShoppingBag className="h-5 w-5" />
              <div className="text-left">
                <div className="font-semibold">Explorar Loja</div>
                <div className="text-xs text-muted-foreground">Descubra novos produtos</div>
              </div>
            </Button>
          </Link>
          <Link href="/dashboard/licenses">
            <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4 bg-transparent">
              <Key className="h-5 w-5" />
              <div className="text-left">
                <div className="font-semibold">Gerenciar Licenças</div>
                <div className="text-xs text-muted-foreground">Ver todas as suas licenças</div>
              </div>
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
