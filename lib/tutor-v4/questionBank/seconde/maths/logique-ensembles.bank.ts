// lib/tutor-v4/questionBank/seconde/maths/logique-ensembles.bank.ts
//
// Chapitre : Vocabulaire ensembliste et logique (notion logique_ensembles)
//
// REGLE DE DESIGN (option D) : fixed=remarquable/definition, templates dominants,
// QCM-raisonnement, short numerique (comptage d'elements), pas d'open.
// BO : ∈, ⊂, ∩, ∪, complementaire, et/ou, negation, contre-exemple, implication,
// equivalence, reciproque. (Les symboles ∀ et ∃ sont hors programme.)
//
// microSkills (>= 10 items chacun, difficultes 1->5) :
//   logique_appartenance_inclusion — Appartenance (∈) et inclusion (⊂)
//   logique_union_intersection     — Reunion, intersection, complementaire
//   logique_connecteurs            — Connecteurs « et » / « ou »
//   logique_negation_contre_exemple— Negation, contre-exemple
//   logique_implication_reciproque — Implication, equivalence, reciproque

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

export const logiqueEnsemblesBank: TutorBankItemV4[] = [
  /* ===================== LOGIQUE_APPARTENANCE_INCLUSION ===================== */

  {
    kind: "fixed",
    id: "seconde_log_app_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "logique_appartenance_inclusion",
    difficulty: 1,
    theme: "neutral",
    text: "Le symbole $\\in$ signifie :",
    format: "qcm",
    choices: ["appartient à", "est inclus dans", "est égal à", "est différent de"],
    expected: ["appartient à"],
    comparator: "mcq_exact",
    hint: "Relie un élément à un ensemble.",
    explanation: exp(
      "$\\in$ relie un élément à un ensemble.",
      "Ex. $3 \\in \\{1, 2, 3\\}$.",
      "Il se lit « appartient à ».",
      "$\\in$ signifie « appartient à »."
    ),
    tags: ["seconde", "maths", "logique", "appartenance", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_log_app_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "logique_appartenance_inclusion",
    difficulty: 1,
    theme: "neutral",
    text: "Le symbole $\\subset$ signifie :",
    format: "qcm",
    choices: ["est inclus dans (sous-ensemble)", "appartient à", "est plus grand que", "est l'intersection"],
    expected: ["est inclus dans (sous-ensemble)"],
    comparator: "mcq_exact",
    hint: "Relie deux ensembles.",
    explanation: exp(
      "$\\subset$ relie deux ensembles entre eux.",
      "Ex. $\\{1, 2\\} \\subset \\{1, 2, 3\\}$.",
      "Il se lit « est inclus dans ».",
      "$\\subset$ signifie « est inclus dans »."
    ),
    tags: ["seconde", "maths", "logique", "inclusion", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_log_app_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "logique_appartenance_inclusion",
    difficulty: 2,
    theme: "neutral",
    text: "L'affirmation $3 \\in \\{1, 2, 3, 4\\}$ est-elle vraie ?",
    format: "qcm",
    choices: ["Vraie", "Fausse", "On ne peut pas savoir", "Vraie seulement si 3 est premier"],
    expected: ["Vraie"],
    comparator: "mcq_exact",
    hint: "$3$ figure-t-il dans la liste ?",
    explanation: exp(
      "On vérifie si l'élément est dans l'ensemble.",
      "$3$ figure dans $\\{1, 2, 3, 4\\}$.",
      "Donc $3 \\in \\{1, 2, 3, 4\\}$ est vrai.",
      "Vraie."
    ),
    tags: ["seconde", "maths", "logique", "appartenance", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_log_app_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "logique_appartenance_inclusion",
    difficulty: 2,
    theme: "neutral",
    text: "L'affirmation $\\{1, 2\\} \\subset \\{1, 2, 3\\}$ est-elle vraie ?",
    format: "qcm",
    choices: ["Vraie", "Fausse", "On ne peut pas savoir", "Vraie seulement avec $0$"],
    expected: ["Vraie"],
    comparator: "mcq_exact",
    hint: "Tous les éléments de gauche sont-ils dans celui de droite ?",
    explanation: exp(
      "$A \\subset B$ si tous les éléments de $A$ sont dans $B$.",
      "$1$ et $2$ sont bien dans $\\{1, 2, 3\\}$.",
      "Donc l'inclusion est vraie.",
      "Vraie."
    ),
    tags: ["seconde", "maths", "logique", "inclusion", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_log_app_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "logique_appartenance_inclusion",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la différence entre $\\in$ et $\\subset$ ?",
    format: "qcm",
    choices: [
      "$\\in$ relie un élément à un ensemble ; $\\subset$ relie deux ensembles",
      "Ils sont identiques",
      "$\\in$ relie deux ensembles ; $\\subset$ relie un élément",
      "$\\subset$ veut dire « égal »",
    ],
    expected: ["$\\in$ relie un élément à un ensemble ; $\\subset$ relie deux ensembles"],
    comparator: "mcq_exact",
    hint: "Élément↔ensemble vs ensemble↔ensemble.",
    explanation: exp(
      "Les deux symboles n'ont pas les mêmes « côtés ».",
      "$3 \\in \\{1,2,3\\}$ (élément ∈ ensemble) ; $\\{3\\} \\subset \\{1,2,3\\}$ (ensemble ⊂ ensemble).",
      "On ne les confond pas.",
      "$\\in$ : élément→ensemble ; $\\subset$ : ensemble→ensemble."
    ),
    tags: ["seconde", "maths", "logique", "appartenance", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_log_app_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "logique_appartenance_inclusion",
    difficulty: 3,
    theme: "neutral",
    text: "Parmi ces inclusions d'ensembles de nombres, laquelle est correcte ?",
    format: "qcm",
    choices: ["$\\mathbb{N} \\subset \\mathbb{Z}$", "$\\mathbb{Z} \\subset \\mathbb{N}$", "$\\mathbb{R} \\subset \\mathbb{Q}$", "$\\mathbb{Q} \\subset \\mathbb{Z}$"],
    expected: ["$\\mathbb{N} \\subset \\mathbb{Z}$"],
    comparator: "mcq_exact",
    hint: "Les entiers naturels sont des entiers relatifs.",
    explanation: exp(
      "On reprend l'emboîtement des ensembles de nombres.",
      "$\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{D} \\subset \\mathbb{Q} \\subset \\mathbb{R}$.",
      "Donc $\\mathbb{N} \\subset \\mathbb{Z}$ est correct.",
      "$\\mathbb{N} \\subset \\mathbb{Z}$."
    ),
    tags: ["seconde", "maths", "logique", "inclusion", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_log_app_fixed_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "logique_appartenance_inclusion",
    difficulty: 2,
    theme: "neutral",
    text: "Combien d'éléments contient l'ensemble $\\{2, 4, 6, 8, 10\\}$ ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "On compte les éléments listés.",
    explanation: exp(
      "Le nombre d'éléments est le cardinal de l'ensemble.",
      "On compte : $2, 4, 6, 8, 10$.",
      "Cela fait $5$ éléments.",
      "L'ensemble a $5$ éléments."
    ),
    tags: ["seconde", "maths", "logique", "appartenance", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_log_app_fixed_8",
    niveau: "seconde",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "logique_appartenance_inclusion",
    difficulty: 3,
    theme: "neutral",
    text: "L'affirmation $5 \\in \\{1, 2, 3\\}$ est :",
    format: "qcm",
    choices: ["Fausse", "Vraie", "Vraie car 5 est impair", "Indéterminée"],
    expected: ["Fausse"],
    comparator: "mcq_exact",
    hint: "$5$ est-il dans la liste ?",
    explanation: exp(
      "On vérifie l'appartenance.",
      "$5$ ne figure pas dans $\\{1, 2, 3\\}$.",
      "Donc $5 \\in \\{1,2,3\\}$ est faux.",
      "Fausse."
    ),
    tags: ["seconde", "maths", "logique", "appartenance", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_log_app_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "logique_appartenance_inclusion",
    difficulty: 2,
    theme: "neutral",
    hint: "L'élément est-il dans la liste ?",
    tags: ["seconde", "maths", "logique", "appartenance", "template"],
    generate: () => {
      const ens = [2, 4, 6, 8];
      const dans = Math.random() < 0.5;
      const x = dans ? ens[randomInt(0, ens.length - 1)] : [1, 3, 5, 7][randomInt(0, 3)];
      return {
        text: `L'affirmation $${x} \\in \\{2, 4, 6, 8\\}$ est-elle vraie ?`,
        format: "qcm",
        choices: ["Vraie", "Fausse"],
        expected: [dans ? "Vraie" : "Fausse"],
        comparator: "mcq_exact",
        explanation: exp(
          "On vérifie si l'élément figure dans l'ensemble.",
          `On cherche $${x}$ dans $\\{2, 4, 6, 8\\}$.`,
          dans ? `$${x}$ y figure.` : `$${x}$ n'y figure pas.`,
          dans ? "Vraie." : "Fausse."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_log_app_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "logique_appartenance_inclusion",
    difficulty: 2,
    theme: "neutral",
    hint: "On compte les éléments distincts.",
    tags: ["seconde", "maths", "logique", "appartenance", "template"],
    generate: () => {
      const n = randomInt(3, 7);
      const els = Array.from({ length: n }, (_, i) => (i + 1) * 2);
      return {
        text: `Combien d'éléments contient l'ensemble $\\{${els.join(", ")}\\}$ ?`,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation: exp(
          "On compte les éléments listés (le cardinal).",
          `Les éléments sont ${els.join(", ")}.`,
          `Cela fait $${n}$ éléments.`,
          `L'ensemble a $${n}$ éléments.`
        ),
      };
    },
  },

  /* ===================== LOGIQUE_UNION_INTERSECTION ===================== */

  {
    kind: "fixed",
    id: "seconde_log_ui_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "logique_union_intersection",
    difficulty: 2,
    theme: "neutral",
    text: "L'intersection $A \\cap B$ est l'ensemble des éléments :",
    format: "qcm",
    choices: ["qui sont dans $A$ ET dans $B$", "qui sont dans $A$ OU dans $B$", "qui ne sont ni dans $A$ ni dans $B$", "de $A$ seulement"],
    expected: ["qui sont dans $A$ ET dans $B$"],
    comparator: "mcq_exact",
    hint: "$\\cap$ = « et ».",
    explanation: exp(
      "L'intersection regroupe les éléments communs.",
      "$A \\cap B$ : à la fois dans $A$ et dans $B$.",
      "C'est le « et » ensembliste.",
      "Dans $A$ ET dans $B$."
    ),
    tags: ["seconde", "maths", "logique", "union_intersection", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_log_ui_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "logique_union_intersection",
    difficulty: 2,
    theme: "neutral",
    text: "La réunion $A \\cup B$ est l'ensemble des éléments :",
    format: "qcm",
    choices: ["qui sont dans $A$ OU dans $B$ (au moins l'un)", "dans $A$ ET dans $B$", "dans aucun des deux", "de $B$ seulement"],
    expected: ["qui sont dans $A$ OU dans $B$ (au moins l'un)"],
    comparator: "mcq_exact",
    hint: "$\\cup$ = « ou ».",
    explanation: exp(
      "La réunion regroupe tous les éléments d'au moins un des deux ensembles.",
      "$A \\cup B$ : dans $A$ ou dans $B$ (ou les deux).",
      "C'est le « ou » ensembliste.",
      "Dans $A$ OU dans $B$."
    ),
    tags: ["seconde", "maths", "logique", "union_intersection", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_log_ui_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "logique_union_intersection",
    difficulty: 3,
    theme: "neutral",
    text: "Soit $A = \\{1, 2, 3\\}$ et $B = \\{2, 3, 4\\}$. Que vaut $A \\cap B$ ?",
    format: "qcm",
    choices: ["$\\{2, 3\\}$", "$\\{1, 2, 3, 4\\}$", "$\\{1, 4\\}$", "$\\varnothing$"],
    expected: ["$\\{2, 3\\}$"],
    comparator: "mcq_exact",
    hint: "Éléments communs aux deux.",
    explanation: exp(
      "On cherche les éléments présents dans les deux ensembles.",
      "$A = \\{1,2,3\\}$, $B = \\{2,3,4\\}$ : communs $= 2$ et $3$.",
      "$A \\cap B = \\{2, 3\\}$.",
      "$\\{2, 3\\}$."
    ),
    tags: ["seconde", "maths", "logique", "union_intersection", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_log_ui_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "logique_union_intersection",
    difficulty: 3,
    theme: "neutral",
    text: "Soit $A = \\{1, 2, 3\\}$ et $B = \\{2, 3, 4\\}$. Que vaut $A \\cup B$ ?",
    format: "qcm",
    choices: ["$\\{1, 2, 3, 4\\}$", "$\\{2, 3\\}$", "$\\{1, 4\\}$", "$\\{1, 2, 3, 2, 3, 4\\}$"],
    expected: ["$\\{1, 2, 3, 4\\}$"],
    comparator: "mcq_exact",
    hint: "Tous les éléments, sans répétition.",
    explanation: exp(
      "On réunit tous les éléments des deux ensembles (sans répéter).",
      "$\\{1, 2, 3\\} \\cup \\{2, 3, 4\\}$.",
      "$= \\{1, 2, 3, 4\\}$.",
      "$\\{1, 2, 3, 4\\}$."
    ),
    tags: ["seconde", "maths", "logique", "union_intersection", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_log_ui_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "logique_union_intersection",
    difficulty: 3,
    theme: "neutral",
    text: "Le complémentaire $\\overline{A}$ d'un ensemble $A$ (dans $E$) contient :",
    format: "qcm",
    choices: [
      "les éléments de $E$ qui ne sont pas dans $A$",
      "les éléments de $A$",
      "tous les éléments de $E$",
      "aucun élément",
    ],
    expected: ["les éléments de $E$ qui ne sont pas dans $A$"],
    comparator: "mcq_exact",
    hint: "« Tout sauf $A$ ».",
    explanation: exp(
      "Le complémentaire regroupe ce qui n'est pas dans $A$.",
      "$\\overline{A}$ (ou $E \\setminus A$) = éléments de $E$ hors de $A$.",
      "C'est « tout sauf $A$ ».",
      "Les éléments de $E$ qui ne sont pas dans $A$."
    ),
    tags: ["seconde", "maths", "logique", "union_intersection", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_log_ui_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "logique_union_intersection",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $A = \\{1, 2, 3\\}$ et $B = \\{4, 5\\}$. Combien d'éléments contient $A \\cap B$ ?",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "Y a-t-il des éléments communs ?",
    explanation: exp(
      "On cherche les éléments communs.",
      "$\\{1,2,3\\}$ et $\\{4,5\\}$ n'ont aucun élément commun.",
      "$A \\cap B = \\varnothing$ : $0$ élément.",
      "$0$ élément (ensembles disjoints)."
    ),
    tags: ["seconde", "maths", "logique", "union_intersection", "short"],
  },

  {
    kind: "template",
    id: "seconde_log_ui_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "logique_union_intersection",
    difficulty: 3,
    theme: "neutral",
    hint: "Intersection = éléments communs.",
    tags: ["seconde", "maths", "logique", "union_intersection", "template"],
    generate: () => {
      const a = [1, 2, 3, 4];
      const b = [3, 4, 5, 6];
      const inter = a.filter((x) => b.includes(x)); // [3,4]
      const correct = `$\\{${inter.join(", ")}\\}$`;
      const choices = [
        correct,
        "$\\{1, 2, 3, 4, 5, 6\\}$",
        "$\\{1, 2\\}$",
        "$\\varnothing$",
      ];
      return {
        text: `Soit $A = \\{${a.join(", ")}\\}$ et $B = \\{${b.join(", ")}\\}$. Que vaut $A \\cap B$ ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On garde les éléments présents dans les deux ensembles.",
          `Communs à $A$ et $B$ : ${inter.join(", ")}.`,
          `$A \\cap B = \\{${inter.join(", ")}\\}$.`,
          `$\\{${inter.join(", ")}\\}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_log_ui_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "logique_union_intersection",
    difficulty: 3,
    theme: "neutral",
    hint: "Réunion = tous les éléments, sans répétition.",
    tags: ["seconde", "maths", "logique", "union_intersection", "template"],
    generate: () => {
      const a = [1, 2, 3];
      const b = [3, 4];
      const union = Array.from(new Set([...a, ...b])).sort((x, y) => x - y);
      const correct = `$\\{${union.join(", ")}\\}$`;
      const choices = [correct, "$\\{3\\}$", `$\\{${a.join(", ")}\\}$`, "$\\varnothing$"];
      return {
        text: `Soit $A = \\{${a.join(", ")}\\}$ et $B = \\{${b.join(", ")}\\}$. Que vaut $A \\cup B$ ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On réunit tous les éléments sans répétition.",
          `$\\{${a.join(", ")}\\} \\cup \\{${b.join(", ")}\\}$.`,
          `$= \\{${union.join(", ")}\\}$.`,
          `$\\{${union.join(", ")}\\}$.`
        ),
      };
    },
  },

  /* ===================== LOGIQUE_CONNECTEURS ===================== */

  {
    kind: "fixed",
    id: "seconde_log_con_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "logique_connecteurs",
    difficulty: 2,
    theme: "neutral",
    text: "Une proposition « $P$ ET $Q$ » est vraie lorsque :",
    format: "qcm",
    choices: ["$P$ et $Q$ sont toutes les deux vraies", "au moins l'une est vraie", "l'une est fausse", "les deux sont fausses"],
    expected: ["$P$ et $Q$ sont toutes les deux vraies"],
    comparator: "mcq_exact",
    hint: "« ET » exige les deux.",
    explanation: exp(
      "Le connecteur « et » est exigeant.",
      "« $P$ et $Q$ » n'est vraie que si les deux le sont.",
      "Si l'une est fausse, le « et » est faux.",
      "Les deux doivent être vraies."
    ),
    tags: ["seconde", "maths", "logique", "connecteurs", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_log_con_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "logique_connecteurs",
    difficulty: 2,
    theme: "neutral",
    text: "Une proposition « $P$ OU $Q$ » est vraie lorsque :",
    format: "qcm",
    choices: ["au moins l'une des deux est vraie", "les deux sont vraies seulement", "les deux sont fausses", "$P$ est fausse"],
    expected: ["au moins l'une des deux est vraie"],
    comparator: "mcq_exact",
    hint: "Le « ou » mathématique est inclusif.",
    explanation: exp(
      "Le « ou » mathématique est inclusif (pas exclusif).",
      "« $P$ ou $Q$ » est vraie dès qu'au moins l'une est vraie.",
      "Elle est aussi vraie si les deux le sont.",
      "Au moins l'une des deux est vraie."
    ),
    tags: ["seconde", "maths", "logique", "connecteurs", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_log_con_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "logique_connecteurs",
    difficulty: 3,
    theme: "neutral",
    text: "La proposition « $3 > 2$ ET $5 > 10$ » est :",
    format: "qcm",
    choices: ["Fausse", "Vraie", "Indéterminée", "Vraie car $3 > 2$"],
    expected: ["Fausse"],
    comparator: "mcq_exact",
    hint: "Le « et » exige les deux ; or $5 > 10$ est faux.",
    explanation: exp(
      "On évalue chaque partie.",
      "$3 > 2$ est vrai, mais $5 > 10$ est faux.",
      "Un « et » avec une partie fausse est faux.",
      "Fausse."
    ),
    tags: ["seconde", "maths", "logique", "connecteurs", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_log_con_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "logique_connecteurs",
    difficulty: 3,
    theme: "neutral",
    text: "La proposition « $3 > 2$ OU $5 > 10$ » est :",
    format: "qcm",
    choices: ["Vraie", "Fausse", "Indéterminée", "Fausse car $5 > 10$ est faux"],
    expected: ["Vraie"],
    comparator: "mcq_exact",
    hint: "Le « ou » suffit d'une partie vraie.",
    explanation: exp(
      "On évalue chaque partie.",
      "$3 > 2$ est vrai (peu importe que $5 > 10$ soit faux).",
      "Un « ou » avec au moins une partie vraie est vrai.",
      "Vraie."
    ),
    tags: ["seconde", "maths", "logique", "connecteurs", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_log_con_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "logique_connecteurs",
    difficulty: 3,
    theme: "neutral",
    text: "Le lien entre connecteurs et ensembles : « $x \\in A$ ET $x \\in B$ » correspond à :",
    format: "qcm",
    choices: ["$x \\in A \\cap B$", "$x \\in A \\cup B$", "$x \\in \\overline{A}$", "$x \\notin A$"],
    expected: ["$x \\in A \\cap B$"],
    comparator: "mcq_exact",
    hint: "« et » → intersection.",
    explanation: exp(
      "Le « et » logique correspond à l'intersection.",
      "« $x \\in A$ et $x \\in B$ » signifie $x$ dans les deux.",
      "C'est $x \\in A \\cap B$.",
      "$x \\in A \\cap B$."
    ),
    tags: ["seconde", "maths", "logique", "connecteurs", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_log_con_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "logique_connecteurs",
    difficulty: 3,
    theme: "neutral",
    text: "« $x \\in A$ OU $x \\in B$ » correspond à :",
    format: "qcm",
    choices: ["$x \\in A \\cup B$", "$x \\in A \\cap B$", "$x \\in \\overline{A}$", "$x \\notin B$"],
    expected: ["$x \\in A \\cup B$"],
    comparator: "mcq_exact",
    hint: "« ou » → réunion.",
    explanation: exp(
      "Le « ou » logique correspond à la réunion.",
      "« $x \\in A$ ou $x \\in B$ » signifie $x$ dans au moins l'un.",
      "C'est $x \\in A \\cup B$.",
      "$x \\in A \\cup B$."
    ),
    tags: ["seconde", "maths", "logique", "connecteurs", "raisonnement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_log_con_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "logique_connecteurs",
    difficulty: 3,
    theme: "neutral",
    hint: "« et » : les deux vraies ; « ou » : au moins une.",
    tags: ["seconde", "maths", "logique", "connecteurs", "template"],
    generate: () => {
      // P vrai, Q faux
      const connecteur = Math.random() < 0.5 ? "ET" : "OU";
      const vraie = connecteur === "OU"; // P vrai, Q faux : ET->faux, OU->vrai
      const correct = vraie ? "Vraie" : "Fausse";
      return {
        text: `La proposition « $4 > 1$ ${connecteur} $2 > 9$ » est :`,
        format: "qcm",
        choices: ["Vraie", "Fausse"],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On évalue chaque partie : $4 > 1$ vrai, $2 > 9$ faux.",
          connecteur === "ET" ? "Le « et » exige les deux vraies." : "Le « ou » suffit d'une vraie.",
          connecteur === "ET" ? "Une partie fausse rend le « et » faux." : "Une partie vraie rend le « ou » vrai.",
          correct + "."
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_log_con_fixed_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "logique_connecteurs",
    difficulty: 2,
    theme: "neutral",
    text: "En mathématiques, le « ou » est :",
    format: "qcm",
    choices: [
      "inclusif (l'un, l'autre, ou les deux)",
      "exclusif (l'un ou l'autre mais pas les deux)",
      "toujours faux",
      "identique au « et »",
    ],
    expected: ["inclusif (l'un, l'autre, ou les deux)"],
    comparator: "mcq_exact",
    hint: "Différent du « ou » du langage courant.",
    explanation: exp(
      "Le « ou » mathématique n'exclut pas le cas « les deux ».",
      "« $P$ ou $Q$ » est vraie même si $P$ et $Q$ sont vraies.",
      "C'est un « ou » inclusif.",
      "Inclusif."
    ),
    tags: ["seconde", "maths", "logique", "connecteurs", "raisonnement", "qcm"],
  },

  /* ===================== LOGIQUE_NEGATION_CONTRE_EXEMPLE ===================== */

  {
    kind: "fixed",
    id: "seconde_log_neg_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "logique_negation_contre_exemple",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la négation de « $x > 0$ » ?",
    format: "qcm",
    choices: ["$x \\le 0$", "$x < 0$", "$x \\ge 0$", "$x = 0$"],
    expected: ["$x \\le 0$"],
    comparator: "mcq_exact",
    hint: "La négation de « strictement positif » inclut $0$.",
    explanation: exp(
      "La négation couvre tous les cas où la proposition est fausse.",
      "« $x > 0$ » est fausse quand $x$ n'est pas strictement positif.",
      "Cela correspond à $x \\le 0$ (négatif ou nul).",
      "$x \\le 0$."
    ),
    tags: ["seconde", "maths", "logique", "negation", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_log_neg_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "logique_negation_contre_exemple",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la négation de « $x \\ge 5$ » ?",
    format: "qcm",
    choices: ["$x < 5$", "$x \\le 5$", "$x > 5$", "$x = 5$"],
    expected: ["$x < 5$"],
    comparator: "mcq_exact",
    hint: "La négation de $\\ge$ est $<$.",
    explanation: exp(
      "On nie l'inégalité.",
      "« $x \\ge 5$ » est fausse quand $x$ est strictement inférieur à $5$.",
      "Donc la négation est $x < 5$.",
      "$x < 5$."
    ),
    tags: ["seconde", "maths", "logique", "negation", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_log_neg_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "logique_negation_contre_exemple",
    difficulty: 3,
    theme: "neutral",
    text: "Pour montrer qu'une proposition (du type « tous les… ») est fausse, il suffit de :",
    format: "qcm",
    choices: [
      "donner un contre-exemple",
      "vérifier un seul cas vrai",
      "la réécrire",
      "la démontrer",
    ],
    expected: ["donner un contre-exemple"],
    comparator: "mcq_exact",
    hint: "Un seul cas qui contredit suffit.",
    explanation: exp(
      "Une proposition universelle tombe dès qu'un cas la contredit.",
      "Ce cas s'appelle un contre-exemple.",
      "Un seul suffit pour prouver qu'elle est fausse.",
      "Donner un contre-exemple."
    ),
    tags: ["seconde", "maths", "logique", "contre_exemple", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_log_neg_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "logique_negation_contre_exemple",
    difficulty: 4,
    theme: "neutral",
    text: "« Tous les nombres premiers sont impairs. » Quel contre-exemple prouve que c'est faux ?",
    format: "qcm",
    choices: ["$2$ (premier et pair)", "$9$ (impair non premier)", "$7$ (premier impair)", "$1$"],
    expected: ["$2$ (premier et pair)"],
    comparator: "mcq_exact",
    hint: "Cherche un premier qui n'est pas impair.",
    explanation: exp(
      "Un contre-exemple doit contredire l'affirmation.",
      "$2$ est premier mais pair : il contredit « tous impairs ».",
      "($9$ ne convient pas car il n'est pas premier.)",
      "$2$ est le contre-exemple."
    ),
    tags: ["seconde", "maths", "logique", "contre_exemple", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_log_neg_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "logique_negation_contre_exemple",
    difficulty: 4,
    theme: "neutral",
    text: "« Pour tout réel $x$, $x^2 > 0$. » Quel contre-exemple montre que c'est faux ?",
    format: "qcm",
    choices: ["$x = 0$ (car $0^2 = 0$)", "$x = 1$", "$x = -2$", "$x = 3$"],
    expected: ["$x = 0$ (car $0^2 = 0$)"],
    comparator: "mcq_exact",
    hint: "Cherche un $x$ dont le carré n'est pas $> 0$.",
    explanation: exp(
      "On cherche un réel dont le carré n'est pas strictement positif.",
      "$0^2 = 0$, qui n'est pas $> 0$.",
      "$x = 0$ contredit l'affirmation.",
      "$x = 0$ est le contre-exemple."
    ),
    tags: ["seconde", "maths", "logique", "contre_exemple", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_log_neg_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "logique_negation_contre_exemple",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la négation de « $x = 3$ » ?",
    format: "qcm",
    choices: ["$x \\neq 3$", "$x > 3$", "$x < 3$", "$x = -3$"],
    expected: ["$x \\neq 3$"],
    comparator: "mcq_exact",
    hint: "Négation de « égal ».",
    explanation: exp(
      "La négation de l'égalité est la différence.",
      "« $x = 3$ » est fausse quand $x$ n'est pas $3$.",
      "C'est $x \\neq 3$.",
      "$x \\neq 3$."
    ),
    tags: ["seconde", "maths", "logique", "negation", "raisonnement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_log_neg_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "logique_negation_contre_exemple",
    difficulty: 3,
    theme: "neutral",
    hint: "Négation : $>$ ↔ $\\le$, $\\ge$ ↔ $<$.",
    tags: ["seconde", "maths", "logique", "negation", "template"],
    generate: () => {
      const a = randomInt(1, 9);
      const cas = [
        { prop: `x > ${a}`, neg: `$x \\le ${a}$` },
        { prop: `x \\ge ${a}`, neg: `$x < ${a}$` },
        { prop: `x < ${a}`, neg: `$x \\ge ${a}$` },
        { prop: `x \\le ${a}`, neg: `$x > ${a}$` },
      ];
      const c = cas[randomInt(0, cas.length - 1)];
      const choices = [c.neg, `$x = ${a}$`, `$x \\neq ${a}$`, `$x = -${a}$`];
      return {
        text: `Quelle est la négation de « $${c.prop}$ » ?`,
        format: "qcm",
        choices,
        expected: [c.neg],
        comparator: "mcq_exact",
        explanation: exp(
          "On inverse l'inégalité (en gardant ou non l'égalité au bon endroit).",
          `La proposition « $${c.prop}$ » est fausse exactement dans le cas opposé.`,
          `Sa négation est ${c.neg}.`,
          `${c.neg}.`
        ),
      };
    },
  },

  /* ===================== LOGIQUE_IMPLICATION_RECIPROQUE ===================== */

  {
    kind: "fixed",
    id: "seconde_log_imp_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "logique_implication_reciproque",
    difficulty: 2,
    theme: "neutral",
    text: "Une implication « si $P$ alors $Q$ » se note :",
    format: "qcm",
    choices: ["$P \\Rightarrow Q$", "$P \\Leftrightarrow Q$", "$P = Q$", "$P \\in Q$"],
    expected: ["$P \\Rightarrow Q$"],
    comparator: "mcq_exact",
    hint: "Une flèche simple.",
    explanation: exp(
      "L'implication relie une hypothèse à une conclusion.",
      "« si $P$ alors $Q$ » se note $P \\Rightarrow Q$.",
      "(La double flèche $\\Leftrightarrow$ est l'équivalence.)",
      "$P \\Rightarrow Q$."
    ),
    tags: ["seconde", "maths", "logique", "implication", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_log_imp_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "logique_implication_reciproque",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la réciproque de « si $P$ alors $Q$ » ?",
    format: "qcm",
    choices: ["si $Q$ alors $P$", "si $P$ alors $Q$", "si non $P$ alors non $Q$", "$P$ et $Q$"],
    expected: ["si $Q$ alors $P$"],
    comparator: "mcq_exact",
    hint: "On échange hypothèse et conclusion.",
    explanation: exp(
      "La réciproque inverse le sens de l'implication.",
      "De « si $P$ alors $Q$ », on passe à « si $Q$ alors $P$ ».",
      "On échange hypothèse et conclusion.",
      "Si $Q$ alors $P$."
    ),
    tags: ["seconde", "maths", "logique", "reciproque", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_log_imp_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "logique_implication_reciproque",
    difficulty: 3,
    theme: "neutral",
    text: "Une équivalence « $P \\Leftrightarrow Q$ » signifie :",
    format: "qcm",
    choices: [
      "$P \\Rightarrow Q$ ET $Q \\Rightarrow P$ (les deux sens)",
      "$P \\Rightarrow Q$ seulement",
      "$Q \\Rightarrow P$ seulement",
      "$P$ et $Q$ sont fausses",
    ],
    expected: ["$P \\Rightarrow Q$ ET $Q \\Rightarrow P$ (les deux sens)"],
    comparator: "mcq_exact",
    hint: "« si et seulement si ».",
    explanation: exp(
      "L'équivalence est une double implication.",
      "$P \\Leftrightarrow Q$ signifie l'implication dans les deux sens.",
      "Se lit « $P$ si et seulement si $Q$ ».",
      "Les deux implications à la fois."
    ),
    tags: ["seconde", "maths", "logique", "implication", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_log_imp_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "logique_implication_reciproque",
    difficulty: 4,
    theme: "neutral",
    text: "Une implication vraie a-t-elle toujours une réciproque vraie ?",
    format: "qcm",
    choices: [
      "Non, pas toujours",
      "Oui, toujours",
      "Oui, si $P$ est vraie",
      "Non, jamais",
    ],
    expected: ["Non, pas toujours"],
    comparator: "mcq_exact",
    hint: "Ex. « si $x = 2$ alors $x^2 = 4$ » : la réciproque ?",
    explanation: exp(
      "L'implication et sa réciproque sont indépendantes.",
      "« si $x = 2$ alors $x^2 = 4$ » est vraie ; sa réciproque « si $x^2 = 4$ alors $x = 2$ » est fausse ($x$ peut valoir $-2$).",
      "Donc une réciproque n'est pas automatiquement vraie.",
      "Non, pas toujours."
    ),
    tags: ["seconde", "maths", "logique", "reciproque", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_log_imp_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "logique_implication_reciproque",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la réciproque de « si un nombre finit par $0$, alors il est divisible par $5$ » ?",
    format: "qcm",
    choices: [
      "si un nombre est divisible par $5$, alors il finit par $0$",
      "si un nombre finit par $0$, alors il est divisible par $5$",
      "si un nombre ne finit pas par $0$, alors il n'est pas divisible par $5$",
      "un nombre finit par $0$ et est divisible par $5$",
    ],
    expected: ["si un nombre est divisible par $5$, alors il finit par $0$"],
    comparator: "mcq_exact",
    hint: "On échange hypothèse et conclusion.",
    explanation: exp(
      "On inverse les deux propositions.",
      "Hypothèse et conclusion sont échangées.",
      "(Ici la réciproque est d'ailleurs fausse : $15$ est divisible par $5$ mais finit par $5$.)",
      "« Si divisible par $5$, alors finit par $0$ »."
    ),
    tags: ["seconde", "maths", "logique", "reciproque", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_log_imp_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "logique_implication_reciproque",
    difficulty: 2,
    theme: "neutral",
    text: "« $P$ si et seulement si $Q$ » correspond au symbole :",
    format: "qcm",
    choices: ["$\\Leftrightarrow$", "$\\Rightarrow$", "$\\in$", "$\\subset$"],
    expected: ["$\\Leftrightarrow$"],
    comparator: "mcq_exact",
    hint: "Double flèche.",
    explanation: exp(
      "« si et seulement si » est l'équivalence.",
      "On la note avec une double flèche.",
      "$P \\Leftrightarrow Q$.",
      "$\\Leftrightarrow$."
    ),
    tags: ["seconde", "maths", "logique", "implication", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_log_imp_fixed_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "logique_implication_reciproque",
    difficulty: 4,
    theme: "neutral",
    text: "« Si $x = 3$ alors $x^2 = 9$ » est vraie. Sa réciproque « si $x^2 = 9$ alors $x = 3$ » est :",
    format: "qcm",
    choices: [
      "fausse (car $x$ peut valoir $-3$)",
      "vraie",
      "toujours vraie",
      "impossible à dire",
    ],
    expected: ["fausse (car $x$ peut valoir $-3$)"],
    comparator: "mcq_exact",
    hint: "$(-3)^2 = 9$ aussi.",
    explanation: exp(
      "On cherche un contre-exemple à la réciproque.",
      "$x^2 = 9$ admet $x = 3$ mais aussi $x = -3$.",
      "La réciproque est donc fausse.",
      "Fausse (contre-exemple $x = -3$)."
    ),
    tags: ["seconde", "maths", "logique", "reciproque", "raisonnement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_log_imp_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "logique_implication_reciproque",
    difficulty: 3,
    theme: "neutral",
    hint: "Réciproque : on échange P et Q.",
    tags: ["seconde", "maths", "logique", "reciproque", "template"],
    generate: () => {
      const cas = [
        { p: "il pleut", q: "le sol est mouillé" },
        { p: "un quadrilatère est un carré", q: "il a 4 côtés égaux" },
        { p: "un nombre est un multiple de 4", q: "il est pair" },
      ];
      const c = cas[randomInt(0, cas.length - 1)];
      const correct = `si ${c.q}, alors ${c.p}`;
      const choices = [
        correct,
        `si ${c.p}, alors ${c.q}`,
        `${c.p} et ${c.q}`,
        `si non ${c.p}, alors non ${c.q}`,
      ];
      return {
        text: `Quelle est la réciproque de « si ${c.p}, alors ${c.q} » ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "La réciproque échange hypothèse et conclusion.",
          `On part de « si ${c.p}, alors ${c.q} ».`,
          `On obtient « si ${c.q}, alors ${c.p} ».`,
          correct + "."
        ),
      };
    },
  },
];
