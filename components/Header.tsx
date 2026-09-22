"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { company } from "@/lib/data";

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

  const linkClass = (href: string) =>
    `transition-colors hover:text-foreground ${
      pathname.startsWith(href) ? "text-foreground" : "text-muted"
    }`;

  return (
    <header className="sticky top-0 z-50 p-3 sm:p-4">
      <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-background/70 shadow-lg backdrop-blur-xl sm:rounded-full">
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
            {leftLinks.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass(link.href)}>
                {link.label}
              </Link>
            ))}
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
              className="rounded-full bg-accent px-4 py-2 text-xs font-semibold text-accent-foreground transition-transform hover:scale-105 sm:px-5 sm:text-sm"
            >
              Devis
            </Link>
          </div>
        </div>

        {open && (
          <nav className="grid gap-1 border-t border-white/10 px-4 py-3 text-sm md:hidden">
            {[...leftLinks, ...rightLinks].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-3 py-2.5 ${linkClass(link.href)}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
