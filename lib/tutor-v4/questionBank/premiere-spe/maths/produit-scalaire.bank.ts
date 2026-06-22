// lib/tutor-v4/questionBank/premiere-spe/maths/produit-scalaire.bank.ts
//
// Chapitre : Calcul vectoriel et produit scalaire (notion "produit_scalaire")
// microSkills :
//   ps_coordonnees   — produit scalaire à partir des coordonnées
//   ps_norme_angle   — produit scalaire avec normes et angle (cosinus)
//   ps_orthogonalite — caractériser l'orthogonalité
//   ps_alkashi       — calculer une longueur ou un angle (Al-Kashi)
//
// PÉRIMÈTRE BO 2019 Première spé. Conventions : LaTeX, règle QCM. Canvas : fonctionGraphique (vecteurs comme points).

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

// Deux vecteurs issus de l'origine, représentés par leurs extrémités.
function vecteurs(x1: number, y1: number, x2: number, y2: number): CanvasFigure {
  return {
    kind: "fonctionGraphique",
    size: { width: 300, height: 300 },
    xmin: -6,
    xmax: 6,
    ymin: -6,
    ymax: 6,
    grille: true,
    courbes: [
      { id: "u", type: "points", couleur: "#2563eb", points: [{ x: 0, y: 0 }, { x: x1, y: y1 }] },
      { id: "v", type: "points", couleur: "#dc2626", points: [{ x: 0, y: 0 }, { x: x2, y: y2 }] },
    ],
    points: [
      { x: x1, y: y1, label: "u", couleur: "#2563eb" },
      { x: x2, y: y2, label: "v", couleur: "#dc2626" },
    ],
  };
}

export const produitScalaireBank: TutorBankItemV4[] = [
  /* ===================== PS_COORDONNEES ===================== */
  {
    kind: "fixed",
    id: "premiere_ps_coord_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_coordonnees",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une base orthonormée, le produit scalaire de $\\vec{u}(x ; y)$ et $\\vec{v}(x' ; y')$ vaut :",
    format: "qcm",
    choices: ["$xx' + yy'$", "$xy' + x'y$", "$xx' - yy'$", "$xy + x'y'$"],
    expected: ["$xx' + yy'$"],
    comparator: "mcq_exact",
    hint: "Produit des abscisses + produit des ordonnées.",
    explanation: exp(
      "En base orthonormée, le produit scalaire a une expression simple.",
      "On multiplie les abscisses, les ordonnées, et on additionne.",
      "$\\vec{u} \\cdot \\vec{v} = xx' + yy'$.",
      "$xx' + yy'$."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "coordonnees", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_coord_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_coordonnees",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule $\\vec{u} \\cdot \\vec{v}$ avec $\\vec{u}(2 ; 3)$ et $\\vec{v}(4 ; 1)$.",
    format: "short",
    expected: ["11"],
    comparator: "number_equal",
    hint: "$2 \\times 4 + 3 \\times 1$.",
    explanation: exp(
      "On applique $\\vec{u} \\cdot \\vec{v} = xx' + yy'$.",
      "$2 \\times 4 + 3 \\times 1 = 8 + 3$.",
      "$= 11$.",
      "$\\vec{u} \\cdot \\vec{v} = 11$."
    ),
    canvas: vecteurs(2, 3, 4, 1),
    tags: ["premiere", "maths", "produit_scalaire", "coordonnees", "canvas", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_coord_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_coordonnees",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule $\\vec{u} \\cdot \\vec{v}$ avec $\\vec{u}(5 ; -2)$ et $\\vec{v}(3 ; 4)$.",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "$5 \\times 3 + (-2) \\times 4$.",
    explanation: exp(
      "On applique $xx' + yy'$.",
      "$5 \\times 3 + (-2) \\times 4 = 15 - 8$.",
      "$= 7$.",
      "$\\vec{u} \\cdot \\vec{v} = 7$."
    ),
    canvas: vecteurs(5, -2, 3, 4),
    tags: ["premiere", "maths", "produit_scalaire", "coordonnees", "canvas", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_coord_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_coordonnees",
    difficulty: 2,
    theme: "neutral",
    text: "La norme d'un vecteur $\\vec{u}(x ; y)$ vaut :",
    format: "qcm",
    choices: ["$\\sqrt{x^2 + y^2}$", "$x^2 + y^2$", "$x + y$", "$\\sqrt{x + y}$"],
    expected: ["$\\sqrt{x^2 + y^2}$"],
    comparator: "mcq_exact",
    hint: "Théorème de Pythagore.",
    explanation: exp(
      "La norme est la longueur du vecteur.",
      "Avec Pythagore : $\\|\\vec{u}\\| = \\sqrt{x^2 + y^2}$.",
      "C'est aussi $\\sqrt{\\vec{u} \\cdot \\vec{u}}$.",
      "$\\sqrt{x^2 + y^2}$."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "coordonnees", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_coord_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_coordonnees",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule la norme de $\\vec{u}(3 ; 4)$.",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "$\\sqrt{3^2 + 4^2}$.",
    explanation: exp(
      "On applique $\\|\\vec{u}\\| = \\sqrt{x^2 + y^2}$.",
      "$\\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25}$.",
      "$= 5$.",
      "$\\|\\vec{u}\\| = 5$."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "coordonnees", "short"],
  },
  {
    kind: "template",
    id: "premiere_ps_coord_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_coordonnees",
    difficulty: 3,
    theme: "neutral",
    hint: "$xx' + yy'$.",
    tags: ["premiere", "maths", "produit_scalaire", "coordonnees", "template"],
    generate: () => {
      const x1 = randomInt(1, 5);
      const y1 = randomInt(-4, 5);
      const x2 = randomInt(1, 5);
      const y2 = randomInt(-4, 5);
      const ps = x1 * x2 + y1 * y2;
      return {
        text: `Calcule $\\vec{u} \\cdot \\vec{v}$ avec $\\vec{u}(${x1} ; ${y1})$ et $\\vec{v}(${x2} ; ${y2})$.`,
        format: "short",
        expected: [String(ps)],
        comparator: "number_equal",
        explanation: exp(
          "On applique $\\vec{u} \\cdot \\vec{v} = xx' + yy'$.",
          `$${x1} \\times ${x2} + (${y1}) \\times (${y2})$.`,
          `$= ${x1 * x2} ${y1 * y2 >= 0 ? "+ " + y1 * y2 : "- " + -(y1 * y2)} = ${ps}$.`,
          `$\\vec{u} \\cdot \\vec{v} = ${ps}$.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_ps_coord_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_coordonnees",
    difficulty: 3,
    theme: "neutral",
    hint: "$\\sqrt{x^2 + y^2}$ (pense aux triplets pythagoriciens).",
    tags: ["premiere", "maths", "produit_scalaire", "coordonnees", "template"],
    generate: () => {
      const triplets = [
        { x: 3, y: 4, n: 5 },
        { x: 6, y: 8, n: 10 },
        { x: 5, y: 12, n: 13 },
        { x: 8, y: 6, n: 10 },
      ];
      const t = triplets[randomInt(0, triplets.length - 1)];
      return {
        text: `Calcule la norme de $\\vec{u}(${t.x} ; ${t.y})$.`,
        format: "short",
        expected: [String(t.n)],
        comparator: "number_equal",
        explanation: exp(
          "On applique $\\|\\vec{u}\\| = \\sqrt{x^2 + y^2}$.",
          `$\\sqrt{${t.x}^2 + ${t.y}^2} = \\sqrt{${t.x * t.x + t.y * t.y}}$.`,
          `$= ${t.n}$.`,
          `$\\|\\vec{u}\\| = ${t.n}$.`
        ),
      };
    },
  },

  /* ===================== PS_NORME_ANGLE ===================== */
  {
    kind: "fixed",
    id: "premiere_ps_na_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_norme_angle",
    difficulty: 2,
    theme: "neutral",
    text: "Le produit scalaire avec l'angle $\\theta$ entre les vecteurs s'écrit :",
    format: "qcm",
    choices: [
      "$\\|\\vec{u}\\| \\, \\|\\vec{v}\\| \\cos\\theta$",
      "$\\|\\vec{u}\\| \\, \\|\\vec{v}\\| \\sin\\theta$",
      "$\\|\\vec{u}\\| + \\|\\vec{v}\\|$",
      "$\\|\\vec{u}\\| \\, \\|\\vec{v}\\| \\tan\\theta$",
    ],
    expected: ["$\\|\\vec{u}\\| \\, \\|\\vec{v}\\| \\cos\\theta$"],
    comparator: "mcq_exact",
    hint: "Avec le cosinus de l'angle.",
    explanation: exp(
      "Le produit scalaire relie normes et angle.",
      "$\\vec{u} \\cdot \\vec{v} = \\|\\vec{u}\\| \\, \\|\\vec{v}\\| \\cos\\theta$.",
      "Le cosinus apparaît, pas le sinus.",
      "$\\|\\vec{u}\\| \\, \\|\\vec{v}\\| \\cos\\theta$."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "norme_angle", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_na_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_norme_angle",
    difficulty: 3,
    theme: "neutral",
    text: "Deux vecteurs de normes $3$ et $5$ forment un angle de $60°$. Combien vaut leur produit scalaire ?",
    format: "short",
    expected: ["7.5"],
    comparator: "number_equal",
    hint: "$3 \\times 5 \\times \\cos(60°)$ avec $\\cos(60°) = 0{,}5$.",
    explanation: exp(
      "On applique $\\vec{u} \\cdot \\vec{v} = \\|\\vec{u}\\| \\, \\|\\vec{v}\\| \\cos\\theta$.",
      "$3 \\times 5 \\times \\cos(60°) = 15 \\times 0{,}5$.",
      "$= 7{,}5$.",
      "$\\vec{u} \\cdot \\vec{v} = 7{,}5$."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "norme_angle", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_na_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_norme_angle",
    difficulty: 3,
    theme: "neutral",
    text: "Deux vecteurs colinéaires de même sens, de normes $4$ et $6$. Que vaut leur produit scalaire ?",
    format: "short",
    expected: ["24"],
    comparator: "number_equal",
    hint: "Angle $0°$, $\\cos(0) = 1$.",
    explanation: exp(
      "Colinéaires de même sens : l'angle est $0°$, $\\cos(0) = 1$.",
      "$\\vec{u} \\cdot \\vec{v} = 4 \\times 6 \\times 1$.",
      "$= 24$.",
      "$\\vec{u} \\cdot \\vec{v} = 24$."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "norme_angle", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_na_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_norme_angle",
    difficulty: 4,
    theme: "neutral",
    text: "Le produit scalaire de deux vecteurs non nuls est négatif. L'angle entre eux est :",
    format: "qcm",
    choices: ["obtus (entre $90°$ et $180°$)", "aigu", "droit", "nul"],
    expected: ["obtus (entre $90°$ et $180°$)"],
    comparator: "mcq_exact",
    hint: "Signe de $\\cos\\theta$.",
    explanation: exp(
      "Le signe du produit scalaire est celui de $\\cos\\theta$.",
      "$\\vec{u} \\cdot \\vec{v} < 0$ signifie $\\cos\\theta < 0$.",
      "Donc l'angle est obtus.",
      "Obtus (entre $90°$ et $180°$)."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "norme_angle", "qcm"],
  },
  {
    kind: "template",
    id: "premiere_ps_na_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_norme_angle",
    difficulty: 3,
    theme: "neutral",
    hint: "$\\|\\vec{u}\\| \\, \\|\\vec{v}\\| \\cos\\theta$.",
    tags: ["premiere", "maths", "produit_scalaire", "norme_angle", "template"],
    generate: () => {
      const cas = randomInt(0, 2);
      const data = [
        { deg: "0°", cos: 1, cosTxt: "1" },
        { deg: "60°", cos: 0.5, cosTxt: "0{,}5" },
        { deg: "90°", cos: 0, cosTxt: "0" },
      ][cas];
      const nu = randomInt(2, 6);
      const nv = randomInt(2, 6);
      const ps = nu * nv * data.cos;
      return {
        text: `Deux vecteurs de normes $${nu}$ et $${nv}$ forment un angle de $${data.deg}$. Combien vaut leur produit scalaire ?`,
        format: "short",
        expected: [String(ps)],
        comparator: "number_equal",
        explanation: exp(
          "On applique $\\vec{u} \\cdot \\vec{v} = \\|\\vec{u}\\| \\, \\|\\vec{v}\\| \\cos\\theta$.",
          `$${nu} \\times ${nv} \\times \\cos(${data.deg}) = ${nu * nv} \\times ${data.cosTxt}$.`,
          `$= ${ps}$.`,
          `$\\vec{u} \\cdot \\vec{v} = ${String(ps).replace(".", "{,}")}$.`
        ),
      };
    },
  },

  /* ===================== PS_ORTHOGONALITE ===================== */
  {
    kind: "fixed",
    id: "premiere_ps_orth_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_orthogonalite",
    difficulty: 2,
    theme: "neutral",
    text: "Deux vecteurs non nuls sont orthogonaux si et seulement si leur produit scalaire est :",
    format: "qcm",
    choices: ["nul", "positif", "négatif", "égal à $1$"],
    expected: ["nul"],
    comparator: "mcq_exact",
    hint: "$\\cos(90°) = 0$.",
    explanation: exp(
      "Orthogonaux signifie angle droit, donc $\\cos(90°) = 0$.",
      "Le produit scalaire $\\|\\vec{u}\\|\\|\\vec{v}\\|\\cos\\theta$ vaut alors $0$.",
      "$\\vec{u} \\perp \\vec{v} \\Leftrightarrow \\vec{u} \\cdot \\vec{v} = 0$.",
      "Le produit scalaire est nul."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "orthogonalite", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_orth_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_orthogonalite",
    difficulty: 3,
    theme: "neutral",
    text: "Les vecteurs $\\vec{u}(2 ; 3)$ et $\\vec{v}(3 ; -2)$ sont-ils orthogonaux ?",
    format: "qcm",
    choices: ["Oui, car $\\vec{u} \\cdot \\vec{v} = 0$", "Non", "Oui, car colinéaires", "On ne peut pas savoir"],
    expected: ["Oui, car $\\vec{u} \\cdot \\vec{v} = 0$"],
    comparator: "mcq_exact",
    hint: "Calcule $2\\times3 + 3\\times(-2)$.",
    explanation: exp(
      "On calcule le produit scalaire.",
      "$2 \\times 3 + 3 \\times (-2) = 6 - 6 = 0$.",
      "Produit scalaire nul → orthogonaux.",
      "Oui, ils sont orthogonaux."
    ),
    canvas: vecteurs(2, 3, 3, -2),
    tags: ["premiere", "maths", "produit_scalaire", "orthogonalite", "canvas", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_orth_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_orthogonalite",
    difficulty: 3,
    theme: "neutral",
    text: "Pour quelle valeur de $k$ les vecteurs $\\vec{u}(2 ; k)$ et $\\vec{v}(4 ; -2)$ sont-ils orthogonaux ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "$\\vec{u} \\cdot \\vec{v} = 0$ : $8 - 2k = 0$.",
    explanation: exp(
      "On écrit que le produit scalaire est nul.",
      "$2 \\times 4 + k \\times (-2) = 0 \\Leftrightarrow 8 - 2k = 0$.",
      "$2k = 8$ donc $k = 4$.",
      "$k = 4$."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "orthogonalite", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_orth_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_orthogonalite",
    difficulty: 2,
    theme: "neutral",
    text: "Les vecteurs $\\vec{u}(1 ; 0)$ et $\\vec{v}(0 ; 1)$ sont :",
    format: "qcm",
    choices: ["orthogonaux", "colinéaires", "égaux", "opposés"],
    expected: ["orthogonaux"],
    comparator: "mcq_exact",
    hint: "Produit scalaire $= 0$ ?",
    explanation: exp(
      "On calcule le produit scalaire.",
      "$1 \\times 0 + 0 \\times 1 = 0$.",
      "Produit nul → orthogonaux (ce sont les axes).",
      "Orthogonaux."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "orthogonalite", "qcm"],
  },
  {
    kind: "template",
    id: "premiere_ps_orth_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_orthogonalite",
    difficulty: 3,
    theme: "neutral",
    hint: "Orthogonaux ⟺ produit scalaire nul.",
    tags: ["premiere", "maths", "produit_scalaire", "orthogonalite", "template"],
    generate: () => {
      const a = randomInt(1, 4);
      const b = randomInt(1, 4);
      // v orthogonal à u(a;b) : v(b;-a) -> ps = ab - ab = 0
      const ortho = randomInt(0, 1) === 1;
      const x2 = b;
      const y2 = ortho ? -a : a; // si non ortho, ps = ab + ab != 0
      const ps = a * x2 + b * y2;
      const correct = ps === 0 ? "Oui (orthogonaux)" : "Non";
      return {
        text: `Les vecteurs $\\vec{u}(${a} ; ${b})$ et $\\vec{v}(${x2} ; ${y2})$ sont-ils orthogonaux ?`,
        format: "qcm",
        choices: ["Oui (orthogonaux)", "Non", "Ils sont colinéaires", "On ne peut pas savoir"],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On calcule le produit scalaire $xx' + yy'$.",
          `$${a} \\times ${x2} + ${b} \\times (${y2}) = ${ps}$.`,
          `Produit scalaire ${ps === 0 ? "nul → orthogonaux" : "non nul → non orthogonaux"}.`,
          `${correct}.`
        ),
      };
    },
  },

  /* ===================== PS_ALKASHI ===================== */
  {
    kind: "fixed",
    id: "premiere_ps_alk_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_alkashi",
    difficulty: 3,
    theme: "neutral",
    text: "La formule d'Al-Kashi dans un triangle $ABC$ s'écrit :",
    format: "qcm",
    choices: [
      "$a^2 = b^2 + c^2 - 2bc\\cos A$",
      "$a^2 = b^2 + c^2 + 2bc\\cos A$",
      "$a^2 = b^2 - c^2 - 2bc\\cos A$",
      "$a = b + c - 2bc\\cos A$",
    ],
    expected: ["$a^2 = b^2 + c^2 - 2bc\\cos A$"],
    comparator: "mcq_exact",
    hint: "Généralisation de Pythagore avec un $\\cos$.",
    explanation: exp(
      "Al-Kashi généralise le théorème de Pythagore à un triangle quelconque.",
      "Le terme correctif est $-2bc\\cos A$.",
      "$a^2 = b^2 + c^2 - 2bc\\cos A$.",
      "$a^2 = b^2 + c^2 - 2bc\\cos A$."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "alkashi", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_alk_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_alkashi",
    difficulty: 4,
    theme: "neutral",
    text: "Dans un triangle, $b = 3$, $c = 5$, $\\widehat{A} = 60°$. Calcule $a^2$ (avec $\\cos 60° = 0{,}5$).",
    format: "short",
    expected: ["19"],
    comparator: "number_equal",
    hint: "$a^2 = 9 + 25 - 2\\times3\\times5\\times0{,}5$.",
    explanation: exp(
      "On applique Al-Kashi.",
      "$a^2 = 3^2 + 5^2 - 2 \\times 3 \\times 5 \\times 0{,}5 = 9 + 25 - 15$.",
      "$= 19$.",
      "$a^2 = 19$."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "alkashi", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_alk_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_alkashi",
    difficulty: 4,
    theme: "neutral",
    text: "Si l'angle $\\widehat{A} = 90°$, la formule d'Al-Kashi $a^2 = b^2 + c^2 - 2bc\\cos A$ devient :",
    format: "qcm",
    choices: ["$a^2 = b^2 + c^2$ (Pythagore)", "$a^2 = b^2 - c^2$", "$a^2 = 2bc$", "$a = b + c$"],
    expected: ["$a^2 = b^2 + c^2$ (Pythagore)"],
    comparator: "mcq_exact",
    hint: "$\\cos 90° = 0$.",
    explanation: exp(
      "Quand $\\widehat{A} = 90°$, $\\cos A = 0$.",
      "Le terme $-2bc\\cos A$ disparaît.",
      "$a^2 = b^2 + c^2$ : c'est Pythagore.",
      "$a^2 = b^2 + c^2$ (Pythagore)."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "alkashi", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_alk_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_alkashi",
    difficulty: 5,
    theme: "neutral",
    text: "Dans un triangle, $b = 4$, $c = 6$, $\\widehat{A} = 60°$. Calcule $a$ (avec $\\cos 60° = 0{,}5$).",
    format: "qcm",
    choices: ["$2\\sqrt{7}$", "$\\sqrt{28}$ arrondi à $6$", "$10$", "$\\sqrt{52}$"],
    expected: ["$2\\sqrt{7}$"],
    comparator: "mcq_exact",
    hint: "$a^2 = 16 + 36 - 2\\times4\\times6\\times0{,}5 = 28$.",
    explanation: exp(
      "On calcule d'abord $a^2$ avec Al-Kashi.",
      "$a^2 = 16 + 36 - 24 = 28$.",
      "$a = \\sqrt{28} = 2\\sqrt{7}$.",
      "$a = 2\\sqrt{7}$."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "alkashi", "qcm"],
  },
  {
    kind: "template",
    id: "premiere_ps_alk_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_alkashi",
    difficulty: 4,
    theme: "neutral",
    hint: "$a^2 = b^2 + c^2 - 2bc\\cos A$, $\\cos 60° = 0{,}5$.",
    tags: ["premiere", "maths", "produit_scalaire", "alkashi", "template"],
    generate: () => {
      const b = randomInt(2, 6);
      const c = randomInt(2, 7);
      const a2 = b * b + c * c - b * c; // cos60 = 0.5 → 2bc*0.5 = bc
      return {
        text: `Dans un triangle, $b = ${b}$, $c = ${c}$, $\\widehat{A} = 60°$. Calcule $a^2$ (avec $\\cos 60° = 0{,}5$).`,
        format: "short",
        expected: [String(a2)],
        comparator: "number_equal",
        explanation: exp(
          "On applique Al-Kashi $a^2 = b^2 + c^2 - 2bc\\cos A$.",
          `$a^2 = ${b}^2 + ${c}^2 - 2 \\times ${b} \\times ${c} \\times 0{,}5 = ${b * b} + ${c * c} - ${b * c}$.`,
          `$= ${a2}$.`,
          `$a^2 = ${a2}$.`
        ),
      };
    },
  },
];
