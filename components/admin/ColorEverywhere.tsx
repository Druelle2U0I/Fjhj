"use client";

import { useState } from "react";
import { THEME_DEFAULTS, type PageColorOverride, type SiteContent } from "@/lib/data";
import { COMMON_KEYS, GROUPS } from "./PageColorsEditor";
import { Card } from "./ui";

// Pages qui ont leur propre réglage « Couleurs de cette page ».
const PAGE_KEYS = [
  "catalogue",
  "allTrainings",
  "sector",
  "training",
  "centre",
  "team",
  "contact",
  "funding",
] as const;

type Key = keyof PageColorOverride;

// Change une même couleur sur toutes les pages à la fois (accueil compris),
// au lieu de la régler page par page.
export default function ColorEverywhere({
  content,
  onChange,
}: {
  content: SiteContent;
  onChange: (next: SiteContent) => void;
}) {
  const [open, setOpen] = useState<string | null>(GROUPS[0].title);
  const pageThemes = (): (PageColorOverride | undefined)[] => [
    content.home.theme,
    ...PAGE_KEYS.map((k) => (content.pages[k] as { theme?: PageColorOverride }).theme),
  ];

  const apply = (key: Key, value: string | undefined) => {
    const set = (t?: PageColorOverride): PageColorOverride => {
      const next = { ...(t ?? {}) };
      if (value) next[key] = value;
      else delete next[key];
      return next;
    };
    const pages = { ...content.pages } as Record<string, unknown>;
    for (const k of PAGE_KEYS) {
      const page = content.pages[k] as { theme?: PageColorOverride };
      pages[k] = { ...page, theme: set(page.theme) };
    }
    onChange({
      ...content,
      home: { ...content.home, theme: set(content.home.theme) },
      pages: pages as SiteContent["pages"],
    });
  };

  // Retire toutes les couleurs propres aux pages : tout le site reprend les
  // couleurs de base (celles de l'accueil).
  const resetAll = () => {
    const pages = { ...content.pages } as Record<string, unknown>;
    for (const k of PAGE_KEYS) {
      pages[k] = { ...(content.pages[k] as object), theme: {} };
    }
    onChange({
      ...content,
      home: { ...content.home, theme: {} },
      pages: pages as SiteContent["pages"],
    });
  };

  const fallback = (key: Key) =>
    (content.theme as unknown as Record<string, string | undefined>)[key] ??
    (THEME_DEFAULTS as unknown as Record<string, string>)[key] ??
    (key === "eyebrowColor" || key === "titleColor" || key === "introColor"
      ? content.theme.foreground
      : "#000000");

  return (
    <Card className="grid gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-surface-accent">
          Changer une couleur sur toutes les pages
        </p>
        <p className="mt-1 text-sm text-muted">
          La couleur choisie remplace celle de chaque page (accueil, catalogue, secteurs, fiches
          formation, Le centre, Équipe, Contact, Financement). Vous pouvez ensuite l&apos;ajuster
          page par page si besoin. « Réinitialiser » remet la couleur de base du site : celle
          de l&apos;accueil.
        </p>
        <button
          type="button"
          onClick={() => {
            if (confirm("Mettre toutes les pages aux couleurs de l'accueil ?")) resetAll();
          }}
          className="mt-3 rounded-full bg-highlight px-4 py-2 text-sm font-semibold text-highlight-foreground"
        >
          Tout réinitialiser : toutes les pages aux couleurs de l&apos;accueil
        </button>
      </div>
      {GROUPS.map((group) => (
        <div key={group.title} className="rounded-2xl border border-border">
          <button
            type="button"
            onClick={() => setOpen(open === group.title ? null : group.title)}
            className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold"
          >
            {group.title}
            <span aria-hidden="true">{open === group.title ? "−" : "+"}</span>
          </button>
          {open === group.title && (
            <div className="grid gap-4 border-t border-border p-4">
              {group.fields.filter(({ key }) => !COMMON_KEYS.includes(key)).map(({ key, label }) => {
                const values = pageThemes().map((t) => t?.[key]);
                const set = values.filter(Boolean) as string[];
                const same = set.length === values.length && set.every((v) => v === set[0]);
                const shown = same ? set[0] : set[0] || fallback(key);
                return (
                  <div key={key}>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                        {label}
                      </span>
                      {set.length > 0 && (
                        <button
                          type="button"
                          onClick={() => apply(key, undefined)}
                          className="shrink-0 text-xs font-semibold text-muted underline decoration-dotted underline-offset-2 hover:text-accent"
                        >
                          Réinitialiser partout
                        </button>
                      )}
                    </div>
                    <div className="mt-1.5 flex items-center gap-3">
                      <input
                        type="color"
                        value={shown}
                        onChange={(e) => apply(key, e.target.value)}
                        className="h-10 w-12 shrink-0 cursor-pointer rounded-lg border border-border bg-surface-2"
                      />
                      <input
                        value={shown}
                        onChange={(e) => apply(key, e.target.value)}
                        className="w-full rounded-xl border border-border bg-surface-2 px-3 py-2 font-mono text-sm outline-none focus:border-surface-accent"
                      />
                    </div>
                    <p className="mt-1 text-xs text-muted">
                      {same
                        ? "Identique sur toutes les pages."
                        : set.length === 0
                          ? "Identique sur toutes les pages (couleur de l'accueil)."
                          : `Réglée sur ${set.length} page${set.length > 1 ? "s" : ""} sur ${values.length}, pas toutes identiques.`}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </Card>
  );
}
