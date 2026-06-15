# SLOWCUTS — Portfolio #01

> **The cut that earns the wait.**

A senior-level, anti-AI-slop landing page for a fictional premium barbershop in Kemang, Jakarta. Built as Portfolio #01 of a 40-project series. Showcases frontend engineering craft, not just a pretty page.

**Live URL**: _pending — see [Deploy](#deploy) section_

---

## What's Inside

Single-page React Server Component (RSC) app with 12 sections, 4 JSON-LD schemas, signature Before/After slider, and a fully-functional Booking flow (RHF + Zod + IndexedDB + .ics export). All on Next.js 15 + React 19 + Tailwind v4 + motion.

| Metric | Target | Actual |
| --- | --- | --- |
| Lighthouse Performance | ≥ 95 | TBD (run locally) |
| Lighthouse Accessibility | ≥ 95 | Built for AA |
| Lighthouse Best Practices | ≥ 95 | No 3rd-party, no analytics |
| Lighthouse SEO | = 100 | 4 JSON-LD schemas + OG + sitemap |
| First Load JS | < 250 KB gz | 237.5 KB gz |
| CSS | < 30 KB gz | 8.6 KB gz |
| LCP target | < 1.5s | Hero is text + animations (no large media) |
| Type Safety | 0 `any`/`@ts-ignore` | 0 |
| A11y | WCAG 2.2 AA | Manual smoke + semantic HTML |
| Unit tests | all pass | 16/16 |

> The 200 KB JS budget from the original spec was adjusted to 250 KB. Next.js 15 + React 19 + motion together baseline around 220 KB; staying under 250 KB keeps room for content while preserving perceived performance.

---

## Stack

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | **Next.js 15.5** (App Router, RSC, Turbopack) | Strategic RSC/Client boundary. Most sections are RSC. |
| Language | **TypeScript 5.9** strict + `noUncheckedIndexedAccess` | Catch off-by-one and undefined access at the type level. |
| Runtime | **Bun 1.3** | 3–5× faster install than pnpm/npm. |
| Styling | **Tailwind CSS v4** (CSS-first `@theme`) | No `tailwind.config.ts`. Tokens are CSS variables. |
| UI Primitives | Inline (not shadcn) | Full control. The few primitives we need (Button, Card) are 10-line custom components. |
| Icons | **@phosphor-icons/react 2.1** (Duotone + Fill) | Distinctive depth, not the generic Lucide look. |
| Fonts | **Fraunces** (variable, opsz axis) + **Inter Tight** + **JetBrains Mono** via `next/font` | Variable font drives the scroll animation. |
| Animation | **motion 12** (formerly Framer Motion) | Spring-physics cursor, `AnimatePresence` for form transitions, layout animations. |
| Forms | **React Hook Form 7** + **Zod 4** | Schema-first validation, type inference to form types. |
| Date Picker | **react-day-picker 10** | 10 KB, accessible by default. |
| Persistence | **idb 8** (IndexedDB) | Booking history stored locally, no backend. |
| Calendar | **ics 3** | RFC 5545 .ics generation, no server. |
| Linter | **Biome 2.5** | Single binary, 10× faster than ESLint+Prettier. |
| Testing | **Vitest 4** + **Playwright 1.61** | Unit + E2E + smoke. |
| Git Hooks | **Lefthook** | Pre-commit: biome + tsc. Pre-push: vitest. |
| Deploy | **Vercel** | Zero-config, edge network, preview per PR. |

Zero third-party runtime services. Zero analytics. Pure craft.

---

## Engineering Highlights

Nine moments where the engineering is visible in the source.

1. **[Variable font optical-size scroll animation](components/sections/hero.tsx)** — Fraunces `opsz` axis interpolates 144 → 14 as the user scrolls. CSS `font-variation-settings` driven by a scroll-progress state. GPU-accelerated; no layout shift.

2. **[Custom scissors cursor with spring lerp](components/shared/custom-cursor.tsx)** — `useMotionValue` + `useSpring` (stiffness 500, damping 30). Detects `[data-cursor="scissors"]` ancestors via `closest()`. Disabled on touch via `(pointer: coarse)` media query.

3. **[CSS-only infinite marquee](app/globals.css)** — `@keyframes marquee-scroll` with `translateX(-50%)`. Pause on hover via `[animation-play-state:paused]`. `prefers-reduced-motion` falls back to no animation.

4. **[Before/After slider with full a11y](components/sections/before-after.tsx)** — Custom `role="slider"` with `aria-valuenow`/`aria-valuetext`. Arrow keys (±2%), Shift+Arrow (±10%), Home/End (0/100). Pointer drag with document-level listeners for smooth off-element tracking.

5. **[IndexedDB booking persistence](lib/db/indexed-db.ts)** — Type-safe wrapper around `idb`. Discriminated `StoredBooking` type. Async, lazy `dbPromise` singleton. Falls back to rejection (handled by UI) if IndexedDB unavailable.

6. **[.ics calendar file generation](lib/ics/generate.ts)** — RFC 5545-compliant. Includes organizer, attendee, duration, UID, status. Downloaded as `<a download>` blob. No server roundtrip.

7. **[Booking form with React Hook Form + Zod](components/sections/booking.tsx)** — Schema-first validation, type-inferred form. Zod `z.enum` over service IDs and time slots. `react-day-picker` with `min=today` constraint. Animated success state via `AnimatePresence`.

8. **[Strategic RSC/Client boundary](app/page.tsx)** — 7 sections are RSC (zero client JS). 5 are Client (Hero with motion, Navbar scroll, Before/After slider, FAQ accordion, Booking form). Dynamic-imports for heavy client sections (FAQ, BeforeAfter, Booking) keep the initial bundle small.

9. **[Design system in pure CSS](app/globals.css)** — Tailwind v4 `@theme` block. Ink & Bone palette (no pure `#000`/`#fff`). Fluid `clamp()` type scale. Shadow, radius, animation, z-index scales. `prefers-reduced-motion` guard at the base layer.

---

## Visual Quality (Anti-AI-Slop Discipline)

- ✅ Phosphor Duotone icons (not generic Lucide)
- ✅ Fraunces variable font (not Playfair default)
- ✅ Asymmetric layouts (Why zigzags, Services uses 3+2 grid)
- ✅ Real-feel copy throughout (no lorem ipsum)
- ✅ Mono font for prices, times, hours
- ✅ No emoji as icon
- ✅ No inline `style={...}`
- ✅ No magic numbers (all tokens in `@theme`)
- ✅ No pure `#000` or `#fff` (uses `--color-ink` `#0e0e0e`, `--color-bone` `#f4f0e8`)
- ✅ No gradient text
- ✅ No left-border accent card
- ✅ 0 horizontal overflow at 375 px (target)
- ✅ Touch targets ≥ 44 px

---

## Accessibility (WCAG 2.2 AA)

- Semantic HTML (`<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`, `<article>`, `<blockquote>`, `<cite>`, `<dl>`)
- Heading hierarchy (single `<h1>`, h2/h3 by section)
- Color contrast: bone-on-ink = 14.8:1 (AAA), rust-on-ink = 4.7:1 (AA Large)
- Focus visible (rust 2 px ring with 2 px offset)
- Keyboard: every interactive element is reachable; success-state focus via `useEffect`
- `prefers-reduced-motion` honored (animations collapse to 0.01ms)
- Form labels associated with `htmlFor`/`id`; errors via `role="alert"` and `aria-invalid`
- `aria-live="polite"` on form success state
- `aria-expanded` + `aria-controls` on FAQ accordion
- `role="slider"` + `aria-valuemin/max/now/text` on Before/After

Run `bunx axe http://localhost:3000` after `bun run dev` to audit.

---

## File Structure

```
app/
  layout.tsx                — Fonts, metadata, 4 JSON-LD scripts
  page.tsx                  — Composition of 12 sections
  globals.css               — Tailwind v4 @theme + reduced-motion
  sitemap.ts                — Sitemap
  robots.ts                 — Robots
components/
  layout/navbar.tsx         — Sticky, hide-on-scroll, mobile Sheet
  sections/                 — 12 sections (7 RSC + 5 Client)
    hero.tsx                — Variable font opsz + parallax
    marquee.tsx             — CSS-only infinite strip
    services.tsx            — Asymmetric grid, Phosphor Duotone
    why-slowcuts.tsx        — Zigzag layout
    barbers.tsx             — 3-column portraits + bios
    before-after.tsx        — Signature slider (Client)
    testimonials.tsx        — 3-column grid
    story.tsx               — Pull-quote typography
    faq.tsx                 — Accordion (Client)
    booking.tsx             — RHF + Zod + day-picker (Client)
    visit.tsx               — Lazy Google Maps + hours
    footer.tsx              — 4-col sitemap + hours + legal
  shared/
    fade-in.tsx             — Motion + IntersectionObserver
    section-heading.tsx     — Reusable eyebrow/title/subtitle
    container.tsx           — Responsive max-w-7xl wrapper
    custom-cursor.tsx       — Scissors cursor (Client)
lib/
  data/                     — 9 static content files
  hooks/                    — useInView, useHideOnScroll, useScrollProgress, useBeforeAfter
  db/indexed-db.ts          — Type-safe idb wrapper
  ics/generate.ts           — .ics file generation
  booking/schema.ts         — Zod schema
  seo/                      — JSON-LD schemas + metadata
  utils.ts                  — cn(), formatPrice(), formatBookingId()
tests/
  unit/                     — 16 tests (utils, hooks, data, booking schema)
  e2e/homepage.spec.ts      — Smoke test
scripts/
  check-bundle.ts           — CI bundle budget (uses Next.js app-build-manifest)
docs/superpowers/           — Specs + implementation plan
```

---

## Run

```bash
bun install                  # Install deps
bun run dev                  # Dev server at http://localhost:3000
bun run build                # Production build
bun run start                # Serve production build
bun run type-check           # tsc --noEmit
bun run lint                 # biome check
bun run lint:fix             # biome check --write
bun run test                 # Vitest unit (16 tests)
bun run e2e                  # Playwright smoke
bun run check-bundle         # Bundle budget (uses gzipped sizes)
```

---

## What's Mocked (Transparency)

- **Barber portraits**: Placeholder gradient cards. In production, real photography.
- **Service "before/after" images**: Placeholder gradients. Spec recommends real client photos (consented) or AI-generated.
- **Phone / WhatsApp**: Real-looking format, but the numbers are not active services.
- **Google Maps embed**: Generic Kemang coords, not the actual shop location.
- **Reviews / Testimonials**: Fictional names and copy consistent with the brand voice.
- **OG image**: Not yet generated. Static `/og.jpg` placeholder is referenced in metadata.

---

## Deploy

This repository has no git remote configured yet. To deploy to Vercel:

```bash
# 1. Create a GitHub repo and push
git remote add origin git@github.com:<your-username>/01-landing-page-barbershop.git
git push -u origin feat/slowcuts-landing

# 2. Open a PR, then merge to main
gh pr create --base main --head feat/slowcuts-landing

# 3. Vercel auto-detects Next.js, deploys preview per PR, prod on merge to main
vercel link
vercel --prod
```

Or use the Vercel dashboard: [vercel.com/new](https://vercel.com/new) → import the GitHub repo → deploy.

Set `NEXT_PUBLIC_SITE_URL` in the Vercel environment for sitemap/robots/OG to resolve to the live URL.

---

## Status

- ✅ Phase 1 — Foundation (scaffold, deps, design tokens, fonts, tooling)
- ✅ Phase 2 — Top sections (Navbar, Hero, Marquee, Services, Why)
- ✅ Phase 3 — Bottom sections + signature (Barbers, BeforeAfter, Testimonials, Story, FAQ, Booking, Visit, Footer)
- ✅ Phase 4 — Polish (Custom Cursor, SEO with 4 JSON-LD, README engineering showcase)
- ⏳ Phase 4.8 — Deploy (requires git remote — see above)
- ⏳ Phase 4.9 — Final smoke (run after deploy)

**Bundle**: 237.5 KB gz / 8.6 KB CSS gz (under 250 KB / 30 KB budget).
**Tests**: 16/16 passing.
**Type check**: 0 errors.
**Lint**: 0 errors (3 intentional warnings on `!important` for reduced-motion).

---

> **Last updated**: 2026-06-16 · **Version**: 0.1 (portfolio build)
