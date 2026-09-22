"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const COLS = 16;
const ROWS = 10;
const MAX_ORDER = ROWS + COLS - 2;
const BAND = 0.06;

export default function HeroBackdrop() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const height = rect.height || 1;
      const p = -rect.top / height;
      setProgress(Math.min(1, Math.max(0, p)));
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const tiles = useMemo(() => {
    const arr: { row: number; col: number; order: number }[] = [];
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        arr.push({ row, col, order: row + col });
      }
    }
    return arr;
  }, []);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 grid"
        style={{
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
          perspective: 500,
        }}
      >
        {tiles.map((t) => {
          const start = (t.order / MAX_ORDER) * (1 - BAND);
          const local = Math.min(1, Math.max(0, (progress - start) / BAND));
          return (
            <div
              key={`${t.row}-${t.col}`}
              style={{
                opacity: local,
                transform: `rotateX(${(1 - local) * -100}deg)`,
                transformOrigin: "top",
              }}
              className="border border-[#fff9c7]/[0.18] bg-[#fff9c7]/[0.035]"
            />
          );
        })}
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(255,249,199,0.14),transparent_70%)]" />
    </div>
  );
}
