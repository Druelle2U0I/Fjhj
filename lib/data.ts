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
};

export type Sector = {
  title: string;
  description: string;
  why: { title: string; text: string };
  opco: boolean;
  image?: string;
  imageAlt?: string;
  trainings: Training[];
};

export type HeroSlide = {
  image: string;
  alt?: string;
  title?: string;
  text?: string;
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
};

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
  legal: { activityDeclaration: string; qualiopiCertificate: string };
  stats: { value: string; label: string }[];
  pillars: { title: string; text: string }[];
  sectors: Sector[];
  topTrainings: { title: string; duration: string; format: string }[];
  funding: { intro: string; points: { title: string; text: string }[] };
  accessibility: { text: string; referent: string };
  team: { name: string; role: string; email: string; bio: string }[];
  home: {
    heroSlides: HeroSlide[];
    aboutImage?: string;
    aboutImageAlt?: string;
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

const content = site as SiteContent;

export const company = content.company;
export const legal = content.legal;
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
