// lib/tutor-v4/question-banks/maths/cm2/nombres-decimaux.bank.ts

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function formatComma(n: number | string) {
  return String(n).replace(".", ",");
}

function expectedDecimal(n: number) {
  const s = String(n);
  return [s, formatComma(s)];
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  // Jamais deux fois la même ligne. Un gabarit dont le piège coïncide avec la
  // bonne réponse (les coordonnées inversées quand x = y, un arrondi égal à la
  // valeur de départ…) affichait la même proposition deux fois, et l'élève
  // voyait deux réponses justes. Dédupliquer AVANT de couper à quatre laisse
  // aussi une chance aux distracteurs surnuméraires de prendre la place.
  return shuffle(Array.from(new Set([correct, ...wrongs]))).slice(0, 4);
}

function exp(
  definition: string,
  methode: string,
  calcul: string,
  conclusion: string
) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;
}

function numberLineCanvas(data: {
  min: number;
  max: number;
  step: number;
  value?: number;
  label?: string;
}) {
  return {
    kind: "number_line" as const,
    min: data.min,
    max: data.max,
    step: data.step,
    points:
      data.value !== undefined
        ? [
            {
              value: data.value,
              label: data.label ?? formatComma(data.value),
              color: "#2563eb",
            },
          ]
        : [],
    display: {
      showTicks: true,
      showValues: true,
      showPoints: data.value !== undefined,
      showPointLabels: true,
      showZero: true,
    },
    size: {
      width: 340,
      height: 130,
    },
  };
}

export const nombresDecimauxBank: TutorBankItemV4[] = [
  // ============================================================
  // DECIMAL_LIRE
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_decimal_lire_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Écris en chiffres : trois unités et quatre dixièmes.",
    format: "short",
    expected: ["3,4", "3.4", "3,40", "3.40"],
    comparator: "number_equal",
    hint: "Quatre dixièmes s’écrivent 0,4.",
    explanation: exp(
      "Un nombre décimal peut avoir une partie entière et une partie décimale.",
      "On place les unités avant la virgule et les dixièmes juste après la virgule.",
      "Trois unités et quatre dixièmes s’écrivent 3,4.",
      "La réponse est 3,4."
    ),
    tags: ["cm2", "nombre_decimal", "lecture", "dixieme"],
  },

  {
    kind: "fixed",
    id: "cm2_decimal_lire_fixed_2",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Écris en chiffres : cinq unités et huit centièmes.",
    format: "short",
    expected: ["5,08", "5.08"],
    comparator: "number_equal",
    hint: "Huit centièmes s’écrivent 0,08.",
    explanation: exp(
      "Un nombre décimal peut contenir des dixièmes et des centièmes.",
      "Les centièmes occupent le deuxième rang après la virgule.",
      "Cinq unités et huit centièmes s’écrivent 5,08.",
      "La réponse est 5,08."
    ),
    tags: ["cm2", "nombre_decimal", "lecture", "centieme", "piege"],
  },

  {
    kind: "template",
    id: "cm2_decimal_lire_tpl_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_lire",
    difficulty: 1,
    theme: "neutral",
    hint: "Le chiffre des dixièmes se place juste après la virgule.",
    tags: ["cm2", "nombre_decimal", "lecture", "template"],
    generate: () => {
      const u = randomInt(1, 9);
      const d = randomInt(1, 9);
      const value = Number(`${u}.${d}`);

      return {
        text: `Écris en chiffres : ${u} unités et ${d} dixièmes.`,
        format: "short",
        expected: expectedDecimal(value),
        comparator: "number_equal",
        explanation: exp(
          "Un nombre décimal peut s’écrire avec une partie entière et une partie décimale.",
          "On écrit les unités avant la virgule et les dixièmes après la virgule.",
          `${u} unités et ${d} dixièmes s’écrivent ${formatComma(value)}.`,
          `La réponse est ${formatComma(value)}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_decimal_lire_tpl_2_centiemes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_lire",
    difficulty: 2,
    theme: "neutral",
    hint: "Les centièmes se placent au deuxième rang après la virgule.",
    tags: ["cm2", "nombre_decimal", "lecture", "centiemes", "template"],
    generate: () => {
      const u = randomInt(1, 9);
      const c = randomInt(1, 9);
      const valueText = `${u},0${c}`;

      return {
        text: `Écris en chiffres : ${u} unités et ${c} centièmes.`,
        format: "short",
        expected: [valueText, valueText.replace(",", ".")],
        comparator: "number_equal",
        explanation: exp(
          "Les centièmes occupent le deuxième rang après la virgule.",
          "S’il n’y a pas de dixième, on écrit 0 au rang des dixièmes.",
          `${u} unités et ${c} centièmes s’écrivent ${valueText}.`,
          `La réponse est ${valueText}.`
        ),
      };
    },
  },

  // ============================================================
  // DECIMAL_FRACTION
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_decimal_fraction_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_fraction",
    difficulty: 1,
    theme: "neutral",
    text: "Écris en décimal : 7/10",
    format: "short",
    expected: ["0,7", "0.7", "0,70", "0.70"],
    comparator: "fraction_decimal_equivalent",
    hint: "7/10 signifie 7 dixièmes.",
    explanation: exp(
      "Une fraction décimale a un dénominateur 10, 100, 1000...",
      "On transforme les dixièmes en écriture décimale.",
      "7/10 = 0,7.",
      "La réponse est 0,7."
    ),
    tags: ["cm2", "nombre_decimal", "fraction_decimale"],
  },

  {
    kind: "fixed",
    id: "cm2_decimal_fraction_fixed_2",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_fraction",
    difficulty: 2,
    theme: "neutral",
    text: "Écris en décimal : 34/100",
    format: "short",
    expected: ["0,34", "0.34"],
    comparator: "fraction_decimal_equivalent",
    hint: "34/100 signifie 34 centièmes.",
    explanation: exp(
      "Une fraction décimale peut se transformer en nombre décimal.",
      "Les centièmes occupent deux chiffres après la virgule.",
      "34/100 = 0,34.",
      "La réponse est 0,34."
    ),
    tags: ["cm2", "nombre_decimal", "fraction_decimale", "centieme"],
  },

  {
    kind: "template",
    id: "cm2_decimal_fraction_tpl_1_dixiemes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_fraction",
    difficulty: 1,
    theme: "neutral",
    hint: "n/10 signifie n dixièmes.",
    tags: ["cm2", "nombre_decimal", "fraction_decimale", "template"],
    generate: () => {
      const n = randomInt(1, 9);
      const value = n / 10;

      return {
        text: `Écris en décimal : ${n}/10`,
        format: "short",
        expected: expectedDecimal(value),
        comparator: "fraction_decimal_equivalent",
        explanation: exp(
          "Une fraction décimale peut s’écrire avec une virgule.",
          "On écrit les dixièmes au premier rang après la virgule.",
          `${n}/10 = ${formatComma(value)}.`,
          `La réponse est ${formatComma(value)}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_decimal_fraction_tpl_2_centiemes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_fraction",
    difficulty: 2,
    theme: "neutral",
    hint: "n/100 signifie n centièmes.",
    tags: ["cm2", "nombre_decimal", "fraction_decimale", "centiemes", "template"],
    generate: () => {
      const n = randomChoice([12, 25, 34, 48, 56, 75, 90]);
      const value = n / 100;

      return {
        text: `Écris en décimal : ${n}/100`,
        format: "short",
        expected: expectedDecimal(value),
        comparator: "fraction_decimal_equivalent",
        explanation: exp(
          "Une fraction décimale de dénominateur 100 donne des centièmes.",
          "On écrit deux chiffres après la virgule.",
          `${n}/100 = ${formatComma(value)}.`,
          `La réponse est ${formatComma(value)}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_decimal_fraction_qcm_tpl_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_fraction",
    difficulty: 2,
    theme: "neutral",
    hint: "Attention : 6/100 n’est pas 0,6.",
    tags: ["cm2", "nombre_decimal", "fraction_decimale", "qcm", "piege"],
    generate: () => {
      const n = randomInt(2, 9);
      const correct = `0,0${n}`;

      return {
        text: `Quelle écriture décimale correspond à ${n}/100 ?`,
        format: "qcm",
        choices: makeChoices(correct, [`0,${n}`, `${n},00`, `0,${n}0`]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Une fraction sur 100 indique des centièmes.",
          "On place le chiffre au rang des centièmes.",
          `${n}/100 = ${correct}.`,
          `La bonne réponse est ${correct}.`
        ),
      };
    },
  },

  // ============================================================
  // DECIMAL_VALEUR_CHIFFRE
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_decimal_valeur_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_valeur_chiffre",
    difficulty: 1,
    theme: "neutral",
    text: "Dans 4,7, quel chiffre est au rang des dixièmes ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Le chiffre des dixièmes est juste après la virgule.",
    explanation: exp(
      "Chaque chiffre a une valeur selon sa position.",
      "On regarde le premier chiffre après la virgule.",
      "Dans 4,7, le chiffre des dixièmes est 7.",
      "La réponse est 7."
    ),
    tags: ["cm2", "nombre_decimal", "rang", "dixieme"],
  },

  {
    kind: "fixed",
    id: "cm2_decimal_valeur_fixed_2",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_valeur_chiffre",
    difficulty: 2,
    theme: "neutral",
    text: "Dans 8,36, quel chiffre est au rang des centièmes ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Le chiffre des centièmes est le deuxième après la virgule.",
    explanation: exp(
      "Chaque chiffre d’un nombre décimal a un rang.",
      "Après la virgule : dixièmes, puis centièmes.",
      "Dans 8,36, 3 est au rang des dixièmes et 6 au rang des centièmes.",
      "La réponse est 6."
    ),
    tags: ["cm2", "nombre_decimal", "rang", "centieme"],
  },

  {
    kind: "template",
    id: "cm2_decimal_valeur_tpl_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_valeur_chiffre",
    difficulty: 2,
    theme: "neutral",
    hint: "Après la virgule : dixièmes, centièmes.",
    tags: ["cm2", "nombre_decimal", "rang", "template"],
    generate: () => {
      const u = randomInt(1, 9);
      const d = randomInt(1, 9);
      const c = randomInt(1, 9);
      const number = `${u},${d}${c}`;

      return {
        text: `Dans ${number}, quel chiffre est au rang des dixièmes ?`,
        format: "short",
        expected: [String(d)],
        comparator: "number_equal",
        explanation: exp(
          "Le chiffre des dixièmes est le premier chiffre après la virgule.",
          "On observe la position des chiffres.",
          `Dans ${number}, le chiffre ${d} est juste après la virgule.`,
          `La réponse est ${d}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_decimal_valeur_qcm_tpl_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_valeur_chiffre",
    difficulty: 3,
    theme: "neutral",
    hint: "Le deuxième chiffre après la virgule est au rang des centièmes.",
    tags: ["cm2", "nombre_decimal", "rang", "qcm", "template"],
    generate: () => {
      const u = randomInt(1, 9);
      const d = randomInt(1, 9);
      const c = randomInt(1, 9);
      const number = `${u},${d}${c}`;

      return {
        text: `Quel est le rang du chiffre ${c} dans ${number} ?`,
        format: "qcm",
        choices: shuffle(["unités", "dixièmes", "centièmes", "centaines"]),
        expected: ["centièmes"],
        comparator: "mcq_exact",
        explanation: exp(
          "Dans un nombre décimal, les chiffres après la virgule ont des rangs précis.",
          "On lit les chiffres de gauche à droite après la virgule.",
          `Dans ${number}, ${d} est au rang des dixièmes et ${c} au rang des centièmes.`,
          `Le chiffre ${c} est au rang des centièmes.`
        ),
      };
    },
  },

  // ============================================================
  // DECIMAL_COMPARER
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_decimal_comparer_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_comparer",
    difficulty: 1,
    theme: "neutral",
    text: "Quel nombre est le plus grand : 0,7 ou 0,65 ?",
    format: "short",
    expected: ["0,7", "0.7", "0,70", "0.70"],
    comparator: "number_equal",
    hint: "Compare 0,70 et 0,65.",
    explanation: exp(
      "Comparer deux nombres décimaux, c’est chercher lequel est le plus grand ou le plus petit.",
      "On peut ajouter des zéros pour avoir le même nombre de chiffres après la virgule.",
      "0,7 = 0,70 et 0,70 > 0,65.",
      "Le plus grand est 0,7."
    ),
    tags: ["cm2", "nombre_decimal", "comparaison", "piege"],
  },

  {
    kind: "fixed",
    id: "cm2_decimal_comparer_fixed_2",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel nombre est le plus petit : 0,305 ou 0,35 ?",
    format: "short",
    expected: ["0,305", "0.305"],
    comparator: "number_equal",
    hint: "Compare 0,305 et 0,350.",
    explanation: exp(
      "Pour comparer des décimaux, on peut écrire autant de chiffres après la virgule.",
      "On ajoute un zéro inutile à 0,35.",
      "0,35 = 0,350. Or 0,305 < 0,350.",
      "Le plus petit est 0,305."
    ),
    tags: ["cm2", "nombre_decimal", "comparaison", "piege"],
  },

  {
    kind: "template",
    id: "cm2_decimal_comparer_tpl_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Compare chiffre par chiffre.",
    tags: ["cm2", "nombre_decimal", "comparaison", "template"],
    generate: () => {
      const a = Number((randomInt(10, 99) / 100).toFixed(2));
      let b = Number((randomInt(10, 99) / 100).toFixed(2));
      while (b === a) b = Number((randomInt(10, 99) / 100).toFixed(2));

      const max = Math.max(a, b);

      return {
        text: `Quel nombre est le plus grand : ${formatComma(a)} ou ${formatComma(b)} ?`,
        format: "short",
        expected: expectedDecimal(max),
        comparator: "number_equal",
        explanation: exp(
          "Comparer des décimaux consiste à comparer leur valeur.",
          "On compare les chiffres dans l’ordre : unités, dixièmes, centièmes.",
          `Entre ${formatComma(a)} et ${formatComma(b)}, le plus grand est ${formatComma(max)}.`,
          `La réponse est ${formatComma(max)}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_decimal_comparer_qcm_tpl_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "0,6 = 0,60.",
    tags: ["cm2", "nombre_decimal", "comparaison", "qcm", "template"],
    generate: () => {
      const correct = "0,6";
      const choices = shuffle(["0,6", "0,56", "0,509", "0,59"]);

      return {
        text: "Quel est le plus grand nombre ?",
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On peut ajouter des zéros à droite d’un nombre décimal sans changer sa valeur.",
          "On écrit 0,6 sous la forme 0,600.",
          "0,600 est plus grand que 0,590, 0,560 et 0,509.",
          "Le plus grand nombre est 0,6."
        ),
      };
    },
  },

  // ============================================================
  // DECIMAL_ORDONNER
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_decimal_ordonner_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_ordonner",
    difficulty: 2,
    theme: "neutral",
    text: "Range dans l’ordre croissant : 0,4 ; 0,35 ; 0,5",
    format: "qcm",
    choices: [
      "0,35 ; 0,4 ; 0,5",
      "0,5 ; 0,4 ; 0,35",
      "0,4 ; 0,35 ; 0,5",
      "0,35 ; 0,5 ; 0,4",
    ],
    expected: ["0,35 ; 0,4 ; 0,5"],
    comparator: "mcq_exact",
    hint: "Ordre croissant signifie du plus petit au plus grand.",
    explanation: exp(
      "Ordonner, c’est ranger plusieurs nombres.",
      "Pour l’ordre croissant, on va du plus petit au plus grand.",
      "0,35 < 0,4 < 0,5.",
      "L’ordre croissant est 0,35 ; 0,4 ; 0,5."
    ),
    tags: ["cm2", "nombre_decimal", "ordonner", "qcm"],
  },

  {
    kind: "template",
    id: "cm2_decimal_ordonner_tpl_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_ordonner",
    difficulty: 3,
    theme: "neutral",
    hint: "Écris les nombres avec le même nombre de chiffres après la virgule.",
    tags: ["cm2", "nombre_decimal", "ordonner", "template"],
    generate: () => {
      const values = shuffle([0.4, 0.35, 0.5, 0.305]).slice(0, 3);
      const sorted = [...values].sort((a, b) => a - b);

      const correct = sorted.map(formatComma).join(" ; ");
      const wrong1 = [...sorted].reverse().map(formatComma).join(" ; ");
      const wrong2 = shuffle(values).map(formatComma).join(" ; ");
      const wrong3 = shuffle(values).map(formatComma).join(" ; ");

      return {
        text: `Range dans l’ordre croissant : ${values.map(formatComma).join(" ; ")}`,
        format: "qcm",
        choices: makeChoices(correct, [wrong1, wrong2, wrong3]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Ranger dans l’ordre croissant signifie aller du plus petit au plus grand.",
          "On compare les nombres décimaux entre eux.",
          `L’ordre croissant est ${correct}.`,
          `La réponse est ${correct}.`
        ),
      };
    },
  },

  // ============================================================
  // DECIMAL_DROITE
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_decimal_droite_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_droite",
    difficulty: 2,
    theme: "neutral",
    text: "Sur la droite graduée de 0 à 1, où se place 0,5 ?",
    format: "qcm",
    choices: [
      "au milieu entre 0 et 1",
      "près de 0",
      "après 1",
      "au même endroit que 0,05",
    ],
    expected: ["au milieu entre 0 et 1"],
    comparator: "mcq_exact",
    hint: "0,5 est la moitié de 1.",
    explanation: exp(
      "Un nombre décimal peut se placer sur une droite graduée.",
      "On repère les graduations entre 0 et 1.",
      "0,5 est la moitié de 1.",
      "0,5 se place au milieu entre 0 et 1."
    ),
    canvas: numberLineCanvas({
      min: 0,
      max: 1,
      step: 0.1,
      value: 0.5,
      label: "0,5",
    }),
    tags: ["cm2", "nombre_decimal", "droite_graduee", "canvas"],
  },

  {
    kind: "template",
    id: "cm2_decimal_droite_tpl_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_droite",
    difficulty: 2,
    theme: "neutral",
    hint: "Chaque graduation vaut 0,1.",
    tags: ["cm2", "nombre_decimal", "droite_graduee", "template", "canvas"],
    generate: () => {
      const tenth = randomInt(1, 9);
      const value = tenth / 10;

      return {
        text: `Quelle valeur est placée sur la droite graduée ?`,
        format: "short",
        expected: expectedDecimal(value),
        comparator: "number_equal",
        explanation: exp(
          "Sur une droite graduée, chaque point correspond à un nombre.",
          "Ici, chaque graduation vaut un dixième.",
          `Le point est placé à ${formatComma(value)}.`,
          `La réponse est ${formatComma(value)}.`
        ),
        canvas: numberLineCanvas({
          min: 0,
          max: 1,
          step: 0.1,
          value,
          label: "?",
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_decimal_droite_tpl_2_intervalle",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_droite",
    difficulty: 3,
    theme: "neutral",
    hint: "Repère l’intervalle entre deux entiers.",
    tags: ["cm2", "nombre_decimal", "droite_graduee", "template", "canvas"],
    generate: () => {
      const start = randomInt(1, 5);
      const tenth = randomChoice([2, 4, 5, 7, 8]);
      const value = start + tenth / 10;

      return {
        text: "Quelle valeur est indiquée par le point sur la droite graduée ?",
        format: "short",
        expected: expectedDecimal(value),
        comparator: "number_equal",
        explanation: exp(
          "Un nombre décimal peut se placer entre deux entiers.",
          "On part de l’entier puis on avance de dixièmes.",
          `Le point est placé à ${formatComma(value)}.`,
          `La réponse est ${formatComma(value)}.`
        ),
        canvas: numberLineCanvas({
          min: start,
          max: start + 1,
          step: 0.1,
          value,
          label: "?",
        }),
      };
    },
  },

  // ============================================================
  // DECIMAL_ARRONDIR
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_decimal_arrondir_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_arrondir",
    difficulty: 3,
    theme: "neutral",
    text: "Arrondis 3,6 à l’unité la plus proche.",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "3,6 est plus proche de 4 que de 3.",
    explanation: exp(
      "Arrondir, c’est remplacer un nombre par une valeur proche plus simple.",
      "Pour arrondir à l’unité, on regarde le chiffre des dixièmes.",
      "Dans 3,6, le chiffre des dixièmes est 6, donc on arrondit à 4.",
      "La réponse est 4."
    ),
    tags: ["cm2", "nombre_decimal", "arrondir"],
  },

  {
    kind: "fixed",
    id: "cm2_decimal_arrondir_fixed_2",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_arrondir",
    difficulty: 3,
    theme: "neutral",
    text: "Arrondis 7,2 à l’unité la plus proche.",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "7,2 est plus proche de 7 que de 8.",
    explanation: exp(
      "Arrondir permet de donner une valeur approchée.",
      "Pour arrondir à l’unité, on regarde le chiffre des dixièmes.",
      "Dans 7,2, le chiffre des dixièmes est 2, donc on garde 7.",
      "La réponse est 7."
    ),
    tags: ["cm2", "nombre_decimal", "arrondir"],
  },

  {
    kind: "template",
    id: "cm2_decimal_arrondir_tpl_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_arrondir",
    difficulty: 3,
    theme: "neutral",
    hint: "Si le dixième est 5 ou plus, on arrondit à l’unité supérieure.",
    tags: ["cm2", "nombre_decimal", "arrondir", "template"],
    generate: () => {
      const unit = randomInt(2, 9);
      const tenth = randomInt(1, 9);
      const value = unit + tenth / 10;
      const rounded = Math.round(value);

      return {
        text: `Arrondis ${formatComma(value)} à l’unité la plus proche.`,
        format: "short",
        expected: [String(rounded)],
        comparator: "number_equal",
        explanation: exp(
          "Arrondir à l’unité consiste à choisir l’entier le plus proche.",
          "On regarde le chiffre des dixièmes.",
          `${formatComma(value)} est plus proche de ${rounded}.`,
          `La réponse est ${rounded}.`
        ),
      };
    },
  },

  // ============================================================
  // DECIMAL_DEFI
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_decimal_defi_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_defi",
    difficulty: 3,
    theme: "reunion",
    text: "À La Réunion, un sentier fait 2,5 km. Que représente le 0,5 km ?",
    format: "qcm",
    choices: ["5 m", "50 m", "500 m", "5 km"],
    expected: ["500 m"],
    comparator: "mcq_exact",
    hint: "0,5 km est la moitié d’un kilomètre.",
    explanation: exp(
      "Un nombre décimal permet de mesurer plus précisément.",
      "On utilise la relation 1 km = 1000 m.",
      "0,5 km est la moitié de 1000 m, donc 500 m.",
      "0,5 km représente 500 m."
    ),
    tags: ["cm2", "nombre_decimal", "defi", "reunion", "mesure"],
  },

  {
    kind: "fixed",
    id: "cm2_decimal_defi_fixed_2",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Au marché, un fruit coûte 2,50 € et un autre coûte 2,5 €. Lequel est le plus cher ?",
    format: "qcm",
    choices: [
      "2,50 €",
      "2,5 €",
      "ils coûtent le même prix",
      "on ne peut pas savoir",
    ],
    expected: ["ils coûtent le même prix"],
    comparator: "mcq_exact",
    hint: "Un zéro à droite de la partie décimale ne change pas la valeur.",
    explanation: exp(
      "Ajouter un zéro à droite d’un nombre décimal ne change pas sa valeur.",
      "On compare 2,50 et 2,5.",
      "2,50 = 2,5.",
      "Les deux fruits coûtent le même prix."
    ),
    tags: ["cm2", "nombre_decimal", "defi", "reunion", "piege"],
  },

  {
    kind: "template",
    id: "cm2_decimal_defi_tpl_1_eau",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_defi",
    difficulty: 4,
    theme: "reunion",
    hint: "On partage la quantité en parts égales.",
    tags: ["cm2", "nombre_decimal", "defi", "eau", "template"],
    generate: () => {
      const divisor = randomChoice([2, 3, 4, 5]);
      const quotient = randomChoice([0.5, 1.2, 1.5, 2.4]);
      const total = Number((divisor * quotient).toFixed(1));

      return {
        text: `On partage ${formatComma(total)} litres d’eau entre ${divisor} gourdes. Quelle quantité y a-t-il dans chaque gourde ?`,
        format: "short",
        expected: expectedDecimal(quotient),
        comparator: "number_equal",
        explanation: exp(
          "Partager une quantité, c’est diviser.",
          "On divise la quantité totale par le nombre de gourdes.",
          `${formatComma(total)} ÷ ${divisor} = ${formatComma(quotient)}.`,
          `Chaque gourde contient ${formatComma(quotient)} litre(s).`
        ),
      };
    },
  },
];