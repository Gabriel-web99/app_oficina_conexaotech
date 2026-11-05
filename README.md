# App Oficina Conexaotech

Aplicação de teste criada com React 19, Vite e Supabase.

## Requisitos

- Node.js 22.12+ (recomendado para o Vite atual)
- npm

## Instalação

```bash
npm install
cp .env.example .env.local
npm run dev
```

Preencha `.env.local` com a URL do projeto Supabase e a chave publicável:

```env
VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_sua_chave
```

Nunca coloque uma chave `service_role` ou `sb_secret_` em variáveis `VITE_*`: elas são enviadas ao navegador.

## Banco de dados

Execute o SQL de `supabase/migrations/20261104000100_create_teste_nomes.sql` no SQL Editor do Supabase.

A tabela `public.teste_nomes` permite inserção anônima para este teste, protegida por RLS. A política não permite leitura pública dos registros.

## Scripts

- `npm run dev`: servidor local
- `npm run build`: build de produção
- `npm run preview`: visualizar o build localmente

## Publicação na Vercel

Importe este repositório na Vercel, mantenha a raiz do projeto como `./` e configure as variáveis `VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY` em Project Settings → Environment Variables.
