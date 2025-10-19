"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Share2, Copy, Trash2, ExternalLink } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { getUserSharedLinks, deleteSharedLink, type SharedLink } from "@/lib/storage"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function SharedLinksPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [sharedLinks, setSharedLinks] = useState<SharedLink[]>([])

  useEffect(() => {
    if (user) {
      setSharedLinks(getUserSharedLinks(user.id))
    }
  }, [user])

  const handleCopyLink = (token: string) => {
    const url = `${window.location.origin}/shared/${token}`
    navigator.clipboard.writeText(url)
    toast({
      title: "Link copiado!",
      description: "O link foi copiado para a área de transferência.",
    })
  }

  const handleDeleteLink = (linkId: string) => {
    deleteSharedLink(linkId)
    if (user) {
      setSharedLinks(getUserSharedLinks(user.id))
    }
    toast({
      title: "Link removido",
      description: "O link compartilhado foi excluído.",
    })
  }

  const getStatusBadge = (expiresAt: string) => {
    const isExpired = new Date(expiresAt) < new Date()
    return isExpired ? <Badge variant="destructive">Expirado</Badge> : <Badge variant="default">Ativo</Badge>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Links Compartilhados</h1>
        <p className="text-muted-foreground">Gerencie os links de licenças que você compartilhou</p>
      </div>

      {sharedLinks.length === 0 ? (
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="py-12">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Share2 className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Nenhum link compartilhado</h3>
                <p className="text-muted-foreground mb-4">
                  Você ainda não compartilhou nenhuma licença. Vá para suas licenças e clique em "Compartilhar" para
                  criar um link.
                </p>
                <Link href="/dashboard/licenses">
                  <Button>
                    <Share2 className="h-4 w-4 mr-2" />
                    Ver Minhas Licenças
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {sharedLinks.map((link) => (
            <Card key={link.id} className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{link.productName}</CardTitle>
                    <CardDescription>Criado em {new Date(link.createdAt).toLocaleDateString("pt-BR")}</CardDescription>
                  </div>
                  {getStatusBadge(link.expiresAt)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 p-3 bg-background/50 rounded-lg">
                  <code className="flex-1 text-sm text-muted-foreground truncate">
                    {window.location.origin}/shared/{link.token}
                  </code>
                  <Button size="sm" variant="outline" onClick={() => handleCopyLink(link.token)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Link href={`/shared/${link.token}`} target="_blank">
                    <Button size="sm" variant="outline">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="space-y-1">
                    <p className="text-muted-foreground">
                      Expira em: {new Date(link.expiresAt).toLocaleDateString("pt-BR")}
                    </p>
                    <p className="text-muted-foreground">Acessos: {link.accessCount}</p>
                  </div>
                  <Button size="sm" variant="destructive" onClick={() => handleDeleteLink(link.id)}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Excluir
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
