// LE PLAFOND DES QUESTIONS À L'IA — côté serveur, AVANT tout appel (18/11/2026).
//
// Frédéric, 18/11 : « comment je finance Ti Margo qui a un coût ». Réponse :
// l'IA reste offerte pour apprendre, avec un plafond discret ; la Famille aura un
// plafond plus haut (branché avec Stripe) ; Ti Margo premium au printemps 2027.
//
// ⛔ Ne compte QUE les questions posées à l'IA. Les exercices du coach, les
// vidéos et les fiches ne passent pas par ici : ils restent sans limite.
// ⛔ Le message de quota ne renvoie JAMAIS vers une offre (le coach sert en classe).
//
// Échec ouvert : si Supabase ou la table `usage_ia` manque (supabase/usage_ia.sql
// pas encore exécuté), la question passe. On ne casse pas le coach d'un élève
// pour un compteur.

import { createClient } from "@supabase/supabase-js";

/** Questions à l'IA par élève et par jour (heure de La Réunion). */
export const QUESTIONS_IA_PAR_JOUR = 10;
/** ⏳ Pour la Famille abonnée : à brancher avec Stripe (samedi 21/11). */
export const QUESTIONS_IA_PAR_JOUR_FAMILLE = 30;
/** Pour une adresse IP, sur les routes sans compte (une classe entière partage une IP). */
export const QUESTIONS_IA_PAR_IP = 300;
/** Ceinture de sécurité : toutes les questions du site en une journée (~0,1 centime chacune). */
export const QUESTIONS_IA_TOTAL_PAR_JOUR = 5000;

export const MESSAGE_QUOTA_ELEVE = `Tu as posé tes ${QUESTIONS_IA_PAR_JOUR} questions à l'IA aujourd'hui. Reviens demain ! Les exercices et les vidéos, eux, restent ouverts.`;
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

export type Verdict = { ok: true } | { ok: false; message: string };

/**
 * À appeler juste avant l'appel à l'IA. `cle` = « eleve:<id> » pour un compte,
 * sinon on compte par adresse IP.
 */
export async function autoriserQuestionIA(
  req: Request,
  compte?: { cle: string; max?: number },
): Promise<Verdict> {
  if (compte) {
    if (!(await compter(compte.cle, compte.max ?? QUESTIONS_IA_PAR_JOUR))) {
      return { ok: false, message: MESSAGE_QUOTA_ELEVE };
    }
  } else {
    const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "inconnue";
    if (!(await compter(`ip:${ip}`, QUESTIONS_IA_PAR_IP))) {
      return { ok: false, message: MESSAGE_QUOTA_SITE };
    }
  }
  if (!(await compter("total", QUESTIONS_IA_TOTAL_PAR_JOUR))) {
    return { ok: false, message: MESSAGE_QUOTA_SITE };
  }
  return { ok: true };
}
