/* Types du cahier de vacances « Aider mon enfant » (public = PARENTS).
   Moteur distinct : ici on n'enseigne pas à l'enfant mais au parent — on lui
   explique les méthodes de l'école d'aujourd'hui pour qu'il accompagne. Ton
   sobre, adulte, sans mascotte ni gamification enfantine. */

export type JourParent = {
  numero: number;
  semaine: number;
  /** Couleur + libellé du domaine. */
  domaine: "maths" | "francais" | "methode";
  /** Le sujet du jour, ex. « La division posée ». */
  theme: string;
  /** Niveau(x) scolaire(s) concerné(s), ex. « CM1 · CM2 ». */
  niveau: string;
  /** « Ce que votre enfant apprend » : la méthode actuelle expliquée au parent. */
  methode: { intro: string; etapes?: string[] };
  /** « Ce qui a changé depuis votre époque » (optionnel mais fréquent). */
  aChange?: string;
  /** « À vous d'essayer » : quelques exercices avec corrigé (optionnel). */
  exercices?: { q: string; r: string }[];
  /** « Comment l'aider » : conseils concrets d'accompagnement. */
  aider: string[];
  /** « Le mot d'école » : le terme que l'enfant emploie dans ses devoirs. */
  mot: { mot: string; definition: string };
  /** « Le geste numérique » : compétence de suivi/accompagnement (ENT, vérifier...). */
  geste: { titre: string; texte: string };
  /** « Le piège à éviter ». */
  piege: { titre: string; texte: string };
};

export type CahierParentsData = {
  jours: JourParent[];
  semaines: { numero: number; titre: string; intro: string }[];
};

/** Libellés propres au cahier parents. */
export type CahierParentsConfig = {
  slug: string;
  titre: string;
  sousTitre: string;
  /** Badge mission affiché sur la garde. */
  mission: string;
};
