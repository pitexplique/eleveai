// Envoi de la newsletter via Resend. Protégé par le cookie admin signé.
//
// POST /api/admin/newsletter/send
//   body { subject, message, mode: "test" | "all" }
//   - "test" : envoie UNIQUEMENT à l'adresse admin (CONTACT_TO), sujet préfixé.
//   - "all"  : envoie à tous les comptes users_email ayant consenti
//              (accepte_newsletter = true), par lots de 100, chaque email
//              portant un lien de désinscription personnalisé (RGPD).
//
// ⚠️ Action sortante irréversible : le déclenchement "all" vient d'un clic
// explicite côté dashboard admin (double confirmation UI).

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { verifyAdminCookieValue } from "@/lib/server/adminAuth";
import { unsubUrl } from "@/lib/server/newsletterToken";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const BATCH_SIZE = 100; // limite Resend batch.send

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function textToHtml(s: string): string {
  return escapeHtml(s).replace(/\r?\n/g, "<br/>");
}

function wrapHtml(bodyHtml: string, unsub: string): string {
  return `<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;max-width:560px;margin:0 auto;color:#0f172a;line-height:1.6;font-size:15px">
${bodyHtml}
<hr style="margin:24px 0;border:none;border-top:1px solid #e2e8f0"/>
<p style="font-size:12px;color:#64748b;line-height:1.5">
Vous recevez cet email car vous êtes abonné·e aux nouveautés d'<a href="https://www.eleveai.fr" style="color:#0d9488">eleveai.fr</a> (compte ou abonnement au journal).<br/>
EleveAI — La Réunion · <a href="${unsub}" style="color:#0d9488">Se désinscrire</a>
</p>
</div>`;
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export async function POST(req: Request) {
  const cookieStore = await cookies();
  if (!verifyAdminCookieValue(cookieStore.get("admin-auth")?.value)) {
    return NextResponse.json(
      { ok: false, error: "Accès réservé à l'administration." },
      { status: 401 }
    );
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { ok: false, error: "RESEND_API_KEY manquante côté serveur." },
      { status: 500 }
    );
  }

  const body = await req.json().catch(() => ({}));
  const subject = String(body.subject ?? "").trim();
  const message = String(body.message ?? "").trim();
  const mode = body.mode === "all" ? "all" : "test";

  if (subject.length < 3) {
    return NextResponse.json(
      { ok: false, error: "Sujet trop court." },
      { status: 400 }
    );
  }
  if (message.length < 10) {
    return NextResponse.json(
      { ok: false, error: "Message trop court." },
      { status: 400 }
    );
  }

  // Expéditeur : domaine vérifié eleveai.fr, avec un nom d'affichage lisible.
  // On NE retombe PAS sur CONTACT_FROM (qui peut valoir le onboarding@resend.dev
  // de test en production). Surchargeable via NEWSLETTER_FROM.
  const from = process.env.NEWSLETTER_FROM || "EleveAI <contact@eleveai.fr>";
  const replyTo = process.env.CONTACT_TO || undefined;
  const resend = new Resend(process.env.RESEND_API_KEY);
  const bodyHtml = textToHtml(message);

  // ---------- Mode TEST : un seul email, à l'adresse fournie (ou CONTACT_TO) ----------
  if (mode === "test") {
    const testEmail = String(body.testEmail ?? "").trim().toLowerCase();
    if (testEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(testEmail)) {
      return NextResponse.json(
        { ok: false, error: "Adresse de test invalide." },
        { status: 400 }
      );
    }
    const to = testEmail || process.env.CONTACT_TO;
    if (!to) {
      return NextResponse.json(
        { ok: false, error: "Aucune adresse de test (renseigne-en une)." },
        { status: 400 }
      );
    }
    const unsub = unsubUrl(to);
    try {
      const { error } = await resend.emails.send({
        from,
        to,
        replyTo,
        subject: `[TEST] ${subject}`,
        html: wrapHtml(bodyHtml, unsub),
        text: `${message}\n\n—\nSe désinscrire : ${unsub}`,
        headers: { "List-Unsubscribe": `<${unsub}>` },
      });
      if (error) throw new Error(error.message);
      return NextResponse.json({ ok: true, mode: "test", sent: 1, to });
    } catch (e) {
      return NextResponse.json(
        { ok: false, error: e instanceof Error ? e.message : "Erreur d'envoi." },
        { status: 502 }
      );
    }
  }

  // ---------- Mode ALL : tous les consentants ----------
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase
    .from("users_email")
    .select("email")
    .eq("accepte_newsletter", true)
    .not("email", "is", null);

  if (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }

  // + les abonnés SANS compte (coupon du journal, table newsletter_abonnes).
  // Tolérant si la table n'existe pas encore (SQL pas exécuté) : on envoie
  // au moins aux comptes consentants.
  let abonnesJournal: string[] = [];
  try {
    const { data: abonnes } = await supabase
      .from("newsletter_abonnes")
      .select("email")
      .eq("actif", true);
    abonnesJournal = (abonnes ?? []).map((r) => String(r.email ?? ""));
  } catch {
    abonnesJournal = [];
  }

  // Dédoublonne les adresses (compte + abonnement journal = 1 seul envoi).
  const recipients = Array.from(
    new Set(
      [...(data ?? []).map((r) => String(r.email ?? "")), ...abonnesJournal]
        .map((e) => e.trim().toLowerCase())
        .filter(Boolean)
    )
  );

  if (recipients.length === 0) {
    return NextResponse.json(
      { ok: false, error: "Aucun destinataire consentant." },
      { status: 400 }
    );
  }

  let sent = 0;
  let failed = 0;

  for (const group of chunk(recipients, BATCH_SIZE)) {
    const payload = group.map((to) => {
      const unsub = unsubUrl(to);
      return {
        from,
        to,
        replyTo,
        subject,
        html: wrapHtml(bodyHtml, unsub),
        text: `${message}\n\n—\nSe désinscrire : ${unsub}`,
        headers: { "List-Unsubscribe": `<${unsub}>` },
      };
    });

    try {
      const { error: batchError } = await resend.batch.send(payload);
      if (batchError) {
        failed += group.length;
      } else {
        sent += group.length;
      }
    } catch {
      failed += group.length;
    }
  }

  return NextResponse.json({
    ok: true,
    mode: "all",
    total: recipients.length,
    sent,
    failed,
  });
}
