import { NextResponse, type NextRequest } from "next/server";

// Espace d'administration caché : il n'est accessible qu'à une adresse
// secrète, /admin-<ADMIN_SECRET_PATH> (variable d'environnement Vercel).
// L'adresse /admin et les routes /api/admin/… répondent « page introuvable »
// à quiconque n'est pas passé par cette adresse secrète (cookie posé ici).
// Sans ADMIN_SECRET_PATH, l'admin reste à /admin comme avant.
const GATE_COOKIE = "enma_gate";

async function gateValue(secret: string) {
  const data = new TextEncoder().encode(`enma-admin-gate:${secret}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

function notFound(request: NextRequest) {
  return NextResponse.rewrite(new URL("/introuvable", request.url), { status: 404 });
}

export async function proxy(request: NextRequest) {
  const secret = process.env.ADMIN_SECRET_PATH?.trim();
  if (!secret) return NextResponse.next();

  const { pathname } = request.nextUrl;
  const expected = await gateValue(secret);

  // Adresse secrète : affiche l'admin et pose le cookie d'accès.
  if (pathname === `/admin-${secret}`) {
    const response = NextResponse.rewrite(new URL("/admin", request.url));
    response.cookies.set(GATE_COOKIE, expected, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  }

  // Ancienne adresse, ou toute autre « /admin-… » : introuvable.
  if (pathname === "/admin" || pathname.startsWith("/admin/") || pathname.startsWith("/admin-")) {
    return notFound(request);
  }

  // Routes techniques de l'admin : seulement après passage par l'adresse secrète.
  if (pathname.startsWith("/api/admin")) {
    if (request.cookies.get(GATE_COOKIE)?.value !== expected) return notFound(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/(admin.*)", "/api/admin/:path*"],
};
