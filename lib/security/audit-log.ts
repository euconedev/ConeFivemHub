import { createServerClient } from "@/lib/supabase/server"

export type AuditAction =
  | "user.login"
  | "user.logout"
  | "user.signup"
  | "user.password_reset"
  | "user.profile_update"
  | "payment.created"
  | "payment.completed"
  | "payment.failed"
  | "license.created"
  | "license.activated"
  | "license.deactivated"
  | "admin.user_update"
  | "admin.product_create"
  | "admin.product_update"
  | "admin.product_delete"
  | "security.rate_limit_exceeded"
  | "security.invalid_token"
  | "security.unauthorized_access"

export interface AuditLogEntry {
  action: AuditAction
  userId?: string
  ipAddress?: string
  userAgent?: string
  metadata?: Record<string, any>
  severity: "info" | "warning" | "error" | "critical"
}

/**
 * Registra evento de auditoria
 */
export async function logAudit(entry: AuditLogEntry): Promise<void> {
  try {
    const supabase = await createServerClient()

    await supabase.from("audit_logs").insert({
      action: entry.action,
      user_id: entry.userId,
      ip_address: entry.ipAddress,
      user_agent: entry.userAgent,
      metadata: entry.metadata,
      severity: entry.severity,
      created_at: new Date().toISOString(),
    })

    // Log crítico também no console
    if (entry.severity === "critical" || entry.severity === "error") {
      console.error("[Audit]", entry.action, entry.metadata)
    }
  } catch (error) {
    console.error("[Audit] Failed to log audit entry:", error)
  }
}

/**
 * Extrai IP do request
 */
export function getClientIP(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")
  const realIP = request.headers.get("x-real-ip")

  if (forwarded) {
    return forwarded.split(",")[0].trim()
  }

  if (realIP) {
    return realIP
  }

  return "unknown"
}

/**
 * Extrai User Agent do request
 */
export function getUserAgent(request: Request): string {
  return request.headers.get("user-agent") || "unknown"
}
