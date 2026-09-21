"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { company } from "@/lib/data";

const links = [
  { href: "/formations", label: "Formations" },
  { href: "/financement", label: "Financement" },
  { href: "/equipe", label: "Équipe" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled || pathname !== "/"
          ? "bg-background/90 backdrop-blur border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label={company.name}
        >
          <span className="flex flex-col leading-none font-display">
            <span className="text-xl font-bold tracking-tight sm:text-2xl">
              ENMA
            </span>
            <span className="mt-0.5 text-[0.6rem] font-semibold tracking-[0.25em] text-muted sm:text-xs">
              FORMATION
            </span>
          </span>
          <Image
            src="/brand/logo-icon.png"
            alt=""
            width={40}
            height={40}
            priority
          />
        </Link>
        <nav className="hidden gap-8 text-sm font-medium text-muted md:flex">
          {links.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors hover:text-foreground ${
                  active ? "text-foreground" : ""
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <Link
          href="/contact"
          className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground transition-transform hover:scale-105"
        >
          Nous contacter
        </Link>
      </div>
    </header>
  );
}
