import Visual from "@/components/Visual";

// Grande photo plein cadre derrière un en-tête de page, voilée pour que
// le texte posé dessus (classe .on-surface) reste lisible. Remonte sous
// le menu (sticky, semi-transparent) : voir les sections parentes qui
// utilisent -mt-[86px]/-mt-[94px] + overflow-hidden.
export default function HeroBackgroundPhoto({
  src,
  alt = "",
}: {
  src: string;
  alt?: string;
}) {
  return (
    <div className="hero-photo-fade absolute inset-0">
      <Visual src={src} alt={alt} sizes="100vw" priority />
      <div className="absolute inset-0 bg-surface/50" />
      <div className="absolute inset-0 bg-gradient-to-b from-surface/65 via-surface/35 to-surface/45" />
    </div>
  );
}
