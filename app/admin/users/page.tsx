"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Mail, MoreVertical } from "lucide-react"
import { getUsers, getLicenses } from "@/lib/storage"
import type { StorageUser, StorageLicense } from "@/lib/storage"

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [users, setUsers] = useState<StorageUser[]>([])
  const [licenses, setLicenses] = useState<StorageLicense[]>([])

  useEffect(() => {
    setUsers(getUsers())
    setLicenses(getLicenses())
  }, [])

  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getUserStats = (userId: string) => {
    const userLicenses = licenses.filter((l) => l.userId === userId)
    return {
      totalPurchases: userLicenses.length,
      totalSpent: 0, // Would need to calculate from product prices
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Gerenciar Usuários</h1>
        <p className="text-muted-foreground">Visualize e gerencie todos os usuários da plataforma</p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar usuários..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Users Table */}
      <Card className="border-border/50 bg-card">
        <CardHeader>
          <CardTitle>Usuários ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredUsers.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>Nenhum usuário cadastrado ainda</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredUsers.map((user) => {
                const stats = getUserStats(user.id)
                return (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-background"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-lg font-semibold text-primary">{user.name.charAt(0)}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{user.name}</h4>
                          <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                            {user.role === "admin" ? "Admin" : "Usuário"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          <span>{user.email}</span>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span>Membro desde {new Date(user.createdAt).toLocaleDateString("pt-BR")}</span>
                          <span>{stats.totalPurchases} compras</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Licenças</p>
                        <p className="text-xl font-bold text-primary">{stats.totalPurchases}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
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
