import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// CSP sans nonce : le site est presque entièrement généré statiquement
// (generateStaticParams), et passer par un nonce forcerait un rendu
// dynamique sur toutes les pages. 'unsafe-inline' reste nécessaire pour
// le script JSON-LD et l'hydratation React/Next. Le script Vercel
// Analytics est servi en même origine via /_vercel/insights/script.js
// (couvert par script-src 'self'), mais l'envoi des mesures passe par
// vitals.vercel-insights.com, d'où l'ajout à connect-src.
//
// vercel.com est nécessaire à connect-src : l'envoi de vidéo depuis
// l'admin (Vercel Blob) passe, après le jeton généré par notre propre
// route, par des appels direct-browser vers vercel.com/api/blob — sans
// cette autorisation, le navigateur les bloque silencieusement (aucune
// requête réseau visible, juste une violation CSP dans la console),
// et la librairie interprète ce blocage comme une erreur réseau
// passagère qu'elle retente en boucle : d'où un envoi qui semblait
// bloqué indéfiniment sans jamais afficher d'erreur claire. Le
// domaine de stockage (*.public.blob.vercel-storage.com) sert à lire
// la vidéo une fois envoyée (balise <video>, gouvernée par media-src).
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""};
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data:;
  font-src 'self';
  media-src 'self' blob: https://*.public.blob.vercel-storage.com;
  connect-src 'self' https://vitals.vercel-insights.com https://vercel.com https://*.public.blob.vercel-storage.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`
  .replace(/\s{2,}/g, " ")
  .trim();

const nextConfig: NextConfig = {
  // Identifiant de la version publiée, comparé à celle en ligne par
  // components/FreshnessGuard.tsx pour ne jamais afficher une page périmée.
  env: {
    NEXT_PUBLIC_BUILD_ID: process.env.VERCEL_GIT_COMMIT_SHA ?? "dev",
  },
  experimental: {
    // Pages gardées le moins longtemps possible dans le cache de navigation
    // du navigateur (30 s, le minimum ; 5 min par défaut).
    staleTimes: { static: 30 },
  },
  images: {
    // 90 pour les photos (meilleur rendu que le 75 par défaut, fichiers
    // encore légers) ; 75 reste disponible.
    qualities: [75, 90],
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: cspHeader },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
