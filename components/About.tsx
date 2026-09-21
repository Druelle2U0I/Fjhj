import Reveal from "@/components/Reveal";
import Visual from "@/components/Visual";
import { company, home, pillars } from "@/lib/data";

export default function About() {
  return (
    <section id="a-propos" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal className="dyn-photo-wrap dyn-card relative aspect-[4/3] overflow-hidden rounded-3xl border border-border">
            <Visual
              src={home.aboutImage}
              alt={home.aboutImageAlt ?? ""}
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="dyn-photo"
            />
          </Reveal>

          <Reveal delay={0.1}>
            <span className="text-sm font-semibold uppercase tracking-wide text-accent">
              À propos
            </span>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Un organisme de formation certifié Qualiopi, ancré dans les
              Hauts-de-France
            </h2>
            <p className="mt-5 max-w-2xl text-muted">{company.about}</p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.1}>
              <div className="dyn-card h-full rounded-2xl border border-border bg-surface p-6">
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
