# ConeFiveM Hub

Sistema completo de gerenciamento e venda de produtos para servidores FiveM, com sistema de licenças, compartilhamento de links e painel administrativo.

## 🚀 Funcionalidades

### Para Usuários
- **Autenticação Completa**: Sistema de login e registro com validação
- **Loja de Produtos**: Navegação e compra de scripts e recursos para FiveM
- **Dashboard Pessoal**: Visualização de compras e licenças ativas
- **Sistema de Licenças**: Gerenciamento de chaves de ativação
- **Compartilhamento de Links**: Geração de links únicos para compartilhar produtos
- **Perfil de Usuário**: Gerenciamento de informações pessoais

### Para Administradores
- **Painel Administrativo**: Dashboard completo com estatísticas
- **Gerenciamento de Produtos**: CRUD completo de produtos
- **Gerenciamento de Usuários**: Visualização e controle de usuários
- **Gerenciamento de Licenças**: Controle total sobre licenças ativas
- **Analytics**: Métricas de vendas e usuários

## 🛠️ Tecnologias

- **Framework**: Next.js 15 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS v4
- **Componentes UI**: shadcn/ui
- **Banco de Dados**: Supabase (PostgreSQL)
- **Autenticação**: Supabase Auth
- **Deploy**: Vercel
- **Ícones**: Lucide React

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Conta Supabase
- Conta Vercel (para deploy)

## 🔧 Instalação

1. **Clone o repositório**
\`\`\`bash
git clone https://github.com/seu-usuario/conefivem-hub.git
cd conefivem-hub
\`\`\`

2. **Instale as dependências**
\`\`\`bash
npm install
\`\`\`

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env.local` na raiz do projeto:

\`\`\`env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima
SUPABASE_SERVICE_ROLE_KEY=sua_chave_service_role

# Redirect URL (para desenvolvimento)
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
\`\`\`

4. **Configure o banco de dados**

Execute os scripts SQL fornecidos no arquivo `SETUP.md` no seu projeto Supabase.

5. **Inicie o servidor de desenvolvimento**
\`\`\`bash
npm run dev
\`\`\`

Acesse [http://localhost:3000](http://localhost:3000)

## 📁 Estrutura do Projeto

\`\`\`
conefivem-hub/
├── app/                      # App Router do Next.js
│   ├── (auth)/              # Rotas de autenticação
│   │   ├── login/           # Página de login
│   │   └── signup/          # Página de registro
│   ├── admin/               # Painel administrativo
│   │   ├── products/        # Gerenciamento de produtos
│   │   ├── users/           # Gerenciamento de usuários
│   │   └── licenses/        # Gerenciamento de licenças
│   ├── dashboard/           # Dashboard do usuário
│   │   ├── licenses/        # Licenças do usuário
│   │   └── profile/         # Perfil do usuário
│   ├── store/               # Loja de produtos
│   │   └── [id]/           # Página de detalhes do produto
│   └── shared/              # Links compartilhados
│       └── [token]/         # Visualização de link compartilhado
├── components/              # Componentes React
│   ├── ui/                 # Componentes shadcn/ui
│   ├── header.tsx          # Cabeçalho principal
│   ├── footer.tsx          # Rodapé
│   └── product-card.tsx    # Card de produto
├── hooks/                   # Custom hooks
│   └── use-auth.tsx        # Hook de autenticação
├── lib/                     # Utilitários
│   ├── storage.ts          # Gerenciamento de localStorage
│   ├── supabase/           # Cliente Supabase
│   └── types.ts            # Tipos TypeScript
└── public/                  # Arquivos estáticos
\`\`\`

## 🔐 Autenticação

O sistema utiliza Supabase Auth com email e senha. Funcionalidades:

- Registro de novos usuários
- Login com validação
- Logout seguro
- Proteção de rotas
- Middleware para refresh de tokens
- Redirecionamento automático

## 💾 Banco de Dados

### Tabelas Principais

- **users**: Informações dos usuários
- **products**: Catálogo de produtos
- **licenses**: Licenças e chaves de ativação
- **purchases**: Histórico de compras
- **shared_links**: Links compartilhados

Veja o arquivo `SETUP.md` para o schema completo e instruções de configuração.

## 🚀 Deploy

### Vercel

1. Conecte seu repositório GitHub à Vercel
2. Configure as variáveis de ambiente no painel da Vercel
3. Deploy automático a cada push na branch main

### Variáveis de Ambiente (Produção)

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima
SUPABASE_SERVICE_ROLE_KEY=sua_chave_service_role
\`\`\`

## 🔒 Segurança

- Row Level Security (RLS) habilitado em todas as tabelas
- Validação de permissões no servidor
- Tokens JWT para autenticação
- Sanitização de inputs
- CORS configurado
- Rate limiting (via Vercel)

## 📱 Responsividade

O sistema é totalmente responsivo e otimizado para:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🎨 Temas

- Suporte a modo claro e escuro
- Tokens de design personalizáveis
- Paleta de cores consistente

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👥 Autores

- **Cone Development Team** - *Trabalho Inicial*

## 🐛 Reportar Bugs

Encontrou um bug? Abra uma [issue](https://github.com/seu-usuario/conefivem-hub/issues) com:
- Descrição detalhada do problema
- Passos para reproduzir
- Comportamento esperado vs atual
- Screenshots (se aplicável)
- Ambiente (navegador, OS, etc.)

## 📞 Suporte

Para suporte, envie um email para suporte@conefivem.com ou abra uma issue no GitHub.

## 🗺️ Roadmap

- [ ] Sistema de pagamentos (Stripe/PayPal)
- [ ] Notificações em tempo real
- [ ] Sistema de reviews e avaliações
- [ ] API pública para desenvolvedores
- [ ] Aplicativo mobile
- [ ] Sistema de afiliados
- [ ] Suporte a múltiplos idiomas
- [ ] Dashboard de analytics avançado

## ⚡ Performance

- Server-Side Rendering (SSR)
- Static Site Generation (SSG) onde possível
- Image optimization automática
- Code splitting
- Lazy loading de componentes
- Cache de dados

## 🧪 Testes

\`\`\`bash
# Executar testes
npm run test

# Executar testes com coverage
npm run test:coverage

# Executar testes e2e
npm run test:e2e
\`\`\`

---

Feito com ❤️ pela equipe Cone Development
