-- ============================
-- ROW LEVEL SECURITY (RLS)
-- ============================

-- Corrigindo políticas RLS para evitar recursão infinita

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.licenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.discord_clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shared_links ENABLE ROW LEVEL SECURITY;

-- ============================
-- POLICIES: PROFILES
-- ============================

-- Usuários podem ver apenas seus próprios dados
CREATE POLICY "Users can view own profile" ON public.profiles
FOR SELECT USING (auth.uid() = id);

-- Usuários podem atualizar apenas seus próprios dados
CREATE POLICY "Users can update own profile" ON public.profiles
FOR UPDATE USING (auth.uid() = id);

-- Admins podem ver todos os perfis (sem recursão)
CREATE POLICY "Admins can view all profiles" ON public.profiles
FOR SELECT USING (
  (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

-- ============================
-- POLICIES: PRODUCTS
-- ============================

-- Todos podem ver produtos ativos
CREATE POLICY "Public can read active products" ON public.products
FOR SELECT USING (status = 'ativo');

-- Admins podem fazer tudo com produtos (sem recursão)
CREATE POLICY "Admins can manage products" ON public.products
FOR ALL USING (
  (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

-- ============================
-- POLICIES: LICENSES
-- ============================

-- Usuários podem ver apenas suas próprias licenças
CREATE POLICY "Users can view own licenses" ON public.licenses
FOR SELECT USING (auth.uid() = user_id);

-- Admins podem ver todas as licenças (sem recursão)
CREATE POLICY "Admins can view all licenses" ON public.licenses
FOR SELECT USING (
  (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

-- Admins podem gerenciar licenças (sem recursão)
CREATE POLICY "Admins can manage licenses" ON public.licenses
FOR ALL USING (
  (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

-- Sistema pode criar licenças (para webhooks)
CREATE POLICY "System can create licenses" ON public.licenses
FOR INSERT WITH CHECK (true);

-- ============================
-- POLICIES: PAYMENTS
-- ============================

-- Usuários podem ver apenas seus próprios pagamentos
CREATE POLICY "Users can view own payments" ON public.payments
FOR SELECT USING (auth.uid() = user_id);

-- Usuários podem criar pagamentos
CREATE POLICY "Users can create payments" ON public.payments
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Admins podem ver todos os pagamentos (sem recursão)
CREATE POLICY "Admins can view all payments" ON public.payments
FOR SELECT USING (
  (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

-- Sistema pode atualizar pagamentos (para webhooks)
CREATE POLICY "System can update payments" ON public.payments
FOR UPDATE USING (true);

-- ============================
-- POLICIES: DISCORD CLIENTS
-- ============================

-- Usuários podem ver apenas seus próprios dados do Discord
CREATE POLICY "Users can view own discord data" ON public.discord_clients
FOR SELECT USING (auth.uid() = user_id);

-- Usuários podem criar seus próprios dados do Discord
CREATE POLICY "Users can create own discord data" ON public.discord_clients
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Admins podem gerenciar todos os dados do Discord (sem recursão)
CREATE POLICY "Admins can manage discord clients" ON public.discord_clients
FOR ALL USING (
  (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

-- ============================
-- POLICIES: SHARED LINKS
-- ============================

-- Usuários podem ver apenas seus próprios links compartilhados
CREATE POLICY "Users can view own shared links" ON public.shared_links
FOR SELECT USING (auth.uid() = user_id);

-- Usuários podem criar seus próprios links compartilhados
CREATE POLICY "Users can create own shared links" ON public.shared_links
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Usuários podem atualizar seus próprios links compartilhados
CREATE POLICY "Users can update own shared links" ON public.shared_links
FOR UPDATE USING (auth.uid() = user_id);

-- Usuários podem deletar seus próprios links compartilhados
CREATE POLICY "Users can delete own shared links" ON public.shared_links
FOR DELETE USING (auth.uid() = user_id);

-- Admins podem gerenciar todos os links compartilhados (sem recursão)
CREATE POLICY "Admins can manage shared links" ON public.shared_links
FOR ALL USING (
  (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

-- Qualquer um pode ler links ativos (para visualização pública)
CREATE POLICY "Public can read active shared links" ON public.shared_links
FOR SELECT USING (is_active = true AND expires_at > NOW());
