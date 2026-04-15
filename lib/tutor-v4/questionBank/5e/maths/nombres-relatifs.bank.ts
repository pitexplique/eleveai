// knowledge/maths/5e/nombres_relatifs.bank.ts

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function formatSigned(n: number): string {
  return n > 0 ? `+${n}` : String(n);
}

function signedChoices(values: number[]): string[] {
  return values.map((v) => formatSigned(v));
}

function uniqueNumbers(values: number[]): number[] {
  return Array.from(new Set(values));
}

export const nombresRelatifsBank: TutorBankItemV4[] = [
  // =========================
  // RELATIF_LIRE
  // =========================
  {
    kind: "fixed",
    id: "relatif_lire_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "nombres_relatifs",
    microId: "relatif_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Écris avec son signe : 4 au-dessus de zéro.",
    format: "short",
    expected: ["+4", "4"],
    comparator: "number_equal",
    hint: "Un nombre au-dessus de zéro est positif.",
    explanation:
      "Un nombre situé au-dessus de zéro est positif. On peut l’écrire +4. Dans beaucoup de cas, 4 et +4 désignent le même nombre.",
    tags: ["relatifs", "lecture", "positif"],
  },
  {
    kind: "fixed",
    id: "relatif_lire_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "nombres_relatifs",
    microId: "relatif_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Écris avec son signe : 7 au-dessous de zéro.",
    format: "short",
    expected: ["-7"],
    comparator: "number_equal",
    hint: "Un nombre au-dessous de zéro est négatif.",
    explanation:
      "Un nombre situé au-dessous de zéro est négatif. Il s’écrit avec le signe -, donc -7.",
    tags: ["relatifs", "lecture", "negatif"],
  },
  {
    kind: "fixed",
    id: "relatif_lire_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "nombres_relatifs",
    microId: "relatif_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Parmi ces écritures, laquelle désigne un nombre négatif ?",
    format: "qcm",
    choices: ["+6", "6", "-6", "0"],
    expected: ["-6"],
    comparator: "mcq_exact",
    hint: "Cherche le signe -.",
    explanation:
      "Le signe - indique un nombre négatif. Ici, seul -6 est négatif.",
    tags: ["relatifs", "lecture", "qcm"],
  },
  {
    kind: "fixed",
    id: "relatif_lire_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "nombres_relatifs",
    microId: "relatif_lire",
    difficulty: 2,
    theme: "reunion",
    text: "La température au volcan est de 3 °C en dessous de zéro. Écris cette température.",
    format: "short",
    expected: ["-3", "-3°C", "-3 °C"],
    comparator: "contains_keyword",
    hint: "En dessous de zéro → signe -.",
    explanation:
      "Une température en dessous de zéro est négative. 3 °C en dessous de zéro s’écrit -3 °C.",
    tags: ["relatifs", "lecture", "reunion", "temperature"],
  },
  {
    kind: "fixed",
    id: "relatif_lire_fixed_5",
    niveau: "5e",
    matiere: "maths",
    notionId: "nombres_relatifs",
    microId: "relatif_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle écriture correspond à « moins huit » ?",
    format: "qcm",
    choices: ["8", "+8", "-8", "0"],
    expected: ["-8"],
    comparator: "mcq_exact",
    hint: "Le mot « moins » correspond au signe -.",
    explanation:
      "« Moins huit » signifie que le nombre est négatif. Il s’écrit -8.",
    tags: ["relatifs", "lecture", "qcm"],
  },

  // =========================
  // RELATIF_SIGNE
  // =========================
  {
    kind: "fixed",
    id: "relatif_signe_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "nombres_relatifs",
    microId: "relatif_signe",
    difficulty: 1,
    theme: "neutral",
    text: "Le nombre -5 est-il positif ou négatif ?",
    format: "qcm",
    choices: ["positif", "négatif"],
    expected: ["négatif"],
    comparator: "mcq_exact",
    hint: "Le signe - indique un nombre négatif.",
    explanation:
      "Le nombre -5 porte le signe -. Il est donc négatif.",
    tags: ["relatifs", "signe", "qcm"],
  },
  {
    kind: "fixed",
    id: "relatif_signe_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "nombres_relatifs",
    microId: "relatif_signe",
    difficulty: 1,
    theme: "neutral",
    text: "Le nombre +9 est-il positif ou négatif ?",
    format: "qcm",
    choices: ["positif", "négatif"],
    expected: ["positif"],
    comparator: "mcq_exact",
    hint: "Le signe + indique un nombre positif.",
    explanation:
      "Le nombre +9 porte le signe +. Il est donc positif.",
    tags: ["relatifs", "signe", "qcm"],
  },
  {
    kind: "fixed",
    id: "relatif_signe_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "nombres_relatifs",
    microId: "relatif_signe",
    difficulty: 2,
    theme: "neutral",
    text: "Le nombre 0 est-il positif, négatif, ou ni l’un ni l’autre ?",
    format: "qcm",
    choices: ["positif", "négatif", "ni l’un ni l’autre"],
    expected: ["ni l’un ni l’autre"],
    comparator: "mcq_exact",
    hint: "0 est la frontière entre les positifs et les négatifs.",
    explanation:
      "0 n’est ni positif ni négatif. Il sépare les nombres positifs et les nombres négatifs.",
    tags: ["relatifs", "signe", "zero", "qcm"],
  },
  {
    kind: "fixed",
    id: "relatif_signe_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "nombres_relatifs",
    microId: "relatif_signe",
    difficulty: 2,
    theme: "neutral",
    text: "Complète : un nombre situé à gauche de 0 sur une droite graduée est ...",
    format: "short",
    expected: ["négatif", "negatif"],
    comparator: "contains_keyword",
    hint: "À gauche de 0 → signe -.",
    explanation:
      "Sur une droite graduée, les nombres situés à gauche de 0 sont négatifs.",
    tags: ["relatifs", "signe", "droite"],
  },

  // =========================
  // RELATIF_COMPARER
  // =========================
  {
    kind: "fixed",
    id: "relatif_comparer_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "nombres_relatifs",
    microId: "relatif_comparer",
    difficulty: 1,
    theme: "neutral",
    text: "Quel nombre est le plus grand : -2 ou +3 ?",
    format: "short",
    expected: ["+3", "3"],
    comparator: "number_equal",
    hint: "Tout nombre positif est plus grand que tout nombre négatif.",
    explanation:
      "Tout nombre positif est plus grand que tout nombre négatif. Donc +3 est plus grand que -2.",
    tags: ["relatifs", "comparaison"],
  },
  {
    kind: "fixed",
    id: "relatif_comparer_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "nombres_relatifs",
    microId: "relatif_comparer",
    difficulty: 1,
    theme: "neutral",
    text: "Quel nombre est le plus petit : -5 ou -1 ?",
    format: "short",
    expected: ["-5"],
    comparator: "number_equal",
    hint: "Parmi les nombres négatifs, celui qui est le plus à gauche est le plus petit.",
    explanation:
      "Sur une droite graduée, -5 est à gauche de -1. Donc -5 est plus petit que -1.",
    tags: ["relatifs", "comparaison"],
  },
  {
    kind: "fixed",
    id: "relatif_comparer_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "nombres_relatifs",
    microId: "relatif_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Complète avec > ou < : -3 ... +1",
    format: "short",
    expected: ["<"],
    comparator: "exact_text",
    hint: "Un nombre négatif est inférieur à un nombre positif.",
    explanation:
      "-3 est négatif et +1 est positif. Donc -3 < +1.",
    tags: ["relatifs", "comparaison", "inegalite"],
  },
  {
    kind: "fixed",
    id: "relatif_comparer_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "nombres_relatifs",
    microId: "relatif_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Complète avec > ou < : -4 ... -7",
    format: "short",
    expected: [">"],
    comparator: "exact_text",
    hint: "Le nombre le plus proche de 0 est le plus grand parmi deux négatifs.",
    explanation:
      "Parmi deux nombres négatifs, le plus proche de 0 est le plus grand. Comme -4 est plus proche de 0 que -7, on a -4 > -7.",
    tags: ["relatifs", "comparaison", "inegalite"],
  },
  {
    kind: "fixed",
    id: "relatif_comparer_fixed_5",
    niveau: "5e",
    matiere: "maths",
    notionId: "nombres_relatifs",
    microId: "relatif_comparer",
    difficulty: 2,
    theme: "reunion",
    text: "Au Maïdo, il fait -1 °C le matin et +6 °C l’après-midi. Quelle température est la plus grande ?",
    format: "short",
    expected: ["+6", "6", "+6 °C", "6 °C"],
    comparator: "contains_keyword",
    hint: "Une température positive est plus grande qu’une température négative.",
    explanation:
      "Une température positive est toujours plus grande qu’une température négative. Donc +6 °C est plus grand que -1 °C.",
    tags: ["relatifs", "comparaison", "reunion", "temperature"],
  },
  {
    kind: "fixed",
    id: "relatif_comparer_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "nombres_relatifs",
    microId: "relatif_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel nombre est le plus grand ?",
    format: "qcm",
    choices: ["-8", "-3", "0", "-1"],
    expected: ["0"],
    comparator: "mcq_exact",
    hint: "0 est plus grand que tous les nombres négatifs.",
    explanation:
      "Parmi -8, -3, 0 et -1, seul 0 n’est pas négatif. Il est donc le plus grand.",
    tags: ["relatifs", "comparaison", "qcm"],
  },

  // =========================
  // RELATIF_PLACER
  // =========================
  {
    kind: "fixed",
    id: "relatif_placer_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "nombres_relatifs",
    microId: "relatif_placer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel point correspond au nombre -3 ?",
    format: "qcm",
    choices: ["A", "B", "C", "D"],
    expected: ["A"],
    comparator: "mcq_exact",
    hint: "Cherche le point placé au-dessus de -3.",
    explanation:
      "Sur la droite graduée, le point A est placé au-dessus de -3. Donc A correspond à -3.",
    tags: ["relatifs", "placement", "qcm", "canvas"],
    canvas: {
      kind: "number_line",
      min: -5,
      max: 5,
      step: 1,
      points: [
        { value: -3, label: "A" },
        { value: -1, label: "B" },
        { value: 2, label: "C" },
        { value: 4, label: "D" },
      ],
      display: {
        showTicks: true,
        showValues: true,
        showPoints: true,
        showPointLabels: true,
        showZero: true,
      },
    },
  },
  {
    kind: "fixed",
    id: "relatif_placer_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "nombres_relatifs",
    microId: "relatif_placer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est l’abscisse du point B ?",
    format: "short",
    expected: ["-2"],
    comparator: "number_equal",
    hint: "Lis le nombre situé sous le point B.",
    explanation:
      "Le point B est placé au-dessus de -2. Son abscisse est donc -2.",
    tags: ["relatifs", "placement", "abscisse", "canvas"],
    canvas: {
      kind: "number_line",
      min: -4,
      max: 4,
      step: 1,
      points: [{ value: -2, label: "B" }],
      display: {
        showTicks: true,
        showValues: true,
        showPoints: true,
        showPointLabels: true,
        showZero: true,
      },
    },
  },
  {
    kind: "fixed",
    id: "relatif_placer_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "nombres_relatifs",
    microId: "relatif_placer",
    difficulty: 3,
    theme: "neutral",
    text: "Parmi A, B et C, quel point est le plus à droite ?",
    format: "qcm",
    choices: ["A", "B", "C"],
    expected: ["C"],
    comparator: "mcq_exact",
    hint: "Le point le plus à droite correspond au plus grand nombre.",
    explanation:
      "Le point le plus à droite représente le plus grand nombre. Ici, C est le plus à droite.",
    tags: ["relatifs", "placement", "comparaison", "canvas", "qcm"],
    canvas: {
      kind: "number_line",
      min: -5,
      max: 5,
      step: 1,
      points: [
        { value: -4, label: "A" },
        { value: 0, label: "B" },
        { value: 3, label: "C" },
      ],
      display: {
        showTicks: true,
        showValues: true,
        showPoints: true,
        showPointLabels: true,
        showZero: true,
      },
    },
  },
  {
    kind: "fixed",
    id: "relatif_placer_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "nombres_relatifs",
    microId: "relatif_placer",
    difficulty: 3,
    theme: "neutral",
    text: "Quel point correspond au nombre le plus petit ?",
    format: "qcm",
    choices: ["A", "B", "C", "D"],
    expected: ["D"],
    comparator: "mcq_exact",
    hint: "Le plus petit est le plus à gauche.",
    explanation:
      "Sur une droite graduée, le plus petit nombre est celui qui est placé le plus à gauche. Ici, c’est le point D.",
    tags: ["relatifs", "placement", "comparaison", "canvas", "qcm"],
    canvas: {
      kind: "number_line",
      min: -6,
      max: 4,
      step: 1,
      points: [
        { value: -1, label: "A" },
        { value: 2, label: "B" },
        { value: 0, label: "C" },
        { value: -5, label: "D" },
      ],
      display: {
        showTicks: true,
        showValues: true,
        showPoints: true,
        showPointLabels: true,
        showZero: true,
      },
    },
  },

  // =========================
  // RELATIF_OPPOSES
  // =========================
  {
    kind: "fixed",
    id: "relatif_opposes_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "nombres_relatifs",
    microId: "relatif_opposes",
    difficulty: 1,
    theme: "neutral",
    text: "Quel est l’opposé de +4 ?",
    format: "short",
    expected: ["-4"],
    comparator: "number_equal",
    hint: "L’opposé a la même distance à 0, mais de l’autre côté.",
    explanation:
      "L’opposé de +4 est le nombre situé à la même distance de 0, mais de l’autre côté. C’est -4.",
    tags: ["relatifs", "opposes"],
  },
  {
    kind: "fixed",
    id: "relatif_opposes_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "nombres_relatifs",
    microId: "relatif_opposes",
    difficulty: 1,
    theme: "neutral",
    text: "Quel est l’opposé de -7 ?",
    format: "short",
    expected: ["+7", "7"],
    comparator: "number_equal",
    hint: "On change seulement le signe.",
    explanation:
      "L’opposé de -7 est +7. Les deux nombres sont symétriques par rapport à 0.",
    tags: ["relatifs", "opposes"],
  },
  {
    kind: "fixed",
    id: "relatif_opposes_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "nombres_relatifs",
    microId: "relatif_opposes",
    difficulty: 2,
    theme: "neutral",
    text: "L’opposé de 0 est ...",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "0 est déjà au centre.",
    explanation:
      "0 est à la fois à gauche et à droite de lui-même. Son opposé est donc 0.",
    tags: ["relatifs", "opposes", "zero"],
  },
  {
    kind: "fixed",
    id: "relatif_opposes_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "nombres_relatifs",
    microId: "relatif_opposes",
    difficulty: 2,
    theme: "neutral",
    text: "Deux nombres opposés ont-ils le même signe ?",
    format: "qcm",
    choices: ["oui", "non", "parfois"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "L’un est à gauche de 0, l’autre à droite, sauf pour 0.",
    explanation:
      "Deux nombres opposés sont symétriques par rapport à 0. En général, ils n’ont pas le même signe. Le seul cas particulier est 0, qui est son propre opposé.",
    tags: ["relatifs", "opposes", "qcm"],
  },

  // =========================
  // RELATIF_VALEUR_ABSOLUE
  // =========================
  {
    kind: "fixed",
    id: "relatif_valeur_absolue_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "nombres_relatifs",
    microId: "relatif_valeur_absolue",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la valeur absolue de -5 ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "La valeur absolue est la distance à 0.",
    explanation:
      "La valeur absolue de -5 est sa distance à 0. Cette distance vaut 5.",
    tags: ["relatifs", "valeur_absolue"],
  },
  {
    kind: "fixed",
    id: "relatif_valeur_absolue_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "nombres_relatifs",
    microId: "relatif_valeur_absolue",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la valeur absolue de +8 ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "On mesure la distance entre le nombre et 0.",
    explanation:
      "La valeur absolue de +8 est sa distance à 0. Cette distance vaut 8.",
    tags: ["relatifs", "valeur_absolue"],
  },
  {
    kind: "fixed",
    id: "relatif_valeur_absolue_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "nombres_relatifs",
    microId: "relatif_valeur_absolue",
    difficulty: 3,
    theme: "neutral",
    text: "Les nombres -6 et +6 ont-ils la même valeur absolue ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Ils sont à la même distance de 0.",
    explanation:
      "-6 et +6 sont opposés. Ils sont à la même distance de 0. Leur valeur absolue est donc la même : 6.",
    tags: ["relatifs", "valeur_absolue", "qcm"],
  },
  {
    kind: "fixed",
    id: "relatif_valeur_absolue_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "nombres_relatifs",
    microId: "relatif_valeur_absolue",
    difficulty: 3,
    theme: "neutral",
    text: "Quel nombre a pour valeur absolue 4 ?",
    format: "qcm",
    choices: ["-4", "+4", "-4 et +4", "0"],
    expected: ["-4 et +4"],
    comparator: "mcq_exact",
    hint: "Deux nombres opposés peuvent avoir la même valeur absolue.",
    explanation:
      "La valeur absolue mesure seulement la distance à 0. Les nombres -4 et +4 sont tous les deux à distance 4 de 0.",
    tags: ["relatifs", "valeur_absolue", "qcm"],
  },

  // =========================
  // RELATIF_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "relatif_defis_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "nombres_relatifs",
    microId: "relatif_defis",
    difficulty: 3,
    theme: "neutral",
    text: "Je suis un nombre négatif. Mon opposé est 6. Qui suis-je ?",
    format: "short",
    expected: ["-6"],
    comparator: "number_equal",
    hint: "Si son opposé est 6, alors le nombre se trouve de l’autre côté de 0.",
    explanation:
      "Le nombre dont l’opposé est 6 est -6. En effet, -6 et +6 sont opposés.",
    tags: ["relatifs", "defi", "opposes"],
  },
  {
    kind: "fixed",
    id: "relatif_defis_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "nombres_relatifs",
    microId: "relatif_defis",
    difficulty: 4,
    theme: "neutral",
    text: "Trouve un nombre négatif plus grand que -5 et plus petit que -2.",
    format: "short",
    expected: ["-4", "-3"],
    comparator: "number_equal",
    hint: "Cherche un entier compris entre -5 et -2.",
    explanation:
      "Les entiers négatifs strictement compris entre -5 et -2 sont -4 et -3. L’un de ces deux nombres convient.",
    tags: ["relatifs", "defi", "comparaison", "encadrement"],
  },
  {
    kind: "fixed",
    id: "relatif_defis_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "nombres_relatifs",
    microId: "relatif_defis",
    difficulty: 4,
    theme: "neutral",
    text: "Sur une droite graduée, A a pour abscisse -4 et B a pour abscisse +1. Quelle est la distance entre A et B ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Compte le nombre d’unités entre -4 et +1.",
    explanation:
      "Pour aller de -4 à 0, il faut 4 unités. Puis de 0 à +1, il faut encore 1 unité. La distance totale est 5.",
    tags: ["relatifs", "defi", "distance", "droite"],
  },
  {
    kind: "fixed",
    id: "relatif_defis_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "nombres_relatifs",
    microId: "relatif_defis",
    difficulty: 5,
    theme: "neutral",
    text: "Trouve deux nombres différents qui ont la même valeur absolue et dont l’un est plus grand que 0.",
    format: "short",
    expected: ["-3 et 3", "-4 et 4", "-5 et 5", "-6 et 6", "-7 et 7"],
    comparator: "contains_keyword",
    hint: "Pense à deux nombres opposés.",
    explanation:
      "Deux nombres opposés ont la même valeur absolue. Par exemple -3 et +3 ont tous les deux pour valeur absolue 3.",
    tags: ["relatifs", "defi", "valeur_absolue", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "relatif_defis_fixed_5",
    niveau: "5e",
    matiere: "maths",
    notionId: "nombres_relatifs",
    microId: "relatif_defis",
    difficulty: 5,
    theme: "reunion",
    text: "Au lever du jour, la température au sommet est de -2 °C. Elle augmente de 5 degrés dans la matinée puis redescend de 3 degrés le soir. Quelle est la température finale ?",
    format: "short",
    expected: ["0", "0°C", "0 °C"],
    comparator: "contains_keyword",
    hint: "Pars de -2, puis ajoute 5, puis enlève 3.",
    explanation:
      "On part de -2. Après une hausse de 5 degrés, on obtient 3. Puis on enlève 3 degrés : on revient à 0. La température finale est donc 0 °C.",
    tags: ["relatifs", "defi", "reunion", "temperature", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "relatif_defis_fixed_6",
    niveau: "5e",
    matiere: "maths",
    notionId: "nombres_relatifs",
    microId: "relatif_defis",
    difficulty: 5,
    theme: "neutral",
    text: "Je suis un nombre. Je suis négatif, mon opposé est plus petit que 10, et ma valeur absolue vaut 9. Qui suis-je ?",
    format: "short",
    expected: ["-9"],
    comparator: "number_equal",
    hint: "Si la valeur absolue vaut 9 et que le nombre est négatif, il n’y a qu’une possibilité.",
    explanation:
      "Avoir une valeur absolue de 9 signifie être à distance 9 de 0 : le nombre est donc -9 ou +9. Comme on sait qu’il est négatif, c’est -9. Son opposé est +9, qui est bien plus petit que 10.",
    tags: ["relatifs", "defi", "valeur_absolue", "opposes", "raisonnement"],
  },

  // =========================
  // TEMPLATES - RELATIF_LIRE
  // =========================
  {
    kind: "template",
    id: "relatif_lire_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "nombres_relatifs",
    microId: "relatif_lire",
    difficulty: 1,
    theme: "neutral",
    hint: "Au-dessus de zéro → positif ; au-dessous de zéro → négatif.",
    tags: ["relatifs", "lecture", "template"],
    generate: () => {
      const n = [1, 2, 3, 4, 5, 6, 7, 8, 9][
        Math.floor(Math.random() * 9)
      ];
      const positive = Math.random() < 0.5;
      const answer = positive ? `+${n}` : `-${n}`;
      const desc = positive
        ? `${n} au-dessus de zéro`
        : `${n} au-dessous de zéro`;

      return {
        text: `Écris avec son signe : ${desc}.`,
        format: "short",
        expected: positive ? [`+${n}`, String(n)] : [`-${n}`],
        comparator: "number_equal",
        explanation: positive
          ? `${n} au-dessus de zéro est un nombre positif. Il s’écrit ${answer}.`
          : `${n} au-dessous de zéro est un nombre négatif. Il s’écrit ${answer}.`,
      };
    },
  },

  // =========================
  // TEMPLATES - RELATIF_SIGNE
  // =========================
  {
    kind: "template",
    id: "relatif_signe_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "nombres_relatifs",
    microId: "relatif_signe",
    difficulty: 1,
    theme: "neutral",
    hint: "Regarde le signe du nombre.",
    tags: ["relatifs", "signe", "template"],
    generate: () => {
      const n = [1, 2, 3, 4, 5, 6, 7, 8, 9][
        Math.floor(Math.random() * 9)
      ];
      const positive = Math.random() < 0.5;
      const displayed = positive ? `+${n}` : `-${n}`;
      const expected = positive ? "positif" : "négatif";

      return {
        text: `Le nombre ${displayed} est-il positif ou négatif ?`,
        format: "qcm",
        choices: ["positif", "négatif"],
        expected: [expected],
        comparator: "mcq_exact",
        explanation: `Le nombre ${displayed} porte le signe ${
          positive ? "+" : "-"
        }. Il est donc ${expected}.`,
      };
    },
  },

  // =========================
  // TEMPLATES - RELATIF_COMPARER
  // =========================
  {
    kind: "template",
    id: "relatif_comparer_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "nombres_relatifs",
    microId: "relatif_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Sur une droite graduée, le plus grand est le plus à droite.",
    tags: ["relatifs", "comparaison", "template"],
    generate: () => {
      let a = Math.floor(Math.random() * 13) - 6;
      let b = Math.floor(Math.random() * 13) - 6;
      while (a === b) {
        b = Math.floor(Math.random() * 13) - 6;
      }
      const max = Math.max(a, b);

      return {
        text: `Quel nombre est le plus grand : ${formatSigned(a)} ou ${formatSigned(
          b
        )} ?`,
        format: "short",
        expected: [formatSigned(max), String(max)],
        comparator: "number_equal",
        explanation: `Sur une droite graduée, le plus grand nombre est le plus à droite. Ici, le plus grand est ${formatSigned(
          max
        )}.`,
      };
    },
  },
  {
    kind: "template",
    id: "relatif_comparer_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "nombres_relatifs",
    microId: "relatif_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Parmi deux nombres négatifs, le plus proche de 0 est le plus grand.",
    tags: ["relatifs", "comparaison", "inegalite", "template"],
    generate: () => {
      let a = -(Math.floor(Math.random() * 8) + 1);
      let b = -(Math.floor(Math.random() * 8) + 1);
      while (a === b) {
        b = -(Math.floor(Math.random() * 8) + 1);
      }
      const sign = a > b ? ">" : "<";

      return {
        text: `Complète avec > ou < : ${a} ... ${b}`,
        format: "short",
        expected: [sign],
        comparator: "exact_text",
        explanation:
          sign === ">"
            ? `${a} est plus proche de 0 que ${b}, donc ${a} > ${b}.`
            : `${a} est plus à gauche que ${b}, donc ${a} < ${b}.`,
      };
    },
  },

  // =========================
  // TEMPLATES - RELATIF_PLACER
  // =========================
  {
    kind: "template",
    id: "relatif_placer_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "nombres_relatifs",
    microId: "relatif_placer",
    difficulty: 3,
    theme: "neutral",
    hint: "Lis l’abscisse du point sur la droite graduée.",
    tags: ["relatifs", "placement", "canvas", "template"],
    generate: () => {
      const value = Math.floor(Math.random() * 9) - 4;
      const label = ["A", "B", "C"][Math.floor(Math.random() * 3)];

      return {
        text: `Quelle est l’abscisse du point ${label} ?`,
        format: "short",
        expected: [String(value), formatSigned(value)],
        comparator: "number_equal",
        explanation: `Le point ${label} est placé au-dessus de ${formatSigned(
          value
        )}. Son abscisse est donc ${formatSigned(value)}.`,
        canvas: {
          kind: "number_line",
          min: -5,
          max: 5,
          step: 1,
          points: [{ value, label }],
          display: {
            showTicks: true,
            showValues: true,
            showPoints: true,
            showPointLabels: true,
            showZero: true,
          },
        },
      };
    },
  },
  {
    kind: "template",
    id: "relatif_placer_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "nombres_relatifs",
    microId: "relatif_placer",
    difficulty: 3,
    theme: "neutral",
    hint: "Le point le plus à droite correspond au plus grand nombre.",
    tags: ["relatifs", "placement", "comparaison", "canvas", "template"],
    generate: () => {
      const values = uniqueNumbers([
        Math.floor(Math.random() * 11) - 5,
        Math.floor(Math.random() * 11) - 5,
        Math.floor(Math.random() * 11) - 5,
      ]);
      while (values.length < 3) {
        values.push(Math.floor(Math.random() * 11) - 5);
      }
      const cleaned = uniqueNumbers(values).slice(0, 3);
      const labels = ["A", "B", "C"];
      const pairs = cleaned.map((v, i) => ({ value: v, label: labels[i] }));
      const maxPoint = pairs.reduce((best, curr) =>
        curr.value > best.value ? curr : best
      );

      return {
        text: "Quel point est le plus à droite ?",
        format: "qcm",
        choices: labels,
        expected: [maxPoint.label],
        comparator: "mcq_exact",
        explanation: `Le point le plus à droite représente le plus grand nombre. Ici, c’est ${maxPoint.label}.`,
        canvas: {
          kind: "number_line",
          min: -5,
          max: 5,
          step: 1,
          points: pairs,
          display: {
            showTicks: true,
            showValues: true,
            showPoints: true,
            showPointLabels: true,
            showZero: true,
          },
        },
      };
    },
  },

  // =========================
  // TEMPLATES - RELATIF_OPPOSES
  // =========================
  {
    kind: "template",
    id: "relatif_opposes_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "nombres_relatifs",
    microId: "relatif_opposes",
    difficulty: 2,
    theme: "neutral",
    hint: "L’opposé a la même distance à 0, mais de l’autre côté.",
    tags: ["relatifs", "opposes", "template"],
    generate: () => {
      const n = Math.floor(Math.random() * 9) + 1;
      const positive = Math.random() < 0.5;
      const shown = positive ? `+${n}` : `-${n}`;
      const opposite = positive ? `-${n}` : `+${n}`;

      return {
        text: `Quel est l’opposé de ${shown} ?`,
        format: "short",
        expected: positive ? [`-${n}`] : [`+${n}`, String(n)],
        comparator: "number_equal",
        explanation: `L’opposé de ${shown} est ${opposite}. Les deux nombres sont symétriques par rapport à 0.`,
      };
    },
  },

  // =========================
  // TEMPLATES - RELATIF_VALEUR_ABSOLUE
  // =========================
  {
    kind: "template",
    id: "relatif_valeur_absolue_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "nombres_relatifs",
    microId: "relatif_valeur_absolue",
    difficulty: 3,
    theme: "neutral",
    hint: "La valeur absolue est la distance à 0.",
    tags: ["relatifs", "valeur_absolue", "template"],
    generate: () => {
      const n = Math.floor(Math.random() * 9) + 1;
      const sign = Math.random() < 0.5 ? -1 : 1;
      const shown = sign === 1 ? `+${n}` : `-${n}`;

      return {
        text: `Quelle est la valeur absolue de ${shown} ?`,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation: `La valeur absolue mesure la distance à 0. ${shown} est à distance ${n} de 0, donc sa valeur absolue est ${n}.`,
      };
    },
  },
  {
    kind: "template",
    id: "relatif_valeur_absolue_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "nombres_relatifs",
    microId: "relatif_valeur_absolue",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux nombres opposés ont la même valeur absolue.",
    tags: ["relatifs", "valeur_absolue", "qcm", "template"],
    generate: () => {
      const n = Math.floor(Math.random() * 9) + 1;
      const choices = shuffle([
        `-${n}`,
        `+${n}`,
        `-${n} et +${n}`,
        "0",
      ]);

      return {
        text: `Quel nombre a pour valeur absolue ${n} ?`,
        format: "qcm",
        choices,
        expected: [`-${n} et +${n}`],
        comparator: "mcq_exact",
        explanation: `Les nombres ${-n} et +${n} sont tous les deux à distance ${n} de 0. Ils ont donc pour valeur absolue ${n}.`,
      };
    },
  },

  // =========================
  // TEMPLATES - RELATIF_DEFIS
  // =========================
{
  kind: "template",
  id: "relatif_defis_tpl_1",
  niveau: "5e",
  matiere: "maths",
  notionId: "nombres_relatifs",
  microId: "relatif_defis",
  difficulty: 4,
  theme: "neutral",
  hint: "Cherche un nombre situé à une certaine distance de 0 et repère sa position.",
  tags: ["relatifs", "defi", "raisonnement", "distance", "droite_graduee", "template"],
  generate: () => {
    const distance = Math.floor(Math.random() * 5) + 3; // 3 à 7
    const isPositive = Math.random() < 0.5;

    const number = isPositive ? distance : -distance;

    const positionText = isPositive
      ? `à droite de 0 mais à gauche de ${distance + 1}`
      : `à gauche de 0 mais à droite de -${distance + 1}`;

    const explanationPosition = isPositive
      ? `Comme il est à droite de 0, le nombre est positif : ${distance}.`
      : `Comme il est à gauche de 0, le nombre est négatif : -${distance}.`;

    return {
      text: `Je suis un nombre. Je suis à ${distance} unités de 0 sur la droite graduée. Je suis ${positionText}. Qui suis-je ?`,
      format: "short",
      expected: [String(number)],
      comparator: "number_equal",
      explanation: `Être à ${distance} unités de 0 signifie que le nombre peut être ${distance} ou -${distance}. ${explanationPosition}`,
    };
  },
},
  {
    kind: "template",
    id: "relatif_defis_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "nombres_relatifs",
    microId: "relatif_defis",
    difficulty: 5,
    theme: "neutral",
    hint: "La distance entre deux points sur la droite se calcule en comptant les unités.",
    tags: ["relatifs", "defi", "distance", "template"],
    generate: () => {
      let a = Math.floor(Math.random() * 7) - 5;
      let b = Math.floor(Math.random() * 7) + 1;
      while (a >= b) {
        a = Math.floor(Math.random() * 7) - 5;
        b = Math.floor(Math.random() * 7) + 1;
      }
      const distance = b - a;

      return {
        text: `Sur une droite graduée, A a pour abscisse ${a} et B a pour abscisse ${b}. Quelle est la distance entre A et B ?`,
        format: "short",
        expected: [String(distance)],
        comparator: "number_equal",
        explanation: `Pour aller de ${a} à ${b}, on compte ${distance} unités. La distance entre A et B est donc ${distance}. ou Calcul : le plus grand - le plus petit nombre relatif`,
      };
    },
  },
  {
  kind: "template",
  id: "relatif_defis_tpl_3",
  niveau: "5e",
  matiere: "maths",
  notionId: "nombres_relatifs",
  microId: "relatif_defis",
  difficulty: 5,
  theme: "neutral",
  hint: "Compare le nombre et son opposé.",
  tags: ["relatifs", "defi", "opposes", "comparaison", "piege", "template"],
  generate: () => {
    const n = Math.floor(Math.random() * 6) + 2; // 2 à 7
    const number = -n;

    return {
      text: `Je suis un nombre. Mon opposé est plus grand que moi. Je suis compris entre -${n + 2} et 0. Qui suis-je ?`,
      format: "short",
      expected: [String(number)],
      comparator: "number_equal",
      explanation: `Si l’opposé est plus grand que le nombre, alors le nombre est négatif. Le seul nombre compris entre -${n + 2} et 0 qui vérifie cela est -${n}.`,
    };
  },
},
{
  kind: "template",
  id: "relatif_defis_tpl_4",
  niveau: "5e",
  matiere: "maths",
  notionId: "nombres_relatifs",
  microId: "relatif_defis",
  difficulty: 5,
  theme: "neutral",
  hint: "Quand la somme fait 0, les nombres sont opposés.",
  tags: ["relatifs", "defi", "addition", "opposes", "raisonnement", "template"],
  generate: () => {
    const n = Math.floor(Math.random() * 7) + 2;
    const number = -n;

    return {
      text: `Je suis un nombre. Quand on m’additionne avec ${n}, on obtient 0. Qui suis-je ?`,
      format: "short",
      expected: [String(number)],
      comparator: "number_equal",
      explanation: `Un nombre qui, additionné à ${n}, donne 0 est son opposé. Donc le nombre est -${n}.`,
    };
  },
},
{
  kind: "template",
  id: "relatif_defis_tpl_5",
  niveau: "5e",
  matiere: "maths",
  notionId: "nombres_relatifs",
  microId: "relatif_defis",
  difficulty: 5,
  theme: "neutral",
  hint: "Utilise la distance à 0 et compare avec les bornes.",
  tags: ["relatifs", "defi", "distance", "encadrement", "raisonnement", "template"],
  generate: () => {
    const d = Math.floor(Math.random() * 5) + 3; // 3 à 7
    const isPositive = Math.random() < 0.5;

    const number = isPositive ? d : -d;

    const textPosition = isPositive
      ? `plus petit que ${d + 1} et plus grand que 0`
      : `plus grand que -${d + 1} et plus petit que 0`;

    const explanationSign = isPositive
      ? `Le nombre est donc positif : ${d}.`
      : `Le nombre est donc négatif : -${d}.`;

    return {
      text: `Je suis un nombre. Je suis à ${d} unités de 0. Je suis ${textPosition}. Qui suis-je ?`,
      format: "short",
      expected: [String(number)],
      comparator: "number_equal",
      explanation: `Être à ${d} unités de 0 signifie que le nombre peut être ${d} ou -${d}. ${explanationSign}`,
    };
  },
},
];