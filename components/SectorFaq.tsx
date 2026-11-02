import type { FaqItem } from "@/lib/data";

// FAQ d'une page domaine. <details> natif : les réponses restent dans la
// page même repliées (lisibles par Google), sans JavaScript.
export default function SectorFaq({ items }: { items: FaqItem[] }) {
  const list = items.filter((item) => item.question.trim() && item.answer.trim());
  if (list.length === 0) return null;
  return (
    <div className="border-t border-foreground/20">
      {list.map((item, index) => (
        <details key={item.question} open={index === 0} className="group border-b border-foreground/20">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left [&::-webkit-details-marker]:hidden">
            <h3 className="text-sm font-semibold sm:text-base">{item.question}</h3>
            <span
              aria-hidden="true"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-lg leading-none text-accent-foreground transition-transform duration-200 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="max-w-3xl whitespace-pre-line pb-5 text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
