"use client";

import { useRef, useState, useSyncExternalStore, type ReactNode } from "react";
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

// Vrai sur grand écran (≥ 1024 px), où la carte peut glisser pour laisser
// la place au texte à côté d'elle.
function useIsDesktop() {
  return useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia("(min-width: 1024px)");
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(min-width: 1024px)").matches,
    () => false,
  );
}

// Scène en trois temps pendant le défilement :
// 1. la carte de France s'affiche seule, centrée ;
// 2. elle zoome sur les Hauts-de-France et le reste du pays s'efface ;
// 3. sur grand écran, elle glisse vers la droite et le texte (children)
//    apparaît à sa gauche. Sur mobile, le texte suit sous la carte.
export default function FranceMap({ children }: { children?: ReactNode }) {
  const isDesktop = useIsDesktop();
  // La scène est reconstruite quand on passe du mode mobile au mode grand
  // écran : les animations liées au défilement sont calculées à la
  // création et ne suivraient pas un changement de mode en cours de route.
  return (
    <MapScene key={isDesktop ? "desktop" : "mobile"} isDesktop={isDesktop}>
      {children}
    </MapScene>
  );
}

function MapScene({ children, isDesktop }: { children?: ReactNode; isDesktop: boolean }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: isDesktop ? ["start start", "end end"] : ["start 0.7", "center 0.4"],
  });

  // Zoom : première moitié du défilement (tout le parcours sur mobile).
  const zoomEnd = isDesktop ? 0.5 : 1;
  const vx = useTransform(scrollYProgress, [0, zoomEnd], [FRANCE_VIEW[0], HDF_VIEW[0]]);
  const vy = useTransform(scrollYProgress, [0, zoomEnd], [FRANCE_VIEW[1], HDF_VIEW[1]]);
  const vw = useTransform(scrollYProgress, [0, zoomEnd], [FRANCE_VIEW[2], HDF_VIEW[2]]);
  const vh = useTransform(scrollYProgress, [0, zoomEnd], [FRANCE_VIEW[3], HDF_VIEW[3]]);
  const viewBox = useMotionTemplate`${vx} ${vy} ${vw} ${vh}`;

  const strokeW = useTransform(scrollYProgress, [0, zoomEnd], [0.012, 0.0035]);
  const otherOpacity = useTransform(scrollYProgress, [0.1 * zoomEnd, 0.8 * zoomEnd], [0.5, 0]);
  const otherStroke = useTransform(scrollYProgress, [0.1 * zoomEnd, 0.8 * zoomEnd], [1, 0]);
  const pinScale = useTransform(scrollYProgress, [0.85 * zoomEnd, zoomEnd], [0, 1]);
  const pinOpacity = useTransform(scrollYProgress, [0, 0.8 * zoomEnd, zoomEnd, 1], [0, 0, 1, 1]);
  const detailOpacity = useTransform(scrollYProgress, [0, 0.8 * zoomEnd, zoomEnd, 1], [0, 0, 1, 1]);

  // Glissement de la carte vers la droite puis apparition du texte.
  // Les valeurs sont données sur tout le parcours (0 → 1) : sans cela,
  // l'animation accélérée par le navigateur continuait au-delà de la fin.
  // La carte occupe 40 % de la largeur : 62,5 % de sa largeur la place au
  // centre de la moitié droite.
  const mapX = useTransform(scrollYProgress, [0, 0.52, 0.72, 1], ["0%", "0%", "62.5%", "62.5%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6, 0.78, 1], [0, 0, 1, 1]);
  const textX = useTransform(scrollYProgress, [0, 0.6, 0.78, 1], [-32, -32, 0, 0]);

  return (
    <section ref={wrapperRef} className="relative px-6 lg:-mt-12 lg:h-[200vh]">
      <div className="mx-auto max-w-6xl lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-start lg:pt-24">
        <div className="relative w-full">
          <motion.div
            style={isDesktop ? { x: mapX } : undefined}
            className="mx-auto flex w-full max-w-md flex-col items-center lg:w-[40%] lg:max-w-none"
          >
            <p className="text-sm font-semibold text-muted">
              {pages.centre.mapEyebrow}
            </p>
            <div className="relative mt-4 aspect-square w-full">
              <motion.svg viewBox={viewBox} className="h-full w-full overflow-hidden">
                {depts.map((dept) => (
                  <motion.path
                    key={dept.code}
                    d={dept.path}
                    fill={dept.hdf ? "var(--accent)" : "var(--surface-2)"}
                    fillOpacity={dept.hdf ? 1 : otherOpacity}
                    stroke="var(--surface)"
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
                  <circle cx={wingles.x} cy={wingles.y} r={0.055} fill="var(--surface)" />
                  <circle
                    cx={wingles.x}
                    cy={wingles.y}
                    r={0.028}
                    fill="var(--accent)"
                    stroke="var(--surface)"
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
          </motion.div>

          {children && (
            <motion.div
              style={isDesktop ? { opacity: textOpacity, x: textX } : undefined}
              className="pb-16 pt-10 lg:absolute lg:left-0 lg:top-1/2 lg:w-[46%] lg:-translate-y-1/2 lg:p-0"
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
