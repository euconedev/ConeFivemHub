import { getSupabaseBrowserClient } from "@/lib/supabase/client"

export interface StorageProduct {
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
  is_new?: boolean
  is_featured?: boolean
  tags?: string[]
  created_at: string
  updated_at: string
}

export interface StorageLicense {
  id: string
  product_id: string
  product_name: string
  license_key: string
  purchase_date: string
  expiry_date?: string
  status: "active" | "expired" | "suspended"
  user_id: string
  user_email: string
}

export interface SharedLink {
  id: string
  product_id: string
  product_name: string
  share_url: string
  created_by: string
  created_at: string
  expires_at?: string
  downloads: number
  max_downloads?: number
  is_active: boolean
}

export interface DiscordClient {
  id: string
  user_id: string
  discord_id: string
  discord_username: string
  tags: string[]
  joined_at: string
}

// Products
export async function getProducts(): Promise<StorageProduct[]> {
  const supabase = getSupabaseBrowserClient()
  const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("[v0] Error fetching products:", error)
    return []
  }
  return data || []
}

export async function getProductById(id: string): Promise<StorageProduct | null> {
  const supabase = getSupabaseBrowserClient()
  const { data, error } = await supabase.from("products").select("*").eq("id", id).single()

  if (error) {
    console.error("[v0] Error fetching product:", error)
    return null
  }
  return data
}

export async function addProduct(
  product: Omit<StorageProduct, "id" | "created_at" | "updated_at">,
): Promise<StorageProduct | null> {
  const supabase = getSupabaseBrowserClient()
  const { data, error } = await supabase.from("products").insert([product]).select().single()

  if (error) {
    console.error("[v0] Error adding product:", error)
    return null
  }
  return data
}

export async function updateProduct(id: string, updates: Partial<StorageProduct>): Promise<StorageProduct | null> {
  const supabase = getSupabaseBrowserClient()
  const { data, error } = await supabase
    .from("products")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error("[v0] Error updating product:", error)
    return null
  }
  return data
}

export async function deleteProduct(id: string): Promise<boolean> {
  const supabase = getSupabaseBrowserClient()
  const { error } = await supabase.from("products").delete().eq("id", id)

  if (error) {
    console.error("[v0] Error deleting product:", error)
    return false
  }
  return true
}

// Licenses
export async function getLicenses(): Promise<StorageLicense[]> {
  const supabase = getSupabaseBrowserClient()
  const { data, error } = await supabase.from("licenses").select("*").order("purchase_date", { ascending: false })

  if (error) {
    console.error("[v0] Error fetching licenses:", error)
    return []
  }
  return data || []
}

export async function getUserLicenses(userId: string): Promise<StorageLicense[]> {
  const supabase = getSupabaseBrowserClient()
  const { data, error } = await supabase
    .from("licenses")
    .select("*")
    .eq("user_id", userId)
    .order("purchase_date", { ascending: false })

  if (error) {
    console.error("[v0] Error fetching user licenses:", error)
    return []
  }
  return data || []
}

export async function addLicense(license: Omit<StorageLicense, "id">): Promise<StorageLicense | null> {
  const supabase = getSupabaseBrowserClient()
  const { data, error } = await supabase.from("licenses").insert([license]).select().single()

  if (error) {
    console.error("[v0] Error adding license:", error)
    return null
  }
  return data
}

// Shared Links
export async function getSharedLinks(): Promise<SharedLink[]> {
  const supabase = getSupabaseBrowserClient()
  const { data, error } = await supabase.from("shared_links").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("[v0] Error fetching shared links:", error)
    return []
  }
  return data || []
}

export async function getUserSharedLinks(userId: string): Promise<SharedLink[]> {
  const supabase = getSupabaseBrowserClient()
  const { data, error } = await supabase
    .from("shared_links")
    .select("*")
    .eq("created_by", userId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("[v0] Error fetching user shared links:", error)
    return []
  }
  return data || []
}

export async function createSharedLink(
  productId: string,
  productName: string,
  createdBy: string,
  options?: { expiresInDays?: number; maxDownloads?: number },
): Promise<SharedLink | null> {
  const supabase = getSupabaseBrowserClient()
  const shareId = Math.random().toString(36).substr(2, 9)
  const shareUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/share/${shareId}`

  const newLink = {
    id: shareId,
    product_id: productId,
    product_name: productName,
    share_url: shareUrl,
    created_by: createdBy,
    expires_at: options?.expiresInDays
      ? new Date(Date.now() + options.expiresInDays * 24 * 60 * 60 * 1000).toISOString()
      : null,
    downloads: 0,
    max_downloads: options?.maxDownloads || null,
    is_active: true,
  }

  const { data, error } = await supabase.from("shared_links").insert([newLink]).select().single()

  if (error) {
    console.error("[v0] Error creating shared link:", error)
    return null
  }
  return data
}

export async function deleteSharedLink(id: string): Promise<boolean> {
  const supabase = getSupabaseBrowserClient()
  const { error } = await supabase.from("shared_links").delete().eq("id", id)

  if (error) {
    console.error("[v0] Error deleting shared link:", error)
    return false
  }
  return true
}

export async function deactivateSharedLink(id: string): Promise<boolean> {
  const supabase = getSupabaseBrowserClient()
  const { error } = await supabase.from("shared_links").update({ is_active: false }).eq("id", id)

  if (error) {
    console.error("[v0] Error deactivating shared link:", error)
    return false
  }
  return true
}

export { getProductById as getSupabaseProductById };

// Discord Clients
export async function getDiscordClients(): Promise<DiscordClient[]> {
  const supabase = getSupabaseBrowserClient()
  const { data, error } = await supabase.from("discord_clients").select("*").order("joined_at", { ascending: false })

  if (error) {
    console.error("[v0] Error fetching discord clients:", error)
    return []
  }
  return data || []
}

export async function updateDiscordClientTags(clientId: string, tags: string[]): Promise<boolean> {
  const supabase = getSupabaseBrowserClient()
  const { error } = await supabase.from("discord_clients").update({ tags }).eq("id", clientId)

  if (error) {
    console.error("[v0] Error updating discord client tags:", error)
    return false
  }
  return true
}
