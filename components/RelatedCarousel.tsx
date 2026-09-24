"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { animate, motion, useMotionValue, useReducedMotion, type PanInfo } from "framer-motion";
import Visual from "@/components/Visual";

export type RelatedItem = {
  href: string;
  title: string;
  duration: string;
  format: string;
  image?: string;
  imageAlt?: string;
};

// Nombre de cartes visibles selon la largeur d'écran : 1, 2 ou 3.
function useVisibleCount() {
  return useSyncExternalStore(
    (onChange) => {
      window.addEventListener("resize", onChange);
      return () => window.removeEventListener("resize", onChange);
    },
    () => (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1),
    () => 3,
  );
}

const AUTOPLAY_MS = 5000;

// Carrousel des autres formations du domaine, dans une bande jaune
// translucide pleine largeur. Les cartes glissent d'un bloc avec une animation amortie
// (flèches, points, glisser au doigt ou à la souris) et défilent seules
// toutes les 5 secondes, en pause au survol.
export default function RelatedCarousel({
  title,
  items,
}: {
  title: string;
  items: RelatedItem[];
}) {
  const visible = Math.min(useVisibleCount(), items.length);
  const maxIndex = Math.max(0, items.length - visible);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  const viewport = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const x = useMotionValue(0);
  const dragged = useRef(false);

  useLayoutEffect(() => {
    const node = viewport.current;
    if (!node) return;
    const observer = new ResizeObserver(() => setWidth(node.clientWidth));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const current = Math.min(index, maxIndex);
  const step = width / visible;

  // Glisse vers la carte courante avec un ressort doux.
  useEffect(() => {
    const controls = animate(x, -current * step, reduce
      ? { duration: 0 }
      : { type: "spring", stiffness: 120, damping: 24, mass: 0.9 });
    return () => controls.stop();
  }, [current, step, x, reduce]);

  const go = useCallback(
    (delta: number) =>
      setIndex((i) => {
        const next = Math.min(i, maxIndex) + delta;
        if (next > maxIndex) return 0;
        if (next < 0) return maxIndex;
        return next;
      }),
    [maxIndex],
  );

  useEffect(() => {
    if (paused || reduce || maxIndex === 0) return;
    const timer = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, reduce, maxIndex, go]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = step * 0.2;
    if (info.offset.x < -threshold || info.velocity.x < -400) go(1);
    else if (info.offset.x > threshold || info.velocity.x > 400) go(-1);
    else animate(x, -current * step, { type: "spring", stiffness: 160, damping: 26 });
    // Évite qu'un glisser se termine par l'ouverture d'une fiche.
    setTimeout(() => (dragged.current = false), 0);
  };

  if (items.length === 0) return null;

  const arrow =
    "flex h-11 w-11 items-center justify-center rounded-full border border-accent/30 bg-background/60 text-lg text-foreground backdrop-blur transition-colors hover:border-accent hover:text-accent";

  return (
    // Bande jaune translucide sur toute la largeur : elle marque la fin de
    // la fiche et sépare nettement le carrousel du contenu au-dessus.
    <section className="related-band mb-24 border-y px-6 py-14 sm:py-16">
      <div
        className="mx-auto max-w-6xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{title}</h2>
          {maxIndex > 0 && (
            <div className="flex shrink-0 gap-2">
              <button type="button" aria-label="Formations précédentes" onClick={() => go(-1)} className={arrow}>
                ‹
              </button>
              <button type="button" aria-label="Formations suivantes" onClick={() => go(1)} className={arrow}>
                ›
              </button>
            </div>
          )}
        </div>

        {/* Les marges négatives compensent le padding des cartes pour que
            la première et la dernière soient alignées sur le titre. */}
        <div ref={viewport} className="-mx-2.5 mt-8 overflow-hidden">
          <motion.ul
            style={{ x }}
            drag={maxIndex > 0 ? "x" : false}
            dragConstraints={{ left: -maxIndex * step, right: 0 }}
            dragElastic={0.12}
            onDragStart={() => (dragged.current = true)}
            onDragEnd={onDragEnd}
            className="flex cursor-grab touch-pan-y active:cursor-grabbing"
          >
            {items.map((item, i) => (
              <li
                key={item.href}
                className="shrink-0 px-2.5"
                style={{ width: step || `${100 / visible}%` }}
                aria-hidden={i < current || i >= current + visible}
              >
                <Link
                  href={item.href}
                  draggable={false}
                  tabIndex={i < current || i >= current + visible ? -1 : undefined}
                  onClick={(e) => dragged.current && e.preventDefault()}
                  className="group flex h-full select-none flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-accent"
                >
                  <div className="dyn-photo-wrap pointer-events-none relative aspect-[16/10] overflow-hidden">
                    <Visual
                      src={item.image}
                      alt={item.imageAlt ?? item.title}
                      sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
                      className="dyn-photo"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="font-semibold leading-snug">{item.title}</p>
                    <p className="mt-auto flex items-center justify-between gap-3 pt-4 text-sm text-muted">
                      <span>
                        <span className="font-medium text-accent">{item.duration}</span> · {item.format}
                      </span>
                      <span aria-hidden="true" className="text-accent transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </motion.ul>
        </div>

        {maxIndex > 0 && (
          <div className="mt-6 flex justify-center gap-2">
            {Array.from({ length: maxIndex + 1 }, (_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Aller au groupe ${i + 1}`}
                aria-current={i === current}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === current ? "w-6 bg-accent" : "w-2.5 bg-accent/30 hover:bg-accent/60"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
