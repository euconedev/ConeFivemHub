"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Store, CreditCard, Mail, Shield } from "lucide-react"

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Configurações da Plataforma</h1>
        <p className="text-muted-foreground">Gerencie as configurações gerais da loja</p>
      </div>

      {/* Store Settings */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Store className="h-5 w-5" />
            Configurações da Loja
          </CardTitle>
          <CardDescription>Informações básicas da sua loja</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="store-name">Nome da Loja</Label>
            <Input id="store-name" defaultValue="ConeFiveM Hub" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="store-description">Descrição</Label>
            <Textarea
              id="store-description"
              defaultValue="Marketplace de scripts e assets digitais para servidores FiveM"
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="store-email">Email de Contato</Label>
            <Input id="store-email" type="email" defaultValue="contato@conefivem.com" />
          </div>
          <Button>Salvar Alterações</Button>
        </CardContent>
      </Card>

      {/* Payment Settings */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Configurações de Pagamento
          </CardTitle>
          <CardDescription>Configure suas opções de pagamento</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="abacatepay-token">AbacatePay Token</Label>
            <Input id="abacatepay-token" type="password" placeholder="••••••••••••••••" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <Input id="webhook-url" placeholder="https://seu-dominio.com/api/webhook" />
          </div>
          <Button>Salvar Configurações</Button>
        </CardContent>
      </Card>

      {/* Email Settings */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Configurações de Email
          </CardTitle>
          <CardDescription>Configure o envio de emails automáticos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="smtp-host">SMTP Host</Label>
            <Input id="smtp-host" placeholder="smtp.exemplo.com" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="smtp-port">Porta</Label>
              <Input id="smtp-port" placeholder="587" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtp-user">Usuário</Label>
              <Input id="smtp-user" placeholder="usuario@exemplo.com" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="smtp-password">Senha</Label>
            <Input id="smtp-password" type="password" placeholder="••••••••" />
          </div>
          <Button>Salvar Configurações</Button>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Segurança
          </CardTitle>
          <CardDescription>Configurações de segurança da plataforma</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="discord-client-id">Discord Client ID</Label>
            <Input id="discord-client-id" placeholder="Seu Discord Client ID" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="discord-client-secret">Discord Client Secret</Label>
            <Input id="discord-client-secret" type="password" placeholder="••••••••••••••••" />
          </div>
          <Button>Salvar Configurações</Button>
        </CardContent>
      </Card>
    </div>
  )
}
