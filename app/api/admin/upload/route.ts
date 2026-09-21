import { isAuthenticated } from "@/lib/admin-auth";
import { commitFile } from "@/lib/store";
import { slugify } from "@/lib/data";

const ALLOWED = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
]);

const MAX_BYTES = 6 * 1024 * 1024;

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return Response.json({ error: "Non autorisé." }, { status: 401 });
  }

  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) {
    return Response.json({ error: "Aucun fichier reçu." }, { status: 400 });
  }

  const extension = ALLOWED.get(file.type);
  if (!extension) {
    return Response.json(
      { error: "Format non accepté. Utilisez JPG, PNG ou WebP." },
      { status: 400 },
    );
  }

  if (file.size > MAX_BYTES) {
    return Response.json(
      { error: "Image trop lourde : 6 Mo maximum." },
      { status: 400 },
    );
  }

  const base = slugify(file.name.replace(/\.[^.]+$/, "")) || "image";
  const name = `${base}-${Date.now()}.${extension}`;
  const filePath = `public/images/${name}`;

  try {
    await commitFile(
      filePath,
      Buffer.from(await file.arrayBuffer()),
      `Ajout de l'image ${name} depuis l'espace d'administration`,
    );
    return Response.json({ ok: true, path: `/images/${name}` });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Erreur inconnue." },
      { status: 500 },
    );
  }
}
