import { Logo } from "@/components/logo"
import Link from "next/link"
import { Github, Twitter, MessageCircle } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground leading-relaxed">
              Marketplace de scripts e assets premium para servidores FiveM.
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Produtos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/store?category=scripts" className="text-sm text-muted-foreground hover:text-primary">
                  Scripts
                </Link>
              </li>
              <li>
                <Link href="/store?category=assets" className="text-sm text-muted-foreground hover:text-primary">
                  Assets
                </Link>
              </li>
              <li>
                <Link href="/store?category=maps" className="text-sm text-muted-foreground hover:text-primary">
                  Mapas
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Suporte</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/docs" className="text-sm text-muted-foreground hover:text-primary">
                  Documentação
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-sm text-muted-foreground hover:text-primary">
                  Central de Ajuda
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Comunidade</h3>
            <div className="flex gap-3">
              <a
                href="https://discord.gg/conefivem"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all glow-primary-hover"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/conefivem"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all glow-primary-hover"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/conedev"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all glow-primary-hover"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ConeFiveM Hub. Desenvolvido por{" "}
            <span className="text-primary font-semibold">Cone Dev</span>. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
