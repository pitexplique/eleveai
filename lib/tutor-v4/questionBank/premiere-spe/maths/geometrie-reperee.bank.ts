// lib/tutor-v4/questionBank/premiere-spe/maths/geometrie-reperee.bank.ts
//
// Chapitre : Géométrie repérée (notion "geometrie_reperee")
// microSkills :
//   gr_vecteur_normal     — vecteur normal à une droite
//   gr_vecteur_directeur  — vecteur directeur (−b ; a)
//   gr_equation_droite    — équation cartésienne à partir d'un point et d'un normal
//   gr_droites            — droites parallèles ou perpendiculaires
//   gr_projete            — projeté orthogonal d'un point sur une droite
//   gr_cercle             — équation d'un cercle : centre et rayon
//   gr_cercle_reconnaitre — lire le centre et le rayon sur une équation
//   gr_cercle_utiliser    — appartenance, cercle de diamètre [AB]
//   gr_configuration      — utiliser un repère pour étudier une configuration
//   gr_parabole           — axe de symétrie et sommet d'une parabole
//
// ⚠️ Dix-huit items écrits avant le découpage en onze micro-compétences sont
// restés à leur place dans le fichier, mais leur `microId` a été réaffecté
// (leur `id` est inchangé : des élèves y ont déjà répondu). Les commentaires
// de section disent où le bloc a été ÉCRIT ; c'est le `microId` qui fait foi.
//
// PÉRIMÈTRE BO Première spé. Conventions : LaTeX, règle QCM.
// Canvas : fonctionGraphique (parabole, droites et points via des segments).
//
// Règle d'écriture : un `fixed` pour une valeur exceptionnelle, un piège, une
// propriété ou un contexte 974 ; un `template` pour tout calcul dont on peut
// changer les nombres ; plusieurs ouvertes dont un template ouvert.

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

function pickOne<T>(arr: readonly T[]): T {
  return arr[randomInt(0, arr.length - 1)];
}

/** Une droite d'équation ax + by + c = 0 tracée par deux de ses points,
 *  avec éventuellement un point isolé à situer. */
function droiteCanvas(a: number, b: number, c: number, point?: { x: number; y: number; label: string }): CanvasFigure {
  const pts: { x: number; y: number }[] = [];
  if (b !== 0) {
    for (let x = -6; x <= 6; x += 0.5) pts.push({ x, y: Math.round(((-a * x - c) / b) * 100) / 100 });
  } else {
    for (let y = -6; y <= 6; y += 0.5) pts.push({ x: -c / a, y });
  }
  return {
    kind: "fonctionGraphique",
    size: { width: 300, height: 300 },
    xmin: -6,
    xmax: 6,
    ymin: -6,
    ymax: 6,
    grille: true,
    courbes: [{ id: "d", type: "points", couleur: "#2563eb", points: pts.filter((p) => p.y >= -6 && p.y <= 6) }],
    misesEnEvidence: point ? [{ point: { ...point, couleur: "#dc2626" } }] : undefined,
  };
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
    microId: "gr_vecteur_directeur",
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
    microId: "gr_equation_droite",
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
    microId: "gr_equation_droite",
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
    microId: "gr_vecteur_directeur",
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
    microId: "gr_equation_droite",
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
    microId: "gr_droites",
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
    microId: "gr_droites",
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
      // $b$ ne doit être ni nul — sinon « on a changé le signe » et « on a
      // interverti » s'écrivent pareil, et la droite s'affiche avec un $0y$ —
      // ni égal à $a$, sinon l'interversion donne la bonne réponse.
      const b = pickOne([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5].filter((v) => v !== a));
      const c = randomInt(-5, 5);
      const correct = `$(${a} ; ${b})$`;
      const choices = makeChoices(correct, [
        `$(${b} ; ${a})$`,
        `$(${-b} ; ${a})$`,
        `$(${c} ; 0)$`,
      ]);
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
    microId: "gr_equation_droite",
    difficulty: 4,
    theme: "neutral",
    hint: "$ax + by + c = 0$, puis on remplace par le point.",
    tags: ["premiere", "maths", "geometrie_reperee", "vecteur_normal", "template"],
    generate: () => {
      const a = randomInt(1, 4);
      // Un des pièges échange les deux coordonnées du vecteur normal : quand
      // elles sont égales, il s'écrit comme la bonne équation.
      let b = randomInt(1, 4);
      while (b === a) b = randomInt(1, 4);
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
    microId: "gr_cercle_utiliser",
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
    microId: "gr_cercle_utiliser",
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
    microId: "gr_cercle_reconnaitre",
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
    microId: "gr_cercle_utiliser",
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
    microId: "gr_cercle_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Centre $(a ; b)$ avec les signes opposés ; $r = \\sqrt{\\text{2nd membre}}$.",
    tags: ["premiere", "maths", "geometrie_reperee", "cercle", "template"],
    generate: () => {
      // Les trois pièges sont « on garde les signes de l'équation », « on
      // échange les coordonnées » et « on change le signe de b ». Il faut donc
      // que a et b soient non nuls, différents et non opposés — sinon deux des
      // quatre propositions s'écrivent pareil.
      const a = randomInt(-4, 4) || 3;
      let b = randomInt(-4, 4);
      while (b === 0 || b === a || b === -a) b = randomInt(-4, 4);
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
    microId: "gr_cercle_reconnaitre",
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

  /* ===================== GR_VECTEUR_NORMAL (compléments) ===================== */
  {
    kind: "fixed",
    id: "premiere_gr_vn_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_vecteur_normal",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi les coefficients $a$ et $b$ de l'équation $ax + by + c = 0$ donnent directement un vecteur normal à la droite.",
    format: "open",
    expected: ["produit scalaire", "nul", "orthogonal", "deux points", "soustrait"],
    comparator: "contains_keyword",
    hint: "Prends deux points de la droite et calcule le produit scalaire de $\\vec{n}(a ; b)$ avec le vecteur qui les joint.",
    explanation: exp(
      "Un vecteur est normal à une droite quand il est orthogonal à tout vecteur joignant deux points de cette droite.",
      "Soit $M(x ; y)$ et $M'(x' ; y')$ deux points de la droite : $ax + by + c = 0$ et $ax' + by' + c = 0$.",
      "En soustrayant : $a(x - x') + b(y - y') = 0$. Or c'est exactement le produit scalaire de $\\vec{n}(a ; b)$ avec $\\vec{M'M}(x - x' ; y - y')$.",
      "Ce produit est nul pour tous les points de la droite : $\\vec{n}(a ; b)$ lui est bien normal."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "vecteur_normal", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_gr_vn_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_vecteur_normal",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève affirme que la droite $3x - 2y + 5 = 0$ a un seul vecteur normal, $\\vec{n}(3 ; -2)$. Explique pourquoi c'est inexact.",
    format: "open",
    expected: ["colineaire", "colinéaire", "infinite", "infinité", "multiple", "plusieurs"],
    comparator: "contains_keyword",
    hint: "Le vecteur $\\vec{n}(6 ; -4)$ est-il, lui aussi, orthogonal à la droite ?",
    explanation: exp(
      "Être normal à une droite est une question de DIRECTION, pas de longueur : la norme du vecteur n'intervient nulle part.",
      "Si $\\vec{n}$ est normal, alors $k\\vec{n}$ l'est aussi pour tout réel $k$ non nul, puisque le produit scalaire reste nul.",
      "Ici $\\vec{n}(3 ; -2)$, mais aussi $(6 ; -4)$, $(-3 ; 2)$, $\\left(\\dfrac{3}{2} ; -1\\right)$… il y en a une infinité.",
      "On dit « UN vecteur normal », jamais « le » : tous les vecteurs colinéaires non nuls conviennent."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "vecteur_normal", "piege", "open"],
  },

  /* ===================== GR_VECTEUR_DIRECTEUR ===================== */
  {
    kind: "fixed",
    id: "premiere_gr_vd_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_vecteur_directeur",
    difficulty: 4,
    theme: "neutral",
    text: "Pourquoi $\\vec{u}(-b ; a)$ est-il un vecteur DIRECTEUR de la droite $ax + by + c = 0$ ?",
    format: "qcm",
    choices: [
      "parce qu'il est orthogonal au vecteur normal $\\vec{n}(a ; b)$",
      "parce qu'il est colinéaire au vecteur normal $\\vec{n}(a ; b)$",
      "parce que ses coordonnées sont opposées",
      "parce qu'il passe par l'origine",
    ],
    expected: ["parce qu'il est orthogonal au vecteur normal $\\vec{n}(a ; b)$"],
    comparator: "mcq_exact",
    hint: "Calcule $\\vec{n} \\cdot \\vec{u}$ avec $\\vec{n}(a ; b)$ et $\\vec{u}(-b ; a)$.",
    explanation: exp(
      "La direction de la droite est perpendiculaire à celle de son vecteur normal : un directeur est donc un vecteur orthogonal au normal.",
      "On vérifie : $\\vec{n} \\cdot \\vec{u} = a \\times (-b) + b \\times a$.",
      "$= -ab + ab = 0$. Le vecteur $\\vec{u}(-b ; a)$ est bien orthogonal à $\\vec{n}(a ; b)$, donc il dirige la droite.",
      "Parce qu'il est orthogonal au vecteur normal : « échanger et changer un signe » fabrique un vecteur perpendiculaire."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "vecteur_directeur", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_gr_vd_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_vecteur_directeur",
    difficulty: 4,
    theme: "neutral",
    text: "Deux élèves donnent un vecteur directeur de la même droite : $\\vec{u}(2 ; 3)$ et $\\vec{v}(-4 ; -6)$. Qui a raison ?",
    format: "qcm",
    choices: [
      "les deux : ces vecteurs sont colinéaires",
      "seulement le premier",
      "seulement le second",
      "aucun des deux",
    ],
    expected: ["les deux : ces vecteurs sont colinéaires"],
    comparator: "mcq_exact",
    hint: "$\\vec{v}$ est-il un multiple de $\\vec{u}$ ?",
    explanation: exp(
      "Un vecteur directeur donne la DIRECTION de la droite : ni sa longueur ni son sens n'ont d'importance.",
      "On teste la colinéarité par le déterminant : $2 \\times (-6) - 3 \\times (-4) = -12 + 12 = 0$.",
      "Les deux vecteurs sont colinéaires ($\\vec{v} = -2\\vec{u}$) : ils dirigent la même droite, l'un simplement deux fois plus long et de sens opposé.",
      "Les deux ont raison — il y a une infinité de vecteurs directeurs."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "vecteur_directeur", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_gr_vd_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_vecteur_directeur",
    difficulty: 5,
    theme: "neutral",
    text: "Quel est un vecteur directeur de la droite d'équation $y = 3x + 1$ ?",
    format: "qcm",
    choices: ["$\\vec{u}(1 ; 3)$", "$\\vec{u}(3 ; 1)$", "$\\vec{u}(1 ; -3)$", "$\\vec{u}(3 ; -1)$"],
    expected: ["$\\vec{u}(1 ; 3)$"],
    comparator: "mcq_exact",
    hint: "Quand $x$ augmente de $1$, de combien $y$ augmente-t-il ?",
    explanation: exp(
      "Pour une droite écrite sous forme réduite $y = mx + p$, le coefficient directeur $m$ dit de combien $y$ monte quand $x$ avance de $1$.",
      "Ici $m = 3$ : en avançant de $1$ vers la droite, on monte de $3$.",
      "Un vecteur directeur est donc $\\vec{u}(1 ; 3)$. On peut le retrouver par la formule : $y = 3x + 1$ s'écrit $3x - y + 1 = 0$, donc $a = 3$, $b = -1$ et $\\vec{u}(-b ; a) = (1 ; 3)$.",
      "$\\vec{u}(1 ; 3)$ — attention à ne pas écrire $(3 ; 1)$, qui dirigerait une droite bien plus plate."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "vecteur_directeur", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_gr_vd_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_vecteur_directeur",
    difficulty: 5,
    theme: "neutral",
    text: "Explique la différence entre un vecteur normal et un vecteur directeur d'une droite, et comment passer de l'un à l'autre.",
    format: "open",
    expected: ["orthogonal", "perpendiculaire", "direction", "echange", "échange", "signe"],
    comparator: "contains_keyword",
    hint: "L'un suit la droite, l'autre lui barre le passage.",
    explanation: exp(
      "Un vecteur DIRECTEUR suit la droite : il indique dans quelle direction elle avance. Un vecteur NORMAL lui est perpendiculaire.",
      "Les deux sont orthogonaux entre eux, donc leur produit scalaire est nul.",
      "On passe de l'un à l'autre en échangeant les coordonnées et en changeant un signe : de $\\vec{n}(a ; b)$ on obtient $\\vec{u}(-b ; a)$, et réciproquement.",
      "Le directeur porte la droite, le normal la coupe à angle droit ; on passe de l'un à l'autre par « échange et changement de signe »."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "vecteur_directeur", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_gr_vd_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_vecteur_directeur",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève écrit que $\\vec{u}(a ; b)$ est un vecteur directeur de la droite $ax + by + c = 0$. Explique son erreur.",
    format: "open",
    expected: ["normal", "perpendiculaire", "orthogonal", "confond", "directeur"],
    comparator: "contains_keyword",
    hint: "Que représente $(a ; b)$ pour cette droite ?",
    explanation: exp(
      "Dans l'équation $ax + by + c = 0$, le couple $(a ; b)$ donne un vecteur NORMAL, c'est-à-dire perpendiculaire à la droite.",
      "L'élève l'a pris pour un vecteur directeur : il a confondu les deux rôles.",
      "Le directeur s'en déduit en échangeant et en changeant un signe : $\\vec{u}(-b ; a)$. Un contrôle rapide : pour $x + y - 1 = 0$, la droite descend, alors que $(1 ; 1)$ pointe vers le haut à droite — le signe ne colle pas.",
      "Il a confondu normal et directeur : c'est $\\vec{u}(-b ; a)$ qui dirige la droite."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "vecteur_directeur", "piege", "open"],
  },
  {
    kind: "template",
    id: "premiere_gr_vd_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_vecteur_directeur",
    difficulty: 4,
    theme: "neutral",
    hint: "De $ax + by + c = 0$, un directeur est $(-b ; a)$.",
    tags: ["premiere", "maths", "geometrie_reperee", "vecteur_directeur", "template"],
    generate: () => {
      const a = pickOne([1, 2, 3, 4, 5, -2, -3]);
      // $b$ ne doit valoir ni $a$ ni $-a$ : dans le premier cas les deux pièges
      // d'interversion s'écrivent pareil, dans le second c'est le piège « on a
      // gardé le signe » qui devient la bonne réponse.
      const b = pickOne([1, 2, 3, -1, -2, -4].filter((v) => v !== a && v !== -a));
      const c = randomInt(-5, 5);
      const correct = `$\\vec{u}(${-b} ; ${a})$`;
      const eq = `$${a}x ${b >= 0 ? "+ " + b : "- " + -b}y ${c >= 0 ? "+ " + c : "- " + -c} = 0$`;
      return {
        text: `Quel est un vecteur directeur de la droite d'équation ${eq} ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `$\\vec{u}(${a} ; ${b})$`,
          `$\\vec{u}(${b} ; ${a})$`,
          `$\\vec{u}(${a} ; ${-b})$`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        canvas: droiteCanvas(a, b, c),
        explanation: exp(
          "Dans $ax + by + c = 0$, le couple $(a ; b)$ donne un vecteur NORMAL ; un directeur s'obtient en échangeant les coordonnées et en changeant un signe.",
          `Ici $a = ${a}$ et $b = ${b}$, donc le normal est $\\vec{n}(${a} ; ${b})$.`,
          `Le directeur est $\\vec{u}(-b ; a) = (${-b} ; ${a})$. On vérifie : $${a} \\times ${-b} + ${b} \\times ${a} = 0$.`,
          `${correct} convient — comme tous ses multiples.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_gr_vd_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_vecteur_directeur",
    difficulty: 5,
    theme: "neutral",
    hint: "Teste la colinéarité par le déterminant $xy' - yx'$.",
    tags: ["premiere", "maths", "geometrie_reperee", "vecteur_directeur", "open", "template"],
    generate: () => {
      const cas = [
        { u: [2, 5], v: [4, 10], ok: true },
        { u: [3, -1], v: [-6, 2], ok: true },
        { u: [1, 4], v: [2, 7], ok: false },
        { u: [2, 3], v: [3, 2], ok: false },
        { u: [-1, 2], v: [3, -6], ok: true },
      ];
      const c = pickOne(cas);
      const det = c.u[0] * c.v[1] - c.u[1] * c.v[0];
      return {
        text: `Les vecteurs $\\vec{u}(${c.u[0]} ; ${c.u[1]})$ et $\\vec{v}(${c.v[0]} ; ${c.v[1]})$ peuvent-ils diriger la même droite ? Justifie.`,
        format: "open",
        expected: ["colineaire", "colinéaire", "determinant", "déterminant", c.ok ? "multiple" : "pas colineaire"],
        comparator: "contains_keyword",
        explanation: exp(
          "Deux vecteurs dirigent la même droite si et seulement s'ils sont colinéaires : leur déterminant $xy' - yx'$ est alors nul.",
          `On calcule $${c.u[0]} \\times ${c.v[1]} - ${c.u[1]} \\times ${c.v[0]}$.`,
          `$= ${det}$. ` +
            (c.ok
              ? "Le déterminant est nul : les vecteurs sont colinéaires, donc ils donnent la même direction."
              : "Le déterminant n'est pas nul : les vecteurs ne sont pas colinéaires, leurs directions diffèrent."),
          c.ok
            ? "Oui, ils dirigent la même droite."
            : "Non, ils ne peuvent pas diriger la même droite."
        ),
      };
    },
  },

  /* ===================== GR_EQUATION_DROITE (compléments) ===================== */
  {
    kind: "fixed",
    id: "premiere_gr_eq_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_equation_droite",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève cherche l'équation de la droite de vecteur normal $\\vec{n}(2 ; 5)$ passant par $A(1 ; 1)$, et répond $2x + 5y = 0$. Quelle est son erreur ?",
    format: "qcm",
    choices: [
      "il a oublié d'utiliser le point : $2x + 5y = 0$ est la droite qui passe par l'ORIGINE",
      "il a échangé les coordonnées du vecteur normal",
      "il fallait écrire $5x + 2y = 0$",
      "aucune : sa réponse est correcte",
    ],
    expected: ["il a oublié d'utiliser le point : $2x + 5y = 0$ est la droite qui passe par l'ORIGINE"],
    comparator: "mcq_exact",
    hint: "Le point $A(1 ; 1)$ vérifie-t-il son équation ?",
    explanation: exp(
      "Le vecteur normal fixe la DIRECTION de la droite : il donne les coefficients $a$ et $b$. Le point fixe sa POSITION : il donne $c$.",
      "L'élève a bien trouvé $2x + 5y + c = 0$, mais il a pris $c = 0$ sans vérifier.",
      "On teste $A$ : $2 \\times 1 + 5 \\times 1 = 7$, et non $0$. Il fallait donc $c = -7$, soit $2x + 5y - 7 = 0$. Son équation décrit une droite parallèle, mais passant par l'origine.",
      "Il a oublié le point : sans lui, on ne sait que la direction, pas où placer la droite."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "equation_droite", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_gr_eq_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_equation_droite",
    difficulty: 5,
    theme: "neutral",
    text: "Explique la méthode pour trouver l'équation d'une droite quand on connaît un vecteur normal et un point.",
    format: "open",
    expected: ["coefficients", "remplace", "constante", "point", "c ="],
    comparator: "contains_keyword",
    hint: "Deux étapes : d'abord la direction, ensuite la position.",
    explanation: exp(
      "Une équation $ax + by + c = 0$ contient deux informations : la direction, portée par $(a ; b)$, et la position, portée par $c$.",
      "Étape 1 — le vecteur normal $\\vec{n}(a ; b)$ donne directement les deux premiers coefficients : on écrit $ax + by + c = 0$ avec $c$ inconnu.",
      "Étape 2 — on remplace $x$ et $y$ par les coordonnées du point donné, ce qui fournit une équation à une inconnue, et on en tire $c$.",
      "Le normal donne la direction, le point donne la constante : sans le point, on aurait une infinité de droites parallèles."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "equation_droite", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_gr_eq_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_equation_droite",
    difficulty: 5,
    theme: "neutral",
    text: "Deux élèves trouvent $2x - y + 3 = 0$ et $-4x + 2y - 6 = 0$ pour la même droite. Ont-ils tous les deux raison ?",
    format: "open",
    expected: ["multiplie", "proportionnel", "meme droite", "même droite", "-2", "equivalent"],
    comparator: "contains_keyword",
    hint: "Multiplie la première équation par $-2$.",
    explanation: exp(
      "Une droite n'a pas UNE équation cartésienne mais une infinité : multiplier toute l'égalité par un même nombre non nul ne change pas ses solutions.",
      "On multiplie la première par $-2$ : $-4x + 2y - 6 = 0$.",
      "C'est exactement la seconde. Les deux équations ont donc les mêmes solutions, donc décrivent la même droite — leurs vecteurs normaux $(2 ; -1)$ et $(-4 ; 2)$ sont d'ailleurs colinéaires.",
      "Oui, les deux ont raison : les équations sont proportionnelles."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "equation_droite", "open"],
  },
  {
    kind: "template",
    id: "premiere_gr_eq_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_equation_droite",
    difficulty: 5,
    theme: "neutral",
    hint: "Écris $ax + by + c = 0$ avec les coordonnées du normal, puis trouve $c$ grâce au point.",
    tags: ["premiere", "maths", "geometrie_reperee", "equation_droite", "open", "template"],
    generate: () => {
      const a = pickOne([1, 2, 3, -1, -2]);
      const b = pickOne([1, 2, 3, -1, -3]);
      const xA = randomInt(-4, 4);
      const yA = randomInt(-4, 4);
      const c = -(a * xA + b * yA);
      return {
        text: `Détermine une équation cartésienne de la droite de vecteur normal $\\vec{n}(${a} ; ${b})$ passant par $A(${xA} ; ${yA})$, en expliquant chaque étape.`,
        format: "open",
        expected: ["normal", "remplace", "constante", String(c), "coefficients"],
        comparator: "contains_keyword",
        canvas: droiteCanvas(a, b, c, { x: xA, y: yA, label: "A" }),
        explanation: exp(
          "Le vecteur normal donne les coefficients de $x$ et de $y$ ; le point donne la constante.",
          `On écrit d'abord $${a}x ${b >= 0 ? "+ " + b : "- " + -b}y + c = 0$, puisque $\\vec{n}(${a} ; ${b})$ est normal.`,
          `On remplace par les coordonnées de $A$ : $${a} \\times ${xA} ${b >= 0 ? "+ " + b : "- " + -b} \\times ${yA} + c = 0$, d'où $c = ${c}$.`,
          `Une équation est $${a}x ${b >= 0 ? "+ " + b : "- " + -b}y ${c >= 0 ? "+ " + c : "- " + -c} = 0$.`
        ),
      };
    },
  },

  /* ===================== GR_DROITES ===================== */
  {
    kind: "fixed",
    id: "premiere_gr_dr_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_droites",
    difficulty: 3,
    theme: "neutral",
    text: "Deux droites sont parallèles si et seulement si leurs vecteurs normaux sont :",
    format: "qcm",
    choices: ["colinéaires", "orthogonaux", "égaux", "de norme $1$"],
    expected: ["colinéaires"],
    comparator: "mcq_exact",
    hint: "Deux droites parallèles ont la même direction, donc la même direction perpendiculaire.",
    explanation: exp(
      "Deux droites parallèles ont la même direction : leurs vecteurs directeurs sont colinéaires.",
      "La direction perpendiculaire est alors la même elle aussi.",
      "Leurs vecteurs normaux sont donc colinéaires — égaux n'est pas nécessaire : $(2 ; -1)$ et $(-6 ; 3)$ conviennent tous les deux.",
      "Les normaux sont colinéaires."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "droites", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_gr_dr_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_droites",
    difficulty: 3,
    theme: "neutral",
    text: "Deux droites sont perpendiculaires si et seulement si leurs vecteurs normaux sont :",
    format: "qcm",
    choices: ["orthogonaux", "colinéaires", "opposés", "de même norme"],
    expected: ["orthogonaux"],
    comparator: "mcq_exact",
    hint: "Si on tourne les deux droites d'un quart de tour, que deviennent leurs normaux ?",
    explanation: exp(
      "Le vecteur normal d'une droite est perpendiculaire à celle-ci : passer de la droite au normal, c'est tourner d'un quart de tour.",
      "Si deux droites sont perpendiculaires, leurs directions font un angle droit.",
      "En tournant les deux d'un quart de tour, l'angle est conservé : leurs normaux font eux aussi un angle droit. En pratique, on vérifie que le produit scalaire des deux normaux est nul.",
      "Les normaux sont orthogonaux."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "droites", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_gr_dr_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_droites",
    difficulty: 4,
    theme: "neutral",
    text: "Les droites $2x - y + 1 = 0$ et $2x - y + 7 = 0$ sont-elles confondues ?",
    format: "qcm",
    choices: [
      "non : elles sont parallèles mais distinctes",
      "oui : elles ont le même vecteur normal",
      "non : elles sont perpendiculaires",
      "oui : leurs coefficients sont proportionnels",
    ],
    expected: ["non : elles sont parallèles mais distinctes"],
    comparator: "mcq_exact",
    hint: "Un point de la première, par exemple $(0 ; 1)$, appartient-il à la seconde ?",
    explanation: exp(
      "Deux droites sont confondues si TOUS leurs coefficients sont proportionnels, constante comprise.",
      "Ici les parties en $x$ et $y$ sont identiques : les droites sont bien parallèles.",
      "Mais les constantes diffèrent ($+1$ et $+7$), et elles ne sont pas proportionnelles au même facteur. Le point $(0 ; 1)$ vérifie la première ($-1 + 1 = 0$) mais pas la seconde ($-1 + 7 = 6$).",
      "Non : elles sont parallèles et distinctes — elles n'ont aucun point commun."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "droites", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_gr_dr_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_droites",
    difficulty: 5,
    theme: "reunion",
    text: "Sur un plan de Saint-Pierre, deux rues ont pour équations $3x + 4y - 12 = 0$ et $4x - 3y + 5 = 0$. Que peut-on dire de ces deux rues ?",
    format: "qcm",
    choices: [
      "elles se coupent à angle droit",
      "elles sont parallèles",
      "elles sont confondues",
      "on ne peut rien dire sans les tracer",
    ],
    expected: ["elles se coupent à angle droit"],
    comparator: "mcq_exact",
    hint: "Calcule le produit scalaire des deux vecteurs normaux.",
    explanation: exp(
      "Deux droites sont perpendiculaires quand leurs vecteurs normaux le sont, c'est-à-dire quand leur produit scalaire est nul.",
      "Les normaux sont $\\vec{n_1}(3 ; 4)$ et $\\vec{n_2}(4 ; -3)$.",
      "$\\vec{n_1} \\cdot \\vec{n_2} = 3 \\times 4 + 4 \\times (-3) = 12 - 12 = 0$.",
      "Les deux rues se coupent à angle droit — un carrefour classique en damier."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "droites", "reunion", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_gr_dr_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_droites",
    difficulty: 5,
    theme: "neutral",
    text: "Comment reconnaître, sans tracer, si deux droites données par leurs équations sont parallèles, perpendiculaires, ou ni l'un ni l'autre ?",
    format: "open",
    expected: ["normaux", "colineaire", "colinéaire", "produit scalaire", "determinant", "déterminant", "orthogonaux"],
    comparator: "contains_keyword",
    hint: "Deux tests, sur les deux vecteurs normaux.",
    explanation: exp(
      "Toute l'information de direction est dans les vecteurs normaux, lus directement sur les coefficients de $x$ et de $y$.",
      "On extrait $\\vec{n_1}(a ; b)$ et $\\vec{n_2}(a' ; b')$, puis on fait deux tests.",
      "Colinéarité (déterminant $ab' - ba' = 0$) → droites parallèles ; produit scalaire nul ($aa' + bb' = 0$) → droites perpendiculaires ; ni l'un ni l'autre → elles se coupent en biais.",
      "Deux calculs sur les normaux suffisent : le déterminant pour le parallélisme, le produit scalaire pour la perpendicularité."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "droites", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_gr_dr_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_droites",
    difficulty: 5,
    theme: "neutral",
    text: "Deux droites sont parallèles. Comment savoir si elles sont confondues ou seulement parallèles ?",
    format: "open",
    expected: ["un point", "appartient", "verifie", "vérifie", "remplace", "constante"],
    comparator: "contains_keyword",
    hint: "Prends un point de l'une et teste-le dans l'autre.",
    explanation: exp(
      "Deux droites parallèles ont la même direction : soit elles n'ont aucun point commun, soit elles en ont une infinité — et alors elles sont confondues.",
      "Il suffit donc de trouver UN point de la première et de le tester dans la seconde.",
      "S'il vérifie la seconde équation, les droites ont un point commun : étant parallèles, elles sont confondues. Sinon, elles sont strictement parallèles.",
      "Un seul point testé suffit à trancher entre « confondues » et « parallèles distinctes »."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "droites", "open"],
  },
  {
    kind: "template",
    id: "premiere_gr_dr_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_droites",
    difficulty: 4,
    theme: "neutral",
    hint: "Compare les deux vecteurs normaux : déterminant nul → parallèles, produit scalaire nul → perpendiculaires.",
    tags: ["premiere", "maths", "geometrie_reperee", "droites", "template"],
    generate: () => {
      const cas = [
        { n1: [2, 3], n2: [4, 6], rep: "parallèles" },
        { n1: [1, -2], n2: [-3, 6], rep: "parallèles" },
        { n1: [3, 1], n2: [1, -3], rep: "perpendiculaires" },
        { n1: [2, 5], n2: [5, -2], rep: "perpendiculaires" },
        { n1: [1, 2], n2: [3, 1], rep: "ni parallèles ni perpendiculaires" },
        { n1: [4, -1], n2: [2, 3], rep: "ni parallèles ni perpendiculaires" },
      ];
      const c = pickOne(cas);
      const c1 = randomInt(-4, 4);
      const c2 = randomInt(-4, 4);
      const ecrire = (n: number[], k: number) =>
        `$${n[0]}x ${n[1] >= 0 ? "+ " + n[1] : "- " + -n[1]}y ${k >= 0 ? "+ " + k : "- " + -k} = 0$`;
      const autres = ["parallèles", "perpendiculaires", "ni parallèles ni perpendiculaires"].filter((r) => r !== c.rep);
      return {
        text: `Que peut-on dire des droites ${ecrire(c.n1, c1)} et ${ecrire(c.n2, c2)} ?`,
        format: "qcm",
        choices: [c.rep, ...autres, "elles sont confondues"],
        expected: [c.rep],
        comparator: "mcq_exact",
        explanation: exp(
          "Tout se lit sur les vecteurs normaux, donnés par les coefficients de $x$ et de $y$.",
          `Ici $\\vec{n_1}(${c.n1[0]} ; ${c.n1[1]})$ et $\\vec{n_2}(${c.n2[0]} ; ${c.n2[1]})$.`,
          `Déterminant : $${c.n1[0]} \\times ${c.n2[1]} - ${c.n1[1]} \\times ${c.n2[0]} = ${c.n1[0] * c.n2[1] - c.n1[1] * c.n2[0]}$. ` +
            `Produit scalaire : $${c.n1[0]} \\times ${c.n2[0]} + ${c.n1[1]} \\times ${c.n2[1]} = ${c.n1[0] * c.n2[0] + c.n1[1] * c.n2[1]}$.`,
          `Les droites sont ${c.rep}.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_gr_dr_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_droites",
    difficulty: 5,
    theme: "neutral",
    hint: "Direction d'abord, position ensuite : le point donne la constante.",
    tags: ["premiere", "maths", "geometrie_reperee", "droites", "open", "template"],
    generate: () => {
      const a = pickOne([1, 2, 3, -2]);
      const b = pickOne([1, -1, 2, -3]);
      const c0 = randomInt(-4, 4);
      const xA = randomInt(-3, 3);
      const yA = randomInt(-3, 3);
      const parallele = pickOne([true, false]);
      // Parallèle : même normal. Perpendiculaire : normal tourné d'un quart de tour.
      const na = parallele ? a : -b;
      const nb = parallele ? b : a;
      const c = -(na * xA + nb * yA);
      return {
        text:
          `On donne la droite $d$ d'équation $${a}x ${b >= 0 ? "+ " + b : "- " + -b}y ${c0 >= 0 ? "+ " + c0 : "- " + -c0} = 0$. ` +
          `Détermine une équation de la droite ${parallele ? "PARALLÈLE" : "PERPENDICULAIRE"} à $d$ passant par $A(${xA} ; ${yA})$, en expliquant ta démarche.`,
        format: "open",
        expected: [parallele ? "meme normal" : "orthogonal", "normal", "remplace", String(c), "constante"],
        comparator: "contains_keyword",
        explanation: exp(
          "On procède en deux temps : la direction, puis la position.",
          parallele
            ? `Parallèle à $d$ signifie même direction, donc même vecteur normal : on garde $\\vec{n}(${a} ; ${b})$ et on cherche $${a}x ${b >= 0 ? "+ " + b : "- " + -b}y + c = 0$.`
            : `Perpendiculaire à $d$ signifie que les normaux sont orthogonaux : on prend $\\vec{n'}(${na} ; ${nb})$, obtenu en échangeant les coordonnées et en changeant un signe.`,
          `On remplace ensuite par $A(${xA} ; ${yA})$ : $${na} \\times ${xA} ${nb >= 0 ? "+ " + nb : "- " + -nb} \\times ${yA} + c = 0$, d'où $c = ${c}$.`,
          `Une équation est $${na}x ${nb >= 0 ? "+ " + nb : "- " + -nb}y ${c >= 0 ? "+ " + c : "- " + -c} = 0$.`
        ),
      };
    },
  },

  /* ===================== GR_PROJETE ===================== */
  {
    kind: "fixed",
    id: "premiere_gr_pr_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_projete",
    difficulty: 3,
    theme: "neutral",
    text: "Le projeté orthogonal d'un point $M$ sur une droite $d$ est :",
    format: "qcm",
    choices: [
      "le point $H$ de $d$ tel que $(MH)$ soit perpendiculaire à $d$",
      "le milieu du segment reliant $M$ à $d$",
      "le point de $d$ le plus éloigné de $M$",
      "l'intersection de $d$ avec l'axe des abscisses",
    ],
    expected: ["le point $H$ de $d$ tel que $(MH)$ soit perpendiculaire à $d$"],
    comparator: "mcq_exact",
    hint: "On « laisse tomber » une perpendiculaire depuis $M$.",
    explanation: exp(
      "Projeter orthogonalement, c'est aller de $M$ vers la droite par le chemin le plus direct : perpendiculairement.",
      "Le projeté $H$ est donc le point de $d$ tel que le vecteur $\\vec{MH}$ soit orthogonal à la direction de $d$.",
      "C'est aussi, et ce n'est pas un hasard, le point de $d$ le PLUS PROCHE de $M$ : la distance $MH$ est la distance du point à la droite.",
      "$H$ est le point de $d$ tel que $(MH) \\perp d$."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "projete", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_gr_pr_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_projete",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle méthode donne les coordonnées du projeté orthogonal de $M$ sur la droite $d$ ?",
    format: "qcm",
    choices: [
      "écrire la perpendiculaire à $d$ passant par $M$, puis résoudre le système des deux équations",
      "prendre le milieu de $M$ et d'un point de $d$",
      "prendre le point de $d$ d'abscisse celle de $M$",
      "calculer la moyenne des coordonnées de deux points de $d$",
    ],
    expected: [
      "écrire la perpendiculaire à $d$ passant par $M$, puis résoudre le système des deux équations",
    ],
    comparator: "mcq_exact",
    hint: "Le projeté est sur DEUX droites à la fois.",
    explanation: exp(
      "Le projeté $H$ est caractérisé par deux conditions : il est sur $d$, et $(MH)$ est perpendiculaire à $d$.",
      "Chacune se traduit par une équation : celle de $d$, et celle de la perpendiculaire à $d$ passant par $M$.",
      "$H$ est donc l'intersection de ces deux droites : on résout le système. Prendre le point de $d$ de même abscisse que $M$ donne le projeté VERTICAL, ce qui n'est pas la même chose (sauf si $d$ est horizontale).",
      "On écrit la perpendiculaire, puis on résout le système."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "projete", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_gr_pr_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_projete",
    difficulty: 5,
    theme: "neutral",
    text: "Le point $M$ appartient déjà à la droite $d$. Où se trouve son projeté orthogonal sur $d$ ?",
    format: "qcm",
    choices: [
      "en $M$ lui-même",
      "à l'origine du repère",
      "il n'existe pas",
      "au point de $d$ le plus proche de l'origine",
    ],
    expected: ["en $M$ lui-même"],
    comparator: "mcq_exact",
    hint: "Quel est le point de $d$ le plus proche de $M$, si $M$ est sur $d$ ?",
    explanation: exp(
      "Le projeté orthogonal de $M$ sur $d$ est le point de $d$ le plus proche de $M$.",
      "Si $M$ est déjà sur $d$, la distance de $M$ à $d$ vaut $0$.",
      "Le point le plus proche est donc $M$ lui-même : $H = M$. C'est un cas limite utile pour vérifier un calcul — si on projette un point de la droite et qu'on retrouve autre chose, il y a une erreur.",
      "Le projeté est $M$ lui-même."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "projete", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_gr_pr_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_projete",
    difficulty: 5,
    theme: "reunion",
    text: "Un randonneur est en $M(6 ; 5)$ et le sentier suit la droite d'équation $y = x$. Où doit-il rejoindre le sentier pour marcher le moins possible ?",
    format: "qcm",
    choices: [
      "en $(5{,}5 ; 5{,}5)$, son projeté orthogonal",
      "en $(6 ; 6)$, à la verticale",
      "en $(5 ; 5)$, à l'horizontale",
      "en $(0 ; 0)$, au départ du sentier",
    ],
    expected: ["en $(5{,}5 ; 5{,}5)$, son projeté orthogonal"],
    comparator: "mcq_exact",
    hint: "Le plus court chemin d'un point à une droite est perpendiculaire à cette droite.",
    explanation: exp(
      "Le point d'une droite le plus proche d'un point donné est son projeté orthogonal : c'est ce qui minimise la distance.",
      "La perpendiculaire à $y = x$ passant par $M(6 ; 5)$ a pour équation $y = -x + 11$.",
      "On résout $x = -x + 11$, soit $x = 5{,}5$, donc $H(5{,}5 ; 5{,}5)$. Rejoindre à la verticale $(6 ; 6)$ ou à l'horizontale $(5 ; 5)$ fait marcher $1$ km au lieu de $0{,}7$.",
      "Il doit viser $(5{,}5 ; 5{,}5)$ : le chemin le plus court coupe le sentier à angle droit."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "projete", "reunion", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_gr_pr_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_projete",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi le projeté orthogonal de $M$ sur $d$ est le point de $d$ le plus proche de $M$.",
    format: "open",
    expected: ["pythagore", "hypotenuse", "hypoténuse", "triangle rectangle", "plus grande"],
    comparator: "contains_keyword",
    hint: "Prends un autre point $P$ de $d$ et regarde le triangle $MHP$.",
    explanation: exp(
      "On compare la distance $MH$, où $H$ est le projeté, à la distance $MP$ pour n'importe quel autre point $P$ de la droite.",
      "Le triangle $MHP$ est rectangle en $H$, puisque $(MH)$ est perpendiculaire à $d$ et que $P$ est sur $d$.",
      "Dans un triangle rectangle, l'hypoténuse est le plus grand côté : $MP > MH$ dès que $P \\neq H$. On peut aussi l'écrire par Pythagore : $MP^2 = MH^2 + HP^2 \\geqslant MH^2$.",
      "Tout autre point de la droite est plus loin : $H$ réalise la distance de $M$ à $d$."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "projete", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_gr_pr_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_projete",
    difficulty: 5,
    theme: "neutral",
    text: "Décris la méthode complète pour calculer les coordonnées du projeté orthogonal d'un point sur une droite.",
    format: "open",
    expected: ["perpendiculaire", "systeme", "système", "intersection", "normal", "directeur"],
    comparator: "contains_keyword",
    hint: "Trois étapes, dont un système à résoudre.",
    explanation: exp(
      "Le projeté est l'unique point vérifiant deux conditions : appartenir à $d$, et être aligné avec $M$ perpendiculairement à $d$.",
      "Étape 1 — on lit un vecteur directeur de $d$ ; il servira de vecteur NORMAL à la perpendiculaire.",
      "Étape 2 — on écrit l'équation de la perpendiculaire à $d$ passant par $M$. Étape 3 — on résout le système formé par les deux équations.",
      "La solution du système donne les coordonnées de $H$. Contrôle utile : si $M$ était déjà sur $d$, on doit retrouver $M$."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "projete", "open"],
  },
  {
    kind: "template",
    id: "premiere_gr_pr_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_projete",
    difficulty: 4,
    theme: "neutral",
    hint: "Sur un axe, projeter revient à annuler l'autre coordonnée.",
    tags: ["premiere", "maths", "geometrie_reperee", "projete", "template"],
    generate: () => {
      // Un point sur un axe, ou sur la première bissectrice, fait coïncider deux
      // des quatre propositions : $M$ doit être hors des axes et hors de la
      // droite $y = x$.
      const nonNuls = [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5];
      const x = pickOne(nonNuls);
      const y = pickOne(nonNuls.filter((v) => v !== x));
      const surAbscisses = pickOne([true, false]);
      const correct = surAbscisses ? `$(${x} ; 0)$` : `$(0 ; ${y})$`;
      return {
        text: `Quel est le projeté orthogonal du point $M(${x} ; ${y})$ sur l'axe des ${surAbscisses ? "abscisses" : "ordonnées"} ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          surAbscisses ? `$(0 ; ${y})$` : `$(${x} ; 0)$`,
          `$(${y} ; ${x})$`,
          `$(${x} ; ${y})$`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Projeter sur un axe, c'est suivre la perpendiculaire à cet axe : elle est verticale pour l'axe des abscisses, horizontale pour l'axe des ordonnées.",
          surAbscisses
            ? `La perpendiculaire à l'axe des abscisses passant par $M$ est la verticale $x = ${x}$.`
            : `La perpendiculaire à l'axe des ordonnées passant par $M$ est l'horizontale $y = ${y}$.`,
          surAbscisses
            ? "Elle coupe l'axe des abscisses là où $y = 0$ : l'abscisse est conservée."
            : "Elle coupe l'axe des ordonnées là où $x = 0$ : l'ordonnée est conservée.",
          `Le projeté est ${correct}.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_gr_pr_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_projete",
    difficulty: 5,
    theme: "neutral",
    hint: "Écris la perpendiculaire à $d$ passant par $M$, puis résous le système.",
    tags: ["premiere", "maths", "geometrie_reperee", "projete", "open", "template"],
    generate: () => {
      const cas = [
        { d: "y = x", a: 1, b: -1, c: 0, xM: 6, yM: 2, H: "(4 ; 4)" },
        { d: "y = x", a: 1, b: -1, c: 0, xM: 1, yM: 5, H: "(3 ; 3)" },
        { d: "y = -x", a: 1, b: 1, c: 0, xM: 4, yM: 2, H: "(1 ; -1)" },
        { d: "x + y - 4 = 0", a: 1, b: 1, c: -4, xM: 0, yM: 0, H: "(2 ; 2)" },
        { d: "x - y + 2 = 0", a: 1, b: -1, c: 2, xM: 3, yM: 1, H: "(1 ; 3)" },
      ];
      const c = pickOne(cas);
      return {
        text: `Détermine les coordonnées du projeté orthogonal de $M(${c.xM} ; ${c.yM})$ sur la droite d'équation $${c.d}$, en expliquant ta démarche.`,
        format: "open",
        expected: [c.H, "perpendiculaire", "systeme", "système", "intersection"],
        comparator: "contains_keyword",
        canvas: droiteCanvas(c.a, c.b, c.c, { x: c.xM, y: c.yM, label: "M" }),
        explanation: exp(
          "Le projeté est l'intersection de la droite et de la perpendiculaire à cette droite passant par le point.",
          `Un vecteur directeur de $d$ sert de normal à la perpendiculaire : on écrit son équation en la faisant passer par $M(${c.xM} ; ${c.yM})$.`,
          "On résout ensuite le système formé par les deux équations : une seule solution, c'est le point d'intersection.",
          `Le projeté est $H${c.H}$.`
        ),
      };
    },
  },

  /* ===================== GR_CERCLE (compléments) ===================== */
  {
    kind: "fixed",
    id: "premiere_gr_cer_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_cercle",
    difficulty: 5,
    theme: "neutral",
    text: "Explique d'où vient l'équation $(x - a)^2 + (y - b)^2 = r^2$ d'un cercle.",
    format: "open",
    expected: ["distance", "rayon", "pythagore", "centre", "constante"],
    comparator: "contains_keyword",
    hint: "Un cercle, c'est l'ensemble des points situés à quelle distance du centre ?",
    explanation: exp(
      "Un cercle de centre $\\Omega$ et de rayon $r$ est l'ensemble des points $M$ tels que $\\Omega M = r$ : une distance constante.",
      "Or la distance entre $\\Omega(a ; b)$ et $M(x ; y)$ se calcule par $\\sqrt{(x - a)^2 + (y - b)^2}$, formule qui vient de Pythagore.",
      "L'égalité $\\Omega M = r$ s'écrit donc $\\sqrt{(x - a)^2 + (y - b)^2} = r$, et on élève au carré pour supprimer la racine.",
      "L'équation traduit simplement « la distance au centre vaut $r$ » : c'est Pythagore, mis au carré."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "cercle", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_gr_cer_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_cercle",
    difficulty: 5,
    theme: "neutral",
    text: "Pourquoi élève-t-on le rayon au carré dans l'équation du cercle, alors qu'on ne le fait pas pour les coordonnées du centre ?",
    format: "open",
    expected: ["racine", "distance", "carre", "carré", "pythagore"],
    comparator: "contains_keyword",
    hint: "Que fait-on pour se débarrasser de la racine carrée de la distance ?",
    explanation: exp(
      "La distance de $M$ au centre contient une racine carrée : $\\sqrt{(x - a)^2 + (y - b)^2}$.",
      "Pour éviter de manipuler cette racine, on élève les DEUX membres de l'égalité au carré.",
      "À gauche, la racine disparaît ; à droite, $r$ devient $r^2$. Les coordonnées du centre, elles, ne sont pas touchées : elles sont à l'intérieur des parenthèses, déjà au carré.",
      "Le $r^2$ est la trace de la racine carrée qu'on a fait disparaître — d'où le piège : dans $(x-1)^2 + (y-2)^2 = 25$, le rayon vaut $5$, pas $25$."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "cercle", "piege", "open"],
  },
  {
    kind: "template",
    id: "premiere_gr_cer_tpl_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_cercle",
    difficulty: 4,
    theme: "neutral",
    hint: "Dans $(x - a)^2 + (y - b)^2 = r^2$, le centre est $(a ; b)$ et le carré du rayon est à droite.",
    tags: ["premiere", "maths", "geometrie_reperee", "cercle", "template"],
    generate: () => {
      const a = randomInt(-4, 4);
      // Un cercle centré à l'origine ne distingue plus « le signe s'inverse
      // dans les parenthèses » de la bonne réponse : $- 0$ et $+ 0$ s'écrivent
      // pareil. Si l'abscisse du centre est nulle, l'ordonnée ne l'est pas.
      const b = a === 0 ? pickOne([-4, -3, -2, -1, 1, 2, 3, 4]) : randomInt(-4, 4);
      const r = randomInt(2, 7);
      const signe = (v: number) => (v >= 0 ? `- ${v}` : `+ ${-v}`);
      const correct = `$(x ${signe(a)})^2 + (y ${signe(b)})^2 = ${r * r}$`;
      return {
        text: `Quelle est l'équation du cercle de centre $\\Omega(${a} ; ${b})$ et de rayon $${r}$ ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `$(x ${signe(a)})^2 + (y ${signe(b)})^2 = ${r}$`,
          `$(x ${signe(-a)})^2 + (y ${signe(-b)})^2 = ${r * r}$`,
          `$(x ${signe(a)})^2 - (y ${signe(b)})^2 = ${r * r}$`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "L'équation d'un cercle de centre $\\Omega(a ; b)$ et de rayon $r$ est $(x - a)^2 + (y - b)^2 = r^2$.",
          `Ici $a = ${a}$, $b = ${b}$ et $r = ${r}$.`,
          `Attention aux deux pièges : le signe s'INVERSE dans les parenthèses, et c'est $r^2 = ${r * r}$ qui figure à droite, pas $r$.`,
          `${correct}.`
        ),
      };
    },
  },

  /* ===================== GR_CERCLE_RECONNAITRE (compléments) ===================== */
  {
    kind: "fixed",
    id: "premiere_gr_crec_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_cercle_reconnaitre",
    difficulty: 5,
    theme: "neutral",
    text: "L'équation $(x - 2)^2 + (y + 1)^2 = -4$ décrit-elle un cercle ?",
    format: "qcm",
    choices: [
      "non : une somme de carrés ne peut pas être négative, aucun point ne convient",
      "oui, de rayon $-2$",
      "oui, de rayon $2$",
      "oui, de centre $(2 ; -1)$ et de rayon $4$",
    ],
    expected: ["non : une somme de carrés ne peut pas être négative, aucun point ne convient"],
    comparator: "mcq_exact",
    hint: "Le membre de gauche peut-il être négatif ?",
    explanation: exp(
      "Le membre de gauche est une somme de deux carrés : il est toujours positif ou nul.",
      "Il ne peut donc jamais valoir $-4$ : aucun couple $(x ; y)$ ne vérifie l'égalité.",
      "L'ensemble décrit est VIDE. Ce n'est pas un cercle de rayon $-2$ : un rayon est une longueur, il ne peut pas être négatif.",
      "Non : l'ensemble est vide. Un contrôle réflexe : le nombre à droite doit être positif."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "cercle_reconnaitre", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_gr_crec_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_cercle_reconnaitre",
    difficulty: 4,
    theme: "neutral",
    text: "Que décrit l'équation $(x - 3)^2 + (y + 2)^2 = 0$ ?",
    format: "qcm",
    choices: [
      "un seul point, $(3 ; -2)$",
      "un cercle de rayon $0$ et de centre $(-3 ; 2)$",
      "l'ensemble vide",
      "une droite",
    ],
    expected: ["un seul point, $(3 ; -2)$"],
    comparator: "mcq_exact",
    hint: "Une somme de deux carrés est nulle seulement si les deux le sont.",
    explanation: exp(
      "Une somme de deux carrés vaut $0$ seulement si chacun des deux carrés est nul.",
      "Il faut donc $x - 3 = 0$ ET $y + 2 = 0$.",
      "C'est-à-dire $x = 3$ et $y = -2$ : un seul point, $(3 ; -2)$. C'est le centre du « cercle », réduit à un point puisque le rayon vaut $0$.",
      "L'ensemble est réduit au point $(3 ; -2)$ — attention aux signes : $(y + 2)^2$ donne $y = -2$."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "cercle_reconnaitre", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_gr_crec_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_cercle_reconnaitre",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève lit sur $(x + 5)^2 + (y - 1)^2 = 9$ un centre de coordonnées $(5 ; 1)$ et un rayon de $9$. Corrige ses deux erreurs.",
    format: "open",
    expected: ["signe", "oppose", "opposé", "-5", "racine", "3"],
    comparator: "contains_keyword",
    hint: "La forme de référence est $(x - a)^2 + (y - b)^2 = r^2$.",
    explanation: exp(
      "La forme de référence est $(x - a)^2 + (y - b)^2 = r^2$ : le centre est $(a ; b)$ et le nombre à droite est le CARRÉ du rayon.",
      "Première erreur : $(x + 5)^2$ s'écrit $(x - (-5))^2$, donc $a = -5$ et non $5$. Le signe s'inverse.",
      "Seconde erreur : $9 = r^2$, donc $r = \\sqrt{9} = 3$, et non $9$.",
      "Le centre est $(-5 ; 1)$ et le rayon vaut $3$."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "cercle_reconnaitre", "piege", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_gr_crec_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_cercle_reconnaitre",
    difficulty: 5,
    theme: "neutral",
    text: "Comment reconnaître, en regardant une équation, si elle décrit un cercle, un point, ou rien du tout ?",
    format: "open",
    expected: ["positif", "negatif", "négatif", "nul", "somme de carres", "somme de carrés"],
    comparator: "contains_keyword",
    hint: "Tout se joue sur le signe du nombre à droite.",
    explanation: exp(
      "Sous la forme $(x - a)^2 + (y - b)^2 = k$, le membre de gauche est une somme de carrés : il est toujours positif ou nul.",
      "Tout dépend donc du signe de $k$.",
      "Si $k > 0$ : c'est un cercle de centre $(a ; b)$ et de rayon $\\sqrt{k}$. Si $k = 0$ : l'ensemble est réduit au point $(a ; b)$. Si $k < 0$ : aucun point ne convient, l'ensemble est vide.",
      "Le signe du nombre à droite décide : positif → cercle, nul → un point, négatif → rien."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "cercle_reconnaitre", "open"],
  },

  /* ===================== GR_CERCLE_UTILISER (compléments) ===================== */
  {
    kind: "fixed",
    id: "premiere_gr_cuti_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_cercle_utiliser",
    difficulty: 5,
    theme: "neutral",
    text: "Comment obtenir l'équation du cercle de DIAMÈTRE $[AB]$ ?",
    format: "qcm",
    choices: [
      "prendre pour centre le milieu de $[AB]$ et pour rayon la moitié de $AB$",
      "prendre pour centre $A$ et pour rayon $AB$",
      "prendre pour centre $B$ et pour rayon $AB$",
      "prendre pour centre l'origine et pour rayon $AB$",
    ],
    expected: ["prendre pour centre le milieu de $[AB]$ et pour rayon la moitié de $AB$"],
    comparator: "mcq_exact",
    hint: "Où se trouve le centre d'un cercle, par rapport à un de ses diamètres ?",
    explanation: exp(
      "Un diamètre est une corde qui passe par le centre : le centre est donc son milieu, et le diamètre vaut deux fois le rayon.",
      "Le centre du cercle est le milieu $I$ de $[AB]$, de coordonnées $\\left(\\dfrac{x_A + x_B}{2} ; \\dfrac{y_A + y_B}{2}\\right)$.",
      "Le rayon vaut $\\dfrac{AB}{2}$. On écrit ensuite l'équation avec ce centre et ce rayon.",
      "Centre = milieu de $[AB]$, rayon = moitié de $AB$ — l'erreur classique est de prendre $AB$ tout entier comme rayon."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "cercle_utiliser", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_gr_cuti_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_cercle_utiliser",
    difficulty: 5,
    theme: "neutral",
    text: "Comment savoir si un point est à l'intérieur, sur, ou à l'extérieur d'un cercle donné par son équation ?",
    format: "open",
    expected: ["remplace", "compare", "distance", "rayon", "inferieur", "inférieur", "superieur", "supérieur"],
    comparator: "contains_keyword",
    hint: "Que donne le calcul du membre de gauche avec les coordonnées du point ?",
    explanation: exp(
      "L'équation $(x - a)^2 + (y - b)^2 = r^2$ dit que le carré de la distance au centre vaut $r^2$.",
      "On remplace $x$ et $y$ par les coordonnées du point : on obtient le carré de sa distance au centre.",
      "On compare alors à $r^2$ : plus petit → le point est à l'intérieur ; égal → il est SUR le cercle ; plus grand → il est à l'extérieur.",
      "Un seul calcul suffit, et il n'y a même pas besoin d'extraire la racine carrée : on compare les carrés."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "cercle_utiliser", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_gr_cuti_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_cercle_utiliser",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève veut vérifier que $A(1 ; 2)$ et $B(5 ; 2)$ sont sur le cercle de diamètre $[AB]$. Peut-il s'en dispenser ? Explique.",
    format: "open",
    expected: ["toujours", "extremites", "extrémités", "diametre", "diamètre", "rayon", "milieu"],
    comparator: "contains_keyword",
    hint: "À quelle distance du milieu de $[AB]$ se trouvent $A$ et $B$ ?",
    explanation: exp(
      "Le cercle de diamètre $[AB]$ a pour centre le milieu $I$ de $[AB]$ et pour rayon $\\dfrac{AB}{2}$.",
      "Or $IA = IB = \\dfrac{AB}{2}$ par définition du milieu.",
      "Les deux points sont donc à une distance du centre exactement égale au rayon : ils sont sur le cercle, quels que soient $A$ et $B$. La vérification est inutile — mais elle reste un bon contrôle si on doute de son calcul de centre ou de rayon.",
      "Oui, il peut s'en dispenser : les extrémités d'un diamètre sont toujours sur le cercle."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "cercle_utiliser", "open"],
  },
  {
    kind: "template",
    id: "premiere_gr_cuti_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_cercle_utiliser",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule le carré de la distance au centre, puis compare à $r^2$.",
    tags: ["premiere", "maths", "geometrie_reperee", "cercle_utiliser", "template"],
    generate: () => {
      const a = randomInt(-3, 3);
      const b = randomInt(-3, 3);
      const r = randomInt(3, 6);
      const ecart = pickOne([-2, -1, 0, 1, 2]);
      const x = a + r + ecart;
      const y = b;
      const d2 = (x - a) * (x - a) + (y - b) * (y - b);
      const position = d2 < r * r ? "à l'intérieur du cercle" : d2 === r * r ? "sur le cercle" : "à l'extérieur du cercle";
      const autres = ["à l'intérieur du cercle", "sur le cercle", "à l'extérieur du cercle"].filter((p) => p !== position);
      const signe = (v: number) => (v >= 0 ? `- ${v}` : `+ ${-v}`);
      return {
        text: `Où se situe le point $M(${x} ; ${y})$ par rapport au cercle d'équation $(x ${signe(a)})^2 + (y ${signe(b)})^2 = ${r * r}$ ?`,
        format: "qcm",
        choices: [position, ...autres, "on ne peut pas le savoir"],
        expected: [position],
        comparator: "mcq_exact",
        explanation: exp(
          "Le membre de gauche de l'équation calcule le CARRÉ de la distance au centre : on le compare au carré du rayon.",
          `On remplace : $(${x} ${signe(a)})^2 + (${y} ${signe(b)})^2 = ${d2}$.`,
          `On compare à $r^2 = ${r * r}$ : ${d2 < r * r ? "c'est plus petit" : d2 === r * r ? "c'est égal" : "c'est plus grand"}.`,
          `Le point $M$ est ${position}.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_gr_cuti_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_cercle_utiliser",
    difficulty: 5,
    theme: "neutral",
    hint: "Centre = milieu de $[AB]$, rayon = moitié de la longueur $AB$.",
    tags: ["premiere", "maths", "geometrie_reperee", "cercle_utiliser", "open", "template"],
    generate: () => {
      const cas = [
        { A: [1, 2], B: [5, 2], I: "(3 ; 2)", r: "2" },
        { A: [0, 0], B: [6, 8], I: "(3 ; 4)", r: "5" },
        { A: [-2, 1], B: [4, 1], I: "(1 ; 1)", r: "3" },
        { A: [2, -3], B: [2, 5], I: "(2 ; 1)", r: "4" },
        { A: [-3, -4], B: [3, 4], I: "(0 ; 0)", r: "5" },
      ];
      const c = pickOne(cas);
      return {
        text: `Détermine une équation du cercle de diamètre $[AB]$, avec $A(${c.A[0]} ; ${c.A[1]})$ et $B(${c.B[0]} ; ${c.B[1]})$. Explique ta démarche.`,
        format: "open",
        expected: ["milieu", "moitie", "moitié", "rayon", c.r, "centre"],
        comparator: "contains_keyword",
        explanation: exp(
          "Un diamètre passe par le centre : le centre est donc le milieu du segment, et le rayon vaut la moitié de sa longueur.",
          `Le milieu de $[AB]$ est $I${c.I}$ : on additionne les coordonnées et on divise par $2$.`,
          `La longueur $AB$ se calcule par la distance entre les deux points ; sa moitié donne le rayon $r = ${c.r}$.`,
          `On écrit alors l'équation avec le centre $I${c.I}$ et $r^2 = ${Number(c.r) * Number(c.r)}$.`
        ),
      };
    },
  },

  /* ===================== GR_CONFIGURATION ===================== */
  {
    kind: "fixed",
    id: "premiere_gr_conf_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_configuration",
    difficulty: 4,
    theme: "neutral",
    text: "Pour démontrer avec des coordonnées qu'un triangle $ABC$ est rectangle en $A$, que suffit-il de vérifier ?",
    format: "qcm",
    choices: [
      "que $\\vec{AB} \\cdot \\vec{AC} = 0$",
      "que $AB = AC$",
      "que $\\vec{AB}$ et $\\vec{AC}$ sont colinéaires",
      "que $A$, $B$ et $C$ sont alignés",
    ],
    expected: ["que $\\vec{AB} \\cdot \\vec{AC} = 0$"],
    comparator: "mcq_exact",
    hint: "Rectangle en $A$ signifie que l'angle en $A$ est droit.",
    explanation: exp(
      "Un triangle est rectangle en $A$ quand les deux côtés issus de $A$ sont perpendiculaires.",
      "Ces côtés sont portés par les vecteurs $\\vec{AB}$ et $\\vec{AC}$.",
      "Deux vecteurs non nuls sont orthogonaux si et seulement si leur produit scalaire est nul : un seul calcul, $x x' + y y'$, suffit. Pythagore marcherait aussi, mais demande trois longueurs, donc trois racines carrées.",
      "Il suffit de vérifier que $\\vec{AB} \\cdot \\vec{AC} = 0$."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "configuration", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_gr_conf_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_configuration",
    difficulty: 4,
    theme: "neutral",
    text: "Pour démontrer que trois points $A$, $B$, $C$ sont alignés, que vérifie-t-on ?",
    format: "qcm",
    choices: [
      "que $\\vec{AB}$ et $\\vec{AC}$ sont colinéaires",
      "que $\\vec{AB} \\cdot \\vec{AC} = 0$",
      "que $AB = AC$",
      "que le milieu de $[AC]$ est $B$",
    ],
    expected: ["que $\\vec{AB}$ et $\\vec{AC}$ sont colinéaires"],
    comparator: "mcq_exact",
    hint: "Alignés signifie « sur une même droite », donc de même direction.",
    explanation: exp(
      "Trois points sont alignés quand ils appartiennent à une même droite, c'est-à-dire quand les vecteurs qui les joignent ont la même direction.",
      "On calcule $\\vec{AB}$ et $\\vec{AC}$, puis on teste leur colinéarité par le déterminant $xy' - yx'$.",
      "S'il est nul, les points sont alignés. Le produit scalaire nul dirait au contraire qu'ils forment un angle DROIT en $A$ — c'est exactement le contraire.",
      "On vérifie la colinéarité de $\\vec{AB}$ et $\\vec{AC}$."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "configuration", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_gr_conf_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_configuration",
    difficulty: 5,
    theme: "neutral",
    text: "On doit étudier un rectangle $ABCD$ dans un repère de son choix. Quel repère rend les calculs les plus simples ?",
    format: "qcm",
    choices: [
      "l'origine en $A$, les axes portés par $[AB]$ et $[AD]$",
      "l'origine au centre du rectangle, les axes en diagonale",
      "l'origine en $A$, un axe porté par la diagonale $[AC]$",
      "n'importe lequel : cela ne change rien aux calculs",
    ],
    expected: ["l'origine en $A$, les axes portés par $[AB]$ et $[AD]$"],
    comparator: "mcq_exact",
    hint: "Quel choix donne le plus de coordonnées nulles ?",
    explanation: exp(
      "Le repère est libre : on le choisit pour que les coordonnées des points de la figure soient les plus simples possible.",
      "En plaçant l'origine sur un sommet et les axes le long de deux côtés perpendiculaires, on obtient $A(0 ; 0)$, $B(L ; 0)$, $D(0 ; \\ell)$ et $C(L ; \\ell)$.",
      "Presque toutes les coordonnées sont nulles ou réduites à une lettre : les produits scalaires et les distances se calculent en deux lignes. Avec des axes en diagonale, chaque point aurait deux coordonnées non nulles.",
      "L'origine en $A$ et les axes sur les côtés : le bon repère fait la moitié du travail."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "configuration", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_gr_conf_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_configuration",
    difficulty: 5,
    theme: "reunion",
    text: "Sur un plan quadrillé de la ville, trois bornes d'incendie sont en $A(0 ; 0)$, $B(6 ; 0)$ et $C(3 ; 5)$. Le triangle qu'elles forment est :",
    format: "qcm",
    choices: [
      "isocèle en $C$",
      "rectangle en $C$",
      "équilatéral",
      "quelconque",
    ],
    expected: ["isocèle en $C$"],
    comparator: "mcq_exact",
    hint: "Calcule $CA$ et $CB$ avant de conclure.",
    explanation: exp(
      "Pour reconnaître la nature d'un triangle dans un repère, on calcule les longueurs des côtés, et un produit scalaire si on soupçonne un angle droit.",
      "$CA = \\sqrt{9 + 25} = \\sqrt{34}$ et $CB = \\sqrt{9 + 25} = \\sqrt{34}$ : les deux côtés issus de $C$ sont égaux.",
      "Est-il rectangle en $C$ ? $\\vec{CA}(-3 ; -5)$ et $\\vec{CB}(3 ; -5)$ donnent $-9 + 25 = 16 \\neq 0$ : non. Et $AB = 6 \\neq \\sqrt{34}$, donc il n'est pas équilatéral.",
      "Le triangle est isocèle en $C$."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "configuration", "reunion", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_gr_conf_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_configuration",
    difficulty: 5,
    theme: "neutral",
    text: "Explique l'intérêt de bien choisir son repère avant de se lancer dans les calculs sur une figure.",
    format: "open",
    expected: ["coordonnees simples", "coordonnées simples", "nulles", "origine", "sommet", "cotes", "côtés"],
    comparator: "contains_keyword",
    hint: "Que gagne-t-on à mettre l'origine sur un sommet ?",
    explanation: exp(
      "Les propriétés d'une figure — angles droits, longueurs égales, alignements — ne dépendent pas du repère choisi : seul le calcul en dépend.",
      "On a donc intérêt à choisir le repère qui donne les coordonnées les plus simples.",
      "En plaçant l'origine sur un sommet et les axes le long de deux côtés perpendiculaires, plusieurs coordonnées deviennent nulles, et les produits scalaires se réduisent à un ou deux termes.",
      "Le résultat est le même, mais le calcul est deux fois plus court et il y a deux fois moins d'occasions de se tromper."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "configuration", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_gr_conf_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_configuration",
    difficulty: 5,
    theme: "neutral",
    text: "Quelle est la différence entre « vérifier sur un dessin » et « démontrer avec des coordonnées » qu'un triangle est rectangle ?",
    format: "open",
    expected: ["dessin", "approximatif", "precis", "précis", "demonstration", "démonstration", "calcul", "exact"],
    comparator: "contains_keyword",
    hint: "Un dessin peut-il distinguer un angle de $90°$ d'un angle de $89{,}8°$ ?",
    explanation: exp(
      "Un dessin donne une intuition : il montre ce qui SEMBLE vrai, à l'épaisseur du trait près.",
      "Il ne peut pas distinguer un angle de $90°$ d'un angle de $89{,}8°$, ni une longueur de $5$ d'une longueur de $5{,}01$.",
      "Le calcul de coordonnées, lui, est exact : si $\\vec{AB} \\cdot \\vec{AC} = 0$, l'angle est droit, sans approximation possible. C'est pour cela qu'on dit « la figure ne prouve rien ».",
      "Le dessin suggère, le calcul démontre : c'est la différence entre voir et prouver."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "configuration", "open"],
  },
  {
    kind: "template",
    id: "premiere_gr_conf_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_configuration",
    difficulty: 5,
    theme: "neutral",
    hint: "Produit scalaire pour l'angle droit, déterminant pour l'alignement, distances pour l'isocèle.",
    tags: ["premiere", "maths", "geometrie_reperee", "configuration", "template"],
    generate: () => {
      const cas = [
        { A: [0, 0], B: [4, 0], C: [0, 3], rep: "rectangle en $A$" },
        { A: [1, 1], B: [5, 1], C: [1, 4], rep: "rectangle en $A$" },
        { A: [0, 0], B: [2, 1], C: [6, 3], rep: "aplati : les points sont alignés" },
        { A: [0, 0], B: [3, 0], C: [1.5, 4], rep: "isocèle en $C$" },
        { A: [-1, 0], B: [1, 0], C: [0, 5], rep: "isocèle en $C$" },
      ];
      const c = pickOne(cas);
      const autres = ["rectangle en $A$", "isocèle en $C$", "aplati : les points sont alignés"].filter((r) => r !== c.rep);
      return {
        text: `Quelle est la nature du triangle $ABC$ avec $A(${c.A[0]} ; ${c.A[1]})$, $B(${c.B[0]} ; ${c.B[1]})$ et $C(${c.C[0]} ; ${c.C[1]})$ ?`,
        format: "qcm",
        choices: [c.rep, ...autres, "équilatéral"],
        expected: [c.rep],
        comparator: "mcq_exact",
        explanation: exp(
          "On calcule d'abord les coordonnées des vecteurs par différence, puis on teste : produit scalaire nul pour un angle droit, déterminant nul pour un alignement, longueurs égales pour un triangle isocèle.",
          `Ici $\\vec{AB}(${c.B[0] - c.A[0]} ; ${c.B[1] - c.A[1]})$ et $\\vec{AC}(${c.C[0] - c.A[0]} ; ${c.C[1] - c.A[1]})$.`,
          `Produit scalaire : $${(c.B[0] - c.A[0]) * (c.C[0] - c.A[0]) + (c.B[1] - c.A[1]) * (c.C[1] - c.A[1])}$. ` +
            `Déterminant : $${(c.B[0] - c.A[0]) * (c.C[1] - c.A[1]) - (c.B[1] - c.A[1]) * (c.C[0] - c.A[0])}$.`,
          `Le triangle est ${c.rep}.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_gr_conf_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_configuration",
    difficulty: 5,
    theme: "neutral",
    hint: "Dis quel outil tu choisis — produit scalaire, déterminant ou distance — et pourquoi celui-là.",
    tags: ["premiere", "maths", "geometrie_reperee", "configuration", "open", "template"],
    generate: () => {
      const cas = [
        {
          but: "que le quadrilatère $ABCD$ est un parallélogramme",
          outil: "l'égalité vectorielle $\\vec{AB} = \\vec{DC}$",
          mots: ["vecteurs egaux", "vecteurs égaux", "AB = DC", "parallelogramme", "parallélogramme"],
        },
        {
          but: "que le triangle $ABC$ est rectangle en $B$",
          outil: "le produit scalaire $\\vec{BA} \\cdot \\vec{BC}$, qui doit être nul",
          mots: ["produit scalaire", "nul", "orthogonaux", "BA", "BC"],
        },
        {
          but: "que les points $A$, $B$ et $C$ sont alignés",
          outil: "le déterminant de $\\vec{AB}$ et $\\vec{AC}$, qui doit être nul",
          mots: ["determinant", "déterminant", "colineaire", "colinéaire", "nul"],
        },
        {
          but: "que le triangle $ABC$ est isocèle en $A$",
          outil: "les distances $AB$ et $AC$, qui doivent être égales",
          mots: ["distance", "longueur", "egales", "égales", "AB", "AC"],
        },
      ];
      const c = pickOne(cas);
      return {
        text: `On veut démontrer ${c.but}, à partir des coordonnées des points. Quel outil choisis-tu, et pourquoi celui-là plutôt qu'un autre ?`,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: exp(
          "Chaque propriété géométrique se traduit par un calcul précis : angle droit → produit scalaire nul ; alignement ou parallélisme → déterminant nul ; longueurs → distances ; parallélogramme → égalité de deux vecteurs.",
          `Ici on cherche à établir ${c.but}.`,
          `L'outil adapté est ${c.outil}.`,
          "Choisir le bon outil évite des calculs inutiles : la distance demande des racines carrées, le produit scalaire et le déterminant n'en demandent aucune."
        ),
      };
    },
  },

  /* ===================== GR_PARABOLE (compléments) ===================== */
  {
    kind: "fixed",
    id: "premiere_gr_par_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_parabole",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi l'axe de symétrie de la parabole $y = ax^2 + bx + c$ a pour équation $x = -\\dfrac{b}{2a}$.",
    format: "open",
    expected: ["forme canonique", "sommet", "symetrie", "symétrie", "deux racines", "moyenne"],
    comparator: "contains_keyword",
    hint: "Passe par la forme canonique, ou par la moyenne des deux racines.",
    explanation: exp(
      "Une parabole est symétrique par rapport à la verticale passant par son sommet.",
      "La forme canonique $a(x - \\alpha)^2 + \\beta$ montre que la fonction ne dépend de $x$ qu'à travers $(x - \\alpha)^2$ : deux valeurs de $x$ également écartées de $\\alpha$ donnent la même image.",
      "Le développement identifie $\\alpha = -\\dfrac{b}{2a}$. Autre lecture : quand la parabole coupe l'axe des abscisses en deux points, leur milieu est sur l'axe de symétrie, et la somme des racines vaut $-\\dfrac{b}{a}$, donc leur moyenne $-\\dfrac{b}{2a}$.",
      "L'axe passe par le sommet, d'abscisse $-\\dfrac{b}{2a}$ — c'est aussi la moyenne des deux racines quand elles existent."
    ),
    tags: ["premiere", "maths", "geometrie_reperee", "parabole", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_gr_par_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "geometrie_reperee",
    microId: "gr_parabole",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit que le sommet de la parabole $y = x^2 - 4x + 3$ a pour coordonnées $(2 ; 3)$. Explique son erreur.",
    format: "open",
    expected: ["ordonnee", "ordonnée", "remplace", "image", "-1", "constante"],
    comparator: "contains_keyword",
    hint: "Il a bien trouvé l'abscisse. Comment obtient-on l'ordonnée ?",
    explanation: exp(
      "Le sommet a pour abscisse $-\\dfrac{b}{2a}$ ; son ordonnée est l'IMAGE de cette abscisse par la fonction.",
      "L'abscisse est bien $-\\dfrac{-4}{2} = 2$ : sur ce point l'élève a raison.",
      "Mais il a repris le $3$ de l'équation, qui est la constante $c$, c'est-à-dire l'ordonnée du point d'abscisse $0$ — pas celle du sommet. Il fallait calculer $2^2 - 4 \\times 2 + 3 = -1$.",
      "Le sommet est $(2 ; -1)$ : l'ordonnée du sommet se calcule, elle ne se lit pas dans l'équation."
    ),
    canvas: parabole(1, -4, 3),
    tags: ["premiere", "maths", "geometrie_reperee", "parabole", "canvas", "piege", "open"],
  },
];
