import { company } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted sm:flex-row">
        <p>
          &copy; {new Date().getFullYear()} {company.name}. Tous droits
          réservés.
        </p>
        <p>{company.address}</p>
      </div>
    </footer>
  );
}
