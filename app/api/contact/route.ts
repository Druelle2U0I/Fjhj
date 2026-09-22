import { NextResponse } from "next/server";
import { Resend } from "resend";

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  training?: string;
  trainees?: string;
  format?: string;
  message?: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as ContactPayload | null;

  const name = body?.name?.trim();
  const email = body?.email?.trim();
  const company = body?.company?.trim() ?? "";
  const phone = body?.phone?.trim() ?? "";
  const training = body?.training?.trim() ?? "";
  const trainees = body?.trainees?.trim() ?? "";
  const format = body?.format?.trim() ?? "";
  const message = body?.message?.trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Merci de renseigner votre nom, votre email et votre message." },
      { status: 400 },
    );
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json(
      { error: "Adresse email invalide." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;

  if (!apiKey || !to) {
    console.error(
      "RESEND_API_KEY ou CONTACT_EMAIL manquant : voir .env.example",
    );
    return NextResponse.json(
      {
        error:
          "L'envoi d'email n'est pas encore configuré. Contactez-nous directement par téléphone en attendant.",
      },
      { status: 503 },
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM ?? "ENMA Formation <onboarding@resend.dev>",
      to,
      replyTo: email,
      subject: `Nouveau message de ${name}${company ? ` (${company})` : ""}`,
      html: `
        <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
        <p><strong>Email :</strong> ${escapeHtml(email)}</p>
        ${company ? `<p><strong>Entreprise :</strong> ${escapeHtml(company)}</p>` : ""}
        ${phone ? `<p><strong>Téléphone :</strong> ${escapeHtml(phone)}</p>` : ""}
        ${training ? `<p><strong>Formation souhaitée :</strong> ${escapeHtml(training)}</p>` : ""}
        ${trainees ? `<p><strong>Nombre de stagiaires :</strong> ${escapeHtml(trainees)}</p>` : ""}
        ${format ? `<p><strong>Format préféré :</strong> ${escapeHtml(format)}</p>` : ""}
        <p><strong>Message :</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "L'envoi du message a échoué. Merci de réessayer." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "L'envoi du message a échoué. Merci de réessayer." },
      { status: 500 },
    );
  }
}
