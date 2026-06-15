/**
 * Marquee — CSS-only infinite horizontal scroll.
 * RSC. Phrases duplicated for seamless loop.
 * Pause on hover. prefers-reduced-motion disables animation.
 */
const phrases = [
  "Est 2018",
  "Kemang",
  "45-minute ritual",
  "No double-booking",
  "Rio",
  "Bayu",
  "Andra",
];

const separator = "·";

export function Marquee() {
  const items = (
    <>
      {phrases.map((p) => (
        <span key={p} className="flex shrink-0 items-center gap-6 px-6">
          <span className="text-h3 font-heading text-bone-2 uppercase tracking-tight">{p}</span>
          <span className="text-h3 text-rust" aria-hidden="true">
            {separator}
          </span>
        </span>
      ))}
    </>
  );

  return (
    <div
      className="overflow-hidden border-y border-ink-3 bg-ink-2 py-6"
      role="presentation"
      aria-label="SLOWCUTS — brand highlights"
    >
      <div className="marquee-track flex w-max hover:[animation-play-state:paused]">
        <div className="flex shrink-0">{items}</div>
        <div className="flex shrink-0" aria-hidden="true">
          {items}
        </div>
      </div>
    </div>
  );
}
