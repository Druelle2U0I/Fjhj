"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import { funding } from "@/lib/data";

export default function FundingSteps() {
  const steps = funding.steps ?? [];
  const n = steps.length;
  const [active, setActive] = useState(0);

  if (n === 0) return null;

  const progress = n > 1 ? (active / (n - 1)) * 100 : 0;

  return (
    <div className="mt-20">
      <Reveal>
        {funding.stepsTitle && (
          <h2 className="max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl">
            {funding.stepsTitle}
          </h2>
        )}
        {funding.stepsText && (
          <p className="mt-3 max-w-2xl text-muted">{funding.stepsText}</p>
        )}
      </Reveal>

      {/* Bureau : les 4 étapes côte à côte, toutes visibles en même temps. */}
      <Reveal delay={0.1} className="mt-10 hidden lg:grid lg:grid-cols-4 lg:divide-x lg:divide-border lg:rounded-xl lg:border lg:border-border lg:bg-surface">
        {steps.map((step, i) => (
          <div key={step.title} className="relative overflow-hidden p-6">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-3 -top-6 select-none text-[6rem] font-bold leading-none text-accent/[0.08]"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="relative text-xs font-semibold uppercase tracking-wide text-accent">
              Étape {i + 1} sur {n}
            </p>
            <h3 className="relative mt-2 text-lg font-semibold tracking-tight">
              {step.title}
            </h3>
            <p className="relative mt-3 text-sm text-muted">{step.text}</p>
          </div>
        ))}
      </Reveal>

      {/* Mobile/tablette : une étape à la fois, curseur cliquable (pas de
          défilement automatique). */}
      <Reveal delay={0.1} className="mt-10 lg:hidden">
        <div className="dyn-card relative overflow-hidden rounded-xl border border-border bg-surface p-6 sm:p-10">
          {/* Grand numéro en filigrane, purement décoratif. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-4 -top-10 select-none text-[10rem] font-bold leading-none text-accent/[0.06] sm:text-[13rem]"
          >
            {String(active + 1).padStart(2, "0")}
          </span>

          {/* Contenu de l'étape active : toutes les étapes restent dans le
              DOM (empilées dans la même cellule de grille) pour rester
              lisibles sans JavaScript et par les moteurs de recherche ;
              seule l'opacité/position change. */}
          <div className="relative grid">
            {steps.map((step, i) => (
              <div
                key={step.title}
                aria-hidden={i !== active}
                className={`col-start-1 row-start-1 transition-all duration-300 ease-out ${
                  i === active
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-2 opacity-0"
                }`}
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                  Étape {i + 1} sur {n}
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-xl text-muted">{step.text}</p>
              </div>
            ))}
          </div>

          {/* Curseur : un vrai slider, glissable à la souris, au doigt ou
              au clavier (flèches). N'avance jamais tout seul. */}
          <div className="relative mt-10 sm:mt-12">
            <input
              type="range"
              min={0}
              max={n - 1}
              step={1}
              value={active}
              onChange={(e) => setActive(Number(e.target.value))}
              aria-label="Étape du processus de financement"
              aria-valuetext={steps[active].title}
              className="funding-slider w-full"
              style={{ "--funding-slider-progress": `${progress}%` } as React.CSSProperties}
            />
            <div className="mt-3 flex justify-between">
              {steps.map((step, i) => (
                <button
                  key={step.title}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-current={i === active}
                  className={`text-xs font-medium transition-colors ${
                    i === active ? "text-foreground" : "text-muted hover:text-foreground"
                  } ${i === 0 ? "text-left" : i === n - 1 ? "text-right" : "hidden sm:block"}`}
                >
                  {step.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
