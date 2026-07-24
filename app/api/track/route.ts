// /api/track — journal AGRÉGÉ des pages vues (« où vont les élèves »).
// Appelé en fire-and-forget par PageViewTracker (sendBeacon). RGPD : on ne
// stocke QUE la section (1er segment d'URL) + le code établissement, jamais
// d'identité. Écriture service-role (RLS actif sur pages_vues).

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

function serviceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

// Réduit une URL à sa SECTION : "/dico/maths/6e?x=1" -> "/dico", "/" -> "/".
function toSection(raw: string): string {
  const path = raw.split("?")[0].split("#")[0];
  const seg = path.split("/").filter(Boolean)[0];
  const section = seg ? `/${seg}` : "/";
  return section.slice(0, 40);
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const rawPage = typeof body?.page === "string" ? body.page : "";
    if (!rawPage) return new NextResponse(null, { status: 204 });

    const page = toSection(rawPage);
    // On ne loggue pas l'admin ni les routes techniques.
    if (page.startsWith("/admin") || page.startsWith("/api")) {
      return new NextResponse(null, { status: 204 });
    }

    const etabRaw =
      typeof body?.code_etablissement === "string"
        ? body.code_etablissement.trim().slice(0, 40)
        : "";
    const code_etablissement = etabRaw || null;

    // PROVENANCE (?from=…) : une étiquette courte et bornée, ex. « cahier ».
    // Aucune identité — c'est elle qui rend mesurable le tunnel cahier → coach.
    const srcRaw =
      typeof body?.source === "string"
        ? body.source.trim().toLowerCase().slice(0, 24)
        : "";
    const source = /^[a-z0-9_-]{1,24}$/.test(srcRaw) ? srcRaw : null;

    // Pays du visiteur : en-tête géo injecté GRATUITEMENT par Vercel (même en
    // Hobby) — code ISO à 2 lettres, ex. 'FR', 'RE', 'US'. Pas d'IP, pas
    // d'identité : donnée 100 % agrégée, RGPD clean. Null hors Vercel (dev).
    const paysRaw = req.headers.get("x-vercel-ip-country") || "";
    const pays = paysRaw.trim().slice(0, 2).toUpperCase() || null;

    const supabase = serviceClient();
    const { error } = await supabase
      .from("pages_vues")
      .insert({ page, code_etablissement, pays, source });
    // Repli si la colonne `source` n'existe pas encore en base (migration pas
    // jouée) : on réécrit SANS elle, plutôt que de perdre la vue en silence.
    if (error) {
      await supabase.from("pages_vues").insert({ page, code_etablissement, pays });
    }
  } catch {
    // Silencieux : le tracking ne doit JAMAIS casser la navigation de l'élève.
  }
  return new NextResponse(null, { status: 204 });
}
