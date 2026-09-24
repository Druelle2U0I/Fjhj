"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { animate, motion, useMotionValue, useReducedMotion, type PanInfo } from "framer-motion";
import Visual from "@/components/Visual";

export type RelatedItem = {
  href: string;
  title: string;
  intro: string;
  duration: string;
  image?: string;
  imageAlt?: string;
};

// Nombre de cartes visibles selon la largeur d'écran. La partie décimale
// laisse dépasser la carte suivante, pour montrer qu'on peut faire défiler.
function useVisibleCount() {
  return useSyncExternalStore(
    (onChange) => {
      window.addEventListener("resize", onChange);
      return () => window.removeEventListener("resize", onChange);
    },
    () => (window.innerWidth >= 1024 ? 3.3 : window.innerWidth >= 640 ? 2.2 : 1.15),
    () => 3.3,
  );
}

// Carrousel des autres formations du domaine, en bas des fiches formation :
// cartes avec photo, titre, courte description et durée, flèches sur les
// côtés, glisser au doigt ou à la souris, animation amortie.
export default function RelatedCarousel({
  titleStart,
  titleHighlight,
  items,
}: {
  titleStart: string;
  titleHighlight: string;
  items: RelatedItem[];
}) {
  const visible = useVisibleCount();
  const overflow = Math.max(0, items.length - visible);
  const maxIndex = Math.ceil(overflow);
  const [index, setIndex] = useState(0);
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

  const step = width / visible;
  const current = Math.min(index, maxIndex);
  // La dernière position cale la dernière carte sur le bord droit.
  const target = -Math.min(current * step, overflow * step);

  useEffect(() => {
    const controls = animate(
      x,
      target,
      reduce ? { duration: 0 } : { type: "spring", stiffness: 110, damping: 22, mass: 0.9 },
    );
    return () => controls.stop();
  }, [target, x, reduce]);

  const go = useCallback(
    (delta: number) => setIndex((i) => Math.max(0, Math.min(maxIndex, Math.min(i, maxIndex) + delta))),
    [maxIndex],
  );

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = step * 0.2;
    if (info.offset.x < -threshold || info.velocity.x < -400) go(1);
    else if (info.offset.x > threshold || info.velocity.x > 400) go(-1);
    else animate(x, target, { type: "spring", stiffness: 160, damping: 26 });
    setTimeout(() => (dragged.current = false), 0);
  };

  if (items.length === 0) return null;

  const arrow = (disabled: boolean) =>
    `absolute top-[38%] z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 text-xl shadow-lg backdrop-blur transition-all hover:border-accent hover:text-accent ${
      disabled ? "pointer-events-none opacity-0" : "opacity-100"
    }`;

  return (
    <div>
      <h2 className="max-w-3xl text-2xl font-semibold tracking-tight sm:text-3xl">
        {titleStart} <span className="text-accent">{titleHighlight}</span>
      </h2>

      <div className="relative mt-10">
        <div ref={viewport} className="overflow-hidden">
          <motion.ul
            style={{ x }}
            drag={maxIndex > 0 ? "x" : false}
            dragConstraints={{ left: -overflow * step, right: 0 }}
            dragElastic={0.12}
            onDragStart={() => (dragged.current = true)}
            onDragEnd={onDragEnd}
            className="-mx-2.5 flex cursor-grab touch-pan-y active:cursor-grabbing"
          >
            {items.map((item) => (
              <li key={item.href} className="shrink-0 px-2.5" style={{ width: step || `${100 / visible}%` }}>
                <article className="flex h-full select-none flex-col rounded-lg border border-border bg-surface p-4 transition-colors hover:border-accent/60">
                  <div className="pointer-events-none relative aspect-[16/9] overflow-hidden rounded-lg">
                    <Visual
                      src={item.image}
                      alt={item.imageAlt ?? item.title}
                      sizes="(min-width: 1024px) 340px, (min-width: 640px) 45vw, 85vw"
                    />
                  </div>
                  {/* Trait de couleur sous la photo */}
                  <div className="mt-2 h-1.5 rounded-full bg-accent/70" />

                  <h3 className="mt-5 text-lg font-semibold leading-snug text-accent">{item.title}</h3>
                  <p className="mt-3 line-clamp-3 text-sm text-muted">{item.intro}</p>

                  <p className="mt-4 flex items-center gap-2 text-sm text-foreground/90">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth={2}>
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3 2" strokeLinecap="round" />
                    </svg>
                    {item.duration}
                  </p>

                  <div className="mt-auto pt-5">
                    <Link
                      href={item.href}
                      draggable={false}
                      onClick={(e) => dragged.current && e.preventDefault()}
                      className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-accent-foreground transition-transform hover:scale-105"
                    >
                      Voir la formation <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </article>
              </li>
            ))}
          </motion.ul>
        </div>

        {maxIndex > 0 && (
          <>
            <button
              type="button"
              aria-label="Formations précédentes"
              onClick={() => go(-1)}
              className={`${arrow(current === 0)} -left-3 sm:-left-5`}
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Formations suivantes"
              onClick={() => go(1)}
              className={`${arrow(current === maxIndex)} -right-3 sm:-right-5`}
            >
              ›
            </button>
          </>
        )}
      </div>
    </div>
  );
}
