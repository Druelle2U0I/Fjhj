"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { company, services } from "@/lib/data";

const trainingCount = services.reduce((n, s) => n + s.trainings.length, 0);

const leftLinks = [
  { href: "/financement", label: "Financement" },
  { href: "/formations", label: "Catalogue" },
  { href: "/centre", label: "Le centre" },
];

const rightLinks = [
  { href: "/equipe", label: "Équipe" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [catalogueOpen, setCatalogueOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Petit délai à la fermeture : la souris peut passer du lien au menu
  // sans qu'il se referme en chemin.
  const openCatalogue = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setCatalogueOpen(true);
  };
  const closeCatalogue = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setCatalogueOpen(false), 150);
  };

  const linkClass = (href: string) =>
    `transition-colors hover:text-foreground ${
      pathname.startsWith(href) ? "text-foreground" : "text-muted"
    }`;

  return (
    <header className="sticky top-0 z-50 p-3 sm:p-4">
      <div className="mx-auto max-w-6xl rounded-lg border border-white/10 bg-surface/70 shadow-lg backdrop-blur-xl">
        <div className="relative flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
          {/* Le logo reste toujours au centre exact de la barre, quel que
              soit le poids des groupes de liens de chaque côté. */}
          <Link
            href="/"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            aria-label={company.name}
          >
            <Image
              src="/brand/logo-wordmark.png"
              alt={company.name}
              width={1200}
              height={497}
              className="h-9 w-auto sm:h-11"
              priority
            />
          </Link>

          <nav className="z-10 hidden items-center gap-8 text-sm font-medium md:flex">
            {leftLinks.map((link) =>
              link.href === "/formations" ? (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={openCatalogue}
                  onMouseLeave={closeCatalogue}
                  onFocus={openCatalogue}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget)) closeCatalogue();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") setCatalogueOpen(false);
                  }}
                >
                  <Link
                    href={link.href}
                    aria-haspopup="true"
                    aria-expanded={catalogueOpen}
                    className={`inline-flex items-center gap-1 ${linkClass(link.href)}`}
                  >
                    {link.label}
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 12 12"
                      className={`h-3 w-3 transition-transform duration-300 ${catalogueOpen ? "rotate-180" : ""}`}
                    >
                      <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>

                  {/* Le padding du haut sert de pont invisible entre le lien
                      et le panneau, pour que la souris ne le referme pas. */}
                  <div
                    className={`absolute left-1/2 top-full w-[22rem] -translate-x-1/2 pt-4 transition-all duration-300 ease-out ${
                      catalogueOpen
                        ? "visible translate-y-0 opacity-100"
                        : "invisible -translate-y-1 opacity-0"
                    }`}
                  >
                    {/* Un clic sur un lien du panneau le referme. */}
                    <div
                      onClick={() => setCatalogueOpen(false)}
                      className="overflow-hidden rounded-lg border border-white/10 bg-background p-2 shadow-2xl"
                    >
                      <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-muted">
                        Nos domaines
                      </p>
                      <ul>
                        {services.map((service) => (
                          <li key={service.slug}>
                            <Link
                              href={`/formations/${service.slug}`}
                              className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-surface-2 hover:text-accent ${
                                pathname.startsWith(`/formations/${service.slug}`)
                                  ? "text-foreground"
                                  : "text-muted"
                              }`}
                            >
                              {service.title}
                              <span className="shrink-0 text-xs text-muted">
                                {service.trainings.length}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-2 grid gap-1 border-t border-white/10 pt-2">
                        <Link
                          href="/formations/toutes"
                          className="flex items-center justify-between rounded-lg px-3 py-2 font-semibold text-foreground transition-colors hover:bg-surface-2 hover:text-accent"
                        >
                          Toutes les formations ({trainingCount})
                          <span aria-hidden="true">→</span>
                        </Link>
                        <Link
                          href="/formations"
                          className="rounded-lg px-3 py-2 text-muted transition-colors hover:bg-surface-2 hover:text-accent"
                        >
                          Vue par domaine
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link key={link.href} href={link.href} className={linkClass(link.href)}>
                  {link.label}
                </Link>
              ),
            )}
          </nav>

          <button
            type="button"
            aria-label="Ouvrir le menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-muted transition-colors hover:text-foreground md:hidden"
          >
            <span className="grid gap-1">
              <span className="block h-0.5 w-4 bg-current" />
              <span className="block h-0.5 w-4 bg-current" />
            </span>
          </button>

          <div className="z-10 ml-auto flex items-center gap-8 text-sm font-medium">
            <nav className="hidden items-center gap-8 md:flex">
              {rightLinks.map((link) => (
                <Link key={link.href} href={link.href} className={linkClass(link.href)}>
                  {link.label}
                </Link>
              ))}
            </nav>
            <Link
              href="/contact"
              className="rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-accent-foreground transition-transform hover:scale-105 sm:px-5 sm:text-sm"
            >
              Devis
            </Link>
          </div>
        </div>

        {open && (
          <nav className="grid gap-1 border-t border-white/10 px-4 py-3 text-sm md:hidden">
            {[...leftLinks, ...rightLinks].map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-3 py-2.5 ${linkClass(link.href)}`}
                >
                  {link.label}
                </Link>
                {link.href === "/formations" && (
                  <div className="mb-1 ml-3 grid gap-0.5 border-l border-white/10 pl-3">
                    {services.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/formations/${service.slug}`}
                        onClick={() => setOpen(false)}
                        className="rounded-lg px-3 py-1.5 text-muted hover:text-foreground"
                      >
                        {service.title}
                      </Link>
                    ))}
                    <Link
                      href="/formations/toutes"
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-3 py-1.5 font-semibold text-foreground"
                    >
                      Toutes les formations ({trainingCount})
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
