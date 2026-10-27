// « MES CLASSES » d'un prof inscrit par e-mail.
//   GET  : ses classes et, pour chacune, ses élèves (codes + mots de passe,
//          pour réimprimer les cartes).
//   POST : crée une classe et fabrique les comptes de ses élèves dans
//          `acces_etablissement` (voir supabase/classes_prof.sql).

import { NextResponse } from "next/server";
import {
  MAX_ELEVES_PAR_CLASSE,
  NIVEAUX_CLASSE,
  codeDeClasseLibre,
  codeEleve,
  motDePasseSimple,
  prefixeDeClasse,
  profDuJeton,
  supabaseAdmin,
} from "@/lib/server/classesProf";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const admin = supabaseAdmin();
  const p = await profDuJeton(admin, req);
  if (!p.ok) return NextResponse.json({ ok: false, error: p.error }, { status: p.status });

  const { data: classes, error } = await admin
    .from("classes_prof")
    .select("id, created_at, etablissement, nom_classe, niveau, code_etablissement, prefixe_eleves, nb_eleves")
    .eq("prof_id", p.prof.id)
    .eq("archivee", false)
    .order("created_at", { ascending: false });
  if (error) {
    return NextResponse.json(
      { ok: false, error: "Table classes_prof absente : exécuter supabase/classes_prof.sql." },
      { status: 500 }
    );
  }

  const codes = (classes ?? []).map((c) => c.code_etablissement);
  let eleves: any[] = [];
  if (codes.length) {
    const { data } = await admin
      .from("acces_etablissement")
      .select("code_etablissement, code_utilisateur, nom, mot_de_passe, actif")
      .in("code_etablissement", codes)
      .eq("type_utilisateur", "eleve")
      .order("code_utilisateur");
    eleves = data ?? [];
  }

  return NextResponse.json({
    ok: true,
    prof: { nom: p.prof.nom, email: p.prof.email },
    classes: (classes ?? []).map((c) => ({
      ...c,
      eleves: eleves.filter((e) => e.code_etablissement === c.code_etablissement),
    })),
  });
}

export async function POST(req: Request) {
  const admin = supabaseAdmin();
  const p = await profDuJeton(admin, req);
  if (!p.ok) return NextResponse.json({ ok: false, error: p.error }, { status: p.status });

  const body = await req.json().catch(() => ({}));
  const etablissement = String(body.etablissement ?? "").trim().slice(0, 120);
  const nomClasse = String(body.nom_classe ?? "").trim().slice(0, 40);
  const niveau = String(body.niveau ?? "");
  const nb = Math.floor(Number(body.nb_eleves));

  if (!etablissement || !nomClasse) {
    return NextResponse.json({ ok: false, error: "Indique l'établissement et le nom de la classe." }, { status: 400 });
  }
  if (!(NIVEAUX_CLASSE as readonly string[]).includes(niveau)) {
    return NextResponse.json({ ok: false, error: "Choisis le niveau de la classe." }, { status: 400 });
  }
  if (!(nb >= 1 && nb <= MAX_ELEVES_PAR_CLASSE)) {
    return NextResponse.json(
      { ok: false, error: `Le nombre d'élèves va de 1 à ${MAX_ELEVES_PAR_CLASSE}.` },
      { status: 400 }
    );
  }

  const prefixe = prefixeDeClasse(nomClasse);
  const sigle = String(body.sigle ?? "").toUpperCase().replace(/[^A-Z]/g, "").slice(0, 5);
  const code = await codeDeClasseLibre(admin, p.prof, prefixe, etablissement, sigle);

  const { data: classe, error: errClasse } = await admin
    .from("classes_prof")
    .insert({
      prof_id: p.prof.id,
      prof_email: p.prof.email,
      etablissement,
      nom_classe: nomClasse,
      niveau,
      code_etablissement: code,
      prefixe_eleves: prefixe,
      nb_eleves: nb,
    })
    .select("id")
    .single();
  if (errClasse || !classe) {
    return NextResponse.json(
      { ok: false, error: "Création impossible (table classes_prof absente ?)." },
      { status: 500 }
    );
  }

  // Prénoms facultatifs : la ligne porte au moins « Élève 07 ».
  const prenoms: string[] = Array.isArray(body.prenoms) ? body.prenoms.map((x: unknown) => String(x ?? "").trim().slice(0, 40)) : [];
  const lignes = Array.from({ length: nb }, (_, i) => ({
    code_etablissement: code,
    code_utilisateur: codeEleve(prefixe, i + 1),
    type_utilisateur: "eleve",
    nom: prenoms[i] || `Élève ${String(i + 1).padStart(2, "0")}`,
    classe: niveau,
    division: nomClasse,
    mot_de_passe: motDePasseSimple(),
    actif: true,
  }));
  const { error: errEleves } = await admin.from("acces_etablissement").insert(lignes);
  if (errEleves) {
    // Pas de classe sans élèves : on défait.
    await admin.from("classes_prof").delete().eq("id", classe.id);
    return NextResponse.json({ ok: false, error: "Création des comptes élèves impossible." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, code_etablissement: code });
}
