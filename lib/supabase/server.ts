import { createServerClient as createSupabaseServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function createServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  console.log('Supabase URL (server):', supabaseUrl);
  console.log('Supabase Anon Key (server):', supabaseAnonKey);

  // Return a mock client if Supabase is not configured
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("[v0] Supabase is not configured. Please add the Supabase integration.")
    return createSupabaseServerClient("https://placeholder.supabase.co", "placeholder-key", {
      cookies: {
        getAll() {
          return []
        },
        setAll() {},
      },
    })
  }

  const cookieStore = await cookies()

  return createSupabaseServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // Server component - cookies can only be set in Server Actions or Route Handlers
        }
      },
    },
  })
}

export async function getSupabaseServerClient() {
  return createServerClient()
}
