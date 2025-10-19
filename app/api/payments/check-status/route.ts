import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"
import { getAbacatePayClient } from "@/lib/abacate-pay"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerClient()

    // Verificar autenticação
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 })
    }

    // Obter pixId da query string
    const { searchParams } = new URL(request.url)
    const pixId = searchParams.get("pixId")

    if (!pixId) {
      return NextResponse.json({ error: "PIX ID é obrigatório" }, { status: 400 })
    }

    // Verificar status no Abacate Pay
    const abacatePay = getAbacatePayClient()
    const statusResponse = await abacatePay.checkPixStatus(pixId)

    if (statusResponse.error || !statusResponse.data) {
      return NextResponse.json({ error: "Erro ao verificar status do pagamento" }, { status: 500 })
    }

    const { status, expiresAt } = statusResponse.data

    // Se o pagamento foi confirmado, atualizar no banco
    if (status === "PAID") {
      // Buscar compra pelo transaction_id
      const { data: purchase, error: purchaseError } = await supabase
        .from("purchases")
        .select("*")
        .eq("transaction_id", pixId)
        .eq("user_id", user.id)
        .single()

      if (!purchaseError && purchase && purchase.status === "pending") {
        // Atualizar status da compra
        await supabase
          .from("purchases")
          .update({ status: "completed", updated_at: new Date().toISOString() })
          .eq("id", purchase.id)

        // Criar licença para o produto
        const { data: licenseData } = await supabase.rpc("generate_license_key")

        await supabase.from("licenses").insert({
          user_id: user.id,
          product_id: purchase.product_id,
          purchase_id: purchase.id,
          license_key: licenseData || `LIC-${Date.now()}`,
          status: "active",
        })
      }
    }

    return NextResponse.json({
      success: true,
      status,
      expiresAt,
    })
  } catch (error) {
    console.error("[API] Error in check-status:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
