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

  return (
    <div style={{ display: "contents", ...pageThemeStyle(overrides) } as CSSProperties}>
      {children}
    </div>
  );
}
