import type { Metadata } from "next";
import Funding from "@/components/Funding";

export const metadata: Metadata = {
  title: "Qualiopi & financement",
  description:
    "ENMA Formation est un organisme certifié Qualiopi. Nos formations sont éligibles à une prise en charge OPCO et nous montons le dossier de financement pour vous.",
};

export default function FinancementPage() {
  return (
    <div className="pt-12">
      <Funding />
    </div>
  );
}
