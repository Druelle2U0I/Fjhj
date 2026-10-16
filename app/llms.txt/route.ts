import { company, legal, services, siteUrl } from "@/lib/data";

// Présentation du site pour les assistants IA (convention llms.txt),
// générée à partir du contenu : elle suit automatiquement les formations
// ajoutées ou modifiées dans l'admin.
export const dynamic = "force-static";

export function GET() {
  const lines: string[] = [
    `# ${company.name}`,
    "",
    `> ${company.description}`,
    "",
    company.about,
    "",
    `- Organisme certifié Qualiopi (certificat n° ${legal.qualiopiCertificate}), formations finançables par les OPCO.`,
    `- Zone d'intervention : ${company.serviceArea}.`,
    `- Contact : ${company.email}, ${company.phone}, ${company.address}.`,
    "",
    "## Pages principales",
    "",
    `- [Catalogue des domaines de formation](${siteUrl}/formations)`,
    `- [Toutes les formations](${siteUrl}/formations/toutes)`,
    `- [Financement et prise en charge OPCO](${siteUrl}/financement)`,
    `- [Le centre de formation](${siteUrl}/centre)`,
    `- [L'équipe](${siteUrl}/equipe)`,
    `- [Demander un devis](${siteUrl}/contact)`,
  ];

  for (const service of services) {
    lines.push("", `## ${service.title}`, "");
    if (service.summary) lines.push(service.summary, "");
    lines.push(`- [Présentation du domaine](${siteUrl}/formations/${service.slug})`);
    for (const training of service.trainings) {
      const details = [training.duration, training.intro].filter(Boolean).join(" — ");
      lines.push(
        `- [${training.title}](${siteUrl}/formations/${service.slug}/${training.slug})${details ? ` : ${details}` : ""}`,
      );
    }
  }

  return new Response(lines.join("\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
