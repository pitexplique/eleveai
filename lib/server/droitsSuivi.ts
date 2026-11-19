// QUI A LE SUIVI ? (19/11/2026) — côté serveur seulement.
//
// Le modèle du 19/11 : le contenu est offert à tous, on paie le SUIVI
// (lib/tarifs.ts, `SUIVI`). Un élève a le Suivi quand :
//   1. son propre compte courriel a un abonnement en cours ;
//   2. ou un parent abonné l'a relié (/suivi), parmi ses `SUIVI.enfantsMax`
//      premiers enfants ;
//   3. ou c'est un compte enseignant (adresse académique) : le prof ne paie pas.
// ⛔ Un élève d'établissement (code de classe) n'a jamais le Suivi : il garde les
//    droits d'un compte gratuit. Aucun prix ne lui est montré.
// ⛔ Fin d'abonnement : `accesEnCours` redevient faux, le compte redevient
//    gratuit. Rien n'est effacé : l'historique reste en base.
import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { estAdresseAcademique, QUOTAS_IA, SUIVI } from "@/lib/tarifs";
import { accesEnCours, lireAbonnement } from "./abonnement";
import { ETABLISSEMENT_INDEPENDANT } from "./session";

export type Formule = "gratuit" | "suivi";

export type Droits = {
  formule: Formule;
  /** Date de création du compte courriel (pour le bonus de bienvenue), sinon null. */
  creeLe: string | null;
};

const GRATUIT: Droits = { formule: "gratuit", creeLe: null };

/** Les droits d'un élève repéré par ses codes. Toute erreur donne « gratuit ». */
export async function droitsDeLEleve(
  admin: SupabaseClient,
  codeEtablissement: string,
  codeUtilisateur: string,
): Promise<Droits> {
  if (codeEtablissement !== ETABLISSEMENT_INDEPENDANT || !codeUtilisateur.startsWith("EMAIL-")) {
    return GRATUIT;
  }
  try {
    const id = codeUtilisateur.slice("EMAIL-".length);
    const { data: profil } = await admin
      .from("users_email")
      .select("auth_user_id, email, created_at")
      .eq("id", id)
      .maybeSingle();
    const creeLe = (profil?.created_at as string | null) ?? null;

    if (profil?.email && estAdresseAcademique(profil.email)) return { formule: "suivi", creeLe };
    if (profil?.auth_user_id && accesEnCours(await lireAbonnement(profil.auth_user_id))) {
      return { formule: "suivi", creeLe };
    }

    const { data: liens } = await admin
      .from("enfants_parent")
      .select("parent_user_id")
      .eq("code_etablissement", codeEtablissement)
      .eq("code_utilisateur", codeUtilisateur);
    for (const { parent_user_id } of liens ?? []) {
      if (!accesEnCours(await lireAbonnement(parent_user_id))) continue;
      // L'abonnement couvre les premiers enfants reliés, pas un de plus.
      const { data: premiers } = await admin
        .from("enfants_parent")
        .select("code_utilisateur")
        .eq("parent_user_id", parent_user_id)
        .order("created_at")
        .limit(SUIVI.enfantsMax);
      if ((premiers ?? []).some((e) => e.code_utilisateur === codeUtilisateur)) {
        return { formule: "suivi", creeLe };
      }
    }
    return { formule: "gratuit", creeLe };
  } catch {
    return GRATUIT;
  }
}

/** Le plafond de questions à l'IA du jour, selon les droits. */
export function questionsIAParJour(d: Droits, maintenant: Date = new Date()): number {
  if (d.formule === "suivi") return QUOTAS_IA.suiviParJour;
  const b = QUOTAS_IA.bonusBienvenue;
  if (b.actif && d.creeLe) {
    const age = maintenant.getTime() - new Date(d.creeLe).getTime();
    if (age >= 0 && age < b.jours * 86400000) return Math.max(b.questionsParJour, QUOTAS_IA.gratuitParJour);
  }
  return QUOTAS_IA.gratuitParJour;
}
