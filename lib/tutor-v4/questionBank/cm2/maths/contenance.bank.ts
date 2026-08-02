// lib/tutor-v4/question-banks/maths/cm2/contenances.bank.ts

import type {
  ContenanceCanvasData,
  ContenanceCanvasObject,
  QuestionTheme,
  TutorBankItemV4,
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

type ContenanceObjet = ContenanceCanvasObject & {
  millilitres: number;
  contenance: string;
  theme: QuestionTheme;
};

function contenanceCanvas(
  data: Omit<ContenanceCanvasData, "kind">
): ContenanceCanvasData {
  return {
    kind: "contenance",
    ...data,
  };
}

// ============================================================
// OBJETS DE RÉFÉRENCE — CM2
// ============================================================

const CONTENANCE_OBJECTS: ContenanceObjet[] = [
  // Quotidien
  {
    label: "Verre d’eau",
    icon: "🥛",
    contenance: "250 mL",
    millilitres: 250,
    theme: "neutral",
  },
  {
    label: "Petite bouteille",
    icon: "💧",
    contenance: "500 mL",
    millilitres: 500,
    theme: "neutral",
  },
  {
    label: "Grande bouteille",
    icon: "💧",
    contenance: "1,5 L",
    millilitres: 1500,
    theme: "neutral",
  },
  {
    label: "Flacon de gel",
    icon: "🧴",
    contenance: "250 mL",
    millilitres: 250,
    theme: "neutral",
  },
  {
    label: "Seau",
    icon: "🪣",
    contenance: "10 L",
    millilitres: 10000,
    theme: "neutral",
  },
  {
    label: "Arrosoir",
    icon: "🪴",
    contenance: "5 L",
    millilitres: 5000,
    theme: "neutral",
  },
  {
    label: "Bidon d’eau",
    icon: "🛢️",
    contenance: "5 L",
    millilitres: 5000,
    theme: "neutral",
  },

  // Cuisine
  {
    label: "Tasse",
    icon: "☕",
    contenance: "200 mL",
    millilitres: 200,
    theme: "cuisine",
  },
  {
    label: "Bol",
    icon: "🥣",
    contenance: "300 mL",
    millilitres: 300,
    theme: "cuisine",
  },
  {
    label: "Canette",
    icon: "🥤",
    contenance: "330 mL",
    millilitres: 330,
    theme: "cuisine",
  },
  {
    label: "Brique de jus",
    icon: "🧃",
    contenance: "1 L",
    millilitres: 1000,
    theme: "cuisine",
  },
  {
    label: "Bouteille de sirop",
    icon: "🍹",
    contenance: "750 mL",
    millilitres: 750,
    theme: "cuisine",
  },
  {
    label: "Doseur",
    icon: "🧪",
    contenance: "100 mL",
    millilitres: 100,
    theme: "cuisine",
  },

  // Sport
  {
    label: "Gourde",
    icon: "🥤",
    contenance: "500 mL",
    millilitres: 500,
    theme: "sport",
  },
  {
    label: "Grande gourde",
    icon: "🥤",
    contenance: "1 L",
    millilitres: 1000,
    theme: "sport",
  },

  // Réunion
  {
    label: "Jus de goyavier",
    icon: "🧃",
    contenance: "1 L",
    millilitres: 1000,
    theme: "reunion",
  },
  {
    label: "Bouteille de jus letchi",
    icon: "🍹",
    contenance: "1 L",
    millilitres: 1000,
    theme: "reunion",
  },
];

function getContenant(label: string): ContenanceObjet {
  const objet = CONTENANCE_OBJECTS.find((item) => item.label === label);

  if (!objet) {
    throw new Error(`Objet de contenance introuvable : ${label}`);
  }

  return objet;
}

function contenantsCanvas(
  objets: ContenanceCanvasObject[],
  questionLabel?: string
): ContenanceCanvasData {
  return contenanceCanvas({
    variant: "objets",
    objets,
    questionLabel,
    display: {
      showLabels: true,
      showContenances: true,
    },
  });
}

function comparaisonCanvas(
  gauche: ContenanceCanvasObject,
  droite: ContenanceCanvasObject,
  questionLabel?: string
): ContenanceCanvasData {
  return contenanceCanvas({
    variant: "comparaison",
    gauche,
    droite,
    questionLabel,
    display: {
      showLabels: true,
      showContenances: true,
      showComparison: true,
    },
  });
}

function conversionContenanceCanvas(
  from: string,
  to: string,
  questionLabel?: string
): ContenanceCanvasData {
  return contenanceCanvas({
    variant: "conversion",
    from,
    to,
    questionLabel,
  });
}

function estimationContenanceCanvas(
  objet: ContenanceCanvasObject,
  choix: string[],
  questionLabel?: string
): ContenanceCanvasData {
  return contenanceCanvas({
    variant: "estimation",
    objet,
    choix,
    questionLabel,
    display: {
      showLabels: true,
      showContenances: false,
    },
  });
}

function larger(a: ContenanceObjet, b: ContenanceObjet): ContenanceObjet {
  return a.millilitres >= b.millilitres ? a : b;
}

function smaller(a: ContenanceObjet, b: ContenanceObjet): ContenanceObjet {
  return a.millilitres <= b.millilitres ? a : b;
}

// ============================================================
// BANK
// ============================================================

export const contenancesBank: TutorBankItemV4[] = [
  // ============================================================
  // CONTENANCE_COMPARER
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_contenance_comparer_fixed_1_definition",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_comparer",
    difficulty: 1,
    theme: "neutral",
    text: "Comparer des contenances, c’est chercher...",
    format: "qcm",
    choices: [
      "quel contenant peut contenir le plus ou le moins de liquide",
      "quel objet est le plus lourd",
      "quel objet est le plus long",
      "quel objet est le plus rapide",
    ],
    expected: ["quel contenant peut contenir le plus ou le moins de liquide"],
    comparator: "mcq_exact",
    hint: "La contenance indique ce qu’un récipient peut contenir.",
    explanation:
      "Comparer des contenances, c’est comparer la quantité de liquide que des récipients peuvent contenir. On utilise souvent les litres et les millilitres.",
    tags: ["cm2", "contenance", "comparer", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_contenance_comparer_fixed_2_unite",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_comparer",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle unité peut servir à mesurer une contenance ?",
    format: "qcm",
    choices: ["le litre", "le gramme", "le mètre", "la minute"],
    expected: ["le litre"],
    comparator: "mcq_exact",
    hint: "On mesure une boisson ou un liquide en litres ou millilitres.",
    explanation:
      "Une contenance se mesure souvent en litres ou en millilitres. Le litre est donc une unité de contenance.",
    tags: ["cm2", "contenance", "unite", "litre", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_contenance_comparer_fixed_3_verre_bouteille",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_comparer",
    difficulty: 1,
    theme: "neutral",
    text: "Quel contenant a la plus grande contenance : le verre d’eau ou la petite bouteille ?",
    format: "qcm",
    choices: ["Petite bouteille", "Verre d’eau", "Même contenance", "Impossible"],
    expected: ["Petite bouteille"],
    comparator: "mcq_exact",
    hint: "Compare 250 mL et 500 mL.",
    explanation:
      "Le verre d’eau contient 250 mL et la petite bouteille contient 500 mL. Comme 500 mL > 250 mL, la petite bouteille a la plus grande contenance.",
    tags: ["cm2", "contenance", "comparer", "qcm", "canvas"],
    canvas: comparaisonCanvas(
      getContenant("Verre d’eau"),
      getContenant("Petite bouteille"),
      "Quel contenant a la plus grande contenance ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_contenance_comparer_fixed_4_tasse_bol",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_comparer",
    difficulty: 1,
    theme: "cuisine",
    text: "Quel contenant peut contenir le plus : la tasse ou le bol ?",
    format: "qcm",
    choices: ["Bol", "Tasse", "Même contenance", "Impossible"],
    expected: ["Bol"],
    comparator: "mcq_exact",
    hint: "Compare 200 mL et 300 mL.",
    explanation:
      "La tasse contient 200 mL et le bol contient 300 mL. Le bol peut donc contenir plus.",
    tags: ["cm2", "contenance", "comparer", "cuisine", "qcm", "canvas"],
    canvas: comparaisonCanvas(
      getContenant("Tasse"),
      getContenant("Bol"),
      "Quel contenant peut contenir le plus ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_contenance_comparer_fixed_5_gourde_bouteille",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_comparer",
    difficulty: 2,
    theme: "sport",
    text: "Une gourde contient 500 mL et une grande bouteille contient 1,5 L. Quel contenant a la plus grande contenance ?",
    format: "qcm",
    choices: ["Grande bouteille", "Gourde", "Même contenance", "Impossible"],
    expected: ["Grande bouteille"],
    comparator: "mcq_exact",
    hint: "1,5 L = 1500 mL.",
    explanation:
      "La gourde contient 500 mL. La grande bouteille contient 1,5 L, soit 1500 mL. La grande bouteille a donc la plus grande contenance.",
    tags: ["cm2", "contenance", "comparer", "sport", "conversion", "qcm", "canvas"],
    canvas: comparaisonCanvas(
      getContenant("Gourde"),
      getContenant("Grande bouteille"),
      "Quel contenant a la plus grande contenance ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_contenance_comparer_fixed_6_brique_jus_grande_gourde",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_comparer",
    difficulty: 2,
    theme: "cuisine",
    text: "Une brique de jus contient 1 L et une grande gourde contient 1 L. Que peut-on dire ?",
    format: "qcm",
    choices: [
      "Elles ont la même contenance",
      "La brique de jus contient plus",
      "La grande gourde contient plus",
      "On ne peut pas comparer",
    ],
    expected: ["Elles ont la même contenance"],
    comparator: "mcq_exact",
    hint: "Compare 1 L et 1 L.",
    explanation:
      "La brique de jus contient 1 L et la grande gourde contient aussi 1 L. Elles ont donc la même contenance.",
    tags: ["cm2", "contenance", "comparer", "meme_contenance", "qcm", "canvas"],
    canvas: comparaisonCanvas(
      getContenant("Brique de jus"),
      getContenant("Grande gourde"),
      "Que peut-on dire ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_contenance_comparer_fixed_7_seau_arrosoir",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel contenant a la plus grande contenance : le seau ou l’arrosoir ?",
    format: "qcm",
    choices: ["Seau", "Arrosoir", "Même contenance", "Impossible"],
    expected: ["Seau"],
    comparator: "mcq_exact",
    hint: "Compare 10 L et 5 L.",
    explanation:
      "Le seau contient 10 L et l’arrosoir contient 5 L. Comme 10 L > 5 L, le seau a la plus grande contenance.",
    tags: ["cm2", "contenance", "comparer", "litres", "qcm", "canvas"],
    canvas: comparaisonCanvas(
      getContenant("Seau"),
      getContenant("Arrosoir"),
      "Quel contenant a la plus grande contenance ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_contenance_comparer_fixed_8_canette_bouteille_sirop",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_comparer",
    difficulty: 2,
    theme: "cuisine",
    text: "Quel contenant a la plus petite contenance : la canette ou la bouteille de sirop ?",
    format: "qcm",
    choices: ["Canette", "Bouteille de sirop", "Même contenance", "Impossible"],
    expected: ["Canette"],
    comparator: "mcq_exact",
    hint: "Compare 330 mL et 750 mL.",
    explanation:
      "La canette contient 330 mL et la bouteille de sirop contient 750 mL. La canette a donc la plus petite contenance.",
    tags: ["cm2", "contenance", "comparer", "cuisine", "qcm", "canvas"],
    canvas: comparaisonCanvas(
      getContenant("Canette"),
      getContenant("Bouteille de sirop"),
      "Quel contenant a la plus petite contenance ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_contenance_comparer_fixed_9_1l_500ml",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle contenance est la plus grande : 1 L ou 500 mL ?",
    format: "qcm",
    choices: ["1 L", "500 mL", "Même contenance", "Impossible"],
    expected: ["1 L"],
    comparator: "mcq_exact",
    hint: "1 L = 1000 mL.",
    explanation:
      "1 L = 1000 mL. Comme 1000 mL > 500 mL, 1 L est plus grand que 500 mL.",
    tags: ["cm2", "contenance", "comparer", "conversion", "L", "mL", "qcm", "canvas"],
    canvas: conversionContenanceCanvas("1 L", "1000 mL", "Compare avec 500 mL."),
  },

  {
    kind: "fixed",
    id: "cm2_contenance_comparer_fixed_10_1500ml_1l",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle contenance est la plus grande : 1500 mL ou 1 L ?",
    format: "qcm",
    choices: ["1500 mL", "1 L", "Même contenance", "Impossible"],
    expected: ["1500 mL"],
    comparator: "mcq_exact",
    hint: "1 L = 1000 mL.",
    explanation:
      "1 L = 1000 mL. Comme 1500 mL > 1000 mL, 1500 mL est plus grand que 1 L.",
    tags: ["cm2", "contenance", "comparer", "conversion", "L", "mL", "qcm", "canvas"],
    canvas: conversionContenanceCanvas("1 L", "1000 mL", "Compare avec 1500 mL."),
  },

  {
    kind: "fixed",
    id: "cm2_contenance_comparer_fixed_11_1l_1000ml",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle affirmation est vraie ?",
    format: "qcm",
    choices: [
      "1 L = 1000 mL",
      "1 L = 100 mL",
      "1 L = 10 mL",
      "1 L = 1 mL",
    ],
    expected: ["1 L = 1000 mL"],
    comparator: "mcq_exact",
    hint: "La conversion de base est 1 L = 1000 mL.",
    explanation:
      "1 L = 1000 mL. Cette relation permet de convertir les litres en millilitres.",
    tags: ["cm2", "contenance", "comparer", "conversion", "qcm", "canvas"],
    canvas: conversionContenanceCanvas("1 L", "1000 mL"),
  },

  {
    kind: "fixed",
    id: "cm2_contenance_comparer_fixed_12_erreur_grand_objet",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : “Le contenant le plus haut contient toujours le plus.” A-t-il toujours raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "La forme du contenant peut être trompeuse.",
    explanation:
      "Non. Un contenant plus haut ne contient pas toujours plus. Pour comparer, il faut regarder la contenance en litres ou en millilitres.",
    tags: ["cm2", "contenance", "comparer", "erreur", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_contenance_comparer_fixed_13_erreur_unites",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : “500 mL est plus grand que 1 L car 500 est plus grand que 1.” A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Attention aux unités : 1 L = 1000 mL.",
    explanation:
      "Non. Il faut tenir compte des unités. 1 L = 1000 mL, donc 1 L est plus grand que 500 mL.",
    tags: ["cm2", "contenance", "comparer", "erreur", "unites", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_contenance_comparer_fixed_14_open_methode",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_comparer",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment comparer deux contenances quand les unités sont différentes.",
    format: "open",
    expected: ["convertir", "même unité", "litres", "millilitres", "comparer"],
    comparator: "contains_keyword",
    hint: "Il faut souvent mettre les deux contenances dans la même unité.",
    explanation:
      "Pour comparer deux contenances avec des unités différentes, on les met dans la même unité, par exemple en millilitres, puis on compare les nombres.",
    tags: ["cm2", "contenance", "comparer", "open", "methode", "conversion"],
  },

  {
    kind: "template",
    id: "cm2_contenance_comparer_tpl_1_plus_grande",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Compare les contenances en millilitres.",
    tags: ["cm2", "contenance", "comparer", "template", "plus_grande", "qcm", "canvas"],
    generate: () => {
      const pairs = [
        [getContenant("Verre d’eau"), getContenant("Petite bouteille")],
        [getContenant("Tasse"), getContenant("Bol")],
        [getContenant("Canette"), getContenant("Bouteille de sirop")],
        [getContenant("Gourde"), getContenant("Grande gourde")],
        [getContenant("Arrosoir"), getContenant("Seau")],
        [getContenant("Doseur"), getContenant("Tasse")],
      ] as const;

      const [a, b] = randomChoice(pairs);
      const correct = larger(a, b);

      return {
        text: `Quel contenant a la plus grande contenance : ${a.label} ou ${b.label} ?`,
        format: "qcm",
        choices: makeChoices(correct.label, [
          a.label === correct.label ? b.label : a.label,
          "Même contenance",
          "Impossible à savoir",
        ]),
        expected: [correct.label],
        comparator: "mcq_exact",
        explanation:
          `${a.label} contient ${a.contenance} et ${b.label} contient ${b.contenance}. Le contenant qui a la plus grande contenance est ${correct.label}.`,
        canvas: comparaisonCanvas(
          a,
          b,
          "Quel contenant a la plus grande contenance ?"
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_contenance_comparer_tpl_2_plus_petite",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Compare les contenances en millilitres.",
    tags: ["cm2", "contenance", "comparer", "template", "plus_petite", "qcm", "canvas"],
    generate: () => {
      const pairs = [
        [getContenant("Verre d’eau"), getContenant("Grande bouteille")],
        [getContenant("Tasse"), getContenant("Canette")],
        [getContenant("Doseur"), getContenant("Bol")],
        [getContenant("Brique de jus"), getContenant("Bouteille de sirop")],
        [getContenant("Petite bouteille"), getContenant("Seau")],
      ] as const;

      const [a, b] = randomChoice(pairs);
      const correct = smaller(a, b);

      return {
        text: `Quel contenant a la plus petite contenance : ${a.label} ou ${b.label} ?`,
        format: "qcm",
        choices: makeChoices(correct.label, [
          a.label === correct.label ? b.label : a.label,
          "Même contenance",
          "Impossible à savoir",
        ]),
        expected: [correct.label],
        comparator: "mcq_exact",
        explanation:
          `${a.label} contient ${a.contenance} et ${b.label} contient ${b.contenance}. Le contenant qui a la plus petite contenance est ${correct.label}.`,
        canvas: comparaisonCanvas(
          a,
          b,
          "Quel contenant a la plus petite contenance ?"
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_contenance_comparer_tpl_3_unites_differentes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Convertis les litres en millilitres.",
    tags: ["cm2", "contenance", "comparer", "template", "conversion", "qcm", "canvas"],
    generate: () => {
      const situations = [
        {
          a: "1 L",
          b: "750 mL",
          correct: "1 L",
          explanation:
            "1 L = 1000 mL. Comme 1000 mL > 750 mL, 1 L est plus grand.",
        },
        {
          a: "1,5 L",
          b: "1200 mL",
          correct: "1,5 L",
          explanation:
            "1,5 L = 1500 mL. Comme 1500 mL > 1200 mL, 1,5 L est plus grand.",
        },
        {
          a: "500 mL",
          b: "1 L",
          correct: "1 L",
          explanation:
            "1 L = 1000 mL. Comme 1000 mL > 500 mL, 1 L est plus grand.",
        },
        {
          a: "2 L",
          b: "1500 mL",
          correct: "2 L",
          explanation:
            "2 L = 2000 mL. Comme 2000 mL > 1500 mL, 2 L est plus grand.",
        },
      ];

      const item = randomChoice(situations);

      return {
        text: `Quelle contenance est la plus grande : ${item.a} ou ${item.b} ?`,
        format: "qcm",
        choices: makeChoices(item.correct, [
          item.correct === item.a ? item.b : item.a,
          "Même contenance",
          "Impossible",
        ]),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation: item.explanation,
        canvas: conversionContenanceCanvas(
          item.a,
          item.b,
          "Compare les deux contenances."
        ),
      };
    },
  },
    // ============================================================
  // CONTENANCE_CONVERTIR
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_contenance_convertir_fixed_1_relation_l_ml",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_convertir",
    difficulty: 1,
    theme: "neutral",
    text: "Combien de millilitres y a-t-il dans 1 L ?",
    format: "short",
    expected: ["1000"],
    comparator: "number_equal",
    hint: "C’est la conversion de base à connaître.",
    explanation:
      "1 L = 1000 mL. C’est la relation de base pour convertir des litres en millilitres.",
    tags: ["cm2", "contenance", "convertir", "L", "mL", "short", "canvas"],
    canvas: conversionContenanceCanvas("1 L", "1000 mL"),
  },

  {
    kind: "fixed",
    id: "cm2_contenance_convertir_fixed_2_2l",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_convertir",
    difficulty: 1,
    theme: "neutral",
    text: "2 L = combien de millilitres ?",
    format: "short",
    expected: ["2000"],
    comparator: "number_equal",
    hint: "1 L = 1000 mL, donc 2 L = 2 × 1000 mL.",
    explanation:
      "1 L = 1000 mL. Donc 2 L = 2 × 1000 mL = 2000 mL.",
    tags: ["cm2", "contenance", "convertir", "L", "mL", "short", "canvas"],
    canvas: conversionContenanceCanvas("2 L", "2000 mL"),
  },

  {
    kind: "fixed",
    id: "cm2_contenance_convertir_fixed_3_3l",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_convertir",
    difficulty: 1,
    theme: "neutral",
    text: "3 L = combien de millilitres ?",
    format: "short",
    expected: ["3000"],
    comparator: "number_equal",
    hint: "Multiplie le nombre de litres par 1000.",
    explanation:
      "1 L = 1000 mL. Donc 3 L = 3 × 1000 mL = 3000 mL.",
    tags: ["cm2", "contenance", "convertir", "L", "mL", "short", "canvas"],
    canvas: conversionContenanceCanvas("3 L", "3000 mL"),
  },

  {
    kind: "fixed",
    id: "cm2_contenance_convertir_fixed_4_500ml",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "500 mL = combien de litre ?",
    format: "qcm",
    choices: ["0,5 L", "5 L", "50 L", "500 L"],
    expected: ["0,5 L"],
    comparator: "mcq_exact",
    hint: "500 mL est la moitié de 1000 mL.",
    explanation:
      "1000 mL = 1 L. Donc 500 mL correspond à la moitié d’un litre : 0,5 L.",
    tags: ["cm2", "contenance", "convertir", "mL", "L", "qcm", "canvas"],
    canvas: conversionContenanceCanvas("500 mL", "0,5 L"),
  },

  {
    kind: "fixed",
    id: "cm2_contenance_convertir_fixed_5_1500ml",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "1500 mL = combien de litres ?",
    format: "qcm",
    choices: ["1,5 L", "15 L", "150 L", "0,15 L"],
    expected: ["1,5 L"],
    comparator: "mcq_exact",
    hint: "1500 mL = 1000 mL + 500 mL.",
    explanation:
      "1000 mL = 1 L et 500 mL = 0,5 L. Donc 1500 mL = 1,5 L.",
    tags: ["cm2", "contenance", "convertir", "mL", "L", "decimal", "qcm", "canvas"],
    canvas: conversionContenanceCanvas("1500 mL", "1,5 L"),
  },

  {
    kind: "fixed",
    id: "cm2_contenance_convertir_fixed_6_1_5l",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "1,5 L = combien de millilitres ?",
    format: "short",
    expected: ["1500"],
    comparator: "number_equal",
    hint: "1,5 L = 1 L + 0,5 L.",
    explanation:
      "1 L = 1000 mL et 0,5 L = 500 mL. Donc 1,5 L = 1500 mL.",
    tags: ["cm2", "contenance", "convertir", "L", "mL", "decimal", "short", "canvas"],
    canvas: conversionContenanceCanvas("1,5 L", "1500 mL"),
  },

  {
    kind: "fixed",
    id: "cm2_contenance_convertir_fixed_7_0_5l",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "0,5 L = combien de millilitres ?",
    format: "short",
    expected: ["500"],
    comparator: "number_equal",
    hint: "0,5 L est la moitié de 1 L.",
    explanation:
      "1 L = 1000 mL. La moitié de 1000 mL est 500 mL. Donc 0,5 L = 500 mL.",
    tags: ["cm2", "contenance", "convertir", "L", "mL", "decimal", "short", "canvas"],
    canvas: conversionContenanceCanvas("0,5 L", "500 mL"),
  },

  {
    kind: "fixed",
    id: "cm2_contenance_convertir_fixed_8_2500ml",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_convertir",
    difficulty: 3,
    theme: "neutral",
    text: "2500 mL = combien de litres ?",
    format: "qcm",
    choices: ["2,5 L", "25 L", "250 L", "0,25 L"],
    expected: ["2,5 L"],
    comparator: "mcq_exact",
    hint: "2500 mL = 2000 mL + 500 mL.",
    explanation:
      "2000 mL = 2 L et 500 mL = 0,5 L. Donc 2500 mL = 2,5 L.",
    tags: ["cm2", "contenance", "convertir", "mL", "L", "decimal", "qcm", "canvas"],
    canvas: conversionContenanceCanvas("2500 mL", "2,5 L"),
  },

  {
    kind: "fixed",
    id: "cm2_contenance_convertir_fixed_9_2_5l",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_convertir",
    difficulty: 3,
    theme: "neutral",
    text: "2,5 L = combien de millilitres ?",
    format: "short",
    expected: ["2500"],
    comparator: "number_equal",
    hint: "2,5 L = 2 L + 0,5 L.",
    explanation:
      "2 L = 2000 mL et 0,5 L = 500 mL. Donc 2,5 L = 2500 mL.",
    tags: ["cm2", "contenance", "convertir", "L", "mL", "decimal", "short", "canvas"],
    canvas: conversionContenanceCanvas("2,5 L", "2500 mL"),
  },

  {
    kind: "fixed",
    id: "cm2_contenance_convertir_fixed_10_brique_jus",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_convertir",
    difficulty: 2,
    theme: "cuisine",
    text: "Une brique de jus contient 1 L. Quelle est sa contenance en millilitres ?",
    format: "short",
    expected: ["1000"],
    comparator: "number_equal",
    hint: "1 L = 1000 mL.",
    explanation:
      "Une brique de jus de 1 L contient 1000 mL.",
    tags: ["cm2", "contenance", "convertir", "cuisine", "jus", "short", "canvas"],
    canvas: contenantsCanvas(
      [getContenant("Brique de jus")],
      "Quelle est sa contenance en mL ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_contenance_convertir_fixed_11_grande_bouteille",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_convertir",
    difficulty: 3,
    theme: "neutral",
    text: "Une grande bouteille contient 1,5 L. Quelle est sa contenance en millilitres ?",
    format: "short",
    expected: ["1500"],
    comparator: "number_equal",
    hint: "1,5 L = 1500 mL.",
    explanation:
      "1,5 L = 1500 mL. La grande bouteille contient donc 1500 mL.",
    tags: ["cm2", "contenance", "convertir", "bouteille", "short", "canvas"],
    canvas: contenantsCanvas(
      [getContenant("Grande bouteille")],
      "Convertis 1,5 L en millilitres."
    ),
  },

  {
    kind: "fixed",
    id: "cm2_contenance_convertir_fixed_12_arrosoir",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_convertir",
    difficulty: 3,
    theme: "neutral",
    text: "Un arrosoir contient 5 L. Quelle est sa contenance en millilitres ?",
    format: "short",
    expected: ["5000"],
    comparator: "number_equal",
    hint: "1 L = 1000 mL.",
    explanation:
      "1 L = 1000 mL. Donc 5 L = 5 × 1000 mL = 5000 mL.",
    tags: ["cm2", "contenance", "convertir", "arrosoir", "short", "canvas"],
    canvas: contenantsCanvas(
      [getContenant("Arrosoir")],
      "Convertis 5 L en millilitres."
    ),
  },

  {
    kind: "fixed",
    id: "cm2_contenance_convertir_fixed_13_erreur_multiplier",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_convertir",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : “2 L = 200 mL.” A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "1 L = 1000 mL.",
    explanation:
      "Non. 1 L = 1000 mL, donc 2 L = 2000 mL. L’élève a oublié un zéro.",
    tags: ["cm2", "contenance", "convertir", "erreur", "L", "mL", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_contenance_convertir_fixed_14_erreur_diviser",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_convertir",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : “500 mL = 5 L.” A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "500 mL est inférieur à 1 L.",
    explanation:
      "Non. 500 mL est la moitié de 1000 mL, donc 500 mL = 0,5 L.",
    tags: ["cm2", "contenance", "convertir", "erreur", "mL", "L", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_contenance_convertir_fixed_15_open_methode_l_ml",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_convertir",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment convertir des litres en millilitres.",
    format: "open",
    expected: ["multiplier", "1000", "L", "mL", "millilitres"],
    comparator: "contains_keyword",
    hint: "1 L = 1000 mL.",
    explanation:
      "Pour convertir des litres en millilitres, on multiplie le nombre de litres par 1000, car 1 L = 1000 mL.",
    tags: ["cm2", "contenance", "convertir", "open", "methode", "L", "mL"],
  },

  {
    kind: "fixed",
    id: "cm2_contenance_convertir_fixed_16_open_methode_ml_l",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_convertir",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment convertir des millilitres en litres.",
    format: "open",
    expected: ["diviser", "1000", "mL", "L", "litres"],
    comparator: "contains_keyword",
    hint: "1000 mL = 1 L.",
    explanation:
      "Pour convertir des millilitres en litres, on divise le nombre de millilitres par 1000, car 1000 mL = 1 L.",
    tags: ["cm2", "contenance", "convertir", "open", "methode", "mL", "L"],
  },

  {
    kind: "template",
    id: "cm2_contenance_convertir_tpl_1_l_vers_ml",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_convertir",
    difficulty: 2,
    theme: "neutral",
    hint: "Pour passer des L aux mL, multiplie par 1000.",
    tags: ["cm2", "contenance", "convertir", "template", "L", "mL", "short", "canvas"],
    generate: () => {
      const litres = randomChoice([1, 2, 3, 4, 5]);
      const millilitres = litres * 1000;

      return {
        text: `${litres} L = combien de millilitres ?`,
        format: "short",
        expected: [String(millilitres)],
        comparator: "number_equal",
        explanation:
          `1 L = 1000 mL. Donc ${litres} L = ${litres} × 1000 mL = ${millilitres} mL.`,
        canvas: conversionContenanceCanvas(`${litres} L`, `${millilitres} mL`),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_contenance_convertir_tpl_2_ml_vers_l_entier",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_convertir",
    difficulty: 2,
    theme: "neutral",
    hint: "Pour passer des mL aux L, divise par 1000.",
    tags: ["cm2", "contenance", "convertir", "template", "mL", "L", "qcm", "canvas"],
    generate: () => {
      const litres = randomChoice([1, 2, 3, 4, 5]);
      const millilitres = litres * 1000;

      return {
        text: `${millilitres} mL = combien de litres ?`,
        format: "qcm",
        choices: makeChoices(`${litres} L`, [
          `${litres * 10} L`,
          `${litres / 10} L`,
          `${millilitres} L`,
        ]),
        expected: [`${litres} L`],
        comparator: "mcq_exact",
        explanation:
          `${millilitres} mL = ${litres} × 1000 mL. Donc ${millilitres} mL = ${litres} L.`,
        canvas: conversionContenanceCanvas(`${millilitres} mL`, `${litres} L`),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_contenance_convertir_tpl_3_demi_litre",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_convertir",
    difficulty: 3,
    theme: "neutral",
    hint: "0,5 L = 500 mL.",
    tags: ["cm2", "contenance", "convertir", "template", "decimal", "qcm", "canvas"],
    generate: () => {
      const situations = [
        {
          from: "0,5 L",
          to: "500 mL",
          text: "0,5 L = combien de millilitres ?",
          expected: "500",
          choices: ["500", "50", "5000", "5"],
          explanation:
            "0,5 L est la moitié de 1 L. Comme 1 L = 1000 mL, alors 0,5 L = 500 mL.",
        },
        {
          from: "1,5 L",
          to: "1500 mL",
          text: "1,5 L = combien de millilitres ?",
          expected: "1500",
          choices: ["1500", "150", "15", "15000"],
          explanation:
            "1,5 L = 1 L + 0,5 L = 1000 mL + 500 mL = 1500 mL.",
        },
        {
          from: "2,5 L",
          to: "2500 mL",
          text: "2,5 L = combien de millilitres ?",
          expected: "2500",
          choices: ["2500", "250", "25", "25000"],
          explanation:
            "2,5 L = 2 L + 0,5 L = 2000 mL + 500 mL = 2500 mL.",
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
        canvas: conversionContenanceCanvas(item.from, item.to),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_contenance_convertir_tpl_4_objets",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_convertir",
    difficulty: 3,
    theme: "cuisine",
    hint: "Utilise 1 L = 1000 mL.",
    tags: ["cm2", "contenance", "convertir", "template", "objets", "short", "canvas"],
    generate: () => {
      const item = randomChoice([
        getContenant("Brique de jus"),
        getContenant("Grande bouteille"),
        getContenant("Grande gourde"),
        getContenant("Arrosoir"),
        getContenant("Seau"),
        getContenant("Jus de goyavier"),
      ]);

      return {
        text: `${item.label} contient ${item.contenance}. Quelle est sa contenance en millilitres ?`,
        format: "short",
        expected: [String(item.millilitres)],
        comparator: "number_equal",
        explanation:
          `${item.label} contient ${item.contenance}, ce qui correspond à ${item.millilitres} mL.`,
        canvas: contenantsCanvas(
          [item],
          "Quelle est sa contenance en millilitres ?"
        ),
      };
    },
  },
    // ============================================================
  // CONTENANCE_ESTIMER
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_contenance_estimer_fixed_1_definition",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_estimer",
    difficulty: 1,
    theme: "neutral",
    text: "Estimer une contenance, c’est...",
    format: "qcm",
    choices: [
      "choisir une quantité de liquide raisonnable",
      "peser exactement un objet",
      "mesurer une distance",
      "calculer une heure",
    ],
    expected: ["choisir une quantité de liquide raisonnable"],
    comparator: "mcq_exact",
    hint: "Une contenance indique ce qu’un récipient peut contenir.",
    explanation:
      "Estimer une contenance, c’est choisir une quantité de liquide raisonnable pour un récipient. On utilise souvent les millilitres ou les litres.",
    tags: ["cm2", "contenance", "estimer", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_contenance_estimer_fixed_2_verre",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_estimer",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle contenance semble la plus raisonnable pour un verre d’eau ?",
    format: "qcm",
    choices: ["250 mL", "25 L", "250 L", "2 mL"],
    expected: ["250 mL"],
    comparator: "mcq_exact",
    hint: "Un verre contient moins qu’une bouteille.",
    explanation:
      "Un verre d’eau contient souvent environ 200 mL à 250 mL. 250 mL est donc une contenance raisonnable.",
    tags: ["cm2", "contenance", "estimer", "verre", "qcm", "canvas"],
    canvas: estimationContenanceCanvas(
      getContenant("Verre d’eau"),
      ["250 mL", "25 L", "250 L"],
      "Quelle contenance semble raisonnable ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_contenance_estimer_fixed_3_tasse",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_estimer",
    difficulty: 1,
    theme: "cuisine",
    text: "Quelle contenance semble la plus raisonnable pour une tasse ?",
    format: "qcm",
    choices: ["200 mL", "20 L", "200 L", "2 mL"],
    expected: ["200 mL"],
    comparator: "mcq_exact",
    hint: "Une tasse contient une petite quantité de liquide.",
    explanation:
      "Une tasse contient souvent autour de 200 mL. 200 mL est une estimation raisonnable.",
    tags: ["cm2", "contenance", "estimer", "tasse", "cuisine", "qcm", "canvas"],
    canvas: estimationContenanceCanvas(
      getContenant("Tasse"),
      ["200 mL", "20 L", "200 L"],
      "Quelle contenance semble raisonnable ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_contenance_estimer_fixed_4_bouteille",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_estimer",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle contenance semble la plus raisonnable pour une petite bouteille d’eau ?",
    format: "qcm",
    choices: ["500 mL", "50 L", "500 L", "5 mL"],
    expected: ["500 mL"],
    comparator: "mcq_exact",
    hint: "Une petite bouteille contient environ un demi-litre.",
    explanation:
      "Une petite bouteille d’eau contient souvent 500 mL, c’est-à-dire 0,5 L.",
    tags: ["cm2", "contenance", "estimer", "bouteille", "qcm", "canvas"],
    canvas: estimationContenanceCanvas(
      getContenant("Petite bouteille"),
      ["500 mL", "50 L", "5 mL"],
      "Quelle contenance semble raisonnable ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_contenance_estimer_fixed_5_grande_bouteille",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_estimer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle contenance semble la plus raisonnable pour une grande bouteille d’eau ?",
    format: "qcm",
    choices: ["1,5 L", "15 mL", "150 L", "1500 L"],
    expected: ["1,5 L"],
    comparator: "mcq_exact",
    hint: "Une grande bouteille contient plus qu’un verre, mais pas des centaines de litres.",
    explanation:
      "Une grande bouteille d’eau contient souvent 1,5 L. C’est une contenance raisonnable.",
    tags: ["cm2", "contenance", "estimer", "grande_bouteille", "qcm", "canvas"],
    canvas: estimationContenanceCanvas(
      getContenant("Grande bouteille"),
      ["1,5 L", "15 mL", "150 L"],
      "Quelle contenance semble raisonnable ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_contenance_estimer_fixed_6_brique_jus",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_estimer",
    difficulty: 2,
    theme: "cuisine",
    text: "Quelle contenance semble la plus raisonnable pour une brique de jus ?",
    format: "qcm",
    choices: ["1 L", "1 mL", "100 L", "1000 L"],
    expected: ["1 L"],
    comparator: "mcq_exact",
    hint: "Une brique de jus familiale contient souvent un litre.",
    explanation:
      "Une brique de jus contient souvent 1 L, soit 1000 mL. C’est raisonnable.",
    tags: ["cm2", "contenance", "estimer", "jus", "cuisine", "qcm", "canvas"],
    canvas: estimationContenanceCanvas(
      getContenant("Brique de jus"),
      ["1 L", "1 mL", "100 L"],
      "Quelle contenance semble raisonnable ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_contenance_estimer_fixed_7_seau",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_estimer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle contenance semble la plus raisonnable pour un seau ?",
    format: "qcm",
    choices: ["10 L", "10 mL", "1000 L", "0,01 L"],
    expected: ["10 L"],
    comparator: "mcq_exact",
    hint: "Un seau contient plusieurs litres.",
    explanation:
      "Un seau peut contenir plusieurs litres d’eau. 10 L est une estimation raisonnable.",
    tags: ["cm2", "contenance", "estimer", "seau", "qcm", "canvas"],
    canvas: estimationContenanceCanvas(
      getContenant("Seau"),
      ["10 L", "10 mL", "1000 L"],
      "Quelle contenance semble raisonnable ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_contenance_estimer_fixed_8_gourde",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_estimer",
    difficulty: 2,
    theme: "sport",
    text: "Quelle contenance semble la plus raisonnable pour une gourde d’élève ?",
    format: "qcm",
    choices: ["500 mL", "500 L", "5 mL", "50 L"],
    expected: ["500 mL"],
    comparator: "mcq_exact",
    hint: "Une gourde se transporte facilement dans un sac.",
    explanation:
      "Une gourde d’élève contient souvent environ 500 mL. C’est une estimation raisonnable.",
    tags: ["cm2", "contenance", "estimer", "sport", "gourde", "qcm", "canvas"],
    canvas: estimationContenanceCanvas(
      getContenant("Gourde"),
      ["500 mL", "500 L", "5 mL"],
      "Quelle contenance semble raisonnable ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_contenance_estimer_fixed_9_erreur_trop_grand",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_estimer",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève estime qu’une tasse contient 20 L. Est-ce raisonnable ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "20 L, c’est beaucoup plus qu’une bouteille ou même qu’un petit seau.",
    explanation:
      "Non. Une tasse contient une petite quantité de liquide, souvent autour de 200 mL. 20 L est beaucoup trop grand.",
    tags: ["cm2", "contenance", "estimer", "erreur", "tasse", "qcm", "canvas"],
    canvas: estimationContenanceCanvas(
      getContenant("Tasse"),
      ["200 mL", "20 L", "200 L"],
      "20 L est-il raisonnable ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_contenance_estimer_fixed_10_erreur_trop_petit",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_estimer",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève estime qu’un seau contient 10 mL. Est-ce raisonnable ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "10 mL, c’est une très petite quantité de liquide.",
    explanation:
      "Non. Un seau contient plusieurs litres. 10 mL est beaucoup trop petit pour un seau.",
    tags: ["cm2", "contenance", "estimer", "erreur", "seau", "qcm", "canvas"],
    canvas: estimationContenanceCanvas(
      getContenant("Seau"),
      ["10 L", "10 mL", "1000 L"],
      "10 mL est-il raisonnable ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_contenance_estimer_fixed_11_unite_ml",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_estimer",
    difficulty: 3,
    theme: "neutral",
    text: "Pour estimer la contenance d’un verre, quelle unité est la plus adaptée ?",
    format: "qcm",
    choices: ["millilitre", "kilogramme", "kilomètre", "tonne"],
    expected: ["millilitre"],
    comparator: "mcq_exact",
    hint: "Un verre contient une petite quantité de liquide.",
    explanation:
      "Pour un verre, le millilitre est une unité adaptée. On peut dire par exemple 250 mL.",
    tags: ["cm2", "contenance", "estimer", "unite", "mL", "qcm", "canvas"],
    canvas: estimationContenanceCanvas(
      getContenant("Verre d’eau"),
      ["250 mL", "250 kg", "250 km"],
      "Quelle unité est la plus adaptée ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_contenance_estimer_fixed_12_unite_l",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_estimer",
    difficulty: 3,
    theme: "neutral",
    text: "Pour estimer la contenance d’un seau, quelle unité est la plus adaptée ?",
    format: "qcm",
    choices: ["litre", "gramme", "mètre", "minute"],
    expected: ["litre"],
    comparator: "mcq_exact",
    hint: "Un seau contient plusieurs litres.",
    explanation:
      "Pour un seau, le litre est une unité adaptée, car un seau contient plusieurs litres de liquide.",
    tags: ["cm2", "contenance", "estimer", "unite", "L", "qcm", "canvas"],
    canvas: estimationContenanceCanvas(
      getContenant("Seau"),
      ["10 L", "10 g", "10 m"],
      "Quelle unité est la plus adaptée ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_contenance_estimer_fixed_13_open_methode",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_estimer",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment choisir une contenance raisonnable pour un récipient.",
    format: "open",
    expected: ["récipient", "liquide", "millilitres", "litres", "raisonnable"],
    comparator: "contains_keyword",
    hint: "Compare avec des contenants que tu connais.",
    explanation:
      "Pour choisir une contenance raisonnable, on compare le récipient avec des contenants connus. Un verre se mesure plutôt en millilitres, alors qu’un seau se mesure plutôt en litres.",
    tags: ["cm2", "contenance", "estimer", "open", "methode"],
  },

  {
    kind: "fixed",
    id: "cm2_contenance_estimer_fixed_14_open_erreur",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_estimer",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi 100 L n’est pas une contenance raisonnable pour un verre.",
    format: "open",
    expected: ["verre", "100 L", "trop grand", "millilitres", "raisonnable"],
    comparator: "contains_keyword",
    hint: "Un verre tient dans la main.",
    explanation:
      "Un verre est un petit récipient. Il contient plutôt quelques centaines de millilitres. 100 L est beaucoup trop grand pour un verre.",
    tags: ["cm2", "contenance", "estimer", "open", "erreur", "verre"],
  },

  {
    kind: "template",
    id: "cm2_contenance_estimer_tpl_1_objets_quotidiens",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_estimer",
    difficulty: 2,
    theme: "neutral",
    hint: "Choisis la contenance la plus vraisemblable.",
    tags: ["cm2", "contenance", "estimer", "template", "quotidien", "qcm", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          objet: getContenant("Verre d’eau"),
          choices: ["250 mL", "25 L", "250 L"],
          expected: "250 mL",
          explanation:
            "Un verre d’eau contient souvent environ 250 mL.",
        },
        {
          objet: getContenant("Petite bouteille"),
          choices: ["500 mL", "50 L", "500 L"],
          expected: "500 mL",
          explanation:
            "Une petite bouteille contient souvent 500 mL.",
        },
        {
          objet: getContenant("Grande bouteille"),
          choices: ["1,5 L", "15 mL", "150 L"],
          expected: "1,5 L",
          explanation:
            "Une grande bouteille contient souvent 1,5 L.",
        },
        {
          objet: getContenant("Seau"),
          choices: ["10 L", "10 mL", "1000 L"],
          expected: "10 L",
          explanation:
            "Un seau contient plusieurs litres. 10 L est raisonnable.",
        },
      ]);

      return {
        text: `Quelle contenance semble raisonnable pour : ${item.objet.label} ?`,
        format: "qcm",
        choices: shuffle(item.choices),
        expected: [item.expected],
        comparator: "mcq_exact",
        explanation: item.explanation,
        canvas: estimationContenanceCanvas(
          item.objet,
          item.choices,
          "Quelle contenance semble raisonnable ?"
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_contenance_estimer_tpl_2_cuisine",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_estimer",
    difficulty: 2,
    theme: "cuisine",
    hint: "Utilise ton expérience des contenants de cuisine.",
    tags: ["cm2", "contenance", "estimer", "template", "cuisine", "qcm", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          objet: getContenant("Tasse"),
          choices: ["200 mL", "20 L", "200 L"],
          expected: "200 mL",
          explanation:
            "Une tasse contient souvent environ 200 mL.",
        },
        {
          objet: getContenant("Bol"),
          choices: ["300 mL", "30 L", "300 L"],
          expected: "300 mL",
          explanation:
            "Un bol contient souvent environ 300 mL.",
        },
        {
          objet: getContenant("Brique de jus"),
          choices: ["1 L", "1 mL", "100 L"],
          expected: "1 L",
          explanation:
            "Une brique de jus contient souvent 1 L.",
        },
        {
          objet: getContenant("Canette"),
          choices: ["330 mL", "33 L", "330 L"],
          expected: "330 mL",
          explanation:
            "Une canette contient souvent environ 330 mL.",
        },
      ]);

      return {
        text: `Quelle contenance semble raisonnable pour : ${item.objet.label} ?`,
        format: "qcm",
        choices: shuffle(item.choices),
        expected: [item.expected],
        comparator: "mcq_exact",
        explanation: item.explanation,
        canvas: estimationContenanceCanvas(
          item.objet,
          item.choices,
          "Quelle contenance semble raisonnable ?"
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_contenance_estimer_tpl_3_themes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_estimer",
    difficulty: 3,
    theme: "neutral",
    hint: "Élimine les contenances beaucoup trop petites ou beaucoup trop grandes.",
    tags: ["cm2", "contenance", "estimer", "template", "themes", "qcm", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          objet: getContenant("Gourde"),
          choices: ["500 mL", "500 L", "5 mL"],
          expected: "500 mL",
          explanation:
            "Une gourde d’élève contient souvent environ 500 mL.",
        },
        {
          objet: getContenant("Grande gourde"),
          choices: ["1 L", "1 mL", "100 L"],
          expected: "1 L",
          explanation:
            "Une grande gourde peut contenir 1 L.",
        },
        {
          objet: getContenant("Jus de goyavier"),
          choices: ["1 L", "10 mL", "100 L"],
          expected: "1 L",
          explanation:
            "Une bouteille ou brique de jus peut contenir 1 L.",
        },
        {
          objet: getContenant("Arrosoir"),
          choices: ["5 L", "5 mL", "500 L"],
          expected: "5 L",
          explanation:
            "Un arrosoir contient plusieurs litres. 5 L est raisonnable.",
        },
      ]);

      return {
        text: `Quelle contenance semble raisonnable pour : ${item.objet.label} ?`,
        format: "qcm",
        choices: shuffle(item.choices),
        expected: [item.expected],
        comparator: "mcq_exact",
        explanation: item.explanation,
        canvas: estimationContenanceCanvas(
          item.objet,
          item.choices,
          "Quelle contenance semble raisonnable ?"
        ),
      };
    },
  },
    // ============================================================
  // CONTENANCE_DEFI
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_contenance_defi_fixed_1_total_verres",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_defi",
    difficulty: 4,
    theme: "neutral",
    text: "On remplit 4 verres de 250 mL. Quelle quantité d’eau utilise-t-on au total en millilitres ?",
    format: "short",
    expected: ["1000"],
    comparator: "number_equal",
    hint: "Calcule 4 × 250 mL.",
    explanation:
      "Un verre contient 250 mL. Pour 4 verres, on calcule 4 × 250 mL = 1000 mL.",
    tags: ["cm2", "contenance", "defi", "multiplication", "verres", "short", "canvas"],
    canvas: contenantsCanvas(
      [
        getContenant("Verre d’eau"),
        getContenant("Verre d’eau"),
        getContenant("Verre d’eau"),
        getContenant("Verre d’eau"),
      ],
      "Quantité totale ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_contenance_defi_fixed_2_total_litres",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_defi",
    difficulty: 4,
    theme: "cuisine",
    text: "Une brique de jus contient 1 L et une bouteille de sirop contient 750 mL. Quelle est la contenance totale en millilitres ?",
    format: "short",
    expected: ["1750"],
    comparator: "number_equal",
    hint: "Convertis d’abord 1 L en millilitres.",
    explanation:
      "1 L = 1000 mL. On ajoute 750 mL : 1000 mL + 750 mL = 1750 mL.",
    tags: ["cm2", "contenance", "defi", "addition", "conversion", "cuisine", "short", "canvas"],
    canvas: contenantsCanvas(
      [getContenant("Brique de jus"), getContenant("Bouteille de sirop")],
      "Contenance totale en mL ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_contenance_defi_fixed_3_gourdes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_defi",
    difficulty: 4,
    theme: "sport",
    text: "Une gourde contient 500 mL. Combien de millilitres contiennent 3 gourdes identiques ?",
    format: "short",
    expected: ["1500"],
    comparator: "number_equal",
    hint: "Calcule 3 × 500 mL.",
    explanation:
      "Une gourde contient 500 mL. Donc 3 gourdes contiennent 3 × 500 mL = 1500 mL.",
    tags: ["cm2", "contenance", "defi", "sport", "multiplication", "short", "canvas"],
    canvas: contenantsCanvas(
      [getContenant("Gourde"), getContenant("Gourde"), getContenant("Gourde")],
      "Contenance totale ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_contenance_defi_fixed_4_seau_verres",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un seau contient 10 L. Combien cela fait-il en millilitres ?",
    format: "short",
    expected: ["10000"],
    comparator: "number_equal",
    hint: "1 L = 1000 mL.",
    explanation:
      "1 L = 1000 mL. Donc 10 L = 10 × 1000 mL = 10000 mL.",
    tags: ["cm2", "contenance", "defi", "conversion", "seau", "short", "canvas"],
    canvas: conversionContenanceCanvas("10 L", "10000 mL"),
  },

  {
    kind: "fixed",
    id: "cm2_contenance_defi_fixed_5_difference_bouteille_gourde",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_defi",
    difficulty: 4,
    theme: "sport",
    text: "Une grande bouteille contient 1,5 L et une gourde contient 500 mL. Quelle est la différence en millilitres ?",
    format: "short",
    expected: ["1000"],
    comparator: "number_equal",
    hint: "1,5 L = 1500 mL.",
    explanation:
      "1,5 L = 1500 mL. La gourde contient 500 mL. La différence est 1500 mL - 500 mL = 1000 mL.",
    tags: ["cm2", "contenance", "defi", "difference", "conversion", "sport", "short", "canvas"],
    canvas: comparaisonCanvas(
      getContenant("Grande bouteille"),
      getContenant("Gourde"),
      "Différence en mL ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_contenance_defi_fixed_6_difference_seau_arrosoir",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un seau contient 10 L et un arrosoir contient 5 L. Quelle est la différence en litres ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Calcule 10 L - 5 L.",
    explanation:
      "Le seau contient 10 L et l’arrosoir contient 5 L. La différence est 10 L - 5 L = 5 L.",
    tags: ["cm2", "contenance", "defi", "difference", "litres", "short", "canvas"],
    canvas: comparaisonCanvas(
      getContenant("Seau"),
      getContenant("Arrosoir"),
      "Différence en litres ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_contenance_defi_fixed_7_trouver_manquant",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Une bouteille contient 1,5 L. On verse 500 mL dans une gourde. Combien de millilitres reste-t-il ?",
    format: "short",
    expected: ["1000"],
    comparator: "number_equal",
    hint: "Convertis 1,5 L en millilitres puis soustrais 500 mL.",
    explanation:
      "1,5 L = 1500 mL. On verse 500 mL. Il reste donc 1500 mL - 500 mL = 1000 mL.",
    tags: ["cm2", "contenance", "defi", "reste", "soustraction", "conversion", "short", "canvas"],
    canvas: contenantsCanvas(
      [getContenant("Grande bouteille"), getContenant("Gourde")],
      "Combien reste-t-il ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_contenance_defi_fixed_8_remplir_bouteille",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Une petite bouteille contient 500 mL. Combien de petites bouteilles faut-il pour obtenir 2 L ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "2 L = 2000 mL. Cherche combien de fois 500 mL dans 2000 mL.",
    explanation:
      "2 L = 2000 mL. Une petite bouteille contient 500 mL. On calcule 2000 ÷ 500 = 4. Il faut donc 4 petites bouteilles.",
    tags: ["cm2", "contenance", "defi", "division", "conversion", "short", "canvas"],
    canvas: contenantsCanvas(
      [getContenant("Petite bouteille"), getContenant("Petite bouteille")],
      "Combien pour obtenir 2 L ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_contenance_defi_fixed_9_verres_dans_1l",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un verre contient 250 mL. Combien de verres peut-on remplir avec 1 L d’eau ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "1 L = 1000 mL. Cherche combien de fois 250 mL dans 1000 mL.",
    explanation:
      "1 L = 1000 mL. Un verre contient 250 mL. Comme 1000 ÷ 250 = 4, on peut remplir 4 verres.",
    tags: ["cm2", "contenance", "defi", "division", "verres", "short", "canvas"],
    canvas: contenantsCanvas(
      [getContenant("Verre d’eau"), getContenant("Brique de jus")],
      "Combien de verres avec 1 L ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_contenance_defi_fixed_10_reunion_jus",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Pour un goûter, on a 1 L de jus de goyavier et 1 L de jus letchi. Quelle est la quantité totale en litres ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Additionne 1 L + 1 L.",
    explanation:
      "On additionne les deux contenances : 1 L + 1 L = 2 L.",
    tags: ["cm2", "contenance", "defi", "reunion", "addition", "short", "canvas"],
    canvas: contenantsCanvas(
      [getContenant("Jus de goyavier"), getContenant("Bouteille de jus letchi")],
      "Quantité totale en litres ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_contenance_defi_fixed_11_reunion_verres",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_defi",
    difficulty: 5,
    theme: "reunion",
    text: "On sert du jus de goyavier dans des verres de 250 mL. Combien de verres peut-on remplir avec 1 L ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "1 L = 1000 mL.",
    explanation:
      "1 L = 1000 mL. Chaque verre contient 250 mL. On calcule 1000 ÷ 250 = 4. On peut remplir 4 verres.",
    tags: ["cm2", "contenance", "defi", "reunion", "division", "verres", "short", "canvas"],
    canvas: contenantsCanvas(
      [getContenant("Jus de goyavier"), getContenant("Verre d’eau")],
      "Combien de verres ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_contenance_defi_fixed_12_erreur_unites",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : “1,5 L est plus petit que 900 mL car 1,5 est plus petit que 900.” A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Il faut comparer dans la même unité.",
    explanation:
      "Non. Il faut convertir avant de comparer. 1,5 L = 1500 mL, et 1500 mL est plus grand que 900 mL.",
    tags: ["cm2", "contenance", "defi", "erreur", "unites", "qcm", "canvas"],
    canvas: conversionContenanceCanvas("1,5 L", "1500 mL", "Compare avec 900 mL."),
  },

  {
    kind: "fixed",
    id: "cm2_contenance_defi_fixed_13_erreur_estimation",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève estime qu’un verre contient 50 L. Est-ce raisonnable ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "50 L, c’est beaucoup plus qu’un seau.",
    explanation:
      "Non. Un verre contient plutôt quelques centaines de millilitres. 50 L est beaucoup trop grand pour un verre.",
    tags: ["cm2", "contenance", "defi", "erreur", "estimation", "qcm", "canvas"],
    canvas: estimationContenanceCanvas(
      getContenant("Verre d’eau"),
      ["250 mL", "50 L", "250 L"],
      "50 L est-il raisonnable ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_contenance_defi_fixed_14_open_methode_probleme",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique une méthode pour résoudre un problème avec des contenances.",
    format: "open",
    expected: ["lire", "unités", "convertir", "même unité", "calcul", "réponse"],
    comparator: "contains_keyword",
    hint: "Pense aux unités avant de calculer.",
    explanation:
      "Pour résoudre un problème avec des contenances, on lit la question, on repère les contenances utiles, on convertit si les unités sont différentes, puis on effectue le calcul demandé et on rédige la réponse.",
    tags: ["cm2", "contenance", "defi", "open", "methode", "probleme"],
  },

  {
    kind: "fixed",
    id: "cm2_contenance_defi_fixed_15_open_justifier",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi 1,2 L est plus grand que 900 mL.",
    format: "open",
    expected: ["1,2 L", "1200 mL", "900 mL", "plus grand", "convertir"],
    comparator: "contains_keyword",
    hint: "Convertis 1,2 L en millilitres.",
    explanation:
      "1,2 L = 1200 mL. Comme 1200 mL est plus grand que 900 mL, 1,2 L est plus grand que 900 mL.",
    tags: ["cm2", "contenance", "defi", "open", "justifier", "conversion"],
  },

  {
    kind: "template",
    id: "cm2_contenance_defi_tpl_1_additions",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Additionne les contenances. Convertis si nécessaire.",
    tags: ["cm2", "contenance", "defi", "template", "addition", "short", "canvas"],
    generate: () => {
      const situations = [
        {
          objets: [getContenant("Verre d’eau"), getContenant("Petite bouteille")],
          text: "Un verre contient 250 mL et une petite bouteille contient 500 mL. Quelle est la quantité totale ?",
          expected: "750",
          explanation: "250 mL + 500 mL = 750 mL.",
        },
        {
          objets: [getContenant("Brique de jus"), getContenant("Bouteille de sirop")],
          text: "Une brique de jus contient 1 L et une bouteille de sirop contient 750 mL. Quelle est la quantité totale en millilitres ?",
          expected: "1750",
          explanation: "1 L = 1000 mL. Donc 1000 mL + 750 mL = 1750 mL.",
        },
        {
          objets: [getContenant("Gourde"), getContenant("Gourde"), getContenant("Gourde")],
          text: "Une gourde contient 500 mL. Combien contiennent 3 gourdes ?",
          expected: "1500",
          explanation: "3 × 500 mL = 1500 mL.",
        },
        {
          objets: [getContenant("Jus de goyavier"), getContenant("Bouteille de jus letchi")],
          text: "On a 1 L de jus de goyavier et 1 L de jus letchi. Quelle est la quantité totale en litres ?",
          expected: "2",
          explanation: "1 L + 1 L = 2 L.",
        },
      ];

      const item = randomChoice(situations);

      return {
        text: item.text,
        format: "short",
        expected: [item.expected],
        comparator: "number_equal",
        explanation: item.explanation,
        canvas: contenantsCanvas(item.objets, "Quantité totale ?"),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_contenance_defi_tpl_2_differences",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Pour trouver une différence, soustrais la plus petite contenance de la plus grande.",
    tags: ["cm2", "contenance", "defi", "template", "difference", "short", "canvas"],
    generate: () => {
      const situations = [
        {
          a: getContenant("Grande bouteille"),
          b: getContenant("Gourde"),
          expected: "1000",
          explanation:
            "La grande bouteille contient 1,5 L = 1500 mL. La gourde contient 500 mL. Donc 1500 mL - 500 mL = 1000 mL.",
        },
        {
          a: getContenant("Brique de jus"),
          b: getContenant("Canette"),
          expected: "670",
          explanation:
            "La brique de jus contient 1000 mL et la canette 330 mL. Donc 1000 mL - 330 mL = 670 mL.",
        },
        {
          a: getContenant("Seau"),
          b: getContenant("Arrosoir"),
          expected: "5",
          explanation:
            "Le seau contient 10 L et l’arrosoir 5 L. La différence est 10 L - 5 L = 5 L.",
        },
        {
          a: getContenant("Bouteille de sirop"),
          b: getContenant("Verre d’eau"),
          expected: "500",
          explanation:
            "La bouteille de sirop contient 750 mL et le verre 250 mL. Donc 750 mL - 250 mL = 500 mL.",
        },
      ];

      const item = randomChoice(situations);

      return {
        text: `Quelle est la différence de contenance entre ${item.a.label} et ${item.b.label} ?`,
        format: "short",
        expected: [item.expected],
        comparator: "number_equal",
        explanation: item.explanation,
        canvas: comparaisonCanvas(
          item.a,
          item.b,
          "Différence de contenance ?"
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_contenance_defi_tpl_3_comparer_totaux",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Calcule chaque total avant de comparer.",
    tags: ["cm2", "contenance", "defi", "template", "comparer_totaux", "qcm", "canvas"],
    generate: () => {
      const situations = [
        {
          text: "Lina a une brique de jus et une canette. Sami a une grande gourde. Qui a le plus de boisson ?",
          expected: "Lina",
          choices: ["Lina", "Sami", "Même quantité", "Impossible"],
          explanation:
            "Lina a 1 L + 330 mL = 1330 mL. Sami a 1 L = 1000 mL. Lina a donc plus de boisson.",
          objets: [
            getContenant("Brique de jus"),
            getContenant("Canette"),
            getContenant("Grande gourde"),
          ],
        },
        {
          text: "Nina a deux gourdes de 500 mL. Malo a une brique de jus de 1 L. Qui a le plus ?",
          expected: "Même quantité",
          choices: ["Même quantité", "Nina", "Malo", "Impossible"],
          explanation:
            "Nina a 2 × 500 mL = 1000 mL. Malo a 1 L = 1000 mL. Ils ont la même quantité.",
          objets: [
            getContenant("Gourde"),
            getContenant("Gourde"),
            getContenant("Brique de jus"),
          ],
        },
        {
          text: "Emma a une grande bouteille de 1,5 L. Léo a deux petites bouteilles de 500 mL. Qui a le plus ?",
          expected: "Emma",
          choices: ["Emma", "Léo", "Même quantité", "Impossible"],
          explanation:
            "Emma a 1,5 L = 1500 mL. Léo a 2 × 500 mL = 1000 mL. Emma a donc plus.",
          objets: [
            getContenant("Grande bouteille"),
            getContenant("Petite bouteille"),
            getContenant("Petite bouteille"),
          ],
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
        canvas: contenantsCanvas(item.objets, "Compare les quantités totales."),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_contenance_defi_tpl_4_erreurs",
    niveau: "cm2",
    matiere: "maths",
    notionId: "contenance",
    microId: "contenance_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Vérifie les unités ou l’ordre de grandeur.",
    tags: ["cm2", "contenance", "defi", "template", "erreur", "qcm", "canvas"],
    generate: () => {
      const situations = [
        {
          text: "Un élève dit : “500 mL est plus grand que 1 L.” A-t-il raison ?",
          expected: "non",
          explanation:
            "Non. 1 L = 1000 mL, donc 1 L est plus grand que 500 mL.",
          canvas: conversionContenanceCanvas("1 L", "1000 mL", "Compare avec 500 mL."),
        },
        {
          text: "Un élève dit : “2 L = 200 mL.” A-t-il raison ?",
          expected: "non",
          explanation:
            "Non. 2 L = 2000 mL, pas 200 mL.",
          canvas: conversionContenanceCanvas("2 L", "2000 mL"),
        },
        {
          text: "Un élève dit : “Un verre peut contenir 250 mL.” Est-ce raisonnable ?",
          expected: "oui",
          explanation:
            "Oui. Un verre contient souvent environ 250 mL.",
          canvas: estimationContenanceCanvas(
            getContenant("Verre d’eau"),
            ["250 mL", "25 L", "250 L"],
            "250 mL est-il raisonnable ?"
          ),
        },
        {
          text: "Un élève dit : “Un seau peut contenir 10 mL.” Est-ce raisonnable ?",
          expected: "non",
          explanation:
            "Non. 10 mL est beaucoup trop petit pour un seau.",
          canvas: estimationContenanceCanvas(
            getContenant("Seau"),
            ["10 L", "10 mL", "1000 L"],
            "10 mL est-il raisonnable ?"
          ),
        },
      ];

      const item = randomChoice(situations);

      return {
        text: item.text,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [item.expected],
        comparator: "mcq_exact",
        explanation: item.explanation,
        canvas: item.canvas,
      };
    },
  },
];
