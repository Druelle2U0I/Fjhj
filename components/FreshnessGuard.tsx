"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// Version du site avec laquelle cette page a été chargée (fixée au build).
const BUILD_ID = process.env.NEXT_PUBLIC_BUILD_ID || "dev";
const CHECK_EVERY_MS = 60_000;

// Après une publication depuis l'admin, le site est reconstruit : une page
// déjà ouverte continuerait sinon d'afficher l'ancienne version en passant
// d'une page à l'autre (navigation sans rechargement). Dès qu'une nouvelle
// version est en ligne, le clic suivant sur un lien recharge la page
// entière, et une page atteinte avec l'ancienne version est rechargée.
export default function FreshnessGuard() {
  const pathname = usePathname();
  const stale = useRef(false);
  const lastCheck = useRef(0);
  const firstPath = useRef(pathname);

  const check = async () => {
    // Jamais dans l'admin : un rechargement y ferait perdre les modifications en cours.
    if (window.location.pathname.startsWith("/admin")) return false;
    if (BUILD_ID === "dev" || stale.current) return stale.current;
    lastCheck.current = Date.now();
    try {
      const res = await fetch("/api/version", { cache: "no-store" });
      const { id } = (await res.json()) as { id?: string };
      if (id && id !== "dev" && id !== BUILD_ID) stale.current = true;
    } catch {}
    return stale.current;
  };

  // Vérification régulière, et au retour sur l'onglet.
  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === "visible" && Date.now() - lastCheck.current > 15_000) check();
    };
    const timer = window.setInterval(check, CHECK_EVERY_MS);
    document.addEventListener("visibilitychange", onVisible);
    check();

    // Une fois une nouvelle version détectée : les liens internes
    // chargent la page complète (donc à jour) au lieu de l'ancienne.
    const onClick = (event: MouseEvent) => {
      if (!stale.current || event.defaultPrevented || event.button !== 0) return;
      if (window.location.pathname.startsWith("/admin")) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.("a");
      if (!link || link.target || link.hasAttribute("download")) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      event.preventDefault();
      window.location.assign(url.href);
    };
    document.addEventListener("click", onClick, true);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisible);
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  // À chaque changement de page : si le site a été republié entre-temps,
  // la page qui vient de s'afficher est rechargée en version à jour.
  useEffect(() => {
    if (pathname === firstPath.current) return;
    firstPath.current = pathname;
    check().then((isStale) => {
      if (isStale) window.location.reload();
    });
  }, [pathname]);

  return null;
}
