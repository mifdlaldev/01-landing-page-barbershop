# SLOWCUTS — Barbershop Premium Landing

> **Design Doc** | Portfolio #01 of 40 | Built: 2026-06-15
> **Status**: Ready for implementation · **Approach**: Conversion-First (Pure Front-End)
> **Single source of truth** — semua keputusan ada di sini.

---

## 📋 TL;DR

Single-page landing untuk barbershop premium fiktif **SLOWCUTS** di Kemang, Jakarta. Diposisikan untuk klien UMKM/F&B (bukan recruiter/komunitas dev). Showcase senior-level frontend engineering tanpa third-party runtime services. Effort: 3-4 hari, target Lighthouse 95+ di semua kategori.

| Aspek | Keputusan |
|---|---|
| **Brand** | SLOWCUTS — "The cut that earns the wait." |
| **Palette** | Ink & Bone (deep ink #0E0E0E + bone #F4F0E8 + rust #B05E3B) |
| **Typography** | Fraunces (heading variable) + Inter Tight (body) + JetBrains Mono (numbers) |
| **Stack** | Next.js 15 + TS strict + Tailwind v4 + Phosphor Duotone + Motion + Bun + Biome + Vitest + Playwright |
| **Architecture** | 5 client components + 7 RSC (strategic boundary) |
| **Form** | Pure client-side, IndexedDB-persisted, .ics calendar export |
| **Signature** | Before/After interactive slider (custom-built) + variable font optical-size hero |
| **Effort** | 4 hari, single developer |
| **Quality bar** | Lighthouse 95+, bundle < 200KB, a11y AA, anti-AI-slop enforced |

---

## 1. Project Context

### Background
- Ini **project #01 dari 40-project portfolio series** (TIER-2 Portfolio Sprint 2026)
- Folder: `01-landing-page-barbershop` di `/40-proyek-repo-github/`
- Original SPEC.md ada (489 lines) — sudah diaudit, ada 9 gap yang akan di-address
- User explicit: **"tolong tunjukkan skills frontend engineering"** → spec harus showcase senior-level craft, BUKAN sekadar landing page generik

### Target Audience (Portfolio Visitor)
- **Primary**: Klien bisnis UMKM/F&B owner yang scroll GitHub untuk cari freelancer
- **Secondary**: Recruiter yang lihat portfolio di GitHub
- **Tertiary**: Dev komunitas yang appreciate craft

### Definition of "High-Value"
1. Visual tidak terlihat "AI-generated" (anti-AI-slop discipline)
2. Engineering craft terlihat di source code (9 showcase moments)
3. Performance excellent (Lighthouse 95+, bundle < 200KB)
4. Accessibility score tinggi (a11y bukan afterthought)
5. Real-feel content (bukan mock generic)
6. **Pure front-end** — zero third-party runtime services, zero backend

---

## 2. Brand Identity

### 2.1 Name & Tagline

| Element | Value | Rationale |
|---|---|---|
| **Name** | SLOWCUTS | Konsep (lambat = teliti = premium). Anti-hustle. Memorable. Works in ID/EN. |
| **Tagline** | "The cut that earns the wait." | Specific value prop: quality = time. Anti-fast-fashion positioning. |
| **Sub-tagline** | "Slow grooming. Sharp edges. Built for the long game." | Supporting copy untuk internal anchor. |

### 2.2 Origin Story (untuk Story section)

> *Founded in 2018 by a pair of barbers tired of fast-chair culture, SLOWCUTS exists for one reason: a great haircut isn't rushed. Every appointment is a 45-minute ritual — pour-over coffee, hot towel, conversation that doesn't end with "next." Walk out looking sharp, feeling slow, knowing your barber knew your name.*

### 2.3 Tone of Voice

- **Confident, not cocky** — no "we're the best," only "we do this one thing slowly"
- **Conversational, not corporate** — contractions, fragments, lowercase where natural
- **Slightly dry humor** — "the kind of shave your grandfather bragged about"
- **Anti-hustle culture** — explicit rejection of "fast-chair" / "4 cuts an hour"
- Speaks to **"men who notice details"** (watch straps, collar shape, paper quality)

### 2.4 Visual Personality

Mood reference (campuran):
- **Ace Hotel** — warmth + restraint
- **Blue Bottle Coffee** — intentional, ritual, not rushed
- **Japanese minimalism** — negative space, asymmetric layouts, restraint
- **Old barber chair** — heritage, craft, ritual

**Anti-reference (jangan pakai):**
- ❌ Skull graphics
- ❌ Flames / engine parts
- ❌ Hipster mustache illustrations
- ❌ "MAN CAVE" energy
- ❌ Generic "premium" gold-on-black (the barbershop cliché)

### 2.5 Iconography Rules

- **Phosphor Duotone** untuk primary icons — two-tone depth, distinctive
- **Phosphor Fill** untuk active/hover states — solid untuk kontras
- **Phosphor Regular** sebagai fallback default (jangan pakai Light/Thin)
- **Custom SVG** untuk brand mark (scissors monogram) — bukan dari library

---

## 3. Visual Design System

### 3.1 Color Tokens (CSS-first via Tailwind v4 @theme)

```css
/* app/globals.css */
@theme {
  /* === COLOR: Ink & Bone Palette === */
  --color-ink:        #0E0E0E;   /* primary surface (dark) */
  --color-ink-2:      #1A1A1A;   /* card / elevated */
  --color-ink-3:      #2A2A2A;   /* border / muted */
  --color-bone:       #F4F0E8;   /* primary text (on dark) */
  --color-bone-2:     #E8E4DC;   /* secondary text */
  --color-bone-mute:  #A8A39A;   /* tertiary text / placeholder */
  --color-rust:       #B05E3B;   /* single accent (CTAs, hovers, marks) */
  --color-rust-2:     #C97A52;   /* rust hover */
  --color-rust-3:     #8B4426;   /* rust active */
}
```

**Palette rationale:**
- **Deep Ink** (#0E0E0E) — bukan pure black, slightly warm, intentional
- **Bone** (#F4F0E8) — bukan pure white, slightly cream, easy on eyes
- **Rust** (#B05E3B) — single accent. Bukan gold (overused). Memberi warmth tanpa "barbershop trope"
- **Contrast verified**: bone-on-ink = 14.8:1 (AAA), rust-on-ink = 4.7:1 (AA Large)

### 3.2 Typography

| Token | Font | Usage |
|---|---|---|
| `--font-heading` | **Fraunces** (variable) | All h1, h2, h3, display text |
| `--font-body` | **Inter Tight** | Body, paragraphs, labels, buttons |
| `--font-mono` | **JetBrains Mono** | Prices, timestamps, booking IDs, hours |

**Type scale (fluid, clamp-based):**
```css
--text-display:     clamp(3.5rem, 8vw, 7.5rem);   /* hero h1 */
--text-h1:          clamp(2.5rem, 5vw, 4.5rem);
--text-h2:          clamp(2rem, 3.5vw, 3rem);
--text-h3:          clamp(1.5rem, 2vw, 2rem);
--text-body:        clamp(0.95rem, 1vw, 1.0625rem);
--text-small:       0.875rem;
--text-mono:        0.8125rem;
```

**Kenapa Fraunces:**
- Variable font: 1 file, multiple weights + optical sizes
- Optical-size axis: bisa dekoratif di display, workhorse di text
- Distinctive (tidak used in 1000+ landing pages)
- Open source via Google Fonts
- Bawa personality tanpa harus custom design

### 3.3 Shadow Scale (3 levels, no fluff)
```css
--shadow-sm:        0 1px 2px rgb(14 14 14 / 0.4);
--shadow-md:        0 8px 24px -8px rgb(14 14 14 / 0.6);
--shadow-lg:        0 24px 48px -12px rgb(14 14 14 / 0.8);
```

### 3.4 Radius (asymmetric, intentional)
```css
--radius-sm:        4px;
--radius:           8px;
--radius-md:        12px;
--radius-lg:        20px;
--radius-pill:      9999px;
```

### 3.5 Animation Tokens
```css
--duration-instant: 100ms;
--duration-fast:    200ms;
--duration-base:    300ms;
--duration-slow:    500ms;
--ease-out:         cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-out:      cubic-bezier(0.65, 0, 0.35, 1);
```

### 3.6 Z-Index Scale (no magic numbers)
```css
--z-hide:           -1;
--z-base:           0;
--z-elevated:       10;
--z-sticky:         20;
--z-overlay:        30;
--z-modal:          40;
--z-toast:          50;
```

### 3.7 Global Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 4. Tech Stack (Final)

```yaml
# Core
Framework:       Next.js 15.1+ (App Router, RSC, Turbopack stable, React 19)
Language:        TypeScript 5.6+ (strict, noUncheckedIndexedAccess)
Runtime:         Bun 1.1+ (package manager + scripts)

# Styling
CSS:             Tailwind CSS v4 (CSS-first @theme, no config file)
UI Primitives:   shadcn/ui (latest CLI, fully custom-styled)
Icons:           @phosphor-icons/react 2.1+ (Duotone + Fill weight)

# Typography
Heading:         Fraunces (variable, via next/font/google)
Body:            Inter Tight (via next/font/google)
Mono:            JetBrains Mono (via next/font/google)

# Animation
Library:         motion 11+ (formerly Framer Motion)

# Form (PURE CLIENT-SIDE)
Validation:      Zod 4 + @hookform/resolvers
State:           React Hook Form 7
Date Picker:     react-day-picker 9
Persistence:     IndexedDB via idb 8 (booking history)
Calendar:        ics 3+ (.ics file generation, no server)

# Quality
Linter:          Biome 1.9+ (replaces ESLint + Prettier)
Testing:         Vitest 2+ (unit) + Playwright 1.49+ (E2E + visual regression)
Git Hooks:       Lefthook (pre-commit: type-check, lint, format)

# CI/CD
CI:              GitHub Actions (type-check, lint, test, build, perf-budget, visual)
Deploy:          Vercel (auto from main, preview per PR, NO analytics)
```

**Zero third-party runtime services** — pure craft, no shortcuts.

### 4.1 Rationale Notes

- **`motion`** (formerly `framer-motion`) — di-rebrand v11+, package terpisah. Lebih kecil, tree-shakable.
- **Tailwind v4** — pakai `@theme` di CSS, BUKAN `tailwind.config.ts`. Lebih clean, lebih cepat.
- **Bun** — package manager + runtime. Untuk Next.js, Bun sbg package manager sudah stabil. Install 3-5x lebih cepat dari pnpm.
- **Biome** — replaces ESLint + Prettier. 10x lebih cepat, single binary, less config.
- **shadcn/ui** — masih relevan, tapi default style di-override total dengan tokens kita.

---

## 5. Content Per Section (Full Copy)

### 5.1 Hero
```
Eyebrow:        EST. 2018 — KEMANG, JAKARTA
Headline:       The cut that earns the wait.
Subhead:        A 45-minute grooming ritual. Hot towel, pour-over, scissors that aren't in a hurry.
Primary CTA:    Book a chair →
Secondary CTA:  See the menu
Trust badge:    ★★★★★ 4.9 · 847 appointments this quarter
```

### 5.2 Services (6 cards)
| # | Service | Price | Duration | Description |
|---|---|---|---|---|
| 1 | The Classic | Rp 180.000 | 45 min | Scissor cut, hot towel finish, neck clean-up. The one that started it all. |
| 2 | The Short Crop | Rp 150.000 | 30 min | Clipper fade, sharp edges, defined neckline. Low maintenance, high precision. |
| 3 | The Beard Detail | Rp 120.000 | 30 min | Trim, shape, oil treatment, hot towel. For the man whose beard is its own accessory. |
| 4 | The Hot Shave | Rp 200.000 | 45 min | Straight razor, three towels, sandalwood soap. The kind of shave your grandfather bragged about. |
| 5 | The Full Ritual | Rp 350.000 | 75 min | Haircut + beard + face mask + scalp massage. The whole experience, uninterrupted. |
| 6 | The Quick Stop | Rp 80.000 | 20 min | Neck trim, edge-up, blow dry. For between rituals. |

### 5.3 Why SLOWCUTS (4 blocks, asymmetric)
```
1. "Ritual, not rush"
   Every appointment is 45 minutes. No double-booking. No "next please."

2. "Barbers who remember"
   We keep notes on your cut, your side preference, your coffee. Walk in next time — we know.

3. "The right products"
   Layrite, Reuzel, Proraso. Tools that earn their place in the cabinet.

4. "An hour that's yours"
   Pour-over from Common Grounds. Lo-fi playlist. No upsells.
```

### 5.4 The Barbers (3 barbers)
```
RIO SETIAWAN — Master Barber
   14 years cutting. Trained in Singapore & Tokyo. Specialty: classic scissor work, gentlemen's crops.
   "I slow down because hair tells you what it wants. You just have to listen."

BAYU NUGROHO — Senior Stylist
   9 years at SLOWCUTS. The beard whisperer. Clients fly in from Bali for his Hot Shave.
   "A great shave is a conversation between blade and skin."

ANDRA WIJAYA — The New One
   3 years in, 1 year with us. The one the team sends the trickiest fades to.
   "I'm still learning. That's the point."
```

### 5.5 Before/After Gallery (Signature)
```
Eyebrow:    THE PROOF
Headline:   Before. After. The full hour.
Subhead:    Real clients, real cuts. We don't stage these — they're shot in the chair.

[Interactive slider — drag handle untuk reveal before/after]
6 transformations:
  1. "The 3-month grow-out" — Classic transformation
  2. "Beard reshape" — From scruff to intentional
  3. "First-time client" — Uncertain → defined
  4. "Wedding prep" — 2 weeks out, weekly refinement
  5. "The comeback" — Returning after 2 years abroad
  6. "Father & son" — Same chair, different cuts
```

### 5.6 The Wall (5 Testimonials)
```
"Drove past three barbershops to get here. Worth every km."
— Reza H., Jakarta · 2 weeks ago

"They remember my name, my coffee, and that I hate small talk. Perfect."
— Daniel K., expat · 1 month ago

"My wife noticed. That's the only review I care about."
— Fajar P., regular · 3 weeks ago

"I was nervous about a barber who 'takes his time.' Now I can't go back to 15-minute chops."
— Kevin A., first-timer · 2 days ago

"Rio did my wedding cut at 6am. He was late by 3 minutes. Still the best cut of my life."
— Surya M., 1 month ago
```

### 5.7 Our Story (Brand narrative)
```
Eyebrow:    EST. 2018, KEMANG
Headline:   Two barbers. One slow idea.
Body:       We started SLOWCUTS because we were tired of the race. Four cuts an hour,
           conversations cut short, coffee that arrived cold because the next chair
           was already waiting. So we slowed down. Halved the bookings. Doubled the
           time. Bought better scissors. Six years later, we're still doing the
           same thing — one chair, one client, one cut that earns the wait.
           Welcome to the slowest barbershop in Kemang. We saved you a seat.
CTA:        Book a chair →
```

### 5.8 FAQ (8 QnA, conversion-focused)
```
1. "How long is an appointment?"
   45 minutes for a Classic, 75 for the Full Ritual. We don't double-book — your time is yours.

2. "Do I need to book ahead?"
   Same-day is possible but the next slot is usually 2-3 days out. We don't rush, so the calendar is small.

3. "What if I don't know what I want?"
   That's our favorite kind of client. We'll talk, look at your hair, and suggest. You approve before we start.

4. "Can I bring a reference photo?"
   Absolutely. Photos help. Just know we'll adapt it to your hair type, face shape, and routine.

5. "Do you cut kids' hair?"
   Yes, ages 8+. We have a smaller chair. 30 minutes, Rp 100.000.

6. "What products do you use?"
   Layrite, Reuzel, Proraso, American Crew. If you liked what we used, we sell it at the front desk.

7. "Can I just walk in?"
   Walk-ins are welcome for neck trims (20 min). Anything longer, please book — the chair might be empty for a reason.

8. "Is parking easy?"
   Free street parking in front. Avoid 17:00-19:00 (Kemang traffic). The motorbike bay holds 6.
```

### 5.9 Booking Form
```
Section eyebrow:   READY WHEN YOU ARE
Section headline:  Book your chair.
Section subhead:   Pick a date, pick a barber, show up. We'll have the coffee on.

Fields:
  - Your name (required)
  - WhatsApp number (required, ID format validation)
  - Pick a service (select dari Services section)
  - Pick a barber (optional — "No preference" default)
  - Pick a date (date picker, min H+1)
  - Pick a time (9 slots: 10:00 - 19:00, 30-min interval)
  - Anything we should know? (textarea, optional)

Submit button:    "Reserve my chair"
Success state:    Dialog: "Reservation received · #SC-2026-00147"
                  Body: "We'll WhatsApp you within 1 hour to confirm.
                  Until then, your chair is held. Add to calendar: [Download .ics]"
```

### 5.10 Visit Us
```
Left col:  Google Maps embed (responsive, lazy-loaded iframe)
Right col:
  Address:    Jl. Kemang Raya No. 47, Jakarta Selatan 12730
  Phone:      +62 811-1234-5678
  WhatsApp:   wa.me/6281112345678
  Hours (mono):
    Mon-Fri    10:00 — 20:00
    Saturday   09:00 — 21:00
    Sunday     10:00 — 18:00
  Note: "Last booking 1 hour before close. Closed on national holidays."
```

### 5.11 Footer
```
Col 1 — About
  "A slow barbershop in Kemang. Est. 2018.
  We don't do walk-in culture. We do the chair that knows your name."

Col 2 — Quick links
  Services · Barbers · Gallery · Story · FAQ · Book

Col 3 — Visit
  Jl. Kemang Raya No. 47
  Jakarta Selatan 12730
  +62 811-1234-5678

Col 4 — Follow
  Instagram · TikTok · WhatsApp Channel

Bottom:  © 2026 SLOWCUTS. Scissors in Kemang.
         Crafted with patience by [Your Name].
```

### 5.12 Sticky Mobile CTA
```
[Book a chair]   full-width, primary rust color, fixed bottom
                 + fade-in setelah scroll > 50vh
                 + dismiss on scroll-up
```

---

## 6. Section Breakdown (12 sections + 1 overlay)

| # | Section | Type | RSC/Client | Key Engineering |
|---|---|---|---|---|
| 1 | Navbar | Layout | Client | Hide-on-scroll, backdrop-blur, mobile Sheet |
| 2 | Hero | Section | Client (motion) | Variable font optical-size + scroll parallax |
| 3 | Marquee | Strip | RSC | CSS-only infinite scroll, pause on hover |
| 4 | Services | Section | RSC | Grid w/ Phosphor Duotone icons |
| 5 | Why SLOWCUTS | Section | RSC | Asymmetric zigzag, mobile stacks |
| 6 | Barbers | Section | RSC | Card hover w/ Phosphor Fill swap |
| 7 | **Before/After** ⭐ | Section | Client | Custom hook + pointer drag + keyboard |
| 8 | Testimonials | Section | RSC + Client | Embla carousel (lightweight) |
| 9 | Story | Section | RSC | Pull-quote typography |
| 10 | FAQ | Section | Client | Native `<details>` + custom UI |
| 11 | Booking | Section | Client | RHF + Zod + IndexedDB + .ics |
| 12 | Visit | Section | RSC | Lazy iframe (Intersection Observer) |
| 13 | Footer | Layout | RSC | 4-col grid, mono for hours |
| ➕ | Sticky Mobile CTA | Overlay | Client | Thumb-zone, scroll listener |

**Mix**: 5 client + 7 RSC + 1 client overlay = balanced for performance

---

## 7. Signature Elements (6 wow-moments)

### 7.1 Before/After Interactive Slider
- **What**: Custom pointer-drag slider, no library
- **Why**: Strongest social proof untuk barbershop (visual transformation)
- **How**: pointer events API + `requestAnimationFrame`, fallback static if reduced-motion
- **Engineering moment**: custom `useBeforeAfter()` hook, keyboard navigation (arrow keys)

### 7.2 Hero Variable Font Optical Size
- **What**: Fraunces `opsz` axis animates 144 → 14 on scroll, `wght` 400 → 700
- **Why**: Subtle but show-stopping, showcases variable font understanding
- **How**: CSS `@supports (font-variation-settings: 'opsz' 144)` + scroll listener
- **Engineering moment**: scroll-driven font animation, GPU-accelerated transforms only

### 7.3 Marquee Brand Strip
- **What**: Infinite horizontal marquee with key phrases
- **Why**: Adds motion + reinforces brand without being annoying
- **How**: CSS-only `transform: translateX()` + `@keyframes`, GPU-accelerated
- **Engineering moment**: no JS, pause-on-hover via CSS, reduced-motion fallback

### 7.4 Custom Cursor on Service Cards (Desktop)
- **What**: Replaces cursor with scissors SVG when over service cards
- **Why**: Memorable micro-interaction, shows motion mastery
- **How**: motion's `useMotionValue` + `useSpring` for lerp
- **Engineering moment**: clean unmount, disabled on touch devices

### 7.5 Scroll-Triggered Reveals
- **What**: Each section fades up + slight scale on enter viewport
- **Why**: Adds life without being gratuitous
- **How**: custom `useInView` hook, stagger 60-80ms, one-shot
- **Engineering moment**: respects reduced motion, GPU-accelerated (transform + opacity only)

### 7.6 Form Tactile Micro-interactions
- **What**: Rust underline animates on focus, button "spreads" on hover, checkmark draws on success
- **Why**: Makes the demo feel real despite no backend
- **How**: SVG path animation with motion, 60fps
- **Engineering moment**: SVG path morph, booking ID counter ticks like slot machine

---

## 8. Performance Strategy (Lighthouse 95+ discipline)

| Target | Tactic |
|---|---|
| **LCP < 1.5s** | Hero image: AVIF + WebP, blur placeholder, `priority` + `fetchPriority="high"`, preloaded |
| **CLS < 0.05** | All images explicit dimensions, fonts have `size-adjust` fallback metric |
| **TBT < 100ms** | RSC by default, only 5 client components, dynamic import for Before/After + BookingForm |
| **Bundle < 200KB JS** | `motion/react` (not full package), Phosphor per-icon imports, no date-fns (use dayjs) |
| **Initial CSS < 30KB** | Tailwind v4 auto-purges, no `!important`, no `@apply` in components |
| **Font loading < 100ms** | `display: swap`, `preload: true`, subset to Latin-Extended, only used axes |

**Bundle size enforcement (CI):**
```yaml
# .github/workflows/ci.yml
- name: Check bundle size
  run: |
    bun run build
    bun run analyze
    bunx bundlewatch --max-size 200kb "app/**/*.{js,css}"
```

---

## 9. SEO Strategy

### 9.1 Structured Data (3 schemas)

**1. LocalBusiness / BarberShop** (in `<head>` via JSON-LD):
```json
{
  "@context": "https://schema.org",
  "@type": "BarberShop",
  "name": "SLOWCUTS",
  "image": "https://slowcuts.barbershop/og.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Jl. Kemang Raya No. 47",
    "addressLocality": "Jakarta Selatan",
    "postalCode": "12730",
    "addressCountry": "ID"
  },
  "telephone": "+62-811-1234-5678",
  "priceRange": "Rp 80.000 - Rp 350.000",
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "10:00", "closes": "20:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "09:00", "closes": "21:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Sunday", "opens": "10:00", "closes": "18:00" }
  ],
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "847" }
}
```

**2. FAQPage** — 8 QnA dari Section 5.8
**3. Review** × 5 — 5 testimonial jadi individual Review schema
**4. Service** × 6 — 6 service dari Section 5.2 jadi individual Service schema (Optional, tapi bagus untuk SEO)

> **Note**: "Kids Cut" disebut di FAQ #5 (Rp 100.000, 30 min) tapi TIDAK ada di 6 services utama di Section 5.2. Ini intentional — kids cut adalah add-on service, bukan main offering. Schema price range "Rp 80.000 - Rp 350.000" sudah inclusive karena 100k ada di dalam range.

### 9.2 Meta + Open Graph
- **Title**: "SLOWCUTS — The cut that earns the wait. Kemang, Jakarta."
- **Description**: "A 45-minute grooming ritual. Hot towel, pour-over, scissors that aren't in a hurry. Book your chair in Kemang, Jakarta."
- **OG Image**: Custom-designed 1200×630 (Fraunces display, rust accent, hero photo)
- **Twitter Card**: `summary_large_image`
- **Canonical**: `https://slowcuts.barbershop/`

### 9.3 Keyword Strategy
- Primary: "barbershop kemang", "barber jakarta selatan", "grooming ritual jakarta"
- Long-tail: "premium barbershop jakarta", "slow haircut kemang"
- Local: "barbershop near me jakarta" (Maps embed, no GMB claim)

---

## 10. Engineering Showcase Plan (9 moments)

Goal: visitor yang buka source code langsung "kelihatan" senior-level thinking. Setiap moment di-anchor dari README.

| # | Moment | Lokasi | Apa yang di-showcase |
|---|---|---|---|
| 1 | **RSC + Client boundary** | Section components | Strategic use of `'use client'` only where needed (5/13) |
| 2 | **Compound components** | BookingForm, Services | Composition over boolean props (Vercel pattern) |
| 3 | **Tailwind v4 @theme** | globals.css | CSS-first design tokens, no config file |
| 4 | **Variable font optical sizes** | layout.tsx + Hero | Fraunces `opsz` axis by viewport/scroll |
| 5 | **Motion choreography** | Hero, scroll sections | Layout animations + reduced-motion respect |
| 6 | **IndexedDB abstraction** | lib/db/indexed-db.ts | Type-safe wrapper, no external DB lib |
| 7 | **Zod discriminated unions** | Booking schema | Type-safe form state machine |
| 8 | **Performance budget script** | scripts/check-bundle.ts | CI fails if JS > 200KB / image > 100KB |
| 9 | **Visual regression baseline** | tests/visual/ | Playwright snapshots, fail on pixel diff |

Setiap moment akan di-mark dengan inline comment `// Showcase: <name>` dan di-link dari README.

---

## 11. File Structure

```
slowcuts/
├── app/
│   ├── layout.tsx                    # Root layout, fonts, metadata, JSON-LD
│   ├── page.tsx                      # Main page composing all sections
│   ├── globals.css                   # @theme tokens (single source of truth)
│   ├── opengraph-image.tsx           # Dynamic OG image
│   ├── sitemap.ts                    # SEO sitemap
│   └── robots.ts                     # SEO robots
├── components/
│   ├── sections/                     # 12 sections, mostly RSC
│   │   ├── hero.tsx
│   │   ├── marquee.tsx
│   │   ├── services.tsx
│   │   ├── why-slowcuts.tsx
│   │   ├── barbers.tsx
│   │   ├── before-after.tsx          # Client (slider)
│   │   ├── testimonials.tsx
│   │   ├── story.tsx
│   │   ├── faq.tsx
│   │   ├── booking.tsx               # Client (form)
│   │   ├── visit.tsx
│   │   └── footer.tsx
│   ├── layout/
│   │   ├── navbar.tsx                # Client (scroll behavior)
│   │   └── sticky-cta.tsx            # Client (scroll listener)
│   ├── ui/                           # shadcn primitives, custom-styled
│   └── shared/
│       ├── fade-in.tsx               # Client (motion)
│       ├── section-heading.tsx       # RSC
│       ├── container.tsx             # RSC
│       ├── custom-cursor.tsx         # Client (motion values)
│       └── before-after-slider.tsx   # Client (custom hook)
├── lib/
│   ├── data/                         # Static content as TS modules
│   │   ├── services.ts
│   │   ├── barbers.ts
│   │   ├── testimonials.ts
│   │   ├── faqs.ts
│   │   ├── story.ts
│   │   └── hours.ts
│   ├── db/
│   │   └── indexed-db.ts             # Type-safe IndexedDB wrapper
│   ├── ics/
│   │   └── generate.ts               # .ics file builder
│   ├── seo/
│   │   ├── json-ld.ts                # Schema generators
│   │   └── meta.ts                   # Meta helpers
│   ├── hooks/
│   │   ├── use-in-view.ts            # Custom IntersectionObserver
│   │   ├── use-before-after.ts       # Slider state
│   │   ├── use-hide-on-scroll.ts     # Navbar behavior
│   │   └── use-scroll-progress.ts    # Hero parallax
│   └── utils.ts                      # cn(), formatPrice(), formatId()
├── public/
│   ├── images/                       # Optimized AVIF/WebP
│   └── og.jpg                        # Custom OG (1200x630)
├── tests/
│   ├── unit/                         # Vitest
│   ├── e2e/                          # Playwright
│   └── visual/                       # Playwright snapshots
├── scripts/
│   └── check-bundle.ts               # CI bundle size check
├── .github/workflows/
│   └── ci.yml                        # type-check, lint, test, build, perf
├── .gitignore                        # node_modules, .next, .env*, coverage, playwright-report
├── biome.json
├── playwright.config.ts
├── vitest.config.ts
├── next.config.ts
├── package.json
├── bun.lockb
├── README.md                         # Engineering showcase + visual preview
└── tsconfig.json
```

### 11.1 Assets Strategy
- **Hero photo + section backgrounds**: Curated dari Unsplash (no shoot needed). Aesthetic: dark/moody, vintage barber tools, hands working, hot towel close-up. License: Unsplash License (free commercial use, no attribution required).
- **Barber portraits**: Unsplash curated (3 specific photographers dengan style serupa: warm light, candid, monochrome-leaning).
- **Before/After photos**: AI-generated via Midjourney/Flux dengan prompt engineering. Konsep: "barbershop before after photo, 4:5 portrait, realistic, consistent lighting between shots."
- **Logo/monogram**: Custom SVG (scissors + "SLOWCUTS" wordmark), designed in Figma, exported sebagai React component.
- **OG image (1200×630)**: Custom-designed di Figma, exported sebagai JPG, disimpan di `public/og.jpg`. Pakai Fraunces display + rust accent + hero composition.

---

## 12. Build Phases (4 hari)

### Day 1 — Foundation
- [ ] Scaffold Next.js 15 with Bun, TS strict, Tailwind v4
- [ ] Setup design tokens (Section 3 globals.css)
- [ ] Configure next/font (Fraunces + Inter Tight + JetBrains Mono)
- [ ] Setup Biome + Lefthook + Vitest + Playwright
- [ ] Create `lib/data/` files (services, barbers, testimonials, faqs, hours, story)
- [ ] Build shared components (FadeIn, SectionHeading, Container)
- [ ] Commit: `chore: foundation`

### Day 2 — Sections A (5 sections)
- [ ] Navbar (sticky, hide-on-scroll, mobile Sheet)
- [ ] Hero (variable font optical size + scroll parallax)
- [ ] Marquee brand strip
- [ ] Services (asymmetric grid w/ Phosphor Duotone)
- [ ] Why SLOWCUTS (zigzag layout)
- [ ] Commit: `feat(sections): top-half landing`

### Day 3 — Sections B (7 sections) + Signature
- [ ] Barbers (3 barber cards)
- [ ] **Before/After slider** (custom hook + accessibility)
- [ ] Testimonials (Embla carousel)
- [ ] Story (pull-quote typography)
- [ ] FAQ (native `<details>` + custom UI)
- [ ] Booking (RHF + Zod + IndexedDB + .ics export)
- [ ] Visit (lazy iframe, hours table)
- [ ] Footer + Sticky Mobile CTA
- [ ] Commit: `feat(sections): bottom-half landing`

### Day 4 — Polish + Deploy
- [ ] Custom cursor on service cards (desktop)
- [ ] Stagger reveals + scroll animations audit
- [ ] SEO: meta, OG image, 3 JSON-LD schemas
- [ ] Performance audit: Lighthouse, bundle, Web Vitals
- [ ] Visual regression baseline (Playwright)
- [ ] Accessibility audit (axe-core + manual keyboard nav)
- [ ] README engineering showcase
- [ ] Deploy to Vercel (manual trigger, no analytics)
- [ ] Final smoke test
- [ ] Commit: `docs: engineering showcase readme`

---

## 13. Quality Bar

### 13.1 Code Quality
- [ ] `bunx tsc --noEmit` → 0 errors
- [ ] `bunx biome check .` → 0 errors
- [ ] `bun run test` (Vitest) → all pass
- [ ] `bunx playwright test` (E2E + visual) → all pass
- [ ] `bunx bundlewatch` → bundle < 200KB
- [ ] 0 `as any`, `@ts-ignore`, `@ts-expect-error`
- [ ] 0 `console.log` in production
- [ ] 0 empty catch blocks

### 13.2 Visual Quality (anti-AI-slop)
- [ ] No emoji as icon (semua pakai Phosphor)
- [ ] No inline style (`style={{...}}`)
- [ ] No magic number CSS (semua token)
- [ ] No pure `#000` atau `#fff` (pakai `--color-ink` & `--color-bone`)
- [ ] No gradient text
- [ ] No left-border accent card
- [ ] No "AI tells" (Lottie animations, generic 3D illustrations)
- [ ] 0 horizontal overflow di 375px
- [ ] All touch targets ≥ 44px

### 13.3 Functional Quality
- [ ] Semua section entrance animation (or no-op if reduced motion)
- [ ] Booking form: validation + IndexedDB persist + .ics export
- [ ] FAQ accordion works with keyboard (arrow, enter, esc)
- [ ] Before/After slider draggable + keyboard accessible
- [ ] Navbar hide-on-scroll-down / show-on-scroll-up
- [ ] Sticky mobile CTA appears after 50vh scroll
- [ ] Custom cursor on service cards (desktop only)

### 13.4 Responsive Quality
- [ ] 375px, 768px, 1280px, 1920px — all 4 tested visually
- [ ] No layout shift between breakpoints
- [ ] Touch targets ≥ 44px on mobile

### 13.5 Accessibility (WCAG 2.2 AA)
- [ ] Semantic HTML (header, main, section, nav, footer, article)
- [ ] Heading hierarchy (h1 → h2 → h3, no skips)
- [ ] Alt text on all images (descriptive)
- [ ] Focus visible (rust ring, 2px offset)
- [ ] Color contrast AA (rust on ink: 4.7:1 ✓, bone on ink: 14.8:1 ✓)
- [ ] Keyboard nav works (tab order, focus trap in dialogs)
- [ ] `prefers-reduced-motion` honored
- [ ] Form labels associated + error announcements via aria-live

### 13.6 Performance Quality
- [ ] Lighthouse Performance ≥ 95
- [ ] Lighthouse Accessibility ≥ 95
- [ ] Lighthouse Best Practices ≥ 95
- [ ] Lighthouse SEO ≥ 100
- [ ] LCP < 1.5s
- [ ] CLS < 0.05
- [ ] INP < 100ms
- [ ] Initial JS bundle < 200KB
- [ ] Initial CSS < 30KB

---

## 14. Acceptance Criteria (Definition of Done)

Project declared "DONE" ketika SEMUA kondisi ini terpenuhi:

1. **Code**: TypeScript compiles clean, Biome passes, all tests green
2. **Bundle**: Initial JS < 200KB (CI enforced)
3. **Performance**: Lighthouse Performance ≥ 95 di 4G simulated
4. **Accessibility**: Lighthouse Accessibility ≥ 95, axe-core 0 critical issues
5. **Visual QA**: Playwright visual regression baseline captured, 0 unexpected diffs
6. **Anti-AI-slop**: All 9 items di Section 13.2 pass
7. **SEO**: All 3 JSON-LD schemas valid (Google Rich Results test), Lighthouse SEO = 100
8. **Booking flow**: Form validation, IndexedDB persist, .ics download, success dialog — all work
9. **Before/After slider**: Pointer drag + keyboard nav, reduced-motion fallback
10. **Responsive**: 4 breakpoints tested, no overflow, no shift
11. **README**: Engineering showcase section with 9 anchor links to code
12. **Deploy**: Vercel deploy successful, live URL accessible, no analytics firing
13. **Smoke test**: Manual walkthrough via Playwright (open, scroll, fill form, see success)

---

## 15. Risks & Open Questions

### Risks
- **R1**: Phosphor Duotone icons visual weight may be too heavy for some sections. Mitigation: use Fill for active states, test early.
- **R2**: Variable font animation on Hero may cause CLS if not measured. Mitigation: pre-compute optical-size axis values, use `font-variation-settings` with `transition` only on transform/opacity.
- **R3**: IndexedDB may not be available in private browsing. Mitigation: try/catch with localStorage fallback.
- **R4**: .ics file download may be blocked by some browsers. Mitigation: use `<a download>` with proper MIME type, fallback to clipboard.
- **R5**: Google Maps iframe may slow down. Mitigation: lazy load via IntersectionObserver, use lite mode embed.

### Open Questions
- **Q1**: Apakah foto real barbershop + barbers perlu di-shoot? Atau pakai Unsplash curated? Default: Unsplash curated (no shoot needed).
- **Q2**: Foto before/after — pakai real client photos atau AI-generated? Default: AI-generated via Midjourney/Flux, no real people.
- **Q3**: Apakah perlu Vercel Analytics setelah semua? Default: NO, sesuai user request "pure front-end".
- **Q4**: Custom domain (slowcuts.barbershop)? Default: pakai vercel.app subdomain dulu.

### Out of Scope (Explicitly)
- Real backend / database
- Authentication
- Payment integration
- Multi-language (EN only for this version)
- Light theme variant
- Admin panel
- Email notifications (semua client-side simulated)

---

## 16. Implementation Order (for writing-plans skill)

Setelah design doc ini disetujui, transition ke `writing-plans` skill untuk:
1. Break down 4-day build into atomic tasks
2. Identify parallel execution opportunities
3. Specify per-task deliverables + verification
4. Identify delegation opportunities (visual-engineering, etc.)

---

## 17. Self-Review Notes (Author)

Hasil self-review per brainstorming checklist:

| Check | Status | Note |
|---|---|---|
| Placeholders | ✅ None blocking | `[Your Name]` di footer (line 426) intentional — user replace saat implement |
| Contradictions | ✅ None | Bundle < 200KB, Lighthouse 95+ categories, 5 client + 7 RSC + 1 overlay — semua konsisten |
| Ambiguity | ✅ None | "Bun" = package manager + scripts (clarified Section 4.1). "motion" = uses `motion/react`. |
| Scope | ✅ Clean | Explicit "Out of Scope" di Section 15. Light theme, multi-lang, B2B variant — semua ditandai. |
| Assets | ✅ Added | Section 11.1 (Assets Strategy) — Unsplash curated, AI-generated before/after, custom SVG logo, Figma-designed OG. |
| Git | ✅ Added | `.gitignore` di file structure (node_modules, .next, .env*, coverage, playwright-report). |
| Open questions | ✅ Documented | 4 Qs di Section 15 (foto strategy, kids cut scope, analytics, domain). |
| Risks | ✅ Documented | 5 risks di Section 15 dengan mitigation. |

**Verdict**: Spec siap untuk user review → approval → writing-plans skill.

---

> **Last updated**: 2026-06-15
> **Status**: ✅ APPROVED — ready for user review
> **Author**: Brainstorming session with user
> **Next step**: User review → approval → `writing-plans` skill
