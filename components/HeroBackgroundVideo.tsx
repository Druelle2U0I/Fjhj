"use client";

import { useEffect, useRef } from "react";

// Même traitement que HeroBackgroundPhoto (voile + dégradé pour la
// lisibilité du texte posé dessus), mais avec une vidéo qui se lance et
// boucle automatiquement à l'arrivée sur la page. Coupée pour les
// personnes qui préfèrent moins d'animations (prefers-reduced-motion) :
// la première image de la vidéo (poster) reste alors affichée, fixe.
export default function HeroBackgroundVideo({
  src,
  poster,
}: {
  src: string;
  poster?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
    }
  }, []);

  return (
    <div className="hero-photo-fade absolute inset-0">
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        src={src}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />
      <div className="absolute inset-0 bg-surface/50" />
      <div className="absolute inset-0 bg-gradient-to-b from-surface/65 via-surface/35 to-surface/45" />
    </div>
  );
}
