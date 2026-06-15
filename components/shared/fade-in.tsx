"use client";

import { motion } from "motion/react";
import { useInView } from "@/lib/hooks/use-in-view";

type FadeInProps = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

/**
 * FadeIn — scroll-triggered fade + slight rise.
 * One-shot (disconnects after first reveal).
 */
export function FadeIn({ children, delay = 0, y = 20, className = "" }: FadeInProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
