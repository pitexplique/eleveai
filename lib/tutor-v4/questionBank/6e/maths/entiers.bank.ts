import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function expectedExplanation(expected: string[]) {
  const answer = expected[0] ?? "";
  return answer
    ? `La bonne réponse attendue est : ${answer}. Relis les données puis compare ton raisonnement.`
    : "Relis les données de l’énoncé et vérifie chaque étape du calcul.";
}


function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function chunkedNumber(n: number) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
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
    explanation: expectedExplanation(["123"]),
    comparator: "number_equal",
    hint: "100 + 20 + 3",
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
    explanation: expectedExplanation(["90"]),
    comparator: "number_equal",
    hint: "4 vingtaines + 10",
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
    expected: ["2035"],
    explanation: expectedExplanation(["2035"]),
    comparator: "number_equal",
    hint: "2000 + 35",
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
    explanation: expectedExplanation(["304"]),
    comparator: "mcq_exact",
    hint: "3 centaines et 4 unités.",
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
    explanation: expectedExplanation(["1042"]),
    comparator: "mcq_exact",
    hint: "1000 + 42",
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
    expected: ["1200"],
    explanation: expectedExplanation(["1200"]),
    comparator: "number_equal",
    hint: "1000 + 200",
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
    explanation: expectedExplanation(["5"]),
    comparator: "number_equal",
    hint: "Le chiffre des dizaines est au milieu.",
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
    explanation: expectedExplanation(["6"]),
    comparator: "number_equal",
    hint: "Le chiffre des centaines est le premier à gauche.",
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
    explanation: expectedExplanation(["3"]),
    comparator: "number_equal",
    hint: "Le chiffre des unités est le dernier.",
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
    explanation: expectedExplanation(["8"]),
    comparator: "mcq_exact",
    hint: "Unités à droite, puis dizaines.",
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
    explanation: expectedExplanation(["3"]),
    comparator: "mcq_exact",
    hint: "Milliers, centaines, dizaines, unités.",
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
    explanation: expectedExplanation(["354"]),
    comparator: "number_equal",
    hint: "Compare les dizaines.",
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
    explanation: expectedExplanation(["890"]),
    comparator: "number_equal",
    hint: "Compare les dizaines après les centaines.",
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
    explanation: expectedExplanation(["2350", "2 350"]),
    comparator: "number_equal",
    hint: "Compare les dizaines.",
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
    explanation: expectedExplanation(["1 250"]),
    comparator: "mcq_exact",
    hint: "Compare les centaines puis les dizaines.",
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
    explanation: expectedExplanation(["1 408"]),
    comparator: "mcq_exact",
    hint: "Compare les dizaines.",
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
    explanation: expectedExplanation(["300", "50", "2"]),
    comparator: "contains_keyword",
    hint: "3 centaines, 5 dizaines, 2 unités.",
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
    explanation: expectedExplanation(["4000", "200", "6"]),
    comparator: "contains_keyword",
    hint: "4 milliers, 2 centaines, 0 dizaine, 6 unités.",
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
    explanation: expectedExplanation(["500 + 7"]),
    comparator: "mcq_exact",
    hint: "Il y a 5 centaines, 0 dizaine, 7 unités.",
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
    explanation: expectedExplanation(["2000 + 300 + 40"]),
    comparator: "mcq_exact",
    hint: "2 milliers, 3 centaines, 4 dizaines.",
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
    explanation: expectedExplanation(["40", "50"]),
    comparator: "contains_keyword",
    hint: "47 est entre 40 et 50.",
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
    explanation: expectedExplanation(["300", "400"]),
    comparator: "contains_keyword",
    hint: "326 est entre 300 et 400.",
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
    explanation: expectedExplanation(["500 et 600"]),
    comparator: "mcq_exact",
    hint: "On parle ici de centaines consécutives.",
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
    explanation: expectedExplanation(["70 et 80"]),
    comparator: "mcq_exact",
    hint: "Deux dizaines consécutives.",
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
    explanation: expectedExplanation(["427"]),
    comparator: "number_equal",
    hint: "Assemble les chiffres dans l’ordre.",
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
    explanation: expectedExplanation(["20"]),
    comparator: "number_equal",
    hint: "Calcule l’écart.",
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
    expected: ["1035"],
    explanation: expectedExplanation(["1035"]),
    comparator: "number_equal",
    hint: "Le nombre ne peut pas commencer par 0.",
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
    explanation: expectedExplanation(["2230", "2 230"]),
    comparator: "number_equal",
    hint: "Additionne 1 250 et 980.",
    tags: ["entiers", "defi", "reunion"],
  },
  {
    kind: "fixed",
    id: "entier_defis_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "nombres_entiers",
    microId: "entier_defis",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi 509 est plus grand que 490.",
    format: "short",
    expected: ["dizaines", "509", "490"],
    explanation: expectedExplanation(["dizaines", "509", "490"]),
    comparator: "contains_keyword",
    hint: "Compare d’abord les centaines, puis les dizaines.",
    tags: ["entiers", "defi", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "entier_defis_fixed_6",
    niveau: "6e",
    matiere: "maths",
    notionId: "nombres_entiers",
    microId: "entier_defis",
    difficulty: 5,
    theme: "neutral",
    text: "Trouve un nombre compris entre 300 et 400 dont le chiffre des dizaines est 7 et le chiffre des unités est plus petit que 5.",
    format: "short",
    expected: ["370", "371", "372", "373", "374"],
    explanation: expectedExplanation(["370", "371", "372", "373", "374"]),
    comparator: "exact_text",
    hint: "Il y a plusieurs réponses possibles.",
    tags: ["entiers", "defi", "raisonnement"],
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
    hint: "Lis les centaines, dizaines et unités.",
    tags: ["entiers", "lecture", "template"],
    generate: () => {
      const n = randomInt(101, 999);
      return {
        text: `Écris en chiffres : ${chunkedNumber(n)}.`,
        format: "short",
        expected: [String(n), chunkedNumber(n)],
        explanation: expectedExplanation([String(n), chunkedNumber(n)]),
        comparator: "number_equal",
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
    hint: "Repère les milliers et les centaines.",
    tags: ["entiers", "lecture", "qcm", "template"],
    generate: () => {
      const n = randomInt(1000, 3999);
      const good = chunkedNumber(n);
      const choices = shuffle([
        good,
        chunkedNumber(n + 10),
        chunkedNumber(n + 100),
        chunkedNumber(n - 1),
      ]);

      return {
        text: `Quel nombre correspond à ${good} ?`,
        format: "qcm",
        choices,
        expected: [good],
        explanation: expectedExplanation([good]),
        comparator: "mcq_exact",
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
        target === "centaines" ? digits[0] : target === "dizaines" ? digits[1] : digits[2];

      return {
        text: `Dans le nombre ${n}, quel est le chiffre des ${target} ?`,
        format: "short",
        expected: [answer],
        explanation: expectedExplanation([answer]),
        comparator: "number_equal",
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

      return {
        text: `Dans le nombre ${chunkedNumber(n)}, quel est le chiffre des ${target} ?`,
        format: "qcm",
        choices: shuffle([...new Set(digits)]),
        expected: [answer],
        explanation: expectedExplanation([answer]),
        comparator: "mcq_exact",
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

      return {
        text: `Quel nombre est le plus grand : ${a} ou ${b} ?`,
        format: "short",
        expected: [String(good), chunkedNumber(good)],
        explanation: expectedExplanation([String(good), chunkedNumber(good)]),
        comparator: "number_equal",
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
        explanation: expectedExplanation([chunkedNumber(good)]),
        comparator: "mcq_exact",
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
    hint: "Décompose en milliers, centaines, dizaines, unités.",
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
        explanation: expectedExplanation([String(hundreds), String(tens), String(units)]),
        comparator: "contains_keyword",
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
        explanation: expectedExplanation([good]),
        comparator: "mcq_exact",
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
    hint: "Trouve la dizaine ou la centaine juste avant et juste après.",
    tags: ["entiers", "encadrement", "template"],
    generate: () => {
      const n = randomInt(11, 98);
      const low = Math.floor(n / 10) * 10;
      const high = low + 10;

      return {
        text: `Encadre ${n} entre deux dizaines consécutives.`,
        format: "short",
        expected: [String(low), String(high)],
        explanation: expectedExplanation([String(low), String(high)]),
        comparator: "contains_keyword",
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
        explanation: expectedExplanation([good]),
        comparator: "mcq_exact",
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
        explanation: expectedExplanation([String(n)]),
        comparator: "number_equal",
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
      const digits = shuffle(["0", "2", "4", "7"]);
      const choices = shuffle(["2047", "2074", "2407", "2470"]);
      const good = "2047";

      return {
        text: "Quel est le plus petit nombre de quatre chiffres que l’on peut écrire avec 0, 2, 4 et 7 une seule fois chacun ?",
        format: "qcm",
        choices,
        expected: [good],
        explanation: expectedExplanation([good]),
        comparator: "mcq_exact",
      };
    },
  },
];
