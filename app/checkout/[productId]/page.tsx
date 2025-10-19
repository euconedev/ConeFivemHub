"use client"

import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Loader2, Copy, CheckCircle2, Clock, AlertCircle } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { getProducts } from "@/lib/storage"
import { useToast } from "@/hooks/use-toast"

interface PaymentData {
  id: string
  pixId: string
  qrCode: string
  copyPaste: string
  amount: number
  expiresAt: string
  status: string
}

export default function CheckoutPage({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = use(params)
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()

  const [product, setProduct] = useState<any>(null)
  const [payment, setPayment] = useState<PaymentData | null>(null)
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(false)
  const [copied, setCopied] = useState(false)
  const [timeLeft, setTimeLeft] = useState<string>("")

  useEffect(() => {
    if (!user) {
      router.push(`/login?redirect=/checkout/${productId}`)
      return
    }

    const products = getProducts()
    const foundProduct = products.find((p) => p.id === productId)
    if (foundProduct) {
      setProduct(foundProduct)
    }
  }, [user, productId, router])

  useEffect(() => {
    if (payment?.expiresAt) {
      const interval = setInterval(() => {
        const now = new Date().getTime()
        const expiry = new Date(payment.expiresAt).getTime()
        const diff = expiry - now

        if (diff <= 0) {
          setTimeLeft("Expirado")
          clearInterval(interval)
        } else {
          const minutes = Math.floor(diff / 60000)
          const seconds = Math.floor((diff % 60000) / 1000)
          setTimeLeft(`${minutes}:${seconds.toString().padStart(2, "0")}`)
        }
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [payment?.expiresAt])

  const createPayment = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/payments/create-pix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erro ao criar pagamento")
      }

      setPayment(data.payment)

      // Iniciar verificação automática
      startStatusCheck(data.payment.pixId)
    } catch (error) {
      console.error("Error creating payment:", error)
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Erro ao criar pagamento",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const startStatusCheck = (pixId: string) => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/payments/check-status?pixId=${pixId}`)
        const data = await response.json()

        if (data.status === "PAID") {
          clearInterval(interval)
          toast({
            title: "Pagamento confirmado!",
            description: "Sua licença foi gerada com sucesso.",
          })
          setTimeout(() => {
            router.push("/dashboard/licenses")
          }, 2000)
        }
      } catch (error) {
        console.error("Error checking status:", error)
      }
    }, 5000) // Verificar a cada 5 segundos

    // Limpar após 1 hora
    setTimeout(() => clearInterval(interval), 3600000)
  }

  const copyToClipboard = async () => {
    if (payment?.copyPaste) {
      await navigator.clipboard.writeText(payment.copyPaste)
      setCopied(true)
      toast({
        title: "Copiado!",
        description: "Código PIX copiado para a área de transferência",
      })
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const checkStatus = async () => {
    if (!payment?.pixId) return

    setChecking(true)
    try {
      const response = await fetch(`/api/payments/check-status?pixId=${payment.pixId}`)
      const data = await response.json()

      if (data.status === "PAID") {
        toast({
          title: "Pagamento confirmado!",
          description: "Redirecionando para suas licenças...",
        })
        setTimeout(() => {
          router.push("/dashboard/licenses")
        }, 2000)
      } else {
        toast({
          title: "Aguardando pagamento",
          description: "O pagamento ainda não foi confirmado.",
        })
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao verificar status do pagamento",
        variant: "destructive",
      })
    } finally {
      setChecking(false)
    }
  }

  if (!user || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Finalizar Compra</h1>
            <p className="text-muted-foreground">Complete o pagamento via PIX para receber sua licença</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Resumo do Produto */}
            <Card>
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-20 h-20 rounded object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.description}</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>R$ {product.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-primary">R$ {product.price.toFixed(2)}</span>
                  </div>
                </div>

                {!payment && (
                  <Button onClick={createPayment} disabled={loading} className="w-full" size="lg">
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Gerando PIX...
                      </>
                    ) : (
                      "Gerar PIX"
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* QR Code PIX */}
            {payment && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Pagamento PIX
                  </CardTitle>
                  <CardDescription>Escaneie o QR Code ou copie o código</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Timer */}
                  <div className="flex items-center justify-center gap-2 p-3 bg-muted rounded-lg">
                    <Clock className="h-4 w-4" />
                    <span className="font-mono font-semibold">{timeLeft}</span>
                  </div>

                  {/* QR Code */}
                  <div className="flex justify-center p-4 bg-white rounded-lg">
                    <img src={payment.qrCode || "/placeholder.svg"} alt="QR Code PIX" className="w-64 h-64" />
                  </div>

                  {/* Código Copia e Cola */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Código PIX (Copia e Cola)</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={payment.copyPaste}
                        readOnly
                        className="flex-1 px-3 py-2 text-sm border rounded-md bg-muted font-mono"
                      />
                      <Button onClick={copyToClipboard} variant="outline" size="icon">
                        {copied ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  {/* Verificar Status */}
                  <Button onClick={checkStatus} disabled={checking} variant="outline" className="w-full bg-transparent">
                    {checking ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verificando...
                      </>
                    ) : (
                      "Verificar Pagamento"
                    )}
                  </Button>

                  {/* Instruções */}
                  <div className="p-4 bg-muted rounded-lg space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium">Como pagar:</p>
                        <ol className="list-decimal list-inside space-y-1 text-muted-foreground mt-1">
                          <li>Abra o app do seu banco</li>
                          <li>Escolha pagar com PIX</li>
                          <li>Escaneie o QR Code ou cole o código</li>
                          <li>Confirme o pagamento</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
