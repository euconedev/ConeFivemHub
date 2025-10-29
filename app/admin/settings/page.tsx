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
import { getDiscordSettings, saveDiscordSettings, getPaymentSettings, savePaymentSettings } from "@/lib/supabase-storage"

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

  // Load settings on component mount
  useEffect(() => {
    const loadDiscordSettings = async () => {
      const settings = await getDiscordSettings()
      if (settings) {
        setDiscordClientId(settings.discord_client_id)
        setDiscordClientSecret(settings.discord_client_secret)
        setDiscordRedirectUri(settings.discord_redirect_uri)
        setDiscordBotToken(settings.discord_bot_token)
        setDiscordGuildId(settings.discord_guild_id)
        setDiscordWebhookUrl(settings.discord_webhook_url)
      }
    }

    const loadPaymentSettings = async () => {
      const settings = await getPaymentSettings()
      if (settings) {
        setAbacatepayToken(settings.abacatepay_token)
        setWebhookUrl(settings.webhook_url)
      }
    }

    loadDiscordSettings()
    loadPaymentSettings()
  }, [])

  const handleSaveStoreSettings = async () => {
    setIsSavingStore(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    try {
      // console.log("Saving Store Settings:", { storeName, storeDescription, storeEmail })
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
    try {
      const savedSettings = await savePaymentSettings({
        abacatepay_token: abacatepayToken,
        webhook_url: webhookUrl,
      })

      if (savedSettings) {
        toast({
          title: "Sucesso!",
          description: "Configurações de pagamento salvas com sucesso.",
        })
      } else {
        throw new Error("Failed to save payment settings.")
      }
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
      // console.log("Saving Email Settings:", { emailSender, emailApiKey })
      toast({
        title: "Sucesso!",
        description: "Configurações de e-mail salvas com sucesso.",
      })
    } catch (error) {
      console.error("Error saving email settings:", error)
      toast({
        title: "Erro",
        description: "Falha ao salvar configurações de e-mail.",
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
      // console.log("Saving Security Settings:", { twoFactorAuthEnabled })
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

  const handleSaveDiscordSettings = async () => {
    setIsSavingDiscord(true)
    try {
      const savedSettings = await saveDiscordSettings({
        discord_client_id: discordClientId,
        discord_client_secret: discordClientSecret,
        discord_redirect_uri: discordRedirectUri,
        discord_bot_token: discordBotToken,
        discord_guild_id: discordGuildId,
        discord_webhook_url: discordWebhookUrl,
      })

      if (savedSettings) {
        toast({
          title: "Sucesso!",
          description: "Configurações do Discord salvas com sucesso.",
        })
      } else {
        throw new Error("Failed to save Discord settings.")
      }
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

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Configurações</h2>
      </div>
      <Tabs defaultValue="store" className="space-y-4">
        <TabsList>
          <TabsTrigger value="store">
            <Store className="mr-2 h-4 w-4" /> Loja
          </TabsTrigger>
          <TabsTrigger value="payment">
            <CreditCard className="mr-2 h-4 w-4" /> Pagamento
          </TabsTrigger>
          <TabsTrigger value="email">
            <Mail className="mr-2 h-4 w-4" /> E-mail
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="mr-2 h-4 w-4" /> Segurança
          </TabsTrigger>
          <TabsTrigger value="discord">
            <img src="/discord-icon.svg" alt="Discord Icon" className="mr-2 h-4 w-4" /> Discord
          </TabsTrigger>
        </TabsList>
        <TabsContent value="store" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações da Loja</CardTitle>
              <CardDescription>Gerencie as informações básicas da sua loja.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="storeName">Nome da Loja</Label>
                <Input
                  id="storeName"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  placeholder="Minha Loja Inc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="storeUrl">URL da Loja</Label>
                <Input
                  id="storeUrl"
                  value={storeUrl}
                  onChange={(e) => setStoreUrl(e.target.value)}
                  placeholder="https://minhaloja.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="storeDescription">Descrição da Loja</Label>
                <Textarea
                  id="storeDescription"
                  value={storeDescription}
                  onChange={(e) => setStoreDescription(e.target.value)}
                  placeholder="Uma breve descrição da sua loja."
                />
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button onClick={handleSaveStoreSettings} disabled={isSavingStore}>
                {isSavingStore ? "Salvando..." : "Salvar alterações"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="payment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Pagamento</CardTitle>
              <CardDescription>Configure seus métodos de pagamento.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="abacatepayToken">AbacatePay Token</Label>
                <Input
                  id="abacatepayToken"
                  type="password"
                  value={abacatepayToken}
                  onChange={(e) => setAbacatepayToken(e.target.value)}
                  placeholder="Seu token AbacatePay"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="webhookUrl">URL do Webhook</Label>
                <Input
                  id="webhookUrl"
                  type="url"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  placeholder="https://seusite.com/webhook"
                />
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button onClick={handleSavePaymentSettings} disabled={isSavingPayment}>
                {isSavingPayment ? "Salvando..." : "Salvar alterações"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de E-mail</CardTitle>
              <CardDescription>Gerencie as configurações de envio de e-mail.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="emailSender">Remetente de E-mail</Label>
                <Input
                  id="emailSender"
                  value={emailSender}
                  onChange={(e) => setEmailSender(e.target.value)}
                  placeholder="noreply@minhaloja.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emailApiKey">Chave de API de E-mail</Label>
                <Input
                  id="emailApiKey"
                  type="password"
                  value={emailApiKey}
                  onChange={(e) => setEmailApiKey(e.target.value)}
                  placeholder="••••••••••••••••••"
                />
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button onClick={handleSaveEmailSettings} disabled={isSavingEmail}>
                {isSavingEmail ? "Salvando..." : "Salvar alterações"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Segurança</CardTitle>
              <CardDescription>Gerencie as configurações de segurança da sua conta.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="twoFactorAuthEnabled"
                  checked={twoFactorAuthEnabled}
                  onCheckedChange={setTwoFactorAuthEnabled}
                />
                <Label htmlFor="twoFactorAuthEnabled">Autenticação de dois fatores</Label>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button onClick={handleSaveSecuritySettings} disabled={isSavingSecurity}>
                {isSavingSecurity ? "Salvando..." : "Salvar alterações"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="discord" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações do Discord</CardTitle>
              <CardDescription>Integre sua loja com o Discord.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="discordClientId">Client ID</Label>
                <Input
                  id="discordClientId"
                  value={discordClientId}
                  onChange={(e) => setDiscordClientId(e.target.value)}
                  placeholder="Seu Client ID do Discord"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discordClientSecret">Client Secret</Label>
                <Input
                  id="discordClientSecret"
                  type="password"
                  value={discordClientSecret}
                  onChange={(e) => setDiscordClientSecret(e.target.value)}
                  placeholder="Seu Client Secret do Discord"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discordRedirectUri">Redirect URI</Label>
                <Input
                  id="discordRedirectUri"
                  value={discordRedirectUri}
                  onChange={(e) => setDiscordRedirectUri(e.target.value)}
                  placeholder="Sua Redirect URI do Discord"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discordBotToken">Bot Token</Label>
                <Input
                  id="discordBotToken"
                  type="password"
                  value={discordBotToken}
                  onChange={(e) => setDiscordBotToken(e.target.value)}
                  placeholder="Seu Bot Token do Discord"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discordGuildId">Guild ID</Label>
                <Input
                  id="discordGuildId"
                  value={discordGuildId}
                  onChange={(e) => setDiscordGuildId(e.target.value)}
                  placeholder="Seu Guild ID do Discord"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discordWebhookUrl">Webhook URL</Label>
                <Input
                  id="discordWebhookUrl"
                  value={discordWebhookUrl}
                  onChange={(e) => setDiscordWebhookUrl(e.target.value)}
                  placeholder="Sua Webhook URL do Discord"
                />
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button onClick={handleSaveDiscordSettings} disabled={isSavingDiscord}>
                {isSavingDiscord ? "Salvando..." : "Salvar alterações"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
