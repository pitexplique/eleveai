// LES PASSIONS DE L'ÉLÈVE CONNECTÉ (30/10/2026) — voir supabase/passions_eleves.sql.
//
// GET  → { ok, passions: string[] | null, avatar: string | null }   (null = jamais choisi, ou table absente)
// POST { passions?: string[], avatar?: string } → { ok, enBase } — seul ce qui est envoyé change
// (l'avatar : lib/avatars.ts, 31/10/2026).
//
// Tant que la table n'existe pas, on répond ok avec enBase: false : le
// navigateur garde les passions, l'élève ne voit jamais d'erreur.

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { verifySessionToken } from "@/lib/server/session";
import { MAX_PASSIONS, passionValide } from "@/lib/videos/centres-interet";
import { avatarValide } from "@/lib/avatars";

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
    .select("*")
    .eq("code_etablissement", s.code_etablissement)
    .eq("code_utilisateur", s.code_utilisateur)
    .maybeSingle();
  if (error) return NextResponse.json({ ok: true, passions: null, enBase: false });
  return NextResponse.json({
    ok: true,
    passions: (data?.passions as string[] | undefined) ?? null,
    // « select * » : la colonne avatar peut manquer tant que le SQL n'est pas rejoué.
    avatar: (data?.avatar as string | null | undefined) ?? null,
    enBase: true,
  });
}

export async function POST(req: Request) {
  const s = session(req);
  if (!s) return NextResponse.json({ ok: false, error: "Session expirée." }, { status: 401 });
  const body = await req.json().catch(() => null);
  const ligne: Record<string, unknown> = {
    code_etablissement: s.code_etablissement,
    code_utilisateur: s.code_utilisateur,
    classe: s.classe ?? null,
    updated_at: new Date().toISOString(),
  };
  if (Array.isArray(body?.passions)) {
    const brutes: unknown[] = body.passions;
    ligne.passions = [...new Set(brutes.filter(passionValide).map((p) => p.trim()))].slice(0, MAX_PASSIONS);
  }
  if (avatarValide(body?.avatar)) ligne.avatar = body.avatar;
  // Upsert : sur une ligne existante, seules les colonnes envoyées changent.
  const { error } = await admin().from("passions_eleves").upsert(ligne);
  return NextResponse.json({ ok: true, enBase: !error });
}
