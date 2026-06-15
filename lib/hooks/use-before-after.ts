"use client";

import { useCallback, useEffect, useState } from "react";

type Args = {
  initial?: number; // 0..100
};

/**
 * useBeforeAfter — pointer/keyboard drag state for the Before/After slider.
 * - Returns position (0..100) and pointer/keyboard handlers.
 * - ARIA-friendly: keyboard arrow keys adjust by 2%, home/end snap.
 */
export function useBeforeAfter({ initial = 50 }: Args = {}) {
  const [position, setPosition] = useState(initial);

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 2;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPosition((p) => Math.max(0, p - step));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPosition((p) => Math.min(100, p + step));
    } else if (e.key === "Home") {
      e.preventDefault();
      setPosition(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setPosition(100);
    }
  }, []);

  useEffect(() => {
    // no-op; placeholder for future pointer down/up document listeners
  }, []);

  return { position, setPosition, onKeyDown } as const;
}
