import Link from "next/link";
import Reveal from "@/components/Reveal";
import { pages } from "@/lib/data";

// « Une formation absente de cette liste ? » : grand point d'interrogation
// jaune, titre en police des titres, petite phrase et lien vers Contact.
export default function UnlistedTrainingNote({ delay = 0.1 }: { delay?: number }) {
  return (
    <Reveal delay={delay}>
      <div className="mt-12 flex flex-col items-center gap-5 border-t border-foreground/20 pt-10 text-center sm:flex-row sm:items-center sm:gap-8 sm:text-left">
        <span
          aria-hidden="true"
          className="font-heading flex h-16 w-16 shrink-0 rotate-[-8deg] items-center justify-center rounded-full bg-highlight text-3xl text-highlight-foreground shadow-lg"
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
