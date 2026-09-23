"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { HeroSlide } from "@/lib/data";

export default function HeroCarousel({ slides: allSlides }: { slides: HeroSlide[] }) {
  const slides = allSlides.filter((slide) => slide.image);
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const goTo = useCallback((index: number) => {
    const node = track.current;
    if (!node) return;
    const clamped = (index + slides.length) % slides.length;
    node.scrollTo({ left: node.clientWidth * clamped, behavior: "smooth" });
  }, [slides.length]);

  useEffect(() => {
    const node = track.current;
    if (!node) return;
    const onScroll = () => {
      setActive(Math.round(node.scrollLeft / node.clientWidth));
    };
    node.addEventListener("scroll", onScroll, { passive: true });
    return () => node.removeEventListener("scroll", onScroll);
  }, []);

  if (slides.length === 0) return null;

  return (
    <div className="relative">
      <div
        ref={track}
        className="flex aspect-[4/5] snap-x snap-mandatory overflow-x-auto overflow-y-hidden rounded-3xl border border-border shadow-2xl [scrollbar-width:none] lg:aspect-[3/4] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, i) => {
          const content = (
            <>
              <Image
                src={slide.image}
                alt={slide.alt ?? ""}
                fill
                priority={i === 0}
                sizes="(min-width: 1024px) 40vw, 90vw"
                className={`object-cover ${
                  slide.link ? "transition-transform duration-500 group-hover:scale-105" : ""
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent" />
              {(slide.title || slide.text) && (
                <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-background/70 p-4 backdrop-blur transition-colors group-hover:border-accent/50">
                  {slide.title && (
                    <p className="text-sm font-medium text-foreground">
                      {slide.title}
                    </p>
                  )}
                  {slide.text && (
                    <p className="mt-1 text-xs text-muted">{slide.text}</p>
                  )}
                  {slide.link && (
                    <p className="mt-2 text-xs font-semibold text-accent">
                      {slide.link.split("/").filter(Boolean).length === 2
                        ? "Voir les formations"
                        : "Voir la formation"}{" "}
                      <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </p>
                  )}
                </div>
              )}
            </>
          );

          return slide.link ? (
            <Link
              key={slide.image + i}
              href={slide.link}
              className="group relative h-full w-full shrink-0 snap-center"
            >
              {content}
            </Link>
          ) : (
            <div
              key={slide.image + i}
              className="relative h-full w-full shrink-0 snap-center"
            >
              {content}
            </div>
          );
        })}
      </div>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Photo précédente"
            onClick={() => goTo(active - 1)}
            className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-background/70 text-lg backdrop-blur transition-colors hover:border-accent hover:text-accent"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Photo suivante"
            onClick={() => goTo(active + 1)}
            className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-background/70 text-lg backdrop-blur transition-colors hover:border-accent hover:text-accent"
          >
            ›
          </button>

          <div className="mt-4 flex justify-center gap-2">
            {slides.map((slide, i) => (
              <button
                key={slide.image + i}
                type="button"
                aria-label={`Aller à la photo ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === active ? "w-6 bg-accent" : "w-2.5 bg-border"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
