"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Visual from "@/components/Visual";
import type { services as allServices } from "@/lib/data";

type Service = (typeof allServices)[number];

// Courbe douce en entrée comme en sortie, pour éviter l'effet « coup sec »
const EASE = [0.45, 0, 0.15, 1] as const;
// Petit délai au survol : balayer les onglets avec la souris ne les fait
// plus s'ouvrir les uns après les autres de façon saccadée.
const HOVER_DELAY = 150;

export default function SectorAccordion({ services }: { services: Service[] }) {
  return (
    <>
      {/* Mobile/tablette : les bandes verticales de l'accordéon deviennent
          illisibles une fois aplaties à l'horizontale (pas de titre visible).
          Une simple liste, toujours entièrement lisible, la remplace. */}
      <div className="grid gap-3 lg:hidden">
        {services.map((service) => (
          <Link
            key={service.slug}
            href={`/formations/${service.slug}`}
            className="dyn-card group flex items-center gap-4 overflow-hidden rounded-xl border border-border bg-surface p-3"
          >
            <div className="dyn-photo-wrap relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
              <Visual
                src={service.image}
                alt=""
                sizes="80px"
                className="dyn-photo"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold">{service.title}</p>
              <p className="mt-1 line-clamp-2 text-sm text-muted">{service.description}</p>
            </div>
            <span aria-hidden="true" className="shrink-0 text-muted transition-colors group-hover:text-accent">
              →
            </span>
          </Link>
        ))}
      </div>

      {/* Bureau : accordéon interactif, une bande active à la fois. */}
      <div className="hidden lg:flex lg:h-[460px] lg:flex-row lg:gap-3">
        <DesktopAccordion services={services} />
      </div>
    </>
  );
}

function DesktopAccordion({ services }: { services: Service[] }) {
  const [active, setActive] = useState(0);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelHover = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
  };
  const hoverTo = (i: number) => {
    cancelHover();
    hoverTimer.current = setTimeout(() => setActive(i), HOVER_DELAY);
  };

  useEffect(() => cancelHover, []);

  return (
    <>
      {services.map((service, i) => {
        const isActive = i === active;
        return (
          <motion.div
            key={service.slug}
            role="button"
            tabIndex={0}
            onMouseEnter={() => hoverTo(i)}
            onMouseLeave={cancelHover}
            onClick={() => {
              cancelHover();
              setActive(i);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setActive(i);
            }}
            animate={{ flexGrow: isActive ? 7 : 1 }}
            transition={{ duration: 0.9, ease: EASE }}
            style={{ flexBasis: 0 }}
            className="dyn-card group relative min-h-0 cursor-pointer overflow-hidden rounded-lg border border-border outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Visual
              src={service.image}
              alt=""
              sizes="(min-width: 1024px) 60vw, 100vw"
              priority={i === 0}
              className="transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
            <div
              className={`sector-veil absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? "opacity-0" : "opacity-100"
              }`}
            />

            <div className="absolute inset-0 flex flex-col justify-end p-4 lg:p-6">
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, delay: 0.35, ease: "easeOut" },
                    }}
                    exit={{ opacity: 0, transition: { duration: 0.25, ease: "easeIn" } }}
                  >
                    <p className="text-lg font-semibold text-white lg:text-2xl">
                      {service.title}
                    </p>
                    <p className="mt-2 line-clamp-3 text-sm text-white/80">
                      {service.description}
                    </p>
                    <Link
                      href={`/formations/${service.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      className="mt-4 inline-flex rounded-lg bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground transition-transform hover:scale-105"
                    >
                      Voir les formations
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        );
      })}
    </>
  );
}
