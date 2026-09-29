import { isAuthenticated } from "@/lib/admin-auth";
import { commitFile, ConflictError } from "@/lib/store";
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

  const payload = (await request.json().catch(() => null)) as
    | { content?: unknown; baseSha?: string }
    | null;
  const body = payload?.content;
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
      payload?.baseSha || undefined,
    );
    return Response.json({ ok: true, mode: result.mode, sha: "sha" in result ? result.sha : undefined });
  } catch (error) {
    if (error instanceof ConflictError) {
      return Response.json(
        {
          error:
            "Le site a été modifié depuis l'ouverture de cette page (autre onglet ou mise à jour). Enregistrement bloqué pour ne rien écraser : copiez vos changements, rechargez la page (Cmd + Maj + R) puis refaites-les.",
          conflict: true,
        },
        { status: 409 },
      );
    }
    return Response.json(
      { error: error instanceof Error ? error.message : "Erreur inconnue." },
      { status: 500 },
    );
  }
}
