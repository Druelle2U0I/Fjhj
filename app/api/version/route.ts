// Version actuellement en ligne (commit déployé) : le navigateur la compare
// à celle de la page qu'il affiche pour savoir si le site a été republié.
export const dynamic = "force-dynamic";

export function GET() {
  return Response.json(
    { id: process.env.VERCEL_GIT_COMMIT_SHA ?? "dev" },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
