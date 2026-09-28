import { isAuthenticated } from "@/lib/admin-auth";

// Diagnostic minimal, sans rapport avec Vercel Blob : permet de vérifier
// qu'une requête authentifiée simple aboutit, pour isoler si un envoi
// vidéo bloqué vient de l'appel à Vercel Blob ou d'un problème plus large.
export async function POST() {
  if (!(await isAuthenticated())) {
    return Response.json({ error: "Non autorisé." }, { status: 401 });
  }
  return Response.json({ ok: true });
}
