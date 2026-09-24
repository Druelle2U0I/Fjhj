import Reveal from "@/components/Reveal";
import Visual from "@/components/Visual";
import { pages, team } from "@/lib/data";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Team() {
  const paragraphs = (pages.team.text ?? "")
    .split(/\n\s*\n/)
    .filter((paragraph) => paragraph.trim());

  return (
    <section id="equipe" className="px-6 pb-20 pt-24 sm:pb-24">
      <div className="mx-auto max-w-6xl">
        {/* Titre à gauche, présentation à droite */}
        <Reveal className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wide text-accent">
              {pages.team.eyebrow}
            </span>
            <h1 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
              {pages.team.title}
            </h1>
          </div>
          {paragraphs.length > 0 && (
            <div className="grid gap-4 text-muted sm:text-lg">
              {paragraphs.map((paragraph, i) => (
                <p key={i} className="whitespace-pre-line">
                  {paragraph}
                </p>
              ))}
            </div>
          )}
        </Reveal>

        {/* Membres côte à côte : photo en haut, texte dessous */}
        <div className={`mt-14 grid gap-8 sm:grid-cols-2 ${team.length >= 3 ? "lg:grid-cols-3" : ""}`}>
          {team.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.08} className="h-full">
              <article className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface">
                <div className="dyn-photo-wrap relative aspect-[4/3] overflow-hidden">
                  {member.photo ? (
                    <Visual
                      src={member.photo}
                      alt={member.photoAlt || member.name}
                      sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                      className="dyn-photo"
                    />
                  ) : (
                    <div className="dyn-photo flex h-full w-full items-center justify-center bg-accent-soft text-4xl font-semibold text-accent">
                      {initials(member.name)}
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="text-xl font-semibold">{member.name}</h2>
                  <p className="mt-1 text-sm font-medium text-accent">{member.role}</p>
                  <p className="mt-4 whitespace-pre-line text-sm text-muted">{member.bio}</p>
                  <a
                    href={`mailto:${member.email}`}
                    className="mt-auto pt-5 text-sm text-foreground hover:text-accent"
                  >
                    {member.email}
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
