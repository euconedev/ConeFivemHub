import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Star, Package, Headphones } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5" />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-sm">
              <Zap className="h-4 w-4 text-purple-400" />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-medium">
                Cone Studios - Transforme seu servidor FiveM
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance leading-tight text-white">
              Transforme seu servidor em uma{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
                experiência única
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Scripts premium, MLOs exclusivos, veículos personalizados e muito mais. Tudo com qualidade garantida e
              suporte completo.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="glow-primary-hover gradient-primary text-white font-semibold" asChild>
                <Link href="/store">
                  Explorar Loja
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-card border-purple-500/30 hover:border-purple-500/50 hover:bg-card/80"
                asChild
              >
                <Link href="/login">Fazer Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Products Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white">PRODUTOS</h2>
              </div>

              <div className="grid gap-4">
                <div className="bg-card border border-border p-6 rounded-xl hover:border-purple-500/50 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg icon-accent-purple flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      🏢
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-white">Bases Completas</h3>
                      <p className="text-sm text-muted-foreground">
                        Tenha seu servidor com scripts prontos e otimizados.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border p-6 rounded-xl hover:border-pink-500/50 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg icon-accent-pink flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      👕
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-white">Roupas & Skins</h3>
                      <p className="text-sm text-muted-foreground">
                        Visual exclusivo e identidade única para sua cidade.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border p-6 rounded-xl hover:border-purple-500/50 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg icon-accent-purple flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      🚗
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-white">Veículos exclusivos</h3>
                      <p className="text-sm text-muted-foreground">Modelos personalizados e de alto desempenho.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border p-6 rounded-xl hover:border-pink-500/50 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg icon-accent-pink flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      🎨
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-white">Design Gráfico</h3>
                      <p className="text-sm text-muted-foreground">Identidade visual completa para sua cidade!</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border p-6 rounded-xl hover:border-purple-500/50 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg icon-accent-purple flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      🔑
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-white">Key's</h3>
                      <p className="text-sm text-muted-foreground">Keys Patreon 64,128 e 2048 slots</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Services Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-lg gradient-secondary flex items-center justify-center">
                  <Headphones className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white">SERVIÇOS</h2>
              </div>

              <div className="grid gap-4">
                <div className="bg-card border border-border p-6 rounded-xl hover:border-purple-500/50 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg icon-accent-purple flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      💻
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-white">Programador\Desenvolvedor</h3>
                      <p className="text-sm text-muted-foreground">
                        Atendimentos privados e personalizados para sua cidade.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border p-6 rounded-xl hover:border-pink-500/50 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg icon-accent-pink flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      🔧
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-white">Configuração Geral</h3>
                      <p className="text-sm text-muted-foreground">
                        Otimização e personalização de scripts para sua cidade.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border p-6 rounded-xl hover:border-purple-500/50 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg icon-accent-purple flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      🎧
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-white">Suporte VIP</h3>
                      <p className="text-sm text-muted-foreground">Atendimento premium sempre disponível</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border p-6 rounded-xl hover:border-pink-500/50 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg icon-accent-pink flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      📢
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-white">Divulgação</h3>
                      <p className="text-sm text-muted-foreground">
                        Aumente a visibilidade do seu servidor com a gente.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border p-6 rounded-xl hover:border-purple-500/50 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg icon-accent-purple flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      🎵
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-white">Músicas exclusivas</h3>
                      <p className="text-sm text-muted-foreground">
                        Músicas para introduções, loadings, trailers e divulgações.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border p-6 rounded-xl hover:border-pink-500/50 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg icon-accent-pink flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      💼
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-white">Consultorias</h3>
                      <p className="text-sm text-muted-foreground">
                        Orientação especializada para aprimorar seu servidor.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-card border border-border p-8 rounded-2xl text-center group hover:scale-105 hover:border-purple-500/50 transition-all">
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                2018
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">DESDE</div>
            </div>
            <div className="bg-card border border-border p-8 rounded-2xl text-center group hover:scale-105 hover:border-purple-500/50 transition-all">
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                25+
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">BASES PRODUZIDAS</div>
            </div>
            <div className="bg-card border border-border p-8 rounded-2xl text-center group hover:scale-105 hover:border-purple-500/50 transition-all">
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                700+
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">BASES VENDIDAS</div>
            </div>
            <div className="bg-card border border-border p-8 rounded-2xl text-center group hover:scale-105 hover:border-purple-500/50 transition-all">
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                1000+
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">CLIENTES SATISFEITOS</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              O QUE NOSSOS{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                CLIENTES DIZEM
              </span>
            </h2>
            <p className="text-muted-foreground">Depoimentos reais de quem confia no nosso trabalho:</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border border-border p-6 rounded-xl space-y-4 hover:border-purple-500/50 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-xl">
                  Z
                </div>
                <div>
                  <div className="font-semibold text-white">ZACH PHILCO</div>
                  <div className="text-xs text-muted-foreground">17/10/2025 às 17:00</div>
                </div>
              </div>
              <div className="border-l-2 border-purple-500/50 pl-4 py-2">
                <p className="text-sm text-muted-foreground">
                  Base bem montada e estruturada, e bons Scripts! Até o momento não tenho o que reclamar, fiz um bom
                  investimento!
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">Avaliação: 5/5</span>
              </div>
            </div>

            <div className="bg-card border border-border p-6 rounded-xl space-y-4 hover:border-purple-500/50 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-cyan-400 flex items-center justify-center text-white font-bold text-xl">
                  D
                </div>
                <div>
                  <div className="font-semibold text-white">Dmitry Petrov</div>
                  <div className="text-xs text-muted-foreground">16/10/2025 às 23:09</div>
                </div>
              </div>
              <div className="border-l-2 border-purple-500/50 pl-4 py-2">
                <p className="text-sm text-muted-foreground">
                  Acabei de comprar base SP V7.0 e está sensacional, muito bem feita e pronta pra uso.
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">Avaliação: 5/5</span>
              </div>
            </div>

            <div className="bg-card border border-border p-6 rounded-xl space-y-4 hover:border-purple-500/50 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-400 flex items-center justify-center text-white font-bold text-xl">
                  N
                </div>
                <div>
                  <div className="font-semibold text-white">Noering</div>
                  <div className="text-xs text-muted-foreground">14/10/2025 às 03:42</div>
                </div>
              </div>
              <div className="border-l-2 border-purple-500/50 pl-4 py-2">
                <p className="text-sm text-muted-foreground">
                  Base v7 é show demais, recomendo comprarem e o suporte é 1000/100
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">Avaliação: 5/5</span>
              </div>
            </div>

            <div className="bg-card border border-border p-6 rounded-xl space-y-4 hover:border-purple-500/50 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center text-white font-bold text-xl">
                  G
                </div>
                <div>
                  <div className="font-semibold text-white">Goulart</div>
                  <div className="text-xs text-muted-foreground">13/10/2025 às 21:03</div>
                </div>
              </div>
              <div className="border-l-2 border-purple-500/50 pl-4 py-2">
                <p className="text-sm text-muted-foreground">
                  Acabei de comprar e estou testando a base do RJ, mas o atendimento foi ótimo e a entrega do produto
                  também.
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">Avaliação: 5/5</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10" />
        <div className="container mx-auto max-w-3xl relative">
          <div className="bg-card border border-border p-12 rounded-3xl text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Pronto para começar?</h2>
            <p className="text-lg text-muted-foreground">
              Crie sua conta gratuitamente e explore nosso catálogo completo de produtos premium.
            </p>
            <Button size="lg" className="glow-primary-hover gradient-primary text-white font-semibold" asChild>
              <Link href="/signup">
                Criar Conta Grátis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
