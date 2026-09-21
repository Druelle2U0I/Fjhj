import Image from "next/image";
import Link from "next/link";
import Visual from "@/components/Visual";
import { company, footerImage, legal, services } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border">
      <div className="absolute inset-0">
        <Visual src={footerImage} alt="" sizes="100vw" />
        <div className="absolute inset-0 bg-background/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/45 to-background/90" />
      </div>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <Image
          src="/brand/logo-wordmark.png"
          alt=""
          width={1200}
          height={497}
          className="w-[70%] max-w-3xl opacity-10"
        />
      </div>

      <div className="relative px-6 py-16">
        <div className="mx-auto max-w-6xl text-sm text-muted">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-base font-semibold text-foreground">
                {company.name}
              </p>
              <p className="mt-3">{company.address}</p>
              <p className="mt-1">{company.serviceArea}</p>
              <p className="mt-3">
                <a
                  href={`mailto:${company.email}`}
                  className="hover:text-accent"
                >
                  {company.email}
                </a>
              </p>
              <p>
                <a
                  href={`tel:${company.phone.replace(/\s/g, "")}`}
                  className="hover:text-accent"
                >
                  {company.phone}
                </a>
              </p>
            </div>

            <div>
              <p className="font-semibold text-foreground">Nos formations</p>
              <ul className="mt-3 space-y-2">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/formations/${service.slug}`}
                      className="hover:text-accent"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-semibold text-foreground">L&apos;organisme</p>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link href="/formations" className="hover:text-accent">
                    Toutes les formations
                  </Link>
                </li>
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
              </ul>
            </div>

            <div>
              <p className="font-semibold text-foreground">
                Zone d&apos;intervention
              </p>
              <p className="mt-3">
                Intra-entreprise et inter-entreprises partout dans les
                Hauts-de-France.
              </p>
            </div>
          </div>

          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
            <p>
              &copy; {new Date().getFullYear()} {company.name}. Tous droits
              réservés.
            </p>
            {(legal.activityDeclaration || legal.qualiopiCertificate) && (
              <p className="text-xs">
                {legal.activityDeclaration &&
                  `Déclaration d'activité n° ${legal.activityDeclaration}`}
                {legal.activityDeclaration && legal.qualiopiCertificate && " · "}
                {legal.qualiopiCertificate &&
                  `Certification Qualiopi n° ${legal.qualiopiCertificate}`}
              </p>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
