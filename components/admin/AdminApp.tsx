"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { HomeSection, HomeSectionId, SiteContent, Stat } from "@/lib/data";
import SectorsEditor from "./SectorsEditor";
import DesignEditor from "./DesignEditor";
import ColorEverywhere from "./ColorEverywhere";
import CommonColors from "./CommonColors";
import PageColorsEditor from "./PageColorsEditor";
import PagesEditor from "./PagesEditor";
import { Card, Field, ImageField, ListEditor, PdfField, SmallButton, VideoField } from "./ui";

// Menu par page du site, puis réglages communs à tout le site.
const SECTIONS = [
  { id: "accueil", label: "Accueil", group: "Pages du site" },
  { id: "catalogue", label: "Catalogue & formations", group: "Pages du site" },
  { id: "centre", label: "Le centre", group: "Pages du site" },
  { id: "financement", label: "Qualiopi & financement", group: "Pages du site" },
  { id: "equipe", label: "Équipe", group: "Pages du site" },
  { id: "contact", label: "Contact", group: "Pages du site" },
  { id: "entreprise", label: "Coordonnées", group: "Tout le site" },
  { id: "pied", label: "Pied de page", group: "Tout le site" },
  { id: "legal", label: "Mentions légales & Qualiopi", group: "Tout le site" },
  { id: "accessibilite", label: "Accessibilité & handicap", group: "Tout le site" },
  { id: "design", label: "Design & couleurs", group: "Tout le site" },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

const SECTION_NAMES: Record<HomeSectionId, string> = {
  formations: "Secteurs",
  about: "À propos",
  financement: "Financement",
  faq: "FAQ",
  contact: "Contact",
};

function BlockTitle({ n, title }: { n?: number; title: string }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-wide text-surface-accent">
      {n ? `${n}. ` : ""}
      {title}
    </p>
  );
}

function Check({ label, checked, onChange }: { label: string; checked: boolean; onChange: (c: boolean) => void }) {
  return (
    <label className="flex items-center gap-3 text-sm">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 accent-[color:var(--accent)]"
      />
      {label}
    </label>
  );
}

export default function AdminApp({ initial, baseSha }: { initial: SiteContent; baseSha?: string }) {
  const router = useRouter();
  const [content, setContent] = useState<SiteContent>(initial);
  const [section, setSection] = useState<SectionId>("accueil");
  const [dirty, setDirty] = useState(false);
  // Version du contenu sur laquelle s'appuient les modifications en cours.
  const [sha, setSha] = useState(baseSha);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    kind: "ok" | "error";
    text: string;
  } | null>(null);

  const update = (next: SiteContent) => {
    setContent(next);
    setDirty(true);
    setMessage(null);
  };

  const setHome = (patch: Partial<SiteContent["home"]>) =>
    update({ ...content, home: { ...content.home, ...patch } });
  const setHero = (patch: Partial<SiteContent["pages"]["hero"]>) =>
    update({ ...content, pages: { ...content.pages, hero: { ...content.pages.hero, ...patch } } });
  const homeSection = (id: HomeSectionId) => content.home.sections.find((s) => s.id === id);
  const setHomeSection = (id: HomeSectionId, patch: Partial<HomeSection>) =>
    setHome({ sections: content.home.sections.map((s) => (s.id === id ? { ...s, ...patch } : s)) });
  const moveSection = (id: HomeSectionId, delta: number) => {
    const list = [...content.home.sections];
    const i = list.findIndex((s) => s.id === id);
    let j = i + delta;
    // Les secteurs et le contact ne se déplacent pas ici.
    while (list[j] && (list[j].id === "formations" || list[j].id === "contact")) j += delta;
    if (i < 0 || !list[j]) return;
    [list[i], list[j]] = [list[j], list[i]];
    setHome({ sections: list });
  };
  // Petit texte, titre et texte d'une section de l'accueil.
  const sectionFields = (id: HomeSectionId) => {
    const sec = homeSection(id);
    if (!sec) return null;
    return (
      <>
        <Field label="Petit texte au-dessus du titre" value={sec.eyebrow} onChange={(v) => setHomeSection(id, { eyebrow: v })} />
        <Field label="Titre" rows={2} value={sec.title} onChange={(v) => setHomeSection(id, { title: v })} />
        <Field label="Texte" rows={3} value={sec.text} onChange={(v) => setHomeSection(id, { text: v })} />
      </>
    );
  };

  const publish = async () => {
    setSaving(true);
    setMessage(null);
    const res = await fetch("/api/admin/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, baseSha: sha }),
    });
    const data = await res.json().catch(() => ({}));
    setSaving(false);
    if (!res.ok) {
      setMessage({ kind: "error", text: data.error ?? "Enregistrement impossible." });
      return;
    }
    setDirty(false);
    if (data.sha) setSha(data.sha);
    setMessage({
      kind: "ok",
      text:
        data.mode === "github"
          ? "Modifications enregistrées. Le site se met à jour dans une à deux minutes."
          : "Modifications enregistrées localement.",
    });
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-4">
          <div>
            <p className="text-sm font-semibold">Espace d&apos;administration</p>
            <p className="text-xs text-muted">
              {dirty ? "Modifications non publiées" : "Tout est publié"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-sm text-muted transition-colors hover:text-accent"
            >
              Voir le site
            </Link>
            <button
              type="button"
              onClick={logout}
              className="text-sm text-muted transition-colors hover:text-accent"
            >
              Déconnexion
            </button>
            <button
              type="button"
              onClick={publish}
              disabled={saving || !dirty}
              className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground transition-transform hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
            >
              {saving ? "Publication…" : "Publier les modifications"}
            </button>
          </div>
        </div>
        {message && (
          <div
            className={`px-6 pb-3 text-sm ${
              message.kind === "ok" ? "text-accent" : "text-red-400"
            }`}
          >
            <div className="mx-auto max-w-6xl">{message.text}</div>
          </div>
        )}
      </header>

      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-8 lg:grid-cols-[220px_1fr] lg:items-start">
        <nav className="flex flex-wrap gap-2 lg:sticky lg:top-28 lg:flex-col">
          {SECTIONS.map((item, i) => (
            <Fragment key={item.id}>
            {item.group !== SECTIONS[i - 1]?.group && (
              <p className={`w-full px-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-accent ${i ? "mt-4" : ""}`}>
                {item.group}
              </p>
            )}
            <button
              type="button"
              onClick={() => setSection(item.id)}
              className={`rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                section === item.id
                  ? "bg-surface-2 font-semibold text-foreground"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {item.label}
            </button>
            </Fragment>
          ))}
        </nav>

        <main className="grid gap-5">
          {section === "accueil" && (
            <>
              <div className="border-b border-border pb-3">
                <h2 className="text-lg font-semibold">Page d&apos;accueil</h2>
                <p className="mt-1 text-sm text-muted">Les blocs sont dans l&apos;ordre de la page, de haut en bas.</p>
              </div>

              <Card className="grid gap-4">
                <BlockTitle n={1} title="Haut de page (vidéo)" />
                <Field
                  label="Petit texte au-dessus du titre"
                  hint="Ex. « Organisme de formation · Hauts-de-France »."
                  value={content.pages.hero.badge ?? ""}
                  onChange={(v) => setHero({ badge: v })}
                />
                <Field
                  label="Grand titre"
                  rows={2}
                  value={content.company.tagline}
                  onChange={(v) => update({ ...content, company: { ...content.company, tagline: v } })}
                />
                <Field
                  label="Texte sous le titre"
                  rows={3}
                                    value={content.company.description}
                  onChange={(v) => update({ ...content, company: { ...content.company, description: v } })}
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Bouton principal"
                    value={content.pages.hero.primaryButton}
                    onChange={(v) => setHero({ primaryButton: v })}
                  />
                  <Field
                    label="Bouton secondaire"
                    value={content.pages.hero.secondaryButton}
                    onChange={(v) => setHero({ secondaryButton: v })}
                  />
                </div>
                <VideoField
                  label="Vidéo de fond"
                  hint="Courte boucle sans son, 100 Mo maximum."
                  value={content.home.heroVideo || undefined}
                  onChange={(v) => setHome({ heroVideo: v ?? "" })}
                />
                <ImageField
                  label="Photo affichée pendant le chargement de la vidéo (ou à la place)"
                  value={content.home.heroBackgroundImage || undefined}
                  onChange={(v) => setHome({ heroBackgroundImage: v ?? "" })}
                />
                <Field
                  label="Description de la photo (accessibilité)"
                  value={content.home.heroBackgroundImageAlt ?? ""}
                  onChange={(v) => setHome({ heroBackgroundImageAlt: v })}
                />
              </Card>

              <Card className="grid gap-4">
                <BlockTitle n={2} title="Bande défilante « Nos formations sur le terrain »" />
                <Check
                  label="Afficher la bande défilante"
                  checked={content.home.showMarquee !== false}
                  onChange={(c) => setHome({ showMarquee: c })}
                />
                <Check
                  label="Utiliser mes propres photos (sinon : toutes les formations du catalogue, une par une)"
                  checked={content.home.marqueeSource === "slides"}
                  onChange={(c) => setHome({ marqueeSource: c ? "slides" : "trainings" })}
                />
                {content.home.marqueeSource === "slides" && (
                  <div>
                <ListEditor
                  items={content.home.heroSlides}
                  onChange={(heroSlides) =>
                    update({ ...content, home: { ...content.home, heroSlides } })
                  }
                  createItem={() => ({ image: "", alt: "", title: "", text: "", link: "" })}
                  addLabel="Ajouter une photo au carrousel"
                  titleFor={(s, i) => s.title || `Photo ${i + 1}`}
                  renderItem={(slide, set) => (
                    <div className="grid gap-4">
                      <ImageField
                        label="Photo"
                        value={slide.image || undefined}
                        onChange={(v) => set({ ...slide, image: v ?? "" })}
                      />
                      <Field
                        label="Titre affiché sur la photo"
                        value={slide.title ?? ""}
                        onChange={(v) => set({ ...slide, title: v })}
                      />
                      <Field
                        label="Sous-titre"
                        value={slide.text ?? ""}
                        onChange={(v) => set({ ...slide, text: v })}
                      />
                      <Field
                        label="Lien (optionnel)"
                        hint="Ex. /formations/caces-habilitations — rend la photo cliquable vers cette page."
                        value={slide.link ?? ""}
                        onChange={(v) => set({ ...slide, link: v })}
                      />
                      <Field
                        label="Description de la photo (accessibilité)"
                        value={slide.alt ?? ""}
                        onChange={(v) => set({ ...slide, alt: v })}
                      />
                    </div>
                  )}
                />
                  </div>
                )}
              </Card>

              <Card className="grid gap-2">
                <BlockTitle n={3} title="8 secteurs de formation" />
                <p className="text-sm text-muted">
                  Les cartes reprennent automatiquement les domaines du catalogue (nom, photo, résumé,
                  nombre de formations) : ils se modifient dans « Catalogue &amp; formations ».
                </p>
              </Card>

              <Card className="grid gap-4">
                <BlockTitle n={4} title="Bande des chiffres clés" />
                <ImageField
                  label="Photo de fond"
                  value={content.home.statsBandImage}
                  onChange={(v) => setHome({ statsBandImage: v })}
                />
                <Field
                  label="Description de la photo (accessibilité)"
                  value={content.home.statsBandImageAlt ?? ""}
                  onChange={(v) => setHome({ statsBandImageAlt: v })}
                />
                <ListEditor
                  items={content.stats}
                  onChange={(stats) => update({ ...content, stats })}
                  createItem={(): Stat => ({ value: "", label: "" })}
                  addLabel="Ajouter un chiffre"
                  titleFor={(s) => `${s.value} ${s.label}`}
                  renderItem={(stat, set) => (
                    <div className="grid gap-4 sm:grid-cols-[120px_1fr]">
                      <Field
                        label="Chiffre"
                        value={stat.value}
                        onChange={(v) => set({ ...stat, value: v })}
                      />
                      <Field
                        label="Légende"
                        value={stat.label}
                        onChange={(v) => set({ ...stat, label: v })}
                      />
                      <label className="flex items-center gap-2 text-xs text-muted sm:col-span-2">
                        <input
                          type="checkbox"
                          checked={stat.source === "recommendation"}
                          onChange={(e) =>
                            set({ ...stat, source: e.target.checked ? "recommendation" : undefined })
                          }
                        />
                        Mettre à jour automatiquement avec la note de recommandation du
                        fichier Excel (le chiffre ci-dessus sert en attendant)
                      </label>
                    </div>
                  )}
                />
                <Field
                  label="Source du pourcentage de recommandation (petite ligne sous les chiffres)"
                  rows={2}
                  value={content.home.statsNote ?? ""}
                  onChange={(v) => setHome({ statsNote: v })}
                />
              </Card>

              <Card className="grid gap-4">
                <BlockTitle n={5} title="À propos" />
                {sectionFields("about")}
                <ImageField
                  label="Image (le logo)"
                  value={content.home.aboutImage}
                  onChange={(v) => setHome({ aboutImage: v })}
                />
                <Field
                  label="Description de l'image (accessibilité)"
                  value={content.home.aboutImageAlt ?? ""}
                  onChange={(v) => setHome({ aboutImageAlt: v })}
                />
                <p className="text-xs text-muted">
                  Le texte à côté de l&apos;image (« Une expertise de terrain… ») est celui de la page
                  Le centre, bloc « Notre approche ».
                </p>
              </Card>

              <Card className="grid gap-4">
                <BlockTitle n={6} title="Financement" />
                <Field
                  label="Titre"
                  rows={2}
                  value={homeSection("financement")?.title ?? ""}
                  onChange={(v) => setHomeSection("financement", { title: v })}
                />
                <ImageField
                  label="Photo (vide = photo de la page Financement)"
                  value={content.home.fundingImage || undefined}
                  onChange={(v) => setHome({ fundingImage: v ?? "" })}
                />
                <p className="text-xs text-muted">
                  Les trois points sous le titre se modifient dans « Qualiopi &amp; financement ».
                </p>
              </Card>

              <Card className="grid gap-4">
                <BlockTitle n={7} title="Questions fréquentes (FAQ)" />
                <Field
                  label="Phrase sous « FAQ »"
                  rows={2}
                  value={homeSection("faq")?.title ?? ""}
                  onChange={(v) => setHomeSection("faq", { title: v })}
                />
                <ListEditor
                  items={content.home.faq}
                  onChange={(faq) =>
                    update({ ...content, home: { ...content.home, faq } })
                  }
                  createItem={() => ({ question: "", answer: "" })}
                  addLabel="Ajouter une question"
                  titleFor={(f) => f.question}
                  renderItem={(item, set) => (
                    <div className="grid gap-4">
                      <Field
                        label="Question"
                        value={item.question}
                        onChange={(v) => set({ ...item, question: v })}
                      />
                      <Field
                        label="Réponse"
                        rows={3}
                        value={item.answer}
                        onChange={(v) => set({ ...item, answer: v })}
                      />
                    </div>
                  )}
                />
              </Card>

              <Card className="grid gap-4">
                <BlockTitle title="Citation du dirigeant (facultative)" />
                <p className="text-xs text-muted">Affichée sous « À propos » si la citation est remplie.</p>
                <Field
                  label="Citation"
                  rows={5}
                  value={content.home.founderQuote?.text ?? ""}
                  onChange={(v) =>
                    update({
                      ...content,
                      home: {
                        ...content.home,
                        founderQuote: {
                          name: content.home.founderQuote?.name ?? "",
                          role: content.home.founderQuote?.role ?? "",
                          photo: content.home.founderQuote?.photo ?? "",
                          photoAlt: content.home.founderQuote?.photoAlt ?? "",
                          text: v,
                        },
                      },
                    })
                  }
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Nom"
                    value={content.home.founderQuote?.name ?? ""}
                    onChange={(v) =>
                      update({
                        ...content,
                        home: {
                          ...content.home,
                          founderQuote: {
                            text: content.home.founderQuote?.text ?? "",
                            role: content.home.founderQuote?.role ?? "",
                            photo: content.home.founderQuote?.photo ?? "",
                            photoAlt: content.home.founderQuote?.photoAlt ?? "",
                            name: v,
                          },
                        },
                      })
                    }
                  />
                  <Field
                    label="Fonction"
                    value={content.home.founderQuote?.role ?? ""}
                    onChange={(v) =>
                      update({
                        ...content,
                        home: {
                          ...content.home,
                          founderQuote: {
                            text: content.home.founderQuote?.text ?? "",
                            name: content.home.founderQuote?.name ?? "",
                            photo: content.home.founderQuote?.photo ?? "",
                            photoAlt: content.home.founderQuote?.photoAlt ?? "",
                            role: v,
                          },
                        },
                      })
                    }
                  />
                </div>
                <ImageField
                  label="Photo"
                  value={content.home.founderQuote?.photo || undefined}
                  onChange={(v) =>
                    update({
                      ...content,
                      home: {
                        ...content.home,
                        founderQuote: {
                          text: content.home.founderQuote?.text ?? "",
                          name: content.home.founderQuote?.name ?? "",
                          role: content.home.founderQuote?.role ?? "",
                          photoAlt: content.home.founderQuote?.photoAlt ?? "",
                          photo: v ?? "",
                        },
                      },
                    })
                  }
                />
              </Card>

              <Card className="grid gap-4">
                <BlockTitle title="Onglet du navigateur & Google" />
                <Field
                  label="Titre de l'onglet et des résultats Google"
                  hint="Ex. « ENMA Formation — Organisme de formation Qualiopi Hauts-de-France »."
                  value={content.home.seoTitle ?? ""}
                  onChange={(v) => setHome({ seoTitle: v })}
                />
                <Field
                  label="Description pour Google"
                  rows={3}
                  hint="Environ 150 caractères. Vide = texte sous le grand titre."
                  value={content.home.seoDescription ?? ""}
                  onChange={(v) => setHome({ seoDescription: v })}
                />
              </Card>

              <Card className="grid gap-3">
                <BlockTitle title="Ordre et affichage des blocs 5 à 7" />
                {content.home.sections
                  .filter((s) => s.id !== "formations" && s.id !== "contact")
                  .map((s) => (
                    <div key={s.id} className="flex items-center justify-between gap-3 text-sm">
                      <span className={s.visible ? "" : "text-muted line-through"}>{SECTION_NAMES[s.id]}</span>
                      <span className="flex gap-1.5">
                        <SmallButton onClick={() => moveSection(s.id, -1)}>↑</SmallButton>
                        <SmallButton onClick={() => moveSection(s.id, 1)}>↓</SmallButton>
                        <SmallButton onClick={() => setHomeSection(s.id, { visible: !s.visible })}>
                          {s.visible ? "Masquer" : "Afficher"}
                        </SmallButton>
                      </span>
                    </div>
                  ))}
              </Card>

              <Card className="grid gap-4">
                <PageColorsEditor
                  siteTheme={content.theme}
                  value={content.home.theme}
                  showHeroButton
                  onChange={(next) => setHome({ theme: next })}
                />
              </Card>
            </>
          )}

          {section === "catalogue" && (
            <>
              <div className="border-b border-border pb-3">
                <h2 className="text-lg font-semibold">Catalogue & formations</h2>
                <p className="mt-1 text-sm text-muted">Pages Nos formations, Toutes les formations, pages des domaines et fiches formation.</p>
              </div>

              <PagesEditor
                only={["catalogue", "allTrainings", "sector", "training"]}
                pages={content.pages}
                theme={{ ...content.theme, ...content.home.theme }}
                onChange={(pages) => update({ ...content, pages })}
              />

              <Card className="grid gap-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-surface-accent">
                  Fiches formation — textes communs
                </p>
                <Field
                  label="Fiches formation — méthodes pédagogiques"
                  hint="Texte commun affiché sur toutes les fiches formation."
                  rows={3}
                  value={content.trainingInfo?.methods ?? ""}
                  onChange={(v) =>
                    update({
                      ...content,
                      trainingInfo: {
                        methods: v,
                        evaluation: content.trainingInfo?.evaluation ?? "",
                      },
                    })
                  }
                />
                <Field
                  label="Fiches formation — modalités d'évaluation"
                  hint="Texte commun affiché sur toutes les fiches formation."
                  rows={3}
                  value={content.trainingInfo?.evaluation ?? ""}
                  onChange={(v) =>
                    update({
                      ...content,
                      trainingInfo: {
                        methods: content.trainingInfo?.methods ?? "",
                        evaluation: v,
                      },
                    })
                  }
                />
              </Card>

            <SectorsEditor
              sectors={content.sectors}
              onChange={(sectors) => update({ ...content, sectors })}
            />
            </>
          )}

          {section === "centre" && (
            <>
              <div className="border-b border-border pb-3">
                <h2 className="text-lg font-semibold">Le centre</h2>
              </div>

              <Card className="grid gap-4">
                <Field
                  label="Présentation de l'entreprise"
                  hint="Premier paragraphe de la page Le centre (et texte de secours du bloc À propos de l'accueil)."
                  rows={4}
                  value={content.company.about}
                  onChange={(v) =>
                    update({
                      ...content,
                      company: { ...content.company, about: v },
                    })
                  }
                />
              </Card>

              <PagesEditor
                only={["centre"]}
                pages={content.pages}
                theme={{ ...content.theme, ...content.home.theme }}
                onChange={(pages) => update({ ...content, pages })}
              />

            </>
          )}

          {section === "financement" && (
            <>
              <div className="border-b border-border pb-3">
                <h2 className="text-lg font-semibold">Qualiopi & financement</h2>
              </div>

              <PagesEditor
                only={["funding"]}
                pages={content.pages}
                theme={{ ...content.theme, ...content.home.theme }}
                onChange={(pages) => update({ ...content, pages })}
              />

              <Card>
                <Field
                  label="Introduction"
                  rows={4}
                  value={content.funding.intro}
                  onChange={(v) =>
                    update({
                      ...content,
                      funding: { ...content.funding, intro: v },
                    })
                  }
                />
              </Card>
              <ListEditor
                items={content.funding.points}
                onChange={(points) =>
                  update({ ...content, funding: { ...content.funding, points } })
                }
                createItem={() => ({ title: "", text: "" })}
                addLabel="Ajouter un argument"
                titleFor={(p) => p.title}
                renderItem={(point, set) => (
                  <div className="grid gap-4">
                    <Field
                      label="Titre"
                      value={point.title}
                      onChange={(v) => set({ ...point, title: v })}
                    />
                    <Field
                      label="Texte"
                      rows={3}
                      value={point.text}
                      onChange={(v) => set({ ...point, text: v })}
                    />
                  </div>
                )}
              />

              <Card className="grid gap-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-surface-accent">
                  Liens vers les OPCO (page Financement)
                </p>
                <Field
                  label="Titre"
                  value={content.funding.opcosTitle ?? ""}
                  onChange={(v) => update({ ...content, funding: { ...content.funding, opcosTitle: v } })}
                />
                <Field
                  label="Texte"
                  rows={2}
                  value={content.funding.opcosText ?? ""}
                  onChange={(v) => update({ ...content, funding: { ...content.funding, opcosText: v } })}
                />
              </Card>
              <ListEditor
                items={content.funding.opcos ?? []}
                onChange={(opcos) => update({ ...content, funding: { ...content.funding, opcos } })}
                createItem={() => ({ name: "", sectors: "", url: "https://" })}
                addLabel="Ajouter un OPCO"
                titleFor={(o) => o.name}
                renderItem={(opco, set) => (
                  <div className="grid gap-4">
                    <Field label="Nom" value={opco.name} onChange={(v) => set({ ...opco, name: v })} />
                    <Field
                      label="Secteurs concernés"
                      value={opco.sectors}
                      onChange={(v) => set({ ...opco, sectors: v })}
                    />
                    <Field label="Adresse du site" value={opco.url} onChange={(v) => set({ ...opco, url: v })} />
                  </div>
                )}
              />
            </>
          )}

          {section === "equipe" && (
            <>
              <div className="border-b border-border pb-3">
                <h2 className="text-lg font-semibold">Notre équipe</h2>
                <p className="mt-1 text-sm text-muted">Photos, noms et présentations des membres de l&apos;équipe.</p>
              </div>

              <PagesEditor
                only={["team"]}
                pages={content.pages}
                theme={{ ...content.theme, ...content.home.theme }}
                onChange={(pages) => update({ ...content, pages })}
              />

            <ListEditor
              items={content.team}
              onChange={(team) => update({ ...content, team })}
              createItem={() => ({ name: "", role: "", email: "", bio: "", photo: "", photoAlt: "" })}
              addLabel="Ajouter un membre"
              titleFor={(m) => m.name}
              renderItem={(member, set) => (
                <div className="grid gap-4">
                  <ImageField
                    label="Photo"
                    value={member.photo || undefined}
                    onChange={(v) => set({ ...member, photo: v ?? "" })}
                  />
                  <Field
                    label="Description de la photo (accessibilité)"
                    value={member.photoAlt ?? ""}
                    onChange={(v) => set({ ...member, photoAlt: v })}
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="Nom"
                      value={member.name}
                      onChange={(v) => set({ ...member, name: v })}
                    />
                    <Field
                      label="Fonction"
                      value={member.role}
                      onChange={(v) => set({ ...member, role: v })}
                    />
                  </div>
                  <Field
                    label="E-mail"
                    value={member.email}
                    onChange={(v) => set({ ...member, email: v })}
                  />
                  <Field
                    label="Présentation"
                    rows={3}
                    value={member.bio}
                    onChange={(v) => set({ ...member, bio: v })}
                  />
                </div>
              )}
            />
            </>
          )}

          {section === "contact" && (
            <>
              <div className="border-b border-border pb-3">
                <h2 className="text-lg font-semibold">Contact</h2>
              </div>

              <PagesEditor
                only={["contact"]}
                pages={content.pages}
                theme={{ ...content.theme, ...content.home.theme }}
                onChange={(pages) => update({ ...content, pages })}
              />
            </>
          )}

          {section === "entreprise" && (
            <>
              <div className="border-b border-border pb-3">
                <h2 className="text-lg font-semibold">Coordonnées</h2>
                <p className="mt-1 text-sm text-muted">Nom, e-mail, téléphone et adresse : repris sur tout le site (menu, pied de page, contact).</p>
              </div>

              <Card className="grid gap-4">
                <Field
                  label="Nom"
                  value={content.company.name}
                  onChange={(v) =>
                    update({ ...content, company: { ...content.company, name: v } })
                  }
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="E-mail"
                    value={content.company.email}
                    onChange={(v) =>
                      update({
                        ...content,
                        company: { ...content.company, email: v },
                      })
                    }
                  />
                  <Field
                    label="Téléphone"
                    value={content.company.phone}
                    onChange={(v) =>
                      update({
                        ...content,
                        company: { ...content.company, phone: v },
                      })
                    }
                  />
                  <Field
                    label="Adresse"
                    value={content.company.address}
                    onChange={(v) =>
                      update({
                        ...content,
                        company: { ...content.company, address: v },
                      })
                    }
                  />
                  <Field
                    label="Zone d'intervention"
                    value={content.company.serviceArea}
                    onChange={(v) =>
                      update({
                        ...content,
                        company: { ...content.company, serviceArea: v },
                      })
                    }
                  />
                </div>
              </Card>
            </>
          )}

          {section === "pied" && (
            <>
              <div className="border-b border-border pb-3">
                <h2 className="text-lg font-semibold">Pied de page</h2>
                <p className="mt-1 text-sm text-muted">Photo de fond et bandeau de demande de catalogue, en bas de toutes les pages.</p>
              </div>

              <Card className="grid gap-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-surface-accent">
                  Pied de page
                </p>
                <ImageField
                  label="Photo du pied de page"
                  value={content.footerImage}
                  onChange={(v) => update({ ...content, footerImage: v })}
                />
                <Field
                  label="Description de la photo (accessibilité)"
                  value={content.footerImageAlt ?? ""}
                  onChange={(v) => update({ ...content, footerImageAlt: v })}
                />
                <p className="text-xs text-muted">
                  Cette photo sert de fond au bandeau et apparaît à travers la
                  découpe du logo. Sans photo, un dégradé de marque est utilisé.
                </p>
              </Card>

              <Card className="grid gap-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-surface-accent">
                    Bandeau de demande de catalogue
                  </p>
                  <label className="flex items-center gap-2 text-xs">
                    <input
                      type="checkbox"
                      checked={content.footerCta.enabled}
                      onChange={(e) =>
                        update({
                          ...content,
                          footerCta: {
                            ...content.footerCta,
                            enabled: e.target.checked,
                          },
                        })
                      }
                      className="h-4 w-4 accent-[color:var(--accent)]"
                    />
                    Afficher
                  </label>
                </div>
                <Field
                  label="Sur-titre"
                  value={content.footerCta.eyebrow}
                  onChange={(v) =>
                    update({
                      ...content,
                      footerCta: { ...content.footerCta, eyebrow: v },
                    })
                  }
                />
                <Field
                  label="Titre"
                  rows={2}
                  value={content.footerCta.title}
                  onChange={(v) =>
                    update({
                      ...content,
                      footerCta: { ...content.footerCta, title: v },
                    })
                  }
                />
                <Field
                  label="Texte"
                  rows={3}
                  value={content.footerCta.text}
                  onChange={(v) =>
                    update({
                      ...content,
                      footerCta: { ...content.footerCta, text: v },
                    })
                  }
                />
                <Field
                  label="Texte du bouton"
                  value={content.footerCta.buttonLabel}
                  onChange={(v) =>
                    update({
                      ...content,
                      footerCta: { ...content.footerCta, buttonLabel: v },
                    })
                  }
                />
              </Card>

              <Card className="grid gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-surface-accent">
                    Réseaux sociaux
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    Collez l&apos;adresse complète de chaque page (https://…). Les
                    réseaux laissés vides ne s&apos;affichent pas.
                  </p>
                </div>
                <Field
                  label="LinkedIn"
                  placeholder="https://www.linkedin.com/…"
                  value={content.social?.linkedin ?? ""}
                  onChange={(v) =>
                    update({ ...content, social: { ...content.social, linkedin: v } })
                  }
                />
                <Field
                  label="Facebook"
                  placeholder="https://www.facebook.com/…"
                  value={content.social?.facebook ?? ""}
                  onChange={(v) =>
                    update({ ...content, social: { ...content.social, facebook: v } })
                  }
                />
                <Field
                  label="Instagram"
                  placeholder="https://www.instagram.com/…"
                  value={content.social?.instagram ?? ""}
                  onChange={(v) =>
                    update({ ...content, social: { ...content.social, instagram: v } })
                  }
                />
                <Field
                  label="YouTube"
                  placeholder="https://www.youtube.com/…"
                  value={content.social?.youtube ?? ""}
                  onChange={(v) =>
                    update({ ...content, social: { ...content.social, youtube: v } })
                  }
                />
                <Field
                  label="TikTok"
                  placeholder="https://www.tiktok.com/…"
                  value={content.social?.tiktok ?? ""}
                  onChange={(v) =>
                    update({ ...content, social: { ...content.social, tiktok: v } })
                  }
                />
              </Card>

              <Card className="grid gap-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-surface-accent">
                  Certification Qualiopi (bas de page)
                </p>
                <ImageField
                  label="Logo Qualiopi officiel"
                  value={content.legal.qualiopiLogo || undefined}
                  onChange={(v) =>
                    update({ ...content, legal: { ...content.legal, qualiopiLogo: v ?? "" } })
                  }
                />
                <p className="text-xs text-muted">
                  Utilisez le logo fourni par votre certificateur (avec la mention
                  « République française »), sans le modifier. Sans logo, un badge
                  texte s&apos;affiche à la place.
                </p>
                <PdfField
                  label="Certificat Qualiopi (PDF)"
                  hint="S'ouvre quand on clique sur le numéro de certificat (page Financement, pied de page, accueil)."
                  value={content.legal.qualiopiCertificateUrl || undefined}
                  onChange={(v) =>
                    update({ ...content, legal: { ...content.legal, qualiopiCertificateUrl: v ?? "" } })
                  }
                />
              </Card>
            </>
          )}

          {section === "legal" && (
            <>
              <div className="border-b border-border pb-3">
                <h2 className="text-lg font-semibold">Mentions légales & Qualiopi</h2>
                <p className="mt-1 text-sm text-muted">Informations juridiques, CGV, délai d&apos;accès et indicateurs.</p>
              </div>

              <Card className="grid gap-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-surface-accent">
                  Photo d&apos;en-tête des pages légales
                </p>
                <ImageField
                  label="Photo (mentions légales, CGV, confidentialité, accessibilité)"
                  value={content.legal.heroImage}
                  onChange={(v) => update({ ...content, legal: { ...content.legal, heroImage: v } })}
                />
                <Field
                  label="Description de la photo (accessibilité)"
                  value={content.legal.heroImageAlt ?? ""}
                  onChange={(v) => update({ ...content, legal: { ...content.legal, heroImageAlt: v } })}
                />
                <p className="text-xs text-muted">Sans photo, celle de la page Équipe est utilisée.</p>
              </Card>

              <Card className="grid gap-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-surface-accent">
                  Mentions réglementaires
                </p>
                <Field
                  label="Numéro de déclaration d'activité"
                  hint="Laissé vide, il n'apparaît pas sur le site."
                  value={content.legal.activityDeclaration}
                  onChange={(v) =>
                    update({
                      ...content,
                      legal: { ...content.legal, activityDeclaration: v },
                    })
                  }
                />
                <Field
                  label="Numéro de certification Qualiopi"
                  value={content.legal.qualiopiCertificate}
                  onChange={(v) =>
                    update({
                      ...content,
                      legal: { ...content.legal, qualiopiCertificate: v },
                    })
                  }
                />
                <Field
                  label="Raison sociale"
                  value={content.legal.legalName ?? ""}
                  onChange={(v) =>
                    update({
                      ...content,
                      legal: { ...content.legal, legalName: v },
                    })
                  }
                />
                <Field
                  label="Forme juridique"
                  value={content.legal.legalForm ?? ""}
                  onChange={(v) =>
                    update({
                      ...content,
                      legal: { ...content.legal, legalForm: v },
                    })
                  }
                />
                <Field
                  label="Capital social"
                  value={content.legal.capital ?? ""}
                  onChange={(v) =>
                    update({
                      ...content,
                      legal: { ...content.legal, capital: v },
                    })
                  }
                />
                <Field
                  label="SIREN"
                  value={content.legal.siren ?? ""}
                  onChange={(v) =>
                    update({
                      ...content,
                      legal: { ...content.legal, siren: v },
                    })
                  }
                />
                <Field
                  label="SIRET"
                  value={content.legal.siret ?? ""}
                  onChange={(v) =>
                    update({
                      ...content,
                      legal: { ...content.legal, siret: v },
                    })
                  }
                />
                <Field
                  label="Numéro RCS"
                  value={content.legal.rcs ?? ""}
                  onChange={(v) =>
                    update({
                      ...content,
                      legal: { ...content.legal, rcs: v },
                    })
                  }
                />
                <Field
                  label="Numéro de TVA intracommunautaire"
                  value={content.legal.vat ?? ""}
                  onChange={(v) =>
                    update({
                      ...content,
                      legal: { ...content.legal, vat: v },
                    })
                  }
                />
                <Field
                  label="Directeur de la publication"
                  value={content.legal.publicationDirector ?? ""}
                  onChange={(v) =>
                    update({
                      ...content,
                      legal: { ...content.legal, publicationDirector: v },
                    })
                  }
                />
                <Field
                  label="Région de la déclaration d'activité"
                  value={content.legal.activityRegion ?? ""}
                  onChange={(v) =>
                    update({
                      ...content,
                      legal: { ...content.legal, activityRegion: v },
                    })
                  }
                />
                <Field
                  label="Catégorie d'action Qualiopi"
                  hint="Ex. : actions de formation"
                  value={content.legal.qualiopiCategory ?? ""}
                  onChange={(v) =>
                    update({
                      ...content,
                      legal: { ...content.legal, qualiopiCategory: v },
                    })
                  }
                />
                <Field
                  label="Délais et conditions d'accès — texte complet"
                  hint="Affiché sur la page Accessibilité. Une ligne commençant par « • » devient une puce."
                  rows={6}
                  value={content.legal.accessDelay ?? ""}
                  onChange={(v) =>
                    update({
                      ...content,
                      legal: { ...content.legal, accessDelay: v },
                    })
                  }
                />
                <Field
                  label="Délai d'accès — version courte"
                  hint="Affichée dans l'encart de chaque fiche formation (vide = texte complet)."
                  rows={2}
                  value={content.legal.accessDelayShort ?? ""}
                  onChange={(v) =>
                    update({
                      ...content,
                      legal: { ...content.legal, accessDelayShort: v },
                    })
                  }
                />
                <Field
                  label="CGV — délai d'annulation sans frais"
                  hint="Ex. : 15 jours"
                  value={content.legal.cancellationNotice ?? ""}
                  onChange={(v) =>
                    update({
                      ...content,
                      legal: { ...content.legal, cancellationNotice: v },
                    })
                  }
                />
                <Field
                  label="CGV — somme due en cas d'annulation tardive"
                  value={content.legal.cancellationFee ?? ""}
                  onChange={(v) =>
                    update({
                      ...content,
                      legal: { ...content.legal, cancellationFee: v },
                    })
                  }
                />
                <Field
                  label="CGV — délai de paiement"
                  hint="Ex. : 30 jours"
                  value={content.legal.paymentTerms ?? ""}
                  onChange={(v) =>
                    update({
                      ...content,
                      legal: { ...content.legal, paymentTerms: v },
                    })
                  }
                />
                <Field
                  label="CGV — tribunal compétent"
                  value={content.legal.court ?? ""}
                  onChange={(v) =>
                    update({
                      ...content,
                      legal: { ...content.legal, court: v },
                    })
                  }
                />
                <Field
                  label="Indicateurs de résultats"
                  hint="Affichés sur la page Qualiopi & financement. {recommandation} est remplacé par le pourcentage à jour du questionnaire de fin de session."
                  rows={4}
                  value={content.legal.resultsIndicators ?? ""}
                  onChange={(v) =>
                    update({
                      ...content,
                      legal: { ...content.legal, resultsIndicators: v },
                    })
                  }
                />
              </Card>
            </>
          )}

          {section === "accessibilite" && (
            <>
              <div className="border-b border-border pb-3">
                <h2 className="text-lg font-semibold">Accessibilité & handicap</h2>
                <p className="mt-1 text-sm text-muted">Texte et référent affichés sur les fiches formation, la page Contact et la page Accessibilité.</p>
              </div>

              <Card className="grid gap-4">
                <Field
                  label="Texte"
                  rows={6}
                  value={content.accessibility.text}
                  onChange={(v) =>
                    update({
                      ...content,
                      accessibility: { ...content.accessibility, text: v },
                    })
                  }
                />
                <Field
                  label="Référent handicap"
                  value={content.accessibility.referent}
                  onChange={(v) =>
                    update({
                      ...content,
                      accessibility: { ...content.accessibility, referent: v },
                    })
                  }
                />
              </Card>
            </>
          )}

          {section === "design" && (
            <>
              <div className="border-b border-border pb-3">
                <h2 className="text-lg font-semibold">Design & couleurs</h2>
                <p className="mt-1 text-sm text-muted">Police, couleurs, aurore, voiles et bandes : s&apos;appliquent à tout le site.</p>
              </div>

              <CommonColors theme={content.theme} onChange={(theme) => update({ ...content, theme })} />

              <ColorEverywhere content={content} onChange={update} />

              <DesignEditor
                part="theme"
                theme={content.theme}
                sections={content.home.sections}
                onThemeChange={(theme) => update({ ...content, theme })}
                onSectionsChange={(sections) =>
                  update({ ...content, home: { ...content.home, sections } })
                }
              />
            </>
          )}
        </main>
      </div>
    </div>
  );
}
