// lib/tutor-v4/questionBank/premiere-spe/maths/produit-scalaire.bank.ts
//
// Chapitre : Calcul vectoriel et produit scalaire (notion "produit_scalaire")
// microSkills :
//   ps_projection      — produit scalaire par projection orthogonale
//   ps_norme_angle     — produit scalaire avec normes et angle (cosinus)
//   ps_coordonnees     — produit scalaire à partir des coordonnées
//   ps_norme           — calculer la norme d'un vecteur
//   ps_proprietes      — symétrie et bilinéarité
//   ps_norme_somme     — développer ‖u + v‖²
//   ps_orthogonalite   — caractériser l'orthogonalité
//   ps_alkashi         — formule d'Al-Kashi
//   ps_angle_longueur  — calculer un angle ou une longueur
//   ps_ma_mb           — transformer MA·MB, décrire un ensemble de points
//   ps_methode         — choisir la méthode adaptée
//
// ⚠️ Les items de `ps_norme` sont restés physiquement dans la section
// PS_COORDONNEES, et deux items d'Al-Kashi dans la section PS_ALKASHI : on a
// changé leur `microId` sans toucher à leur `id` (ils ont un historique de
// réponses d'élèves). Se fier au `microId`, pas au commentaire de section.
//
// PÉRIMÈTRE BO 2019 Première spé. Conventions : LaTeX, règle QCM.
// Canvas : fonctionGraphique (vecteurs comme points), triangle (Al-Kashi).
//
// Règle d'écriture : un `fixed` pour une valeur exceptionnelle, un piège, une
// propriété ou un contexte 974 ; un `template` pour tout calcul dont on peut
// changer les nombres ; plusieurs ouvertes dont un template ouvert. Aucun
// nombre d'items fixes à viser.

import type { TutorBankItemV4, CanvasFigure } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickOne<T>(arr: readonly T[]): T {
  return arr[randomInt(0, arr.length - 1)];
}

/** Un triangle coté, pour Al-Kashi et les calculs d'angle.
 *  Convention du chapitre : $a = BC$, $b = CA$, $c = AB$, l'angle est en $A$. */
function triangleCote(c: string, b: string, a: string, angleA?: string): CanvasFigure {
  return {
    kind: "triangle",
    size: { width: 320, height: 250 },
    points: { A: { x: 60, y: 200 }, B: { x: 270, y: 200 }, C: { x: 140, y: 45 } },
    labels: { A: "A", B: "B", C: "C" },
    sideLabels: { AB: c, CA: b, BC: a },
    angleLabels: angleA ? { A: angleA } : undefined,
    display: { showLabels: true, showSides: true, showAngles: Boolean(angleA) },
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
  /* ===================== PS_PROJECTION ===================== */
  {
    kind: "fixed",
    id: "premiere_ps_proj_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_projection",
    difficulty: 3,
    theme: "neutral",
    text: "$H$ est le projeté orthogonal de $C$ sur la droite $(AB)$. Le produit scalaire $\\vec{AB} \\cdot \\vec{AC}$ est égal à :",
    format: "qcm",
    choices: [
      "$\\vec{AB} \\cdot \\vec{AH}$",
      "$AB \\times AC$",
      "$\\vec{AB} \\cdot \\vec{HC}$",
      "$AH \\times HC$",
    ],
    expected: ["$\\vec{AB} \\cdot \\vec{AH}$"],
    comparator: "mcq_exact",
    hint: "Seule la part de $\\vec{AC}$ qui va dans la direction de $\\vec{AB}$ compte.",
    explanation: exp(
      "Le produit scalaire ne retient d'un vecteur que sa part dans la direction de l'autre : cette part est son projeté orthogonal.",
      "On projette $C$ en $H$ sur la droite $(AB)$, et on remplace $\\vec{AC}$ par $\\vec{AH}$.",
      "La partie perdue, $\\vec{HC}$, est orthogonale à $\\vec{AB}$ : son produit scalaire avec $\\vec{AB}$ est nul, elle n'apporte rien.",
      "$\\vec{AB} \\cdot \\vec{AC} = \\vec{AB} \\cdot \\vec{AH}$ : c'est la définition par projection."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "projection", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_proj_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_projection",
    difficulty: 4,
    theme: "neutral",
    text: "Le projeté $H$ de $C$ tombe du côté OPPOSÉ à $B$ par rapport à $A$. Que peut-on dire de $\\vec{AB} \\cdot \\vec{AC}$ ?",
    format: "qcm",
    choices: [
      "il est négatif",
      "il est positif",
      "il est nul",
      "on ne peut pas le savoir",
    ],
    expected: ["il est négatif"],
    comparator: "mcq_exact",
    hint: "Les vecteurs $\\vec{AH}$ et $\\vec{AB}$ pointent-ils dans le même sens ?",
    explanation: exp(
      "Après projection, tout se joue sur le SENS de $\\vec{AH}$ par rapport à $\\vec{AB}$.",
      "Si $H$ est du côté opposé à $B$, les vecteurs $\\vec{AH}$ et $\\vec{AB}$ sont colinéaires de sens contraire.",
      "Le produit de deux vecteurs colinéaires de sens contraire vaut $-AH \\times AB$ : il est négatif. C'est le cas où l'angle $\\widehat{BAC}$ est obtus.",
      "Le produit scalaire est négatif."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "projection", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_proj_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_projection",
    difficulty: 3,
    theme: "neutral",
    text: "Le projeté orthogonal de $C$ sur $(AB)$ est le point $A$ lui-même. Que vaut $\\vec{AB} \\cdot \\vec{AC}$ ?",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "Que vaut le vecteur $\\vec{AH}$ quand $H = A$ ?",
    explanation: exp(
      "Le produit scalaire par projection vaut $\\vec{AB} \\cdot \\vec{AH}$, où $H$ est le projeté de $C$.",
      "Si $H = A$, alors $\\vec{AH} = \\vec{0}$.",
      "Le produit scalaire est donc nul. Géométriquement, cela veut dire que $(AC)$ est perpendiculaire à $(AB)$ : le cas de projection nulle est exactement le cas orthogonal.",
      "$\\vec{AB} \\cdot \\vec{AC} = 0$."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "projection", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_proj_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_projection",
    difficulty: 5,
    theme: "reunion",
    text: "Sur la plage de l'Ermitage, on tire une pirogue avec une corde qui fait un angle de $60°$ avec la direction du déplacement. La force exercée vaut $200$ N. Quelle part de cette force fait vraiment avancer la pirogue (avec $\\cos 60° = 0{,}5$) ?",
    format: "qcm",
    choices: ["$100$ N", "$200$ N", "$173$ N", "$60$ N"],
    expected: ["$100$ N"],
    comparator: "mcq_exact",
    hint: "C'est la longueur du projeté de la force sur la direction du déplacement.",
    explanation: exp(
      "Seule la part de la force dirigée dans le sens du déplacement fait avancer : c'est son projeté orthogonal sur cette direction.",
      "Cette part vaut $\\|\\vec{F}\\| \\times \\cos(\\theta)$, où $\\theta$ est l'angle entre la corde et le déplacement.",
      "$200 \\times \\cos 60° = 200 \\times 0{,}5 = 100$ N. Le reste, $173$ N, tire vers le haut et ne sert qu'à soulever la pirogue.",
      "$100$ N seulement font avancer — c'est pour cela qu'on tire une pirogue le plus à plat possible."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "projection", "reunion", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_proj_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_projection",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi on peut remplacer un vecteur par son projeté orthogonal sans changer le produit scalaire.",
    format: "open",
    expected: ["orthogonal", "nul", "perpendiculaire", "n'apporte rien", "partie perdue"],
    comparator: "contains_keyword",
    hint: "Décompose $\\vec{AC}$ en $\\vec{AH} + \\vec{HC}$ : que vaut $\\vec{AB} \\cdot \\vec{HC}$ ?",
    explanation: exp(
      "Le produit scalaire est distributif : on peut découper un vecteur en une somme et calculer terme à terme.",
      "On écrit $\\vec{AC} = \\vec{AH} + \\vec{HC}$, où $H$ est le projeté de $C$ sur $(AB)$.",
      "Alors $\\vec{AB} \\cdot \\vec{AC} = \\vec{AB} \\cdot \\vec{AH} + \\vec{AB} \\cdot \\vec{HC}$. Or $\\vec{HC}$ est perpendiculaire à $\\vec{AB}$ par construction : ce second terme est nul.",
      "La partie perpendiculaire n'apporte rien au produit scalaire : seul le projeté compte."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "projection", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_proj_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_projection",
    difficulty: 5,
    theme: "neutral",
    text: "Que signifie un produit scalaire négatif, si on le lit sur la projection ?",
    format: "open",
    expected: ["sens contraire", "sens oppose", "sens opposé", "obtus", "cote oppose", "côté opposé"],
    comparator: "contains_keyword",
    hint: "De quel côté tombe le projeté ?",
    explanation: exp(
      "Après projection, le produit scalaire est le produit de deux longueurs affecté d'un signe : celui du sens relatif des deux vecteurs.",
      "Le projeté $\\vec{AH}$ est colinéaire à $\\vec{AB}$ : soit de même sens, soit de sens contraire.",
      "S'il est de sens contraire — c'est-à-dire si $H$ tombe du côté opposé à $B$ — le produit est négatif. C'est exactement le cas où l'angle entre les deux vecteurs est obtus.",
      "Un produit scalaire négatif veut dire que les deux vecteurs « vont dans des directions opposées » : l'angle est obtus."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "projection", "open"],
  },
  {
    kind: "template",
    id: "premiere_ps_proj_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_projection",
    difficulty: 4,
    theme: "neutral",
    hint: "Angle aigu → positif ; angle droit → nul ; angle obtus → négatif.",
    tags: ["premiere", "maths", "produit_scalaire", "projection", "template"],
    generate: () => {
      const cas = [
        { deg: 30, signe: "positif", nature: "aigu" },
        { deg: 45, signe: "positif", nature: "aigu" },
        { deg: 80, signe: "positif", nature: "aigu" },
        { deg: 90, signe: "nul", nature: "droit" },
        { deg: 110, signe: "négatif", nature: "obtus" },
        { deg: 150, signe: "négatif", nature: "obtus" },
        { deg: 180, signe: "négatif", nature: "plat" },
      ];
      const c = pickOne(cas);
      const correct = c.signe;
      const autres = ["positif", "nul", "négatif"].filter((s) => s !== correct);
      return {
        text: `Deux vecteurs non nuls forment un angle de $${c.deg}°$. Leur produit scalaire est :`,
        format: "qcm",
        choices: [correct, ...autres, "impossible à déterminer"],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Le signe du produit scalaire est celui du cosinus de l'angle : il se lit sur la position du projeté.",
          `Ici l'angle vaut $${c.deg}°$, il est donc ${c.nature}.`,
          c.signe === "nul"
            ? "Le projeté se réduit à un point : le produit scalaire s'annule."
            : c.signe === "positif"
              ? "Le projeté tombe du même côté que l'autre vecteur : les deux vont dans le même sens."
              : "Le projeté tombe du côté opposé : les deux vecteurs vont dans des sens contraires.",
          `Le produit scalaire est ${correct}.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_ps_proj_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_projection",
    difficulty: 5,
    theme: "neutral",
    hint: "Projette le second vecteur sur la direction du premier, puis regarde le sens obtenu.",
    tags: ["premiere", "maths", "produit_scalaire", "projection", "open", "template"],
    generate: () => {
      const cas = [
        { nu: 4, nv: 5, deg: 60, cos: "0{,}5", res: "10", signe: "positif" },
        { nu: 3, nv: 6, deg: 120, cos: "-0{,}5", res: "-9", signe: "négatif" },
        { nu: 5, nv: 2, deg: 90, cos: "0", res: "0", signe: "nul" },
        { nu: 6, nv: 4, deg: 180, cos: "-1", res: "-24", signe: "négatif" },
        { nu: 7, nv: 3, deg: 0, cos: "1", res: "21", signe: "positif" },
      ];
      const c = pickOne(cas);
      return {
        text: `Deux vecteurs de normes $${c.nu}$ et $${c.nv}$ forment un angle de $${c.deg}°$. Calcule leur produit scalaire, puis explique ce que ce signe dit de la projection.`,
        format: "open",
        expected: [c.res, c.signe === "négatif" ? "sens contraire" : c.signe === "nul" ? "orthogonaux" : "meme sens", "projete", "projeté", "meme sens", "même sens"],
        comparator: "contains_keyword",
        explanation: exp(
          "Le produit scalaire vaut $\\|\\vec{u}\\| \\times \\|\\vec{v}\\| \\times \\cos\\theta$, et son signe est celui du cosinus.",
          `Ici $${c.nu} \\times ${c.nv} \\times \\cos ${c.deg}° = ${c.nu} \\times ${c.nv} \\times ${c.cos}$.`,
          `On obtient $${c.res}$. ` +
            (c.signe === "nul"
              ? "Le projeté du second vecteur sur le premier se réduit à l'origine : les vecteurs sont orthogonaux."
              : c.signe === "positif"
                ? "Le projeté tombe dans le même sens que le premier vecteur."
                : "Le projeté tombe dans le sens contraire du premier vecteur."),
          `$\\vec{u} \\cdot \\vec{v} = ${c.res}$, un produit ${c.signe}.`
        ),
      };
    },
  },

  /* ===================== PS_COORDONNEES (et les items de PS_NORME) ===================== */
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
    microId: "ps_norme",
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
    microId: "ps_norme",
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
    kind: "fixed",
    id: "premiere_ps_coord_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_coordonnees",
    difficulty: 4,
    theme: "neutral",
    text: "Calcule $\\vec{u} \\cdot \\vec{v}$ avec $\\vec{u}(1 ; -3)$ et $\\vec{v}(2 ; 5)$.",
    format: "short",
    expected: ["-13"],
    comparator: "number_equal",
    hint: "$xx' + yy'$ : attention au signe de $-3$.",
    explanation: exp(
      "En base orthonormée, $\\vec{u} \\cdot \\vec{v} = xx' + yy'$.",
      "$1 \\times 2 + (-3) \\times 5 = 2 - 15$.",
      "$= -13$. Un produit scalaire peut être négatif : cela signifie que l'angle est obtus.",
      "$\\vec{u} \\cdot \\vec{v} = -13$."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "coordonnees", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_coord_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_coordonnees",
    difficulty: 4,
    theme: "neutral",
    text: "Calcule $\\vec{u} \\cdot \\vec{v}$ avec $\\vec{u}(-2 ; 4)$ et $\\vec{v}(3 ; -1)$.",
    format: "short",
    expected: ["-10"],
    comparator: "number_equal",
    hint: "$(-2) \\times 3 + 4 \\times (-1)$.",
    explanation: exp(
      "On applique $\\vec{u} \\cdot \\vec{v} = xx' + yy'$ en soignant les signes.",
      "$(-2) \\times 3 = -6$ et $4 \\times (-1) = -4$.",
      "$-6 + (-4) = -10$.",
      "$\\vec{u} \\cdot \\vec{v} = -10$."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "coordonnees", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_coord_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_norme",
    difficulty: 4,
    theme: "neutral",
    text: "Calcule la norme de $\\vec{u}(-5 ; 12)$.",
    format: "short",
    expected: ["13"],
    comparator: "number_equal",
    hint: "$\\sqrt{(-5)^2 + 12^2}$ : le carré efface le signe moins.",
    explanation: exp(
      "La norme vaut $\\|\\vec{u}\\| = \\sqrt{x^2 + y^2}$.",
      "$(-5)^2 = 25$ et $12^2 = 144$, donc $\\sqrt{25 + 144} = \\sqrt{169}$.",
      "$= 13$. Une norme est une longueur : elle est toujours positive.",
      "$\\|\\vec{u}\\| = 13$."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "coordonnees", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_coord_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_norme",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la norme de $\\vec{u}(1 ; 1)$ ?",
    format: "qcm",
    choices: ["$\\sqrt{2}$", "$2$", "$1$", "$\\sqrt{1}$"],
    expected: ["$\\sqrt{2}$"],
    comparator: "mcq_exact",
    hint: "$\\sqrt{1^2 + 1^2}$ ne se simplifie pas en un entier.",
    explanation: exp(
      "On applique $\\|\\vec{u}\\| = \\sqrt{x^2 + y^2}$.",
      "$\\sqrt{1^2 + 1^2} = \\sqrt{2}$.",
      "$\\sqrt{2} \\approx 1{,}41$ : c'est la diagonale du carré de côté $1$, et non $2$ (on n'additionne pas les coordonnées).",
      "$\\|\\vec{u}\\| = \\sqrt{2}$."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "coordonnees", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_coord_fixed_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_proprietes",
    difficulty: 5,
    theme: "neutral",
    text: "À quoi est égal $\\vec{u} \\cdot \\vec{u}$ ?",
    format: "qcm",
    choices: [
      "$\\|\\vec{u}\\|^2$",
      "$\\|\\vec{u}\\|$",
      "$0$",
      "$2\\|\\vec{u}\\|$",
    ],
    expected: ["$\\|\\vec{u}\\|^2$"],
    comparator: "mcq_exact",
    hint: "Calcule avec les coordonnées : $x \\times x + y \\times y$.",
    explanation: exp(
      "On applique la formule des coordonnées au vecteur avec lui-même.",
      "$\\vec{u} \\cdot \\vec{u} = x \\times x + y \\times y = x^2 + y^2$.",
      "Or $\\|\\vec{u}\\| = \\sqrt{x^2 + y^2}$, donc $x^2 + y^2 = \\|\\vec{u}\\|^2$.",
      "$\\vec{u} \\cdot \\vec{u} = \\|\\vec{u}\\|^2$ : c'est le carré scalaire."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "coordonnees", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_coord_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_coordonnees",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule $\\vec{u} \\cdot \\vec{v}$ avec $\\vec{u}(6 ; 0)$ et $\\vec{v}(0 ; 7)$.",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "$6 \\times 0 + 0 \\times 7$.",
    explanation: exp(
      "On applique $\\vec{u} \\cdot \\vec{v} = xx' + yy'$.",
      "$6 \\times 0 + 0 \\times 7 = 0 + 0$.",
      "$= 0$. Ces deux vecteurs sont dirigés l'un selon l'axe des abscisses, l'autre selon celui des ordonnées.",
      "$\\vec{u} \\cdot \\vec{v} = 0$ : les vecteurs sont orthogonaux."
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
    microId: "ps_norme",
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
    kind: "fixed",
    id: "premiere_ps_na_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_norme_angle",
    difficulty: 3,
    theme: "neutral",
    text: "Deux vecteurs de normes $2$ et $7$ forment un angle de $0°$. Combien vaut leur produit scalaire ?",
    format: "short",
    expected: ["14"],
    comparator: "number_equal",
    hint: "$\\cos 0° = 1$.",
    explanation: exp(
      "La formule est $\\vec{u} \\cdot \\vec{v} = \\|\\vec{u}\\| \\times \\|\\vec{v}\\| \\times \\cos\\theta$.",
      "Un angle de $0°$ signifie que les vecteurs sont de même direction et même sens : $\\cos 0° = 1$.",
      "$2 \\times 7 \\times 1 = 14$.",
      "Le produit scalaire vaut $14$ : c'est sa valeur maximale pour ces deux normes."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "norme_angle", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_na_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_norme_angle",
    difficulty: 3,
    theme: "neutral",
    text: "Deux vecteurs de normes $3$ et $4$ forment un angle de $90°$. Combien vaut leur produit scalaire ?",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "$\\cos 90° = 0$.",
    explanation: exp(
      "On applique $\\vec{u} \\cdot \\vec{v} = \\|\\vec{u}\\| \\times \\|\\vec{v}\\| \\times \\cos\\theta$.",
      "Pour un angle droit, $\\cos 90° = 0$.",
      "$3 \\times 4 \\times 0 = 0$, quelles que soient les normes.",
      "Le produit scalaire vaut $0$ : c'est la caractérisation de l'orthogonalité."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "norme_angle", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_na_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_norme_angle",
    difficulty: 4,
    theme: "neutral",
    text: "Deux vecteurs de normes $5$ et $2$ sont colinéaires de sens CONTRAIRE (angle $180°$). Combien vaut leur produit scalaire ?",
    format: "short",
    expected: ["-10"],
    comparator: "number_equal",
    hint: "$\\cos 180° = -1$.",
    explanation: exp(
      "On applique $\\vec{u} \\cdot \\vec{v} = \\|\\vec{u}\\| \\times \\|\\vec{v}\\| \\times \\cos\\theta$.",
      "Deux vecteurs de sens contraire forment un angle de $180°$, et $\\cos 180° = -1$.",
      "$5 \\times 2 \\times (-1) = -10$.",
      "Le produit scalaire vaut $-10$ : c'est sa valeur minimale pour ces deux normes."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "norme_angle", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_na_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_norme_angle",
    difficulty: 4,
    theme: "neutral",
    text: "Deux vecteurs de normes $4$ et $6$ forment un angle de $60°$. Combien vaut leur produit scalaire (avec $\\cos 60° = 0{,}5$) ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "$4 \\times 6 \\times 0{,}5$.",
    explanation: exp(
      "On applique $\\vec{u} \\cdot \\vec{v} = \\|\\vec{u}\\| \\times \\|\\vec{v}\\| \\times \\cos\\theta$.",
      "$4 \\times 6 = 24$, puis $24 \\times 0{,}5$.",
      "$= 12$.",
      "Le produit scalaire vaut $12$."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "norme_angle", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_na_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_norme_angle",
    difficulty: 4,
    theme: "neutral",
    text: "Le produit scalaire de deux vecteurs non nuls est positif. L'angle entre eux est :",
    format: "qcm",
    choices: ["aigu (entre $0°$ et $90°$)", "obtus", "droit", "plat"],
    expected: ["aigu (entre $0°$ et $90°$)"],
    comparator: "mcq_exact",
    hint: "Les normes sont positives : le signe vient de $\\cos\\theta$.",
    explanation: exp(
      "Dans $\\|\\vec{u}\\| \\times \\|\\vec{v}\\| \\times \\cos\\theta$, les deux normes sont strictement positives.",
      "Le signe du produit scalaire est donc exactement celui de $\\cos\\theta$.",
      "$\\cos\\theta > 0$ correspond à un angle compris entre $0°$ et $90°$.",
      "L'angle est aigu."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "norme_angle", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_na_fixed_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_norme_angle",
    difficulty: 5,
    theme: "neutral",
    text: "Deux vecteurs de normes $3$ et $8$ forment un angle de $45°$. Combien vaut leur produit scalaire (avec $\\cos 45° = \\dfrac{\\sqrt{2}}{2}$) ?",
    format: "qcm",
    choices: ["$12\\sqrt{2}$", "$24\\sqrt{2}$", "$12$", "$\\dfrac{24}{\\sqrt{2}}$"],
    expected: ["$12\\sqrt{2}$"],
    comparator: "mcq_exact",
    hint: "$24 \\times \\dfrac{\\sqrt{2}}{2}$ : divise $24$ par $2$.",
    explanation: exp(
      "On applique $\\vec{u} \\cdot \\vec{v} = \\|\\vec{u}\\| \\times \\|\\vec{v}\\| \\times \\cos\\theta$.",
      "$3 \\times 8 = 24$, puis $24 \\times \\dfrac{\\sqrt{2}}{2}$.",
      "$= \\dfrac{24\\sqrt{2}}{2} = 12\\sqrt{2}$.",
      "Le produit scalaire vaut $12\\sqrt{2} \\approx 17$."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "norme_angle", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_na_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_norme_angle",
    difficulty: 5,
    theme: "neutral",
    text: "À normes fixées, pour quel angle le produit scalaire est-il MAXIMAL ?",
    format: "qcm",
    choices: ["$0°$", "$45°$", "$90°$", "$180°$"],
    expected: ["$0°$"],
    comparator: "mcq_exact",
    hint: "Quand $\\cos\\theta$ est-il le plus grand possible ?",
    explanation: exp(
      "Les normes étant fixées, le produit scalaire varie comme $\\cos\\theta$.",
      "Le cosinus atteint son maximum, $1$, en $\\theta = 0°$.",
      "Le produit scalaire vaut alors $\\|\\vec{u}\\| \\times \\|\\vec{v}\\|$ : les vecteurs « tirent » exactement dans la même direction. À $180°$, il est au contraire minimal.",
      "Le produit scalaire est maximal pour un angle de $0°$."
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

  /* ===================== PS_NORME (compléments) ===================== */
  {
    kind: "fixed",
    id: "premiere_ps_norme_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_norme",
    difficulty: 3,
    theme: "neutral",
    text: "La norme d'un vecteur peut-elle être négative ?",
    format: "qcm",
    choices: [
      "non : c'est une longueur, elle est toujours positive ou nulle",
      "oui, si les deux coordonnées sont négatives",
      "oui, si une seule coordonnée est négative",
      "oui, si le vecteur pointe vers la gauche",
    ],
    expected: ["non : c'est une longueur, elle est toujours positive ou nulle"],
    comparator: "mcq_exact",
    hint: "Regarde la formule : que fait le carré aux signes ?",
    explanation: exp(
      "La norme d'un vecteur est la longueur du segment qui le représente.",
      "La formule $\\|\\vec{u}\\| = \\sqrt{x^2 + y^2}$ élève d'abord au carré : les signes disparaissent.",
      "Une racine carrée est de plus toujours positive. Par exemple $\\vec{u}(-3 ; -4)$ a pour norme $\\sqrt{9 + 16} = 5$, et non $-5$.",
      "Non : une norme est toujours positive ou nulle."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "norme", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_norme_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_norme",
    difficulty: 4,
    theme: "neutral",
    text: "Dans quel cas a-t-on $\\|\\vec{u}\\| = 0$ ?",
    format: "qcm",
    choices: [
      "seulement si $\\vec{u} = \\vec{0}$",
      "dès qu'une coordonnée est nulle",
      "si les deux coordonnées sont opposées",
      "jamais",
    ],
    expected: ["seulement si $\\vec{u} = \\vec{0}$"],
    comparator: "mcq_exact",
    hint: "Une somme de deux carrés peut-elle être nulle sans que les deux soient nuls ?",
    explanation: exp(
      "La norme est nulle quand la longueur du vecteur est nulle, c'est-à-dire quand ses deux extrémités sont confondues.",
      "$\\sqrt{x^2 + y^2} = 0$ équivaut à $x^2 + y^2 = 0$.",
      "Une somme de deux carrés est nulle seulement si les deux carrés le sont : $x = 0$ ET $y = 0$. Une seule coordonnée nulle ne suffit pas — $\\vec{u}(0 ; 3)$ a pour norme $3$.",
      "Seulement pour le vecteur nul."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "norme", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_norme_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_norme",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi la formule de la norme est, au fond, le théorème de Pythagore.",
    format: "open",
    expected: ["pythagore", "triangle rectangle", "hypotenuse", "hypoténuse", "cotes", "côtés"],
    comparator: "contains_keyword",
    hint: "Trace le vecteur dans le repère, puis le rectangle qui l'entoure.",
    explanation: exp(
      "Un vecteur $\\vec{u}(x ; y)$ se lit comme un déplacement de $x$ horizontalement puis de $y$ verticalement.",
      "Ces deux déplacements forment les côtés de l'angle droit d'un triangle rectangle, dont le vecteur lui-même est l'hypoténuse.",
      "Pythagore donne alors $\\|\\vec{u}\\|^2 = x^2 + y^2$, d'où $\\|\\vec{u}\\| = \\sqrt{x^2 + y^2}$.",
      "La formule n'est rien d'autre que Pythagore, écrit avec les coordonnées."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "norme", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_norme_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_norme",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève calcule la norme de $\\vec{u}(3 ; 4)$ et trouve $7$. Explique son erreur.",
    format: "open",
    expected: ["additionne", "ajoute", "carre", "carré", "pythagore", "racine"],
    comparator: "contains_keyword",
    hint: "Qu'a-t-il fait des coordonnées, et qu'aurait-il fallu en faire ?",
    explanation: exp(
      "La norme n'est pas la somme des coordonnées : c'est la longueur d'un chemin en diagonale, pas d'un chemin en deux temps.",
      "L'élève a calculé $3 + 4 = 7$, c'est-à-dire la distance parcourue en allant d'abord horizontalement puis verticalement.",
      "La vraie norme est $\\sqrt{3^2 + 4^2} = 5$ : la diagonale est toujours PLUS COURTE que le détour par l'angle. Un contrôle rapide : la norme est toujours inférieure à la somme des valeurs absolues des coordonnées.",
      "Il a additionné au lieu d'appliquer Pythagore : $\\|\\vec{u}\\| = 5$."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "norme", "piege", "open"],
  },
  {
    kind: "template",
    id: "premiere_ps_norme_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_norme",
    difficulty: 5,
    theme: "neutral",
    hint: "Calcule la norme, puis compare-la à la somme des valeurs absolues des coordonnées.",
    tags: ["premiere", "maths", "produit_scalaire", "norme", "open", "template"],
    generate: () => {
      const cas = [
        { x: 3, y: 4, n: "5", somme: "7" },
        { x: -6, y: 8, n: "10", somme: "14" },
        { x: 5, y: -12, n: "13", somme: "17" },
        { x: 8, y: 15, n: "17", somme: "23" },
        { x: -9, y: -12, n: "15", somme: "21" },
      ];
      const c = pickOne(cas);
      return {
        text: `Calcule la norme de $\\vec{u}(${c.x} ; ${c.y})$, puis explique pourquoi elle est plus petite que $|${c.x}| + |${c.y}|$.`,
        format: "open",
        expected: [c.n, "diagonale", "pythagore", "plus court", "detour", "détour"],
        comparator: "contains_keyword",
        explanation: exp(
          "La norme est la longueur du trajet direct ; la somme des valeurs absolues est celle du trajet en deux temps, horizontal puis vertical.",
          `On applique $\\|\\vec{u}\\| = \\sqrt{x^2 + y^2}$ avec $x = ${c.x}$ et $y = ${c.y}$.`,
          `$\\sqrt{${c.x * c.x} + ${c.y * c.y}} = ${c.n}$, alors que le trajet en deux temps mesurerait $${c.somme}$.`,
          `$\\|\\vec{u}\\| = ${c.n}$ : la diagonale coupe, elle est toujours plus courte que le détour.`
        ),
      };
    },
  },

  /* ===================== PS_PROPRIETES ===================== */
  {
    kind: "fixed",
    id: "premiere_ps_prop_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_proprietes",
    difficulty: 2,
    theme: "neutral",
    text: "A-t-on toujours $\\vec{u} \\cdot \\vec{v} = \\vec{v} \\cdot \\vec{u}$ ?",
    format: "qcm",
    choices: [
      "oui : le produit scalaire est symétrique",
      "non, l'ordre compte",
      "oui, seulement si les vecteurs ont la même norme",
      "oui, seulement s'ils sont orthogonaux",
    ],
    expected: ["oui : le produit scalaire est symétrique"],
    comparator: "mcq_exact",
    hint: "Regarde la formule avec les coordonnées : $xx' + yy'$.",
    explanation: exp(
      "Le produit scalaire est symétrique : échanger les deux vecteurs ne change pas le résultat.",
      "Avec les coordonnées : $\\vec{u} \\cdot \\vec{v} = xx' + yy'$ et $\\vec{v} \\cdot \\vec{u} = x'x + y'y$.",
      "C'est la même chose, puisque la multiplication des nombres est commutative. Avec l'angle, c'est encore plus visible : l'angle entre $\\vec{u}$ et $\\vec{v}$ est le même que celui entre $\\vec{v}$ et $\\vec{u}$.",
      "Oui, toujours : $\\vec{u} \\cdot \\vec{v} = \\vec{v} \\cdot \\vec{u}$."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "proprietes", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_prop_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_proprietes",
    difficulty: 3,
    theme: "neutral",
    text: "À quoi est égal $(3\\vec{u}) \\cdot \\vec{v}$ ?",
    format: "qcm",
    choices: [
      "$3(\\vec{u} \\cdot \\vec{v})$",
      "$9(\\vec{u} \\cdot \\vec{v})$",
      "$\\vec{u} \\cdot \\vec{v} + 3$",
      "$3\\vec{u} \\cdot 3\\vec{v}$",
    ],
    expected: ["$3(\\vec{u} \\cdot \\vec{v})$"],
    comparator: "mcq_exact",
    hint: "Le facteur sort une seule fois, pas deux.",
    explanation: exp(
      "Le produit scalaire est bilinéaire : un facteur devant l'un des vecteurs sort du produit.",
      "$(k\\vec{u}) \\cdot \\vec{v} = k(\\vec{u} \\cdot \\vec{v})$, ici avec $k = 3$.",
      "Attention à ne pas le compter deux fois : le $9$ apparaîtrait si on multipliait LES DEUX vecteurs par $3$, car $(3\\vec{u}) \\cdot (3\\vec{v}) = 9(\\vec{u} \\cdot \\vec{v})$.",
      "$(3\\vec{u}) \\cdot \\vec{v} = 3(\\vec{u} \\cdot \\vec{v})$."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "proprietes", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_prop_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_proprietes",
    difficulty: 3,
    theme: "neutral",
    text: "À quoi est égal $\\vec{u} \\cdot (\\vec{v} + \\vec{w})$ ?",
    format: "qcm",
    choices: [
      "$\\vec{u} \\cdot \\vec{v} + \\vec{u} \\cdot \\vec{w}$",
      "$\\vec{u} \\cdot \\vec{v} \\times \\vec{u} \\cdot \\vec{w}$",
      "$(\\vec{u} + \\vec{v}) \\cdot \\vec{w}$",
      "$\\vec{u} \\cdot \\vec{v} + \\vec{w}$",
    ],
    expected: ["$\\vec{u} \\cdot \\vec{v} + \\vec{u} \\cdot \\vec{w}$"],
    comparator: "mcq_exact",
    hint: "Comme la distributivité de la multiplication sur l'addition.",
    explanation: exp(
      "Le produit scalaire se distribue sur l'addition de vecteurs, exactement comme la multiplication sur l'addition de nombres.",
      "$\\vec{u} \\cdot (\\vec{v} + \\vec{w}) = \\vec{u} \\cdot \\vec{v} + \\vec{u} \\cdot \\vec{w}$.",
      "C'est cette propriété qui permet de développer $\\|\\vec{u} + \\vec{v}\\|^2$ et de projeter un vecteur en le découpant en deux morceaux.",
      "$\\vec{u} \\cdot (\\vec{v} + \\vec{w}) = \\vec{u} \\cdot \\vec{v} + \\vec{u} \\cdot \\vec{w}$."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "proprietes", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_prop_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_proprietes",
    difficulty: 5,
    theme: "neutral",
    text: "On sait que $\\vec{u} \\cdot \\vec{v} = 0$. Peut-on en conclure que $\\vec{u} = \\vec{0}$ ou $\\vec{v} = \\vec{0}$ ?",
    format: "qcm",
    choices: [
      "non : ils peuvent être non nuls et orthogonaux",
      "oui, comme pour un produit de nombres",
      "oui, mais seulement dans le plan",
      "non : $\\vec{u} \\cdot \\vec{v}$ ne peut jamais être nul",
    ],
    expected: ["non : ils peuvent être non nuls et orthogonaux"],
    comparator: "mcq_exact",
    hint: "Essaie $\\vec{u}(1 ; 0)$ et $\\vec{v}(0 ; 1)$.",
    explanation: exp(
      "Pour les NOMBRES, un produit nul entraîne qu'un des facteurs est nul. Le produit scalaire ne suit pas cette règle.",
      "Contre-exemple : $\\vec{u}(1 ; 0)$ et $\\vec{v}(0 ; 1)$ donnent $1 \\times 0 + 0 \\times 1 = 0$.",
      "Aucun des deux n'est nul : ils sont simplement orthogonaux. C'est justement ce qui rend le produit scalaire utile — l'annulation caractérise la perpendicularité, pas la nullité.",
      "Non : deux vecteurs non nuls orthogonaux ont un produit scalaire nul."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "proprietes", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_prop_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_proprietes",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi l'écriture $(\\vec{u} \\cdot \\vec{v}) \\cdot \\vec{w}$ n'a pas de sens.",
    format: "open",
    expected: ["nombre", "scalaire", "pas un vecteur", "reel", "réel"],
    comparator: "contains_keyword",
    hint: "Quelle est la nature du résultat d'un produit scalaire ?",
    explanation: exp(
      "Le produit scalaire prend deux VECTEURS et rend un NOMBRE — c'est de là que vient son nom : le résultat est un scalaire.",
      "Dans $(\\vec{u} \\cdot \\vec{v}) \\cdot \\vec{w}$, la première parenthèse vaut donc un nombre.",
      "On voudrait ensuite faire le produit scalaire d'un nombre et d'un vecteur : l'opération n'est pas définie, elle attend deux vecteurs.",
      "L'écriture n'a pas de sens : le produit scalaire n'est pas associatif, parce que son résultat n'est pas un vecteur."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "proprietes", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_prop_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_proprietes",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève « simplifie » $\\vec{u} \\cdot \\vec{v} = \\vec{u} \\cdot \\vec{w}$ en $\\vec{v} = \\vec{w}$. Donne un contre-exemple.",
    format: "open",
    expected: ["contre-exemple", "contre exemple", "orthogonal", "projete", "projeté", "meme projete", "même projeté"],
    comparator: "contains_keyword",
    hint: "Deux vecteurs différents peuvent-ils avoir le même projeté sur $\\vec{u}$ ?",
    explanation: exp(
      "On ne peut pas « simplifier par $\\vec{u}$ » : le produit scalaire ne retient d'un vecteur que son projeté sur l'autre.",
      "Il suffit donc de trouver deux vecteurs différents ayant le même projeté sur $\\vec{u}$.",
      "Avec $\\vec{u}(1 ; 0)$ : $\\vec{v}(2 ; 5)$ et $\\vec{w}(2 ; -3)$ donnent tous deux $\\vec{u} \\cdot \\vec{v} = \\vec{u} \\cdot \\vec{w} = 2$, alors que $\\vec{v} \\neq \\vec{w}$.",
      "C'est faux : l'égalité signifie seulement que $\\vec{v} - \\vec{w}$ est orthogonal à $\\vec{u}$."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "proprietes", "open"],
  },
  {
    kind: "template",
    id: "premiere_ps_prop_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_proprietes",
    difficulty: 4,
    theme: "neutral",
    hint: "Sors les coefficients devant, puis remplace $\\vec{u} \\cdot \\vec{v}$ par sa valeur.",
    tags: ["premiere", "maths", "produit_scalaire", "proprietes", "template"],
    generate: () => {
      const p = pickOne([2, 3, 4, 5, -2, -3]);
      const k = randomInt(2, 5);
      const m = randomInt(2, 5);
      const res = k * m * p;
      const correct = `$${res}$`;
      return {
        text: `On sait que $\\vec{u} \\cdot \\vec{v} = ${p}$. Combien vaut $(${k}\\vec{u}) \\cdot (${m}\\vec{v})$ ?`,
        format: "qcm",
        choices: [correct, `$${k * p}$`, `$${k + m + p}$`, `$${p}$`],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "La bilinéarité permet de sortir un coefficient de chaque côté du produit scalaire.",
          `$(${k}\\vec{u}) \\cdot (${m}\\vec{v}) = ${k} \\times ${m} \\times (\\vec{u} \\cdot \\vec{v})$.`,
          `$= ${k * m} \\times ${p} = ${res}$. Les deux coefficients se multiplient : ils ne s'additionnent pas et l'un ne disparaît pas.`,
          `${correct}.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_ps_prop_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_proprietes",
    difficulty: 5,
    theme: "neutral",
    hint: "Nomme la propriété utilisée à chaque étape : symétrie, bilinéarité, ou distributivité.",
    tags: ["premiere", "maths", "produit_scalaire", "proprietes", "open", "template"],
    generate: () => {
      const cas = [
        {
          e: "\\vec{u} \\cdot (\\vec{v} + \\vec{u})",
          r: "\\vec{u} \\cdot \\vec{v} + \\|\\vec{u}\\|^2",
          mots: ["distributiv", "carre scalaire", "carré scalaire", "norme au carre", "norme au carré"],
        },
        {
          e: "(2\\vec{u}) \\cdot (\\vec{v} + \\vec{w})",
          r: "2\\,\\vec{u} \\cdot \\vec{v} + 2\\,\\vec{u} \\cdot \\vec{w}",
          mots: ["distributiv", "bilinear", "bilinéar", "coefficient"],
        },
        {
          e: "(\\vec{u} + \\vec{v}) \\cdot (\\vec{u} - \\vec{v})",
          r: "\\|\\vec{u}\\|^2 - \\|\\vec{v}\\|^2",
          mots: ["identite remarquable", "identité remarquable", "symetrie", "symétrie", "norme au carre", "norme au carré"],
        },
        {
          e: "\\vec{v} \\cdot (3\\vec{u})",
          r: "3\\,\\vec{u} \\cdot \\vec{v}",
          mots: ["symetrie", "symétrie", "coefficient", "bilinear", "bilinéar"],
        },
      ];
      const c = pickOne(cas);
      return {
        text: `Développe $${c.e}$ le plus loin possible, en nommant les propriétés que tu utilises.`,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: exp(
          "Trois propriétés servent à développer : la symétrie ($\\vec{u} \\cdot \\vec{v} = \\vec{v} \\cdot \\vec{u}$), la bilinéarité (les coefficients sortent) et la distributivité sur l'addition.",
          "On développe comme avec des nombres, en gardant en tête que $\\vec{u} \\cdot \\vec{u} = \\|\\vec{u}\\|^2$.",
          "Les identités remarquables du collège restent valables : le produit scalaire se comporte comme une multiplication, à ceci près que son résultat est un nombre.",
          `$${c.e} = ${c.r}$.`
        ),
      };
    },
  },

  /* ===================== PS_NORME_SOMME ===================== */
  {
    kind: "fixed",
    id: "premiere_ps_ns_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_norme_somme",
    difficulty: 3,
    theme: "neutral",
    text: "À quoi est égal $\\|\\vec{u} + \\vec{v}\\|^2$ ?",
    format: "qcm",
    choices: [
      "$\\|\\vec{u}\\|^2 + 2\\,\\vec{u} \\cdot \\vec{v} + \\|\\vec{v}\\|^2$",
      "$\\|\\vec{u}\\|^2 + \\|\\vec{v}\\|^2$",
      "$\\|\\vec{u}\\|^2 + \\|\\vec{v}\\|^2 - 2\\,\\vec{u} \\cdot \\vec{v}$",
      "$(\\|\\vec{u}\\| + \\|\\vec{v}\\|)^2$",
    ],
    expected: ["$\\|\\vec{u}\\|^2 + 2\\,\\vec{u} \\cdot \\vec{v} + \\|\\vec{v}\\|^2$"],
    comparator: "mcq_exact",
    hint: "C'est l'identité $(a + b)^2 = a^2 + 2ab + b^2$, transposée aux vecteurs.",
    explanation: exp(
      "On développe le carré scalaire : $\\|\\vec{u} + \\vec{v}\\|^2 = (\\vec{u} + \\vec{v}) \\cdot (\\vec{u} + \\vec{v})$.",
      "La distributivité donne $\\vec{u} \\cdot \\vec{u} + \\vec{u} \\cdot \\vec{v} + \\vec{v} \\cdot \\vec{u} + \\vec{v} \\cdot \\vec{v}$.",
      "Les deux termes du milieu sont égaux par symétrie, et $\\vec{u} \\cdot \\vec{u} = \\|\\vec{u}\\|^2$.",
      "$\\|\\vec{u} + \\vec{v}\\|^2 = \\|\\vec{u}\\|^2 + 2\\,\\vec{u} \\cdot \\vec{v} + \\|\\vec{v}\\|^2$ — l'identité remarquable du collège, mot pour mot."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "norme_somme", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_ns_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_norme_somme",
    difficulty: 4,
    theme: "neutral",
    text: "Si $\\vec{u}$ et $\\vec{v}$ sont ORTHOGONAUX, que devient $\\|\\vec{u} + \\vec{v}\\|^2$ ?",
    format: "qcm",
    choices: [
      "$\\|\\vec{u}\\|^2 + \\|\\vec{v}\\|^2$ : c'est le théorème de Pythagore",
      "$0$",
      "$2\\,\\vec{u} \\cdot \\vec{v}$",
      "$(\\|\\vec{u}\\| + \\|\\vec{v}\\|)^2$",
    ],
    expected: ["$\\|\\vec{u}\\|^2 + \\|\\vec{v}\\|^2$ : c'est le théorème de Pythagore"],
    comparator: "mcq_exact",
    hint: "Que vaut le double produit quand les vecteurs sont orthogonaux ?",
    explanation: exp(
      "Le développement fait apparaître un double produit $2\\,\\vec{u} \\cdot \\vec{v}$.",
      "Deux vecteurs orthogonaux ont un produit scalaire nul : ce terme disparaît.",
      "Il reste $\\|\\vec{u} + \\vec{v}\\|^2 = \\|\\vec{u}\\|^2 + \\|\\vec{v}\\|^2$ — c'est exactement Pythagore, écrit avec des vecteurs.",
      "On retrouve le théorème de Pythagore : le double produit s'annule."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "norme_somme", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_ns_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_norme_somme",
    difficulty: 4,
    theme: "neutral",
    text: "A-t-on toujours $\\|\\vec{u} + \\vec{v}\\| = \\|\\vec{u}\\| + \\|\\vec{v}\\|$ ?",
    format: "qcm",
    choices: [
      "non : il y a égalité seulement si les vecteurs sont de même sens",
      "oui, toujours",
      "non : c'est toujours strictement plus petit",
      "oui, si les vecteurs sont orthogonaux",
    ],
    expected: ["non : il y a égalité seulement si les vecteurs sont de même sens"],
    comparator: "mcq_exact",
    hint: "Prends $\\vec{u}(1 ; 0)$ et $\\vec{v}(0 ; 1)$ : compare $\\sqrt{2}$ et $2$.",
    explanation: exp(
      "La norme d'une somme n'est pas la somme des normes : additionner deux vecteurs, c'est les mettre bout à bout, et le chemin direct est plus court que le détour.",
      "Contre-exemple : $\\vec{u}(1 ; 0)$ et $\\vec{v}(0 ; 1)$ donnent $\\|\\vec{u} + \\vec{v}\\| = \\sqrt{2} \\approx 1{,}41$, alors que $\\|\\vec{u}\\| + \\|\\vec{v}\\| = 2$.",
      "On a toujours $\\|\\vec{u} + \\vec{v}\\| \\leqslant \\|\\vec{u}\\| + \\|\\vec{v}\\|$ (l'inégalité triangulaire), avec égalité seulement quand les deux vecteurs pointent dans le même sens.",
      "Non : l'égalité n'a lieu que pour deux vecteurs de même sens."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "norme_somme", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_ns_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_norme_somme",
    difficulty: 5,
    theme: "neutral",
    text: "En partant du développement de $\\|\\vec{u} + \\vec{v}\\|^2$, à quoi est égal $\\vec{u} \\cdot \\vec{v}$ ?",
    format: "qcm",
    choices: [
      "$\\dfrac{1}{2}\\left(\\|\\vec{u} + \\vec{v}\\|^2 - \\|\\vec{u}\\|^2 - \\|\\vec{v}\\|^2\\right)$",
      "$\\|\\vec{u} + \\vec{v}\\|^2 - \\|\\vec{u}\\|^2 - \\|\\vec{v}\\|^2$",
      "$\\dfrac{1}{2}\\left(\\|\\vec{u}\\|^2 + \\|\\vec{v}\\|^2\\right)$",
      "$\\|\\vec{u} + \\vec{v}\\|^2$",
    ],
    expected: [
      "$\\dfrac{1}{2}\\left(\\|\\vec{u} + \\vec{v}\\|^2 - \\|\\vec{u}\\|^2 - \\|\\vec{v}\\|^2\\right)$",
    ],
    comparator: "mcq_exact",
    hint: "Isole le double produit, puis divise par $2$.",
    explanation: exp(
      "Le développement donne $\\|\\vec{u} + \\vec{v}\\|^2 = \\|\\vec{u}\\|^2 + 2\\,\\vec{u} \\cdot \\vec{v} + \\|\\vec{v}\\|^2$.",
      "On isole le double produit en passant les deux normes de l'autre côté.",
      "$2\\,\\vec{u} \\cdot \\vec{v} = \\|\\vec{u} + \\vec{v}\\|^2 - \\|\\vec{u}\\|^2 - \\|\\vec{v}\\|^2$, puis on divise par $2$.",
      "C'est très utile : le produit scalaire se calcule alors avec TROIS longueurs, sans aucun angle ni coordonnée."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "norme_somme", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_ns_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_norme_somme",
    difficulty: 5,
    theme: "neutral",
    text: "Démontre que $\\|\\vec{u} + \\vec{v}\\|^2 = \\|\\vec{u}\\|^2 + 2\\,\\vec{u} \\cdot \\vec{v} + \\|\\vec{v}\\|^2$.",
    format: "open",
    expected: ["carre scalaire", "carré scalaire", "distributiv", "symetrie", "symétrie", "developpe", "développe"],
    comparator: "contains_keyword",
    hint: "Écris la norme au carré comme un produit scalaire du vecteur par lui-même.",
    explanation: exp(
      "Une norme au carré est un produit scalaire : $\\|\\vec{w}\\|^2 = \\vec{w} \\cdot \\vec{w}$. C'est le point de départ.",
      "On pose $\\vec{w} = \\vec{u} + \\vec{v}$, donc $\\|\\vec{u} + \\vec{v}\\|^2 = (\\vec{u} + \\vec{v}) \\cdot (\\vec{u} + \\vec{v})$.",
      "On développe par distributivité : $\\vec{u} \\cdot \\vec{u} + \\vec{u} \\cdot \\vec{v} + \\vec{v} \\cdot \\vec{u} + \\vec{v} \\cdot \\vec{v}$. Les deux termes du milieu sont égaux par symétrie, ce qui donne le double produit.",
      "D'où $\\|\\vec{u} + \\vec{v}\\|^2 = \\|\\vec{u}\\|^2 + 2\\,\\vec{u} \\cdot \\vec{v} + \\|\\vec{v}\\|^2$."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "norme_somme", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_ns_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_norme_somme",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi le théorème de Pythagore n'est qu'un cas particulier du développement de $\\|\\vec{u} + \\vec{v}\\|^2$.",
    format: "open",
    expected: ["double produit", "orthogonaux", "nul", "s'annule", "perpendiculaire"],
    comparator: "contains_keyword",
    hint: "Que devient le terme du milieu quand l'angle est droit ?",
    explanation: exp(
      "Le développement est valable pour deux vecteurs QUELCONQUES : $\\|\\vec{u} + \\vec{v}\\|^2 = \\|\\vec{u}\\|^2 + 2\\,\\vec{u} \\cdot \\vec{v} + \\|\\vec{v}\\|^2$.",
      "Le seul terme qui dépend de l'angle entre les deux vecteurs est le double produit $2\\,\\vec{u} \\cdot \\vec{v}$.",
      "Si l'angle est droit, ce produit scalaire est nul et le terme disparaît : il reste $\\|\\vec{u} + \\vec{v}\\|^2 = \\|\\vec{u}\\|^2 + \\|\\vec{v}\\|^2$, c'est-à-dire Pythagore.",
      "Pythagore est le cas particulier où le double produit s'annule ; la formule générale vaut pour tous les triangles — c'est d'ailleurs Al-Kashi."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "norme_somme", "open"],
  },
  {
    kind: "template",
    id: "premiere_ps_ns_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_norme_somme",
    difficulty: 4,
    theme: "neutral",
    hint: "$\\|\\vec{u} + \\vec{v}\\|^2 = \\|\\vec{u}\\|^2 + 2\\,\\vec{u} \\cdot \\vec{v} + \\|\\vec{v}\\|^2$.",
    tags: ["premiere", "maths", "produit_scalaire", "norme_somme", "template"],
    generate: () => {
      const nu = randomInt(2, 7);
      const nv = randomInt(2, 7);
      const ps = pickOne([-6, -3, -2, 0, 2, 3, 5]);
      const res = nu * nu + 2 * ps + nv * nv;
      const correct = `$${res}$`;
      return {
        text: `On donne $\\|\\vec{u}\\| = ${nu}$, $\\|\\vec{v}\\| = ${nv}$ et $\\vec{u} \\cdot \\vec{v} = ${ps}$. Combien vaut $\\|\\vec{u} + \\vec{v}\\|^2$ ?`,
        format: "qcm",
        choices: [
          correct,
          `$${nu * nu + nv * nv}$`,
          `$${nu * nu - 2 * ps + nv * nv}$`,
          `$${(nu + nv) * (nu + nv)}$`,
        ],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On développe le carré scalaire : $\\|\\vec{u} + \\vec{v}\\|^2 = \\|\\vec{u}\\|^2 + 2\\,\\vec{u} \\cdot \\vec{v} + \\|\\vec{v}\\|^2$.",
          `On remplace : $${nu}^2 + 2 \\times ${ps} + ${nv}^2$.`,
          `$= ${nu * nu} + ${2 * ps} + ${nv * nv} = ${res}$. Oublier le double produit donnerait $${nu * nu + nv * nv}$ — ce n'est juste que si les vecteurs sont orthogonaux.`,
          `$\\|\\vec{u} + \\vec{v}\\|^2 = ${res}$.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_ps_ns_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_norme_somme",
    difficulty: 5,
    theme: "neutral",
    hint: "Développe, puis compare le double produit à $0$ : c'est lui qui décide.",
    tags: ["premiere", "maths", "produit_scalaire", "norme_somme", "open", "template"],
    generate: () => {
      const cas = [
        { ps: 0, cmp: "égale", mots: ["orthogonaux", "pythagore", "nul", "s'annule"] },
        { ps: 4, cmp: "supérieure", mots: ["positif", "aigu", "double produit", "plus grand"] },
        { ps: -5, cmp: "inférieure", mots: ["negatif", "négatif", "obtus", "double produit", "plus petit"] },
        { ps: 7, cmp: "supérieure", mots: ["positif", "aigu", "double produit", "plus grand"] },
        { ps: -2, cmp: "inférieure", mots: ["negatif", "négatif", "obtus", "double produit", "plus petit"] },
      ];
      const c = pickOne(cas);
      return {
        text: `On sait que $\\vec{u} \\cdot \\vec{v} = ${c.ps}$. La quantité $\\|\\vec{u} + \\vec{v}\\|^2$ est-elle inférieure, égale ou supérieure à $\\|\\vec{u}\\|^2 + \\|\\vec{v}\\|^2$ ? Justifie.`,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: exp(
          "Le développement donne $\\|\\vec{u} + \\vec{v}\\|^2 = \\|\\vec{u}\\|^2 + \\|\\vec{v}\\|^2 + 2\\,\\vec{u} \\cdot \\vec{v}$ : l'écart entre les deux quantités est exactement le double produit.",
          `Ici $\\vec{u} \\cdot \\vec{v} = ${c.ps}$, donc le double produit vaut $${2 * c.ps}$.`,
          c.ps === 0
            ? "Il est nul : les deux vecteurs sont orthogonaux, et les deux quantités sont égales. C'est le cas de Pythagore."
            : c.ps > 0
              ? "Il est positif : l'angle entre les vecteurs est aigu, la somme est « plus longue » que ne le voudrait Pythagore."
              : "Il est négatif : l'angle est obtus, la somme est « plus courte » que ne le voudrait Pythagore.",
          `$\\|\\vec{u} + \\vec{v}\\|^2$ est ${c.cmp} à $\\|\\vec{u}\\|^2 + \\|\\vec{v}\\|^2$.`
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
    kind: "fixed",
    id: "premiere_ps_orth_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_orthogonalite",
    difficulty: 4,
    theme: "neutral",
    text: "Les vecteurs $\\vec{u}(3 ; 1)$ et $\\vec{v}(-1 ; 3)$ sont-ils orthogonaux ?",
    format: "qcm",
    choices: [
      "oui, car leur produit scalaire vaut $0$",
      "non, car leur produit scalaire vaut $6$",
      "non, car leurs coordonnées sont différentes",
      "on ne peut pas savoir sans l'angle",
    ],
    expected: ["oui, car leur produit scalaire vaut $0$"],
    comparator: "mcq_exact",
    hint: "Calcule $3 \\times (-1) + 1 \\times 3$.",
    explanation: exp(
      "Deux vecteurs non nuls sont orthogonaux si et seulement si leur produit scalaire est nul.",
      "$\\vec{u} \\cdot \\vec{v} = 3 \\times (-1) + 1 \\times 3 = -3 + 3$.",
      "$= 0$. Nul besoin de connaître l'angle : les coordonnées suffisent.",
      "Oui, ils sont orthogonaux."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "orthogonalite", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_orth_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_orthogonalite",
    difficulty: 4,
    theme: "neutral",
    text: "Les vecteurs $\\vec{u}(4 ; 2)$ et $\\vec{v}(1 ; 2)$ sont-ils orthogonaux ?",
    format: "qcm",
    choices: [
      "non, car leur produit scalaire vaut $8$",
      "oui, car leur produit scalaire vaut $0$",
      "oui, car ils n'ont aucune coordonnée commune",
      "non, car ils sont colinéaires",
    ],
    expected: ["non, car leur produit scalaire vaut $8$"],
    comparator: "mcq_exact",
    hint: "Calcule $4 \\times 1 + 2 \\times 2$.",
    explanation: exp(
      "On teste l'orthogonalité en calculant le produit scalaire.",
      "$\\vec{u} \\cdot \\vec{v} = 4 \\times 1 + 2 \\times 2 = 4 + 4$.",
      "$= 8 \\neq 0$ : les vecteurs ne sont pas orthogonaux. Le produit étant positif, l'angle est même aigu.",
      "Non : leur produit scalaire vaut $8$."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "orthogonalite", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_orth_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_orthogonalite",
    difficulty: 5,
    theme: "neutral",
    text: "Pour quelle valeur de $k$ les vecteurs $\\vec{u}(3 ; k)$ et $\\vec{v}(6 ; -2)$ sont-ils orthogonaux ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "Résous $3 \\times 6 + k \\times (-2) = 0$.",
    explanation: exp(
      "Deux vecteurs sont orthogonaux lorsque leur produit scalaire est nul : on pose l'équation.",
      "$3 \\times 6 + k \\times (-2) = 0$, soit $18 - 2k = 0$.",
      "$2k = 18$, donc $k = 9$.",
      "Pour $k = 9$, les vecteurs sont orthogonaux."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "orthogonalite", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_orth_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_orthogonalite",
    difficulty: 5,
    theme: "neutral",
    text: "Quel vecteur est toujours orthogonal à $\\vec{u}(a ; b)$ ?",
    format: "qcm",
    choices: [
      "$\\vec{v}(-b ; a)$",
      "$\\vec{v}(a ; -b)$",
      "$\\vec{v}(b ; a)$",
      "$\\vec{v}(-a ; -b)$",
    ],
    expected: ["$\\vec{v}(-b ; a)$"],
    comparator: "mcq_exact",
    hint: "Teste chaque proposition en calculant le produit scalaire avec $\\vec{u}$.",
    explanation: exp(
      "On cherche $\\vec{v}$ tel que $\\vec{u} \\cdot \\vec{v} = 0$ pour TOUTES les valeurs de $a$ et $b$.",
      "Avec $\\vec{v}(-b ; a)$ : $a \\times (-b) + b \\times a = -ab + ab = 0$. C'est vrai quels que soient $a$ et $b$.",
      "Avec $\\vec{v}(a ; -b)$, on obtiendrait $a^2 - b^2$, qui n'est nul que dans des cas particuliers.",
      "Le vecteur $\\vec{v}(-b ; a)$ est toujours orthogonal à $\\vec{u}(a ; b)$ : on échange les coordonnées et on change un signe."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "orthogonalite", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_orth_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_orthogonalite",
    difficulty: 5,
    theme: "neutral",
    text: "Deux droites ont pour vecteurs directeurs $\\vec{u}(1 ; 2)$ et $\\vec{v}(2 ; -1)$. Que peut-on dire de ces droites ?",
    format: "qcm",
    choices: [
      "elles sont perpendiculaires",
      "elles sont parallèles",
      "elles sont confondues",
      "on ne peut pas conclure",
    ],
    expected: ["elles sont perpendiculaires"],
    comparator: "mcq_exact",
    hint: "Deux droites sont perpendiculaires quand leurs vecteurs directeurs sont orthogonaux.",
    explanation: exp(
      "L'orthogonalité des vecteurs directeurs caractérise la perpendicularité des droites.",
      "$\\vec{u} \\cdot \\vec{v} = 1 \\times 2 + 2 \\times (-1) = 2 - 2$.",
      "$= 0$ : les vecteurs directeurs sont orthogonaux.",
      "Les droites sont perpendiculaires."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "orthogonalite", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_orth_fixed_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_orthogonalite",
    difficulty: 4,
    theme: "neutral",
    text: "Dans un triangle $ABC$, comment traduire par un produit scalaire que $(AH)$ est la hauteur issue de $A$ ?",
    format: "qcm",
    choices: [
      "$\\vec{AH} \\cdot \\vec{BC} = 0$",
      "$\\vec{AH} \\cdot \\vec{BC} = 1$",
      "$\\vec{AB} \\cdot \\vec{AC} = 0$",
      "$\\vec{AH} \\cdot \\vec{AB} = 0$",
    ],
    expected: ["$\\vec{AH} \\cdot \\vec{BC} = 0$"],
    comparator: "mcq_exact",
    hint: "Une hauteur est perpendiculaire au côté OPPOSÉ.",
    explanation: exp(
      "La hauteur issue de $A$ est la droite passant par $A$ et perpendiculaire au côté opposé $[BC]$.",
      "Perpendiculaire se traduit par un produit scalaire nul entre un vecteur de la hauteur et un vecteur du côté.",
      "D'où $\\vec{AH} \\cdot \\vec{BC} = 0$. La proposition $\\vec{AB} \\cdot \\vec{AC} = 0$ dirait, elle, que le triangle est rectangle en $A$.",
      "$\\vec{AH} \\cdot \\vec{BC} = 0$."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "orthogonalite", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_orth_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_orthogonalite",
    difficulty: 4,
    theme: "neutral",
    text: "Dans un quadrilatère $ABCD$, on a $\\vec{AB} \\cdot \\vec{AD} = 0$. Qu'en déduit-on ?",
    format: "qcm",
    choices: [
      "l'angle en $A$ est droit",
      "le quadrilatère est un carré",
      "les côtés $[AB]$ et $[AD]$ ont la même longueur",
      "le quadrilatère est un losange",
    ],
    expected: ["l'angle en $A$ est droit"],
    comparator: "mcq_exact",
    hint: "Un produit scalaire nul donne une information d'ANGLE, pas de longueur.",
    explanation: exp(
      "Un produit scalaire nul entre deux vecteurs non nuls signifie qu'ils sont orthogonaux.",
      "$\\vec{AB}$ et $\\vec{AD}$ partent tous deux de $A$ : l'angle qu'ils forment en $A$ est donc droit.",
      "Cela ne dit rien des longueurs : un carré exigerait en plus $AB = AD$ et des conditions sur les autres sommets.",
      "L'angle en $A$ est droit."
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
    kind: "fixed",
    id: "premiere_ps_alk_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_alkashi",
    difficulty: 4,
    theme: "neutral",
    text: "Dans un triangle, $b = 5$, $c = 8$ et $\\widehat{A} = 60°$. Calcule $a$ (avec $\\cos 60° = 0{,}5$).",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "$a^2 = 25 + 64 - 2 \\times 5 \\times 8 \\times 0{,}5$.",
    explanation: exp(
      "La formule d'Al-Kashi donne $a^2 = b^2 + c^2 - 2bc\\cos A$.",
      "$a^2 = 25 + 64 - 2 \\times 5 \\times 8 \\times 0{,}5 = 89 - 40$.",
      "$a^2 = 49$, donc $a = 7$ (une longueur est positive).",
      "$a = 7$."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "alkashi", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_alk_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_alkashi",
    difficulty: 5,
    theme: "neutral",
    text: "Dans un triangle, $b = 2$, $c = 3$ et $\\widehat{A} = 120°$. Calcule $a^2$ (avec $\\cos 120° = -0{,}5$).",
    format: "short",
    expected: ["19"],
    comparator: "number_equal",
    hint: "Le cosinus est négatif : $-2bc \\times (-0{,}5)$ devient une ADDITION.",
    explanation: exp(
      "On applique $a^2 = b^2 + c^2 - 2bc\\cos A$ en soignant le signe du cosinus.",
      "$a^2 = 4 + 9 - 2 \\times 2 \\times 3 \\times (-0{,}5) = 13 - (-6)$.",
      "$= 13 + 6 = 19$. Avec un angle obtus, le côté opposé est plus grand que ne le donnerait Pythagore.",
      "$a^2 = 19$."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "alkashi", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_alk_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_angle_longueur",
    difficulty: 5,
    theme: "neutral",
    text: "Dans un triangle, $a = 7$, $b = 5$ et $c = 8$. Combien vaut $\\cos \\widehat{A}$ ?",
    format: "qcm",
    choices: ["$0{,}5$", "$-0{,}5$", "$0{,}8$", "$1$"],
    expected: ["$0{,}5$"],
    comparator: "mcq_exact",
    hint: "Isole $\\cos A$ dans $a^2 = b^2 + c^2 - 2bc\\cos A$.",
    explanation: exp(
      "Al-Kashi permet aussi de retrouver un ANGLE quand on connaît les trois côtés.",
      "$49 = 25 + 64 - 2 \\times 5 \\times 8 \\times \\cos A$, soit $49 = 89 - 80\\cos A$.",
      "$80\\cos A = 40$, donc $\\cos A = 0{,}5$ (l'angle $\\widehat{A}$ vaut $60°$).",
      "$\\cos \\widehat{A} = 0{,}5$."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "alkashi", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_alk_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_methode",
    difficulty: 3,
    theme: "neutral",
    text: "Dans quel cas la formule d'Al-Kashi est-elle utile ?",
    format: "qcm",
    choices: [
      "on connaît deux côtés et l'angle entre eux, et on cherche le troisième côté",
      "on connaît les trois angles et on cherche les côtés",
      "uniquement dans un triangle rectangle",
      "uniquement dans un triangle équilatéral",
    ],
    expected: [
      "on connaît deux côtés et l'angle entre eux, et on cherche le troisième côté",
    ],
    comparator: "mcq_exact",
    hint: "C'est la généralisation de Pythagore à un triangle quelconque.",
    explanation: exp(
      "Al-Kashi relie les trois côtés d'un triangle quelconque à l'un de ses angles.",
      "Connaissant $b$, $c$ et l'angle $\\widehat{A}$ qu'ils forment, elle donne $a$ ; connaissant les trois côtés, elle donne les angles.",
      "Les trois angles seuls ne suffisent jamais : une infinité de triangles de tailles différentes ont les mêmes angles.",
      "Elle sert quand on connaît deux côtés et l'angle entre eux."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "alkashi", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_alk_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_alkashi",
    difficulty: 4,
    theme: "neutral",
    text: "Dans un triangle, $b = 4$, $c = 5$ et $\\widehat{A} = 90°$. Calcule $a^2$.",
    format: "short",
    expected: ["41"],
    comparator: "number_equal",
    hint: "$\\cos 90° = 0$ : le dernier terme disparaît.",
    explanation: exp(
      "On applique $a^2 = b^2 + c^2 - 2bc\\cos A$ avec $\\cos 90° = 0$.",
      "$a^2 = 16 + 25 - 2 \\times 4 \\times 5 \\times 0$.",
      "$= 41$. On retrouve exactement le théorème de Pythagore : Al-Kashi le généralise.",
      "$a^2 = 41$."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "alkashi", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_alk_fixed_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_alkashi",
    difficulty: 5,
    theme: "reunion",
    text: "Un terrain triangulaire a deux côtés de $30$ m et $40$ m formant un angle de $60°$. Combien vaut le carré de la longueur du troisième côté (avec $\\cos 60° = 0{,}5$) ?",
    format: "short",
    expected: ["1300"],
    comparator: "number_equal",
    hint: "$30^2 + 40^2 - 2 \\times 30 \\times 40 \\times 0{,}5$.",
    explanation: exp(
      "On modélise le terrain par un triangle et on applique Al-Kashi.",
      "$a^2 = 900 + 1600 - 2 \\times 30 \\times 40 \\times 0{,}5 = 2500 - 1200$.",
      "$= 1300$. (Le troisième côté mesure $\\sqrt{1300} \\approx 36$ m.)",
      "$a^2 = 1300$."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "alkashi", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_alk_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_alkashi",
    difficulty: 5,
    theme: "neutral",
    text: "Si l'angle $\\widehat{A}$ est OBTUS, que peut-on dire de $a^2$ par rapport à $b^2 + c^2$ ?",
    format: "qcm",
    choices: [
      "$a^2 > b^2 + c^2$",
      "$a^2 < b^2 + c^2$",
      "$a^2 = b^2 + c^2$",
      "on ne peut pas comparer",
    ],
    expected: ["$a^2 > b^2 + c^2$"],
    comparator: "mcq_exact",
    hint: "Pour un angle obtus, $\\cos A < 0$ : que devient le terme $-2bc\\cos A$ ?",
    explanation: exp(
      "Tout se joue sur le signe du terme correctif $-2bc\\cos A$ dans $a^2 = b^2 + c^2 - 2bc\\cos A$.",
      "Un angle obtus a un cosinus négatif, donc $-2bc\\cos A$ est POSITIF : on ajoute quelque chose à $b^2 + c^2$.",
      "D'où $a^2 > b^2 + c^2$ : plus l'angle en $A$ s'ouvre, plus le côté opposé s'allonge.",
      "$a^2 > b^2 + c^2$."
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

  /* ===================== PS_ANGLE_LONGUEUR ===================== */
  {
    kind: "fixed",
    id: "premiere_ps_al_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_angle_longueur",
    difficulty: 3,
    theme: "neutral",
    text: "Comment calcule-t-on le cosinus de l'angle $\\theta$ entre deux vecteurs non nuls ?",
    format: "qcm",
    choices: [
      "$\\cos\\theta = \\dfrac{\\vec{u} \\cdot \\vec{v}}{\\|\\vec{u}\\| \\times \\|\\vec{v}\\|}$",
      "$\\cos\\theta = \\vec{u} \\cdot \\vec{v}$",
      "$\\cos\\theta = \\dfrac{\\|\\vec{u}\\| \\times \\|\\vec{v}\\|}{\\vec{u} \\cdot \\vec{v}}$",
      "$\\cos\\theta = \\|\\vec{u}\\| \\times \\|\\vec{v}\\| - \\vec{u} \\cdot \\vec{v}$",
    ],
    expected: ["$\\cos\\theta = \\dfrac{\\vec{u} \\cdot \\vec{v}}{\\|\\vec{u}\\| \\times \\|\\vec{v}\\|}$"],
    comparator: "mcq_exact",
    hint: "Pars de $\\vec{u} \\cdot \\vec{v} = \\|\\vec{u}\\|\\|\\vec{v}\\|\\cos\\theta$ et isole le cosinus.",
    explanation: exp(
      "La formule avec l'angle s'écrit $\\vec{u} \\cdot \\vec{v} = \\|\\vec{u}\\| \\times \\|\\vec{v}\\| \\times \\cos\\theta$.",
      "Pour trouver l'angle, on isole le cosinus en divisant par le produit des normes.",
      "$\\cos\\theta = \\dfrac{\\vec{u} \\cdot \\vec{v}}{\\|\\vec{u}\\| \\times \\|\\vec{v}\\|}$. On calcule le numérateur avec les coordonnées, puis on lit l'angle à la calculatrice.",
      "C'est la formule qui permet de trouver un angle à partir de coordonnées, sans rapporteur."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "angle_longueur", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_al_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_angle_longueur",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève calcule l'angle entre deux vecteurs et trouve $\\cos\\theta = 1{,}4$. Que doit-il en conclure ?",
    format: "qcm",
    choices: [
      "qu'il s'est trompé : un cosinus est toujours entre $-1$ et $1$",
      "que l'angle est obtus",
      "que les vecteurs sont orthogonaux",
      "que l'angle vaut $140°$",
    ],
    expected: ["qu'il s'est trompé : un cosinus est toujours entre $-1$ et $1$"],
    comparator: "mcq_exact",
    hint: "Le cosinus est l'abscisse d'un point du cercle de rayon $1$.",
    explanation: exp(
      "Le cosinus d'un angle est toujours compris entre $-1$ et $1$ : c'est l'abscisse d'un point du cercle trigonométrique.",
      "Une valeur de $1{,}4$ est donc impossible : le calcul contient une erreur.",
      "L'erreur la plus fréquente est d'avoir oublié une racine carrée dans une norme, ou d'avoir divisé par la SOMME des normes au lieu de leur produit. C'est un bon réflexe de contrôle : dès que le cosinus sort de $[-1 ; 1]$, on reprend le calcul.",
      "Il s'est trompé : aucun angle n'a un cosinus supérieur à $1$."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "angle_longueur", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_al_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_angle_longueur",
    difficulty: 5,
    theme: "reunion",
    text: "Deux rues partent du même carrefour à Saint-Denis, dirigées par $\\vec{u}(4 ; 0)$ et $\\vec{v}(3 ; 3)$. Quel angle forment-elles ?",
    format: "qcm",
    choices: ["$45°$", "$30°$", "$60°$", "$90°$"],
    expected: ["$45°$"],
    comparator: "mcq_exact",
    hint: "Calcule $\\cos\\theta$, puis reconnais une valeur remarquable.",
    explanation: exp(
      "L'angle entre deux directions se calcule par $\\cos\\theta = \\dfrac{\\vec{u} \\cdot \\vec{v}}{\\|\\vec{u}\\| \\times \\|\\vec{v}\\|}$.",
      "$\\vec{u} \\cdot \\vec{v} = 4 \\times 3 + 0 \\times 3 = 12$. Les normes valent $\\|\\vec{u}\\| = 4$ et $\\|\\vec{v}\\| = \\sqrt{9 + 9} = 3\\sqrt{2}$.",
      "$\\cos\\theta = \\dfrac{12}{4 \\times 3\\sqrt{2}} = \\dfrac{1}{\\sqrt{2}} = \\dfrac{\\sqrt{2}}{2}$, une valeur remarquable.",
      "Les deux rues forment un angle de $45°$."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "angle_longueur", "reunion", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_al_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_angle_longueur",
    difficulty: 4,
    theme: "neutral",
    text: "Dans un triangle, on calcule $\\cos\\widehat{A}$ et on trouve une valeur NÉGATIVE. Que peut-on dire de l'angle $\\widehat{A}$ ?",
    format: "qcm",
    choices: [
      "il est obtus",
      "il est aigu",
      "il est droit",
      "le triangle n'existe pas",
    ],
    expected: ["il est obtus"],
    comparator: "mcq_exact",
    hint: "Sur le cercle trigonométrique, où le cosinus devient-il négatif ?",
    explanation: exp(
      "Dans un triangle, un angle est compris entre $0°$ et $180°$ : son cosinus décroît de $1$ à $-1$.",
      "Le cosinus s'annule en $90°$ : il est positif pour un angle aigu, négatif pour un angle obtus.",
      "Une valeur négative signale donc un angle strictement supérieur à $90°$. C'est un contrôle utile : si la figure semble montrer un angle aigu et que le calcul donne un cosinus négatif, il y a une erreur quelque part.",
      "L'angle $\\widehat{A}$ est obtus."
    ),
    canvas: triangleCote("c", "b", "a", "?"),
    tags: ["premiere", "maths", "produit_scalaire", "angle_longueur", "canvas", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_al_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_angle_longueur",
    difficulty: 5,
    theme: "neutral",
    text: "Explique comment le produit scalaire permet de trouver un angle sans rapporteur.",
    format: "open",
    expected: ["cos", "coordonnees", "coordonnées", "normes", "divise", "calculatrice"],
    comparator: "contains_keyword",
    hint: "Quelles quantités sait-on calculer à partir des coordonnées ?",
    explanation: exp(
      "Le produit scalaire relie une information de FORME (l'angle) à des informations de CALCUL (coordonnées et longueurs) : $\\vec{u} \\cdot \\vec{v} = \\|\\vec{u}\\|\\|\\vec{v}\\|\\cos\\theta$.",
      "À partir des seules coordonnées, on sait calculer le produit scalaire ($xx' + yy'$) et les deux normes ($\\sqrt{x^2 + y^2}$).",
      "On en déduit $\\cos\\theta$ en divisant, puis l'angle lui-même avec la touche $\\arccos$ de la calculatrice.",
      "On passe des nombres à l'angle sans jamais mesurer : c'est exactement ce que fait un logiciel de géométrie."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "angle_longueur", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_al_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_angle_longueur",
    difficulty: 5,
    theme: "neutral",
    text: "Deux vecteurs ont un produit scalaire nul. Que peux-tu dire de l'angle qu'ils forment, et pourquoi ?",
    format: "open",
    expected: ["90", "droit", "orthogonaux", "perpendiculaire", "cos"],
    comparator: "contains_keyword",
    hint: "Dans $\\|\\vec{u}\\|\\|\\vec{v}\\|\\cos\\theta = 0$, quel facteur peut être nul ?",
    explanation: exp(
      "Le produit scalaire s'écrit $\\|\\vec{u}\\| \\times \\|\\vec{v}\\| \\times \\cos\\theta$ : c'est un produit de trois facteurs.",
      "Si les vecteurs sont non nuls, les deux normes sont strictement positives.",
      "Le seul facteur qui peut annuler le produit est donc $\\cos\\theta$. Or, entre $0°$ et $180°$, le cosinus ne s'annule qu'en $90°$.",
      "L'angle est droit : les deux vecteurs sont orthogonaux."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "angle_longueur", "open"],
  },
  {
    kind: "template",
    id: "premiere_ps_al_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_angle_longueur",
    difficulty: 5,
    theme: "neutral",
    hint: "Calcule le produit scalaire et les deux normes, puis divise.",
    tags: ["premiere", "maths", "produit_scalaire", "angle_longueur", "template"],
    generate: () => {
      const cas = [
        { x1: 1, y1: 0, x2: 1, y2: 1, cos: "\\dfrac{\\sqrt{2}}{2}", deg: "45°" },
        { x1: 1, y1: 0, x2: 0, y2: 3, cos: "0", deg: "90°" },
        { x1: 2, y1: 0, x2: -1, y2: 1, cos: "-\\dfrac{\\sqrt{2}}{2}", deg: "135°" },
        { x1: 3, y1: 0, x2: -2, y2: 0, cos: "-1", deg: "180°" },
        { x1: 0, y1: 4, x2: 0, y2: 2, cos: "1", deg: "0°" },
        { x1: 1, y1: 0, x2: -3, y2: -3, cos: "-\\dfrac{\\sqrt{2}}{2}", deg: "135°" },
      ];
      const c = pickOne(cas);
      const faux = ["45°", "90°", "135°", "180°", "0°"].filter((d) => d !== c.deg).slice(0, 3);
      return {
        text: `Quel angle forment $\\vec{u}(${c.x1} ; ${c.y1})$ et $\\vec{v}(${c.x2} ; ${c.y2})$ ?`,
        format: "qcm",
        choices: [`$${c.deg.replace("°", "")}°$`, ...faux.map((d) => `$${d.replace("°", "")}°$`)],
        expected: [`$${c.deg.replace("°", "")}°$`],
        comparator: "mcq_exact",
        canvas: vecteurs(c.x1, c.y1, c.x2, c.y2),
        explanation: exp(
          "L'angle se déduit de $\\cos\\theta = \\dfrac{\\vec{u} \\cdot \\vec{v}}{\\|\\vec{u}\\| \\times \\|\\vec{v}\\|}$.",
          `On calcule d'abord $\\vec{u} \\cdot \\vec{v} = ${c.x1} \\times ${c.x2} + ${c.y1} \\times ${c.y2} = ${c.x1 * c.x2 + c.y1 * c.y2}$, puis les deux normes.`,
          `On obtient $\\cos\\theta = ${c.cos}$, une valeur remarquable.`,
          `L'angle mesure $${c.deg.replace("°", "")}°$.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_ps_al_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_angle_longueur",
    difficulty: 5,
    theme: "neutral",
    hint: "Le signe du produit scalaire suffit à trancher, sans calculer l'angle.",
    tags: ["premiere", "maths", "produit_scalaire", "angle_longueur", "open", "template"],
    generate: () => {
      const cas = [
        { x1: 3, y1: 1, x2: 2, y2: 4, ps: 10, nature: "aigu" },
        { x1: 2, y1: 5, x2: -3, y2: 1, ps: -1, nature: "obtus" },
        { x1: 4, y1: -2, x2: 1, y2: 2, ps: 0, nature: "droit" },
        { x1: -1, y1: 3, x2: 2, y2: -5, ps: -17, nature: "obtus" },
        { x1: 6, y1: 2, x2: 1, y2: 1, ps: 8, nature: "aigu" },
      ];
      const c = pickOne(cas);
      return {
        text: `Les vecteurs $\\vec{u}(${c.x1} ; ${c.y1})$ et $\\vec{v}(${c.x2} ; ${c.y2})$ forment-ils un angle aigu, droit ou obtus ? Justifie sans calculer l'angle.`,
        format: "open",
        expected: [c.nature, "signe", "produit scalaire", c.ps === 0 ? "nul" : c.ps > 0 ? "positif" : "negatif"],
        comparator: "contains_keyword",
        canvas: vecteurs(c.x1, c.y1, c.x2, c.y2),
        explanation: exp(
          "Le signe du produit scalaire est celui du cosinus de l'angle : positif pour un angle aigu, nul pour un angle droit, négatif pour un angle obtus.",
          `On calcule $\\vec{u} \\cdot \\vec{v} = ${c.x1} \\times ${c.x2} + ${c.y1} \\times ${c.y2}$.`,
          `$= ${c.ps}$, un nombre ${c.ps === 0 ? "nul" : c.ps > 0 ? "positif" : "négatif"} : pas besoin des normes, ni de la calculatrice.`,
          `L'angle est ${c.nature}.`
        ),
      };
    },
  },

  /* ===================== PS_MA_MB ===================== */
  {
    kind: "fixed",
    id: "premiere_ps_mamb_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_ma_mb",
    difficulty: 4,
    theme: "neutral",
    text: "$A$ et $B$ sont deux points distincts. Quel est l'ensemble des points $M$ tels que $\\vec{MA} \\cdot \\vec{MB} = 0$ ?",
    format: "qcm",
    choices: [
      "le cercle de diamètre $[AB]$",
      "la médiatrice de $[AB]$",
      "la droite $(AB)$",
      "le cercle de centre $A$ passant par $B$",
    ],
    expected: ["le cercle de diamètre $[AB]$"],
    comparator: "mcq_exact",
    hint: "Que dit-on d'un triangle inscrit dans un demi-cercle ?",
    explanation: exp(
      "Un produit scalaire nul signifie que les vecteurs $\\vec{MA}$ et $\\vec{MB}$ sont orthogonaux, c'est-à-dire que l'angle $\\widehat{AMB}$ est droit.",
      "On cherche donc tous les points d'où l'on « voit » le segment $[AB]$ sous un angle droit.",
      "C'est une propriété du collège : ces points forment le cercle de diamètre $[AB]$. Les points $A$ et $B$ en font partie, car l'un des deux vecteurs y est nul.",
      "C'est le cercle de diamètre $[AB]$."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "ma_mb", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_mamb_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_ma_mb",
    difficulty: 5,
    theme: "neutral",
    text: "$I$ est le milieu de $[AB]$. À quoi est égal $\\vec{MA} \\cdot \\vec{MB}$ ?",
    format: "qcm",
    choices: [
      "$MI^2 - \\dfrac{AB^2}{4}$",
      "$MI^2 + \\dfrac{AB^2}{4}$",
      "$MI^2 - AB^2$",
      "$MA \\times MB$",
    ],
    expected: ["$MI^2 - \\dfrac{AB^2}{4}$"],
    comparator: "mcq_exact",
    hint: "Écris $\\vec{MA} = \\vec{MI} + \\vec{IA}$ et $\\vec{MB} = \\vec{MI} + \\vec{IB}$, en remarquant que $\\vec{IB} = -\\vec{IA}$.",
    explanation: exp(
      "Faire apparaître le milieu transforme un produit de deux vecteurs quelconques en une différence de deux carrés.",
      "On écrit $\\vec{MA} = \\vec{MI} + \\vec{IA}$ et $\\vec{MB} = \\vec{MI} + \\vec{IB} = \\vec{MI} - \\vec{IA}$, puisque $I$ est le milieu.",
      "Le produit devient $(\\vec{MI} + \\vec{IA}) \\cdot (\\vec{MI} - \\vec{IA}) = MI^2 - IA^2$, par l'identité remarquable. Or $IA = \\dfrac{AB}{2}$.",
      "$\\vec{MA} \\cdot \\vec{MB} = MI^2 - \\dfrac{AB^2}{4}$ : tout dépend alors de la seule distance $MI$."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "ma_mb", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_mamb_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_ma_mb",
    difficulty: 5,
    theme: "neutral",
    text: "$M$ est à l'INTÉRIEUR du cercle de diamètre $[AB]$. Quel est le signe de $\\vec{MA} \\cdot \\vec{MB}$ ?",
    format: "qcm",
    choices: [
      "négatif",
      "positif",
      "nul",
      "on ne peut pas savoir",
    ],
    expected: ["négatif"],
    comparator: "mcq_exact",
    hint: "Compare $MI$ au rayon $\\dfrac{AB}{2}$.",
    explanation: exp(
      "On part de $\\vec{MA} \\cdot \\vec{MB} = MI^2 - \\dfrac{AB^2}{4}$, où $I$ est le milieu de $[AB]$ — c'est-à-dire le centre du cercle.",
      "Le rayon de ce cercle vaut $\\dfrac{AB}{2}$. Dire que $M$ est à l'intérieur, c'est dire que $MI$ est plus petit que le rayon.",
      "Alors $MI^2 < \\dfrac{AB^2}{4}$ et la différence est négative. Autrement dit, depuis l'intérieur du cercle, on voit $[AB]$ sous un angle OBTUS.",
      "Le produit scalaire est négatif."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "ma_mb", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_mamb_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_ma_mb",
    difficulty: 4,
    theme: "neutral",
    text: "Le point $A$ appartient-il à l'ensemble des points $M$ tels que $\\vec{MA} \\cdot \\vec{MB} = 0$ ?",
    format: "qcm",
    choices: [
      "oui : le vecteur $\\vec{AA}$ est nul, donc le produit l'est aussi",
      "non : l'angle $\\widehat{AMB}$ n'existe pas en $A$",
      "non : $A$ est le centre du cercle",
      "oui : $A$ est le milieu de $[AB]$",
    ],
    expected: ["oui : le vecteur $\\vec{AA}$ est nul, donc le produit l'est aussi"],
    comparator: "mcq_exact",
    hint: "Remplace $M$ par $A$ dans l'écriture $\\vec{MA} \\cdot \\vec{MB}$.",
    explanation: exp(
      "Pour tester si un point appartient à un ensemble défini par une égalité, on le remplace dans l'égalité.",
      "Avec $M = A$ : $\\vec{AA} \\cdot \\vec{AB}$, et $\\vec{AA}$ est le vecteur nul.",
      "Un produit scalaire dont l'un des vecteurs est nul vaut $0$ : l'égalité est vérifiée, $A$ appartient bien à l'ensemble. De même pour $B$ — ce qui est cohérent, puisque ce sont les extrémités du diamètre.",
      "Oui, $A$ et $B$ appartiennent au cercle de diamètre $[AB]$."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "ma_mb", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_mamb_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_ma_mb",
    difficulty: 5,
    theme: "neutral",
    text: "Démontre que l'ensemble des points $M$ tels que $\\vec{MA} \\cdot \\vec{MB} = 0$ est le cercle de diamètre $[AB]$.",
    format: "open",
    expected: ["milieu", "MI", "rayon", "orthogonaux", "angle droit"],
    comparator: "contains_keyword",
    hint: "Fais apparaître le milieu $I$ de $[AB]$, puis lis l'égalité obtenue.",
    explanation: exp(
      "Un ensemble de points défini par une égalité se reconnaît en ramenant cette égalité à une distance constante depuis un point fixe.",
      "On introduit $I$, milieu de $[AB]$, et on obtient $\\vec{MA} \\cdot \\vec{MB} = MI^2 - \\dfrac{AB^2}{4}$.",
      "L'égalité $\\vec{MA} \\cdot \\vec{MB} = 0$ devient alors $MI^2 = \\dfrac{AB^2}{4}$, c'est-à-dire $MI = \\dfrac{AB}{2}$.",
      "$M$ est donc à distance constante $\\dfrac{AB}{2}$ du point fixe $I$ : c'est le cercle de centre $I$ et de rayon $\\dfrac{AB}{2}$, autrement dit le cercle de diamètre $[AB]$."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "ma_mb", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_mamb_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_ma_mb",
    difficulty: 5,
    theme: "neutral",
    text: "Explique l'intérêt de faire apparaître le milieu $I$ de $[AB]$ dans le calcul de $\\vec{MA} \\cdot \\vec{MB}$.",
    format: "open",
    expected: ["opposes", "opposés", "identite remarquable", "identité remarquable", "une seule distance", "MI"],
    comparator: "contains_keyword",
    hint: "Que deviennent $\\vec{IA}$ et $\\vec{IB}$ quand $I$ est le milieu ?",
    explanation: exp(
      "Le produit $\\vec{MA} \\cdot \\vec{MB}$ fait intervenir deux points mobiles à la fois : difficile d'y reconnaître un ensemble.",
      "En passant par $I$, on écrit $\\vec{MA} = \\vec{MI} + \\vec{IA}$ et $\\vec{MB} = \\vec{MI} + \\vec{IB}$. Or $I$ est le milieu : $\\vec{IA}$ et $\\vec{IB}$ sont OPPOSÉS.",
      "Le produit prend la forme $(\\vec{MI} + \\vec{IA}) \\cdot (\\vec{MI} - \\vec{IA})$, une identité remarquable qui donne $MI^2 - IA^2$.",
      "Tout se ramène à UNE SEULE distance variable, $MI$ : l'ensemble cherché se lit alors immédiatement comme un cercle de centre $I$."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "ma_mb", "open"],
  },
  {
    kind: "template",
    id: "premiere_ps_mamb_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_ma_mb",
    difficulty: 5,
    theme: "neutral",
    hint: "$\\vec{MA} \\cdot \\vec{MB} = MI^2 - \\dfrac{AB^2}{4}$, avec $I$ milieu de $[AB]$.",
    tags: ["premiere", "maths", "produit_scalaire", "ma_mb", "template"],
    generate: () => {
      const ab = pickOne([4, 6, 8, 10]);
      const mi = pickOne([1, 2, 3, 5, 7]);
      const res = mi * mi - (ab * ab) / 4;
      const correct = `$${res}$`;
      return {
        text: `$AB = ${ab}$ et $I$ est le milieu de $[AB]$. Un point $M$ vérifie $MI = ${mi}$. Combien vaut $\\vec{MA} \\cdot \\vec{MB}$ ?`,
        format: "qcm",
        choices: [
          correct,
          `$${mi * mi + (ab * ab) / 4}$`,
          `$${mi * mi - ab * ab}$`,
          `$${mi * mi}$`,
        ],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "En passant par le milieu $I$, le produit se ramène à une différence de deux carrés : $\\vec{MA} \\cdot \\vec{MB} = MI^2 - \\dfrac{AB^2}{4}$.",
          `Ici $MI = ${mi}$ et $AB = ${ab}$, donc $\\dfrac{AB^2}{4} = \\dfrac{${ab * ab}}{4} = ${(ab * ab) / 4}$.`,
          `$${mi * mi} - ${(ab * ab) / 4} = ${res}$. ` +
            (res < 0
              ? "Le résultat est négatif : $M$ est à l'intérieur du cercle de diamètre $[AB]$."
              : res === 0
                ? "Le résultat est nul : $M$ est sur le cercle de diamètre $[AB]$."
                : "Le résultat est positif : $M$ est à l'extérieur du cercle de diamètre $[AB]$."),
          `$\\vec{MA} \\cdot \\vec{MB} = ${res}$.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_ps_mamb_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_ma_mb",
    difficulty: 5,
    theme: "neutral",
    hint: "Ramène l'égalité à une distance $MI$ constante : le centre est le milieu de $[AB]$.",
    tags: ["premiere", "maths", "produit_scalaire", "ma_mb", "open", "template"],
    generate: () => {
      const ab = pickOne([4, 6, 8]);
      const k = pickOne([0, 5, -3, 9, -4]);
      const r2 = k + (ab * ab) / 4;
      return {
        text: `$AB = ${ab}$. Décris l'ensemble des points $M$ tels que $\\vec{MA} \\cdot \\vec{MB} = ${k}$, et justifie.`,
        format: "open",
        expected: ["cercle", "milieu", "MI", "rayon", r2 <= 0 ? "vide" : "centre"],
        comparator: "contains_keyword",
        explanation: exp(
          "Pour reconnaître un ensemble de points, on ramène l'égalité à « une distance à un point fixe vaut telle valeur ».",
          `On introduit $I$, milieu de $[AB]$ : l'égalité devient $MI^2 - \\dfrac{${ab * ab}}{4} = ${k}$, soit $MI^2 = ${r2}$.`,
          r2 > 0
            ? `Comme $${r2} > 0$, cela donne $MI = \\sqrt{${r2}}$ : une distance constante au point fixe $I$.`
            : r2 === 0
              ? "Le carré de la distance vaut $0$ : le seul point possible est $I$ lui-même."
              : `Comme $${r2} < 0$, aucun point ne convient : un carré ne peut pas être négatif.`,
          r2 > 0
            ? `L'ensemble est le cercle de centre $I$ (milieu de $[AB]$) et de rayon $\\sqrt{${r2}}$.`
            : r2 === 0
              ? "L'ensemble est réduit au point $I$, milieu de $[AB]$."
              : "L'ensemble est vide."
        ),
      };
    },
  },

  /* ===================== PS_METHODE ===================== */
  {
    kind: "fixed",
    id: "premiere_ps_meth_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_methode",
    difficulty: 3,
    theme: "neutral",
    text: "On connaît les coordonnées des deux vecteurs dans un repère orthonormé. Quelle méthode est la plus rapide pour leur produit scalaire ?",
    format: "qcm",
    choices: [
      "la formule $xx' + yy'$",
      "la formule avec les normes et le cosinus de l'angle",
      "la projection orthogonale",
      "la formule d'Al-Kashi",
    ],
    expected: ["la formule $xx' + yy'$"],
    comparator: "mcq_exact",
    hint: "Quelle formule n'exige aucun calcul intermédiaire ?",
    explanation: exp(
      "Il y a quatre façons de calculer un produit scalaire ; la bonne est celle qui utilise directement ce qu'on possède.",
      "Avec des coordonnées en repère orthonormé, la formule $xx' + yy'$ donne le résultat en deux multiplications et une addition.",
      "Les autres méthodes demanderaient d'abord de calculer les normes, ou de mesurer un angle : c'est du travail en plus pour le même résultat.",
      "On utilise $\\vec{u} \\cdot \\vec{v} = xx' + yy'$."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "methode", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_meth_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_methode",
    difficulty: 4,
    theme: "neutral",
    text: "On connaît les deux normes et l'angle entre les vecteurs, mais aucune coordonnée. Quelle formule utiliser ?",
    format: "qcm",
    choices: [
      "$\\vec{u} \\cdot \\vec{v} = \\|\\vec{u}\\| \\times \\|\\vec{v}\\| \\times \\cos\\theta$",
      "$\\vec{u} \\cdot \\vec{v} = xx' + yy'$",
      "$\\vec{u} \\cdot \\vec{v} = \\|\\vec{u}\\| \\times \\|\\vec{v}\\|$",
      "$\\vec{u} \\cdot \\vec{v} = \\dfrac{\\|\\vec{u}\\|}{\\|\\vec{v}\\|}$",
    ],
    expected: ["$\\vec{u} \\cdot \\vec{v} = \\|\\vec{u}\\| \\times \\|\\vec{v}\\| \\times \\cos\\theta$"],
    comparator: "mcq_exact",
    hint: "Utilise exactement les trois données dont tu disposes.",
    explanation: exp(
      "On choisit la formule dont toutes les données sont connues, sans en fabriquer d'autres.",
      "Ici on possède $\\|\\vec{u}\\|$, $\\|\\vec{v}\\|$ et l'angle $\\theta$ : c'est exactement ce qu'attend la formule avec le cosinus.",
      "Sans repère, la formule $xx' + yy'$ est inutilisable : il n'y a pas de coordonnées. Et oublier le cosinus reviendrait à supposer les vecteurs de même sens.",
      "$\\vec{u} \\cdot \\vec{v} = \\|\\vec{u}\\| \\times \\|\\vec{v}\\| \\times \\cos\\theta$."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "methode", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_meth_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_methode",
    difficulty: 5,
    theme: "neutral",
    text: "On connaît les trois longueurs d'un triangle $ABC$, et rien d'autre. Comment calculer $\\vec{AB} \\cdot \\vec{AC}$ ?",
    format: "qcm",
    choices: [
      "avec $\\vec{AB} \\cdot \\vec{AC} = \\dfrac{1}{2}\\left(AB^2 + AC^2 - BC^2\\right)$",
      "avec $xx' + yy'$",
      "avec $AB \\times AC$",
      "c'est impossible sans l'angle",
    ],
    expected: ["avec $\\vec{AB} \\cdot \\vec{AC} = \\dfrac{1}{2}\\left(AB^2 + AC^2 - BC^2\\right)$"],
    comparator: "mcq_exact",
    hint: "Développe $\\|\\vec{AC} - \\vec{AB}\\|^2$, qui vaut $BC^2$.",
    explanation: exp(
      "Quand on ne dispose que de longueurs, on passe par le développement d'une norme au carré.",
      "$\\vec{BC} = \\vec{AC} - \\vec{AB}$, donc $BC^2 = AC^2 - 2\\,\\vec{AB} \\cdot \\vec{AC} + AB^2$.",
      "On isole le produit scalaire : $\\vec{AB} \\cdot \\vec{AC} = \\dfrac{1}{2}\\left(AB^2 + AC^2 - BC^2\\right)$. C'est la même égalité qu'Al-Kashi, écrite autrement.",
      "Trois longueurs suffisent : ni angle ni repère ne sont nécessaires."
    ),
    canvas: triangleCote("AB", "AC", "BC"),
    tags: ["premiere", "maths", "produit_scalaire", "methode", "canvas", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_meth_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_methode",
    difficulty: 5,
    theme: "neutral",
    text: "Il existe quatre façons de calculer un produit scalaire. Explique comment tu choisis, avant de te lancer dans les calculs.",
    format: "open",
    expected: ["donnees", "données", "coordonnees", "coordonnées", "normes", "angle", "longueurs", "projete", "projeté"],
    comparator: "contains_keyword",
    hint: "Pars de ce que l'énoncé DONNE, pas de la formule que tu préfères.",
    explanation: exp(
      "Les quatre formules calculent la même chose : $xx' + yy'$, $\\|\\vec{u}\\|\\|\\vec{v}\\|\\cos\\theta$, la projection orthogonale, et le développement avec les trois longueurs.",
      "On ne choisit pas par habitude, mais en regardant les DONNÉES de l'énoncé.",
      "Des coordonnées et un repère orthonormé → $xx' + yy'$. Des normes et un angle → le cosinus. Un projeté visible sur la figure → la projection. Trois longueurs → le développement, ou Al-Kashi.",
      "On lit d'abord ce qu'on possède ; la formule est celle qui n'exige aucun calcul intermédiaire."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "methode", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_meth_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_methode",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève dispose des coordonnées de trois points et calcule les trois longueurs du triangle avant d'appliquer Al-Kashi pour trouver un angle. Que lui conseilles-tu ?",
    format: "open",
    expected: ["coordonnees", "coordonnées", "directement", "plus court", "xx'", "racine"],
    comparator: "contains_keyword",
    hint: "Que peut-on calculer directement à partir des coordonnées ?",
    explanation: exp(
      "Sa méthode donne le bon résultat : elle n'est pas fausse, elle est simplement plus longue que nécessaire.",
      "Avec les coordonnées, le produit scalaire s'obtient directement par $xx' + yy'$, sans passer par les longueurs des côtés.",
      "Il lui suffit ensuite des deux normes pour écrire $\\cos\\theta = \\dfrac{\\vec{u} \\cdot \\vec{v}}{\\|\\vec{u}\\|\\|\\vec{v}\\|}$. Il économise trois racines carrées et un carré, et surtout autant d'occasions de se tromper.",
      "Al-Kashi sert quand on n'a QUE des longueurs ; avec des coordonnées, on va droit au produit scalaire."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "methode", "open"],
  },
  {
    kind: "template",
    id: "premiere_ps_meth_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_methode",
    difficulty: 4,
    theme: "neutral",
    hint: "Regarde ce que l'énoncé donne, et choisis la formule qui l'utilise sans calcul intermédiaire.",
    tags: ["premiere", "maths", "produit_scalaire", "methode", "template"],
    generate: () => {
      const cas = [
        {
          donnees: "les coordonnées des deux vecteurs dans un repère orthonormé",
          bonne: "$xx' + yy'$",
        },
        {
          donnees: "les deux normes et l'angle entre les vecteurs",
          bonne: "$\\|\\vec{u}\\| \\times \\|\\vec{v}\\| \\times \\cos\\theta$",
        },
        {
          donnees: "les trois longueurs du triangle, sans repère ni angle",
          bonne: "$\\dfrac{1}{2}\\left(AB^2 + AC^2 - BC^2\\right)$",
        },
        {
          donnees: "une figure où le projeté orthogonal d'un point est déjà tracé",
          bonne: "la projection orthogonale",
        },
      ];
      const c = pickOne(cas);
      const toutes = [
        "$xx' + yy'$",
        "$\\|\\vec{u}\\| \\times \\|\\vec{v}\\| \\times \\cos\\theta$",
        "$\\dfrac{1}{2}\\left(AB^2 + AC^2 - BC^2\\right)$",
        "la projection orthogonale",
      ];
      return {
        text: `Un exercice donne ${c.donnees}. Quelle méthode choisis-tu pour le produit scalaire ?`,
        format: "qcm",
        choices: [c.bonne, ...toutes.filter((m) => m !== c.bonne)],
        expected: [c.bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Les quatre formules donnent le même nombre : on choisit celle qui utilise directement les données de l'énoncé.",
          `Ici, l'énoncé fournit ${c.donnees}.`,
          "Les autres méthodes exigeraient de fabriquer d'abord des données manquantes — normes, angle ou coordonnées — donc du calcul en plus, et autant d'occasions d'erreur.",
          `On utilise ${c.bonne}.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_ps_meth_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_methode",
    difficulty: 5,
    theme: "neutral",
    hint: "Nomme la méthode, dis quelles données elle utilise, et pourquoi les autres seraient plus longues.",
    tags: ["premiere", "maths", "produit_scalaire", "methode", "open", "template"],
    generate: () => {
      const cas = [
        {
          enonce: "$A(1 ; 2)$, $B(4 ; 3)$ et $C(2 ; 6)$ dans un repère orthonormé ; calculer $\\vec{AB} \\cdot \\vec{AC}$",
          mots: ["coordonnees", "coordonnées", "xx'", "soustrai"],
          methode: "les coordonnées : on calcule celles de $\\vec{AB}$ et $\\vec{AC}$ par différence, puis $xx' + yy'$",
        },
        {
          enonce: "un parallélogramme dont on connaît les côtés $5$ et $8$ et l'angle de $60°$ ; calculer le produit scalaire des deux côtés",
          mots: ["normes", "angle", "cos"],
          methode: "les normes et l'angle : $\\|\\vec{u}\\| \\times \\|\\vec{v}\\| \\times \\cos 60°$",
        },
        {
          enonce: "un triangle $ABC$ avec $AB = 7$, $AC = 5$ et $BC = 6$ ; calculer $\\vec{AB} \\cdot \\vec{AC}$",
          mots: ["longueurs", "al-kashi", "alkashi", "carres", "carrés"],
          methode: "les trois longueurs : $\\dfrac{1}{2}(AB^2 + AC^2 - BC^2)$",
        },
        {
          enonce: "un rectangle $ABCD$ où $H$ est le projeté de $C$ sur $(AB)$ ; calculer $\\vec{AB} \\cdot \\vec{AC}$",
          mots: ["projection", "projete", "projeté"],
          methode: "la projection : $\\vec{AB} \\cdot \\vec{AC} = \\vec{AB} \\cdot \\vec{AH}$",
        },
      ];
      const c = pickOne(cas);
      return {
        text: `Voici un énoncé : ${c.enonce}. Quelle méthode choisis-tu, et pourquoi celle-là plutôt qu'une autre ?`,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: exp(
          "Choisir une méthode, c'est regarder les données avant de regarder les formules.",
          "On liste ce que l'énoncé fournit, puis on repère la formule qui n'attend rien d'autre.",
          `Ici, la méthode adaptée est ${c.methode}.`,
          "Les autres formules demanderaient de fabriquer des données absentes : c'est plus long, et chaque étape en plus est une erreur possible."
        ),
      };
    },
  },

  /* =========================================================
     QUESTIONS OUVERTES — compléments du 02/08/2026.
     Quatre micro-compétences écrites avant le découpage n'avaient aucune
     question ouverte : deux ouvertes fixes + un TEMPLATE ouvert chacune.
  ========================================================= */

  {
    kind: "fixed",
    id: "premiere_ps_na_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_norme_angle",
    difficulty: 5,
    theme: "neutral",
    text: "Pourquoi la formule du produit scalaire fait-elle intervenir le COSINUS de l'angle, et non l'angle lui-même ?",
    format: "open",
    expected: ["projection", "projete", "projeté", "part", "direction", "cosinus"],
    comparator: "contains_keyword",
    hint: "Que mesure le cosinus, sur le triangle rectangle de la projection ?",
    explanation: exp(
      "Le produit scalaire mesure ce que deux vecteurs ont « en commun » dans une même direction : c'est une histoire de projection, pas d'angle brut.",
      "Quand on projette $\\vec{v}$ sur la direction de $\\vec{u}$, la longueur du projeté vaut $\\|\\vec{v}\\| \\cos\\theta$ — c'est la définition même du cosinus dans le triangle rectangle formé.",
      "Le produit scalaire multiplie alors cette part utile par $\\|\\vec{u}\\|$. L'angle seul ne conviendrait pas : il ne dit pas quelle FRACTION du vecteur se retrouve dans la direction de l'autre.",
      "Le cosinus est le taux de projection : il vaut $1$ quand les vecteurs sont alignés, $0$ quand ils sont perpendiculaires, $-1$ quand ils sont opposés."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "norme_angle", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_na_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_norme_angle",
    difficulty: 5,
    theme: "neutral",
    text: "À normes fixées, pour quel angle le produit scalaire est-il maximal ? minimal ? nul ? Justifie.",
    format: "open",
    expected: ["cosinus", "0", "180", "90", "1", "-1"],
    comparator: "contains_keyword",
    hint: "Seul le cosinus varie : entre quelles valeurs ?",
    explanation: exp(
      "Dans $\\vec{u} \\cdot \\vec{v} = \\|\\vec{u}\\| \\|\\vec{v}\\| \\cos\\theta$, les deux normes sont fixées : seul $\\cos\\theta$ change.",
      "Or le cosinus varie entre $-1$ et $1$ quand l'angle va de $0°$ à $180°$, en décroissant.",
      "Maximal pour $\\theta = 0°$ (cosinus $1$) : les vecteurs sont alignés de même sens, le produit vaut $\\|\\vec{u}\\|\\|\\vec{v}\\|$. Nul pour $\\theta = 90°$ : ils sont orthogonaux. Minimal pour $\\theta = 180°$ (cosinus $-1$) : ils sont opposés, le produit vaut $-\\|\\vec{u}\\|\\|\\vec{v}\\|$.",
      "Tout se lit sur le cosinus : le produit scalaire est d'autant plus grand que les vecteurs pointent dans la même direction."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "norme_angle", "open"],
  },
  {
    kind: "template",
    id: "premiere_ps_na_tpl_open",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_norme_angle",
    difficulty: 5,
    theme: "neutral",
    hint: "$\\|\\vec{u}\\| \\|\\vec{v}\\| \\cos\\theta$ — et le signe se lit sur le cosinus.",
    tags: ["premiere", "maths", "produit_scalaire", "norme_angle", "open", "template"],
    generate: () => {
      const cas = [
        { nu: 4, nv: 3, deg: 60, cos: "\\dfrac{1}{2}", res: "6" },
        { nu: 5, nv: 2, deg: 120, cos: "-\\dfrac{1}{2}", res: "-5" },
        { nu: 6, nv: 4, deg: 90, cos: "0", res: "0" },
        { nu: 3, nv: 7, deg: 0, cos: "1", res: "21" },
        { nu: 8, nv: 2, deg: 180, cos: "-1", res: "-16" },
      ];
      const c = pickOne(cas);
      return {
        text: `Deux vecteurs ont pour normes $${c.nu}$ et $${c.nv}$, et forment un angle de $${c.deg}°$. Calcule leur produit scalaire, puis explique ce que son signe dit de leurs directions.`,
        format: "open",
        expected: [c.res, "cosinus", c.deg < 90 ? "meme sens" : c.deg === 90 ? "orthogonaux" : "sens contraire", "meme direction"],
        comparator: "contains_keyword",
        explanation: exp(
          "Le produit scalaire vaut $\\|\\vec{u}\\| \\|\\vec{v}\\| \\cos\\theta$ : les normes fixent la taille, le cosinus fixe le signe.",
          `Ici $${c.nu} \\times ${c.nv} \\times \\cos ${c.deg}° = ${c.nu} \\times ${c.nv} \\times ${c.cos}$.`,
          `On obtient $${c.res}$.`,
          c.deg < 90
            ? "Le produit est positif : les deux vecteurs pointent globalement dans la même direction."
            : c.deg === 90
              ? "Le produit est nul : les deux vecteurs sont orthogonaux, aucun n'a de part dans la direction de l'autre."
              : "Le produit est négatif : les deux vecteurs pointent dans des directions opposées."
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "premiere_ps_coo_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_coordonnees",
    difficulty: 5,
    theme: "neutral",
    text: "Pourquoi la formule $\\vec{u} \\cdot \\vec{v} = xx' + yy'$ n'est-elle valable que dans un repère ORTHONORMÉ ?",
    format: "open",
    expected: ["perpendiculaires", "orthogonal", "norme 1", "axes", "unite", "unité"],
    comparator: "contains_keyword",
    hint: "Que suppose-t-on sur les deux vecteurs de base ?",
    explanation: exp(
      "Les coordonnées $(x ; y)$ décomposent un vecteur sur les deux vecteurs de base : $\\vec{u} = x\\vec{i} + y\\vec{j}$.",
      "En développant le produit scalaire par bilinéarité, on fait apparaître les produits $\\vec{i} \\cdot \\vec{i}$, $\\vec{i} \\cdot \\vec{j}$ et $\\vec{j} \\cdot \\vec{j}$.",
      "La formule simple ne survit que si $\\vec{i} \\cdot \\vec{j} = 0$ — les axes sont perpendiculaires — et si $\\vec{i} \\cdot \\vec{i} = \\vec{j} \\cdot \\vec{j} = 1$ — les vecteurs de base sont de norme $1$. C'est exactement la définition d'un repère orthonormé.",
      "Dans un repère quelconque, les termes croisés ne disparaissent pas et la formule est fausse : c'est pourquoi l'énoncé précise toujours « repère orthonormé »."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "coordonnees", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_coo_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_coordonnees",
    difficulty: 5,
    theme: "neutral",
    text: "Explique, à partir des coordonnées, pourquoi $\\vec{u} \\cdot \\vec{u}$ est égal au carré de la norme de $\\vec{u}$.",
    format: "open",
    expected: ["x^2 + y^2", "pythagore", "norme", "carre", "carré", "meme vecteur"],
    comparator: "contains_keyword",
    hint: "Applique la formule des coordonnées avec le même vecteur des deux côtés.",
    explanation: exp(
      "Le produit scalaire par coordonnées s'écrit $xx' + yy'$ : rien n'interdit de prendre deux fois le même vecteur.",
      "Avec $\\vec{v} = \\vec{u}$ : $\\vec{u} \\cdot \\vec{u} = x \\times x + y \\times y = x^2 + y^2$.",
      "Or la norme vaut $\\|\\vec{u}\\| = \\sqrt{x^2 + y^2}$, par Pythagore. Son carré est donc exactement $x^2 + y^2$.",
      "$\\vec{u} \\cdot \\vec{u} = \\|\\vec{u}\\|^2$ : ce carré scalaire est ce qui permet de développer $\\|\\vec{u} + \\vec{v}\\|^2$ et de faire le lien entre produit scalaire et longueurs."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "coordonnees", "open"],
  },
  {
    kind: "template",
    id: "premiere_ps_coo_tpl_open",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_coordonnees",
    difficulty: 5,
    theme: "neutral",
    hint: "Commence par calculer les coordonnées des vecteurs, par différence des points.",
    tags: ["premiere", "maths", "produit_scalaire", "coordonnees", "open", "template"],
    generate: () => {
      const xA = randomInt(-3, 3);
      const yA = randomInt(-3, 3);
      const xB = xA + randomInt(1, 4);
      const yB = yA + randomInt(-3, 3);
      const xC = xA + randomInt(-4, -1);
      const yC = yA + randomInt(1, 4);
      const ab = [xB - xA, yB - yA];
      const ac = [xC - xA, yC - yA];
      const ps = ab[0] * ac[0] + ab[1] * ac[1];
      return {
        text: `Dans un repère orthonormé, on donne $A(${xA} ; ${yA})$, $B(${xB} ; ${yB})$ et $C(${xC} ; ${yC})$. Calcule $\\vec{AB} \\cdot \\vec{AC}$ en détaillant chaque étape, et dis ce que le signe obtenu indique sur l'angle en $A$.`,
        format: "open",
        expected: [String(ps), "coordonnees", "coordonnées", "difference", "différence", ps > 0 ? "aigu" : ps === 0 ? "droit" : "obtus"],
        comparator: "contains_keyword",
        explanation: exp(
          "Les coordonnées d'un vecteur s'obtiennent en soustrayant celles de l'origine à celles de l'extrémité ; le produit scalaire est ensuite $xx' + yy'$.",
          `$\\vec{AB}(${ab[0]} ; ${ab[1]})$ et $\\vec{AC}(${ac[0]} ; ${ac[1]})$.`,
          `$\\vec{AB} \\cdot \\vec{AC} = ${ab[0]} \\times ${ac[0]} + ${ab[1]} \\times ${ac[1]} = ${ps}$.`,
          `Le résultat est ${ps > 0 ? "positif : l'angle en $A$ est aigu" : ps === 0 ? "nul : l'angle en $A$ est droit, le triangle est rectangle en $A$" : "négatif : l'angle en $A$ est obtus"}.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "premiere_ps_ort_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_orthogonalite",
    difficulty: 5,
    theme: "neutral",
    text: "Pourquoi teste-t-on l'orthogonalité par un produit scalaire nul, plutôt qu'en mesurant l'angle ?",
    format: "open",
    expected: ["exact", "mesure", "calcul", "coordonnees", "coordonnées", "sans angle"],
    comparator: "contains_keyword",
    hint: "Une mesure d'angle sur un dessin est-elle exacte ?",
    explanation: exp(
      "Vérifier un angle droit par la mesure suppose un dessin, un rapporteur, et donc une approximation.",
      "Le produit scalaire, lui, se calcule à partir des seules coordonnées : $xx' + yy'$, deux multiplications et une addition.",
      "Le résultat est EXACT : s'il vaut $0$, l'angle est droit, sans marge d'erreur. Un rapporteur ne distinguerait pas $90°$ de $89{,}8°$, le calcul si.",
      "C'est aussi plus rapide qu'une réciproque de Pythagore, qui demande trois longueurs donc trois racines carrées — ici, aucune."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "orthogonalite", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_ort_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_orthogonalite",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève trouve $\\vec{u} \\cdot \\vec{v} = 0$ et conclut que $\\vec{u} = \\vec{0}$ ou $\\vec{v} = \\vec{0}$. Explique son erreur.",
    format: "open",
    expected: ["orthogonaux", "perpendiculaire", "non nuls", "produit de nombres", "pas la meme"],
    comparator: "contains_keyword",
    hint: "Il applique aux vecteurs une règle qui vaut pour les nombres.",
    explanation: exp(
      "Pour les NOMBRES, un produit nul entraîne qu'un des facteurs est nul. L'élève transpose cette règle au produit scalaire.",
      "Mais le produit scalaire n'est pas une multiplication de nombres : il prend deux vecteurs et rend un nombre, et son annulation a un tout autre sens.",
      "Contre-exemple : $\\vec{u}(1 ; 0)$ et $\\vec{v}(0 ; 1)$ donnent $1 \\times 0 + 0 \\times 1 = 0$, alors qu'aucun n'est nul. Ils sont simplement ORTHOGONAUX.",
      "C'est justement ce qui rend le produit scalaire utile : son annulation caractérise la perpendicularité, pas la nullité."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "orthogonalite", "piege", "open"],
  },
  {
    kind: "template",
    id: "premiere_ps_ort_tpl_open",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_orthogonalite",
    difficulty: 5,
    theme: "neutral",
    hint: "Calcule le produit scalaire des deux vecteurs : nul ou pas ?",
    tags: ["premiere", "maths", "produit_scalaire", "orthogonalite", "open", "template"],
    generate: () => {
      const cas = [
        { u: [3, 4], v: [4, -3], ok: true },
        { u: [2, 5], v: [5, -2], ok: true },
        { u: [1, 2], v: [2, 1], ok: false },
        { u: [6, -2], v: [1, 3], ok: true },
        { u: [3, 1], v: [2, 4], ok: false },
      ];
      const c = pickOne(cas);
      const ps = c.u[0] * c.v[0] + c.u[1] * c.v[1];
      return {
        text: `Les vecteurs $\\vec{u}(${c.u[0]} ; ${c.u[1]})$ et $\\vec{v}(${c.v[0]} ; ${c.v[1]})$ sont-ils orthogonaux ? Justifie, et dis pourquoi ce test est préférable à une mesure d'angle.`,
        format: "open",
        expected: [String(ps), "produit scalaire", c.ok ? "orthogonaux" : "pas orthogonaux", "exact"],
        comparator: "contains_keyword",
        canvas: vecteurs(c.u[0], c.u[1], c.v[0], c.v[1]),
        explanation: exp(
          "Deux vecteurs non nuls sont orthogonaux si et seulement si leur produit scalaire est nul.",
          `On calcule $${c.u[0]} \\times ${c.v[0]} + ${c.u[1]} \\times ${c.v[1]}$.`,
          `$= ${ps}$${c.ok ? " : le produit est nul." : " : le produit n'est pas nul."}`,
          c.ok
            ? "Les vecteurs sont donc orthogonaux — et le calcul est exact, alors qu'un rapporteur ne distinguerait pas $90°$ de $89{,}8°$."
            : "Les vecteurs ne sont donc pas orthogonaux, même si le dessin peut le laisser croire."
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "premiere_ps_alk_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_alkashi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi la formule d'Al-Kashi est une généralisation du théorème de Pythagore.",
    format: "open",
    expected: ["90", "droit", "cos", "s'annule", "disparait", "disparaît", "terme"],
    comparator: "contains_keyword",
    hint: "Que devient $-2bc\\cos A$ quand l'angle $\\widehat{A}$ est droit ?",
    explanation: exp(
      "Al-Kashi s'écrit $a^2 = b^2 + c^2 - 2bc\\cos\\widehat{A}$ : c'est Pythagore, plus un terme correctif qui dépend de l'angle.",
      "Ce terme correctif mesure de combien le triangle s'écarte du cas rectangle.",
      "Si $\\widehat{A} = 90°$, alors $\\cos\\widehat{A} = 0$ et le terme disparaît : il reste $a^2 = b^2 + c^2$, exactement Pythagore.",
      "Pythagore est donc le cas particulier d'Al-Kashi pour un angle droit — et le signe du terme correctif dit si l'angle est aigu (il retranche) ou obtus (il ajoute)."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "alkashi", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_ps_alk_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_alkashi",
    difficulty: 5,
    theme: "neutral",
    text: "Dans quelles situations la formule d'Al-Kashi est-elle l'outil adapté, et quand vaut-il mieux s'en passer ?",
    format: "open",
    expected: ["deux cotes", "deux côtés", "angle", "trois longueurs", "coordonnees", "coordonnées", "quelconque"],
    comparator: "contains_keyword",
    hint: "De quelles données a-t-on besoin pour l'appliquer ?",
    explanation: exp(
      "Al-Kashi relie les trois longueurs d'un triangle et l'un de ses angles : elle sert dès qu'on connaît trois de ces quatre quantités.",
      "Elle est l'outil adapté dans deux cas : on connaît deux côtés et l'angle entre eux et on cherche le troisième côté ; ou on connaît les trois côtés et on cherche un angle.",
      "Elle est en revanche inutile si le triangle est rectangle — Pythagore suffit et va plus vite — ou si l'on dispose des coordonnées des points : le produit scalaire par $xx' + yy'$ donne alors l'angle sans passer par les longueurs.",
      "Al-Kashi est la formule des triangles QUELCONQUES quand on n'a que des longueurs et des angles ; dès qu'il y a un repère, on lui préfère les coordonnées."
    ),
    tags: ["premiere", "maths", "produit_scalaire", "alkashi", "open"],
  },
  {
    kind: "template",
    id: "premiere_ps_alk_tpl_open",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "produit_scalaire",
    microId: "ps_alkashi",
    difficulty: 5,
    theme: "neutral",
    hint: "$a^2 = b^2 + c^2 - 2bc\\cos\\widehat{A}$ — attention au signe du cosinus si l'angle est obtus.",
    tags: ["premiere", "maths", "produit_scalaire", "alkashi", "open", "template"],
    generate: () => {
      const cas = [
        { b: 4, c: 6, deg: 60, cos: "0{,}5", a2: 28 },
        { b: 3, c: 5, deg: 60, cos: "0{,}5", a2: 19 },
        { b: 2, c: 3, deg: 120, cos: "-0{,}5", a2: 19 },
        { b: 5, c: 8, deg: 60, cos: "0{,}5", a2: 49 },
        { b: 4, c: 4, deg: 120, cos: "-0{,}5", a2: 48 },
      ];
      const c = pickOne(cas);
      return {
        text: `Dans un triangle $ABC$, on donne $b = ${c.b}$, $c = ${c.c}$ et $\\widehat{A} = ${c.deg}°$. Calcule $a^2$, et explique pourquoi Pythagore ne suffirait pas ici.`,
        format: "open",
        expected: [String(c.a2), "al-kashi", "alkashi", "cos", "pas rectangle", "correctif"],
        comparator: "contains_keyword",
        canvas: triangleCote(String(c.c), String(c.b), "a", c.deg + "°"),
        explanation: exp(
          "Al-Kashi s'applique à tout triangle : $a^2 = b^2 + c^2 - 2bc\\cos\\widehat{A}$, où le dernier terme corrige Pythagore selon l'angle.",
          `Ici $a^2 = ${c.b}^2 + ${c.c}^2 - 2 \\times ${c.b} \\times ${c.c} \\times ${c.cos}$.`,
          `$= ${c.b * c.b} + ${c.c * c.c} - ${2 * c.b * c.c} \\times ${c.cos} = ${c.a2}$.`,
          `Pythagore donnerait $${c.b * c.b + c.c * c.c}$ : il ne vaut que pour un angle droit. Ici l'angle est ${c.deg < 90 ? "aigu, et le terme correctif RETRANCHE" : "obtus, et le terme correctif AJOUTE"}.`
        ),
      };
    },
  },
];
