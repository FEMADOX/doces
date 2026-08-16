"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CursorTrailRenderer = dynamic(
  () =>
    import("@/components/CursorTrailRenderer").catch(() => ({
      default: () => null,
    })),
  { ssr: false },
);

type Point = { x: number; y: number };

export default function CursorTrail() {
  const [initialPoint, setInitialPoint] = useState<Point | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (reduced || !finePointer) return;

    const activate = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      setInitialPoint({ x: event.clientX, y: event.clientY });
      window.removeEventListener("pointermove", activate);
    };

    window.addEventListener("pointermove", activate, { passive: true });
    return () => window.removeEventListener("pointermove", activate);
  }, []);

  return initialPoint ? (
    <CursorTrailRenderer initialX={initialPoint.x} initialY={initialPoint.y} />
  ) : null;
}
