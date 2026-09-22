"use client";

import { useState } from "react";
import Link from "next/link";
import Visual from "@/components/Visual";
import { company, footerCta, footerImage, legal, services } from "@/lib/data";

/**
 * Le logo comme fenêtre, posé dans une bande colorée : la photo du pied
 * de page n'apparaît que dans la silhouette de l'icône, le reste du
 * panneau reste dans les couleurs de la marque. Sans photo, un dégradé
 * de marque remplace la photo à l'intérieur du logo.
 */
function CutoutLogo() {
  const mask = {
    WebkitMaskImage: "url(/brand/logo-icon.png)",
    maskImage: "url(/brand/logo-icon.png)",
    WebkitMaskSize: "contain",
    maskSize: "contain",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
  } as React.CSSProperties;

  return (
    <div
      className="mx-auto aspect-square w-40 rounded-3xl p-5 lg:w-48"
      style={{
        background: "linear-gradient(135deg, var(--accent), var(--background))",
      }}
    >
      <div
        aria-hidden="true"
        className="h-full w-full bg-cover bg-center"
        style={{
          ...mask,
          backgroundImage: footerImage
            ? `url(${footerImage})`
            : "linear-gradient(135deg, var(--background), var(--surface-2))",
        }}
      />
    </div>
  );
}

function Column({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground">
        {title}
      </p>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}

function NewsletterBand() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  if (!footerCta.enabled) return null;

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setState("sending");
    setError(null);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Demande de catalogue",
        email,
        message:
          "Demande du catalogue de formations envoyée depuis le pied de page du site.",
      }),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setState("idle");
      setError(data.error ?? "L'envoi a échoué. Merci de réessayer.");
      return;
    }

    setState("sent");
    setEmail("");
  };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Visual src={footerImage} alt="" sizes="100vw" />
        <div className="absolute inset-0 bg-background/70" />
      </div>

      <div className="relative mx-auto max-w-2xl px-6 py-20 text-center">
        {footerCta.eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {footerCta.eyebrow}
          </p>
        )}
        <h2 className="mt-4 whitespace-pre-line text-2xl font-semibold tracking-tight sm:text-3xl">
          {footerCta.title}
        </h2>
        {footerCta.text && (
          <p className="mt-4 whitespace-pre-line text-sm text-muted sm:text-base">
            {footerCta.text}
          </p>
        )}

        {state === "sent" ? (
          <p className="mt-8 rounded-2xl border border-accent/40 bg-background/60 px-6 py-4 text-sm backdrop-blur">
            Merci, votre demande est bien enregistrée. Nous revenons vers vous
            rapidement.
          </p>
        ) : (
          <form onSubmit={submit} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <label htmlFor="footer-email" className="sr-only">
              Votre adresse e-mail
            </label>
            <input
              id="footer-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre adresse e-mail"
              className="flex-1 rounded-full border border-white/25 bg-background/50 px-5 py-3 text-sm outline-none backdrop-blur placeholder:text-muted focus:border-accent"
            />
            <button
              type="submit"
              disabled={state === "sending"}
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            >
              {state === "sending" ? "Envoi…" : footerCta.buttonLabel}
            </button>
          </form>
        )}

        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
      </div>
    </section>
  );
}

export default function Footer() {
  const mainSectors = services.slice(0, 4);

  return (
    <>
      <NewsletterBand />

      {/* Fond uni opaque : aucune photo ne passe à travers, sauf dans
          la silhouette du logo (CutoutLogo, ci-dessus). */}
      <footer className="border-t border-border bg-surface px-6 py-16">
        <div className="mx-auto max-w-6xl text-sm text-muted">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto_1fr_1fr] lg:items-start lg:gap-12">
            <Column title="Formations">
              {mainSectors.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/formations/${service.slug}`}
                    className="hover:text-accent"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/formations" className="hover:text-accent">
                  Toutes les formations
                </Link>
              </li>
            </Column>

            <Column title="L'organisme">
              <li>
                <Link href="/centre" className="hover:text-accent">
                  Le centre
                </Link>
              </li>
              <li>
                <Link href="/financement" className="hover:text-accent">
                  Qualiopi &amp; financement
                </Link>
              </li>
              <li>
                <Link href="/equipe" className="hover:text-accent">
                  Notre équipe
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent">
                  Contact
                </Link>
              </li>
            </Column>

            <div className="order-first sm:col-span-2 lg:order-none lg:col-span-1 lg:px-6">
              <CutoutLogo />
            </div>

            <Column title="Nous joindre">
              <li>{company.address}</li>
              <li>
                <a
                  href={`tel:${company.phone.replace(/\s/g, "")}`}
                  className="hover:text-accent"
                >
                  {company.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${company.email}`}
                  className="hover:text-accent"
                >
                  {company.email}
                </a>
              </li>
            </Column>

            <Column title="Zone d'intervention">
              <li>{company.serviceArea}</li>
              <li>Intra-entreprise et inter-entreprises</li>
            </Column>
          </div>

          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs sm:flex-row">
            <p>
              &copy; {new Date().getFullYear()} {company.name}. Tous droits
              réservés.
            </p>
            {(legal.activityDeclaration || legal.qualiopiCertificate) && (
              <p>
                {legal.activityDeclaration &&
                  `Déclaration d'activité n° ${legal.activityDeclaration}`}
                {legal.activityDeclaration && legal.qualiopiCertificate && " · "}
                {legal.qualiopiCertificate &&
                  `Certification Qualiopi n° ${legal.qualiopiCertificate}`}
              </p>
            )}
          </div>
        </div>
      </footer>
    </>
  );
}
