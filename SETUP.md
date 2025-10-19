# Guia de Configuração - ConeFiveM Hub

Este documento contém todas as instruções necessárias para configurar o Supabase, Abacate Pay, Discord e Vercel para o ConeFiveM Hub.

## 📋 Índice

1. [Configuração do Supabase](#configuração-do-supabase)
2. [Configuração do Abacate Pay](#configuração-do-abacate-pay)
3. [Configuração do Discord Webhook](#configuração-do-discord-webhook)
4. [Configuração da Vercel](#configuração-da-vercel)
5. [Variáveis de Ambiente](#variáveis-de-ambiente)
6. [Testes](#testes)

---

## 🗄️ Configuração do Supabase

### Passo 1: Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Clique em "New Project"
3. Preencha os dados:
   - **Name**: ConeFiveM Hub
   - **Database Password**: Crie uma senha forte e guarde
   - **Region**: Escolha a região mais próxima
4. Aguarde a criação do projeto (2-3 minutos)

### Passo 2: Executar Scripts SQL

⚠️ **IMPORTANTE**: Execute os scripts **NA ORDEM EXATA** abaixo. Não pule nenhum script!

Execute os scripts em **SQL Editor** no Supabase:

#### 1. Criar Tabelas (`scripts/01-create-tables.sql`)
**OBRIGATÓRIO - Execute primeiro!**

Cria todas as tabelas necessárias:
- `profiles` - Perfis de usuários (estende auth.users)
- `products` - Produtos da loja
- `licenses` - Licenças vendidas
- `payments` - Histórico de pagamentos
- `discord_clients` - Clientes do Discord

⚠️ **Sem este script, o sistema não funcionará!** Você verá erros 404 nas tabelas.

#### 2. Criar Storage Bucket (`scripts/02-create-storage.sql`)
Cria o bucket de armazenamento para avatares de usuários com políticas de acesso

#### 3. Criar Funções (`scripts/03-create-functions.sql`)
Cria funções auxiliares para geração de chaves e tokens

#### 4. Configurar RLS (`scripts/04-setup-rls.sql`)
Configura Row Level Security para proteger os dados

#### 5. Criar Admin (`scripts/05-seed-admin.sql`)
**IMPORTANTE**: Edite este arquivo e substitua `eucone.dev@gmail.com` pelo seu email antes de executar

### Passo 3: Obter Credenciais

1. Vá em **Settings** → **API**
2. Copie as seguintes informações:
   - **Project URL**: `https://seu-projeto.supabase.co`
   - **anon public**: Chave pública (começa com `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)
   - **service_role**: Chave de serviço (use com cuidado, nunca exponha no cliente)

### Passo 4: Configurar Autenticação

1. Vá em **Authentication** → **URL Configuration**
2. Adicione as seguintes URLs em **Redirect URLs**:
   - `http://localhost:3000/**` (desenvolvimento)
   - `https://seu-dominio.vercel.app/**` (produção)

3. Em **Authentication** → **Email Templates**, personalize os emails (opcional)

### Passo 5: Configurar Storage

1. Vá em **Storage** → **Policies**
2. Verifique se as políticas do bucket `avatars` foram criadas corretamente
3. Teste o upload fazendo upload de uma imagem de teste

---

## 💳 Configuração do Abacate Pay

### Passo 1: Criar Conta no Abacate Pay

1. Acesse [abacatepay.com](https://abacatepay.com)
2. Clique em "Criar Conta" ou "Registrar"
3. Preencha seus dados e confirme o email
4. Complete o processo de verificação KYC (Know Your Customer)

### Passo 2: Obter Chave de API

1. Faça login no dashboard do Abacate Pay
2. Vá em **Integração** → **Chaves de API**
3. Clique em **"Criar Chave"**
4. Adicione uma descrição (ex: "ConeFiveM Hub - Produção")
5. Copie a chave gerada e guarde em local seguro

⚠️ **Importante**: 
- Chaves criadas em **Dev Mode** processam transações de teste
- Chaves criadas em **Produção** processam transações reais
- Comece sempre em Dev Mode para testes

### Passo 3: Configurar Webhook

Os webhooks permitem que o sistema receba notificações automáticas quando um pagamento é confirmado.

1. No dashboard do Abacate Pay, vá em **Integração** → **Webhooks**
2. Clique em **"Criar Webhook"**
3. Preencha os campos:
   - **Nome**: ConeFiveM Hub Webhook
   - **URL**: `https://seu-dominio.vercel.app/api/webhooks/abacate-pay`
   - **Secret**: Gere uma string aleatória segura (ex: use um gerador de senhas)
4. Salve o webhook

⚠️ **Guarde o Secret**: Você precisará adicionar este secret nas variáveis de ambiente.

### Passo 4: Testar em Dev Mode

Antes de ir para produção, teste o sistema em Dev Mode:

1. Use uma chave de API criada em Dev Mode
2. Faça uma compra de teste no sistema
3. Use a opção **"Simular Pagamento"** no dashboard do Abacate Pay:
   - Vá em **Transações** → encontre o PIX criado
   - Clique em **"Simular Pagamento"**
   - Verifique se a licença foi gerada automaticamente

### Passo 5: Ir para Produção

Quando estiver pronto para aceitar pagamentos reais:

1. Complete a verificação da sua conta no Abacate Pay
2. Crie uma nova chave de API em **modo Produção**
3. Atualize a variável `ABACATE_PAY_API_KEY` na Vercel com a chave de produção
4. Verifique se o webhook está configurado para a URL de produção

### Taxas e Limites

- **Taxa por transação PIX**: Consulte o dashboard do Abacate Pay
- **Tempo de expiração padrão**: 1 hora (3600 segundos)
- **Confirmação de pagamento**: Instantânea via webhook

### Documentação Oficial

Para mais detalhes, consulte:
- [Documentação Abacate Pay](https://docs.abacatepay.com)
- [Criar PIX QR Code](https://docs.abacatepay.com/pages/pix-qrcode/create)
- [Webhooks](https://docs.abacatepay.com/pages/webhooks)

---

## 🔔 Configuração do Discord Webhook

O sistema envia notificações automáticas para o Discord quando:
- Um pagamento é confirmado
- Um novo produto é adicionado

### Passo 1: Criar Webhook no Discord

1. Abra o Discord e vá para o servidor onde deseja receber notificações
2. Clique com botão direito no canal desejado → **Editar Canal**
3. Vá em **Integrações** → **Webhooks**
4. Clique em **Criar Webhook**
5. Configure o webhook:
   - **Nome**: ConeFiveM Hub
   - **Canal**: Escolha o canal para notificações
   - **Avatar**: (Opcional) Adicione uma imagem
6. Clique em **Copiar URL do Webhook**
7. Salve a URL (você precisará dela nas variáveis de ambiente)

### Passo 2: Formato da URL do Webhook

A URL do webhook tem este formato:
\`\`\`
https://discord.com/api/webhooks/1234567890/AbCdEfGhIjKlMnOpQrStUvWxYz
\`\`\`

### Passo 3: Testar Webhook

Você pode testar o webhook manualmente usando curl:

\`\`\`bash
curl -X POST "SUA_WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "embeds": [{
      "title": "🧪 Teste de Webhook",
      "description": "Se você está vendo isso, o webhook está funcionando!",
      "color": 65340
    }]
  }'
\`\`\`

### Notificações Enviadas

#### 1. Pagamento Confirmado
Quando um pagamento PIX é confirmado via Abacate Pay, o Discord recebe:
- 🎉 Título: "Nova Compra Realizada!"
- Produto comprado
- Valor da compra
- Nome e email do cliente
- IP do cliente
- Data e hora
- ID da compra

#### 2. Novo Produto Adicionado
Quando um admin adiciona um novo produto:
- 📦 Título: "Novo Produto Adicionado!"
- Nome do produto
- Preço
- Categoria
- Tags (se houver)

### Segurança

⚠️ **Importante**:
- Mantenha a URL do webhook em segredo
- Não compartilhe a URL publicamente
- Se a URL vazar, delete o webhook no Discord e crie um novo
- Use variáveis de ambiente, nunca hardcode a URL

### Personalização

Para personalizar as notificações, edite o arquivo `lib/discord-webhook.ts`:
- Altere cores dos embeds (campo `color`)
- Adicione ou remova campos
- Modifique o formato das mensagens
- Adicione imagens ou thumbnails

### Cores dos Embeds

- Verde neon (sucesso): `0x00ff9c` (65340)
- Azul: `0x0099ff`
- Vermelho (erro): `0xff0000`
- Amarelo (aviso): `0xffcc00`

---

## ☁️ Configuração da Vercel

### Passo 1: Conectar Repositório

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "New Project"
3. Importe seu repositório do GitHub
4. Configure o projeto:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: .next

### Passo 2: Configurar Variáveis de Ambiente

Na Vercel, vá em **Settings** → **Environment Variables** e adicione:

#### Supabase
\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
\`\`\`

#### Abacate Pay
\`\`\`env
ABACATE_PAY_API_KEY=sua_chave_api_abacate_pay
ABACATE_PAY_WEBHOOK_SECRET=seu_secret_webhook
\`\`\`

#### Discord
\`\`\`env
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/SEU_WEBHOOK_ID/SEU_WEBHOOK_TOKEN
\`\`\`

⚠️ **Importante**: 
- Adicione para **Production**, **Preview** e **Development**
- Use chaves de Dev Mode para Preview e Development
- Use chaves de Produção apenas para Production
- Nunca commite essas chaves no GitHub

### Passo 3: Deploy

1. Clique em "Deploy"
2. Aguarde o build (2-3 minutos)
3. Acesse seu site em `https://seu-projeto.vercel.app`

### Passo 4: Configurar Domínio Personalizado (Opcional)

1. Em **Settings** → **Domains**
2. Adicione seu domínio
3. Configure os DNS conforme instruções da Vercel
4. **IMPORTANTE**: Após configurar o domínio, atualize a URL do webhook no Abacate Pay

---

## 🔐 Variáveis de Ambiente

### Desenvolvimento (.env.local)

\`\`\`env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Redirect URL para desenvolvimento
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000

# Abacate Pay (Dev Mode)
ABACATE_PAY_API_KEY=sua_chave_dev_mode_aqui
ABACATE_PAY_WEBHOOK_SECRET=seu_secret_webhook_aqui

# Discord Webhook
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/SEU_WEBHOOK_ID/SEU_WEBHOOK_TOKEN
\`\`\`

### Produção (Vercel)

\`\`\`env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Abacate Pay (Produção)
ABACATE_PAY_API_KEY=sua_chave_producao_aqui
ABACATE_PAY_WEBHOOK_SECRET=seu_secret_webhook_aqui

# Discord Webhook
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/SEU_WEBHOOK_ID/SEU_WEBHOOK_TOKEN
\`\`\`

---

## 🧪 Testes

### Testar Localmente

1. **Instalar dependências**
\`\`\`bash
npm install
\`\`\`

2. **Configurar .env.local**
\`\`\`bash
cp .env.example .env.local
# Edite .env.local com suas credenciais
\`\`\`

3. **Iniciar servidor**
\`\`\`bash
npm run dev
\`\`\`

4. **Testar funcionalidades**:
   - ✅ Registro de usuário
   - ✅ Login
   - ✅ Visualizar produtos
   - ✅ Dashboard
   - ✅ Criar primeiro admin (via SQL)
   - ✅ Painel admin
   - ✅ Criar produto
   - ✅ Gerar licença
   - ✅ Compartilhar link
   - ✅ **Criar pagamento PIX**
   - ✅ **Simular pagamento no Abacate Pay**
   - ✅ **Verificar geração automática de licença**

### Testar Pagamentos (Dev Mode)

1. **Criar uma compra de teste**:
   - Faça login no sistema
   - Escolha um produto
   - Clique em "Comprar agora"
   - Será gerado um QR Code PIX

2. **Simular pagamento**:
   - Acesse o dashboard do Abacate Pay
   - Vá em **Transações**
   - Encontre o PIX criado
   - Clique em **"Simular Pagamento"**

3. **Verificar resultado**:
   - O webhook será chamado automaticamente
   - A compra será marcada como "completed"
   - Uma licença será gerada automaticamente
   - Verifique em **Dashboard** → **Minhas Licenças**

### Testar Notificações Discord

1. **Testar notificação de produto**:
   - Faça login como admin
   - Vá em **Admin** → **Produtos**
   - Crie um novo produto
   - Verifique se a notificação apareceu no Discord

2. **Testar notificação de pagamento**:
   - Faça uma compra de teste
   - Simule o pagamento no Abacate Pay
   - Verifique se a notificação de compra apareceu no Discord

### Checklist de Produção

Antes de ir para produção, verifique:

- [ ] Todas as variáveis de ambiente configuradas na Vercel
- [ ] RLS habilitado em todas as tabelas do Supabase
- [ ] URLs de redirect configuradas no Supabase
- [ ] Pelo menos um usuário admin criado
- [ ] Produtos de teste removidos (se aplicável)
- [ ] Domínio personalizado configurado (opcional)
- [ ] SSL/HTTPS funcionando
- [ ] Emails de autenticação funcionando
- [ ] Backup do banco de dados configurado
- [ ] **Chave de API do Abacate Pay em modo Produção**
- [ ] **Webhook configurado com URL de produção**
- [ ] **Teste de pagamento real realizado**
- [ ] **Verificação KYC completa no Abacate Pay**
- [ ] **Discord Webhook configurado e testado**
- [ ] **Notificações do Discord funcionando**

---

## 🆘 Troubleshooting

### Erro: "Invalid API key"
- Verifique se as variáveis de ambiente estão corretas
- Confirme que copiou as chaves do projeto correto no Supabase

### Erro: "Row Level Security"
- Certifique-se de que executou todos os scripts SQL
- Verifique se as políticas RLS foram criadas corretamente

### Erro: "Redirect URL not allowed"
- Adicione a URL em Authentication → URL Configuration no Supabase
- Inclua `/**` no final da URL

### Erro de CORS
- Verifique se `NEXT_PUBLIC_SUPABASE_URL` está correto
- Confirme que a URL não tem barra no final

### Não consigo fazer login como admin
- Execute o SQL para atualizar o role do seu usuário
- Faça logout e login novamente

### Erro: "ABACATE_PAY_API_KEY is not configured"
- Verifique se adicionou a variável de ambiente na Vercel
- Confirme que a variável está disponível em todos os ambientes (Production, Preview, Development)
- Faça um novo deploy após adicionar a variável

### Pagamento não é confirmado automaticamente
- Verifique se o webhook está configurado corretamente no Abacate Pay
- Confirme que a URL do webhook está acessível publicamente
- Verifique os logs do webhook na Vercel (Functions → Logs)
- Confirme que o `ABACATE_PAY_WEBHOOK_SECRET` está correto

### QR Code não é gerado
- Verifique se a chave de API do Abacate Pay está válida
- Confirme que você tem saldo/créditos suficientes (se aplicável)
- Verifique os logs da API na Vercel

### Webhook retorna 401 Unauthorized
- Verifique se o `ABACATE_PAY_WEBHOOK_SECRET` está correto
- Confirme que o secret configurado no Abacate Pay é o mesmo da variável de ambiente

### Discord Webhook não funciona

- Verifique se a URL do webhook está correta
- Confirme que o webhook não foi deletado no Discord
- Verifique os logs da Vercel para ver se há erros
- Teste o webhook manualmente com curl
- Verifique se o canal do Discord ainda existe

### Notificações não aparecem no Discord

- Confirme que a variável `DISCORD_WEBHOOK_URL` está configurada
- Verifique se você tem permissões no canal do Discord
- Veja os logs do servidor para erros de envio
- Teste com o comando curl fornecido acima

---

## 📊 Fluxo de Pagamento

### Como funciona o sistema de pagamento:

1. **Usuário seleciona produto** → Clica em "Comprar agora"
2. **Sistema gera PIX** → Cria QR Code via Abacate Pay API
3. **Compra registrada** → Status "pending" no banco de dados
4. **Usuário paga** → Escaneia QR Code e confirma pagamento
5. **Abacate Pay notifica** → Envia webhook para o sistema
6. **Sistema processa** → Atualiza compra para "completed"
7. **Licença gerada** → Cria licença automaticamente
8. **Discord notificado** → Envia notificação da compra para o Discord
9. **Usuário recebe** → Licença disponível no dashboard

### Segurança

- ✅ Todas as transações são processadas pelo Abacate Pay
- ✅ Webhooks são validados com secret
- ✅ Dados sensíveis nunca são expostos ao cliente
- ✅ Row Level Security protege dados no banco
- ✅ Chaves de API são armazenadas como variáveis de ambiente
- ✅ Discord Webhook URL mantida em segredo

---

**Última atualização**: Janeiro 2025
