import { Container } from "@/components/shared/container";
import { FadeIn } from "@/components/shared/fade-in";
import { SectionHeading } from "@/components/shared/section-heading";
import { testimonials } from "@/lib/data/testimonials";

export function Testimonials() {
  return (
    <section className="bg-ink-2 py-24 md:py-32" aria-labelledby="testimonials-heading">
      <Container>
        <FadeIn className="mb-12 md:mb-16">
          <SectionHeading
            eyebrow="The Wall"
            title="What clients say."
            subtitle="No surveys. No incentives. Just the chair."
            align="left"
          />
        </FadeIn>

        <ul
          className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3"
          aria-label="Client testimonials"
        >
          {testimonials.map((t, i) => (
            <FadeIn key={t.id} delay={i * 0.05} className="h-full">
              <li className="flex h-full flex-col justify-between rounded-md border border-ink-3 bg-ink p-6">
                <blockquote className="text-body font-heading text-bone">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <footer className="mt-6 flex items-baseline justify-between border-t border-ink-3 pt-4">
                  <cite className="font-mono text-mono text-rust not-italic uppercase tracking-widest">
                    {t.author}
                  </cite>
                  <span className="font-mono text-mono text-bone-mute">
                    {t.context} · {t.when}
                  </span>
                </footer>
              </li>
            </FadeIn>
          ))}
        </ul>
      </Container>
    </section>
  );
}
