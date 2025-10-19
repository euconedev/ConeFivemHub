import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"
import { sendPurchaseNotification } from "@/lib/discord-webhook"

export async function POST(request: NextRequest) {
  try {
    // Verificar secret do webhook
    const webhookSecret = process.env.ABACATE_PAY_WEBHOOK_SECRET
    const receivedSecret = request.headers.get("x-webhook-secret")

    if (!webhookSecret || receivedSecret !== webhookSecret) {
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
          users (
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

        console.log("[Webhook] License created for purchase:", purchase.id)
      }

      try {
        await sendPurchaseNotification({
          id: purchase.id,
          productName: purchase.products?.name || "Produto",
          price: purchase.amount,
          userName: purchase.users?.full_name || "Cliente",
          userEmail: purchase.users?.email || "N/A",
          ipAddress: purchase.ip_address || "N/A",
          purchaseDate: purchase.created_at,
        })
        console.log("[Webhook] Discord notification sent successfully")
      } catch (discordError) {
        console.error("[Webhook] Failed to send Discord notification:", discordError)
        // Não falhar o webhook se o Discord falhar
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("[Webhook] Error processing webhook:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
