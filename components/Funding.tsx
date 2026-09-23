import Reveal from "@/components/Reveal";
import { funding, legal, pages, qualiopiText } from "@/lib/data";

export default function Funding() {
  return (
    <section id="financement" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">
            {pages.funding.eyebrow}
          </span>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            {pages.funding.title}
          </h2>
          <p className="mt-5 max-w-2xl whitespace-pre-line text-muted">{funding.intro}</p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {funding.points.map((point, i) => (
            <Reveal key={point.title} delay={i * 0.1}>
              <div className="dyn-card h-full rounded-2xl border border-border bg-surface p-6">
                <h3 className="text-lg font-semibold">{point.title}</h3>
                <p className="mt-2 whitespace-pre-line text-sm text-muted">{point.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {qualiopiText() && (
            <Reveal className="dyn-card rounded-2xl border border-border bg-surface p-6">
              <h3 className="text-lg font-semibold">Certification Qualiopi</h3>
              <p className="mt-2 text-sm text-muted">{qualiopiText()}</p>
            </Reveal>
          )}
          {legal.resultsIndicators && (
            <Reveal delay={0.1} className="dyn-card rounded-2xl border border-border bg-surface p-6">
              <h3 className="text-lg font-semibold">Nos indicateurs de résultats</h3>
              <p className="mt-2 whitespace-pre-line text-sm text-muted">
                {legal.resultsIndicators}
              </p>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
