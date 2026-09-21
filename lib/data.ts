import site from "@/content/site.json";

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
  image?: string;
  imageAlt?: string;
  trainings: Training[];
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
  footerImage?: string;
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
export const footerImage = content.footerImage;

export const services = content.sectors.map((sector) => ({
  ...sector,
  slug: slugify(sector.title),
  trainings: sector.trainings.map((training) => ({
    ...training,
    slug: slugify(training.title),
  })),
}));
