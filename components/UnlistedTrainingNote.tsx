import Link from "next/link";
import Reveal from "@/components/Reveal";
import { pages } from "@/lib/data";

// « Une formation absente de cette liste ? » : grand point d'interrogation
// (même rond que « Le saviez-vous ? » des pages domaine), titre en police des titres, petite phrase et lien vers Contact.
export default function UnlistedTrainingNote({ delay = 0.1 }: { delay?: number }) {
  return (
    <Reveal delay={delay}>
      <div className="mt-12 flex flex-col items-center gap-5 border-t border-foreground/20 pt-10 text-center sm:flex-row sm:items-center sm:gap-8 sm:text-left">
        <span
          aria-hidden="true"
          className="font-heading flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-accent text-4xl text-accent-foreground shadow-[0_14px_28px_-6px_rgba(11,3,43,0.55),0_4px_10px_rgba(11,3,43,0.3)] ring-4 ring-background/60 sm:h-20 sm:w-20 sm:text-5xl"
        >
          ?
        </span>
        <div className="flex-1">
          <h2 className="text-xl sm:text-2xl">{pages.sector.customTitle}</h2>
          <p className="mt-2 text-muted">{pages.sector.customText}</p>
        </div>
        <Link
          href="/contact"
          className="underline-link inline-block whitespace-nowrap border-b pb-0.5 text-xs font-bold uppercase tracking-[0.12em] transition-opacity hover:opacity-70"
        >
          Nous contacter
        </Link>
      </div>
    </Reveal>
  );
}
