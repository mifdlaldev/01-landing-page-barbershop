import { Container } from "@/components/shared/container";
import { FadeIn } from "@/components/shared/fade-in";
import { SectionHeading } from "@/components/shared/section-heading";
import { barbers } from "@/lib/data/barbers";

function BarberPortrait({ name }: { name: string }) {
  return (
    <div
      role="img"
      aria-label={`Portrait of ${name}`}
      className="aspect-[3/4] w-full overflow-hidden rounded-md border border-ink-3 bg-ink-2"
    >
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ink-2 via-ink-3 to-rust/15">
        <span className="font-mono text-mono text-bone-mute uppercase tracking-widest">
          Portrait
        </span>
      </div>
    </div>
  );
}

export function Barbers() {
  return (
    <section id="barbers" className="bg-ink py-24 md:py-32" aria-labelledby="barbers-heading">
      <Container>
        <FadeIn className="mb-12 md:mb-16">
          <SectionHeading
            eyebrow="The People"
            title="Three barbers. One chair at a time."
            subtitle="Each cut is one barber, one client, one uninterrupted hour."
            align="left"
          />
        </FadeIn>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {barbers.map((barber, i) => (
            <FadeIn key={barber.id} delay={i * 0.05}>
              <article className="group flex h-full flex-col">
                <BarberPortrait name={barber.name} />
                <div className="mt-6">
                  <h3 className="text-h3 font-heading text-bone">{barber.name}</h3>
                  <p className="font-mono text-mono text-rust mt-1 uppercase tracking-widest">
                    {barber.title} · {barber.yearsExperience}y
                  </p>
                </div>
                <p className="text-body text-bone-2 mt-4 flex-1">{barber.bio}</p>
                <blockquote className="mt-6 border-l-0 pl-0">
                  <p className="text-body font-heading text-bone-2 italic">
                    &ldquo;{barber.quote}&rdquo;
                  </p>
                </blockquote>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
