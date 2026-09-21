import Link from "next/link";
import { company, legal, services } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-14">
      <div className="mx-auto max-w-6xl text-sm text-muted">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-base font-semibold text-foreground">
              {company.name}
            </p>
            <p className="mt-3">{company.address}</p>
            <p className="mt-1">{company.serviceArea}</p>
            <p className="mt-3">
              <a href={`mailto:${company.email}`} className="hover:text-accent">
                {company.email}
              </a>
            </p>
            <p>{company.phone}</p>
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
            <p className="font-semibold text-foreground">Zone d&apos;intervention</p>
            <p className="mt-3">
              Intra-entreprise et inter-entreprises partout dans les
              Hauts-de-France.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
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
    </footer>
  );
}
