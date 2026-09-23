import type { Metadata } from "next";
import Contact from "@/components/Contact";
import { pages } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description: pages.contact.seoDescription,
  alternates: { canonical: "/contact" },
};

export default async function ContactPage(
  props: PageProps<"/contact">,
) {
  const searchParams = await props.searchParams;
  const formation =
    typeof searchParams.formation === "string"
      ? searchParams.formation
      : undefined;

  return (
    <div className="pt-12">
      <Contact defaultTraining={formation} />
    </div>
  );
}
