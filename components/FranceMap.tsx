"use client";

import { useRef, useState, type ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import mapData from "@/lib/geo/france-departements.json";
import { pages } from "@/lib/data";

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

export default function FranceMap({ children }: { children?: ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start 0.6", "end end"],
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
  // Le reste de la France s'efface pendant le zoom : à la fin, seule la
  // zone d'intervention reste visible.
  const otherOpacity = useTransform(scrollYProgress, [0.15, 0.55], [0.5, 0]);
  const otherStroke = useTransform(scrollYProgress, [0.15, 0.55], [1, 0]);

  // Texte (children) à gauche et carte à droite. Sur grand écran, le bloc
  // reste épinglé pendant le défilement, le temps que la carte zoome sur
  // les Hauts-de-France ; sur mobile, la carte passe au-dessus du texte.
  return (
    <section ref={wrapperRef} className="relative px-6 lg:h-[190vh]">
      <div className="mx-auto grid max-w-6xl items-start gap-10 pb-16 pt-2 lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] lg:grid-cols-2 lg:gap-16 lg:pb-8 lg:pt-4">
        <div className="order-2 lg:order-1">{children}</div>

        <div className="order-1 flex flex-col items-center lg:order-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">
            {pages.centre.mapEyebrow}
          </p>
          <div className="relative mt-4 aspect-square w-full max-w-md">
            <motion.svg
              viewBox={viewBox}
              className="h-full w-full overflow-hidden"
            >
              {depts.map((dept) => (
                <motion.path
                  key={dept.code}
                  d={dept.path}
                  fill={dept.hdf ? "var(--accent)" : "var(--surface-2)"}
                  fillOpacity={dept.hdf ? 1 : otherOpacity}
                  stroke="var(--background)"
                  strokeWidth={strokeW}
                strokeOpacity={dept.hdf ? 1 : otherStroke}
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
            className="mt-4 max-w-md text-center text-sm text-muted"
          >
            {pages.centre.mapText}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
