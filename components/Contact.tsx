"use client";

import { useState, type FormEvent } from "react";
import Reveal from "@/components/Reveal";
import Link from "next/link";
import { accessibility, company, pages } from "@/lib/data";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact({
  defaultTraining,
}: {
  defaultTraining?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

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

  return (
    <section id="contact" className="section-soft px-6 py-24">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
        <Reveal>
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">
            {pages.contact.eyebrow}
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {pages.contact.title}
          </h2>
          <p className="mt-5 max-w-md whitespace-pre-line text-muted">
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

          <p className="mt-8 max-w-md text-xs text-muted">
            {accessibility.text} — {accessibility.referent} :{" "}
            <a href={`mailto:${company.email}`} className="hover:text-accent">
              {company.email}
            </a>
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="dyn-card rounded-2xl border border-border bg-background p-6 sm:p-8"
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
                  className="mt-1.5 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none transition-colors focus:border-accent"
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
                  className="mt-1.5 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none transition-colors focus:border-accent"
                />
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="company" className="text-sm font-medium">
                  Entreprise
                </label>
                <input
                  id="company"
                  name="company"
                  className="mt-1.5 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none transition-colors focus:border-accent"
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
                  className="mt-1.5 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none transition-colors focus:border-accent"
                />
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="training" className="text-sm font-medium">
                  Formation souhaitée
                </label>
                <input
                  id="training"
                  name="training"
                  defaultValue={defaultTraining}
                  placeholder="Ex : CACES R489, SST..."
                  className="mt-1.5 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none transition-colors focus:border-accent"
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
                  className="mt-1.5 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none transition-colors focus:border-accent"
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
                  className="mt-1.5 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none transition-colors focus:border-accent"
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
                  className="mt-1.5 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none transition-colors focus:border-accent"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-6 w-full rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.02] disabled:opacity-60"
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
        </Reveal>
      </div>
    </section>
  );
}
