// ✉️ MESSAGE À LA CLASSE — côté ÉLÈVE (24/11/2026).
// GET  : les messages de SA classe (le code de classe vient du JETON, jamais
//        de l'URL), avec « lu » ou « nouveau ».
// POST : { id } → « J'ai lu » (seulement un message de SA classe).
// ⛔ Sens unique : l'élève ne peut pas répondre.

import { NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/server/session";
import { supabaseAdmin } from "@/lib/server/classesProf";
import { purgerVieuxMessages, VISIBLE_ELEVE_MS } from "@/lib/server/messagesClasse";

export const dynamic = "force-dynamic";

// ⭐ 24/11 — Frédéric : « 7 j, effacé à 30 j ». L'élève voit 7 jours.
const DUREE_MS = VISIBLE_ELEVE_MS;

function eleveDuJeton(req: Request) {
  const auth = req.headers.get("authorization") ?? "";
  const s = verifySessionToken(auth.startsWith("Bearer ") ? auth.slice(7) : "");
  if (!s || s.type_utilisateur !== "eleve" || !s.code_etablissement) return null;
  return s;
}

export async function GET(req: Request) {
  const s = eleveDuJeton(req);
  if (!s) return NextResponse.json({ ok: true, messages: [] });

  const admin = supabaseAdmin();
  await purgerVieuxMessages(admin);
  const { data: classe } = await admin
    .from("classes_prof")
    .select("nom_classe")
    .eq("code_etablissement", s.code_etablissement)
    .maybeSingle();
  if (!classe) return NextResponse.json({ ok: true, messages: [] });

  const { data: messages, error } = await admin
    .from("messages_classe")
    .select("id, created_at, texte")
    .eq("code_etablissement", s.code_etablissement)
    .gte("created_at", new Date(Date.now() - DUREE_MS).toISOString())
    .order("created_at", { ascending: false })
    .limit(5);
  if (error || !messages?.length) return NextResponse.json({ ok: true, messages: [] });

  const { data: lus } = await admin
    .from("messages_classe_lus")
    .select("message_id")
    .eq("code_utilisateur", s.code_utilisateur)
    .in("message_id", messages.map((m) => m.id));
  const dejaLus = new Set((lus ?? []).map((l) => l.message_id));

  return NextResponse.json({
    ok: true,
    classe: classe.nom_classe,
    messages: messages.map((m) => ({ ...m, lu: dejaLus.has(m.id) })),
  });
}

export async function POST(req: Request) {
  const s = eleveDuJeton(req);
  if (!s) return NextResponse.json({ ok: false, error: "Session expirée." }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const id = typeof body?.id === "string" ? body.id : "";
  if (!/^[0-9a-f-]{36}$/i.test(id)) return NextResponse.json({ ok: false }, { status: 400 });

  const admin = supabaseAdmin();
  const { data: m } = await admin
    .from("messages_classe")
    .select("id")
    .eq("id", id)
    .eq("code_etablissement", s.code_etablissement)
    .maybeSingle();
  if (!m) return NextResponse.json({ ok: false }, { status: 404 });

  await admin
    .from("messages_classe_lus")
    .upsert({ message_id: id, code_utilisateur: s.code_utilisateur }, { onConflict: "message_id,code_utilisateur", ignoreDuplicates: true });
  return NextResponse.json({ ok: true });
}
