// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

function clean(v: unknown, max = 5000) {
  return String(v ?? "").trim().slice(0, max);
}

function isEmailLoose(v: string) {
  if (!v) return true; // email optionnel
  if (v.length > 200) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    // Honeypot anti-spam
    const hp = clean(body.hp, 200);
    if (hp) return NextResponse.json({ ok: true });

    const role = clean(body.role, 80);
    const name = clean(body.name, 120);
    const org = clean(body.org, 200);
    const email = clean(body.email, 200);
    const message = clean(body.message, 8000);

    if (!message || message.length < 10) {
      return NextResponse.json({ error: "Message trop court." }, { status: 400 });
    }
    if (!isEmailLoose(email)) {
      return NextResponse.json({ error: "Email invalide." }, { status: 400 });
    }

    const to = process.env.CONTACT_TO || "contact@eleveai.fr";
    const from = process.env.CONTACT_FROM || "no-reply@eleveai.fr";
    const siteUrl = process.env.SITE_URL || "https://eleveai.fr";

    const subject = `[EleveAI] Contact — ${role || "Inconnu"}${name ? ` — ${name}` : ""}`;

    const text = [
      `Rôle : ${role || "-"}`,
      name ? `Nom : ${name}` : undefined,
      org ? `Organisation : ${org}` : undefined,
      email ? `Email : ${email}` : undefined,
      "",
      "Message :",
      message,
      "",
      `Source : ${siteUrl}/contact`,
    ]
      .filter(Boolean)
      .join("\n");

    const result = await resend.emails.send({
      from: `EleveAI <${from}>`,
      to: [to],
      subject,
      text,
      replyTo: email || undefined,
    });

    if ((result as any)?.error) {
      return NextResponse.json(
        { error: (result as any).error?.message || "Erreur Resend." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}