import { Fragment } from "react";
import Link from "next/link";
import Hero from "@/components/Hero";
import About from "@/components/About";
import FormationsMarquee from "@/components/FormationsMarquee";
import PageThemeScope from "@/components/PageThemeScope";
import Reveal from "@/components/Reveal";
import SectorAccordion from "@/components/SectorAccordion";
import SectorGrid from "@/components/SectorGrid";
import Faq from "@/components/Faq";
import StatsBand from "@/components/StatsBand";
import { services, funding, home } from "@/lib/data";
import type { HomeSection } from "@/lib/data";

function FormationsSection({ section }: { section: HomeSection }) {
  return (
    <section id="formations" className="px-6 py-14 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          {section.eyebrow && (
            <span className="text-sm font-semibold text-muted">
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
          {home.sectorsLayout === "accordion" ? (
            <SectorAccordion services={services} />
          ) : (
            <SectorGrid services={services} />
          )}
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
    <section id="financement" className="px-6 py-14 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal className="flex flex-col justify-center">
          {section.eyebrow && (
            <span className="inline-flex w-fit rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
              {section.eyebrow}
            </span>
          )}
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            {section.title}
          </h2>
          <p className="mt-5 max-w-2xl whitespace-pre-line text-muted">
            {section.text || funding.intro}
          </p>
          <Link
            href="/financement"
            className="mt-6 inline-flex w-fit rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-105"
          >
            Comprendre le financement
          </Link>
        </Reveal>

        <Reveal delay={0.1} className="grid gap-6 rounded-lg border border-border bg-surface p-8 sm:p-10">
          {funding.points.map((point) => (
            <div key={point.title} className="flex items-center gap-3">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="h-5 w-5 shrink-0 text-surface-accent"
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
    </section>
  );
}

function FaqSection({ section }: { section: HomeSection }) {
  if (home.faq.length === 0) return null;
  return (
    <section className="px-6 py-14 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          {section.eyebrow && (
            <span className="text-sm font-semibold text-muted">
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
    <section className="px-6 py-14 sm:py-24">
      <div className="mx-auto max-w-6xl rounded-lg border border-border bg-surface p-10 text-center sm:p-16">
        <Reveal>
          {section.eyebrow && (
            <span className="inline-flex w-fit rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
              {section.eyebrow}
            </span>
          )}
          <h2 className="mt-4 whitespace-pre-line text-3xl font-semibold tracking-tight sm:text-4xl">
            {section.title}
          </h2>
          {section.text && (
            <p className="mx-auto mt-4 max-w-xl whitespace-pre-line text-muted">{section.text}</p>
          )}
          <Link
            href="/contact"
            className="mt-8 inline-flex rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-105"
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
    <PageThemeScope overrides={home.theme}>
      <Hero />
      {home.showMarquee && (
        <FormationsMarquee
          eyebrow="En images"
          title="Nos formations sur le terrain"
          slides={home.heroSlides}
        />
      )}
      {home.sections
        .filter((section) => section.visible)
        .map((section) => {
          switch (section.id) {
            case "about":
              return <About key={section.id} section={section} />;
            case "formations":
              return (
                <Fragment key={section.id}>
                  <FormationsSection section={section} />
                  <StatsBand />
                </Fragment>
              );
            case "financement":
              return <FinancementSection key={section.id} section={section} />;
            case "contact":
              return <ContactSection key={section.id} section={section} />;
            case "faq":
              return <FaqSection key={section.id} section={section} />;
          }
        })}
    </PageThemeScope>
  );
}
