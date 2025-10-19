import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"
import { getAbacatePayClient, brlToCents } from "@/lib/abacate-pay"

export async function POST(request: NextRequest) {
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

    // Obter dados do request
    const body = await request.json()
    const { productId } = body

    if (!productId) {
      return NextResponse.json({ error: "Product ID é obrigatório" }, { status: 400 })
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
      expiresIn: 3600, // 1 hora
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
      })
      .select()
      .single()

    if (purchaseError) {
      console.error("[Supabase] Error creating purchase:", purchaseError)
      return NextResponse.json({ error: "Erro ao registrar compra" }, { status: 500 })
    }

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
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
