import Link from "next/link";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Reveal from "@/components/Reveal";
import Visual from "@/components/Visual";
import { services, funding, home } from "@/lib/data";
import type { HomeSection } from "@/lib/data";

function FormationsSection({ section }: { section: HomeSection }) {
  const featured = services.slice(0, 6);

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

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((service, i) => (
            <Reveal key={service.slug} delay={(i % 3) * 0.05}>
              <Link
                href={`/formations/${service.slug}`}
                className="dyn-card block h-full overflow-hidden rounded-3xl border border-border bg-background"
              >
                <div className="dyn-photo-wrap relative aspect-[4/3] overflow-hidden">
                  <Visual
                    src={service.image}
                    alt={service.imageAlt ?? service.title}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw"
                    className="dyn-photo"
                  />
                </div>
                <div className="border-t border-border px-6 py-5">
                  <h3 className="text-lg font-semibold leading-snug">
                    {service.title}
                  </h3>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                    <span className="rounded-full border border-border px-3 py-1 text-muted">
                      {service.trainings.length} formation
                      {service.trainings.length > 1 ? "s" : ""}
                    </span>
                    {service.opco && (
                      <span className="rounded-full bg-accent px-3 py-1 font-semibold text-accent-foreground">
                        Finançable OPCO
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

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
