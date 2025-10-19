-- ===================================================
-- 🔐 CONEFIVEM HUB - Estrutura de Banco de Dados
-- Desenvolvido por Cone Dev
-- ===================================================

-- Removendo tabela users duplicada, usando apenas profiles

-- ============================
-- 1. PROFILES (extends auth.users)
-- ============================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  email TEXT,
  discord_id TEXT UNIQUE,
  role TEXT CHECK (role IN ('admin','user')) DEFAULT 'user',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create trigger to auto-create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'role', 'user')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Index for performance
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_discord_id ON public.profiles(discord_id);

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
  features TEXT[],
  tags TEXT[],
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
-- Atualizando foreign key para referenciar auth.users
CREATE TABLE IF NOT EXISTS public.licenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  serial_key TEXT UNIQUE NOT NULL,
  ip_address TEXT,
  status TEXT CHECK (status IN ('active','expired','suspended')) DEFAULT 'active',
  expiry_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_license_user_id ON public.licenses(user_id);
CREATE INDEX IF NOT EXISTS idx_license_product_id ON public.licenses(product_id);
CREATE INDEX IF NOT EXISTS idx_license_serial_key ON public.licenses(serial_key);

-- ============================
-- 4. PAYMENTS
-- ============================
-- Atualizando foreign key para referenciar auth.users
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
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
-- Atualizando foreign key para referenciar auth.users
CREATE TABLE IF NOT EXISTS public.discord_clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  discord_id TEXT UNIQUE NOT NULL,
  discord_username TEXT NOT NULL,
  tags TEXT[],
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_discord_user_id ON public.discord_clients(user_id);
CREATE INDEX IF NOT EXISTS idx_discord_discord_id ON public.discord_clients(discord_id);

-- ============================
-- 6. SHARED LINKS
-- ============================
CREATE TABLE IF NOT EXISTS public.shared_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  license_id UUID REFERENCES public.licenses(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_shared_links_token ON public.shared_links(token);
CREATE INDEX IF NOT EXISTS idx_shared_links_user_id ON public.shared_links(user_id);
CREATE INDEX IF NOT EXISTS idx_shared_links_license_id ON public.shared_links(license_id);
