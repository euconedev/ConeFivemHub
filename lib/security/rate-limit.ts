// Rate limiting usando Map em memória (para produção, use Redis)
interface RateLimitEntry {
  count: number
  resetAt: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

export interface RateLimitConfig {
  maxRequests: number
  windowMs: number
}

/**
 * Verifica se o rate limit foi excedido
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig,
): {
  allowed: boolean
  remaining: number
  resetAt: number
} {
  const now = Date.now()
  const entry = rateLimitStore.get(identifier)

  // Limpar entradas expiradas periodicamente
  if (Math.random() < 0.01) {
    cleanupExpiredEntries()
  }

  if (!entry || entry.resetAt < now) {
    // Nova janela de tempo
    const resetAt = now + config.windowMs
    rateLimitStore.set(identifier, { count: 1, resetAt })
    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      resetAt,
    }
  }

  if (entry.count >= config.maxRequests) {
    // Limite excedido
    return {
      allowed: false,
      remaining: 0,
      resetAt: entry.resetAt,
    }
  }

  // Incrementar contador
  entry.count++
  rateLimitStore.set(identifier, entry)

  return {
    allowed: true,
    remaining: config.maxRequests - entry.count,
    resetAt: entry.resetAt,
  }
}

/**
 * Limpa entradas expiradas do store
 */
function cleanupExpiredEntries() {
  const now = Date.now()
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetAt < now) {
      rateLimitStore.delete(key)
    }
  }
}

/**
 * Rate limit presets
 */
export const RATE_LIMITS = {
  // API endpoints
  API_STRICT: { maxRequests: 10, windowMs: 60000 }, // 10 req/min
  API_NORMAL: { maxRequests: 30, windowMs: 60000 }, // 30 req/min
  API_RELAXED: { maxRequests: 100, windowMs: 60000 }, // 100 req/min

  // Auth endpoints
  LOGIN: { maxRequests: 5, windowMs: 300000 }, // 5 req/5min
  SIGNUP: { maxRequests: 3, windowMs: 3600000 }, // 3 req/hour
  PASSWORD_RESET: { maxRequests: 3, windowMs: 3600000 }, // 3 req/hour

  // Payment endpoints
  PAYMENT_CREATE: { maxRequests: 5, windowMs: 60000 }, // 5 req/min
  PAYMENT_CHECK: { maxRequests: 20, windowMs: 60000 }, // 20 req/min
}
