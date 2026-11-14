// lib/tutor-v4/question-banks/maths/cm1/decimaux.bank.ts

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { gabaritsDecimalDroite } from "./decimal-droite.gen";
import { gabaritsDecimauxCm1 } from "./decimaux-outils";
import { melangeEnPlace } from "@/lib/tutor-v4/questionBank/melange";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: T[]): T[] {
  return melangeEnPlace([...items]);
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

function exp(
  definition: string,
  methode: string,
  calcul: string,
  conclusion: string
) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;
}

function fractionCanvas(data: {
  numerator: number;
  denominator: number;
  model?: "bar" | "circle";
  label?: string;
  showFraction?: boolean;
  unequalParts?: boolean;
}) {
  return {
    kind: "fraction" as const,
    model: data.model ?? "bar",
    fraction: {
      numerator: data.numerator,
      denominator: data.denominator,
      label: data.label,
    },
    display: {
      showFraction: data.showFraction ?? false,
      showLabel: true,
      showParts: true,
      unequalParts: data.unequalParts ?? false,
    },
  };
}

function droiteGradueeFractionCanvas(data: {
  denominator: number;
  numerator: number;
  label?: string;
  showPointLabel?: boolean;
}) {
  return {
    kind: "number_line" as const,
    min: 0,
    max: 1,
    // ⛔ 08/11/2026 : `step: 1/10` écrivait chaque dixième sous son trait, et
    // « 0,7 » s'affichait juste sous le point « ? ». Seuls 0 et 1 sont écrits ;
    // les dixièmes restent de petits traits sans nombre.
    step: 1,
    minorStep: 1 / data.denominator,
    points: [
      {
        value: data.numerator / data.denominator,
        label: data.label ?? "?",
        color: "#2563eb",
      },
    ],
    display: {
      showTicks: true,
      showValues: true,
      showPoints: true,
      showPointLabels: data.showPointLabel ?? true,
      showZero: true,
    },
    size: {
      width: 320,
      height: 120,
    },
  };
}

export const decimauxBank: TutorBankItemV4[] = [
  // ============================================================
  // DECIMAL_LIRE
  // Lire et écrire un nombre décimal
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_decimal_lire_qcm_001_dixieme",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Comment lit-on le nombre 0,7 ?",
    format: "qcm",
    choices: [
      "sept dixièmes",
      "sept centièmes",
      "soixante-dix dixièmes",
      "sept unités",
    ],
    expected: ["sept dixièmes"],
    comparator: "mcq_exact",
    hint: "Il y a un seul chiffre après la virgule.",
    explanation: exp(
      "Un nombre décimal peut se lire avec des dixièmes, des centièmes ou des millièmes.",
      "Quand il y a un chiffre après la virgule, on parle de dixièmes.",
      "Dans 0,7, le chiffre 7 est au rang des dixièmes.",
      "0,7 se lit sept dixièmes."
    ),
    tags: ["cm1", "decimal", "lire", "dixieme", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_lire_qcm_002_centieme",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Comment lit-on le nombre 0,23 ?",
    format: "qcm",
    choices: [
      "vingt-trois centièmes",
      "vingt-trois dixièmes",
      "deux cent trois dixièmes",
      "vingt-trois unités",
    ],
    expected: ["vingt-trois centièmes"],
    comparator: "mcq_exact",
    hint: "Il y a deux chiffres après la virgule.",
    explanation: exp(
      "Un nombre décimal peut se lire avec des centièmes.",
      "Quand il y a deux chiffres après la virgule, on peut lire en centièmes.",
      "Dans 0,23, les chiffres après la virgule forment 23 centièmes.",
      "0,23 se lit vingt-trois centièmes."
    ),
    tags: ["cm1", "decimal", "lire", "centieme", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_lire_qcm_003_partie_entiere",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Dans le nombre 4,8, quelle est la partie entière ?",
    format: "qcm",
    choices: ["4", "8", "48", "0,8"],
    expected: ["4"],
    comparator: "mcq_exact",
    hint: "La partie entière est avant la virgule.",
    explanation: exp(
      "Un nombre décimal possède une partie entière et une partie décimale.",
      "On regarde ce qui est écrit avant la virgule.",
      "Dans 4,8, le nombre avant la virgule est 4.",
      "La partie entière est 4."
    ),
    tags: ["cm1", "decimal", "lire", "partie_entiere", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_lire_qcm_004_partie_decimale",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Dans le nombre 6,35, quels sont les chiffres de la partie décimale ?",
    format: "qcm",
    choices: ["35", "6", "635", "3"],
    expected: ["35"],
    comparator: "mcq_exact",
    hint: "La partie décimale est après la virgule.",
    explanation: exp(
      "La partie décimale se trouve après la virgule.",
      "On observe les chiffres écrits après la virgule.",
      "Dans 6,35, les chiffres après la virgule sont 35.",
      "La partie décimale est 35."
    ),
    tags: ["cm1", "decimal", "lire", "partie_decimale", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_lire_short_005_ecrire_chiffres",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Écris en chiffres : trois unités et cinq dixièmes.",
    format: "qcm",
    choices: ["3,5", "5,3", "3,05", "35"],
    expected: ["3,5"],
    comparator: "mcq_exact",
    hint: "Cinq dixièmes s’écrit avec un chiffre après la virgule.",
    explanation: exp(
      "Un nombre décimal peut s’écrire avec une virgule.",
      "On écrit d’abord la partie entière, puis la partie décimale.",
      "Trois unités donnent 3, et cinq dixièmes donnent 0,5.",
      "Le nombre est 3,5."
    ),
    tags: ["cm1", "decimal", "lire", "ecriture", "short"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_lire_short_006_ecrire_centieme",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_lire",
    difficulty: 3,
    theme: "neutral",
    text: "Écris en chiffres : deux unités et quinze centièmes.",
    format: "qcm",
    choices: ["2,15", "2,51", "215", "15,2"],
    expected: ["2,15"],
    comparator: "mcq_exact",
    hint: "Quinze centièmes s’écrit avec deux chiffres après la virgule.",
    explanation: exp(
      "Les centièmes correspondent à deux chiffres après la virgule.",
      "On écrit la partie entière puis les centièmes après la virgule.",
      "Deux unités donnent 2 et quinze centièmes donnent 0,15.",
      "Le nombre est 2,15."
    ),
    tags: ["cm1", "decimal", "lire", "centieme", "short"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_lire_qcm_007_zero_utile",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_lire",
    difficulty: 3,
    theme: "neutral",
    text: "Comment écrit-on cinq unités et trois centièmes ?",
    format: "qcm",
    choices: ["5,03", "5,3", "53", "50,3"],
    expected: ["5,03"],
    comparator: "mcq_exact",
    hint: "Il n’y a pas de dixième : il faut écrire un 0 au rang des dixièmes.",
    explanation: exp(
      "Dans un nombre décimal, les zéros peuvent être utiles pour garder les bons rangs.",
      "Trois centièmes doivent être placés au deuxième chiffre après la virgule.",
      "Il faut écrire 0 dixième puis 3 centièmes : 5,03.",
      "Le nombre est 5,03."
    ),
    tags: ["cm1", "decimal", "lire", "zero", "centieme", "qcm", "piege"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_lire_qcm_008_piege_virgule",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_lire",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève écrit 47 au lieu de 4,7. A-t-il écrit le même nombre ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "La virgule change la valeur du nombre.",
    explanation: exp(
      "La virgule sépare la partie entière et la partie décimale.",
      "Changer la place de la virgule change le nombre.",
      "4,7 signifie 4 unités et 7 dixièmes, alors que 47 signifie 47 unités.",
      "Ce ne sont pas les mêmes nombres."
    ),
    tags: ["cm1", "decimal", "lire", "virgule", "piege", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_lire_open_001_expliquer_0_7",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_lire",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi 0,7 se lit sept dixièmes.",
    format: "open",
    expected: ["7", "dixièmes", "virgule", "après"],
    comparator: "contains_keyword",
    hint: "Regarde le chiffre après la virgule.",
    explanation: exp(
      "Un dixième correspond au premier rang après la virgule.",
      "On regarde le chiffre placé juste après la virgule.",
      "Dans 0,7, le chiffre 7 est au rang des dixièmes.",
      "Donc 0,7 se lit sept dixièmes."
    ),
    tags: ["cm1", "decimal", "lire", "open", "dixieme"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_lire_open_002_zero_utile",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_lire",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi cinq unités et trois centièmes s’écrit 5,03 et non 5,3.",
    format: "open",
    expected: ["centièmes", "0", "dixièmes", "5,03"],
    comparator: "contains_keyword",
    hint: "Dans 5,03, le 0 indique qu’il n’y a pas de dixième.",
    explanation: exp(
      "Les centièmes occupent le deuxième rang après la virgule.",
      "S’il n’y a pas de dixième, on écrit 0 au rang des dixièmes.",
      "Dans 5,03, le 3 est bien au rang des centièmes.",
      "Donc cinq unités et trois centièmes s’écrit 5,03."
    ),
    tags: ["cm1", "decimal", "lire", "open", "zero", "centieme"],
  },

    // ============================================================
  // DECIMAL_FRACTION
  // Relier fraction décimale et nombre décimal
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_decimal_fraction_qcm_001_dixieme",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_fraction",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle écriture décimale correspond à 7/10 ?",
    format: "qcm",
    choices: ["0,7", "0,07", "7,10", "7,0"],
    expected: ["0,7"],
    comparator: "mcq_exact",
    hint: "7/10 signifie 7 dixièmes.",
    explanation: exp(
      "Une fraction décimale peut s’écrire avec une virgule.",
      "Le dénominateur 10 indique des dixièmes.",
      "7/10 signifie 7 dixièmes.",
      "Donc 7/10 = 0,7."
    ),
    canvas: fractionCanvas({
      numerator: 7,
      denominator: 10,
      model: "bar",
      showFraction: false,
    }),
    tags: ["cm1", "decimal", "fraction", "dixieme", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_fraction_qcm_002_centieme",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_fraction",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle écriture décimale correspond à 23/100 ?",
    format: "qcm",
    choices: ["0,23", "2,3", "0,023", "23,100"],
    expected: ["0,23"],
    comparator: "mcq_exact",
    hint: "23/100 signifie 23 centièmes.",
    explanation: exp(
      "Une fraction avec un dénominateur 100 peut s’écrire en centièmes.",
      "Deux chiffres après la virgule correspondent aux centièmes.",
      "23/100 signifie 23 centièmes.",
      "Donc 23/100 = 0,23."
    ),
    tags: ["cm1", "decimal", "fraction", "centieme", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_fraction_qcm_003_decimal_vers_fraction",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_fraction",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle fraction décimale correspond à 0,4 ?",
    format: "qcm",
    choices: ["4/10", "4/100", "10/4", "1/4"],
    expected: ["4/10"],
    comparator: "mcq_exact",
    hint: "0,4 signifie 4 dixièmes.",
    explanation: exp(
      "Un nombre décimal peut s’écrire sous forme de fraction décimale.",
      "Un chiffre après la virgule correspond aux dixièmes.",
      "0,4 signifie 4 dixièmes.",
      "Donc 0,4 = 4/10."
    ),
    canvas: fractionCanvas({
      numerator: 4,
      denominator: 10,
      model: "bar",
      showFraction: false,
    }),
    tags: ["cm1", "decimal", "fraction", "decimal_vers_fraction", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_fraction_qcm_004_centieme_zero",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_fraction",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle fraction décimale correspond à 0,05 ?",
    format: "qcm",
    choices: ["5/100", "5/10", "50/10", "5/5"],
    expected: ["5/100"],
    comparator: "mcq_exact",
    hint: "0,05 signifie 5 centièmes.",
    explanation: exp(
      "Deux chiffres après la virgule correspondent aux centièmes.",
      "Le zéro après la virgule indique qu’il n’y a pas de dixième.",
      "0,05 signifie 5 centièmes.",
      "Donc 0,05 = 5/100."
    ),
    tags: ["cm1", "decimal", "fraction", "zero", "centieme", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_fraction_qcm_005_piege_0_5",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_fraction",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit que 0,5 = 5/100. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "0,5 signifie 5 dixièmes, pas 5 centièmes.",
    explanation: exp(
      "Un chiffre après la virgule correspond aux dixièmes.",
      "Dans 0,5, le 5 est au rang des dixièmes.",
      "0,5 = 5/10, pas 5/100.",
      "L’élève n’a pas raison."
    ),
    canvas: fractionCanvas({
      numerator: 5,
      denominator: 10,
      model: "bar",
      showFraction: false,
    }),
    tags: ["cm1", "decimal", "fraction", "piege", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_fraction_qcm_006_reunion_longueur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_fraction",
    difficulty: 3,
    theme: "reunion",
    text: "Sur un sentier à La Réunion, on a parcouru 0,8 km. Quelle fraction décimale correspond à cette distance ?",
    format: "qcm",
    choices: ["8/10", "8/100", "10/8", "1/8"],
    expected: ["8/10"],
    comparator: "mcq_exact",
    hint: "0,8 signifie 8 dixièmes.",
    explanation: exp(
      "Un nombre décimal peut se traduire par une fraction décimale.",
      "Un chiffre après la virgule correspond aux dixièmes.",
      "0,8 km signifie 8 dixièmes de kilomètre.",
      "0,8 = 8/10."
    ),
    tags: ["cm1", "decimal", "fraction", "reunion", "longueur", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_fraction_short_007_dixieme",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_fraction",
    difficulty: 2,
    theme: "neutral",
    text: "Écris sous forme décimale : 6/10.",
    format: "qcm",
    choices: ["0,6", "0,06", "6,10", "6"],
    expected: ["0,6"],
    comparator: "mcq_exact",
    hint: "6/10 signifie 6 dixièmes.",
    explanation: exp(
      "Une fraction en dixièmes peut s’écrire avec un chiffre après la virgule.",
      "On place le numérateur au rang des dixièmes.",
      "6/10 signifie 6 dixièmes.",
      "Donc 6/10 = 0,6."
    ),
    canvas: fractionCanvas({
      numerator: 6,
      denominator: 10,
      model: "bar",
      showFraction: false,
    }),
    tags: ["cm1", "decimal", "fraction", "short", "dixieme", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_fraction_short_008_centieme",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_fraction",
    difficulty: 3,
    theme: "neutral",
    text: "Écris sous forme décimale : 34/100.",
    format: "qcm",
    choices: ["0,34", "3,4", "34,100", "34"],
    expected: ["0,34"],
    comparator: "mcq_exact",
    hint: "34/100 signifie 34 centièmes.",
    explanation: exp(
      "Une fraction en centièmes peut s’écrire avec deux chiffres après la virgule.",
      "On place les centièmes après la virgule.",
      "34/100 signifie 34 centièmes.",
      "Donc 34/100 = 0,34."
    ),
    tags: ["cm1", "decimal", "fraction", "short", "centieme"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_fraction_open_001_expliquer_dixieme",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_fraction",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi 7/10 s’écrit 0,7.",
    format: "open",
    expected: ["7", "10", "dixièmes", "0,7"],
    comparator: "contains_keyword",
    hint: "7/10 signifie 7 dixièmes.",
    explanation: exp(
      "Une fraction décimale peut s’écrire sous forme décimale.",
      "Le dénominateur 10 indique des dixièmes.",
      "7/10 signifie 7 dixièmes.",
      "Donc 7/10 s’écrit 0,7."
    ),
    canvas: fractionCanvas({
      numerator: 7,
      denominator: 10,
      model: "bar",
      showFraction: false,
    }),
    tags: ["cm1", "decimal", "fraction", "open", "dixieme", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_fraction_open_002_expliquer_centieme",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_fraction",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi 5/100 s’écrit 0,05 et non 0,5.",
    format: "open",
    expected: ["5", "100", "centièmes", "0", "0,05"],
    comparator: "contains_keyword",
    hint: "5/100 signifie 5 centièmes, pas 5 dixièmes.",
    explanation: exp(
      "Les centièmes se placent au deuxième rang après la virgule.",
      "S’il n’y a pas de dixième, on écrit 0 au rang des dixièmes.",
      "5/100 signifie 5 centièmes.",
      "Donc 5/100 s’écrit 0,05."
    ),
    tags: ["cm1", "decimal", "fraction", "open", "centieme", "zero"],
  },

    // ============================================================
  // DECIMAL_VALEUR_CHIFFRE
  // Donner la valeur d’un chiffre dans un nombre décimal
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_decimal_valeur_chiffre_qcm_001_dixieme",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_valeur_chiffre",
    difficulty: 2,
    theme: "neutral",
    text: "Dans le nombre 4,7, quelle est la valeur du chiffre 7 ?",
    format: "qcm",
    choices: ["7 dixièmes", "7 unités", "7 centièmes", "70 unités"],
    expected: ["7 dixièmes"],
    comparator: "mcq_exact",
    hint: "Le 7 est juste après la virgule.",
    explanation: exp(
      "Dans un nombre décimal, chaque chiffre a une valeur selon sa position.",
      "Le premier chiffre après la virgule est au rang des dixièmes.",
      "Dans 4,7, le 7 est au rang des dixièmes.",
      "La valeur du chiffre 7 est 7 dixièmes."
    ),
    tags: ["cm1", "decimal", "valeur_chiffre", "dixieme", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_valeur_chiffre_qcm_002_centieme",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_valeur_chiffre",
    difficulty: 2,
    theme: "neutral",
    text: "Dans le nombre 6,35, quelle est la valeur du chiffre 5 ?",
    format: "qcm",
    choices: ["5 centièmes", "5 dixièmes", "5 unités", "50 centièmes"],
    expected: ["5 centièmes"],
    comparator: "mcq_exact",
    hint: "Le 5 est le deuxième chiffre après la virgule.",
    explanation: exp(
      "Le deuxième chiffre après la virgule est au rang des centièmes.",
      "On repère la position du chiffre demandé.",
      "Dans 6,35, le 5 est au deuxième rang après la virgule.",
      "La valeur du chiffre 5 est 5 centièmes."
    ),
    tags: ["cm1", "decimal", "valeur_chiffre", "centieme", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_valeur_chiffre_qcm_003_partie_entiere",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_valeur_chiffre",
    difficulty: 2,
    theme: "neutral",
    text: "Dans le nombre 12,4, quelle est la valeur du chiffre 2 ?",
    format: "qcm",
    choices: ["2 unités", "2 dizaines", "2 dixièmes", "2 centièmes"],
    expected: ["2 unités"],
    comparator: "mcq_exact",
    hint: "Le 2 est juste avant la virgule.",
    explanation: exp(
      "La position d’un chiffre indique sa valeur.",
      "Le chiffre juste avant la virgule est au rang des unités.",
      "Dans 12,4, le 2 est au rang des unités.",
      "La valeur du chiffre 2 est 2 unités."
    ),
    tags: ["cm1", "decimal", "valeur_chiffre", "unite", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_valeur_chiffre_qcm_004_dizaine",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_valeur_chiffre",
    difficulty: 3,
    theme: "neutral",
    text: "Dans le nombre 34,8, quelle est la valeur du chiffre 3 ?",
    format: "qcm",
    choices: ["3 dizaines", "3 unités", "3 dixièmes", "3 centièmes"],
    expected: ["3 dizaines"],
    comparator: "mcq_exact",
    hint: "Le 3 est dans la partie entière, au rang des dizaines.",
    explanation: exp(
      "Dans la partie entière, les chiffres peuvent être des unités, des dizaines, des centaines...",
      "On repère la position du chiffre demandé.",
      "Dans 34,8, le 3 est au rang des dizaines.",
      "La valeur du chiffre 3 est 3 dizaines, c’est-à-dire 30."
    ),
    tags: ["cm1", "decimal", "valeur_chiffre", "dizaine", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_valeur_chiffre_qcm_005_zero_dixieme",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_valeur_chiffre",
    difficulty: 3,
    theme: "neutral",
    text: "Dans le nombre 5,08, que signifie le chiffre 0 après la virgule ?",
    format: "qcm",
    choices: [
      "il y a 0 dixième",
      "le nombre vaut 58",
      "le 8 est un dixième",
      "le nombre vaut 5,8",
    ],
    expected: ["il y a 0 dixième"],
    comparator: "mcq_exact",
    hint: "Le 0 est au premier rang après la virgule.",
    explanation: exp(
      "Un zéro peut être utile dans l’écriture d’un nombre décimal.",
      "Le premier chiffre après la virgule indique les dixièmes.",
      "Dans 5,08, le 0 indique qu’il y a 0 dixième.",
      "Il permet de placer le 8 au rang des centièmes."
    ),
    tags: ["cm1", "decimal", "valeur_chiffre", "zero", "dixieme", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_valeur_chiffre_qcm_006_piege_5_08",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_valeur_chiffre",
    difficulty: 3,
    theme: "neutral",
    text: "Dans le nombre 5,08, quelle est la valeur du chiffre 8 ?",
    format: "qcm",
    choices: ["8 centièmes", "8 dixièmes", "8 unités", "80 centièmes"],
    expected: ["8 centièmes"],
    comparator: "mcq_exact",
    hint: "Le 8 est le deuxième chiffre après la virgule.",
    explanation: exp(
      "La place d’un chiffre après la virgule est importante.",
      "Le premier chiffre après la virgule est celui des dixièmes, le deuxième est celui des centièmes.",
      "Dans 5,08, le 8 est au rang des centièmes.",
      "La valeur du chiffre 8 est 8 centièmes."
    ),
    tags: ["cm1", "decimal", "valeur_chiffre", "centieme", "zero", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_valeur_chiffre_qcm_007_reunion_prix",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_valeur_chiffre",
    difficulty: 3,
    theme: "reunion",
    text: "Au marché, un fruit coûte 2,50 €. Dans 2,50, quelle est la valeur du chiffre 5 ?",
    format: "qcm",
    choices: ["5 dixièmes", "5 centièmes", "5 unités", "5 dizaines"],
    expected: ["5 dixièmes"],
    comparator: "mcq_exact",
    hint: "Le 5 est le premier chiffre après la virgule.",
    explanation: exp(
      "Dans un prix décimal, les chiffres après la virgule ont aussi une valeur.",
      "Le premier chiffre après la virgule est au rang des dixièmes.",
      "Dans 2,50, le 5 est au rang des dixièmes.",
      "La valeur du chiffre 5 est 5 dixièmes."
    ),
    tags: ["cm1", "decimal", "valeur_chiffre", "reunion", "prix", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_valeur_chiffre_short_008_valeur_nombre",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_valeur_chiffre",
    difficulty: 3,
    theme: "neutral",
    text: "Dans 8,42, quelle est la valeur du chiffre 4 ? Réponds avec un nombre décimal.",
    format: "qcm",
    choices: ["0,4", "0,04", "4", "40"],
    expected: ["0,4"],
    comparator: "mcq_exact",
    hint: "Le 4 est au rang des dixièmes.",
    explanation: exp(
      "Le rang des dixièmes correspond au premier chiffre après la virgule.",
      "On repère la position du chiffre demandé.",
      "Dans 8,42, le 4 est au rang des dixièmes.",
      "Sa valeur est 0,4."
    ),
    tags: ["cm1", "decimal", "valeur_chiffre", "short", "dixieme"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_valeur_chiffre_short_009_centiemes_nombre",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_valeur_chiffre",
    difficulty: 4,
    theme: "neutral",
    text: "Dans 9,06, quelle est la valeur du chiffre 6 ? Réponds avec un nombre décimal.",
    format: "qcm",
    choices: ["0,06", "0,6", "6", "60"],
    expected: ["0,06"],
    comparator: "mcq_exact",
    hint: "Le 6 est au rang des centièmes.",
    explanation: exp(
      "Le rang des centièmes correspond au deuxième chiffre après la virgule.",
      "On repère la position du chiffre demandé.",
      "Dans 9,06, le 6 est au rang des centièmes.",
      "Sa valeur est 0,06."
    ),
    tags: ["cm1", "decimal", "valeur_chiffre", "short", "centieme"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_valeur_chiffre_open_001_dixieme",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_valeur_chiffre",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi, dans 4,7, le chiffre 7 vaut 7 dixièmes.",
    format: "open",
    expected: ["7", "dixièmes", "après", "virgule"],
    comparator: "contains_keyword",
    hint: "Le 7 est juste après la virgule.",
    explanation: exp(
      "La valeur d’un chiffre dépend de sa position.",
      "Le premier chiffre après la virgule est au rang des dixièmes.",
      "Dans 4,7, le 7 est juste après la virgule.",
      "Donc le chiffre 7 vaut 7 dixièmes."
    ),
    tags: ["cm1", "decimal", "valeur_chiffre", "open", "dixieme"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_valeur_chiffre_open_002_zero",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_valeur_chiffre",
    difficulty: 4,
    theme: "neutral",
    text: "Explique à quoi sert le 0 dans le nombre 5,08.",
    format: "open",
    expected: ["0", "dixièmes", "8", "centièmes", "place"],
    comparator: "contains_keyword",
    hint: "Le 0 garde la place des dixièmes.",
    explanation: exp(
      "Un zéro peut servir à garder une position dans un nombre décimal.",
      "Le premier rang après la virgule est celui des dixièmes.",
      "Dans 5,08, le 0 indique qu’il y a 0 dixième et permet de placer le 8 aux centièmes.",
      "Le 0 est donc utile pour respecter les rangs."
    ),
    tags: ["cm1", "decimal", "valeur_chiffre", "open", "zero", "centieme"],
  },

    // ============================================================
  // DECIMAL_COMPARER
  // Comparer des nombres décimaux simples
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_decimal_comparer_qcm_001_dixiemes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel nombre est le plus grand ?",
    format: "qcm",
    choices: ["0,7", "0,4", "0,2", "0,1"],
    expected: ["0,7"],
    comparator: "mcq_exact",
    hint: "Compare les dixièmes.",
    explanation: exp(
      "Comparer des nombres décimaux, c’est chercher lequel est le plus petit ou le plus grand.",
      "Quand les parties entières sont identiques, on compare les chiffres après la virgule.",
      "0,7 représente 7 dixièmes, c’est plus que 4 dixièmes, 2 dixièmes et 1 dixième.",
      "Le plus grand nombre est 0,7."
    ),
    tags: ["cm1", "decimal", "comparer", "dixieme", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_comparer_qcm_002_signe",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Complète : 0,3 ... 0,8",
    format: "qcm",
    choices: ["<", ">", "="],
    expected: ["<"],
    comparator: "mcq_exact",
    hint: "3 dixièmes est plus petit que 8 dixièmes.",
    explanation: exp(
      "Les signes <, > et = servent à comparer deux nombres.",
      "On compare les dixièmes.",
      "0,3 représente 3 dixièmes et 0,8 représente 8 dixièmes.",
      "On écrit donc 0,3 < 0,8."
    ),
    tags: ["cm1", "decimal", "comparer", "signe", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_comparer_qcm_003_partie_entiere",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel nombre est le plus grand ?",
    format: "qcm",
    choices: ["4,2", "3,9", "2,8", "1,7"],
    expected: ["4,2"],
    comparator: "mcq_exact",
    hint: "Compare d’abord la partie entière.",
    explanation: exp(
      "Pour comparer deux nombres décimaux, on compare d’abord la partie entière.",
      "Le nombre qui a la plus grande partie entière est le plus grand.",
      "4 est plus grand que 3, 2 et 1.",
      "Le plus grand nombre est 4,2."
    ),
    tags: ["cm1", "decimal", "comparer", "partie_entiere", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_comparer_qcm_004_centiemes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Quel nombre est le plus grand ?",
    format: "qcm",
    choices: ["2,45", "2,39", "2,08", "2,4"],
    expected: ["2,45"],
    comparator: "mcq_exact",
    hint: "Les parties entières sont les mêmes : compare les chiffres après la virgule.",
    explanation: exp(
      "Quand les parties entières sont identiques, on compare la partie décimale.",
      "On peut comparer les dixièmes puis les centièmes.",
      "2,45 est plus grand que 2,39, 2,08 et 2,4.",
      "Le plus grand nombre est 2,45."
    ),
    tags: ["cm1", "decimal", "comparer", "centieme", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_comparer_qcm_005_piege_nombre_chiffres",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit que 3,45 est plus grand que 3,8 car 45 est plus grand que 8. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Compare d’abord les dixièmes.",
    explanation: exp(
      "Il ne faut pas comparer seulement le nombre de chiffres après la virgule.",
      "On compare les rangs : dixièmes avec dixièmes, puis centièmes avec centièmes.",
      "Dans 3,45, le chiffre des dixièmes est 4. Dans 3,8, le chiffre des dixièmes est 8.",
      "3,8 est plus grand que 3,45, donc l’élève n’a pas raison."
    ),
    tags: ["cm1", "decimal", "comparer", "piege", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_comparer_qcm_006_zero_final",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Les nombres 2,5 et 2,50 sont-ils égaux ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Un zéro à la fin de la partie décimale ne change pas la valeur.",
    explanation: exp(
      "Un zéro ajouté à la fin de la partie décimale ne change pas la valeur du nombre.",
      "2,5 signifie 2 unités et 5 dixièmes.",
      "2,50 signifie 2 unités et 50 centièmes, c’est aussi 2 unités et 5 dixièmes.",
      "Donc 2,5 = 2,50."
    ),
    tags: ["cm1", "decimal", "comparer", "zero_final", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_comparer_qcm_007_5_08_5_8",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_comparer",
    difficulty: 4,
    theme: "neutral",
    text: "Quel nombre est le plus grand ?",
    format: "qcm",
    choices: ["5,8", "5,08", "ils sont égaux", "on ne peut pas savoir"],
    expected: ["5,8"],
    comparator: "mcq_exact",
    hint: "Compare les dixièmes : 5,8 a 8 dixièmes ; 5,08 a 0 dixième.",
    explanation: exp(
      "Pour comparer 5,8 et 5,08, on compare les chiffres rang par rang.",
      "Les parties entières sont identiques : 5.",
      "Dans 5,8, il y a 8 dixièmes. Dans 5,08, il y a 0 dixième.",
      "Donc 5,8 est plus grand que 5,08."
    ),
    tags: ["cm1", "decimal", "comparer", "zero", "piege", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_comparer_qcm_008_reunion_distance",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_comparer",
    difficulty: 3,
    theme: "reunion",
    text: "Sur deux sentiers à La Réunion, on parcourt 2,4 km puis 2,75 km. Quelle distance est la plus grande ?",
    format: "qcm",
    choices: ["2,75 km", "2,4 km", "elles sont égales", "2,04 km"],
    expected: ["2,75 km"],
    comparator: "mcq_exact",
    hint: "Compare les dixièmes puis les centièmes.",
    explanation: exp(
      "Pour comparer deux distances décimales, on compare les nombres.",
      "Les parties entières sont identiques : 2.",
      "2,75 est plus grand que 2,4 car 7 dixièmes est plus grand que 4 dixièmes.",
      "La distance la plus grande est 2,75 km."
    ),
    tags: ["cm1", "decimal", "comparer", "reunion", "distance", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_comparer_short_009_signe",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Complète avec <, > ou = : 4,6 ... 4,60",
    format: "qcm",
    choices: ["<", ">", "="],
    expected: ["="],
    comparator: "mcq_exact",
    hint: "Un zéro final après la virgule ne change pas la valeur.",
    explanation: exp(
      "Ajouter un zéro à la fin de la partie décimale ne change pas la valeur.",
      "4,6 et 4,60 représentent le même nombre.",
      "4,6 = 4,60.",
      "Le bon signe est =."
    ),
    tags: ["cm1", "decimal", "comparer", "zero_final", "signe", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_comparer_open_001_3_45_3_8",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_comparer",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi 3,8 est plus grand que 3,45.",
    format: "open",
    expected: ["3", "8", "4", "dixièmes", "plus grand"],
    comparator: "contains_keyword",
    hint: "Compare les dixièmes.",
    explanation: exp(
      "Pour comparer deux nombres décimaux, on compare les chiffres rang par rang.",
      "Les parties entières sont identiques : 3.",
      "Dans 3,8, le chiffre des dixièmes est 8. Dans 3,45, le chiffre des dixièmes est 4.",
      "Donc 3,8 est plus grand que 3,45."
    ),
    tags: ["cm1", "decimal", "comparer", "open", "piege"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_comparer_open_002_zero_final",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_comparer",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi 2,5 et 2,50 sont égaux.",
    format: "open",
    expected: ["2,5", "2,50", "zéro", "égal", "valeur"],
    comparator: "contains_keyword",
    hint: "Le zéro final ne change pas la valeur du nombre.",
    explanation: exp(
      "Un zéro final dans la partie décimale ne change pas la valeur.",
      "2,5 signifie 2 unités et 5 dixièmes.",
      "2,50 signifie 2 unités et 50 centièmes, ce qui représente aussi 5 dixièmes.",
      "Donc 2,5 et 2,50 sont égaux."
    ),
    tags: ["cm1", "decimal", "comparer", "open", "zero_final"],
  },

    // ============================================================
  // DECIMAL_ORDONNER
  // Ordonner des nombres décimaux simples
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_decimal_ordonner_qcm_001_croissant_dixiemes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_ordonner",
    difficulty: 2,
    theme: "neutral",
    text: "Quel rangement est dans l’ordre croissant ?",
    format: "qcm",
    choices: [
      "0,2 < 0,5 < 0,8",
      "0,8 < 0,5 < 0,2",
      "0,5 < 0,2 < 0,8",
      "0,2 < 0,8 < 0,5",
    ],
    expected: ["0,2 < 0,5 < 0,8"],
    comparator: "mcq_exact",
    hint: "Ordre croissant signifie du plus petit au plus grand.",
    explanation: exp(
      "Ordonner des nombres, c’est les ranger du plus petit au plus grand ou du plus grand au plus petit.",
      "Pour l’ordre croissant, on commence par le plus petit.",
      "2 dixièmes < 5 dixièmes < 8 dixièmes.",
      "L’ordre croissant est 0,2 < 0,5 < 0,8."
    ),
    tags: ["cm1", "decimal", "ordonner", "croissant", "dixieme", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_ordonner_qcm_002_decroissant_dixiemes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_ordonner",
    difficulty: 2,
    theme: "neutral",
    text: "Quel rangement est dans l’ordre décroissant ?",
    format: "qcm",
    choices: [
      "0,9 > 0,6 > 0,3",
      "0,3 > 0,6 > 0,9",
      "0,6 > 0,9 > 0,3",
      "0,9 > 0,3 > 0,6",
    ],
    expected: ["0,9 > 0,6 > 0,3"],
    comparator: "mcq_exact",
    hint: "Ordre décroissant signifie du plus grand au plus petit.",
    explanation: exp(
      "L’ordre décroissant range les nombres du plus grand au plus petit.",
      "On compare les dixièmes.",
      "9 dixièmes > 6 dixièmes > 3 dixièmes.",
      "L’ordre décroissant est 0,9 > 0,6 > 0,3."
    ),
    tags: ["cm1", "decimal", "ordonner", "decroissant", "dixieme", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_ordonner_qcm_003_partie_entiere",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_ordonner",
    difficulty: 2,
    theme: "neutral",
    text: "Quel rangement est dans l’ordre croissant ?",
    format: "qcm",
    choices: [
      "1,8 < 2,1 < 3,4",
      "3,4 < 2,1 < 1,8",
      "2,1 < 1,8 < 3,4",
      "1,8 < 3,4 < 2,1",
    ],
    expected: ["1,8 < 2,1 < 3,4"],
    comparator: "mcq_exact",
    hint: "Compare d’abord les parties entières.",
    explanation: exp(
      "Pour ordonner des nombres décimaux, on compare d’abord les parties entières.",
      "Le plus petit nombre a la plus petite partie entière.",
      "1 est plus petit que 2, et 2 est plus petit que 3.",
      "L’ordre croissant est 1,8 < 2,1 < 3,4."
    ),
    tags: ["cm1", "decimal", "ordonner", "partie_entiere", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_ordonner_qcm_004_centiemes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_ordonner",
    difficulty: 3,
    theme: "neutral",
    text: "Quel rangement est dans l’ordre croissant ?",
    format: "qcm",
    choices: [
      "2,05 < 2,5 < 2,75",
      "2,5 < 2,05 < 2,75",
      "2,75 < 2,5 < 2,05",
      "2,05 < 2,75 < 2,5",
    ],
    expected: ["2,05 < 2,5 < 2,75"],
    comparator: "mcq_exact",
    hint: "Attention : 2,5 = 2,50.",
    explanation: exp(
      "Quand les parties entières sont identiques, on compare les chiffres après la virgule.",
      "On peut écrire 2,5 sous la forme 2,50 pour comparer avec des centièmes.",
      "2,05 < 2,50 < 2,75.",
      "L’ordre croissant est 2,05 < 2,5 < 2,75."
    ),
    tags: ["cm1", "decimal", "ordonner", "centieme", "zero", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_ordonner_qcm_005_zero_final",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_ordonner",
    difficulty: 3,
    theme: "neutral",
    text: "Quel rangement est correct ?",
    format: "qcm",
    choices: [
      "3,4 = 3,40 < 3,45",
      "3,45 < 3,4 = 3,40",
      "3,40 < 3,4 < 3,45",
      "3,45 = 3,4 < 3,40",
    ],
    expected: ["3,4 = 3,40 < 3,45"],
    comparator: "mcq_exact",
    hint: "Un zéro final ne change pas la valeur du nombre.",
    explanation: exp(
      "Un zéro final dans la partie décimale ne change pas la valeur.",
      "3,4 et 3,40 représentent le même nombre.",
      "3,45 est plus grand que 3,40.",
      "Le rangement correct est 3,4 = 3,40 < 3,45."
    ),
    tags: ["cm1", "decimal", "ordonner", "zero_final", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_ordonner_qcm_006_piege_chiffres",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_ordonner",
    difficulty: 4,
    theme: "neutral",
    text: "Quel rangement est dans l’ordre croissant ?",
    format: "qcm",
    choices: [
      "3,08 < 3,4 < 3,45",
      "3,4 < 3,08 < 3,45",
      "3,45 < 3,4 < 3,08",
      "3,08 < 3,45 < 3,4",
    ],
    expected: ["3,08 < 3,4 < 3,45"],
    comparator: "mcq_exact",
    hint: "Compare les dixièmes : 3,08 a 0 dixième, 3,4 a 4 dixièmes.",
    explanation: exp(
      "Il faut comparer les chiffres rang par rang.",
      "Les parties entières sont identiques : 3.",
      "3,08 a 0 dixième, 3,4 a 4 dixièmes, et 3,45 a 4 dixièmes puis 5 centièmes.",
      "L’ordre croissant est 3,08 < 3,4 < 3,45."
    ),
    tags: ["cm1", "decimal", "ordonner", "piege", "zero", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_ordonner_qcm_007_reunion_distances",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_ordonner",
    difficulty: 3,
    theme: "reunion",
    text: "Trois sentiers mesurent 1,5 km, 1,25 km et 1,8 km. Quel rangement est dans l’ordre croissant ?",
    format: "qcm",
    choices: [
      "1,25 km < 1,5 km < 1,8 km",
      "1,8 km < 1,5 km < 1,25 km",
      "1,5 km < 1,25 km < 1,8 km",
      "1,25 km < 1,8 km < 1,5 km",
    ],
    expected: ["1,25 km < 1,5 km < 1,8 km"],
    comparator: "mcq_exact",
    hint: "1,5 peut s’écrire 1,50.",
    explanation: exp(
      "Pour ranger des distances décimales, on compare les nombres.",
      "Les parties entières sont identiques : 1.",
      "On peut écrire 1,5 comme 1,50. Alors 1,25 < 1,50 < 1,8.",
      "L’ordre croissant est 1,25 km < 1,5 km < 1,8 km."
    ),
    tags: ["cm1", "decimal", "ordonner", "reunion", "distance", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_ordonner_open_001_zero_final",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_ordonner",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi l’ordre 2,05 < 2,5 < 2,75 est correct.",
    format: "open",
    expected: ["2,05", "2,5", "2,75", "2,50", "croissant"],
    comparator: "contains_keyword",
    hint: "Tu peux écrire 2,5 sous la forme 2,50.",
    explanation: exp(
      "Pour comparer des nombres décimaux, on peut ajouter un zéro final sans changer la valeur.",
      "On écrit 2,5 sous la forme 2,50.",
      "On compare alors 2,05 ; 2,50 ; 2,75.",
      "L’ordre croissant est bien 2,05 < 2,5 < 2,75."
    ),
    tags: ["cm1", "decimal", "ordonner", "open", "zero_final"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_ordonner_open_002_erreur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_ordonner",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi le rangement 3,4 < 3,08 < 3,45 est faux.",
    format: "open",
    expected: ["3,08", "3,4", "dixièmes", "0", "4"],
    comparator: "contains_keyword",
    hint: "Compare les dixièmes de 3,08 et de 3,4.",
    explanation: exp(
      "Pour ordonner des décimaux, il faut comparer les rangs dans l’ordre.",
      "Dans 3,08, il y a 0 dixième. Dans 3,4, il y a 4 dixièmes.",
      "Donc 3,08 est plus petit que 3,4.",
      "Le rangement 3,4 < 3,08 < 3,45 est faux."
    ),
    tags: ["cm1", "decimal", "ordonner", "open", "erreur", "piege"],
  },

    // ============================================================
  // DECIMAL_DROITE
  // Placer un nombre décimal sur une droite graduée
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_decimal_droite_qcm_001_dixiemes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_droite",
    difficulty: 2,
    theme: "neutral",
    text: "Sur une droite de 0 à 1 partagée en 10 parts égales, le point est au 7e trait après 0. Quel nombre décimal représente-t-il ?",
    format: "qcm",
    choices: ["0,7", "0,07", "7,0", "1,7"],
    expected: ["0,7"],
    comparator: "mcq_exact",
    hint: "Le 7e trait sur 10 correspond à 7 dixièmes.",
    explanation: exp(
      "Un nombre décimal peut représenter une position sur une droite graduée.",
      "Entre 0 et 1, si la droite est partagée en 10 parts égales, chaque part vaut 0,1.",
      "Le 7e trait correspond à 7 dixièmes.",
      "Le nombre décimal est 0,7."
    ),
    canvas: droiteGradueeFractionCanvas({
      denominator: 10,
      numerator: 7,
      label: "?",
    }),
    tags: ["cm1", "decimal", "droite", "dixieme", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_droite_qcm_002_cinquieme_trait",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_droite",
    difficulty: 2,
    theme: "neutral",
    text: "Sur une droite de 0 à 1 partagée en 10 parts égales, quel nombre correspond au 5e trait après 0 ?",
    format: "qcm",
    choices: ["0,5", "0,05", "5,0", "1,5"],
    expected: ["0,5"],
    comparator: "mcq_exact",
    hint: "Le 5e trait correspond à 5 dixièmes.",
    explanation: exp(
      "Sur une droite graduée en dixièmes, chaque trait vaut 0,1.",
      "On compte les traits depuis 0.",
      "Le 5e trait correspond à 5 dixièmes.",
      "Le nombre décimal est 0,5."
    ),
    canvas: droiteGradueeFractionCanvas({
      denominator: 10,
      numerator: 5,
      label: "?",
    }),
    tags: ["cm1", "decimal", "droite", "dixieme", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_droite_qcm_003_lien_fraction",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_droite",
    difficulty: 2,
    theme: "neutral",
    text: "Le point placé en 3/10 sur une droite graduée correspond à quel nombre décimal ?",
    format: "qcm",
    choices: ["0,3", "0,03", "3,10", "1,3"],
    expected: ["0,3"],
    comparator: "mcq_exact",
    hint: "3/10 signifie 3 dixièmes.",
    explanation: exp(
      "Une position sur une droite graduée peut s’écrire avec une fraction décimale ou un nombre décimal.",
      "3/10 signifie 3 dixièmes.",
      "3 dixièmes s’écrit 0,3.",
      "Donc 3/10 = 0,3."
    ),
    canvas: droiteGradueeFractionCanvas({
      denominator: 10,
      numerator: 3,
      label: "?",
    }),
    tags: ["cm1", "decimal", "droite", "fraction_decimale", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_droite_qcm_004_numero_trait",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_droite",
    difficulty: 2,
    theme: "neutral",
    text: "Sur une droite de 0 à 1 partagée en 10 parts égales, à quel trait après 0 se place 0,8 ?",
    format: "qcm",
    choices: ["8e trait", "10e trait", "2e trait", "1er trait"],
    expected: ["8e trait"],
    comparator: "mcq_exact",
    hint: "0,8 signifie 8 dixièmes.",
    explanation: exp(
      "Sur une droite graduée en dixièmes, chaque trait représente un dixième.",
      "0,8 signifie 8 dixièmes.",
      "On avance donc de 8 traits après 0.",
      "0,8 se place au 8e trait après 0."
    ),
    canvas: droiteGradueeFractionCanvas({
      denominator: 10,
      numerator: 8,
      label: "?",
    }),
    tags: ["cm1", "decimal", "droite", "trait", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_droite_qcm_005_piege_centiemes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_droite",
    difficulty: 3,
    theme: "neutral",
    text: "Sur une droite de 0 à 1 partagée en 10 parts égales, un élève place 0,08 au 8e trait après 0. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le 8e trait sur 10 correspond à 0,8, pas à 0,08.",
    explanation: exp(
      "Une droite partagée en 10 parts égales représente des dixièmes.",
      "Le 8e trait correspond à 8 dixièmes.",
      "8 dixièmes s’écrit 0,8.",
      "L’élève n’a pas raison : 0,08 représente 8 centièmes."
    ),
    canvas: droiteGradueeFractionCanvas({
      denominator: 10,
      numerator: 8,
      label: "?",
    }),
    tags: ["cm1", "decimal", "droite", "piege", "centieme", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_droite_qcm_006_zero_final",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_droite",
    difficulty: 3,
    theme: "neutral",
    text: "Sur une droite graduée, 0,5 et 0,50 se placent-ils au même endroit ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Un zéro final ne change pas la valeur du nombre.",
    explanation: exp(
      "Un zéro ajouté à la fin de la partie décimale ne change pas la valeur.",
      "0,5 et 0,50 représentent le même nombre.",
      "Ils se placent donc au même endroit sur une droite graduée.",
      "La bonne réponse est oui."
    ),
    canvas: droiteGradueeFractionCanvas({
      denominator: 10,
      numerator: 5,
      label: "?",
    }),
    tags: ["cm1", "decimal", "droite", "zero_final", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_droite_qcm_007_unite",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_droite",
    difficulty: 3,
    theme: "neutral",
    text: "Sur une droite de 0 à 1 partagée en 10 parts égales, quel nombre correspond au 10e trait après 0 ?",
    format: "qcm",
    choices: ["1", "0,10", "10", "0,01"],
    expected: ["1"],
    comparator: "mcq_exact",
    hint: "Le point 1 représente toute l’unité.",
    explanation: exp(
      "Le point 1 représente une unité entière.",
      "Si l’unité est partagée en 10 parts égales, le point 1 correspond à 10 dixièmes.",
      "10 dixièmes font 1 unité.",
      "Le point 1 correspond au nombre 1."
    ),
    canvas: droiteGradueeFractionCanvas({
      denominator: 10,
      numerator: 10,
      label: "?",
    }),
    tags: ["cm1", "decimal", "droite", "unite", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_droite_open_001_expliquer_0_7",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_droite",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi 0,7 se place au 7e trait après 0 sur une droite partagée en 10 parts égales.",
    format: "open",
    expected: ["0,7", "7", "dixièmes", "trait", "10"],
    comparator: "contains_keyword",
    hint: "0,7 signifie 7 dixièmes.",
    explanation: exp(
      "Sur une droite partagée en 10 parts égales, chaque part représente un dixième.",
      "0,7 signifie 7 dixièmes.",
      "On avance donc de 7 parts depuis 0.",
      "0,7 se place au 7e trait après 0."
    ),
    canvas: droiteGradueeFractionCanvas({
      denominator: 10,
      numerator: 7,
      label: "?",
    }),
    tags: ["cm1", "decimal", "droite", "open", "dixieme", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_droite_open_002_erreur_0_08",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_droite",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi le 8e trait sur une droite partagée en 10 parts égales représente 0,8 et non 0,08.",
    format: "open",
    expected: ["8", "dixièmes", "0,8", "0,08", "centièmes"],
    comparator: "contains_keyword",
    hint: "La droite est partagée en dixièmes, pas en centièmes.",
    explanation: exp(
      "Une droite partagée en 10 parts égales représente des dixièmes.",
      "Le 8e trait correspond donc à 8 dixièmes.",
      "8 dixièmes s’écrit 0,8.",
      "0,08 représente 8 centièmes, ce n’est pas le 8e trait sur une droite en dixièmes."
    ),
    canvas: droiteGradueeFractionCanvas({
      denominator: 10,
      numerator: 8,
      label: "?",
    }),
    tags: ["cm1", "decimal", "droite", "open", "erreur", "canvas"],
  },

  // ⛔ 08/11/2026 : 9 squelettes, 15 répétitions sur 20 → générateurs communs CM1/CM2
  // (decimal-droite.gen.ts), mêmes ids, plus deux gabarits ★3 (lire, placer).
  ...gabaritsDecimalDroite("cm1", {
    lire2: "cm1_decimal_droite_tpl_001_identifier_decimal",
    placer2: "cm1_decimal_droite_tpl_002_numero_trait",
    verifier: "cm1_decimal_droite_tpl_003_verifier_position",
    fraction: "cm1_decimal_droite_tpl_004_fraction_lien",
    zero: "cm1_decimal_droite_tpl_005_zero_final",
    lire3: "cm1_decimal_droite_tpl_006_lire_situation",
    placer3: "cm1_decimal_droite_tpl_007_placer_entre_entiers",
  }),
    // ============================================================
  // DECIMAL_ARRONDIR
  // Arrondir un nombre décimal simple
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_decimal_arrondir_qcm_001_unite",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_arrondir",
    difficulty: 3,
    theme: "neutral",
    text: "Quel est l’arrondi de 4,7 à l’unité près ?",
    format: "qcm",
    choices: ["5", "4", "4,7", "4,0"],
    expected: ["5"],
    comparator: "mcq_exact",
    hint: "Pour arrondir à l’unité, regarde le chiffre des dixièmes.",
    explanation: exp(
      "Arrondir un nombre, c’est le remplacer par un nombre proche plus simple.",
      "Pour arrondir à l’unité, on regarde le chiffre des dixièmes.",
      "Dans 4,7, le chiffre des dixièmes est 7. Comme 7 est au moins égal à 5, on arrondit vers 5.",
      "L’arrondi de 4,7 à l’unité près est 5."
    ),
    tags: ["cm1", "decimal", "arrondir", "unite", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_arrondir_qcm_002_unite_bas",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_arrondir",
    difficulty: 3,
    theme: "neutral",
    text: "Quel est l’arrondi de 6,3 à l’unité près ?",
    format: "qcm",
    choices: ["6", "7", "5", "6,3"], // 08/10/2026 : « 6,0 » vaut 6, retiré
    expected: ["6"],
    comparator: "mcq_exact",
    hint: "Le chiffre des dixièmes est 3.",
    explanation: exp(
      "Pour arrondir à l’unité, on regarde le chiffre des dixièmes.",
      "Si le chiffre des dixièmes est 0, 1, 2, 3 ou 4, on garde l’unité.",
      "Dans 6,3, le chiffre des dixièmes est 3.",
      "L’arrondi de 6,3 à l’unité près est 6."
    ),
    tags: ["cm1", "decimal", "arrondir", "unite", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_arrondir_qcm_003_dixieme",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_arrondir",
    difficulty: 4,
    theme: "neutral",
    text: "Quel est l’arrondi de 3,46 au dixième près ?",
    format: "qcm",
    choices: ["3,5", "3,4", "3", "4"],
    expected: ["3,5"],
    comparator: "mcq_exact",
    hint: "Pour arrondir au dixième, regarde le chiffre des centièmes.",
    explanation: exp(
      "Pour arrondir au dixième, on regarde le chiffre des centièmes.",
      "Si le chiffre des centièmes est 5 ou plus, on augmente le chiffre des dixièmes.",
      "Dans 3,46, le chiffre des centièmes est 6.",
      "L’arrondi de 3,46 au dixième près est 3,5."
    ),
    tags: ["cm1", "decimal", "arrondir", "dixieme", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_arrondir_qcm_004_dixieme_bas",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_arrondir",
    difficulty: 4,
    theme: "neutral",
    text: "Quel est l’arrondi de 8,42 au dixième près ?",
    format: "qcm",
    choices: ["8,4", "8,5", "8", "9"],
    expected: ["8,4"],
    comparator: "mcq_exact",
    hint: "Le chiffre des centièmes est 2.",
    explanation: exp(
      "Pour arrondir au dixième, on regarde le chiffre des centièmes.",
      "Si le chiffre des centièmes est inférieur à 5, on garde le chiffre des dixièmes.",
      "Dans 8,42, le chiffre des centièmes est 2.",
      "L’arrondi de 8,42 au dixième près est 8,4."
    ),
    tags: ["cm1", "decimal", "arrondir", "dixieme", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_arrondir_qcm_005_piege_5",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_arrondir",
    difficulty: 4,
    theme: "neutral",
    text: "Quel est l’arrondi de 2,5 à l’unité près ?",
    format: "qcm",
    choices: ["3", "2", "2,5", "2,0"],
    expected: ["3"],
    comparator: "mcq_exact",
    hint: "À partir de 5 dixièmes, on arrondit vers le haut.",
    explanation: exp(
      "Pour arrondir à l’unité, on regarde le chiffre des dixièmes.",
      "Quand le chiffre des dixièmes est 5 ou plus, on arrondit vers l’unité suivante.",
      "Dans 2,5, le chiffre des dixièmes est 5.",
      "L’arrondi de 2,5 à l’unité près est 3."
    ),
    tags: ["cm1", "decimal", "arrondir", "piege_5", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_arrondir_qcm_006_choisir",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_arrondir",
    difficulty: 3,
    theme: "neutral",
    text: "Quel nombre est le plus proche de 7,8 ?",
    format: "qcm",
    choices: ["8", "7", "6", "9"],
    expected: ["8"],
    comparator: "mcq_exact",
    hint: "7,8 est plus proche de 8 que de 7.",
    explanation: exp(
      "Arrondir à l’unité, c’est choisir l’unité la plus proche.",
      "On regarde où se situe le nombre entre deux entiers.",
      "7,8 est plus proche de 8 que de 7.",
      "Le nombre entier le plus proche est 8."
    ),
    tags: ["cm1", "decimal", "arrondir", "proche", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_arrondir_qcm_007_reunion_distance",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_arrondir",
    difficulty: 3,
    theme: "reunion",
    text: "Un sentier mesure 4,6 km. À l’unité près, quelle distance peut-on annoncer ?",
    format: "qcm",
    choices: ["5 km", "4 km", "4,6 km", "6 km"],
    expected: ["5 km"],
    comparator: "mcq_exact",
    hint: "4,6 est plus proche de 5 que de 4.",
    explanation: exp(
      "Arrondir une mesure permet de donner une valeur approchée simple.",
      "Pour arrondir à l’unité, on regarde le chiffre des dixièmes.",
      "Dans 4,6, le chiffre des dixièmes est 6.",
      "On peut annoncer environ 5 km."
    ),
    tags: ["cm1", "decimal", "arrondir", "reunion", "distance", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_arrondir_qcm_008_prix",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_arrondir",
    difficulty: 4,
    theme: "reunion",
    text: "Au marché, un fruit coûte 2,48 €. Quel est son prix arrondi au dixième d’euro près ?",
    format: "qcm",
    choices: ["2,5 €", "2,4 €", "2 €", "3 €"],
    expected: ["2,5 €"],
    comparator: "mcq_exact",
    hint: "Pour arrondir au dixième, regarde le chiffre des centièmes.",
    explanation: exp(
      "Pour arrondir au dixième, on regarde le chiffre des centièmes.",
      "Dans 2,48, le chiffre des centièmes est 8.",
      "On augmente donc le chiffre des dixièmes : 2,4 devient 2,5.",
      "Le prix arrondi au dixième est 2,5 €."
    ),
    tags: ["cm1", "decimal", "arrondir", "reunion", "prix", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_arrondir_open_001_unite",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_arrondir",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi 4,7 s’arrondit à 5 à l’unité près.",
    format: "open",
    expected: ["4,7", "5", "dixièmes", "7", "unité"],
    comparator: "contains_keyword",
    hint: "Le chiffre des dixièmes est 7.",
    explanation: exp(
      "Pour arrondir à l’unité, on regarde le chiffre des dixièmes.",
      "Si le chiffre des dixièmes est 5 ou plus, on arrondit vers l’unité suivante.",
      "Dans 4,7, le chiffre des dixièmes est 7.",
      "Donc 4,7 s’arrondit à 5."
    ),
    tags: ["cm1", "decimal", "arrondir", "open", "unite"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_arrondir_open_002_dixieme",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_arrondir",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi 3,46 s’arrondit à 3,5 au dixième près.",
    format: "open",
    expected: ["3,46", "3,5", "centièmes", "6", "dixième"],
    comparator: "contains_keyword",
    hint: "Le chiffre des centièmes est 6.",
    explanation: exp(
      "Pour arrondir au dixième, on regarde le chiffre des centièmes.",
      "Si le chiffre des centièmes est 5 ou plus, on augmente le chiffre des dixièmes.",
      "Dans 3,46, le chiffre des centièmes est 6.",
      "Donc 3,46 s’arrondit à 3,5 au dixième près."
    ),
    tags: ["cm1", "decimal", "arrondir", "open", "dixieme"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_arrondir_open_003_erreur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_arrondir",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève dit que 6,3 s’arrondit à 7 à l’unité près. Explique son erreur.",
    format: "open",
    expected: ["6,3", "3", "dixièmes", "inférieur", "5", "6"],
    comparator: "contains_keyword",
    hint: "Le chiffre des dixièmes est inférieur à 5.",
    explanation: exp(
      "Pour arrondir à l’unité, on regarde le chiffre des dixièmes.",
      "Si le chiffre des dixièmes est inférieur à 5, on garde l’unité.",
      "Dans 6,3, le chiffre des dixièmes est 3, donc il est inférieur à 5.",
      "L’arrondi correct est 6, pas 7."
    ),
    tags: ["cm1", "decimal", "arrondir", "open", "erreur"],
  },

    // ============================================================
  // DECIMAL_DEFI
  // Résoudre un défi sur les nombres décimaux
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_decimal_defi_qcm_001_reunion_distance",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Sur un sentier à La Réunion, Lina parcourt 2,4 km et Noé parcourt 2,75 km. Qui parcourt la plus grande distance ?",
    format: "qcm",
    choices: ["Noé", "Lina", "ils parcourent la même distance", "on ne peut pas savoir"],
    expected: ["Noé"],
    comparator: "mcq_exact",
    hint: "Compare 2,4 et 2,75. Tu peux écrire 2,4 = 2,40.",
    explanation: exp(
      "Comparer des distances décimales revient à comparer les nombres.",
      "On peut ajouter un zéro final sans changer la valeur.",
      "2,4 = 2,40 et 2,75 est plus grand que 2,40.",
      "Noé parcourt la plus grande distance."
    ),
    tags: ["cm1", "decimal", "defi", "reunion", "distance", "comparer", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_defi_qcm_002_prix",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Au marché de Saint-Pierre, une mangue coûte 2,50 € et un ananas coûte 2,8 €. Quel fruit est le plus cher ?",
    format: "qcm",
    choices: ["l’ananas", "la mangue", "ils ont le même prix", "on ne peut pas comparer"],
    expected: ["l’ananas"],
    comparator: "mcq_exact",
    hint: "Compare 2,50 et 2,8. Tu peux écrire 2,8 = 2,80.",
    explanation: exp(
      "Pour comparer des prix décimaux, on compare les nombres.",
      "On peut écrire 2,8 sous la forme 2,80.",
      "2,80 est plus grand que 2,50.",
      "L’ananas est le plus cher."
    ),
    tags: ["cm1", "decimal", "defi", "reunion", "prix", "comparer", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_defi_qcm_003_fraction_decimal",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Une tablette est partagée en 10 parts égales. On en mange 6 parts. Quel nombre décimal représente la partie mangée ?",
    format: "qcm",
    choices: ["0,6", "0,06", "6,10", "6,0"],
    expected: ["0,6"],
    comparator: "mcq_exact",
    hint: "6 parts sur 10, c’est 6 dixièmes.",
    explanation: exp(
      "Une fraction décimale peut s’écrire avec une virgule.",
      "6 parts sur 10 représentent 6/10.",
      "6/10 signifie 6 dixièmes.",
      "La partie mangée est 0,6."
    ),
    canvas: fractionCanvas({
      numerator: 6,
      denominator: 10,
      model: "bar",
      showFraction: false,
    }),
    tags: ["cm1", "decimal", "defi", "fraction", "dixieme", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_defi_qcm_004_droite",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Sur une droite de 0 à 1 partagée en 10 parts égales, un point est placé au 9e trait après 0. Quel nombre décimal représente-t-il ?",
    format: "qcm",
    choices: ["0,9", "0,09", "9,0", "1,9"],
    expected: ["0,9"],
    comparator: "mcq_exact",
    hint: "Le 9e trait correspond à 9 dixièmes.",
    explanation: exp(
      "Une droite partagée en 10 parts égales représente des dixièmes.",
      "Le 9e trait après 0 correspond à 9 dixièmes.",
      "9 dixièmes s’écrit 0,9.",
      "Le nombre décimal est 0,9."
    ),
    canvas: droiteGradueeFractionCanvas({
      denominator: 10,
      numerator: 9,
      label: "?",
    }),
    tags: ["cm1", "decimal", "defi", "droite", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_defi_qcm_005_zero_piege",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Quel nombre est le plus grand ?",
    format: "qcm",
    choices: ["5,8", "5,08", "ils sont égaux", "5,008"],
    expected: ["5,8"],
    comparator: "mcq_exact",
    hint: "5,8 a 8 dixièmes, alors que 5,08 a 0 dixième.",
    explanation: exp(
      "Pour comparer deux nombres décimaux, on compare les chiffres rang par rang.",
      "Les parties entières sont identiques : 5.",
      "5,8 a 8 dixièmes alors que 5,08 a 0 dixième.",
      "Le plus grand nombre est 5,8."
    ),
    tags: ["cm1", "decimal", "defi", "comparer", "zero", "piege", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_defi_qcm_006_arrondi",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un nombre décimal est 7,6. À l’unité près, quel est son arrondi ?",
    format: "qcm",
    choices: ["8", "7", "7,6", "6"],
    expected: ["8"],
    comparator: "mcq_exact",
    hint: "Le chiffre des dixièmes est 6.",
    explanation: exp(
      "Pour arrondir à l’unité près, on regarde le chiffre des dixièmes.",
      "Si le chiffre des dixièmes est 5 ou plus, on arrondit vers l’unité suivante.",
      "Dans 7,6, le chiffre des dixièmes est 6.",
      "L’arrondi à l’unité près est 8."
    ),
    tags: ["cm1", "decimal", "defi", "arrondir", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_defi_qcm_007_ordonner",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Quel rangement est dans l’ordre croissant ?",
    format: "qcm",
    choices: [
      "1,05 < 1,5 < 1,75",
      "1,5 < 1,05 < 1,75",
      "1,75 < 1,5 < 1,05",
      "1,05 < 1,75 < 1,5",
    ],
    expected: ["1,05 < 1,5 < 1,75"],
    comparator: "mcq_exact",
    hint: "Tu peux écrire 1,5 sous la forme 1,50.",
    explanation: exp(
      "Pour ordonner des nombres décimaux, on compare les chiffres rang par rang.",
      "On peut écrire 1,5 sous la forme 1,50.",
      "1,05 < 1,50 < 1,75.",
      "L’ordre croissant est 1,05 < 1,5 < 1,75."
    ),
    tags: ["cm1", "decimal", "defi", "ordonner", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_defi_qcm_008_valeur_chiffre",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Dans le nombre 8,04, quelle est la valeur du chiffre 4 ?",
    format: "qcm",
    choices: ["4 centièmes", "4 dixièmes", "4 unités", "40 dixièmes"],
    expected: ["4 centièmes"],
    comparator: "mcq_exact",
    hint: "Le 4 est le deuxième chiffre après la virgule.",
    explanation: exp(
      "Le deuxième chiffre après la virgule est au rang des centièmes.",
      "Dans 8,04, le 0 garde la place des dixièmes.",
      "Le 4 est donc au rang des centièmes.",
      "La valeur du chiffre 4 est 4 centièmes."
    ),
    tags: ["cm1", "decimal", "defi", "valeur_chiffre", "zero", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_defi_qcm_009_reunion_arrondi",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Une balade mesure 3,48 km. Au dixième de kilomètre près, quelle distance peut-on annoncer ?",
    format: "qcm",
    choices: ["3,5 km", "3,4 km", "3 km", "4 km"],
    expected: ["3,5 km"],
    comparator: "mcq_exact",
    hint: "Pour arrondir au dixième, regarde le chiffre des centièmes.",
    explanation: exp(
      "Pour arrondir au dixième, on regarde le chiffre des centièmes.",
      "Dans 3,48, le chiffre des centièmes est 8.",
      "On augmente donc le chiffre des dixièmes.",
      "La distance arrondie est 3,5 km."
    ),
    tags: ["cm1", "decimal", "defi", "reunion", "distance", "arrondir", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_defi_open_001_comparer",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi 5,8 est plus grand que 5,08.",
    format: "open",
    expected: ["5,8", "5,08", "dixièmes", "8", "0"],
    comparator: "contains_keyword",
    hint: "Compare les dixièmes.",
    explanation: exp(
      "Pour comparer deux nombres décimaux, on compare les rangs dans l’ordre.",
      "Les parties entières sont identiques : 5.",
      "Dans 5,8, il y a 8 dixièmes. Dans 5,08, il y a 0 dixième.",
      "Donc 5,8 est plus grand que 5,08."
    ),
    tags: ["cm1", "decimal", "defi", "open", "comparer", "zero"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_defi_open_002_droite",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi le 6e trait après 0 sur une droite partagée en 10 parts égales représente 0,6.",
    format: "open",
    expected: ["6", "10", "dixièmes", "0,6", "trait"],
    comparator: "contains_keyword",
    hint: "Une droite partagée en 10 parts égales représente des dixièmes.",
    explanation: exp(
      "Sur une droite partagée en 10 parts égales, chaque part représente un dixième.",
      "Le 6e trait correspond à 6 dixièmes.",
      "6 dixièmes s’écrit 0,6.",
      "Le 6e trait représente donc 0,6."
    ),
    canvas: droiteGradueeFractionCanvas({
      denominator: 10,
      numerator: 6,
      label: "?",
    }),
    tags: ["cm1", "decimal", "defi", "open", "droite", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_decimal_defi_open_003_arrondi",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId: "decimal_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi 2,46 s’arrondit à 2,5 au dixième près.",
    format: "open",
    expected: ["2,46", "2,5", "centièmes", "6", "dixième"],
    comparator: "contains_keyword",
    hint: "Pour arrondir au dixième, regarde le chiffre des centièmes.",
    explanation: exp(
      "Pour arrondir au dixième près, on regarde le chiffre des centièmes.",
      "Dans 2,46, le chiffre des centièmes est 6.",
      "Comme 6 est supérieur ou égal à 5, on augmente le chiffre des dixièmes.",
      "Donc 2,46 s’arrondit à 2,5."
    ),
    tags: ["cm1", "decimal", "defi", "open", "arrondir"],
  },

  // ⭐ 14/11/2026 : les gabarits SITUATION × TOURNURE × nombres, avec dessins
  // (tableau de numération, droite graduée, bande de 10, grille de 100).
  ...gabaritsDecimauxCm1,
];
