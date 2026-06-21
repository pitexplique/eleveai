// lib/tutor-v4/questionBank/seconde/maths/repere-coordonnees.bank.ts
//
// Chapitre : Repere et coordonnees (notion repere_coordonnees)
//
// REGLE DE DESIGN (option D) : fixed=remarquable/definition, templates dominants,
// QCM-raisonnement, short numerique (calculatrice dispo), pas d'open.
// Canvas : "fonctionGraphique" (repere + point) pour la lecture de coordonnees.
//
// microSkills (>= 10 items chacun, difficultes 1->5) :
//   repere_coordonnees_point — Lire et placer un point dans un repere
//   repere_milieu            — Calculer les coordonnees d'un milieu
//   repere_distance          — Calculer une distance dans un repere orthonorme

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

// Repere orthonorme avec un point mis en evidence.
function reperePoint(x: number, y: number, label: string): CanvasFigure {
  return {
    kind: "fonctionGraphique",
    size: { width: 300, height: 300 },
    xmin: -6,
    xmax: 6,
    ymin: -6,
    ymax: 6,
    grille: true,
    points: [{ x, y, label, couleur: "#dc2626" }],
  };
}

export const repereCoordonneesBank: TutorBankItemV4[] = [
  /* ===================== REPERE_COORDONNEES_POINT ===================== */

  {
    kind: "fixed",
    id: "seconde_repere_point_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "repere_coordonnees",
    microId: "repere_coordonnees_point",
    difficulty: 1,
    theme: "neutral",
    text: "Dans un couple de coordonnées $(x\\,;y)$, que désigne $x$ ?",
    format: "qcm",
    choices: [
      "L'abscisse (position horizontale)",
      "L'ordonnée (position verticale)",
      "La distance à l'origine",
      "La pente",
    ],
    expected: ["L'abscisse (position horizontale)"],
    comparator: "mcq_exact",
    hint: "Le premier nombre se lit sur l'axe horizontal.",
    explanation: exp(
      "Un point est repéré par deux coordonnées : abscisse puis ordonnée.",
      "On lit d'abord la position horizontale.",
      "Le premier nombre $x$ est l'abscisse.",
      "$x$ désigne l'abscisse (position horizontale)."
    ),
    tags: ["seconde", "maths", "repere", "point", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_repere_point_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "repere_coordonnees",
    microId: "repere_coordonnees_point",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est l'abscisse du point $A$ représenté ci-dessous ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    canvas: reperePoint(3, 2, "A"),
    hint: "On lit la position de $A$ sur l'axe horizontal.",
    explanation: exp(
      "L'abscisse se lit sur l'axe horizontal.",
      "On projette $A$ sur l'axe des abscisses.",
      "$A$ se situe à $3$ sur l'axe horizontal.",
      "L'abscisse de $A$ est $3$."
    ),
    tags: ["seconde", "maths", "repere", "point", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_repere_point_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "repere_coordonnees",
    microId: "repere_coordonnees_point",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est l'ordonnée du point $A$ représenté ci-dessous ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    canvas: reperePoint(3, 2, "A"),
    hint: "On lit la position de $A$ sur l'axe vertical.",
    explanation: exp(
      "L'ordonnée se lit sur l'axe vertical.",
      "On projette $A$ sur l'axe des ordonnées.",
      "$A$ se situe à $2$ sur l'axe vertical.",
      "L'ordonnée de $A$ est $2$."
    ),
    tags: ["seconde", "maths", "repere", "point", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_repere_point_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "repere_coordonnees",
    microId: "repere_coordonnees_point",
    difficulty: 2,
    theme: "neutral",
    text: "Comment appelle-t-on le point de coordonnées $(0\\,;0)$ ?",
    format: "qcm",
    choices: ["L'origine", "Le milieu", "Le sommet", "Le centre de gravité"],
    expected: ["L'origine"],
    comparator: "mcq_exact",
    hint: "C'est le point de croisement des deux axes.",
    explanation: exp(
      "Le repère a un point de référence à l'intersection des axes.",
      "Ses deux coordonnées sont nulles.",
      "Ce point $(0\\,;0)$ s'appelle l'origine.",
      "C'est l'origine."
    ),
    tags: ["seconde", "maths", "repere", "point", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_repere_point_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "repere_coordonnees",
    microId: "repere_coordonnees_point",
    difficulty: 2,
    theme: "neutral",
    text: "À quoi sert un repère du plan ?",
    format: "qcm",
    choices: [
      "À repérer chaque point par deux nombres (ses coordonnées)",
      "À mesurer des angles",
      "À calculer des pourcentages",
      "À tracer des cercles uniquement",
    ],
    expected: ["À repérer chaque point par deux nombres (ses coordonnées)"],
    comparator: "mcq_exact",
    hint: "Pense à une carte avec latitude et longitude.",
    explanation: exp(
      "Un repère associe à chaque point un couple de nombres.",
      "On utilise deux axes gradués.",
      "Chaque point est alors décrit par ses coordonnées $(x\\,;y)$.",
      "Il sert à repérer chaque point par deux nombres."
    ),
    tags: ["seconde", "maths", "repere", "point", "raisonnement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_repere_point_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "repere_coordonnees",
    microId: "repere_coordonnees_point",
    difficulty: 2,
    theme: "neutral",
    hint: "L'abscisse se lit sur l'axe horizontal.",
    tags: ["seconde", "maths", "repere", "point", "template"],
    generate: () => {
      const x = randomInt(-5, 5);
      const y = randomInt(-5, 5);
      return {
        text: "Quelle est l'abscisse du point $M$ représenté ci-dessous ?",
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        canvas: reperePoint(x, y, "M"),
        explanation: exp(
          "L'abscisse se lit sur l'axe horizontal.",
          "On projette $M$ sur l'axe des abscisses.",
          `$M$ se situe à $${x}$ sur l'axe horizontal.`,
          `L'abscisse de $M$ est $${x}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_repere_point_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "repere_coordonnees",
    microId: "repere_coordonnees_point",
    difficulty: 2,
    theme: "neutral",
    hint: "L'ordonnée se lit sur l'axe vertical.",
    tags: ["seconde", "maths", "repere", "point", "template"],
    generate: () => {
      const x = randomInt(-5, 5);
      const y = randomInt(-5, 5);
      return {
        text: "Quelle est l'ordonnée du point $M$ représenté ci-dessous ?",
        format: "short",
        expected: [String(y)],
        comparator: "number_equal",
        canvas: reperePoint(x, y, "M"),
        explanation: exp(
          "L'ordonnée se lit sur l'axe vertical.",
          "On projette $M$ sur l'axe des ordonnées.",
          `$M$ se situe à $${y}$ sur l'axe vertical.`,
          `L'ordonnée de $M$ est $${y}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_repere_point_tpl_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "repere_coordonnees",
    microId: "repere_coordonnees_point",
    difficulty: 3,
    theme: "neutral",
    hint: "Coordonnées = (abscisse ; ordonnée).",
    tags: ["seconde", "maths", "repere", "point", "template"],
    generate: () => {
      const x = randomInt(-4, 5);
      const y = randomInt(-4, 5);
      const correct = `$(${x}\\,;${y})$`;
      const choices = [correct, `$(${y}\\,;${x})$`, `$(${x}\\,;${y + 1})$`, `$(${x - 1}\\,;${y})$`];
      return {
        text: "Quelles sont les coordonnées du point $M$ représenté ci-dessous ?",
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        canvas: reperePoint(x, y, "M"),
        explanation: exp(
          "On lit l'abscisse puis l'ordonnée.",
          `Abscisse $= ${x}$ (axe horizontal), ordonnée $= ${y}$ (axe vertical).`,
          `Les coordonnées sont $(${x}\\,;${y})$.`,
          `$M(${x}\\,;${y})$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_repere_point_tpl_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "repere_coordonnees",
    microId: "repere_coordonnees_point",
    difficulty: 2,
    theme: "neutral",
    hint: "Dans $(a\\,;b)$, l'ordonnée est le second nombre.",
    tags: ["seconde", "maths", "repere", "point", "template"],
    generate: () => {
      const a = randomInt(-6, 6);
      const b = randomInt(-6, 6);
      return {
        text: `Dans le point de coordonnées $(${a}\\,;${b})$, quelle est l'ordonnée ?`,
        format: "short",
        expected: [String(b)],
        comparator: "number_equal",
        explanation: exp(
          "L'ordonnée est le second nombre du couple.",
          `Dans $(${a}\\,;${b})$, le second nombre est $${b}$.`,
          `Donc l'ordonnée vaut $${b}$.`,
          `L'ordonnée est $${b}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_repere_point_tpl_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "repere_coordonnees",
    microId: "repere_coordonnees_point",
    difficulty: 2,
    theme: "neutral",
    hint: "Dans $(a\\,;b)$, l'abscisse est le premier nombre.",
    tags: ["seconde", "maths", "repere", "point", "template"],
    generate: () => {
      const a = randomInt(-6, 6);
      const b = randomInt(-6, 6);
      return {
        text: `Dans le point de coordonnées $(${a}\\,;${b})$, quelle est l'abscisse ?`,
        format: "short",
        expected: [String(a)],
        comparator: "number_equal",
        explanation: exp(
          "L'abscisse est le premier nombre du couple.",
          `Dans $(${a}\\,;${b})$, le premier nombre est $${a}$.`,
          `Donc l'abscisse vaut $${a}$.`,
          `L'abscisse est $${a}$.`
        ),
      };
    },
  },

  /* ===================== REPERE_MILIEU ===================== */

  {
    kind: "fixed",
    id: "seconde_repere_milieu_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "repere_coordonnees",
    microId: "repere_milieu",
    difficulty: 2,
    theme: "neutral",
    text: "Comment calcule-t-on les coordonnées du milieu de $[AB]$ ?",
    format: "qcm",
    choices: [
      "On fait la moyenne des abscisses et la moyenne des ordonnées",
      "On additionne les abscisses et les ordonnées",
      "On soustrait les coordonnées de $A$ à celles de $B$",
      "On multiplie les coordonnées",
    ],
    expected: ["On fait la moyenne des abscisses et la moyenne des ordonnées"],
    comparator: "mcq_exact",
    hint: "Le milieu est « au centre » : pense à une moyenne.",
    explanation: exp(
      "Le milieu est équidistant de $A$ et $B$ : ses coordonnées sont des moyennes.",
      "$x_M = \\dfrac{x_A + x_B}{2}$ et $y_M = \\dfrac{y_A + y_B}{2}$.",
      "On applique cette formule à chaque coordonnée.",
      "On fait la moyenne des abscisses et la moyenne des ordonnées."
    ),
    tags: ["seconde", "maths", "repere", "milieu", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_repere_milieu_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "repere_coordonnees",
    microId: "repere_milieu",
    difficulty: 2,
    theme: "neutral",
    text: "Soit $A(2\\,;4)$ et $B(8\\,;10)$. Quelle est l'abscisse du milieu de $[AB]$ ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "$x_M = \\dfrac{x_A + x_B}{2}$.",
    explanation: exp(
      "L'abscisse du milieu est la moyenne des abscisses.",
      "$x_M = \\dfrac{2 + 8}{2}$.",
      "$= \\dfrac{10}{2} = 5$.",
      "L'abscisse du milieu est $5$."
    ),
    tags: ["seconde", "maths", "repere", "milieu", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_repere_milieu_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "repere_coordonnees",
    microId: "repere_milieu",
    difficulty: 2,
    theme: "neutral",
    text: "Soit $A(2\\,;4)$ et $B(8\\,;10)$. Quelle est l'ordonnée du milieu de $[AB]$ ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "$y_M = \\dfrac{y_A + y_B}{2}$.",
    explanation: exp(
      "L'ordonnée du milieu est la moyenne des ordonnées.",
      "$y_M = \\dfrac{4 + 10}{2}$.",
      "$= \\dfrac{14}{2} = 7$.",
      "L'ordonnée du milieu est $7$."
    ),
    tags: ["seconde", "maths", "repere", "milieu", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_repere_milieu_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "repere_coordonnees",
    microId: "repere_milieu",
    difficulty: 3,
    theme: "neutral",
    text: "Soit $A(-2\\,;3)$ et $B(4\\,;5)$. Quelle est l'abscisse du milieu de $[AB]$ ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "$\\dfrac{-2 + 4}{2}$.",
    explanation: exp(
      "On fait la moyenne des abscisses, en respectant les signes.",
      "$x_M = \\dfrac{-2 + 4}{2}$.",
      "$= \\dfrac{2}{2} = 1$.",
      "L'abscisse du milieu est $1$."
    ),
    tags: ["seconde", "maths", "repere", "milieu", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_repere_milieu_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "repere_coordonnees",
    microId: "repere_milieu",
    difficulty: 3,
    theme: "neutral",
    text: "Le milieu d'un segment $[AB]$ est :",
    format: "qcm",
    choices: [
      "Le point situé à égale distance de $A$ et $B$ sur $[AB]$",
      "Le point le plus proche de $A$",
      "Un point en dehors du segment",
      "Le point $A$",
    ],
    expected: ["Le point situé à égale distance de $A$ et $B$ sur $[AB]$"],
    comparator: "mcq_exact",
    hint: "« Milieu » = au centre.",
    explanation: exp(
      "Le milieu partage le segment en deux parts égales.",
      "Il est donc à égale distance des deux extrémités.",
      "C'est le centre du segment $[AB]$.",
      "C'est le point à égale distance de $A$ et $B$ sur $[AB]$."
    ),
    tags: ["seconde", "maths", "repere", "milieu", "raisonnement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_repere_milieu_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "repere_coordonnees",
    microId: "repere_milieu",
    difficulty: 3,
    theme: "neutral",
    hint: "Moyenne des abscisses.",
    tags: ["seconde", "maths", "repere", "milieu", "template"],
    generate: () => {
      const xa = randomInt(-5, 5);
      const xb = xa + 2 * randomInt(1, 4); // somme paire -> milieu entier
      const xm = (xa + xb) / 2;
      const ya = randomInt(-5, 5);
      const yb = randomInt(-5, 5);
      return {
        text: `Soit $A(${xa}\\,;${ya})$ et $B(${xb}\\,;${yb})$. Quelle est l'abscisse du milieu de $[AB]$ ?`,
        format: "short",
        expected: [String(xm)],
        comparator: "number_equal",
        explanation: exp(
          "L'abscisse du milieu est la moyenne des abscisses.",
          `$x_M = \\dfrac{${xa} + ${xb}}{2}$.`,
          `$= ${xm}$.`,
          `L'abscisse du milieu est $${xm}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_repere_milieu_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "repere_coordonnees",
    microId: "repere_milieu",
    difficulty: 3,
    theme: "neutral",
    hint: "Moyenne des ordonnées.",
    tags: ["seconde", "maths", "repere", "milieu", "template"],
    generate: () => {
      const ya = randomInt(-5, 5);
      const yb = ya + 2 * randomInt(1, 4);
      const ym = (ya + yb) / 2;
      const xa = randomInt(-5, 5);
      const xb = randomInt(-5, 5);
      return {
        text: `Soit $A(${xa}\\,;${ya})$ et $B(${xb}\\,;${yb})$. Quelle est l'ordonnée du milieu de $[AB]$ ?`,
        format: "short",
        expected: [String(ym)],
        comparator: "number_equal",
        explanation: exp(
          "L'ordonnée du milieu est la moyenne des ordonnées.",
          `$y_M = \\dfrac{${ya} + ${yb}}{2}$.`,
          `$= ${ym}$.`,
          `L'ordonnée du milieu est $${ym}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_repere_milieu_tpl_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "repere_coordonnees",
    microId: "repere_milieu",
    difficulty: 4,
    theme: "neutral",
    hint: "Milieu = (moyenne des abscisses ; moyenne des ordonnées).",
    tags: ["seconde", "maths", "repere", "milieu", "template"],
    generate: () => {
      const xa = randomInt(-4, 4);
      const xb = xa + 2 * randomInt(1, 3);
      const ya = randomInt(-4, 4);
      const yb = ya + 2 * randomInt(1, 3);
      const xm = (xa + xb) / 2;
      const ym = (ya + yb) / 2;
      const correct = `$(${xm}\\,;${ym})$`;
      const choices = [correct, `$(${ym}\\,;${xm})$`, `$(${xa + xb}\\,;${ya + yb})$`, `$(${xm + 1}\\,;${ym})$`];
      return {
        text: `Soit $A(${xa}\\,;${ya})$ et $B(${xb}\\,;${yb})$. Quelles sont les coordonnées du milieu de $[AB]$ ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On calcule la moyenne sur chaque coordonnée.",
          `$x_M = \\dfrac{${xa}+${xb}}{2} = ${xm}$ ; $y_M = \\dfrac{${ya}+${yb}}{2} = ${ym}$.`,
          `Le milieu est $(${xm}\\,;${ym})$.`,
          `$(${xm}\\,;${ym})$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_repere_milieu_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "repere_coordonnees",
    microId: "repere_milieu",
    difficulty: 2,
    theme: "neutral",
    text: "Soit $A(0\\,;0)$ et $B(6\\,;0)$. Quelle est l'abscisse du milieu de $[AB]$ ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "$\\dfrac{0 + 6}{2}$.",
    explanation: exp(
      "On fait la moyenne des abscisses.",
      "$x_M = \\dfrac{0 + 6}{2}$.",
      "$= 3$.",
      "L'abscisse du milieu est $3$."
    ),
    tags: ["seconde", "maths", "repere", "milieu", "short"],
  },

  /* ===================== REPERE_DISTANCE ===================== */

  {
    kind: "fixed",
    id: "seconde_repere_dist_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "repere_coordonnees",
    microId: "repere_distance",
    difficulty: 3,
    theme: "neutral",
    text: "Dans un repère orthonormé, quelle formule donne la distance $AB$ ?",
    format: "qcm",
    choices: [
      "$\\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}$",
      "$(x_B - x_A) + (y_B - y_A)$",
      "$\\sqrt{x_B - x_A} + \\sqrt{y_B - y_A}$",
      "$(x_B - x_A)^2 + (y_B - y_A)^2$",
    ],
    expected: ["$\\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}$"],
    comparator: "mcq_exact",
    hint: "C'est une application du théorème de Pythagore.",
    explanation: exp(
      "La distance s'obtient avec le théorème de Pythagore dans le repère.",
      "On considère le triangle rectangle formé par les écarts en $x$ et en $y$.",
      "$AB = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}$.",
      "C'est la formule de la distance."
    ),
    tags: ["seconde", "maths", "repere", "distance", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_repere_dist_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "repere_coordonnees",
    microId: "repere_distance",
    difficulty: 2,
    theme: "neutral",
    text: "Soit $A(0\\,;0)$ et $B(3\\,;4)$. Combien vaut la distance $AB$ ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "$\\sqrt{3^2 + 4^2}$.",
    explanation: exp(
      "On applique la formule de la distance.",
      "$AB = \\sqrt{(3-0)^2 + (4-0)^2} = \\sqrt{9 + 16}$.",
      "$= \\sqrt{25} = 5$.",
      "$AB = 5$."
    ),
    tags: ["seconde", "maths", "repere", "distance", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_repere_dist_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "repere_coordonnees",
    microId: "repere_distance",
    difficulty: 3,
    theme: "neutral",
    text: "Soit $A(0\\,;0)$ et $B(6\\,;8)$. Combien vaut la distance $AB$ ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "$\\sqrt{6^2 + 8^2}$.",
    explanation: exp(
      "On applique la formule de la distance.",
      "$AB = \\sqrt{6^2 + 8^2} = \\sqrt{36 + 64}$.",
      "$= \\sqrt{100} = 10$.",
      "$AB = 10$."
    ),
    tags: ["seconde", "maths", "repere", "distance", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_repere_dist_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "repere_coordonnees",
    microId: "repere_distance",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $A(1\\,;2)$ et $B(4\\,;6)$. Combien vaut la distance $AB$ ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Écarts : $x_B - x_A = 3$ et $y_B - y_A = 4$.",
    explanation: exp(
      "On calcule les écarts puis on applique la formule.",
      "$x_B - x_A = 3$, $y_B - y_A = 4$ ; $AB = \\sqrt{3^2 + 4^2}$.",
      "$= \\sqrt{25} = 5$.",
      "$AB = 5$."
    ),
    tags: ["seconde", "maths", "repere", "distance", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_repere_dist_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "repere_coordonnees",
    microId: "repere_distance",
    difficulty: 4,
    theme: "neutral",
    text: "Pourquoi la formule de la distance nécessite-t-elle un repère orthonormé ?",
    format: "qcm",
    choices: [
      "Parce qu'elle repose sur le théorème de Pythagore (angle droit, mêmes unités)",
      "Parce que les nombres doivent être positifs",
      "Parce qu'il faut des coordonnées entières",
      "Parce que l'origine doit être en $(1\\,;1)$",
    ],
    expected: ["Parce qu'elle repose sur le théorème de Pythagore (angle droit, mêmes unités)"],
    comparator: "mcq_exact",
    hint: "Pythagore exige un angle droit entre les axes.",
    explanation: exp(
      "La formule vient d'un triangle rectangle entre les axes.",
      "Il faut donc des axes perpendiculaires et la même unité (orthonormé).",
      "Sinon Pythagore ne s'applique pas directement.",
      "Car elle repose sur le théorème de Pythagore."
    ),
    tags: ["seconde", "maths", "repere", "distance", "raisonnement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_repere_dist_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "repere_coordonnees",
    microId: "repere_distance",
    difficulty: 3,
    theme: "neutral",
    hint: "$AB = \\sqrt{(x_B-x_A)^2 + (y_B-y_A)^2}$.",
    tags: ["seconde", "maths", "repere", "distance", "template"],
    generate: () => {
      // triplets pythagoriciens pour une distance entiere
      const triples = [
        [3, 4, 5],
        [6, 8, 10],
        [5, 12, 13],
        [8, 15, 17],
        [9, 12, 15],
      ];
      const [dx, dy, d] = triples[randomInt(0, triples.length - 1)];
      const xa = randomInt(-3, 3);
      const ya = randomInt(-3, 3);
      const xb = xa + dx;
      const yb = ya + dy;
      return {
        text: `Soit $A(${xa}\\,;${ya})$ et $B(${xb}\\,;${yb})$. Combien vaut la distance $AB$ ?`,
        format: "short",
        expected: [String(d)],
        comparator: "number_equal",
        explanation: exp(
          "On calcule les écarts puis on applique la formule.",
          `$x_B - x_A = ${dx}$, $y_B - y_A = ${dy}$ ; $AB = \\sqrt{${dx}^2 + ${dy}^2}$.`,
          `$= \\sqrt{${dx * dx + dy * dy}} = ${d}$.`,
          `$AB = ${d}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_repere_dist_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "repere_coordonnees",
    microId: "repere_distance",
    difficulty: 2,
    theme: "neutral",
    hint: "Sur une ligne horizontale, la distance est l'écart des abscisses.",
    tags: ["seconde", "maths", "repere", "distance", "template"],
    generate: () => {
      const ya = randomInt(-4, 4);
      const xa = randomInt(-5, 0);
      const dx = randomInt(2, 8);
      const xb = xa + dx;
      return {
        text: `Soit $A(${xa}\\,;${ya})$ et $B(${xb}\\,;${ya})$ (même ordonnée). Combien vaut la distance $AB$ ?`,
        format: "short",
        expected: [String(dx)],
        comparator: "number_equal",
        explanation: exp(
          "Quand les ordonnées sont égales, le segment est horizontal.",
          `La distance est l'écart des abscisses : $${xb} - (${xa})$.`,
          `$= ${dx}$.`,
          `$AB = ${dx}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_repere_dist_tpl_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "repere_coordonnees",
    microId: "repere_distance",
    difficulty: 3,
    theme: "neutral",
    hint: "La formule de la distance utilise des carrés et une racine.",
    tags: ["seconde", "maths", "repere", "distance", "raisonnement", "template"],
    generate: () => {
      const correct = "$\\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}$";
      const choices = [
        correct,
        "$(x_B - x_A) + (y_B - y_A)$",
        "$(x_B - x_A)^2 + (y_B - y_A)^2$",
        "$\\sqrt{x_B - x_A} + \\sqrt{y_B - y_A}$",
      ];
      return {
        text: "Quelle expression donne la distance $AB$ dans un repère orthonormé ?",
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "La distance vient du théorème de Pythagore.",
          "On met les écarts au carré, on additionne, puis on prend la racine.",
          "$AB = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}$.",
          "C'est la formule de la distance."
        ),
      };
    },
  },
];
