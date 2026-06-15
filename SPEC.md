# 🏷️ 01 — Landing Page: Barbershop Premium

> **Build Spec** | TIER-2 Portfolio Sprint 2026 | Difficulty: Easy-Medium

---

## 1. Project Overview

**Nama Project:** `barbershop-premium-landing`
**Tagline:** "Classic Cuts. Modern Confidence."
**Tujuan:** Landing page single-page untuk barbershop premium, fokus pada konversi booking online + showcase layanan.
**Target User:** Cowok urban 20-45 tahun, suka grooming, budget mid-to-high.
**Persona Brand:** Elegan maskulin, jadul-modern, tidak norak.

**Mengapa Project Ini Penting untuk Portfolio:**
- Landing page = skill dasar yang paling laris di Fiverr/Upwork
- Setiap bisnis kecil butuh ini → recurring freelance gig
- Demonstrates: design taste, responsive layout, motion, conversion focus
- Build time: 4-6 jam (cocok untuk "1 hari 1 repo" target)

---

## 2. Tech Stack (WAJIB)

```
- Framework:      Next.js 14 (App Router)
- Language:       TypeScript (strict mode)
- Styling:        Tailwind CSS v3+
- UI Components:  shadcn/ui (Button, Card, Dialog, Sheet)
- Icons:          Lucide React (WAJIB, JANGAN emoji)
- Fonts:          next/font/google → Playfair Display (heading) + Inter (body)
- Animations:     Framer Motion (subtle only)
- Form:           React Hook Form + Zod validation
- Deployment:     Vercel
- Analytics:      Vercel Analytics
- SEO:            Next.js Metadata API + JSON-LD
```

**JANGAN gunakan:**
- ❌ `as any`, `@ts-ignore`
- ❌ Emoji sebagai icon
- ❌ Inline style
- ❌ Magic number di CSS
- ❌ Library UI lain selain shadcn/ui

---

## 3. Features (Detail Per Section)

### 3.1 Hero Section
- Full-viewport height (h-screen)
- Background: image barbershop dengan dark overlay gradient
- Headline besar: "Classic Cuts. Modern Confidence."
- Subheadline: 1 kalimat value proposition
- 2 CTA button:
  - Primary: "Book Appointment" (scroll ke section #booking)
  - Secondary: "View Services" (scroll ke #services)
- Micro-animation: text fade-up stagger saat load
- Trust badge kecil: "★★★★★ 500+ Reviews"

### 3.2 Navigation Bar (sticky)
- Logo (kiri) — text-based "BLADE & COMB" atau nama barbershop custom
- Menu (kanan): Home, Services, Barbers, Gallery, Contact
- Tombol CTA kecil: "Book Now"
- Mobile: hamburger → Sheet component
- Background blur saat scroll (backdrop-blur)
- Hide-on-scroll-down, show-on-scroll-up behavior

### 3.3 Services Section (#services)
- Section title + sub: "Our Services"
- Grid 3 kolom (mobile: 1 kolom) dengan 6 layanan card:
  1. Classic Haircut — Rp 80.000
  2. Beard Trim — Rp 50.000
  3. Hot Towel Shave — Rp 100.000
  4. Hair Wash & Style — Rp 60.000
  5. Kids Cut — Rp 50.000
  6. Full Grooming Package — Rp 200.000
- Tiap card: icon (Lucide), nama, harga, deskripsi 1 kalimat, durasi
- Hover effect: card lift + border highlight
- Click card → buka Dialog detail (opsional)

### 3.4 Why Choose Us Section
- 4 feature block dengan icon:
  1. Master Barbers (10+ tahun pengalaman)
  2. Premium Products (nama brand)
  3. Cozy Atmosphere (image)
  4. Easy Booking (online 24/7)
- Layout: alternating image-text (zigzag) di desktop, stacked di mobile
- Background subtle pattern (noise texture, low opacity)

### 3.5 Barbers/Team Section
- Section: "Meet Our Barbers"
- Grid 3-4 barbers, tiap card:
  - Foto profesional (placeholder image atau unsplash)
  - Nama + role (Master Barber / Senior Stylist)
  - Instagram link (icon)
  - Specialty tags (chip kecil)
- Hover: card zoom-in subtle

### 3.6 Gallery Section
- Masonry grid atau carousel
- 6-9 foto hasil cukuran/rambut
- Lazy load images
- Click → open lightbox (Dialog)

### 3.7 Testimonials Section
- 3-5 testimonial card dengan:
  - Foto customer (placeholder)
  - Nama + tanggal
  - Rating bintang (1-5, SVG)
  - Quote pendek
- Carousel (auto-play 5 detik) atau grid

### 3.8 Booking Section (#booking)
- Section: "Book Your Appointment"
- Form dengan field:
  - Nama (text, required)
  - Phone (tel, required, validation Indonesia)
  - Email (email, required)
  - Pilih layanan (select, dari Services section)
  - Pilih barber (select, dari Team section)
  - Pilih tanggal (date picker, minimal H+1)
  - Pilih jam (time slot, 09:00 - 21:00, interval 30 menit)
  - Catatan tambahan (textarea, optional)
- Submit button: "Confirm Booking"
- Success state: tampilkan Dialog "Booking received! We'll contact you within 1 hour"
- Form state management: React Hook Form + Zod
- **Note:** Form submit HANYA simulate (tidak ada backend). Show toast "Demo only" setelah submit.

### 3.9 Location & Hours Section
- 2 kolom layout:
  - Kiri: Google Maps embed (iframe, simple embed URL)
  - Kanan: Address text + hours table (Senin-Minggu, 09:00-21:00)
- Click address → open Google Maps di tab baru

### 3.10 Footer
- 4 kolom:
  - About brand (1 paragraf)
  - Quick links
  - Contact (phone, email, address)
  - Social media (Instagram, Facebook, TikTok — Lucide icons)
- Bottom: copyright + "Made with ❤️ in [City]"

---

## 4. Struktur File

```
barbershop-premium-landing/
├── app/
│   ├── layout.tsx              # Root layout, font setup, metadata
│   ├── page.tsx                # Main page, imports all sections
│   ├── globals.css             # Tailwind + custom CSS variables
│   └── opengraph-image.tsx     # OG image generator
├── components/
│   ├── sections/
│   │   ├── hero.tsx
│   │   ├── services.tsx
│   │   ├── why-choose-us.tsx
│   │   ├── barbers.tsx
│   │   ├── gallery.tsx
│   │   ├── testimonials.tsx
│   │   ├── booking.tsx
│   │   └── location-hours.tsx
│   ├── layout/
│   │   ├── navbar.tsx
│   │   └── footer.tsx
│   ├── ui/                     # shadcn components (auto-generated)
│   └── shared/
│       ├── section-heading.tsx # Reusable section title component
│       └── fade-in.tsx         # Intersection Observer wrapper
├── lib/
│   ├── data/
│   │   ├── services.ts         # Service list
│   │   ├── barbers.ts          # Barber list
│   │   ├── testimonials.ts     # Testimonial list
│   │   └── hours.ts            # Operating hours
│   └── utils.ts                # cn() helper, dll
├── public/
│   ├── images/                 # All images (or use unsplash URLs)
│   └── icons/
├── README.md
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.mjs
└── .env.example
```

---

## 5. Design System

### 5.1 Color Palette (Dark Premium Theme)
```css
/* app/globals.css */
:root {
  --background:        #0a0a0a;   /* off-black, NEVER pure #000 */
  --foreground:        #f5f5f0;   /* off-white, NEVER pure #fff */
  --primary:           #c9a96e;   /* gold accent */
  --primary-foreground: #0a0a0a;
  --secondary:         #1a1a1a;   /* card background */
  --muted:             #2a2a2a;
  --muted-foreground:  #a0a0a0;
  --accent:            #c9a96e;   /* same as primary */
  --border:            #2a2a2a;
  --ring:              #c9a96e;
  --radius:            0.5rem;
}
```

### 5.2 Typography
- **Headings**: Playfair Display, weight 400/700
  - h1: text-5xl md:text-7xl (hero only)
  - h2: text-4xl md:text-5xl (section titles)
  - h3: text-2xl md:text-3xl (card titles)
- **Body**: Inter, weight 400/500/600
  - Base: text-base (16px)
  - Small: text-sm (14px)
- **Letter spacing**: heading pakai `tracking-tight` (sedikit tighter)

### 5.3 Spacing & Layout
- Section padding: `py-20 md:py-32` (vertikal), `px-4 md:px-8` (horizontal)
- Container max-width: `max-w-7xl mx-auto`
- Gap antar section: 0 (section sendiri yang handle padding)
- Card padding: `p-6` atau `p-8`

### 5.4 Motion
- **Entrance animation**: setiap section fade-up saat masuk viewport (Intersection Observer)
- **Stagger**: child elements delay 50-100ms
- **Hover transitions**: 200-300ms ease-out
- **Tap feedback**: button `active:scale-[0.97]`
- **prefers-reduced-motion**: respect — collapse all animations

```tsx
// components/shared/fade-in.tsx
"use client"
import { motion } from "framer-motion"

export function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}
```

### 5.5 Icons (Lucide Examples)
- Scissors, Phone, MapPin, Clock, Star, ChevronRight, Menu, X, Calendar, User, Mail, Instagram, Facebook

---

## 6. Step-by-Step Build

### Step 1: Scaffold
```bash
cd /path/to/01-landing-page-barbershop
npx create-next-app@latest . --typescript --tailwind --app --src-dir false --import-alias "@/*" --no-eslint-config
```

### Step 2: Install Dependencies
```bash
pnpm add framer-motion lucide-react
pnpm add -D @types/node
npx shadcn@latest init    # setup shadcn/ui
npx shadcn@latest add button card dialog sheet input textarea select label
pnpm add react-hook-form @hookform/resolvers zod
pnpm add date-fns
```

### Step 3: Setup Design System
- Edit `app/globals.css` dengan color variables (Section 5.1)
- Setup font di `app/layout.tsx` (Playfair Display + Inter via next/font)
- Update `tailwind.config.ts` untuk extend theme dengan color variables
- Tambah utility class `container-padding`, `section-padding`

### Step 4: Buat Data Files
- `lib/data/services.ts` — array of 6 services
- `lib/data/barbers.ts` — array of 3-4 barbers (data dummy, photos dari Unsplash)
- `lib/data/testimonials.ts` — array of 5 testimonials
- `lib/data/hours.ts` — operating hours

### Step 5: Build Shared Components
- `components/shared/section-heading.tsx` (props: title, subtitle, align)
- `components/shared/fade-in.tsx` (Framer Motion wrapper)

### Step 6: Build Sections (urutan)
1. Navbar (sticky, scroll behavior)
2. Hero (fullscreen, CTA buttons)
3. Services (grid 3 col)
4. WhyChooseUs (zigzag layout)
5. Barbers (grid team)
6. Gallery (masonry or carousel)
7. Testimonials (carousel)
8. Booking (form with RHF + Zod)
9. LocationHours (2 col)
10. Footer (4 col)

### Step 7: Compose di app/page.tsx
- Import semua section, compose dengan section id
- Tambah metadata (title, description, OG)

### Step 8: Polish
- Test responsive (375px, 768px, 1280px, 1920px)
- Test motion (scroll trigger)
- Test form validation
- Add loading skeleton untuk images
- Test keyboard navigation
- Test dengan screen reader (basic)

### Step 9: README + Deploy
- Tulis README (template di Section 8)
- Push ke GitHub
- Deploy ke Vercel
- Verify live URL works

---

## 7. Quality Bar (WAJIB LULUS SEBELUM DONE)

### Code Quality
- [ ] `pnpm tsc --noEmit` → 0 errors
- [ ] `pnpm lint` (kalau ESLint di-setup) → 0 errors, max 0 warnings
- [ ] `lsp_diagnostics` → 0 errors
- [ ] `pnpm build` → exit 0, no warnings

### Visual Quality
- [ ] Tidak ada `as any` / `@ts-ignore` / `@ts-expect-error`
- [ ] Tidak ada emoji sebagai icon
- [ ] Tidak ada inline style (`style={{...}}`)
- [ ] Tidak ada magic number CSS (semua pakai Tailwind class atau CSS var)
- [ ] Tidak ada pure black `#000` atau pure white `#fff`
- [ ] Tidak ada gradient text (`bg-clip-text`)
- [ ] Tidak ada left-border accent card pattern
- [ ] Tidak ada horizontal overflow di 375px

### Functional Quality
- [ ] Semua section punya entrance animation
- [ ] `prefers-reduced-motion` honored
- [ ] Button `:active` ada scale feedback
- [ ] Form validation client-side works
- [ ] Form submit show toast "Demo only"
- [ ] Mobile nav (Sheet) works
- [ ] Gallery lightbox (Dialog) works
- [ ] All images load (no broken)
- [ ] All links work (no 404)
- [ ] OG image generates correctly

### Responsive Quality
- [ ] 375px (mobile): no overflow, touch targets ≥ 44px
- [ ] 768px (tablet): layout adapts
- [ ] 1280px (desktop): optimal layout
- [ ] 1920px (large desktop): tidak stretched, max-width applied

### Accessibility Quality
- [ ] Semantic HTML (header, main, section, nav, footer)
- [ ] Heading hierarchy (h1 → h2 → h3)
- [ ] Alt text di semua images
- [ ] Focus visible (ring on focus)
- [ ] Color contrast AA (gold on dark harus readable)
- [ ] Keyboard navigation works (tab, enter, esc)
- [ ] Form labels associated

### Performance Quality
- [ ] LCP < 2.5s (use next/image)
- [ ] CLS < 0.1 (set image dimensions)
- [ ] Initial JS bundle < 200KB
- [ ] Lighthouse Performance ≥ 95
- [ ] Lighthouse Accessibility ≥ 95
- [ ] Lighthouse Best Practices ≥ 95
- [ ] Lighthouse SEO ≥ 95

---

## 8. README Template (untuk project hasil)

Buatkan README.md di root project dengan isi:

```markdown
# 🪒 Barbershop Premium Landing Page

> Classic Cuts. Modern Confidence.

A premium landing page for a barbershop business, built with Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui. Designed for conversion with elegant masculine aesthetic.

![Hero Preview](public/images/og.png)

## ✨ Features

- 🏛️ Elegant dark theme with gold accents
- 📱 Fully responsive (mobile, tablet, desktop)
- 🎬 Smooth scroll-triggered animations (Framer Motion)
- 📅 Booking form with full validation
- 👥 Team showcase section
- 💬 Customer testimonials carousel
- 🖼️ Gallery with lightbox
- 🗺️ Google Maps integration
- ♿ WCAG AA accessible
- 🚀 Optimized for Core Web Vitals (LCP < 2.5s)

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS + shadcn/ui
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Form:** React Hook Form + Zod
- **Deployment:** Vercel

## 🚀 Getting Started

\`\`\`bash
pnpm install
pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000)

## 📦 Build

\`\`\`bash
pnpm build
pnpm start
\`\`\`

## 📄 License

MIT — Free to use as starter for client projects.

## 🙏 Credits

- Images: [Unsplash](https://unsplash.com)
- Icons: [Lucide](https://lucide.dev)
- UI: [shadcn/ui](https://ui.shadcn.com)
```

---

## 9. Acceptance Criteria

**Project dianggap DONE jika:**

1. ✅ Semua section (3.1 - 3.10) implemented dan visible
2. ✅ Responsive di 4 breakpoint (375, 768, 1280, 1920)
3. ✅ Animasi entrance berfungsi + respects `prefers-reduced-motion`
4. ✅ Form booking validate + show toast saat submit
5. ✅ Mobile nav (hamburger → Sheet) works
6. ✅ Gallery lightbox works
7. ✅ Build success (`pnpm build` exit 0)
8. ✅ Lint clean (`pnpm tsc --noEmit` 0 errors)
9. ✅ Lighthouse score ≥ 95 di semua kategori (test di Vercel preview)
10. ✅ README.md lengkap + screenshot di section atas
11. ✅ Live demo URL aktif di Vercel
12. ✅ GitHub repo public + topics set (nextjs, tailwindcss, landing-page, portfolio)

---

## 10. Notes

**Untuk AI Agent yang mengeksekusi spec ini:**

- **Mulai dengan:** baca semua section (1-10) SEBELUM coding
- **Pakai skill:** `frontend-design`, `web-design-guidelines`, `impeccable` untuk design quality
- **Pakai skill:** `vercel-react-best-practices` untuk Next.js optimization
- **Kalau stuck:** stop, jangan random edit. Tanya user atau consult Oracle agent.
- **Kalau ada asumsi:** disclose di response, jangan tebak diam-diam
- **Quality bar (Section 7) NON-NEGOTIABLE** — jangan skip checklist
- **Test di Playwright/Chromium** sebelum declare done (verify visually)

**Variasi yang bisa dibuat (opsional):**
- Light theme variant
- Bahasa Indonesia version
- B2B/wholesale landing variant
- Multi-location version

**File ini adalah SINGLE SOURCE OF TRUTH** — kalau ada konflik dengan chat user, file ini yang menang kecuali user eksplisit override.

---

> **Status:** 📝 SPEC READY — siap dieksekusi
> **Estimated Build Time:** 4-6 hours (single agent)
> **Last Updated:** 2026-06-15
