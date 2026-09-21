import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { services } from "@/lib/data";

export async function generateStaticParams() {
  return services.flatMap((service) =>
    service.trainings.map((training) => ({
      secteur: service.slug,
      formation: training.slug,
    })),
  );
}

function findTraining(secteur: string, formation: string) {
  const service = services.find((s) => s.slug === secteur);
  if (!service) return null;
  const training = service.trainings.find((t) => t.slug === formation);
  if (!training) return null;
  return { service, training };
}

export async function generateMetadata(
  props: PageProps<"/formations/[secteur]/[formation]">,
): Promise<Metadata> {
  const { secteur, formation } = await props.params;
  const found = findTraining(secteur, formation);
  if (!found) return {};
  const { service, training } = found;
  return {
    title: training.title,
    description: `${training.title} — ${training.duration}, ${training.format}. Formation certifiée Qualiopi du domaine ${service.title.toLowerCase()}, finançable OPCO.`,
  };
}

export default async function FormationPage(
  props: PageProps<"/formations/[secteur]/[formation]">,
) {
  const { secteur, formation } = await props.params;
  const found = findTraining(secteur, formation);
  if (!found) notFound();
  const { service, training } = found;

  const otherTrainings = service.trainings.filter(
    (t) => t.slug !== training.slug,
  );

  return (
    <>
      <section className="relative overflow-hidden px-6 pt-16 pb-14">
        <div className="pointer-events-none absolute -top-32 right-[-10%] h-96 w-96 rounded-full bg-accent-soft blur-3xl" />
        <div className="relative mx-auto max-w-4xl">
          <div className="mb-6 text-sm text-muted">
            <Link href="/formations" className="hover:text-accent">
              Formations
            </Link>
            <span className="mx-2">/</span>
            <Link
              href={`/formations/${service.slug}`}
              className="hover:text-accent"
            >
              {service.title}
            </Link>
            <span className="mx-2">/</span>
            <span>{training.title}</span>
          </div>

          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-wide text-accent">
              {service.title}
            </span>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              {training.title}
            </h1>
            <p className="mt-4 text-muted">
              {training.duration} · {training.format}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-4xl gap-10">
          <Reveal className="space-y-4 text-muted">
            {training.description.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </Reveal>

          <Reveal delay={0.05} className="grid gap-6 sm:grid-cols-2">
            <div className="dyn-card rounded-2xl border border-border bg-surface p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                Public concerné
              </p>
              <p className="mt-2 text-sm text-muted">{training.audience}</p>
            </div>
            <div className="dyn-card rounded-2xl border border-border bg-surface p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                Financement
              </p>
              <p className="mt-2 text-sm text-muted">{training.funding}</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="dyn-card rounded-2xl border border-border bg-surface p-6 sm:p-8">
              <h2 className="text-lg font-semibold">
                Un projet pour cette formation ?
              </h2>
              <p className="mt-2 text-sm text-muted">
                Décrivez votre besoin et le nombre de stagiaires : nous
                revenons vers vous sous 24 heures avec une proposition
                adaptée et le montage du dossier OPCO.
              </p>
              <Link
                href={`/contact?formation=${encodeURIComponent(training.title)}`}
                className="mt-5 inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-105"
              >
                Demander un devis
              </Link>
            </div>
          </Reveal>

          {otherTrainings.length > 0 && (
            <Reveal delay={0.15}>
              <h2 className="text-lg font-semibold">
                Autres formations en {service.title.toLowerCase()}
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {otherTrainings.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/formations/${service.slug}/${t.slug}`}
                    className="dyn-card rounded-xl border border-border bg-surface-2 p-4"
                  >
                    <p className="font-medium">{t.title}</p>
                    <p className="mt-1 text-sm text-muted">
                      {t.duration} · {t.format}
                    </p>
                  </Link>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}
