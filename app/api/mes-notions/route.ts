// « MES NOTIONS » — la version élève du bilan prof (/prof/classes/bilan) :
// pour chaque notion de MATHS travaillée au coach, chaque micro → réponses
// justes / réponses, cumulées sur toutes ses séances (resultats_tutor,
// details.microScores). Le tableau de bord élève en fait la liste
// compris / en cours / pas compris. Seulement les résultats de l'élève du jeton.

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { verifySessionToken } from "@/lib/server/session";
import { getMicroLabelMap, getNotionMicroMap, notionLabel } from "@/lib/tutor-v4/catalog";

export const dynamic = "force-dynamic";

type Score = { attempts?: number; success?: number };

export async function GET(req: Request) {
  const auth = req.headers.get("authorization") ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  const session = verifySessionToken(token);
  if (!session) {
    return NextResponse.json({ ok: false, error: "Session expirée. Reconnecte-toi." }, { status: 401 });
  }

  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await admin
    .from("resultats_tutor")
    .select("classe, matiere, notion_id, details, created_at")
    .eq("code_etablissement", session.code_etablissement)
    .eq("code_utilisateur", session.code_utilisateur)
    .order("created_at", { ascending: false })
    .limit(2000);
  if (error) {
    return NextResponse.json({ ok: false, error: "Impossible de charger tes notions." }, { status: 500 });
  }

  // Titre lisible de chaque notion travaillée (classe|notion → titre), même
  // sans scores par micro : le tableau du Coach et la tuile « Dernier Coach »
  // affichaient sinon l'identifiant brut (« entier_nombre »).
  const titres: Record<string, string> = {};
  for (const s of data ?? []) {
    if (!s.notion_id || (s.matiere ?? "maths") !== "maths") continue;
    const cle = `${s.classe}|${s.notion_id}`;
    if (titres[cle]) continue;
    try {
      titres[cle] = notionLabel(s.notion_id, s.classe as never, "maths");
    } catch {
      titres[cle] = s.notion_id;
    }
  }

  const notions = new Map<
    string,
    { classe: string; notion: string; derniere: string; scores: Record<string, { j: number; t: number }> }
  >();
  for (const s of data ?? []) {
    if (!s.notion_id || (s.matiere ?? "maths") !== "maths") continue;
    const cle = `${s.classe}|${s.notion_id}`;
    let n = notions.get(cle);
    if (!n) {
      n = { classe: s.classe, notion: s.notion_id, derniere: s.created_at, scores: {} };
      notions.set(cle, n);
    }
    const parMicro = ((s.details as { microScores?: Record<string, Score> } | null)?.microScores ?? {});
    for (const [micro, sc] of Object.entries(parMicro)) {
      const t = Number(sc?.attempts) || 0;
      if (!t) continue;
      const cumul = (n.scores[micro] ??= { j: 0, t: 0 });
      cumul.t += t;
      cumul.j += Number(sc?.success) || 0;
    }
  }

  const resultat = [...notions.values()]
    .map((n) => {
      let micros: string[] = [];
      let libelles: Record<string, string> = {};
      let titre = n.notion;
      try {
        micros = getNotionMicroMap(n.classe as never, "maths")[n.notion] ?? [];
        libelles = getMicroLabelMap(n.classe as never, "maths");
        titre = notionLabel(n.notion, n.classe as never, "maths");
      } catch {
        /* classe inconnue du catalogue : on garde les identifiants */
      }
      const vus = Object.keys(n.scores);
      const ordre = [...micros.filter((m) => vus.includes(m)), ...vus.filter((m) => !micros.includes(m))];
      return {
        cle: `${n.classe}|${n.notion}`,
        titre,
        classe: n.classe,
        notionId: n.notion,
        derniere: n.derniere,
        nbMicrosNotion: micros.length,
        micros: ordre.map((id) => ({ id, libelle: libelles[id] ?? id, ...n.scores[id] })),
      };
    })
    .filter((n) => n.micros.length > 0);

  return NextResponse.json({ ok: true, notions: resultat, titres });
}
