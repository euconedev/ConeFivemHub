"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, Key, Settings, LogOut } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"

const navItems = [
  {
    title: "Visão Geral",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Minhas Licenças",
    href: "/dashboard/licenses",
    icon: Key,
  },
  {
    title: "Configurações",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardNav() {
  const pathname = usePathname()
  const { signOut } = useAuth()

  return (
    <nav className="flex flex-col gap-2">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
              "hover:bg-primary/10 hover:text-primary",
              isActive ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground",
            )}
          >
            <Icon className="h-5 w-5" />
            <span>{item.title}</span>
          </Link>
        )
      })}

      <Button
        variant="ghost"
        className="justify-start gap-3 px-4 py-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10 mt-4"
        onClick={signOut}
      >
        <LogOut className="h-5 w-5" />
        <span>Sair</span>
      </Button>
    </nav>
  )
}
