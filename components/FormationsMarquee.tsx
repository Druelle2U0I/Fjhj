import Link from "next/link";
import Visual from "@/components/Visual";
import type { HeroSlide } from "@/lib/data";

// Bande défilante en continu (façon bandeau d'actualités), qui reprend
// les formations mises en avant — auparavant dans le carrousel du haut
// de l'accueil. Défile toute seule, se met en pause au survol pour
// pouvoir lire et cliquer une carte tranquillement.
export default function FormationsMarquee({
  eyebrow,
  title,
  slides: allSlides,
}: {
  eyebrow?: string;
  title?: string;
  slides: HeroSlide[];
}) {
  const slides = allSlides.filter((slide) => slide.image);
  if (slides.length === 0) return null;

  // Le ruban défile de sa moitié gauche vers sa moitié droite (identiques) :
  // la boucle est invisible tant qu'il y a au moins 2 formations.
  const track = slides.length > 1 ? [...slides, ...slides] : slides;

  return (
    <section className="overflow-hidden py-14 sm:py-20">
      {(eyebrow || title) && (
        <div className="mx-auto mb-8 max-w-6xl px-6">
          {eyebrow && <span className="text-sm font-semibold text-muted">{eyebrow}</span>}
          {title && (
            <h2 className="mt-3 max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl">
              {title}
            </h2>
          )}
        </div>
      )}

      <div className="marquee-mask relative">
        <div className="marquee-track flex w-max gap-5 px-6">
          {track.map((slide, i) => {
            const card = (
              <>
                <Visual
                  src={slide.image}
                  alt={slide.alt ?? ""}
                  // Carte de 288-320 px, agrandie ×1,15 au survol : on
                  // demande une image assez grande pour rester nette.
                  sizes="(min-width: 640px) 400px, 360px"
                  className="transition-transform duration-500 ease-out group-hover:scale-[1.15] group-hover:duration-[6000ms]"
                />
                <div className="card-veil-soft absolute inset-0" />
                {(slide.title || slide.text) && (
                  <div className="relative p-4">
                    {slide.title && (
                      <p className="text-sm font-semibold text-white">{slide.title}</p>
                    )}
                    {slide.text && (
                      <p className="mt-1 line-clamp-1 text-xs text-white/75">{slide.text}</p>
                    )}
                  </div>
                )}
              </>
            );

            const className =
              "group relative flex h-56 w-72 shrink-0 flex-col justify-end overflow-hidden rounded-lg sm:h-64 sm:w-80";

            return slide.link ? (
              <Link key={`${slide.image}-${i}`} href={slide.link} className={className}>
                {card}
              </Link>
            ) : (
              <div key={`${slide.image}-${i}`} className={className}>
                {card}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
