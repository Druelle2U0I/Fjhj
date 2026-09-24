"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import BackgroundTexture from "@/components/BackgroundTexture";

export default function SiteChrome({
  header,
  footer,
  children,
}: {
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}) {
  const isAdmin = usePathname().startsWith("/admin");

  if (isAdmin) return <main className="flex-1">{children}</main>;

  return (
    <>
      <BackgroundTexture />
      {header}
      <main className="flex-1">{children}</main>
      {footer}
    </>
  );
}
