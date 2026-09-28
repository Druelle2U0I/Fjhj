"use client";

import { upload as uploadToBlob } from "@vercel/blob/client";
import Image from "next/image";
import { useRef, useState, type ReactNode } from "react";

export function Field({
  label,
  value,
  onChange,
  rows,
  hint,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  hint?: string;
  placeholder?: string;
}) {
  const shared =
    "mt-1.5 w-full rounded-xl border border-border bg-surface-2 px-3 py-2 text-sm text-foreground outline-none focus:border-surface-accent";
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wide text-muted">
        {label}
      </span>
      {rows ? (
        <textarea
          value={value}
          rows={rows}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={shared}
        />
      ) : (
        <input
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={shared}
        />
      )}
      {hint && <span className="mt-1 block text-xs text-muted">{hint}</span>}
    </label>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-border bg-surface p-5 ${className}`}
    >
      {children}
    </div>
  );
}

export function SmallButton({
  children,
  onClick,
  title,
  disabled,
  tone = "neutral",
}: {
  children: ReactNode;
  onClick: () => void;
  title?: string;
  disabled?: boolean;
  tone?: "neutral" | "danger";
}) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={`rounded-lg border border-border px-2.5 py-1 text-xs font-semibold transition-colors disabled:opacity-30 ${
        tone === "danger"
          ? "hover:border-red-400 hover:text-red-400"
          : "hover:border-accent hover:text-accent"
      }`}
    >
      {children}
    </button>
  );
}

/** Liste générique : réordonner, supprimer, ajouter. */
export function ListEditor<T>({
  items,
  onChange,
  createItem,
  addLabel,
  renderItem,
  titleFor,
}: {
  items: T[];
  onChange: (items: T[]) => void;
  createItem: () => T;
  addLabel: string;
  renderItem: (item: T, update: (next: T) => void, index: number) => ReactNode;
  titleFor: (item: T, index: number) => string;
}) {
  const move = (index: number, delta: number) => {
    const target = index + delta;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <div className="grid gap-4">
      {items.map((item, index) => (
        <Card key={index}>
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-sm font-semibold">
              {titleFor(item, index) || "Sans titre"}
            </p>
            <div className="flex shrink-0 gap-1.5">
              <SmallButton
                title="Monter"
                onClick={() => move(index, -1)}
                disabled={index === 0}
              >
                ↑
              </SmallButton>
              <SmallButton
                title="Descendre"
                onClick={() => move(index, 1)}
                disabled={index === items.length - 1}
              >
                ↓
              </SmallButton>
              <SmallButton
                title="Supprimer"
                tone="danger"
                onClick={() => {
                  if (!confirm(`Supprimer « ${titleFor(item, index)} » ?`)) return;
                  onChange(items.filter((_, i) => i !== index));
                }}
              >
                Supprimer
              </SmallButton>
            </div>
          </div>
          {renderItem(
            item,
            (next) => onChange(items.map((it, i) => (i === index ? next : it))),
            index,
          )}
        </Card>
      ))}

      <button
        type="button"
        onClick={() => onChange([...items, createItem()])}
        className="rounded-2xl border border-dashed border-border px-4 py-3 text-sm font-semibold text-muted transition-colors hover:border-accent hover:text-accent"
      >
        + {addLabel}
      </button>
    </div>
  );
}

export function ImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: string;
  onChange: (value: string | undefined) => void;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Aperçu local de la dernière image envoyée : le fichier publié n'est
  // servi par le site qu'après le redéploiement (une à deux minutes).
  const [preview, setPreview] = useState<{ path: string; url: string } | null>(null);

  const upload = async (original: File) => {
    setBusy(true);
    setError(null);
    let file = original;
    try {
      file = await shrinkImage(original);
    } catch {
      // En cas d'échec de la compression, on tente l'envoi du fichier brut.
    }
    const body = new FormData();
    body.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body }).catch(() => null);
    const data = res ? await res.json().catch(() => ({})) : {};
    setBusy(false);
    if (!res || !res.ok) {
      setError(
        data.error ??
          (res?.status === 413
            ? "Image trop lourde, même après compression. Essayez une image plus petite."
            : "Envoi impossible. Vérifiez votre connexion et réessayez."),
      );
      return;
    }
    setPreview({ path: data.path, url: URL.createObjectURL(file) });
    onChange(data.path);
  };

  const shown = preview && preview.path === value ? preview.url : value;

  return (
    <div>
      <span className="text-xs font-semibold uppercase tracking-wide text-muted">
        {label}
      </span>
      <div className="mt-2 flex items-center gap-4">
        <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border border-border bg-surface-2">
          {shown ? (
            shown.startsWith("blob:") ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={shown} alt="" className="h-full w-full object-cover" />
            ) : (
              <Image src={shown} alt="" fill sizes="112px" className="object-cover" />
            )
          ) : (
            <span className="flex h-full items-center justify-center text-xs text-muted">
              Aucune
            </span>
          )}
        </div>
        <div className="grid gap-2">
          <input
            ref={input}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) upload(file);
              e.target.value = "";
            }}
          />
          <div className="flex gap-2">
            <SmallButton onClick={() => input.current?.click()} disabled={busy}>
              {busy ? "Envoi…" : "Choisir une image"}
            </SmallButton>
            {value && (
              <SmallButton tone="danger" onClick={() => onChange(undefined)}>
                Retirer
              </SmallButton>
            )}
          </div>
          {value && <p className="text-xs text-muted">{value}</p>}
          {error && <p className="text-xs text-red-400">{error}</p>}
        </div>
      </div>
    </div>
  );
}

const CROP_PRESETS: { value: string; label: string }[] = [
  { value: "left top", label: "Haut gauche" },
  { value: "center top", label: "Haut centre" },
  { value: "right top", label: "Haut droite" },
  { value: "left center", label: "Centre gauche" },
  { value: "center center", label: "Centre" },
  { value: "right center", label: "Centre droite" },
  { value: "left bottom", label: "Bas gauche" },
  { value: "center bottom", label: "Bas centre" },
  { value: "right bottom", label: "Bas droite" },
];

// Choix du cadrage d'une photo dans un cadre plus étroit qu'elle (ex. une
// photo au format paysage affichée dans une carte au format portrait) :
// neuf cadrages prédéfinis, avec aperçu au format réellement utilisé sur
// le site. N'affiche rien tant qu'aucune photo n'est choisie.
export function ImagePositionField({
  label,
  src,
  value,
  onChange,
  aspect = "aspect-[4/5]",
  hint,
}: {
  label: string;
  src?: string;
  value?: string;
  onChange: (value: string | undefined) => void;
  aspect?: string;
  hint?: string;
}) {
  if (!src) return null;
  const current = value || "center center";

  return (
    <div>
      <span className="text-xs font-semibold uppercase tracking-wide text-muted">
        {label}
      </span>
      <p className="mt-1 text-xs text-muted">
        {hint ?? "Choisissez la partie de la photo à garder visible dans la carte, utile si la photo est plus large que haute."}
      </p>
      <div className="mt-2 flex items-start gap-4">
        <div
          className={`relative w-28 shrink-0 overflow-hidden rounded-xl border border-border bg-surface-2 ${aspect}`}
        >
          {/* Aperçu brut (pas next/image) : suffisant pour un cadrage, et
              évite les soucis de domaine/optimisation sur un aperçu local. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: current }}
          />
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {CROP_PRESETS.map((preset) => (
            <button
              key={preset.value}
              type="button"
              title={preset.label}
              aria-label={preset.label}
              aria-pressed={current === preset.value}
              onClick={() => onChange(preset.value === "center center" ? undefined : preset.value)}
              className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-colors ${
                current === preset.value
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border bg-surface-2 text-muted hover:border-surface-accent"
              }`}
            >
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function VideoField({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value?: string;
  onChange: (value: string | undefined) => void;
  hint?: string;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const upload = async (file: File) => {
    setBusy(true);
    setError(null);
    setProgress(0);
    try {
      // Envoi direct au stockage (Vercel Blob), sans passer par une
      // fonction serverless : les vidéos sont trop lourdes pour la
      // limite de 4,5 Mo imposée aux requêtes par l'hébergeur.
      const blob = await uploadToBlob(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/admin/video-upload",
        onUploadProgress: ({ percentage }) => setProgress(percentage),
      });
      onChange(blob.url);
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? err.message
          : "Envoi impossible. Vérifiez votre connexion et réessayez.",
      );
    } finally {
      setBusy(false);
      setProgress(null);
    }
  };

  const shown = value;

  return (
    <div>
      <span className="text-xs font-semibold uppercase tracking-wide text-muted">
        {label}
      </span>
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
      <div className="mt-2 flex items-center gap-4">
        <div className="relative flex h-20 w-28 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-surface-2">
          {shown ? (
            <video src={shown} muted className="h-full w-full object-cover" />
          ) : (
            <span className="text-xs text-muted">Aucune</span>
          )}
        </div>
        <div className="grid gap-2">
          <input
            ref={input}
            type="file"
            accept="video/mp4,video/webm"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) upload(file);
              e.target.value = "";
            }}
          />
          <div className="flex gap-2">
            <SmallButton onClick={() => input.current?.click()} disabled={busy}>
              {busy ? `Envoi… ${Math.round(progress ?? 0)} %` : "Choisir une vidéo"}
            </SmallButton>
            {value && (
              <SmallButton tone="danger" onClick={() => onChange(undefined)}>
                Retirer
              </SmallButton>
            )}
          </div>
          {value && <p className="text-xs text-muted">{value}</p>}
          {error && <p className="text-xs text-red-400">{error}</p>}
        </div>
      </div>
    </div>
  );
}

// Comme ColorField, mais la couleur est facultative : tant qu'elle n'est
// pas définie, la page utilise la couleur du site (affichée en aperçu),
// et un bouton permet d'y revenir à tout moment.
export function OptionalColorField({
  label,
  value,
  fallback,
  onChange,
}: {
  label: string;
  value?: string;
  fallback: string;
  onChange: (value: string | undefined) => void;
}) {
  const shown = value || fallback;
  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted">
          {label}
        </span>
        {value && (
          <button
            type="button"
            onClick={() => onChange(undefined)}
            className="shrink-0 text-xs font-semibold text-muted underline decoration-dotted underline-offset-2 hover:text-accent"
          >
            Réinitialiser
          </button>
        )}
      </div>
      <div className="mt-1.5 flex items-center gap-3">
        <input
          type="color"
          value={shown}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-12 shrink-0 cursor-pointer rounded-lg border border-border bg-surface-2"
        />
        <input
          value={shown}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-border bg-surface-2 px-3 py-2 font-mono text-sm outline-none focus:border-surface-accent"
        />
      </div>
      {!value && (
        <span className="mt-1 block text-xs text-muted">
          Couleur du site pour l&apos;instant ({fallback}).
        </span>
      )}
    </div>
  );
}

export function ColorField({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
}) {
  return (
    <div>
      <span className="text-xs font-semibold uppercase tracking-wide text-muted">
        {label}
      </span>
      <div className="mt-1.5 flex items-center gap-3">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-12 shrink-0 cursor-pointer rounded-lg border border-border bg-surface-2"
        />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-border bg-surface-2 px-3 py-2 font-mono text-sm outline-none focus:border-surface-accent"
        />
      </div>
      {hint && <span className="mt-1 block text-xs text-muted">{hint}</span>}
    </div>
  );
}

/** Un paragraphe par bloc séparé d'une ligne vide. */
export function ParagraphsField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
}) {
  return (
    <Field
      label={label}
      rows={10}
      hint="Laissez une ligne vide entre deux paragraphes."
      value={value.join("\n\n")}
      onChange={(text) =>
        onChange(
          text
            .split(/\n\s*\n/)
            .map((p) => p.trim())
            .filter(Boolean),
        )
      }
    />
  );
}

// Réduit une photo à 2400 px de côté maximum et la recompresse en JPEG,
// pour rester sous la limite d'envoi de l'hébergeur (4,5 Mo). Les petites images restent intactes.
async function shrinkImage(file: File): Promise<File> {
  const MAX_SIDE = 2400;
  const TARGET_BYTES = 3.5 * 1024 * 1024;
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  if (scale === 1 && file.size <= TARGET_BYTES) {
    bitmap.close();
    return file;
  }
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  let quality = 0.85;
  let blob: Blob | null = null;
  do {
    blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
    quality -= 0.1;
  } while (blob && blob.size > TARGET_BYTES && quality > 0.4);
  if (!blob) return file;
  const name = file.name.replace(/\.[^.]+$/, "") + ".jpg";
  return new File([blob], name, { type: "image/jpeg" });
}
