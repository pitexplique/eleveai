// ─── La fiche d'exercices comme DONNÉE ─────────────────────────────────────────
//
// ⭐ POURQUOI UN OBJET À PART, ET PAS UNE RUBRIQUE DE PLUS DANS `FicheCoursData`
// (15/09/2026). La fiche de cours de l'exponentielle portait déjà quatorze
// exercices corrigés — et la fille de Frédéric, en première, en demandait vingt.
// Ce n'était pas le nombre qui manquait : c'était l'ENTRÉE. Les exercices
// arrivaient après onze sections de cours, et leurs corrigés tenaient en une
// ligne (« Produit : on ajoute les exposants »). Assez pour un bon élève ; pas
// pour un élève moyen, qui perd l'étape.
//
// Frédéric : « je la trouve bien pour un prof mais trop compliquée pour élèves
// moyens, ils préfèrent vidéo et exercices corrigés ». La fiche de cours reste
// donc ce qu'elle est — son outil de classe, projetable — et l'élève a SA porte
// à côté : une feuille d'exercices, avec un rappel de cours de trois lignes
// avant chaque niveau (« j'adore rappel cours simple pour élèves bas moyens »).
//
// Trois niveaux, toujours dans cet ordre : un seul geste, type devoir, problème.
// Le corrigé est écrit ÉTAPE PAR ÉTAPE, avec le pourquoi de chaque étape et le
// piège nommé — c'est ce qui le distingue de la ligne de la fiche de cours.

import type { ReactNode } from "react";

export type NiveauExercice = 1 | 2 | 3;

export type ExerciceCorrige = {
  /** Un titre court, seulement pour les problèmes (niveau 3). */
  titre?: string;
  /** L'énoncé. Les sous-questions a), b)… sont séparées par des `\n`. `$…$` pour les formules. */
  enonce: string;
  /**
   * ⭐ LA FIGURE DE L'ÉNONCÉ (21/09/2026, bloc « Fonctions » de seconde) : la
   * courbe qu'on LIT. Jusque-là une feuille ne dessinait que dans son corrigé
   * (`schema`) — une lecture graphique, cœur de l'exercice 5 du contrôle commun,
   * devait se décrire en mots. Rendue sous l'énoncé (écran et PDF) et à côté de
   * l'exercice en mode classe. Facultative : les feuilles d'avant ne changent pas.
   */
  figure?: ReactNode;
  /** Le corrigé, une étape par ligne (`\n`), chaque étape avec son pourquoi. */
  correction: string;
  /**
   * ⭐ LE TABLEAU DESSINÉ DU CORRIGÉ (Frédéric, 17/09/2026 : « j'ai remarqué que
   * dans la fiche d'exercices il y a l'explication, mais jamais de dressage de
   * tableau de signes et de variations avec les canvas »).
   *
   * Un corrigé qui DIT « f croît puis décroît » sans MONTRER le tableau demande
   * à l'élève de le reconstruire de tête — c'est-à-dire de refaire l'exercice
   * pour lire sa correction. On sert donc ici le même canvas que le coach
   * (`tableau_variations`, `tableau_signes`) : même figure dans la question et
   * dans la réponse.
   *
   * Rendu à DEUX endroits, écran et papier : sous la correction dépliée, et sur
   * la page des corrigés du PDF.
   */
  schema?: ReactNode;
  /** Les micro-compétences du coach que l'exercice fait travailler (ids de
   *  `lib/tutor-v4/knowledge/<matière>/<classe>/microSkills.ts`). */
  micros?: string[];
};

export type SerieExercices = {
  niveau: NiveauExercice;
  /** « Un seul geste », « Type devoir », « Problèmes ». */
  titre: string;
  /** Ce que le niveau demande, en une phrase. */
  consigne: string;
  /** Le rappel de cours : deux à quatre lignes, pas le cours entier. */
  rappel: string[];
  exercices: ExerciceCorrige[];
};

export type FicheExercicesData = {
  matiere: string;
  matiereLabel: string;
  classe: string;
  /** Le slug de la notion — celui du coach, en tirets (`exponentielle`). */
  notion: string;
  /** Le titre NU, « L'exponentielle » : le h1 et le nom du PDF se construisent dessus. */
  titre: string;
  accroche: string;
  series: SerieExercices[];
  /** Les fiches de cours à relire, dans l'ordre. */
  fichesCours: { href: string; titre: string }[];
  /** Le coach de la classe, pour « encore un comme ça ». */
  coachHref: string;
};

/** Le nombre d'exercices d'une fiche — il se compte, il ne s'écrit pas. */
export function compterExercices(fiche: FicheExercicesData): number {
  return fiche.series.reduce((n, s) => n + s.exercices.length, 0);
}
