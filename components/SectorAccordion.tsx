"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Visual from "@/components/Visual";
import type { services as allServices } from "@/lib/data";

type Service = (typeof allServices)[number];

export default function SectorAccordion({ services }: { services: Service[] }) {
  const [active, setActive] = useState(0);
  const activeService = services[active];

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
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className={`dyn-card flex items-center gap-4 rounded-2xl border px-4 text-left transition-colors ${
                isActive
                  ? "border-accent bg-surface py-6"
                  : "border-border bg-background py-2.5 hover:border-accent/50"
              }`}
            >
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
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
                  className={`truncate font-semibold ${isActive ? "text-lg" : "text-sm"}`}
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

      <motion.div
        key={activeService.slug}
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35 }}
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
    </div>
  );
}
