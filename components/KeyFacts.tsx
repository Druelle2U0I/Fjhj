import AnimatedStat from "@/components/AnimatedStat";
import { getStats } from "@/lib/recommendation";

// Chiffres clés à droite du titre des pages catalogue : les mêmes que la
// bande de l'accueil, posés directement sur la photo, sans cadre.
export default async function KeyFacts() {
  const stats = await getStats();
  return (
    <dl className="grid grid-cols-2 gap-x-10 gap-y-8">
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col-reverse justify-end">
          <dt className="mt-1 text-sm text-muted">{stat.label}</dt>
          <dd className="font-heading text-4xl text-surface-accent sm:text-5xl">
            <AnimatedStat value={stat.value} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
