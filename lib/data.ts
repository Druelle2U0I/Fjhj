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
  image?: string;
  imageAlt?: string;
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
  why: { title: string; text: string };
  opco: boolean;
  image?: string;
  imageAlt?: string;
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
  sectionOpacity?: number;
  panelShadowColor?: string;
  bandColor?: string;
  bandOpacity?: number;
};

export const THEME_DEFAULTS = {
  tagBackground: "#0b032b",
  tagText: "#fff9c7",
  sectorVeil: 60,
  footerVeil: 68,
  sectionOpacity: 70,
  panelShadowColor: "#0b032b",
  bandColor: "#2a2266",
  bandOpacity: 85,
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
    resultsIndicators?: string;
    qualiopiLogo?: string;
    qualiopiCertificateUrl?: string;
  };
  social?: Social;
  trainingInfo?: { methods: string; evaluation: string };
  pages: Pages;
  stats: { value: string; label: string }[];
  pillars: { title: string; text: string }[];
  sectors: Sector[];
  topTrainings: { title: string; duration: string; format: string }[];
  funding: {
    intro: string;
    points: { title: string; text: string }[];
    stepsTitle?: string;
    stepsText?: string;
    steps?: { title: string; text: string }[];
  };
  accessibility: { text: string; referent: string };
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

export type Pages = {
  hero: { badge: string; primaryButton: string; secondaryButton: string };
  catalogue: { eyebrow: string; title: string; text: string; seoDescription: string };
  allTrainings: {
    eyebrow: string;
    title: string;
    text: string;
    linkLabel: string;
    allFilter: string;
    searchPlaceholder: string;
    emptyText: string;
    seoDescription: string;
  };
  sector: {
    quoteMainButton: string;
    catalogueButton: string;
    whyEyebrow: string;
    listTitle: string;
    quoteButton: string;
    customTitle: string;
    customText: string;
  };
  training: {
    programmeTitle: string;
    audienceTitle: string;
    fundingTitle: string;
    methodsTitle: string;
    evaluationTitle: string;
    accessibilityTitle: string;
    price: string;
    quoteButton: string;
    questionText: string;
  };
  centre: {
    eyebrow: string;
    title: string;
    mapEyebrow: string;
    mapText: string;
    approachEyebrow: string;
    approachTitle: string;
    approachText: string;
    whyEyebrow: string;
    whyTitle: string;
    domainsEyebrow: string;
    domainsTitle: string;
    ctaTitle: string;
    ctaText: string;
    ctaButton: string;
    seoDescription: string;
  };
  team: { eyebrow: string; title: string; text?: string; seoDescription: string };
  contact: {
    eyebrow: string;
    title: string;
    text: string;
    submitButton: string;
    successMessage: string;
    seoDescription: string;
  };
  funding: { eyebrow: string; title: string; seoDescription: string };
};

const content = site as SiteContent;

export const company = content.company;
export const legal = content.legal;
export const social: Social = content.social ?? {};
export const pages = content.pages;
export const trainingInfo = content.trainingInfo ?? { methods: "", evaluation: "" };
export const stats = content.stats;
export const pillars = content.pillars;
export const topTrainings = content.topTrainings;
export const funding = content.funding;
export const accessibility = content.accessibility;
export const team = content.team;
export const home = content.home;
export const theme = content.theme;
export const footerImage = content.footerImage;
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
    "--border": t.border,
    "--accent": t.accent,
    "--accent-foreground": t.accentForeground,
    "--heading-font": HEADING_FONTS[t.headingFont] ?? HEADING_FONTS.archivo,
    "--tag-bg": v.tagBackground,
    "--tag-text": v.tagText,
    "--panel-shadow": v.panelShadowColor,
    "--sector-veil": String(v.sectorVeil / 100),
    "--footer-veil": `${v.footerVeil}%`,
    "--section-alpha": `${v.sectionOpacity}%`,
    "--band-color": v.bandColor,
    "--band-alpha": `${v.bandOpacity}%`,
  };
}

export const services = content.sectors.map((sector) => ({
  ...sector,
  slug: slugify(sector.title),
  trainings: sector.trainings.map((training) => ({
    ...training,
    slug: slugify(training.title),
  })),
}));

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
