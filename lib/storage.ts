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
  isNew?: boolean
  isFeatured?: boolean
  tags?: string[]
  createdAt: string
  updatedAt: string
}

export interface StorageLicense {
  id: string
  productId: string
  productName: string
  licenseKey: string
  purchaseDate: string
  expiryDate?: string
  status: "active" | "expired" | "suspended"
  userId: string
}

export interface StorageUser {
  id: string
  email: string
  name: string
  role: "user" | "admin"
  avatar?: string
  createdAt: string
}

export interface SharedLink {
  id: string
  productId: string
  productName: string
  shareUrl: string
  createdBy: string
  createdAt: string
  expiresAt?: string
  downloads: number
  maxDownloads?: number
  isActive: boolean
}

const STORAGE_KEYS = {
  PRODUCTS: "conefivem_products",
  LICENSES: "conefivem_licenses",
  USERS: "conefivem_users",
  CURRENT_USER: "conefivem_current_user",
  SHARED_LINKS: "conefivem_shared_links",
}

// Generic storage functions
export function getFromStorage<T>(key: string): T[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : []
}

export function saveToStorage<T>(key: string, data: T[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem(key, JSON.stringify(data))
}

// Products
export function getProducts(): StorageProduct[] {
  return getFromStorage<StorageProduct>(STORAGE_KEYS.PRODUCTS)
}

export function saveProducts(products: StorageProduct[]): void {
  saveToStorage(STORAGE_KEYS.PRODUCTS, products)
}

export function addProduct(product: Omit<StorageProduct, "id" | "createdAt" | "updatedAt">): StorageProduct {
  const products = getProducts()
  const newProduct: StorageProduct = {
    ...product,
    id: `prod_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  products.push(newProduct)
  saveProducts(products)
  return newProduct
}

export function updateProduct(id: string, updates: Partial<StorageProduct>): StorageProduct | null {
  const products = getProducts()
  const index = products.findIndex((p) => p.id === id)
  if (index === -1) return null
  products[index] = { ...products[index], ...updates, updatedAt: new Date().toISOString() }
  saveProducts(products)
  return products[index]
}

export function deleteProduct(id: string): boolean {
  const products = getProducts()
  const filtered = products.filter((p) => p.id !== id)
  if (filtered.length === products.length) return false
  saveProducts(filtered)
  return true
}

// Licenses
export function getLicenses(): StorageLicense[] {
  return getFromStorage<StorageLicense>(STORAGE_KEYS.LICENSES)
}

export function saveLicenses(licenses: StorageLicense[]): void {
  saveToStorage(STORAGE_KEYS.LICENSES, licenses)
}

export function getUserLicenses(userId: string): StorageLicense[] {
  return getLicenses().filter((l) => l.userId === userId)
}

export function addLicense(license: Omit<StorageLicense, "id">): StorageLicense {
  const licenses = getLicenses()
  const newLicense: StorageLicense = {
    ...license,
    id: `lic_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  }
  licenses.push(newLicense)
  saveLicenses(licenses)
  return newLicense
}

// Users
export function getUsers(): StorageUser[] {
  return getFromStorage<StorageUser>(STORAGE_KEYS.USERS)
}

export function saveUsers(users: StorageUser[]): void {
  saveToStorage(STORAGE_KEYS.USERS, users)
}

export function getUserByEmail(email: string): StorageUser | null {
  const users = getUsers()
  return users.find((u) => u.email === email) || null
}

export function addUser(user: Omit<StorageUser, "id" | "createdAt">): StorageUser {
  const users = getUsers()
  const newUser: StorageUser = {
    ...user,
    id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
  }
  users.push(newUser)
  saveUsers(users)
  return newUser
}

// Current User
export function getCurrentUser(): StorageUser | null {
  if (typeof window === "undefined") return null
  const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER)
  return data ? JSON.parse(data) : null
}

export function setCurrentUser(user: StorageUser | null): void {
  if (typeof window === "undefined") return
  if (user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user))
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER)
  }
}

// Shared Links
export function getSharedLinks(): SharedLink[] {
  return getFromStorage<SharedLink>(STORAGE_KEYS.SHARED_LINKS)
}

export function saveSharedLinks(links: SharedLink[]): void {
  saveToStorage(STORAGE_KEYS.SHARED_LINKS, links)
}

export function createSharedLink(
  productId: string,
  productName: string,
  createdBy: string,
  options?: { expiresInDays?: number; maxDownloads?: number },
): SharedLink {
  const links = getSharedLinks()
  const shareId = Math.random().toString(36).substr(2, 9)
  const shareUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/share/${shareId}`

  const newLink: SharedLink = {
    id: shareId,
    productId,
    productName,
    shareUrl,
    createdBy,
    createdAt: new Date().toISOString(),
    expiresAt: options?.expiresInDays
      ? new Date(Date.now() + options.expiresInDays * 24 * 60 * 60 * 1000).toISOString()
      : undefined,
    downloads: 0,
    maxDownloads: options?.maxDownloads,
    isActive: true,
  }

  links.push(newLink)
  saveSharedLinks(links)
  return newLink
}

export function getSharedLink(id: string): SharedLink | null {
  const links = getSharedLinks()
  return links.find((l) => l.id === id) || null
}

export function incrementLinkDownload(id: string): boolean {
  const links = getSharedLinks()
  const index = links.findIndex((l) => l.id === id)
  if (index === -1) return false

  links[index].downloads += 1

  // Check if max downloads reached
  if (links[index].maxDownloads && links[index].downloads >= links[index].maxDownloads) {
    links[index].isActive = false
  }

  // Check if expired
  if (links[index].expiresAt && new Date(links[index].expiresAt!) < new Date()) {
    links[index].isActive = false
  }

  saveSharedLinks(links)
  return links[index].isActive
}

export function deactivateSharedLink(id: string): boolean {
  const links = getSharedLinks()
  const index = links.findIndex((l) => l.id === id)
  if (index === -1) return false

  links[index].isActive = false
  saveSharedLinks(links)
  return true
}

export function getUserSharedLinks(userId: string): SharedLink[] {
  return getSharedLinks().filter((l) => l.createdBy === userId)
}
