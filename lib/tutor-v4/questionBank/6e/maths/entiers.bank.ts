import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function chunkedNumber(n: number) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function numberBelow100ToFrench(n: number): string {
  const units = [
    "zéro",
    "un",
    "deux",
    "trois",
    "quatre",
    "cinq",
    "six",
    "sept",
    "huit",
    "neuf",
    "dix",
    "onze",
    "douze",
    "treize",
    "quatorze",
    "quinze",
    "seize",
  ];

  if (n <= 16) return units[n];
  if (n < 20) return `dix-${units[n - 10]}`;

  const tensMap: Record<number, string> = {
    20: "vingt",
    30: "trente",
    40: "quarante",
    50: "cinquante",
    60: "soixante",
  };

  if (n < 70) {
    const ten = Math.floor(n / 10) * 10;
    const unit = n % 10;
    if (unit === 0) return tensMap[ten];
    if (unit === 1) return `${tensMap[ten]} et un`;
    return `${tensMap[ten]}-${units[unit]}`;
  }

  if (n < 80) {
    if (n === 71) return "soixante et onze";
    return `soixante-${numberBelow100ToFrench(n - 60)}`;
  }

  if (n === 80) return "quatre-vingts";
  if (n < 100) {
    return `quatre-vingt-${numberBelow100ToFrench(n - 80)}`;
  }

  return String(n);
}

function numberBelow1000ToFrench(n: number): string {
  if (n < 100) return numberBelow100ToFrench(n);

  const hundreds = Math.floor(n / 100);
  const rest = n % 100;

  let hundredPart = "";
  if (hundreds === 1) {
    hundredPart = "cent";
  } else {
    hundredPart = `${numberBelow100ToFrench(hundreds)} cent`;
  }

  if (rest === 0) {
    if (hundreds > 1) return `${hundredPart}s`;
    return hundredPart;
  }

  return `${hundredPart} ${numberBelow100ToFrench(rest)}`;
}

function numberToFrenchWords(n: number): string {
  if (n < 1000) return numberBelow1000ToFrench(n);

  const thousands = Math.floor(n / 1000);
  const rest = n % 1000;

  let thousandPart = "";
  if (thousands === 1) {
    thousandPart = "mille";
  } else {
    thousandPart = `${numberBelow1000ToFrench(thousands)} mille`;
  }

  if (rest === 0) return thousandPart;

  return `${thousandPart} ${numberBelow1000ToFrench(rest)}`;
}

export const entiersBank: TutorBankItemV4[] = [
  // =========================
  // ENTIER_LIRE_ECRIRE
  // =========================
  {
    kind: "fixed",
    id: "entier_lire_ecrire_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "nombres_entiers",
    microId: "entier_lire_ecrire",
    difficulty: 1,
    theme: "neutral",
    text: "Écris en chiffres : cent vingt-trois",
    format: "short",
    expected: ["123"],
    comparator: "number_equal",
    hint: "100 + 20 + 3",
    explanation:
      "Cent vingt-trois signifie 100 + 20 + 3. On écrit donc 123.",
    tags: ["entiers", "lecture", "ecriture"],
  },
  {
    kind: "fixed",
    id: "entier_lire_ecrire_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "nombres_entiers",
    microId: "entier_lire_ecrire",
    difficulty: 1,
    theme: "neutral",
    text: "Écris en chiffres : quatre-vingt-dix",
    format: "short",
    expected: ["90"],
    comparator: "number_equal",
    hint: "4 vingtaines + 10",
    explanation:
      "Quatre-vingt-dix correspond à 80 + 10. On écrit donc 90.",
    tags: ["entiers", "lecture", "ecriture"],
  },
  {
    kind: "fixed",
    id: "entier_lire_ecrire_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "nombres_entiers",
    microId: "entier_lire_ecrire",
    difficulty: 2,
    theme: "neutral",
    text: "Écris en chiffres : deux mille trente-cinq",
    format: "short",
    expected: ["2035", "2 035"],
    comparator: "number_equal",
    hint: "2000 + 35",
    explanation:
      "Deux mille trente-cinq signifie 2000 + 35. On écrit donc 2035.",
    tags: ["entiers", "lecture", "ecriture"],
  },
  {
    kind: "fixed",
    id: "entier_lire_ecrire_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "nombres_entiers",
    microId: "entier_lire_ecrire",
    difficulty: 1,
    theme: "neutral",
    text: "Quel nombre correspond à « trois cent quatre » ?",
    format: "qcm",
    choices: ["34", "304", "340", "3004"],
    expected: ["304"],
    comparator: "mcq_exact",
    hint: "3 centaines et 4 unités.",
    explanation:
      "Trois cent quatre signifie 3 centaines, 0 dizaine et 4 unités. Le bon nombre est 304.",
    tags: ["entiers", "lecture", "qcm"],
  },
  {
    kind: "fixed",
    id: "entier_lire_ecrire_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "nombres_entiers",
    microId: "entier_lire_ecrire",
    difficulty: 2,
    theme: "neutral",
    text: "Quel nombre correspond à « mille quarante-deux » ?",
    format: "qcm",
    choices: ["142", "1042", "10042", "1240"],
    expected: ["1042"],
    comparator: "mcq_exact",
    hint: "1000 + 42",
    explanation:
      "Mille quarante-deux signifie 1000 + 42. Le bon nombre est 1042.",
    tags: ["entiers", "lecture", "qcm"],
  },
  {
    kind: "fixed",
    id: "entier_lire_ecrire_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "nombres_entiers",
    microId: "entier_lire_ecrire",
    difficulty: 2,
    theme: "reunion",
    text: "Au volcan, un sentier imaginaire reçoit mille deux cents visiteurs. Écris ce nombre en chiffres.",
    format: "short",
    expected: ["1200", "1 200"],
    comparator: "number_equal",
    hint: "1000 + 200",
    explanation:
      "Mille deux cents signifie 1000 + 200. On écrit donc 1200.",
    tags: ["entiers", "lecture", "reunion"],
  },

  // =========================
  // ENTIER_RANG
  // =========================
  {
    kind: "fixed",
    id: "entier_rang_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "nombres_entiers",
    microId: "entier_rang",
    difficulty: 1,
    theme: "neutral",
    text: "Dans le nombre 352, quel est le chiffre des dizaines ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Le chiffre des dizaines est au milieu.",
    explanation:
      "Dans 352, il y a 3 centaines, 5 dizaines et 2 unités. Le chiffre des dizaines est donc 5.",
    tags: ["entiers", "rang"],
  },
  {
    kind: "fixed",
    id: "entier_rang_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "nombres_entiers",
    microId: "entier_rang",
    difficulty: 1,
    theme: "neutral",
    text: "Dans le nombre 684, quel est le chiffre des centaines ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Le chiffre des centaines est le premier à gauche.",
    explanation:
      "Dans 684, le premier chiffre à gauche représente les centaines. C’est 6.",
    tags: ["entiers", "rang"],
  },
  {
    kind: "fixed",
    id: "entier_rang_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "nombres_entiers",
    microId: "entier_rang",
    difficulty: 2,
    theme: "neutral",
    text: "Dans le nombre 4 273, quel est le chiffre des unités ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Le chiffre des unités est le dernier.",
    explanation:
      "Dans 4 273, le chiffre des unités est le dernier à droite. C’est 3.",
    tags: ["entiers", "rang"],
  },
  {
    kind: "fixed",
    id: "entier_rang_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "nombres_entiers",
    microId: "entier_rang",
    difficulty: 2,
    theme: "neutral",
    text: "Dans 5 482, quel est le chiffre des dizaines ?",
    format: "qcm",
    choices: ["8", "4", "2", "5"],
    expected: ["8"],
    comparator: "mcq_exact",
    hint: "Unités à droite, puis dizaines.",
    explanation:
      "Dans 5 482, le chiffre des unités est 2, donc juste avant se trouve le chiffre des dizaines : 8.",
    tags: ["entiers", "rang", "qcm"],
  },
  {
    kind: "fixed",
    id: "entier_rang_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "nombres_entiers",
    microId: "entier_rang",
    difficulty: 2,
    theme: "neutral",
    text: "Dans 7 306, quel est le chiffre des centaines ?",
    format: "qcm",
    choices: ["7", "3", "0", "6"],
    expected: ["3"],
    comparator: "mcq_exact",
    hint: "Milliers, centaines, dizaines, unités.",
    explanation:
      "Dans 7 306, le 7 est au rang des milliers, le 3 au rang des centaines, le 0 au rang des dizaines et le 6 au rang des unités. Le chiffre des centaines est donc 3.",
    tags: ["entiers", "rang", "qcm"],
  },

  // =========================
  // ENTIER_COMPARE
  // =========================
  {
    kind: "fixed",
    id: "entier_compare_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "nombres_entiers",
    microId: "entier_compare",
    difficulty: 1,
    theme: "neutral",
    text: "Quel nombre est le plus grand : 345 ou 354 ?",
    format: "short",
    expected: ["354"],
    comparator: "number_equal",
    hint: "Compare les dizaines.",
    explanation:
      "Les deux nombres ont 3 centaines. On compare alors les dizaines : 5 dizaines est plus grand que 4 dizaines. Donc 354 est plus grand que 345.",
    tags: ["entiers", "comparaison"],
  },
  {
    kind: "fixed",
    id: "entier_compare_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "nombres_entiers",
    microId: "entier_compare",
    difficulty: 1,
    theme: "neutral",
    text: "Quel nombre est le plus petit : 908 ou 890 ?",
    format: "short",
    expected: ["890"],
    comparator: "number_equal",
    hint: "Compare les dizaines après les centaines.",
    explanation:
      "Les deux nombres ont 8 ou 9 centaines ? En réalité, 908 a 9 centaines et 890 a 8 centaines. Comme 8 centaines est plus petit que 9 centaines, 890 est le plus petit.",
    tags: ["entiers", "comparaison"],
  },
  {
    kind: "fixed",
    id: "entier_compare_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "nombres_entiers",
    microId: "entier_compare",
    difficulty: 2,
    theme: "neutral",
    text: "Quel nombre est le plus grand : 2 305 ou 2 350 ?",
    format: "short",
    expected: ["2350", "2 350"],
    comparator: "number_equal",
    hint: "Compare les dizaines.",
    explanation:
      "Les deux nombres ont 2 milliers et 3 centaines. On compare ensuite les dizaines : 5 dizaines est plus grand que 0 dizaine. Donc 2 350 est plus grand que 2 305.",
    tags: ["entiers", "comparaison"],
  },
  {
    kind: "fixed",
    id: "entier_compare_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "nombres_entiers",
    microId: "entier_compare",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est le plus grand nombre ?",
    format: "qcm",
    choices: ["1 205", "1 250", "1 025", "1 152"],
    expected: ["1 250"],
    comparator: "mcq_exact",
    hint: "Compare les centaines puis les dizaines.",
    explanation:
      "Tous les nombres ont 1 millier. En comparant ensuite les centaines et les dizaines, 1 250 est le plus grand.",
    tags: ["entiers", "comparaison", "qcm"],
  },
  {
    kind: "fixed",
    id: "entier_compare_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "nombres_entiers",
    microId: "entier_compare",
    difficulty: 2,
    theme: "reunion",
    text: "Quel nombre est le plus petit : 1 480 visiteurs ou 1 408 visiteurs ?",
    format: "qcm",
    choices: ["1 480", "1 408"],
    expected: ["1 408"],
    comparator: "mcq_exact",
    hint: "Compare les dizaines.",
    explanation:
      "Les deux nombres ont 1 millier et 4 centaines. On compare alors les dizaines : 0 dizaine est plus petit que 8 dizaines. Donc 1 408 est plus petit que 1 480.",
    tags: ["entiers", "comparaison", "reunion", "qcm"],
  },

  // =========================
  // ENTIER_DECOMPOSER
  // =========================
  {
    kind: "fixed",
    id: "entier_decomposer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "nombres_entiers",
    microId: "entier_decomposer",
    difficulty: 1,
    theme: "neutral",
    text: "Décompose 352 en centaines, dizaines et unités.",
    format: "short",
    expected: ["300", "50", "2"],
    comparator: "contains_keyword",
    hint: "3 centaines, 5 dizaines, 2 unités.",
    explanation:
      "Dans 352, le 3 représente 300, le 5 représente 50 et le 2 représente 2. On peut donc écrire 352 = 300 + 50 + 2.",
    tags: ["entiers", "decomposition"],
  },
  {
    kind: "fixed",
    id: "entier_decomposer_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "nombres_entiers",
    microId: "entier_decomposer",
    difficulty: 2,
    theme: "neutral",
    text: "Décompose 4 206.",
    format: "short",
    expected: ["4000", "200", "6"],
    comparator: "contains_keyword",
    hint: "4 milliers, 2 centaines, 0 dizaine, 6 unités.",
    explanation:
      "Dans 4 206, le 4 représente 4000, le 2 représente 200, le 0 représente 0 dizaine et le 6 représente 6. On peut écrire 4 206 = 4000 + 200 + 6.",
    tags: ["entiers", "decomposition"],
  },
  {
    kind: "fixed",
    id: "entier_decomposer_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "nombres_entiers",
    microId: "entier_decomposer",
    difficulty: 2,
    theme: "neutral",
    text: "La bonne décomposition de 507 est :",
    format: "qcm",
    choices: ["500 + 7", "50 + 7", "500 + 70", "5 + 7"],
    expected: ["500 + 7"],
    comparator: "mcq_exact",
    hint: "Il y a 5 centaines, 0 dizaine, 7 unités.",
    explanation:
      "507 contient 5 centaines, 0 dizaine et 7 unités. Sa bonne décomposition est donc 500 + 7.",
    tags: ["entiers", "decomposition", "qcm"],
  },
  {
    kind: "fixed",
    id: "entier_decomposer_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "nombres_entiers",
    microId: "entier_decomposer",
    difficulty: 2,
    theme: "neutral",
    text: "La bonne décomposition de 2 340 est :",
    format: "qcm",
    choices: ["2000 + 300 + 40", "200 + 30 + 4", "2000 + 34", "234 + 0"],
    expected: ["2000 + 300 + 40"],
    comparator: "mcq_exact",
    hint: "2 milliers, 3 centaines, 4 dizaines.",
    explanation:
      "2 340 contient 2 milliers, 3 centaines, 4 dizaines et 0 unité. La bonne décomposition est donc 2000 + 300 + 40.",
    tags: ["entiers", "decomposition", "qcm"],
  },

  // =========================
  // ENTIER_ENCADRER
  // =========================
  {
    kind: "fixed",
    id: "entier_encadrer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "nombres_entiers",
    microId: "entier_encadrer",
    difficulty: 2,
    theme: "neutral",
    text: "Encadre 47 entre deux dizaines consécutives.",
    format: "short",
    expected: ["40", "50"],
    comparator: "contains_keyword",
    hint: "47 est entre 40 et 50.",
    explanation:
      "Le nombre 47 est plus grand que 40 et plus petit que 50. Il est donc encadré entre 40 et 50.",
    tags: ["entiers", "encadrement"],
  },
  {
    kind: "fixed",
    id: "entier_encadrer_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "nombres_entiers",
    microId: "entier_encadrer",
    difficulty: 2,
    theme: "neutral",
    text: "Encadre 326 entre deux centaines consécutives.",
    format: "short",
    expected: ["300", "400"],
    comparator: "contains_keyword",
    hint: "326 est entre 300 et 400.",
    explanation:
      "Le nombre 326 est compris entre 300 et 400. Ce sont les deux centaines consécutives qui l’encadrent.",
    tags: ["entiers", "encadrement"],
  },
  {
    kind: "fixed",
    id: "entier_encadrer_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "nombres_entiers",
    microId: "entier_encadrer",
    difficulty: 2,
    theme: "neutral",
    text: "Le nombre 582 est encadré entre :",
    format: "qcm",
    choices: ["500 et 600", "580 et 590", "400 et 500", "600 et 700"],
    expected: ["500 et 600"],
    comparator: "mcq_exact",
    hint: "On parle ici de centaines consécutives.",
    explanation:
      "Comme 582 est compris entre 500 et 600, le bon encadrement est 500 et 600.",
    tags: ["entiers", "encadrement", "qcm"],
  },
  {
    kind: "fixed",
    id: "entier_encadrer_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "nombres_entiers",
    microId: "entier_encadrer",
    difficulty: 2,
    theme: "neutral",
    text: "Le nombre 73 est entre :",
    format: "qcm",
    choices: ["70 et 80", "60 et 70", "73 et 74", "7 et 8"],
    expected: ["70 et 80"],
    comparator: "mcq_exact",
    hint: "Deux dizaines consécutives.",
    explanation:
      "73 est plus grand que 70 et plus petit que 80. Il est donc entre 70 et 80.",
    tags: ["entiers", "encadrement", "qcm"],
  },

  // =========================
  // ENTIER_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "entier_defis_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "nombres_entiers",
    microId: "entier_defis",
    difficulty: 1,
    theme: "neutral",
    text: "Je pense à un nombre de trois chiffres. Son chiffre des centaines est 4, son chiffre des dizaines est 2 et son chiffre des unités est 7. Quel est ce nombre ?",
    format: "short",
    expected: ["427"],
    comparator: "number_equal",
    hint: "Assemble les chiffres dans l’ordre.",
    explanation:
      "Le chiffre des centaines est 4, celui des dizaines est 2 et celui des unités est 7. Le nombre est donc 427.",
    tags: ["entiers", "defi"],
  },
  {
    kind: "fixed",
    id: "entier_defis_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "nombres_entiers",
    microId: "entier_defis",
    difficulty: 2,
    theme: "neutral",
    text: "Quel nombre faut-il ajouter à 380 pour obtenir 400 ?",
    format: "short",
    expected: ["20"],
    comparator: "number_equal",
    hint: "Calcule l’écart.",
    explanation:
      "Pour passer de 380 à 400, on calcule 400 - 380 = 20. Il faut donc ajouter 20.",
    tags: ["entiers", "defi"],
  },
  {
    kind: "fixed",
    id: "entier_defis_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "nombres_entiers",
    microId: "entier_defis",
    difficulty: 3,
    theme: "neutral",
    text: "Quel est le plus petit nombre de quatre chiffres que l’on peut écrire avec les chiffres 3, 0, 5 et 1, une seule fois chacun ?",
    format: "short",
    expected: ["1035", "1 035"],
    comparator: "number_equal",
    hint: "Le nombre ne peut pas commencer par 0.",
    explanation:
      "Pour obtenir le plus petit nombre possible, on place d’abord le plus petit chiffre non nul, donc 1. Ensuite on place 0, puis 3 et 5. On obtient 1035.",
    tags: ["entiers", "defi", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "entier_defis_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "nombres_entiers",
    microId: "entier_defis",
    difficulty: 3,
    theme: "reunion",
    text: "À La Réunion, un site touristique reçoit 1 250 visiteurs le matin et 980 l’après-midi. Combien de visiteurs au total ?",
    format: "short",
    expected: ["2230", "2 230"],
    comparator: "number_equal",
    hint: "Additionne 1 250 et 980.",
    explanation:
      "On additionne 1 250 et 980 : 1250 + 980 = 2230. Le site reçoit donc 2 230 visiteurs au total.",
    tags: ["entiers", "defi", "reunion"],
  },

  // =========================
  // TEMPLATES - LIRE ECRIRE
  // =========================
  {
    kind: "template",
    id: "entier_lire_ecrire_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "nombres_entiers",
    microId: "entier_lire_ecrire",
    difficulty: 1,
    theme: "neutral",
    hint: "Transforme les mots en nombre.",
    tags: ["entiers", "lecture", "ecriture", "template"],
    generate: () => {
      const n = randomInt(101, 999);
      const words = numberToFrenchWords(n);

      return {
        text: `Écris en chiffres : ${words}`,
        format: "short",
        expected: [String(n), chunkedNumber(n)],
        comparator: "number_equal",
        explanation: `${words} s’écrit ${chunkedNumber(n)} en chiffres.`,
      };
    },
  },
  {
    kind: "template",
    id: "entier_lire_ecrire_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "nombres_entiers",
    microId: "entier_lire_ecrire",
    difficulty: 2,
    theme: "neutral",
    hint: "Lis bien les milliers, centaines, dizaines et unités.",
    tags: ["entiers", "lecture", "qcm", "template"],
    generate: () => {
      const n = randomInt(1000, 3999);
      const words = numberToFrenchWords(n);
      const good = chunkedNumber(n);

      const wrong1 = chunkedNumber(n + 10);
      const wrong2 = chunkedNumber(n + 100);
      const wrong3 = chunkedNumber(n - 1);

      const choices = shuffle(
        Array.from(new Set([good, wrong1, wrong2, wrong3]))
      ).slice(0, 4);

      if (!choices.includes(good)) {
        choices[Math.floor(Math.random() * choices.length)] = good;
      }

      return {
        text: `Quel nombre correspond à « ${words} » ?`,
        format: "qcm",
        choices,
        expected: [good],
        comparator: "mcq_exact",
        explanation: `« ${words} » s’écrit ${good}.`,
      };
    },
  },

  // =========================
  // TEMPLATES - RANG
  // =========================
  {
    kind: "template",
    id: "entier_rang_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "nombres_entiers",
    microId: "entier_rang",
    difficulty: 2,
    theme: "neutral",
    hint: "Lis le nombre de gauche à droite.",
    tags: ["entiers", "rang", "template"],
    generate: () => {
      const n = randomInt(100, 999);
      const digits = String(n).split("");
      const target = ["centaines", "dizaines", "unités"][
        Math.floor(Math.random() * 3)
      ];
      const answer =
        target === "centaines"
          ? digits[0]
          : target === "dizaines"
          ? digits[1]
          : digits[2];

      return {
        text: `Dans le nombre ${n}, quel est le chiffre des ${target} ?`,
        format: "short",
        expected: [answer],
        comparator: "number_equal",
        explanation: `Dans ${n}, le chiffre demandé au rang des ${target} est ${answer}.`,
      };
    },
  },
  {
    kind: "template",
    id: "entier_rang_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "nombres_entiers",
    microId: "entier_rang",
    difficulty: 2,
    theme: "neutral",
    hint: "Milliers, centaines, dizaines, unités.",
    tags: ["entiers", "rang", "qcm", "template"],
    generate: () => {
      const n = randomInt(1000, 9999);
      const digits = String(n).split("");
      const target = ["milliers", "centaines", "dizaines", "unités"][
        Math.floor(Math.random() * 4)
      ];
      const answer =
        target === "milliers"
          ? digits[0]
          : target === "centaines"
          ? digits[1]
          : target === "dizaines"
          ? digits[2]
          : digits[3];

      const wrongChoices = shuffle(
        Array.from(new Set(digits.filter((d) => d !== answer)))
      );
      const choices = shuffle([answer, ...wrongChoices]).slice(0, 4);

      return {
        text: `Dans le nombre ${chunkedNumber(
          n
        )}, quel est le chiffre des ${target} ?`,
        format: "qcm",
        choices,
        expected: [answer],
        comparator: "mcq_exact",
        explanation: `Dans ${chunkedNumber(
          n
        )}, le chiffre des ${target} est ${answer}.`,
      };
    },
  },

  // =========================
  // TEMPLATES - COMPARER
  // =========================
  {
    kind: "template",
    id: "entier_compare_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "nombres_entiers",
    microId: "entier_compare",
    difficulty: 2,
    theme: "neutral",
    hint: "Compare chiffre par chiffre de gauche à droite.",
    tags: ["entiers", "comparaison", "template"],
    generate: () => {
      let a = randomInt(100, 999);
      let b = randomInt(100, 999);
      while (a === b) b = randomInt(100, 999);
      const good = Math.max(a, b);
      const small = Math.min(a, b);

      return {
        text: `Quel nombre est le plus grand : ${a} ou ${b} ?`,
        format: "short",
        expected: [String(good), chunkedNumber(good)],
        comparator: "number_equal",
        explanation: `On compare ${a} et ${b}. Comme ${good} est plus grand que ${small}, la bonne réponse est ${good}.`,
      };
    },
  },
  {
    kind: "template",
    id: "entier_compare_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "nombres_entiers",
    microId: "entier_compare",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde d’abord le nombre de chiffres, puis la valeur des chiffres.",
    tags: ["entiers", "comparaison", "qcm", "template"],
    generate: () => {
      const nums = [
        randomInt(1000, 1999),
        randomInt(1000, 1999),
        randomInt(1000, 1999),
        randomInt(1000, 1999),
      ];
      const good = Math.max(...nums);
      const choices = shuffle(nums.map((n) => chunkedNumber(n)));

      return {
        text: "Quel est le plus grand nombre ?",
        format: "qcm",
        choices,
        expected: [chunkedNumber(good)],
        comparator: "mcq_exact",
        explanation: `Parmi les nombres proposés, ${chunkedNumber(
          good
        )} est le plus grand.`,
      };
    },
  },

  // =========================
  // TEMPLATES - DECOMPOSER
  // =========================
  {
    kind: "template",
    id: "entier_decomposer_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "nombres_entiers",
    microId: "entier_decomposer",
    difficulty: 2,
    theme: "neutral",
    hint: "Décompose en centaines, dizaines, unités.",
    tags: ["entiers", "decomposition", "template"],
    generate: () => {
      const n = randomInt(100, 999);
      const hundreds = Math.floor(n / 100) * 100;
      const tens = Math.floor((n % 100) / 10) * 10;
      const units = n % 10;

      return {
        text: `Décompose ${n}.`,
        format: "short",
        expected: [String(hundreds), String(tens), String(units)],
        comparator: "contains_keyword",
        explanation: `${n} se décompose en ${hundreds} + ${tens} + ${units}.`,
      };
    },
  },
  {
    kind: "template",
    id: "entier_decomposer_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "nombres_entiers",
    microId: "entier_decomposer",
    difficulty: 2,
    theme: "neutral",
    hint: "Repère la valeur de chaque chiffre.",
    tags: ["entiers", "decomposition", "qcm", "template"],
    generate: () => {
      const n = randomInt(200, 999);
      const hundreds = Math.floor(n / 100) * 100;
      const tens = Math.floor((n % 100) / 10) * 10;
      const units = n % 10;
      const good = `${hundreds} + ${tens} + ${units}`;

      return {
        text: `Quelle est la bonne décomposition de ${n} ?`,
        format: "qcm",
        choices: shuffle([
          good,
          `${Math.floor(n / 100)} + ${Math.floor((n % 100) / 10)} + ${units}`,
          `${hundreds} + ${units}`,
          `${hundreds} + ${tens}`,
        ]),
        expected: [good],
        comparator: "mcq_exact",
        explanation: `Dans ${n}, les chiffres représentent ${hundreds}, ${tens} et ${units}. La bonne décomposition est donc ${good}.`,
      };
    },
  },

  // =========================
  // TEMPLATES - ENCADRER
  // =========================
  {
    kind: "template",
    id: "entier_encadrer_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "nombres_entiers",
    microId: "entier_encadrer",
    difficulty: 2,
    theme: "neutral",
    hint: "Trouve la dizaine juste avant et juste après.",
    tags: ["entiers", "encadrement", "template"],
    generate: () => {
      const n = randomInt(11, 98);
      const low = Math.floor(n / 10) * 10;
      const high = low + 10;

      return {
        text: `Encadre ${n} entre deux dizaines consécutives.`,
        format: "short",
        expected: [String(low), String(high)],
        comparator: "contains_keyword",
        explanation: `${n} est plus grand que ${low} et plus petit que ${high}. Il est donc encadré entre ${low} et ${high}.`,
      };
    },
  },
  {
    kind: "template",
    id: "entier_encadrer_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "nombres_entiers",
    microId: "entier_encadrer",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche les centaines juste autour du nombre.",
    tags: ["entiers", "encadrement", "qcm", "template"],
    generate: () => {
      const n = randomInt(120, 980);
      const low = Math.floor(n / 100) * 100;
      const high = low + 100;
      const good = `${low} et ${high}`;

      return {
        text: `Le nombre ${n} est encadré entre :`,
        format: "qcm",
        choices: shuffle([
          good,
          `${low - 100} et ${low}`,
          `${low + 10} et ${high}`,
          `${high} et ${high + 100}`,
        ]),
        expected: [good],
        comparator: "mcq_exact",
        explanation: `${n} est compris entre ${low} et ${high}.`,
      };
    },
  },

  // =========================
  // TEMPLATES - DEFIS
  // =========================
  {
    kind: "template",
    id: "entier_defis_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "nombres_entiers",
    microId: "entier_defis",
    difficulty: 4,
    theme: "neutral",
    hint: "Utilise les indices sur les rangs des chiffres.",
    tags: ["entiers", "defi", "template"],
    generate: () => {
      const a = randomInt(1, 9);
      const b = randomInt(0, 9);
      const c = randomInt(0, 9);
      const n = 100 * a + 10 * b + c;

      return {
        text: `Je pense à un nombre de trois chiffres. Son chiffre des centaines est ${a}, son chiffre des dizaines est ${b} et son chiffre des unités est ${c}. Quel est ce nombre ?`,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation: `Le nombre recherché a ${a} au rang des centaines, ${b} au rang des dizaines et ${c} au rang des unités. C’est donc ${n}.`,
      };
    },
  },
  {
    kind: "template",
    id: "entier_defis_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "nombres_entiers",
    microId: "entier_defis",
    difficulty: 5,
    theme: "neutral",
    hint: "Attention à la place du zéro.",
    tags: ["entiers", "defi", "qcm", "template"],
    generate: () => {
      const choices = shuffle(["2047", "2074", "2407", "2470"]);
      const good = "2047";

      return {
        text: "Quel est le plus petit nombre de quatre chiffres que l’on peut écrire avec 0, 2, 4 et 7 une seule fois chacun ?",
        format: "qcm",
        choices,
        expected: [good],
        comparator: "mcq_exact",
        explanation:
          "Le nombre ne peut pas commencer par 0. On place donc d’abord 2, puis 0, puis 4 et 7. Le plus petit nombre possible est 2047.",
      };
    },
  },
];