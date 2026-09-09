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

/**
 * ⚠️ ON NE FORCE PAS QUATRE PROPOSITIONS — regle donnee par Frederic le
 * 08/09/2026 : « les QCM peuvent avoir vrai/faux, 3 propositions ou 4 ;
 * l'important c'est l'ordre des bonnes reponses, mais le mieux est 3 ou 4 ».
 *
 * J'avais ajoute ici un helper qui rembourrait jusqu'a quatre en decalant une
 * coordonnee, parce que 16 tirages sur 3 000 tombaient a trois propositions.
 * ⛔ Ce n'etait pas un defaut, et le remede etait pire : un point decale d'une
 * unite n'est l'erreur d'AUCUN eleve, alors que les pieges ecrits a la main
 * sont tous de vraies methodes fausses. Trois vrais pieges valent mieux que
 * quatre dont un factice.
 *
 * Ce qui compte vraiment est deja assure par `makeChoices` : le `shuffle`
 * final, qui fait varier la POSITION de la bonne reponse.
 */

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
      // Sur la première bissectrice, « on a interverti abscisse et ordonnée »
      // donne la bonne réponse : d'où le décalage à droite, gardé en réserve.
      const choices = makeChoices(correct, [
        `$(${y}\\,;${x})$`,
        `$(${x}\\,;${y + 1})$`,
        `$(${x - 1}\\,;${y})$`,
        `$(${x + 1}\\,;${y})$`,
      ]);
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
      // Quand le milieu tombe sur la première bissectrice, « on a interverti »
      // donne la bonne réponse : d'où le décalage vertical, gardé en réserve.
      const choices = makeChoices(correct, [
        `$(${ym}\\,;${xm})$`,
        `$(${xa + xb}\\,;${ya + yb})$`,
        `$(${xm + 1}\\,;${ym})$`,
        `$(${xm}\\,;${ym + 1})$`,
      ]);
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

  /* ============== REPERE_CONFIGURATION (08/09/2026) ==============
   *
   * Les trois micros precedentes enseignent des GESTES : lire un point,
   * calculer un milieu, calculer une distance. L'exercice type ne demande
   * jamais un geste isole — il demande ce que ces gestes PROUVENT.
   *
   * Deux outils, deux preuves, et ce sont les seules du chapitre :
   *   — le MILIEU prouve un parallelogramme (memes milieux de diagonales) ou
   *     une symetrie centrale ;
   *   — la DISTANCE prouve la nature d'un triangle (isocele par deux longueurs
   *     egales, rectangle par la reciproque de Pythagore).
   *
   * ⛔ Toutes les figures tirees ici sont VERIFIEES par construction, et le
   * script de recalcul les refait a partir des coordonnees de l'enonce.
   */

  {
    kind: "template",
    id: "seconde_repere_config_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "repere_coordonnees",
    microId: "repere_configuration",
    difficulty: 4,
    theme: "neutral",
    hint: "Dans $ABCD$, les diagonales sont $[AC]$ et $[BD]$ : elles ont le même milieu.",
    tags: ["seconde", "maths", "repere", "configuration", "template"],
    generate: () => {
      let xa = 0, ya = 0, xb = 0, yb = 0, xc = 0, yc = 0;
      do {
        xa = randomInt(-4, 4); ya = randomInt(-4, 4);
        xb = randomInt(-4, 4); yb = randomInt(-4, 4);
        xc = randomInt(-4, 4); yc = randomInt(-4, 4);
        // Trois points alignes ne font pas un parallelogramme : le produit en
        // croix doit etre non nul.
      } while ((xb - xa) * (yc - ya) - (yb - ya) * (xc - xa) === 0);
      // ABCD est un parallelogramme <=> milieu[AC] = milieu[BD] <=> D = A + C - B
      const xd = xa + xc - xb;
      const yd = ya + yc - yb;
      const correct = `$D(${xd}\\,;${yd})$`;
      // Six pieges proposes, tous de VRAIES methodes fausses : le mauvais
      // sommet oppose (deux facons), la somme des trois points, un vecteur pris
      // pour un point, et l'erreur de signe sur UNE SEULE coordonnee.
      // `makeChoices` en garde trois distincts — parfois deux quand un tirage
      // en confond, et c'est tres bien ainsi.
      const choices = makeChoices(correct, [
        `$D(${xa + xb - xc}\\,;${ya + yb - yc})$`,
        `$D(${xb + xc - xa}\\,;${yb + yc - ya})$`,
        `$D(${xa + xb + xc}\\,;${ya + yb + yc})$`,
        `$D(${xc - xa}\\,;${yc - ya})$`,
        `$D(${xa + xc - xb}\\,;${ya + yb - yc})$`,
        `$D(${xa + xb - xc}\\,;${ya + yc - yb})$`,
      ]);
      return {
        text:
          `Soit $A(${xa}\\,;${ya})$, $B(${xb}\\,;${yb})$ et $C(${xc}\\,;${yc})$. ` +
          `Quelles sont les coordonnées du point $D$ tel que $ABCD$ soit un parallélogramme ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Un quadrilatère est un parallélogramme lorsque ses diagonales se coupent en leur milieu.",
          "Dans $ABCD$, les diagonales sont $[AC]$ et $[BD]$. On écrit que leurs milieux coïncident.",
          `Milieu de $[AC]$ : $\\left(\\dfrac{${xa}+${xc}}{2}\\,;\\dfrac{${ya}+${yc}}{2}\\right)$. ` +
            `Le milieu de $[BD]$ doit lui être égal, d'où $x_D = ${xa} + ${xc} - (${xb}) = ${xd}$ et ` +
            `$y_D = ${ya} + ${yc} - (${yb}) = ${yd}$.`,
          `$D(${xd}\\,;${yd})$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_repere_config_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "repere_coordonnees",
    microId: "repere_configuration",
    difficulty: 4,
    theme: "neutral",
    hint: "On calcule le milieu de $[AC]$, puis celui de $[BD]$, et on compare.",
    tags: ["seconde", "maths", "repere", "configuration", "raisonnement", "template"],
    generate: () => {
      const xa = randomInt(-4, 3), ya = randomInt(-4, 3);
      const xb = randomInt(-4, 4), yb = randomInt(-4, 4);
      const xc = randomInt(-3, 4), yc = randomInt(-3, 4);
      // Une fois sur deux la figure EST un parallelogramme, une fois sur deux
      // on decale D : sans quoi la reponse « oui » serait toujours la bonne.
      const vrai = Math.random() < 0.5;
      const decalage = vrai ? 0 : (Math.random() < 0.5 ? 1 : -1);
      const xd = xa + xc - xb + decalage;
      const yd = ya + yc - yb;
      const correct = vrai
        ? "oui : les diagonales $[AC]$ et $[BD]$ ont le même milieu"
        : "non : les diagonales $[AC]$ et $[BD]$ n'ont pas le même milieu";
      const choices = makeChoices(correct, [
        vrai
          ? "non : les diagonales $[AC]$ et $[BD]$ n'ont pas le même milieu"
          : "oui : les diagonales $[AC]$ et $[BD]$ ont le même milieu",
        "on ne peut pas le savoir sans mesurer les angles",
        "oui, car les quatre points sont dans le même repère",
      ]);
      const mAC = `\\left(${(xa + xc) / 2}\\,;${(ya + yc) / 2}\\right)`;
      const mBD = `\\left(${(xb + xd) / 2}\\,;${(yb + yd) / 2}\\right)`;
      return {
        text:
          `Soit $A(${xa}\\,;${ya})$, $B(${xb}\\,;${yb})$, $C(${xc}\\,;${yc})$ et $D(${xd}\\,;${yd})$. ` +
          `Le quadrilatère $ABCD$ est-il un parallélogramme ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Les diagonales d'un parallélogramme se coupent en leur milieu.",
          "On calcule les deux milieux et on les compare — c'est la seule chose à faire.",
          `Milieu de $[AC]$ : $${mAC}$. Milieu de $[BD]$ : $${mBD}$.`,
          vrai
            ? "Les deux milieux sont confondus : $ABCD$ est bien un parallélogramme."
            : "Les deux milieux diffèrent : $ABCD$ n'est pas un parallélogramme."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_repere_config_tpl_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "repere_coordonnees",
    microId: "repere_configuration",
    difficulty: 4,
    theme: "neutral",
    hint: "On calcule les trois longueurs. Deux longueurs égales : isocèle.",
    tags: ["seconde", "maths", "repere", "configuration", "template"],
    generate: () => {
      let p = 0, q = 0;
      do {
        p = randomInt(1, 5);
        q = randomInt(1, 5);
        // p = q rendrait le triangle plat, et l'egalite 2(p-q)^2 = p^2+q^2 le
        // rendrait equilateral : deux cas ou la reponse annoncee serait fausse.
      } while (p === q || 2 * (p - q) ** 2 === p * p + q * q);
      const xa = randomInt(-3, 3), ya = randomInt(-3, 3);
      // B et C echanges : AB^2 = p^2+q^2 = AC^2, donc isocele en A par
      // CONSTRUCTION. Et l'angle en A n'est pas droit, car p et q sont > 0.
      const xb = xa + p, yb = ya + q;
      const xc = xa + q, yc = ya + p;
      const correct = "isocèle en $A$";
      const choices = makeChoices(correct, [
        "équilatéral",
        "rectangle en $A$",
        "quelconque",
        "isocèle en $B$",
      ]);
      const carre = p * p + q * q;
      return {
        text:
          `Dans un repère orthonormé, $A(${xa}\\,;${ya})$, $B(${xb}\\,;${yb})$ et $C(${xc}\\,;${yc})$. ` +
          `Quelle est la nature du triangle $ABC$ ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "La nature d'un triangle se lit sur ses longueurs, calculées par la formule de la distance.",
          "$AB = \\sqrt{(x_B-x_A)^2 + (y_B-y_A)^2}$, et de même pour $AC$ et $BC$.",
          `$AB^2 = ${p}^2 + ${q}^2 = ${carre}$ et $AC^2 = ${q}^2 + ${p}^2 = ${carre}$ : ` +
            `les deux sont égaux. $BC^2 = ${2 * (p - q) ** 2}$, qui en diffère.`,
          "Deux côtés de même longueur issus de $A$ : le triangle est isocèle en $A$."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_repere_config_tpl_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "repere_coordonnees",
    microId: "repere_configuration",
    difficulty: 5,
    theme: "neutral",
    hint: "On calcule les carrés des trois longueurs, puis on teste $AB^2 + AC^2 = BC^2$.",
    tags: ["seconde", "maths", "repere", "configuration", "template"],
    generate: () => {
      const p = randomInt(1, 3);
      const q = randomInt(1, 3);
      const xa = randomInt(-2, 2), ya = randomInt(-2, 2);
      // Les vecteurs (p ; q) et (-2q ; 2p) sont perpendiculaires — leur produit
      // scalaire vaut -2pq + 2pq = 0 — et de longueurs DIFFERENTES : le triangle
      // est rectangle en A sans etre isocele.
      const xb = xa + p, yb = ya + q;
      const xc = xa - 2 * q, yc = ya + 2 * p;
      const ab2 = p * p + q * q;
      const ac2 = 4 * (p * p + q * q);
      const bc2 = ab2 + ac2;
      const correct = "rectangle en $A$";
      const choices = makeChoices(correct, [
        "isocèle en $A$",
        "rectangle en $B$",
        "quelconque",
        "équilatéral",
      ]);
      return {
        text:
          `Dans un repère orthonormé, $A(${xa}\\,;${ya})$, $B(${xb}\\,;${yb})$ et $C(${xc}\\,;${yc})$. ` +
          `Quelle est la nature du triangle $ABC$ ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "La réciproque de Pythagore se teste sur les CARRÉS des longueurs — inutile de sortir les racines.",
          "On calcule $AB^2$, $AC^2$ et $BC^2$, puis on regarde si les deux plus petits s'additionnent pour donner le plus grand.",
          `$AB^2 = ${ab2}$, $AC^2 = ${ac2}$, $BC^2 = ${bc2}$. Or $${ab2} + ${ac2} = ${bc2}$.`,
          "L'égalité de Pythagore est vérifiée : le triangle est rectangle en $A$, sommet opposé au plus grand côté."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_repere_config_tpl_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "repere_coordonnees",
    microId: "repere_configuration",
    difficulty: 3,
    theme: "neutral",
    hint: "« $B$ symétrique de $A$ par rapport à $C$ » signifie exactement « $C$ est le milieu de $[AB]$ ».",
    tags: ["seconde", "maths", "repere", "configuration", "template"],
    generate: () => {
      const xa = randomInt(-5, 5), ya = randomInt(-5, 5);
      let xc = 0, yc = 0;
      do {
        xc = randomInt(-4, 4);
        yc = randomInt(-4, 4);
      } while (xc === xa && yc === ya);
      // C milieu de [AB] <=> B = 2C - A
      const xb = 2 * xc - xa;
      const yb = 2 * yc - ya;
      const correct = `$B(${xb}\\,;${yb})$`;
      // Six pieges, tous de vraies confusions : le vecteur au lieu du point, la
      // somme au lieu du double, la symetrie prise a l'envers, la symetrie par
      // rapport a l'origine, et « je n'ai transforme qu'une seule coordonnee ».
      const choices = makeChoices(correct, [
        `$B(${xc - xa}\\,;${yc - ya})$`,
        `$B(${xa + xc}\\,;${ya + yc})$`,
        `$B(${2 * xa - xc}\\,;${2 * ya - yc})$`,
        `$B(${-xa}\\,;${-ya})$`,
        `$B(${xb}\\,;${ya})$`,
        `$B(${xa}\\,;${yb})$`,
      ]);
      return {
        text:
          `Soit $A(${xa}\\,;${ya})$ et $C(${xc}\\,;${yc})$. ` +
          `Quelles sont les coordonnées du symétrique $B$ de $A$ par rapport à $C$ ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Le symétrique de $A$ par rapport à $C$ est le point $B$ tel que $C$ soit le MILIEU de $[AB]$.",
          "On écrit la formule du milieu à l'envers : $x_C = \\dfrac{x_A + x_B}{2}$ donne $x_B = 2x_C - x_A$.",
          `$x_B = 2 \\times (${xc}) - (${xa}) = ${xb}$ et $y_B = 2 \\times (${yc}) - (${ya}) = ${yb}$.`,
          `$B(${xb}\\,;${yb})$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_repere_config_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "repere_coordonnees",
    microId: "repere_configuration",
    difficulty: 3,
    theme: "neutral",
    text: "Pour prouver que $ABCD$ est un parallélogramme à partir des coordonnées, que compare-t-on ?",
    format: "qcm",
    choices: [
      "les milieux de $[AC]$ et de $[BD]$",
      "les milieux de $[AB]$ et de $[CD]$",
      "les longueurs $AB$ et $CD$ seulement",
      "les quatre longueurs des côtés",
    ],
    expected: ["les milieux de $[AC]$ et de $[BD]$"],
    comparator: "mcq_exact",
    hint: "Dans le quadrilatère $ABCD$, quelles sont les DIAGONALES ?",
    explanation: exp(
      "Les diagonales d'un parallélogramme se coupent en leur milieu — et la réciproque est vraie.",
      "Encore faut-il repérer les diagonales : dans $ABCD$, ce sont $[AC]$ et $[BD]$, celles qui sautent une lettre.",
      "$[AB]$ et $[CD]$ sont deux CÔTÉS opposés, pas des diagonales : les comparer ne prouve rien.",
      "On compare les milieux de $[AC]$ et de $[BD]$."
    ),
    tags: ["seconde", "maths", "repere", "configuration", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_repere_config_fixed_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "repere_coordonnees",
    microId: "repere_configuration",
    difficulty: 4,
    theme: "neutral",
    text: "Pour montrer qu'un triangle est rectangle à partir des coordonnées, il vaut mieux :",
    format: "qcm",
    choices: [
      "comparer les CARRÉS des longueurs",
      "calculer les trois longueurs avec leurs racines",
      "mesurer l'angle au rapporteur",
      "vérifier que deux côtés sont égaux",
    ],
    expected: ["comparer les CARRÉS des longueurs"],
    comparator: "mcq_exact",
    hint: "La formule de la distance donne un carré avant de donner une racine.",
    explanation: exp(
      "La réciproque de Pythagore porte sur les carrés : $AB^2 + AC^2 = BC^2$.",
      "Or la formule de la distance calcule justement $AB^2$ avant d'en prendre la racine : on s'arrête là.",
      "Sortir les racines fait apparaître des décimaux approchés, et une égalité approchée ne DÉMONTRE rien.",
      "On compare les carrés des longueurs, sans jamais calculer les racines."
    ),
    tags: ["seconde", "maths", "repere", "configuration", "methode", "qcm"],
  },
];
