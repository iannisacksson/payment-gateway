# REQUISITOS DO SISTEMA

## 1. Domínio do negócio

### Glossário

- Merchant: entidade que recebe pagamentos.
- Customer: entidade que realiza pagamentos.
- Payment Intent: intenção de cobrança, por exemplo, "cobrar R$ 50,00". A criação da intenção não representa sucesso financeiro.
- Transaction: tentativa efetiva de processamento de um pagamento. Um mesmo payment intent pode gerar múltiplas transações por retry, reprocessamento ou fallback entre adquirentes.
- Payment Status: estado atual do fluxo de pagamento.
- Authorization: reserva de valor no cartão.
- Capture: confirmação da cobrança autorizada.
- Refund: devolução total ou parcial de um pagamento capturado.
- Chargeback: contestação formal de um pagamento.
- Ledger: razão financeira imutável com lançamentos em dupla entrada para rastrear todos os efeitos monetários do sistema.

### Estados de pagamento

Os pagamentos devem respeitar os seguintes estados:

- `pending`
- `processing`
- `authorized`
- `captured`
- `failed`
- `canceled`
- `refunded`
- `chargeback`

As transições devem ser controladas para impedir estados inválidos, por exemplo:

- válido: `pending -> authorized`
- válido: `authorized -> captured`
- válido: `captured -> refunded`
- inválido: `refunded -> captured`

## 2. Requisitos funcionais

- [RF0001] Deve ser possível cadastrar um merchant.
- [RF0002] Deve ser possível cadastrar um customer vinculado a um merchant.
- [RF0003] Para um mesmo merchant, não deve ser possível cadastrar customers com o mesmo email ou o mesmo documento fiscal.
- [RF0004] Deve ser possível criar um payment intent para definir valor, moeda, merchant e customer da cobrança.
- [RF0005] Um payment intent deve poder gerar uma ou mais transactions para processamento, incluindo retry e fallback entre adquirentes.
- [RF0006] O sistema deve suportar fluxo de autorização e captura, inclusive com captura posterior quando aplicável.
- [RF0007] O customer deve ser capaz de cadastrar um cartão para pagamento.
- [RF0008] O sistema deve validar o cartão antes do cadastro e informar ao customer o motivo da falha em caso de erro validável.
- [RF0009] O sistema deve tokenizar o cartão cadastrado e utilizar o token no processamento de pagamentos.
- [RF0010] O customer deve ser capaz de realizar um pagamento para um merchant.
- [RF0011] O customer deve ser capaz de listar seus payment intents, transactions e respectivos status.
- [RF0012] O sistema deve permitir reembolso total e parcial de pagamentos capturados, respeitando as regras de saldo e estado.
- [RF0013] O sistema deve registrar e processar chargebacks, refletindo o novo estado financeiro do pagamento.
- [RF0014] O merchant deve ser notificado quando ocorrer criação de pagamento, autorização, falha, captura, reembolso ou chargeback.
- [RF0015] O sistema deve manter um ledger financeiro imutável para registrar os impactos monetários de autorizações, capturas, reembolsos e chargebacks.
- [RF0016] O ledger deve utilizar lançamentos em dupla entrada para garantir rastreabilidade e reconciliação financeira.
- [RF0017] O sistema deve disponibilizar webhooks para eventos relevantes de pagamento, reembolso e chargeback.
- [RF0018] Os webhooks devem suportar retry e deduplicação por evento entregue.

## 3. Requisitos não funcionais

### Confiabilidade

- [RNF0001] Os endpoints de criação de pagamento e reembolso devem ser idempotentes.
- [RNF0002] O sistema deve suportar idempotency keys para deduplicar requisições repetidas por timeout ou retry do cliente.
- [RNF0003] O sistema não deve processar cobranças duplicadas para a mesma operação idempotente.
- [RNF0004] O sistema deve suportar replay seguro de mensagens e eventos, sem efeito financeiro duplicado.
- [RNF0005] O sistema deve operar com entrega `at-least-once` e deduplicação explícita, sem depender de garantia de exactly-once.
- [RNF0006] O sistema deve aplicar retry exponencial com jitter para integrações externas elegíveis.
- [RNF0007] O sistema deve possuir circuit breaker e políticas de retry configuráveis para adquirentes e dependências críticas.
- [RNF0008] O sistema deve controlar timeout de conexão, timeout de request e timeout por operação externa.
- [RNF0009] O sistema deve possuir Dead Letter Queue para mensagens que excederem o limite de tentativas de processamento.
- [RNF0010] Em caso de falha de um adquirente, o sistema deve ser capaz de executar fallback para outro provider compatível.

### Concorrência e consistência

- [RNF0011] O sistema deve impedir condições de corrida em operações concorrentes, como capturas, reembolsos e processamento de múltiplos webhooks.
- [RNF0012] O sistema deve adotar estratégia explícita de controle concorrente, podendo utilizar lock pessimista, lock otimista ou lock distribuído conforme a operação.
- [RNF0013] O sistema deve garantir transições válidas de estado, rejeitando mudanças incompatíveis com o fluxo financeiro.
- [RNF0014] O sistema deve utilizar transações de banco para preservar consistência entre mudança de estado e escrita financeira.
- [RNF0015] O sistema deve implementar Outbox Pattern para publicação confiável de eventos derivados de mudanças persistidas.
- [RNF0016] O sistema deve suportar workflows distribuídos com compensação para etapas que falharem em fluxos multi-step.

### Observabilidade

- [RNF0017] O sistema deve produzir logs estruturados contendo, no mínimo, identificadores de pagamento, merchant, customer, transaction e trace.
- [RNF0018] O sistema deve propagar correlation ID ou trace ID entre API, filas, workers, webhooks e integrações externas.
- [RNF0019] O sistema deve expor métricas operacionais, incluindo TPS, latência, taxa de falha, taxa de timeout, retries e taxa de autorização bem-sucedida.
- [RNF0020] O sistema deve permitir tracing distribuído ponta a ponta das principais operações.
- [RNF0021] O sistema deve expor health checks de liveness, readiness e saúde das dependências críticas.

### Segurança

- [RNF0022] Os registros devem ser persistidos em banco relacional PostgreSQL.
- [RNF0023] O PAN do cartão deve ser armazenado de forma criptografada quando houver necessidade de persistência.
- [RNF0024] O CVV nunca deve ser armazenado após a etapa de autorização.
- [RNF0025] O sistema deve segregar dados sensíveis, tokens e credenciais de integração.
- [RNF0026] O sistema deve usar TLS em trânsito e proteção de dados em repouso para informações sensíveis.
- [RNF0027] O sistema deve possuir gerenciamento seguro de secrets, sem credenciais fixas em código-fonte.
- [RNF0028] O sistema deve aplicar rate limiting em endpoints sensíveis.
- [RNF0029] Os webhooks devem utilizar assinatura e proteção contra replay.
- [RNF0030] O sistema deve ser projetado considerando os princípios aplicáveis de PCI DSS.

### Escalabilidade e operação

- [RNF0031] A API deve ser stateless para permitir escalabilidade horizontal.
- [RNF0032] O sistema deve suportar processamento assíncrono por filas para operações críticas que não precisem ser síncronas.
- [RNF0033] O sistema deve aplicar mecanismos de backpressure sob carga elevada.
- [RNF0034] O sistema deve isolar falhas entre componentes críticos por meio de bulkheading.
- [RNF0035] O sistema deve suportar pelo menos 1.000 requisições por segundo no conjunto de operações críticas definido em teste de carga.
- [RNF0036] O processamento síncrono de pagamento deve atender latência máxima de 10 segundos no cenário nominal definido para integração com providers.

### Banco de dados e APIs

- [RNF0037] O sistema deve utilizar transações ACID nas operações financeiras críticas.
- [RNF0038] O sistema deve definir e documentar o nível de isolamento adequado para operações concorrentes sensíveis.
- [RNF0039] O sistema deve possuir índices adequados para consultas por ledger, pagamentos, transactions e reconciliação.
- [RNF0040] O sistema deve prever estratégia de particionamento e replicação para crescimento de volume.
- [RNF0041] A API deve ser versionável.
- [RNF0042] Os endpoints críticos de criação de pagamento e reembolso devem expor contrato idempotente.

## 4. Eventos de domínio mínimos

O sistema deve considerar ao menos os seguintes eventos de domínio:

- `payment.created`
- `payment.authorized`
- `payment.captured`
- `payment.failed`
- `payment.refunded`
- `payment.chargeback`
- `refund.created`

## 5. Observações de escopo

- Os requisitos acima definem o comportamento mínimo esperado do gateway e devem ser refinados em critérios de aceitação por caso de uso.
- Regras específicas de antifraude, liquidação, split de pagamento e reconciliação externa podem ser adicionadas em uma próxima etapa.