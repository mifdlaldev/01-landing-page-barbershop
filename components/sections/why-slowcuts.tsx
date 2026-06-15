import { Container } from "@/components/shared/container";
import { FadeIn } from "@/components/shared/fade-in";
import { SectionHeading } from "@/components/shared/section-heading";
import { whyBlocks } from "@/lib/data/why";
import { cn } from "@/lib/utils";

function BlockImage({ alt }: { alt: string }) {
  return (
    <div
      role="img"
      aria-label={alt}
      className="aspect-[4/3] w-full overflow-hidden rounded-md border border-ink-3 bg-ink-2"
    >
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ink-2 via-ink-3 to-rust/20">
        <span className="font-mono text-mono text-bone-mute uppercase tracking-widest">
          Image placeholder
        </span>
      </div>
    </div>
  );
}

export function WhySlowcuts() {
  return (
    <section id="why" className="bg-ink-2 py-24 md:py-32" aria-labelledby="why-heading">
      <Container>
        <FadeIn className="mb-16 md:mb-24">
          <SectionHeading
            eyebrow="Why SLOWCUTS"
            title="Slow on purpose."
            subtitle="We make four choices other barbershops won't. They're the reason you'll keep coming back."
            align="left"
          />
        </FadeIn>

        <div className="flex flex-col gap-20 md:gap-32">
          {whyBlocks.map((block, i) => {
            const reverse = i % 2 === 1;
            return (
              <FadeIn key={block.id}>
                <div
                  className={cn(
                    "grid items-center gap-8 md:grid-cols-2 md:gap-16",
                    reverse && "md:[&>*:first-child]:order-2",
                  )}
                >
                  <BlockImage alt={block.imageAlt} />
                  <div>
                    <span className="font-mono text-mono text-rust mb-4 inline-block uppercase tracking-widest">
                      0{i + 1}
                    </span>
                    <h3 className="text-h2 font-heading text-bone">{block.title}</h3>
                    <p className="text-body text-bone-2 mt-4 max-w-md">{block.body}</p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
