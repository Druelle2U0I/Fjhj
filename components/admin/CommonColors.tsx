"use client";

import { THEME_DEFAULTS, type Theme } from "@/lib/data";
import { COMMON_KEYS, GROUPS } from "./PageColorsEditor";
import { Card, OptionalColorField } from "./ui";

// Couleurs des éléments identiques sur tout le site : un seul réglage,
// valable sur toutes les pages.
export default function CommonColors({
  theme,
  onChange,
}: {
  theme: Theme;
  onChange: (theme: Theme) => void;
}) {
  const fields = GROUPS.flatMap((g) => g.fields).filter(({ key }) => COMMON_KEYS.includes(key));
  const fallbacks: Record<string, string> = {
    quotePillBackground: "#ffffff",
    quotePillForeground: "#ffffff",
    badgeBackground: theme.accent,
    badgeForeground: theme.accentForeground,
    cardVeil: (THEME_DEFAULTS as unknown as Record<string, string>).cardVeil ?? "#000000",
  };
  return (
    <Card className="grid gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-surface-accent">
          Éléments communs à tout le site
        </p>
        <p className="mt-1 text-sm text-muted">
          Un seul réglage, appliqué à toutes les pages : cartes formation et pastille des pages
          secteurs.
        </p>
      </div>
      {fields.map(({ key, label }) => (
        <OptionalColorField
          key={key}
          label={label}
          value={(theme as unknown as Record<string, string | undefined>)[key]}
          fallback={fallbacks[key] ?? "#000000"}
          onChange={(v) => {
            const next = { ...theme, [key]: v } as Theme;
            if (!v) delete (next as unknown as Record<string, unknown>)[key];
            onChange(next);
          }}
        />
      ))}
    </Card>
  );
}
