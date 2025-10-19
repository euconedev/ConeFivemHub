// Abacate Pay API Integration
// Documentation: https://docs.abacatepay.com

const ABACATE_PAY_API_URL = "https://api.abacatepay.com/v1"

export interface AbacatePayCustomer {
  name: string
  cellphone?: string
  email: string
  taxId?: string
}

export interface AbacatePayMetadata {
  externalId?: string
  [key: string]: any
}

export interface CreatePixQRCodeRequest {
  amount: number // Valor em centavos (ex: 1000 = R$ 10,00)
  expiresIn?: number // Tempo de expiração em segundos (padrão: 3600)
  description: string
  customer: AbacatePayCustomer
  metadata?: AbacatePayMetadata
}

export interface PixQRCodeResponse {
  id: string
  amount: number
  status: "PENDING" | "PAID" | "EXPIRED" | "CANCELLED"
  devMode: boolean
  brCode: string // Código PIX copia e cola
  brCodeBase64: string // QR Code em base64
  platformFee: number
  createdAt: string
  updatedAt: string
  expiresAt: string
}

export interface CheckPixStatusResponse {
  status: "PENDING" | "PAID" | "EXPIRED" | "CANCELLED"
  expiresAt: string
}

export interface AbacatePayResponse<T> {
  data: T | null
  error: string | null
}

class AbacatePayClient {
  private apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<AbacatePayResponse<T>> {
    try {
      const response = await fetch(`${ABACATE_PAY_API_URL}${endpoint}`, {
        ...options,
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
          ...options.headers,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        return {
          data: null,
          error: data.error || `HTTP ${response.status}: ${response.statusText}`,
        }
      }

      return data
    } catch (error) {
      console.error("[AbacatePay] Request error:", error)
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  async createPixQRCode(request: CreatePixQRCodeRequest): Promise<AbacatePayResponse<PixQRCodeResponse>> {
    return this.request<PixQRCodeResponse>("/pixQrCode/create", {
      method: "POST",
      body: JSON.stringify(request),
    })
  }

  async checkPixStatus(pixId: string): Promise<AbacatePayResponse<CheckPixStatusResponse>> {
    return this.request<CheckPixStatusResponse>(`/pixQrCode/check?id=${pixId}`, {
      method: "GET",
    })
  }
}

// Singleton instance
let abacatePayClient: AbacatePayClient | null = null

export function getAbacatePayClient(): AbacatePayClient {
  if (!abacatePayClient) {
    const apiKey = process.env.ABACATE_PAY_API_KEY
    if (!apiKey) {
      throw new Error("ABACATE_PAY_API_KEY is not configured")
    }
    abacatePayClient = new AbacatePayClient(apiKey)
  }
  return abacatePayClient
}

// Helper function to convert BRL to cents
export function brlToCents(value: number): number {
  return Math.round(value * 100)
}

// Helper function to convert cents to BRL
export function centsToBrl(cents: number): number {
  return cents / 100
}
