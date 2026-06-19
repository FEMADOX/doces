"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * CURSOR TRAIL — a comet of ingredient cutouts that lags behind the mouse.
 *
 * The pointer position drives a chain of springs: node 1 chases the cursor,
 * node 2 chases node 1, and so on, so the ingredients string out behind the
 * cursor as it moves (CRAV-style). Mouse-only; hidden on touch / reduced
 * motion. Placeholder burger cutouts — swap for sweet ones later.
 */

// Sweet ingredient cutouts trailing the cursor.
const ITEMS = [
  { src: "/assets/mouse/morango.png", size: 38 },
  { src: "/assets/mouse/cacau.png", size: 34 },
  { src: "/assets/mouse/coco.png", size: 31 },
  { src: "/assets/mouse/castanhas.png", size: 28 },
  { src: "/assets/mouse/tamara.png", size: 24 },
];

const SPRING = { stiffness: 260, damping: 26, mass: 0.7 };

export default function CursorTrail() {
  const [active, setActive] = useState(false);

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);

  // chain of springs — each one trails the previous node
  const x1 = useSpring(x, SPRING);
  const y1 = useSpring(y, SPRING);
  const x2 = useSpring(x1, SPRING);
  const y2 = useSpring(y1, SPRING);
  const x3 = useSpring(x2, SPRING);
  const y3 = useSpring(y2, SPRING);
  const x4 = useSpring(x3, SPRING);
  const y4 = useSpring(y3, SPRING);
  const x5 = useSpring(x4, SPRING);
  const y5 = useSpring(y4, SPRING);

  const nodes = [
    { x: x1, y: y1 },
    { x: x2, y: y2 },
    { x: x3, y: y3 },
    { x: x4, y: y4 },
    { x: x5, y: y5 },
  ];

  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(pointer: coarse)").matches
    ) {
      return;
    }
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      x.set(e.clientX);
      y.set(e.clientY);
      setActive(true);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60]"
      style={{ opacity: active ? 1 : 0, transition: "opacity .3s" }}
    >
      {nodes.map((node, i) => (
        <motion.img
          key={i}
          src={ITEMS[i].src}
          alt=""
          className="absolute top-0 left-0"
          style={{
            x: node.x,
            y: node.y,
            width: ITEMS[i].size,
            height: ITEMS[i].size,
            marginLeft: -ITEMS[i].size / 2,
            marginTop: -ITEMS[i].size / 2,
            opacity: 1 - i * 0.16,
            filter: "drop-shadow(0 4px 6px rgba(90,52,20,.3))",
          }}
        />
      ))}
    </div>
  );
}
