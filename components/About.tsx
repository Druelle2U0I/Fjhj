import Image from "next/image";
import PillarsGrid from "@/components/PillarsGrid";
import Reveal from "@/components/Reveal";
import SplitPhotoBand from "@/components/SplitPhotoBand";
import { company, home } from "@/lib/data";
import type { HomeSection } from "@/lib/data";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function About({ section }: { section: HomeSection }) {
  const hasImage = Boolean(home.aboutImage);

  const title = (
    <>
      {section.eyebrow && (
        <span className="text-sm font-semibold text-muted">{section.eyebrow}</span>
      )}
      <h2 className="mt-3 max-w-2xl whitespace-pre-line text-4xl font-bold tracking-tight sm:text-5xl">
        {section.title}
      </h2>
      <p className="mt-5 max-w-2xl whitespace-pre-line text-muted">
        {section.text || company.about}
      </p>
    </>
  );

  return (
    <div id="a-propos">
      {hasImage ? (
        <SplitPhotoBand image={home.aboutImage!} imageAlt={home.aboutImageAlt}>
          {title}
        </SplitPhotoBand>
      ) : (
        <section className="px-6 py-14 sm:py-24">
          <Reveal className="mx-auto max-w-2xl text-center">{title}</Reveal>
        </section>
      )}

      <div className="px-6 pb-14 sm:pb-24">
        <div className="mx-auto max-w-6xl">
          {home.founderQuote?.text && (
            <Reveal delay={0.15} className="mx-auto max-w-3xl text-center">
              <svg
                aria-hidden="true"
                viewBox="0 0 32 24"
                className="mx-auto h-9 w-11 fill-accent/50"
              >
                <path d="M0 24V14.4Q0 7.2 3.6 3.6 7.2 0 14.4 0v4.8Q9.6 4.8 7.2 7.2 4.8 9.6 4.8 14.4H12V24ZM19.2 24V14.4Q19.2 7.2 22.8 3.6 26.4 0 33.6 0v4.8Q28.8 4.8 26.4 7.2 24 9.6 24 14.4h7.2V24Z" />
              </svg>
              <p className="mt-5 whitespace-pre-line text-lg font-medium leading-relaxed text-foreground sm:text-xl">
                {home.founderQuote.text}
              </p>
              <div className="mt-6 flex items-center justify-center gap-4">
                {home.founderQuote.photo ? (
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-border">
                    <Image
                      src={home.founderQuote.photo}
                      alt={home.founderQuote.photoAlt || home.founderQuote.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-border bg-surface-2 text-sm font-semibold text-surface-accent">
                    {initials(home.founderQuote.name)}
                  </div>
                )}
                <div className="text-left">
                  <p className="font-semibold">{home.founderQuote.name}</p>
                  <p className="text-sm text-muted">{home.founderQuote.role}</p>
                </div>
              </div>
            </Reveal>
          )}

          <PillarsGrid className="mt-10 border-t border-border pt-8 sm:mt-16 sm:pt-10" />
        </div>
      </div>
    </div>
  );
}
