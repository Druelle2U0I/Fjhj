import type { Metadata } from "next";
import Funding from "@/components/Funding";
import { pages } from "@/lib/data";

export const metadata: Metadata = {
  title: "Qualiopi & financement",
  description: pages.funding.seoDescription,
  alternates: { canonical: "/financement" },
};

export default function FinancementPage() {
  return (
    <div className="pt-12">
      <Funding />
    </div>
  );
}
