// Les points venus des SIGNALEMENTS (table `signalements`), à côté de ceux
// venus des avis (lib/points/feedbackPoints.ts).
//
// ⭐ La différence est volontaire et c'est tout le principe : un avis rapporte
// dès l'envoi, un signalement ne rapporte QUE s'il est retenu. `/api/signalements`
// écrit `points_attribues = 0` à la soumission et le dit à la personne ; c'est
// Frédéric qui attribue depuis l'admin, une fois qu'il a regardé.
//
// Pourquoi : la table portait cette colonne depuis le début et personne ne la
// lisait — un signalement retenu ne rapportait donc rien nulle part. Et la
// leçon du farming d'Ayden tient toujours : ce qui se donne automatiquement se
// fabrique automatiquement.

import type { SupabaseClient } from "@supabase/supabase-js";

/** Ce que vaut un signalement retenu par défaut, proposé en un clic à l'admin. */
export const POINTS_SIGNALEMENT_RETENU = 20;

/** Le cran au-dessus : un signalement qui a produit une correction en ligne. */
export const POINTS_SIGNALEMENT_CORRIGE = 50;

/**
 * Les points de signalement d'UN élève. Renvoie 0 si la table n'existe pas
 * encore : un dashboard ne doit jamais tomber pour une table optionnelle.
 */
export async function pointsSignalementsDe(
  supabase: SupabaseClient,
  codeEtablissement: string,
  codeUtilisateur: string
): Promise<number> {
  const { data, error } = await supabase
    .from("signalements")
    .select("points_attribues")
    .eq("code_etablissement", codeEtablissement)
    .eq("code_utilisateur", codeUtilisateur);

  if (error) return 0;
  return (data ?? []).reduce((s, l) => s + (Number(l.points_attribues) || 0), 0);
}

/**
 * Les points de signalement de TOUT un établissement, par code utilisateur.
 * Une seule requête : le classement en a besoin pour chaque élève à la fois.
 */
export async function pointsSignalementsParEleve(
  supabase: SupabaseClient,
  codeEtablissement: string
): Promise<Map<string, number>> {
  const total = new Map<string, number>();

  const { data, error } = await supabase
    .from("signalements")
    .select("code_utilisateur, points_attribues")
    .eq("code_etablissement", codeEtablissement)
    .not("code_utilisateur", "is", null)
    .limit(20000);

  if (error) return total;

  for (const l of data ?? []) {
    const code = l.code_utilisateur as string;
    const pts = Number(l.points_attribues) || 0;
    if (!code || pts === 0) continue;
    total.set(code, (total.get(code) ?? 0) + pts);
  }
  return total;
}
