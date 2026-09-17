// ─── La fiche de cours comme DONNÉE ────────────────────────────────────────────
// Le pivot du chantier fiches : une fiche n'est plus une page écrite à la main,
// c'est un objet en blocs typés. Les pages (fiche publique, flashcards élève,
// composeur prof, mode classe, impression) ne sont que des RENDUS de cette
// donnée — même source, plusieurs lunettes.
//
// ═══════════════════════════════════════════════════════════════════════════════
// ⭐⭐ LA RÈGLE DE LA FILLE DE FRÉDÉRIC — ÉCRIRE SIMPLEMENT (17/09/2026)
//
// Frédéric, en relisant la fiche des variations : « je ne comprends pas ce que
// tu dis "de quel côté de l'axe elle passe" » · « simplifie : f′ positif alors f
// croissante, f′ négatif alors f strictement décroissante » · « FICHE ÉLÈVE, IL
// FAUT ÉCRIRE SIMPLEMENT ». Et : « c'était d'ailleurs la remarque de ma fille,
// c'est pour ça qu'elle m'a demandé des fiches d'exercices ».
//
// ⛔ C'est la cause qui a fait naître `lib/fiches-exercices/` : la fiche de cours
// de l'exponentielle n'était ni fausse ni trop longue — elle était écrite dans
// une langue que l'élève ne lit pas. Une phrase juste mais savante est un DÉFAUT,
// au même titre qu'un calcul faux.
//
// Ce qu'on écrit, dans tout ce que l'élève lit (accroche, définition, propriétés,
// légendes de schémas, corrigés) :
//   1. La règle en toutes lettres, dans l'ordre où on la dit en classe :
//      « f′ positif, f est croissante ; f′ négatif, f est strictement
//      décroissante. » ⛔ Jamais une périphrase à la place.
//   2. Une idée par phrase. Le tiret cadratin qui empile une seconde idée est
//      presque toujours à couper en deux phrases.
//   3. Le mot de la classe, pas celui du mathématicien : « ce qui se passe
//      autour » et non « le voisinage » ; « la règle du chapitre » et non « le
//      théorème central » ; « s'écrit » et non « se modélise par ».
//   4. ⭐ Le test : la phrase se dit-elle telle quelle, à l'oral, devant la classe ?
// ═══════════════════════════════════════════════════════════════════════════════

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
export type FicheExercice = {
  question: string;
  correction: string;
  /**
   * ⭐⭐ LE DESSIN DE L'EXERCICE (03/09/2026, Frédéric : « intégrer des images
   * des feuilles précédentes »). Au cycle 2, un exercice qui se fait — entourer,
   * colorier, barrer, repasser — vaut mieux que dix questions écrites pour un
   * enfant qui déchiffre encore. Le dessin N'ILLUSTRE PAS l'énoncé : il EST le
   * support sur lequel l'enfant travaille, et c'est pourquoi il porte souvent
   * la même figure que le cours plus haut — on ne redécouvre pas un dessin au
   * moment d'être évalué dessus.
   */
  schema?: ReactNode;
} & FicheMicros;

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
