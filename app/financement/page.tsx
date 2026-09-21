import type { Metadata } from "next";
import Funding from "@/components/Funding";

export const metadata: Metadata = {
  title: "Qualiopi & financement",
  description:
    "ENMA Formation est certifié Qualiopi. Financement OPCO pris en charge sans démarche de votre côté : nous montons le dossier pour vous.",
};

export default function FinancementPage() {
  return (
    <div className="pt-12">
      <Funding />
    </div>
  );
}
