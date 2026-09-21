import { cookies } from "next/headers";
import {
  ADMIN_COOKIE,
  adminPassword,
  createSession,
  matchesPassword,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  const password = adminPassword();
  if (!password) {
    return Response.json(
      {
        error:
          "Le mot de passe d'administration n'est pas configuré sur le serveur.",
      },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => null)) as {
    password?: string;
  } | null;

  if (!body?.password || !matchesPassword(body.password, password)) {
    return Response.json({ error: "Mot de passe incorrect." }, { status: 401 });
  }

  const session = createSession(password);
  const store = await cookies();
  store.set(ADMIN_COOKIE, session.value, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: session.maxAge,
  });

  return Response.json({ ok: true });
}
