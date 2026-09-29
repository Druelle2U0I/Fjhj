import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import {
  Archivo,
  Space_Grotesk,
  Manrope,
  Fraunces,
  Figtree,
} from "next/font/google";
import localFont from "next/font/local";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SiteChrome from "@/components/SiteChrome";
import { baseTheme, company, home, legal, siteUrl, telHref, themeStyle } from "@/lib/data";
import "./globals.css";

// Archivo en police variable avec l'axe de largeur : sert aussi aux
// titres en version élargie (« Archivo Expanded »).
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
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

// Police de l'identité : DejaVu Sans Condensed, pour les titres comme pour
// le texte courant.
const dejavu = localFont({
  variable: "--font-dejavu",
  src: [
    { path: "./fonts/dejavu-sans-condensed.woff2", weight: "400" },
    { path: "./fonts/dejavu-sans-condensed-bold.woff2", weight: "700" },
  ],
  display: "swap",
});


// Police géométrique des titres et du texte courant.
const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const siteTitle =
  home.seoTitle || "ENMA Formation — Organisme de formation Qualiopi Hauts-de-France";
const siteDescription = home.seoDescription || company.description;

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
  telephone: telHref(company.phone).slice(4),
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
      className={`${archivo.variable} ${grotesk.variable} ${manrope.variable} ${fraunces.variable} ${figtree.variable} ${dejavu.variable} h-full antialiased`}
      style={themeStyle(baseTheme) as React.CSSProperties}
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
