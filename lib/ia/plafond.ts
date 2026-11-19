// LE PLAFOND DES QUESTIONS À L'IA — côté serveur, AVANT tout appel (18/11/2026,
// refait le 19/11 pour le modèle « contenu offert, on paie le suivi »).
//
// Les nombres viennent de lib/tarifs.ts (`QUOTAS_IA`) : 3 par jour pour un compte
// gratuit, 30 pour le Suivi. ⛔ Rien en dur ici.
//
// ⛔ Ne compte QUE les questions posées à l'IA. Les exercices du coach, les
// vidéos et les fiches ne passent pas par ici : ils restent ouverts sans compte.
// ⛔ Le message de quota ne renvoie JAMAIS vers une offre ni un prix (le coach
// sert en classe ; c'est le parent qui paie, pas l'élève).
//
// Échec ouvert : si Supabase ou la table `usage_ia` manque (supabase/usage_ia.sql
// pas encore exécuté), la question passe. On ne casse pas le coach d'un élève
// pour un compteur.

import { createClient } from "@supabase/supabase-js";
import { QUOTAS_IA } from "@/lib/tarifs";
import { droitsDeLEleve, questionsIAParJour, type Formule } from "@/lib/server/droitsSuivi";

/** Gardés pour les anciens imports : ils lisent lib/tarifs.ts. */
export const QUESTIONS_IA_PAR_JOUR = QUOTAS_IA.gratuitParJour;
export const QUESTIONS_IA_PAR_JOUR_FAMILLE = QUOTAS_IA.suiviParJour;
export const QUESTIONS_IA_PAR_IP = QUOTAS_IA.parIP;
export const QUESTIONS_IA_TOTAL_PAR_JOUR = QUOTAS_IA.totalSiteParJour;

export const messageQuotaEleve = (max: number) =>
  `Tu as posé tes ${max} question${max > 1 ? "s" : ""} à l'IA aujourd'hui. Reviens demain ! Les exercices et les vidéos, eux, restent ouverts.`;
/** @deprecated Utiliser `messageQuotaEleve(max)`. */
export const MESSAGE_QUOTA_ELEVE = messageQuotaEleve(QUOTAS_IA.gratuitParJour);
export const MESSAGE_QUOTA_SITE = "L'IA se repose pour aujourd'hui. Reviens demain ! Les exercices et les vidéos restent ouverts.";

const admin =
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
    ? createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
        auth: { persistSession: false },
      })
    : null;

/** true = compté et accepté (ou compteur indisponible) ; false = plafond atteint. */
async function compter(cle: string, max: number): Promise<boolean> {
  if (!admin) return true;
  try {
    const { data, error } = await admin.rpc("compter_question_ia", { p_cle: cle, p_max: max });
    if (error || typeof data !== "number") return true;
    return data !== -1;
  } catch {
    return true;
  }
}

export type Verdict =
  | { ok: true; formule: Formule | "ip"; max: number }
  | { ok: false; message: string; max: number };

/**
 * À appeler juste avant l'appel à l'IA.
 * - Un élève connecté : `cle` = « eleve:<id> » et ses codes ; le plafond dépend
 *   de ses droits (gratuit 3, Suivi 30).
 * - Sans compte (routes encore ouvertes) : compté par adresse IP.
 */
export async function autoriserQuestionIA(
  req: Request,
  compte?: { cle: string; codeEtablissement?: string; codeUtilisateur?: string; max?: number },
): Promise<Verdict> {
  let formule: Formule | "ip" = "ip";
  let max: number = QUOTAS_IA.parIP;
  if (compte) {
    formule = "gratuit";
    max = compte.max ?? QUOTAS_IA.gratuitParJour;
    if (compte.max === undefined && admin && compte.codeEtablissement && compte.codeUtilisateur) {
      const droits = await droitsDeLEleve(admin, compte.codeEtablissement, compte.codeUtilisateur);
      formule = droits.formule;
      max = questionsIAParJour(droits);
    }
    if (!(await compter(compte.cle, max))) {
      return { ok: false, message: messageQuotaEleve(max), max };
    }
  } else {
    const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "inconnue";
    if (!(await compter(`ip:${ip}`, max))) {
      return { ok: false, message: MESSAGE_QUOTA_SITE, max };
    }
  }
  if (!(await compter("total", QUOTAS_IA.totalSiteParJour))) {
    return { ok: false, message: MESSAGE_QUOTA_SITE, max };
  }
  return { ok: true, formule, max };
}
