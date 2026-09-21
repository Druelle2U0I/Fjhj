import Image from "next/image";
import Reveal from "@/components/Reveal";

const photos = [
  {
    src: "/images/reseaux-chantier.jpg",
    alt: "Chantier de voirie avec câbles et signalisation, intervention à proximité des réseaux",
    caption: "AIPR — intervention à proximité des réseaux",
  },
  {
    src: "/images/engins-chantier-route.jpg",
    alt: "Compacteurs et finisseur sur un chantier routier",
    caption: "Engins de chantier (R482)",
  },
  {
    src: "/images/chariot-elevateur.jpg",
    alt: "Fourches d'un chariot élévateur au sol",
    caption: "CACES R489 — chariots élévateurs",
  },
];

export default function Gallery() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 sm:grid-cols-3">
          {photos.map((photo, i) => (
            <Reveal key={photo.src} delay={i * 0.08}>
              <div className="dyn-photo-wrap dyn-card relative aspect-[4/5] overflow-hidden rounded-2xl border border-border">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 640px) 33vw, 90vw"
                  className="dyn-photo object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/0 to-transparent" />
                <p className="absolute bottom-4 left-4 right-4 text-sm font-medium text-foreground">
                  {photo.caption}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
