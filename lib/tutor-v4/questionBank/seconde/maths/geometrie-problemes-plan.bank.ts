// lib/tutor-v4/questionBank/seconde/maths/geometrie-problemes-plan.bank.ts
//
// Chapitre : Problemes de geometrie plane (notion geometrie_problemes_plan)
//
// REGLE DE DESIGN (option D) : fixed=remarquable/definition, templates dominants,
// QCM-raisonnement, short numerique (calculatrice dispo), pas d'open.
// Canvas : "triangle" (triangle rectangle, angle droit marque) pour la trigo.
//
// microSkills (>= 10 items chacun, difficultes 1->5) :
//   geo_projete_orthogonal — Projete orthogonal d'un point sur une droite
//   geo_trigonometrie      — sin, cos, tan dans le triangle rectangle
//   geo_trig_identite      — Relation cos^2 + sin^2 = 1
//   geo_longueurs_aires    — Calculer longueurs, angles, aires
//   geo_optimisation       — Problemes d'optimisation

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

// Triangle rectangle en B avec longueurs indiquees.
function triangleRectangle(ab: string, bc: string, ca: string): CanvasFigure {
  return {
    kind: "triangle",
    size: { width: 280, height: 240 },
    points: {
      A: { x: 0, y: 0 },
      B: { x: 4, y: 0 },
      C: { x: 4, y: 3 },
    },
    display: { showPoints: true, showLabels: true, showSides: true, showAngles: false },
    labels: { A: "A", B: "B", C: "C" },
    sideLabels: { AB: ab, BC: bc, CA: ca },
    marks: { rightAngleAt: "B" },
  };
}

export const geometrieProblemesPlanBank: TutorBankItemV4[] = [
  /* ===================== GEO_PROJETE_ORTHOGONAL ===================== */

  {
    kind: "fixed",
    id: "seconde_geo_proj_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "geometrie_problemes_plan",
    microId: "geo_projete_orthogonal",
    difficulty: 2,
    theme: "neutral",
    text: "Le projeté orthogonal d'un point $M$ sur une droite $d$ est :",
    format: "qcm",
    choices: [
      "Le point de $d$ le plus proche de $M$",
      "Le milieu de $d$",
      "Le point de $d$ le plus éloigné de $M$",
      "Un point en dehors de $d$",
    ],
    expected: ["Le point de $d$ le plus proche de $M$"],
    comparator: "mcq_exact",
    hint: "On trace la perpendiculaire à $d$ passant par $M$.",
    explanation: exp(
      "Le projeté orthogonal est le pied de la perpendiculaire abaissée de $M$ sur $d$.",
      "C'est l'intersection de $d$ avec la perpendiculaire à $d$ passant par $M$.",
      "C'est le point de $d$ le plus proche de $M$.",
      "C'est le point de $d$ le plus proche de $M$."
    ),
    tags: ["seconde", "maths", "geometrie", "projete", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_geo_proj_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "geometrie_problemes_plan",
    microId: "geo_projete_orthogonal",
    difficulty: 2,
    theme: "neutral",
    text: "Comment construit-on le projeté orthogonal de $M$ sur la droite $d$ ?",
    format: "qcm",
    choices: [
      "On trace la perpendiculaire à $d$ passant par $M$",
      "On trace la parallèle à $d$ passant par $M$",
      "On joint $M$ au milieu de $d$",
      "On reporte la longueur $d$",
    ],
    expected: ["On trace la perpendiculaire à $d$ passant par $M$"],
    comparator: "mcq_exact",
    hint: "« Orthogonal » = perpendiculaire.",
    explanation: exp(
      "Le projeté orthogonal utilise une perpendiculaire.",
      "On abaisse la perpendiculaire à $d$ passant par $M$.",
      "Son intersection avec $d$ est le projeté.",
      "On trace la perpendiculaire à $d$ passant par $M$."
    ),
    tags: ["seconde", "maths", "geometrie", "projete", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_geo_proj_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "geometrie_problemes_plan",
    microId: "geo_projete_orthogonal",
    difficulty: 3,
    theme: "neutral",
    text: "La distance d'un point $M$ à une droite $d$ est la distance entre $M$ et :",
    format: "qcm",
    choices: [
      "son projeté orthogonal sur $d$",
      "le milieu de $d$",
      "n'importe quel point de $d$",
      "l'origine du repère",
    ],
    expected: ["son projeté orthogonal sur $d$"],
    comparator: "mcq_exact",
    hint: "C'est la plus courte distance.",
    explanation: exp(
      "La distance d'un point à une droite est la plus courte.",
      "Elle est atteinte au projeté orthogonal.",
      "Donc c'est la distance entre $M$ et son projeté.",
      "C'est la distance entre $M$ et son projeté orthogonal."
    ),
    tags: ["seconde", "maths", "geometrie", "projete", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_geo_proj_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "geometrie_problemes_plan",
    microId: "geo_projete_orthogonal",
    difficulty: 2,
    theme: "neutral",
    text: "Quelles sont les coordonnées du projeté orthogonal de $M(3\\,;2)$ sur l'axe des abscisses ?",
    format: "qcm",
    choices: ["$(3\\,;0)$", "$(0\\,;2)$", "$(0\\,;0)$", "$(2\\,;3)$"],
    expected: ["$(3\\,;0)$"],
    comparator: "mcq_exact",
    hint: "Sur l'axe des abscisses, l'ordonnée est $0$.",
    explanation: exp(
      "On projette verticalement sur l'axe des abscisses.",
      "L'abscisse est conservée, l'ordonnée devient $0$.",
      "$M(3\\,;2) \\to (3\\,;0)$.",
      "Le projeté est $(3\\,;0)$."
    ),
    tags: ["seconde", "maths", "geometrie", "projete", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_geo_proj_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "geometrie_problemes_plan",
    microId: "geo_projete_orthogonal",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est l'ordonnée du projeté orthogonal de $M(5\\,;4)$ sur l'axe des abscisses ?",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "Tout point de l'axe des abscisses a une ordonnée nulle.",
    explanation: exp(
      "Le projeté sur l'axe des abscisses a une ordonnée nulle.",
      "On garde l'abscisse $5$ et l'ordonnée devient $0$.",
      "Le projeté est $(5\\,;0)$.",
      "Son ordonnée vaut $0$."
    ),
    tags: ["seconde", "maths", "geometrie", "projete", "short"],
  },

  {
    kind: "template",
    id: "seconde_geo_proj_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "geometrie_problemes_plan",
    microId: "geo_projete_orthogonal",
    difficulty: 3,
    theme: "neutral",
    hint: "Projeté sur l'axe des abscisses : ordonnée $\\to 0$.",
    tags: ["seconde", "maths", "geometrie", "projete", "template"],
    generate: () => {
      // Un point sur l'axe des ordonnées se projette sur l'origine : le piège
      // « on a tout mis à zéro » devenait la bonne réponse.
      const x = shuffle([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5])[0];
      const y = randomInt(1, 5);
      const correct = `$(${x}\\,;0)$`;
      const choices = makeChoices(correct, [
        `$(0\\,;${y})$`,
        `$(${x}\\,;${y})$`,
        `$(0\\,;0)$`,
      ]);
      return {
        text: `Quelles sont les coordonnées du projeté orthogonal de $M(${x}\\,;${y})$ sur l'axe des abscisses ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On projette sur l'axe des abscisses (ordonnée nulle).",
          "On conserve l'abscisse, l'ordonnée devient $0$.",
          `$M(${x}\\,;${y}) \\to (${x}\\,;0)$.`,
          `Le projeté est $(${x}\\,;0)$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_geo_proj_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "geometrie_problemes_plan",
    microId: "geo_projete_orthogonal",
    difficulty: 3,
    theme: "neutral",
    hint: "Projeté sur l'axe des ordonnées : abscisse $\\to 0$.",
    tags: ["seconde", "maths", "geometrie", "projete", "template"],
    generate: () => {
      const x = randomInt(1, 5);
      // Un point sur l'axe des abscisses fait coïncider deux pièges : « on a
      // gardé l'abscisse » et « on a interverti » s'écrivent alors pareil.
      const y = shuffle([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5])[0];
      const correct = `$(0\\,;${y})$`;
      const choices = makeChoices(correct, [
        `$(${x}\\,;0)$`,
        `$(${x}\\,;${y})$`,
        `$(${y}\\,;0)$`,
      ]);
      return {
        text: `Quelles sont les coordonnées du projeté orthogonal de $M(${x}\\,;${y})$ sur l'axe des ordonnées ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On projette sur l'axe des ordonnées (abscisse nulle).",
          "On conserve l'ordonnée, l'abscisse devient $0$.",
          `$M(${x}\\,;${y}) \\to (0\\,;${y})$.`,
          `Le projeté est $(0\\,;${y})$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_geo_proj_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "geometrie_problemes_plan",
    microId: "geo_projete_orthogonal",
    difficulty: 4,
    theme: "neutral",
    text: "Au point projeté $H$ de $M$ sur $d$, quel angle forme la droite $(MH)$ avec $d$ ?",
    format: "qcm",
    choices: ["$90°$", "$45°$", "$0°$", "$180°$"],
    expected: ["$90°$"],
    comparator: "mcq_exact",
    hint: "« Orthogonal » impose un angle.",
    explanation: exp(
      "Le projeté est obtenu par une perpendiculaire.",
      "La droite $(MH)$ est perpendiculaire à $d$.",
      "L'angle est donc droit, soit $90°$.",
      "L'angle vaut $90°$."
    ),
    tags: ["seconde", "maths", "geometrie", "projete", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_geo_proj_fixed_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "geometrie_problemes_plan",
    microId: "geo_projete_orthogonal",
    difficulty: 3,
    theme: "neutral",
    text: "Si $M$ appartient déjà à la droite $d$, quel est son projeté orthogonal sur $d$ ?",
    format: "qcm",
    choices: ["$M$ lui-même", "Le milieu de $d$", "L'origine", "Il n'y en a pas"],
    expected: ["$M$ lui-même"],
    comparator: "mcq_exact",
    hint: "La distance de $M$ à $d$ est alors nulle.",
    explanation: exp(
      "Le projeté est le point de $d$ le plus proche de $M$.",
      "Si $M \\in d$, le plus proche est $M$ lui-même (distance nulle).",
      "Donc le projeté est $M$.",
      "Le projeté est $M$ lui-même."
    ),
    tags: ["seconde", "maths", "geometrie", "projete", "raisonnement", "qcm"],
  },

  /* ===================== GEO_TRIGONOMETRIE ===================== */

  {
    kind: "fixed",
    id: "seconde_geo_trig_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "geometrie_problemes_plan",
    microId: "geo_trigonometrie",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un triangle rectangle, le cosinus d'un angle aigu est égal à :",
    format: "qcm",
    choices: [
      "côté adjacent / hypoténuse",
      "côté opposé / hypoténuse",
      "côté opposé / côté adjacent",
      "hypoténuse / côté adjacent",
    ],
    expected: ["côté adjacent / hypoténuse"],
    comparator: "mcq_exact",
    hint: "CAH : Cosinus = Adjacent / Hypoténuse.",
    explanation: exp(
      "On utilise SOH-CAH-TOA.",
      "CAH : Cosinus = Adjacent sur Hypoténuse.",
      "Donc $\\cos = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$.",
      "Cosinus = adjacent / hypoténuse."
    ),
    tags: ["seconde", "maths", "geometrie", "trigonometrie", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_geo_trig_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "geometrie_problemes_plan",
    microId: "geo_trigonometrie",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un triangle rectangle, le sinus d'un angle aigu est égal à :",
    format: "qcm",
    choices: [
      "côté opposé / hypoténuse",
      "côté adjacent / hypoténuse",
      "côté opposé / côté adjacent",
      "hypoténuse / côté opposé",
    ],
    expected: ["côté opposé / hypoténuse"],
    comparator: "mcq_exact",
    hint: "SOH : Sinus = Opposé / Hypoténuse.",
    explanation: exp(
      "On utilise SOH-CAH-TOA.",
      "SOH : Sinus = Opposé sur Hypoténuse.",
      "Donc $\\sin = \\dfrac{\\text{opposé}}{\\text{hypoténuse}}$.",
      "Sinus = opposé / hypoténuse."
    ),
    tags: ["seconde", "maths", "geometrie", "trigonometrie", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_geo_trig_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "geometrie_problemes_plan",
    microId: "geo_trigonometrie",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un triangle rectangle, la tangente d'un angle aigu est égale à :",
    format: "qcm",
    choices: [
      "côté opposé / côté adjacent",
      "côté adjacent / côté opposé",
      "opposé / hypoténuse",
      "adjacent / hypoténuse",
    ],
    expected: ["côté opposé / côté adjacent"],
    comparator: "mcq_exact",
    hint: "TOA : Tangente = Opposé / Adjacent.",
    explanation: exp(
      "On utilise SOH-CAH-TOA.",
      "TOA : Tangente = Opposé sur Adjacent.",
      "Donc $\\tan = \\dfrac{\\text{opposé}}{\\text{adjacent}}$.",
      "Tangente = opposé / adjacent."
    ),
    tags: ["seconde", "maths", "geometrie", "trigonometrie", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_geo_trig_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "geometrie_problemes_plan",
    microId: "geo_trigonometrie",
    difficulty: 3,
    theme: "neutral",
    text: "Triangle $ABC$ rectangle en $B$ : $AB = 4$, $BC = 3$, $AC = 5$. Combien vaut $\\cos(\\widehat{A})$ ?",
    format: "qcm",
    choices: ["$\\dfrac{4}{5}$", "$\\dfrac{3}{5}$", "$\\dfrac{3}{4}$", "$\\dfrac{5}{4}$"],
    expected: ["$\\dfrac{4}{5}$"],
    comparator: "mcq_exact",
    canvas: triangleRectangle("4", "3", "5"),
    hint: "Pour l'angle $\\widehat{A}$ : adjacent $= AB$, hypoténuse $= AC$.",
    explanation: exp(
      "On applique CAH pour l'angle $\\widehat{A}$.",
      "Adjacent à $\\widehat{A}$ : $AB = 4$ ; hypoténuse : $AC = 5$.",
      "$\\cos(\\widehat{A}) = \\dfrac{4}{5}$.",
      "$\\cos(\\widehat{A}) = \\dfrac{4}{5}$."
    ),
    tags: ["seconde", "maths", "geometrie", "trigonometrie", "canvas", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_geo_trig_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "geometrie_problemes_plan",
    microId: "geo_trigonometrie",
    difficulty: 3,
    theme: "neutral",
    text: "Triangle $ABC$ rectangle en $B$ : $AB = 4$, $BC = 3$, $AC = 5$. Combien vaut $\\sin(\\widehat{A})$ ?",
    format: "qcm",
    choices: ["$\\dfrac{3}{5}$", "$\\dfrac{4}{5}$", "$\\dfrac{3}{4}$", "$\\dfrac{5}{3}$"],
    expected: ["$\\dfrac{3}{5}$"],
    comparator: "mcq_exact",
    canvas: triangleRectangle("4", "3", "5"),
    hint: "Pour $\\widehat{A}$ : opposé $= BC$, hypoténuse $= AC$.",
    explanation: exp(
      "On applique SOH pour l'angle $\\widehat{A}$.",
      "Opposé à $\\widehat{A}$ : $BC = 3$ ; hypoténuse : $AC = 5$.",
      "$\\sin(\\widehat{A}) = \\dfrac{3}{5}$.",
      "$\\sin(\\widehat{A}) = \\dfrac{3}{5}$."
    ),
    tags: ["seconde", "maths", "geometrie", "trigonometrie", "canvas", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_geo_trig_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "geometrie_problemes_plan",
    microId: "geo_trigonometrie",
    difficulty: 3,
    theme: "neutral",
    text: "Triangle $ABC$ rectangle en $B$ : $AB = 4$, $BC = 3$. Combien vaut $\\tan(\\widehat{A})$ ?",
    format: "qcm",
    choices: ["$\\dfrac{3}{4}$", "$\\dfrac{4}{3}$", "$\\dfrac{3}{5}$", "$\\dfrac{4}{5}$"],
    expected: ["$\\dfrac{3}{4}$"],
    comparator: "mcq_exact",
    hint: "Pour $\\widehat{A}$ : opposé $= BC$, adjacent $= AB$.",
    explanation: exp(
      "On applique TOA pour l'angle $\\widehat{A}$.",
      "Opposé : $BC = 3$ ; adjacent : $AB = 4$.",
      "$\\tan(\\widehat{A}) = \\dfrac{3}{4}$.",
      "$\\tan(\\widehat{A}) = \\dfrac{3}{4}$."
    ),
    tags: ["seconde", "maths", "geometrie", "trigonometrie", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_geo_trig_fixed_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "geometrie_problemes_plan",
    microId: "geo_trigonometrie",
    difficulty: 1,
    theme: "neutral",
    text: "Le moyen mnémotechnique pour la trigonométrie du triangle rectangle est :",
    format: "qcm",
    choices: ["SOH-CAH-TOA", "PEMDAS", "FOIL", "GPS"],
    expected: ["SOH-CAH-TOA"],
    comparator: "mcq_exact",
    hint: "Sinus-Opposé-Hypoténuse, etc.",
    explanation: exp(
      "Un moyen mnémotechnique résume les trois rapports.",
      "SOH (sin=O/H), CAH (cos=A/H), TOA (tan=O/A).",
      "C'est SOH-CAH-TOA.",
      "SOH-CAH-TOA."
    ),
    tags: ["seconde", "maths", "geometrie", "trigonometrie", "raisonnement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_geo_trig_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "geometrie_problemes_plan",
    microId: "geo_trigonometrie",
    difficulty: 4,
    theme: "neutral",
    hint: "CAH : cos = adjacent / hypoténuse.",
    tags: ["seconde", "maths", "geometrie", "trigonometrie", "template"],
    generate: () => {
      // triangle rectangle en B, angle en A : adjacent = AB, oppose = BC, hyp = AC
      const triples = [
        [4, 3, 5],
        [3, 4, 5],
        [6, 8, 10],
        [8, 6, 10],
        [5, 12, 13],
        [12, 5, 13],
      ];
      const [ab, bc, ac] = triples[randomInt(0, triples.length - 1)];
      const correct = `$\\dfrac{${ab}}{${ac}}$`;
      const choices = [correct, `$\\dfrac{${bc}}{${ac}}$`, `$\\dfrac{${bc}}{${ab}}$`, `$\\dfrac{${ac}}{${ab}}$`];
      return {
        text: `Triangle $ABC$ rectangle en $B$ : $AB = ${ab}$, $BC = ${bc}$, $AC = ${ac}$. Combien vaut $\\cos(\\widehat{A})$ ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On applique CAH pour l'angle $\\widehat{A}$.",
          `Adjacent : $AB = ${ab}$ ; hypoténuse : $AC = ${ac}$.`,
          `$\\cos(\\widehat{A}) = \\dfrac{${ab}}{${ac}}$.`,
          `$\\cos(\\widehat{A}) = \\dfrac{${ab}}{${ac}}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_geo_trig_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "geometrie_problemes_plan",
    microId: "geo_trigonometrie",
    difficulty: 4,
    theme: "neutral",
    hint: "SOH : sin = opposé / hypoténuse.",
    tags: ["seconde", "maths", "geometrie", "trigonometrie", "template"],
    generate: () => {
      const triples = [
        [4, 3, 5],
        [3, 4, 5],
        [6, 8, 10],
        [5, 12, 13],
      ];
      const [ab, bc, ac] = triples[randomInt(0, triples.length - 1)];
      const correct = `$\\dfrac{${bc}}{${ac}}$`;
      const choices = [correct, `$\\dfrac{${ab}}{${ac}}$`, `$\\dfrac{${bc}}{${ab}}$`, `$\\dfrac{${ac}}{${bc}}$`];
      return {
        text: `Triangle $ABC$ rectangle en $B$ : $AB = ${ab}$, $BC = ${bc}$, $AC = ${ac}$. Combien vaut $\\sin(\\widehat{A})$ ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On applique SOH pour l'angle $\\widehat{A}$.",
          `Opposé : $BC = ${bc}$ ; hypoténuse : $AC = ${ac}$.`,
          `$\\sin(\\widehat{A}) = \\dfrac{${bc}}{${ac}}$.`,
          `$\\sin(\\widehat{A}) = \\dfrac{${bc}}{${ac}}$.`
        ),
      };
    },
  },

  /* ===================== GEO_TRIG_IDENTITE ===================== */

  {
    kind: "fixed",
    id: "seconde_geo_id_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "geometrie_problemes_plan",
    microId: "geo_trig_identite",
    difficulty: 2,
    theme: "neutral",
    text: "Pour un angle aigu $\\alpha$, combien vaut $\\cos^2(\\alpha) + \\sin^2(\\alpha)$ ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "C'est l'identité trigonométrique fondamentale.",
    explanation: exp(
      "Il existe une relation fondamentale entre cosinus et sinus.",
      "Elle découle du théorème de Pythagore.",
      "$\\cos^2(\\alpha) + \\sin^2(\\alpha) = 1$.",
      "Cela vaut $1$."
    ),
    tags: ["seconde", "maths", "geometrie", "trig_identite", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_geo_id_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "geometrie_problemes_plan",
    microId: "geo_trig_identite",
    difficulty: 3,
    theme: "neutral",
    text: "D'où vient la relation $\\cos^2(\\alpha) + \\sin^2(\\alpha) = 1$ ?",
    format: "qcm",
    choices: [
      "Du théorème de Pythagore dans le triangle rectangle",
      "De la relation de Chasles",
      "Du théorème de Thalès",
      "De la définition de la tangente",
    ],
    expected: ["Du théorème de Pythagore dans le triangle rectangle"],
    comparator: "mcq_exact",
    hint: "Opposé² + adjacent² = hypoténuse².",
    explanation: exp(
      "On part de Pythagore : opposé² + adjacent² = hypoténuse².",
      "On divise par hypoténuse² : $\\sin^2 + \\cos^2 = 1$.",
      "C'est donc une conséquence de Pythagore.",
      "Elle vient du théorème de Pythagore."
    ),
    tags: ["seconde", "maths", "geometrie", "trig_identite", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_geo_id_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "geometrie_problemes_plan",
    microId: "geo_trig_identite",
    difficulty: 3,
    theme: "neutral",
    text: "Un angle aigu $\\alpha$ vérifie $\\cos(\\alpha) = 0{,}6$. Combien vaut $\\sin(\\alpha)$ ?",
    format: "short",
    expected: ["0,8", "0.8"],
    comparator: "number_equal",
    hint: "$\\sin^2 = 1 - \\cos^2 = 1 - 0{,}36$.",
    explanation: exp(
      "On utilise $\\cos^2 + \\sin^2 = 1$.",
      "$\\sin^2(\\alpha) = 1 - 0{,}6^2 = 1 - 0{,}36 = 0{,}64$.",
      "$\\sin(\\alpha) = \\sqrt{0{,}64} = 0{,}8$ (angle aigu → positif).",
      "$\\sin(\\alpha) = 0{,}8$."
    ),
    tags: ["seconde", "maths", "geometrie", "trig_identite", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_geo_id_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "geometrie_problemes_plan",
    microId: "geo_trig_identite",
    difficulty: 4,
    theme: "neutral",
    text: "Un angle aigu $\\alpha$ vérifie $\\sin(\\alpha) = 0{,}8$. Combien vaut $\\cos(\\alpha)$ ?",
    format: "short",
    expected: ["0,6", "0.6"],
    comparator: "number_equal",
    hint: "$\\cos^2 = 1 - \\sin^2 = 1 - 0{,}64$.",
    explanation: exp(
      "On utilise $\\cos^2 + \\sin^2 = 1$.",
      "$\\cos^2(\\alpha) = 1 - 0{,}8^2 = 1 - 0{,}64 = 0{,}36$.",
      "$\\cos(\\alpha) = \\sqrt{0{,}36} = 0{,}6$.",
      "$\\cos(\\alpha) = 0{,}6$."
    ),
    tags: ["seconde", "maths", "geometrie", "trig_identite", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_geo_id_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "geometrie_problemes_plan",
    microId: "geo_trig_identite",
    difficulty: 2,
    theme: "neutral",
    text: "Laquelle de ces égalités est l'identité trigonométrique fondamentale ?",
    format: "qcm",
    choices: [
      "$\\cos^2(\\alpha) + \\sin^2(\\alpha) = 1$",
      "$\\cos(\\alpha) + \\sin(\\alpha) = 1$",
      "$\\cos^2(\\alpha) - \\sin^2(\\alpha) = 1$",
      "$\\cos(\\alpha) \\times \\sin(\\alpha) = 1$",
    ],
    expected: ["$\\cos^2(\\alpha) + \\sin^2(\\alpha) = 1$"],
    comparator: "mcq_exact",
    hint: "Ce sont les carrés qui interviennent.",
    explanation: exp(
      "L'identité fondamentale relie les carrés du cosinus et du sinus.",
      "$\\cos^2 + \\sin^2 = 1$ (et non $\\cos + \\sin$).",
      "C'est la bonne égalité.",
      "$\\cos^2(\\alpha) + \\sin^2(\\alpha) = 1$."
    ),
    tags: ["seconde", "maths", "geometrie", "trig_identite", "raisonnement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_geo_id_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "geometrie_problemes_plan",
    microId: "geo_trig_identite",
    difficulty: 4,
    theme: "neutral",
    hint: "$\\sin^2 = 1 - \\cos^2$ (angle aigu).",
    tags: ["seconde", "maths", "geometrie", "trig_identite", "template"],
    generate: () => {
      // couples (cos, sin) issus de triplets : (0.6,0.8),(0.8,0.6)
      const couples = [
        ["0,6", "0,8", "0.8"],
        ["0,8", "0,6", "0.6"],
      ];
      const [c, sFr, sPt] = couples[randomInt(0, couples.length - 1)];
      return {
        text: `Un angle aigu $\\alpha$ vérifie $\\cos(\\alpha) = ${c}$. Combien vaut $\\sin(\\alpha)$ ?`,
        format: "short",
        expected: [sFr, sPt],
        comparator: "number_equal",
        explanation: exp(
          "On utilise $\\cos^2 + \\sin^2 = 1$.",
          `$\\sin^2(\\alpha) = 1 - ${c}^2$.`,
          `$\\sin(\\alpha) = ${sFr}$ (angle aigu → positif).`,
          `$\\sin(\\alpha) = ${sFr}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_geo_id_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "geometrie_problemes_plan",
    microId: "geo_trig_identite",
    difficulty: 2,
    theme: "neutral",
    hint: "Somme des carrés du cos et du sin.",
    tags: ["seconde", "maths", "geometrie", "trig_identite", "raisonnement", "template"],
    generate: () => {
      const correct = "$1$";
      const choices = ["$1$", "$0$", "$2$", "$\\cos(\\alpha)$"];
      return {
        text: "Pour tout angle aigu $\\alpha$, combien vaut $\\sin^2(\\alpha) + \\cos^2(\\alpha)$ ?",
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "C'est l'identité trigonométrique fondamentale.",
          "Elle découle du théorème de Pythagore.",
          "$\\sin^2(\\alpha) + \\cos^2(\\alpha) = 1$.",
          "Cela vaut $1$."
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_geo_id_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "geometrie_problemes_plan",
    microId: "geo_trig_identite",
    difficulty: 3,
    theme: "neutral",
    text: "Un angle aigu $\\alpha$ vérifie $\\cos(\\alpha) = \\dfrac{3}{5}$. Combien vaut $\\sin(\\alpha)$ ?",
    format: "qcm",
    choices: ["$\\dfrac{4}{5}$", "$\\dfrac{3}{5}$", "$\\dfrac{5}{3}$", "$\\dfrac{2}{5}$"],
    expected: ["$\\dfrac{4}{5}$"],
    comparator: "mcq_exact",
    hint: "$\\sin^2 = 1 - \\left(\\dfrac{3}{5}\\right)^2$.",
    explanation: exp(
      "On utilise $\\cos^2 + \\sin^2 = 1$.",
      "$\\sin^2 = 1 - \\dfrac{9}{25} = \\dfrac{16}{25}$.",
      "$\\sin(\\alpha) = \\dfrac{4}{5}$ (angle aigu).",
      "$\\sin(\\alpha) = \\dfrac{4}{5}$."
    ),
    tags: ["seconde", "maths", "geometrie", "trig_identite", "qcm"],
  },

  /* ===================== GEO_LONGUEURS_AIRES ===================== */

  {
    kind: "fixed",
    id: "seconde_geo_aire_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "geometrie_problemes_plan",
    microId: "geo_longueurs_aires",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la formule de l'aire d'un triangle ?",
    format: "qcm",
    choices: [
      "$\\dfrac{\\text{base} \\times \\text{hauteur}}{2}$",
      "$\\text{base} \\times \\text{hauteur}$",
      "$\\dfrac{\\text{base} + \\text{hauteur}}{2}$",
      "$\\text{côté}^2$",
    ],
    expected: ["$\\dfrac{\\text{base} \\times \\text{hauteur}}{2}$"],
    comparator: "mcq_exact",
    hint: "C'est la moitié de l'aire du rectangle correspondant.",
    explanation: exp(
      "L'aire d'un triangle est la moitié de base × hauteur.",
      "On applique $\\dfrac{b \\times h}{2}$.",
      "C'est la moitié du rectangle de mêmes base et hauteur.",
      "Aire $= \\dfrac{\\text{base} \\times \\text{hauteur}}{2}$."
    ),
    tags: ["seconde", "maths", "geometrie", "aires", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_geo_aire_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "geometrie_problemes_plan",
    microId: "geo_longueurs_aires",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est l'aire d'un triangle de base $6$ et de hauteur $4$ ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "$\\dfrac{6 \\times 4}{2}$.",
    explanation: exp(
      "On applique la formule de l'aire du triangle.",
      "$\\dfrac{6 \\times 4}{2} = \\dfrac{24}{2}$.",
      "$= 12$.",
      "L'aire vaut $12$."
    ),
    tags: ["seconde", "maths", "geometrie", "aires", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_geo_aire_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "geometrie_problemes_plan",
    microId: "geo_longueurs_aires",
    difficulty: 3,
    theme: "neutral",
    text: "Triangle rectangle en $B$ avec $AB = 3$ et $BC = 4$. Quelle est la longueur de l'hypoténuse $AC$ ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Pythagore : $AC^2 = AB^2 + BC^2$.",
    explanation: exp(
      "On applique le théorème de Pythagore.",
      "$AC^2 = 3^2 + 4^2 = 9 + 16 = 25$.",
      "$AC = \\sqrt{25} = 5$.",
      "$AC = 5$."
    ),
    tags: ["seconde", "maths", "geometrie", "aires", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_geo_aire_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "geometrie_problemes_plan",
    microId: "geo_longueurs_aires",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est l'aire d'un rectangle de longueur $7$ et de largeur $5$ ?",
    format: "short",
    expected: ["35"],
    comparator: "number_equal",
    hint: "Aire $=$ longueur $\\times$ largeur.",
    explanation: exp(
      "L'aire d'un rectangle est le produit longueur × largeur.",
      "$7 \\times 5$.",
      "$= 35$.",
      "L'aire vaut $35$."
    ),
    tags: ["seconde", "maths", "geometrie", "aires", "short"],
  },

  {
    kind: "template",
    id: "seconde_geo_aire_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "geometrie_problemes_plan",
    microId: "geo_longueurs_aires",
    difficulty: 3,
    theme: "neutral",
    hint: "Aire du triangle $= \\dfrac{b \\times h}{2}$.",
    tags: ["seconde", "maths", "geometrie", "aires", "template"],
    generate: () => {
      const b = 2 * randomInt(2, 6);
      const h = randomInt(3, 9);
      const aire = (b * h) / 2;
      return {
        text: `Quelle est l'aire d'un triangle de base $${b}$ et de hauteur $${h}$ ?`,
        format: "short",
        expected: [String(aire)],
        comparator: "number_equal",
        explanation: exp(
          "On applique la formule de l'aire du triangle.",
          `$\\dfrac{${b} \\times ${h}}{2} = \\dfrac{${b * h}}{2}$.`,
          `$= ${aire}$.`,
          `L'aire vaut $${aire}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_geo_aire_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "geometrie_problemes_plan",
    microId: "geo_longueurs_aires",
    difficulty: 4,
    theme: "neutral",
    hint: "Pythagore : hypoténuse² = somme des carrés des côtés.",
    tags: ["seconde", "maths", "geometrie", "aires", "template"],
    generate: () => {
      const triples = [
        [3, 4, 5],
        [6, 8, 10],
        [5, 12, 13],
        [8, 15, 17],
      ];
      const [a, b, c] = triples[randomInt(0, triples.length - 1)];
      return {
        text: `Triangle rectangle en $B$ avec $AB = ${a}$ et $BC = ${b}$. Quelle est la longueur de l'hypoténuse $AC$ ?`,
        format: "short",
        expected: [String(c)],
        comparator: "number_equal",
        explanation: exp(
          "On applique le théorème de Pythagore.",
          `$AC^2 = ${a}^2 + ${b}^2 = ${a * a} + ${b * b} = ${a * a + b * b}$.`,
          `$AC = \\sqrt{${a * a + b * b}} = ${c}$.`,
          `$AC = ${c}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_geo_aire_tpl_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "geometrie_problemes_plan",
    microId: "geo_longueurs_aires",
    difficulty: 2,
    theme: "neutral",
    hint: "Aire du rectangle $=$ longueur $\\times$ largeur.",
    tags: ["seconde", "maths", "geometrie", "aires", "template"],
    generate: () => {
      const L = randomInt(4, 12);
      const l = randomInt(2, L - 1);
      return {
        text: `Quelle est l'aire d'un rectangle de longueur $${L}$ et de largeur $${l}$ ?`,
        format: "short",
        expected: [String(L * l)],
        comparator: "number_equal",
        explanation: exp(
          "L'aire d'un rectangle est longueur × largeur.",
          `$${L} \\times ${l}$.`,
          `$= ${L * l}$.`,
          `L'aire vaut $${L * l}$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_geo_aire_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "geometrie_problemes_plan",
    microId: "geo_longueurs_aires",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est l'aire d'un carré de côté $5$ ?",
    format: "short",
    expected: ["25"],
    comparator: "number_equal",
    hint: "Aire $= \\text{côté}^2$.",
    explanation: exp(
      "L'aire d'un carré est le carré de son côté.",
      "$5^2$.",
      "$= 25$.",
      "L'aire vaut $25$."
    ),
    tags: ["seconde", "maths", "geometrie", "aires", "short"],
  },

  /* ===================== GEO_OPTIMISATION ===================== */

  {
    kind: "fixed",
    id: "seconde_geo_opt_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "geometrie_problemes_plan",
    microId: "geo_optimisation",
    difficulty: 2,
    theme: "neutral",
    text: "Optimiser une grandeur, c'est chercher :",
    format: "qcm",
    choices: [
      "sa valeur maximale ou minimale",
      "sa valeur moyenne",
      "n'importe quelle valeur",
      "sa valeur de départ",
    ],
    expected: ["sa valeur maximale ou minimale"],
    comparator: "mcq_exact",
    hint: "Maximum ou minimum.",
    explanation: exp(
      "Un problème d'optimisation cherche un extremum.",
      "On veut rendre une grandeur la plus grande (ou la plus petite) possible.",
      "C'est chercher un maximum ou un minimum.",
      "On cherche la valeur maximale ou minimale."
    ),
    tags: ["seconde", "maths", "geometrie", "optimisation", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_geo_opt_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "geometrie_problemes_plan",
    microId: "geo_optimisation",
    difficulty: 4,
    theme: "neutral",
    text: "Parmi ces rectangles de périmètre $20$, lequel a la plus grande aire ?",
    format: "qcm",
    choices: ["$5 \\times 5$ (aire $25$)", "$8 \\times 2$ (aire $16$)", "$9 \\times 1$ (aire $9$)", "$7 \\times 3$ (aire $21$)"],
    expected: ["$5 \\times 5$ (aire $25$)"],
    comparator: "mcq_exact",
    hint: "Compare les aires (longueur + largeur $= 10$).",
    explanation: exp(
      "À périmètre fixé, on compare les aires possibles.",
      "Aires : $25$, $16$, $9$, $21$.",
      "La plus grande est $25$, pour le carré $5 \\times 5$.",
      "Le carré $5 \\times 5$ a la plus grande aire."
    ),
    tags: ["seconde", "maths", "geometrie", "optimisation", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_geo_opt_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "geometrie_problemes_plan",
    microId: "geo_optimisation",
    difficulty: 4,
    theme: "neutral",
    text: "Parmi les rectangles de périmètre fixé, lequel a l'aire maximale ?",
    format: "qcm",
    choices: ["Le carré", "Le plus allongé", "Le plus plat", "Cela ne dépend pas de la forme"],
    expected: ["Le carré"],
    comparator: "mcq_exact",
    hint: "Une forme « équilibrée » maximise l'aire.",
    explanation: exp(
      "À périmètre fixé, l'aire dépend de la forme.",
      "Plus le rectangle est « équilibré », plus l'aire est grande.",
      "Le maximum est atteint pour le carré.",
      "C'est le carré."
    ),
    tags: ["seconde", "maths", "geometrie", "optimisation", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_geo_opt_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "geometrie_problemes_plan",
    microId: "geo_optimisation",
    difficulty: 3,
    theme: "neutral",
    text: "Pour résoudre un problème d'optimisation, on exprime souvent la grandeur à optimiser comme :",
    format: "qcm",
    choices: [
      "une fonction d'une variable, dont on cherche l'extremum",
      "un nombre fixe",
      "une simple somme",
      "un angle",
    ],
    expected: ["une fonction d'une variable, dont on cherche l'extremum"],
    comparator: "mcq_exact",
    hint: "On modélise par une fonction.",
    explanation: exp(
      "On modélise la grandeur (aire, longueur…) par une fonction d'une variable.",
      "On étudie ensuite ses variations.",
      "L'extremum (max ou min) donne la solution.",
      "On l'exprime comme une fonction dont on cherche l'extremum."
    ),
    tags: ["seconde", "maths", "geometrie", "optimisation", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_geo_opt_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "geometrie_problemes_plan",
    microId: "geo_optimisation",
    difficulty: 3,
    theme: "neutral",
    text: "On dispose de $12$ m de clôture pour un enclos rectangulaire. Parmi ces dimensions, laquelle donne l'aire maximale ?",
    format: "qcm",
    choices: ["$3 \\times 3$", "$5 \\times 1$", "$4 \\times 2$", "$2{,}5 \\times 3{,}5$"],
    expected: ["$3 \\times 3$"],
    comparator: "mcq_exact",
    hint: "Périmètre $12$ → longueur + largeur $= 6$. Le carré maximise.",
    explanation: exp(
      "Le périmètre $12$ donne longueur + largeur $= 6$.",
      "Aires : $9$, $5$, $8$, $8{,}75$.",
      "La plus grande est $9$, pour $3 \\times 3$ (le carré).",
      "Les dimensions $3 \\times 3$ donnent l'aire maximale."
    ),
    tags: ["seconde", "maths", "geometrie", "optimisation", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_geo_opt_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "geometrie_problemes_plan",
    microId: "geo_optimisation",
    difficulty: 4,
    theme: "neutral",
    hint: "Compare les aires des options.",
    tags: ["seconde", "maths", "geometrie", "optimisation", "template"],
    generate: () => {
      // demi-perimetre s : longueur + largeur = s ; aire max pour côtés égaux (s/2)
      const demi = 2 * randomInt(4, 8); // pair pour un carré entier
      const cote = demi / 2;
      const a1 = cote * cote;
      const l2 = cote - 2;
      const a2 = l2 * (demi - l2);
      const l3 = 1;
      const a3 = l3 * (demi - l3);
      const correct = `$${cote} \\times ${cote}$ (aire $${a1}$)`;
      const choices = [
        correct,
        `$${l2} \\times ${demi - l2}$ (aire $${a2}$)`,
        `$${l3} \\times ${demi - l3}$ (aire $${a3}$)`,
        `$${cote - 1} \\times ${demi - (cote - 1)}$ (aire $${(cote - 1) * (demi - (cote - 1))}$)`,
      ];
      return {
        text: `Parmi ces rectangles de périmètre $${2 * demi}$, lequel a la plus grande aire ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "À périmètre fixé, l'aire est maximale pour le carré.",
          `Ici longueur + largeur $= ${demi}$ ; le carré a pour côté $${cote}$.`,
          `Son aire $${cote} \\times ${cote} = ${a1}$ est la plus grande.`,
          `Le carré $${cote} \\times ${cote}$ a la plus grande aire.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_geo_opt_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "geometrie_problemes_plan",
    microId: "geo_optimisation",
    difficulty: 5,
    theme: "neutral",
    text: "Pour trouver le minimum exact d'une grandeur modélisée par une fonction, l'outil le plus adapté en seconde est :",
    format: "qcm",
    choices: [
      "le tableau de variations de la fonction",
      "le théorème de Pythagore",
      "la relation de Chasles",
      "le calcul d'un pourcentage",
    ],
    expected: ["le tableau de variations de la fonction"],
    comparator: "mcq_exact",
    hint: "On étudie comment la grandeur varie.",
    explanation: exp(
      "On modélise la grandeur par une fonction, puis on étudie ses variations.",
      "Le tableau de variations montre où se trouve le minimum (ou maximum).",
      "C'est l'outil adapté pour conclure.",
      "On utilise le tableau de variations de la fonction."
    ),
    tags: ["seconde", "maths", "geometrie", "optimisation", "raisonnement", "qcm"],
  },
];
