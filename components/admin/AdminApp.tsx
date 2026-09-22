"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { SiteContent } from "@/lib/data";
import SectorsEditor from "./SectorsEditor";
import DesignEditor from "./DesignEditor";
import { Card, Field, ImageField, ListEditor } from "./ui";

const SECTIONS = [
  { id: "entreprise", label: "Entreprise & contact" },
  { id: "secteurs", label: "Secteurs & formations" },
  { id: "equipe", label: "Équipe" },
  { id: "financement", label: "Qualiopi & financement" },
  { id: "accueil", label: "Page d'accueil" },
  { id: "design", label: "Design & sections" },
  { id: "accessibilite", label: "Accessibilité" },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

export default function AdminApp({ initial }: { initial: SiteContent }) {
  const router = useRouter();
  const [content, setContent] = useState<SiteContent>(initial);
  const [section, setSection] = useState<SectionId>("entreprise");
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
          {SECTIONS.map((item) => (
            <button
              key={item.id}
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
          ))}
        </nav>

        <main className="grid gap-5">
          {section === "entreprise" && (
            <>
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
              </Card>
            </>
          )}

          {section === "secteurs" && (
            <SectorsEditor
              sectors={content.sectors}
              onChange={(sectors) => update({ ...content, sectors })}
            />
          )}

          {section === "equipe" && (
            <ListEditor
              items={content.team}
              onChange={(team) => update({ ...content, team })}
              createItem={() => ({ name: "", role: "", email: "", bio: "" })}
              addLabel="Ajouter un membre"
              titleFor={(m) => m.name}
              renderItem={(member, set) => (
                <div className="grid gap-4">
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
          )}

          {section === "financement" && (
            <>
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

          {section === "accueil" && (
            <>
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-accent">
                  Carrousel de photos (haut de page)
                </p>
                <ListEditor
                  items={content.home.heroSlides}
                  onChange={(heroSlides) =>
                    update({ ...content, home: { ...content.home, heroSlides } })
                  }
                  createItem={() => ({ image: "", alt: "", title: "", text: "" })}
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
                        label="Description de la photo (accessibilité)"
                        value={slide.alt ?? ""}
                        onChange={(v) => set({ ...slide, alt: v })}
                      />
                    </div>
                  )}
                />
              </div>

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

              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-accent">
                  Formations mises en avant
                </p>
                <ListEditor
                  items={content.topTrainings}
                  onChange={(topTrainings) =>
                    update({ ...content, topTrainings })
                  }
                  createItem={() => ({ title: "", duration: "", format: "" })}
                  addLabel="Ajouter une formation mise en avant"
                  titleFor={(t) => t.title}
                  renderItem={(item, set) => (
                    <div className="grid gap-4">
                      <Field
                        label="Nom"
                        hint="Doit correspondre exactement au nom d'une formation existante pour que le lien fonctionne."
                        value={item.title}
                        onChange={(v) => set({ ...item, title: v })}
                      />
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field
                          label="Durée"
                          value={item.duration}
                          onChange={(v) => set({ ...item, duration: v })}
                        />
                        <Field
                          label="Modalité"
                          value={item.format}
                          onChange={(v) => set({ ...item, format: v })}
                        />
                      </div>
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

          {section === "design" && (
            <DesignEditor
              theme={content.theme}
              sections={content.home.sections}
              onThemeChange={(theme) => update({ ...content, theme })}
              onSectionsChange={(sections) =>
                update({ ...content, home: { ...content.home, sections } })
              }
            />
          )}

          {section === "accessibilite" && (
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
          )}
        </main>
      </div>
    </div>
  );
}
