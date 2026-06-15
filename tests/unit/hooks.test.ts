import { renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useHideOnScroll } from "@/lib/hooks/use-hide-on-scroll";
import { useScrollProgress } from "@/lib/hooks/use-scroll-progress";

describe("hooks", () => {
  beforeEach(() => {
    Object.defineProperty(window, "scrollY", { value: 0, writable: true });
    Object.defineProperty(window, "innerHeight", { value: 800, writable: true });
    Object.defineProperty(document.documentElement, "scrollHeight", {
      value: 2000,
      writable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("useHideOnScroll — visible=true initially", () => {
    const { result } = renderHook(() => useHideOnScroll(10));
    expect(result.current.visible).toBe(true);
    expect(result.current.scrolled).toBe(false);
  });

  it("useScrollProgress — returns 0..1", () => {
    const { result } = renderHook(() => useScrollProgress());
    expect(result.current).toBeGreaterThanOrEqual(0);
    expect(result.current).toBeLessThanOrEqual(1);
  });
});
