"use client";

import { useState } from "react";

export type TrainingInfoRow = { icon: string; title: string; text: string };

// Informations pratiques d'une fiche formation : une rangée de
// pictogrammes légers ; le texte de l'onglet choisi s'affiche dessous.
export default function TrainingInfoTabs({ rows }: { rows: TrainingInfoRow[] }) {
  const [active, setActive] = useState(0);
  const current = rows[active];
  if (!current) return null;

  return (
    <div>
      <div
        role="tablist"
        aria-label="Informations pratiques"
        className="mx-auto flex max-w-4xl flex-wrap justify-center gap-x-4 gap-y-6 sm:gap-x-10"
      >
        {rows.map((row, i) => {
          const selected = i === active;
          return (
            <button
              key={row.icon}
              type="button"
              role="tab"
              id={`info-tab-${row.icon}`}
              aria-selected={selected}
              aria-controls="info-panel"
              onClick={() => setActive(i)}
              className={`group flex w-[6.5rem] flex-col items-center text-center transition-opacity sm:w-32 ${
                selected ? "opacity-100" : "opacity-60 hover:opacity-100"
              }`}
            >
              <InfoIcon name={row.icon} />
              <span
                className={`mt-3 border-b pb-1 text-[11px] font-semibold uppercase leading-tight tracking-[0.12em] ${
                  selected ? "border-current" : "border-transparent"
                }`}
              >
                {row.title}
              </span>
            </button>
          );
        })}
      </div>

      <div
        id="info-panel"
        role="tabpanel"
        aria-labelledby={`info-tab-${current.icon}`}
        className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-muted"
      >
        {current.text}
      </div>
    </div>
  );
}

// Pictogrammes au trait fin et arrondi, avec un détail de couleur.
function InfoIcon({ name }: { name: string }) {
  const common = {
    viewBox: "0 0 32 32",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.3,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-8 w-8",
    "aria-hidden": true,
  };
  const detail = { stroke: "var(--surface-accent)", strokeWidth: 1.5 };
  switch (name) {
    case "audience":
      return (
        <svg {...common}>
          <circle cx="12" cy="11" r="4" />
          <path d="M5 25c.8-4.3 3.6-6.8 7-6.8s6.2 2.5 7 6.8" />
          <circle cx="22.5" cy="12.5" r="3" {...detail} />
          <path d="M21 19c3-.4 5.4 1.6 6 5.2" {...detail} />
        </svg>
      );
    case "funding":
      return (
        <svg {...common}>
          <rect x="4" y="9" width="24" height="15" rx="3.5" />
          <path d="M4 14h24" />
          <circle cx="22" cy="19" r="1.6" {...detail} />
          <path d="M8 19h6" {...detail} />
        </svg>
      );
    case "methods":
      return (
        <svg {...common}>
          <rect x="4" y="6" width="24" height="16" rx="3" />
          <path d="M12 27h8M16 22v5" />
          <path d="M9.5 17l4-4 3 3 5.5-5.5" {...detail} />
        </svg>
      );
    case "evaluation":
      return (
        <svg {...common}>
          <rect x="7" y="5" width="18" height="23" rx="3" />
          <path d="M12.5 5v-.5a1.5 1.5 0 0 1 1.5-1.5h4a1.5 1.5 0 0 1 1.5 1.5V5" />
          <path d="M11.5 16l3 3 6-6.5" {...detail} />
          <path d="M11.5 23h9" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="16" cy="6" r="2" {...detail} />
          <path d="M8 11.5c5.3 1.3 10.7 1.3 16 0" />
          <path d="M16 12.5v6.5M16 19l-3.5 8M16 19l3.5 8" />
        </svg>
      );
  }
}
