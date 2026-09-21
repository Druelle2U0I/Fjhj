import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const siteUrl = "https://fjhj-one.vercel.app";
const siteTitle =
  "ENMA Formation — Organisme de formation Qualiopi Hauts-de-France";
const siteDescription =
  "Formations sécurité incendie, secourisme, habilitation électrique, CACES, travail en hauteur, prévention des risques, management et photovoltaïque. Certifié Qualiopi, financement OPCO pris en charge, intra et inter-entreprises dans les Hauts-de-France.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | ENMA Formation",
  },
  description: siteDescription,
  keywords: [
    "organisme de formation Hauts-de-France",
    "formation Qualiopi",
    "SST secourisme",
    "CACES",
    "habilitation électrique NF C 18-510",
    "travail en hauteur",
    "financement OPCO",
    "formation sécurité incendie",
    "Wingles",
    "Lens",
    "Pas-de-Calais",
  ],
  authors: [{ name: "ENMA Formation" }],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "ENMA Formation",
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
