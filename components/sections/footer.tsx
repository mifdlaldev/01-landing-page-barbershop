import { Container } from "@/components/shared/container";
import { hours } from "@/lib/data/hours";

const footerLinks = [
  { href: "#services", label: "Services" },
  { href: "#barbers", label: "Barbers" },
  { href: "#story", label: "Story" },
  { href: "#faq", label: "FAQ" },
  { href: "#visit", label: "Visit" },
];

const legalLinks = [
  { href: "#", label: "Privacy" },
  { href: "#", label: "Terms" },
];

export function Footer() {
  return (
    <footer className="border-t border-ink-3 bg-ink-2 py-16">
      <Container>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          <div className="col-span-2 md:col-span-1">
            <p className="font-heading text-h3 text-bone">SLOWCUTS</p>
            <p className="text-body text-bone-mute mt-3 max-w-xs">
              The cut that earns the wait. Est. 2018, Kemang, Jakarta.
            </p>
          </div>

          <div>
            <p className="font-mono text-mono text-rust mb-4 uppercase tracking-widest">Sitemap</p>
            <ul className="space-y-2">
              {footerLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-body text-bone-2 hover:text-rust">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-mono text-rust mb-4 uppercase tracking-widest">Hours</p>
            <ul className="space-y-1.5">
              {hours.map((h) => (
                <li key={h.day} className="flex flex-col font-mono text-mono">
                  <span className="text-bone-2">{h.day}</span>
                  <span className="text-bone-mute">
                    {h.open}–{h.close}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-mono text-rust mb-4 uppercase tracking-widest">Legal</p>
            <ul className="space-y-2">
              {legalLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-body text-bone-2 hover:text-rust">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-ink-3 pt-6 md:flex-row md:items-center">
          <p className="font-mono text-mono text-bone-mute">
            © 2018–2026 SLOWCUTS · Made slow in Kemang
          </p>
          <p className="font-mono text-mono text-bone-mute">v0.1 · portfolio build</p>
        </div>
      </Container>
    </footer>
  );
}
