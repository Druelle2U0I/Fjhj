"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { FaqItem } from "@/lib/data";

export default function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState(0);

  if (items.length === 0) return null;

  return (
    <div className="mx-auto mt-8 grid max-w-3xl gap-3 sm:mt-12">
      {items.map((item, index) => {
        const isOpen = index === open;
        return (
          <div
            key={item.question}
            className="dyn-card overflow-hidden rounded-lg border border-border bg-surface"
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
            >
              <span className="font-semibold">{item.question}</span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                className="shrink-0 text-2xl leading-none text-accent"
              >
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-4 text-muted sm:px-6 sm:pb-5">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
