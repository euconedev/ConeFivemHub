"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, X, Users } from "lucide-react"
import { getDiscordClients, updateDiscordClientTags, type DiscordClient } from "@/lib/supabase-storage"

const GUILD_ID = "928115847967408168"

export default function AdminDiscordPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [clients, setClients] = useState<DiscordClient[]>([])
  const [newTag, setNewTag] = useState("")
  const [selectedClient, setSelectedClient] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadClients()
  }, [])

  const loadClients = async () => {
    setLoading(true)
    const data = await getDiscordClients()
    setClients(data)
    setLoading(false)
  }

  const filteredClients = clients.filter(
    (client) =>
      client.discord_username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const addTagToClient = async (clientId: string) => {
    if (newTag.trim()) {
      const client = clients.find((c) => c.id === clientId)
      if (client) {
        const updatedTags = [...client.tags, newTag.trim()]
        const success = await updateDiscordClientTags(clientId, updatedTags)
        if (success) {
          setClients(clients.map((c) => (c.id === clientId ? { ...c, tags: updatedTags } : c)))
          setNewTag("")
        }
      }
    }
  }

  const removeTagFromClient = async (clientId: string, tagIndex: number) => {
    const client = clients.find((c) => c.id === clientId)
    if (client) {
      const updatedTags = client.tags.filter((_, i) => i !== tagIndex)
      const success = await updateDiscordClientTags(clientId, updatedTags)
      if (success) {
        setClients(clients.map((c) => (c.id === clientId ? { ...c, tags: updatedTags } : c)))
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Integração Discord</h1>
          <p className="text-muted-foreground">Gerencie tags de clientes conectados ao Discord</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>Guild ID: {GUILD_ID}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="border-border/50 bg-card">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-primary">{clients.length}</div>
            <p className="text-sm text-muted-foreground">Clientes Conectados</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-primary">
              {clients.filter((c) => c.tags.includes("premium")).length}
            </div>
            <p className="text-sm text-muted-foreground">Clientes Premium</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-primary">
              {clients.filter((c) => c.tags.includes("vip")).length}
            </div>
            <p className="text-sm text-muted-foreground">Clientes VIP</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar clientes..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Clients List */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Clientes Discord ({filteredClients.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Carregando...</div>
          ) : filteredClients.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhum cliente conectado ao Discord ainda</p>
              <p className="text-sm mt-2">Os clientes aparecerão aqui quando se conectarem ao servidor Discord</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredClients.map((client) => (
                <div key={client.id} className="p-4 rounded-lg border border-border/50 bg-background/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">{client.discord_username}</h4>
                      <p className="text-sm text-muted-foreground">Discord ID: {client.discord_id}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Conectado em: {new Date(client.joined_at).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="space-y-2">
                    <Label className="text-xs">Tags</Label>
                    <div className="flex flex-wrap gap-2">
                      {client.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="gap-1">
                          {tag}
                          <button
                            onClick={() => removeTagFromClient(client.id, index)}
                            className="hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Add Tag */}
                  {selectedClient === client.id ? (
                    <div className="flex gap-2">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && addTagToClient(client.id)}
                        placeholder="Nova tag..."
                        className="h-8 text-sm"
                      />
                      <Button onClick={() => addTagToClient(client.id)} size="sm">
                        Adicionar
                      </Button>
                      <Button onClick={() => setSelectedClient(null)} variant="outline" size="sm">
                        Cancelar
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={() => setSelectedClient(client.id)} variant="outline" size="sm" className="gap-2">
                      <Plus className="h-3 w-3" />
                      Adicionar Tag
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
