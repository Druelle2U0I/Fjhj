import Link from "next/link";
import Visual from "@/components/Visual";

// Carte formation : toute la photo mène à la fiche. Titre en haut à gauche,
// description et durée en bas à gauche ; au survol, le bas remonte et un
// grand bouton « Demander un devis » translucide apparaît (comme un bouton
// « Ajouter au panier »). Sur écran tactile, le bouton reste visible.
export default function TrainingCard({
  href,
  title,
  intro,
  duration,
  tag,
  image,
  imageAlt,
  imagePosition,
  quoteHref,
  quoteLabel,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw",
}: {
  href: string;
  title: string;
  intro?: string;
  duration?: string;
  tag?: string;
  image?: string;
  imageAlt?: string;
  imagePosition?: string;
  quoteHref: string;
  quoteLabel: string;
  sizes?: string;
}) {
  return (
    <article className="spotlight-item group relative flex aspect-[4/5] h-full flex-col overflow-hidden rounded-2xl bg-surface">
      <Visual
        src={image}
        alt={imageAlt ?? title}
        sizes={sizes}
        objectPosition={imagePosition}
        className="transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-black/75" />

      {/* Lien couvrant toute la carte, vers la fiche formation. */}
      <Link href={href} aria-label={title} className="absolute inset-0 z-[1]" />

      <div className="pointer-events-none relative p-5">
        {tag && (
          <span className="domain-tag mb-3 inline-flex w-fit rounded-full border border-white/15 px-3 py-1 text-xs font-semibold">
            {tag}
          </span>
        )}
        <h3 className="font-heading text-sm uppercase leading-tight text-white sm:text-base">{title}</h3>
      </div>

      <div className="pointer-events-none relative mt-auto p-5 transition-transform duration-500 ease-out [@media(hover:hover)]:translate-y-[4.25rem] [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-focus-within:translate-y-0">
        {intro && <p className="line-clamp-2 whitespace-pre-line text-sm text-white/85">{intro}</p>}
        {duration && <p className="mt-2 text-sm font-semibold text-white">{duration}</p>}
        <Link
          href={quoteHref}
          className="quote-pill pointer-events-auto relative z-[2] mt-4 flex w-full items-center justify-center rounded-full px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] backdrop-blur-md transition-opacity duration-500 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-within:opacity-100"
        >
          {quoteLabel}
        </Link>
      </div>
    </article>
  );
}
