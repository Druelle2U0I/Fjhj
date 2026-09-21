import Reveal from "@/components/Reveal";
import { company, pillars } from "@/lib/data";

export default function About() {
  return (
    <section id="a-propos" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">
            À propos
          </span>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Un organisme de formation certifié Qualiopi, ancré dans les
            Hauts-de-France
          </h2>
          <p className="mt-5 max-w-2xl text-muted">{company.about}</p>
        </Reveal>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.1}>
              <div className="h-full rounded-2xl border border-border bg-surface p-6 transition-shadow hover:shadow-lg">
                <h3 className="text-lg font-semibold">{pillar.title}</h3>
                <p className="mt-2 text-sm text-muted">{pillar.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
