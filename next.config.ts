import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// CSP sans nonce : le site est presque entièrement généré statiquement
// (generateStaticParams), et passer par un nonce forcerait un rendu
// dynamique sur toutes les pages. 'unsafe-inline' reste nécessaire pour
// le script JSON-LD et l'hydratation React/Next, mais aucun script tiers
// n'est chargé (pas d'analytics, pas de CDN externe), donc script-src
// 'self' + 'unsafe-inline' couvre déjà l'essentiel du risque (injection
// de script externe).
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""};
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data:;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`
  .replace(/\s{2,}/g, " ")
  .trim();

const nextConfig: NextConfig = {
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
