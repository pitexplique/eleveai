// lib/tutor-v4/question-banks/maths/cm1/longueur.bank.ts

import type {
  TutorBankItemV4,
  DroiteGradueeCanvasData,
} from "@/lib/tutor-v4/types";

function randomChoice<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: string[]) {
  return shuffle([correct, ...wrongs]).slice(0, 4);
}

function exp(
  definition: string,
  methode: string,
  calcul: string,
  conclusion: string
) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;
}

function droiteGradueeCanvas(
  data: Omit<DroiteGradueeCanvasData, "kind">
): DroiteGradueeCanvasData {
  return {
    kind: "number_line",
    ...data,
  };
}

export const longueurBank: TutorBankItemV4[] = [
  // ============================================================
  // LONGUEUR_COMPARER
  // Comparer des longueurs
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_longueur_comparer_fixed_001_unites_identiques",
    niveau: "cm1",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_comparer",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle longueur est la plus grande : 45 cm ou 32 cm ?",
    format: "qcm",
    choices: ["45 cm", "32 cm"],
    expected: ["45 cm"],
    comparator: "mcq_exact",
    hint: "Les deux longueurs sont en centimètres : compare les nombres.",
    explanation: exp(
      "Comparer des longueurs, c’est déterminer laquelle est la plus grande, la plus petite ou si elles sont égales.",
      "Quand les unités sont les mêmes, on compare directement les nombres.",
      "45 est plus grand que 32.",
      "La longueur la plus grande est 45 cm."
    ),
    tags: [
      "cm1",
      "longueur",
      "comparer",
      "unites_identiques",
      "qcm",
      "fixed",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_longueur_comparer_fixed_002_cm_m",
    niveau: "cm1",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle longueur est la plus grande : 1 m ou 80 cm ?",
    format: "qcm",
    choices: ["1 m", "80 cm"],
    expected: ["1 m"],
    comparator: "mcq_exact",
    hint: "Convertis 1 m en centimètres.",
    explanation: exp(
      "Pour comparer deux longueurs avec des unités différentes, il faut les mettre dans la même unité.",
      "On convertit 1 m en centimètres.",
      "1 m = 100 cm, et 100 cm est plus grand que 80 cm.",
      "La longueur la plus grande est 1 m."
    ),
    tags: [
      "cm1",
      "longueur",
      "comparer",
      "conversion",
      "qcm",
      "fixed",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_longueur_comparer_open_001_expliquer",
    niveau: "cm1",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment comparer 2 m et 150 cm.",
    format: "open",
    expected: ["2", "200", "150", "cm", "plus grand"],
    comparator: "contains_keyword",
    hint: "Convertis 2 m en centimètres.",
    explanation: exp(
      "Comparer des longueurs avec des unités différentes demande une conversion.",
      "On choisit une même unité, ici le centimètre.",
      "2 m = 200 cm, et 200 cm est plus grand que 150 cm.",
      "Donc 2 m est plus grand que 150 cm."
    ),
    tags: [
      "cm1",
      "longueur",
      "comparer",
      "open",
      "expliquer",
      "conversion",
      "fixed",
    ],
  },

  {
    kind: "template",
    id: "cm1_longueur_comparer_tpl_001_cm_cm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_comparer",
    difficulty: 1,
    theme: "neutral",
    hint: "Les deux longueurs sont dans la même unité.",
    tags: [
      "cm1",
      "longueur",
      "comparer",
      "cm",
      "qcm",
      "template",
    ],
    generate: () => {
      const a = randomInt(20, 95);
      const b = randomInt(20, 95);
      const first = a === b ? a + 7 : a;
      const correct = first > b ? `${first} cm` : `${b} cm`;

      return {
        text: `Quelle longueur est la plus grande : ${first} cm ou ${b} cm ?`,
        format: "qcm",
        choices: [`${first} cm`, `${b} cm`],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Quand deux longueurs ont la même unité, on compare les nombres.",
          "Ici, les deux longueurs sont en centimètres.",
          `${Math.max(first, b)} est plus grand que ${Math.min(first, b)}.`,
          `La longueur la plus grande est ${correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_longueur_comparer_tpl_002_m_cm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Convertis les mètres en centimètres.",
    tags: [
      "cm1",
      "longueur",
      "comparer",
      "m_cm",
      "qcm",
      "template",
    ],
    generate: () => {
      const meters = randomChoice([1, 2, 3, 4]);
      const cm = randomChoice([80, 120, 180, 250, 350, 450]);
      const metersCm = meters * 100;
      const correct = metersCm > cm ? `${meters} m` : `${cm} cm`;

      return {
        text: `Quelle longueur est la plus grande : ${meters} m ou ${cm} cm ?`,
        format: "qcm",
        choices: [`${meters} m`, `${cm} cm`],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour comparer des mètres et des centimètres, on convertit dans la même unité.",
          "On convertit les mètres en centimètres.",
          `${meters} m = ${metersCm} cm. On compare donc ${metersCm} cm et ${cm} cm.`,
          `La longueur la plus grande est ${correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_longueur_comparer_tpl_003_km_m",
    niveau: "cm1",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "1 km = 1 000 m.",
    tags: [
      "cm1",
      "longueur",
      "comparer",
      "km_m",
      "qcm",
      "template",
    ],
    generate: () => {
      const km = randomChoice([1, 2, 3, 4]);
      const meters = randomChoice([800, 1500, 2500, 3500, 4500]);
      const kmMeters = km * 1000;
      const correct = kmMeters > meters ? `${km} km` : `${meters} m`;

      return {
        text: `Quelle longueur est la plus grande : ${km} km ou ${meters} m ?`,
        format: "qcm",
        choices: [`${km} km`, `${meters} m`],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour comparer des kilomètres et des mètres, on convertit dans la même unité.",
          "On utilise 1 km = 1 000 m.",
          `${km} km = ${kmMeters} m. On compare ${kmMeters} m et ${meters} m.`,
          `La longueur la plus grande est ${correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_longueur_comparer_tpl_004_qcm_egalite",
    niveau: "cm1",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Convertis pour voir si les deux longueurs sont égales.",
    tags: [
      "cm1",
      "longueur",
      "comparer",
      "egalite",
      "qcm",
      "template",
    ],
    generate: () => {
      const meters = randomChoice([1, 2, 3, 4, 5]);
      const cm = meters * 100;
      const correct = "elles sont égales";

      return {
        text: `Compare ${meters} m et ${cm} cm.`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${meters} m est plus grand`,
          `${cm} cm est plus grand`,
          "on ne peut pas comparer",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Deux longueurs peuvent être égales même si elles sont écrites avec des unités différentes.",
          "On convertit les mètres en centimètres.",
          `${meters} m = ${cm} cm.`,
          "Les deux longueurs sont égales."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_longueur_comparer_tpl_005_reunion_distance",
    niveau: "cm1",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_comparer",
    difficulty: 3,
    theme: "reunion",
    hint: "Convertis les kilomètres en mètres.",
    tags: [
      "cm1",
      "longueur",
      "comparer",
      "reunion",
      "distance",
      "qcm",
      "template",
    ],
    generate: () => {
      const km = randomChoice([1, 2, 3]);
      const m = randomChoice([900, 1500, 2200, 3200]);
      const kmM = km * 1000;
      const correct = kmM > m ? `${km} km` : `${m} m`;

      return {
        text: `Pour une sortie à La Réunion, quel trajet est le plus long : ${km} km ou ${m} m ?`,
        format: "qcm",
        choices: [`${km} km`, `${m} m`],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour comparer deux trajets, on les écrit dans la même unité.",
          "On convertit les kilomètres en mètres.",
          `${km} km = ${kmM} m. On compare ${kmM} m et ${m} m.`,
          `Le trajet le plus long est ${correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_longueur_comparer_tpl_006_open_expliquer",
    niveau: "cm1",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_comparer",
    difficulty: 4,
    theme: "neutral",
    hint: "Explique la conversion avant de comparer.",
    tags: [
      "cm1",
      "longueur",
      "comparer",
      "open",
      "expliquer",
      "template",
    ],
    generate: () => {
      const meters = randomChoice([1, 2, 3, 4]);
      const cm = randomChoice([80, 150, 250, 350, 450]);
      const metersCm = meters * 100;
      const bigger = metersCm > cm ? `${meters} m` : `${cm} cm`;

      return {
        text: `Explique comment comparer ${meters} m et ${cm} cm.`,
        format: "open",
        expected: [
          String(meters),
          String(metersCm),
          String(cm),
          bigger.includes("m") ? "m" : "cm",
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "Pour comparer deux longueurs avec des unités différentes, il faut les convertir.",
          "On choisit une même unité, par exemple le centimètre.",
          `${meters} m = ${metersCm} cm. On compare ${metersCm} cm et ${cm} cm.`,
          `La longueur la plus grande est ${bigger}.`
        ),
      };
    },
  },

  // ============================================================
  // LONGUEUR_CONVERTIR
  // Convertir des longueurs simples
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_longueur_convertir_fixed_001_m_cm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "Convertis 3 m en centimètres.",
    format: "short",
    expected: ["300"],
    comparator: "number_equal",
    hint: "1 m = 100 cm.",
    explanation: exp(
      "Convertir une longueur, c’est l’écrire dans une autre unité.",
      "Pour passer des mètres aux centimètres, on multiplie par 100.",
      "3 m = 3 × 100 cm = 300 cm.",
      "3 m = 300 cm."
    ),
    tags: [
      "cm1",
      "longueur",
      "convertir",
      "m_cm",
      "short",
      "fixed",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_longueur_convertir_fixed_002_km_m",
    niveau: "cm1",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "Convertis 4 km en mètres.",
    format: "short",
    expected: ["4000", "4 000"],
    comparator: "number_equal",
    hint: "1 km = 1 000 m.",
    explanation: exp(
      "Convertir une longueur permet de changer d’unité sans changer la distance réelle.",
      "Pour passer des kilomètres aux mètres, on multiplie par 1 000.",
      "4 km = 4 × 1 000 m = 4 000 m.",
      "4 km = 4 000 m."
    ),
    tags: [
      "cm1",
      "longueur",
      "convertir",
      "km_m",
      "short",
      "fixed",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_longueur_convertir_open_001_expliquer",
    niveau: "cm1",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_convertir",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment convertir 250 cm en mètres.",
    format: "open",
    expected: ["250", "100", "2,5", "m"],
    comparator: "contains_keyword",
    hint: "100 cm = 1 m.",
    explanation: exp(
      "Pour convertir des centimètres en mètres, on regroupe les centimètres par paquets de 100.",
      "On utilise 100 cm = 1 m.",
      "250 ÷ 100 = 2,5.",
      "250 cm = 2,5 m."
    ),
    tags: [
      "cm1",
      "longueur",
      "convertir",
      "open",
      "expliquer",
      "cm_m",
      "fixed",
    ],
  },

  {
    kind: "template",
    id: "cm1_longueur_convertir_tpl_001_m_cm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_convertir",
    difficulty: 2,
    theme: "neutral",
    hint: "Pour passer des mètres aux centimètres, multiplie par 100.",
    tags: [
      "cm1",
      "longueur",
      "convertir",
      "m_cm",
      "template",
      "short",
    ],
    generate: () => {
      const meters = randomChoice([1, 2, 3, 4, 5, 6, 8, 10]);
      const cm = meters * 100;

      return {
        text: `Convertis ${meters} m en centimètres.`,
        format: "short",
        expected: [String(cm)],
        comparator: "number_equal",
        explanation: exp(
          "Pour convertir des mètres en centimètres, on utilise 1 m = 100 cm.",
          "On multiplie le nombre de mètres par 100.",
          `${meters} × 100 = ${cm}.`,
          `${meters} m = ${cm} cm.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_longueur_convertir_tpl_002_cm_m_entier",
    niveau: "cm1",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_convertir",
    difficulty: 2,
    theme: "neutral",
    hint: "100 cm = 1 m.",
    tags: [
      "cm1",
      "longueur",
      "convertir",
      "cm_m",
      "template",
      "short",
    ],
    generate: () => {
      const meters = randomChoice([1, 2, 3, 4, 5, 6, 8]);
      const cm = meters * 100;

      return {
        text: `Convertis ${cm} cm en mètres.`,
        format: "short",
        expected: [String(meters)],
        comparator: "number_equal",
        explanation: exp(
          "Pour convertir des centimètres en mètres, on utilise 100 cm = 1 m.",
          "On divise le nombre de centimètres par 100.",
          `${cm} ÷ 100 = ${meters}.`,
          `${cm} cm = ${meters} m.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_longueur_convertir_tpl_003_km_m",
    niveau: "cm1",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_convertir",
    difficulty: 2,
    theme: "neutral",
    hint: "1 km = 1 000 m.",
    tags: [
      "cm1",
      "longueur",
      "convertir",
      "km_m",
      "template",
      "short",
    ],
    generate: () => {
      const km = randomChoice([1, 2, 3, 4, 5, 6, 8]);
      const meters = km * 1000;

      return {
        text: `Convertis ${km} km en mètres.`,
        format: "short",
        expected: [String(meters)],
        comparator: "number_equal",
        explanation: exp(
          "Pour convertir des kilomètres en mètres, on utilise 1 km = 1 000 m.",
          "On multiplie le nombre de kilomètres par 1 000.",
          `${km} × 1 000 = ${meters}.`,
          `${km} km = ${meters} m.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_longueur_convertir_tpl_004_m_km_entier",
    niveau: "cm1",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_convertir",
    difficulty: 3,
    theme: "neutral",
    hint: "1 000 m = 1 km.",
    tags: [
      "cm1",
      "longueur",
      "convertir",
      "m_km",
      "template",
      "short",
    ],
    generate: () => {
      const km = randomChoice([1, 2, 3, 4, 5]);
      const meters = km * 1000;

      return {
        text: `Convertis ${meters} m en kilomètres.`,
        format: "short",
        expected: [String(km)],
        comparator: "number_equal",
        explanation: exp(
          "Pour convertir des mètres en kilomètres, on utilise 1 000 m = 1 km.",
          "On divise le nombre de mètres par 1 000.",
          `${meters} ÷ 1 000 = ${km}.`,
          `${meters} m = ${km} km.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_longueur_convertir_tpl_005_m_cm_decimal",
    niveau: "cm1",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_convertir",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour passer des centimètres aux mètres, divise par 100.",
    tags: [
      "cm1",
      "longueur",
      "convertir",
      "decimal",
      "cm_m",
      "template",
      "qcm",
    ],
    generate: () => {
      const cm = randomChoice([150, 250, 350, 450, 125, 175]);
      const meters = cm / 100;
      const correct = String(meters).replace(".", ",");

      return {
        text: `Convertis ${cm} cm en mètres.`,
        format: "qcm",
        choices: makeChoices(correct, [
          String(cm * 100).replace(".", ","),
          String(cm / 10).replace(".", ","),
          String(cm + 100).replace(".", ","),
        ]),
        expected: [correct, String(meters)],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour convertir des centimètres en mètres, on divise par 100.",
          "Le résultat peut être un nombre décimal.",
          `${cm} ÷ 100 = ${String(meters).replace(".", ",")}.`,
          `${cm} cm = ${correct} m.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_longueur_convertir_tpl_006_reunion_distance",
    niveau: "cm1",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_convertir",
    difficulty: 3,
    theme: "reunion",
    hint: "1 km = 1 000 m.",
    tags: [
      "cm1",
      "longueur",
      "convertir",
      "reunion",
      "distance",
      "template",
      "short",
    ],
    generate: () => {
      const km = randomChoice([2, 3, 4, 5, 6]);
      const meters = km * 1000;

      return {
        text: `Une randonnée à La Réunion mesure ${km} km. Quelle est cette distance en mètres ?`,
        format: "short",
        expected: [String(meters)],
        comparator: "number_equal",
        explanation: exp(
          "Pour exprimer une distance en mètres, on convertit les kilomètres.",
          "On utilise 1 km = 1 000 m.",
          `${km} × 1 000 = ${meters}.`,
          `${km} km = ${meters} m.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_longueur_convertir_tpl_007_open_expliquer",
    niveau: "cm1",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_convertir",
    difficulty: 4,
    theme: "neutral",
    hint: "Indique l’égalité d’unités utilisée.",
    tags: [
      "cm1",
      "longueur",
      "convertir",
      "open",
      "expliquer",
      "template",
    ],
    generate: () => {
      const meters = randomChoice([2, 3, 4, 5, 6]);
      const cm = meters * 100;

      return {
        text: `Explique comment convertir ${meters} m en centimètres.`,
        format: "open",
        expected: [
          String(meters),
          "100",
          String(cm),
          "cm",
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "Pour expliquer une conversion, on indique l’égalité d’unités utilisée.",
          "On sait que 1 m = 100 cm.",
          `${meters} × 100 = ${cm}.`,
          `${meters} m = ${cm} cm.`
        ),
      };
    },
  },
    // ============================================================
  // LONGUEUR_ESTIMER
  // Estimer une longueur
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_longueur_estimer_fixed_001_unite_adaptee",
    niveau: "cm1",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_estimer",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle unité est la plus adaptée pour mesurer la longueur d’un crayon ?",
    format: "qcm",
    choices: ["cm", "km", "m", "mm uniquement"],
    expected: ["cm"],
    comparator: "mcq_exact",
    hint: "Un crayon mesure généralement quelques dizaines de centimètres.",
    explanation: exp(
      "Estimer une longueur, c’est choisir une valeur ou une unité raisonnable sans mesurer exactement.",
      "On choisit l’unité adaptée à l’objet.",
      "Un crayon mesure environ 15 cm, pas plusieurs mètres ni plusieurs kilomètres.",
      "L’unité la plus adaptée est le centimètre."
    ),
    tags: [
      "cm1",
      "longueur",
      "estimer",
      "unite",
      "qcm",
      "fixed",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_longueur_estimer_fixed_002_distance",
    niveau: "cm1",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_estimer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle estimation est la plus raisonnable pour la longueur d’une salle de classe ?",
    format: "qcm",
    choices: ["8 m", "8 cm", "8 km", "800 km"],
    expected: ["8 m"],
    comparator: "mcq_exact",
    hint: "Une salle de classe est plus longue qu’une règle, mais beaucoup plus courte qu’une route.",
    explanation: exp(
      "Estimer, c’est choisir une valeur qui a du sens.",
      "On compare avec des objets connus : une salle est plus grande qu’un cahier, mais beaucoup plus petite qu’un kilomètre.",
      "8 cm est trop petit et 8 km est beaucoup trop grand.",
      "Une estimation raisonnable est 8 m."
    ),
    tags: [
      "cm1",
      "longueur",
      "estimer",
      "ordre_grandeur",
      "qcm",
      "fixed",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_longueur_estimer_open_001_expliquer",
    niveau: "cm1",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_estimer",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi 2 km n’est pas une estimation raisonnable pour la longueur d’une table.",
    format: "open",
    expected: ["km", "m", "table", "trop grand"],
    comparator: "contains_keyword",
    hint: "Compare une table avec une route ou une randonnée.",
    explanation: exp(
      "Une estimation doit être cohérente avec l’objet mesuré.",
      "Une table se mesure plutôt en mètres ou en centimètres.",
      "2 km = 2 000 m, c’est la longueur d’un grand trajet, pas d’une table.",
      "2 km est donc beaucoup trop grand pour une table."
    ),
    tags: [
      "cm1",
      "longueur",
      "estimer",
      "open",
      "expliquer",
      "fixed",
    ],
  },

  {
    kind: "template",
    id: "cm1_longueur_estimer_tpl_001_choisir_unite_objet",
    niveau: "cm1",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_estimer",
    difficulty: 1,
    theme: "neutral",
    hint: "Choisis l’unité qui correspond à la taille de l’objet.",
    tags: [
      "cm1",
      "longueur",
      "estimer",
      "unite",
      "qcm",
      "template",
    ],
    generate: () => {
      const situations = randomChoice([
        {
          objet: "une gomme",
          correct: "cm",
          wrongs: ["km", "m", "dam"],
          explication: "Une gomme est un petit objet : on la mesure en centimètres.",
        },
        {
          objet: "la distance entre deux villes",
          correct: "km",
          wrongs: ["cm", "mm", "dm"],
          explication: "La distance entre deux villes est grande : on la mesure en kilomètres.",
        },
        {
          objet: "la hauteur d’une porte",
          correct: "m",
          wrongs: ["km", "mm", "cm uniquement"],
          explication: "Une porte mesure environ 2 mètres : le mètre est adapté.",
        },
        {
          objet: "la longueur d’un cahier",
          correct: "cm",
          wrongs: ["km", "m", "hm"],
          explication: "Un cahier mesure quelques dizaines de centimètres.",
        },
      ]);

      return {
        text: `Quelle unité est la plus adaptée pour estimer ${situations.objet} ?`,
        format: "qcm",
        choices: makeChoices(situations.correct, situations.wrongs),
        expected: [situations.correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour estimer une longueur, il faut choisir une unité adaptée.",
          "On pense à la taille réelle de l’objet ou de la distance.",
          situations.explication,
          `L’unité adaptée est ${situations.correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_longueur_estimer_tpl_002_choisir_estimation",
    niveau: "cm1",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_estimer",
    difficulty: 2,
    theme: "neutral",
    hint: "Élimine les valeurs beaucoup trop petites ou beaucoup trop grandes.",
    tags: [
      "cm1",
      "longueur",
      "estimer",
      "ordre_grandeur",
      "qcm",
      "template",
    ],
    generate: () => {
      const item = randomChoice([
        {
          objet: "la longueur d’un crayon",
          correct: "15 cm",
          wrongs: ["15 m", "15 km", "15 mm"],
          conclusion: "Un crayon mesure souvent autour de 15 cm.",
        },
        {
          objet: "la largeur d’une porte",
          correct: "80 cm",
          wrongs: ["80 km", "80 mm", "80 m"],
          conclusion: "Une porte mesure environ 80 cm de large.",
        },
        {
          objet: "la longueur d’une piscine",
          correct: "25 m",
          wrongs: ["25 cm", "25 mm", "25 km"],
          conclusion: "Une piscine peut mesurer environ 25 m.",
        },
        {
          objet: "une randonnée courte",
          correct: "3 km",
          wrongs: ["3 cm", "3 mm", "300 km"],
          conclusion: "Une randonnée courte peut mesurer quelques kilomètres.",
        },
      ]);

      return {
        text: `Quelle estimation est la plus raisonnable pour ${item.objet} ?`,
        format: "qcm",
        choices: makeChoices(item.correct, item.wrongs),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Estimer une longueur, c’est choisir une valeur plausible.",
          "On compare avec des objets ou distances que l’on connaît.",
          item.conclusion,
          `L’estimation raisonnable est ${item.correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_longueur_estimer_tpl_003_reunion_distance",
    niveau: "cm1",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_estimer",
    difficulty: 2,
    theme: "reunion",
    hint: "Pour une marche ou un trajet, on utilise souvent les mètres ou les kilomètres.",
    tags: [
      "cm1",
      "longueur",
      "estimer",
      "reunion",
      "distance",
      "qcm",
      "template",
    ],
    generate: () => {
      const situation = randomChoice([
        {
          text: "une petite marche sur le front de mer de Saint-Pierre",
          correct: "2 km",
          wrongs: ["2 cm", "2 mm", "200 km"],
        },
        {
          text: "la longueur d’un sentier entre deux points proches",
          correct: "800 m",
          wrongs: ["800 km", "800 cm", "8 mm"],
        },
        {
          text: "la distance d’une longue randonnée",
          correct: "12 km",
          wrongs: ["12 cm", "12 mm", "1 200 km"],
        },
      ]);

      return {
        text: `À La Réunion, quelle estimation est raisonnable pour ${situation.text} ?`,
        format: "qcm",
        choices: makeChoices(situation.correct, situation.wrongs),
        expected: [situation.correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour estimer une distance réelle, on choisit une unité adaptée au trajet.",
          "Une marche ou une randonnée se mesure souvent en mètres ou en kilomètres.",
          "Les centimètres ou millimètres sont trop petits pour un trajet.",
          `L’estimation raisonnable est ${situation.correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_longueur_estimer_tpl_004_open_justifier",
    niveau: "cm1",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_estimer",
    difficulty: 4,
    theme: "neutral",
    hint: "Explique pourquoi une unité est trop petite ou trop grande.",
    tags: [
      "cm1",
      "longueur",
      "estimer",
      "open",
      "justifier",
      "template",
    ],
    generate: () => {
      const item = randomChoice([
        {
          objet: "une règle",
          mauvaise: "3 km",
          bonne: "30 cm",
          mots: ["règle", "km", "cm", "trop grand"],
        },
        {
          objet: "une route entre deux villes",
          mauvaise: "5 cm",
          bonne: "5 km",
          mots: ["route", "cm", "km", "trop petit"],
        },
        {
          objet: "une table",
          mauvaise: "2 km",
          bonne: "2 m",
          mots: ["table", "km", "m", "trop grand"],
        },
      ]);

      return {
        text: `Explique pourquoi ${item.mauvaise} n’est pas une estimation raisonnable pour ${item.objet}.`,
        format: "open",
        expected: item.mots,
        comparator: "contains_keyword",
        explanation: exp(
          "Une estimation doit être plausible pour l’objet ou la distance.",
          "On compare l’unité proposée avec une unité plus adaptée.",
          `${item.mauvaise} ne convient pas pour ${item.objet}. Une estimation plus raisonnable serait ${item.bonne}.`,
          "Il faut choisir une unité adaptée à la taille réelle."
        ),
      };
    },
  },

  // ============================================================
  // LONGUEUR_MESURER
  // Mesurer une longueur
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_longueur_mesurer_fixed_001_droite_ab",
    niveau: "cm1",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_mesurer",
    difficulty: 2,
    theme: "neutral",
    text: "Sur la droite graduée, le point A est placé à 2 et le point B à 7. Quelle est la longueur AB ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Calcule l’écart entre 7 et 2.",
    explanation: exp(
      "Mesurer une longueur sur une droite graduée revient à calculer l’écart entre deux positions.",
      "On soustrait la plus petite position à la plus grande.",
      "7 - 2 = 5.",
      "La longueur AB est 5 unités."
    ),
    canvas: droiteGradueeCanvas({
      min: 0,
      max: 10,
      step: 1,
      points: [
        { value: 2, label: "A" },
        { value: 7, label: "B" },
      ],
      display: {
        showTicks: true,
        showValues: true,
        showPoints: true,
        showPointLabels: true,
        showZero: true,
      },
      size: {
        width: 360,
        height: 130,
      },
    }),
    tags: [
      "cm1",
      "longueur",
      "mesurer",
      "droite_graduee",
      "short",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_longueur_mesurer_fixed_002_decimal",
    niveau: "cm1",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_mesurer",
    difficulty: 3,
    theme: "neutral",
    text: "Sur la droite graduée, le point A est à 1,5 et le point B à 4. Quelle est la longueur AB ?",
    format: "short",
    expected: ["2,5", "2.5"],
    comparator: "number_equal",
    hint: "Calcule 4 - 1,5.",
    explanation: exp(
      "Sur une droite graduée, une longueur est un écart entre deux positions.",
      "On soustrait la plus petite position à la plus grande.",
      "4 - 1,5 = 2,5.",
      "La longueur AB est 2,5 unités."
    ),
    canvas: droiteGradueeCanvas({
      min: 0,
      max: 5,
      step: 0.5,
      points: [
        { value: 1.5, label: "A" },
        { value: 4, label: "B" },
      ],
      display: {
        showTicks: true,
        showValues: true,
        showPoints: true,
        showPointLabels: true,
        showZero: true,
      },
      size: {
        width: 360,
        height: 130,
      },
    }),
    tags: [
      "cm1",
      "longueur",
      "mesurer",
      "droite_graduee",
      "decimal",
      "short",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_longueur_mesurer_open_001_expliquer",
    niveau: "cm1",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_mesurer",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment trouver la longueur AB si A est placé à 3 et B à 9 sur une droite graduée.",
    format: "open",
    expected: ["9", "3", "6", "soustraction", "écart"],
    comparator: "contains_keyword",
    hint: "Une longueur est l’écart entre les deux positions.",
    explanation: exp(
      "Une longueur sur une droite graduée correspond à un écart.",
      "On repère les deux positions, puis on soustrait la plus petite à la plus grande.",
      "9 - 3 = 6.",
      "La longueur AB est 6 unités."
    ),
    canvas: droiteGradueeCanvas({
      min: 0,
      max: 10,
      step: 1,
      points: [
        { value: 3, label: "A" },
        { value: 9, label: "B" },
      ],
      display: {
        showTicks: true,
        showValues: true,
        showPoints: true,
        showPointLabels: true,
        showZero: true,
      },
      size: {
        width: 360,
        height: 130,
      },
    }),
    tags: [
      "cm1",
      "longueur",
      "mesurer",
      "open",
      "expliquer",
      "droite_graduee",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "template",
    id: "cm1_longueur_mesurer_tpl_001_droite_entiers",
    niveau: "cm1",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_mesurer",
    difficulty: 2,
    theme: "neutral",
    hint: "Calcule la différence entre les deux positions.",
    tags: [
      "cm1",
      "longueur",
      "mesurer",
      "droite_graduee",
      "entiers",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const a = randomInt(1, 5);
      const length = randomInt(2, 5);
      const b = a + length;

      return {
        text: `Sur la droite graduée, le point A est placé à ${a} et le point B à ${b}. Quelle est la longueur AB ?`,
        format: "short",
        expected: [String(length)],
        comparator: "number_equal",
        explanation: exp(
          "Pour mesurer une longueur sur une droite graduée, on calcule l’écart entre les deux points.",
          "On soustrait la position de A à la position de B.",
          `${b} - ${a} = ${length}.`,
          `La longueur AB est ${length} unités.`
        ),
        canvas: droiteGradueeCanvas({
          min: 0,
          max: 10,
          step: 1,
          points: [
            { value: a, label: "A" },
            { value: b, label: "B" },
          ],
          display: {
            showTicks: true,
            showValues: true,
            showPoints: true,
            showPointLabels: true,
            showZero: true,
          },
          size: {
            width: 360,
            height: 130,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_longueur_mesurer_tpl_002_droite_demidixieme",
    niveau: "cm1",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_mesurer",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule l’écart entre les deux positions décimales.",
    tags: [
      "cm1",
      "longueur",
      "mesurer",
      "droite_graduee",
      "decimal",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const values = [
        { a: 0.5, b: 2.5, length: 2 },
        { a: 1.5, b: 4, length: 2.5 },
        { a: 2, b: 4.5, length: 2.5 },
        { a: 0.5, b: 3, length: 2.5 },
        { a: 1, b: 3.5, length: 2.5 },
      ];
      const item = randomChoice(values);

      const expected = String(item.length).replace(".", ",");

      return {
        text: `Sur la droite graduée, A est à ${String(item.a).replace(".", ",")} et B est à ${String(item.b).replace(".", ",")}. Quelle est la longueur AB ?`,
        format: "short",
        expected: [expected, String(item.length)],
        comparator: "number_equal",
        explanation: exp(
          "Une longueur sur une droite graduée est la distance entre deux positions.",
          "On calcule la différence entre la plus grande et la plus petite position.",
          `${String(item.b).replace(".", ",")} - ${String(item.a).replace(".", ",")} = ${expected}.`,
          `La longueur AB est ${expected} unités.`
        ),
        canvas: droiteGradueeCanvas({
          min: 0,
          max: 5,
          step: 0.5,
          points: [
            { value: item.a, label: "A" },
            { value: item.b, label: "B" },
          ],
          display: {
            showTicks: true,
            showValues: true,
            showPoints: true,
            showPointLabels: true,
            showZero: true,
          },
          size: {
            width: 360,
            height: 130,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_longueur_mesurer_tpl_003_point_manquant",
    niveau: "cm1",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_mesurer",
    difficulty: 3,
    theme: "neutral",
    hint: "Si A est à une position et AB a une longueur, ajoute la longueur.",
    tags: [
      "cm1",
      "longueur",
      "mesurer",
      "point_manquant",
      "droite_graduee",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const a = randomInt(1, 5);
      const length = randomInt(2, 4);
      const b = a + length;

      return {
        text: `Sur une droite graduée, A est placé à ${a}. La longueur AB vaut ${length}. Si B est à droite de A, quelle est la position de B ?`,
        format: "short",
        expected: [String(b)],
        comparator: "number_equal",
        explanation: exp(
          "Quand on connaît une position de départ et une longueur vers la droite, on additionne.",
          "Le point B est à droite de A, donc sa position est plus grande.",
          `${a} + ${length} = ${b}.`,
          `La position de B est ${b}.`
        ),
        canvas: droiteGradueeCanvas({
          min: 0,
          max: 10,
          step: 1,
          points: [
            { value: a, label: "A" },
            { value: b, label: "B" },
          ],
          display: {
            showTicks: true,
            showValues: true,
            showPoints: true,
            showPointLabels: true,
            showZero: true,
          },
          size: {
            width: 360,
            height: 130,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_longueur_mesurer_tpl_004_qcm_longueur_ab",
    niveau: "cm1",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_mesurer",
    difficulty: 2,
    theme: "neutral",
    hint: "Fais position de B moins position de A.",
    tags: [
      "cm1",
      "longueur",
      "mesurer",
      "qcm",
      "droite_graduee",
      "template",
      "canvas",
    ],
    generate: () => {
      const a = randomInt(1, 5);
      const length = randomInt(2, 5);
      const b = a + length;

      return {
        text: `Sur la droite graduée, A est à ${a} et B est à ${b}. Quelle est la longueur AB ?`,
        format: "qcm",
        choices: makeChoices(String(length), [
          String(a + b),
          String(b),
          String(Math.max(0, length - 1)),
        ]),
        expected: [String(length)],
        comparator: "mcq_exact",
        explanation: exp(
          "La longueur entre deux points est l’écart entre leurs positions.",
          "On soustrait la plus petite position à la plus grande.",
          `${b} - ${a} = ${length}.`,
          `La longueur AB est ${length}.`
        ),
        canvas: droiteGradueeCanvas({
          min: 0,
          max: 10,
          step: 1,
          points: [
            { value: a, label: "A" },
            { value: b, label: "B" },
          ],
          display: {
            showTicks: true,
            showValues: true,
            showPoints: true,
            showPointLabels: true,
            showZero: true,
          },
          size: {
            width: 360,
            height: 130,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_longueur_mesurer_tpl_005_open_erreur_somme",
    niveau: "cm1",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_mesurer",
    difficulty: 4,
    theme: "neutral",
    hint: "Une longueur entre deux points n’est pas la somme des positions.",
    tags: [
      "cm1",
      "longueur",
      "mesurer",
      "open",
      "erreur",
      "droite_graduee",
      "template",
      "canvas",
    ],
    generate: () => {
      const a = randomInt(1, 4);
      const length = randomInt(3, 5);
      const b = a + length;
      const wrong = a + b;

      return {
        text: `Sur une droite graduée, A est à ${a} et B est à ${b}. Un élève dit que AB = ${wrong}, car ${a} + ${b} = ${wrong}. Explique son erreur.`,
        format: "open",
        expected: [
          String(a),
          String(b),
          String(length),
          "soustraction",
          "écart",
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "La longueur entre deux points correspond à l’écart entre leurs positions.",
          "Il ne faut pas additionner les positions : il faut les soustraire.",
          `${b} - ${a} = ${length}, et non ${a} + ${b} = ${wrong}.`,
          `La longueur AB est ${length}.`
        ),
        canvas: droiteGradueeCanvas({
          min: 0,
          max: 10,
          step: 1,
          points: [
            { value: a, label: "A" },
            { value: b, label: "B" },
          ],
          display: {
            showTicks: true,
            showValues: true,
            showPoints: true,
            showPointLabels: true,
            showZero: true,
          },
          size: {
            width: 360,
            height: 130,
          },
        }),
      };
    },
  },
    // ============================================================
  // LONGUEUR_DEFI
  // Résoudre un défi sur les longueurs
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_longueur_defi_fixed_001_droite_graduee",
    niveau: "cm1",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Défi : sur une droite graduée, A est à 2 et B est à 8. Un élève dit que la longueur AB vaut 10. Explique son erreur.",
    format: "open",
    expected: ["8", "2", "6", "soustraction", "écart"],
    comparator: "contains_keyword",
    hint: "La longueur AB est l’écart entre les deux positions.",
    explanation: exp(
      "Sur une droite graduée, une longueur est un écart entre deux positions.",
      "On ne doit pas additionner les positions des points : on doit les soustraire.",
      "8 - 2 = 6, alors que 8 + 2 = 10.",
      "L’élève s’est trompé : la longueur AB vaut 6 unités."
    ),
    canvas: droiteGradueeCanvas({
      min: 0,
      max: 10,
      step: 1,
      points: [
        { value: 2, label: "A" },
        { value: 8, label: "B" },
      ],
      display: {
        showTicks: true,
        showValues: true,
        showPoints: true,
        showPointLabels: true,
        showZero: true,
      },
      size: {
        width: 360,
        height: 130,
      },
    }),
    tags: [
      "cm1",
      "longueur",
      "defi",
      "droite_graduee",
      "erreur",
      "open",
      "fixed",
      "canvas",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_longueur_defi_fixed_002_conversion_trajet",
    niveau: "cm1",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Défi randonnée : Léa marche 2 km le matin et 750 m l’après-midi. Quelle distance totale a-t-elle parcourue en mètres ?",
    format: "short",
    expected: ["2750", "2 750"],
    comparator: "number_equal",
    hint: "Convertis d’abord 2 km en mètres.",
    explanation: exp(
      "Pour additionner des longueurs, elles doivent être dans la même unité.",
      "On convertit les kilomètres en mètres, puis on additionne.",
      "2 km = 2 000 m, donc 2 000 + 750 = 2 750.",
      "Léa a parcouru 2 750 m."
    ),
    tags: [
      "cm1",
      "longueur",
      "defi",
      "reunion",
      "conversion",
      "trajet",
      "short",
      "fixed",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_longueur_defi_open_001_choisir_methode",
    niveau: "cm1",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique comment résoudre : Tom a une corde de 3 m. Il coupe 125 cm. Quelle longueur de corde reste-t-il ?",
    format: "open",
    expected: ["3", "300", "125", "175", "cm"],
    comparator: "contains_keyword",
    hint: "Convertis 3 m en centimètres avant de soustraire.",
    explanation: exp(
      "Pour résoudre un problème avec des longueurs, il faut d’abord utiliser une même unité.",
      "On convertit 3 m en centimètres, puis on enlève la longueur coupée.",
      "3 m = 300 cm, donc 300 - 125 = 175.",
      "Il reste 175 cm de corde."
    ),
    tags: [
      "cm1",
      "longueur",
      "defi",
      "open",
      "conversion",
      "soustraction",
      "fixed",
    ],
  },

  {
    kind: "template",
    id: "cm1_longueur_defi_tpl_001_droite_ecart_entier",
    niveau: "cm1",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule l’écart entre les deux positions.",
    tags: [
      "cm1",
      "longueur",
      "defi",
      "droite_graduee",
      "ecart",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const a = randomInt(1, 4);
      const distance = randomInt(4, 7);
      const b = a + distance;

      return {
        text: `Défi : sur une droite graduée, A est à ${a} et B est à ${b}. Quelle est la longueur AB ?`,
        format: "short",
        expected: [String(distance)],
        comparator: "number_equal",
        explanation: exp(
          "Une longueur sur une droite graduée est un écart.",
          "On soustrait la plus petite position à la plus grande.",
          `${b} - ${a} = ${distance}.`,
          `La longueur AB est ${distance} unités.`
        ),
        canvas: droiteGradueeCanvas({
          min: 0,
          max: 12,
          step: 1,
          points: [
            { value: a, label: "A" },
            { value: b, label: "B" },
          ],
          display: {
            showTicks: true,
            showValues: true,
            showPoints: true,
            showPointLabels: true,
            showZero: true,
          },
          size: {
            width: 360,
            height: 130,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_longueur_defi_tpl_002_droite_decimal",
    niveau: "cm1",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule la différence entre les deux positions décimales.",
    tags: [
      "cm1",
      "longueur",
      "defi",
      "droite_graduee",
      "decimal",
      "template",
      "short",
      "canvas",
    ],
    generate: () => {
      const item = randomChoice([
        { a: 0.5, b: 3.5, d: 3 },
        { a: 1.5, b: 4.5, d: 3 },
        { a: 0.5, b: 2.5, d: 2 },
        { a: 2.5, b: 5, d: 2.5 },
        { a: 1, b: 4.5, d: 3.5 },
      ]);

      const aText = String(item.a).replace(".", ",");
      const bText = String(item.b).replace(".", ",");
      const dText = String(item.d).replace(".", ",");

      return {
        text: `Défi : sur une droite graduée, A est à ${aText} et B est à ${bText}. Quelle est la longueur AB ?`,
        format: "short",
        expected: [dText, String(item.d)],
        comparator: "number_equal",
        explanation: exp(
          "Une longueur sur une droite graduée correspond à l’écart entre deux positions.",
          "On soustrait la plus petite position à la plus grande.",
          `${bText} - ${aText} = ${dText}.`,
          `La longueur AB est ${dText} unités.`
        ),
        canvas: droiteGradueeCanvas({
          min: 0,
          max: 5,
          step: 0.5,
          points: [
            { value: item.a, label: "A" },
            { value: item.b, label: "B" },
          ],
          display: {
            showTicks: true,
            showValues: true,
            showPoints: true,
            showPointLabels: true,
            showZero: true,
          },
          size: {
            width: 360,
            height: 130,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_longueur_defi_tpl_003_conversion_addition",
    niveau: "cm1",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_defi",
    difficulty: 4,
    theme: "reunion",
    hint: "Convertis les kilomètres en mètres avant d’additionner.",
    tags: [
      "cm1",
      "longueur",
      "defi",
      "reunion",
      "conversion",
      "addition",
      "template",
      "short",
    ],
    generate: () => {
      const km = randomChoice([1, 2, 3, 4]);
      const meters = randomChoice([250, 500, 750, 900]);
      const total = km * 1000 + meters;

      return {
        text: `Défi randonnée : Noa marche ${km} km puis encore ${meters} m. Quelle distance totale a-t-il parcourue en mètres ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Pour additionner des longueurs, elles doivent être dans la même unité.",
          "On convertit les kilomètres en mètres, puis on additionne.",
          `${km} km = ${km * 1000} m, donc ${km * 1000} + ${meters} = ${total}.`,
          `Noa a parcouru ${total} m.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_longueur_defi_tpl_004_conversion_soustraction",
    niveau: "cm1",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Convertis la plus grande longueur dans la même unité.",
    tags: [
      "cm1",
      "longueur",
      "defi",
      "conversion",
      "soustraction",
      "template",
      "short",
    ],
    generate: () => {
      const meters = randomChoice([2, 3, 4, 5]);
      const cut = randomChoice([50, 75, 125, 150, 175, 250]);
      const totalCm = meters * 100;
      const reste = totalCm - cut;

      return {
        text: `Une corde mesure ${meters} m. On coupe ${cut} cm. Quelle longueur reste-t-il en centimètres ?`,
        format: "short",
        expected: [String(reste)],
        comparator: "number_equal",
        explanation: exp(
          "Pour soustraire des longueurs, elles doivent être dans la même unité.",
          "On convertit les mètres en centimètres, puis on soustrait la longueur coupée.",
          `${meters} m = ${totalCm} cm, donc ${totalCm} - ${cut} = ${reste}.`,
          `Il reste ${reste} cm.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_longueur_defi_tpl_005_qcm_unite_adaptee",
    niveau: "cm1",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Choisis l’unité qui rend le calcul simple et cohérent.",
    tags: [
      "cm1",
      "longueur",
      "defi",
      "unite",
      "qcm",
      "template",
    ],
    generate: () => {
      const item = randomChoice([
        {
          text: "Pour calculer 2 m + 45 cm, quelle unité est la plus pratique ?",
          correct: "cm",
          wrongs: ["km", "mm uniquement", "heure"],
          explanationText:
            "Le centimètre est pratique car 2 m = 200 cm, puis on peut additionner 200 cm et 45 cm.",
        },
        {
          text: "Pour comparer 3 km et 2 800 m, quelle unité est la plus pratique ?",
          correct: "m",
          wrongs: ["cm", "mm", "litre"],
          explanationText:
            "Le mètre est pratique car 3 km = 3 000 m, puis on compare 3 000 m et 2 800 m.",
        },
        {
          text: "Pour mesurer une gomme, quelle unité est la plus adaptée ?",
          correct: "cm",
          wrongs: ["km", "m", "tonne"],
          explanationText:
            "Une gomme est un petit objet : le centimètre est une unité adaptée.",
        },
      ]);

      return {
        text: item.text,
        format: "qcm",
        choices: makeChoices(item.correct, item.wrongs),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Choisir une unité adaptée aide à comparer ou calculer correctement.",
          "On choisit une unité cohérente avec la situation.",
          item.explanationText,
          `L’unité adaptée est ${item.correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_longueur_defi_tpl_006_qcm_erreur_conversion",
    niveau: "cm1",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Vérifie l’égalité entre mètres et centimètres.",
    tags: [
      "cm1",
      "longueur",
      "defi",
      "erreur",
      "conversion",
      "qcm",
      "template",
    ],
    generate: () => {
      const meters = randomChoice([2, 3, 4, 5]);
      const wrong = meters * 10;
      const correct = meters * 100;

      return {
        text: `Un élève écrit : ${meters} m = ${wrong} cm. A-t-il raison ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour convertir des mètres en centimètres, il faut connaître l’égalité d’unités.",
          "On utilise 1 m = 100 cm.",
          `${meters} m = ${meters} × 100 = ${correct} cm, et non ${wrong} cm.`,
          "L’élève n’a pas raison."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_longueur_defi_tpl_007_open_erreur_conversion",
    niveau: "cm1",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Explique l’égalité 1 m = 100 cm.",
    tags: [
      "cm1",
      "longueur",
      "defi",
      "open",
      "erreur",
      "conversion",
      "template",
    ],
    generate: () => {
      const meters = randomChoice([2, 3, 4, 5]);
      const wrong = meters * 10;
      const correct = meters * 100;

      return {
        text: `Un élève écrit : ${meters} m = ${wrong} cm. Explique son erreur.`,
        format: "open",
        expected: [
          String(meters),
          String(wrong),
          String(correct),
          "100",
          "cm",
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "Une erreur fréquente est de confondre ×10 et ×100.",
          "Pour passer des mètres aux centimètres, on multiplie par 100.",
          `${meters} m = ${meters} × 100 = ${correct} cm, pas ${wrong} cm.`,
          "L’élève a oublié qu’un mètre contient 100 centimètres."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_longueur_defi_tpl_008_open_droite_graduee",
    niveau: "cm1",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Explique avec le mot écart.",
    tags: [
      "cm1",
      "longueur",
      "defi",
      "open",
      "droite_graduee",
      "raisonnement",
      "template",
      "canvas",
    ],
    generate: () => {
      const a = randomInt(1, 4);
      const d = randomInt(3, 6);
      const b = a + d;
      const wrong = a + b;

      return {
        text: `Sur une droite graduée, A est à ${a} et B est à ${b}. Un élève répond que AB vaut ${wrong}. Explique son erreur et donne la bonne longueur.`,
        format: "open",
        expected: [
          String(a),
          String(b),
          String(d),
          "écart",
          "soustraction",
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "Sur une droite graduée, la longueur AB est l’écart entre les positions de A et B.",
          "On ne calcule pas une longueur en additionnant les positions.",
          `${b} - ${a} = ${d}, alors que ${a} + ${b} = ${wrong}.`,
          `La bonne longueur est ${d} unités.`
        ),
        canvas: droiteGradueeCanvas({
          min: 0,
          max: 12,
          step: 1,
          points: [
            { value: a, label: "A" },
            { value: b, label: "B" },
          ],
          display: {
            showTicks: true,
            showValues: true,
            showPoints: true,
            showPointLabels: true,
            showZero: true,
          },
          size: {
            width: 360,
            height: 130,
          },
        }),
      };
    },
  },

  // ============================================================
  // TOP-UP — LONGUEUR_COMPARER
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_longueur_comparer_fixed_003_m_cm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle longueur est la plus grande : 3 m ou 250 cm ?",
    format: "qcm",
    choices: ["3 m", "250 cm"],
    expected: ["3 m"],
    comparator: "mcq_exact",
    hint: "Convertis 3 m en centimètres.",
    explanation: exp(
      "Pour comparer deux longueurs avec des unités différentes, on les met dans la même unité.",
      "On convertit les mètres en centimètres.",
      "3 m = 300 cm, et 300 cm est plus grand que 250 cm.",
      "La longueur la plus grande est 3 m."
    ),
    tags: ["cm1", "longueur", "comparer", "conversion", "qcm", "fixed"],
  },

  // ============================================================
  // TOP-UP — LONGUEUR_ESTIMER
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_longueur_estimer_fixed_003_riviere",
    niveau: "cm1",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_estimer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle unité est la plus adaptée pour mesurer la longueur d’une rivière ?",
    format: "qcm",
    choices: ["km", "cm", "mm", "dm"],
    expected: ["km"],
    comparator: "mcq_exact",
    hint: "Une rivière est très longue.",
    explanation: exp(
      "On choisit l’unité adaptée à la taille de ce que l’on mesure.",
      "Une rivière s’étend sur de grandes distances.",
      "Le centimètre ou le millimètre seraient beaucoup trop petits.",
      "L’unité la plus adaptée est le kilomètre."
    ),
    tags: ["cm1", "longueur", "estimer", "unite", "qcm", "fixed"],
  },

  {
    kind: "fixed",
    id: "cm1_longueur_estimer_fixed_004_adulte",
    niveau: "cm1",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_estimer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle estimation est la plus raisonnable pour la taille d’un adulte ?",
    format: "qcm",
    choices: ["170 cm", "17 cm", "17 m", "1 700 cm"],
    expected: ["170 cm"],
    comparator: "mcq_exact",
    hint: "Un adulte mesure un peu moins de 2 mètres.",
    explanation: exp(
      "Estimer, c’est choisir une valeur qui a du sens.",
      "On compare avec une taille connue : un adulte mesure environ 1 m 70.",
      "17 cm est trop petit et 17 m est beaucoup trop grand.",
      "Une estimation raisonnable est 170 cm."
    ),
    tags: ["cm1", "longueur", "estimer", "ordre_grandeur", "qcm", "fixed"],
  },

  {
    kind: "fixed",
    id: "cm1_longueur_estimer_fixed_005_fourmi",
    niveau: "cm1",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_estimer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle unité est la plus adaptée pour mesurer la longueur d’une fourmi ?",
    format: "qcm",
    choices: ["mm", "m", "km", "dam"],
    expected: ["mm"],
    comparator: "mcq_exact",
    hint: "Une fourmi est minuscule.",
    explanation: exp(
      "On choisit une unité adaptée à la taille de l’objet.",
      "Une fourmi est un très petit insecte.",
      "Le mètre ou le kilomètre seraient beaucoup trop grands.",
      "L’unité la plus adaptée est le millimètre."
    ),
    tags: ["cm1", "longueur", "estimer", "unite", "qcm", "fixed"],
  },

  // ============================================================
  // TOP-UP — LONGUEUR_MESURER
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_longueur_mesurer_fixed_003_droite_ab",
    niveau: "cm1",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_mesurer",
    difficulty: 2,
    theme: "neutral",
    text: "Sur la droite graduée, le point A est placé à 1 et le point B à 6. Quelle est la longueur AB ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Calcule l’écart entre 6 et 1.",
    explanation: exp(
      "Mesurer une longueur sur une droite graduée, c’est calculer l’écart entre deux positions.",
      "On soustrait la plus petite position à la plus grande.",
      "6 - 1 = 5.",
      "La longueur AB est 5 unités."
    ),
    canvas: droiteGradueeCanvas({
      min: 0,
      max: 10,
      step: 1,
      points: [
        { value: 1, label: "A" },
        { value: 6, label: "B" },
      ],
      display: {
        showTicks: true,
        showValues: true,
        showPoints: true,
        showPointLabels: true,
        showZero: true,
      },
      size: { width: 360, height: 130 },
    }),
    tags: ["cm1", "longueur", "mesurer", "droite_graduee", "short", "fixed", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_longueur_mesurer_fixed_004_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "longueur",
    microId: "longueur_mesurer",
    difficulty: 2,
    theme: "neutral",
    text: "Sur la droite graduée, le point A est à 0 et le point B à 4. Quelle est la longueur AB ?",
    format: "qcm",
    choices: ["4", "0", "8", "2"],
    expected: ["4"],
    comparator: "mcq_exact",
    hint: "Calcule l’écart entre 4 et 0.",
    explanation: exp(
      "La longueur entre deux points est l’écart entre leurs positions.",
      "On soustrait la plus petite position à la plus grande.",
      "4 - 0 = 4.",
      "La longueur AB est 4 unités."
    ),
    canvas: droiteGradueeCanvas({
      min: 0,
      max: 10,
      step: 1,
      points: [
        { value: 0, label: "A" },
        { value: 4, label: "B" },
      ],
      display: {
        showTicks: true,
        showValues: true,
        showPoints: true,
        showPointLabels: true,
        showZero: true,
      },
      size: { width: 360, height: 130 },
    }),
    tags: ["cm1", "longueur", "mesurer", "droite_graduee", "qcm", "fixed", "canvas"],
  },
];
