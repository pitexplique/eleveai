// lib/tutor-v4/questionBank/terminale-spe/maths/denombrement.bank.ts
//
// Notion : Dénombrement et combinatoire (denombrement_combinatoire)
//
// microSkills couverts (~10 items chacun, difficultés étalées 1→5) :
//   denombrement_reconnaitre               — Reconnaître une situation de dénombrement
//   denombrement_produit_somme             — Principes additif et multiplicatif
//   denombrement_arrangement_combinaison   — Ordre compte (arrangement) ou non (combinaison)
//   denombrement_coefficient_binomial      — Coefficients binomiaux C(n,k)
//   denombrement_pascal                    — Triangle de Pascal
//   denombrement_defi                      — Exercice type bac
//
// Conventions :
// - Les réponses entières (factorielles, coefficients, comptages) sont en "short"
//   (number_equal) : taper un entier est facile. QCM pour concepts/expressions.
// - Coefficient binomial : $\binom{n}{k}$. Triangle de Pascal affiché en tableau.

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

// Triangle de Pascal (lignes n = 0 à 5).
const pascalCanvas: CanvasFigure = {
  kind: "probabilites",
  variant: "tableau",
  tableau: {
    entetes: ["n \\ k", "0", "1", "2", "3", "4", "5"],
    lignes: [
      ["0", "1", "", "", "", "", ""],
      ["1", "1", "1", "", "", "", ""],
      ["2", "1", "2", "1", "", "", ""],
      ["3", "1", "3", "3", "1", "", ""],
      ["4", "1", "4", "6", "4", "1", ""],
      ["5", "1", "5", "10", "10", "5", "1"],
    ],
  },
};

// Triangle de Pascal avec la case C(4,2) = 6 surlignée (ligne n=4, colonne k=2).
const pascalC42Canvas: CanvasFigure = {
  kind: "probabilites",
  variant: "tableau",
  tableau: {
    entetes: ["n \\ k", "0", "1", "2", "3", "4", "5"],
    lignes: [
      ["0", "1", "", "", "", "", ""],
      ["1", "1", "1", "", "", "", ""],
      ["2", "1", "2", "1", "", "", ""],
      ["3", "1", "3", "3", "1", "", ""],
      ["4", "1", "4", "6", "4", "1", ""],
      ["5", "1", "5", "10", "10", "5", "1"],
    ],
    casesSurlignees: [[4, 3]],
  },
};

export const denombrementBank: TutorBankItemV4[] = [
  /* =========================================================
     DENOMBREMENT_RECONNAITRE
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_denbr_reco_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Dénombrer, c'est :",
    format: "qcm",
    choices: [
      "compter le nombre de possibilités d'une situation",
      "calculer une probabilité",
      "résoudre une équation",
      "dériver une fonction",
    ],
    expected: ["compter le nombre de possibilités d'une situation"],
    comparator: "mcq_exact",
    hint: "« Dé-nombrer » = compter.",
    explanation: exp(
      "Le dénombrement consiste à compter des possibilités.",
      "On retient le sens du mot.",
      "On compte le nombre de façons de réaliser une situation.",
      "Dénombrer, c'est compter le nombre de possibilités."
    ),
    tags: ["terminale-spe", "denombrement", "reconnaitre", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_denbr_reco_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle question faut-il se poser en premier pour dénombrer un choix ?",
    format: "qcm",
    choices: [
      "L'ordre des éléments compte-t-il ?",
      "La fonction est-elle dérivable ?",
      "Le nombre est-il pair ?",
      "Y a-t-il une asymptote ?",
    ],
    expected: ["L'ordre des éléments compte-t-il ?"],
    comparator: "mcq_exact",
    hint: "Ordre ↔ arrangement vs combinaison.",
    explanation: exp(
      "La prise en compte de l'ordre oriente toute la méthode de dénombrement.",
      "On se demande si l'ordre des choix change le résultat.",
      "Selon la réponse, on utilisera un arrangement ou une combinaison.",
      "La question clé est : l'ordre compte-t-il ?"
    ),
    tags: ["terminale-spe", "denombrement", "reconnaitre", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_denbr_reco_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Que vaut la factorielle $3! = 3 \\times 2 \\times 1$ ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "On multiplie tous les entiers de $1$ à $3$.",
    explanation: exp(
      "La factorielle $n!$ est le produit des entiers de $1$ à $n$.",
      "On calcule $3 \\times 2 \\times 1$.",
      "$3! = 6$.",
      "$3! = 6$."
    ),
    tags: ["terminale-spe", "denombrement", "factorielle", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_denbr_reco_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Que vaut la factorielle $4!$ ?",
    format: "short",
    expected: ["24"],
    comparator: "number_equal",
    hint: "$4! = 4 \\times 3 \\times 2 \\times 1$.",
    explanation: exp(
      "La factorielle $n!$ est le produit des entiers de $1$ à $n$.",
      "On calcule $4 \\times 3 \\times 2 \\times 1$.",
      "$4! = 24$.",
      "$4! = 24$."
    ),
    tags: ["terminale-spe", "denombrement", "factorielle", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_denbr_reco_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de façons d'ordonner (de ranger) 3 livres distincts sur une étagère ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "C'est $3!$ (toutes les permutations).",
    explanation: exp(
      "Ranger $n$ objets distincts dans l'ordre, c'est compter les permutations.",
      "Le nombre de permutations de $3$ objets est $3!$.",
      "$3! = 6$.",
      "Il y a $6$ rangements possibles."
    ),
    tags: ["terminale-spe", "denombrement", "permutation", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_denbr_reco_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Que vaut $0!$ par convention ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "C'est une convention utile pour les formules.",
    explanation: exp(
      "La factorielle de $0$ est fixée par convention.",
      "Cette convention rend les formules cohérentes (ex. $\\binom{n}{0} = 1$).",
      "$0! = 1$.",
      "$0! = 1$."
    ),
    tags: ["terminale-spe", "denombrement", "factorielle", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_denbr_reco_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_reconnaitre",
    difficulty: 4,
    theme: "neutral",
    text: "Dans « choisir un comité de 3 personnes parmi 10 », l'ordre des personnes choisies :",
    format: "qcm",
    choices: ["ne compte pas", "compte", "dépend des prénoms", "double le résultat"],
    expected: ["ne compte pas"],
    comparator: "mcq_exact",
    hint: "Un comité {A,B,C} est le même que {C,B,A}.",
    explanation: exp(
      "Un comité est un ensemble : l'ordre des membres n'a pas d'importance.",
      "On vérifie si permuter les choix change le résultat.",
      "{A,B,C} et {C,B,A} désignent le même comité.",
      "L'ordre ne compte pas (c'est une combinaison)."
    ),
    tags: ["terminale-spe", "denombrement", "reconnaitre", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_denbr_reco_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_reconnaitre",
    difficulty: 4,
    theme: "neutral",
    text: "Dans « attribuer les médailles or, argent, bronze à 3 athlètes parmi 8 », l'ordre :",
    format: "qcm",
    choices: ["compte (les places sont distinctes)", "ne compte pas", "n'a aucun rôle", "double le total"],
    expected: ["compte (les places sont distinctes)"],
    comparator: "mcq_exact",
    hint: "Or ≠ argent ≠ bronze : les positions sont distinctes.",
    explanation: exp(
      "Quand les positions sont distinctes, l'ordre compte.",
      "On vérifie si échanger deux choix change le résultat.",
      "Être 1er ou 2e n'est pas la même chose : l'ordre compte.",
      "L'ordre compte (c'est un arrangement)."
    ),
    tags: ["terminale-spe", "denombrement", "reconnaitre", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_denbr_reco_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Que vaut $5!$ ?",
    format: "short",
    expected: ["120"],
    comparator: "number_equal",
    hint: "$5! = 5 \\times 4 \\times 3 \\times 2 \\times 1$.",
    explanation: exp(
      "La factorielle $n!$ est le produit des entiers de $1$ à $n$.",
      "On calcule $5 \\times 4 \\times 3 \\times 2 \\times 1$.",
      "$5! = 120$.",
      "$5! = 120$."
    ),
    tags: ["terminale-spe", "denombrement", "factorielle", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_denbr_reco_fixed_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_reconnaitre",
    difficulty: 5,
    theme: "neutral",
    text: "Combien d'anagrammes (ordres des lettres) peut-on former avec les 4 lettres distinctes du mot « JEUX » ?",
    format: "short",
    expected: ["24"],
    comparator: "number_equal",
    hint: "4 lettres distinctes à ordonner : $4!$.",
    explanation: exp(
      "Ordonner $n$ lettres distinctes, c'est compter les permutations.",
      "Le nombre de permutations de $4$ lettres est $4!$.",
      "$4! = 24$.",
      "Il y a $24$ anagrammes."
    ),
    tags: ["terminale-spe", "denombrement", "permutation", "short"],
  },

  /* =========================================================
     DENOMBREMENT_PRODUIT_SOMME
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_denbr_ps_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_produit_somme",
    difficulty: 2,
    theme: "neutral",
    text: "Pour des choix successifs (étape 1 PUIS étape 2), on utilise le principe :",
    format: "qcm",
    choices: ["multiplicatif (on multiplie)", "additif (on additionne)", "soustractif", "de Pascal"],
    expected: ["multiplicatif (on multiplie)"],
    comparator: "mcq_exact",
    hint: "« Puis » → on multiplie les nombres de choix.",
    explanation: exp(
      "Des choix successifs se combinent par multiplication.",
      "À chaque étape, on multiplie par le nombre de possibilités.",
      "Étape 1 « puis » étape 2 : on multiplie.",
      "On utilise le principe multiplicatif."
    ),
    tags: ["terminale-spe", "denombrement", "produit", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_denbr_ps_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_produit_somme",
    difficulty: 2,
    theme: "neutral",
    text: "Pour des cas disjoints (cas A OU cas B, sans recouvrement), on utilise le principe :",
    format: "qcm",
    choices: ["additif (on additionne)", "multiplicatif (on multiplie)", "de Pascal", "des dérivées"],
    expected: ["additif (on additionne)"],
    comparator: "mcq_exact",
    hint: "« Ou » exclusif → on additionne.",
    explanation: exp(
      "Des cas disjoints se combinent par addition.",
      "On additionne les nombres de possibilités de chaque cas.",
      "Cas A « ou » cas B (disjoints) : on additionne.",
      "On utilise le principe additif."
    ),
    tags: ["terminale-spe", "denombrement", "somme", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_denbr_ps_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_produit_somme",
    difficulty: 3,
    theme: "neutral",
    text: "Un menu propose 3 entrées puis 4 plats. Combien de menus (entrée + plat) différents ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Principe multiplicatif : $3 \\times 4$.",
    explanation: exp(
      "Choisir une entrée puis un plat sont des choix successifs.",
      "On applique le principe multiplicatif.",
      "$3 \\times 4 = 12$.",
      "Il y a $12$ menus possibles."
    ),
    tags: ["terminale-spe", "denombrement", "produit", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_denbr_ps_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_produit_somme",
    difficulty: 3,
    theme: "neutral",
    text: "Un code est formé de 2 lettres (parmi 26) suivies de 1 chiffre (parmi 10). Combien de codes possibles ?",
    format: "short",
    expected: ["6760"],
    comparator: "number_equal",
    hint: "$26 \\times 26 \\times 10$.",
    explanation: exp(
      "Chaque position est un choix successif indépendant.",
      "On applique le principe multiplicatif.",
      "$26 \\times 26 \\times 10 = 6760$.",
      "Il y a $6760$ codes possibles."
    ),
    tags: ["terminale-spe", "denombrement", "produit", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_denbr_ps_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_produit_somme",
    difficulty: 3,
    theme: "neutral",
    text: "Dans un menu, on peut choisir 1 dessert parmi 3 OU 1 fruit parmi 5 (un seul des deux). Combien de choix ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Cas disjoints : principe additif, $3 + 5$.",
    explanation: exp(
      "Les deux possibilités sont disjointes (dessert OU fruit).",
      "On applique le principe additif.",
      "$3 + 5 = 8$.",
      "Il y a $8$ choix possibles."
    ),
    tags: ["terminale-spe", "denombrement", "somme", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_denbr_ps_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_produit_somme",
    difficulty: 4,
    theme: "neutral",
    text: "Combien de mots de 3 lettres (lettres parmi 26, répétitions autorisées) peut-on former ?",
    format: "short",
    expected: ["17576"],
    comparator: "number_equal",
    hint: "$26 \\times 26 \\times 26 = 26^3$.",
    explanation: exp(
      "Chaque lettre est un choix successif parmi 26 (avec répétition).",
      "On applique le principe multiplicatif.",
      "$26^3 = 26 \\times 26 \\times 26 = 17576$.",
      "Il y a $17576$ mots possibles."
    ),
    tags: ["terminale-spe", "denombrement", "produit", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_denbr_ps_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_produit_somme",
    difficulty: 4,
    theme: "neutral",
    text: "On tire à pile ou face 4 fois de suite. Combien de résultats (suites de P/F) possibles ?",
    format: "short",
    expected: ["16"],
    comparator: "number_equal",
    hint: "$2 \\times 2 \\times 2 \\times 2 = 2^4$.",
    explanation: exp(
      "Chaque lancer a 2 issues, et les lancers sont successifs.",
      "On applique le principe multiplicatif.",
      "$2^4 = 16$.",
      "Il y a $16$ résultats possibles."
    ),
    tags: ["terminale-spe", "denombrement", "produit", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_denbr_ps_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_produit_somme",
    difficulty: 5,
    theme: "neutral",
    text: "Combien de façons de choisir, dans l'ordre, un président puis un trésorier parmi 5 personnes (deux personnes différentes) ?",
    format: "short",
    expected: ["20"],
    comparator: "number_equal",
    hint: "$5$ choix pour le président, puis $4$ pour le trésorier.",
    explanation: exp(
      "Les choix sont successifs et l'ordre des rôles compte.",
      "On applique le principe multiplicatif en retirant la personne déjà choisie.",
      "$5 \\times 4 = 20$.",
      "Il y a $20$ façons."
    ),
    tags: ["terminale-spe", "denombrement", "produit", "arrangement", "short"],
  },

  {
    kind: "template",
    id: "terminale_spe_denbr_ps_tpl_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_produit_somme",
    difficulty: 3,
    theme: "neutral",
    hint: "Principe multiplicatif : on multiplie les nombres de choix.",
    tags: ["terminale-spe", "denombrement", "produit", "template"],
    generate: () => {
      const a = randomInt(2, 6);
      const b = randomInt(2, 6);
      return {
        text: `Un repas comporte une entrée (parmi ${a}) puis un plat (parmi ${b}). Combien de repas (entrée + plat) différents ?`,
        format: "short",
        expected: [String(a * b)],
        comparator: "number_equal",
        explanation: exp(
          "Choisir une entrée puis un plat sont des choix successifs.",
          "On applique le principe multiplicatif.",
          `$${a} \\times ${b} = ${a * b}$.`,
          `Il y a $${a * b}$ repas possibles.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "terminale_spe_denbr_ps_tpl_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_produit_somme",
    difficulty: 3,
    theme: "neutral",
    hint: "Cas disjoints : principe additif.",
    tags: ["terminale-spe", "denombrement", "somme", "template"],
    generate: () => {
      const a = randomInt(2, 7);
      const b = randomInt(2, 7);
      return {
        text: `On choisit soit un dessert (parmi ${a}), soit une boisson (parmi ${b}), mais pas les deux. Combien de choix possibles ?`,
        format: "short",
        expected: [String(a + b)],
        comparator: "number_equal",
        explanation: exp(
          "Les deux possibilités sont disjointes (l'une OU l'autre).",
          "On applique le principe additif.",
          `$${a} + ${b} = ${a + b}$.`,
          `Il y a $${a + b}$ choix possibles.`
        ),
      };
    },
  },

  /* =========================================================
     DENOMBREMENT_ARRANGEMENT_COMBINAISON
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_denbr_ac_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_arrangement_combinaison",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la différence entre un arrangement et une combinaison ?",
    format: "qcm",
    choices: [
      "dans un arrangement l'ordre compte, dans une combinaison non",
      "dans une combinaison l'ordre compte, dans un arrangement non",
      "il n'y a aucune différence",
      "l'arrangement concerne les probabilités",
    ],
    expected: ["dans un arrangement l'ordre compte, dans une combinaison non"],
    comparator: "mcq_exact",
    hint: "Arrangement ↔ ordre ; combinaison ↔ sans ordre.",
    explanation: exp(
      "La distinction repose sur la prise en compte de l'ordre.",
      "On compare les deux notions.",
      "Arrangement : l'ordre compte ; combinaison : l'ordre ne compte pas.",
      "Dans un arrangement l'ordre compte, dans une combinaison non."
    ),
    tags: ["terminale-spe", "denombrement", "arrangement_combinaison", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_denbr_ac_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_arrangement_combinaison",
    difficulty: 3,
    theme: "neutral",
    text: "« Choisir 2 délégués parmi 5 élèves » correspond à :",
    format: "qcm",
    choices: ["une combinaison", "un arrangement", "une permutation", "un produit"],
    expected: ["une combinaison"],
    comparator: "mcq_exact",
    hint: "Deux délégués : l'ordre entre eux n'a pas d'importance.",
    explanation: exp(
      "On regarde si l'ordre des choix compte.",
      "Les deux délégués jouent le même rôle : l'ordre ne compte pas.",
      "C'est donc une combinaison de 2 parmi 5.",
      "C'est une combinaison."
    ),
    tags: ["terminale-spe", "denombrement", "arrangement_combinaison", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_denbr_ac_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_arrangement_combinaison",
    difficulty: 3,
    theme: "neutral",
    text: "« Déterminer le podium (1er, 2e, 3e) d'une course de 8 coureurs » correspond à :",
    format: "qcm",
    choices: ["un arrangement", "une combinaison", "une somme", "une factorielle de 8"],
    expected: ["un arrangement"],
    comparator: "mcq_exact",
    hint: "Les places sont distinctes : l'ordre compte.",
    explanation: exp(
      "On regarde si l'ordre des positions compte.",
      "1er, 2e, 3e sont des places distinctes : l'ordre compte.",
      "C'est donc un arrangement de 3 parmi 8.",
      "C'est un arrangement."
    ),
    tags: ["terminale-spe", "denombrement", "arrangement_combinaison", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_denbr_ac_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_arrangement_combinaison",
    difficulty: 4,
    theme: "neutral",
    text: "Pour compter des choix SANS tenir compte de l'ordre, on utilise :",
    format: "qcm",
    choices: [
      "les coefficients binomiaux $\\binom{n}{k}$",
      "les factorielles seules",
      "les dérivées",
      "le principe additif uniquement",
    ],
    expected: ["les coefficients binomiaux $\\binom{n}{k}$"],
    comparator: "mcq_exact",
    hint: "Combinaison ↔ coefficient binomial.",
    explanation: exp(
      "Le nombre de combinaisons est donné par un coefficient binomial.",
      "$\\binom{n}{k}$ compte les choix de $k$ éléments parmi $n$ sans ordre.",
      "On utilise donc $\\binom{n}{k}$.",
      "On utilise les coefficients binomiaux $\\binom{n}{k}$."
    ),
    tags: ["terminale-spe", "denombrement", "arrangement_combinaison", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_denbr_ac_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_arrangement_combinaison",
    difficulty: 4,
    theme: "neutral",
    text: "« Une main de 5 cartes dans un jeu de 32 » correspond à :",
    format: "qcm",
    choices: ["une combinaison", "un arrangement", "une permutation", "un produit de 32"],
    expected: ["une combinaison"],
    comparator: "mcq_exact",
    hint: "Une main est un ensemble : l'ordre des cartes n'importe pas.",
    explanation: exp(
      "On regarde si l'ordre des cartes compte.",
      "Une main est un ensemble de cartes, l'ordre n'a pas d'importance.",
      "C'est une combinaison de 5 parmi 32.",
      "C'est une combinaison."
    ),
    tags: ["terminale-spe", "denombrement", "arrangement_combinaison", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_denbr_ac_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_arrangement_combinaison",
    difficulty: 3,
    theme: "neutral",
    text: "Le nombre de combinaisons de $2$ éléments parmi $5$ se note :",
    format: "qcm",
    choices: ["$\\binom{5}{2}$", "$\\binom{2}{5}$", "$5 \\times 2$", "$5!$"],
    expected: ["$\\binom{5}{2}$"],
    comparator: "mcq_exact",
    hint: "On note $\\binom{n}{k}$ avec $n$ en haut, $k$ en bas.",
    explanation: exp(
      "La notation du coefficient binomial place $n$ au-dessus de $k$.",
      "Ici $n = 5$ (total) et $k = 2$ (choisis).",
      "On note $\\binom{5}{2}$.",
      "Le nombre de combinaisons est $\\binom{5}{2}$."
    ),
    tags: ["terminale-spe", "denombrement", "arrangement_combinaison", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_denbr_ac_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_arrangement_combinaison",
    difficulty: 5,
    theme: "neutral",
    text: "Pourquoi y a-t-il moins de combinaisons que d'arrangements (pour les mêmes $n$ et $k$) ?",
    format: "qcm",
    choices: [
      "Car on ne distingue pas les différents ordres d'un même choix",
      "Car on ajoute des cas",
      "Car les combinaisons utilisent des dérivées",
      "C'est faux, il y en a plus",
    ],
    expected: ["Car on ne distingue pas les différents ordres d'un même choix"],
    comparator: "mcq_exact",
    hint: "Plusieurs arrangements correspondent à une même combinaison.",
    explanation: exp(
      "Une combinaison regroupe tous les arrangements ayant les mêmes éléments.",
      "Pour $k$ éléments, il y a $k!$ ordres possibles regroupés en une seule combinaison.",
      "On divise donc le nombre d'arrangements par $k!$.",
      "Il y a moins de combinaisons car on ne distingue pas les ordres."
    ),
    tags: ["terminale-spe", "denombrement", "arrangement_combinaison", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_denbr_ac_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_arrangement_combinaison",
    difficulty: 4,
    theme: "neutral",
    text: "« Un mot de passe de 4 chiffres distincts parmi 10 » correspond à :",
    format: "qcm",
    choices: ["un arrangement", "une combinaison", "une simple addition", "une factorielle de 4"],
    expected: ["un arrangement"],
    comparator: "mcq_exact",
    hint: "L'ordre des chiffres d'un mot de passe compte.",
    explanation: exp(
      "On regarde si l'ordre compte.",
      "Dans un mot de passe, l'ordre des chiffres est important.",
      "Avec des chiffres distincts, c'est un arrangement de 4 parmi 10.",
      "C'est un arrangement."
    ),
    tags: ["terminale-spe", "denombrement", "arrangement_combinaison", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_denbr_ac_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_arrangement_combinaison",
    difficulty: 3,
    theme: "neutral",
    text: "« Choisir 3 fruits différents parmi 6 pour une salade de fruits » correspond à :",
    format: "qcm",
    choices: ["une combinaison", "un arrangement", "une permutation", "un produit"],
    expected: ["une combinaison"],
    comparator: "mcq_exact",
    hint: "Dans la salade, l'ordre d'ajout des fruits n'importe pas.",
    explanation: exp(
      "On regarde si l'ordre compte.",
      "Pour une salade, seul l'ensemble des fruits compte, pas leur ordre.",
      "C'est une combinaison de 3 parmi 6.",
      "C'est une combinaison."
    ),
    tags: ["terminale-spe", "denombrement", "arrangement_combinaison", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_denbr_ac_fixed_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_arrangement_combinaison",
    difficulty: 5,
    theme: "neutral",
    text: "Dans un schéma de Bernoulli, pour compter les chemins menant à $k$ succès parmi $n$ épreuves, on utilise :",
    format: "qcm",
    choices: [
      "une combinaison $\\binom{n}{k}$ (l'ordre des succès n'importe pas)",
      "un arrangement (l'ordre compte)",
      "une factorielle $n!$",
      "le principe additif",
    ],
    expected: ["une combinaison $\\binom{n}{k}$ (l'ordre des succès n'importe pas)"],
    comparator: "mcq_exact",
    hint: "On choisit quelles épreuves sont des succès, sans ordre.",
    explanation: exp(
      "Compter les chemins à $k$ succès revient à choisir les positions des succès.",
      "On choisit $k$ positions parmi $n$, sans ordre : c'est une combinaison.",
      "C'est $\\binom{n}{k}$ (lien direct avec la loi binomiale).",
      "On utilise la combinaison $\\binom{n}{k}$."
    ),
    tags: ["terminale-spe", "denombrement", "arrangement_combinaison", "binomiale", "qcm"],
  },

  /* =========================================================
     DENOMBREMENT_COEFFICIENT_BINOMIAL
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_denbr_coef_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_coefficient_binomial",
    difficulty: 2,
    theme: "neutral",
    text: "Que compte le coefficient binomial $\\binom{n}{k}$ ?",
    format: "qcm",
    choices: [
      "le nombre de combinaisons de $k$ éléments parmi $n$",
      "le nombre d'arrangements",
      "la factorielle de $n$",
      "une probabilité",
    ],
    expected: ["le nombre de combinaisons de $k$ éléments parmi $n$"],
    comparator: "mcq_exact",
    hint: "« k parmi n », sans ordre.",
    explanation: exp(
      "Le coefficient binomial compte des choix sans ordre.",
      "$\\binom{n}{k}$ se lit « $k$ parmi $n$ ».",
      "C'est le nombre de combinaisons de $k$ éléments parmi $n$.",
      "$\\binom{n}{k}$ compte les combinaisons de $k$ parmi $n$."
    ),
    tags: ["terminale-spe", "denombrement", "coefficient_binomial", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_denbr_coef_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_coefficient_binomial",
    difficulty: 2,
    theme: "neutral",
    text: "Que vaut $\\binom{n}{0}$ (pour tout entier $n \\ge 0$) ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Il n'y a qu'une façon de ne rien choisir.",
    explanation: exp(
      "Choisir $0$ élément ne laisse qu'une possibilité : l'ensemble vide.",
      "On utilise la propriété du cours.",
      "$\\binom{n}{0} = 1$.",
      "$\\binom{n}{0} = 1$."
    ),
    tags: ["terminale-spe", "denombrement", "coefficient_binomial", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_denbr_coef_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_coefficient_binomial",
    difficulty: 2,
    theme: "neutral",
    text: "Que vaut $\\binom{7}{1}$ ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "$\\binom{n}{1} = n$.",
    explanation: exp(
      "Choisir $1$ élément parmi $n$ donne $n$ possibilités.",
      "On utilise $\\binom{n}{1} = n$.",
      "$\\binom{7}{1} = 7$.",
      "$\\binom{7}{1} = 7$."
    ),
    tags: ["terminale-spe", "denombrement", "coefficient_binomial", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_denbr_coef_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_coefficient_binomial",
    difficulty: 3,
    theme: "neutral",
    text: "Que vaut $\\binom{5}{2}$ ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "$\\binom{5}{2} = \\dfrac{5 \\times 4}{2}$.",
    explanation: exp(
      "On calcule le coefficient binomial $\\binom{5}{2} = \\dfrac{5!}{2!\\,3!}$.",
      "On simplifie : $\\dfrac{5 \\times 4}{2 \\times 1}$.",
      "$\\dfrac{20}{2} = 10$.",
      "$\\binom{5}{2} = 10$."
    ),
    tags: ["terminale-spe", "denombrement", "coefficient_binomial", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_denbr_coef_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_coefficient_binomial",
    difficulty: 3,
    theme: "neutral",
    text: "Que vaut $\\binom{4}{2}$ ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "$\\binom{4}{2} = \\dfrac{4 \\times 3}{2}$.",
    explanation: exp(
      "On calcule $\\binom{4}{2} = \\dfrac{4!}{2!\\,2!}$.",
      "On simplifie : $\\dfrac{4 \\times 3}{2 \\times 1}$.",
      "$\\dfrac{12}{2} = 6$.",
      "$\\binom{4}{2} = 6$."
    ),
    tags: ["terminale-spe", "denombrement", "coefficient_binomial", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_denbr_coef_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_coefficient_binomial",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle propriété de symétrie vérifie le coefficient binomial ?",
    format: "qcm",
    choices: [
      "$\\binom{n}{k} = \\binom{n}{n-k}$",
      "$\\binom{n}{k} = \\binom{k}{n}$",
      "$\\binom{n}{k} = \\binom{n}{k+1}$",
      "$\\binom{n}{k} = n - k$",
    ],
    expected: ["$\\binom{n}{k} = \\binom{n}{n-k}$"],
    comparator: "mcq_exact",
    hint: "Choisir $k$ éléments = en écarter $n-k$.",
    explanation: exp(
      "Choisir les $k$ éléments retenus revient à choisir les $n-k$ écartés.",
      "On en déduit la symétrie du coefficient binomial.",
      "$\\binom{n}{k} = \\binom{n}{n-k}$.",
      "La symétrie est $\\binom{n}{k} = \\binom{n}{n-k}$."
    ),
    tags: ["terminale-spe", "denombrement", "coefficient_binomial", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_denbr_coef_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_coefficient_binomial",
    difficulty: 4,
    theme: "neutral",
    text: "En utilisant la symétrie, que vaut $\\binom{5}{3}$ ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "$\\binom{5}{3} = \\binom{5}{2}$.",
    explanation: exp(
      "On utilise $\\binom{n}{k} = \\binom{n}{n-k}$.",
      "$\\binom{5}{3} = \\binom{5}{2}$.",
      "$\\binom{5}{2} = 10$.",
      "$\\binom{5}{3} = 10$."
    ),
    tags: ["terminale-spe", "denombrement", "coefficient_binomial", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_denbr_coef_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_coefficient_binomial",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la formule générale de $\\binom{n}{k}$ avec des factorielles ?",
    format: "qcm",
    choices: [
      "$\\dfrac{n!}{k!\\,(n-k)!}$",
      "$\\dfrac{n!}{k!}$",
      "$\\dfrac{k!}{n!}$",
      "$n! \\times k!$",
    ],
    expected: ["$\\dfrac{n!}{k!\\,(n-k)!}$"],
    comparator: "mcq_exact",
    hint: "Numérateur $n!$, dénominateur $k!(n-k)!$.",
    explanation: exp(
      "Le coefficient binomial possède une formule factorielle.",
      "On retient $\\binom{n}{k} = \\dfrac{n!}{k!\\,(n-k)!}$.",
      "C'est la formule du cours.",
      "$\\binom{n}{k} = \\dfrac{n!}{k!\\,(n-k)!}$."
    ),
    tags: ["terminale-spe", "denombrement", "coefficient_binomial", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_denbr_coef_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_coefficient_binomial",
    difficulty: 5,
    theme: "neutral",
    text: "Que vaut $\\binom{6}{2}$ ?",
    format: "short",
    expected: ["15"],
    comparator: "number_equal",
    hint: "$\\binom{6}{2} = \\dfrac{6 \\times 5}{2}$.",
    explanation: exp(
      "On calcule $\\binom{6}{2} = \\dfrac{6!}{2!\\,4!}$.",
      "On simplifie : $\\dfrac{6 \\times 5}{2 \\times 1}$.",
      "$\\dfrac{30}{2} = 15$.",
      "$\\binom{6}{2} = 15$."
    ),
    tags: ["terminale-spe", "denombrement", "coefficient_binomial", "short"],
  },

  {
    kind: "template",
    id: "terminale_spe_denbr_coef_tpl_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_coefficient_binomial",
    difficulty: 2,
    theme: "neutral",
    hint: "$\\binom{n}{1} = n$.",
    tags: ["terminale-spe", "denombrement", "coefficient_binomial", "template"],
    generate: () => {
      const n = randomInt(3, 12);
      return {
        text: `Que vaut $\\binom{${n}}{1}$ ?`,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation: exp(
          "Choisir $1$ élément parmi $n$ donne $n$ possibilités.",
          "On utilise $\\binom{n}{1} = n$.",
          `$\\binom{${n}}{1} = ${n}$.`,
          `$\\binom{${n}}{1} = ${n}$.`
        ),
      };
    },
  },

  /* =========================================================
     DENOMBREMENT_PASCAL
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_denbr_pascal_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_pascal",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la relation de Pascal ?",
    format: "qcm",
    choices: [
      "$\\binom{n}{k} = \\binom{n-1}{k-1} + \\binom{n-1}{k}$",
      "$\\binom{n}{k} = \\binom{n-1}{k-1} \\times \\binom{n-1}{k}$",
      "$\\binom{n}{k} = \\binom{n+1}{k+1}$",
      "$\\binom{n}{k} = \\binom{n}{k-1} + 1$",
    ],
    expected: ["$\\binom{n}{k} = \\binom{n-1}{k-1} + \\binom{n-1}{k}$"],
    comparator: "mcq_exact",
    hint: "Chaque case du triangle est la somme des deux au-dessus.",
    explanation: exp(
      "La relation de Pascal relie un coefficient à ceux de la ligne précédente.",
      "Chaque terme est la somme des deux termes au-dessus de lui.",
      "$\\binom{n}{k} = \\binom{n-1}{k-1} + \\binom{n-1}{k}$.",
      "C'est la relation de Pascal."
    ),
    tags: ["terminale-spe", "denombrement", "pascal", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_denbr_pascal_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_pascal",
    difficulty: 2,
    theme: "neutral",
    text: "D'après le triangle de Pascal ci-dessous, que vaut $\\binom{4}{2}$ (case surlignée) ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    canvas: pascalC42Canvas,
    hint: "On lit la ligne $n = 4$, colonne $k = 2$.",
    explanation: exp(
      "Le triangle de Pascal donne directement les coefficients binomiaux.",
      "On lit l'intersection de la ligne $n = 4$ et de la colonne $k = 2$.",
      "La case surlignée contient $6$.",
      "$\\binom{4}{2} = 6$."
    ),
    tags: ["terminale-spe", "denombrement", "pascal", "tableau", "canvas", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_denbr_pascal_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_pascal",
    difficulty: 3,
    theme: "neutral",
    text: "D'après le triangle de Pascal ci-dessous, que vaut $\\binom{5}{2}$ ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    canvas: pascalCanvas,
    hint: "Ligne $n = 5$, colonne $k = 2$.",
    explanation: exp(
      "On lit le coefficient dans le triangle.",
      "On repère la ligne $n = 5$ et la colonne $k = 2$.",
      "La case correspondante contient $10$.",
      "$\\binom{5}{2} = 10$."
    ),
    tags: ["terminale-spe", "denombrement", "pascal", "tableau", "canvas", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_denbr_pascal_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_pascal",
    difficulty: 4,
    theme: "neutral",
    text: "Avec la relation de Pascal, $\\binom{4}{2} = \\binom{3}{1} + \\binom{3}{2}$. Que vaut cette somme ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "$\\binom{3}{1} = 3$ et $\\binom{3}{2} = 3$.",
    explanation: exp(
      "On applique la relation de Pascal.",
      "$\\binom{3}{1} = 3$ et $\\binom{3}{2} = 3$.",
      "$3 + 3 = 6$.",
      "$\\binom{4}{2} = 6$."
    ),
    tags: ["terminale-spe", "denombrement", "pascal", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_denbr_pascal_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_pascal",
    difficulty: 3,
    theme: "neutral",
    text: "Dans le triangle de Pascal, par quoi commence et finit chaque ligne ?",
    format: "qcm",
    choices: ["par $1$", "par $0$", "par $n$", "par $k$"],
    expected: ["par $1$"],
    comparator: "mcq_exact",
    hint: "$\\binom{n}{0} = \\binom{n}{n} = 1$.",
    explanation: exp(
      "Les extrémités de chaque ligne correspondent à $k = 0$ et $k = n$.",
      "Or $\\binom{n}{0} = 1$ et $\\binom{n}{n} = 1$.",
      "Chaque ligne commence et finit donc par $1$.",
      "Chaque ligne commence et finit par $1$."
    ),
    tags: ["terminale-spe", "denombrement", "pascal", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_denbr_pascal_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_pascal",
    difficulty: 4,
    theme: "neutral",
    text: "D'après le triangle de Pascal ci-dessous, que vaut $\\binom{5}{3}$ ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    canvas: pascalCanvas,
    hint: "Ligne $n = 5$, colonne $k = 3$.",
    explanation: exp(
      "On lit le coefficient dans le triangle.",
      "On repère la ligne $n = 5$ et la colonne $k = 3$.",
      "La case correspondante contient $10$.",
      "$\\binom{5}{3} = 10$."
    ),
    tags: ["terminale-spe", "denombrement", "pascal", "tableau", "canvas", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_denbr_pascal_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_pascal",
    difficulty: 5,
    theme: "neutral",
    text: "Avec Pascal, $\\binom{5}{2} = \\binom{4}{1} + \\binom{4}{2}$. Que vaut cette somme ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "$\\binom{4}{1} = 4$ et $\\binom{4}{2} = 6$.",
    explanation: exp(
      "On applique la relation de Pascal.",
      "$\\binom{4}{1} = 4$ et $\\binom{4}{2} = 6$.",
      "$4 + 6 = 10$.",
      "$\\binom{5}{2} = 10$."
    ),
    tags: ["terminale-spe", "denombrement", "pascal", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_denbr_pascal_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_pascal",
    difficulty: 4,
    theme: "neutral",
    text: "La ligne $n = 4$ du triangle de Pascal est :",
    format: "qcm",
    choices: [
      "$1\\ 4\\ 6\\ 4\\ 1$",
      "$1\\ 3\\ 3\\ 1$",
      "$1\\ 5\\ 10\\ 10\\ 5\\ 1$",
      "$1\\ 4\\ 4\\ 1$",
    ],
    expected: ["$1\\ 4\\ 6\\ 4\\ 1$"],
    comparator: "mcq_exact",
    canvas: pascalCanvas,
    hint: "Lis la ligne $n = 4$ du tableau.",
    explanation: exp(
      "On lit la ligne $n = 4$ dans le triangle.",
      "Elle donne les coefficients $\\binom{4}{0}$ à $\\binom{4}{4}$.",
      "Ce sont $1, 4, 6, 4, 1$.",
      "La ligne $n = 4$ est $1\\ 4\\ 6\\ 4\\ 1$."
    ),
    tags: ["terminale-spe", "denombrement", "pascal", "tableau", "canvas", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_denbr_pascal_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_pascal",
    difficulty: 3,
    theme: "neutral",
    text: "À quoi sert principalement le triangle de Pascal ?",
    format: "qcm",
    choices: [
      "à calculer rapidement les coefficients binomiaux",
      "à dériver des fonctions",
      "à résoudre des équations du second degré",
      "à calculer des limites",
    ],
    expected: ["à calculer rapidement les coefficients binomiaux"],
    comparator: "mcq_exact",
    hint: "Chaque case du triangle est un $\\binom{n}{k}$.",
    explanation: exp(
      "Le triangle de Pascal organise les coefficients binomiaux.",
      "On l'utilise pour les obtenir sans calcul de factorielles.",
      "Chaque case vaut $\\binom{n}{k}$, construite par additions.",
      "Il sert à calculer rapidement les coefficients binomiaux."
    ),
    tags: ["terminale-spe", "denombrement", "pascal", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_denbr_pascal_fixed_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_pascal",
    difficulty: 5,
    theme: "neutral",
    text: "Quelle est la ligne $n = 5$ du triangle de Pascal ?",
    format: "qcm",
    choices: [
      "$1\\ 5\\ 10\\ 10\\ 5\\ 1$",
      "$1\\ 4\\ 6\\ 4\\ 1$",
      "$1\\ 5\\ 5\\ 1$",
      "$1\\ 6\\ 15\\ 20\\ 15\\ 6\\ 1$",
    ],
    expected: ["$1\\ 5\\ 10\\ 10\\ 5\\ 1$"],
    comparator: "mcq_exact",
    canvas: pascalCanvas,
    hint: "Lis la dernière ligne du tableau.",
    explanation: exp(
      "On lit la ligne $n = 5$ dans le triangle.",
      "Elle donne $\\binom{5}{0}$ à $\\binom{5}{5}$.",
      "Ce sont $1, 5, 10, 10, 5, 1$.",
      "La ligne $n = 5$ est $1\\ 5\\ 10\\ 10\\ 5\\ 1$."
    ),
    tags: ["terminale-spe", "denombrement", "pascal", "tableau", "canvas", "qcm"],
  },

  /* =========================================================
     DENOMBREMENT_DEFI — Type bac
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_denbr_defi_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Combien de comités de 2 personnes peut-on former parmi 5 personnes ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "Combinaison : $\\binom{5}{2}$.",
    explanation: exp(
      "Un comité est un ensemble : l'ordre ne compte pas.",
      "On calcule $\\binom{5}{2} = \\dfrac{5 \\times 4}{2}$.",
      "$\\binom{5}{2} = 10$.",
      "Il y a $10$ comités possibles."
    ),
    tags: ["terminale-spe", "denombrement", "type_bac", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_denbr_defi_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Combien de façons de choisir 3 personnes parmi 6 pour former une délégation (sans ordre) ?",
    format: "short",
    expected: ["20"],
    comparator: "number_equal",
    hint: "$\\binom{6}{3} = \\dfrac{6 \\times 5 \\times 4}{3 \\times 2 \\times 1}$.",
    explanation: exp(
      "Une délégation est un ensemble : c'est une combinaison.",
      "On calcule $\\binom{6}{3} = \\dfrac{6 \\times 5 \\times 4}{3!}$.",
      "$\\dfrac{120}{6} = 20$.",
      "Il y a $20$ délégations possibles."
    ),
    tags: ["terminale-spe", "denombrement", "type_bac", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_denbr_defi_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Dans une classe de 6 élèves, on choisit 2 délégués. Quel calcul donne le résultat, et combien vaut-il ?",
    format: "qcm",
    choices: [
      "$\\binom{6}{2} = 15$",
      "$6 \\times 2 = 12$",
      "$\\binom{6}{2} = 30$",
      "$6! = 720$",
    ],
    expected: ["$\\binom{6}{2} = 15$"],
    comparator: "mcq_exact",
    hint: "Sans ordre : $\\binom{6}{2} = \\dfrac{6 \\times 5}{2}$.",
    explanation: exp(
      "Choisir 2 délégués sans ordre est une combinaison.",
      "On calcule $\\binom{6}{2} = \\dfrac{6 \\times 5}{2}$.",
      "$\\dfrac{30}{2} = 15$.",
      "Il y a $\\binom{6}{2} = 15$ choix."
    ),
    tags: ["terminale-spe", "denombrement", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_denbr_defi_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Combien de podiums (1er, 2e, 3e, tous distincts) peut-on former avec 5 coureurs ?",
    format: "short",
    expected: ["60"],
    comparator: "number_equal",
    hint: "Ordre compte : $5 \\times 4 \\times 3$.",
    explanation: exp(
      "Les places sont distinctes : l'ordre compte (arrangement).",
      "On applique le principe multiplicatif : $5 \\times 4 \\times 3$.",
      "$5 \\times 4 \\times 3 = 60$.",
      "Il y a $60$ podiums possibles."
    ),
    tags: ["terminale-spe", "denombrement", "type_bac", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_denbr_defi_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_defi",
    difficulty: 5,
    theme: "neutral",
    text: "On tire 2 cartes simultanément dans un jeu de 5 cartes. Combien de mains possibles ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "Simultanément = sans ordre : $\\binom{5}{2}$.",
    explanation: exp(
      "Un tirage simultané ne tient pas compte de l'ordre.",
      "On calcule $\\binom{5}{2} = \\dfrac{5 \\times 4}{2}$.",
      "$\\binom{5}{2} = 10$.",
      "Il y a $10$ mains possibles."
    ),
    tags: ["terminale-spe", "denombrement", "type_bac", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_denbr_defi_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Dans un schéma de Bernoulli à 4 épreuves, combien de chemins donnent exactement 2 succès ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "On choisit les 2 positions des succès : $\\binom{4}{2}$.",
    explanation: exp(
      "Le nombre de chemins à $k$ succès est $\\binom{n}{k}$.",
      "On calcule $\\binom{4}{2}$.",
      "$\\binom{4}{2} = 6$.",
      "Il y a $6$ chemins (lien direct avec la loi binomiale)."
    ),
    tags: ["terminale-spe", "denombrement", "type_bac", "binomiale", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_denbr_defi_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Combien de codes PIN à 4 chiffres (de 0 à 9, répétitions autorisées) existe-t-il ?",
    format: "short",
    expected: ["10000"],
    comparator: "number_equal",
    hint: "$10 \\times 10 \\times 10 \\times 10 = 10^4$.",
    explanation: exp(
      "Chaque chiffre est un choix successif parmi 10 (avec répétition).",
      "On applique le principe multiplicatif.",
      "$10^4 = 10000$.",
      "Il y a $10000$ codes possibles."
    ),
    tags: ["terminale-spe", "denombrement", "type_bac", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_denbr_defi_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un sac contient 4 jetons numérotés. Combien de façons de tirer 2 jetons à la fois (sans ordre) ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "$\\binom{4}{2}$.",
    explanation: exp(
      "Tirer 2 jetons à la fois ne tient pas compte de l'ordre.",
      "On calcule $\\binom{4}{2} = \\dfrac{4 \\times 3}{2}$.",
      "$\\binom{4}{2} = 6$.",
      "Il y a $6$ tirages possibles."
    ),
    tags: ["terminale-spe", "denombrement", "type_bac", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_denbr_defi_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Pourquoi le nombre de podiums (ordre) est-il plus grand que le nombre de trios (sans ordre) pour les mêmes coureurs ?",
    format: "qcm",
    choices: [
      "Car chaque trio donne plusieurs podiums (les ordres)",
      "Car on additionne au lieu de multiplier",
      "Car les podiums utilisent des dérivées",
      "C'est faux, c'est le contraire",
    ],
    expected: ["Car chaque trio donne plusieurs podiums (les ordres)"],
    comparator: "mcq_exact",
    hint: "Un même groupe de 3 peut être ordonné de $3! = 6$ façons.",
    explanation: exp(
      "L'arrangement distingue les ordres, pas la combinaison.",
      "Un trio de 3 coureurs peut être ordonné de $3! = 6$ manières.",
      "Il y a donc plus de podiums que de trios.",
      "Chaque trio (combinaison) donne plusieurs podiums (arrangements)."
    ),
    tags: ["terminale-spe", "denombrement", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_denbr_defi_fixed_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "denombrement_combinatoire",
    microId: "denombrement_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Combien de combinaisons de 2 éléments parmi 7 (par exemple choisir 2 saveurs parmi 7) ?",
    format: "short",
    expected: ["21"],
    comparator: "number_equal",
    hint: "$\\binom{7}{2} = \\dfrac{7 \\times 6}{2}$.",
    explanation: exp(
      "Choisir 2 saveurs sans ordre est une combinaison.",
      "On calcule $\\binom{7}{2} = \\dfrac{7 \\times 6}{2}$.",
      "$\\dfrac{42}{2} = 21$.",
      "Il y a $21$ combinaisons possibles."
    ),
    tags: ["terminale-spe", "denombrement", "type_bac", "short"],
  },
];
