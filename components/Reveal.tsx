"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

// Apparition en fondu au défilement, sans clignotement :
// - au premier chargement, un petit script (layout) marque visibles les
//   blocs déjà à l'écran avant le premier affichage ; les autres restent
//   masqués par le CSS jusqu'à ce qu'on y arrive ;
// - lors d'un changement de page, le même tri est fait ici avant
//   l'affichage (useLayoutEffect).
// Le masquage n'est actif que si le script a tourné (classe « reveal-on »
// sur <html>) : sans JavaScript, tout reste visible.
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

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node || node.hasAttribute("data-shown")) return;
    if (node.getBoundingClientRect().top < window.innerHeight) {
      node.setAttribute("data-shown", "instant");
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        node.setAttribute("data-shown", "");
        observer.disconnect();
      },
      { rootMargin: "0px 0px -60px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal=""
      className={className}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
      suppressHydrationWarning
    >
      {children}
    </div>
  );
}
