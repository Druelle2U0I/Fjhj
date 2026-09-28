import type { Metadata } from "next";
import Funding from "@/components/Funding";
import PageThemeScope from "@/components/PageThemeScope";
import { pages } from "@/lib/data";

export const metadata: Metadata = {
  title: "Qualiopi & financement",
  description: pages.funding.seoDescription,
  alternates: { canonical: "/financement" },
};

export default function FinancementPage() {
  return (
    <PageThemeScope overrides={pages.funding.theme}>
      <Funding />
    </PageThemeScope>
  );
}
