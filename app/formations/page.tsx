import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Visual from "@/components/Visual";
import { services } from "@/lib/data";

export const metadata: Metadata = {
  title: "Nos formations",
  description:
    "9 domaines de formation, 35 parcours certifiés Qualiopi : sécurité incendie, secourisme, habilitation électrique, CACES, travail en hauteur, prévention des risques, management, photovoltaïque, collectivités.",
};

export default function FormationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Nos formations"
        title="9 domaines de formation, 35 parcours certifiés Qualiopi"
        description="Toutes nos formations sont finançables OPCO et proposées en intra-entreprise ou en inter-entreprises, partout en Hauts-de-France. Choisissez un domaine pour découvrir le détail des formations."
      />

      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={(i % 3) * 0.05}>
              <Link
                href={`/formations/${service.slug}`}
                className="dyn-card group block h-full overflow-hidden rounded-3xl border border-border bg-surface"
              >
                <div className="dyn-photo-wrap relative aspect-[4/3] overflow-hidden">
                  <Visual
                    src={service.image}
                    alt={service.imageAlt ?? service.title}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw"
                    className="dyn-photo"
                  />
                </div>
                <div className="flex items-center justify-between gap-3 border-t border-border px-6 py-5">
                  <h2 className="text-lg font-semibold leading-snug">
                    {service.title}
                  </h2>
                  <span className="shrink-0 text-sm text-muted">
                    {service.trainings.length} formation
                    {service.trainings.length > 1 ? "s" : ""}
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
