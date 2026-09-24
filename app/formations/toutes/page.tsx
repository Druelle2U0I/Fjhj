import type { Metadata } from "next";
import Link from "next/link";
import AllTrainings, { type TrainingItem } from "@/components/AllTrainings";
import PageHero from "@/components/PageHero";
import { fillCounts, pages, services } from "@/lib/data";

export const metadata: Metadata = {
  title: "Toutes les formations",
  description: fillCounts(pages.allTrainings.seoDescription),
  alternates: { canonical: "/formations/toutes" },
};

export default function AllTrainingsPage() {
  const items: TrainingItem[] = services.flatMap((service) =>
    service.trainings.map((training) => ({
      title: training.title,
      href: `/formations/${service.slug}/${training.slug}`,
      intro: training.intro,
      duration: training.duration,
      format: training.format,
      image: training.image ?? service.image,
      imageAlt: training.imageAlt,
      sectorTitle: service.title,
      sectorSlug: service.slug,
    })),
  );

  return (
    <>
      <PageHero
        eyebrow={pages.allTrainings.eyebrow}
        title={fillCounts(pages.allTrainings.title)}
        description={fillCounts(pages.allTrainings.text)}
        breadcrumb={
          <>
            <Link
              href="/formations"
              className="underline decoration-dotted underline-offset-2 hover:text-accent"
            >
              Formations
            </Link>
            <span className="mx-2">/</span>
            <span>{pages.allTrainings.eyebrow}</span>
          </>
        }
      />

      <section className="page-band px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <AllTrainings
            items={items}
            sectors={services.map((s) => ({ slug: s.slug, title: s.title }))}
            allLabel={pages.allTrainings.allFilter}
            searchPlaceholder={pages.allTrainings.searchPlaceholder}
            emptyText={pages.allTrainings.emptyText}
          />
        </div>
      </section>
    </>
  );
}
