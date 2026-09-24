import AnimatedStat from "@/components/AnimatedStat";
import Reveal from "@/components/Reveal";
import Visual from "@/components/Visual";
import { home, stats } from "@/lib/data";

// Bande pleine largeur (photo bord à bord, pas de conteneur à 1200px) qui
// casse le rythme "carte, carte, carte" en intercalant une photo et les
// chiffres clés. Réutilisée sur plusieurs pages pour garder un rythme
// cohérent d'une page à l'autre.
export default function StatsBand() {
  if (!home.statsBandImage) return null;

  return (
    <section className="relative overflow-hidden py-12 sm:py-16">
      <div className="absolute inset-0">
        <Visual
          src={home.statsBandImage}
          alt={home.statsBandImageAlt ?? ""}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-background/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/70" />
      </div>

      <div className="relative mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 sm:grid-cols-4">
        {stats.map((stat) => (
          <Reveal key={stat.label} className="text-center">
            <p className="text-3xl font-semibold text-accent sm:text-4xl">
              <AnimatedStat value={stat.value} />
            </p>
            <p className="mt-1 text-xs text-muted sm:text-sm">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
