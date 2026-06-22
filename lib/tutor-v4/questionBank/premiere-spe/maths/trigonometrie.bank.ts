// lib/tutor-v4/questionBank/premiere-spe/maths/trigonometrie.bank.ts
//
// Chapitre : Fonctions trigonométriques (notion "trigonometrie")
// microSkills :
//   trig_radian          — radian et mesure d'un arc
//   trig_valeurs         — valeurs remarquables de cosinus et sinus
//   trig_cercle          — cercle trigonométrique, relation cos²+sin²=1
//   trig_angles_associes — angles associés, parité et périodicité
//
// PÉRIMÈTRE BO 2019 Première spé. Conventions : LaTeX, règle QCM. Canvas : fonctionGraphique (courbe cosinus via points).

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

function echantillonne(f: (x: number) => number, xmin: number, xmax: number, step: number) {
  const pts: { x: number; y: number }[] = [];
  for (let x = xmin; x <= xmax + 1e-9; x += step) {
    const xr = Math.round(x * 100) / 100;
    pts.push({ x: xr, y: Math.round(f(xr) * 100) / 100 });
  }
  return pts;
}

const courbeCos: CanvasFigure = {
  kind: "fonctionGraphique",
  size: { width: 340, height: 240 },
  xmin: -0.5,
  xmax: 7,
  ymin: -1.6,
  ymax: 1.6,
  grille: true,
  courbes: [{ id: "f", type: "points", couleur: "#2563eb", points: echantillonne((x) => Math.cos(x), 0, 6.6, 0.25) }],
};

export const trigonometrieBank: TutorBankItemV4[] = [
  /* ===================== TRIG_RADIAN ===================== */
  {
    kind: "fixed",
    id: "premiere_trig_rad_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_radian",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de degrés vaut $\\pi$ radians ?",
    format: "short",
    expected: ["180"],
    comparator: "number_equal",
    hint: "Un demi-tour.",
    explanation: exp(
      "Le radian est l'unité d'angle liée à la longueur d'arc.",
      "Un tour complet vaut $2\\pi$ rad $= 360°$.",
      "Donc $\\pi$ rad $= 180°$.",
      "$\\pi$ rad $= 180°$."
    ),
    tags: ["premiere", "maths", "trigonometrie", "radian", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_rad_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_radian",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de degrés vaut $\\dfrac{\\pi}{2}$ radians ?",
    format: "short",
    expected: ["90"],
    comparator: "number_equal",
    hint: "Quart de tour.",
    explanation: exp(
      "On part de $\\pi$ rad $= 180°$.",
      "$\\dfrac{\\pi}{2}$ rad $= \\dfrac{180°}{2}$.",
      "$= 90°$.",
      "$\\dfrac{\\pi}{2}$ rad $= 90°$."
    ),
    tags: ["premiere", "maths", "trigonometrie", "radian", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_rad_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_radian",
    difficulty: 3,
    theme: "neutral",
    text: "À quelle mesure en radians correspond $60°$ ?",
    format: "qcm",
    choices: ["$\\dfrac{\\pi}{3}$", "$\\dfrac{\\pi}{6}$", "$\\dfrac{\\pi}{2}$", "$\\dfrac{\\pi}{4}$"],
    expected: ["$\\dfrac{\\pi}{3}$"],
    comparator: "mcq_exact",
    hint: "$60 = \\dfrac{180}{3}$.",
    explanation: exp(
      "On convertit en multipliant par $\\dfrac{\\pi}{180}$.",
      "$60 \\times \\dfrac{\\pi}{180} = \\dfrac{\\pi}{3}$.",
      "Car $\\dfrac{60}{180} = \\dfrac{1}{3}$.",
      "$60° = \\dfrac{\\pi}{3}$ rad."
    ),
    tags: ["premiere", "maths", "trigonometrie", "radian", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_rad_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_radian",
    difficulty: 3,
    theme: "neutral",
    text: "Sur le cercle de rayon $1$, la longueur de l'arc correspondant à un angle de $\\theta$ radians vaut :",
    format: "qcm",
    choices: ["$\\theta$", "$2\\pi\\theta$", "$\\dfrac{\\theta}{2}$", "$\\theta^2$"],
    expected: ["$\\theta$"],
    comparator: "mcq_exact",
    hint: "C'est la définition du radian.",
    explanation: exp(
      "Le radian est défini pour que l'arc soit égal à l'angle sur le cercle de rayon $1$.",
      "Longueur d'arc $= r\\theta$, avec $r = 1$.",
      "$= \\theta$.",
      "La longueur de l'arc vaut $\\theta$."
    ),
    tags: ["premiere", "maths", "trigonometrie", "radian", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_rad_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_radian",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de degrés vaut $2\\pi$ radians (un tour complet) ?",
    format: "short",
    expected: ["360"],
    comparator: "number_equal",
    hint: "Tour complet.",
    explanation: exp(
      "Un tour complet du cercle correspond à $2\\pi$ radians.",
      "En degrés, un tour complet vaut $360°$.",
      "Donc $2\\pi$ rad $= 360°$.",
      "$2\\pi$ rad $= 360°$."
    ),
    tags: ["premiere", "maths", "trigonometrie", "radian", "short"],
  },
  {
    kind: "template",
    id: "premiere_trig_rad_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_radian",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplie les degrés par $\\dfrac{\\pi}{180}$.",
    tags: ["premiere", "maths", "trigonometrie", "radian", "template"],
    generate: () => {
      const cas = randomInt(0, 3);
      const data = [
        { deg: 30, rad: "$\\dfrac{\\pi}{6}$" },
        { deg: 45, rad: "$\\dfrac{\\pi}{4}$" },
        { deg: 90, rad: "$\\dfrac{\\pi}{2}$" },
        { deg: 180, rad: "$\\pi$" },
      ][cas];
      const correct = data.rad;
      const choices = [correct, "$\\dfrac{\\pi}{3}$", "$\\dfrac{2\\pi}{3}$", "$\\dfrac{\\pi}{5}$"].filter(
        (c, i) => i === 0 || c !== correct
      ).slice(0, 4);
      while (choices.length < 4) choices.push("$\\dfrac{\\pi}{8}$");
      return {
        text: `À quelle mesure en radians correspond $${data.deg}°$ ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On multiplie par $\\dfrac{\\pi}{180}$.",
          `$${data.deg} \\times \\dfrac{\\pi}{180}$.`,
          `$= ${data.rad.replace(/\$/g, "")}$.`,
          `$${data.deg}° = ${data.rad.replace(/\$/g, "")}$ rad.`
        ),
      };
    },
  },

  /* ===================== TRIG_VALEURS ===================== */
  {
    kind: "fixed",
    id: "premiere_trig_val_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_valeurs",
    difficulty: 2,
    theme: "neutral",
    text: "Combien vaut $\\cos(0)$ ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Point de départ du cercle.",
    explanation: exp(
      "En $0$, le point du cercle est $(1 ; 0)$.",
      "Le cosinus est l'abscisse de ce point.",
      "$\\cos(0) = 1$.",
      "$\\cos(0) = 1$."
    ),
    tags: ["premiere", "maths", "trigonometrie", "valeurs", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_val_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_valeurs",
    difficulty: 2,
    theme: "neutral",
    text: "Combien vaut $\\sin(0)$ ?",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "Ordonnée du point de départ.",
    explanation: exp(
      "En $0$, le point du cercle est $(1 ; 0)$.",
      "Le sinus est l'ordonnée de ce point.",
      "$\\sin(0) = 0$.",
      "$\\sin(0) = 0$."
    ),
    tags: ["premiere", "maths", "trigonometrie", "valeurs", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_val_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_valeurs",
    difficulty: 3,
    theme: "neutral",
    text: "Combien vaut $\\cos\\left(\\dfrac{\\pi}{3}\\right)$ ?",
    format: "qcm",
    choices: ["$\\dfrac{1}{2}$", "$\\dfrac{\\sqrt{3}}{2}$", "$\\dfrac{\\sqrt{2}}{2}$", "$1$"],
    expected: ["$\\dfrac{1}{2}$"],
    comparator: "mcq_exact",
    hint: "Valeur remarquable de $\\dfrac{\\pi}{3}$ ($60°$).",
    explanation: exp(
      "C'est une valeur remarquable à connaître.",
      "$\\cos\\left(\\dfrac{\\pi}{3}\\right) = \\dfrac{1}{2}$.",
      "(et $\\sin\\left(\\dfrac{\\pi}{3}\\right) = \\dfrac{\\sqrt{3}}{2}$).",
      "$\\dfrac{1}{2}$."
    ),
    tags: ["premiere", "maths", "trigonometrie", "valeurs", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_val_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_valeurs",
    difficulty: 3,
    theme: "neutral",
    text: "Combien vaut $\\sin\\left(\\dfrac{\\pi}{6}\\right)$ ?",
    format: "qcm",
    choices: ["$\\dfrac{1}{2}$", "$\\dfrac{\\sqrt{3}}{2}$", "$\\dfrac{\\sqrt{2}}{2}$", "$0$"],
    expected: ["$\\dfrac{1}{2}$"],
    comparator: "mcq_exact",
    hint: "Valeur remarquable de $\\dfrac{\\pi}{6}$ ($30°$).",
    explanation: exp(
      "C'est une valeur remarquable.",
      "$\\sin\\left(\\dfrac{\\pi}{6}\\right) = \\dfrac{1}{2}$.",
      "(et $\\cos\\left(\\dfrac{\\pi}{6}\\right) = \\dfrac{\\sqrt{3}}{2}$).",
      "$\\dfrac{1}{2}$."
    ),
    tags: ["premiere", "maths", "trigonometrie", "valeurs", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_val_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_valeurs",
    difficulty: 3,
    theme: "neutral",
    text: "Combien vaut $\\cos\\left(\\dfrac{\\pi}{4}\\right)$ ?",
    format: "qcm",
    choices: ["$\\dfrac{\\sqrt{2}}{2}$", "$\\dfrac{1}{2}$", "$\\dfrac{\\sqrt{3}}{2}$", "$1$"],
    expected: ["$\\dfrac{\\sqrt{2}}{2}$"],
    comparator: "mcq_exact",
    hint: "$45°$ : cosinus et sinus égaux.",
    explanation: exp(
      "À $\\dfrac{\\pi}{4}$ ($45°$), cosinus et sinus sont égaux.",
      "$\\cos\\left(\\dfrac{\\pi}{4}\\right) = \\sin\\left(\\dfrac{\\pi}{4}\\right) = \\dfrac{\\sqrt{2}}{2}$.",
      "C'est une valeur remarquable.",
      "$\\dfrac{\\sqrt{2}}{2}$."
    ),
    tags: ["premiere", "maths", "trigonometrie", "valeurs", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_val_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_valeurs",
    difficulty: 2,
    theme: "neutral",
    text: "Combien vaut $\\cos\\left(\\dfrac{\\pi}{2}\\right)$ ?",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "Point en haut du cercle $(0 ; 1)$.",
    explanation: exp(
      "À $\\dfrac{\\pi}{2}$, le point du cercle est $(0 ; 1)$.",
      "Le cosinus est l'abscisse : $0$.",
      "$\\cos\\left(\\dfrac{\\pi}{2}\\right) = 0$.",
      "$\\cos\\left(\\dfrac{\\pi}{2}\\right) = 0$."
    ),
    tags: ["premiere", "maths", "trigonometrie", "valeurs", "short"],
  },
  {
    kind: "template",
    id: "premiere_trig_val_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_valeurs",
    difficulty: 3,
    theme: "neutral",
    hint: "Valeurs remarquables à mémoriser.",
    tags: ["premiere", "maths", "trigonometrie", "valeurs", "template"],
    generate: () => {
      const cas = randomInt(0, 3);
      const data = [
        { q: "\\cos\\left(\\dfrac{\\pi}{3}\\right)", v: "$\\dfrac{1}{2}$" },
        { q: "\\sin\\left(\\dfrac{\\pi}{6}\\right)", v: "$\\dfrac{1}{2}$" },
        { q: "\\cos\\left(\\dfrac{\\pi}{6}\\right)", v: "$\\dfrac{\\sqrt{3}}{2}$" },
        { q: "\\sin\\left(\\dfrac{\\pi}{4}\\right)", v: "$\\dfrac{\\sqrt{2}}{2}$" },
      ][cas];
      const choices = ["$\\dfrac{1}{2}$", "$\\dfrac{\\sqrt{2}}{2}$", "$\\dfrac{\\sqrt{3}}{2}$", "$1$"];
      // garantir que la bonne réponse est en 1re position
      const ordered = [data.v, ...choices.filter((c) => c !== data.v)].slice(0, 4);
      return {
        text: `Combien vaut $${data.q}$ ?`,
        format: "qcm",
        choices: ordered,
        expected: [data.v],
        comparator: "mcq_exact",
        explanation: exp(
          "C'est une valeur remarquable à connaître par cœur.",
          "On la lit sur le cercle trigonométrique.",
          `$${data.q} = ${data.v.replace(/\$/g, "")}$.`,
          `${data.v}.`
        ),
      };
    },
  },

  /* ===================== TRIG_CERCLE ===================== */
  {
    kind: "fixed",
    id: "premiere_trig_cer_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_cercle",
    difficulty: 2,
    theme: "neutral",
    text: "Sur le cercle trigonométrique, à l'angle $x$ on associe le point de coordonnées :",
    format: "qcm",
    choices: ["$(\\cos x ; \\sin x)$", "$(\\sin x ; \\cos x)$", "$(\\tan x ; 1)$", "$(x ; x)$"],
    expected: ["$(\\cos x ; \\sin x)$"],
    comparator: "mcq_exact",
    hint: "Abscisse = cosinus, ordonnée = sinus.",
    explanation: exp(
      "Le cercle trigonométrique a pour rayon $1$.",
      "L'abscisse du point est le cosinus, l'ordonnée est le sinus.",
      "Le point est $(\\cos x ; \\sin x)$.",
      "$(\\cos x ; \\sin x)$."
    ),
    tags: ["premiere", "maths", "trigonometrie", "cercle", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_cer_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_cercle",
    difficulty: 3,
    theme: "neutral",
    text: "Pour tout réel $x$, combien vaut $\\cos^2 x + \\sin^2 x$ ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Théorème de Pythagore sur le cercle de rayon $1$.",
    explanation: exp(
      "Le point $(\\cos x ; \\sin x)$ est sur le cercle de rayon $1$.",
      "Sa distance au centre vaut $1$ : $\\cos^2 x + \\sin^2 x = 1^2$.",
      "$= 1$.",
      "$\\cos^2 x + \\sin^2 x = 1$."
    ),
    tags: ["premiere", "maths", "trigonometrie", "cercle", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_cer_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_cercle",
    difficulty: 4,
    theme: "neutral",
    text: "On sait que $\\cos x = \\dfrac{3}{5}$ et $\\sin x > 0$. Combien vaut $\\sin x$ ?",
    format: "qcm",
    choices: ["$\\dfrac{4}{5}$", "$\\dfrac{2}{5}$", "$-\\dfrac{4}{5}$", "$\\dfrac{1}{5}$"],
    expected: ["$\\dfrac{4}{5}$"],
    comparator: "mcq_exact",
    hint: "$\\sin^2 x = 1 - \\cos^2 x$.",
    explanation: exp(
      "On utilise $\\cos^2 x + \\sin^2 x = 1$.",
      "$\\sin^2 x = 1 - \\dfrac{9}{25} = \\dfrac{16}{25}$.",
      "Comme $\\sin x > 0$, $\\sin x = \\dfrac{4}{5}$.",
      "$\\sin x = \\dfrac{4}{5}$."
    ),
    tags: ["premiere", "maths", "trigonometrie", "cercle", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_cer_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_cercle",
    difficulty: 3,
    theme: "neutral",
    text: "Pour un angle $x$ tel que $0 < x < \\dfrac{\\pi}{2}$ (1er quadrant), $\\cos x$ et $\\sin x$ sont :",
    format: "qcm",
    choices: ["tous deux positifs", "tous deux négatifs", "de signes opposés", "nuls"],
    expected: ["tous deux positifs"],
    comparator: "mcq_exact",
    hint: "Premier quadrant du cercle.",
    explanation: exp(
      "Dans le premier quadrant, le point est en haut à droite.",
      "Abscisse $> 0$ et ordonnée $> 0$.",
      "Donc $\\cos x > 0$ et $\\sin x > 0$.",
      "Tous deux positifs."
    ),
    tags: ["premiere", "maths", "trigonometrie", "cercle", "qcm"],
  },
  {
    kind: "template",
    id: "premiere_trig_cer_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_cercle",
    difficulty: 4,
    theme: "neutral",
    hint: "$\\sin^2 x = 1 - \\cos^2 x$ (triplet pythagoricien).",
    tags: ["premiere", "maths", "trigonometrie", "cercle", "template"],
    generate: () => {
      // triplets (a,b,c) avec a²+b²=c²
      const triplets = [
        { a: 3, b: 4, c: 5 },
        { a: 6, b: 8, c: 10 },
        { a: 5, b: 12, c: 13 },
        { a: 8, b: 15, c: 17 },
      ];
      const t = triplets[randomInt(0, triplets.length - 1)];
      const correct = `$\\dfrac{${t.b}}{${t.c}}$`;
      const choices = [correct, `$\\dfrac{${t.a}}{${t.c}}$`, `$-\\dfrac{${t.b}}{${t.c}}$`, `$\\dfrac{1}{${t.c}}$`];
      return {
        text: `On sait que $\\cos x = \\dfrac{${t.a}}{${t.c}}$ et $\\sin x > 0$. Combien vaut $\\sin x$ ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On utilise $\\cos^2 x + \\sin^2 x = 1$.",
          `$\\sin^2 x = 1 - \\dfrac{${t.a * t.a}}{${t.c * t.c}} = \\dfrac{${t.b * t.b}}{${t.c * t.c}}$.`,
          `Comme $\\sin x > 0$, $\\sin x = \\dfrac{${t.b}}{${t.c}}$.`,
          `$\\sin x = \\dfrac{${t.b}}{${t.c}}$.`
        ),
      };
    },
  },

  /* ===================== TRIG_ANGLES_ASSOCIES ===================== */
  {
    kind: "fixed",
    id: "premiere_trig_ang_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_angles_associes",
    difficulty: 2,
    theme: "neutral",
    text: "La fonction cosinus est paire. Cela signifie que :",
    format: "qcm",
    choices: ["$\\cos(-x) = \\cos(x)$", "$\\cos(-x) = -\\cos(x)$", "$\\cos(-x) = \\sin(x)$", "$\\cos(-x) = 0$"],
    expected: ["$\\cos(-x) = \\cos(x)$"],
    comparator: "mcq_exact",
    hint: "Paire = symétrie par rapport à l'axe des ordonnées.",
    explanation: exp(
      "Une fonction paire vérifie $f(-x) = f(x)$.",
      "Le cosinus est pair.",
      "$\\cos(-x) = \\cos(x)$.",
      "$\\cos(-x) = \\cos(x)$."
    ),
    tags: ["premiere", "maths", "trigonometrie", "angles_associes", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_ang_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_angles_associes",
    difficulty: 2,
    theme: "neutral",
    text: "La fonction sinus est impaire. Cela signifie que :",
    format: "qcm",
    choices: ["$\\sin(-x) = -\\sin(x)$", "$\\sin(-x) = \\sin(x)$", "$\\sin(-x) = \\cos(x)$", "$\\sin(-x) = 1$"],
    expected: ["$\\sin(-x) = -\\sin(x)$"],
    comparator: "mcq_exact",
    hint: "Impaire = symétrie par rapport à l'origine.",
    explanation: exp(
      "Une fonction impaire vérifie $f(-x) = -f(x)$.",
      "Le sinus est impair.",
      "$\\sin(-x) = -\\sin(x)$.",
      "$\\sin(-x) = -\\sin(x)$."
    ),
    tags: ["premiere", "maths", "trigonometrie", "angles_associes", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_ang_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_angles_associes",
    difficulty: 3,
    theme: "neutral",
    text: "Les fonctions cosinus et sinus sont périodiques de période :",
    format: "qcm",
    choices: ["$2\\pi$", "$\\pi$", "$\\dfrac{\\pi}{2}$", "$1$"],
    expected: ["$2\\pi$"],
    comparator: "mcq_exact",
    hint: "Un tour complet du cercle.",
    explanation: exp(
      "Après un tour complet, on retrouve le même point du cercle.",
      "Un tour vaut $2\\pi$ radians.",
      "$\\cos(x + 2\\pi) = \\cos(x)$ et $\\sin(x + 2\\pi) = \\sin(x)$.",
      "La période est $2\\pi$."
    ),
    canvas: courbeCos,
    tags: ["premiere", "maths", "trigonometrie", "angles_associes", "canvas", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_ang_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_angles_associes",
    difficulty: 4,
    theme: "neutral",
    text: "Combien vaut $\\cos(x + 2\\pi)$ ?",
    format: "qcm",
    choices: ["$\\cos(x)$", "$-\\cos(x)$", "$\\sin(x)$", "$\\cos(x) + 2\\pi$"],
    expected: ["$\\cos(x)$"],
    comparator: "mcq_exact",
    hint: "Périodicité $2\\pi$.",
    explanation: exp(
      "Le cosinus est périodique de période $2\\pi$.",
      "Ajouter $2\\pi$ revient à faire un tour complet.",
      "$\\cos(x + 2\\pi) = \\cos(x)$.",
      "$\\cos(x)$."
    ),
    canvas: courbeCos,
    tags: ["premiere", "maths", "trigonometrie", "angles_associes", "canvas", "qcm"],
  },
  {
    kind: "template",
    id: "premiere_trig_ang_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_angles_associes",
    difficulty: 3,
    theme: "neutral",
    hint: "Parité : cos pair, sin impair.",
    tags: ["premiere", "maths", "trigonometrie", "angles_associes", "template"],
    generate: () => {
      const cos = randomInt(0, 1) === 1;
      const correct = cos ? "$\\cos(x)$" : "$-\\sin(x)$";
      const q = cos ? "\\cos(-x)" : "\\sin(-x)";
      const choices = cos
        ? ["$\\cos(x)$", "$-\\cos(x)$", "$\\sin(x)$", "$-\\sin(x)$"]
        : ["$-\\sin(x)$", "$\\sin(x)$", "$\\cos(x)$", "$-\\cos(x)$"];
      return {
        text: `À quoi est égal $${q}$ ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          cos ? "Le cosinus est pair : $\\cos(-x) = \\cos(x)$." : "Le sinus est impair : $\\sin(-x) = -\\sin(x)$.",
          "On applique la parité de la fonction.",
          `$${q} = ${correct.replace(/\$/g, "")}$.`,
          `${correct}.`
        ),
      };
    },
  },
];
