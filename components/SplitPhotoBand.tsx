import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import Visual from "@/components/Visual";

// Bande à deux colonnes : une grande photo qui déborde jusqu'au bord de
// l'écran (au lieu d'une photo encadrée, contenue) d'un côté, du texte
// dans une colonne lisible de l'autre. `align` choisit le côté de la
// photo, pour alterner le rythme d'une section à l'autre sur la page.
export default function SplitPhotoBand({
  image,
  imageAlt,
  align = "left",
  children,
}: {
  image: string;
  imageAlt?: string;
  align?: "left" | "right";
  children: ReactNode;
}) {
  return (
    <section className="overflow-hidden">
      <div className="grid lg:grid-cols-2 lg:items-stretch">
        <Reveal
          className={`relative aspect-[4/3] lg:aspect-auto lg:min-h-[480px] ${
            align === "right" ? "lg:order-2" : ""
          }`}
        >
          <Visual src={image} alt={imageAlt ?? ""} sizes="(min-width: 1024px) 50vw, 100vw" />
        </Reveal>

        <Reveal
          delay={0.1}
          className="flex flex-col justify-center px-6 py-14 text-center sm:py-20 lg:px-16"
        >
          <div className="mx-auto max-w-md">{children}</div>
        </Reveal>
      </div>
    </section>
  );
}
