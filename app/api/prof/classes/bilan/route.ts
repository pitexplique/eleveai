// « BILAN » d'une classe du prof : pour chaque notion travaillée au coach,
// chaque élève × chaque micro → réponses justes / réponses. Lu dans
// resultats_tutor (details.microScores), que le coach remplit désormais tout
// seul (enregistrement automatique, une ligne par séance via seance_id).
// La page /prof/classes/bilan en fait le tableau compris / en cours / pas compris.

import { NextResponse } from "next/server";
import { classeDuProf, profDuJeton, supabaseAdmin } from "@/lib/server/classesProf";
import { getMicroLabelMap, getNotionMicroMap, notionLabel } from "@/lib/tutor-v4/catalog";

export const dynamic = "force-dynamic";

type Score = { attempts?: number; success?: number };

export async function GET(req: Request) {
  const admin = supabaseAdmin();
  const p = await profDuJeton(admin, req);
  if (!p.ok) return NextResponse.json({ ok: false, error: p.error }, { status: p.status });

  const code = (new URL(req.url).searchParams.get("code") ?? "").trim().toUpperCase();
  const classe = await classeDuProf(admin, p.prof.id, code);
  if (!classe) return NextResponse.json({ ok: false, error: "Classe introuvable." }, { status: 404 });

  const [eleves, seances] = await Promise.all([
    admin
      .from("acces_etablissement")
      .select("code_utilisateur, nom")
      .eq("code_etablissement", code)
      .eq("type_utilisateur", "eleve")
      .order("code_utilisateur"),
    admin
      .from("resultats_tutor")
      .select("code_utilisateur, classe, matiere, notion_id, details, created_at")
      .eq("code_etablissement", code)
      .order("created_at", { ascending: false })
      .limit(5000),
  ]);

  // notion (classe|matiere|notion) → { dernière fois, élève → micro → cumul }
  const notions = new Map<
    string,
    { classe: string; matiere: string; notion: string; derniere: string; scores: Record<string, Record<string, { j: number; t: number }>> }
  >();
  for (const s of seances.data ?? []) {
    if (!s.notion_id) continue;
    const cle = `${s.classe}|${s.matiere ?? "maths"}|${s.notion_id}`;
    let n = notions.get(cle);
    if (!n) {
      n = { classe: s.classe, matiere: s.matiere ?? "maths", notion: s.notion_id, derniere: s.created_at, scores: {} };
      notions.set(cle, n);
    }
    const parMicro = ((s.details as any)?.microScores ?? {}) as Record<string, Score>;
    const sien = (n.scores[s.code_utilisateur] ??= {});
    for (const [micro, sc] of Object.entries(parMicro)) {
      const t = Number(sc?.attempts) || 0;
      if (!t) continue;
      const cumul = (sien[micro] ??= { j: 0, t: 0 });
      cumul.t += t;
      cumul.j += Number(sc?.success) || 0;
    }
  }

  const resultat = [...notions.values()].map((n) => {
    let micros: string[] = [];
    let libelles: Record<string, string> = {};
    let titre = n.notion;
    try {
      micros = getNotionMicroMap(n.classe as any, n.matiere as any)[n.notion] ?? [];
      libelles = getMicroLabelMap(n.classe as any, n.matiere as any);
      titre = notionLabel(n.notion, n.classe as any, n.matiere as any);
    } catch {
      /* classe ou matière inconnue du catalogue : on garde les identifiants */
    }
    // Les micros vus dans les séances mais absents du catalogue restent affichés.
    const vus = new Set(Object.values(n.scores).flatMap((m) => Object.keys(m)));
    const ordre = [...micros.filter((m) => vus.has(m)), ...[...vus].filter((m) => !micros.includes(m))];
    return {
      cle: `${n.classe}|${n.matiere}|${n.notion}`,
      titre,
      classe: n.classe,
      derniere: n.derniere,
      micros: ordre.map((id) => ({ id, libelle: libelles[id] ?? id })),
      scores: n.scores,
    };
  });

  return NextResponse.json({
    ok: true,
    classe: { nom_classe: classe.nom_classe, code_etablissement: code },
    eleves: eleves.data ?? [],
    notions: resultat,
  });
}
