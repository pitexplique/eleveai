// Classement des eleves par points « avis », dans l'etablissement du jeton.
// Nourrit l'esprit de defi (13/06/2026). RGPD : on n'affiche QUE le prenom
// (la colonne prenom de retours_eleves contient « NOM Prenom », on extrait le
// prenom). Lecture via service role, mais scope force a l'etablissement du jeton.

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { verifySessionToken } from "@/lib/server/session";
import { calculerPointsAvis } from "@/lib/points/feedbackPoints";

// « DUPONT Lucas » -> « Lucas » ; « MAIR Victor Rafael » -> « Victor Rafael ».
// Heuristique : le nom de famille est en MAJUSCULES, le prenom est capitalise.
function prenomCourt(full: string | null): string {
  if (!full) return "Élève";
  const tokens = full.trim().split(/\s+/).filter(Boolean);
  const nonUpper = tokens.filter((t) => t !== t.toUpperCase());
  if (nonUpper.length > 0) return nonUpper.join(" ");
  return tokens[tokens.length - 1] ?? "Élève";
}

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
    .select("code_eleve, prenom, traite")
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
    { code_eleve: string; prenom: string | null; nb: number; nbT: number }
  >();
  for (const r of data ?? []) {
    const key = r.code_eleve as string;
    if (!key) continue;
    const e =
      parEleve.get(key) ?? { code_eleve: key, prenom: r.prenom, nb: 0, nbT: 0 };
    e.nb += 1;
    if (r.traite) e.nbT += 1;
    if (!e.prenom && r.prenom) e.prenom = r.prenom;
    parEleve.set(key, e);
  }

  const classement = [...parEleve.values()]
    .map((e) => ({
      code_eleve: e.code_eleve,
      prenom: prenomCourt(e.prenom),
      points: calculerPointsAvis(e.nb, e.nbT),
    }))
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
