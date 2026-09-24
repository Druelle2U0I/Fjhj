import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import {
  Geist,
  Geist_Mono,
  Archivo,
  Space_Grotesk,
  Manrope,
  Fraunces,
} from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SiteChrome from "@/components/SiteChrome";
import { company, legal, siteUrl, theme, themeStyle } from "@/lib/data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
  preload: false,
});

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  preload: false,
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
  preload: false,
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  preload: false,
});

const siteTitle =
  "ENMA Formation — Organisme de formation Qualiopi Hauts-de-France";
const siteDescription =
  "Formations sécurité incendie, secourisme, habilitation électrique, CACES, travail en hauteur, prévention des risques, management et photovoltaïque. Organisme certifié Qualiopi, formations éligibles à une prise en charge OPCO, en intra et inter-entreprises dans les Hauts-de-France.";

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
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const [addressLine1, addressLine2] = company.address.split(", ");
const [postalCode, ...cityParts] = (addressLine2 ?? "").split(" ");

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: company.name,
  url: siteUrl,
  logo: `${siteUrl}/brand/logo-wordmark.png`,
  image: `${siteUrl}/opengraph-image`,
  description: company.description,
  telephone: company.phone,
  email: company.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: addressLine1,
    postalCode,
    addressLocality: cityParts.join(" "),
    addressCountry: "FR",
  },
  areaServed: company.serviceArea,
  identifier: {
    "@type": "PropertyValue",
    name: "Certification Qualiopi",
    value: legal.qualiopiCertificate,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      suppressHydrationWarning
      lang="fr"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${archivo.variable} ${grotesk.variable} ${manrope.variable} ${fraunces.variable} h-full antialiased`}
      style={themeStyle(theme) as React.CSSProperties}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <SiteChrome header={<Header />} footer={<Footer />}>
          {children}
        </SiteChrome>
        {/* Avant le premier affichage : les blocs animés déjà à l'écran
            sont marqués visibles, puis le masquage des autres est activé.
            Voir components/Reveal.tsx. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var h=innerHeight;document.querySelectorAll("[data-reveal]").forEach(function(e){if(e.getBoundingClientRect().top<h)e.setAttribute("data-shown","instant")});document.documentElement.classList.add("reveal-on")})();`,
          }}
        />
        <Analytics />
      </body>
    </html>
  );
}
