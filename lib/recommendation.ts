import { recommendationSource, stats, type Stat } from "@/lib/data";

// Lecture de la note de recommandation dans le fichier Excel des
// questionnaires de satisfaction (SharePoint), via Microsoft Graph.
// Seule la colonne « Recommandation » est lue : aucune donnée
// personnelle (nom, entreprise) ne transite par le site.
//
// Variables d'environnement (Vercel) : MS_TENANT_ID, MS_CLIENT_ID,
// MS_CLIENT_SECRET — application Azure avec la permission
// « Files.Read.All » (ou « Sites.Read.All ») en mode application.
// Sans elles, ou en cas d'erreur, le chiffre saisi dans l'admin est
// affiché.

const REFRESH_SECONDS = 3600;

async function graphToken(): Promise<string | null> {
  const { MS_TENANT_ID, MS_CLIENT_ID, MS_CLIENT_SECRET } = process.env;
  if (!MS_TENANT_ID || !MS_CLIENT_ID || !MS_CLIENT_SECRET) return null;
  const res = await fetch(`https://login.microsoftonline.com/${MS_TENANT_ID}/oauth2/v2.0/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: MS_CLIENT_ID,
      client_secret: MS_CLIENT_SECRET,
      scope: "https://graph.microsoft.com/.default",
      grant_type: "client_credentials",
    }),
    next: { revalidate: REFRESH_SECONDS },
  });
  if (!res.ok) return null;
  const data = (await res.json()) as { access_token?: string };
  return data.access_token ?? null;
}

// Part des répondants qui recommandent (note ≥ seuil, 9 par défaut, comme
// les « promoteurs » du Net Promoter Score), lue dans la colonne dont
// l'en-tête correspond au libellé configuré (« Recommandation »).
export async function fetchRecommendation(): Promise<{ percent: number; count: number } | null> {
  const source = recommendationSource;
  if (!source?.driveId || !source.itemId) return null;
  try {
    const token = await graphToken();
    if (!token) return null;
    const base = `https://graph.microsoft.com/v1.0/drives/${source.driveId}/items/${source.itemId}/workbook`;
    const headers = { Authorization: `Bearer ${token}` };
    let sheet = source.sheet;
    if (!sheet) {
      const list = await fetch(`${base}/worksheets?$select=name`, { headers, next: { revalidate: REFRESH_SECONDS } });
      if (!list.ok) return null;
      sheet = ((await list.json()) as { value: { name: string }[] }).value[0]?.name;
      if (!sheet) return null;
    }
    const res = await fetch(
      `${base}/worksheets('${encodeURIComponent(sheet)}')/usedRange(valuesOnly=true)?$select=values`,
      { headers, next: { revalidate: REFRESH_SECONDS } },
    );
    if (!res.ok) return null;
    const { values } = (await res.json()) as { values: unknown[][] };
    const label = (source.column || "Recommandation").toLowerCase();

    // Première cellule dont le texte correspond à l'en-tête cherché.
    let row = -1;
    let col = -1;
    for (let r = 0; r < values.length && row < 0; r++) {
      const c = values[r].findIndex((cell) => String(cell).trim().toLowerCase() === label);
      if (c >= 0) [row, col] = [r, c];
    }
    if (row < 0) return null;

    const notes: number[] = [];
    for (let r = row + 1; r < values.length; r++) {
      const raw = values[r][col];
      if (raw === "" || raw === null || raw === undefined) break;
      const n = typeof raw === "number" ? raw : Number(String(raw).replace(",", "."));
      if (!Number.isFinite(n) || n < 0 || n > 10) break;
      notes.push(n);
    }
    if (notes.length === 0) return null;
    const threshold = source.minScore ?? 9;
    const recommending = notes.filter((n) => n >= threshold).length;
    return { percent: (recommending / notes.length) * 100, count: notes.length };
  } catch {
    return null;
  }
}

function format(percent: number) {
  return `${Math.round(percent)} %`;
}

// Chiffres clés, avec la note de recommandation à jour quand elle est
// disponible.
export async function getStats(): Promise<Stat[]> {
  if (!stats.some((s) => s.source === "recommendation")) return stats;
  const reco = await fetchRecommendation();
  if (!reco) return stats;
  return stats.map((s) => (s.source === "recommendation" ? { ...s, value: format(reco.percent) } : s));
}
