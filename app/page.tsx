import { Fragment } from "react";
import Link from "next/link";
import Hero from "@/components/Hero";
import About from "@/components/About";
import AnimatedStat from "@/components/AnimatedStat";
import Reveal from "@/components/Reveal";
import SectorAccordion from "@/components/SectorAccordion";
import Faq from "@/components/Faq";
import Visual from "@/components/Visual";
import { services, funding, home, stats } from "@/lib/data";
import type { HomeSection } from "@/lib/data";

// Bande pleine largeur (photo bord à bord, pas de conteneur à 1200px) qui
// casse le rythme "carte, carte, carte" entre le catalogue et le financement.
function StatsBand() {
  if (!home.statsBandImage) return null;

  return (
    <section className="relative overflow-hidden py-12 sm:py-16">
      <div className="absolute inset-0">
        <Visual
          src={home.statsBandImage}
          alt={home.statsBandImageAlt ?? ""}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-background/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/70" />
      </div>

      <div className="relative mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 sm:grid-cols-4">
        {stats.map((stat) => (
          <Reveal key={stat.label} className="text-center">
            <p className="text-3xl font-semibold text-accent sm:text-4xl">
              <AnimatedStat value={stat.value} />
            </p>
            <p className="mt-1 text-xs text-muted sm:text-sm">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function FormationsSection({ section }: { section: HomeSection }) {
  return (
    <section id="formations" className="section-soft px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          {section.eyebrow && (
            <span className="text-sm font-semibold uppercase tracking-wide text-accent">
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
            className="inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-105"
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
    <section id="financement" className="px-6 py-24">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <Reveal>
          {section.eyebrow && (
            <span className="text-sm font-semibold uppercase tracking-wide text-accent">
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
            className="mt-6 inline-flex rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
          >
            Comprendre le financement
          </Link>
        </Reveal>

        <Reveal delay={0.1} className="grid gap-6 border-t border-border pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          {funding.points.map((point, i) => (
            <div key={point.title}>
              <span className="text-xs font-semibold text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-1 font-semibold">{point.title}</h3>
              <p className="mt-1 text-sm text-muted">{point.text}</p>
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
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          {section.eyebrow && (
            <span className="text-sm font-semibold uppercase tracking-wide text-accent">
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
    <section className="section-soft px-6 py-24">
      <div className="mx-auto max-w-6xl text-center">
        <Reveal>
          {section.eyebrow && (
            <span className="text-sm font-semibold uppercase tracking-wide text-accent">
              {section.eyebrow}
            </span>
          )}
          <h2 className="mt-3 whitespace-pre-line text-3xl font-semibold tracking-tight sm:text-4xl">
            {section.title}
          </h2>
          {section.text && (
            <p className="mx-auto mt-4 max-w-xl whitespace-pre-line text-muted">{section.text}</p>
          )}
          <Link
            href="/contact"
            className="mt-8 inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-105"
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
    </>
  );
}
