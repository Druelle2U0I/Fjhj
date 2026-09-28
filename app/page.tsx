import { Fragment } from "react";
import Link from "next/link";
import Hero from "@/components/Hero";
import About from "@/components/About";
import FormationsMarquee from "@/components/FormationsMarquee";
import PageThemeScope from "@/components/PageThemeScope";
import Reveal from "@/components/Reveal";
import SectorAccordion from "@/components/SectorAccordion";
import Faq from "@/components/Faq";
import CardRail from "@/components/CardRail";
import StatsBand from "@/components/StatsBand";
import StoryRow, { StoryFact, StoryLink, StoryTitle } from "@/components/StoryRow";
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

// Domaines en rangée de grandes cartes portrait (titre à gauche, flèches,
// cartes qui défilent) avec le lien vers le catalogue sous le titre. La bande
// des chiffres clés (photo pleine largeur) suit juste après.
function FormationsSection({ section }: { section: HomeSection }) {
  return (
    <section id="formations" className="px-6 py-10 sm:py-14">
      <div className="mx-auto grid max-w-6xl gap-12 sm:gap-16">
        {home.sectorsLayout === "accordion" ? (
          <Reveal>
            <h2 className="max-w-2xl whitespace-pre-line font-semibold tracking-tight text-xl sm:text-2xl">
              {section.title}
            </h2>
            <div className="mt-8">
              <SectorAccordion services={services} />
            </div>
          </Reveal>
        ) : (
          <Reveal>
            <CardRail
              title={`${services.length} secteurs\nde formation`}
              action={
                <Link
                  href="/formations"
                  className="underline-link inline-block whitespace-nowrap border-b pb-0.5 text-xs font-bold uppercase tracking-[0.12em] transition-opacity hover:opacity-70"
                >
                  Voir toutes nos formations
                </Link>
              }
              cards={services.map((service) => ({
                title: service.title,
                href: `/formations/${service.slug}`,
                image: service.image,
                imageAlt: service.imageAlt || service.title,
                subtitle: `${service.trainings.length} formation${service.trainings.length > 1 ? "s" : ""}`,
                text: service.summary,
              }))}
            />
          </Reveal>
        )}

      </div>
    </section>
  );
}

// Suite des rangées de l'accueil (après À propos) : texte à gauche avec les
// faits clés du financement sous un filet, photo à droite.
function FinancementSection({ section }: { section: HomeSection }) {
  return (
    <section id="financement" className="px-6 pb-12 pt-4 sm:pb-16">
      <div className="mx-auto max-w-6xl">
        <StoryRow
          image={home.fundingImage || pages.funding.heroImage}
          imageAlt={section.title}
          side="right"
          align="left"
        >
          <StoryTitle>{section.title}</StoryTitle>
          {funding.points.map((point) => (
            <StoryFact key={point.title} title={point.title}>
              {point.text.split(/(?<=\.)\s/)[0]}
            </StoryFact>
          ))}
          <StoryLink href="/financement">Comprendre le financement</StoryLink>
        </StoryRow>
      </div>
    </section>
  );
}

// FAQ en deux colonnes : le titre à gauche (reste visible en défilant),
// les questions à droite, séparées par de simples filets.
function FaqSection({ section }: { section: HomeSection }) {
  if (home.faq.length === 0) return null;
  return (
    <section className="px-6 py-10 sm:py-14">
      <div className="mx-auto grid max-w-6xl gap-8 border-t border-foreground/20 pt-10 md:grid-cols-[1fr_2fr] md:gap-16 md:pt-12">
        <Reveal className="md:sticky md:top-28 md:self-start">
          <h2 className="font-bold tracking-tight text-xl sm:text-2xl">FAQ</h2>
          {section.title && (
            <p className="mt-4 max-w-xs whitespace-pre-line text-muted">{section.title}</p>
          )}
          {section.text && (
            <p className="mt-3 max-w-xs whitespace-pre-line text-sm text-muted">{section.text}</p>
          )}
          <Link
            href="/contact"
            className="underline-link mt-6 inline-block border-b pb-0.5 text-xs font-semibold uppercase tracking-[0.14em] transition-opacity hover:opacity-70"
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
          <h2 className="mt-4 whitespace-pre-line font-semibold tracking-tight text-xl sm:text-2xl">
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
