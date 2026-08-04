// lib/tutor-v4/question-banks/maths/cm2/masses.bank.ts

import type {
  MasseCanvasData,
  MasseCanvasObject,
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
  // ⚠️ 04/08/2026 — la bonne réponse était jetée dans le même chapeau que les
  // pièges : à cinq pièges écrits, le mélange pouvait la laisser au fond et
  // le découpage à quatre l'emportait. L'élève voyait alors quatre pièges et
  // rien d'autre. On la met de côté, on tire trois distracteurs, on mélange.
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

type MasseObjet = MasseCanvasObject & {
  grammes: number;
  masse: string;
  theme: QuestionTheme;
};

function masseCanvas(data: Omit<MasseCanvasData, "kind">): MasseCanvasData {
  return {
    kind: "masse",
    ...data,
  };
}

// ============================================================
// OBJETS DE RÉFÉRENCE — CM2
// ============================================================

const MASSE_OBJECTS: MasseObjet[] = [
  // École / quotidien
  { label: "Crayon", icon: "✏️", masse: "10 g", grammes: 10, theme: "neutral" },
  { label: "Gomme", icon: "🧽", masse: "20 g", grammes: 20, theme: "neutral" },
  { label: "Stylo", icon: "🖊️", masse: "15 g", grammes: 15, theme: "neutral" },
  { label: "Règle", icon: "📏", masse: "30 g", grammes: 30, theme: "neutral" },
  { label: "Cahier", icon: "📓", masse: "250 g", grammes: 250, theme: "neutral" },
  { label: "Livre", icon: "📘", masse: "500 g", grammes: 500, theme: "neutral" },
  { label: "Trousse", icon: "✏️", masse: "200 g", grammes: 200, theme: "neutral" },
  { label: "Cartable", icon: "🎒", masse: "3 kg", grammes: 3000, theme: "neutral" },
  { label: "Téléphone", icon: "📱", masse: "200 g", grammes: 200, theme: "neutral" },
  { label: "Ordinateur portable", icon: "💻", masse: "1,5 kg", grammes: 1500, theme: "neutral" },

  // Cuisine / alimentation
  { label: "Yaourt", icon: "🥛", masse: "125 g", grammes: 125, theme: "cuisine" },
  { label: "Tablette de chocolat", icon: "🍫", masse: "100 g", grammes: 100, theme: "cuisine" },
  { label: "Pain", icon: "🥖", masse: "250 g", grammes: 250, theme: "cuisine" },
  { label: "Pomme", icon: "🍎", masse: "150 g", grammes: 150, theme: "cuisine" },
  { label: "Banane", icon: "🍌", masse: "120 g", grammes: 120, theme: "cuisine" },
  { label: "Bouteille d’eau", icon: "💧", masse: "1,5 kg", grammes: 1500, theme: "cuisine" },
  { label: "Paquet de riz", icon: "🍚", masse: "1 kg", grammes: 1000, theme: "cuisine" },
  { label: "Paquet de farine", icon: "🌾", masse: "1 kg", grammes: 1000, theme: "cuisine" },
  { label: "Boîte de céréales", icon: "🥣", masse: "500 g", grammes: 500, theme: "cuisine" },

  // Sport
  { label: "Ballon", icon: "⚽", masse: "450 g", grammes: 450, theme: "sport" },
  { label: "Raquette", icon: "🏸", masse: "100 g", grammes: 100, theme: "sport" },
  { label: "Gourde pleine", icon: "🥤", masse: "600 g", grammes: 600, theme: "sport" },

  // Réunion
  { label: "Mangue", icon: "🥭", masse: "350 g", grammes: 350, theme: "reunion" },
  { label: "Ananas", icon: "🍍", masse: "1,2 kg", grammes: 1200, theme: "reunion" },
  { label: "Noix de coco", icon: "🥥", masse: "1,5 kg", grammes: 1500, theme: "reunion" },

  // Jeux vidéo
  { label: "Manette", icon: "🎮", masse: "250 g", grammes: 250, theme: "jeux_video" },
];

function getObjet(label: string): MasseObjet {
  const objet = MASSE_OBJECTS.find((item) => item.label === label);

  if (!objet) {
    throw new Error(`Objet de masse introuvable : ${label}`);
  }

  return objet;
}

function objetsCanvas(
  objets: MasseCanvasObject[],
  questionLabel?: string
): MasseCanvasData {
  return masseCanvas({
    variant: "objets",
    objets,
    questionLabel,
    display: {
      showLabels: true,
      showMasses: true,
    },
  });
}

function balanceCanvas(
  gauche: MasseCanvasObject,
  droite: MasseCanvasObject,
  questionLabel?: string
): MasseCanvasData {
  return masseCanvas({
    variant: "balance",
    gauche,
    droite,
    questionLabel,
    display: {
      showLabels: true,
      showMasses: true,
      showComparison: true,
    },
  });
}

function conversionCanvas(
  from: string,
  to: string,
  questionLabel?: string
): MasseCanvasData {
  return masseCanvas({
    variant: "conversion",
    from,
    to,
    questionLabel,
  });
}

function estimationCanvas(
  objet: MasseCanvasObject,
  choix: string[],
  questionLabel?: string
): MasseCanvasData {
  return masseCanvas({
    variant: "estimation",
    objet,
    choix,
    questionLabel,
    display: {
      showLabels: true,
      showMasses: false,
    },
  });
}

function heavier(a: MasseObjet, b: MasseObjet): MasseObjet {
  return a.grammes >= b.grammes ? a : b;
}

function lighter(a: MasseObjet, b: MasseObjet): MasseObjet {
  return a.grammes <= b.grammes ? a : b;
}

// ============================================================
// BANK
// ============================================================

export const massesBank: TutorBankItemV4[] = [
  // ============================================================
  // MASSE_COMPARER
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_masse_comparer_fixed_1_definition",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_comparer",
    difficulty: 1,
    theme: "neutral",
    text: "Comparer des masses, c’est chercher...",
    format: "qcm",
    choices: [
      "quel objet est le plus lourd ou le plus léger",
      "quel objet est le plus coloré",
      "quel objet est le plus grand sur l’image",
      "quel objet est le plus joli",
    ],
    expected: ["quel objet est le plus lourd ou le plus léger"],
    comparator: "mcq_exact",
    hint: "La masse indique si un objet est lourd ou léger.",
    explanation:
      "Comparer des masses, c’est regarder quel objet est le plus lourd, le plus léger, ou si deux objets ont la même masse.",
    tags: ["cm2", "masse", "comparer", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_masse_comparer_fixed_2_unite",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_comparer",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle unité est utilisée pour mesurer une masse ?",
    format: "qcm",
    choices: ["le gramme", "le mètre", "la minute", "le litre"],
    expected: ["le gramme"],
    comparator: "mcq_exact",
    hint: "On mesure une longueur en mètres, mais une masse en grammes ou kilogrammes.",
    explanation:
      "Une masse peut se mesurer en grammes ou en kilogrammes. Le gramme est donc une unité de masse.",
    tags: ["cm2", "masse", "unite", "gramme", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_masse_comparer_fixed_3_cahier_livre",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_comparer",
    difficulty: 1,
    theme: "neutral",
    text: "Quel objet est le plus lourd : le cahier ou le livre ?",
    format: "qcm",
    choices: ["Livre", "Cahier", "Ils ont la même masse", "Impossible"],
    expected: ["Livre"],
    comparator: "mcq_exact",
    hint: "Compare 250 g et 500 g.",
    explanation:
      "Le cahier pèse 250 g et le livre pèse 500 g. Comme 500 g > 250 g, le livre est le plus lourd.",
    tags: ["cm2", "masse", "comparer", "ecole", "qcm", "canvas"],
    canvas: balanceCanvas(
      getObjet("Cahier"),
      getObjet("Livre"),
      "Quel objet est le plus lourd ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_masse_comparer_fixed_4_crayon_gomme",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_comparer",
    difficulty: 1,
    theme: "neutral",
    text: "Quel objet est le plus léger : le crayon ou la gomme ?",
    format: "qcm",
    choices: ["Crayon", "Gomme", "Ils ont la même masse", "Impossible"],
    expected: ["Crayon"],
    comparator: "mcq_exact",
    hint: "Compare 10 g et 20 g.",
    explanation:
      "Le crayon pèse 10 g et la gomme pèse 20 g. Comme 10 g < 20 g, le crayon est le plus léger.",
    tags: ["cm2", "masse", "comparer", "ecole", "qcm", "canvas"],
    canvas: balanceCanvas(
      getObjet("Crayon"),
      getObjet("Gomme"),
      "Quel objet est le plus léger ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_masse_comparer_fixed_5_pomme_banane",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_comparer",
    difficulty: 1,
    theme: "cuisine",
    text: "Quel fruit est le plus lourd : la pomme ou la banane ?",
    format: "qcm",
    choices: ["Pomme", "Banane", "Même masse", "Impossible"],
    expected: ["Pomme"],
    comparator: "mcq_exact",
    hint: "Compare 150 g et 120 g.",
    explanation:
      "La pomme pèse 150 g et la banane pèse 120 g. Comme 150 g > 120 g, la pomme est plus lourde.",
    tags: ["cm2", "masse", "comparer", "cuisine", "fruit", "qcm", "canvas"],
    canvas: balanceCanvas(
      getObjet("Pomme"),
      getObjet("Banane"),
      "Quel fruit est le plus lourd ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_masse_comparer_fixed_6_riz_farines",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_comparer",
    difficulty: 2,
    theme: "cuisine",
    text: "Un paquet de riz pèse 1 kg et un paquet de farine pèse 1 kg. Que peut-on dire ?",
    format: "qcm",
    choices: [
      "Ils ont la même masse",
      "Le riz est plus lourd",
      "La farine est plus lourde",
      "On ne peut pas comparer",
    ],
    expected: ["Ils ont la même masse"],
    comparator: "mcq_exact",
    hint: "Compare 1 kg et 1 kg.",
    explanation:
      "Le paquet de riz et le paquet de farine pèsent chacun 1 kg. Ils ont donc la même masse.",
    tags: ["cm2", "masse", "comparer", "meme_masse", "cuisine", "qcm", "canvas"],
    canvas: balanceCanvas(
      getObjet("Paquet de riz"),
      getObjet("Paquet de farine"),
      "Que peut-on dire des deux masses ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_masse_comparer_fixed_7_ananas_mangue",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_comparer",
    difficulty: 2,
    theme: "reunion",
    text: "Au marché, quel fruit est le plus lourd : l’ananas ou la mangue ?",
    format: "qcm",
    choices: ["Ananas", "Mangue", "Même masse", "Impossible"],
    expected: ["Ananas"],
    comparator: "mcq_exact",
    hint: "Compare 1,2 kg et 350 g.",
    explanation:
      "L’ananas pèse 1,2 kg, soit 1200 g. La mangue pèse 350 g. L’ananas est donc plus lourd.",
    tags: ["cm2", "masse", "comparer", "reunion", "fruit", "qcm", "canvas"],
    canvas: balanceCanvas(
      getObjet("Ananas"),
      getObjet("Mangue"),
      "Quel fruit est le plus lourd ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_masse_comparer_fixed_8_ballons_gourde",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_comparer",
    difficulty: 2,
    theme: "sport",
    text: "Quel objet est le plus lourd : le ballon ou la gourde pleine ?",
    format: "qcm",
    choices: ["Gourde pleine", "Ballon", "Même masse", "Impossible"],
    expected: ["Gourde pleine"],
    comparator: "mcq_exact",
    hint: "Compare 450 g et 600 g.",
    explanation:
      "Le ballon pèse 450 g et la gourde pleine pèse 600 g. La gourde pleine est donc plus lourde.",
    tags: ["cm2", "masse", "comparer", "sport", "qcm", "canvas"],
    canvas: balanceCanvas(
      getObjet("Ballon"),
      getObjet("Gourde pleine"),
      "Quel objet est le plus lourd ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_masse_comparer_fixed_9_chocolat_yaourt",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_comparer",
    difficulty: 2,
    theme: "cuisine",
    text: "Quel objet est le plus léger : la tablette de chocolat ou le yaourt ?",
    format: "qcm",
    choices: ["Tablette de chocolat", "Yaourt", "Même masse", "Impossible"],
    expected: ["Tablette de chocolat"],
    comparator: "mcq_exact",
    hint: "Compare 100 g et 125 g.",
    explanation:
      "La tablette de chocolat pèse 100 g et le yaourt pèse 125 g. La tablette de chocolat est donc plus légère.",
    tags: ["cm2", "masse", "comparer", "cuisine", "qcm", "canvas"],
    canvas: balanceCanvas(
      getObjet("Tablette de chocolat"),
      getObjet("Yaourt"),
      "Quel objet est le plus léger ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_masse_comparer_fixed_10_kg_g",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle masse est la plus grande : 1 kg ou 500 g ?",
    format: "qcm",
    choices: ["1 kg", "500 g", "Même masse", "Impossible"],
    expected: ["1 kg"],
    comparator: "mcq_exact",
    hint: "1 kg = 1000 g.",
    explanation:
      "1 kg = 1000 g. Comme 1000 g > 500 g, 1 kg est plus grand que 500 g.",
    tags: ["cm2", "masse", "comparer", "conversion", "kg", "g", "qcm", "canvas"],
    canvas: conversionCanvas("1 kg", "1000 g", "Compare avec 500 g."),
  },

  {
    kind: "fixed",
    id: "cm2_masse_comparer_fixed_11_1kg_1200g",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle masse est la plus grande : 1 kg ou 1200 g ?",
    format: "qcm",
    choices: ["1200 g", "1 kg", "Même masse", "Impossible"],
    expected: ["1200 g"],
    comparator: "mcq_exact",
    hint: "1 kg = 1000 g.",
    explanation:
      "1 kg = 1000 g. Comme 1200 g > 1000 g, 1200 g est plus grand que 1 kg.",
    tags: ["cm2", "masse", "comparer", "conversion", "kg", "g", "qcm", "canvas"],
    canvas: conversionCanvas("1 kg", "1000 g", "Compare avec 1200 g."),
  },

  {
    kind: "fixed",
    id: "cm2_masse_comparer_fixed_12_1500g_1_5kg",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle affirmation est vraie ?",
    format: "qcm",
    choices: [
      "1500 g = 1,5 kg",
      "1500 g = 15 kg",
      "1500 g = 150 kg",
      "1500 g = 0,15 kg",
    ],
    expected: ["1500 g = 1,5 kg"],
    comparator: "mcq_exact",
    hint: "1000 g = 1 kg, donc 1500 g = 1 kg + 500 g.",
    explanation:
      "1000 g = 1 kg. Donc 1500 g = 1,5 kg.",
    tags: ["cm2", "masse", "comparer", "conversion", "decimal", "qcm", "canvas"],
    canvas: conversionCanvas("1500 g", "1,5 kg"),
  },

  {
    kind: "fixed",
    id: "cm2_masse_comparer_fixed_13_erreur_grand_objet",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : “L’objet le plus grand est toujours le plus lourd.” A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "La taille et la masse ne sont pas toujours la même chose.",
    explanation:
      "Non. Un objet plus grand n’est pas toujours plus lourd. Pour comparer des masses, il faut regarder les grammes ou les kilogrammes.",
    tags: ["cm2", "masse", "comparer", "erreur", "taille", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_masse_comparer_fixed_14_erreur_unites",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : “500 g est plus grand que 1 kg car 500 est plus grand que 1.” A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Attention aux unités : 1 kg = 1000 g.",
    explanation:
      "Non. Il ne faut pas comparer seulement les nombres. Il faut tenir compte des unités. 1 kg = 1000 g, donc 1 kg est plus lourd que 500 g.",
    tags: ["cm2", "masse", "comparer", "erreur", "unites", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_masse_comparer_fixed_15_open_methode",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_comparer",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment comparer deux masses quand les unités sont différentes.",
    format: "open",
    expected: ["convertir", "même unité", "grammes", "kilogrammes", "comparer"],
    comparator: "contains_keyword",
    hint: "Il faut souvent mettre les deux masses dans la même unité.",
    explanation:
      "Pour comparer deux masses avec des unités différentes, on les met d’abord dans la même unité, par exemple en grammes, puis on compare les nombres.",
    tags: ["cm2", "masse", "comparer", "open", "methode", "conversion"],
  },

  {
    kind: "fixed",
    id: "cm2_masse_comparer_fixed_16_open_balance",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_comparer",
    difficulty: 4,
    theme: "neutral",
    text: "Explique ce que montre une balance quand un côté descend.",
    format: "open",
    expected: ["plus lourd", "masse", "balance", "descend", "côté"],
    comparator: "contains_keyword",
    hint: "Le côté qui descend porte l’objet le plus lourd.",
    explanation:
      "Sur une balance, le côté qui descend correspond à l’objet le plus lourd. Le côté qui monte correspond à l’objet le plus léger.",
    tags: ["cm2", "masse", "comparer", "open", "balance"],
  },

  {
    kind: "template",
    id: "cm2_masse_comparer_tpl_1_objet_plus_lourd",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Compare les masses en grammes.",
    tags: ["cm2", "masse", "comparer", "template", "plus_lourd", "qcm", "canvas"],
    generate: () => {
      const pairs = [
        [getObjet("Cahier"), getObjet("Livre")],
        [getObjet("Pomme"), getObjet("Banane")],
        [getObjet("Ballon"), getObjet("Gourde pleine")],
        [getObjet("Trousse"), getObjet("Cahier")],
        [getObjet("Mangue"), getObjet("Ananas")],
        [getObjet("Raquette"), getObjet("Ballon")],
      ] as const;

      const [a, b] = randomChoice(pairs);
      const correct = heavier(a, b);

      return {
        text: `Quel objet est le plus lourd : ${a.label} ou ${b.label} ?`,
        format: "qcm",
        choices: makeChoices(correct.label, [
          a.label === correct.label ? b.label : a.label,
          "Ils ont la même masse",
          "Impossible à savoir",
        ]),
        expected: [correct.label],
        comparator: "mcq_exact",
        explanation:
          `${a.label} pèse ${a.masse} et ${b.label} pèse ${b.masse}. L’objet le plus lourd est ${correct.label}.`,
        canvas: balanceCanvas(a, b, "Quel objet est le plus lourd ?"),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_masse_comparer_tpl_2_objet_plus_leger",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Compare les masses en grammes.",
    tags: ["cm2", "masse", "comparer", "template", "plus_leger", "qcm", "canvas"],
    generate: () => {
      const pairs = [
        [getObjet("Crayon"), getObjet("Gomme")],
        [getObjet("Stylo"), getObjet("Règle")],
        [getObjet("Yaourt"), getObjet("Pain")],
        [getObjet("Tablette de chocolat"), getObjet("Pomme")],
        [getObjet("Mangue"), getObjet("Noix de coco")],
        [getObjet("Manette"), getObjet("Ordinateur portable")],
      ] as const;

      const [a, b] = randomChoice(pairs);
      const correct = lighter(a, b);

      return {
        text: `Quel objet est le plus léger : ${a.label} ou ${b.label} ?`,
        format: "qcm",
        choices: makeChoices(correct.label, [
          a.label === correct.label ? b.label : a.label,
          "Ils ont la même masse",
          "Impossible à savoir",
        ]),
        expected: [correct.label],
        comparator: "mcq_exact",
        explanation:
          `${a.label} pèse ${a.masse} et ${b.label} pèse ${b.masse}. L’objet le plus léger est ${correct.label}.`,
        canvas: balanceCanvas(a, b, "Quel objet est le plus léger ?"),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_masse_comparer_tpl_3_meme_masse",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_comparer",
    difficulty: 2,
    theme: "cuisine",
    hint: "Compare les deux masses.",
    tags: ["cm2", "masse", "comparer", "template", "meme_masse", "qcm", "canvas"],
    generate: () => {
      const pairs = [
        [getObjet("Paquet de riz"), getObjet("Paquet de farine")],
        [getObjet("Livre"), getObjet("Boîte de céréales")],
        [getObjet("Cahier"), getObjet("Pain")],
        [getObjet("Trousse"), getObjet("Téléphone")],
      ] as const;

      const [a, b] = randomChoice(pairs);

      return {
        text: `Que peut-on dire de ces deux masses : ${a.label} et ${b.label} ?`,
        format: "qcm",
        choices: [
          "Ils ont la même masse",
          `${a.label} est plus lourd`,
          `${b.label} est plus lourd`,
          "On ne peut jamais comparer",
        ],
        expected: ["Ils ont la même masse"],
        comparator: "mcq_exact",
        explanation:
          `${a.label} pèse ${a.masse} et ${b.label} pèse aussi ${b.masse}. Ils ont donc la même masse.`,
        canvas: balanceCanvas(a, b, "Que peut-on dire ?"),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_masse_comparer_tpl_4_unites_differentes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Convertis les kilogrammes en grammes.",
    tags: ["cm2", "masse", "comparer", "template", "unites", "qcm", "canvas"],
    generate: () => {
      const situations = [
        {
          a: "1 kg",
          b: "800 g",
          correct: "1 kg",
          explanation: "1 kg = 1000 g. Comme 1000 g > 800 g, 1 kg est plus grand.",
        },
        {
          a: "1,5 kg",
          b: "1200 g",
          correct: "1,5 kg",
          explanation: "1,5 kg = 1500 g. Comme 1500 g > 1200 g, 1,5 kg est plus grand.",
        },
        {
          a: "500 g",
          b: "1 kg",
          correct: "1 kg",
          explanation: "1 kg = 1000 g. Comme 1000 g > 500 g, 1 kg est plus grand.",
        },
        {
          a: "2 kg",
          b: "1500 g",
          correct: "2 kg",
          explanation: "2 kg = 2000 g. Comme 2000 g > 1500 g, 2 kg est plus grand.",
        },
      ];

      const item = randomChoice(situations);

      return {
        text: `Quelle masse est la plus grande : ${item.a} ou ${item.b} ?`,
        format: "qcm",
        choices: makeChoices(item.correct, [
          item.correct === item.a ? item.b : item.a,
          "Même masse",
          "Impossible",
        ]),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation: item.explanation,
        canvas: conversionCanvas(item.a, item.b, "Compare les deux masses."),
      };
    },
  },

    // ============================================================
  // MASSE_CONVERTIR
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_masse_convertir_fixed_1_relation_kg_g",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_convertir",
    difficulty: 1,
    theme: "neutral",
    text: "Combien de grammes y a-t-il dans 1 kg ?",
    format: "short",
    expected: ["1000"],
    comparator: "number_equal",
    hint: "C’est la conversion de base à connaître.",
    explanation:
      "1 kg = 1000 g. C’est la relation de base pour convertir des kilogrammes en grammes.",
    tags: ["cm2", "masse", "convertir", "kg", "g", "short", "canvas"],
    canvas: conversionCanvas("1 kg", "1000 g"),
  },

  {
    kind: "fixed",
    id: "cm2_masse_convertir_fixed_2_2kg",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_convertir",
    difficulty: 1,
    theme: "neutral",
    text: "2 kg = combien de grammes ?",
    format: "short",
    expected: ["2000"],
    comparator: "number_equal",
    hint: "1 kg = 1000 g, donc 2 kg = 2 × 1000 g.",
    explanation:
      "1 kg = 1000 g. Donc 2 kg = 2 × 1000 g = 2000 g.",
    tags: ["cm2", "masse", "convertir", "kg", "g", "short", "canvas"],
    canvas: conversionCanvas("2 kg", "2000 g"),
  },

  {
    kind: "fixed",
    id: "cm2_masse_convertir_fixed_3_3kg",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_convertir",
    difficulty: 1,
    theme: "neutral",
    text: "3 kg = combien de grammes ?",
    format: "short",
    expected: ["3000"],
    comparator: "number_equal",
    hint: "Multiplie le nombre de kilogrammes par 1000.",
    explanation:
      "1 kg = 1000 g. Donc 3 kg = 3 × 1000 g = 3000 g.",
    tags: ["cm2", "masse", "convertir", "kg", "g", "short", "canvas"],
    canvas: conversionCanvas("3 kg", "3000 g"),
  },

  {
    kind: "fixed",
    id: "cm2_masse_convertir_fixed_4_500g",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "500 g = combien de kilogramme ?",
    format: "qcm",
    choices: ["0,5 kg", "5 kg", "50 kg", "500 kg"],
    expected: ["0,5 kg"],
    comparator: "mcq_exact",
    hint: "500 g est la moitié de 1000 g.",
    explanation:
      "1000 g = 1 kg. Donc 500 g correspond à la moitié d’un kilogramme : 0,5 kg.",
    tags: ["cm2", "masse", "convertir", "g", "kg", "qcm", "canvas"],
    canvas: conversionCanvas("500 g", "0,5 kg"),
  },

  {
    kind: "fixed",
    id: "cm2_masse_convertir_fixed_5_1500g",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "1500 g = combien de kilogrammes ?",
    format: "qcm",
    choices: ["1,5 kg", "15 kg", "150 kg", "0,15 kg"],
    expected: ["1,5 kg"],
    comparator: "mcq_exact",
    hint: "1500 g = 1000 g + 500 g.",
    explanation:
      "1000 g = 1 kg et 500 g = 0,5 kg. Donc 1500 g = 1,5 kg.",
    tags: ["cm2", "masse", "convertir", "g", "kg", "decimal", "qcm", "canvas"],
    canvas: conversionCanvas("1500 g", "1,5 kg"),
  },

  {
    kind: "fixed",
    id: "cm2_masse_convertir_fixed_6_1_5kg",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "1,5 kg = combien de grammes ?",
    format: "short",
    expected: ["1500"],
    comparator: "number_equal",
    hint: "1,5 kg = 1 kg + 0,5 kg.",
    explanation:
      "1 kg = 1000 g et 0,5 kg = 500 g. Donc 1,5 kg = 1500 g.",
    tags: ["cm2", "masse", "convertir", "kg", "g", "decimal", "short", "canvas"],
    canvas: conversionCanvas("1,5 kg", "1500 g"),
  },

  {
    kind: "fixed",
    id: "cm2_masse_convertir_fixed_7_0_5kg",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "0,5 kg = combien de grammes ?",
    format: "short",
    expected: ["500"],
    comparator: "number_equal",
    hint: "0,5 kg est la moitié de 1 kg.",
    explanation:
      "1 kg = 1000 g. La moitié de 1000 g est 500 g. Donc 0,5 kg = 500 g.",
    tags: ["cm2", "masse", "convertir", "kg", "g", "decimal", "short", "canvas"],
    canvas: conversionCanvas("0,5 kg", "500 g"),
  },

  {
    kind: "fixed",
    id: "cm2_masse_convertir_fixed_8_2500g",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_convertir",
    difficulty: 3,
    theme: "neutral",
    text: "2500 g = combien de kilogrammes ?",
    format: "qcm",
    choices: ["2,5 kg", "25 kg", "250 kg", "0,25 kg"],
    expected: ["2,5 kg"],
    comparator: "mcq_exact",
    hint: "2500 g = 2000 g + 500 g.",
    explanation:
      "2000 g = 2 kg et 500 g = 0,5 kg. Donc 2500 g = 2,5 kg.",
    tags: ["cm2", "masse", "convertir", "g", "kg", "decimal", "qcm", "canvas"],
    canvas: conversionCanvas("2500 g", "2,5 kg"),
  },

  {
    kind: "fixed",
    id: "cm2_masse_convertir_fixed_9_2_5kg",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_convertir",
    difficulty: 3,
    theme: "neutral",
    text: "2,5 kg = combien de grammes ?",
    format: "short",
    expected: ["2500"],
    comparator: "number_equal",
    hint: "2,5 kg = 2 kg + 0,5 kg.",
    explanation:
      "2 kg = 2000 g et 0,5 kg = 500 g. Donc 2,5 kg = 2500 g.",
    tags: ["cm2", "masse", "convertir", "kg", "g", "decimal", "short", "canvas"],
    canvas: conversionCanvas("2,5 kg", "2500 g"),
  },

  {
    kind: "fixed",
    id: "cm2_masse_convertir_fixed_10_riz",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_convertir",
    difficulty: 2,
    theme: "cuisine",
    text: "Un paquet de riz pèse 1 kg. Quelle est sa masse en grammes ?",
    format: "short",
    expected: ["1000"],
    comparator: "number_equal",
    hint: "1 kg = 1000 g.",
    explanation:
      "Un paquet de riz de 1 kg pèse 1000 g.",
    tags: ["cm2", "masse", "convertir", "cuisine", "riz", "short", "canvas"],
    canvas: objetsCanvas(
      [getObjet("Paquet de riz")],
      "Quelle est sa masse en grammes ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_masse_convertir_fixed_11_bouteille",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_convertir",
    difficulty: 3,
    theme: "cuisine",
    text: "Une bouteille d’eau pèse 1,5 kg. Quelle est sa masse en grammes ?",
    format: "short",
    expected: ["1500"],
    comparator: "number_equal",
    hint: "1,5 kg = 1500 g.",
    explanation:
      "1,5 kg = 1500 g. La bouteille d’eau pèse donc 1500 g.",
    tags: ["cm2", "masse", "convertir", "cuisine", "eau", "short", "canvas"],
    canvas: objetsCanvas(
      [getObjet("Bouteille d’eau")],
      "Convertis 1,5 kg en grammes."
    ),
  },

  {
    kind: "fixed",
    id: "cm2_masse_convertir_fixed_12_ananas",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_convertir",
    difficulty: 3,
    theme: "reunion",
    text: "Un ananas pèse 1,2 kg. Quelle est sa masse en grammes ?",
    format: "short",
    expected: ["1200"],
    comparator: "number_equal",
    hint: "1,2 kg = 1 kg + 0,2 kg.",
    explanation:
      "1 kg = 1000 g et 0,2 kg = 200 g. Donc 1,2 kg = 1200 g.",
    tags: ["cm2", "masse", "convertir", "reunion", "ananas", "short", "canvas"],
    canvas: objetsCanvas(
      [getObjet("Ananas")],
      "Convertis 1,2 kg en grammes."
    ),
  },

  {
    kind: "fixed",
    id: "cm2_masse_convertir_fixed_13_erreur_multiplier",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_convertir",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : “2 kg = 200 g.” A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "1 kg = 1000 g.",
    explanation:
      "Non. 1 kg = 1000 g, donc 2 kg = 2000 g. L’élève a oublié un zéro.",
    tags: ["cm2", "masse", "convertir", "erreur", "kg", "g", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_masse_convertir_fixed_14_erreur_diviser",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_convertir",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : “500 g = 5 kg.” A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "500 g est inférieur à 1 kg.",
    explanation:
      "Non. 500 g est la moitié de 1000 g, donc 500 g = 0,5 kg.",
    tags: ["cm2", "masse", "convertir", "erreur", "g", "kg", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_masse_convertir_fixed_15_open_methode_kg_g",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_convertir",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment convertir des kilogrammes en grammes.",
    format: "open",
    expected: ["multiplier", "1000", "kg", "g", "grammes"],
    comparator: "contains_keyword",
    hint: "1 kg = 1000 g.",
    explanation:
      "Pour convertir des kilogrammes en grammes, on multiplie le nombre de kilogrammes par 1000, car 1 kg = 1000 g.",
    tags: ["cm2", "masse", "convertir", "open", "methode", "kg", "g"],
  },

  {
    kind: "fixed",
    id: "cm2_masse_convertir_fixed_16_open_methode_g_kg",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_convertir",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment convertir des grammes en kilogrammes.",
    format: "open",
    expected: ["diviser", "1000", "g", "kg", "kilogrammes"],
    comparator: "contains_keyword",
    hint: "1000 g = 1 kg.",
    explanation:
      "Pour convertir des grammes en kilogrammes, on divise le nombre de grammes par 1000, car 1000 g = 1 kg.",
    tags: ["cm2", "masse", "convertir", "open", "methode", "g", "kg"],
  },

  {
    kind: "template",
    id: "cm2_masse_convertir_tpl_1_kg_vers_g",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_convertir",
    difficulty: 2,
    theme: "neutral",
    hint: "Pour passer des kg aux g, multiplie par 1000.",
    tags: ["cm2", "masse", "convertir", "template", "kg", "g", "short", "canvas"],
    generate: () => {
      const kg = randomChoice([1, 2, 3, 4, 5]);
      const grammes = kg * 1000;

      return {
        text: `${kg} kg = combien de grammes ?`,
        format: "short",
        expected: [String(grammes)],
        comparator: "number_equal",
        explanation:
          `1 kg = 1000 g. Donc ${kg} kg = ${kg} × 1000 g = ${grammes} g.`,
        canvas: conversionCanvas(`${kg} kg`, `${grammes} g`),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_masse_convertir_tpl_2_g_vers_kg_entier",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_convertir",
    difficulty: 2,
    theme: "neutral",
    hint: "Pour passer des g aux kg, divise par 1000.",
    tags: ["cm2", "masse", "convertir", "template", "g", "kg", "qcm", "canvas"],
    generate: () => {
      const kg = randomChoice([1, 2, 3, 4, 5]);
      const grammes = kg * 1000;

      return {
        text: `${grammes} g = combien de kilogrammes ?`,
        format: "qcm",
        choices: makeChoices(`${kg} kg`, [
          `${kg * 10} kg`,
          `${kg / 10} kg`,
          `${grammes} kg`,
        ]),
        expected: [`${kg} kg`],
        comparator: "mcq_exact",
        explanation:
          `${grammes} g = ${kg} × 1000 g. Donc ${grammes} g = ${kg} kg.`,
        canvas: conversionCanvas(`${grammes} g`, `${kg} kg`),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_masse_convertir_tpl_3_demi_kg",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_convertir",
    difficulty: 3,
    theme: "neutral",
    hint: "0,5 kg = 500 g.",
    tags: ["cm2", "masse", "convertir", "template", "decimal", "qcm", "canvas"],
    generate: () => {
      const situations = [
        {
          from: "0,5 kg",
          to: "500 g",
          text: "0,5 kg = combien de grammes ?",
          expected: "500",
          choices: ["500", "50", "5000", "5"],
          explanation:
            "0,5 kg est la moitié de 1 kg. Comme 1 kg = 1000 g, alors 0,5 kg = 500 g.",
        },
        {
          from: "1,5 kg",
          to: "1500 g",
          text: "1,5 kg = combien de grammes ?",
          expected: "1500",
          choices: ["1500", "150", "15", "15000"],
          explanation:
            "1,5 kg = 1 kg + 0,5 kg = 1000 g + 500 g = 1500 g.",
        },
        {
          from: "2,5 kg",
          to: "2500 g",
          text: "2,5 kg = combien de grammes ?",
          expected: "2500",
          choices: ["2500", "250", "25", "25000"],
          explanation:
            "2,5 kg = 2 kg + 0,5 kg = 2000 g + 500 g = 2500 g.",
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
        canvas: conversionCanvas(item.from, item.to),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_masse_convertir_tpl_4_objets",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_convertir",
    difficulty: 3,
    theme: "cuisine",
    hint: "Utilise 1 kg = 1000 g.",
    tags: ["cm2", "masse", "convertir", "template", "objets", "short", "canvas"],
    generate: () => {
      const item = randomChoice([
        getObjet("Paquet de riz"),
        getObjet("Paquet de farine"),
        getObjet("Ananas"),
        getObjet("Bouteille d’eau"),
        getObjet("Noix de coco"),
        getObjet("Ordinateur portable"),
      ]);

      return {
        text: `${item.label} pèse ${item.masse}. Quelle est sa masse en grammes ?`,
        format: "short",
        expected: [String(item.grammes)],
        comparator: "number_equal",
        explanation:
          `${item.label} pèse ${item.masse}, ce qui correspond à ${item.grammes} g.`,
        canvas: objetsCanvas(
          [item],
          "Quelle est sa masse en grammes ?"
        ),
      };
    },
  },
  // ============================================================
  // MASSE_ESTIMER
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_masse_estimer_fixed_1_definition",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_estimer",
    difficulty: 1,
    theme: "neutral",
    text: "Estimer une masse, c’est...",
    format: "qcm",
    choices: [
      "choisir une masse raisonnable sans forcément peser exactement",
      "donner toujours une masse exacte au gramme près",
      "mesurer une longueur",
      "calculer une durée",
    ],
    expected: ["choisir une masse raisonnable sans forcément peser exactement"],
    comparator: "mcq_exact",
    hint: "Estimer, c’est chercher un ordre de grandeur raisonnable.",
    explanation:
      "Estimer une masse, c’est proposer une masse raisonnable. On ne cherche pas toujours une valeur exacte, mais une valeur plausible.",
    tags: ["cm2", "masse", "estimer", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_masse_estimer_fixed_2_crayon",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_estimer",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle masse semble la plus raisonnable pour un crayon ?",
    format: "qcm",
    choices: ["10 g", "10 kg", "100 kg", "1 tonne"],
    expected: ["10 g"],
    comparator: "mcq_exact",
    hint: "Un crayon est très léger.",
    explanation:
      "Un crayon est un petit objet léger. Une masse d’environ 10 g est raisonnable.",
    tags: ["cm2", "masse", "estimer", "crayon", "qcm", "canvas"],
    canvas: estimationCanvas(
      getObjet("Crayon"),
      ["10 g", "10 kg", "100 kg"],
      "Quelle masse semble raisonnable ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_masse_estimer_fixed_3_cartable",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_estimer",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle masse semble la plus raisonnable pour un cartable rempli ?",
    format: "qcm",
    choices: ["3 kg", "3 g", "300 kg", "0,003 g"],
    expected: ["3 kg"],
    comparator: "mcq_exact",
    hint: "Un cartable rempli est beaucoup plus lourd qu’un crayon.",
    explanation:
      "Un cartable rempli peut peser quelques kilogrammes. 3 kg est une estimation raisonnable.",
    tags: ["cm2", "masse", "estimer", "cartable", "qcm", "canvas"],
    canvas: estimationCanvas(
      getObjet("Cartable"),
      ["3 kg", "3 g", "300 kg"],
      "Quelle masse semble raisonnable ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_masse_estimer_fixed_4_pomme",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_estimer",
    difficulty: 1,
    theme: "cuisine",
    text: "Quelle masse semble la plus raisonnable pour une pomme ?",
    format: "qcm",
    choices: ["150 g", "15 kg", "150 kg", "1 g"],
    expected: ["150 g"],
    comparator: "mcq_exact",
    hint: "Une pomme tient dans la main.",
    explanation:
      "Une pomme tient dans la main et pèse souvent quelques centaines de grammes. 150 g est raisonnable.",
    tags: ["cm2", "masse", "estimer", "pomme", "cuisine", "qcm", "canvas"],
    canvas: estimationCanvas(
      getObjet("Pomme"),
      ["150 g", "15 kg", "1 g"],
      "Quelle masse semble raisonnable ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_masse_estimer_fixed_5_bouteille",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_estimer",
    difficulty: 2,
    theme: "cuisine",
    text: "Quelle masse semble la plus raisonnable pour une bouteille d’eau pleine ?",
    format: "qcm",
    choices: ["1,5 kg", "15 g", "150 kg", "1,5 g"],
    expected: ["1,5 kg"],
    comparator: "mcq_exact",
    hint: "Une grande bouteille d’eau pleine est assez lourde.",
    explanation:
      "Une bouteille d’eau pleine de 1,5 L pèse environ 1,5 kg. C’est une estimation raisonnable.",
    tags: ["cm2", "masse", "estimer", "bouteille", "cuisine", "qcm", "canvas"],
    canvas: estimationCanvas(
      getObjet("Bouteille d’eau"),
      ["1,5 kg", "15 g", "150 kg"],
      "Quelle masse semble raisonnable ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_masse_estimer_fixed_6_balloon",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_estimer",
    difficulty: 2,
    theme: "sport",
    text: "Quelle masse semble la plus raisonnable pour un ballon ?",
    format: "qcm",
    choices: ["450 g", "45 kg", "450 kg", "4 g"],
    expected: ["450 g"],
    comparator: "mcq_exact",
    hint: "Un ballon est plus lourd qu’un crayon, mais beaucoup moins lourd qu’un cartable rempli.",
    explanation:
      "Un ballon pèse souvent quelques centaines de grammes. 450 g est une estimation raisonnable.",
    tags: ["cm2", "masse", "estimer", "sport", "ballon", "qcm", "canvas"],
    canvas: estimationCanvas(
      getObjet("Ballon"),
      ["450 g", "45 kg", "4 g"],
      "Quelle masse semble raisonnable ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_masse_estimer_fixed_7_ananas",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_estimer",
    difficulty: 2,
    theme: "reunion",
    text: "Quelle masse semble la plus raisonnable pour un ananas ?",
    format: "qcm",
    choices: ["1,2 kg", "12 g", "120 kg", "0,12 g"],
    expected: ["1,2 kg"],
    comparator: "mcq_exact",
    hint: "Un ananas est plus lourd qu’une pomme.",
    explanation:
      "Un ananas peut peser autour d’un kilogramme. 1,2 kg est une estimation raisonnable.",
    tags: ["cm2", "masse", "estimer", "reunion", "ananas", "qcm", "canvas"],
    canvas: estimationCanvas(
      getObjet("Ananas"),
      ["1,2 kg", "12 g", "120 kg"],
      "Quelle masse semble raisonnable ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_masse_estimer_fixed_8_ordinateur",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_estimer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle masse semble la plus raisonnable pour un ordinateur portable ?",
    format: "qcm",
    choices: ["1,5 kg", "15 g", "150 kg", "1500 kg"],
    expected: ["1,5 kg"],
    comparator: "mcq_exact",
    hint: "Un ordinateur portable se porte à la main, mais il n’est pas aussi léger qu’un stylo.",
    explanation:
      "Un ordinateur portable pèse souvent entre 1 kg et 2 kg. 1,5 kg est raisonnable.",
    tags: ["cm2", "masse", "estimer", "ordinateur", "qcm", "canvas"],
    canvas: estimationCanvas(
      getObjet("Ordinateur portable"),
      ["1,5 kg", "15 g", "150 kg"],
      "Quelle masse semble raisonnable ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_masse_estimer_fixed_9_masse_trop_grande",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_estimer",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève estime qu’un stylo pèse 5 kg. Est-ce raisonnable ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "5 kg, c’est plus lourd qu’un cartable rempli.",
    explanation:
      "Non. Un stylo est un petit objet léger. Une masse de 5 kg est beaucoup trop grande pour un stylo.",
    tags: ["cm2", "masse", "estimer", "erreur", "stylo", "qcm", "canvas"],
    canvas: estimationCanvas(
      getObjet("Stylo"),
      ["15 g", "5 kg", "50 kg"],
      "5 kg est-il raisonnable ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_masse_estimer_fixed_10_masse_trop_petite",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_estimer",
    difficulty: 3,
    theme: "cuisine",
    text: "Un élève estime qu’un paquet de riz pèse 1 g. Est-ce raisonnable ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "1 g, c’est très léger, comme une toute petite quantité.",
    explanation:
      "Non. Un paquet de riz est beaucoup plus lourd qu’un gramme. Une masse de 1 kg est plus raisonnable.",
    tags: ["cm2", "masse", "estimer", "erreur", "riz", "cuisine", "qcm", "canvas"],
    canvas: estimationCanvas(
      getObjet("Paquet de riz"),
      ["1 kg", "1 g", "100 kg"],
      "1 g est-il raisonnable ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_masse_estimer_fixed_11_unite_raisonnable",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_estimer",
    difficulty: 3,
    theme: "neutral",
    text: "Pour estimer la masse d’une gomme, quelle unité est la plus adaptée ?",
    format: "qcm",
    choices: ["gramme", "kilogramme", "tonne", "kilomètre"],
    expected: ["gramme"],
    comparator: "mcq_exact",
    hint: "Une gomme est un petit objet léger.",
    explanation:
      "Pour une gomme, le gramme est l’unité la plus adaptée. Le kilogramme serait trop grand pour estimer facilement ce petit objet.",
    tags: ["cm2", "masse", "estimer", "unite", "gomme", "qcm", "canvas"],
    canvas: estimationCanvas(
      getObjet("Gomme"),
      ["20 g", "20 kg", "20 tonnes"],
      "Quelle unité est la plus adaptée ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_masse_estimer_fixed_12_unite_kg",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_estimer",
    difficulty: 3,
    theme: "neutral",
    text: "Pour estimer la masse d’un cartable rempli, quelle unité est la plus adaptée ?",
    format: "qcm",
    choices: ["kilogramme", "gramme", "millimètre", "litre"],
    expected: ["kilogramme"],
    comparator: "mcq_exact",
    hint: "Un cartable rempli pèse souvent plusieurs milliers de grammes.",
    explanation:
      "Un cartable rempli pèse souvent quelques kilogrammes. Le kilogramme est donc une unité adaptée.",
    tags: ["cm2", "masse", "estimer", "unite", "cartable", "qcm", "canvas"],
    canvas: estimationCanvas(
      getObjet("Cartable"),
      ["3 kg", "3 g", "3 L"],
      "Quelle unité est la plus adaptée ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_masse_estimer_fixed_13_open_methode",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_estimer",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment choisir une masse raisonnable pour un objet.",
    format: "open",
    expected: ["objet", "léger", "lourd", "grammes", "kilogrammes", "raisonnable"],
    comparator: "contains_keyword",
    hint: "Compare avec des objets que tu connais.",
    explanation:
      "Pour choisir une masse raisonnable, on compare l’objet avec des objets connus. Un petit objet léger se mesure souvent en grammes ; un objet plus lourd peut se mesurer en kilogrammes.",
    tags: ["cm2", "masse", "estimer", "open", "methode"],
  },

  {
    kind: "fixed",
    id: "cm2_masse_estimer_fixed_14_open_erreur",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_estimer",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi 100 kg n’est pas une masse raisonnable pour un cahier.",
    format: "open",
    expected: ["cahier", "léger", "100 kg", "trop lourd", "raisonnable"],
    comparator: "contains_keyword",
    hint: "Un cahier se porte facilement dans la main.",
    explanation:
      "Un cahier est un objet léger que l’on porte facilement. 100 kg est beaucoup trop lourd pour un cahier.",
    tags: ["cm2", "masse", "estimer", "open", "erreur", "cahier"],
  },

  {
    kind: "template",
    id: "cm2_masse_estimer_tpl_1_objets_ecole",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_estimer",
    difficulty: 2,
    theme: "neutral",
    hint: "Choisis la masse la plus vraisemblable.",
    tags: ["cm2", "masse", "estimer", "template", "ecole", "qcm", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          objet: getObjet("Crayon"),
          choices: ["10 g", "10 kg", "100 kg"],
          expected: "10 g",
          explanation: "Un crayon est très léger. 10 g est raisonnable.",
        },
        {
          objet: getObjet("Gomme"),
          choices: ["20 g", "20 kg", "200 kg"],
          expected: "20 g",
          explanation: "Une gomme est un petit objet. 20 g est raisonnable.",
        },
        {
          objet: getObjet("Cahier"),
          choices: ["250 g", "25 kg", "250 kg"],
          expected: "250 g",
          explanation: "Un cahier pèse quelques centaines de grammes. 250 g est raisonnable.",
        },
        {
          objet: getObjet("Cartable"),
          choices: ["3 kg", "3 g", "300 kg"],
          expected: "3 kg",
          explanation: "Un cartable rempli peut peser quelques kilogrammes. 3 kg est raisonnable.",
        },
      ]);

      return {
        text: `Quelle masse semble raisonnable pour : ${item.objet.label} ?`,
        format: "qcm",
        choices: shuffle(item.choices),
        expected: [item.expected],
        comparator: "mcq_exact",
        explanation: item.explanation,
        canvas: estimationCanvas(
          item.objet,
          item.choices,
          "Quelle masse semble raisonnable ?"
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_masse_estimer_tpl_2_cuisine",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_estimer",
    difficulty: 2,
    theme: "cuisine",
    hint: "Utilise ton expérience des objets du quotidien.",
    tags: ["cm2", "masse", "estimer", "template", "cuisine", "qcm", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          objet: getObjet("Pomme"),
          choices: ["150 g", "15 kg", "150 kg"],
          expected: "150 g",
          explanation: "Une pomme tient dans la main. 150 g est raisonnable.",
        },
        {
          objet: getObjet("Yaourt"),
          choices: ["125 g", "12 kg", "125 kg"],
          expected: "125 g",
          explanation: "Un yaourt pèse souvent autour de 125 g.",
        },
        {
          objet: getObjet("Paquet de riz"),
          choices: ["1 kg", "1 g", "100 kg"],
          expected: "1 kg",
          explanation: "Un paquet de riz courant peut peser 1 kg.",
        },
        {
          objet: getObjet("Bouteille d’eau"),
          choices: ["1,5 kg", "15 g", "150 kg"],
          expected: "1,5 kg",
          explanation: "Une grande bouteille d’eau pleine pèse environ 1,5 kg.",
        },
      ]);

      return {
        text: `Quelle masse semble raisonnable pour : ${item.objet.label} ?`,
        format: "qcm",
        choices: shuffle(item.choices),
        expected: [item.expected],
        comparator: "mcq_exact",
        explanation: item.explanation,
        canvas: estimationCanvas(
          item.objet,
          item.choices,
          "Quelle masse semble raisonnable ?"
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_masse_estimer_tpl_3_themes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_estimer",
    difficulty: 3,
    theme: "neutral",
    hint: "Élimine les masses beaucoup trop petites ou beaucoup trop grandes.",
    tags: ["cm2", "masse", "estimer", "template", "themes", "qcm", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          objet: getObjet("Ballon"),
          choices: ["450 g", "45 kg", "450 kg"],
          expected: "450 g",
          explanation: "Un ballon pèse quelques centaines de grammes. 450 g est raisonnable.",
        },
        {
          objet: getObjet("Gourde pleine"),
          choices: ["600 g", "60 kg", "6 tonnes"],
          expected: "600 g",
          explanation: "Une gourde pleine est plus lourde qu’une gourde vide, mais elle reste portable.",
        },
        {
          objet: getObjet("Ananas"),
          choices: ["1,2 kg", "12 g", "120 kg"],
          expected: "1,2 kg",
          explanation: "Un ananas peut peser environ 1 kg. 1,2 kg est raisonnable.",
        },
        {
          objet: getObjet("Manette"),
          choices: ["250 g", "25 kg", "250 kg"],
          expected: "250 g",
          explanation: "Une manette est un petit objet que l’on tient dans les mains. 250 g est raisonnable.",
        },
      ]);

      return {
        text: `Quelle masse semble raisonnable pour : ${item.objet.label} ?`,
        format: "qcm",
        choices: shuffle(item.choices),
        expected: [item.expected],
        comparator: "mcq_exact",
        explanation: item.explanation,
        canvas: estimationCanvas(
          item.objet,
          item.choices,
          "Quelle masse semble raisonnable ?"
        ),
      };
    },
  },
    // ============================================================
  // MASSE_DEFI
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_masse_defi_fixed_1_cartable_livres",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un cartable pèse 3 kg. Un livre pèse 500 g. Quelle est la masse totale en grammes ?",
    format: "short",
    expected: ["3500"],
    comparator: "number_equal",
    hint: "Convertis d’abord 3 kg en grammes.",
    explanation:
      "3 kg = 3000 g. On ajoute le livre : 3000 g + 500 g = 3500 g. La masse totale est 3500 g.",
    tags: ["cm2", "masse", "defi", "addition", "conversion", "short", "canvas"],
    canvas: objetsCanvas(
      [getObjet("Cartable"), getObjet("Livre")],
      "Masse totale en grammes ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_masse_defi_fixed_2_riz_farines_total",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_defi",
    difficulty: 4,
    theme: "cuisine",
    text: "Un paquet de riz pèse 1 kg et un paquet de farine pèse 1 kg. Quelle est la masse totale en kilogrammes ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Additionne 1 kg + 1 kg.",
    explanation:
      "Le riz pèse 1 kg et la farine pèse 1 kg. On calcule 1 kg + 1 kg = 2 kg.",
    tags: ["cm2", "masse", "defi", "addition", "cuisine", "short", "canvas"],
    canvas: objetsCanvas(
      [getObjet("Paquet de riz"), getObjet("Paquet de farine")],
      "Masse totale en kg ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_masse_defi_fixed_3_pique_nique",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_defi",
    difficulty: 4,
    theme: "cuisine",
    text: "Pour un pique-nique, on prend une bouteille d’eau de 1,5 kg et du pain de 250 g. Quelle est la masse totale en grammes ?",
    format: "short",
    expected: ["1750"],
    comparator: "number_equal",
    hint: "1,5 kg = 1500 g.",
    explanation:
      "1,5 kg = 1500 g. On ajoute le pain : 1500 g + 250 g = 1750 g.",
    tags: ["cm2", "masse", "defi", "cuisine", "addition", "conversion", "short", "canvas"],
    canvas: objetsCanvas(
      [getObjet("Bouteille d’eau"), getObjet("Pain")],
      "Masse totale en grammes ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_masse_defi_fixed_4_gouter",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_defi",
    difficulty: 4,
    theme: "cuisine",
    text: "Un goûter contient une pomme de 150 g, un yaourt de 125 g et une tablette de chocolat de 100 g. Quelle est la masse totale ?",
    format: "short",
    expected: ["375"],
    comparator: "number_equal",
    hint: "Additionne 150 + 125 + 100.",
    explanation:
      "On additionne les masses : 150 g + 125 g + 100 g = 375 g. La masse totale est 375 g.",
    tags: ["cm2", "masse", "defi", "gouter", "addition", "short", "canvas"],
    canvas: objetsCanvas(
      [
        getObjet("Pomme"),
        getObjet("Yaourt"),
        getObjet("Tablette de chocolat"),
      ],
      "Masse totale ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_masse_defi_fixed_5_sport",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_defi",
    difficulty: 4,
    theme: "sport",
    text: "Un ballon pèse 450 g et une gourde pleine pèse 600 g. Quelle est la masse totale ?",
    format: "short",
    expected: ["1050"],
    comparator: "number_equal",
    hint: "Additionne 450 g et 600 g.",
    explanation:
      "On calcule 450 g + 600 g = 1050 g. La masse totale est 1050 g.",
    tags: ["cm2", "masse", "defi", "sport", "addition", "short", "canvas"],
    canvas: objetsCanvas(
      [getObjet("Ballon"), getObjet("Gourde pleine")],
      "Masse totale ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_masse_defi_fixed_6_reunion_marche",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Au marché, on achète une mangue de 350 g et un ananas de 1,2 kg. Quelle est la masse totale en grammes ?",
    format: "short",
    expected: ["1550"],
    comparator: "number_equal",
    hint: "1,2 kg = 1200 g.",
    explanation:
      "L’ananas pèse 1,2 kg, soit 1200 g. La mangue pèse 350 g. On calcule 1200 g + 350 g = 1550 g.",
    tags: ["cm2", "masse", "defi", "reunion", "marche", "addition", "conversion", "short", "canvas"],
    canvas: objetsCanvas(
      [getObjet("Mangue"), getObjet("Ananas")],
      "Masse totale en grammes ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_masse_defi_fixed_7_reunion_coco_ananas",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Une noix de coco pèse 1,5 kg et un ananas pèse 1,2 kg. Quelle est la masse totale en kilogrammes ?",
    format: "qcm",
    choices: ["2,7 kg", "27 kg", "270 g", "1,7 kg"],
    expected: ["2,7 kg"],
    comparator: "mcq_exact",
    hint: "Additionne 1,5 kg + 1,2 kg.",
    explanation:
      "On calcule 1,5 kg + 1,2 kg = 2,7 kg. La masse totale est 2,7 kg.",
    tags: ["cm2", "masse", "defi", "reunion", "addition", "decimal", "qcm", "canvas"],
    canvas: objetsCanvas(
      [getObjet("Noix de coco"), getObjet("Ananas")],
      "Masse totale en kg ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_masse_defi_fixed_8_difference_livre_cahier",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un livre pèse 500 g et un cahier pèse 250 g. Quelle est la différence de masse ?",
    format: "short",
    expected: ["250"],
    comparator: "number_equal",
    hint: "Calcule 500 - 250.",
    explanation:
      "La différence de masse est 500 g - 250 g = 250 g.",
    tags: ["cm2", "masse", "defi", "difference", "soustraction", "short", "canvas"],
    canvas: balanceCanvas(
      getObjet("Livre"),
      getObjet("Cahier"),
      "Quelle est la différence de masse ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_masse_defi_fixed_9_difference_bouteille_riz",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_defi",
    difficulty: 4,
    theme: "cuisine",
    text: "Une bouteille d’eau pèse 1,5 kg et un paquet de riz pèse 1 kg. Quelle est la différence en grammes ?",
    format: "short",
    expected: ["500"],
    comparator: "number_equal",
    hint: "1,5 kg = 1500 g et 1 kg = 1000 g.",
    explanation:
      "1,5 kg = 1500 g et 1 kg = 1000 g. La différence est 1500 g - 1000 g = 500 g.",
    tags: ["cm2", "masse", "defi", "difference", "conversion", "cuisine", "short", "canvas"],
    canvas: balanceCanvas(
      getObjet("Bouteille d’eau"),
      getObjet("Paquet de riz"),
      "Différence en grammes ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_masse_defi_fixed_10_trouver_manquant",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un sac contient un livre de 500 g et un cahier. La masse totale est 750 g. Quelle est la masse du cahier ?",
    format: "short",
    expected: ["250"],
    comparator: "number_equal",
    hint: "Calcule 750 - 500.",
    explanation:
      "La masse totale est 750 g. Le livre pèse 500 g. Donc le cahier pèse 750 g - 500 g = 250 g.",
    tags: ["cm2", "masse", "defi", "masse_manquante", "soustraction", "short", "canvas"],
    canvas: objetsCanvas(
      [getObjet("Livre"), getObjet("Cahier")],
      "Masse du cahier ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_masse_defi_fixed_11_nombre_objets",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_defi",
    difficulty: 5,
    theme: "cuisine",
    text: "Un yaourt pèse 125 g. Quelle est la masse de 4 yaourts identiques ?",
    format: "short",
    expected: ["500"],
    comparator: "number_equal",
    hint: "Calcule 4 × 125.",
    explanation:
      "Un yaourt pèse 125 g. Pour 4 yaourts, on calcule 4 × 125 g = 500 g.",
    tags: ["cm2", "masse", "defi", "multiplication", "cuisine", "short", "canvas"],
    canvas: objetsCanvas(
      [getObjet("Yaourt"), getObjet("Yaourt"), getObjet("Yaourt"), getObjet("Yaourt")],
      "Masse de 4 yaourts ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_masse_defi_fixed_12_kg_et_g",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un colis pèse 2 kg 300 g. Quelle est sa masse en grammes ?",
    format: "short",
    expected: ["2300"],
    comparator: "number_equal",
    hint: "2 kg = 2000 g.",
    explanation:
      "2 kg = 2000 g. On ajoute 300 g : 2000 g + 300 g = 2300 g.",
    tags: ["cm2", "masse", "defi", "kg_g", "conversion", "short", "canvas"],
    canvas: conversionCanvas("2 kg 300 g", "2300 g"),
  },

  {
    kind: "fixed",
    id: "cm2_masse_defi_fixed_13_comparer_total",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Léo porte un livre de 500 g et une trousse de 200 g. Emma porte un cahier de 250 g et une gourde pleine de 600 g. Qui porte la masse la plus lourde ?",
    format: "qcm",
    choices: ["Emma", "Léo", "Ils portent la même masse", "Impossible"],
    expected: ["Emma"],
    comparator: "mcq_exact",
    hint: "Calcule la masse portée par chacun.",
    explanation:
      "Léo porte 500 g + 200 g = 700 g. Emma porte 250 g + 600 g = 850 g. Emma porte donc la masse la plus lourde.",
    tags: ["cm2", "masse", "defi", "comparer_total", "addition", "qcm", "canvas"],
    canvas: objetsCanvas(
      [
        getObjet("Livre"),
        getObjet("Trousse"),
        getObjet("Cahier"),
        getObjet("Gourde pleine"),
      ],
      "Qui porte la masse la plus lourde ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_masse_defi_fixed_14_erreur_unites",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : “1,5 kg est plus petit que 900 g car 1,5 est plus petit que 900.” A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Il faut comparer dans la même unité.",
    explanation:
      "Non. Il faut convertir avant de comparer. 1,5 kg = 1500 g, et 1500 g est plus grand que 900 g.",
    tags: ["cm2", "masse", "defi", "erreur", "unites", "qcm", "canvas"],
    canvas: conversionCanvas("1,5 kg", "1500 g", "Compare avec 900 g."),
  },

  {
    kind: "fixed",
    id: "cm2_masse_defi_fixed_15_erreur_estimation",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève estime qu’un cartable rempli pèse 30 g. Est-ce raisonnable ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "30 g, c’est la masse d’un petit objet comme une règle.",
    explanation:
      "Non. Un cartable rempli est beaucoup plus lourd que 30 g. Une masse de quelques kilogrammes est plus raisonnable.",
    tags: ["cm2", "masse", "defi", "erreur", "estimation", "qcm", "canvas"],
    canvas: estimationCanvas(
      getObjet("Cartable"),
      ["30 g", "3 kg", "300 kg"],
      "30 g est-il raisonnable ?"
    ),
  },

  {
    kind: "fixed",
    id: "cm2_masse_defi_fixed_16_open_methode_probleme",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique une méthode pour résoudre un problème avec des masses.",
    format: "open",
    expected: ["lire", "unités", "convertir", "même unité", "calcul", "réponse"],
    comparator: "contains_keyword",
    hint: "Pense aux unités avant de calculer.",
    explanation:
      "Pour résoudre un problème avec des masses, on lit la question, on repère les masses utiles, on convertit si les unités sont différentes, puis on effectue le calcul demandé et on rédige la réponse.",
    tags: ["cm2", "masse", "defi", "open", "methode", "probleme"],
  },

  {
    kind: "fixed",
    id: "cm2_masse_defi_fixed_17_open_justifier_comparaison",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi 1,2 kg est plus lourd que 900 g.",
    format: "open",
    expected: ["1,2 kg", "1200 g", "900 g", "plus lourd", "convertir"],
    comparator: "contains_keyword",
    hint: "Convertis 1,2 kg en grammes.",
    explanation:
      "1,2 kg = 1200 g. Comme 1200 g est plus grand que 900 g, 1,2 kg est plus lourd que 900 g.",
    tags: ["cm2", "masse", "defi", "open", "justifier", "conversion"],
  },

  {
    kind: "template",
    id: "cm2_masse_defi_tpl_1_additions",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Additionne les masses. Convertis si nécessaire.",
    tags: ["cm2", "masse", "defi", "template", "addition", "short", "canvas"],
    generate: () => {
      const situations = [
        {
          objets: [getObjet("Livre"), getObjet("Cahier")],
          text: "Un livre pèse 500 g et un cahier pèse 250 g. Quelle est la masse totale ?",
          expected: "750",
          explanation: "500 g + 250 g = 750 g.",
        },
        {
          objets: [getObjet("Pomme"), getObjet("Banane")],
          text: "Une pomme pèse 150 g et une banane pèse 120 g. Quelle est la masse totale ?",
          expected: "270",
          explanation: "150 g + 120 g = 270 g.",
        },
        {
          objets: [getObjet("Ballon"), getObjet("Gourde pleine")],
          text: "Un ballon pèse 450 g et une gourde pleine pèse 600 g. Quelle est la masse totale ?",
          expected: "1050",
          explanation: "450 g + 600 g = 1050 g.",
        },
        {
          objets: [getObjet("Ananas"), getObjet("Mangue")],
          text: "Un ananas pèse 1,2 kg et une mangue pèse 350 g. Quelle est la masse totale en grammes ?",
          expected: "1550",
          explanation: "1,2 kg = 1200 g. Donc 1200 g + 350 g = 1550 g.",
        },
      ];

      const item = randomChoice(situations);

      return {
        text: item.text,
        format: "short",
        expected: [item.expected],
        comparator: "number_equal",
        explanation: item.explanation,
        canvas: objetsCanvas(item.objets, "Masse totale ?"),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_masse_defi_tpl_2_differences",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Pour trouver une différence, soustrais la plus petite masse de la plus grande.",
    tags: ["cm2", "masse", "defi", "template", "difference", "short", "canvas"],
    generate: () => {
      const situations = [
        {
          a: getObjet("Livre"),
          b: getObjet("Cahier"),
          expected: "250",
          explanation: "500 g - 250 g = 250 g.",
        },
        {
          a: getObjet("Gourde pleine"),
          b: getObjet("Ballon"),
          expected: "150",
          explanation: "600 g - 450 g = 150 g.",
        },
        {
          a: getObjet("Bouteille d’eau"),
          b: getObjet("Paquet de riz"),
          expected: "500",
          explanation: "1,5 kg = 1500 g et 1 kg = 1000 g. Donc 1500 g - 1000 g = 500 g.",
        },
        {
          a: getObjet("Ananas"),
          b: getObjet("Mangue"),
          expected: "850",
          explanation: "1,2 kg = 1200 g. Donc 1200 g - 350 g = 850 g.",
        },
      ];

      const item = randomChoice(situations);

      return {
        text: `Quelle est la différence de masse entre ${item.a.label} et ${item.b.label} ?`,
        format: "short",
        expected: [item.expected],
        comparator: "number_equal",
        explanation: item.explanation,
        canvas: balanceCanvas(
          item.a,
          item.b,
          "Différence de masse en grammes ?"
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_masse_defi_tpl_3_comparer_totaux",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Calcule chaque total avant de comparer.",
    tags: ["cm2", "masse", "defi", "template", "comparer_totaux", "qcm", "canvas"],
    generate: () => {
      const situations = [
        {
          text: "Léo porte un livre et une trousse. Emma porte un cahier et une gourde pleine. Qui porte le plus lourd ?",
          expected: "Emma",
          choices: ["Emma", "Léo", "Même masse", "Impossible"],
          explanation:
            "Léo porte 500 g + 200 g = 700 g. Emma porte 250 g + 600 g = 850 g. Emma porte le plus lourd.",
          objets: [
            getObjet("Livre"),
            getObjet("Trousse"),
            getObjet("Cahier"),
            getObjet("Gourde pleine"),
          ],
        },
        {
          text: "Nina porte une pomme et un yaourt. Sami porte une banane et une tablette de chocolat. Qui porte le plus lourd ?",
          expected: "Nina",
          choices: ["Nina", "Sami", "Même masse", "Impossible"],
          explanation:
            "Nina porte 150 g + 125 g = 275 g. Sami porte 120 g + 100 g = 220 g. Nina porte le plus lourd.",
          objets: [
            getObjet("Pomme"),
            getObjet("Yaourt"),
            getObjet("Banane"),
            getObjet("Tablette de chocolat"),
          ],
        },
        {
          text: "Aïcha porte un paquet de riz. Malo porte deux livres. Qui porte le plus lourd ?",
          expected: "Même masse",
          choices: ["Même masse", "Aïcha", "Malo", "Impossible"],
          explanation:
            "Aïcha porte 1 kg = 1000 g. Malo porte 2 livres de 500 g, donc 1000 g. Ils portent la même masse.",
          objets: [
            getObjet("Paquet de riz"),
            getObjet("Livre"),
            getObjet("Livre"),
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
        canvas: objetsCanvas(item.objets, "Compare les masses totales."),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_masse_defi_tpl_4_erreurs",
    niveau: "cm2",
    matiere: "maths",
    notionId: "masse",
    microId: "masse_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Vérifie les unités ou l’ordre de grandeur.",
    tags: ["cm2", "masse", "defi", "template", "erreur", "qcm", "canvas"],
    generate: () => {
      const situations = [
        {
          text: "Un élève dit : “500 g est plus lourd que 1 kg.” A-t-il raison ?",
          expected: "non",
          explanation:
            "Non. 1 kg = 1000 g, donc 1 kg est plus lourd que 500 g.",
          canvas: conversionCanvas("1 kg", "1000 g", "Compare avec 500 g."),
        },
        {
          text: "Un élève dit : “2 kg = 200 g.” A-t-il raison ?",
          expected: "non",
          explanation:
            "Non. 2 kg = 2000 g, pas 200 g.",
          canvas: conversionCanvas("2 kg", "2000 g"),
        },
        {
          text: "Un élève dit : “Un crayon peut peser 10 g.” Est-ce raisonnable ?",
          expected: "oui",
          explanation:
            "Oui. Un crayon est un petit objet léger. 10 g est raisonnable.",
          canvas: estimationCanvas(
            getObjet("Crayon"),
            ["10 g", "10 kg", "100 kg"],
            "10 g est-il raisonnable ?"
          ),
        },
        {
          text: "Un élève dit : “Un cartable rempli peut peser 30 g.” Est-ce raisonnable ?",
          expected: "non",
          explanation:
            "Non. 30 g est beaucoup trop léger pour un cartable rempli.",
          canvas: estimationCanvas(
            getObjet("Cartable"),
            ["30 g", "3 kg", "300 kg"],
            "30 g est-il raisonnable ?"
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
