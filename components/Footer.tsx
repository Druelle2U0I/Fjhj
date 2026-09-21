import { company, legal } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto max-w-6xl text-sm text-muted">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {company.name}. Tous droits
            réservés.
          </p>
          <p>{company.address}</p>
        </div>

        {(legal.activityDeclaration || legal.qualiopiCertificate) && (
          <p className="mt-4 text-center text-xs sm:text-left">
            {legal.activityDeclaration &&
              `Déclaration d'activité n° ${legal.activityDeclaration}`}
            {legal.activityDeclaration && legal.qualiopiCertificate && " · "}
            {legal.qualiopiCertificate &&
              `Certification Qualiopi n° ${legal.qualiopiCertificate}`}
          </p>
        )}
      </div>
    </footer>
  );
}
