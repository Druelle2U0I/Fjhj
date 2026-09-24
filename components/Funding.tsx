import Link from "next/link";
import FundingSteps from "@/components/FundingSteps";
import Reveal from "@/components/Reveal";
import { funding, legal, pages } from "@/lib/data";

function QualiopiCard() {
  if (!legal.qualiopiCertificate) return null;

  return (
    <div className="dyn-card rounded-xl border border-border bg-surface p-6 sm:p-8">
      {legal.qualiopiLogo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={legal.qualiopiLogo}
          alt="Logo Qualiopi — processus certifié, République française"
          className="h-16 w-auto rounded-lg bg-white p-2"
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
          {legal.qualiopiCategory}.
        </p>
      )}
      {legal.qualiopiCertificateUrl && (
        <a
          href={legal.qualiopiCertificateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-sm font-semibold text-accent underline underline-offset-2"
        >
          Voir notre certificat Qualiopi
        </a>
      )}
    </div>
  );
}

export default function Funding() {
  return (
    <>
    <section id="financement" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <span className="text-sm font-semibold text-muted">
              {pages.funding.eyebrow}
            </span>
            <h1 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
              {pages.funding.title}
            </h1>
            <p className="mt-5 max-w-2xl whitespace-pre-line text-muted">{funding.intro}</p>
          </div>

          <QualiopiCard />
        </div>

        <div className="mt-16 grid gap-8 border-t border-border pt-10 sm:grid-cols-3 lg:divide-x lg:divide-border">
          {funding.points.map((point, i) => (
            <Reveal key={point.title} delay={i * 0.1} className="lg:px-6 lg:first:pl-0">
              <span aria-hidden="true" className="block h-1 w-8 bg-accent" />
              <h3 className="mt-3 text-lg font-semibold">{point.title}</h3>
              <p className="mt-2 whitespace-pre-line text-sm text-muted">{point.text}</p>
            </Reveal>
          ))}
        </div>

        <FundingSteps />

        {legal.resultsIndicators && (
          <Reveal className="mt-16 border-t border-border pt-10">
            <h3 className="text-lg font-semibold">Nos indicateurs de résultats</h3>
            <p className="mt-2 max-w-2xl whitespace-pre-line text-sm text-muted">
              {legal.resultsIndicators}
            </p>
          </Reveal>
        )}
      </div>
    </section>

    {/* Bande pleine largeur en couleur d'accent : rompt le rythme de la
        page et rappelle la couleur de marque sans en introduire une
        nouvelle. */}
    <section className="bg-accent px-6 py-16 text-center text-accent-foreground">
      <Reveal className="mx-auto max-w-2xl">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Un projet de formation à financer ?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-accent-foreground/80">
          Décrivez-nous votre besoin, on s&apos;occupe du reste : devis, éligibilité OPCO et montage du dossier.
        </p>
        <Link
          href="/contact"
          className="mt-7 inline-flex rounded-lg bg-accent-foreground px-6 py-3 text-sm font-semibold text-accent transition-transform hover:scale-105"
        >
          Nous contacter
        </Link>
      </Reveal>
    </section>
    </>
  );
}
