import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import TipPopover from "@/components/TipPopover";
import Visual from "@/components/Visual";
import { company, pages, services, telHref } from "@/lib/data";

// Nombre de colonnes sur grand écran (3 ou 4) choisi pour éviter une
// carte seule sur la dernière ligne (ex. 7 formations → 4 + 3).
function columnsFor(count: number) {
  if (count % 3 === 0 || count % 3 === 2 || count < 4) return "lg:grid-cols-3";
  return "lg:grid-cols-4";
}

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
    description: service.summary
      ? `${service.title} : ${service.summary}`
      : service.description.split(/(?<=\.)\s/)[0],
    alternates: { canonical: `/formations/${service.slug}` },
  };
}

export default async function SecteurPage(
  props: PageProps<"/formations/[secteur]">,
) {
  const { secteur } = await props.params;
  const service = services.find((s) => s.slug === secteur);
  if (!service) notFound();

  const count = service.trainings.length;

  return (
    <>
      {/* Hero : grande photo de fond floutée, voilée. Remonte sous
          l'en-tête (sticky, semi-transparent) pour que la photo continue
          jusqu'en haut de la page au lieu de s'arrêter net dessous. */}
      <section className="page-hero relative -mt-[86px] overflow-hidden px-6 pt-[112px] pb-10 sm:-mt-[94px] sm:pt-[154px] sm:pb-24">
        <div className="hero-photo-fade absolute inset-0">
          <div className="absolute inset-0 scale-110 blur-[7px]">
            <Visual
              src={service.image}
              alt={service.imageAlt || service.title}
              sizes="100vw"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-surface/35" />
          <div className="absolute inset-0 bg-gradient-to-b from-surface/50 via-surface/20 to-surface/35" />
        </div>

        <div className="on-surface relative mx-auto max-w-6xl">
          {/* Sur téléphone, un simple lien retour remplace le fil d'Ariane. */}
          <Link
            href="/formations"
            className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-surface-accent sm:hidden"
          >
            <span aria-hidden="true">←</span> Formations
          </Link>
          <div className="mb-6 hidden text-sm text-muted sm:block">
            <Link href="/formations" className="underline decoration-dotted underline-offset-2 hover:text-surface-accent">
              Formations
            </Link>
            <span className="mx-2">/</span>
            <span>{service.title}</span>
          </div>

          <p className="text-sm font-semibold text-surface-accent">
            {count} formation{count > 1 ? "s" : ""}
          </p>
          <h1 className="mt-2 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:mt-3 sm:text-6xl">
            {service.title}
          </h1>

          <div className="mt-8 max-w-xl">
            <p className="line-clamp-4 whitespace-pre-line text-base text-foreground/90 sm:line-clamp-none sm:text-lg">{service.description}</p>
            <div className="mt-7 flex flex-wrap items-center gap-6">
              <Link
                href={`/contact?formation=${encodeURIComponent(service.title)}`}
                className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold sm:px-6 sm:py-3 text-accent-foreground transition-transform hover:scale-105"
              >
                {pages.sector.quoteMainButton}
              </Link>
              <a
                href="#catalogue"
                className="text-sm font-semibold underline underline-offset-4 transition-colors hover:text-surface-accent"
              >
                {pages.sector.catalogueButton}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi former vos équipes */}
      <section className="px-6 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="border-l-4 border-accent pl-6 sm:pl-8">
              <p className="text-sm font-semibold text-accent">
                {pages.sector.whyEyebrow}
              </p>
              <h2 className="mt-4 max-w-3xl text-2xl font-semibold tracking-tight sm:text-3xl">
                {service.why.title}
              </h2>
              <p className="mt-5 max-w-3xl whitespace-pre-line text-muted">{service.why.text}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Catalogue du secteur */}
      <section id="catalogue" className="scroll-mt-24 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              {pages.sector.listTitle}
            </h2>
          </Reveal>

          <div className={`mt-8 grid gap-6 sm:grid-cols-2 ${columnsFor(service.trainings.length)}`}>
            {service.trainings.map((training, i) => (
              <Reveal key={training.slug} delay={(i % 3) * 0.05}>
                <article className="dyn-card group relative flex h-full flex-col overflow-hidden rounded-lg">
                  <div className="relative flex aspect-[4/5] flex-col justify-end overflow-hidden">
                    <Visual
                      src={training.image}
                      alt={training.imageAlt ?? training.title}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw"
                      className="transition-transform duration-500 ease-out group-hover:scale-[1.15] group-hover:duration-[6000ms]"
                      objectPosition={training.imagePosition}
                    />
                    <div className="card-veil absolute inset-0" />
                    <div className="relative p-6">
                      {training.category && (
                        <span className="domain-tag mb-3 inline-flex w-fit rounded-full border border-white/15 px-3 py-1 text-xs font-semibold">
                          {training.category}
                        </span>
                      )}
                      <h3 className="text-lg font-semibold leading-snug text-white">
                        <Link
                          href={`/formations/${service.slug}/${training.slug}`}
                          className="after:absolute after:inset-0 after:content-['']"
                        >
                          {training.title}
                        </Link>
                      </h3>

                      <p className="mt-3 line-clamp-2 whitespace-pre-line text-sm text-white/80">
                        {training.intro}
                      </p>

                      <p className="mt-3 text-sm font-medium text-white">
                        {training.duration}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/contact?formation=${encodeURIComponent(training.title)}`}
                    className="absolute bottom-5 right-5 z-10 inline-flex translate-y-2 items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-accent-foreground opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
                  >
                    {pages.sector.quoteButton}
                    <span aria-hidden="true">→</span>
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* « Le saviez-vous ? » : flotte en bas à droite pendant le défilement
          et s'arrête avant la bande de contact (placé juste avant elle). */}
      {service.tip && <TipPopover title={service.tip.title} text={service.tip.text} />}

      {/* Bande pleine largeur, photo du domaine voilée : formation absente
          de la liste, parcours sur mesure. */}
      <section className="relative overflow-hidden px-6 py-10 sm:py-12">
        <div className="absolute inset-0">
          <Visual src={service.image} alt={service.imageAlt || service.title} sizes="100vw" />
          <div className="absolute inset-0 bg-surface/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-surface/70" />
        </div>
        <Reveal className="on-surface relative mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-surface-accent">{pages.sector.customTitle}</p>
          <h2 className="mt-2 text-lg font-bold leading-snug tracking-tight sm:text-xl">
            {service.unlistedNote || pages.sector.customText}
          </h2>
          {service.unlistedNote && (
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted">{pages.sector.customText}</p>
          )}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={`/contact?formation=${encodeURIComponent(service.title)}`}
              className="rounded-lg bg-highlight px-5 py-2.5 text-sm font-semibold text-highlight-foreground transition-transform hover:scale-105"
            >
              Nous contacter
            </Link>
            <a
              href={telHref(company.phone)}
              className="rounded-lg border border-current/40 px-5 py-2.5 text-sm font-semibold transition-colors hover:border-current hover:bg-white/10"
            >
              {company.phone}
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
