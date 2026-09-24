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

// Distance entre le bord de l'écran et l'extrémité des bandes : le bloc
// de chaque personne (42rem) est calé d'un côté d'une zone de 72rem, la
// bande le dépasse de 3rem de l'autre côté.
const EDGE = "max(0px, calc(50% - 11rem))";

export default function Team() {
  return (
    <div id="equipe">
      <section className="px-6 pb-12 pt-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-wide text-accent">
              {pages.team.eyebrow}
            </span>
            <h1 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
              {pages.team.title}
            </h1>
            {pages.team.text && (
              <div className="mt-6 grid max-w-2xl gap-4 text-lg text-muted">
                {pages.team.text
                  .split(/\n\s*\n/)
                  .filter((paragraph) => paragraph.trim())
                  .map((paragraph, i) => (
                    <p key={i} className="whitespace-pre-line">
                      {paragraph}
                    </p>
                  ))}
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* Une bande par personne ; la photo change de côté d'une personne à
          l'autre. */}
      {team.map((member, i) => {
        const reversed = i % 2 === 1;
        return (
          <section key={member.name} className="relative px-6 py-10 sm:py-12">
            {/* Bande collée à un bord de l'écran, qui s'arrête un peu
                au-delà du contenu : à droite pour une personne, à gauche
                pour la suivante. */}
            <div
              aria-hidden="true"
              className={`team-band absolute inset-y-2 ${
                reversed ? "left-0" : "right-0"
              }`}
              style={reversed ? { right: EDGE } : { left: EDGE }}
            />
            <Reveal
              className="relative mx-auto max-w-6xl"
            >
              <div
                className={`flex flex-col gap-8 sm:max-w-2xl sm:items-center sm:gap-10 ${
                  reversed ? "sm:mr-auto sm:flex-row-reverse" : "sm:ml-auto sm:flex-row"
                }`}
            >
              <div className="dyn-photo-wrap relative aspect-[4/5] w-full shrink-0 overflow-hidden rounded-2xl sm:w-48">
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
              </div>
            </Reveal>
          </section>
        );
      })}
      <div className="pb-12" />
    </div>
  );
}
