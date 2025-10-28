/**
 * Simple token generation using crypto.randomUUID
 * This is compatible with Next.js edge runtime
 */

export function generateToken(): string {
  // Generate a cryptographically secure random token
  return crypto.randomUUID() + "-" + crypto.randomUUID()
}

export function generateSessionToken(userId: number): string {
  // Create a session token with user ID encoded
  const timestamp = Date.now()
  const random = crypto.randomUUID()
  return `${userId}.${timestamp}.${random}`
}

export function parseSessionToken(token: string): { userId: number; timestamp: number } | null {
  try {
    const parts = token.split(".")
    if (parts.length !== 3) {
      return null
    }

    const userId = Number.parseInt(parts[0], 10)
    const timestamp = Number.parseInt(parts[1], 10)

    if (isNaN(userId) || isNaN(timestamp)) {
      return null
    }

    return { userId, timestamp }
  } catch (error) {
    return null
  }
}
