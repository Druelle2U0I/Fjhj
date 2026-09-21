import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import Visual from "@/components/Visual";
import { company, services } from "@/lib/data";

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
    description: `${training.intro} ${training.duration}, ${training.format}. Formation ${service.title.toLowerCase()} certifiée Qualiopi, finançable OPCO.`,
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

  const recap = [
    { label: "Lieu", value: training.format },
    { label: "Durée", value: training.duration },
    { label: "Prérequis", value: training.prerequisites },
    ...(training.effectif
      ? [{ label: "Effectif", value: training.effectif }]
      : []),
    { label: "Validation", value: training.certification },
  ];

  return (
    <>
      {/* Hero : grande photo de fond */}
      <section className="relative overflow-hidden px-6 pt-14 pb-16 sm:pt-20 sm:pb-24">
        <div className="absolute inset-0">
          <Visual
            src={training.image ?? service.image}
            alt=""
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-background/75" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/60 to-background" />
        </div>

        <div className="relative mx-auto max-w-6xl">
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
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">
              {service.title}
            </p>
            <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">
              {training.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted">{training.intro}</p>
          </Reveal>
        </div>
      </section>

      {/* Contenu + encart latéral */}
      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_360px] lg:items-start">
          <div className="grid gap-12">
            <Reveal className="space-y-4 text-muted">
              {training.description.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </Reveal>

            {training.programme.length > 0 && (
              <Reveal>
                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  Programme de la formation
                </h2>
                <ol className="mt-6 grid gap-4">
                  {training.programme.map((module, i) => (
                    <li
                      key={module.title}
                      className="dyn-card rounded-2xl border border-border bg-surface p-6"
                    >
                      <div className="flex items-baseline gap-4">
                        <span className="text-sm font-semibold text-accent">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="text-base font-semibold">
                          {module.title}
                        </h3>
                      </div>
                      <p className="mt-3 text-sm text-muted">{module.text}</p>
                    </li>
                  ))}
                </ol>
              </Reveal>
            )}

            <Reveal className="grid gap-6 sm:grid-cols-2">
              <div className="dyn-card rounded-2xl border border-border bg-surface p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                  Public concerné
                </p>
                <p className="mt-3 text-sm text-muted">{training.audience}</p>
              </div>
              <div className="dyn-card rounded-2xl border border-border bg-surface p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                  Financement
                </p>
                <p className="mt-3 text-sm text-muted">{training.funding}</p>
              </div>
            </Reveal>

            {otherTrainings.length > 0 && (
              <Reveal>
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

          {/* Encart récapitulatif */}
          <aside className="lg:sticky lg:top-24">
            <div className="rounded-3xl border border-border bg-surface p-6 sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                {service.title}
              </p>
              <h2 className="mt-2 text-lg font-semibold leading-snug">
                {training.title}
              </h2>

              <dl className="mt-6 grid gap-4 border-t border-border pt-6">
                {recap.map((item) => (
                  <div key={item.label}>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
                      {item.label}
                    </dt>
                    <dd className="mt-1 text-sm">{item.value}</dd>
                  </div>
                ))}
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
                    Tarif
                  </dt>
                  <dd className="mt-1 text-sm">
                    Sur devis · prise en charge OPCO possible
                  </dd>
                </div>
              </dl>

              <Link
                href={`/contact?formation=${encodeURIComponent(training.title)}`}
                className="mt-7 flex w-full items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.03]"
              >
                Demander un devis
              </Link>

              <div className="mt-6 border-t border-border pt-5 text-sm text-muted">
                <p>Une question sur cette formation ?</p>
                <a
                  href={`tel:${company.phone.replace(/\s/g, "")}`}
                  className="mt-2 block font-semibold text-foreground hover:text-accent"
                >
                  {company.phone}
                </a>
                <a
                  href={`mailto:${company.email}`}
                  className="mt-1 block hover:text-accent"
                >
                  {company.email}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
