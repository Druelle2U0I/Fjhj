import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { services } from "@/lib/data";

export async function generateStaticParams() {
  return services.map((service) => ({ secteur: service.slug }));
}

export async function generateMetadata(
  props: PageProps<"/formations/[secteur]">,
): Promise<Metadata> {
  const { secteur } = await props.params;
  const service = services.find((s) => s.slug === secteur);
  if (!service) return {};
  return {
    title: service.title,
    description: `${service.description} ${service.trainings.length} formations certifiées Qualiopi, finançables OPCO.`,
  };
}

export default async function SecteurPage(
  props: PageProps<"/formations/[secteur]">,
) {
  const { secteur } = await props.params;
  const service = services.find((s) => s.slug === secteur);
  if (!service) notFound();

  return (
    <>
      <PageHero
        eyebrow="Nos formations"
        title={service.title}
        description={service.description}
        breadcrumb={
          <>
            <Link href="/formations" className="hover:text-accent">
              Formations
            </Link>
            <span className="mx-2">/</span>
            <span>{service.title}</span>
          </>
        }
      />

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2">
            {service.trainings.map((training, i) => (
              <Reveal key={training.slug} delay={(i % 4) * 0.05}>
                <Link
                  href={`/formations/${service.slug}/${training.slug}`}
                  className="dyn-card block h-full rounded-2xl border border-border bg-surface p-6"
                >
                  <h2 className="text-lg font-semibold">{training.title}</h2>
                  <p className="mt-2 text-sm text-muted">
                    {training.duration} · {training.format}
                  </p>
                  <p className="mt-3 text-sm text-muted line-clamp-2">
                    {training.description[0]}
                  </p>
                  <p className="mt-4 text-sm font-medium text-accent">
                    Voir la formation →
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
