import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Zap, Lock } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary">
              <Zap className="h-4 w-4" />
              <span>Plataforma Oficial de Scripts FiveM</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-balance">
              Scripts Premium para seu Servidor <span className="text-primary">FiveM</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground text-pretty">
              Adquira scripts de alta qualidade, gerencie suas licenças e eleve seu servidor FiveM para o próximo nível
              com a ConeFiveM Hub.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="glow-primary-hover" asChild>
                <Link href="/store">
                  Explorar Loja
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/login">Fazer Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Por que escolher a ConeFiveM Hub?</h2>
            <p className="text-muted-foreground text-lg">Tudo que você precisa para gerenciar seus scripts FiveM</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-card border border-border rounded-lg p-6 space-y-4 hover:border-primary/50 transition-colors">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Licenças Seguras</h3>
              <p className="text-muted-foreground">
                Sistema de licenciamento robusto com proteção contra pirataria e gerenciamento fácil de chaves.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 space-y-4 hover:border-primary/50 transition-colors">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Atualizações Automáticas</h3>
              <p className="text-muted-foreground">
                Receba atualizações automáticas dos seus scripts e tenha sempre a versão mais recente.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 space-y-4 hover:border-primary/50 transition-colors">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Suporte Dedicado</h3>
              <p className="text-muted-foreground">
                Equipe de suporte pronta para ajudar com instalação, configuração e resolução de problemas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">500+</div>
              <div className="text-muted-foreground">Scripts Vendidos</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">200+</div>
              <div className="text-muted-foreground">Clientes Satisfeitos</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">50+</div>
              <div className="text-muted-foreground">Scripts Disponíveis</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">24/7</div>
              <div className="text-muted-foreground">Suporte Online</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Pronto para começar?</h2>
            <p className="text-lg text-muted-foreground">
              Crie sua conta gratuitamente e explore nosso catálogo de scripts premium para FiveM.
            </p>
            <Button size="lg" className="glow-primary-hover" asChild>
              <Link href="/signup">
                Criar Conta Grátis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
