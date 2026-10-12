import { graphErrorCode, graphToken } from "@/lib/recommendation";

// Retrouve le driveId/itemId actuels d'un fichier OneDrive/SharePoint à
// partir d'un lien de partage (utile quand le fichier a été déplacé ou
// recréé et que les identifiants enregistrés dans le site ne correspondent
// plus à rien). Usage : /api/recommandation/resolve?url=<lien copié>
export const dynamic = "force-dynamic";

// Encodage requis par l'API Microsoft Graph « shares » :
// https://learn.microsoft.com/graph/api/shares-get
function encodeShareUrl(url: string): string {
  const base64 = Buffer.from(url, "utf-8").toString("base64");
  const base64url = base64.replace(/=+$/, "").replace(/\//g, "_").replace(/\+/g, "-");
  return `u!${base64url}`;
}

export async function GET(request: Request) {
  const url = new URL(request.url).searchParams.get("url");
  if (!url) return Response.json({ erreur: "parametre_url_manquant" }, { status: 400 });

  const auth = await graphToken();
  if ("reason" in auth) return Response.json({ erreur: auth.reason }, { status: 502 });

  const res = await fetch(
    `https://graph.microsoft.com/v1.0/shares/${encodeShareUrl(url)}/driveItem?$select=id,name,parentReference`,
    { headers: { Authorization: `Bearer ${auth.token}` } },
  );
  if (!res.ok) return Response.json({ erreur: await graphErrorCode(res) }, { status: 502 });

  const item = (await res.json()) as { id: string; name: string; parentReference?: { driveId?: string } };
  return Response.json({
    nom: item.name,
    driveId: item.parentReference?.driveId ?? null,
    itemId: item.id,
  });
}
