// lib/photo-cours/journal.ts
//
// DEUX CHOSES DIFFÉRENTES, DANS DEUX TABLES DIFFÉRENTES :
//   — `photo_cours_usages` : QUI s'en sert, quand, sur quelle notion, avec
//     quelle lisibilité. Jamais de contenu. C'est ce que lit l'admin.
//   — `photo_cours` : le COURS RELU et ce qu'on en a produit, pour que la
//     personne puisse y revenir. Privé, jamais mutualisé, purgé à 12 mois.
//
// ⚠️ CE COMMENTAIRE DISAIT L'INVERSE LE MATIN DU 12/08 — « ni la photo, ni le
// texte du cours ne sont enregistrés ». La règle a changé le soir, quand la
// fonction s'est ouverte à l'élève et au parent, dont le besoin est de
// REVENIR. Voir l'en-tête de supabase/photo_cours.sql.
//
// ⛔ CE QUI N'A PAS CHANGÉ : la photo n'est stockée nulle part.
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

  /**
   * ⭐ CE QUE L'APPEL A COÛTÉ (13/08). L'API renvoie le compte exact dans
   * chaque réponse ; on le jetait, et « combien ça a coûté ? » n'avait pour
   * réponse qu'une estimation. Les tokens se gardent, le PRIX se calcule à la
   * lecture : les tarifs changent, les tokens consommés non.
   */
  modele?: string | null;
  inputTokens?: number | null;
  outputTokens?: number | null;
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
    modele: ligne.modele ?? null,
    input_tokens: ligne.inputTokens ?? null,
    output_tokens: ligne.outputTokens ?? null,
  });

  if (error) {
    console.error("[photo-cours] usage non journalisé :", error.message);
  }
}

/* ── LE COURS RELU, ET CE QU'ON EN A PRODUIT ─────────────────────────────── */
//
// ⭐ AJOUTÉ LE 12/08 AU SOIR, contre la règle posée le matin même (« le texte
// du cours n'est jamais conservé »). La fonction a changé de nature entre les
// deux : d'un essai côté prof — on produit, on repart — à un outil d'élève et
// de parent, dont le besoin est de REVENIR. Sans le texte, il faut
// rephotographier la page à chaque fois.
//
// ⛔ La photo, elle, n'est toujours stockée nulle part. Et rien de ceci n'est
// mutualisé : chacun ne voit que le sien. Voir supabase/photo_cours.sql.

export type CoursAEnregistrer = {
  codeEtablissement: string;
  codeUtilisateur: string;
  typeUtilisateur: string | null;
  nom: string | null;
  publicVise: "prof" | "eleve" | "parent";
  niveau: string | null;
  matiere: string | null;
  notion: string | null;
  /** Le texte RELU ET VALIDÉ par la personne — pas la lecture brute. */
  texte: string;
  confiance: number | null;
  zonesIllisibles: number;
  manques: number;
  erreursProbables: number;
};

/** Enregistre le cours relu et renvoie son id, ou `null` si ça n'a pas pris. */
export async function enregistrerCours(
  cours: CoursAEnregistrer
): Promise<string | null> {
  if (!supabaseAdmin) return null;

  const { data, error } = await supabaseAdmin
    .from("photo_cours")
    .insert({
      code_etablissement: cours.codeEtablissement || null,
      code_utilisateur: cours.codeUtilisateur,
      type_utilisateur: cours.typeUtilisateur || null,
      nom: cours.nom,
      public: cours.publicVise,
      niveau: cours.niveau || null,
      matiere: cours.matiere || null,
      notion: cours.notion || null,
      texte: cours.texte,
      confiance: cours.confiance,
      zones_illisibles: cours.zonesIllisibles,
      manques: cours.manques,
      erreurs_probables: cours.erreursProbables,
    })
    .select("id")
    .maybeSingle();

  if (error) {
    // ⚠️ On avale : perdre l'archive ne doit jamais coûter le travail de la
    // personne. La production part quand même.
    console.error("[photo-cours] cours non enregistré :", error.message);
    return null;
  }
  return data?.id ?? null;
}

export async function enregistrerProduction(args: {
  photoCoursId: string;
  codeUtilisateur: string;
  typeProduction: string;
  contenu: string;
}): Promise<void> {
  if (!supabaseAdmin) return;

  const { error } = await supabaseAdmin.from("photo_cours_productions").insert({
    photo_cours_id: args.photoCoursId,
    code_utilisateur: args.codeUtilisateur,
    type_production: args.typeProduction,
    contenu: args.contenu,
  });

  if (error) {
    console.error("[photo-cours] production non enregistrée :", error.message);
  }
}
