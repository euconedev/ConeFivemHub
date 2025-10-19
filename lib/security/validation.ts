import { z } from "zod"

// Schemas de validação
export const emailSchema = z.string().email("Email inválido").min(5).max(255)

export const passwordSchema = z
  .string()
  .min(8, "Senha deve ter no mínimo 8 caracteres")
  .max(128, "Senha muito longa")
  .regex(/[A-Z]/, "Senha deve conter pelo menos uma letra maiúscula")
  .regex(/[a-z]/, "Senha deve conter pelo menos uma letra minúscula")
  .regex(/[0-9]/, "Senha deve conter pelo menos um número")

export const uuidSchema = z.string().uuid("UUID inválido")

export const licenseKeySchema = z
  .string()
  .regex(/^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/, "Formato de chave de licença inválido")

export const productIdSchema = z.string().uuid("ID de produto inválido")

export const amountSchema = z.number().positive("Valor deve ser positivo").max(999999, "Valor muito alto")

export const urlSchema = z.string().url("URL inválida")

export const discordWebhookSchema = z.string().url().startsWith("https://discord.com/api/webhooks/")

/**
 * Sanitiza entrada de texto removendo caracteres perigosos
 */
export function sanitizeText(text: string): string {
  return text
    .replace(/[<>]/g, "") // Remove < e >
    .replace(/javascript:/gi, "") // Remove javascript:
    .replace(/on\w+=/gi, "") // Remove event handlers
    .trim()
}

/**
 * Valida e sanitiza email
 */
export function validateEmail(email: string): { valid: boolean; email?: string; error?: string } {
  try {
    const validated = emailSchema.parse(email.toLowerCase().trim())
    return { valid: true, email: validated }
  } catch (error) {
    return { valid: false, error: "Email inválido" }
  }
}

/**
 * Valida senha forte
 */
export function validatePassword(password: string): { valid: boolean; error?: string } {
  try {
    passwordSchema.parse(password)
    return { valid: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { valid: false, error: error.errors[0].message }
    }
    return { valid: false, error: "Senha inválida" }
  }
}

/**
 * Valida UUID
 */
export function validateUUID(uuid: string): boolean {
  try {
    uuidSchema.parse(uuid)
    return true
  } catch {
    return false
  }
}

/**
 * Previne SQL Injection sanitizando entrada
 */
export function sanitizeForSQL(input: string): string {
  return input.replace(/['";\\]/g, "")
}

/**
 * Valida e sanitiza URL
 */
export function validateURL(url: string): { valid: boolean; url?: string; error?: string } {
  try {
    const validated = urlSchema.parse(url)
    return { valid: true, url: validated }
  } catch {
    return { valid: false, error: "URL inválida" }
  }
}
