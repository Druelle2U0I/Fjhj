import Link from "next/link";
import Reveal from "@/components/Reveal";
import { pages } from "@/lib/data";

// Encadré « formation absente de la liste », sous les cartes. `note` : texte
// propre au domaine (ex. habilitations électriques), affiché en premier.
export default function UnlistedTrainingNote({ delay = 0.1, note }: { delay?: number; note?: string }) {
  return (
    <Reveal delay={delay}>
      <div className="mt-8 flex items-start gap-4 rounded-lg bg-highlight p-6 text-highlight-foreground">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          className="mt-0.5 h-5 w-5 shrink-0"
        >
          <circle cx="12" cy="12" r="9" />
          <path strokeLinecap="round" d="M12 11v5" />
          <circle cx="12" cy="8" r="0.75" fill="currentColor" stroke="none" />
        </svg>
        <div className="flex-1">
          {note ? (
            <p className="text-lg font-semibold leading-snug">{note}</p>
          ) : (
            <>
              <p className="font-semibold">{pages.sector.customTitle}</p>
              <p className="mt-1 whitespace-pre-line text-sm text-highlight-foreground/80">
                {pages.sector.customText}
              </p>
            </>
          )}
          {note && (
            <Link
              href="/contact"
              className="mt-4 inline-flex rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-transform hover:scale-105"
            >
              Nous contacter
            </Link>
          )}
        </div>
      </div>
    </Reveal>
  );
}
