// lib/tutor-v4/question-banks/maths/cm1/algebre.bank.ts

import type {
  TutorBankItemV4,
  SchemaBarreCanvasData,
  StatGraphCanvasData,
} from "@/lib/tutor-v4/types";
import { algebreGabaritsCm1 } from "./algebre-outils";

// ⭐ 14/11/2026 — Les ~75 anciens gabarits (une seule phrase chacun : 8 à 10
// squelettes par micro, 12 à 18 répétitions sur 20) et les questions « open »
// (retirées de toute façon par applyMathsKeyboardFree) ont été remplacés par
// les gabarits SITUATION × TOURNURE × nombres de `algebre-outils.ts`. Restent
// ici les items figés corrects.

function exp(
  definition: string,
  methode: string,
  calcul: string,
  conclusion: string
) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;
}

function schemaBarreCanvas(
  data: Omit<SchemaBarreCanvasData, "kind">
): SchemaBarreCanvasData {
  return {
    kind: "schema_barre",
    ...data,
  };
}

function statGraphCanvas(
  data: Omit<StatGraphCanvasData, "kind">
): StatGraphCanvasData {
  return {
    kind: "stat_graph",
    ...data,
  };
}

export const algebreBank: TutorBankItemV4[] = [
  // Items figés (modèles corrects). Les gabarits sont dans algebre-outils.ts.
  {
    kind: "fixed",
    id: "cm1_algebre_nombre_inconnu_fixed_g1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_nombre_inconnu",
    difficulty: 2,
    theme: "neutral",
    text: "Quel nombre remplace l'étoile ? ★ × 4 = 36",
    format: "qcm",
    choices: ["9","8","32","40"],
    expected: ["9"],
    comparator: "mcq_exact",
    hint: "Fais l'opération inverse de la multiplication.",
    explanation: "On divise : 36 ÷ 4 = 9. On vérifie : 9 × 4 = 36.",
    tags: ["cm1","algebre","algebre_nombre_inconnu","guide","qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_algebre_motif_fixed_g1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_motif",
    difficulty: 2,
    theme: "neutral",
    text: "Le motif 3 ; 6 ; 9 ; 12 suit une règle. Quel est le nombre suivant ?",
    format: "qcm",
    choices: ["15","13","18","14"],
    expected: ["15"],
    comparator: "mcq_exact",
    hint: "Trouve la règle qui se répète, puis continue.",
    explanation: "On ajoute 3 à chaque fois : 12 + 3 = 15.",
    tags: ["cm1","algebre","algebre_motif","guide","qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_algebre_egalite_fixed_001_equilibre",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_egalite",
    difficulty: 1,
    theme: "neutral",
    text: "Que signifie le signe = dans une égalité ?",
    format: "qcm",
    choices: [
      "les deux côtés ont la même valeur",
      "il faut toujours additionner",
      "le nombre de gauche est plus grand",
      "le calcul est terminé",
    ],
    expected: ["les deux côtés ont la même valeur"],
    comparator: "mcq_exact",
    hint: "Le signe = fonctionne comme une balance équilibrée.",
    explanation: exp(
      "Une égalité indique que deux expressions ont la même valeur.",
      "On peut imaginer une balance : le côté gauche et le côté droit doivent être équilibrés.",
      "Par exemple, 7 + 3 = 10 car les deux côtés valent 10.",
      "Le signe = signifie donc que les deux côtés ont la même valeur."
    ),
    tags: [
      "cm1",
      "algebre",
      "egalite",
      "definition",
      "equilibre",
      "qcm",
      "fixed",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_algebre_egalite_fixed_002_vrai_faux",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_egalite",
    difficulty: 1,
    theme: "neutral",
    text: "L’égalité 8 + 4 = 10 + 2 est-elle vraie ?",
    format: "qcm",
    choices: [
      "oui : les deux côtés valent 12",
      "non : 8 + 4 ne fait pas 10",
      "non : à droite du signe =, il faut écrire le résultat",
    ],
    expected: ["oui : les deux côtés valent 12"],
    comparator: "mcq_exact",
    hint: "Calcule chaque côté séparément.",
    explanation: exp(
      "Pour vérifier une égalité, on compare la valeur du côté gauche et du côté droit.",
      "On calcule chaque côté séparément.",
      "8 + 4 = 12 et 10 + 2 = 12.",
      "Les deux côtés valent 12, donc l’égalité est vraie."
    ),
    tags: [
      "cm1",
      "algebre",
      "egalite",
      "vrai_faux",
      "qcm",
      "fixed",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_algebre_completer_egalite_fixed_001_modele_addition",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_completer_egalite",
    difficulty: 2,
    theme: "neutral",
    text: "Complète l’égalité : 18 + ? = 25",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Cherche ce qu’il faut ajouter à 18 pour obtenir 25.",
    explanation: exp(
      "Compléter une égalité, c’est trouver le nombre qui rend les deux côtés égaux.",
      "On cherche le nombre manquant dans 18 + ? = 25.",
      "25 - 18 = 7, donc 18 + 7 = 25.",
      "Le nombre manquant est 7."
    ),
    tags: [
      "cm1",
      "algebre",
      "completer_egalite",
      "addition",
      "nombre_manquant",
      "short",
      "fixed",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_algebre_completer_egalite_fixed_002_modele_multiplication",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_completer_egalite",
    difficulty: 2,
    theme: "neutral",
    text: "Complète l’égalité : 6 × ? = 42",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Cherche dans la table de 6.",
    explanation: exp(
      "Dans une égalité avec un facteur manquant, on cherche le nombre qui rend le produit correct.",
      "On peut utiliser les tables de multiplication ou l’opération inverse.",
      "42 ÷ 6 = 7, donc 6 × 7 = 42.",
      "Le nombre manquant est 7."
    ),
    tags: [
      "cm1",
      "algebre",
      "completer_egalite",
      "multiplication",
      "nombre_manquant",
      "short",
      "fixed",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_algebre_nombre_inconnu_fixed_001_modele_addition",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_nombre_inconnu",
    difficulty: 2,
    theme: "neutral",
    text: "Je pense à un nombre. Je lui ajoute 8 et j’obtiens 23. Quel est ce nombre ?",
    format: "short",
    expected: ["15"],
    comparator: "number_equal",
    hint: "Cherche le nombre de départ : fais l’opération inverse.",
    explanation: exp(
      "Trouver un nombre inconnu, c’est retrouver une valeur cachée.",
      "Quand on ajoute 8 pour obtenir 23, on fait l’opération inverse : on soustrait 8.",
      "23 - 8 = 15, donc 15 + 8 = 23.",
      "Le nombre inconnu est 15."
    ),
    canvas: schemaBarreCanvas({
      title: "Nombre inconnu",
      total: "23",
      parts: [
        { label: "Nombre", unknown: true },
        { label: "+ 8", value: "8" },
      ],
      questionLabel: "On cherche le nombre de départ.",
    }),
    tags: [
      "cm1",
      "algebre",
      "nombre_inconnu",
      "addition",
      "schema_barre",
      "short",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_algebre_nombre_inconnu_fixed_002_modele_soustraction",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_nombre_inconnu",
    difficulty: 2,
    theme: "neutral",
    text: "Je pense à un nombre. Je lui enlève 6 et j’obtiens 19. Quel est ce nombre ?",
    format: "short",
    expected: ["25"],
    comparator: "number_equal",
    hint: "Si on a enlevé 6, il faut ajouter 6 pour revenir au départ.",
    explanation: exp(
      "Un nombre inconnu peut être retrouvé avec l’opération inverse.",
      "Si on enlève 6 et qu’on obtient 19, le nombre de départ était plus grand.",
      "19 + 6 = 25, donc 25 - 6 = 19.",
      "Le nombre inconnu est 25."
    ),
    canvas: schemaBarreCanvas({
      title: "Nombre inconnu",
      total: "?",
      parts: [
        { label: "Résultat", value: "19" },
        { label: "Enlevé", value: "6" },
      ],
      questionLabel: "On reconstitue le nombre de départ.",
    }),
    tags: [
      "cm1",
      "algebre",
      "nombre_inconnu",
      "soustraction",
      "schema_barre",
      "short",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_algebre_schema_barre_fixed_001_partie_manquante",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_schema_barre",
    difficulty: 2,
    theme: "neutral",
    text: "Un total vaut 50. Une partie vaut 18. Quelle est l’autre partie ?",
    format: "short",
    expected: ["32"],
    comparator: "number_equal",
    hint: "Dans un schéma en barres, total - partie connue = partie manquante.",
    explanation: exp(
      "Un schéma en barres aide à représenter un total composé de plusieurs parties.",
      "Quand on connaît le total et une partie, on trouve l’autre partie par soustraction.",
      "50 - 18 = 32.",
      "L’autre partie vaut 32."
    ),
    canvas: schemaBarreCanvas({
      title: "Total et partie manquante",
      total: "50",
      parts: [
        { label: "Partie connue", value: "18" },
        { label: "Partie inconnue", unknown: true },
      ],
      questionLabel: "On cherche la partie manquante.",
    }),
    tags: [
      "cm1",
      "algebre",
      "schema_barre",
      "partie_manquante",
      "short",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_algebre_schema_barre_fixed_002_total",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_schema_barre",
    difficulty: 2,
    theme: "neutral",
    text: "Une barre contient deux parties : 24 et 16. Quel est le total ?",
    format: "short",
    expected: ["40"],
    comparator: "number_equal",
    hint: "Pour trouver le total, additionne les parties.",
    explanation: exp(
      "Un schéma en barres peut représenter un total formé de plusieurs parties.",
      "Quand on connaît les parties, on les additionne pour trouver le total.",
      "24 + 16 = 40.",
      "Le total vaut 40."
    ),
    canvas: schemaBarreCanvas({
      title: "Trouver le total",
      total: "?",
      parts: [
        { label: "Partie 1", value: "24" },
        { label: "Partie 2", value: "16" },
      ],
      questionLabel: "On cherche le total.",
    }),
    tags: [
      "cm1",
      "algebre",
      "schema_barre",
      "total",
      "addition",
      "short",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_algebre_motif_fixed_001_suite_plus_3",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_motif",
    difficulty: 2,
    theme: "neutral",
    text: "Observe la suite : 4 ; 7 ; 10 ; 13 ; ? Quel est le nombre suivant ?",
    format: "short",
    expected: ["16"],
    comparator: "number_equal",
    hint: "Regarde ce qu’on ajoute à chaque étape.",
    explanation: exp(
      "Un motif évolutif suit une règle qui se répète.",
      "Pour trouver la règle, on compare deux termes consécutifs.",
      "On ajoute 3 à chaque fois : 4, 7, 10, 13, 16.",
      "Le nombre suivant est 16."
    ),
    canvas: statGraphCanvas({
      graphType: "barres",
      title: "Motif : +3",
      data: [
        { label: "1", value: 4 },
        { label: "2", value: 7 },
        { label: "3", value: 10 },
        { label: "4", value: 13 },
        { label: "5", value: 16 },
      ],
      display: {
        showLabels: true,
        showValues: true,
        highlightIndex: 4,
      },
    }),
    tags: [
      "cm1",
      "algebre",
      "motif",
      "suite",
      "plus_3",
      "short",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_algebre_motif_fixed_002_motif_points",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_motif",
    difficulty: 2,
    theme: "neutral",
    text: "Étape 1 : 3 points. Étape 2 : 6 points. Étape 3 : 9 points. Combien y aura-t-il de points à l’étape 4 ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Le nombre de points augmente de 3 à chaque étape.",
    explanation: exp(
      "Un motif évolutif peut représenter une quantité qui augmente à chaque étape.",
      "On cherche la règle entre les étapes.",
      "On ajoute 3 points à chaque fois : 3, 6, 9, 12.",
      "À l’étape 4, il y aura 12 points."
    ),
    canvas: statGraphCanvas({
      graphType: "barres",
      title: "Nombre de points",
      data: [
        { label: "Étape 1", value: 3 },
        { label: "Étape 2", value: 6 },
        { label: "Étape 3", value: 9 },
        { label: "Étape 4", value: 12 },
      ],
      display: {
        showLabels: true,
        showValues: true,
        highlightIndex: 3,
      },
    }),
    tags: [
      "cm1",
      "algebre",
      "motif",
      "points",
      "suite",
      "short",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_algebre_relation_fixed_001_double",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_relation",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une activité, chaque élève reçoit 2 cartes. S’il y a 6 élèves, combien faut-il de cartes ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Chaque élève reçoit 2 cartes : on multiplie par 2.",
    explanation: exp(
      "Une relation entre deux quantités explique comment une quantité dépend d’une autre.",
      "Ici, le nombre de cartes dépend du nombre d’élèves.",
      "Pour 6 élèves : 6 × 2 = 12.",
      "Il faut 12 cartes."
    ),
    canvas: statGraphCanvas({
      graphType: "barres",
      title: "Relation : nombre d’élèves → cartes",
      data: [
        { label: "1 élève", value: 2 },
        { label: "2 élèves", value: 4 },
        { label: "3 élèves", value: 6 },
        { label: "6 élèves", value: 12 },
      ],
      display: {
        showLabels: true,
        showValues: true,
        highlightIndex: 3,
      },
    }),
    tags: [
      "cm1",
      "algebre",
      "relation",
      "double",
      "multiplication",
      "fixed",
      "short",
      "canvas",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_algebre_relation_fixed_002_table",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_relation",
    difficulty: 2,
    theme: "neutral",
    text: "Une boîte contient 5 crayons. Combien y a-t-il de crayons dans 4 boîtes ?",
    format: "short",
    expected: ["20"],
    comparator: "number_equal",
    hint: "Le nombre de crayons dépend du nombre de boîtes.",
    explanation: exp(
      "Une relation peut associer un nombre d’objets à un nombre de groupes.",
      "Ici, chaque boîte contient 5 crayons.",
      "4 × 5 = 20.",
      "Il y a 20 crayons dans 4 boîtes."
    ),
    canvas: statGraphCanvas({
      graphType: "barres",
      title: "Boîtes et crayons",
      data: [
        { label: "1", value: 5 },
        { label: "2", value: 10 },
        { label: "3", value: 15 },
        { label: "4", value: 20 },
      ],
      display: {
        showLabels: true,
        showValues: true,
        highlightIndex: 3,
      },
    }),
    tags: [
      "cm1",
      "algebre",
      "relation",
      "multiplication",
      "fixed",
      "short",
      "canvas",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_algebre_defi_fixed_001_nombre_cache",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Défi : je pense à un nombre. Je lui ajoute 12, puis j’obtiens 50. Quel est ce nombre ?",
    format: "short",
    expected: ["38"],
    comparator: "number_equal",
    hint: "Fais l’opération inverse : enlève 12 à 50.",
    explanation: exp(
      "Un défi d’algèbre peut cacher un nombre dans une situation simple.",
      "On cherche le nombre de départ. Comme on a ajouté 12, on fait l’opération inverse.",
      "50 - 12 = 38, donc 38 + 12 = 50.",
      "Le nombre caché est 38."
    ),
    canvas: schemaBarreCanvas({
      title: "Nombre caché",
      total: "50",
      parts: [
        { label: "Nombre", unknown: true },
        { label: "+ 12", value: "12" },
      ],
      questionLabel: "On cherche le nombre de départ.",
    }),
    tags: [
      "cm1",
      "algebre",
      "defi",
      "nombre_cache",
      "addition",
      "schema_barre",
      "short",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_algebre_defi_fixed_002_schema_barre",
    niveau: "cm1",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Défi : dans une boîte, il y a 72 objets. Il y a 28 objets rouges, les autres sont bleus. Combien y a-t-il d’objets bleus ?",
    format: "short",
    expected: ["44"],
    comparator: "number_equal",
    hint: "Total - partie connue = partie inconnue.",
    explanation: exp(
      "Un schéma en barres permet de représenter un total et ses parties.",
      "On connaît le total et une partie. On cherche l’autre partie.",
      "72 - 28 = 44.",
      "Il y a 44 objets bleus."
    ),
    canvas: schemaBarreCanvas({
      title: "Total et partie inconnue",
      total: "72",
      parts: [
        { label: "Rouges", value: "28" },
        { label: "Bleus", unknown: true },
      ],
      questionLabel: "On cherche les objets bleus.",
    }),
    tags: [
      "cm1",
      "algebre",
      "defi",
      "schema_barre",
      "partie_manquante",
      "short",
      "fixed",
      "canvas",
    ],
  },

  ...algebreGabaritsCm1,
];

