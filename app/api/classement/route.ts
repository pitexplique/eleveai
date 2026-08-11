// Classement des eleves par points « avis », dans l'etablissement du jeton.
// Nourrit l'esprit de defi (13/06/2026). RGPD : on n'affiche QUE le prenom
// (la colonne prenom de retours_eleves contient « NOM Prenom », on extrait le
// prenom). Lecture via service role, mais scope force a l'etablissement du jeton.

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { verifySessionToken } from "@/lib/server/session";
import { calculerPointsAvis } from "@/lib/points/feedbackPoints";
import { pointsSignalementsParEleve } from "@/lib/points/signalementPoints";
import { estProbablementIA } from "@/lib/detection-ia";
// « PONTALBA TURPIN Kathalynna » -> « Kathalynna » : prenom seul, jamais le nom
// de famille (RGPD). Heuristique partagee, voir lib/prenom.ts.
import { prenomCourt, prenomFromNom } from "@/lib/prenom";

export async function GET(req: Request) {
  const auth = req.headers.get("authorization") ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  const session = verifySessionToken(token);
  if (!session) {
    return NextResponse.json(
      { ok: false, error: "Session expirée. Reconnecte-toi." },
      { status: 401 }
    );
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase
    .from("retours_eleves")
    .select("code_eleve, prenom, message, traite, a_lhonneur")
    .eq("code_etablissement", session.code_etablissement)
    .not("code_eleve", "is", null)
    .limit(20000);

  if (error) {
    return NextResponse.json(
      { ok: false, error: "Impossible de charger le classement." },
      { status: 500 }
    );
  }

  // Agrégation par élève (code_eleve unique).
  const parEleve = new Map<
    string,
    { code_eleve: string; prenom: string | null; nb: number; nbT: number; nbH: number }
  >();
  for (const r of data ?? []) {
    const key = r.code_eleve as string;
    if (!key) continue;
    // Un retour « IA probable » ne rapporte aucun point dans le classement.
    if (estProbablementIA(r.message)) continue;
    const e =
      parEleve.get(key) ?? { code_eleve: key, prenom: r.prenom, nb: 0, nbT: 0, nbH: 0 };
    e.nb += 1;
    if (r.traite) e.nbT += 1;
    if (r.a_lhonneur) e.nbH += 1;
    if (!e.prenom && r.prenom) e.prenom = r.prenom;
    parEleve.set(key, e);
  }

  // 11/08 : les signalements retenus entrent dans le classement. Un élève peut
  // n'avoir QUE des signalements (jamais d'avis) : il n'est alors pas dans la
  // carte ci-dessus, et son prénom n'est nulle part — on va le chercher dans
  // acces_etablissement, seul endroit qui le connaisse.
  const pointsSignalements = await pointsSignalementsParEleve(
    supabase,
    session.code_etablissement
  );

  const inconnus = [...pointsSignalements.keys()].filter((c) => !parEleve.has(c));
  const nomsDeSecours = new Map<string, string | null>();
  if (inconnus.length > 0) {
    const { data: comptes } = await supabase
      .from("acces_etablissement")
      .select("code_utilisateur, nom")
      .eq("code_etablissement", session.code_etablissement)
      .in("code_utilisateur", inconnus);
    for (const c of comptes ?? []) {
      nomsDeSecours.set(c.code_utilisateur as string, prenomFromNom(c.nom as string | null));
    }
  }

  const classement = [
    ...[...parEleve.values()].map((e) => ({
      code_eleve: e.code_eleve,
      prenom: prenomCourt(e.prenom),
      points:
        calculerPointsAvis(e.nb, e.nbT, e.nbH) +
        (pointsSignalements.get(e.code_eleve) ?? 0),
    })),
    // Ceux qui n'ont jamais donné d'avis mais ont signalé : « Élève » si son
    // prénom reste introuvable, jamais un nom de famille.
    ...inconnus.map((code) => ({
      code_eleve: code,
      prenom: nomsDeSecours.get(code) ?? "Élève",
      points: pointsSignalements.get(code) ?? 0,
    })),
  ]
    .filter((e) => e.points > 0)
    .sort((a, b) => b.points - a.points);

  const top = classement.slice(0, 10).map((e, i) => ({
    rang: i + 1,
    prenom: e.prenom,
    points: e.points,
    moi: e.code_eleve === session.code_utilisateur,
  }));

  const moiIndex = classement.findIndex(
    (e) => e.code_eleve === session.code_utilisateur
  );

  return NextResponse.json({
    ok: true,
    top,
    monRang: moiIndex >= 0 ? moiIndex + 1 : null,
    mesPoints: moiIndex >= 0 ? classement[moiIndex].points : 0,
    total: classement.length,
  });
}
