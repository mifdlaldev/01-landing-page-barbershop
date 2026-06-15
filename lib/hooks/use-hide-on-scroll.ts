"use client";

import { useEffect, useState } from "react";

/**
 * useHideOnScroll — show on scroll-up, hide on scroll-down (for Navbar).
 * Also returns `scrolled` boolean (>50px from top) for backdrop blur trigger.
 */
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

  return { visible, scrolled } as const;
}
