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
    <section id="equipe" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">
            {pages.team.eyebrow}
          </span>
          <h1 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            {pages.team.title}
          </h1>
        </Reveal>

        {/* Pas de liste alignée sur une seule colonne : chaque membre
            alterne de côté, la photo la plus proche du centre, comme si
            l'équipe se faisait face d'un profil à l'autre. */}
        <div className="mt-16 grid gap-16 sm:gap-20">
          {team.map((member, i) => {
            const reversed = i % 2 === 1;
            return (
              <Reveal
                key={member.name}
                delay={i * 0.08}
                className={`flex flex-col gap-8 sm:max-w-3xl sm:items-center sm:gap-10 ${
                  reversed ? "sm:mr-auto sm:flex-row-reverse" : "sm:ml-auto sm:flex-row"
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
                    <div className="flex h-full w-full items-center justify-center bg-accent-soft text-5xl font-semibold text-accent">
                      {initials(member.name)}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-2xl font-semibold">{member.name}</h3>
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
