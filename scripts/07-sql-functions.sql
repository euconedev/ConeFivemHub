-- Funções SQL para suportar operações SQL diretas
-- Este script adiciona funções para executar consultas SQL, gerenciar transações e salvar scripts

-- Função para executar consultas SQL diretas
CREATE OR REPLACE FUNCTION execute_sql(sql_query TEXT, params JSONB DEFAULT '[]')
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSONB;
  query_params TEXT[];
  i INTEGER;
BEGIN
  -- Converte parâmetros JSON para array
  IF params IS NOT NULL AND jsonb_array_length(params) > 0 THEN
    query_params := ARRAY[]::TEXT[];
    FOR i IN 0..jsonb_array_length(params)-1 LOOP
      query_params := query_params || params->>i;
    END LOOP;
  END IF;

  -- Executa a consulta e captura o resultado como JSON
  EXECUTE sql_query INTO result USING query_params;
  
  -- Registra a execução no log de auditoria
  INSERT INTO audit_logs (action, user_id, metadata, severity)
  VALUES (
    'execute_sql',
    auth.uid(),
    jsonb_build_object('query', sql_query),
    'info'
  );
  
  RETURN result;
EXCEPTION WHEN OTHERS THEN
  -- Registra erro no log de auditoria
  INSERT INTO audit_logs (action, user_id, metadata, severity)
  VALUES (
    'execute_sql_error',
    auth.uid(),
    jsonb_build_object('query', sql_query, 'error', SQLERRM),
    'error'
  );
  
  RAISE;
END;
$$;

-- Função para iniciar uma transação
CREATE OR REPLACE FUNCTION begin_transaction()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  transaction_id TEXT;
BEGIN
  -- Gera um ID único para a transação
  transaction_id := gen_random_uuid()::TEXT;
  
  -- Inicia a transação
  EXECUTE 'BEGIN';
  
  -- Registra o início da transação
  INSERT INTO audit_logs (action, user_id, metadata, severity)
  VALUES (
    'begin_transaction',
    auth.uid(),
    jsonb_build_object('transaction_id', transaction_id),
    'info'
  );
  
  RETURN transaction_id;
END;
$$;

-- Função para confirmar uma transação
CREATE OR REPLACE FUNCTION commit_transaction(transaction_id TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Confirma a transação
  EXECUTE 'COMMIT';
  
  -- Registra a confirmação da transação
  INSERT INTO audit_logs (action, user_id, metadata, severity)
  VALUES (
    'commit_transaction',
    auth.uid(),
    jsonb_build_object('transaction_id', transaction_id),
    'info'
  );
  
  RETURN TRUE;
EXCEPTION WHEN OTHERS THEN
  -- Registra erro no log de auditoria
  INSERT INTO audit_logs (action, user_id, metadata, severity)
  VALUES (
    'commit_transaction_error',
    auth.uid(),
    jsonb_build_object('transaction_id', transaction_id, 'error', SQLERRM),
    'error'
  );
  
  RAISE;
END;
$$;

-- Função para reverter uma transação
CREATE OR REPLACE FUNCTION rollback_transaction(transaction_id TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Reverte a transação
  EXECUTE 'ROLLBACK';
  
  -- Registra a reversão da transação
  INSERT INTO audit_logs (action, user_id, metadata, severity)
  VALUES (
    'rollback_transaction',
    auth.uid(),
    jsonb_build_object('transaction_id', transaction_id),
    'info'
  );
  
  RETURN TRUE;
EXCEPTION WHEN OTHERS THEN
  -- Registra erro no log de auditoria
  INSERT INTO audit_logs (action, user_id, metadata, severity)
  VALUES (
    'rollback_transaction_error',
    auth.uid(),
    jsonb_build_object('transaction_id', transaction_id, 'error', SQLERRM),
    'error'
  );
  
  RAISE;
END;
$$;

-- Tabela para armazenar scripts SQL
CREATE TABLE IF NOT EXISTS sql_scripts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  content TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Função para atualizar o timestamp de atualização
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar o timestamp
CREATE TRIGGER update_sql_scripts_updated_at
BEFORE UPDATE ON sql_scripts
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Políticas RLS para a tabela sql_scripts
ALTER TABLE sql_scripts ENABLE ROW LEVEL SECURITY;

-- Política para administradores (acesso total)
CREATE POLICY admin_sql_scripts_policy ON sql_scripts
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Política para usuários (somente leitura dos próprios scripts)
CREATE POLICY user_sql_scripts_policy ON sql_scripts
  FOR SELECT
  TO authenticated
  USING (created_by = auth.uid());
