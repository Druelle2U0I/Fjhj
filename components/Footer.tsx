import Link from "next/link";
import FooterCta from "@/components/FooterCta";
import { company, footerImage, legal, services } from "@/lib/data";

/**
 * Le logo est utilisé comme masque : la photo du pied de page apparaît
 * à travers la forme du logo. Sans photo, un dégradé de marque la remplace.
 */
function CutoutLogo() {
  const mask = {
    WebkitMaskImage: "url(/brand/logo-icon.png)",
    maskImage: "url(/brand/logo-icon.png)",
    WebkitMaskSize: "contain",
    maskSize: "contain",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
  } as React.CSSProperties;

  return (
    <div
      aria-hidden="true"
      className="mx-auto aspect-square w-40 bg-cover bg-center lg:w-48"
      style={{
        ...mask,
        backgroundImage: footerImage
          ? `url(${footerImage})`
          : "linear-gradient(135deg, var(--accent), var(--surface-2))",
      }}
    />
  );
}

function Column({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground">
        {title}
      </p>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}

export default function Footer() {
  const mainSectors = services.slice(0, 4);

  return (
    <>
      <FooterCta />

      <footer className="border-t border-border bg-surface px-6 py-16">
        <div className="mx-auto max-w-6xl text-sm text-muted">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto_1fr_1fr] lg:items-start lg:gap-12">
            <Column title="Formations">
              {mainSectors.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/formations/${service.slug}`}
                    className="hover:text-accent"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/formations" className="hover:text-accent">
                  Toutes les formations
                </Link>
              </li>
            </Column>

            <Column title="L'organisme">
              <li>
                <Link href="/financement" className="hover:text-accent">
                  Qualiopi &amp; financement
                </Link>
              </li>
              <li>
                <Link href="/equipe" className="hover:text-accent">
                  Notre équipe
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent">
                  Contact
                </Link>
              </li>
            </Column>

            <div className="order-first sm:col-span-2 lg:order-none lg:col-span-1 lg:px-6">
              <CutoutLogo />
            </div>

            <Column title="Nous joindre">
              <li>{company.address}</li>
              <li>
                <a
                  href={`tel:${company.phone.replace(/\s/g, "")}`}
                  className="hover:text-accent"
                >
                  {company.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${company.email}`}
                  className="hover:text-accent"
                >
                  {company.email}
                </a>
              </li>
            </Column>

            <Column title="Zone d'intervention">
              <li>{company.serviceArea}</li>
              <li>Intra-entreprise et inter-entreprises</li>
            </Column>
          </div>

          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs sm:flex-row">
            <p>
              &copy; {new Date().getFullYear()} {company.name}. Tous droits
              réservés.
            </p>
            {(legal.activityDeclaration || legal.qualiopiCertificate) && (
              <p>
                {legal.activityDeclaration &&
                  `Déclaration d'activité n° ${legal.activityDeclaration}`}
                {legal.activityDeclaration && legal.qualiopiCertificate && " · "}
                {legal.qualiopiCertificate &&
                  `Certification Qualiopi n° ${legal.qualiopiCertificate}`}
              </p>
            )}
          </div>
        </div>
      </footer>
    </>
  );
}
