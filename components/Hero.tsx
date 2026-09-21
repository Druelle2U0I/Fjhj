"use client";

import { motion } from "framer-motion";
import { company, stats } from "@/lib/data";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-6 pt-20 pb-24">
      <div className="pointer-events-none absolute -top-32 right-[-10%] h-96 w-96 rounded-full bg-accent-soft blur-3xl" />
      <div className="pointer-events-none absolute top-40 left-[-10%] h-72 w-72 rounded-full bg-gold/20 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium text-muted"
        >
          Organisme de formation professionnelle
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl"
        >
          {company.tagline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-xl text-lg text-muted"
        >
          {company.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <a
            href="#formations"
            className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-105"
          >
            Découvrir nos formations
          </a>
          <a
            href="#contact"
            className="rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
          >
            Parler à un conseiller
          </a>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 gap-8 border-t border-border pt-10 sm:grid-cols-4"
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="text-2xl font-semibold text-accent sm:text-3xl">
                {stat.value}
              </dt>
              <dd className="mt-1 text-sm text-muted">{stat.label}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
