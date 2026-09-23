import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { activityDeclarationText, company, legal } from "@/lib/data";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description: `Conditions générales de vente des formations professionnelles proposées par ${company.name}.`,
  alternates: { canonical: "/cgv" },
};

export default function CgvPage() {
  const name = legal.legalName || company.name;
  const notice = legal.cancellationNotice || "15 jours";
  const fee = legal.cancellationFee || "la totalité du prix de la formation";
  const payment = legal.paymentTerms || "30 jours";
  const court = legal.court || "Tribunal de commerce d'Arras";

  return (
    <LegalPage
      title="Conditions générales de vente"
      description="Les règles qui encadrent nos formations, de la demande de devis jusqu'à la facturation."
      updated="23 septembre 2026"
    >
      <h2>1. Objet et champ d&apos;application</h2>
      <p>
        Les présentes conditions générales de vente (CGV) s&apos;appliquent à
        toutes les actions de formation professionnelle proposées par {name},{" "}
        {legal.legalForm ? `${legal.legalForm} ` : ""}
        {legal.capital ? `au capital de ${legal.capital}, ` : ""}
        {legal.rcs ? `${legal.rcs}, ` : ""}dont le siège est situé{" "}
        {company.address} (ci-après « l&apos;organisme »). {activityDeclarationText()}
      </p>
      <p>
        Nos formations s&apos;adressent exclusivement aux professionnels
        (entreprises, collectivités, associations et établissements), ci-après
        « le client ». Toute commande implique l&apos;acceptation sans réserve
        des présentes CGV, qui prévalent sur tout autre document du client, sauf
        accord écrit contraire.
      </p>

      <h2>2. Inscription et documents contractuels</h2>
      <p>
        Toute formation fait l&apos;objet d&apos;une proposition commerciale
        (devis) précisant le programme, la durée, le lieu, les dates, le nombre
        de stagiaires et le prix. L&apos;inscription est ferme à réception du
        devis signé par le client.
      </p>
      <p>
        Conformément aux articles L6353-1 et suivants du Code du travail, une
        convention de formation est ensuite établie en double exemplaire, dont
        un est retourné signé à l&apos;organisme avant le début de la
        formation. Une convocation est adressée au client pour chaque stagiaire.
        À l&apos;issue de la formation, une attestation de fin de formation est
        remise à chaque stagiaire, et les feuilles d&apos;émargement sont
        tenues à la disposition du client et du financeur.
      </p>

      <h2>3. Prix</h2>
      <p>
        Les prix sont indiqués sur le devis, en euros hors taxes. Ils sont
        majorés de la TVA au taux en vigueur, sauf exonération applicable. Ils
        comprennent l&apos;animation, les supports pédagogiques et les
        documents de fin de formation. Pour les formations réalisées dans les
        locaux du client, les éventuels frais de déplacement du formateur sont
        précisés sur le devis. Aucun acompte n&apos;est demandé à la commande.
      </p>

      <h2>4. Facturation et paiement</h2>
      <p>
        La facture est émise à l&apos;issue de la formation. Elle est payable à{" "}
        {payment} à compter de sa date d&apos;émission, par virement bancaire,
        sans escompte en cas de paiement anticipé.
      </p>
      <p>
        Tout retard de paiement entraîne de plein droit, sans mise en demeure
        préalable, l&apos;application de pénalités de retard égales au taux
        d&apos;intérêt appliqué par la Banque centrale européenne à son
        opération de refinancement la plus récente, majoré de 10 points, ainsi
        qu&apos;une indemnité forfaitaire pour frais de recouvrement de 40 €
        (articles L441-10 et D441-5 du Code de commerce).
      </p>

      <h2>5. Prise en charge par un OPCO ou un financeur</h2>
      <p>
        Lorsque le client souhaite faire financer la formation par son OPCO ou
        un autre financeur, il lui appartient de formuler la demande de prise
        en charge avant le début de la formation. L&apos;organisme
        l&apos;accompagne dans cette démarche et lui fournit les documents
        nécessaires (devis, programme, convention).
      </p>
      <ul>
        <li>
          Si le financeur règle directement l&apos;organisme (subrogation de
          paiement), la part non prise en charge est facturée au client.
        </li>
        <li>
          Si l&apos;accord de prise en charge n&apos;est pas parvenu à
          l&apos;organisme au premier jour de la formation, ou en cas de refus
          ou de prise en charge partielle, le client reste redevable de la
          totalité du prix, ou du solde.
        </li>
      </ul>

      <h2>6. Annulation, report et absences</h2>
      <h3>Du fait du client</h3>
      <ul>
        <li>
          Toute annulation ou demande de report doit être notifiée par écrit
          (e-mail ou courrier).
        </li>
        <li>
          Jusqu&apos;à {notice} avant le premier jour de formation :
          l&apos;annulation ou le report est sans frais.
        </li>
        <li>
          Moins de {notice} avant le premier jour de formation, dès lors que
          le devis ou la convention a été signé : {fee} reste due par le
          client à titre de dédommagement.
        </li>
        <li>
          Toute formation commencée est due en totalité. En cas
          d&apos;absence ou d&apos;abandon d&apos;un stagiaire, les heures non
          suivies restent dues par le client, sauf cas de force majeure dûment
          justifié.
        </li>
        <li>
          Le remplacement d&apos;un stagiaire par un autre salarié de la même
          entreprise est possible sans frais jusqu&apos;à la veille de la
          formation.
        </li>
      </ul>
      <p>
        Conformément à l&apos;article L6354-1 du Code du travail, les sommes
        dues à titre de dédommagement ne peuvent pas être imputées sur les
        fonds de la formation professionnelle ni prises en charge par
        l&apos;OPCO. Elles font l&apos;objet d&apos;une facturation distincte.
      </p>
      <h3>Du fait de l&apos;organisme</h3>
      <p>
        L&apos;organisme se réserve le droit de reporter une session, notamment
        en cas d&apos;indisponibilité du formateur, de nombre insuffisant de
        participants en inter-entreprises ou de force majeure. Le client en est
        informé dans les meilleurs délais et une nouvelle date lui est proposée.
        À défaut d&apos;accord sur une nouvelle date, les sommes éventuellement
        versées sont intégralement remboursées, sans autre indemnité.
      </p>

      <h2>7. Obligations du client et des stagiaires</h2>
      <p>
        Pour les formations réalisées sur site, le client met à disposition un
        local adapté et, le cas échéant, le matériel et les équipements
        nécessaires aux exercices pratiques, conformes à la réglementation et
        en bon état. Il s&apos;assure que les stagiaires remplissent les
        prérequis indiqués dans le programme (aptitude médicale pour les
        formations à la conduite d&apos;engins, par exemple).
      </p>
      <p>
        Les stagiaires sont tenus de respecter le règlement intérieur de
        l&apos;organisme, remis avec la convocation et disponible sur simple
        demande, ainsi que les consignes d&apos;hygiène et de sécurité du lieu
        de formation.
      </p>

      <h2>8. Accessibilité</h2>
      <p>
        Toute situation de handicap nécessitant une adaptation de la formation
        doit être signalée avant l&apos;inscription à notre référent handicap,
        afin d&apos;étudier ensemble les aménagements possibles. Contact :{" "}
        <a href={`mailto:${company.email}`}>{company.email}</a>.
      </p>

      <h2>9. Propriété intellectuelle</h2>
      <p>
        Les supports remis aux stagiaires sont la propriété de
        l&apos;organisme. Ils sont destinés à l&apos;usage personnel des
        stagiaires et ne peuvent être reproduits, diffusés ou exploités, même
        partiellement, sans autorisation écrite.
      </p>

      <h2>10. Responsabilité et assurance</h2>
      <p>
        L&apos;organisme est tenu à une obligation de moyens. Sa responsabilité
        ne saurait être engagée pour les dommages indirects, ni au-delà du
        montant payé par le client au titre de la formation concernée. Pendant
        les formations réalisées dans ses locaux, le client reste responsable
        de ses installations, équipements et salariés.
      </p>

      <h2>11. Données personnelles</h2>
      <p>
        Les données communiquées dans le cadre de l&apos;inscription sont
        traitées conformément à notre{" "}
        <Link href="/confidentialite">politique de confidentialité</Link>.
      </p>

      <h2>12. Droit applicable et litiges</h2>
      <p>
        Les présentes CGV sont soumises au droit français. En cas de
        différend, les parties recherchent d&apos;abord une solution amiable. À
        défaut, tout litige relève de la compétence exclusive du {court}.
      </p>
    </LegalPage>
  );
}
