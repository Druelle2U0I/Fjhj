import Reveal from "@/components/Reveal";
import { pillars } from "@/lib/data";

// Quatre pictogrammes fixes (par position, pas par texte : le contenu
// reste modifiable depuis l'admin sans casser l'association icône/pilier).
const ICONS = [
  // Expertise de terrain (viseur)
  <>
    <circle cx="12" cy="12" r="7.5" />
    <circle cx="12" cy="12" r="2" />
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
  </>,
  // Ancrage régional (repère de carte)
  <>
    <path d="M12 21s-6.5-5.7-6.5-11a6.5 6.5 0 1 1 13 0c0 5.3-6.5 11-6.5 11Z" />
    <circle cx="12" cy="10" r="2.3" />
  </>,
  // Qualité Qualiopi (badge)
  <>
    <path d="M12 3.5 15 5l3.5.5-1 3.4 1 3.4L15 13l-3 1.5-3-1.5-3.5.7 1-3.4-1-3.4L9 5Z" />
    <path d="M9 15.5 8 20.5l4-2 4 2-1-5" />
  </>,
  // Accompagnement complet (deux personnes)
  <>
    <circle cx="8.5" cy="8" r="2.5" />
    <circle cx="16" cy="9" r="2" />
    <path d="M3.5 19c.6-3 2.4-4.5 5-4.5s4.4 1.5 5 4.5M14.5 19c.4-2.2 1.7-3.5 4-3.5" />
  </>,
];

function PillarIcon({ index }: { index: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      {ICONS[index % ICONS.length]}
    </svg>
  );
}

export default function PillarsGrid({ className = "" }: { className?: string }) {
  return (
    <div className={`grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 ${className}`}>
      {pillars.map((pillar, i) => (
        <Reveal key={pillar.title} delay={i * 0.08}>
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent">
            <PillarIcon index={i} />
          </span>
          <h3 className="mt-4 font-semibold">{pillar.title}</h3>
          <p className="mt-2 whitespace-pre-line text-sm text-muted">{pillar.text}</p>
        </Reveal>
      ))}
    </div>
  );
}
