import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"
import { getAbacatePayClient, brlToCents } from "@/lib/abacate-pay"
import { checkRateLimit, RATE_LIMITS } from "@/lib/security/rate-limit"
import { logAudit, getClientIP, getUserAgent } from "@/lib/security/audit-log"
import { validateUUID, amountSchema } from "@/lib/security/validation"

export async function POST(request: NextRequest) {
  const ipAddress = getClientIP(request)
  const userAgent = getUserAgent(request)

  try {
    const rateLimit = checkRateLimit(`payment:${ipAddress}`, RATE_LIMITS.PAYMENT_CREATE)
    if (!rateLimit.allowed) {
      await logAudit({
        action: "security.rate_limit_exceeded",
        ipAddress,
        userAgent,
        metadata: { endpoint: "/api/payments/create-pix" },
        severity: "warning",
      })

      return NextResponse.json(
        { error: "Muitas requisições. Tente novamente em alguns minutos." },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": RATE_LIMITS.PAYMENT_CREATE.maxRequests.toString(),
            "X-RateLimit-Remaining": rateLimit.remaining.toString(),
            "X-RateLimit-Reset": new Date(rateLimit.resetAt).toISOString(),
          },
        },
      )
    }

    const supabase = await createServerClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      await logAudit({
        action: "security.unauthorized_access",
        ipAddress,
        userAgent,
        metadata: { endpoint: "/api/payments/create-pix" },
        severity: "warning",
      })
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 })
    }

    const body = await request.json()
    const { productId } = body

    if (!productId || !validateUUID(productId)) {
      return NextResponse.json({ error: "Product ID inválido" }, { status: 400 })
    }

    // Buscar produto
    const { data: product, error: productError } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .single()

    if (productError || !product) {
      return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 })
    }

    try {
      amountSchema.parse(product.price)
    } catch {
      return NextResponse.json({ error: "Valor do produto inválido" }, { status: 400 })
    }

    // Buscar perfil do usuário
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single()

    if (profileError || !profile) {
      return NextResponse.json({ error: "Perfil do usuário não encontrado" }, { status: 404 })
    }

    // Criar PIX QR Code via Abacate Pay
    const abacatePay = getAbacatePayClient()
    const pixResponse = await abacatePay.createPixQRCode({
      amount: brlToCents(product.price),
      expiresIn: 3600,
      description: `${product.name} - ConeFiveM Hub`,
      customer: {
        name: profile.full_name || profile.email,
        email: profile.email,
      },
      metadata: {
        externalId: productId,
        userId: user.id,
        productName: product.name,
      },
    })

    if (pixResponse.error || !pixResponse.data) {
      console.error("[AbacatePay] Error creating PIX:", pixResponse.error)

      await logAudit({
        action: "payment.failed",
        userId: user.id,
        ipAddress,
        userAgent,
        metadata: { productId, error: pixResponse.error },
        severity: "error",
      })

      return NextResponse.json({ error: "Erro ao criar pagamento PIX" }, { status: 500 })
    }

    const pixData = pixResponse.data

    // Criar registro de compra no banco
    const { data: purchase, error: purchaseError } = await supabase
      .from("purchases")
      .insert({
        user_id: user.id,
        product_id: productId,
        amount: product.price,
        status: "pending",
        payment_method: "pix",
        transaction_id: pixData.id,
        ip_address: ipAddress,
      })
      .select()
      .single()

    if (purchaseError) {
      console.error("[Supabase] Error creating purchase:", purchaseError)
      return NextResponse.json({ error: "Erro ao registrar compra" }, { status: 500 })
    }

    await logAudit({
      action: "payment.created",
      userId: user.id,
      ipAddress,
      userAgent,
      metadata: {
        purchaseId: purchase.id,
        productId,
        amount: product.price,
        pixId: pixData.id,
      },
      severity: "info",
    })

    // Retornar dados do pagamento
    return NextResponse.json({
      success: true,
      payment: {
        id: purchase.id,
        pixId: pixData.id,
        qrCode: pixData.brCodeBase64,
        copyPaste: pixData.brCode,
        amount: product.price,
        expiresAt: pixData.expiresAt,
        status: pixData.status,
      },
    })
  } catch (error) {
    console.error("[API] Error in create-pix:", error)

    await logAudit({
      action: "payment.failed",
      ipAddress,
      userAgent,
      metadata: { error: error instanceof Error ? error.message : "Unknown error" },
      severity: "critical",
    })

    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
