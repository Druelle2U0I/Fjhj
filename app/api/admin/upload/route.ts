import { isAuthenticated } from "@/lib/admin-auth";
import { commitFile } from "@/lib/store";
import { slugify } from "@/lib/data";

const ALLOWED = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  // Documents (ex. certificat Qualiopi), rangés à part des photos.
  ["application/pdf", "pdf"],
]);

// L'hébergeur (Vercel) refuse les requêtes de plus de 4,5 Mo ; l'admin
// compresse les photos avant l'envoi pour rester en dessous. Les vidéos
// passent par /api/admin/video-upload (Vercel Blob, envoi direct depuis
// le navigateur), bien trop lourdes pour cette route.
const MAX_BYTES = 4.5 * 1024 * 1024;

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
      { error: "Format non accepté. Utilisez JPG, PNG, WebP ou PDF." },
      { status: 400 },
    );
  }

  if (file.size > MAX_BYTES) {
    return Response.json(
      { error: "Fichier trop lourd : 4,5 Mo maximum." },
      { status: 400 },
    );
  }

  const isPdf = extension === "pdf";
  const folder = isPdf ? "documents" : "images";
  const base = slugify(file.name.replace(/\.[^.]+$/, "")) || (isPdf ? "document" : "image");
  const name = `${base}-${Date.now()}.${extension}`;
  const filePath = `public/${folder}/${name}`;

  try {
    await commitFile(
      filePath,
      Buffer.from(await file.arrayBuffer()),
      `Ajout ${isPdf ? "du document" : "de l'image"} ${name} depuis l'espace d'administration`,
    );
    return Response.json({ ok: true, path: `/${folder}/${name}` });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Erreur inconnue." },
      { status: 500 },
    );
  }
}
