import { describe, expect, it } from "vitest";
import { cn, formatBookingId, formatPrice } from "@/lib/utils";

describe("utils", () => {
  it("cn merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
    expect(cn("foo", false && "bar", "baz")).toBe("foo baz");
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("formatPrice formats IDR currency", () => {
    expect(formatPrice(180000)).toMatch(/Rp\s*180\.000/);
    expect(formatPrice(350000)).toMatch(/350\.000/);
  });

  it("formatBookingId pads zero", () => {
    expect(formatBookingId(1)).toBe("SC-2026-00001");
    expect(formatBookingId(12345)).toBe("SC-2026-12345");
  });
});
