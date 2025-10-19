-- ===================================================
-- 🔐 CONEFIVEM HUB - Estrutura de Banco de Dados
-- Desenvolvido por Cone Dev
-- ===================================================

-- ============================
-- 1. USERS
-- ============================
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT,
  discord_id TEXT UNIQUE,
  role TEXT CHECK (role IN ('admin','user')) DEFAULT 'user',
  avatar TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================
-- 2. PRODUCTS
-- ============================
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10,2) NOT NULL,
  image_url TEXT,
  category TEXT CHECK (category IN ('script','asset','mlo','vehicle','weapon')),
  version TEXT,
  status TEXT CHECK (status IN ('ativo','inativo')) DEFAULT 'ativo',
  features TEXT[], -- Array de recursos do produto
  tags TEXT[], -- Array de tags
  downloads INTEGER DEFAULT 0,
  rating NUMERIC(3,2) DEFAULT 0,
  is_new BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================
-- 3. LICENSES
-- ============================
CREATE TABLE IF NOT EXISTS public.licenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  serial_key TEXT UNIQUE NOT NULL,
  ip_address TEXT,
  status TEXT CHECK (status IN ('active','expired','suspended')) DEFAULT 'active',
  expiry_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_license_user_id ON public.licenses(user_id);
CREATE INDEX IF NOT EXISTS idx_license_product_id ON public.licenses(product_id);
CREATE INDEX IF NOT EXISTS idx_license_serial_key ON public.licenses(serial_key);

-- ============================
-- 4. PAYMENTS
-- ============================
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  amount NUMERIC(10,2) NOT NULL,
  method TEXT DEFAULT 'pix',
  gateway TEXT DEFAULT 'abacatepay',
  payment_status TEXT CHECK (payment_status IN ('pendente','pago','falhou')) DEFAULT 'pendente',
  transaction_id TEXT UNIQUE,
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_payment_user_id ON public.payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_transaction_id ON public.payments(transaction_id);

-- ============================
-- 5. DISCORD CLIENTS
-- ============================
CREATE TABLE IF NOT EXISTS public.discord_clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  discord_id TEXT UNIQUE NOT NULL,
  discord_username TEXT NOT NULL,
  tags TEXT[], -- Array de tags para o cliente
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_discord_user_id ON public.discord_clients(user_id);
CREATE INDEX IF NOT EXISTS idx_discord_discord_id ON public.discord_clients(discord_id);
