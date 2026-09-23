"use client";

import { useEffect, useState } from "react";
import { animate } from "framer-motion";

function parseStat(value: string) {
  const match = value.match(/^(\D*)(\d+(?:[.,]\d+)?)(\D*)$/);
  if (!match) return null;
  const [, prefix, numStr, suffix] = match;
  return {
    prefix,
    suffix,
    target: parseFloat(numStr.replace(",", ".")),
    decimals: /[.,]/.test(numStr) ? 1 : 0,
  };
}

export default function AnimatedStat({ value }: { value: string }) {
  const parsed = parseStat(value);
  // Toujours initialisé avec la vraie valeur (identique au HTML rendu par
  // le serveur) : les visiteurs sans JavaScript et les moteurs de
  // recherche voient toujours le bon chiffre, jamais un zéro provisoire.
  // Le compte-à-rebours n'est qu'une décoration ajoutée après coup.
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!parsed) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const controls = animate(0, parsed.target, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (latest) => {
        const formatted = parsed.decimals
          ? latest.toFixed(parsed.decimals)
          : Math.round(latest).toString();
        setDisplay(`${parsed.prefix}${formatted}${parsed.suffix}`);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <span>{display}</span>;
}
