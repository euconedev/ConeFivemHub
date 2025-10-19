import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"
import { sendPurchaseNotification } from "@/lib/discord-webhook"
import { secureCompare } from "@/lib/security/encryption"
import { logAudit, getClientIP, getUserAgent } from "@/lib/security/audit-log"
import { checkRateLimit, RATE_LIMITS } from "@/lib/security/rate-limit"

export async function POST(request: NextRequest) {
  const ipAddress = getClientIP(request)
  const userAgent = getUserAgent(request)

  try {
    const rateLimit = checkRateLimit(`webhook:${ipAddress}`, RATE_LIMITS.API_STRICT)
    if (!rateLimit.allowed) {
      await logAudit({
        action: "security.rate_limit_exceeded",
        ipAddress,
        userAgent,
        metadata: { endpoint: "/api/webhooks/abacate-pay" },
        severity: "warning",
      })
      return NextResponse.json({ error: "Too many requests" }, { status: 429 })
    }

    const webhookSecret = process.env.ABACATE_PAY_WEBHOOK_SECRET
    const receivedSecret = request.headers.get("x-webhook-secret")

    if (!webhookSecret || !receivedSecret || !secureCompare(webhookSecret, receivedSecret)) {
      await logAudit({
        action: "security.invalid_token",
        ipAddress,
        userAgent,
        metadata: { endpoint: "/api/webhooks/abacate-pay" },
        severity: "critical",
      })
      console.error("[Webhook] Invalid secret")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { event, data } = body

    console.log("[Webhook] Received event:", event, data)

    // Processar evento de pagamento confirmado
    if (event === "pixQrCode.paid" || event === "billing.paid") {
      const pixId = data.id
      const metadata = data.metadata || {}

      const supabase = await createServerClient()

      // Buscar compra pelo transaction_id
      const { data: purchase, error: purchaseError } = await supabase
        .from("purchases")
        .select(`
          *,
          profiles!inner (
            email,
            full_name
          ),
          products (
            name
          )
        `)
        .eq("transaction_id", pixId)
        .single()

      if (purchaseError || !purchase) {
        console.error("[Webhook] Purchase not found:", pixId)
        return NextResponse.json({ received: true })
      }

      // Atualizar status da compra
      await supabase
        .from("purchases")
        .update({
          status: "completed",
          updated_at: new Date().toISOString(),
        })
        .eq("id", purchase.id)

      // Criar licença se ainda não existe
      const { data: existingLicense } = await supabase
        .from("licenses")
        .select("id")
        .eq("purchase_id", purchase.id)
        .single()

      if (!existingLicense) {
        const { data: licenseKey } = await supabase.rpc("generate_license_key")

        await supabase.from("licenses").insert({
          user_id: purchase.user_id,
          product_id: purchase.product_id,
          purchase_id: purchase.id,
          license_key: licenseKey || `LIC-${Date.now()}`,
          status: "active",
        })

        await logAudit({
          action: "license.created",
          userId: purchase.user_id,
          ipAddress,
          userAgent,
          metadata: {
            purchaseId: purchase.id,
            productId: purchase.product_id,
            licenseKey,
          },
          severity: "info",
        })

        console.log("[Webhook] License created for purchase:", purchase.id)
      }

      await logAudit({
        action: "payment.completed",
        userId: purchase.user_id,
        ipAddress,
        userAgent,
        metadata: {
          purchaseId: purchase.id,
          productId: purchase.product_id,
          amount: purchase.amount,
          pixId,
        },
        severity: "info",
      })

      try {
        await sendPurchaseNotification({
          id: purchase.id,
          productName: purchase.products?.name || "Produto",
          price: purchase.amount,
          userName: purchase.profiles?.full_name || "Cliente",
          userEmail: purchase.profiles?.email || "N/A",
          ipAddress: purchase.ip_address || "N/A",
          purchaseDate: purchase.created_at,
        })
        console.log("[Webhook] Discord notification sent successfully")
      } catch (discordError) {
        console.error("[Webhook] Failed to send Discord notification:", discordError)
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("[Webhook] Error processing webhook:", error)

    await logAudit({
      action: "payment.failed",
      ipAddress,
      userAgent,
      metadata: { error: error instanceof Error ? error.message : "Unknown error" },
      severity: "critical",
    })

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
