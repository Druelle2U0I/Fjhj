"use client";

import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

const COLS = 16;
const ROWS = 10;
const MAX_ORDER = ROWS + COLS - 2;
const BAND = 0.05;

function Tile({
  progress,
  order,
}: {
  progress: MotionValue<number>;
  order: number;
}) {
  const start = (order / MAX_ORDER) * (1 - BAND);
  const rotateX = useTransform(progress, [start, start + BAND], [-100, 0]);
  const opacity = useTransform(progress, [start, start + BAND], [0, 1]);

  return (
    <motion.div
      style={{
        rotateX,
        opacity,
        transformPerspective: 400,
        transformOrigin: "top",
      }}
      className="border border-[#fff9c7]/[0.18] bg-[#fff9c7]/[0.035]"
    />
  );
}

export default function HeroBackdrop() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

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
        }}
      >
        {tiles.map((t) => (
          <Tile key={`${t.row}-${t.col}`} progress={scrollYProgress} order={t.order} />
        ))}
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(255,249,199,0.14),transparent_70%)]" />
    </div>
  );
}
