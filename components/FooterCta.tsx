"use client";

import { useState } from "react";
import Visual from "@/components/Visual";
import { footerCta, footerImage } from "@/lib/data";

export default function FooterCta() {
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
          <form
            onSubmit={submit}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
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
