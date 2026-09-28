"use client";

import { THEME_DEFAULTS, type PageColorOverride, type Theme } from "@/lib/data";
import { OptionalColorField } from "./ui";

const FIELDS: { key: keyof PageColorOverride; label: string }[] = [
  { key: "background", label: "Fond de la page" },
  { key: "surface", label: "Fond des cartes" },
  { key: "surface2", label: "Fond secondaire (encadrés dans les cartes)" },
  { key: "foreground", label: "Texte principal — sur fond clair" },
  { key: "muted", label: "Texte secondaire — sur fond clair" },
  { key: "surfaceForeground", label: "Texte principal — sur fond sombre (photos, fondus, cartes)" },
  { key: "surfaceMuted", label: "Texte secondaire — sur fond sombre (photos, fondus, cartes)" },
  { key: "border", label: "Bordures" },
  { key: "accent", label: "Couleur d'accent (boutons, liens)" },
  { key: "accentForeground", label: "Texte sur l'accent" },
  { key: "linkColor", label: "Liens soulignés (« Voir toutes nos formations », « Le centre »…)" },
  { key: "surfaceAccent", label: "Détails sur fond sombre (photos, cartes)" },
  { key: "cardVeil", label: "Fondu sur les photos de formation" },
  { key: "highlightBackground", label: "Fond des encarts mis en avant" },
  { key: "highlightForeground", label: "Texte des encarts mis en avant" },
];

// Couleurs propres à une seule page, par-dessus le thème global du site
// (réglé dans Design). Utilisé sur chaque page qui en a besoin, dans
// PagesEditor.tsx et sur la page d'accueil (AdminApp.tsx).
export default function PageColorsEditor({
  siteTheme,
  value,
  onChange,
  className = "",
}: {
  siteTheme: Theme;
  value?: PageColorOverride;
  onChange: (value: PageColorOverride | undefined) => void;
  className?: string;
}) {
  const current = value ?? {};

  const set = (key: keyof PageColorOverride, next?: string) => {
    const updated: PageColorOverride = { ...current, [key]: next };
    if (!next) delete updated[key];
    onChange(Object.keys(updated).length > 0 ? updated : undefined);
  };

  return (
    <div className={`grid gap-4 ${className}`}>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-surface-accent">
          Couleurs de cette page
        </p>
        <p className="mt-1 text-xs text-muted">
          Ne s&apos;applique qu&apos;ici. Laissez telles quelles pour garder les couleurs du site
          (réglées dans Design).
        </p>
      </div>
      {FIELDS.map(({ key, label }) => (
        <OptionalColorField
          key={key}
          label={label}
          value={current[key]}
          fallback={siteTheme[key] ?? (THEME_DEFAULTS as unknown as Record<string, string>)[key] ?? "#000000"}
          onChange={(next) => set(key, next)}
        />
      ))}
    </div>
  );
}
