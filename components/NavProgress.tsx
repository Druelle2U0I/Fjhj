"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Fine barre jaune en haut de l'écran dès qu'on clique sur un lien vers une
// autre page, jusqu'à l'affichage de la nouvelle page : le visiteur voit
// tout de suite que son clic est pris en compte.
export default function NavProgress() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;
      const link = (event.target as HTMLElement).closest("a");
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return;
      setLoading(true);
    };
    // Phase de capture : les liens Next.js annulent le clic natif ensuite.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // Nouvelle page affichée : on masque la barre.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setLoading(false);
  }

  return (
    <div
      aria-hidden="true"
      className={`nav-progress pointer-events-none fixed inset-x-0 top-0 z-[100] h-[3px] origin-left bg-accent ${
        loading ? "is-loading" : ""
      }`}
    />
  );
}
