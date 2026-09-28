import Image from "next/image";
import Reveal from "@/components/Reveal";
import StoryRow, { StoryLink, StoryText, StoryTitle } from "@/components/StoryRow";
import { company, home, pages } from "@/lib/data";
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
  const approach = pages.centre.approachText.split(/\n\s*\n/)[0]?.trim();

  return (
    <div id="a-propos">
      {/* Présentation au format « histoire » : intro centrée puis rangées
          photo / texte (la suite est dans le bloc Financement). */}
      <section className="px-6 pb-4 pt-12 sm:pt-16">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mx-auto max-w-lg text-center">
            {section.eyebrow && (
              <p className="eyebrow text-muted">{section.eyebrow}</p>
            )}
            <h2 className="mt-3 text-2xl font-extrabold uppercase leading-tight tracking-tight sm:text-3xl">
              {section.title.replace(/(\p{L})-(?=\p{L})/gu, "$1\u2011")}
            </h2>
            <p className="mt-4 whitespace-pre-line text-[15px] leading-relaxed text-foreground/85">
              {section.text || company.about}
            </p>
          </Reveal>

          <div className="mt-10">
            <StoryRow
              image={home.aboutImage}
              imageAlt={home.aboutImageAlt || company.name}
              imageBg="#090329"
              side="left"
              align="right"
            >
              <StoryTitle>{pages.centre.approachTitle}</StoryTitle>
              {approach && <StoryText>{approach}</StoryText>}
              <StoryLink href="/centre">Le centre</StoryLink>
            </StoryRow>
          </div>
        </div>
      </section>
      {home.founderQuote?.text && (
        <div className="px-6 pb-14 sm:pb-24">
          <div className="mx-auto max-w-6xl">
            {
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
                        alt={
                          home.founderQuote.photoAlt || home.founderQuote.name
                        }
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
                    <p className="text-sm text-muted">
                      {home.founderQuote.role}
                    </p>
                  </div>
                </div>
              </Reveal>
            }
          </div>
        </div>
      )}
    </div>
  );
}
