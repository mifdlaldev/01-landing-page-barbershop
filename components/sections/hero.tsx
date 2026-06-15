"use client";

import { ArrowRight, Star } from "@phosphor-icons/react/dist/ssr";
// Showcase: variable font optical-size scroll animation
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Container } from "@/components/shared/container";
import { useScrollProgress } from "@/lib/hooks/use-scroll-progress";

function Stars() {
  return (
    <span role="img" aria-label="5 out of 5 stars" className="inline-flex items-center gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} size={14} weight="fill" className="text-rust" />
      ))}
    </span>
  );
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

export function Hero() {
  const progress = useScrollProgress();
  const [opsz, setOpsz] = useState(144);

  // Map scroll 0..0.6 → opsz 144..14
  useEffect(() => {
    const t = clamp01(progress / 0.6);
    setOpsz(Math.round(lerp(144, 14, t)));
  }, [progress]);

  return (
    <section
      className="relative min-h-[100dvh] overflow-hidden bg-ink pt-24 md:pt-32"
      aria-labelledby="hero-headline"
    >
      <Container className="flex min-h-[calc(100dvh-6rem)] flex-col justify-center md:min-h-[calc(100dvh-8rem)]">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-mono text-mono text-rust mb-6 uppercase tracking-widest"
        >
          Est. 2018 — Kemang, Jakarta
        </motion.p>

        <motion.h1
          id="hero-headline"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontVariationSettings: `"opsz" ${opsz}` }}
          className="font-heading text-display text-bone"
        >
          The cut that earns the wait.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-body text-bone-2 mt-8 max-w-xl"
        >
          A 45-minute grooming ritual. Hot towel, pour-over, scissors that aren&rsquo;t in a hurry.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <a
            href="#booking"
            className="inline-flex items-center justify-center gap-2 rounded-pill bg-rust px-7 py-4 text-body font-medium text-bone transition-colors duration-fast hover:bg-rust-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rust focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            Book a chair
            <ArrowRight size={18} weight="bold" />
          </a>
          <a
            href="#services"
            className="inline-flex items-center justify-center gap-2 rounded-pill border border-ink-3 bg-transparent px-7 py-4 text-body text-bone transition-colors duration-fast hover:border-rust hover:text-rust focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rust focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            See the menu
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="mt-12 flex items-center gap-3 text-mono font-mono text-bone-mute"
        >
          <Stars />
          <span>4.9 · 847 appointments this quarter</span>
        </motion.div>
      </Container>

      {/* Decorative bottom gradient to bleed into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-ink" />
    </section>
  );
}
