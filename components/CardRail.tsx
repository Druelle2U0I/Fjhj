"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import Visual from "@/components/Visual";

export type RailCard = {
  title: string;
  href?: string;
  image?: string;
  imageAlt?: string;
  // Petite ligne sous le titre (ex. « 11 formations »).
  subtitle?: string;
  // Texte affiché en bas : au survol sur une carte photo, toujours sur une
  // carte blanche (sans photo).
  text?: string;
};

// Rangée de grandes cartes portrait : titre de la rangée à gauche avec des
// flèches, cartes à droite qui défilent horizontalement (au doigt, à la
// molette ou avec les flèches). Titre de chaque carte en capitales en haut.
export default function CardRail({
  title,
  cards,
  action,
}: {
  title: string;
  cards: RailCard[];
  // Élément affiché sous le titre (ex. bouton vers le catalogue).
  action?: ReactNode;
}) {
  const rail = useRef<HTMLUListElement>(null);

  const scroll = (direction: number) => {
    const node = rail.current;
    if (!node) return;
    const card = node.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 16 : 260;
    node.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  const arrow =
    "flex h-9 w-9 items-center justify-center rounded-md text-lg text-foreground transition-colors hover:bg-foreground hover:text-background";

  return (
    <div className="grid gap-6 md:grid-cols-[15rem_1fr] md:gap-8">
      <div className="flex flex-wrap items-end justify-between gap-4 md:block">
        <div>
          <h2 className="whitespace-pre-line font-extrabold uppercase leading-[1.1] text-xl sm:text-2xl">
            {title}
          </h2>
          {action && <div className="mt-5">{action}</div>}
        </div>
        <div className="flex gap-1 md:mt-8">
          <button type="button" aria-label="Précédent" onClick={() => scroll(-1)} className={arrow}>
            ←
          </button>
          <button type="button" aria-label="Suivant" onClick={() => scroll(1)} className={`${arrow} bg-foreground/5`}>
            →
          </button>
        </div>
      </div>

      <ul
        ref={rail}
        className="spotlight rail-bleed -mx-6 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-2 md:scroll-px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {cards.map((card) => {
          const photo = Boolean(card.image);
          const body = (
            <>
              {photo && (
                <>
                  <Visual
                    src={card.image}
                    alt={card.imageAlt ?? card.title}
                    sizes="240px"
                    className="transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/5 to-black/50" />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/45" />
                </>
              )}
              <p
                className={`font-heading relative p-4 text-sm uppercase leading-tight sm:text-base ${
                  photo ? "text-white" : "text-[#0b0c31]"
                }`}
              >
                {card.title}
              </p>
              <div className="relative mt-auto p-4">
                {card.text && (
                  <p
                    className={`text-xs leading-relaxed ${
                      photo
                        ? "text-white opacity-100 transition-opacity duration-500 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100"
                        : "text-[#0b0c31]"
                    }`}
                  >
                    {card.text}
                  </p>
                )}
                {card.subtitle && (
                  <p className={`mt-2 text-right text-xs font-semibold ${photo ? "text-white/90" : "text-[#0b0c31]/70"}`}>
                    {card.subtitle}
                  </p>
                )}
              </div>
            </>
          );
          const cls = `spotlight-item group relative flex h-full flex-col overflow-hidden rounded-2xl ${
            photo ? "bg-surface" : "border border-[#0b0c31]/15 bg-white"
          }`;
          return (
            <li key={card.title} className="aspect-[3/5] w-[56vw] max-w-[240px] shrink-0 snap-start sm:w-[240px]">
              {card.href ? (
                <Link href={card.href} className={cls}>
                  {body}
                </Link>
              ) : (
                <div className={cls}>{body}</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
