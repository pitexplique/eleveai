// lib/tutor-v4/questionBank/cm2/maths/algebre.bank.ts
//
// ⭐ 14/11/2026 — Les anciens gabarits (une phrase chacun, 13 à 19 répétitions
// sur 20) sont remplacés par ceux de `algebre-outils.ts` (SITUATION × TOURNURE
// × nombres, niveau CM2). Restent ici les items figés corrects, dont les
// margouillats de la vidéo (manim/scripts/cm2/algebre.py). L'item « requin »
// (3e contexte réunionnais de la micro relation) est retiré : Réunion ≤ 4 %.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { algebreGabaritsCm2 } from "./algebre-outils";

function exp(
  definition: string,
  methode: string,
  calcul: string,
  conclusion: string
) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;
}

function algebreCanvas(data: {
  theme?:
    | "margouillat"
    | "pomme"
    | "eau"
    | "dechet"
    | "surf"
    | "jeu_video"
    | "tresor"
    | "pieces"
    | "requin"
    | "pi";
  titre?: string;
  groupesCaches?: number;
  objetsVisibles?: number;
  symbole?: string;
  expression?: string;
  phrase?: string;
  display?: {
    showConcret?: boolean;
    showExpression?: boolean;
    showPhrase?: boolean;
    showLabels?: boolean;
  };
}) {
  return {
    kind: "algebre" as const,
    theme: data.theme ?? "margouillat",
    titre: data.titre,
    groupesCaches: data.groupesCaches ?? 0,
    objetsVisibles: data.objetsVisibles ?? 0,
    symbole: data.symbole ?? "x",
    expression: data.expression,
    phrase: data.phrase,
    display: {
      showConcret: true,
      showExpression: true,
      showPhrase: true,
      showLabels: true,
      ...(data.display ?? {}),
    },
  };
}

export const algebreBank: TutorBankItemV4[] = [
  // ============================================================
  // ALGEBRE_EGALITE
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_algebre_egalite_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_egalite",
    difficulty: 1,
    theme: "neutral",
    text: "L’égalité 8 + 4 = 6 + 6 est-elle vraie ?",
    format: "qcm",
    choices: ["Oui : les deux côtés valent 12.", "Non : 8 + 4 donne 12, pas 6.", "Non : les nombres ne sont pas les mêmes des deux côtés."],
    expected: ["Oui : les deux côtés valent 12."],
    comparator: "mcq_exact",
    hint: "Calcule chaque côté du signe égal.",
    explanation: exp(
      "Une égalité est vraie si les deux côtés du signe égal ont la même valeur.",
      "On calcule le membre de gauche puis le membre de droite.",
      "8 + 4 = 12 et 6 + 6 = 12.",
      "Les deux côtés valent 12, donc l’égalité est vraie."
    ),
    tags: ["cm2", "algebre", "egalite"],
  },





  // ============================================================
  // ALGEBRE_COMPLETER_EGALITE
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_algebre_completer_egalite_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_completer_egalite",
    difficulty: 1,
    theme: "neutral",
    text: "Complète : 7 + ? = 12",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Cherche combien il manque pour aller de 7 à 12.",
    explanation: exp(
      "Compléter une égalité, c’est trouver le nombre qui rend l’égalité vraie.",
      "On cherche le nombre manquant.",
      "7 + 5 = 12.",
      "Le nombre manquant est 5."
    ),
    tags: ["cm2", "algebre", "egalite", "nombre_inconnu"],
  },









  // ============================================================
  // ALGEBRE_NOMBRE_INCONNU
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_algebre_nombre_inconnu_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_nombre_inconnu",
    difficulty: 2,
    theme: "neutral",
    text: "Je pense à un nombre. Je lui ajoute 9 et j’obtiens 20. Quel est ce nombre ?",
    format: "short",
    expected: ["11"],
    comparator: "number_equal",
    hint: "Fais l’opération inverse : 20 − 9.",
    explanation: exp(
      "Un nombre inconnu est un nombre que l’on cherche.",
      "On utilise souvent l’opération inverse pour le retrouver.",
      "20 − 9 = 11.",
      "Le nombre cherché est 11."
    ),
    canvas: algebreCanvas({
      theme: "pi",
      titre: "Nommer ce qu’on ne connaît pas",
      groupesCaches: 1,
      objetsVisibles: 0,
      symbole: "x",
      expression: "x + 9 = 20",
      phrase:
        "Quand on ne connaît pas un nombre, on peut lui donner un nom : ici, on l’appelle x.",
    }),
    tags: ["cm2", "algebre", "nombre_inconnu", "canvas"],
  },





  // ============================================================
  // ALGEBRE_SCHEMA_BARRE
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_algebre_schema_barre_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_schema_barre",
    difficulty: 2,
    theme: "neutral",
    text: "Lina a 18 billes. Noa en a 7 de moins. Combien Noa a-t-il de billes ?",
    format: "short",
    expected: ["11"],
    comparator: "number_equal",
    hint: "Dans un schéma en barres, la barre de Noa est plus courte de 7.",
    explanation: exp(
      "Un schéma en barres aide à représenter les quantités et leurs relations.",
      "Ici, Noa a moins que Lina : on soustrait la différence.",
      "18 − 7 = 11.",
      "Noa a 11 billes."
    ),
    tags: ["cm2", "algebre", "schema_barre", "probleme"],
  },





  // ============================================================
  // ALGEBRE_MOTIF
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_algebre_motif_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_motif",
    difficulty: 2,
    theme: "neutral",
    text: "Observe la suite : 3, 6, 9, 12, ? Quel nombre vient ensuite ?",
    format: "short",
    expected: ["15"],
    comparator: "number_equal",
    hint: "On ajoute toujours le même nombre.",
    explanation: exp(
      "Un motif évolutif suit une règle qui se répète.",
      "On cherche ce qui change d’un terme au suivant.",
      "On ajoute 3 à chaque fois : 12 + 3 = 15.",
      "Le nombre suivant est 15."
    ),
    tags: ["cm2", "algebre", "motif", "suite"],
  },





  // ============================================================
  // ALGEBRE_RELATION
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_algebre_relation_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_relation",
    difficulty: 3,
    theme: "neutral",
    text: "Dans une machine, on multiplie le nombre d’entrée par 3. Si on entre 7, quel nombre sort ?",
    format: "short",
    expected: ["21"],
    comparator: "number_equal",
    hint: "La règle est : sortie = entrée × 3.",
    explanation: exp(
      "Une relation décrit comment une quantité dépend d’une autre.",
      "On applique la règle donnée au nombre d’entrée.",
      "7 × 3 = 21.",
      "Le nombre qui sort est 21."
    ),
    tags: ["cm2", "algebre", "relation", "machine"],
  },





  // ============================================================
  // ALGEBRE_MODELISER
  // ============================================================



  {
    kind: "fixed",
    id: "cm2_algebre_modeliser_margouillat_fixed_2",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_nombre_inconnu",
    difficulty: 3,
    theme: "reunion",
    text: "Chaque feuille cache x margouillats. Il y a 3 feuilles et 2 margouillats visibles. Quelle expression modélise la situation ?",
    format: "qcm",
    choices: ["3x + 2", "x + 5", "3 + 2x", "5x"],
    expected: ["3x + 2"],
    comparator: "mcq_exact",
    hint: "Il y a 3 groupes inconnus et 2 objets visibles.",
    explanation: exp(
      "Modéliser, c’est traduire une situation par une écriture mathématique.",
      "Chaque feuille représente x margouillats. Trois feuilles représentent 3x. On ajoute les 2 margouillats visibles.",
      "3x + 2.",
      "L’expression qui modélise la situation est 3x + 2."
    ),
    canvas: algebreCanvas({
      theme: "margouillat",
      titre: "Modéliser une situation",
      groupesCaches: 3,
      objetsVisibles: 2,
      symbole: "x",
      expression: "3x + 2",
      phrase:
        "Trois feuilles cachent le même nombre de margouillats, et deux margouillats sont visibles.",
    }),
    tags: ["cm2", "algebre", "modelisation", "margouillat", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm2_algebre_modeliser_eau_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_relation",
    difficulty: 3,
    theme: "reunion",
    text: "Chaque réservoir contient x litres d’eau. Il y a 4 réservoirs. Quelle expression modélise la quantité totale d’eau ?",
    format: "qcm",
    choices: ["4x", "x + 4", "4 + x", "x ÷ 4"],
    expected: ["4x"],
    comparator: "mcq_exact",
    hint: "Il y a 4 fois la même quantité inconnue.",
    explanation: exp(
      "Une lettre peut représenter une quantité inconnue.",
      "Chaque réservoir contient x litres. Quatre réservoirs contiennent donc 4 fois x.",
      "x + x + x + x = 4x.",
      "La quantité totale est modélisée par 4x."
    ),
    canvas: algebreCanvas({
      theme: "eau",
      titre: "Quantité d’eau inconnue",
      groupesCaches: 4,
      objetsVisibles: 0,
      symbole: "x",
      expression: "4x",
      phrase:
        "Chaque réservoir contient la même quantité d’eau inconnue. On l’appelle x.",
    }),
    tags: ["cm2", "algebre", "eau", "modelisation", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm2_algebre_modeliser_dechet_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_relation",
    difficulty: 3,
    theme: "reunion",
    text: "Une classe a déjà ramassé x déchets sur la plage. Elle en ramasse encore 15. Quelle expression modélise le total ?",
    format: "qcm",
    choices: ["x + 15", "15x", "x − 15", "15 − x"],
    expected: ["x + 15"],
    comparator: "mcq_exact",
    hint: "On ajoute 15 déchets au nombre déjà ramassé.",
    explanation: exp(
      "Une expression peut décrire une situation même quand on ne connaît pas tout.",
      "On ne connaît pas le nombre déjà ramassé : on l’appelle x. Puis on ajoute 15.",
      "x + 15.",
      "Le total est modélisé par x + 15."
    ),
    canvas: algebreCanvas({
      theme: "dechet",
      titre: "Ramassage sur la plage",
      groupesCaches: 1,
      objetsVisibles: 15,
      symbole: "x",
      expression: "x + 15",
      phrase:
        "x représente les déchets déjà ramassés. Les 15 autres déchets sont connus.",
      display: {
        showLabels: true,
      },
    }),
    tags: ["cm2", "algebre", "dechet", "ecologie", "canvas"],
  },

{
  kind: "fixed",
  id: "cm2_algebre_modeliser_tresor_fixed_1",
  niveau: "cm2",
  matiere: "maths",
  notionId: "algebre",
  microId: "algebre_relation",
  difficulty: 3,
  theme: "neutral",
  text:
    "Il y a 3 coffres. Chaque coffre contient x diamants. Il y a aussi 4 diamants visibles. Quelle expression modélise le nombre total de diamants ?",
  format: "qcm",
  choices: ["3x + 4", "x + 7", "4x + 3", "12x"],
  expected: ["3x + 4"],
  comparator: "mcq_exact",
  hint:
    "Chaque coffre contient x diamants. Avec 3 coffres, cela fait 3x. Puis on ajoute les 4 diamants visibles.",
  explanation: exp(
    "Modéliser, c’est traduire une situation avec une écriture mathématique.",
    "Chaque coffre contient x diamants. Comme il y a 3 coffres, cela représente 3x. On ajoute ensuite les 4 diamants visibles.",
    "3x + 4.",
    "L’expression correcte est donc 3x + 4."
  ),
  canvas: algebreCanvas({
    theme: "tresor",
    titre: "Le trésor inconnu",
    groupesCaches: 3,
    objetsVisibles: 4,
    symbole: "x",
    expression: "3x + 4",
    phrase:
      "Chaque coffre contient le même nombre de diamants. On appelle ce nombre x.",
  }),
  tags: ["cm2", "algebre", "tresor", "modelisation", "relation", "canvas"],
},



  // ============================================================
  // ALGEBRE_DEFI
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_algebre_defi_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Défi : un nombre multiplié par 4 donne 36. Quel est ce nombre ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "Utilise l’opération inverse de × 4.",
    explanation: exp(
      "Un défi d’algèbre demande souvent de retrouver une valeur inconnue.",
      "On utilise l’opération inverse.",
      "36 ÷ 4 = 9.",
      "Le nombre cherché est 9."
    ),
    canvas: algebreCanvas({
      theme: "pi",
      titre: "Défi : retrouver x",
      groupesCaches: 4,
      objetsVisibles: 0,
      symbole: "x",
      expression: "4x = 36",
      phrase:
        "Il y a 4 fois la même quantité inconnue. Pour retrouver x, on divise par 4.",
    }),
    tags: ["cm2", "algebre", "defi", "nombre_inconnu", "canvas"],
  },

  // Les gabarits SITUATION × TOURNURE × nombres (14/11/2026, algebre-outils.ts).
  ...algebreGabaritsCm2,
];
