import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Star, Package, Headphones, Building, Shirt, Car, Paintbrush, Key, Laptop, Wrench, Megaphone, Music, Briefcase } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border-2 border-border text-sm">
              <Zap className="h-4 w-4 text-primary" />
              <span className="font-medium text-primary">Cone Studios - Transforme seu servidor FiveM</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white">
              Transforme seu servidor em uma{" "}
              <span className="text-primary">experiência única</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Scripts premium, MLOs exclusivos, veículos personalizados e muito mais. Tudo com qualidade garantida e suporte completo.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold" asChild>
                <Link href="/store">
                  Explorar Loja
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-border hover:border-primary" asChild>
                <Link href="/login">Fazer Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-card">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white">PRODUTOS</h2>
              </div>

              <div className="grid gap-4">
                {[{
                  icon: <Package className="h-6 w-6 text-white" />,
                  title: "Bases Completas",
                  desc: "Scripts prontos e otimizados."
                },
                {
                  icon: <Shirt className="h-6 w-6 text-white" />,
                  title: "Roupas & Skins",
                  desc: "Visual exclusivo para sua cidade."
                },
                {
                  icon: <Car className="h-6 w-6 text-white" />,
                  title: "Veículos exclusivos",
                  desc: "Modelos personalizados."
                },
                {
                  icon: <Paintbrush className="h-6 w-6 text-white" />,
                  title: "Design Gráfico",
                  desc: "Identidade visual completa."
                },
                {
                  icon: <Key className="h-6 w-6 text-white" />,
                  title: "Key's",
                  desc: "Patreon 64, 128 e 2048 slots."
                },
                ].map((item, i) => (
                  <div key={i} className="bg-background border-2 border-border p-6 rounded-xl hover:border-primary transition-all group">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1 text-white">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
                  <Headphones className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white">SERVIÇOS</h2>
              </div>

              <div className="grid gap-4">
                {[{
                  icon: <Laptop className="h-6 w-6 text-white" />,
                  title: "Programador\\Desenvolvedor",
                  desc: "Atendimentos privados."
                },
                {
                  icon: <Wrench className="h-6 w-6 text-white" />,
                  title: "Configuração Geral",
                  desc: "Otimização de scripts."
                },
                {
                  icon: <Headphones className="h-6 w-6 text-white" />,
                  title: "Suporte VIP",
                  desc: "Atendimento premium."
                },
                {
                  icon: <Megaphone className="h-6 w-6 text-white" />,
                  title: "Divulgação",
                  desc: "Aumente a visibilidade."
                },
                {
                  icon: <Music className="h-6 w-6 text-white" />,
                  title: "Músicas exclusivas",
                  desc: "Para trailers e loadings."
                },
                {
                  icon: <Briefcase className="h-6 w-6 text-white" />,
                  title: "Consultorias",
                  desc: "Orientação especializada."
                },
                ].map((item, i) => (
                  <div key={i} className="bg-background border-2 border-border p-6 rounded-xl hover:border-primary transition-all group">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1 text-white">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "2018", label: "DESDE" },
              { value: "25+", label: "BASES PRODUZIDAS" },
              { value: "700+", label: "BASES VENDIDAS" },
              { value: "1000+", label: "CLIENTES SATISFEITOS" },
            ].map((stat, i) => (
              <div key={i} className="bg-card border-2 border-border p-8 rounded-2xl text-center group hover:border-primary transition-all">
                <div className="text-5xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              O QUE NOSSOS <span className="text-primary">CLIENTES DIZEM</span>
            </h2>
            <p className="text-muted-foreground">Depoimentos reais:</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: "ZACH PHILCO", date: "17/10/2025 às 17:00", text: "Base bem montada e estruturada...", avatar: "Z", color: "bg-primary" },
              { name: "Dmitry Petrov", date: "16/10/2025 às 23:09", text: "Base SP V7.0 sensacional...", avatar: "D", color: "bg-blue-500" },
              { name: "Noering", date: "14/10/2025 às 03:42", text: "Base v7 é show demais...", avatar: "N", color: "bg-green-500" },
              { name: "Goulart", date: "13/10/2025 às 21:03", text: "Atendimento ótimo e entrega rápida...", avatar: "G", color: "bg-primary" },
            ].map((r, i) => (
              <div key={i} className="bg-card border-2 border-border p-6 rounded-xl space-y-4 hover:border-primary transition-all">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full ${r.color} flex items-center justify-center text-white font-bold text-xl`}>
                    {r.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{r.date}</div>
                  </div>
                </div>
                <div className="border-l-2 border-primary pl-4 py-2">
                  <p className="text-sm text-muted-foreground">{r.text}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">5/5</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-card">
        <div className="container mx-auto max-w-3xl">
          <div className="bg-background border-2 border-border p-12 rounded-3xl text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Pronto para começar?</h2>
            <p className="text-lg text-muted-foreground">
              Crie sua conta gratuitamente e explore nosso catálogo completo.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold" asChild>
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
