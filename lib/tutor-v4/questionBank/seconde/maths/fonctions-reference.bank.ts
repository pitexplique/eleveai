// lib/tutor-v4/questionBank/seconde/maths/fonctions-reference.bank.ts
//
// Chapitre : Fonctions de reference (notion fonctions_reference_2de)
//
// REGLE DE DESIGN (option D) : fixed=remarquable/definition, templates dominants,
// QCM-raisonnement, short numerique (calculatrice dispo), pas d'open.
// Canvas : "fonctionGraphique" (parabole pour le carre, points pour cube/racine).
//
// microSkills (>= 10 items chacun, difficultes 1->5) :
//   reference_carre    — Fonction carre
//   reference_inverse  — Fonction inverse
//   reference_racine   — Fonction racine carree
//   reference_cube     — Fonction cube
//   reference_valeur_absolue — Fonction valeur absolue (calcul et courbe)
//   reference_comparer — Comparer deux images via une fonction de reference
//   reference_resoudre — Resoudre f(x)=k pour une fonction de reference

import type { TutorBankItemV4, CanvasFigure } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Quatre propositions garanties DISTINCTES.
 *
 * ⛔ Un distracteur peut rejoindre la bonne reponse selon le tirage — $|x-a|$
 * vaut $x-a$ des que $x > a$, et le QCM offrait alors deux fois la meme case.
 * On prend les distracteurs voulus tant qu'ils different, puis on complete avec
 * l'echelle de secours. La position, elle, est melangee plus tard par
 * questionPairBuilder.
 */
function choixDistincts(correct: string, voulus: string[], secours: string[]): string[] {
  const vus = new Set([correct]);
  const sortie = [correct];
  for (const c of [...voulus, ...secours]) {
    if (sortie.length === 4) break;
    if (!vus.has(c)) {
      vus.add(c);
      sortie.push(c);
    }
  }
  return sortie;
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return (
    `Définition : ${definition}\n\n` +
    `Méthode : ${methode}\n\n` +
    `Calcul / Observation : ${calcul}\n\n` +
    `Conclusion : ${conclusion}`
  );
}

function echantillonne(f: (x: number) => number, xmin: number, xmax: number, step: number) {
  const pts: { x: number; y: number }[] = [];
  for (let x = xmin; x <= xmax + 1e-9; x += step) {
    const xr = Math.round(x * 100) / 100;
    pts.push({ x: xr, y: Math.round(f(xr) * 100) / 100 });
  }
  return pts;
}

const paraboleCarre: CanvasFigure = {
  kind: "fonctionGraphique",
  size: { width: 300, height: 300 },
  xmin: -5,
  xmax: 5,
  ymin: -1,
  ymax: 6,
  grille: true,
  courbes: [{ id: "f", type: "quadratique", a: 1, b: 0, c: 0, couleur: "#2563eb" }],
  misesEnEvidence: [{ point: { x: 0, y: 0, label: "S", couleur: "#dc2626" } }],
};

const courbeCube: CanvasFigure = {
  kind: "fonctionGraphique",
  size: { width: 300, height: 300 },
  xmin: -2,
  xmax: 2,
  ymin: -6,
  ymax: 6,
  grille: true,
  courbes: [{ id: "f", type: "points", couleur: "#2563eb", points: echantillonne((x) => x ** 3, -1.8, 1.8, 0.3) }],
};

const courbeRacine: CanvasFigure = {
  kind: "fonctionGraphique",
  size: { width: 300, height: 300 },
  xmin: -1,
  xmax: 9,
  ymin: -1,
  ymax: 4,
  grille: true,
  courbes: [{ id: "f", type: "points", couleur: "#2563eb", points: echantillonne((x) => Math.sqrt(x), 0, 9, 0.5) }],
};

// ⭐ LA COURBE EN V DE LA VALEUR ABSOLUE, ajoutee le 04/09/2026 avec la micro
// `reference_valeur_absolue`. Elle se trace en `points` et non en `quadratique` :
// |x| n'est pas un polynome, et ses DEUX demi-droites se rejoignent en un ANGLE.
// C'est precisement ce que l'eleve doit voir — la seule fonction de reference du
// programme dont la courbe n'est pas lisse.
const courbeValeurAbsolue: CanvasFigure = {
  kind: "fonctionGraphique",
  size: { width: 300, height: 300 },
  xmin: -5,
  xmax: 5,
  ymin: -1,
  ymax: 6,
  grille: true,
  courbes: [{ id: "f", type: "points", couleur: "#2563eb", points: echantillonne((x) => Math.abs(x), -5, 5, 0.5) }],
  misesEnEvidence: [{ point: { x: 0, y: 0, label: "O", couleur: "#dc2626" } }],
};

/**
 * Une droite graduee centree sur un nombre, avec les deux points situes a une
 * distance donnee de lui.
 *
 * ⛔ LES DEUX POINTS NE SONT PAS ETIQUETES : c'est l'eleve qui lit leur
 * abscisse sur les graduations, et une etiquette lui donnerait la reponse.
 * Seul le centre porte un nom.
 *
 * ⛔ LE PAS RESTE A 1. Un repli en pas de 2 avait l'air raisonnable — il
 * desserre les nombres quand l'axe s'elargit — mais il ne gradue que les
 * nombres pairs, et l'exercice demande de LIRE l'abscisse des points marques.
 * Le tirage |x + 5| = 4 pose ses solutions en -9 et -1 : entre deux traits.
 * Ce sont donc les tirages qui se plient a la largeur, pas l'inverse, et
 * chaque generateur borne ses parametres pour tenir en onze graduations.
 */
function droiteDistance(centre: number, rayon: number): CanvasFigure {
  const min = Math.min(centre - rayon, 0) - 1;
  const haut = Math.max(centre + rayon, 0) + 1;
  return {
    kind: "number_line",
    size: { width: 320, height: 120 },
    min,
    max: haut,
    step: 1,
    points: [
      { value: centre, label: "centre", color: "#dc2626" },
      { value: centre - rayon, color: "#2563eb" },
      { value: centre + rayon, color: "#2563eb" },
    ],
    display: { showTicks: true, showValues: true, showPoints: true, showPointLabels: true, showZero: true },
  };
}

export const fonctionsReferenceBank: TutorBankItemV4[] = [
  /* ===================== REFERENCE_CARRE ===================== */

  {
    kind: "fixed",
    id: "seconde_ref_carre_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_carre",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est l'expression de la fonction carré ?",
    format: "qcm",
    choices: ["$f(x) = x^2$", "$f(x) = 2x$", "$f(x) = \\sqrt{x}$", "$f(x) = \\dfrac{1}{x}$"],
    expected: ["$f(x) = x^2$"],
    comparator: "mcq_exact",
    hint: "« Carré » → puissance $2$.",
    explanation: exp(
      "La fonction carré élève au carré.",
      "Son expression est $f(x) = x^2$.",
      "Sa courbe est une parabole.",
      "$f(x) = x^2$."
    ),
    tags: ["seconde", "maths", "fonctions", "carre", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ref_carre_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_carre",
    difficulty: 2,
    theme: "neutral",
    text: "Pour la fonction carré, combien vaut $f(-3)$ ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "$(-3)^2$.",
    explanation: exp(
      "On calcule le carré de $-3$.",
      "$(-3)^2 = 9$.",
      "Le carré d'un négatif est positif.",
      "$f(-3) = 9$."
    ),
    tags: ["seconde", "maths", "fonctions", "carre", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_ref_carre_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_carre",
    difficulty: 2,
    theme: "neutral",
    text: "Comment s'appelle la courbe de la fonction carré ?",
    format: "qcm",
    choices: ["une parabole", "une hyperbole", "une droite", "un cercle"],
    expected: ["une parabole"],
    comparator: "mcq_exact",
    canvas: paraboleCarre,
    hint: "Forme en « U ».",
    explanation: exp(
      "La fonction carré a une courbe en forme de « U ».",
      "Cette courbe a un nom précis.",
      "C'est une parabole, de sommet $(0\\,;0)$.",
      "C'est une parabole."
    ),
    tags: ["seconde", "maths", "fonctions", "carre", "canvas", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ref_carre_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_carre",
    difficulty: 3,
    theme: "neutral",
    text: "La fonction carré est décroissante sur $]-\\infty\\,;0]$ puis croissante sur $[0\\,;+\\infty[$. Elle admet donc :",
    format: "qcm",
    choices: ["un minimum en $0$", "un maximum en $0$", "aucun extremum", "deux minimums"],
    expected: ["un minimum en $0$"],
    comparator: "mcq_exact",
    hint: "Décroissante puis croissante → creux.",
    explanation: exp(
      "Décroissante puis croissante signale un creux.",
      "Le sommet $(0\\,;0)$ est le point le plus bas.",
      "La fonction admet un minimum en $0$.",
      "Un minimum en $0$."
    ),
    tags: ["seconde", "maths", "fonctions", "carre", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ref_carre_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_carre",
    difficulty: 2,
    theme: "neutral",
    text: "Pour la fonction carré, combien vaut $f(5)$ ?",
    format: "short",
    expected: ["25"],
    comparator: "number_equal",
    hint: "$5^2$.",
    explanation: exp(
      "On calcule $5^2$.",
      "$5^2 = 25$.",
      "$f(5) = 25$.",
      "$f(5) = 25$."
    ),
    tags: ["seconde", "maths", "fonctions", "carre", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_ref_carre_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_carre",
    difficulty: 3,
    theme: "neutral",
    text: "La fonction carré $f(x) = x^2$ est :",
    format: "qcm",
    choices: ["paire", "impaire", "ni paire ni impaire", "croissante sur $\\mathbb{R}$"],
    expected: ["paire"],
    comparator: "mcq_exact",
    hint: "$(-x)^2 = x^2$.",
    explanation: exp(
      "On teste $f(-x)$.",
      "$f(-x) = (-x)^2 = x^2 = f(x)$.",
      "Donc $f$ est paire (courbe symétrique par rapport à l'axe des ordonnées).",
      "La fonction carré est paire."
    ),
    tags: ["seconde", "maths", "fonctions", "carre", "raisonnement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_ref_carre_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_carre",
    difficulty: 2,
    theme: "neutral",
    hint: "On élève au carré.",
    tags: ["seconde", "maths", "fonctions", "carre", "template"],
    generate: () => {
      const x = randomInt(-9, 9);
      return {
        text: `Pour la fonction carré, combien vaut $f(${x})$ ?`,
        format: "short",
        expected: [String(x * x)],
        comparator: "number_equal",
        explanation: exp(
          "On calcule le carré de la valeur.",
          `$(${x})^2 = ${x * x}$.`,
          `Le carré est positif.`,
          `$f(${x}) = ${x * x}$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_ref_carre_fixed_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_carre",
    difficulty: 3,
    theme: "neutral",
    text: "Pour la fonction carré, $f(2)$ et $f(-2)$ sont :",
    format: "qcm",
    choices: ["égaux (tous deux $4$)", "opposés", "différents", "nuls"],
    expected: ["égaux (tous deux $4$)"],
    comparator: "mcq_exact",
    hint: "$2^2 = (-2)^2$.",
    explanation: exp(
      "La fonction carré est paire : $f(-x) = f(x)$.",
      "$f(2) = 4$ et $f(-2) = 4$.",
      "Ils sont égaux.",
      "Égaux, tous deux $4$."
    ),
    tags: ["seconde", "maths", "fonctions", "carre", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ref_carre_fixed_8",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_carre",
    difficulty: 2,
    theme: "neutral",
    text: "La fonction carré prend-elle des valeurs négatives ?",
    format: "qcm",
    choices: ["Non, $x^2 \\ge 0$ toujours", "Oui, pour $x < 0$", "Oui, parfois", "Oui, pour $x$ grand"],
    expected: ["Non, $x^2 \\ge 0$ toujours"],
    comparator: "mcq_exact",
    hint: "Un carré est toujours positif ou nul.",
    explanation: exp(
      "Le carré d'un réel est toujours positif ou nul.",
      "Donc $f(x) = x^2 \\ge 0$ pour tout $x$.",
      "La fonction carré ne prend jamais de valeur négative.",
      "Non, $x^2 \\ge 0$ toujours."
    ),
    tags: ["seconde", "maths", "fonctions", "carre", "raisonnement", "qcm"],
  },

  /* ===================== REFERENCE_INVERSE ===================== */

  {
    kind: "fixed",
    id: "seconde_ref_inv_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_inverse",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est l'expression de la fonction inverse ?",
    format: "qcm",
    choices: ["$f(x) = \\dfrac{1}{x}$", "$f(x) = -x$", "$f(x) = x^2$", "$f(x) = \\sqrt{x}$"],
    expected: ["$f(x) = \\dfrac{1}{x}$"],
    comparator: "mcq_exact",
    hint: "« Inverse » → $\\dfrac{1}{x}$.",
    explanation: exp(
      "La fonction inverse associe à $x$ son inverse.",
      "Son expression est $f(x) = \\dfrac{1}{x}$.",
      "Attention : ne pas confondre inverse ($\\dfrac{1}{x}$) et opposé ($-x$).",
      "$f(x) = \\dfrac{1}{x}$."
    ),
    tags: ["seconde", "maths", "fonctions", "inverse", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ref_inv_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_inverse",
    difficulty: 2,
    theme: "neutral",
    text: "La fonction inverse est définie pour tout $x$ sauf :",
    format: "qcm",
    choices: ["$x = 0$", "$x = 1$", "$x = -1$", "$x < 0$"],
    expected: ["$x = 0$"],
    comparator: "mcq_exact",
    hint: "On ne peut pas diviser par $0$.",
    explanation: exp(
      "$\\dfrac{1}{x}$ n'a pas de sens si $x = 0$.",
      "La division par zéro est impossible.",
      "La fonction inverse est définie sur $\\mathbb{R}$ privé de $0$.",
      "Sauf $x = 0$."
    ),
    tags: ["seconde", "maths", "fonctions", "inverse", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ref_inv_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_inverse",
    difficulty: 2,
    theme: "neutral",
    text: "Pour la fonction inverse, combien vaut $f(4)$ ?",
    format: "qcm",
    choices: ["$\\dfrac{1}{4}$", "$4$", "$-4$", "$2$"],
    expected: ["$\\dfrac{1}{4}$"],
    comparator: "mcq_exact",
    hint: "$f(4) = \\dfrac{1}{4}$.",
    explanation: exp(
      "On calcule l'inverse de $4$.",
      "$f(4) = \\dfrac{1}{4}$.",
      "C'est un nombre entre $0$ et $1$.",
      "$f(4) = \\dfrac{1}{4}$."
    ),
    tags: ["seconde", "maths", "fonctions", "inverse", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ref_inv_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_inverse",
    difficulty: 3,
    theme: "neutral",
    text: "Comment s'appelle la courbe de la fonction inverse ?",
    format: "qcm",
    choices: ["une hyperbole", "une parabole", "une droite", "un cercle"],
    expected: ["une hyperbole"],
    comparator: "mcq_exact",
    hint: "Deux branches symétriques par rapport à l'origine.",
    explanation: exp(
      "La courbe de $\\dfrac{1}{x}$ a deux branches.",
      "Cette courbe a un nom précis.",
      "C'est une hyperbole.",
      "C'est une hyperbole."
    ),
    tags: ["seconde", "maths", "fonctions", "inverse", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ref_inv_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_inverse",
    difficulty: 3,
    theme: "neutral",
    text: "Pour la fonction inverse, combien vaut $f(0{,}5)$ ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "$\\dfrac{1}{0{,}5} = 2$.",
    explanation: exp(
      "On calcule l'inverse de $0{,}5$.",
      "$\\dfrac{1}{0{,}5} = \\dfrac{1}{\\frac{1}{2}} = 2$.",
      "L'inverse d'un nombre entre $0$ et $1$ est grand.",
      "$f(0{,}5) = 2$."
    ),
    tags: ["seconde", "maths", "fonctions", "inverse", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_ref_inv_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_inverse",
    difficulty: 4,
    theme: "neutral",
    text: "La fonction inverse $f(x) = \\dfrac{1}{x}$ est :",
    format: "qcm",
    choices: ["impaire", "paire", "ni paire ni impaire", "croissante sur $\\mathbb{R}$"],
    expected: ["impaire"],
    comparator: "mcq_exact",
    hint: "$\\dfrac{1}{-x} = -\\dfrac{1}{x}$.",
    explanation: exp(
      "On teste $f(-x)$.",
      "$f(-x) = \\dfrac{1}{-x} = -\\dfrac{1}{x} = -f(x)$.",
      "Donc $f$ est impaire (symétrie par rapport à l'origine).",
      "La fonction inverse est impaire."
    ),
    tags: ["seconde", "maths", "fonctions", "inverse", "raisonnement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_ref_inv_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_inverse",
    difficulty: 2,
    theme: "neutral",
    hint: "$f(x) = \\dfrac{1}{x}$.",
    tags: ["seconde", "maths", "fonctions", "inverse", "template"],
    generate: () => {
      const x = randomInt(2, 9);
      const correct = `$\\dfrac{1}{${x}}$`;
      const choices = [correct, `$${x}$`, `$-${x}$`, `$\\dfrac{${x}}{1}$`];
      return {
        text: `Pour la fonction inverse, combien vaut $f(${x})$ ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On prend l'inverse de la valeur.",
          `$f(${x}) = \\dfrac{1}{${x}}$.`,
          "C'est l'inverse, pas l'opposé.",
          `$f(${x}) = \\dfrac{1}{${x}}$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_ref_inv_fixed_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_inverse",
    difficulty: 4,
    theme: "neutral",
    text: "Sur l'intervalle $]0\\,;+\\infty[$, la fonction inverse est :",
    format: "qcm",
    choices: ["décroissante", "croissante", "constante", "positive puis négative"],
    expected: ["décroissante"],
    comparator: "mcq_exact",
    hint: "Plus $x$ grandit, plus $\\dfrac{1}{x}$ est petit.",
    explanation: exp(
      "On observe l'évolution de $\\dfrac{1}{x}$ pour $x > 0$.",
      "Quand $x$ augmente, $\\dfrac{1}{x}$ diminue (ex. $1$, $0{,}5$, $0{,}25$).",
      "Donc la fonction est décroissante sur $]0\\,;+\\infty[$.",
      "Elle est décroissante."
    ),
    tags: ["seconde", "maths", "fonctions", "inverse", "raisonnement", "qcm"],
  },

  /* ===================== REFERENCE_RACINE ===================== */

  {
    kind: "fixed",
    id: "seconde_ref_rac_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_racine",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est l'expression de la fonction racine carrée ?",
    format: "qcm",
    choices: ["$f(x) = \\sqrt{x}$", "$f(x) = x^2$", "$f(x) = \\dfrac{1}{x}$", "$f(x) = 2x$"],
    expected: ["$f(x) = \\sqrt{x}$"],
    comparator: "mcq_exact",
    hint: "Symbole racine.",
    explanation: exp(
      "La fonction racine carrée associe à $x$ sa racine carrée.",
      "Son expression est $f(x) = \\sqrt{x}$.",
      "Elle est définie pour $x \\ge 0$.",
      "$f(x) = \\sqrt{x}$."
    ),
    tags: ["seconde", "maths", "fonctions", "racine", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ref_rac_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_racine",
    difficulty: 2,
    theme: "neutral",
    text: "La fonction racine carrée est définie pour :",
    format: "qcm",
    choices: ["$x \\ge 0$", "$x \\le 0$", "tout $x$", "$x \\neq 0$"],
    expected: ["$x \\ge 0$"],
    comparator: "mcq_exact",
    hint: "On ne prend pas la racine d'un négatif.",
    explanation: exp(
      "La racine carrée n'existe que pour les nombres positifs ou nuls.",
      "Donc $f(x) = \\sqrt{x}$ exige $x \\ge 0$.",
      "Le domaine est $[0\\,;+\\infty[$.",
      "Définie pour $x \\ge 0$."
    ),
    tags: ["seconde", "maths", "fonctions", "racine", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ref_rac_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_racine",
    difficulty: 2,
    theme: "neutral",
    text: "Pour la fonction racine carrée, combien vaut $f(9)$ ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "$\\sqrt{9} = 3$.",
    explanation: exp(
      "On calcule $\\sqrt{9}$.",
      "$\\sqrt{9} = 3$ car $3^2 = 9$.",
      "$f(9) = 3$.",
      "$f(9) = 3$."
    ),
    tags: ["seconde", "maths", "fonctions", "racine", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_ref_rac_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_racine",
    difficulty: 3,
    theme: "neutral",
    text: "Sur son domaine $[0\\,;+\\infty[$, la fonction racine carrée est :",
    format: "qcm",
    choices: ["croissante", "décroissante", "constante", "décroissante puis croissante"],
    expected: ["croissante"],
    comparator: "mcq_exact",
    canvas: courbeRacine,
    hint: "Plus $x$ grandit, plus $\\sqrt{x}$ grandit.",
    explanation: exp(
      "On observe l'évolution de $\\sqrt{x}$.",
      "Quand $x$ augmente, $\\sqrt{x}$ augmente aussi (ex. $\\sqrt{1}=1$, $\\sqrt{4}=2$).",
      "Donc la fonction est croissante.",
      "Elle est croissante."
    ),
    tags: ["seconde", "maths", "fonctions", "racine", "canvas", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ref_rac_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_racine",
    difficulty: 2,
    theme: "neutral",
    text: "Pour la fonction racine carrée, combien vaut $f(0)$ ?",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "$\\sqrt{0} = 0$.",
    explanation: exp(
      "On calcule $\\sqrt{0}$.",
      "$\\sqrt{0} = 0$.",
      "$f(0) = 0$ : la courbe part de l'origine.",
      "$f(0) = 0$."
    ),
    tags: ["seconde", "maths", "fonctions", "racine", "short"],
  },

  {
    kind: "template",
    id: "seconde_ref_rac_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_racine",
    difficulty: 2,
    theme: "neutral",
    hint: "On cherche la racine carrée.",
    tags: ["seconde", "maths", "fonctions", "racine", "template"],
    generate: () => {
      const k = randomInt(2, 12);
      return {
        text: `Pour la fonction racine carrée, combien vaut $f(${k * k})$ ?`,
        format: "short",
        expected: [String(k)],
        comparator: "number_equal",
        explanation: exp(
          "On calcule la racine carrée du nombre.",
          `$\\sqrt{${k * k}} = ${k}$ car $${k}^2 = ${k * k}$.`,
          `$f(${k * k}) = ${k}$.`,
          `$f(${k * k}) = ${k}$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_ref_rac_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_racine",
    difficulty: 3,
    theme: "neutral",
    text: "Pourquoi $f(-4) = \\sqrt{-4}$ n'existe-t-elle pas ?",
    format: "qcm",
    choices: [
      "Car la racine carrée d'un nombre négatif n'existe pas (dans $\\mathbb{R}$)",
      "Car $-4$ est pair",
      "Car $\\sqrt{-4} = -2$",
      "Car $-4 > 0$",
    ],
    expected: ["Car la racine carrée d'un nombre négatif n'existe pas (dans $\\mathbb{R}$)"],
    comparator: "mcq_exact",
    hint: "Domaine : $x \\ge 0$.",
    explanation: exp(
      "La racine carrée n'est définie que pour les nombres positifs ou nuls.",
      "$-4 < 0$ n'est pas dans le domaine.",
      "Donc $\\sqrt{-4}$ n'existe pas dans $\\mathbb{R}$.",
      "Car la racine d'un négatif n'existe pas."
    ),
    tags: ["seconde", "maths", "fonctions", "racine", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ref_rac_fixed_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_racine",
    difficulty: 2,
    theme: "neutral",
    text: "Pour la fonction racine carrée, combien vaut $f(1)$ ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "$\\sqrt{1} = 1$.",
    explanation: exp(
      "On calcule $\\sqrt{1}$.",
      "$\\sqrt{1} = 1$.",
      "$f(1) = 1$.",
      "$f(1) = 1$."
    ),
    tags: ["seconde", "maths", "fonctions", "racine", "short"],
  },

  /* ===================== REFERENCE_CUBE ===================== */

  {
    kind: "fixed",
    id: "seconde_ref_cube_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_cube",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est l'expression de la fonction cube ?",
    format: "qcm",
    choices: ["$f(x) = x^3$", "$f(x) = x^2$", "$f(x) = 3x$", "$f(x) = \\sqrt[3]{x}$"],
    expected: ["$f(x) = x^3$"],
    comparator: "mcq_exact",
    hint: "« Cube » → puissance $3$.",
    explanation: exp(
      "La fonction cube élève à la puissance $3$.",
      "Son expression est $f(x) = x^3$.",
      "Elle est définie sur tout $\\mathbb{R}$.",
      "$f(x) = x^3$."
    ),
    tags: ["seconde", "maths", "fonctions", "cube", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ref_cube_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_cube",
    difficulty: 2,
    theme: "neutral",
    text: "Pour la fonction cube, combien vaut $f(2)$ ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "$2^3$.",
    explanation: exp(
      "On calcule $2^3$.",
      "$2^3 = 2 \\times 2 \\times 2 = 8$.",
      "$f(2) = 8$.",
      "$f(2) = 8$."
    ),
    tags: ["seconde", "maths", "fonctions", "cube", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_ref_cube_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_cube",
    difficulty: 3,
    theme: "neutral",
    text: "Pour la fonction cube, combien vaut $f(-2)$ ?",
    format: "short",
    expected: ["-8"],
    comparator: "number_equal",
    canvas: courbeCube,
    hint: "$(-2)^3$ : exposant impair → signe conservé.",
    explanation: exp(
      "On calcule $(-2)^3$.",
      "$(-2)^3 = -8$ (exposant impair → résultat négatif).",
      "$f(-2) = -8$.",
      "$f(-2) = -8$."
    ),
    tags: ["seconde", "maths", "fonctions", "cube", "canvas", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_ref_cube_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_cube",
    difficulty: 3,
    theme: "neutral",
    text: "La fonction cube $f(x) = x^3$ est :",
    format: "qcm",
    choices: ["impaire", "paire", "ni paire ni impaire", "définie seulement pour $x \\ge 0$"],
    expected: ["impaire"],
    comparator: "mcq_exact",
    hint: "$(-x)^3 = -x^3$.",
    explanation: exp(
      "On teste $f(-x)$.",
      "$f(-x) = (-x)^3 = -x^3 = -f(x)$.",
      "Donc $f$ est impaire (symétrie par rapport à l'origine).",
      "La fonction cube est impaire."
    ),
    tags: ["seconde", "maths", "fonctions", "cube", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ref_cube_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_cube",
    difficulty: 4,
    theme: "neutral",
    text: "Sur $\\mathbb{R}$, la fonction cube est :",
    format: "qcm",
    choices: ["croissante", "décroissante", "décroissante puis croissante", "constante"],
    expected: ["croissante"],
    comparator: "mcq_exact",
    canvas: courbeCube,
    hint: "Quand $x$ augmente, $x^3$ augmente.",
    explanation: exp(
      "On observe l'évolution de $x^3$.",
      "Quand $x$ augmente, $x^3$ augmente toujours (ex. $-8, -1, 0, 1, 8$).",
      "Donc la fonction cube est croissante sur $\\mathbb{R}$.",
      "Elle est croissante sur $\\mathbb{R}$."
    ),
    tags: ["seconde", "maths", "fonctions", "cube", "canvas", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_ref_cube_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_cube",
    difficulty: 2,
    theme: "neutral",
    hint: "On élève au cube (signe conservé).",
    tags: ["seconde", "maths", "fonctions", "cube", "template"],
    generate: () => {
      const x = randomInt(-4, 4);
      return {
        text: `Pour la fonction cube, combien vaut $f(${x})$ ?`,
        format: "short",
        expected: [String(x ** 3)],
        comparator: "number_equal",
        explanation: exp(
          "On calcule le cube de la valeur.",
          `$(${x})^3 = ${x ** 3}$.`,
          "Le cube conserve le signe de $x$.",
          `$f(${x}) = ${x ** 3}$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_ref_cube_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_cube",
    difficulty: 3,
    theme: "neutral",
    text: "Contrairement à la fonction carré, la fonction cube prend :",
    format: "qcm",
    choices: [
      "des valeurs négatives (pour $x < 0$)",
      "uniquement des valeurs positives",
      "uniquement la valeur $0$",
      "des valeurs constantes",
    ],
    expected: ["des valeurs négatives (pour $x < 0$)"],
    comparator: "mcq_exact",
    hint: "$(-2)^3 = -8 < 0$.",
    explanation: exp(
      "Le cube conserve le signe, contrairement au carré.",
      "Pour $x < 0$, $x^3 < 0$ (ex. $(-2)^3 = -8$).",
      "La fonction cube prend donc des valeurs négatives.",
      "Des valeurs négatives pour $x < 0$."
    ),
    tags: ["seconde", "maths", "fonctions", "cube", "raisonnement", "qcm"],
  },

  /* ===================== REFERENCE_COMPARER ===================== */

  {
    kind: "fixed",
    id: "seconde_ref_comp_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Pour la fonction carré, comparer $f(2)$ et $f(3)$ :",
    format: "qcm",
    choices: ["$f(2) < f(3)$", "$f(2) > f(3)$", "$f(2) = f(3)$", "On ne peut pas comparer"],
    expected: ["$f(2) < f(3)$"],
    comparator: "mcq_exact",
    hint: "Sur $[0\\,;+\\infty[$, le carré est croissant.",
    explanation: exp(
      "Sur $[0\\,;+\\infty[$, la fonction carré est croissante.",
      "Comme $2 < 3$, les images sont rangées dans le même ordre.",
      "$f(2) = 4 < 9 = f(3)$.",
      "$f(2) < f(3)$."
    ),
    tags: ["seconde", "maths", "fonctions", "comparer", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ref_comp_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_comparer",
    difficulty: 4,
    theme: "neutral",
    text: "Pour la fonction inverse (sur $]0\\,;+\\infty[$), comparer $f(2)$ et $f(3)$ :",
    format: "qcm",
    choices: ["$f(2) > f(3)$", "$f(2) < f(3)$", "$f(2) = f(3)$", "On ne peut pas comparer"],
    expected: ["$f(2) > f(3)$"],
    comparator: "mcq_exact",
    hint: "L'inverse est décroissante : l'ordre s'inverse.",
    explanation: exp(
      "Sur $]0\\,;+\\infty[$, la fonction inverse est décroissante.",
      "Comme $2 < 3$, l'ordre des images s'inverse.",
      "$f(2) = \\dfrac{1}{2} > \\dfrac{1}{3} = f(3)$.",
      "$f(2) > f(3)$."
    ),
    tags: ["seconde", "maths", "fonctions", "comparer", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ref_comp_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Pour la fonction racine carrée, comparer $f(4)$ et $f(9)$ :",
    format: "qcm",
    choices: ["$f(4) < f(9)$", "$f(4) > f(9)$", "$f(4) = f(9)$", "On ne peut pas comparer"],
    expected: ["$f(4) < f(9)$"],
    comparator: "mcq_exact",
    hint: "La racine carrée est croissante.",
    explanation: exp(
      "La fonction racine carrée est croissante sur $[0\\,;+\\infty[$.",
      "Comme $4 < 9$, l'ordre est conservé.",
      "$\\sqrt{4} = 2 < 3 = \\sqrt{9}$.",
      "$f(4) < f(9)$."
    ),
    tags: ["seconde", "maths", "fonctions", "comparer", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ref_comp_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_comparer",
    difficulty: 4,
    theme: "neutral",
    text: "Pour la fonction carré, comparer $f(-5)$ et $f(2)$ :",
    format: "qcm",
    choices: ["$f(-5) > f(2)$", "$f(-5) < f(2)$", "$f(-5) = f(2)$", "On ne peut pas comparer"],
    expected: ["$f(-5) > f(2)$"],
    comparator: "mcq_exact",
    hint: "Calcule : $(-5)^2 = 25$ et $2^2 = 4$.",
    explanation: exp(
      "Attention : avec un négatif, on calcule directement les images.",
      "$f(-5) = (-5)^2 = 25$ et $f(2) = 2^2 = 4$.",
      "$25 > 4$.",
      "$f(-5) > f(2)$."
    ),
    tags: ["seconde", "maths", "fonctions", "comparer", "raisonnement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_ref_comp_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Carré croissant sur les positifs : l'ordre est conservé.",
    tags: ["seconde", "maths", "fonctions", "comparer", "template"],
    generate: () => {
      const p = randomInt(1, 5);
      const q = p + randomInt(1, 4);
      const correct = `$f(${p}) < f(${q})$`;
      const choices = [correct, `$f(${p}) > f(${q})$`, `$f(${p}) = f(${q})$`, "On ne peut pas comparer"];
      return {
        text: `Pour la fonction carré, comparer $f(${p})$ et $f(${q})$ :`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Sur les positifs, la fonction carré est croissante.",
          `Comme $${p} < ${q}$, l'ordre est conservé.`,
          `$f(${p}) = ${p * p} < ${q * q} = f(${q})$.`,
          `$f(${p}) < f(${q})$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_ref_comp_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_comparer",
    difficulty: 4,
    theme: "neutral",
    hint: "Inverse décroissante : l'ordre s'inverse.",
    tags: ["seconde", "maths", "fonctions", "comparer", "template"],
    generate: () => {
      const p = randomInt(2, 5);
      const q = p + randomInt(1, 4);
      const correct = `$f(${p}) > f(${q})$`;
      const choices = [correct, `$f(${p}) < f(${q})$`, `$f(${p}) = f(${q})$`, "On ne peut pas comparer"];
      return {
        text: `Pour la fonction inverse (sur $]0\\,;+\\infty[$), comparer $f(${p})$ et $f(${q})$ :`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Sur $]0\\,;+\\infty[$, la fonction inverse est décroissante.",
          `Comme $${p} < ${q}$, l'ordre des images s'inverse.`,
          `$\\dfrac{1}{${p}} > \\dfrac{1}{${q}}$.`,
          `$f(${p}) > f(${q})$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_ref_comp_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Pour comparer deux images sans calculer, on utilise surtout :",
    format: "qcm",
    choices: [
      "le sens de variation de la fonction",
      "l'ordonnée à l'origine",
      "le périmètre",
      "la parité uniquement",
    ],
    expected: ["le sens de variation de la fonction"],
    comparator: "mcq_exact",
    hint: "Croissante : l'ordre est conservé ; décroissante : inversé.",
    explanation: exp(
      "Le sens de variation relie l'ordre des $x$ à l'ordre des images.",
      "Croissante : ordre conservé ; décroissante : ordre inversé.",
      "C'est l'outil pour comparer sans calculer.",
      "On utilise le sens de variation."
    ),
    tags: ["seconde", "maths", "fonctions", "comparer", "raisonnement", "qcm"],
  },

  /* ===================== REFERENCE_RESOUDRE ===================== */

  {
    kind: "fixed",
    id: "seconde_ref_res_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_resoudre",
    difficulty: 3,
    theme: "neutral",
    text: "Combien l'équation $x^2 = 9$ a-t-elle de solutions ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Pense à $3$ et $-3$.",
    explanation: exp(
      "On résout $x^2 = 9$.",
      "Deux nombres ont pour carré $9$ : $3$ et $-3$.",
      "Il y a donc deux solutions.",
      "$x^2 = 9$ a $2$ solutions."
    ),
    tags: ["seconde", "maths", "fonctions", "resoudre", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_ref_res_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_resoudre",
    difficulty: 3,
    theme: "neutral",
    text: "Quelles sont les solutions de $x^2 = 16$ ?",
    format: "qcm",
    choices: ["$x = 4$ ou $x = -4$", "$x = 4$", "$x = 8$ ou $x = -8$", "$x = 256$"],
    expected: ["$x = 4$ ou $x = -4$"],
    comparator: "mcq_exact",
    hint: "$4^2 = 16$ et $(-4)^2 = 16$.",
    explanation: exp(
      "On cherche les nombres dont le carré vaut $16$.",
      "$4^2 = 16$ et $(-4)^2 = 16$.",
      "Les solutions sont $4$ et $-4$.",
      "$x = 4$ ou $x = -4$."
    ),
    tags: ["seconde", "maths", "fonctions", "resoudre", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ref_res_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_resoudre",
    difficulty: 3,
    theme: "neutral",
    text: "Résous $\\sqrt{x} = 3$. Que vaut $x$ ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "On élève au carré : $x = 3^2$.",
    explanation: exp(
      "On élève les deux membres au carré.",
      "$\\sqrt{x} = 3 \\Rightarrow x = 3^2$.",
      "$x = 9$.",
      "$x = 9$."
    ),
    tags: ["seconde", "maths", "fonctions", "resoudre", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_ref_res_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_resoudre",
    difficulty: 3,
    theme: "neutral",
    text: "Résous $x^3 = 8$. Que vaut $x$ ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Quel nombre au cube donne $8$ ?",
    explanation: exp(
      "On cherche le nombre dont le cube vaut $8$.",
      "$2^3 = 8$.",
      "Comme le cube est croissant, la solution est unique.",
      "$x = 2$."
    ),
    tags: ["seconde", "maths", "fonctions", "resoudre", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_ref_res_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_resoudre",
    difficulty: 4,
    theme: "neutral",
    text: "Combien l'équation $x^2 = -4$ a-t-elle de solutions ?",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "Un carré peut-il être négatif ?",
    explanation: exp(
      "On résout $x^2 = -4$.",
      "Or un carré est toujours positif ou nul.",
      "Aucun nombre n'a un carré négatif.",
      "Il y a $0$ solution."
    ),
    tags: ["seconde", "maths", "fonctions", "resoudre", "raisonnement", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_ref_res_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_resoudre",
    difficulty: 4,
    theme: "neutral",
    text: "Résous $\\dfrac{1}{x} = 2$. Que vaut $x$ ?",
    format: "short",
    expected: ["0,5", "0.5"],
    comparator: "number_equal",
    hint: "$x = \\dfrac{1}{2}$.",
    explanation: exp(
      "On résout $\\dfrac{1}{x} = 2$.",
      "En inversant : $x = \\dfrac{1}{2}$.",
      "$= 0{,}5$.",
      "$x = 0{,}5$."
    ),
    tags: ["seconde", "maths", "fonctions", "resoudre", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_ref_res_fixed_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_resoudre",
    difficulty: 4,
    theme: "neutral",
    text: "Combien l'équation $x^3 = -27$ a-t-elle de solutions, et laquelle ?",
    format: "qcm",
    choices: ["Une seule : $x = -3$", "Deux : $3$ et $-3$", "Aucune", "Une seule : $x = 3$"],
    expected: ["Une seule : $x = -3$"],
    comparator: "mcq_exact",
    hint: "$(-3)^3 = -27$ ; le cube est croissant (une seule solution).",
    explanation: exp(
      "La fonction cube est croissante : chaque valeur a un seul antécédent.",
      "$(-3)^3 = -27$.",
      "Il y a donc une seule solution : $x = -3$.",
      "Une seule solution : $x = -3$."
    ),
    tags: ["seconde", "maths", "fonctions", "resoudre", "raisonnement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_ref_res_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_resoudre",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux solutions opposées pour $x^2 = k$ (k>0).",
    tags: ["seconde", "maths", "fonctions", "resoudre", "template"],
    generate: () => {
      const k = randomInt(2, 10);
      const correct = `$x = ${k}$ ou $x = ${-k}$`;
      const choices = [correct, `$x = ${k}$`, `$x = ${k * k}$`, `$x = ${-k}$`];
      return {
        text: `Quelles sont les solutions de $x^2 = ${k * k}$ ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On cherche les nombres dont le carré vaut le nombre donné.",
          `$${k}^2 = ${k * k}$ et $(-${k})^2 = ${k * k}$.`,
          `Les solutions sont $${k}$ et $-${k}$.`,
          `$x = ${k}$ ou $x = ${-k}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_ref_res_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_resoudre",
    difficulty: 3,
    theme: "neutral",
    hint: "$\\sqrt{x} = k \\Rightarrow x = k^2$.",
    tags: ["seconde", "maths", "fonctions", "resoudre", "template"],
    generate: () => {
      const k = randomInt(2, 9);
      return {
        text: `Résous $\\sqrt{x} = ${k}$. Que vaut $x$ ?`,
        format: "short",
        expected: [String(k * k)],
        comparator: "number_equal",
        explanation: exp(
          "On élève les deux membres au carré.",
          `$\\sqrt{x} = ${k} \\Rightarrow x = ${k}^2$.`,
          `$x = ${k * k}$.`,
          `$x = ${k * k}$.`
        ),
      };
    },
  },

  /* ===================== REFERENCE_VALEUR_ABSOLUE ===================== */

  {
    kind: "fixed",
    id: "seconde_ref_abs_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_valeur_absolue",
    difficulty: 1,
    theme: "neutral",
    text: "Que vaut $|-7|$ ?",
    format: "qcm",
    choices: ["$7$", "$-7$", "$0$", "$49$"],
    expected: ["$7$"],
    comparator: "mcq_exact",
    hint: "C'est une distance à zéro : une distance n'est jamais négative.",
    explanation: exp(
      "La valeur absolue d'un nombre est sa distance à zéro.",
      "On retire simplement le signe.",
      "$-7$ est à sept unités de zéro.",
      "$|-7| = 7$."
    ),
    tags: ["seconde", "maths", "fonctions", "valeur-absolue", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ref_abs_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_valeur_absolue",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est l'allure de la courbe de $f(x) = |x|$ ?",
    format: "qcm",
    choices: [
      "deux demi-droites formant un V, avec un angle en $O$",
      "une parabole tournée vers le haut",
      "une droite passant par l'origine",
      "une hyperbole en deux morceaux",
    ],
    expected: ["deux demi-droites formant un V, avec un angle en $O$"],
    comparator: "mcq_exact",
    canvas: courbeValeurAbsolue,
    hint: "Regarde ce qui se passe de part et d'autre de zéro.",
    explanation: exp(
      "Pour $x \\geqslant 0$, $|x| = x$ ; pour $x < 0$, $|x| = -x$.",
      "Chaque morceau est donc une demi-droite.",
      "Elles se rejoignent en $O$ en formant un angle, et non une courbure.",
      "La courbe est un V — c'est la seule fonction de référence du programme qui n'est pas lisse."
    ),
    tags: ["seconde", "maths", "fonctions", "valeur-absolue", "courbe", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ref_abs_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_valeur_absolue",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est le signe de la fonction $f(x) = |x|$ sur $\\mathbb{R}$ ?",
    format: "qcm",
    choices: [
      "toujours positive ou nulle",
      "toujours strictement positive",
      "positive puis négative",
      "négative sur les négatifs",
    ],
    expected: ["toujours positive ou nulle"],
    comparator: "mcq_exact",
    hint: "Une distance peut-elle être négative ? peut-elle être nulle ?",
    explanation: exp(
      "La valeur absolue est une distance à zéro.",
      "Une distance n'est jamais négative, mais elle peut être nulle.",
      "Elle s'annule exactement en $x = 0$.",
      "$f$ est positive ou nulle sur $\\mathbb{R}$, et ne s'annule qu'en zéro."
    ),
    tags: ["seconde", "maths", "fonctions", "valeur-absolue", "signe", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_ref_abs_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_valeur_absolue",
    difficulty: 1,
    theme: "neutral",
    hint: "On enlève le signe, c'est tout.",
    tags: ["seconde", "maths", "fonctions", "valeur-absolue", "template"],
    generate: () => {
      const n = randomInt(2, 40);
      const negatif = Math.random() < 0.5;
      const arg = negatif ? -n : n;
      return {
        text: `Calculer $|${arg}|$.`,
        format: "qcm",
        choices: [`$${n}$`, `$${-n}$`, "$0$", `$${n * n}$`],
        expected: [`$${n}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "La valeur absolue est la distance du nombre à zéro.",
          "On supprime le signe s'il y en a un.",
          `$${arg}$ est à ${n} unités de zéro.`,
          `$|${arg}| = ${n}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_ref_abs_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_valeur_absolue",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule d'abord ce qu'il y a DANS les barres.",
    tags: ["seconde", "maths", "fonctions", "valeur-absolue", "template"],
    generate: () => {
      const a = randomInt(2, 12);
      const b = randomInt(a + 1, a + 15);
      const val = Math.abs(a - b);
      return {
        text: `Calculer $|${a} - ${b}|$.`,
        format: "qcm",
        choices: [`$${val}$`, `$${-val}$`, `$${a + b}$`, "$0$"],
        expected: [`$${val}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Les barres agissent sur le résultat du calcul qu'elles contiennent.",
          "On effectue donc la soustraction en premier.",
          `$${a} - ${b} = ${a - b}$, dont la valeur absolue vaut ${val}.`,
          `$|${a} - ${b}| = ${val}$ — c'est aussi la DISTANCE entre ${a} et ${b}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_ref_abs_tpl_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_valeur_absolue",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux nombres ont la même distance à zéro.",
    tags: ["seconde", "maths", "fonctions", "valeur-absolue", "equation", "template"],
    generate: () => {
      const k = randomInt(2, 15);
      return {
        text: `Combien l'équation $|x| = ${k}$ a-t-elle de solutions ?`,
        format: "qcm",
        choices: ["deux", "une", "aucune", "une infinité"],
        expected: ["deux"],
        comparator: "mcq_exact",
        explanation: exp(
          "Résoudre $|x| = k$, c'est chercher les nombres situés à la distance $k$ de zéro.",
          "On en trouve un de chaque côté.",
          `Ici $x = ${k}$ et $x = -${k}$.`,
          `L'équation a DEUX solutions, $${k}$ et $-${k}$ — la courbe en V coupe la droite $y = ${k}$ deux fois.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_ref_abs_tpl_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_valeur_absolue",
    difficulty: 4,
    theme: "neutral",
    hint: "Une distance peut-elle valoir un nombre négatif ?",
    tags: ["seconde", "maths", "fonctions", "valeur-absolue", "piege", "template"],
    generate: () => {
      const k = randomInt(2, 12);
      return {
        text: `Combien l'équation $|x| = -${k}$ a-t-elle de solutions ?`,
        format: "qcm",
        choices: ["aucune", "une", "deux", "une infinité"],
        expected: ["aucune"],
        comparator: "mcq_exact",
        explanation: exp(
          "Une valeur absolue est une distance, donc toujours positive ou nulle.",
          "Elle ne peut jamais égaler un nombre strictement négatif.",
          `Aucun réel n'est à la distance $-${k}$ de zéro.`,
          "L'équation n'a AUCUNE solution : la courbe en V ne descend jamais sous l'axe."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_ref_abs_tpl_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_valeur_absolue",
    difficulty: 4,
    theme: "neutral",
    hint: "La courbe descend puis remonte : où change-t-elle de sens ?",
    tags: ["seconde", "maths", "fonctions", "valeur-absolue", "variations", "template"],
    generate: () => {
      const surPositifs = Math.random() < 0.5;
      const intervalle = surPositifs ? "$[0\\,;\\,+\\infty[$" : "$]-\\infty\\,;\\,0]$";
      const sens = surPositifs ? "croissante" : "décroissante";
      return {
        text: `Sur ${intervalle}, la fonction $f(x) = |x|$ est :`,
        format: "qcm",
        choices: ["croissante", "décroissante", "constante", "ni l'un ni l'autre"],
        expected: [sens],
        comparator: "mcq_exact",
        canvas: courbeValeurAbsolue,
        explanation: exp(
          "La valeur absolue mesure l'éloignement à zéro.",
          "On regarde si cet éloignement grandit ou diminue quand $x$ augmente.",
          surPositifs
            ? "Sur les positifs, $|x| = x$ : plus $x$ grandit, plus on s'éloigne."
            : "Sur les négatifs, $|x| = -x$ : quand $x$ augmente vers zéro, on se rapproche.",
          `Elle est ${sens} sur cet intervalle — le minimum, $0$, est atteint en $x = 0$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_ref_abs_tpl_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_valeur_absolue",
    difficulty: 3,
    theme: "neutral",
    hint: "Remplace $x$, puis applique les barres.",
    tags: ["seconde", "maths", "fonctions", "valeur-absolue", "image", "template"],
    generate: () => {
      const a = randomInt(1, 9);
      const x = randomInt(-9, 3);
      const val = Math.abs(x - a);
      return {
        text: `Soit $f(x) = |x - ${a}|$. Calculer $f(${x})$.`,
        format: "qcm",
        choices: choixDistincts(
          `$${val}$`,
          [`$${x - a}$`, `$${x + a}$`, "$0$"],
          [`$${val + 1}$`, `$${val + a}$`, `$${-val}$`, `$${val + 2}$`, `$${val + 3}$`]
        ),
        expected: [`$${val}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "On remplace $x$ par la valeur donnée, puis on applique les barres.",
          `Ici $f(${x}) = |${x} - ${a}|$.`,
          `Le calcul intérieur donne $${x - a}$, dont la valeur absolue vaut ${val}.`,
          `$f(${x}) = ${val}$ — c'est la distance de $${x}$ à $${a}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_ref_abs_tpl_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_valeur_absolue",
    difficulty: 5,
    theme: "neutral",
    hint: "Une distance inférieure à $r$ : cela dessine quoi autour du centre ?",
    tags: ["seconde", "maths", "fonctions", "valeur-absolue", "intervalle", "template"],
    generate: () => {
      const a = randomInt(1, 8);
      const r = randomInt(1, 5);
      return {
        text: `L'inéquation $|x - ${a}| \\leqslant ${r}$ a pour solutions :`,
        format: "qcm",
        choices: [
          `$[${a - r}\\,;\\,${a + r}]$`,
          `$[${-a - r}\\,;\\,${-a + r}]$`,
          `$[0\\,;\\,${r}]$`,
          "$\\mathbb{R}$",
        ],
        expected: [`$[${a - r}\\,;\\,${a + r}]$`],
        comparator: "mcq_exact",
        explanation: exp(
          "$|x - a|$ est la DISTANCE entre $x$ et $a$.",
          `L'inéquation demande donc les nombres situés à au plus ${r} de ${a}.`,
          `On part de ${a} et on s'écarte de ${r} des deux côtés.`,
          `Les solutions forment l'intervalle $[${a - r}\\,;\\,${a + r}]$, centré en ${a}.`
        ),
      };
    },
  },

  // ⭐ LE COTE GRAPHIQUE, a parite avec le cote algebrique. Une valeur absolue
  // se LIT sur un V autant qu'elle se calcule, et le BO demande les deux
  // registres : « resoudre graphiquement OU algebriquement une equation du type
  // f(x) = k ».

  {
    kind: "template",
    id: "seconde_ref_abs_tpl_8",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_valeur_absolue",
    difficulty: 3,
    theme: "neutral",
    hint: "Monte depuis l'axe des abscisses jusqu'au V, puis lis à gauche.",
    tags: ["seconde", "maths", "fonctions", "valeur-absolue", "graphique", "template"],
    generate: () => {
      const x = randomInt(-4, 4);
      const y = Math.abs(x);
      return {
        text: `Sur la courbe de $f(x) = |x|$, quelle est l'image de $${x}$ ?`,
        format: "qcm",
        choices: choixDistincts(
          `$${y}$`,
          [`$${x}$`, `$${-y}$`, `$${y * y}$`],
          [`$${y + 1}$`, `$${y - 1}$`, `$${2 * y}$`, `$${y + 2}$`, `$${y + 3}$`]
        ),
        expected: [`$${y}$`],
        comparator: "mcq_exact",
        canvas: courbeValeurAbsolue,
        explanation: exp(
          "Lire une image, c'est monter depuis l'abscisse jusqu'à la courbe, puis lire à gauche.",
          `On se place en $x = ${x}$ sur l'axe horizontal.`,
          x < 0
            ? `La branche de gauche remonte : on lit $${y}$.`
            : `La branche de droite monte : on lit $${y}$.`,
          `L'image de $${x}$ est $${y}$ — et celle de $${-x}$ aussi, par symétrie du V.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_ref_abs_tpl_9",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_valeur_absolue",
    difficulty: 4,
    theme: "neutral",
    hint: "Trace la droite horizontale à cette hauteur : combien de fois coupe-t-elle le V ?",
    tags: ["seconde", "maths", "fonctions", "valeur-absolue", "graphique", "template"],
    generate: () => {
      const k = randomInt(1, 5);
      return {
        text: `Graphiquement, quels sont les antécédents de $${k}$ par $f(x) = |x|$ ?`,
        format: "qcm",
        choices: [
          `$-${k}$ et $${k}$`,
          `$${k}$ seulement`,
          `$-${k}$ seulement`,
          "aucun",
        ],
        expected: [`$-${k}$ et $${k}$`],
        comparator: "mcq_exact",
        canvas: courbeValeurAbsolue,
        explanation: exp(
          "Chercher les antécédents, c'est partir de l'axe VERTICAL et redescendre sur la courbe.",
          `On trace la droite horizontale d'ordonnée $${k}$.`,
          "Elle rencontre le V en deux points, un sur chaque branche.",
          `Les antécédents sont $-${k}$ et $${k}$ : la lecture graphique donne d'un coup ce que l'algèbre trouve en deux cas.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_ref_abs_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_valeur_absolue",
    difficulty: 4,
    theme: "neutral",
    text: "Sur la courbe de $f(x) = |x|$, quelle particularité le point $O$ présente-t-il ?",
    format: "qcm",
    choices: [
      "c'est un minimum, atteint en un angle",
      "c'est un maximum",
      "c'est un point d'inflexion",
      "la courbe y est horizontale",
    ],
    expected: ["c'est un minimum, atteint en un angle"],
    comparator: "mcq_exact",
    canvas: courbeValeurAbsolue,
    hint: "Regarde la valeur la plus basse, et la forme du tracé à cet endroit.",
    explanation: exp(
      "Le point $O$ est là où les deux demi-droites se rejoignent.",
      "On y cherche la plus petite valeur prise par la fonction, et la forme du raccord.",
      "La fonction descend jusqu'à zéro puis remonte : $0$ est son minimum, et le raccord est ANGULEUX.",
      "$O$ est un minimum atteint en un angle — la parabole du carré, elle, y est arrondie."
    ),
    tags: ["seconde", "maths", "fonctions", "valeur-absolue", "graphique", "qcm"],
  },

  /* ---- la definition par cas, et son application ---- */

  {
    kind: "fixed",
    id: "seconde_ref_abs_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_valeur_absolue",
    difficulty: 2,
    theme: "neutral",
    text: "Comment la valeur absolue se définit-elle, cas par cas ?",
    format: "qcm",
    choices: [
      "$|x| = x$ si $x \\geqslant 0$, et $|x| = -x$ si $x < 0$",
      "$|x| = x$ pour tout $x$",
      "$|x| = -x$ pour tout $x$",
      "$|x| = x^2$",
    ],
    expected: ["$|x| = x$ si $x \\geqslant 0$, et $|x| = -x$ si $x < 0$"],
    comparator: "mcq_exact",
    hint: "Deux cas, selon le signe de ce qui est dans les barres.",
    explanation: exp(
      "La valeur absolue se définit par DEUX cas, selon le signe.",
      "Si le nombre est déjà positif ou nul, on le laisse tel quel ; s'il est négatif, on prend son opposé.",
      "⚠️ $-x$ n'est pas « un nombre négatif » : quand $x$ est négatif, $-x$ est POSITIF.",
      "$|x| = x$ si $x \\geqslant 0$, et $|x| = -x$ si $x < 0$."
    ),
    tags: ["seconde", "maths", "fonctions", "valeur-absolue", "definition", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_ref_abs_tpl_10",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_valeur_absolue",
    difficulty: 4,
    theme: "neutral",
    hint: "Quel est le signe de ce qui est DANS les barres, sur cet intervalle ?",
    tags: ["seconde", "maths", "fonctions", "valeur-absolue", "definition", "template"],
    generate: () => {
      const a = randomInt(2, 9);
      const auDessus = Math.random() < 0.5;
      const intervalle = auDessus
        ? `x \\geqslant ${a}`
        : `x < ${a}`;
      const correct = auDessus ? `$x - ${a}$` : `$${a} - x$`;
      return {
        text: `Écrire $|x - ${a}|$ SANS barres, sachant que $${intervalle}$.`,
        format: "qcm",
        choices: [`$x - ${a}$`, `$${a} - x$`, `$x + ${a}$`, `$-x - ${a}$`],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On applique la définition par cas au contenu des barres.",
          `On regarde le signe de $x - ${a}$ sur l'intervalle donné.`,
          auDessus
            ? `Comme $x \\geqslant ${a}$, l'expression $x - ${a}$ est positive ou nulle : on la garde.`
            : `Comme $x < ${a}$, l'expression $x - ${a}$ est négative : on prend son opposé, $${a} - x$.`,
          `Sur cet intervalle, $|x - ${a}| = ${correct.replace(/\$/g, "")}$.`
        ),
      };
    },
  },

  /* ---- les equations et inequations a expression dans les barres ---- */

  {
    kind: "template",
    id: "seconde_ref_abs_tpl_11",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_valeur_absolue",
    difficulty: 4,
    theme: "neutral",
    hint: "Ce qui est dans les barres vaut $k$ ou $-k$.",
    tags: ["seconde", "maths", "fonctions", "valeur-absolue", "equation", "template"],
    generate: () => {
      const b = randomInt(1, 7);
      const k = randomInt(2, 9);
      const s1 = k - b;
      const s2 = -k - b;
      return {
        text: `Résoudre $|x + ${b}| = ${k}$.`,
        format: "qcm",
        choices: [
          `$x = ${s1}$ ou $x = ${s2}$`,
          `$x = ${s1}$ seulement`,
          `$x = ${k}$ ou $x = ${-k}$`,
          `$x = ${k + b}$ ou $x = ${-k + b}$`,
        ],
        expected: [`$x = ${s1}$ ou $x = ${s2}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Une valeur absolue égale à $k$ signifie que le contenu des barres vaut $k$ OU $-k$.",
          `On écrit donc $x + ${b} = ${k}$, puis $x + ${b} = -${k}$.`,
          `La première donne $x = ${s1}$, la seconde $x = ${s2}$.`,
          `Les solutions sont $${s1}$ et $${s2}$ — deux cas, jamais un seul.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_ref_abs_tpl_12",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_valeur_absolue",
    difficulty: 5,
    theme: "neutral",
    hint: "Une distance INFÉRIEURE à $k$ : cela encadre, cela ne coupe pas en deux.",
    tags: ["seconde", "maths", "fonctions", "valeur-absolue", "inequation", "template"],
    generate: () => {
      const b = randomInt(1, 6);
      const k = randomInt(2, 7);
      return {
        text: `Résoudre $|x + ${b}| \\leqslant ${k}$.`,
        format: "qcm",
        choices: [
          `$[${-k - b}\\,;\\,${k - b}]$`,
          `$[${-k}\\,;\\,${k}]$`,
          `$[${k - b}\\,;\\,${k + b}]$`,
          "$\\mathbb{R}$",
        ],
        expected: [`$[${-k - b}\\,;\\,${k - b}]$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Une valeur absolue INFÉRIEURE à $k$ encadre : le contenu des barres est compris entre $-k$ et $k$.",
          `On écrit $-${k} \\leqslant x + ${b} \\leqslant ${k}$.`,
          `On retranche ${b} partout : $${-k - b} \\leqslant x \\leqslant ${k - b}$.`,
          `Les solutions forment UN intervalle, $[${-k - b}\\,;\\,${k - b}]$ — alors qu'une inégalité en $\\geqslant$ en donnerait deux.`
        ),
      };
    },
  },


  /* ---- la lecture sur une droite graduee ---- */

  // ⭐ LA DROITE GRADUEE, ET NON LA COURBE (Frederic, 04/09/2026). Une equation
  // a valeur absolue se resout de deux facons : par l'algebre — deux cas — ou
  // par la LECTURE d'une distance sur un axe gradue. Chercher la portion du V
  // sous une horizontale n'est pas la methode enseignee.
  //
  // ⛔ Et les points solutions ne portent PAS d'etiquette : une etiquette
  // donnerait la reponse. L'eleve lit les graduations, ce qui est precisement
  // le geste demande.

  {
    kind: "template",
    id: "seconde_ref_abs_tpl_13",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_valeur_absolue",
    difficulty: 4,
    theme: "neutral",
    hint: "Compte les graduations de part et d'autre du point marqué « centre ».",
    tags: ["seconde", "maths", "fonctions", "valeur-absolue", "droite-graduee", "equation", "template"],
    generate: () => {
      // ⛔ b + k <= 8 : au-dela l'axe demande plus de onze graduations, et les
      // nombres ecrits dessous se touchent. Quatorze couples restent possibles.
      let b = randomInt(1, 5);
      let k = randomInt(2, 4);
      while (b + k > 8) {
        b = randomInt(1, 5);
        k = randomInt(2, 4);
      }
      const s1 = k - b;
      const s2 = -k - b;
      return {
        text: `Sur la droite graduée, on a marqué les deux points situés à la distance $${k}$ de $${-b}$. Quelles sont leurs abscisses — autrement dit, les solutions de $|x + ${b}| = ${k}$ ?`,
        format: "qcm",
        choices: choixDistincts(
          `$${s2}$ et $${s1}$`,
          [`$${-b}$ et $${k}$`, `$${-k}$ et $${k}$`, `$${-b - 2 * k}$ et $${-b + 2 * k}$`],
          [`$${s2 - 1}$ et $${s1 + 1}$`, `$${s2 + 1}$ et $${s1 - 1}$`, `$${s2}$ et $${s1 + 1}$`]
        ),
        expected: [`$${s2}$ et $${s1}$`],
        comparator: "mcq_exact",
        canvas: droiteDistance(-b, k),
        explanation: exp(
          `$|x + ${b}|$ se lit « la distance entre $x$ et $${-b}$ ».`,
          `On part du point $${-b}$ et on avance de $${k}$ graduations, une fois vers la gauche, une fois vers la droite.`,
          `À gauche on arrive en $${s2}$, à droite en $${s1}$.`,
          `Les solutions sont $${s2}$ et $${s1}$ — et l'algèbre donne les mêmes, en résolvant $x + ${b} = ${k}$ puis $x + ${b} = -${k}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_ref_abs_tpl_14",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_valeur_absolue",
    difficulty: 5,
    theme: "neutral",
    hint: "Une distance INFÉRIEURE : les nombres cherchés sont ENTRE les deux points marqués.",
    tags: ["seconde", "maths", "fonctions", "valeur-absolue", "droite-graduee", "inequation", "template"],
    generate: () => {
      const a = randomInt(-4, 4);
      const r = randomInt(2, 4);
      return {
        text: `Sur la droite graduée, les deux points marqués sont à la distance $${r}$ de $${a}$. Quelles sont les solutions de $|x - ${a}| \\leqslant ${r}$ ?`,
        format: "qcm",
        choices: choixDistincts(
          `$[${a - r}\\,;\\,${a + r}]$`,
          [
            `$[${-r}\\,;\\,${r}]$`,
            `les nombres à l'extérieur de $[${a - r}\\,;\\,${a + r}]$`,
            `$${a - r}$ et $${a + r}$ seulement`,
          ],
          [`$[${a}\\,;\\,${a + r}]$`, `$[${a - r}\\,;\\,${a}]$`]
        ),
        expected: [`$[${a - r}\\,;\\,${a + r}]$`],
        comparator: "mcq_exact",
        canvas: droiteDistance(a, r),
        explanation: exp(
          `$|x - ${a}| \\leqslant ${r}$ se lit « $x$ est à une distance d'au plus $${r}$ de $${a}$ ».`,
          "On repère les deux points situés à cette distance exacte : ils bornent la zone cherchée.",
          `Tout ce qui est ENTRE eux est plus proche de $${a}$ ; tout ce qui est en dehors est plus loin.`,
          `Les solutions forment l'intervalle $[${a - r}\\,;\\,${a + r}]$ — un seul morceau, bornes comprises.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_ref_abs_tpl_15",
    niveau: "seconde",
    matiere: "maths",
    notionId: "fonctions_reference_2de",
    microId: "reference_valeur_absolue",
    difficulty: 3,
    theme: "neutral",
    hint: "Une distance ne dépend pas du sens dans lequel on la parcourt.",
    tags: ["seconde", "maths", "fonctions", "valeur-absolue", "droite-graduee", "distance", "template"],
    generate: () => {
      // ⛔ Meme borne qu'ailleurs : douze graduations serraient trop les nombres.
      const a = randomInt(-4, 0);
      const b = randomInt(1, 4);
      return {
        text: `Sur une droite graduée, $A$ a pour abscisse $${a}$ et $B$ pour abscisse $${b}$. Quelle écriture donne la longueur $AB$ ?`,
        format: "qcm",
        choices: [
          `$|${b} - (${a})| = ${b - a}$`,
          `$${a} - ${b} = ${a - b}$`,
          `$${a} + ${b} = ${a + b}$`,
          `$|${a} \\times ${b}| = ${Math.abs(a * b)}$`,
        ],
        expected: [`$|${b} - (${a})| = ${b - a}$`],
        comparator: "mcq_exact",
        canvas: {
          kind: "number_line",
          size: { width: 320, height: 120 },
          min: a - 1,
          max: b + 1,
          step: 1,
          points: [
            { value: a, label: "A", color: "#2563eb" },
            { value: b, label: "B", color: "#dc2626" },
          ],
          display: { showTicks: true, showValues: true, showPoints: true, showPointLabels: true, showZero: true },
        },
        explanation: exp(
          "La distance entre deux points d'une droite graduée est la valeur absolue de la différence de leurs abscisses.",
          "On soustrait une abscisse à l'autre, puis on prend la valeur absolue.",
          `Ici $${b} - (${a}) = ${b - a}$, un nombre déjà positif.`,
          `$AB = ${b - a}$ — et l'ordre de la soustraction n'a pas d'importance : $|${a} - ${b}|$ donne le même résultat.`
        ),
      };
    },
  },
];
