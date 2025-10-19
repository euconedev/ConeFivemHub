import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, Mail, FileQuestion, Clock } from "lucide-react"
import Link from "next/link"

export default function SupportPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Central de Ajuda</h1>
          <p className="text-lg text-muted-foreground">
            Estamos aqui para ajudar você. Escolha a melhor forma de entrar em contato.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Discord Support */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Discord</CardTitle>
                  <CardDescription>Suporte em tempo real</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Entre no nosso servidor do Discord para suporte instantâneo da comunidade e equipe.
              </p>
              <Button asChild className="w-full">
                <a href="https://discord.gg/conefivem" target="_blank" rel="noopener noreferrer">
                  Entrar no Discord
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Email Support */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Email</CardTitle>
                  <CardDescription>Suporte por email</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Envie um email detalhado e nossa equipe responderá em até 24 horas.
              </p>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <a href="mailto:suporte@conefivem.com">Enviar Email</a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* FAQ */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileQuestion className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Perguntas Frequentes</h2>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Como faço para comprar um produto?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Navegue pela nossa loja, selecione o produto desejado e clique em "Comprar Agora". Você será
                  redirecionado para a página de pagamento onde poderá pagar via PIX usando o QR Code gerado.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quanto tempo leva para receber minha licença?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Após a confirmação do pagamento via PIX, sua licença é gerada automaticamente e fica disponível
                  imediatamente no seu dashboard. O processo geralmente leva menos de 1 minuto.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Posso compartilhar minha licença?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Você pode gerar links de compartilhamento temporários para suas licenças através do dashboard. Os
                  links expiram após 24 horas por questões de segurança. Não compartilhe suas chaves de licença
                  diretamente.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">O pagamento via PIX é seguro?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Sim! Utilizamos a Abacate Pay, uma plataforma de pagamentos segura e confiável. Todos os pagamentos
                  são processados de forma criptografada e seguem os padrões de segurança do mercado.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Posso solicitar reembolso?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Reembolsos são analisados caso a caso. Entre em contato com nosso suporte através do Discord ou email
                  explicando o motivo da solicitação. Consulte nossos{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    Termos de Uso
                  </Link>{" "}
                  para mais informações.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Como instalo os produtos no meu servidor?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Cada produto inclui instruções detalhadas de instalação. Geralmente, basta fazer o download dos
                  arquivos e copiá-los para a pasta resources do seu servidor FiveM. Consulte nossa{" "}
                  <Link href="/docs" className="text-primary hover:underline">
                    documentação
                  </Link>{" "}
                  para guias completos.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Response Time */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Tempo de Resposta</CardTitle>
                <CardDescription>Quando você pode esperar nossa resposta</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Discord: Resposta imediata durante horário comercial (9h-18h BRT)</li>
              <li>• Email: Até 24 horas em dias úteis</li>
              <li>• Finais de semana: Suporte limitado, respostas em até 48 horas</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
