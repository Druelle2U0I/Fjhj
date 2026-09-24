import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Reveal from "@/components/Reveal";
import SectorAccordion from "@/components/SectorAccordion";
import Faq from "@/components/Faq";
import StatsBand from "@/components/StatsBand";
import { services, funding, home } from "@/lib/data";
import type { HomeSection } from "@/lib/data";

function FormationsSection({ section }: { section: HomeSection }) {
  return (
    <section id="formations" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          {section.eyebrow && (
            <span className="text-sm font-semibold text-accent">
              {section.eyebrow}
            </span>
          )}
          <h2 className="mt-3 max-w-2xl whitespace-pre-line text-3xl font-semibold tracking-tight sm:text-4xl">
            {section.title}
          </h2>
          {section.text && (
            <p className="mt-4 max-w-2xl whitespace-pre-line text-muted">{section.text}</p>
          )}
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <SectorAccordion services={services} />
        </Reveal>

        <Reveal delay={0.2} className="mt-10 text-center">
          <Link
            href="/formations"
            className="inline-flex rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-105"
          >
            Voir toutes nos formations
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function FinancementSection({ section }: { section: HomeSection }) {
  return (
    <section id="financement" className="py-24">
      <div className="grid gap-10 px-6 lg:grid-cols-2 lg:items-stretch lg:gap-0 lg:px-0">
        <Reveal className="flex flex-col justify-center lg:mx-auto lg:w-full lg:max-w-lg lg:pl-6">
          {section.eyebrow && (
            <span className="text-sm font-semibold text-accent">
              {section.eyebrow}
            </span>
          )}
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            {section.title}
          </h2>
          <p className="mt-5 max-w-2xl whitespace-pre-line text-muted">
            {section.text || funding.intro}
          </p>
          <Link
            href="/financement"
            className="mt-6 inline-flex w-fit rounded-lg border border-border bg-background px-6 py-3 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
          >
            Comprendre le financement
          </Link>
        </Reveal>

        {/* Le panneau touche le bord droit de l'écran ; un second
            rectangle décalé en dessous fait office d'ombre portée,
            coins carrés (pas de rounded). */}
        <div className="relative lg:pl-10">
          <div
            aria-hidden="true"
            className="panel-shadow-veil absolute -right-4 -top-4 hidden h-full w-[calc(100%-2.5rem)] lg:block"
          />
          <Reveal
            delay={0.1}
            className="relative grid gap-6 bg-surface p-8 sm:p-10 lg:h-full lg:pr-16"
          >
            {funding.points.map((point) => (
              <div key={point.title} className="flex items-center gap-3">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="h-5 w-5 shrink-0 text-accent"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
              </svg>
              <div>
                <h3 className="font-semibold">{point.title}</h3>
                <p className="mt-1 text-sm text-muted">{point.text}</p>
              </div>
            </div>
          ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FaqSection({ section }: { section: HomeSection }) {
  if (home.faq.length === 0) return null;
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          {section.eyebrow && (
            <span className="text-sm font-semibold text-accent">
              {section.eyebrow}
            </span>
          )}
          <h2 className="mx-auto mt-3 max-w-2xl whitespace-pre-line text-3xl font-semibold tracking-tight sm:text-4xl">
            {section.title}
          </h2>
          {section.text && (
            <p className="mx-auto mt-4 max-w-xl whitespace-pre-line text-muted">{section.text}</p>
          )}
        </Reveal>

        <Reveal delay={0.1}>
          <Faq items={home.faq} />
        </Reveal>
      </div>
    </section>
  );
}

function ContactSection({ section }: { section: HomeSection }) {
  return (
    <section className="bg-accent px-6 py-24 text-accent-foreground">
      <div className="mx-auto max-w-6xl text-center">
        <Reveal>
          {section.eyebrow && (
            <span className="text-sm font-semibold text-accent-foreground/70">
              {section.eyebrow}
            </span>
          )}
          <h2 className="mt-3 whitespace-pre-line text-3xl font-semibold tracking-tight sm:text-4xl">
            {section.title}
          </h2>
          {section.text && (
            <p className="mx-auto mt-4 max-w-xl whitespace-pre-line text-accent-foreground/80">{section.text}</p>
          )}
          <Link
            href="/contact"
            className="mt-8 inline-flex rounded-lg bg-accent-foreground px-6 py-3 text-sm font-semibold text-accent transition-transform hover:scale-105"
          >
            Nous contacter
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      {home.sections
        .filter((section) => section.visible)
        .map((section, i) => {
          // Une section sur deux passe sur une bande de couleur pleine
          // largeur, quel que soit l'ordre choisi dans l'admin.
          const band = (node: ReactNode) =>
            i % 2 === 0 ? (
              <div key={section.id} className="page-band">
                {node}
              </div>
            ) : (
              <Fragment key={section.id}>{node}</Fragment>
            );
          switch (section.id) {
            case "about":
              return band(<About section={section} />);
            case "formations":
              return (
                <Fragment key={section.id}>
                  {band(<FormationsSection section={section} />)}
                  <StatsBand />
                </Fragment>
              );
            case "financement":
              return band(<FinancementSection section={section} />);
            case "contact":
              return band(<ContactSection section={section} />);
            case "faq":
              return band(<FaqSection section={section} />);
          }
        })}
    </>
  );
}
