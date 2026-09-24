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
        <Reveal>
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">
            {pages.team.eyebrow}
          </span>
          <h1 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            {pages.team.title}
          </h1>
          {paragraphs.length > 0 && (
            <div className="mt-6 grid max-w-2xl gap-4 text-lg text-muted">
              {paragraphs.map((paragraph, i) => (
                <p key={i} className="whitespace-pre-line">
                  {paragraph}
                </p>
              ))}
            </div>
          )}
        </Reveal>

        {/* Membres côte à côte, chacun avec sa photo et son texte au trait
            d'accent, comme la présentation d'origine. */}
        <div className="mt-16 grid gap-14 lg:grid-cols-2 lg:gap-10">
          {team.map((member, i) => (
            <Reveal
              key={member.name}
              delay={i * 0.08}
              className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8"
            >
              <div className="dyn-photo-wrap relative aspect-[4/5] w-full shrink-0 overflow-hidden rounded-lg sm:w-48">
                {member.photo ? (
                  <Visual
                    src={member.photo}
                    alt={member.photoAlt || member.name}
                    sizes="(min-width: 640px) 192px, 100vw"
                    className="dyn-photo"
                  />
                ) : (
                  <div className="dyn-photo flex h-full w-full items-center justify-center bg-accent-soft text-4xl font-semibold text-accent">
                    {initials(member.name)}
                  </div>
                )}
              </div>
              <div className="border-l-4 border-accent pl-6">
                <h2 className="text-2xl font-semibold">{member.name}</h2>
                <p className="mt-1 font-medium text-accent">{member.role}</p>
                <p className="mt-4 max-w-md whitespace-pre-line text-muted">{member.bio}</p>
                <a
                  href={`mailto:${member.email}`}
                  className="mt-4 inline-block text-sm text-muted hover:text-accent"
                >
                  {member.email}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
