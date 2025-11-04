"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Copy, Download, Eye, EyeOff, Search, Share2 } from "lucide-react"
import { getUserLicenses, getProducts, createSharedLink } from "@/lib/storage"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function LicensesPage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set())
  const { toast } = useToast()
  const [licenses, setLicenses] = useState(getUserLicenses(user?.id || ""))
  const [products, setProducts] = useState(getProducts())

  useEffect(() => {
    if (user) {
      setLicenses(getUserLicenses(user.id))
      setProducts(getProducts())
    }
  }, [user])

  const filteredLicenses = licenses.filter((license) =>
    license.productName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const toggleKeyVisibility = (licenseId: string) => {
    setVisibleKeys((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(licenseId)) {
        newSet.delete(licenseId)
      } else {
        newSet.add(licenseId)
      }
      return newSet
    })
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copiado!",
      description: "Chave de licença copiada para a área de transferência",
    })
  }

  const handleCreateShareLink = (license: any) => {
    if (!user) return

    const sharedLink = createSharedLink(license.productId, license.productName, user.id, {
      expiresInDays: 7,
      maxDownloads: 10,
    })

    navigator.clipboard.writeText(sharedLink.shareUrl)
    toast({
      title: "Link criado!",
      description: "Link de compartilhamento copiado para a área de transferência",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Minhas Licenças</h1>
          <p className="text-muted-foreground">Gerencie todas as suas licenças de produtos</p>
        </div>
        <Link href="/dashboard/shared-links">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Share2 className="h-4 w-4" />
            Links Compartilhados
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar licenças..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Licenses List */}
      <div className="space-y-4">
        {filteredLicenses.length === 0 ? (
          <Card className="border-border/50 bg-card">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">Nenhuma licença encontrada</p>
              <Link href="/store">
                <Button className="mt-4">Explorar Loja</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          filteredLicenses.map((license) => {
            const product = products.find((p) => p.id === license.productId)
            const isKeyVisible = visibleKeys.has(license.id)

            return (
              <Card key={license.id} className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      {product && (
                        <div className="h-16 w-16 rounded-lg overflow-hidden bg-muted">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      )}
                      <div>
                        <CardTitle className="text-xl">{license.productName}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          Comprado em {new Date(license.purchaseDate).toLocaleDateString("pt-BR")}
                        </p>
                        {license.expiryDate && (
                          <p className="text-sm text-muted-foreground">
                            Expira em {new Date(license.expiryDate).toLocaleDateString("pt-BR")}
                          </p>
                        )}
                      </div>
                    </div>
                    <Badge
                      variant={license.status === "active" ? "default" : "secondary"}
                      className={license.status === "active" ? "shadow-lg shadow-primary/50" : ""}
                    >
                      {license.status === "active" ? "Ativa" : license.status === "expired" ? "Expirada" : "Suspensa"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Chave de Licença</label>
                    <div className="flex gap-2">
                      <div className="flex-1 relative">
                        <Input
                          type={isKeyVisible ? "text" : "password"}
                          value={license.licenseKey}
                          readOnly
                          className="pr-10 font-mono"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full"
                          onClick={() => toggleKeyVisibility(license.id)}
                        >
                          {isKeyVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      <Button variant="outline" size="icon" onClick={() => copyToClipboard(license.licenseKey)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 gap-2 bg-transparent">
                      <Download className="h-4 w-4" />
                      Baixar Produto
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 gap-2 bg-transparent"
                      onClick={() => handleCreateShareLink(license)}
                    >
                      <Share2 className="h-4 w-4" />
                      Compartilhar
                    </Button>
                    {product && (
                      <Button variant="outline" className="gap-2 bg-transparent" asChild>
                        <Link href={`/store/${product.id}`}>Ver Detalhes</Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
