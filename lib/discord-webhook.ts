import type { Purchase } from "./types"

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL || ""

export async function sendPurchaseNotification(purchase: Purchase) {
  if (!DISCORD_WEBHOOK_URL) {
    console.warn("[Discord] Webhook URL not configured, skipping notification")
    return { success: false, error: "Webhook URL not configured" }
  }

  try {
    const embed = {
      title: "🎉 Nova Compra Realizada!",
      color: 0x00ff9c, // Verde neon
      fields: [
        {
          name: "Produto",
          value: purchase.productName,
          inline: true,
        },
        {
          name: "Valor",
          value: `R$ ${purchase.price.toFixed(2)}`,
          inline: true,
        },
        {
          name: "Cliente",
          value: purchase.userName,
          inline: true,
        },
        {
          name: "Email",
          value: purchase.userEmail,
          inline: true,
        },
        {
          name: "IP",
          value: purchase.ipAddress,
          inline: true,
        },
        {
          name: "Data",
          value: new Date(purchase.purchaseDate).toLocaleString("pt-BR"),
          inline: true,
        },
        {
          name: "ID da Compra",
          value: purchase.id,
          inline: false,
        },
      ],
      footer: {
        text: "ConeFiveM Hub - Pagamento via Abacate Pay",
      },
      timestamp: new Date().toISOString(),
    }

    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        embeds: [embed],
      }),
    })

    if (!response.ok) {
      throw new Error(`Discord webhook failed: ${response.statusText}`)
    }

    console.log("[Discord] Purchase notification sent successfully")
    return { success: true }
  } catch (error) {
    console.error("[Discord] Failed to send notification:", error)
    return { success: false, error }
  }
}

export async function sendProductPostNotification(product: {
  name: string
  price: number
  category: string
  tags?: string[]
}) {
  if (!DISCORD_WEBHOOK_URL) {
    console.warn("[Discord] Webhook URL not configured, skipping notification")
    return { success: false, error: "Webhook URL not configured" }
  }

  try {
    const embed = {
      title: "📦 Novo Produto Adicionado!",
      color: 0x00ff9c,
      fields: [
        {
          name: "Nome",
          value: product.name,
          inline: true,
        },
        {
          name: "Preço",
          value: `R$ ${product.price.toFixed(2)}`,
          inline: true,
        },
        {
          name: "Categoria",
          value: product.category,
          inline: true,
        },
      ],
      footer: {
        text: "ConeFiveM Hub",
      },
      timestamp: new Date().toISOString(),
    }

    if (product.tags && product.tags.length > 0) {
      embed.fields.push({
        name: "Tags",
        value: product.tags.join(", "),
        inline: false,
      })
    }

    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        embeds: [embed],
      }),
    })

    if (!response.ok) {
      throw new Error(`Discord webhook failed: ${response.statusText}`)
    }

    console.log("[Discord] Product post notification sent successfully")
    return { success: true }
  } catch (error) {
    console.error("[Discord] Failed to send notification:", error)
    return { success: false, error }
  }
}
