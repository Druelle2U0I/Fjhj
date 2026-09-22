import Image from "next/image";
import Reveal from "@/components/Reveal";
import Visual from "@/components/Visual";
import { company, home, pillars } from "@/lib/data";
import type { HomeSection } from "@/lib/data";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function About({ section }: { section: HomeSection }) {
  return (
    <section id="a-propos" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal className="dyn-photo-wrap dyn-card relative aspect-[4/3] overflow-hidden rounded-3xl border border-border">
            <Visual
              src={home.aboutImage}
              alt={home.aboutImageAlt ?? ""}
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="dyn-photo"
            />
          </Reveal>

          <Reveal delay={0.1}>
            {section.eyebrow && (
              <span className="text-sm font-semibold uppercase tracking-wide text-accent">
                {section.eyebrow}
              </span>
            )}
            <h2 className="mt-3 max-w-2xl whitespace-pre-line text-3xl font-semibold tracking-tight sm:text-4xl">
              {section.title}
            </h2>
            <p className="mt-5 max-w-2xl whitespace-pre-line text-muted">
              {section.text || company.about}
            </p>
          </Reveal>
        </div>

        {home.founderQuote?.text && (
          <Reveal delay={0.15} className="mt-14">
            <div className="dyn-card rounded-3xl border border-border bg-surface p-8 sm:p-10">
              <svg
                aria-hidden="true"
                viewBox="0 0 32 24"
                className="h-8 w-10 fill-accent/40"
              >
                <path d="M0 24V14.4Q0 7.2 3.6 3.6 7.2 0 14.4 0v4.8Q9.6 4.8 7.2 7.2 4.8 9.6 4.8 14.4H12V24ZM19.2 24V14.4Q19.2 7.2 22.8 3.6 26.4 0 33.6 0v4.8Q28.8 4.8 26.4 7.2 24 9.6 24 14.4h7.2V24Z" />
              </svg>
              <p className="mt-4 max-w-3xl whitespace-pre-line text-base italic leading-relaxed text-foreground sm:text-lg">
                {home.founderQuote.text}
              </p>
              <div className="mt-6 flex items-center gap-4">
                {home.founderQuote.photo ? (
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-border">
                    <Image
                      src={home.founderQuote.photo}
                      alt={home.founderQuote.photoAlt || home.founderQuote.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-border bg-surface-2 text-sm font-semibold text-accent">
                    {initials(home.founderQuote.name)}
                  </div>
                )}
                <div>
                  <p className="font-semibold">{home.founderQuote.name}</p>
                  <p className="text-sm text-muted">{home.founderQuote.role}</p>
                </div>
              </div>
            </div>
          </Reveal>
        )}

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.1}>
              <div className="dyn-card h-full rounded-2xl border border-border bg-surface p-6">
                <h3 className="text-lg font-semibold">{pillar.title}</h3>
                <p className="mt-2 whitespace-pre-line text-sm text-muted">{pillar.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
