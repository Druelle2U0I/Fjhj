import type { Metadata } from "next";
import Team from "@/components/Team";

export const metadata: Metadata = {
  title: "Notre équipe",
  description:
    "Une équipe de formateurs expérimentés, pédagogues et opérationnels, qui se déplacent directement dans vos locaux en Hauts-de-France.",
};

export default function EquipePage() {
  return (
    <div className="pt-12">
      <Team />
    </div>
  );
}
