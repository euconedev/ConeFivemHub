-- ============================
-- ROW LEVEL SECURITY (RLS)
-- ============================

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.licenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.discord_clients ENABLE ROW LEVEL SECURITY;

-- ============================
-- POLICIES: USERS
-- ============================

-- Usuários podem ver apenas seus próprios dados
CREATE POLICY "Users can view own data" ON public.users
FOR SELECT USING (auth.uid() = id);

-- Usuários podem atualizar apenas seus próprios dados
CREATE POLICY "Users can update own data" ON public.users
FOR UPDATE USING (auth.uid() = id);

-- Admins podem ver todos os usuários
CREATE POLICY "Admins can view all users" ON public.users
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- ============================
-- POLICIES: PRODUCTS
-- ============================

-- Todos podem ver produtos ativos
CREATE POLICY "Public can read active products" ON public.products
FOR SELECT USING (status = 'ativo');

-- Admins podem fazer tudo com produtos
CREATE POLICY "Admins can manage products" ON public.products
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- ============================
-- POLICIES: LICENSES
-- ============================

-- Usuários podem ver apenas suas próprias licenças
CREATE POLICY "Users can view own licenses" ON public.licenses
FOR SELECT USING (auth.uid() = user_id);

-- Admins podem ver todas as licenças
CREATE POLICY "Admins can view all licenses" ON public.licenses
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Admins podem gerenciar licenças
CREATE POLICY "Admins can manage licenses" ON public.licenses
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- ============================
-- POLICIES: PAYMENTS
-- ============================

-- Usuários podem ver apenas seus próprios pagamentos
CREATE POLICY "Users can view own payments" ON public.payments
FOR SELECT USING (auth.uid() = user_id);

-- Usuários podem criar pagamentos
CREATE POLICY "Users can create payments" ON public.payments
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Admins podem ver todos os pagamentos
CREATE POLICY "Admins can view all payments" ON public.payments
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- ============================
-- POLICIES: DISCORD CLIENTS
-- ============================

-- Usuários podem ver apenas seus próprios dados do Discord
CREATE POLICY "Users can view own discord data" ON public.discord_clients
FOR SELECT USING (auth.uid() = user_id);

-- Admins podem gerenciar todos os dados do Discord
CREATE POLICY "Admins can manage discord clients" ON public.discord_clients
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  )
);
