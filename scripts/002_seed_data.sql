-- =====================================================
-- CONE STUDIOS - SEED DATA
-- Dados iniciais baseados nas imagens de referência
-- =====================================================

-- =====================================================
-- CATEGORIES
-- =====================================================
INSERT INTO categories (name, slug, icon, description, display_order) VALUES
('Bases', 'bases', '🏠', 'Bases completas para seu servidor FiveM', 1),
('Scripts', 'scripts', '</>', 'Scripts personalizados e otimizados', 2),
('Designer', 'designer', '🎨', 'Design gráfico e identidade visual', 3),
('VPS Gamer', 'vps-gamer', '🖥️', 'Servidores VPS otimizados para FiveM', 4),
('Programação', 'programacao', '💻', 'Desenvolvimento e programação personalizada', 5),
('Keys', 'keys', '🔑', 'Keys Patreon para servidores', 6),
('Texturas e 3D', 'texturas-3d', '🎭', 'Texturas, modelos 3D e assets', 7),
('Combos', 'combos', '📦', 'Pacotes promocionais com desconto', 8);

-- =====================================================
-- PRODUCTS
-- =====================================================

-- Base RJv6
INSERT INTO products (
  category_id, name, slug, description, short_description, price,
  images, thumbnail, version, file_size, last_update, is_popular,
  features, specifications, status
) VALUES (
  (SELECT id FROM categories WHERE slug = 'bases'),
  'Base RJv6',
  'base-rjv6',
  'Base completa do Rio de Janeiro com sistemas avançados, mapas detalhados e otimização premium.',
  'Base completa do Rio de Janeiro com sistemas avançados, mapas detalhados e otimização premium.',
  297.00,
  ARRAY['https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gA2KQwbiKTp5aOvTV6BmkwVTWJKU1m.png'],
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gA2KQwbiKTp5aOvTV6BmkwVTWJKU1m.png',
  'v6.2.5',
  '16.2 GB',
  '2025-08-05',
  true,
  ARRAY[
    'Build atualizada',
    'Correções de bugs',
    'Funções otimizadas',
    'Logs compiladas em único arquivo',
    'Sistema de autenticação otimizado',
    'Suporte técnico incluso'
  ],
  '{"categoria": "Base COMPLETA", "versao": "v6.2.5", "tamanho": "16.2 GB", "suporte": "Incluso"}'::jsonb,
  'available'
);

-- Base SPv7
INSERT INTO products (
  category_id, name, slug, description, short_description, price,
  images, thumbnail, version, file_size, last_update, is_launch,
  features, status
) VALUES (
  (SELECT id FROM categories WHERE slug = 'bases'),
  'Base SPv7',
  'base-spv7',
  'Nova versão da base SP com melhorias significativas, novos sistemas implementados e otimizações de performance.',
  'Nova versão da base SP com melhorias significativas, novos sistemas implementados e otimizações de performance.',
  390.00,
  ARRAY['https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gA2KQwbiKTp5aOvTV6BmkwVTWJKU1m.png'],
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gA2KQwbiKTp5aOvTV6BmkwVTWJKU1m.png',
  'v7.0.0',
  '18.5 GB',
  NOW(),
  true,
  ARRAY[
    'Lançamento exclusivo',
    'Sistemas inovadores',
    'Performance otimizada',
    'Mapas exclusivos',
    'Suporte prioritário'
  ],
  'available'
);

-- Outfit Bag Script
INSERT INTO products (
  category_id, name, slug, description, short_description, price,
  images, thumbnail, is_new, features, status
) VALUES (
  (SELECT id FROM categories WHERE slug = 'scripts'),
  'Outfit Bag',
  'outfit-bag',
  'Chegou a solução definitiva para guardar, organizar e vestir roupas dentro do servidor de forma prática, intuitiva e otimizada.',
  'Sistema completo de gerenciamento de roupas no inventário',
  99.00,
  ARRAY['https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gA2KQwbiKTp5aOvTV6BmkwVTWJKU1m.png'],
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gA2KQwbiKTp5aOvTV6BmkwVTWJKU1m.png',
  true,
  ARRAY[
    'Interface intuitiva',
    'Sistema de preview',
    'Organização automática',
    'Compatível com principais frameworks',
    'Otimizado para performance'
  ],
  'available'
);

-- Letreiro 3D Vinewood
INSERT INTO products (
  category_id, name, slug, description, short_description, price,
  images, thumbnail, features, status
) VALUES (
  (SELECT id FROM categories WHERE slug = 'texturas-3d'),
  'Letreiro 3D (Vinewood)',
  'letreiro-3d-vinewood',
  'Personalize o icônico letreiro de Vinewood com o nome da sua cidade, facção ou comunidade. Criação profissional em 3D de alta qualidade.',
  'Letreiro 3D personalizado estilo Vinewood',
  40.00,
  ARRAY['https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-2IKn2KR81DbPskQo6AgM7eiUF37vMv.png'],
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-2IKn2KR81DbPskQo6AgM7eiUF37vMv.png',
  ARRAY[
    'Modelagem 3D profissional',
    'Texturas de alta qualidade',
    'Personalização completa',
    'Otimizado para FiveM',
    'Instalação simples'
  ],
  'available'
);

-- Roupas Personalizadas
INSERT INTO products (
  category_id, name, slug, description, short_description, price,
  images, thumbnail, features, status
) VALUES (
  (SELECT id FROM categories WHERE slug = 'texturas-3d'),
  'Roupas Personalizadas',
  'roupas-personalizadas',
  'Criação de roupas personalizadas para seu servidor FiveM — uniformes, roupas de facções, equipes, e muito mais com qualidade profissional.',
  'Uniformes e roupas exclusivas para seu servidor',
  30.00,
  ARRAY['https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-2IKn2KR81DbPskQo6AgM7eiUF37vMv.png'],
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-2IKn2KR81DbPskQo6AgM7eiUF37vMv.png',
  ARRAY[
    'Design exclusivo',
    'Texturas HD',
    'Compatível com principais frameworks',
    'Revisões incluídas',
    'Entrega rápida'
  ],
  'available'
);

-- Key Argentum
INSERT INTO products (
  category_id, name, slug, description, short_description, price,
  is_subscription, subscription_period, images, thumbnail, features, status
) VALUES (
  (SELECT id FROM categories WHERE slug = 'keys'),
  'Key Argentum (64 slots)',
  'key-argentum-64',
  'Chave Patreon Argentum ÚNICA para servidor com até 64 slots simultâneos, criada direto no IP da sua hospedagem. Acesso a recursos premium e suporte prioritário.',
  'Key Patreon premium com 64 slots',
  75.00,
  true,
  'monthly',
  ARRAY['https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-2IKn2KR81DbPskQo6AgM7eiUF37vMv.png'],
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-2IKn2KR81DbPskQo6AgM7eiUF37vMv.png',
  ARRAY[
    'Até 64 slots simultâneos',
    'Criada no IP da hospedagem',
    'Recursos premium Patreon',
    'Suporte prioritário',
    'Renovação mensal'
  ],
  'unavailable'
);

-- Key Platinium
INSERT INTO products (
  category_id, name, slug, description, short_description, price,
  is_subscription, subscription_period, images, thumbnail, is_popular, features, status
) VALUES (
  (SELECT id FROM categories WHERE slug = 'keys'),
  'Key Platinium (128 slots)',
  'key-platinium-128',
  'Chave Patreon Platinium com até 128 slots simultâneos. Máxima capacidade e recursos exclusivos para servidores de grande porte.',
  'Key Patreon premium com 128 slots',
  150.00,
  true,
  'monthly',
  ARRAY['https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-2IKn2KR81DbPskQo6AgM7eiUF37vMv.png'],
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-2IKn2KR81DbPskQo6AgM7eiUF37vMv.png',
  true,
  ARRAY[
    'Até 128 slots simultâneos',
    'Recursos exclusivos',
    'Suporte VIP 24/7',
    'Prioridade em atualizações',
    'Renovação mensal'
  ],
  'available'
);

-- =====================================================
-- NEWS
-- =====================================================
INSERT INTO news (title, description, badge, badge_color, date) VALUES
(
  'Lançamento Painel (BETA)',
  'Painel completo de gerenciamento para clientes',
  'EXTRAS',
  'red',
  '2025-01-21'
),
(
  'Base SPv7 Disponível',
  'Nova versão da base São Paulo com sistemas revolucionários',
  'LANÇAMENTO',
  'yellow',
  NOW()
),
(
  'Promoção de Aniversário',
  'Descontos de até 40% em produtos selecionados',
  'PROMOÇÃO',
  'green',
  NOW() - INTERVAL '2 days'
);

-- =====================================================
-- REVIEWS (Sample testimonials from images)
-- =====================================================

-- Create sample user for reviews
INSERT INTO users (discord_username, name, email, role) VALUES
('skipszera', 'Skip Szera', 'skip@example.com', 'user'),
('zachphilco', 'ZACH PHILCO', 'zach@example.com', 'user'),
('dmitrypetrov', 'Dmitry Petrov', 'dmitry@example.com', 'user'),
('noering', 'Noering', 'noering@example.com', 'user'),
('goulart', 'Goulart', 'goulart@example.com', 'user');

-- Reviews for Base RJv6
INSERT INTO reviews (product_id, user_id, rating, comment, is_featured, created_at) VALUES
(
  (SELECT id FROM products WHERE slug = 'base-rjv6'),
  (SELECT id FROM users WHERE discord_username = 'zachphilco'),
  5,
  'Base bem montada e estruturada, e bons Scripts! Até o momento não tenho o que reclamar, fiz um bom investimento!',
  true,
  '2025-10-17 17:00:00'
),
(
  (SELECT id FROM products WHERE slug = 'base-rjv6'),
  (SELECT id FROM users WHERE discord_username = 'noering'),
  5,
  'Base v7 é show demais, recomendo comprarem e o suporte é 1000/100',
  true,
  '2025-10-14 03:42:00'
);

-- Reviews for Base SPv7
INSERT INTO reviews (product_id, user_id, rating, comment, is_featured, created_at) VALUES
(
  (SELECT id FROM products WHERE slug = 'base-spv7'),
  (SELECT id FROM users WHERE discord_username = 'dmitrypetrov'),
  5,
  'Acabei de comprar base SP V7.0 é está sensacional, muito bem feita e pronta pra uso.',
  true,
  '2025-10-16 23:09:00'
),
(
  (SELECT id FROM products WHERE slug = 'base-spv7'),
  (SELECT id FROM users WHERE discord_username = 'goulart'),
  5,
  'Acabei de comprar e estou testando a base do RJ, mas o atendimento foi ótimo e a entrega do produto também.',
  true,
  '2025-10-13 21:03:00'
);

-- =====================================================
-- COUPONS
-- =====================================================
INSERT INTO coupons (code, discount_type, discount_value, min_purchase, max_uses, expires_at) VALUES
('BEMVINDO10', 'percentage', 10, 50, 100, NOW() + INTERVAL '30 days'),
('PRIMEIRA20', 'percentage', 20, 100, 50, NOW() + INTERVAL '60 days'),
('CONE50', 'fixed', 50, 200, 200, NOW() + INTERVAL '90 days');

-- =====================================================
-- SAMPLE ADMIN USER
-- =====================================================
INSERT INTO users (discord_username, name, email, role) VALUES
('admin', 'Administrador', 'admin@conestudios.com', 'admin');
