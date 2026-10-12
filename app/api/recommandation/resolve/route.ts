import { recommendationSource } from "@/lib/data";
import { graphErrorCode, graphToken } from "@/lib/recommendation";

// Outils de diagnostic pour la liaison Excel (taux de recommandation) :
// - ?url=<lien de partage> retrouve le driveId/itemId actuels d'un fichier
//   OneDrive/SharePoint (utile si le fichier a été déplacé ou recréé).
// - ?worksheets=1 liste les onglets du fichier déjà configuré (utile si
//   l'onglet a été renommé).
export const dynamic = "force-dynamic";

// Encodage requis par l'API Microsoft Graph « shares » :
// https://learn.microsoft.com/graph/api/shares-get
function encodeShareUrl(url: string): string {
  const base64 = Buffer.from(url, "utf-8").toString("base64");
  const base64url = base64.replace(/=+$/, "").replace(/\//g, "_").replace(/\+/g, "-");
  return `u!${base64url}`;
}

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const url = params.get("url");
  const listWorksheets = params.has("worksheets");

  const auth = await graphToken();
  if ("reason" in auth) return Response.json({ erreur: auth.reason }, { status: 502 });
  const headers = { Authorization: `Bearer ${auth.token}` };

  if (listWorksheets) {
    const source = recommendationSource;
    if (!source?.driveId || !source.itemId) {
      return Response.json({ erreur: "source_non_configuree" }, { status: 400 });
    }
    const res = await fetch(
      `https://graph.microsoft.com/v1.0/drives/${source.driveId}/items/${source.itemId}/workbook/worksheets?$select=name`,
      { headers },
    );
    if (!res.ok) return Response.json({ erreur: await graphErrorCode(res) }, { status: 502 });
    const { value } = (await res.json()) as { value: { name: string }[] };
    return Response.json({ onglets: value.map((w) => w.name) });
  }

  if (!url) return Response.json({ erreur: "parametre_url_ou_worksheets_manquant" }, { status: 400 });

  const res = await fetch(
    `https://graph.microsoft.com/v1.0/shares/${encodeShareUrl(url)}/driveItem?$select=id,name,parentReference`,
    { headers },
  );
  if (!res.ok) return Response.json({ erreur: await graphErrorCode(res) }, { status: 502 });

  const item = (await res.json()) as { id: string; name: string; parentReference?: { driveId?: string } };
  return Response.json({
    nom: item.name,
    driveId: item.parentReference?.driveId ?? null,
    itemId: item.id,
  });
}
