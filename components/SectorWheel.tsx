"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type WheelSector = {
  slug: string;
  title: string;
  image?: string;
  imageAlt?: string;
  count: number;
  opco: boolean;
  intro: string;
};

/** Libellé court pour que deux étiquettes voisines ne se chevauchent pas. */
function shortLabel(title: string) {
  const words = title.split(/\s[&—]\s/)[0].split(" ");
  while (words.length > 1 && words.join(" ").length > 22) words.pop();
  return words.join(" ");
}

export default function SectorWheel({ sectors }: { sectors: WheelSector[] }) {
  const [active, setActive] = useState(0);
  const step = 360 / sectors.length;
  const current = sectors[active];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
      {/* La roue : masquée sur mobile, où elle serait illisible */}
      <div className="relative mx-auto hidden aspect-square w-full max-w-[520px] lg:block">
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: -active * step }}
          transition={{ type: "spring", stiffness: 60, damping: 16 }}
        >
          {sectors.map((sector, i) => (
            <div
              key={sector.slug}
              className="absolute left-1/2 top-1/2 h-0 w-0"
              style={{ transform: `rotate(${i * step}deg) translateY(-235px)` }}
            >
              <motion.button
                type="button"
                onClick={() => setActive(i)}
                animate={{ rotate: active * step - i * step }}
                transition={{ type: "spring", stiffness: 60, damping: 16 }}
                aria-label={sector.title}
                aria-pressed={i === active}
                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
                  i === active
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border bg-surface text-muted hover:border-accent hover:text-foreground"
                }`}
              >
                {shortLabel(sector.title)}
              </motion.button>
            </div>
          ))}
        </motion.div>

        {/* Cercles de guidage et logo au centre */}
        <div className="pointer-events-none absolute inset-[60px] rounded-full border border-border" />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="flex h-36 w-36 items-center justify-center rounded-full border border-border bg-surface">
            <Image
              src="/brand/logo-icon.png"
              alt=""
              width={160}
              height={160}
              className="w-20 opacity-90"
            />
          </div>
        </div>
      </div>

      {/* Le secteur sélectionné */}
      <div>
        {/* Sélecteur de remplacement sur mobile */}
        <div className="mb-6 flex flex-wrap gap-2 lg:hidden">
          {sectors.map((sector, i) => (
            <button
              key={sector.slug}
              type="button"
              onClick={() => setActive(i)}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                i === active
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border text-muted"
              }`}
            >
              {shortLabel(sector.title)}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.slug}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden rounded-3xl border border-border bg-surface"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              {current.image ? (
                <Image
                  src={current.image}
                  alt={current.imageAlt ?? current.title}
                  fill
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-surface-2 via-surface to-background">
                  <Image
                    src="/brand/logo-icon.png"
                    alt=""
                    width={160}
                    height={160}
                    className="w-1/4 opacity-[0.14]"
                  />
                </div>
              )}
            </div>

            <div className="p-6 sm:p-8">
              <h3 className="text-xl font-semibold">{current.title}</h3>
              <p className="mt-3 whitespace-pre-line text-sm text-muted">
                {current.intro}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded-full border border-border px-3 py-1 text-muted">
                  {current.count} formation{current.count > 1 ? "s" : ""}
                </span>
                {current.opco && (
                  <span className="rounded-full bg-accent px-3 py-1 font-semibold text-accent-foreground">
                    Finançable OPCO
                  </span>
                )}
              </div>

              <Link
                href={`/formations/${current.slug}`}
                className="mt-6 inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-105"
              >
                Découvrir ce domaine
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
