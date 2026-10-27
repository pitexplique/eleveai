// Un élève d'une classe du prof : nouveau mot de passe, prénom, ou ajout d'un
// élève en fin de liste. Le prof doit POSSÉDER le code de classe
// (classes_prof), jamais seulement se dire prof.

import { NextResponse } from "next/server";
import {
  MAX_ELEVES_PAR_CLASSE,
  classeDuProf,
  codeEleve,
  motDePasseSimple,
  profDuJeton,
  supabaseAdmin,
} from "@/lib/server/classesProf";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const admin = supabaseAdmin();
  const p = await profDuJeton(admin, req);
  if (!p.ok) return NextResponse.json({ ok: false, error: p.error }, { status: p.status });

  const body = await req.json().catch(() => ({}));
  const code = String(body.code_etablissement ?? "").trim().toUpperCase();
  const classe = await classeDuProf(admin, p.prof.id, code);
  if (!classe) return NextResponse.json({ ok: false, error: "Classe introuvable." }, { status: 404 });

  const action = String(body.action ?? "");

  if (action === "ajouter") {
    const { data: existants } = await admin
      .from("acces_etablissement")
      .select("code_utilisateur")
      .eq("code_etablissement", code)
      .eq("type_utilisateur", "eleve");
    const n = (existants ?? []).length;
    if (n >= MAX_ELEVES_PAR_CLASSE) {
      return NextResponse.json({ ok: false, error: "La classe est pleine." }, { status: 400 });
    }
    const pris = new Set((existants ?? []).map((e) => e.code_utilisateur));
    let numero = 1;
    while (pris.has(codeEleve(classe.prefixe_eleves, numero))) numero++;
    const { error } = await admin.from("acces_etablissement").insert({
      code_etablissement: code,
      code_utilisateur: codeEleve(classe.prefixe_eleves, numero),
      type_utilisateur: "eleve",
      nom: `Élève ${String(numero).padStart(2, "0")}`,
      classe: classe.niveau,
      division: classe.nom_classe,
      mot_de_passe: motDePasseSimple(),
      actif: true,
    });
    if (error) return NextResponse.json({ ok: false, error: "Ajout impossible." }, { status: 500 });
    await admin.from("classes_prof").update({ nb_eleves: n + 1 }).eq("id", classe.id);
    return NextResponse.json({ ok: true });
  }

  if (action !== "nouveau-mdp" && action !== "prenom") {
    return NextResponse.json({ ok: false, error: "Action inconnue." }, { status: 400 });
  }
  const codeUtilisateur = String(body.code_utilisateur ?? "").trim().toUpperCase();
  const { error } = await admin
    .from("acces_etablissement")
    .update(
      action === "nouveau-mdp"
        ? { mot_de_passe: motDePasseSimple() }
        : { nom: String(body.nom ?? "").trim().slice(0, 40) || codeUtilisateur }
    )
    .eq("code_etablissement", code)
    .eq("code_utilisateur", codeUtilisateur)
    .eq("type_utilisateur", "eleve");
  if (error) return NextResponse.json({ ok: false, error: "Modification impossible." }, { status: 500 });
  return NextResponse.json({ ok: true });
}
