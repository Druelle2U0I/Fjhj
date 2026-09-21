import Reveal from "@/components/Reveal";

const pillars = [
  {
    title: "Sur mesure",
    text: "Chaque parcours est construit avec vous, à partir de vos enjeux métiers réels.",
  },
  {
    title: "Formateurs experts",
    text: "Des praticiens en activité, pas seulement des pédagogues.",
  },
  {
    title: "Résultats mesurables",
    text: "Des objectifs clairs et un suivi de la montée en compétences dans le temps.",
  },
];

export default function About() {
  return (
    <section id="a-propos" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">
            À propos
          </span>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Une équipe pédagogique au service de la performance de vos
            équipes
          </h2>
          <p className="mt-5 max-w-2xl text-muted">
            Depuis plus de 12 ans, ENMA Formation accompagne des
            entreprises, des indépendants et des institutions financières
            dans la montée en compétences de leurs collaborateurs, avec une
            exigence : des formations concrètes, directement applicables.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
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
