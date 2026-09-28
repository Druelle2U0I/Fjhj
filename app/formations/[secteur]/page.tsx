import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import UnlistedTrainingNote from "@/components/UnlistedTrainingNote";
import Visual from "@/components/Visual";
import { pages, services } from "@/lib/data";

// Sépare le code d'une formation de son intitulé (« B1 / B1V — Exécutant
// électricien… » → « B1 / B1V » + « Exécutant électricien… ») ; pas de code
// si le début du titre est trop long pour en être un.
function splitCode(title: string) {
  const [prefix, ...rest] = title.split(" — ");
  if (rest.length > 0 && prefix.length <= 12) return { code: prefix, name: rest.join(" — ") };
  // Titres sans tiret, ex. « BE Mesurage / Essai / Vérification ».
  const short = title.match(/^([A-Z]{1,2}\d?[A-Z]?) (\p{Lu}.+)$/u);
  if (short) return { code: short[1], name: short[2] };
  return { code: "", name: title };
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
  // Formations regroupées par catégorie (Basse tension, Haute tension…),
  // dans l'ordre d'apparition ; un seul groupe sans titre sinon.
  const hasCodes = service.trainings.some((t) => splitCode(t.title).code);
  const groups: { name?: string; trainings: typeof service.trainings }[] = [];
  for (const training of service.trainings) {
    const name = training.category || undefined;
    const group = groups.find((g) => g.name === name);
    if (group) group.trainings.push(training);
    else groups.push({ name, trainings: [training] });
  }
  const trainingCodes = trainingCodeMap(service.trainings);

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

      {/* Parcours les plus demandés / Le saviez-vous, côte à côte : une
          carte pour le premier, un simple filet pour le second. */}
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
                  <h3 className="font-semibold">Parcours les plus demandés</h3>
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
                  className={`border-l-2 border-foreground/20 pl-6 ${
                    service.popularPaths && service.popularPaths.length > 0 ? "" : "lg:col-span-2"
                  }`}
                >
                  <p className="text-sm font-semibold text-muted">{service.tip.title}</p>
                  <p className="mt-3 max-w-xl text-lg leading-snug text-foreground">
                    {service.tip.text}
                  </p>
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

          {groups.map((group) => (
            <div key={group.name || "all"} className="mt-10">
              {group.name && (
                <h3 className="text-lg font-semibold tracking-tight">{group.name}</h3>
              )}
              <ul className={`${group.name ? "mt-3" : ""} border-t border-foreground/15`}>
                {group.trainings.map((training) => {
                  const { code, name } = splitCode(training.title);
                  return (
                    <li
                      key={training.slug}
                      className={`group relative grid gap-x-6 gap-y-2 border-b border-foreground/15 py-5 sm:items-baseline ${
                        hasCodes ? "sm:grid-cols-[7rem_1fr_11rem_auto]" : "sm:grid-cols-[1fr_11rem_auto]"
                      }`}
                    >
                      {hasCodes && <p className="text-sm font-bold text-foreground">{code}</p>}
                      <div>
                        <Link
                          href={`/formations/${service.slug}/${training.slug}`}
                          className="font-semibold text-foreground transition-colors after:absolute after:inset-0 after:content-[''] group-hover:text-accent"
                        >
                          {name}
                        </Link>
                        {training.intro && (
                          <p className="mt-1 text-sm text-muted">{training.intro}</p>
                        )}
                      </div>
                      <p className="text-sm text-foreground">{training.duration}</p>
                      <Link
                        href={`/contact?formation=${encodeURIComponent(training.title)}`}
                        className="relative z-10 w-fit rounded-sm border border-border px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:border-foreground"
                      >
                        {pages.sector.quoteButton}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          <UnlistedTrainingNote />
        </div>
      </section>
    </>
  );
}
