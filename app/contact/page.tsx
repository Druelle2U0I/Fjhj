import type { Metadata } from "next";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Décrivez votre besoin de formation, nous revenons vers vous sous 24h avec une proposition adaptée et le montage du dossier OPCO.",
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
