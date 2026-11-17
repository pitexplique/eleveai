// « MA LIGNE DU BULLETIN » (17/11/2026) — l'élève connecté voit SA ligne du
// bulletin que voit son prof (moyenne du coach, séances, matin / soir,
// acquis / à revoir, appréciation sans IA), sa place s'il est sur le podium
// et SES médailles. ⛔ Jamais les autres élèves : seul son code est renvoyé.
// Seulement pour une classe créée dans « Mes classes » (classes_prof).

import { NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/server/session";
import { supabaseAdmin } from "@/lib/server/classesProf";
import { calculerBulletinClasse } from "@/lib/server/bulletinClasse";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const auth = req.headers.get("authorization") ?? "";
  const session = verifySessionToken(auth.startsWith("Bearer ") ? auth.slice(7) : "");
  if (!session) return NextResponse.json({ ok: false, error: "Session expirée." }, { status: 401 });
  if (session.type_utilisateur !== "eleve") return NextResponse.json({ ok: true, ligne: null });

  const admin = supabaseAdmin();
  const code = session.code_etablissement;
  const { data: classe } = await admin
    .from("classes_prof")
    .select("nom_classe, niveau")
    .eq("code_etablissement", code)
    .maybeSingle();
  if (!classe) return NextResponse.json({ ok: true, ligne: null });

  const b = await calculerBulletinClasse(admin, code, classe.niveau, "trim");
  const moi = session.code_utilisateur;
  const ligne = b.eleves.find((e) => e.code_utilisateur === moi) ?? null;
  if (!ligne) return NextResponse.json({ ok: true, ligne: null });

  const place = (c: typeof b.semaine) => {
    const i = c.podium.findIndex((p) => p.code_utilisateur === moi);
    return i >= 0 ? i + 1 : null;
  };
  const medailles = (c: typeof b.semaine) =>
    c.medailles.filter((m) => m.code_utilisateur === moi).map(({ id, emoji, titre, texte }) => ({ id, emoji, titre, texte }));

  return NextResponse.json({
    ok: true,
    classe: classe.nom_classe,
    ligne: {
      moyenne: ligne.moyenne,
      seances: ligne.seances,
      questions: ligne.questions,
      videos: ligne.videos,
      jours: ligne.jours,
      creneaux: ligne.creneaux,
      compris: ligne.compris,
      aRevoir: ligne.aRevoir,
      appreciation: ligne.appreciation,
    },
    semaine: { place: place(b.semaine), medailles: medailles(b.semaine) },
    mois: { place: place(b.mois), medailles: medailles(b.mois) },
  });
}
