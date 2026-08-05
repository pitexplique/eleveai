// lib/tutor-v4/questionBank/seconde/maths/droites-plan.bank.ts
//
// Chapitre : Droites du plan (notion droites_plan)
//
// REGLE DE DESIGN (option D) : fixed=remarquable/definition, templates dominants,
// QCM-raisonnement, short numerique (calculatrice dispo), pas d'open.
// Canvas : "fonctionGraphique" (courbe type "affine") pour tracer une droite.
//
// microSkills (>= 10 items chacun, difficultes 1->5) :
//   droite_pente_ordonne       — Lire pente et ordonnee a l'origine
//   droite_vecteur_directeur   — Determiner un vecteur directeur
//   droite_equation_reduite    — Determiner une equation reduite
//   droite_equation_cartesienne— Determiner / utiliser une equation cartesienne
//   droite_parallelisme        — Parallelisme via le coefficient directeur
//   droite_intersection        — Trouver l'intersection de deux droites
//   droite_systeme             — Resoudre un systeme 2x2

import type { TutorBankItemV4, CanvasFigure } from "@/lib/tutor-v4/types";

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

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return (
    `Définition : ${definition}\n\n` +
    `Méthode : ${methode}\n\n` +
    `Calcul / Observation : ${calcul}\n\n` +
    `Conclusion : ${conclusion}`
  );
}

// Trace la droite y = ax + b dans un repere orthonorme.
function droiteCanvas(a: number, b: number): CanvasFigure {
  return {
    kind: "fonctionGraphique",
    size: { width: 300, height: 300 },
    xmin: -6,
    xmax: 6,
    ymin: -6,
    ymax: 6,
    grille: true,
    courbes: [{ id: "d", type: "affine", a, b, couleur: "#2563eb" }],
  };
}

export const droitesPlanBank: TutorBankItemV4[] = [
  /* ===================== DROITE_PENTE_ORDONNE ===================== */

  {
    kind: "fixed",
    id: "seconde_droite_pente_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "droites_plan",
    microId: "droite_pente_ordonne",
    difficulty: 1,
    theme: "neutral",
    text: "Dans l'équation $y = ax + b$, que représente $a$ ?",
    format: "qcm",
    choices: [
      "Le coefficient directeur (la pente)",
      "L'ordonnée à l'origine",
      "L'abscisse à l'origine",
      "La longueur de la droite",
    ],
    expected: ["Le coefficient directeur (la pente)"],
    comparator: "mcq_exact",
    hint: "$a$ indique l'inclinaison de la droite.",
    explanation: exp(
      "L'équation réduite $y = ax + b$ a deux paramètres.",
      "$a$ mesure l'inclinaison de la droite.",
      "C'est le coefficient directeur (la pente).",
      "$a$ est le coefficient directeur."
    ),
    tags: ["seconde", "maths", "droites", "pente", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_droite_pente_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "droites_plan",
    microId: "droite_pente_ordonne",
    difficulty: 1,
    theme: "neutral",
    text: "Dans l'équation $y = ax + b$, que représente $b$ ?",
    format: "qcm",
    choices: [
      "L'ordonnée à l'origine (où la droite coupe l'axe des $y$)",
      "Le coefficient directeur",
      "La pente",
      "L'abscisse du point le plus haut",
    ],
    expected: ["L'ordonnée à l'origine (où la droite coupe l'axe des $y$)"],
    comparator: "mcq_exact",
    hint: "C'est la valeur de $y$ quand $x = 0$.",
    explanation: exp(
      "Quand $x = 0$, $y = b$.",
      "La droite coupe alors l'axe des ordonnées en $b$.",
      "$b$ est l'ordonnée à l'origine.",
      "$b$ est l'ordonnée à l'origine."
    ),
    tags: ["seconde", "maths", "droites", "pente", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_droite_pente_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "droites_plan",
    microId: "droite_pente_ordonne",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est le coefficient directeur de la droite $y = 2x + 3$ ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "C'est le nombre devant $x$.",
    explanation: exp(
      "Le coefficient directeur est le facteur de $x$ dans $y = ax + b$.",
      "Ici $a = 2$.",
      "Donc le coefficient directeur vaut $2$.",
      "Le coefficient directeur est $2$."
    ),
    tags: ["seconde", "maths", "droites", "pente", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_droite_pente_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "droites_plan",
    microId: "droite_pente_ordonne",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est l'ordonnée à l'origine de la droite $y = 2x + 3$ ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "C'est la valeur de $b$.",
    explanation: exp(
      "L'ordonnée à l'origine est le terme constant $b$.",
      "Ici $b = 3$.",
      "Donc l'ordonnée à l'origine vaut $3$.",
      "L'ordonnée à l'origine est $3$."
    ),
    tags: ["seconde", "maths", "droites", "pente", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_droite_pente_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "droites_plan",
    microId: "droite_pente_ordonne",
    difficulty: 3,
    theme: "neutral",
    text: "Lis l'ordonnée à l'origine de la droite tracée ci-dessous.",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    canvas: droiteCanvas(1, 2),
    hint: "Regarde où la droite coupe l'axe vertical.",
    explanation: exp(
      "L'ordonnée à l'origine est la valeur de $y$ pour $x = 0$.",
      "On lit le point où la droite croise l'axe des ordonnées.",
      "La droite coupe l'axe des $y$ en $2$.",
      "L'ordonnée à l'origine est $2$."
    ),
    tags: ["seconde", "maths", "droites", "pente", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_droite_pente_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "droites_plan",
    microId: "droite_pente_ordonne",
    difficulty: 3,
    theme: "neutral",
    text: "Une droite dont le coefficient directeur est négatif est :",
    format: "qcm",
    choices: ["décroissante (elle descend)", "croissante (elle monte)", "horizontale", "verticale"],
    expected: ["décroissante (elle descend)"],
    comparator: "mcq_exact",
    hint: "Pente négative → la droite descend de gauche à droite.",
    explanation: exp(
      "Le signe du coefficient directeur donne le sens de variation.",
      "Si $a < 0$, $y$ diminue quand $x$ augmente.",
      "La droite descend : elle est décroissante.",
      "Elle est décroissante."
    ),
    tags: ["seconde", "maths", "droites", "pente", "raisonnement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_droite_pente_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "droites_plan",
    microId: "droite_pente_ordonne",
    difficulty: 2,
    theme: "neutral",
    hint: "Le coefficient directeur est le nombre devant $x$.",
    tags: ["seconde", "maths", "droites", "pente", "template"],
    generate: () => {
      const a = randomInt(-5, 5) || 2;
      const b = randomInt(-5, 5);
      const signe = b >= 0 ? `+ ${b}` : `- ${-b}`;
      return {
        text: `Quel est le coefficient directeur de la droite $y = ${a}x ${signe}$ ?`,
        format: "short",
        expected: [String(a)],
        comparator: "number_equal",
        explanation: exp(
          "Le coefficient directeur est le facteur de $x$.",
          `Dans $y = ${a}x ${signe}$, ce facteur est $${a}$.`,
          `Donc le coefficient directeur vaut $${a}$.`,
          `Le coefficient directeur est $${a}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_droite_pente_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "droites_plan",
    microId: "droite_pente_ordonne",
    difficulty: 2,
    theme: "neutral",
    hint: "L'ordonnée à l'origine est le terme constant.",
    tags: ["seconde", "maths", "droites", "pente", "template"],
    generate: () => {
      const a = randomInt(-5, 5) || 2;
      const b = randomInt(-5, 5);
      const signe = b >= 0 ? `+ ${b}` : `- ${-b}`;
      return {
        text: `Quelle est l'ordonnée à l'origine de la droite $y = ${a}x ${signe}$ ?`,
        format: "short",
        expected: [String(b)],
        comparator: "number_equal",
        explanation: exp(
          "L'ordonnée à l'origine est le terme constant $b$.",
          `Dans $y = ${a}x ${signe}$, $b = ${b}$.`,
          `Donc l'ordonnée à l'origine vaut $${b}$.`,
          `L'ordonnée à l'origine est $${b}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_droite_pente_tpl_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "droites_plan",
    microId: "droite_pente_ordonne",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde où la droite croise l'axe vertical.",
    tags: ["seconde", "maths", "droites", "pente", "template"],
    generate: () => {
      const a = randomInt(1, 2);
      const b = randomInt(-3, 3);
      return {
        text: "Lis l'ordonnée à l'origine de la droite tracée ci-dessous.",
        format: "short",
        expected: [String(b)],
        comparator: "number_equal",
        canvas: droiteCanvas(a, b),
        explanation: exp(
          "L'ordonnée à l'origine est la valeur de $y$ pour $x = 0$.",
          "On repère l'intersection avec l'axe des ordonnées.",
          `La droite coupe l'axe des $y$ en $${b}$.`,
          `L'ordonnée à l'origine est $${b}$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_droite_pente_fixed_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "droites_plan",
    microId: "droite_pente_ordonne",
    difficulty: 2,
    theme: "neutral",
    text: "Une droite d'équation $y = 4$ (sans terme en $x$) est :",
    format: "qcm",
    choices: ["horizontale", "verticale", "oblique montante", "oblique descendante"],
    expected: ["horizontale"],
    comparator: "mcq_exact",
    hint: "Le coefficient directeur est nul.",
    explanation: exp(
      "Ici $a = 0$ : $y$ vaut toujours $4$.",
      "La hauteur est constante quel que soit $x$.",
      "La droite est donc horizontale.",
      "Elle est horizontale."
    ),
    tags: ["seconde", "maths", "droites", "pente", "raisonnement", "qcm"],
  },

  /* ===================== DROITE_VECTEUR_DIRECTEUR ===================== */

  {
    kind: "fixed",
    id: "seconde_droite_vd_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "droites_plan",
    microId: "droite_vecteur_directeur",
    difficulty: 2,
    theme: "neutral",
    text: "Qu'est-ce qu'un vecteur directeur d'une droite ?",
    format: "qcm",
    choices: [
      "Un vecteur non nul qui donne la direction de la droite",
      "Un vecteur perpendiculaire à la droite",
      "Un vecteur de longueur $1$",
      "Le vecteur qui relie l'origine à la droite",
    ],
    expected: ["Un vecteur non nul qui donne la direction de la droite"],
    comparator: "mcq_exact",
    hint: "Il « pointe » dans le sens de la droite.",
    explanation: exp(
      "Un vecteur directeur indique la direction de la droite.",
      "Il doit être non nul et parallèle à la droite.",
      "Tous les vecteurs directeurs d'une droite sont colinéaires.",
      "C'est un vecteur non nul qui donne la direction de la droite."
    ),
    tags: ["seconde", "maths", "droites", "vecteur_directeur", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_droite_vd_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "droites_plan",
    microId: "droite_vecteur_directeur",
    difficulty: 3,
    theme: "neutral",
    text: "Pour la droite $y = 2x + 3$, quel est un vecteur directeur ?",
    format: "qcm",
    choices: ["$\\vec{u}(1\\,;2)$", "$\\vec{u}(2\\,;1)$", "$\\vec{u}(1\\,;3)$", "$\\vec{u}(0\\,;2)$"],
    expected: ["$\\vec{u}(1\\,;2)$"],
    comparator: "mcq_exact",
    hint: "Pour $y = ax + b$, un vecteur directeur est $(1\\,;a)$.",
    explanation: exp(
      "Pour une droite d'équation réduite $y = ax + b$, $\\vec{u}(1\\,;a)$ est directeur.",
      "Ici $a = 2$.",
      "Donc $\\vec{u}(1\\,;2)$.",
      "Un vecteur directeur est $\\vec{u}(1\\,;2)$."
    ),
    tags: ["seconde", "maths", "droites", "vecteur_directeur", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_droite_vd_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "droites_plan",
    microId: "droite_vecteur_directeur",
    difficulty: 3,
    theme: "neutral",
    text: "Deux vecteurs directeurs d'une même droite sont toujours :",
    format: "qcm",
    choices: ["colinéaires", "orthogonaux", "de même norme", "opposés"],
    expected: ["colinéaires"],
    comparator: "mcq_exact",
    hint: "Ils ont la même direction.",
    explanation: exp(
      "Les vecteurs directeurs partagent la direction de la droite.",
      "Deux vecteurs de même direction sont colinéaires.",
      "Ils peuvent différer par la longueur ou le sens, mais restent colinéaires.",
      "Ils sont colinéaires."
    ),
    tags: ["seconde", "maths", "droites", "vecteur_directeur", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_droite_vd_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "droites_plan",
    microId: "droite_vecteur_directeur",
    difficulty: 4,
    theme: "neutral",
    text: "La droite passant par $A(1\\,;2)$ et $B(4\\,;8)$ admet pour vecteur directeur $\\vec{AB}$. Quelles sont ses coordonnées ?",
    format: "qcm",
    choices: ["$(3\\,;6)$", "$(5\\,;10)$", "$(3\\,;10)$", "$(-3\\,;-6)$"],
    expected: ["$(3\\,;6)$"],
    comparator: "mcq_exact",
    hint: "$\\vec{AB}(x_B - x_A\\,;y_B - y_A)$.",
    explanation: exp(
      "Le vecteur $\\vec{AB}$ est un vecteur directeur de la droite $(AB)$.",
      "$\\vec{AB}(x_B - x_A\\,;y_B - y_A) = (4 - 1\\,;8 - 2)$.",
      "$= (3\\,;6)$.",
      "Un vecteur directeur est $(3\\,;6)$."
    ),
    tags: ["seconde", "maths", "droites", "vecteur_directeur", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_droite_vd_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "droites_plan",
    microId: "droite_vecteur_directeur",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour $y = ax + b$, un vecteur directeur est $(1\\,;a)$.",
    tags: ["seconde", "maths", "droites", "vecteur_directeur", "template"],
    generate: () => {
      // Les pièges sont « on échange les deux coordonnées », « on prend
      // l'ordonnée à l'origine » et « on met 0 en abscisse ». Avec a = 1 le
      // premier s'écrit comme la réponse, avec b = a le deuxième.
      let a = randomInt(-4, 4);
      while (a === 0 || a === 1) a = randomInt(-4, 4);
      let b = randomInt(-4, 4);
      while (b === a) b = randomInt(-4, 4);
      const signe = b >= 0 ? `+ ${b}` : `- ${-b}`;
      const correct = `$\\vec{u}(1\\,;${a})$`;
      const choices = [correct, `$\\vec{u}(${a}\\,;1)$`, `$\\vec{u}(1\\,;${b})$`, `$\\vec{u}(0\\,;${a})$`];
      return {
        text: `Pour la droite $y = ${a}x ${signe}$, quel est un vecteur directeur ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour $y = ax + b$, le vecteur $(1\\,;a)$ est directeur.",
          `Ici $a = ${a}$.`,
          `Donc $\\vec{u}(1\\,;${a})$.`,
          `Un vecteur directeur est $\\vec{u}(1\\,;${a})$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_droite_vd_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "droites_plan",
    microId: "droite_vecteur_directeur",
    difficulty: 4,
    theme: "neutral",
    hint: "$\\vec{AB}(x_B - x_A\\,;y_B - y_A)$.",
    tags: ["seconde", "maths", "droites", "vecteur_directeur", "template"],
    generate: () => {
      const xa = randomInt(-3, 3);
      const ya = randomInt(-3, 3);
      const dx = randomInt(1, 5);
      const dy = randomInt(-5, 5) || 2;
      const xb = xa + dx;
      const yb = ya + dy;
      const correct = `$(${dx}\\,;${dy})$`;
      // Quand les deux déplacements sont égaux, « on a interverti » donne la
      // bonne réponse : d'où le piège de signe sur l'ordonnée, gardé en
      // réserve.
      const choices = makeChoices(correct, [
        `$(${dy}\\,;${dx})$`,
        `$(${xb}\\,;${yb})$`,
        `$(${-dx}\\,;${dy})$`,
        `$(${dx}\\,;${-dy})$`,
      ]);
      return {
        text: `La droite passant par $A(${xa}\\,;${ya})$ et $B(${xb}\\,;${yb})$ a pour vecteur directeur $\\vec{AB}$. Quelles sont ses coordonnées ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On calcule $\\vec{AB}(x_B - x_A\\,;y_B - y_A)$.",
          `$(${xb} - ${xa}\\,;${yb} - ${ya})$.`,
          `$= (${dx}\\,;${dy})$.`,
          `Un vecteur directeur est $(${dx}\\,;${dy})$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_droite_vd_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "droites_plan",
    microId: "droite_vecteur_directeur",
    difficulty: 4,
    theme: "neutral",
    text: "Un vecteur directeur de la droite $y = 2x + 3$ est $(1\\,;2)$. Le vecteur $(2\\,;4)$ est-il aussi directeur de cette droite ?",
    format: "qcm",
    choices: ["Oui, car il est colinéaire à $(1\\,;2)$", "Non", "Oui, car il est orthogonal", "Non, car trop grand"],
    expected: ["Oui, car il est colinéaire à $(1\\,;2)$"],
    comparator: "mcq_exact",
    hint: "$(2\\,;4) = 2 \\times (1\\,;2)$.",
    explanation: exp(
      "Tout vecteur colinéaire à un vecteur directeur est aussi directeur.",
      "$(2\\,;4) = 2 \\times (1\\,;2)$ : ils sont colinéaires.",
      "Donc $(2\\,;4)$ donne la même direction.",
      "Oui, car il est colinéaire à $(1\\,;2)$."
    ),
    tags: ["seconde", "maths", "droites", "vecteur_directeur", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_droite_vd_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "droites_plan",
    microId: "droite_vecteur_directeur",
    difficulty: 3,
    theme: "neutral",
    text: "Pour la droite $y = -3x + 1$, quel est un vecteur directeur ?",
    format: "qcm",
    choices: ["$\\vec{u}(1\\,;-3)$", "$\\vec{u}(-3\\,;1)$", "$\\vec{u}(1\\,;3)$", "$\\vec{u}(1\\,;1)$"],
    expected: ["$\\vec{u}(1\\,;-3)$"],
    comparator: "mcq_exact",
    hint: "$(1\\,;a)$ avec $a = -3$.",
    explanation: exp(
      "Pour $y = ax + b$, un vecteur directeur est $(1\\,;a)$.",
      "Ici $a = -3$.",
      "Donc $\\vec{u}(1\\,;-3)$.",
      "Un vecteur directeur est $\\vec{u}(1\\,;-3)$."
    ),
    tags: ["seconde", "maths", "droites", "vecteur_directeur", "qcm"],
  },

  /* ===================== DROITE_EQUATION_REDUITE ===================== */

  {
    kind: "fixed",
    id: "seconde_droite_red_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "droites_plan",
    microId: "droite_equation_reduite",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est la forme générale d'une équation réduite de droite (non verticale) ?",
    format: "qcm",
    choices: ["$y = ax + b$", "$ax + by + c = 0$", "$x = ay + b$", "$y = ax^2 + b$"],
    expected: ["$y = ax + b$"],
    comparator: "mcq_exact",
    hint: "$y$ est exprimé en fonction de $x$.",
    explanation: exp(
      "L'équation réduite exprime $y$ en fonction de $x$.",
      "Elle fait apparaître pente et ordonnée à l'origine.",
      "C'est $y = ax + b$.",
      "La forme réduite est $y = ax + b$."
    ),
    tags: ["seconde", "maths", "droites", "equation_reduite", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_droite_red_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "droites_plan",
    microId: "droite_equation_reduite",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle droite a pour coefficient directeur $2$ et pour ordonnée à l'origine $-1$ ?",
    format: "qcm",
    choices: ["$y = 2x - 1$", "$y = -x + 2$", "$y = 2x + 1$", "$y = x - 2$"],
    expected: ["$y = 2x - 1$"],
    comparator: "mcq_exact",
    hint: "$y = ax + b$ avec $a = 2$ et $b = -1$.",
    explanation: exp(
      "On remplace $a$ et $b$ dans $y = ax + b$.",
      "$a = 2$, $b = -1$.",
      "$y = 2x - 1$.",
      "L'équation est $y = 2x - 1$."
    ),
    tags: ["seconde", "maths", "droites", "equation_reduite", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_droite_red_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "droites_plan",
    microId: "droite_equation_reduite",
    difficulty: 4,
    theme: "neutral",
    text: "Une droite passe par $A(0\\,;1)$ et $B(2\\,;5)$. Quelle est son équation réduite ?",
    format: "qcm",
    choices: ["$y = 2x + 1$", "$y = 2x + 5$", "$y = x + 1$", "$y = 4x + 1$"],
    expected: ["$y = 2x + 1$"],
    comparator: "mcq_exact",
    hint: "Pente $a = \\dfrac{y_B - y_A}{x_B - x_A}$ ; $b$ se lit en $A(0\\,;1)$.",
    explanation: exp(
      "On calcule la pente puis l'ordonnée à l'origine.",
      "$a = \\dfrac{5 - 1}{2 - 0} = 2$ ; comme $A(0\\,;1)$, $b = 1$.",
      "$y = 2x + 1$.",
      "L'équation réduite est $y = 2x + 1$."
    ),
    tags: ["seconde", "maths", "droites", "equation_reduite", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_droite_red_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "droites_plan",
    microId: "droite_equation_reduite",
    difficulty: 2,
    theme: "neutral",
    hint: "$y = ax + b$ avec la pente et l'ordonnée à l'origine données.",
    tags: ["seconde", "maths", "droites", "equation_reduite", "template"],
    generate: () => {
      const a = randomInt(-4, 4) || 2;
      // Les pièges sont « on échange a et b », « on change le signe de b » et
      // « on change le signe de a ». Avec b = 0 le deuxième piège s'écrit comme
      // la réponse (+ 0 et - 0 se lisent pareil), avec b = a le premier, avec
      // b = -a le premier tombe sur le troisième.
      let b = randomInt(-4, 4);
      while (b === 0 || b === a || b === -a) b = randomInt(-4, 4);
      const sb = b >= 0 ? `+ ${b}` : `- ${-b}`;
      const correct = `$y = ${a}x ${sb}$`;
      const sb2 = -b >= 0 ? `+ ${-b}` : `- ${b}`;
      const choices = [correct, `$y = ${b}x ${sb}$`, `$y = ${a}x ${sb2}$`, `$y = ${-a}x ${sb}$`];
      return {
        text: `Quelle droite a pour coefficient directeur $${a}$ et pour ordonnée à l'origine $${b}$ ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On remplace $a$ et $b$ dans $y = ax + b$.",
          `$a = ${a}$, $b = ${b}$.`,
          `$y = ${a}x ${sb}$.`,
          `L'équation est $y = ${a}x ${sb}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_droite_red_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "droites_plan",
    microId: "droite_equation_reduite",
    difficulty: 4,
    theme: "neutral",
    hint: "Pente = écart des ordonnées / écart des abscisses.",
    tags: ["seconde", "maths", "droites", "equation_reduite", "template"],
    generate: () => {
      const a = randomInt(1, 4);
      const b = randomInt(-3, 3);
      // Deux pièges portent sur la pente : « on prend l'abscisse de B » et
      // « on se trompe d'un ». Si xb vaut a, le premier s'écrit comme la
      // réponse ; s'il vaut a + 1, les deux pièges sont le même.
      let xb = randomInt(2, 4);
      while (xb === a || xb === a + 1) xb = randomInt(2, 4);
      const yb = a * xb + b;
      const sb = b >= 0 ? `+ ${b}` : `- ${-b}`;
      const correct = `$y = ${a}x ${sb}$`;
      const choices = [correct, `$y = ${xb}x ${sb}$`, `$y = ${a}x + ${yb}$`, `$y = ${a + 1}x ${sb}$`];
      return {
        text: `Une droite passe par $A(0\\,;${b})$ et $B(${xb}\\,;${yb})$. Quelle est son équation réduite ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On calcule la pente, puis on lit l'ordonnée à l'origine en $A(0\\,;b)$.",
          `$a = \\dfrac{${yb} - ${b}}{${xb} - 0} = ${a}$ ; $b = ${b}$.`,
          `$y = ${a}x ${sb}$.`,
          `L'équation réduite est $y = ${a}x ${sb}$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_droite_red_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "droites_plan",
    microId: "droite_equation_reduite",
    difficulty: 3,
    theme: "neutral",
    text: "Le point $A(2\\,;7)$ appartient-il à la droite $y = 3x + 1$ ?",
    format: "qcm",
    choices: ["Oui, car $3 \\times 2 + 1 = 7$", "Non", "Oui, car $2 + 7 = 9$", "On ne peut pas savoir"],
    expected: ["Oui, car $3 \\times 2 + 1 = 7$"],
    comparator: "mcq_exact",
    hint: "On remplace $x$ par $2$ et on compare à $y$.",
    explanation: exp(
      "Un point appartient à la droite si ses coordonnées vérifient l'équation.",
      "On calcule $3 \\times 2 + 1 = 7$.",
      "Cela donne bien $y = 7$, l'ordonnée de $A$.",
      "Oui, $A$ appartient à la droite."
    ),
    tags: ["seconde", "maths", "droites", "equation_reduite", "raisonnement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_droite_red_tpl_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "droites_plan",
    microId: "droite_equation_reduite",
    difficulty: 3,
    theme: "neutral",
    hint: "On remplace $x$ par l'abscisse du point.",
    tags: ["seconde", "maths", "droites", "equation_reduite", "template"],
    generate: () => {
      const a = randomInt(2, 4);
      const b = randomInt(-3, 3);
      const x = randomInt(1, 4);
      const y = a * x + b;
      const appartient = Math.random() < 0.5;
      const yAffiche = appartient ? y : y + randomInt(1, 3);
      const sb = b >= 0 ? `+ ${b}` : `- ${-b}`;
      return {
        text: `Le point $A(${x}\\,;${yAffiche})$ appartient-il à la droite $y = ${a}x ${sb}$ ?`,
        format: "qcm",
        choices: ["Oui", "Non"],
        expected: [appartient ? "Oui" : "Non"],
        comparator: "mcq_exact",
        explanation: exp(
          "On vérifie si les coordonnées vérifient l'équation.",
          `On calcule $${a} \\times ${x} ${sb} = ${y}$.`,
          appartient
            ? `Cela donne $${y}$, égal à l'ordonnée $${yAffiche}$.`
            : `Cela donne $${y}$, différent de l'ordonnée $${yAffiche}$.`,
          appartient ? "Oui, le point appartient à la droite." : "Non, le point n'appartient pas à la droite."
        ),
      };
    },
  },

  /* ===================== DROITE_EQUATION_CARTESIENNE ===================== */

  {
    kind: "fixed",
    id: "seconde_droite_cart_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "droites_plan",
    microId: "droite_equation_cartesienne",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la forme générale d'une équation cartésienne de droite ?",
    format: "qcm",
    choices: ["$ax + by + c = 0$", "$y = ax + b$", "$y = ax^2 + bx + c$", "$x + y = 1$ uniquement"],
    expected: ["$ax + by + c = 0$"],
    comparator: "mcq_exact",
    hint: "Tous les termes sont du même côté.",
    explanation: exp(
      "L'équation cartésienne regroupe tous les termes d'un seul côté.",
      "Elle s'écrit $ax + by + c = 0$.",
      "Elle convient aussi aux droites verticales (contrairement à la réduite).",
      "La forme cartésienne est $ax + by + c = 0$."
    ),
    tags: ["seconde", "maths", "droites", "equation_cartesienne", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_droite_cart_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "droites_plan",
    microId: "droite_equation_cartesienne",
    difficulty: 3,
    theme: "neutral",
    text: "Mets l'équation $y = 2x + 3$ sous forme cartésienne.",
    format: "qcm",
    choices: ["$2x - y + 3 = 0$", "$2x + y + 3 = 0$", "$2x - y - 3 = 0$", "$y - 2x = 3$"],
    expected: ["$2x - y + 3 = 0$"],
    comparator: "mcq_exact",
    hint: "On ramène tout d'un seul côté.",
    explanation: exp(
      "On passe tous les termes du même côté.",
      "$y = 2x + 3 \\Rightarrow 2x + 3 - y = 0$.",
      "$2x - y + 3 = 0$.",
      "La forme cartésienne est $2x - y + 3 = 0$."
    ),
    tags: ["seconde", "maths", "droites", "equation_cartesienne", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_droite_cart_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "droites_plan",
    microId: "droite_equation_cartesienne",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est l'équation d'une droite verticale passant par le point d'abscisse $4$ ?",
    format: "qcm",
    choices: ["$x = 4$", "$y = 4$", "$y = 4x$", "$x + y = 4$"],
    expected: ["$x = 4$"],
    comparator: "mcq_exact",
    hint: "Sur une verticale, $x$ est constant.",
    explanation: exp(
      "Une droite verticale a tous ses points avec la même abscisse.",
      "Ici cette abscisse vaut $4$.",
      "L'équation est $x = 4$ (elle n'a pas de forme réduite $y = ax + b$).",
      "L'équation est $x = 4$."
    ),
    tags: ["seconde", "maths", "droites", "equation_cartesienne", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_droite_cart_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "droites_plan",
    microId: "droite_equation_cartesienne",
    difficulty: 4,
    theme: "neutral",
    text: "Pourquoi l'équation cartésienne est-elle plus générale que l'équation réduite ?",
    format: "qcm",
    choices: [
      "Parce qu'elle décrit aussi les droites verticales",
      "Parce qu'elle est plus courte",
      "Parce qu'elle n'a pas de coefficient",
      "Parce qu'elle ne contient pas $x$",
    ],
    expected: ["Parce qu'elle décrit aussi les droites verticales"],
    comparator: "mcq_exact",
    hint: "Une droite verticale n'a pas d'équation $y = ax + b$.",
    explanation: exp(
      "La forme réduite $y = ax + b$ ne marche pas pour une verticale ($x = k$).",
      "La forme $ax + by + c = 0$ inclut ce cas (avec $b = 0$).",
      "Elle décrit donc toutes les droites.",
      "Car elle décrit aussi les droites verticales."
    ),
    tags: ["seconde", "maths", "droites", "equation_cartesienne", "raisonnement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_droite_cart_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "droites_plan",
    microId: "droite_equation_cartesienne",
    difficulty: 3,
    theme: "neutral",
    hint: "On ramène tous les termes d'un seul côté.",
    tags: ["seconde", "maths", "droites", "equation_cartesienne", "template"],
    generate: () => {
      const a = randomInt(2, 5);
      const b = randomInt(1, 5);
      const correct = `$${a}x - y + ${b} = 0$`;
      const choices = [
        correct,
        `$${a}x + y + ${b} = 0$`,
        `$${a}x - y - ${b} = 0$`,
        `$${a}x - y = ${b}$`,
      ];
      return {
        text: `Mets l'équation $y = ${a}x + ${b}$ sous forme cartésienne.`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On passe tous les termes du même côté.",
          `$y = ${a}x + ${b} \\Rightarrow ${a}x + ${b} - y = 0$.`,
          `$${a}x - y + ${b} = 0$.`,
          `La forme cartésienne est $${a}x - y + ${b} = 0$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_droite_cart_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "droites_plan",
    microId: "droite_equation_cartesienne",
    difficulty: 3,
    theme: "neutral",
    hint: "Sur une verticale, $x$ est constant ; sur une horizontale, $y$ est constant.",
    tags: ["seconde", "maths", "droites", "equation_cartesienne", "template"],
    generate: () => {
      const k = randomInt(-5, 5);
      const verticale = Math.random() < 0.5;
      const correct = verticale ? `$x = ${k}$` : `$y = ${k}$`;
      const choices = [`$x = ${k}$`, `$y = ${k}$`, `$y = ${k}x$`, `$x + y = ${k}$`];
      return {
        text: verticale
          ? `Quelle est l'équation de la droite verticale passant par le point d'abscisse $${k}$ ?`
          : `Quelle est l'équation de la droite horizontale passant par le point d'ordonnée $${k}$ ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Sur une droite verticale $x$ est constant ; sur une horizontale $y$ est constant.",
          verticale ? `Ici l'abscisse vaut $${k}$.` : `Ici l'ordonnée vaut $${k}$.`,
          `L'équation est ${correct}.`,
          `${correct}.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_droite_cart_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "droites_plan",
    microId: "droite_equation_cartesienne",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est l'équation d'une droite horizontale passant par le point d'ordonnée $-2$ ?",
    format: "qcm",
    choices: ["$y = -2$", "$x = -2$", "$y = -2x$", "$x + y = -2$"],
    expected: ["$y = -2$"],
    comparator: "mcq_exact",
    hint: "Sur une horizontale, $y$ est constant.",
    explanation: exp(
      "Une droite horizontale a tous ses points avec la même ordonnée.",
      "Ici cette ordonnée vaut $-2$.",
      "L'équation est $y = -2$.",
      "L'équation est $y = -2$."
    ),
    tags: ["seconde", "maths", "droites", "equation_cartesienne", "qcm"],
  },

  /* ===================== DROITE_PARALLELISME ===================== */

  {
    kind: "fixed",
    id: "seconde_droite_par_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "droites_plan",
    microId: "droite_parallelisme",
    difficulty: 2,
    theme: "neutral",
    text: "Deux droites (non verticales) sont parallèles si et seulement si :",
    format: "qcm",
    choices: [
      "elles ont le même coefficient directeur",
      "elles ont la même ordonnée à l'origine",
      "leurs coefficients directeurs sont opposés",
      "elles se croisent",
    ],
    expected: ["elles ont le même coefficient directeur"],
    comparator: "mcq_exact",
    hint: "Même pente = même inclinaison.",
    explanation: exp(
      "Le parallélisme correspond à une même inclinaison.",
      "L'inclinaison est donnée par le coefficient directeur.",
      "Donc deux droites parallèles ont le même coefficient directeur.",
      "Elles ont le même coefficient directeur."
    ),
    tags: ["seconde", "maths", "droites", "parallelisme", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_droite_par_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "droites_plan",
    microId: "droite_parallelisme",
    difficulty: 2,
    theme: "neutral",
    text: "Les droites $y = 2x + 1$ et $y = 2x + 5$ sont-elles parallèles ?",
    format: "qcm",
    choices: ["Oui, même coefficient directeur $2$", "Non", "Oui, même ordonnée à l'origine", "Elles sont confondues"],
    expected: ["Oui, même coefficient directeur $2$"],
    comparator: "mcq_exact",
    hint: "Compare les coefficients directeurs.",
    explanation: exp(
      "On compare les coefficients directeurs.",
      "Les deux valent $2$.",
      "Même pente, ordonnées différentes : droites parallèles (non confondues).",
      "Oui, elles sont parallèles."
    ),
    tags: ["seconde", "maths", "droites", "parallelisme", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_droite_par_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "droites_plan",
    microId: "droite_parallelisme",
    difficulty: 3,
    theme: "neutral",
    text: "Les droites $y = 2x + 1$ et $y = 3x + 1$ sont-elles parallèles ?",
    format: "qcm",
    choices: ["Non, coefficients directeurs différents", "Oui", "Oui, même ordonnée à l'origine", "Elles sont confondues"],
    expected: ["Non, coefficients directeurs différents"],
    comparator: "mcq_exact",
    hint: "Les pentes sont $2$ et $3$.",
    explanation: exp(
      "On compare les coefficients directeurs.",
      "Ils valent $2$ et $3$ : différents.",
      "Donc les droites ne sont pas parallèles (elles se croisent).",
      "Non, elles ne sont pas parallèles."
    ),
    tags: ["seconde", "maths", "droites", "parallelisme", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_droite_par_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "droites_plan",
    microId: "droite_parallelisme",
    difficulty: 3,
    theme: "neutral",
    hint: "Parallèles ⟺ même coefficient directeur.",
    tags: ["seconde", "maths", "droites", "parallelisme", "template"],
    generate: () => {
      const a1 = randomInt(-4, 4) || 2;
      const memePente = Math.random() < 0.5;
      const a2 = memePente ? a1 : (a1 + randomInt(1, 3));
      const b1 = randomInt(-4, 4);
      const b2 = randomInt(-4, 4);
      const s1 = b1 >= 0 ? `+ ${b1}` : `- ${-b1}`;
      const s2 = b2 >= 0 ? `+ ${b2}` : `- ${-b2}`;
      return {
        text: `Les droites $y = ${a1}x ${s1}$ et $y = ${a2}x ${s2}$ sont-elles parallèles ?`,
        format: "qcm",
        choices: ["Oui", "Non"],
        expected: [memePente ? "Oui" : "Non"],
        comparator: "mcq_exact",
        explanation: exp(
          "On compare les coefficients directeurs.",
          `Ici ils valent $${a1}$ et $${a2}$.`,
          memePente ? "Ils sont égaux." : "Ils sont différents.",
          memePente ? "Oui, les droites sont parallèles." : "Non, les droites ne sont pas parallèles."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_droite_par_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "droites_plan",
    microId: "droite_parallelisme",
    difficulty: 4,
    theme: "neutral",
    hint: "Pour être parallèle, il faut le même coefficient directeur.",
    tags: ["seconde", "maths", "droites", "parallelisme", "template"],
    generate: () => {
      const a = randomInt(2, 5);
      const b = randomInt(-4, 4);
      const sb = b >= 0 ? `+ ${b}` : `- ${-b}`;
      const correct = `$y = ${a}x ${sb}$`;
      const choices = [
        correct,
        `$y = ${a + 1}x ${sb}$`,
        `$y = ${-a}x ${sb}$`,
        `$y = ${a + 2}x ${sb}$`,
      ];
      return {
        text: `Parmi ces droites, laquelle est parallèle à $y = ${a}x + 1$ ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Deux droites parallèles ont le même coefficient directeur.",
          `On cherche celle dont le coefficient directeur vaut $${a}$.`,
          `C'est $y = ${a}x ${sb}$.`,
          `La droite parallèle est $y = ${a}x ${sb}$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_droite_par_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "droites_plan",
    microId: "droite_parallelisme",
    difficulty: 4,
    theme: "neutral",
    text: "Deux droites parallèles distinctes ont :",
    format: "qcm",
    choices: [
      "le même coefficient directeur mais des ordonnées à l'origine différentes",
      "exactement la même équation",
      "des coefficients directeurs opposés",
      "un point d'intersection",
    ],
    expected: ["le même coefficient directeur mais des ordonnées à l'origine différentes"],
    comparator: "mcq_exact",
    hint: "Si tout était identique, elles seraient confondues.",
    explanation: exp(
      "Parallèles distinctes = même direction, positions différentes.",
      "Même pente ($a$ identique), mais $b$ différents.",
      "Sinon (même $b$ aussi), elles seraient confondues.",
      "Même coefficient directeur, ordonnées à l'origine différentes."
    ),
    tags: ["seconde", "maths", "droites", "parallelisme", "raisonnement", "qcm"],
  },

  /* ===================== DROITE_INTERSECTION ===================== */

  {
    kind: "fixed",
    id: "seconde_droite_inter_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "droites_plan",
    microId: "droite_intersection",
    difficulty: 2,
    theme: "neutral",
    text: "Le point d'intersection de deux droites est le point dont les coordonnées :",
    format: "qcm",
    choices: [
      "vérifient les deux équations en même temps",
      "vérifient une seule des deux équations",
      "sont les plus grandes",
      "sont nulles",
    ],
    expected: ["vérifient les deux équations en même temps"],
    comparator: "mcq_exact",
    hint: "C'est le point commun aux deux droites.",
    explanation: exp(
      "L'intersection appartient aux deux droites à la fois.",
      "Ses coordonnées vérifient donc les deux équations.",
      "On les trouve en résolvant le système des deux équations.",
      "Elles vérifient les deux équations en même temps."
    ),
    tags: ["seconde", "maths", "droites", "intersection", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_droite_inter_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "droites_plan",
    microId: "droite_intersection",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est l'abscisse du point d'intersection des droites $y = 2x + 1$ et $y = x + 4$ ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "On résout $2x + 1 = x + 4$.",
    explanation: exp(
      "Au point d'intersection, les deux $y$ sont égaux.",
      "$2x + 1 = x + 4 \\Rightarrow x = 3$.",
      "On obtient l'abscisse $x = 3$.",
      "L'abscisse est $3$."
    ),
    tags: ["seconde", "maths", "droites", "intersection", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_droite_inter_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "droites_plan",
    microId: "droite_intersection",
    difficulty: 3,
    theme: "neutral",
    text: "Deux droites de coefficients directeurs différents :",
    format: "qcm",
    choices: [
      "se coupent en exactement un point",
      "sont parallèles",
      "ne se coupent jamais",
      "sont confondues",
    ],
    expected: ["se coupent en exactement un point"],
    comparator: "mcq_exact",
    hint: "Des pentes différentes → directions différentes.",
    explanation: exp(
      "Des coefficients directeurs différents signifient des directions différentes.",
      "Deux droites non parallèles se croisent.",
      "Elles ont alors un unique point d'intersection.",
      "Elles se coupent en exactement un point."
    ),
    tags: ["seconde", "maths", "droites", "intersection", "raisonnement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_droite_inter_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "droites_plan",
    microId: "droite_intersection",
    difficulty: 4,
    theme: "neutral",
    hint: "On égale les deux expressions de $y$.",
    tags: ["seconde", "maths", "droites", "intersection", "template"],
    generate: () => {
      const x = randomInt(1, 6);
      const a1 = randomInt(2, 5);
      const a2 = randomInt(1, a1 - 1);
      const b1 = randomInt(-3, 3);
      const b2 = (a1 - a2) * x + b1; // a1 x + b1 = a2 x + b2
      const s1 = b1 >= 0 ? `+ ${b1}` : `- ${-b1}`;
      const s2 = b2 >= 0 ? `+ ${b2}` : `- ${-b2}`;
      return {
        text: `Quelle est l'abscisse du point d'intersection des droites $y = ${a1}x ${s1}$ et $y = ${a2}x ${s2}$ ?`,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        explanation: exp(
          "Au point d'intersection, les deux $y$ sont égaux.",
          `$${a1}x ${s1} = ${a2}x ${s2} \\Rightarrow ${a1 - a2}x = ${b2 - b1}$.`,
          `$x = ${x}$.`,
          `L'abscisse est $${x}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_droite_inter_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "droites_plan",
    microId: "droite_intersection",
    difficulty: 3,
    theme: "neutral",
    hint: "Pentes égales ou non ?",
    tags: ["seconde", "maths", "droites", "intersection", "raisonnement", "template"],
    generate: () => {
      const a1 = randomInt(2, 5);
      const secoupent = Math.random() < 0.5;
      const a2 = secoupent ? randomInt(1, a1 - 1) : a1;
      const correct = secoupent ? "Elles se coupent en un point" : "Elles sont parallèles";
      const choices = ["Elles se coupent en un point", "Elles sont parallèles"];
      return {
        text: `Les droites $y = ${a1}x + 2$ et $y = ${a2}x - 1$ : que peut-on dire ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On compare les coefficients directeurs.",
          `Ils valent $${a1}$ et $${a2}$.`,
          secoupent ? "Différents → les droites se croisent." : "Égaux → les droites sont parallèles.",
          correct + "."
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_droite_inter_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "droites_plan",
    microId: "droite_intersection",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est l'abscisse du point d'intersection de $y = 3x - 2$ et $y = x + 4$ ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "$3x - 2 = x + 4$.",
    explanation: exp(
      "On égale les deux expressions de $y$.",
      "$3x - 2 = x + 4 \\Rightarrow 2x = 6$.",
      "$x = 3$.",
      "L'abscisse est $3$."
    ),
    tags: ["seconde", "maths", "droites", "intersection", "short"],
  },

  /* ===================== DROITE_SYSTEME ===================== */

  {
    kind: "fixed",
    id: "seconde_droite_sys_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "droites_plan",
    microId: "droite_systeme",
    difficulty: 2,
    theme: "neutral",
    text: "Résoudre un système de deux équations à deux inconnues, c'est trouver :",
    format: "qcm",
    choices: [
      "le couple $(x\\,;y)$ qui vérifie les deux équations",
      "uniquement la valeur de $x$",
      "deux couples différents",
      "la somme $x + y$",
    ],
    expected: ["le couple $(x\\,;y)$ qui vérifie les deux équations"],
    comparator: "mcq_exact",
    hint: "C'est le point d'intersection des deux droites.",
    explanation: exp(
      "Un système 2×2 cherche les valeurs communes aux deux équations.",
      "La solution est un couple $(x\\,;y)$.",
      "C'est aussi le point d'intersection des deux droites associées.",
      "On cherche le couple $(x\\,;y)$ qui vérifie les deux équations."
    ),
    tags: ["seconde", "maths", "droites", "systeme", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_droite_sys_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "droites_plan",
    microId: "droite_systeme",
    difficulty: 3,
    theme: "neutral",
    text: "On résout le système $\\begin{cases} y = 2x + 1 \\\\ y = x + 4 \\end{cases}$. Quelle est la valeur de $x$ ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Par substitution : $2x + 1 = x + 4$.",
    explanation: exp(
      "Les deux expressions de $y$ sont égales à la solution.",
      "$2x + 1 = x + 4 \\Rightarrow x = 3$.",
      "On obtient $x = 3$.",
      "$x = 3$."
    ),
    tags: ["seconde", "maths", "droites", "systeme", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_droite_sys_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "droites_plan",
    microId: "droite_systeme",
    difficulty: 4,
    theme: "neutral",
    text: "Pour le système $\\begin{cases} y = 2x + 1 \\\\ y = x + 4 \\end{cases}$, on a trouvé $x = 3$. Quelle est la valeur de $y$ ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Remplace $x = 3$ dans l'une des équations.",
    explanation: exp(
      "Une fois $x$ connu, on calcule $y$ avec une des équations.",
      "$y = 2 \\times 3 + 1 = 7$ (ou $y = 3 + 4 = 7$).",
      "Les deux donnent $y = 7$.",
      "$y = 7$."
    ),
    tags: ["seconde", "maths", "droites", "systeme", "short"],
  },

  {
    kind: "template",
    id: "seconde_droite_sys_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "droites_plan",
    microId: "droite_systeme",
    difficulty: 4,
    theme: "neutral",
    hint: "Par substitution, on égale les deux expressions de $y$.",
    tags: ["seconde", "maths", "droites", "systeme", "template"],
    generate: () => {
      const x = randomInt(1, 6);
      const a1 = randomInt(2, 5);
      const a2 = randomInt(1, a1 - 1);
      const b1 = randomInt(-3, 3);
      const b2 = (a1 - a2) * x + b1;
      const s1 = b1 >= 0 ? `+ ${b1}` : `- ${-b1}`;
      const s2 = b2 >= 0 ? `+ ${b2}` : `- ${-b2}`;
      return {
        text: `On résout le système $\\begin{cases} y = ${a1}x ${s1} \\\\ y = ${a2}x ${s2} \\end{cases}$. Quelle est la valeur de $x$ ?`,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        explanation: exp(
          "On égale les deux expressions de $y$ (substitution).",
          `$${a1}x ${s1} = ${a2}x ${s2} \\Rightarrow ${a1 - a2}x = ${b2 - b1}$.`,
          `$x = ${x}$.`,
          `$x = ${x}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_droite_sys_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "droites_plan",
    microId: "droite_systeme",
    difficulty: 5,
    theme: "neutral",
    hint: "Trouve $x$, puis calcule $y$.",
    tags: ["seconde", "maths", "droites", "systeme", "template"],
    generate: () => {
      const x = randomInt(1, 5);
      const a1 = randomInt(2, 4);
      const a2 = randomInt(1, a1 - 1);
      const b1 = randomInt(-2, 3);
      const b2 = (a1 - a2) * x + b1;
      const y = a1 * x + b1;
      const s1 = b1 >= 0 ? `+ ${b1}` : `- ${-b1}`;
      const s2 = b2 >= 0 ? `+ ${b2}` : `- ${-b2}`;
      const correct = `$(${x}\\,;${y})$`;
      // Quand l'abscisse et l'ordonnée de la solution coïncident, « on a
      // interverti le couple » donne la bonne réponse.
      const choices = makeChoices(correct, [
        `$(${y}\\,;${x})$`,
        `$(${x}\\,;${y + 1})$`,
        `$(${x + 1}\\,;${y})$`,
        `$(${x}\\,;${y - 1})$`,
      ]);
      return {
        text: `Quelle est la solution du système $\\begin{cases} y = ${a1}x ${s1} \\\\ y = ${a2}x ${s2} \\end{cases}$ ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On trouve $x$ par substitution, puis $y$.",
          `$${a1}x ${s1} = ${a2}x ${s2} \\Rightarrow x = ${x}$, puis $y = ${a1} \\times ${x} ${s1} = ${y}$.`,
          `Le couple solution est $(${x}\\,;${y})$.`,
          `La solution est $(${x}\\,;${y})$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_droite_sys_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "droites_plan",
    microId: "droite_systeme",
    difficulty: 3,
    theme: "neutral",
    text: "Graphiquement, la solution d'un système de deux équations de droites correspond à :",
    format: "qcm",
    choices: [
      "le point d'intersection des deux droites",
      "les deux ordonnées à l'origine",
      "le milieu des deux droites",
      "les pentes des deux droites",
    ],
    expected: ["le point d'intersection des deux droites"],
    comparator: "mcq_exact",
    hint: "La solution vérifie les deux équations → point commun.",
    explanation: exp(
      "Chaque équation représente une droite.",
      "La solution vérifie les deux : elle est sur les deux droites.",
      "C'est donc leur point d'intersection.",
      "C'est le point d'intersection des deux droites."
    ),
    tags: ["seconde", "maths", "droites", "systeme", "raisonnement", "qcm"],
  },
];
