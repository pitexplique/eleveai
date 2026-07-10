// app/api/call/route.ts — inscription à un call « En direct ».
// POST { call_id, email, prenom?, role, consentement?, hp } -> insert dans
// call_messages (clé service role, RLS sans policy). Le lien visio n'est
// JAMAIS renvoyé ici : il part par email avant le call.
// Anti-abus : honeypot hp, validation stricte du call (existe + actif + à
// venir), email plafonné, doublon (call_id, email) -> réponse « déjà inscrit ».

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { CALLS, type CallRole } from "@/lib/calls";

const ROLES = new Set<CallRole>(["eleve", "parent", "enseignant", "etablissement"]);

function asString(v: unknown) {
  return String(v ?? "").trim();
}

function emailValide(v: string) {
  return v.length <= 200 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    // Honeypot : un humain ne remplit jamais ce champ caché.
    if (asString(body.hp)) {
      return NextResponse.json({ ok: false, error: "Spam" }, { status: 400 });
    }

    const callId = asString(body.call_id).slice(0, 80);
    const email = asString(body.email).toLowerCase();
    const prenom = asString(body.prenom).slice(0, 80);
    const role = asString(body.role) as CallRole;
    const consentement = body.consentement === true;

    const call = CALLS.find((c) => c.id === callId && c.actif);
    if (!call) {
      return NextResponse.json(
        { ok: false, error: "Call introuvable." },
        { status: 400 }
      );
    }
    if (new Date(call.date).getTime() <= Date.now()) {
      return NextResponse.json(
        { ok: false, error: "Ce call est déjà passé." },
        { status: 400 }
      );
    }
    if (!emailValide(email)) {
      return NextResponse.json(
        { ok: false, error: "Email invalide." },
        { status: 400 }
      );
    }
    if (!ROLES.has(role)) {
      return NextResponse.json(
        { ok: false, error: "Rôle invalide." },
        { status: 400 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { error } = await supabase.from("call_messages").insert({
      call_id: call.id,
      email,
      prenom: prenom || null,
      role,
      consentement_newsletter: consentement,
    });

    // Doublon (index unique call_id + email) : déjà inscrit -> on rassure.
    if (error && error.code === "23505") {
      return NextResponse.json({ ok: true, deja: true });
    }
    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Réessaie dans un instant." },
      { status: 500 }
    );
  }
}
