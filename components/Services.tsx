"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { services, topTrainings } from "@/lib/data";

type Training = (typeof services)[number]["trainings"][number];

function TrainingDetail({ training }: { training: Training }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="py-3">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full flex-col gap-1 text-left sm:flex-row sm:items-center sm:justify-between"
        aria-expanded={open}
      >
        <span className="font-medium">{training.title}</span>
        <span className="flex items-center gap-3 text-sm text-muted">
          {training.duration} · {training.format}
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border text-accent"
            aria-hidden
          >
            +
          </motion.span>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="space-y-4 pt-4 text-sm text-muted">
              {training.description.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
              <div className="dyn-card rounded-xl border border-border bg-surface-2 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                  Public concerné
                </p>
                <p className="mt-1.5">{training.audience}</p>
              </div>
              <div className="dyn-card rounded-xl border border-border bg-surface-2 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                  Financement
                </p>
                <p className="mt-1.5">{training.funding}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Services() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="formations" className="bg-surface px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">
            Nos formations
          </span>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            9 domaines de formation, 35 parcours certifiés Qualiopi
          </h2>
          <p className="mt-4 max-w-2xl text-muted">
            Toutes nos formations sont finançables OPCO et proposées en
            intra-entreprise, partout en Hauts-de-France. Cliquez sur un
            domaine pour voir le détail des formations.
          </p>
        </Reveal>

        <div className="mt-12 space-y-4">
          {services.map((service, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={service.title} delay={(i % 3) * 0.05}>
                <div className="dyn-card rounded-2xl border border-border bg-background">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 p-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <div>
                      <div className="mb-2 h-1 w-10 rounded-full bg-gold" />
                      <h3 className="text-lg font-semibold">
                        {service.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted">
                        {service.description}
                      </p>
                    </div>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-lg font-medium text-accent"
                      aria-hidden
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
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-border px-6 py-4">
                          <div className="divide-y divide-border">
                            {service.trainings.map((training) => (
                              <TrainingDetail
                                key={training.title}
                                training={training}
                              />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 rounded-2xl border border-border bg-background p-6 sm:p-8">
            <h3 className="text-lg font-semibold">Les plus demandées</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {topTrainings.map((training) => (
                <div
                  key={training.title}
                  className="dyn-card rounded-xl border border-border bg-surface-2 p-4"
                >
                  <p className="font-medium">{training.title}</p>
                  <p className="mt-1 text-sm text-muted">
                    {training.duration} · {training.format}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
