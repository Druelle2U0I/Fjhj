"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Laisse le zoom démarrer avant que la page suivante (souvent préchargée,
// donc quasi instantanée) remplace la carte.
const ZOOM_DELAY_MS = 250;

// Au clic (ou au toucher) sur une carte secteur ou formation, la photo
// zoome avant d'ouvrir la page. Les cartes portent la classe « zoom-card »
// et leur photo « zoom-img » (voir globals.css).
export default function CardPressZoom() {
  const router = useRouter();

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest("a");
      if (!link || link.classList.contains("quote-pill") || link.target === "_blank") return;
      const card = link.closest(".zoom-card");
      if (!card) return;
      const url = new URL(link.href);
      if (url.origin !== window.location.origin) return;

      event.preventDefault();
      card.setAttribute("data-pressed", "");
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.setTimeout(() => router.push(url.pathname + url.search + url.hash), reduce ? 0 : ZOOM_DELAY_MS);
    };
    const reset = () =>
      document.querySelectorAll(".zoom-card[data-pressed]").forEach((card) => card.removeAttribute("data-pressed"));

    // Phase de capture : passe avant le Link de Next, qui renonce alors à
    // naviguer lui-même (event.defaultPrevented).
    document.addEventListener("click", onClick, true);
    window.addEventListener("pageshow", reset);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("pageshow", reset);
    };
  }, [router]);

  return null;
}
