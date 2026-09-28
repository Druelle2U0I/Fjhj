"use client";

import { useEffect, useRef, useState } from "react";

// Même traitement que HeroBackgroundPhoto (voile + dégradé pour la
// lisibilité du texte posé dessus), mais avec une vidéo qui se lance et
// boucle automatiquement à l'arrivée sur la page. Coupée pour les
// personnes qui préfèrent moins d'animations (prefers-reduced-motion) :
// la première image de la vidéo (poster) reste alors affichée, fixe.
export default function HeroBackgroundVideo({
  src,
  poster,
  posterAlt,
}: {
  src: string;
  poster?: string;
  posterAlt?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
    }
  }, []);

  return (
    <div className="hero-photo-fade absolute inset-0">
      {/* Image affichée tout de suite, pendant que la vidéo se charge. */}
      {poster && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={poster} alt={posterAlt ?? ""} className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
      )}
      <video
        ref={ref}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          playing || !poster ? "opacity-100" : "opacity-0"
        }`}
        onPlaying={() => setPlaying(true)}
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
