"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { services } from "@/lib/data";

export default function Services() {
  return (
    <section id="formations" className="bg-surface px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">
            Nos formations
          </span>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Des parcours pensés pour chaque étape de votre développement
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={(i % 3) * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group h-full rounded-2xl border border-border bg-background p-6"
              >
                <div className="mb-4 h-1 w-10 rounded-full bg-gold transition-all group-hover:w-16" />
                <h3 className="text-lg font-semibold">{service.title}</h3>
                <p className="mt-2 text-sm text-muted">
                  {service.description}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
