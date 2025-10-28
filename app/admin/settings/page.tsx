"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
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

  // Discord Settings states
  const [discordClientId, setDiscordClientId] = useState("")
  const [discordClientSecret, setDiscordClientSecret] = useState("")
  const [discordRedirectUri, setDiscordRedirectUri] = useState("")
  const [discordBotToken, setDiscordBotToken] = useState("")
  const [discordGuildId, setDiscordGuildId] = useState("")
  const [discordWebhookUrl, setDiscordWebhookUrl] = useState("")
  const [isSavingDiscord, setIsSavingDiscord] = useState(false)

  // Email Settings states
  const [smtpHost, setSmtpHost] = useState("")
  const [smtpPort, setSmtpPort] = useState("")
  const [smtpUser, setSmtpUser] = useState("")
  const [smtpPassword, setSmtpPassword] = useState("")
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

  const handleSaveDiscordSettings = async () => {
    setIsSavingDiscord(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    try {
      console.log("Saving Discord Settings:", { discordClientId, discordClientSecret, discordRedirectUri, discordBotToken, discordGuildId, discordWebhookUrl })
      toast({
        title: "Sucesso!",
        description: "Configurações do Discord salvas com sucesso.",
      })
    } catch (error) {
      console.error("Error saving Discord settings:", error)
      toast({
        title: "Erro",
        description: "Falha ao salvar configurações do Discord.",
        variant: "destructive",
      })
    } finally {
      setIsSavingDiscord(false)
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
            <Input id="smtp-host" placeholder="smtp.exemplo.com" value={smtpHost} onChange={(e) => setSmtpHost(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="smtp-port">Porta</Label>
              <Input id="smtp-port" placeholder="587" value={smtpPort} onChange={(e) => setSmtpPort(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtp-user">Usuário</Label>
              <Input id="smtp-user" placeholder="usuario@exemplo.com" value={smtpUser} onChange={(e) => setSmtpUser(e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="smtp-password">Senha</Label>
            <Input id="smtp-password" type="password" placeholder="••••••••" value={smtpPassword} onChange={(e) => setSmtpPassword(e.target.value)} />
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

      {/* Discord Settings */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <img src="/discord-icon.svg" alt="Discord" className="h-5 w-5" />
            Configurações do Discord
          </CardTitle>
          <CardDescription>Integração com o Discord para notificações e autenticação</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="discord-client-id">Client ID</Label>
            <Input
              id="discord-client-id"
              placeholder="Seu Client ID do Discord"
              value={discordClientId}
              onChange={(e) => setDiscordClientId(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="discord-client-secret">Client Secret</Label>
            <Input
              id="discord-client-secret"
              type="password"
              placeholder="Seu Client Secret do Discord"
              value={discordClientSecret}
              onChange={(e) => setDiscordClientSecret(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="discord-redirect-uri">Redirect URI</Label>
            <Input
              id="discord-redirect-uri"
              placeholder="Sua Redirect URI do Discord"
              value={discordRedirectUri}
              onChange={(e) => setDiscordRedirectUri(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="discord-bot-token">Bot Token</Label>
            <Input
              id="discord-bot-token"
              type="password"
              placeholder="Seu Bot Token do Discord"
              value={discordBotToken}
              onChange={(e) => setDiscordBotToken(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="discord-guild-id">Guild ID (ID do Servidor)</Label>
            <Input
              id="discord-guild-id"
              placeholder="ID do seu servidor Discord"
              value={discordGuildId}
              onChange={(e) => setDiscordGuildId(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="discord-webhook-url">Webhook URL</Label>
            <Input
              id="discord-webhook-url"
              placeholder="URL do Webhook para notificações"
              value={discordWebhookUrl}
              onChange={(e) => setDiscordWebhookUrl(e.target.value)}
            />
          </div>
          <Button onClick={handleSaveDiscordSettings} disabled={isSavingDiscord}>
            {isSavingDiscord ? "Salvando..." : "Salvar Configurações"}
          </Button>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Configurações de Segurança
          </CardTitle>
          <CardDescription>Gerencie as opções de segurança da sua conta</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="two-factor-auth">Autenticação de Dois Fatores</Label>
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
              onChange={(e) => setSessionTimeout(parseInt(e.target.value))}
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
