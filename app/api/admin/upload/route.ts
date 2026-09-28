import { isAuthenticated } from "@/lib/admin-auth";
import { commitFile } from "@/lib/store";
import { slugify } from "@/lib/data";

const ALLOWED = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["video/mp4", "mp4"],
  ["video/webm", "webm"],
]);

const VIDEO_TYPES = new Set(["video/mp4", "video/webm"]);

// L'hébergeur (Vercel) refuse les requêtes de plus de 4,5 Mo ; l'admin
// compresse les photos avant l'envoi pour rester en dessous. Les vidéos
// ne sont pas compressées côté navigateur : elles doivent déjà tenir
// sous cette limite (courte boucle, sans son, fortement compressée).
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
      { error: "Format non accepté. Utilisez JPG, PNG, WebP, MP4 ou WebM." },
      { status: 400 },
    );
  }

  const isVideo = VIDEO_TYPES.has(file.type);

  if (file.size > MAX_BYTES) {
    return Response.json(
      {
        error: isVideo
          ? "Vidéo trop lourde : 4,5 Mo maximum. Raccourcissez-la ou compressez-la davantage (courte boucle, sans son)."
          : "Image trop lourde : 4,5 Mo maximum.",
      },
      { status: 400 },
    );
  }

  const base = slugify(file.name.replace(/\.[^.]+$/, "")) || (isVideo ? "video" : "image");
  const name = `${base}-${Date.now()}.${extension}`;
  const folder = isVideo ? "videos" : "images";
  const filePath = `public/${folder}/${name}`;

  try {
    await commitFile(
      filePath,
      Buffer.from(await file.arrayBuffer()),
      `Ajout ${isVideo ? "de la vidéo" : "de l'image"} ${name} depuis l'espace d'administration`,
    );
    return Response.json({ ok: true, path: `/${folder}/${name}` });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Erreur inconnue." },
      { status: 500 },
    );
  }
}
