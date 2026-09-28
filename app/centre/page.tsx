import type { Metadata } from "next";
import Link from "next/link";
import FranceMap from "@/components/FranceMap";
import PageHero from "@/components/PageHero";
import PageThemeScope from "@/components/PageThemeScope";
import RelatedCarousel from "@/components/RelatedCarousel";
import Reveal from "@/components/Reveal";
import { company, fillCounts, pages, services, telHref } from "@/lib/data";

export const metadata: Metadata = {
  title: "Le centre",
  description: pages.centre.seoDescription,
  alternates: { canonical: "/centre" },
};

export default function CentrePage() {
  // « 8 domaines de formation, du terrain… » : la fin du titre est mise en
  // valeur dans le carrousel, comme en bas des fiches formation.
  const [titleStart, ...titleEnd] = fillCounts(pages.centre.domainsTitle).split(", ");
  const accessInfo = (pages.centre.accessText ?? "")
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => {
      const [label, ...rest] = paragraph.split(" : ");
      const text = rest.join(" : ");
      return rest.length
        ? { label, text: text.charAt(0).toUpperCase() + text.slice(1) }
        : { label: "", text: paragraph };
    });
  const domainsTitle = [titleEnd.length ? `${titleStart},` : titleStart, titleEnd.join(", ")];
  return (
    <PageThemeScope overrides={pages.centre.theme}>
      <PageHero
        eyebrow={pages.centre.eyebrow}
        title={pages.centre.title}
        description={company.tagline}
        backgroundImage={pages.centre.heroImage}
      />

      <FranceMap>
        <Reveal>
          <span className="text-sm font-semibold text-muted">
            {pages.centre.approachEyebrow}
          </span>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            {pages.centre.approachTitle}
          </h2>
          <div className="mt-5 grid gap-4 text-muted">
            <p>{company.about}</p>
            {pages.centre.approachText
              .split(/\n\s*\n/)
              .filter((paragraph) => paragraph.trim())
              .map((paragraph, i) => (
                <p key={i} className="whitespace-pre-line">
                  {paragraph}
                </p>
              ))}
          </div>
        </Reveal>
      </FranceMap>

      {/* Accès au centre : l'adresse et les boutons à gauche, les
          informations pratiques (« Libellé : texte », une par paragraphe
          dans l'admin) en lignes séparées par des filets à droite. */}
      <section className="px-6 py-12 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <span className="text-sm font-semibold text-muted">{pages.centre.accessEyebrow}</span>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              {pages.centre.accessTitle}
            </h2>
            <p className="mt-6 text-xl font-semibold leading-snug text-foreground sm:text-2xl">
              {company.address.split(", ").map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-105"
              >
                Itinéraire
              </a>
              <a
                href={telHref(company.phone)}
                className="rounded-lg border border-foreground/30 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-foreground"
              >
                {company.phone}
              </a>
            </div>
          </Reveal>

          {accessInfo.length > 0 && (
            <Reveal delay={0.1}>
              <dl className="border-t border-foreground/15">
                {accessInfo.map((info, i) => (
                  <div key={i} className="grid gap-1 border-b border-foreground/15 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                    <dt className="font-semibold text-foreground">{info.label}</dt>
                    <dd className="text-muted">{info.text}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          )}
        </div>
      </section>

      <section className="px-6 py-12 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <span className="text-sm font-semibold text-muted">{pages.centre.domainsEyebrow}</span>
          <div className="mt-3">
            <RelatedCarousel
              titleStart={domainsTitle[0]}
              titleHighlight={domainsTitle[1]}
              buttonLabel="Voir les formations"
              clockIcon={false}
              items={services.map((service) => ({
                href: `/formations/${service.slug}`,
                title: service.title,
                intro: service.summary ?? service.why.title,
                duration: `${service.trainings.length} formation${service.trainings.length > 1 ? "s" : ""}`,
                image: service.image,
                imageAlt: service.imageAlt || service.title,
              }))}
            />
          </div>
        </div>
      </section>

      <section className="px-6 py-12 sm:py-20">
        <Reveal className="relative mx-auto max-w-3xl">
          <span className="absolute -top-4 left-1/2 z-10 inline-flex -translate-x-1/2 rotate-3 items-center rounded-full bg-accent px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-accent-foreground shadow-lg">
            Réponse sous 24h
          </span>
          <div className="rounded-lg border border-border bg-surface p-10 pt-12 text-center shadow-xl shadow-black/5 sm:p-14 sm:pt-16">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {pages.centre.ctaTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-xl whitespace-pre-line text-muted">
              {pages.centre.ctaText}
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-105"
            >
              {pages.centre.ctaButton}
            </Link>
          </div>
        </Reveal>
      </section>
    </PageThemeScope>
  );
}
