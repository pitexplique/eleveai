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
    kind: "fixed",
    id: "premiere_gr_vn_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_vecteur_normal",
    difficulty: 3,
    theme: "neutral",
    text: "Quel est un vecteur normal à la droite $2x + 5y - 1 = 0$ ?",
    format: "qcm",
    choices: [
      "$\\vec{n}(2 ; 5)$",
      "$\\vec{n}(5 ; 2)$",
      "$\\vec{n}(-5 ; 2)$",
      "$\\vec{n}(2 ; -1)$",
    ],
    expected: ["$\\vec{n}(2 ; 5)$"],
    comparator: "mcq_exact",
    hint: "Les coefficients de $x$ et de $y$ se lisent directement.",
    explanation: exp(
      "Pour une droite d'équation $ax + by + c = 0$, le vecteur $\\vec{n}(a ; b)$ est normal à la droite.",
      "Ici $a = 2$ et $b = 5$.",
      "Donc $\\vec{n}(2 ; 5)$. Le terme constant $-1$ n'intervient pas : il ne fait que translater la droite.",
      "$\\vec{n}(2 ; 5)$ est un vecteur normal."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "vecteur_normal", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_gr_vn_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_vecteur_normal",
    difficulty: 4,
    theme: "neutral",
    text: "Quel est un vecteur DIRECTEUR de la droite $3x - 2y + 5 = 0$ ?",
    format: "qcm",
    choices: [
      "$\\vec{u}(2 ; 3)$",
      "$\\vec{u}(3 ; -2)$",
      "$\\vec{u}(3 ; 2)$",
      "$\\vec{u}(-3 ; 2)$",
    ],
    expected: ["$\\vec{u}(2 ; 3)$"],
    comparator: "mcq_exact",
    hint: "Directeur $(-b ; a)$ : il doit être orthogonal au vecteur normal $(3 ; -2)$.",
    explanation: exp(
      "Pour $ax + by + c = 0$, le vecteur normal est $(a ; b)$ et un vecteur directeur est $(-b ; a)$.",
      "Ici $a = 3$ et $b = -2$, donc le directeur est $(2 ; 3)$.",
      "Contrôle : $\\vec{n} \\cdot \\vec{u} = 3 \\times 2 + (-2) \\times 3 = 0$. Ils sont bien orthogonaux.",
      "$\\vec{u}(2 ; 3)$ est un vecteur directeur."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "vecteur_normal", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_gr_vn_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_vecteur_normal",
    difficulty: 5,
    theme: "neutral",
    text: "La droite de vecteur normal $\\vec{n}(3 ; -1)$ passant par $A(1 ; 2)$ a pour équation :",
    format: "qcm",
    choices: [
      "$3x - y - 1 = 0$",
      "$3x - y + 1 = 0$",
      "$3x - y - 5 = 0$",
      "$x - 3y + 5 = 0$",
    ],
    expected: ["$3x - y - 1 = 0$"],
    comparator: "mcq_exact",
    hint: "Écris $3x - y + c = 0$, puis remplace $x$ et $y$ par les coordonnées de $A$.",
    explanation: exp(
      "Avec $\\vec{n}(a ; b)$ normal, l'équation est de la forme $ax + by + c = 0$.",
      "Ici : $3x - y + c = 0$. On remplace par $A(1 ; 2)$ : $3 \\times 1 - 2 + c = 0$.",
      "$1 + c = 0$, donc $c = -1$.",
      "L'équation est $3x - y - 1 = 0$."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "vecteur_normal", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_gr_vn_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_vecteur_normal",
    difficulty: 5,
    theme: "neutral",
    text: "Que peut-on dire des droites $2x - y + 1 = 0$ et $4x - 2y + 7 = 0$ ?",
    format: "qcm",
    choices: [
      "elles sont parallèles",
      "elles sont perpendiculaires",
      "elles sont confondues",
      "elles se coupent en un seul point sans être perpendiculaires",
    ],
    expected: ["elles sont parallèles"],
    comparator: "mcq_exact",
    hint: "Compare les vecteurs normaux $(2 ; -1)$ et $(4 ; -2)$.",
    explanation: exp(
      "Deux droites sont parallèles lorsque leurs vecteurs normaux sont colinéaires.",
      "Ici $\\vec{n_1}(2 ; -1)$ et $\\vec{n_2}(4 ; -2)$, et $\\vec{n_2} = 2\\vec{n_1}$ : ils sont colinéaires.",
      "Elles ne sont pas confondues : en multipliant la première équation par $2$ on obtient $4x - 2y + 2 = 0$, et $2 \\neq 7$.",
      "Les droites sont parallèles (et distinctes)."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "vecteur_normal", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_gr_vn_fixed_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_vecteur_normal",
    difficulty: 5,
    theme: "neutral",
    text: "Que peut-on dire des droites $x + 2y = 0$ et $2x - y + 3 = 0$ ?",
    format: "qcm",
    choices: [
      "elles sont perpendiculaires",
      "elles sont parallèles",
      "elles sont confondues",
      "on ne peut pas conclure",
    ],
    expected: ["elles sont perpendiculaires"],
    comparator: "mcq_exact",
    hint: "Calcule le produit scalaire des vecteurs normaux $(1 ; 2)$ et $(2 ; -1)$.",
    explanation: exp(
      "Deux droites sont perpendiculaires lorsque leurs vecteurs normaux sont orthogonaux.",
      "$\\vec{n_1}(1 ; 2)$ et $\\vec{n_2}(2 ; -1)$ : $\\vec{n_1} \\cdot \\vec{n_2} = 1 \\times 2 + 2 \\times (-1)$.",
      "$= 2 - 2 = 0$ : les normaux sont orthogonaux.",
      "Les droites sont perpendiculaires."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "vecteur_normal", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_gr_vn_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_vecteur_normal",
    difficulty: 4,
    theme: "neutral",
    text: "Le point $A(2 ; 1)$ appartient-il à la droite d'équation $3x - 2y - 4 = 0$ ?",
    format: "qcm",
    choices: [
      "oui, car $3 \\times 2 - 2 \\times 1 - 4 = 0$",
      "non, car $3 \\times 2 - 2 \\times 1 - 4 = 4$",
      "oui, car $A$ a des coordonnées positives",
      "on ne peut pas savoir sans le vecteur directeur",
    ],
    expected: ["oui, car $3 \\times 2 - 2 \\times 1 - 4 = 0$"],
    comparator: "mcq_exact",
    hint: "Remplace $x$ par $2$ et $y$ par $1$ : l'égalité est-elle vérifiée ?",
    explanation: exp(
      "Un point appartient à une droite si ses coordonnées vérifient l'équation.",
      "$3 \\times 2 - 2 \\times 1 - 4 = 6 - 2 - 4$.",
      "$= 0$ : l'équation est vérifiée.",
      "Oui, $A$ appartient à la droite."
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
    kind: "fixed",
    id: "premiere_gr_cer_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_cercle",
    difficulty: 4,
    theme: "neutral",
    text: "Quel est le centre du cercle d'équation $(x + 1)^2 + (y - 4)^2 = 9$ ?",
    format: "qcm",
    choices: [
      "$\\Omega(-1 ; 4)$",
      "$\\Omega(1 ; 4)$",
      "$\\Omega(1 ; -4)$",
      "$\\Omega(-1 ; -4)$",
    ],
    expected: ["$\\Omega(-1 ; 4)$"],
    comparator: "mcq_exact",
    hint: "La forme de référence est $(x - a)^2 + (y - b)^2 = r^2$ : $(x + 1)$ s'écrit $(x - (-1))$.",
    explanation: exp(
      "L'équation d'un cercle de centre $\\Omega(a ; b)$ est $(x - a)^2 + (y - b)^2 = r^2$ : les coordonnées du centre se lisent avec un signe MOINS.",
      "$(x + 1)^2$ correspond à $(x - (-1))^2$, donc $a = -1$. $(y - 4)^2$ donne directement $b = 4$.",
      "Le piège est de lire $(1 ; 4)$ en recopiant les nombres tels qu'ils apparaissent.",
      "Le centre est $\\Omega(-1 ; 4)$."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "cercle", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_gr_cer_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_cercle",
    difficulty: 3,
    theme: "neutral",
    text: "Quel est le rayon du cercle d'équation $(x - 3)^2 + y^2 = 49$ ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Le second membre vaut $r^2$, pas $r$.",
    explanation: exp(
      "Dans $(x - a)^2 + (y - b)^2 = r^2$, le nombre à droite est le CARRÉ du rayon.",
      "Ici $r^2 = 49$.",
      "$r = \\sqrt{49} = 7$. Répondre $49$ est l'erreur classique.",
      "Le rayon vaut $7$."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "cercle", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_gr_cer_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_cercle",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est l'équation du cercle de centre $\\Omega(1 ; -2)$ et de rayon $5$ ?",
    format: "qcm",
    choices: [
      "$(x - 1)^2 + (y + 2)^2 = 25$",
      "$(x + 1)^2 + (y - 2)^2 = 25$",
      "$(x - 1)^2 + (y + 2)^2 = 5$",
      "$(x - 1)^2 + (y - 2)^2 = 25$",
    ],
    expected: ["$(x - 1)^2 + (y + 2)^2 = 25$"],
    comparator: "mcq_exact",
    hint: "Deux pièges : le signe de $b = -2$, et le carré du rayon.",
    explanation: exp(
      "On applique $(x - a)^2 + (y - b)^2 = r^2$ avec $a = 1$, $b = -2$ et $r = 5$.",
      "$(y - b)^2 = (y - (-2))^2 = (y + 2)^2$ : le signe s'inverse.",
      "Et $r^2 = 5^2 = 25$, pas $5$.",
      "L'équation est $(x - 1)^2 + (y + 2)^2 = 25$."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "cercle", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_gr_cer_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_cercle",
    difficulty: 5,
    theme: "neutral",
    text: "L'origine $O(0 ; 0)$ appartient-elle au cercle de centre $\\Omega(3 ; 4)$ et de rayon $5$ ?",
    format: "qcm",
    choices: [
      "oui, car $\\Omega O = 5$",
      "non, car $\\Omega O = 7$",
      "non, car le centre n'est pas l'origine",
      "on ne peut pas savoir",
    ],
    expected: ["oui, car $\\Omega O = 5$"],
    comparator: "mcq_exact",
    hint: "Calcule $\\sqrt{3^2 + 4^2}$.",
    explanation: exp(
      "Un point appartient au cercle si sa distance au centre est exactement égale au rayon.",
      "$\\Omega O = \\sqrt{(3 - 0)^2 + (4 - 0)^2} = \\sqrt{9 + 16} = \\sqrt{25}$.",
      "$= 5$, ce qui est bien le rayon.",
      "Oui, l'origine appartient au cercle."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "cercle", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_gr_cer_fixed_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_cercle",
    difficulty: 5,
    theme: "neutral",
    text: "Quel est le rayon du cercle d'équation $(x - 5)^2 + (y + 1)^2 = 12$ ?",
    format: "qcm",
    choices: ["$2\\sqrt{3}$", "$12$", "$6$", "$\\sqrt{6}$"],
    expected: ["$2\\sqrt{3}$"],
    comparator: "mcq_exact",
    hint: "$r = \\sqrt{12}$, et $12 = 4 \\times 3$.",
    explanation: exp(
      "Le second membre vaut $r^2$, donc $r = \\sqrt{12}$.",
      "On simplifie : $\\sqrt{12} = \\sqrt{4 \\times 3} = \\sqrt{4} \\times \\sqrt{3}$.",
      "$= 2\\sqrt{3} \\approx 3{,}46$. Diviser $12$ par $2$ pour obtenir $6$ n'a rien à voir avec une racine carrée.",
      "Le rayon vaut $2\\sqrt{3}$."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "cercle", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_gr_cer_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_cercle",
    difficulty: 5,
    theme: "neutral",
    text: "Quel est le rayon du cercle de centre $\\Omega(2 ; 1)$ passant par $A(5 ; 5)$ ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Le rayon est la distance $\\Omega A$.",
    explanation: exp(
      "Si un cercle passe par $A$, son rayon est exactement la distance du centre à ce point.",
      "$\\Omega A = \\sqrt{(5 - 2)^2 + (5 - 1)^2} = \\sqrt{3^2 + 4^2}$.",
      "$= \\sqrt{9 + 16} = \\sqrt{25} = 5$.",
      "Le rayon vaut $5$."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "cercle", "short"],
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
    kind: "fixed",
    id: "premiere_gr_par_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_parabole",
    difficulty: 4,
    theme: "neutral",
    text: "Pour la parabole $y = 2x^2 + 8x + 1$, quelle est l'équation de l'axe de symétrie ?",
    format: "qcm",
    choices: ["$x = -2$", "$x = 2$", "$x = -4$", "$y = -2$"],
    expected: ["$x = -2$"],
    comparator: "mcq_exact",
    hint: "$x = -\\dfrac{b}{2a}$ avec $a = 2$ : n'oublie pas le $2a$ au dénominateur.",
    explanation: exp(
      "L'axe de symétrie est la droite verticale d'équation $x = -\\dfrac{b}{2a}$.",
      "Ici $a = 2$ et $b = 8$ : $x = -\\dfrac{8}{2 \\times 2} = -\\dfrac{8}{4}$.",
      "$= -2$. Oublier le facteur $2$ au dénominateur donnerait $-4$.",
      "L'axe de symétrie a pour équation $x = -2$."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "parabole", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_gr_par_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_parabole",
    difficulty: 4,
    theme: "neutral",
    text: "Pour la parabole $y = x^2 - 6x + 5$, quelle est l'ordonnée du sommet ?",
    format: "short",
    expected: ["-4"],
    comparator: "number_equal",
    hint: "L'abscisse du sommet vaut $3$ : calcule l'image de $3$.",
    explanation: exp(
      "L'ordonnée du sommet est l'image de l'abscisse du sommet.",
      "$x = -\\dfrac{-6}{2} = 3$, puis $y = 3^2 - 6 \\times 3 + 5$.",
      "$= 9 - 18 + 5 = -4$.",
      "Le sommet est le point $(3 ; -4)$."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "parabole", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_gr_par_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_parabole",
    difficulty: 3,
    theme: "neutral",
    text: "La parabole $y = 3x^2 - 6x$ est tournée :",
    format: "qcm",
    choices: [
      "vers le haut (sommet = minimum)",
      "vers le bas (sommet = maximum)",
      "vers la droite",
      "cela dépend de la valeur de $x$",
    ],
    expected: ["vers le haut (sommet = minimum)"],
    comparator: "mcq_exact",
    hint: "Regarde uniquement le signe de $a$, le coefficient de $x^2$.",
    explanation: exp(
      "L'orientation d'une parabole ne dépend que du signe de $a$.",
      "Ici $a = 3 > 0$ : la parabole est tournée vers le haut.",
      "Son sommet est alors le point le plus bas de la courbe, donc un minimum. Le signe de $b$ ne change rien à l'orientation.",
      "Vers le haut (sommet = minimum)."
    ),
    canvas: parabole(3, -6, 0),
    tags: ["premiere", "maths", "geometrie_reperee", "parabole", "canvas", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_gr_par_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_parabole",
    difficulty: 5,
    theme: "neutral",
    text: "Sur la parabole $y = x^2 - 4x + 3$ (axe de symétrie $x = 2$), quelle est l'abscisse du point symétrique de celui d'abscisse $0$ ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "L'axe est à distance $2$ de l'abscisse $0$ : le symétrique est à la même distance de l'autre côté.",
    explanation: exp(
      "Deux points d'une parabole symétriques par rapport à l'axe sont à égale distance de cet axe.",
      "L'abscisse $0$ est à distance $2$ de l'axe $x = 2$.",
      "Le symétrique est donc à $2$ de l'autre côté : $2 + 2 = 4$.",
      "L'abscisse cherchée est $4$ (les deux points ont d'ailleurs la même ordonnée $3$)."
    ),
    canvas: parabole(1, -4, 3),
    tags: ["premiere", "maths", "geometrie_reperee", "parabole", "canvas", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_gr_par_fixed_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_parabole",
    difficulty: 3,
    theme: "neutral",
    text: "En quel point la parabole $y = x^2 - 4x + 3$ coupe-t-elle l'axe des ordonnées ?",
    format: "qcm",
    choices: ["$(0 ; 3)$", "$(3 ; 0)$", "$(0 ; -4)$", "$(0 ; 0)$"],
    expected: ["$(0 ; 3)$"],
    comparator: "mcq_exact",
    hint: "L'axe des ordonnées correspond à $x = 0$.",
    explanation: exp(
      "Pour couper l'axe des ordonnées, on remplace $x$ par $0$.",
      "$y = 0^2 - 4 \\times 0 + 3 = 3$.",
      "Le point est donc $(0 ; 3)$ : c'est toujours le terme constant $c$ qui donne cette ordonnée.",
      "La parabole coupe l'axe des ordonnées en $(0 ; 3)$."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "parabole", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_gr_par_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_parabole",
    difficulty: 4,
    theme: "neutral",
    text: "En quels points la parabole $y = x^2 - 4x + 3$ coupe-t-elle l'axe des abscisses ?",
    format: "qcm",
    choices: [
      "$(1 ; 0)$ et $(3 ; 0)$",
      "$(0 ; 1)$ et $(0 ; 3)$",
      "$(2 ; 0)$ seulement",
      "elle ne le coupe pas",
    ],
    expected: ["$(1 ; 0)$ et $(3 ; 0)$"],
    comparator: "mcq_exact",
    hint: "L'axe des abscisses correspond à $y = 0$ : résous $x^2 - 4x + 3 = 0$.",
    explanation: exp(
      "Les points d'intersection avec l'axe des abscisses ont pour ordonnée $0$ : leurs abscisses sont les racines du trinôme.",
      "$x^2 - 4x + 3 = 0$ : somme $4$ et produit $3$ donnent les racines $1$ et $3$.",
      "Les points sont donc $(1 ; 0)$ et $(3 ; 0)$ — et non $(0 ; 1)$ et $(0 ; 3)$, qui seraient sur l'axe des ordonnées.",
      "La parabole coupe l'axe des abscisses en $(1 ; 0)$ et $(3 ; 0)$."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "parabole", "qcm"],
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
