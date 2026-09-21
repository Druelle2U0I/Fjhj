import Link from "next/link";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Reveal from "@/components/Reveal";
import { services, funding } from "@/lib/data";

export default function Home() {
  const featuredSectors = services.slice(0, 6);

  return (
    <>
      <Hero />
      <About />

      <section id="formations" className="bg-surface px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-wide text-accent">
              Nos formations
            </span>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
              9 domaines de formation, 35 parcours certifiés Qualiopi
            </h2>
            <p className="mt-4 max-w-2xl text-muted">
              Toutes nos formations sont finançables OPCO et proposées en
              intra-entreprise, partout en Hauts-de-France.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredSectors.map((service, i) => (
              <Reveal key={service.slug} delay={(i % 3) * 0.05}>
                <Link
                  href={`/formations/${service.slug}`}
                  className="dyn-card block h-full rounded-2xl border border-border bg-background p-6"
                >
                  <div className="mb-3 h-1 w-10 rounded-full bg-gold" />
                  <h3 className="text-lg font-semibold">{service.title}</h3>
                  <p className="mt-2 text-sm text-muted">
                    {service.description}
                  </p>
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

      <Gallery />

      <section id="financement" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal className="dyn-card rounded-3xl border border-border bg-surface p-8 sm:p-12">
            <span className="text-sm font-semibold uppercase tracking-wide text-accent">
              Qualiopi & financement
            </span>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Un financement pris en charge, sans démarche de votre côté
            </h2>
            <p className="mt-5 max-w-2xl text-muted">{funding.intro}</p>
            <Link
              href="/financement"
              className="mt-6 inline-flex rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
            >
              Comprendre le financement
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-surface px-6 py-24">
        <div className="mx-auto max-w-6xl text-center">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Parlons de vos besoins en formation
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Décrivez votre projet, nous revenons vers vous sous 24 heures
              avec une proposition adaptée et le montage du dossier OPCO.
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
