import type { ReactNode } from "react";
import Image from "next/image";
import HeroBackgroundPhoto from "@/components/HeroBackgroundPhoto";

export default function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb,
  image,
  imageAlt,
  aside,
  backgroundImage,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  breadcrumb?: ReactNode;
  image?: string;
  imageAlt?: string;
  // Contenu libre affiché à droite (chiffres clés, encadré…), à la place
  // d'une image, pour ne pas laisser la moitié droite vide.
  aside?: ReactNode;
  // Grande photo plein cadre en fond de l'en-tête (indépendante de
  // `image`, qui reste une photo cadrée à droite du titre).
  backgroundImage?: string;
}) {
  const hasRightColumn = Boolean(image || aside);

  return (
    <section className="page-hero relative -mt-[86px] overflow-hidden px-6 pt-[112px] pb-10 sm:-mt-[94px] sm:pt-[148px] sm:pb-14">
      {backgroundImage && <HeroBackgroundPhoto src={backgroundImage} alt={imageAlt ?? title} />}
      <div
        className={`relative mx-auto max-w-6xl ${backgroundImage ? "on-surface" : ""} ${
          hasRightColumn ? "grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center" : ""
        }`}
      >
        <div>
          {breadcrumb && (
            <div className="mb-6 hidden text-sm text-muted sm:block">{breadcrumb}</div>
          )}
          <span className="text-sm font-semibold text-muted">
            {eyebrow}
          </span>
          <h1 className="mt-2 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:mt-3 sm:text-5xl md:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-3 max-w-2xl text-base text-muted sm:mt-5 sm:text-lg">
              {description}
            </p>
          )}
        </div>

        {image ? (
          <div className="dyn-photo-wrap dyn-card relative aspect-[4/3] overflow-hidden rounded-lg border border-border">
            <Image
              src={image}
              alt={imageAlt ?? title}
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="dyn-photo object-cover"
            />
          </div>
        ) : (
          aside
        )}
      </div>
    </section>
  );
}
