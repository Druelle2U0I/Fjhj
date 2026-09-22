"use client";

import type { HeadingFont, HomeSection, Theme } from "@/lib/data";
import { Card, ColorField, Field, SmallButton } from "./ui";

const FONTS: { id: HeadingFont; label: string; note: string }[] = [
  { id: "archivo", label: "Archivo", note: "Grotesque nette et affirmée" },
  { id: "grotesk", label: "Space Grotesk", note: "Technique, un peu anguleuse" },
  { id: "manrope", label: "Manrope", note: "Douce et moderne" },
  { id: "fraunces", label: "Fraunces", note: "Serif élégante, plus classique" },
];

const COLORS: { key: keyof Theme; label: string; hint: string }[] = [
  { key: "background", label: "Fond du site", hint: "La couleur dominante." },
  { key: "surface", label: "Fond des cartes", hint: "Légèrement plus clair que le fond." },
  { key: "surface2", label: "Fond secondaire", hint: "Encadrés à l'intérieur des cartes." },
  { key: "foreground", label: "Texte principal", hint: "Doit bien ressortir sur le fond." },
  { key: "muted", label: "Texte secondaire", hint: "Paragraphes et légendes." },
  { key: "border", label: "Bordures", hint: "Contour des cartes et séparateurs." },
  { key: "accent", label: "Couleur d'accent", hint: "Boutons et éléments mis en avant." },
  { key: "accentForeground", label: "Texte sur l'accent", hint: "Texte à l'intérieur des boutons." },
];

const SECTION_LABELS: Record<HomeSection["id"], string> = {
  about: "À propos",
  formations: "Nos formations",
  financement: "Qualiopi & financement",
  contact: "Appel à contact",
  faq: "Questions fréquentes",
};

export default function DesignEditor({
  theme,
  sections,
  onThemeChange,
  onSectionsChange,
}: {
  theme: Theme;
  sections: HomeSection[];
  onThemeChange: (theme: Theme) => void;
  onSectionsChange: (sections: HomeSection[]) => void;
}) {
  const move = (index: number, delta: number) => {
    const target = index + delta;
    if (target < 0 || target >= sections.length) return;
    const next = [...sections];
    [next[index], next[target]] = [next[target], next[index]];
    onSectionsChange(next);
  };

  const update = (index: number, section: HomeSection) =>
    onSectionsChange(sections.map((s, i) => (i === index ? section : s)));

  return (
    <div className="grid gap-5">
      <Card className="grid gap-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-accent">
          Police des titres
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {FONTS.map((font) => (
            <button
              key={font.id}
              type="button"
              onClick={() => onThemeChange({ ...theme, headingFont: font.id })}
              className={`rounded-2xl border px-4 py-3 text-left transition-colors ${
                theme.headingFont === font.id
                  ? "border-accent bg-surface-2"
                  : "border-border hover:border-accent"
              }`}
            >
              <span
                className="block text-lg font-bold"
                style={{ fontFamily: `var(--font-${font.id === "grotesk" ? "grotesk" : font.id})` }}
              >
                {font.label}
              </span>
              <span className="mt-0.5 block text-xs text-muted">{font.note}</span>
            </button>
          ))}
        </div>
      </Card>

      <Card className="grid gap-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">
            Couleurs
          </p>
          <p className="mt-1 text-xs text-muted">
            Les modifications s&apos;appliquent à tout le site. Gardez un bon
            contraste entre le texte et le fond pour rester lisible.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {COLORS.map((color) => (
            <ColorField
              key={color.key}
              label={color.label}
              hint={color.hint}
              value={theme[color.key] as string}
              onChange={(v) => onThemeChange({ ...theme, [color.key]: v })}
            />
          ))}
        </div>

        <div className="rounded-2xl border border-border p-5" style={{ background: theme.background }}>
          <p className="text-xs uppercase tracking-wide" style={{ color: theme.muted }}>
            Aperçu
          </p>
          <p className="mt-2 text-xl font-bold" style={{ color: theme.foreground }}>
            Vos équipes méritent le meilleur
          </p>
          <p className="mt-1 text-sm" style={{ color: theme.muted }}>
            Formations certifiées Qualiopi, financement OPCO pris en charge.
          </p>
          <span
            className="mt-4 inline-flex rounded-full px-5 py-2 text-sm font-semibold"
            style={{ background: theme.accent, color: theme.accentForeground }}
          >
            Demander un devis
          </span>
        </div>
      </Card>

      <div>
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-accent">
          Sections de la page d&apos;accueil
        </p>
        <p className="mb-3 text-xs text-muted">
          Réordonnez, masquez et modifiez les titres. Le haut de page avec le
          carrousel reste toujours en première position.
        </p>

        <div className="grid gap-4">
          {sections.map((section, index) => (
            <Card key={section.id}>
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">
                    {SECTION_LABELS[section.id]}
                  </p>
                  {!section.visible && (
                    <p className="text-xs text-muted">Masquée</p>
                  )}
                </div>
                <div className="flex shrink-0 gap-1.5">
                  <SmallButton
                    title="Monter"
                    onClick={() => move(index, -1)}
                    disabled={index === 0}
                  >
                    ↑
                  </SmallButton>
                  <SmallButton
                    title="Descendre"
                    onClick={() => move(index, 1)}
                    disabled={index === sections.length - 1}
                  >
                    ↓
                  </SmallButton>
                  <SmallButton
                    onClick={() =>
                      update(index, { ...section, visible: !section.visible })
                    }
                  >
                    {section.visible ? "Masquer" : "Afficher"}
                  </SmallButton>
                </div>
              </div>

              <div className="grid gap-4">
                <Field
                  label="Sur-titre"
                  value={section.eyebrow}
                  onChange={(v) => update(index, { ...section, eyebrow: v })}
                />
                <Field
                  label="Titre"
                  rows={2}
                  value={section.title}
                  onChange={(v) => update(index, { ...section, title: v })}
                />
                <Field
                  label="Texte d'introduction"
                  rows={3}
                  value={section.text}
                  onChange={(v) => update(index, { ...section, text: v })}
                />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
