// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

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
    // ✅ Instancier Resend ici (pas au niveau global)
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "RESEND_API_KEY manquante côté serveur." },
        { status: 500 }
      );
    }
    const resend = new Resend(apiKey);

    const body = await req.json().catch(() => ({}));

    // Honeypot anti-spam
    const hp = clean(body.hp, 200);
    if (hp) return NextResponse.json({ ok: true });

    const role = clean(body.role, 80);
    const name = clean(body.name, 120);
    const org = clean(body.org, 200);
    const email = clean(body.email, 200);
    const message = clean(body.message, 5000);

    if (!message || message.length < 10) {
      return NextResponse.json(
        { error: "Message trop court (min 10 caractères)." },
        { status: 400 }
      );
    }
    if (!isEmailLoose(email)) {
      return NextResponse.json({ error: "Email invalide." }, { status: 400 });
    }

    const to = process.env.CONTACT_TO || "contact@eleveai.fr";
    const from = process.env.CONTACT_FROM || "onboarding@resend.dev";

    const subject = `[EleveAI] Contact — ${role || "Message"}${name ? ` — ${name}` : ""}`;

    const text =
      `Nouveau message via /contact\n\n` +
      `Rôle : ${role || "-"}\n` +
      `Nom : ${name || "-"}\n` +
      `Organisation : ${org || "-"}\n` +
      `Email : ${email || "-"}\n\n` +
      `Message :\n${message}\n`;

    await resend.emails.send({
      from: `EleveAI <${from}>`,
      to,
      subject,
      text,
      ...(email ? { replyTo: email } : {}),
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("Contact API error:", e);
    return NextResponse.json(
      { error: e?.message || "Erreur serveur." },
      { status: 500 }
    );
  }
}
