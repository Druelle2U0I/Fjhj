import { stats } from "@/lib/data";

// Encart de chiffres clés réutilisé à côté des titres de page qui,
// sinon, laissent la moitié droite de l'écran vide (Formations, Toutes
// les formations, Équipe).
export default function StatsPanel() {
  return (
    <div className="dyn-card grid grid-cols-2 gap-6 rounded-xl border border-border bg-surface p-6 sm:p-8">
      {stats.map((stat) => (
        <div key={stat.label}>
          <p className="text-2xl font-semibold text-accent sm:text-3xl">{stat.value}</p>
          <p className="mt-1 text-xs text-muted sm:text-sm">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
