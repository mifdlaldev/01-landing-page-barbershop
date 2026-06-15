/**
 * Showcase: asymmetric grid with Phosphor Duotone icons
 */

import { Container } from "@/components/shared/container";
import { FadeIn } from "@/components/shared/fade-in";
import { SectionHeading } from "@/components/shared/section-heading";
import type { Service } from "@/lib/data/services";
import { services } from "@/lib/data/services";
import { cn, formatPrice } from "@/lib/utils";

function ServiceCard({
  service,
  large = false,
  className = "",
}: {
  service: Service;
  large?: boolean;
  className?: string;
}) {
  const Icon = service.icon;
  return (
    <article
      data-cursor="scissors"
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-md border border-ink-3 bg-ink-2 p-6 transition-all duration-base hover:-translate-y-1 hover:border-rust hover:shadow-md md:p-8",
        large && "md:p-10",
        className,
      )}
    >
      {service.featured && (
        <span className="absolute right-4 top-4 rounded-pill border border-rust px-3 py-1 font-mono text-mono uppercase tracking-widest text-rust">
          Signature
        </span>
      )}

      <div>
        <Icon size={large ? 56 : 40} weight="duotone" className="text-rust" aria-hidden="true" />

        <h3 className={cn("mt-6 font-heading text-bone", large ? "text-h2" : "text-h3")}>
          {service.name}
        </h3>

        <p className="text-body text-bone-2 mt-3 max-w-md">{service.description}</p>
      </div>

      <div className="mt-8 flex items-baseline justify-between border-t border-ink-3 pt-6">
        <span className="font-mono text-body text-rust">{formatPrice(service.price)}</span>
        <span className="font-mono text-mono text-bone-mute uppercase tracking-widest">
          {service.duration} min
        </span>
      </div>
    </article>
  );
}

export function Services() {
  const featured = services.filter((s) => s.featured);
  const rest = services.filter((s) => !s.featured);

  return (
    <section id="services" className="bg-ink py-24 md:py-32" aria-labelledby="services-heading">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="The Menu"
            title="Six ways to leave sharper."
            subtitle="Every appointment is 45 minutes minimum. Bring a reference, bring a question, bring nothing but the willingness to be still."
            align="left"
            className="mb-12 md:mb-16"
          />
        </FadeIn>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-6">
          {featured.map((s, i) => (
            <FadeIn key={s.id} delay={i * 0.05} className="md:col-span-3">
              <ServiceCard service={s} large />
            </FadeIn>
          ))}

          {rest.map((s, i) => (
            <FadeIn key={s.id} delay={(featured.length + i) * 0.05} className="md:col-span-2">
              <ServiceCard service={s} />
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
