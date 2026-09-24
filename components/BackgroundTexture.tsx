// Remplace l'aurore animée (halos flous, en mouvement) par un fond fixe :
// une diagonale épaisse sépare deux teintes du thème, pas de fond bleu
// uniforme, aucune animation.
export default function BackgroundTexture() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        background:
          "linear-gradient(115deg, var(--background) 0%, var(--background) calc(58% - 4px), var(--accent) calc(58% - 4px), var(--accent) calc(58% + 4px), var(--surface) calc(58% + 4px), var(--surface) 100%)",
      }}
    />
  );
}
