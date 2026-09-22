"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Visual from "@/components/Visual";
import type { services as allServices } from "@/lib/data";

type Service = (typeof allServices)[number];

const SPRING = { type: "spring" as const, stiffness: 170, damping: 26, mass: 0.9 };

export default function SectorAccordion({ services }: { services: Service[] }) {
  const [active, setActive] = useState(0);
  const activeService = services[active];
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    };
  }, []);

  const scheduleActivate = (i: number) => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => setActive(i), 220);
  };

  const cancelSchedule = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[380px_1fr] lg:items-start">
      <div className="flex max-h-[560px] flex-col gap-2 overflow-y-auto pr-1 lg:max-h-none lg:overflow-visible">
        {services.map((service, i) => {
          const isActive = i === active;
          return (
            <motion.button
              key={service.slug}
              type="button"
              layout
              onMouseEnter={() => scheduleActivate(i)}
              onMouseLeave={cancelSchedule}
              onClick={() => {
                cancelSchedule();
                setActive(i);
              }}
              transition={SPRING}
              className={`dyn-card flex items-center gap-4 rounded-2xl border px-4 text-left transition-colors duration-300 ${
                isActive
                  ? "border-accent bg-surface py-6"
                  : "border-border bg-background py-2.5 hover:border-accent/50"
              }`}
            >
              <motion.div
                layout
                transition={SPRING}
                className="relative shrink-0 overflow-hidden rounded-full border border-border bg-surface-2"
                style={{ width: isActive ? 88 : 44, height: isActive ? 88 : 44 }}
              >
                <Visual
                  src={service.image}
                  alt=""
                  sizes="88px"
                  className="object-cover"
                />
              </motion.div>
              <div className="min-w-0 flex-1">
                <motion.p
                  layout="position"
                  transition={SPRING}
                  className={`truncate font-semibold transition-[font-size] duration-300 ${isActive ? "text-lg" : "text-sm"}`}
                >
                  {service.title}
                </motion.p>
                <p className="text-xs text-muted">
                  {service.trainings.length} formation
                  {service.trainings.length > 1 ? "s" : ""}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="dyn-card relative overflow-hidden rounded-3xl border border-border bg-surface"
          >
            <div className="relative aspect-[16/9] w-full">
              <Visual
                src={activeService.image}
                alt={activeService.imageAlt ?? activeService.title}
                sizes="(min-width: 1024px) 55vw, 90vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/10 to-transparent" />
            </div>
            <div className="p-6 sm:p-8">
              <h3 className="text-2xl font-semibold tracking-tight">
                {activeService.title}
              </h3>
              <p className="mt-3 line-clamp-4 text-muted">
                {activeService.description}
              </p>
              <Link
                href={`/formations/${activeService.slug}`}
                className="mt-6 inline-flex rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-transform hover:scale-105"
              >
                Voir les formations
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
