import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { isAuthenticated } from "@/lib/admin-auth";

// Les vidéos passent par Vercel Blob (envoi direct depuis le navigateur)
// et non par /api/admin/upload : ce dernier transite par une fonction
// serverless, limitée à 4,5 Mo par l'hébergeur, bien trop juste pour une
// vidéo. Cette route ne fait que délivrer un jeton d'envoi temporaire ;
// le fichier ne passe jamais par le serveur.
const MAX_BYTES = 100 * 1024 * 1024;

// La génération du jeton appelle l'API Vercel Blob : si les identifiants
// de stockage (BLOB_READ_WRITE_TOKEN) sont invalides ou mal configurés,
// cet appel peut rester bloqué au lieu d'échouer immédiatement. Sans
// limite, le navigateur attend indéfiniment sans aucun message d'erreur.
const TOKEN_TIMEOUT_MS = 15_000;

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return Response.json({ error: "Non autorisé." }, { status: 401 });
  }

  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await Promise.race([
      handleUpload({
        body,
        request,
        onBeforeGenerateToken: async () => ({
          allowedContentTypes: ["video/mp4", "video/webm"],
          addRandomSuffix: true,
          maximumSizeInBytes: MAX_BYTES,
        }),
        onUploadCompleted: async () => {},
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Délai dépassé en générant le jeton d'envoi Vercel Blob (identifiants de stockage à vérifier).")),
          TOKEN_TIMEOUT_MS,
        ),
      ),
    ]);
    return Response.json(jsonResponse);
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Erreur inconnue." },
      { status: 400 },
    );
  }
}
