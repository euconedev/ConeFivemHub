-- ============================
-- FUNÇÃO: RELACIONAMENTO AUTOMÁTICO DE LICENÇAS
-- ============================
CREATE OR REPLACE FUNCTION handle_payment_success()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.payment_status = 'pago' AND OLD.payment_status != 'pago' THEN
    INSERT INTO public.licenses (product_id, user_id, serial_key, status, ip_address)
    VALUES (
      NEW.product_id,
      NEW.user_id,
      UPPER(ENCODE(gen_random_bytes(16), 'hex')),
      'active',
      NEW.ip_address
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================
-- TRIGGER: CRIAR LICENÇA APÓS PAGAMENTO
-- ============================
DROP TRIGGER IF EXISTS on_payment_success ON public.payments;
CREATE TRIGGER on_payment_success
AFTER UPDATE ON public.payments
FOR EACH ROW
WHEN (NEW.payment_status = 'pago')
EXECUTE FUNCTION handle_payment_success();

-- ============================
-- FUNÇÃO: ATUALIZAR TIMESTAMP
-- ============================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================
-- TRIGGER: ATUALIZAR TIMESTAMP DE PRODUTOS
-- ============================
DROP TRIGGER IF EXISTS update_products_updated_at ON public.products;
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
