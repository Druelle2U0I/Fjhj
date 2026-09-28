import Link from "next/link";
import Visual from "@/components/Visual";
import type { services as allServices } from "@/lib/data";

type Service = (typeof allServices)[number];

// Grille des domaines de l'accueil : les huit domaines visibles d'un coup,
// chacun avec sa photo, son titre, deux lignes de résumé et le nombre de
// formations.
export default function SectorGrid({ services }: { services: Service[] }) {
  return (
    <ul className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-12">
      {services.map((service) => (
        <li key={service.slug}>
          <Link
            href={`/formations/${service.slug}`}
            className="group flex h-full gap-4 sm:flex-col sm:gap-0"
          >
            <div className="relative aspect-square w-28 shrink-0 self-start overflow-hidden rounded-sm sm:aspect-[4/3] sm:w-full">
              <Visual
                src={service.image}
                alt={service.imageAlt || service.title}
                sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 112px"
                objectPosition={service.imagePosition}
                className="transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col sm:pt-4">
              <h3 className="text-base font-bold leading-snug transition-colors group-hover:text-accent sm:text-lg">{service.title}</h3>
              {service.summary && (
                <p className="mt-2 text-sm leading-relaxed text-muted">{service.summary}</p>
              )}
              <p className="mt-auto pt-3 text-xs font-semibold text-foreground">
                {service.trainings.length} formation{service.trainings.length > 1 ? "s" : ""}{" "}
                <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
