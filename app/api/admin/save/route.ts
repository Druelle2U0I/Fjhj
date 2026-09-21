import { isAuthenticated } from "@/lib/admin-auth";
import { commitFile } from "@/lib/store";
import type { SiteContent } from "@/lib/data";

function isValid(content: unknown): content is SiteContent {
  if (typeof content !== "object" || content === null) return false;
  const c = content as Partial<SiteContent>;
  return (
    typeof c.company?.name === "string" &&
    Array.isArray(c.sectors) &&
    Array.isArray(c.team) &&
    Array.isArray(c.stats)
  );
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return Response.json({ error: "Non autorisé." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!isValid(body)) {
    return Response.json(
      { error: "Contenu invalide : enregistrement refusé." },
      { status: 400 },
    );
  }

  try {
    const result = await commitFile(
      "content/site.json",
      Buffer.from(JSON.stringify(body, null, 2) + "\n", "utf8"),
      "Mise à jour du contenu depuis l'espace d'administration",
    );
    return Response.json({ ok: true, mode: result.mode });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Erreur inconnue." },
      { status: 500 },
    );
  }
}
