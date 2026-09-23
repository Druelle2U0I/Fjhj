import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { activityDeclarationText, company, legal, qualiopiText, siteUrl } from "@/lib/data";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: `Mentions légales du site ${siteUrl.replace("https://", "")}, édité par ${company.name}.`,
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegalesPage() {
  const name = legal.legalName || company.name;

  return (
    <LegalPage title="Mentions légales" updated="23 septembre 2026">
      <h2>Éditeur du site</h2>
      <dl>
        <dt>Raison sociale</dt>
        <dd>{name}</dd>
        {legal.legalForm && (
          <>
            <dt>Forme juridique</dt>
            <dd>{legal.legalForm}</dd>
          </>
        )}
        {legal.capital && (
          <>
            <dt>Capital social</dt>
            <dd>{legal.capital}</dd>
          </>
        )}
        <dt>Siège social</dt>
        <dd>{company.address}</dd>
        {legal.rcs && (
          <>
            <dt>Immatriculation</dt>
            <dd>{legal.rcs}</dd>
          </>
        )}
        {legal.siret && (
          <>
            <dt>SIRET</dt>
            <dd>{legal.siret}</dd>
          </>
        )}
        {legal.vat && (
          <>
            <dt>TVA intracommunautaire</dt>
            <dd>{legal.vat}</dd>
          </>
        )}
        {legal.publicationDirector && (
          <>
            <dt>Directeur de la publication</dt>
            <dd>{legal.publicationDirector}</dd>
          </>
        )}
        <dt>Téléphone</dt>
        <dd>{company.phone}</dd>
        <dt>E-mail</dt>
        <dd>
          <a href={`mailto:${company.email}`}>{company.email}</a>
        </dd>
      </dl>

      <h2>Organisme de formation</h2>
      {activityDeclarationText() && <p>{activityDeclarationText()}</p>}
      {qualiopiText() && <p>{qualiopiText()}</p>}

      <h2>Hébergement</h2>
      <p>
        Le site est hébergé par <strong>Vercel Inc.</strong>, 440 N Barranca Ave
        #4133, Covina, CA 91723, États-Unis —{" "}
        <a href="https://vercel.com" rel="noopener noreferrer">
          vercel.com
        </a>
        .
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble des contenus de ce site (textes, logo, programmes de
        formation, mise en page) est la propriété de {name}, sauf mention
        contraire. Toute reproduction, représentation ou diffusion, totale ou
        partielle, sans autorisation écrite préalable est interdite.
      </p>

      <h2>Crédits photos</h2>
      <p>
        Les photographies utilisées sur ce site proviennent de la banque
        d&apos;images Canva (licence d&apos;utilisation commerciale) et de
        banques d&apos;images libres de droits.
      </p>

      <h2>Données personnelles et cookies</h2>
      <p>
        Le traitement des données transmises via les formulaires du site est
        détaillé dans notre{" "}
        <Link href="/confidentialite">politique de confidentialité</Link>. Ce
        site n&apos;utilise aucun cookie publicitaire ni outil de mesure
        d&apos;audience.
      </p>

      <h2>Responsabilité</h2>
      <p>
        {name} s&apos;efforce de fournir des informations exactes et à jour,
        mais ne peut garantir l&apos;absence d&apos;erreur ou d&apos;omission.
        Les informations présentées (programmes, durées, modalités) sont
        données à titre indicatif et sont confirmées dans la proposition
        commerciale et la convention de formation.
      </p>
    </LegalPage>
  );
}
