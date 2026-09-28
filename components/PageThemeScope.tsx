import type { CSSProperties, ReactNode } from "react";
import { pageThemeStyle, type PageColorOverride } from "@/lib/data";

// Applique les couleurs propres à une page (réglées dans l'admin, page
// par page) par-dessus le thème global, sans ajouter de boîte dans la
// mise en page (display: contents) : les variables CSS se transmettent
// simplement à tout le contenu de la page en dessous.
export default function PageThemeScope({
  overrides,
  children,
}: {
  overrides?: PageColorOverride;
  children: ReactNode;
}) {
  if (!overrides || Object.values(overrides).every((value) => !value)) {
    return <>{children}</>;
  }

  // Fond propre à la page : il faut une vraie boîte pour le peindre
  // (sinon le fond du site reste visible derrière un texte prévu pour ce
  // fond). Sans fond propre, aucune boîte n'est ajoutée.
  const style = pageThemeStyle(overrides);
  if (overrides.background) {
    return (
      <div style={{ ...style, background: "var(--background)", color: "var(--foreground)" } as CSSProperties}>
        {children}
      </div>
    );
  }

  return <div style={{ display: "contents", ...style } as CSSProperties}>{children}</div>;
}
