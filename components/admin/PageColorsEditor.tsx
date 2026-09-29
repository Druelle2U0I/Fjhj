"use client";

import { THEME_DEFAULTS, type PageColorOverride, type Theme } from "@/lib/data";
import { OptionalColorField } from "./ui";

// Réglages regroupés par zone de la page, avec des exemples concrets pour
// savoir ce que chaque couleur change.
// Éléments identiques sur tout le site (cartes formation, pastille des
// pages secteurs…) : leurs couleurs se règlent en un seul endroit, dans
// Design & couleurs, et non page par page.
export const COMMON_KEYS: (keyof PageColorOverride)[] = [
  "quotePillBackground",
  "quotePillForeground",
  "badgeBackground",
  "badgeForeground",
  "cardVeil",
];

export const GROUPS: {
  title: string;
  fields: { key: keyof PageColorOverride; label: string }[];
}[] = [
  {
    title: "Haut de page (sur la photo)",
    fields: [
      {
        key: "eyebrowColor",
        label: "Petit texte au-dessus du titre (ex. « CONTACT », « 6 FORMATIONS »)",
      },
      { key: "titleColor", label: "Grand titre" },
      { key: "introColor", label: "Texte sous le titre" },
    ],
  },
  {
    title: "Fond clair de la page (crème)",
    fields: [
      { key: "background", label: "Couleur du fond" },
      { key: "foreground", label: "Titres et textes principaux" },
      { key: "muted", label: "Textes secondaires (paragraphes, légendes)" },
      {
        key: "linkColor",
        label:
          "Liens soulignés (« Voir toutes nos formations », « Le centre »…)",
      },
      { key: "border", label: "Traits de séparation et contours" },
    ],
  },
  {
    title: "Bandes et cartes foncées (bleu)",
    fields: [
      { key: "surface", label: "Couleur des bandes et cartes foncées" },
      { key: "surface2", label: "Encadrés à l'intérieur des cartes foncées" },
      {
        key: "surfaceForeground",
        label: "Titres et textes principaux sur le foncé",
      },
      { key: "surfaceMuted", label: "Textes secondaires sur le foncé" },
      {
        key: "surfaceAccent",
        label:
          "Petits détails colorés sur le foncé (« Étape 1 sur 4 », chiffres…)",
      },
      { key: "cardVeil", label: "Assombrissement des photos de formation" },
    ],
  },
  {
    title: "Boutons et encarts",
    fields: [
      { key: "quotePillBackground", label: "Cartes formation — fond du bouton « Demander un devis » (translucide)" },
      { key: "quotePillForeground", label: "Cartes formation — texte du bouton « Demander un devis »" },
      { key: "badgeBackground", label: "Pages secteurs — fond de la pastille penchée « Sans engagement »" },
      { key: "badgeForeground", label: "Pages secteurs — texte de la pastille penchée « Sans engagement »" },
      {
        key: "heroButtonBackground",
        label: "Accueil — fond du bouton « Découvrir nos formations »",
      },
      {
        key: "heroButtonForeground",
        label: "Accueil — texte du bouton « Découvrir nos formations »",
      },
      {
        key: "accent",
        label: "Fond des boutons principaux (« Demander un devis »…)",
      },
      { key: "accentForeground", label: "Texte des boutons principaux" },
      {
        key: "highlightBackground",
        label: "Fond des boutons et encarts clairs (« Itinéraire »…)",
      },
      {
        key: "highlightForeground",
        label: "Texte des boutons et encarts clairs",
      },
    ],
  },
];

// Couleurs propres à une seule page, par-dessus le thème global du site
// (réglé dans Design). Utilisé sur chaque page qui en a besoin, dans
// PagesEditor.tsx et sur la page d'accueil (AdminApp.tsx).
export default function PageColorsEditor({
  siteTheme,
  value,
  onChange,
  className = "",
  showHeroButton = false,
}: {
  // Réglages du bouton « Découvrir nos formations » : accueil seulement.
  showHeroButton?: boolean;
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
          Ne s&apos;applique qu&apos;ici. Laissez telles quelles pour garder les
          couleurs du site (réglées dans Design).
        </p>
      </div>
      {GROUPS.map((group) => (
        <div
          key={group.title}
          className="grid gap-3 rounded-xl border border-border p-4"
        >
          <p className="text-sm font-semibold">{group.title}</p>
          {group.fields
            .filter(
              ({ key }) =>
                !COMMON_KEYS.includes(key) &&
                (showHeroButton || !key.startsWith("heroButton")),
            )
            .map(({ key, label }) => (
              <OptionalColorField
                key={key}
                label={label}
                value={current[key]}
                fallback={
                  siteTheme[key] ??
                  (THEME_DEFAULTS as unknown as Record<string, string>)[key] ??
                  (key === "eyebrowColor" ||
                  key === "titleColor" ||
                  key === "introColor"
                    ? siteTheme.foreground
                    : "#000000")
                }
                onChange={(next) => set(key, next)}
              />
            ))}
        </div>
      ))}
    </div>
  );
}
