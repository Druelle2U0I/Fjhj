"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import HeroBackgroundPhoto from "@/components/HeroBackgroundPhoto";
import { accessibility, company, pages } from "@/lib/data";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact({
  defaultTraining,
}: {
  defaultTraining?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const trainingInput = useRef<HTMLInputElement>(null);

  // La formation choisie (lien « Demander un devis ») est lue dans l'adresse
  // côté navigateur : la page Contact peut ainsi être préparée à l'avance
  // et s'afficher instantanément.
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("formation");
    const value = defaultTraining ?? fromUrl;
    if (value && trainingInput.current && !trainingInput.current.value) {
      trainingInput.current.value = value;
    }
  }, [defaultTraining]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError(null);

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Une erreur est survenue.");
      }

      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    }
  }

  const hasPhoto = Boolean(pages.contact.heroImage);

  return (
    <section
      id="contact"
      className="page-hero relative -mt-[86px] overflow-hidden px-6 pt-[112px] pb-14 sm:-mt-[94px] sm:pt-[148px] sm:pb-24"
    >
      {hasPhoto && (
        <HeroBackgroundPhoto src={pages.contact.heroImage!} alt={pages.contact.title} />
      )}
      <div className={`relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 ${hasPhoto ? "on-surface" : ""}`}>
        <div className="flex flex-col">
          <span className="eyebrow block">
            {pages.contact.eyebrow}
          </span>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            {pages.contact.title}
          </h1>
          <p className="page-intro mt-5 max-w-md whitespace-pre-line text-muted">
            {pages.contact.text}
          </p>

          <div className="mt-8 space-y-3 text-sm">
            <p className="flex gap-2">
              <span className="font-medium text-muted">Email</span>
              <a href={`mailto:${company.email}`} className="hover:text-accent">
                {company.email}
              </a>
            </p>
            <p className="flex gap-2">
              <span className="font-medium text-muted">Téléphone</span>
              <span>{company.phone}</span>
            </p>
            <p className="flex gap-2">
              <span className="font-medium text-muted">Adresse</span>
              <span>{company.address}</span>
            </p>
            <p className="flex gap-2">
              <span className="font-medium text-muted">Zone</span>
              <span>{company.serviceArea}</span>
            </p>
          </div>

          {/* Référent handicap (Qualiopi, indicateur 26) : encadré lisible. */}
          {/* Collé en bas de la colonne : finit à la même hauteur que le formulaire. */}
          <div className="mt-8 max-w-md rounded-sm border border-current/30 p-5 lg:mt-auto">
            <p className="font-semibold text-foreground">Accessibilité et situation de handicap</p>
            <p className="mt-2 text-sm text-foreground/90">
              Nous adaptons la formation à chaque situation (durée, pauses, supports, accès). Prévenez-nous avant
              l&apos;inscription.
            </p>
            <p className="mt-3 text-sm text-foreground">
              Référent handicap : {accessibility.referent} —{" "}
              <a href={`mailto:${company.email}`} className="underline underline-offset-2 hover:text-surface-accent">
                {company.email}
              </a>
            </p>
          </div>
        </div>

        <div>
          <form
            onSubmit={handleSubmit}
            className="dyn-card rounded-lg border border-border bg-background p-6 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label htmlFor="name" className="text-sm font-medium">
                  Nom complet
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  className="mt-1.5 w-full rounded-sm border border-foreground/25 bg-white px-3 py-2 text-sm text-[#0b0c31] outline-none transition-colors placeholder:text-[#636a77] focus:border-foreground"
                />
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1.5 w-full rounded-sm border border-foreground/25 bg-white px-3 py-2 text-sm text-[#0b0c31] outline-none transition-colors placeholder:text-[#636a77] focus:border-foreground"
                />
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="company" className="text-sm font-medium">
                  Entreprise
                </label>
                <input
                  id="company"
                  name="company"
                  className="mt-1.5 w-full rounded-sm border border-foreground/25 bg-white px-3 py-2 text-sm text-[#0b0c31] outline-none transition-colors placeholder:text-[#636a77] focus:border-foreground"
                />
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="phone" className="text-sm font-medium">
                  Téléphone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="mt-1.5 w-full rounded-sm border border-foreground/25 bg-white px-3 py-2 text-sm text-[#0b0c31] outline-none transition-colors placeholder:text-[#636a77] focus:border-foreground"
                />
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="training" className="text-sm font-medium">
                  Formation souhaitée
                </label>
                <input
                  id="training"
                  name="training"
                  ref={trainingInput}
                  placeholder="Ex : CACES R489, SST..."
                  className="mt-1.5 w-full rounded-sm border border-foreground/25 bg-white px-3 py-2 text-sm text-[#0b0c31] outline-none transition-colors placeholder:text-[#636a77] focus:border-foreground"
                />
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="trainees" className="text-sm font-medium">
                  Nombre de stagiaires
                </label>
                <input
                  id="trainees"
                  name="trainees"
                  type="number"
                  min={1}
                  className="mt-1.5 w-full rounded-sm border border-foreground/25 bg-white px-3 py-2 text-sm text-[#0b0c31] outline-none transition-colors placeholder:text-[#636a77] focus:border-foreground"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="format" className="text-sm font-medium">
                  Format préféré
                </label>
                <select
                  id="format"
                  name="format"
                  defaultValue="Intra-entreprise"
                  className="mt-1.5 w-full rounded-sm border border-foreground/25 bg-white px-3 py-2 text-sm text-[#0b0c31] outline-none transition-colors placeholder:text-[#636a77] focus:border-foreground"
                >
                  <option>Intra-entreprise</option>
                  <option>Inter-entreprises</option>
                  <option>Je ne sais pas encore</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Votre besoin
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="mt-1.5 w-full rounded-sm border border-foreground/25 bg-white px-3 py-2 text-sm text-[#0b0c31] outline-none transition-colors placeholder:text-[#636a77] focus:border-foreground"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-6 w-full rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.02] disabled:opacity-60"
            >
              {status === "sending" ? "Envoi en cours..." : pages.contact.submitButton}
            </button>

            <p className="mt-4 text-xs text-muted">
              Les informations saisies servent uniquement à répondre à votre
              demande et à établir votre devis. Elles sont conservées 3 ans et
              ne sont jamais cédées. Vous pouvez y accéder, les rectifier ou les
              faire supprimer à tout moment.{" "}
              <Link href="/confidentialite" className="underline hover:text-accent">
                Politique de confidentialité
              </Link>
            </p>

            {status === "sent" && (
              <p className="mt-4 text-sm text-green-400">
                {pages.contact.successMessage}
              </p>
            )}
            {status === "error" && (
              <p className="mt-4 text-sm text-red-400">{error}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
