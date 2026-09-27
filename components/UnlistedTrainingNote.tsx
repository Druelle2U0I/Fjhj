import Reveal from "@/components/Reveal";
import { pages } from "@/lib/data";

export default function UnlistedTrainingNote({ delay = 0.1 }: { delay?: number }) {
  return (
    <Reveal delay={delay}>
      <div className="mt-8 flex items-start gap-4 rounded-lg bg-accent p-6 text-accent-foreground">
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
        <div>
          <p className="font-semibold">{pages.sector.customTitle}</p>
          <p className="mt-1 whitespace-pre-line text-sm text-accent-foreground/80">
            {pages.sector.customText}
          </p>
        </div>
      </div>
    </Reveal>
  );
}
