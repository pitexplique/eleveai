// ─── La fiche de cours comme DONNÉE ────────────────────────────────────────────
// Le pivot du chantier fiches : une fiche n'est plus une page écrite à la main,
// c'est un objet en blocs typés. Les pages (fiche publique, flashcards élève,
// composeur prof, mode classe, impression) ne sont que des RENDUS de cette
// donnée — même source, plusieurs lunettes.

import type { ReactNode } from "react";

export type FicheIdentite = { label: string; valeur: string };
/**
 * UNE PROPRIÉTÉ SE DESSINE AUSSI (Frédéric, 19/08/2026 : « inclure sur chaque
 * définition et propriété un graphique ou schéma »).
 *
 * REGLES.md demandait déjà un visuel par micro-compétence, mais les visuels
 * allaient à la figure de référence et aux exemples : les propriétés, elles,
 * restaient trois pavés de texte côte à côte — c'est-à-dire l'endroit du cours
 * qu'un élève survole. `schema` est optionnel pour ne rien casser des 81 fiches
 * écrites avant lui ; sur les nouvelles, il se remplit.
 */
/**
 * LES MICRO-COMPÉTENCES QU'UN BLOC ENSEIGNE — par leur `id` dans la banque de
 * connaissances (`lib/tutor-v4/knowledge/<matière>/<classe>/microSkills.ts`).
 *
 * ⭐ POURQUOI SUR LE BLOC ET NON SUR LA FICHE. Une fiche couvre une NOTION
 * (`angle_mesure`) ; ses blocs couvrent des micros (`angle_mesurer`,
 * `angle_tracer`). C'est la granularité du bloc qui rend trois choses possibles,
 * et aucune ne l'est au niveau de la fiche :
 *   • le coach sait sur quelle micro l'élève a échoué → il l'envoie au BLOC
 *     exact, pas à la fiche entière ;
 *   • une ancre par bloc, que Google peut afficher en lien direct ;
 *   • un contrôle : chaque micro de la banque a-t-elle un bloc, chaque bloc
 *     cite-t-il une micro qui existe ?
 * La liste au niveau de la fiche se déduit — c'est l'union. On ne l'écrit pas
 * deux fois.
 *
 * ⚠️ MESURÉ LE 25/08/2026, AVANT D'ÉCRIRE CE CHAMP : la banque compte 3 426
 * micros sur 527 notions, et 357 seulement sont citées quelque part — dans des
 * COMMENTAIRES d'en-tête de fiche, que rien ne vérifie et que rien ne lit.
 * 66 fiches de maths sur 67 en portent un ; 8 fiches de français sur 25.
 *
 * ⛔ OPTIONNEL, ET QUI LE RESTE. Les 109 fiches écrites avant ce champ
 * continuent de compiler et de s'afficher à l'identique. Aucune n'est à refaire.
 */
export type FicheMicros = { micros?: string[] };

export type FichePropriete = { titre: string; texte: string; schema?: ReactNode } & FicheMicros;
export type FicheMethode = { titre: string; texte: string; schema?: ReactNode } & FicheMicros;
export type FicheUsage = { titre: string; detail: string; schema?: ReactNode } & FicheMicros;
export type FicheExemple = {
  titre: string;
  donnees: string;
  question: string;
  solution: string;
  /** Figure optionnelle (ex. opération posée dessinée) — pour MONTRER plutôt
   *  que faire lire. Rendue au-dessus de la solution. */
  schema?: ReactNode;
} & FicheMicros;
export type FicheExercice = { question: string; correction: string } & FicheMicros;

/** Les rubriques composables — le prof coche et ordonne les siennes. */
export type FicheRubriqueId =
  | "identite"
  | "reel"
  | "historique"
  | "definition"
  | "proprietes"
  | "formule"
  | "methode"
  | "usages"
  | "exemples"
  | "pieges"
  | "aRetenir"
  | "entrainement";

export const RUBRIQUES_LABELS: Record<FicheRubriqueId, string> = {
  identite: "Carte d'identité",
  reel: "À quoi ça sert (dans le réel)",
  historique: "Un peu d'histoire",
  definition: "Définition",
  proprietes: "Propriétés",
  formule: "La formule",
  methode: "La méthode (les réflexes)",
  usages: "Selon ce que l'on cherche",
  exemples: "Exemples corrigés",
  pieges: "Pièges à éviter",
  aRetenir: "À retenir",
  entrainement: "Je m'entraîne",
};

/** L'ordre canonique EleveAI : le réel et l'histoire d'abord (la façon
 *  Frédéric), puis le cours au format classique Définition → Propriétés. */
export const ORDRE_CANONIQUE: FicheRubriqueId[] = [
  "identite",
  "reel",
  "historique",
  "definition",
  "proprietes",
  "formule",
  "methode",
  "usages",
  "exemples",
  "pieges",
  "aRetenir",
  "entrainement",
];

export type FicheCoursData = {
  matiere: string;
  matiereLabel: string;
  classe: string;
  notion: string;
  titre: string;
  accroche: string;
  identite: FicheIdentite[];
  definition: { texte: string };
  /** Figure de référence de la notion (surtout géométrie) : dessinée par les
   *  canvas du coach (lib/canvas) pour que l'élève retrouve la même figure
   *  dans sa fiche et dans ses exercices. Affichée avec la définition. */
  figure?: { schema: ReactNode; legende?: string };
  proprietes: FichePropriete[];
  reel: { texte: string };
  historique: { texte: string };
  /** Optionnelle : toutes les notions n'ont pas de formule (fiches IA). */
  formule?: {
    contexte: string;
    expression: string;
    legende: string;
    /** Schéma SVG optionnel affiché à côté de la formule. */
    schema?: ReactNode;
  };
  methode: FicheMethode[];
  usages: FicheUsage[];
  exemples: FicheExemple[];
  pieges: string[];
  aRetenir: string[];
  entrainement: FicheExercice[];
  /** Lien du CTA « M'entraîner avec le Coach IA ». */
  coachHref: string;
};
