# 2026-04-06 — SellerModule fix e ajustes de inicialização

## Problema
O `SellerModule` estava incompleto — não registrava o controller, o repository nem importava o `MongooseModule` para o schema `Seller`. Como o `AppModule` importa o `SellerModule`, o backend **não iniciava** por causa de dependencies não resolvidas.

## Alterações

### 1. `back/src/modules/seller/seller.module.ts`

**Antes:**
```ts
import { Module } from '@nestjs/common';
import { SellerService } from './seller.service';

@Module({
  providers: [SellerService]
})
export class SellerModule {}
```

**Depois:**
```ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SellerService } from './seller.service';
import { SellerController } from './seller.controller';
import { SellerRepository } from './seller.repository';
import { SellerSchema } from './schemas/seller.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Seller', schema: SellerSchema }])],
  controllers: [SellerController],
  providers: [SellerService, SellerRepository],
})
export class SellerModule {}
```

### 2. `back/src/modules/mommy/mommy.controller.ts` (linha 29)

Corrigido parâmetro no endpoint `POST /mommy/update`.

**Antes:** `this.service.update(mommy._id, data)`
**Depois:** `this.service.update(mommy.id, data)`

O `@CurrentUser()` retorna `{ id: payload.sub, email: payload.email }` — o campo é `id`, não `_id`. O acesso a `mommy._id` retornava `undefined`.

### 3. `back/src/main.ts`

Adicionado `app.enableCors()` para habilitar CORS em todas as rotas, permitindo que o frontend faça requests ao backend.

## Impacto

- Backend agora inicializa corretamente.
- Endpoints de cadastro e login de mães (`POST /auth/register`, `POST /auth/login`) funcionais.
- Endpoints protegidos por JWT (`GET/PUT /auth/me`, `GET /mommy/me`) funcionais.
- Módulo de seller (vendedor) operacional: `POST/GET/PUT /sellers/*`.
