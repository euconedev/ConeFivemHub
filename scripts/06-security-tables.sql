-- ============================
-- TABELAS DE SEGURANÇA
-- ============================

-- Tabela de logs de auditoria
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  action TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ip_address TEXT,
  user_agent TEXT,
  metadata JSONB,
  severity TEXT NOT NULL CHECK (severity IN ('info', 'warning', 'error', 'critical')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON public.audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON public.audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_severity ON public.audit_logs(severity);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.audit_logs(created_at DESC);

-- Tabela de tokens de API (para integrações futuras)
CREATE TABLE IF NOT EXISTS public.api_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  token_hash TEXT NOT NULL UNIQUE,
  last_used_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_api_tokens_user_id ON public.api_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_api_tokens_token_hash ON public.api_tokens(token_hash);

-- RLS para audit_logs
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Apenas admins podem ver logs de auditoria
CREATE POLICY "Admins can view audit logs" ON public.audit_logs
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- RLS para api_tokens
ALTER TABLE public.api_tokens ENABLE ROW LEVEL SECURITY;

-- Usuários podem ver apenas seus próprios tokens
CREATE POLICY "Users can view own tokens" ON public.api_tokens
FOR SELECT USING (auth.uid() = user_id);

-- Usuários podem criar seus próprios tokens
CREATE POLICY "Users can create own tokens" ON public.api_tokens
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Usuários podem atualizar seus próprios tokens
CREATE POLICY "Users can update own tokens" ON public.api_tokens
FOR UPDATE USING (auth.uid() = user_id);

-- Usuários podem deletar seus próprios tokens
CREATE POLICY "Users can delete own tokens" ON public.api_tokens
FOR DELETE USING (auth.uid() = user_id);

-- Admins podem gerenciar todos os tokens
CREATE POLICY "Admins can manage all tokens" ON public.api_tokens
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Função para limpar logs antigos (executar periodicamente)
CREATE OR REPLACE FUNCTION cleanup_old_audit_logs()
RETURNS void AS $$
BEGIN
  DELETE FROM public.audit_logs
  WHERE created_at < NOW() - INTERVAL '90 days'
  AND severity IN ('info', 'warning');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
