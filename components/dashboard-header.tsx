"use client"

import { useAuth } from "@/hooks/use-auth"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import Link from "next/link"

interface DashboardHeaderProps {
  onMenuClick?: () => void
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const { user } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick}>
            <Menu className="h-5 w-5" />
          </Button>
          <Link href="/dashboard">
            <Logo />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/store">
            <Button variant="outline" size="sm">
              Voltar à Loja
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-sm font-semibold text-primary">{user?.email?.charAt(0).toUpperCase() || "U"}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
