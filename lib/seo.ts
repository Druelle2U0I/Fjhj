import type { Metadata } from "next";

const SITE_NAME = "ENMA Formation";
const SUFFIX = ` | ${SITE_NAME}`;
// Au-delà, Google coupe le titre (~60 caractères) ou la description
// (~155 caractères) dans ses résultats.
const TITLE_MAX = 62;
const DESCRIPTION_MAX = 158;
// Image d'aperçu générée par app/opengraph-image.tsx.
const OG_IMAGE = { url: "/opengraph-image", width: 1200, height: 630, alt: SITE_NAME };

// Coupe un texte à la fin d'un mot, sans dépasser `max` caractères.
export function clip(text: string, max = DESCRIPTION_MAX): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,;:·—–-]+$/, "")}…`;
}

// Métadonnées d'une page : titre (avec « | ENMA Formation » s'il tient),
// description, adresse canonique et aperçu de partage (réseaux sociaux,
// messageries) propres à la page.
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const full = title.length + SUFFIX.length <= TITLE_MAX ? `${title}${SUFFIX}` : title;
  const desc = clip(description);
  return {
    title: { absolute: full },
    description: desc,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      siteName: SITE_NAME,
      url: path,
      title: full,
      description: desc,
      // Redonné ici : définir openGraph sur une page remplace celui du site.
      images: [OG_IMAGE],
    },
    twitter: { card: "summary_large_image", title: full, description: desc, images: [OG_IMAGE.url] },
  };
}
