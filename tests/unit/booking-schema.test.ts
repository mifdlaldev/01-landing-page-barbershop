import { describe, expect, it } from "vitest";
import { bookingSchema } from "@/lib/booking/schema";

describe("bookingSchema", () => {
  const validInput = {
    name: "Rio Setiawan",
    whatsapp: "+62 811 5555 1234",
    serviceId: "classic",
    date: "2026-12-31",
    time: "10:00",
    notes: "",
  };

  it("accepts a valid booking", () => {
    const result = bookingSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it("rejects too-short name", () => {
    const r = bookingSchema.safeParse({ ...validInput, name: "A" });
    expect(r.success).toBe(false);
  });

  it("rejects invalid whatsapp characters", () => {
    const r = bookingSchema.safeParse({ ...validInput, whatsapp: "abc" });
    expect(r.success).toBe(false);
  });

  it("rejects unknown service", () => {
    const r = bookingSchema.safeParse({ ...validInput, serviceId: "hocus" });
    expect(r.success).toBe(false);
  });

  it("rejects malformed date", () => {
    const r = bookingSchema.safeParse({ ...validInput, date: "31-12-2026" });
    expect(r.success).toBe(false);
  });

  it("rejects unknown time slot", () => {
    const r = bookingSchema.safeParse({ ...validInput, time: "99:99" });
    expect(r.success).toBe(false);
  });

  it("accepts empty notes (optional)", () => {
    const r = bookingSchema.safeParse({ ...validInput, notes: "" });
    expect(r.success).toBe(true);
  });
});
