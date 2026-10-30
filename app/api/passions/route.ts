// LES PASSIONS DE L'ÉLÈVE CONNECTÉ (30/10/2026) — voir supabase/passions_eleves.sql.
//
// GET  → { ok, passions: string[] | null }   (null = jamais choisies, ou table absente)
// POST { passions: string[] } → { ok, enBase }
//
// Tant que la table n'existe pas, on répond ok avec enBase: false : le
// navigateur garde les passions, l'élève ne voit jamais d'erreur.

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { verifySessionToken } from "@/lib/server/session";
import { MAX_PASSIONS, passionValide } from "@/lib/videos/centres-interet";

export const dynamic = "force-dynamic";

function session(req: Request) {
  const auth = req.headers.get("authorization") ?? "";
  return verifySessionToken(auth.startsWith("Bearer ") ? auth.slice(7) : "");
}

function admin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function GET(req: Request) {
  const s = session(req);
  if (!s) return NextResponse.json({ ok: false, error: "Session expirée." }, { status: 401 });
  const { data, error } = await admin()
    .from("passions_eleves")
    .select("passions")
    .eq("code_etablissement", s.code_etablissement)
    .eq("code_utilisateur", s.code_utilisateur)
    .maybeSingle();
  if (error) return NextResponse.json({ ok: true, passions: null, enBase: false });
  return NextResponse.json({ ok: true, passions: (data?.passions as string[] | undefined) ?? null, enBase: true });
}

export async function POST(req: Request) {
  const s = session(req);
  if (!s) return NextResponse.json({ ok: false, error: "Session expirée." }, { status: 401 });
  const body = await req.json().catch(() => null);
  const brutes: unknown[] = Array.isArray(body?.passions) ? body.passions : [];
  const passions = [...new Set(brutes.filter(passionValide).map((p) => p.trim()))].slice(0, MAX_PASSIONS);
  const { error } = await admin().from("passions_eleves").upsert({
    code_etablissement: s.code_etablissement,
    code_utilisateur: s.code_utilisateur,
    classe: s.classe ?? null,
    passions,
    updated_at: new Date().toISOString(),
  });
  return NextResponse.json({ ok: true, enBase: !error });
}
