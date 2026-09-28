import Link from "next/link";
import HeroBackgroundPhoto from "@/components/HeroBackgroundPhoto";
import HeroBackgroundVideo from "@/components/HeroBackgroundVideo";
import { company, home, legal, pages } from "@/lib/data";

export default function Hero() {
  const hasVideo = Boolean(home.heroVideo);
  const hasPhoto = hasVideo || Boolean(home.heroBackgroundImage);

  return (
    <section
      id="top"
      className="relative -mt-[86px] overflow-hidden bg-surface px-6 pt-[126px] pb-24 sm:-mt-[98px] sm:pt-[154px]"
    >
      {hasVideo ? (
        <HeroBackgroundVideo
          src={home.heroVideo!}
          poster={home.heroBackgroundImage || home.heroSlides.find((s) => s.image)?.image}
          posterAlt={home.heroBackgroundImageAlt}
        />
      ) : (
        hasPhoto && (
          <HeroBackgroundPhoto
            src={home.heroBackgroundImage!}
            alt={home.heroBackgroundImageAlt ?? ""}
          />
        )
      )}

      <div className={`relative mx-auto max-w-6xl ${hasPhoto ? "on-surface" : ""}`}>
        <p className="mb-5 text-xs uppercase tracking-[0.22em] opacity-80">
          Organisme de formation · {legal.activityRegion || "Hauts-de-France"}
        </p>
        <h1 className="max-w-3xl whitespace-pre-line text-[2.3rem] font-bold leading-[1.05] tracking-tight sm:text-5xl">
          {company.tagline}
        </h1>

        <p className="mt-4 line-clamp-4 max-w-xl whitespace-pre-line text-base text-muted sm:mt-6 sm:line-clamp-none sm:text-lg">
          {company.description}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/formations"
            className="rounded-sm border border-accent bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-105"
          >
            {pages.hero.primaryButton}
          </Link>
          <Link
            href="/contact"
            className="rounded-sm border border-current/40 px-6 py-3 text-sm font-semibold transition-colors hover:border-current hover:bg-white/10"
          >
            {pages.hero.secondaryButton}
          </Link>
        </div>

        {/* Bandeau d'informations en bas du bandeau d'accueil */}
        <ul className="mt-14 flex flex-wrap gap-x-8 gap-y-2 border-t border-current/20 pt-5 text-xs uppercase tracking-[0.18em] opacity-80">
          {legal.qualiopiCertificate && <li>Certifié Qualiopi n° {legal.qualiopiCertificate}</li>}
          <li>Prise en charge OPCO</li>
          <li>Nord · Pas-de-Calais · Aisne · Somme · Oise</li>
        </ul>
      </div>
    </section>
  );
}
