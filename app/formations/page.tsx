import type { Metadata } from "next";
import Link from "next/link";
import KeyFacts from "@/components/KeyFacts";
import PageHero from "@/components/PageHero";
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
    <>
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

      <section className="page-band px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={(i % 3) * 0.05}>
              <Link
                href={`/formations/${service.slug}`}
                className="dyn-card group relative flex aspect-[4/5] w-full flex-col justify-end overflow-hidden rounded-lg"
              >
                <Visual
                  src={service.image}
                  alt={service.imageAlt ?? service.title}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw"
                  className="transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
                <div className="relative flex items-end justify-between gap-3 p-6">
                  <h2 className="text-xl font-semibold leading-snug text-white">
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
    </>
  );
}
