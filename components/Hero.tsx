"use client";

import Link from "next/link";
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
          <h1
            className="max-w-xl whitespace-pre-line text-4xl font-semibold tracking-tight sm:text-5xl"
          >
            {company.tagline}
          </h1>

          <p
            className="mt-4 line-clamp-4 max-w-xl whitespace-pre-line text-base text-muted sm:mt-6 sm:line-clamp-none sm:text-lg"
          >
            {company.description}
          </p>

          <div
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link
              href="/formations"
              className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-105"
            >
              {pages.hero.primaryButton}
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border border-border bg-surface px-6 py-3 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
            >
              {pages.hero.secondaryButton}
            </Link>
          </div>
        </div>

        <div>
          <HeroCarousel slides={home.heroSlides} />
        </div>
      </div>
    </section>
  );
}
