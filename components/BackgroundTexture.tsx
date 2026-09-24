"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

// Remplace l'aurore animée (halos flous) par un faisceau de lignes
// diagonales nettes, d'épaisseurs différentes et collées les unes aux
// autres, séparant deux teintes du thème (haut-gauche vers bas-droite).
// Pas de mouvement autonome : elle ne bouge qu'en réponse au défilement.
//
// Le dégradé est construit horizontalement (0-100 % prévisible, quelle
// que soit la taille de l'écran) sur un carré bien plus grand que la
// page, puis tourné de 45°, plutôt que de calculer un angle de dégradé
// directement : les pourcentages d'un dégradé incliné dépendent sinon
// du ratio largeur/hauteur et finissent facilement hors champ.
export default function BackgroundTexture() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const offset = useSpring(scrollY, { stiffness: 45, damping: 20, mass: 0.6 });
  const y = useTransform(offset, [0, 1200], [0, -160]);
  const x = useTransform(offset, [0, 1200], [0, 60]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{ x: reduce ? 0 : x, y: reduce ? 0 : y }}
      >
        <div
          className="absolute left-1/2 top-1/2 h-[250vmax] w-[250vmax] -translate-x-1/2 -translate-y-1/2 rotate-45"
          style={{
            background:
              "linear-gradient(90deg, var(--background) 0%, var(--background) 55%, var(--accent) 55%, var(--accent) calc(55% + 3px), var(--surface-2) calc(55% + 3px), var(--surface-2) calc(55% + 11px), var(--accent) calc(55% + 11px), var(--accent) calc(55% + 16px), var(--surface) calc(55% + 16px), var(--surface) 100%)",
          }}
        />
      </motion.div>
    </div>
  );
}
