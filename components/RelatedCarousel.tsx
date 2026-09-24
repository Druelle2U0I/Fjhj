"use client";

import { useRef } from "react";
import Link from "next/link";
import Visual from "@/components/Visual";

export type RelatedItem = {
  href: string;
  title: string;
  duration: string;
  format: string;
  image?: string;
  imageAlt?: string;
};

// Carrousel pleine largeur des autres formations du même domaine, en bas
// des fiches formation. Défilement au doigt, à la molette ou aux flèches.
export default function RelatedCarousel({
  title,
  items,
}: {
  title: string;
  items: RelatedItem[];
}) {
  const track = useRef<HTMLUListElement>(null);

  const scroll = (direction: 1 | -1) => {
    const node = track.current;
    if (!node) return;
    node.scrollBy({ left: direction * node.clientWidth * 0.8, behavior: "smooth" });
  };

  const arrow =
    "flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface/80 text-lg backdrop-blur transition-colors hover:border-accent hover:text-accent";

  return (
    <section className="pb-24">
      <div className="mx-auto flex max-w-6xl items-end justify-between gap-4 px-6">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{title}</h2>
        {items.length > 1 && (
          <div className="flex shrink-0 gap-2">
            <button type="button" aria-label="Formations précédentes" onClick={() => scroll(-1)} className={arrow}>
              ‹
            </button>
            <button type="button" aria-label="Formations suivantes" onClick={() => scroll(1)} className={arrow}>
              ›
            </button>
          </div>
        )}
      </div>

      {/* La piste occupe toute la largeur de l'écran ; la première carte
          reste alignée sur le contenu de la page. */}
      <ul
        ref={track}
        className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-6 pb-4 [scroll-padding-inline:1.5rem] [scrollbar-width:none] lg:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] lg:[scroll-padding-inline:max(1.5rem,calc((100vw-72rem)/2+1.5rem))] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <li key={item.href} className="w-[78vw] shrink-0 snap-start sm:w-[340px]">
            <Link
              href={item.href}
              className="dyn-card group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface"
            >
              <div className="dyn-photo-wrap relative aspect-[16/10] overflow-hidden">
                <Visual
                  src={item.image}
                  alt={item.imageAlt ?? item.title}
                  sizes="340px"
                  className="dyn-photo"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
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
      </ul>
    </section>
  );
}
