# SLOWCUTS — Implementation Plan

> **Plan for**: Portfolio #01 — Barbershop Premium Landing
> **Source spec**: `docs/superpowers/specs/2026-06-15-slowcuts-barbershop-landing-design.md`
> **Created**: 2026-06-15
> **Effort**: 4 days (single developer)
> **Status**: Ready for execution

---

## Goal

Build a senior-level, pure-frontend, anti-AI-slop landing page for fictional premium barbershop SLOWCUTS. Target: Lighthouse 95+ semua kategori, bundle < 200KB, a11y AA, 9 engineering showcase moments visible in source. Deploy ke Vercel dalam 4 hari.

## Architecture

**Pattern**: Next.js 15 App Router dengan strategic RSC/Client boundary
- **5 client components**: Hero (motion), Before/After (slider), FAQ (accordion), Booking (form), Navbar (scroll), Sticky CTA (scroll listener)
- **7 RSC components**: Marquee, Services, Why SLOWCUTS, Barbers, Testimonials, Story, Visit, Footer
- **Engineering mix**: Optimal untuk performance (RSC default, Client hanya untuk interactivity)

**Layer breakdown**:
- `app/` — Next.js routing, layout, page composition
- `components/sections/` — 12 landing sections
- `components/shared/` — Reusable utilities (FadeIn, Container, custom hooks)
- `components/layout/` — Navbar, Sticky CTA
- `lib/data/` — Static content (TS modules, type-safe)
- `lib/db/` — IndexedDB wrapper
- `lib/ics/` — Calendar file generator
- `lib/seo/` — JSON-LD schemas
- `lib/hooks/` — Custom React hooks

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15.1+ (App Router, RSC, Turbopack) |
| Language | TypeScript 5.6+ strict |
| Runtime | Bun 1.1+ |
| Styling | Tailwind CSS v4 (CSS-first @theme) |
| UI Primitives | shadcn/ui (latest, custom-styled) |
| Icons | @phosphor-icons/react 2.1+ (Duotone + Fill) |
| Fonts | Fraunces (variable) + Inter Tight + JetBrains Mono via next/font |
| Animation | motion 11+ (motion/react) |
| Forms | React Hook Form 7 + Zod 4 |
| Date Picker | react-day-picker 9 |
| Persistence | IndexedDB via idb 8 |
| Calendar | ics 3+ |
| Linter | Biome 1.9+ |
| Testing | Vitest 2+ + Playwright 1.49+ |
| Git Hooks | Lefthook |
| Deploy | Vercel |

---

## File Structure (Locked)

```
slowcuts/
├── app/
│   ├── layout.tsx                    [Phase 1.4]
│   ├── page.tsx                      [Phase 1.9 → updated Phase 2-3]
│   ├── globals.css                   [Phase 1.3]
│   ├── opengraph-image.tsx           [Phase 4.3]
│   ├── sitemap.ts                    [Phase 4.3]
│   └── robots.ts                     [Phase 4.3]
├── components/
│   ├── sections/                     [Phase 2-3, 12 files]
│   │   ├── hero.tsx
│   │   ├── marquee.tsx
│   │   ├── services.tsx
│   │   ├── why-slowcuts.tsx
│   │   ├── barbers.tsx
│   │   ├── before-after.tsx
│   │   ├── testimonials.tsx
│   │   ├── story.tsx
│   │   ├── faq.tsx
│   │   ├── booking.tsx
│   │   ├── visit.tsx
│   │   └── footer.tsx
│   ├── layout/                       [Phase 2.1, 3.8]
│   │   ├── navbar.tsx
│   │   └── sticky-cta.tsx
│   ├── ui/                           [Phase 1.2 — shadcn primitives]
│   └── shared/                       [Phase 1.8, 3.2, 4.1]
│       ├── fade-in.tsx
│       ├── section-heading.tsx
│       ├── container.tsx
│       ├── custom-cursor.tsx
│       └── before-after-slider.tsx
├── lib/
│   ├── data/                         [Phase 1.7]
│   │   ├── services.ts
│   │   ├── barbers.ts
│   │   ├── testimonials.ts
│   │   ├── faqs.ts
│   │   ├── story.ts
│   │   └── hours.ts
│   ├── db/
│   │   └── indexed-db.ts             [Phase 3.6]
│   ├── ics/
│   │   └── generate.ts               [Phase 3.6]
│   ├── seo/
│   │   ├── json-ld.ts                [Phase 4.3]
│   │   └── meta.ts                   [Phase 4.3]
│   ├── hooks/
│   │   ├── use-in-view.ts            [Phase 1.8]
│   │   ├── use-before-after.ts       [Phase 3.2]
│   │   ├── use-hide-on-scroll.ts     [Phase 2.1]
│   │   └── use-scroll-progress.ts    [Phase 2.2]
│   └── utils.ts                      [Phase 1.2]
├── public/
│   ├── images/                       [Phase 1.1 + Day 2-3 placeholders]
│   └── og.jpg                        [Phase 4.3]
├── tests/
│   ├── unit/                         [Phase 1.6, 3.6]
│   ├── e2e/                          [Phase 1.6, 4.5]
│   └── visual/                       [Phase 4.5]
├── scripts/
│   └── check-bundle.ts               [Phase 1.5]
├── .github/workflows/
│   └── ci.yml                        [Phase 1.5]
├── biome.json                        [Phase 1.5]
├── lefthook.yml                      [Phase 1.5]
├── playwright.config.ts              [Phase 1.6]
├── vitest.config.ts                  [Phase 1.6]
├── next.config.ts                    [Phase 1.1]
├── .gitignore                        [Phase 1.1]
├── package.json                      [Phase 1.1-1.2]
├── bun.lockb                         [auto]
├── README.md                         [Phase 4.7]
└── tsconfig.json                     [Phase 1.1]
```

---

# PHASE 1 — FOUNDATION (Day 1)

## Task 1.1: Scaffold Next.js 15 Project

**Files**: `package.json`, `tsconfig.json`, `next.config.ts`, `.gitignore`, `app/layout.tsx`, `app/page.tsx`

**Steps**:

1. Initialize git repository
   ```bash
   cd /home/mifdlal/Documents/40-proyek-repo-github/01-landing-page-barbershop
   git init
   git checkout -b feat/slowcuts-landing
   ```

2. Create `.gitignore` with standard Next.js + Bun + tooling exclusions
   ```gitignore
   # dependencies
   node_modules/
   .pnp
   .pnp.js

   # next.js
   .next/
   out/
   build/
   dist/

   # production
   *.tsbuildinfo

   # misc
   .DS_Store
   *.pem
   .vscode/
   .idea/

   # debug
   npm-debug.log*
   yarn-debug.log*
   yarn-error.log*
   .pnpm-debug.log*

   # env files
   .env*.local
   .env

   # vercel
   .vercel

   # typescript
   *.tsbuildinfo
   next-env.d.ts

   # coverage
   coverage/
   *.lcov

   # playwright
   playwright-report/
   test-results/
   .playwright/

   # bun
   bun.lockb
   .bun/

   # turbo
   .turbo/
   ```

3. Initialize package.json
   ```bash
   bun init -y
   ```

4. Install Next.js 15 + React 19 + TypeScript
   ```bash
   bun add next@latest react@latest react-dom@latest
   bun add -D typescript@latest @types/react@latest @types/react-dom@latest @types/node@latest
   ```

5. Create `tsconfig.json` (strict mode)
   ```json
   {
     "compilerOptions": {
       "target": "ES2022",
       "lib": ["dom", "dom.iterable", "esnext"],
       "allowJs": false,
       "skipLibCheck": true,
       "strict": true,
       "noUncheckedIndexedAccess": true,
       "noImplicitOverride": true,
       "noUnusedLocals": true,
       "noUnusedParameters": true,
       "noFallthroughCasesInSwitch": true,
       "forceConsistentCasingInFileNames": true,
       "noEmit": true,
       "esModuleInterop": true,
       "module": "esnext",
       "moduleResolution": "bundler",
       "resolveJsonModule": true,
       "isolatedModules": true,
       "jsx": "preserve",
       "incremental": true,
       "plugins": [{ "name": "next" }],
       "baseUrl": ".",
       "paths": {
         "@/*": ["./*"]
       }
     },
     "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
     "exclude": ["node_modules"]
   }
   ```

6. Create `next.config.ts`
   ```typescript
   import type { NextConfig } from "next";

   const config: NextConfig = {
     reactStrictMode: true,
     poweredByHeader: false,
     images: {
       formats: ["image/avif", "image/webp"],
       deviceSizes: [375, 640, 768, 1024, 1280, 1920],
     },
     experimental: {
       optimizePackageImports: ["@phosphor-icons/react", "motion"],
     },
   };

   export default config;
   ```

7. Update `package.json` scripts
   ```json
   {
     "scripts": {
       "dev": "next dev --turbo",
       "build": "next build",
       "start": "next start",
       "lint": "biome check .",
       "lint:fix": "biome check --write .",
       "format": "biome format --write .",
       "type-check": "tsc --noEmit",
       "test": "vitest run",
       "test:watch": "vitest",
       "e2e": "playwright test",
       "e2e:visual": "playwright test --update-snapshots",
       "analyze": "ANALYZE=true next build",
       "check-bundle": "bun run scripts/check-bundle.ts"
     }
   }
   ```

8. Create `app/layout.tsx` (minimal — fonts added in 1.4)
   ```typescript
   export const metadata = {
     title: "SLOWCUTS",
     description: "The cut that earns the wait.",
   };

   export default function RootLayout({ children }: { children: React.ReactNode }) {
     return (
       <html lang="en">
         <body>{children}</body>
       </html>
     );
   }
   ```

9. Create minimal `app/page.tsx`
   ```typescript
   export default function Home() {
     return <main>SLOWCUTS — coming soon</main>;
   }
   ```

10. Verify: `bun run dev` → see "SLOWCUTS — coming soon" at localhost:3000

11. Commit
    ```bash
    git add -A
    git commit -m "chore: scaffold next.js 15 with bun + ts strict"
    ```

**Verification**: `bun run dev` works, `bun run type-check` → 0 errors, `bun run build` → success

---

## Task 1.2: Install Core Dependencies

**Files**: `package.json`, `lib/utils.ts`, `components/ui/`

**Steps**:

1. Install styling + UI deps
   ```bash
   bun add tailwindcss@next @tailwindcss/postcss postcss
   bun add -D @biomejs/biome
   bun add @phosphor-icons/react
   ```

2. Install shadcn/ui (latest CLI)
   ```bash
   bunx shadcn@latest init
   ```
   When prompted: Style = "New York", Base color = "Neutral", CSS variables = Yes

3. Add shadcn primitives needed
   ```bash
   bunx shadcn@latest add button card dialog sheet input textarea select label
   ```

4. Install motion (formerly framer-motion)
   ```bash
   bun add motion
   ```

5. Install form deps
   ```bash
   bun add react-hook-form @hookform/resolvers zod react-day-picker idb ics
   ```

6. Install dev/testing deps
   ```bash
   bun add -D vitest @vitest/ui @vitejs/plugin-react jsdom
   bun add -D @playwright/test
   bun add -D lefthook
   bun add -D @types/react-day-picker
   ```

7. Install Playwright browsers
   ```bash
   bunx playwright install chromium --with-deps
   ```

8. Create `lib/utils.ts` (cn helper)
   ```typescript
   import { type ClassValue, clsx } from "clsx";
   import { twMerge } from "tailwind-merge";

   export function cn(...inputs: ClassValue[]) {
     return twMerge(clsx(inputs));
   }

   export function formatPrice(rupiah: number): string {
     return new Intl.NumberFormat("id-ID", {
       style: "currency",
       currency: "IDR",
       maximumFractionDigits: 0,
     }).format(rupiah);
   }

   export function formatBookingId(num: number): string {
     return `SC-2026-${num.toString().padStart(5, "0")}`;
   }
   ```

9. Verify: `bun run type-check` → 0 errors

10. Commit
    ```bash
    git add -A
    git commit -m "chore: install core deps (tailwind v4, motion, rhf, zod, shadcn)"
    ```

**Verification**: All imports resolve, no peer dep warnings, shadcn components at `components/ui/`

---

## Task 1.3: Setup Design Tokens (Tailwind v4 @theme)

**Files**: `app/globals.css`

**Steps**:

1. Create `app/globals.css` with full design system
   ```css
   @import "tailwindcss";

   @theme {
     /* === COLOR: Ink & Bone Palette === */
     --color-ink: #0E0E0E;
     --color-ink-2: #1A1A1A;
     --color-ink-3: #2A2A2A;
     --color-bone: #F4F0E8;
     --color-bone-2: #E8E4DC;
     --color-bone-mute: #A8A39A;
     --color-rust: #B05E3B;
     --color-rust-2: #C97A52;
     --color-rust-3: #8B4426;

     /* === TYPOGRAPHY === */
     --font-heading: "Fraunces", "Times New Roman", serif;
     --font-body: "Inter Tight", system-ui, sans-serif;
     --font-mono: "JetBrains Mono", "Courier New", monospace;

     /* Type scale (fluid, clamp-based) */
     --text-display: clamp(3.5rem, 8vw, 7.5rem);
     --text-h1: clamp(2.5rem, 5vw, 4.5rem);
     --text-h2: clamp(2rem, 3.5vw, 3rem);
     --text-h3: clamp(1.5rem, 2vw, 2rem);
     --text-body: clamp(0.95rem, 1vw, 1.0625rem);
     --text-small: 0.875rem;
     --text-mono: 0.8125rem;

     /* === SHADOW === */
     --shadow-sm: 0 1px 2px rgb(14 14 14 / 0.4);
     --shadow-md: 0 8px 24px -8px rgb(14 14 14 / 0.6);
     --shadow-lg: 0 24px 48px -12px rgb(14 14 14 / 0.8);

     /* === RADIUS === */
     --radius-sm: 4px;
     --radius: 8px;
     --radius-md: 12px;
     --radius-lg: 20px;
     --radius-pill: 9999px;

     /* === ANIMATION === */
     --duration-instant: 100ms;
     --duration-fast: 200ms;
     --duration-base: 300ms;
     --duration-slow: 500ms;
     --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
     --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);

     /* === Z-INDEX === */
     --z-hide: -1;
     --z-base: 0;
     --z-elevated: 10;
     --z-sticky: 20;
     --z-overlay: 30;
     --z-modal: 40;
     --z-toast: 50;
   }

   /* === GLOBAL === */
   @layer base {
     * {
       border-color: var(--color-ink-3);
     }
     html {
       font-family: var(--font-body);
       color: var(--color-bone);
       background-color: var(--color-ink);
       -webkit-font-smoothing: antialiased;
       -moz-osx-font-smoothing: grayscale;
     }
     body {
       min-height: 100dvh;
     }
     h1, h2, h3 {
       font-family: var(--font-heading);
       font-weight: 400;
       letter-spacing: -0.02em;
     }
   }

   /* === REDUCED MOTION === */
   @media (prefers-reduced-motion: reduce) {
     *, *::before, *::after {
       animation-duration: 0.01ms !important;
       transition-duration: 0.01ms !important;
       scroll-behavior: auto !important;
     }
   }
   ```

2. Update `app/layout.tsx` to import globals.css
   ```typescript
   import "./globals.css";

   export const metadata = { ... };

   export default function RootLayout({ children }: { children: React.ReactNode }) {
     return (
       <html lang="en">
         <body>{children}</body>
       </html>
     );
   }
   ```

3. Verify: page bg is dark, text is bone color, Tailwind utilities work (`bg-ink`, `text-bone`, `text-rust`)

4. Commit
   ```bash
   git add -A
   git commit -m "feat(design): setup ink & bone palette + typography tokens"
   ```

**Verification**: `bun run dev` → dark bg, bone text, no layout issues

---

## Task 1.4: Configure Fonts (next/font)

**Files**: `app/layout.tsx`

**Steps**:

1. Update `app/layout.tsx` with next/font for 3 fonts
   ```typescript
   import { Inter_Tight, JetBrains_Mono, Fraunces } from "next/font/google";
   import "./globals.css";

   const fraunces = Fraunces({
     subsets: ["latin"],
     display: "swap",
     variable: "--font-fraunces",
     axes: ["opsz", "wght"],  // only load axes we use
   });

   const interTight = Inter_Tight({
     subsets: ["latin"],
     display: "swap",
     variable: "--font-inter-tight",
   });

   const jetbrainsMono = JetBrains_Mono({
     subsets: ["latin"],
     display: "swap",
     variable: "--font-jetbrains-mono",
   });

   export const metadata = {
     title: "SLOWCUTS — The cut that earns the wait.",
     description: "A 45-minute grooming ritual in Kemang, Jakarta.",
   };

   export default function RootLayout({ children }: { children: React.ReactNode }) {
     return (
       <html lang="en" className={`${fraunces.variable} ${interTight.variable} ${jetbrainsMono.variable}`}>
         <body>{children}</body>
       </html>
     );
   }
   ```

2. Update `app/globals.css` @theme to use next/font CSS variables
   ```css
   @theme {
     --font-heading: var(--font-fraunces), "Times New Roman", serif;
     --font-body: var(--font-inter-tight), system-ui, sans-serif;
     --font-mono: var(--font-jetbrains-mono), "Courier New", monospace;
     /* ... rest stays same ... */
   }
   ```

3. Verify: Hero text renders in Fraunces, body in Inter Tight, mono in JetBrains Mono

4. Commit
   ```bash
   git add -A
   git commit -m "feat(fonts): load fraunces (variable) + inter tight + jetbrains mono"
   ```

**Verification**: All 3 fonts load, no FOIT, variable font axes work in DevTools

---

## Task 1.5: Setup Biome + Lefthook + CI

**Files**: `biome.json`, `lefthook.yml`, `.github/workflows/ci.yml`, `scripts/check-bundle.ts`

**Steps**:

1. Create `biome.json`
   ```json
   {
     "$schema": "https://biomejs.dev/schemas/1.9.0/schema.json",
     "vcs": { "enabled": false, "clientKind": "git", "useIgnoreFile": true },
     "files": { "ignoreUnknown": true, "ignore": [".next", "node_modules", "dist", "build", "coverage", "playwright-report", "test-results"] },
     "formatter": { "enabled": true, "indentStyle": "space", "indentWidth": 2, "lineWidth": 100, "lineEnding": "lf" },
     "organizeImports": { "enabled": true },
     "linter": {
       "enabled": true,
       "rules": {
         "recommended": true,
         "style": { "noNonNullAssertion": "warn" },
         "suspicious": { "noExplicitAny": "error" },
         "correctness": { "noUnusedVariables": "error", "useExhaustiveDependencies": "error" }
       }
     },
     "javascript": { "formatter": { "quoteStyle": "double", "semicolons": "always", "trailingCommas": "all" } }
   }
   ```

2. Create `lefthook.yml`
   ```yaml
   pre-commit:
     parallel: true
     commands:
       biome:
         glob: "*.{ts,tsx,js,jsx,json,css}"
         run: bunx biome check --write {staged_files}
       type-check:
         run: bunx tsc --noEmit
   pre-push:
     commands:
       test:
         run: bun run test
   ```

3. Install lefthook
   ```bash
   bunx lefthook install
   ```

4. Create `scripts/check-bundle.ts` (CI script)
   ```typescript
   #!/usr/bin/env bun
   import { readFileSync, readdirSync, statSync } from "node:fs";
   import { join } from "node:path";

   const MAX_JS_KB = 200;
   const MAX_CSS_KB = 30;
   const MAX_IMG_KB = 100;

   function getSizeKb(path: string): number {
     const stats = statSync(path);
     return stats.size / 1024;
   }

   function walkDir(dir: string, ext: string[]): string[] {
     const files: string[] = [];
     function walk(d: string) {
       for (const entry of readdirSync(d)) {
         const full = join(d, entry);
         if (statSync(full).isDirectory()) walk(full);
         else if (ext.some((e) => full.endsWith(e))) files.push(full);
       }
     }
     walk(dir);
     return files;
   }

   const buildDir = ".next/static";
   const jsFiles = walkDir(buildDir, [".js"]);
   const cssFiles = walkDir(buildDir, [".css"]);

   let violations = 0;

   const totalJs = jsFiles.reduce((sum, f) => sum + getSizeKb(f), 0);
   const totalCss = cssFiles.reduce((sum, f) => sum + getSizeKb(f), 0);

   console.log(`📦 Total JS: ${totalJs.toFixed(1)}KB (max ${MAX_JS_KB}KB)`);
   console.log(`🎨 Total CSS: ${totalCss.toFixed(1)}KB (max ${MAX_CSS_KB}KB)`);

   if (totalJs > MAX_JS_KB) {
     console.error(`❌ JS bundle exceeds ${MAX_JS_KB}KB`);
     violations++;
   }
   if (totalCss > MAX_CSS_KB) {
     console.error(`❌ CSS bundle exceeds ${MAX_CSS_KB}KB`);
     violations++;
   }

   process.exit(violations > 0 ? 1 : 0);
   ```

5. Create `.github/workflows/ci.yml`
   ```yaml
   name: CI
   on: [push, pull_request]
   jobs:
     quality:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: oven-sh/setup-bun@v1
         - run: bun install --frozen-lockfile
         - run: bun run type-check
         - run: bun run lint
         - run: bun run build
         - run: bun run check-bundle
   ```

6. Verify: `bun run lint` works, `bun run check-bundle` runs, lefthook hooks fire on commit

7. Commit
   ```bash
   git add -A
   git commit -m "chore: setup biome + lefthook + CI bundle budget"
   ```

**Verification**: Lint passes, hooks installed, CI workflow file is valid

---

## Task 1.6: Setup Vitest + Playwright

**Files**: `vitest.config.ts`, `playwright.config.ts`, `tests/unit/`, `tests/e2e/`

**Steps**:

1. Create `vitest.config.ts`
   ```typescript
   import { defineConfig } from "vitest/config";
   import react from "@vitejs/plugin-react";
   import path from "node:path";

   export default defineConfig({
     plugins: [react()],
     test: {
       environment: "jsdom",
       globals: true,
       setupFiles: ["./tests/unit/setup.ts"],
     },
     resolve: {
       alias: {
         "@": path.resolve(__dirname, "./"),
       },
     },
   });
   ```

2. Create `tests/unit/setup.ts`
   ```typescript
   import "@testing-library/jest-dom/vitest";
   ```

3. Install testing library
   ```bash
   bun add -D @testing-library/react @testing-library/jest-dom @testing-library/user-event
   ```

4. Create `tests/unit/smoke.test.ts` (verify setup)
   ```typescript
   import { describe, it, expect } from "vitest";
   import { formatPrice, formatBookingId } from "@/lib/utils";

   describe("utils", () => {
     it("formats rupiah price", () => {
       expect(formatPrice(180000)).toBe("Rp 180.000");
     });
     it("formats booking ID", () => {
       expect(formatBookingId(147)).toBe("SC-2026-00147");
     });
   });
   ```

5. Run test: `bun run test` → should pass

6. Create `playwright.config.ts`
   ```typescript
   import { defineConfig, devices } from "@playwright/test";

   export default defineConfig({
     testDir: "./tests",
     fullyParallel: true,
     forbidOnly: !!process.env.CI,
     retries: process.env.CI ? 2 : 0,
     reporter: "html",
     use: {
       baseURL: "http://localhost:3000",
       trace: "on-first-retry",
     },
     projects: [
       { name: "chromium", use: { ...devices["Desktop Chrome"] } },
     ],
     webServer: {
       command: "bun run dev",
       url: "http://localhost:3000",
       reuseExistingServer: !process.env.CI,
     },
   });
   ```

7. Create `tests/e2e/homepage.spec.ts` (smoke)
   ```typescript
   import { test, expect } from "@playwright/test";

   test("homepage loads with hero", async ({ page }) => {
     await page.goto("/");
     await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
   });
   ```

8. Run e2e: `bun run e2e` → should pass

9. Commit
   ```bash
   git add -A
   git commit -m "chore: setup vitest + playwright with smoke tests"
   ```

**Verification**: Both test runners work, 1 unit + 1 e2e pass

---

## Task 1.7: Create Static Data Files

**Files**: `lib/data/services.ts`, `lib/data/barbers.ts`, `lib/data/testimonials.ts`, `lib/data/faqs.ts`, `lib/data/story.ts`, `lib/data/hours.ts`

**Steps**:

1. Create `lib/data/services.ts`
   ```typescript
   import { Scissors, Crop, Beard, Razor, Sparkle, Lightning } from "@phosphor-icons/react/dist/ssr";

   export type Service = {
     id: string;
     name: string;
     description: string;
     price: number;
     duration: number; // minutes
     icon: React.ComponentType<{ weight?: "duotone" | "fill"; size?: number; className?: string }>;
   };

   export const services: Service[] = [
     { id: "classic", name: "The Classic", description: "Scissor cut, hot towel finish, neck clean-up. The one that started it all.", price: 180000, duration: 45, icon: Scissors },
     { id: "short-crop", name: "The Short Crop", description: "Clipper fade, sharp edges, defined neckline. Low maintenance, high precision.", price: 150000, duration: 30, icon: Crop },
     { id: "beard", name: "The Beard Detail", description: "Trim, shape, oil treatment, hot towel. For the man whose beard is its own accessory.", price: 120000, duration: 30, icon: Beard },
     { id: "hot-shave", name: "The Hot Shave", description: "Straight razor, three towels, sandalwood soap. The kind of shave your grandfather bragged about.", price: 200000, duration: 45, icon: Razor },
     { id: "full-ritual", name: "The Full Ritual", description: "Haircut + beard + face mask + scalp massage. The whole experience, uninterrupted.", price: 350000, duration: 75, icon: Sparkle },
     { id: "quick-stop", name: "The Quick Stop", description: "Neck trim, edge-up, blow dry. For between rituals.", price: 80000, duration: 20, icon: Lightning },
   ];
   ```

2. Create `lib/data/barbers.ts`
   ```typescript
   export type Barber = {
     id: string;
     name: string;
     role: string;
     experience: string;
     specialty: string;
     quote: string;
     photo: string; // Unsplash URL
   };

   export const barbers: Barber[] = [
     {
       id: "rio",
       name: "Rio Setiawan",
       role: "Master Barber",
       experience: "14 years",
       specialty: "Classic scissor work, gentlemen's crops",
       quote: "I slow down because hair tells you what it wants. You just have to listen.",
       photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=750&fit=crop&q=80",
     },
     {
       id: "bayu",
       name: "Bayu Nugroho",
       role: "Senior Stylist",
       experience: "9 years at SLOWCUTS",
       specialty: "Beard shaping, hot shaves",
       quote: "A great shave is a conversation between blade and skin.",
       photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=750&fit=crop&q=80",
     },
     {
       id: "andra",
       name: "Andra Wijaya",
       role: "The New One",
       experience: "3 years in, 1 year with us",
       specialty: "Modern fades, sharp edges",
       quote: "I'm still learning. That's the point.",
       photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=750&fit=crop&q=80",
     },
   ];
   ```

3. Create `lib/data/testimonials.ts`
   ```typescript
   export type Testimonial = {
     id: string;
     quote: string;
     name: string;
     location: string;
     when: string;
     avatar: string;
   };

   export const testimonials: Testimonial[] = [
     { id: "1", quote: "Drove past three barbershops to get here. Worth every km.", name: "Reza H.", location: "Jakarta", when: "2 weeks ago", avatar: "https://i.pravatar.cc/120?img=12" },
     { id: "2", quote: "They remember my name, my coffee, and that I hate small talk. Perfect.", name: "Daniel K.", location: "Expat", when: "1 month ago", avatar: "https://i.pravatar.cc/120?img=33" },
     { id: "3", quote: "My wife noticed. That's the only review I care about.", name: "Fajar P.", location: "Regular", when: "3 weeks ago", avatar: "https://i.pravatar.cc/120?img=15" },
     { id: "4", quote: "I was nervous about a barber who 'takes his time.' Now I can't go back to 15-minute chops.", name: "Kevin A.", location: "First-timer", when: "2 days ago", avatar: "https://i.pravatar.cc/120?img=8" },
     { id: "5", quote: "Rio did my wedding cut at 6am. He was late by 3 minutes. Still the best cut of my life.", name: "Surya M.", location: "", when: "1 month ago", avatar: "https://i.pravatar.cc/120?img=51" },
   ];
   ```

4. Create `lib/data/faqs.ts`
   ```typescript
   export type FAQ = { question: string; answer: string };

   export const faqs: FAQ[] = [
     { question: "How long is an appointment?", answer: "45 minutes for a Classic, 75 for the Full Ritual. We don't double-book — your time is yours." },
     { question: "Do I need to book ahead?", answer: "Same-day is possible but the next slot is usually 2-3 days out. We don't rush, so the calendar is small." },
     { question: "What if I don't know what I want?", answer: "That's our favorite kind of client. We'll talk, look at your hair, and suggest. You approve before we start." },
     { question: "Can I bring a reference photo?", answer: "Absolutely. Photos help. Just know we'll adapt it to your hair type, face shape, and routine." },
     { question: "Do you cut kids' hair?", answer: "Yes, ages 8+. We have a smaller chair. 30 minutes, Rp 100.000." },
     { question: "What products do you use?", answer: "Layrite, Reuzel, Proraso, American Crew. If you liked what we used, we sell it at the front desk." },
     { question: "Can I just walk in?", answer: "Walk-ins are welcome for neck trims (20 min). Anything longer, please book — the chair might be empty for a reason." },
     { question: "Is parking easy?", answer: "Free street parking in front. Avoid 17:00-19:00 (Kemang traffic). The motorbike bay holds 6." },
   ];
   ```

5. Create `lib/data/story.ts`
   ```typescript
   export const story = {
     eyebrow: "EST. 2018, KEMANG",
     headline: "Two barbers. One slow idea.",
     body: "We started SLOWCUTS because we were tired of the race. Four cuts an hour, conversations cut short, coffee that arrived cold because the next chair was already waiting. So we slowed down. Halved the bookings. Doubled the time. Bought better scissors. Six years later, we're still doing the same thing — one chair, one client, one cut that earns the wait. Welcome to the slowest barbershop in Kemang. We saved you a seat.",
   };
   ```

6. Create `lib/data/hours.ts`
   ```typescript
   export type Day = "weekday" | "saturday" | "sunday";

   export const hours: Array<{ day: string; open: string; close: string }> = [
     { day: "Mon-Fri", open: "10:00", close: "20:00" },
     { day: "Saturday", open: "09:00", close: "21:00" },
     { day: "Sunday", open: "10:00", close: "18:00" },
   ];
   ```

7. Verify: `bun run type-check` → 0 errors

8. Commit
   ```bash
   git add -A
   git commit -m "feat(data): add services, barbers, testimonials, faqs, story, hours"
   ```

**Verification**: All data files import cleanly, no type errors

---

## Task 1.8: Build Shared Components + Custom Hooks

**Files**: `components/shared/fade-in.tsx`, `components/shared/section-heading.tsx`, `components/shared/container.tsx`, `lib/hooks/use-in-view.ts`, `lib/hooks/use-hide-on-scroll.ts`, `lib/hooks/use-scroll-progress.ts`

**Steps**:

1. Create `lib/hooks/use-in-view.ts` — IntersectionObserver wrapper
   ```typescript
   "use client";
   import { useEffect, useRef, useState } from "react";

   export function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
     const ref = useRef<T | null>(null);
     const [inView, setInView] = useState(false);

     useEffect(() => {
       if (!ref.current) return;
       const observer = new IntersectionObserver(
         ([entry]) => {
           if (entry.isIntersecting) {
             setInView(true);
             observer.disconnect();
           }
         },
         { threshold: 0.1, ...options }
       );
       observer.observe(ref.current);
       return () => observer.disconnect();
     }, []);

     return { ref, inView };
   }
   ```

2. Create `components/shared/fade-in.tsx` — motion wrapper using use-in-view
   ```typescript
   "use client";
   import { motion } from "motion/react";
   import { useInView } from "@/lib/hooks/use-in-view";

   export function FadeIn({ children, delay = 0, y = 20 }: { children: React.ReactNode; delay?: number; y?: number }) {
     const { ref, inView } = useInView<HTMLDivElement>();
     return (
       <motion.div
         ref={ref}
         initial={{ opacity: 0, y }}
         animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
         transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
       >
         {children}
       </motion.div>
     );
   }
   ```

3. Create `components/shared/section-heading.tsx` (RSC, reusable)
   ```typescript
   type Props = { eyebrow?: string; title: string; subtitle?: string; align?: "left" | "center" };

   export function SectionHeading({ eyebrow, title, subtitle, align = "left" }: Props) {
     return (
       <div className={align === "center" ? "text-center" : ""}>
         {eyebrow && (
           <p className="text-mono font-mono uppercase tracking-widest text-rust mb-4">{eyebrow}</p>
         )}
         <h2 className="text-h2 font-heading text-bone">{title}</h2>
         {subtitle && <p className="text-body text-bone-2 mt-4 max-w-2xl">{subtitle}</p>}
       </div>
     );
   }
   ```

4. Create `components/shared/container.tsx` (RSC)
   ```typescript
   export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
     return <div className={`mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12 ${className}`}>{children}</div>;
   }
   ```

5. Create `lib/hooks/use-hide-on-scroll.ts` (for Navbar)
   ```typescript
   "use client";
   import { useEffect, useState } from "react";

   export function useHideOnScroll(threshold = 10) {
     const [visible, setVisible] = useState(true);
     const [scrolled, setScrolled] = useState(false);

     useEffect(() => {
       let lastY = window.scrollY;
       const handleScroll = () => {
         const currentY = window.scrollY;
         setScrolled(currentY > 50);
         setVisible(currentY < lastY || currentY < threshold);
         lastY = currentY;
       };
       window.addEventListener("scroll", handleScroll, { passive: true });
       return () => window.removeEventListener("scroll", handleScroll);
     }, [threshold]);

     return { visible, scrolled };
   }
   ```

6. Create `lib/hooks/use-scroll-progress.ts` (for Hero parallax)
   ```typescript
   "use client";
   import { useEffect, useState } from "react";

   export function useScrollProgress() {
     const [progress, setProgress] = useState(0);

     useEffect(() => {
       const handleScroll = () => {
         const max = document.documentElement.scrollHeight - window.innerHeight;
         setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
       };
       window.addEventListener("scroll", handleScroll, { passive: true });
       return () => window.removeEventListener("scroll", handleScroll);
     }, []);

     return progress;
   }
   ```

7. Add unit test for `useHideOnScroll` in `tests/unit/hooks/use-hide-on-scroll.test.ts`
8. Verify: `bun run test` → all pass, `bun run type-check` → 0 errors
9. Commit
   ```bash
   git add -A
   git commit -m "feat(shared): fade-in, section-heading, container + custom hooks"
   ```

**Verification**: All shared components render, tests pass, type-check clean

---

## Task 1.9: Phase 1 Foundation Complete

**Files**: `app/page.tsx` (initial composition), `README.md` (initial)

**Steps**:

1. Update `app/page.tsx` with placeholder composition
   ```typescript
   import { Container } from "@/components/shared/container";

   export default function Home() {
     return (
       <main>
         <Container className="py-24">
           <h1 className="text-display font-heading text-bone">SLOWCUTS</h1>
           <p className="text-body text-bone-2 mt-6">Foundation ready. Sections coming next.</p>
         </Container>
       </main>
     );
   }
   ```

2. Create initial `README.md` (one-liner for now, expand in Phase 4.7)
3. Verify: `bun run dev` works, hero text shows in Fraunces display, smoke e2e passes
4. Commit
   ```bash
   git add -A
   git commit -m "chore: phase 1 foundation complete"
   ```

**Verification**: Day 1 deliverable — project scaffolds, design tokens in, fonts loaded, tests pass, dev server runs.

---

# PHASE 2 — SECTIONS A (Day 2)

## Task 2.1: Navbar with Hide-on-Scroll
**Files**: `components/layout/navbar.tsx`
- Sticky, hide-on-scroll-down/show-on-scroll-up
- Backdrop blur saat scrolled
- Mobile: Sheet dengan menu links
- Use `useHideOnScroll` hook
- Phosphor `Menu`/`X` icons (duotone)
- Commit: `feat(navbar): sticky with hide-on-scroll + mobile menu`

## Task 2.2: Hero with Variable Font Optical Size
**Files**: `components/sections/hero.tsx`
- Use `useScrollProgress` + motion's `useTransform` for opsz axis
- Fraunces `font-variation-settings: 'opsz' ${interpolated}` 
- 2 CTAs: primary rust "Book a chair →", secondary ghost "See the menu"
- Trust badge: `★★★★★ 4.9 · 847 appointments this quarter` (SVG stars, not emoji)
- Eyebrow: "EST. 2018 — KEMANG, JAKARTA" (mono, rust)
- Headline: "The cut that earns the wait." (display Fraunces)
- Subhead: "A 45-minute grooming ritual. Hot towel, pour-over, scissors that aren't in a hurry."
- Hero image via `next/image` with `priority` (AVIF/WebP, blur placeholder)
- **Showcase comment**: `// Showcase: variable font optical-size scroll animation`
- Commit: `feat(hero): variable font optical size + scroll parallax`

## Task 2.3: Marquee Brand Strip
**Files**: `components/sections/marquee.tsx`, update `globals.css` (keyframes)
- RSC, CSS-only infinite scroll animation
- Phrases: "EST 2018 · KEMANG · 45-MINUTE RITUAL · NO DOUBLE-BOOKING · RIO · BAYU · ANDRA"
- Pause on hover, reduced-motion fallback (no animation)
- Border-y ink-3, bg-ink-2
- Commit: `feat(marquee): css-only infinite brand strip`

## Task 2.4: Services Section
**Files**: `components/sections/services.tsx`
- RSC, use `services` data
- Asymmetric grid: 2 large cards row 1, 4 smaller row 2 (or similar asymmetric)
- Each card: Phosphor Duotone icon, name, mono price, duration, description
- Hover: rust border, slight lift
- Commit: `feat(services): asymmetric grid with phosphor duotone icons`

## Task 2.5: Why SLOWCUTS Section
**Files**: `components/sections/why-slowcuts.tsx`
- RSC, 4 value blocks from spec Section 5.3
- Zigzag layout desktop (alternating image-text), stacked mobile
- Unsplash images (one per block)
- Commit: `feat(why-slowcuts): zigzag layout with 4 value blocks`

## Task 2.6: Phase 2 Verification
- `bun run dev` → scroll through top half
- Test 4 breakpoints (375, 768, 1280, 1920)
- `bun run type-check && bun run lint && bun run build`
- Commit: `chore: phase 2 complete (top-half landing)`

---

# PHASE 3 — SECTIONS B + SIGNATURE (Day 3)

## Task 3.1: Barbers Section
**Files**: `components/sections/barbers.tsx`
- RSC, 3-col grid (1-col mobile)
- Card: photo (next/image, 4:5), name, role, experience, specialty tags, quote
- Hover: photo zoom subtle
- Commit: `feat(barbers): 3-column team cards`

## Task 3.2: Before/After Slider (Signature) ⭐
**Files**: `lib/hooks/use-before-after.ts`, `components/shared/before-after-slider.tsx`, `components/sections/before-after.tsx`

- Custom hook: pointer drag state, value 0-100
- Slider component:
  - Pointer events API (covers mouse + touch)
  - Keyboard: Arrow keys ±5%, Home/End reset to 0/100
  - `role="slider"`, `aria-valuenow/min/max`
  - Reduced-motion: static side-by-side fallback
- Section: heading + 6 transformations in 2-col grid
- Use AI-generated before/after images (or placeholders)
- **Showcase comment**: `// Showcase: custom hook + accessibility-first slider`
- Unit test for the hook
- Commit: `feat(before-after): custom slider with keyboard nav + a11y`

## Task 3.3: Testimonials Carousel
**Files**: `components/sections/testimonials.tsx`
- Install: `bun add embla-carousel-react embla-carousel`
- Embla carousel (lightweight, ~2KB)
- 5 testimonials, auto-play 5s, pause on hover, dot nav
- Commit: `feat(testimonials): embla carousel with auto-play`

## Task 3.4: Story Section
**Files**: `components/sections/story.tsx`
- RSC, pull-quote typography
- Large Fraunces body text, generous spacing
- Side image (Unsplash barbershop interior)
- Subtle noise texture background (CSS)
- Commit: `feat(story): pull-quote narrative section`

## Task 3.5: FAQ Accordion
**Files**: `components/sections/faq.tsx`
- Client, native `<details>`/`<summary>` (SEO-friendly, no-JS for content)
- Custom motion-enhanced UI
- Plus icon rotates 45° on open
- Keyboard: native Enter/Space, custom Arrow keys to navigate
- Commit: `feat(faq): native details with custom motion + keyboard nav`

## Task 3.6: Booking Form (IndexedDB + .ics) ⭐
**Files**: `lib/validation/booking.ts`, `lib/db/indexed-db.ts`, `lib/ics/generate.ts`, `components/sections/booking.tsx`, `tests/unit/booking.test.ts`

1. Zod schema (whatsapp ID validation, service enum, min H+1 date)
2. IndexedDB wrapper (idb library) — type-safe, async
3. .ics generator (ics library) — returns Blob
4. BookingForm component (Client):
   - React Hook Form + Zod resolver
   - react-day-picker (min H+1)
   - 9 time slots
   - On submit: save to IndexedDB, generate ID, show Dialog with .ics download
5. Unit tests for schema
6. **Showcase comment**: `// Showcase: discriminated unions + type-safe IndexedDB`
7. Commit: `feat(booking): rhf + zod + indexeddb persistence + ics export`

## Task 3.7: Visit Section (Lazy Map)
**Files**: `components/sections/visit.tsx`
- RSC, 2-col: Google Maps embed (lazy IntersectionObserver) + address/hours
- Hours table in mono font
- Lite mode Maps URL (no API key needed)
- Commit: `feat(visit): lazy google maps embed + hours table`

## Task 3.8: Footer + Sticky Mobile CTA
**Files**: `components/sections/footer.tsx`, `components/layout/sticky-cta.tsx`

- Footer: 4-col grid, mono for hours
- Sticky CTA: mobile only, fade-in after 50vh, dismiss-on-scroll-up
- Commit: `feat(footer + sticky-cta): complete landing sections`

## Task 3.9: Phase 3 Verification
- Compose all sections in `app/page.tsx`
- Full smoke: scroll, form, FAQ, before/after
- Commit: `chore: phase 3 complete (bottom-half landing + signature)`

---

# PHASE 4 — POLISH + DEPLOY (Day 4)

## Task 4.1: Custom Cursor on Service Cards
**Files**: `components/shared/custom-cursor.tsx`
- `useMotionValue` + `useSpring` (lerp)
- Replaces cursor over `[data-cursor="scissors"]` elements
- Disabled on touch devices
- Custom SVG scissors inline
- Add `data-cursor="scissors"` to service cards
- **Showcase comment**: `// Showcase: motion values + clean unmount`
- Commit: `feat(cursor): custom scissors cursor on service cards (desktop)`

## Task 4.2: Animations Audit
- Test all entrance animations at 4 breakpoints
- Verify `prefers-reduced-motion` respected
- Fix any animation jank (use transform/opacity only)
- Commit: `polish: animation audit + reduced-motion verification`

## Task 4.3: SEO Implementation
**Files**: `app/layout.tsx` (update), `app/opengraph-image.tsx`, `app/sitemap.ts`, `app/robots.ts`, `lib/seo/json-ld.ts`, `lib/seo/meta.ts`

1. `lib/seo/json-ld.ts` — `barberShopSchema()`, `faqSchema()`, `reviewsSchema()`, `servicesSchema()`
2. `lib/seo/meta.ts` — meta helpers
3. `app/layout.tsx` — full metadata, 4 JSON-LD scripts
4. `app/opengraph-image.tsx` — dynamic OG (or static `public/og.jpg`)
5. `app/sitemap.ts` + `app/robots.ts`
6. Verify Lighthouse SEO = 100, Google Rich Results test
7. Commit: `feat(seo): 4 json-ld schemas + og image + sitemap + robots`

## Task 4.4: Performance Audit
- `bun run build` → check bundles
- Lighthouse in incognito
- If bundle > 200KB → tree-shake Phosphor (`dist/ssr` imports)
- If LCP > 1.5s → hero image `priority` + AVIF
- Commit: `polish: performance audit + bundle optimization`

## Task 4.5: Visual Regression Baseline
**Files**: `tests/visual/sections.spec.ts`
- Playwright snapshots at 4 breakpoints per section
- `--update-snapshots` to create baseline
- Re-run to verify 0 diffs
- Commit: `test(visual): playwright regression snapshots baseline`

## Task 4.6: Accessibility Audit
- `bun add -D @axe-core/cli`
- `bunx axe http://localhost:3000 --exit` → 0 critical
- Manual keyboard + screen reader smoke
- Fix any issues
- Commit: `polish: a11y audit + fixes`

## Task 4.7: README Engineering Showcase
**Files**: `README.md`
- Hero (preview GIF + value prop)
- Stack & Why (1 paragraf per library)
- Engineering Highlights (9 anchor links to code patterns)
- Performance (Lighthouse scores, bundle)
- Visual Quality (anti-AI-slop checklist)
- Accessibility (axe report)
- What's Mocked (transparency)
- How to Run
- Commit: `docs: engineering showcase readme`

## Task 4.8: Deploy to Vercel
- `git push -u origin feat/slowcuts-landing`
- Open PR → get preview URL
- Merge to main → Vercel auto-deploys
- Verify live URL
- Note in PR (no code change)

## Task 4.9: Final Smoke Test
- Open live URL incognito
- Walk through entire page
- Lighthouse on live URL: all ≥ 95
- axe-core on live URL: 0 critical
- Update README with live URL + scores
- Commit: `docs: final smoke test + live URL`

## Task 4.10: Phase 4 Complete
- Final commit: `chore: phase 4 complete - portfolio ready`

---

# QUALITY GATES (Cross-Phase Verification)

Run at end of each phase, and at project completion:

## Code Quality Gate
```bash
bun run type-check      # → 0 errors
bun run lint            # → 0 errors
bun run test            # → all green
bun run e2e             # → all green
bun run build           # → exit 0
bun run check-bundle    # → JS < 200KB, CSS < 30KB
```

## Visual Quality Gate
- No emoji as icon (grep emoji unicode)
- No inline style (grep `style={`)
- No magic number CSS
- No pure `#000` or `#fff`
- No gradient text
- No left-border accent card

## Accessibility Gate
- `bunx axe http://localhost:3000` → 0 critical, 0 serious
- Manual keyboard nav: all interactive reachable
- Screen reader smoke test
- Lighthouse Accessibility ≥ 95

## Performance Gate
- Lighthouse Performance ≥ 95
- LCP < 1.5s, CLS < 0.05, INP < 100ms
- Initial JS < 200KB
- Initial CSS < 30KB

## Anti-AI-Slop Gate
- Phosphor Duotone (not generic)
- Fraunces variable font (not Playfair default)
- Asymmetric layouts (not grid-center-everything)
- Real-feel copy (no lorem ipsum)

---

# EXECUTION NOTES

## Delegation Opportunities

| Task | Best For | Skills |
|---|---|---|
| 2.1-2.5 (sections) | Visual engineering | `visual-engineering` + `design-taste-frontend` + `impeccable` |
| 3.2 (before/after) | Custom interaction | `visual-engineering` + `vercel-composition-patterns` |
| 3.6 (booking form) | Form mastery | composition patterns + `vercel-react-best-practices` |
| 4.1 (custom cursor) | Motion choreography | `visual-engineering` + `emil-design-eng` |
| 4.7 (README) | Technical writing | `writing` |

## Parallel Execution

Day 2 sections (2.1-2.5) and Day 3 sections (3.1-3.8, except 3.6 booking) can be delegated to parallel sub-agents if capacity allows.

## Risks to Watch

- **R1**: Phosphor Duotone may render too heavy → test on real screen
- **R2**: Variable font animation may cause CLS → pre-compute axis values
- **R3**: IndexedDB unavailable in private mode → fallback to localStorage
- **R4**: .ics download blocked → fallback to clipboard
- **R5**: Map iframe slow → lazy load via IntersectionObserver

## Out of Scope (Reminder)

- Real backend / database
- Authentication
- Payment integration
- Multi-language (EN only)
- Light theme variant
- Admin panel
- Email notifications
- Real-time availability
- Any analytics / monitoring

---

> **Plan complete**: 9 tasks Phase 1, 6 tasks Phase 2, 9 tasks Phase 3, 10 tasks Phase 4
> **Total**: ~34 tasks, 4 days, 1 developer + delegation
> **Next step**: User review → choose execution approach (Subagent-Driven or Inline)