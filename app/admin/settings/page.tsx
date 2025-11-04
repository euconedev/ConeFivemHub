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
  const [storeEmail, setStoreEmail] = useState("contato@conefivem.com")
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

  // Adicionado estado de carregamento global
  const [isLoadingSettings, setIsLoadingSettings] = useState(true)

  const loadDiscordClientMembers = async (guildId: string, botToken: string) => {
    setIsLoadingDiscordMembers(true)
    try {
      const members = await getDiscordClientMembers(guildId, "cliente", botToken)
      setDiscordClientMembers(members)
      toast({
        title: "Sucesso!",
        description: "Membros clientes do Discord atualizados com sucesso.",
      })
    } catch (error) {
      console.error("Error loading Discord client members:", error)
      toast({
        title: "Erro",
        description: "Falha ao carregar membros clientes do Discord.",
        variant: "destructive",
      })
    } finally {
      setIsLoadingDiscordMembers(false)
    }
  }

  // Consolidado useEffect para carregar todas as configurações
  useEffect(() => {
    const loadAllSettings = async () => {
      try {
        // Carregar configurações do Discord
        const discordSettings = await getDiscordSettings()
        if (discordSettings) {
          setDiscordClientId(discordSettings.discord_client_id)
          setDiscordClientSecret(discordSettings.discord_client_secret)
          setDiscordRedirectUri(discordSettings.discord_redirect_uri)
          setDiscordBotToken(discordSettings.discord_bot_token)
          setDiscordGuildId(discordSettings.discord_guild_id)
          setDiscordWebhookUrl(discordSettings.discord_webhook_url)

          if (discordSettings.discord_guild_id && discordSettings.discord_bot_token) {
            await loadDiscordClientMembers(discordSettings.discord_guild_id, discordSettings.discord_bot_token)
          }
        }

        // Carregar configurações de pagamento
        const paymentSettings = await getPaymentSettings()
        if (paymentSettings) {
          setAbacatepayToken(paymentSettings.abacatepay_token)
          setWebhookUrl(paymentSettings.webhook_url)
        }

        // Carregar configurações de e-mail
        const emailSettings = await getEmailSettings()
        if (emailSettings) {
          setEmailSender(emailSettings.email_sender)
          setEmailApiKey(emailSettings.email_api_key)
          setEmailHost(emailSettings.email_host)
          setEmailPort(emailSettings.email_port)
          setEmailUser(emailSettings.email_user)
          setEmailPass(emailSettings.email_pass)
        }

        // Carregar configurações de segurança
        const securitySettings = await getSecuritySettings()
        if (securitySettings) {
          setTwoFactorAuthEnabled(securitySettings.two_factor_auth_enabled)
          setSessionTimeout(securitySettings.session_timeout)
          setFailedLoginAttempts(securitySettings.failed_login_attempts)
          setLockoutTime(securitySettings.lockout_time)
        }
      } catch (error) {
        console.error("Error loading settings:", error)
        toast({
          title: "Erro",
          description: "Falha ao carregar configurações do sistema.",
          variant: "destructive",
        })
      } finally {
        setIsLoadingSettings(false)
      }
    }

    loadAllSettings()
  }, [])

  // Adicionado fallback de carregamento
  if (isLoadingSettings) {
    return <div className="flex items-center justify-center h-screen"><p className="text-xl font-medium">Carregando configurações...</p></div>
  }

  const handleSaveStoreSettings = async () => {
    setIsSavingStore(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    toast({
      title: "Sucesso!",
      description: "Configurações da loja salvas com sucesso.",
    })
    setIsSavingStore(false)
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
      } else throw new Error("Failed to save payment settings.")
    } catch (error) {
      console.error(error)
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
    try {
      const savedSettings = await saveEmailSettings({
        email_sender: emailSender,
        email_api_key: emailApiKey,
        email_host: emailHost,
        email_port: emailPort,
        email_user: emailUser,
        email_pass: emailPass,
      })

      if (savedSettings) {
        toast({
          title: "Sucesso!",
          description: "Configurações de e-mail salvas com sucesso.",
        })
      } else throw new Error("Failed to save email settings.")
    } catch (error) {
      console.error(error)
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
    try {
      const savedSettings = await saveSecuritySettings({
        two_factor_auth_enabled: twoFactorAuthEnabled,
        session_timeout: sessionTimeout,
        failed_login_attempts: failedLoginAttempts,
        lockout_time: lockoutTime,
      })

      if (savedSettings) {
        toast({
          title: "Sucesso!",
          description: "Configurações de segurança salvas com sucesso.",
        })
      } else throw new Error("Failed to save security settings.")
    } catch (error) {
      console.error(error)
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
      } else throw new Error("Failed to save Discord settings.")
    } catch (error) {
      console.error(error)
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
          <TabsTrigger value="discord-clients">
            <img src="/discord-icon.svg" alt="Discord Icon" className="mr-2 h-4 w-4" /> Clientes Discord
          </TabsTrigger>
        </TabsList>

        {/* Loja */}
        <TabsContent value="store" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações da Loja</CardTitle>
              <CardDescription>Gerencie as informações básicas da sua loja.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="storeName">Nome da Loja</Label>
                <Input id="storeName" value={storeName} onChange={(e) => setStoreName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="storeUrl">URL da Loja</Label>
                <Input id="storeUrl" value={storeUrl} onChange={(e) => setStoreUrl(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="storeDescription">Descrição da Loja</Label>
                <Textarea
                  id="storeDescription"
                  value={storeDescription}
                  onChange={(e) => setStoreDescription(e.target.value)}
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

        {/* Pagamento */}
        <TabsContent value="payment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Pagamento</CardTitle>
              <CardDescription>Gerencie suas integrações de pagamento.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="abacatepayToken">Token AbacatePay</Label>
                  <Input
                    id="abacatepayToken"
                    type="password"
                    placeholder="sk_live_xxxxxx"
                    value={abacatepayToken}
                    onChange={(e) => setAbacatepayToken(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="webhookUrl">Webhook URL</Label>
                  <Input
                    id="webhookUrl"
                    type="url"
                    placeholder="https://discord.com/api/webhooks/xxxxxx/xxxxxx"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button onClick={handleSavePaymentSettings} disabled={isSavingPayment}>
                {isSavingPayment ? "Salvando..." : "Salvar alterações"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Discord */}
        <TabsContent value="discord" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações do Discord</CardTitle>
              <CardDescription>Integre sua loja com o Discord.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="discordClientId">Client ID</Label>
                <Input id="discordClientId" value={discordClientId} onChange={(e) => setDiscordClientId(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discordClientSecret">Client Secret</Label>
                <Input
                  id="discordClientSecret"
                  type="password"
                  value={discordClientSecret}
                  onChange={(e) => setDiscordClientSecret(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discordRedirectUri">Redirect URI</Label>
                <Input id="discordRedirectUri" value={discordRedirectUri} onChange={(e) => setDiscordRedirectUri(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discordBotToken">Bot Token</Label>
                <Input
                  id="discordBotToken"
                  type="password"
                  value={discordBotToken}
                  onChange={(e) => setDiscordBotToken(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discordGuildId">Guild ID</Label>
                <Input id="discordGuildId" value={discordGuildId} onChange={(e) => setDiscordGuildId(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discordWebhookUrl">Webhook URL</Label>
                <Input
                  id="discordWebhookUrl"
                  value={discordWebhookUrl}
                  onChange={(e) => setDiscordWebhookUrl(e.target.value)}
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

        {/* Clientes Discord */}
        <TabsContent value="discord-clients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Clientes Discord</CardTitle>
              <CardDescription>Lista de membros do Discord com o cargo 'cliente'.</CardDescription>
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
                <div>Carregando membros...</div>
              ) : (
                <div className="space-y-4">
                  {discordClientMembers.length === 0 ? (
                    <p>Nenhum membro cliente do Discord encontrado.</p>
                  ) : (
                    <ul className="space-y-2">
                      {discordClientMembers.map((member) => (
                        <li key={member.user.id} className="flex items-center space-x-2">
                          {member.user.avatar && (
                            <img
                              src={`https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png`}
                              alt={member.user.username}
                              className="w-8 h-8 rounded-full"
                            />
                          )}
                          <span>{member.nick || member.user.username}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email */}
        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de E-mail</CardTitle>
              <CardDescription>Gerencie as configurações de envio de e-mail.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="emailSender">Remetente</Label>
                <Input id="emailSender" value={emailSender} onChange={(e) => setEmailSender(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emailApiKey">API Key</Label>
                <Input
                  id="emailApiKey"
                  type="password"
                  value={emailApiKey}
                  onChange={(e) => setEmailApiKey(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emailHost">Host SMTP</Label>
                <Input id="emailHost" value={emailHost} onChange={(e) => setEmailHost(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emailPort">Porta SMTP</Label>
                <Input id="emailPort" value={emailPort} onChange={(e) => setEmailPort(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emailUser">Usuário SMTP</Label>
                <Input id="emailUser" value={emailUser} onChange={(e) => setEmailUser(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emailPass">Senha SMTP</Label>
                <Input
                  id="emailPass"
                  type="password"
                  value={emailPass}
                  onChange={(e) => setEmailPass(e.target.value)}
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

        {/* Segurança */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Segurança</CardTitle>
              <CardDescription>Gerencie as configurações de segurança da sua loja.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="twoFactorAuthEnabled">Autenticação de Dois Fatores</Label>
                <Switch
                  id="twoFactorAuthEnabled"
                  checked={twoFactorAuthEnabled}
                  onCheckedChange={setTwoFactorAuthEnabled}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sessionTimeout">Tempo Limite da Sessão (minutos)</Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  value={sessionTimeout}
                  onChange={(e) => setSessionTimeout(Number(e.target.value))}'''
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="failedLoginAttempts">Tentativas de Login Falhas Permitidas</Label>
                <Input
                  id="failedLoginAttempts"
                  type="number"
                  value={failedLoginAttempts}
                  onChange={(e) => setFailedLoginAttempts(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lockoutTime">Tempo de Bloqueio (segundos)</Label>
                <Input
                  id="lockoutTime"
                  type="number"
                  value={lockoutTime}
                  onChange={(e) => setLockoutTime(Number(e.target.value))}
                />
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button onClick={handleSaveSecuritySettings} disabled={isSavingSecurity}>
                {isSavingSecurity ? "Salvando..." : "Salvar alterações"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
