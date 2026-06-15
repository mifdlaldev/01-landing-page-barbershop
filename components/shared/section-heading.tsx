/**
 * SectionHeading — reusable section title block.
 * RSC (no client JS). Eyebrow is mono rust, title is Fraunces bone, subtitle is bone-2.
 */
type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className = "",
}: Props) {
  return (
    <header className={`${align === "center" ? "text-center mx-auto" : ""} ${className}`}>
      {eyebrow && (
        <p className="font-mono text-mono text-rust mb-4 uppercase tracking-widest">{eyebrow}</p>
      )}
      <h2 className="text-h2 font-heading text-bone">{title}</h2>
      {subtitle && <p className="text-body text-bone-2 mt-4 max-w-2xl">{subtitle}</p>}
    </header>
  );
}
