"use client"

import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { User, Menu, LogOut } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, loading, signOut, isAdmin } = useAuth()
  const isLoggedIn = !!user

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-border bg-background">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Início
            </Link>
            <Link href="/store" className="text-sm font-medium text-primary">
              Loja
            </Link>
            {isLoggedIn && (
              <Link href="/dashboard" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Dashboard
              </Link>
            )}
            {isAdmin && (
              <Link href="/admin" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Admin
              </Link>
            )}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {!loading && (
              <>
                {isLoggedIn ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="border border-border">
                        <User className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 bg-card border-2 border-border">
                      <DropdownMenuLabel>
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">{user.user_metadata?.name || "Usuário"}</p>
                          <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard">Dashboard</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard/licenses">Minhas Licenças</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard/settings">Configurações</Link>
                      </DropdownMenuItem>
                      {isAdmin && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link href="/admin">Painel Admin</Link>
                          </DropdownMenuItem>
                        </>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => signOut()} className="text-destructive">
                        <LogOut className="mr-2 h-4 w-4" />
                        Sair
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <>
                    <Button variant="ghost" asChild className="border border-border">
                      <Link href="/login">Entrar</Link>
                    </Button>
                    <Button className="bg-primary hover:bg-primary/90" asChild>
                      <Link href="/signup">Criar Conta</Link>
                    </Button>
                  </>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden border border-border" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 space-y-3 border-t-2 border-border bg-card">
            <Link href="/" className="block text-sm font-medium text-foreground hover:text-primary transition-colors py-2">
              Início
            </Link>
            <Link href="/store" className="block text-sm font-medium text-primary py-2">
              Loja
            </Link>
            {isLoggedIn && (
              <>
                <Link href="/dashboard" className="block text-sm font-medium text-foreground hover:text-primary transition-colors py-2">
                  Dashboard
                </Link>
                {isAdmin && (
                  <Link href="/admin" className="block text-sm font-medium text-foreground hover:text-primary transition-colors py-2">
                    Admin
                  </Link>
                )}
              </>
            )}
            <div className="pt-3 space-y-2">
              {!loading && (
                <>
                  {isLoggedIn ? (
                    <Button variant="outline" className="w-full border-2 border-border" onClick={() => signOut()}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sair
                    </Button>
                  ) : (
                    <>
                      <Button variant="outline" className="w-full border-2 border-border" asChild>
                        <Link href="/login">Entrar</Link>
                      </Button>
                      <Button className="w-full bg-primary hover:bg-primary/90" asChild>
                        <Link href="/signup">Criar Conta</Link>
                      </Button>
                    </>
                  )}
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
