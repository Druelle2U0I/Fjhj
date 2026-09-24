import type { Metadata } from "next";
import Contact from "@/components/Contact";
import { pages } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description: pages.contact.seoDescription,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="pt-12">
      <Contact />
    </div>
  );
}
