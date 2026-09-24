"use client";

import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import NavProgress from "@/components/NavProgress";

export default function SiteChrome({
  header,
  footer,
  children,
}: {
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  // À chaque changement de page, on repart tout en haut, instantanément
  // (sauf lien vers une ancre, ex. « Voir le catalogue »). Next ne le fait
  // pas toujours à cause de l'en-tête collant et du défilement doux.
  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  if (isAdmin) return <main className="flex-1">{children}</main>;

  return (
    <>
      <NavProgress />
      {header}
      <main className="flex-1">{children}</main>
      {footer}
    </>
  );
}
