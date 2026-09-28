"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { FaqItem } from "@/lib/data";

export default function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState(0);

  if (items.length === 0) return null;

  return (
    <div className="border-t border-foreground/20">
      {items.map((item, index) => {
        const isOpen = index === open;
        return (
          <div
            key={item.question}
            className="overflow-hidden border-b border-foreground/20"
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className="text-sm font-semibold sm:text-base">{item.question}</span>
              <motion.span
                aria-hidden="true"
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-highlight text-lg leading-none text-highlight-foreground"
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
                  <p className="max-w-2xl pb-5 text-muted">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
