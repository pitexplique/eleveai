// GET ?code=CSJ4A : les cartes de connexion de cette classe, en PDF à
// télécharger (28/10/2026). Seulement pour le prof qui l'a créée.

import { NextResponse } from "next/server";
import { profDuJeton, supabaseAdmin } from "@/lib/server/classesProf";
import { fabriquerCartesPdf } from "@/lib/server/cartesPdf";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const admin = supabaseAdmin();
  const p = await profDuJeton(admin, req);
  if (!p.ok) return NextResponse.json({ ok: false, error: p.error }, { status: p.status });

  const url = new URL(req.url);
  const code = (url.searchParams.get("code") ?? "").toUpperCase().slice(0, 20);
  const { data: classe } = await admin
    .from("classes_prof")
    .select("nom_classe, code_etablissement")
    .eq("prof_id", p.prof.id)
    .eq("code_etablissement", code)
    .eq("archivee", false)
    .maybeSingle();
  if (!classe) return NextResponse.json({ ok: false, error: "Classe introuvable." }, { status: 404 });

  const { data: eleves } = await admin
    .from("acces_etablissement")
    .select("code_utilisateur, nom, mot_de_passe")
    .eq("code_etablissement", code)
    .eq("type_utilisateur", "eleve")
    .order("code_utilisateur");

  const octets = await fabriquerCartesPdf({
    nomClasse: classe.nom_classe,
    codeClasse: classe.code_etablissement,
    eleves: eleves ?? [],
    origine: url.origin,
  });
  const nom = `cartes-eleveai-${classe.nom_classe}-${code}`
    .normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^A-Za-z0-9-]+/g, "-");

  return new Response(octets as unknown as BodyInit, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${nom}.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}
