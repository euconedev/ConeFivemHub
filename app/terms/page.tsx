import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Termos de Uso</h1>
          <p className="text-muted-foreground">Última atualização: {new Date().toLocaleDateString("pt-BR")}</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>1. Aceitação dos Termos</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <p>
                Ao acessar e usar o ConeFiveM Hub, você concorda em cumprir e estar vinculado aos seguintes termos e
                condições de uso. Se você não concordar com qualquer parte destes termos, não deverá usar nossos
                serviços.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Licenças e Propriedade Intelectual</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <p>
                Todos os produtos vendidos no ConeFiveM Hub são licenciados, não vendidos. Ao adquirir um produto, você
                recebe uma licença de uso não exclusiva e intransferível.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Você pode usar o produto em um servidor FiveM de sua propriedade</li>
                <li>Você não pode revender, redistribuir ou compartilhar o produto</li>
                <li>Você não pode modificar o produto para remover sistemas de proteção</li>
                <li>Você não pode fazer engenharia reversa do código protegido</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Pagamentos e Reembolsos</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <p>
                Aceitamos pagamentos via PIX através da plataforma Abacate Pay. Todos os preços estão em Reais (BRL) e
                incluem impostos aplicáveis.
              </p>
              <p className="font-semibold text-foreground">Política de Reembolso:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Reembolsos podem ser solicitados em até 7 dias após a compra</li>
                <li>O produto não deve ter sido usado ou instalado</li>
                <li>Problemas técnicos serão analisados caso a caso</li>
                <li>Reembolsos são processados em até 10 dias úteis</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Conta de Usuário</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <p>Para usar nossos serviços, você deve criar uma conta fornecendo informações precisas e completas.</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Você é responsável por manter a segurança da sua conta</li>
                <li>Você deve notificar imediatamente sobre qualquer uso não autorizado</li>
                <li>Não compartilhe suas credenciais de acesso</li>
                <li>Você é responsável por todas as atividades em sua conta</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Uso Aceitável</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <p>Você concorda em não usar nossos serviços para:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Violar leis ou regulamentos aplicáveis</li>
                <li>Infringir direitos de propriedade intelectual</li>
                <li>Distribuir malware ou código malicioso</li>
                <li>Realizar atividades fraudulentas</li>
                <li>Assediar, ameaçar ou prejudicar outros usuários</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Suporte e Atualizações</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <p>
                Fornecemos suporte técnico e atualizações para nossos produtos de acordo com as seguintes condições:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Suporte técnico está disponível via Discord e email</li>
                <li>Atualizações de segurança são fornecidas gratuitamente</li>
                <li>Novas funcionalidades podem ser cobradas separadamente</li>
                <li>O suporte é fornecido em português</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Limitação de Responsabilidade</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <p>
                O ConeFiveM Hub não se responsabiliza por danos diretos, indiretos, incidentais ou consequenciais
                resultantes do uso ou incapacidade de usar nossos produtos.
              </p>
              <p>Os produtos são fornecidos "como estão" sem garantias de qualquer tipo.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Privacidade e Dados</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <p>Coletamos e processamos dados pessoais de acordo com a LGPD (Lei Geral de Proteção de Dados).</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Coletamos apenas dados necessários para fornecer nossos serviços</li>
                <li>Seus dados não são vendidos a terceiros</li>
                <li>Você pode solicitar a exclusão de seus dados a qualquer momento</li>
                <li>Usamos criptografia para proteger informações sensíveis</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. Modificações dos Termos</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <p>
                Reservamos o direito de modificar estes termos a qualquer momento. Mudanças significativas serão
                notificadas por email ou através do site.
              </p>
              <p>O uso continuado dos serviços após as modificações constitui aceitação dos novos termos.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>10. Contato</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <p>Para questões sobre estes termos, entre em contato:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Email: legal@conefivem.com</li>
                <li>Discord: discord.gg/conefivem</li>
                <li>Suporte: suporte@conefivem.com</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
