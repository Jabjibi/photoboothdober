# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev          # Start dev server at http://localhost:3000
npm run build        # Production build
npm run lint         # ESLint check
npm run lint:fix     # ESLint auto-fix
npm run format       # Prettier format all files
npm run format:check # Check formatting (use in CI)
```

No test runner is configured yet.

## Stack

- **Next.js 16.2.6** — App Router only. APIs differ significantly from v13–15; read `node_modules/next/dist/docs/` before writing code.
- **React 19** with React Compiler enabled (`reactCompiler: true` in `next.config.ts`) — do not add manual `useMemo`/`useCallback` optimizations.
- **TypeScript** (strict)
- **Tailwind CSS v4** via `@tailwindcss/postcss`
- **Geist** font via `next/font/google`

## Key Patterns

### RSC Boundaries

- Only Server Components can be `async`. Never add `async` to a component in a file with `'use client'`.
- Props from Server → Client must be JSON-serializable: no `Date`, `Map`, `Set`, functions, or class instances. Serialize dates with `.toISOString()`.
- Server Actions (`'use server'`) are the only functions that can be passed from server to client.

### Async APIs (Next.js 15+)

`params`, `searchParams`, `cookies()`, and `headers()` are async — always `await` them or use `React.use()` in sync components:

```tsx
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
}
```

### Directives

- `'use client'` — required for hooks, event handlers, browser APIs
- `'use server'` — marks Server Actions
- `'use cache'` — Next.js caching directive (requires `cacheComponents: true` in config)

### Middleware

In Next.js 16, middleware is renamed from `middleware.ts` → `proxy.ts`.

## Component Architecture

Follow the Vercel composition patterns in `.agents/skills/vercel-composition-patterns/`:

- Avoid boolean props that switch behavior — use explicit variant components or compound components instead.
- No `forwardRef` (React 19) — pass `ref` as a regular prop.
- Use `children` for composition over render props.
- Provider is the only place that manages state implementation (decouple interface from implementation).
