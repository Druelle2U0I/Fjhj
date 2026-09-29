import type { Metadata } from "next";
import { Fragment } from "react";
import LegalPage from "@/components/LegalPage";
import reglement from "@/content/reglement-interieur.json";
import { legal } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Règlement intérieur",
  description:
    "Règlement intérieur applicable aux stagiaires et apprenants d'ENMA Formation : hygiène, sécurité, discipline et droits de la défense.",
  path: "/reglement-interieur",
});

type Block = { kind: string; text: string };

// Paragraphes, puces (•) et étapes numérotées d'un article, regroupés
// pour produire des listes HTML.
function Blocks({ blocks }: { blocks: Block[] }) {
  const groups: { kind: string; items: string[] }[] = [];
  for (const b of blocks) {
    const last = groups[groups.length - 1];
    if (b.kind !== "p" && last?.kind === b.kind) last.items.push(b.text);
    else groups.push({ kind: b.kind, items: [b.text] });
  }
  return (
    <>
      {groups.map((g, i) =>
        g.kind === "li" ? (
          <ul key={i}>
            {g.items.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        ) : g.kind === "ol" ? (
          <ol key={i}>
            {g.items.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ol>
        ) : (
          <p key={i}>{g.items[0]}</p>
        ),
      )}
    </>
  );
}

export default function ReglementInterieurPage() {
  return (
    <LegalPage
      title="Règlement intérieur"
      description="Applicable aux stagiaires et apprenants de chaque session de formation."
      updated="10 juillet 2026"
    >
      {legal.rulesDocument && (
        <p>
          <a
            href={legal.rulesDocument}
            target="_blank"
            rel="noopener noreferrer"
            className="legal-button"
          >
            Télécharger le règlement intérieur (PDF)
          </a>
        </p>
      )}

      {reglement.chapters.map((chapter, c) => (
        <Fragment key={chapter.title}>
          <h2>
            {["I", "II", "III", "IV", "V"][c]}. {chapter.title}
          </h2>
          <Blocks blocks={chapter.intro} />
          {chapter.articles.map((article) => (
            <div key={article.num}>
              <h3>
                Article {article.num} — {article.title}
              </h3>
              <Blocks blocks={article.blocks} />
            </div>
          ))}
        </Fragment>
      ))}

      <h2>Entrée en vigueur</h2>
      <p>{reglement.closing.text}</p>
      <p>
        <em>{reglement.closing.signed}</em>
      </p>
    </LegalPage>
  );
}
