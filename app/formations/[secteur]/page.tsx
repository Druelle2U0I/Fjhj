import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageThemeScope from "@/components/PageThemeScope";
import Reveal from "@/components/Reveal";
import TipPopover from "@/components/TipPopover";
import TrainingCard from "@/components/TrainingCard";
import Visual from "@/components/Visual";
import { pages, services } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  return services.map((service) => ({ secteur: service.slug }));
}

export async function generateMetadata(
  props: PageProps<"/formations/[secteur]">,
): Promise<Metadata> {
  const { secteur } = await props.params;
  const service = services.find((s) => s.slug === secteur);
  if (!service) return {};
  return pageMetadata({
    title: service.seoTitle ?? `Formation ${service.title}`,
    description:
      service.seoDescription ??
      (service.summary ? `${service.title} : ${service.summary}` : service.description),
    path: `/formations/${service.slug}`,
  });
}

export default async function SecteurPage(
  props: PageProps<"/formations/[secteur]">,
) {
  const { secteur } = await props.params;
  const service = services.find((s) => s.slug === secteur);
  if (!service) notFound();

  const count = service.trainings.length;

  return (
    <PageThemeScope overrides={pages.sector.theme}>
      {/* Hero : même en-tête que l'accueil, photo plein cadre voilée
          (cadrage réglable dans l'admin). Remonte sous
          l'en-tête (sticky, semi-transparent) pour que la photo continue
          jusqu'en haut de la page au lieu de s'arrêter net dessous. */}
      <section className="page-hero relative -mt-[86px] overflow-hidden px-6 pt-[112px] sm:-mt-[98px] sm:pt-[154px] pt-[126px] pb-16 sm:pt-[154px] sm:pb-24">
        <div className="hero-photo-fade absolute inset-0">
          <Visual
            src={service.heroImage || service.image}
            alt={service.imageAlt || service.title}
            sizes="100vw"
            priority
            objectPosition={service.heroImage ? service.heroImagePosition || "center" : service.heroImagePosition || service.imagePosition || "center"}
          />
          <div className="absolute inset-0 bg-surface/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-surface/65 via-surface/35 to-surface/45" />
        </div>

        <div className="on-surface relative mx-auto max-w-6xl">
          {/* Sur téléphone, un simple lien retour remplace le fil d'Ariane. */}
          <Link
            href="/formations"
            className="crumbs mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-surface-accent sm:hidden"
          >
            <span aria-hidden="true">←</span> Formations
          </Link>
          <div className="crumbs mb-6 hidden text-sm text-muted sm:block">
            <Link href="/formations" className="underline decoration-dotted underline-offset-2 hover:text-surface-accent">
              Formations
            </Link>
            <span className="mx-2">/</span>
            <span>{service.title}</span>
          </div>

          <p className="eyebrow block text-muted">
            {count} formation{count > 1 ? "s" : ""}
          </p>
          <h1 className="mt-3 max-w-3xl text-[2.3rem] font-bold leading-[1.05] tracking-tight sm:text-5xl">
            {service.title}
          </h1>

          <div className="mt-8 max-w-xl">
            <p className="page-intro line-clamp-4 whitespace-pre-line text-muted sm:line-clamp-none">{service.description}</p>
            <div className="mt-7 flex flex-wrap items-center gap-6">
              <Link
                href={`/contact?formation=${encodeURIComponent(service.title)}`}
                className="rounded-lg bg-highlight px-5 py-2.5 text-sm font-semibold text-highlight-foreground transition-transform hover:scale-105 sm:px-6 sm:py-3"
              >
                {pages.sector.quoteMainButton}
              </Link>
              <Link
                href="/formations"
                className="text-sm font-semibold underline underline-offset-4 transition-colors hover:text-surface-accent"
              >
                {pages.sector.catalogueButton}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi former vos équipes : bande foncée pleine largeur, dans le
          prolongement du fondu foncé de la photo d'en-tête. */}
      <section className="on-surface bg-surface px-6 pb-12 pt-2 sm:pb-16">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="border-l-4 border-surface-accent pl-6 sm:pl-8">
              <p className="eyebrow block text-surface-accent">
                {pages.sector.whyEyebrow}
              </p>
              <h2 className="mt-4 max-w-3xl font-semibold tracking-tight text-xl sm:text-2xl">
                {service.why.title}
              </h2>
              <p className="mt-5 max-w-3xl whitespace-pre-line text-muted">{service.why.text}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Catalogue du secteur */}
      <section id="catalogue" className="scroll-mt-24 px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="font-semibold tracking-tight text-xl sm:text-2xl">
              {pages.sector.listTitle}
            </h2>
          </Reveal>

          <div className="spotlight mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {service.trainings.map((training, i) => (
              <Reveal key={training.slug} delay={(i % 3) * 0.05}>
                <TrainingCard
                  href={`/formations/${service.slug}/${training.slug}`}
                  title={training.title}
                  intro={training.intro}
                  duration={training.duration}
                  tag={training.category}
                  image={training.image}
                  imageAlt={training.imageAlt}
                  imagePosition={training.imagePosition}
                  quoteHref={`/contact?formation=${encodeURIComponent(training.title)}`}
                  quoteLabel={pages.sector.quoteButton}
                  sizes="(min-width: 1024px) 75vw, (min-width: 640px) 110vw, 200vw"
                />
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* Pour aller plus loin : courts articles toujours visibles (pas une
          FAQ à dérouler), qui répondent à une question que se posent les
          clients de ce domaine. Bande pleine largeur, dans le même esprit
          sombre que la bande « Pourquoi former vos équipes » plus haut. */}
      {service.articles && service.articles.length > 0 && (
        <section className="on-surface bg-surface px-6 py-14 sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[280px_1fr] lg:gap-16">
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <p className="eyebrow block text-surface-accent">
                Pour aller plus loin
              </p>
              <h2 className="font-heading mt-4 text-3xl sm:text-4xl">Articles</h2>
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-2">
              {service.articles.map((article, i) => (
                <Reveal key={article.title} delay={(i % 2) * 0.05}>
                  <article className="h-full rounded-lg border border-border bg-surface-2 p-6">
                    <h3 className="font-semibold leading-snug">{article.title}</h3>
                    <p className="mt-3 whitespace-pre-line text-sm text-muted">
                      {article.text}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* « Le saviez-vous ? » : flotte en bas à droite pendant le défilement
          et s'arrête avant la bande de contact (placé juste avant elle). */}
      {service.tip && <TipPopover title={service.tip.title} text={service.tip.text} />}

      {/* Encart final « formation absente » (textes modifiables dans l'admin,
          Pages des domaines → Encadré final). */}
      <section className="px-6 pb-16 pt-6 sm:pb-20">
        <Reveal className="relative mx-auto max-w-3xl">
          {(pages.sector.customBadge ?? "Sans engagement") && (
            <span className="absolute -top-4 left-1/2 z-10 inline-flex -translate-x-1/2 -rotate-3 items-center rounded-full bg-[var(--badge-bg,var(--accent))] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[var(--badge-fg,var(--accent-foreground))] shadow-lg">
              {pages.sector.customBadge ?? "Sans engagement"}
            </span>
          )}
          <div className="on-surface rounded-lg border border-border bg-surface px-6 pb-7 pt-9 text-center shadow-xl shadow-black/10 sm:px-10 sm:pb-8 sm:pt-10">
            <h2 className="text-xl sm:text-2xl">{pages.sector.customTitle}</h2>
            <p className="mx-auto mt-2 max-w-xl whitespace-pre-line text-muted">
              {service.unlistedNote || pages.sector.customText}
            </p>
            <Link
              href={`/contact?formation=${encodeURIComponent(service.title)}`}
              className="mt-5 inline-flex rounded-lg bg-highlight px-6 py-3 text-sm font-semibold text-highlight-foreground transition-transform hover:scale-105"
            >
              {pages.sector.customButton || "Nous contacter"}
            </Link>
          </div>
        </Reveal>
      </section>
    </PageThemeScope>
  );
}
