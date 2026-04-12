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

function formatComma(n: number | string) {
  return String(n).replace(".", ",");
}

function percentToDecimalString(p: number) {
  return formatComma((p / 100).toFixed(2).replace(/0+$/, "").replace(/\.$/, ""));
}

export const pourcentagesBank: TutorBankItemV4[] = [
  // =========================
  // POURCENTAGE_COMPRENDRE
  // =========================
  {
    kind: "fixed",
    id: "pourcentage_comprendre_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentages",
    microId: "pourcentage_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Que signifie 25 % ?",
    format: "short",
    expected: ["25 sur 100", "25/100", "25 / 100"],
    explanation: expectedExplanation(["25 sur 100", "25/100", "25 / 100"]),
    comparator: "contains_keyword",
    hint: "Le symbole % veut dire “sur 100”.",
    tags: ["pourcentages", "comprendre"],
  },
  {
    kind: "fixed",
    id: "pourcentage_comprendre_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentages",
    microId: "pourcentage_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Que signifie 50 % ?",
    format: "short",
    expected: ["50 sur 100", "50/100", "50 / 100", "la moitié", "moitié"],
    explanation: expectedExplanation(["50 sur 100", "50/100", "50 / 100", "la moitié", "moitié"]),
    comparator: "contains_keyword",
    hint: "50 %, c’est 50 sur 100.",
    tags: ["pourcentages", "comprendre"],
  },
  {
    kind: "fixed",
    id: "pourcentage_comprendre_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentages",
    microId: "pourcentage_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Le symbole % veut dire…",
    format: "qcm",
    choices: ["sur 10", "sur 100", "sur 1000", "fois 100"],
    expected: ["sur 100"],
    explanation: expectedExplanation(["sur 100"]),
    comparator: "mcq_exact",
    hint: "Un pourcentage exprime une part sur 100.",
    tags: ["pourcentages", "comprendre", "qcm"],
  },
  {
    kind: "fixed",
    id: "pourcentage_comprendre_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentages",
    microId: "pourcentage_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "75 % signifie…",
    format: "qcm",
    choices: ["75 sur 10", "75 sur 100", "7,5 sur 100", "100 sur 75"],
    expected: ["75 sur 100"],
    explanation: expectedExplanation(["75 sur 100"]),
    comparator: "mcq_exact",
    hint: "On lit toujours un pourcentage “sur 100”.",
    tags: ["pourcentages", "comprendre", "qcm"],
  },
  {
    kind: "fixed",
    id: "pourcentage_comprendre_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentages",
    microId: "pourcentage_comprendre",
    difficulty: 2,
    theme: "reunion",
    text: "Dans une classe de 100 élèves imaginaires à La Réunion, 30 % aiment le football. Combien cela représente-t-il d’élèves ?",
    format: "short",
    expected: ["30"],
    explanation: expectedExplanation(["30"]),
    comparator: "number_equal",
    hint: "30 %, c’est 30 sur 100.",
    tags: ["pourcentages", "comprendre", "reunion"],
  },

  // =========================
  // POURCENTAGE_FRACTION
  // =========================
  {
    kind: "fixed",
    id: "pourcentage_fraction_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentages",
    microId: "pourcentage_fraction",
    difficulty: 1,
    theme: "neutral",
    text: "Écris 25 % sous forme de fraction sur 100.",
    format: "short",
    expected: ["25/100", "25 / 100"],
    explanation: expectedExplanation(["25/100", "25 / 100"]),
    comparator: "fraction_decimal_equivalent",
    hint: "25 % = 25 sur 100.",
    tags: ["pourcentages", "fraction"],
  },
  {
    kind: "fixed",
    id: "pourcentage_fraction_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentages",
    microId: "pourcentage_fraction",
    difficulty: 1,
    theme: "neutral",
    text: "Écris 50 % sous forme de fraction sur 100.",
    format: "short",
    expected: ["50/100", "50 / 100", "1/2", "1 / 2"],
    explanation: expectedExplanation(["50/100", "50 / 100", "1/2", "1 / 2"]),
    comparator: "fraction_decimal_equivalent",
    hint: "50 % = 50 sur 100.",
    tags: ["pourcentages", "fraction"],
  },
  {
    kind: "fixed",
    id: "pourcentage_fraction_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentages",
    microId: "pourcentage_fraction",
    difficulty: 2,
    theme: "neutral",
    text: "Écris 10 % sous forme de fraction sur 100.",
    format: "short",
    expected: ["10/100", "10 / 100", "1/10", "1 / 10"],
    explanation: expectedExplanation(["10/100", "10 / 100", "1/10", "1 / 10"]),
    comparator: "fraction_decimal_equivalent",
    hint: "10 % = 10 sur 100.",
    tags: ["pourcentages", "fraction"],
  },
  {
    kind: "fixed",
    id: "pourcentage_fraction_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentages",
    microId: "pourcentage_fraction",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle fraction sur 100 correspond à 40 % ?",
    format: "qcm",
    choices: ["4/100", "40/100", "40/10", "1/40"],
    expected: ["40/100"],
    explanation: expectedExplanation(["40/100"]),
    comparator: "mcq_exact",
    hint: "40 % = 40 sur 100.",
    tags: ["pourcentages", "fraction", "qcm"],
  },
  {
    kind: "fixed",
    id: "pourcentage_fraction_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentages",
    microId: "pourcentage_fraction",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle écriture correspond à 5 % ?",
    format: "qcm",
    choices: ["5/100", "5/10", "50/100", "1/5"],
    expected: ["5/100"],
    explanation: expectedExplanation(["5/100"]),
    comparator: "mcq_exact",
    hint: "5 % = 5 sur 100.",
    tags: ["pourcentages", "fraction", "qcm"],
  },

  // =========================
  // POURCENTAGE_DECIMAL
  // =========================
  {
    kind: "fixed",
    id: "pourcentage_decimal_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentages",
    microId: "pourcentage_decimal",
    difficulty: 2,
    theme: "neutral",
    text: "Écris 50 % sous forme décimale.",
    format: "short",
    expected: ["0,5", "0.5", "50/100", "50 / 100"],
    explanation: expectedExplanation(["0,5", "0.5", "50/100", "50 / 100"]),
    comparator: "fraction_decimal_equivalent",
    hint: "50 % = 50/100 = 0,5.",
    tags: ["pourcentages", "decimal"],
  },
  {
    kind: "fixed",
    id: "pourcentage_decimal_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentages",
    microId: "pourcentage_decimal",
    difficulty: 2,
    theme: "neutral",
    text: "Écris 25 % sous forme décimale.",
    format: "short",
    expected: ["0,25", "0.25", "25/100", "25 / 100"],
    explanation: expectedExplanation(["0,25", "0.25", "25/100", "25 / 100"]),
    comparator: "fraction_decimal_equivalent",
    hint: "25 % = 25/100 = 0,25.",
    tags: ["pourcentages", "decimal"],
  },
  {
    kind: "fixed",
    id: "pourcentage_decimal_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentages",
    microId: "pourcentage_decimal",
    difficulty: 2,
    theme: "neutral",
    text: "Écris 10 % sous forme décimale.",
    format: "short",
    expected: ["0,1", "0.1", "10/100", "10 / 100"],
    explanation: expectedExplanation(["0,1", "0.1", "10/100", "10 / 100"]),
    comparator: "fraction_decimal_equivalent",
    hint: "10 % = 10/100 = 0,1.",
    tags: ["pourcentages", "decimal"],
  },
  {
    kind: "fixed",
    id: "pourcentage_decimal_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentages",
    microId: "pourcentage_decimal",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle écriture décimale correspond à 75 % ?",
    format: "qcm",
    choices: ["0,75", "7,5", "0,075", "75,0"],
    expected: ["0,75", "0.75"],
    explanation: expectedExplanation(["0,75", "0.75"]),
    comparator: "mcq_exact",
    hint: "75 % = 75/100.",
    tags: ["pourcentages", "decimal", "qcm"],
  },
  {
    kind: "fixed",
    id: "pourcentage_decimal_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentages",
    microId: "pourcentage_decimal",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle écriture décimale correspond à 5 % ?",
    format: "qcm",
    choices: ["0,5", "0,05", "5,0", "0,005"],
    expected: ["0,05", "0.05"],
    explanation: expectedExplanation(["0,05", "0.05"]),
    comparator: "mcq_exact",
    hint: "5 % = 5/100.",
    tags: ["pourcentages", "decimal", "qcm"],
  },

  // =========================
  // POURCENTAGE_LIRE
  // =========================
  {
    kind: "fixed",
    id: "pourcentage_lire_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentages",
    microId: "pourcentage_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une classe de 100 élèves, 20 % portent des lunettes. Combien d’élèves cela représente-t-il ?",
    format: "short",
    expected: ["20"],
    explanation: expectedExplanation(["20"]),
    comparator: "number_equal",
    hint: "20 % signifie 20 sur 100.",
    tags: ["pourcentages", "lecture"],
  },
  {
    kind: "fixed",
    id: "pourcentage_lire_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentages",
    microId: "pourcentage_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Sur 100 bonbons, 60 % sont rouges. Combien y a-t-il de bonbons rouges ?",
    format: "short",
    expected: ["60"],
    explanation: expectedExplanation(["60"]),
    comparator: "number_equal",
    hint: "60 % = 60 sur 100.",
    tags: ["pourcentages", "lecture"],
  },
  {
    kind: "fixed",
    id: "pourcentage_lire_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentages",
    microId: "pourcentage_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un groupe de 100 personnes, 15 % aiment le théâtre. Combien cela fait-il ?",
    format: "qcm",
    choices: ["5", "10", "15", "25"],
    expected: ["15"],
    explanation: expectedExplanation(["15"]),
    comparator: "mcq_exact",
    hint: "15 % = 15 sur 100.",
    tags: ["pourcentages", "lecture", "qcm"],
  },
  {
    kind: "fixed",
    id: "pourcentage_lire_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentages",
    microId: "pourcentage_lire",
    difficulty: 3,
    theme: "reunion",
    text: "À La Réunion, sur 100 ananas, 35 % sont déjà vendus. Combien d’ananas sont vendus ?",
    format: "qcm",
    choices: ["25", "30", "35", "65"],
    expected: ["35"],
    explanation: expectedExplanation(["35"]),
    comparator: "mcq_exact",
    hint: "35 % signifie 35 sur 100.",
    tags: ["pourcentages", "lecture", "reunion", "qcm"],
  },

  // =========================
  // POURCENTAGE_CALCUL_SIMPLE
  // =========================
  {
    kind: "fixed",
    id: "pourcentage_calcul_simple_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentages",
    microId: "pourcentage_calcul_simple",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule 10 % de 60.",
    format: "short",
    expected: ["6"],
    explanation: expectedExplanation(["6"]),
    comparator: "number_equal",
    hint: "10 % = 0,1.",
    tags: ["pourcentages", "calcul"],
  },
  {
    kind: "fixed",
    id: "pourcentage_calcul_simple_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentages",
    microId: "pourcentage_calcul_simple",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule 50 % de 18.",
    format: "short",
    expected: ["9"],
    explanation: expectedExplanation(["9"]),
    comparator: "number_equal",
    hint: "50 %, c’est la moitié.",
    tags: ["pourcentages", "calcul"],
  },
  {
    kind: "fixed",
    id: "pourcentage_calcul_simple_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentages",
    microId: "pourcentage_calcul_simple",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule 25 % de 20.",
    format: "short",
    expected: ["5"],
    explanation: expectedExplanation(["5"]),
    comparator: "number_equal",
    hint: "25 %, c’est un quart.",
    tags: ["pourcentages", "calcul"],
  },
  {
    kind: "fixed",
    id: "pourcentage_calcul_simple_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentages",
    microId: "pourcentage_calcul_simple",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est 10 % de 40 ?",
    format: "qcm",
    choices: ["4", "10", "14", "40"],
    expected: ["4"],
    explanation: expectedExplanation(["4"]),
    comparator: "mcq_exact",
    hint: "10 % = 1/10.",
    tags: ["pourcentages", "calcul", "qcm"],
  },
  {
    kind: "fixed",
    id: "pourcentage_calcul_simple_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentages",
    microId: "pourcentage_calcul_simple",
    difficulty: 3,
    theme: "reunion",
    text: "À La Réunion, un groupe de 20 randonneurs compte 50 % d’adultes. Combien y a-t-il d’adultes ?",
    format: "qcm",
    choices: ["5", "10", "15", "20"],
    expected: ["10"],
    explanation: expectedExplanation(["10"]),
    comparator: "mcq_exact",
    hint: "50 %, c’est la moitié.",
    tags: ["pourcentages", "calcul", "reunion", "qcm"],
  },

  // =========================
  // POURCENTAGE_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "pourcentage_defis_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentages",
    microId: "pourcentage_defis",
    difficulty: 1,
    theme: "neutral",
    text: "Dans une collection de 100 cartes, 8 % sont brillantes. Combien y a-t-il de cartes brillantes ?",
    format: "short",
    expected: ["8"],
    explanation: expectedExplanation(["8"]),
    comparator: "number_equal",
    hint: "8 % = 8 sur 100.",
    tags: ["pourcentages", "defi"],
  },
  {
    kind: "fixed",
    id: "pourcentage_defis_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentages",
    microId: "pourcentage_defis",
    difficulty: 2,
    theme: "neutral",
    text: "Le prix d’un article est 20 €. On calcule 5 % de 20 €. Combien vaut ce pourcentage ?",
    format: "short",
    expected: ["1", "1,0", "1.0"],
    explanation: expectedExplanation(["1", "1,0", "1.0"]),
    comparator: "number_equal",
    hint: "5 % = 5/100 de 20.",
    tags: ["pourcentages", "defi"],
  },
  {
    kind: "fixed",
    id: "pourcentage_defis_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentages",
    microId: "pourcentage_defis",
    difficulty: 3,
    theme: "neutral",
    text: "Parmi 100 élèves, 25 % font du basket et 50 % font du football. Quel sport est le plus pratiqué ?",
    format: "short",
    expected: ["football"],
    explanation: expectedExplanation(["football"]),
    comparator: "contains_keyword",
    hint: "Compare 25 % et 50 %.",
    tags: ["pourcentages", "defi", "comparaison"],
  },
  {
    kind: "fixed",
    id: "pourcentage_defis_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentages",
    microId: "pourcentage_defis",
    difficulty: 3,
    theme: "reunion",
    text: "À La Réunion, sur 100 letchis, 40 % sont mûrs. Combien de letchis sont mûrs ?",
    format: "short",
    expected: ["40"],
    explanation: expectedExplanation(["40"]),
    comparator: "number_equal",
    hint: "40 % = 40 sur 100.",
    tags: ["pourcentages", "defi", "reunion"],
  },
  {
    kind: "fixed",
    id: "pourcentage_defis_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentages",
    microId: "pourcentage_defis",
    difficulty: 4,
    theme: "neutral",
    text: "Quel pourcentage représente exactement la moitié d’un groupe ?",
    format: "short",
    expected: ["50", "50%"],
    explanation: expectedExplanation(["50", "50%"]),
    comparator: "contains_keyword",
    hint: "La moitié, c’est 1 sur 2.",
    tags: ["pourcentages", "defi", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "pourcentage_defis_fixed_6",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentages",
    microId: "pourcentage_defis",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi 25 % correspond à 1/4.",
    format: "short",
    expected: ["25/100", "1/4", "100", "4"],
    explanation: expectedExplanation(["25/100", "1/4", "100", "4"]),
    comparator: "contains_keyword",
    hint: "Commence par écrire 25 % sous forme de fraction.",
    tags: ["pourcentages", "defi", "raisonnement"],
  },

  // =========================
  // TEMPLATES - COMPRENDRE
  // =========================
  {
    kind: "template",
    id: "pourcentage_comprendre_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentages",
    microId: "pourcentage_comprendre",
    difficulty: 1,
    theme: "neutral",
    hint: "Un pourcentage signifie toujours “sur 100”.",
    tags: ["pourcentages", "comprendre", "template"],
    generate: () => {
      const p = [5, 10, 20, 25, 30, 40, 50, 75][
        Math.floor(Math.random() * 8)
      ];

      return {
        text: `Que signifie ${p} % ?`,
        format: "short",
        expected: [`${p}/100`, `${p} / 100`, `${p} sur 100`],
        explanation: expectedExplanation([`${p}/100`, `${p} / 100`, `${p} sur 100`]),
        comparator: "contains_keyword",
      };
    },
  },
  {
    kind: "template",
    id: "pourcentage_comprendre_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentages",
    microId: "pourcentage_comprendre",
    difficulty: 2,
    theme: "neutral",
    hint: "Le symbole % signifie “sur 100”.",
    tags: ["pourcentages", "comprendre", "qcm", "template"],
    generate: () => {
      const p = [5, 15, 20, 35, 40, 60][Math.floor(Math.random() * 6)];
      const good = `${p} sur 100`;

      return {
        text: `${p} % signifie…`,
        format: "qcm",
        choices: shuffle([
          good,
          `${p} sur 10`,
          `${p * 10} sur 100`,
          `100 sur ${p}`,
        ]),
        expected: [good],
        explanation: expectedExplanation([good]),
        comparator: "mcq_exact",
      };
    },
  },

  // =========================
  // TEMPLATES - FRACTION
  // =========================
  {
    kind: "template",
    id: "pourcentage_fraction_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentages",
    microId: "pourcentage_fraction",
    difficulty: 1,
    theme: "neutral",
    hint: "Écris le pourcentage sur 100.",
    tags: ["pourcentages", "fraction", "template"],
    generate: () => {
      const p = [5, 10, 20, 25, 40, 50, 75][Math.floor(Math.random() * 7)];

      return {
        text: `Écris ${p} % sous forme de fraction sur 100.`,
        format: "short",
        expected: [`${p}/100`, `${p} / 100`],
        explanation: expectedExplanation([`${p}/100`, `${p} / 100`]),
        comparator: "fraction_decimal_equivalent",
      };
    },
  },
  {
    kind: "template",
    id: "pourcentage_fraction_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentages",
    microId: "pourcentage_fraction",
    difficulty: 2,
    theme: "neutral",
    hint: "Le numérateur est le pourcentage, le dénominateur vaut 100.",
    tags: ["pourcentages", "fraction", "qcm", "template"],
    generate: () => {
      const p = [5, 10, 15, 20, 25, 40][Math.floor(Math.random() * 6)];
      const good = `${p}/100`;

      return {
        text: `Quelle fraction correspond à ${p} % ?`,
        format: "qcm",
        choices: shuffle([
          good,
          `${p}/10`,
          `1/${p}`,
          `${100}/${p}`,
        ]),
        expected: [good],
        explanation: expectedExplanation([good]),
        comparator: "mcq_exact",
      };
    },
  },

  // =========================
  // TEMPLATES - DECIMAL
  // =========================
  {
    kind: "template",
    id: "pourcentage_decimal_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentages",
    microId: "pourcentage_decimal",
    difficulty: 2,
    theme: "neutral",
    hint: "Un pourcentage s’écrit en décimal en divisant par 100.",
    tags: ["pourcentages", "decimal", "template"],
    generate: () => {
      const p = [5, 10, 20, 25, 40, 50, 75][Math.floor(Math.random() * 7)];
      const dec = p / 100;

      return {
        text: `Écris ${p} % sous forme décimale.`,
        format: "short",
        expected: [formatComma(dec), String(dec), `${p}/100`, `${p} / 100`],
        explanation: expectedExplanation([formatComma(dec), String(dec), `${p}/100`, `${p} / 100`]),
        comparator: "fraction_decimal_equivalent",
      };
    },
  },
  {
    kind: "template",
    id: "pourcentage_decimal_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentages",
    microId: "pourcentage_decimal",
    difficulty: 2,
    theme: "neutral",
    hint: "Divise par 100.",
    tags: ["pourcentages", "decimal", "qcm", "template"],
    generate: () => {
      const p = [5, 10, 25, 50, 75][Math.floor(Math.random() * 5)];
      const good = percentToDecimalString(p);

      const distractors = shuffle(
        Array.from(
          new Set([
            formatComma(p / 10),
            formatComma(p),
            formatComma(p / 1000),
          ])
        ).filter((x) => x !== good)
      ).slice(0, 3);

      return {
        text: `Quelle écriture décimale correspond à ${p} % ?`,
        format: "qcm",
        choices: shuffle([good, ...distractors]),
        expected: [good, good.replace(",", ".")],
        explanation: expectedExplanation([good, good.replace(",", ".")]),
        comparator: "mcq_exact",
      };
    },
  },

  // =========================
  // TEMPLATES - LIRE
  // =========================
  {
    kind: "template",
    id: "pourcentage_lire_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentages",
    microId: "pourcentage_lire",
    difficulty: 2,
    theme: "neutral",
    hint: "Le pourcentage indique combien sur 100.",
    tags: ["pourcentages", "lecture", "template"],
    generate: () => {
      const p = [5, 10, 15, 20, 25, 30, 40, 50][
        Math.floor(Math.random() * 8)
      ];

      return {
        text: `Dans un groupe de 100 élèves, ${p} % aiment chanter. Combien cela représente-t-il ?`,
        format: "short",
        expected: [String(p)],
        explanation: expectedExplanation([String(p)]),
        comparator: "number_equal",
      };
    },
  },
  {
    kind: "template",
    id: "pourcentage_lire_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentages",
    microId: "pourcentage_lire",
    difficulty: 2,
    theme: "neutral",
    hint: "Le pourcentage donne directement le nombre sur 100.",
    tags: ["pourcentages", "lecture", "qcm", "template"],
    generate: () => {
      const p = [8, 12, 18, 24, 35, 45][Math.floor(Math.random() * 6)];

      return {
        text: `Sur 100 objets, ${p} % sont bleus. Combien d’objets sont bleus ?`,
        format: "qcm",
        choices: shuffle([
          String(p),
          String(p + 5),
          String(Math.max(0, p - 5)),
          "100",
        ]),
        expected: [String(p)],
        explanation: expectedExplanation([String(p)]),
        comparator: "mcq_exact",
      };
    },
  },

  // =========================
  // TEMPLATES - CALCUL SIMPLE
  // =========================
  {
    kind: "template",
    id: "pourcentage_calcul_simple_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentages",
    microId: "pourcentage_calcul_simple",
    difficulty: 2,
    theme: "neutral",
    hint: "10 % = 1/10 ; 50 % = la moitié ; 25 % = le quart.",
    tags: ["pourcentages", "calcul", "template"],
    generate: () => {
      const cases = [
        { p: 10, n: 20, r: 2 },
        { p: 10, n: 40, r: 4 },
        { p: 10, n: 60, r: 6 },
        { p: 50, n: 18, r: 9 },
        { p: 50, n: 24, r: 12 },
        { p: 25, n: 20, r: 5 },
        { p: 25, n: 40, r: 10 },
      ];
      const c = cases[Math.floor(Math.random() * cases.length)];

      return {
        text: `Calcule ${c.p} % de ${c.n}.`,
        format: "short",
        expected: [String(c.r)],
        explanation: expectedExplanation([String(c.r)]),
        comparator: "number_equal",
      };
    },
  },
  {
    kind: "template",
    id: "pourcentage_calcul_simple_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentages",
    microId: "pourcentage_calcul_simple",
    difficulty: 3,
    theme: "neutral",
    hint: "Choisis une méthode simple : moitié, quart, dixième.",
    tags: ["pourcentages", "calcul", "qcm", "template"],
    generate: () => {
      const cases = [
        { p: 10, n: 70, r: 7 },
        { p: 50, n: 26, r: 13 },
        { p: 25, n: 12, r: 3 },
      ];
      const c = cases[Math.floor(Math.random() * cases.length)];

      return {
        text: `Quel est ${c.p} % de ${c.n} ?`,
        format: "qcm",
        choices: shuffle([
          String(c.r),
          String(c.r + 1),
          String(c.n),
          String(Math.max(1, c.r - 1)),
        ]),
        expected: [String(c.r)],
        explanation: expectedExplanation([String(c.r)]),
        comparator: "mcq_exact",
      };
    },
  },

  // =========================
  // TEMPLATES - DEFIS
  // =========================
  {
    kind: "template",
    id: "pourcentage_defis_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentages",
    microId: "pourcentage_defis",
    difficulty: 4,
    theme: "neutral",
    hint: "Pense à “sur 100” ou à une fraction simple.",
    tags: ["pourcentages", "defi", "template"],
    generate: () => {
      const cases = [
        { text: "Quel pourcentage correspond à une moitié ?", expected: ["50", "50%"] },
        { text: "Quel pourcentage correspond à un quart ?", expected: ["25", "25%"] },
        { text: "Quel pourcentage correspond à un dixième ?", expected: ["10", "10%"] },
      ];
      const c = cases[Math.floor(Math.random() * cases.length)];

      return {
        text: c.text,
        format: "short",
        expected: c.expected,
        explanation: expectedExplanation(c.expected),
        comparator: "contains_keyword",
      };
    },
  },
  {
    kind: "template",
    id: "pourcentage_defis_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "pourcentages",
    microId: "pourcentage_defis",
    difficulty: 5,
    theme: "neutral",
    hint: "Compare les pourcentages ou relie-les à des fractions.",
    tags: ["pourcentages", "defi", "qcm", "template"],
    generate: () => {
      const cases = [
        {
          text: "Quel pourcentage représente exactement la moitié ?",
          good: "50 %",
          choices: ["25 %", "50 %", "75 %", "100 %"],
        },
        {
          text: "Quel pourcentage représente exactement le quart ?",
          good: "25 %",
          choices: ["10 %", "20 %", "25 %", "40 %"],
        },
        {
          text: "Quel pourcentage est le plus grand ?",
          good: "75 %",
          choices: ["25 %", "50 %", "75 %", "5 %"],
        },
      ];
      const c = cases[Math.floor(Math.random() * cases.length)];

      return {
        text: c.text,
        format: "qcm",
        choices: shuffle(c.choices),
        expected: [c.good],
        explanation: expectedExplanation([c.good]),
        comparator: "mcq_exact",
      };
    },
  },
];
