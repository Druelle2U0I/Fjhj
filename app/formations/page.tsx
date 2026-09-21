import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { services, topTrainings } from "@/lib/data";

function findTrainingLink(title: string) {
  for (const service of services) {
    const training = service.trainings.find((t) => t.title === title);
    if (training) return `/formations/${service.slug}/${training.slug}`;
  }
  return "/formations";
}

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
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={(i % 3) * 0.05}>
                <Link
                  href={`/formations/${service.slug}`}
                  className="dyn-card block h-full rounded-2xl border border-border bg-surface p-6"
                >
                  <div className="mb-3 h-1 w-10 rounded-full bg-gold" />
                  <h2 className="text-lg font-semibold">{service.title}</h2>
                  <p className="mt-2 text-sm text-muted">
                    {service.description}
                  </p>
                  <p className="mt-4 text-sm font-medium text-accent">
                    {service.trainings.length} formation
                    {service.trainings.length > 1 ? "s" : ""} →
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <div className="mt-14 rounded-2xl border border-border bg-surface p-6 sm:p-8">
              <h2 className="text-lg font-semibold">Les plus demandées</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {topTrainings.map((training) => (
                  <Link
                    key={training.title}
                    href={findTrainingLink(training.title)}
                    className="dyn-card rounded-xl border border-border bg-surface-2 p-4"
                  >
                    <p className="font-medium">{training.title}</p>
                    <p className="mt-1 text-sm text-muted">
                      {training.duration} · {training.format}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
