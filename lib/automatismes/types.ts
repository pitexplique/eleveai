// lib/automatismes/types.ts
//
// ⭐ LES AUTOMATISMES, À PART DU COACH (24/09/2026)
//
// La première partie du DNB (« Automatismes et applications directes » : 20 min,
// sans calculatrice, 6 points) et celle de l'EAM en première posent une SÉRIE
// de questions mêlées, en temps limité, notée à la fin. C'est le format d'une
// évaluation, pas celui du coach, qui travaille une notion à la fois : les
// automatismes vivent donc ici, avec leurs propres générateurs, un fichier par
// classe, et la page /automatismes-maths.
//
// ⛔ Aucune question figée : chaque série est neuve, un élève peut en refaire
// une chaque semaine — et recharger celles d'un autre niveau.

import type { CanvasFigure } from "@/lib/tutor-v4/types_canvas";

export type AutoQuestion = {
  text: string;
  /**
   * "short" : l'élève tape sa réponse ; "qcm" : il choisit ;
   * "redaction" : il rédige une phrase. ⭐ C'est la « question en gras » du
   * DNB, où la maîtrise de la langue compte (2 points sur 20 depuis 2026).
   * Une machine corrige mal une phrase : on montre une RÉPONSE MODÈLE et
   * l'élève coche lui-même les critères. Le point est acquis s'il les coche
   * tous.
   */
  format: "short" | "qcm" | "redaction";
  /** Rédaction seulement : la phrase attendue, bien écrite. */
  modele?: string;
  /** Rédaction seulement : ce que l'élève vérifie dans sa propre phrase. */
  criteres?: string[];
  choices?: string[];
  /** Toutes les écritures acceptées (« 5/4 », « 1,25 »…). */
  expected: string[];
  /**
   * Comparaison spéciale d'une réponse tapée :
   * - "ensemble" : plusieurs solutions, dans n'importe quel ordre, séparées
   *   par « ; », « et », « ou » (« 2 ; -3 » = « -3 et 2 ») ;
   * - "inegalite" : « x ≥ 4 » = « x>=4 » = « x ⩾ 4 ».
   */
  compare?: "ensemble" | "inegalite";
  /** La correction affichée au bilan : méthode puis calcul, en deux lignes. */
  explanation: string;
  canvas?: CanvasFigure;
};

export type AutoTheme = {
  id: string;
  label: string;
  /** Un générateur est tiré au hasard à chaque série. */
  generateurs: (() => AutoQuestion)[];
  /** Au programme mais pas dans la liste de l'épreuve : on peut le cocher,
   *  mais « la totale » ne le tire pas. */
  horsEpreuve?: boolean;
};

export type AutoNiveau = {
  classe: string;
  label: string;
  /** Durée conseillée de la série, en minutes. */
  duree: number;
  /** Ce que la série imite, affiché sur la page. */
  examen: string;
  /** Nombre de questions d'une série ; par défaut, une par thème. */
  nbQuestions?: number;
  /** Thèmes présents dans CHAQUE série (la rédaction). */
  toujours?: string[];
  themes: AutoTheme[];
};

export type AutoQuestionServie = AutoQuestion & {
  themeId: string;
  themeLabel: string;
};
