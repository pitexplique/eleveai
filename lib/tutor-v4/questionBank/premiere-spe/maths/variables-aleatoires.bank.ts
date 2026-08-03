// lib/tutor-v4/questionBank/premiere-spe/maths/variables-aleatoires.bank.ts
//
// Chapitre : Variables aléatoires réelles (notion "variables_aleatoires")
// microSkills :
//   va_definition         — une variable aléatoire est une FONCTION sur l'univers
//   va_notation           — interpréter les notations {X = a}, P(X ⩽ a)
//   va_modeliser          — modéliser une situation par une variable aléatoire
//   va_loi                — déterminer la loi de probabilité
//   va_esperance          — calculer une espérance
//   va_esperance_probleme — mise, gain net, jeu équitable
//   va_variance           — calculer une variance
//   va_ecart_type         — calculer et interpréter un écart-type
//   va_simulation         — simuler une variable aléatoire avec Python
//   va_echantillon        — moyenne d'un échantillon et espérance
//
// ⚠️ Treize items écrits avant le découpage en dix micro-compétences sont
// restés à leur place dans le fichier, mais leur `microId` a été réaffecté
// (leur `id` est inchangé). C'est le `microId` qui fait foi.
//
// PÉRIMÈTRE BO 2019 Première spé. Conventions : LaTeX, règle QCM.
// Canvas : stat_graph (loi en bâtons), scratch (algorithmes de simulation).
//
// Règle d'écriture : un `fixed` pour une valeur exceptionnelle, un piège, une
// propriété ou un contexte 974 ; un `template` pour tout calcul dont on peut
// changer les nombres ; plusieurs ouvertes dont un template ouvert.

import type { TutorBankItemV4, CanvasFigure } from "@/lib/tutor-v4/types";

function pickOne<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Affichage à la française : la virgule décimale, comme au tableau. */
function fr(x: number): string {
  return String(Math.round(x * 100) / 100).replace(".", ",");
}

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
    kind: "fixed",
    id: "premiere_va_loi_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_loi",
    difficulty: 4,
    theme: "neutral",
    text: "$X$ prend les valeurs $0$, $1$, $2$, $3$ avec $P(X=0) = 0{,}1$, $P(X=1) = 0{,}2$ et $P(X=2) = 0{,}4$. Combien vaut $P(X=3)$ ?",
    format: "short",
    expected: ["0,3"],
    comparator: "number_equal",
    hint: "La somme de toutes les probabilités vaut $1$.",
    explanation: exp(
      "Dans une loi de probabilité, la somme des probabilités de toutes les valeurs vaut $1$.",
      "$0{,}1 + 0{,}2 + 0{,}4 = 0{,}7$, il manque donc $1 - 0{,}7$.",
      "$P(X=3) = 0{,}3$.",
      "$P(X=3) = 0{,}3$."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "loi", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_va_loi_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_modeliser",
    difficulty: 5,
    theme: "neutral",
    text: "On lance deux fois une pièce équilibrée et $X$ compte le nombre de PILE. Combien vaut $P(X = 0)$ ?",
    format: "short",
    expected: ["0,25"],
    comparator: "number_equal",
    hint: "$X = 0$ signifie « FACE puis FACE ».",
    explanation: exp(
      "On liste les issues équiprobables : PP, PF, FP, FF — quatre cas.",
      "$X = 0$ correspond au seul cas FF : $\\dfrac{1}{4}$.",
      "$= 0{,}25$. (On peut aussi multiplier : $0{,}5 \\times 0{,}5$, les lancers étant indépendants.)",
      "$P(X = 0) = 0{,}25$."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "loi", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_va_loi_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_loi",
    difficulty: 4,
    theme: "neutral",
    text: "Peut-on avoir une variable aléatoire prenant seulement les valeurs $1$ et $2$, avec $P(X=1) = 0{,}5$ et $P(X=2) = 0{,}6$ ?",
    format: "qcm",
    choices: [
      "non : la somme dépasse $1$",
      "oui, c'est une loi valable",
      "non : les probabilités doivent être égales",
      "oui, si $X$ prend d'autres valeurs",
    ],
    expected: ["non : la somme dépasse $1$"],
    comparator: "mcq_exact",
    hint: "Additionne les deux probabilités.",
    explanation: exp(
      "Pour définir une loi, il faut que toutes les probabilités soient dans $[0 ; 1]$ ET que leur somme fasse exactement $1$.",
      "Ici $0{,}5 + 0{,}6 = 1{,}1 > 1$.",
      "C'est impossible : $X$ ne prenant que ces deux valeurs, la somme devrait valoir $1$. Ajouter d'autres valeurs ne ferait qu'aggraver le dépassement.",
      "Non : la somme dépasse $1$."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "loi", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_va_loi_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_definition",
    difficulty: 3,
    theme: "neutral",
    text: "Qu'est-ce qu'une variable aléatoire ?",
    format: "qcm",
    choices: [
      "une fonction qui associe un nombre à chaque issue de l'expérience",
      "une probabilité comprise entre $0$ et $1$",
      "un nombre tiré au hasard entre $0$ et $1$",
      "l'ensemble de toutes les issues possibles",
    ],
    expected: [
      "une fonction qui associe un nombre à chaque issue de l'expérience",
    ],
    comparator: "mcq_exact",
    hint: "Elle traduit chaque résultat de l'expérience en un nombre.",
    explanation: exp(
      "Une variable aléatoire traduit le résultat d'une expérience en une valeur numérique.",
      "Exemple : on lance deux dés (l'issue est un couple de faces) et $X$ donne la somme obtenue.",
      "Elle n'est donc pas une probabilité : c'est une fonction définie sur l'univers, à valeurs dans les nombres.",
      "C'est une fonction qui associe un nombre à chaque issue."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "loi", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_va_loi_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_modeliser",
    difficulty: 3,
    theme: "neutral",
    text: "Une urne contient $5$ boules dont $2$ gagnantes. $X$ vaut $1$ si la boule tirée est gagnante, $0$ sinon. Combien vaut $P(X = 1)$ ?",
    format: "short",
    expected: ["0,4"],
    comparator: "number_equal",
    hint: "$\\dfrac{2}{5}$.",
    explanation: exp(
      "On compte les cas favorables sur le nombre total de cas, les tirages étant équiprobables.",
      "$P(X = 1) = \\dfrac{2}{5}$.",
      "$= 0{,}4$. On en déduit $P(X = 0) = 0{,}6$, et la somme vaut bien $1$.",
      "$P(X = 1) = 0{,}4$."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "loi", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_va_loi_fixed_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_modeliser",
    difficulty: 4,
    theme: "neutral",
    text: "On lance un dé équilibré. $X$ vaut $10$ si on obtient $6$, et $0$ sinon. Combien vaut $P(X = 0)$ ?",
    format: "qcm",
    choices: [
      "$\\dfrac{5}{6}$",
      "$\\dfrac{1}{6}$",
      "$0$",
      "$\\dfrac{1}{2}$",
    ],
    expected: ["$\\dfrac{5}{6}$"],
    comparator: "mcq_exact",
    hint: "Combien de faces ne donnent pas $6$ ?",
    explanation: exp(
      "$X = 0$ correspond à toutes les issues sauf le $6$.",
      "Cinq faces sur six conviennent : $\\dfrac{5}{6}$.",
      "On peut aussi passer par l'événement contraire : $1 - \\dfrac{1}{6} = \\dfrac{5}{6}$.",
      "$P(X = 0) = \\dfrac{5}{6}$."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "loi", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_va_loi_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_loi",
    difficulty: 3,
    theme: "neutral",
    text: "Que signifie « donner la loi de probabilité de $X$ » ?",
    format: "qcm",
    choices: [
      "donner toutes les valeurs possibles de $X$ et leur probabilité",
      "donner uniquement l'espérance de $X$",
      "donner la plus grande valeur de $X$",
      "donner la formule de $X$",
    ],
    expected: [
      "donner toutes les valeurs possibles de $X$ et leur probabilité",
    ],
    comparator: "mcq_exact",
    hint: "C'est ce qu'on présente en général dans un tableau à deux lignes.",
    explanation: exp(
      "La loi de probabilité décrit complètement le comportement de $X$.",
      "On liste toutes les valeurs $x_i$ que $X$ peut prendre, et pour chacune la probabilité $P(X = x_i)$.",
      "On la présente souvent dans un tableau, dont la ligne des probabilités a pour somme $1$. L'espérance se calcule ENSUITE, à partir de cette loi.",
      "C'est donner toutes les valeurs possibles de $X$ et leur probabilité."
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
    microId: "va_esperance_probleme",
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
    microId: "va_esperance_probleme",
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
    kind: "fixed",
    id: "premiere_va_esp_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_esperance",
    difficulty: 4,
    theme: "neutral",
    text: "$X$ vaut $1$, $2$ ou $3$ avec les probabilités $0{,}2$, $0{,}5$ et $0{,}3$. Calcule $E(X)$.",
    format: "short",
    expected: ["2,1"],
    comparator: "number_equal",
    hint: "$1 \\times 0{,}2 + 2 \\times 0{,}5 + 3 \\times 0{,}3$.",
    explanation: exp(
      "L'espérance est la somme des valeurs multipliées par leurs probabilités : $E(X) = \\sum x_i p_i$.",
      "$1 \\times 0{,}2 + 2 \\times 0{,}5 + 3 \\times 0{,}3 = 0{,}2 + 1 + 0{,}9$.",
      "$= 2{,}1$.",
      "$E(X) = 2{,}1$."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "esperance", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_va_esp_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_esperance",
    difficulty: 5,
    theme: "neutral",
    text: "$X$ vaut $-1$, $0$ ou $4$ avec les probabilités $0{,}5$, $0{,}3$ et $0{,}2$. Calcule $E(X)$.",
    format: "short",
    expected: ["0,3"],
    comparator: "number_equal",
    hint: "Attention au terme négatif : $-1 \\times 0{,}5 = -0{,}5$.",
    explanation: exp(
      "On applique $E(X) = \\sum x_i p_i$, valeurs négatives comprises.",
      "$(-1) \\times 0{,}5 + 0 \\times 0{,}3 + 4 \\times 0{,}2 = -0{,}5 + 0 + 0{,}8$.",
      "$= 0{,}3$.",
      "$E(X) = 0{,}3$."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "esperance", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_va_esp_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_esperance",
    difficulty: 5,
    theme: "neutral",
    text: "On lance un dé équilibré et $X$ est le résultat. Combien vaut $E(X)$ ?",
    format: "short",
    expected: ["3,5"],
    comparator: "number_equal",
    hint: "$\\dfrac{1 + 2 + 3 + 4 + 5 + 6}{6}$.",
    explanation: exp(
      "Toutes les faces ayant la même probabilité $\\dfrac{1}{6}$, l'espérance est la moyenne des valeurs.",
      "$E(X) = \\dfrac{1 + 2 + 3 + 4 + 5 + 6}{6} = \\dfrac{21}{6}$.",
      "$= 3{,}5$.",
      "$E(X) = 3{,}5$ : l'espérance n'est pas forcément une valeur que $X$ peut prendre."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "esperance", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_va_esp_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_esperance",
    difficulty: 3,
    theme: "neutral",
    text: "Que représente concrètement l'espérance $E(X)$ ?",
    format: "qcm",
    choices: [
      "la valeur moyenne de $X$ si on répète l'expérience un très grand nombre de fois",
      "la valeur la plus probable de $X$",
      "la plus grande valeur que $X$ peut prendre",
      "la probabilité que $X$ soit positif",
    ],
    expected: [
      "la valeur moyenne de $X$ si on répète l'expérience un très grand nombre de fois",
    ],
    comparator: "mcq_exact",
    hint: "C'est une moyenne, pondérée par les probabilités.",
    explanation: exp(
      "L'espérance est la moyenne des valeurs de $X$, chacune pesée par sa probabilité.",
      "Sur un très grand nombre de répétitions, la moyenne des résultats observés se rapproche de $E(X)$.",
      "Ce n'est pas la valeur la plus probable : pour un dé, $E(X) = 3{,}5$, une valeur que le dé ne donne jamais.",
      "C'est la valeur moyenne sur un très grand nombre de répétitions."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "esperance", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_va_esp_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_esperance_probleme",
    difficulty: 5,
    theme: "neutral",
    text: "À un jeu, le gain NET $X$ vaut $-3$ € avec la probabilité $0{,}75$ et $7$ € avec la probabilité $0{,}25$. Calcule $E(X)$.",
    format: "short",
    expected: ["-0,5"],
    comparator: "number_equal",
    hint: "$(-3) \\times 0{,}75 + 7 \\times 0{,}25$.",
    explanation: exp(
      "Le gain net tient déjà compte de la mise : on applique directement $E(X) = \\sum x_i p_i$.",
      "$(-3) \\times 0{,}75 + 7 \\times 0{,}25 = -2{,}25 + 1{,}75$.",
      "$= -0{,}5$.",
      "$E(X) = -0{,}5$ € : le jeu est défavorable au joueur."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "esperance", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_va_esp_fixed_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_esperance_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Un jeu a une espérance de gain de $-0{,}5$ € par partie. Quelle perte moyenne peut-on prévoir sur $100$ parties, en euros ?",
    format: "short",
    expected: ["50"],
    comparator: "number_equal",
    hint: "$100 \\times 0{,}5$.",
    explanation: exp(
      "L'espérance donne le gain moyen par partie : sur $n$ parties, on prévoit environ $n \\times E(X)$.",
      "$100 \\times (-0{,}5) = -50$.",
      "Le joueur perd donc en moyenne $50$ € sur $100$ parties.",
      "La perte moyenne prévisible est de $50$ €."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "esperance", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_va_esp_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_esperance",
    difficulty: 3,
    theme: "neutral",
    text: "$X$ vaut $0$ avec la probabilité $0{,}9$ et $10$ avec la probabilité $0{,}1$. Calcule $E(X)$.",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "$0 \\times 0{,}9 + 10 \\times 0{,}1$.",
    explanation: exp(
      "On applique $E(X) = \\sum x_i p_i$.",
      "$0 \\times 0{,}9 + 10 \\times 0{,}1 = 0 + 1$.",
      "$= 1$.",
      "$E(X) = 1$ : un gros gain rare peut donner une espérance modeste."
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
    microId: "va_ecart_type",
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
    microId: "va_ecart_type",
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
    kind: "fixed",
    id: "premiere_va_var_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_ecart_type",
    difficulty: 3,
    theme: "neutral",
    text: "Si $V(X) = 16$, combien vaut l'écart-type $\\sigma(X)$ ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "$\\sqrt{16}$.",
    explanation: exp(
      "L'écart-type est la racine carrée de la variance : $\\sigma(X) = \\sqrt{V(X)}$.",
      "$\\sigma(X) = \\sqrt{16}$.",
      "$= 4$. On prend la racine pour revenir à la même unité que $X$ : la variance, elle, s'exprime en unités au carré.",
      "$\\sigma(X) = 4$."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "variance", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_va_var_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_variance",
    difficulty: 5,
    theme: "neutral",
    text: "$X$ vaut $0$ ou $4$ avec la probabilité $0{,}5$ chacune, et $E(X) = 2$. Calcule la variance $V(X)$.",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "$(0-2)^2 \\times 0{,}5 + (4-2)^2 \\times 0{,}5$.",
    explanation: exp(
      "La variance est la moyenne des carrés des écarts à l'espérance : $V(X) = \\sum p_i (x_i - E(X))^2$.",
      "$(0 - 2)^2 \\times 0{,}5 + (4 - 2)^2 \\times 0{,}5 = 4 \\times 0{,}5 + 4 \\times 0{,}5$.",
      "$= 2 + 2 = 4$. Les écarts sont élevés au carré : la variance ne peut jamais être négative.",
      "$V(X) = 4$ (et $\\sigma(X) = 2$)."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "variance", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_va_var_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_ecart_type",
    difficulty: 4,
    theme: "neutral",
    text: "Si l'écart-type vaut $\\sigma(X) = 3$, combien vaut la variance $V(X)$ ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "La variance est le CARRÉ de l'écart-type.",
    explanation: exp(
      "Les deux quantités sont liées par $\\sigma(X) = \\sqrt{V(X)}$, donc $V(X) = \\sigma(X)^2$.",
      "$V(X) = 3^2$.",
      "$= 9$.",
      "$V(X) = 9$."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "variance", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_va_var_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_variance",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle formule donne la variance de $X$ ?",
    format: "qcm",
    choices: [
      "$V(X) = \\sum p_i \\left(x_i - E(X)\\right)^2$",
      "$V(X) = \\sum p_i \\left(x_i - E(X)\\right)$",
      "$V(X) = \\sum x_i p_i$",
      "$V(X) = \\sqrt{\\sum p_i x_i^2}$",
    ],
    expected: ["$V(X) = \\sum p_i \\left(x_i - E(X)\\right)^2$"],
    comparator: "mcq_exact",
    hint: "Sans le carré, la somme des écarts vaudrait toujours $0$.",
    explanation: exp(
      "La variance mesure la dispersion autour de l'espérance : on part des écarts $x_i - E(X)$.",
      "Ces écarts sont élevés au CARRÉ, sinon les écarts positifs et négatifs se compenseraient et la somme vaudrait toujours $0$.",
      "Chaque carré est ensuite pesé par sa probabilité $p_i$. La formule $\\sum x_i p_i$, elle, donne l'espérance.",
      "$V(X) = \\sum p_i \\left(x_i - E(X)\\right)^2$."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "variance", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_va_var_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_variance",
    difficulty: 4,
    theme: "neutral",
    text: "Deux variables ont la même espérance, mais $V(X) = 0{,}5$ et $V(Y) = 20$. Que peut-on dire ?",
    format: "qcm",
    choices: [
      "les valeurs de $Y$ sont bien plus dispersées que celles de $X$",
      "les valeurs de $Y$ sont plus grandes que celles de $X$",
      "$Y$ a une plus grande probabilité d'être positive",
      "on ne peut rien comparer",
    ],
    expected: ["les valeurs de $Y$ sont bien plus dispersées que celles de $X$"],
    comparator: "mcq_exact",
    hint: "La variance mesure l'écartement autour de la moyenne, pas la taille des valeurs.",
    explanation: exp(
      "La variance mesure à quel point les valeurs s'écartent de l'espérance.",
      "$V(Y) = 20$ est bien supérieure à $V(X) = 0{,}5$ : les valeurs de $Y$ s'éloignent beaucoup plus de la moyenne.",
      "Cela ne dit rien de leur taille : les deux ont ici la même espérance. $X$ est simplement plus régulière, $Y$ plus imprévisible.",
      "Les valeurs de $Y$ sont bien plus dispersées."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "variance", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_va_var_fixed_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_variance",
    difficulty: 5,
    theme: "neutral",
    text: "Une variable aléatoire vérifie $V(X) = 0$. Que peut-on en déduire ?",
    format: "qcm",
    choices: [
      "$X$ prend toujours la même valeur",
      "$X$ vaut toujours $0$",
      "$E(X) = 0$",
      "c'est impossible",
    ],
    expected: ["$X$ prend toujours la même valeur"],
    comparator: "mcq_exact",
    hint: "Une somme de carrés est nulle seulement si chaque terme l'est.",
    explanation: exp(
      "La variance est une somme de termes positifs $p_i(x_i - E(X))^2$.",
      "Elle ne peut être nulle que si chaque écart $x_i - E(X)$ est nul : toutes les valeurs prises coïncident avec l'espérance.",
      "$X$ est donc constante — mais cette constante n'est pas forcément $0$ : une variable valant toujours $7$ a une variance nulle et une espérance de $7$.",
      "$X$ prend toujours la même valeur."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "variance", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_va_var_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_variance",
    difficulty: 5,
    theme: "neutral",
    text: "$X$ vaut $1$ ou $3$ avec la probabilité $0{,}5$ chacune, et $E(X) = 2$. Calcule $V(X)$.",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Chaque valeur est à une distance de $1$ de l'espérance.",
    explanation: exp(
      "On applique $V(X) = \\sum p_i (x_i - E(X))^2$.",
      "$(1 - 2)^2 \\times 0{,}5 + (3 - 2)^2 \\times 0{,}5 = 1 \\times 0{,}5 + 1 \\times 0{,}5$.",
      "$= 1$. Le carré rend positif l'écart $(1 - 2) = -1$.",
      "$V(X) = 1$ (et $\\sigma(X) = 1$)."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "variance", "short"],
  },
  {
    kind: "template",
    id: "premiere_va_var_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_ecart_type",
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
    kind: "fixed",
    id: "premiere_va_not_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_notation",
    difficulty: 4,
    theme: "neutral",
    text: "Avec $P(X=1)=0{,}2$, $P(X=2)=0{,}5$ et $P(X=3)=0{,}3$, combien vaut $P(X < 3)$ ?",
    format: "short",
    expected: ["0,7"],
    comparator: "number_equal",
    hint: "Strictement inférieur à $3$ : les valeurs $1$ et $2$.",
    explanation: exp(
      "L'inégalité STRICTE $X < 3$ exclut la valeur $3$.",
      "Restent les valeurs $1$ et $2$ : $0{,}2 + 0{,}5$.",
      "$= 0{,}7$.",
      "$P(X < 3) = 0{,}7$."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "notation", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_va_not_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_notation",
    difficulty: 4,
    theme: "neutral",
    text: "Avec $P(X=1)=0{,}2$, $P(X=2)=0{,}5$ et $P(X=3)=0{,}3$, combien vaut $P(X > 1)$ ?",
    format: "short",
    expected: ["0,8"],
    comparator: "number_equal",
    hint: "Strictement supérieur à $1$ : les valeurs $2$ et $3$.",
    explanation: exp(
      "$X > 1$ exclut la valeur $1$ elle-même.",
      "Restent $2$ et $3$ : $0{,}5 + 0{,}3$.",
      "$= 0{,}8$. On peut aussi passer par l'événement contraire : $1 - P(X = 1) = 1 - 0{,}2$.",
      "$P(X > 1) = 0{,}8$."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "notation", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_va_not_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_notation",
    difficulty: 3,
    theme: "neutral",
    text: "Que désigne l'événement $\\{X \\ge 2\\}$ ?",
    format: "qcm",
    choices: [
      "« $X$ prend la valeur $2$ ou une valeur plus grande »",
      "« $X$ prend une valeur strictement plus grande que $2$ »",
      "« $X$ est égal à $2$ »",
      "« $X$ prend une valeur plus petite que $2$ »",
    ],
    expected: ["« $X$ prend la valeur $2$ ou une valeur plus grande »"],
    comparator: "mcq_exact",
    hint: "Le trait sous le symbole $\\ge$ inclut l'égalité.",
    explanation: exp(
      "Le symbole $\\ge$ signifie « supérieur OU ÉGAL ».",
      "L'événement $\\{X \\ge 2\\}$ regroupe donc la valeur $2$ et toutes les valeurs au-dessus.",
      "Sans le trait, $\\{X > 2\\}$ exclurait la valeur $2$ : la différence porte exactement sur $P(X = 2)$.",
      "C'est « $X$ prend la valeur $2$ ou une valeur plus grande »."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "notation", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_va_not_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_notation",
    difficulty: 3,
    theme: "neutral",
    text: "Si $P(X = 2) = 0{,}5$, combien vaut la probabilité que $X$ ne prenne PAS la valeur $2$ ?",
    format: "short",
    expected: ["0,5"],
    comparator: "number_equal",
    hint: "Événement contraire : on retranche à $1$.",
    explanation: exp(
      "« Ne pas prendre la valeur $2$ » est l'événement contraire de $\\{X = 2\\}$.",
      "Sa probabilité vaut $1 - P(X = 2) = 1 - 0{,}5$.",
      "$= 0{,}5$.",
      "La probabilité est $0{,}5$."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "notation", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_va_not_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_notation",
    difficulty: 5,
    theme: "neutral",
    text: "Quelle est la différence entre $\\{X \\le 2\\}$ et $\\{X < 2\\}$ ?",
    format: "qcm",
    choices: [
      "le premier contient la valeur $2$, pas le second",
      "aucune, les deux sont identiques",
      "le second contient la valeur $2$, pas le premier",
      "le premier ne contient que la valeur $2$",
    ],
    expected: ["le premier contient la valeur $2$, pas le second"],
    comparator: "mcq_exact",
    hint: "$\\le$ autorise l'égalité, $<$ l'interdit.",
    explanation: exp(
      "$\\le$ signifie « inférieur ou égal », $<$ signifie « strictement inférieur ».",
      "$\\{X \\le 2\\}$ inclut donc la valeur $2$, que $\\{X < 2\\}$ exclut.",
      "L'écart entre les deux probabilités est exactement $P(X = 2)$. Pour une variable prenant des valeurs entières, $\\{X < 2\\}$ revient à $\\{X \\le 1\\}$.",
      "Le premier contient la valeur $2$, pas le second."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "notation", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_va_not_fixed_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_notation",
    difficulty: 5,
    theme: "neutral",
    text: "$X$ prend les valeurs $0$, $1$, $2$, $3$ avec les probabilités $0{,}1$, $0{,}2$, $0{,}4$ et $0{,}3$. Combien vaut $P(1 \\le X \\le 2)$ ?",
    format: "short",
    expected: ["0,6"],
    comparator: "number_equal",
    hint: "Les deux bornes sont incluses : additionne $P(X=1)$ et $P(X=2)$.",
    explanation: exp(
      "L'encadrement $1 \\le X \\le 2$ retient les valeurs comprises entre $1$ et $2$, bornes INCLUSES.",
      "Seules les valeurs $1$ et $2$ conviennent : $0{,}2 + 0{,}4$.",
      "$= 0{,}6$.",
      "$P(1 \\le X \\le 2) = 0{,}6$."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "notation", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_va_not_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_notation",
    difficulty: 4,
    theme: "neutral",
    text: "$X$ prend uniquement les valeurs $1$, $2$ et $3$. Combien vaut $P(X \\le 3)$ ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Cet événement contient-il toutes les valeurs possibles ?",
    explanation: exp(
      "$\\{X \\le 3\\}$ regroupe les valeurs $1$, $2$ et $3$.",
      "Or ce sont les SEULES valeurs que $X$ peut prendre : l'événement est certain.",
      "Sa probabilité vaut donc $0{,}2 + 0{,}5 + 0{,}3 = 1$, quelle que soit la loi.",
      "$P(X \\le 3) = 1$."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "notation", "short"],
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

  /* ===================== VA_DEFINITION (compléments) ===================== */
  {
    kind: "fixed",
    id: "premiere_va_def_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_definition",
    difficulty: 4,
    theme: "neutral",
    text: "Pourquoi dit-on qu'une variable aléatoire est une FONCTION ?",
    format: "qcm",
    choices: [
      "parce qu'elle associe un nombre à chaque issue de l'univers",
      "parce qu'elle se représente par une courbe",
      "parce qu'elle prend des valeurs au hasard",
      "parce qu'elle a une dérivée",
    ],
    expected: ["parce qu'elle associe un nombre à chaque issue de l'univers"],
    comparator: "mcq_exact",
    hint: "Quel est l'ensemble de départ ? Quel est l'ensemble d'arrivée ?",
    explanation: exp(
      "Une fonction associe à chaque élément d'un ensemble de départ un unique élément d'un ensemble d'arrivée.",
      "Ici l'ensemble de départ est l'univers $\\Omega$ — l'ensemble des issues possibles — et l'ensemble d'arrivée est $\\mathbb{R}$.",
      "À chaque issue, $X$ associe donc un nombre, et un seul. Rien n'est « au hasard » dans $X$ elle-même : le hasard est dans le tirage de l'issue, pas dans la règle qui lui associe un nombre.",
      "C'est une fonction de $\\Omega$ vers $\\mathbb{R}$ — le nom « variable » est trompeur."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_va_def_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_definition",
    difficulty: 5,
    theme: "neutral",
    text: "On lance deux dés et $X$ désigne la somme obtenue. Quel est l'ensemble de départ de $X$ ?",
    format: "qcm",
    choices: [
      "l'ensemble des $36$ couples de résultats possibles",
      "l'ensemble $\\{2 ; 3 ; \\ldots ; 12\\}$ des sommes",
      "l'ensemble $\\{1 ; 2 ; \\ldots ; 6\\}$",
      "l'intervalle $[2 ; 12]$",
    ],
    expected: ["l'ensemble des $36$ couples de résultats possibles"],
    comparator: "mcq_exact",
    hint: "Ne pas confondre l'ensemble de DÉPART et l'ensemble des VALEURS prises.",
    explanation: exp(
      "L'ensemble de départ d'une variable aléatoire est l'univers : l'ensemble des issues de l'expérience.",
      "Ici une issue est un couple $(a ; b)$ donnant les deux faces : il y en a $6 \\times 6 = 36$.",
      "L'ensemble $\\{2 ; \\ldots ; 12\\}$ est celui des VALEURS prises par $X$, c'est-à-dire son ensemble d'arrivée utile — pas son ensemble de départ. Plusieurs issues donnent d'ailleurs la même valeur : $(1 ; 3)$, $(2 ; 2)$ et $(3 ; 1)$ donnent tous $4$.",
      "L'ensemble de départ est celui des $36$ couples."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "definition", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_va_def_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_definition",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi le nom « variable aléatoire » est trompeur.",
    format: "open",
    expected: ["fonction", "pas une variable", "issue", "univers", "hasard"],
    comparator: "contains_keyword",
    hint: "Est-ce que $X$ est une variable au sens de « $x$ » dans une équation ?",
    explanation: exp(
      "Dans « $2x + 3 = 7$ », la variable $x$ est un nombre inconnu. Une variable aléatoire, elle, n'est pas un nombre.",
      "$X$ est une FONCTION : elle associe un nombre à chaque issue de l'expérience.",
      "Et elle n'a rien d'aléatoire non plus : la règle est parfaitement déterminée. Le hasard porte sur l'issue tirée, pas sur $X$. Une fois l'issue connue, la valeur de $X$ l'est aussi.",
      "Ni vraiment « variable », ni vraiment « aléatoire » : c'est une fonction définie sur l'univers, dont on ignore seulement l'argument."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "definition", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_va_def_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_definition",
    difficulty: 5,
    theme: "neutral",
    text: "Deux issues différentes peuvent-elles donner la même valeur de $X$ ? Et une même issue, deux valeurs ? Justifie.",
    format: "open",
    expected: ["fonction", "une seule", "plusieurs issues", "meme valeur", "même valeur", "unique"],
    comparator: "contains_keyword",
    hint: "C'est la définition d'une fonction qui répond aux deux questions.",
    explanation: exp(
      "Une fonction associe à chaque élément de départ UNE SEULE image ; mais rien n'interdit à plusieurs éléments d'avoir la même.",
      "Deux issues différentes peuvent donc parfaitement donner la même valeur : avec deux dés, $(1 ; 3)$ et $(2 ; 2)$ donnent tous deux une somme de $4$.",
      "En revanche, une même issue ne peut pas donner deux valeurs : ce ne serait plus une fonction, et $P(X = k)$ n'aurait plus de sens.",
      "Oui pour la première, non pour la seconde — c'est exactement ce que dit le mot « fonction »."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "definition", "open"],
  },
  {
    kind: "template",
    id: "premiere_va_def_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_definition",
    difficulty: 4,
    theme: "neutral",
    hint: "Une variable aléatoire associe un NOMBRE à chaque issue.",
    tags: ["premiere", "maths", "variables_aleatoires", "definition", "template"],
    generate: () => {
      const cas = [
        { d: "la somme des deux dés", ok: true },
        { d: "la couleur de la boule tirée", ok: false },
        { d: "le nombre de PILE en trois lancers", ok: true },
        { d: "le prénom de l'élève interrogé", ok: false },
        { d: "le gain en euros à la fin de la partie", ok: true },
        { d: "le fait que le test soit positif ou négatif", ok: false },
      ];
      const c = pickOne(cas);
      return {
        text: `« ${c.d.charAt(0).toUpperCase() + c.d.slice(1)} » définit-il une variable aléatoire ?`,
        format: "qcm",
        choices: c.ok
          ? ["oui", "non : ce n'est pas un nombre", "non : ce n'est pas aléatoire", "on ne peut pas savoir"]
          : ["non : ce n'est pas un nombre", "oui", "oui, c'est une variable aléatoire", "on ne peut pas savoir"],
        expected: [c.ok ? "oui" : "non : ce n'est pas un nombre"],
        comparator: "mcq_exact",
        explanation: exp(
          "Une variable aléatoire est une fonction de l'univers vers $\\mathbb{R}$ : elle doit associer un NOMBRE à chaque issue.",
          `On regarde ce que « ${c.d} » associe à une issue.`,
          c.ok
            ? "C'est bien un nombre : la définition est respectée."
            : "Ce n'est pas un nombre mais une catégorie. On peut la coder par un nombre (par exemple $1$ et $0$), et c'est alors ce codage qui est la variable aléatoire.",
          c.ok ? "Oui, c'est une variable aléatoire." : "Non, pas en l'état : il faut d'abord la coder par un nombre."
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_va_def_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_definition",
    difficulty: 5,
    theme: "neutral",
    hint: "Sépare bien l'ensemble des ISSUES et l'ensemble des VALEURS prises.",
    tags: ["premiere", "maths", "variables_aleatoires", "definition", "open", "template"],
    generate: () => {
      const cas = [
        { exp: "on lance deux pièces et $X$ compte le nombre de PILE", univers: "les 4 couples possibles", valeurs: "$\\{0 ; 1 ; 2\\}$" },
        { exp: "on lance un dé et $X$ vaut $10$ si on obtient $6$, $0$ sinon", univers: "les 6 faces", valeurs: "$\\{0 ; 10\\}$" },
        { exp: "on tire une carte et $X$ vaut $1$ si c'est un cœur, $0$ sinon", univers: "les 52 cartes", valeurs: "$\\{0 ; 1\\}$" },
        { exp: "on lance deux dés et $X$ donne le plus grand des deux résultats", univers: "les 36 couples", valeurs: "$\\{1 ; 2 ; 3 ; 4 ; 5 ; 6\\}$" },
      ];
      const c = pickOne(cas);
      return {
        text: `Dans l'expérience suivante — ${c.exp} — décris l'univers de départ et l'ensemble des valeurs prises par $X$, et explique pourquoi ce sont deux ensembles différents.`,
        format: "open",
        expected: ["issues", "univers", "valeurs", "plusieurs issues", "fonction"],
        comparator: "contains_keyword",
        explanation: exp(
          "Une variable aléatoire va de l'univers des ISSUES vers un ensemble de NOMBRES : les deux ensembles n'ont pas la même nature.",
          `Ici l'univers est formé par ${c.univers} : ce sont les résultats bruts de l'expérience.`,
          `Les valeurs prises par $X$ sont ${c.valeurs} : ce sont les nombres que la règle produit.`,
          "Ils diffèrent parce que plusieurs issues peuvent donner la même valeur : $X$ regroupe des issues, elle ne les distingue plus."
        ),
      };
    },
  },

  /* ===================== VA_MODELISER (compléments) ===================== */
  {
    kind: "fixed",
    id: "premiere_va_mod_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_modeliser",
    difficulty: 5,
    theme: "reunion",
    text: "Une tombola d'école à Saint-Louis vend des tickets à $2$ €. Un ticket sur $50$ gagne un lot de $30$ €. Comment modéliser le gain NET d'un joueur ?",
    format: "qcm",
    choices: [
      "$X = 28$ avec la probabilité $\\dfrac{1}{50}$, et $X = -2$ avec la probabilité $\\dfrac{49}{50}$",
      "$X = 30$ avec la probabilité $\\dfrac{1}{50}$, et $X = 0$ avec la probabilité $\\dfrac{49}{50}$",
      "$X = 30$ avec la probabilité $\\dfrac{1}{50}$, et $X = -2$ avec la probabilité $\\dfrac{49}{50}$",
      "$X = 2$ avec la probabilité $\\dfrac{1}{50}$",
    ],
    expected: ["$X = 28$ avec la probabilité $\\dfrac{1}{50}$, et $X = -2$ avec la probabilité $\\dfrac{49}{50}$"],
    comparator: "mcq_exact",
    hint: "Le gain NET, c'est ce qu'on gagne moins ce qu'on a payé — y compris quand on gagne.",
    explanation: exp(
      "Modéliser un gain NET, c'est retrancher la mise dans TOUS les cas, y compris celui où l'on gagne.",
      "Le joueur paie $2$ € quoi qu'il arrive. S'il gagne, il reçoit $30$ € : son gain net est $30 - 2 = 28$ €.",
      "S'il perd, il ne reçoit rien : son gain net est $-2$ €. Les probabilités sont $\\dfrac{1}{50}$ et $\\dfrac{49}{50}$.",
      "$X$ vaut $28$ ou $-2$ — l'oubli classique est de garder $30$ pour le cas gagnant."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "modeliser", "reunion", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_va_mod_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_modeliser",
    difficulty: 5,
    theme: "neutral",
    text: "Quelles sont les étapes pour modéliser une situation par une variable aléatoire ?",
    format: "open",
    expected: ["univers", "issues", "valeurs", "probabilites", "probabilités", "loi"],
    comparator: "contains_keyword",
    hint: "Trois questions à se poser, dans l'ordre.",
    explanation: exp(
      "Modéliser, c'est traduire une situation concrète en objets mathématiques manipulables.",
      "Étape 1 — décrire l'expérience et son univers : quelles sont les issues possibles ?",
      "Étape 2 — définir ce que $X$ associe à chaque issue, en une phrase précise (« $X$ est le gain net en euros »). Étape 3 — donner les valeurs prises et leurs probabilités, c'est-à-dire la loi.",
      "Univers, puis règle, puis loi : la plupart des erreurs viennent d'une étape 2 imprécise — « le gain » ne dit pas si la mise est déduite."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "modeliser", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_va_mod_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_modeliser",
    difficulty: 5,
    theme: "neutral",
    text: "Pourquoi faut-il préciser « gain net » ou « gain brut » quand on définit la variable aléatoire d'un jeu ?",
    format: "open",
    expected: ["mise", "deduite", "déduite", "retranche", "resultat different", "résultat différent"],
    comparator: "contains_keyword",
    hint: "Les deux choix donnent-ils la même espérance ?",
    explanation: exp(
      "« Gain » est ambigu : il peut désigner ce que le joueur reçoit, ou ce qu'il reçoit moins ce qu'il a payé.",
      "Le gain brut ne retranche pas la mise ; le gain net la retranche dans tous les cas.",
      "Les deux modélisations donnent des espérances qui diffèrent exactement de la mise. Or c'est le signe de l'espérance du gain NET qui dit si le jeu est favorable au joueur : se tromper de convention inverse parfois la conclusion.",
      "Sans cette précision, on ne sait pas ce qu'on calcule — et la question « le jeu est-il équitable ? » n'a plus de réponse."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "modeliser", "open"],
  },
  {
    kind: "template",
    id: "premiere_va_mod_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_modeliser",
    difficulty: 4,
    theme: "neutral",
    hint: "Compte les issues favorables, puis divise par le nombre total d'issues.",
    tags: ["premiere", "maths", "variables_aleatoires", "modeliser", "template"],
    generate: () => {
      const n = randomInt(5, 12);
      const g = randomInt(1, n - 1);
      const lot = pickOne([10, 20, 50, 100]);
      const correct = `$\\dfrac{${g}}{${n}}$`;
      return {
        text: `Une urne contient $${n}$ jetons dont $${g}$ gagnants. On tire un jeton et $X$ vaut $${lot}$ si le jeton est gagnant, $0$ sinon. Combien vaut $P(X = ${lot})$ ?`,
        format: "qcm",
        choices: [correct, `$\\dfrac{${n - g}}{${n}}$`, `$\\dfrac{${g}}{${lot}}$`, `$\\dfrac{1}{${n}}$`],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "L'événement $\\{X = " + lot + "\\}$ regroupe les issues auxquelles $X$ associe cette valeur : ici, tirer un jeton gagnant.",
          `Il y a $${g}$ jetons gagnants sur $${n}$ jetons au total, tous équiprobables.`,
          `$P(X = ${lot}) = \\dfrac{${g}}{${n}}$, et l'autre valeur possible a pour probabilité $\\dfrac{${n - g}}{${n}}$.`,
          `${correct} — les deux probabilités s'additionnent bien à $1$.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_va_mod_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_modeliser",
    difficulty: 5,
    theme: "neutral",
    hint: "N'oublie pas de retrancher la mise dans TOUS les cas, gagnant compris.",
    tags: ["premiere", "maths", "variables_aleatoires", "modeliser", "open", "template"],
    generate: () => {
      const mise = pickOne([1, 2, 3, 5]);
      const lot = pickOne([20, 30, 50, 100]);
      const n = pickOne([20, 25, 50, 100]);
      return {
        text: `Un jeu coûte $${mise}$ € par partie. Une partie sur $${n}$ fait gagner un lot de $${lot}$ €. Définis la variable aléatoire du gain NET : quelles valeurs prend-elle, avec quelles probabilités ?`,
        format: "open",
        expected: [String(lot - mise), "-" + mise, "mise", "net", "retranche"],
        comparator: "contains_keyword",
        explanation: exp(
          "Le gain net retranche la mise dans tous les cas : c'est ce que le joueur a réellement en poche à la fin.",
          `En cas de gain, il reçoit $${lot}$ € mais a payé $${mise}$ € : son gain net vaut $${lot} - ${mise} = ${lot - mise}$ €.`,
          `En cas de perte, il n'a rien reçu et a payé $${mise}$ € : son gain net vaut $-${mise}$ €. Les probabilités sont $\\dfrac{1}{${n}}$ et $\\dfrac{${n - 1}}{${n}}$.`,
          `$X$ prend les valeurs $${lot - mise}$ et $-${mise}$ — l'erreur classique est de garder $${lot}$ pour le cas gagnant.`
        ),
      };
    },
  },

  /* ===================== VA_ESPERANCE_PROBLEME (compléments) ===================== */
  {
    kind: "fixed",
    id: "premiere_va_espp_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_esperance_probleme",
    difficulty: 5,
    theme: "neutral",
    text: "L'espérance du gain net d'un jeu vaut $-0{,}4$ €. Que peut-on en conclure ?",
    format: "qcm",
    choices: [
      "le jeu est défavorable au joueur : il perd en moyenne $0{,}40$ € par partie",
      "le joueur perd exactement $0{,}40$ € à chaque partie",
      "le jeu est équitable",
      "le joueur ne peut jamais gagner",
    ],
    expected: ["le jeu est défavorable au joueur : il perd en moyenne $0{,}40$ € par partie"],
    comparator: "mcq_exact",
    hint: "L'espérance est une moyenne sur un grand nombre de parties, pas une garantie.",
    explanation: exp(
      "L'espérance est la valeur moyenne du gain, au sens où elle est approchée par la moyenne des gains sur un grand nombre de parties.",
      "Une espérance négative signifie que la moyenne est une perte : le jeu est défavorable au joueur.",
      "Mais elle ne dit rien d'une partie isolée : le joueur peut très bien gagner gros une fois. D'ailleurs, si $X$ ne prend que les valeurs $-2$ et $28$, il ne vaudra JAMAIS $-0{,}4$.",
      "Le jeu est défavorable : sur $100$ parties, on peut prévoir environ $40$ € de perte."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "esperance_probleme", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_va_espp_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_esperance_probleme",
    difficulty: 5,
    theme: "neutral",
    text: "Comment détermine-t-on le prix qui rendrait un jeu équitable ?",
    format: "open",
    expected: ["esperance", "espérance", "nulle", "egale", "égale", "gain moyen", "mise"],
    comparator: "contains_keyword",
    hint: "Un jeu est équitable quand l'espérance du gain net est nulle.",
    explanation: exp(
      "Un jeu est équitable lorsque, en moyenne, ni le joueur ni l'organisateur ne gagne : l'espérance du gain NET est nulle.",
      "On calcule d'abord l'espérance du gain BRUT, c'est-à-dire ce que le joueur reçoit en moyenne.",
      "La mise équitable est exactement ce nombre : en la retranchant, l'espérance nette devient nulle.",
      "Prix équitable = espérance du gain brut. Un jeu réel se fixe toujours au-dessus : la différence est la marge de l'organisateur."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "esperance_probleme", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_va_espp_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_esperance_probleme",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève dit : « l'espérance vaut $2{,}5$, donc je gagnerai $2{,}50$ € ». Explique pourquoi c'est faux.",
    format: "open",
    expected: ["moyenne", "grand nombre", "jamais", "valeurs possibles", "une partie"],
    comparator: "contains_keyword",
    hint: "L'espérance fait-elle partie des valeurs que $X$ peut prendre ?",
    explanation: exp(
      "L'espérance est une moyenne pondérée : elle décrit un comportement sur un grand nombre de répétitions, pas le résultat d'une partie.",
      "Elle n'a même aucune raison d'appartenir aux valeurs possibles : si $X$ vaut $0$ ou $10$, une espérance de $2{,}5$ ne sera jamais obtenue.",
      "Ce qu'elle prédit, c'est que la moyenne des gains sur $1000$ parties sera proche de $2{,}5$ € — c'est la loi des grands nombres.",
      "Sur une partie, il gagnera l'une des valeurs possibles ; $2{,}50$ € est ce qu'il gagnerait EN MOYENNE, en jouant très longtemps."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "esperance_probleme", "piege", "open"],
  },
  {
    kind: "template",
    id: "premiere_va_espp_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_esperance_probleme",
    difficulty: 5,
    theme: "neutral",
    hint: "Calcule l'espérance du gain brut, puis retranche la mise.",
    tags: ["premiere", "maths", "variables_aleatoires", "esperance_probleme", "template"],
    generate: () => {
      const n = pickOne([10, 20, 25, 50]);
      const lot = pickOne([20, 50, 100]);
      const mise = pickOne([1, 2, 3, 5]);
      const brut = lot / n;
      const net = Math.round((brut - mise) * 100) / 100;
      const correct = `$${String(net).replace(".", ",")}$ €`;
      return {
        text: `Un ticket coûte $${mise}$ €. Un ticket sur $${n}$ gagne $${lot}$ €. Quelle est l'espérance du gain NET par ticket ?`,
        format: "qcm",
        choices: [
          correct,
          `$${String(Math.round(brut * 100) / 100).replace(".", ",")}$ €`,
          `$${String(Math.round((brut + mise) * 100) / 100).replace(".", ",")}$ €`,
          `$${lot}$ €`,
        ],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "L'espérance du gain net est la moyenne des gains nets, pondérée par leurs probabilités.",
          `Gain brut moyen : $${lot} \\times \\dfrac{1}{${n}} = ${String(Math.round(brut * 100) / 100).replace(".", ",")}$ €.`,
          `On retranche la mise, payée dans tous les cas : $${String(Math.round(brut * 100) / 100).replace(".", ",")} - ${mise} = ${String(net).replace(".", ",")}$ €.`,
          `${correct} — ${net < 0 ? "le jeu est défavorable au joueur" : net === 0 ? "le jeu est équitable" : "le jeu est favorable au joueur"}.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_va_espp_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_esperance_probleme",
    difficulty: 5,
    theme: "neutral",
    hint: "Le prix équitable est l'espérance du gain brut.",
    tags: ["premiere", "maths", "variables_aleatoires", "esperance_probleme", "open", "template"],
    generate: () => {
      const n = pickOne([10, 20, 25, 40, 50]);
      const lot = pickOne([20, 30, 50, 80, 100]);
      const juste = Math.round((lot / n) * 100) / 100;
      return {
        text: `Une tombola met en jeu un lot de $${lot}$ € pour $${n}$ tickets vendus. À quel prix le ticket rendrait-il le jeu équitable ? Justifie.`,
        format: "open",
        expected: [String(juste).replace(".", ","), "esperance", "espérance", "nulle", "gain brut"],
        comparator: "contains_keyword",
        explanation: exp(
          "Un jeu est équitable quand l'espérance du gain NET est nulle : la mise doit donc valoir exactement l'espérance du gain brut.",
          `Le gain brut vaut $${lot}$ € avec la probabilité $\\dfrac{1}{${n}}$, et $0$ sinon.`,
          `Son espérance est $${lot} \\times \\dfrac{1}{${n}} = ${String(juste).replace(".", ",")}$ €.`,
          `Le prix équitable est $${String(juste).replace(".", ",")}$ € — au-delà, l'organisateur gagne en moyenne.`
        ),
      };
    },
  },

  /* ===================== VA_ECART_TYPE (compléments) ===================== */
  {
    kind: "fixed",
    id: "premiere_va_et_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_ecart_type",
    difficulty: 4,
    theme: "neutral",
    text: "Pourquoi préfère-t-on souvent l'écart-type à la variance pour interpréter une situation ?",
    format: "qcm",
    choices: [
      "parce qu'il s'exprime dans la même unité que $X$",
      "parce qu'il est toujours plus petit",
      "parce qu'il est plus facile à calculer",
      "parce qu'il ne peut pas être nul",
    ],
    expected: ["parce qu'il s'exprime dans la même unité que $X$"],
    comparator: "mcq_exact",
    hint: "Si $X$ est en euros, en quoi est la variance ?",
    explanation: exp(
      "La variance est une moyenne de CARRÉS d'écarts : son unité est le carré de celle de $X$.",
      "Si $X$ est un gain en euros, la variance s'exprime en « euros au carré », ce qui ne veut rien dire concrètement.",
      "L'écart-type, sa racine carrée, revient dans l'unité de départ : on peut alors dire « les gains s'écartent en moyenne de $3$ € de l'espérance ».",
      "Même unité que $X$ : c'est ce qui le rend interprétable."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "ecart_type", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_va_et_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_ecart_type",
    difficulty: 5,
    theme: "neutral",
    text: "Deux jeux ont la même espérance de gain, mais des écarts-types de $1$ € et $40$ €. Que peut-on dire ?",
    format: "qcm",
    choices: [
      "le second est beaucoup plus risqué : les gains sont très dispersés",
      "le second rapporte plus en moyenne",
      "le premier est plus intéressant à coup sûr",
      "les deux jeux sont identiques",
    ],
    expected: ["le second est beaucoup plus risqué : les gains sont très dispersés"],
    comparator: "mcq_exact",
    hint: "L'écart-type mesure la dispersion, pas le niveau moyen.",
    explanation: exp(
      "L'espérance dit où se situe le centre ; l'écart-type dit à quel point les valeurs s'en écartent.",
      "Ici les deux jeux ont le même gain moyen : sur un très grand nombre de parties, ils rapportent pareil.",
      "Mais le second disperse beaucoup plus : de grosses pertes et de gros gains s'y compensent, alors que le premier donne des résultats presque toujours proches de la moyenne.",
      "Même espérance, risque très différent — c'est précisément ce que l'espérance seule ne dit pas."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "ecart_type", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_va_et_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_ecart_type",
    difficulty: 5,
    theme: "neutral",
    text: "Que signifie concrètement un écart-type de $0$ ?",
    format: "open",
    expected: ["constante", "toujours la meme", "toujours la même", "aucune dispersion", "une seule valeur"],
    comparator: "contains_keyword",
    hint: "Une somme de carrés est nulle seulement si…",
    explanation: exp(
      "L'écart-type est la racine carrée de la variance, elle-même moyenne des carrés des écarts à l'espérance.",
      "Un écart-type nul impose une variance nulle, donc une moyenne de carrés nulle.",
      "Or une moyenne de nombres positifs n'est nulle que si tous sont nuls : chaque valeur prise par $X$ est égale à son espérance.",
      "$X$ est alors CONSTANTE : il n'y a plus de hasard sur sa valeur, elle vaut toujours $E(X)$."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "ecart_type", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_va_et_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_ecart_type",
    difficulty: 5,
    theme: "neutral",
    text: "Pourquoi la variance élève-t-elle les écarts au carré, plutôt que de les additionner tels quels ?",
    format: "open",
    expected: ["compensent", "annulent", "signe", "toujours positif", "nulle"],
    comparator: "contains_keyword",
    hint: "Que vaudrait la moyenne des écarts $X - E(X)$, sans les carrés ?",
    explanation: exp(
      "On cherche à mesurer à quel point les valeurs s'écartent de l'espérance, sans distinguer le dessus du dessous.",
      "Sans les carrés, les écarts positifs et négatifs se compensent exactement : leur moyenne vaut toujours $0$, quelle que soit la dispersion.",
      "Le carré supprime le signe et rend tous les écarts positifs ; il donne en plus davantage de poids aux grands écarts, ce qui correspond bien à l'idée de risque.",
      "Sans les carrés, l'indicateur vaudrait $0$ pour toutes les variables : il ne mesurerait rien."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "ecart_type", "open"],
  },
  {
    kind: "template",
    id: "premiere_va_et_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_ecart_type",
    difficulty: 5,
    theme: "neutral",
    hint: "Compare les écarts-types, pas les espérances.",
    tags: ["premiere", "maths", "variables_aleatoires", "ecart_type", "open", "template"],
    generate: () => {
      const s1 = pickOne([1, 2, 3]);
      const s2 = pickOne([15, 20, 30, 40]);
      const e = pickOne([0, 1, 2, 5]);
      return {
        text: `Deux placements ont la même espérance de gain, $${e}$ €, mais des écarts-types de $${s1}$ € et $${s2}$ €. Lequel choisirais-tu, et pourquoi ? Explique ce que change l'écart-type.`,
        format: "open",
        expected: ["dispersion", "risque", "ecart", "écart", "moyenne", "regulier", "régulier"],
        comparator: "contains_keyword",
        explanation: exp(
          "L'espérance situe le centre, l'écart-type mesure la dispersion autour de ce centre : deux indicateurs qui répondent à deux questions différentes.",
          `Ici les deux placements rapportent en moyenne la même chose, $${e}$ €.`,
          `Le premier, d'écart-type $${s1}$ €, donne des résultats presque toujours proches de la moyenne. Le second, d'écart-type $${s2}$ €, alterne gros gains et grosses pertes.`,
          "Il n'y a pas de bonne réponse unique : le premier est régulier, le second risqué. Ce qui compte est de dire que l'écart-type mesure le RISQUE, pas le rendement."
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_va_et_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_ecart_type",
    difficulty: 4,
    theme: "neutral",
    hint: "L'écart-type est la racine carrée de la variance.",
    tags: ["premiere", "maths", "variables_aleatoires", "ecart_type", "template"],
    generate: () => {
      const s = randomInt(2, 12);
      const v = s * s;
      const correct = `$${s}$`;
      return {
        text: `Une variable aléatoire $X$, exprimée en euros, vérifie $V(X) = ${v}$. Quel est son écart-type, et dans quelle unité ?`,
        format: "qcm",
        choices: [`$${s}$ €`, `$${v}$ €`, `$${s}$ €$^2$`, `$${2 * s}$ €`],
        expected: [`$${s}$ €`],
        comparator: "mcq_exact",
        explanation: exp(
          "L'écart-type est la racine carrée de la variance, et il s'exprime dans la même unité que $X$.",
          `Ici $\\sigma(X) = \\sqrt{${v}}$.`,
          `$= ${s}$. La variance, elle, s'exprimait en euros au carré — une unité sans signification concrète.`,
          `L'écart-type vaut ${correct} € : les gains s'écartent en moyenne de $${s}$ € de l'espérance.`
        ),
      };
    },
  },

  /* ===================== VA_SIMULATION ===================== */
  {
    kind: "fixed",
    id: "premiere_va_sim_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_simulation",
    difficulty: 3,
    theme: "neutral",
    text: "En Python, quelle instruction simule le lancer d'un dé équilibré à six faces ?",
    format: "qcm",
    choices: [
      "randint(1, 6)",
      "random()",
      "randint(0, 6)",
      "randint(1, 7)",
    ],
    expected: ["randint(1, 6)"],
    comparator: "mcq_exact",
    hint: "Attention aux bornes : quelles valeurs veut-on obtenir ?",
    explanation: exp(
      "Simuler une expérience aléatoire, c'est produire des issues avec les bonnes probabilités.",
      "Un dé donne un entier entre $1$ et $6$, chacun avec la probabilité $\\dfrac{1}{6}$ : c'est exactement ce que fait `randint(1, 6)`, dont les deux bornes sont incluses.",
      "`random()` renvoie un décimal entre $0$ et $1$ : utile pour simuler un événement de probabilité donnée, pas un dé. `randint(0, 6)` ajouterait un $0$ impossible.",
      "`randint(1, 6)` — vérifier les bornes est le premier réflexe de relecture d'une simulation."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "simulation", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_va_sim_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_simulation",
    difficulty: 4,
    theme: "neutral",
    text: "Comment simuler un événement de probabilité $0{,}3$ avec `random()`, qui renvoie un décimal entre $0$ et $1$ ?",
    format: "qcm",
    choices: [
      "tester si `random() < 0.3`",
      "tester si `random() == 0.3`",
      "tester si `random() > 0.3`",
      "multiplier `random()` par $0{,}3$",
    ],
    expected: ["tester si `random() < 0.3`"],
    comparator: "mcq_exact",
    hint: "Quelle proportion des nombres entre $0$ et $1$ est inférieure à $0{,}3$ ?",
    explanation: exp(
      "`random()` tire un décimal uniformément entre $0$ et $1$ : la probabilité de tomber dans un intervalle est la longueur de cet intervalle.",
      "L'intervalle $[0 ; 0{,}3[$ a pour longueur $0{,}3$.",
      "Le test `random() < 0.3` est donc vrai avec la probabilité $0{,}3$. Tester l'égalité serait absurde : elle a une probabilité nulle avec des décimaux.",
      "`random() < 0.3` — et `random() < p` pour n'importe quelle probabilité $p$."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "simulation", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_va_sim_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_simulation",
    difficulty: 5,
    theme: "neutral",
    text: "On simule $10\\,000$ parties et on obtient un gain moyen de $-0{,}52$ €. L'espérance calculée vaut $-0{,}5$ €. Que conclure ?",
    format: "qcm",
    choices: [
      "la simulation confirme le calcul : la moyenne s'approche de l'espérance quand $n$ grandit",
      "le calcul de l'espérance est faux",
      "la simulation est mal programmée",
      "l'espérance vaut en réalité $-0{,}52$ €",
    ],
    expected: ["la simulation confirme le calcul : la moyenne s'approche de l'espérance quand $n$ grandit"],
    comparator: "mcq_exact",
    hint: "Une simulation donne-t-elle exactement l'espérance ?",
    explanation: exp(
      "Une simulation produit une moyenne OBSERVÉE sur un échantillon : elle fluctue, elle ne tombe jamais exactement sur la valeur théorique.",
      "Ce qu'on attend, c'est que cette moyenne se rapproche de l'espérance quand le nombre de parties augmente.",
      "Un écart de $0{,}02$ sur $10\\,000$ parties est tout à fait normal ; ce serait un écart de $0{,}5$ qui devrait alerter.",
      "La simulation confirme le calcul — c'est une illustration de la loi des grands nombres, pas une preuve."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "simulation", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_va_sim_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_simulation",
    difficulty: 5,
    theme: "neutral",
    text: "Décris l'algorithme qui estime l'espérance d'un gain en simulant un grand nombre de parties.",
    format: "open",
    expected: ["boucle", "somme", "compteur", "divise", "moyenne", "n parties"],
    comparator: "contains_keyword",
    hint: "Une boucle, un accumulateur, et une division à la fin.",
    explanation: exp(
      "Estimer une espérance par simulation, c'est calculer la moyenne des gains obtenus sur un grand nombre de parties.",
      "On initialise une somme à $0$, puis on répète $n$ fois : simuler une partie, calculer le gain, l'ajouter à la somme.",
      "À la sortie de la boucle, on divise la somme par $n$ : c'est la moyenne observée, qui estime l'espérance.",
      "Boucle bornée + accumulateur + division finale — et plus $n$ est grand, plus l'estimation est stable."
    ),
    canvas: {
      kind: "scratch",
      title: "Estimer une espérance par simulation",
      blocks: [
        { type: "set_variable", variable: "somme", value: 0, text: "mettre somme à 0" },
        {
          type: "repeat",
          times: 10000,
          text: "répéter n fois",
          children: [
            { type: "set_variable", variable: "gain", text: "gain ← résultat d'une partie simulée" },
            { type: "change_variable", variable: "somme", text: "ajouter gain à somme" },
          ],
        },
        { type: "say", text: "afficher somme / n" },
      ],
    },
    tags: ["premiere", "maths", "variables_aleatoires", "simulation", "canvas", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_va_sim_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_simulation",
    difficulty: 5,
    theme: "neutral",
    text: "Deux élèves lancent la même simulation de $1000$ parties et n'obtiennent pas la même moyenne. L'un des deux s'est-il forcément trompé ?",
    format: "open",
    expected: ["fluctuation", "hasard", "aleatoire", "aléatoire", "proche", "non"],
    comparator: "contains_keyword",
    hint: "Deux séries de $1000$ tirages au hasard donnent-elles les mêmes résultats ?",
    explanation: exp(
      "Une simulation repose sur des tirages au hasard : deux exécutions ne produisent pas la même suite d'issues.",
      "Les deux moyennes obtenues sont donc des estimations différentes de la même espérance : c'est la fluctuation d'échantillonnage.",
      "Ce qui doit se vérifier, c'est qu'elles sont PROCHES l'une de l'autre et de la valeur théorique — et que l'écart diminue si on passe à $100\\,000$ parties.",
      "Non : obtenir deux résultats différents est normal. Ce serait obtenir exactement le même qui devrait étonner."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "simulation", "open"],
  },
  {
    kind: "template",
    id: "premiere_va_sim_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_simulation",
    difficulty: 4,
    theme: "neutral",
    hint: "Vérifie les bornes : sont-elles incluses ? Correspondent-elles aux valeurs possibles ?",
    tags: ["premiere", "maths", "variables_aleatoires", "simulation", "template"],
    generate: () => {
      const cas = [
        { but: "le lancer d'un dé à six faces", bonne: "randint(1, 6)" },
        { but: "le lancer d'une pièce (0 pour pile, 1 pour face)", bonne: "randint(0, 1)" },
        { but: "le tirage d'une carte parmi 52", bonne: "randint(1, 52)" },
        { but: "un événement de probabilité 0,25", bonne: "random() < 0.25" },
        { but: "le tirage d'un jeton parmi 10", bonne: "randint(1, 10)" },
      ];
      const c = pickOne(cas);
      const toutes = ["randint(1, 6)", "randint(0, 1)", "randint(1, 52)", "random() < 0.25", "randint(1, 10)"];
      return {
        text: `Quelle instruction Python simule ${c.but} ?`,
        format: "qcm",
        choices: [c.bonne, ...toutes.filter((t) => t !== c.bonne).slice(0, 3)],
        expected: [c.bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "`randint(a, b)` tire un entier entre $a$ et $b$, bornes INCLUSES ; `random()` tire un décimal entre $0$ et $1$.",
          `On cherche à simuler ${c.but} : on liste d'abord les valeurs possibles.`,
          "On choisit ensuite l'instruction dont l'ensemble des résultats coïncide exactement avec ces valeurs.",
          `L'instruction correcte est \`${c.bonne}\`.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_va_sim_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_simulation",
    difficulty: 5,
    theme: "neutral",
    hint: "Décris la boucle, ce qu'on accumule, et ce qu'on affiche à la fin.",
    tags: ["premiere", "maths", "variables_aleatoires", "simulation", "open", "template"],
    generate: () => {
      const cas = [
        { but: "estimer la probabilité d'obtenir un $6$ avec un dé", accum: "un compteur de succès", fin: "compteur / n" },
        { but: "estimer l'espérance du gain d'une tombola", accum: "la somme des gains", fin: "somme / n" },
        { but: "estimer la probabilité d'obtenir deux PILE de suite", accum: "un compteur de succès", fin: "compteur / n" },
        { but: "estimer le nombre moyen de lancers avant d'obtenir un $6$", accum: "la somme des nombres de lancers", fin: "somme / n" },
      ];
      const c = pickOne(cas);
      const n = pickOne([1000, 10000, 100000]);
      return {
        text: `Décris un algorithme qui permet d'${c.but}, en simulant $${n}$ répétitions. Précise ce que tu initialises, ce que fait la boucle, et ce que tu affiches.`,
        format: "open",
        expected: ["boucle", "compteur", "somme", "divise", "moyenne", "frequence", "fréquence"],
        comparator: "contains_keyword",
        explanation: exp(
          "Toute estimation par simulation suit le même schéma : initialiser un accumulateur, répéter l'expérience, puis diviser.",
          `On initialise ${c.accum} à $0$.`,
          `Dans une boucle répétée $${n}$ fois, on simule l'expérience et on met à jour cet accumulateur.`,
          `À la fin, on affiche \`${c.fin}\` : c'est l'estimation cherchée, d'autant plus fiable que $${n}$ est grand.`
        ),
      };
    },
  },

  /* ===================== VA_ECHANTILLON ===================== */
  {
    kind: "fixed",
    id: "premiere_va_ech_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_echantillon",
    difficulty: 4,
    theme: "neutral",
    text: "Que dit la loi des grands nombres à propos de la moyenne d'un échantillon ?",
    format: "qcm",
    choices: [
      "elle se rapproche de l'espérance quand la taille de l'échantillon augmente",
      "elle est toujours égale à l'espérance",
      "elle s'éloigne de l'espérance quand la taille augmente",
      "elle ne dépend pas de la taille de l'échantillon",
    ],
    expected: ["elle se rapproche de l'espérance quand la taille de l'échantillon augmente"],
    comparator: "mcq_exact",
    hint: "Que se passe-t-il si on lance un dé $10$ fois, puis $10\\,000$ fois ?",
    explanation: exp(
      "Un échantillon de taille $n$ est une suite de $n$ répétitions indépendantes de la même expérience ; sa moyenne est une valeur observée, qui fluctue.",
      "La loi des grands nombres dit que cette moyenne observée se rapproche de l'espérance quand $n$ grandit.",
      "Sur $10$ lancers de dé, la moyenne peut valoir $2{,}8$ ou $4{,}5$ ; sur $10\\,000$, elle sera très proche de $3{,}5$.",
      "Elle se rapproche de l'espérance : c'est ce qui fait le lien entre le calcul théorique et l'observation."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "echantillon", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_va_ech_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_echantillon",
    difficulty: 5,
    theme: "neutral",
    text: "La moyenne observée sur $50$ lancers de dé vaut $3{,}9$, alors que l'espérance vaut $3{,}5$. Le dé est-il truqué ?",
    format: "qcm",
    choices: [
      "on ne peut pas le conclure : sur $50$ lancers, un tel écart est courant",
      "oui, la moyenne devrait être exactement $3{,}5$",
      "oui, l'écart dépasse $0{,}1$",
      "non, c'est impossible avec un dé truqué",
    ],
    expected: ["on ne peut pas le conclure : sur $50$ lancers, un tel écart est courant"],
    comparator: "mcq_exact",
    hint: "L'espérance est une limite de comportement, pas une valeur à atteindre.",
    explanation: exp(
      "La moyenne d'un échantillon fluctue autour de l'espérance : elle n'a aucune raison de tomber exactement dessus.",
      "L'ampleur de cette fluctuation dépend de la taille de l'échantillon : elle est grande pour $n$ petit, faible pour $n$ grand.",
      "Sur $50$ lancers, un écart de $0{,}4$ est banal. C'est en répétant sur des milliers de lancers, et en voyant l'écart PERSISTER, qu'on commencerait à soupçonner un truquage.",
      "On ne peut rien conclure : un échantillon de $50$ est trop petit pour trancher."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "echantillon", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_va_ech_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_echantillon",
    difficulty: 5,
    theme: "neutral",
    text: "Quelle est la différence entre l'espérance d'une variable aléatoire et la moyenne d'un échantillon ?",
    format: "open",
    expected: ["theorique", "théorique", "observee", "observée", "calcul", "fluctue", "echantillon"],
    comparator: "contains_keyword",
    hint: "L'une se calcule avant l'expérience, l'autre se mesure après.",
    explanation: exp(
      "Ce sont deux nombres de nature différente, qu'on a tendance à confondre parce qu'ils sont proches.",
      "L'espérance est THÉORIQUE : elle se calcule à partir de la loi de probabilité, avant même de faire l'expérience. Elle est fixe.",
      "La moyenne d'un échantillon est OBSERVÉE : elle se calcule après coup, à partir de résultats réels. Elle change d'un échantillon à l'autre.",
      "L'une se calcule, l'autre se mesure — et la loi des grands nombres dit que la seconde s'approche de la première quand $n$ grandit."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "echantillon", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_va_ech_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_echantillon",
    difficulty: 5,
    theme: "neutral",
    text: "Pourquoi un sondage sur $1000$ personnes est-il plus fiable qu'un sondage sur $50$ personnes ?",
    format: "open",
    expected: ["fluctuation", "grands nombres", "plus proche", "taille", "dispersion", "diminue"],
    comparator: "contains_keyword",
    hint: "Comment la fluctuation de la moyenne évolue-t-elle avec la taille de l'échantillon ?",
    explanation: exp(
      "Un sondage estime une proportion théorique à partir d'un échantillon : le résultat obtenu est une moyenne observée, qui fluctue.",
      "Cette fluctuation dépend de la taille de l'échantillon : plus il est grand, plus les résultats de deux sondages différents se ressemblent.",
      "C'est la loi des grands nombres : la moyenne observée se resserre autour de la valeur théorique quand $n$ augmente. Sur $50$ personnes, deux sondages peuvent donner $40\\,\\%$ et $55\\,\\%$ ; sur $1000$, ils donneront des valeurs bien plus proches.",
      "La taille de l'échantillon réduit la fluctuation — à condition que l'échantillon soit tiré au hasard, sans quoi aucune taille ne rattrape le biais."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "echantillon", "open"],
  },
  {
    kind: "template",
    id: "premiere_va_ech_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_echantillon",
    difficulty: 4,
    theme: "neutral",
    hint: "Sur un grand échantillon, la moyenne observée est proche de l'espérance.",
    tags: ["premiere", "maths", "variables_aleatoires", "echantillon", "template"],
    generate: () => {
      const cas = [
        { exp: "d'un dé équilibré", esp: "3,5", n: 10000 },
        { exp: "du nombre de PILE sur deux lancers de pièce", esp: "1", n: 5000 },
        { exp: "d'un gain net d'espérance $-0,5$ €", esp: "-0,5", n: 20000 },
        { exp: "d'un dé à quatre faces équilibré", esp: "2,5", n: 8000 },
      ];
      const c = pickOne(cas);
      return {
        text: `On répète $${c.n}$ fois l'expérience ${c.exp} et on calcule la moyenne des résultats. De quelle valeur cette moyenne sera-t-elle proche ?`,
        format: "qcm",
        choices: [`$${c.esp}$`, `$${c.n}$`, "$0$", "on ne peut pas le prévoir"],
        expected: [`$${c.esp}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "La loi des grands nombres relie l'observé au théorique : la moyenne d'un échantillon se rapproche de l'espérance quand la taille augmente.",
          `Ici l'espérance théorique vaut $${c.esp}$.`,
          `Avec $${c.n}$ répétitions, l'échantillon est grand : la moyenne observée en sera très proche, sans jamais tomber exactement dessus.`,
          `La moyenne sera proche de $${c.esp}$.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_va_ech_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_echantillon",
    difficulty: 5,
    theme: "neutral",
    hint: "Regarde la taille de l'échantillon avant de conclure.",
    tags: ["premiere", "maths", "variables_aleatoires", "echantillon", "open", "template"],
    generate: () => {
      const cas = [
        { n: 20, ecart: "0,6", conclusion: false },
        { n: 100, ecart: "0,4", conclusion: false },
        { n: 100000, ecart: "0,5", conclusion: true },
        { n: 50, ecart: "0,3", conclusion: false },
        { n: 200000, ecart: "0,8", conclusion: true },
      ];
      const c = pickOne(cas);
      return {
        text: `Sur $${c.n}$ lancers d'un dé, la moyenne observée s'écarte de $${c.ecart}$ de l'espérance théorique $3{,}5$. Peut-on soupçonner un dé truqué ? Justifie.`,
        format: "open",
        expected: ["taille", "fluctuation", "grand", "petit", "echantillon", "échantillon"],
        comparator: "contains_keyword",
        explanation: exp(
          "Un écart entre moyenne observée et espérance ne prouve rien à lui seul : tout dépend de la taille de l'échantillon.",
          `Ici l'échantillon compte $${c.n}$ lancers.`,
          c.conclusion
            ? "Sur un échantillon aussi grand, la loi des grands nombres impose une moyenne très proche de l'espérance : un tel écart est anormal et mérite d'être examiné."
            : "Sur un échantillon aussi petit, la fluctuation est importante : un tel écart survient couramment avec un dé parfaitement équilibré.",
          c.conclusion
            ? "Oui, l'écart est suspect à cette taille d'échantillon."
            : "Non, on ne peut rien conclure : il faudrait beaucoup plus de lancers."
        ),
      };
    },
  },

  /* =========================================================
     QUESTIONS OUVERTES — compléments du 02/08/2026.
     Quatre micro-compétences écrites avant le découpage n'avaient aucune
     question ouverte : deux ouvertes fixes + un TEMPLATE ouvert chacune.
  ========================================================= */

  {
    kind: "fixed",
    id: "premiere_va_not_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_notation",
    difficulty: 5,
    theme: "neutral",
    text: "Que désigne exactement l'écriture $\\{X = 3\\}$ ? Pourquoi parle-t-on d'un ÉVÉNEMENT et non d'un nombre ?",
    format: "open",
    expected: ["evenement", "événement", "issues", "ensemble", "univers", "3"],
    comparator: "contains_keyword",
    hint: "Quelles issues de l'expérience regroupe cette écriture ?",
    explanation: exp(
      "$X$ est une fonction qui associe un nombre à chaque issue : l'écriture $\\{X = 3\\}$ ne désigne pas le nombre $3$, mais les issues dont l'image vaut $3$.",
      "C'est donc un ENSEMBLE d'issues, c'est-à-dire un événement — sur lequel on peut calculer une probabilité.",
      "Avec deux dés et $X$ la somme, $\\{X = 3\\}$ regroupe les issues $(1 ; 2)$ et $(2 ; 1)$ : deux issues, une seule valeur. C'est ce qui permet d'écrire $P(X = 3) = \\dfrac{2}{36}$.",
      "Les accolades sont le signe qu'on parle d'un ensemble : $\\{X = 3\\}$ est un événement, $P(X = 3)$ est le nombre qui le mesure."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "notation", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_va_not_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_notation",
    difficulty: 5,
    theme: "neutral",
    text: "Quelle est la différence entre $P(X \\leqslant 2)$ et $P(X < 2)$ ? Dans quel cas sont-elles égales ?",
    format: "open",
    expected: ["inclut", "exclut", "P(X = 2)", "valeur 2", "prend pas", "egales"],
    comparator: "contains_keyword",
    hint: "L'une des deux compte la valeur $2$ elle-même.",
    explanation: exp(
      "Les deux écritures regroupent les issues dont l'image est en dessous de $2$, mais elles ne traitent pas $2$ de la même façon.",
      "$P(X \\leqslant 2)$ INCLUT la valeur $2$ ; $P(X < 2)$ l'exclut. Elles diffèrent donc exactement de $P(X = 2)$.",
      "Elles sont égales dans un seul cas : quand $P(X = 2) = 0$, c'est-à-dire quand $X$ ne prend jamais la valeur $2$ — par exemple si $X$ ne prend que les valeurs $1$, $3$ et $5$.",
      "Un symbole d'inégalité mal recopié coûte un terme entier : c'est l'erreur la plus fréquente sur les lois de probabilité."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "notation", "piege", "open"],
  },
  {
    kind: "template",
    id: "premiere_va_not_tpl_open",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_notation",
    difficulty: 5,
    theme: "neutral",
    hint: "Liste d'abord les valeurs concernées par l'inégalité, puis additionne leurs probabilités.",
    tags: ["premiere", "maths", "variables_aleatoires", "notation", "open", "template"],
    generate: () => {
      const p1 = pickOne([0.1, 0.2, 0.3]);
      const p2 = pickOne([0.2, 0.4, 0.5]);
      const p3 = Math.round((1 - p1 - p2) * 100) / 100;
      const cas = pickOne([
        { q: "P(X \\leqslant 2)", vals: "1 et 2", r: Math.round((p1 + p2) * 100) / 100 },
        { q: "P(X < 2)", vals: "1 seulement", r: p1 },
        { q: "P(X \\geqslant 2)", vals: "2 et 3", r: Math.round((p2 + p3) * 100) / 100 },
        { q: "P(X > 1)", vals: "2 et 3", r: Math.round((p2 + p3) * 100) / 100 },
      ]);
      return {
        text: `$X$ prend les valeurs $1$, $2$ et $3$ avec $P(X=1) = ${fr(p1)}$, $P(X=2) = ${fr(p2)}$ et $P(X=3) = ${fr(p3)}$. Calcule $${cas.q}$ en disant d'abord quelles valeurs sont concernées.`,
        format: "open",
        expected: [fr(cas.r), cas.vals.split(" ")[0], "additionne", "valeurs", "inegalite", "inégalité"],
        comparator: "contains_keyword",
        explanation: exp(
          "Une écriture comme $\\{X \\leqslant a\\}$ regroupe plusieurs valeurs : on les liste d'abord, puis on additionne leurs probabilités.",
          `Ici l'inégalité concerne les valeurs ${cas.vals}.`,
          `On additionne les probabilités correspondantes : on obtient $${fr(cas.r)}$.`,
          "Le piège est le symbole : $\\leqslant$ inclut la borne, $<$ l'exclut — un terme entier d'écart."
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "premiere_va_loi_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_loi",
    difficulty: 5,
    theme: "neutral",
    text: "Que signifie « donner la loi de probabilité de $X$ » ? Que doit contenir une réponse complète ?",
    format: "open",
    expected: ["valeurs", "probabilites", "probabilités", "tableau", "toutes", "somme"],
    comparator: "contains_keyword",
    hint: "Deux listes, et une vérification.",
    explanation: exp(
      "Donner la loi d'une variable aléatoire, c'est décrire complètement son comportement au hasard.",
      "Une réponse complète contient deux choses : la liste de TOUTES les valeurs que $X$ peut prendre, et la probabilité de chacune.",
      "On les présente en général dans un tableau à deux lignes. Une valeur oubliée rend la loi fausse, même si les autres probabilités sont justes.",
      "Contrôle final indispensable : la somme des probabilités doit valoir exactement $1$ — sinon il manque une valeur, ou l'une des probabilités est erronée."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "loi", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_va_loi_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_loi",
    difficulty: 5,
    theme: "neutral",
    text: "Pourquoi la somme des probabilités d'une loi vaut-elle toujours $1$ ?",
    format: "open",
    expected: ["tous les cas", "partition", "univers", "certain", "toutes les valeurs"],
    comparator: "contains_keyword",
    hint: "Que se passe-t-il forcément quand on réalise l'expérience ?",
    explanation: exp(
      "Les événements $\\{X = x_1\\}$, $\\{X = x_2\\}$, … découpent l'univers : chaque issue reçoit une valeur, et une seule.",
      "Ils forment donc une partition : deux à deux incompatibles, et de réunion l'univers entier.",
      "Or l'univers est l'événement certain, de probabilité $1$. La somme des probabilités des morceaux vaut donc $1$.",
      "Dit autrement : quand on réalise l'expérience, $X$ prend forcément une de ses valeurs. C'est aussi le meilleur contrôle d'un tableau de loi — si la somme ne fait pas $1$, il y a une erreur."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "loi", "open"],
  },
  {
    kind: "template",
    id: "premiere_va_loi_tpl_open",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_loi",
    difficulty: 5,
    theme: "neutral",
    hint: "Liste les valeurs possibles, compte les issues favorables, vérifie que la somme fait $1$.",
    tags: ["premiere", "maths", "variables_aleatoires", "loi", "open", "template"],
    generate: () => {
      const cas = [
        { exp: "on lance deux pièces équilibrées et $X$ compte le nombre de PILE", vals: "0, 1 et 2", probas: "1/4, 1/2 et 1/4" },
        { exp: "on lance un dé équilibré et $X$ vaut $1$ si le résultat est pair, $0$ sinon", vals: "0 et 1", probas: "1/2 et 1/2" },
        { exp: "une urne contient 3 boules gagnantes sur 5 ; $X$ vaut $1$ si la boule tirée gagne, $0$ sinon", vals: "0 et 1", probas: "2/5 et 3/5" },
        { exp: "on lance un dé équilibré et $X$ vaut $10$ pour un $6$, $0$ sinon", vals: "0 et 10", probas: "5/6 et 1/6" },
      ];
      const c = pickOne(cas);
      return {
        text: `Détermine la loi de probabilité de $X$ dans la situation suivante : ${c.exp}. Présente ta réponse et explique comment tu la vérifies.`,
        format: "open",
        expected: ["valeurs", "somme", "1", "tableau", c.vals.split(",")[0]],
        comparator: "contains_keyword",
        explanation: exp(
          "Donner une loi, c'est lister toutes les valeurs prises par $X$ et la probabilité de chacune, puis vérifier que le total vaut $1$.",
          `Ici les valeurs possibles sont ${c.vals} : on repère pour chacune les issues qui la produisent.`,
          `Les probabilités correspondantes sont ${c.probas}.`,
          "On vérifie enfin que leur somme vaut $1$ : si ce n'est pas le cas, une valeur a été oubliée ou une probabilité mal comptée."
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "premiere_va_esp_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_esperance",
    difficulty: 5,
    theme: "neutral",
    text: "Pourquoi l'espérance est-elle une moyenne PONDÉRÉE, et non la simple moyenne des valeurs possibles ?",
    format: "open",
    expected: ["probabilites", "probabilités", "poids", "plus souvent", "frequence", "fréquence", "pondere"],
    comparator: "contains_keyword",
    hint: "Toutes les valeurs sortent-elles aussi souvent ?",
    explanation: exp(
      "L'espérance est ce que vaut $X$ en moyenne sur un très grand nombre de répétitions : elle doit donc tenir compte de la fréquence de chaque valeur.",
      "Les valeurs possibles n'apparaissent pas aussi souvent les unes que les autres : chacune est pondérée par sa probabilité.",
      "Exemple : si $X$ vaut $0$ avec la probabilité $0{,}9$ et $10$ avec la probabilité $0{,}1$, la moyenne simple donnerait $5$ — alors qu'on obtient $0$ neuf fois sur dix. L'espérance vaut $0 \\times 0{,}9 + 10 \\times 0{,}1 = 1$.",
      "Chaque valeur pèse à hauteur de sa probabilité : c'est pour cela qu'on multiplie avant d'additionner."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "esperance", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_va_esp_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_esperance",
    difficulty: 5,
    theme: "neutral",
    text: "L'espérance peut valoir un nombre que $X$ ne prend jamais. Explique pourquoi ce n'est pas contradictoire.",
    format: "open",
    expected: ["moyenne", "pas une valeur", "grand nombre", "repetitions", "répétitions", "3,5"],
    comparator: "contains_keyword",
    hint: "Quelle est l'espérance d'un dé équilibré ?",
    explanation: exp(
      "L'espérance n'est pas une valeur que la variable prend : c'est un indicateur calculé à partir de toutes ses valeurs.",
      "Un dé équilibré a pour espérance $3{,}5$ — un résultat impossible à obtenir avec un dé.",
      "Ce que $3{,}5$ signifie, c'est que la MOYENNE des résultats obtenus se rapproche de $3{,}5$ quand on lance le dé un très grand nombre de fois. C'est un comportement d'ensemble, pas une prédiction.",
      "L'espérance décrit la tendance sur beaucoup de répétitions, pas ce qui arrivera une fois — comme une taille moyenne de $1{,}72$ m dans une classe où personne ne mesure exactement cela."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "esperance", "piege", "open"],
  },
  {
    kind: "template",
    id: "premiere_va_esp_tpl_open",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_esperance",
    difficulty: 5,
    theme: "neutral",
    hint: "Chaque valeur multipliée par sa probabilité, puis on additionne.",
    tags: ["premiere", "maths", "variables_aleatoires", "esperance", "open", "template"],
    generate: () => {
      const x = pickOne([
        [0, 1, 2],
        [0, 5, 10],
        [-2, 0, 3],
        [1, 2, 5],
      ]);
      const p0 = pickOne([0.2, 0.3, 0.5]);
      const p1 = pickOne([0.2, 0.3, 0.4]);
      const p2 = Math.round((1 - p0 - p1) * 100) / 100;
      const e = Math.round((x[0] * p0 + x[1] * p1 + x[2] * p2) * 100) / 100;
      return {
        text: `$X$ prend les valeurs $${x[0]}$, $${x[1]}$ et $${x[2]}$ avec les probabilités $${fr(p0)}$, $${fr(p1)}$ et $${fr(p2)}$. Calcule $E(X)$, puis explique ce que ce nombre signifie concrètement.`,
        format: "open",
        expected: [fr(e), "moyenne", "grand nombre", "pondere", "pondéré", "probabilite"],
        comparator: "contains_keyword",
        explanation: exp(
          "L'espérance est la moyenne des valeurs, chacune pondérée par sa probabilité.",
          `On calcule $${x[0]} \\times ${fr(p0)} + ${x[1]} \\times ${fr(p1)} + ${x[2]} \\times ${fr(p2)}$.`,
          `$E(X) = ${fr(e)}$.`,
          `Concrètement : en répétant l'expérience un très grand nombre de fois, la moyenne des résultats obtenus se rapprochera de $${fr(e)}$ — même si $X$ ne prend jamais exactement cette valeur.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "premiere_va_var_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_variance",
    difficulty: 5,
    theme: "neutral",
    text: "Que mesure la variance, et pourquoi l'espérance seule ne suffit-elle pas à décrire une variable aléatoire ?",
    format: "open",
    expected: ["dispersion", "ecart", "écart", "regroupe", "regroupées", "risque", "meme esperance"],
    comparator: "contains_keyword",
    hint: "Deux jeux peuvent avoir le même gain moyen : sont-ils pour autant identiques ?",
    explanation: exp(
      "L'espérance indique où se situe le centre des valeurs ; elle ne dit rien de leur étalement.",
      "La variance mesure cet étalement : c'est la moyenne des CARRÉS des écarts à l'espérance.",
      "Deux jeux peuvent avoir la même espérance et se comporter très différemment : l'un donne toujours à peu près la même chose, l'autre alterne grosses pertes et gros gains. Seule la variance les distingue.",
      "L'espérance dit le niveau, la variance dit le risque : il faut les deux pour décrire une variable aléatoire."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "variance", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_va_var_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_variance",
    difficulty: 5,
    theme: "neutral",
    text: "Pourquoi la variance ne peut-elle jamais être négative ?",
    format: "open",
    expected: ["carres", "carrés", "positifs", "moyenne", "somme de carres", "jamais"],
    comparator: "contains_keyword",
    hint: "De quoi la variance est-elle la moyenne ?",
    explanation: exp(
      "La variance est la moyenne des carrés des écarts à l'espérance, pondérée par les probabilités.",
      "Or un carré est toujours positif ou nul, et les probabilités sont positives : chaque terme de la somme est positif ou nul.",
      "Une somme de termes positifs ne peut pas être négative. La variance est donc toujours positive ou nulle — et un résultat négatif signale une erreur de calcul, le plus souvent un signe perdu dans $E(X)$.",
      "Elle ne vaut $0$ que si tous les écarts sont nuls, c'est-à-dire si $X$ est constante."
    ),
    tags: ["premiere", "maths", "variables_aleatoires", "variance", "piege", "open"],
  },
  {
    kind: "template",
    id: "premiere_va_var_tpl_open",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variables_aleatoires",
    microId: "va_variance",
    difficulty: 5,
    theme: "neutral",
    hint: "Moyenne des carrés des écarts à l'espérance, pondérée par les probabilités.",
    tags: ["premiere", "maths", "variables_aleatoires", "variance", "open", "template"],
    generate: () => {
      const m = randomInt(1, 6);
      const v = m * m;
      return {
        text: `$X$ vaut $0$ ou $${2 * m}$, avec la probabilité $0{,}5$ chacune, et $E(X) = ${m}$. Calcule $V(X)$ en détaillant, puis explique ce que le résultat dit de la dispersion.`,
        format: "open",
        expected: [String(v), "ecart", "écart", "carre", "carré", "dispersion"],
        comparator: "contains_keyword",
        explanation: exp(
          "La variance est la moyenne des carrés des écarts à l'espérance, chaque écart étant pondéré par sa probabilité.",
          `Les deux écarts valent $0 - ${m} = -${m}$ et $${2 * m} - ${m} = ${m}$.`,
          `On élève au carré et on pondère : $0{,}5 \\times ${v} + 0{,}5 \\times ${v} = ${v}$.`,
          `$V(X) = ${v}$, donc $\\sigma(X) = ${m}$ : les valeurs s'écartent en moyenne de $${m}$ de l'espérance — ici, exactement, puisqu'il n'y a que deux valeurs symétriques.`
        ),
      };
    },
  },
];
