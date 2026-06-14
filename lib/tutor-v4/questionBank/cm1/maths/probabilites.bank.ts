// lib/tutor-v4/question-banks/maths/cm1/probabilites.bank.ts

import type {
  TutorBankItemV4,
  CanvasProbabilitesData,
} from "@/lib/tutor-v4/types";

function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle<T>(arr: readonly T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: readonly string[]): string[] {
  return shuffle(Array.from(new Set([correct, ...wrongs]))).slice(0, 4);
}

function exp(
  definition: string,
  methode: string,
  observation: string,
  conclusion: string
) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nObservation : ${observation}\n\nConclusion : ${conclusion}`;
}

function probabilitesCanvas(
  data: Omit<CanvasProbabilitesData, "kind">
): CanvasProbabilitesData {
  return {
    kind: "probabilites",
    ...data,
  };
}

// ============================================================
// COULEURS
// ============================================================

const COULEURS = {
  rouge: "#ef4444",
  bleu: "#3b82f6",
  vert: "#22c55e",
  jaune: "#eab308",
  violet: "#a855f7",
  orange: "#f97316",
  rose: "#ec4899",
};

// ============================================================
// HELPERS CANVAS
// ============================================================

type DeFace = 1 | 2 | 3 | 4 | 5 | 6;

function deCanvas(surligne?: DeFace[]): CanvasProbabilitesData {
  return probabilitesCanvas({
    variant: "de",
    de: {
      faces: [1, 2, 3, 4, 5, 6],
      surligne,
    },
  });
}

function roueSimpleCanvas(): CanvasProbabilitesData {
  return probabilitesCanvas({
    variant: "roue",
    roue: {
      segments: [
        { label: "Rouge", poids: 1, couleur: COULEURS.rouge },
        { label: "Bleu", poids: 1, couleur: COULEURS.bleu },
        { label: "Vert", poids: 1, couleur: COULEURS.vert },
        { label: "Jaune", poids: 1, couleur: COULEURS.jaune },
      ],
    },
  });
}

function roueRougeFavoriCanvas(): CanvasProbabilitesData {
  return probabilitesCanvas({
    variant: "roue",
    roue: {
      segments: [
        { label: "Rouge", poids: 3, couleur: COULEURS.rouge },
        { label: "Bleu", poids: 1, couleur: COULEURS.bleu },
        { label: "Vert", poids: 1, couleur: COULEURS.vert },
        { label: "Jaune", poids: 1, couleur: COULEURS.jaune },
      ],
    },
  });
}

function roueAvecPoidsCanvas(args: {
  rouge: number;
  bleu: number;
  vert: number;
  jaune?: number;
}): CanvasProbabilitesData {
  return probabilitesCanvas({
    variant: "roue",
    roue: {
      segments: [
        { label: "Rouge", poids: args.rouge, couleur: COULEURS.rouge },
        { label: "Bleu", poids: args.bleu, couleur: COULEURS.bleu },
        { label: "Vert", poids: args.vert, couleur: COULEURS.vert },
        {
          label: "Jaune",
          poids: args.jaune ?? 1,
          couleur: COULEURS.jaune,
        },
      ],
    },
  });
}

function billesCanvas(): CanvasProbabilitesData {
  return probabilitesCanvas({
    variant: "billes",
    billes: {
      elements: [
        { couleur: COULEURS.rouge, label: "R" },
        { couleur: COULEURS.rouge, label: "R" },
        { couleur: COULEURS.rouge, label: "R" },
        { couleur: COULEURS.bleu, label: "B" },
        { couleur: COULEURS.bleu, label: "B" },
        { couleur: COULEURS.vert, label: "V" },
      ],
    },
  });
}

function billesEquilibreesCanvas(): CanvasProbabilitesData {
  return probabilitesCanvas({
    variant: "billes",
    billes: {
      elements: [
        { couleur: COULEURS.rouge, label: "R" },
        { couleur: COULEURS.rouge, label: "R" },
        { couleur: COULEURS.bleu, label: "B" },
        { couleur: COULEURS.bleu, label: "B" },
        { couleur: COULEURS.vert, label: "V" },
        { couleur: COULEURS.vert, label: "V" },
      ],
    },
  });
}

function billesVariablesCanvas(args: {
  rouges: number;
  bleues: number;
  vertes: number;
  jaunes?: number;
}): CanvasProbabilitesData {
  const elements = [
    ...Array.from({ length: args.rouges }, () => ({
      couleur: COULEURS.rouge,
      label: "R",
    })),
    ...Array.from({ length: args.bleues }, () => ({
      couleur: COULEURS.bleu,
      label: "B",
    })),
    ...Array.from({ length: args.vertes }, () => ({
      couleur: COULEURS.vert,
      label: "V",
    })),
    ...Array.from({ length: args.jaunes ?? 0 }, () => ({
      couleur: COULEURS.jaune,
      label: "J",
    })),
  ];

  return probabilitesCanvas({
    variant: "billes",
    billes: {
      elements,
    },
  });
}

function tableauVocabulaireCanvas(): CanvasProbabilitesData {
  return probabilitesCanvas({
    variant: "tableau",
    tableau: {
      entetes: ["Situation", "Type"],
      lignes: [
        ["Obtenir 7 avec un dé", "impossible"],
        ["Obtenir un nombre de 1 à 6", "certain"],
        ["Obtenir un nombre pair", "possible"],
      ],
      casesSurlignees: [[1, 1]],
    },
  });
}

function couleurLabel(couleur: string) {
  if (couleur === "rouge") return "Rouge";
  if (couleur === "bleu") return "Bleu";
  if (couleur === "vert") return "Vert";
  if (couleur === "jaune") return "Jaune";
  return couleur;
}

// ============================================================
// BANK
// ============================================================

export const probabilitesBank: TutorBankItemV4[] = [
  // ============================================================
  // PROBABILITE_VOCABULAIRE
  // certain / impossible / possible
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_probabilite_vocabulaire_fixed_1_certain",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Un événement certain est un événement qui...",
    format: "qcm",
    choices: [
      "se produit toujours",
      "ne se produit jamais",
      "peut se produire mais pas toujours",
      "est impossible",
    ],
    expected: ["se produit toujours"],
    comparator: "mcq_exact",
    hint: "Certain veut dire : on est sûr que cela arrive.",
    explanation: exp(
      "Un événement certain se produit toujours.",
      "On se demande si le résultat arrive à chaque fois.",
      "Par exemple, avec un dé classique, obtenir un nombre entre 1 et 6 est certain.",
      "La bonne réponse est : se produit toujours."
    ),
    tags: ["cm1", "probabilite", "vocabulaire", "certain", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_vocabulaire_fixed_2_impossible",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Un événement impossible est un événement qui...",
    format: "qcm",
    choices: [
      "ne peut jamais se produire",
      "se produit toujours",
      "arrive une fois sur deux",
      "est certain",
    ],
    expected: ["ne peut jamais se produire"],
    comparator: "mcq_exact",
    hint: "Impossible veut dire : cela ne peut pas arriver.",
    explanation: exp(
      "Un événement impossible ne peut jamais se produire.",
      "On vérifie si le résultat peut exister.",
      "Avec un dé classique, obtenir 7 est impossible.",
      "La bonne réponse est : ne peut jamais se produire."
    ),
    tags: ["cm1", "probabilite", "vocabulaire", "impossible", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_vocabulaire_fixed_3_possible",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Un événement possible est un événement qui...",
    format: "qcm",
    choices: [
      "peut se produire",
      "ne peut jamais se produire",
      "se produit toujours",
      "n’existe pas",
    ],
    expected: ["peut se produire"],
    comparator: "mcq_exact",
    hint: "Possible veut dire : cela peut arriver.",
    explanation: exp(
      "Un événement possible peut se produire.",
      "Il n’est pas forcément certain.",
      "Avec un dé, obtenir 4 est possible, mais on peut aussi obtenir un autre nombre.",
      "La bonne réponse est : peut se produire."
    ),
    tags: ["cm1", "probabilite", "vocabulaire", "possible", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_vocabulaire_fixed_4_de_7",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Avec un dé classique, obtenir 7 est...",
    format: "qcm",
    choices: ["impossible", "possible", "certain"],
    expected: ["impossible"],
    comparator: "mcq_exact",
    hint: "Un dé classique a seulement les faces 1, 2, 3, 4, 5 et 6.",
    explanation: exp(
      "Un événement impossible ne peut pas arriver.",
      "On regarde les faces du dé.",
      "Il n’y a pas de face 7 sur un dé classique.",
      "Obtenir 7 est impossible."
    ),
    tags: ["cm1", "probabilite", "vocabulaire", "de", "qcm", "canvas"],
    canvas: deCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_vocabulaire_fixed_5_de_1_a_6",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Avec un dé classique, obtenir un nombre entre 1 et 6 est...",
    format: "qcm",
    choices: ["certain", "possible", "impossible"],
    expected: ["certain"],
    comparator: "mcq_exact",
    hint: "Toutes les faces du dé sont entre 1 et 6.",
    explanation: exp(
      "Un événement certain se produit toujours.",
      "On regarde toutes les faces possibles du dé.",
      "Les faces sont 1, 2, 3, 4, 5 et 6.",
      "Obtenir un nombre entre 1 et 6 est certain."
    ),
    tags: ["cm1", "probabilite", "vocabulaire", "de", "certain", "canvas"],
    canvas: deCanvas([1, 2, 3, 4, 5, 6]),
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_vocabulaire_fixed_6_de_pair",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Avec un dé classique, obtenir un nombre pair est...",
    format: "qcm",
    choices: ["possible", "certain", "impossible"],
    expected: ["possible"],
    comparator: "mcq_exact",
    hint: "Les nombres pairs du dé sont 2, 4 et 6.",
    explanation: exp(
      "Un événement possible peut arriver, mais pas toujours.",
      "On cherche les faces paires.",
      "Les faces 2, 4 et 6 existent, mais il y a aussi 1, 3 et 5.",
      "Obtenir un nombre pair est possible."
    ),
    tags: ["cm1", "probabilite", "vocabulaire", "de", "pair", "canvas"],
    canvas: deCanvas([2, 4, 6]),
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_vocabulaire_fixed_7_roue_noir",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Avec cette roue, tomber sur noir est...",
    format: "qcm",
    choices: ["impossible", "possible", "certain"],
    expected: ["impossible"],
    comparator: "mcq_exact",
    hint: "Cherche s’il y a une partie noire sur la roue.",
    explanation: exp(
      "Un événement impossible ne peut pas arriver.",
      "On observe les couleurs présentes sur la roue.",
      "La roue contient rouge, bleu, vert et jaune, mais pas noir.",
      "Tomber sur noir est impossible."
    ),
    tags: ["cm1", "probabilite", "vocabulaire", "roue", "canvas"],
    canvas: roueSimpleCanvas(),
  },

  {
    kind: "template",
    id: "cm1_probabilite_vocabulaire_tpl_1_de",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde les faces possibles du dé.",
    tags: ["cm1", "probabilite", "vocabulaire", "de", "template", "canvas"],
    generate: () => {
      const situations: Array<{
        text: string;
        expected: "possible" | "impossible" | "certain";
        surligne: DeFace[];
        observation: string;
      }> = [
        {
          text: "Avec un dé classique, obtenir 5 est...",
          expected: "possible",
          surligne: [5],
          observation: "La face 5 existe, mais elle ne sort pas toujours.",
        },
        {
          text: "Avec un dé classique, obtenir 8 est...",
          expected: "impossible",
          surligne: [],
          observation: "La face 8 n’existe pas sur un dé classique.",
        },
        {
          text: "Avec un dé classique, obtenir un nombre de 1 à 6 est...",
          expected: "certain",
          surligne: [1, 2, 3, 4, 5, 6],
          observation: "Toutes les faces du dé sont de 1 à 6.",
        },
        {
          text: "Avec un dé classique, obtenir un nombre impair est...",
          expected: "possible",
          surligne: [1, 3, 5],
          observation: "Les faces 1, 3 et 5 existent, mais ce n’est pas sûr.",
        },
      ];

      const item = randomChoice(situations);

      return {
        text: item.text,
        format: "qcm",
        choices: ["possible", "impossible", "certain"],
        expected: [item.expected],
        comparator: "mcq_exact",
        explanation: exp(
          "On utilise les mots possible, impossible et certain.",
          "On regarde les résultats qui peuvent sortir.",
          item.observation,
          `L’événement est ${item.expected}.`
        ),
        canvas: deCanvas(item.surligne),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probabilite_vocabulaire_tpl_2_billes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde si la couleur existe dans le sac.",
    tags: ["cm1", "probabilite", "vocabulaire", "billes", "template", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          couleur: "rouge",
          expected: "possible",
          observation: "Il y a des billes rouges dans le sac.",
        },
        {
          couleur: "bleue",
          expected: "possible",
          observation: "Il y a des billes bleues dans le sac.",
        },
        {
          couleur: "jaune",
          expected: "impossible",
          observation: "Il n’y a pas de bille jaune dans le sac.",
        },
      ]);

      return {
        text: `Dans ce sac, tirer une bille ${item.couleur} est...`,
        format: "qcm",
        choices: ["possible", "impossible", "certain"],
        expected: [item.expected],
        comparator: "mcq_exact",
        explanation: exp(
          "On utilise les mots possible, impossible et certain.",
          "On regarde les couleurs présentes dans le sac.",
          item.observation,
          `Tirer une bille ${item.couleur} est ${item.expected}.`
        ),
        canvas: billesCanvas(),
      };
    },
  },

  // ============================================================
  // PROBABILITE_HASARD
  // Reconnaître une situation de hasard
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_probabilite_hasard_fixed_1_definition",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_hasard",
    difficulty: 1,
    theme: "neutral",
    text: "Une situation de hasard est une situation où...",
    format: "qcm",
    choices: [
      "on ne connaît pas le résultat à l’avance",
      "on connaît toujours le résultat",
      "il n’y a aucun résultat possible",
      "le résultat est écrit au tableau",
    ],
    expected: ["on ne connaît pas le résultat à l’avance"],
    comparator: "mcq_exact",
    hint: "Avec le hasard, plusieurs résultats peuvent arriver.",
    explanation: exp(
      "Une situation de hasard est une situation dont on ne connaît pas le résultat à l’avance.",
      "On vérifie s’il y a plusieurs résultats possibles.",
      "Avec un dé, on ne sait pas à l’avance quelle face va sortir.",
      "C’est une situation de hasard."
    ),
    tags: ["cm1", "probabilite", "hasard", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_hasard_fixed_2_lancer_de",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_hasard",
    difficulty: 1,
    theme: "neutral",
    text: "Lancer un dé classique est une situation de hasard parce que...",
    format: "qcm",
    choices: [
      "on ne sait pas à l’avance quelle face va sortir",
      "on obtient toujours 6",
      "le dé n’a aucune face",
      "on choisit le résultat après le lancer",
    ],
    expected: ["on ne sait pas à l’avance quelle face va sortir"],
    comparator: "mcq_exact",
    hint: "Avant le lancer, plusieurs faces peuvent sortir.",
    explanation: exp(
      "Une situation de hasard a un résultat inconnu à l’avance.",
      "On regarde s’il y a plusieurs résultats possibles.",
      "Avec un dé, 1, 2, 3, 4, 5 ou 6 peuvent sortir.",
      "Lancer un dé est une situation de hasard."
    ),
    tags: ["cm1", "probabilite", "hasard", "de", "qcm", "canvas"],
    canvas: deCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_hasard_fixed_3_roue",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_hasard",
    difficulty: 1,
    theme: "neutral",
    text: "Faire tourner cette roue est une situation de hasard parce que...",
    format: "qcm",
    choices: [
      "on ne sait pas à l’avance sur quelle couleur elle va s’arrêter",
      "elle s’arrête toujours sur rouge",
      "il n’y a aucune couleur",
      "on choisit la couleur après",
    ],
    expected: ["on ne sait pas à l’avance sur quelle couleur elle va s’arrêter"],
    comparator: "mcq_exact",
    hint: "La roue contient plusieurs couleurs.",
    explanation: exp(
      "Une situation de hasard a plusieurs résultats possibles.",
      "On observe la roue.",
      "Elle peut s’arrêter sur plusieurs couleurs.",
      "On ne sait pas à l’avance où elle va s’arrêter."
    ),
    tags: ["cm1", "probabilite", "hasard", "roue", "qcm", "canvas"],
    canvas: roueSimpleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_hasard_fixed_4_pas_hasard_calcul",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_hasard",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer 4 + 5 est-il une situation de hasard ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le résultat de 4 + 5 est toujours le même.",
    explanation: exp(
      "Une situation de hasard a un résultat inconnu à l’avance.",
      "Pour un calcul, le résultat est fixé.",
      "4 + 5 vaut toujours 9.",
      "Ce n’est pas une situation de hasard."
    ),
    tags: ["cm1", "probabilite", "hasard", "non_hasard", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_hasard_fixed_5_tombola_reunion",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_hasard",
    difficulty: 2,
    theme: "reunion",
    text: "À une tombola d’école à La Réunion, on tire un ticket sans regarder. Pourquoi est-ce une situation de hasard ?",
    format: "qcm",
    choices: [
      "on ne sait pas à l’avance quel ticket sera tiré",
      "le même ticket sort toujours",
      "il n’y a aucun ticket",
      "on choisit le gagnant après avoir regardé",
    ],
    expected: ["on ne sait pas à l’avance quel ticket sera tiré"],
    comparator: "mcq_exact",
    hint: "Avant le tirage, plusieurs tickets peuvent sortir.",
    explanation: exp(
      "Une situation de hasard a un résultat inconnu à l’avance.",
      "On tire un ticket sans regarder.",
      "Plusieurs tickets peuvent être tirés.",
      "On ne sait pas à l’avance quel ticket sortira."
    ),
    tags: ["cm1", "probabilite", "hasard", "reunion", "tombola", "qcm"],
  },

  {
    kind: "template",
    id: "cm1_probabilite_hasard_tpl_1_situation",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_hasard",
    difficulty: 2,
    theme: "neutral",
    hint: "Demande-toi si on connaît le résultat à l’avance.",
    tags: ["cm1", "probabilite", "hasard", "template", "qcm"],
    generate: () => {
      const item = randomChoice([
        {
          situation: "lancer un dé",
          expected: "oui",
          observation: "On ne sait pas quelle face va sortir.",
        },
        {
          situation: "tirer une bille sans regarder",
          expected: "oui",
          observation: "On ne sait pas quelle bille sera tirée.",
        },
        {
          situation: "calculer 10 + 5",
          expected: "non",
          observation: "Le résultat est toujours 15.",
        },
        {
          situation: "lire son prénom sur son cahier",
          expected: "non",
          observation: "L’information est déjà connue.",
        },
      ]);

      return {
        text: `${item.situation} est-il une situation de hasard ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [item.expected],
        comparator: "mcq_exact",
        explanation: exp(
          "Une situation de hasard a un résultat inconnu à l’avance.",
          "On se demande si le résultat est déjà connu.",
          item.observation,
          `La bonne réponse est ${item.expected}.`
        ),
      };
    },
  },

  // ============================================================
  // PROBABILITE_COMPARER
  // Comparer des chances simples
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_probabilite_comparer_fixed_1_billes_rouge_bleu",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Dans ce sac, quelle couleur a le plus de chances d’être tirée ?",
    format: "qcm",
    choices: ["rouge", "bleu", "vert", "elles ont toutes autant de chances"],
    expected: ["rouge"],
    comparator: "mcq_exact",
    hint: "Compare le nombre de billes de chaque couleur.",
    explanation: exp(
      "Plus il y a d’objets d’un type, plus ce type a de chances d’être tiré.",
      "On compte les billes de chaque couleur.",
      "Il y a 3 rouges, 2 bleues et 1 verte.",
      "La couleur rouge a le plus de chances."
    ),
    tags: ["cm1", "probabilite", "comparer", "billes", "qcm", "canvas"],
    canvas: billesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_comparer_fixed_2_billes_equilibrees",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Dans ce sac, rouge, bleu et vert ont...",
    format: "qcm",
    choices: [
      "autant de chances",
      "rouge a plus de chances",
      "bleu est impossible",
      "vert est certain",
    ],
    expected: ["autant de chances"],
    comparator: "mcq_exact",
    hint: "Compte les billes de chaque couleur.",
    explanation: exp(
      "Deux événements ont autant de chances quand ils ont le même nombre de cas favorables.",
      "On compte les billes rouges, bleues et vertes.",
      "Il y a 2 rouges, 2 bleues et 2 vertes.",
      "Les trois couleurs ont autant de chances."
    ),
    tags: ["cm1", "probabilite", "comparer", "egalite", "qcm", "canvas"],
    canvas: billesEquilibreesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_comparer_fixed_3_roue_rouge",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Sur cette roue, quelle couleur a le plus de chances de sortir ?",
    format: "qcm",
    choices: ["Rouge", "Bleu", "Vert", "Jaune"],
    expected: ["Rouge"],
    comparator: "mcq_exact",
    hint: "Regarde la couleur qui prend le plus de place.",
    explanation: exp(
      "Sur une roue, une couleur a plus de chances si elle occupe une plus grande partie.",
      "On compare les tailles des parties.",
      "La partie rouge est plus grande que les autres.",
      "Rouge a le plus de chances de sortir."
    ),
    tags: ["cm1", "probabilite", "comparer", "roue", "qcm", "canvas"],
    canvas: roueRougeFavoriCanvas(),
  },

  {
    kind: "template",
    id: "cm1_probabilite_comparer_tpl_1_billes_plus_probable",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte chaque couleur puis compare.",
    tags: ["cm1", "probabilite", "comparer", "billes", "template", "canvas"],
    generate: () => {
      const rouge = randomInt(2, 5);
      const bleu = randomInt(1, rouge - 1);
      const vert = randomInt(1, bleu);

      return {
        text: "Dans ce sac, quelle couleur a le plus de chances d’être tirée ?",
        format: "qcm",
        choices: ["rouge", "bleu", "vert"],
        expected: ["rouge"],
        comparator: "mcq_exact",
        explanation: exp(
          "La couleur la plus présente a le plus de chances d’être tirée.",
          "On compte les billes de chaque couleur.",
          `Rouge : ${rouge}, bleu : ${bleu}, vert : ${vert}.`,
          "La couleur rouge a le plus de chances."
        ),
        canvas: billesVariablesCanvas({
          rouges: rouge,
          bleues: bleu,
          vertes: vert,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probabilite_comparer_tpl_2_roue_plus_probable",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare la taille des parties de la roue.",
    tags: ["cm1", "probabilite", "comparer", "roue", "template", "canvas"],
    generate: () => {
      const cas = randomChoice([
        {
          attendu: "Rouge",
          poids: { rouge: 4, bleu: 1, vert: 1, jaune: 1 },
        },
        {
          attendu: "Bleu",
          poids: { rouge: 1, bleu: 4, vert: 1, jaune: 1 },
        },
        {
          attendu: "Vert",
          poids: { rouge: 1, bleu: 1, vert: 4, jaune: 1 },
        },
      ]);

      return {
        text: "Sur cette roue, quelle couleur a le plus de chances de sortir ?",
        format: "qcm",
        choices: ["Rouge", "Bleu", "Vert", "Jaune"],
        expected: [cas.attendu],
        comparator: "mcq_exact",
        explanation: exp(
          "Sur une roue, la couleur la plus grande a plus de chances.",
          "On compare les parts de la roue.",
          `La plus grande partie est ${cas.attendu}.`,
          `${cas.attendu} a le plus de chances de sortir.`
        ),
        canvas: roueAvecPoidsCanvas(cas.poids),
      };
    },
  },

  // ============================================================
  // PROBABILITE_ROUE_DE_SAC
  // Raisonner avec une roue, un dé ou un sac
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_probabilite_roue_de_sac_fixed_1_de_pair",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 2,
    theme: "neutral",
    text: "Avec ce dé, quelles faces permettent d’obtenir un nombre pair ?",
    format: "qcm",
    choices: ["2, 4 et 6", "1, 3 et 5", "1, 2 et 3", "4, 5 et 6"],
    expected: ["2, 4 et 6"],
    comparator: "mcq_exact",
    hint: "Les nombres pairs se terminent par 0, 2, 4, 6 ou 8.",
    explanation: exp(
      "Un nombre pair est divisible par 2.",
      "On regarde les faces du dé.",
      "Les faces paires sont 2, 4 et 6.",
      "Les faces favorables sont 2, 4 et 6."
    ),
    tags: ["cm1", "probabilite", "de", "pair", "qcm", "canvas"],
    canvas: deCanvas([2, 4, 6]),
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_roue_de_sac_fixed_2_sac_rouge",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 2,
    theme: "neutral",
    text: "Dans ce sac, combien y a-t-il de billes rouges ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Compte les billes avec la lettre R.",
    explanation: exp(
      "Pour raisonner avec un sac, on compte les objets.",
      "On repère les billes rouges.",
      "Il y a 3 billes rouges.",
      "La réponse est 3."
    ),
    tags: ["cm1", "probabilite", "sac", "billes", "short", "canvas"],
    canvas: billesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_roue_de_sac_fixed_3_roue_possible",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 2,
    theme: "neutral",
    text: "Avec cette roue, tomber sur bleu est...",
    format: "qcm",
    choices: ["possible", "impossible", "certain"],
    expected: ["possible"],
    comparator: "mcq_exact",
    hint: "La roue contient une partie bleue.",
    explanation: exp(
      "Une couleur est possible si elle apparaît sur la roue.",
      "On observe les couleurs de la roue.",
      "Il y a une partie bleue, mais il y a aussi d’autres couleurs.",
      "Tomber sur bleu est possible."
    ),
    tags: ["cm1", "probabilite", "roue", "possible", "qcm", "canvas"],
    canvas: roueSimpleCanvas(),
  },

  {
    kind: "template",
    id: "cm1_probabilite_roue_de_sac_tpl_1_compter_couleur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les billes de la couleur demandée.",
    tags: ["cm1", "probabilite", "sac", "billes", "template", "canvas"],
    generate: () => {
      const rouges = randomInt(2, 5);
      const bleues = randomInt(1, 4);
      const vertes = randomInt(1, 3);

      const couleur = randomChoice([
        { nom: "rouges", valeur: rouges },
        { nom: "bleues", valeur: bleues },
        { nom: "vertes", valeur: vertes },
      ]);

      return {
        text: `Dans ce sac, combien y a-t-il de billes ${couleur.nom} ?`,
        format: "short",
        expected: [String(couleur.valeur)],
        comparator: "number_equal",
        explanation: exp(
          "Pour raisonner avec un sac, on compte les billes.",
          "On repère seulement la couleur demandée.",
          `Il y a ${couleur.valeur} billes ${couleur.nom}.`,
          `La réponse est ${couleur.valeur}.`
        ),
        canvas: billesVariablesCanvas({
          rouges,
          bleues,
          vertes,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probabilite_roue_de_sac_tpl_2_de_faces",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 3,
    theme: "neutral",
    hint: "Repère les faces qui conviennent.",
    tags: ["cm1", "probabilite", "de", "template", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          question: "Quelles faces permettent d’obtenir un nombre impair ?",
          expected: "1, 3 et 5",
          wrongs: ["2, 4 et 6", "1, 2 et 3", "4, 5 et 6"],
          surligne: [1, 3, 5] as DeFace[],
          observation: "Les faces impaires sont 1, 3 et 5.",
        },
        {
          question: "Quelles faces permettent d’obtenir un nombre supérieur à 4 ?",
          expected: "5 et 6",
          wrongs: ["1 et 2", "2 et 4", "1, 3 et 5"],
          surligne: [5, 6] as DeFace[],
          observation: "Les faces supérieures à 4 sont 5 et 6.",
        },
        {
          question: "Quelles faces permettent d’obtenir un nombre inférieur à 3 ?",
          expected: "1 et 2",
          wrongs: ["3 et 4", "5 et 6", "2, 4 et 6"],
          surligne: [1, 2] as DeFace[],
          observation: "Les faces inférieures à 3 sont 1 et 2.",
        },
      ]);

      return {
        text: item.question,
        format: "qcm",
        choices: makeChoices(item.expected, item.wrongs),
        expected: [item.expected],
        comparator: "mcq_exact",
        explanation: exp(
          "Avec un dé, les résultats possibles sont les faces 1 à 6.",
          "On repère les faces qui respectent la condition.",
          item.observation,
          `La bonne réponse est : ${item.expected}.`
        ),
        canvas: deCanvas(item.surligne),
      };
    },
  },

  // ============================================================
  // PROBABILITE_DEFI
  // Défis courts, concrets, sans piège
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_probabilite_defi_fixed_1_sac_plus_probable",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Dans ce sac, quelle couleur est la plus probable ?",
    format: "qcm",
    choices: ["rouge", "bleu", "vert", "jaune"],
    expected: ["rouge"],
    comparator: "mcq_exact",
    hint: "Compte les billes de chaque couleur.",
    explanation: exp(
      "La couleur la plus probable est celle qui apparaît le plus souvent.",
      "On compte chaque couleur.",
      "Il y a 3 rouges, 2 bleues et 1 verte.",
      "Rouge est la couleur la plus probable."
    ),
    tags: ["cm1", "probabilite", "defi", "sac", "qcm", "canvas"],
    canvas: billesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_defi_fixed_2_de_possible_impossible",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Avec un dé classique, quel événement est impossible ?",
    format: "qcm",
    choices: [
      "obtenir 8",
      "obtenir 4",
      "obtenir un nombre pair",
      "obtenir un nombre entre 1 et 6",
    ],
    expected: ["obtenir 8"],
    comparator: "mcq_exact",
    hint: "Cherche l’événement qui ne peut pas arriver.",
    explanation: exp(
      "Un événement impossible ne peut jamais arriver.",
      "On regarde les faces du dé.",
      "Un dé classique n’a pas de face 8.",
      "Obtenir 8 est impossible."
    ),
    tags: ["cm1", "probabilite", "defi", "de", "qcm", "canvas"],
    canvas: deCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_defi_fixed_3_reunion_kermesse",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 3,
    theme: "reunion",
    text: "À la kermesse, une roue contient 3 parts rouges, 1 bleue, 1 verte et 1 jaune. Quelle couleur a le plus de chances de sortir ?",
    format: "qcm",
    choices: ["Rouge", "Bleu", "Vert", "Jaune"],
    expected: ["Rouge"],
    comparator: "mcq_exact",
    hint: "Cherche la couleur qui apparaît le plus sur la roue.",
    explanation: exp(
      "Sur une roue, plus une couleur occupe de place, plus elle a de chances de sortir.",
      "On compare les parts de couleur.",
      "Rouge a 3 parts, les autres couleurs ont 1 part.",
      "Rouge a le plus de chances de sortir."
    ),
    tags: ["cm1", "probabilite", "defi", "roue", "reunion", "canvas"],
    canvas: roueRougeFavoriCanvas(),
  },

  {
    kind: "template",
    id: "cm1_probabilite_defi_tpl_1_billes_plus_probable",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Compte chaque couleur puis compare les nombres.",
    tags: ["cm1", "probabilite", "defi", "billes", "template", "canvas"],
    generate: () => {
      const rouge = randomInt(3, 6);
      const bleu = randomInt(1, rouge - 1);
      const vert = randomInt(1, bleu);

      return {
        text: `Un sac contient ${rouge} billes rouges, ${bleu} billes bleues et ${vert} billes vertes. Quelle couleur a le plus de chances d’être tirée ?`,
        format: "qcm",
        choices: ["rouge", "bleu", "vert"],
        expected: ["rouge"],
        comparator: "mcq_exact",
        explanation: exp(
          "La couleur la plus probable est celle qui apparaît le plus.",
          "On compare le nombre de billes de chaque couleur.",
          `Rouge : ${rouge}, bleu : ${bleu}, vert : ${vert}.`,
          "La couleur rouge a le plus de chances."
        ),
        canvas: billesVariablesCanvas({
          rouges: rouge,
          bleues: bleu,
          vertes: vert,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_probabilite_defi_tpl_2_possible_impossible",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche si l’événement peut arriver ou non.",
    tags: ["cm1", "probabilite", "defi", "possible_impossible", "template", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          text: "Avec un dé classique, obtenir 10 est...",
          expected: "impossible",
          observation: "Un dé classique n’a pas de face 10.",
          canvas: deCanvas(),
        },
        {
          text: "Dans un sac avec des billes rouges, bleues et vertes, tirer une bille rouge est...",
          expected: "possible",
          observation: "Le sac contient des billes rouges.",
          canvas: billesCanvas(),
        },
        {
          text: "Avec une roue rouge, bleue, verte et jaune, tomber sur noir est...",
          expected: "impossible",
          observation: "La roue ne contient pas de partie noire.",
          canvas: roueSimpleCanvas(),
        },
      ]);

      return {
        text: item.text,
        format: "qcm",
        choices: ["possible", "impossible", "certain"],
        expected: [item.expected],
        comparator: "mcq_exact",
        explanation: exp(
          "On classe l’événement avec les mots possible, impossible ou certain.",
          "On observe les résultats disponibles.",
          item.observation,
          `L’événement est ${item.expected}.`
        ),
        canvas: item.canvas,
      };
    },
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_defi_open_1_expliquer_possible",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi tirer une bille rouge est possible dans ce sac.",
    format: "open",
    expected: ["rouge", "bille", "possible"],
    comparator: "contains_keyword",
    hint: "Regarde s’il y a au moins une bille rouge.",
    explanation: exp(
      "Un événement possible peut arriver.",
      "On regarde si l’objet demandé existe.",
      "Le sac contient des billes rouges.",
      "Tirer une bille rouge est donc possible."
    ),
    tags: ["cm1", "probabilite", "defi", "open", "billes", "canvas"],
    canvas: billesCanvas(),
  },

  // ============================================================
  // TOP-UP — PROBABILITE_VOCABULAIRE
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_probabilite_vocabulaire_fixed_8_roue_rouge",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Avec cette roue, tomber sur rouge est...",
    format: "qcm",
    choices: ["possible", "impossible", "certain"],
    expected: ["possible"],
    comparator: "mcq_exact",
    hint: "Cherche s’il y a une partie rouge sur la roue.",
    explanation: exp(
      "Une couleur est possible si elle apparaît sur la roue.",
      "On observe les couleurs de la roue.",
      "Il y a une partie rouge, mais aussi d’autres couleurs.",
      "Tomber sur rouge est possible."
    ),
    tags: ["cm1", "probabilite", "vocabulaire", "roue", "qcm", "canvas"],
    canvas: roueSimpleCanvas(),
  },

  // ============================================================
  // TOP-UP — PROBABILITE_HASARD
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_probabilite_hasard_fixed_6_piece",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_hasard",
    difficulty: 1,
    theme: "neutral",
    text: "Lancer une pièce (pile ou face) est-il une situation de hasard ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Avant le lancer, on ne sait pas si ce sera pile ou face.",
    explanation: exp(
      "Une situation de hasard a un résultat inconnu à l’avance.",
      "On regarde s’il y a plusieurs résultats possibles.",
      "La pièce peut tomber sur pile ou sur face.",
      "Lancer une pièce est une situation de hasard."
    ),
    tags: ["cm1", "probabilite", "hasard", "piece", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_hasard_fixed_7_carte",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_hasard",
    difficulty: 1,
    theme: "neutral",
    text: "Tirer une carte d’un paquet mélangé, sans regarder, est-il une situation de hasard ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "On ne sait pas quelle carte va sortir.",
    explanation: exp(
      "Une situation de hasard a un résultat inconnu à l’avance.",
      "On regarde si plusieurs cartes peuvent sortir.",
      "Le paquet est mélangé, n’importe quelle carte peut sortir.",
      "Tirer une carte au hasard est une situation de hasard."
    ),
    tags: ["cm1", "probabilite", "hasard", "carte", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_hasard_fixed_8_choix_nombre",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_hasard",
    difficulty: 2,
    theme: "neutral",
    text: "Choisir le plus grand de deux nombres écrits au tableau est-il une situation de hasard ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le résultat est déjà connu en regardant les nombres.",
    explanation: exp(
      "Une situation de hasard a un résultat inconnu à l’avance.",
      "On regarde si le résultat dépend du hasard.",
      "Le plus grand de deux nombres est toujours le même, on peut le voir.",
      "Ce n’est pas une situation de hasard."
    ),
    tags: ["cm1", "probabilite", "hasard", "non_hasard", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_hasard_fixed_9_billes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_hasard",
    difficulty: 2,
    theme: "neutral",
    text: "Tirer une bille de ce sac sans regarder est une situation de hasard parce que...",
    format: "qcm",
    choices: [
      "on ne sait pas à l’avance quelle bille sera tirée",
      "on tire toujours une bille rouge",
      "il n’y a aucune bille",
      "on choisit la couleur après avoir regardé",
    ],
    expected: ["on ne sait pas à l’avance quelle bille sera tirée"],
    comparator: "mcq_exact",
    hint: "Plusieurs couleurs peuvent sortir.",
    explanation: exp(
      "Une situation de hasard a un résultat inconnu à l’avance.",
      "On observe les billes du sac.",
      "Plusieurs couleurs sont présentes, on ne sait pas laquelle on tirera.",
      "C’est une situation de hasard."
    ),
    tags: ["cm1", "probabilite", "hasard", "billes", "qcm", "canvas"],
    canvas: billesCanvas(),
  },

  // ============================================================
  // TOP-UP — PROBABILITE_COMPARER
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_probabilite_comparer_fixed_4_moins_probable",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Dans ce sac, quelle couleur a le moins de chances d’être tirée ?",
    format: "qcm",
    choices: ["vert", "rouge", "bleu", "elles ont toutes autant de chances"],
    expected: ["vert"],
    comparator: "mcq_exact",
    hint: "Cherche la couleur la moins présente.",
    explanation: exp(
      "Moins il y a d’objets d’une couleur, moins elle a de chances d’être tirée.",
      "On compte les billes de chaque couleur.",
      "Il y a 3 rouges, 2 bleues et 1 verte.",
      "La couleur verte a le moins de chances."
    ),
    tags: ["cm1", "probabilite", "comparer", "billes", "qcm", "canvas"],
    canvas: billesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_comparer_fixed_5_rouge_vs_vert",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Dans ce sac, rouge a-t-il plus de chances d’être tiré que vert ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Compare le nombre de rouges et de verts.",
    explanation: exp(
      "La couleur la plus présente a le plus de chances.",
      "On compte les billes rouges et vertes.",
      "Il y a 3 rouges et 1 verte.",
      "Oui, rouge a plus de chances que vert."
    ),
    tags: ["cm1", "probabilite", "comparer", "billes", "qcm", "canvas"],
    canvas: billesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_comparer_fixed_6_roue_egalite",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Sur cette roue, les quatre couleurs ont-elles autant de chances de sortir ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Compare la taille des quatre parties.",
    explanation: exp(
      "Deux couleurs ont autant de chances si elles occupent la même place.",
      "On compare les parts de la roue.",
      "Les quatre parties (rouge, bleu, vert, jaune) ont la même taille.",
      "Oui, elles ont toutes autant de chances."
    ),
    tags: ["cm1", "probabilite", "comparer", "roue", "egalite", "qcm", "canvas"],
    canvas: roueSimpleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_comparer_fixed_7_de_pair_impair",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Avec ce dé, a-t-on autant de chances d’obtenir un nombre pair qu’un nombre impair ?",
    format: "qcm",
    choices: [
      "oui, autant de chances",
      "non, plus de chances d’avoir un pair",
      "non, plus de chances d’avoir un impair",
      "c’est impossible",
    ],
    expected: ["oui, autant de chances"],
    comparator: "mcq_exact",
    hint: "Compte les faces paires et les faces impaires.",
    explanation: exp(
      "On a autant de chances si le nombre de cas favorables est le même.",
      "On compte les faces paires et impaires.",
      "Pairs : 2, 4, 6 (3 faces). Impairs : 1, 3, 5 (3 faces).",
      "Oui, on a autant de chances d’obtenir un pair qu’un impair."
    ),
    tags: ["cm1", "probabilite", "comparer", "de", "egalite", "qcm", "canvas"],
    canvas: deCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_comparer_fixed_8_billes_equilibrees",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Dans ce sac, rouge a-t-il plus de chances d’être tiré que bleu ?",
    format: "qcm",
    choices: ["non, ils ont autant de chances", "oui", "bleu est impossible", "rouge est certain"],
    expected: ["non, ils ont autant de chances"],
    comparator: "mcq_exact",
    hint: "Compte les rouges et les bleues.",
    explanation: exp(
      "Deux couleurs ont autant de chances si elles sont en même nombre.",
      "On compte les billes rouges et bleues.",
      "Il y a 2 rouges et 2 bleues.",
      "Non, rouge et bleu ont autant de chances."
    ),
    tags: ["cm1", "probabilite", "comparer", "billes", "egalite", "qcm", "canvas"],
    canvas: billesEquilibreesCanvas(),
  },

  // ============================================================
  // TOP-UP — PROBABILITE_ROUE_DE_SAC
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_probabilite_roue_de_sac_fixed_4_de_sup4",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 2,
    theme: "neutral",
    text: "Avec ce dé, quelles faces permettent d’obtenir un nombre supérieur à 4 ?",
    format: "qcm",
    choices: ["5 et 6", "4 et 5", "1 et 2", "2, 4 et 6"],
    expected: ["5 et 6"],
    comparator: "mcq_exact",
    hint: "Supérieur à 4 veut dire strictement plus grand que 4.",
    explanation: exp(
      "On cherche les faces qui respectent la condition.",
      "On regarde les faces strictement supérieures à 4.",
      "Les faces 5 et 6 sont supérieures à 4.",
      "Les faces favorables sont 5 et 6."
    ),
    tags: ["cm1", "probabilite", "de", "qcm", "canvas"],
    canvas: deCanvas([5, 6]),
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_roue_de_sac_fixed_5_total_billes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 2,
    theme: "neutral",
    text: "Combien y a-t-il de billes en tout dans ce sac ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Compte toutes les billes, toutes couleurs confondues.",
    explanation: exp(
      "Pour raisonner avec un sac, on compte tous les objets.",
      "On compte toutes les billes.",
      "3 rouges + 2 bleues + 1 verte = 6.",
      "Il y a 6 billes en tout."
    ),
    tags: ["cm1", "probabilite", "sac", "billes", "short", "canvas"],
    canvas: billesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_roue_de_sac_fixed_6_couleurs_roue",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 2,
    theme: "neutral",
    text: "Combien y a-t-il de couleurs différentes sur cette roue ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Compte les couleurs des parties.",
    explanation: exp(
      "On observe la roue pour compter les couleurs.",
      "On repère chaque couleur différente.",
      "Il y a rouge, bleu, vert et jaune.",
      "Il y a 4 couleurs différentes."
    ),
    tags: ["cm1", "probabilite", "roue", "short", "canvas"],
    canvas: roueSimpleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_roue_de_sac_fixed_7_faces_de",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 1,
    theme: "neutral",
    text: "Combien de faces a un dé classique ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Compte les faces : 1, 2, 3…",
    explanation: exp(
      "Un dé classique a des faces numérotées.",
      "On compte les faces du dé.",
      "Les faces sont 1, 2, 3, 4, 5 et 6.",
      "Un dé classique a 6 faces."
    ),
    tags: ["cm1", "probabilite", "de", "short", "canvas"],
    canvas: deCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_roue_de_sac_fixed_8_vertes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 2,
    theme: "neutral",
    text: "Dans ce sac, combien y a-t-il de billes vertes ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Compte les billes avec la lettre V.",
    explanation: exp(
      "Pour raisonner avec un sac, on compte les objets demandés.",
      "On repère les billes vertes.",
      "Il y a 2 billes vertes.",
      "La réponse est 2."
    ),
    tags: ["cm1", "probabilite", "sac", "billes", "short", "canvas"],
    canvas: billesEquilibreesCanvas(),
  },

  // ============================================================
  // TOP-UP — PROBABILITE_DEFI
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_probabilite_defi_fixed_4_de_certain",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Avec un dé classique, quel événement est certain ?",
    format: "qcm",
    choices: [
      "obtenir un nombre entre 1 et 6",
      "obtenir 6",
      "obtenir un nombre pair",
      "obtenir 7",
    ],
    expected: ["obtenir un nombre entre 1 et 6"],
    comparator: "mcq_exact",
    hint: "Cherche l’événement qui arrive à chaque lancer.",
    explanation: exp(
      "Un événement certain se produit toujours.",
      "On regarde toutes les faces du dé.",
      "Toutes les faces sont entre 1 et 6.",
      "Obtenir un nombre entre 1 et 6 est certain."
    ),
    tags: ["cm1", "probabilite", "defi", "de", "qcm", "canvas"],
    canvas: deCanvas([1, 2, 3, 4, 5, 6]),
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_defi_fixed_5_billes_moins_probable",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Dans ce sac, quelle couleur est la moins probable ?",
    format: "qcm",
    choices: ["vert", "rouge", "bleu", "jaune"],
    expected: ["vert"],
    comparator: "mcq_exact",
    hint: "Cherche la couleur la moins présente.",
    explanation: exp(
      "La couleur la moins probable est celle qui apparaît le moins.",
      "On compte chaque couleur.",
      "Il y a 3 rouges, 2 bleues et 1 verte.",
      "Vert est la couleur la moins probable."
    ),
    tags: ["cm1", "probabilite", "defi", "sac", "qcm", "canvas"],
    canvas: billesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_defi_fixed_6_roue_comparaison",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Sur cette roue, tomber sur rouge est-il plus probable que tomber sur bleu ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Compare la taille de la partie rouge et de la partie bleue.",
    explanation: exp(
      "Une couleur est plus probable si elle occupe une plus grande partie de la roue.",
      "On compare la part rouge et la part bleue.",
      "Le rouge occupe 3 parts, le bleu 1 part.",
      "Oui, le rouge est plus probable que le bleu."
    ),
    tags: ["cm1", "probabilite", "defi", "roue", "qcm", "canvas"],
    canvas: roueRougeFavoriCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_defi_fixed_7_reunion_letchis",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 3,
    theme: "reunion",
    text: "Un sac contient 4 billes rouges et 1 bille verte. Quelle couleur a le plus de chances d’être tirée ?",
    format: "qcm",
    choices: ["rouge", "vert", "elles ont autant de chances", "noir"],
    expected: ["rouge"],
    comparator: "mcq_exact",
    hint: "Compare le nombre de billes de chaque couleur.",
    explanation: exp(
      "La couleur la plus présente a le plus de chances.",
      "On compte les billes de chaque couleur.",
      "Il y a 4 rouges et 1 verte.",
      "Rouge a le plus de chances d’être tirée."
    ),
    tags: ["cm1", "probabilite", "defi", "reunion", "billes", "qcm", "canvas"],
    canvas: billesVariablesCanvas({ rouges: 4, bleues: 0, vertes: 1 }),
  },
];