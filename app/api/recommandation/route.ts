import { fetchRecommendation, formatRecommendation } from "@/lib/recommendation";

// Vérification de la liaison avec le fichier Excel : indique si la valeur
// est bien lue (sans exposer de secret ni de donnée personnelle).
export const revalidate = 300;

export async function GET() {
  const configured = Boolean(
    process.env.MS_TENANT_ID && process.env.MS_CLIENT_ID && process.env.MS_CLIENT_SECRET,
  );
  if (!configured) {
    return Response.json({ identifiants_renseignes: false, lecture_excel_ok: false, valeur: null });
  }
  const reco = await fetchRecommendation();
  return Response.json({
    identifiants_renseignes: true,
    lecture_excel_ok: reco.ok,
    valeur: reco.ok ? formatRecommendation(reco.percent) : null,
    erreur: reco.ok ? null : reco.reason,
  });
}
