import { Container } from "@/components/shared/container";

export default function Home() {
  return (
    <main>
      <Container className="py-24">
        <p className="font-mono text-mono text-rust mb-4 uppercase tracking-widest">
          Est. 2018 — Kemang, Jakarta
        </p>
        <h1 className="text-display text-bone">SLOWCUTS</h1>
        <p className="text-body text-bone-2 mt-6 max-w-xl">The cut that earns the wait.</p>
        <p className="text-body text-bone-mute mt-12 max-w-xl">
          Foundation ready. Sections coming next.
        </p>
      </Container>
    </main>
  );
}
