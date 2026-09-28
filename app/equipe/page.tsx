import type { Metadata } from "next";
import PageThemeScope from "@/components/PageThemeScope";
import Team from "@/components/Team";
import { pages } from "@/lib/data";

export const metadata: Metadata = {
  title: "Notre équipe",
  description: pages.team.seoDescription,
  alternates: { canonical: "/equipe" },
};

export default function EquipePage() {
  return (
    <PageThemeScope overrides={pages.team.theme}>
      <Team />
    </PageThemeScope>
  );
}
