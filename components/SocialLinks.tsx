import type { Social } from "@/lib/data";

const NETWORKS: { key: keyof Social; label: string; path: string }[] = [
  {
    key: "linkedin",
    label: "LinkedIn",
    path: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.5h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1v5.45h-4v-4.83c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.85 1.25-1.85 2.55v4.91h-4v-11Z",
  },
  {
    key: "facebook",
    label: "Facebook",
    path: "M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.87.25-1.46 1.5-1.46h1.55V4.47A20.6 20.6 0 0 0 14.3 4.35c-2.25 0-3.8 1.37-3.8 3.9V10.5H8v3h2.5V21h3Z",
  },
  {
    key: "instagram",
    label: "Instagram",
    path: "M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4Zm0 7.75a3.05 3.05 0 1 1 0-6.1 3.05 3.05 0 0 1 0 6.1Zm4.9-8.95a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 3c-2.44 0-2.75.01-3.71.05-3.26.15-5.09 1.97-5.24 5.24C3.01 9.25 3 9.56 3 12s.01 2.75.05 3.71c.15 3.27 1.97 5.09 5.24 5.24.96.04 1.27.05 3.71.05s2.75-.01 3.71-.05c3.26-.15 5.1-1.97 5.24-5.24.04-.96.05-1.27.05-3.71s-.01-2.75-.05-3.71c-.15-3.26-1.97-5.09-5.24-5.24C14.75 3.01 14.44 3 12 3Zm0 1.62c2.4 0 2.69.01 3.64.05 2.44.11 3.58 1.27 3.69 3.69.04.95.05 1.24.05 3.64s-.01 2.69-.05 3.64c-.11 2.42-1.25 3.58-3.69 3.69-.95.04-1.24.05-3.64.05s-2.69-.01-3.64-.05c-2.45-.11-3.58-1.27-3.69-3.69-.04-.95-.05-1.24-.05-3.64s.01-2.69.05-3.64c.11-2.42 1.25-3.58 3.69-3.69.95-.04 1.24-.05 3.64-.05Z",
  },
  {
    key: "youtube",
    label: "YouTube",
    path: "M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.28 5 12 5 12 5s-6.28 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.72 19 12 19 12 19s6.28 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z",
  },
  {
    key: "tiktok",
    label: "TikTok",
    path: "M16.6 3h-3.1v12.2a2.7 2.7 0 1 1-2.7-2.7c.28 0 .55.04.8.12V9.45a5.9 5.9 0 1 0 5 5.83V9.1a7.6 7.6 0 0 0 4.4 1.4V7.4a4.4 4.4 0 0 1-4.4-4.4Z",
  },
];

// Icônes des réseaux sociaux renseignés dans l'admin (les réseaux sans
// adresse ne sont pas affichés).
export default function SocialLinks({ social }: { social: Social }) {
  const links = NETWORKS.filter((n) => social[n.key]?.trim());
  if (links.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-3">
      {links.map((n) => (
        <li key={n.key}>
          <a
            href={social[n.key]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${n.label} (nouvel onglet)`}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-background/40 text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px]" fill="currentColor">
              <path d={n.path} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
