import { legal } from "@/lib/data";

// Numéro du certificat Qualiopi : ouvre le certificat (PDF) dans un nouvel
// onglet quand il a été envoyé depuis l'admin.
export default function CertificateNumber({ className = "" }: { className?: string }) {
  if (!legal.qualiopiCertificateUrl) return <>{legal.qualiopiCertificate}</>;
  return (
    <a
      href={legal.qualiopiCertificateUrl}
      target="_blank"
      rel="noopener noreferrer"
      title="Voir le certificat Qualiopi (PDF)"
      className={`underline decoration-dotted underline-offset-4 transition-opacity hover:opacity-70 ${className}`}
    >
      {legal.qualiopiCertificate}
    </a>
  );
}
