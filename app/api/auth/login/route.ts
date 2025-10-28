import { type NextRequest, NextResponse } from "next/server"
import { findUserByEmail, updateLastLogin } from "@/lib/models/user"
import { loginSchema } from "@/lib/validators/auth"
import { verifyPassword } from "@/lib/auth/password"
import { createSession } from "@/lib/models/session"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validatedData = loginSchema.parse(body)

    // Find user
    const user = await findUserByEmail(validatedData.email)
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Verify password
    const isValidPassword = await verifyPassword(validatedData.password, user.password_hash)

    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Check if user is active
    if (!user.is_active) {
      return NextResponse.json({ error: "Account is inactive" }, { status: 403 })
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

    return NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          role: user.role,
        },
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("Login error:", error)

    if (error.name === "ZodError") {
      return NextResponse.json({ error: "Validation error", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
