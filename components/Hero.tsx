import Link from "next/link";
import HeroBackgroundPhoto from "@/components/HeroBackgroundPhoto";
import HeroBackgroundVideo from "@/components/HeroBackgroundVideo";
import HeroCarousel from "@/components/HeroCarousel";
import { company, home, pages } from "@/lib/data";

export default function Hero() {
  const hasVideo = Boolean(home.heroVideo);
  const hasPhoto = hasVideo || Boolean(home.heroBackgroundImage);

  return (
    <section
      id="top"
      className="relative -mt-[86px] overflow-hidden px-6 pt-[126px] pb-24 sm:-mt-[94px] sm:pt-[154px]"
    >
      {hasVideo ? (
        <HeroBackgroundVideo src={home.heroVideo!} poster={home.heroBackgroundImage} />
      ) : (
        hasPhoto && (
          <HeroBackgroundPhoto
            src={home.heroBackgroundImage!}
            alt={home.heroBackgroundImageAlt ?? ""}
          />
        )
      )}

      <div
        className={`relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center ${
          hasPhoto ? "on-surface" : ""
        }`}
      >
        <div>
          <h1 className="max-w-xl whitespace-pre-line text-5xl font-bold tracking-tight sm:text-6xl">
            {company.tagline}
          </h1>

          <p className="mt-4 line-clamp-4 max-w-xl whitespace-pre-line text-base text-muted sm:mt-6 sm:line-clamp-none sm:text-lg">
            {company.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Link
              href="/formations"
              className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-105"
            >
              {pages.hero.primaryButton}
            </Link>
            <Link
              href="/contact"
              className="text-sm font-semibold underline underline-offset-4 transition-colors hover:text-surface-accent"
            >
              {pages.hero.secondaryButton}
            </Link>
          </div>
        </div>

        <div>
          <HeroCarousel slides={home.heroSlides} />
        </div>
      </div>
    </section>
  );
}
