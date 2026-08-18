// knowledge/maths/stmg/annees.ts
//
// PREMIÈRE OU TERMINALE : à quelle année appartient chaque notion.
//
// La classe `stmg` du coach couvre les DEUX années — décision du 15/08/2026,
// « on en fera qu'un », parce que le programme est écrit comme un cycle de deux
// ans (voir l'en-tête de bo.ts). Le cycle reste un ; c'est la LISTE qui devait
// se couper. À l'ouverture, l'élève recevait les 86 notions d'un seul
// bloc : celui de première y croisait la loi binomiale et le logarithme, celui
// de terminale cherchait ses arbres de probabilités au milieu des automatismes.
// D'où les deux pastilles « 1re STMG » / « Tle STMG » du coach, qui lisent ce
// fichier.
//
// ─────────────────────────────────────────────────────────────────────────────
// L'ÉTALON. La source de vérité, c'est le LIBELLÉ : « L'ANNÉE EST DANS LE
// LIBELLÉ quand elle décide de ce qui est exigible » (notions.ts). La liste
// ci-dessous ne la remplace pas, elle la MESURE : les deux doivent dire la même
// chose, et `verifierAccord()` lève une erreur au chargement si elles divergent.
//
// Concrètement : ajouter une notion de terminale sans la marquer `(Tle)`, ou la
// marquer sans l'inscrire ici, casse la page au lieu de la ranger en silence du
// mauvais côté. Un élève de première ne recevra pas la loi binomiale parce
// qu'une ligne a été oubliée.
// ─────────────────────────────────────────────────────────────────────────────

import { notions } from "./notions";

export type AnneeStmg = "premiere" | "terminale";

/** Ce que porte le libellé d'une notion exigible en terminale seulement. */
const MARQUEUR_TERMINALE = "(Tle)";

/**
 * Les notions du programme de TERMINALE technologique. Tout le reste est de
 * première — et reste travaillé en terminale : les automatismes, l'algorithmique
 * et le tableur le sont « tout au long des deux années », et une notion de
 * première ne disparaît pas au mois de septembre suivant. La pastille « Tle »
 * montre donc ce qui est NOUVEAU en terminale, pas tout ce qu'on y fait.
 */
export const NOTIONS_TERMINALE: readonly string[] = [
  // Automatismes enrichis (« les tirets en italique » du BO)
  "auto_terminale_reconnaitre",
  "auto_terminale_derivee",
  // Suites : le terme général et tout ce qui en découle
  "suite_terme_general",
  "suite_moyennes",
  "suite_somme",
  "suite_somme_situations",
  "suite_comparer",
  // Fonction inverse
  "fct_inverse",
  "fct_inverse_derivee",
  // Exponentielles et logarithme décimal : domaine entièrement de terminale
  "expo_definition",
  "expo_variations",
  "expo_proprietes",
  "expo_taux_moyen",
  "expo_taux_equivalent",
  "log_definition",
  "log_proprietes",
  "log_equations",
  "log_applications",
  // Statistique à deux variables : domaine entièrement de terminale
  "stat_nuage",
  "stat_ajustement",
  "stat_interpoler",
  "stat_moindres_carres",
  "stat_changement_variable",
  // Probabilités : l'arbre et les probabilités totales (le tableau croisé reste
  // en première, le BO le dit noir sur blanc)
  "proba_arbre",
  "proba_arbre_calcul",
  "proba_independance",
  // Loi binomiale
  "va_binomiale_reconnaitre",
  "va_binomiale_coefficients",
  "va_binomiale_calcul",
];

const enTerminale = new Set(NOTIONS_TERMINALE);

function verifierAccord() {
  const parLeLibelle = new Set(
    notions.filter((n) => n.label.includes(MARQUEUR_TERMINALE)).map((n) => n.id)
  );
  const connues = new Set(notions.map((n) => n.id));

  const fantomes = NOTIONS_TERMINALE.filter((id) => !connues.has(id));
  if (fantomes.length > 0) {
    throw new Error(
      `STMG · annees.ts : notion(s) inconnue(s) dans NOTIONS_TERMINALE — ${fantomes.join(", ")}`
    );
  }

  const oubliees = [...parLeLibelle].filter((id) => !enTerminale.has(id));
  if (oubliees.length > 0) {
    throw new Error(
      `STMG · annees.ts : notion(s) marquée(s) « ${MARQUEUR_TERMINALE} » dans notions.ts mais absente(s) de NOTIONS_TERMINALE — ${oubliees.join(", ")}`
    );
  }

  const enTrop = NOTIONS_TERMINALE.filter((id) => !parLeLibelle.has(id));
  if (enTrop.length > 0) {
    throw new Error(
      `STMG · annees.ts : notion(s) listée(s) en terminale mais dont le libellé ne porte pas « ${MARQUEUR_TERMINALE} » — ${enTrop.join(", ")}`
    );
  }
}

verifierAccord();

/** notionId → année. Toutes les notions de la classe y sont. */
export const ANNEE_PAR_NOTION_STMG: Record<string, AnneeStmg> = Object.fromEntries(
  notions.map((n) => [n.id, enTerminale.has(n.id) ? "terminale" : "premiere"])
);

/**
 * « Suite arithmétique — terme général (Tle) » → « Suite arithmétique — terme
 * général ». Quand l'élève a lui-même choisi son année, répéter `(Tle)` sur
 * chaque ligne n'apporte plus rien : la pastille le dit déjà.
 */
export function sansMarqueurAnnee(label: string): string {
  return label.replace(/\s*\(Tle\)\s*$/, "");
}
