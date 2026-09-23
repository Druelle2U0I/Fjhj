"use client";

import { useEffect, useState } from "react";
import Reveal from "@/components/Reveal";
import { funding } from "@/lib/data";

const AUTOPLAY_MS = 4500;

export default function FundingSteps() {
  const steps = funding.steps ?? [];
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!autoplay || hovered || steps.length === 0) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % steps.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [autoplay, hovered, steps.length]);

  if (steps.length === 0) return null;

  function select(i: number) {
    setActive(i);
    setAutoplay(false);
  }

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

      <Reveal delay={0.1} className="mt-10">
        <div
          className="dyn-card rounded-3xl border border-border bg-surface p-6 sm:p-8"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Pastilles numérotées reliées par une barre de progression. */}
          <div
            role="tablist"
            aria-label="Étapes du financement"
            className="flex items-center"
          >
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="flex flex-1 items-center last:flex-none"
              >
                <button
                  type="button"
                  role="tab"
                  id={`funding-step-tab-${i}`}
                  aria-selected={i === active}
                  aria-controls={`funding-step-panel-${i}`}
                  onClick={() => select(i)}
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors duration-300 ${
                    i <= active
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-border text-muted hover:border-accent hover:text-accent"
                  }`}
                >
                  {i + 1}
                </button>
                {i < steps.length - 1 && (
                  <div className="relative mx-2 h-px flex-1 overflow-hidden bg-border sm:mx-3">
                    <div
                      className="absolute inset-y-0 left-0 bg-accent transition-all duration-500 ease-out"
                      style={{ width: i < active ? "100%" : "0%" }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Intitulés, cliquables eux aussi, masqués sur mobile pour ne
              pas surcharger : le contenu ci-dessous suffit. */}
          <div className="mt-3 hidden justify-between gap-2 sm:flex">
            {steps.map((step, i) => (
              <button
                key={step.title}
                type="button"
                onClick={() => select(i)}
                className={`flex-1 text-left text-xs font-medium transition-colors first:text-left last:text-right ${
                  i === active ? "text-foreground" : "text-muted hover:text-foreground"
                }`}
              >
                {step.title}
              </button>
            ))}
          </div>

          {/* Les 4 étapes sont toutes présentes dans le HTML (bon pour le
              référencement et sans JavaScript) ; seule celle sélectionnée
              est visible. */}
          <div className="mt-8">
            {steps.map((step, i) => (
              <div
                key={step.title}
                id={`funding-step-panel-${i}`}
                role="tabpanel"
                aria-labelledby={`funding-step-tab-${i}`}
                hidden={i !== active}
                className="transition-opacity duration-300"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                  Étape {i + 1} sur {steps.length}
                </p>
                <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-muted">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
