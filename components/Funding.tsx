import Link from "next/link";
import FundingSteps from "@/components/FundingSteps";
import Reveal from "@/components/Reveal";
import StatsBand from "@/components/StatsBand";
import { funding, legal, pages, qualiopiText } from "@/lib/data";

export default function Funding() {
  return (
    <>
    <section id="financement" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <span className="text-sm font-semibold text-accent">
            {pages.funding.eyebrow}
          </span>
          <h1 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            {pages.funding.title}
          </h1>
          <p className="mt-5 max-w-2xl whitespace-pre-line text-muted">{funding.intro}</p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {funding.points.map((point, i) => (
            <Reveal key={point.title} delay={i * 0.1}>
              <div className="dyn-card h-full rounded-lg border border-border bg-surface p-6">
                <h3 className="text-lg font-semibold">{point.title}</h3>
                <p className="mt-2 whitespace-pre-line text-sm text-muted">{point.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <FundingSteps />

        <div className="mt-16 grid gap-8 border-t border-border pt-10 sm:grid-cols-2">
          {qualiopiText() && (
            <Reveal>
              <h3 className="text-lg font-semibold">Certification Qualiopi</h3>
              <p className="mt-2 text-sm text-muted">{qualiopiText()}</p>
            </Reveal>
          )}
          {legal.resultsIndicators && (
            <Reveal delay={0.1}>
              <h3 className="text-lg font-semibold">Nos indicateurs de résultats</h3>
              <p className="mt-2 whitespace-pre-line text-sm text-muted">
                {legal.resultsIndicators}
              </p>
            </Reveal>
          )}
        </div>
      </div>
    </section>

    <StatsBand />

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
