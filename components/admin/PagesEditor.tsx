"use client";

import type { PageColorOverride, Pages, Theme } from "@/lib/data";
import PageColorsEditor from "./PageColorsEditor";
import { Card, Field, ImageField } from "./ui";

type PageKey = keyof Pages;

type FieldSpec = {
  key: string;
  label: string;
  rows?: number;
  hint?: string;
  type?: "image";
};

const HERO_IMAGE_HINT =
  "Grande photo affichée en fond du haut de page, sous le menu. Laissez vide pour garder le fond uni.";

const COUNTS_HINT =
  "{formations} et {domaines} sont remplacés automatiquement par les chiffres du catalogue.";
const SEO_HINT =
  "Texte affiché par Google sous le titre de la page. Idéalement 150 caractères environ.";

// Chaque bloc correspond à une page (ou à un modèle de page) du site.
// `colors: true` ajoute un réglage de couleurs propre à cette page (sur
// les pages qui correspondent à une seule adresse du site — pas les
// modèles partagés par plusieurs pages comme « sector » ou « training »).
const PAGES: { key: PageKey; title: string; hint?: string; fields: FieldSpec[]; colors?: boolean }[] = [
  {
    key: "hero",
    title: "Accueil — haut de page",
    hint: "Le slogan et la description se modifient dans « Coordonnées » (Tout le site).",
    fields: [
      { key: "badge", label: "Pastille au-dessus du titre" },
      { key: "primaryButton", label: "Bouton principal" },
      { key: "secondaryButton", label: "Bouton secondaire" },
    ],
  },
  {
    key: "catalogue",
    title: "Catalogue (Nos formations)",
    colors: true,
    fields: [
      { key: "eyebrow", label: "Sur-titre" },
      { key: "title", label: "Titre", hint: COUNTS_HINT },
      { key: "text", label: "Texte d'introduction", rows: 3, hint: COUNTS_HINT },
      { key: "heroImage", label: "Photo de fond du haut de page", type: "image", hint: HERO_IMAGE_HINT },
      { key: "seoDescription", label: "Description pour Google", rows: 2, hint: SEO_HINT },
    ],
  },
  {
    key: "allTrainings",
    title: "Toutes les formations",
    hint: "Page accessible depuis le catalogue, qui liste toutes les formations avec leur domaine.",
    colors: true,
    fields: [
      { key: "eyebrow", label: "Sur-titre" },
      { key: "title", label: "Titre", hint: COUNTS_HINT },
      { key: "text", label: "Texte d'introduction", rows: 2, hint: COUNTS_HINT },
      { key: "linkLabel", label: "Bouton sur la page Catalogue" },
      { key: "allFilter", label: "Filtre « tous les domaines »" },
      { key: "searchPlaceholder", label: "Texte du champ de recherche" },
      { key: "emptyText", label: "Message si aucun résultat", rows: 2 },
      { key: "heroImage", label: "Photo de fond du haut de page", type: "image", hint: HERO_IMAGE_HINT },
      { key: "seoDescription", label: "Description pour Google", rows: 2, hint: SEO_HINT },
    ],
  },
  {
    key: "sector",
    title: "Pages des domaines de formation",
    hint: "Ces textes sont communs à toutes les pages de domaine. Le titre, la description et le « pourquoi » de chaque domaine se modifient plus bas sur cette page, dans la liste des secteurs.",
    fields: [
      { key: "quoteMainButton", label: "Bouton « Demander un devis »" },
      { key: "catalogueButton", label: "Bouton « Voir le catalogue »" },
      { key: "whyEyebrow", label: "Sur-titre du bloc « Pourquoi »" },
      { key: "listTitle", label: "Titre de la liste des formations" },
      { key: "quoteButton", label: "Lien en bas de chaque carte formation" },
      { key: "customTitle", label: "Encadré final — titre" },
      { key: "customText", label: "Encadré final — texte", rows: 2 },
    ],
  },
  {
    key: "training",
    title: "Fiches formation",
    hint: "Titres communs à toutes les fiches. Le contenu de chaque formation se modifie plus bas sur cette page, dans la liste des secteurs.",
    fields: [
      { key: "programmeTitle", label: "Titre du programme" },
      { key: "audienceTitle", label: "Titre « Public concerné »" },
      { key: "fundingTitle", label: "Titre « Financement »" },
      { key: "methodsTitle", label: "Titre « Méthodes pédagogiques »" },
      { key: "evaluationTitle", label: "Titre « Modalités d'évaluation »" },
      { key: "accessibilityTitle", label: "Titre « Accessibilité »" },
      { key: "price", label: "Tarif affiché" },
      { key: "quoteButton", label: "Bouton de devis" },
      { key: "questionText", label: "Phrase au-dessus du téléphone" },
    ],
  },
  {
    key: "centre",
    title: "Le centre",
    colors: true,
    fields: [
      { key: "eyebrow", label: "Sur-titre" },
      { key: "heroImage", label: "Photo de fond du haut de page", type: "image", hint: HERO_IMAGE_HINT },
      { key: "title", label: "Titre de la page", rows: 2 },
      { key: "text", label: "Texte sous le titre", rows: 2 },
      { key: "mapEyebrow", label: "Carte — sur-titre" },
      { key: "mapText", label: "Carte — texte", rows: 2 },
      { key: "approachEyebrow", label: "Notre approche — sur-titre" },
      { key: "approachTitle", label: "Notre approche — titre" },
      {
        key: "approachText",
        label: "Notre approche — texte",
        rows: 6,
        hint: "Affiché après le texte « À propos » de l'entreprise. Laissez une ligne vide entre deux paragraphes.",
      },
      { key: "accessEyebrow", label: "Accès — sur-titre" },
      { key: "accessTitle", label: "Accès — titre" },
      {
        key: "accessText",
        label: "Accès — informations pratiques",
        rows: 5,
        hint: "Stationnement, accessibilité aux personnes à mobilité réduite, horaires d'accueil… L'adresse, le bouton Itinéraire et le téléphone s'affichent automatiquement. Laissez une ligne vide entre deux paragraphes.",
      },
      { key: "domainsEyebrow", label: "Domaines — sur-titre" },
      { key: "domainsTitle", label: "Domaines — titre", hint: COUNTS_HINT },
      { key: "ctaTitle", label: "Appel final — titre" },
      { key: "ctaText", label: "Appel final — texte", rows: 2 },
      { key: "ctaButton", label: "Appel final — bouton" },
      { key: "seoDescription", label: "Description pour Google", rows: 2, hint: SEO_HINT },
    ],
  },
  {
    key: "team",
    title: "Notre équipe",
    hint: "Les photos et présentations des membres sont juste en dessous.",
    colors: true,
    fields: [
      { key: "eyebrow", label: "Sur-titre" },
      { key: "title", label: "Titre" },
      {
        key: "text",
        label: "Texte de présentation de l'équipe",
        rows: 6,
        hint: "Affiché sous le titre. Laissez une ligne vide entre deux paragraphes.",
      },
      { key: "heroImage", label: "Photo de fond du haut de page", type: "image", hint: HERO_IMAGE_HINT },
      { key: "seoDescription", label: "Description pour Google", rows: 2, hint: SEO_HINT },
    ],
  },
  {
    key: "contact",
    title: "Contact",
    hint: "Aussi utilisé en bas de la page d'accueil si la section Contact y est affichée.",
    colors: true,
    fields: [
      { key: "eyebrow", label: "Sur-titre" },
      { key: "title", label: "Titre" },
      { key: "text", label: "Texte d'introduction", rows: 3 },
      { key: "submitButton", label: "Bouton d'envoi du formulaire" },
      { key: "successMessage", label: "Message après envoi" },
      { key: "heroImage", label: "Photo de fond du haut de page", type: "image", hint: HERO_IMAGE_HINT },
      { key: "seoDescription", label: "Description pour Google", rows: 2, hint: SEO_HINT },
    ],
  },
  {
    key: "funding",
    title: "Qualiopi & financement",
    hint: "L'introduction et les blocs se modifient juste en dessous.",
    colors: true,
    fields: [
      { key: "eyebrow", label: "Sur-titre" },
      { key: "title", label: "Titre" },
      { key: "heroImage", label: "Photo de fond du haut de page", type: "image", hint: HERO_IMAGE_HINT },
      { key: "seoDescription", label: "Description pour Google", rows: 2, hint: SEO_HINT },
    ],
  },
];

export default function PagesEditor({
  pages,
  onChange,
  only,
  theme,
}: {
  pages: Pages;
  onChange: (pages: Pages) => void;
  only?: PageKey[];
  // Nécessaire seulement pour les pages avec `colors: true` (aperçu des
  // couleurs du site tant qu'aucune couleur propre à la page n'est réglée).
  theme?: Theme;
}) {
  return (
    <>
      {PAGES.filter((page) => !only || only.includes(page.key)).map((page) => {
        const raw = pages[page.key] ?? {};
        const values = raw as Record<string, string>;
        const pageTheme = (raw as { theme?: PageColorOverride }).theme;
        return (
          <Card key={page.key} className="grid gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-surface-accent">
                {page.title}
              </p>
              {page.hint && <p className="mt-1 text-xs text-muted">{page.hint}</p>}
            </div>
            {page.fields.map((field) =>
              field.type === "image" ? (
                <ImageField
                  key={field.key}
                  label={field.label}
                  value={values[field.key] || undefined}
                  onChange={(v) =>
                    onChange({
                      ...pages,
                      [page.key]: { ...values, [field.key]: v ?? "" },
                    } as Pages)
                  }
                />
              ) : (
                <Field
                  key={field.key}
                  label={field.label}
                  rows={field.rows}
                  hint={field.hint}
                  value={values[field.key] ?? ""}
                  onChange={(v) =>
                    onChange({
                      ...pages,
                      [page.key]: { ...values, [field.key]: v },
                    } as Pages)
                  }
                />
              ),
            )}
            {page.colors && theme && (
              <PageColorsEditor
                className="border-t border-border pt-4"
                siteTheme={theme}
                value={pageTheme}
                onChange={(next) =>
                  onChange({
                    ...pages,
                    [page.key]: { ...raw, theme: next },
                  } as Pages)
                }
              />
            )}
          </Card>
        );
      })}
    </>
  );
}
