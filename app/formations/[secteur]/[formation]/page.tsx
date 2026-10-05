import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CardRail from "@/components/CardRail";
import PageThemeScope from "@/components/PageThemeScope";
import Reveal from "@/components/Reveal";
import TrainingInfoTabs from "@/components/TrainingInfoTabs";
import Visual from "@/components/Visual";
import {
  accessibility,
  company,
  legal,
  pages,
  services,
  siteUrl,
  telHref,
  trainingInfo,
} from "@/lib/data";
import { clip, pageMetadata } from "@/lib/seo";

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
  // L'accroche de la formation d'abord, puis toujours la durée et les
  // arguments Qualiopi / OPCO (l'accroche est raccourcie si besoin), sauf
  // si un titre/texte dédié au référencement a été renseigné.
  const tail = ` ${training.duration} · Qualiopi · finançable OPCO.`;
  return pageMetadata({
    title: training.seoTitle ?? training.title,
    description: training.seoDescription ?? `${clip(training.intro, 158 - tail.length)}${tail}`,
    path: `/formations/${service.slug}/${training.slug}`,
  });
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
    { label: "Durée", value: training.durationDetail || training.duration },
    ...(training.recycling ? [{ label: "Recyclage", value: training.recycling }] : []),
    { label: "Prérequis", value: training.prerequisites },
    ...(training.effectif
      ? [{ label: "Effectif", value: training.effectif }]
      : []),
    { label: "Validation", value: training.certification },
    ...(legal.accessDelayShort || legal.accessDelay
      ? [{ label: "Délai d'accès", value: legal.accessDelayShort || legal.accessDelay }]
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
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Onsite",
      location: {
        "@type": "Place",
        name: "Dans les locaux du client, Hauts-de-France",
      },
    },
  };

  return (
    <PageThemeScope overrides={pages.training.theme}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />

      {/* Hero : grande photo de fond. Remonte sous l'en-tête (sticky,
          semi-transparent) pour que la photo continue jusqu'en haut de
          la page au lieu de s'arrêter net dessous. */}
      <section className="page-hero relative -mt-[86px] overflow-hidden px-6 pt-[112px] sm:-mt-[98px] sm:pt-[154px] pt-[126px] pb-16 sm:pt-[154px] sm:pb-24">
        <div className="hero-photo-fade absolute inset-0">
          <Visual
            src={training.heroImage || training.image || service.heroImage || service.image}
            alt={training.imageAlt || training.title}
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-surface/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-surface/65 via-surface/35 to-surface/45" />
        </div>

        <div className="on-surface relative mx-auto max-w-6xl">
          {/* Sur téléphone, un simple lien retour remplace le fil d'Ariane. */}
          <Link
            href={`/formations/${service.slug}`}
            className="crumbs mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent sm:hidden"
          >
            <span aria-hidden="true">←</span> {service.title}
          </Link>
          <div className="crumbs mb-6 hidden text-sm text-muted sm:block">
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

          {/* Sur grand écran, la colonne de droite reste libre : l'encart
              récapitulatif remonte à cet endroit, à côté du titre. */}
          <div className="lg:pr-[400px]">
            <div className="flex flex-wrap items-center gap-3">
              <p className="hidden text-sm font-semibold text-surface-accent sm:block">
                {service.title}
              </p>
            </div>
            <h1 className="mt-3 max-w-3xl text-[2.3rem] font-bold leading-[1.05] tracking-tight sm:text-5xl">
              {training.title}
            </h1>
            <p className="page-intro mt-5 max-w-xl whitespace-pre-line text-muted">{training.intro}</p>
          </div>
        </div>
      </section>

      {/* Programme (encadré foncé) + encart récapitulatif : deux colonnes,
          l'encart reste collé (sticky) à côté du programme sur grand écran. */}
      <section className="overflow-x-clip px-6 pb-14 sm:pb-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_360px] lg:items-start">
          <div className="grid gap-10">
            {training.programme.length > 0 && (
              <div>
                {/* Seul le titre est posé sur une bande foncée pleine
                    largeur, dans la continuité du bas de la photo. */}
                <div className="on-surface relative py-8 sm:py-10 before:absolute before:inset-y-0 before:-left-[100vw] before:-right-[100vw] before:bg-surface">
                  <h2 className="relative font-semibold tracking-tight text-xl sm:text-2xl">
                    {pages.training.programmeTitle}
                  </h2>
                </div>

                <div className="group/programme mt-4 divide-y divide-border">
                  {training.programme.map((module, i) => (
                    <Reveal key={module.title} delay={i * 0.1} className="py-7 last:pb-0">
                      {/* L'opacité de survol vit sur ce div interne, séparé de
                          celui que Reveal anime : Framer Motion laisse un style
                          inline opacity:1 après l'entrée, qui écraserait sinon
                          cette classe. */}
                      <div className="grid gap-3 opacity-100 transition-opacity duration-300 hover:!opacity-100 group-hover/programme:opacity-40 sm:grid-cols-[100px_1fr] sm:gap-8">
                        <span className="text-4xl font-semibold text-foreground/80 sm:text-5xl">
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

            {training.objectives && training.objectives.length > 0 && (
              <Reveal className="rounded-2xl border border-border p-6 sm:p-8">
                <h2 className="font-semibold tracking-tight text-xl sm:text-2xl">
                  {pages.training.objectivesTitle || "Objectifs pédagogiques"}
                </h2>
                <p className="mt-2 text-sm text-muted">À l&apos;issue de la formation, le stagiaire sera capable de :</p>
                <ul className="mt-5 grid gap-3">
                  {training.objectives.map((objective) => (
                    <li key={objective} className="flex gap-3">
                      <svg viewBox="0 0 20 20" aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-accent">
                        <circle cx="10" cy="10" r="9" fill="none" stroke="currentColor" strokeWidth="1.4" />
                        <path d="M6 10.2l2.6 2.6L14 7.4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>{objective.replace(/^[ÊEêe]tre capable (de |d['’])/, "").replace(/^./, (c) => c.toUpperCase())}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {training.description.length > 0 && (
              <Reveal className="space-y-4 text-muted">
                {training.description.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </Reveal>
            )}
          </div>

          {/* Encart récapitulatif : passe en premier sur mobile (juste après
              le programme) pour ne pas noyer les infos clés sous le mur de
              texte qui suit ; reprend sa place à droite à partir de lg. */}
          <aside className="relative z-10 order-first mt-10 sm:mt-12 lg:order-none lg:sticky lg:top-24 lg:-mt-80">
            <div className="rounded-lg border border-border bg-surface-2 p-6 shadow-[0_18px_40px_-8px_rgba(0,0,0,0.55)] sm:p-7">
              {/* Sur téléphone, le titre vient d'être lu juste au-dessus. */}
              <div className="mb-6 hidden border-b border-border pb-6 lg:block">
                <p className="text-xs font-semibold uppercase tracking-wide text-surface-accent">
                  {service.title}
                </p>
                {/* Simple rappel du titre de la page (pas un titre de section). */}
                <p className="mt-2 text-lg font-semibold leading-snug">{training.title}</p>
              </div>

              <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-1">
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
                className="mt-7 flex w-full items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.03]"
              >
                {pages.training.quoteButton}
              </Link>

              <div className="mt-6 border-t border-border pt-5 text-sm text-muted">
                <p>{pages.training.questionText}</p>
                <a
                  href={telHref(company.phone)}
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

      {/* Public, financement, méthodes, évaluation, accessibilité : bande
          foncée compacte, une rangée de pictogrammes et le texte de celui
          choisi. */}
      <section className="on-surface bg-surface px-6 py-12 sm:py-16">
        <Reveal className="mx-auto max-w-6xl">
          <TrainingInfoTabs
            rows={[
              { icon: "audience", title: pages.training.audienceTitle, text: training.audience },
              { icon: "funding", title: pages.training.fundingTitle, text: training.funding },
              { icon: "methods", title: pages.training.methodsTitle, text: trainingInfo.methods },
              { icon: "evaluation", title: pages.training.evaluationTitle, text: trainingInfo.evaluation },
              {
                icon: "accessibility",
                title: pages.training.accessibilityTitle,
                text: `${accessibility.text} Contact : ${accessibility.referent}, ${company.email}.`,
              },
            ].filter((row) => row.text)}
          />
        </Reveal>
      </section>

      {/* Autres formations du domaine : même rangée de cartes que les
          secteurs de l'accueil, terminée par l'encart « formation absente ». */}
      <section className="overflow-x-clip px-6 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <CardRail
            title={otherTrainings.length > 0 ? "Nos autres\nformations" : pages.sector.customTitle}
            action={
              <Link
                href={`/formations/${service.slug}`}
                className="underline-link inline-block border-b pb-0.5 text-xs font-bold uppercase tracking-[0.12em] transition-opacity hover:opacity-70"
              >
                {service.title}
              </Link>
            }
            cards={otherTrainings.map((t) => ({
              title: t.title,
              href: `/formations/${service.slug}/${t.slug}`,
              image: t.image ?? service.image,
              imageAlt: t.imageAlt,
              text: t.intro,
              subtitle: t.duration,
            }))}
            end={
              <div className="on-surface relative flex h-full flex-col items-center justify-center rounded-2xl bg-surface p-5 text-center">
                {(pages.sector.customBadge ?? "Sans engagement") && (
                  <span className="mb-5 inline-flex -rotate-3 items-center rounded-full bg-[var(--badge-bg,var(--accent))] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[var(--badge-fg,var(--accent-foreground))] shadow-lg">
                    {pages.sector.customBadge ?? "Sans engagement"}
                  </span>
                )}
                <p className="font-heading text-base uppercase leading-tight">{pages.sector.customTitle}</p>
                <p className="mt-3 text-xs leading-relaxed text-muted">
                  {service.unlistedNote || pages.sector.customText}
                </p>
                <Link
                  href={`/contact?formation=${encodeURIComponent(service.title)}`}
                  className="mt-5 inline-flex rounded-lg bg-highlight px-5 py-2.5 text-sm font-semibold text-highlight-foreground transition-transform hover:scale-105"
                >
                  {pages.sector.customButton || "Nous contacter"}
                </Link>
              </div>
            }
          />
        </div>
      </section>
    </PageThemeScope>
  );
}
