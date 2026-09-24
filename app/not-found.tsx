import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative -mt-[86px] px-6 pt-[128px] pb-24 text-center sm:-mt-[94px] sm:pt-[148px]">
      <div className="mx-auto max-w-xl">
        <span className="text-sm font-semibold text-accent">
          Erreur 404
        </span>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Cette page n&apos;existe pas
        </h1>
        <p className="mt-5 text-muted">
          La page que vous cherchez a peut-être été déplacée ou n&apos;existe
          plus. Vous pouvez retourner à l&apos;accueil, consulter nos
          formations ou nous contacter directement.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-105"
          >
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/formations"
            className="rounded-lg border border-border px-6 py-3 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
          >
            Voir les formations
          </Link>
          <Link
            href="/contact"
            className="rounded-lg border border-border px-6 py-3 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
          >
            Nous contacter
          </Link>
        </div>
      </div>
    </section>
  );
}
