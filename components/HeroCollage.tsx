import Image from "next/image";

const PHOTOS = [
  { src: "/images/6-1790067937290.jpg", alt: "Engins de chantier sur un site industriel" },
  { src: "/images/4-1790110514323.jpg", alt: "Massage cardiaque pratiqué sur un mannequin de secourisme" },
  { src: "/images/1-1790067951111.jpg", alt: "Chariot élévateur en entrepôt" },
];

// Collage de photos légèrement inclinées et décalées, plutôt qu'une
// seule image dans un cadre : donne du mouvement à l'ouverture de page.
export default function HeroCollage() {
  return (
    <div className="relative mx-auto flex h-[420px] max-w-md items-center justify-center sm:h-[460px]">
      <div className="dyn-card absolute left-0 top-4 h-[70%] w-[42%] -rotate-6 overflow-hidden rounded-2xl border border-border shadow-2xl transition-transform hover:rotate-0">
        <Image
          src={PHOTOS[0].src}
          alt={PHOTOS[0].alt}
          fill
          sizes="(min-width: 640px) 220px, 40vw"
          className="object-cover"
        />
      </div>
      <div className="dyn-card relative z-10 h-[88%] w-[46%] overflow-hidden rounded-2xl border border-border shadow-2xl">
        <Image
          src={PHOTOS[1].src}
          alt={PHOTOS[1].alt}
          fill
          sizes="(min-width: 640px) 240px, 44vw"
          priority
          className="object-cover"
        />
      </div>
      <div className="dyn-card absolute right-0 bottom-4 h-[65%] w-[40%] rotate-6 overflow-hidden rounded-2xl border border-border shadow-2xl transition-transform hover:rotate-0">
        <Image
          src={PHOTOS[2].src}
          alt={PHOTOS[2].alt}
          fill
          sizes="(min-width: 640px) 210px, 38vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
