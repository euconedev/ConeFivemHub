"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Store, CreditCard, Mail, Shield } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function AdminSettingsPage() {
  const { toast } = useToast()

  // Store Settings states
  const [storeName, setStoreName] = useState("ConeFiveM Hub")
  const [storeDescription, setStoreDescription] = useState("Marketplace de scripts e assets digitais para servidores FiveM")
  const [storeEmail, setStoreEmail] = useState("contato@conefivem.com")
  const [isSavingStore, setIsSavingStore] = useState(false)

  // Payment Settings states
  const [abacatepayToken, setAbacatepayToken] = useState("")
  const [webhookUrl, setWebhookUrl] = useState("")
  const [isSavingPayment, setIsSavingPayment] = useState(false)

  // Email Settings states
  const [supportEmail, setSupportEmail] = useState("suporte@conefivem.com")
  const [notificationEmail, setNotificationEmail] = useState("notificacoes@conefivem.com")
  const [marketingEmail, setMarketingEmail] = useState("marketing@conefivem.com")
  const [isSavingEmail, setIsSavingEmail] = useState(false)

  // Security Settings states
  const [twoFactorAuth, setTwoFactorAuth] = useState(false)
  const [sessionTimeout, setSessionTimeout] = useState(30) // in minutes
  const [isSavingSecurity, setIsSavingSecurity] = useState(false)

  const handleSaveStoreSettings = async () => {
    setIsSavingStore(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    try {
      // Here you would typically send data to your backend API
      console.log("Saving Store Settings:", { storeName, storeDescription, storeEmail })
      toast({
        title: "Sucesso!",
        description: "Configurações da loja salvas com sucesso.",
      })
    } catch (error) {
      console.error("Error saving store settings:", error)
      toast({
        title: "Erro",
        description: "Falha ao salvar configurações da loja.",
        variant: "destructive",
      })
    } finally {
      setIsSavingStore(false)
    }
  }

  const handleSavePaymentSettings = async () => {
    setIsSavingPayment(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    try {
      console.log("Saving Payment Settings:", { abacatepayToken, webhookUrl })
      toast({
        title: "Sucesso!",
        description: "Configurações de pagamento salvas com sucesso.",
      })
    } catch (error) {
      console.error("Error saving payment settings:", error)
      toast({
        title: "Erro",
        description: "Falha ao salvar configurações de pagamento.",
        variant: "destructive",
      })
    } finally {
      setIsSavingPayment(false)
    }
  }

  const handleSaveEmailSettings = async () => {
    setIsSavingEmail(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    try {
      console.log("Saving Email Settings:", { supportEmail, notificationEmail, marketingEmail })
      toast({
        title: "Sucesso!",
        description: "Configurações de email salvas com sucesso.",
      })
    } catch (error) {
      console.error("Error saving email settings:", error)
      toast({
        title: "Erro",
        description: "Falha ao salvar configurações de email.",
        variant: "destructive",
      })
    } finally {
      setIsSavingEmail(false)
    }
  }

  const handleSaveSecuritySettings = async () => {
    setIsSavingSecurity(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    try {
      console.log("Saving Security Settings:", { twoFactorAuth, sessionTimeout })
      toast({
        title: "Sucesso!",
        description: "Configurações de segurança salvas com sucesso.",
      })
    } catch (error) {
      console.error("Error saving security settings:", error)
      toast({
        title: "Erro",
        description: "Falha ao salvar configurações de segurança.",
        variant: "destructive",
      })
    } finally {
      setIsSavingSecurity(false)
    }
  }

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
            <Input
              id="store-name"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="store-description">Descrição</Label>
            <Textarea
              id="store-description"
              value={storeDescription}
              onChange={(e) => setStoreDescription(e.target.value)}
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="store-email">Email de Contato</Label>
            <Input
              id="store-email"
              type="email"
              value={storeEmail}
              onChange={(e) => setStoreEmail(e.target.value)}
            />
          </div>
          <Button onClick={handleSaveStoreSettings} disabled={isSavingStore}>
            {isSavingStore ? "Salvando..." : "Salvar Alterações"}
          </Button>
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
            <Input
              id="abacatepay-token"
              type="password"
              placeholder="••••••••••••••••"
              value={abacatepayToken}
              onChange={(e) => setAbacatepayToken(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <Input
              id="webhook-url"
              placeholder="https://seu-dominio.com/api/webhook"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
            />
          </div>
          <Button onClick={handleSavePaymentSettings} disabled={isSavingPayment}>
            {isSavingPayment ? "Salvando..." : "Salvar Configurações"}
          </Button>
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
          <div className="space-y-2">
            <Label htmlFor="support-email">Email de Suporte</Label>
            <Input
              id="support-email"
              type="email"
              value={supportEmail}
              onChange={(e) => setSupportEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notification-email">Email de Notificações</Label>
            <Input
              id="notification-email"
              type="email"
              value={notificationEmail}
              onChange={(e) => setNotificationEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="marketing-email">Email de Marketing</Label>
            <Input
              id="marketing-email"
              type="email"
              value={marketingEmail}
              onChange={(e) => setMarketingEmail(e.target.value)}
            />
          </div>
          <Button onClick={handleSaveEmailSettings} disabled={isSavingEmail}>
            {isSavingEmail ? "Salvando..." : "Salvar Configurações"}
          </Button>
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
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="two-factor-auth">Autenticação de Dois Fatores</Label>
              <p className="text-sm text-muted-foreground">
                Exija um código de verificação adicional para fazer login.
              </p>
            </div>
            <Switch
              id="two-factor-auth"
              checked={twoFactorAuth}
              onCheckedChange={setTwoFactorAuth}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="session-timeout">Tempo Limite da Sessão (minutos)</Label>
            <Input
              id="session-timeout"
              type="number"
              value={sessionTimeout}
              onChange={(e) => setSessionTimeout(Number(e.target.value))}
              min={5}
              max={120}
            />
          </div>
          <Button onClick={handleSaveSecuritySettings} disabled={isSavingSecurity}>
            {isSavingSecurity ? "Salvando..." : "Salvar Configurações"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
