import type { Metadata } from "next";
import PageThemeScope from "@/components/PageThemeScope";
import Team from "@/components/Team";
import { pages } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Notre équipe",
  description: pages.team.seoDescription,
  path: "/equipe",
});

export default function EquipePage() {
  return (
    <PageThemeScope overrides={pages.team.theme}>
      <Team />
    </PageThemeScope>
  );
}
