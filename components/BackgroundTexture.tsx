// Fond de page : quelques halos de lumière flous aux couleurs de la
// marque, complètement statiques (ni animation, ni mouvement au scroll)
// pour ne jamais interférer avec la lisibilité du texte.
export default function BackgroundTexture() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="hero-aurora__veil hero-aurora__veil--static" />
      <div className="hero-aurora__veil hero-aurora__veil--alt hero-aurora__veil--static" />
    </div>
  );
}
