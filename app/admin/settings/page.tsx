'use client';

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Store, CreditCard, Mail, Shield } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import {
  getDiscordSettings,
  saveDiscordSettings,
  getPaymentSettings,
  savePaymentSettings,
  getEmailSettings,
  saveEmailSettings,
  getSecuritySettings,
  saveSecuritySettings,
} from "@/lib/supabase-storage"
import { getDiscordClientMembers, DiscordGuildMember } from "@/lib/discord-api"

export default function AdminSettingsPage() {
  const { toast } = useToast()

  // Store Settings
  const [storeName, setStoreName] = useState("ConeFiveM Hub")
  const [storeUrl, setStoreUrl] = useState("https://conefivem.com")
  const [storeDescription, setStoreDescription] = useState(
    "Marketplace de scripts e assets digitais para servidores FiveM"
  )
  const [isSavingStore, setIsSavingStore] = useState(false)

  // Payment Settings
  const [abacatepayToken, setAbacatepayToken] = useState("")
  const [webhookUrl, setWebhookUrl] = useState("")
  const [isSavingPayment, setIsSavingPayment] = useState(false)

  // Discord Settings
  const [discordClientId, setDiscordClientId] = useState("")
  const [discordClientSecret, setDiscordClientSecret] = useState("")
  const [discordRedirectUri, setDiscordRedirectUri] = useState("")
  const [discordBotToken, setDiscordBotToken] = useState("")
  const [discordGuildId, setDiscordGuildId] = useState("")
  const [discordWebhookUrl, setDiscordWebhookUrl] = useState("")
  const [isSavingDiscord, setIsSavingDiscord] = useState(false)
  const [discordClientMembers, setDiscordClientMembers] = useState<DiscordGuildMember[]>([])
  const [isLoadingDiscordMembers, setIsLoadingDiscordMembers] = useState(false)

  // Email Settings
  const [emailSender, setEmailSender] = useState("")
  const [emailApiKey, setEmailApiKey] = useState("")
  const [emailHost, setEmailHost] = useState("")
  const [emailPort, setEmailPort] = useState("")
  const [emailUser, setEmailUser] = useState("")
  const [emailPass, setEmailPass] = useState("")
  const [isSavingEmail, setIsSavingEmail] = useState(false)

  // Security Settings
  const [twoFactorAuthEnabled, setTwoFactorAuthEnabled] = useState(false)
  const [sessionTimeout, setSessionTimeout] = useState(30)
  const [failedLoginAttempts, setFailedLoginAttempts] = useState(5)
  const [lockoutTime, setLockoutTime] = useState(300)
  const [isSavingSecurity, setIsSavingSecurity] = useState(false)

  const [isLoadingSettings, setIsLoadingSettings] = useState(true)

  const loadDiscordClientMembers = async (guildId: any, botToken: any) => {
  // === CONVERTE PARA STRING E VALIDA ===
  const guildIdStr = String(guildId ?? '').trim()
  const botTokenStr = String(botToken ?? '').trim()

  if (!guildIdStr || !botTokenStr) {
    toast({ 
      title: "Erro", 
      description: "Guild ID e Bot Token são obrigatórios.", 
      variant: "destructive" 
    })
    return
  }

  if (guildIdStr.startsWith('YOUR_') || botTokenStr.startsWith('YOUR_')) {
    toast({ 
      title: "Erro", 
      description: "Configure valores reais no Discord.", 
      variant: "destructive" 
    })
    return
  }

  setIsLoadingDiscordMembers(true)
  try {
    const members = await getDiscordClientMembers(guildIdStr, "cliente", botTokenStr)
    setDiscordClientMembers(members)
    toast({
      title: "Sucesso!",
      description: `${members.length} cliente(s) encontrado(s).`,
    })
  } catch (error: any) {
    console.error("Erro ao carregar membros:", error)
    const message = error.message.includes('403')
      ? "Bot sem permissão. Reinvite com 'View Members'."
      : error.message.includes('Role')
      ? "Cargo 'cliente' não encontrado."
      : "Falha ao conectar ao Discord."

    toast({ title: "Erro", description: message, variant: "destructive" })
  } finally {
    setIsLoadingDiscordMembers(false)
  }
}

  // === CARREGA TODAS AS CONFIGURAÇÕES ===
useEffect(() => {
  const loadAllSettings = async () => {
    try {
      setIsLoadingSettings(true)

      const discordSettings = await getDiscordSettings()
      if (discordSettings) {
        setDiscordClientId(discordSettings.discord_client_id ?? "")
        setDiscordClientSecret(discordSettings.discord_client_secret ?? "")
        setDiscordRedirectUri(discordSettings.discord_redirect_uri ?? "")
        setDiscordBotToken(discordSettings.discord_bot_token ?? "")
        setDiscordGuildId(discordSettings.discord_guild_id ?? "")
        setDiscordWebhookUrl(discordSettings.discord_webhook_url ?? "")

// === CARREGA MEMBROS COM VALIDAÇÃO ===
        const guildId = String(discordSettings.discord_guild_id ?? '').trim()
        const botToken = String(discordSettings.discord_bot_token ?? '').trim()
        if (guildId && botToken && !guildId.startsWith('YOUR_') && !botToken.startsWith('YOUR_')) {
          await loadDiscordClientMembers(guildId, botToken)
        }
      }

        // === PAGAMENTO ===
        const paymentSettings = await getPaymentSettings()
        if (paymentSettings) {
          setAbacatepayToken(paymentSettings.abacatepay_token ?? "")
          setWebhookUrl(paymentSettings.webhook_url ?? "")
        }

        // === EMAIL ===
        const emailSettings = await getEmailSettings()
        if (emailSettings) {
          setEmailSender(emailSettings.email_sender ?? "")
          setEmailApiKey(emailSettings.email_api_key ?? "")
          setEmailHost(emailSettings.email_host ?? "")
          setEmailPort(String(emailSettings.email_port ?? 587))
          setEmailUser(emailSettings.email_user ?? "")
          setEmailPass(emailSettings.email_pass ?? "")
        }

        // === SEGURANÇA ===
        const securitySettings = await getSecuritySettings()
        if (securitySettings) {
          setTwoFactorAuthEnabled(!!securitySettings.two_factor_auth_enabled)
          setSessionTimeout(Number(securitySettings.session_timeout) || 30)
          setFailedLoginAttempts(Number(securitySettings.failed_login_attempts) || 5)
          setLockoutTime(Number(securitySettings.lockout_time) || 300)
        }
      } catch (error) {
      console.error("Erro ao carregar configurações:", error)
      toast({ title: "Erro", description: "Falha ao carregar configurações.", variant: "destructive" })
    } finally {
      setIsLoadingSettings(false)
    }
  }

  loadAllSettings()
}, [toast])

  // === SALVAR LOJA (simulado) ===
  const handleSaveStoreSettings = async () => {
    setIsSavingStore(true)
    await new Promise(resolve => setTimeout(resolve, 800))
    toast({ title: "Sucesso!", description: "Configurações da loja salvas." })
    setIsSavingStore(false)
  }

  // === SALVAR PAGAMENTO ===
  const handleSavePaymentSettings = async () => {
    setIsSavingPayment(true)
    try {
      const saved = await savePaymentSettings({
        abacatepay_token: abacatepayToken,
        webhook_url: webhookUrl,
      })
      if (saved) toast({ title: "Sucesso!", description: "Pagamento salvo." })
      else throw new Error()
    } catch (error) {
      toast({ title: "Erro", description: "Falha ao salvar pagamento.", variant: "destructive" })
    } finally {
      setIsSavingPayment(false)
    }
  }

  // === SALVAR EMAIL ===
  const handleSaveEmailSettings = async () => {
    setIsSavingEmail(true)
    try {
      const saved = await saveEmailSettings({
        email_sender: emailSender,
        email_api_key: emailApiKey,
        email_host: emailHost,
        email_port: Number(emailPort) || 587,
        email_user: emailUser,
        email_pass: emailPass,
      })
      if (saved) toast({ title: "Sucesso!", description: "E-mail salvo." })
      else throw new Error()
    } catch (error) {
      toast({ title: "Erro", description: "Falha ao salvar e-mail.", variant: "destructive" })
    } finally {
      setIsSavingEmail(false)
    }
  }

  // === SALVAR SEGURANÇA ===
  const handleSaveSecuritySettings = async () => {
    setIsSavingSecurity(true)
    try {
      const saved = await saveSecuritySettings({
        two_factor_auth_enabled: twoFactorAuthEnabled,
        session_timeout: sessionTimeout,
        failed_login_attempts: failedLoginAttempts,
        lockout_time: lockoutTime,
      })
      if (saved) toast({ title: "Sucesso!", description: "Segurança salva." })
      else throw new Error()
    } catch (error) {
      toast({ title: "Erro", description: "Falha ao salvar segurança.", variant: "destructive" })
    } finally {
      setIsSavingSecurity(false)
    }
  }

  // === SALVAR DISCORD + RECARREGAR MEMBROS ===
  const handleSaveDiscordSettings = async () => {
    setIsSavingDiscord(true)
    try {
      const saved = await saveDiscordSettings({
        discord_client_id: discordClientId,
        discord_client_secret: discordClientSecret,
        discord_redirect_uri: discordRedirectUri,
        discord_bot_token: discordBotToken,
        discord_guild_id: discordGuildId,
        discord_webhook_url: discordWebhookUrl,
      })

      if (saved) {
        toast({ title: "Sucesso!", description: "Configurações do Discord salvas." })
        // Recarrega membros automaticamente
        if (discordGuildId && discordBotToken) {
          await loadDiscordClientMembers(discordGuildId, discordBotToken)
        }
      } else {
        throw new Error()
      }
    } catch (error) {
      toast({ title: "Erro", description: "Falha ao salvar Discord.", variant: "destructive" })
    } finally {
      setIsSavingDiscord(false)
    }
  }

  if (isLoadingSettings) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-medium">Carregando configurações...</p>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Configurações</h2>
      </div>

      <Tabs defaultValue="store" className="space-y-4">
        <TabsList>
          <TabsTrigger value="store"><Store className="mr-2 h-4 w-4" /> Loja</TabsTrigger>
          <TabsTrigger value="payment"><CreditCard className="mr-2 h-4 w-4" /> Pagamento</TabsTrigger>
          <TabsTrigger value="email"><Mail className="mr-2 h-4 w-4" /> E-mail</TabsTrigger>
          <TabsTrigger value="security"><Shield className="mr-2 h-4 w-4" /> Segurança</TabsTrigger>
          <TabsTrigger value="discord"><img src="/discord-icon.svg" alt="Discord" className="mr-2 h-4 w-4" /> Discord</TabsTrigger>
          <TabsTrigger value="discord-clients"><img src="/discord-icon.svg" alt="Clientes" className="mr-2 h-4 w-4" /> Clientes</TabsTrigger>
        </TabsList>

        {/* === LOJA === */}
        <TabsContent value="store" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações da Loja</CardTitle>
              <CardDescription>Informações básicas da loja.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="storeName">Nome</Label>
                <Input id="storeName" value={storeName} onChange={e => setStoreName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="storeUrl">URL</Label>
                <Input id="storeUrl" value={storeUrl} onChange={e => setStoreUrl(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="storeDescription">Descrição</Label>
                <Textarea id="storeDescription" value={storeDescription} onChange={e => setStoreDescription(e.target.value)} />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveStoreSettings} disabled={isSavingStore}>
                {isSavingStore ? "Salvando..." : "Salvar"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* === PAGAMENTO === */}
        <TabsContent value="payment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pagamento</CardTitle>
              <CardDescription>Integração com AbacatePay.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="abacatepayToken">Token</Label>
                <Input id="abacatepayToken" type="password" value={abacatepayToken} onChange={e => setAbacatepayToken(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="webhookUrl">Webhook URL</Label>
                <Input id="webhookUrl" value={webhookUrl} onChange={e => setWebhookUrl(e.target.value)} />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSavePaymentSettings} disabled={isSavingPayment}>
                {isSavingPayment ? "Salvando..." : "Salvar"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* === E-MAIL === */}
        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>E-mail</CardTitle>
              <CardDescription>Configurações SMTP.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="emailSender">Remetente</Label>
                <Input id="emailSender" value={emailSender} onChange={e => setEmailSender(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emailApiKey">API Key</Label>
                <Input id="emailApiKey" type="password" value={emailApiKey} onChange={e => setEmailApiKey(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emailHost">Host</Label>
                <Input id="emailHost" value={emailHost} onChange={e => setEmailHost(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emailPort">Porta</Label>
                <Input id="emailPort" type="number" value={emailPort} onChange={e => setEmailPort(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emailUser">Usuário</Label>
                <Input id="emailUser" value={emailUser} onChange={e => setEmailUser(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emailPass">Senha</Label>
                <Input id="emailPass" type="password" value={emailPass} onChange={e => setEmailPass(e.target.value)} />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveEmailSettings} disabled={isSavingEmail}>
                {isSavingEmail ? "Salvando..." : "Salvar"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* === SEGURANÇA === */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Segurança</CardTitle>
              <CardDescription>Controle de acesso e sessões.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="twoFactorAuthEnabled">2FA</Label>
                <Switch id="twoFactorAuthEnabled" checked={twoFactorAuthEnabled} onCheckedChange={setTwoFactorAuthEnabled} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sessionTimeout">Sessão (min)</Label>
                <Input id="sessionTimeout" type="number" value={sessionTimeout} onChange={e => setSessionTimeout(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="failedLoginAttempts">Tentativas</Label>
                <Input id="failedLoginAttempts" type="number" value={failedLoginAttempts} onChange={e => setFailedLoginAttempts(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lockoutTime">Bloqueio (s)</Label>
                <Input id="lockoutTime" type="number" value={lockoutTime} onChange={e => setLockoutTime(Number(e.target.value))} />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSecuritySettings} disabled={isSavingSecurity}>
                {isSavingSecurity ? "Salvando..." : "Salvar"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* === DISCORD === */}
        <TabsContent value="discord" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Discord</CardTitle>
              <CardDescription>Integração com bot e OAuth.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="discordClientId">Client ID</Label>
                <Input id="discordClientId" value={discordClientId} onChange={e => setDiscordClientId(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discordClientSecret">Client Secret</Label>
                <Input id="discordClientSecret" type="password" value={discordClientSecret} onChange={e => setDiscordClientSecret(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discordRedirectUri">Redirect URI</Label>
                <Input id="discordRedirectUri" value={discordRedirectUri} onChange={e => setDiscordRedirectUri(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discordBotToken">Bot Token</Label>
                <Input id="discordBotToken" type="password" value={discordBotToken} onChange={e => setDiscordBotToken(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discordGuildId">Guild ID</Label>
                <Input id="discordGuildId" value={discordGuildId} onChange={e => setDiscordGuildId(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discordWebhookUrl">Webhook URL</Label>
                <Input id="discordWebhookUrl" value={discordWebhookUrl} onChange={e => setDiscordWebhookUrl(e.target.value)} />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveDiscordSettings} disabled={isSavingDiscord}>
                {isSavingDiscord ? "Salvando..." : "Salvar"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* === CLIENTES DISCORD === */}
        <TabsContent value="discord-clients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Clientes no Discord</CardTitle>
              <CardDescription>Membros com cargo "cliente".</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-end mb-4">
             <Button
  onClick={() => loadDiscordClientMembers(discordGuildId, discordBotToken)}
  disabled={isLoadingDiscordMembers || !discordGuildId || !discordBotToken}
>
  {isLoadingDiscordMembers ? "Atualizando..." : "Atualizar Membros"}
</Button>
              </div>

              {isLoadingDiscordMembers ? (
                <div className="flex justify-center py-8">
                  <p className="text-muted-foreground">Carregando membros...</p>
                </div>
              ) : discordClientMembers.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Nenhum cliente encontrado. Verifique o cargo "cliente" no servidor.
                </p>
              ) : (
                <ul className="space-y-3 max-h-96 overflow-y-auto">
                  {discordClientMembers.map(member => (
                    <li key={member.user.id} className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                      {member.user.avatar ? (
                        <img
                          src={`https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png?size=64`}
                          alt={member.user.username}
                          className="w-10 h-10 rounded-full"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white text-xs">
                          {member.user.username[0].toUpperCase()}
                        </div>
                      )}
                      <div>
                        <p className="font-medium">{member.nick || member.user.username}</p>
                        <p className="text-xs text-muted-foreground">#{member.user.discriminator}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
