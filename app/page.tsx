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
import ZigzagRow from "@/components/ZigzagRow";
import { services, funding, home, pages } from "@/lib/data";
import type { HeroSlide, HomeSection } from "@/lib/data";

// Bande défilante : les formations une par une (et non les domaines,
// présentés juste en dessous), en alternant les domaines d'une carte à
// l'autre. Photo de la formation, ou à défaut celle de son domaine.
function trainingSlides(): HeroSlide[] {
  const queues = services.map((service) =>
    service.trainings.map((training) => ({
      image: training.image || service.image || "",
      alt: training.title,
      title: training.title,
      text: [training.duration, service.title].filter(Boolean).join(" · "),
      link: `/formations/${service.slug}/${training.slug}`,
    })),
  );
  const slides: HeroSlide[] = [];
  for (let i = 0; queues.some((q) => i < q.length); i++) {
    for (const queue of queues) if (queue[i]) slides.push(queue[i]);
  }
  return slides;
}

function FormationsSection({ section }: { section: HomeSection }) {
  return (
    <section id="formations" className="px-6 py-10 sm:py-14">
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

        <Reveal delay={0.1} className="mt-8">
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
    <div id="financement">
      <ZigzagRow
        image={home.fundingImage || pages.funding.heroImage}
        imageAlt={section.title}
        side="right"
      >
        {section.eyebrow && (
          <span className="text-sm font-semibold text-muted">{section.eyebrow}</span>
        )}
        <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
          {section.title}
        </h2>
        <p className="mt-5 max-w-xl whitespace-pre-line text-muted">
          {section.text || funding.intro}
        </p>
        <ul className="mt-6 grid gap-3">
          {funding.points.map((point) => (
            <li key={point.title} className="flex items-center gap-3 font-semibold">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="h-5 w-5 shrink-0"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
              </svg>
              {point.title}
            </li>
          ))}
        </ul>
        <Link
          href="/financement"
          className="mt-8 inline-flex w-fit rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-105"
        >
          Comprendre le financement
        </Link>
      </ZigzagRow>
    </div>
  );
}

// FAQ en deux colonnes : le titre à gauche (reste visible en défilant),
// les questions à droite, séparées par de simples filets.
function FaqSection({ section }: { section: HomeSection }) {
  if (home.faq.length === 0) return null;
  return (
    <section className="px-6 py-10 sm:py-14">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1fr_2fr] md:gap-16">
        <Reveal className="md:sticky md:top-28 md:self-start">
          <h2 className="text-4xl font-bold tracking-tight">FAQ</h2>
          {section.title && (
            <p className="mt-4 max-w-xs whitespace-pre-line text-muted">{section.title}</p>
          )}
          {section.text && (
            <p className="mt-3 max-w-xs whitespace-pre-line text-sm text-muted">{section.text}</p>
          )}
          <Link
            href="/contact"
            className="mt-6 inline-block border-b border-foreground pb-0.5 text-xs font-semibold uppercase tracking-[0.14em] text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Une autre question ?
          </Link>
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
    <section className="px-6 py-10 sm:py-14">
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
      {home.showMarquee !== false && (
        <FormationsMarquee
          eyebrow="En images"
          title="Nos formations sur le terrain"
          slides={home.marqueeSource === "slides" ? home.heroSlides : trainingSlides()}
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
