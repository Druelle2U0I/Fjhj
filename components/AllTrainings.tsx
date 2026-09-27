"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Visual from "@/components/Visual";
import { pages } from "@/lib/data";

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
        : "border-border bg-surface/70 text-muted hover:border-surface-accent hover:text-foreground"
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
          className="w-full rounded-full border border-border bg-surface/70 px-5 py-3 text-sm outline-none backdrop-blur placeholder:text-muted focus:border-surface-accent sm:max-w-md"
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
        <p className="mt-6 rounded-lg border border-border bg-surface/70 p-6 text-muted">
          {emptyText}
        </p>
      ) : (
        <ul className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item) => (
            <li key={item.href} className="group relative">
              <Link
                href={item.href}
                className="dyn-card relative flex aspect-[4/5] w-full flex-col justify-end overflow-hidden rounded-lg"
              >
                <Visual
                  src={item.image}
                  alt={item.imageAlt ?? item.title}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw"
                  className="transition-transform duration-500 ease-out group-hover:scale-[1.15] group-hover:duration-[6000ms]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
                <span className="domain-tag absolute left-4 top-4 rounded-full border border-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
                  {item.sectorTitle}
                </span>
                <div className="relative p-5">
                  <h2 className="text-lg font-semibold leading-snug text-white">{item.title}</h2>
                  <p className="mt-2 line-clamp-2 text-sm text-white/80">{item.intro}</p>
                  <p className="mt-3 text-sm font-medium text-white">
                    {item.duration}
                    <span className="text-white/70"> · {item.format}</span>
                  </p>
                </div>
              </Link>
              <Link
                href={`/contact?formation=${encodeURIComponent(item.title)}`}
                className="absolute bottom-5 right-5 z-10 inline-flex translate-y-2 items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-accent-foreground opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
              >
                {pages.sector.quoteButton}
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
