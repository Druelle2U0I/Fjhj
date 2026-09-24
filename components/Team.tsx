import Reveal from "@/components/Reveal";
import StatsPanel from "@/components/StatsPanel";
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
    <div id="equipe">
      <section className="px-6 pb-12 pt-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <span className="text-sm font-semibold text-muted">
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
          </div>

          <StatsPanel />
        </div>
      </section>

      {/* Les membres côte à côte : le zigzag plein écran laissait beaucoup
          de vide dès qu'il n'y a que 2 personnes dans l'équipe. */}
      <section className="px-6 pb-16 pt-4">
        <div className="mx-auto grid max-w-5xl gap-14 sm:grid-cols-2 sm:gap-10">
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
                    sizes="220px"
                    className="dyn-photo"
                  />
                ) : (
                  <div className="dyn-photo flex h-full w-full items-center justify-center bg-accent-soft text-4xl font-semibold text-accent">
                    {initials(member.name)}
                  </div>
                )}
              </div>
              <div>
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
      </section>
    </div>
  );
}
