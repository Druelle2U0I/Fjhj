"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Visual from "@/components/Visual";

export type TrainingItem = {
  title: string;
  href: string;
  intro: string;
  duration: string;
  format: string;
  image?: string;
  imageAlt?: string;
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
        ? "border-accent bg-accent text-accent-foreground"
        : "border-border bg-surface/70 text-muted hover:border-accent hover:text-foreground"
    }`;

  return (
    <div>
      <div className="flex flex-col gap-4">
        <label htmlFor="training-search" className="sr-only">
          {searchPlaceholder}
        </label>
        <input
          id="training-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full rounded-full border border-border bg-surface/70 px-5 py-3 text-sm outline-none backdrop-blur placeholder:text-muted focus:border-accent sm:max-w-md"
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

      <p className="mt-6 text-sm text-muted" aria-live="polite">
        {visible.length} formation{visible.length > 1 ? "s" : ""}
      </p>

      {visible.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-border bg-surface/70 p-6 text-muted">
          {emptyText}
        </p>
      ) : (
        <ul className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="dyn-card group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface"
              >
                <div className="dyn-photo-wrap relative aspect-[16/10] overflow-hidden">
                  <Visual
                    src={item.image}
                    alt={item.imageAlt ?? item.title}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw"
                    className="dyn-photo"
                  />
                  <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-background/75 px-3 py-1 text-xs font-semibold text-accent backdrop-blur">
                    {item.sectorTitle}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="text-lg font-semibold leading-snug">{item.title}</h2>
                  <p className="mt-2 line-clamp-3 text-sm text-muted">{item.intro}</p>
                  <p className="mt-auto pt-4 text-sm font-medium text-accent">
                    {item.duration}
                    <span className="text-muted"> · {item.format}</span>
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
