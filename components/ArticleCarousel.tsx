"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion, type PanInfo } from "framer-motion";

export type Article = { title: string; text: string };

// Un seul article affiché à la fois (plus large que haut), avec flèches
// et glisser au doigt ou à la souris, et un repère « 1 sur 3 ».
export default function ArticleCarousel({ articles }: { articles: Article[] }) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  const viewport = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const x = useMotionValue(0);

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
    <div className="min-w-0">
      <div ref={viewport} className="overflow-hidden">
        <motion.div
          style={{ x }}
          drag={maxIndex > 0 ? "x" : false}
          dragConstraints={{ left: -maxIndex * width, right: 0 }}
          dragElastic={0.12}
          onDragEnd={onDragEnd}
          className="flex cursor-grab touch-pan-y active:cursor-grabbing"
        >
          {articles.map((article) => (
            <article
              key={article.title}
              className="shrink-0 select-none rounded-lg border border-border bg-surface-2 p-6 sm:p-10"
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

      {maxIndex > 0 && (
        <div className="mt-6 flex items-center justify-center gap-5">
          <button
            type="button"
            aria-label="Article précédent"
            onClick={() => go(-1)}
            className={arrow(current === 0)}
          >
            ‹
          </button>
          <p className="text-sm text-muted" aria-live="polite">
            {current + 1} sur {articles.length}
          </p>
          <button
            type="button"
            aria-label="Article suivant"
            onClick={() => go(1)}
            className={arrow(current === maxIndex)}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
