"use client";

import { useEffect, useState } from "react";
import Reveal from "@/components/Reveal";
import { funding } from "@/lib/data";

const AUTOPLAY_MS = 4000;

export default function FundingSteps() {
  const steps = funding.steps ?? [];
  const n = steps.length;
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!autoplay || hovered || n === 0) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % n);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [autoplay, hovered, n]);

  if (n === 0) return null;

  const progress = n > 1 ? (active / (n - 1)) * 100 : 0;

  function select(i: number) {
    setActive(i);
    setAutoplay(false);
  }

  return (
    // Présentation comme « À propos » sur l'accueil : le texte d'un côté,
    // une grande carte des étapes de l'autre.
    <div className="mt-14 grid items-center gap-8 sm:grid-cols-[1fr_1.25fr] sm:gap-10 lg:gap-14">
      <Reveal className="text-center">
        {funding.stepsTitle && (
          <h2 className="mx-auto max-w-md text-xl sm:text-2xl">{funding.stepsTitle}</h2>
        )}
        {funding.stepsText && (
          <p className="mx-auto mt-4 max-w-md text-base text-muted sm:text-lg">
            {funding.stepsText}
          </p>
        )}
      </Reveal>

      <Reveal delay={0.1}>
        <div
          className="dyn-card on-surface relative flex aspect-[10/13] flex-col justify-between overflow-hidden rounded-2xl bg-surface p-7 sm:p-10"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Grand numéro de l'étape, en partie coupé par le bord de la carte. */}
          <span
            aria-hidden="true"
            className="font-heading pointer-events-none absolute -right-6 -top-12 select-none text-[13rem] leading-none text-surface-accent/15 sm:-top-20 sm:text-[20rem]"
          >
            {String(active + 1).padStart(2, "0")}
          </span>

          {/* Toutes les étapes restent dans le DOM (empilées dans la même
              cellule) pour rester lisibles sans JavaScript ; seule
              l'opacité change pour le fondu. */}
          <div className="relative mt-auto grid">
            {steps.map((step, i) => (
              <div
                key={step.title}
                aria-hidden={i !== active}
                className={`col-start-1 row-start-1 transition-all duration-500 ease-out ${
                  i === active
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-2 opacity-0"
                }`}
              >
                <p className="eyebrow block text-surface-accent">
                  Étape {i + 1} sur {n}
                </p>
                <h3 className="mt-3 text-2xl sm:text-3xl">{step.title}</h3>
                <p className="mt-4 max-w-xl text-base text-muted sm:text-lg">
                  {step.text}
                </p>
              </div>
            ))}
          </div>

          {/* Curseur : glissable à la souris, au doigt ou au clavier. */}
          <div className="relative mt-10">
            <input
              type="range"
              min={0}
              max={n - 1}
              step={1}
              value={active}
              onChange={(e) => select(Number(e.target.value))}
              aria-label="Étape du processus de financement"
              aria-valuetext={steps[active].title}
              className="funding-slider w-full"
              style={
                {
                  "--funding-slider-progress": `${progress}%`,
                } as React.CSSProperties
              }
            />
          </div>
        </div>
      </Reveal>
    </div>
  );
}
