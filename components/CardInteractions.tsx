"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Laisse le zoom démarrer avant que la page suivante (souvent préchargée,
// donc quasi instantanée) remplace la carte.
const ZOOM_DELAY_MS = 250;

// Comportements des cartes secteur et formation (classe « zoom-card »,
// photo « zoom-img ») :
// - survol : l'attribut data-hover suit le curseur. On ne s'appuie pas sur
//   :hover, que Safari sur iPad (trackpad) laisse parfois « collé » sur la
//   dernière carte survolée ;
// - clic ou toucher : la photo zoome (data-pressed) avant d'ouvrir la page.
export default function CardInteractions() {
  const router = useRouter();

  useEffect(() => {
    let hovered: Element | null = null;
    let pointer: { x: number; y: number } | null = null;
    let frame = 0;

    const setHovered = (card: Element | null) => {
      if (card === hovered) return;
      hovered?.removeAttribute("data-hover");
      card?.setAttribute("data-hover", "");
      hovered = card;
    };
    const refresh = () => {
      frame = 0;
      if (!pointer) return setHovered(null);
      const under = document.elementFromPoint(pointer.x, pointer.y);
      setHovered(under?.closest(".zoom-card") ?? null);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(refresh);
    };

    const onMove = (event: PointerEvent) => {
      // Doigt ou stylet : pas d'effet de survol.
      pointer = event.pointerType === "mouse" ? { x: event.clientX, y: event.clientY } : null;
      schedule();
    };
    const onOut = (event: PointerEvent) => {
      if (event.relatedTarget) return;
      pointer = null;
      schedule();
    };

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
    const onPageShow = () => {
      document.querySelectorAll(".zoom-card[data-pressed]").forEach((card) => card.removeAttribute("data-pressed"));
      setHovered(null);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerdown", onMove, { passive: true });
    document.addEventListener("pointerout", onOut, { passive: true });
    // Défilement (page ou rangée de cartes) : la carte sous le curseur change.
    document.addEventListener("scroll", schedule, { passive: true, capture: true });
    // Phase de capture : passe avant le Link de Next, qui renonce alors à
    // naviguer lui-même (event.defaultPrevented).
    document.addEventListener("click", onClick, true);
    window.addEventListener("pageshow", onPageShow);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerdown", onMove);
      document.removeEventListener("pointerout", onOut);
      document.removeEventListener("scroll", schedule, { capture: true });
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, [router]);

  return null;
}
