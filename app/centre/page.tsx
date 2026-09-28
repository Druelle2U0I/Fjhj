import type { Metadata } from "next";
import Link from "next/link";
import AnimatedStat from "@/components/AnimatedStat";
import FranceMap from "@/components/FranceMap";
import PageHero from "@/components/PageHero";
import PageThemeScope from "@/components/PageThemeScope";
import PillarsGrid from "@/components/PillarsGrid";
import Reveal from "@/components/Reveal";
import { company, fillCounts, pages, services, stats } from "@/lib/data";

export const metadata: Metadata = {
  title: "Le centre",
  description: pages.centre.seoDescription,
  alternates: { canonical: "/centre" },
};

export default function CentrePage() {
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

      <section className="px-6 py-12 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <span className="text-sm font-semibold text-accent">
              {pages.centre.whyEyebrow}
            </span>
            <h2 className="mt-3 max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl">
              {pages.centre.whyTitle}
            </h2>
          </Reveal>

          <PillarsGrid className="mt-10 border-t border-border pt-8" />

          <Reveal delay={0.2} className="mt-14 grid grid-cols-2 gap-8 border-t border-border pt-10 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <p className="text-3xl font-semibold text-accent">
                  <AnimatedStat value={stat.value} />
                </p>
                <p className="mt-1 text-sm text-muted">{stat.label}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="px-6 py-12 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <span className="text-sm font-semibold text-muted">
              {pages.centre.domainsEyebrow}
            </span>
            <h2 className="mt-3 max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl">
              {fillCounts(pages.centre.domainsTitle)}
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={(i % 3) * 0.05}>
                <Link
                  href={`/formations/${service.slug}`}
                  className="dyn-card flex items-center justify-between gap-3 rounded-lg border border-border bg-surface px-5 py-4 text-sm font-medium transition-colors hover:border-surface-accent"
                >
                  {service.title}
                  <span className="shrink-0 text-xs text-muted">
                    {service.trainings.length}
                  </span>
                </Link>
              </Reveal>
            ))}
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
