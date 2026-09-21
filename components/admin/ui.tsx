"use client";

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
    "mt-1.5 w-full rounded-xl border border-border bg-surface-2 px-3 py-2 text-sm text-foreground outline-none focus:border-accent";
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

  const upload = async (file: File) => {
    setBusy(true);
    setError(null);
    const body = new FormData();
    body.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) {
      setError(data.error ?? "Envoi impossible.");
      return;
    }
    onChange(data.path);
  };

  return (
    <div>
      <span className="text-xs font-semibold uppercase tracking-wide text-muted">
        {label}
      </span>
      <div className="mt-2 flex items-center gap-4">
        <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border border-border bg-surface-2">
          {value ? (
            <Image src={value} alt="" fill sizes="112px" className="object-cover" />
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
          className="w-full rounded-xl border border-border bg-surface-2 px-3 py-2 font-mono text-sm outline-none focus:border-accent"
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
