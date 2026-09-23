import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import Visual from "@/components/Visual";
import { pages, services } from "@/lib/data";

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
    description: `${service.description.slice(0, 150)}…`,
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
      <section className="relative -mt-[86px] overflow-hidden px-6 pt-[126px] pb-16 sm:-mt-[94px] sm:pt-[154px] sm:pb-24">
        <div className="hero-photo-fade absolute inset-0">
          <div className="absolute inset-0 scale-110 blur-[7px]">
            <Visual
              src={service.image}
              alt=""
              sizes="100vw"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-background/55" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background/60" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-6 text-sm text-muted">
            <Link href="/formations" className="underline decoration-dotted underline-offset-2 hover:text-accent">
              Formations
            </Link>
            <span className="mx-2">/</span>
            <span>{service.title}</span>
          </div>

          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">
              {count} formation{count > 1 ? "s" : ""}
            </p>
            <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">
              {service.title}
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 max-w-xl rounded-3xl border border-border bg-surface/80 p-7 backdrop-blur sm:p-8">
              <p className="whitespace-pre-line text-muted">{service.description}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href={`/contact?formation=${encodeURIComponent(service.title)}`}
                  className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-105"
                >
                  {pages.sector.quoteMainButton}
                </Link>
                <a
                  href="#catalogue"
                  className="rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
                >
                  {pages.sector.catalogueButton}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pourquoi former vos équipes */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="rounded-3xl border border-border bg-surface p-8 sm:p-12">
              <p className="text-sm font-semibold uppercase tracking-wide text-accent">
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
      <section id="catalogue" className="scroll-mt-24 px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              {pages.sector.listTitle}
            </h2>
          </Reveal>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {service.trainings.map((training, i) => (
              <Reveal key={training.slug} delay={(i % 3) * 0.05}>
                <article className="dyn-card relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface">
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-semibold leading-snug">
                      <Link
                        href={`/formations/${service.slug}/${training.slug}`}
                        className="after:absolute after:inset-0 after:content-['']"
                      >
                        {training.title}
                      </Link>
                    </h3>

                    <p className="mt-3 whitespace-pre-line rounded-xl bg-surface-2 px-4 py-3 text-sm text-muted">
                      {training.intro}
                    </p>

                    <p className="mt-4 text-sm font-medium text-accent">
                      {training.duration}
                    </p>

                    <div className="mt-auto pt-5">
                      <div className="dyn-photo-wrap relative aspect-[16/10] overflow-hidden rounded-2xl">
                        <Visual
                          src={training.image}
                          alt={training.imageAlt ?? training.title}
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw"
                          className="dyn-photo"
                        />
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/contact?formation=${encodeURIComponent(training.title)}`}
                    className="relative z-10 flex items-center justify-between border-t border-border px-6 py-4 text-sm font-semibold transition-colors hover:bg-surface-2 hover:text-accent"
                  >
                    {pages.sector.quoteButton}
                    <span aria-hidden="true">→</span>
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-8 flex items-start gap-4 rounded-2xl border-l-4 border-accent bg-accent/10 p-6">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                className="mt-0.5 h-5 w-5 shrink-0 text-accent"
              >
                <circle cx="12" cy="12" r="9" />
                <path strokeLinecap="round" d="M12 11v5" />
                <circle cx="12" cy="8" r="0.75" fill="currentColor" stroke="none" />
              </svg>
              <div>
                <p className="font-semibold">{pages.sector.customTitle}</p>
                <p className="mt-1 whitespace-pre-line text-sm text-muted">
                  {pages.sector.customText}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
