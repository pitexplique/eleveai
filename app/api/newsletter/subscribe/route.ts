// Abonnement à la newsletter depuis le journal (accueil).
// POST /api/newsletter/subscribe { email, hp }
//   - email d'un COMPTE existant (users_email) → accepte_newsletter = true ;
//   - email inconnu → upsert dans newsletter_abonnes (actif = true).
//     (users_email exige auth_user_id : un abonné sans compte vit dans
//      newsletter_abonnes — cf. supabase/newsletter_abonnes.sql.)
// Le champ hp est un pot de miel anti-bot : rempli = on répond ok sans rien
// écrire. La désinscription (/api/newsletter/unsubscribe, jeton HMAC dans
// chaque email) met à jour les deux tables.

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  let body: { email?: string; hp?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 400 });
  }

  // Pot de miel : un bot qui remplit le champ caché reçoit un faux succès.
  if (body.hp) return NextResponse.json({ ok: true });

  const email = (body.email ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email) || email.length > 200) {
    return NextResponse.json(
      { ok: false, error: "Adresse email invalide." },
      { status: 400 }
    );
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: existant, error: selErr } = await supabase
    .from("users_email")
    .select("id, accepte_newsletter")
    .eq("email", email)
    .maybeSingle();

  if (selErr) {
    return NextResponse.json(
      { ok: false, error: "Réessaie dans un instant." },
      { status: 500 }
    );
  }

  if (existant) {
    if (existant.accepte_newsletter) {
      return NextResponse.json({ ok: true, deja: true });
    }
    const { error } = await supabase
      .from("users_email")
      .update({ accepte_newsletter: true })
      .eq("id", existant.id);
    if (error) {
      return NextResponse.json(
        { ok: false, error: "Réessaie dans un instant." },
        { status: 500 }
      );
    }
    return NextResponse.json({ ok: true });
  }

  // Pas de compte → abonné « journal ». Upsert : se réabonner réactive.
  const { error: insErr } = await supabase
    .from("newsletter_abonnes")
    .upsert(
      { email, source: "journal", actif: true, updated_at: new Date().toISOString() },
      { onConflict: "email" }
    );
  if (insErr) {
    return NextResponse.json(
      { ok: false, error: "Réessaie dans un instant." },
      { status: 500 }
    );
  }
  return NextResponse.json({ ok: true });
}
