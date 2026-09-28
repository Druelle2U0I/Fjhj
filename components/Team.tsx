import HeroBackgroundPhoto from "@/components/HeroBackgroundPhoto";
import StoryRow, { StoryLink, StoryText, StoryTitle } from "@/components/StoryRow";
import { pages, team } from "@/lib/data";

export default function Team() {
  const paragraphs = (pages.team.text ?? "")
    .split(/\n\s*\n/)
    .filter((paragraph) => paragraph.trim());

  return (
    <div id="equipe">
      <section className="page-hero relative -mt-[86px] overflow-hidden px-6 pb-12 pt-[112px] sm:-mt-[94px] sm:pt-[148px]">
        {pages.team.heroImage && (
          <HeroBackgroundPhoto src={pages.team.heroImage} alt={pages.team.title} />
        )}
        <div
          className={`relative mx-auto max-w-6xl ${
            pages.team.heroImage ? "on-surface" : ""
          }`}
        >
          <div>
            <span className="eyebrow block text-muted">
              {pages.team.eyebrow}
            </span>
            <h1 className="mt-3 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
              {pages.team.title}
            </h1>
            {paragraphs.length > 0 && (
              <div className="page-intro mt-6 grid max-w-2xl gap-4 text-lg text-muted">
                {paragraphs.map((paragraph, i) => (
                  <p key={i} className="whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Les membres en rangées photo / texte, comme À propos et
          Financement sur l'accueil : grande photo portrait, texte à côté,
          côté alterné d'une personne à l'autre. */}
      <section className="px-6 pb-12 pt-10 sm:pb-16">
        <div className="mx-auto grid max-w-[780px] gap-10 sm:gap-6">
          {team.map((member, i) => (
            <StoryRow
              key={member.name}
              image={member.photo || undefined}
              imageAlt={member.photoAlt || member.name}
              side={i % 2 === 0 ? "left" : "right"}
              align="left"
            >
              <p className="eyebrow text-muted">{member.role}</p>
              <div className="mt-3">
                <StoryTitle>{member.name.replace(/(\p{L})-(?=\p{L})/gu, "$1\u2011")}</StoryTitle>
              </div>
              {member.bio && <StoryText>{member.bio}</StoryText>}
              {member.email && <StoryLink href={`mailto:${member.email}`}>{member.email}</StoryLink>}
            </StoryRow>
          ))}
        </div>
      </section>
    </div>
  );
}
