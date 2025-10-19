# Guia de Segurança - ConeFiveM Hub

## Visão Geral

Este documento descreve as medidas de segurança implementadas no ConeFiveM Hub e as melhores práticas para manter o sistema seguro.

## Medidas de Segurança Implementadas

### 1. Criptografia de Dados

- **Algoritmo**: AES-256-GCM (Advanced Encryption Standard)
- **Derivação de Chave**: PBKDF2 com 100.000 iterações
- **Dados Criptografados**:
  - Chaves de licença no banco de dados
  - Tokens de API
  - Dados sensíveis de pagamento

### 2. Autenticação e Autorização

- **Supabase Auth**: Sistema de autenticação robusto
- **Row Level Security (RLS)**: Políticas de acesso granular no banco de dados
- **JWT Tokens**: Tokens seguros com expiração automática
- **Refresh Tokens**: Renovação automática de sessões

### 3. Rate Limiting

Limites de requisições por endpoint:
- **Login**: 5 tentativas por 5 minutos
- **Cadastro**: 3 tentativas por hora
- **Reset de Senha**: 3 tentativas por hora
- **Criação de Pagamento**: 5 requisições por minuto
- **APIs Gerais**: 30-100 requisições por minuto

### 4. Validação de Entrada

- Validação com Zod schemas
- Sanitização de inputs
- Prevenção contra SQL Injection
- Prevenção contra XSS (Cross-Site Scripting)
- Validação de UUIDs, emails, URLs

### 5. Logs de Auditoria

Todos os eventos importantes são registrados:
- Login/Logout de usuários
- Criação e conclusão de pagamentos
- Criação e ativação de licenças
- Ações administrativas
- Tentativas de acesso não autorizado
- Violações de rate limit

### 6. Proteção de Webhooks

- Verificação de secret com comparação segura (timing-safe)
- Rate limiting específico para webhooks
- Validação de origem das requisições

### 7. Segurança de API

- HTTPS obrigatório em produção
- Headers de segurança configurados
- CORS configurado adequadamente
- Tokens de API com hash SHA-256

## Configuração de Segurança

### Variáveis de Ambiente Críticas

\`\`\`bash
# NUNCA commite estas variáveis no Git!
ENCRYPTION_KEY=<chave-forte-32-caracteres>
ABACATE_PAY_WEBHOOK_SECRET=<secret-webhook>
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
\`\`\`

### Gerando Chave de Criptografia

\`\`\`bash
# Linux/Mac
openssl rand -hex 32

# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
\`\`\`

### Configuração do Supabase

1. **Habilitar RLS em todas as tabelas**
2. **Configurar políticas de acesso restritivas**
3. **Usar Service Role Key apenas no servidor**
4. **Nunca expor Service Role Key no cliente**

## Melhores Práticas

### Para Desenvolvedores

1. **Nunca** armazene secrets no código
2. **Sempre** valide e sanitize inputs do usuário
3. **Use** prepared statements para queries SQL
4. **Implemente** rate limiting em todos os endpoints públicos
5. **Log** todas as ações sensíveis
6. **Revise** regularmente os logs de auditoria
7. **Mantenha** dependências atualizadas
8. **Use** HTTPS em produção

### Para Administradores

1. **Rotacione** secrets regularmente (a cada 90 dias)
2. **Monitore** logs de auditoria diariamente
3. **Configure** alertas para eventos críticos
4. **Faça** backup regular do banco de dados
5. **Teste** o processo de recuperação de desastres
6. **Limite** acesso admin apenas ao necessário
7. **Use** autenticação de dois fatores (2FA)

## Checklist de Segurança

### Antes do Deploy

- [ ] Todas as variáveis de ambiente estão configuradas
- [ ] ENCRYPTION_KEY tem pelo menos 32 caracteres
- [ ] RLS está habilitado em todas as tabelas
- [ ] Políticas de RLS estão configuradas corretamente
- [ ] Rate limiting está ativo
- [ ] Logs de auditoria estão funcionando
- [ ] HTTPS está configurado
- [ ] Webhooks têm secrets configurados
- [ ] Backup automático está configurado

### Manutenção Regular

- [ ] Revisar logs de auditoria semanalmente
- [ ] Atualizar dependências mensalmente
- [ ] Rotacionar secrets a cada 90 dias
- [ ] Testar backup e recuperação trimestralmente
- [ ] Revisar permissões de usuários mensalmente
- [ ] Limpar logs antigos (>90 dias)

## Resposta a Incidentes

### Em caso de violação de segurança:

1. **Isolar** o sistema afetado imediatamente
2. **Rotacionar** todos os secrets e tokens
3. **Analisar** logs de auditoria para identificar o escopo
4. **Notificar** usuários afetados
5. **Documentar** o incidente
6. **Implementar** correções
7. **Revisar** e melhorar processos de segurança

## Contato de Segurança

Para reportar vulnerabilidades de segurança:
- Discord: https://discord.gg/Tq5vNjKuX7
- Não divulgue vulnerabilidades publicamente antes de serem corrigidas

## Atualizações

Este documento deve ser revisado e atualizado a cada 3 meses ou após mudanças significativas no sistema.

**Última atualização**: Janeiro 2025
