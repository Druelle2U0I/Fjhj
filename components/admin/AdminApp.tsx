"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { SiteContent } from "@/lib/data";
import SectorsEditor from "./SectorsEditor";
import { Card, Field, ListEditor } from "./ui";

const SECTIONS = [
  { id: "entreprise", label: "Entreprise & contact" },
  { id: "secteurs", label: "Secteurs & formations" },
  { id: "equipe", label: "Équipe" },
  { id: "financement", label: "Qualiopi & financement" },
  { id: "accueil", label: "Page d'accueil" },
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
            </>
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
