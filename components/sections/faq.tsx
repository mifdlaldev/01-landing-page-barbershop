"use client";

import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";
import { Container } from "@/components/shared/container";
import { FadeIn } from "@/components/shared/fade-in";
import { SectionHeading } from "@/components/shared/section-heading";
import { faqs } from "@/lib/data/faqs";
import { cn } from "@/lib/utils";

export function Faq() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="faq" className="bg-ink-2 py-24 md:py-32" aria-labelledby="faq-heading">
      <Container className="max-w-3xl">
        <FadeIn className="mb-12 md:mb-16">
          <SectionHeading eyebrow="Frequently Asked" title="Before you book." align="left" />
        </FadeIn>

        <ul className="divide-y divide-ink-3 border-y border-ink-3">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <li key={faq.id}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${faq.id}`}
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors duration-fast hover:text-rust focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rust"
                >
                  <span className="text-body font-heading text-bone">{faq.question}</span>
                  <CaretDown
                    size={20}
                    weight="bold"
                    className={cn(
                      "shrink-0 text-rust transition-transform duration-fast",
                      isOpen && "rotate-180",
                    )}
                    aria-hidden="true"
                  />
                </button>
                <div id={`faq-panel-${faq.id}`} hidden={!isOpen} className="pb-5 pr-8">
                  <p className="text-body text-bone-2">{faq.answer}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
