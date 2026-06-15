/**
 * Container — responsive max-width wrapper.
 * RSC. Padding scales at md/lg breakpoints.
 */
type Props = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "header" | "footer" | "nav" | "main" | "ul" | "ol";
};

export function Container({ children, className = "", as: Tag = "div" }: Props) {
  return (
    <Tag className={`mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12 ${className}`}>{children}</Tag>
  );
}
