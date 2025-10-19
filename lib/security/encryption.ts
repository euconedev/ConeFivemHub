import crypto from "crypto"

// Configurações de criptografia
const ALGORITHM = "aes-256-gcm"
const KEY_LENGTH = 32
const IV_LENGTH = 16
const AUTH_TAG_LENGTH = 16
const SALT_LENGTH = 64

/**
 * Deriva uma chave de criptografia a partir de uma senha
 */
function deriveKey(password: string, salt: Buffer): Buffer {
  return crypto.pbkdf2Sync(password, salt, 100000, KEY_LENGTH, "sha512")
}

/**
 * Obtém a chave de criptografia do ambiente
 */
function getEncryptionKey(): string {
  const key = process.env.ENCRYPTION_KEY
  if (!key) {
    throw new Error("ENCRYPTION_KEY não configurada nas variáveis de ambiente")
  }
  if (key.length < 32) {
    throw new Error("ENCRYPTION_KEY deve ter pelo menos 32 caracteres")
  }
  return key
}

/**
 * Criptografa dados sensíveis
 */
export function encrypt(text: string): string {
  try {
    const password = getEncryptionKey()
    const salt = crypto.randomBytes(SALT_LENGTH)
    const key = deriveKey(password, salt)
    const iv = crypto.randomBytes(IV_LENGTH)

    const cipher = crypto.createCipheriv(ALGORITHM, key, iv)
    let encrypted = cipher.update(text, "utf8", "hex")
    encrypted += cipher.final("hex")

    const authTag = cipher.getAuthTag()

    // Formato: salt:iv:authTag:encrypted
    return `${salt.toString("hex")}:${iv.toString("hex")}:${authTag.toString("hex")}:${encrypted}`
  } catch (error) {
    console.error("[Encryption] Error encrypting data:", error)
    throw new Error("Falha ao criptografar dados")
  }
}

/**
 * Descriptografa dados sensíveis
 */
export function decrypt(encryptedText: string): string {
  try {
    const password = getEncryptionKey()
    const parts = encryptedText.split(":")

    if (parts.length !== 4) {
      throw new Error("Formato de dados criptografados inválido")
    }

    const salt = Buffer.from(parts[0], "hex")
    const iv = Buffer.from(parts[1], "hex")
    const authTag = Buffer.from(parts[2], "hex")
    const encrypted = parts[3]

    const key = deriveKey(password, salt)

    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv)
    decipher.setAuthTag(authTag)

    let decrypted = decipher.update(encrypted, "hex", "utf8")
    decrypted += decipher.final("utf8")

    return decrypted
  } catch (error) {
    console.error("[Encryption] Error decrypting data:", error)
    throw new Error("Falha ao descriptografar dados")
  }
}

/**
 * Gera um hash seguro para senhas ou tokens
 */
export function hash(text: string): string {
  return crypto.createHash("sha256").update(text).digest("hex")
}

/**
 * Gera um token aleatório seguro
 */
export function generateSecureToken(length = 32): string {
  return crypto.randomBytes(length).toString("hex")
}

/**
 * Compara dois valores de forma segura contra timing attacks
 */
export function secureCompare(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false
  }
  return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b))
}
