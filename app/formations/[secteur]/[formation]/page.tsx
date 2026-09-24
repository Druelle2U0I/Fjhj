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
          <div className="absolute inset-0 bg-background/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/65 via-background/35 to-background/45" />
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
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-sm font-semibold uppercase tracking-wide text-accent">
                {service.title}
              </p>
              {training.category && (
                <span className="domain-tag rounded-full border border-white/15 px-3 py-1 text-xs font-semibold">
                  {training.category}
                </span>
              )}
            </div>
            <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">
              {training.title}
            </h1>
            <p className="mt-5 max-w-2xl whitespace-pre-line text-lg text-muted">{training.intro}</p>
          </Reveal>
        </div>
      </section>

      {/* Déroulement + contenu + encart latéral : un seul bloc en deux
          colonnes, pour que l'encart de contact soit collé (sticky) dès le
          programme au lieu de n'apparaître qu'après le mur de texte. */}
      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_360px] lg:items-start">
          <div className="grid gap-12">
            {/* Déroulement : de grands numéros et une révélation étape par
                étape (progressive) au lieu d'un bloc statique. */}
            {training.programme.length > 0 && (
              <div>
                <Reveal>
                  <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                    {pages.training.programmeTitle}
                  </h2>
                </Reveal>

                <div className="group/programme mt-10 divide-y divide-border border-t border-border">
                  {training.programme.map((module, i) => (
                    <Reveal key={module.title} delay={i * 0.1} className="py-8">
                      {/* L'opacité de survol vit sur ce div interne, séparé de
                          celui que Reveal anime : Framer Motion laisse un style
                          inline opacity:1 après l'entrée, qui écraserait sinon
                          cette classe. */}
                      <div className="grid gap-3 opacity-100 transition-opacity duration-300 hover:!opacity-100 group-hover/programme:opacity-40 sm:grid-cols-[120px_1fr] sm:gap-8">
                        <span className="text-4xl font-semibold text-accent sm:text-5xl">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h3 className="text-lg font-semibold sm:text-xl">
                            {module.title}
                          </h3>
                          <p className="mt-3 max-w-2xl text-muted">{module.text}</p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            )}

            <Reveal className="space-y-4 text-muted">
              {training.description.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </Reveal>

            {/* À partir d'ici, le rythme change volontairement : plus la
                même grille répétée, chaque information prend une forme
                différente selon son importance. */}
            <div className="border-t border-border pt-10">
              {/* Public concerné : mis en avant, pleine largeur, plus grand */}
              <Reveal>
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                  {pages.training.audienceTitle}
                </p>
                <p className="mt-3 max-w-2xl text-lg text-foreground/90">
                  {training.audience}
                </p>
              </Reveal>

              {/* Financement : callout à barre d'accent, pas une grille */}
              <Reveal delay={0.05} className="mt-10 max-w-2xl border-l-4 border-accent pl-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                  {pages.training.fundingTitle}
                </p>
                <p className="mt-2 text-sm text-muted">{training.funding}</p>
              </Reveal>

              {/* Méthodes + évaluation : détails plus discrets, en paire */}
              {(trainingInfo.methods || trainingInfo.evaluation) && (
                <Reveal delay={0.1} className="mt-10 grid gap-6 text-sm sm:grid-cols-2">
                  {trainingInfo.methods && (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                        {pages.training.methodsTitle}
                      </p>
                      <p className="mt-2 text-muted">{trainingInfo.methods}</p>
                    </div>
                  )}
                  {trainingInfo.evaluation && (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                        {pages.training.evaluationTitle}
                      </p>
                      <p className="mt-2 text-muted">{trainingInfo.evaluation}</p>
                    </div>
                  )}
                </Reveal>
              )}

              {/* Accessibilité : simple note en bas, la plus discrète */}
              <Reveal delay={0.15} className="mt-10 max-w-2xl text-xs text-muted">
                <p className="font-semibold uppercase tracking-wide text-accent">
                  {pages.training.accessibilityTitle}
                </p>
                <p className="mt-2">
                  {accessibility.text} Contact : {accessibility.referent},{" "}
                  <a href={`mailto:${company.email}`} className="text-foreground hover:text-accent">
                    {company.email}
                  </a>
                  .
                </p>
              </Reveal>
            </div>

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

          {/* Encart récapitulatif : passe en premier sur mobile (juste après
              le programme) pour ne pas noyer les infos clés sous le mur de
              texte qui suit ; reprend sa place à droite à partir de lg. */}
          <aside className="order-first lg:order-none lg:sticky lg:top-24">
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
