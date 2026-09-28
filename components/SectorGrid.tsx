import Link from "next/link";
import Visual from "@/components/Visual";
import type { services as allServices } from "@/lib/data";

type Service = (typeof allServices)[number];

// Grille des domaines de l'accueil : les huit domaines visibles d'un coup,
// en cartes photo pleines (comme les formations). Le nom et le nombre de
// formations restent affichés ; le résumé apparaît au survol sur
// ordinateur (toujours visible sur écran tactile, sans survol possible).
export default function SectorGrid({ services }: { services: Service[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((service) => (
        <li key={service.slug}>
          <Link
            href={`/formations/${service.slug}`}
            className="dyn-card group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-lg sm:aspect-[3/4]"
          >
            <Visual
              src={service.image}
              alt={service.imageAlt || service.title}
              sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 90vw"
              objectPosition={service.imagePosition}
              className="transition-transform duration-700 group-hover:scale-105"
            />
            <div className="card-veil absolute inset-0" />
            <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/35" />

            <div className="relative p-5">
              <h3 className="text-lg font-bold leading-snug text-white">{service.title}</h3>
              {service.summary && (
                <div className="grid transition-[grid-template-rows,opacity] duration-500 ease-out [@media(hover:hover)]:grid-rows-[0fr] [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:grid-rows-[1fr] [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-visible:grid-rows-[1fr] [@media(hover:hover)]:group-focus-visible:opacity-100">
                  <p className="overflow-hidden text-sm leading-relaxed text-white/85">
                    <span className="block pt-2">{service.summary}</span>
                  </p>
                </div>
              )}
              <p className="mt-3 text-xs font-semibold text-white/90">
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
