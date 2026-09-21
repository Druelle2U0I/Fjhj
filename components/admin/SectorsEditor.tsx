"use client";

import { useState } from "react";
import type { Sector, Training } from "@/lib/data";
import {
  Card,
  Field,
  ImageField,
  ListEditor,
  ParagraphsField,
  SmallButton,
} from "./ui";

function emptyTraining(): Training {
  return {
    title: "Nouvelle formation",
    duration: "Nous consulter",
    format: "Intra-entreprise",
    intro: "",
    prerequisites: "Aucun",
    certification: "Attestation de fin de formation",
    programme: [],
    description: [],
    audience: "",
    funding: "",
  };
}

function emptySector(): Sector {
  return {
    title: "Nouveau secteur",
    description: "",
    why: { title: "", text: "" },
    trainings: [],
  };
}

function TrainingEditor({
  training,
  onChange,
}: {
  training: Training;
  onChange: (training: Training) => void;
}) {
  const set = <K extends keyof Training>(key: K, value: Training[K]) =>
    onChange({ ...training, [key]: value });

  return (
    <div className="grid gap-4">
      <Field
        label="Nom de la formation"
        value={training.title}
        onChange={(v) => set("title", v)}
      />
      <Field
        label="Accroche"
        rows={2}
        hint="Phrase courte affichée sur la carte et en haut de la fiche."
        value={training.intro}
        onChange={(v) => set("intro", v)}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Durée"
          value={training.duration}
          onChange={(v) => set("duration", v)}
        />
        <Field
          label="Modalité"
          value={training.format}
          onChange={(v) => set("format", v)}
        />
        <Field
          label="Prérequis"
          value={training.prerequisites}
          onChange={(v) => set("prerequisites", v)}
        />
        <Field
          label="Effectif (facultatif)"
          value={training.effectif ?? ""}
          onChange={(v) => set("effectif", v || undefined)}
        />
      </div>
      <Field
        label="Validation"
        value={training.certification}
        onChange={(v) => set("certification", v)}
      />

      <ImageField
        label="Photo de la formation"
        value={training.image}
        onChange={(v) => onChange({ ...training, image: v })}
      />
      {training.image && (
        <Field
          label="Description de la photo (accessibilité)"
          value={training.imageAlt ?? ""}
          onChange={(v) => set("imageAlt", v || undefined)}
        />
      )}

      <ParagraphsField
        label="Description"
        value={training.description}
        onChange={(v) => set("description", v)}
      />

      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
          Programme
        </p>
        <ListEditor
          items={training.programme}
          onChange={(v) => set("programme", v)}
          createItem={() => ({ title: "Nouveau module", text: "" })}
          addLabel="Ajouter un module"
          titleFor={(m, i) => `${i + 1}. ${m.title}`}
          renderItem={(module, update) => (
            <div className="grid gap-3">
              <Field
                label="Titre du module"
                value={module.title}
                onChange={(v) => update({ ...module, title: v })}
              />
              <Field
                label="Contenu"
                rows={4}
                value={module.text}
                onChange={(v) => update({ ...module, text: v })}
              />
            </div>
          )}
        />
      </div>

      <Field
        label="Public concerné"
        rows={5}
        value={training.audience}
        onChange={(v) => set("audience", v)}
      />
      <Field
        label="Financement"
        rows={5}
        value={training.funding}
        onChange={(v) => set("funding", v)}
      />
    </div>
  );
}

export default function SectorsEditor({
  sectors,
  onChange,
}: {
  sectors: Sector[];
  onChange: (sectors: Sector[]) => void;
}) {
  const [openSector, setOpenSector] = useState<number | null>(null);
  const [openTraining, setOpenTraining] = useState<number | null>(null);

  const moveSector = (index: number, delta: number) => {
    const target = index + delta;
    if (target < 0 || target >= sectors.length) return;
    const next = [...sectors];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
    setOpenSector(null);
    setOpenTraining(null);
  };

  const updateSector = (index: number, sector: Sector) =>
    onChange(sectors.map((s, i) => (i === index ? sector : s)));

  return (
    <div className="grid gap-4">
      {sectors.map((sector, index) => {
        const open = openSector === index;
        return (
          <Card key={index}>
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  setOpenSector(open ? null : index);
                  setOpenTraining(null);
                }}
                className="flex-1 text-left"
              >
                <p className="font-semibold">{sector.title}</p>
                <p className="text-xs text-muted">
                  {sector.trainings.length} formation
                  {sector.trainings.length > 1 ? "s" : ""}
                  {sector.image ? " · photo" : " · pas de photo"}
                </p>
              </button>
              <div className="flex shrink-0 gap-1.5">
                <SmallButton
                  title="Monter"
                  onClick={() => moveSector(index, -1)}
                  disabled={index === 0}
                >
                  ↑
                </SmallButton>
                <SmallButton
                  title="Descendre"
                  onClick={() => moveSector(index, 1)}
                  disabled={index === sectors.length - 1}
                >
                  ↓
                </SmallButton>
                <SmallButton
                  tone="danger"
                  onClick={() => {
                    if (!confirm(`Supprimer le secteur « ${sector.title} » et ses formations ?`))
                      return;
                    onChange(sectors.filter((_, i) => i !== index));
                    setOpenSector(null);
                  }}
                >
                  Supprimer
                </SmallButton>
                <SmallButton onClick={() => setOpenSector(open ? null : index)}>
                  {open ? "Fermer" : "Modifier"}
                </SmallButton>
              </div>
            </div>

            {open && (
              <div className="mt-6 grid gap-5 border-t border-border pt-6">
                <Field
                  label="Nom du secteur"
                  value={sector.title}
                  onChange={(v) => updateSector(index, { ...sector, title: v })}
                />
                <Field
                  label="Texte explicatif"
                  rows={6}
                  hint="Affiché dans l'encart en haut de la page secteur."
                  value={sector.description}
                  onChange={(v) =>
                    updateSector(index, { ...sector, description: v })
                  }
                />
                <ImageField
                  label="Photo de fond du secteur"
                  value={sector.image}
                  onChange={(v) => updateSector(index, { ...sector, image: v })}
                />
                {sector.image && (
                  <Field
                    label="Description de la photo (accessibilité)"
                    value={sector.imageAlt ?? ""}
                    onChange={(v) =>
                      updateSector(index, { ...sector, imageAlt: v || undefined })
                    }
                  />
                )}

                <div className="grid gap-4 rounded-2xl border border-border bg-surface-2 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                    Pourquoi former vos équipes
                  </p>
                  <Field
                    label="Titre"
                    value={sector.why.title}
                    onChange={(v) =>
                      updateSector(index, {
                        ...sector,
                        why: { ...sector.why, title: v },
                      })
                    }
                  />
                  <Field
                    label="Texte"
                    rows={5}
                    value={sector.why.text}
                    onChange={(v) =>
                      updateSector(index, {
                        ...sector,
                        why: { ...sector.why, text: v },
                      })
                    }
                  />
                </div>

                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
                    Formations du secteur
                  </p>
                  <div className="grid gap-3">
                    {sector.trainings.map((training, ti) => {
                      const openT = openTraining === ti;
                      const moveTraining = (delta: number) => {
                        const target = ti + delta;
                        if (target < 0 || target >= sector.trainings.length)
                          return;
                        const next = [...sector.trainings];
                        [next[ti], next[target]] = [next[target], next[ti]];
                        updateSector(index, { ...sector, trainings: next });
                        setOpenTraining(null);
                      };
                      return (
                        <div
                          key={ti}
                          className="rounded-2xl border border-border bg-surface p-4"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <button
                              type="button"
                              onClick={() => setOpenTraining(openT ? null : ti)}
                              className="flex-1 text-left text-sm font-medium"
                            >
                              {training.title}
                            </button>
                            <div className="flex shrink-0 gap-1.5">
                              <SmallButton
                                title="Monter"
                                onClick={() => moveTraining(-1)}
                                disabled={ti === 0}
                              >
                                ↑
                              </SmallButton>
                              <SmallButton
                                title="Descendre"
                                onClick={() => moveTraining(1)}
                                disabled={ti === sector.trainings.length - 1}
                              >
                                ↓
                              </SmallButton>
                              <SmallButton
                                tone="danger"
                                onClick={() => {
                                  if (
                                    !confirm(
                                      `Supprimer la formation « ${training.title} » ?`,
                                    )
                                  )
                                    return;
                                  updateSector(index, {
                                    ...sector,
                                    trainings: sector.trainings.filter(
                                      (_, i) => i !== ti,
                                    ),
                                  });
                                  setOpenTraining(null);
                                }}
                              >
                                Supprimer
                              </SmallButton>
                              <SmallButton
                                onClick={() => setOpenTraining(openT ? null : ti)}
                              >
                                {openT ? "Fermer" : "Modifier"}
                              </SmallButton>
                            </div>
                          </div>

                          {openT && (
                            <div className="mt-5 border-t border-border pt-5">
                              <TrainingEditor
                                training={training}
                                onChange={(next) =>
                                  updateSector(index, {
                                    ...sector,
                                    trainings: sector.trainings.map((t, i) =>
                                      i === ti ? next : t,
                                    ),
                                  })
                                }
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}

                    <button
                      type="button"
                      onClick={() => {
                        updateSector(index, {
                          ...sector,
                          trainings: [...sector.trainings, emptyTraining()],
                        });
                        setOpenTraining(sector.trainings.length);
                      }}
                      className="rounded-2xl border border-dashed border-border px-4 py-3 text-sm font-semibold text-muted transition-colors hover:border-accent hover:text-accent"
                    >
                      + Ajouter une formation
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Card>
        );
      })}

      <button
        type="button"
        onClick={() => {
          onChange([...sectors, emptySector()]);
          setOpenSector(sectors.length);
        }}
        className="rounded-2xl border border-dashed border-border px-4 py-3 text-sm font-semibold text-muted transition-colors hover:border-accent hover:text-accent"
      >
        + Ajouter un secteur
      </button>
    </div>
  );
}
