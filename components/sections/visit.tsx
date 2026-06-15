import { MapPin, Phone, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/shared/container";
import { FadeIn } from "@/components/shared/fade-in";
import { SectionHeading } from "@/components/shared/section-heading";
import { address, hours } from "@/lib/data/hours";

export function Visit() {
  return (
    <section id="visit" className="bg-ink py-24 md:py-32" aria-labelledby="visit-heading">
      <Container>
        <FadeIn className="mb-12 md:mb-16">
          <SectionHeading
            eyebrow="Come By"
            title="We saved you a seat."
            subtitle="Kemang traffic is its own kind of ritual. Plan for it."
            align="left"
          />
        </FadeIn>

        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <FadeIn className="h-full">
            <div className="flex h-full flex-col justify-between rounded-md border border-ink-3 bg-ink-2 p-8">
              <div>
                <h3 className="text-h3 font-heading text-bone">SLOWCUTS</h3>
                <ul className="text-body text-bone-2 mt-4 space-y-2">
                  <li className="flex items-start gap-2">
                    <MapPin size={18} weight="duotone" className="text-rust mt-1 shrink-0" />
                    <span>
                      {address.street}
                      <br />
                      {address.area}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Phone size={18} weight="duotone" className="text-rust mt-1 shrink-0" />
                    <a href={`tel:${address.phone.replace(/\s/g, "")}`} className="hover:text-rust">
                      {address.phone}
                    </a>
                  </li>
                  <li className="flex items-start gap-2">
                    <WhatsappLogo size={18} weight="duotone" className="text-rust mt-1 shrink-0" />
                    <a
                      href={`https://wa.me/${address.whatsapp.replace(/\D/g, "")}`}
                      className="hover:text-rust"
                    >
                      {address.whatsapp}
                    </a>
                  </li>
                </ul>
              </div>

              <div className="mt-8 border-t border-ink-3 pt-6">
                <p className="font-mono text-mono text-rust mb-3 uppercase tracking-widest">
                  Hours
                </p>
                <ul className="space-y-1.5">
                  {hours.map((h) => (
                    <li
                      key={h.day}
                      className="flex items-baseline justify-between font-mono text-mono"
                    >
                      <span className="text-bone-2">{h.day}</span>
                      <span className="text-bone-mute">
                        {h.open}–{h.close}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>

          <FadeIn className="h-full">
            <div className="aspect-[4/3] h-full w-full overflow-hidden rounded-md border border-ink-3 bg-ink-2 md:aspect-auto">
              <iframe
                title="SLOWCUTS location on Google Maps"
                src={address.mapsUrl}
                className="h-full w-full"
                style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg)" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
