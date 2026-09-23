import type { Metadata } from "next";
import Link from "next/link";
import AnimatedStat from "@/components/AnimatedStat";
import FranceMap from "@/components/FranceMap";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { company, home, pillars, services, stats } from "@/lib/data";

export const metadata: Metadata = {
  title: "Le centre",
  description:
    "ENMA Formation, organisme de formation certifié Qualiopi implanté dans les Hauts-de-France : notre approche, nos engagements, nos domaines de formation.",
};

export default function CentrePage() {
  return (
    <>
      <PageHero
        eyebrow="Le centre"
        title="Un organisme de formation certifié Qualiopi, ancré dans les Hauts-de-France"
        description={company.tagline}
        image={home.aboutImage}
        imageAlt={home.aboutImageAlt}
      />

      <FranceMap />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-wide text-accent">
              Notre approche
            </span>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              Une expertise de terrain au service de vos équipes
            </h2>
            <div className="mt-5 grid gap-4 text-muted">
              <p>{company.about}</p>
              <p>
                Nos formateurs interviennent directement dans vos locaux ou
                sur plateau technique, avec le matériel que vos équipes
                utilisent au quotidien. Cet ancrage régional nous permet de
                construire des parcours alignés sur les réalités de votre
                secteur d&apos;activité, qu&apos;il s&apos;agisse d&apos;une
                TPE, d&apos;une PME industrielle ou d&apos;une collectivité.
              </p>
              <p>
                Chaque formation est pensée pour un résultat concret :
                certifier une compétence, répondre à une obligation
                réglementaire, ou installer durablement une culture de
                sécurité au sein de vos équipes.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-soft px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-wide text-accent">
              Pourquoi choisir ENMA Formation
            </span>
            <h2 className="mt-3 max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl">
              Trois engagements qui structurent chaque formation
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 0.08}>
                <div className="dyn-card h-full rounded-2xl border border-border bg-background p-6">
                  <h3 className="text-lg font-semibold">{pillar.title}</h3>
                  <p className="mt-2 text-sm text-muted">{pillar.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} className="mt-14 grid grid-cols-2 gap-8 border-t border-border pt-10 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <p className="text-3xl font-semibold text-accent">
                  <AnimatedStat value={stat.value} />
                </p>
                <p className="mt-1 text-sm text-muted">{stat.label}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-wide text-accent">
              Nos domaines
            </span>
            <h2 className="mt-3 max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl">
              {services.length} domaines de formation, du terrain jusqu&apos;au bureau
              d&apos;études
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={(i % 3) * 0.05}>
                <Link
                  href={`/formations/${service.slug}`}
                  className="dyn-card flex items-center justify-between gap-3 rounded-xl border border-border bg-surface px-5 py-4 text-sm font-medium transition-colors hover:border-accent"
                >
                  {service.title}
                  <span className="shrink-0 text-xs text-muted">
                    {service.trainings.length}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-soft px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Un projet de formation pour vos équipes ?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Décrivez votre besoin : nous revenons vers vous rapidement avec
              une proposition adaptée et le montage du dossier de
              financement.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-105"
            >
              Nous contacter
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
