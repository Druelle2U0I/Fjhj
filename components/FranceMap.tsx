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
// Repère de Wingles sur la carte : jaune, pour ressortir sur la région.
const WINGLES_YELLOW = "#f5c518";

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

function MapScene({
  children,
  isDesktop,
}: {
  children?: ReactNode;
  isDesktop: boolean;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    // Sur téléphone aussi, la carte reste fixée à l'écran pendant qu'on fait
    // défiler : le zoom se voit en entier au lieu de passer en un éclair.
    // Grand écran : pas de carte épinglée (elle laissait un grand vide) ;
    // le zoom suit simplement le passage de la carte à l'écran.
    offset: isDesktop ? ["start 0.85", "end 0.6"] : ["start start", "end end"],
  });

  // Zoom : l'essentiel du défilement, puis un temps d'arrêt sur la région.
  const zoomEnd = 0.8;
  const vx = useTransform(
    scrollYProgress,
    [0, zoomEnd],
    [FRANCE_VIEW[0], HDF_VIEW[0]],
  );
  const vy = useTransform(
    scrollYProgress,
    [0, zoomEnd],
    [FRANCE_VIEW[1], HDF_VIEW[1]],
  );
  const vw = useTransform(
    scrollYProgress,
    [0, zoomEnd],
    [FRANCE_VIEW[2], HDF_VIEW[2]],
  );
  const vh = useTransform(
    scrollYProgress,
    [0, zoomEnd],
    [FRANCE_VIEW[3], HDF_VIEW[3]],
  );
  const viewBox = useMotionTemplate`${vx} ${vy} ${vw} ${vh}`;

  const strokeW = useTransform(scrollYProgress, [0, zoomEnd], [0.012, 0.0035]);
  const otherOpacity = useTransform(
    scrollYProgress,
    [0.1 * zoomEnd, 0.8 * zoomEnd],
    [0.5, 0],
  );
  const otherStroke = useTransform(
    scrollYProgress,
    [0.1 * zoomEnd, 0.8 * zoomEnd],
    [1, 0],
  );
  const pinScale = useTransform(
    scrollYProgress,
    [0.85 * zoomEnd, zoomEnd],
    [0, 1],
  );
  const pinOpacity = useTransform(
    scrollYProgress,
    [0, 0.8 * zoomEnd, zoomEnd, 1],
    [0, 0, 1, 1],
  );
  const detailOpacity = useTransform(
    scrollYProgress,
    [0, 0.8 * zoomEnd, zoomEnd, 1],
    [0, 0, 1, 1],
  );

  return (
    <>
      <section
        ref={wrapperRef}
        className="relative h-[190vh] px-6 lg:h-auto lg:pt-12 lg:pb-10"
      >
        <div className="sticky top-0 mx-auto flex h-[100svh] max-w-6xl items-center pt-20 lg:static lg:h-auto lg:items-start lg:pt-0">
          <div className="relative w-full">
            <motion.div
              // Sur grand écran, la carte reste dans la moitié droite (40 % de
              // large, décalée de 62,5 % de sa largeur) et le texte à gauche
              // est visible dès l'arrivée ; seul le zoom suit le défilement.
              style={isDesktop ? { x: "62.5%" } : undefined}
              className="mx-auto flex w-full max-w-md flex-col items-center lg:w-[40%] lg:max-w-none"
            >
              <p className="eyebrow block text-muted">
                {pages.centre.mapEyebrow}
              </p>
              <div className="relative mt-4 aspect-square w-full max-w-[min(100%,58vh)] lg:max-w-[min(100%,52vh)]">
                <motion.svg
                  viewBox={viewBox}
                  className="h-full w-full overflow-hidden"
                >
                  {depts.map((dept) => (
                    <motion.path
                      key={dept.code}
                      d={dept.path}
                      fill={dept.hdf ? "var(--accent)" : "#c9c6b6"}
                      fillOpacity={dept.hdf ? 1 : otherOpacity}
                      stroke="var(--surface)"
                      strokeWidth={strokeW}
                      strokeOpacity={dept.hdf ? 1 : otherStroke}
                      onMouseEnter={() => dept.hdf && setHovered(dept.code)}
                      onMouseLeave={() => setHovered(null)}
                      className={
                        dept.hdf ? "cursor-pointer transition-opacity" : ""
                      }
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
                      r={0.07}
                      fill={WINGLES_YELLOW}
                      fillOpacity={0.35}
                    />
                    <circle
                      cx={wingles.x}
                      cy={wingles.y}
                      r={0.036}
                      fill={WINGLES_YELLOW}
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

            {children && isDesktop && (
              <div className="lg:absolute lg:left-0 lg:top-0 lg:w-[46%]">
                {children}
              </div>
            )}
          </div>
        </div>
      </section>
      {/* Téléphone et tablette : le texte suit la carte, une fois le zoom fini. */}
      {children && !isDesktop && (
        <div className="mx-auto max-w-6xl px-6 pb-16 pt-4">{children}</div>
      )}
    </>
  );
}
