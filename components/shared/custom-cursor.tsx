"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
// Showcase: motion values + clean unmount
import { useEffect, useState } from "react";

const SCISSORS_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>`;

export function CustomCursor() {
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 900, damping: 40, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 900, damping: 40, mass: 0.3 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement | null;
      const isOnCard = !!target?.closest('[data-cursor="scissors"]');
      setActive(isOnCard);
    };

    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      animate={{
        scale: active ? 1 : 0,
        opacity: active ? 0.35 : 0,
      }}
      transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      className="pointer-events-none fixed left-0 top-0 z-toast flex h-7 w-7 items-center justify-center rounded-full bg-bone/80 text-ink ring-1 ring-rust/40 backdrop-blur-[1px]"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: static SVG constant
      dangerouslySetInnerHTML={{ __html: SCISSORS_SVG }}
    />
  );
}
