import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Book, Code, Download, HelpCircle, Key, ShoppingCart } from "lucide-react"
import Link from "next/link"

export default function DocsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Documentação</h1>
          <p className="text-lg text-muted-foreground">
            Guias completos para usar o ConeFiveM Hub e integrar nossos produtos ao seu servidor.
          </p>
        </div>

        <div className="grid gap-6">
          {/* Getting Started */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Book className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Primeiros Passos</CardTitle>
                  <CardDescription>Como começar a usar o ConeFiveM Hub</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-semibold mb-2">1. Criar uma Conta</h4>
                <p className="text-sm text-muted-foreground">
                  Acesse a página de{" "}
                  <Link href="/signup" className="text-primary hover:underline">
                    cadastro
                  </Link>{" "}
                  e crie sua conta usando email e senha.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">2. Explorar a Loja</h4>
                <p className="text-sm text-muted-foreground">
                  Navegue pela nossa{" "}
                  <Link href="/store" className="text-primary hover:underline">
                    loja
                  </Link>{" "}
                  e encontre scripts, assets e mapas para seu servidor.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">3. Realizar Compra</h4>
                <p className="text-sm text-muted-foreground">
                  Escolha um produto e finalize a compra usando PIX. O pagamento é processado instantaneamente.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Purchases */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <ShoppingCart className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Como Comprar</CardTitle>
                  <CardDescription>Processo de compra e pagamento</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-semibold mb-2">Pagamento via PIX</h4>
                <p className="text-sm text-muted-foreground">
                  Aceitamos pagamentos via PIX através da Abacate Pay. Após selecionar um produto, você receberá um QR
                  Code para pagamento. O código expira em 15 minutos.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Confirmação Automática</h4>
                <p className="text-sm text-muted-foreground">
                  Assim que o pagamento for confirmado, sua licença será gerada automaticamente e estará disponível no
                  seu dashboard.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Licenses */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Key className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Gerenciar Licenças</CardTitle>
                  <CardDescription>Como usar suas licenças</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-semibold mb-2">Acessar Licenças</h4>
                <p className="text-sm text-muted-foreground">
                  Todas as suas licenças ficam disponíveis no{" "}
                  <Link href="/dashboard/licenses" className="text-primary hover:underline">
                    painel de licenças
                  </Link>
                  . Lá você pode visualizar, compartilhar e gerenciar suas chaves.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Compartilhar Licenças</h4>
                <p className="text-sm text-muted-foreground">
                  Você pode gerar links de compartilhamento temporários para suas licenças. Os links expiram após 24
                  horas por segurança.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Installation */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Download className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Instalação</CardTitle>
                  <CardDescription>Como instalar os produtos no seu servidor</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-semibold mb-2">Download dos Arquivos</h4>
                <p className="text-sm text-muted-foreground">
                  Após a compra, você receberá acesso ao download dos arquivos. Cada produto inclui instruções
                  específicas de instalação.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Configuração</h4>
                <p className="text-sm text-muted-foreground">
                  Siga as instruções incluídas no README de cada produto. A maioria dos scripts requer apenas copiar
                  para a pasta resources do seu servidor.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* API */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Code className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>API e Integrações</CardTitle>
                  <CardDescription>Para desenvolvedores</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-semibold mb-2">Webhooks</h4>
                <p className="text-sm text-muted-foreground">
                  Configure webhooks do Discord para receber notificações de vendas e atualizações em tempo real.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Validação de Licenças</h4>
                <p className="text-sm text-muted-foreground">
                  Nossos produtos incluem sistema de validação de licenças para proteger seu investimento.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Support */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <HelpCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Precisa de Ajuda?</CardTitle>
                  <CardDescription>Entre em contato conosco</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Se você tiver dúvidas ou problemas, nossa equipe está pronta para ajudar:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  • Acesse nossa{" "}
                  <Link href="/support" className="text-primary hover:underline">
                    Central de Ajuda
                  </Link>
                </li>
                <li>
                  • Entre no nosso{" "}
                  <a
                    href="https://discord.gg/conefivem"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Discord
                  </a>
                </li>
                <li>• Envie um email para suporte@conefivem.com</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
