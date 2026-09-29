import type { ReactNode } from "react";
import PageHero from "@/components/PageHero";
import { legal, pages } from "@/lib/data";

// Mise en page commune aux pages légales : en-tête de page puis texte
// courant sur une colonne lisible.
export default function LegalPage({
  title,
  description,
  updated,
  children,
}: {
  title: string;
  description?: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHero
        eyebrow="Informations légales"
        title={title}
        description={description}
        // Même bandeau photo que les autres pages (sinon celui de l'équipe).
        backgroundImage={legal.heroImage || pages.team.heroImage}
        imageAlt={legal.heroImage ? legal.heroImageAlt : pages.team.heroImageAlt}
      />
      <section className="px-6 py-10">
        <div className="legal-prose mx-auto max-w-3xl">
          {children}
          <p className="mt-12 border-t border-border pt-6 text-sm text-muted">
            Dernière mise à jour : {updated}
          </p>
        </div>
      </section>
    </>
  );
}
