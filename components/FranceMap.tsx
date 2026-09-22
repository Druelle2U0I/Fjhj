"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import mapData from "@/lib/geo/france-departements.json";

type Dept = { code: string; nom: string; path: string; hdf: boolean };

const { depts, allBounds, hdfBounds, wingles } = mapData as {
  depts: Dept[];
  allBounds: [number, number, number, number];
  hdfBounds: [number, number, number, number];
  wingles: { x: number; y: number };
};

function padded(
  bounds: [number, number, number, number],
  ratio: number,
): [number, number, number, number] {
  const [minx, miny, maxx, maxy] = bounds;
  const w = maxx - minx;
  const h = maxy - miny;
  const px = w * ratio;
  const py = h * ratio;
  return [minx - px, miny - py, w + px * 2, h + py * 2];
}

const FRANCE_VIEW = padded(allBounds, 0.03);
const HDF_VIEW = padded(hdfBounds, 0.18);

export default function FranceMap() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const vx = useTransform(scrollYProgress, [0, 0.7], [FRANCE_VIEW[0], HDF_VIEW[0]]);
  const vy = useTransform(scrollYProgress, [0, 0.7], [FRANCE_VIEW[1], HDF_VIEW[1]]);
  const vw = useTransform(scrollYProgress, [0, 0.7], [FRANCE_VIEW[2], HDF_VIEW[2]]);
  const vh = useTransform(scrollYProgress, [0, 0.7], [FRANCE_VIEW[3], HDF_VIEW[3]]);
  const viewBox = useMotionTemplate`${vx} ${vy} ${vw} ${vh}`;

  const detailOpacity = useTransform(scrollYProgress, [0.55, 0.75], [0, 1]);
  const strokeW = useTransform(scrollYProgress, [0, 0.7], [0.012, 0.0035]);
  const pinScale = useTransform(scrollYProgress, [0.65, 0.85], [0, 1]);
  const pinOpacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
  const eyebrowOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <div ref={wrapperRef} className="relative h-[220vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6 py-16">
        <div className="pointer-events-none absolute inset-x-0 top-16 z-10 text-center">
          <motion.p
            style={{ opacity: eyebrowOpacity }}
            className="text-sm font-semibold uppercase tracking-wide text-accent"
          >
            Notre zone d&apos;intervention
          </motion.p>
        </div>

        <div className="relative aspect-square w-full max-w-xl">
          <motion.svg
            viewBox={viewBox}
            className="h-full w-full overflow-visible"
          >
            {depts.map((dept) => (
              <motion.path
                key={dept.code}
                d={dept.path}
                fill={dept.hdf ? "var(--accent)" : "var(--surface-2)"}
                fillOpacity={dept.hdf ? 1 : 0.5}
                stroke="var(--background)"
                strokeWidth={strokeW}
                onMouseEnter={() => dept.hdf && setHovered(dept.code)}
                onMouseLeave={() => setHovered(null)}
                className={dept.hdf ? "cursor-pointer transition-opacity" : ""}
                style={
                  dept.hdf
                    ? { opacity: hovered === dept.code ? 0.75 : 1 }
                    : undefined
                }
              />
            ))}

            <motion.g style={{ opacity: pinOpacity, scale: pinScale }}>
              <circle
                cx={wingles.x}
                cy={wingles.y}
                r={0.055}
                fill="var(--background)"
              />
              <circle
                cx={wingles.x}
                cy={wingles.y}
                r={0.028}
                fill="var(--accent)"
                stroke="var(--background)"
                strokeWidth={0.008}
              />
            </motion.g>
          </motion.svg>

          <motion.div
            style={{ opacity: pinOpacity }}
            className="pointer-events-none absolute left-1/2 top-[8%] -translate-x-1/2 whitespace-nowrap rounded-full border border-accent/40 bg-background/90 px-4 py-2 text-xs font-semibold shadow-lg backdrop-blur"
          >
            Notre centre — Wingles (62)
          </motion.div>
        </div>

        <motion.p
          style={{ opacity: detailOpacity }}
          className="mt-6 max-w-md text-center text-sm text-muted"
        >
          Nord, Pas-de-Calais, Somme, Aisne, Oise : nous intervenons dans les
          5 départements des Hauts-de-France, en intra-entreprise dans vos
          locaux.
        </motion.p>
      </div>
    </div>
  );
}
