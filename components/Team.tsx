import Reveal from "@/components/Reveal";
import { team } from "@/lib/data";

function initials(source: string) {
  return source
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
            Une équipe de formateurs expérimentés, pédagogues et
            opérationnels
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, i) => (
            <Reveal key={member.role} delay={(i % 3) * 0.08}>
              <div className="h-full rounded-2xl border border-border bg-surface p-6 text-center transition-shadow hover:shadow-lg">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-soft text-lg font-semibold text-accent">
                  {initials(member.name ?? member.role)}
                </div>
                {member.name && (
                  <h3 className="mt-4 font-semibold">{member.name}</h3>
                )}
                <p
                  className={`text-sm font-medium text-accent ${
                    member.name ? "mt-1" : "mt-4"
                  }`}
                >
                  {member.role}
                </p>
                <p className="mt-2 text-sm text-muted">{member.bio}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
