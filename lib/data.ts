import site from "@/content/site.json";

export const siteUrl = "https://www.enma-formation.com";

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export type Module = { title: string; text: string };

export type Training = {
  title: string;
  duration: string;
  format: string;
  intro: string;
  prerequisites: string;
  certification: string;
  effectif?: string;
  programme: Module[];
  // Objectifs pédagogiques (« Être capable de … »), repris des déroulés
  // pédagogiques : exigés par Qualiopi (indicateur 1).
  objectives?: string[];
  image?: string;
  imageAlt?: string;
  // Photo en paysage pour le haut de la fiche (sinon : `image`).
  heroImage?: string;
  // Partie de la photo à garder visible dans les cartes (portrait) :
  // utile quand la photo d'origine est au format paysage. Voir
  // components/admin/ui.tsx (ImagePositionField).
  imagePosition?: string;
  description: string[];
  audience: string;
  funding: string;
  // Étiquette courte affichée près du titre (ex. "Basse tension"),
  // utile quand un secteur regroupe plusieurs niveaux/variantes.
  category?: string;
};

export type Sector = {
  title: string;
  description: string;
  // Deux lignes rédigées pour les cartes des domaines de l'accueil.
  summary?: string;
  why: { title: string; text: string };
  opco: boolean;
  image?: string;
  imageAlt?: string;
  imagePosition?: string;
  // Cadrage de la même photo en grand, en haut de la page du domaine.
  heroImagePosition?: string;
  // Photo en paysage pour le haut de la page du domaine (sinon : `image`).
  heroImage?: string;
  trainings: Training[];
  // Contenu optionnel, affiché en complément du catalogue.
  popularPaths?: string[];
  unlistedNote?: string;
  tip?: { title: string; text: string };
};

export type HeroSlide = {
  image: string;
  alt?: string;
  title?: string;
  text?: string;
  link?: string;
};

export type HomeSectionId = "about" | "formations" | "financement" | "contact" | "faq";

export type HomeSection = {
  id: HomeSectionId;
  visible: boolean;
  eyebrow: string;
  title: string;
  text: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export const HEADING_FONTS = {
  "archivo-expanded": "var(--font-archivo)",
  figtree: "var(--font-figtree)",
  dejavu: "var(--font-dejavu)",
  archivo: "var(--font-archivo)",
  grotesk: "var(--font-grotesk)",
  manrope: "var(--font-manrope)",
  fraunces: "var(--font-fraunces)",
} as const;

export type HeadingFont = keyof typeof HEADING_FONTS;

export type Theme = {
  background: string;
  surface: string;
  surface2: string;
  foreground: string;
  muted: string;
  border: string;
  accent: string;
  accentForeground: string;
  headingFont: HeadingFont;
  // Réglages visuels complémentaires (facultatifs : valeurs par défaut
  // dans themeStyle).
  tagBackground?: string;
  tagText?: string;
  sectorVeil?: number;
  footerVeil?: number;
  panelShadowColor?: string;
  bandColor?: string;
  bandOpacity?: number;
  // Couleurs de texte utilisées sur les cartes/surfaces (fond "surface"),
  // indépendantes du texte principal de la page : la surface reste sombre
  // même quand le fond du site est clair, son texte doit donc rester clair.
  surfaceForeground?: string;
  surfaceMuted?: string;
  // Couleur des petits éléments d'accent (coches, chiffres clés, badges…)
  // posés sur une carte ou une photo voilée, toujours sombre : indépendante
  // de la couleur d'accent principale, qui peut elle-même devenir sombre.
  surfaceAccent?: string;
  // Fond/texte des grands encarts mis en avant (financement, Qualiopi,
  // "formation absente de la liste"…), indépendants des boutons et liens
  // qui utilisent la couleur d'accent.
  highlightBackground?: string;
  highlightForeground?: string;
  // Fondu sombre posé sur les photos de formation (cartes plein cadre),
  // pour que le texte reste lisible. Noir par défaut, indépendant des
  // autres couleurs du site.
  cardVeil?: string;
  // Liens soulignés en petites capitales (« Voir toutes nos formations »,
  // « Le centre », « Une autre question ? »…).
  linkColor?: string;
  // Bouton « Demander un devis » translucide des cartes formation.
  quotePillBackground?: string;
  quotePillForeground?: string;
  // Pastille penchée (« Sans engagement ») de l'encadré final des pages secteurs.
  badgeBackground?: string;
  badgeForeground?: string;
  // Couleurs du haut de page (sur-titre, titre, texte d'introduction),
  // réglables page par page.
  // Bouton principal du haut de l'accueil (« Découvrir nos formations »).
  heroButtonBackground?: string;
  heroButtonForeground?: string;
  eyebrowColor?: string;
  titleColor?: string;
  introColor?: string;
};

// Couleurs qu'une page peut personnaliser indépendamment du thème
// global (réglé dans Design) : de quoi lui donner sa propre identité
// sans revoir tout le site à chaque fois.
export type PageColorOverride = Partial<
  Pick<
    Theme,
    | "background"
    | "surface"
    | "surface2"
    | "foreground"
    | "muted"
    | "surfaceForeground"
    | "surfaceMuted"
    | "border"
    | "accent"
    | "accentForeground"
    | "surfaceAccent"
    | "highlightBackground"
    | "highlightForeground"
    | "cardVeil"
    | "linkColor"
    | "quotePillBackground"
    | "quotePillForeground"
    | "badgeBackground"
    | "badgeForeground"
    | "heroButtonBackground"
    | "heroButtonForeground"
    | "eyebrowColor"
    | "titleColor"
    | "introColor"
  >
>;

export const THEME_DEFAULTS = {
  tagBackground: "#0b032b",
  tagText: "#fff9c7",
  sectorVeil: 60,
  footerVeil: 68,
  panelShadowColor: "#0b032b",
  bandColor: "#2a2266",
  bandOpacity: 85,
  surfaceForeground: "#fffcec",
  surfaceMuted: "#b3b3ba",
  surfaceAccent: "#fff9c7",
  highlightBackground: "#fff9c7",
  highlightForeground: "#0b032b",
  cardVeil: "#000000",
  linkColor: "#0b0c31",
} as const;

export type SiteContent = {
  company: {
    name: string;
    tagline: string;
    description: string;
    about: string;
    email: string;
    phone: string;
    address: string;
    serviceArea: string;
  };
  legal: {
    activityDeclaration: string;
    qualiopiCertificate: string;
    legalName?: string;
    legalForm?: string;
    capital?: string;
    siren?: string;
    siret?: string;
    rcs?: string;
    vat?: string;
    publicationDirector?: string;
    activityRegion?: string;
    qualiopiCategory?: string;
    cancellationNotice?: string;
    paymentTerms?: string;
    cancellationFee?: string;
    court?: string;
    accessDelay?: string;
    // Version courte, pour l'encart récapitulatif des fiches formation.
    accessDelayShort?: string;
    resultsIndicators?: string;
    qualiopiLogo?: string;
    qualiopiCertificateUrl?: string;
    // Règlement intérieur en PDF (téléchargeable depuis sa page).
    rulesDocument?: string;
    // Adresse du siège social (si différente de celle du centre de formation).
    headOffice?: string;
    // Photo d'en-tête des pages légales (mentions, CGV, confidentialité, accessibilité).
    heroImage?: string;
    heroImageAlt?: string;
  };
  social?: Social;
  trainingInfo?: { methods: string; evaluation: string };
  pages: Pages;
  stats: Stat[];
  recommendation?: RecommendationSource;
  pillars: { title: string; text: string }[];
  sectors: Sector[];
  topTrainings: { title: string; duration: string; format: string }[];
  funding: {
    intro: string;
    // Liens vers les principaux OPCO des clients (page Financement).
    opcosTitle?: string;
    opcosText?: string;
    opcos?: { name: string; sectors: string; url: string }[];
    points: { title: string; text: string }[];
    stepsTitle?: string;
    stepsText?: string;
    steps?: { title: string; text: string }[];
  };
  accessibility: {
    text: string;
    referent: string;
    // Accès PMR : paragraphes d'explication puis aménagements possibles.
    pmrIntro?: string[];
    pmrMeasures?: { title: string; text: string }[];
    pmrDocument?: string;
  };
  team: {
    name: string;
    role: string;
    email: string;
    bio: string;
    photo?: string;
    photoAlt?: string;
  }[];
  home: {
    heroSlides: HeroSlide[];
    heroBackgroundImage?: string;
    heroBackgroundImageAlt?: string;
    heroVideo?: string;
    // Bande défilante de photos sous le haut de page (masquée si false).
    showMarquee?: boolean;
    // Photo du bloc Financement de l'accueil (sinon : photo de la page Financement).
    fundingImage?: string;
    // Source affichée sous les chiffres clés (pour le pourcentage de
    // recommandation), précédée d'un astérisque.
    statsNote?: string;
    // Titre de l'onglet du navigateur et des résultats Google.
    seoTitle?: string;
    // Description affichée par Google sous ce titre.
    seoDescription?: string;
    // Contenu de la bande : toutes les formations (par défaut) ou les
    // photos choisies à la main.
    marqueeSource?: "trainings" | "slides";
    // Présentation des domaines : grille (par défaut) ou accordéon.
    sectorsLayout?: "grid" | "accordion";
    theme?: PageColorOverride;
    aboutImage?: string;
    aboutImageAlt?: string;
    statsBandImage?: string;
    statsBandImageAlt?: string;
    sections: HomeSection[];
    faq: FaqItem[];
    founderQuote?: {
      text: string;
      name: string;
      role: string;
      photo?: string;
      photoAlt?: string;
    };
  };
  theme: Theme;
  footerImage?: string;
  footerImageAlt?: string;
  footerCta: {
    enabled: boolean;
    eyebrow: string;
    title: string;
    text: string;
    buttonLabel: string;
  };
};

export type Social = {
  linkedin?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  tiktok?: string;
};

export type Stat = {
  value: string;
  label: string;
  // « recommendation » : valeur lue dans le fichier Excel des
  // questionnaires (voir lib/recommendation.ts), « value » sert de secours.
  source?: "recommendation";
};

export type RecommendationSource = {
  driveId: string;
  itemId: string;
  sheet?: string;
  column?: string;
  // Note minimale (sur 10) pour compter un répondant comme recommandant.
  minScore?: number;
  // Cellule qui contient directement le pourcentage (prioritaire).
  cell?: string;
  // Emplacement du fichier, pour mémoire (non utilisé par le code).
  file?: string;
};

export type Pages = {
  hero: {
    badge: string;
    primaryButton: string;
    secondaryButton: string;
  };
  catalogue: {
    eyebrow: string;
    title: string;
    text: string;
    seoDescription: string;
    heroImage?: string;
    heroImageAlt?: string;
    theme?: PageColorOverride;
  };
  allTrainings: {
    eyebrow: string;
    title: string;
    text: string;
    linkLabel: string;
    allFilter: string;
    searchPlaceholder: string;
    emptyText: string;
    seoDescription: string;
    heroImage?: string;
    heroImageAlt?: string;
    theme?: PageColorOverride;
  };
  sector: {
    quoteMainButton: string;
    catalogueButton: string;
    whyEyebrow: string;
    listTitle: string;
    quoteButton: string;
    customTitle: string;
    customText: string;
    // Encart final : pastille penchée au-dessus et bouton.
    customBadge?: string;
    customButton?: string;
    theme?: PageColorOverride;
  };
  training: {
    programmeTitle: string;
    objectivesTitle?: string;
    audienceTitle: string;
    fundingTitle: string;
    methodsTitle: string;
    evaluationTitle: string;
    accessibilityTitle: string;
    price: string;
    quoteButton: string;
    questionText: string;
    theme?: PageColorOverride;
  };
  centre: {
    eyebrow: string;
    title: string;
    mapEyebrow: string;
    mapText: string;
    approachEyebrow: string;
    approachTitle: string;
    approachText: string;
    text?: string;
    accessEyebrow: string;
    accessTitle: string;
    // Stationnement, accessibilité, horaires… (paragraphes séparés par une ligne vide).
    accessText?: string;
    ctaTitle: string;
    ctaText: string;
    ctaButton: string;
    seoDescription: string;
    heroImage?: string;
    heroImageAlt?: string;
    theme?: PageColorOverride;
  };
  team: {
    eyebrow: string;
    title: string;
    text?: string;
    seoDescription: string;
    heroImage?: string;
    heroImageAlt?: string;
    theme?: PageColorOverride;
  };
  contact: {
    eyebrow: string;
    title: string;
    text: string;
    submitButton: string;
    successMessage: string;
    seoDescription: string;
    heroImage?: string;
    heroImageAlt?: string;
    theme?: PageColorOverride;
  };
  funding: { eyebrow: string; title: string; seoDescription: string; heroImage?: string; heroImageAlt?: string; theme?: PageColorOverride };
};

const content = site as SiteContent;

export const company = content.company;
export const legal = content.legal;
export const social: Social = content.social ?? {};
export const pages = content.pages;
export const trainingInfo = content.trainingInfo ?? { methods: "", evaluation: "" };
export const stats = content.stats;
export const recommendationSource = content.recommendation;
export const pillars = content.pillars;
export const topTrainings = content.topTrainings;
export const funding = content.funding;
export const accessibility = content.accessibility;
export const team = content.team;
export const home = content.home;
export const theme = content.theme;
export const footerImage = content.footerImage;
export const footerImageAlt = content.footerImageAlt;
export const footerCta = content.footerCta;

/** Variables CSS dérivées du thème, appliquées sur <html>. */
export function themeStyle(t: Theme): Record<string, string> {
  const v = { ...THEME_DEFAULTS, ...t };
  return {
    "--background": t.background,
    "--surface": t.surface,
    "--surface-2": t.surface2,
    "--foreground": t.foreground,
    "--muted": t.muted,
    "--page-foreground": t.foreground,
    "--page-muted": t.muted,
    "--border": t.border,
    "--accent": t.accent,
    "--accent-foreground": t.accentForeground,
    "--heading-font": HEADING_FONTS[t.headingFont] ?? HEADING_FONTS.archivo,
    "--heading-stretch": t.headingFont === "archivo-expanded" ? "125%" : "100%",
    "--tag-bg": v.tagBackground,
    "--tag-text": v.tagText,
    "--panel-shadow": v.panelShadowColor,
    "--sector-veil": String(v.sectorVeil / 100),
    "--footer-veil": `${v.footerVeil}%`,
    "--band-color": v.bandColor,
    "--band-alpha": `${v.bandOpacity}%`,
    "--surface-foreground": v.surfaceForeground,
    "--surface-muted": v.surfaceMuted,
    "--surface-accent": v.surfaceAccent,
    "--highlight": v.highlightBackground,
    "--highlight-foreground": v.highlightForeground,
    "--card-veil": v.cardVeil,
    "--link-color": v.linkColor,
    ...(t.quotePillBackground ? { "--quote-pill-bg": t.quotePillBackground } : {}),
    ...(t.quotePillForeground ? { "--quote-pill-fg": t.quotePillForeground } : {}),
    ...(t.badgeBackground ? { "--badge-bg": t.badgeBackground } : {}),
    ...(t.badgeForeground ? { "--badge-fg": t.badgeForeground } : {}),
    // Seulement si réglées : sinon le haut de page garde ses couleurs.
    ...(t.eyebrowColor ? { "--eyebrow-color": t.eyebrowColor } : {}),
    ...(t.heroButtonBackground ? { "--hero-btn-bg": t.heroButtonBackground } : {}),
    ...(t.heroButtonForeground ? { "--hero-btn-fg": t.heroButtonForeground } : {}),
    ...(t.titleColor ? { "--title-color": t.titleColor } : {}),
    ...(t.introColor ? { "--intro-color": t.introColor } : {}),
  };
}

/** Variables CSS du thème global, avec les couleurs propres à une page
 *  (si elle en a) appliquées par-dessus. Voir components/PageThemeScope.tsx. */
// Couleurs par défaut de toutes les pages : thème du site complété par les
// couleurs réglées sur la page d'accueil. Chaque page peut ensuite les
// remplacer par les siennes.
export const baseTheme: Theme = { ...theme, ...home.theme };

export function pageThemeStyle(overrides?: PageColorOverride): Record<string, string> {
  return themeStyle({ ...baseTheme, ...overrides });
}

export const services = content.sectors.map((sector) => ({
  ...sector,
  slug: slugify(sector.title),
  trainings: sector.trainings.map((training) => ({
    ...training,
    slug: slugify(training.title),
  })),
}));

/** Lien tel: au format international (07 69 35 55 19 → +33769355519). */
export function telHref(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, "");
  return `tel:${digits.startsWith("0") ? `+33${digits.slice(1)}` : digits}`;
}

// Formule imposée par l'article L6352-12 du Code du travail dès que le
// numéro de déclaration d'activité est affiché.
export function activityDeclarationText(): string {
  if (!legal.activityDeclaration) return "";
  const region = legal.activityRegion ? ` auprès du préfet de la région ${legal.activityRegion}` : "";
  return `Déclaration d'activité enregistrée sous le numéro ${legal.activityDeclaration}${region}. Cet enregistrement ne vaut pas agrément de l'État.`;
}

// Mention exigée par la charte d'usage de la marque Qualiopi.
export function qualiopiText(): string {
  if (!legal.qualiopiCertificate) return "";
  const category = legal.qualiopiCategory ? ` La certification qualité a été délivrée au titre de la catégorie d'action suivante : ${legal.qualiopiCategory}.` : "";
  return `Organisme certifié Qualiopi, certificat n° ${legal.qualiopiCertificate}.${category}`;
}

// Remplace {formations} et {domaines} par les chiffres réels du catalogue,
// pour que les textes modifiés dans l'admin restent justes quand des
// formations sont ajoutées ou retirées.
export function fillCounts(text: string): string {
  const trainings = services.reduce((n, s) => n + s.trainings.length, 0);
  return text
    .replaceAll("{formations}", String(trainings))
    .replaceAll("{domaines}", String(services.length));
}
