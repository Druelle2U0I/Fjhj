import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import Visual from "@/components/Visual";

// Rangée photo + texte de l'accueil, en quinconce : photo arrondie d'un
// côté, texte de l'autre, décalés en hauteur ; `side` alterne le côté de
// la photo d'une rangée à l'autre pour donner du rythme à la page.
export default function ZigzagRow({
  image,
  imageAlt,
  side = "left",
  contain = false,
  children,
}: {
  image?: string;
  imageAlt?: string;
  side?: "left" | "right";
  // Image à montrer entière (logo, format paysage) : cadre au format de
  // l'image au lieu du portrait 4/5.
  contain?: boolean;
  children: ReactNode;
}) {
  const right = side === "right";
  return (
    <section className="px-6 py-10 sm:py-14">
      <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-12 md:gap-12">
        <Reveal
          className={`relative w-full overflow-hidden rounded-2xl bg-surface shadow-xl shadow-black/10 md:col-span-5 ${
            contain ? "aspect-[10/7]" : "aspect-[4/3] md:aspect-[4/5]"
          } ${
            right ? "md:order-2 md:col-start-8 md:mt-16" : "md:-mt-10"
          }`}
        >
          <Visual src={image} alt={imageAlt ?? ""} sizes="(min-width: 768px) 480px, 90vw" />
        </Reveal>
        <Reveal
          delay={0.1}
          className={`md:col-span-6 ${right ? "md:order-1 md:col-start-1" : "md:col-start-7"}`}
        >
          {children}
        </Reveal>
      </div>
    </section>
  );
}
