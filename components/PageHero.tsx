import type { ReactNode } from "react";
import Image from "next/image";
import Reveal from "@/components/Reveal";

export default function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb,
  image,
  imageAlt,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  breadcrumb?: ReactNode;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="relative -mt-[86px] overflow-hidden px-6 pt-[128px] pb-14 sm:-mt-[94px] sm:pt-[148px]">
      <div className="pointer-events-none absolute -top-32 right-[-10%] h-96 w-96 rounded-full bg-accent-soft blur-3xl" />
      <div
        className={`relative mx-auto max-w-6xl ${
          image ? "grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center" : ""
        }`}
      >
        <div>
          {breadcrumb && (
            <div className="mb-6 text-sm text-muted">{breadcrumb}</div>
          )}
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-wide text-accent">
              {eyebrow}
            </span>
            <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              {title}
            </h1>
            {description && (
              <p className="mt-5 max-w-2xl text-lg text-muted">
                {description}
              </p>
            )}
          </Reveal>
        </div>

        {image && (
          <Reveal
            delay={0.1}
            className="dyn-photo-wrap dyn-card relative aspect-[4/3] overflow-hidden rounded-3xl border border-border"
          >
            <Image
              src={image}
              alt={imageAlt ?? title}
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="dyn-photo object-cover"
            />
          </Reveal>
        )}
      </div>
    </section>
  );
}
