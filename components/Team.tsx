import Reveal from "@/components/Reveal";
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

        <div className="mt-14 max-w-3xl divide-y divide-border border-t border-border">
          {team.map((member, i) => (
            <Reveal
              key={member.name}
              delay={i * 0.08}
              className="grid grid-cols-[auto_1fr] items-start gap-6 py-10 first:pt-0 sm:gap-10"
            >
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-accent-soft text-2xl font-semibold text-accent">
                {initials(member.name)}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="mt-1 text-sm font-medium text-accent">
                  {member.role}
                </p>
                <p className="mt-3 max-w-xl whitespace-pre-line text-muted">{member.bio}</p>
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
