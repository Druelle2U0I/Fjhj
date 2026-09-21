import Reveal from "@/components/Reveal";
import { team } from "@/lib/data";

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
            Notre équipe
          </span>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Une équipe à votre écoute
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 sm:max-w-2xl">
          {team.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.08}>
              <div className="dyn-card h-full rounded-2xl border border-border bg-surface p-6 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-soft text-lg font-semibold text-accent">
                  {initials(member.name)}
                </div>
                <h3 className="mt-4 font-semibold">{member.name}</h3>
                <p className="mt-1 text-sm font-medium text-accent">
                  {member.role}
                </p>
                <p className="mt-2 whitespace-pre-line text-sm text-muted">{member.bio}</p>
                <a
                  href={`mailto:${member.email}`}
                  className="mt-3 inline-block text-sm text-muted hover:text-accent"
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
