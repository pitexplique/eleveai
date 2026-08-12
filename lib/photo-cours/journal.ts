// lib/photo-cours/journal.ts
//
// L'USAGE, PAS LE CONTENU. Voir supabase/photo_cours_usages.sql pour la règle :
// ⛔ ni la photo, ni le texte du cours ne sont enregistrés — seulement qui s'en
// sert, quand, et sur quelle notion.
//
// ⚠️ L'ÉCRITURE NE DOIT JAMAIS FAIRE ÉCHOUER LA RÉPONSE. Si la table n'existe
// pas encore (le SQL n'a pas été passé), ou si Supabase tousse, le professeur
// doit quand même recevoir ses exercices. On avale l'erreur et on la laisse
// dans les logs : perdre une ligne de statistique n'est rien, perdre le travail
// de quelqu'un est autre chose.

import { createClient } from "@supabase/supabase-js";

const supabaseAdmin =
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
    ? createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY,
        { auth: { persistSession: false } }
      )
    : null;

export type LigneUsage = {
  codeEtablissement: string;
  codeUtilisateur: string;
  typeUtilisateur: string | null;
  nom: string | null;
  etape: "lecture" | "production";
  typeProduction?: string | null;
  confiance?: number | null;
  niveau?: string | null;
  notion?: string | null;
  matiere?: string | null;
  zonesIllisibles?: number | null;
};

export async function journaliserUsage(ligne: LigneUsage): Promise<void> {
  if (!supabaseAdmin) return;

  const { error } = await supabaseAdmin.from("photo_cours_usages").insert({
    code_etablissement: ligne.codeEtablissement || null,
    code_utilisateur: ligne.codeUtilisateur,
    type_utilisateur: ligne.typeUtilisateur || null,
    nom: ligne.nom,
    etape: ligne.etape,
    type_production: ligne.typeProduction ?? null,
    confiance: ligne.confiance ?? null,
    niveau: ligne.niveau || null,
    notion: ligne.notion || null,
    matiere: ligne.matiere || null,
    zones_illisibles: ligne.zonesIllisibles ?? null,
  });

  if (error) {
    console.error("[photo-cours] usage non journalisé :", error.message);
  }
}
