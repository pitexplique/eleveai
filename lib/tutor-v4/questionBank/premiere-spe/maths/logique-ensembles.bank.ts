// lib/tutor-v4/questionBank/premiere-spe/maths/logique-ensembles.bank.ts
//
// Chapitre : Vocabulaire ensembliste et logique (notion "logique_ensembles")
// microSkills :
//   log_appartenance     — ∈, ⊂, ensembles de nombres, intervalles
//   log_operations       — ∩, ∪, complémentaire
//   log_couple           — couple et produit cartésien
//   log_connecteurs      — « et », « ou »
//   log_contre_exemple   — réfuter par un contre-exemple
//   log_implication      — formuler et utiliser une implication
//   log_reciproque       — réciproque
//   log_equivalence      — « si et seulement si »
//   log_condition        — condition nécessaire / suffisante
//   log_statut_lettres   — identité ou équation ; variable, inconnue, paramètre
//   log_quantificateurs  — « pour tout », « il existe »
//   log_negation         — nier une proposition quantifiée
//   log_raisonnements    — disjonction de cas, absurde, contraposée
//
// PÉRIMÈTRE BO Première spé, section « Vocabulaire ensembliste et
// logique ». Le programme précise que ces notions se travaillent « d'abord
// dans des contextes où elles se présentent naturellement » : les énoncés
// s'appuient donc autant que possible sur des objets déjà connus de l'élève
// (trinômes, fonctions, figures) plutôt que sur des P et des Q abstraits.
//
// Conventions : LaTeX, règle QCM (bonne réponse en 1re position, mélangée par
// le moteur).

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function shuffle<T>(arr: readonly T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

// Les propositions d'un gabarit sont écrites à la main, et deux d'entre elles
// finissent par coïncider dès qu'un paramètre tombe sur une valeur particulière
// (a = b, un coefficient nul, une fraction qui se simplifie…). L'élève voyait
// alors deux fois la même ligne. On met la bonne réponse de côté, on tire trois
// pièges réellement distincts, puis on mélange l'ensemble.
function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}


function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickOne<T>(arr: readonly T[]): T {
  return arr[randomInt(0, arr.length - 1)];
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
  /* ===================== LOG_APPARTENANCE ===================== */
  {
    kind: "fixed",
    id: "premiere_log_app_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_appartenance",
    difficulty: 2,
    theme: "neutral",
    text: "Que signifie l'écriture $3 \\in \\mathbb{N}$ ?",
    format: "qcm",
    choices: [
      "$3$ est un élément de l'ensemble $\\mathbb{N}$",
      "$3$ est inclus dans $\\mathbb{N}$",
      "$\\mathbb{N}$ contient exactement $3$ éléments",
      "$3$ est plus petit que $\\mathbb{N}$",
    ],
    expected: ["$3$ est un élément de l'ensemble $\\mathbb{N}$"],
    comparator: "mcq_exact",
    hint: "Le symbole $\\in$ se lit « appartient à ».",
    explanation: exp(
      "Le symbole $\\in$ relie un ÉLÉMENT à un ensemble : $x \\in E$ se lit « $x$ appartient à $E$ ».",
      "Ici l'élément est le nombre $3$, l'ensemble est $\\mathbb{N}$, celui des entiers naturels.",
      "On dit bien « $3$ appartient à $\\mathbb{N}$ », et non « $3$ est inclus dans $\\mathbb{N}$ » : l'inclusion, notée $\\subset$, relie deux ENSEMBLES.",
      "$3 \\in \\mathbb{N}$ signifie que $3$ est un élément de $\\mathbb{N}$."
    ),
    tags: ["premiere", "maths", "logique", "appartenance", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_app_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_appartenance",
    difficulty: 3,
    theme: "neutral",
    text: "Quel symbole relie DEUX ENSEMBLES ?",
    format: "qcm",
    choices: ["$\\subset$", "$\\in$", "$=$", "$\\notin$"],
    expected: ["$\\subset$"],
    comparator: "mcq_exact",
    hint: "L'un se lit « appartient à », l'autre « est inclus dans ».",
    explanation: exp(
      "Deux symboles voisins, mais qui ne relient pas les mêmes objets.",
      "$\\in$ relie un élément à un ensemble ; $\\subset$ relie un ensemble à un autre ensemble.",
      "On écrit $3 \\in \\mathbb{N}$ (un nombre appartient à un ensemble) et $\\mathbb{N} \\subset \\mathbb{Z}$ (tout entier naturel est un entier relatif).",
      "C'est $\\subset$, qui se lit « est inclus dans »."
    ),
    tags: ["premiere", "maths", "logique", "appartenance", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_app_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_appartenance",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la chaîne d'inclusions correcte ?",
    format: "qcm",
    choices: [
      "$\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}$",
      "$\\mathbb{R} \\subset \\mathbb{Q} \\subset \\mathbb{Z} \\subset \\mathbb{N}$",
      "$\\mathbb{Z} \\subset \\mathbb{N} \\subset \\mathbb{Q} \\subset \\mathbb{R}$",
      "$\\mathbb{N} \\subset \\mathbb{Q} \\subset \\mathbb{Z} \\subset \\mathbb{R}$",
    ],
    expected: ["$\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}$"],
    comparator: "mcq_exact",
    hint: "Du plus petit ensemble au plus grand : entiers positifs, puis relatifs, puis fractions, puis tous les réels.",
    explanation: exp(
      "Chaque ensemble de nombres est contenu dans le suivant.",
      "$\\mathbb{N}$ (entiers naturels) $\\subset \\mathbb{Z}$ (on ajoute les négatifs) $\\subset \\mathbb{Q}$ (on ajoute les fractions) $\\subset \\mathbb{R}$ (on ajoute $\\sqrt{2}$, $\\pi$…).",
      "Chaque inclusion est stricte : $-3$ est dans $\\mathbb{Z}$ mais pas dans $\\mathbb{N}$, $\\dfrac{1}{2}$ est dans $\\mathbb{Q}$ mais pas dans $\\mathbb{Z}$.",
      "$\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}$."
    ),
    tags: ["premiere", "maths", "logique", "appartenance", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_app_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_appartenance",
    difficulty: 3,
    theme: "neutral",
    text: "À quel ensemble le nombre $-5$ appartient-il, sans appartenir au précédent de la chaîne ?",
    format: "qcm",
    choices: [
      "$\\mathbb{Z}$, mais pas $\\mathbb{N}$",
      "$\\mathbb{N}$, mais pas $\\mathbb{Z}$",
      "$\\mathbb{Q}$, mais pas $\\mathbb{Z}$",
      "$\\mathbb{R}$, mais pas $\\mathbb{Q}$",
    ],
    expected: ["$\\mathbb{Z}$, mais pas $\\mathbb{N}$"],
    comparator: "mcq_exact",
    hint: "$\\mathbb{N}$ ne contient que des nombres positifs ou nuls.",
    explanation: exp(
      "$\\mathbb{N}$ contient les entiers positifs ou nuls ; $\\mathbb{Z}$ ajoute leurs opposés.",
      "$-5$ est un entier, mais il est négatif : il n'est donc pas dans $\\mathbb{N}$.",
      "En revanche $-5 \\in \\mathbb{Z}$, et par inclusion $-5 \\in \\mathbb{Q}$ et $-5 \\in \\mathbb{R}$.",
      "$-5 \\in \\mathbb{Z}$ mais $-5 \\notin \\mathbb{N}$."
    ),
    tags: ["premiere", "maths", "logique", "appartenance", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_app_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_appartenance",
    difficulty: 4,
    theme: "neutral",
    text: "Où se situe $\\sqrt{2}$ ?",
    format: "qcm",
    choices: [
      "dans $\\mathbb{R}$, mais pas dans $\\mathbb{Q}$",
      "dans $\\mathbb{Q}$, mais pas dans $\\mathbb{Z}$",
      "dans $\\mathbb{Z}$, mais pas dans $\\mathbb{N}$",
      "dans aucun de ces ensembles",
    ],
    expected: ["dans $\\mathbb{R}$, mais pas dans $\\mathbb{Q}$"],
    comparator: "mcq_exact",
    hint: "$\\sqrt{2}$ peut-il s'écrire comme une fraction d'entiers ?",
    explanation: exp(
      "$\\mathbb{Q}$ est l'ensemble des nombres qui s'écrivent comme une fraction d'entiers.",
      "On démontre que $\\sqrt{2}$ ne peut PAS s'écrire ainsi : c'est un nombre irrationnel (la démonstration classique se fait par l'absurde).",
      "Il a pourtant une place sur la droite numérique : c'est la longueur de la diagonale du carré de côté $1$. Il appartient donc à $\\mathbb{R}$.",
      "$\\sqrt{2} \\in \\mathbb{R}$ et $\\sqrt{2} \\notin \\mathbb{Q}$."
    ),
    tags: ["premiere", "maths", "logique", "appartenance", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_app_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_appartenance",
    difficulty: 4,
    theme: "neutral",
    text: "Combien d'éléments contient l'ensemble $\\{x \\in \\mathbb{N} \\mid x < 4\\}$ ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Écris-les tous : n'oublie pas que $0$ est un entier naturel.",
    explanation: exp(
      "Cette écriture définit un ensemble par une CONDITION : les $x$ de $\\mathbb{N}$ qui vérifient $x < 4$.",
      "On liste : $0$, $1$, $2$, $3$. Le nombre $4$ est exclu car l'inégalité est stricte.",
      "L'ensemble est $\\{0 ; 1 ; 2 ; 3\\}$, soit $4$ éléments. Oublier $0$ est l'erreur la plus fréquente.",
      "Il contient $4$ éléments."
    ),
    tags: ["premiere", "maths", "logique", "appartenance", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_log_app_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_appartenance",
    difficulty: 2,
    theme: "neutral",
    text: "L'affirmation $3 \\in [2 ; 5]$ est-elle vraie ?",
    format: "qcm",
    choices: [
      "oui : $3$ est compris entre $2$ et $5$",
      "non : $3$ n'est pas une borne de l'intervalle",
      "non : l'intervalle ne contient que $2$ et $5$",
      "on ne peut pas savoir",
    ],
    expected: ["oui : $3$ est compris entre $2$ et $5$"],
    comparator: "mcq_exact",
    hint: "Un intervalle contient TOUS les réels compris entre ses bornes.",
    explanation: exp(
      "L'intervalle $[2 ; 5]$ est l'ensemble de tous les réels $x$ tels que $2 \\le x \\le 5$.",
      "$3$ vérifie bien $2 \\le 3 \\le 5$.",
      "Un intervalle n'est pas la paire de ses bornes : il contient une infinité de nombres, dont $3$, $\\sqrt{5}$ ou $4{,}97$.",
      "Oui, $3 \\in [2 ; 5]$."
    ),
    tags: ["premiere", "maths", "logique", "appartenance", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_app_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_appartenance",
    difficulty: 4,
    theme: "neutral",
    text: "L'affirmation $2 \\in \\left]2 ; 5\\right]$ est-elle vraie ?",
    format: "qcm",
    choices: [
      "non : le crochet ouvert exclut $2$",
      "oui : $2$ est une borne de l'intervalle",
      "oui : $2 \\le 5$",
      "on ne peut pas savoir",
    ],
    expected: ["non : le crochet ouvert exclut $2$"],
    comparator: "mcq_exact",
    hint: "Regarde le sens du crochet du côté gauche.",
    explanation: exp(
      "Un crochet tourné vers l'extérieur EXCLUT la borne ; tourné vers l'intérieur, il l'inclut.",
      "$\\left]2 ; 5\\right]$ est donc l'ensemble des réels $x$ tels que $2 < x \\le 5$ : inégalité stricte à gauche.",
      "$2$ n'est pas strictement supérieur à lui-même : il n'appartient pas à l'intervalle. En revanche $5$ y appartient, et $2{,}001$ aussi.",
      "Non : $2 \\notin \\left]2 ; 5\\right]$."
    ),
    tags: ["premiere", "maths", "logique", "appartenance", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_app_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_appartenance",
    difficulty: 3,
    theme: "neutral",
    text: "Comment note-t-on que le nombre $7$ n'appartient pas à l'ensemble $A$ ?",
    format: "qcm",
    choices: ["$7 \\notin A$", "$7 \\not\\subset A$", "$7 \\neq A$", "$A \\notin 7$"],
    expected: ["$7 \\notin A$"],
    comparator: "mcq_exact",
    hint: "On barre le symbole d'appartenance.",
    explanation: exp(
      "La négation d'une appartenance se note en barrant le symbole $\\in$.",
      "On écrit donc $7 \\notin A$, qui se lit « $7$ n'appartient pas à $A$ ».",
      "L'ordre compte : c'est l'élément à gauche, l'ensemble à droite. Écrire $A \\notin 7$ n'a pas de sens.",
      "On note $7 \\notin A$."
    ),
    tags: ["premiere", "maths", "logique", "appartenance", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_app_fixed_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_appartenance",
    difficulty: 4,
    theme: "neutral",
    text: "Le nombre $0{,}25$ appartient-il à $\\mathbb{Q}$ ?",
    format: "qcm",
    choices: [
      "oui : il s'écrit $\\dfrac{1}{4}$",
      "non : ce n'est pas un entier",
      "non : il n'est pas dans $\\mathbb{R}$",
      "oui, mais il appartient aussi à $\\mathbb{Z}$",
    ],
    expected: ["oui : il s'écrit $\\dfrac{1}{4}$"],
    comparator: "mcq_exact",
    hint: "$\\mathbb{Q}$ est l'ensemble des quotients d'entiers.",
    explanation: exp(
      "$\\mathbb{Q}$ contient tous les nombres qui peuvent s'écrire $\\dfrac{a}{b}$ avec $a$ et $b$ entiers, $b$ non nul.",
      "$0{,}25 = \\dfrac{25}{100} = \\dfrac{1}{4}$ : c'est bien un quotient d'entiers.",
      "Il n'est pas dans $\\mathbb{Z}$ (ce n'est pas un entier), mais il est dans $\\mathbb{Q}$, et donc aussi dans $\\mathbb{R}$.",
      "Oui : $0{,}25 \\in \\mathbb{Q}$."
    ),
    tags: ["premiere", "maths", "logique", "appartenance", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_app_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_appartenance",
    difficulty: 5,
    theme: "neutral",
    text: "Parmi ces écritures, laquelle est CORRECTE ?",
    format: "qcm",
    choices: [
      "$\\{3\\} \\subset \\mathbb{N}$",
      "$\\{3\\} \\in \\mathbb{N}$",
      "$3 \\subset \\mathbb{N}$",
      "$\\mathbb{N} \\in 3$",
    ],
    expected: ["$\\{3\\} \\subset \\mathbb{N}$"],
    comparator: "mcq_exact",
    hint: "$\\{3\\}$ n'est pas le nombre $3$ : c'est l'ensemble qui contient ce seul nombre.",
    explanation: exp(
      "Il faut distinguer un élément et l'ensemble qui le contient : $3$ est un nombre, $\\{3\\}$ est un ensemble à un élément.",
      "Entre deux ensembles, on utilise $\\subset$ : tous les éléments de $\\{3\\}$ (c'est-à-dire $3$) sont bien dans $\\mathbb{N}$.",
      "Donc $\\{3\\} \\subset \\mathbb{N}$ est correct, tout comme $3 \\in \\mathbb{N}$.",
      "L'écriture correcte est $\\{3\\} \\subset \\mathbb{N}$."
    ),
    tags: ["premiere", "maths", "logique", "appartenance", "qcm"],
  },

  {
    kind: "fixed",
    id: "premiere_log_app_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_appartenance",
    difficulty: 4,
    theme: "neutral",
    text: "Explique la différence entre les symboles $\\in$ et $\\subset$, en donnant un exemple de chacun.",
    format: "open",
    expected: ["élément", "ensemble", "inclus", "appartient"],
    comparator: "contains_keyword",
    hint: "Que relie chaque symbole : deux ensembles, ou un objet et un ensemble ?",
    explanation: exp(
      "Les deux symboles relient des objets de nature différente.",
      "$\\in$ relie un ÉLÉMENT à un ensemble : $3 \\in \\mathbb{N}$.",
      "$\\subset$ relie deux ENSEMBLES : $\\mathbb{N} \\subset \\mathbb{Z}$. On peut aussi écrire $\\{3\\} \\subset \\mathbb{N}$, car $\\{3\\}$ est un ensemble.",
      "$\\in$ pour un élément, $\\subset$ pour un ensemble."
    ),
    tags: ["premiere", "maths", "logique", "appartenance", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_log_app_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_appartenance",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève écrit « $3 \\subset \\mathbb{N}$ ». Explique son erreur et corrige.",
    format: "open",
    expected: ["élément", "appartient", "n'est pas un ensemble", "accolades"],
    comparator: "contains_keyword",
    hint: "Le nombre $3$ est-il un ensemble ?",
    explanation: exp(
      "Le symbole $\\subset$ ne s'emploie qu'entre deux ensembles.",
      "Or $3$ est un nombre, pas un ensemble : l'écriture n'a pas de sens.",
      "Deux corrections possibles : $3 \\in \\mathbb{N}$ (le nombre appartient à l'ensemble), ou $\\{3\\} \\subset \\mathbb{N}$ (l'ensemble contenant $3$ est inclus dans $\\mathbb{N}$).",
      "Il fallait écrire $3 \\in \\mathbb{N}$."
    ),
    tags: ["premiere", "maths", "logique", "appartenance", "open"],
  },
  {
    kind: "template",
    id: "premiere_log_app_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_appartenance",
    difficulty: 4,
    theme: "neutral",
    hint: "Regarde le sens des crochets : tourné vers l'extérieur, la borne est exclue.",
    tags: ["premiere", "maths", "logique", "appartenance", "template"],
    generate: () => {
      const bornes = [
        { i: "[2 ; 7]", min: 2, max: 7, gauche: true, droite: true },
        { i: "]2 ; 7]", min: 2, max: 7, gauche: false, droite: true },
        { i: "[2 ; 7[", min: 2, max: 7, gauche: true, droite: false },
        { i: "]-3 ; 4[", min: -3, max: 4, gauche: false, droite: false },
        { i: "[-5 ; 0]", min: -5, max: 0, gauche: true, droite: true },
      ];
      const b = pickOne(bornes);
      // On tire soit une borne (le cas intéressant), soit un point intérieur/extérieur.
      const candidats = [b.min, b.max, Math.round((b.min + b.max) / 2), b.max + 2];
      const x = pickOne(candidats);
      const dedans =
        (x > b.min || (x === b.min && b.gauche)) &&
        (x < b.max || (x === b.max && b.droite));
      return {
        text: `Le nombre $${x}$ appartient-il à l'intervalle $${b.i}$ ?`,
        format: "qcm",
        choices: dedans
          ? ["oui", "non : la borne est exclue", "non : il est en dehors", "on ne peut pas savoir"]
          : ["non", "oui", "oui, car il est entre les bornes", "on ne peut pas savoir"],
        expected: [dedans ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Un intervalle contient tous les réels compris entre ses bornes ; un crochet tourné vers l'extérieur EXCLUT la borne.",
          `On compare $${x}$ aux bornes $${b.min}$ et $${b.max}$, en regardant le sens des crochets.`,
          dedans
            ? `$${x}$ vérifie bien les deux conditions de l'intervalle $${b.i}$.`
            : `$${x}$ ne vérifie pas les conditions de l'intervalle $${b.i}$ (borne exclue, ou nombre en dehors).`,
          dedans ? `$${x} \\in ${b.i}$.` : `$${x} \\notin ${b.i}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "premiere_log_app_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_appartenance",
    difficulty: 5,
    theme: "neutral",
    hint: "Rappelle ce que contient l'ensemble, puis dis si le nombre y est.",
    tags: ["premiere", "maths", "logique", "appartenance", "open", "template"],
    generate: () => {
      const cas = [
        {
          n: "$\\sqrt{2}$",
          e: "$\\mathbb{Q}$",
          dedans: false,
          mots: ["fraction", "irrationnel", "n'appartient pas", "quotient"],
          pourquoi:
            "$\\mathbb{Q}$ contient les nombres qui s'écrivent comme une fraction d'entiers ; on démontre que $\\sqrt{2}$ ne le peut pas.",
        },
        {
          n: "$-5$",
          e: "$\\mathbb{N}$",
          dedans: false,
          mots: ["négatif", "naturel", "n'appartient pas", "positif"],
          pourquoi:
            "$\\mathbb{N}$ ne contient que les entiers positifs ou nuls ; $-5$ est négatif, il est dans $\\mathbb{Z}$ mais pas dans $\\mathbb{N}$.",
        },
        {
          n: "$0{,}25$",
          e: "$\\mathbb{Q}$",
          dedans: true,
          mots: ["fraction", "quart", "appartient", "quotient"],
          pourquoi:
            "$0{,}25 = \\dfrac{1}{4}$ est un quotient d'entiers : il appartient bien à $\\mathbb{Q}$, mais pas à $\\mathbb{Z}$.",
        },
        {
          n: "$-7$",
          e: "$\\mathbb{Z}$",
          dedans: true,
          mots: ["entier", "relatif", "appartient", "négatif"],
          pourquoi:
            "$\\mathbb{Z}$ contient les entiers positifs et négatifs : $-7$ en fait partie.",
        },
        {
          n: "$\\pi$",
          e: "$\\mathbb{R}$",
          dedans: true,
          mots: ["réel", "appartient", "droite", "irrationnel"],
          pourquoi:
            "$\\pi$ est irrationnel — il n'est pas dans $\\mathbb{Q}$ — mais il a bien une place sur la droite numérique : il appartient à $\\mathbb{R}$.",
        },
      ];
      const c = pickOne(cas);
      return {
        text: `Le nombre ${c.n} appartient-il à ${c.e} ? Justifie ta réponse.`,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: exp(
          "Pour répondre, on part de ce que contient l'ensemble, puis on regarde si le nombre remplit la condition.",
          `On examine donc la définition de ${c.e}.`,
          c.pourquoi,
          c.dedans ? `Oui, ${c.n} appartient à ${c.e}.` : `Non, ${c.n} n'appartient pas à ${c.e}.`
        ),
      };
    },
  },

  /* ===================== LOG_OPERATIONS ===================== */
  {
    kind: "fixed",
    id: "premiere_log_ope_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_operations",
    difficulty: 2,
    theme: "neutral",
    text: "Que contient l'ensemble $A \\cap B$ ?",
    format: "qcm",
    choices: [
      "les éléments qui sont à la fois dans $A$ ET dans $B$",
      "les éléments qui sont dans $A$ OU dans $B$",
      "les éléments de $A$ qui ne sont pas dans $B$",
      "tous les éléments de $A$ et tous ceux de $B$",
    ],
    expected: ["les éléments qui sont à la fois dans $A$ ET dans $B$"],
    comparator: "mcq_exact",
    hint: "$\\cap$ se lit « inter ».",
    explanation: exp(
      "L'intersection $A \\cap B$ rassemble ce que les deux ensembles ont en COMMUN.",
      "Un élément appartient à $A \\cap B$ lorsqu'il appartient à $A$ et à $B$ en même temps.",
      "Le connecteur associé est « et ». La réunion $A \\cup B$, elle, correspond au « ou ».",
      "$A \\cap B$ contient les éléments qui sont à la fois dans $A$ et dans $B$."
    ),
    tags: ["premiere", "maths", "logique", "operations", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_ope_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_operations",
    difficulty: 2,
    theme: "neutral",
    text: "Que contient l'ensemble $A \\cup B$ ?",
    format: "qcm",
    choices: [
      "les éléments qui sont dans $A$, dans $B$, ou dans les deux",
      "les éléments communs à $A$ et $B$",
      "les éléments de $A$ qui ne sont pas dans $B$",
      "les éléments qui ne sont ni dans $A$ ni dans $B$",
    ],
    expected: ["les éléments qui sont dans $A$, dans $B$, ou dans les deux"],
    comparator: "mcq_exact",
    hint: "Le « ou » des mathématiques n'exclut pas les deux à la fois.",
    explanation: exp(
      "La réunion $A \\cup B$ rassemble tous les éléments d'au moins un des deux ensembles.",
      "Elle correspond au connecteur « ou », qui en mathématiques est INCLUSIF : les éléments présents dans les deux ensembles en font aussi partie.",
      "Ce n'est pas le « ou » du langage courant de « fromage ou dessert », qui exclut de prendre les deux.",
      "$A \\cup B$ contient les éléments de $A$, ceux de $B$, et ceux des deux."
    ),
    tags: ["premiere", "maths", "logique", "operations", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_ope_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_operations",
    difficulty: 3,
    theme: "neutral",
    text: "Soit $A = \\{1 ; 2 ; 3\\}$ et $B = \\{3 ; 4 ; 5\\}$. Combien d'éléments contient $A \\cap B$ ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Cherche les nombres présents dans les DEUX listes.",
    explanation: exp(
      "L'intersection ne retient que les éléments communs.",
      "$1$ et $2$ ne sont que dans $A$ ; $4$ et $5$ ne sont que dans $B$. Seul $3$ figure dans les deux.",
      "$A \\cap B = \\{3\\}$, qui contient $1$ élément.",
      "$A \\cap B$ contient $1$ élément."
    ),
    tags: ["premiere", "maths", "logique", "operations", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_log_ope_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_operations",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $A = \\{1 ; 2 ; 3\\}$ et $B = \\{3 ; 4 ; 5\\}$. Combien d'éléments contient $A \\cup B$ ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Le $3$ ne se compte qu'une seule fois.",
    explanation: exp(
      "La réunion rassemble les éléments des deux ensembles, sans répétition.",
      "$A \\cup B = \\{1 ; 2 ; 3 ; 4 ; 5\\}$.",
      "Cela fait $5$ éléments, et non $6$ : dans un ensemble, un élément ne figure qu'une fois, même s'il appartient aux deux.",
      "$A \\cup B$ contient $5$ éléments."
    ),
    tags: ["premiere", "maths", "logique", "operations", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_log_ope_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_operations",
    difficulty: 5,
    theme: "neutral",
    text: "Quel est le complémentaire de $[3 ; +\\infty[$ dans $\\mathbb{R}$ ?",
    format: "qcm",
    choices: [
      "$]-\\infty ; 3[$",
      "$]-\\infty ; 3]$",
      "$[0 ; 3]$",
      "$]3 ; +\\infty[$",
    ],
    expected: ["$]-\\infty ; 3[$"],
    comparator: "mcq_exact",
    hint: "Le complémentaire contient tout ce qui n'est PAS dans l'ensemble — y compris quant à la borne $3$.",
    explanation: exp(
      "Le complémentaire d'une partie $A$ dans $\\mathbb{R}$ rassemble tous les réels qui n'appartiennent pas à $A$.",
      "$[3 ; +\\infty[$ contient les réels tels que $x \\ge 3$, borne $3$ COMPRISE.",
      "Son complémentaire est donc l'ensemble des $x < 3$, strictement : $3$ est déjà pris par l'ensemble de départ.",
      "Le complémentaire est $]-\\infty ; 3[$."
    ),
    tags: ["premiere", "maths", "logique", "operations", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_ope_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_operations",
    difficulty: 3,
    theme: "neutral",
    text: "Comment note-t-on le complémentaire d'un sous-ensemble $A$ de $E$ ?",
    format: "qcm",
    choices: [
      "$\\bar{A}$, ou $E \\setminus A$",
      "$A^{-1}$",
      "$-A$",
      "$A \\cap E$",
    ],
    expected: ["$\\bar{A}$, ou $E \\setminus A$"],
    comparator: "mcq_exact",
    hint: "C'est la même barre que l'événement contraire, en probabilités.",
    explanation: exp(
      "Le complémentaire de $A$ dans $E$ est l'ensemble des éléments de $E$ qui ne sont pas dans $A$.",
      "On le note $\\bar{A}$ — la notation des probabilités — ou $E \\setminus A$, qui se lit « $E$ privé de $A$ ».",
      "C'est exactement l'événement contraire vu en probabilités : $\\bar{A}$ se réalise quand $A$ ne se réalise pas.",
      "On note $\\bar{A}$ ou $E \\setminus A$."
    ),
    tags: ["premiere", "maths", "logique", "operations", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_ope_fixed_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_operations",
    difficulty: 5,
    theme: "neutral",
    text: "Si $A \\subset B$, que vaut $A \\cap B$ ?",
    format: "qcm",
    choices: ["$A$", "$B$", "$\\emptyset$", "on ne peut pas savoir"],
    expected: ["$A$"],
    comparator: "mcq_exact",
    hint: "Si tous les éléments de $A$ sont déjà dans $B$, que reste-t-il en commun ?",
    explanation: exp(
      "$A \\subset B$ signifie que tout élément de $A$ appartient aussi à $B$.",
      "L'intersection retient les éléments communs : ce sont donc tous les éléments de $A$, sans exception.",
      "Exemple : $\\mathbb{N} \\subset \\mathbb{Z}$, et $\\mathbb{N} \\cap \\mathbb{Z} = \\mathbb{N}$. (Au passage, $A \\cup B = B$.)",
      "$A \\cap B = A$."
    ),
    tags: ["premiere", "maths", "logique", "operations", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_ope_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_operations",
    difficulty: 3,
    theme: "neutral",
    text: "Que désigne le symbole $\\emptyset$ ?",
    format: "qcm",
    choices: [
      "l'ensemble qui ne contient aucun élément",
      "l'ensemble qui contient le nombre $0$",
      "le nombre zéro",
      "un ensemble dont on ignore les éléments",
    ],
    expected: ["l'ensemble qui ne contient aucun élément"],
    comparator: "mcq_exact",
    hint: "Vide ne veut pas dire « contenant zéro ».",
    explanation: exp(
      "$\\emptyset$ est l'ensemble vide : celui qui n'a aucun élément.",
      "Il ne faut pas le confondre avec $\\{0\\}$, qui contient un élément — le nombre $0$ —, ni avec le nombre $0$ lui-même.",
      "On le rencontre souvent comme ensemble de solutions : l'équation $x^2 = -1$ n'a aucune solution réelle, donc $S = \\emptyset$.",
      "$\\emptyset$ est l'ensemble qui ne contient aucun élément."
    ),
    tags: ["premiere", "maths", "logique", "operations", "qcm"],
  },

  {
    kind: "fixed",
    id: "premiere_log_ope_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_operations",
    difficulty: 4,
    theme: "neutral",
    text: "Explique la différence entre $A \\cap B$ et $A \\cup B$, en prenant l'exemple de deux intervalles.",
    format: "open",
    expected: ["commun", "intersection", "réunion", "les deux"],
    comparator: "contains_keyword",
    hint: "L'un ne garde que ce qui est partagé, l'autre rassemble tout.",
    explanation: exp(
      "L'intersection retient les éléments communs, la réunion rassemble tous les éléments.",
      "Avec $A = [1 ; 5]$ et $B = [3 ; 8]$ : $A \\cap B = [3 ; 5]$, la partie où les deux se superposent.",
      "Et $A \\cup B = [1 ; 8]$, qui va de la plus petite à la plus grande borne. L'intersection est toujours contenue dans la réunion.",
      "$\\cap$ garde le commun, $\\cup$ rassemble tout."
    ),
    tags: ["premiere", "maths", "logique", "operations", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_log_ope_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_operations",
    difficulty: 5,
    theme: "neutral",
    text: "Que vaut $A \\cap B$ lorsque $A \\subset B$ ? Explique ton raisonnement.",
    format: "open",
    expected: ["A", "inclus", "tous les éléments", "déjà"],
    comparator: "contains_keyword",
    hint: "Si tous les éléments de $A$ sont déjà dans $B$, qu'ont-ils en commun ?",
    explanation: exp(
      "$A \\subset B$ signifie que chaque élément de $A$ appartient aussi à $B$.",
      "L'intersection retient les éléments présents dans les deux : ce sont donc tous les éléments de $A$.",
      "D'où $A \\cap B = A$. Et pour la même raison, $A \\cup B = B$ : la réunion n'apporte rien de plus que $B$.",
      "$A \\cap B = A$."
    ),
    tags: ["premiere", "maths", "logique", "operations", "open"],
  },
  {
    kind: "template",
    id: "premiere_log_ope_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_operations",
    difficulty: 5,
    theme: "neutral",
    hint: "Pour l'intersection : la plus GRANDE borne de gauche, la plus PETITE borne de droite.",
    tags: ["premiere", "maths", "logique", "operations", "template"],
    generate: () => {
      const a = randomInt(0, 4);
      const b = a + randomInt(3, 5);
      const c = a + randomInt(1, 2); // c est dans ]a ; b[ : les intervalles se chevauchent
      const d = b + randomInt(1, 4);
      const inter = randomInt(0, 1) === 1;
      return {
        text: inter
          ? `Que vaut $[${a} ; ${b}] \\cap [${c} ; ${d}]$ ?`
          : `Que vaut $[${a} ; ${b}] \\cup [${c} ; ${d}]$ ?`,
        format: "qcm",
        choices: inter
          ? [`$[${c} ; ${b}]$`, `$[${a} ; ${d}]$`, `$[${a} ; ${c}]$`, `$[${b} ; ${d}]$`]
          : [`$[${a} ; ${d}]$`, `$[${c} ; ${b}]$`, `$[${a} ; ${b}]$`, `$[${c} ; ${d}]$`],
        expected: inter ? [`$[${c} ; ${b}]$`] : [`$[${a} ; ${d}]$`],
        comparator: "mcq_exact",
        explanation: exp(
          inter
            ? "L'intersection de deux intervalles est leur partie commune."
            : "La réunion de deux intervalles qui se chevauchent est d'un seul tenant.",
          inter
            ? `Il faut $x \\ge ${a}$ ET $x \\ge ${c}$, donc $x \\ge ${c}$ ; et $x \\le ${b}$ ET $x \\le ${d}$, donc $x \\le ${b}$.`
            : `Les deux intervalles se chevauchent (sur $[${c} ; ${b}]$) : leur réunion n'a donc pas de trou.`,
          inter
            ? `On garde la plus grande borne de gauche et la plus petite borne de droite : $[${c} ; ${b}]$.`
            : `Elle va de la plus petite borne à la plus grande : $[${a} ; ${d}]$.`,
          inter
            ? `$[${a} ; ${b}] \\cap [${c} ; ${d}] = [${c} ; ${b}]$.`
            : `$[${a} ; ${b}] \\cup [${c} ; ${d}] = [${a} ; ${d}]$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "premiere_log_ope_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_operations",
    difficulty: 5,
    theme: "neutral",
    hint: "Dis d'abord ce que retient l'opération, puis applique-le aux deux ensembles.",
    tags: ["premiere", "maths", "logique", "operations", "open", "template"],
    generate: () => {
      const a = randomInt(0, 3);
      const b = a + randomInt(3, 5);
      const c = a + randomInt(1, 2);
      const d = b + randomInt(1, 4);
      const inter = randomInt(0, 1) === 1;
      return {
        text: inter
          ? `Que vaut $[${a} ; ${b}] \\cap [${c} ; ${d}]$ ? Explique comment tu l'obtiens.`
          : `Que vaut $[${a} ; ${b}] \\cup [${c} ; ${d}]$ ? Explique comment tu l'obtiens.`,
        format: "open",
        expected: inter
          ? ["commun", "intersection", `${c}`, "les deux"]
          : ["réunion", "chevauchent", `${d}`, "tout"],
        comparator: "contains_keyword",
        explanation: exp(
          inter
            ? "L'intersection ne retient que les réels appartenant aux DEUX intervalles."
            : "La réunion rassemble les réels appartenant à AU MOINS un des deux intervalles.",
          inter
            ? `Il faut $x \\ge ${a}$ et $x \\ge ${c}$, donc $x \\ge ${c}$ ; puis $x \\le ${b}$ et $x \\le ${d}$, donc $x \\le ${b}$.`
            : `Les deux intervalles se chevauchent sur $[${c} ; ${b}]$ : la réunion est donc d'un seul tenant.`,
          inter
            ? `On garde la plus grande borne de gauche et la plus petite borne de droite.`
            : `Elle s'étend de la plus petite borne à la plus grande.`,
          inter
            ? `$[${a} ; ${b}] \\cap [${c} ; ${d}] = [${c} ; ${b}]$.`
            : `$[${a} ; ${b}] \\cup [${c} ; ${d}] = [${a} ; ${d}]$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "premiere_log_ope_tpl_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_operations",
    difficulty: 4,
    theme: "neutral",
    hint: "L'intersection garde ce qui est dans LES DEUX ; la réunion garde ce qui est dans AU MOINS UN.",
    tags: ["premiere", "maths", "logique", "operations", "template"],
    generate: () => {
      const a = randomInt(-4, 3);
      const b = a + randomInt(2, 5);
      // Deux intervalles identiques rendent la question sans objet : réunion et
      // intersection valent alors la même chose, et les quatre propositions
      // s'écrivent toutes pareil. Le QCM n'affichait plus qu'une ligne.
      let c = randomInt(a, b + 2);
      let d = c + randomInt(2, 5);
      while (c === a && d === b) {
        c = randomInt(a, b + 2);
        d = c + randomInt(2, 5);
      }
      const inter = pickOne([true, false]);
      const debInter = Math.max(a, c);
      const finInter = Math.min(b, d);
      const vide = debInter > finInter;
      const correct = inter
        ? vide
          ? "$\\varnothing$"
          : `$[${debInter} ; ${finInter}]$`
        : vide
          ? `$[${a} ; ${b}] \\cup [${c} ; ${d}]$`
          : `$[${Math.min(a, c)} ; ${Math.max(b, d)}]$`;
      const autre = inter
        ? `$[${Math.min(a, c)} ; ${Math.max(b, d)}]$`
        : vide
          ? "$\\varnothing$"
          : `$[${debInter} ; ${finInter}]$`;
      return {
        text: `Que vaut $[${a} ; ${b}] ${inter ? "\\cap" : "\\cup"} [${c} ; ${d}]$ ?`,
        format: "qcm",
        // Quand les deux intervalles se recouvrent exactement, les bornes
        // croisées redonnent la bonne réponse : il ne restait parfois qu'une
        // seule ligne au QCM. On garde les deux intervalles de l'énoncé en
        // réserve — ce sont de toute façon les erreurs les plus courantes.
        choices: makeChoices(correct, [
          autre,
          `$[${a} ; ${d}]$`,
          `$[${c} ; ${b}]$`,
          `$[${a} ; ${b}]$`,
          `$[${c} ; ${d}]$`,
          "$\\varnothing$",
          `$[${a} ; ${b}] \\cup [${c} ; ${d}]$`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          inter
            ? "L'INTERSECTION rassemble les réels qui appartiennent aux DEUX intervalles à la fois."
            : "La RÉUNION rassemble les réels qui appartiennent à AU MOINS UN des deux intervalles.",
          "On place les quatre bornes sur une droite graduée et on regarde la zone commune, ou la zone couverte.",
          inter
            ? vide
              ? `Les deux intervalles ne se chevauchent pas : aucune valeur n'est dans les deux.`
              : `La zone commune va de la PLUS GRANDE borne de gauche, $${debInter}$, à la PLUS PETITE borne de droite, $${finInter}$.`
            : vide
              ? `Les deux intervalles sont disjoints : la réunion ne peut pas s'écrire comme un seul intervalle, on garde les deux morceaux.`
              : `Les deux intervalles se chevauchent : la réunion va de la plus petite borne, $${Math.min(a, c)}$, à la plus grande, $${Math.max(b, d)}$.`,
          `${correct}.`
        ),
      };
    },
  },

  /* ===================== LOG_COUPLE ===================== */
  {
    kind: "fixed",
    id: "premiere_log_cpl_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_couple",
    difficulty: 3,
    theme: "neutral",
    text: "Les couples $(1 ; 2)$ et $(2 ; 1)$ sont-ils égaux ?",
    format: "qcm",
    choices: [
      "non : dans un couple, l'ordre compte",
      "oui : ils contiennent les mêmes nombres",
      "oui : l'ordre n'a jamais d'importance",
      "on ne peut pas comparer deux couples",
    ],
    expected: ["non : dans un couple, l'ordre compte"],
    comparator: "mcq_exact",
    hint: "Pense aux coordonnées d'un point du plan.",
    explanation: exp(
      "Un couple est une donnée ORDONNÉE : $(x ; y) = (x' ; y')$ exige $x = x'$ et $y = y'$.",
      "$(1 ; 2)$ et $(2 ; 1)$ n'ont pas la même première coordonnée.",
      "Dans le plan, ce sont deux points distincts, symétriques par rapport à la première bissectrice.",
      "Non, ces deux couples sont différents."
    ),
    tags: ["premiere", "maths", "logique", "couple", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_cpl_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_couple",
    difficulty: 4,
    theme: "neutral",
    text: "Les ensembles $\\{1 ; 2\\}$ et $\\{2 ; 1\\}$ sont-ils égaux ?",
    format: "qcm",
    choices: [
      "oui : dans un ensemble, l'ordre ne compte pas",
      "non : l'ordre compte toujours",
      "non : ils n'ont pas le même premier élément",
      "seulement s'ils ont le même nombre d'éléments",
    ],
    expected: ["oui : dans un ensemble, l'ordre ne compte pas"],
    comparator: "mcq_exact",
    hint: "C'est là toute la différence avec un couple.",
    explanation: exp(
      "Un ensemble est défini par ses éléments, indépendamment de l'ordre dans lequel on les écrit.",
      "$\\{1 ; 2\\}$ et $\\{2 ; 1\\}$ ont exactement les mêmes éléments : ils sont égaux.",
      "C'est ce qui distingue les accolades des parenthèses : $(1 ; 2) \\neq (2 ; 1)$, mais $\\{1 ; 2\\} = \\{2 ; 1\\}$.",
      "Oui, ces deux ensembles sont égaux."
    ),
    tags: ["premiere", "maths", "logique", "couple", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_cpl_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_couple",
    difficulty: 3,
    theme: "neutral",
    text: "Que contient le produit cartésien $A \\times B$ ?",
    format: "qcm",
    choices: [
      "tous les couples $(a ; b)$ avec $a \\in A$ et $b \\in B$",
      "tous les produits $a \\times b$ des éléments de $A$ et $B$",
      "les éléments communs à $A$ et $B$",
      "les éléments de $A$ ou de $B$",
    ],
    expected: ["tous les couples $(a ; b)$ avec $a \\in A$ et $b \\in B$"],
    comparator: "mcq_exact",
    hint: "Malgré son nom, il ne s'agit pas d'une multiplication.",
    explanation: exp(
      "Le produit cartésien $A \\times B$ est l'ensemble de tous les couples dont la première coordonnée est dans $A$ et la seconde dans $B$.",
      "On forme donc toutes les associations possibles, dans cet ordre.",
      "Le nom « produit » vient du nombre d'éléments obtenus, pas d'une multiplication des éléments eux-mêmes : les éléments de $A$ et $B$ ne sont pas forcément des nombres.",
      "$A \\times B$ contient tous les couples $(a ; b)$ avec $a \\in A$ et $b \\in B$."
    ),
    tags: ["premiere", "maths", "logique", "couple", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_cpl_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_couple",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $A = \\{1 ; 2\\}$ et $B = \\{a ; b ; c\\}$. Combien de couples contient $A \\times B$ ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "$2$ choix pour la première coordonnée, $3$ pour la seconde.",
    explanation: exp(
      "On compte les couples en choisissant successivement chaque coordonnée.",
      "Il y a $2$ possibilités pour le premier élément et, pour chacune, $3$ pour le second : $2 \\times 3$.",
      "$= 6$ couples : $(1;a)$, $(1;b)$, $(1;c)$, $(2;a)$, $(2;b)$, $(2;c)$.",
      "$A \\times B$ contient $6$ couples."
    ),
    tags: ["premiere", "maths", "logique", "couple", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_log_cpl_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_couple",
    difficulty: 3,
    theme: "neutral",
    text: "Que désigne l'ensemble $\\mathbb{R}^2$ ?",
    format: "qcm",
    choices: [
      "l'ensemble des couples de réels $(x ; y)$",
      "l'ensemble des carrés de réels",
      "l'ensemble des réels positifs",
      "l'ensemble des réels multipliés par $2$",
    ],
    expected: ["l'ensemble des couples de réels $(x ; y)$"],
    comparator: "mcq_exact",
    hint: "$\\mathbb{R}^2$ est une autre écriture de $\\mathbb{R} \\times \\mathbb{R}$.",
    explanation: exp(
      "$\\mathbb{R}^2$ est le produit cartésien $\\mathbb{R} \\times \\mathbb{R}$.",
      "Ses éléments sont les couples $(x ; y)$ où $x$ et $y$ sont des réels.",
      "Muni d'un repère, cet ensemble se représente par le PLAN : chaque couple correspond à un point.",
      "$\\mathbb{R}^2$ est l'ensemble des couples de réels."
    ),
    tags: ["premiere", "maths", "logique", "couple", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_cpl_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_couple",
    difficulty: 3,
    theme: "neutral",
    text: "Dans un repère, les coordonnées d'un point du plan forment :",
    format: "qcm",
    choices: [
      "un couple de réels",
      "un ensemble de deux réels",
      "un intervalle",
      "un produit de deux réels",
    ],
    expected: ["un couple de réels"],
    comparator: "mcq_exact",
    hint: "Le point $(3 ; 5)$ est-il le même que le point $(5 ; 3)$ ?",
    explanation: exp(
      "Un point du plan est repéré par son abscisse PUIS son ordonnée : l'ordre est essentiel.",
      "C'est donc un couple, élément de $\\mathbb{R}^2$, et non un ensemble.",
      "Les points $(3 ; 5)$ et $(5 ; 3)$ sont d'ailleurs à des endroits différents, alors que les ensembles $\\{3 ; 5\\}$ et $\\{5 ; 3\\}$ seraient égaux.",
      "Les coordonnées forment un couple de réels."
    ),
    tags: ["premiere", "maths", "logique", "couple", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_cpl_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_couple",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $A$ un ensemble à $3$ éléments. Combien de couples contient $A \\times A$ ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "$3$ choix pour chaque coordonnée.",
    explanation: exp(
      "Un produit cartésien compte (nombre d'éléments du premier ensemble) × (nombre d'éléments du second).",
      "Ici les deux ensembles sont le même, à $3$ éléments : $3 \\times 3$.",
      "$= 9$ couples. Les couples comme $(a ; a)$ en font partie : rien n'interdit que les deux coordonnées soient égales.",
      "$A \\times A$ contient $9$ couples."
    ),
    tags: ["premiere", "maths", "logique", "couple", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_log_cpl_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_couple",
    difficulty: 5,
    theme: "neutral",
    text: "A-t-on toujours $A \\times B = B \\times A$ ?",
    format: "qcm",
    choices: [
      "non : les couples sont ordonnés",
      "oui : le produit est commutatif",
      "oui, si $A$ et $B$ ont le même nombre d'éléments",
      "non : ils n'ont pas le même nombre d'éléments",
    ],
    expected: ["non : les couples sont ordonnés"],
    comparator: "mcq_exact",
    hint: "Avec $A = \\{1\\}$ et $B = \\{2\\}$, compare les deux produits.",
    explanation: exp(
      "Les éléments d'un produit cartésien sont des couples, où la place de chaque coordonnée est imposée.",
      "Avec $A = \\{1\\}$ et $B = \\{2\\}$ : $A \\times B = \\{(1 ; 2)\\}$ tandis que $B \\times A = \\{(2 ; 1)\\}$.",
      "Les deux ensembles ont bien le même NOMBRE d'éléments, mais pas les mêmes éléments.",
      "Non : en général $A \\times B \\neq B \\times A$."
    ),
    tags: ["premiere", "maths", "logique", "couple", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_cpl_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_couple",
    difficulty: 4,
    theme: "neutral",
    text: "La solution d'un système de deux équations à deux inconnues $x$ et $y$ est :",
    format: "qcm",
    choices: [
      "un couple $(x ; y)$",
      "deux ensembles séparés",
      "un intervalle",
      "un nombre réel",
    ],
    expected: ["un couple $(x ; y)$"],
    comparator: "mcq_exact",
    hint: "Il faut une valeur de $x$ ET la valeur de $y$ qui va avec.",
    explanation: exp(
      "Résoudre un système, c'est trouver les valeurs de $x$ et de $y$ qui vérifient les deux équations EN MÊME TEMPS.",
      "Ces deux valeurs vont ensemble : on les présente donc comme un couple, $S = \\{(x ; y)\\}$.",
      "Géométriquement, ce couple est le point d'intersection des deux droites.",
      "La solution est un couple $(x ; y)$."
    ),
    tags: ["premiere", "maths", "logique", "couple", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_cpl_fixed_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_couple",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $A$ à $4$ éléments et $B$ à $5$ éléments. Combien de couples contient $A \\times B$ ?",
    format: "short",
    expected: ["20"],
    comparator: "number_equal",
    hint: "On multiplie les deux effectifs.",
    explanation: exp(
      "Le nombre d'éléments d'un produit cartésien est le produit des effectifs.",
      "Chacun des $4$ éléments de $A$ peut être associé à chacun des $5$ éléments de $B$ : $4 \\times 5$.",
      "$= 20$ couples.",
      "$A \\times B$ contient $20$ couples."
    ),
    tags: ["premiere", "maths", "logique", "couple", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_log_cpl_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_couple",
    difficulty: 5,
    theme: "neutral",
    text: "Comment s'écrit « le point $M$ de coordonnées $x$ et $y$ appartient au plan » ?",
    format: "qcm",
    choices: [
      "$(x ; y) \\in \\mathbb{R}^2$",
      "$x \\in \\mathbb{R}^2$ et $y \\in \\mathbb{R}^2$",
      "$\\{x ; y\\} \\in \\mathbb{R}$",
      "$(x ; y) \\subset \\mathbb{R}^2$",
    ],
    expected: ["$(x ; y) \\in \\mathbb{R}^2$"],
    comparator: "mcq_exact",
    hint: "L'élément est le couple entier, pas chaque coordonnée séparément.",
    explanation: exp(
      "Un point du plan est identifié au couple de ses coordonnées, qui est un élément de $\\mathbb{R}^2$.",
      "On écrit donc $(x ; y) \\in \\mathbb{R}^2$ : c'est le couple, d'un seul bloc, qui appartient à l'ensemble.",
      "Écrire $x \\in \\mathbb{R}^2$ serait faux : $x$ est un réel, pas un couple. Et $\\subset$ relierait deux ensembles.",
      "On écrit $(x ; y) \\in \\mathbb{R}^2$."
    ),
    tags: ["premiere", "maths", "logique", "couple", "qcm"],
  },

  {
    kind: "fixed",
    id: "premiere_log_cpl_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_couple",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi $(1 ; 2) \\neq (2 ; 1)$ alors que $\\{1 ; 2\\} = \\{2 ; 1\\}$.",
    format: "open",
    expected: ["ordre", "couple", "ensemble", "coordonnées"],
    comparator: "contains_keyword",
    hint: "Dans quel cas la place de chaque nombre a-t-elle une importance ?",
    explanation: exp(
      "Un couple est ordonné, un ensemble ne l'est pas.",
      "Dans un couple, chaque position a un rôle : la première coordonnée, puis la seconde. Les échanger change l'objet.",
      "Dans un ensemble, seule compte la liste des éléments : l'ordre d'écriture n'a aucune importance. C'est pourquoi les points $(1 ; 2)$ et $(2 ; 1)$ sont à des endroits différents du plan.",
      "L'ordre compte dans un couple, pas dans un ensemble."
    ),
    tags: ["premiere", "maths", "logique", "couple", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_log_cpl_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_couple",
    difficulty: 4,
    theme: "neutral",
    text: "Pourquoi les coordonnées d'un point du plan forment-elles un couple, et non un ensemble de deux nombres ?",
    format: "open",
    expected: ["abscisse", "ordonnée", "ordre", "position"],
    comparator: "contains_keyword",
    hint: "Que se passerait-il si on échangeait les deux nombres ?",
    explanation: exp(
      "Repérer un point demande de savoir quelle valeur est l'abscisse et laquelle est l'ordonnée.",
      "Cette information est portée par l'ORDRE : le premier nombre se lit sur l'axe horizontal, le second sur l'axe vertical.",
      "Un ensemble perdrait cette information : $\\{3 ; 5\\}$ ne dirait pas s'il s'agit du point $(3 ; 5)$ ou de $(5 ; 3)$, qui ne sont pas au même endroit.",
      "Parce que l'ordre des deux nombres porte une information indispensable."
    ),
    tags: ["premiere", "maths", "logique", "couple", "open"],
  },
  {
    kind: "template",
    id: "premiere_log_cpl_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_couple",
    difficulty: 4,
    theme: "neutral",
    hint: "On multiplie le nombre d'éléments du premier ensemble par celui du second.",
    tags: ["premiere", "maths", "logique", "couple", "template"],
    generate: () => {
      const n = randomInt(2, 6);
      const p = randomInt(2, 6);
      return {
        text: `L'ensemble $A$ contient $${n}$ éléments et l'ensemble $B$ en contient $${p}$. Combien de couples contient $A \\times B$ ?`,
        format: "short",
        expected: [String(n * p)],
        comparator: "number_equal",
        explanation: exp(
          "Le produit cartésien contient tous les couples formés d'un élément de $A$ et d'un élément de $B$.",
          `Chacun des $${n}$ éléments de $A$ peut être associé à chacun des $${p}$ éléments de $B$ : $${n} \\times ${p}$.`,
          `$= ${n * p}$ couples.`,
          `$A \\times B$ contient $${n * p}$ couples.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "premiere_log_cpl_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_couple",
    difficulty: 5,
    theme: "neutral",
    hint: "Compte les associations possibles, et dis pourquoi l'ordre importe.",
    tags: ["premiere", "maths", "logique", "couple", "open", "template"],
    generate: () => {
      const n = randomInt(2, 5);
      const p = randomInt(2, 5);
      return {
        text: `L'ensemble $A$ a $${n}$ éléments et $B$ en a $${p}$. Combien $A \\times B$ contient-il de couples ? Explique ton calcul, puis dis si $A \\times B$ et $B \\times A$ sont égaux.`,
        format: "open",
        expected: [String(n * p), "ordre", "couple", "associ"],
        comparator: "contains_keyword",
        explanation: exp(
          "Le produit cartésien rassemble tous les couples formés d'un élément de $A$ puis d'un élément de $B$.",
          `Chacun des $${n}$ éléments de $A$ s'associe à chacun des $${p}$ éléments de $B$ : $${n} \\times ${p} = ${n * p}$ couples.`,
          `En revanche $A \\times B$ et $B \\times A$ ne sont PAS égaux : leurs couples sont écrits dans l'ordre inverse, même s'ils sont aussi nombreux (${n * p} de chaque côté).`,
          `$A \\times B$ contient $${n * p}$ couples, et diffère de $B \\times A$.`
        ),
      };
    },
  },

  /* ===================== LOG_CONNECTEURS ===================== */
  {
    kind: "fixed",
    id: "premiere_log_con_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_connecteurs",
    difficulty: 3,
    theme: "neutral",
    text: "À quelle opération sur les ensembles correspond le connecteur « et » ?",
    format: "qcm",
    choices: [
      "l'intersection $\\cap$",
      "la réunion $\\cup$",
      "le complémentaire",
      "l'inclusion $\\subset$",
    ],
    expected: ["l'intersection $\\cap$"],
    comparator: "mcq_exact",
    hint: "« $x \\in A$ et $x \\in B$ » : où se trouve $x$ ?",
    explanation: exp(
      "Chaque connecteur logique a son pendant ensembliste.",
      "Dire « $x \\in A$ ET $x \\in B$ » revient à dire que $x$ est dans la partie commune.",
      "C'est exactement la définition de $A \\cap B$. Le « ou », lui, correspond à la réunion.",
      "Le connecteur « et » correspond à l'intersection $\\cap$."
    ),
    tags: ["premiere", "maths", "logique", "connecteurs", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_con_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_connecteurs",
    difficulty: 4,
    theme: "neutral",
    text: "En mathématiques, la proposition « $x$ est positif OU $x$ est entier » est-elle vraie pour $x = 3$ ?",
    format: "qcm",
    choices: [
      "oui : le « ou » mathématique autorise les deux à la fois",
      "non : $x$ vérifie les deux conditions, pas une seule",
      "non : il faudrait choisir",
      "on ne peut pas savoir",
    ],
    expected: ["oui : le « ou » mathématique autorise les deux à la fois"],
    comparator: "mcq_exact",
    hint: "Ce n'est pas le « ou » de « fromage ou dessert ».",
    explanation: exp(
      "En mathématiques, « ou » est INCLUSIF : la proposition « P ou Q » est vraie dès qu'au moins l'une des deux l'est.",
      "Pour $x = 3$ : il est positif (vrai) et il est entier (vrai).",
      "Les deux étant vraies, « P ou Q » est vraie. Le langage courant emploie souvent un « ou » exclusif — au restaurant, fromage ou dessert, mais pas les deux — ce qui n'est pas le sens mathématique.",
      "Oui, la proposition est vraie."
    ),
    tags: ["premiere", "maths", "logique", "connecteurs", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_con_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_connecteurs",
    difficulty: 3,
    theme: "neutral",
    text: "L'équation $(x - 1)(x - 2) = 0$ se traduit par :",
    format: "qcm",
    choices: [
      "$x = 1$ OU $x = 2$",
      "$x = 1$ ET $x = 2$",
      "$x = 1$ seulement",
      "$x = -1$ ou $x = -2$",
    ],
    expected: ["$x = 1$ OU $x = 2$"],
    comparator: "mcq_exact",
    hint: "Un produit est nul quand l'un AU MOINS de ses facteurs est nul.",
    explanation: exp(
      "Un produit de facteurs est nul si et seulement si l'un au moins des facteurs est nul.",
      "Ici : $x - 1 = 0$ ou $x - 2 = 0$.",
      "Le connecteur est donc « ou ». Écrire « et » serait absurde : aucun nombre ne vaut à la fois $1$ et $2$.",
      "$x = 1$ ou $x = 2$."
    ),
    tags: ["premiere", "maths", "logique", "connecteurs", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_con_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_connecteurs",
    difficulty: 4,
    theme: "neutral",
    text: "Résoudre un SYSTÈME de deux équations, c'est chercher les valeurs qui vérifient :",
    format: "qcm",
    choices: [
      "la première ET la seconde équation",
      "la première OU la seconde équation",
      "au moins l'une des deux",
      "la première, puis éventuellement la seconde",
    ],
    expected: ["la première ET la seconde équation"],
    comparator: "mcq_exact",
    hint: "L'accolade d'un système se lit « et ».",
    explanation: exp(
      "Un système impose que toutes ses équations soient vérifiées simultanément.",
      "L'accolade se lit donc « et » : les solutions doivent satisfaire la première ET la seconde.",
      "Géométriquement, c'est l'INTERSECTION des deux droites, et non leur réunion.",
      "Il faut vérifier la première et la seconde équation."
    ),
    tags: ["premiere", "maths", "logique", "connecteurs", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_con_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_connecteurs",
    difficulty: 4,
    theme: "neutral",
    text: "Quel ensemble décrit la condition « $x \\ge 2$ ET $x \\le 5$ » ?",
    format: "qcm",
    choices: [
      "$[2 ; 5]$",
      "$]-\\infty ; 2] \\cup [5 ; +\\infty[$",
      "$\\mathbb{R}$",
      "$\\emptyset$",
    ],
    expected: ["$[2 ; 5]$"],
    comparator: "mcq_exact",
    hint: "Les deux conditions doivent être vraies en même temps.",
    explanation: exp(
      "Le « et » impose que les deux inégalités soient vérifiées simultanément : on prend l'intersection.",
      "$x \\ge 2$ donne $[2 ; +\\infty[$ et $x \\le 5$ donne $]-\\infty ; 5]$.",
      "Leur intersection est $[2 ; 5]$, ce qui s'écrit aussi $2 \\le x \\le 5$.",
      "L'ensemble est $[2 ; 5]$."
    ),
    tags: ["premiere", "maths", "logique", "connecteurs", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_con_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_connecteurs",
    difficulty: 5,
    theme: "neutral",
    text: "Quel ensemble décrit la condition « $x < 1$ OU $x > 3$ » ?",
    format: "qcm",
    choices: [
      "$]-\\infty ; 1[ \\cup ]3 ; +\\infty[$",
      "$]1 ; 3[$",
      "$\\mathbb{R}$",
      "$\\emptyset$",
    ],
    expected: ["$]-\\infty ; 1[ \\cup ]3 ; +\\infty[$"],
    comparator: "mcq_exact",
    hint: "Le « ou » réunit les deux morceaux.",
    explanation: exp(
      "Le « ou » correspond à la réunion : il suffit qu'une des deux conditions soit vraie.",
      "$x < 1$ donne $]-\\infty ; 1[$, et $x > 3$ donne $]3 ; +\\infty[$.",
      "L'ensemble est la réunion des deux morceaux — c'est typiquement ce qu'on obtient en résolvant une inéquation du second degré à l'extérieur des racines.",
      "L'ensemble est $]-\\infty ; 1[ \\cup ]3 ; +\\infty[$."
    ),
    tags: ["premiere", "maths", "logique", "connecteurs", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_con_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_connecteurs",
    difficulty: 4,
    theme: "neutral",
    text: "On cherche $x$ tel que $x^2 = 4$ ET $x > 0$. Combien vaut $x$ ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "$x^2 = 4$ donne deux candidats ; la seconde condition en élimine un.",
    explanation: exp(
      "Le « et » impose de garder uniquement les valeurs qui vérifient les DEUX conditions.",
      "$x^2 = 4$ donne $x = 2$ ou $x = -2$ ; la condition $x > 0$ élimine $-2$.",
      "Il reste $x = 2$.",
      "$x = 2$."
    ),
    tags: ["premiere", "maths", "logique", "connecteurs", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_log_con_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_connecteurs",
    difficulty: 5,
    theme: "neutral",
    text: "Un quotient $\\dfrac{A}{B}$ est nul lorsque :",
    format: "qcm",
    choices: [
      "$A = 0$ ET $B \\neq 0$",
      "$A = 0$ OU $B = 0$",
      "$A = 0$ ET $B = 0$",
      "$B = 0$ uniquement",
    ],
    expected: ["$A = 0$ ET $B \\neq 0$"],
    comparator: "mcq_exact",
    hint: "Que se passe-t-il si le dénominateur s'annule ?",
    explanation: exp(
      "Un quotient est nul quand son numérateur l'est — à condition que le quotient existe.",
      "Il faut donc $A = 0$, mais aussi $B \\neq 0$, sinon la division est impossible.",
      "Les deux conditions sont liées par « et ». C'est l'oubli classique : on résout $A = 0$ sans vérifier la valeur interdite.",
      "Le quotient est nul lorsque $A = 0$ et $B \\neq 0$."
    ),
    tags: ["premiere", "maths", "logique", "connecteurs", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_con_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_connecteurs",
    difficulty: 5,
    theme: "neutral",
    text: "La proposition « $x > 0$ ET $x < 0$ » décrit quel ensemble ?",
    format: "qcm",
    choices: ["$\\emptyset$", "$\\mathbb{R}$", "$\\{0\\}$", "$\\mathbb{R}^*$"],
    expected: ["$\\emptyset$"],
    comparator: "mcq_exact",
    hint: "Un nombre peut-il être à la fois strictement positif et strictement négatif ?",
    explanation: exp(
      "Le « et » exige que les deux conditions soient vraies pour le MÊME nombre.",
      "Aucun réel n'est à la fois strictement positif et strictement négatif.",
      "L'ensemble décrit est donc vide. Avec un « ou », on aurait obtenu $\\mathbb{R}^*$, tous les réels sauf $0$ : le connecteur change tout.",
      "L'ensemble est $\\emptyset$."
    ),
    tags: ["premiere", "maths", "logique", "connecteurs", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_con_fixed_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_connecteurs",
    difficulty: 3,
    theme: "neutral",
    text: "« $x \\in A$ ou $x \\in B$ » signifie que :",
    format: "qcm",
    choices: [
      "$x \\in A \\cup B$",
      "$x \\in A \\cap B$",
      "$x \\notin A$ et $x \\notin B$",
      "$A \\subset B$",
    ],
    expected: ["$x \\in A \\cup B$"],
    comparator: "mcq_exact",
    hint: "Le « ou » réunit.",
    explanation: exp(
      "Le connecteur « ou » se traduit par la réunion des ensembles.",
      "Un élément appartenant à $A$, à $B$, ou aux deux, appartient à $A \\cup B$.",
      "C'est la traduction symbolique directe de la phrase.",
      "Cela signifie $x \\in A \\cup B$."
    ),
    tags: ["premiere", "maths", "logique", "connecteurs", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_con_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_connecteurs",
    difficulty: 5,
    theme: "neutral",
    text: "Le trinôme $(x + 1)(x - 4)$ est nul pour combien de valeurs de $x$ ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Chaque facteur peut s'annuler de son côté.",
    explanation: exp(
      "Un produit est nul quand l'un au moins de ses facteurs est nul : le connecteur est « ou ».",
      "$x + 1 = 0$ donne $x = -1$ ; $x - 4 = 0$ donne $x = 4$.",
      "Ces deux valeurs conviennent, et elles sont distinctes : cela fait $2$ solutions.",
      "Le trinôme s'annule pour $2$ valeurs de $x$."
    ),
    tags: ["premiere", "maths", "logique", "connecteurs", "short"],
  },

  {
    kind: "fixed",
    id: "premiere_log_con_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_connecteurs",
    difficulty: 4,
    theme: "neutral",
    text: "Explique la différence entre le « ou » du langage courant et le « ou » des mathématiques.",
    format: "open",
    expected: ["inclusif", "exclusif", "les deux", "au moins"],
    comparator: "contains_keyword",
    hint: "« Fromage ou dessert » : peut-on prendre les deux ?",
    explanation: exp(
      "Le « ou » mathématique est INCLUSIF : « P ou Q » est vraie dès qu'au moins l'une des deux l'est, y compris si les deux le sont.",
      "Au restaurant, « fromage ou dessert » sous-entend qu'on choisit l'un OU l'autre, mais pas les deux : c'est un « ou » exclusif.",
      "En mathématiques, si $x = 3$, la proposition « $x$ est positif ou $x$ est entier » est vraie, bien que les deux conditions soient remplies.",
      "Le « ou » mathématique autorise les deux à la fois, contrairement à celui du langage courant."
    ),
    tags: ["premiere", "maths", "logique", "connecteurs", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_log_con_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_connecteurs",
    difficulty: 5,
    theme: "neutral",
    text: "Pourquoi un produit nul se traduit-il par un « ou », alors qu'un système d'équations se traduit par un « et » ?",
    format: "open",
    expected: ["un des facteurs", "en même temps", "les deux", "suffit"],
    comparator: "contains_keyword",
    hint: "Dans chaque cas, faut-il que les deux conditions soient vraies ensemble ?",
    explanation: exp(
      "Le connecteur dépend de ce qu'exige la situation.",
      "Un produit est nul dès qu'UN facteur l'est : il suffit que l'une des conditions soit remplie, d'où le « ou ». $(x-1)(x-2)=0$ donne $x = 1$ ou $x = 2$.",
      "Un système exige au contraire que TOUTES les équations soient vérifiées par les mêmes valeurs, en même temps : c'est un « et ».",
      "Le « ou » suffit d'un côté, le « et » exige tout de l'autre."
    ),
    tags: ["premiere", "maths", "logique", "connecteurs", "open"],
  },
  {
    kind: "template",
    id: "premiere_log_con_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_connecteurs",
    difficulty: 5,
    theme: "neutral",
    hint: "« et » donne une intersection (un seul morceau), « ou » donne une réunion (deux morceaux).",
    tags: ["premiere", "maths", "logique", "connecteurs", "template"],
    generate: () => {
      const a = randomInt(-4, 2);
      const b = a + randomInt(2, 5);
      const et = randomInt(0, 1) === 1;
      return {
        text: et
          ? `Quel ensemble décrit la condition « $x \\ge ${a}$ ET $x \\le ${b}$ » ?`
          : `Quel ensemble décrit la condition « $x < ${a}$ OU $x > ${b}$ » ?`,
        format: "qcm",
        choices: et
          ? [
              `$[${a} ; ${b}]$`,
              `$]-\\infty ; ${a}] \\cup [${b} ; +\\infty[$`,
              `$\\mathbb{R}$`,
              `$\\emptyset$`,
            ]
          : [
              `$]-\\infty ; ${a}[ \\cup ]${b} ; +\\infty[$`,
              `$]${a} ; ${b}[$`,
              `$\\mathbb{R}$`,
              `$\\emptyset$`,
            ],
        expected: et
          ? [`$[${a} ; ${b}]$`]
          : [`$]-\\infty ; ${a}[ \\cup ]${b} ; +\\infty[$`],
        comparator: "mcq_exact",
        explanation: exp(
          et
            ? "Le connecteur « et » impose que les deux conditions soient vraies en même temps : on prend l'intersection."
            : "Le connecteur « ou » demande qu'au moins une condition soit vraie : on prend la réunion.",
          et
            ? `Il faut $x \\ge ${a}$ ET $x \\le ${b}$ : les deux bornes encadrent $x$.`
            : `Il faut $x < ${a}$ OU $x > ${b}$ : deux morceaux séparés, de part et d'autre.`,
          et
            ? `L'ensemble est donc l'intervalle $[${a} ; ${b}]$.`
            : `L'ensemble est la réunion $]-\\infty ; ${a}[ \\cup ]${b} ; +\\infty[$.`,
          et
            ? `La condition décrit $[${a} ; ${b}]$.`
            : `La condition décrit $]-\\infty ; ${a}[ \\cup ]${b} ; +\\infty[$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "premiere_log_con_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_connecteurs",
    difficulty: 5,
    theme: "neutral",
    hint: "Dis quel connecteur est en jeu, puis traduis-le en ensemble.",
    tags: ["premiere", "maths", "logique", "connecteurs", "open", "template"],
    generate: () => {
      const cas = [
        {
          enonce: "$(x - 3)(x + 5) = 0$",
          mots: ["ou", "facteur", "produit", "nul"],
          reponse:
            "Un produit est nul dès qu'UN facteur l'est : le connecteur est « ou ». Donc $x = 3$ ou $x = -5$.",
        },
        {
          enonce: "le système $\\{ x + y = 5$ et $x - y = 1 \\}$",
          mots: ["et", "en même temps", "les deux", "intersection"],
          reponse:
            "Un système exige que les deux équations soient vérifiées EN MÊME TEMPS : le connecteur est « et ». La solution est le couple $(3 ; 2)$.",
        },
        {
          enonce: "$\\dfrac{x - 2}{x + 1} = 0$",
          mots: ["et", "dénominateur", "non nul", "numérateur"],
          reponse:
            "Un quotient est nul quand son numérateur l'est ET que son dénominateur ne l'est pas : $x = 2$ et $x \\neq -1$. Ici $x = 2$ convient.",
        },
        {
          enonce: "$x^2 = 9$ et $x < 0$",
          mots: ["et", "-3", "les deux", "élimine"],
          reponse:
            "Le « et » impose les deux conditions : $x^2 = 9$ donne $3$ ou $-3$, et $x < 0$ élimine $3$. Il reste $x = -3$.",
        },
      ];
      const c = pickOne(cas);
      return {
        text: `Pour « ${c.enonce} », quel connecteur logique est en jeu — « et » ou « ou » ? Explique, puis donne la conclusion.`,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: exp(
          "Le connecteur dépend de ce qu'exige la situation : « ou » quand une seule condition suffit, « et » quand toutes doivent être vraies ensemble.",
          "On identifie donc d'abord la structure de l'énoncé.",
          c.reponse,
          "Le connecteur choisi change complètement l'ensemble des solutions."
        ),
      };
    },
  },

  /* ===================== LOG_CONTRE_EXEMPLE ===================== */
  {
    kind: "fixed",
    id: "premiere_log_ctr_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_contre_exemple",
    difficulty: 2,
    theme: "neutral",
    text: "À quoi sert un contre-exemple ?",
    format: "qcm",
    choices: [
      "à montrer qu'une proposition est FAUSSE",
      "à démontrer qu'une proposition est vraie",
      "à illustrer une proposition vraie",
      "à vérifier un calcul",
    ],
    expected: ["à montrer qu'une proposition est FAUSSE"],
    comparator: "mcq_exact",
    hint: "Il va CONTRE la proposition.",
    explanation: exp(
      "Un contre-exemple est un cas particulier qui vérifie les hypothèses mais pas la conclusion.",
      "Il suffit à établir qu'une proposition générale (« pour tout… ») est fausse.",
      "Il ne peut jamais servir à démontrer qu'une proposition est vraie : pour cela, il faut un raisonnement valable dans TOUS les cas.",
      "Un contre-exemple sert à montrer qu'une proposition est fausse."
    ),
    tags: ["premiere", "maths", "logique", "contre_exemple", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_ctr_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_contre_exemple",
    difficulty: 3,
    theme: "neutral",
    text: "Combien de contre-exemples faut-il pour réfuter une proposition ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Un seul cas qui résiste suffit-il à faire tomber un « pour tout » ?",
    explanation: exp(
      "Une proposition universelle affirme quelque chose pour TOUS les cas.",
      "Il suffit donc d'un seul cas où elle échoue pour qu'elle soit fausse.",
      "Un unique contre-exemple suffit — inutile d'en chercher d'autres une fois qu'on en tient un.",
      "Un seul contre-exemple suffit."
    ),
    tags: ["premiere", "maths", "logique", "contre_exemple", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_log_ctr_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_contre_exemple",
    difficulty: 3,
    theme: "neutral",
    text: "Quel nombre est un contre-exemple à « tout nombre premier est impair » ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Cherche un nombre premier qui soit pair.",
    explanation: exp(
      "Un contre-exemple doit vérifier l'hypothèse (être premier) sans vérifier la conclusion (être impair).",
      "$2$ est premier — il n'a que deux diviseurs, $1$ et lui-même — et il est pair.",
      "C'est le seul contre-exemple possible : tous les autres nombres premiers sont impairs.",
      "Le contre-exemple est $2$."
    ),
    tags: ["premiere", "maths", "logique", "contre_exemple", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_log_ctr_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_contre_exemple",
    difficulty: 5,
    theme: "neutral",
    text: "Quel contre-exemple réfute « pour tout réel $x$, $x^2 > x$ » ?",
    format: "qcm",
    choices: [
      "$x = 0{,}5$, car $0{,}25 < 0{,}5$",
      "$x = 3$, car $9 > 3$",
      "$x = -2$, car $4 > -2$",
      "aucun : la proposition est vraie",
    ],
    expected: ["$x = 0{,}5$, car $0{,}25 < 0{,}5$"],
    comparator: "mcq_exact",
    hint: "Que se passe-t-il pour un nombre compris entre $0$ et $1$ ?",
    explanation: exp(
      "Il faut exhiber un réel pour lequel $x^2$ n'est PAS strictement supérieur à $x$.",
      "Pour $x = 0{,}5$ : $x^2 = 0{,}25$, et $0{,}25 < 0{,}5$. La conclusion tombe.",
      "$x = 3$ et $x = -2$ vérifient l'inégalité : ce sont des exemples, pas des contre-exemples. Entre $0$ et $1$, élever au carré fait diminuer.",
      "Le contre-exemple est $x = 0{,}5$."
    ),
    tags: ["premiere", "maths", "logique", "contre_exemple", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_ctr_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_contre_exemple",
    difficulty: 4,
    theme: "neutral",
    text: "Quel contre-exemple réfute « $(a + b)^2 = a^2 + b^2$ pour tous réels $a$ et $b$ » ?",
    format: "qcm",
    choices: [
      "$a = b = 1$, car $4 \\neq 2$",
      "$a = 1$ et $b = 0$, car $1 = 1$",
      "$a = b = 0$, car $0 = 0$",
      "aucun : l'égalité est vraie",
    ],
    expected: ["$a = b = 1$, car $4 \\neq 2$"],
    comparator: "mcq_exact",
    hint: "Il faut un cas où les deux membres diffèrent.",
    explanation: exp(
      "Un contre-exemple doit rendre l'égalité FAUSSE.",
      "Pour $a = b = 1$ : $(1 + 1)^2 = 4$, tandis que $1^2 + 1^2 = 2$. Les deux membres diffèrent.",
      "Les cas $a = b = 0$ ou $b = 0$ donnent une égalité vraie : ils ne prouvent rien. La bonne identité est $(a+b)^2 = a^2 + 2ab + b^2$ : le double produit manquait.",
      "Le contre-exemple est $a = b = 1$."
    ),
    tags: ["premiere", "maths", "logique", "contre_exemple", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_ctr_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_contre_exemple",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève vérifie une formule sur trois exemples et conclut qu'elle est vraie. Qu'en penser ?",
    format: "qcm",
    choices: [
      "des exemples ne démontrent rien : il faut une preuve générale",
      "trois exemples suffisent",
      "il en faudrait dix",
      "c'est correct si les exemples sont bien choisis",
    ],
    expected: ["des exemples ne démontrent rien : il faut une preuve générale"],
    comparator: "mcq_exact",
    hint: "Un contre-exemple réfute ; un exemple, lui, ne prouve pas.",
    explanation: exp(
      "Une proposition universelle porte sur une infinité de cas.",
      "Vérifier trois cas ne dit rien des autres : la formule pourrait tomber au quatrième.",
      "La dissymétrie est fondamentale : UN contre-exemple suffit à réfuter, mais aucun nombre fini d'exemples ne suffit à démontrer.",
      "Il faut une démonstration valable dans tous les cas."
    ),
    tags: ["premiere", "maths", "logique", "contre_exemple", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_ctr_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_contre_exemple",
    difficulty: 4,
    theme: "neutral",
    text: "Donne un contre-exemple à « si $n$ est pair, alors $n$ est divisible par $4$ ».",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Cherche un nombre pair qui ne soit pas dans la table de $4$.",
    explanation: exp(
      "Il faut un entier qui vérifie l'hypothèse (être pair) sans vérifier la conclusion (être divisible par $4$).",
      "$6$ est pair, mais $6 \\div 4 = 1{,}5$ n'est pas entier.",
      "$6$ convient donc ($2$ et $10$ marcheraient aussi). Attention : $8$ serait un exemple, pas un contre-exemple.",
      "Un contre-exemple est $n = 6$."
    ),
    tags: ["premiere", "maths", "logique", "contre_exemple", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_log_ctr_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_contre_exemple",
    difficulty: 5,
    theme: "neutral",
    text: "Quel contre-exemple réfute « $\\sqrt{a^2} = a$ pour tout réel $a$ » ?",
    format: "qcm",
    choices: [
      "$a = -3$, car $\\sqrt{9} = 3 \\neq -3$",
      "$a = 3$, car $\\sqrt{9} = 3$",
      "$a = 0$, car $\\sqrt{0} = 0$",
      "aucun : l'égalité est vraie",
    ],
    expected: ["$a = -3$, car $\\sqrt{9} = 3 \\neq -3$"],
    comparator: "mcq_exact",
    hint: "Une racine carrée est toujours positive.",
    explanation: exp(
      "Il faut un réel pour lequel $\\sqrt{a^2}$ diffère de $a$.",
      "Pour $a = -3$ : $a^2 = 9$ et $\\sqrt{9} = 3$, alors que $a = -3$.",
      "L'égalité échoue pour tous les négatifs. La formule correcte est $\\sqrt{a^2} = |a|$.",
      "Le contre-exemple est $a = -3$."
    ),
    tags: ["premiere", "maths", "logique", "contre_exemple", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_ctr_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_contre_exemple",
    difficulty: 3,
    theme: "neutral",
    text: "Donne un contre-exemple à « tous les multiples de $3$ sont impairs ».",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Cherche un multiple de $3$ qui soit pair.",
    explanation: exp(
      "Il faut un nombre qui vérifie l'hypothèse (être multiple de $3$) sans la conclusion (être impair).",
      "$6 = 3 \\times 2$ est bien un multiple de $3$, et il est pair.",
      "$6$ convient ($12$, $18$… aussi). Les multiples de $3$ alternent en réalité entre pairs et impairs.",
      "Un contre-exemple est $6$."
    ),
    tags: ["premiere", "maths", "logique", "contre_exemple", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_log_ctr_fixed_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_contre_exemple",
    difficulty: 5,
    theme: "neutral",
    text: "Quel contre-exemple réfute « toute fonction croissante sur $\\mathbb{R}$ est positive » ?",
    format: "qcm",
    choices: [
      "$f(x) = x$, qui est croissante mais négative pour $x < 0$",
      "$f(x) = x^2$, qui n'est pas croissante sur $\\mathbb{R}$",
      "$f(x) = -x$, qui est décroissante",
      "aucun : la proposition est vraie",
    ],
    expected: ["$f(x) = x$, qui est croissante mais négative pour $x < 0$"],
    comparator: "mcq_exact",
    hint: "Le contre-exemple doit être croissant : sinon il ne vérifie pas l'hypothèse.",
    explanation: exp(
      "Un contre-exemple doit vérifier l'HYPOTHÈSE (être croissante) et pas la conclusion (être positive).",
      "$f(x) = x$ est croissante sur $\\mathbb{R}$, et pourtant $f(-2) = -2 < 0$.",
      "$x^2$ et $-x$ ne conviennent pas : elles ne sont pas croissantes sur $\\mathbb{R}$, donc elles ne vérifient même pas l'hypothèse. Croissance et signe sont deux propriétés indépendantes.",
      "Le contre-exemple est $f(x) = x$."
    ),
    tags: ["premiere", "maths", "logique", "contre_exemple", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_ctr_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_contre_exemple",
    difficulty: 4,
    theme: "neutral",
    text: "Que peut-on conclure si l'on trouve un contre-exemple à une proposition ?",
    format: "qcm",
    choices: [
      "la proposition est fausse, définitivement",
      "la proposition est fausse dans ce cas, mais peut rester vraie ailleurs",
      "il faut chercher d'autres contre-exemples",
      "la proposition est probablement fausse",
    ],
    expected: ["la proposition est fausse, définitivement"],
    comparator: "mcq_exact",
    hint: "Une proposition universelle est vraie ou fausse, sans « à moitié ».",
    explanation: exp(
      "Une proposition qui affirme quelque chose pour tous les cas est fausse dès qu'un seul cas la met en défaut.",
      "Le contre-exemple règle donc la question définitivement : inutile d'en chercher un deuxième.",
      "On peut ensuite se demander si la proposition redevient vraie en RESTREIGNANT les hypothèses — c'est souvent ainsi qu'on trouve le bon énoncé.",
      "La proposition est fausse, définitivement."
    ),
    tags: ["premiere", "maths", "logique", "contre_exemple", "qcm"],
  },

  {
    kind: "fixed",
    id: "premiere_log_ctr_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_contre_exemple",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi un seul contre-exemple suffit à réfuter une proposition, alors que des exemples ne la démontrent jamais.",
    format: "open",
    expected: ["tous les cas", "une exception", "infinité", "suffit"],
    comparator: "contains_keyword",
    hint: "Que faut-il vérifier pour qu'un « pour tout » soit vrai ? Et pour qu'il soit faux ?",
    explanation: exp(
      "Une proposition universelle affirme quelque chose pour TOUS les cas, souvent en nombre infini.",
      "Pour la réfuter, il suffit d'une seule exception : dès qu'un cas échoue, le « tous » est faux.",
      "Pour la démontrer, il faudrait vérifier tous les cas — impossible s'ils sont infinis. Seul un raisonnement général le permet.",
      "Réfuter demande un cas, démontrer les demande tous."
    ),
    tags: ["premiere", "maths", "logique", "contre_exemple", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_log_ctr_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_contre_exemple",
    difficulty: 5,
    theme: "neutral",
    text: "Trouve un contre-exemple à « pour tout réel $x$, $x^3 > x$ » et explique pourquoi il convient.",
    format: "open",
    expected: ["-2", "0,5", "contre-exemple", "négatif"],
    comparator: "contains_keyword",
    hint: "Essaie un nombre négatif, ou un nombre entre $0$ et $1$.",
    explanation: exp(
      "Il faut un réel pour lequel $x^3$ n'est PAS strictement supérieur à $x$.",
      "Avec $x = -2$ : $x^3 = -8$, et $-8 < -2$. La conclusion tombe.",
      "Avec $x = 0{,}5$ : $x^3 = 0{,}125 < 0{,}5$ : cela convient aussi. La proposition n'est vraie que pour $x > 1$.",
      "$x = -2$ (ou $x = 0{,}5$) est un contre-exemple."
    ),
    tags: ["premiere", "maths", "logique", "contre_exemple", "open"],
  },
  {
    kind: "template",
    id: "premiere_log_ctr_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_contre_exemple",
    difficulty: 5,
    theme: "neutral",
    hint: "Le contre-exemple doit vérifier l'hypothèse SANS vérifier la conclusion.",
    tags: ["premiere", "maths", "logique", "contre_exemple", "template"],
    generate: () => {
      const cas = [
        {
          prop: "tout nombre divisible par $2$ est divisible par $6$",
          bon: "$8$",
          faux: ["$12$", "$6$", "$24$"],
          pourquoi: "$8$ est bien divisible par $2$, mais pas par $6$",
        },
        {
          prop: "pour tout réel $x$, $\\sqrt{x^2} = x$",
          bon: "$x = -4$",
          faux: ["$x = 4$", "$x = 0$", "$x = 1$"],
          pourquoi: "$\\sqrt{(-4)^2} = 4$, ce qui n'est pas égal à $-4$",
        },
        {
          prop: "tout quadrilatère ayant quatre côtés égaux est un carré",
          bon: "un losange aplati",
          faux: ["un carré de côté $3$", "un rectangle", "un trapèze"],
          pourquoi: "il a bien quatre côtés égaux, mais pas d'angle droit",
        },
        {
          prop: "pour tout réel $x$, $x^2 \\ge x$",
          bon: "$x = 0{,}5$",
          faux: ["$x = 2$", "$x = -1$", "$x = 0$"],
          pourquoi: "$0{,}5^2 = 0{,}25$, qui est inférieur à $0{,}5$",
        },
        {
          prop: "tout nombre premier est impair",
          bon: "$2$",
          faux: ["$9$", "$7$", "$15$"],
          pourquoi: "$2$ est premier et pourtant pair",
        },
      ];
      const c = pickOne(cas);
      return {
        text: `Quel est un contre-exemple à « ${c.prop} » ?`,
        format: "qcm",
        choices: [c.bon, ...c.faux],
        expected: [c.bon],
        comparator: "mcq_exact",
        explanation: exp(
          "Un contre-exemple doit vérifier l'hypothèse tout en mettant la conclusion en défaut.",
          "On teste les propositions : celles qui vérifient la conclusion sont des exemples, pas des contre-exemples.",
          `Ici : ${c.pourquoi}.`,
          `Le contre-exemple est ${c.bon}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "premiere_log_ctr_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_contre_exemple",
    difficulty: 5,
    theme: "neutral",
    hint: "Donne une valeur précise, puis montre par le calcul qu'elle met la proposition en défaut.",
    tags: ["premiere", "maths", "logique", "contre_exemple", "open", "template"],
    generate: () => {
      const cas = [
        {
          prop: "pour tout réel $x$, $x^2 > x$",
          mots: ["0,5", "0,25", "entre 0 et 1", "contre-exemple"],
          preuve: "Pour $x = 0{,}5$ : $x^2 = 0{,}25$, or $0{,}25 < 0{,}5$.",
        },
        {
          prop: "tout nombre pair est divisible par $4$",
          mots: ["6", "contre-exemple", "pair", "1,5"],
          preuve: "$6$ est pair, mais $6 \\div 4 = 1{,}5$ n'est pas entier.",
        },
        {
          prop: "pour tout réel $a$, $\\sqrt{a^2} = a$",
          mots: ["-3", "valeur absolue", "contre-exemple", "positif"],
          preuve:
            "Pour $a = -3$ : $\\sqrt{(-3)^2} = \\sqrt{9} = 3$, qui n'est pas égal à $-3$. La formule correcte est $\\sqrt{a^2} = |a|$.",
        },
        {
          prop: "toute fonction croissante est positive",
          mots: ["x", "négative", "contre-exemple", "croissante"],
          preuve:
            "La fonction $f(x) = x$ est croissante sur $\\mathbb{R}$, pourtant $f(-2) = -2 < 0$.",
        },
        {
          prop: "tout nombre premier est impair",
          mots: ["2", "pair", "premier", "contre-exemple"],
          preuve: "$2$ est premier — ses seuls diviseurs sont $1$ et $2$ — et il est pair.",
        },
      ];
      const c = pickOne(cas);
      return {
        text: `Trouve un contre-exemple à « ${c.prop} » et explique pourquoi il convient.`,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: exp(
          "Un contre-exemple doit vérifier l'hypothèse tout en mettant la conclusion en défaut ; un seul suffit.",
          "On cherche donc une valeur particulière, puis on montre par le calcul qu'elle contredit l'énoncé.",
          c.preuve,
          "La proposition est donc fausse : un seul cas suffit à la réfuter définitivement."
        ),
      };
    },
  },

  /* ===================== LOG_IMPLICATION ===================== */
  {
    kind: "fixed",
    id: "premiere_log_imp_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_implication",
    difficulty: 2,
    theme: "neutral",
    text: "Comment se lit l'écriture $P \\Rightarrow Q$ ?",
    format: "qcm",
    choices: [
      "« si $P$ est vraie, alors $Q$ est vraie »",
      "« $P$ est égale à $Q$ »",
      "« $Q$ entraîne $P$ »",
      "« $P$ et $Q$ sont vraies »",
    ],
    expected: ["« si $P$ est vraie, alors $Q$ est vraie »"],
    comparator: "mcq_exact",
    hint: "La flèche va de l'hypothèse vers la conclusion.",
    explanation: exp(
      "Une implication relie une hypothèse à une conclusion.",
      "$P \\Rightarrow Q$ se lit « $P$ implique $Q$ », ou « si $P$ alors $Q$ ».",
      "Le sens de la flèche compte : $Q \\Rightarrow P$ est une autre affirmation, la réciproque.",
      "$P \\Rightarrow Q$ se lit « si $P$ est vraie, alors $Q$ est vraie »."
    ),
    tags: ["premiere", "maths", "logique", "implication", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_imp_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_implication",
    difficulty: 3,
    theme: "neutral",
    text: "L'implication « si $x = 2$ alors $x^2 = 4$ » est-elle vraie ?",
    format: "qcm",
    choices: [
      "oui : si $x$ vaut $2$, son carré vaut nécessairement $4$",
      "non : $x$ pourrait valoir $-2$",
      "non : $x^2 = 4$ a deux solutions",
      "on ne peut pas savoir",
    ],
    expected: ["oui : si $x$ vaut $2$, son carré vaut nécessairement $4$"],
    comparator: "mcq_exact",
    hint: "On part de l'hypothèse $x = 2$ et on calcule.",
    explanation: exp(
      "Pour juger une implication, on suppose l'hypothèse vraie et on regarde si la conclusion suit.",
      "Si $x = 2$, alors $x^2 = 2^2 = 4$ : la conclusion est atteinte, sans exception.",
      "Le fait que $x^2 = 4$ ait une AUTRE solution ne concerne pas cette implication : il concerne sa réciproque.",
      "Oui, cette implication est vraie."
    ),
    tags: ["premiere", "maths", "logique", "implication", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_imp_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_implication",
    difficulty: 4,
    theme: "neutral",
    text: "L'implication « si $x^2 = 4$ alors $x = 2$ » est-elle vraie ?",
    format: "qcm",
    choices: [
      "non : $x = -2$ est un contre-exemple",
      "oui : $2^2 = 4$",
      "oui : les deux propositions sont équivalentes",
      "on ne peut pas savoir",
    ],
    expected: ["non : $x = -2$ est un contre-exemple"],
    comparator: "mcq_exact",
    hint: "Cherche un nombre dont le carré vaut $4$ sans être $2$.",
    explanation: exp(
      "Pour réfuter une implication, il faut un cas où l'hypothèse est vraie et la conclusion fausse.",
      "$x = -2$ vérifie $x^2 = 4$, mais $x \\neq 2$.",
      "L'implication est donc fausse — alors que celle du sens inverse est vraie. C'est le piège classique quand on résout une équation en élevant au carré.",
      "Non : $x = -2$ est un contre-exemple."
    ),
    tags: ["premiere", "maths", "logique", "implication", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_imp_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_implication",
    difficulty: 3,
    theme: "neutral",
    text: "Dans « si $P$ alors $Q$ », comment appelle-t-on $P$ et $Q$ ?",
    format: "qcm",
    choices: [
      "$P$ est l'hypothèse, $Q$ la conclusion",
      "$P$ est la conclusion, $Q$ l'hypothèse",
      "les deux sont des hypothèses",
      "les deux sont des conclusions",
    ],
    expected: ["$P$ est l'hypothèse, $Q$ la conclusion"],
    comparator: "mcq_exact",
    hint: "On part de ce qui est supposé pour arriver à ce qu'on veut établir.",
    explanation: exp(
      "Une implication décrit un raisonnement : on part d'un point de départ pour aboutir à un résultat.",
      "$P$, ce qu'on suppose, est l'hypothèse ; $Q$, ce qu'on obtient, est la conclusion.",
      "Dans un théorème, l'hypothèse est ce qu'il faut vérifier AVANT d'avoir le droit d'appliquer le résultat.",
      "$P$ est l'hypothèse, $Q$ la conclusion."
    ),
    tags: ["premiere", "maths", "logique", "implication", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_imp_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_implication",
    difficulty: 3,
    theme: "neutral",
    text: "L'implication « si $n$ est divisible par $4$, alors $n$ est pair » est-elle vraie ?",
    format: "qcm",
    choices: [
      "oui : un multiple de $4$ est toujours pair",
      "non : $n$ pourrait être impair",
      "oui, seulement si $n$ est positif",
      "non : c'est la réciproque qui est vraie",
    ],
    expected: ["oui : un multiple de $4$ est toujours pair"],
    comparator: "mcq_exact",
    hint: "Si $n = 4k$, peut-on écrire $n$ comme le double d'un entier ?",
    explanation: exp(
      "On suppose l'hypothèse vraie et on cherche à en déduire la conclusion.",
      "Si $n$ est divisible par $4$, il s'écrit $n = 4k$ avec $k$ entier, donc $n = 2 \\times (2k)$.",
      "$n$ est bien le double d'un entier : il est pair. La réciproque, elle, est fausse ($6$ est pair sans être multiple de $4$).",
      "Oui, l'implication est vraie."
    ),
    tags: ["premiere", "maths", "logique", "implication", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_imp_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_implication",
    difficulty: 3,
    theme: "neutral",
    text: "L'implication « si $ABCD$ est un carré, alors $ABCD$ est un rectangle » est-elle vraie ?",
    format: "qcm",
    choices: [
      "oui : un carré a bien quatre angles droits",
      "non : un carré n'est pas un rectangle",
      "oui, mais seulement si les côtés sont égaux",
      "non : c'est la réciproque qui est vraie",
    ],
    expected: ["oui : un carré a bien quatre angles droits"],
    comparator: "mcq_exact",
    hint: "Quelle est la définition d'un rectangle ?",
    explanation: exp(
      "Un rectangle est un quadrilatère ayant quatre angles droits.",
      "Un carré possède quatre angles droits — et en plus quatre côtés égaux.",
      "Tout carré est donc un rectangle : l'implication est vraie. Sa réciproque est fausse, un rectangle n'ayant pas forcément ses côtés égaux.",
      "Oui, l'implication est vraie."
    ),
    tags: ["premiere", "maths", "logique", "implication", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_imp_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_implication",
    difficulty: 4,
    theme: "neutral",
    text: "Comment montre-t-on qu'une implication est FAUSSE ?",
    format: "qcm",
    choices: [
      "en exhibant un cas où l'hypothèse est vraie et la conclusion fausse",
      "en exhibant un cas où l'hypothèse est fausse",
      "en vérifiant qu'elle échoue sur plusieurs exemples",
      "en démontrant sa réciproque",
    ],
    expected: [
      "en exhibant un cas où l'hypothèse est vraie et la conclusion fausse",
    ],
    comparator: "mcq_exact",
    hint: "Le contre-exemple doit d'abord VÉRIFIER l'hypothèse.",
    explanation: exp(
      "Une implication affirme que la conclusion suit toujours, dès que l'hypothèse est remplie.",
      "Pour la réfuter, il faut donc un cas qui remplit l'hypothèse mais rate la conclusion.",
      "Un cas où l'hypothèse est fausse ne prouve rien : l'implication ne dit rien de ces cas-là.",
      "On exhibe un cas où l'hypothèse est vraie et la conclusion fausse."
    ),
    tags: ["premiere", "maths", "logique", "implication", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_imp_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_implication",
    difficulty: 5,
    theme: "neutral",
    text: "On sait que $P \\Rightarrow Q$ et $Q \\Rightarrow R$. Que peut-on en déduire ?",
    format: "qcm",
    choices: [
      "$P \\Rightarrow R$",
      "$R \\Rightarrow P$",
      "$P \\Leftrightarrow R$",
      "rien du tout",
    ],
    expected: ["$P \\Rightarrow R$"],
    comparator: "mcq_exact",
    hint: "On enchaîne les deux raisonnements l'un après l'autre.",
    explanation: exp(
      "Les implications s'enchaînent : c'est ce qui permet de mener un raisonnement en plusieurs étapes.",
      "Si $P$ est vraie, alors $Q$ l'est ; et si $Q$ est vraie, alors $R$ l'est.",
      "Donc $P$ entraîne $R$. En revanche, rien ne permet d'affirmer la réciproque ni l'équivalence.",
      "On en déduit $P \\Rightarrow R$."
    ),
    tags: ["premiere", "maths", "logique", "implication", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_imp_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_implication",
    difficulty: 4,
    theme: "neutral",
    text: "L'implication « si $x > 3$ alors $x > 0$ » est-elle vraie ?",
    format: "qcm",
    choices: [
      "oui : tout nombre supérieur à $3$ est supérieur à $0$",
      "non : $x$ pourrait être négatif",
      "non : $3 > 0$ n'a rien à voir",
      "oui, seulement si $x$ est entier",
    ],
    expected: ["oui : tout nombre supérieur à $3$ est supérieur à $0$"],
    comparator: "mcq_exact",
    hint: "Place $0$ et $3$ sur une droite graduée.",
    explanation: exp(
      "On suppose $x > 3$ et on cherche à en déduire $x > 0$.",
      "Comme $3 > 0$, tout nombre plus grand que $3$ est a fortiori plus grand que $0$.",
      "L'implication est vraie. Sa réciproque est fausse : $x = 1$ est positif sans dépasser $3$.",
      "Oui, l'implication est vraie."
    ),
    tags: ["premiere", "maths", "logique", "implication", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_imp_fixed_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_implication",
    difficulty: 4,
    theme: "neutral",
    text: "En termes d'ensembles, que signifie « $x \\in A \\Rightarrow x \\in B$ » ?",
    format: "qcm",
    choices: ["$A \\subset B$", "$B \\subset A$", "$A = B$", "$A \\cap B = \\emptyset$"],
    expected: ["$A \\subset B$"],
    comparator: "mcq_exact",
    hint: "Tout élément de $A$ se retrouve dans $B$.",
    explanation: exp(
      "Une implication entre appartenances se traduit par une inclusion.",
      "Dire que tout élément de $A$ est aussi dans $B$, c'est exactement dire que $A$ est inclus dans $B$.",
      "L'inclusion est donc la version ensembliste de l'implication — et l'égalité $A = B$ correspond à l'équivalence.",
      "Cela signifie $A \\subset B$."
    ),
    tags: ["premiere", "maths", "logique", "implication", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_imp_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_implication",
    difficulty: 5,
    theme: "neutral",
    text: "L'implication « si $\\Delta > 0$, alors le trinôme a deux racines distinctes » est-elle vraie ?",
    format: "qcm",
    choices: [
      "oui, et sa réciproque l'est aussi",
      "oui, mais sa réciproque est fausse",
      "non : $\\Delta$ pourrait être nul",
      "non : il faut aussi que $a > 0$",
    ],
    expected: ["oui, et sa réciproque l'est aussi"],
    comparator: "mcq_exact",
    hint: "Un trinôme peut-il avoir deux racines distinctes avec $\\Delta \\le 0$ ?",
    explanation: exp(
      "Le signe du discriminant détermine entièrement le nombre de racines réelles.",
      "Si $\\Delta > 0$, les deux racines $\\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}$ existent et diffèrent : l'implication est vraie.",
      "Réciproquement, deux racines distinctes obligent $\\sqrt{\\Delta}$ à être non nul, donc $\\Delta > 0$. Les deux sens sont vrais : c'est une équivalence.",
      "Oui, et sa réciproque l'est aussi."
    ),
    tags: ["premiere", "maths", "logique", "implication", "qcm"],
  },
  {
    kind: "template",
    id: "premiere_log_imp_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_implication",
    difficulty: 4,
    theme: "neutral",
    hint: "Suppose l'hypothèse vraie : la conclusion suit-elle TOUJOURS ?",
    tags: ["premiere", "maths", "logique", "implication", "template"],
    generate: () => {
      const cas = [
        {
          p: "$n$ est divisible par $6$",
          q: "$n$ est divisible par $3$",
          vraie: true,
          pourquoi: "si $n = 6k$ alors $n = 3 \\times (2k)$ : c'est bien un multiple de $3$",
        },
        {
          p: "$n$ est divisible par $3$",
          q: "$n$ est divisible par $6$",
          vraie: false,
          pourquoi: "$9$ est divisible par $3$ mais pas par $6$",
        },
        {
          p: "$x > 5$",
          q: "$x > 1$",
          vraie: true,
          pourquoi: "tout nombre dépassant $5$ dépasse aussi $1$",
        },
        {
          p: "$x^2 > 0$",
          q: "$x > 0$",
          vraie: false,
          pourquoi: "$x = -3$ donne $x^2 = 9 > 0$ alors que $x < 0$",
        },
        {
          p: "$ABCD$ est un losange",
          q: "$ABCD$ a quatre côtés égaux",
          vraie: true,
          pourquoi: "c'est la définition même du losange",
        },
        {
          p: "$ABCD$ a quatre côtés égaux",
          q: "$ABCD$ est un carré",
          vraie: false,
          pourquoi: "un losange aplati a quatre côtés égaux sans angle droit",
        },
      ];
      const c = pickOne(cas);
      return {
        text: `L'implication « si ${c.p}, alors ${c.q} » est-elle vraie ?`,
        format: "qcm",
        choices: c.vraie
          ? ["oui, toujours", "non, il existe un contre-exemple", "seulement si $n$ est positif", "on ne peut pas savoir"]
          : ["non, il existe un contre-exemple", "oui, toujours", "oui, par définition", "on ne peut pas savoir"],
        expected: [c.vraie ? "oui, toujours" : "non, il existe un contre-exemple"],
        comparator: "mcq_exact",
        explanation: exp(
          "Une implication est vraie lorsque la conclusion suit dans TOUS les cas où l'hypothèse est vérifiée ; elle est fausse dès qu'un seul contre-exemple existe.",
          "On suppose l'hypothèse vraie et on cherche soit une démonstration, soit un contre-exemple.",
          `Ici : ${c.pourquoi}.`,
          c.vraie ? "L'implication est vraie." : "L'implication est fausse."
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_log_imp_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_implication",
    difficulty: 5,
    theme: "neutral",
    hint: "Commence par « Si… alors… », puis justifie par une propriété ou un contre-exemple.",
    tags: ["premiere", "maths", "logique", "implication", "open", "template"],
    generate: () => {
      const cas = [
        {
          enonce: "tout multiple de $4$ est pair",
          mots: ["multiple", "pair", "2k", "double"],
          preuve:
            "Si $n$ est multiple de $4$, alors $n = 4k$, donc $n = 2 \\times (2k)$ : $n$ est le double d'un entier, donc pair.",
        },
        {
          enonce: "tout carré est un rectangle",
          mots: ["angle", "droit", "définition", "rectangle"],
          preuve:
            "Si $ABCD$ est un carré, il a quatre angles droits ; c'est la définition d'un rectangle. Donc tout carré est un rectangle.",
        },
        {
          enonce: "si $x > 4$ alors $x^2 > 16$",
          mots: ["croissante", "carré", "positif", "16"],
          preuve:
            "Si $x > 4$, alors $x$ est positif, et la fonction carré est croissante sur $[0 ; +\\infty[$ : $x^2 > 4^2 = 16$.",
        },
        {
          enonce: "si un trinôme a un discriminant nul, il admet une racine double",
          mots: ["discriminant", "racine", "double", "canonique"],
          preuve:
            "Si $\\Delta = 0$, la formule $\\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}$ donne deux fois la même valeur $\\dfrac{-b}{2a}$ : la racine est double.",
        },
      ];
      const c = pickOne(cas);
      return {
        text: `Écris cette affirmation sous la forme « si … alors … », puis explique pourquoi elle est vraie : ${c.enonce}.`,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: exp(
          "Une implication s'écrit « si (hypothèse) alors (conclusion) » ; la justifier demande un raisonnement valable dans tous les cas, pas un exemple.",
          "On repère d'abord ce qui est supposé, puis ce qu'on doit en déduire.",
          c.preuve,
          "L'affirmation est vraie, et la démonstration vaut pour tous les cas concernés."
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "premiere_log_imp_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_implication",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève affirme que « si $x > 5$ alors $x > 2$ » est fausse, parce que $x = 1$ ne vérifie pas $x > 5$. Explique son erreur.",
    format: "open",
    expected: ["hypothèse", "ne dit rien", "contre-exemple", "vérifie"],
    comparator: "contains_keyword",
    hint: "Que faut-il pour qu'un cas serve de contre-exemple à une implication ?",
    explanation: exp(
      "Une implication n'affirme quelque chose que dans les cas où l'hypothèse est vraie.",
      "Avec $x = 1$, l'hypothèse $x > 5$ est fausse : l'implication ne dit rien de ce cas, il ne peut donc pas la contredire.",
      "Pour un contre-exemple, il faudrait un $x$ qui vérifie $x > 5$ SANS vérifier $x > 2$ — impossible ici. L'implication est bien vraie.",
      "Son erreur : il choisit un cas où l'hypothèse n'est pas remplie."
    ),
    tags: ["premiere", "maths", "logique", "implication", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_log_imp_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_implication",
    difficulty: 5,
    theme: "neutral",
    text: "Donne un exemple d'implication vraie dont la réciproque est fausse, et justifie les deux sens.",
    format: "open",
    expected: ["réciproque", "contre-exemple", "fausse", "carré"],
    comparator: "contains_keyword",
    hint: "Les figures géométriques et la divisibilité en fournissent beaucoup.",
    explanation: exp(
      "Une implication et sa réciproque se démontrent séparément : l'une peut tenir sans l'autre.",
      "Exemple : « si $ABCD$ est un carré, alors c'est un rectangle » est vraie, car un carré a quatre angles droits.",
      "Sa réciproque « si $ABCD$ est un rectangle, alors c'est un carré » est fausse : un rectangle de $3$ sur $5$ est un contre-exemple. On pourrait aussi prendre « $n$ multiple de $4$ $\\Rightarrow$ $n$ pair », dont la réciproque échoue sur $6$.",
      "Toute réponse de ce type convient, à condition de justifier le sens direct ET d'exhiber un contre-exemple pour la réciproque."
    ),
    tags: ["premiere", "maths", "logique", "implication", "open"],
  },

  /* ===================== LOG_RECIPROQUE ===================== */
  {
    kind: "fixed",
    id: "premiere_log_rec_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_reciproque",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la réciproque de l'implication $P \\Rightarrow Q$ ?",
    format: "qcm",
    choices: [
      "$Q \\Rightarrow P$",
      "« non $P$ » $\\Rightarrow$ « non $Q$ »",
      "« non $Q$ » $\\Rightarrow$ « non $P$ »",
      "$P \\Leftrightarrow Q$",
    ],
    expected: ["$Q \\Rightarrow P$"],
    comparator: "mcq_exact",
    hint: "On échange simplement l'hypothèse et la conclusion.",
    explanation: exp(
      "La réciproque d'une implication s'obtient en échangeant hypothèse et conclusion.",
      "La réciproque de $P \\Rightarrow Q$ est donc $Q \\Rightarrow P$.",
      "À ne pas confondre avec la CONTRAPOSÉE, « non $Q$ » $\\Rightarrow$ « non $P$ », qui, elle, est toujours vraie quand l'implication l'est.",
      "La réciproque est $Q \\Rightarrow P$."
    ),
    tags: ["premiere", "maths", "logique", "reciproque", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_rec_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_reciproque",
    difficulty: 4,
    theme: "neutral",
    text: "Une implication est vraie. Sa réciproque est-elle vraie ?",
    format: "qcm",
    choices: [
      "pas forcément : il faut le vérifier séparément",
      "oui, toujours",
      "non, jamais",
      "oui, si l'implication est un théorème",
    ],
    expected: ["pas forcément : il faut le vérifier séparément"],
    comparator: "mcq_exact",
    hint: "Pense à « carré $\\Rightarrow$ rectangle ».",
    explanation: exp(
      "Une implication et sa réciproque sont deux affirmations distinctes, à démontrer chacune de son côté.",
      "« Si $ABCD$ est un carré, alors c'est un rectangle » est vraie ; sa réciproque est fausse.",
      "Mais il arrive que les deux soient vraies : on a alors une équivalence.",
      "Pas forcément : la réciproque se vérifie séparément."
    ),
    tags: ["premiere", "maths", "logique", "reciproque", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_rec_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_reciproque",
    difficulty: 4,
    theme: "neutral",
    text: "La réciproque de « si $n$ est pair, alors $n^2$ est pair » est-elle vraie ?",
    format: "qcm",
    choices: [
      "oui : si $n^2$ est pair, alors $n$ est pair",
      "non : $n^2$ peut être pair avec $n$ impair",
      "non : la réciproque n'a pas de sens",
      "on ne peut pas savoir",
    ],
    expected: ["oui : si $n^2$ est pair, alors $n$ est pair"],
    comparator: "mcq_exact",
    hint: "Essaie avec des nombres impairs : leur carré est-il jamais pair ?",
    explanation: exp(
      "La réciproque s'énonce : « si $n^2$ est pair, alors $n$ est pair ».",
      "Un nombre impair s'écrit $2k+1$, et son carré $4k^2 + 4k + 1$ est impair : le carré d'un impair est toujours impair.",
      "Donc si $n^2$ est pair, $n$ ne peut pas être impair : il est pair. La réciproque est vraie, et on a même une équivalence.",
      "Oui, la réciproque est vraie."
    ),
    tags: ["premiere", "maths", "logique", "reciproque", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_rec_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_reciproque",
    difficulty: 5,
    theme: "neutral",
    text: "Quelle différence y a-t-il entre la réciproque et la contraposée de $P \\Rightarrow Q$ ?",
    format: "qcm",
    choices: [
      "la réciproque est $Q \\Rightarrow P$ ; la contraposée est « non $Q$ » $\\Rightarrow$ « non $P$ »",
      "ce sont deux noms pour la même chose",
      "la réciproque est « non $Q$ » $\\Rightarrow$ « non $P$ »",
      "la contraposée est $Q \\Rightarrow P$",
    ],
    expected: [
      "la réciproque est $Q \\Rightarrow P$ ; la contraposée est « non $Q$ » $\\Rightarrow$ « non $P$ »",
    ],
    comparator: "mcq_exact",
    hint: "L'une est toujours vraie en même temps que l'implication, l'autre non.",
    explanation: exp(
      "Deux transformations différentes de la même implication.",
      "La réciproque échange hypothèse et conclusion ; la contraposée les échange ET les nie.",
      "Différence capitale : la contraposée est TOUJOURS vraie quand l'implication l'est — c'est ce qui permet de démontrer par contraposée. La réciproque, elle, peut être fausse.",
      "La réciproque est $Q \\Rightarrow P$, la contraposée est « non $Q$ » $\\Rightarrow$ « non $P$ »."
    ),
    tags: ["premiere", "maths", "logique", "reciproque", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_rec_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_reciproque",
    difficulty: 4,
    theme: "neutral",
    text: "Pour démontrer qu'un triangle est rectangle à partir de ses trois longueurs, on utilise :",
    format: "qcm",
    choices: [
      "la réciproque du théorème de Pythagore",
      "le théorème de Pythagore",
      "la contraposée du théorème de Pythagore",
      "le théorème de Thalès",
    ],
    expected: ["la réciproque du théorème de Pythagore"],
    comparator: "mcq_exact",
    hint: "Dans quel sens va-t-on : des longueurs vers l'angle droit, ou l'inverse ?",
    explanation: exp(
      "Le théorème de Pythagore part de l'angle droit pour donner une égalité de longueurs.",
      "Ici on fait le chemin inverse : on part des longueurs pour conclure à l'angle droit.",
      "C'est donc la réciproque qu'on utilise. La distinction n'est pas un détail de vocabulaire : sans elle, on croirait démontrer avec un théorème qui ne s'applique pas dans ce sens.",
      "On utilise la réciproque du théorème de Pythagore."
    ),
    tags: ["premiere", "maths", "logique", "reciproque", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_rec_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_reciproque",
    difficulty: 4,
    theme: "neutral",
    text: "Si une implication ET sa réciproque sont toutes deux vraies, que peut-on écrire ?",
    format: "qcm",
    choices: [
      "$P \\Leftrightarrow Q$",
      "$P \\Rightarrow Q$ uniquement",
      "$P = Q$",
      "rien de plus",
    ],
    expected: ["$P \\Leftrightarrow Q$"],
    comparator: "mcq_exact",
    hint: "Les deux sens sont vrais.",
    explanation: exp(
      "Une équivalence est exactement la conjonction d'une implication et de sa réciproque.",
      "Si $P \\Rightarrow Q$ et $Q \\Rightarrow P$ sont vraies, les deux propositions sont vraies dans les mêmes cas.",
      "On écrit alors $P \\Leftrightarrow Q$, qui se lit « $P$ si et seulement si $Q$ ».",
      "On peut écrire $P \\Leftrightarrow Q$."
    ),
    tags: ["premiere", "maths", "logique", "reciproque", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_rec_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_reciproque",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi « si $x > 2$ alors $x > 0$ » est vraie, mais pas sa réciproque.",
    format: "open",
    expected: ["contre-exemple", "réciproque", "entre 0 et 2", "1"],
    comparator: "contains_keyword",
    hint: "Cherche un nombre positif qui ne dépasse pas $2$.",
    explanation: exp(
      "Une implication et sa réciproque se jugent séparément.",
      "Sens direct : si $x > 2$, alors comme $2 > 0$, on a $x > 0$. C'est vrai pour tout $x$.",
      "Réciproque : « si $x > 0$ alors $x > 2$ ». Le nombre $1$ est un contre-exemple : il est positif sans dépasser $2$. Tous les nombres entre $0$ et $2$ conviennent.",
      "L'implication est vraie, la réciproque est fausse."
    ),
    tags: ["premiere", "maths", "logique", "reciproque", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_log_rec_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_reciproque",
    difficulty: 5,
    theme: "neutral",
    text: "Écris la réciproque de « si un quadrilatère est un carré, alors ses diagonales sont perpendiculaires », puis dis si elle est vraie en justifiant.",
    format: "open",
    expected: ["losange", "contre-exemple", "fausse", "perpendiculaires"],
    comparator: "contains_keyword",
    hint: "Quelles autres figures ont des diagonales perpendiculaires ?",
    explanation: exp(
      "On échange hypothèse et conclusion pour former la réciproque.",
      "Réciproque : « si les diagonales d'un quadrilatère sont perpendiculaires, alors c'est un carré ».",
      "Elle est FAUSSE : un losange non carré a lui aussi des diagonales perpendiculaires. C'est un contre-exemple.",
      "La réciproque est fausse, le losange le montre."
    ),
    tags: ["premiere", "maths", "logique", "reciproque", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_log_rec_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_reciproque",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève affirme : « puisque tout carré est un rectangle, tout rectangle est un carré ». Explique son erreur.",
    format: "open",
    expected: ["réciproque", "côtés", "contre-exemple", "pas la même"],
    comparator: "contains_keyword",
    hint: "Quelle transformation a-t-il appliquée sans le dire ?",
    explanation: exp(
      "Affirmer une implication ne donne aucun droit sur sa réciproque.",
      "L'élève a échangé hypothèse et conclusion : il utilise la réciproque comme si elle découlait de l'implication.",
      "Or elle est fausse : un rectangle de $3$ cm sur $5$ cm a bien quatre angles droits, sans avoir ses côtés égaux. C'est un contre-exemple.",
      "Son erreur est de confondre une implication avec sa réciproque."
    ),
    tags: ["premiere", "maths", "logique", "reciproque", "open"],
  },
  {
    kind: "template",
    id: "premiere_log_rec_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_reciproque",
    difficulty: 5,
    theme: "neutral",
    hint: "Écris d'abord la réciproque, puis cherche un contre-exemple avant de conclure.",
    tags: ["premiere", "maths", "logique", "reciproque", "open", "template"],
    generate: () => {
      const cas = [
        {
          p: "$x = 3$",
          q: "$x^2 = 9$",
          mots: ["-3", "contre-exemple", "fausse", "négatif"],
          verdict:
            "La réciproque « si $x^2 = 9$ alors $x = 3$ » est FAUSSE : $x = -3$ vérifie $x^2 = 9$ sans valoir $3$.",
        },
        {
          p: "$n$ est divisible par $10$",
          q: "$n$ est divisible par $5$",
          mots: ["15", "contre-exemple", "fausse", "pair"],
          verdict:
            "La réciproque « si $n$ est divisible par $5$ alors il l'est par $10$ » est FAUSSE : $15$ est un contre-exemple.",
        },
        {
          p: "$ABCD$ est un carré",
          q: "$ABCD$ est un losange",
          mots: ["losange", "contre-exemple", "fausse", "angle"],
          verdict:
            "La réciproque « si $ABCD$ est un losange alors c'est un carré » est FAUSSE : un losange aplati n'a pas d'angle droit.",
        },
        {
          p: "$f$ est la fonction carré",
          q: "$f$ est positive sur $\\mathbb{R}$",
          mots: ["valeur absolue", "contre-exemple", "fausse", "autre"],
          verdict:
            "La réciproque « si $f$ est positive alors $f$ est la fonction carré » est FAUSSE : la fonction valeur absolue est positive sans être la fonction carré.",
        },
      ];
      const c = pickOne(cas);
      return {
        text: `On considère l'implication « si ${c.p}, alors ${c.q} ». Écris sa réciproque et dis si elle est vraie, en justifiant.`,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: exp(
          "La réciproque s'obtient en échangeant hypothèse et conclusion ; elle se juge ensuite pour elle-même.",
          "On l'écrit, puis on cherche un contre-exemple : s'il en existe un, elle est fausse.",
          c.verdict,
          "Une implication vraie n'entraîne jamais que sa réciproque le soit."
        ),
      };
    },
  },

  /* ===================== LOG_EQUIVALENCE ===================== */
  {
    kind: "fixed",
    id: "premiere_log_equ_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_equivalence",
    difficulty: 3,
    theme: "neutral",
    text: "Que signifie $P \\Leftrightarrow Q$ ?",
    format: "qcm",
    choices: [
      "$P \\Rightarrow Q$ ET $Q \\Rightarrow P$ sont vraies",
      "$P \\Rightarrow Q$ est vraie",
      "$P$ et $Q$ sont vraies toutes les deux",
      "$P$ et $Q$ sont fausses toutes les deux",
    ],
    expected: ["$P \\Rightarrow Q$ ET $Q \\Rightarrow P$ sont vraies"],
    comparator: "mcq_exact",
    hint: "La double flèche, ce sont deux implications.",
    explanation: exp(
      "Une équivalence réunit une implication et sa réciproque.",
      "$P \\Leftrightarrow Q$ affirme que les deux sens sont vrais : $P \\Rightarrow Q$ et $Q \\Rightarrow P$.",
      "Elle ne dit pas que $P$ est vraie : elle dit que $P$ et $Q$ sont vraies exactement dans les mêmes cas.",
      "$P \\Leftrightarrow Q$ signifie que les deux implications sont vraies."
    ),
    tags: ["premiere", "maths", "logique", "equivalence", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_equ_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_equivalence",
    difficulty: 4,
    theme: "neutral",
    text: "L'écriture « $x = 2 \\Leftrightarrow x^2 = 4$ » est-elle correcte ?",
    format: "qcm",
    choices: [
      "non : le sens $x^2 = 4 \\Rightarrow x = 2$ est faux",
      "oui : les deux propositions se valent",
      "non : le sens $x = 2 \\Rightarrow x^2 = 4$ est faux",
      "oui, si $x$ est positif ou nul",
    ],
    expected: ["non : le sens $x^2 = 4 \\Rightarrow x = 2$ est faux"],
    comparator: "mcq_exact",
    hint: "Un des deux sens résiste, l'autre non.",
    explanation: exp(
      "Une équivalence exige que les DEUX sens soient vrais.",
      "Sens direct : si $x = 2$ alors $x^2 = 4$. C'est vrai.",
      "Sens réciproque : si $x^2 = 4$, $x$ peut valoir $-2$. C'est faux. L'équivalence tombe.",
      "Non : seule l'implication $x = 2 \\Rightarrow x^2 = 4$ est correcte."
    ),
    tags: ["premiere", "maths", "logique", "equivalence", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_equ_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_equivalence",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle écriture est correcte pour l'équation $x^2 = 4$ ?",
    format: "qcm",
    choices: [
      "$x^2 = 4 \\Leftrightarrow (x = 2$ ou $x = -2)$",
      "$x^2 = 4 \\Leftrightarrow x = 2$",
      "$x^2 = 4 \\Leftrightarrow (x = 2$ et $x = -2)$",
      "$x^2 = 4 \\Leftrightarrow x = \\sqrt{4}$",
    ],
    expected: ["$x^2 = 4 \\Leftrightarrow (x = 2$ ou $x = -2)$"],
    comparator: "mcq_exact",
    hint: "Il faut les DEUX solutions, reliées par « ou ».",
    explanation: exp(
      "Pour obtenir une équivalence, la proposition de droite doit avoir exactement les mêmes solutions que celle de gauche.",
      "$x^2 = 4$ a deux solutions : $2$ et $-2$. Il faut donc les mentionner toutes les deux, reliées par « ou ».",
      "Le « et » serait absurde (aucun nombre ne vaut à la fois $2$ et $-2$), et $\\sqrt{4}$ ne désigne que $2$.",
      "$x^2 = 4 \\Leftrightarrow (x = 2$ ou $x = -2)$."
    ),
    tags: ["premiere", "maths", "logique", "equivalence", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_equ_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_equivalence",
    difficulty: 5,
    theme: "neutral",
    text: "Pourquoi élever au carré les deux membres d'une équation n'est-il pas une équivalence ?",
    format: "qcm",
    choices: [
      "cela peut créer des solutions qui ne conviennent pas à l'équation de départ",
      "cela fait perdre des solutions",
      "cela change le degré de l'équation",
      "c'est en fait une équivalence",
    ],
    expected: [
      "cela peut créer des solutions qui ne conviennent pas à l'équation de départ",
    ],
    comparator: "mcq_exact",
    hint: "Compare les solutions de $x = 2$ et celles de $x^2 = 4$.",
    explanation: exp(
      "Une transformation est une équivalence si elle conserve exactement l'ensemble des solutions.",
      "En élevant au carré, $x = 2$ devient $x^2 = 4$, qui admet aussi $-2$ : une solution est apparue.",
      "C'est pourquoi, après avoir élevé au carré, il faut TOUJOURS vérifier quelles solutions conviennent réellement.",
      "Élever au carré peut créer des solutions étrangères à l'équation de départ."
    ),
    tags: ["premiere", "maths", "logique", "equivalence", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_equ_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_equivalence",
    difficulty: 4,
    theme: "neutral",
    text: "En termes d'ensembles de solutions, que signifie une équivalence entre deux équations ?",
    format: "qcm",
    choices: [
      "elles ont exactement le même ensemble de solutions",
      "la première a plus de solutions que la seconde",
      "elles ont au moins une solution commune",
      "elles n'ont aucune solution",
    ],
    expected: ["elles ont exactement le même ensemble de solutions"],
    comparator: "mcq_exact",
    hint: "Chaque solution de l'une doit être solution de l'autre, et inversement.",
    explanation: exp(
      "Deux équations équivalentes sont vérifiées par les mêmes valeurs.",
      "Le sens direct dit que toute solution de la première est solution de la seconde ; le sens réciproque dit l'inverse.",
      "Les deux ensembles de solutions sont donc inclus l'un dans l'autre : ils sont égaux. C'est ce qui autorise à enchaîner les étapes d'une résolution.",
      "Elles ont exactement le même ensemble de solutions."
    ),
    tags: ["premiere", "maths", "logique", "equivalence", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_equ_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_equivalence",
    difficulty: 5,
    theme: "neutral",
    text: "L'équivalence « le trinôme $ax^2+bx+c$ admet des racines réelles $\\Leftrightarrow \\Delta \\ge 0$ » est-elle vraie ?",
    format: "qcm",
    choices: [
      "oui : les deux sens sont vrais",
      "non : seul le sens direct est vrai",
      "non : seul le sens réciproque est vrai",
      "non : il faudrait aussi $a > 0$",
    ],
    expected: ["oui : les deux sens sont vrais"],
    comparator: "mcq_exact",
    hint: "Le signe du discriminant décide-t-il à lui seul de l'existence des racines ?",
    explanation: exp(
      "Le discriminant détermine entièrement le nombre de racines réelles d'un trinôme.",
      "Si $\\Delta \\ge 0$, la formule $\\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}$ fournit une ou deux racines réelles.",
      "Réciproquement, s'il existe une racine réelle, alors $\\sqrt{\\Delta}$ doit exister, donc $\\Delta \\ge 0$. Le signe de $a$ n'intervient pas ici.",
      "Oui, c'est bien une équivalence."
    ),
    tags: ["premiere", "maths", "logique", "equivalence", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_equ_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_equivalence",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi on peut écrire $x + 3 = 7 \\Leftrightarrow x = 4$, mais pas $x^2 = 4 \\Leftrightarrow x = 2$.",
    format: "open",
    expected: ["solutions", "-2", "retirer", "réversible"],
    comparator: "contains_keyword",
    hint: "Compare les ensembles de solutions de chaque côté.",
    explanation: exp(
      "Une équivalence entre deux équations exige qu'elles aient exactement les mêmes solutions.",
      "Retirer $3$ des deux membres est une opération réversible : $x + 3 = 7$ et $x = 4$ ont toutes deux la seule solution $4$.",
      "En revanche $x^2 = 4$ a DEUX solutions, $2$ et $-2$, alors que $x = 2$ n'en a qu'une : les ensembles diffèrent, l'équivalence est fausse.",
      "La première transformation conserve les solutions, la seconde en perd une."
    ),
    tags: ["premiere", "maths", "logique", "equivalence", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_log_equ_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_equivalence",
    difficulty: 5,
    theme: "neutral",
    text: "Dans la résolution d'une équation, que risque-t-on à écrire $\\Rightarrow$ au lieu de $\\Leftrightarrow$ entre les étapes ?",
    format: "open",
    expected: ["vérifier", "solutions", "candidats", "réciproque"],
    comparator: "contains_keyword",
    hint: "Les valeurs trouvées à la fin sont-elles forcément solutions du départ ?",
    explanation: exp(
      "Les étapes d'une résolution ne conservent l'ensemble des solutions que si chacune est une équivalence.",
      "Avec de simples implications, on obtient des CANDIDATS : toute solution est dans la liste, mais la liste peut contenir des intrus.",
      "Il faut alors vérifier, à la fin, lesquels conviennent vraiment — c'est exactement ce qui se passe quand on élève au carré.",
      "On risque de garder des valeurs qui ne sont pas solutions : il faut les vérifier."
    ),
    tags: ["premiere", "maths", "logique", "equivalence", "open"],
  },
  {
    kind: "template",
    id: "premiere_log_equ_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_equivalence",
    difficulty: 5,
    theme: "neutral",
    hint: "Teste les DEUX sens : l'un peut être vrai et l'autre faux.",
    tags: ["premiere", "maths", "logique", "equivalence", "template"],
    generate: () => {
      const cas = [
        {
          a: "$x - 5 = 0$",
          b: "$x = 5$",
          vraie: true,
          pourquoi: "ajouter $5$ aux deux membres est réversible : les deux équations ont la même solution unique",
        },
        {
          a: "$x^2 = 9$",
          b: "$x = 3$",
          vraie: false,
          pourquoi: "$x = -3$ vérifie la première sans vérifier la seconde",
        },
        {
          a: "$2x = 8$",
          b: "$x = 4$",
          vraie: true,
          pourquoi: "diviser par $2$ est réversible : les ensembles de solutions sont identiques",
        },
        {
          a: "$n$ est divisible par $2$",
          b: "$n$ est divisible par $4$",
          vraie: false,
          pourquoi: "$6$ est divisible par $2$ mais pas par $4$",
        },
        {
          a: "$ABCD$ est un carré",
          b: "$ABCD$ est un rectangle avec quatre côtés égaux",
          vraie: true,
          pourquoi: "c'est exactement la définition du carré, les deux sens sont vrais",
        },
      ];
      const c = pickOne(cas);
      return {
        text: `L'équivalence « ${c.a} $\\Leftrightarrow$ ${c.b} » est-elle vraie ?`,
        format: "qcm",
        choices: c.vraie
          ? ["oui : les deux sens sont vrais", "non : un des deux sens est faux", "non : aucun sens n'est vrai", "on ne peut pas savoir"]
          : ["non : un des deux sens est faux", "oui : les deux sens sont vrais", "oui, dans les deux cas", "on ne peut pas savoir"],
        expected: [c.vraie ? "oui : les deux sens sont vrais" : "non : un des deux sens est faux"],
        comparator: "mcq_exact",
        explanation: exp(
          "Une équivalence n'est vraie que si l'implication ET sa réciproque le sont.",
          "On examine donc chaque sens séparément, en cherchant un contre-exemple pour celui qui semble fragile.",
          `Ici : ${c.pourquoi}.`,
          c.vraie ? "L'équivalence est vraie." : "L'équivalence est fausse."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "premiere_log_equ_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_equivalence",
    difficulty: 5,
    theme: "neutral",
    hint: "Examine les deux sens séparément : cherche un contre-exemple pour celui qui semble fragile.",
    tags: ["premiere", "maths", "logique", "equivalence", "open", "template"],
    generate: () => {
      const cas = [
        {
          a: "$x^2 = 25$",
          b: "$x = 5$",
          mots: ["-5", "contre-exemple", "deux solutions", "pas équivalent"],
          verdict:
            "Le sens $x = 5 \\Rightarrow x^2 = 25$ est vrai, mais l'autre est faux : $x = -5$ vérifie $x^2 = 25$ sans valoir $5$. Ce n'est PAS une équivalence.",
        },
        {
          a: "$3x = 12$",
          b: "$x = 4$",
          mots: ["diviser", "réversible", "mêmes solutions", "équivalent"],
          verdict:
            "Diviser par $3$ est réversible : les deux équations ont exactement la même solution unique. C'est bien une équivalence.",
        },
        {
          a: "$n$ est divisible par $6$",
          b: "$n$ est divisible par $2$ et par $3$",
          mots: ["deux sens", "équivalent", "diviseurs", "premiers entre eux"],
          verdict:
            "Les deux sens sont vrais : un multiple de $6$ est multiple de $2$ et de $3$, et réciproquement. C'est une équivalence.",
        },
        {
          a: "$ABCD$ est un rectangle",
          b: "$ABCD$ a quatre angles droits",
          mots: ["définition", "équivalent", "deux sens", "angles"],
          verdict:
            "C'est la définition même du rectangle : les deux sens sont vrais, c'est une équivalence.",
        },
      ];
      const c = pickOne(cas);
      return {
        text: `Peut-on écrire « ${c.a} $\\Leftrightarrow$ ${c.b} » ? Justifie en examinant les DEUX sens.`,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: exp(
          "Une équivalence exige que l'implication ET sa réciproque soient vraies.",
          "On teste chaque sens séparément, en cherchant un contre-exemple pour celui qui semble fragile.",
          c.verdict,
          "Il suffit qu'un seul sens échoue pour que l'équivalence tombe."
        ),
      };
    },
  },

  /* ===================== LOG_CONDITION ===================== */
  {
    kind: "fixed",
    id: "premiere_log_cnd_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_condition",
    difficulty: 4,
    theme: "neutral",
    text: "Dans l'implication $P \\Rightarrow Q$, comment qualifie-t-on $P$ et $Q$ ?",
    format: "qcm",
    choices: [
      "$P$ est suffisante pour $Q$ ; $Q$ est nécessaire à $P$",
      "$P$ est nécessaire à $Q$ ; $Q$ est suffisante pour $P$",
      "les deux sont nécessaires",
      "les deux sont suffisantes",
    ],
    expected: ["$P$ est suffisante pour $Q$ ; $Q$ est nécessaire à $P$"],
    comparator: "mcq_exact",
    hint: "$P$ suffit à garantir $Q$ ; sans $Q$, pas de $P$.",
    explanation: exp(
      "Une implication se lit dans les deux vocabulaires.",
      "Savoir $P$ SUFFIT pour obtenir $Q$ : $P$ est une condition suffisante.",
      "Et $Q$ est indispensable : si $Q$ est fausse, $P$ ne peut pas être vraie. $Q$ est une condition nécessaire.",
      "$P$ est suffisante pour $Q$, et $Q$ est nécessaire à $P$."
    ),
    tags: ["premiere", "maths", "logique", "condition", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_cnd_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_condition",
    difficulty: 4,
    theme: "neutral",
    text: "« Il suffit que $x > 3$ pour que $x > 0$. » Cette phrase exprime :",
    format: "qcm",
    choices: [
      "$x > 3 \\Rightarrow x > 0$",
      "$x > 0 \\Rightarrow x > 3$",
      "$x > 3 \\Leftrightarrow x > 0$",
      "aucune implication",
    ],
    expected: ["$x > 3 \\Rightarrow x > 0$"],
    comparator: "mcq_exact",
    hint: "« Il suffit que P pour que Q » : la flèche part de P.",
    explanation: exp(
      "« Il suffit que $P$ pour que $Q$ » signifie que $P$ garantit $Q$.",
      "La flèche part donc de la condition suffisante : $P \\Rightarrow Q$.",
      "Ici : dépasser $3$ garantit d'être positif. L'inverse est faux, $1$ étant positif sans dépasser $3$.",
      "La phrase exprime $x > 3 \\Rightarrow x > 0$."
    ),
    tags: ["premiere", "maths", "logique", "condition", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_cnd_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_condition",
    difficulty: 5,
    theme: "neutral",
    text: "« Il faut que $\\Delta \\ge 0$ pour que le trinôme ait une racine réelle. » Cette phrase exprime :",
    format: "qcm",
    choices: [
      "(le trinôme a une racine réelle) $\\Rightarrow \\Delta \\ge 0$",
      "$\\Delta \\ge 0 \\Rightarrow$ (le trinôme a une racine réelle)",
      "$\\Delta < 0 \\Rightarrow$ (le trinôme a une racine réelle)",
      "aucune implication",
    ],
    expected: ["(le trinôme a une racine réelle) $\\Rightarrow \\Delta \\ge 0$"],
    comparator: "mcq_exact",
    hint: "« Il faut que Q pour que P » : la flèche part de P, pas de Q.",
    explanation: exp(
      "« Il faut que $Q$ pour que $P$ » signifie que $Q$ est indispensable : sans $Q$, pas de $P$.",
      "La flèche part donc de $P$ : $P \\Rightarrow Q$. Ici, l'existence d'une racine entraîne $\\Delta \\ge 0$.",
      "C'est le sens que l'on inverse le plus souvent : « il faut » et « il suffit » ne se traduisent pas dans le même sens. (Ici les deux sens sont d'ailleurs vrais, mais la phrase n'en affirme qu'un.)",
      "La phrase exprime (racine réelle) $\\Rightarrow \\Delta \\ge 0$."
    ),
    tags: ["premiere", "maths", "logique", "condition", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_cnd_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_condition",
    difficulty: 4,
    theme: "neutral",
    text: "Pour qu'un quadrilatère soit un carré, « avoir quatre côtés égaux » est une condition :",
    format: "qcm",
    choices: [
      "nécessaire mais pas suffisante",
      "suffisante mais pas nécessaire",
      "nécessaire et suffisante",
      "ni nécessaire ni suffisante",
    ],
    expected: ["nécessaire mais pas suffisante"],
    comparator: "mcq_exact",
    hint: "Un losange a quatre côtés égaux. Est-ce un carré ?",
    explanation: exp(
      "On teste les deux sens séparément.",
      "Nécessaire : tout carré a bien quatre côtés égaux — sans cette propriété, pas de carré.",
      "Suffisante ? Non : un losange aplati a quatre côtés égaux sans être un carré. Il manque les angles droits.",
      "C'est une condition nécessaire mais pas suffisante."
    ),
    tags: ["premiere", "maths", "logique", "condition", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_cnd_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_condition",
    difficulty: 4,
    theme: "neutral",
    text: "Pour qu'un entier soit pair, « être divisible par $4$ » est une condition :",
    format: "qcm",
    choices: [
      "suffisante mais pas nécessaire",
      "nécessaire mais pas suffisante",
      "nécessaire et suffisante",
      "ni nécessaire ni suffisante",
    ],
    expected: ["suffisante mais pas nécessaire"],
    comparator: "mcq_exact",
    hint: "$6$ est pair. Est-il divisible par $4$ ?",
    explanation: exp(
      "On teste les deux sens.",
      "Suffisante : tout multiple de $4$ s'écrit $4k = 2 \\times 2k$, donc il est pair. Le sens fonctionne.",
      "Nécessaire ? Non : $6$ est pair sans être divisible par $4$. On peut être pair sans remplir cette condition.",
      "C'est une condition suffisante mais pas nécessaire."
    ),
    tags: ["premiere", "maths", "logique", "condition", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_cnd_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_condition",
    difficulty: 4,
    theme: "neutral",
    text: "Une condition à la fois nécessaire ET suffisante correspond à :",
    format: "qcm",
    choices: [
      "une équivalence",
      "une implication simple",
      "une réciproque",
      "un contre-exemple",
    ],
    expected: ["une équivalence"],
    comparator: "mcq_exact",
    hint: "Les deux sens sont vrais.",
    explanation: exp(
      "« Suffisante » donne un sens de l'implication, « nécessaire » donne l'autre.",
      "Réunies, les deux affirmations donnent $P \\Rightarrow Q$ et $Q \\Rightarrow P$.",
      "C'est exactement une équivalence, que l'on énonce souvent par « si et seulement si ».",
      "Cela correspond à une équivalence."
    ),
    tags: ["premiere", "maths", "logique", "condition", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_cnd_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_condition",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi « être divisible par $6$ » est une condition suffisante mais pas nécessaire pour être divisible par $3$.",
    format: "open",
    expected: ["suffisante", "9", "contre-exemple", "multiple"],
    comparator: "contains_keyword",
    hint: "Cherche un multiple de $3$ qui ne soit pas multiple de $6$.",
    explanation: exp(
      "Une condition est suffisante si elle garantit la conclusion, nécessaire si la conclusion l'exige.",
      "Suffisante : si $n = 6k$, alors $n = 3 \\times (2k)$, donc $n$ est divisible par $3$.",
      "Pas nécessaire : $9$ est divisible par $3$ sans être divisible par $6$. C'est un contre-exemple.",
      "La condition est suffisante mais pas nécessaire."
    ),
    tags: ["premiere", "maths", "logique", "condition", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_log_cnd_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_condition",
    difficulty: 5,
    theme: "neutral",
    text: "Donne un exemple de la vie courante d'une condition nécessaire mais pas suffisante, et explique.",
    format: "open",
    expected: ["nécessaire", "suffisante", "pas assez", "faut"],
    comparator: "contains_keyword",
    hint: "Pense à ce qu'il faut pour réussir quelque chose, sans que cela garantisse la réussite.",
    explanation: exp(
      "Une condition nécessaire est indispensable, mais peut ne pas suffire à elle seule.",
      "Exemple : pour obtenir le bac, il faut se présenter aux épreuves. Sans cela, aucune chance de l'avoir.",
      "Mais s'y présenter ne suffit évidemment pas à l'obtenir : la condition est nécessaire, pas suffisante.",
      "Toute réponse construite sur ce modèle convient : la condition est exigée, mais ne garantit rien."
    ),
    tags: ["premiere", "maths", "logique", "condition", "open"],
  },
  {
    kind: "template",
    id: "premiere_log_cnd_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_condition",
    difficulty: 5,
    theme: "neutral",
    hint: "Teste les deux sens : la condition garantit-elle la conclusion ? La conclusion l'exige-t-elle ?",
    tags: ["premiere", "maths", "logique", "condition", "template"],
    generate: () => {
      const cas = [
        {
          cond: "être divisible par $10$",
          but: "être divisible par $5$",
          reponse: "suffisante mais pas nécessaire",
          pourquoi: "tout multiple de $10$ est multiple de $5$, mais $15$ est multiple de $5$ sans l'être de $10$",
        },
        {
          cond: "avoir quatre angles droits",
          but: "être un carré",
          reponse: "nécessaire mais pas suffisante",
          pourquoi: "tout carré a quatre angles droits, mais un rectangle allongé aussi sans être un carré",
        },
        {
          cond: "$x > 10$",
          but: "$x > 2$",
          reponse: "suffisante mais pas nécessaire",
          pourquoi: "dépasser $10$ garantit de dépasser $2$, mais $5$ dépasse $2$ sans dépasser $10$",
        },
        {
          cond: "$\\Delta \\ge 0$",
          but: "le trinôme admet une racine réelle",
          reponse: "nécessaire et suffisante",
          pourquoi: "les deux sens sont vrais : le signe du discriminant décide entièrement de l'existence des racines",
        },
        {
          cond: "être un losange",
          but: "avoir des diagonales perpendiculaires",
          reponse: "suffisante mais pas nécessaire",
          pourquoi: "les diagonales d'un losange sont perpendiculaires, mais un cerf-volant quelconque en a aussi sans être un losange",
        },
      ];
      const c = pickOne(cas);
      const autres = [
        "nécessaire mais pas suffisante",
        "suffisante mais pas nécessaire",
        "nécessaire et suffisante",
        "ni nécessaire ni suffisante",
      ].filter((r) => r !== c.reponse);
      return {
        text: `Pour « ${c.but} », la condition « ${c.cond} » est-elle nécessaire, suffisante, les deux ?`,
        format: "qcm",
        choices: [c.reponse, ...autres],
        expected: [c.reponse],
        comparator: "mcq_exact",
        explanation: exp(
          "Une condition est suffisante si elle entraîne la conclusion, nécessaire si la conclusion l'entraîne.",
          "On examine les deux sens l'un après l'autre, en cherchant un contre-exemple à chaque fois.",
          `Ici : ${c.pourquoi}.`,
          `La condition est ${c.reponse}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "premiere_log_cnd_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_condition",
    difficulty: 5,
    theme: "neutral",
    hint: "La condition garantit-elle la conclusion ? La conclusion l'exige-t-elle ?",
    tags: ["premiere", "maths", "logique", "condition", "open", "template"],
    generate: () => {
      const cas = [
        {
          cond: "être divisible par $9$",
          but: "être divisible par $3$",
          mots: ["suffisante", "6", "pas nécessaire", "contre-exemple"],
          verdict:
            "Suffisante : tout multiple de $9$ est multiple de $3$. Pas nécessaire : $6$ est multiple de $3$ sans l'être de $9$.",
        },
        {
          cond: "avoir quatre côtés égaux",
          but: "être un carré",
          mots: ["nécessaire", "losange", "pas suffisante", "angle"],
          verdict:
            "Nécessaire : tout carré a quatre côtés égaux. Pas suffisante : un losange aplati les a aussi, sans angle droit.",
        },
        {
          cond: "$x > 7$",
          but: "$x > 0$",
          mots: ["suffisante", "pas nécessaire", "1", "contre-exemple"],
          verdict:
            "Suffisante : dépasser $7$ garantit d'être positif. Pas nécessaire : $1$ est positif sans dépasser $7$.",
        },
        {
          cond: "avoir un discriminant strictement positif",
          but: "avoir deux racines distinctes",
          mots: ["nécessaire", "suffisante", "équivalence", "deux sens"],
          verdict:
            "Les deux sens sont vrais : la condition est à la fois nécessaire et suffisante. C'est donc une équivalence.",
        },
      ];
      const c = pickOne(cas);
      return {
        text: `Pour « ${c.but} », la condition « ${c.cond} » est-elle nécessaire, suffisante, ou les deux ? Justifie chaque sens.`,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: exp(
          "Suffisante : la condition entraîne la conclusion. Nécessaire : la conclusion entraîne la condition.",
          "On teste donc les deux implications, en cherchant un contre-exemple pour chacune.",
          c.verdict,
          "Une condition à la fois nécessaire et suffisante correspond à une équivalence."
        ),
      };
    },
  },

  /* ===================== LOG_STATUT_LETTRES ===================== */
  {
    kind: "fixed",
    id: "premiere_log_let_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_statut_lettres",
    difficulty: 3,
    theme: "neutral",
    text: "L'égalité $(a + b)^2 = a^2 + 2ab + b^2$ est :",
    format: "qcm",
    choices: [
      "une identité : elle est vraie pour TOUS les réels $a$ et $b$",
      "une équation : elle n'est vraie que pour certaines valeurs",
      "une inéquation",
      "une égalité fausse",
    ],
    expected: ["une identité : elle est vraie pour TOUS les réels $a$ et $b$"],
    comparator: "mcq_exact",
    hint: "Essaie plusieurs valeurs : y en a-t-il pour lesquelles l'égalité échoue ?",
    explanation: exp(
      "Une identité est une égalité vraie quelles que soient les valeurs des lettres ; une équation n'est vraie que pour certaines.",
      "Ici, en développant $(a+b)^2$ on retrouve toujours $a^2 + 2ab + b^2$.",
      "L'égalité tient pour tous les réels : c'est une identité remarquable. On ne la « résout » donc pas.",
      "C'est une identité."
    ),
    tags: ["premiere", "maths", "logique", "statut_lettres", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_let_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_statut_lettres",
    difficulty: 3,
    theme: "neutral",
    text: "L'égalité $x + 3 = 7$ est :",
    format: "qcm",
    choices: [
      "une équation : elle n'est vraie que pour $x = 4$",
      "une identité : elle est vraie pour tout $x$",
      "toujours fausse",
      "une inéquation",
    ],
    expected: ["une équation : elle n'est vraie que pour $x = 4$"],
    comparator: "mcq_exact",
    hint: "Teste $x = 1$ : l'égalité tient-elle ?",
    explanation: exp(
      "Une équation est une égalité qui n'est vraie que pour certaines valeurs de la lettre, appelées solutions.",
      "Pour $x = 1$, on obtiendrait $4 = 7$ : faux. Pour $x = 4$, on obtient $7 = 7$ : vrai.",
      "L'égalité n'est donc pas universelle : c'est une équation, dont la seule solution est $4$.",
      "C'est une équation, de solution $x = 4$."
    ),
    tags: ["premiere", "maths", "logique", "statut_lettres", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_let_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_statut_lettres",
    difficulty: 3,
    theme: "neutral",
    text: "Que veut dire « résoudre une équation » ?",
    format: "qcm",
    choices: [
      "trouver toutes les valeurs de l'inconnue qui rendent l'égalité vraie",
      "simplifier l'expression",
      "vérifier que l'égalité est toujours vraie",
      "calculer les deux membres",
    ],
    expected: [
      "trouver toutes les valeurs de l'inconnue qui rendent l'égalité vraie",
    ],
    comparator: "mcq_exact",
    hint: "Le mot important est « toutes ».",
    explanation: exp(
      "Résoudre, c'est déterminer l'ensemble des solutions.",
      "On cherche les valeurs de l'inconnue pour lesquelles l'égalité est vérifiée — toutes, sans en oublier.",
      "C'est pourquoi il faut penser aux deux solutions de $x^2 = 4$ : en oublier une, c'est n'avoir résolu qu'à moitié.",
      "C'est trouver toutes les valeurs qui rendent l'égalité vraie."
    ),
    tags: ["premiere", "maths", "logique", "statut_lettres", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_let_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_statut_lettres",
    difficulty: 4,
    theme: "neutral",
    text: "Dans l'écriture $f(x) = 2x + 1$, quel est le statut de la lettre $x$ ?",
    format: "qcm",
    choices: [
      "une variable : elle parcourt l'ensemble de définition",
      "une inconnue à déterminer",
      "un paramètre fixé",
      "une constante",
    ],
    expected: ["une variable : elle parcourt l'ensemble de définition"],
    comparator: "mcq_exact",
    hint: "Y a-t-il quelque chose à trouver, ici ?",
    explanation: exp(
      "Une même lettre peut avoir des statuts différents selon le contexte.",
      "Ici, rien n'est à trouver : $x$ prend successivement toutes les valeurs de l'ensemble de définition, et $f(x)$ suit.",
      "C'est une variable. Elle deviendrait une inconnue si on écrivait $f(x) = 0$ et qu'on demandait de résoudre.",
      "$x$ est une variable."
    ),
    tags: ["premiere", "maths", "logique", "statut_lettres", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_let_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_statut_lettres",
    difficulty: 4,
    theme: "neutral",
    text: "Dans l'équation $ax^2 + bx + c = 0$ d'inconnue $x$, quel est le statut de $a$, $b$ et $c$ ?",
    format: "qcm",
    choices: [
      "des paramètres : des nombres fixés dont dépend la réponse",
      "des inconnues à déterminer",
      "des variables",
      "des solutions",
    ],
    expected: ["des paramètres : des nombres fixés dont dépend la réponse"],
    comparator: "mcq_exact",
    hint: "L'énoncé précise « d'inconnue $x$ » : que sont alors les autres lettres ?",
    explanation: exp(
      "Dans une équation, l'inconnue est ce qu'on cherche ; les autres lettres représentent des nombres considérés comme donnés.",
      "Ici $a$, $b$ et $c$ sont fixés : ce sont des paramètres. C'est d'eux que dépend le discriminant.",
      "Ce statut permet d'énoncer une méthode générale, valable pour tous les trinômes à la fois.",
      "$a$, $b$ et $c$ sont des paramètres."
    ),
    tags: ["premiere", "maths", "logique", "statut_lettres", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_let_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_statut_lettres",
    difficulty: 5,
    theme: "neutral",
    text: "Comment prouver qu'une égalité est une IDENTITÉ ?",
    format: "qcm",
    choices: [
      "en la démontrant par le calcul littéral, pour des lettres quelconques",
      "en la vérifiant sur trois valeurs",
      "en la vérifiant sur une valeur bien choisie",
      "en résolvant l'équation associée",
    ],
    expected: [
      "en la démontrant par le calcul littéral, pour des lettres quelconques",
    ],
    comparator: "mcq_exact",
    hint: "Une identité porte sur une infinité de valeurs.",
    explanation: exp(
      "Une identité affirme quelque chose pour TOUTES les valeurs des lettres.",
      "Des vérifications numériques, même nombreuses, ne couvrent qu'une partie des cas : elles ne démontrent rien.",
      "Il faut mener le calcul avec des lettres, par exemple en développant chaque membre jusqu'à obtenir la même expression. En revanche, un seul contre-exemple suffirait à prouver que ce n'est PAS une identité.",
      "On la démontre par le calcul littéral."
    ),
    tags: ["premiere", "maths", "logique", "statut_lettres", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_let_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_statut_lettres",
    difficulty: 5,
    theme: "neutral",
    text: "Explique la différence entre les deux égalités $(a+b)^2 = a^2 + 2ab + b^2$ et $x^2 = 4$.",
    format: "open",
    expected: ["identité", "équation", "toutes les valeurs", "solutions"],
    comparator: "contains_keyword",
    hint: "L'une est vraie tout le temps, l'autre seulement parfois.",
    explanation: exp(
      "Une identité est vraie pour toutes les valeurs des lettres ; une équation seulement pour certaines.",
      "$(a+b)^2 = a^2+2ab+b^2$ tient quels que soient $a$ et $b$ : c'est une identité, elle sert à transformer des expressions.",
      "$x^2 = 4$ n'est vraie que pour $x = 2$ et $x = -2$ : c'est une équation, on la résout.",
      "La première est une identité, la seconde une équation."
    ),
    tags: ["premiere", "maths", "logique", "statut_lettres", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_log_let_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_statut_lettres",
    difficulty: 5,
    theme: "neutral",
    text: "Dans l'équation $mx + 2 = 0$ d'inconnue $x$, quel est le rôle de $m$ ? Que se passe-t-il si $m = 0$ ?",
    format: "open",
    expected: ["paramètre", "aucune solution", "impossible", "m = 0"],
    comparator: "contains_keyword",
    hint: "Remplace $m$ par $0$ et regarde ce que devient l'équation.",
    explanation: exp(
      "L'inconnue est $x$ ; $m$ est un paramètre, un nombre fixé dont dépend la réponse.",
      "Si $m \\neq 0$, on peut diviser : $x = -\\dfrac{2}{m}$, une solution unique.",
      "Si $m = 0$, l'équation devient $2 = 0$, ce qui est impossible : elle n'a AUCUNE solution. Le paramètre change donc la nature du résultat.",
      "$m$ est un paramètre ; pour $m = 0$, il n'y a pas de solution."
    ),
    tags: ["premiere", "maths", "logique", "statut_lettres", "open"],
  },
  {
    kind: "template",
    id: "premiere_log_let_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_statut_lettres",
    difficulty: 4,
    theme: "neutral",
    hint: "Demande-toi si l'égalité tient pour TOUTES les valeurs, ou seulement pour certaines.",
    tags: ["premiere", "maths", "logique", "statut_lettres", "template"],
    generate: () => {
      const cas = [
        {
          egalite: "$(a - b)^2 = a^2 - 2ab + b^2$",
          identite: true,
          pourquoi: "le développement donne toujours ce résultat, quelles que soient les valeurs de $a$ et $b$",
        },
        {
          egalite: "$2x - 6 = 0$",
          identite: false,
          pourquoi: "elle n'est vraie que pour $x = 3$",
        },
        {
          egalite: "$(a + b)(a - b) = a^2 - b^2$",
          identite: true,
          pourquoi: "c'est une identité remarquable, valable pour tous les réels",
        },
        {
          egalite: "$x^2 - 5x + 6 = 0$",
          identite: false,
          pourquoi: "elle n'est vraie que pour $x = 2$ et $x = 3$",
        },
        {
          egalite: "$3(x + 2) = 3x + 6$",
          identite: true,
          pourquoi: "la distributivité la rend vraie pour toute valeur de $x$",
        },
        {
          egalite: "$x + 1 = 2x$",
          identite: false,
          pourquoi: "elle n'est vraie que pour $x = 1$",
        },
      ];
      const c = pickOne(cas);
      return {
        text: `L'égalité ${c.egalite} est-elle une identité ou une équation ?`,
        format: "qcm",
        choices: c.identite
          ? ["une identité : vraie pour toutes les valeurs", "une équation : vraie pour certaines valeurs seulement", "une inéquation", "une égalité toujours fausse"]
          : ["une équation : vraie pour certaines valeurs seulement", "une identité : vraie pour toutes les valeurs", "une inéquation", "une égalité toujours fausse"],
        expected: [
          c.identite
            ? "une identité : vraie pour toutes les valeurs"
            : "une équation : vraie pour certaines valeurs seulement",
        ],
        comparator: "mcq_exact",
        explanation: exp(
          "Une identité est vraie pour toutes les valeurs des lettres ; une équation seulement pour certaines.",
          "On teste : si l'égalité résiste à n'importe quelle valeur, c'est une identité ; si elle n'est vraie que pour quelques-unes, c'est une équation.",
          `Ici : ${c.pourquoi}.`,
          c.identite ? "C'est une identité." : "C'est une équation."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "premiere_log_let_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_statut_lettres",
    difficulty: 5,
    theme: "neutral",
    hint: "Teste plusieurs valeurs : l'égalité résiste-t-elle à toutes ?",
    tags: ["premiere", "maths", "logique", "statut_lettres", "open", "template"],
    generate: () => {
      const cas = [
        {
          e: "$(x + 3)^2 = x^2 + 6x + 9$",
          mots: ["identité", "toutes les valeurs", "développ", "vraie"],
          verdict:
            "En développant, on retrouve toujours le membre de droite : l'égalité tient pour TOUT $x$. C'est une identité.",
        },
        {
          e: "$4x - 8 = 0$",
          mots: ["équation", "2", "seule valeur", "résoudre"],
          verdict:
            "Elle n'est vraie que pour $x = 2$ : c'est une équation, qu'on résout.",
        },
        {
          e: "$x^2 - 9 = (x - 3)(x + 3)$",
          mots: ["identité", "remarquable", "toutes les valeurs", "développ"],
          verdict:
            "C'est l'identité remarquable $a^2 - b^2 = (a-b)(a+b)$ : elle est vraie pour tout $x$.",
        },
        {
          e: "$x^2 = 2x$",
          mots: ["équation", "0", "2", "solutions"],
          verdict:
            "Elle s'écrit $x(x - 2) = 0$ : elle n'est vraie que pour $x = 0$ et $x = 2$. C'est une équation.",
        },
        {
          e: "$2(x - 5) = 2x - 10$",
          mots: ["identité", "distributivité", "toutes les valeurs", "vraie"],
          verdict:
            "La distributivité rend l'égalité vraie pour toute valeur de $x$ : c'est une identité.",
        },
      ];
      const c = pickOne(cas);
      return {
        text: `L'égalité ${c.e} est-elle une identité ou une équation ? Justifie ta réponse.`,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: exp(
          "Une identité est vraie pour toutes les valeurs de la lettre ; une équation seulement pour certaines.",
          "On développe ou on teste : si l'égalité résiste à n'importe quelle valeur, c'est une identité.",
          c.verdict,
          "On résout une équation ; une identité, elle, sert à transformer des expressions."
        ),
      };
    },
  },

  /* ===================== LOG_QUANTIFICATEURS ===================== */
  {
    kind: "fixed",
    id: "premiere_log_qua_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_quantificateurs",
    difficulty: 3,
    theme: "neutral",
    text: "La proposition « pour tout réel $x$, $x^2 \\ge 0$ » est-elle vraie ?",
    format: "qcm",
    choices: [
      "oui : le carré d'un réel n'est jamais négatif",
      "non : pour $x$ négatif, $x^2$ est négatif",
      "non : pour $x = 0$, on n'a pas $x^2 > 0$",
      "on ne peut pas le savoir",
    ],
    expected: ["oui : le carré d'un réel n'est jamais négatif"],
    comparator: "mcq_exact",
    hint: "Teste un négatif : $(-3)^2$ vaut combien ?",
    explanation: exp(
      "« Pour tout » exige que la propriété tienne sans aucune exception.",
      "Le carré d'un positif est positif ; celui d'un négatif aussi, car le produit de deux nombres négatifs est positif : $(-3)^2 = 9$.",
      "Et $0^2 = 0$, qui vérifie bien $\\ge 0$. Aucun contre-exemple n'existe.",
      "Oui, la proposition est vraie."
    ),
    tags: ["premiere", "maths", "logique", "quantificateurs", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_qua_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_quantificateurs",
    difficulty: 3,
    theme: "neutral",
    text: "La proposition « il existe un réel $x$ tel que $x^2 = -1$ » est-elle vraie ?",
    format: "qcm",
    choices: [
      "non : aucun carré de réel n'est négatif",
      "oui : $x = -1$ convient",
      "oui : $x = 1$ convient",
      "on ne peut pas le savoir",
    ],
    expected: ["non : aucun carré de réel n'est négatif"],
    comparator: "mcq_exact",
    hint: "Un carré peut-il être négatif ?",
    explanation: exp(
      "« Il existe » demande de trouver au moins un cas qui convient.",
      "Or le carré de tout réel est positif ou nul : aucun ne peut valoir $-1$.",
      "$(-1)^2 = 1$, pas $-1$ : le piège consiste à confondre le nombre et son carré.",
      "Non, cette proposition est fausse."
    ),
    tags: ["premiere", "maths", "logique", "quantificateurs", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_qua_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_quantificateurs",
    difficulty: 4,
    theme: "neutral",
    text: "Comment démontre-t-on qu'une proposition « il existe… » est vraie ?",
    format: "qcm",
    choices: [
      "en exhibant un exemple qui convient",
      "en vérifiant tous les cas",
      "en exhibant un contre-exemple",
      "c'est impossible à démontrer",
    ],
    expected: ["en exhibant un exemple qui convient"],
    comparator: "mcq_exact",
    hint: "Il suffit d'en trouver un seul.",
    explanation: exp(
      "« Il existe » n'affirme qu'une chose : au moins un cas convient.",
      "Un seul exemple explicite suffit donc à établir la proposition.",
      "C'est l'inverse d'un « pour tout », qu'un exemple ne démontre jamais, mais qu'un contre-exemple suffit à réfuter.",
      "On exhibe un exemple qui convient."
    ),
    tags: ["premiere", "maths", "logique", "quantificateurs", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_qua_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_quantificateurs",
    difficulty: 4,
    theme: "neutral",
    text: "Comment démontre-t-on qu'une proposition « pour tout… » est FAUSSE ?",
    format: "qcm",
    choices: [
      "en exhibant un seul contre-exemple",
      "en exhibant un exemple qui convient",
      "en vérifiant tous les cas",
      "en la niant",
    ],
    expected: ["en exhibant un seul contre-exemple"],
    comparator: "mcq_exact",
    hint: "Une seule exception suffit à ruiner un « pour tout ».",
    explanation: exp(
      "Une proposition universelle ne tolère aucune exception.",
      "Il suffit donc d'exhiber un cas où elle échoue pour la réfuter définitivement.",
      "Attention à la dissymétrie : ce même contre-exemple ne dit rien d'un « il existe », que l'on prouve au contraire par un exemple.",
      "On exhibe un seul contre-exemple."
    ),
    tags: ["premiere", "maths", "logique", "quantificateurs", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_qua_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_quantificateurs",
    difficulty: 5,
    theme: "neutral",
    text: "Quand on écrit « $x^2 \\ge 0$ » sans autre précision, quelle quantification est sous-entendue ?",
    format: "qcm",
    choices: [
      "« pour tout réel $x$ »",
      "« il existe un réel $x$ »",
      "aucune : l'écriture n'a pas de sens",
      "« pour $x = 0$ »",
    ],
    expected: ["« pour tout réel $x$ »"],
    comparator: "mcq_exact",
    hint: "S'agit-il d'une propriété générale ou d'une équation à résoudre ?",
    explanation: exp(
      "Beaucoup d'énoncés mathématiques contiennent des quantifications implicites.",
      "Écrire « $x^2 \\ge 0$ » comme une propriété du cours signifie qu'elle vaut pour n'importe quel réel.",
      "La quantification universelle est donc sous-entendue. Repérer ces implicites évite de confondre une propriété générale avec une équation à résoudre.",
      "C'est « pour tout réel $x$ » qui est sous-entendu."
    ),
    tags: ["premiere", "maths", "logique", "quantificateurs", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_qua_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_quantificateurs",
    difficulty: 4,
    theme: "neutral",
    text: "La proposition « il existe un nombre premier pair » est-elle vraie ?",
    format: "qcm",
    choices: [
      "oui : $2$ convient",
      "non : tous les nombres premiers sont impairs",
      "oui : $4$ convient",
      "on ne peut pas le savoir",
    ],
    expected: ["oui : $2$ convient"],
    comparator: "mcq_exact",
    hint: "Un seul exemple suffit — cherche le plus petit nombre premier.",
    explanation: exp(
      "Pour établir un « il existe », il suffit d'exhiber un cas.",
      "$2$ est premier (ses seuls diviseurs sont $1$ et $2$) et il est pair.",
      "La proposition est donc vraie, même si $2$ est le seul exemple possible. $4$ ne convient pas : il est divisible par $2$, donc pas premier.",
      "Oui : $2$ est un nombre premier pair."
    ),
    tags: ["premiere", "maths", "logique", "quantificateurs", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_qua_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_quantificateurs",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi un exemple suffit pour prouver « il existe… », mais jamais pour prouver « pour tout… ».",
    format: "open",
    expected: ["un seul cas", "tous les cas", "contre-exemple", "infinité"],
    comparator: "contains_keyword",
    hint: "Regarde ce que chaque phrase affirme exactement.",
    explanation: exp(
      "Les deux quantificateurs n'affirment pas la même chose, donc ne se prouvent pas de la même façon.",
      "« Il existe » n'affirme qu'un cas : en exhiber un, c'est avoir tout démontré.",
      "« Pour tout » affirme une infinité de cas : en vérifier un, ou mille, ne dit rien des autres. Il faut un raisonnement général — et un seul contre-exemple suffirait à tout faire tomber.",
      "L'un demande un cas, l'autre les demande tous."
    ),
    tags: ["premiere", "maths", "logique", "quantificateurs", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_log_qua_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_quantificateurs",
    difficulty: 4,
    theme: "neutral",
    text: "Reformule la phrase « le carré d'un nombre réel est positif ou nul » en faisant apparaître le quantificateur.",
    format: "open",
    expected: ["pour tout", "quel que soit", "tout réel", "x²"],
    comparator: "contains_keyword",
    hint: "Commence par « Pour tout réel $x$… ».",
    explanation: exp(
      "Une propriété générale contient une quantification universelle, souvent implicite dans le langage courant.",
      "On l'explicite en nommant la variable et l'ensemble concerné.",
      "Cela donne : « Pour tout réel $x$, $x^2 \\ge 0$ ». On peut aussi dire « quel que soit le réel $x$ ».",
      "La quantification universelle « pour tout réel $x$ » était sous-entendue."
    ),
    tags: ["premiere", "maths", "logique", "quantificateurs", "open"],
  },
  {
    kind: "template",
    id: "premiere_log_qua_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_quantificateurs",
    difficulty: 5,
    theme: "neutral",
    hint: "« Pour tout » tombe avec un seul contre-exemple ; « il existe » tient avec un seul exemple.",
    tags: ["premiere", "maths", "logique", "quantificateurs", "template"],
    generate: () => {
      const cas = [
        {
          prop: "pour tout réel $x$, $x^2 > x$",
          vraie: false,
          pourquoi: "$x = 0{,}5$ donne $0{,}25 < 0{,}5$ : c'est un contre-exemple",
        },
        {
          prop: "il existe un réel $x$ tel que $x^2 = x$",
          vraie: true,
          pourquoi: "$x = 1$ convient, et $x = 0$ aussi",
        },
        {
          prop: "pour tout entier $n$, $n^2 \\ge n$",
          vraie: true,
          pourquoi: "pour les entiers, $n^2 - n = n(n-1)$ est toujours positif ou nul",
        },
        {
          prop: "il existe un entier dont le carré vaut $2$",
          vraie: false,
          pourquoi: "$1^2 = 1$ et $2^2 = 4$ : aucun entier ne convient, $\\sqrt{2}$ n'étant pas entier",
        },
        {
          prop: "pour tout réel $x$, $x + 1 > x$",
          vraie: true,
          pourquoi: "ajouter $1$ augmente toujours un nombre, quel qu'il soit",
        },
        {
          prop: "il existe un réel $x$ tel que $x + 1 = x$",
          vraie: false,
          pourquoi: "l'équation se ramène à $1 = 0$, ce qui est impossible",
        },
      ];
      const c = pickOne(cas);
      return {
        text: `La proposition « ${c.prop} » est-elle vraie ?`,
        format: "qcm",
        choices: c.vraie
          ? ["oui", "non, il existe un contre-exemple", "non, aucun cas ne convient", "on ne peut pas savoir"]
          : ["non", "oui, dans tous les cas", "oui, un exemple suffit", "on ne peut pas savoir"],
        expected: [c.vraie ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Un « pour tout » se réfute par un contre-exemple ; un « il existe » se prouve par un exemple.",
          "On identifie d'abord le quantificateur, puis on cherche l'un ou l'autre.",
          `Ici : ${c.pourquoi}.`,
          c.vraie ? "La proposition est vraie." : "La proposition est fausse."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "premiere_log_qua_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_quantificateurs",
    difficulty: 5,
    theme: "neutral",
    hint: "Repère le quantificateur : « pour tout » se réfute par un contre-exemple, « il existe » se prouve par un exemple.",
    tags: ["premiere", "maths", "logique", "quantificateurs", "open", "template"],
    generate: () => {
      const cas = [
        {
          prop: "pour tout réel $x$, $x^2 \\ge x$",
          mots: ["0,5", "contre-exemple", "fausse", "entre 0 et 1"],
          verdict:
            "FAUSSE : $x = 0{,}5$ donne $x^2 = 0{,}25 < 0{,}5$. Un seul contre-exemple suffit à la réfuter.",
        },
        {
          prop: "il existe un réel $x$ tel que $x^2 = x$",
          mots: ["1", "0", "exemple", "vraie"],
          verdict:
            "VRAIE : $x = 1$ convient (et $x = 0$ aussi). Un seul exemple suffit à l'établir.",
        },
        {
          prop: "pour tout réel $x$, $x^2 + 1 > 0$",
          mots: ["carré", "positif", "vraie", "toujours"],
          verdict:
            "VRAIE : $x^2 \\ge 0$ pour tout réel, donc $x^2 + 1 \\ge 1 > 0$. Aucun contre-exemple n'existe.",
        },
        {
          prop: "il existe un entier naturel plus petit que $0$",
          mots: ["fausse", "positif", "aucun", "naturel"],
          verdict:
            "FAUSSE : $\\mathbb{N}$ ne contient que des entiers positifs ou nuls, aucun ne convient.",
        },
        {
          prop: "pour tout entier $n$, $n^2 \\ge n$",
          mots: ["vraie", "entier", "n(n-1)", "positif"],
          verdict:
            "VRAIE pour les ENTIERS : $n^2 - n = n(n-1)$ est toujours positif ou nul. (Elle serait fausse sur $\\mathbb{R}$.)",
        },
      ];
      const c = pickOne(cas);
      return {
        text: `La proposition « ${c.prop} » est-elle vraie ? Justifie par un exemple ou un contre-exemple.`,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: exp(
          "« Pour tout » se réfute par un seul contre-exemple ; « il existe » se démontre par un seul exemple.",
          "On repère donc le quantificateur avant de chercher.",
          c.verdict,
          "L'ensemble sur lequel porte la quantification compte autant que la propriété elle-même."
        ),
      };
    },
  },

  /* ===================== LOG_NEGATION ===================== */
  {
    kind: "fixed",
    id: "premiere_log_neg_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_negation",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la négation de « $x > 3$ » ?",
    format: "qcm",
    choices: ["$x \\le 3$", "$x < 3$", "$x \\ge 3$", "$x \\neq 3$"],
    expected: ["$x \\le 3$"],
    comparator: "mcq_exact",
    hint: "Ne pas être strictement supérieur à $3$, c'est être plus petit… ou égal.",
    explanation: exp(
      "La négation d'une proposition décrit exactement tous les cas où elle est fausse.",
      "« $x > 3$ » est fausse lorsque $x$ est inférieur à $3$, mais aussi lorsque $x$ vaut exactement $3$.",
      "La négation est donc $x \\le 3$ : oublier le cas d'égalité laisserait $x = 3$ dans aucune des deux propositions.",
      "La négation est $x \\le 3$."
    ),
    tags: ["premiere", "maths", "logique", "negation", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_neg_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_negation",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la négation de « pour tout réel $x$, $P(x)$ est vraie » ?",
    format: "qcm",
    choices: [
      "il existe un réel $x$ pour lequel $P(x)$ est fausse",
      "pour tout réel $x$, $P(x)$ est fausse",
      "il existe un réel $x$ pour lequel $P(x)$ est vraie",
      "$P(x)$ n'a pas de sens",
    ],
    expected: ["il existe un réel $x$ pour lequel $P(x)$ est fausse"],
    comparator: "mcq_exact",
    hint: "Que faut-il pour qu'un « pour tout » soit mis en défaut ?",
    explanation: exp(
      "Nier une proposition universelle, c'est affirmer qu'elle échoue quelque part.",
      "Il suffit d'UN cas de mise en défaut : le « pour tout » devient « il existe », et la propriété est niée.",
      "Nier « pour tout $x$, $P(x)$ » ne donne pas « pour tout $x$, non $P(x)$ » : dire que tous les élèves n'ont pas réussi est bien plus fort que dire qu'ils n'ont pas tous réussi.",
      "La négation est : il existe un réel $x$ pour lequel $P(x)$ est fausse."
    ),
    tags: ["premiere", "maths", "logique", "negation", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_neg_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_negation",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la négation de « il existe un réel $x$ tel que $P(x)$ » ?",
    format: "qcm",
    choices: [
      "pour tout réel $x$, $P(x)$ est fausse",
      "il existe un réel $x$ tel que $P(x)$ est fausse",
      "pour tout réel $x$, $P(x)$ est vraie",
      "il n'existe pas de réel",
    ],
    expected: ["pour tout réel $x$, $P(x)$ est fausse"],
    comparator: "mcq_exact",
    hint: "Pour qu'aucun cas ne convienne, que faut-il de tous les cas ?",
    explanation: exp(
      "Nier une existence, c'est affirmer qu'aucun cas ne convient.",
      "Il faut donc que la propriété soit fausse pour TOUS les $x$ sans exception.",
      "Le quantificateur bascule : « il existe » devient « pour tout », et la propriété est niée. Exemple : nier « il existe un réel dont le carré vaut $-1$ » donne « tout réel a un carré différent de $-1$ ».",
      "La négation est : pour tout réel $x$, $P(x)$ est fausse."
    ),
    tags: ["premiere", "maths", "logique", "negation", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_neg_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_negation",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la négation de « tous les élèves de la classe ont réussi » ?",
    format: "qcm",
    choices: [
      "au moins un élève n'a pas réussi",
      "aucun élève n'a réussi",
      "tous les élèves ont échoué",
      "la moitié des élèves a réussi",
    ],
    expected: ["au moins un élève n'a pas réussi"],
    comparator: "mcq_exact",
    hint: "Combien d'élèves suffisent à contredire « tous » ?",
    explanation: exp(
      "Nier un « tous », c'est dire qu'il y a au moins une exception.",
      "Un seul élève en échec suffit à rendre la phrase de départ fausse.",
      "« Aucun n'a réussi » est beaucoup plus fort : c'est la négation de « au moins un a réussi », pas celle de « tous ont réussi ». C'est l'erreur la plus fréquente.",
      "La négation est : au moins un élève n'a pas réussi."
    ),
    tags: ["premiere", "maths", "logique", "negation", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_neg_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_negation",
    difficulty: 5,
    theme: "neutral",
    text: "Quelle est la négation de « $x \\ge 0$ ET $y \\ge 0$ » ?",
    format: "qcm",
    choices: [
      "$x < 0$ OU $y < 0$",
      "$x < 0$ ET $y < 0$",
      "$x \\le 0$ OU $y \\le 0$",
      "$x > 0$ ET $y > 0$",
    ],
    expected: ["$x < 0$ OU $y < 0$"],
    comparator: "mcq_exact",
    hint: "Il suffit qu'une des deux conditions tombe.",
    explanation: exp(
      "Nier un « et » donne un « ou » : la conjonction est fausse dès qu'une seule de ses parties l'est.",
      "Il suffit donc que $x$ soit négatif, OU que $y$ le soit — ou les deux.",
      "Garder un « et » serait bien trop fort : cela exigerait que les DEUX soient négatifs.",
      "La négation est $x < 0$ OU $y < 0$."
    ),
    tags: ["premiere", "maths", "logique", "negation", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_neg_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_negation",
    difficulty: 5,
    theme: "neutral",
    text: "La négation de « $f$ est croissante sur $I$ » est-elle « $f$ est décroissante sur $I$ » ?",
    format: "qcm",
    choices: [
      "non : $f$ peut n'être ni croissante ni décroissante",
      "oui : une fonction est croissante ou décroissante",
      "oui, si $f$ est dérivable",
      "non : c'est « $f$ est constante »",
    ],
    expected: ["non : $f$ peut n'être ni croissante ni décroissante"],
    comparator: "mcq_exact",
    hint: "Pense à la fonction carré sur $\\mathbb{R}$.",
    explanation: exp(
      "Nier une propriété, c'est décrire TOUS les cas où elle est fausse — pas seulement le cas opposé.",
      "Une fonction peut très bien n'être ni l'une ni l'autre : $x \\mapsto x^2$ sur $\\mathbb{R}$ descend puis monte.",
      "La négation correcte est : « il existe deux nombres $a < b$ de $I$ tels que $f(a) > f(b)$ ».",
      "Non : croissante et décroissante ne sont pas deux cas qui couvrent tout."
    ),
    tags: ["premiere", "maths", "logique", "negation", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_neg_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_negation",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi la négation de « $f$ est croissante » n'est pas « $f$ est décroissante ».",
    format: "open",
    expected: ["ni l'une ni l'autre", "carré", "contre-exemple", "varie"],
    comparator: "contains_keyword",
    hint: "Existe-t-il des fonctions qui ne sont ni croissantes ni décroissantes ?",
    explanation: exp(
      "Deux propriétés opposées ne recouvrent pas forcément toutes les possibilités.",
      "Entre « croissante » et « décroissante », il reste toute une catégorie de fonctions : celles qui changent de sens.",
      "La fonction carré sur $\\mathbb{R}$ décroît puis croît : elle n'est ni croissante ni décroissante. Nier « croissante » l'inclut, alors que « décroissante » l'exclut.",
      "La négation est plus large : elle englobe toutes les fonctions non croissantes."
    ),
    tags: ["premiere", "maths", "logique", "negation", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_log_neg_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_negation",
    difficulty: 5,
    theme: "neutral",
    text: "Écris la négation de « tous les nombres premiers sont impairs », puis dis laquelle des deux propositions est vraie.",
    format: "open",
    expected: ["il existe", "2", "négation", "pair"],
    comparator: "contains_keyword",
    hint: "Le quantificateur bascule, et la propriété est niée.",
    explanation: exp(
      "Nier un « tous », c'est affirmer l'existence d'au moins une exception.",
      "Négation : « il existe un nombre premier qui n'est pas impair », autrement dit qui est pair.",
      "C'est la NÉGATION qui est vraie : $2$ est premier et pair. La proposition de départ est donc fausse.",
      "La négation est vraie, grâce au contre-exemple $2$."
    ),
    tags: ["premiere", "maths", "logique", "negation", "open"],
  },
  {
    kind: "template",
    id: "premiere_log_neg_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_negation",
    difficulty: 5,
    theme: "neutral",
    hint: "« et » devient « ou », « pour tout » devient « il existe », et l'égalité doit être rangée du bon côté.",
    tags: ["premiere", "maths", "logique", "negation", "template"],
    generate: () => {
      const cas = [
        {
          prop: "$x < 5$",
          neg: "$x \\ge 5$",
          faux: ["$x > 5$", "$x \\le 5$", "$x \\neq 5$"],
          pourquoi: "la proposition est fausse pour $x = 5$ comme pour $x > 5$ : le cas d'égalité passe dans la négation",
        },
        {
          prop: "$x \\le -2$",
          neg: "$x > -2$",
          faux: ["$x \\ge -2$", "$x < -2$", "$x \\neq -2$"],
          pourquoi: "la négation d'un « inférieur ou égal » est un « strictement supérieur »",
        },
        {
          prop: "tous les élèves sont présents",
          neg: "au moins un élève est absent",
          faux: ["aucun élève n'est présent", "tous les élèves sont absents", "la moitié est absente"],
          pourquoi: "une seule absence suffit à contredire « tous »",
        },
        {
          prop: "$a > 0$ et $b > 0$",
          neg: "$a \\le 0$ ou $b \\le 0$",
          faux: ["$a \\le 0$ et $b \\le 0$", "$a < 0$ ou $b < 0$", "$a \\ge 0$ ou $b \\ge 0$"],
          pourquoi: "nier un « et » donne un « ou », et chaque inégalité stricte devient large",
        },
        {
          prop: "il existe un entier vérifiant $P$",
          neg: "aucun entier ne vérifie $P$",
          faux: ["tous les entiers vérifient $P$", "il existe un entier ne vérifiant pas $P$", "un seul entier vérifie $P$"],
          pourquoi: "nier une existence, c'est affirmer que la propriété échoue pour tous",
        },
      ];
      const c = pickOne(cas);
      return {
        text: `Quelle est la négation de « ${c.prop} » ?`,
        format: "qcm",
        choices: [c.neg, ...c.faux],
        expected: [c.neg],
        comparator: "mcq_exact",
        explanation: exp(
          "La négation décrit exactement tous les cas où la proposition est fausse.",
          "On fait basculer le quantificateur ou le connecteur, et on n'oublie pas le cas d'égalité.",
          `Ici : ${c.pourquoi}.`,
          `La négation est « ${c.neg} ».`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "premiere_log_neg_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_negation",
    difficulty: 5,
    theme: "neutral",
    hint: "Fais basculer le quantificateur ou le connecteur, et surveille le cas d'égalité.",
    tags: ["premiere", "maths", "logique", "negation", "open", "template"],
    generate: () => {
      const cas = [
        {
          prop: "tous les nombres premiers sont impairs",
          mots: ["il existe", "2", "pair", "négation"],
          verdict:
            "Négation : « il existe un nombre premier qui est pair ». C'est la NÉGATION qui est vraie, grâce à $2$.",
        },
        {
          prop: "pour tout réel $x$, $x^2 > 0$",
          mots: ["il existe", "0", "négation", "vraie"],
          verdict:
            "Négation : « il existe un réel $x$ tel que $x^2 \\le 0$ ». Elle est vraie : $x = 0$ donne $x^2 = 0$.",
        },
        {
          prop: "il existe un réel dont le carré vaut $-4$",
          mots: ["pour tout", "aucun", "négation", "positif"],
          verdict:
            "Négation : « pour tout réel $x$, $x^2 \\neq -4$ ». C'est la négation qui est vraie, un carré n'étant jamais négatif.",
        },
        {
          prop: "tous les élèves de la classe ont rendu le devoir",
          mots: ["au moins un", "n'a pas", "négation", "exception"],
          verdict:
            "Négation : « au moins un élève n'a pas rendu le devoir » — et non « aucun n'a rendu », qui serait bien plus fort.",
        },
        {
          prop: "toutes les fonctions dérivables sont croissantes",
          mots: ["il existe", "décroissante", "négation", "contre-exemple"],
          verdict:
            "Négation : « il existe une fonction dérivable qui n'est pas croissante ». Elle est vraie : $f(x) = -x$ convient.",
        },
      ];
      const c = pickOne(cas);
      return {
        text: `Écris la négation de « ${c.prop} », puis dis laquelle des deux propositions est vraie.`,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: exp(
          "Nier une proposition, c'est décrire exactement les cas où elle est fausse : « pour tout » devient « il existe », et réciproquement.",
          "On fait basculer le quantificateur, puis on nie la propriété.",
          c.verdict,
          "Une proposition et sa négation ne peuvent pas être vraies en même temps : exactement l'une des deux l'est."
        ),
      };
    },
  },

  /* ===================== LOG_RAISONNEMENTS ===================== */
  {
    kind: "fixed",
    id: "premiere_log_rai_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_raisonnements",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la contraposée de $P \\Rightarrow Q$ ?",
    format: "qcm",
    choices: [
      "« non $Q$ » $\\Rightarrow$ « non $P$ »",
      "$Q \\Rightarrow P$",
      "« non $P$ » $\\Rightarrow$ « non $Q$ »",
      "$P \\Leftrightarrow Q$",
    ],
    expected: ["« non $Q$ » $\\Rightarrow$ « non $P$ »"],
    comparator: "mcq_exact",
    hint: "On échange ET on nie.",
    explanation: exp(
      "La contraposée s'obtient en échangeant hypothèse et conclusion, puis en niant les deux.",
      "De $P \\Rightarrow Q$ on passe donc à « non $Q$ » $\\Rightarrow$ « non $P$ ».",
      "Échanger sans nier donnerait la réciproque, qui est une tout autre affirmation.",
      "La contraposée est « non $Q$ » $\\Rightarrow$ « non $P$ »."
    ),
    tags: ["premiere", "maths", "logique", "raisonnements", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_rai_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_raisonnements",
    difficulty: 5,
    theme: "neutral",
    text: "Quel est le lien entre une implication et sa contraposée ?",
    format: "qcm",
    choices: [
      "elles sont toujours vraies en même temps",
      "elles ne sont jamais vraies en même temps",
      "aucun lien",
      "la contraposée est vraie seulement si la réciproque l'est",
    ],
    expected: ["elles sont toujours vraies en même temps"],
    comparator: "mcq_exact",
    hint: "C'est ce qui rend le raisonnement par contraposée valable.",
    explanation: exp(
      "Une implication et sa contraposée disent exactement la même chose, formulée autrement.",
      "« Si le sol est mouillé quand il pleut » revient à dire « si le sol est sec, c'est qu'il n'a pas plu ».",
      "Elles sont donc équivalentes : démontrer l'une, c'est démontrer l'autre. C'est tout l'intérêt du raisonnement par contraposée, quand le sens direct est difficile.",
      "Elles sont toujours vraies en même temps."
    ),
    tags: ["premiere", "maths", "logique", "raisonnements", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_rai_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_raisonnements",
    difficulty: 4,
    theme: "neutral",
    text: "En quoi consiste un raisonnement par l'absurde ?",
    format: "qcm",
    choices: [
      "supposer le contraire de ce qu'on veut prouver, puis aboutir à une contradiction",
      "essayer tous les cas possibles",
      "chercher un contre-exemple",
      "démontrer la réciproque",
    ],
    expected: [
      "supposer le contraire de ce qu'on veut prouver, puis aboutir à une contradiction",
    ],
    comparator: "mcq_exact",
    hint: "On part de la négation de ce qu'on cherche.",
    explanation: exp(
      "Le raisonnement par l'absurde part de la NÉGATION de ce qu'on veut établir.",
      "On mène alors les calculs jusqu'à une contradiction : un énoncé manifestement faux, comme $1 = 0$.",
      "Cette contradiction prouve que l'hypothèse de départ était intenable : la proposition initiale est donc vraie. C'est ainsi qu'on démontre que $\\sqrt{2}$ n'est pas une fraction.",
      "On suppose le contraire, puis on aboutit à une contradiction."
    ),
    tags: ["premiere", "maths", "logique", "raisonnements", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_rai_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_raisonnements",
    difficulty: 4,
    theme: "neutral",
    text: "Dans un raisonnement par disjonction de cas, quelle condition les cas doivent-ils remplir ?",
    format: "qcm",
    choices: [
      "couvrir toutes les possibilités",
      "être au nombre de deux",
      "être de même probabilité",
      "s'exclure mutuellement, sans plus",
    ],
    expected: ["couvrir toutes les possibilités"],
    comparator: "mcq_exact",
    hint: "Que se passe-t-il si un cas est oublié ?",
    explanation: exp(
      "La disjonction de cas découpe le problème en situations qu'on traite séparément.",
      "Pour que la conclusion vaille dans TOUS les cas, le découpage ne doit rien laisser de côté.",
      "Exemple classique : traiter $x \\ge 0$ puis $x < 0$ — ensemble, ces deux cas couvrent tout $\\mathbb{R}$. Si un cas manque, la démonstration est incomplète.",
      "Les cas doivent couvrir toutes les possibilités."
    ),
    tags: ["premiere", "maths", "logique", "raisonnements", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_rai_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_raisonnements",
    difficulty: 5,
    theme: "neutral",
    text: "Quelle est la contraposée de « si $n^2$ est pair, alors $n$ est pair » ?",
    format: "qcm",
    choices: [
      "si $n$ est impair, alors $n^2$ est impair",
      "si $n$ est pair, alors $n^2$ est pair",
      "si $n^2$ est impair, alors $n$ est impair",
      "si $n$ est impair, alors $n^2$ est pair",
    ],
    expected: ["si $n$ est impair, alors $n^2$ est impair"],
    comparator: "mcq_exact",
    hint: "On échange les deux propositions et on nie chacune : la négation de « pair » est « impair ».",
    explanation: exp(
      "La contraposée de $P \\Rightarrow Q$ est « non $Q$ » $\\Rightarrow$ « non $P$ ».",
      "Ici $P$ est « $n^2$ est pair » et $Q$ est « $n$ est pair ».",
      "On obtient : si $n$ n'est pas pair — donc impair — alors $n^2$ n'est pas pair, donc impair. C'est cette version qu'on démontre en pratique, car elle se calcule directement : $(2k+1)^2 = 4k^2+4k+1$.",
      "La contraposée est : si $n$ est impair, alors $n^2$ est impair."
    ),
    tags: ["premiere", "maths", "logique", "raisonnements", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_rai_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_raisonnements",
    difficulty: 5,
    theme: "neutral",
    text: "Contraposée et réciproque : laquelle découle automatiquement de l'implication ?",
    format: "qcm",
    choices: [
      "la contraposée : elle est vraie dès que l'implication l'est",
      "la réciproque : elle est vraie dès que l'implication l'est",
      "les deux",
      "aucune des deux",
    ],
    expected: ["la contraposée : elle est vraie dès que l'implication l'est"],
    comparator: "mcq_exact",
    hint: "L'une est une reformulation, l'autre une affirmation nouvelle.",
    explanation: exp(
      "Les deux transformations n'ont pas le même statut.",
      "La contraposée dit la même chose que l'implication, autrement : elle est donc vraie en même temps qu'elle, automatiquement.",
      "La réciproque, elle, affirme quelque chose de neuf, qu'il faut démontrer séparément — et qui est souvent faux.",
      "C'est la contraposée qui découle automatiquement."
    ),
    tags: ["premiere", "maths", "logique", "raisonnements", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_log_rai_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_raisonnements",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi démontrer la contraposée d'une implication suffit à démontrer l'implication elle-même.",
    format: "open",
    expected: ["équivalentes", "même chose", "contraposée", "vraies en même temps"],
    comparator: "contains_keyword",
    hint: "Que dit exactement « si le sol est sec, c'est qu'il n'a pas plu » ?",
    explanation: exp(
      "Une implication et sa contraposée sont deux formulations de la même affirmation.",
      "Dire « s'il pleut, le sol est mouillé » ou « si le sol est sec, il n'a pas plu » revient au même : dans les deux cas, on exclut la situation « il pleut et le sol est sec ».",
      "Comme elles sont vraies exactement dans les mêmes cas, démontrer l'une établit l'autre. On choisit alors la version la plus commode à calculer.",
      "Les deux formulations sont équivalentes : démontrer l'une, c'est démontrer l'autre."
    ),
    tags: ["premiere", "maths", "logique", "raisonnements", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_log_rai_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_raisonnements",
    difficulty: 5,
    theme: "neutral",
    text: "Explique le principe du raisonnement par l'absurde en t'appuyant sur la preuve que $\\sqrt{2}$ n'est pas une fraction.",
    format: "open",
    expected: ["contradiction", "suppose", "fraction", "irréductible"],
    comparator: "contains_keyword",
    hint: "Par quoi commence la démonstration ? Par ce qu'on veut prouver, ou par son contraire ?",
    explanation: exp(
      "Le raisonnement par l'absurde suppose le contraire de ce qu'on veut établir, puis en tire une contradiction.",
      "Ici, on suppose que $\\sqrt{2}$ s'écrit $\\dfrac{a}{b}$, fraction irréductible.",
      "En élevant au carré, on montre que $a$ puis $b$ sont tous deux pairs — donc la fraction n'était pas irréductible. C'est une contradiction : l'hypothèse de départ est intenable.",
      "La contradiction prouve que $\\sqrt{2}$ ne peut pas s'écrire comme une fraction."
    ),
    tags: ["premiere", "maths", "logique", "raisonnements", "open"],
  },
  {
    kind: "template",
    id: "premiere_log_rai_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_raisonnements",
    difficulty: 5,
    theme: "neutral",
    hint: "On échange les deux propositions ET on nie chacune d'elles.",
    tags: ["premiere", "maths", "logique", "raisonnements", "template"],
    generate: () => {
      const cas = [
        {
          p: "$n$ est divisible par $3$",
          q: "$n$ est divisible par $9$",
          contra: "si $n$ n'est pas divisible par $9$, alors $n$ n'est pas divisible par $3$",
          reciproque: "si $n$ est divisible par $9$, alors $n$ est divisible par $3$",
        },
        {
          p: "$x > 4$",
          q: "$x > 1$",
          contra: "si $x \\le 1$, alors $x \\le 4$",
          reciproque: "si $x > 1$, alors $x > 4$",
        },
        {
          p: "$ABCD$ est un carré",
          q: "$ABCD$ est un losange",
          contra: "si $ABCD$ n'est pas un losange, alors ce n'est pas un carré",
          reciproque: "si $ABCD$ est un losange, alors c'est un carré",
        },
        {
          p: "$f$ est dérivable en $a$",
          q: "$f$ est continue en $a$",
          contra: "si $f$ n'est pas continue en $a$, alors $f$ n'est pas dérivable en $a$",
          reciproque: "si $f$ est continue en $a$, alors $f$ est dérivable en $a$",
        },
      ];
      const c = pickOne(cas);
      return {
        text: `Quelle est la CONTRAPOSÉE de « si ${c.p}, alors ${c.q} » ?`,
        format: "qcm",
        choices: [
          c.contra,
          c.reciproque,
          `si ${c.p}, alors ${c.q}`,
          `si ${c.p} n'est pas vrai, alors ${c.q} n'est pas vrai`,
        ],
        expected: [c.contra],
        comparator: "mcq_exact",
        explanation: exp(
          "La contraposée de $P \\Rightarrow Q$ est « non $Q$ » $\\Rightarrow$ « non $P$ » : on échange ET on nie.",
          "Échanger sans nier donnerait la réciproque ; nier sans échanger ne donnerait rien de valable.",
          `Ici, la contraposée s'écrit : ${c.contra}.`,
          "Elle est vraie exactement quand l'implication de départ l'est."
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_log_rai_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "logique_ensembles",
    microId: "log_raisonnements",
    difficulty: 5,
    theme: "neutral",
    hint: "Nomme le raisonnement, puis dis par quoi il commence.",
    tags: ["premiere", "maths", "logique", "raisonnements", "open", "template"],
    generate: () => {
      const cas = [
        {
          situation:
            "démontrer que si $n^2$ est pair, alors $n$ est pair",
          mots: ["contraposée", "impair", "équivalent", "carré"],
          reponse:
            "On passe par la CONTRAPOSÉE : « si $n$ est impair, alors $n^2$ est impair ». Elle se calcule directement, car $(2k+1)^2 = 4k^2+4k+1$ est impair. Comme contraposée et implication sont équivalentes, c'est démontré.",
        },
        {
          situation: "démontrer que $\\sqrt{2}$ n'est pas une fraction",
          mots: ["absurde", "contradiction", "irréductible", "suppose"],
          reponse:
            "On raisonne par l'ABSURDE : on suppose que $\\sqrt{2} = \\dfrac{a}{b}$ avec une fraction irréductible, et on aboutit à ce que $a$ et $b$ soient tous deux pairs — contradiction avec l'irréductibilité.",
        },
        {
          situation: "étudier le signe de $|x|$ selon les valeurs de $x$",
          mots: ["disjonction", "cas", "positif", "négatif"],
          reponse:
            "On procède par DISJONCTION DE CAS : on traite $x \\ge 0$, où $|x| = x$, puis $x < 0$, où $|x| = -x$. Les deux cas couvrent tout $\\mathbb{R}$.",
        },
        {
          situation:
            "démontrer que si un produit $ab$ est impair, alors $a$ et $b$ sont impairs",
          mots: ["contraposée", "pair", "produit", "équivalent"],
          reponse:
            "Par CONTRAPOSÉE : si $a$ ou $b$ est pair, alors le produit $ab$ est pair — ce qui est immédiat. L'implication de départ est donc vraie.",
        },
      ];
      const c = pickOne(cas);
      return {
        text: `Quel type de raisonnement utiliserais-tu pour ${c.situation} ? Explique comment il commence.`,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: exp(
          "Trois raisonnements du programme : par contraposée (on échange et on nie), par l'absurde (on suppose le contraire), par disjonction de cas (on découpe).",
          "On choisit celui qui rend la démonstration la plus directe.",
          c.reponse,
          "Le choix du raisonnement fait souvent toute la différence entre une preuve simple et une preuve impossible."
        ),
      };
    },
  },
];
