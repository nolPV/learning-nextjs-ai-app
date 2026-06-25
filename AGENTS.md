<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

ให้ใช้ any ได้เฉพาะกรณีนี้ @any-rule.md

## Development Guidelines
For TypeScript code style and best practices, please refer to @docs/typescript-guidelines.md

# nextjs-ai-app-starter (Next.js 16 E-Commerce)

## Dev commands
- `pnpm dev` — dev server at http://localhost:3000
- `pnpm build` — production build (relies on Prisma client being generated first)
- `pnpm lint` — ESLint (config uses `eslint-config-next/core-web-vitals` + `eslint-config-next/typescript`)
- `pnpm start` — run production server
- No test script exists; no test framework is configured.

## Required before build
Run `npx prisma generate` to generate the Prisma Client to `generated/prisma/`. This is **not** automatic — the import path in `src/lib/prisma.ts` is `../../generated/prisma/client` (not `@prisma/client`). The directory is gitignored.

## Database (Prisma 7 + MariaDB)
- Schema: `prisma/schema.prisma` — uses `@prisma/adapter-mariadb`
- Config: `prisma.config.ts` (loads `DATABASE_URL` via dotenv)
- `.env` contains the live connection string — do not commit changes to it
- Docker MariaDB setup: `docs/install_mariadb_with_docker.txt`
- SQL schema reference: `docs/create_table_ecommerce.sql`

## Auth (better-auth 1.6.11)
- Email/password, auto-sign-in disabled, min password length 8
- API route: `src/app/api/auth/[...all]/route.ts` — catch-all handler
- Server lib: `src/lib/auth.ts` — uses Prisma adapter (MySQL)
- Client lib: `src/lib/auth-client.ts`
- Auth [User, Session, Account, Verification] models are in `prisma/schema.prisma` under `user`, `session`, `account`, `verification` tables

## Architecture notes
- **Route Groups**: `(auth)/` (login/signup) and `(front)/` (main site) — each has its own `<html>` root layout
- **State**: Zustand with `persist` middleware for cart (`src/lib/cart-store.ts`) — stored in localStorage under key `skill-cart`
- **CSS**: Tailwind CSS v4 via `@tailwindcss/postcss`, shadcn/tailwind.css, tw-animate-css. CSS variables in `@theme inline` block.
- **shadcn/ui**: Radix Luma style, RemixIcon icons. Components at `src/components/ui/`
- **Dynamic routes**: Use `connection()` from `next/server` to signal dynamic rendering (see `src/app/(front)/product/page.tsx`)
- **Config quirk**: `next.config.ts` enables `cacheComponents: true` (non-default)

## Path aliases
- `@/*` → `./src/*`

## Docker
Multi-stage build in `Dockerfile` — uses `output: standalone`. Requires `npx prisma generate` during build. Prisma generated client and schema are copied into the runner stage.
