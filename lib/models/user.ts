import { supabase } from "../database/supabase"
import { hashPassword } from "../auth/password"

export interface User {
  id: number
  email: string
  password_hash: string
  first_name: string
  last_name: string
  role: string
  institution: string | null
  is_active: boolean
  created_at: string
  last_login: string | null
}

export interface CreateUserInput {
  email: string
  password: string
  firstName: string
  lastName: string
  institution?: string
}

/**
 * Create a new user
 */
export async function createUser(input: CreateUserInput): Promise<User> {
  const passwordHash = await hashPassword(input.password)

  const { data, error } = await supabase
    .from("users")
    .insert({
      email: input.email.toLowerCase(),
      password_hash: passwordHash,
      first_name: input.firstName,
      last_name: input.lastName,
      institution: input.institution || null,
      role: "user",
      is_active: true,
    })
    .select()
    .single()

  if (error) {
    console.error("Error creating user:", error)
    throw new Error("Failed to create user")
  }

  return data
}

/**
 * Find a user by email
 */
export async function findUserByEmail(email: string): Promise<User | null> {
  const { data, error } = await supabase.from("users").select("*").eq("email", email.toLowerCase()).single()

  if (error) {
    if (error.code === "PGRST116") {
      // No rows returned
      return null
    }
    console.error("Error finding user:", error)
    throw new Error("Failed to find user")
  }

  return data
}

/**
 * Find a user by ID
 */
export async function findUserById(id: number): Promise<User | null> {
  const { data, error } = await supabase.from("users").select("*").eq("id", id).single()

  if (error) {
    if (error.code === "PGRST116") {
      return null
    }
    console.error("Error finding user:", error)
    throw new Error("Failed to find user")
  }

  return data
}

/**
 * Update user's last login timestamp
 */
export async function updateLastLogin(userId: number): Promise<void> {
  const { error } = await supabase.from("users").update({ last_login: new Date().toISOString() }).eq("id", userId)

  if (error) {
    console.error("Error updating last login:", error)
  }
}

/**
 * Update user profile
 */
export async function updateUser(
  userId: number,
  updates: {
    firstName?: string
    lastName?: string
    institution?: string
  },
): Promise<User> {
  const updateData: any = {}

  if (updates.firstName) updateData.first_name = updates.firstName
  if (updates.lastName) updateData.last_name = updates.lastName
  if (updates.institution !== undefined) updateData.institution = updates.institution

  const { data, error } = await supabase.from("users").update(updateData).eq("id", userId).select().single()

  if (error) {
    console.error("Error updating user:", error)
    throw new Error("Failed to update user")
  }

  return data
}
