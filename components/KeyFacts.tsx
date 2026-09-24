import { legal, services } from "@/lib/data";

// Encadré de chiffres clés affiché à droite du titre des pages catalogue.
export default function KeyFacts() {
  const trainings = services.reduce((n, s) => n + s.trainings.length, 0);
  const facts = [
    { value: String(trainings), label: "formations au catalogue" },
    { value: String(services.length), label: "domaines de formation" },
    { value: "Intra & inter", label: "dans vos locaux ou en session" },
    ...(legal.qualiopiCertificate ? [{ value: "Qualiopi", label: "organisme certifié" }] : []),
  ];
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border">
      {facts.map((fact) => (
        <div key={fact.label} className="bg-surface p-5 sm:p-6">
          <dt className="sr-only">{fact.label}</dt>
          <dd>
            <span className="block text-2xl font-semibold text-accent sm:text-3xl">{fact.value}</span>
            <span className="mt-1 block text-sm text-muted">{fact.label}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
