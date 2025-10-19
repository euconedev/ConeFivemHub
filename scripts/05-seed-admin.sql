-- ============================
-- SEED: CRIAR USUÁRIO ADMIN
-- ============================

-- Inserir admin padrão (eucone.dev@gmail.com)
INSERT INTO public.users (name, email, role, created_at)
VALUES ('Cone Dev', 'eucone.dev@gmail.com', 'admin', NOW())
ON CONFLICT (email) DO UPDATE SET role = 'admin';

-- Inserir alguns produtos de exemplo
INSERT INTO public.products (name, description, price, image_url, category, version, features, tags, is_featured)
VALUES 
  (
    'Sistema de Polícia Avançado',
    'Sistema completo de polícia com MDT, dispatch e muito mais',
    299.90,
    '/police-car-fivem-gta.jpg',
    'script',
    '2.5.0',
    ARRAY['MDT Integrado', 'Sistema de Dispatch', 'Registro de Ocorrências', 'Gestão de Viaturas'],
    ARRAY['policia', 'mdt', 'dispatch', 'roleplay'],
    TRUE
  ),
  (
    'Garagem Moderna MLO',
    'MLO de garagem moderna com iluminação customizada',
    149.90,
    '/modern-garage-interior.jpg',
    'mlo',
    '1.0.0',
    ARRAY['Iluminação Customizada', 'Props Detalhados', 'Otimizado'],
    ARRAY['mlo', 'garagem', 'interior'],
    FALSE
  )
ON CONFLICT DO NOTHING;
