"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

// Fond « aurore » fixé derrière toutes les pages du site. Il dérive lentement tout
// seul (animation CSS) et, en plus, se déplace, tourne et change de teinte
// au fil du défilement. Le ressort lisse le mouvement pour qu'il suive le
// scroll avec un léger retard, sans à-coups.
export default function AuroraBackdrop() {
  const reduce = useReducedMotion();
  const { scrollYProgress, scrollY } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 40, damping: 20, mass: 0.6 });
  const offset = useSpring(scrollY, { stiffness: 40, damping: 20, mass: 0.6 });

  const x = useTransform(progress, [0, 0.35, 0.7, 1], ["0%", "14%", "-12%", "6%"]);
  const y = useTransform(progress, [0, 1], ["0%", "-18%"]);
  const rotate = useTransform(progress, [0, 1], [0, 70]);
  const scale = useTransform(progress, [0, 0.5, 1], [1, 1.2, 1.05]);
  const alternate = useTransform(progress, [0, 0.4, 0.8, 1], [0, 1, 0.3, 0.8]);
  // Un peu moins intense une fois passé le haut de page, pour garder les
  // sections suivantes lisibles.
  const opacity = useTransform(offset, [0, 900], [1, 0.6]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { x, y, rotate, scale, opacity }}
      >
        <div className="hero-aurora__veil" />
        <motion.div
          className="hero-aurora__veil hero-aurora__veil--alt"
          style={{ opacity: reduce ? 0 : alternate }}
        />
      </motion.div>
    </div>
  );
}
