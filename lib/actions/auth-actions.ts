"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createUser, findUserByEmail, updateLastLogin } from "../models/user"
import { registerSchema, loginSchema } from "../validators/auth"
import { verifyPassword } from "../auth/password"
import { createSession, deleteSession } from "../models/session"

export async function registerAction(formData: FormData) {
  try {
    const rawData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      institution: formData.get("institution") as string,
    }

    // Validate input
    const validatedData = registerSchema.parse(rawData)

    // Check if user already exists
    const existingUser = await findUserByEmail(validatedData.email)
    if (existingUser) {
      return {
        success: false,
        error: "User with this email already exists",
      }
    }

    // Create user
    const user = await createUser({
      email: validatedData.email,
      password: validatedData.password,
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      institution: validatedData.institution,
    })

    // Create session
    const token = await createSession(user.id)

    // Set cookie
    const cookieStore = await cookies()
    cookieStore.set("session_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    })

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
      },
    }
  } catch (error: any) {
    console.error("Registration error:", error)

    if (error.name === "ZodError") {
      return {
        success: false,
        error: error.errors[0]?.message || "Validation error",
      }
    }

    return {
      success: false,
      error: "An error occurred during registration",
    }
  }
}

export async function loginAction(formData: FormData) {
  try {
    const rawData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    }

    // Validate input
    const validatedData = loginSchema.parse(rawData)

    // Find user
    const user = await findUserByEmail(validatedData.email)
    if (!user) {
      return {
        success: false,
        error: "Invalid email or password",
      }
    }

    // Verify password
    const isValidPassword = await verifyPassword(validatedData.password, user.password_hash)

    if (!isValidPassword) {
      return {
        success: false,
        error: "Invalid email or password",
      }
    }

    // Check if user is active
    if (!user.is_active) {
      return {
        success: false,
        error: "Account is inactive",
      }
    }

    // Update last login
    await updateLastLogin(user.id)

    // Create session
    const token = await createSession(user.id)

    // Set cookie
    const cookieStore = await cookies()
    cookieStore.set("session_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    })

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role,
      },
    }
  } catch (error: any) {
    console.error("Login error:", error)

    if (error.name === "ZodError") {
      return {
        success: false,
        error: error.errors[0]?.message || "Validation error",
      }
    }

    return {
      success: false,
      error: "An error occurred during login",
    }
  }
}

export async function logoutAction() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session_token")?.value

    if (token) {
      // Delete session from database
      await deleteSession(token)
    }

    // Clear cookie
    cookieStore.delete("session_token")
  } catch (error) {
    console.error("Logout error:", error)
  }

  redirect("/")
}
