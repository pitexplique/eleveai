// /api/beta-testeurs — les 50 places de la bêta 2026-2027.
//
// GET  : combien de places restent, par groupe. Aucune donnée personnelle,
//        que des nombres — c'est ce que la page affiche en direct. « 37 places
//        sur 50 » fait candidater aujourd'hui ; « nous cherchons des bêta
//        testeurs » fait revenir plus tard.
// POST : une candidature. On n'attribue RIEN automatiquement : Frédéric accepte
//        à la main, parce que la répartition des groupes ne tient que si
//        quelqu'un choisit. Une candidature n'est donc jamais une place.
//
// RGPD : prénom seul, jamais de nom de famille. Aucune IP en clair.
// Voir supabase/beta_testeurs.sql.

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createHash } from "node:crypto";
import { ANNEE_BETA, GROUPES, PLACES, TOTAL_PLACES, placeDe } from "@/lib/beta/places";

export const dynamic = "force-dynamic";

const MAX_MOTIVATION = 600;
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

function client() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const cle = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !cle) return null;
  return createClient(url, cle, { auth: { persistSession: false } });
}

/**
 * Le compteur. Seules les candidatures ACCEPTÉES prennent une place — sinon
 * dix candidatures en attente afficheraient une bêta complète qui ne l'est pas.
 */
export async function GET() {
  const vide = PLACES.map((p) => ({
    groupe: p.groupe,
    places: p.places,
    prises: 0,
    restantes: p.places,
  }));

  const supabase = client();
  if (!supabase) {
    return NextResponse.json({ ok: true, total: TOTAL_PLACES, prises: 0, groupes: vide });
  }

  const { data, error } = await supabase
    .from("beta_testeurs")
    .select("groupe")
    .eq("annee", ANNEE_BETA)
    .eq("statut", "accepte");

  if (error) {
    // Un compteur indisponible ne doit pas empêcher de candidater : on rend la
    // bêta ouverte plutôt que de casser la page.
    console.error("beta-testeurs GET :", error.message);
    return NextResponse.json({ ok: true, total: TOTAL_PLACES, prises: 0, groupes: vide });
  }

  const parGroupe = new Map<string, number>();
  for (const l of data ?? []) {
    parGroupe.set(l.groupe as string, (parGroupe.get(l.groupe as string) ?? 0) + 1);
  }

  const groupes = PLACES.map((p) => {
    const prises = Math.min(parGroupe.get(p.groupe) ?? 0, p.places);
    return { groupe: p.groupe, places: p.places, prises, restantes: p.places - prises };
  });

  return NextResponse.json({
    ok: true,
    total: TOTAL_PLACES,
    prises: groupes.reduce((s, g) => s + g.prises, 0),
    groupes,
  });
}

export async function POST(req: Request) {
  try {
    const supabase = client();
    if (!supabase) return NextResponse.json({ ok: false }, { status: 503 });

    const body = await req.json().catch(() => null);

    // Pot de miel : invisible pour un humain, rempli par les robots. On répond
    // 200 pour ne rien leur apprendre.
    if (texte(body?.hp, 50)) return NextResponse.json({ ok: true });

    const groupe = texte(body?.groupe, 20);
    if (!groupe || !GROUPES.has(groupe)) {
      return NextResponse.json({ ok: false, erreur: "groupe-inconnu" }, { status: 400 });
    }

    const emailBrut = texte(body?.email, 120);
    const email = emailBrut && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(emailBrut) ? emailBrut : null;
    if (emailBrut && !email) {
      return NextResponse.json({ ok: false, erreur: "email-invalide" }, { status: 400 });
    }

    const codeEtab = texte(body?.codeEtablissement, 40);
    const codeUtil = texte(body?.codeUtilisateur, 40);
    const parCompte = Boolean(codeEtab && codeUtil);

    if (!email && !parCompte) {
      return NextResponse.json({ ok: false, erreur: "contact-manquant" }, { status: 400 });
    }

    // Le niveau doit appartenir au groupe choisi : un « élève au lycée » qui
    // déclare le CE1 s'est trompé de case, et la répartition ne veut plus rien
    // dire. Un groupe sans liste (les profs) n'en demande pas.
    const attendus = placeDe(groupe)?.niveaux ?? [];
    const niveau = texte(body?.niveau, 20);
    if (attendus.length > 0 && (!niveau || !attendus.includes(niveau))) {
      return NextResponse.json({ ok: false, erreur: "niveau-invalide" }, { status: 400 });
    }

    const empreinte = empreinteDe(req);
    const depuis = new Date(Date.now() - FENETRE_MINUTES * 60_000).toISOString();
    const { count } = await supabase
      .from("beta_testeurs")
      .select("id", { count: "exact", head: true })
      .eq("empreinte", empreinte)
      .gte("created_at", depuis);

    if ((count ?? 0) >= MAX_PAR_FENETRE) {
      return NextResponse.json({ ok: false, erreur: "trop-de-candidatures" }, { status: 429 });
    }

    const { error } = await supabase.from("beta_testeurs").insert({
      email,
      code_etablissement: parCompte ? codeEtab : null,
      code_utilisateur: parCompte ? codeUtil : null,
      prenom: texte(body?.prenom, 40),
      groupe,
      niveau: attendus.length > 0 ? niveau : null,
      motivation: texte(body?.motivation, MAX_MOTIVATION),
      annee: ANNEE_BETA,
      statut: "candidat",
      empreinte,
    });

    if (error) {
      // 23505 = violation d'index unique : la personne a déjà candidaté cette
      // année. Ce n'est pas une erreur pour elle, c'est une information.
      if (error.code === "23505") {
        return NextResponse.json({ ok: false, erreur: "deja-candidat" }, { status: 409 });
      }
      console.error("beta-testeurs POST :", error.message);
      return NextResponse.json({ ok: false }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
