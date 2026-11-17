// « BULLETIN DE LA CLASSE » (17/11/2026) — le prof voit toute SA classe.
// Le calcul (sans IA) est dans lib/server/bulletinClasse.ts, partagé avec
// /api/eleve/ma-ligne (l'élève ne voit que sa ligne).
// Le prof doit POSSÉDER la classe (classes_prof) : aucune donnée d'élève ailleurs.

import { NextResponse } from "next/server";
import { classeDuProf, profDuJeton, supabaseAdmin } from "@/lib/server/classesProf";
import { calculerBulletinClasse } from "@/lib/server/bulletinClasse";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const admin = supabaseAdmin();
  const p = await profDuJeton(admin, req);
  if (!p.ok) return NextResponse.json({ ok: false, error: p.error }, { status: p.status });

  const url = new URL(req.url);
  const code = (url.searchParams.get("code") ?? "").trim().toUpperCase();
  const periode = url.searchParams.get("periode") ?? "trim";
  const classe = await classeDuProf(admin, p.prof.id, code);
  if (!classe) return NextResponse.json({ ok: false, error: "Classe introuvable." }, { status: 404 });

  const b = await calculerBulletinClasse(admin, code, classe.niveau, periode);
  return NextResponse.json({
    ok: true,
    classe: { nom_classe: classe.nom_classe, niveau: classe.niveau, code_etablissement: code },
    ...b,
  });
}
