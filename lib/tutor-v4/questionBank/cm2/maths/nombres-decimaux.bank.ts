// lib/tutor-v4/question-banks/maths/cm2/nombres-decimaux.bank.ts

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { gabaritsDecimalDroite } from "../../cm1/maths/decimal-droite.gen";
import { gabaritsDecimauxCm2 } from "./nombres-decimaux-outils";

function formatComma(n: number | string) {
  return String(n).replace(".", ",");
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
    // ⛔ 08/11/2026 : la figure montrait déjà « 0,5 » à sa place. La droite vide suffit.
    canvas: numberLineCanvas({
      min: 0,
      max: 1,
      step: 1,
    }),
    tags: ["cm2", "nombre_decimal", "droite_graduee", "canvas"],
  },

  // ⛔ 08/11/2026 : 3 squelettes, 18 répétitions sur 20, et la figure écrivait
  // chaque dixième (la réponse sous le point « ? ») → générateurs communs CM1/CM2.
  ...gabaritsDecimalDroite("cm2", {
    lire2: "cm2_decimal_droite_tpl_1",
    placer2: "cm2_decimal_droite_tpl_3_placer",
    lire3: "cm2_decimal_droite_tpl_2_intervalle",
    placer3: "cm2_decimal_droite_tpl_4_placer_entre_entiers",
    verifier: "cm2_decimal_droite_tpl_5_verifier",
    fraction: "cm2_decimal_droite_tpl_6_fraction",
    zero: "cm2_decimal_droite_tpl_7_zero_final",
  }),

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


  // ⭐ 14/11/2026 — lire, fraction, valeur du chiffre, comparer, ranger, arrondir,
  // défi : 1 à 4 squelettes (16 à 19 répétitions sur 20) → gabarits jusqu'aux
  // millièmes dans nombres-decimaux-outils.ts (tableau de numération, droite
  // graduée, bandes de 10, grilles de 100). Les id des anciens gabarits y sont repris.
  ...gabaritsDecimauxCm2,
];
