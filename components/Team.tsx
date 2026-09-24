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
          </Reveal>
        </div>
      </section>

      {/* Une bande par personne, en alternance (bande de couleur / fond
          normal) ; la photo change de côté d'une personne à l'autre. */}
      {team.map((member, i) => {
        const reversed = i % 2 === 1;
        return (
          <section
            key={member.name}
            className={`px-6 py-16 sm:py-20 ${i % 2 === 0 ? "page-band" : ""}`}
          >
            <Reveal
              className={`mx-auto flex max-w-4xl flex-col gap-8 sm:items-center sm:gap-12 ${
                reversed ? "sm:flex-row-reverse" : "sm:flex-row"
              }`}
            >
              <div className="dyn-photo-wrap relative aspect-[4/5] w-full shrink-0 overflow-hidden rounded-3xl sm:w-72">
                {member.photo ? (
                  <Visual
                    src={member.photo}
                    alt={member.photoAlt || member.name}
                    sizes="(min-width: 640px) 288px, 100vw"
                    className="dyn-photo"
                  />
                ) : (
                  <div className="dyn-photo flex h-full w-full items-center justify-center bg-accent-soft text-5xl font-semibold text-accent">
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
          </section>
        );
      })}
      <div className="pb-12" />
    </div>
  );
}
