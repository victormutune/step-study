import { supabase } from "../database/supabase"
import { generateSessionToken } from "../auth/token"

export interface Session {
  id: number
  user_id: number
  token: string
  expires_at: string
  created_at: string
}

/**
 * Create a new session for a user
 */
export async function createSession(userId: number): Promise<string> {
  const token = generateSessionToken(userId)
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 7) // 7 days from now

  const { data, error } = await supabase
    .from("sessions")
    .insert({
      user_id: userId,
      token,
      expires_at: expiresAt.toISOString(),
    })
    .select()
    .single()

  if (error) {
    console.error("Error creating session:", error)
    throw new Error("Failed to create session")
  }

  return token
}

/**
 * Find a session by token
 */
export async function findSessionByToken(token: string): Promise<Session | null> {
  const { data, error } = await supabase
    .from("sessions")
    .select("*")
    .eq("token", token)
    .gt("expires_at", new Date().toISOString())
    .single()

  if (error) {
    if (error.code === "PGRST116") {
      return null
    }
    console.error("Error finding session:", error)
    return null
  }

  return data
}

/**
 * Verify a session token is valid
 */
export async function verifySession(token: string): Promise<Session | null> {
  return findSessionByToken(token)
}

/**
 * Delete a session (logout)
 */
export async function deleteSession(token: string): Promise<void> {
  const { error } = await supabase.from("sessions").delete().eq("token", token)

  if (error) {
    console.error("Error deleting session:", error)
  }
}

/**
 * Delete all sessions for a user
 */
export async function deleteUserSessions(userId: number): Promise<void> {
  const { error } = await supabase.from("sessions").delete().eq("user_id", userId)

  if (error) {
    console.error("Error deleting user sessions:", error)
  }
}

/**
 * Clean up expired sessions
 */
export async function cleanupExpiredSessions(): Promise<void> {
  const { error } = await supabase.from("sessions").delete().lt("expires_at", new Date().toISOString())

  if (error) {
    console.error("Error cleaning up expired sessions:", error)
  }
}
