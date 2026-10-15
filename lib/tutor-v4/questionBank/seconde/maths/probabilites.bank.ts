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

import type { TutorBankItemV4, TutorGeneratedQuestionV4, CanvasFigure } from "@/lib/tutor-v4/types";

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
    generate: () => vocEvenementP(),
  },

  // ⭐ 15/10/2026 : les générateurs (voir en fin de fichier).
  gabP("seconde_proba_voc_tpl_2", "proba_vocabulaire", 1, "Une issue = un résultat possible.", vocIssuesP),
  gabP("seconde_proba_voc_tpl_3", "proba_vocabulaire", 3, "Certain : toutes les issues ; impossible : aucune.", vocNatureP),
  gabP("seconde_proba_voc_tpl_4", "proba_vocabulaire", 3, "Passe chaque issue en revue.", vocEvenementP),

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
    generate: () => modManquanteP(),
  },

  // ⭐ 15/10/2026 : les générateurs (voir en fin de fichier).
  gabP("seconde_proba_mod_tpl_2", "proba_modele", 2, "Équiprobable : $\\dfrac{1}{\\text{nombre d'issues}}$.", modEquiP),
  gabP("seconde_proba_mod_tpl_3", "proba_modele", 2, "Chaque valeur entre 0 et 1, somme égale à 1.", () => modValideP(false)),
  gabP("seconde_proba_mod_tpl_4", "proba_modele", 4, "Compte les parts : leur somme vaut 1.", modParametreP),
  gabP("seconde_proba_mod_tpl_5", "proba_modele", 4, "Vérifie le signe de chaque valeur, puis la somme.", () => modValideP(true)),

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
    generate: () => calcManquanteP(),
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
    generate: () => calcLoiDecP(true),
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

  // ⭐ 15/10/2026 : les générateurs (voir en fin de fichier).
  gabP("seconde_proba_calc_tpl_3", "proba_calculer", 2, "Additionne les probabilités des issues de l'événement.", () => calcLoiDecP(false)),
  gabP("seconde_proba_calc_tpl_4", "proba_calculer", 3, "Probabilité d'un secteur = angle ÷ 360°.", calcRoueAnglesP),
  gabP("seconde_proba_calc_tpl_5", "proba_calculer", 4, "Compte les parts : leur somme vaut 1.", calcParametreP),
  gabP("seconde_proba_calc_tpl_6", "proba_calculer", 4, "Chaque issue ne compte qu'une fois.", calcUnionP),

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
    generate: () => contrLoiP(),
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
    generate: () => contrAuMoinsP(),
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

  // ⭐ 15/10/2026 : les générateurs (voir en fin de fichier).
  gabP("seconde_proba_contr_tpl_3", "proba_evenement_contraire", 2, "$P(\\overline{A}) = 1 - P(A)$.", contrSimpleP),

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
    generate: () => riEnsembleP(),
  },

  // ⭐ 15/10/2026 : les générateurs (voir en fin de fichier).
  gabP("seconde_proba_ri_tpl_2", "proba_reunion_intersection", 3, "Incompatibles : aucune issue commune.", riIncompatP),
  gabP("seconde_proba_ri_tpl_3", "proba_reunion_intersection", 4, "$\\overline{A}$ : les issues hors de A.", riComplementP),
  gabP("seconde_proba_ri_tpl_4", "proba_reunion_intersection", 4, "Liste d'abord les issues de l'événement.", calcUnionP),

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
    generate: () => unionFormuleP(),
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
    generate: () => unionEnversP(),
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

  // ⭐ 15/10/2026 : les générateurs (voir en fin de fichier).
  gabP("seconde_proba_union_tpl_3", "proba_formule_union", 2, "Incompatibles : $P(A \\cup B) = P(A) + P(B)$.", unionIncompatP),

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
    generate: () => arbreCheminP(true),
  },

  // ⭐ 15/10/2026 : les générateurs (voir en fin de fichier).
  gabP("seconde_proba_arbre_tpl_2", "proba_tableau_arbre", 2, "Chaque choix se combine avec chaque choix.", arbreCompterP),
  gabP("seconde_proba_arbre_tpl_3", "proba_tableau_arbre", 2, "On multiplie le long du chemin.", () => arbreCheminP(false)),
  gabP("seconde_proba_arbre_tpl_4", "proba_tableau_arbre", 3, "Tableau à double entrée : toutes les cases sont équiprobables.", () => arbreTableauDesP(false)),
  gabP("seconde_proba_arbre_tpl_5", "proba_tableau_arbre", 4, "Multiplie le long des chemins, additionne les chemins.", arbrePlusieursP),
  gabP("seconde_proba_arbre_tpl_6", "proba_tableau_arbre", 4, "Compte les cases du tableau.", () => arbreTableauDesP(true)),
];

/* =========================================================================
   ⛔⛔ 15/10/2026 — « DES QUESTIONS REVIENNENT » : LES PROBABILITÉS DE SECONDE.
   Mesuré avant (scripts/mesurer-squelettes-coach.ts seconde
   probabilites_ensemble_fini) : les 7 micros sous le seuil, 7 à 10
   squelettes, 15 à 18 répétitions sur une série de 20 à la même étoile.
   Même méthode que la 3e (dd5e9f75) : chaque gabarit croise une SITUATION
   (dé truqué, roue de kermesse aux secteurs inégaux, buts d'un match, pêche à
   Saint-Gilles, car jaune, météo, glaces du snack, playlist maloya/séga,
   tombola, trail de Cilaos…) × un ÉVÉNEMENT × une TOURNURE, nombres tirés.
   Le cran de seconde : une LOI de probabilité sur un univers fini, issues
   souvent NON équiprobables ; P(A) = somme des probabilités des issues de A ;
   contraire, réunion, intersection, P(A∪B) = P(A) + P(B) − P(A∩B), tableau et
   arbre.
   ⭐ Réponses libres : `ecrituresP` donne toutes les écritures acceptées
   (fraction irréductible ou non, décimal virgule/point, pourcentage).
   ⭐ QCM : leurres de vraies erreurs, jamais deux choix de même valeur.
   Les items figés et leurs ids sont gardés ; les anciens gabarits appellent
   les générateurs ci-dessous.
========================================================================= */

type QP = TutorGeneratedQuestionV4;

const pk = <T,>(arr: readonly T[]): T => arr[Math.floor(Math.random() * arr.length)];
function melangeP<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
const majP = (s: string): string => (s.startsWith("« ") ? `« ${majP(s.slice(2))}` : s.charAt(0).toUpperCase() + s.slice(1));
const listeOuP = (xs: string[]) => (xs.length <= 1 ? xs.join("") : `${xs.slice(0, -1).join(", ")} ou ${xs[xs.length - 1]}`);
const listeEtP = (xs: string[]) => (xs.length <= 1 ? xs.join("") : `${xs.slice(0, -1).join(", ")} et ${xs[xs.length - 1]}`);
function pgcdP(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : pgcdP(b, a % b);
}
const redP = (a: number, b: number): [number, number] => (a === 0 ? [0, 1] : [a / pgcdP(a, b), b / pgcdP(a, b)]);
/** 0.35 → « 0,35 ». */
const frP = (x: number) => String(Math.round(x * 10000) / 10000).replace(".", ",");
/** Centièmes → « 0,35 ». */
const cP = (c: number) => frP(c / 100);
/** a/b à l'écran : décimal si `dec` et que ça tombe juste, sinon fraction irréductible. */
function affP(a: number, b: number, dec: boolean): string {
  const [n, d] = redP(a, b);
  if (n === 0) return "0";
  if (d === 1) return String(n);
  if (dec && 100 % d === 0) return frP(n / d);
  return `$\\dfrac{${n}}{${d}}$`;
}
/** Fraction brute (non réduite). */
const tfP = (a: number, b: number) => (a === 0 ? "0" : `$\\dfrac{${a}}{${b}}$`);
/** « 6/36 = 1/6 » quand la fraction se simplifie. */
const fracEgP = (a: number, b: number) => (redP(a, b)[1] !== b ? `${tfP(a, b)} = ${affP(a, b, false)}` : tfP(a, b));
function decimaleP(a: number, b: number): string | null {
  let d = redP(a, b)[1];
  while (d % 2 === 0) d /= 2;
  while (d % 5 === 0) d /= 5;
  return d === 1 ? frP(a / b) : null;
}
/**
 * Toutes les écritures acceptées de a/b. Sur 100 (une loi écrite en
 * décimal), le corrigé affiché est le décimal ; sinon la fraction irréductible.
 */
function ecrituresP(a: number, b: number): string[] {
  const [n, d] = redP(a, b);
  const out: string[] = [];
  if (b === 100 && a > 0 && a < 100) out.push(frP(a / 100));
  out.push(n === 0 ? "0" : n === d ? "1" : `${n}/${d}`);
  for (let m = 2; m <= 30 && d * m <= Math.max(b, 100); m++) out.push(`${n * m}/${d * m}`);
  out.push(`${a}/${b}`);
  const dec = decimaleP(a, b);
  if (dec !== null) out.push(dec, dec.replace(",", "."));
  const v = (100 * a) / b;
  if (Math.abs(v - Math.round(v * 100) / 100) < 1e-9) {
    const pc = frP(Math.round(v * 100) / 100);
    out.push(`${pc} %`, `${pc}%`);
  }
  return [...new Set(out)];
}
/**
 * QCM : la bonne valeur a/D et trois leurres DISTINCTS EN VALEUR, dans ]0 ; 1[.
 * Les pièges (numérateurs sur D) passent d'abord, des voisins complètent.
 */
function qcmP(a: number, D: number, pieges: number[], dec: boolean): { choices: string[]; expected: string[] } {
  const pas = dec && D === 100 ? 5 : 1;
  const secours = [a + pas, a - pas, a + 2 * pas, a - 2 * pas, a + 3 * pas, a - 3 * pas, a + 4 * pas];
  const pris: number[] = [];
  for (const x of [...melangeP(pieges), ...secours]) {
    if (pris.length === 3) break;
    if (!Number.isInteger(x) || x <= 0 || x >= D) continue;
    if ([a, ...pris].some((y) => redP(y, D).join("/") === redP(x, D).join("/"))) continue;
    pris.push(x);
  }
  const c = affP(a, D, dec);
  return { choices: melangeP([c, ...pris.map((x) => affP(x, D, dec))]), expected: [c] };
}
/** Un QCM de textes : bonne réponse + trois leurres distincts. */
function qcmT(bon: string, leurres: string[]): { choices: string[]; expected: string[] } {
  const d = melangeP([...new Set(leurres)].filter((w) => w !== bon)).slice(0, 3);
  return { choices: melangeP([bon, ...d]), expected: [bon] };
}
/** k probabilités positives (au moins `min`), multiples de `pas`, de somme D. */
function loiAleatoire(k: number, D: number, pas: number, min = pas): number[] {
  const vals = Array(k).fill(min);
  for (let s = min * k; s < D; s += pas) vals[Math.floor(Math.random() * k)] += pas;
  return vals;
}
const NOMS_P = ["Inès", "Hugo", "Léa", "Mamadou", "Chloé", "Yanis", "Aïcha", "Lucas", "Emma", "Kévin", "Maëlle", "Noah", "Anaïs", "Dylan", "Sarah", "Teddy"];
const VILLES_P = ["Saint-Pierre", "Saint-Denis", "Saint-Joseph", "Saint-André", "Sainte-Marie", "Saint-Benoît", "Saint-Louis", "Saint-Paul"];
const HEX_P = ["#ef4444", "#3b82f6", "#22c55e", "#eab308", "#a855f7", "#f97316"];
function tableauLoiP(issues: string[], probas: string[]): CanvasFigure {
  return { kind: "probabilites", variant: "tableau", tableau: { entetes: ["Issue", ...issues], lignes: [["Probabilité", ...probas]] } };
}
const ensP = (xs: (string | number)[]) =>
  xs.length ? `$\\{${xs.map((x) => (/^\d+$/.test(String(x)) ? x : `\\text{${x}}`)).join("\\,;\\,")}\\}$` : "$\\varnothing$";

function gabP(id: string, microId: string, difficulty: 1 | 2 | 3 | 4, hint: string, generate: () => QP): TutorBankItemV4 {
  return {
    kind: "template",
    id,
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_ensemble_fini",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["seconde", "maths", "probabilites", microId.replace("proba_", ""), "template"],
    generate,
  };
}

/* ---------- Situations à issues NUMÉRIQUES ---------- */
type CtxNumP = {
  sit: (p: string) => string;
  vals: () => number[];
  /** « le numéro obtenu », « le nombre de buts ». */
  sujet: string;
  parite: boolean;
  de?: boolean;
};
const CTX_NUM_P: CtxNumP[] = [
  { sit: (p) => `${p} lance un dé à six faces truqué et note le numéro de la face du dessus.`, vals: () => [1, 2, 3, 4, 5, 6], sujet: "le numéro obtenu", parite: true, de: true },
  { sit: (p) => `${p} lance un dé à quatre faces mal équilibré, numéroté de 1 à 4.`, vals: () => [1, 2, 3, 4], sujet: "le numéro obtenu", parite: true },
  { sit: (p) => `Pour un jeu de rôle, ${p} lance un dé à huit faces déséquilibré, numéroté de 1 à 8.`, vals: () => [1, 2, 3, 4, 5, 6, 7, 8], sujet: "le numéro obtenu", parite: true },
  { sit: (p) => `À la kermesse, ${p} fait tourner une roue dont les secteurs numérotés n'ont pas tous la même taille.`, vals: () => Array.from({ length: pk([4, 5, 6]) }, (_, i) => i + 1), sujet: "le numéro du secteur", parite: true },
  { sit: () => `On s'intéresse au nombre de buts que marquera l'équipe de foot de ${pk(VILLES_P)} lors de son prochain match.`, vals: () => [0, 1, 2, 3, 4], sujet: "le nombre de buts", parite: true },
  { sit: (p) => `${p} part pêcher au large de Saint-Gilles. On note le nombre de poissons pris dans la matinée.`, vals: () => [0, 1, 2, 3, 4], sujet: "le nombre de poissons", parite: true },
  { sit: (p) => `${p} lance une fléchette sur une cible et note le nombre de points marqués.`, vals: () => pk([[0, 1, 3, 5, 10], [0, 2, 5, 10, 20], [0, 10, 25, 50]]), sujet: "le nombre de points", parite: false },
  { sit: (p) => `On note le retard, en minutes, du car jaune que ${p} prend le matin.`, vals: () => [0, 5, 10, 15, 20], sujet: "le retard", parite: false },
  { sit: (p) => `${p} tire trois penalties. On note le nombre de tirs réussis.`, vals: () => [0, 1, 2, 3], sujet: "le nombre de tirs réussis", parite: true },
  { sit: () => `On choisit au hasard une famille d'un quartier de ${pk(VILLES_P)} et on note son nombre d'enfants.`, vals: () => [0, 1, 2, 3, 4], sujet: "le nombre d'enfants", parite: true },
  { sit: (p) => `En un quart d'heure de session à Saint-Leu, on note le nombre de vagues surfées par ${p}.`, vals: () => [0, 1, 2, 3, 4, 5], sujet: "le nombre de vagues", parite: true },
  { sit: (p) => `${p} joue au loto de la fête du village : on note combien de numéros de sa grille sortent.`, vals: () => [0, 1, 2, 3], sujet: "le nombre de bons numéros", parite: true },
  { sit: () => `On choisit au hasard un élève de seconde et on note le nombre de frères et sœurs qu'il a.`, vals: () => [0, 1, 2, 3, 4], sujet: "le nombre de frères et sœurs", parite: true },
  { sit: (p) => `Aux petits chevaux, ${p} lance un dé truqué pour sortir son cheval.`, vals: () => [1, 2, 3, 4, 5, 6], sujet: "le numéro obtenu", parite: true, de: true },
];
type EvtP = { lib: string; set: number[]; /** l'ensemble avec l'erreur de borne */ borne?: number[] };
function evenementsNumP(c: CtxNumP, vals: number[]): EvtP[] {
  const s = c.sujet;
  const out: EvtP[] = [];
  if (c.parite) {
    out.push({ lib: `${s} est pair`, set: vals.filter((v) => v % 2 === 0) });
    out.push({ lib: `${s} est impair`, set: vals.filter((v) => v % 2 !== 0) });
  }
  for (const t of vals.slice(1, -1)) {
    out.push({ lib: `${s} est supérieur ou égal à ${t}`, set: vals.filter((v) => v >= t), borne: vals.filter((v) => v > t) });
    out.push({ lib: `${s} est strictement supérieur à ${t}`, set: vals.filter((v) => v > t), borne: vals.filter((v) => v >= t) });
    out.push({ lib: `${s} est inférieur ou égal à ${t}`, set: vals.filter((v) => v <= t), borne: vals.filter((v) => v < t) });
    out.push({ lib: `${s} est strictement inférieur à ${t}`, set: vals.filter((v) => v < t), borne: vals.filter((v) => v <= t) });
    out.push({ lib: `${s} est différent de ${t}`, set: vals.filter((v) => v !== t) });
  }
  const mid = vals.slice(1, -1);
  if (mid.length >= 3) {
    const a = mid[0], b = mid[mid.length - 2];
    out.push({ lib: `${s} est compris entre ${a} et ${b} (bornes incluses)`, set: vals.filter((v) => v >= a && v <= b), borne: vals.filter((v) => v > a && v < b) });
  }
  if (vals.length >= 6) out.push({ lib: `${s} est un multiple de 3`, set: vals.filter((v) => v > 0 && v % 3 === 0) });
  if (vals.length >= 5 && vals[0] === 1) out.push({ lib: `${s} est un nombre premier`, set: vals.filter((v) => [2, 3, 5, 7].includes(v)) });
  return out.filter((e) => e.set.length >= 1 && e.set.length < vals.length);
}

/* ---------- Situations à issues CATÉGORIELLES ---------- */
/** n : l'issue dans le tableau ; g : sa forme dans « … ou … ». */
type IssueCat = { n: string; g: string };
type CtxCatP = {
  sit: (p: string) => string;
  issues: IssueCat[];
  k: number[];
  ou: (gs: string[]) => string;
  groupes: { lib: string; set: string[] }[];
  roue?: boolean;
};
const ic = (n: string, g = n): IssueCat => ({ n, g });
const CTX_CAT_P: CtxCatP[] = [
  { sit: (p) => `À la kermesse, ${p} fait tourner une roue colorée dont les secteurs n'ont pas la même taille.`, issues: ["rouge", "bleu", "vert", "jaune", "violet", "orange"].map((c) => ic(c, `le ${c}`)), k: [3, 4, 5], ou: (gs) => `la roue s'arrête sur ${listeOuP(gs)}`, groupes: [], roue: true },
  { sit: () => `Un site météo donne le temps de demain à ${pk(VILLES_P)}.`, issues: [ic("soleil", "« soleil »"), ic("nuages", "« nuages »"), ic("averses", "« averses »"), ic("forte pluie", "« forte pluie »")], k: [4], ou: (gs) => `le temps annoncé est ${listeOuP(gs)}`, groupes: [{ lib: "il pleut (averses ou forte pluie)", set: ["averses", "forte pluie"] }, { lib: "il ne pleut pas", set: ["soleil", "nuages"] }, { lib: "il n'y a pas de soleil", set: ["nuages", "averses", "forte pluie"] }] },
  { sit: () => `On s'intéresse au résultat du prochain match de l'équipe de handball de ${pk(VILLES_P)}.`, issues: [ic("victoire", "une victoire"), ic("nul", "un match nul"), ic("défaite", "une défaite")], k: [3], ou: (gs) => `le match se termine par ${listeOuP(gs)}`, groupes: [{ lib: "l'équipe ne perd pas", set: ["victoire", "nul"] }, { lib: "l'équipe ne gagne pas", set: ["nul", "défaite"] }] },
  { sit: () => `Au snack de la plage, on note le parfum de glace choisi par le prochain client.`, issues: ["vanille", "coco", "letchi", "mangue", "chocolat"].map((c) => ic(c, `${c}`)), k: [5], ou: (gs) => `le client choisit ${listeOuP(gs)}`, groupes: [{ lib: "le parfum est un fruit (coco, letchi ou mangue)", set: ["coco", "letchi", "mangue"] }, { lib: "le parfum n'est pas un fruit", set: ["vanille", "chocolat"] }] },
  { sit: () => `On choisit au hasard un élève du lycée et on note comment il vient le matin.`, issues: [ic("car jaune", "en car jaune"), ic("à pied"), ic("vélo", "à vélo"), ic("voiture", "en voiture"), ic("scooter", "en scooter")], k: [5], ou: (gs) => `l'élève vient ${listeOuP(gs)}`, groupes: [{ lib: "l'élève vient avec un moteur (car, voiture ou scooter)", set: ["car jaune", "voiture", "scooter"] }, { lib: "l'élève vient sans moteur (à pied ou à vélo)", set: ["à pied", "vélo"] }] },
  { sit: (p) => `${p} pêche au large de Saint-Gilles. On note l'espèce du premier poisson pris.`, issues: ["thon", "dorade", "bonite", "espadon", "capitaine"].map((c) => ic(c, `un ${c}`)), k: [4, 5], ou: (gs) => `le premier poisson est ${listeOuP(gs)}`, groupes: [] },
  { sit: (p) => `La playlist de ${p} est en lecture aléatoire. On note le style du prochain morceau.`, issues: ["maloya", "séga", "rap", "zouk", "reggae"].map((c) => ic(c, `du ${c}`)), k: [5], ou: (gs) => `le morceau est ${listeOuP(gs)}`, groupes: [{ lib: "le morceau est du maloya ou du séga", set: ["maloya", "séga"] }] },
  { sit: (p) => `À la tombola du lycée, ${p} achète un ticket. On note ce qu'il rapporte.`, issues: [ic("gros lot", "le gros lot"), ic("petit lot", "un petit lot"), ic("bon d'achat", "un bon d'achat"), ic("rien")], k: [4], ou: (gs) => `le ticket rapporte ${listeOuP(gs)}`, groupes: [{ lib: "le ticket est gagnant", set: ["gros lot", "petit lot", "bon d'achat"] }, { lib: "le ticket rapporte un lot (gros ou petit)", set: ["gros lot", "petit lot"] }] },
  { sit: () => `On choisit au hasard un élève inscrit à l'UNSS et on note son sport.`, issues: ["foot", "basket", "natation", "surf", "athlétisme"].map((c) => ic(c, `le ${c}`)), k: [5], ou: (gs) => `l'élève pratique ${listeOuP(gs)}`, groupes: [{ lib: "l'élève pratique un sport de ballon (foot ou basket)", set: ["foot", "basket"] }, { lib: "l'élève pratique un sport d'eau (natation ou surf)", set: ["natation", "surf"] }] },
  { sit: () => `Plusieurs coureurs se disputent la victoire du trail de Cilaos. Un spécialiste estime leurs chances.`, issues: ["Ludovic", "Sabrina", "Jean-Marc", "Clara", "Mickaël"].map((c) => ic(c)), k: [4, 5], ou: (gs) => `${listeOuP(gs)} gagne`, groupes: [] },
  { sit: (p) => `${p} plonge la main dans un sachet de bonbons et en prend un au hasard. On note son parfum.`, issues: ["coco", "fraise", "menthe", "citron", "réglisse"].map((c) => ic(c, `au ${c}`.replace("au fraise", "à la fraise").replace("au menthe", "à la menthe").replace("au réglisse", "à la réglisse"))), k: [4, 5], ou: (gs) => `le bonbon est ${listeOuP(gs)}`, groupes: [{ lib: "le bonbon est à un fruit (coco, fraise ou citron)", set: ["coco", "fraise", "citron"] }] },
  { sit: () => `Au jeu de l'oie, une case « surprise » envoie le joueur au hasard vers une action.`, issues: [ic("avancer", "« avancer »"), ic("reculer", "« reculer »"), ic("rejouer", "« rejouer »"), ic("passer son tour", "« passer son tour »")], k: [4], ou: (gs) => `l'action est ${listeOuP(gs)}`, groupes: [{ lib: "l'action fait bouger le pion (avancer ou reculer)", set: ["avancer", "reculer"] }] },
];
type ModeleP = { sit: string; issues: string[]; evLib: string; A: number[]; vals?: number[]; roue?: boolean; borne?: number[] };
/** Tire une situation, ses issues et un événement A (indices des issues, ni vide ni tout). */
function modeleP(num: boolean, p: string, tailleMin = 1): ModeleP {
  for (;;) {
    if (num) {
      const c = pk(CTX_NUM_P);
      const vals = c.vals();
      const evs = evenementsNumP(c, vals).filter((e) => e.set.length >= tailleMin);
      if (!evs.length) continue;
      const e = pk(evs);
      return { sit: c.sit(p), issues: vals.map(String), evLib: e.lib, A: e.set.map((v) => vals.indexOf(v)), vals, borne: e.borne?.map((v) => vals.indexOf(v)) };
    }
    const c = pk(CTX_CAT_P);
    const k = pk(c.k);
    const issues = k >= c.issues.length ? [...c.issues] : melangeP(c.issues).slice(0, k);
    const noms = issues.map((x) => x.n);
    const gs = c.groupes.filter((g) => g.set.every((x) => noms.includes(x)) && g.set.length >= tailleMin);
    if (gs.length && Math.random() < 0.45) {
      const g = pk(gs);
      return { sit: c.sit(p), issues: noms, evLib: g.lib, A: g.set.map((x) => noms.indexOf(x)), roue: c.roue };
    }
    const n = Math.max(tailleMin, k >= 4 ? pk([2, 3]) : 2);
    if (n >= k) continue;
    const A = melangeP(noms.map((_, i) => i)).slice(0, n).sort((a, b) => a - b);
    return { sit: c.sit(p), issues: noms, evLib: c.ou(A.map((i) => issues[i].g)), A, roue: c.roue };
  }
}
const libIssueP = (m: ModeleP, i: number) => (m.vals ? m.issues[i] : `« ${m.issues[i]} »`);
const INTRO_LOI_P = [
  "Voici la loi de probabilité :",
  "Les probabilités des issues sont :",
  "Le tableau donne la loi de probabilité :",
  "On modélise l'expérience par la loi suivante :",
];
const QUESTION_P = [
  (l: string) => `Quelle est la probabilité de l'événement « ${l} » ?`,
  (l: string) => `On note $A$ l'événement « ${l} ». Calcule $P(A)$.`,
  (l: string) => `Détermine la probabilité de l'événement $A$ : « ${l} ».`,
  (l: string) => `Avec cette loi, que vaut $P(A)$, où $A$ est l'événement « ${l} » ?`,
];
const FMT_P = [" Donne la réponse en écriture décimale ou en fraction.", "", " (Réponse en décimal ou en fraction.)"];
const loiTexteP = (m: ModeleP, pr: string[]) => m.issues.map((x, i) => `${m.vals ? x : majP(x)} : ${pr[i]}`).join(" ; ");
function figureP(m: ModeleP, prTxt: string[], poids: number[]): CanvasFigure {
  if (m.roue) {
    const cs = ["rouge", "bleu", "vert", "jaune", "violet", "orange"];
    return { kind: "probabilites", variant: "roue", roue: { segments: m.issues.map((x, i) => ({ label: `${majP(x)} (${prTxt[i]})`, poids: poids[i], couleur: HEX_P[cs.indexOf(x)] })) } };
  }
  return tableauLoiP(m.issues.map((x) => (m.vals ? x : majP(x))), prTxt);
}

/* =========================================================================
   PROBA_CALCULER — P(A) = somme des probabilités des issues de A.
========================================================================= */

/** ★2 — Une loi en décimal, P(A) par somme. */
function calcLoiDecP(num: boolean): QP {
  const m = modeleP(num, pk(NOMS_P), 2);
  const k = m.issues.length;
  const pr = loiAleatoire(k, 100, 5);
  const a = m.A.reduce((s, i) => s + pr[i], 0);
  const prTxt = pr.map(cP);
  const text = `${m.sit} ${pk(INTRO_LOI_P)} ${loiTexteP(m, prTxt)}. ${pk(QUESTION_P)(m.evLib)}`;
  const explanation = exp(
    "La probabilité d'un événement est la somme des probabilités des issues qui le réalisent.",
    `L'événement « ${m.evLib} » est réalisé par ${listeEtP(m.A.map((i) => libIssueP(m, i)))}.`,
    `$P(A) = ${m.A.map((i) => pr[i] / 100).map((x) => frP(x).replace(",", "{,}")).join(" + ")} = ${cP(a).replace(",", "{,}")}$.`,
    `La probabilité est ${cP(a)}.`
  );
  const canvas = figureP(m, prTxt, pr);
  if (Math.random() < 0.5) {
    return { text: text + pk(FMT_P), format: "short", expected: ecrituresP(a, 100), comparator: "fraction_decimal_equivalent", explanation, canvas };
  }
  const pieges = [
    ...m.A.map((i) => a - pr[i]), // une issue oubliée
    100 - a, // le contraire
    (100 * m.A.length) / k, // comme si les issues étaient équiprobables
    ...(m.borne ? [m.borne.reduce((s, i) => s + pr[i], 0)] : []), // la borne mal lue
  ];
  const q = qcmP(a, 100, pieges, true);
  return { text, format: "qcm", ...q, comparator: "mcq_exact", explanation, canvas };
}

/** ★3 — Une probabilité effacée, à retrouver, puis P(A). */
function calcManquanteP(): QP {
  const m = modeleP(Math.random() < 0.5, pk(NOMS_P), 2);
  const k = m.issues.length;
  const pr = loiAleatoire(k, 100, 1, 4);
  const x = pk(m.A); // l'issue effacée est dans A : il faut la calculer
  const a = m.A.reduce((s, i) => s + pr[i], 0);
  const prTxt = pr.map((v, i) => (i === x ? "?" : cP(v)));
  const intro = pk([
    "Une probabilité a été effacée dans la loi :",
    "Dans la loi de probabilité suivante, une valeur manque :",
    "On connaît toutes les probabilités sauf une :",
  ]);
  const text = `${m.sit} ${intro} ${loiTexteP(m, prTxt)}. ${pk(QUESTION_P)(m.evLib)}`;
  const autres = m.issues.map((_, i) => i).filter((i) => i !== x);
  const sAutres = autres.reduce((s, i) => s + pr[i], 0);
  const explanation = exp(
    "La somme des probabilités de toutes les issues vaut 1 ; P(A) est la somme des probabilités des issues de A.",
    `D'abord la probabilité manquante (issue ${libIssueP(m, x)}), puis la somme sur ${listeEtP(m.A.map((i) => libIssueP(m, i)))}.`,
    `Manquante : 1 − (${autres.map((i) => cP(pr[i])).join(" + ")}) = 1 − ${cP(sAutres)} = ${cP(pr[x])}. Puis P(A) = ${m.A.map((i) => cP(pr[i])).join(" + ")} = ${cP(a)}.`,
    `P(A) = ${cP(a)}.`
  );
  const canvas = tableauLoiP(m.issues.map((s) => (m.vals ? s : majP(s))), prTxt);
  if (Math.random() < 0.5) {
    return { text: text + pk(FMT_P), format: "short", expected: ecrituresP(a, 100), comparator: "fraction_decimal_equivalent", explanation, canvas };
  }
  const pieges = [a - pr[x] /* « ? » compté pour 0 */, pr[x], 100 - a, ...m.A.filter((i) => i !== x).map((i) => a - pr[i])];
  return { text, format: "qcm", ...qcmP(a, 100, pieges, true), comparator: "mcq_exact", explanation, canvas };
}

/** ★3 — Roue aux secteurs inégaux : angle ÷ 360°. */
const ROUES_P: { sit: (p: string) => string; lots: string[]; ou: (xs: string[], p: string) => string }[] = [
  { sit: (p) => `À la kermesse de ${pk(VILLES_P)}, ${p} fait tourner une roue colorée.`, lots: ["rouge", "bleu", "vert", "jaune", "violet", "orange"], ou: (xs) => `la roue s'arrête sur ${listeOuP(xs.map((x) => `le ${x}`))}` },
  { sit: (p) => `Au stand de la fête de l'école, ${p} fait tourner la roue des lots.`, lots: ["perdu", "bonbon coco", "letchi", "peluche", "rejouer", "ballon"], ou: (xs) => `la roue tombe sur ${listeOuP(xs.map((x) => `« ${x} »`))}` },
  { sit: (p) => `Dans un jeu de société, ${p} fait tourner la roue des défis.`, lots: ["calcul", "dessin", "mime", "chanson", "devinette", "joker"], ou: (xs) => `la roue indique ${listeOuP(xs.map((x) => `« ${x} »`))}` },
  { sit: (p) => `Sur le stand du Grand Raid, ${p} fait tourner la roue des cadeaux.`, lots: ["casquette", "gourde", "t-shirt", "porte-clés", "rien", "médaille"], ou: (xs, p) => `${p} gagne ${listeOuP(xs.map((x) => (x === "rien" ? "rien" : `« ${x} »`)))}` },
];
function calcRoueAnglesP(): QP {
  const p = pk(NOMS_P);
  const r = pk(ROUES_P);
  const k = pk([4, 5, 6]);
  const lots = melangeP(r.lots).slice(0, k);
  const pas = pk([15, 20, 30, 45]);
  const ang = loiAleatoire(k, 360, pas);
  let A: number[];
  let lib: string;
  const neg = lots.find((x) => x === "perdu" || x === "rien");
  if (neg && Math.random() < 0.4) {
    A = lots.map((_, i) => i).filter((i) => lots[i] !== neg);
    lib = neg === "perdu" ? "la roue ne tombe pas sur « perdu »" : `${p} gagne un cadeau`;
  } else {
    A = melangeP(lots.map((_, i) => i)).slice(0, pk([2, 3])).sort((a, b) => a - b);
    lib = r.ou(A.map((i) => lots[i]), p);
  }
  const sA = A.reduce((s, i) => s + ang[i], 0);
  const intro = pk(["Les secteurs n'ont pas la même taille. Leurs angles sont :", "Les angles des secteurs sont :", "La roue est partagée en secteurs inégaux :"]);
  const text = `${r.sit(p)} ${intro} ${lots.map((x, i) => `${majP(x)} : ${ang[i]}°`).join(" ; ")}. ${pk(QUESTION_P)(lib)}`;
  const explanation = exp(
    "La probabilité d'un secteur est proportionnelle à son angle : angle ÷ 360°. P(A) est la somme des probabilités des secteurs de A.",
    `A est réalisé par les secteurs ${listeEtP(A.map((i) => `« ${lots[i]} »`))} : on additionne leurs angles.`,
    `${A.map((i) => `${ang[i]}°`).join(" + ")} = ${sA}°, donc P(A) = ${fracEgP(sA, 360)}.`,
    `P(A) = ${affP(sA, 360, false)}.`
  );
  const canvas: CanvasFigure = { kind: "probabilites", variant: "roue", roue: { segments: lots.map((x, i) => ({ label: majP(x), poids: ang[i], couleur: HEX_P[i % HEX_P.length] })) } };
  if (Math.random() < 0.5) {
    return { text: text + " Donne la réponse sous forme de fraction.", format: "short", expected: ecrituresP(sA, 360), comparator: "fraction_decimal_equivalent", explanation, canvas };
  }
  const pieges = [
    (360 * A.length) / k, // compter les secteurs comme s'ils étaient égaux
    360 - sA,
    ...A.map((i) => sA - ang[i]),
  ];
  return { text, format: "qcm", ...qcmP(sA, 360, pieges, false), comparator: "mcq_exact", explanation, canvas };
}

/** Une loi « à parts » : poids entiers w, une part vaut 1/W. Sert au ★4 de calculer et de modele. */
type LoiPartsP = { m: ModeleP; w: number[]; descr: string };
function loiPartsP(): LoiPartsP {
  const p = pk(NOMS_P);
  const cas = pk(["coef", "coef", "favori", "numero"] as const);
  if (cas === "favori") {
    const c = pk(CTX_NUM_P.filter((x) => x.de));
    const vals = [1, 2, 3, 4, 5, 6];
    const f = pk(vals);
    const mult = pk([2, 3, 4, 5]);
    const e = pk(evenementsNumP(c, vals).filter((x) => x.set.length >= 2));
    return {
      m: { sit: c.sit(p), issues: vals.map(String), evLib: e.lib, A: e.set.map((v) => v - 1), vals },
      w: vals.map((v) => (v === f ? mult : 1)),
      descr: `Le ${f} a ${pk([`${mult} fois plus de chances de sortir que chacune des autres faces`, `une probabilité ${mult} fois plus grande que celle de chacune des autres faces`])}, les autres faces étant équiprobables.`,
    };
  }
  if (cas === "numero") {
    const k = pk([4, 5, 6]);
    const vals = Array.from({ length: k }, (_, i) => i + 1);
    const c: CtxNumP = { sit: () => "", vals: () => vals, sujet: "le numéro obtenu", parite: true };
    const e = pk(evenementsNumP(c, vals).filter((x) => x.set.length >= 2));
    return {
      m: { sit: pk([`${p} lance un dé truqué à ${k} faces numérotées de 1 à ${k}.`, `${p} fait tourner une roue de ${k} secteurs numérotés de 1 à ${k}.`, `${p} tire un jeton dans une boîte où les jetons portent les numéros 1 à ${k}.`]), issues: vals.map(String), evLib: e.lib, A: e.set.map((v) => v - 1), vals },
      w: [...vals],
      descr: pk(["La probabilité de chaque numéro est proportionnelle à ce numéro.", "Chaque numéro a une probabilité proportionnelle à sa valeur."]),
    };
  }
  const m = modeleP(Math.random() < 0.5, p, 2);
  let w: number[];
  do w = m.issues.map(() => pk([1, 1, 2, 2, 3, 4]));
  while (new Set(w).size < 2);
  const coef = (c: number) => (c === 1 ? "a" : `${c}a`);
  return { m, w, descr: `On sait que ${m.issues.map((x, i) => `${m.vals ? `l'issue ${x}` : `« ${x} »`} a la probabilité $${coef(w[i])}$`).join(", ")}, où $a$ est un nombre.` };
}
const coefP = (c: number) => (c === 1 ? "a" : `${c}a`);

/** ★4 — Loi à paramètre : une part vaut 1/W, puis P(A). */
function calcParametreP(): QP {
  const { m, w, descr } = loiPartsP();
  const W = w.reduce((s, x) => s + x, 0);
  const sA = m.A.reduce((s, i) => s + w[i], 0);
  const text = `${m.sit} ${descr} ${pk(QUESTION_P)(m.evLib)}`;
  const explanation = exp(
    "La somme des probabilités de toutes les issues vaut 1 ; P(A) est la somme des probabilités des issues de A.",
    `On compte les parts : ${w.join(" + ")} = ${W}, donc ${W}a = 1 et a = ${tfP(1, W)}.`,
    `A est réalisé par ${listeEtP(m.A.map((i) => libIssueP(m, i)))} : ${m.A.map((i) => w[i]).join(" + ")} = ${sA} part${sA > 1 ? "s" : ""}, donc P(A) = ${fracEgP(sA, W)}.`,
    `P(A) = ${affP(sA, W, false)}.`
  );
  const canvas = tableauLoiP(m.issues.map((x) => (m.vals ? x : majP(x))), w.map(coefP));
  if (Math.random() < 0.5) {
    return { text: text + " Donne la réponse sous forme de fraction.", format: "short", expected: ecrituresP(sA, W), comparator: "fraction_decimal_equivalent", explanation, canvas };
  }
  // Leurres sur le dénominateur W·k pour garder des entiers.
  const k = m.issues.length;
  const D = W * k;
  const pieges = [
    W * m.A.length, // issues supposées équiprobables : |A|/k
    k * (W - sA), // le contraire
    ...m.A.map((i) => k * (sA - w[i])), // une issue oubliée
    sA * W, // sA/k : diviser les parts par le nombre d'issues au lieu du total des parts
  ];
  return { text, format: "qcm", ...qcmP(k * sA, D, pieges, false), comparator: "mcq_exact", explanation, canvas };
}

/** Deux événements numériques qui se chevauchent, sur une même situation. */
type DeuxEvtsP = { c: CtxNumP; vals: number[]; A: EvtP; B: EvtP; uni: number[]; inter: number[] };
function deuxEvtsP(incompatibles = false): DeuxEvtsP {
  for (;;) {
    const c = pk(CTX_NUM_P);
    const vals = c.vals();
    const evs = evenementsNumP(c, vals);
    const A = pk(evs);
    const B = pk(evs);
    const uni = vals.filter((v) => A.set.includes(v) || B.set.includes(v));
    const inter = vals.filter((v) => A.set.includes(v) && B.set.includes(v));
    if (A.lib === B.lib || uni.length === vals.length) continue;
    if (incompatibles ? inter.length === 0 : inter.length >= 1 && inter.length < Math.min(A.set.length, B.set.length)) return { c, vals, A, B, uni, inter };
  }
}
/** « le numéro obtenu est pair » → « le numéro est pair ou supérieur à 4 ». */
const sansSujetP = (c: CtxNumP, lib: string) => lib.replace(`${c.sujet} `, "");

/** ★4 — P(« A ou B ») ou P(« A et B ») sur une loi en décimal. */
function calcUnionP(): QP {
  const { c, vals, A, B, uni, inter } = deuxEvtsP();
  const pr = loiAleatoire(vals.length, 100, 5);
  const P = (s: number[]) => s.reduce((t, v) => t + pr[vals.indexOf(v)], 0);
  const ou = Math.random() < 0.6;
  const cible = ou ? uni : inter;
  const val = P(cible);
  const lib = `${A.lib} ${ou ? "ou" : "et"} ${sansSujetP(c, B.lib)}`;
  const text = `${c.sit(pk(NOMS_P))} ${pk(INTRO_LOI_P)} ${vals.map((v, i) => `${v} : ${cP(pr[i])}`).join(" ; ")}. ${pk(QUESTION_P)(lib)}`;
  const explanation = exp(
    ou ? "« A ou B » est réalisé par les issues de A, de B ou des deux : chaque issue ne compte qu'une fois." : "« A et B » est réalisé par les issues qui sont à la fois dans A et dans B.",
    `« ${A.lib} » : ${ensP(A.set)} ; « ${sansSujetP(c, B.lib)} » : ${ensP(B.set)}. L'événement demandé : ${ensP(cible)}.`,
    `On additionne : ${cible.map((v) => cP(pr[vals.indexOf(v)])).join(" + ")} = ${cP(val)}.` + (ou ? ` (Additionner P(A) et P(B) compterait deux fois ${listeEtP(inter.map(String))}.)` : ""),
    `La probabilité est ${cP(val)}.`
  );
  const canvas = tableauLoiP(vals.map(String), pr.map(cP));
  if (Math.random() < 0.5) {
    return { text: text + pk(FMT_P), format: "short", expected: ecrituresP(val, 100), comparator: "fraction_decimal_equivalent", explanation, canvas };
  }
  const pieges = ou ? [P(A.set) + P(B.set), P(inter), P(A.set), P(B.set)] : [P(uni), P(A.set), P(B.set), 100 - val];
  return { text, format: "qcm", ...qcmP(val, 100, pieges, true), comparator: "mcq_exact", explanation, canvas };
}

/* =========================================================================
   PROBA_VOCABULAIRE — issue, univers, événement, certain, impossible.
========================================================================= */

/** Des expériences simples dont on connaît l'univers (pour compter les issues). */
type ExpP = { txt: (p: string) => string; univers: string[]; leurre: string; equi?: boolean };
const EXPS_P: ExpP[] = [
  { txt: (p) => `${p} lance un dé à 6 faces et note le numéro obtenu.`, univers: ["1", "2", "3", "4", "5", "6"], leurre: "7", equi: true },
  { txt: (p) => `${p} lance un dé à 4 faces et note le numéro obtenu.`, univers: ["1", "2", "3", "4"], leurre: "5", equi: true },
  { txt: (p) => `${p} lance un dé à 8 faces de jeu de rôle et note le numéro obtenu.`, univers: ["1", "2", "3", "4", "5", "6", "7", "8"], leurre: "9", equi: true },
  { txt: (p) => `${p} lance un dé à 12 faces et note le numéro obtenu.`, univers: Array.from({ length: 12 }, (_, i) => String(i + 1)), leurre: "13", equi: true },
  { txt: (p) => `${p} lance une pièce et note le côté visible.`, univers: ["pile", "face"], leurre: "tranche et pile", equi: true },
  { txt: (p) => `${p} lance deux pièces l'une après l'autre et note les côtés obtenus dans l'ordre.`, univers: ["PP", "PF", "FP", "FF"], leurre: "P", equi: true },
  { txt: (p) => `${p} tire une boule dans une urne contenant des boules numérotées de 1 à 10.`, univers: Array.from({ length: 10 }, (_, i) => String(i + 1)), leurre: "11", equi: true },
  { txt: (p) => `${p} fait tourner une roue de 5 secteurs numérotés de 0 à 4.`, univers: ["0", "1", "2", "3", "4"], leurre: "5" },
  { txt: (p) => `${p} tire une lettre au hasard parmi les lettres du mot « CILAOS ».`, univers: ["C", "I", "L", "A", "O", "S"], leurre: "E", equi: true },
  { txt: (p) => `${p} tire une lettre au hasard parmi les lettres du mot « MAFATE ».`, univers: ["M", "A", "F", "T", "E"], leurre: "R" },
  { txt: (p) => `${p} choisit au hasard un jour de la semaine pour aller à la plage.`, univers: ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"], leurre: "week-end", equi: true },
  { txt: (p) => `${p} choisit au hasard un mois de l'année pour un pique-nique.`, univers: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"], leurre: "été" },
  { txt: (p) => `${p} tire une carte dans un jeu de 32 cartes et ne note que sa couleur (cœur, carreau, trèfle, pique).`, univers: ["cœur", "carreau", "trèfle", "pique"], leurre: "rouge", equi: true },
  { txt: (p) => `${p} lance un dé à 6 faces et ne note que si le numéro est pair ou impair.`, univers: ["pair", "impair"], leurre: "6", equi: true },
  { txt: (p) => `${p} lance deux dés à 6 faces et note la somme des deux numéros.`, univers: Array.from({ length: 11 }, (_, i) => String(i + 2)), leurre: "1" },
  { txt: (p) => `${p} prend au hasard un fruit dans une corbeille de letchis, mangues et ananas.`, univers: ["letchi", "mangue", "ananas"], leurre: "banane" },
];

/** ★1 — Combien d'issues ? / Laquelle est une issue ? */
function vocIssuesP(): QP {
  const p = pk(NOMS_P);
  if (Math.random() < 0.5) {
    const e = pk(EXPS_P);
    const n = e.univers.length;
    const T = pk(["Combien y a-t-il d'issues possibles ?", "Combien d'issues compte l'univers de cette expérience ?", "Combien de résultats possibles y a-t-il ?"]);
    return {
      text: `${e.txt(p)} ${T}`,
      format: "short",
      expected: [String(n)],
      comparator: "number_equal",
      explanation: exp(
        "Une issue est un résultat possible ; l'univers est l'ensemble de toutes les issues.",
        "On écrit toutes les issues sans en oublier ni en répéter.",
        `Univers : ${ensP(e.univers)}, soit ${n} issues.`,
        `Il y a ${n} issues.`
      ),
    };
  }
  const m = modeleP(Math.random() < 0.5, p, 2);
  const bon = pk(m.issues);
  const leurres = [
    `« ${m.evLib} »`,
    m.vals ? `${Math.max(...m.vals) + pk([1, 2, 5])}` : "l'univers tout entier",
    "l'ensemble de tous les résultats",
    m.vals ? "la probabilité 0,5" : "« aucun résultat »",
  ];
  const q = qcmT(m.vals ? bon : `« ${bon} »`, leurres);
  return {
    text: `${m.sit} ${pk(["Lequel de ces éléments est une issue de l'expérience ?", "Parmi les propositions, laquelle est une issue ?", "Quelle proposition est un résultat possible (une issue) ?"])}`,
    format: "qcm",
    ...q,
    comparator: "mcq_exact",
    explanation: exp(
      "Une issue est UN résultat possible de l'expérience ; un événement peut en regrouper plusieurs.",
      `Les issues sont : ${listeEtP(m.issues.map((_, i) => libIssueP(m, i)))}.`,
      `${q.expected[0]} en fait partie ; « ${m.evLib} » est un événement, pas une issue.`,
      `La bonne réponse est ${q.expected[0]}.`
    ),
  };
}

/** ★2 — Quelles issues réalisent l'événement ? (QCM d'ensembles, ou leur nombre) */
function vocEvenementP(): QP {
  const m = modeleP(Math.random() < 0.65, pk(NOMS_P), 2);
  const lab = (ids: number[]) => ensP(ids.slice().sort((a, b) => a - b).map((i) => m.issues[i]));
  const A = m.A;
  const contraire = m.issues.map((_, i) => i).filter((i) => !A.includes(i));
  const explication = exp(
    "Un événement est un ensemble d'issues : il est réalisé quand l'issue obtenue lui appartient.",
    `On passe en revue chaque issue de l'univers ${lab(m.issues.map((_, i) => i))} et on garde celles qui vérifient « ${m.evLib} ».`,
    `On garde ${listeEtP(A.map((i) => libIssueP(m, i)))}, soit ${A.length} issue${A.length > 1 ? "s" : ""}.`,
    `L'événement est ${lab(A)}.`
  );
  if (Math.random() < 0.35) {
    return {
      text: `${m.sit} ${pk([`Combien d'issues réalisent l'événement « ${m.evLib} » ?`, `L'événement « ${m.evLib} » est formé de combien d'issues ?`, `Combien d'issues sont favorables à l'événement « ${m.evLib} » ?`])}`,
      format: "short",
      expected: [String(A.length)],
      comparator: "number_equal",
      explanation: explication,
    };
  }
  const leurres = [lab(contraire)];
  if (m.borne && m.borne.length) leurres.push(lab(m.borne));
  if (A.length >= 2) leurres.push(lab(A.slice(0, -1)), lab(A.slice(1)));
  if (contraire.length) leurres.push(lab([...A, contraire[0]]), lab([...A.slice(1), contraire[contraire.length - 1]]));
  leurres.push(lab(m.issues.map((_, i) => i)));
  const q = qcmT(lab(A), leurres);
  return {
    text: `${m.sit} ${pk([`Quelles issues réalisent l'événement « ${m.evLib} » ?`, `Écris l'événement « ${m.evLib} » comme un ensemble d'issues.`, `L'événement « ${m.evLib} » est égal à :`])}`,
    format: "qcm",
    ...q,
    comparator: "mcq_exact",
    explanation: explication,
  };
}

/** ★3 — Certain, impossible, élémentaire, ou rien de tout cela. */
const NATURES_P = ["un événement certain", "un événement impossible", "un événement élémentaire (une seule issue)", "ni certain, ni impossible, ni élémentaire"];
function vocNatureP(): QP {
  const p = pk(NOMS_P);
  const c = pk(CTX_NUM_P);
  const vals = c.vals();
  const s = c.sujet;
  const mn = vals[0], mx = vals[vals.length - 1];
  const cas = pk([0, 1, 2, 3] as const);
  let lib: string;
  let raison: string;
  if (cas === 0) {
    lib = pk([`${s} est inférieur ou égal à ${mx}`, `${s} est supérieur ou égal à ${mn}`, `${s} est compris entre ${mn} et ${mx} (bornes incluses)`]);
    raison = `toutes les issues ${ensP(vals)} le réalisent`;
  } else if (cas === 1) {
    lib = pk([`${s} est strictement supérieur à ${mx}`, `${s} est égal à ${mx + pk([1, 2, 3])}`, `${s} est strictement inférieur à ${mn}`]);
    raison = `aucune issue de ${ensP(vals)} ne le réalise`;
  } else if (cas === 2) {
    const v = pk([mn, mx]);
    lib = pk([`${s} est égal à ${v}`, v === mx ? `${s} est strictement supérieur à ${vals[vals.length - 2]}` : `${s} est strictement inférieur à ${vals[1]}`]);
    raison = `une seule issue le réalise : ${v}`;
  } else {
    const evs = evenementsNumP(c, vals).filter((e) => e.set.length >= 2);
    const e = pk(evs);
    lib = e.lib;
    raison = `il est réalisé par ${ensP(e.set)} : plusieurs issues, mais pas toutes`;
  }
  const bon = NATURES_P[cas];
  return {
    text: `${c.sit(p)} ${pk([`L'événement « ${lib} » est :`, `Comment qualifier l'événement « ${lib} » ?`, `Que peut-on dire de l'événement « ${lib} » ?`])}`,
    format: "qcm",
    choices: melangeP(NATURES_P),
    expected: [bon],
    comparator: "mcq_exact",
    explanation: exp(
      "Certain : toutes les issues le réalisent (probabilité 1). Impossible : aucune (probabilité 0). Élémentaire : une seule issue.",
      `L'univers est ${ensP(vals)}.`,
      `« ${lib} » : ${raison}.`,
      `C'est ${bon}.`
    ),
  };
}

/* =========================================================================
   PROBA_MODELE — loi de probabilité sur un univers fini.
========================================================================= */

/** ★2 — Équiprobabilité : chaque issue a la probabilité 1/N. */
function modEquiP(): QP {
  const e = pk(EXPS_P.filter((x) => x.equi));
  const N = e.univers.length;
  const p = pk(NOMS_P);
  const cible = pk(e.univers);
  const T = pk([
    `Les issues sont équiprobables. Quelle est la probabilité de l'issue « ${cible} » ?`,
    `On suppose le hasard équitable. Quelle probabilité associer à chaque issue ?`,
    `Dans le modèle équiprobable, que vaut la probabilité de « ${cible} » ?`,
  ]);
  const explanation = exp(
    "Dans une situation d'équiprobabilité, toutes les issues ont la même probabilité, et la somme des probabilités vaut 1.",
    `L'univers ${ensP(e.univers)} compte ${N} issues.`,
    `Chaque issue a la probabilité 1 ÷ ${N} = ${tfP(1, N)}.`,
    `La probabilité est ${tfP(1, N)}.`
  );
  if (Math.random() < 0.5) {
    return { text: `${e.txt(p)} ${T} Donne une fraction.`, format: "short", expected: ecrituresP(1, N), comparator: "fraction_decimal_equivalent", explanation };
  }
  // Leurres : 1/(N−1) (une issue oubliée), 1/(N+1), (N−1)/N (le contraire), 1/2 (« ça arrive ou pas »).
  const q = qcmFrP([1, N], [[1, N - 1], [1, N + 1], [N - 1, N], [1, 2], [2, N]]);
  return { text: `${e.txt(p)} ${T}`, format: "qcm", ...q, comparator: "mcq_exact", explanation };
}
/** QCM de fractions [n, d] : trois leurres distincts EN VALEUR, dans ]0 ; 1[. */
function qcmFrP(bon: [number, number], pieges: [number, number][]): { choices: string[]; expected: string[] } {
  const v = (f: [number, number]) => f[0] / f[1];
  const pris: [number, number][] = [];
  const secours: [number, number][] = [[bon[0] + 1, bon[1]], [bon[0], bon[1] + 2], [bon[0] + 2, bon[1] + 3], [1, bon[1] * 2]];
  for (const f of [...melangeP(pieges), ...secours]) {
    if (pris.length === 3) break;
    if (!(f[1] > 0) || f[0] <= 0 || v(f) >= 1) continue;
    if ([bon, ...pris].some((g) => Math.abs(v(g) - v(f)) < 1e-9)) continue;
    pris.push(f);
  }
  const c = affP(bon[0], bon[1], false);
  return { choices: melangeP([c, ...pris.map((f) => affP(f[0], f[1], false))]), expected: [c] };
}

/** ★2 / ★4 — Ce tableau est-il une loi de probabilité ? */
const VERDICTS_P = [
  "Oui, c'est une loi de probabilité",
  "Non : la somme des probabilités ne vaut pas 1",
  "Non : une probabilité est négative",
  "Non : les issues ne sont pas équiprobables",
];
function modValideP(difficile: boolean): QP {
  const m = modeleP(Math.random() < 0.5, pk(NOMS_P));
  const k = m.issues.length;
  const pr = loiAleatoire(k, 100, 5);
  // ★4 : le négatif qui garde la somme à 1 (le piège que la somme ne voit pas).
  const cas = difficile ? pk([0, 1, 2, 2] as const) : pk([0, 1] as const);
  const vals = [...pr];
  const i = Math.floor(Math.random() * k);
  if (cas === 1) vals[i] = pr[i] + pk([-15, -10, -5, 5, 10, 15].filter((d) => pr[i] + d > 0));
  if (cas === 2) {
    const j = (i + 1) % k;
    const d = pk([5, 10, 15].map((x) => pr[i] + x).filter((x) => pr[j] + x <= 100));
    vals[i] = pr[i] - d;
    vals[j] = pr[j] + d;
  }
  const S = vals.reduce((s, x) => s + x, 0);
  const txt = vals.map(cP);
  const text = `${m.sit} ${pk(["Un élève propose ce modèle :", "On propose les probabilités suivantes :", "Voici une proposition de loi :"])} ${loiTexteP(m, txt)}. ${pk(["Est-ce une loi de probabilité ?", "Ce modèle convient-il ?", "Peut-on accepter ce modèle ?"])}`;
  const verif =
    `Somme : ${txt.join(" + ")} = ${cP(S)}` +
    (vals.some((x) => x < 0) ? ` ; une valeur est négative (${cP(Math.min(...vals))})` : "") +
    ".";
  return {
    text,
    format: "qcm",
    choices: melangeP(VERDICTS_P),
    expected: [VERDICTS_P[cas]],
    comparator: "mcq_exact",
    explanation: exp(
      "Une loi de probabilité donne à chaque issue un nombre entre 0 et 1, et la somme de ces nombres vaut 1. Les issues n'ont PAS besoin d'être équiprobables.",
      "On vérifie les deux conditions : chaque valeur dans [0 ; 1], puis la somme.",
      verif,
      `${VERDICTS_P[cas]}.`
    ),
    canvas: tableauLoiP(m.issues.map((x) => (m.vals ? x : majP(x))), txt),
  };
}

/** ★3 — La probabilité manquante (une ou deux égales). */
function modManquanteP(): QP {
  const m = modeleP(Math.random() < 0.5, pk(NOMS_P));
  const k = m.issues.length;
  const deux = k >= 4 && Math.random() < 0.35;
  const x = Math.floor(Math.random() * k);
  const y = (x + 1 + Math.floor(Math.random() * (k - 1))) % k;
  let pr = loiAleatoire(k, 100, 5);
  if (deux) {
    const reste = pk([10, 20, 30, 40, 50]);
    const autres = pr.map((_, i) => i).filter((i) => i !== x && i !== y);
    const fixe = loiAleatoire(autres.length, 100 - reste, 5);
    pr = pr.map((_, i) => (i === x || i === y ? reste / 2 : fixe[autres.indexOf(i)]));
  }
  const S = pr.reduce((s, v, i) => s + (i === x || (deux && i === y) ? 0 : v), 0);
  const txt = pr.map((v, i) => (i === x || (deux && i === y) ? (deux ? "$p$" : "?") : cP(v)));
  const libX = libIssueP(m, x);
  const T = deux
    ? pk([`Les issues ${libX} et ${libIssueP(m, y)} ont la même probabilité $p$. Que vaut $p$ ?`, `Sachant que ${libX} et ${libIssueP(m, y)} sont équiprobables, calcule $p$.`])
    : pk([`Quelle est la probabilité de l'issue ${libX} ?`, `Complète la loi : que vaut la probabilité de ${libX} ?`, `Calcule la probabilité manquante.`]);
  const rep = deux ? (100 - S) / 2 : 100 - S;
  return {
    text: `${m.sit} ${pk(INTRO_LOI_P)} ${loiTexteP(m, txt)}. ${T}`,
    format: "short",
    expected: ecrituresP(rep, 100),
    comparator: "fraction_decimal_equivalent",
    explanation: exp(
      "La somme des probabilités de toutes les issues vaut 1.",
      `On additionne les probabilités connues, puis on retire de 1${deux ? ", et on partage en deux" : ""}.`,
      `${pr.filter((_, i) => !(i === x || (deux && i === y))).map(cP).join(" + ")} = ${cP(S)} ; 1 − ${cP(S)} = ${cP(100 - S)}${deux ? ` ; ${cP(100 - S)} ÷ 2 = ${cP(rep)}` : ""}.`,
      `${deux ? "$p$" : "La probabilité"} = ${cP(rep)}.`
    ),
    canvas: tableauLoiP(m.issues.map((s) => (m.vals ? s : majP(s))), txt),
  };
}

/** ★4 — Loi à paramètre : trouver a. */
function modParametreP(): QP {
  const { m, w, descr } = loiPartsP();
  const W = w.reduce((s, x) => s + x, 0);
  const i = Math.floor(Math.random() * w.length);
  const askA = descr.includes("$a$") && Math.random() < 0.6;
  const coeffs = w.map(coefP).join(" + ");
  const text = `${m.sit} ${descr} ${askA ? pk(["Que vaut $a$ ?", "Calcule $a$.", "Détermine la valeur de $a$."]) : pk([`Quelle est la probabilité de l'issue ${libIssueP(m, i)} ?`, `Calcule la probabilité de ${libIssueP(m, i)}.`])}`;
  const rep: [number, number] = askA ? [1, W] : [w[i], W];
  return {
    text: text + " Donne une fraction.",
    format: "short",
    expected: ecrituresP(rep[0], rep[1]),
    comparator: "fraction_decimal_equivalent",
    explanation: exp(
      "La somme des probabilités de toutes les issues vaut 1.",
      `On écrit chaque probabilité avec une même « part » $a$ : ${coeffs} = 1.`,
      `${W}a = 1, donc a = ${tfP(1, W)}${!askA ? ` ; l'issue ${libIssueP(m, i)} vaut ${w[i]} part${w[i] > 1 ? "s" : ""} :${fracEgP(w[i], W)}` : ""}.`,
      `Réponse : ${affP(rep[0], rep[1], false)}.`
    ),
  };
}

/* =========================================================================
   PROBA_EVENEMENT_CONTRAIRE — P(Ā) = 1 − P(A).
========================================================================= */

/** Un événement de la vie courante et son contraire, écrits en toutes lettres. */
const CONTRAIRES_P: { sit: (p: string) => string; a: string; nonA: string }[] = [
  { sit: () => `D'après Météo-France, demain à ${pk(VILLES_P)},`, a: "il pleut", nonA: "il ne pleut pas" },
  { sit: (p) => `Le matin, le car jaune de ${p}`, a: "est en retard", nonA: "n'est pas en retard" },
  { sit: (p) => `À la tombola, le ticket de ${p}`, a: "est gagnant", nonA: "est perdant" },
  { sit: (p) => `Au penalty, ${p}`, a: "marque", nonA: "rate son tir" },
  { sit: () => `Lors d'une randonnée au Piton de la Fournaise, le sommet`, a: "est dans les nuages", nonA: "est dégagé" },
  { sit: (p) => `En partie de pêche à Saint-Gilles, ${p}`, a: "attrape au moins un poisson", nonA: "n'attrape aucun poisson" },
  { sit: () => `Sur la route du littoral, un automobiliste pris au hasard`, a: "est bloqué dans un bouchon", nonA: "n'est pas bloqué dans un bouchon" },
  { sit: () => `Un élève de seconde pris au hasard`, a: "est demi-pensionnaire", nonA: "n'est pas demi-pensionnaire" },
  { sit: () => `Une graine de letchi plantée au jardin créole`, a: "germe", nonA: "ne germe pas" },
  { sit: (p) => `Au jeu de l'oie, ${p}`, a: "tombe sur une case « oie »", nonA: "ne tombe pas sur une case « oie »" },
  { sit: () => `L'équipe de basket de ${pk(VILLES_P)}`, a: "gagne son prochain match", nonA: "ne gagne pas son prochain match" },
  { sit: () => `Un smartphone pris au hasard dans la classe`, a: "a l'écran fissuré", nonA: "n'a pas l'écran fissuré" },
  { sit: (p) => `Au trail de Cilaos, ${p}`, a: "termine la course", nonA: "abandonne" },
  { sit: () => `Un client du snack pris au hasard`, a: "commande un bouchon", nonA: "ne commande pas de bouchon" },
];
/** ★2 — P(A) donnée (décimal, pourcentage ou fraction) : P(non A). */
function contrSimpleP(): QP {
  const c = pk(CONTRAIRES_P);
  const p = pk(NOMS_P);
  const forme = pk(["dec", "pct", "frac"] as const);
  let a: number, D: number, aTxt: string;
  if (forme === "frac") {
    D = pk([3, 4, 5, 6, 7, 8, 9, 10, 12, 20]);
    a = 1 + Math.floor(Math.random() * (D - 1));
    while (redP(a, D)[1] !== D && Math.random() < 0.7) a = 1 + Math.floor(Math.random() * (D - 1));
    aTxt = tfP(a, D);
  } else {
    D = 100;
    a = pk([5, 10, 15, 20, 25, 30, 35, 40, 45, 55, 60, 65, 70, 75, 80, 85, 90, 95, 12, 18, 23, 37, 42, 64, 78, 83]);
    aTxt = forme === "pct" ? `${a} %` : cP(a);
  }
  const intro = `${c.sit(p)} ${c.a} avec la probabilité ${aTxt}.`;
  const T = pk([
    `Quelle est la probabilité que ce ne soit pas le cas ?`,
    `Calcule la probabilité de l'événement contraire : « ${c.nonA} ».`,
    `On note $A$ cet événement. Que vaut $P(\\overline{A})$ ?`,
    `Quelle est la probabilité de l'événement « ${c.nonA} » ?`,
  ]);
  const enD = forme === "frac" ? `1 − ${aTxt} = ${tfP(D, D)} − ${aTxt} = ${fracEgP(D - a, D)}` : forme === "pct" ? `100 % − ${a} % = ${100 - a} %, soit ${cP(100 - a)}` : `1 − ${cP(a)} = ${cP(100 - a)}`;
  const explanation = exp(
    "L'événement contraire de A, noté Ā, est réalisé quand A ne l'est pas ; $P(\\overline{A}) = 1 - P(A)$.",
    `Ici Ā est « ${c.nonA} ».`,
    `P(Ā) = ${enD}.`,
    `P(Ā) = ${forme === "pct" ? `${100 - a} %` : affP(D - a, D, forme !== "frac")}.`
  );
  if (Math.random() < 0.5) {
    return { text: `${intro} ${T}`, format: "short", expected: ecrituresP(D - a, D), comparator: "fraction_decimal_equivalent", explanation };
  }
  if (forme === "frac") {
    return { text: `${intro} ${T}`, format: "qcm", ...qcmFrP([D - a, D], [[a, D], [D - a, D + 1], [1, D], [D - a - 1, D]]), comparator: "mcq_exact", explanation };
  }
  // Leurres : P(A) recopiée, et des voisins de la bonne réponse (erreur de soustraction).
  return { text: `${intro} ${T}`, format: "qcm", ...qcmP(100 - a, 100, [a, 100 - a - 10, 100 - a + 10, 100 - a + 5], true), comparator: "mcq_exact", explanation };
}

/** ★3 — Une loi, P(Ā) pour un événement A. */
function contrLoiP(): QP {
  const m = modeleP(Math.random() < 0.6, pk(NOMS_P));
  const k = m.issues.length;
  const pr = loiAleatoire(k, 100, 5);
  const a = m.A.reduce((s, i) => s + pr[i], 0);
  const nonA = m.issues.map((_, i) => i).filter((i) => !m.A.includes(i));
  const T = pk([
    `On note $A$ l'événement « ${m.evLib} ». Calcule $P(\\overline{A})$.`,
    `Quelle est la probabilité de l'événement contraire de « ${m.evLib} » ?`,
    `$A$ est l'événement « ${m.evLib} ». Que vaut la probabilité de « non $A$ » ?`,
  ]);
  const text = `${m.sit} ${pk(INTRO_LOI_P)} ${loiTexteP(m, pr.map(cP))}. ${T}`;
  const explanation = exp(
    "$P(\\overline{A}) = 1 - P(A)$ ; on peut aussi additionner les probabilités des issues qui ne sont PAS dans A.",
    `A est réalisé par ${listeEtP(m.A.map((i) => libIssueP(m, i)))}, donc Ā par ${listeEtP(nonA.map((i) => libIssueP(m, i)))}.`,
    `P(A) = ${m.A.map((i) => cP(pr[i])).join(" + ")} = ${cP(a)}, donc P(Ā) = 1 − ${cP(a)} = ${cP(100 - a)}.`,
    `P(Ā) = ${cP(100 - a)}.`
  );
  const canvas = tableauLoiP(m.issues.map((x) => (m.vals ? x : majP(x))), pr.map(cP));
  if (Math.random() < 0.5) {
    return { text: text + pk(FMT_P), format: "short", expected: ecrituresP(100 - a, 100), comparator: "fraction_decimal_equivalent", explanation, canvas };
  }
  const pieges = [a, ...nonA.map((i) => 100 - a - pr[i]), ...(m.borne ? [100 - m.borne.reduce((s, i) => s + pr[i], 0)] : [])];
  return { text, format: "qcm", ...qcmP(100 - a, 100, pieges, true), comparator: "mcq_exact", explanation, canvas };
}

/** ★4 — « Au moins un » : on passe par le contraire « aucun ». */
const REPETES_P: { sit: (p: string) => string; s: [number, number]; succes: string; aucun: string }[] = [
  { sit: (p) => `${p} lance deux fois un dé équilibré à 6 faces.`, s: [1, 6], succes: "obtenir au moins un 6", aucun: "aucun 6" },
  { sit: (p) => `${p} lance deux fois un dé équilibré à 4 faces.`, s: [1, 4], succes: "obtenir au moins un 4", aucun: "aucun 4" },
  { sit: (p) => `${p} lance deux fois une pièce truquée qui tombe sur pile avec la probabilité 0,4.`, s: [4, 10], succes: "obtenir au moins un pile", aucun: "aucun pile" },
  { sit: (p) => `${p} fait tourner deux fois une roue de 5 secteurs égaux, dont un seul est gagnant.`, s: [1, 5], succes: "gagner au moins une fois", aucun: "aucun gain" },
  { sit: (p) => `${p} lance deux fois un dé équilibré à 6 faces.`, s: [1, 3], succes: "obtenir au moins une fois un 5 ou un 6", aucun: "ni 5 ni 6 aux deux lancers" },
  { sit: (p) => `Au basket, ${p} réussit un lancer franc avec la probabilité 0,7 ; les deux lancers sont indépendants.`, s: [7, 10], succes: "réussir au moins un des deux lancers", aucun: "deux échecs" },
  { sit: (p) => `Le car jaune de ${p} est en retard avec la probabilité 0,2 chaque matin, indépendamment d'un jour à l'autre.`, s: [2, 10], succes: "avoir au moins un retard sur deux matins", aucun: "aucun retard" },
  { sit: () => `Chaque jour, il pleut à Saint-Benoît avec la probabilité 0,6, indépendamment d'un jour à l'autre.`, s: [6, 10], succes: "avoir au moins un jour de pluie sur deux jours", aucun: "deux jours secs" },
  { sit: (p) => `Une graine de letchi germe avec la probabilité 0,8. ${p} en plante deux, qui germent indépendamment.`, s: [8, 10], succes: "obtenir au moins une graine qui germe", aucun: "aucune graine ne germe" },
  { sit: (p) => `${p} achète deux tickets à gratter ; chacun est gagnant avec la probabilité 0,1, indépendamment.`, s: [1, 10], succes: "avoir au moins un ticket gagnant", aucun: "deux tickets perdants" },
];
function contrAuMoinsP(): QP {
  if (Math.random() < 0.5) {
    const r = pk(REPETES_P);
    const [n, d] = r.s;
    const q = d - n;
    const D = d * d;
    const rep = D - q * q;
    const dec = d === 10;
    const deS = /^[aeiouéèêh]/i.test(r.succes) ? `d'${r.succes}` : `de ${r.succes}`;
    const T = pk([`Quelle est la probabilité ${deS} ?`, `Calcule la probabilité ${deS}.`, `On note $A$ : « ${r.succes} ». Calcule $P(A)$ en passant par l'événement contraire.`]);
    const explanation = exp(
      "« Au moins un » a pour contraire « aucun » : $P(A) = 1 - P(\\overline{A})$.",
      `Le contraire est « ${r.aucun} » : un échec à chaque épreuve, de probabilité ${affP(q, d, dec)} ; sur l'arbre, on multiplie le long du chemin.`,
      `P(${r.aucun}) = ${affP(q, d, dec)} × ${affP(q, d, dec)} = ${affP(q * q, D, dec)}, donc P(A) = 1 − ${affP(q * q, D, dec)} = ${affP(rep, D, dec)}.`,
      `P(A) = ${affP(rep, D, dec)}.`
    );
    if (Math.random() < 0.5) {
      return { text: `${r.sit(pk(NOMS_P))} ${T}`, format: "short", expected: ecrituresP(rep, D), comparator: "fraction_decimal_equivalent", explanation };
    }
    // Leurres : additionner les deux épreuves (2p), p², q², et p (une seule épreuve).
    const pieges = [2 * n * d, n * n, q * q, n * d];
    return { text: `${r.sit(pk(NOMS_P))} ${T}`, format: "qcm", ...qcmP(rep, D, pieges, dec), comparator: "mcq_exact", explanation };
  }
  // Une loi qui commence à 0 : « au moins 1 » = 1 − P(0) ; « au plus max − 1 » = 1 − P(max).
  const c = pk(CTX_NUM_P.filter((x) => x.vals()[0] === 0));
  const vals = c.vals();
  const k = vals.length;
  const pr = loiAleatoire(k, 100, 5);
  const bas = Math.random() < 0.6;
  const j = bas ? 0 : k - 1;
  const lib = bas ? `${c.sujet} est au moins égal à ${vals[1]}` : `${c.sujet} est au plus égal à ${vals[k - 2]}`;
  const rep = 100 - pr[j];
  const text = `${c.sit(pk(NOMS_P))} ${pk(INTRO_LOI_P)} ${vals.map((v, i) => `${v} : ${cP(pr[i])}`).join(" ; ")}. ${pk([`Calcule la probabilité de l'événement « ${lib} » en passant par son contraire.`, `Quelle est la probabilité de l'événement « ${lib} » ?`, `On note $A$ l'événement « ${lib} ». Que vaut $P(A)$ ?`])}`;
  const explanation = exp(
    "$P(A) = 1 - P(\\overline{A})$ : utile quand le contraire a peu d'issues.",
    `Le contraire de « ${lib} » est « ${c.sujet} est égal à ${vals[j]} » : une seule issue.`,
    `P(A) = 1 − ${cP(pr[j])} = ${cP(rep)}.`,
    `P(A) = ${cP(rep)}.`
  );
  const canvas = tableauLoiP(vals.map(String), pr.map(cP));
  if (Math.random() < 0.5) return { text: text + pk(FMT_P), format: "short", expected: ecrituresP(rep, 100), comparator: "fraction_decimal_equivalent", explanation, canvas };
  const pieges = [pr[j], 100 - pr[j] - pr[bas ? 1 : k - 2], pr[bas ? 1 : k - 2], 100 - pr[bas ? 1 : k - 2]];
  return { text, format: "qcm", ...qcmP(rep, 100, pieges, true), comparator: "mcq_exact", explanation, canvas };
}

/* =========================================================================
   PROBA_REUNION_INTERSECTION — A ∪ B, A ∩ B, incompatibles, contraires.
========================================================================= */

const enonceDeuxP = (d: DeuxEvtsP, p: string) =>
  `${d.c.sit(p)} On note $A$ l'événement « ${d.A.lib} » et $B$ l'événement « ${d.B.lib} ».`;

/** ★2 — Écrire A ∪ B ou A ∩ B. */
function riEnsembleP(): QP {
  const d = deuxEvtsP();
  const ou = Math.random() < 0.5;
  const cible = ou ? d.uni : d.inter;
  const symb = ou ? "A \\cup B" : "A \\cap B";
  const T = pk([
    `Quelles issues réalisent l'événement $${symb}$ ?`,
    `Écris l'événement $${symb}$ sous forme d'ensemble.`,
    `L'événement « $A$ ${ou ? "ou" : "et"} $B$ » est égal à :`,
  ]);
  const symDiff = d.uni.filter((v) => !d.inter.includes(v));
  const q = qcmT(ensP(cible), [ensP(ou ? d.inter : d.uni), ensP(d.A.set), ensP(d.B.set), ensP(symDiff)]);
  return {
    text: `${enonceDeuxP(d, pk(NOMS_P))} ${T}`,
    format: "qcm",
    ...q,
    comparator: "mcq_exact",
    explanation: exp(
      ou ? "$A \\cup B$ (« A ou B ») : les issues qui sont dans A, dans B, ou dans les deux." : "$A \\cap B$ (« A et B ») : les issues qui sont à la fois dans A et dans B.",
      `$A$ = ${ensP(d.A.set)} et $B$ = ${ensP(d.B.set)}.`,
      ou ? `On réunit les deux listes sans répéter ${listeEtP(d.inter.map(String))}.` : `Les issues communes sont ${listeEtP(d.inter.map(String))}.`,
      `$${symb}$ = ${ensP(cible)}.`
    ),
  };
}

/** ★3 — A et B sont-ils incompatibles ? (et pas : contraires) */
function riIncompatP(): QP {
  const inc = Math.random() < 0.5;
  const d = deuxEvtsP(inc);
  const faux = d.inter.length ? d.inter : [d.A.set[0]];
  const C = [
    "Oui, car aucune issue n'est commune à A et B",
    `Non, car $A \\cap B$ = ${ensP(faux)}`,
    "Oui, car $A \\cup B$ n'est pas l'univers",
    "Non, car A et B ne sont pas contraires",
  ];
  const bon = inc ? C[0] : C[1];
  return {
    text: `${enonceDeuxP(d, pk(NOMS_P))} ${pk(["Les événements $A$ et $B$ sont-ils incompatibles ?", "$A$ et $B$ peuvent-ils se réaliser en même temps ? Sont-ils incompatibles ?", "Peut-on dire que $A$ et $B$ sont incompatibles ?"])}`,
    format: "qcm",
    choices: melangeP(C),
    expected: [bon],
    comparator: "mcq_exact",
    explanation: exp(
      "Deux événements sont incompatibles quand $A \\cap B = \\varnothing$ : ils ne peuvent pas se réaliser en même temps. (Incompatibles ne veut pas dire contraires.)",
      `$A$ = ${ensP(d.A.set)}, $B$ = ${ensP(d.B.set)}.`,
      inc ? "Aucune issue n'est dans les deux listes : $A \\cap B = \\varnothing$." : `${listeEtP(d.inter.map(String))} ${d.inter.length > 1 ? "sont" : "est"} dans les deux : $A \\cap B$ = ${ensP(d.inter)}.`,
      inc ? "A et B sont incompatibles." : "A et B ne sont pas incompatibles."
    ),
  };
}

/** ★4 — Avec les contraires : Ā ∩ B, A ∩ B̄, Ā ∪ B, le contraire de A ∪ B. */
function riComplementP(): QP {
  const d = deuxEvtsP();
  const U = d.vals;
  const nA = U.filter((v) => !d.A.set.includes(v));
  const nB = U.filter((v) => !d.B.set.includes(v));
  const cas = pk([
    { s: "\\overline{A} \\cap B", lire: "B sans A", set: d.B.set.filter((v) => nA.includes(v)) },
    { s: "A \\cap \\overline{B}", lire: "A sans B", set: d.A.set.filter((v) => nB.includes(v)) },
    { s: "\\overline{A} \\cup B", lire: "pas A, ou B", set: U.filter((v) => nA.includes(v) || d.B.set.includes(v)) },
    { s: "\\overline{A \\cup B}", lire: "ni A ni B", set: U.filter((v) => !d.uni.includes(v)) },
    { s: "\\overline{A \\cap B}", lire: "pas les deux à la fois", set: U.filter((v) => !d.inter.includes(v)) },
  ]);
  const q = qcmT(ensP(cas.set), [ensP(d.inter), ensP(d.uni), ensP(nA), ensP(nB), ensP(U.filter((v) => !cas.set.includes(v)))]);
  return {
    text: `${enonceDeuxP(d, pk(NOMS_P))} ${pk([`Quelles issues réalisent l'événement $${cas.s}$ ?`, `Écris $${cas.s}$ sous forme d'ensemble.`, `Détermine l'événement $${cas.s}$.`])}`,
    format: "qcm",
    ...q,
    comparator: "mcq_exact",
    explanation: exp(
      "$\\overline{A}$ regroupe les issues qui ne sont pas dans A ; ∩ veut dire « et », ∪ veut dire « ou ».",
      `Univers ${ensP(U)} ; $A$ = ${ensP(d.A.set)}, $\\overline{A}$ = ${ensP(nA)} ; $B$ = ${ensP(d.B.set)}, $\\overline{B}$ = ${ensP(nB)}.`,
      `$${cas.s}$ se lit « ${cas.lire} » : ${ensP(cas.set)}.`,
      `$${cas.s}$ = ${ensP(cas.set)}.`
    ),
  };
}

/* =========================================================================
   PROBA_FORMULE_UNION — P(A ∪ B) = P(A) + P(B) − P(A ∩ B).
========================================================================= */

/** Des sondages : deux caractères qui peuvent se cumuler. */
const SONDAGES_P: { pop: string; a: string; b: string }[] = [
  { pop: "élèves du lycée", a: "fait du sport en club", b: "joue d'un instrument" },
  { pop: "habitants de Saint-Paul", a: "a un chien", b: "a un chat" },
  { pop: "clients du snack", a: "prend un samoussa", b: "prend un bouchon" },
  { pop: "élèves de seconde", a: "est déjà monté au Piton des Neiges", b: "a déjà vu le Piton de la Fournaise en éruption" },
  { pop: "touristes de l'été", a: "visite Cilaos", b: "randonne dans Mafate" },
  { pop: "élèves de la classe", a: "lit des mangas", b: "joue aux jeux vidéo" },
  { pop: "habitants du quartier", a: "écoute du maloya", b: "écoute du séga" },
  { pop: "élèves de seconde", a: "a plus de 10 en maths", b: "a plus de 10 en français" },
  { pop: "lycéens", a: "possède un vélo", b: "possède un scooter" },
  { pop: "visiteurs du marché de Saint-Pierre", a: "achète des letchis", b: "achète des mangues" },
  { pop: "joueurs du club de foot", a: "joue en attaque", b: "a marqué cette saison" },
  { pop: "élèves de l'internat", a: "rentre chez lui le week-end", b: "fait partie de l'UNSS" },
];
type SondageTireP = { s: (typeof SONDAGES_P)[number]; pA: number; pB: number; pI: number; pU: number; pct: boolean; intro: string };
function sondageP(): SondageTireP {
  const s = pk(SONDAGES_P);
  const pct = Math.random() < 0.5;
  for (;;) {
    const pA = 5 * (2 + Math.floor(Math.random() * 13));
    const pB = 5 * (2 + Math.floor(Math.random() * 13));
    const pI = 5 * (1 + Math.floor(Math.random() * 8));
    const pU = pA + pB - pI;
    if (pI >= Math.min(pA, pB) || pU > 95) continue;
    const t = (x: number) => (pct ? `${x} %` : cP(x));
    const intro = pct
      ? `Parmi les ${s.pop}, ${t(pA)} ${s.a.replace(/^/, "")}, ${t(pB)} ${s.b}, et ${t(pI)} les deux à la fois. On choisit une personne au hasard.`
      : `On choisit au hasard une personne parmi les ${s.pop}. On note $A$ : « elle ${s.a} » et $B$ : « elle ${s.b} ». On sait que $P(A) = ${t(pA).replace(",", "{,}")}$, $P(B) = ${t(pB).replace(",", "{,}")}$ et $P(A \\cap B) = ${t(pI).replace(",", "{,}")}$.`;
    return { s, pA, pB, pI, pU, pct, intro };
  }
}

/** ★2 — Événements incompatibles : P(A ∪ B) = P(A) + P(B). */
function unionIncompatP(): QP {
  const c = pk(CTX_CAT_P);
  const issues = melangeP(c.issues).slice(0, 2);
  const pr = [5 * (1 + Math.floor(Math.random() * 9)), 5 * (1 + Math.floor(Math.random() * 9))];
  const lib = c.ou(issues.map((x) => x.g));
  const text =
    `${c.sit(pk(NOMS_P))} On sait que P(${issues[0].n}) = ${cP(pr[0])} et P(${issues[1].n}) = ${cP(pr[1])}. ` +
    pk([`Quelle est la probabilité de l'événement « ${lib} » ?`, `Calcule la probabilité de l'événement « ${lib} ».`, `Ces deux issues sont incompatibles. Que vaut la probabilité de « ${lib} » ?`]);
  const s = pr[0] + pr[1];
  const explanation = exp(
    "$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$ ; quand A et B sont incompatibles, $P(A \\cap B) = 0$.",
    `« ${issues[0].n} » et « ${issues[1].n} » ne peuvent pas se produire en même temps : ils sont incompatibles.`,
    `P = ${cP(pr[0])} + ${cP(pr[1])} − 0 = ${cP(s)}.`,
    `La probabilité est ${cP(s)}.`
  );
  if (Math.random() < 0.5) return { text: text + pk(FMT_P), format: "short", expected: ecrituresP(s, 100), comparator: "fraction_decimal_equivalent", explanation };
  return { text, format: "qcm", ...qcmP(s, 100, [Math.round((pr[0] * pr[1]) / 100), Math.abs(pr[0] - pr[1]), 100 - s, s - 5], true), comparator: "mcq_exact", explanation };
}

/** ★3 — P(A ∪ B) par la formule. */
function unionFormuleP(): QP {
  const t = sondageP();
  const T = t.pct
    ? pk([`Quelle est la probabilité de l'événement « elle ${t.s.a} ou ${t.s.b} » ?`, `Calcule la probabilité de l'événement « elle ${t.s.a} ou elle ${t.s.b} ».`])
    : pk(["Calcule $P(A \\cup B)$.", "Que vaut $P(A \\cup B)$ ?", "Quelle est la probabilité de « $A$ ou $B$ » ?"]);
  const explanation = exp(
    "$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$ : on retire l'intersection, comptée deux fois.",
    `A : « ${t.s.a} », B : « ${t.s.b} ».`,
    `$P(A \\cup B) = ${cP(t.pA)} + ${cP(t.pB)} - ${cP(t.pI)} = ${cP(t.pU)}$`.replace(/(\d),(\d)/g, "$1{,}$2") + ".",
    `$P(A \\cup B) = ${cP(t.pU).replace(",", "{,}")}$.`
  );
  if (Math.random() < 0.5) return { text: `${t.intro} ${T}${pk(FMT_P)}`, format: "short", expected: ecrituresP(t.pU, 100), comparator: "fraction_decimal_equivalent", explanation };
  // Leurres : oublier de retirer l'intersection, la retirer deux fois, la prendre pour la réponse.
  return { text: `${t.intro} ${T}`, format: "qcm", ...qcmP(t.pU, 100, [t.pA + t.pB, t.pU - t.pI, 100 - t.pU, t.pA + t.pB + t.pI], true), comparator: "mcq_exact", explanation };
}

/** ★4 — La formule à l'envers : P(A ∩ B), P(B), ou « ni A ni B ». */
function unionEnversP(): QP {
  const t = sondageP();
  const fmt = (x: number) => `$${cP(x).replace(",", "{,}")}$`;
  const cas = pk(["inter", "B", "ni"] as const);
  const sit = `On choisit au hasard une personne parmi les ${t.s.pop}. On note $A$ : « elle ${t.s.a} » et $B$ : « elle ${t.s.b} ».`;
  let text: string, rep: number, calc: string, pieges: number[];
  if (cas === "inter") {
    text = `${sit} On sait que $P(A) =$ ${fmt(t.pA)}, $P(B) =$ ${fmt(t.pB)} et $P(A \\cup B) =$ ${fmt(t.pU)}. ${pk(["Calcule $P(A \\cap B)$.", "Quelle est la probabilité qu'elle vérifie les deux ?"])}`;
    rep = t.pI;
    calc = `$P(A \\cap B) = P(A) + P(B) - P(A \\cup B)$ = ${cP(t.pA)} + ${cP(t.pB)} − ${cP(t.pU)} = ${cP(t.pI)}.`;
    pieges = [t.pU - t.pA, t.pA + t.pB - 100, t.pU - t.pB, 100 - t.pU];
  } else if (cas === "B") {
    text = `${sit} On sait que $P(A) =$ ${fmt(t.pA)}, $P(A \\cap B) =$ ${fmt(t.pI)} et $P(A \\cup B) =$ ${fmt(t.pU)}. ${pk(["Calcule $P(B)$.", "Que vaut $P(B)$ ?"])}`;
    rep = t.pB;
    calc = `$P(B) = P(A \\cup B) - P(A) + P(A \\cap B)$ = ${cP(t.pU)} − ${cP(t.pA)} + ${cP(t.pI)} = ${cP(t.pB)}.`;
    pieges = [t.pU - t.pA, t.pU - t.pA - t.pI, t.pU - t.pI];
  } else {
    text = `${t.intro} ${pk([`Quelle est la probabilité qu'elle ne vérifie ni l'un ni l'autre ?`, "Calcule la probabilité de l'événement « ni $A$ ni $B$ »."])}`;
    rep = 100 - t.pU;
    calc = `P(A ∪ B) = ${cP(t.pA)} + ${cP(t.pB)} − ${cP(t.pI)} = ${cP(t.pU)}, puis « ni A ni B » est son contraire : 1 − ${cP(t.pU)} = ${cP(rep)}.`;
    pieges = [t.pU, 100 - t.pA - t.pB, 100 - t.pA - t.pB + 2 * t.pI, 100 - t.pI];
  }
  const explanation = exp(
    "$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$ : trois des quatre nombres donnent le quatrième.",
    cas === "ni" ? "On calcule d'abord P(A ∪ B), puis on passe au contraire." : "On isole la probabilité cherchée dans la formule.",
    calc,
    `Réponse : ${cP(rep)}.`
  );
  if (Math.random() < 0.5) return { text: text + pk(FMT_P), format: "short", expected: ecrituresP(rep, 100), comparator: "fraction_decimal_equivalent", explanation };
  return { text, format: "qcm", ...qcmP(rep, 100, pieges, true), comparator: "mcq_exact", explanation };
}

/* =========================================================================
   PROBA_TABLEAU_ARBRE — deux épreuves : tableau à double entrée et arbre.
========================================================================= */

/** ★2 — Compter les issues d'une expérience à deux étapes. */
const DEUX_ETAPES_P: { txt: (a: number, b: number, p: string) => string; a: number[]; b: number[] }[] = [
  { txt: (a, b) => `À la cantine, on choisit une entrée parmi ${a} et un plat parmi ${b}. Combien de menus différents peut-on composer ?`, a: [2, 3, 4, 5], b: [2, 3, 4, 5, 6] },
  { txt: (a, b, p) => `${p} choisit un t-shirt parmi ${a} et un short parmi ${b}. Combien de tenues différentes sont possibles ?`, a: [3, 4, 5, 6], b: [2, 3, 4] },
  { txt: (a, b, p) => `${p} lance un dé à ${a} faces puis un dé à ${b} faces. Combien d'issues (couples de numéros) y a-t-il ?`, a: [4, 6, 8], b: [4, 6, 8, 12] },
  { txt: (a, b) => `Pour aller de Saint-Pierre à Cilaos en passant par Saint-Louis, il y a ${a} itinéraires jusqu'à Saint-Louis puis ${b} jusqu'à Cilaos. Combien de trajets complets possibles ?`, a: [2, 3, 4], b: [2, 3] },
  { txt: (a, b, p) => `Au snack, ${p} choisit un samoussa parmi ${a} saveurs, puis une boisson parmi ${b}. Combien de commandes différentes ?`, a: [3, 4, 5], b: [2, 3, 4, 5] },
  { txt: (a, b, p) => `${p} tire une boule dans une urne de ${a} boules numérotées, la remet, puis en tire une dans une urne de ${b} boules. Combien de couples de numéros possibles ?`, a: [3, 4, 5, 6], b: [2, 3, 4, 5] },
  { txt: (a, b, p) => `Le cadenas de ${p} a un code fait d'une lettre parmi ${a} puis d'un chiffre parmi ${b}. Combien de codes différents existe-t-il ?`, a: [3, 4, 5, 6], b: [5, 6, 8, 10] },
  { txt: (a, b) => `Au tournoi de l'UNSS, chacune des ${a} équipes de filles affronte chacune des ${b} équipes de garçons une fois. Combien de matchs ?`, a: [3, 4, 5], b: [3, 4, 6] },
];
function arbreCompterP(): QP {
  const e = pk(DEUX_ETAPES_P);
  const a = pk(e.a), b = pk(e.b);
  const t = e.txt(a, b, pk(NOMS_P));
  return {
    text: `${pk(["", "Pense à un arbre. ", "Pense au tableau à double entrée. ", "Calcule sans tout écrire. ", "Deux étapes successives. "])}${t}`,
    format: "short",
    expected: [String(a * b)],
    comparator: "number_equal",
    explanation: exp(
      "Dans un arbre (ou un tableau à double entrée), chaque choix de la 1re étape se combine avec chaque choix de la 2de.",
      `L'arbre a ${a} branches au 1er niveau, et ${b} branches au bout de chacune.`,
      `${a} × ${b} = ${a * b}.`,
      `Il y a ${a * b} issues.`
    ),
  };
}

/** Deux événements indépendants de la vie courante, probabilité en dixièmes. */
const EV_INDEP_P: { oui: string; non: string; court: string }[] = [
  { oui: "il pleut à Saint-Denis", non: "il ne pleut pas à Saint-Denis", court: "pluie" },
  { oui: "le car jaune est en retard", non: "le car jaune est à l'heure", court: "retard" },
  { oui: "la cantine sert du cari", non: "la cantine ne sert pas de cari", court: "cari" },
  { oui: "le premier lancer franc est réussi", non: "le premier lancer franc est raté", court: "lancer 1" },
  { oui: "la route du littoral est fermée", non: "la route du littoral est ouverte", court: "fermeture" },
  { oui: "le volcan est visible du gîte", non: "le volcan est caché", court: "volcan" },
  { oui: "le ticket de tombola est gagnant", non: "le ticket de tombola est perdant", court: "ticket" },
  { oui: "le premier service au tennis est réussi", non: "le premier service au tennis est raté", court: "service" },
  { oui: "la vague est surfable", non: "la vague n'est pas surfable", court: "vague" },
];
function deuxIndepP() {
  const [E, F] = melangeP(EV_INDEP_P).slice(0, 2);
  const p = 1 + Math.floor(Math.random() * 9);
  const q = 1 + Math.floor(Math.random() * 9);
  const sit = `Chaque jour, on observe deux événements indépendants : « ${E.oui} », de probabilité ${frP(p / 10)}, et « ${F.oui} », de probabilité ${frP(q / 10)}. On représente la journée par un arbre.`;
  return { E, F, p, q, sit };
}
const f10 = (x: number) => frP(x / 10);
const f100 = (x: number) => frP(x / 100);

function arbreFigP(E: { court: string }, F: { court: string }, p: number, q: number): CanvasFigure {
  const br = (lab: string, pr: number, enfants?: { label: string; proba: string }[]) => ({ label: lab, proba: f10(pr), enfants });
  const sous = [
    { label: F.court, proba: f10(q) },
    { label: `non ${F.court}`, proba: f10(10 - q) },
  ];
  return { kind: "arbre_proba", racineEnfants: [br(E.court, p, sous), br(`non ${E.court}`, 10 - p, sous)] };
}

/** ★2 / ★3 — La probabilité d'UN chemin : on multiplie le long des branches. */
function arbreCheminP(avecNon: boolean): QP {
  const { E, F, p, q, sit } = deuxIndepP();
  const e1 = avecNon && Math.random() < 0.5;
  const e2 = avecNon && (!e1 || Math.random() < 0.5);
  const pa = e1 ? 10 - p : p;
  const pb = e2 ? 10 - q : q;
  const lib = `${e1 ? E.non : E.oui} et ${e2 ? F.non : F.oui}`;
  const rep = pa * pb;
  const text = `${sit} ${pk([`Le même jour, quelle est la probabilité de l'événement « ${lib} » ?`, `Calcule la probabilité de l'événement « ${lib} ».`, `Avec l'arbre, détermine la probabilité de « ${lib} ».`])}`;
  const explanation = exp(
    "Sur un arbre, la probabilité d'un chemin est le PRODUIT des probabilités des branches qui le composent.",
    `Chemin : « ${e1 ? E.non : E.oui} » (${f10(pa)})${e1 ? ` — c'est le contraire : 1 − ${f10(p)}` : ""}, puis « ${e2 ? F.non : F.oui} » (${f10(pb)})${e2 ? ` — 1 − ${f10(q)}` : ""}.`,
    `${f10(pa)} × ${f10(pb)} = ${f100(rep)}.`,
    `La probabilité est ${f100(rep)}.`
  );
  const canvas = arbreFigP(E, F, p, q);
  if (Math.random() < 0.5) return { text: text + pk(FMT_P), format: "short", expected: ecrituresP(rep, 100), comparator: "fraction_decimal_equivalent", explanation, canvas };
  // Leurres : additionner les branches, oublier le contraire, garder une seule branche.
  const pieges = [10 * (pa + pb), p * q, pa * 10, pb * 10, (10 - pa) * (10 - pb)];
  return { text, format: "qcm", ...qcmP(rep, 100, pieges.filter((x) => x !== rep), true), comparator: "mcq_exact", explanation, canvas };
}

/** ★4 — Un événement réalisé par PLUSIEURS chemins : on additionne. */
function arbrePlusieursP(): QP {
  const { E, F, p, q, sit } = deuxIndepP();
  const cas = pk(["exact1", "auMoins", "memeIssue"] as const);
  const P1 = p * q, P2 = p * (10 - q), P3 = (10 - p) * q, P4 = (10 - p) * (10 - q);
  let lib: string, rep: number, calc: string, pieges: number[];
  if (cas === "exact1") {
    lib = `un seul des deux événements se produit`;
    rep = P2 + P3;
    calc = `Deux chemins : « ${E.court} puis non ${F.court} » : ${f10(p)} × ${f10(10 - q)} = ${f100(P2)} ; « non ${E.court} puis ${F.court} » : ${f10(10 - p)} × ${f10(q)} = ${f100(P3)}. Total : ${f100(P2)} + ${f100(P3)} = ${f100(rep)}.`;
    pieges = [P2, P3, P1 + P4, 10 * (p + q)];
  } else if (cas === "auMoins") {
    lib = `au moins un des deux événements se produit`;
    rep = 100 - P4;
    calc = `Trois chemins sur quatre ; plus vite par le contraire « aucun des deux » : ${f10(10 - p)} × ${f10(10 - q)} = ${f100(P4)}, donc 1 − ${f100(P4)} = ${f100(rep)}.`;
    pieges = [10 * (p + q), P1, P4, P2 + P3];
  } else {
    lib = `les deux événements se produisent, ou aucun des deux`;
    rep = P1 + P4;
    calc = `Deux chemins : ${f10(p)} × ${f10(q)} = ${f100(P1)} et ${f10(10 - p)} × ${f10(10 - q)} = ${f100(P4)}. Total : ${f100(rep)}.`;
    pieges = [P1, P4, P2 + P3, 100 - P1];
  }
  const text = `${sit} ${pk([`Quelle est la probabilité de l'événement « ${lib} » ?`, `Calcule la probabilité de l'événement : « ${lib} ».`, `En utilisant l'arbre, calcule la probabilité de « ${lib} ».`])}`;
  const explanation = exp(
    "On multiplie le long d'un chemin, puis on ADDITIONNE les chemins qui réalisent l'événement.",
    `Les quatre chemins : ${f100(P1)}, ${f100(P2)}, ${f100(P3)}, ${f100(P4)} (leur somme vaut 1).`,
    calc,
    `La probabilité est ${f100(rep)}.`
  );
  const canvas = arbreFigP(E, F, p, q);
  if (Math.random() < 0.5) return { text: text + pk(FMT_P), format: "short", expected: ecrituresP(rep, 100), comparator: "fraction_decimal_equivalent", explanation, canvas };
  return { text, format: "qcm", ...qcmP(rep, 100, pieges.filter((x) => x !== rep), true), comparator: "mcq_exact", explanation, canvas };
}

/** ★3 / ★4 — Deux dés (ou roues) équilibrés : le tableau à double entrée. */
const OPS_P = [
  { nom: "la somme", f: (a: number, b: number) => a + b },
  { nom: "le produit", f: (a: number, b: number) => a * b },
  { nom: "l'écart (le plus grand moins le plus petit)", f: (a: number, b: number) => Math.abs(a - b) },
  { nom: "le plus grand des deux numéros", f: (a: number, b: number) => Math.max(a, b) },
];
function arbreTableauDesP(difficile: boolean): QP {
  const p = pk(NOMS_P);
  const [m, n] = pk([[6, 6], [6, 6], [4, 6], [4, 4], [6, 8], [8, 8]] as const);
  const op = pk(OPS_P);
  const res: number[] = [];
  for (let a = 1; a <= m; a++) for (let b = 1; b <= n; b++) res.push(op.f(a, b));
  const N = m * n;
  const distincts = [...new Set(res)].sort((x, y) => x - y);
  let lib: string, test: (v: number) => boolean;
  if (!difficile) {
    const v = pk(distincts.filter((x) => res.filter((r) => r === x).length >= 2));
    lib = `${op.nom} vaut ${v}`;
    test = (x) => x === v;
  } else {
    const c = pk(["sup", "inf", "pair", "mult3"] as const);
    const v = pk(distincts.slice(1, -1));
    if (c === "sup") { lib = `${op.nom} est supérieur ou égal à ${v}`; test = (x) => x >= v; }
    else if (c === "inf") { lib = `${op.nom} est strictement inférieur à ${v}`; test = (x) => x < v; }
    else if (c === "pair") { lib = `${op.nom} est pair`; test = (x) => x % 2 === 0; }
    else { lib = `${op.nom} est un multiple de 3`; test = (x) => x > 0 && x % 3 === 0; }
  }
  const f = res.filter(test).length;
  if (f === 0 || f === N) return arbreTableauDesP(difficile);
  const objets = pk([
    m === n ? `deux dés équilibrés à ${m} faces` : `deux dés équilibrés, l'un à ${m} faces et l'autre à ${n} faces`,
    m === n ? `deux roues équilibrées de ${m} secteurs égaux numérotés à partir de 1` : `deux roues équilibrées, de ${m} et de ${n} secteurs égaux numérotés à partir de 1`,
  ]);
  const text = `${p} utilise ${objets} et calcule ${op.nom}. ${pk([`Quelle est la probabilité de l'événement « ${lib} » ?`, `À l'aide d'un tableau à double entrée, calcule la probabilité de l'événement « ${lib} ».`, `Calcule la probabilité de l'événement « ${lib} ».`])}`;
  const explanation = exp(
    `Le tableau à double entrée compte ${m} × ${n} = ${N} cases équiprobables.`,
    `On remplit chaque case avec ${op.nom} des deux numéros, puis on compte les cases où « ${lib} ».`,
    `${f} case${f > 1 ? "s" : ""} sur ${N} : P = ${fracEgP(f, N)}.`,
    `La probabilité est ${affP(f, N, false)}.`
  );
  if (Math.random() < 0.5) return { text: text + " Donne une fraction.", format: "short", expected: ecrituresP(f, N), comparator: "fraction_decimal_equivalent", explanation };
  // Leurres : compter les VALEURS possibles au lieu des cases, oublier une case, le contraire.
  const nbVal = distincts.length;
  const fv = distincts.filter(test).length;
  return { text, format: "qcm", ...qcmFrP([f, N], [[fv, nbVal], [f - 1, N], [N - f, N], [f, N - 1]]), comparator: "mcq_exact", explanation };
}
