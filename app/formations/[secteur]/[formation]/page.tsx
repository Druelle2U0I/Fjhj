import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import Visual from "@/components/Visual";
import {
  accessibility,
  company,
  legal,
  pages,
  services,
  siteUrl,
  trainingInfo,
} from "@/lib/data";

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
    alternates: { canonical: `/formations/${service.slug}/${training.slug}` },
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
    ...(legal.accessDelay
      ? [{ label: "Délai d'accès", value: legal.accessDelay }]
      : []),
  ];

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: training.title,
    description: training.intro,
    provider: {
      "@type": "EducationalOrganization",
      name: company.name,
      url: siteUrl,
    },
    url: `${siteUrl}/formations/${service.slug}/${training.slug}`,
    ...(training.certification
      ? { educationalCredentialAwarded: training.certification }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />

      {/* Hero : grande photo de fond. Remonte sous l'en-tête (sticky,
          semi-transparent) pour que la photo continue jusqu'en haut de
          la page au lieu de s'arrêter net dessous. */}
      <section className="relative -mt-[86px] overflow-hidden px-6 pt-[126px] pb-16 sm:-mt-[94px] sm:pt-[154px] sm:pb-24">
        <div className="hero-photo-fade absolute inset-0">
          <Visual
            src={training.image ?? service.image}
            alt=""
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-background/75" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/60 to-background/70" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-6 text-sm text-muted">
            <Link href="/formations" className="underline decoration-dotted underline-offset-2 hover:text-accent">
              Formations
            </Link>
            <span className="mx-2">/</span>
            <Link
              href={`/formations/${service.slug}`}
              className="underline decoration-dotted underline-offset-2 hover:text-accent"
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
            <p className="mt-5 max-w-2xl whitespace-pre-line text-lg text-muted">{training.intro}</p>
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
                  {pages.training.programmeTitle}
                </h2>
                <ol className="mt-6 divide-y divide-border border-t border-border">
                  {training.programme.map((module, i) => (
                    <li key={module.title} className="py-5 first:pt-0">
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

            <Reveal className="grid gap-6 border-t border-border pt-8 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                  {pages.training.audienceTitle}
                </p>
                <p className="mt-3 text-sm text-muted">{training.audience}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                  {pages.training.fundingTitle}
                </p>
                <p className="mt-3 text-sm text-muted">{training.funding}</p>
              </div>
              {trainingInfo.methods && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                    {pages.training.methodsTitle}
                  </p>
                  <p className="mt-3 text-sm text-muted">{trainingInfo.methods}</p>
                </div>
              )}
              {trainingInfo.evaluation && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                    {pages.training.evaluationTitle}
                  </p>
                  <p className="mt-3 text-sm text-muted">{trainingInfo.evaluation}</p>
                </div>
              )}
              <div className="sm:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                  {pages.training.accessibilityTitle}
                </p>
                <p className="mt-3 text-sm text-muted">
                  {accessibility.text} Contact : {accessibility.referent},{" "}
                  <a href={`mailto:${company.email}`} className="text-foreground hover:text-accent">
                    {company.email}
                  </a>
                  .
                </p>
              </div>
            </Reveal>

            {otherTrainings.length > 0 && (
              <Reveal>
                <h2 className="text-lg font-semibold">
                  Autres formations en {service.title.toLowerCase()}
                </h2>
                <div className="mt-4 divide-y divide-border border-t border-border">
                  {otherTrainings.map((t) => (
                    <Link
                      key={t.slug}
                      href={`/formations/${service.slug}/${t.slug}`}
                      className="flex items-center justify-between gap-4 py-4 transition-colors hover:text-accent"
                    >
                      <div>
                        <p className="font-medium">{t.title}</p>
                        <p className="mt-1 text-sm text-muted">
                          {t.duration} · {t.format}
                        </p>
                      </div>
                      <span aria-hidden="true">→</span>
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
                    {pages.training.price}
                  </dd>
                </div>
              </dl>

              <Link
                href={`/contact?formation=${encodeURIComponent(training.title)}`}
                className="mt-7 flex w-full items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.03]"
              >
                {pages.training.quoteButton}
              </Link>

              <div className="mt-6 border-t border-border pt-5 text-sm text-muted">
                <p>{pages.training.questionText}</p>
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
