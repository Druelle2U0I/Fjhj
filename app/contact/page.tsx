import type { Metadata } from "next";
import Contact from "@/components/Contact";
import PageThemeScope from "@/components/PageThemeScope";
import { pages } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: pages.contact.seoDescription,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <PageThemeScope overrides={pages.contact.theme}>
      <Contact />
    </PageThemeScope>
  );
}
