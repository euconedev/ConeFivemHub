"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

const ADMIN_EMAIL = "eucone.dev@gmail.com"

interface AuthContextType {
  user: User | null
  loading: boolean
  signOut: () => Promise<void>
  login: (email: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; error?: string }>
  signup: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>
  refreshUser: () => Promise<void>
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = getSupabaseBrowserClient()

  const refreshUser = async () => {
    const {
      data: { user: refreshedUser },
    } = await supabase.auth.getUser()
    setUser(refreshedUser)
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  const login = async (
    email: string,
    password: string,
    rememberMe = false,
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
        options: {
          persistSession: rememberMe,
        },
      })

      if (error) {
        return { success: false, error: error.message }
      }

      setUser(data.user)
      return { success: true }
    } catch (err: any) {
      return { success: false, error: err.message || "Erro ao fazer login" }
    }
  }

  const signup = async (
    email: string,
    password: string,
    name: string,
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const redirectUrl =
        typeof window !== "undefined"
          ? process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/dashboard`
          : undefined

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role: email === ADMIN_EMAIL ? "admin" : "user",
          },
          emailRedirectTo: redirectUrl,
        },
      })

      if (error) {
        return { success: false, error: error.message }
      }

      setUser(data.user)
      return { success: true }
    } catch (err: any) {
      return { success: false, error: err.message || "Erro ao criar conta" }
    }
  }

  const resetPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const redirectUrl =
        typeof window !== "undefined"
          ? process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/reset-password`
          : undefined

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl,
      })

      if (error) {
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch (err: any) {
      return { success: false, error: err.message || "Erro ao enviar email de recuperação" }
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    window.location.href = "/"
  }

  const isAdmin = user?.email === ADMIN_EMAIL || user?.user_metadata?.role === "admin"

  return (
    <AuthContext.Provider value={{ user, loading, signOut, login, signup, resetPassword, refreshUser, isAdmin }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
