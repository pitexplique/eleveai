// lib/tutor-v4/question-banks/maths/cm2/probabilites.bank.ts

import type {
  TutorBankItemV4,
  CanvasProbabilitesData,
} from "@/lib/tutor-v4/types";

function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: readonly T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  // Jamais deux fois la même ligne. Un gabarit dont le piège coïncide avec la
  // bonne réponse (les coordonnées inversées quand x = y, un arrondi égal à la
  // valeur de départ…) affichait la même proposition deux fois, et l'élève
  // voyait deux réponses justes. Dédupliquer AVANT de couper à quatre laisse
  // aussi une chance aux distracteurs surnuméraires de prendre la place.
  return shuffle(Array.from(new Set([correct, ...wrongs]))).slice(0, 4);
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

function tableauIssuesDeCanvas(): CanvasProbabilitesData {
  return probabilitesCanvas({
    variant: "tableau",
    tableau: {
      entetes: ["Événement", "Type"],
      lignes: [
        ["Obtenir 7 avec un dé", "impossible"],
        ["Obtenir un nombre de 1 à 6", "certain"],
        ["Obtenir un nombre pair", "possible"],
      ],
      casesSurlignees: [[1, 1]],
    },
  });
}

// ============================================================
// BANK
// ============================================================

export const probabilitesBank: TutorBankItemV4[] = [
  // ============================================================
  // PROBABILITE_VOCABULAIRE
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_probabilite_vocabulaire_fixed_1_definition",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "En probabilité, un événement “certain” est un événement qui...",
    format: "qcm",
    choices: [
      "se produit toujours",
      "ne se produit jamais",
      "peut se produire mais pas toujours",
      "est choisi au hasard",
    ],
    expected: ["se produit toujours"],
    comparator: "mcq_exact",
    hint: "Certain veut dire que cela arrive à chaque fois.",
    explanation:
      "Un événement certain se produit toujours. Par exemple, avec un dé classique, obtenir un nombre entre 1 et 6 est certain.",
    tags: ["cm2", "probabilite", "vocabulaire", "certain", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_vocabulaire_fixed_2_impossible",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "En probabilité, un événement “impossible” est un événement qui...",
    format: "qcm",
    choices: [
      "ne peut jamais se produire",
      "se produit toujours",
      "se produit une fois sur deux",
      "est plus fréquent que les autres",
    ],
    expected: ["ne peut jamais se produire"],
    comparator: "mcq_exact",
    hint: "Impossible veut dire que cela ne peut pas arriver.",
    explanation:
      "Un événement impossible ne peut jamais se produire. Par exemple, obtenir 7 avec un dé classique est impossible.",
    tags: ["cm2", "probabilite", "vocabulaire", "impossible", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_vocabulaire_fixed_3_possible",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Un événement “possible” est un événement qui...",
    format: "qcm",
    choices: [
      "peut se produire",
      "ne peut jamais se produire",
      "se produit obligatoirement",
      "est toujours le plus probable",
    ],
    expected: ["peut se produire"],
    comparator: "mcq_exact",
    hint: "Possible veut dire que cela peut arriver.",
    explanation:
      "Un événement possible peut se produire, mais il n’est pas forcément certain.",
    tags: ["cm2", "probabilite", "vocabulaire", "possible", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_vocabulaire_fixed_4_de_obtenir_7",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Avec un dé classique, obtenir 7 est...",
    format: "qcm",
    choices: ["impossible", "certain", "possible", "obligatoire"],
    expected: ["impossible"],
    comparator: "mcq_exact",
    hint: "Un dé classique a les faces 1, 2, 3, 4, 5 et 6.",
    explanation:
      "Un dé classique n’a pas de face 7. Obtenir 7 est donc impossible.",
    tags: ["cm2", "probabilite", "vocabulaire", "de", "impossible", "qcm", "canvas"],
    canvas: deCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_vocabulaire_fixed_5_de_1_a_6",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Avec un dé classique, obtenir un nombre entre 1 et 6 est...",
    format: "qcm",
    choices: ["certain", "impossible", "rare", "faux"],
    expected: ["certain"],
    comparator: "mcq_exact",
    hint: "Toutes les faces du dé sont entre 1 et 6.",
    explanation:
      "Toutes les faces d’un dé classique sont 1, 2, 3, 4, 5 ou 6. Obtenir un nombre entre 1 et 6 est donc certain.",
    tags: ["cm2", "probabilite", "vocabulaire", "de", "certain", "qcm", "canvas"],
    canvas: deCanvas([1, 2, 3, 4, 5, 6]),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_vocabulaire_fixed_6_de_pair",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Avec un dé classique, obtenir un nombre pair est...",
    format: "qcm",
    choices: ["possible", "impossible", "certain", "obligatoire"],
    expected: ["possible"],
    comparator: "mcq_exact",
    hint: "Les nombres pairs du dé sont 2, 4 et 6.",
    explanation:
      "Obtenir un nombre pair est possible car les faces 2, 4 et 6 existent. Mais ce n’est pas certain, car on peut aussi obtenir 1, 3 ou 5.",
    tags: ["cm2", "probabilite", "vocabulaire", "de", "pair", "qcm", "canvas"],
    canvas: deCanvas([2, 4, 6]),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_vocabulaire_fixed_7_de_impair",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Avec un dé classique, obtenir un nombre impair est...",
    format: "qcm",
    choices: ["possible", "certain", "impossible", "sans hasard"],
    expected: ["possible"],
    comparator: "mcq_exact",
    hint: "Les nombres impairs du dé sont 1, 3 et 5.",
    explanation:
      "Obtenir un nombre impair est possible car les faces 1, 3 et 5 existent. Ce n’est pas certain, car il existe aussi des faces paires.",
    tags: ["cm2", "probabilite", "vocabulaire", "de", "impair", "qcm", "canvas"],
    canvas: deCanvas([1, 3, 5]),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_vocabulaire_fixed_8_roue_couleur",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Avec cette roue, tomber sur rouge est...",
    format: "qcm",
    choices: ["possible", "impossible", "certain", "toujours sûr"],
    expected: ["possible"],
    comparator: "mcq_exact",
    hint: "La roue contient une partie rouge, mais aussi d’autres couleurs.",
    explanation:
      "Tomber sur rouge est possible car la roue contient une partie rouge. Mais ce n’est pas certain car il existe aussi d’autres couleurs.",
    tags: ["cm2", "probabilite", "vocabulaire", "roue", "possible", "qcm", "canvas"],
    canvas: roueSimpleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_vocabulaire_fixed_9_roue_noir",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Avec cette roue, tomber sur noir est...",
    format: "qcm",
    choices: ["impossible", "possible", "certain", "plus probable"],
    expected: ["impossible"],
    comparator: "mcq_exact",
    hint: "Regarde les couleurs présentes sur la roue.",
    explanation:
      "La roue ne contient aucune partie noire. Tomber sur noir est donc impossible.",
    tags: ["cm2", "probabilite", "vocabulaire", "roue", "impossible", "qcm", "canvas"],
    canvas: roueSimpleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_vocabulaire_fixed_10_billes_rouge",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Dans ce sac, tirer une bille rouge est...",
    format: "qcm",
    choices: ["possible", "impossible", "certain", "sans hasard"],
    expected: ["possible"],
    comparator: "mcq_exact",
    hint: "Observe les billes rouges dans le sac.",
    explanation:
      "Il y a des billes rouges dans le sac. Tirer une bille rouge est donc possible.",
    tags: ["cm2", "probabilite", "vocabulaire", "billes", "possible", "qcm", "canvas"],
    canvas: billesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_vocabulaire_fixed_11_billes_jaune",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Dans ce sac, tirer une bille jaune est...",
    format: "qcm",
    choices: ["impossible", "possible", "certain", "plus probable que rouge"],
    expected: ["impossible"],
    comparator: "mcq_exact",
    hint: "Cherche s’il y a une bille jaune.",
    explanation:
      "Le sac contient des billes rouges, bleues et vertes, mais pas de bille jaune. Tirer une bille jaune est impossible.",
    tags: ["cm2", "probabilite", "vocabulaire", "billes", "impossible", "qcm", "canvas"],
    canvas: billesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_vocabulaire_fixed_12_tableau_vocabulaire",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_vocabulaire",
    difficulty: 3,
    theme: "neutral",
    text: "Dans le tableau, quel mot correspond à “Obtenir un nombre de 1 à 6” avec un dé ?",
    format: "qcm",
    choices: ["certain", "impossible", "possible", "rare"],
    expected: ["certain"],
    comparator: "mcq_exact",
    hint: "Toutes les faces du dé sont de 1 à 6.",
    explanation:
      "Avec un dé classique, obtenir un nombre de 1 à 6 est certain, car toutes les faces sont dans cet intervalle.",
    tags: ["cm2", "probabilite", "vocabulaire", "tableau", "certain", "qcm", "canvas"],
    canvas: tableauIssuesDeCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_vocabulaire_fixed_13_open_certain",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_vocabulaire",
    difficulty: 4,
    theme: "neutral",
    text: "Explique avec tes mots ce qu’est un événement certain.",
    format: "open",
    expected: ["toujours", "arrive", "se produit", "sûr"],
    comparator: "contains_keyword",
    hint: "Certain veut dire que cela arrive à chaque fois.",
    explanation:
      "Un événement certain est un événement qui se produit toujours. On est sûr qu’il va arriver.",
    tags: ["cm2", "probabilite", "vocabulaire", "certain", "open"],
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_vocabulaire_fixed_14_open_impossible",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_vocabulaire",
    difficulty: 4,
    theme: "neutral",
    text: "Explique avec tes mots ce qu’est un événement impossible.",
    format: "open",
    expected: ["jamais", "ne peut pas", "impossible", "arriver"],
    comparator: "contains_keyword",
    hint: "Impossible veut dire que cela ne peut pas arriver.",
    explanation:
      "Un événement impossible est un événement qui ne peut jamais se produire.",
    tags: ["cm2", "probabilite", "vocabulaire", "impossible", "open"],
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_vocabulaire_fixed_15_open_possible",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_vocabulaire",
    difficulty: 4,
    theme: "neutral",
    text: "Explique la différence entre possible et certain.",
    format: "open",
    expected: ["possible", "peut", "certain", "toujours"],
    comparator: "contains_keyword",
    hint: "Possible peut arriver ; certain arrive toujours.",
    explanation:
      "Un événement possible peut arriver, mais il n’arrive pas forcément à chaque fois. Un événement certain se produit toujours.",
    tags: ["cm2", "probabilite", "vocabulaire", "possible", "certain", "open"],
  },

  {
    kind: "template",
    id: "cm2_probabilite_vocabulaire_tpl_1_de",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde les faces possibles du dé.",
    tags: ["cm2", "probabilite", "vocabulaire", "de", "template", "qcm", "canvas"],
    generate: () => {
      const situations: Array<{
        text: string;
        expected: "possible" | "impossible" | "certain";
        explanation: string;
        surligne: DeFace[];
      }> = [
        {
          text: "Avec un dé classique, obtenir 4 est...",
          expected: "possible",
          explanation:
            "La face 4 existe sur un dé classique. Obtenir 4 est donc possible.",
          surligne: [4],
        },
        {
          text: "Avec un dé classique, obtenir 9 est...",
          expected: "impossible",
          explanation:
            "Un dé classique n’a pas de face 9. Obtenir 9 est impossible.",
          surligne: [],
        },
        {
          text: "Avec un dé classique, obtenir un nombre de 1 à 6 est...",
          expected: "certain",
          explanation:
            "Toutes les faces du dé sont entre 1 et 6. Cet événement est certain.",
          surligne: [1, 2, 3, 4, 5, 6],
        },
        {
          text: "Avec un dé classique, obtenir un nombre pair est...",
          expected: "possible",
          explanation:
            "Les faces 2, 4 et 6 sont paires. C’est possible, mais pas certain.",
          surligne: [2, 4, 6],
        },
      ];

      const item = randomChoice(situations);

      return {
        text: item.text,
        format: "qcm",
        choices: ["certain", "impossible", "possible"],
        expected: [item.expected],
        comparator: "mcq_exact",
        explanation: item.explanation,
        canvas: deCanvas(item.surligne),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_probabilite_vocabulaire_tpl_2_billes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde si la couleur existe dans le sac.",
    tags: ["cm2", "probabilite", "vocabulaire", "billes", "template", "qcm", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          couleur: "rouge",
          expected: "possible",
          explanation:
            "Il y a des billes rouges dans le sac. Tirer une bille rouge est possible.",
        },
        {
          couleur: "bleue",
          expected: "possible",
          explanation:
            "Il y a des billes bleues dans le sac. Tirer une bille bleue est possible.",
        },
        {
          couleur: "jaune",
          expected: "impossible",
          explanation:
            "Il n’y a pas de bille jaune dans le sac. Tirer une bille jaune est impossible.",
        },
      ]);

      return {
        text: `Dans ce sac, tirer une bille ${item.couleur} est...`,
        format: "qcm",
        choices: ["possible", "impossible", "certain"],
        expected: [item.expected],
        comparator: "mcq_exact",
        explanation: item.explanation,
        canvas: billesCanvas(),
      };
    },
  },

    // ============================================================
  // PROBABILITE_HASARD
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_probabilite_hasard_fixed_1_definition",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_hasard",
    difficulty: 1,
    theme: "neutral",
    text: "Une situation de hasard est une situation où...",
    format: "qcm",
    choices: [
      "on ne peut pas prévoir avec certitude le résultat",
      "on connaît toujours le résultat à l’avance",
      "il n’y a jamais de résultat possible",
      "il n’y a pas besoin d’observer",
    ],
    expected: ["on ne peut pas prévoir avec certitude le résultat"],
    comparator: "mcq_exact",
    hint: "Avec le hasard, on ne sait pas exactement ce qui va arriver.",
    explanation:
      "Une situation de hasard est une situation dont on ne connaît pas le résultat à l’avance. On peut seulement dire ce qui est possible, impossible ou certain.",
    tags: ["cm2", "probabilite", "hasard", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_hasard_fixed_2_lancer_de",
    niveau: "cm2",
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
      "il n’y a aucune face possible",
      "le résultat est choisi par l’élève après le lancer",
    ],
    expected: ["on ne sait pas à l’avance quelle face va sortir"],
    comparator: "mcq_exact",
    hint: "Avant le lancer, plusieurs faces peuvent sortir.",
    explanation:
      "Quand on lance un dé, plusieurs résultats sont possibles. On ne sait pas à l’avance quelle face va sortir : c’est une situation de hasard.",
    tags: ["cm2", "probabilite", "hasard", "de", "qcm", "canvas"],
    canvas: deCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_hasard_fixed_3_roue",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_hasard",
    difficulty: 1,
    theme: "neutral",
    text: "Faire tourner cette roue est une situation de hasard parce que...",
    format: "qcm",
    choices: [
      "on ne sait pas à l’avance sur quelle couleur la roue va s’arrêter",
      "la roue s’arrête toujours sur rouge",
      "la roue n’a aucune couleur",
      "on peut choisir la couleur après avoir tourné",
    ],
    expected: ["on ne sait pas à l’avance sur quelle couleur la roue va s’arrêter"],
    comparator: "mcq_exact",
    hint: "La roue peut s’arrêter sur plusieurs couleurs.",
    explanation:
      "La roue contient plusieurs couleurs. Avant de la faire tourner, on ne sait pas exactement sur quelle couleur elle va s’arrêter.",
    tags: ["cm2", "probabilite", "hasard", "roue", "qcm", "canvas"],
    canvas: roueSimpleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_hasard_fixed_4_tirer_bille",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_hasard",
    difficulty: 1,
    theme: "neutral",
    text: "Tirer une bille au hasard dans un sac sans regarder est...",
    format: "qcm",
    choices: [
      "une situation de hasard",
      "une situation certaine",
      "un calcul posé",
      "une construction géométrique",
    ],
    expected: ["une situation de hasard"],
    comparator: "mcq_exact",
    hint: "On ne voit pas la bille avant de la tirer.",
    explanation:
      "Quand on tire une bille sans regarder, on ne connaît pas la couleur à l’avance. C’est donc une situation de hasard.",
    tags: ["cm2", "probabilite", "hasard", "billes", "qcm", "canvas"],
    canvas: billesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_hasard_fixed_5_pas_hasard_2plus3",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_hasard",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer 2 + 3 est-il une situation de hasard ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le résultat de 2 + 3 est toujours le même.",
    explanation:
      "Non. Calculer 2 + 3 n’est pas une situation de hasard, car le résultat est toujours 5.",
    tags: ["cm2", "probabilite", "hasard", "non_hasard", "calcul", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_hasard_fixed_6_pas_hasard_date",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_hasard",
    difficulty: 2,
    theme: "neutral",
    text: "Lire la date du jour au tableau est-il une situation de hasard ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "La date est déjà connue.",
    explanation:
      "Non. Lire la date du jour n’est pas une situation de hasard, car l’information est déjà connue.",
    tags: ["cm2", "probabilite", "hasard", "non_hasard", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_hasard_fixed_7_hasard_piece",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_hasard",
    difficulty: 2,
    theme: "neutral",
    text: "Lancer une pièce de monnaie est une situation de hasard parce que...",
    format: "qcm",
    choices: [
      "on peut obtenir pile ou face",
      "on obtient toujours pile",
      "il n’y a aucun résultat possible",
      "le résultat est connu avant de lancer",
    ],
    expected: ["on peut obtenir pile ou face"],
    comparator: "mcq_exact",
    hint: "Avant le lancer, deux résultats sont possibles.",
    explanation:
      "Quand on lance une pièce, on peut obtenir pile ou face. On ne connaît pas le résultat avant le lancer.",
    tags: ["cm2", "probabilite", "hasard", "piece", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_hasard_fixed_8_reunion_tombola",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_hasard",
    difficulty: 2,
    theme: "reunion",
    text: "À une tombola d’école à La Réunion, on tire un ticket au hasard. Pourquoi est-ce une situation de hasard ?",
    format: "qcm",
    choices: [
      "on ne sait pas à l’avance quel ticket sera tiré",
      "le même ticket gagne toujours",
      "il n’y a aucun ticket",
      "on choisit le gagnant après avoir vu le ticket",
    ],
    expected: ["on ne sait pas à l’avance quel ticket sera tiré"],
    comparator: "mcq_exact",
    hint: "Avant le tirage, plusieurs tickets peuvent sortir.",
    explanation:
      "Dans une tombola, plusieurs tickets peuvent être tirés. On ne sait pas à l’avance lequel sortira : c’est une situation de hasard.",
    tags: ["cm2", "probabilite", "hasard", "reunion", "tombola", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_hasard_fixed_9_reunion_meteo",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_hasard",
    difficulty: 3,
    theme: "reunion",
    text: "Dire “il pleuvra sûrement demain” est-il une certitude mathématique ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "La météo peut être prévue, mais pas avec certitude absolue.",
    explanation:
      "Non. La météo donne une prévision, mais on ne connaît pas toujours le résultat avec certitude. Il y a une part d’incertitude.",
    tags: ["cm2", "probabilite", "hasard", "reunion", "meteo", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_hasard_fixed_10_experience_aleatoire",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_hasard",
    difficulty: 3,
    theme: "neutral",
    text: "Une expérience aléatoire est une expérience dont...",
    format: "qcm",
    choices: [
      "le résultat n’est pas connu avec certitude avant de la réaliser",
      "le résultat est toujours impossible",
      "le résultat est toujours choisi par le professeur",
      "le résultat ne peut jamais changer",
    ],
    expected: ["le résultat n’est pas connu avec certitude avant de la réaliser"],
    comparator: "mcq_exact",
    hint: "Aléatoire veut dire lié au hasard.",
    explanation:
      "Une expérience aléatoire est une expérience liée au hasard. On connaît les résultats possibles, mais pas forcément celui qui va se produire.",
    tags: ["cm2", "probabilite", "hasard", "experience_aleatoire", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_hasard_fixed_11_resultats_possibles",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_hasard",
    difficulty: 3,
    theme: "neutral",
    text: "Quand on lance un dé classique, les résultats possibles sont...",
    format: "qcm",
    choices: [
      "1, 2, 3, 4, 5 et 6",
      "seulement 1",
      "7, 8 et 9",
      "aucun résultat",
    ],
    expected: ["1, 2, 3, 4, 5 et 6"],
    comparator: "mcq_exact",
    hint: "Regarde les faces du dé.",
    explanation:
      "Un dé classique possède les faces 1, 2, 3, 4, 5 et 6. Ce sont les résultats possibles.",
    tags: ["cm2", "probabilite", "hasard", "de", "issues", "qcm", "canvas"],
    canvas: deCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_hasard_fixed_12_resultats_roue",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_hasard",
    difficulty: 3,
    theme: "neutral",
    text: "Avec cette roue, quels résultats sont possibles ?",
    format: "qcm",
    choices: [
      "Rouge, Bleu, Vert ou Jaune",
      "Seulement Rouge",
      "Noir ou Blanc",
      "Aucun résultat",
    ],
    expected: ["Rouge, Bleu, Vert ou Jaune"],
    comparator: "mcq_exact",
    hint: "Lis les couleurs présentes sur la roue.",
    explanation:
      "La roue contient les couleurs Rouge, Bleu, Vert et Jaune. Ce sont les résultats possibles.",
    tags: ["cm2", "probabilite", "hasard", "roue", "issues", "qcm", "canvas"],
    canvas: roueSimpleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_hasard_fixed_13_erreur_toujours_rouge",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_hasard",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : “Comme il y a du rouge sur la roue, on tombera forcément sur rouge.” A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "La roue contient aussi d’autres couleurs.",
    explanation:
      "Non. Rouge est possible, mais pas certain, car la roue contient aussi Bleu, Vert et Jaune.",
    tags: ["cm2", "probabilite", "hasard", "erreur", "roue", "qcm", "canvas"],
    canvas: roueSimpleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_hasard_fixed_14_erreur_de_choisir",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_hasard",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève lance un dé puis choisit lui-même le résultat. Est-ce encore une vraie situation de hasard ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Dans le hasard, on ne choisit pas le résultat après coup.",
    explanation:
      "Non. Si l’élève choisit le résultat, ce n’est plus une vraie situation de hasard. Dans une situation de hasard, le résultat n’est pas décidé après coup.",
    tags: ["cm2", "probabilite", "hasard", "erreur", "de", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_hasard_fixed_15_open_definir_hasard",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_hasard",
    difficulty: 4,
    theme: "neutral",
    text: "Explique avec tes mots ce qu’est une situation de hasard.",
    format: "open",
    expected: ["on ne sait pas", "avance", "résultat", "possible", "hasard"],
    comparator: "contains_keyword",
    hint: "Dis qu’on ne connaît pas le résultat à l’avance.",
    explanation:
      "Une situation de hasard est une situation où l’on ne connaît pas le résultat à l’avance, même si on connaît les résultats possibles.",
    tags: ["cm2", "probabilite", "hasard", "open", "definition"],
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_hasard_fixed_16_open_exemple",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_hasard",
    difficulty: 4,
    theme: "neutral",
    text: "Donne un exemple de situation de hasard et explique pourquoi.",
    format: "open",
    expected: ["dé", "roue", "bille", "pièce", "résultat", "avance"],
    comparator: "contains_keyword",
    hint: "Tu peux utiliser un dé, une roue, une pièce ou un sac de billes.",
    explanation:
      "Exemple : lancer un dé est une situation de hasard, car on ne sait pas à l’avance quelle face va sortir.",
    tags: ["cm2", "probabilite", "hasard", "open", "exemple"],
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_hasard_fixed_17_open_non_hasard",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_hasard",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi calculer 10 + 5 n’est pas une situation de hasard.",
    format: "open",
    expected: ["résultat", "toujours", "15", "pas hasard", "certain"],
    comparator: "contains_keyword",
    hint: "Le résultat du calcul ne change pas.",
    explanation:
      "Calculer 10 + 5 n’est pas une situation de hasard, car le résultat est toujours 15. On peut le connaître avec certitude.",
    tags: ["cm2", "probabilite", "hasard", "open", "non_hasard", "calcul"],
  },

  {
    kind: "template",
    id: "cm2_probabilite_hasard_tpl_1_reconnaitre",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_hasard",
    difficulty: 2,
    theme: "neutral",
    hint: "Demande-toi si le résultat est connu à l’avance.",
    tags: ["cm2", "probabilite", "hasard", "reconnaitre", "template", "qcm"],
    generate: () => {
      const item = randomChoice([
        {
          situation: "lancer un dé",
          expected: "oui",
          explanation:
            "Oui. Quand on lance un dé, on ne sait pas à l’avance quelle face va sortir.",
        },
        {
          situation: "tirer une bille sans regarder",
          expected: "oui",
          explanation:
            "Oui. Sans regarder, on ne sait pas à l’avance quelle bille sera tirée.",
        },
        {
          situation: "calculer 4 + 6",
          expected: "non",
          explanation:
            "Non. Le résultat de 4 + 6 est toujours 10.",
        },
        {
          situation: "lire le nombre écrit sur une étiquette déjà visible",
          expected: "non",
          explanation:
            "Non. Si l’étiquette est visible, l’information est déjà connue.",
        },
        {
          situation: "faire tourner une roue colorée",
          expected: "oui",
          explanation:
            "Oui. On ne sait pas à l’avance sur quelle couleur la roue va s’arrêter.",
        },
      ]);

      return {
        text: `Est-ce une situation de hasard : ${item.situation} ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [item.expected],
        comparator: "mcq_exact",
        explanation: item.explanation,
      };
    },
  },

  {
    kind: "template",
    id: "cm2_probabilite_hasard_tpl_2_resultats_possibles",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_hasard",
    difficulty: 3,
    theme: "neutral",
    hint: "Liste seulement les résultats qui peuvent vraiment arriver.",
    tags: ["cm2", "probabilite", "hasard", "issues", "template", "qcm", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          text: "Quand on lance un dé classique, quels résultats sont possibles ?",
          expected: "1, 2, 3, 4, 5 et 6",
          wrongs: [
            "seulement 6",
            "7, 8 et 9",
            "aucun résultat",
          ],
          explanation:
            "Les faces possibles d’un dé classique sont 1, 2, 3, 4, 5 et 6.",
          canvas: deCanvas(),
        },
        {
          text: "Avec cette roue, quels résultats sont possibles ?",
          expected: "Rouge, Bleu, Vert ou Jaune",
          wrongs: [
            "seulement Rouge",
            "Noir ou Blanc",
            "aucun résultat",
          ],
          explanation:
            "La roue contient Rouge, Bleu, Vert et Jaune. Ce sont les résultats possibles.",
          canvas: roueSimpleCanvas(),
        },
        {
          text: "Dans ce sac, quelles couleurs peuvent être tirées ?",
          expected: "rouge, bleu ou vert",
          wrongs: [
            "jaune seulement",
            "rouge seulement",
            "noir ou blanc",
          ],
          explanation:
            "Le sac contient des billes rouges, bleues et vertes. Ce sont les couleurs possibles.",
          canvas: billesCanvas(),
        },
      ]);

      return {
        text: item.text,
        format: "qcm",
        choices: makeChoices(item.expected, item.wrongs),
        expected: [item.expected],
        comparator: "mcq_exact",
        explanation: item.explanation,
        canvas: item.canvas,
      };
    },
  },
    // ============================================================
  // PROBABILITE_ROUE_DE_SAC
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_probabilite_roue_sac_fixed_1_de_faces",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 1,
    theme: "neutral",
    text: "Avec un dé classique, combien y a-t-il de faces possibles ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Compte les faces du dé : 1, 2, 3, 4, 5 et 6.",
    explanation:
      "Un dé classique possède 6 faces. Les résultats possibles sont 1, 2, 3, 4, 5 et 6.",
    tags: ["cm2", "probabilite", "de", "issues", "short", "canvas"],
    canvas: deCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_roue_sac_fixed_2_de_pair",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 2,
    theme: "neutral",
    text: "Avec un dé classique, combien de faces permettent d’obtenir un nombre pair ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Les nombres pairs du dé sont 2, 4 et 6.",
    explanation:
      "Les faces favorables sont 2, 4 et 6. Il y a donc 3 faces qui permettent d’obtenir un nombre pair.",
    tags: ["cm2", "probabilite", "de", "pair", "short", "canvas"],
    canvas: deCanvas([2, 4, 6]),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_roue_sac_fixed_3_de_superieur_4",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 2,
    theme: "neutral",
    text: "Avec un dé classique, combien de faces permettent d’obtenir un nombre supérieur à 4 ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Les nombres supérieurs à 4 sont 5 et 6.",
    explanation:
      "Les faces favorables sont 5 et 6. Il y a donc 2 faces qui permettent d’obtenir un nombre supérieur à 4.",
    tags: ["cm2", "probabilite", "de", "superieur", "short", "canvas"],
    canvas: deCanvas([5, 6]),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_roue_sac_fixed_4_de_obtenir_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 2,
    theme: "neutral",
    text: "Avec un dé classique, combien de faces permettent d’obtenir exactement 1 ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Une seule face porte le nombre 1.",
    explanation:
      "Une seule face du dé porte le nombre 1. Il y a donc 1 face favorable.",
    tags: ["cm2", "probabilite", "de", "face", "short", "canvas"],
    canvas: deCanvas([1]),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_roue_sac_fixed_5_roue_nombre_segments",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 2,
    theme: "neutral",
    text: "Sur cette roue simple, combien de couleurs différentes peut-on obtenir ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Compte les couleurs indiquées sur la roue.",
    explanation:
      "La roue contient Rouge, Bleu, Vert et Jaune. Il y a donc 4 couleurs possibles.",
    tags: ["cm2", "probabilite", "roue", "issues", "short", "canvas"],
    canvas: roueSimpleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_roue_sac_fixed_6_roue_rouge_parts",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 2,
    theme: "neutral",
    text: "Sur cette roue, quelle couleur occupe le plus de place ?",
    format: "qcm",
    choices: ["Rouge", "Bleu", "Vert", "Jaune"],
    expected: ["Rouge"],
    comparator: "mcq_exact",
    hint: "Regarde la couleur qui a la plus grande part.",
    explanation:
      "Rouge occupe plus de place que les autres couleurs. C’est donc la couleur qui a le plus de chances de sortir.",
    tags: ["cm2", "probabilite", "roue", "comparer", "qcm", "canvas"],
    canvas: roueRougeFavoriCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_roue_sac_fixed_7_roue_bleu_possible",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 2,
    theme: "neutral",
    text: "Sur cette roue, tomber sur Bleu est-il possible ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Cherche s’il y a une partie bleue.",
    explanation:
      "Oui. La roue contient une partie bleue. Tomber sur Bleu est donc possible.",
    tags: ["cm2", "probabilite", "roue", "possible", "qcm", "canvas"],
    canvas: roueRougeFavoriCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_roue_sac_fixed_8_roue_noir_impossible",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 2,
    theme: "neutral",
    text: "Sur cette roue, tomber sur Noir est-il possible ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Regarde si la couleur noire apparaît sur la roue.",
    explanation:
      "Non. La roue ne contient aucune partie noire. Tomber sur Noir est impossible.",
    tags: ["cm2", "probabilite", "roue", "impossible", "qcm", "canvas"],
    canvas: roueSimpleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_roue_sac_fixed_9_billes_nombre_total",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de billes y a-t-il dans ce sac ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Compte toutes les billes représentées.",
    explanation:
      "On compte toutes les billes du sac : 3 rouges, 2 bleues et 1 verte. Il y a donc 6 billes.",
    tags: ["cm2", "probabilite", "billes", "total", "short", "canvas"],
    canvas: billesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_roue_sac_fixed_10_billes_rouges",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de billes rouges y a-t-il dans ce sac ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Compte les billes marquées R.",
    explanation:
      "Il y a 3 billes rouges dans le sac.",
    tags: ["cm2", "probabilite", "billes", "rouge", "short", "canvas"],
    canvas: billesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_roue_sac_fixed_11_billes_bleues",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de billes bleues y a-t-il dans ce sac ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Compte les billes marquées B.",
    explanation:
      "Il y a 2 billes bleues dans le sac.",
    tags: ["cm2", "probabilite", "billes", "bleu", "short", "canvas"],
    canvas: billesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_roue_sac_fixed_12_billes_vertes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de billes vertes y a-t-il dans ce sac ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Compte les billes marquées V.",
    explanation:
      "Il y a 1 bille verte dans le sac.",
    tags: ["cm2", "probabilite", "billes", "vert", "short", "canvas"],
    canvas: billesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_roue_sac_fixed_13_billes_jaunes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de billes jaunes y a-t-il dans ce sac ?",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "Cherche les billes jaunes.",
    explanation:
      "Il n’y a aucune bille jaune dans ce sac. Il y a donc 0 bille jaune.",
    tags: ["cm2", "probabilite", "billes", "jaune", "impossible", "short", "canvas"],
    canvas: billesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_roue_sac_fixed_14_billes_evenement_rouge",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 3,
    theme: "neutral",
    text: "Dans ce sac, tirer une bille rouge correspond à combien de billes favorables ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Les billes favorables sont les billes rouges.",
    explanation:
      "Les billes favorables sont les billes rouges. Il y en a 3.",
    tags: ["cm2", "probabilite", "billes", "favorable", "rouge", "short", "canvas"],
    canvas: billesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_roue_sac_fixed_15_billes_evenement_non_verte",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 4,
    theme: "neutral",
    text: "Dans ce sac, tirer une bille qui n’est pas verte correspond à combien de billes favorables ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Compte les billes rouges et bleues.",
    explanation:
      "Les billes qui ne sont pas vertes sont les rouges et les bleues. Il y en a 3 + 2 = 5.",
    tags: ["cm2", "probabilite", "billes", "non_verte", "short", "canvas"],
    canvas: billesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_roue_sac_fixed_16_erreur_billes_total",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit qu’il y a 5 billes dans le sac. A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Compte toutes les billes.",
    explanation:
      "Non. Il y a 3 billes rouges, 2 bleues et 1 verte, donc 6 billes au total.",
    tags: ["cm2", "probabilite", "billes", "erreur", "total", "qcm", "canvas"],
    canvas: billesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_roue_sac_fixed_17_erreur_roue_part",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : “Sur cette roue, toutes les couleurs ont autant de chances.” A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Regarde la place occupée par Rouge.",
    explanation:
      "Non. Rouge occupe plus de place que les autres couleurs. Toutes les couleurs n’ont donc pas autant de chances.",
    tags: ["cm2", "probabilite", "roue", "erreur", "qcm", "canvas"],
    canvas: roueRougeFavoriCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_roue_sac_fixed_18_open_de",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi obtenir un nombre pair avec un dé classique correspond à 3 faces favorables.",
    format: "open",
    expected: ["pair", "2", "4", "6", "3", "faces"],
    comparator: "contains_keyword",
    hint: "Liste les faces paires.",
    explanation:
      "Les nombres pairs sur un dé classique sont 2, 4 et 6. Il y a donc 3 faces favorables.",
    tags: ["cm2", "probabilite", "de", "open", "pair", "justifier", "canvas"],
    canvas: deCanvas([2, 4, 6]),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_roue_sac_fixed_19_open_sac",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi tirer une bille jaune est impossible dans ce sac.",
    format: "open",
    expected: ["jaune", "aucune", "0", "bille", "impossible"],
    comparator: "contains_keyword",
    hint: "Cherche si une bille jaune est présente.",
    explanation:
      "Dans ce sac, il n’y a aucune bille jaune. Tirer une bille jaune est donc impossible.",
    tags: ["cm2", "probabilite", "billes", "open", "impossible", "canvas"],
    canvas: billesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_roue_sac_fixed_20_open_roue",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi Rouge est plus probable que Bleu sur cette roue.",
    format: "open",
    expected: ["rouge", "plus", "place", "part", "bleu", "probable"],
    comparator: "contains_keyword",
    hint: "Compare la taille des parties Rouge et Bleu.",
    explanation:
      "Rouge occupe plus de place que Bleu sur la roue. Rouge a donc plus de chances de sortir.",
    tags: ["cm2", "probabilite", "roue", "open", "justifier", "canvas"],
    canvas: roueRougeFavoriCanvas(),
  },

  {
    kind: "template",
    id: "cm2_probabilite_roue_sac_tpl_1_de_faces_favorables",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les faces qui vérifient la condition.",
    tags: ["cm2", "probabilite", "de", "faces_favorables", "template", "short", "canvas"],
    generate: () => {
      const situations: Array<{
        text: string;
        expected: string;
        explanation: string;
        surligne: DeFace[];
      }> = [
        {
          text: "Avec un dé classique, combien de faces permettent d’obtenir un nombre pair ?",
          expected: "3",
          explanation:
            "Les faces favorables sont 2, 4 et 6. Il y en a 3.",
          surligne: [2, 4, 6],
        },
        {
          text: "Avec un dé classique, combien de faces permettent d’obtenir un nombre impair ?",
          expected: "3",
          explanation:
            "Les faces favorables sont 1, 3 et 5. Il y en a 3.",
          surligne: [1, 3, 5],
        },
        {
          text: "Avec un dé classique, combien de faces permettent d’obtenir un nombre supérieur à 4 ?",
          expected: "2",
          explanation:
            "Les faces favorables sont 5 et 6. Il y en a 2.",
          surligne: [5, 6],
        },
        {
          text: "Avec un dé classique, combien de faces permettent d’obtenir exactement 6 ?",
          expected: "1",
          explanation:
            "Une seule face porte le nombre 6. Il y a donc 1 face favorable.",
          surligne: [6],
        },
      ];

      const item = randomChoice(situations);

      return {
        text: item.text,
        format: "short",
        expected: [item.expected],
        comparator: "number_equal",
        explanation: item.explanation,
        canvas: deCanvas(item.surligne),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_probabilite_roue_sac_tpl_2_sac_billes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les billes concernées.",
    tags: ["cm2", "probabilite", "billes", "template", "short", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          text: "Combien de billes rouges y a-t-il dans ce sac ?",
          expected: "3",
          explanation:
            "On compte 3 billes rouges.",
        },
        {
          text: "Combien de billes bleues y a-t-il dans ce sac ?",
          expected: "2",
          explanation:
            "On compte 2 billes bleues.",
        },
        {
          text: "Combien de billes vertes y a-t-il dans ce sac ?",
          expected: "1",
          explanation:
            "On compte 1 bille verte.",
        },
        {
          text: "Combien de billes jaunes y a-t-il dans ce sac ?",
          expected: "0",
          explanation:
            "Il n’y a aucune bille jaune dans ce sac.",
        },
      ]);

      return {
        text: item.text,
        format: "short",
        expected: [item.expected],
        comparator: "number_equal",
        explanation: item.explanation,
        canvas: billesCanvas(),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_probabilite_roue_sac_tpl_3_roue",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 3,
    theme: "neutral",
    hint: "Observe la taille des parts.",
    tags: ["cm2", "probabilite", "roue", "template", "qcm", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          text: "Sur cette roue, quelle couleur a le plus de chances de sortir ?",
          expected: "Rouge",
          choices: ["Rouge", "Bleu", "Vert", "Jaune"],
          explanation:
            "Rouge occupe le plus de place sur la roue.",
          canvas: roueRougeFavoriCanvas(),
        },
        {
          text: "Sur cette roue simple, Rouge et Bleu ont-ils autant de chances ?",
          expected: "oui",
          choices: ["oui", "non"],
          explanation:
            "Les parts de la roue simple sont de même taille.",
          canvas: roueSimpleCanvas(),
        },
        {
          text: "Sur cette roue, tomber sur Noir est-il possible ?",
          expected: "non",
          choices: ["oui", "non"],
          explanation:
            "La roue ne contient pas de partie noire.",
          canvas: roueSimpleCanvas(),
        },
      ]);

      return {
        text: item.text,
        format: "qcm",
        choices: shuffle(item.choices),
        expected: [item.expected],
        comparator: "mcq_exact",
        explanation: item.explanation,
        canvas: item.canvas,
      };
    },
  },
    // ============================================================
  // PROBABILITE_DEFI
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_probabilite_defi_fixed_1_sac_plus_probable",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Dans ce sac, quelle couleur a le plus de chances d’être tirée ?",
    format: "qcm",
    choices: ["rouge", "bleue", "verte", "jaune"],
    expected: ["rouge"],
    comparator: "mcq_exact",
    hint: "Compte les billes de chaque couleur.",
    explanation:
      "Il y a 3 billes rouges, 2 billes bleues et 1 bille verte. La couleur rouge est donc la plus probable.",
    tags: ["cm2", "probabilite", "defi", "billes", "plus_probable", "qcm", "canvas"],
    canvas: billesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_defi_fixed_2_sac_moins_probable",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Dans ce sac, quelle couleur a le moins de chances d’être tirée ?",
    format: "qcm",
    choices: ["verte", "rouge", "bleue", "autant"],
    expected: ["verte"],
    comparator: "mcq_exact",
    hint: "Cherche la couleur la moins représentée.",
    explanation:
      "Il y a 1 bille verte, contre 2 bleues et 3 rouges. La bille verte est donc la moins probable.",
    tags: ["cm2", "probabilite", "defi", "billes", "moins_probable", "qcm", "canvas"],
    canvas: billesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_defi_fixed_3_sac_non_verte",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Dans ce sac, combien de billes permettent de tirer une bille qui n’est pas verte ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Compte les billes rouges et bleues.",
    explanation:
      "Les billes qui ne sont pas vertes sont les rouges et les bleues. Il y en a 3 + 2 = 5.",
    tags: ["cm2", "probabilite", "defi", "billes", "non_verte", "short", "canvas"],
    canvas: billesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_defi_fixed_4_de_plus_probable",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Avec un dé classique, lequel est le plus probable ?",
    format: "qcm",
    choices: [
      "obtenir un nombre pair",
      "obtenir 6",
      "obtenir 7",
      "obtenir 1",
    ],
    expected: ["obtenir un nombre pair"],
    comparator: "mcq_exact",
    hint: "Compte les faces favorables.",
    explanation:
      "Obtenir un nombre pair correspond à 3 faces : 2, 4 et 6. Obtenir 6 ou 1 correspond à une seule face, et obtenir 7 est impossible.",
    tags: ["cm2", "probabilite", "defi", "de", "comparer", "qcm", "canvas"],
    canvas: deCanvas([2, 4, 6]),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_defi_fixed_5_de_impossible",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Avec un dé classique, lequel est impossible ?",
    format: "qcm",
    choices: [
      "obtenir 8",
      "obtenir 2",
      "obtenir un nombre pair",
      "obtenir un nombre inférieur à 6",
    ],
    expected: ["obtenir 8"],
    comparator: "mcq_exact",
    hint: "Regarde les faces du dé.",
    explanation:
      "Un dé classique possède les faces 1, 2, 3, 4, 5 et 6. Obtenir 8 est donc impossible.",
    tags: ["cm2", "probabilite", "defi", "de", "impossible", "qcm", "canvas"],
    canvas: deCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_defi_fixed_6_de_autant",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Avec un dé classique, obtenir un nombre pair et obtenir un nombre impair ont-ils autant de chances ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Compte les faces paires et les faces impaires.",
    explanation:
      "Il y a 3 faces paires : 2, 4 et 6. Il y a aussi 3 faces impaires : 1, 3 et 5. Les chances sont donc les mêmes.",
    tags: ["cm2", "probabilite", "defi", "de", "autant", "qcm", "canvas"],
    canvas: deCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_defi_fixed_7_roue_plus_probable",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Sur cette roue, quelle couleur est la plus probable ?",
    format: "qcm",
    choices: ["Rouge", "Bleu", "Vert", "Jaune"],
    expected: ["Rouge"],
    comparator: "mcq_exact",
    hint: "Regarde quelle couleur occupe le plus de place.",
    explanation:
      "Rouge occupe plus de place que les autres couleurs sur la roue. Rouge est donc la couleur la plus probable.",
    tags: ["cm2", "probabilite", "defi", "roue", "plus_probable", "qcm", "canvas"],
    canvas: roueRougeFavoriCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_defi_fixed_8_roue_erreur_autant",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : “Sur cette roue, toutes les couleurs ont autant de chances.” A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Observe la taille de la partie rouge.",
    explanation:
      "Non. La partie rouge est plus grande que les autres. Rouge a donc plus de chances de sortir.",
    tags: ["cm2", "probabilite", "defi", "roue", "erreur", "qcm", "canvas"],
    canvas: roueRougeFavoriCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_defi_fixed_9_roue_simple_autant",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Sur cette roue simple, Rouge et Bleu ont-ils autant de chances de sortir ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Compare la taille des deux parts.",
    explanation:
      "Oui. Sur cette roue, les parts Rouge et Bleu ont la même taille. Les deux couleurs ont autant de chances.",
    tags: ["cm2", "probabilite", "defi", "roue", "autant", "qcm", "canvas"],
    canvas: roueSimpleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_defi_fixed_10_reunion_tombola",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 4,
    theme: "reunion",
    text: "À une tombola d’école à La Réunion, il y a 100 tickets dont 5 gagnants. Est-il certain de gagner avec un ticket ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Il y a aussi beaucoup de tickets non gagnants.",
    explanation:
      "Non. Il y a 5 tickets gagnants sur 100, mais aussi 95 tickets non gagnants. Gagner est possible, mais ce n’est pas certain.",
    tags: ["cm2", "probabilite", "defi", "reunion", "tombola", "certain", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_defi_fixed_11_reunion_sac_bonbons",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Dans un sachet de bonbons, il y a 6 bonbons coco et 2 bonbons mangue. Quel goût a le plus de chances d’être tiré ?",
    format: "qcm",
    choices: ["coco", "mangue", "autant", "impossible"],
    expected: ["coco"],
    comparator: "mcq_exact",
    hint: "Compare 6 et 2.",
    explanation:
      "Il y a 6 bonbons coco et 2 bonbons mangue. Coco est donc le goût le plus probable.",
    tags: ["cm2", "probabilite", "defi", "reunion", "bonbons", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_defi_fixed_12_reunion_roue_kermesse",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 4,
    theme: "reunion",
    text: "À une kermesse, une roue contient une grande partie Rouge et de petites parties Bleu, Vert et Jaune. Quelle couleur a le plus de chances de sortir ?",
    format: "qcm",
    choices: ["Rouge", "Bleu", "Vert", "Jaune"],
    expected: ["Rouge"],
    comparator: "mcq_exact",
    hint: "La plus grande partie donne le plus de chances.",
    explanation:
      "La partie Rouge est la plus grande. Rouge a donc plus de chances de sortir.",
    tags: ["cm2", "probabilite", "defi", "reunion", "roue", "qcm", "canvas"],
    canvas: roueRougeFavoriCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_defi_fixed_13_erreur_preference",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : “Je préfère le vert, donc le vert a plus de chances de sortir.” A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Les chances ne dépendent pas de ce qu’on préfère.",
    explanation:
      "Non. Les chances dépendent des données : nombre de billes, faces du dé ou taille des parts. Elles ne dépendent pas de la préférence de l’élève.",
    tags: ["cm2", "probabilite", "defi", "erreur", "preference", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_defi_fixed_14_erreur_possible_certain",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : “Comme tirer rouge est possible, c’est certain.” A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Possible ne veut pas dire certain.",
    explanation:
      "Non. Possible signifie que cela peut arriver. Certain signifie que cela arrive toujours. Ce n’est pas la même chose.",
    tags: ["cm2", "probabilite", "defi", "erreur", "possible", "certain", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_defi_fixed_15_open_sac_rouge",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi la bille rouge est la plus probable dans ce sac.",
    format: "open",
    expected: ["3", "rouges", "2", "bleues", "1", "verte", "plus"],
    comparator: "contains_keyword",
    hint: "Compte les billes de chaque couleur.",
    explanation:
      "Il y a 3 billes rouges, 2 billes bleues et 1 bille verte. Comme les billes rouges sont les plus nombreuses, rouge est la couleur la plus probable.",
    tags: ["cm2", "probabilite", "defi", "billes", "open", "justifier", "canvas"],
    canvas: billesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_defi_fixed_16_open_de_pair",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi obtenir un nombre pair est plus probable qu’obtenir 6 avec un dé classique.",
    format: "open",
    expected: ["pair", "2", "4", "6", "3", "faces", "une"],
    comparator: "contains_keyword",
    hint: "Compare le nombre de faces favorables.",
    explanation:
      "Obtenir un nombre pair correspond à trois faces : 2, 4 et 6. Obtenir 6 correspond à une seule face. Il est donc plus probable d’obtenir un nombre pair.",
    tags: ["cm2", "probabilite", "defi", "de", "open", "justifier", "canvas"],
    canvas: deCanvas([2, 4, 6]),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_defi_fixed_17_open_roue_rouge",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi Rouge est plus probable que Bleu sur cette roue.",
    format: "open",
    expected: ["rouge", "plus", "place", "bleu", "chances", "roue"],
    comparator: "contains_keyword",
    hint: "Compare la place occupée par chaque couleur.",
    explanation:
      "Rouge occupe plus de place que Bleu sur la roue. Rouge a donc plus de chances de sortir.",
    tags: ["cm2", "probabilite", "defi", "roue", "open", "justifier", "canvas"],
    canvas: roueRougeFavoriCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_defi_fixed_18_open_possible_certain",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique la différence entre “possible” et “certain” avec l’exemple du dé.",
    format: "open",
    expected: ["possible", "peut", "certain", "toujours", "dé"],
    comparator: "contains_keyword",
    hint: "Exemple : obtenir 6 est possible ; obtenir un nombre de 1 à 6 est certain.",
    explanation:
      "Avec un dé classique, obtenir 6 est possible car la face 6 existe, mais ce n’est pas certain. Obtenir un nombre de 1 à 6 est certain car toutes les faces du dé sont entre 1 et 6.",
    tags: ["cm2", "probabilite", "defi", "open", "possible", "certain", "de"],
  },

  {
    kind: "template",
    id: "cm2_probabilite_defi_tpl_1_sac",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Compte les billes favorables.",
    tags: ["cm2", "probabilite", "defi", "billes", "template", "qcm", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          text: "Dans ce sac, quelle couleur est la plus probable ?",
          expected: "rouge",
          choices: ["rouge", "bleue", "verte", "jaune"],
          explanation:
            "Rouge est la couleur la plus représentée : il y a 3 billes rouges.",
        },
        {
          text: "Dans ce sac, quelle couleur est la moins probable ?",
          expected: "verte",
          choices: ["rouge", "bleue", "verte", "jaune"],
          explanation:
            "Verte est la couleur la moins représentée : il y a 1 bille verte.",
        },
        {
          text: "Dans ce sac, tirer une bille jaune est...",
          expected: "impossible",
          choices: ["impossible", "certain", "le plus probable", "aussi probable que rouge"],
          explanation:
            "Il n’y a aucune bille jaune dans ce sac. Tirer jaune est donc impossible.",
        },
      ]);

      return {
        text: item.text,
        format: "qcm",
        choices: shuffle(item.choices),
        expected: [item.expected],
        comparator: "mcq_exact",
        explanation: item.explanation,
        canvas: billesCanvas(),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_probabilite_defi_tpl_2_de",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Compte les faces favorables.",
    tags: ["cm2", "probabilite", "defi", "de", "template", "qcm", "canvas"],
    generate: () => {
      const situations: Array<{
        text: string;
        expected: string;
        choices: string[];
        explanation: string;
        surligne: DeFace[];
      }> = [
        {
          text: "Avec un dé classique, lequel a le plus de chances ?",
          expected: "obtenir un nombre pair",
          choices: ["obtenir un nombre pair", "obtenir 6", "obtenir 7", "obtenir 1"],
          explanation:
            "Obtenir un nombre pair correspond à 3 faces : 2, 4 et 6.",
          surligne: [2, 4, 6],
        },
        {
          text: "Avec un dé classique, lequel est certain ?",
          expected: "obtenir un nombre de 1 à 6",
          choices: ["obtenir un nombre de 1 à 6", "obtenir 6", "obtenir 7", "obtenir un nombre pair"],
          explanation:
            "Toutes les faces d’un dé classique sont entre 1 et 6.",
          surligne: [1, 2, 3, 4, 5, 6],
        },
        {
          text: "Avec un dé classique, lequel est impossible ?",
          expected: "obtenir 9",
          choices: ["obtenir 9", "obtenir 1", "obtenir 6", "obtenir un nombre impair"],
          explanation:
            "Un dé classique n’a pas de face 9.",
          surligne: [],
        },
      ];

      const item = randomChoice(situations);

      return {
        text: item.text,
        format: "qcm",
        choices: shuffle(item.choices),
        expected: [item.expected],
        comparator: "mcq_exact",
        explanation: item.explanation,
        canvas: deCanvas(item.surligne),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_probabilite_defi_tpl_3_roue",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Compare les parts de la roue.",
    tags: ["cm2", "probabilite", "defi", "roue", "template", "qcm", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          text: "Sur cette roue, quelle couleur est la plus probable ?",
          expected: "Rouge",
          choices: ["Rouge", "Bleu", "Vert", "Jaune"],
          explanation:
            "Rouge occupe plus de place que les autres couleurs.",
          canvas: roueRougeFavoriCanvas(),
        },
        {
          text: "Sur cette roue simple, toutes les couleurs ont-elles autant de chances ?",
          expected: "oui",
          choices: ["oui", "non"],
          explanation:
            "Les parts ont la même taille, donc les couleurs ont autant de chances.",
          canvas: roueSimpleCanvas(),
        },
        {
          text: "Sur cette roue, tomber sur Noir est...",
          expected: "impossible",
          choices: ["impossible", "certain", "le plus probable", "possible"],
          explanation:
            "La roue ne contient aucune partie noire.",
          canvas: roueSimpleCanvas(),
        },
      ]);

      return {
        text: item.text,
        format: "qcm",
        choices: shuffle(item.choices),
        expected: [item.expected],
        comparator: "mcq_exact",
        explanation: item.explanation,
        canvas: item.canvas,
      };
    },
  },

  {
    kind: "template",
    id: "cm2_probabilite_defi_tpl_4_reunion",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "Compare les quantités données.",
    tags: ["cm2", "probabilite", "defi", "reunion", "template", "qcm"],
    generate: () => {
      const item = randomChoice([
        {
          text: "Dans un sachet, il y a 6 bonbons coco et 2 bonbons mangue. Quel goût est le plus probable ?",
          expected: "coco",
          choices: ["coco", "mangue", "autant", "impossible"],
          explanation:
            "Il y a plus de bonbons coco que de bonbons mangue : coco est donc plus probable.",
        },
        {
          text: "À une tombola, il y a 100 tickets dont 5 gagnants. Gagner avec un ticket est...",
          expected: "possible mais pas certain",
          choices: ["possible mais pas certain", "certain", "impossible", "sans hasard"],
          explanation:
            "Il existe des tickets gagnants, donc gagner est possible. Mais il existe aussi beaucoup de tickets perdants, donc ce n’est pas certain.",
        },
        {
          text: "Dans un sac, il y a 4 jetons “volcan” et 4 jetons “lagon”. A-t-on autant de chances de tirer volcan que lagon ?",
          expected: "oui",
          choices: ["oui", "non"],
          explanation:
            "Il y a 4 jetons de chaque type. Les chances sont donc les mêmes.",
        },
      ]);

      return {
        text: item.text,
        format: "qcm",
        choices: shuffle(item.choices),
        expected: [item.expected],
        comparator: "mcq_exact",
        explanation: item.explanation,
      };
    },
  },
];
