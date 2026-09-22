import Link from "next/link";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Reveal from "@/components/Reveal";
import SectorAccordion from "@/components/SectorAccordion";
import { services, funding, home } from "@/lib/data";
import type { HomeSection } from "@/lib/data";

function FormationsSection({ section }: { section: HomeSection }) {
  return (
    <section id="formations" className="bg-surface px-6 py-24">
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
      <div className="mx-auto max-w-6xl">
        <Reveal className="dyn-card rounded-3xl border border-border bg-surface p-8 sm:p-12">
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
      </div>
    </section>
  );
}

function ContactSection({ section }: { section: HomeSection }) {
  return (
    <section className="bg-surface px-6 py-24">
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
              return <FormationsSection key={section.id} section={section} />;
            case "financement":
              return <FinancementSection key={section.id} section={section} />;
            case "contact":
              return <ContactSection key={section.id} section={section} />;
          }
        })}
    </>
  );
}
