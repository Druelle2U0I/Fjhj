import type { Metadata } from "next";
import Team from "@/components/Team";
import { pages } from "@/lib/data";

export const metadata: Metadata = {
  title: "Notre équipe",
  description: pages.team.seoDescription,
  alternates: { canonical: "/equipe" },
};

export default function EquipePage() {
  return (
    <div className="pt-12">
      <Team />
    </div>
  );
}
