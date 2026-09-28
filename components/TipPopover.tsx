"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// « Le saviez-vous ? » : un gros point d'interrogation ; le message
// apparaît dans une bulle au survol (ordinateur) ou au toucher (mobile).
export default function TipPopover({ title, text }: { title: string; text: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative inline-flex items-center gap-5"
      // Survol à la souris seulement : sur écran tactile, c'est le toucher
      // (clic) qui ouvre et referme la bulle.
      onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls="tip-bubble"
        onClick={() => setOpen((o) => !o)}
        onBlur={() => setOpen(false)}
        className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-accent text-5xl font-bold text-accent-foreground shadow-lg transition-transform hover:scale-105 sm:h-24 sm:w-24 sm:text-6xl"
      >
        <span aria-hidden="true">?</span>
        <span className="sr-only">{title}</span>
      </button>
      <p className="text-lg font-semibold text-foreground">{title}</p>

      <AnimatePresence>
        {open && (
          <motion.div
            id="tip-bubble"
            role="tooltip"
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-0 top-full z-20 mt-4 w-[min(32rem,calc(100vw-3rem))] rounded-lg border border-border bg-surface p-6 text-foreground shadow-2xl"
          >
            <span
              aria-hidden="true"
              className="absolute -top-2 left-9 h-4 w-4 rotate-45 border-l border-t border-border bg-surface sm:left-11"
            />
            <p className="relative leading-relaxed">{text}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
