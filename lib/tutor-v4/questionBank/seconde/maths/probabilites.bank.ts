// lib/tutor-v4/questionBank/seconde/maths/probabilites.bank.ts
//
// Chapitre : Probabilites sur un ensemble fini (notion probabilites_ensemble_fini)
//
// REGLE DE DESIGN (option D) : fixed=remarquable/definition, templates dominants,
// QCM-raisonnement, short numerique (calculatrice dispo), pas d'open.
// Canvas : "probabilites" (de, billes) et "arbre_proba". Billes en couleurs HEX.
//
// microSkills (>= 10 items chacun, difficultes 1->5) :
//   proba_vocabulaire        — Issue, evenement, univers
//   proba_modele             — Loi de probabilite sur un univers fini
//   proba_calculer           — Calculer une probabilite
//   proba_evenement_contraire— Evenement contraire (complementaire)
//   proba_reunion_intersection — Reunion et intersection d'evenements
//   proba_formule_union      — P(A∪B) + P(A∩B) = P(A) + P(B)
//   proba_tableau_arbre      — Organiser avec un tableau ou un arbre

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

function deCanvas(surligne: Array<1 | 2 | 3 | 4 | 5 | 6>): CanvasFigure {
  return {
    kind: "probabilites",
    variant: "de",
    de: { faces: [1, 2, 3, 4, 5, 6], surligne },
    size: { width: 300, height: 140 },
  };
}

function billesCanvas(rouges: number, bleues: number, vertes = 0): CanvasFigure {
  const elements: { couleur: string }[] = [];
  for (let i = 0; i < rouges; i++) elements.push({ couleur: "#ef4444" });
  for (let i = 0; i < bleues; i++) elements.push({ couleur: "#3b82f6" });
  for (let i = 0; i < vertes; i++) elements.push({ couleur: "#22c55e" });
  return {
    kind: "probabilites",
    variant: "billes",
    billes: { elements },
    size: { width: 300, height: 140 },
  };
}

export const probabilitesBank: TutorBankItemV4[] = [
  /* ===================== PROBA_VOCABULAIRE ===================== */

  {
    kind: "fixed",
    id: "seconde_proba_voc_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_ensemble_fini",
    microId: "proba_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Lors d'une expérience aléatoire, une « issue » est :",
    format: "qcm",
    choices: [
      "un résultat possible de l'expérience",
      "l'ensemble de tous les résultats",
      "la probabilité d'un événement",
      "le nombre d'expériences",
    ],
    expected: ["un résultat possible de l'expérience"],
    comparator: "mcq_exact",
    hint: "Ex. obtenir « 4 » en lançant un dé.",
    explanation: exp(
      "Une issue est un résultat élémentaire possible.",
      "Ex. pour un dé, « obtenir 4 » est une issue.",
      "L'ensemble des issues forme l'univers.",
      "Une issue est un résultat possible."
    ),
    tags: ["seconde", "maths", "probabilites", "vocabulaire", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_proba_voc_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_ensemble_fini",
    microId: "proba_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "L'univers d'une expérience aléatoire est :",
    format: "qcm",
    choices: [
      "l'ensemble de toutes les issues possibles",
      "une seule issue",
      "la probabilité totale",
      "un événement particulier",
    ],
    expected: ["l'ensemble de toutes les issues possibles"],
    comparator: "mcq_exact",
    hint: "Toutes les issues réunies.",
    explanation: exp(
      "L'univers regroupe tous les résultats possibles.",
      "Ex. pour un dé : $\\{1, 2, 3, 4, 5, 6\\}$.",
      "C'est l'ensemble de toutes les issues.",
      "L'ensemble de toutes les issues possibles."
    ),
    tags: ["seconde", "maths", "probabilites", "vocabulaire", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_proba_voc_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_ensemble_fini",
    microId: "proba_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Un « événement » est :",
    format: "qcm",
    choices: [
      "un ensemble d'issues (par exemple « obtenir un nombre pair »)",
      "une seule issue toujours",
      "la somme des probabilités",
      "le nombre de lancers",
    ],
    expected: ["un ensemble d'issues (par exemple « obtenir un nombre pair »)"],
    comparator: "mcq_exact",
    hint: "« Obtenir un pair » regroupe 2, 4, 6.",
    explanation: exp(
      "Un événement est constitué d'une ou plusieurs issues.",
      "Ex. « obtenir un pair » $= \\{2, 4, 6\\}$.",
      "C'est un sous-ensemble de l'univers.",
      "Un ensemble d'issues."
    ),
    tags: ["seconde", "maths", "probabilites", "vocabulaire", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_proba_voc_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_ensemble_fini",
    microId: "proba_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "On lance un dé équilibré à 6 faces. Combien y a-t-il d'issues possibles ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    canvas: deCanvas([]),
    hint: "Une issue par face.",
    explanation: exp(
      "Chaque face donne une issue possible.",
      "Le dé a 6 faces.",
      "Il y a donc 6 issues.",
      "Il y a $6$ issues."
    ),
    tags: ["seconde", "maths", "probabilites", "vocabulaire", "canvas", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_proba_voc_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_ensemble_fini",
    microId: "proba_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "On tire une carte d'un jeu de 32 cartes. Combien d'issues possibles ?",
    format: "short",
    expected: ["32"],
    comparator: "number_equal",
    hint: "Une issue par carte.",
    explanation: exp(
      "Chaque carte est une issue possible.",
      "Le jeu compte 32 cartes.",
      "Il y a donc 32 issues.",
      "Il y a $32$ issues."
    ),
    tags: ["seconde", "maths", "probabilites", "vocabulaire", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_proba_voc_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_ensemble_fini",
    microId: "proba_vocabulaire",
    difficulty: 3,
    theme: "neutral",
    text: "On lance un dé. L'événement « obtenir un nombre pair » est composé de combien d'issues ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    canvas: deCanvas([2, 4, 6]),
    hint: "Les faces paires : 2, 4, 6.",
    explanation: exp(
      "On dénombre les issues de l'événement.",
      "Les faces paires sont $2$, $4$ et $6$.",
      "Cela fait $3$ issues.",
      "L'événement comporte $3$ issues."
    ),
    tags: ["seconde", "maths", "probabilites", "vocabulaire", "canvas", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_proba_voc_fixed_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_ensemble_fini",
    microId: "proba_vocabulaire",
    difficulty: 3,
    theme: "neutral",
    text: "Un événement qui ne contient aucune issue est appelé :",
    format: "qcm",
    choices: ["événement impossible", "événement certain", "événement contraire", "univers"],
    expected: ["événement impossible"],
    comparator: "mcq_exact",
    hint: "Sa probabilité vaut $0$.",
    explanation: exp(
      "Un événement sans issue ne peut jamais se réaliser.",
      "Ex. « obtenir 7 » avec un dé à 6 faces.",
      "C'est un événement impossible (probabilité $0$).",
      "Un événement impossible."
    ),
    tags: ["seconde", "maths", "probabilites", "vocabulaire", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_proba_voc_fixed_8",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_ensemble_fini",
    microId: "proba_vocabulaire",
    difficulty: 3,
    theme: "neutral",
    text: "Un événement qui se réalise à coup sûr est appelé :",
    format: "qcm",
    choices: ["événement certain (probabilité $1$)", "événement impossible", "issue", "univers vide"],
    expected: ["événement certain (probabilité $1$)"],
    comparator: "mcq_exact",
    hint: "Ex. « obtenir un nombre entre 1 et 6 » avec un dé.",
    explanation: exp(
      "Un événement certain contient toutes les issues.",
      "Il se réalise systématiquement.",
      "Sa probabilité vaut $1$.",
      "Un événement certain (probabilité $1$)."
    ),
    tags: ["seconde", "maths", "probabilites", "vocabulaire", "raisonnement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_proba_voc_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_ensemble_fini",
    microId: "proba_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    hint: "Une issue par élément.",
    tags: ["seconde", "maths", "probabilites", "vocabulaire", "template"],
    generate: () => {
      const objets = [
        { n: 6, mot: "un dé à 6 faces" },
        { n: 4, mot: "un dé à 4 faces" },
        { n: 8, mot: "une roue à 8 secteurs" },
        { n: 10, mot: "une roue à 10 secteurs" },
      ];
      const o = objets[randomInt(0, objets.length - 1)];
      return {
        text: `On utilise ${o.mot}. Combien y a-t-il d'issues possibles ?`,
        format: "short",
        expected: [String(o.n)],
        comparator: "number_equal",
        explanation: exp(
          "Chaque résultat possible est une issue.",
          `Il y a $${o.n}$ résultats possibles.`,
          `Donc $${o.n}$ issues.`,
          `Il y a $${o.n}$ issues.`
        ),
      };
    },
  },

  /* ===================== PROBA_MODELE ===================== */

  {
    kind: "fixed",
    id: "seconde_proba_mod_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_ensemble_fini",
    microId: "proba_modele",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une loi de probabilité, la somme des probabilités de toutes les issues vaut :",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Le total est toujours le même.",
    explanation: exp(
      "Une loi de probabilité répartit la « certitude » entre les issues.",
      "La somme de toutes les probabilités couvre tous les cas.",
      "Elle vaut donc $1$.",
      "La somme vaut $1$."
    ),
    tags: ["seconde", "maths", "probabilites", "modele", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_proba_mod_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_ensemble_fini",
    microId: "proba_modele",
    difficulty: 2,
    theme: "neutral",
    text: "Sur un dé équilibré à 6 faces, quelle est la probabilité d'obtenir la face « 5 » ?",
    format: "qcm",
    choices: ["$\\dfrac{1}{6}$", "$\\dfrac{1}{5}$", "$\\dfrac{5}{6}$", "$\\dfrac{1}{2}$"],
    expected: ["$\\dfrac{1}{6}$"],
    comparator: "mcq_exact",
    hint: "Équiprobabilité : $\\dfrac{1}{\\text{nombre de faces}}$.",
    explanation: exp(
      "Sur un dé équilibré, chaque face est équiprobable.",
      "Il y a 6 faces, chacune a la même probabilité.",
      "$P(5) = \\dfrac{1}{6}$.",
      "$\\dfrac{1}{6}$."
    ),
    tags: ["seconde", "maths", "probabilites", "modele", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_proba_mod_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_ensemble_fini",
    microId: "proba_modele",
    difficulty: 3,
    theme: "neutral",
    text: "« Équiprobable » signifie que :",
    format: "qcm",
    choices: [
      "toutes les issues ont la même probabilité",
      "une issue est plus probable",
      "la somme des probabilités est nulle",
      "il n'y a qu'une issue",
    ],
    expected: ["toutes les issues ont la même probabilité"],
    comparator: "mcq_exact",
    hint: "« Équi » = égal.",
    explanation: exp(
      "Dans une situation d'équiprobabilité, aucune issue n'est favorisée.",
      "Elles ont toutes la même probabilité.",
      "Ex. dé équilibré, pièce non truquée.",
      "Toutes les issues ont la même probabilité."
    ),
    tags: ["seconde", "maths", "probabilites", "modele", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_proba_mod_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_ensemble_fini",
    microId: "proba_modele",
    difficulty: 3,
    theme: "neutral",
    text: "Une probabilité est toujours un nombre compris :",
    format: "qcm",
    choices: ["entre $0$ et $1$", "entre $0$ et $100$ uniquement", "supérieur à $1$", "négatif possible"],
    expected: ["entre $0$ et $1$"],
    comparator: "mcq_exact",
    hint: "$0$ = impossible, $1$ = certain.",
    explanation: exp(
      "Une probabilité mesure une chance de réalisation.",
      "Elle va de $0$ (impossible) à $1$ (certain).",
      "Elle est toujours dans $[0\\,;1]$.",
      "Entre $0$ et $1$."
    ),
    tags: ["seconde", "maths", "probabilites", "modele", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_proba_mod_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_ensemble_fini",
    microId: "proba_modele",
    difficulty: 3,
    theme: "neutral",
    text: "Une pièce a $P(\\text{pile}) = 0{,}5$. Que vaut $P(\\text{face})$ ?",
    format: "short",
    expected: ["0,5", "0.5"],
    comparator: "number_equal",
    hint: "La somme des probabilités vaut $1$.",
    explanation: exp(
      "La somme des probabilités des issues vaut $1$.",
      "$P(\\text{face}) = 1 - 0{,}5$.",
      "$= 0{,}5$.",
      "$P(\\text{face}) = 0{,}5$."
    ),
    tags: ["seconde", "maths", "probabilites", "modele", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_proba_mod_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_ensemble_fini",
    microId: "proba_modele",
    difficulty: 4,
    theme: "neutral",
    text: "Une urne a 3 issues. On sait $P(A) = 0{,}2$ et $P(B) = 0{,}5$. Que vaut $P(C)$ ?",
    format: "short",
    expected: ["0,3", "0.3"],
    comparator: "number_equal",
    hint: "La somme vaut $1$.",
    explanation: exp(
      "La somme des probabilités des trois issues vaut $1$.",
      "$P(C) = 1 - 0{,}2 - 0{,}5$.",
      "$= 0{,}3$.",
      "$P(C) = 0{,}3$."
    ),
    tags: ["seconde", "maths", "probabilites", "modele", "short"],
  },

  {
    kind: "template",
    id: "seconde_proba_mod_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_ensemble_fini",
    microId: "proba_modele",
    difficulty: 3,
    theme: "neutral",
    hint: "La somme des probabilités vaut $1$.",
    tags: ["seconde", "maths", "probabilites", "modele", "template"],
    generate: () => {
      const pa = randomInt(1, 4) / 10;
      const pb = randomInt(1, 4) / 10;
      const pc = Math.round((1 - pa - pb) * 10) / 10;
      const pcStr = String(pc).replace(".", ",");
      return {
        text: `Trois issues A, B, C avec $P(A) = ${String(pa).replace(".", ",")}$ et $P(B) = ${String(pb).replace(".", ",")}$. Que vaut $P(C)$ ?`,
        format: "short",
        expected: [pcStr, String(pc)],
        comparator: "number_equal",
        explanation: exp(
          "La somme des probabilités vaut $1$.",
          `$P(C) = 1 - ${String(pa).replace(".", ",")} - ${String(pb).replace(".", ",")}$.`,
          `$= ${pcStr}$.`,
          `$P(C) = ${pcStr}$.`
        ),
      };
    },
  },

  /* ===================== PROBA_CALCULER ===================== */

  {
    kind: "fixed",
    id: "seconde_proba_calc_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_ensemble_fini",
    microId: "proba_calculer",
    difficulty: 2,
    theme: "neutral",
    text: "En situation d'équiprobabilité, la probabilité d'un événement se calcule par :",
    format: "qcm",
    choices: [
      "$\\dfrac{\\text{nombre d'issues favorables}}{\\text{nombre total d'issues}}$",
      "favorables $\\times$ total",
      "total $-$ favorables",
      "$\\dfrac{\\text{total}}{\\text{favorables}}$",
    ],
    expected: ["$\\dfrac{\\text{nombre d'issues favorables}}{\\text{nombre total d'issues}}$"],
    comparator: "mcq_exact",
    hint: "Favorables sur total.",
    explanation: exp(
      "En équiprobabilité, on compte les cas favorables et le total.",
      "$P = \\dfrac{\\text{favorables}}{\\text{total}}$.",
      "C'est la formule de base.",
      "$\\dfrac{\\text{favorables}}{\\text{total}}$."
    ),
    tags: ["seconde", "maths", "probabilites", "calculer", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_proba_calc_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_ensemble_fini",
    microId: "proba_calculer",
    difficulty: 2,
    theme: "neutral",
    text: "On lance un dé équilibré. Quelle est la probabilité d'obtenir un nombre pair ?",
    format: "qcm",
    choices: ["$\\dfrac{1}{2}$", "$\\dfrac{1}{3}$", "$\\dfrac{2}{3}$", "$\\dfrac{1}{6}$"],
    expected: ["$\\dfrac{1}{2}$"],
    comparator: "mcq_exact",
    canvas: deCanvas([2, 4, 6]),
    hint: "3 faces paires sur 6.",
    explanation: exp(
      "On compte les issues favorables : $2$, $4$, $6$ (3 issues).",
      "Sur un total de 6 faces.",
      "$P = \\dfrac{3}{6} = \\dfrac{1}{2}$.",
      "$\\dfrac{1}{2}$."
    ),
    tags: ["seconde", "maths", "probabilites", "calculer", "canvas", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_proba_calc_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_ensemble_fini",
    microId: "proba_calculer",
    difficulty: 3,
    theme: "neutral",
    text: "Une urne contient 3 billes rouges et 2 bleues. On en tire une au hasard. Quelle est la probabilité de tirer une rouge ?",
    format: "qcm",
    choices: ["$\\dfrac{3}{5}$", "$\\dfrac{2}{5}$", "$\\dfrac{3}{2}$", "$\\dfrac{1}{3}$"],
    expected: ["$\\dfrac{3}{5}$"],
    comparator: "mcq_exact",
    canvas: billesCanvas(3, 2),
    hint: "3 rouges sur 5 billes.",
    explanation: exp(
      "On compte les billes rouges et le total.",
      "$3$ rouges sur $5$ billes.",
      "$P(\\text{rouge}) = \\dfrac{3}{5}$.",
      "$\\dfrac{3}{5}$."
    ),
    tags: ["seconde", "maths", "probabilites", "calculer", "canvas", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_proba_calc_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_ensemble_fini",
    microId: "proba_calculer",
    difficulty: 3,
    theme: "neutral",
    text: "On lance un dé équilibré. Quelle est la probabilité d'obtenir un nombre supérieur ou égal à 5 ?",
    format: "qcm",
    choices: ["$\\dfrac{1}{3}$", "$\\dfrac{1}{2}$", "$\\dfrac{2}{3}$", "$\\dfrac{1}{6}$"],
    expected: ["$\\dfrac{1}{3}$"],
    comparator: "mcq_exact",
    canvas: deCanvas([5, 6]),
    hint: "Faces favorables : 5 et 6.",
    explanation: exp(
      "On compte les issues $\\ge 5$ : $5$ et $6$ (2 issues).",
      "Sur 6 faces.",
      "$P = \\dfrac{2}{6} = \\dfrac{1}{3}$.",
      "$\\dfrac{1}{3}$."
    ),
    tags: ["seconde", "maths", "probabilites", "calculer", "canvas", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_proba_calc_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_ensemble_fini",
    microId: "proba_calculer",
    difficulty: 2,
    theme: "neutral",
    text: "Un sac contient 5 jetons numérotés de 1 à 5. Quelle est la probabilité de tirer le jeton « 3 » ?",
    format: "qcm",
    choices: ["$\\dfrac{1}{5}$", "$\\dfrac{3}{5}$", "$\\dfrac{1}{3}$", "$\\dfrac{1}{2}$"],
    expected: ["$\\dfrac{1}{5}$"],
    comparator: "mcq_exact",
    hint: "1 jeton favorable sur 5.",
    explanation: exp(
      "Chaque jeton est équiprobable.",
      "1 jeton favorable (le « 3 ») sur 5.",
      "$P = \\dfrac{1}{5}$.",
      "$\\dfrac{1}{5}$."
    ),
    tags: ["seconde", "maths", "probabilites", "calculer", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_proba_calc_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_ensemble_fini",
    microId: "proba_calculer",
    difficulty: 3,
    theme: "neutral",
    hint: "Favorables sur total.",
    tags: ["seconde", "maths", "probabilites", "calculer", "template"],
    generate: () => {
      const r = randomInt(2, 5);
      // Le premier piège est la probabilité du bleu : à nombre égal de billes,
      // c'est la bonne réponse recopiée.
      let b = randomInt(2, 5);
      while (b === r) b = randomInt(2, 5);
      const total = r + b;
      const correct = `$\\dfrac{${r}}{${total}}$`;
      const choices = [correct, `$\\dfrac{${b}}{${total}}$`, `$\\dfrac{${r}}{${b}}$`, `$\\dfrac{${total}}{${r}}$`];
      return {
        text: `Une urne contient ${r} billes rouges et ${b} bleues. Probabilité de tirer une rouge ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        canvas: billesCanvas(r, b),
        explanation: exp(
          "On compte les billes favorables et le total.",
          `$${r}$ rouges sur $${total}$ billes.`,
          `$P(\\text{rouge}) = \\dfrac{${r}}{${total}}$.`,
          `$\\dfrac{${r}}{${total}}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_proba_calc_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_ensemble_fini",
    microId: "proba_calculer",
    difficulty: 2,
    theme: "neutral",
    hint: "1 face favorable sur 6.",
    tags: ["seconde", "maths", "probabilites", "calculer", "template"],
    generate: () => {
      const face = randomInt(1, 6) as 1 | 2 | 3 | 4 | 5 | 6;
      const correct = "$\\dfrac{1}{6}$";
      const choices = ["$\\dfrac{1}{6}$", "$\\dfrac{1}{2}$", "$\\dfrac{1}{3}$", "$\\dfrac{5}{6}$"];
      return {
        text: `On lance un dé équilibré. Probabilité d'obtenir la face « ${face} » ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        canvas: deCanvas([face]),
        explanation: exp(
          "Chaque face est équiprobable.",
          "1 face favorable sur 6.",
          `$P = \\dfrac{1}{6}$.`,
          "$\\dfrac{1}{6}$."
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_proba_calc_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_ensemble_fini",
    microId: "proba_calculer",
    difficulty: 4,
    theme: "neutral",
    text: "Un sac contient 4 billes rouges, 3 bleues et 1 verte. Quelle est la probabilité de tirer une bille verte ?",
    format: "qcm",
    choices: ["$\\dfrac{1}{8}$", "$\\dfrac{1}{4}$", "$\\dfrac{3}{8}$", "$\\dfrac{1}{2}$"],
    expected: ["$\\dfrac{1}{8}$"],
    comparator: "mcq_exact",
    canvas: billesCanvas(4, 3, 1),
    hint: "1 verte sur 8 billes au total.",
    explanation: exp(
      "On compte le total : $4 + 3 + 1 = 8$ billes.",
      "1 bille verte est favorable.",
      "$P(\\text{verte}) = \\dfrac{1}{8}$.",
      "$\\dfrac{1}{8}$."
    ),
    tags: ["seconde", "maths", "probabilites", "calculer", "canvas", "qcm"],
  },

  /* ===================== PROBA_EVENEMENT_CONTRAIRE ===================== */

  {
    kind: "fixed",
    id: "seconde_proba_contr_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_ensemble_fini",
    microId: "proba_evenement_contraire",
    difficulty: 2,
    theme: "neutral",
    text: "L'événement contraire de $A$ se réalise quand :",
    format: "qcm",
    choices: ["$A$ ne se réalise pas", "$A$ se réalise", "$A$ est certain", "rien ne se passe"],
    expected: ["$A$ ne se réalise pas"],
    comparator: "mcq_exact",
    hint: "Contraire = « non A ».",
    explanation: exp(
      "L'événement contraire $\\overline{A}$ est « $A$ ne se réalise pas ».",
      "Il regroupe toutes les issues qui ne sont pas dans $A$.",
      "C'est le complémentaire de $A$.",
      "Quand $A$ ne se réalise pas."
    ),
    tags: ["seconde", "maths", "probabilites", "contraire", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_proba_contr_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_ensemble_fini",
    microId: "proba_evenement_contraire",
    difficulty: 2,
    theme: "neutral",
    text: "Comment calcule-t-on la probabilité de l'événement contraire $\\overline{A}$ ?",
    format: "qcm",
    choices: ["$P(\\overline{A}) = 1 - P(A)$", "$P(\\overline{A}) = -P(A)$", "$P(\\overline{A}) = P(A)$", "$P(\\overline{A}) = 1 + P(A)$"],
    expected: ["$P(\\overline{A}) = 1 - P(A)$"],
    comparator: "mcq_exact",
    hint: "Le total fait $1$.",
    explanation: exp(
      "$A$ et $\\overline{A}$ couvrent tout l'univers.",
      "$P(A) + P(\\overline{A}) = 1$.",
      "Donc $P(\\overline{A}) = 1 - P(A)$.",
      "$P(\\overline{A}) = 1 - P(A)$."
    ),
    tags: ["seconde", "maths", "probabilites", "contraire", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_proba_contr_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_ensemble_fini",
    microId: "proba_evenement_contraire",
    difficulty: 2,
    theme: "neutral",
    text: "Si $P(A) = 0{,}3$, que vaut $P(\\overline{A})$ ?",
    format: "short",
    expected: ["0,7", "0.7"],
    comparator: "number_equal",
    hint: "$1 - 0{,}3$.",
    explanation: exp(
      "On applique $P(\\overline{A}) = 1 - P(A)$.",
      "$1 - 0{,}3$.",
      "$= 0{,}7$.",
      "$P(\\overline{A}) = 0{,}7$."
    ),
    tags: ["seconde", "maths", "probabilites", "contraire", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_proba_contr_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_ensemble_fini",
    microId: "proba_evenement_contraire",
    difficulty: 3,
    theme: "neutral",
    text: "On lance un dé. Quelle est la probabilité de NE PAS obtenir un 6 ?",
    format: "qcm",
    choices: ["$\\dfrac{5}{6}$", "$\\dfrac{1}{6}$", "$\\dfrac{1}{2}$", "$\\dfrac{2}{3}$"],
    expected: ["$\\dfrac{5}{6}$"],
    comparator: "mcq_exact",
    hint: "$1 - P(6) = 1 - \\dfrac{1}{6}$.",
    explanation: exp(
      "« Ne pas obtenir 6 » est l'événement contraire de « obtenir 6 ».",
      "$P(\\overline{6}) = 1 - \\dfrac{1}{6}$.",
      "$= \\dfrac{5}{6}$.",
      "$\\dfrac{5}{6}$."
    ),
    tags: ["seconde", "maths", "probabilites", "contraire", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_proba_contr_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_ensemble_fini",
    microId: "proba_evenement_contraire",
    difficulty: 3,
    theme: "neutral",
    hint: "$P(\\overline{A}) = 1 - P(A)$.",
    tags: ["seconde", "maths", "probabilites", "contraire", "template"],
    generate: () => {
      const pa = randomInt(1, 9) / 10;
      const pc = Math.round((1 - pa) * 10) / 10;
      const paStr = String(pa).replace(".", ",");
      const pcStr = String(pc).replace(".", ",");
      return {
        text: `Si $P(A) = ${paStr}$, que vaut $P(\\overline{A})$ ?`,
        format: "short",
        expected: [pcStr, String(pc)],
        comparator: "number_equal",
        explanation: exp(
          "On applique $P(\\overline{A}) = 1 - P(A)$.",
          `$1 - ${paStr}$.`,
          `$= ${pcStr}$.`,
          `$P(\\overline{A}) = ${pcStr}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_proba_contr_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_ensemble_fini",
    microId: "proba_evenement_contraire",
    difficulty: 4,
    theme: "neutral",
    hint: "Contraire d'« au moins un » = « aucun ».",
    tags: ["seconde", "maths", "probabilites", "contraire", "raisonnement", "template"],
    generate: () => {
      const correct = "« aucun »";
      const choices = ["« aucun »", "« tous »", "« exactement un »", "« au plus un »"];
      return {
        text: "Quel est l'événement contraire de « obtenir au moins un succès » ?",
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Le contraire de « au moins un » est « zéro ».",
          "« Au moins un succès » échoue seulement s'il n'y en a aucun.",
          "Donc le contraire est « aucun succès ».",
          "« Aucun »."
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_proba_contr_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_ensemble_fini",
    microId: "proba_evenement_contraire",
    difficulty: 4,
    theme: "neutral",
    text: "Pourquoi passe-t-on souvent par l'événement contraire pour calculer « au moins un » ?",
    format: "qcm",
    choices: [
      "Car « aucun » est souvent plus simple à calculer, puis on fait $1 - P$",
      "Car c'est interdit de calculer directement",
      "Car le contraire a toujours une probabilité nulle",
      "Car cela change le résultat",
    ],
    expected: ["Car « aucun » est souvent plus simple à calculer, puis on fait $1 - P$"],
    comparator: "mcq_exact",
    hint: "Astuce de calcul.",
    explanation: exp(
      "Calculer « au moins un » directement demande plusieurs cas.",
      "Le contraire « aucun » est souvent un seul calcul.",
      "On obtient ensuite $P(\\text{au moins un}) = 1 - P(\\text{aucun})$.",
      "Car « aucun » est plus simple, puis $1 - P$."
    ),
    tags: ["seconde", "maths", "probabilites", "contraire", "raisonnement", "qcm"],
  },

  /* ===================== PROBA_REUNION_INTERSECTION ===================== */

  {
    kind: "fixed",
    id: "seconde_proba_ri_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_ensemble_fini",
    microId: "proba_reunion_intersection",
    difficulty: 2,
    theme: "neutral",
    text: "L'événement $A \\cup B$ (réunion) se réalise quand :",
    format: "qcm",
    choices: ["$A$ OU $B$ se réalise (au moins l'un)", "$A$ ET $B$ se réalisent", "ni $A$ ni $B$", "seulement $A$"],
    expected: ["$A$ OU $B$ se réalise (au moins l'un)"],
    comparator: "mcq_exact",
    hint: "Réunion = « ou ».",
    explanation: exp(
      "La réunion $A \\cup B$ correspond au « ou ».",
      "Elle se réalise si $A$ ou $B$ (ou les deux) se réalise.",
      "C'est « au moins l'un des deux ».",
      "$A$ ou $B$ se réalise."
    ),
    tags: ["seconde", "maths", "probabilites", "reunion_intersection", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_proba_ri_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_ensemble_fini",
    microId: "proba_reunion_intersection",
    difficulty: 2,
    theme: "neutral",
    text: "L'événement $A \\cap B$ (intersection) se réalise quand :",
    format: "qcm",
    choices: ["$A$ ET $B$ se réalisent en même temps", "$A$ ou $B$ se réalise", "ni $A$ ni $B$", "seulement $B$"],
    expected: ["$A$ ET $B$ se réalisent en même temps"],
    comparator: "mcq_exact",
    hint: "Intersection = « et ».",
    explanation: exp(
      "L'intersection $A \\cap B$ correspond au « et ».",
      "Elle se réalise si $A$ et $B$ se produisent simultanément.",
      "C'est « les deux à la fois ».",
      "$A$ et $B$ se réalisent en même temps."
    ),
    tags: ["seconde", "maths", "probabilites", "reunion_intersection", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_proba_ri_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_ensemble_fini",
    microId: "proba_reunion_intersection",
    difficulty: 3,
    theme: "neutral",
    text: "Deux événements sont dits « incompatibles » lorsque :",
    format: "qcm",
    choices: [
      "ils ne peuvent pas se réaliser en même temps ($A \\cap B$ est vide)",
      "ils ont la même probabilité",
      "leur réunion est vide",
      "ils sont contraires",
    ],
    expected: ["ils ne peuvent pas se réaliser en même temps ($A \\cap B$ est vide)"],
    comparator: "mcq_exact",
    hint: "Pas d'issue commune.",
    explanation: exp(
      "Deux événements incompatibles n'ont aucune issue commune.",
      "Leur intersection est vide : $P(A \\cap B) = 0$.",
      "Ils ne peuvent pas se produire ensemble.",
      "$A \\cap B$ est vide."
    ),
    tags: ["seconde", "maths", "probabilites", "reunion_intersection", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_proba_ri_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_ensemble_fini",
    microId: "proba_reunion_intersection",
    difficulty: 3,
    theme: "neutral",
    text: "On lance un dé. $A$ = « pair », $B$ = « obtenir 6 ». Que vaut $A \\cap B$ ?",
    format: "qcm",
    choices: ["$\\{6\\}$", "$\\{2, 4, 6\\}$", "$\\varnothing$ (vide)", "$\\{1, 3, 5\\}$"],
    expected: ["$\\{6\\}$"],
    comparator: "mcq_exact",
    hint: "Issues à la fois paires ET égales à 6.",
    explanation: exp(
      "L'intersection regroupe les issues communes aux deux événements.",
      "Pair $= \\{2,4,6\\}$ ; « obtenir 6 » $= \\{6\\}$.",
      "L'issue commune est $6$.",
      "$A \\cap B = \\{6\\}$."
    ),
    tags: ["seconde", "maths", "probabilites", "reunion_intersection", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_proba_ri_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_ensemble_fini",
    microId: "proba_reunion_intersection",
    difficulty: 3,
    theme: "neutral",
    text: "Pour deux événements incompatibles, que vaut $P(A \\cap B)$ ?",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "Aucune issue commune.",
    explanation: exp(
      "Incompatibles signifie aucune issue commune.",
      "L'intersection est vide.",
      "$P(A \\cap B) = 0$.",
      "$P(A \\cap B) = 0$."
    ),
    tags: ["seconde", "maths", "probabilites", "reunion_intersection", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_proba_ri_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_ensemble_fini",
    microId: "proba_reunion_intersection",
    difficulty: 4,
    theme: "neutral",
    text: "On lance un dé. $A$ = « pair » $= \\{2,4,6\\}$, $B$ = « $> 3$ » $= \\{4,5,6\\}$. Que vaut $A \\cap B$ ?",
    format: "qcm",
    choices: ["$\\{4, 6\\}$", "$\\{6\\}$", "$\\{2, 4, 5, 6\\}$", "$\\{5\\}$"],
    expected: ["$\\{4, 6\\}$"],
    comparator: "mcq_exact",
    hint: "Issues à la fois paires ET $> 3$.",
    explanation: exp(
      "On cherche les issues présentes dans les deux ensembles.",
      "$\\{2,4,6\\}$ et $\\{4,5,6\\}$ : communes $= 4$ et $6$.",
      "$A \\cap B = \\{4, 6\\}$.",
      "$\\{4, 6\\}$."
    ),
    tags: ["seconde", "maths", "probabilites", "reunion_intersection", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_proba_ri_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_ensemble_fini",
    microId: "proba_reunion_intersection",
    difficulty: 2,
    theme: "neutral",
    hint: "Réunion = « ou » ; intersection = « et ».",
    tags: ["seconde", "maths", "probabilites", "reunion_intersection", "raisonnement", "template"],
    generate: () => {
      const inter = Math.random() < 0.5;
      const symb = inter ? "A \\cap B" : "A \\cup B";
      const correct = inter ? "« $A$ ET $B$ »" : "« $A$ OU $B$ »";
      const choices = ["« $A$ ET $B$ »", "« $A$ OU $B$ »", "« ni $A$ ni $B$ »", "« $A$ contraire »"];
      return {
        text: `À quoi correspond l'événement $${symb}$ ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On traduit le symbole ensembliste.",
          inter ? "$\\cap$ signifie « et » (intersection)." : "$\\cup$ signifie « ou » (réunion).",
          `Donc $${symb}$ correspond à ${correct}.`,
          `${correct}.`
        ),
      };
    },
  },

  /* ===================== PROBA_FORMULE_UNION ===================== */

  {
    kind: "fixed",
    id: "seconde_proba_union_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_ensemble_fini",
    microId: "proba_formule_union",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la formule reliant réunion et intersection ?",
    format: "qcm",
    choices: [
      "$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$",
      "$P(A \\cup B) = P(A) + P(B)$",
      "$P(A \\cup B) = P(A) \\times P(B)$",
      "$P(A \\cup B) = P(A) - P(B)$",
    ],
    expected: ["$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$"],
    comparator: "mcq_exact",
    hint: "On retire ce qui est compté deux fois.",
    explanation: exp(
      "En additionnant $P(A)$ et $P(B)$, l'intersection est comptée deux fois.",
      "On la retire une fois.",
      "$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$.",
      "C'est la formule du crible."
    ),
    tags: ["seconde", "maths", "probabilites", "formule_union", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_proba_union_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_ensemble_fini",
    microId: "proba_formule_union",
    difficulty: 3,
    theme: "neutral",
    text: "Avec $P(A) = 0{,}4$, $P(B) = 0{,}5$ et $P(A \\cap B) = 0{,}2$, que vaut $P(A \\cup B)$ ?",
    format: "short",
    expected: ["0,7", "0.7"],
    comparator: "number_equal",
    hint: "$0{,}4 + 0{,}5 - 0{,}2$.",
    explanation: exp(
      "On applique $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$.",
      "$0{,}4 + 0{,}5 - 0{,}2$.",
      "$= 0{,}7$.",
      "$P(A \\cup B) = 0{,}7$."
    ),
    tags: ["seconde", "maths", "probabilites", "formule_union", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_proba_union_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_ensemble_fini",
    microId: "proba_formule_union",
    difficulty: 3,
    theme: "neutral",
    text: "Pour deux événements incompatibles, la formule devient :",
    format: "qcm",
    choices: [
      "$P(A \\cup B) = P(A) + P(B)$",
      "$P(A \\cup B) = P(A) \\times P(B)$",
      "$P(A \\cup B) = P(A) - P(B)$",
      "$P(A \\cup B) = 0$",
    ],
    expected: ["$P(A \\cup B) = P(A) + P(B)$"],
    comparator: "mcq_exact",
    hint: "Ici $P(A \\cap B) = 0$.",
    explanation: exp(
      "Pour des incompatibles, $P(A \\cap B) = 0$.",
      "La formule générale se simplifie.",
      "$P(A \\cup B) = P(A) + P(B)$.",
      "$P(A) + P(B)$."
    ),
    tags: ["seconde", "maths", "probabilites", "formule_union", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_proba_union_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_ensemble_fini",
    microId: "proba_formule_union",
    difficulty: 4,
    theme: "neutral",
    text: "Avec $P(A) = 0{,}6$, $P(B) = 0{,}3$ et $P(A \\cup B) = 0{,}8$, que vaut $P(A \\cap B)$ ?",
    format: "short",
    expected: ["0,1", "0.1"],
    comparator: "number_equal",
    hint: "$P(A \\cap B) = P(A) + P(B) - P(A \\cup B)$.",
    explanation: exp(
      "On isole l'intersection dans la formule.",
      "$P(A \\cap B) = 0{,}6 + 0{,}3 - 0{,}8$.",
      "$= 0{,}1$.",
      "$P(A \\cap B) = 0{,}1$."
    ),
    tags: ["seconde", "maths", "probabilites", "formule_union", "short"],
  },

  {
    kind: "template",
    id: "seconde_proba_union_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_ensemble_fini",
    microId: "proba_formule_union",
    difficulty: 3,
    theme: "neutral",
    hint: "$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$.",
    tags: ["seconde", "maths", "probabilites", "formule_union", "template"],
    generate: () => {
      const pa = randomInt(2, 5) / 10;
      const pb = randomInt(2, 4) / 10;
      const pinter = randomInt(1, Math.min(Math.round(pa * 10), Math.round(pb * 10))) / 10;
      const punion = Math.round((pa + pb - pinter) * 10) / 10;
      const fmt = (x: number) => String(x).replace(".", ",");
      return {
        text: `Avec $P(A) = ${fmt(pa)}$, $P(B) = ${fmt(pb)}$ et $P(A \\cap B) = ${fmt(pinter)}$, que vaut $P(A \\cup B)$ ?`,
        format: "short",
        expected: [fmt(punion), String(punion)],
        comparator: "number_equal",
        explanation: exp(
          "On applique la formule du crible.",
          `$${fmt(pa)} + ${fmt(pb)} - ${fmt(pinter)}$.`,
          `$= ${fmt(punion)}$.`,
          `$P(A \\cup B) = ${fmt(punion)}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_proba_union_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_ensemble_fini",
    microId: "proba_formule_union",
    difficulty: 4,
    theme: "neutral",
    hint: "$P(A \\cap B) = P(A) + P(B) - P(A \\cup B)$.",
    tags: ["seconde", "maths", "probabilites", "formule_union", "template"],
    generate: () => {
      const pa = randomInt(3, 6) / 10;
      const pb = randomInt(2, 4) / 10;
      const pinter = randomInt(1, Math.min(Math.round(pa * 10), Math.round(pb * 10))) / 10;
      const punion = Math.round((pa + pb - pinter) * 10) / 10;
      const fmt = (x: number) => String(x).replace(".", ",");
      return {
        text: `Avec $P(A) = ${fmt(pa)}$, $P(B) = ${fmt(pb)}$ et $P(A \\cup B) = ${fmt(punion)}$, que vaut $P(A \\cap B)$ ?`,
        format: "short",
        expected: [fmt(pinter), String(pinter)],
        comparator: "number_equal",
        explanation: exp(
          "On isole l'intersection.",
          `$P(A \\cap B) = ${fmt(pa)} + ${fmt(pb)} - ${fmt(punion)}$.`,
          `$= ${fmt(pinter)}$.`,
          `$P(A \\cap B) = ${fmt(pinter)}$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_proba_union_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_ensemble_fini",
    microId: "proba_formule_union",
    difficulty: 3,
    theme: "neutral",
    text: "Pourquoi soustrait-on $P(A \\cap B)$ dans la formule de la réunion ?",
    format: "qcm",
    choices: [
      "Car l'intersection est comptée deux fois dans $P(A) + P(B)$",
      "Car l'intersection est toujours nulle",
      "Pour rendre le résultat négatif",
      "Pour annuler $P(B)$",
    ],
    expected: ["Car l'intersection est comptée deux fois dans $P(A) + P(B)$"],
    comparator: "mcq_exact",
    hint: "Pense à un diagramme.",
    explanation: exp(
      "En ajoutant $P(A)$ et $P(B)$, la zone commune est comptée deux fois.",
      "Il faut la retirer une fois pour ne pas la sur-compter.",
      "D'où le $- P(A \\cap B)$.",
      "Car l'intersection est comptée deux fois."
    ),
    tags: ["seconde", "maths", "probabilites", "formule_union", "raisonnement", "qcm"],
  },

  /* ===================== PROBA_TABLEAU_ARBRE ===================== */

  {
    kind: "fixed",
    id: "seconde_proba_arbre_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_ensemble_fini",
    microId: "proba_tableau_arbre",
    difficulty: 2,
    theme: "neutral",
    text: "Pour organiser une expérience à deux étapes, on utilise souvent :",
    format: "qcm",
    choices: ["un arbre de probabilités ou un tableau", "un cercle", "une parabole", "un vecteur"],
    expected: ["un arbre de probabilités ou un tableau"],
    comparator: "mcq_exact",
    hint: "Outils pour dénombrer les cas.",
    explanation: exp(
      "Un arbre ou un tableau permet de lister toutes les possibilités.",
      "Ils organisent les issues d'une expérience à plusieurs étapes.",
      "On y lit facilement les probabilités.",
      "Un arbre ou un tableau."
    ),
    tags: ["seconde", "maths", "probabilites", "tableau_arbre", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_proba_arbre_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_ensemble_fini",
    microId: "proba_tableau_arbre",
    difficulty: 3,
    theme: "neutral",
    text: "Sur un arbre de probabilités, pour obtenir la probabilité d'un chemin (suite de branches), on :",
    format: "qcm",
    choices: ["multiplie les probabilités des branches", "additionne les probabilités", "soustrait", "prend la plus grande"],
    expected: ["multiplie les probabilités des branches"],
    comparator: "mcq_exact",
    hint: "Le long d'un chemin → on multiplie.",
    explanation: exp(
      "La probabilité d'un chemin est le produit des probabilités rencontrées.",
      "On multiplie le long des branches successives.",
      "(On additionne entre plusieurs chemins, mais on multiplie le long d'un chemin.)",
      "On multiplie les probabilités des branches."
    ),
    tags: ["seconde", "maths", "probabilites", "tableau_arbre", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_proba_arbre_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_ensemble_fini",
    microId: "proba_tableau_arbre",
    difficulty: 3,
    theme: "neutral",
    text: "On lance deux fois une pièce équilibrée. D'après l'arbre, quelle est la probabilité d'obtenir « pile puis pile » ?",
    format: "qcm",
    choices: ["$\\dfrac{1}{4}$", "$\\dfrac{1}{2}$", "$\\dfrac{1}{3}$", "$\\dfrac{3}{4}$"],
    expected: ["$\\dfrac{1}{4}$"],
    comparator: "mcq_exact",
    canvas: {
      kind: "arbre_proba",
      titre: "Deux lancers d'une pièce",
      racineEnfants: [
        { label: "P", proba: "0,5", enfants: [{ label: "P", proba: "0,5" }, { label: "F", proba: "0,5" }] },
        { label: "F", proba: "0,5", enfants: [{ label: "P", proba: "0,5" }, { label: "F", proba: "0,5" }] },
      ],
    },
    hint: "On multiplie le long du chemin : $\\dfrac{1}{2} \\times \\dfrac{1}{2}$.",
    explanation: exp(
      "La probabilité d'un chemin est le produit des branches.",
      "« Pile puis pile » : $\\dfrac{1}{2} \\times \\dfrac{1}{2}$.",
      "$= \\dfrac{1}{4}$.",
      "$\\dfrac{1}{4}$."
    ),
    tags: ["seconde", "maths", "probabilites", "tableau_arbre", "canvas", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_proba_arbre_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_ensemble_fini",
    microId: "proba_tableau_arbre",
    difficulty: 3,
    theme: "neutral",
    text: "On lance deux fois une pièce. Combien y a-t-il d'issues possibles (PP, PF, FP, FF) ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "$2 \\times 2$.",
    explanation: exp(
      "À chaque lancer, 2 résultats possibles.",
      "Pour deux lancers : $2 \\times 2$.",
      "$= 4$ issues (PP, PF, FP, FF).",
      "Il y a $4$ issues."
    ),
    tags: ["seconde", "maths", "probabilites", "tableau_arbre", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_proba_arbre_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_ensemble_fini",
    microId: "proba_tableau_arbre",
    difficulty: 4,
    theme: "neutral",
    text: "On lance deux fois une pièce. Quelle est la probabilité d'obtenir « exactement un pile » ?",
    format: "qcm",
    choices: ["$\\dfrac{1}{2}$", "$\\dfrac{1}{4}$", "$\\dfrac{3}{4}$", "$\\dfrac{1}{3}$"],
    expected: ["$\\dfrac{1}{2}$"],
    comparator: "mcq_exact",
    hint: "Cas favorables : PF et FP, sur 4 issues.",
    explanation: exp(
      "On compte les issues avec exactement un pile.",
      "PF et FP conviennent : 2 issues sur 4.",
      "$P = \\dfrac{2}{4} = \\dfrac{1}{2}$.",
      "$\\dfrac{1}{2}$."
    ),
    tags: ["seconde", "maths", "probabilites", "tableau_arbre", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_proba_arbre_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_ensemble_fini",
    microId: "proba_tableau_arbre",
    difficulty: 4,
    theme: "neutral",
    text: "Sur un arbre, pour calculer la probabilité d'un événement réalisé par plusieurs chemins, on :",
    format: "qcm",
    choices: [
      "additionne les probabilités des différents chemins",
      "multiplie les chemins entre eux",
      "garde le plus grand chemin",
      "soustrait les chemins",
    ],
    expected: ["additionne les probabilités des différents chemins"],
    comparator: "mcq_exact",
    hint: "Entre plusieurs chemins → on additionne.",
    explanation: exp(
      "Le long d'un chemin on multiplie ; entre plusieurs chemins on additionne.",
      "Un événement peut être atteint par plusieurs chemins.",
      "On somme alors leurs probabilités.",
      "On additionne les probabilités des chemins."
    ),
    tags: ["seconde", "maths", "probabilites", "tableau_arbre", "raisonnement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_proba_arbre_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_ensemble_fini",
    microId: "proba_tableau_arbre",
    difficulty: 3,
    theme: "neutral",
    hint: "Nombre d'issues $= $ produit des possibilités à chaque étape.",
    tags: ["seconde", "maths", "probabilites", "tableau_arbre", "template"],
    generate: () => {
      const a = randomInt(2, 4);
      const b = randomInt(2, 4);
      return {
        text: `Une expérience a $${a}$ résultats à la 1re étape et $${b}$ à la 2e. Combien d'issues au total ?`,
        format: "short",
        expected: [String(a * b)],
        comparator: "number_equal",
        explanation: exp(
          "On multiplie le nombre de possibilités de chaque étape.",
          `$${a} \\times ${b}$.`,
          `$= ${a * b}$.`,
          `Il y a $${a * b}$ issues.`
        ),
      };
    },
  },
];
