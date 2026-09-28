"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// « Le saviez-vous ? » : un gros point d'interrogation qui flotte en bas à
// droite de l'écran pendant le défilement et s'arrête au pied de page
// (position sticky, à placer en dernier dans le contenu de la page). Le
// message s'ouvre dans une bulle au survol (souris) ou au toucher (mobile).
export default function TipPopover({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    // Bande de hauteur nulle collée en bas de l'écran : elle ne prend pas de
    // place dans la page, et le bouton est posé dessus.
    <div className="pointer-events-none sticky bottom-5 z-40 h-0 sm:bottom-8">
      <div
        className="pointer-events-auto absolute bottom-0 right-5 flex flex-col items-end sm:right-8"
        // Survol à la souris seulement : sur écran tactile, c'est le toucher
        // (clic) qui ouvre et referme la bulle.
        onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(true)}
        onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(false)}
      >
        <AnimatePresence>
          {open && (
            <motion.div
              id="tip-bubble"
              role="tooltip"
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.96 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{ transformOrigin: "bottom right" }}
              className="relative mb-4 w-[min(26rem,calc(100vw-2.5rem))] rounded-lg border border-border bg-surface p-6 text-foreground shadow-2xl"
            >
              <p className="text-sm font-semibold text-surface-accent">
                {title}
              </p>
              <p className="mt-2 leading-relaxed">{text}</p>
              <span
                aria-hidden="true"
                className="absolute -bottom-2 right-6 h-4 w-4 rotate-45 border-b border-r border-border bg-surface sm:right-8"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="tip-bubble"
          aria-label={title}
          onClick={() => setOpen((o) => !o)}
          onBlur={() => setOpen(false)}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-4xl font-bold text-accent-foreground shadow-[0_14px_28px_-6px_rgba(11,3,43,0.55),0_4px_10px_rgba(11,3,43,0.3)] ring-4 ring-background/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_36px_-8px_rgba(11,3,43,0.6),0_6px_14px_rgba(11,3,43,0.35)] sm:h-20 sm:w-20 sm:text-5xl"
        >
          <span aria-hidden="true">?</span>
        </button>
      </div>
    </div>
  );
}
