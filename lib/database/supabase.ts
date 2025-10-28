import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables")
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

// Type definitions
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
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
        Insert: {
          email: string
          password_hash: string
          first_name: string
          last_name: string
          role?: string
          institution?: string | null
          is_active?: boolean
        }
        Update: {
          email?: string
          password_hash?: string
          first_name?: string
          last_name?: string
          role?: string
          institution?: string | null
          is_active?: boolean
          last_login?: string | null
        }
      }
      sessions: {
        Row: {
          id: number
          user_id: number
          token: string
          expires_at: string
          created_at: string
        }
        Insert: {
          user_id: number
          token: string
          expires_at: string
        }
      }
    }
  }
}
