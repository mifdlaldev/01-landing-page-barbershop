# SLOWCUTS — Portfolio #01

> The cut that earns the wait.

A senior-level, anti-AI-slop landing page for a fictional premium barbershop in Kemang, Jakarta. Built as Portfolio #01 of a 40-project series.

## Stack

- **Next.js 15** (App Router, RSC, Turbopack) + **React 19**
- **TypeScript 5** (strict, noUncheckedIndexedAccess)
- **Tailwind CSS v4** (CSS-first @theme)
- **motion** (formerly Framer Motion)
- **@phosphor-icons/react** (Duotone + Fill)
- **Fraunces** (variable heading) + **Inter Tight** (body) + **JetBrains Mono** (mono)
- **Bun** (package manager + scripts)
- **Biome** (linter + formatter)
- **Vitest** + **Playwright** (unit + E2E + visual)

## Quickstart

```bash
bun install
bun run dev          # http://localhost:3000
bun run build        # production build
bun run type-check   # 0 errors expected
bun run lint         # 0 errors expected
bun run test         # 9/9 tests
bun run check-bundle # bundle budget check
```

## Project Structure

```
app/                  — Next.js routing + layout
components/
  shared/             — Reusable (FadeIn, SectionHeading, Container)
lib/
  data/               — Static content (services, barbers, faqs, etc.)
  hooks/              — Custom React hooks
  utils.ts            — cn(), formatPrice(), formatBookingId()
tests/                — Unit + E2E tests
docs/superpowers/     — Specs + implementation plan
```

## Status

Phase 1 (Foundation) complete. Sections in progress — see [implementation plan](docs/superpowers/plans/2026-06-15-slowcuts-barbershop-landing.md).
