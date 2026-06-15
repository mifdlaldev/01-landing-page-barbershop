"use client";

import { CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";
import { motion } from "motion/react";
// Showcase: discriminated unions + type-safe IndexedDB
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/shared/container";
import { FadeIn } from "@/components/shared/fade-in";
import { SectionHeading } from "@/components/shared/section-heading";
import { type Transformation, transformations } from "@/lib/data/transformations";
import { cn } from "@/lib/utils";

function Slider({ item }: { item: Transformation }) {
  const [position, setPosition] = useState(50);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromClientX = (clientX: number) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    setPosition((x / rect.width) * 100);
  };

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      const el = trackRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
      setPosition((x / rect.width) * 100);
    };
    const onUp = () => {
      dragging.current = false;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  const onKey = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 2;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPosition((p) => Math.max(0, p - step));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPosition((p) => Math.min(100, p + step));
    } else if (e.key === "Home") {
      e.preventDefault();
      setPosition(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setPosition(100);
    }
  };

  return (
    <figure className="grid gap-4">
      <div
        ref={trackRef}
        role="slider"
        aria-label={`Before and after: ${item.label}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        aria-valuetext={`${Math.round(position)}% showing after`}
        tabIndex={0}
        onKeyDown={onKey}
        onPointerDown={(e) => {
          dragging.current = true;
          updateFromClientX(e.clientX);
        }}
        className="relative aspect-[4/3] w-full touch-none select-none overflow-hidden rounded-md border border-ink-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rust"
      >
        {/* Before (full) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-ink-2 via-ink-3 to-ink"
        >
          <span className="font-mono text-mono text-bone-mute uppercase tracking-widest">
            Before
          </span>
        </div>
        {/* After (clipped) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 0 0 ${position}%)` }}
        >
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-rust/30 via-ink-2 to-ink">
            <span className="font-mono text-mono text-rust uppercase tracking-widest">After</span>
          </div>
        </div>
        {/* Divider line */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 w-px bg-bone"
          style={{ left: `${position}%` }}
        />
        {/* Handle */}
        <button
          type="button"
          aria-label="Drag to compare"
          onPointerDown={(e) => {
            e.stopPropagation();
            dragging.current = true;
          }}
          className={cn(
            "absolute top-1/2 z-elevated flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-bone bg-ink text-bone shadow-md transition-transform duration-fast hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rust",
          )}
          style={{ left: `${position}%` }}
        >
          <CaretLeft size={14} weight="bold" />
          <CaretRight size={14} weight="bold" />
        </button>
      </div>
      <figcaption className="flex items-baseline justify-between">
        <span className="text-body font-heading text-bone">{item.label}</span>
        <span className="font-mono text-mono text-bone-mute uppercase tracking-widest">
          {item.caption}
        </span>
      </figcaption>
    </figure>
  );
}

export function BeforeAfter() {
  return (
    <section id="proof" className="bg-ink-2 py-24 md:py-32" aria-labelledby="before-after-heading">
      <Container>
        <FadeIn className="mb-12 md:mb-16">
          <SectionHeading
            eyebrow="The Proof"
            title="Before. After. The full hour."
            subtitle="Real clients, real cuts. We don't stage these — they're shot in the chair."
            align="left"
          />
        </FadeIn>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3"
        >
          {transformations.map((t) => (
            <motion.li
              key={t.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <Slider item={t} />
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
