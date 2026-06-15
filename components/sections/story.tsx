import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/shared/container";
import { FadeIn } from "@/components/shared/fade-in";
import { story } from "@/lib/data/story";

export function Story() {
  return (
    <section id="story" className="bg-ink py-24 md:py-32" aria-labelledby="story-heading">
      <Container className="max-w-4xl">
        <FadeIn>
          <p className="font-mono text-mono text-rust mb-6 uppercase tracking-widest">
            {story.eyebrow}
          </p>
          <h2 id="story-heading" className="text-h1 font-heading text-bone">
            {story.headline}
          </h2>
          <p className="text-body text-bone-2 mt-8 max-w-2xl text-balance">{story.body}</p>
          <a
            href={story.ctaHref}
            className="mt-10 inline-flex items-center gap-2 text-body text-rust transition-colors duration-fast hover:text-rust-2"
          >
            {story.ctaLabel}
            <ArrowRight size={18} weight="bold" />
          </a>
        </FadeIn>
      </Container>
    </section>
  );
}
