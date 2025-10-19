-- ============================
-- VIEW: RELATÓRIO ADMIN
-- ============================
CREATE OR REPLACE VIEW public.admin_overview AS
SELECT
  (SELECT COUNT(*) FROM users) AS total_users,
  (SELECT COUNT(*) FROM products WHERE status = 'ativo') AS total_products,
  (SELECT COUNT(*) FROM licenses WHERE status = 'active') AS total_licenses,
  (SELECT COUNT(*) FROM payments WHERE payment_status = 'pago') AS total_sales,
  COALESCE((SELECT SUM(amount) FROM payments WHERE payment_status = 'pago'), 0) AS revenue,
  (SELECT COUNT(*) FROM payments WHERE payment_status = 'pago' AND created_at >= NOW() - INTERVAL '30 days') AS sales_last_30_days,
  COALESCE((SELECT SUM(amount) FROM payments WHERE payment_status = 'pago' AND created_at >= NOW() - INTERVAL '30 days'), 0) AS revenue_last_30_days;

-- ============================
-- VIEW: LICENÇAS COM DETALHES
-- ============================
CREATE OR REPLACE VIEW public.licenses_with_details AS
SELECT 
  l.id,
  l.serial_key,
  l.status,
  l.ip_address,
  l.expiry_date,
  l.created_at,
  p.id AS product_id,
  p.name AS product_name,
  p.image_url AS product_image,
  p.version AS product_version,
  u.id AS user_id,
  u.name AS user_name,
  u.email AS user_email
FROM licenses l
JOIN products p ON l.product_id = p.id
JOIN users u ON l.user_id = u.id;
