// Lecture des données dashboards (élève, prof, principal).
// Remplace les selects Supabase directs depuis le navigateur, bloqués
// depuis l'activation du RLS. Le périmètre dépend du rôle porté par le
// jeton de session signé :
//   - élève / perso : uniquement SES résultats (colonnes détaillées) ;
//   - prof / principal / boss : comptes + résultats de SON établissement.
// Un élève ne peut donc plus lire les résultats des autres, ni un prof
// ceux d'un autre établissement.

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { verifySessionToken } from "@/lib/server/session";
import { calculerPointsAvis } from "@/lib/points/feedbackPoints";
import { pointsSignalementsDe } from "@/lib/points/signalementPoints";
import { estProbablementIA } from "@/lib/detection-ia";

const ROLES_ETABLISSEMENT = new Set(["prof", "principal", "boss"]);

// Colonnes par table : détaillées (dashboard élève, avec details) et
// synthétiques (dashboards prof/principal, sans details — trop lourd à
// l'échelle d'un établissement).
const COLONNES = {
  eleve: {
    parcours:
      "id, code_etablissement, code_utilisateur, nom, classe, niveau, matiere, score, total, pourcentage, details, created_at",
    calcul_rapide:
      "id, code_etablissement, code_utilisateur, nom, classe, niveau, matiere, session_id, titre_session, theme, score, total, pourcentage, temps_total_sec, details, created_at",
    defis_jour:
      "id, code_etablissement, code_utilisateur, nom, classe, niveau, matiere, defi_id, titre_defi, theme, direction_id, direction_label, direction_type, score, total, pourcentage, reponse_eleve, reponse_attendue, details, created_at",
    english_maths:
      "id, code_etablissement, code_utilisateur, nom, niveau, jour, theme, score, total, pourcentage, created_at",
    dictee:
      "id, code_etablissement, code_utilisateur, nom, classe, score, total, pourcentage, details, created_at",
    langue_du_jour:
      "id, code_etablissement, code_utilisateur, nom, langue, niveau, score, total, pourcentage, details, created_at",
    tutor:
      "id, code_etablissement, code_utilisateur, nom, classe, matiere, notion_id, mode, score_sur_20, earned_points, possible_points, bonnes_reponses, nb_tentatives, temps_sec, details, created_at",
  },
  etablissement: {
    parcours:
      "id, code_etablissement, code_utilisateur, nom, classe, niveau, matiere, score, total, pourcentage, created_at",
    calcul_rapide:
      "id, code_etablissement, code_utilisateur, nom, classe, niveau, matiere, titre_session, theme, score, total, pourcentage, created_at",
    defis_jour:
      "id, code_etablissement, code_utilisateur, nom, titre_defi, theme, score, total, pourcentage, created_at",
    english_maths:
      "id, code_etablissement, code_utilisateur, nom, jour, theme, score, total, pourcentage, created_at",
    dictee:
      "id, code_etablissement, code_utilisateur, nom, classe, score, total, pourcentage, created_at",
    langue_du_jour:
      "id, code_etablissement, code_utilisateur, nom, langue, niveau, score, total, pourcentage, created_at",
    tutor:
      "id, code_etablissement, code_utilisateur, nom, classe, notion_id, mode, score_sur_20, bonnes_reponses, nb_tentatives, details, created_at",
  },
};

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

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const etabScope = ROLES_ETABLISSEMENT.has(session.type_utilisateur);
  const cols = etabScope ? COLONNES.etablissement : COLONNES.eleve;

  // Élève : filtre (établissement + code). Prof/principal : établissement.
  function query(table: string, select: string) {
    let q = supabaseAdmin
      .from(table)
      .select(select)
      .eq("code_etablissement", session!.code_etablissement)
      .order("created_at", { ascending: false })
      .limit(5000);
    if (!etabScope) {
      q = q.eq("code_utilisateur", session!.code_utilisateur);
    }
    return q;
  }

  const [
    comptesRes,
    parcoursMathsRes,
    parcoursEnglishRes,
    parcoursEspagnolRes,
    parcoursFrancaisRes,
    calculRes,
    defisRes,
    englishRes,
    dicteeRes,
    langueRes,
    tutorRes,
  ] = await Promise.all([
    etabScope
      ? supabaseAdmin
          .from("acces_etablissement")
          .select(
            "id, code_etablissement, code_utilisateur, type_utilisateur, nom, classe, actif, created_at"
          )
          .eq("code_etablissement", session.code_etablissement)
          .order("type_utilisateur")
          .order("nom")
      : Promise.resolve({ data: [], error: null }),
    query("resultats_parcours_maths", cols.parcours),
    query("resultats_parcours_english", cols.parcours),
    query("resultats_parcours_espagnol", cols.parcours),
    query("resultats_parcours_francais", cols.parcours),
    query("resultats_calcul_rapide", cols.calcul_rapide),
    query("resultats_defis_jour", cols.defis_jour),
    query("resultats_english_maths", cols.english_maths),
    query("resultats_dictee", cols.dictee),
    query("resultats_langue_du_jour", cols.langue_du_jour),
    query("resultats_tutor", cols.tutor),
  ]);

  if (
    comptesRes.error ||
    parcoursMathsRes.error ||
    calculRes.error ||
    defisRes.error ||
    englishRes.error ||
    tutorRes.error
  ) {
    return NextResponse.json(
      { ok: false, error: "Impossible de charger le dashboard." },
      { status: 500 }
    );
  }

  // Parcours English/Espagnol : tables optionnelles (créées séparément).
  // Une erreur (table absente) ne doit pas bloquer le dashboard.

  // Points « Mon avis » de l'élève : calculés depuis ses retours.
  let pointsAvis = 0;
  if (!etabScope) {
    const { data: retours } = await supabaseAdmin
      .from("retours_eleves")
      .select("message, traite, a_lhonneur")
      .eq("code_etablissement", session.code_etablissement)
      .eq("code_eleve", session.code_utilisateur);
    // Les retours « IA probable » ne comptent pas dans les points (anti-farming).
    const valides = (retours ?? []).filter((r) => !estProbablementIA(r.message));
    pointsAvis = calculerPointsAvis(
      valides.length,
      valides.filter((r) => r.traite).length,
      valides.filter((r) => r.a_lhonneur).length
    );
    // 11/08 : les signalements retenus comptent enfin. `points_attribues`
    // existait depuis le début et n'était lu nulle part — un élève qui
    // signalait une vraie erreur ne gagnait donc rien.
    pointsAvis += await pointsSignalementsDe(
      supabaseAdmin,
      session.code_etablissement,
      session.code_utilisateur
    );
  }

  return NextResponse.json({
    ok: true,
    role: session.type_utilisateur,
    comptes: comptesRes.data ?? [],
    pointsAvis,
    resultats: {
      parcours_maths: parcoursMathsRes.data ?? [],
      parcours_english: parcoursEnglishRes.error
        ? []
        : parcoursEnglishRes.data ?? [],
      parcours_espagnol: parcoursEspagnolRes.error
        ? []
        : parcoursEspagnolRes.data ?? [],
      parcours_francais: parcoursFrancaisRes.error
        ? []
        : parcoursFrancaisRes.data ?? [],
      calcul_rapide: calculRes.data ?? [],
      defis_jour: defisRes.data ?? [],
      english_maths: englishRes.data ?? [],
      dictee: dicteeRes.error ? [] : dicteeRes.data ?? [],
      // Table optionnelle (créée séparément) : une erreur ne bloque pas le dashboard.
      langue_du_jour: langueRes.error ? [] : langueRes.data ?? [],
      tutor: tutorRes.data ?? [],
    },
  });
}
