import type { Metadata } from "next";
import Link from "next/link";
import KeyFacts from "@/components/KeyFacts";
import PageHero from "@/components/PageHero";
import PageThemeScope from "@/components/PageThemeScope";
import Reveal from "@/components/Reveal";
import UnlistedTrainingNote from "@/components/UnlistedTrainingNote";
import Visual from "@/components/Visual";
import { fillCounts, pages, services } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Nos formations",
  description: fillCounts(pages.catalogue.seoDescription),
  path: "/formations",
});

export default function FormationsPage() {
  return (
    <PageThemeScope overrides={pages.catalogue.theme}>
      <PageHero
        eyebrow={pages.catalogue.eyebrow}
        title={fillCounts(pages.catalogue.title)}
        description={fillCounts(pages.catalogue.text)}
        aside={<KeyFacts />}
        backgroundImage={pages.catalogue.heroImage}
        imageAlt={pages.catalogue.heroImageAlt}
      />

      <section className="on-surface bg-surface px-6 pb-12">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/formations/toutes"
            className="inline-flex items-center gap-2 rounded-lg border border-current/40 px-6 py-3 text-sm font-semibold transition-colors hover:border-current hover:bg-white/10"
          >
            {pages.allTrainings.linkLabel} ({fillCounts("{formations}")})
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="spotlight mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={(i % 4) * 0.05}>
              <Link
                href={`/formations/${service.slug}`}
                className="spotlight-item dyn-card group relative flex aspect-[3/4] w-full flex-col overflow-hidden rounded-lg"
              >
                <Visual
                  src={service.image}
                  alt={service.imageAlt ?? service.title}
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 90vw"
                  className="transition-transform duration-700 group-hover:scale-105"
                  objectPosition={service.imagePosition}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/5 to-black/50" />
                <h2 className="font-heading relative p-5 text-sm uppercase leading-tight text-white sm:text-base">
                  {service.title}
                </h2>
                <div className="relative mt-auto p-5">
                  {service.summary && (
                    <p className="text-sm leading-relaxed text-white opacity-100 transition-opacity duration-500 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100">
                      {service.summary}
                    </p>
                  )}
                  <p className="mt-2 text-right text-base font-semibold text-white">
                    {service.trainings.length} formation{service.trainings.length > 1 ? "s" : ""}
                  </p>
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
