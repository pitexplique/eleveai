// /api/aventure — un professeur rejoint l'aventure (une classe offerte).
//
// Même procédé que /api/beta-testeurs : pot de miel, empreinte hachée, une
// candidature par e-mail et par année, et RIEN d'attribué automatiquement.
// Voir supabase/profs_aventure.sql.

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createHash } from "node:crypto";
import { ANNEE_AVENTURE, SLUGS_AVENTURE } from "@/lib/aventure/pays";

export const dynamic = "force-dynamic";

const MAX_MESSAGE = 600;
const MAX_PAR_FENETRE = 3;
const FENETRE_MINUTES = 30;

function texte(v: unknown, max: number): string | null {
  if (typeof v !== "string") return null;
  const t = v.trim().slice(0, max);
  return t || null;
}

/** Une empreinte, PAS une identité — même procédé que /api/signalements. */
function empreinteDe(req: Request): string {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "";
  const ua = req.headers.get("user-agent") ?? "";
  const sel = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "eleveai";
  return createHash("sha256").update(`${sel}|${ip}|${ua}`).digest("hex").slice(0, 24);
}

export async function POST(req: Request) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const cle = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !cle) return NextResponse.json({ ok: false }, { status: 503 });

    const body = await req.json().catch(() => null);

    // Pot de miel : on répond 200 pour ne rien apprendre aux robots.
    if (texte(body?.hp, 50)) return NextResponse.json({ ok: true });

    const pays = texte(body?.pays, 30);
    if (!pays || !SLUGS_AVENTURE.has(pays)) {
      return NextResponse.json({ ok: false, erreur: "pays-inconnu" }, { status: 400 });
    }

    const email = texte(body?.email, 120);
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ ok: false, erreur: "email-invalide" }, { status: 400 });
    }

    const supabase = createClient(url, cle, { auth: { persistSession: false } });
    const empreinte = empreinteDe(req);
    const depuis = new Date(Date.now() - FENETRE_MINUTES * 60_000).toISOString();
    const { count } = await supabase
      .from("profs_aventure")
      .select("id", { count: "exact", head: true })
      .eq("empreinte", empreinte)
      .gte("created_at", depuis);

    if ((count ?? 0) >= MAX_PAR_FENETRE) {
      return NextResponse.json({ ok: false, erreur: "trop-de-candidatures" }, { status: 429 });
    }

    const { error } = await supabase.from("profs_aventure").insert({
      prenom: texte(body?.prenom, 40),
      email,
      pays,
      niveaux: texte(body?.niveaux, 80),
      etablissement: texte(body?.etablissement, 120),
      message: texte(body?.message, MAX_MESSAGE),
      annee: ANNEE_AVENTURE,
      statut: "candidat",
      empreinte,
    });

    if (error) {
      // 23505 = déjà candidat cette année : une information, pas une erreur.
      if (error.code === "23505") {
        return NextResponse.json({ ok: false, erreur: "deja-candidat" }, { status: 409 });
      }
      console.error("aventure POST :", error.message);
      return NextResponse.json({ ok: false }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
