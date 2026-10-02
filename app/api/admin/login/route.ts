import { cookies } from "next/headers";
import {
  ADMIN_COOKIE,
  adminPassword,
  createSession,
  matchesPassword,
} from "@/lib/admin-auth";

// Protection contre les essais de mot de passe à répétition : après
// 5 échecs depuis une même adresse IP, la connexion est bloquée 15 minutes.
// (Mémoire propre à chaque instance du serveur : c'est un frein, à
// compléter par une règle de limitation dans le pare-feu Vercel.)
const MAX_FAILURES = 5;
const LOCK_MS = 15 * 60 * 1000;
const failures = new Map<string, { count: number; until: number }>();

function clientIp(request: Request) {
  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "inconnue"
  );
}

export async function POST(request: Request) {
  const ip = clientIp(request);
  const record = failures.get(ip);
  if (record && record.count >= MAX_FAILURES && record.until > Date.now()) {
    return Response.json(
      { error: "Trop de tentatives. Réessayez dans 15 minutes." },
      { status: 429 },
    );
  }

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
    const previous = record && record.until > Date.now() ? record.count : 0;
    failures.set(ip, { count: previous + 1, until: Date.now() + LOCK_MS });
    // Petit délai : ralentit fortement les essais automatisés.
    await new Promise((resolve) => setTimeout(resolve, 800));
    return Response.json({ error: "Mot de passe incorrect." }, { status: 401 });
  }
  failures.delete(ip);

  const session = createSession(password);
  const store = await cookies();
  store.set(ADMIN_COOKIE, session.value, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: session.maxAge,
  });

  return Response.json({ ok: true });
}
