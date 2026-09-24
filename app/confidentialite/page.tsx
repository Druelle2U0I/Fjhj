import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { company, legal } from "@/lib/data";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: `Comment ${company.name} collecte, utilise et protège vos données personnelles.`,
  alternates: { canonical: "/confidentialite" },
};

export default function ConfidentialitePage() {
  const name = legal.legalName || company.name;
  const mail = <a href={`mailto:${company.email}`}>{company.email}</a>;

  return (
    <LegalPage
      title="Politique de confidentialité"
      description="Quelles données nous collectons, pourquoi, combien de temps nous les gardons et comment exercer vos droits."
      updated="23 septembre 2026"
    >
      <h2>Responsable du traitement</h2>
      <p>
        {name}, {legal.legalForm ? `${legal.legalForm}, ` : ""}dont le siège est
        situé {company.address}
        {legal.rcs ? `, immatriculée sous le numéro ${legal.rcs}` : ""}.
        Contact pour toute question relative à vos données : {mail}.
      </p>

      <h2>Données collectées et finalités</h2>
      <h3>Formulaire de contact et demande de devis</h3>
      <p>
        Nom, adresse e-mail, téléphone, entreprise, formation souhaitée, nombre
        de stagiaires et message. Ces données servent uniquement à répondre à
        votre demande, à établir un devis et à assurer le suivi commercial de
        votre projet de formation.
      </p>
      <p>
        <strong>Base légale :</strong> mesures précontractuelles prises à votre
        demande et intérêt légitime de {name} à répondre aux entreprises qui la
        sollicitent.
      </p>
      <h3>Demande de catalogue</h3>
      <p>
        Adresse e-mail. Elle sert à vous envoyer notre catalogue de formations
        puis, le cas échéant, des informations sur nos formations en lien avec
        votre activité professionnelle.
      </p>
      <p>
        <strong>Base légale :</strong> intérêt légitime (prospection auprès de
        professionnels). Vous pouvez vous y opposer à tout moment, sur simple
        demande par e-mail.
      </p>
      <h3>Stagiaires</h3>
      <p>
        Les données des stagiaires (identité, feuilles d&apos;émargement,
        évaluations, attestations) sont traitées pour l&apos;exécution de la
        convention de formation et le respect de nos obligations légales
        d&apos;organisme de formation.
      </p>

      <h2>Durée de conservation</h2>
      <ul>
        <li>
          Demandes de contact et prospects : 3 ans à compter du dernier échange.
        </li>
        <li>
          Dossiers de formation et documents comptables : durées prévues par la
          loi (jusqu&apos;à 10 ans pour les pièces comptables).
        </li>
      </ul>

      <h2>Destinataires</h2>
      <p>
        Vos données sont destinées exclusivement à l&apos;équipe de {name}. Elles
        ne sont ni vendues ni cédées. Nous faisons appel à des prestataires
        techniques qui les traitent pour notre compte :
      </p>
      <ul>
        <li>
          <strong>Vercel Inc.</strong> (États-Unis) — hébergement du site et
          statistiques de fréquentation anonymes ;
        </li>
        <li>
          <strong>Resend</strong> (États-Unis) — acheminement des messages
          envoyés depuis les formulaires ;
        </li>
        <li>notre messagerie professionnelle, où ces messages sont reçus.</li>
      </ul>
      <p>
        Les transferts de données vers les États-Unis sont encadrés par les
        garanties prévues par le RGPD (Data Privacy Framework ou clauses
        contractuelles types de la Commission européenne).
      </p>
      <p>
        Pour la prise en charge financière d&apos;une formation, certaines
        données sont transmises à l&apos;OPCO ou au financeur concerné, à votre
        demande.
      </p>

      <h2>Cookies</h2>
      <p>
        Ce site n&apos;utilise aucun cookie publicitaire ni traceur de réseaux
        sociaux. Seul un cookie technique, strictement nécessaire, est déposé
        lors de la connexion à l&apos;espace d&apos;administration réservé à
        notre équipe.
      </p>
      <p>
        Pour connaître la fréquentation du site, nous utilisons Vercel Web
        Analytics, un outil de mesure d&apos;audience sans cookie : il produit
        uniquement des statistiques anonymes et agrégées (pages consultées,
        site de provenance, pays, type d&apos;appareil), sans identifier les
        visiteurs ni les suivre d&apos;un site à l&apos;autre. Aucun
        consentement n&apos;est donc requis.
      </p>

      <h2>Vos droits</h2>
      <p>
        Vous disposez d&apos;un droit d&apos;accès, de rectification,
        d&apos;effacement, de limitation et de portabilité de vos données, ainsi
        que d&apos;un droit d&apos;opposition à leur traitement. Pour les
        exercer, écrivez-nous à {mail} ou par courrier à l&apos;adresse du
        siège. Nous répondons dans un délai d&apos;un mois.
      </p>
      <p>
        Si vous estimez, après nous avoir contactés, que vos droits ne sont pas
        respectés, vous pouvez adresser une réclamation à la CNIL (
        <a href="https://www.cnil.fr" rel="noopener noreferrer">
          www.cnil.fr
        </a>
        ).
      </p>

      <h2>Sécurité</h2>
      <p>
        Le site est servi exclusivement en connexion chiffrée (HTTPS) et
        l&apos;accès aux données est limité aux seules personnes qui en ont
        besoin.
      </p>
    </LegalPage>
  );
}
