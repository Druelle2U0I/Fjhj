"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion, type PanInfo } from "framer-motion";

export type Article = { title: string; text: string };

// Un seul article affiché à la fois (plus large que haut). À gauche : le
// titre, le repère « 1 sur 3 » et les flèches juste dessous ; on peut
// aussi glisser au doigt ou à la souris.
export default function ArticleCarousel({ title, articles }: { title: string; articles: Article[] }) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  const viewport = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const x = useMotionValue(0);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const [height, setHeight] = useState<number>();

  useLayoutEffect(() => {
    const node = viewport.current;
    if (!node) return;
    const observer = new ResizeObserver(() => setWidth(node.clientWidth));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const maxIndex = articles.length - 1;
  const current = Math.min(index, maxIndex);
  const target = -current * width;

  // La carte ne garde que la hauteur de l'article affiché (pas celle du
  // plus long de la liste), pour éviter un grand vide sous un texte court.
  useLayoutEffect(() => {
    const node = itemRefs.current[current];
    if (node) setHeight(node.offsetHeight);
  }, [current, width]);

  useEffect(() => {
    const controls = animate(
      x,
      target,
      reduce ? { duration: 0 } : { type: "spring", stiffness: 160, damping: 26 },
    );
    return () => controls.stop();
  }, [target, x, reduce]);

  const go = (delta: number) =>
    setIndex((i) => Math.max(0, Math.min(maxIndex, i + delta)));

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = width * 0.2;
    if (info.offset.x < -threshold || info.velocity.x < -400) go(1);
    else if (info.offset.x > threshold || info.velocity.x > 400) go(-1);
    else animate(x, target, { type: "spring", stiffness: 160, damping: 26 });
  };

  if (articles.length === 0) return null;

  const arrow = (disabled: boolean) =>
    `flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-xl transition-colors ${
      disabled
        ? "pointer-events-none opacity-30"
        : "hover:border-surface-accent hover:text-surface-accent"
    }`;

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-16">
      <div className="lg:self-start">
        <h2 className="font-heading text-2xl leading-tight sm:text-3xl">{title}</h2>
        {maxIndex > 0 && (
          <>
            <p className="mt-4 text-sm text-muted" aria-live="polite">
              {current + 1} sur {articles.length}
            </p>
            <div className="mt-3 flex items-center gap-3">
              <button
                type="button"
                aria-label="Article précédent"
                onClick={() => go(-1)}
                className={arrow(current === 0)}
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Article suivant"
                onClick={() => go(1)}
                className={arrow(current === maxIndex)}
              >
                ›
              </button>
            </div>
          </>
        )}
      </div>

      <div
        ref={viewport}
        className="min-w-0 overflow-hidden transition-[height] duration-300 ease-out"
        style={{ height }}
      >
        <motion.div
          style={{ x }}
          drag={maxIndex > 0 ? "x" : false}
          dragConstraints={{ left: -maxIndex * width, right: 0 }}
          dragElastic={0.12}
          onDragEnd={onDragEnd}
          className="flex items-start cursor-grab touch-pan-y active:cursor-grabbing"
        >
          {articles.map((article, i) => (
            <article
              key={article.title}
              ref={(node) => {
                itemRefs.current[i] = node;
              }}
              className="shrink-0 select-none rounded-lg border border-border bg-surface-2 p-6 sm:p-8"
              style={{ width: width || "100%" }}
            >
              <h3 className="text-lg font-semibold leading-snug sm:text-xl">
                {article.title}
              </h3>
              <p className="mt-4 whitespace-pre-line text-sm text-muted sm:text-base">
                {article.text}
              </p>
            </article>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
