import { cookies } from "next/headers"
import { verifySession } from "../models/session"
import { findUserById } from "../models/user"

export interface AuthenticatedUser {
  id: number
  email: string
  firstName: string
  lastName: string
  role: string
  institution?: string
}

/**
 * Get the current authenticated user from the session cookie
 */
export async function getCurrentUser(): Promise<AuthenticatedUser | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session_token")?.value

    if (!token) {
      return null
    }

    // Verify session
    const session = await verifySession(token)
    if (!session) {
      return null
    }

    // Get user data
    const user = await findUserById(session.user_id)
    if (!user || !user.is_active) {
      return null
    }

    return {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      role: user.role,
      institution: user.institution || undefined,
    }
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}

/**
 * Require authentication - throws error if not authenticated
 */
export async function requireAuth(): Promise<AuthenticatedUser> {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  return user
}

/**
 * Check if user has a specific role
 */
export async function hasRole(role: string): Promise<boolean> {
  const user = await getCurrentUser()
  return user?.role === role
}
