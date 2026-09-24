"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { SiteContent } from "@/lib/data";
import SectorsEditor from "./SectorsEditor";
import DesignEditor from "./DesignEditor";
import PagesEditor from "./PagesEditor";
import { Card, Field, ImageField, ListEditor } from "./ui";

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

export default function AdminApp({ initial }: { initial: SiteContent }) {
  const router = useRouter();
  const [content, setContent] = useState<SiteContent>(initial);
  const [section, setSection] = useState<SectionId>("accueil");
  const [dirty, setDirty] = useState(false);
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

  const publish = async () => {
    setSaving(true);
    setMessage(null);
    const res = await fetch("/api/admin/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    const data = await res.json().catch(() => ({}));
    setSaving(false);
    if (!res.ok) {
      setMessage({ kind: "error", text: data.error ?? "Enregistrement impossible." });
      return;
    }
    setDirty(false);
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
                <p className="mt-1 text-sm text-muted">Tout ce qui s&apos;affiche sur la page d&apos;accueil, de haut en bas.</p>
              </div>

              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-accent">
                  Carrousel de photos (haut de page)
                </p>
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

              <PagesEditor
                only={["hero"]}
                pages={content.pages}
                onChange={(pages) => update({ ...content, pages })}
              />

              <DesignEditor
                part="sections"
                theme={content.theme}
                sections={content.home.sections}
                onThemeChange={(theme) => update({ ...content, theme })}
                onSectionsChange={(sections) =>
                  update({ ...content, home: { ...content.home, sections } })
                }
              />

              <Card className="grid gap-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                  Section « À propos »
                </p>
                <ImageField
                  label="Photo"
                  value={content.home.aboutImage}
                  onChange={(v) =>
                    update({
                      ...content,
                      home: { ...content.home, aboutImage: v },
                    })
                  }
                />
                <Field
                  label="Description de la photo (accessibilité)"
                  value={content.home.aboutImageAlt ?? ""}
                  onChange={(v) =>
                    update({
                      ...content,
                      home: { ...content.home, aboutImageAlt: v },
                    })
                  }
                />
              </Card>

              <Card className="grid gap-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                  Message du patron
                </p>
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
                <p className="text-xs text-muted">
                  Sans photo, les initiales du nom sont affichées à la place.
                </p>
              </Card>

              <Card className="grid gap-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                  Bande chiffres clés (après le catalogue de formations)
                </p>
                <ImageField
                  label="Photo de fond"
                  value={content.home.statsBandImage}
                  onChange={(v) =>
                    update({
                      ...content,
                      home: { ...content.home, statsBandImage: v },
                    })
                  }
                />
                <Field
                  label="Description de la photo (accessibilité)"
                  value={content.home.statsBandImageAlt ?? ""}
                  onChange={(v) =>
                    update({
                      ...content,
                      home: { ...content.home, statsBandImageAlt: v },
                    })
                  }
                />
              </Card>

              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-accent">
                  Chiffres clés
                </p>
                <ListEditor
                  items={content.stats}
                  onChange={(stats) => update({ ...content, stats })}
                  createItem={() => ({ value: "", label: "" })}
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
                    </div>
                  )}
                />
              </div>

              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-accent">
                  Questions fréquentes (bas de page d&apos;accueil)
                </p>
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
              </div>
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
                onChange={(pages) => update({ ...content, pages })}
              />

              <Card className="grid gap-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">
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

              <PagesEditor
                only={["centre"]}
                pages={content.pages}
                onChange={(pages) => update({ ...content, pages })}
              />

              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-accent">
                  Nos atouts
                </p>
                <ListEditor
                  items={content.pillars}
                  onChange={(pillars) => update({ ...content, pillars })}
                  createItem={() => ({ title: "", text: "" })}
                  addLabel="Ajouter un atout"
                  titleFor={(p) => p.title}
                  renderItem={(pillar, set) => (
                    <div className="grid gap-4">
                      <Field
                        label="Titre"
                        value={pillar.title}
                        onChange={(v) => set({ ...pillar, title: v })}
                      />
                      <Field
                        label="Texte"
                        rows={3}
                        value={pillar.text}
                        onChange={(v) => set({ ...pillar, text: v })}
                      />
                    </div>
                  )}
                />
              </div>
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
                onChange={(pages) => update({ ...content, pages })}
              />
            </>
          )}

          {section === "entreprise" && (
            <>
              <div className="border-b border-border pb-3">
                <h2 className="text-lg font-semibold">Coordonnées</h2>
                <p className="mt-1 text-sm text-muted">Nom, slogan, adresse, téléphone : repris sur tout le site.</p>
              </div>

              <Card className="grid gap-4">
                <Field
                  label="Nom"
                  value={content.company.name}
                  onChange={(v) =>
                    update({ ...content, company: { ...content.company, name: v } })
                  }
                />
                <Field
                  label="Accroche (page d'accueil)"
                  rows={2}
                  value={content.company.tagline}
                  onChange={(v) =>
                    update({
                      ...content,
                      company: { ...content.company, tagline: v },
                    })
                  }
                />
                <Field
                  label="Description (référencement)"
                  rows={4}
                  value={content.company.description}
                  onChange={(v) =>
                    update({
                      ...content,
                      company: { ...content.company, description: v },
                    })
                  }
                />
                <Field
                  label="À propos"
                  rows={4}
                  value={content.company.about}
                  onChange={(v) =>
                    update({
                      ...content,
                      company: { ...content.company, about: v },
                    })
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
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                  Pied de page
                </p>
                <ImageField
                  label="Photo du pied de page"
                  value={content.footerImage}
                  onChange={(v) => update({ ...content, footerImage: v })}
                />
                <p className="text-xs text-muted">
                  Cette photo sert de fond au bandeau et apparaît à travers la
                  découpe du logo. Sans photo, un dégradé de marque est utilisé.
                </p>
              </Card>

              <Card className="grid gap-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-accent">
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
                  <p className="text-xs font-semibold uppercase tracking-wide text-accent">
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
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">
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
                <Field
                  label="Lien vers le certificat (facultatif)"
                  placeholder="https://…"
                  hint="Adresse du certificat en ligne ou d'un PDF partagé. Le numéro de certificat se modifie dans « Mentions légales & Qualiopi »."
                  value={content.legal.qualiopiCertificateUrl ?? ""}
                  onChange={(v) =>
                    update({ ...content, legal: { ...content.legal, qualiopiCertificateUrl: v } })
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
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">
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
                  label="Délai d'accès aux formations"
                  hint="Affiché sur chaque fiche formation."
                  rows={2}
                  value={content.legal.accessDelay ?? ""}
                  onChange={(v) =>
                    update({
                      ...content,
                      legal: { ...content.legal, accessDelay: v },
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
                  hint="Affichés sur la page Qualiopi & financement."
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
