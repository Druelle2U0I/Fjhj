import Link from "next/link";
import FundingSteps from "@/components/FundingSteps";
import HeroBackgroundPhoto from "@/components/HeroBackgroundPhoto";
import Reveal from "@/components/Reveal";
import { funding, legal, pages } from "@/lib/data";
import { getStats } from "@/lib/recommendation";

function QualiopiCard() {
  if (!legal.qualiopiCertificate) return null;

  return (
    <div className="dyn-card rounded-lg border border-border bg-surface p-6 sm:p-8">
      {legal.qualiopiLogo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={legal.qualiopiLogo}
          alt="Logo Qualiopi — processus certifié, République française"
          className="h-28 w-auto bg-white p-2"
        />
      ) : (
        <span className="flex h-16 w-fit flex-col items-center justify-center rounded-lg bg-white px-5 font-bold text-[#0b032b]">
          <span className="text-lg tracking-tight">Qualiopi</span>
          <span className="text-[9px] font-semibold uppercase tracking-wider">processus certifié</span>
        </span>
      )}
      <p className="mt-5 text-lg font-semibold">
        Certificat n&deg; {legal.qualiopiCertificate}
      </p>
      {legal.qualiopiCategory && (
        <p className="mt-2 text-sm text-muted">
          Délivré au titre de la catégorie d&apos;action suivante :{" "}
          <span className="font-semibold text-foreground">{legal.qualiopiCategory}</span>.
        </p>
      )}
      {legal.qualiopiCertificateUrl && (
        <a
          href={legal.qualiopiCertificateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-sm font-semibold text-surface-accent underline underline-offset-2"
        >
          Voir notre certificat Qualiopi
        </a>
      )}
    </div>
  );
}

export default async function Funding() {
  // {recommandation} est remplacé par le pourcentage lu dans le
  // questionnaire de fin de session (même chiffre que l'accueil).
  const stats = await getStats();
  const recommendation = stats.find((stat) => stat.source === "recommendation")?.value ?? "";
  const indicators = legal.resultsIndicators?.replace("{recommandation}", recommendation);

  return (
    <>
    <section id="financement" className="page-hero relative -mt-[86px] overflow-hidden px-6 pt-[112px] pb-10 sm:-mt-[98px] sm:pt-[148px] sm:pb-14">
      {pages.funding.heroImage && (
        <HeroBackgroundPhoto src={pages.funding.heroImage} alt={pages.funding.title} />
      )}
      <div className={`relative mx-auto max-w-6xl ${pages.funding.heroImage ? "on-surface" : ""}`}>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <span className="eyebrow block text-muted">
              {pages.funding.eyebrow}
            </span>
            <h1 className="mt-3 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
              {pages.funding.title}
            </h1>
            <p className="page-intro mt-5 max-w-2xl whitespace-pre-line text-muted">{funding.intro}</p>
          </div>

          <QualiopiCard />
        </div>
      </div>
    </section>

    <section className="px-6 py-10 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 sm:grid-cols-3 lg:divide-x lg:divide-border">
          {funding.points.map((point, i) => (
            <Reveal key={point.title} delay={i * 0.1} className="lg:px-6 lg:first:pl-0">
              <span aria-hidden="true" className="block h-1 w-8 bg-accent" />
              <h3 className="mt-3 text-lg font-semibold">{point.title}</h3>
              <p className="mt-2 whitespace-pre-line text-sm text-muted">{point.text}</p>
            </Reveal>
          ))}
        </div>

        <FundingSteps />

        {funding.opcos && funding.opcos.length > 0 && (
          <Reveal className="mt-10 border-t border-border pt-8">
            <h3 className="text-lg font-semibold">{funding.opcosTitle}</h3>
            {funding.opcosText && (
              <p className="mt-2 max-w-2xl whitespace-pre-line text-sm text-muted">{funding.opcosText}</p>
            )}
            <ul className="mt-6 border-t border-foreground/15">
              {funding.opcos.map((opco) => (
                <li key={opco.name} className="border-b border-foreground/15">
                  <a
                    href={opco.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group grid gap-1 py-4 sm:grid-cols-[12rem_1fr_auto] sm:items-baseline sm:gap-6"
                  >
                    <span className="font-semibold text-foreground group-hover:text-accent">{opco.name}</span>
                    <span className="text-sm text-muted">{opco.sectors}</span>
                    <span className="text-sm text-foreground">
                      {opco.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}{" "}
                      <span aria-hidden="true">↗</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        {indicators && (
          <Reveal className="mt-10 border-t border-border pt-8">
            <h3 className="text-lg font-semibold">Nos indicateurs de résultats</h3>
            <p className="mt-2 max-w-2xl whitespace-pre-line text-sm text-muted">
              {indicators}
            </p>
          </Reveal>
        )}
      </div>
    </section>

    <section className="px-6 py-10 text-center">
      <Reveal className="relative mx-auto max-w-2xl">
        <span className="absolute -top-4 left-1/2 z-10 inline-flex -translate-x-1/2 -rotate-3 items-center rounded-full bg-accent px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-accent-foreground shadow-lg">
          Sans engagement
        </span>
        <div className="rounded-lg border border-border bg-surface p-10 pt-12 shadow-xl shadow-black/5 sm:p-14 sm:pt-16">
          <h2 className="font-semibold tracking-tight text-xl sm:text-2xl">
            Un projet de formation à financer ?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">
            Décrivez-nous votre besoin : nous établissons le devis, vérifions l&apos;éligibilité OPCO et montons le dossier avec vous.
          </p>
          <Link
            href="/contact"
            className="mt-7 inline-flex rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-105"
          >
            Nous contacter
          </Link>
        </div>
      </Reveal>
    </section>
    </>
  );
}
