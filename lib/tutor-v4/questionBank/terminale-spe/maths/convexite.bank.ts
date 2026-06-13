// lib/tutor-v4/questionBank/terminale-spe/maths/convexite.bank.ts
//
// Notion : Convexité (convexite_fonction)
//
// microSkills couverts (~10 items chacun, difficultés étalées 1→5) :
//   convexite_reconnaitre     — Reconnaître une fonction convexe ou concave
//   convexite_derivee_seconde — Utiliser le signe de la dérivée seconde
//   convexite_point_inflexion — Identifier un point d'inflexion
//   convexite_tangente        — Position d'une courbe par rapport à ses tangentes
//   convexite_defi            — Exercice type bac
//
// Conventions :
// - Formules en LaTeX ($...$), rendues via KaTeX.
// - Règle QCM : dès qu'une réponse est une EXPRESSION → "qcm". Réponses tapées
//   ("short" + "number_equal") uniquement pour du purement numérique.
// - Graphiques : on illustre la reconnaissance convexe/concave et la position
//   courbe/tangente avec un canvas "fonctionGraphique" (rendu KaTeX/SVG existant).

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

// Parabole y = a x² : a > 0 → convexe (vallée), a < 0 → concave (colline).
function paraboleCanvas(a: number): CanvasFigure {
  const convexe = a > 0;
  return {
    kind: "fonctionGraphique",
    size: { width: 300, height: 240 },
    xmin: -3,
    xmax: 3,
    ymin: convexe ? -1 : -6,
    ymax: convexe ? 6 : 1,
    grille: true,
    courbes: [{ id: "f", type: "quadratique", a, b: 0, c: 0, couleur: "#2563eb" }],
  };
}

// Parabole convexe y = 0,5 x² avec sa tangente au point A(2 ; 2) : y = 2x - 2.
const convexeAvecTangenteCanvas: CanvasFigure = {
  kind: "fonctionGraphique",
  size: { width: 320, height: 250 },
  xmin: -1,
  xmax: 4,
  ymin: -1,
  ymax: 6,
  grille: true,
  courbes: [
    { id: "f", type: "quadratique", a: 0.5, b: 0, c: 0, couleur: "#2563eb" },
    { id: "t", type: "affine", a: 2, b: -2, couleur: "#16a34a" },
  ],
  misesEnEvidence: [{ point: { x: 2, y: 2, label: "A", couleur: "#dc2626" } }],
};

// Cube y = x³ échantillonné (point d'inflexion en 0).
const cubeInflexionCanvas: CanvasFigure = {
  kind: "fonctionGraphique",
  size: { width: 300, height: 250 },
  xmin: -2,
  xmax: 2,
  ymin: -4,
  ymax: 4,
  grille: true,
  courbes: [
    {
      id: "f",
      type: "points",
      couleur: "#2563eb",
      points: [
        { x: -1.5, y: -3.375 },
        { x: -1, y: -1 },
        { x: -0.5, y: -0.125 },
        { x: 0, y: 0 },
        { x: 0.5, y: 0.125 },
        { x: 1, y: 1 },
        { x: 1.5, y: 3.375 },
      ],
    },
  ],
  misesEnEvidence: [{ point: { x: 0, y: 0, label: "I", couleur: "#dc2626" } }],
};

export const convexiteBank: TutorBankItemV4[] = [
  /* =========================================================
     CONVEXITE_RECONNAITRE — Reconnaître convexe / concave
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_convexite_reconnaitre_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "convexite_fonction",
    microId: "convexite_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Une fonction est dite convexe lorsque sa courbe est :",
    format: "qcm",
    choices: [
      "tournée vers le haut (en forme de vallée)",
      "tournée vers le bas (en forme de colline)",
      "une droite",
      "toujours croissante",
    ],
    expected: ["tournée vers le haut (en forme de vallée)"],
    comparator: "mcq_exact",
    hint: "Convexe = « creux vers le haut ».",
    explanation: exp(
      "La convexité décrit la façon dont une courbe se « creuse ».",
      "On retient l'image visuelle de la convexité.",
      "Une fonction convexe a une courbe tournée vers le haut, en forme de vallée.",
      "Une fonction convexe a une courbe tournée vers le haut."
    ),
    tags: ["terminale-spe", "convexite", "reconnaitre", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_convexite_reconnaitre_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "convexite_fonction",
    microId: "convexite_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "La courbe ci-dessous représente une fonction. Est-elle convexe ou concave ?",
    format: "qcm",
    choices: ["Convexe", "Concave", "Ni l'une ni l'autre", "Les deux"],
    expected: ["Convexe"],
    comparator: "mcq_exact",
    canvas: paraboleCanvas(0.6),
    hint: "La courbe est-elle tournée vers le haut ou vers le bas ?",
    explanation: exp(
      "On reconnaît la convexité à la forme de la courbe.",
      "On observe si la courbe forme une vallée (convexe) ou une colline (concave).",
      "Ici, la courbe est tournée vers le haut (vallée).",
      "La fonction est convexe."
    ),
    tags: ["terminale-spe", "convexite", "reconnaitre", "canvas", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_convexite_reconnaitre_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "convexite_fonction",
    microId: "convexite_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "La courbe ci-dessous représente une fonction. Est-elle convexe ou concave ?",
    format: "qcm",
    choices: ["Concave", "Convexe", "Ni l'une ni l'autre", "Les deux"],
    expected: ["Concave"],
    comparator: "mcq_exact",
    canvas: paraboleCanvas(-0.6),
    hint: "La courbe est-elle tournée vers le haut ou vers le bas ?",
    explanation: exp(
      "On reconnaît la concavité à la forme de la courbe.",
      "On observe si la courbe forme une vallée (convexe) ou une colline (concave).",
      "Ici, la courbe est tournée vers le bas (colline).",
      "La fonction est concave."
    ),
    tags: ["terminale-spe", "convexite", "reconnaitre", "canvas", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_convexite_reconnaitre_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "convexite_fonction",
    microId: "convexite_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "La fonction $f(x) = x^2$ est-elle convexe ou concave sur $\\mathbb{R}$ ?",
    format: "qcm",
    choices: ["Convexe", "Concave", "Ni l'une ni l'autre", "Cela dépend de $x$"],
    expected: ["Convexe"],
    comparator: "mcq_exact",
    hint: "La parabole $y = x^2$ est tournée vers le haut.",
    explanation: exp(
      "La fonction carré a une courbe en forme de vallée.",
      "On observe l'allure de la parabole $y = x^2$.",
      "Elle est tournée vers le haut sur tout $\\mathbb{R}$.",
      "La fonction $f(x) = x^2$ est convexe."
    ),
    tags: ["terminale-spe", "convexite", "reconnaitre", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_convexite_reconnaitre_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "convexite_fonction",
    microId: "convexite_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "La fonction $f(x) = -x^2$ est-elle convexe ou concave sur $\\mathbb{R}$ ?",
    format: "qcm",
    choices: ["Concave", "Convexe", "Ni l'une ni l'autre", "Cela dépend de $x$"],
    expected: ["Concave"],
    comparator: "mcq_exact",
    hint: "La parabole $y = -x^2$ est tournée vers le bas.",
    explanation: exp(
      "La fonction $-x^2$ a une courbe en forme de colline.",
      "On observe l'allure de la parabole $y = -x^2$.",
      "Elle est tournée vers le bas sur tout $\\mathbb{R}$.",
      "La fonction $f(x) = -x^2$ est concave."
    ),
    tags: ["terminale-spe", "convexite", "reconnaitre", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_convexite_reconnaitre_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "convexite_fonction",
    microId: "convexite_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Par rapport à ses tangentes, la courbe d'une fonction convexe est :",
    format: "qcm",
    choices: ["au-dessus de ses tangentes", "au-dessous de ses tangentes", "confondue avec ses tangentes", "perpendiculaire à ses tangentes"],
    expected: ["au-dessus de ses tangentes"],
    comparator: "mcq_exact",
    hint: "Une vallée passe au-dessus de ses tangentes.",
    explanation: exp(
      "La convexité se caractérise aussi par la position par rapport aux tangentes.",
      "On retient la propriété du cours.",
      "Pour une fonction convexe, la courbe est toujours au-dessus de ses tangentes.",
      "La courbe d'une fonction convexe est au-dessus de ses tangentes."
    ),
    tags: ["terminale-spe", "convexite", "reconnaitre", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_convexite_reconnaitre_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "convexite_fonction",
    microId: "convexite_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Cette courbe est-elle convexe ou concave ?",
    format: "qcm",
    choices: ["Convexe", "Concave", "Ni l'une ni l'autre", "Les deux"],
    expected: ["Convexe"],
    comparator: "mcq_exact",
    canvas: paraboleCanvas(0.4),
    hint: "Regarde l'orientation de la courbe (vallée ou colline).",
    explanation: exp(
      "On reconnaît la convexité à la forme de la courbe.",
      "On observe l'orientation de la courbe.",
      "Ici, la courbe est tournée vers le haut.",
      "La fonction est convexe."
    ),
    tags: ["terminale-spe", "convexite", "reconnaitre", "canvas", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_convexite_reconnaitre_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "convexite_fonction",
    microId: "convexite_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Cette courbe est-elle convexe ou concave ?",
    format: "qcm",
    choices: ["Concave", "Convexe", "Ni l'une ni l'autre", "Les deux"],
    expected: ["Concave"],
    comparator: "mcq_exact",
    canvas: paraboleCanvas(-0.4),
    hint: "Regarde l'orientation de la courbe (vallée ou colline).",
    explanation: exp(
      "On reconnaît la concavité à la forme de la courbe.",
      "On observe l'orientation de la courbe.",
      "Ici, la courbe est tournée vers le bas.",
      "La fonction est concave."
    ),
    tags: ["terminale-spe", "convexite", "reconnaitre", "canvas", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_convexite_reconnaitre_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "convexite_fonction",
    microId: "convexite_reconnaitre",
    difficulty: 4,
    theme: "neutral",
    text: "Une fonction est convexe sur un intervalle si et seulement si sa dérivée $f'$ y est :",
    format: "qcm",
    choices: ["croissante", "décroissante", "positive", "constante"],
    expected: ["croissante"],
    comparator: "mcq_exact",
    hint: "Pour une vallée, la pente augmente au fur et à mesure.",
    explanation: exp(
      "Il existe un lien entre convexité et variations de la dérivée.",
      "On observe l'évolution de la pente (donc de $f'$) le long d'une courbe convexe.",
      "Sur une courbe convexe, la pente augmente : $f'$ est croissante.",
      "$f$ est convexe si et seulement si $f'$ est croissante."
    ),
    tags: ["terminale-spe", "convexite", "reconnaitre", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_convexite_reconnaitre_fixed_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "convexite_fonction",
    microId: "convexite_reconnaitre",
    difficulty: 4,
    theme: "neutral",
    text: "Une fonction est concave sur un intervalle si et seulement si sa dérivée $f'$ y est :",
    format: "qcm",
    choices: ["décroissante", "croissante", "négative", "constante"],
    expected: ["décroissante"],
    comparator: "mcq_exact",
    hint: "Pour une colline, la pente diminue au fur et à mesure.",
    explanation: exp(
      "Il existe un lien entre concavité et variations de la dérivée.",
      "On observe l'évolution de la pente le long d'une courbe concave.",
      "Sur une courbe concave, la pente diminue : $f'$ est décroissante.",
      "$f$ est concave si et seulement si $f'$ est décroissante."
    ),
    tags: ["terminale-spe", "convexite", "reconnaitre", "qcm"],
  },

  /* =========================================================
     CONVEXITE_DERIVEE_SECONDE
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_convexite_d2_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "convexite_fonction",
    microId: "convexite_derivee_seconde",
    difficulty: 2,
    theme: "neutral",
    text: "Une fonction $f$ est convexe sur un intervalle si et seulement si :",
    format: "qcm",
    choices: ["$f'' \\ge 0$", "$f'' \\le 0$", "$f' \\ge 0$", "$f \\ge 0$"],
    expected: ["$f'' \\ge 0$"],
    comparator: "mcq_exact",
    hint: "Le signe de la dérivée seconde donne la convexité.",
    explanation: exp(
      "La convexité se lit sur le signe de la dérivée seconde.",
      "On utilise le critère du cours.",
      "$f$ est convexe $\\iff f'' \\ge 0$.",
      "La bonne réponse est $f'' \\ge 0$."
    ),
    tags: ["terminale-spe", "convexite", "derivee_seconde", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_convexite_d2_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "convexite_fonction",
    microId: "convexite_derivee_seconde",
    difficulty: 2,
    theme: "neutral",
    text: "Une fonction $f$ est concave sur un intervalle si et seulement si :",
    format: "qcm",
    choices: ["$f'' \\le 0$", "$f'' \\ge 0$", "$f' \\le 0$", "$f \\le 0$"],
    expected: ["$f'' \\le 0$"],
    comparator: "mcq_exact",
    hint: "Le signe de la dérivée seconde donne la concavité.",
    explanation: exp(
      "La concavité se lit sur le signe de la dérivée seconde.",
      "On utilise le critère du cours.",
      "$f$ est concave $\\iff f'' \\le 0$.",
      "La bonne réponse est $f'' \\le 0$."
    ),
    tags: ["terminale-spe", "convexite", "derivee_seconde", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_convexite_d2_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "convexite_fonction",
    microId: "convexite_derivee_seconde",
    difficulty: 2,
    theme: "neutral",
    text: "Soit $f(x) = x^2$. Que vaut sa dérivée seconde $f''(x)$ ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "$f'(x) = 2x$, puis dérive encore.",
    explanation: exp(
      "La dérivée seconde est la dérivée de la dérivée.",
      "On dérive deux fois : $f'(x) = 2x$, puis $f''(x) = (2x)'$.",
      "$f''(x) = 2$.",
      "La dérivée seconde vaut $2$."
    ),
    tags: ["terminale-spe", "convexite", "derivee_seconde", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_convexite_d2_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "convexite_fonction",
    microId: "convexite_derivee_seconde",
    difficulty: 3,
    theme: "neutral",
    text: "Soit $f(x) = x^3$. Quelle est sa dérivée seconde $f''(x)$ ?",
    format: "qcm",
    choices: ["$6x$", "$3x^2$", "$6$", "$3x$"],
    expected: ["$6x$"],
    comparator: "mcq_exact",
    hint: "$f'(x) = 3x^2$, puis dérive encore.",
    explanation: exp(
      "La dérivée seconde est la dérivée de la dérivée.",
      "On dérive deux fois : $f'(x) = 3x^2$, puis $f''(x) = (3x^2)'$.",
      "$f''(x) = 6x$.",
      "La dérivée seconde est $f''(x) = 6x$."
    ),
    tags: ["terminale-spe", "convexite", "derivee_seconde", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_convexite_d2_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "convexite_fonction",
    microId: "convexite_derivee_seconde",
    difficulty: 3,
    theme: "neutral",
    text: "Soit $f(x) = x^2 - 4x + 1$, donc $f''(x) = 2$. Que peut-on en déduire ?",
    format: "qcm",
    choices: [
      "$f$ est convexe sur $\\mathbb{R}$",
      "$f$ est concave sur $\\mathbb{R}$",
      "$f$ admet un point d'inflexion",
      "$f$ est une droite",
    ],
    expected: ["$f$ est convexe sur $\\mathbb{R}$"],
    comparator: "mcq_exact",
    hint: "$f'' = 2 > 0$ partout.",
    explanation: exp(
      "Le signe constant de $f''$ donne la convexité sur tout l'intervalle.",
      "On observe le signe de $f''(x) = 2$.",
      "$f''(x) = 2 > 0$ pour tout $x$, donc $f$ est convexe.",
      "$f$ est convexe sur $\\mathbb{R}$."
    ),
    tags: ["terminale-spe", "convexite", "derivee_seconde", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_convexite_d2_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "convexite_fonction",
    microId: "convexite_derivee_seconde",
    difficulty: 2,
    theme: "neutral",
    text: "Pour étudier la convexité d'une fonction, on étudie le signe de :",
    format: "qcm",
    choices: ["$f''$", "$f'$", "$f$", "$f'''$"],
    expected: ["$f''$"],
    comparator: "mcq_exact",
    hint: "C'est la dérivée seconde qui renseigne sur la convexité.",
    explanation: exp(
      "La convexité est liée à la dérivée seconde.",
      "On étudie donc le signe de $f''$.",
      "Le signe de $f''$ donne les intervalles de convexité et de concavité.",
      "On étudie le signe de $f''$."
    ),
    tags: ["terminale-spe", "convexite", "derivee_seconde", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_convexite_d2_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "convexite_fonction",
    microId: "convexite_derivee_seconde",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $f(x) = x^3$, donc $f''(x) = 6x$. Sur quel intervalle $f$ est-elle convexe ?",
    format: "qcm",
    choices: ["$[0\\,;+\\infty[$", "$]-\\infty\\,;0]$", "$\\mathbb{R}$", "$]-\\infty\\,;+\\infty[$"],
    expected: ["$[0\\,;+\\infty[$"],
    comparator: "mcq_exact",
    hint: "$f$ est convexe là où $f''(x) \\ge 0$.",
    explanation: exp(
      "On lit la convexité sur le signe de $f''$.",
      "$f''(x) = 6x$ est positive quand $x \\ge 0$.",
      "Donc $f'' \\ge 0$ sur $[0\\,;+\\infty[$.",
      "$f$ est convexe sur $[0\\,;+\\infty[$."
    ),
    tags: ["terminale-spe", "convexite", "derivee_seconde", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_convexite_d2_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "convexite_fonction",
    microId: "convexite_derivee_seconde",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $f(x) = x^3$, donc $f''(x) = 6x$. Sur quel intervalle $f$ est-elle concave ?",
    format: "qcm",
    choices: ["$]-\\infty\\,;0]$", "$[0\\,;+\\infty[$", "$\\mathbb{R}$", "$[1\\,;+\\infty[$"],
    expected: ["$]-\\infty\\,;0]$"],
    comparator: "mcq_exact",
    hint: "$f$ est concave là où $f''(x) \\le 0$.",
    explanation: exp(
      "On lit la concavité sur le signe de $f''$.",
      "$f''(x) = 6x$ est négative quand $x \\le 0$.",
      "Donc $f'' \\le 0$ sur $]-\\infty\\,;0]$.",
      "$f$ est concave sur $]-\\infty\\,;0]$."
    ),
    tags: ["terminale-spe", "convexite", "derivee_seconde", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_convexite_d2_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "convexite_fonction",
    microId: "convexite_derivee_seconde",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $f(x) = x^3 - 3x^2$. Quelle est sa dérivée seconde $f''(x)$ ?",
    format: "qcm",
    choices: ["$6x - 6$", "$3x^2 - 6x$", "$6x - 3$", "$6x$"],
    expected: ["$6x - 6$"],
    comparator: "mcq_exact",
    hint: "Dérive deux fois : $f'(x) = 3x^2 - 6x$.",
    explanation: exp(
      "La dérivée seconde est la dérivée de la dérivée.",
      "$f'(x) = 3x^2 - 6x$, puis $f''(x) = (3x^2 - 6x)'$.",
      "$f''(x) = 6x - 6$.",
      "La dérivée seconde est $f''(x) = 6x - 6$."
    ),
    tags: ["terminale-spe", "convexite", "derivee_seconde", "qcm"],
  },

  {
    kind: "template",
    id: "terminale_spe_convexite_d2_tpl_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "convexite_fonction",
    microId: "convexite_derivee_seconde",
    difficulty: 3,
    theme: "neutral",
    hint: "$f'(x) = 3a x^2$, puis $f''(x) = 6a x$.",
    tags: ["terminale-spe", "convexite", "derivee_seconde", "template"],
    generate: () => {
      const a = randomInt(2, 5);
      const correct = `$${6 * a}x$`;
      const distracteurs = [`$${3 * a}x^2$`, `$${6 * a}$`, `$${3 * a}x$`];
      return {
        text: `Soit $f(x) = ${a}x^3$. Quelle est sa dérivée seconde $f''(x)$ ?`,
        format: "qcm",
        choices: [correct, ...distracteurs].sort(() => Math.random() - 0.5),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "La dérivée seconde est la dérivée de la dérivée.",
          `On dérive deux fois : $f'(x) = ${3 * a}x^2$, puis $f''(x) = (${3 * a}x^2)'$.`,
          `$f''(x) = ${6 * a}x$.`,
          `La dérivée seconde est $f''(x) = ${6 * a}x$.`
        ),
      };
    },
  },

  /* =========================================================
     CONVEXITE_POINT_INFLEXION
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_convexite_inflexion_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "convexite_fonction",
    microId: "convexite_point_inflexion",
    difficulty: 2,
    theme: "neutral",
    text: "Un point d'inflexion est un point où la courbe :",
    format: "qcm",
    choices: [
      "change de convexité",
      "atteint un maximum",
      "coupe l'axe des abscisses",
      "a une tangente horizontale",
    ],
    expected: ["change de convexité"],
    comparator: "mcq_exact",
    hint: "C'est l'endroit où la courbe passe de convexe à concave (ou l'inverse).",
    explanation: exp(
      "Le point d'inflexion marque un changement de convexité.",
      "On utilise la définition du cours.",
      "En ce point, la courbe passe de convexe à concave (ou inversement).",
      "Un point d'inflexion est un point où la courbe change de convexité."
    ),
    tags: ["terminale-spe", "convexite", "inflexion", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_convexite_inflexion_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "convexite_fonction",
    microId: "convexite_point_inflexion",
    difficulty: 3,
    theme: "neutral",
    text: "Comment caractérise-t-on un point d'inflexion à l'aide de $f''$ ?",
    format: "qcm",
    choices: [
      "$f''$ s'annule en changeant de signe",
      "$f''$ est maximale",
      "$f''$ est positive",
      "$f'$ s'annule",
    ],
    expected: ["$f''$ s'annule en changeant de signe"],
    comparator: "mcq_exact",
    hint: "Un changement de convexité correspond à un changement de signe de $f''$.",
    explanation: exp(
      "Le point d'inflexion correspond à un changement de signe de la dérivée seconde.",
      "On cherche où $f''$ s'annule, puis on vérifie le changement de signe.",
      "Un point d'inflexion est un point où $f''$ s'annule en changeant de signe.",
      "On le caractérise par : $f''$ s'annule en changeant de signe."
    ),
    tags: ["terminale-spe", "convexite", "inflexion", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_convexite_inflexion_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "convexite_fonction",
    microId: "convexite_point_inflexion",
    difficulty: 3,
    theme: "neutral",
    text: "La courbe ci-dessous (de $f(x) = x^3$) admet un point d'inflexion noté $I$. Quelle est son abscisse ?",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    canvas: cubeInflexionCanvas,
    hint: "C'est là où la courbe change de convexité ; $f''(x) = 6x$ s'annule.",
    explanation: exp(
      "Le point d'inflexion se trouve là où $f''$ s'annule en changeant de signe.",
      "Pour $f(x) = x^3$, $f''(x) = 6x$, qui s'annule en $0$ en changeant de signe.",
      "L'abscisse du point d'inflexion est donc $0$.",
      "Le point d'inflexion a pour abscisse $0$."
    ),
    tags: ["terminale-spe", "convexite", "inflexion", "canvas", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_convexite_inflexion_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "convexite_fonction",
    microId: "convexite_point_inflexion",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $f(x) = x^3 - 3x^2$, donc $f''(x) = 6x - 6$. Quelle est l'abscisse du point d'inflexion ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Résous $f''(x) = 0$, soit $6x - 6 = 0$.",
    explanation: exp(
      "Le point d'inflexion se trouve là où $f''$ s'annule en changeant de signe.",
      "On résout $f''(x) = 0$ : $6x - 6 = 0$.",
      "$6x - 6 = 0 \\iff x = 1$, et $f''$ change de signe en $1$.",
      "L'abscisse du point d'inflexion est $1$."
    ),
    tags: ["terminale-spe", "convexite", "inflexion", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_convexite_inflexion_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "convexite_fonction",
    microId: "convexite_point_inflexion",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $f(x) = x^3 - 6x^2$, donc $f''(x) = 6x - 12$. Quelle est l'abscisse du point d'inflexion ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Résous $6x - 12 = 0$.",
    explanation: exp(
      "Le point d'inflexion se trouve là où $f''$ s'annule en changeant de signe.",
      "On résout $f''(x) = 0$ : $6x - 12 = 0$.",
      "$6x - 12 = 0 \\iff x = 2$, et $f''$ change de signe en $2$.",
      "L'abscisse du point d'inflexion est $2$."
    ),
    tags: ["terminale-spe", "convexite", "inflexion", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_convexite_inflexion_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "convexite_fonction",
    microId: "convexite_point_inflexion",
    difficulty: 3,
    theme: "neutral",
    text: "En un point d'inflexion, comment la courbe se situe-t-elle par rapport à sa tangente ?",
    format: "qcm",
    choices: [
      "Elle traverse sa tangente",
      "Elle reste au-dessus",
      "Elle reste au-dessous",
      "Elle est parallèle",
    ],
    expected: ["Elle traverse sa tangente"],
    comparator: "mcq_exact",
    hint: "La convexité change, donc la position par rapport à la tangente aussi.",
    explanation: exp(
      "Au point d'inflexion, la convexité change de sens.",
      "Avant, la courbe est d'un côté de la tangente ; après, de l'autre.",
      "La courbe traverse donc sa tangente en ce point.",
      "En un point d'inflexion, la courbe traverse sa tangente."
    ),
    tags: ["terminale-spe", "convexite", "inflexion", "tangente", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_convexite_inflexion_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "convexite_fonction",
    microId: "convexite_point_inflexion",
    difficulty: 4,
    theme: "neutral",
    text: "La condition « $f''(a) = 0$ » suffit-elle pour affirmer que $a$ est l'abscisse d'un point d'inflexion ?",
    format: "qcm",
    choices: [
      "Non, $f''$ doit aussi changer de signe en $a$",
      "Oui, c'est suffisant",
      "Non, il faut $f'(a) = 0$",
      "Oui, si $f(a) = 0$",
    ],
    expected: ["Non, $f''$ doit aussi changer de signe en $a$"],
    comparator: "mcq_exact",
    hint: "Pense à $f(x) = x^4$ en $0$.",
    explanation: exp(
      "L'annulation de $f''$ ne suffit pas : il faut un changement de signe.",
      "Par exemple, pour $f(x) = x^4$, $f''(0) = 0$ mais $f''$ ne change pas de signe.",
      "Il faut donc que $f''$ s'annule ET change de signe.",
      "Non : $f''$ doit aussi changer de signe en $a$."
    ),
    tags: ["terminale-spe", "convexite", "inflexion", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_convexite_inflexion_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "convexite_fonction",
    microId: "convexite_point_inflexion",
    difficulty: 5,
    theme: "neutral",
    text: "Pour $f(x) = x^3$, quelles sont les coordonnées du point d'inflexion ?",
    format: "qcm",
    choices: ["$(0\\,;0)$", "$(1\\,;1)$", "$(0\\,;1)$", "$(1\\,;0)$"],
    expected: ["$(0\\,;0)$"],
    comparator: "mcq_exact",
    hint: "L'abscisse est $0$ ; calcule $f(0)$.",
    explanation: exp(
      "On détermine l'abscisse, puis l'ordonnée par $f$.",
      "$f''(x) = 6x$ s'annule en $0$, et $f(0) = 0$.",
      "Le point d'inflexion a pour coordonnées $(0\\,;0)$.",
      "Les coordonnées sont $(0\\,;0)$."
    ),
    tags: ["terminale-spe", "convexite", "inflexion", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_convexite_inflexion_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "convexite_fonction",
    microId: "convexite_point_inflexion",
    difficulty: 3,
    theme: "neutral",
    text: "Soit $f(x) = x^3$, donc $f''(x) = 6x$. En quelle valeur $f''$ s'annule-t-elle ?",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "Résous $6x = 0$.",
    explanation: exp(
      "On cherche où la dérivée seconde s'annule.",
      "On résout $f''(x) = 0$ : $6x = 0$.",
      "$6x = 0 \\iff x = 0$.",
      "$f''$ s'annule en $x = 0$."
    ),
    tags: ["terminale-spe", "convexite", "inflexion", "short"],
  },

  {
    kind: "template",
    id: "terminale_spe_convexite_inflexion_tpl_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "convexite_fonction",
    microId: "convexite_point_inflexion",
    difficulty: 4,
    theme: "neutral",
    hint: "$f''(x) = 6x - 6k$ ; résous $f''(x) = 0$.",
    tags: ["terminale-spe", "convexite", "inflexion", "template"],
    generate: () => {
      const k = randomInt(1, 5);
      return {
        text: `Soit $f(x) = x^3 - ${3 * k}x^2$, donc $f''(x) = 6x - ${6 * k}$. Quelle est l'abscisse du point d'inflexion ?`,
        format: "short",
        expected: [String(k)],
        comparator: "number_equal",
        explanation: exp(
          "Le point d'inflexion se trouve là où $f''$ s'annule en changeant de signe.",
          `On résout $f''(x) = 0$ : $6x - ${6 * k} = 0$.`,
          `$6x - ${6 * k} = 0 \\iff x = ${k}$.`,
          `L'abscisse du point d'inflexion est $${k}$.`
        ),
      };
    },
  },

  /* =========================================================
     CONVEXITE_TANGENTE — Position courbe / tangentes
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_convexite_tangente_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "convexite_fonction",
    microId: "convexite_tangente",
    difficulty: 2,
    theme: "neutral",
    text: "Pour une fonction convexe, la courbe est située :",
    format: "qcm",
    choices: [
      "au-dessus de ses tangentes",
      "au-dessous de ses tangentes",
      "sur ses tangentes",
      "perpendiculairement à ses tangentes",
    ],
    expected: ["au-dessus de ses tangentes"],
    comparator: "mcq_exact",
    hint: "Une vallée passe au-dessus de ses tangentes.",
    explanation: exp(
      "La convexité se traduit par une position par rapport aux tangentes.",
      "On utilise la propriété du cours.",
      "Pour une fonction convexe, la courbe est au-dessus de ses tangentes.",
      "La courbe est au-dessus de ses tangentes."
    ),
    tags: ["terminale-spe", "convexite", "tangente", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_convexite_tangente_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "convexite_fonction",
    microId: "convexite_tangente",
    difficulty: 2,
    theme: "neutral",
    text: "Pour une fonction concave, la courbe est située :",
    format: "qcm",
    choices: [
      "au-dessous de ses tangentes",
      "au-dessus de ses tangentes",
      "sur ses tangentes",
      "perpendiculairement à ses tangentes",
    ],
    expected: ["au-dessous de ses tangentes"],
    comparator: "mcq_exact",
    hint: "Une colline passe au-dessous de ses tangentes.",
    explanation: exp(
      "La concavité se traduit par une position par rapport aux tangentes.",
      "On utilise la propriété du cours.",
      "Pour une fonction concave, la courbe est au-dessous de ses tangentes.",
      "La courbe est au-dessous de ses tangentes."
    ),
    tags: ["terminale-spe", "convexite", "tangente", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_convexite_tangente_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "convexite_fonction",
    microId: "convexite_tangente",
    difficulty: 3,
    theme: "neutral",
    text: "Sur la figure, la tangente en $A$ (en vert) est tracée. Où se situe la courbe (en bleu) par rapport à sa tangente ?",
    format: "qcm",
    choices: ["Au-dessus", "Au-dessous", "Confondue", "Elle la traverse"],
    expected: ["Au-dessus"],
    comparator: "mcq_exact",
    canvas: convexeAvecTangenteCanvas,
    hint: "La courbe est convexe : observe sa position.",
    explanation: exp(
      "On lit la position de la courbe par rapport à sa tangente.",
      "La courbe est convexe (vallée), donc elle reste du même côté de sa tangente.",
      "On observe que la courbe est au-dessus de la tangente verte.",
      "La courbe est au-dessus de sa tangente."
    ),
    tags: ["terminale-spe", "convexite", "tangente", "canvas", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_convexite_tangente_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "convexite_fonction",
    microId: "convexite_tangente",
    difficulty: 4,
    theme: "neutral",
    text: "La fonction exponentielle est convexe. Quelle inégalité en découle (tangente en $0$) ?",
    format: "qcm",
    choices: ["$e^x \\ge x + 1$", "$e^x \\le x + 1$", "$e^x \\ge x$", "$e^x \\le x$"],
    expected: ["$e^x \\ge x + 1$"],
    comparator: "mcq_exact",
    hint: "La courbe convexe est au-dessus de sa tangente $y = x + 1$ en $0$.",
    explanation: exp(
      "Une fonction convexe est au-dessus de ses tangentes.",
      "La tangente à $e^x$ en $0$ est $y = x + 1$.",
      "Comme $e^x$ est convexe, sa courbe est au-dessus : $e^x \\ge x + 1$.",
      "On obtient $e^x \\ge x + 1$."
    ),
    tags: ["terminale-spe", "convexite", "tangente", "exponentielle", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_convexite_tangente_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "convexite_fonction",
    microId: "convexite_tangente",
    difficulty: 5,
    theme: "neutral",
    text: "La fonction logarithme est concave. Quelle inégalité en découle (tangente en $1$) ?",
    format: "qcm",
    choices: ["$\\ln(x) \\le x - 1$", "$\\ln(x) \\ge x - 1$", "$\\ln(x) \\le x$", "$\\ln(x) \\ge x$"],
    expected: ["$\\ln(x) \\le x - 1$"],
    comparator: "mcq_exact",
    hint: "La courbe concave est au-dessous de sa tangente $y = x - 1$ en $1$.",
    explanation: exp(
      "Une fonction concave est au-dessous de ses tangentes.",
      "La tangente à $\\ln(x)$ en $1$ est $y = x - 1$.",
      "Comme $\\ln$ est concave, sa courbe est au-dessous : $\\ln(x) \\le x - 1$.",
      "On obtient $\\ln(x) \\le x - 1$."
    ),
    tags: ["terminale-spe", "convexite", "tangente", "logarithme", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_convexite_tangente_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "convexite_fonction",
    microId: "convexite_tangente",
    difficulty: 3,
    theme: "neutral",
    text: "Si la courbe d'une fonction est toujours au-dessus de ses tangentes, alors la fonction est :",
    format: "qcm",
    choices: ["convexe", "concave", "constante", "décroissante"],
    expected: ["convexe"],
    comparator: "mcq_exact",
    hint: "C'est la caractérisation de la convexité par les tangentes.",
    explanation: exp(
      "La position par rapport aux tangentes caractérise la convexité.",
      "« Au-dessus des tangentes » correspond à une vallée.",
      "Une courbe au-dessus de ses tangentes est celle d'une fonction convexe.",
      "La fonction est convexe."
    ),
    tags: ["terminale-spe", "convexite", "tangente", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_convexite_tangente_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "convexite_fonction",
    microId: "convexite_tangente",
    difficulty: 4,
    theme: "neutral",
    text: "L'inégalité $e^x \\ge x + 1$ pour tout réel $x$ traduit le fait que :",
    format: "qcm",
    choices: [
      "la fonction exponentielle est convexe",
      "la fonction exponentielle est concave",
      "l'exponentielle est croissante",
      "l'exponentielle est positive",
    ],
    expected: ["la fonction exponentielle est convexe"],
    comparator: "mcq_exact",
    hint: "$y = x + 1$ est la tangente en $0$ ; la courbe est au-dessus.",
    explanation: exp(
      "Être au-dessus d'une tangente traduit la convexité.",
      "$y = x + 1$ est la tangente à $e^x$ en $0$.",
      "$e^x \\ge x + 1$ signifie que la courbe est au-dessus de cette tangente.",
      "Cela traduit la convexité de l'exponentielle."
    ),
    tags: ["terminale-spe", "convexite", "tangente", "exponentielle", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_convexite_tangente_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "convexite_fonction",
    microId: "convexite_tangente",
    difficulty: 3,
    theme: "neutral",
    text: "Cette courbe (concave) et sa tangente : où se situe la courbe par rapport à ses tangentes ?",
    format: "qcm",
    choices: ["Au-dessous", "Au-dessus", "Confondue", "Elle les traverse"],
    expected: ["Au-dessous"],
    comparator: "mcq_exact",
    canvas: paraboleCanvas(-0.5),
    hint: "Une colline (concave) reste au-dessous de ses tangentes.",
    explanation: exp(
      "On lit la position de la courbe concave par rapport à ses tangentes.",
      "Une fonction concave a sa courbe sous ses tangentes.",
      "La courbe tournée vers le bas reste au-dessous de toute tangente.",
      "La courbe est au-dessous de ses tangentes."
    ),
    tags: ["terminale-spe", "convexite", "tangente", "canvas", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_convexite_tangente_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "convexite_fonction",
    microId: "convexite_tangente",
    difficulty: 4,
    theme: "neutral",
    text: "Si la courbe d'une fonction est toujours au-dessous de ses tangentes, alors la fonction est :",
    format: "qcm",
    choices: ["concave", "convexe", "constante", "croissante"],
    expected: ["concave"],
    comparator: "mcq_exact",
    hint: "C'est la caractérisation de la concavité par les tangentes.",
    explanation: exp(
      "La position par rapport aux tangentes caractérise la concavité.",
      "« Au-dessous des tangentes » correspond à une colline.",
      "Une courbe au-dessous de ses tangentes est celle d'une fonction concave.",
      "La fonction est concave."
    ),
    tags: ["terminale-spe", "convexite", "tangente", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_convexite_tangente_fixed_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "convexite_fonction",
    microId: "convexite_tangente",
    difficulty: 5,
    theme: "neutral",
    text: "Pour une fonction convexe, le coefficient directeur des tangentes, quand $x$ augmente :",
    format: "qcm",
    choices: ["augmente", "diminue", "reste constant", "s'annule"],
    expected: ["augmente"],
    comparator: "mcq_exact",
    hint: "Pour une fonction convexe, $f'$ est croissante.",
    explanation: exp(
      "Le coefficient directeur de la tangente en $a$ est $f'(a)$.",
      "Pour une fonction convexe, $f'$ est croissante.",
      "Donc le coefficient directeur des tangentes augmente avec $x$.",
      "Le coefficient directeur augmente."
    ),
    tags: ["terminale-spe", "convexite", "tangente", "qcm"],
  },

  /* =========================================================
     CONVEXITE_DEFI — Type bac
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_convexite_defi_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "convexite_fonction",
    microId: "convexite_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $f(x) = x^3 - 3x^2$, donc $f''(x) = 6x - 6$. Sur quel intervalle $f$ est-elle convexe ?",
    format: "qcm",
    choices: ["$[1\\,;+\\infty[$", "$]-\\infty\\,;1]$", "$\\mathbb{R}$", "$[0\\,;+\\infty[$"],
    expected: ["$[1\\,;+\\infty[$"],
    comparator: "mcq_exact",
    hint: "$f$ est convexe là où $f''(x) \\ge 0$.",
    explanation: exp(
      "On lit la convexité sur le signe de $f''$.",
      "$f''(x) = 6x - 6$ est positive quand $x \\ge 1$.",
      "Donc $f'' \\ge 0$ sur $[1\\,;+\\infty[$.",
      "$f$ est convexe sur $[1\\,;+\\infty[$."
    ),
    tags: ["terminale-spe", "convexite", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_convexite_defi_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "convexite_fonction",
    microId: "convexite_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $f(x) = x^3 - 3x^2$, donc $f''(x) = 6x - 6$. Quelle est l'abscisse du point d'inflexion ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Résous $6x - 6 = 0$.",
    explanation: exp(
      "Le point d'inflexion se trouve là où $f''$ s'annule en changeant de signe.",
      "On résout $f''(x) = 0$ : $6x - 6 = 0$.",
      "$6x - 6 = 0 \\iff x = 1$, et $f''$ change de signe.",
      "L'abscisse du point d'inflexion est $1$."
    ),
    tags: ["terminale-spe", "convexite", "type_bac", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_convexite_defi_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "convexite_fonction",
    microId: "convexite_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $f(x) = x^3 - 3x^2$. Sur quel intervalle $f$ est-elle concave ?",
    format: "qcm",
    choices: ["$]-\\infty\\,;1]$", "$[1\\,;+\\infty[$", "$\\mathbb{R}$", "$]-\\infty\\,;0]$"],
    expected: ["$]-\\infty\\,;1]$"],
    comparator: "mcq_exact",
    hint: "$f$ est concave là où $f''(x) = 6x - 6 \\le 0$.",
    explanation: exp(
      "On lit la concavité sur le signe de $f''$.",
      "$f''(x) = 6x - 6$ est négative quand $x \\le 1$.",
      "Donc $f'' \\le 0$ sur $]-\\infty\\,;1]$.",
      "$f$ est concave sur $]-\\infty\\,;1]$."
    ),
    tags: ["terminale-spe", "convexite", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_convexite_defi_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "convexite_fonction",
    microId: "convexite_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $f(x) = x^3 - 6x^2$, donc $f''(x) = 6x - 12$. Quelle est l'abscisse du point d'inflexion ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Résous $6x - 12 = 0$.",
    explanation: exp(
      "Le point d'inflexion se trouve là où $f''$ s'annule en changeant de signe.",
      "On résout $f''(x) = 0$ : $6x - 12 = 0$.",
      "$6x - 12 = 0 \\iff x = 2$, et $f''$ change de signe.",
      "L'abscisse du point d'inflexion est $2$."
    ),
    tags: ["terminale-spe", "convexite", "type_bac", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_convexite_defi_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "convexite_fonction",
    microId: "convexite_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $f(x) = e^x$, donc $f''(x) = e^x$. Que peut-on dire de la convexité de $f$ ?",
    format: "qcm",
    choices: [
      "Convexe sur $\\mathbb{R}$",
      "Concave sur $\\mathbb{R}$",
      "Convexe puis concave",
      "Ni convexe ni concave",
    ],
    expected: ["Convexe sur $\\mathbb{R}$"],
    comparator: "mcq_exact",
    hint: "$f''(x) = e^x > 0$ pour tout $x$.",
    explanation: exp(
      "On lit la convexité sur le signe de $f''$.",
      "$f''(x) = e^x$, et $e^x > 0$ pour tout réel $x$.",
      "Comme $f'' > 0$ partout, $f$ est convexe sur $\\mathbb{R}$.",
      "La fonction exponentielle est convexe sur $\\mathbb{R}$."
    ),
    tags: ["terminale-spe", "convexite", "type_bac", "exponentielle", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_convexite_defi_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "convexite_fonction",
    microId: "convexite_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $f(x) = \\ln(x)$ sur $]0\\,;+\\infty[$, donc $f''(x) = -\\dfrac{1}{x^2}$. Que peut-on dire de la convexité de $f$ ?",
    format: "qcm",
    choices: [
      "Concave sur $]0\\,;+\\infty[$",
      "Convexe sur $]0\\,;+\\infty[$",
      "Convexe puis concave",
      "Ni convexe ni concave",
    ],
    expected: ["Concave sur $]0\\,;+\\infty[$"],
    comparator: "mcq_exact",
    hint: "$f''(x) = -\\dfrac{1}{x^2} < 0$.",
    explanation: exp(
      "On lit la convexité sur le signe de $f''$.",
      "$f''(x) = -\\dfrac{1}{x^2}$, qui est strictement négative.",
      "Comme $f'' < 0$ partout, $f$ est concave.",
      "La fonction logarithme est concave sur $]0\\,;+\\infty[$."
    ),
    tags: ["terminale-spe", "convexite", "type_bac", "logarithme", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_convexite_defi_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "convexite_fonction",
    microId: "convexite_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $f(x) = x^3$. Quelle est sa dérivée seconde $f''(x)$ ?",
    format: "qcm",
    choices: ["$6x$", "$3x^2$", "$6$", "$2x$"],
    expected: ["$6x$"],
    comparator: "mcq_exact",
    hint: "Dérive deux fois.",
    explanation: exp(
      "La dérivée seconde est la dérivée de la dérivée.",
      "$f'(x) = 3x^2$, puis $f''(x) = (3x^2)'$.",
      "$f''(x) = 6x$.",
      "La dérivée seconde est $f''(x) = 6x$."
    ),
    tags: ["terminale-spe", "convexite", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_convexite_defi_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "convexite_fonction",
    microId: "convexite_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Cette courbe représente une fonction. Est-elle convexe ou concave ?",
    format: "qcm",
    choices: ["Convexe", "Concave", "Ni l'une ni l'autre", "Les deux"],
    expected: ["Convexe"],
    comparator: "mcq_exact",
    canvas: paraboleCanvas(0.5),
    hint: "Observe l'orientation de la courbe.",
    explanation: exp(
      "On reconnaît la convexité à la forme de la courbe.",
      "On observe si la courbe forme une vallée ou une colline.",
      "Ici, la courbe est tournée vers le haut.",
      "La fonction est convexe."
    ),
    tags: ["terminale-spe", "convexite", "type_bac", "canvas", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_convexite_defi_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "convexite_fonction",
    microId: "convexite_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Pour justifier la convexité d'une fonction sur un intervalle, quelle étude fait-on ?",
    format: "qcm",
    choices: [
      "On étudie le signe de $f''$",
      "On étudie le signe de $f$",
      "On calcule une limite",
      "On résout $f(x) = 0$",
    ],
    expected: ["On étudie le signe de $f''$"],
    comparator: "mcq_exact",
    hint: "La convexité dépend de la dérivée seconde.",
    explanation: exp(
      "La convexité se justifie par la dérivée seconde.",
      "On calcule $f''$ puis on étudie son signe sur l'intervalle.",
      "$f'' \\ge 0$ donne convexe, $f'' \\le 0$ donne concave.",
      "On étudie le signe de $f''$."
    ),
    tags: ["terminale-spe", "convexite", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_convexite_defi_fixed_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "convexite_fonction",
    microId: "convexite_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $f(x) = x^3 - 6x^2$. Sur quel intervalle $f$ est-elle convexe ? (avec $f''(x) = 6x - 12$)",
    format: "qcm",
    choices: ["$[2\\,;+\\infty[$", "$]-\\infty\\,;2]$", "$\\mathbb{R}$", "$[0\\,;2]$"],
    expected: ["$[2\\,;+\\infty[$"],
    comparator: "mcq_exact",
    hint: "$f$ est convexe là où $f''(x) \\ge 0$.",
    explanation: exp(
      "On lit la convexité sur le signe de $f''$.",
      "$f''(x) = 6x - 12$ est positive quand $x \\ge 2$.",
      "Donc $f'' \\ge 0$ sur $[2\\,;+\\infty[$.",
      "$f$ est convexe sur $[2\\,;+\\infty[$."
    ),
    tags: ["terminale-spe", "convexite", "type_bac", "qcm"],
  },
];
