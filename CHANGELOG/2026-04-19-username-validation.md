---
📄 Arquivo: CHANGELOG/2026-04-19-username-validation.md
# 2026-04-19 — Username com verificação em tempo real
## Problema
O cadastro estava falhando com erro: `username: Path 'username' is required`.
O schema do MongoDB exigia username como obrigatório, mas o frontend não enviava esse campo.
Além disso, username precisa ser único no sistema.
## Solução
Implementado fluxo de username com verificação em tempo real:
1. Campo username adicionado ao formulário de cadastro
2. Verificação em tempo real se o username está disponível
3. Rota pública na API para verificar disponibilidade
---

## Alterações

### Backend

**1. `back/src/modules/mommy/mommy.repository.ts`**
Adicionado método para buscar por username:

```typescript
async findByUsername(username: string) {
  return this.model.findOne({ username: username.toLowerCase() }).lean().exec();
}
2. back/src/modules/mommy/mommy.service.ts
Adicionado método:
async findByUsername(username: string) {
  return this.repo.findByUsername(username);
}
3. back/src/modules/mommy/mommy.controller.ts
Adicionada rota pública para verificar disponibilidade:
@Get('check-username/:username')
async checkUsername(@Param('username') username: string) {
  const exists = await this.service.findByUsername(username);
  return { available: !exists };
}
---
Frontend
4. Front/src/services/api.js
Adicionado método para verificar username:
async checkUsername(username) {
  const res = await fetch(`${API_URL}/mommy/check-username/${username}`);
  const json = await res.json();
  return json.available;
}
5. Front/src/pages/Register.jsx
Reformulação completa do formulário:
- Adicionado campo username no state formData
- Adicionado input para username com validação onBlur
- Feedback visual: ✓ disponível / ✗ indisponível
- Validação impede continuar se username não for válido
- Username enviado para API no cadastro
---
Fluxo do Usuário
1. Digita nome → OK
2. Digita username → verifica API →
   - Disponível → ✅ pode continuar
   - Indisponível → ❌ mostra erro "Username já usado"
3. Digita e-mail → OK
4. Digita CPF → OK
5. Senha → OK
6. Confirma senha → OK
---
Impacto
- Cadastro agora solicita username único
- Validação impede username duplicado
- Backend persiste username em lowercase
- Sistema funciona para MVP
---
```
