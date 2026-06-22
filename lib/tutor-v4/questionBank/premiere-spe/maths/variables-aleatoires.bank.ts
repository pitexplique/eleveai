// lib/tutor-v4/questionBank/premiere-spe/maths/variables-aleatoires.bank.ts
//
// Chapitre : Variables aléatoires réelles (notion "variables_aleatoires")
// microSkills :
//   va_loi       — déterminer la loi de probabilité
//   va_esperance — calculer une espérance
//   va_variance  — calculer une variance et un écart-type
//   va_notation  — interpréter les notations {X = a}, P(X ⩽ a)
//
// PÉRIMÈTRE BO 2019 Première spé. Conventions : LaTeX, règle QCM. Canvas : stat_graph (loi en bâtons).

import type { TutorBankItemV4, CanvasFigure } from "@/lib/tutor-v4/types";

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

function loiGraph(valeurs: number[], probas: number[]): CanvasFigure {
  return {
    kind: "stat_graph",
    graphType: "batons",
    title: "Loi de probabilité de X",
    size: { width: 320, height: 240 },
    data: valeurs.map((v, i) => ({ label: String(v), value: probas[i] })),
    display: { showValues: true, showLabels: true },
  };
}

export const variablesAleatoiresBank: TutorBankItemV4[] = [
  /* ===================== VA_LOI ===================== */
  {
    kind: "fixed",
    id: "premiere_va_loi_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_loi",
    difficulty: 2,
    theme: "neutral",
    text: "Pour une loi de probabilité, la somme de toutes les probabilités vaut :",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Toutes les valeurs possibles sont couvertes.",
    explanation: exp(
      "La loi d'une variable aléatoire associe une probabilité à chaque valeur.",
      "Toutes les valeurs possibles couvrent tout l'univers.",
      "La somme des probabilités vaut donc $1$.",
      "La somme vaut $1$."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "loi", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_va_loi_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_loi",
    difficulty: 3,
    theme: "neutral",
    text: "$X$ prend les valeurs $0$, $1$, $2$ avec $P(X=0) = 0{,}3$ et $P(X=1) = 0{,}5$. Combien vaut $P(X=2)$ ?",
    format: "short",
    expected: ["0,2"],
    comparator: "number_equal",
    hint: "La somme des probabilités vaut $1$.",
    explanation: exp(
      "La somme des probabilités d'une loi vaut $1$.",
      "$P(X=2) = 1 - 0{,}3 - 0{,}5$.",
      "$= 0{,}2$.",
      "$P(X=2) = 0{,}2$."
    ),
    canvas: loiGraph([0, 1, 2], [0.3, 0.5, 0.2]),
    tags: ["premiere", "maths", "variables_aleatoires", "loi", "canvas", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_va_loi_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_loi",
    difficulty: 3,
    theme: "jeux_video",
    text: "Dans un jeu, le gain $X$ vaut $0$, $5$ ou $10$ avec $P(X=0) = 0{,}6$ et $P(X=5) = 0{,}3$. Combien vaut $P(X=10)$ ?",
    format: "short",
    expected: ["0,1"],
    comparator: "number_equal",
    hint: "Somme $= 1$.",
    explanation: exp(
      "La somme des probabilités vaut $1$.",
      "$P(X=10) = 1 - 0{,}6 - 0{,}3$.",
      "$= 0{,}1$.",
      "$P(X=10) = 0{,}1$."
    ),
    canvas: loiGraph([0, 5, 10], [0.6, 0.3, 0.1]),
    tags: ["premiere", "maths", "variables_aleatoires", "loi", "canvas", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_va_loi_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_loi",
    difficulty: 3,
    theme: "neutral",
    text: "On lance un dé équilibré et $X$ est le résultat. Combien vaut $P(X = 4)$ ?",
    format: "qcm",
    choices: ["$\\dfrac{1}{6}$", "$\\dfrac{1}{4}$", "$\\dfrac{4}{6}$", "$\\dfrac{1}{2}$"],
    expected: ["$\\dfrac{1}{6}$"],
    comparator: "mcq_exact",
    hint: "Dé à $6$ faces équilibré.",
    explanation: exp(
      "Le dé a $6$ faces équiprobables.",
      "Chaque valeur a la même probabilité $\\dfrac{1}{6}$.",
      "$P(X=4) = \\dfrac{1}{6}$.",
      "$\\dfrac{1}{6}$."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "loi", "qcm"],
  },
  {
    kind: "template",
    id: "premiere_va_loi_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_loi",
    difficulty: 3,
    theme: "neutral",
    hint: "La somme des probabilités vaut $1$.",
    tags: ["premiere", "maths", "variables_aleatoires", "loi", "template"],
    generate: () => {
      const p0 = randomInt(1, 5) / 10;
      const p1 = randomInt(1, 9 - p0 * 10) / 10;
      const p2 = Math.round((1 - p0 - p1) * 10) / 10;
      return {
        text: `$X$ prend les valeurs $0$, $1$, $2$ avec $P(X=0) = ${String(p0).replace(".", ",")}$ et $P(X=1) = ${String(p1).replace(".", ",")}$. Combien vaut $P(X=2)$ ?`,
        format: "short",
        expected: [String(p2).replace(".", ",")],
        comparator: "number_equal",
        canvas: loiGraph([0, 1, 2], [p0, p1, p2]),
        explanation: exp(
          "La somme des probabilités vaut $1$.",
          `$P(X=2) = 1 - ${String(p0).replace(".", ",")} - ${String(p1).replace(".", ",")}$.`,
          `$= ${String(p2).replace(".", ",")}$.`,
          `$P(X=2) = ${String(p2).replace(".", ",")}$.`
        ),
      };
    },
  },

  /* ===================== VA_ESPERANCE ===================== */
  {
    kind: "fixed",
    id: "premiere_va_esp_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_esperance",
    difficulty: 2,
    theme: "neutral",
    text: "L'espérance d'une variable aléatoire $X$ se calcule par :",
    format: "qcm",
    choices: [
      "$E(X) = \\sum x_i \\, p_i$",
      "$E(X) = \\sum p_i$",
      "$E(X) = \\sum x_i$",
      "$E(X) = \\dfrac{\\sum x_i}{n}$",
    ],
    expected: ["$E(X) = \\sum x_i \\, p_i$"],
    comparator: "mcq_exact",
    hint: "Somme des valeurs pondérées par leurs probabilités.",
    explanation: exp(
      "L'espérance est une moyenne pondérée des valeurs.",
      "Chaque valeur $x_i$ est pondérée par sa probabilité $p_i$.",
      "$E(X) = \\sum x_i \\, p_i$.",
      "$E(X) = \\sum x_i \\, p_i$."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "esperance", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_va_esp_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_esperance",
    difficulty: 3,
    theme: "neutral",
    text: "$X$ vaut $0$, $1$, $2$ avec probabilités $0{,}3$, $0{,}5$, $0{,}2$. Calcule $E(X)$.",
    format: "short",
    expected: ["0,9"],
    comparator: "number_equal",
    hint: "$0 \\times 0{,}3 + 1 \\times 0{,}5 + 2 \\times 0{,}2$.",
    explanation: exp(
      "On applique $E(X) = \\sum x_i \\, p_i$.",
      "$0 \\times 0{,}3 + 1 \\times 0{,}5 + 2 \\times 0{,}2 = 0 + 0{,}5 + 0{,}4$.",
      "$= 0{,}9$.",
      "$E(X) = 0{,}9$."
    ),
    canvas: loiGraph([0, 1, 2], [0.3, 0.5, 0.2]),
    tags: ["premiere", "maths", "variables_aleatoires", "esperance", "canvas", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_va_esp_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_esperance",
    difficulty: 4,
    theme: "jeux_video",
    text: "Un jeu coûte $2$ €. Le gain $X$ (déjà net) vaut $0$ € (proba $0{,}7$) ou $5$ € (proba $0{,}3$). Quelle est l'espérance de gain $E(X)$ ?",
    format: "short",
    expected: ["1,5"],
    comparator: "number_equal",
    hint: "$0 \\times 0{,}7 + 5 \\times 0{,}3$.",
    explanation: exp(
      "On calcule l'espérance du gain.",
      "$E(X) = 0 \\times 0{,}7 + 5 \\times 0{,}3$.",
      "$= 1{,}5$.",
      "$E(X) = 1{,}5$ € (le jeu coûtant $2$ €, il n'est pas favorable au joueur)."
    ),
    canvas: loiGraph([0, 5], [0.7, 0.3]),
    tags: ["premiere", "maths", "variables_aleatoires", "esperance", "canvas", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_va_esp_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_esperance",
    difficulty: 3,
    theme: "neutral",
    text: "Un jeu est dit « équitable » lorsque l'espérance de gain (mise déduite) vaut :",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "Ni favorable, ni défavorable.",
    explanation: exp(
      "Un jeu équitable n'avantage ni le joueur ni l'organisateur.",
      "Le gain moyen (mise déduite) est alors nul.",
      "$E(X) = 0$.",
      "L'espérance vaut $0$."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "esperance", "short"],
  },
  {
    kind: "template",
    id: "premiere_va_esp_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_esperance",
    difficulty: 3,
    theme: "neutral",
    hint: "$E(X) = \\sum x_i \\, p_i$.",
    tags: ["premiere", "maths", "variables_aleatoires", "esperance", "template"],
    generate: () => {
      const p0 = randomInt(1, 4) / 10;
      const p1 = randomInt(1, 4) / 10;
      const p2 = Math.round((1 - p0 - p1) * 10) / 10;
      const x = [randomInt(0, 2), randomInt(3, 5), randomInt(6, 9)];
      const esp = Math.round((x[0] * p0 + x[1] * p1 + x[2] * p2) * 100) / 100;
      return {
        text: `$X$ vaut $${x[0]}$, $${x[1]}$, $${x[2]}$ avec probabilités $${String(p0).replace(".", ",")}$, $${String(p1).replace(".", ",")}$, $${String(p2).replace(".", ",")}$. Calcule $E(X)$. (arrondir au centième)`,
        format: "short",
        expected: [String(esp).replace(".", ",")],
        comparator: "number_equal",
        canvas: loiGraph(x, [p0, p1, p2]),
        explanation: exp(
          "On applique $E(X) = \\sum x_i \\, p_i$.",
          `$${x[0]} \\times ${String(p0).replace(".", ",")} + ${x[1]} \\times ${String(p1).replace(".", ",")} + ${x[2]} \\times ${String(p2).replace(".", ",")}$.`,
          `$= ${String(esp).replace(".", ",")}$.`,
          `$E(X) = ${String(esp).replace(".", ",")}$.`
        ),
      };
    },
  },

  /* ===================== VA_VARIANCE ===================== */
  {
    kind: "fixed",
    id: "premiere_va_var_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_variance",
    difficulty: 3,
    theme: "neutral",
    text: "La variance d'une variable aléatoire mesure :",
    format: "qcm",
    choices: [
      "la dispersion autour de l'espérance",
      "la valeur la plus probable",
      "la somme des valeurs",
      "le nombre de valeurs",
    ],
    expected: ["la dispersion autour de l'espérance"],
    comparator: "mcq_exact",
    hint: "Écart par rapport à la moyenne.",
    explanation: exp(
      "La variance quantifie l'éloignement des valeurs par rapport à l'espérance.",
      "$V(X) = \\sum p_i (x_i - E(X))^2$.",
      "Plus elle est grande, plus les valeurs sont dispersées.",
      "La dispersion autour de l'espérance."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "variance", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_va_var_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_variance",
    difficulty: 3,
    theme: "neutral",
    text: "L'écart-type $\\sigma(X)$ se déduit de la variance par :",
    format: "qcm",
    choices: ["$\\sigma(X) = \\sqrt{V(X)}$", "$\\sigma(X) = V(X)^2$", "$\\sigma(X) = V(X)$", "$\\sigma(X) = \\dfrac{V(X)}{2}$"],
    expected: ["$\\sigma(X) = \\sqrt{V(X)}$"],
    comparator: "mcq_exact",
    hint: "Racine carrée.",
    explanation: exp(
      "L'écart-type est la racine carrée de la variance.",
      "$\\sigma(X) = \\sqrt{V(X)}$.",
      "Il a la même unité que $X$.",
      "$\\sigma(X) = \\sqrt{V(X)}$."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "variance", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_va_var_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_variance",
    difficulty: 4,
    theme: "neutral",
    text: "$X$ vaut $0$ ou $2$ avec probabilité $0{,}5$ chacune. $E(X) = 1$. Calcule la variance $V(X)$.",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "$0{,}5(0-1)^2 + 0{,}5(2-1)^2$.",
    explanation: exp(
      "On applique $V(X) = \\sum p_i (x_i - E(X))^2$.",
      "$0{,}5 \\times (0 - 1)^2 + 0{,}5 \\times (2 - 1)^2 = 0{,}5 + 0{,}5$.",
      "$= 1$.",
      "$V(X) = 1$."
    ),
    canvas: loiGraph([0, 2], [0.5, 0.5]),
    tags: ["premiere", "maths", "variables_aleatoires", "variance", "canvas", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_va_var_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_variance",
    difficulty: 4,
    theme: "neutral",
    text: "Si $V(X) = 9$, combien vaut l'écart-type $\\sigma(X)$ ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "$\\sqrt{9}$.",
    explanation: exp(
      "L'écart-type est la racine carrée de la variance.",
      "$\\sigma(X) = \\sqrt{9}$.",
      "$= 3$.",
      "$\\sigma(X) = 3$."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "variance", "short"],
  },
  {
    kind: "template",
    id: "premiere_va_var_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_variance",
    difficulty: 4,
    theme: "neutral",
    hint: "$\\sigma(X) = \\sqrt{V(X)}$.",
    tags: ["premiere", "maths", "variables_aleatoires", "variance", "template"],
    generate: () => {
      const sigma = randomInt(2, 9);
      const v = sigma * sigma;
      return {
        text: `Si $V(X) = ${v}$, combien vaut l'écart-type $\\sigma(X)$ ?`,
        format: "short",
        expected: [String(sigma)],
        comparator: "number_equal",
        explanation: exp(
          "L'écart-type est la racine carrée de la variance.",
          `$\\sigma(X) = \\sqrt{${v}}$.`,
          `$= ${sigma}$.`,
          `$\\sigma(X) = ${sigma}$.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_va_var_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_variance",
    difficulty: 4,
    theme: "neutral",
    hint: "$V(X) = \\sum p_i (x_i - E)^2$ avec deux valeurs équiprobables.",
    tags: ["premiere", "maths", "variables_aleatoires", "variance", "template"],
    generate: () => {
      const m = randomInt(1, 5); // demi-écart
      // X vaut 0 ou 2m, proba 0.5 ; E = m ; V = 0.5(m)^2 + 0.5(m)^2 = m^2
      const v = m * m;
      return {
        text: `$X$ vaut $0$ ou $${2 * m}$ avec probabilité $0{,}5$ chacune (donc $E(X) = ${m}$). Calcule $V(X)$.`,
        format: "short",
        expected: [String(v)],
        comparator: "number_equal",
        canvas: loiGraph([0, 2 * m], [0.5, 0.5]),
        explanation: exp(
          "On applique $V(X) = \\sum p_i (x_i - E(X))^2$.",
          `$0{,}5 \\times (0 - ${m})^2 + 0{,}5 \\times (${2 * m} - ${m})^2 = 0{,}5 \\times ${v} + 0{,}5 \\times ${v}$.`,
          `$= ${v}$.`,
          `$V(X) = ${v}$.`
        ),
      };
    },
  },

  /* ===================== VA_NOTATION ===================== */
  {
    kind: "fixed",
    id: "premiere_va_not_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_notation",
    difficulty: 2,
    theme: "neutral",
    text: "Que désigne l'événement $\\{X = 3\\}$ ?",
    format: "qcm",
    choices: [
      "« la variable $X$ prend la valeur $3$ »",
      "« $X$ est inférieur à $3$ »",
      "« $X$ vaut au moins $3$ »",
      "« la probabilité est $3$ »",
    ],
    expected: ["« la variable $X$ prend la valeur $3$ »"],
    comparator: "mcq_exact",
    hint: "Lecture directe.",
    explanation: exp(
      "$\\{X = a\\}$ est l'événement « $X$ prend la valeur $a$ ».",
      "Ici $a = 3$.",
      "C'est l'ensemble des issues où $X$ vaut exactement $3$.",
      "« $X$ prend la valeur $3$ »."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "notation", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_va_not_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_notation",
    difficulty: 3,
    theme: "neutral",
    text: "$X$ vaut $1$, $2$, $3$ avec $P(X=1)=0{,}2$, $P(X=2)=0{,}5$, $P(X=3)=0{,}3$. Combien vaut $P(X \\le 2)$ ?",
    format: "short",
    expected: ["0,7"],
    comparator: "number_equal",
    hint: "$P(X=1) + P(X=2)$.",
    explanation: exp(
      "$\\{X \\le 2\\}$ regroupe les valeurs $1$ et $2$.",
      "$P(X \\le 2) = P(X=1) + P(X=2) = 0{,}2 + 0{,}5$.",
      "$= 0{,}7$.",
      "$P(X \\le 2) = 0{,}7$."
    ),
    canvas: loiGraph([1, 2, 3], [0.2, 0.5, 0.3]),
    tags: ["premiere", "maths", "variables_aleatoires", "notation", "canvas", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_va_not_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_notation",
    difficulty: 3,
    theme: "neutral",
    text: "Avec $P(X=1)=0{,}2$, $P(X=2)=0{,}5$, $P(X=3)=0{,}3$, combien vaut $P(X \\ge 2)$ ?",
    format: "short",
    expected: ["0,8"],
    comparator: "number_equal",
    hint: "$P(X=2) + P(X=3)$.",
    explanation: exp(
      "$\\{X \\ge 2\\}$ regroupe les valeurs $2$ et $3$.",
      "$P(X \\ge 2) = 0{,}5 + 0{,}3$.",
      "$= 0{,}8$.",
      "$P(X \\ge 2) = 0{,}8$."
    ),
    canvas: loiGraph([1, 2, 3], [0.2, 0.5, 0.3]),
    tags: ["premiere", "maths", "variables_aleatoires", "notation", "canvas", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_va_not_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_notation",
    difficulty: 2,
    theme: "neutral",
    text: "L'événement $\\{X \\le 5\\}$ signifie :",
    format: "qcm",
    choices: [
      "« $X$ est inférieur ou égal à $5$ »",
      "« $X$ est égal à $5$ »",
      "« $X$ est strictement supérieur à $5$ »",
      "« $X$ vaut $5$ avec probabilité $1$ »",
    ],
    expected: ["« $X$ est inférieur ou égal à $5$ »"],
    comparator: "mcq_exact",
    hint: "Symbole $\\le$.",
    explanation: exp(
      "$\\{X \\le a\\}$ regroupe toutes les valeurs inférieures ou égales à $a$.",
      "Ici $a = 5$.",
      "C'est l'événement « $X \\le 5$ ».",
      "« $X$ est inférieur ou égal à $5$ »."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "notation", "qcm"],
  },
  {
    kind: "template",
    id: "premiere_va_not_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_notation",
    difficulty: 3,
    theme: "neutral",
    hint: "$P(X \\le 2) = P(X=1) + P(X=2)$.",
    tags: ["premiere", "maths", "variables_aleatoires", "notation", "template"],
    generate: () => {
      const p1 = randomInt(1, 4) / 10;
      const p2 = randomInt(1, 4) / 10;
      const p3 = Math.round((1 - p1 - p2) * 10) / 10;
      const cumul = Math.round((p1 + p2) * 10) / 10;
      return {
        text: `$X$ vaut $1$, $2$, $3$ avec $P(X=1)=${String(p1).replace(".", ",")}$, $P(X=2)=${String(p2).replace(".", ",")}$, $P(X=3)=${String(p3).replace(".", ",")}$. Combien vaut $P(X \\le 2)$ ?`,
        format: "short",
        expected: [String(cumul).replace(".", ",")],
        comparator: "number_equal",
        canvas: loiGraph([1, 2, 3], [p1, p2, p3]),
        explanation: exp(
          "$\\{X \\le 2\\}$ regroupe les valeurs $1$ et $2$.",
          `$P(X \\le 2) = ${String(p1).replace(".", ",")} + ${String(p2).replace(".", ",")}$.`,
          `$= ${String(cumul).replace(".", ",")}$.`,
          `$P(X \\le 2) = ${String(cumul).replace(".", ",")}$.`
        ),
      };
    },
  },
];
