import Reveal from "@/components/Reveal";
import { pillars } from "@/lib/data";

// Quatre pictogrammes fixes (par position, pas par texte : le contenu
// reste modifiable depuis l'admin sans casser l'association icône/pilier).
const ICONS = [
  // Plateau technique (repère de carte)
  <>
    <path d="M12 21s-6.5-5.7-6.5-11a6.5 6.5 0 1 1 13 0c0 5.3-6.5 11-6.5 11Z" />
    <circle cx="12" cy="10" r="2.3" />
  </>,
  // Sur vos équipements (clé)
  <>
    <path d="M14.5 5.5a4 4 0 0 0 4.9 4.9L20 11l-9 9a2.1 2.1 0 0 1-3-3l9-9 .6.6a4 4 0 0 0-4.9-4.9l2.3 2.3-1.8 1.8Z" />
  </>,
  // Session sous 14 jours (calendrier)
  <>
    <rect x="3.5" y="5" width="17" height="15.5" rx="1.5" />
    <path d="M3.5 9.5h17M8 3v4M16 3v4" />
  </>,
  // Réponse sous 24 heures (horloge)
  <>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
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
