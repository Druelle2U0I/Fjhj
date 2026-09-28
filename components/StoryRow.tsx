import type { ReactNode } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Visual from "@/components/Visual";

// Rangée « photo + texte » de l'accueil : colonne étroite centrée, deux
// moitiés égales, photo portrait arrondie d'un côté, texte de l'autre.
// Les rangées s'enchaînent presque sans espace, en alternant le côté de la
// photo, pour une lecture rythmée.
export default function StoryRow({
  image,
  imageAlt,
  imageBg,
  side = "left",
  align = "center",
  children,
}: {
  image?: string;
  imageAlt?: string;
  // Couleur de fond du cadre quand l'image (un logo) est montrée entière.
  imageBg?: string;
  side?: "left" | "right";
  align?: "center" | "left";
  children: ReactNode;
}) {
  const right = side === "right";
  return (
    <div className="grid items-center gap-6 sm:grid-cols-2 sm:gap-6">
      <Reveal className={right ? "sm:order-2" : undefined}>
        <div
          className="relative mx-auto aspect-[10/13] w-full max-w-[20rem] overflow-hidden rounded-2xl sm:max-w-none"
          style={imageBg ? { background: imageBg } : undefined}
        >
        {imageBg ? (
          <div className="absolute inset-x-5 inset-y-0">
            <Visual src={image} alt={imageAlt ?? ""} sizes="(min-width: 640px) 400px, 90vw" className="!object-contain" />
          </div>
        ) : (
          <Visual src={image} alt={imageAlt ?? ""} sizes="(min-width: 640px) 400px, 90vw" />
        )}
        </div>
      </Reveal>
      <Reveal
        delay={0.1}
        className={`px-2 sm:px-6 ${align === "center" ? "text-center" : ""} ${right ? "sm:order-1" : ""}`}
      >
        {children}
      </Reveal>
    </div>
  );
}

// Styles de texte communs aux rangées (titre en capitales, texte courant
// resserré, lien souligné en petites capitales).
export function StoryTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-xl font-extrabold uppercase leading-[1.1] tracking-tight sm:text-2xl">{children}</h2>
  );
}

export function StoryText({ children }: { children: ReactNode }) {
  return <p className="mt-5 whitespace-pre-line text-[15px] leading-relaxed text-foreground/85">{children}</p>;
}

export function StoryLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="mt-6 inline-block border-b border-foreground pb-0.5 text-xs font-bold uppercase tracking-[0.12em] text-foreground transition-colors hover:border-accent hover:text-accent"
    >
      {children}
    </Link>
  );
}

// Chiffre ou fait clé sous le texte : filet, intitulé en capitales, courte
// explication (remplace les listes à coches).
export function StoryFact({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-8 max-w-[17rem] border-t border-foreground/70 pt-3">
      <p className="text-base font-bold uppercase leading-snug tracking-tight">{title}</p>
      <p className="mt-1.5 text-sm leading-relaxed text-foreground/80">{children}</p>
    </div>
  );
}
