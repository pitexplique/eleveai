// lib/tutor-v4/questionBank/terminale-spe/maths/equations-differentielles.bank.ts
//
// Notion : Équations différentielles (equation_differentielle)
//
// microSkills couverts (~10 items chacun, difficultés étalées 1→5) :
//   equadiff_reconnaitre          — Reconnaître une équation différentielle
//   equadiff_y_prime_ay           — Résoudre y' = ay
//   equadiff_y_prime_ay_b         — Résoudre y' = ay + b
//   equadiff_solution_particuliere — Vérifier une solution particulière
//   equadiff_condition_initiale   — Solution vérifiant une condition initiale
//   equadiff_defi                 — Exercice type bac
//
// Rappels : y' = ay  ⇒  y = C e^{ax} ; y' = ay + b ⇒ y = C e^{ax} - b/a
//   (solution constante -b/a). Condition initiale ⇒ détermine C.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return (
    `Définition : ${definition}\n\n` +
    `Méthode : ${methode}\n\n` +
    `Calcul / Observation : ${calcul}\n\n` +
    `Conclusion : ${conclusion}`
  );
}

export const equationsDifferentiellesBank: TutorBankItemV4[] = [
  /* =========================================================
     EQUADIFF_RECONNAITRE
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_eqd_reco_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Dans une équation différentielle, quelle est l'inconnue ?",
    format: "qcm",
    choices: ["une fonction", "un nombre", "un vecteur", "une probabilité"],
    expected: ["une fonction"],
    comparator: "mcq_exact",
    hint: "On cherche $y$ en fonction de $x$.",
    explanation: exp(
      "Une équation différentielle relie une fonction et ses dérivées.",
      "On cherche la (ou les) fonction(s) $y$ qui vérifie(nt) la relation.",
      "L'inconnue n'est pas un nombre mais une fonction.",
      "L'inconnue est une fonction."
    ),
    tags: ["terminale-spe", "equadiff", "reconnaitre", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_reco_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Dans une équation différentielle, que désigne $y'$ ?",
    format: "qcm",
    choices: ["la dérivée de $y$", "le carré de $y$", "l'inverse de $y$", "une constante"],
    expected: ["la dérivée de $y$"],
    comparator: "mcq_exact",
    hint: "Le « prime » désigne la dérivation.",
    explanation: exp(
      "Une équation différentielle fait intervenir une fonction et sa dérivée.",
      "La notation $y'$ désigne la fonction dérivée de $y$.",
      "C'est la dérivée de $y$.",
      "$y'$ est la dérivée de $y$."
    ),
    tags: ["terminale-spe", "equadiff", "reconnaitre", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_reco_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Que signifie « résoudre une équation différentielle » ?",
    format: "qcm",
    choices: [
      "trouver toutes les fonctions qui la vérifient",
      "trouver une valeur de $x$",
      "calculer une dérivée",
      "tracer une courbe",
    ],
    expected: ["trouver toutes les fonctions qui la vérifient"],
    comparator: "mcq_exact",
    hint: "On cherche l'ensemble des solutions.",
    explanation: exp(
      "Résoudre, c'est déterminer toutes les solutions.",
      "Une solution est une fonction qui satisfait l'équation.",
      "On cherche donc l'ensemble de ces fonctions.",
      "Résoudre, c'est trouver toutes les fonctions qui la vérifient."
    ),
    tags: ["terminale-spe", "equadiff", "reconnaitre", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_reco_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Parmi ces écritures, laquelle est une équation différentielle ?",
    format: "qcm",
    choices: ["$y' = 2y$", "$2x + 3 = 0$", "$x^2 - 4 = 0$", "$3 \\times 5 = 15$"],
    expected: ["$y' = 2y$"],
    comparator: "mcq_exact",
    hint: "Elle doit faire intervenir une fonction et sa dérivée.",
    explanation: exp(
      "Une équation différentielle relie $y$ et $y'$.",
      "On repère la présence de $y'$.",
      "$y' = 2y$ relie la fonction et sa dérivée.",
      "$y' = 2y$ est une équation différentielle."
    ),
    tags: ["terminale-spe", "equadiff", "reconnaitre", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_reco_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Dans l'équation $y' = ay$, que représente $a$ ?",
    format: "qcm",
    choices: ["une constante donnée", "la fonction inconnue", "la variable $x$", "la dérivée"],
    expected: ["une constante donnée"],
    comparator: "mcq_exact",
    hint: "$a$ est un coefficient fixe.",
    explanation: exp(
      "L'équation $y' = ay$ est un modèle de référence.",
      "$y$ est l'inconnue, $a$ est un coefficient constant.",
      "$a$ est donc une constante donnée.",
      "$a$ représente une constante donnée."
    ),
    tags: ["terminale-spe", "equadiff", "reconnaitre", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_reco_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Une fonction $y$ est solution d'une équation différentielle si :",
    format: "qcm",
    choices: [
      "elle vérifie l'équation pour tout $x$",
      "elle s'annule en $0$",
      "elle est positive",
      "elle est croissante",
    ],
    expected: ["elle vérifie l'équation pour tout $x$"],
    comparator: "mcq_exact",
    hint: "Une solution satisfait l'égalité partout.",
    explanation: exp(
      "Une solution doit satisfaire l'équation sur tout son domaine.",
      "On vérifie que l'égalité est vraie pour tout $x$.",
      "Si c'est le cas, $y$ est solution.",
      "$y$ est solution si elle vérifie l'équation pour tout $x$."
    ),
    tags: ["terminale-spe", "equadiff", "reconnaitre", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_reco_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "L'équation différentielle $y' = ay$ a des solutions du type :",
    format: "qcm",
    choices: ["$y = C e^{ax}$", "$y = ax + C$", "$y = a x^2$", "$y = \\ln(ax)$"],
    expected: ["$y = C e^{ax}$"],
    comparator: "mcq_exact",
    hint: "L'exponentielle est sa propre dérivée (à un facteur près).",
    explanation: exp(
      "Les solutions de $y' = ay$ font intervenir l'exponentielle.",
      "On retient le résultat du cours.",
      "$y = C e^{ax}$, avec $C$ une constante réelle.",
      "Les solutions sont $y = C e^{ax}$."
    ),
    tags: ["terminale-spe", "equadiff", "reconnaitre", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_reco_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_reconnaitre",
    difficulty: 4,
    theme: "neutral",
    text: "Combien de solutions l'équation $y' = ay$ admet-elle (sans condition initiale) ?",
    format: "qcm",
    choices: ["une infinité (une par valeur de $C$)", "une seule", "aucune", "exactement deux"],
    expected: ["une infinité (une par valeur de $C$)"],
    comparator: "mcq_exact",
    hint: "La constante $C$ est libre.",
    explanation: exp(
      "Sans condition initiale, la constante $C$ reste indéterminée.",
      "Chaque valeur de $C$ donne une solution différente.",
      "Il y a donc une infinité de solutions.",
      "Il y a une infinité de solutions (une par valeur de $C$)."
    ),
    tags: ["terminale-spe", "equadiff", "reconnaitre", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_reco_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_reconnaitre",
    difficulty: 4,
    theme: "neutral",
    text: "Qu'est-ce qui permet de déterminer la constante $C$ dans la solution générale ?",
    format: "qcm",
    choices: [
      "une condition initiale",
      "la dérivée seconde",
      "une limite",
      "le signe de $a$",
    ],
    expected: ["une condition initiale"],
    comparator: "mcq_exact",
    hint: "Par exemple $y(0) = 2$.",
    explanation: exp(
      "La solution générale contient une constante libre $C$.",
      "Une condition initiale fixe la valeur de $y$ en un point.",
      "Elle permet alors de calculer $C$.",
      "Une condition initiale permet de déterminer $C$."
    ),
    tags: ["terminale-spe", "equadiff", "reconnaitre", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_reco_fixed_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_reconnaitre",
    difficulty: 5,
    theme: "neutral",
    text: "Les équations différentielles servent notamment à modéliser :",
    format: "qcm",
    choices: [
      "une évolution dont la vitesse dépend de l'état (croissance, refroidissement…)",
      "uniquement des aires",
      "uniquement des angles",
      "des nombres premiers",
    ],
    expected: ["une évolution dont la vitesse dépend de l'état (croissance, refroidissement…)"],
    comparator: "mcq_exact",
    hint: "$y'$ (vitesse de variation) est reliée à $y$ (l'état).",
    explanation: exp(
      "Une équation différentielle relie une grandeur et sa vitesse de variation.",
      "$y'$ représente le taux de variation, lié à l'état $y$.",
      "Cela modélise croissances, désintégrations, refroidissements, etc.",
      "Elles modélisent des évolutions où la vitesse dépend de l'état."
    ),
    tags: ["terminale-spe", "equadiff", "reconnaitre", "qcm"],
  },

  /* =========================================================
     EQUADIFF_Y_PRIME_AY — Résoudre y' = ay
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_eqd_ay_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_y_prime_ay",
    difficulty: 2,
    theme: "neutral",
    text: "Quelles sont les solutions de l'équation différentielle $y' = ay$ ?",
    format: "qcm",
    choices: ["$y = C e^{ax}$", "$y = C e^{x}$", "$y = a e^{Cx}$", "$y = ax + C$"],
    expected: ["$y = C e^{ax}$"],
    comparator: "mcq_exact",
    hint: "Le coefficient $a$ se retrouve dans l'exposant.",
    explanation: exp(
      "Les solutions de $y' = ay$ sont exponentielles.",
      "On applique le résultat du cours.",
      "$y = C e^{ax}$ avec $C \\in \\mathbb{R}$.",
      "Les solutions sont $y = C e^{ax}$."
    ),
    tags: ["terminale-spe", "equadiff", "y_prime_ay", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_ay_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_y_prime_ay",
    difficulty: 3,
    theme: "neutral",
    text: "Quelles sont les solutions de $y' = 2y$ ?",
    format: "qcm",
    choices: ["$y = C e^{2x}$", "$y = C e^{x}$", "$y = 2 e^{x}$", "$y = 2x + C$"],
    expected: ["$y = C e^{2x}$"],
    comparator: "mcq_exact",
    hint: "$a = 2$.",
    explanation: exp(
      "On applique $y = C e^{ax}$ avec $a = 2$.",
      "On remplace $a$ par $2$.",
      "$y = C e^{2x}$.",
      "Les solutions sont $y = C e^{2x}$."
    ),
    tags: ["terminale-spe", "equadiff", "y_prime_ay", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_ay_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_y_prime_ay",
    difficulty: 3,
    theme: "neutral",
    text: "Quelles sont les solutions de $y' = -3y$ ?",
    format: "qcm",
    choices: ["$y = C e^{-3x}$", "$y = C e^{3x}$", "$y = -3 e^{x}$", "$y = -3x + C$"],
    expected: ["$y = C e^{-3x}$"],
    comparator: "mcq_exact",
    hint: "$a = -3$.",
    explanation: exp(
      "On applique $y = C e^{ax}$ avec $a = -3$.",
      "On remplace $a$ par $-3$.",
      "$y = C e^{-3x}$.",
      "Les solutions sont $y = C e^{-3x}$."
    ),
    tags: ["terminale-spe", "equadiff", "y_prime_ay", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_ay_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_y_prime_ay",
    difficulty: 3,
    theme: "neutral",
    text: "Quelles sont les solutions de $y' = 0{,}5\\,y$ ?",
    format: "qcm",
    choices: ["$y = C e^{0{,}5x}$", "$y = C e^{2x}$", "$y = 0{,}5 e^{x}$", "$y = 0{,}5x + C$"],
    expected: ["$y = C e^{0{,}5x}$"],
    comparator: "mcq_exact",
    hint: "$a = 0{,}5$.",
    explanation: exp(
      "On applique $y = C e^{ax}$ avec $a = 0{,}5$.",
      "On remplace $a$ par $0{,}5$.",
      "$y = C e^{0{,}5x}$.",
      "Les solutions sont $y = C e^{0{,}5x}$."
    ),
    tags: ["terminale-spe", "equadiff", "y_prime_ay", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_ay_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_y_prime_ay",
    difficulty: 4,
    theme: "neutral",
    text: "La fonction $y = C e^{ax}$ est solution de $y' = ay$. Pour $a = 4$, à quoi est égal $y'$ ?",
    format: "qcm",
    choices: ["$4 C e^{4x}$", "$C e^{4x}$", "$4x C e^{4x}$", "$e^{4x}$"],
    expected: ["$4 C e^{4x}$"],
    comparator: "mcq_exact",
    hint: "$(C e^{4x})' = 4 C e^{4x}$.",
    explanation: exp(
      "On dérive $y = C e^{4x}$.",
      "$(e^{4x})' = 4 e^{4x}$, et $C$ reste en facteur.",
      "$y' = 4 C e^{4x}$ (qui vaut bien $4y$).",
      "$y' = 4 C e^{4x}$."
    ),
    tags: ["terminale-spe", "equadiff", "y_prime_ay", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_ay_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_y_prime_ay",
    difficulty: 2,
    theme: "neutral",
    text: "L'équation $y' = y$ a pour solutions :",
    format: "qcm",
    choices: ["$y = C e^{x}$", "$y = e^{x} + C$", "$y = C x$", "$y = x e^{x}$"],
    expected: ["$y = C e^{x}$"],
    comparator: "mcq_exact",
    hint: "$a = 1$.",
    explanation: exp(
      "On applique $y = C e^{ax}$ avec $a = 1$.",
      "On remplace $a$ par $1$.",
      "$y = C e^{x}$.",
      "Les solutions sont $y = C e^{x}$."
    ),
    tags: ["terminale-spe", "equadiff", "y_prime_ay", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_ay_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_y_prime_ay",
    difficulty: 4,
    theme: "neutral",
    text: "Dans le modèle $y' = ay$, si $a > 0$, l'évolution décrite est :",
    format: "qcm",
    choices: ["une croissance exponentielle", "une décroissance vers 0", "constante", "périodique"],
    expected: ["une croissance exponentielle"],
    comparator: "mcq_exact",
    hint: "$e^{ax}$ avec $a > 0$ croît.",
    explanation: exp(
      "Le signe de $a$ détermine le comportement de $e^{ax}$.",
      "Si $a > 0$, alors $e^{ax}$ croît vers $+\\infty$.",
      "C'est une croissance exponentielle.",
      "Pour $a > 0$, l'évolution est une croissance exponentielle."
    ),
    tags: ["terminale-spe", "equadiff", "y_prime_ay", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_ay_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_y_prime_ay",
    difficulty: 4,
    theme: "neutral",
    text: "Dans le modèle $y' = ay$, si $a < 0$, l'évolution décrite est :",
    format: "qcm",
    choices: [
      "une décroissance exponentielle vers 0",
      "une croissance vers $+\\infty$",
      "constante",
      "linéaire",
    ],
    expected: ["une décroissance exponentielle vers 0"],
    comparator: "mcq_exact",
    hint: "$e^{ax}$ avec $a < 0$ tend vers 0.",
    explanation: exp(
      "Le signe de $a$ détermine le comportement de $e^{ax}$.",
      "Si $a < 0$, alors $e^{ax} \\to 0$ en $+\\infty$.",
      "C'est une décroissance exponentielle (ex. désintégration).",
      "Pour $a < 0$, l'évolution est une décroissance exponentielle vers 0."
    ),
    tags: ["terminale-spe", "equadiff", "y_prime_ay", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_ay_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_y_prime_ay",
    difficulty: 5,
    theme: "neutral",
    text: "La fonction nulle ($y = 0$) est-elle solution de $y' = ay$ ?",
    format: "qcm",
    choices: ["Oui (cas $C = 0$)", "Non, jamais", "Seulement si $a = 0$", "Seulement si $a > 0$"],
    expected: ["Oui (cas $C = 0$)"],
    comparator: "mcq_exact",
    hint: "Prends $C = 0$ dans $y = C e^{ax}$.",
    explanation: exp(
      "On teste la fonction nulle.",
      "Si $y = 0$, alors $y' = 0$ et $ay = 0$ : l'équation est vérifiée.",
      "C'est le cas $C = 0$ de la solution générale.",
      "Oui, la fonction nulle est solution."
    ),
    tags: ["terminale-spe", "equadiff", "y_prime_ay", "qcm"],
  },

  {
    kind: "template",
    id: "terminale_spe_eqd_ay_tpl_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_y_prime_ay",
    difficulty: 3,
    theme: "neutral",
    hint: "$y' = ay \\Rightarrow y = C e^{ax}$.",
    tags: ["terminale-spe", "equadiff", "y_prime_ay", "template"],
    generate: () => {
      const a = randomInt(2, 6);
      const correct = `$y = C e^{${a}x}$`;
      const distracteurs = [
        `$y = C e^{x}$`,
        `$y = ${a} e^{x}$`,
        `$y = ${a}x + C$`,
      ];
      return {
        text: `Quelles sont les solutions de $y' = ${a}y$ ?`,
        format: "qcm",
        choices: [correct, ...distracteurs].sort(() => Math.random() - 0.5),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On applique $y = C e^{ax}$.",
          `Ici $a = ${a}$.`,
          `$y = C e^{${a}x}$.`,
          `Les solutions sont $y = C e^{${a}x}$.`
        ),
      };
    },
  },

  /* =========================================================
     EQUADIFF_Y_PRIME_AY_B — Résoudre y' = ay + b
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_eqd_ayb_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_y_prime_ay_b",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la forme des solutions de $y' = ay + b$ (avec $a \\ne 0$) ?",
    format: "qcm",
    choices: [
      "$y = C e^{ax} - \\dfrac{b}{a}$",
      "$y = C e^{ax} + b$",
      "$y = C e^{ax}$",
      "$y = ax + b + C$",
    ],
    expected: ["$y = C e^{ax} - \\dfrac{b}{a}$"],
    comparator: "mcq_exact",
    hint: "On ajoute la solution constante $-\\dfrac{b}{a}$.",
    explanation: exp(
      "Les solutions de $y' = ay + b$ ajoutent une solution constante à celles de $y' = ay$.",
      "La solution constante vérifie $0 = a y_0 + b$, soit $y_0 = -\\dfrac{b}{a}$.",
      "$y = C e^{ax} - \\dfrac{b}{a}$.",
      "Les solutions sont $y = C e^{ax} - \\dfrac{b}{a}$."
    ),
    tags: ["terminale-spe", "equadiff", "y_prime_ay_b", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_ayb_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_y_prime_ay_b",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la solution constante de $y' = 2y + 6$ ?",
    format: "short",
    expected: ["-3"],
    comparator: "number_equal",
    hint: "La solution constante vérifie $0 = 2y + 6$.",
    explanation: exp(
      "Une solution constante a une dérivée nulle.",
      "On résout $0 = 2y + 6$.",
      "$2y = -6 \\iff y = -3$.",
      "La solution constante est $y = -3$ (c'est $-\\tfrac{b}{a}$)."
    ),
    tags: ["terminale-spe", "equadiff", "y_prime_ay_b", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_ayb_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_y_prime_ay_b",
    difficulty: 4,
    theme: "neutral",
    text: "Quelles sont les solutions de $y' = 2y + 6$ ?",
    format: "qcm",
    choices: [
      "$y = C e^{2x} - 3$",
      "$y = C e^{2x} + 3$",
      "$y = C e^{2x} + 6$",
      "$y = C e^{6x} - 2$",
    ],
    expected: ["$y = C e^{2x} - 3$"],
    comparator: "mcq_exact",
    hint: "$a = 2$, $b = 6$, solution constante $-\\tfrac{b}{a} = -3$.",
    explanation: exp(
      "On combine la solution générale de $y'=ay$ et la solution constante.",
      "$a = 2$, $b = 6$ : solution constante $-\\tfrac{6}{2} = -3$.",
      "$y = C e^{2x} - 3$.",
      "Les solutions sont $y = C e^{2x} - 3$."
    ),
    tags: ["terminale-spe", "equadiff", "y_prime_ay_b", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_ayb_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_y_prime_ay_b",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la solution constante de $y' = -y + 4$ ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "On résout $0 = -y + 4$.",
    explanation: exp(
      "Une solution constante a une dérivée nulle.",
      "On résout $0 = -y + 4$.",
      "$y = 4$.",
      "La solution constante est $y = 4$."
    ),
    tags: ["terminale-spe", "equadiff", "y_prime_ay_b", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_ayb_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_y_prime_ay_b",
    difficulty: 4,
    theme: "neutral",
    text: "Quelles sont les solutions de $y' = -y + 4$ ?",
    format: "qcm",
    choices: [
      "$y = C e^{-x} + 4$",
      "$y = C e^{-x} - 4$",
      "$y = C e^{x} + 4$",
      "$y = C e^{4x} - 1$",
    ],
    expected: ["$y = C e^{-x} + 4$"],
    comparator: "mcq_exact",
    hint: "$a = -1$, solution constante $-\\tfrac{b}{a} = -\\tfrac{4}{-1} = 4$.",
    explanation: exp(
      "On combine $C e^{ax}$ et la solution constante.",
      "$a = -1$, $b = 4$ : solution constante $-\\tfrac{4}{-1} = 4$.",
      "$y = C e^{-x} + 4$.",
      "Les solutions sont $y = C e^{-x} + 4$."
    ),
    tags: ["terminale-spe", "equadiff", "y_prime_ay_b", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_ayb_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_y_prime_ay_b",
    difficulty: 4,
    theme: "neutral",
    text: "La solution constante de $y' = ay + b$ correspond au cas où :",
    format: "qcm",
    choices: ["$y' = 0$", "$y = 0$", "$a = 0$", "$x = 0$"],
    expected: ["$y' = 0$"],
    comparator: "mcq_exact",
    hint: "Une fonction constante a une dérivée nulle.",
    explanation: exp(
      "Une solution constante ne varie pas.",
      "Sa dérivée est donc nulle : $y' = 0$.",
      "On résout alors $0 = ay + b$.",
      "La solution constante correspond à $y' = 0$."
    ),
    tags: ["terminale-spe", "equadiff", "y_prime_ay_b", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_ayb_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_y_prime_ay_b",
    difficulty: 5,
    theme: "neutral",
    text: "Quelle est la solution constante de $y' = -0{,}5\\,y + 10$ ?",
    format: "short",
    expected: ["20"],
    comparator: "number_equal",
    hint: "On résout $0 = -0{,}5y + 10$.",
    explanation: exp(
      "Une solution constante a une dérivée nulle.",
      "On résout $0 = -0{,}5y + 10$.",
      "$0{,}5y = 10 \\iff y = 20$.",
      "La solution constante est $y = 20$."
    ),
    tags: ["terminale-spe", "equadiff", "y_prime_ay_b", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_ayb_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_y_prime_ay_b",
    difficulty: 5,
    theme: "neutral",
    text: "Dans un modèle de refroidissement $y' = -0{,}5(y - 20)$, c'est-à-dire $y' = -0{,}5y + 10$, vers quelle valeur tend la température $y$ ?",
    format: "short",
    expected: ["20"],
    comparator: "number_equal",
    hint: "C'est la solution constante (l'équilibre).",
    explanation: exp(
      "La limite correspond à l'équilibre, c'est-à-dire la solution constante.",
      "On résout $0 = -0{,}5y + 10$, soit $y = 20$.",
      "Comme $a = -0{,}5 < 0$, $y$ tend vers cet équilibre.",
      "La température tend vers $20$ (la température ambiante)."
    ),
    tags: ["terminale-spe", "equadiff", "y_prime_ay_b", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_ayb_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_y_prime_ay_b",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la solution constante de $y' = 3y - 9$ ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "On résout $0 = 3y - 9$.",
    explanation: exp(
      "Une solution constante a une dérivée nulle.",
      "On résout $0 = 3y - 9$.",
      "$3y = 9 \\iff y = 3$.",
      "La solution constante est $y = 3$."
    ),
    tags: ["terminale-spe", "equadiff", "y_prime_ay_b", "short"],
  },

  {
    kind: "template",
    id: "terminale_spe_eqd_ayb_tpl_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_y_prime_ay_b",
    difficulty: 4,
    theme: "neutral",
    hint: "Solution constante : $0 = ay + b$.",
    tags: ["terminale-spe", "equadiff", "y_prime_ay_b", "template"],
    generate: () => {
      const a = randomInt(2, 5);
      const y0 = randomInt(2, 6); // solution constante entière
      const b = a * y0; // y' = ay - b ⇒ constante = b/a = y0
      return {
        text: `Quelle est la solution constante de $y' = ${a}y - ${b}$ ?`,
        format: "short",
        expected: [String(y0)],
        comparator: "number_equal",
        explanation: exp(
          "Une solution constante a une dérivée nulle.",
          `On résout $0 = ${a}y - ${b}$.`,
          `$${a}y = ${b} \\iff y = ${y0}$.`,
          `La solution constante est $y = ${y0}$.`
        ),
      };
    },
  },

  /* =========================================================
     EQUADIFF_SOLUTION_PARTICULIERE
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_eqd_part_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_solution_particuliere",
    difficulty: 2,
    theme: "neutral",
    text: "Pour vérifier qu'une fonction $f$ est solution d'une équation différentielle, on :",
    format: "qcm",
    choices: [
      "calcule $f'$ et on remplace dans l'équation",
      "calcule $f(0)$",
      "trace la courbe de $f$",
      "calcule une primitive de $f$",
    ],
    expected: ["calcule $f'$ et on remplace dans l'équation"],
    comparator: "mcq_exact",
    hint: "On teste si l'égalité est vérifiée.",
    explanation: exp(
      "Vérifier une solution, c'est tester l'équation.",
      "On calcule $f'$, puis on remplace $y$ et $y'$ dans l'équation.",
      "Si l'égalité est vraie pour tout $x$, $f$ est solution.",
      "On calcule $f'$ et on remplace dans l'équation."
    ),
    tags: ["terminale-spe", "equadiff", "solution_particuliere", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_part_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_solution_particuliere",
    difficulty: 3,
    theme: "neutral",
    text: "La fonction $f(x) = e^{2x}$ est-elle solution de $y' = 2y$ ?",
    format: "qcm",
    choices: ["Oui", "Non", "Seulement en $x = 0$", "On ne peut pas savoir"],
    expected: ["Oui"],
    comparator: "mcq_exact",
    hint: "Calcule $f'$ et compare à $2f$.",
    explanation: exp(
      "On vérifie l'équation avec $f(x) = e^{2x}$.",
      "$f'(x) = 2e^{2x}$ et $2f(x) = 2e^{2x}$.",
      "$f' = 2f$ : l'équation est vérifiée.",
      "Oui, $f$ est solution de $y' = 2y$."
    ),
    tags: ["terminale-spe", "equadiff", "solution_particuliere", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_part_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_solution_particuliere",
    difficulty: 3,
    theme: "neutral",
    text: "La fonction $f(x) = 3 e^{2x}$ est-elle solution de $y' = 2y$ ?",
    format: "qcm",
    choices: ["Oui", "Non", "Seulement si on enlève le 3", "On ne peut pas savoir"],
    expected: ["Oui"],
    comparator: "mcq_exact",
    hint: "$f'(x) = 6 e^{2x}$ et $2f(x) = 6 e^{2x}$.",
    explanation: exp(
      "On vérifie avec $f(x) = 3e^{2x}$.",
      "$f'(x) = 6e^{2x}$ et $2f(x) = 6e^{2x}$.",
      "$f' = 2f$ : l'équation est vérifiée (cas $C = 3$).",
      "Oui, $f$ est solution."
    ),
    tags: ["terminale-spe", "equadiff", "solution_particuliere", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_part_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_solution_particuliere",
    difficulty: 4,
    theme: "neutral",
    text: "La fonction $f(x) = e^{3x}$ est-elle solution de $y' = 2y$ ?",
    format: "qcm",
    choices: [
      "Non, car $f' = 3f \\ne 2f$",
      "Oui",
      "Oui, en $x = 0$",
      "Non, car $f$ est négative",
    ],
    expected: ["Non, car $f' = 3f \\ne 2f$"],
    comparator: "mcq_exact",
    hint: "Calcule $f'$ : $3e^{3x}$.",
    explanation: exp(
      "On vérifie l'équation avec $f(x) = e^{3x}$.",
      "$f'(x) = 3e^{3x} = 3f(x)$, alors que l'équation demande $f' = 2f$.",
      "$3f \\ne 2f$ : l'équation n'est pas vérifiée.",
      "Non, $f$ n'est pas solution de $y' = 2y$."
    ),
    tags: ["terminale-spe", "equadiff", "solution_particuliere", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_part_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_solution_particuliere",
    difficulty: 4,
    theme: "neutral",
    text: "La fonction constante $f(x) = -3$ est-elle solution de $y' = 2y + 6$ ?",
    format: "qcm",
    choices: ["Oui", "Non", "Seulement en $x = 0$", "On ne peut pas savoir"],
    expected: ["Oui"],
    comparator: "mcq_exact",
    hint: "$f' = 0$ et $2f + 6 = 2(-3) + 6$.",
    explanation: exp(
      "On vérifie avec la fonction constante $f = -3$.",
      "$f' = 0$ et $2f + 6 = 2 \\times (-3) + 6 = 0$.",
      "$f' = 2f + 6$ : l'égalité est vérifiée.",
      "Oui, $f = -3$ est la solution constante."
    ),
    tags: ["terminale-spe", "equadiff", "solution_particuliere", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_part_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_solution_particuliere",
    difficulty: 3,
    theme: "neutral",
    text: "La fonction $f(x) = e^{-x}$ est-elle solution de $y' = -y$ ?",
    format: "qcm",
    choices: ["Oui", "Non", "Seulement en $x = 1$", "On ne peut pas savoir"],
    expected: ["Oui"],
    comparator: "mcq_exact",
    hint: "$f'(x) = -e^{-x}$ et $-f(x) = -e^{-x}$.",
    explanation: exp(
      "On vérifie avec $f(x) = e^{-x}$.",
      "$f'(x) = -e^{-x}$ et $-f(x) = -e^{-x}$.",
      "$f' = -f$ : l'équation est vérifiée.",
      "Oui, $f$ est solution de $y' = -y$."
    ),
    tags: ["terminale-spe", "equadiff", "solution_particuliere", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_part_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_solution_particuliere",
    difficulty: 5,
    theme: "neutral",
    text: "Pour vérifier que $f(x) = (x^2 + 3x)e^{-x}$ est solution d'une équation différentielle, la première étape est de :",
    format: "qcm",
    choices: [
      "calculer $f'(x)$ avec la dérivée d'un produit",
      "calculer $f(0)$",
      "résoudre une équation",
      "tracer la courbe",
    ],
    expected: ["calculer $f'(x)$ avec la dérivée d'un produit"],
    comparator: "mcq_exact",
    hint: "Il faut $f'$ pour pouvoir remplacer dans l'équation.",
    explanation: exp(
      "Vérifier une solution nécessite de connaître $f'$.",
      "$f$ est un produit, on dérive avec $(uv)' = u'v + uv'$.",
      "On obtient $f'$, puis on remplace dans l'équation.",
      "On commence par calculer $f'(x)$."
    ),
    tags: ["terminale-spe", "equadiff", "solution_particuliere", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_part_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_solution_particuliere",
    difficulty: 4,
    theme: "neutral",
    text: "La fonction $f(x) = 5 e^{-3x}$ vérifie quelle équation différentielle ?",
    format: "qcm",
    choices: ["$y' = -3y$", "$y' = 3y$", "$y' = -5y$", "$y' = 5y$"],
    expected: ["$y' = -3y$"],
    comparator: "mcq_exact",
    hint: "$f'(x) = -15 e^{-3x} = -3 f(x)$.",
    explanation: exp(
      "On dérive $f$ et on compare à $f$.",
      "$f'(x) = 5 \\times (-3) e^{-3x} = -15 e^{-3x} = -3 f(x)$.",
      "Donc $f' = -3f$.",
      "$f$ vérifie $y' = -3y$."
    ),
    tags: ["terminale-spe", "equadiff", "solution_particuliere", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_part_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_solution_particuliere",
    difficulty: 5,
    theme: "neutral",
    text: "La fonction $f(x) = 4$ (constante) est solution de $y' = ay + b$. Que vaut nécessairement $a \\times 4 + b$ ?",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "$f' = 0$, donc $0 = a \\times 4 + b$.",
    explanation: exp(
      "Une solution constante a une dérivée nulle.",
      "On remplace : $f' = 0 = a \\times 4 + b$.",
      "Donc $4a + b = 0$.",
      "$a \\times 4 + b = 0$."
    ),
    tags: ["terminale-spe", "equadiff", "solution_particuliere", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_part_fixed_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_solution_particuliere",
    difficulty: 4,
    theme: "neutral",
    text: "La fonction $f(x) = e^{0{,}5x}$ est-elle solution de $y' = 0{,}5y$ ?",
    format: "qcm",
    choices: ["Oui", "Non", "Seulement en $x = 2$", "On ne peut pas savoir"],
    expected: ["Oui"],
    comparator: "mcq_exact",
    hint: "$f'(x) = 0{,}5 e^{0{,}5x} = 0{,}5 f(x)$.",
    explanation: exp(
      "On dérive $f(x) = e^{0{,}5x}$.",
      "$f'(x) = 0{,}5 e^{0{,}5x} = 0{,}5 f(x)$.",
      "$f' = 0{,}5 f$ : l'équation est vérifiée.",
      "Oui, $f$ est solution."
    ),
    tags: ["terminale-spe", "equadiff", "solution_particuliere", "qcm"],
  },

  /* =========================================================
     EQUADIFF_CONDITION_INITIALE
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_eqd_ci_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_condition_initiale",
    difficulty: 3,
    theme: "neutral",
    text: "Les solutions de $y' = 2y$ sont $y = C e^{2x}$. Quelle solution vérifie $y(0) = 5$ ?",
    format: "qcm",
    choices: ["$y = 5 e^{2x}$", "$y = 2 e^{5x}$", "$y = 5 e^{x}$", "$y = e^{2x} + 5$"],
    expected: ["$y = 5 e^{2x}$"],
    comparator: "mcq_exact",
    hint: "$y(0) = C e^0 = C = 5$.",
    explanation: exp(
      "On utilise la condition initiale pour déterminer $C$.",
      "$y(0) = C e^{0} = C$, et on veut $y(0) = 5$.",
      "Donc $C = 5$.",
      "La solution est $y = 5 e^{2x}$."
    ),
    tags: ["terminale-spe", "equadiff", "condition_initiale", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_ci_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_condition_initiale",
    difficulty: 3,
    theme: "neutral",
    text: "Avec $y = C e^{3x}$, quelle est la valeur de $C$ si $y(0) = 2$ ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "$y(0) = C$.",
    explanation: exp(
      "On évalue la solution en $0$.",
      "$y(0) = C e^{0} = C$.",
      "On veut $y(0) = 2$, donc $C = 2$.",
      "$C = 2$."
    ),
    tags: ["terminale-spe", "equadiff", "condition_initiale", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_ci_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_condition_initiale",
    difficulty: 4,
    theme: "neutral",
    text: "Combien de solutions vérifient à la fois $y' = ay$ et une condition initiale $y(0) = y_0$ ?",
    format: "qcm",
    choices: ["une seule", "une infinité", "aucune", "exactement deux"],
    expected: ["une seule"],
    comparator: "mcq_exact",
    hint: "La condition initiale fixe $C$.",
    explanation: exp(
      "La condition initiale détermine la constante $C$.",
      "Une fois $C$ fixé, la solution est unique.",
      "Il y a donc une seule solution.",
      "Il y a une seule solution."
    ),
    tags: ["terminale-spe", "equadiff", "condition_initiale", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_ci_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_condition_initiale",
    difficulty: 4,
    theme: "neutral",
    text: "Les solutions de $y' = -y$ sont $y = C e^{-x}$. Quelle solution vérifie $y(0) = 3$ ?",
    format: "qcm",
    choices: ["$y = 3 e^{-x}$", "$y = 3 e^{x}$", "$y = e^{-3x}$", "$y = -3 e^{x}$"],
    expected: ["$y = 3 e^{-x}$"],
    comparator: "mcq_exact",
    hint: "$y(0) = C = 3$.",
    explanation: exp(
      "On détermine $C$ avec la condition initiale.",
      "$y(0) = C e^{0} = C = 3$.",
      "Donc $C = 3$.",
      "La solution est $y = 3 e^{-x}$."
    ),
    tags: ["terminale-spe", "equadiff", "condition_initiale", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_ci_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_condition_initiale",
    difficulty: 5,
    theme: "neutral",
    text: "Les solutions de $y' = 2y + 6$ sont $y = C e^{2x} - 3$. Quelle est la valeur de $C$ si $y(0) = 0$ ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "$y(0) = C - 3 = 0$.",
    explanation: exp(
      "On utilise la condition initiale dans la solution générale.",
      "$y(0) = C e^{0} - 3 = C - 3$, et on veut $y(0) = 0$.",
      "$C - 3 = 0 \\iff C = 3$.",
      "$C = 3$."
    ),
    tags: ["terminale-spe", "equadiff", "condition_initiale", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_ci_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_condition_initiale",
    difficulty: 4,
    theme: "neutral",
    text: "Avec $y = C e^{x}$, quelle est la valeur de $C$ si $y(0) = 7$ ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "$y(0) = C$.",
    explanation: exp(
      "On évalue en $0$.",
      "$y(0) = C e^{0} = C = 7$.",
      "Donc $C = 7$.",
      "$C = 7$."
    ),
    tags: ["terminale-spe", "equadiff", "condition_initiale", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_ci_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_condition_initiale",
    difficulty: 5,
    theme: "neutral",
    text: "Les solutions de $y' = -y + 4$ sont $y = C e^{-x} + 4$. Quelle est la valeur de $C$ si $y(0) = 10$ ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "$y(0) = C + 4 = 10$.",
    explanation: exp(
      "On applique la condition initiale.",
      "$y(0) = C e^{0} + 4 = C + 4$, et on veut $y(0) = 10$.",
      "$C + 4 = 10 \\iff C = 6$.",
      "$C = 6$."
    ),
    tags: ["terminale-spe", "equadiff", "condition_initiale", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_ci_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_condition_initiale",
    difficulty: 4,
    theme: "neutral",
    text: "Une condition initiale $y(0) = y_0$ donne quelle information ?",
    format: "qcm",
    choices: [
      "la valeur de la fonction en $x = 0$",
      "la dérivée en $0$",
      "la limite de la fonction",
      "le coefficient $a$",
    ],
    expected: ["la valeur de la fonction en $x = 0$"],
    comparator: "mcq_exact",
    hint: "$y(0)$ est l'image de $0$.",
    explanation: exp(
      "Une condition initiale précise une valeur de la fonction.",
      "$y(0) = y_0$ fixe la valeur de $y$ en $x = 0$.",
      "C'est le point de départ de l'évolution.",
      "Elle donne la valeur de la fonction en $x = 0$."
    ),
    tags: ["terminale-spe", "equadiff", "condition_initiale", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_ci_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_condition_initiale",
    difficulty: 5,
    theme: "neutral",
    text: "Les solutions de $y' = 3y$ sont $y = C e^{3x}$. Quelle solution vérifie $y(0) = -2$ ?",
    format: "qcm",
    choices: ["$y = -2 e^{3x}$", "$y = 2 e^{3x}$", "$y = -2 e^{-3x}$", "$y = e^{-2x}$"],
    expected: ["$y = -2 e^{3x}$"],
    comparator: "mcq_exact",
    hint: "$y(0) = C = -2$.",
    explanation: exp(
      "On détermine $C$ avec la condition initiale.",
      "$y(0) = C = -2$.",
      "Donc $C = -2$.",
      "La solution est $y = -2 e^{3x}$."
    ),
    tags: ["terminale-spe", "equadiff", "condition_initiale", "qcm"],
  },

  {
    kind: "template",
    id: "terminale_spe_eqd_ci_tpl_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_condition_initiale",
    difficulty: 4,
    theme: "neutral",
    hint: "$y(0) = C$.",
    tags: ["terminale-spe", "equadiff", "condition_initiale", "template"],
    generate: () => {
      const a = randomInt(2, 5);
      const c = randomInt(2, 9);
      return {
        text: `Les solutions de $y' = ${a}y$ sont $y = C e^{${a}x}$. Quelle est la valeur de $C$ si $y(0) = ${c}$ ?`,
        format: "short",
        expected: [String(c)],
        comparator: "number_equal",
        explanation: exp(
          "On utilise la condition initiale.",
          `$y(0) = C e^{0} = C = ${c}$.`,
          `Donc $C = ${c}$.`,
          `$C = ${c}$.`
        ),
      };
    },
  },

  /* =========================================================
     EQUADIFF_DEFI — Type bac
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_eqd_defi_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Une population évolue selon $y' = 0{,}1\\,y$ (en milliers), avec $y(0) = 5$. Quelle est l'expression de $y$ ?",
    format: "qcm",
    choices: [
      "$y = 5 e^{0{,}1x}$",
      "$y = 5 e^{x}$",
      "$y = 0{,}1 e^{5x}$",
      "$y = 5x + 0{,}1$",
    ],
    expected: ["$y = 5 e^{0{,}1x}$"],
    comparator: "mcq_exact",
    hint: "$y = C e^{0{,}1x}$ et $y(0) = C = 5$.",
    explanation: exp(
      "On résout $y' = ay$ puis on applique la condition initiale.",
      "$y = C e^{0{,}1x}$, et $y(0) = C = 5$.",
      "Donc $y = 5 e^{0{,}1x}$.",
      "$y = 5 e^{0{,}1x}$."
    ),
    tags: ["terminale-spe", "equadiff", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_defi_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Désintégration radioactive : $y' = -0{,}2\\,y$, $y(0) = 100$. Vers quelle valeur tend $y$ en $+\\infty$ ?",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "$y = 100 e^{-0{,}2x}$ et $a < 0$.",
    explanation: exp(
      "On résout puis on étudie la limite.",
      "$y = 100 e^{-0{,}2x}$, avec un exposant négatif.",
      "$\\lim_{x \\to +\\infty} e^{-0{,}2x} = 0$, donc $y \\to 0$.",
      "$y$ tend vers $0$."
    ),
    tags: ["terminale-spe", "equadiff", "type_bac", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_defi_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Refroidissement : $y' = -0{,}1(y - 20)$ avec $y(0) = 80$ (température en °C). Vers quelle température tend $y$ ?",
    format: "short",
    expected: ["20"],
    comparator: "number_equal",
    hint: "L'équilibre est la solution constante $y = 20$.",
    explanation: exp(
      "La limite est la solution constante (l'équilibre thermique).",
      "L'équation s'écrit $y' = -0{,}1y + 2$, équilibre $y = 20$.",
      "Comme $a = -0{,}1 < 0$, $y$ tend vers cet équilibre.",
      "$y$ tend vers $20$ °C (température ambiante)."
    ),
    tags: ["terminale-spe", "equadiff", "type_bac", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_defi_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_defi",
    difficulty: 4,
    theme: "neutral",
    text: "La solution de $y' = -y$ vérifiant $y(0) = 4$ est $y = 4 e^{-x}$. Que vaut $y(0)$ ? (vérification)",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "$y(0) = 4 e^{0}$.",
    explanation: exp(
      "On vérifie la condition initiale.",
      "$y(0) = 4 e^{0} = 4 \\times 1$.",
      "$= 4$.",
      "$y(0) = 4$ : la condition est bien respectée."
    ),
    tags: ["terminale-spe", "equadiff", "type_bac", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_defi_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Modèle $y' = 0{,}05\\,y$ (intérêts composés en continu), $y(0) = 1000$ €. L'évolution est :",
    format: "qcm",
    choices: [
      "une croissance exponentielle",
      "une décroissance vers 0",
      "constante",
      "linéaire",
    ],
    expected: ["une croissance exponentielle"],
    comparator: "mcq_exact",
    hint: "$a = 0{,}05 > 0$.",
    explanation: exp(
      "Le signe de $a$ donne le type d'évolution.",
      "Ici $a = 0{,}05 > 0$, donc $y = 1000 e^{0{,}05x}$ croît.",
      "C'est une croissance exponentielle du capital.",
      "L'évolution est une croissance exponentielle."
    ),
    tags: ["terminale-spe", "equadiff", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_defi_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la solution générale de $y' = 4y$ ?",
    format: "qcm",
    choices: ["$y = C e^{4x}$", "$y = 4 e^{Cx}$", "$y = C e^{x} + 4$", "$y = 4x + C$"],
    expected: ["$y = C e^{4x}$"],
    comparator: "mcq_exact",
    hint: "$y = C e^{ax}$ avec $a = 4$.",
    explanation: exp(
      "On applique le résultat du cours.",
      "$y' = ay \\Rightarrow y = C e^{ax}$, ici $a = 4$.",
      "$y = C e^{4x}$.",
      "La solution générale est $y = C e^{4x}$."
    ),
    tags: ["terminale-spe", "equadiff", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_defi_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Pour $y' = 2y + 6$ avec $y(0) = 0$, la solution est $y = 3 e^{2x} - 3$. Que vaut $y(0)$ ? (vérification)",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "$y(0) = 3 e^{0} - 3 = 3 - 3$.",
    explanation: exp(
      "On vérifie la condition initiale.",
      "$y(0) = 3 e^{0} - 3 = 3 \\times 1 - 3$.",
      "$3 - 3 = 0$.",
      "$y(0) = 0$ : la condition est respectée."
    ),
    tags: ["terminale-spe", "equadiff", "type_bac", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_defi_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Dans le modèle $y' = ay$, le coefficient $a$ est appelé :",
    format: "qcm",
    choices: [
      "taux de croissance (ou de variation)",
      "condition initiale",
      "asymptote",
      "période",
    ],
    expected: ["taux de croissance (ou de variation)"],
    comparator: "mcq_exact",
    hint: "$y'/y = a$ : variation relative constante.",
    explanation: exp(
      "Dans $y' = ay$, on a $\\dfrac{y'}{y} = a$.",
      "C'est la variation relative (en pourcentage) par unité de temps.",
      "On l'appelle taux de croissance.",
      "$a$ est le taux de croissance."
    ),
    tags: ["terminale-spe", "equadiff", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_defi_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_defi",
    difficulty: 4,
    theme: "neutral",
    text: "La solution de $y' = 2y$ avec $y(0) = 1$ est $y = e^{2x}$. Que vaut $y(0)$ ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "$y(0) = e^{0}$.",
    explanation: exp(
      "On vérifie la condition initiale.",
      "$y(0) = e^{0} = 1$.",
      "$= 1$.",
      "$y(0) = 1$ : la condition est respectée."
    ),
    tags: ["terminale-spe", "equadiff", "type_bac", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_defi_fixed_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Une équation différentielle du type $y' = ay + b$ se résout en :",
    format: "qcm",
    choices: [
      "ajoutant la solution constante aux solutions de $y' = ay$",
      "calculant une intégrale double",
      "résolvant une équation du second degré",
      "traçant une courbe",
    ],
    expected: ["ajoutant la solution constante aux solutions de $y' = ay$"],
    comparator: "mcq_exact",
    hint: "Solution générale = solution homogène + solution constante.",
    explanation: exp(
      "On décompose la résolution en deux parties.",
      "Les solutions de $y' = ay$ donnent $C e^{ax}$ ; on ajoute la solution constante $-\\tfrac{b}{a}$.",
      "$y = C e^{ax} - \\tfrac{b}{a}$.",
      "On ajoute la solution constante aux solutions de $y' = ay$."
    ),
    tags: ["terminale-spe", "equadiff", "type_bac", "qcm"],
  },
];
