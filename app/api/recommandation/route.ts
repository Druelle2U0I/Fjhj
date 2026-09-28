import { fetchRecommendation } from "@/lib/recommendation";

// Vérification de la liaison avec le fichier Excel : indique si la valeur
// est bien lue (sans exposer de secret ni de donnée personnelle).
export const revalidate = 3600;

export async function GET() {
  const configured = Boolean(
    process.env.MS_TENANT_ID && process.env.MS_CLIENT_ID && process.env.MS_CLIENT_SECRET,
  );
  const reco = configured ? await fetchRecommendation() : null;
  return Response.json({
    identifiants_renseignes: configured,
    lecture_excel_ok: Boolean(reco),
    pourcentage: reco ? Math.round(reco.percent) : null,
  });
}
