"use client";

import { useMemo, useState } from "react";
import TrainingCard from "@/components/TrainingCard";
import { pages } from "@/lib/data";

export type TrainingItem = {
  title: string;
  href: string;
  intro: string;
  duration: string;
  format: string;
  image?: string;
  imageAlt?: string;
  imagePosition?: string;
  sectorTitle: string;
  sectorSlug: string;
};

// Recherche sans tenir compte des accents ni des majuscules.
function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

export default function AllTrainings({
  items,
  sectors,
  allLabel,
  searchPlaceholder,
  emptyText,
}: {
  items: TrainingItem[];
  sectors: { slug: string; title: string }[];
  allLabel: string;
  searchPlaceholder: string;
  emptyText: string;
}) {
  const [sector, setSector] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = normalize(query.trim());
    return items.filter(
      (item) =>
        (!sector || item.sectorSlug === sector) &&
        (!q || normalize(`${item.title} ${item.intro} ${item.sectorTitle}`).includes(q)),
    );
  }, [items, sector, query]);

  const chip = (active: boolean) =>
    `shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
      active
        ? "border-highlight bg-highlight text-highlight-foreground"
        : "border-white/30 bg-transparent text-foreground hover:border-white"
    }`;

  return (
    <div>
      {/* Recherche et filtres : bande foncée pleine largeur, dans la
          continuité du bas de la photo d'en-tête. */}
      <div className="on-surface relative pb-8 pt-4 before:absolute before:inset-y-0 before:-left-[100vw] before:-right-[100vw] before:bg-surface sm:pb-10">
      <div className="relative flex flex-col gap-4">
        <label htmlFor="training-search" className="sr-only">
          {searchPlaceholder}
        </label>
        <input
          id="training-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full rounded-sm border border-white/25 bg-white/10 px-5 py-3 text-sm text-foreground outline-none placeholder:text-muted focus:border-white sm:max-w-md"
        />
        <div
          className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
          role="group"
          aria-label="Filtrer par domaine"
        >
          <button
            type="button"
            aria-pressed={sector === null}
            onClick={() => setSector(null)}
            className={chip(sector === null)}
          >
            {allLabel} ({items.length})
          </button>
          {sectors.map((s) => {
            const count = items.filter((i) => i.sectorSlug === s.slug).length;
            return (
              <button
                key={s.slug}
                type="button"
                aria-pressed={sector === s.slug}
                onClick={() => setSector(sector === s.slug ? null : s.slug)}
                className={chip(sector === s.slug)}
              >
                {s.title} ({count})
              </button>
            );
          })}
        </div>
      </div>

      <p className="relative mt-6 text-sm text-muted" aria-live="polite">
        {visible.length} formation{visible.length > 1 ? "s" : ""}
      </p>
      </div>

      {visible.length === 0 ? (
        <p className="mt-6 rounded-lg border border-border bg-surface/70 p-6 text-muted">
          {emptyText}
        </p>
      ) : (
        <ul className="spotlight mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item) => (
            <li key={item.href}>
              <TrainingCard
                href={item.href}
                title={item.title}
                intro={item.intro}
                duration={item.duration}
                tag={item.sectorTitle}
                image={item.image}
                imageAlt={item.imageAlt}
                imagePosition={item.imagePosition}
                quoteHref={`/contact?formation=${encodeURIComponent(item.title)}`}
                quoteLabel={pages.sector.quoteButton}
                sizes="(min-width: 1024px) 75vw, (min-width: 640px) 110vw, 200vw"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
