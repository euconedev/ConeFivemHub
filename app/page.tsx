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
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(168,85,247,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.1),transparent_50%)]" />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm">
              <Zap className="h-4 w-4 text-purple-400" />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-medium">
                A loja mais completa para transformar seu servidor FiveM
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance leading-tight">
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
                className="glass border-purple-500/30 hover:border-purple-500/50 bg-transparent"
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
                <h2 className="text-3xl font-bold">PRODUTOS</h2>
              </div>

              <div className="grid gap-4">
                <div className="glass p-6 rounded-xl hover:border-purple-500/30 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      🏢
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Bases Completas</h3>
                      <p className="text-sm text-muted-foreground">
                        Tenha seu servidor com scripts prontos e otimizados.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass p-6 rounded-xl hover:border-purple-500/30 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      👕
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Roupas & Skins</h3>
                      <p className="text-sm text-muted-foreground">
                        Visual exclusivo e identidade única para sua cidade.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass p-6 rounded-xl hover:border-purple-500/30 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      🚗
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Veículos exclusivos</h3>
                      <p className="text-sm text-muted-foreground">Modelos personalizados e de alto desempenho.</p>
                    </div>
                  </div>
                </div>

                <div className="glass p-6 rounded-xl hover:border-purple-500/30 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      🎨
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Design Gráfico</h3>
                      <p className="text-sm text-muted-foreground">Identidade visual completa para sua cidade!</p>
                    </div>
                  </div>
                </div>

                <div className="glass p-6 rounded-xl hover:border-purple-500/30 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      🔑
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Key's</h3>
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
                <h2 className="text-3xl font-bold">SERVIÇOS</h2>
              </div>

              <div className="grid gap-4">
                <div className="glass p-6 rounded-xl hover:border-pink-500/30 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      💻
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Programador\Desenvolvedor</h3>
                      <p className="text-sm text-muted-foreground">
                        Atendimentos privados e personalizados para sua cidade.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass p-6 rounded-xl hover:border-pink-500/30 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      🔧
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Configuração Geral</h3>
                      <p className="text-sm text-muted-foreground">
                        Otimização e personalização de scripts para sua cidade.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass p-6 rounded-xl hover:border-pink-500/30 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      🎧
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Suporte VIP</h3>
                      <p className="text-sm text-muted-foreground">Atendimento premium sempre disponível</p>
                    </div>
                  </div>
                </div>

                <div className="glass p-6 rounded-xl hover:border-pink-500/30 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      📢
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Divulgação</h3>
                      <p className="text-sm text-muted-foreground">
                        Aumente a visibilidade do seu servidor com a gente.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass p-6 rounded-xl hover:border-pink-500/30 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      🎵
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Músicas exclusivas</h3>
                      <p className="text-sm text-muted-foreground">
                        Músicas para introduções, loadings, trailers e divulgações.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass p-6 rounded-xl hover:border-pink-500/30 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      💼
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Consultorias</h3>
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

      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="glass-strong p-8 rounded-2xl text-center group hover:scale-105 transition-transform">
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                2018
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">DESDE</div>
            </div>
            <div className="glass-strong p-8 rounded-2xl text-center group hover:scale-105 transition-transform">
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                25+
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">BASES PRODUZIDAS</div>
            </div>
            <div className="glass-strong p-8 rounded-2xl text-center group hover:scale-105 transition-transform">
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                700+
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">BASES VENDIDAS</div>
            </div>
            <div className="glass-strong p-8 rounded-2xl text-center group hover:scale-105 transition-transform">
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O QUE NOSSOS{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                CLIENTES DIZEM
              </span>
            </h2>
            <p className="text-muted-foreground">Depoimentos reais de quem confia no nosso trabalho:</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass p-6 rounded-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-xl">
                  Z
                </div>
                <div>
                  <div className="font-semibold">ZACH PHILCO</div>
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

            <div className="glass p-6 rounded-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-cyan-400 flex items-center justify-center text-white font-bold text-xl">
                  D
                </div>
                <div>
                  <div className="font-semibold">Dmitry Petrov</div>
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

            <div className="glass p-6 rounded-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-400 flex items-center justify-center text-white font-bold text-xl">
                  N
                </div>
                <div>
                  <div className="font-semibold">Noering</div>
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

            <div className="glass p-6 rounded-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center text-white font-bold text-xl">
                  G
                </div>
                <div>
                  <div className="font-semibold">Goulart</div>
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
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-transparent" />
        <div className="container mx-auto max-w-3xl relative">
          <div className="glass-strong p-12 rounded-3xl text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Pronto para começar?</h2>
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
