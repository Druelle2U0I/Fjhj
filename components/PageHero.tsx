import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

export default function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  breadcrumb?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden px-6 pt-16 pb-14">
      <div className="pointer-events-none absolute -top-32 right-[-10%] h-96 w-96 rounded-full bg-accent-soft blur-3xl" />
      <div className="relative mx-auto max-w-6xl">
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
            <p className="mt-5 max-w-2xl text-lg text-muted">{description}</p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
