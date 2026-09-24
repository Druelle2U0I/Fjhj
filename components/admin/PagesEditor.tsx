"use client";

import type { Pages } from "@/lib/data";
import { Card, Field } from "./ui";

type PageKey = keyof Pages;

type FieldSpec = { key: string; label: string; rows?: number; hint?: string };

const COUNTS_HINT =
  "{formations} et {domaines} sont remplacés automatiquement par les chiffres du catalogue.";
const SEO_HINT =
  "Texte affiché par Google sous le titre de la page. Idéalement 150 caractères environ.";

// Chaque bloc correspond à une page (ou à un modèle de page) du site.
const PAGES: { key: PageKey; title: string; hint?: string; fields: FieldSpec[] }[] = [
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
    fields: [
      { key: "eyebrow", label: "Sur-titre" },
      { key: "title", label: "Titre", hint: COUNTS_HINT },
      { key: "text", label: "Texte d'introduction", rows: 3, hint: COUNTS_HINT },
      { key: "seoDescription", label: "Description pour Google", rows: 2, hint: SEO_HINT },
    ],
  },
  {
    key: "allTrainings",
    title: "Toutes les formations",
    hint: "Page accessible depuis le catalogue, qui liste toutes les formations avec leur domaine.",
    fields: [
      { key: "eyebrow", label: "Sur-titre" },
      { key: "title", label: "Titre", hint: COUNTS_HINT },
      { key: "text", label: "Texte d'introduction", rows: 2, hint: COUNTS_HINT },
      { key: "linkLabel", label: "Bouton sur la page Catalogue" },
      { key: "allFilter", label: "Filtre « tous les domaines »" },
      { key: "searchPlaceholder", label: "Texte du champ de recherche" },
      { key: "emptyText", label: "Message si aucun résultat", rows: 2 },
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
    fields: [
      { key: "eyebrow", label: "Sur-titre" },
      { key: "title", label: "Titre de la page", rows: 2 },
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
      { key: "whyEyebrow", label: "Engagements — sur-titre" },
      {
        key: "whyTitle",
        label: "Engagements — titre",
        hint: "Les cartes (titre et texte de chaque engagement) se modifient plus bas sur cette page (« Nos atouts »). Pensez à accorder le nombre du titre avec le nombre de cartes.",
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
    fields: [
      { key: "eyebrow", label: "Sur-titre" },
      { key: "title", label: "Titre" },
      {
        key: "text",
        label: "Texte de présentation de l'équipe",
        rows: 6,
        hint: "Affiché sous le titre. Laissez une ligne vide entre deux paragraphes.",
      },
      { key: "seoDescription", label: "Description pour Google", rows: 2, hint: SEO_HINT },
    ],
  },
  {
    key: "contact",
    title: "Contact",
    hint: "Aussi utilisé en bas de la page d'accueil si la section Contact y est affichée.",
    fields: [
      { key: "eyebrow", label: "Sur-titre" },
      { key: "title", label: "Titre" },
      { key: "text", label: "Texte d'introduction", rows: 3 },
      { key: "submitButton", label: "Bouton d'envoi du formulaire" },
      { key: "successMessage", label: "Message après envoi" },
      { key: "seoDescription", label: "Description pour Google", rows: 2, hint: SEO_HINT },
    ],
  },
  {
    key: "funding",
    title: "Qualiopi & financement",
    hint: "L'introduction et les blocs se modifient juste en dessous.",
    fields: [
      { key: "eyebrow", label: "Sur-titre" },
      { key: "title", label: "Titre" },
      { key: "seoDescription", label: "Description pour Google", rows: 2, hint: SEO_HINT },
    ],
  },
];

export default function PagesEditor({
  pages,
  onChange,
  only,
}: {
  pages: Pages;
  onChange: (pages: Pages) => void;
  only?: PageKey[];
}) {
  return (
    <>
      {PAGES.filter((page) => !only || only.includes(page.key)).map((page) => {
        const values = (pages[page.key] ?? {}) as Record<string, string>;
        return (
          <Card key={page.key} className="grid gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                {page.title}
              </p>
              {page.hint && <p className="mt-1 text-xs text-muted">{page.hint}</p>}
            </div>
            {page.fields.map((field) => (
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
            ))}
          </Card>
        );
      })}
    </>
  );
}
