import type { Metadata } from "next";
import Contact from "@/components/Contact";
import PageThemeScope from "@/components/PageThemeScope";
import { pages } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description: pages.contact.seoDescription,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <PageThemeScope overrides={pages.contact.theme}>
      <Contact />
    </PageThemeScope>
  );
}
