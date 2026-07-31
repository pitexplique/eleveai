// lib/tutor-v4/questionBank/terminale-spe/maths/equations-differentielles-concours.bank.ts
//
// Notion : Équations différentielles (equation_differentielle)
// Calibrage : épreuve de mathématiques du Concours Avenir (sujet 2026).
//
// Ce que ces items ont de particulier, par rapport à la banque principale :
//   - QCU strict à quatre propositions, une seule correcte (format officiel) ;
//   - traitables en deux minutes, mais par le calcul et non par la définition ;
//   - distracteurs calqués sur les erreurs réelles : signe de l'exposant,
//     rapport a/b inversé, oubli de diviser par le coefficient de y'.
//
// Rappels : y' = ay  ⇒  y = C e^{ax}
//           y' = ay + b  ⇒  y = C e^{ax} - b/a  (solution constante -b/a)

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return (
    `Définition : ${definition}\n\n` +
    `Méthode : ${methode}\n\n` +
    `Calcul / Observation : ${calcul}\n\n` +
    `Conclusion : ${conclusion}`
  );
}

export const equationsDifferentiellesConcoursBank: TutorBankItemV4[] = [
  /* =========================================================
     EQUADIFF_Y_PRIME_AY — résoudre y' = ay
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_eqd_concours_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_y_prime_ay",
    difficulty: 3,
    theme: "neutral",
    text: "Les solutions sur $\\mathbb{R}$ de l'équation différentielle $3y' + 2y = 0$ sont les fonctions :",
    format: "qcm",
    choices: [
      "$x \\mapsto C\\,e^{-\\frac{2}{3}x}$, avec $C \\in \\mathbb{R}$",
      "$x \\mapsto C\\,e^{\\frac{2}{3}x}$, avec $C \\in \\mathbb{R}$",
      "$x \\mapsto C\\,e^{-\\frac{3}{2}x}$, avec $C \\in \\mathbb{R}$",
      "$x \\mapsto C\\,e^{-2x}$, avec $C \\in \\mathbb{R}$",
    ],
    expected: ["$x \\mapsto C\\,e^{-\\frac{2}{3}x}$, avec $C \\in \\mathbb{R}$"],
    comparator: "mcq_exact",
    hint: "Isole d'abord $y'$ : il faut diviser toute l'équation par $3$.",
    explanation: exp(
      "Les solutions de $y' = ay$ sont les $x \\mapsto C\\,e^{ax}$.",
      "On ramène l'équation à la forme $y' = ay$ avant d'appliquer la formule.",
      "$3y' + 2y = 0 \\iff y' = -\\dfrac{2}{3}y$, donc $a = -\\dfrac{2}{3}$.",
      "Les solutions sont les $x \\mapsto C\\,e^{-\\frac{2}{3}x}$."
    ),
    tags: ["terminale-spe", "equadiff", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_concours_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_y_prime_ay",
    difficulty: 3,
    theme: "neutral",
    text: "Les solutions sur $\\mathbb{R}$ de $2y' - 6y = 0$ sont les fonctions :",
    format: "qcm",
    choices: [
      "$x \\mapsto C\\,e^{3x}$",
      "$x \\mapsto C\\,e^{-3x}$",
      "$x \\mapsto C\\,e^{6x}$",
      "$x \\mapsto C\\,e^{\\frac{x}{3}}$",
    ],
    expected: ["$x \\mapsto C\\,e^{3x}$"],
    comparator: "mcq_exact",
    hint: "Divise par $2$, puis fais passer le terme en $y$ de l'autre côté.",
    explanation: exp(
      "Les solutions de $y' = ay$ sont les $x \\mapsto C\\,e^{ax}$.",
      "On divise par $2$ pour isoler $y'$.",
      "$2y' - 6y = 0 \\iff y' = 3y$, donc $a = 3$.",
      "Les solutions sont les $x \\mapsto C\\,e^{3x}$."
    ),
    tags: ["terminale-spe", "equadiff", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_concours_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_y_prime_ay",
    difficulty: 3,
    theme: "neutral",
    text: "Parmi les fonctions suivantes, laquelle est solution de $y' = -y$ sur $\\mathbb{R}$ ?",
    format: "qcm",
    choices: [
      "$x \\mapsto e^{-x}$",
      "$x \\mapsto -e^{x}$",
      "$x \\mapsto e^{x}$",
      "$x \\mapsto -x$",
    ],
    expected: ["$x \\mapsto e^{-x}$"],
    comparator: "mcq_exact",
    hint: "Dérive chaque proposition et compare avec son opposée.",
    explanation: exp(
      "$f$ est solution si $f'(x) = -f(x)$ pour tout $x$.",
      "On teste les propositions en dérivant.",
      "Pour $f(x) = e^{-x}$ : $f'(x) = -e^{-x} = -f(x)$. Pour $f(x) = -e^{x}$ : $f'(x) = -e^{x}$ alors que $-f(x) = e^{x}$ : cela ne convient pas.",
      "Seule $x \\mapsto e^{-x}$ convient."
    ),
    tags: ["terminale-spe", "equadiff", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_concours_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_y_prime_ay",
    difficulty: 3,
    theme: "neutral",
    text: "Les solutions sur $\\mathbb{R}$ de $5y' = y$ sont les fonctions :",
    format: "qcm",
    choices: [
      "$x \\mapsto C\\,e^{\\frac{x}{5}}$",
      "$x \\mapsto C\\,e^{5x}$",
      "$x \\mapsto C\\,e^{-\\frac{x}{5}}$",
      "$x \\mapsto 5C\\,e^{x}$",
    ],
    expected: ["$x \\mapsto C\\,e^{\\frac{x}{5}}$"],
    comparator: "mcq_exact",
    hint: "Le coefficient $5$ porte sur $y'$, pas sur $y$ : il passe au dénominateur.",
    explanation: exp(
      "Les solutions de $y' = ay$ sont les $x \\mapsto C\\,e^{ax}$.",
      "On divise par $5$ pour isoler $y'$.",
      "$5y' = y \\iff y' = \\dfrac{1}{5}y$, donc $a = \\dfrac{1}{5}$.",
      "Les solutions sont les $x \\mapsto C\\,e^{\\frac{x}{5}}$."
    ),
    tags: ["terminale-spe", "equadiff", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_concours_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_y_prime_ay",
    difficulty: 4,
    theme: "neutral",
    text: "La fonction $f : x \\mapsto 4e^{-3x}$ est solution de laquelle de ces équations ?",
    format: "qcm",
    choices: ["$y' = -3y$", "$y' = 3y$", "$y' = -12y$", "$y' = 4y$"],
    expected: ["$y' = -3y$"],
    comparator: "mcq_exact",
    hint: "Dérive $f$, puis exprime le résultat en fonction de $f$ elle-même.",
    explanation: exp(
      "Une fonction $x \\mapsto C e^{ax}$ est solution de $y' = ay$.",
      "On dérive et on compare à $f$.",
      "$f'(x) = 4 \\times (-3) e^{-3x} = -3 \\times 4e^{-3x} = -3f(x)$. Le coefficient $4$ n'intervient pas dans $a$.",
      "$f$ est solution de $y' = -3y$."
    ),
    tags: ["terminale-spe", "equadiff", "concours-avenir", "qcm"],
  },

  /* =========================================================
     EQUADIFF_Y_PRIME_AY_B — résoudre y' = ay + b
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_eqd_concours_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_y_prime_ay_b",
    difficulty: 3,
    theme: "neutral",
    text: "Les solutions sur $\\mathbb{R}$ de $y' = 2y + 6$ sont les fonctions :",
    format: "qcm",
    choices: [
      "$x \\mapsto C\\,e^{2x} - 3$",
      "$x \\mapsto C\\,e^{2x} + 3$",
      "$x \\mapsto C\\,e^{2x} - 6$",
      "$x \\mapsto C\\,e^{-2x} - 3$",
    ],
    expected: ["$x \\mapsto C\\,e^{2x} - 3$"],
    comparator: "mcq_exact",
    hint: "La solution constante vérifie $0 = 2y + 6$.",
    explanation: exp(
      "Les solutions de $y' = ay + b$ sont les $x \\mapsto C e^{ax} - \\dfrac{b}{a}$.",
      "On identifie $a$ et $b$, puis on calcule la solution constante.",
      "Ici $a = 2$ et $b = 6$, donc $-\\dfrac{b}{a} = -3$.",
      "Les solutions sont les $x \\mapsto C\\,e^{2x} - 3$."
    ),
    tags: ["terminale-spe", "equadiff", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_concours_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_y_prime_ay_b",
    difficulty: 4,
    theme: "neutral",
    text: "Les solutions sur $\\mathbb{R}$ de $y' + y = 4$ sont les fonctions :",
    format: "qcm",
    choices: [
      "$x \\mapsto C\\,e^{-x} + 4$",
      "$x \\mapsto C\\,e^{x} + 4$",
      "$x \\mapsto C\\,e^{-x} - 4$",
      "$x \\mapsto C\\,e^{-x} + \\dfrac{1}{4}$",
    ],
    expected: ["$x \\mapsto C\\,e^{-x} + 4$"],
    comparator: "mcq_exact",
    hint: "Écris d'abord l'équation sous la forme $y' = ay + b$.",
    explanation: exp(
      "Les solutions de $y' = ay + b$ sont les $x \\mapsto C e^{ax} - \\dfrac{b}{a}$.",
      "On isole $y'$ pour lire $a$ et $b$.",
      "$y' + y = 4 \\iff y' = -y + 4$, donc $a = -1$ et $b = 4$, et $-\\dfrac{b}{a} = 4$.",
      "Les solutions sont les $x \\mapsto C\\,e^{-x} + 4$."
    ),
    tags: ["terminale-spe", "equadiff", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_concours_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_y_prime_ay_b",
    difficulty: 3,
    theme: "neutral",
    text: "La solution constante de l'équation différentielle $y' = -3y + 12$ est la fonction constante égale à :",
    format: "qcm",
    choices: ["$4$", "$-4$", "$12$", "$-12$"],
    expected: ["$4$"],
    comparator: "mcq_exact",
    hint: "Si $y$ est constante, alors $y' = 0$.",
    explanation: exp(
      "Une solution constante a une dérivée nulle.",
      "On remplace $y'$ par $0$ et on résout l'équation obtenue.",
      "$0 = -3y + 12 \\iff 3y = 12 \\iff y = 4$.",
      "La solution constante vaut $4$."
    ),
    tags: ["terminale-spe", "equadiff", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_concours_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_y_prime_ay_b",
    difficulty: 4,
    theme: "neutral",
    text: "Les solutions sur $\\mathbb{R}$ de $2y' = y + 1$ sont les fonctions :",
    format: "qcm",
    choices: [
      "$x \\mapsto C\\,e^{\\frac{x}{2}} - 1$",
      "$x \\mapsto C\\,e^{\\frac{x}{2}} + 1$",
      "$x \\mapsto C\\,e^{2x} - 1$",
      "$x \\mapsto C\\,e^{\\frac{x}{2}} - \\dfrac{1}{2}$",
    ],
    expected: ["$x \\mapsto C\\,e^{\\frac{x}{2}} - 1$"],
    comparator: "mcq_exact",
    hint: "Divise tout par $2$ : le $1$ aussi.",
    explanation: exp(
      "Les solutions de $y' = ay + b$ sont les $x \\mapsto C e^{ax} - \\dfrac{b}{a}$.",
      "On divise l'équation entière par $2$.",
      "$2y' = y + 1 \\iff y' = \\dfrac{1}{2}y + \\dfrac{1}{2}$, donc $-\\dfrac{b}{a} = -\\dfrac{1/2}{1/2} = -1$.",
      "Les solutions sont les $x \\mapsto C\\,e^{\\frac{x}{2}} - 1$."
    ),
    tags: ["terminale-spe", "equadiff", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_concours_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_y_prime_ay_b",
    difficulty: 3,
    theme: "neutral",
    text: "Les solutions sur $\\mathbb{R}$ de $y' = 4y - 8$ sont les fonctions :",
    format: "qcm",
    choices: [
      "$x \\mapsto C\\,e^{4x} + 2$",
      "$x \\mapsto C\\,e^{4x} - 2$",
      "$x \\mapsto C\\,e^{4x} + 8$",
      "$x \\mapsto C\\,e^{-4x} + 2$",
    ],
    expected: ["$x \\mapsto C\\,e^{4x} + 2$"],
    comparator: "mcq_exact",
    hint: "Attention au signe : ici $b = -8$.",
    explanation: exp(
      "Les solutions de $y' = ay + b$ sont les $x \\mapsto C e^{ax} - \\dfrac{b}{a}$.",
      "On identifie $a$ et $b$ en respectant les signes.",
      "$a = 4$ et $b = -8$, donc $-\\dfrac{b}{a} = -\\dfrac{-8}{4} = 2$.",
      "Les solutions sont les $x \\mapsto C\\,e^{4x} + 2$."
    ),
    tags: ["terminale-spe", "equadiff", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_concours_11",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_y_prime_ay_b",
    difficulty: 4,
    theme: "neutral",
    text: "Toutes les solutions de $y' = -y + 5$ admettent en $+\\infty$ la limite :",
    format: "qcm",
    choices: ["$5$", "$-5$", "$0$", "$+\\infty$"],
    expected: ["$5$"],
    comparator: "mcq_exact",
    hint: "Écris la forme générale des solutions, puis regarde ce que devient chaque terme.",
    explanation: exp(
      "Les solutions de $y' = ay + b$ sont les $x \\mapsto C e^{ax} - \\dfrac{b}{a}$.",
      "On écrit la forme générale, puis on passe à la limite.",
      "Ici $y(x) = C e^{-x} + 5$. Comme $-1 < 0$, $C e^{-x} \\to 0$ en $+\\infty$, quel que soit $C$.",
      "La limite vaut $5$."
    ),
    tags: ["terminale-spe", "equadiff", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_concours_12",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_y_prime_ay_b",
    difficulty: 5,
    theme: "neutral",
    text: "Les courbes des solutions de $y' = y - 2$ admettent toutes une asymptote horizontale d'équation :",
    format: "qcm",
    choices: ["$y = 2$", "$y = -2$", "$y = 0$", "aucune asymptote horizontale"],
    expected: ["$y = 2$"],
    comparator: "mcq_exact",
    hint: "Ici $a = 1 > 0$ : c'est du côté de $-\\infty$ qu'il faut regarder.",
    explanation: exp(
      "Les solutions de $y' = ay + b$ sont les $x \\mapsto C e^{ax} - \\dfrac{b}{a}$.",
      "On écrit la forme générale et on cherche où le terme exponentiel s'efface.",
      "Ici $y(x) = C e^{x} + 2$. Comme $a = 1 > 0$, c'est en $-\\infty$ que $C e^{x} \\to 0$, et $y(x) \\to 2$.",
      "L'asymptote horizontale a pour équation $y = 2$."
    ),
    tags: ["terminale-spe", "equadiff", "concours-avenir", "qcm"],
  },

  /* =========================================================
     EQUADIFF_CONDITION_INITIALE
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_eqd_concours_13",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_condition_initiale",
    difficulty: 3,
    theme: "neutral",
    text: "La solution de $y' = 3y$ vérifiant $y(0) = 5$ est la fonction :",
    format: "qcm",
    choices: [
      "$x \\mapsto 5e^{3x}$",
      "$x \\mapsto 3e^{5x}$",
      "$x \\mapsto 5e^{\\frac{x}{3}}$",
      "$x \\mapsto e^{3x} + 4$",
    ],
    expected: ["$x \\mapsto 5e^{3x}$"],
    comparator: "mcq_exact",
    hint: "$e^{0} = 1$ : la condition initiale donne directement $C$.",
    explanation: exp(
      "Les solutions de $y' = ay$ sont les $x \\mapsto C e^{ax}$.",
      "On écrit la forme générale, puis on utilise la condition initiale.",
      "$y(x) = C e^{3x}$ et $y(0) = C = 5$.",
      "La solution est $x \\mapsto 5e^{3x}$."
    ),
    tags: ["terminale-spe", "equadiff", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_concours_14",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_condition_initiale",
    difficulty: 4,
    theme: "neutral",
    text: "La solution de $y' = y + 1$ vérifiant $y(0) = 0$ est la fonction :",
    format: "qcm",
    choices: [
      "$x \\mapsto e^{x} - 1$",
      "$x \\mapsto e^{x} + 1$",
      "$x \\mapsto 1 - e^{x}$",
      "$x \\mapsto e^{-x} - 1$",
    ],
    expected: ["$x \\mapsto e^{x} - 1$"],
    comparator: "mcq_exact",
    hint: "Forme générale $C e^{x} - 1$, puis $y(0) = 0$.",
    explanation: exp(
      "Les solutions de $y' = ay + b$ sont les $x \\mapsto C e^{ax} - \\dfrac{b}{a}$.",
      "On écrit la forme générale, puis on applique la condition initiale.",
      "$a = 1$, $b = 1$, donc $y(x) = C e^{x} - 1$. Puis $y(0) = C - 1 = 0$, d'où $C = 1$.",
      "La solution est $x \\mapsto e^{x} - 1$."
    ),
    tags: ["terminale-spe", "equadiff", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_concours_15",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_condition_initiale",
    difficulty: 4,
    theme: "neutral",
    text: "La solution de $y' = 2y - 4$ vérifiant $y(0) = 1$ est la fonction :",
    format: "qcm",
    choices: [
      "$x \\mapsto 2 - e^{2x}$",
      "$x \\mapsto 2 + e^{2x}$",
      "$x \\mapsto e^{2x} - 2$",
      "$x \\mapsto 2 - e^{-2x}$",
    ],
    expected: ["$x \\mapsto 2 - e^{2x}$"],
    comparator: "mcq_exact",
    hint: "La constante $C$ peut très bien être négative.",
    explanation: exp(
      "Les solutions de $y' = ay + b$ sont les $x \\mapsto C e^{ax} - \\dfrac{b}{a}$.",
      "On écrit la forme générale, puis on applique la condition initiale.",
      "$a = 2$, $b = -4$, donc $y(x) = C e^{2x} + 2$. Puis $y(0) = C + 2 = 1$, d'où $C = -1$.",
      "La solution est $x \\mapsto 2 - e^{2x}$."
    ),
    tags: ["terminale-spe", "equadiff", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_concours_16",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_condition_initiale",
    difficulty: 4,
    theme: "neutral",
    text: "La solution de $y' = -y + 3$ vérifiant $y(0) = 5$ est la fonction :",
    format: "qcm",
    choices: [
      "$x \\mapsto 2e^{-x} + 3$",
      "$x \\mapsto 2e^{x} + 3$",
      "$x \\mapsto 5e^{-x} + 3$",
      "$x \\mapsto 2e^{-x} - 3$",
    ],
    expected: ["$x \\mapsto 2e^{-x} + 3$"],
    comparator: "mcq_exact",
    hint: "Le $5$ est la valeur de $y(0)$, pas la valeur de $C$.",
    explanation: exp(
      "Les solutions de $y' = ay + b$ sont les $x \\mapsto C e^{ax} - \\dfrac{b}{a}$.",
      "On écrit la forme générale, puis on applique la condition initiale.",
      "$a = -1$, $b = 3$, donc $y(x) = C e^{-x} + 3$. Puis $y(0) = C + 3 = 5$, d'où $C = 2$.",
      "La solution est $x \\mapsto 2e^{-x} + 3$."
    ),
    tags: ["terminale-spe", "equadiff", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_concours_17",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_condition_initiale",
    difficulty: 5,
    theme: "neutral",
    text: "La solution de $y' = -2y$ vérifiant $y(1) = e$ est la fonction :",
    format: "qcm",
    choices: [
      "$x \\mapsto e^{3 - 2x}$",
      "$x \\mapsto e^{1 - 2x}$",
      "$x \\mapsto e^{2x - 3}$",
      "$x \\mapsto 3e^{-2x}$",
    ],
    expected: ["$x \\mapsto e^{3 - 2x}$"],
    comparator: "mcq_exact",
    hint: "La condition est donnée en $1$, pas en $0$ : $e^{-2}$ n'est pas égal à $1$.",
    explanation: exp(
      "Les solutions de $y' = ay$ sont les $x \\mapsto C e^{ax}$.",
      "On écrit la forme générale, puis on applique la condition en $x = 1$.",
      "$y(x) = C e^{-2x}$ et $y(1) = C e^{-2} = e$, d'où $C = e^{3}$. Alors $y(x) = e^{3} e^{-2x} = e^{3-2x}$.",
      "La solution est $x \\mapsto e^{3-2x}$."
    ),
    tags: ["terminale-spe", "equadiff", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_concours_18",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_condition_initiale",
    difficulty: 4,
    theme: "neutral",
    text: "La solution de $2y' + y = 0$ vérifiant $y(0) = 4$ est la fonction :",
    format: "qcm",
    choices: [
      "$x \\mapsto 4e^{-\\frac{x}{2}}$",
      "$x \\mapsto 4e^{\\frac{x}{2}}$",
      "$x \\mapsto 4e^{-2x}$",
      "$x \\mapsto 2e^{-\\frac{x}{2}}$",
    ],
    expected: ["$x \\mapsto 4e^{-\\frac{x}{2}}$"],
    comparator: "mcq_exact",
    hint: "Isole $y'$ : le $2$ passe au dénominateur, pas au numérateur.",
    explanation: exp(
      "Les solutions de $y' = ay$ sont les $x \\mapsto C e^{ax}$.",
      "On isole $y'$, puis on applique la condition initiale.",
      "$2y' + y = 0 \\iff y' = -\\dfrac{1}{2}y$, donc $y(x) = C e^{-\\frac{x}{2}}$ et $y(0) = C = 4$.",
      "La solution est $x \\mapsto 4e^{-\\frac{x}{2}}$."
    ),
    tags: ["terminale-spe", "equadiff", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_concours_19",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_condition_initiale",
    difficulty: 4,
    theme: "neutral",
    text: "La solution de $y' = 5y + 10$ vérifiant $y(0) = 0$ est la fonction :",
    format: "qcm",
    choices: [
      "$x \\mapsto 2e^{5x} - 2$",
      "$x \\mapsto 2e^{5x} + 2$",
      "$x \\mapsto 2 - 2e^{5x}$",
      "$x \\mapsto 10e^{5x} - 10$",
    ],
    expected: ["$x \\mapsto 2e^{5x} - 2$"],
    comparator: "mcq_exact",
    hint: "Commence par la solution constante : $-\\dfrac{b}{a} = -2$.",
    explanation: exp(
      "Les solutions de $y' = ay + b$ sont les $x \\mapsto C e^{ax} - \\dfrac{b}{a}$.",
      "On écrit la forme générale, puis on applique la condition initiale.",
      "$a = 5$, $b = 10$, donc $y(x) = C e^{5x} - 2$. Puis $y(0) = C - 2 = 0$, d'où $C = 2$.",
      "La solution est $x \\mapsto 2e^{5x} - 2$."
    ),
    tags: ["terminale-spe", "equadiff", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_concours_20",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_condition_initiale",
    difficulty: 5,
    theme: "neutral",
    text: "La solution de $y' = 3y + 1$ qui s'annule en $0$ est la fonction :",
    format: "qcm",
    choices: [
      "$x \\mapsto \\dfrac{e^{3x} - 1}{3}$",
      "$x \\mapsto \\dfrac{e^{3x} + 1}{3}$",
      "$x \\mapsto 3\\left(e^{3x} - 1\\right)$",
      "$x \\mapsto e^{3x} - 1$",
    ],
    expected: ["$x \\mapsto \\dfrac{e^{3x} - 1}{3}$"],
    comparator: "mcq_exact",
    hint: "« S'annule en $0$ » signifie $y(0) = 0$.",
    explanation: exp(
      "Les solutions de $y' = ay + b$ sont les $x \\mapsto C e^{ax} - \\dfrac{b}{a}$.",
      "On écrit la forme générale, puis on traduit « s'annule en $0$ ».",
      "$y(x) = C e^{3x} - \\dfrac{1}{3}$ et $y(0) = C - \\dfrac{1}{3} = 0$, d'où $C = \\dfrac{1}{3}$ et $y(x) = \\dfrac{e^{3x} - 1}{3}$.",
      "La solution est $x \\mapsto \\dfrac{e^{3x} - 1}{3}$."
    ),
    tags: ["terminale-spe", "equadiff", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_concours_21",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_condition_initiale",
    difficulty: 5,
    theme: "neutral",
    text: "La solution de $y' = y$ vérifiant $y(\\ln 2) = 6$ est la fonction :",
    format: "qcm",
    choices: [
      "$x \\mapsto 3e^{x}$",
      "$x \\mapsto 6e^{x}$",
      "$x \\mapsto 2e^{x}$",
      "$x \\mapsto \\dfrac{e^{x}}{3}$",
    ],
    expected: ["$x \\mapsto 3e^{x}$"],
    comparator: "mcq_exact",
    hint: "$e^{\\ln 2} = 2$.",
    explanation: exp(
      "Les solutions de $y' = y$ sont les $x \\mapsto C e^{x}$.",
      "On applique la condition en utilisant $e^{\\ln 2} = 2$.",
      "$y(\\ln 2) = C e^{\\ln 2} = 2C = 6$, d'où $C = 3$.",
      "La solution est $x \\mapsto 3e^{x}$."
    ),
    tags: ["terminale-spe", "equadiff", "concours-avenir", "qcm"],
  },

  /* =========================================================
     EQUADIFF_SOLUTION_PARTICULIERE
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_eqd_concours_22",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_solution_particuliere",
    difficulty: 5,
    theme: "neutral",
    text: "La fonction $f : x \\mapsto x\\,e^{2x}$ est solution de laquelle de ces équations différentielles ?",
    format: "qcm",
    choices: [
      "$y' - 2y = e^{2x}$",
      "$y' - 2y = 0$",
      "$y' + 2y = e^{2x}$",
      "$y' - y = e^{2x}$",
    ],
    expected: ["$y' - 2y = e^{2x}$"],
    comparator: "mcq_exact",
    hint: "Dérive un produit, puis fais réapparaître $f$ dans l'expression obtenue.",
    explanation: exp(
      "On vérifie une solution en dérivant puis en reportant dans l'équation.",
      "On dérive le produit $x \\times e^{2x}$.",
      "$f'(x) = e^{2x} + 2x e^{2x} = e^{2x} + 2f(x)$, donc $f'(x) - 2f(x) = e^{2x}$.",
      "$f$ est solution de $y' - 2y = e^{2x}$."
    ),
    tags: ["terminale-spe", "equadiff", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_concours_23",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_solution_particuliere",
    difficulty: 5,
    theme: "neutral",
    text: "Pour quelles valeurs du réel $k$ la fonction $x \\mapsto k\\,e^{3x}$ est-elle solution de $y' - 3y = 0$ ?",
    format: "qcm",
    choices: [
      "pour toute valeur de $k$",
      "pour $k = 0$ uniquement",
      "pour $k = 3$ uniquement",
      "pour $k = 1$ uniquement",
    ],
    expected: ["pour toute valeur de $k$"],
    comparator: "mcq_exact",
    hint: "Calcule $y' - 3y$ sans remplacer $k$ par un nombre.",
    explanation: exp(
      "Les solutions de $y' = 3y$ sont exactement les $x \\mapsto C e^{3x}$, $C \\in \\mathbb{R}$.",
      "On calcule $y' - 3y$ en gardant $k$ comme paramètre.",
      "Si $y(x) = k e^{3x}$, alors $y'(x) = 3k e^{3x}$ et $y' - 3y = 3k e^{3x} - 3k e^{3x} = 0$, quel que soit $k$.",
      "Toute valeur de $k$ convient."
    ),
    tags: ["terminale-spe", "equadiff", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_concours_24",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_solution_particuliere",
    difficulty: 5,
    theme: "neutral",
    text: "La fonction $f : x \\mapsto e^{-x^2}$ vérifie, pour tout réel $x$ :",
    format: "qcm",
    choices: ["$y' = -2xy$", "$y' = -2y$", "$y' = -x^2 y$", "$y' = 2xy$"],
    expected: ["$y' = -2xy$"],
    comparator: "mcq_exact",
    hint: "Dérivée de $e^{u}$ : $u' e^{u}$.",
    explanation: exp(
      "Si $f = e^{u}$ alors $f' = u' e^{u}$.",
      "On dérive, puis on fait réapparaître $f$.",
      "Avec $u(x) = -x^2$, $u'(x) = -2x$, donc $f'(x) = -2x\\,e^{-x^2} = -2x f(x)$.",
      "$f$ vérifie $y' = -2xy$."
    ),
    tags: ["terminale-spe", "equadiff", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_concours_25",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_solution_particuliere",
    difficulty: 4,
    theme: "neutral",
    text: "Parmi ces équations différentielles, laquelle admet la fonction constante $x \\mapsto 3$ pour solution ?",
    format: "qcm",
    choices: ["$y' = 2y - 6$", "$y' = 2y + 6$", "$y' = 3y$", "$y' = y + 3$"],
    expected: ["$y' = 2y - 6$"],
    comparator: "mcq_exact",
    hint: "Une fonction constante a une dérivée nulle : cherche celle qui donne $0$ à droite.",
    explanation: exp(
      "Une fonction constante est solution si le second membre s'annule pour cette valeur.",
      "On remplace $y$ par $3$ et $y'$ par $0$ dans chaque proposition.",
      "$2 \\times 3 - 6 = 0$ : cela convient. Les autres donnent respectivement $2 \\times 3 + 6 = 12$, $3 \\times 3 = 9$ et $3 + 3 = 6$, tous non nuls.",
      "L'équation est $y' = 2y - 6$."
    ),
    tags: ["terminale-spe", "equadiff", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_concours_26",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_solution_particuliere",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $f : x \\mapsto (x + 1)e^{-x}$. Pour tout réel $x$, $f'(x)$ vaut :",
    format: "qcm",
    choices: [
      "$-x\\,e^{-x}$",
      "$x\\,e^{-x}$",
      "$e^{-x}$",
      "$(x + 2)e^{-x}$",
    ],
    expected: ["$-x\\,e^{-x}$"],
    comparator: "mcq_exact",
    hint: "$(uv)' = u'v + uv'$, et la dérivée de $e^{-x}$ est $-e^{-x}$.",
    explanation: exp(
      "Dérivée d'un produit : $(uv)' = u'v + uv'$.",
      "On pose $u(x) = x + 1$ et $v(x) = e^{-x}$.",
      "$f'(x) = 1 \\times e^{-x} + (x+1)\\times(-e^{-x}) = e^{-x}\\left(1 - x - 1\\right) = -x e^{-x}$.",
      "$f'(x) = -x\\,e^{-x}$."
    ),
    tags: ["terminale-spe", "equadiff", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_concours_27",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_solution_particuliere",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $f$ la solution de $y' = ay$ vérifiant $f(0) = 1$ et $f(2) = 9$. Alors $f(1)$ vaut :",
    format: "qcm",
    choices: ["$3$", "$4{,}5$", "$9$", "$81$"],
    expected: ["$3$"],
    comparator: "mcq_exact",
    hint: "$f(2) = \\left(f(1)\\right)^2$ : inutile de calculer $a$.",
    explanation: exp(
      "Les solutions de $y' = ay$ sont les $x \\mapsto C e^{ax}$.",
      "On peut éviter le calcul de $a$ en remarquant une propriété de l'exponentielle.",
      "$f(x) = e^{ax}$ car $f(0) = 1$. Alors $f(2) = e^{2a} = \\left(e^{a}\\right)^2 = 9$, donc $e^{a} = 3$ (positif), c'est-à-dire $f(1) = 3$.",
      "$f(1) = 3$."
    ),
    tags: ["terminale-spe", "equadiff", "concours-avenir", "qcm"],
  },

  /* =========================================================
     EQUADIFF_DEFI — questions type concours
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_eqd_concours_28",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Une population vérifie $y' = 0{,}05\\,y$. Le temps de doublement de cette population vaut :",
    format: "qcm",
    choices: [
      "$20\\ln 2$",
      "$\\dfrac{\\ln 2}{20}$",
      "$0{,}05 \\ln 2$",
      "$\\dfrac{2}{0{,}05}$",
    ],
    expected: ["$20\\ln 2$"],
    comparator: "mcq_exact",
    hint: "Cherche $t$ tel que $e^{0{,}05\\,t} = 2$.",
    explanation: exp(
      "Les solutions de $y' = ay$ sont les $x \\mapsto C e^{ax}$.",
      "Doubler signifie multiplier par $2$ le facteur exponentiel.",
      "On résout $e^{0{,}05\\,t} = 2$, soit $0{,}05\\,t = \\ln 2$, donc $t = \\dfrac{\\ln 2}{0{,}05} = 20\\ln 2$.",
      "Le temps de doublement vaut $20\\ln 2$."
    ),
    tags: ["terminale-spe", "equadiff", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_concours_29",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $y$ la solution de $y' = ay$ vérifiant $y(0) = 100$ et $y(2) = 25$. Alors $a$ vaut :",
    format: "qcm",
    choices: ["$-\\ln 2$", "$\\ln 2$", "$-\\ln 4$", "$-\\dfrac{1}{4}$"],
    expected: ["$-\\ln 2$"],
    comparator: "mcq_exact",
    hint: "$\\ln 4 = 2\\ln 2$.",
    explanation: exp(
      "Les solutions de $y' = ay$ sont les $x \\mapsto C e^{ax}$.",
      "On utilise les deux conditions, puis on simplifie le logarithme.",
      "$y(x) = 100 e^{ax}$ et $y(2) = 100 e^{2a} = 25$, donc $e^{2a} = \\dfrac{1}{4}$, puis $2a = -\\ln 4 = -2\\ln 2$, d'où $a = -\\ln 2$.",
      "$a = -\\ln 2$."
    ),
    tags: ["terminale-spe", "equadiff", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_concours_30",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $y$ la solution de $y' = ay + b$ (avec $a < 0$) vérifiant $y(0) = 0$ et $\\displaystyle\\lim_{x \\to +\\infty} y(x) = 4$. On peut alors affirmer que :",
    format: "qcm",
    choices: ["$b = -4a$", "$b = 4a$", "$a = -4b$", "$b = 4$"],
    expected: ["$b = -4a$"],
    comparator: "mcq_exact",
    hint: "Comme $a < 0$, le terme exponentiel disparaît en $+\\infty$ : il ne reste que la solution constante.",
    explanation: exp(
      "Les solutions de $y' = ay + b$ sont les $x \\mapsto C e^{ax} - \\dfrac{b}{a}$.",
      "On identifie la limite avec la solution constante.",
      "Comme $a < 0$, $C e^{ax} \\to 0$ en $+\\infty$, donc la limite vaut $-\\dfrac{b}{a} = 4$, c'est-à-dire $b = -4a$.",
      "On a $b = -4a$."
    ),
    tags: ["terminale-spe", "equadiff", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_concours_31",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un corps se refroidit selon $\\theta' = -k(\\theta - 20)$, où $k > 0$ et $\\theta$ est la température en degrés. Quand le temps devient grand, la température tend vers :",
    format: "qcm",
    choices: ["$20$", "$0$", "$-20$", "une valeur qui dépend de $k$"],
    expected: ["$20$"],
    comparator: "mcq_exact",
    hint: "Développe : $\\theta' = -k\\theta + 20k$, puis cherche la solution constante.",
    explanation: exp(
      "Les solutions de $y' = ay + b$ tendent vers $-\\dfrac{b}{a}$ lorsque $a < 0$.",
      "On développe pour identifier $a$ et $b$.",
      "$\\theta' = -k\\theta + 20k$, donc $a = -k < 0$ et $b = 20k$, d'où $-\\dfrac{b}{a} = \\dfrac{20k}{k} = 20$ : le $k$ se simplifie.",
      "La température tend vers $20$ degrés."
    ),
    tags: ["terminale-spe", "equadiff", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_concours_32",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Combien de solutions de $y' = 2y$ vérifient $y(0) = 0$ ?",
    format: "qcm",
    choices: ["une seule", "aucune", "deux", "une infinité"],
    expected: ["une seule"],
    comparator: "mcq_exact",
    hint: "Écris la forme générale, puis regarde combien de valeurs de $C$ conviennent.",
    explanation: exp(
      "Les solutions de $y' = ay$ sont les $x \\mapsto C e^{ax}$, et la condition initiale détermine $C$.",
      "On écrit la forme générale, puis on applique la condition.",
      "$y(x) = C e^{2x}$ et $y(0) = C = 0$ : une seule valeur de $C$ convient, et la solution est la fonction nulle.",
      "Il y a exactement une solution."
    ),
    tags: ["terminale-spe", "equadiff", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_concours_33",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $f$ une solution de $y' = -y$ telle que $f(0) > 0$. Sur $\\mathbb{R}$, la fonction $f$ est :",
    format: "qcm",
    choices: [
      "strictement décroissante et strictement positive",
      "strictement croissante et strictement positive",
      "positive puis négative",
      "constante",
    ],
    expected: ["strictement décroissante et strictement positive"],
    comparator: "mcq_exact",
    hint: "Une exponentielle ne s'annule jamais : le signe de $f$ est celui de $C$.",
    explanation: exp(
      "Les solutions de $y' = -y$ sont les $x \\mapsto C e^{-x}$, et $e^{-x} > 0$ pour tout $x$.",
      "On détermine le signe de $C$, puis celui de $f'$.",
      "$f(0) = C > 0$, donc $f(x) = C e^{-x} > 0$ partout. De plus $f'(x) = -f(x) < 0$ : $f$ est strictement décroissante.",
      "$f$ est strictement décroissante et strictement positive."
    ),
    tags: ["terminale-spe", "equadiff", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_eqd_concours_34",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "equation_differentielle",
    microId: "equadiff_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $y$ la solution de $y' = ay + b$ vérifiant $y(0) = 0$ et $y(1) = 1$. Parmi ces couples $(a\\,;\\,b)$, lequel convient ?",
    format: "qcm",
    choices: [
      "$(\\ln 2\\,;\\,\\ln 2)$",
      "$(1\\,;\\,1)$",
      "$\\left(1\\,;\\,\\dfrac{1}{e}\\right)$",
      "$(\\ln 2\\,;\\,1)$",
    ],
    expected: ["$(\\ln 2\\,;\\,\\ln 2)$"],
    comparator: "mcq_exact",
    hint: "Avec $y(0) = 0$, la solution s'écrit $y(x) = \\dfrac{b}{a}\\left(e^{ax} - 1\\right)$.",
    explanation: exp(
      "Les solutions de $y' = ay + b$ sont les $x \\mapsto C e^{ax} - \\dfrac{b}{a}$.",
      "On impose $y(0) = 0$, puis $y(1) = 1$.",
      "$y(0) = C - \\dfrac{b}{a} = 0$ donne $C = \\dfrac{b}{a}$, donc $y(x) = \\dfrac{b}{a}\\left(e^{ax} - 1\\right)$. Avec $a = b = \\ln 2$ : $y(1) = 1 \\times \\left(e^{\\ln 2} - 1\\right) = 2 - 1 = 1$.",
      "Le couple $(\\ln 2\\,;\\,\\ln 2)$ convient."
    ),
    tags: ["terminale-spe", "equadiff", "concours-avenir", "qcm"],
  },
];
