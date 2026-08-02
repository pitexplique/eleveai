// lib/tutor-v4/questionBank/terminale-spe/maths/variables-aleatoires.bank.ts
//
// Notion : Variables aléatoires (variable_aleatoire)
//
// microSkills couverts (~10 items chacun, difficultés étalées 1→5) :
//   va_definition          — Comprendre une variable aléatoire
//   va_loi_probabilite     — Déterminer la loi d'une variable aléatoire
//   va_esperance           — Calculer une espérance
//   va_variance_ecart_type — Calculer une variance et un écart-type
//   va_interpreter         — Interpréter espérance, variance, écart-type
//   va_defi                — Exercice type bac
//
// Loi de référence (réutilisée) : X ∈ {0,1,2}, P = 0,2 / 0,5 / 0,3.
//   E(X) = 1,1 ; E(X²) = 1,7 ; V(X) = 1,7 - 1,21 = 0,49 ; σ(X) = 0,7.
//
// Conventions :
// - Probabilités/espérances = décimaux → QCM (règle « écriture maths → QCM »).
//   Décimaux LaTeX : $1{,}1$. Quelques réponses entières restent en "short".
// - La loi est visualisée en tableau (canvas probabilites/tableau) ET en
//   diagramme en bâtons (canvas stat_graph/batons).

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

// Loi de X en tableau.
const loiTableauCanvas: CanvasFigure = {
  kind: "probabilites",
  variant: "tableau",
  tableau: {
    entetes: ["xᵢ", "0", "1", "2"],
    lignes: [["P(X = xᵢ)", "0,2", "0,5", "0,3"]],
  },
};

// Loi de X en diagramme en bâtons.
const loiBatonsCanvas: CanvasFigure = {
  kind: "stat_graph",
  graphType: "batons",
  title: "Loi de probabilité de X",
  data: [
    { label: "0", value: 0.2 },
    { label: "1", value: 0.5 },
    { label: "2", value: 0.3 },
  ],
  display: { showValues: true, showLabels: true },
};

export const variablesAleatoiresBank: TutorBankItemV4[] = [
  /* =========================================================
     VA_DEFINITION — Comprendre une variable aléatoire
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_va_definition_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_definition",
    difficulty: 1,
    theme: "neutral",
    text: "Qu'est-ce qu'une variable aléatoire $X$ ?",
    format: "qcm",
    choices: [
      "Une fonction qui associe un nombre réel à chaque issue d'une expérience",
      "Une probabilité",
      "Un nombre fixé à l'avance",
      "Une équation",
    ],
    expected: ["Une fonction qui associe un nombre réel à chaque issue d'une expérience"],
    comparator: "mcq_exact",
    hint: "Elle transforme chaque résultat possible en un nombre.",
    explanation: exp(
      "Une variable aléatoire relie les issues d'une expérience à des nombres.",
      "On retient la définition du cours.",
      "$X$ associe à chaque issue de l'univers un nombre réel.",
      "Une variable aléatoire est une fonction qui associe un réel à chaque issue."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_va_definition_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_definition",
    difficulty: 2,
    theme: "neutral",
    text: "Que désigne l'ensemble noté $X(\\Omega)$ ?",
    format: "qcm",
    choices: [
      "L'ensemble des valeurs prises par $X$",
      "L'ensemble des probabilités",
      "La moyenne de $X$",
      "L'univers de départ",
    ],
    expected: ["L'ensemble des valeurs prises par $X$"],
    comparator: "mcq_exact",
    hint: "Ce sont les nombres que $X$ peut valoir.",
    explanation: exp(
      "$X(\\Omega)$ est l'image de l'univers par la variable aléatoire.",
      "On liste les valeurs que peut prendre $X$.",
      "$X(\\Omega)$ regroupe toutes les valeurs possibles de $X$.",
      "$X(\\Omega)$ est l'ensemble des valeurs prises par $X$."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_va_definition_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_definition",
    difficulty: 2,
    theme: "neutral",
    text: "Que signifie la notation $P(X = 2)$ ?",
    format: "qcm",
    choices: [
      "La probabilité que $X$ prenne la valeur $2$",
      "La valeur $2$ de $X$",
      "La moyenne de $X$ vaut $2$",
      "$X$ est toujours égal à $2$",
    ],
    expected: ["La probabilité que $X$ prenne la valeur $2$"],
    comparator: "mcq_exact",
    hint: "$P(\\dots)$ désigne une probabilité.",
    explanation: exp(
      "$P(X = k)$ est la probabilité de l'événement « $X$ vaut $k$ ».",
      "On lit la notation.",
      "$P(X = 2)$ est la probabilité de l'événement $\\{X = 2\\}$.",
      "$P(X = 2)$ est la probabilité que $X$ prenne la valeur $2$."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_va_definition_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_definition",
    difficulty: 2,
    theme: "neutral",
    text: "On lance un dé équilibré et $X$ est le numéro obtenu. Quel est l'ensemble $X(\\Omega)$ ?",
    format: "qcm",
    choices: ["$\\{1\\,;2\\,;3\\,;4\\,;5\\,;6\\}$", "$\\{0\\,;1\\}$", "$\\{1\\,;2\\,;3\\}$", "$[1\\,;6]$"],
    expected: ["$\\{1\\,;2\\,;3\\,;4\\,;5\\,;6\\}$"],
    comparator: "mcq_exact",
    hint: "Quelles valeurs le dé peut-il donner ?",
    explanation: exp(
      "$X(\\Omega)$ liste les valeurs possibles de $X$.",
      "On énumère les résultats possibles du dé.",
      "Le dé donne un entier de $1$ à $6$.",
      "$X(\\Omega) = \\{1\\,;2\\,;3\\,;4\\,;5\\,;6\\}$."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_va_definition_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_definition",
    difficulty: 3,
    theme: "neutral",
    text: "Que vaut la somme de toutes les probabilités $P(X = x_i)$ d'une variable aléatoire ?",
    format: "qcm",
    choices: ["$1$", "$0$", "$0{,}5$", "Cela dépend de $X$"],
    expected: ["$1$"],
    comparator: "mcq_exact",
    hint: "Les valeurs de $X$ couvrent tous les cas possibles.",
    explanation: exp(
      "Les événements $\\{X = x_i\\}$ forment une partition de l'univers.",
      "On somme les probabilités de tous les cas possibles.",
      "Cette somme couvre tout l'univers, elle vaut donc $1$.",
      "La somme des $P(X = x_i)$ vaut $1$."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_va_definition_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_definition",
    difficulty: 3,
    theme: "neutral",
    text: "Une variable aléatoire qui prend un nombre fini de valeurs est dite :",
    format: "qcm",
    choices: ["discrète", "continue", "constante", "négative"],
    expected: ["discrète"],
    comparator: "mcq_exact",
    hint: "Par opposition à « continue ».",
    explanation: exp(
      "On classe les variables aléatoires selon leurs valeurs possibles.",
      "Un nombre fini (ou dénombrable) de valeurs caractérise le cas discret.",
      "Une telle variable est dite discrète.",
      "Elle est dite discrète."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_va_definition_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_definition",
    difficulty: 3,
    theme: "neutral",
    text: "Pour une variable aléatoire $X$, que représente l'événement $\\{X \\le 1\\}$ ?",
    format: "qcm",
    choices: [
      "$X = 0$ ou $X = 1$ (si $X$ prend les valeurs $0, 1, 2$)",
      "$X = 1$ uniquement",
      "$X = 2$",
      "$X > 1$",
    ],
    expected: ["$X = 0$ ou $X = 1$ (si $X$ prend les valeurs $0, 1, 2$)"],
    comparator: "mcq_exact",
    hint: "« Inférieur ou égal à 1 » regroupe plusieurs valeurs.",
    explanation: exp(
      "Un événement peut regrouper plusieurs valeurs de $X$.",
      "On liste les valeurs de $X$ qui vérifient $X \\le 1$.",
      "Si $X \\in \\{0, 1, 2\\}$, alors $\\{X \\le 1\\}$ correspond à $X = 0$ ou $X = 1$.",
      "$\\{X \\le 1\\}$ signifie $X = 0$ ou $X = 1$."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_va_definition_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_definition",
    difficulty: 2,
    theme: "neutral",
    text: "Une probabilité $P(X = x_i)$ est toujours comprise entre :",
    format: "qcm",
    choices: ["$0$ et $1$", "$-1$ et $1$", "$0$ et $100$", "$1$ et $10$"],
    expected: ["$0$ et $1$"],
    comparator: "mcq_exact",
    hint: "Toute probabilité est dans un intervalle fixe.",
    explanation: exp(
      "Une probabilité est toujours comprise entre $0$ et $1$.",
      "On applique cette règle aux $P(X = x_i)$.",
      "$0 \\le P(X = x_i) \\le 1$.",
      "Elle est comprise entre $0$ et $1$."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_va_definition_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_definition",
    difficulty: 4,
    theme: "neutral",
    text: "Dans un jeu, on gagne 2 € ou on perd 1 €. Si $X$ est le gain algébrique, quelles valeurs $X$ peut-elle prendre ?",
    format: "qcm",
    choices: ["$-1$ et $2$", "$1$ et $2$", "$0$ et $2$", "$-2$ et $1$"],
    expected: ["$-1$ et $2$"],
    comparator: "mcq_exact",
    hint: "Une perte se note avec un signe négatif.",
    explanation: exp(
      "Le gain algébrique compte positivement les gains et négativement les pertes.",
      "On traduit « perdre 1 € » par $-1$ et « gagner 2 € » par $+2$.",
      "Les valeurs possibles sont donc $-1$ et $2$.",
      "$X$ prend les valeurs $-1$ et $2$."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_va_definition_fixed_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_definition",
    difficulty: 4,
    theme: "neutral",
    text: "« Donner la loi de probabilité de $X$ », cela signifie :",
    format: "qcm",
    choices: [
      "donner les valeurs de $X$ et leurs probabilités",
      "calculer la moyenne de $X$",
      "tracer la courbe de $X$",
      "résoudre une équation",
    ],
    expected: ["donner les valeurs de $X$ et leurs probabilités"],
    comparator: "mcq_exact",
    hint: "La loi décrit complètement le comportement de $X$.",
    explanation: exp(
      "La loi de probabilité décrit toutes les valeurs et leurs chances.",
      "On associe à chaque valeur $x_i$ sa probabilité $P(X = x_i)$.",
      "C'est l'ensemble des couples (valeur ; probabilité).",
      "Donner la loi, c'est donner les valeurs de $X$ et leurs probabilités."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "definition", "qcm"],
  },

  /* =========================================================
     VA_LOI_PROBABILITE — Déterminer la loi
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_va_loi_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_loi_probabilite",
    difficulty: 2,
    theme: "neutral",
    text: "D'après le tableau de la loi de $X$ ci-dessous, que vaut $P(X = 1)$ ?",
    format: "qcm",
    choices: ["$0{,}5$", "$0{,}2$", "$0{,}3$", "$1$"],
    expected: ["$0{,}5$"],
    comparator: "mcq_exact",
    canvas: loiTableauCanvas,
    hint: "On lit la colonne $x_i = 1$.",
    explanation: exp(
      "Le tableau d'une loi donne directement chaque probabilité.",
      "On lit la valeur sous la colonne $x_i = 1$.",
      "La case correspondante contient $0{,}5$.",
      "$P(X = 1) = 0{,}5$."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "loi", "tableau", "canvas", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_va_loi_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_loi_probabilite",
    difficulty: 2,
    theme: "neutral",
    text: "Le diagramme en bâtons ci-dessous donne la loi de $X$. Que vaut $P(X = 2)$ ?",
    format: "qcm",
    choices: ["$0{,}3$", "$0{,}5$", "$0{,}2$", "$2$"],
    expected: ["$0{,}3$"],
    comparator: "mcq_exact",
    canvas: loiBatonsCanvas,
    hint: "On lit la hauteur du bâton au-dessus de la valeur $2$.",
    explanation: exp(
      "Dans un diagramme en bâtons, la hauteur représente la probabilité.",
      "On lit le bâton situé au-dessus de la valeur $2$.",
      "Sa hauteur vaut $0{,}3$.",
      "$P(X = 2) = 0{,}3$."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "loi", "batons", "canvas", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_va_loi_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_loi_probabilite",
    difficulty: 3,
    theme: "neutral",
    text: "Une loi vérifie $P(X=0) = 0{,}2$, $P(X=1) = 0{,}5$ et $P(X=2) = p$. Que vaut $p$ ?",
    format: "qcm",
    choices: ["$0{,}3$", "$0{,}7$", "$0{,}5$", "$0{,}1$"],
    expected: ["$0{,}3$"],
    comparator: "mcq_exact",
    hint: "La somme des probabilités vaut $1$.",
    explanation: exp(
      "La somme de toutes les probabilités d'une loi vaut $1$.",
      "On écrit $0{,}2 + 0{,}5 + p = 1$.",
      "$p = 1 - 0{,}7 = 0{,}3$.",
      "$p = 0{,}3$."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "loi", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_va_loi_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_loi_probabilite",
    difficulty: 2,
    theme: "neutral",
    text: "D'après le tableau de la loi de $X$ ci-dessous, que vaut $P(X = 0)$ ?",
    format: "qcm",
    choices: ["$0{,}2$", "$0{,}5$", "$0{,}3$", "$0$"],
    expected: ["$0{,}2$"],
    comparator: "mcq_exact",
    canvas: loiTableauCanvas,
    hint: "On lit la colonne $x_i = 0$.",
    explanation: exp(
      "Le tableau donne directement chaque probabilité.",
      "On lit la valeur sous la colonne $x_i = 0$.",
      "La case correspondante contient $0{,}2$.",
      "$P(X = 0) = 0{,}2$."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "loi", "tableau", "canvas", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_va_loi_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_loi_probabilite",
    difficulty: 3,
    theme: "neutral",
    text: "Avec la loi $P(X=0)=0{,}2$, $P(X=1)=0{,}5$, $P(X=2)=0{,}3$, que vaut $P(X \\le 1)$ ?",
    format: "qcm",
    choices: ["$0{,}7$", "$0{,}5$", "$0{,}2$", "$1$"],
    expected: ["$0{,}7$"],
    comparator: "mcq_exact",
    hint: "$P(X \\le 1) = P(X=0) + P(X=1)$.",
    explanation: exp(
      "$\\{X \\le 1\\}$ regroupe $X = 0$ et $X = 1$.",
      "On additionne les probabilités correspondantes.",
      "$P(X \\le 1) = 0{,}2 + 0{,}5 = 0{,}7$.",
      "$P(X \\le 1) = 0{,}7$."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "loi", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_va_loi_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_loi_probabilite",
    difficulty: 3,
    theme: "neutral",
    text: "Avec la loi $P(X=0)=0{,}2$, $P(X=1)=0{,}5$, $P(X=2)=0{,}3$, que vaut $P(X \\ge 1)$ ?",
    format: "qcm",
    choices: ["$0{,}8$", "$0{,}5$", "$0{,}3$", "$0{,}7$"],
    expected: ["$0{,}8$"],
    comparator: "mcq_exact",
    hint: "$P(X \\ge 1) = P(X=1) + P(X=2)$ (ou $1 - P(X=0)$).",
    explanation: exp(
      "$\\{X \\ge 1\\}$ regroupe $X = 1$ et $X = 2$.",
      "On additionne, ou on utilise l'événement contraire $1 - P(X=0)$.",
      "$P(X \\ge 1) = 0{,}5 + 0{,}3 = 0{,}8$.",
      "$P(X \\ge 1) = 0{,}8$."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "loi", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_va_loi_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_loi_probabilite",
    difficulty: 4,
    theme: "neutral",
    text: "Une loi vérifie $P(X=1)=0{,}4$, $P(X=2)=0{,}1$ et $P(X=3)=p$. Que vaut $p$ ?",
    format: "qcm",
    choices: ["$0{,}5$", "$0{,}3$", "$0{,}6$", "$0{,}4$"],
    expected: ["$0{,}5$"],
    comparator: "mcq_exact",
    hint: "La somme des probabilités vaut $1$.",
    explanation: exp(
      "La somme des probabilités d'une loi vaut $1$.",
      "On écrit $0{,}4 + 0{,}1 + p = 1$.",
      "$p = 1 - 0{,}5 = 0{,}5$.",
      "$p = 0{,}5$."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "loi", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_va_loi_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_loi_probabilite",
    difficulty: 3,
    theme: "neutral",
    text: "Dans un tableau de loi, à quoi doit toujours être égale la somme de la deuxième ligne (les probabilités) ?",
    format: "qcm",
    choices: ["$1$", "$0$", "au nombre de valeurs", "$0{,}5$"],
    expected: ["$1$"],
    comparator: "mcq_exact",
    canvas: loiTableauCanvas,
    hint: "C'est une vérification systématique d'une loi.",
    explanation: exp(
      "Toute loi de probabilité a une somme de probabilités égale à $1$.",
      "On additionne la deuxième ligne du tableau pour vérifier.",
      "$0{,}2 + 0{,}5 + 0{,}3 = 1$.",
      "La somme des probabilités vaut $1$."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "loi", "tableau", "canvas", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_va_loi_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_loi_probabilite",
    difficulty: 4,
    theme: "neutral",
    text: "Une pièce équilibrée : $X = 1$ si pile, $X = 0$ si face. Que vaut $P(X = 1)$ ?",
    format: "qcm",
    choices: ["$0{,}5$", "$1$", "$0$", "$0{,}25$"],
    expected: ["$0{,}5$"],
    comparator: "mcq_exact",
    hint: "La pièce est équilibrée.",
    explanation: exp(
      "Pour une pièce équilibrée, pile et face sont équiprobables.",
      "Chaque issue a une probabilité $\\tfrac{1}{2}$.",
      "$P(X = 1) = P(\\text{pile}) = 0{,}5$.",
      "$P(X = 1) = 0{,}5$."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "loi", "qcm"],
  },

  {
    kind: "template",
    id: "terminale_spe_va_loi_tpl_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_loi_probabilite",
    difficulty: 3,
    theme: "neutral",
    hint: "La somme des probabilités vaut $1$.",
    tags: ["terminale-spe", "variable_aleatoire", "loi", "template"],
    generate: () => {
      // Les trois pièges sont $0{,}a$, $0{,}b$ et $0{,}(a+b)$. Tirés au hasard,
      // l'un d'eux tombait souvent sur la réponse $0{,}(10-a-b)$ ou sur un
      // autre piège — a = b suffisait. On énumère donc les couples qui donnent
      // bien quatre nombres différents, et on tire là-dedans.
      const couples: [number, number][] = [];
      for (let x = 1; x <= 8; x += 1) {
        for (let y = 1; y <= 8; y += 1) {
          const r = 10 - x - y;
          if (r < 1 || x === y) continue;
          if (r === x || r === y || r === x + y) continue;
          couples.push([x, y]);
        }
      }
      const [a, b] = couples[randomInt(0, couples.length - 1)];
      const reste = 10 - a - b; // P(X=2) = 0,reste
      const rep = `$0{,}${reste}$`;
      const distracteurs = [
        `$0{,}${a + b}$`,
        `$0{,}${a}$`,
        `$0{,}${b}$`,
      ];
      return {
        text: `Une loi vérifie $P(X=0)=0{,}${a}$, $P(X=1)=0{,}${b}$ et $P(X=2)=p$. Que vaut $p$ ?`,
        format: "qcm",
        choices: [rep, ...distracteurs].sort(() => Math.random() - 0.5),
        expected: [rep],
        comparator: "mcq_exact",
        explanation: exp(
          "La somme des probabilités d'une loi vaut $1$.",
          `On écrit $0{,}${a} + 0{,}${b} + p = 1$.`,
          `$p = 1 - 0{,}${a + b} = 0{,}${reste}$.`,
          `$p = 0{,}${reste}$.`
        ),
      };
    },
  },

  /* =========================================================
     VA_ESPERANCE — Calculer une espérance
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_va_esperance_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_esperance",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la formule de l'espérance $E(X)$ ?",
    format: "qcm",
    choices: [
      "$E(X) = \\sum x_i \\, P(X = x_i)$",
      "$E(X) = \\sum P(X = x_i)$",
      "$E(X) = \\sum x_i$",
      "$E(X) = \\sum x_i^2 \\, P(X = x_i)$",
    ],
    expected: ["$E(X) = \\sum x_i \\, P(X = x_i)$"],
    comparator: "mcq_exact",
    hint: "On pondère chaque valeur par sa probabilité.",
    explanation: exp(
      "L'espérance est une moyenne pondérée des valeurs de $X$.",
      "On multiplie chaque valeur $x_i$ par sa probabilité, puis on somme.",
      "$E(X) = \\sum x_i \\, P(X = x_i)$.",
      "La formule est $E(X) = \\sum x_i \\, P(X = x_i)$."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "esperance", "formule", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_va_esperance_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_esperance",
    difficulty: 3,
    theme: "neutral",
    text: "Avec la loi ci-dessous ($X \\in \\{0,1,2\\}$, $P = 0{,}2 / 0{,}5 / 0{,}3$), que vaut $E(X)$ ?",
    format: "qcm",
    choices: ["$1{,}1$", "$1$", "$1{,}5$", "$0{,}9$"],
    expected: ["$1{,}1$"],
    comparator: "mcq_exact",
    canvas: loiTableauCanvas,
    hint: "$E(X) = 0 \\times 0{,}2 + 1 \\times 0{,}5 + 2 \\times 0{,}3$.",
    explanation: exp(
      "On applique la formule de l'espérance.",
      "$E(X) = 0 \\times 0{,}2 + 1 \\times 0{,}5 + 2 \\times 0{,}3$.",
      "$E(X) = 0 + 0{,}5 + 0{,}6 = 1{,}1$.",
      "$E(X) = 1{,}1$."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "esperance", "tableau", "canvas", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_va_esperance_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_esperance",
    difficulty: 3,
    theme: "neutral",
    text: "Une variable $X$ vaut $1$ avec probabilité $0{,}5$ et $3$ avec probabilité $0{,}5$. Que vaut $E(X)$ ?",
    format: "qcm",
    choices: ["$2$", "$1{,}5$", "$4$", "$0{,}5$"],
    expected: ["$2$"],
    comparator: "mcq_exact",
    hint: "$E(X) = 1 \\times 0{,}5 + 3 \\times 0{,}5$.",
    explanation: exp(
      "On applique la formule de l'espérance.",
      "$E(X) = 1 \\times 0{,}5 + 3 \\times 0{,}5$.",
      "$E(X) = 0{,}5 + 1{,}5 = 2$.",
      "$E(X) = 2$."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "esperance", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_va_esperance_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_esperance",
    difficulty: 3,
    theme: "neutral",
    text: "Le diagramme en bâtons ci-dessous donne la loi de $X$. Que vaut $E(X)$ ?",
    format: "qcm",
    choices: ["$1{,}1$", "$1$", "$0{,}3$", "$3$"],
    expected: ["$1{,}1$"],
    comparator: "mcq_exact",
    canvas: loiBatonsCanvas,
    hint: "$E(X) = 0 \\times 0{,}2 + 1 \\times 0{,}5 + 2 \\times 0{,}3$.",
    explanation: exp(
      "On lit les probabilités sur le diagramme, puis on applique la formule.",
      "$E(X) = 0 \\times 0{,}2 + 1 \\times 0{,}5 + 2 \\times 0{,}3$.",
      "$E(X) = 0{,}5 + 0{,}6 = 1{,}1$.",
      "$E(X) = 1{,}1$."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "esperance", "batons", "canvas", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_va_esperance_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_esperance",
    difficulty: 4,
    theme: "neutral",
    text: "Une variable $X$ vaut $-1$ avec probabilité $0{,}6$ et $2$ avec probabilité $0{,}4$. Que vaut $E(X)$ ?",
    format: "qcm",
    choices: ["$0{,}2$", "$1$", "$-0{,}2$", "$0{,}5$"],
    expected: ["$0{,}2$"],
    comparator: "mcq_exact",
    hint: "$E(X) = (-1) \\times 0{,}6 + 2 \\times 0{,}4$.",
    explanation: exp(
      "On applique la formule de l'espérance, avec une valeur négative.",
      "$E(X) = (-1) \\times 0{,}6 + 2 \\times 0{,}4$.",
      "$E(X) = -0{,}6 + 0{,}8 = 0{,}2$.",
      "$E(X) = 0{,}2$."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "esperance", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_va_esperance_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_esperance",
    difficulty: 2,
    theme: "neutral",
    text: "L'espérance $E(X)$ d'une variable aléatoire représente :",
    format: "qcm",
    choices: [
      "une moyenne pondérée des valeurs",
      "la plus grande valeur",
      "le nombre de valeurs",
      "une probabilité",
    ],
    expected: ["une moyenne pondérée des valeurs"],
    comparator: "mcq_exact",
    hint: "Chaque valeur est pondérée par sa probabilité.",
    explanation: exp(
      "L'espérance généralise la notion de moyenne.",
      "Chaque valeur est pondérée par sa probabilité.",
      "C'est une moyenne pondérée des valeurs de $X$.",
      "$E(X)$ est une moyenne pondérée des valeurs."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "esperance", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_va_esperance_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_esperance",
    difficulty: 4,
    theme: "neutral",
    text: "Une variable $X$ vaut $0$ avec probabilité $0{,}25$, $4$ avec probabilité $0{,}5$ et $8$ avec probabilité $0{,}25$. Que vaut $E(X)$ ?",
    format: "qcm",
    choices: ["$4$", "$3$", "$6$", "$5$"],
    expected: ["$4$"],
    comparator: "mcq_exact",
    hint: "$E(X) = 0 \\times 0{,}25 + 4 \\times 0{,}5 + 8 \\times 0{,}25$.",
    explanation: exp(
      "On applique la formule de l'espérance.",
      "$E(X) = 0 \\times 0{,}25 + 4 \\times 0{,}5 + 8 \\times 0{,}25$.",
      "$E(X) = 0 + 2 + 2 = 4$.",
      "$E(X) = 4$."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "esperance", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_va_esperance_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_esperance",
    difficulty: 4,
    theme: "neutral",
    text: "On lance un dé équilibré et $X$ est le numéro obtenu. Que vaut $E(X)$ ?",
    format: "qcm",
    choices: ["$3{,}5$", "$3$", "$4$", "$6$"],
    expected: ["$3{,}5$"],
    comparator: "mcq_exact",
    hint: "Chaque face a la probabilité $\\tfrac{1}{6}$ : $E(X) = \\tfrac{1+2+3+4+5+6}{6}$.",
    explanation: exp(
      "Toutes les faces sont équiprobables, de probabilité $\\tfrac{1}{6}$.",
      "$E(X) = \\dfrac{1 + 2 + 3 + 4 + 5 + 6}{6}$.",
      "$E(X) = \\dfrac{21}{6} = 3{,}5$.",
      "$E(X) = 3{,}5$."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "esperance", "qcm"],
  },

  {
    kind: "template",
    id: "terminale_spe_va_esperance_tpl_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_esperance",
    difficulty: 3,
    theme: "neutral",
    hint: "$X$ vaut $0$ ou $10$ : $E(X) = 10 \\times P(X = 10)$.",
    tags: ["terminale-spe", "variable_aleatoire", "esperance", "template"],
    generate: () => {
      const k = randomInt(1, 5); // P(X=10) = 0,k ; E(X) = 10 × 0,k = k (entier)
      return {
        text: `Une variable $X$ vaut $0$ ou $10$, avec $P(X = 10) = 0{,}${k}$. Que vaut $E(X)$ ?`,
        format: "short",
        expected: [String(k)],
        comparator: "number_equal",
        explanation: exp(
          "On applique la formule de l'espérance.",
          `$E(X) = 0 \\times (1 - 0{,}${k}) + 10 \\times 0{,}${k}$.`,
          `$E(X) = 10 \\times 0{,}${k} = ${k}$.`,
          `$E(X) = ${k}$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "terminale_spe_va_esperance_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_esperance",
    difficulty: 4,
    theme: "neutral",
    text: "Une variable $X$ vaut $0$ avec probabilité $0{,}3$, $10$ avec probabilité $0{,}5$ et $20$ avec probabilité $0{,}2$. Que vaut $E(X)$ ?",
    format: "qcm",
    choices: ["$9$", "$10$", "$6$", "$30$"],
    expected: ["$9$"],
    comparator: "mcq_exact",
    hint: "$E(X) = 0 \\times 0{,}3 + 10 \\times 0{,}5 + 20 \\times 0{,}2$.",
    explanation: exp(
      "On applique la formule de l'espérance.",
      "$E(X) = 0 \\times 0{,}3 + 10 \\times 0{,}5 + 20 \\times 0{,}2$.",
      "$E(X) = 0 + 5 + 4 = 9$.",
      "$E(X) = 9$."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "esperance", "qcm"],
  },

  /* =========================================================
     VA_VARIANCE_ECART_TYPE
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_va_variance_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_variance_ecart_type",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est une formule de la variance $V(X)$ ?",
    format: "qcm",
    choices: [
      "$V(X) = E(X^2) - \\big(E(X)\\big)^2$",
      "$V(X) = E(X) - E(X^2)$",
      "$V(X) = \\big(E(X)\\big)^2$",
      "$V(X) = \\sqrt{E(X)}$",
    ],
    expected: ["$V(X) = E(X^2) - \\big(E(X)\\big)^2$"],
    comparator: "mcq_exact",
    hint: "C'est la formule de König-Huygens.",
    explanation: exp(
      "La variance mesure la dispersion de $X$ autour de son espérance.",
      "On utilise la formule de König-Huygens.",
      "$V(X) = E(X^2) - \\big(E(X)\\big)^2$.",
      "La formule est $V(X) = E(X^2) - \\big(E(X)\\big)^2$."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "variance", "formule", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_va_variance_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_variance_ecart_type",
    difficulty: 2,
    theme: "neutral",
    text: "Comment obtient-on l'écart-type $\\sigma(X)$ à partir de la variance $V(X)$ ?",
    format: "qcm",
    choices: [
      "$\\sigma(X) = \\sqrt{V(X)}$",
      "$\\sigma(X) = V(X)^2$",
      "$\\sigma(X) = \\dfrac{1}{V(X)}$",
      "$\\sigma(X) = V(X)$",
    ],
    expected: ["$\\sigma(X) = \\sqrt{V(X)}$"],
    comparator: "mcq_exact",
    hint: "L'écart-type est la racine carrée de la variance.",
    explanation: exp(
      "L'écart-type s'exprime dans la même unité que $X$, contrairement à la variance.",
      "On prend la racine carrée de la variance.",
      "$\\sigma(X) = \\sqrt{V(X)}$.",
      "L'écart-type est $\\sigma(X) = \\sqrt{V(X)}$."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "ecart_type", "formule", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_va_variance_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_variance_ecart_type",
    difficulty: 4,
    theme: "neutral",
    text: "Avec la loi ci-dessous, on a $E(X) = 1{,}1$ et $E(X^2) = 1{,}7$. Que vaut $V(X)$ ?",
    format: "qcm",
    choices: ["$0{,}49$", "$0{,}6$", "$1{,}21$", "$0{,}7$"],
    expected: ["$0{,}49$"],
    comparator: "mcq_exact",
    canvas: loiTableauCanvas,
    hint: "$V(X) = E(X^2) - \\big(E(X)\\big)^2 = 1{,}7 - 1{,}1^2$.",
    explanation: exp(
      "On applique la formule de König-Huygens.",
      "$V(X) = E(X^2) - \\big(E(X)\\big)^2 = 1{,}7 - 1{,}1^2$.",
      "$V(X) = 1{,}7 - 1{,}21 = 0{,}49$.",
      "$V(X) = 0{,}49$."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "variance", "tableau", "canvas", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_va_variance_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_variance_ecart_type",
    difficulty: 4,
    theme: "neutral",
    text: "On a $V(X) = 0{,}49$. Que vaut l'écart-type $\\sigma(X)$ ?",
    format: "qcm",
    choices: ["$0{,}7$", "$0{,}49$", "$0{,}24$", "$0{,}98$"],
    expected: ["$0{,}7$"],
    comparator: "mcq_exact",
    hint: "$\\sigma(X) = \\sqrt{V(X)} = \\sqrt{0{,}49}$.",
    explanation: exp(
      "L'écart-type est la racine carrée de la variance.",
      "$\\sigma(X) = \\sqrt{0{,}49}$.",
      "$\\sqrt{0{,}49} = 0{,}7$.",
      "$\\sigma(X) = 0{,}7$."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "ecart_type", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_va_variance_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_variance_ecart_type",
    difficulty: 3,
    theme: "neutral",
    text: "La variance $V(X)$ peut-elle être négative ?",
    format: "qcm",
    choices: ["Non, jamais", "Oui, parfois", "Oui, si $E(X) < 0$", "Seulement si $X$ est négative"],
    expected: ["Non, jamais"],
    comparator: "mcq_exact",
    hint: "La variance mesure une dispersion (des carrés d'écarts).",
    explanation: exp(
      "La variance est une moyenne de carrés d'écarts.",
      "Une somme de carrés pondérés par des probabilités est positive.",
      "Donc $V(X) \\ge 0$ toujours.",
      "Non, la variance n'est jamais négative."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "variance", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_va_variance_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_variance_ecart_type",
    difficulty: 4,
    theme: "neutral",
    text: "Une variable $X$ vaut $1$ ou $3$, chacune avec probabilité $0{,}5$. Sachant $E(X) = 2$, que vaut $V(X)$ ?",
    format: "qcm",
    choices: ["$1$", "$2$", "$0{,}5$", "$4$"],
    expected: ["$1$"],
    comparator: "mcq_exact",
    hint: "$E(X^2) = 1^2 \\times 0{,}5 + 3^2 \\times 0{,}5$, puis $V = E(X^2) - 2^2$.",
    explanation: exp(
      "On calcule $E(X^2)$ puis on applique König-Huygens.",
      "$E(X^2) = 1 \\times 0{,}5 + 9 \\times 0{,}5 = 5$.",
      "$V(X) = E(X^2) - \\big(E(X)\\big)^2 = 5 - 4 = 1$.",
      "$V(X) = 1$."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "variance", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_va_variance_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_variance_ecart_type",
    difficulty: 5,
    theme: "neutral",
    text: "Une variable $X$ vaut $0$ ou $1$ avec $P(X=1) = 0{,}5$. Que vaut $V(X)$ ?",
    format: "qcm",
    choices: ["$0{,}25$", "$0{,}5$", "$0{,}75$", "$1$"],
    expected: ["$0{,}25$"],
    comparator: "mcq_exact",
    hint: "$E(X) = 0{,}5$ et $E(X^2) = E(X) = 0{,}5$ ici (car $0^2=0$, $1^2=1$).",
    explanation: exp(
      "On calcule $E(X)$ et $E(X^2)$ pour une variable à valeurs $0/1$.",
      "$E(X) = 0{,}5$ ; $E(X^2) = 0 \\times 0{,}5 + 1 \\times 0{,}5 = 0{,}5$.",
      "$V(X) = 0{,}5 - 0{,}5^2 = 0{,}5 - 0{,}25 = 0{,}25$.",
      "$V(X) = 0{,}25$."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "variance", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_va_variance_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_variance_ecart_type",
    difficulty: 3,
    theme: "neutral",
    text: "Pour calculer $V(X)$ avec la formule de König-Huygens, de quelles quantités a-t-on besoin ?",
    format: "qcm",
    choices: [
      "$E(X)$ et $E(X^2)$",
      "$E(X)$ seulement",
      "$\\sigma(X)$ seulement",
      "le nombre de valeurs",
    ],
    expected: ["$E(X)$ et $E(X^2)$"],
    comparator: "mcq_exact",
    hint: "$V(X) = E(X^2) - \\big(E(X)\\big)^2$.",
    explanation: exp(
      "La formule de König-Huygens fait intervenir deux espérances.",
      "Il faut $E(X^2)$ et $E(X)$.",
      "$V(X) = E(X^2) - \\big(E(X)\\big)^2$.",
      "On a besoin de $E(X)$ et $E(X^2)$."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "variance", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_va_variance_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_variance_ecart_type",
    difficulty: 5,
    theme: "neutral",
    text: "Une variable $X$ vaut $2$ ou $6$, chacune avec probabilité $0{,}5$. Que vaut $\\sigma(X)$ ?",
    format: "qcm",
    choices: ["$2$", "$4$", "$1$", "$8$"],
    expected: ["$2$"],
    comparator: "mcq_exact",
    hint: "$E(X) = 4$, $E(X^2) = 4 \\times 0{,}5 + 36 \\times 0{,}5 = 20$, puis $V = 20 - 16$.",
    explanation: exp(
      "On calcule $E(X)$, $E(X^2)$, $V(X)$ puis $\\sigma(X)$.",
      "$E(X) = 4$ ; $E(X^2) = 4 \\times 0{,}5 + 36 \\times 0{,}5 = 20$ ; $V(X) = 20 - 16 = 4$.",
      "$\\sigma(X) = \\sqrt{4} = 2$.",
      "$\\sigma(X) = 2$."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "ecart_type", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_va_variance_fixed_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_variance_ecart_type",
    difficulty: 4,
    theme: "neutral",
    text: "On a $V(X) = 0{,}25$. Que vaut $\\sigma(X)$ ?",
    format: "qcm",
    choices: ["$0{,}5$", "$0{,}25$", "$0{,}05$", "$0{,}0625$"],
    expected: ["$0{,}5$"],
    comparator: "mcq_exact",
    hint: "$\\sigma(X) = \\sqrt{0{,}25}$.",
    explanation: exp(
      "L'écart-type est la racine carrée de la variance.",
      "$\\sigma(X) = \\sqrt{0{,}25}$.",
      "$\\sqrt{0{,}25} = 0{,}5$.",
      "$\\sigma(X) = 0{,}5$."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "ecart_type", "qcm"],
  },

  /* =========================================================
     VA_INTERPRETER
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_va_interpreter_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_interpreter",
    difficulty: 2,
    theme: "neutral",
    text: "Comment interprète-t-on l'espérance $E(X)$ d'un gain ?",
    format: "qcm",
    choices: [
      "le gain moyen sur un grand nombre de parties",
      "le gain maximal possible",
      "la probabilité de gagner",
      "le nombre de parties",
    ],
    expected: ["le gain moyen sur un grand nombre de parties"],
    comparator: "mcq_exact",
    hint: "L'espérance se lit « en moyenne, sur le long terme ».",
    explanation: exp(
      "L'espérance correspond à une moyenne sur un grand nombre de répétitions.",
      "On interprète $E(X)$ comme une valeur moyenne attendue.",
      "Sur de nombreuses parties, le gain moyen tend vers $E(X)$.",
      "$E(X)$ est le gain moyen sur un grand nombre de parties."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "interpreter", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_va_interpreter_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_interpreter",
    difficulty: 2,
    theme: "neutral",
    text: "Que mesure l'écart-type $\\sigma(X)$ ?",
    format: "qcm",
    choices: [
      "la dispersion des valeurs autour de la moyenne",
      "la valeur moyenne",
      "la plus grande valeur",
      "le nombre de valeurs",
    ],
    expected: ["la dispersion des valeurs autour de la moyenne"],
    comparator: "mcq_exact",
    hint: "Un grand écart-type = valeurs très étalées.",
    explanation: exp(
      "L'écart-type quantifie l'étalement des valeurs de $X$.",
      "Il mesure à quel point les valeurs s'écartent de l'espérance.",
      "Un écart-type élevé signifie des valeurs dispersées.",
      "$\\sigma(X)$ mesure la dispersion autour de la moyenne."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "interpreter", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_va_interpreter_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_interpreter",
    difficulty: 3,
    theme: "neutral",
    text: "Un jeu est dit équitable lorsque l'espérance du gain algébrique vaut :",
    format: "qcm",
    choices: ["$0$", "$1$", "la mise", "le gain maximal"],
    expected: ["$0$"],
    comparator: "mcq_exact",
    hint: "Équitable = ni avantageux, ni désavantageux.",
    explanation: exp(
      "Un jeu équitable n'avantage ni le joueur ni l'organisateur.",
      "Cela se traduit par une espérance de gain nulle.",
      "$E(\\text{gain}) = 0$.",
      "Un jeu est équitable si $E(\\text{gain}) = 0$."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "interpreter", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_va_interpreter_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_interpreter",
    difficulty: 3,
    theme: "neutral",
    text: "Un jeu est favorable au joueur lorsque l'espérance du gain algébrique est :",
    format: "qcm",
    choices: ["strictement positive", "nulle", "strictement négative", "égale à la mise"],
    expected: ["strictement positive"],
    comparator: "mcq_exact",
    hint: "Favorable = gain moyen positif.",
    explanation: exp(
      "Le signe de l'espérance de gain indique si le jeu est favorable.",
      "Un gain moyen positif signifie un jeu favorable au joueur.",
      "$E(\\text{gain}) > 0$.",
      "Le jeu est favorable si $E(\\text{gain}) > 0$."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "interpreter", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_va_interpreter_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_interpreter",
    difficulty: 4,
    theme: "neutral",
    text: "Deux jeux ont la même espérance, mais le jeu A a un écart-type plus grand que le jeu B. Que peut-on dire ?",
    format: "qcm",
    choices: [
      "Le jeu A est plus risqué (résultats plus dispersés)",
      "Le jeu A rapporte plus en moyenne",
      "Le jeu B est plus risqué",
      "Les deux jeux sont identiques",
    ],
    expected: ["Le jeu A est plus risqué (résultats plus dispersés)"],
    comparator: "mcq_exact",
    hint: "À espérance égale, l'écart-type traduit le risque.",
    explanation: exp(
      "À espérance égale, c'est l'écart-type qui distingue les jeux.",
      "Un écart-type plus grand signifie des résultats plus dispersés.",
      "Le jeu A, avec un plus grand écart-type, est donc plus risqué.",
      "Le jeu A est plus risqué que le jeu B."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "interpreter", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_va_interpreter_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_interpreter",
    difficulty: 4,
    theme: "neutral",
    text: "À une loterie, l'espérance de gain (en comptant la mise) vaut $-0{,}30$ €. Comment l'interpréter ?",
    format: "qcm",
    choices: [
      "On perd en moyenne 0,30 € par partie",
      "On gagne en moyenne 0,30 € par partie",
      "On gagne toujours",
      "Le jeu est équitable",
    ],
    expected: ["On perd en moyenne 0,30 € par partie"],
    comparator: "mcq_exact",
    hint: "Une espérance négative = perte moyenne.",
    explanation: exp(
      "Le signe de l'espérance de gain donne le résultat moyen.",
      "Une espérance négative correspond à une perte moyenne.",
      "$E(\\text{gain}) = -0{,}30$ € : on perd en moyenne $0{,}30$ € par partie.",
      "On perd en moyenne 0,30 € par partie."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "interpreter", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_va_interpreter_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_interpreter",
    difficulty: 3,
    theme: "neutral",
    text: "Un écart-type égal à $0$ signifie que :",
    format: "qcm",
    choices: [
      "$X$ prend toujours la même valeur",
      "$X$ est très dispersée",
      "$E(X) = 0$",
      "$X$ est négative",
    ],
    expected: ["$X$ prend toujours la même valeur"],
    comparator: "mcq_exact",
    hint: "Aucune dispersion = aucune variation.",
    explanation: exp(
      "L'écart-type mesure la dispersion ; nul, il n'y a aucune dispersion.",
      "Si $\\sigma(X) = 0$, toutes les valeurs sont identiques.",
      "$X$ est alors une variable certaine (constante).",
      "$X$ prend toujours la même valeur."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "interpreter", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_va_interpreter_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_interpreter",
    difficulty: 4,
    theme: "neutral",
    text: "Pour décider si un jeu d'argent est intéressant, quelle grandeur regarde-t-on en priorité ?",
    format: "qcm",
    choices: [
      "l'espérance du gain algébrique",
      "la plus grande valeur de gain",
      "le nombre de joueurs",
      "la mise uniquement",
    ],
    expected: ["l'espérance du gain algébrique"],
    comparator: "mcq_exact",
    hint: "C'est le gain moyen à long terme qui compte.",
    explanation: exp(
      "L'intérêt d'un jeu se juge sur le gain moyen attendu.",
      "On calcule l'espérance du gain algébrique (mise comprise).",
      "Son signe indique si le jeu est favorable, équitable ou défavorable.",
      "On regarde en priorité l'espérance du gain algébrique."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "interpreter", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_va_interpreter_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_interpreter",
    difficulty: 5,
    theme: "neutral",
    text: "L'espérance $E(X)$ d'une variable aléatoire est-elle nécessairement une valeur prise par $X$ ?",
    format: "qcm",
    choices: [
      "Non (ex. $E(X) = 3{,}5$ pour un dé)",
      "Oui, toujours",
      "Oui, si $X$ est entière",
      "Non, elle est toujours nulle",
    ],
    expected: ["Non (ex. $E(X) = 3{,}5$ pour un dé)"],
    comparator: "mcq_exact",
    hint: "Pense à l'espérance d'un dé.",
    explanation: exp(
      "L'espérance est une moyenne, pas forcément une valeur atteinte.",
      "Pour un dé, $E(X) = 3{,}5$, qui n'est pas une face.",
      "Une moyenne peut tomber « entre » les valeurs.",
      "Non : $E(X)$ n'est pas nécessairement une valeur prise par $X$."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "interpreter", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_va_interpreter_fixed_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_interpreter",
    difficulty: 3,
    theme: "neutral",
    text: "Plus l'écart-type d'une variable aléatoire est petit, plus les valeurs sont :",
    format: "qcm",
    choices: [
      "regroupées autour de la moyenne",
      "dispersées",
      "grandes",
      "négatives",
    ],
    expected: ["regroupées autour de la moyenne"],
    comparator: "mcq_exact",
    hint: "Petit écart-type = peu de dispersion.",
    explanation: exp(
      "L'écart-type traduit la dispersion autour de l'espérance.",
      "Un petit écart-type signifie peu de dispersion.",
      "Les valeurs sont alors proches de la moyenne.",
      "Elles sont regroupées autour de la moyenne."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "interpreter", "qcm"],
  },

  /* =========================================================
     VA_DEFI — Type bac
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_va_defi_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un jeu : on gagne 5 € avec probabilité $0{,}2$, sinon on ne gagne rien. Quelle est l'espérance de gain $E(G)$ ?",
    format: "qcm",
    choices: ["$1$ €", "$5$ €", "$0{,}2$ €", "$2{,}5$ €"],
    expected: ["$1$ €"],
    comparator: "mcq_exact",
    hint: "$E(G) = 5 \\times 0{,}2 + 0 \\times 0{,}8$.",
    explanation: exp(
      "On applique la formule de l'espérance au gain.",
      "$E(G) = 5 \\times 0{,}2 + 0 \\times 0{,}8$.",
      "$E(G) = 1 + 0 = 1$ €.",
      "$E(G) = 1$ €."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_va_defi_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_defi",
    difficulty: 5,
    theme: "neutral",
    text: "On mise 2 € pour jouer. On gagne 5 € avec probabilité $0{,}2$ (sinon rien). Quelle est l'espérance du gain algébrique (gain − mise) ?",
    format: "qcm",
    choices: ["$-1$ €", "$1$ €", "$3$ €", "$0$ €"],
    expected: ["$-1$ €"],
    comparator: "mcq_exact",
    hint: "Gain net = (5 − 2) avec proba 0,2, et (0 − 2) sinon.",
    explanation: exp(
      "On calcule l'espérance du gain net (en retranchant la mise).",
      "Gain net : $+3$ € avec proba $0{,}2$, $-2$ € avec proba $0{,}8$.",
      "$E = 3 \\times 0{,}2 + (-2) \\times 0{,}8 = 0{,}6 - 1{,}6 = -1$ €.",
      "$E = -1$ € : le jeu est défavorable au joueur."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_va_defi_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Ce jeu, d'espérance de gain algébrique $-1$ €, est-il équitable ?",
    format: "qcm",
    choices: [
      "Non, il est défavorable au joueur",
      "Oui, il est équitable",
      "Non, il est favorable au joueur",
      "On ne peut pas savoir",
    ],
    expected: ["Non, il est défavorable au joueur"],
    comparator: "mcq_exact",
    hint: "Compare l'espérance à $0$.",
    explanation: exp(
      "Le caractère équitable se juge sur le signe de l'espérance.",
      "Ici $E = -1 < 0$.",
      "Une espérance négative signifie un jeu défavorable au joueur.",
      "Non, le jeu est défavorable au joueur."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_va_defi_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Avec la loi ci-dessous, on a déjà $E(X) = 1{,}1$. Quel calcul donne $E(X^2)$ ?",
    format: "qcm",
    choices: [
      "$0^2 \\times 0{,}2 + 1^2 \\times 0{,}5 + 2^2 \\times 0{,}3$",
      "$0 \\times 0{,}2 + 1 \\times 0{,}5 + 2 \\times 0{,}3$",
      "$(0 + 1 + 2)^2$",
      "$1{,}1^2$",
    ],
    expected: ["$0^2 \\times 0{,}2 + 1^2 \\times 0{,}5 + 2^2 \\times 0{,}3$"],
    comparator: "mcq_exact",
    canvas: loiTableauCanvas,
    hint: "$E(X^2) = \\sum x_i^2 \\, P(X = x_i)$.",
    explanation: exp(
      "$E(X^2)$ pondère les carrés des valeurs par leurs probabilités.",
      "On applique $E(X^2) = \\sum x_i^2 \\, P(X = x_i)$.",
      "$E(X^2) = 0^2 \\times 0{,}2 + 1^2 \\times 0{,}5 + 2^2 \\times 0{,}3 = 1{,}7$.",
      "Le bon calcul est $0^2 \\times 0{,}2 + 1^2 \\times 0{,}5 + 2^2 \\times 0{,}3$."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "type_bac", "tableau", "canvas", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_va_defi_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Pour rendre équitable un jeu où l'on gagne 5 € avec probabilité $0{,}2$, quelle mise faut-il demander ?",
    format: "qcm",
    choices: ["$1$ €", "$5$ €", "$0{,}2$ €", "$2$ €"],
    expected: ["$1$ €"],
    comparator: "mcq_exact",
    hint: "Mise équitable = espérance du gain (sans la mise) = $5 \\times 0{,}2$.",
    explanation: exp(
      "Un jeu est équitable si la mise égale l'espérance du gain brut.",
      "L'espérance du gain (sans mise) est $5 \\times 0{,}2 = 1$ €.",
      "Il faut donc demander une mise de $1$ € pour annuler l'espérance algébrique.",
      "La mise équitable est $1$ €."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_va_defi_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un jeu rapporte 10 € avec probabilité $0{,}1$, 2 € avec probabilité $0{,}4$, et $0$ € sinon. Quelle est l'espérance de gain ?",
    format: "qcm",
    choices: ["$1{,}8$ €", "$1$ €", "$2{,}8$ €", "$12$ €"],
    expected: ["$1{,}8$ €"],
    comparator: "mcq_exact",
    hint: "$E = 10 \\times 0{,}1 + 2 \\times 0{,}4 + 0 \\times 0{,}5$.",
    explanation: exp(
      "On applique la formule de l'espérance au gain.",
      "$E = 10 \\times 0{,}1 + 2 \\times 0{,}4 + 0 \\times 0{,}5$.",
      "$E = 1 + 0{,}8 + 0 = 1{,}8$ €.",
      "$E = 1{,}8$ €."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_va_defi_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Une variable $X$ vaut $10$ avec probabilité $0{,}5$ et $20$ avec probabilité $0{,}5$. Que vaut $\\sigma(X)$ ?",
    format: "qcm",
    choices: ["$5$", "$10$", "$25$", "$15$"],
    expected: ["$5$"],
    comparator: "mcq_exact",
    hint: "$E(X) = 15$, $E(X^2) = 100 \\times 0{,}5 + 400 \\times 0{,}5 = 250$, $V = 250 - 225$.",
    explanation: exp(
      "On calcule $E(X)$, $E(X^2)$, $V(X)$ puis $\\sigma(X)$.",
      "$E(X) = 15$ ; $E(X^2) = 100 \\times 0{,}5 + 400 \\times 0{,}5 = 250$ ; $V(X) = 250 - 225 = 25$.",
      "$\\sigma(X) = \\sqrt{25} = 5$.",
      "$\\sigma(X) = 5$."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_va_defi_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un organisateur veut un jeu rentable pour lui. L'espérance de gain du joueur doit être :",
    format: "qcm",
    choices: ["strictement négative", "strictement positive", "nulle", "égale à 1"],
    expected: ["strictement négative"],
    comparator: "mcq_exact",
    hint: "Ce que perd le joueur en moyenne, l'organisateur le gagne.",
    explanation: exp(
      "Le gain de l'organisateur est l'opposé de celui du joueur.",
      "Pour que l'organisateur gagne, le joueur doit perdre en moyenne.",
      "Donc l'espérance de gain du joueur doit être strictement négative.",
      "Elle doit être strictement négative."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_va_defi_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Le diagramme en bâtons ci-dessous donne la loi de $X$. Quelle est la valeur la plus probable de $X$ ?",
    format: "qcm",
    choices: ["$1$", "$0$", "$2$", "Toutes équiprobables"],
    expected: ["$1$"],
    comparator: "mcq_exact",
    canvas: loiBatonsCanvas,
    hint: "On cherche le bâton le plus haut.",
    explanation: exp(
      "La valeur la plus probable correspond au bâton le plus haut.",
      "On compare les hauteurs : $0{,}2$, $0{,}5$, $0{,}3$.",
      "La plus grande probabilité est $0{,}5$, pour $X = 1$.",
      "La valeur la plus probable est $1$."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "type_bac", "batons", "canvas", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_va_defi_fixed_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId: "va_defi",
    difficulty: 5,
    theme: "neutral",
    text: "On répète 100 fois un jeu d'espérance de gain $0{,}2$ € par partie. Quel gain total peut-on espérer ?",
    format: "qcm",
    choices: ["environ $20$ €", "environ $2$ €", "environ $200$ €", "exactement $0{,}2$ €"],
    expected: ["environ $20$ €"],
    comparator: "mcq_exact",
    hint: "Sur $n$ parties, le gain moyen total est environ $n \\times E$.",
    explanation: exp(
      "L'espérance donne le gain moyen par partie ; on le cumule.",
      "Sur $100$ parties, le gain total espéré est environ $100 \\times E$.",
      "$100 \\times 0{,}2 = 20$ €.",
      "On peut espérer un gain total d'environ $20$ €."
    ),
    tags: ["terminale-spe", "variable_aleatoire", "type_bac", "qcm"],
  },
];
