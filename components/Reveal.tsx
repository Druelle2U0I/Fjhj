"use client";

import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

// Apparition en fondu des sections au défilement.
// Le contenu est envoyé visible par le serveur : ce qui se trouve déjà à
// l'écran au chargement s'affiche tout de suite, sans attendre le
// JavaScript. Seuls les blocs situés plus bas sont masqués après le
// chargement puis révélés quand on y arrive.
export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reduce) return;
    if (node.getBoundingClientRect().top < window.innerHeight) return;

    controls.set({ opacity: 0, y: 24 });
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        controls.start({ opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: "easeOut" } });
        observer.disconnect();
      },
      { rootMargin: "0px 0px -80px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [controls, delay, reduce]);

  return (
    <motion.div ref={ref} initial={false} animate={controls} className={className}>
      {children}
    </motion.div>
  );
}
