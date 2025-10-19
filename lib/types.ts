export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: "script" | "asset" | "mlo" | "vehicle" | "weapon"
  image: string
  features: string[]
  version: string
  downloads: number
  rating: number
  isNew?: boolean
  isFeatured?: boolean
  tags?: string[]
}

export interface License {
  id: string
  productId: string
  productName: string
  licenseKey: string
  purchaseDate: string
  expiryDate?: string
  status: "active" | "expired" | "suspended"
}

export interface User {
  id: string
  email: string
  name: string
  role: "user" | "admin"
  avatar?: string
  createdAt: string
}

export interface Purchase {
  id: string
  userId: string
  userName: string
  userEmail: string
  productId: string
  productName: string
  price: number
  purchaseDate: string
  ipAddress: string
  status: "completed" | "pending" | "failed"
}

export interface DiscordClient {
  id: string
  userId: string
  discordId: string
  discordUsername: string
  tags: string[]
  joinedAt: string
}

export interface Payment {
  id: string
  userId: string
  productId: string
  amount: number
  status: "pending" | "completed" | "expired" | "cancelled"
  paymentMethod: "pix"
  pixId?: string
  pixQRCode?: string
  pixCopyPaste?: string
  expiresAt?: string
  createdAt: string
  updatedAt: string
}
