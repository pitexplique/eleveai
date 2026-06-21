// Enregistrement des résultats élèves (toutes activités).
// Remplace les inserts directs depuis le navigateur : avec le RLS activé
// (supabase/securite_rls.sql), seule la clé service role peut écrire.
// L'identité (code_etablissement, code_utilisateur, nom) est forcée depuis
// le jeton de session signé : un élève ne peut pas enregistrer un résultat
// pour un autre, ni falsifier son établissement.

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { verifySessionToken } from "@/lib/server/session";
import { mettreAJourBulletin } from "@/lib/bulletin/computeBulletin";

// Colonnes que le client a le droit de fournir, par activité.
// Tout le reste est ignoré ; pourcentage est une colonne générée en base.
const ACTIVITES: Record<string, { table: string; colonnes: string[] }> = {
  parcours_maths: {
    table: "resultats_parcours_maths",
    colonnes: ["classe", "niveau", "matiere", "score", "total", "details"],
  },
  parcours_english: {
    table: "resultats_parcours_english",
    colonnes: ["classe", "niveau", "matiere", "score", "total", "details"],
  },
  parcours_espagnol: {
    table: "resultats_parcours_espagnol",
    colonnes: ["classe", "niveau", "matiere", "score", "total", "details"],
  },
  parcours_francais: {
    table: "resultats_parcours_francais",
    colonnes: ["classe", "niveau", "matiere", "score", "total", "details"],
  },
  calcul_rapide: {
    table: "resultats_calcul_rapide",
    colonnes: [
      "classe", "niveau", "matiere", "session_id", "titre_session", "theme",
      "score", "total", "temps_total_sec", "details",
    ],
  },
  defis_jour: {
    table: "resultats_defis_jour",
    colonnes: [
      "classe", "niveau", "matiere", "defi_id", "titre_defi", "theme",
      "direction_id", "direction_label", "direction_type", "score", "total",
      "reponse_eleve", "reponse_attendue", "details",
    ],
  },
  english_maths: {
    table: "resultats_english_maths",
    colonnes: ["niveau", "jour", "theme", "score", "total", "details"],
  },
  tutor: {
    table: "resultats_tutor",
    colonnes: [
      "classe", "matiere", "notion_id", "mode", "score_sur_20",
      "earned_points", "possible_points", "bonnes_reponses", "nb_tentatives",
      "temps_sec", "details",
    ],
  },
};

const MAX_BODY_BYTES = 200_000; // garde-fou sur la taille du champ details

export async function POST(req: Request) {
  try {
    const raw = await req.text();
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json(
        { ok: false, error: "Résultat trop volumineux." },
        { status: 413 }
      );
    }

    let body: any = {};
    try {
      body = JSON.parse(raw);
    } catch {
      return NextResponse.json(
        { ok: false, error: "Requête invalide." },
        { status: 400 }
      );
    }

    const session = verifySessionToken(body.token);
    if (!session) {
      return NextResponse.json(
        { ok: false, error: "Session expirée. Reconnecte-toi pour enregistrer." },
        { status: 401 }
      );
    }

    const activite = ACTIVITES[String(body.type ?? "")];
    if (!activite) {
      return NextResponse.json(
        { ok: false, error: "Type d'activité inconnu." },
        { status: 400 }
      );
    }

    const resultat =
      body.resultat && typeof body.resultat === "object" ? body.resultat : {};

    const row: Record<string, unknown> = {
      code_etablissement: session.code_etablissement,
      code_utilisateur: session.code_utilisateur,
      nom: session.nom ?? null,
    };
    for (const col of activite.colonnes) {
      if (resultat[col] !== undefined) row[col] = resultat[col];
    }

    // Garde-fous numériques sur les scores.
    for (const col of [
      "score", "total", "score_sur_20", "earned_points", "possible_points",
      "bonnes_reponses", "nb_tentatives", "temps_sec", "temps_total_sec", "jour",
    ]) {
      if (row[col] !== undefined && row[col] !== null) {
        const n = Number(row[col]);
        if (!Number.isFinite(n) || n < 0 || n > 1_000_000) {
          return NextResponse.json(
            { ok: false, error: `Valeur invalide pour ${col}.` },
            { status: 400 }
          );
        }
        row[col] = n;
      }
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { error } = await supabaseAdmin.from(activite.table).insert(row);
    if (error) throw error;

    // Recalcule le bulletin de l'élève (snapshot, table bulletins). Tolérant :
    // mettreAJourBulletin n'échoue jamais → la sauvegarde du résultat est
    // garantie même si le bulletin ne se met pas à jour (ex. table absente).
    await mettreAJourBulletin({
      codeEtablissement: session.code_etablissement,
      codeUtilisateur: session.code_utilisateur,
      nom: session.nom,
      classe: session.classe,
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Erreur serveur" },
      { status: 500 }
    );
  }
}
