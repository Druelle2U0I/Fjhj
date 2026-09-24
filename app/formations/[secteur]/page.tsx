import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import Visual from "@/components/Visual";
import { pages, services } from "@/lib/data";

// Nombre de colonnes sur grand écran (3 ou 4) choisi pour éviter une
// carte seule sur la dernière ligne (ex. 7 formations → 4 + 3).
function columnsFor(count: number) {
  if (count % 3 === 0 || count % 3 === 2 || count < 4) return "lg:grid-cols-3";
  return "lg:grid-cols-4";
}

export async function generateStaticParams() {
  return services.map((service) => ({ secteur: service.slug }));
}

// Associe à chaque code d'habilitation (« B2V », « HC »…) le slug de sa
// formation dédiée, en le déduisant du titre (avant le tiret cadratin, ou
// premier mot si le titre n'en a pas).
function trainingCodeMap(trainings: { title: string; slug: string }[]) {
  const map = new Map<string, string>();
  for (const t of trainings) {
    const prefix = t.title.includes(" — ") ? t.title.split(" — ")[0] : t.title.split(" ")[0];
    for (const code of prefix.split(" / ")) {
      map.set(code.trim(), t.slug);
    }
  }
  // « H0B0 » (non-électricien HT + BT) n'a pas de formation dédiée : il
  // pointe vers H0/H0V, la plus proche.
  if (map.has("H0")) map.set("H0B0", map.get("H0")!);
  return map;
}

// Rend cliquable, dans un texte de « parcours », chaque code correspondant
// à une formation dédiée du secteur (les autres mentions, ex. « BT », « HT »,
// restent du texte simple).
function linkifyPath(text: string, codes: Map<string, string>, sectorSlug: string) {
  if (codes.size === 0) return text;
  const tokens = [...codes.keys()].sort((a, b) => b.length - a.length);
  const pattern = new RegExp(`\\b(${tokens.join("|")})\\b`, "g");
  return text.split(pattern).map((part, i) =>
    codes.has(part) ? (
      <Link key={i} href={`/formations/${sectorSlug}/${codes.get(part)}`} className="hover:text-foreground">
        {part}
      </Link>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
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
  const trainingCodes = trainingCodeMap(service.trainings);

  return (
    <>
      {/* Hero : grande photo de fond floutée, voilée. Remonte sous
          l'en-tête (sticky, semi-transparent) pour que la photo continue
          jusqu'en haut de la page au lieu de s'arrêter net dessous. */}
      <section className="relative -mt-[86px] overflow-hidden px-6 pt-[112px] pb-10 sm:-mt-[94px] sm:pt-[154px] sm:pb-24">
        <div className="hero-photo-fade absolute inset-0">
          <div className="absolute inset-0 scale-110 blur-[7px]">
            <Visual
              src={service.image}
              alt=""
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
            className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent sm:hidden"
          >
            <span aria-hidden="true">←</span> Formations
          </Link>
          <div className="mb-6 hidden text-sm text-muted sm:block">
            <Link href="/formations" className="underline decoration-dotted underline-offset-2 hover:text-accent">
              Formations
            </Link>
            <span className="mx-2">/</span>
            <span>{service.title}</span>
          </div>

          <Reveal>
            <p className="text-sm font-semibold text-accent">
              {count} formation{count > 1 ? "s" : ""}
            </p>
            <h1 className="mt-2 max-w-3xl text-2xl font-semibold leading-tight tracking-tight sm:mt-3 sm:text-5xl">
              {service.title}
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 max-w-xl">
              <p className="line-clamp-4 whitespace-pre-line text-base text-foreground/90 sm:line-clamp-none sm:text-lg">{service.description}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href={`/contact?formation=${encodeURIComponent(service.title)}`}
                  className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold sm:px-6 sm:py-3 text-accent-foreground transition-transform hover:scale-105"
                >
                  {pages.sector.quoteMainButton}
                </Link>
                <a
                  href="#catalogue"
                  className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold sm:px-6 sm:py-3 transition-colors hover:border-accent hover:text-accent"
                >
                  {pages.sector.catalogueButton}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pourquoi former vos équipes */}
      <section className="page-band px-6 py-14 sm:py-20">
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

      {/* Parcours les plus vendus / Le saviez-vous, côte à côte : une
          carte pour le premier, un gros point d'interrogation en filigrane
          pour le second (pas une carte de plus). */}
      {(service.popularPaths?.length || service.tip) && (
        <section className="px-6 pt-20">
          <div className="mx-auto max-w-6xl">
            {service.unlistedNote && (
              <Reveal>
                <p className="mb-6 text-sm text-muted">{service.unlistedNote}</p>
              </Reveal>
            )}

            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              {service.popularPaths && service.popularPaths.length > 0 && (
                <Reveal className="rounded-lg border border-border bg-surface p-6 sm:p-7">
                  <h3 className="font-semibold">Parcours les plus vendus en formation</h3>
                  <ul className="mt-4 space-y-3 text-sm text-muted">
                    {service.popularPaths.map((item) => (
                      <li key={item} className="border-t border-border pt-3 first:border-t-0 first:pt-0">
                        {linkifyPath(item, trainingCodes, service.slug)}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}

              {service.tip && (
                <Reveal
                  delay={0.05}
                  className={`flex items-center gap-6 ${
                    service.popularPaths && service.popularPaths.length > 0 ? "" : "lg:col-span-2"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="select-none text-[6rem] font-bold leading-none text-foreground/10 sm:text-[8rem]"
                  >
                    ?
                  </span>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-muted">
                      {service.tip.title}
                    </p>
                    <p className="mt-3 max-w-xl text-xl font-medium leading-snug text-foreground">
                      {service.tip.text}
                    </p>
                  </div>
                </Reveal>
              )}
            </div>
          </div>
        </section>
      )}

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
                <article className="dyn-card relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface">
                  <div className="dyn-photo-wrap relative aspect-[16/10] overflow-hidden">
                    <Visual
                      src={training.image}
                      alt={training.imageAlt ?? training.title}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw"
                      className="dyn-photo"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    {training.category && (
                      <span className="domain-tag mb-3 inline-flex w-fit rounded-full border border-white/15 px-3 py-1 text-xs font-semibold">
                        {training.category}
                      </span>
                    )}
                    <h3 className="text-lg font-semibold leading-snug">
                      <Link
                        href={`/formations/${service.slug}/${training.slug}`}
                        className="after:absolute after:inset-0 after:content-['']"
                      >
                        {training.title}
                      </Link>
                    </h3>

                    <p className="mt-3 whitespace-pre-line text-sm text-muted">
                      {training.intro}
                    </p>

                    <p className="mt-4 text-sm font-medium text-accent">
                      {training.duration}
                    </p>

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
            <div className="mt-8 flex items-start gap-4 rounded-lg bg-accent p-6 text-accent-foreground">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                className="mt-0.5 h-5 w-5 shrink-0"
              >
                <circle cx="12" cy="12" r="9" />
                <path strokeLinecap="round" d="M12 11v5" />
                <circle cx="12" cy="8" r="0.75" fill="currentColor" stroke="none" />
              </svg>
              <div>
                <p className="font-semibold">{pages.sector.customTitle}</p>
                <p className="mt-1 whitespace-pre-line text-sm text-accent-foreground/80">
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
