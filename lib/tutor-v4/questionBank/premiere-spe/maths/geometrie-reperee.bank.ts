// lib/tutor-v4/questionBank/premiere-spe/maths/geometrie-reperee.bank.ts
//
// Chapitre : Géométrie repérée (notion "geometrie_reperee")
// microSkills :
//   gr_vecteur_normal — équation de droite et vecteur normal
//   gr_cercle         — équation d'un cercle : centre et rayon
//   gr_parabole       — axe de symétrie et sommet d'une parabole
//
// PÉRIMÈTRE BO 2019 Première spé. Conventions : LaTeX, règle QCM.
// Canvas : fonctionGraphique (parabole). Le cercle n'est PAS rendu → on reste en texte/LaTeX.

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

function parabole(a: number, b: number, c: number): CanvasFigure {
  const xs = -b / (2 * a);
  const ys = a * xs * xs + b * xs + c;
  return {
    kind: "fonctionGraphique",
    size: { width: 300, height: 300 },
    xmin: -6,
    xmax: 6,
    ymin: -8,
    ymax: 8,
    grille: true,
    courbes: [{ id: "f", type: "quadratique", a, b, c, couleur: "#2563eb" }],
    misesEnEvidence: [
      { point: { x: Math.round(xs * 100) / 100, y: Math.round(ys * 100) / 100, label: "S", couleur: "#dc2626" } },
    ],
  };
}

export const geometrieRepereeBank: TutorBankItemV4[] = [
  /* ===================== GR_VECTEUR_NORMAL ===================== */
  {
    kind: "fixed",
    id: "premiere_gr_vn_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_vecteur_normal",
    difficulty: 2,
    theme: "neutral",
    text: "Un vecteur normal à la droite d'équation $ax + by + c = 0$ a pour coordonnées :",
    format: "qcm",
    choices: ["$(a ; b)$", "$(-b ; a)$", "$(b ; a)$", "$(c ; 0)$"],
    expected: ["$(a ; b)$"],
    comparator: "mcq_exact",
    hint: "On lit les coefficients de $x$ et $y$.",
    explanation: exp(
      "Pour une droite $ax + by + c = 0$, le vecteur de coordonnées $(a ; b)$ lui est normal.",
      "On lit directement les coefficients de $x$ et $y$.",
      "$\\vec{n}(a ; b)$.",
      "$(a ; b)$."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "vecteur_normal", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_gr_vn_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_vecteur_normal",
    difficulty: 3,
    theme: "neutral",
    text: "Un vecteur directeur de la droite $ax + by + c = 0$ a pour coordonnées :",
    format: "qcm",
    choices: ["$(-b ; a)$", "$(a ; b)$", "$(b ; a)$", "$(a ; -b)$"],
    expected: ["$(-b ; a)$"],
    comparator: "mcq_exact",
    hint: "Orthogonal au vecteur normal $(a ; b)$.",
    explanation: exp(
      "Le vecteur directeur est orthogonal au vecteur normal $(a ; b)$.",
      "Le vecteur $(-b ; a)$ vérifie $(a)(-b) + (b)(a) = 0$.",
      "Il est donc directeur de la droite.",
      "$(-b ; a)$."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "vecteur_normal", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_gr_vn_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_vecteur_normal",
    difficulty: 3,
    theme: "neutral",
    text: "Quel est un vecteur normal à la droite $3x - 2y + 5 = 0$ ?",
    format: "qcm",
    choices: ["$(3 ; -2)$", "$(2 ; 3)$", "$(-3 ; 2)$", "$(5 ; 0)$"],
    expected: ["$(3 ; -2)$"],
    comparator: "mcq_exact",
    hint: "Coefficients de $x$ et $y$.",
    explanation: exp(
      "On lit les coefficients de $x$ et $y$.",
      "$a = 3$, $b = -2$.",
      "Le vecteur normal est $(3 ; -2)$.",
      "$(3 ; -2)$."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "vecteur_normal", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_gr_vn_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_vecteur_normal",
    difficulty: 4,
    theme: "neutral",
    text: "La droite passant par l'origine et de vecteur normal $\\vec{n}(2 ; 3)$ a pour équation :",
    format: "qcm",
    choices: ["$2x + 3y = 0$", "$3x + 2y = 0$", "$2x - 3y = 0$", "$2x + 3y = 1$"],
    expected: ["$2x + 3y = 0$"],
    comparator: "mcq_exact",
    hint: "$ax + by + c = 0$ avec $(a ; b) = (2 ; 3)$, passe par $(0;0)$.",
    explanation: exp(
      "L'équation est $2x + 3y + c = 0$ (coefficients = vecteur normal).",
      "Elle passe par l'origine : $2 \\times 0 + 3 \\times 0 + c = 0$ donc $c = 0$.",
      "$2x + 3y = 0$.",
      "$2x + 3y = 0$."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "vecteur_normal", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_gr_vn_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_vecteur_normal",
    difficulty: 4,
    theme: "neutral",
    text: "La droite de vecteur normal $\\vec{n}(1 ; 2)$ passant par $A(3 ; 0)$ a pour équation :",
    format: "qcm",
    choices: ["$x + 2y - 3 = 0$", "$x + 2y + 3 = 0$", "$2x + y - 3 = 0$", "$x + 2y = 3y$"],
    expected: ["$x + 2y - 3 = 0$"],
    comparator: "mcq_exact",
    hint: "$x + 2y + c = 0$, puis on remplace par $A$.",
    explanation: exp(
      "L'équation est $1x + 2y + c = 0$.",
      "$A(3 ; 0)$ : $3 + 0 + c = 0$ donc $c = -3$.",
      "$x + 2y - 3 = 0$.",
      "$x + 2y - 3 = 0$."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "vecteur_normal", "qcm"],
  },
  {
    kind: "template",
    id: "premiere_gr_vn_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_vecteur_normal",
    difficulty: 3,
    theme: "neutral",
    hint: "Vecteur normal = coefficients de $x$ et $y$.",
    tags: ["premiere", "maths", "geometrie_reperee", "vecteur_normal", "template"],
    generate: () => {
      const a = randomInt(1, 5);
      const b = randomInt(-5, 5);
      const c = randomInt(-5, 5);
      const correct = `$(${a} ; ${b})$`;
      const choices = [correct, `$(${b} ; ${a})$`, `$(${-b} ; ${a})$`, `$(${c} ; 0)$`];
      return {
        text: `Quel est un vecteur normal à la droite $${a}x ${b >= 0 ? "+ " + b : "- " + -b}y ${c >= 0 ? "+ " + c : "- " + -c} = 0$ ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Le vecteur normal a pour coordonnées les coefficients de $x$ et $y$.",
          `$a = ${a}$, $b = ${b}$.`,
          `Le vecteur normal est $(${a} ; ${b})$.`,
          `$(${a} ; ${b})$.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_gr_vn_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_vecteur_normal",
    difficulty: 4,
    theme: "neutral",
    hint: "$ax + by + c = 0$, puis on remplace par le point.",
    tags: ["premiere", "maths", "geometrie_reperee", "vecteur_normal", "template"],
    generate: () => {
      const a = randomInt(1, 4);
      const b = randomInt(1, 4);
      const xA = randomInt(1, 4);
      const c = -(a * xA); // point (xA ; 0)
      const correct = `$${a}x ${b >= 0 ? "+ " + b : "- " + -b}y ${c >= 0 ? "+ " + c : "- " + -c} = 0$`;
      const choices = [
        correct,
        `$${a}x ${b >= 0 ? "+ " + b : "- " + -b}y ${-c >= 0 ? "+ " + -c : "- " + c} = 0$`,
        `$${b}x ${a >= 0 ? "+ " + a : "- " + -a}y ${c >= 0 ? "+ " + c : "- " + -c} = 0$`,
        `$${a}x ${b >= 0 ? "+ " + b : "- " + -b}y = 0$`,
      ];
      return {
        text: `La droite de vecteur normal $\\vec{n}(${a} ; ${b})$ passant par $A(${xA} ; 0)$ a pour équation :`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "L'équation est $ax + by + c = 0$ avec $(a;b)$ = vecteur normal.",
          `$${a}x ${b >= 0 ? "+ " + b : "- " + -b}y + c = 0$. On remplace par $A(${xA} ; 0)$ : $${a * xA} + c = 0$.`,
          `Donc $c = ${c}$.`,
          `${correct}.`
        ),
      };
    },
  },

  /* ===================== GR_CERCLE ===================== */
  {
    kind: "fixed",
    id: "premiere_gr_cer_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_cercle",
    difficulty: 2,
    theme: "neutral",
    text: "L'équation d'un cercle de centre $\\Omega(a ; b)$ et de rayon $r$ est :",
    format: "qcm",
    choices: [
      "$(x - a)^2 + (y - b)^2 = r^2$",
      "$(x - a)^2 + (y - b)^2 = r$",
      "$(x + a)^2 + (y + b)^2 = r^2$",
      "$x^2 + y^2 = a^2 + b^2$",
    ],
    expected: ["$(x - a)^2 + (y - b)^2 = r^2$"],
    comparator: "mcq_exact",
    hint: "Distance au centre $= r$.",
    explanation: exp(
      "Un point $(x ; y)$ est sur le cercle si sa distance au centre vaut $r$.",
      "Avec la distance au carré : $(x - a)^2 + (y - b)^2 = r^2$.",
      "Le rayon apparaît au carré.",
      "$(x - a)^2 + (y - b)^2 = r^2$."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "cercle", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_gr_cer_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_cercle",
    difficulty: 3,
    theme: "neutral",
    text: "Quel est le centre du cercle d'équation $(x - 2)^2 + (y + 3)^2 = 16$ ?",
    format: "qcm",
    choices: ["$(2 ; -3)$", "$(-2 ; 3)$", "$(2 ; 3)$", "$(4 ; 9)$"],
    expected: ["$(2 ; -3)$"],
    comparator: "mcq_exact",
    hint: "$(x - a)^2 + (y - b)^2$ : attention aux signes.",
    explanation: exp(
      "On identifie $a$ et $b$ dans $(x - a)^2 + (y - b)^2$.",
      "$(x - 2)^2$ donne $a = 2$ ; $(y + 3)^2 = (y - (-3))^2$ donne $b = -3$.",
      "Le centre est $(2 ; -3)$.",
      "$(2 ; -3)$."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "cercle", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_gr_cer_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_cercle",
    difficulty: 3,
    theme: "neutral",
    text: "Quel est le rayon du cercle d'équation $(x - 1)^2 + (y - 2)^2 = 25$ ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "$r^2 = 25$.",
    explanation: exp(
      "Le second membre est $r^2$.",
      "$r^2 = 25$ donc $r = \\sqrt{25}$.",
      "$= 5$.",
      "Le rayon est $5$."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "cercle", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_gr_cer_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_cercle",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est l'équation du cercle de centre $O(0 ; 0)$ et de rayon $3$ ?",
    format: "qcm",
    choices: ["$x^2 + y^2 = 9$", "$x^2 + y^2 = 3$", "$x^2 + y^2 = 6$", "$(x - 3)^2 + y^2 = 0$"],
    expected: ["$x^2 + y^2 = 9$"],
    comparator: "mcq_exact",
    hint: "Centre à l'origine, $r^2 = 9$.",
    explanation: exp(
      "Avec un centre à l'origine, l'équation se simplifie.",
      "$(x - 0)^2 + (y - 0)^2 = r^2$ avec $r = 3$.",
      "$x^2 + y^2 = 9$.",
      "$x^2 + y^2 = 9$."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "cercle", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_gr_cer_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_cercle",
    difficulty: 4,
    theme: "neutral",
    text: "Le point $A(5 ; 2)$ appartient-il au cercle de centre $\\Omega(2 ; 2)$ et de rayon $3$ ?",
    format: "qcm",
    choices: ["Oui", "Non", "Seulement si $r = 5$", "On ne peut pas savoir"],
    expected: ["Oui"],
    comparator: "mcq_exact",
    hint: "Calcule la distance $\\Omega A$.",
    explanation: exp(
      "Un point est sur le cercle si sa distance au centre vaut $r$.",
      "$\\Omega A = \\sqrt{(5-2)^2 + (2-2)^2} = \\sqrt{9} = 3$.",
      "Cette distance vaut bien $r = 3$.",
      "Oui, $A$ appartient au cercle."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "cercle", "qcm"],
  },
  {
    kind: "template",
    id: "premiere_gr_cer_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_cercle",
    difficulty: 3,
    theme: "neutral",
    hint: "Centre $(a ; b)$ avec les signes opposés ; $r = \\sqrt{\\text{2nd membre}}$.",
    tags: ["premiere", "maths", "geometrie_reperee", "cercle", "template"],
    generate: () => {
      const a = randomInt(-4, 4);
      const b = randomInt(-4, 4);
      const r = randomInt(2, 6);
      const correct = `$(${a} ; ${b})$`;
      const choices = [correct, `$(${-a} ; ${-b})$`, `$(${b} ; ${a})$`, `$(${a} ; ${-b})$`];
      return {
        text: `Quel est le centre du cercle d'équation $(x ${a >= 0 ? "- " + a : "+ " + -a})^2 + (y ${b >= 0 ? "- " + b : "+ " + -b})^2 = ${r * r}$ ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On identifie $a$ et $b$ dans $(x - a)^2 + (y - b)^2$.",
          `Ici le centre est $(${a} ; ${b})$ (signes opposés à ceux entre parenthèses).`,
          `Et $r = \\sqrt{${r * r}} = ${r}$.`,
          `Centre $(${a} ; ${b})$.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_gr_cer_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_cercle",
    difficulty: 3,
    theme: "neutral",
    hint: "$r = \\sqrt{\\text{second membre}}$.",
    tags: ["premiere", "maths", "geometrie_reperee", "cercle", "template"],
    generate: () => {
      const r = randomInt(2, 9);
      const a = randomInt(-3, 3);
      const b = randomInt(-3, 3);
      return {
        text: `Quel est le rayon du cercle d'équation $(x ${a >= 0 ? "- " + a : "+ " + -a})^2 + (y ${b >= 0 ? "- " + b : "+ " + -b})^2 = ${r * r}$ ?`,
        format: "short",
        expected: [String(r)],
        comparator: "number_equal",
        explanation: exp(
          "Le second membre vaut $r^2$.",
          `$r^2 = ${r * r}$ donc $r = \\sqrt{${r * r}}$.`,
          `$= ${r}$.`,
          `Le rayon est $${r}$.`
        ),
      };
    },
  },

  /* ===================== GR_PARABOLE ===================== */
  {
    kind: "fixed",
    id: "premiere_gr_par_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_parabole",
    difficulty: 2,
    theme: "neutral",
    text: "L'axe de symétrie de la parabole $y = ax^2 + bx + c$ a pour équation :",
    format: "qcm",
    choices: ["$x = -\\dfrac{b}{2a}$", "$x = \\dfrac{b}{2a}$", "$y = c$", "$x = -\\dfrac{c}{a}$"],
    expected: ["$x = -\\dfrac{b}{2a}$"],
    comparator: "mcq_exact",
    hint: "Abscisse du sommet.",
    explanation: exp(
      "L'axe de symétrie est vertical et passe par le sommet.",
      "Son abscisse est $-\\dfrac{b}{2a}$.",
      "L'axe a pour équation $x = -\\dfrac{b}{2a}$.",
      "$x = -\\dfrac{b}{2a}$."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "parabole", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_gr_par_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_parabole",
    difficulty: 3,
    theme: "neutral",
    text: "Pour la parabole $y = x^2 - 6x + 5$, quelle est l'équation de l'axe de symétrie ?",
    format: "qcm",
    choices: ["$x = 3$", "$x = -3$", "$x = 6$", "$x = 5$"],
    expected: ["$x = 3$"],
    comparator: "mcq_exact",
    hint: "$-\\dfrac{b}{2a}$ avec $a = 1$, $b = -6$.",
    explanation: exp(
      "On calcule $-\\dfrac{b}{2a}$.",
      "$-\\dfrac{-6}{2 \\times 1} = \\dfrac{6}{2} = 3$.",
      "L'axe est $x = 3$.",
      "$x = 3$."
    ),
    canvas: parabole(1, -6, 5),
    tags: ["premiere", "maths", "geometrie_reperee", "parabole", "canvas", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_gr_par_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_parabole",
    difficulty: 3,
    theme: "neutral",
    text: "Pour la parabole $y = x^2 - 4x + 3$, quelle est l'abscisse du sommet ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "$-\\dfrac{b}{2a}$.",
    explanation: exp(
      "L'abscisse du sommet est $-\\dfrac{b}{2a}$.",
      "$-\\dfrac{-4}{2} = 2$.",
      "Le sommet a pour abscisse $2$.",
      "Abscisse du sommet $= 2$."
    ),
    canvas: parabole(1, -4, 3),
    tags: ["premiere", "maths", "geometrie_reperee", "parabole", "canvas", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_gr_par_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_parabole",
    difficulty: 4,
    theme: "neutral",
    text: "Pour la parabole $y = x^2 - 4x + 3$, quelle est l'ordonnée du sommet ?",
    format: "short",
    expected: ["-1"],
    comparator: "number_equal",
    hint: "Calcule $y$ pour $x = 2$.",
    explanation: exp(
      "On calcule $y$ à l'abscisse du sommet $x = 2$.",
      "$y = 2^2 - 4 \\times 2 + 3 = 4 - 8 + 3$.",
      "$= -1$.",
      "L'ordonnée du sommet est $-1$."
    ),
    canvas: parabole(1, -4, 3),
    tags: ["premiere", "maths", "geometrie_reperee", "parabole", "canvas", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_gr_par_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_parabole",
    difficulty: 3,
    theme: "neutral",
    text: "La parabole $y = -x^2 + 4x$ est tournée :",
    format: "qcm",
    choices: ["vers le bas (sommet = maximum)", "vers le haut (sommet = minimum)", "vers la droite", "vers la gauche"],
    expected: ["vers le bas (sommet = maximum)"],
    comparator: "mcq_exact",
    hint: "Signe de $a$.",
    explanation: exp(
      "L'orientation dépend du signe de $a$.",
      "Ici $a = -1 < 0$ : parabole tournée vers le bas.",
      "Son sommet est un maximum.",
      "Vers le bas (sommet = maximum)."
    ),
    canvas: parabole(-1, 4, 0),
    tags: ["premiere", "maths", "geometrie_reperee", "parabole", "canvas", "qcm"],
  },
  {
    kind: "template",
    id: "premiere_gr_par_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_parabole",
    difficulty: 3,
    theme: "neutral",
    hint: "Abscisse de l'axe $= -\\dfrac{b}{2a}$.",
    tags: ["premiere", "maths", "geometrie_reperee", "parabole", "template"],
    generate: () => {
      const alpha = randomInt(1, 5);
      const b = -2 * alpha;
      const c = randomInt(-3, 4);
      return {
        text: `Pour la parabole $y = x^2 ${b >= 0 ? "+ " + b : "- " + -b}x ${c >= 0 ? "+ " + c : "- " + -c}$, quelle est l'abscisse du sommet ?`,
        format: "short",
        expected: [String(alpha)],
        comparator: "number_equal",
        explanation: exp(
          "On calcule $-\\dfrac{b}{2a}$ avec $a = 1$.",
          `$-\\dfrac{${b}}{2} = ${alpha}$.`,
          `L'axe de symétrie est $x = ${alpha}$.`,
          `Abscisse du sommet $= ${alpha}$.`
        ),
      };
    },
  },
];
