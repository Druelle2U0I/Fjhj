import type { Metadata } from "next";
import Funding from "@/components/Funding";
import PageThemeScope from "@/components/PageThemeScope";
import { pages } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Qualiopi & financement",
  description: pages.funding.seoDescription,
  path: "/financement",
});

export default function FinancementPage() {
  return (
    <PageThemeScope overrides={pages.funding.theme}>
      <Funding />
    </PageThemeScope>
  );
}
