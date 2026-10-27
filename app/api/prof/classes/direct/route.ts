// « EN DIRECT » : les élèves d'une classe du prof et leurs gestes des trois
// dernières heures (coach, vidéos). La page /prof/classes/direct en fait les
// tuiles ; ici, seulement la lecture — le prof doit POSSÉDER la classe.

import { NextResponse } from "next/server";
import { classeDuProf, profDuJeton, supabaseAdmin } from "@/lib/server/classesProf";

export const dynamic = "force-dynamic";

const FENETRE_MS = 3 * 60 * 60 * 1000;

export async function GET(req: Request) {
  const admin = supabaseAdmin();
  const p = await profDuJeton(admin, req);
  if (!p.ok) return NextResponse.json({ ok: false, error: p.error }, { status: p.status });

  const code = (new URL(req.url).searchParams.get("code") ?? "").trim().toUpperCase();
  const classe = await classeDuProf(admin, p.prof.id, code);
  if (!classe) return NextResponse.json({ ok: false, error: "Classe introuvable." }, { status: 404 });

  const [eleves, gestes] = await Promise.all([
    admin
      .from("acces_etablissement")
      .select("code_utilisateur, nom")
      .eq("code_etablissement", code)
      .eq("type_utilisateur", "eleve")
      .order("code_utilisateur"),
    admin
      .from("activite_eleve")
      .select("created_at, code_utilisateur, type, ressource, libelle, juste")
      .eq("code_etablissement", code)
      .gte("created_at", new Date(Date.now() - FENETRE_MS).toISOString())
      .order("created_at", { ascending: false })
      .limit(5000),
  ]);

  if (gestes.error) {
    return NextResponse.json(
      { ok: false, error: "Table activite_eleve absente : exécuter supabase/activite_eleve.sql." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    maintenant: new Date().toISOString(),
    classe: { nom_classe: classe.nom_classe, code_etablissement: code },
    eleves: eleves.data ?? [],
    gestes: gestes.data ?? [],
  });
}
