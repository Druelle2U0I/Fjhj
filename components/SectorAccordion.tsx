"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Visual from "@/components/Visual";
import type { services as allServices } from "@/lib/data";

type Service = (typeof allServices)[number];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function SectorAccordion({ services }: { services: Service[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex h-[640px] flex-col gap-3 sm:h-[560px] lg:h-[460px] lg:flex-row">
      {services.map((service, i) => {
        const isActive = i === active;
        return (
          <motion.div
            key={service.slug}
            role="button"
            tabIndex={0}
            onMouseEnter={() => setActive(i)}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setActive(i);
            }}
            animate={{ flexGrow: isActive ? 7 : 1 }}
            transition={{ duration: 0.55, ease: EASE }}
            style={{ flexBasis: 0 }}
            className="dyn-card group relative min-h-0 cursor-pointer overflow-hidden rounded-2xl border border-border outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Visual
              src={service.image}
              alt=""
              sizes="(min-width: 1024px) 60vw, 100vw"
              priority={i === 0}
              className="transition-transform duration-700 group-hover:scale-105"
            />
            <div
              className={`absolute inset-0 transition-all duration-500 ${
                isActive
                  ? "bg-gradient-to-t from-black/85 via-black/35 to-black/10"
                  : "bg-black/35"
              }`}
            />

            <div className="absolute inset-0 flex flex-col justify-end p-4 lg:p-6">
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.35, delay: 0.1 }}
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
                      className="mt-4 inline-flex rounded-full bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground transition-transform hover:scale-105"
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
    </div>
  );
}
