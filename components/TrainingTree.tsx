"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type TreeTraining = {
  slug: string;
  title: string;
  duration: string;
};

type TreeSector = {
  slug: string;
  title: string;
  opco: boolean;
  trainings: TreeTraining[];
};

export default function TrainingTree({ sectors }: { sectors: TreeSector[] }) {
  const [active, setActive] = useState(0);
  const current = sectors[active];

  return (
    <div className="grid gap-8 lg:grid-cols-[auto_minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-0">
      {/* Racine */}
      <div className="flex items-center lg:pr-5">
        <div className="relative rounded-2xl border border-border bg-surface px-5 py-4 text-center lg:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">
            Catalogue
          </p>
          <p className="mt-1 text-lg font-semibold">ENMA Formation</p>
          <p className="mt-1 text-xs text-muted">
            {sectors.length} domaines ·{" "}
            {sectors.reduce((n, s) => n + s.trainings.length, 0)} formations
          </p>
          <span className="pointer-events-none absolute left-full top-1/2 hidden h-px w-5 bg-border lg:block" />
        </div>
      </div>

      {/* Branches : les domaines */}
      <div className="relative lg:pl-5">
        <span className="pointer-events-none absolute left-0 top-6 bottom-6 hidden w-px bg-border lg:block" />
        <ul className="grid gap-2">
          {sectors.map((sector, i) => (
            <li key={sector.slug} className="relative">
              <span className="pointer-events-none absolute -left-5 top-1/2 hidden h-px w-5 bg-border lg:block" />
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                className={`flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                  i === active
                    ? "border-accent bg-surface-2 font-semibold text-foreground"
                    : "border-border text-muted hover:border-accent hover:text-foreground"
                }`}
              >
                <span>{sector.title}</span>
                <span className="shrink-0 text-xs text-muted">
                  {sector.trainings.length}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Feuilles : les formations du domaine choisi */}
      <div className="relative lg:pl-10">
        <span className="pointer-events-none absolute left-5 top-6 bottom-6 hidden w-px bg-border lg:block" />
        <AnimatePresence mode="wait">
          <motion.div
            key={current.slug}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.25 }}
          >
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <p className="text-sm font-semibold">{current.title}</p>
              {current.opco && (
                <span className="rounded-full bg-accent px-3 py-0.5 text-xs font-semibold text-accent-foreground">
                  Finançable OPCO
                </span>
              )}
            </div>

            <ul className="grid gap-2">
              {current.trainings.map((training, i) => (
                <motion.li
                  key={training.slug}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.04 }}
                  className="relative lg:pl-5"
                >
                  <span className="pointer-events-none absolute left-0 top-1/2 hidden h-px w-5 bg-border lg:block" />
                  <Link
                    href={`/formations/${current.slug}/${training.slug}`}
                    className="dyn-card flex items-center justify-between gap-4 rounded-xl border border-border bg-surface px-4 py-3 transition-colors hover:border-accent"
                  >
                    <span className="text-sm font-medium">{training.title}</span>
                    <span className="shrink-0 text-xs text-muted">
                      {training.duration}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>

            <Link
              href={`/formations/${current.slug}`}
              className="mt-4 inline-flex text-sm font-semibold text-accent hover:underline"
            >
              Voir le domaine en détail →
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
