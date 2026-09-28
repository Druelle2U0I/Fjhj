import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { isAuthenticated } from "@/lib/admin-auth";

// Les vidéos passent par Vercel Blob (envoi direct depuis le navigateur)
// et non par /api/admin/upload : ce dernier transite par une fonction
// serverless, limitée à 4,5 Mo par l'hébergeur, bien trop juste pour une
// vidéo. Cette route ne fait que délivrer un jeton d'envoi temporaire ;
// le fichier ne passe jamais par le serveur.
const MAX_BYTES = 100 * 1024 * 1024;

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return Response.json({ error: "Non autorisé." }, { status: 401 });
  }

  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: ["video/mp4", "video/webm"],
        addRandomSuffix: true,
        maximumSizeInBytes: MAX_BYTES,
      }),
      onUploadCompleted: async () => {},
    });
    return Response.json(jsonResponse);
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Erreur inconnue." },
      { status: 400 },
    );
  }
}
