"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import HeroCarousel from "@/components/HeroCarousel";
import { company, home, pages } from "@/lib/data";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative -mt-[86px] overflow-hidden px-6 pt-[126px] pb-24 sm:-mt-[94px] sm:pt-[154px]"
    >

      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium text-muted"
          >
            {pages.hero.badge}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-xl whitespace-pre-line text-4xl font-semibold tracking-tight sm:text-5xl"
          >
            {company.tagline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-xl whitespace-pre-line text-lg text-muted"
          >
            {company.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link
              href="/formations"
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-105"
            >
              {pages.hero.primaryButton}
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
            >
              {pages.hero.secondaryButton}
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <HeroCarousel slides={home.heroSlides} />
        </motion.div>
      </div>
    </section>
  );
}
