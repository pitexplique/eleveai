// /api/aventure — un professeur rejoint l'aventure (une classe offerte).
//
// Même procédé que /api/beta-testeurs : pot de miel, empreinte hachée, une
// candidature par e-mail et par année, et RIEN d'attribué automatiquement.
// Voir supabase/profs_aventure.sql.

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createHash } from "node:crypto";
import { Resend } from "resend";
import { ANNEE_AVENTURE, PAYS_AVENTURE, SLUGS_AVENTURE } from "@/lib/aventure/pays";

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

/**
 * Prévient Frédéric par e-mail (CONTACT_TO). « Répondre » écrit directement au
 * prof. Un e-mail qui échoue ne fait pas échouer l'inscription : elle est déjà
 * dans la table, et /admin/aventure la montre.
 */
async function prevenir(d: {
  prenom: string | null;
  email: string;
  pays: string;
  niveaux: string | null;
  etablissement: string | null;
  message: string | null;
}) {
  const cle = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  if (!cle || !to) return;
  const nomPays = PAYS_AVENTURE.find((p) => p.slug === d.pays)?.nom ?? d.pays;
  const lignes = [
    `Pays : ${nomPays}`,
    `Prénom : ${d.prenom ?? "—"}`,
    `E-mail : ${d.email}`,
    `Classe : ${d.niveaux ?? "—"}`,
    `Établissement : ${d.etablissement ?? "—"}`,
    "",
    d.message ?? "(pas de message)",
    "",
    "Accepter ou refuser : https://www.eleveai.fr/admin/aventure",
  ];
  try {
    const { error } = await new Resend(cle).emails.send({
      from: process.env.NEWSLETTER_FROM || "EleveAI <contact@eleveai.fr>",
      to,
      replyTo: d.email,
      subject: `🌍 Aventure : un prof de ${nomPays} veut rejoindre`,
      text: lignes.join("\n"),
    });
    if (error) console.error("aventure e-mail :", error.message);
  } catch (e) {
    console.error("aventure e-mail :", e);
  }
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

    const demande = {
      prenom: texte(body?.prenom, 40),
      email,
      pays,
      niveaux: texte(body?.niveaux, 80),
      etablissement: texte(body?.etablissement, 120),
      message: texte(body?.message, MAX_MESSAGE),
    };
    const { error } = await supabase.from("profs_aventure").insert({
      ...demande,
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

    await prevenir(demande);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
