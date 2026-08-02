// lib/tutor-v4/questionBank/premiere-spe/maths/trigonometrie.bank.ts
//
// Chapitre : Fonctions trigonométriques (notion "trigonometrie")
// microSkills :
//   trig_radian             — radian et conversion avec les degrés
//   trig_arc                — longueur d'un arc sur le cercle trigonométrique
//   trig_enroulement        — enrouler la droite numérique : image d'un réel
//   trig_cercle             — cercle trigonométrique, relation cos²+sin²=1
//   trig_cos_sin            — cosinus et sinus d'un réel comme coordonnées
//   trig_triangle_rectangle — lien avec le triangle rectangle du collège
//   trig_valeurs            — valeurs remarquables de cosinus et sinus
//   trig_angles_associes    — angles associés lus sur le cercle
//   trig_parite             — parité de cosinus et sinus, traduction graphique
//   trig_periodicite        — périodicité, traduction graphique
//   trig_courbes            — courbes de cosinus et sinus, lien avec le cercle
//
// PÉRIMÈTRE BO 2019 Première spé. Conventions : LaTeX, règle QCM.
// Canvas : fonctionGraphique (courbes de cosinus et sinus via points) et
// cercle (cercle trigonométrique avec le point image et son arc).
//
// Règle d'écriture : `fixed` pour les pièges, les propriétés et les contextes
// réels ; `template` dès qu'on peut changer les nombres sans changer la
// question ; plusieurs questions ouvertes par micro-compétence, dont au moins
// un TEMPLATE ouvert — sinon la question ouverte se répète elle aussi.

import type { TutorBankItemV4, CanvasFigure } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickOne<T>(arr: readonly T[]): T {
  return arr[randomInt(0, arr.length - 1)];
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

/** Cosinus sur deux périodes : la répétition doit se voir, pas se deviner. */
const courbeCosDeuxPeriodes: CanvasFigure = {
  kind: "fonctionGraphique",
  size: { width: 340, height: 230 },
  xmin: -6.5,
  xmax: 6.5,
  ymin: -1.6,
  ymax: 1.6,
  grille: true,
  courbes: [
    { id: "cos", type: "points", couleur: "#2563eb", points: echantillonne((x) => Math.cos(x), -6.3, 6.3, 0.2) },
  ],
};

/** Les deux courbes ensemble : même allure, décalée d'un quart de tour. */
const courbeCosSin: CanvasFigure = {
  kind: "fonctionGraphique",
  size: { width: 340, height: 240 },
  xmin: -0.5,
  xmax: 7,
  ymin: -1.6,
  ymax: 1.6,
  grille: true,
  courbes: [
    { id: "cos", type: "points", couleur: "#2563eb", points: echantillonne((x) => Math.cos(x), 0, 6.6, 0.2) },
    { id: "sin", type: "points", couleur: "#ea580c", points: echantillonne((x) => Math.sin(x), 0, 6.6, 0.2) },
  ],
};

/** Courbe de sinus seule, pour l'imparité (symétrie par rapport à l'origine). */
const courbeSinSymetrie: CanvasFigure = {
  kind: "fonctionGraphique",
  size: { width: 340, height: 230 },
  xmin: -6.5,
  xmax: 6.5,
  ymin: -1.6,
  ymax: 1.6,
  grille: true,
  courbes: [
    { id: "sin", type: "points", couleur: "#ea580c", points: echantillonne((x) => Math.sin(x), -6.3, 6.3, 0.2) },
  ],
};

/* Le cercle trigonométrique dessiné.
   ⚠️ CercleCanvas travaille en pixels de l'image, l'axe des ordonnées vers le
   BAS : un réel d'angle θ (sens direct, donc vers le haut) se place en
   (cx + r·cos θ ; cy − r·sin θ).
   ⚠️ L'arc, lui, est toujours tracé de l'angle le PLUS PETIT vers le plus grand
   (CercleCanvas impose le drapeau de balayage 1). Décrire un arc « de −θ à 0 »
   marche pour θ positif ; pour θ négatif il faut décrire « de 0 à −θ », sinon
   SVG choisit l'autre cercle possible et l'arc se dessine du mauvais côté. */
function cercleTrigo(angleDeg: number, labelPoint: string, labelArc?: string): CanvasFigure {
  const cx = 170;
  const cy = 140;
  const r = 105;
  const rad = (angleDeg * Math.PI) / 180;
  const [debutArc, finArc] = angleDeg >= 0 ? [-angleDeg, 0] : [0, -angleDeg];
  return {
    kind: "cercle",
    size: { width: 340, height: 280 },
    circle: { cx, cy, r, showCircle: true },
    points: [
      { id: "O", x: cx, y: cy, label: "O", color: "#0f172a", highlight: true },
      { id: "I", x: cx + r, y: cy, label: "I" },
      {
        id: "M",
        x: Math.round(cx + r * Math.cos(rad)),
        y: Math.round(cy - r * Math.sin(rad)),
        label: labelPoint,
        color: "#dc2626",
        highlight: true,
      },
    ],
    segments: [
      { id: "rayon-i", kind: "rayon", from: "O", to: "I", color: "#94a3b8" },
      { id: "rayon-m", kind: "rayon", from: "O", to: "M", color: "#dc2626" },
    ],
    arcs: [{ id: "arc", startAngle: debutArc, endAngle: finArc, label: labelArc, color: "#dc2626", highlight: true }],
    display: { showLabels: true, showPoints: true, showCenter: true },
  };
}

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
    kind: "fixed",
    id: "premiere_trig_rad_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_radian",
    difficulty: 3,
    theme: "neutral",
    text: "À quelle mesure en radians correspond $30°$ ?",
    format: "qcm",
    choices: [
      "$\\dfrac{\\pi}{6}$",
      "$\\dfrac{\\pi}{3}$",
      "$\\dfrac{\\pi}{30}$",
      "$\\dfrac{\\pi}{4}$",
    ],
    expected: ["$\\dfrac{\\pi}{6}$"],
    comparator: "mcq_exact",
    hint: "$180°$ correspond à $\\pi$ : combien de fois $30°$ tient-il dans $180°$ ?",
    explanation: exp(
      "La conversion repose sur la proportionnalité : $180° = \\pi$ rad.",
      "$30°$ est la sixième partie de $180°$, car $180 \\div 30 = 6$.",
      "La mesure en radians est donc la sixième partie de $\\pi$ : $\\dfrac{\\pi}{6}$.",
      "$30° = \\dfrac{\\pi}{6}$ rad."
    ),
    tags: ["premiere", "maths", "trigonometrie", "radian", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_rad_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_radian",
    difficulty: 3,
    theme: "neutral",
    text: "Combien de degrés vaut $\\dfrac{\\pi}{4}$ radians ?",
    format: "short",
    expected: ["45"],
    comparator: "number_equal",
    hint: "$\\pi$ rad $= 180°$ : divise par $4$.",
    explanation: exp(
      "On part de l'égalité de référence $\\pi$ rad $= 180°$.",
      "$\\dfrac{\\pi}{4}$ correspond donc à $\\dfrac{180}{4}$ degrés.",
      "$= 45°$.",
      "$\\dfrac{\\pi}{4}$ rad $= 45°$."
    ),
    tags: ["premiere", "maths", "trigonometrie", "radian", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_rad_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_radian",
    difficulty: 4,
    theme: "neutral",
    text: "Pour convertir une mesure de degrés en radians, par quoi multiplie-t-on ?",
    format: "qcm",
    choices: [
      "$\\dfrac{\\pi}{180}$",
      "$\\dfrac{180}{\\pi}$",
      "$\\pi$",
      "$\\dfrac{\\pi}{360}$",
    ],
    expected: ["$\\dfrac{\\pi}{180}$"],
    comparator: "mcq_exact",
    hint: "Vérifie sur $180°$ : le résultat doit donner $\\pi$.",
    explanation: exp(
      "La conversion est une proportionnalité de coefficient $\\dfrac{\\pi}{180}$, puisque $180° = \\pi$ rad.",
      "Contrôle : $180 \\times \\dfrac{\\pi}{180} = \\pi$. C'est cohérent.",
      "Le coefficient $\\dfrac{180}{\\pi}$ fait l'opération INVERSE : radians vers degrés.",
      "On multiplie par $\\dfrac{\\pi}{180}$."
    ),
    tags: ["premiere", "maths", "trigonometrie", "radian", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_rad_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_radian",
    difficulty: 3,
    theme: "neutral",
    text: "À quelle mesure en radians correspond $90°$ ?",
    format: "qcm",
    choices: [
      "$\\dfrac{\\pi}{2}$",
      "$\\dfrac{\\pi}{4}$",
      "$\\pi$",
      "$\\dfrac{\\pi}{90}$",
    ],
    expected: ["$\\dfrac{\\pi}{2}$"],
    comparator: "mcq_exact",
    hint: "Un quart de tour, soit la moitié de $180°$.",
    explanation: exp(
      "$180°$ correspond à $\\pi$ radians.",
      "$90°$ en est la moitié.",
      "La mesure cherchée est donc $\\dfrac{\\pi}{2}$ : c'est l'angle droit, un quart de tour.",
      "$90° = \\dfrac{\\pi}{2}$ rad."
    ),
    tags: ["premiere", "maths", "trigonometrie", "radian", "qcm"],
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

  {
    kind: "fixed",
    id: "premiere_trig_rad_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_radian",
    difficulty: 5,
    theme: "neutral",
    text: "À quoi sert le radian, alors qu'on savait déjà mesurer les angles en degrés ?",
    format: "open",
    expected: ["longueur de l'arc", "longueur d'arc", "rayon 1", "meme nombre", "même nombre", "arc intercepte", "arc intercepté"],
    comparator: "contains_keyword",
    hint: "Compare la mesure de l'angle et la longueur de l'arc qu'il découpe sur le cercle de rayon $1$.",
    explanation: exp(
      "Le degré est un choix arbitraire : on a décidé de couper le tour en $360$ parts, sans raison mathématique.",
      "Le radian, lui, est défini par la figure elle-même : la mesure de l'angle est la longueur de l'arc qu'il intercepte sur le cercle de rayon $1$.",
      "Angle et longueur deviennent alors le même nombre — un demi-tour mesure $\\pi$, et le demi-cercle a pour longueur $\\pi$. C'est ce qui rendra les formules de dérivation simples en Terminale : avec des degrés, il faudrait traîner un facteur $\\pi/180$ partout.",
      "Le radian relie la mesure de l'angle à une longueur : c'est une unité qui vient de la figure, pas d'une convention."
    ),
    tags: ["premiere", "maths", "trigonometrie", "radian", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_rad_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_radian",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève écrit $\\cos(60) = 0{,}5$ sur sa calculatrice en mode radian et ne comprend pas son résultat. Explique.",
    format: "open",
    expected: ["degre", "degré", "radian", "unite", "unité", "mode"],
    comparator: "contains_keyword",
    hint: "En mode radian, que représente le nombre $60$ pour la machine ?",
    explanation: exp(
      "Un même nombre ne désigne pas le même angle selon l'unité : $60$ degrés et $60$ radians n'ont rien à voir.",
      "En mode radian, la calculatrice comprend « $60$ radians », soit environ $9{,}5$ tours complets.",
      "Elle affiche donc $\\cos(60) \\approx -0{,}95$, et non $0{,}5$. Pour obtenir $0{,}5$, il fallait entrer $\\dfrac{\\pi}{3}$, la mesure en radians de $60°$.",
      "L'élève a mélangé les unités : en radian, il faut entrer $\\dfrac{\\pi}{3}$, pas $60$."
    ),
    tags: ["premiere", "maths", "trigonometrie", "radian", "piege", "open"],
  },
  {
    kind: "template",
    id: "premiere_trig_rad_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_radian",
    difficulty: 5,
    theme: "neutral",
    hint: "Un demi-tour vaut $180°$ et $\\pi$ radians : c'est le seul repère à retenir.",
    tags: ["premiere", "maths", "trigonometrie", "radian", "open", "template"],
    generate: () => {
      const cas = [
        { deg: 45, rad: "\\dfrac{\\pi}{4}", mots: ["180", "pi/4", "quart", "divise"] },
        { deg: 120, rad: "\\dfrac{2\\pi}{3}", mots: ["180", "2pi/3", "deux tiers", "multiplie"] },
        { deg: 270, rad: "\\dfrac{3\\pi}{2}", mots: ["180", "3pi/2", "trois quarts", "multiplie"] },
        { deg: 15, rad: "\\dfrac{\\pi}{12}", mots: ["180", "pi/12", "douze", "divise"] },
        { deg: 210, rad: "\\dfrac{7\\pi}{6}", mots: ["180", "7pi/6", "multiplie"] },
      ];
      const c = pickOne(cas);
      return {
        text: `Convertis $${c.deg}°$ en radians, et explique la méthode que tu utilises.`,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: exp(
          "La conversion repose sur une seule égalité : $180° = \\pi$ radians.",
          `On passe donc des degrés aux radians en multipliant par $\\dfrac{\\pi}{180}$ : $${c.deg} \\times \\dfrac{\\pi}{180}$.`,
          `On simplifie la fraction $\\dfrac{${c.deg}}{180}$ avant de conclure.`,
          `$${c.deg}° = ${c.rad}$ radians.`
        ),
      };
    },
  },

  /* ===================== TRIG_ARC ===================== */
  {
    kind: "fixed",
    id: "premiere_trig_rad_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_arc",
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
    tags: ["premiere", "maths", "trigonometrie", "arc", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_rad_fixed_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_arc",
    difficulty: 4,
    theme: "neutral",
    text: "Sur le cercle trigonométrique, quelle est la longueur de l'arc correspondant à un angle de $\\dfrac{\\pi}{3}$ radians ?",
    format: "qcm",
    choices: [
      "$\\dfrac{\\pi}{3}$",
      "$60$",
      "$\\dfrac{\\pi}{6}$",
      "$\\dfrac{2\\pi}{3}$",
    ],
    expected: ["$\\dfrac{\\pi}{3}$"],
    comparator: "mcq_exact",
    hint: "Sur le cercle de rayon $1$, longueur d'arc et mesure en radians sont le même nombre.",
    explanation: exp(
      "Sur un cercle de rayon $R$, la longueur d'un arc vaut $R\\theta$ avec $\\theta$ en radians.",
      "Le cercle trigonométrique a pour rayon $R = 1$ : la longueur vaut donc $1 \\times \\theta = \\theta$.",
      "C'est toute l'idée du radian : la mesure de l'angle EST la longueur de l'arc intercepté.",
      "La longueur de l'arc vaut $\\dfrac{\\pi}{3}$."
    ),
    canvas: cercleTrigo(60, "M", "π/3"),
    tags: ["premiere", "maths", "trigonometrie", "arc", "canvas", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_rad_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_arc",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la longueur totale du cercle trigonométrique ?",
    format: "qcm",
    choices: ["$2\\pi$", "$\\pi$", "$360$", "$4\\pi$"],
    expected: ["$2\\pi$"],
    comparator: "mcq_exact",
    hint: "Périmètre d'un cercle : $2\\pi R$, avec $R = 1$.",
    explanation: exp(
      "Le périmètre d'un cercle de rayon $R$ vaut $2\\pi R$.",
      "Le cercle trigonométrique a pour rayon $1$ : son périmètre vaut $2\\pi \\times 1$.",
      "$= 2\\pi$, ce qui correspond bien au tour complet de $2\\pi$ radians.",
      "La longueur totale est $2\\pi$."
    ),
    tags: ["premiere", "maths", "trigonometrie", "arc", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_arc_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_arc",
    difficulty: 4,
    theme: "neutral",
    text: "Sur un cercle de rayon $R$, la longueur de l'arc intercepté par un angle de $\\theta$ radians vaut :",
    format: "qcm",
    choices: ["$R\\theta$", "$\\theta$", "$\\dfrac{\\theta}{R}$", "$2\\pi R\\theta$"],
    expected: ["$R\\theta$"],
    comparator: "mcq_exact",
    hint: "La formule « longueur $= \\theta$ » n'est vraie que dans un cas particulier : lequel ?",
    explanation: exp(
      "La longueur d'un arc est proportionnelle au rayon ET à l'angle : elle vaut $R\\theta$, avec $\\theta$ en radians.",
      "Sur le cercle trigonométrique, $R = 1$ et la formule se réduit à $\\theta$ — c'est le cas particulier qu'on rencontre le plus souvent.",
      "Il ne faut pas en faire une règle générale : sur un cercle de rayon $4$, un angle de $2$ radians intercepte un arc de $8$, pas de $2$.",
      "La longueur vaut $R\\theta$."
    ),
    tags: ["premiere", "maths", "trigonometrie", "arc", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_arc_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_arc",
    difficulty: 5,
    theme: "neutral",
    text: "Pour un cercle de rayon $2$ et un angle de $30°$, un élève calcule la longueur de l'arc en écrivant $2 \\times 30 = 60$. Quelle est son erreur ?",
    format: "qcm",
    choices: [
      "la formule $R\\theta$ exige $\\theta$ en RADIANS, pas en degrés",
      "il fallait diviser par le rayon",
      "il fallait multiplier par $2\\pi$",
      "aucune : sa réponse est correcte",
    ],
    expected: ["la formule $R\\theta$ exige $\\theta$ en RADIANS, pas en degrés"],
    comparator: "mcq_exact",
    hint: "Un arc de $60$ sur un cercle de rayon $2$ : est-ce seulement possible ?",
    explanation: exp(
      "La formule $L = R\\theta$ n'est valable que si l'angle est mesuré en radians.",
      "$30° = \\dfrac{\\pi}{6}$ radians, donc $L = 2 \\times \\dfrac{\\pi}{6} = \\dfrac{\\pi}{3} \\approx 1{,}05$.",
      "Sa réponse était absurde : le cercle entier ne mesure que $2\\pi \\times 2 \\approx 12{,}6$, un arc ne peut pas faire $60$.",
      "Il a oublié de convertir en radians : l'arc mesure $\\dfrac{\\pi}{3} \\approx 1{,}05$."
    ),
    tags: ["premiere", "maths", "trigonometrie", "arc", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_arc_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_arc",
    difficulty: 3,
    theme: "neutral",
    text: "Sur le cercle trigonométrique, un arc de longueur $\\pi$ correspond à :",
    format: "qcm",
    choices: ["un demi-tour", "un quart de tour", "un tour complet", "un tiers de tour"],
    expected: ["un demi-tour"],
    comparator: "mcq_exact",
    hint: "Le tour complet mesure $2\\pi$.",
    explanation: exp(
      "Sur le cercle trigonométrique, la longueur de l'arc EST la mesure de l'angle en radians.",
      "Le tour complet vaut $2\\pi$ ; un arc de longueur $\\pi$ en représente donc la moitié.",
      "C'est cohérent avec les degrés : un demi-tour vaut $180°$, et $180° = \\pi$ radians.",
      "Un arc de longueur $\\pi$ correspond à un demi-tour."
    ),
    canvas: cercleTrigo(180, "M", "π"),
    tags: ["premiere", "maths", "trigonometrie", "arc", "canvas", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_arc_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_arc",
    difficulty: 5,
    theme: "reunion",
    text: "La piste circulaire du stade de Saint-Louis a un rayon de $50$ m. Un coureur parcourt un arc correspondant à un angle au centre de $1{,}2$ radian. Quelle distance a-t-il parcourue ?",
    format: "qcm",
    choices: ["$60$ m", "$1{,}2$ m", "$41{,}7$ m", "$377$ m"],
    expected: ["$60$ m"],
    comparator: "mcq_exact",
    hint: "$L = R\\theta$, avec l'angle déjà en radians.",
    explanation: exp(
      "La distance parcourue sur un cercle est la longueur de l'arc : $L = R\\theta$, l'angle étant en radians.",
      "Ici $R = 50$ m et $\\theta = 1{,}2$ rad — pas besoin de convertir, l'angle est déjà en radians.",
      "$L = 50 \\times 1{,}2 = 60$ m. À titre de comparaison, le tour complet mesurerait $2\\pi \\times 50 \\approx 314$ m.",
      "Il a parcouru $60$ m."
    ),
    tags: ["premiere", "maths", "trigonometrie", "arc", "reunion", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_arc_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_arc",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi, sur le cercle trigonométrique, la mesure d'un angle en radians et la longueur de l'arc qu'il intercepte sont le même nombre.",
    format: "open",
    expected: ["rayon 1", "rayon vaut 1", "R = 1", "definition du radian", "définition du radian", "R theta", "rtheta"],
    comparator: "contains_keyword",
    hint: "Écris la formule générale, puis remplace le rayon par sa valeur.",
    explanation: exp(
      "Sur un cercle de rayon $R$, la longueur d'un arc vaut $L = R\\theta$, avec $\\theta$ en radians.",
      "Le cercle trigonométrique est celui de rayon $1$ : on remplace $R$ par $1$.",
      "$L = 1 \\times \\theta = \\theta$ : la longueur et la mesure de l'angle sont bien le même nombre.",
      "C'est parce que le rayon vaut $1$ — et c'est précisément la raison d'être du radian."
    ),
    tags: ["premiere", "maths", "trigonometrie", "arc", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_arc_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_arc",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève affirme que la longueur d'un arc est toujours égale à la mesure de l'angle en radians. Donne un contre-exemple et corrige.",
    format: "open",
    expected: ["rayon", "R theta", "rtheta", "contre-exemple", "contre exemple", "seulement si"],
    comparator: "contains_keyword",
    hint: "Prends un cercle dont le rayon n'est pas $1$.",
    explanation: exp(
      "L'affirmation confond le cas général et le cas particulier du cercle trigonométrique.",
      "Contre-exemple : sur un cercle de rayon $3$, un angle de $2$ radians intercepte un arc de $3 \\times 2 = 6$, et non $2$.",
      "La formule générale est $L = R\\theta$ ; elle ne se simplifie en $L = \\theta$ que lorsque $R = 1$.",
      "C'est vrai seulement sur le cercle de rayon $1$ : sinon, la longueur vaut $R\\theta$."
    ),
    tags: ["premiere", "maths", "trigonometrie", "arc", "open"],
  },
  {
    kind: "template",
    id: "premiere_trig_arc_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_arc",
    difficulty: 4,
    theme: "neutral",
    hint: "$L = R\\theta$, avec $\\theta$ en radians.",
    tags: ["premiere", "maths", "trigonometrie", "arc", "template"],
    generate: () => {
      const R = randomInt(2, 9);
      const cas = pickOne([
        { t: "\\dfrac{\\pi}{2}", num: "\\dfrac{\\pi}{2}", mult: (r: number) => `\\dfrac{${r}\\pi}{2}` },
        { t: "\\dfrac{\\pi}{3}", num: "\\dfrac{\\pi}{3}", mult: (r: number) => `\\dfrac{${r}\\pi}{3}` },
        { t: "\\dfrac{\\pi}{4}", num: "\\dfrac{\\pi}{4}", mult: (r: number) => `\\dfrac{${r}\\pi}{4}` },
        { t: "\\pi", num: "\\pi", mult: (r: number) => `${r}\\pi` },
      ]);
      const correct = `$${cas.mult(R)}$`;
      return {
        text: `Sur un cercle de rayon $${R}$, quelle est la longueur de l'arc intercepté par un angle de $${cas.t}$ radians ?`,
        format: "qcm",
        choices: [correct, `$${cas.num}$`, `$${R}$`, `$${2 * R}\\pi$`],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "La longueur d'un arc vaut $L = R\\theta$, l'angle étant mesuré en radians.",
          `Ici $R = ${R}$ et $\\theta = ${cas.t}$.`,
          `$L = ${R} \\times ${cas.t} = ${cas.mult(R)}$.`,
          `La longueur de l'arc vaut ${correct}.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_trig_arc_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_arc",
    difficulty: 5,
    theme: "neutral",
    hint: "Pars de $L = R\\theta$ et cherche $\\theta$ : c'est une équation à une inconnue.",
    tags: ["premiere", "maths", "trigonometrie", "arc", "open", "template"],
    generate: () => {
      const cas = [
        { R: 4, L: 12, theta: "3" },
        { R: 5, L: 10, theta: "2" },
        { R: 3, L: 12, theta: "4" },
        { R: 6, L: 9, theta: "1{,}5" },
        { R: 8, L: 4, theta: "0{,}5" },
      ];
      const c = pickOne(cas);
      return {
        text: `Sur un cercle de rayon $${c.R}$, un arc mesure $${c.L}$. Quel est l'angle au centre correspondant, en radians ? Explique ta démarche.`,
        format: "open",
        expected: [c.theta, "divise", "L / R", "l/r", "R theta", "rtheta"],
        comparator: "contains_keyword",
        explanation: exp(
          "La longueur d'un arc et l'angle au centre sont liés par $L = R\\theta$, avec $\\theta$ en radians.",
          `On connaît $L = ${c.L}$ et $R = ${c.R}$ : on cherche $\\theta$, donc on divise la longueur par le rayon.`,
          `$\\theta = \\dfrac{${c.L}}{${c.R}} = ${c.theta}$.`,
          `L'angle au centre mesure $${c.theta}$ radian(s).`
        ),
      };
    },
  },

  /* ===================== TRIG_ENROULEMENT ===================== */
  {
    kind: "fixed",
    id: "premiere_trig_enr_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_enroulement",
    difficulty: 2,
    theme: "neutral",
    text: "Enrouler la droite numérique sur le cercle trigonométrique, c'est :",
    format: "qcm",
    choices: [
      "associer à chaque réel $x$ le point atteint en parcourant un arc de longueur $|x|$ à partir du point $I(1 ; 0)$",
      "associer à chaque réel $x$ le point d'abscisse $x$ du cercle",
      "couper la droite numérique en morceaux de longueur $2\\pi$",
      "projeter la droite numérique sur l'axe des abscisses",
    ],
    expected: [
      "associer à chaque réel $x$ le point atteint en parcourant un arc de longueur $|x|$ à partir du point $I(1 ; 0)$",
    ],
    comparator: "mcq_exact",
    hint: "Imagine un fil gradué que tu colles sur le cercle en partant de $I$.",
    explanation: exp(
      "L'enroulement associe à chaque réel un point du cercle : c'est une façon de « coller » la droite sur le cercle.",
      "On part toujours du point $I(1 ; 0)$, et on parcourt sur le cercle un arc dont la longueur est $|x|$.",
      "Le sens dépend du signe : sens direct (celui des aiguilles à l'envers) si $x > 0$, sens indirect si $x < 0$. Comme le rayon vaut $1$, cet arc de longueur $|x|$ correspond à un angle de $|x|$ radians.",
      "C'est associer à $x$ le point atteint après un arc de longueur $|x|$ à partir de $I$."
    ),
    canvas: cercleTrigo(60, "M(x)", "x"),
    tags: ["premiere", "maths", "trigonometrie", "enroulement", "canvas", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_enr_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_enroulement",
    difficulty: 4,
    theme: "neutral",
    text: "Deux réels différents peuvent-ils avoir la même image sur le cercle trigonométrique ?",
    format: "qcm",
    choices: [
      "oui, dès qu'ils diffèrent d'un multiple de $2\\pi$",
      "non, jamais",
      "oui, dès qu'ils diffèrent d'un multiple de $\\pi$",
      "oui, seulement s'ils sont opposés",
    ],
    expected: ["oui, dès qu'ils diffèrent d'un multiple de $2\\pi$"],
    comparator: "mcq_exact",
    hint: "Que se passe-t-il quand on fait un tour complet de plus ?",
    explanation: exp(
      "Faire un tour complet de plus ramène au même point : le tour complet mesure $2\\pi$.",
      "Donc $x$ et $x + 2\\pi$ ont la même image, et plus généralement $x$ et $x + 2k\\pi$ pour tout entier relatif $k$.",
      "Un multiple de $\\pi$ ne suffit pas : $0$ et $\\pi$ sont diamétralement opposés sur le cercle, ce ne sont pas les mêmes points.",
      "Oui, dès que leur différence est un multiple de $2\\pi$."
    ),
    tags: ["premiere", "maths", "trigonometrie", "enroulement", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_enr_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_enroulement",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est le point image du réel $0$ sur le cercle trigonométrique ?",
    format: "qcm",
    choices: ["$I(1 ; 0)$", "$O(0 ; 0)$", "$(0 ; 1)$", "$(-1 ; 0)$"],
    expected: ["$I(1 ; 0)$"],
    comparator: "mcq_exact",
    hint: "Pour $x = 0$, quelle longueur d'arc parcourt-on ?",
    explanation: exp(
      "L'enroulement part toujours du point $I(1 ; 0)$, à droite du cercle.",
      "Pour $x = 0$, l'arc à parcourir a une longueur nulle : on ne bouge pas.",
      "L'image de $0$ est donc $I$ lui-même. Attention à ne pas répondre $O(0 ; 0)$ : le centre n'est pas sur le cercle.",
      "L'image de $0$ est le point $I(1 ; 0)$."
    ),
    tags: ["premiere", "maths", "trigonometrie", "enroulement", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_enr_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_enroulement",
    difficulty: 3,
    theme: "neutral",
    text: "Pour un réel négatif, dans quel sens enroule-t-on la droite numérique ?",
    format: "qcm",
    choices: [
      "dans le sens indirect, celui des aiguilles d'une montre",
      "dans le sens direct, comme pour les réels positifs",
      "on ne peut pas enrouler un réel négatif",
      "dans les deux sens à la fois",
    ],
    expected: ["dans le sens indirect, celui des aiguilles d'une montre"],
    comparator: "mcq_exact",
    hint: "Le signe donne le sens, la valeur absolue donne la longueur.",
    explanation: exp(
      "Dans l'enroulement, le signe du réel indique le sens de parcours.",
      "Un réel positif s'enroule dans le sens direct (à l'inverse des aiguilles d'une montre) ; un réel négatif dans le sens indirect.",
      "Par exemple $-\\dfrac{\\pi}{2}$ conduit au point $(0 ; -1)$, en bas du cercle, alors que $+\\dfrac{\\pi}{2}$ conduit à $(0 ; 1)$.",
      "Pour un réel négatif, on enroule dans le sens indirect."
    ),
    canvas: cercleTrigo(-90, "M(−π/2)", "−π/2"),
    tags: ["premiere", "maths", "trigonometrie", "enroulement", "canvas", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_enr_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_enroulement",
    difficulty: 4,
    theme: "neutral",
    text: "Les réels $\\dfrac{\\pi}{2}$ et $\\dfrac{5\\pi}{2}$ ont-ils la même image sur le cercle ?",
    format: "qcm",
    choices: [
      "oui : leur différence vaut $2\\pi$, soit un tour complet",
      "non : $\\dfrac{5\\pi}{2}$ est plus grand",
      "oui : ils sont tous les deux positifs",
      "non : leur différence vaut $\\pi$",
    ],
    expected: ["oui : leur différence vaut $2\\pi$, soit un tour complet"],
    comparator: "mcq_exact",
    hint: "Calcule $\\dfrac{5\\pi}{2} - \\dfrac{\\pi}{2}$.",
    explanation: exp(
      "Deux réels ont la même image si et seulement si leur différence est un multiple de $2\\pi$.",
      "$\\dfrac{5\\pi}{2} - \\dfrac{\\pi}{2} = \\dfrac{4\\pi}{2} = 2\\pi$.",
      "C'est exactement un tour complet : on repasse par le même point, celui de coordonnées $(0 ; 1)$.",
      "Oui, ils ont la même image."
    ),
    tags: ["premiere", "maths", "trigonometrie", "enroulement", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_enr_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_enroulement",
    difficulty: 4,
    theme: "reunion",
    text: "Sur la grande roue installée au Barachois, une nacelle part du point le plus à droite et effectue $2$ tours et demi dans le sens direct. Où se retrouve-t-elle ?",
    format: "qcm",
    choices: [
      "au point le plus à gauche",
      "au point de départ",
      "en haut de la roue",
      "en bas de la roue",
    ],
    expected: ["au point le plus à gauche"],
    comparator: "mcq_exact",
    hint: "Les tours complets ne changent rien : que reste-t-il ?",
    explanation: exp(
      "Un tour complet ramène au point de départ : seule la partie de tour qui reste compte.",
      "$2$ tours et demi, c'est $2 \\times 2\\pi + \\pi$, soit un réel de la forme $\\pi + 2k\\pi$.",
      "On enlève les deux tours complets : il reste un demi-tour, soit $\\pi$. Le demi-tour mène au point diamétralement opposé au départ.",
      "La nacelle se retrouve au point le plus à gauche."
    ),
    tags: ["premiere", "maths", "trigonometrie", "enroulement", "reunion", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_enr_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_enroulement",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi une infinité de réels ont la même image que $\\dfrac{\\pi}{3}$ sur le cercle trigonométrique.",
    format: "open",
    expected: ["2pi", "tour complet", "2k", "multiple", "infinite", "infinité"],
    comparator: "contains_keyword",
    hint: "Que peut-on ajouter à $\\dfrac{\\pi}{3}$ sans changer le point d'arrivée ?",
    explanation: exp(
      "Ajouter un tour complet à un réel ne change pas son image sur le cercle : le tour complet mesure $2\\pi$.",
      "On peut donc ajouter $2\\pi$, ou $4\\pi$, ou en retirer autant : $\\dfrac{\\pi}{3} + 2k\\pi$ convient pour tout entier relatif $k$.",
      "Comme il y a une infinité d'entiers $k$, il y a une infinité de réels concernés : $\\dfrac{\\pi}{3}$, $\\dfrac{7\\pi}{3}$, $\\dfrac{13\\pi}{3}$, mais aussi $-\\dfrac{5\\pi}{3}$…",
      "Tous les réels de la forme $\\dfrac{\\pi}{3} + 2k\\pi$ ont la même image : ils sont en nombre infini."
    ),
    tags: ["premiere", "maths", "trigonometrie", "enroulement", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_enr_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_enroulement",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève affirme : « à chaque point du cercle correspond un seul réel ». Explique pourquoi c'est faux.",
    format: "open",
    expected: ["2pi", "tour", "infinite", "infinité", "plusieurs", "2k"],
    comparator: "contains_keyword",
    hint: "L'enroulement va de la droite vers le cercle : peut-on le remonter dans l'autre sens ?",
    explanation: exp(
      "L'enroulement associe à chaque réel UN point ; mais il ne se remonte pas à l'envers.",
      "Un même point du cercle est atteint par tous les réels qui diffèrent d'un nombre entier de tours.",
      "Par exemple le point $(0 ; 1)$ est l'image de $\\dfrac{\\pi}{2}$, mais aussi de $\\dfrac{5\\pi}{2}$, de $-\\dfrac{3\\pi}{2}$, et d'une infinité d'autres.",
      "C'est faux : à chaque point correspond une infinité de réels, de la forme $x + 2k\\pi$."
    ),
    tags: ["premiere", "maths", "trigonometrie", "enroulement", "open"],
  },
  {
    kind: "template",
    id: "premiere_trig_enr_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_enroulement",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule la différence des deux réels : est-elle un multiple de $2\\pi$ ?",
    tags: ["premiere", "maths", "trigonometrie", "enroulement", "template"],
    generate: () => {
      const cas = [
        { a: "\\dfrac{\\pi}{4}", b: "\\dfrac{9\\pi}{4}", meme: true, diff: "2\\pi" },
        { a: "\\dfrac{\\pi}{6}", b: "\\dfrac{13\\pi}{6}", meme: true, diff: "2\\pi" },
        { a: "\\dfrac{\\pi}{3}", b: "-\\dfrac{5\\pi}{3}", meme: true, diff: "2\\pi" },
        { a: "\\dfrac{\\pi}{2}", b: "\\dfrac{3\\pi}{2}", meme: false, diff: "\\pi" },
        { a: "\\dfrac{\\pi}{4}", b: "\\dfrac{5\\pi}{4}", meme: false, diff: "\\pi" },
        { a: "\\dfrac{\\pi}{6}", b: "\\dfrac{2\\pi}{3}", meme: false, diff: "\\dfrac{\\pi}{2}" },
      ];
      const c = pickOne(cas);
      return {
        text: `Les réels $${c.a}$ et $${c.b}$ ont-ils la même image sur le cercle trigonométrique ?`,
        format: "qcm",
        choices: c.meme
          ? ["oui", "non : leur différence n'est pas un multiple de $2\\pi$", "non : ils n'ont pas le même signe", "on ne peut pas savoir"]
          : ["non", "oui", "oui, car leur différence est un multiple de $2\\pi$", "on ne peut pas savoir"],
        expected: [c.meme ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Deux réels ont la même image si et seulement si leur différence est un multiple de $2\\pi$.",
          `On calcule la différence : $${c.b} - ${c.a}$.`,
          c.meme
            ? `Elle vaut $${c.diff}$, soit un nombre entier de tours complets : les deux réels aboutissent au même point.`
            : `Elle vaut $${c.diff}$, qui n'est pas un multiple de $2\\pi$ : les deux points sont distincts.`,
          c.meme ? "Oui, ils ont la même image." : "Non, leurs images sont différentes."
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_trig_enr_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_enroulement",
    difficulty: 5,
    theme: "neutral",
    hint: "Ajoute ou retire un tour complet, c'est-à-dire $2\\pi$.",
    tags: ["premiere", "maths", "trigonometrie", "enroulement", "open", "template"],
    generate: () => {
      const cas = [
        { x: "\\dfrac{\\pi}{4}", plus: "\\dfrac{9\\pi}{4}", moins: "-\\dfrac{7\\pi}{4}" },
        { x: "\\dfrac{\\pi}{3}", plus: "\\dfrac{7\\pi}{3}", moins: "-\\dfrac{5\\pi}{3}" },
        { x: "\\dfrac{\\pi}{2}", plus: "\\dfrac{5\\pi}{2}", moins: "-\\dfrac{3\\pi}{2}" },
        { x: "\\pi", plus: "3\\pi", moins: "-\\pi" },
        { x: "\\dfrac{\\pi}{6}", plus: "\\dfrac{13\\pi}{6}", moins: "-\\dfrac{11\\pi}{6}" },
      ];
      const c = pickOne(cas);
      return {
        text: `Donne deux autres réels qui ont la même image que $${c.x}$ sur le cercle trigonométrique, et justifie ton choix.`,
        format: "open",
        expected: ["2pi", "tour complet", "2k", "ajoute", "retire"],
        comparator: "contains_keyword",
        explanation: exp(
          "Deux réels ont la même image lorsqu'ils diffèrent d'un nombre entier de tours, c'est-à-dire d'un multiple de $2\\pi$.",
          `On part de $${c.x}$ et on ajoute puis on retire un tour complet.`,
          `On obtient par exemple $${c.x} + 2\\pi = ${c.plus}$ et $${c.x} - 2\\pi = ${c.moins}$.`,
          `$${c.plus}$ et $${c.moins}$ conviennent — et plus généralement tous les réels de la forme $${c.x} + 2k\\pi$.`
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
    kind: "fixed",
    id: "premiere_trig_val_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_valeurs",
    difficulty: 2,
    theme: "neutral",
    text: "Combien vaut $\\sin\\left(\\dfrac{\\pi}{2}\\right)$ ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Le point en haut du cercle a pour coordonnées $(0 ; 1)$.",
    explanation: exp(
      "Le sinus est l'ORDONNÉE du point du cercle trigonométrique.",
      "À $\\dfrac{\\pi}{2}$ (quart de tour), ce point est $(0 ; 1)$.",
      "L'ordonnée vaut $1$.",
      "$\\sin\\left(\\dfrac{\\pi}{2}\\right) = 1$."
    ),
    tags: ["premiere", "maths", "trigonometrie", "valeurs", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_val_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_valeurs",
    difficulty: 4,
    theme: "neutral",
    text: "Combien vaut $\\sin\\left(\\dfrac{\\pi}{3}\\right)$ ?",
    format: "qcm",
    choices: [
      "$\\dfrac{\\sqrt{3}}{2}$",
      "$\\dfrac{1}{2}$",
      "$\\dfrac{\\sqrt{2}}{2}$",
      "$\\dfrac{\\sqrt{3}}{3}$",
    ],
    expected: ["$\\dfrac{\\sqrt{3}}{2}$"],
    comparator: "mcq_exact",
    hint: "$\\dfrac{\\pi}{3}$ est proche du haut du cercle : le sinus y est grand.",
    explanation: exp(
      "$\\dfrac{\\pi}{3}$ correspond à $60°$ : c'est une des trois valeurs remarquables à connaître par cœur.",
      "$\\cos\\left(\\dfrac{\\pi}{3}\\right) = \\dfrac{1}{2}$ et $\\sin\\left(\\dfrac{\\pi}{3}\\right) = \\dfrac{\\sqrt{3}}{2}$.",
      "Repère utile : à $60°$, on est plus haut que loin sur la droite, donc le sinus ($\\approx 0{,}87$) dépasse le cosinus ($0{,}5$).",
      "$\\sin\\left(\\dfrac{\\pi}{3}\\right) = \\dfrac{\\sqrt{3}}{2}$."
    ),
    tags: ["premiere", "maths", "trigonometrie", "valeurs", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_val_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_valeurs",
    difficulty: 4,
    theme: "neutral",
    text: "Combien vaut $\\cos\\left(\\dfrac{\\pi}{6}\\right)$ ?",
    format: "qcm",
    choices: [
      "$\\dfrac{\\sqrt{3}}{2}$",
      "$\\dfrac{1}{2}$",
      "$\\dfrac{\\sqrt{2}}{2}$",
      "$0$",
    ],
    expected: ["$\\dfrac{\\sqrt{3}}{2}$"],
    comparator: "mcq_exact",
    hint: "$\\dfrac{\\pi}{6}$ est un petit angle : le point est loin sur la droite, donc le cosinus est grand.",
    explanation: exp(
      "$\\dfrac{\\pi}{6}$ correspond à $30°$.",
      "$\\cos\\left(\\dfrac{\\pi}{6}\\right) = \\dfrac{\\sqrt{3}}{2}$ et $\\sin\\left(\\dfrac{\\pi}{6}\\right) = \\dfrac{1}{2}$.",
      "C'est l'inverse de $\\dfrac{\\pi}{3}$ : les deux valeurs s'échangent entre ces angles complémentaires.",
      "$\\cos\\left(\\dfrac{\\pi}{6}\\right) = \\dfrac{\\sqrt{3}}{2}$."
    ),
    tags: ["premiere", "maths", "trigonometrie", "valeurs", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_val_fixed_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_valeurs",
    difficulty: 4,
    theme: "neutral",
    text: "Combien vaut $\\sin\\left(\\dfrac{\\pi}{4}\\right)$ ?",
    format: "qcm",
    choices: [
      "$\\dfrac{\\sqrt{2}}{2}$",
      "$\\dfrac{1}{2}$",
      "$\\dfrac{\\sqrt{3}}{2}$",
      "$1$",
    ],
    expected: ["$\\dfrac{\\sqrt{2}}{2}$"],
    comparator: "mcq_exact",
    hint: "À $45°$, cosinus et sinus sont égaux.",
    explanation: exp(
      "$\\dfrac{\\pi}{4}$ correspond à $45°$ : le point du cercle est sur la bissectrice.",
      "Abscisse et ordonnée sont donc égales : $\\cos\\left(\\dfrac{\\pi}{4}\\right) = \\sin\\left(\\dfrac{\\pi}{4}\\right)$.",
      "Cette valeur commune est $\\dfrac{\\sqrt{2}}{2} \\approx 0{,}71$.",
      "$\\sin\\left(\\dfrac{\\pi}{4}\\right) = \\dfrac{\\sqrt{2}}{2}$."
    ),
    tags: ["premiere", "maths", "trigonometrie", "valeurs", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_val_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_valeurs",
    difficulty: 3,
    theme: "neutral",
    text: "Combien vaut $\\cos(\\pi)$ ?",
    format: "short",
    expected: ["-1"],
    comparator: "number_equal",
    hint: "Un demi-tour amène au point $(-1 ; 0)$.",
    explanation: exp(
      "Le cosinus est l'abscisse du point du cercle trigonométrique.",
      "$\\pi$ correspond à un demi-tour : le point est alors $(-1 ; 0)$.",
      "Son abscisse vaut $-1$. (Et $\\sin(\\pi) = 0$, l'ordonnée.)",
      "$\\cos(\\pi) = -1$."
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

  {
    kind: "fixed",
    id: "premiere_trig_val_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_valeurs",
    difficulty: 5,
    theme: "neutral",
    text: "Explique comment retrouver $\\cos\\dfrac{\\pi}{4}$ et $\\sin\\dfrac{\\pi}{4}$ sans les avoir appris par cœur.",
    format: "open",
    expected: ["bissectrice", "egaux", "égaux", "pythagore", "cos^2", "racine de 2", "diagonale"],
    comparator: "contains_keyword",
    hint: "Où se trouve le point image de $\\dfrac{\\pi}{4}$ par rapport aux deux axes ?",
    explanation: exp(
      "$\\dfrac{\\pi}{4}$ est la moitié de $\\dfrac{\\pi}{2}$ : son point image est sur la bissectrice du premier quadrant.",
      "Ce point est donc à égale distance des deux axes : son abscisse et son ordonnée sont égales, et positives. Autrement dit $\\cos\\dfrac{\\pi}{4} = \\sin\\dfrac{\\pi}{4}$.",
      "En reportant dans $\\cos^2 x + \\sin^2 x = 1$, on obtient $2\\cos^2\\dfrac{\\pi}{4} = 1$, donc $\\cos\\dfrac{\\pi}{4} = \\dfrac{1}{\\sqrt{2}} = \\dfrac{\\sqrt{2}}{2}$.",
      "Les deux valent $\\dfrac{\\sqrt{2}}{2}$ : la symétrie de la figure suffit à les retrouver."
    ),
    canvas: cercleTrigo(45, "M", "π/4"),
    tags: ["premiere", "maths", "trigonometrie", "valeurs", "canvas", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_val_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_valeurs",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève écrit $\\cos\\dfrac{\\pi}{6} = \\dfrac{1}{2}$. Explique son erreur.",
    format: "open",
    expected: ["confond", "sinus", "racine de 3", "sqrt", "\\dfrac{\\sqrt{3}}{2}", "0,87"],
    comparator: "contains_keyword",
    hint: "Place le point image de $\\dfrac{\\pi}{6}$ : est-il plutôt haut, ou plutôt à droite ?",
    explanation: exp(
      "Le cosinus est l'abscisse du point image, le sinus son ordonnée.",
      "$\\dfrac{\\pi}{6}$ vaut $30°$ : le point image est presque à droite du cercle, à peine remonté. Son abscisse est donc GRANDE et son ordonnée petite.",
      "C'est $\\sin\\dfrac{\\pi}{6}$ qui vaut $\\dfrac{1}{2}$ ; le cosinus vaut $\\dfrac{\\sqrt{3}}{2} \\approx 0{,}87$. L'élève a échangé les deux.",
      "Il a confondu cosinus et sinus : $\\cos\\dfrac{\\pi}{6} = \\dfrac{\\sqrt{3}}{2}$."
    ),
    canvas: cercleTrigo(30, "M", "π/6"),
    tags: ["premiere", "maths", "trigonometrie", "valeurs", "canvas", "piege", "open"],
  },
  {
    kind: "template",
    id: "premiere_trig_val_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_valeurs",
    difficulty: 5,
    theme: "neutral",
    hint: "Place le point sur le cercle : plus l'angle est petit, plus l'abscisse est grande.",
    tags: ["premiere", "maths", "trigonometrie", "valeurs", "open", "template"],
    generate: () => {
      const cas = [
        { x: "\\dfrac{\\pi}{6}", deg: 30, cos: "\\dfrac{\\sqrt{3}}{2}", sin: "\\dfrac{1}{2}" },
        { x: "\\dfrac{\\pi}{4}", deg: 45, cos: "\\dfrac{\\sqrt{2}}{2}", sin: "\\dfrac{\\sqrt{2}}{2}" },
        { x: "\\dfrac{\\pi}{3}", deg: 60, cos: "\\dfrac{1}{2}", sin: "\\dfrac{\\sqrt{3}}{2}" },
      ];
      const c = pickOne(cas);
      return {
        text: `Donne les valeurs de $\\cos ${c.x}$ et $\\sin ${c.x}$, puis explique comment la figure permet de vérifier que tu ne les as pas échangées.`,
        format: "open",
        expected: ["abscisse", "ordonnee", "ordonnée", "plus grand", "figure", c.cos.includes("sqrt{3}") ? "racine de 3" : "racine de 2"],
        comparator: "contains_keyword",
        canvas: cercleTrigo(c.deg, "M", undefined),
        explanation: exp(
          "Le cosinus est l'abscisse du point image, le sinus son ordonnée : la figure permet de vérifier lequel est le plus grand.",
          `Pour $${c.x}$, soit $${c.deg}°$, on place le point image sur le cercle.`,
          c.deg < 45
            ? "Le point est encore proche de l'axe des abscisses : son abscisse (le cosinus) est plus grande que son ordonnée (le sinus)."
            : c.deg > 45
              ? "Le point est déjà bien remonté : son ordonnée (le sinus) est plus grande que son abscisse (le cosinus)."
              : "Le point est sur la bissectrice : abscisse et ordonnée sont égales.",
          `$\\cos ${c.x} = ${c.cos}$ et $\\sin ${c.x} = ${c.sin}$.`
        ),
      };
    },
  },

  /* ===================== TRIG_CERCLE ===================== */
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
    kind: "fixed",
    id: "premiere_trig_cer_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_cercle",
    difficulty: 2,
    theme: "neutral",
    text: "Sur le cercle trigonométrique, dans quel sens mesure-t-on les angles POSITIFS ?",
    format: "qcm",
    choices: [
      "dans le sens inverse des aiguilles d'une montre",
      "dans le sens des aiguilles d'une montre",
      "de haut en bas",
      "peu importe, les deux sens conviennent",
    ],
    expected: ["dans le sens inverse des aiguilles d'une montre"],
    comparator: "mcq_exact",
    hint: "C'est ce qu'on appelle le sens « direct » ou « trigonométrique ».",
    explanation: exp(
      "Le cercle trigonométrique est orienté : on part de $(1 ; 0)$ et on tourne dans le sens direct.",
      "Ce sens direct est l'inverse de celui des aiguilles d'une montre.",
      "Tourner dans l'autre sens donne des angles NÉGATIFS : $-\\dfrac{\\pi}{2}$ amène au point $(0 ; -1)$.",
      "Les angles positifs se mesurent dans le sens inverse des aiguilles d'une montre."
    ),
    tags: ["premiere", "maths", "trigonometrie", "cercle", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_cer_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_cercle",
    difficulty: 5,
    theme: "neutral",
    text: "On sait que $\\cos x = -\\dfrac{3}{5}$ et $\\sin x > 0$. Combien vaut $\\sin x$ ?",
    format: "qcm",
    choices: [
      "$\\dfrac{4}{5}$",
      "$-\\dfrac{4}{5}$",
      "$\\dfrac{2}{5}$",
      "$\\dfrac{16}{25}$",
    ],
    expected: ["$\\dfrac{4}{5}$"],
    comparator: "mcq_exact",
    hint: "$\\cos^2 x + \\sin^2 x = 1$ ; le carré efface le signe moins.",
    explanation: exp(
      "On utilise l'identité $\\cos^2 x + \\sin^2 x = 1$.",
      "$\\sin^2 x = 1 - \\left(-\\dfrac{3}{5}\\right)^2 = 1 - \\dfrac{9}{25} = \\dfrac{16}{25}$.",
      "Donc $\\sin x = \\pm\\dfrac{4}{5}$ ; l'énoncé précise $\\sin x > 0$, ce qui tranche. Attention à ne pas s'arrêter à $\\sin^2 x = \\dfrac{16}{25}$.",
      "$\\sin x = \\dfrac{4}{5}$."
    ),
    tags: ["premiere", "maths", "trigonometrie", "cercle", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_cer_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_cercle",
    difficulty: 4,
    theme: "neutral",
    text: "Pour un angle $x$ tel que $\\dfrac{\\pi}{2} < x < \\pi$ (2ᵉ quadrant), quels sont les signes ?",
    format: "qcm",
    choices: [
      "$\\cos x < 0$ et $\\sin x > 0$",
      "$\\cos x > 0$ et $\\sin x > 0$",
      "$\\cos x < 0$ et $\\sin x < 0$",
      "$\\cos x > 0$ et $\\sin x < 0$",
    ],
    expected: ["$\\cos x < 0$ et $\\sin x > 0$"],
    comparator: "mcq_exact",
    hint: "Le point est en haut à GAUCHE du cercle.",
    explanation: exp(
      "Le cosinus est l'abscisse du point, le sinus son ordonnée.",
      "Entre $\\dfrac{\\pi}{2}$ et $\\pi$, le point se trouve dans le quart supérieur gauche du cercle.",
      "Son abscisse est négative et son ordonnée positive.",
      "$\\cos x < 0$ et $\\sin x > 0$."
    ),
    tags: ["premiere", "maths", "trigonometrie", "cercle", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_cer_fixed_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_cercle",
    difficulty: 5,
    theme: "neutral",
    text: "On cherche $x$ dans $\\left]0 ; \\dfrac{\\pi}{2}\\right[$ tel que $\\sin x = \\dfrac{1}{2}$. Que vaut $x$ ?",
    format: "qcm",
    choices: [
      "$\\dfrac{\\pi}{6}$",
      "$\\dfrac{\\pi}{3}$",
      "$\\dfrac{\\pi}{4}$",
      "$\\dfrac{\\pi}{2}$",
    ],
    expected: ["$\\dfrac{\\pi}{6}$"],
    comparator: "mcq_exact",
    hint: "Quelle valeur remarquable a un sinus égal à $\\dfrac{1}{2}$ ?",
    explanation: exp(
      "On cherche l'angle du premier quadrant dont l'ordonnée sur le cercle vaut $\\dfrac{1}{2}$.",
      "Parmi les valeurs remarquables : $\\sin\\left(\\dfrac{\\pi}{6}\\right) = \\dfrac{1}{2}$.",
      "$\\dfrac{\\pi}{3}$ donnerait $\\dfrac{\\sqrt{3}}{2}$ : c'est l'erreur classique, on confond les deux angles.",
      "$x = \\dfrac{\\pi}{6}$."
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

  {
    kind: "fixed",
    id: "premiere_trig_cer_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_cercle",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi $\\cos^2 x + \\sin^2 x = 1$ pour tout réel $x$.",
    format: "open",
    expected: ["pythagore", "rayon 1", "hypotenuse", "hypoténuse", "triangle rectangle"],
    comparator: "contains_keyword",
    hint: "Trace le triangle rectangle formé par le point image, son projeté sur l'axe des abscisses et le centre.",
    explanation: exp(
      "Le point image de $x$ a pour coordonnées $(\\cos x ; \\sin x)$ et se trouve sur le cercle de centre $O$ et de rayon $1$.",
      "On forme le triangle rectangle dont les sommets sont $O$, le point image $M$ et le projeté de $M$ sur l'axe des abscisses.",
      "Ses côtés de l'angle droit mesurent $|\\cos x|$ et $|\\sin x|$, et son hypoténuse est le rayon $OM = 1$. Le théorème de Pythagore donne $\\cos^2 x + \\sin^2 x = 1^2$.",
      "C'est le théorème de Pythagore appliqué au rayon : l'égalité vient de ce que le rayon vaut $1$."
    ),
    tags: ["premiere", "maths", "trigonometrie", "cercle", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_cer_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_cercle",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève trouve $\\sin x = -0{,}6$ alors que le point image de $x$ est dans le premier quadrant. Explique pourquoi c'est impossible.",
    format: "open",
    expected: ["ordonnee", "ordonnée", "positif", "premier quadrant", "au-dessus", "signe"],
    comparator: "contains_keyword",
    hint: "Où se situe le premier quadrant par rapport à l'axe des abscisses ?",
    explanation: exp(
      "Le sinus d'un réel est l'ORDONNÉE de son point image sur le cercle trigonométrique.",
      "Le premier quadrant est la portion en haut à droite : les points y ont une abscisse et une ordonnée strictement positives.",
      "Un sinus négatif signifierait un point sous l'axe des abscisses, donc dans le troisième ou le quatrième quadrant. L'élève a probablement oublié de choisir le signe après avoir utilisé $\\sin^2 x = 1 - \\cos^2 x$, qui donne toujours deux valeurs opposées.",
      "C'est impossible : dans le premier quadrant, $\\sin x > 0$. Il fallait garder $+0{,}6$."
    ),
    tags: ["premiere", "maths", "trigonometrie", "cercle", "piege", "open"],
  },
  {
    kind: "template",
    id: "premiere_trig_cer_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_cercle",
    difficulty: 5,
    theme: "neutral",
    hint: "Utilise $\\cos^2 x + \\sin^2 x = 1$, puis choisis le signe grâce au quadrant.",
    tags: ["premiere", "maths", "trigonometrie", "cercle", "open", "template"],
    generate: () => {
      const cas = [
        { cos: "\\dfrac{3}{5}", quadrant: "quatrième", sin: "-\\dfrac{4}{5}", positif: false },
        { cos: "-\\dfrac{3}{5}", quadrant: "deuxième", sin: "\\dfrac{4}{5}", positif: true },
        { cos: "\\dfrac{5}{13}", quadrant: "premier", sin: "\\dfrac{12}{13}", positif: true },
        { cos: "-\\dfrac{12}{13}", quadrant: "troisième", sin: "-\\dfrac{5}{13}", positif: false },
        { cos: "\\dfrac{8}{17}", quadrant: "quatrième", sin: "-\\dfrac{15}{17}", positif: false },
      ];
      const c = pickOne(cas);
      return {
        text: `On sait que $\\cos x = ${c.cos}$ et que le point image de $x$ est dans le ${c.quadrant} quadrant. Détermine $\\sin x$ en justifiant le signe que tu choisis.`,
        format: "open",
        expected: [
          "cos^2",
          "pythagore",
          "quadrant",
          c.positif ? "positif" : "negatif",
          c.positif ? "positive" : "négatif",
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "La relation $\\cos^2 x + \\sin^2 x = 1$ donne la valeur de $\\sin^2 x$ ; le quadrant donne ensuite le signe.",
          `On écrit $\\sin^2 x = 1 - \\left(${c.cos}\\right)^2$, puis on prend la racine carrée.`,
          `Cela laisse deux valeurs opposées. Dans le ${c.quadrant} quadrant, l'ordonnée est ${c.positif ? "positive" : "négative"} : on garde donc la valeur ${c.positif ? "positive" : "négative"}.`,
          `$\\sin x = ${c.sin}$.`
        ),
      };
    },
  },

  /* ===================== TRIG_COS_SIN ===================== */
  {
    kind: "fixed",
    id: "premiere_trig_cer_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_cos_sin",
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
    canvas: cercleTrigo(50, "M(x)", "x"),
    tags: ["premiere", "maths", "trigonometrie", "cos_sin", "canvas", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_cer_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_cos_sin",
    difficulty: 3,
    theme: "neutral",
    text: "Quelles sont les coordonnées du point du cercle trigonométrique associé à $\\dfrac{\\pi}{2}$ ?",
    format: "qcm",
    choices: ["$(0 ; 1)$", "$(1 ; 0)$", "$(-1 ; 0)$", "$(0 ; -1)$"],
    expected: ["$(0 ; 1)$"],
    comparator: "mcq_exact",
    hint: "Un quart de tour depuis le point $(1 ; 0)$, dans le sens direct.",
    explanation: exp(
      "Le point associé à $x$ a pour coordonnées $(\\cos x ; \\sin x)$.",
      "$\\dfrac{\\pi}{2}$ est un quart de tour : partant de $(1 ; 0)$, on arrive tout en haut du cercle.",
      "$\\cos\\left(\\dfrac{\\pi}{2}\\right) = 0$ et $\\sin\\left(\\dfrac{\\pi}{2}\\right) = 1$.",
      "Le point est $(0 ; 1)$."
    ),
    tags: ["premiere", "maths", "trigonometrie", "cos_sin", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_cer_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_cos_sin",
    difficulty: 3,
    theme: "neutral",
    text: "Quelles sont les coordonnées du point du cercle trigonométrique associé à $\\pi$ ?",
    format: "qcm",
    choices: ["$(-1 ; 0)$", "$(0 ; 1)$", "$(1 ; 0)$", "$(0 ; -1)$"],
    expected: ["$(-1 ; 0)$"],
    comparator: "mcq_exact",
    hint: "Un demi-tour depuis le point $(1 ; 0)$.",
    explanation: exp(
      "Le point associé à $x$ a pour coordonnées $(\\cos x ; \\sin x)$.",
      "$\\pi$ correspond à un demi-tour : on arrive à gauche du cercle.",
      "$\\cos(\\pi) = -1$ et $\\sin(\\pi) = 0$.",
      "Le point est $(-1 ; 0)$."
    ),
    tags: ["premiere", "maths", "trigonometrie", "cos_sin", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_cer_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_cos_sin",
    difficulty: 3,
    theme: "neutral",
    text: "Pour tout réel $x$, à quel intervalle appartient $\\cos x$ ?",
    format: "qcm",
    choices: ["$[-1 ; 1]$", "$[0 ; 1]$", "$\\mathbb{R}$", "$[0 ; 2\\pi]$"],
    expected: ["$[-1 ; 1]$"],
    comparator: "mcq_exact",
    hint: "C'est l'abscisse d'un point situé sur un cercle de rayon $1$.",
    explanation: exp(
      "$\\cos x$ est l'abscisse d'un point du cercle de centre $O$ et de rayon $1$.",
      "Ce point ne peut pas s'éloigner de plus de $1$ de l'origine, dans un sens comme dans l'autre.",
      "Son abscisse est donc comprise entre $-1$ et $1$ (idem pour le sinus).",
      "$\\cos x \\in [-1 ; 1]$."
    ),
    tags: ["premiere", "maths", "trigonometrie", "cos_sin", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_cs_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_cos_sin",
    difficulty: 3,
    theme: "neutral",
    text: "Quelles sont les coordonnées du point du cercle trigonométrique associé à $-\\dfrac{\\pi}{2}$ ?",
    format: "qcm",
    choices: ["$(0 ; -1)$", "$(0 ; 1)$", "$(-1 ; 0)$", "$(1 ; 0)$"],
    expected: ["$(0 ; -1)$"],
    comparator: "mcq_exact",
    hint: "Un quart de tour, mais dans le sens des aiguilles d'une montre.",
    explanation: exp(
      "Le point associé à $x$ a pour coordonnées $(\\cos x ; \\sin x)$, et un réel négatif s'enroule dans le sens indirect.",
      "Depuis $I(1 ; 0)$, un quart de tour vers le BAS conduit au point le plus bas du cercle.",
      "$\\cos\\left(-\\dfrac{\\pi}{2}\\right) = 0$ et $\\sin\\left(-\\dfrac{\\pi}{2}\\right) = -1$.",
      "Le point est $(0 ; -1)$."
    ),
    canvas: cercleTrigo(-90, "M", "−π/2"),
    tags: ["premiere", "maths", "trigonometrie", "cos_sin", "canvas", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_cs_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_cos_sin",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève place le point image de $\\dfrac{\\pi}{3}$ en $\\left(\\sin\\dfrac{\\pi}{3} ; \\cos\\dfrac{\\pi}{3}\\right)$. Quelle est son erreur ?",
    format: "qcm",
    choices: [
      "il a inversé abscisse et ordonnée : c'est $(\\cos x ; \\sin x)$",
      "il a oublié le rayon du cercle",
      "il fallait écrire $\\left(\\dfrac{\\pi}{3} ; \\dfrac{\\pi}{3}\\right)$",
      "aucune : les deux écritures sont équivalentes",
    ],
    expected: ["il a inversé abscisse et ordonnée : c'est $(\\cos x ; \\sin x)$"],
    comparator: "mcq_exact",
    hint: "Le cosinus se lit horizontalement, le sinus verticalement.",
    explanation: exp(
      "Par définition, le point image de $x$ a pour abscisse $\\cos x$ et pour ordonnée $\\sin x$.",
      "L'élève a échangé les deux : il place le point en $\\left(\\dfrac{\\sqrt{3}}{2} ; \\dfrac{1}{2}\\right)$ au lieu de $\\left(\\dfrac{1}{2} ; \\dfrac{\\sqrt{3}}{2}\\right)$.",
      "Le résultat n'est pas anodin : son point correspond à $\\dfrac{\\pi}{6}$, pas à $\\dfrac{\\pi}{3}$. Un moyen de ne plus se tromper : $\\cos$ vient avant $\\sin$ dans l'alphabet, comme l'abscisse avant l'ordonnée.",
      "Il a inversé les coordonnées : c'est $(\\cos x ; \\sin x)$."
    ),
    tags: ["premiere", "maths", "trigonometrie", "cos_sin", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_cs_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_cos_sin",
    difficulty: 3,
    theme: "neutral",
    text: "Peut-on avoir $\\sin x = 1{,}4$ pour un certain réel $x$ ?",
    format: "qcm",
    choices: [
      "non : le sinus est toujours compris entre $-1$ et $1$",
      "oui, pour $x$ assez grand",
      "oui, si $x$ est négatif",
      "on ne peut pas savoir sans calculatrice",
    ],
    expected: ["non : le sinus est toujours compris entre $-1$ et $1$"],
    comparator: "mcq_exact",
    hint: "Le sinus est l'ordonnée d'un point situé sur un cercle de rayon $1$.",
    explanation: exp(
      "Le sinus d'un réel est l'ordonnée de son point image sur le cercle de rayon $1$.",
      "Ce point reste à distance $1$ du centre : son ordonnée ne peut pas dépasser $1$ ni descendre sous $-1$.",
      "Une valeur de $1{,}4$ sortirait du cercle. C'est un réflexe de contrôle utile : une équation comme $\\sin x = 1{,}4$ n'a aucune solution, inutile de chercher.",
      "Non : $\\sin x \\in [-1 ; 1]$ pour tout réel $x$."
    ),
    tags: ["premiere", "maths", "trigonometrie", "cos_sin", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_cs_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_cos_sin",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi $\\cos x$ et $\\sin x$ sont toujours compris entre $-1$ et $1$.",
    format: "open",
    expected: ["rayon 1", "rayon vaut 1", "coordonnees", "coordonnées", "cercle", "distance"],
    comparator: "contains_keyword",
    hint: "Que représentent ces deux nombres sur la figure ?",
    explanation: exp(
      "Le cosinus et le sinus de $x$ sont l'abscisse et l'ordonnée du point image de $x$.",
      "Ce point est sur le cercle de centre $O$ et de rayon $1$ : il reste donc à distance $1$ de l'origine.",
      "Un point à distance $1$ de l'origine a forcément une abscisse et une ordonnée entre $-1$ et $1$ — sinon il serait déjà plus loin que $1$ rien qu'horizontalement ou verticalement.",
      "C'est parce que le cercle a pour rayon $1$ : ses points ont leurs deux coordonnées dans $[-1 ; 1]$."
    ),
    tags: ["premiere", "maths", "trigonometrie", "cos_sin", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_cs_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_cos_sin",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève affirme : « $\\cos x$ est une longueur, donc il est toujours positif ». Explique pourquoi c'est faux.",
    format: "open",
    expected: ["abscisse", "coordonnee", "coordonnée", "negatif", "négatif", "gauche", "quadrant"],
    comparator: "contains_keyword",
    hint: "Que devient l'abscisse d'un point situé à gauche de l'axe des ordonnées ?",
    explanation: exp(
      "Le cosinus n'est pas une longueur mais une COORDONNÉE : l'abscisse du point image.",
      "Une abscisse peut être négative : c'est le cas dès que le point est à gauche de l'axe des ordonnées, donc dans le deuxième ou le troisième quadrant.",
      "Par exemple $\\cos(\\pi) = -1$ et $\\cos\\left(\\dfrac{2\\pi}{3}\\right) = -\\dfrac{1}{2}$. La confusion vient du collège, où le cosinus était un quotient de longueurs — mais on n'y traitait que des angles aigus.",
      "C'est faux : $\\cos x$ est une abscisse, elle peut être négative."
    ),
    tags: ["premiere", "maths", "trigonometrie", "cos_sin", "piege", "open"],
  },
  {
    kind: "template",
    id: "premiere_trig_cs_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_cos_sin",
    difficulty: 4,
    theme: "neutral",
    hint: "Place le point sur le cercle, puis lis son abscisse et son ordonnée.",
    tags: ["premiere", "maths", "trigonometrie", "cos_sin", "canvas", "template"],
    generate: () => {
      const cas = [
        { x: "0", deg: 0, p: "$(1 ; 0)$" },
        { x: "\\dfrac{\\pi}{2}", deg: 90, p: "$(0 ; 1)$" },
        { x: "\\pi", deg: 180, p: "$(-1 ; 0)$" },
        { x: "\\dfrac{3\\pi}{2}", deg: 270, p: "$(0 ; -1)$" },
        { x: "-\\pi", deg: -180, p: "$(-1 ; 0)$" },
        { x: "2\\pi", deg: 360, p: "$(1 ; 0)$" },
      ];
      const c = pickOne(cas);
      const faux = ["$(1 ; 0)$", "$(0 ; 1)$", "$(-1 ; 0)$", "$(0 ; -1)$"].filter((v) => v !== c.p);
      return {
        text: `Quelles sont les coordonnées du point image de $${c.x}$ sur le cercle trigonométrique ?`,
        format: "qcm",
        choices: [c.p, ...faux],
        expected: [c.p],
        comparator: "mcq_exact",
        canvas: cercleTrigo(c.deg, "M", c.x.replace(/\\dfrac\{(.*?)\}\{(.*?)\}/, "$1/$2").replace(/\\pi/g, "π")),
        explanation: exp(
          "Le point image de $x$ a pour coordonnées $(\\cos x ; \\sin x)$ : son abscisse est le cosinus, son ordonnée le sinus.",
          `On place $${c.x}$ sur le cercle en partant de $I(1 ; 0)$ — dans le sens direct s'il est positif, indirect s'il est négatif.`,
          `On lit alors directement les deux coordonnées du point atteint.`,
          `Le point image de $${c.x}$ est ${c.p}.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_trig_cs_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_cos_sin",
    difficulty: 5,
    theme: "neutral",
    hint: "Le cosinus est l'abscisse, le sinus l'ordonnée : leurs signes se lisent sur la position du point.",
    tags: ["premiere", "maths", "trigonometrie", "cos_sin", "canvas", "open", "template"],
    generate: () => {
      const cas = [
        { x: "\\dfrac{\\pi}{3}", deg: 60, quadrant: "premier", cos: "positif", sin: "positif" },
        { x: "\\dfrac{3\\pi}{4}", deg: 135, quadrant: "deuxième", cos: "negatif", sin: "positif" },
        { x: "\\dfrac{7\\pi}{6}", deg: 210, quadrant: "troisième", cos: "negatif", sin: "negatif" },
        { x: "-\\dfrac{\\pi}{4}", deg: -45, quadrant: "quatrième", cos: "positif", sin: "negatif" },
        { x: "\\dfrac{5\\pi}{3}", deg: 300, quadrant: "quatrième", cos: "positif", sin: "negatif" },
      ];
      const c = pickOne(cas);
      return {
        text: `Dans quel quadrant se trouve le point image de $${c.x}$ ? Précise les signes de $\\cos ${c.x}$ et de $\\sin ${c.x}$, et justifie.`,
        format: "open",
        expected: [c.quadrant, "abscisse", "ordonnee", "ordonnée", "signe"],
        comparator: "contains_keyword",
        canvas: cercleTrigo(c.deg, "M", undefined),
        explanation: exp(
          "Le cosinus est l'abscisse du point image, le sinus son ordonnée : leurs signes se lisent sur la position du point dans le repère.",
          `On place d'abord $${c.x}$ sur le cercle en partant de $I(1 ; 0)$.`,
          `Le point tombe dans le ${c.quadrant} quadrant : il est ${c.cos === "positif" ? "à droite" : "à gauche"} de l'axe des ordonnées et ${c.sin === "positif" ? "au-dessus" : "en dessous"} de l'axe des abscisses.`,
          `Donc $\\cos ${c.x}$ est ${c.cos === "positif" ? "positif" : "négatif"} et $\\sin ${c.x}$ est ${c.sin === "positif" ? "positif" : "négatif"}.`
        ),
      };
    },
  },

  /* ===================== TRIG_TRIANGLE_RECTANGLE ===================== */
  {
    kind: "fixed",
    id: "premiere_trig_tr_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_triangle_rectangle",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un triangle rectangle, le cosinus d'un angle aigu est le quotient :",
    format: "qcm",
    choices: [
      "$\\dfrac{\\text{côté adjacent}}{\\text{hypoténuse}}$",
      "$\\dfrac{\\text{côté opposé}}{\\text{hypoténuse}}$",
      "$\\dfrac{\\text{hypoténuse}}{\\text{côté adjacent}}$",
      "$\\dfrac{\\text{côté opposé}}{\\text{côté adjacent}}$",
    ],
    expected: ["$\\dfrac{\\text{côté adjacent}}{\\text{hypoténuse}}$"],
    comparator: "mcq_exact",
    hint: "C'est la définition vue au collège — le « CAH » de SOHCAHTOA.",
    explanation: exp(
      "Dans un triangle rectangle, le cosinus d'un angle aigu se lit sur les côtés : adjacent sur hypoténuse.",
      "Le côté adjacent est celui qui touche l'angle sans être l'hypoténuse.",
      "Le quotient opposé sur hypoténuse donne le sinus, et opposé sur adjacent la tangente.",
      "$\\cos = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$."
    ),
    tags: ["premiere", "maths", "trigonometrie", "triangle_rectangle", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_tr_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_triangle_rectangle",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un triangle rectangle, le sinus d'un angle aigu est le quotient :",
    format: "qcm",
    choices: [
      "$\\dfrac{\\text{côté opposé}}{\\text{hypoténuse}}$",
      "$\\dfrac{\\text{côté adjacent}}{\\text{hypoténuse}}$",
      "$\\dfrac{\\text{hypoténuse}}{\\text{côté opposé}}$",
      "$\\dfrac{\\text{côté adjacent}}{\\text{côté opposé}}$",
    ],
    expected: ["$\\dfrac{\\text{côté opposé}}{\\text{hypoténuse}}$"],
    comparator: "mcq_exact",
    hint: "Le « SOH » de SOHCAHTOA.",
    explanation: exp(
      "Le sinus d'un angle aigu d'un triangle rectangle est le quotient du côté opposé par l'hypoténuse.",
      "Le côté opposé est celui qui ne touche pas l'angle considéré.",
      "Comme l'hypoténuse est le plus grand côté, ce quotient est toujours compris entre $0$ et $1$ — ce qui rejoint le fait que $\\sin x \\in [-1 ; 1]$.",
      "$\\sin = \\dfrac{\\text{opposé}}{\\text{hypoténuse}}$."
    ),
    tags: ["premiere", "maths", "trigonometrie", "triangle_rectangle", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_tr_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_triangle_rectangle",
    difficulty: 4,
    theme: "neutral",
    text: "Pourquoi la définition sur le cercle trigonométrique redonne-t-elle celle du triangle rectangle ?",
    format: "qcm",
    choices: [
      "parce que le rayon, qui joue le rôle d'hypoténuse, vaut $1$",
      "parce que le cercle a un périmètre de $2\\pi$",
      "parce que tous les angles y sont aigus",
      "parce que le cosinus y est toujours positif",
    ],
    expected: ["parce que le rayon, qui joue le rôle d'hypoténuse, vaut $1$"],
    comparator: "mcq_exact",
    hint: "Dans le triangle $OHM$, que vaut l'hypoténuse $OM$ ?",
    explanation: exp(
      "On forme le triangle rectangle $OHM$ : $O$ le centre, $M$ le point image, $H$ le projeté de $M$ sur l'axe des abscisses.",
      "Dans ce triangle, l'hypoténuse est le rayon $OM$, le côté adjacent est $OH = \\cos x$ et le côté opposé $HM = \\sin x$.",
      "La formule du collège donne $\\cos = \\dfrac{OH}{OM} = \\dfrac{\\cos x}{1} = \\cos x$ : diviser par $1$ ne change rien. C'est parce que le rayon vaut $1$ que les deux définitions coïncident.",
      "Parce que l'hypoténuse, ici le rayon, vaut $1$."
    ),
    canvas: cercleTrigo(50, "M", undefined),
    tags: ["premiere", "maths", "trigonometrie", "triangle_rectangle", "canvas", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_tr_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_triangle_rectangle",
    difficulty: 4,
    theme: "neutral",
    text: "La définition du collège (avec les côtés d'un triangle rectangle) permet de définir le cosinus :",
    format: "qcm",
    choices: [
      "seulement pour les angles aigus, entre $0$ et $\\dfrac{\\pi}{2}$",
      "pour tous les réels",
      "seulement pour les angles obtus",
      "pour tous les angles entre $0$ et $\\pi$",
    ],
    expected: ["seulement pour les angles aigus, entre $0$ et $\\dfrac{\\pi}{2}$"],
    comparator: "mcq_exact",
    hint: "Un triangle rectangle peut-il contenir un angle obtus ?",
    explanation: exp(
      "Dans un triangle rectangle, la somme des deux autres angles vaut $90°$ : ils sont donc tous deux aigus.",
      "La définition du collège ne peut donc parler que d'angles compris entre $0$ et $\\dfrac{\\pi}{2}$.",
      "C'est exactement la raison d'être du cercle trigonométrique : il prolonge le cosinus et le sinus à TOUS les réels, y compris les angles obtus et les valeurs négatives, tout en redonnant les mêmes résultats sur les angles aigus.",
      "Seulement pour les angles aigus."
    ),
    tags: ["premiere", "maths", "trigonometrie", "triangle_rectangle", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_tr_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_triangle_rectangle",
    difficulty: 4,
    theme: "neutral",
    text: "Dans un triangle rectangle, un élève trouve $\\cos(\\widehat{A}) = 1{,}2$. Que peut-on en conclure ?",
    format: "qcm",
    choices: [
      "il s'est trompé : l'hypoténuse est le plus grand côté, le quotient ne peut pas dépasser $1$",
      "l'angle est obtus",
      "le triangle n'existe pas",
      "rien : c'est une valeur possible",
    ],
    expected: ["il s'est trompé : l'hypoténuse est le plus grand côté, le quotient ne peut pas dépasser $1$"],
    comparator: "mcq_exact",
    hint: "Compare le côté adjacent et l'hypoténuse.",
    explanation: exp(
      "Le cosinus d'un angle aigu est le quotient du côté adjacent par l'hypoténuse.",
      "Or l'hypoténuse est le plus long des trois côtés : le numérateur est plus petit que le dénominateur.",
      "Le quotient est donc strictement inférieur à $1$. Une valeur de $1{,}2$ signale une erreur — le plus souvent, l'hypoténuse et le côté adjacent ont été échangés.",
      "Il s'est trompé : un cosinus ne dépasse jamais $1$."
    ),
    tags: ["premiere", "maths", "trigonometrie", "triangle_rectangle", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_tr_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_triangle_rectangle",
    difficulty: 5,
    theme: "reunion",
    text: "Un sentier qui monte vers le Piton de la Fournaise fait un angle de $0{,}2$ radian avec l'horizontale. Sur $500$ m de sentier, quel dénivelé gagne-t-on ? (On prendra $\\sin(0{,}2) \\approx 0{,}199$.)",
    format: "qcm",
    choices: ["environ $99$ m", "environ $100$ m de distance horizontale", "environ $490$ m", "environ $2500$ m"],
    expected: ["environ $99$ m"],
    comparator: "mcq_exact",
    hint: "Le dénivelé est le côté OPPOSÉ à l'angle ; le sentier est l'hypoténuse.",
    explanation: exp(
      "On modélise la montée par un triangle rectangle : le sentier est l'hypoténuse, le dénivelé le côté opposé à l'angle de pente.",
      "$\\sin(\\text{angle}) = \\dfrac{\\text{dénivelé}}{\\text{longueur du sentier}}$, donc dénivelé $= 500 \\times \\sin(0{,}2)$.",
      "$500 \\times 0{,}199 = 99{,}5$, soit environ $99$ m. Si on avait pris le cosinus, on aurait obtenu la distance horizontale parcourue, environ $490$ m.",
      "On gagne environ $99$ m de dénivelé."
    ),
    tags: ["premiere", "maths", "trigonometrie", "triangle_rectangle", "reunion", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_tr_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_triangle_rectangle",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi on a eu besoin du cercle trigonométrique, alors que le collège définissait déjà le cosinus et le sinus.",
    format: "open",
    expected: ["angles aigus", "tous les reels", "tous les réels", "obtus", "negatif", "négatif", "prolonge"],
    comparator: "contains_keyword",
    hint: "Quels angles la définition du collège laisse-t-elle de côté ?",
    explanation: exp(
      "La définition du collège s'appuie sur un triangle rectangle : elle ne concerne donc que les angles aigus.",
      "Or on a besoin du cosinus et du sinus pour des angles obtus (en géométrie, avec Al-Kashi) et pour des réels quelconques, y compris négatifs ou supérieurs à un tour.",
      "Le cercle trigonométrique donne une définition valable pour TOUS les réels — le cosinus devient une abscisse, le sinus une ordonnée — tout en redonnant exactement les valeurs du collège sur les angles aigus.",
      "Le cercle prolonge les définitions du collège à tous les réels, sans les contredire."
    ),
    tags: ["premiere", "maths", "trigonometrie", "triangle_rectangle", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_tr_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_triangle_rectangle",
    difficulty: 5,
    theme: "neutral",
    text: "Sur le cercle trigonométrique, on note $M$ le point image d'un réel $x$ compris entre $0$ et $\\dfrac{\\pi}{2}$, et $H$ son projeté sur l'axe des abscisses. Explique pourquoi $OH = \\cos x$ retrouve bien la formule du collège.",
    format: "open",
    expected: ["hypotenuse", "hypoténuse", "rayon", "vaut 1", "adjacent", "divise par 1"],
    comparator: "contains_keyword",
    hint: "Dans le triangle $OHM$, repère l'hypoténuse et le côté adjacent à l'angle.",
    explanation: exp(
      "Dans le triangle $OHM$, l'angle droit est en $H$, et l'angle en $O$ a pour mesure $x$.",
      "Le côté adjacent à cet angle est $OH$, et l'hypoténuse est $OM$, c'est-à-dire le rayon du cercle.",
      "La formule du collège donne $\\cos x = \\dfrac{OH}{OM} = \\dfrac{OH}{1} = OH$ : diviser par le rayon ne change rien puisqu'il vaut $1$.",
      "Les deux définitions coïncident parce que l'hypoténuse est le rayon, et que ce rayon vaut $1$."
    ),
    canvas: cercleTrigo(50, "M", undefined),
    tags: ["premiere", "maths", "trigonometrie", "triangle_rectangle", "canvas", "open"],
  },
  {
    kind: "template",
    id: "premiere_trig_tr_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_triangle_rectangle",
    difficulty: 4,
    theme: "neutral",
    hint: "Repère d'abord l'hypoténuse : c'est le côté opposé à l'angle droit.",
    tags: ["premiere", "maths", "trigonometrie", "triangle_rectangle", "template"],
    generate: () => {
      const triangles = [
        { adj: 3, opp: 4, hyp: 5 },
        { adj: 6, opp: 8, hyp: 10 },
        { adj: 5, opp: 12, hyp: 13 },
        { adj: 8, opp: 15, hyp: 17 },
        { adj: 9, opp: 12, hyp: 15 },
      ];
      const t = pickOne(triangles);
      const sinus = pickOne([true, false]);
      const correct = sinus
        ? `$\\dfrac{${t.opp}}{${t.hyp}}$`
        : `$\\dfrac{${t.adj}}{${t.hyp}}$`;
      const autre = sinus
        ? `$\\dfrac{${t.adj}}{${t.hyp}}$`
        : `$\\dfrac{${t.opp}}{${t.hyp}}$`;
      return {
        text:
          `Un triangle $ABC$ est rectangle en $B$. Le côté adjacent à l'angle $\\widehat{A}$ mesure $${t.adj}$, ` +
          `le côté opposé $${t.opp}$ et l'hypoténuse $${t.hyp}$. Combien vaut $\\${sinus ? "sin" : "cos"}(\\widehat{A})$ ?`,
        format: "qcm",
        choices: [correct, autre, `$\\dfrac{${t.opp}}{${t.adj}}$`, `$\\dfrac{${t.hyp}}{${t.opp}}$`],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          sinus
            ? "Le sinus d'un angle aigu est le quotient du côté opposé par l'hypoténuse."
            : "Le cosinus d'un angle aigu est le quotient du côté adjacent par l'hypoténuse.",
          `L'hypoténuse mesure $${t.hyp}$, le côté ${sinus ? "opposé" : "adjacent"} à $\\widehat{A}$ mesure $${sinus ? t.opp : t.adj}$.`,
          `On forme le quotient : $\\dfrac{${sinus ? t.opp : t.adj}}{${t.hyp}}$. Ce nombre est bien inférieur à $1$, comme tout cosinus ou sinus d'un angle aigu.`,
          `$\\${sinus ? "sin" : "cos"}(\\widehat{A}) = ${correct.replace(/\$/g, "")}$.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_trig_tr_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_triangle_rectangle",
    difficulty: 5,
    theme: "neutral",
    hint: "Demande-toi quel côté tu cherches par rapport à l'angle : opposé, adjacent, ou hypoténuse.",
    tags: ["premiere", "maths", "trigonometrie", "triangle_rectangle", "open", "template"],
    generate: () => {
      const cas = [
        { objet: "une échelle appuyée contre un mur", hyp: "l'échelle", cherche: "la hauteur atteinte sur le mur", fonction: "sinus", mots: ["sinus", "oppose", "opposé"] },
        { objet: "une rampe d'accès", hyp: "la rampe", cherche: "la longueur au sol", fonction: "cosinus", mots: ["cosinus", "adjacent"] },
        { objet: "un câble de téléphérique", hyp: "le câble", cherche: "le dénivelé", fonction: "sinus", mots: ["sinus", "oppose", "opposé"] },
        { objet: "un toboggan", hyp: "le toboggan", cherche: "la distance horizontale parcourue", fonction: "cosinus", mots: ["cosinus", "adjacent"] },
      ];
      const c = pickOne(cas);
      return {
        text: `On connaît la longueur de ${c.hyp} et l'angle qu'${c.hyp} fait avec l'horizontale, pour ${c.objet}. Quelle fonction trigonométrique utilises-tu pour trouver ${c.cherche} ? Justifie.`,
        format: "open",
        expected: [...c.mots, "hypotenuse", "hypoténuse"],
        comparator: "contains_keyword",
        explanation: exp(
          "On modélise la situation par un triangle rectangle, puis on repère la place de chaque longueur : hypoténuse, côté opposé ou côté adjacent à l'angle.",
          `Ici ${c.hyp} joue le rôle de l'hypoténuse, puisque c'est le côté opposé à l'angle droit.`,
          c.fonction === "sinus"
            ? `${c.cherche.charAt(0).toUpperCase() + c.cherche.slice(1)} est le côté OPPOSÉ à l'angle : c'est donc le sinus qui relie les deux, par $\\sin = \\dfrac{\\text{opposé}}{\\text{hypoténuse}}$.`
            : `${c.cherche.charAt(0).toUpperCase() + c.cherche.slice(1)} est le côté ADJACENT à l'angle : c'est donc le cosinus qui relie les deux, par $\\cos = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$.`,
          `On utilise le ${c.fonction}, puis on multiplie par la longueur de ${c.hyp}.`
        ),
      };
    },
  },

  /* ===================== TRIG_ANGLES_ASSOCIES ===================== */
  {
    kind: "fixed",
    id: "premiere_trig_ang_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_angles_associes",
    difficulty: 5,
    theme: "neutral",
    text: "Combien vaut $\\cos(\\pi - x)$ ?",
    format: "qcm",
    choices: ["$-\\cos(x)$", "$\\cos(x)$", "$\\sin(x)$", "$-\\sin(x)$"],
    expected: ["$-\\cos(x)$"],
    comparator: "mcq_exact",
    hint: "Les points associés à $x$ et $\\pi - x$ sont symétriques par rapport à l'axe des ORDONNÉES.",
    explanation: exp(
      "Le point associé à $\\pi - x$ est le symétrique de celui de $x$ par rapport à l'axe des ordonnées.",
      "Une telle symétrie change le signe de l'abscisse et conserve l'ordonnée.",
      "Comme le cosinus est l'abscisse : $\\cos(\\pi - x) = -\\cos(x)$. (Le sinus, lui, est conservé.)",
      "$\\cos(\\pi - x) = -\\cos(x)$."
    ),
    tags: ["premiere", "maths", "trigonometrie", "angles_associes", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_ang_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_angles_associes",
    difficulty: 5,
    theme: "neutral",
    text: "Combien vaut $\\sin(\\pi - x)$ ?",
    format: "qcm",
    choices: ["$\\sin(x)$", "$-\\sin(x)$", "$\\cos(x)$", "$-\\cos(x)$"],
    expected: ["$\\sin(x)$"],
    comparator: "mcq_exact",
    hint: "Même symétrie que pour $\\cos(\\pi - x)$, mais on regarde l'ordonnée.",
    explanation: exp(
      "Le point associé à $\\pi - x$ est le symétrique de celui de $x$ par rapport à l'axe des ordonnées.",
      "Cette symétrie conserve l'ordonnée et change le signe de l'abscisse.",
      "Le sinus étant l'ordonnée, il est CONSERVÉ : $\\sin(\\pi - x) = \\sin(x)$.",
      "$\\sin(\\pi - x) = \\sin(x)$."
    ),
    tags: ["premiere", "maths", "trigonometrie", "angles_associes", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_ang_fixed_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_angles_associes",
    difficulty: 5,
    theme: "neutral",
    text: "Combien vaut $\\sin(\\pi + x)$ ?",
    format: "qcm",
    choices: ["$-\\sin(x)$", "$\\sin(x)$", "$\\cos(x)$", "$-\\cos(x)$"],
    expected: ["$-\\sin(x)$"],
    comparator: "mcq_exact",
    hint: "Ajouter $\\pi$, c'est passer au point diamétralement opposé.",
    explanation: exp(
      "Ajouter $\\pi$ à l'angle amène au point diamétralement opposé sur le cercle : c'est la symétrie de centre $O$.",
      "Cette symétrie change le signe des DEUX coordonnées.",
      "Donc $\\sin(\\pi + x) = -\\sin(x)$, et de même $\\cos(\\pi + x) = -\\cos(x)$.",
      "$\\sin(\\pi + x) = -\\sin(x)$."
    ),
    tags: ["premiere", "maths", "trigonometrie", "angles_associes", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_ang_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_angles_associes",
    difficulty: 5,
    theme: "neutral",
    text: "Combien vaut $\\cos\\left(\\dfrac{5\\pi}{3}\\right)$ ?",
    format: "qcm",
    choices: [
      "$\\dfrac{1}{2}$",
      "$-\\dfrac{1}{2}$",
      "$\\dfrac{\\sqrt{3}}{2}$",
      "$-\\dfrac{\\sqrt{3}}{2}$",
    ],
    expected: ["$\\dfrac{1}{2}$"],
    comparator: "mcq_exact",
    hint: "Écris $\\dfrac{5\\pi}{3} = 2\\pi - \\dfrac{\\pi}{3}$.",
    explanation: exp(
      "Pour un angle qui n'est pas remarquable, on le ramène à un angle connu avec les propriétés vues.",
      "$\\dfrac{5\\pi}{3} = 2\\pi - \\dfrac{\\pi}{3}$, donc $\\cos\\left(\\dfrac{5\\pi}{3}\\right) = \\cos\\left(-\\dfrac{\\pi}{3}\\right)$ par périodicité.",
      "Puis par parité, $\\cos\\left(-\\dfrac{\\pi}{3}\\right) = \\cos\\left(\\dfrac{\\pi}{3}\\right) = \\dfrac{1}{2}$. Le point est dans le 4ᵉ quadrant : abscisse positive, cohérent.",
      "$\\cos\\left(\\dfrac{5\\pi}{3}\\right) = \\dfrac{1}{2}$."
    ),
    tags: ["premiere", "maths", "trigonometrie", "angles_associes", "qcm"],
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
  {
    kind: "fixed",
    id: "premiere_trig_ang_fixed_12",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_angles_associes",
    difficulty: 4,
    theme: "neutral",
    text: "Combien vaut $\\cos(\\pi + x)$ ?",
    format: "qcm",
    choices: ["$-\\cos(x)$", "$\\cos(x)$", "$-\\sin(x)$", "$\\sin(x)$"],
    expected: ["$-\\cos(x)$"],
    comparator: "mcq_exact",
    hint: "Ajouter $\\pi$, c'est passer au point diamétralement opposé.",
    explanation: exp(
      "Ajouter $\\pi$ à un réel revient à faire un demi-tour : on obtient le point diamétralement opposé sur le cercle.",
      "Deux points diamétralement opposés ont des coordonnées opposées : $(\\cos x ; \\sin x)$ devient $(-\\cos x ; -\\sin x)$.",
      "L'abscisse change donc de signe : $\\cos(\\pi + x) = -\\cos(x)$ — et de même $\\sin(\\pi + x) = -\\sin(x)$.",
      "$\\cos(\\pi + x) = -\\cos(x)$."
    ),
    tags: ["premiere", "maths", "trigonometrie", "angles_associes", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_ang_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_angles_associes",
    difficulty: 5,
    theme: "neutral",
    text: "Explique comment retrouver $\\cos(\\pi - x)$ sur le cercle, sans apprendre la formule par cœur.",
    format: "open",
    expected: ["symetrie", "symétrie", "axe des ordonnees", "axe des ordonnées", "abscisse", "opposee", "opposée"],
    comparator: "contains_keyword",
    hint: "Où se trouve le point image de $\\pi - x$ par rapport à celui de $x$ ?",
    explanation: exp(
      "Toutes les formules d'angles associés se lisent sur une symétrie de la figure : inutile de les mémoriser une par une.",
      "Le point image de $\\pi - x$ est le symétrique de celui de $x$ par rapport à l'axe des ordonnées.",
      "Dans cette symétrie, l'abscisse change de signe et l'ordonnée est conservée : $\\cos(\\pi - x) = -\\cos x$ et $\\sin(\\pi - x) = \\sin x$.",
      "On lit la symétrie par rapport à l'axe des ordonnées : le cosinus devient son opposé, le sinus ne change pas."
    ),
    tags: ["premiere", "maths", "trigonometrie", "angles_associes", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_ang_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_angles_associes",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève écrit $\\sin(\\pi - x) = -\\sin(x)$. Explique son erreur en t'appuyant sur la figure.",
    format: "open",
    expected: ["ordonnee", "ordonnée", "conservee", "conservée", "meme", "même", "symetrie", "symétrie"],
    comparator: "contains_keyword",
    hint: "Que devient l'ordonnée dans une symétrie par rapport à l'axe des ordonnées ?",
    explanation: exp(
      "Le sinus est l'ordonnée du point image : pour savoir ce qu'il devient, il suffit de regarder ce que la symétrie fait à l'ordonnée.",
      "Le point image de $\\pi - x$ est le symétrique de celui de $x$ par rapport à l'axe des ORDONNÉES.",
      "Cette symétrie change l'abscisse en son opposée mais conserve l'ordonnée. Donc $\\sin(\\pi - x) = \\sin(x)$ ; c'est le cosinus qui change de signe. L'élève a confondu avec $\\sin(\\pi + x) = -\\sin(x)$, qui correspond au demi-tour.",
      "C'est faux : $\\sin(\\pi - x) = \\sin(x)$, car la symétrie conserve l'ordonnée."
    ),
    tags: ["premiere", "maths", "trigonometrie", "angles_associes", "piege", "open"],
  },
  {
    kind: "template",
    id: "premiere_trig_ang_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_angles_associes",
    difficulty: 5,
    theme: "neutral",
    hint: "Identifie d'abord la symétrie en jeu, puis dis ce qu'elle fait à l'abscisse et à l'ordonnée.",
    tags: ["premiere", "maths", "trigonometrie", "angles_associes", "open", "template"],
    generate: () => {
      const cas = [
        {
          q: "\\cos(\\pi - x)",
          r: "-\\cos x",
          sym: "la symétrie par rapport à l'axe des ordonnées",
          effet: "l'abscisse change de signe, l'ordonnée est conservée",
          mots: ["axe des ordonnees", "axe des ordonnées", "abscisse", "opposee", "opposée"],
        },
        {
          q: "\\sin(\\pi - x)",
          r: "\\sin x",
          sym: "la symétrie par rapport à l'axe des ordonnées",
          effet: "l'abscisse change de signe, l'ordonnée est conservée",
          mots: ["axe des ordonnees", "axe des ordonnées", "ordonnee", "ordonnée", "conservee", "conservée"],
        },
        {
          q: "\\cos(\\pi + x)",
          r: "-\\cos x",
          sym: "la symétrie par rapport au centre $O$ (le demi-tour)",
          effet: "les deux coordonnées changent de signe",
          mots: ["demi-tour", "centre", "opposee", "opposée", "diametralement", "diamétralement"],
        },
        {
          q: "\\sin(\\pi + x)",
          r: "-\\sin x",
          sym: "la symétrie par rapport au centre $O$ (le demi-tour)",
          effet: "les deux coordonnées changent de signe",
          mots: ["demi-tour", "centre", "opposee", "opposée", "diametralement", "diamétralement"],
        },
        {
          q: "\\cos(-x)",
          r: "\\cos x",
          sym: "la symétrie par rapport à l'axe des abscisses",
          effet: "l'abscisse est conservée, l'ordonnée change de signe",
          mots: ["axe des abscisses", "abscisse", "conservee", "conservée", "pair"],
        },
        {
          q: "\\sin(-x)",
          r: "-\\sin x",
          sym: "la symétrie par rapport à l'axe des abscisses",
          effet: "l'abscisse est conservée, l'ordonnée change de signe",
          mots: ["axe des abscisses", "ordonnee", "ordonnée", "opposee", "opposée", "impair"],
        },
      ];
      const c = pickOne(cas);
      return {
        text: `Retrouve $${c.q}$ en t'appuyant sur la figure : quelle symétrie relie les deux points images, et qu'en déduis-tu ?`,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: exp(
          "Chaque formule d'angle associé traduit une symétrie du cercle : c'est la figure qui donne le résultat, pas la mémoire.",
          `Ici les points images sont échangés par ${c.sym}.`,
          `Dans cette symétrie, ${c.effet}. Comme le cosinus est l'abscisse et le sinus l'ordonnée, on lit directement le résultat.`,
          `$${c.q} = ${c.r}$.`
        ),
      };
    },
  },

  /* ===================== TRIG_PARITE ===================== */
  {
    kind: "fixed",
    id: "premiere_trig_ang_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_parite",
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
    canvas: courbeCosDeuxPeriodes,
    tags: ["premiere", "maths", "trigonometrie", "parite", "canvas", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_ang_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_parite",
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
    canvas: courbeSinSymetrie,
    tags: ["premiere", "maths", "trigonometrie", "parite", "canvas", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_ang_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_parite",
    difficulty: 4,
    theme: "neutral",
    text: "Combien vaut $\\cos\\left(-\\dfrac{\\pi}{3}\\right)$ ?",
    format: "qcm",
    choices: [
      "$\\dfrac{1}{2}$",
      "$-\\dfrac{1}{2}$",
      "$\\dfrac{\\sqrt{3}}{2}$",
      "$-\\dfrac{\\sqrt{3}}{2}$",
    ],
    expected: ["$\\dfrac{1}{2}$"],
    comparator: "mcq_exact",
    hint: "Le cosinus est PAIR : $\\cos(-x) = \\cos(x)$.",
    explanation: exp(
      "La fonction cosinus est paire : $\\cos(-x) = \\cos(x)$. Le signe de l'angle ne change rien.",
      "Donc $\\cos\\left(-\\dfrac{\\pi}{3}\\right) = \\cos\\left(\\dfrac{\\pi}{3}\\right)$.",
      "$= \\dfrac{1}{2}$. Sur le cercle, les points associés à $\\dfrac{\\pi}{3}$ et $-\\dfrac{\\pi}{3}$ sont symétriques par rapport à l'axe des abscisses : ils ont la MÊME abscisse.",
      "$\\cos\\left(-\\dfrac{\\pi}{3}\\right) = \\dfrac{1}{2}$."
    ),
    tags: ["premiere", "maths", "trigonometrie", "parite", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_ang_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_parite",
    difficulty: 4,
    theme: "neutral",
    text: "Combien vaut $\\sin\\left(-\\dfrac{\\pi}{6}\\right)$ ?",
    format: "qcm",
    choices: [
      "$-\\dfrac{1}{2}$",
      "$\\dfrac{1}{2}$",
      "$-\\dfrac{\\sqrt{3}}{2}$",
      "$\\dfrac{\\sqrt{3}}{2}$",
    ],
    expected: ["$-\\dfrac{1}{2}$"],
    comparator: "mcq_exact",
    hint: "Le sinus est IMPAIR : $\\sin(-x) = -\\sin(x)$.",
    explanation: exp(
      "La fonction sinus est impaire : $\\sin(-x) = -\\sin(x)$. Le signe de l'angle se répercute sur le résultat.",
      "Donc $\\sin\\left(-\\dfrac{\\pi}{6}\\right) = -\\sin\\left(\\dfrac{\\pi}{6}\\right)$.",
      "$= -\\dfrac{1}{2}$. Les points associés à $\\dfrac{\\pi}{6}$ et $-\\dfrac{\\pi}{6}$ ont des ordonnées OPPOSÉES.",
      "$\\sin\\left(-\\dfrac{\\pi}{6}\\right) = -\\dfrac{1}{2}$."
    ),
    tags: ["premiere", "maths", "trigonometrie", "parite", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_par_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_parite",
    difficulty: 3,
    theme: "neutral",
    text: "La courbe de la fonction cosinus est symétrique par rapport à :",
    format: "qcm",
    choices: [
      "l'axe des ordonnées",
      "l'origine du repère",
      "l'axe des abscisses",
      "la droite d'équation $y = x$",
    ],
    expected: ["l'axe des ordonnées"],
    comparator: "mcq_exact",
    hint: "C'est la traduction graphique de la parité.",
    explanation: exp(
      "Une fonction paire a une courbe symétrique par rapport à l'axe des ordonnées ; une fonction impaire, par rapport à l'origine.",
      "Le cosinus est pair : $\\cos(-x) = \\cos(x)$.",
      "Les points d'abscisses $x$ et $-x$ sont donc à la même hauteur — on peut plier la feuille sur l'axe des ordonnées, les deux moitiés de la courbe se superposent.",
      "La courbe du cosinus est symétrique par rapport à l'axe des ordonnées."
    ),
    canvas: courbeCosDeuxPeriodes,
    tags: ["premiere", "maths", "trigonometrie", "parite", "canvas", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_par_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_parite",
    difficulty: 3,
    theme: "neutral",
    text: "La courbe de la fonction sinus est symétrique par rapport à :",
    format: "qcm",
    choices: [
      "l'origine du repère",
      "l'axe des ordonnées",
      "l'axe des abscisses",
      "la droite d'équation $y = 1$",
    ],
    expected: ["l'origine du repère"],
    comparator: "mcq_exact",
    hint: "C'est la traduction graphique de l'imparité.",
    explanation: exp(
      "Une fonction impaire a une courbe symétrique par rapport à l'origine du repère.",
      "Le sinus est impair : $\\sin(-x) = -\\sin(x)$.",
      "Les points d'abscisses $x$ et $-x$ sont donc à des hauteurs opposées : un demi-tour autour de l'origine ramène la courbe sur elle-même.",
      "La courbe du sinus est symétrique par rapport à l'origine."
    ),
    canvas: courbeSinSymetrie,
    tags: ["premiere", "maths", "trigonometrie", "parite", "canvas", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_par_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_parite",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève écrit $\\cos(-x) = -\\cos(x)$. Qu'a-t-il confondu ?",
    format: "qcm",
    choices: [
      "il a appliqué au cosinus l'imparité, qui est celle du sinus",
      "il a confondu $\\cos$ et $\\tan$",
      "il a oublié la périodicité",
      "rien : son égalité est correcte",
    ],
    expected: ["il a appliqué au cosinus l'imparité, qui est celle du sinus"],
    comparator: "mcq_exact",
    hint: "Teste avec $x = 0$ : que donnerait son égalité ?",
    explanation: exp(
      "Le cosinus est pair, le sinus est impair : ce sont deux comportements opposés qu'il ne faut pas échanger.",
      "Son égalité donnerait, pour $x = 0$ : $\\cos(0) = -\\cos(0)$, c'est-à-dire $1 = -1$. C'est absurde.",
      "Sur le cercle, les points images de $x$ et $-x$ sont symétriques par rapport à l'axe des abscisses : même abscisse (donc même cosinus), ordonnées opposées (donc sinus opposés).",
      "Il a appliqué au cosinus la règle du sinus : $\\cos(-x) = \\cos(x)$."
    ),
    tags: ["premiere", "maths", "trigonometrie", "parite", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_par_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_parite",
    difficulty: 5,
    theme: "neutral",
    text: "En t'appuyant sur le cercle trigonométrique, explique pourquoi le cosinus est pair et le sinus impair.",
    format: "open",
    expected: ["axe des abscisses", "symetrie", "symétrie", "meme abscisse", "même abscisse", "ordonnees opposees", "ordonnées opposées"],
    comparator: "contains_keyword",
    hint: "Place les points images de $x$ et de $-x$ : comment sont-ils placés l'un par rapport à l'autre ?",
    explanation: exp(
      "Le cosinus est l'abscisse du point image, le sinus son ordonnée : tout se lit sur la position des points.",
      "Les réels $x$ et $-x$ s'enroulent de la même longueur mais dans des sens opposés : leurs points images sont symétriques par rapport à l'axe des abscisses.",
      "Deux points symétriques par rapport à l'axe des abscisses ont la MÊME abscisse et des ordonnées OPPOSÉES.",
      "D'où $\\cos(-x) = \\cos(x)$ — le cosinus est pair — et $\\sin(-x) = -\\sin(x)$ — le sinus est impair."
    ),
    canvas: cercleTrigo(60, "M", undefined),
    tags: ["premiere", "maths", "trigonometrie", "parite", "canvas", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_par_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_parite",
    difficulty: 5,
    theme: "neutral",
    text: "Que voit-on sur les courbes qui traduit la parité du cosinus et l'imparité du sinus ?",
    format: "open",
    expected: ["axe des ordonnees", "axe des ordonnées", "origine", "symetrique", "symétrique", "demi-tour", "plier"],
    comparator: "contains_keyword",
    hint: "Une symétrie pour chaque courbe : laquelle, et par rapport à quoi ?",
    explanation: exp(
      "La parité se lit toujours sur la courbe : paire signifie symétrique par rapport à l'axe des ordonnées, impaire symétrique par rapport à l'origine.",
      "Pour le cosinus, les points d'abscisses $x$ et $-x$ sont à la même hauteur : la courbe se replie sur elle-même si on plie la feuille le long de l'axe des ordonnées.",
      "Pour le sinus, ces points sont à des hauteurs opposées : c'est un demi-tour autour de l'origine qui ramène la courbe sur elle-même.",
      "La courbe du cosinus est symétrique par rapport à l'axe des ordonnées, celle du sinus par rapport à l'origine."
    ),
    canvas: courbeCosSin,
    tags: ["premiere", "maths", "trigonometrie", "parite", "canvas", "open"],
  },
  {
    kind: "template",
    id: "premiere_trig_par_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_parite",
    difficulty: 4,
    theme: "neutral",
    hint: "Cosinus : le signe de l'angle disparaît. Sinus : il ressort devant.",
    tags: ["premiere", "maths", "trigonometrie", "parite", "template"],
    generate: () => {
      const valeurs = [
        { x: "\\dfrac{\\pi}{6}", cos: "\\dfrac{\\sqrt{3}}{2}", sin: "\\dfrac{1}{2}" },
        { x: "\\dfrac{\\pi}{4}", cos: "\\dfrac{\\sqrt{2}}{2}", sin: "\\dfrac{\\sqrt{2}}{2}" },
        { x: "\\dfrac{\\pi}{3}", cos: "\\dfrac{1}{2}", sin: "\\dfrac{\\sqrt{3}}{2}" },
      ];
      const v = pickOne(valeurs);
      const cosinus = pickOne([true, false]);
      const correct = cosinus ? `$${v.cos}$` : `$-${v.sin}$`;
      const piege = cosinus ? `$-${v.cos}$` : `$${v.sin}$`;
      return {
        text: `Combien vaut $\\${cosinus ? "cos" : "sin"}\\left(-${v.x}\\right)$ ?`,
        format: "qcm",
        choices: cosinus
          ? [correct, piege, `$${v.sin}$`, `$-${v.sin}$`]
          : [correct, piege, `$${v.cos}$`, `$-${v.cos}$`],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          cosinus
            ? "Le cosinus est PAIR : $\\cos(-x) = \\cos(x)$, le signe de l'angle disparaît."
            : "Le sinus est IMPAIR : $\\sin(-x) = -\\sin(x)$, le signe de l'angle ressort devant le résultat.",
          cosinus
            ? `Donc $\\cos\\left(-${v.x}\\right) = \\cos\\left(${v.x}\\right)$.`
            : `Donc $\\sin\\left(-${v.x}\\right) = -\\sin\\left(${v.x}\\right)$.`,
          cosinus
            ? `Or $\\cos\\left(${v.x}\\right) = ${v.cos}$.`
            : `Or $\\sin\\left(${v.x}\\right) = ${v.sin}$, donc le résultat est son opposé.`,
          `${correct}.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_trig_par_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_parite",
    difficulty: 5,
    theme: "neutral",
    hint: "Calcule $f(-x)$ et compare-le à $f(x)$ puis à $-f(x)$.",
    tags: ["premiere", "maths", "trigonometrie", "parite", "open", "template"],
    generate: () => {
      const cas = [
        { f: "f(x) = \\cos(2x)", nature: "paire", mots: ["paire", "cos(-2x)", "cosinus est pair", "f(-x) = f(x)"] },
        { f: "f(x) = \\sin(3x)", nature: "impaire", mots: ["impaire", "sinus est impair", "opposee", "opposée", "-f(x)"] },
        { f: "f(x) = \\cos(x) + \\sin(x)", nature: "ni paire ni impaire", mots: ["ni paire", "ni l'un ni l'autre", "contre-exemple", "aucune"] },
        { f: "f(x) = x\\,\\sin(x)", nature: "paire", mots: ["paire", "deux signes", "produit", "f(-x) = f(x)"] },
        { f: "f(x) = 3\\cos(x)", nature: "paire", mots: ["paire", "cosinus est pair", "f(-x) = f(x)"] },
      ];
      const c = pickOne(cas);
      return {
        text: `La fonction définie par $${c.f}$ est-elle paire, impaire, ou ni l'une ni l'autre ? Justifie en calculant $f(-x)$.`,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: exp(
          "Une fonction est paire si $f(-x) = f(x)$ pour tout $x$, impaire si $f(-x) = -f(x)$, et ni l'une ni l'autre sinon — un seul contre-exemple suffit alors.",
          `On calcule $f(-x)$ en remplaçant $x$ par $-x$ dans $${c.f}$, en utilisant $\\cos(-u) = \\cos u$ et $\\sin(-u) = -\\sin u$.`,
          c.nature === "ni paire ni impaire"
            ? "On compare le résultat à $f(x)$ et à $-f(x)$ : aucune des deux égalités n'est vraie pour tout $x$ (essayer $x = \\dfrac{\\pi}{2}$ suffit à le voir)."
            : `On compare le résultat à $f(x)$ et à $-f(x)$ : c'est la ${c.nature === "paire" ? "première" : "seconde"} égalité qui est vérifiée pour tout $x$.`,
          `La fonction est ${c.nature}.`
        ),
      };
    },
  },

  /* ===================== TRIG_PERIODICITE ===================== */
  {
    kind: "fixed",
    id: "premiere_trig_ang_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_periodicite",
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
    tags: ["premiere", "maths", "trigonometrie", "periodicite", "canvas", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_ang_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_periodicite",
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
    tags: ["premiere", "maths", "trigonometrie", "periodicite", "canvas", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_ang_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_periodicite",
    difficulty: 3,
    theme: "neutral",
    text: "Combien vaut $\\sin(x + 2\\pi)$ ?",
    format: "qcm",
    choices: ["$\\sin(x)$", "$-\\sin(x)$", "$\\cos(x)$", "$\\sin(x) + 2\\pi$"],
    expected: ["$\\sin(x)$"],
    comparator: "mcq_exact",
    hint: "Ajouter $2\\pi$, c'est faire un tour complet.",
    explanation: exp(
      "Le sinus est périodique de période $2\\pi$, tout comme le cosinus.",
      "Ajouter $2\\pi$ à l'angle revient à revenir exactement au même point du cercle.",
      "L'ordonnée est donc inchangée : $\\sin(x + 2\\pi) = \\sin(x)$.",
      "$\\sin(x + 2\\pi) = \\sin(x)$."
    ),
    tags: ["premiere", "maths", "trigonometrie", "periodicite", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_per_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_periodicite",
    difficulty: 3,
    theme: "neutral",
    text: "Que signifie « la fonction $f$ est périodique de période $T$ » ?",
    format: "qcm",
    choices: [
      "$f(x + T) = f(x)$ pour tout réel $x$",
      "$f(T) = 0$",
      "$f(x + T) = f(x) + T$ pour tout réel $x$",
      "$f$ prend la même valeur $T$ fois",
    ],
    expected: ["$f(x + T) = f(x)$ pour tout réel $x$"],
    comparator: "mcq_exact",
    hint: "Avancer de $T$ ne doit rien changer au résultat.",
    explanation: exp(
      "Une fonction est périodique de période $T$ lorsqu'un décalage de $T$ sur la variable ne change pas la valeur.",
      "Cela s'écrit $f(x + T) = f(x)$, et ce POUR TOUT réel $x$ — pas seulement pour quelques valeurs.",
      "Graphiquement, la courbe se répète à l'identique tous les $T$ : il suffit d'en connaître un morceau de largeur $T$ pour la connaître entièrement.",
      "$f(x + T) = f(x)$ pour tout réel $x$."
    ),
    tags: ["premiere", "maths", "trigonometrie", "periodicite", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_per_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_periodicite",
    difficulty: 4,
    theme: "neutral",
    text: "A-t-on $\\cos(x + \\pi) = \\cos(x)$ ?",
    format: "qcm",
    choices: [
      "non : $\\cos(x + \\pi) = -\\cos(x)$, la période est $2\\pi$ et non $\\pi$",
      "oui, toujours",
      "oui, seulement pour $x$ positif",
      "non : $\\cos(x + \\pi) = \\sin(x)$",
    ],
    expected: ["non : $\\cos(x + \\pi) = -\\cos(x)$, la période est $2\\pi$ et non $\\pi$"],
    comparator: "mcq_exact",
    hint: "Teste avec $x = 0$ : à gauche $\\cos(\\pi)$, à droite $\\cos(0)$.",
    explanation: exp(
      "La période du cosinus est $2\\pi$ : c'est un TOUR complet qui ramène au même point, pas un demi-tour.",
      "Contre-exemple immédiat : pour $x = 0$, à gauche $\\cos(\\pi) = -1$, à droite $\\cos(0) = 1$.",
      "Ajouter $\\pi$ envoie sur le point diamétralement opposé, dont les coordonnées sont opposées : $\\cos(x + \\pi) = -\\cos(x)$.",
      "Non : la période est $2\\pi$, et $\\cos(x + \\pi) = -\\cos(x)$."
    ),
    tags: ["premiere", "maths", "trigonometrie", "periodicite", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_per_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_periodicite",
    difficulty: 3,
    theme: "neutral",
    text: "Sur la courbe d'une fonction périodique de période $2\\pi$, que voit-on ?",
    format: "qcm",
    choices: [
      "un même motif qui se répète tous les $2\\pi$",
      "une courbe qui monte indéfiniment",
      "une courbe symétrique par rapport à l'origine",
      "une courbe qui s'arrête en $2\\pi$",
    ],
    expected: ["un même motif qui se répète tous les $2\\pi$"],
    comparator: "mcq_exact",
    hint: "Que devient la courbe si on la décale horizontalement de $2\\pi$ ?",
    explanation: exp(
      "La périodicité $f(x + 2\\pi) = f(x)$ signifie qu'un décalage horizontal de $2\\pi$ laisse la courbe inchangée.",
      "Graphiquement, un même motif — appelé motif élémentaire — se reproduit à l'identique indéfiniment, à gauche comme à droite.",
      "C'est très économique : il suffit d'étudier la fonction sur un intervalle de largeur $2\\pi$, par exemple $[0 ; 2\\pi]$ ou $[-\\pi ; \\pi]$, pour la connaître partout.",
      "On voit un motif qui se répète tous les $2\\pi$."
    ),
    canvas: courbeCosDeuxPeriodes,
    tags: ["premiere", "maths", "trigonometrie", "periodicite", "canvas", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_per_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_periodicite",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi la période du cosinus est $2\\pi$ et non $\\pi$.",
    format: "open",
    expected: ["tour complet", "demi-tour", "meme point", "même point", "oppose", "opposé", "contre-exemple"],
    comparator: "contains_keyword",
    hint: "Où arrive-t-on sur le cercle après avoir ajouté $\\pi$ ? Et après $2\\pi$ ?",
    explanation: exp(
      "La période est le plus petit décalage qui ramène exactement aux mêmes valeurs, pour TOUS les réels.",
      "Ajouter $2\\pi$ correspond à un tour complet du cercle : on revient au même point, donc à la même abscisse.",
      "Ajouter $\\pi$ ne fait qu'un demi-tour : on arrive au point diamétralement opposé, d'abscisse opposée. Contre-exemple : $\\cos(0) = 1$ mais $\\cos(\\pi) = -1$.",
      "La période est $2\\pi$ : seul le tour complet ramène au même point du cercle."
    ),
    tags: ["premiere", "maths", "trigonometrie", "periodicite", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_per_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_periodicite",
    difficulty: 5,
    theme: "neutral",
    text: "Comment la périodicité permet-elle de calculer $\\cos\\dfrac{25\\pi}{6}$ ?",
    format: "open",
    expected: ["retire", "enleve", "enlève", "2pi", "tours", "\\dfrac{\\pi}{6}", "pi/6"],
    comparator: "contains_keyword",
    hint: "Combien de tours complets peut-on enlever à $\\dfrac{25\\pi}{6}$ ?",
    explanation: exp(
      "La périodicité permet de retirer autant de tours complets qu'on veut sans changer le résultat : $\\cos(x + 2k\\pi) = \\cos(x)$.",
      "On écrit $\\dfrac{25\\pi}{6} = \\dfrac{\\pi}{6} + \\dfrac{24\\pi}{6} = \\dfrac{\\pi}{6} + 4\\pi$.",
      "Or $4\\pi$ vaut deux tours complets : on peut les enlever. Il reste $\\cos\\dfrac{25\\pi}{6} = \\cos\\dfrac{\\pi}{6}$.",
      "$\\cos\\dfrac{25\\pi}{6} = \\dfrac{\\sqrt{3}}{2}$ : on ramène l'angle dans $[0 ; 2\\pi[$ en retirant des tours."
    ),
    tags: ["premiere", "maths", "trigonometrie", "periodicite", "open"],
  },
  {
    kind: "template",
    id: "premiere_trig_per_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_periodicite",
    difficulty: 4,
    theme: "neutral",
    hint: "Retire des tours complets ($2\\pi$) jusqu'à tomber dans $[0 ; 2\\pi[$.",
    tags: ["premiere", "maths", "trigonometrie", "periodicite", "template"],
    generate: () => {
      const cas = [
        { grand: "\\dfrac{13\\pi}{6}", reduit: "\\dfrac{\\pi}{6}", tours: "un tour" },
        { grand: "\\dfrac{25\\pi}{6}", reduit: "\\dfrac{\\pi}{6}", tours: "deux tours" },
        { grand: "\\dfrac{17\\pi}{4}", reduit: "\\dfrac{\\pi}{4}", tours: "deux tours" },
        { grand: "\\dfrac{13\\pi}{3}", reduit: "\\dfrac{\\pi}{3}", tours: "deux tours" },
        { grand: "\\dfrac{9\\pi}{4}", reduit: "\\dfrac{\\pi}{4}", tours: "un tour" },
        { grand: "\\dfrac{7\\pi}{3}", reduit: "\\dfrac{\\pi}{3}", tours: "un tour" },
      ];
      const c = pickOne(cas);
      const cosinus = pickOne([true, false]);
      const f = cosinus ? "cos" : "sin";
      const correct = `$\\${f}${c.reduit.startsWith("\\dfrac") ? `\\left(${c.reduit}\\right)` : `(${c.reduit})`}$`;
      return {
        text: `À quelle expression plus simple $\\${f}\\left(${c.grand}\\right)$ est-il égal ?`,
        format: "qcm",
        choices: [
          correct,
          `$-\\${f}\\left(${c.reduit}\\right)$`,
          `$\\${cosinus ? "sin" : "cos"}\\left(${c.reduit}\\right)$`,
          `$\\${f}\\left(${c.grand}\\right) - 2\\pi$`,
        ],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Le cosinus et le sinus sont périodiques de période $2\\pi$ : on peut ajouter ou retirer autant de tours complets qu'on veut.",
          `On décompose $${c.grand}$ en $${c.reduit}$ plus ${c.tours} complet(s).`,
          `Les tours complets n'ont aucun effet sur la valeur : ils ramènent au même point du cercle.`,
          `${correct}.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_trig_per_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_periodicite",
    difficulty: 5,
    theme: "neutral",
    hint: "Écris le réel sous la forme « quelque chose dans $[0 ; 2\\pi[$ » plus un nombre entier de tours.",
    tags: ["premiere", "maths", "trigonometrie", "periodicite", "open", "template"],
    generate: () => {
      const cas = [
        { x: "\\dfrac{19\\pi}{4}", reduit: "\\dfrac{3\\pi}{4}", k: "2" },
        { x: "\\dfrac{29\\pi}{6}", reduit: "\\dfrac{5\\pi}{6}", k: "2" },
        { x: "\\dfrac{11\\pi}{3}", reduit: "\\dfrac{5\\pi}{3}", k: "1" },
        { x: "-\\dfrac{\\pi}{3}", reduit: "\\dfrac{5\\pi}{3}", k: "-1" },
        { x: "-\\dfrac{3\\pi}{4}", reduit: "\\dfrac{5\\pi}{4}", k: "-1" },
      ];
      const c = pickOne(cas);
      return {
        text: `Ramène le réel $${c.x}$ dans l'intervalle $[0 ; 2\\pi[$, et explique pourquoi cela ne change ni son cosinus ni son sinus.`,
        format: "open",
        expected: ["2pi", "tour", "periodique", "périodique", "meme point", "même point", c.reduit],
        comparator: "contains_keyword",
        explanation: exp(
          "Deux réels qui diffèrent d'un nombre entier de tours ont le même point image : ils ont donc le même cosinus et le même sinus.",
          `On cherche l'entier $k$ tel que $${c.x} - 2k\\pi$ tombe dans $[0 ; 2\\pi[$ : ici $k = ${c.k}$.`,
          `On obtient $${c.reduit}$, qui est bien compris entre $0$ et $2\\pi$.`,
          `$${c.x}$ et $${c.reduit}$ ont le même point image : cosinus et sinus sont inchangés.`
        ),
      };
    },
  },

  /* ===================== TRIG_COURBES ===================== */
  {
    kind: "fixed",
    id: "premiere_trig_crb_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_courbes",
    difficulty: 3,
    theme: "neutral",
    text: "Sur $[0 ; 2\\pi]$, la courbe de la fonction cosinus part du point :",
    format: "qcm",
    choices: ["$(0 ; 1)$, puis descend", "$(0 ; 0)$, puis monte", "$(0 ; -1)$, puis monte", "$(1 ; 0)$, puis descend"],
    expected: ["$(0 ; 1)$, puis descend"],
    comparator: "mcq_exact",
    hint: "Que vaut $\\cos(0)$ ? Et $\\cos\\left(\\dfrac{\\pi}{2}\\right)$ ?",
    explanation: exp(
      "Le point de départ de la courbe s'obtient en calculant l'image de $0$.",
      "$\\cos(0) = 1$ : la courbe part du point $(0 ; 1)$, c'est-à-dire de son maximum.",
      "Ensuite $\\cos\\left(\\dfrac{\\pi}{2}\\right) = 0$ puis $\\cos(\\pi) = -1$ : la courbe descend jusqu'à son minimum en $\\pi$, avant de remonter.",
      "Elle part de $(0 ; 1)$ et descend."
    ),
    canvas: courbeCos,
    tags: ["premiere", "maths", "trigonometrie", "courbes", "canvas", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_crb_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_courbes",
    difficulty: 4,
    theme: "neutral",
    text: "En quels réels de $[0 ; 2\\pi]$ la courbe du sinus coupe-t-elle l'axe des abscisses ?",
    format: "qcm",
    choices: [
      "$0$, $\\pi$ et $2\\pi$",
      "$\\dfrac{\\pi}{2}$ et $\\dfrac{3\\pi}{2}$",
      "$0$ et $2\\pi$ seulement",
      "$\\pi$ seulement",
    ],
    expected: ["$0$, $\\pi$ et $2\\pi$"],
    comparator: "mcq_exact",
    hint: "Couper l'axe des abscisses, c'est avoir un sinus nul : où le point image est-il sur l'axe horizontal ?",
    explanation: exp(
      "La courbe coupe l'axe des abscisses là où la fonction s'annule : on cherche les réels dont le sinus est nul.",
      "Le sinus est l'ordonnée du point image : il est nul quand ce point est sur l'axe des abscisses, c'est-à-dire en $I(1 ; 0)$ ou en $(-1 ; 0)$.",
      "Sur $[0 ; 2\\pi]$, cela correspond à $x = 0$, $x = \\pi$ et $x = 2\\pi$. Attention à ne pas confondre avec $\\dfrac{\\pi}{2}$ et $\\dfrac{3\\pi}{2}$, où c'est le COSINUS qui s'annule.",
      "En $0$, $\\pi$ et $2\\pi$."
    ),
    canvas: courbeCosSin,
    tags: ["premiere", "maths", "trigonometrie", "courbes", "canvas", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_crb_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_courbes",
    difficulty: 5,
    theme: "neutral",
    text: "Les deux courbes ont exactement la même allure. Comment passe-t-on de celle du cosinus à celle du sinus ?",
    format: "qcm",
    choices: [
      "par une translation de $\\dfrac{\\pi}{2}$ vers la droite",
      "par une symétrie par rapport à l'axe des abscisses",
      "par une translation de $\\pi$ vers la droite",
      "par un agrandissement",
    ],
    expected: ["par une translation de $\\dfrac{\\pi}{2}$ vers la droite"],
    comparator: "mcq_exact",
    hint: "Le maximum du cosinus est en $0$ ; celui du sinus, en quel réel ?",
    explanation: exp(
      "Deux courbes de même allure se déduisent l'une de l'autre par une transformation : ici on compare les positions des maximums.",
      "Le cosinus atteint son maximum en $x = 0$, le sinus en $x = \\dfrac{\\pi}{2}$ : tout est décalé d'un quart de tour vers la droite.",
      "Cela se démontre : $\\sin(x) = \\cos\\left(x - \\dfrac{\\pi}{2}\\right)$. Sur le cercle, cela correspond au quart de tour qui échange l'abscisse et l'ordonnée.",
      "Par une translation de $\\dfrac{\\pi}{2}$ vers la droite."
    ),
    canvas: courbeCosSin,
    tags: ["premiere", "maths", "trigonometrie", "courbes", "canvas", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_crb_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_courbes",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la valeur maximale de $\\sin x$, et pour quel réel de $[0 ; 2\\pi]$ est-elle atteinte ?",
    format: "qcm",
    choices: [
      "$1$, atteint en $\\dfrac{\\pi}{2}$",
      "$1$, atteint en $0$",
      "$2\\pi$, atteint en $2\\pi$",
      "$\\dfrac{\\pi}{2}$, atteint en $1$",
    ],
    expected: ["$1$, atteint en $\\dfrac{\\pi}{2}$"],
    comparator: "mcq_exact",
    hint: "À quel moment le point image est-il le plus haut sur le cercle ?",
    explanation: exp(
      "Le sinus est l'ordonnée du point image : il est maximal quand ce point est le plus haut sur le cercle.",
      "Le point le plus haut du cercle est $(0 ; 1)$, atteint pour $x = \\dfrac{\\pi}{2}$.",
      "La valeur maximale est donc $1$. Le piège consiste à confondre la valeur du maximum ($1$, une ordonnée) avec l'endroit où il est atteint ($\\dfrac{\\pi}{2}$, une abscisse).",
      "Le maximum vaut $1$ et il est atteint en $\\dfrac{\\pi}{2}$."
    ),
    canvas: courbeCosSin,
    tags: ["premiere", "maths", "trigonometrie", "courbes", "canvas", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_crb_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_courbes",
    difficulty: 4,
    theme: "neutral",
    text: "Sur l'intervalle $[0 ; \\pi]$, la fonction cosinus est :",
    format: "qcm",
    choices: [
      "décroissante, de $1$ à $-1$",
      "croissante, de $-1$ à $1$",
      "croissante puis décroissante",
      "constante",
    ],
    expected: ["décroissante, de $1$ à $-1$"],
    comparator: "mcq_exact",
    hint: "Suis le point image de $I(1 ; 0)$ jusqu'à $(-1 ; 0)$ : son abscisse augmente-t-elle ou diminue-t-elle ?",
    explanation: exp(
      "Le cosinus est l'abscisse du point image : on suit son évolution quand le point parcourt le demi-cercle du haut.",
      "Quand $x$ va de $0$ à $\\pi$, le point image part de $I(1 ; 0)$, passe par $(0 ; 1)$ et arrive en $(-1 ; 0)$.",
      "Son abscisse passe de $1$ à $0$ puis à $-1$ : elle ne cesse de diminuer.",
      "Le cosinus est décroissant sur $[0 ; \\pi]$, de $1$ à $-1$."
    ),
    canvas: courbeCos,
    tags: ["premiere", "maths", "trigonometrie", "courbes", "canvas", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_crb_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_courbes",
    difficulty: 4,
    theme: "neutral",
    text: "Quand le point image parcourt le cercle trigonométrique, la courbe du sinus représente l'évolution de :",
    format: "qcm",
    choices: [
      "son ordonnée",
      "son abscisse",
      "la longueur de l'arc parcouru",
      "sa distance au centre",
    ],
    expected: ["son ordonnée"],
    comparator: "mcq_exact",
    hint: "Sinus = ordonnée. Que trace-t-on en fonction de quoi ?",
    explanation: exp(
      "La courbe d'une fonction représente ses valeurs en fonction de la variable.",
      "Ici la variable est le réel $x$ enroulé sur le cercle, et la valeur est $\\sin x$, c'est-à-dire l'ORDONNÉE du point image.",
      "On peut voir la courbe comme le « déroulé » du mouvement vertical du point : quand il monte, la courbe monte ; quand il redescend, elle redescend. Sa distance au centre, elle, ne change jamais — elle vaut $1$.",
      "La courbe du sinus représente l'évolution de l'ordonnée du point image."
    ),
    canvas: courbeCosSin,
    tags: ["premiere", "maths", "trigonometrie", "courbes", "canvas", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_crb_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_courbes",
    difficulty: 5,
    theme: "neutral",
    text: "Explique le lien entre le tour du cercle trigonométrique et une période de la courbe du cosinus.",
    format: "open",
    expected: ["tour complet", "2pi", "meme point", "même point", "motif", "repete", "répète"],
    comparator: "contains_keyword",
    hint: "Que se passe-t-il sur la courbe pendant que le point fait un tour ?",
    explanation: exp(
      "La courbe du cosinus représente l'abscisse du point image en fonction du réel enroulé.",
      "Pendant que le point fait un tour complet du cercle — c'est-à-dire pendant que $x$ augmente de $2\\pi$ — son abscisse part de $1$, descend jusqu'à $-1$, puis remonte à $1$.",
      "La courbe décrit donc exactement un motif complet, de crête à crête. Au tour suivant, le point repasse par les mêmes positions : le motif recommence à l'identique.",
      "Un tour de cercle correspond à une période de la courbe : c'est la même chose vue de deux façons."
    ),
    canvas: courbeCosDeuxPeriodes,
    tags: ["premiere", "maths", "trigonometrie", "courbes", "canvas", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_trig_crb_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_courbes",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève affirme que la courbe du sinus finit par dépasser $1$ si on va assez loin. Explique pourquoi c'est impossible.",
    format: "open",
    expected: ["ordonnee", "ordonnée", "rayon 1", "periodique", "périodique", "meme motif", "même motif", "[-1 ; 1]"],
    comparator: "contains_keyword",
    hint: "Deux arguments suffisent : ce que représente le sinus, et la périodicité.",
    explanation: exp(
      "Le sinus est l'ordonnée d'un point situé sur le cercle de rayon $1$ : elle est nécessairement comprise entre $-1$ et $1$.",
      "Aller « plus loin » sur l'axe des abscisses revient à faire des tours supplémentaires sur le cercle.",
      "Or la fonction est périodique de période $2\\pi$ : après un tour, le point repasse exactement par les mêmes positions, et la courbe reproduit le même motif. Rien de nouveau ne peut apparaître.",
      "C'est impossible : $\\sin x \\in [-1 ; 1]$ pour tout réel, et la courbe se répète à l'identique."
    ),
    canvas: courbeSinSymetrie,
    tags: ["premiere", "maths", "trigonometrie", "courbes", "canvas", "piege", "open"],
  },
  {
    kind: "template",
    id: "premiere_trig_crb_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_courbes",
    difficulty: 4,
    theme: "neutral",
    hint: "Repère la position du point image sur le cercle, puis lis la coordonnée demandée.",
    tags: ["premiere", "maths", "trigonometrie", "courbes", "canvas", "template"],
    generate: () => {
      const cas = [
        { i: "\\left[0 ; \\dfrac{\\pi}{2}\\right]", f: "cosinus", sens: "décroissante", de: "1", a: "0" },
        { i: "\\left[\\dfrac{\\pi}{2} ; \\pi\\right]", f: "cosinus", sens: "décroissante", de: "0", a: "-1" },
        { i: "\\left[0 ; \\dfrac{\\pi}{2}\\right]", f: "sinus", sens: "croissante", de: "0", a: "1" },
        { i: "\\left[\\dfrac{\\pi}{2} ; \\pi\\right]", f: "sinus", sens: "décroissante", de: "1", a: "0" },
        { i: "\\left[\\pi ; \\dfrac{3\\pi}{2}\\right]", f: "sinus", sens: "décroissante", de: "0", a: "-1" },
        { i: "\\left[\\pi ; \\dfrac{3\\pi}{2}\\right]", f: "cosinus", sens: "croissante", de: "-1", a: "0" },
      ];
      const c = pickOne(cas);
      const correct = `${c.sens}, de $${c.de}$ à $${c.a}$`;
      const autre = c.sens === "croissante" ? `décroissante, de $${c.a}$ à $${c.de}$` : `croissante, de $${c.a}$ à $${c.de}$`;
      return {
        text: `Sur l'intervalle $${c.i}$, comment varie la fonction ${c.f} ?`,
        format: "qcm",
        choices: [correct, autre, "constante", "croissante puis décroissante"],
        expected: [correct],
        comparator: "mcq_exact",
        canvas: c.f === "cosinus" ? courbeCos : courbeCosSin,
        explanation: exp(
          c.f === "cosinus"
            ? "Le cosinus est l'abscisse du point image : on suit son évolution horizontale."
            : "Le sinus est l'ordonnée du point image : on suit son évolution verticale.",
          `On fait parcourir au point image l'arc correspondant à $${c.i}$.`,
          `La coordonnée observée passe de $${c.de}$ à $${c.a}$, sans changer de sens sur cet intervalle.`,
          `La fonction ${c.f} est ${correct} sur cet intervalle.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_trig_crb_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "trigonometrie",
    microId: "trig_courbes",
    difficulty: 5,
    theme: "neutral",
    hint: "Trois choses à dire : la valeur cherchée, l'endroit où elle est atteinte, et ce que fait le point image à ce moment-là.",
    tags: ["premiere", "maths", "trigonometrie", "courbes", "canvas", "open", "template"],
    generate: () => {
      const cas = [
        {
          q: "le maximum de la fonction cosinus sur $[0 ; 2\\pi]$",
          r: "$1$, atteint en $0$ et en $2\\pi$",
          mots: ["1", "0", "2pi", "point le plus a droite", "point le plus à droite", "abscisse"],
          pourquoi: "Le cosinus est l'abscisse du point image ; elle est maximale quand le point est le plus à droite du cercle, c'est-à-dire en $I(1 ; 0)$.",
        },
        {
          q: "le minimum de la fonction cosinus sur $[0 ; 2\\pi]$",
          r: "$-1$, atteint en $\\pi$",
          mots: ["-1", "pi", "point le plus a gauche", "point le plus à gauche", "abscisse"],
          pourquoi: "L'abscisse du point image est minimale quand le point est le plus à gauche, en $(-1 ; 0)$, ce qui correspond au demi-tour.",
        },
        {
          q: "le minimum de la fonction sinus sur $[0 ; 2\\pi]$",
          r: "$-1$, atteint en $\\dfrac{3\\pi}{2}$",
          mots: ["-1", "3pi/2", "point le plus bas", "ordonnee", "ordonnée"],
          pourquoi: "Le sinus est l'ordonnée du point image ; elle est minimale quand le point est tout en bas du cercle, en $(0 ; -1)$.",
        },
        {
          q: "les réels de $[0 ; 2\\pi]$ où la fonction cosinus s'annule",
          r: "$\\dfrac{\\pi}{2}$ et $\\dfrac{3\\pi}{2}$",
          mots: ["pi/2", "3pi/2", "axe des ordonnees", "axe des ordonnées", "abscisse nulle"],
          pourquoi: "Le cosinus s'annule quand l'abscisse du point image est nulle, c'est-à-dire quand le point est sur l'axe des ordonnées : en haut ou en bas du cercle.",
        },
      ];
      const c = pickOne(cas);
      return {
        text: `Détermine ${c.q}, et explique ce que fait le point image sur le cercle à ce moment-là.`,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        canvas: courbeCosSin,
        explanation: exp(
          "Toute lecture sur la courbe se retrouve sur le cercle : le cosinus y est l'abscisse du point image, le sinus son ordonnée.",
          "On repère d'abord la position remarquable du point image, puis on traduit en valeur de la fonction.",
          c.pourquoi,
          `Réponse : ${c.r}.`
        ),
      };
    },
  },
];
