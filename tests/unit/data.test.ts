import { describe, expect, it } from "vitest";
import { barbers } from "@/lib/data/barbers";
import { faqs } from "@/lib/data/faqs";
import { services } from "@/lib/data/services";
import { testimonials } from "@/lib/data/testimonials";

describe("static data", () => {
  it("services has 6 entries with required fields", () => {
    expect(services).toHaveLength(6);
    for (const s of services) {
      expect(s.id).toBeTruthy();
      expect(s.name).toBeTruthy();
      expect(s.price).toBeGreaterThan(0);
      expect(s.duration).toBeGreaterThan(0);
      expect(s.icon).toBeDefined();
    }
  });

  it("barbers has 3 entries", () => {
    expect(barbers).toHaveLength(3);
    for (const b of barbers) {
      expect(b.id).toBeTruthy();
      expect(b.name).toBeTruthy();
      expect(b.quote).toBeTruthy();
    }
  });

  it("faqs has 8 entries", () => {
    expect(faqs).toHaveLength(8);
    for (const f of faqs) {
      expect(f.question.endsWith("?")).toBe(true);
      expect(f.answer.length).toBeGreaterThan(20);
    }
  });

  it("testimonials have author + quote", () => {
    expect(testimonials.length).toBeGreaterThan(0);
    for (const t of testimonials) {
      expect(t.quote.length).toBeGreaterThan(20);
      expect(t.author).toBeTruthy();
    }
  });
});
