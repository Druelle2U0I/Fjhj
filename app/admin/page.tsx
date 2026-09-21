import type { Metadata } from "next";
import site from "@/content/site.json";
import type { SiteContent } from "@/lib/data";
import { adminPassword, isAuthenticated } from "@/lib/admin-auth";
import AdminApp from "@/components/admin/AdminApp";
import LoginForm from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Administration",
  robots: { index: false, follow: false },
};

// Le contrôle d'accès doit s'exécuter à chaque requête, jamais au build.
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!adminPassword()) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="max-w-md rounded-3xl border border-border bg-surface p-8">
          <h1 className="text-lg font-semibold">Administration non configurée</h1>
          <p className="mt-3 text-sm text-muted">
            La variable d&apos;environnement <code>ADMIN_PASSWORD</code> doit
            être définie sur le serveur pour activer cet espace.
          </p>
        </div>
      </div>
    );
  }

  if (!(await isAuthenticated())) {
    return <LoginForm />;
  }

  return <AdminApp initial={site as SiteContent} />;
}
