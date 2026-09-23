import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { accessibility, company } from "@/lib/data";

export const metadata: Metadata = {
  title: "Accessibilité",
  description: `Accueil des personnes en situation de handicap et accessibilité du site ${company.name}.`,
};

export default function AccessibilitePage() {
  const mail = <a href={`mailto:${company.email}`}>{company.email}</a>;

  return (
    <LegalPage
      title="Accessibilité"
      description="Nos engagements pour rendre nos formations et notre site accessibles à tous."
      updated="23 septembre 2026"
    >
      <h2>Accueil des personnes en situation de handicap</h2>
      <p>{accessibility.text}</p>
      <p>
        <strong>Référent handicap :</strong> {accessibility.referent} — {mail} —{" "}
        {company.phone}.
      </p>

      <h2>Accessibilité du site</h2>
      <p>
        {company.name} veille à ce que son site soit utilisable par le plus
        grand nombre, y compris avec un lecteur d&apos;écran ou une navigation
        au clavier. Le site n&apos;a pas fait l&apos;objet d&apos;un audit de
        conformité au référentiel général d&apos;amélioration de
        l&apos;accessibilité (RGAA). Voici ce qui est déjà mis en place :
      </p>
      <ul>
        <li>langue des pages déclarée en français ;</li>
        <li>textes alternatifs sur les images porteuses d&apos;information ;</li>
        <li>champs de formulaire associés à une étiquette ;</li>
        <li>navigation possible au clavier, avec repère de focus visible ;</li>
        <li>
          animations désactivées lorsque le visiteur a demandé à réduire les
          animations dans les réglages de son appareil ;
        </li>
        <li>forts contrastes entre le texte et le fond.</li>
      </ul>

      <h2>Signaler un problème</h2>
      <p>
        Si vous rencontrez une difficulté pour accéder à un contenu ou à un
        service du site, écrivez-nous à {mail}. Nous vous répondrons et vous
        transmettrons l&apos;information par un autre moyen si nécessaire.
      </p>
    </LegalPage>
  );
}
