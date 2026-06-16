"use client";

import { List, X } from "@phosphor-icons/react/dist/ssr";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Container } from "@/components/shared/container";
import { useHideOnScroll } from "@/lib/hooks/use-hide-on-scroll";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#why", label: "Why" },
  { href: "#barbers", label: "Barbers" },
  { href: "#story", label: "Story" },
  { href: "#faq", label: "FAQ" },
  { href: "#booking", label: "Book" },
];

export function Navbar() {
  const { visible, scrolled } = useHideOnScroll(80);
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={false}
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 isolate z-modal transition-colors duration-base",
        scrolled
          ? "bg-ink shadow-md border-b border-ink-3"
          : "bg-ink/30 border-b border-transparent supports-[backdrop-filter]:backdrop-blur-sm",
      )}
    >
      <Container as="nav" className="flex h-16 items-center justify-between md:h-20">
        <a
          href="/"
          className="font-heading text-h3 text-bone tracking-tight"
          aria-label="SLOWCUTS — Home"
        >
          SLOWCUTS
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-body text-bone-2 transition-colors duration-fast hover:text-rust focus-visible:text-rust focus-visible:outline-none"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#booking"
          className="hidden rounded-pill bg-rust px-5 py-2.5 text-small font-medium text-bone transition-colors duration-fast hover:bg-rust-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rust focus-visible:ring-offset-2 focus-visible:ring-offset-ink md:inline-flex"
        >
          Book a chair
        </a>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-md text-bone md:hidden"
        >
          {open ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-ink-3 bg-ink-2 md:hidden"
          >
            <Container as="ul" className="flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-4 py-3 text-body text-bone hover:bg-ink-3"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                {/* biome-ignore lint/a11y/useValidAnchor: section anchor with menu close on click */}
                <a
                  href="#booking"
                  onClick={() => setOpen(false)}
                  className="mt-2 block rounded-md bg-rust px-4 py-3 text-center text-body font-medium text-bone"
                >
                  Book a chair
                </a>
              </li>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
