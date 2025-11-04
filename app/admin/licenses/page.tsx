"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Copy, Ban, CheckCircle } from "lucide-react"
import { getLicenses, getProducts, type StorageLicense } from "@/lib/storage"
import { useToast } from "@/hooks/use-toast"

export default function AdminLicensesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [licenses, setLicenses] = useState<StorageLicense[]>([])
  const { toast } = useToast()

  useEffect(() => {
    setLicenses(getLicenses())
  }, [])

  const products = getProducts()

  const filteredLicenses = licenses.filter(
    (license) =>
      license.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      license.licenseKey.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copiado!",
      description: "Chave de licença copiada para a área de transferência",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Gerenciar Licenças</h1>
        <p className="text-muted-foreground">Visualize e gerencie todas as licenças emitidas</p>
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

      {/* Licenses Table */}
      <Card className="border-border/50 bg-card">
        <CardHeader>
          <CardTitle>Licenças ({filteredLicenses.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredLicenses.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>Nenhuma licença emitida ainda</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredLicenses.map((license) => {
                const product = products.find((p) => p.id === license.productId)
                return (
                  <div
                    key={license.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-background"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      {product && (
                        <div className="h-12 w-12 rounded-lg overflow-hidden bg-muted">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{license.productName}</h4>
                          <Badge
                            variant={license.status === "active" ? "default" : "secondary"}
                            className={license.status === "active" ? "shadow-lg shadow-primary/50" : ""}
                          >
                            {license.status === "active"
                              ? "Ativa"
                              : license.status === "expired"
                                ? "Expirada"
                                : "Suspensa"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground font-mono">{license.licenseKey}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span>Comprado em {new Date(license.purchaseDate).toLocaleDateString("pt-BR")}</span>
                          {license.expiryDate && (
                            <span>Expira em {new Date(license.expiryDate).toLocaleDateString("pt-BR")}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button variant="ghost" size="icon" onClick={() => copyToClipboard(license.licenseKey)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      {license.status === "active" ? (
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                          <Ban className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button variant="ghost" size="icon" className="text-primary hover:text-primary">
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
