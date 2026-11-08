// LA COLLECTE ULULE — UN SEUL INTERRUPTEUR (08/11/2026).
//
// Frédéric, 08/11 : « ne mets pas Ulule sur l'accueil maintenant, mais prévois-le :
// ils vont me contacter cette semaine ». Tant que `enLigne` est faux :
//   — l'accueil ne parle ni d'Ulule, ni des codes (le lien « Activer mon code »
//     reste caché, /code n'a pas encore sa table en base) ;
//   — /ulule existe mais n'est pas indexée et ne montre pas le bouton « Soutenir ».
// 👉 LE JOUR OÙ ULULE VALIDE : coller l'adresse de la collecte dans `url`, passer
//    `enLigne` à true. Rien d'autre à toucher.
// ⛔ `codesActifs` : seulement APRÈS l'exécution de supabase/codes_abonnement.sql
//    en production (voir scripts/codes-ulule-mise-en-ligne.md).

export const COLLECTE = {
  enLigne: false,
  /** L'adresse publique de la collecte sur ulule.com (null tant qu'elle n'existe pas). */
  url: null as string | null,
  codesActifs: false,
  objectif: "3 000 €",
};

/** Le lien du coach depuis /ulule : les visites sont comptées comme venant d'Ulule. */
export const COACH_DEPUIS_ULULE =
  "/coach-ia/maths?utm_source=ulule&utm_medium=collecte&utm_campaign=ulule";
