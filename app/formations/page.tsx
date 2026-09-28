import type { Metadata } from "next";
import Link from "next/link";
import KeyFacts from "@/components/KeyFacts";
import PageHero from "@/components/PageHero";
import PageThemeScope from "@/components/PageThemeScope";
import Reveal from "@/components/Reveal";
import UnlistedTrainingNote from "@/components/UnlistedTrainingNote";
import Visual from "@/components/Visual";
import { fillCounts, pages, services } from "@/lib/data";

export const metadata: Metadata = {
  title: "Nos formations",
  description: fillCounts(pages.catalogue.seoDescription),
  alternates: { canonical: "/formations" },
};

export default function FormationsPage() {
  return (
    <PageThemeScope overrides={pages.catalogue.theme}>
      <PageHero
        eyebrow={pages.catalogue.eyebrow}
        title={fillCounts(pages.catalogue.title)}
        description={fillCounts(pages.catalogue.text)}
        aside={<KeyFacts />}
        backgroundImage={pages.catalogue.heroImage}
      />

      <section className="px-6 pb-8">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/formations/toutes"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-105"
          >
            {pages.allTrainings.linkLabel} ({fillCounts("{formations}")})
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={(i % 4) * 0.05}>
              <Link
                href={`/formations/${service.slug}`}
                className="dyn-card group relative flex aspect-[3/4] w-full flex-col justify-end overflow-hidden rounded-lg"
              >
                <Visual
                  src={service.image}
                  alt={service.imageAlt ?? service.title}
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 90vw"
                  className="transition-transform duration-700 group-hover:scale-105"
                  objectPosition={service.imagePosition}
                />
                <div className="card-veil absolute inset-0" />
                <div className="relative flex items-end justify-between gap-3 p-6">
                  <h2 className="text-lg font-semibold leading-snug text-white">
                    {service.title}
                  </h2>
                  <span className="shrink-0 text-sm text-white/80">
                    {service.trainings.length} formation
                    {service.trainings.length > 1 ? "s" : ""}
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mx-auto max-w-6xl">
          <UnlistedTrainingNote />
        </div>
      </section>
    </PageThemeScope>
  );
}
