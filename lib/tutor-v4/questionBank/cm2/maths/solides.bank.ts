// lib/tutor-v4/question-banks/maths/cm2/solides.bank.ts
// ⭐ 15/11/2026 — les gabarits vivent dans `solides-outils.ts` (situations ×
// tournures × nombres, dessins), comme au CM1. Ici, seuls les items figés justes
// restent. Retirés : les 17 anciens gabarits (« Quel solide est représenté ? »,
// « … peut être modélisé par… »), les questions ouvertes (supprimées de toute façon
// en CM2), les oui/non à deux choix, et les 9 items « à La Réunion » / « Saint-Pierre »
// (Réunion ≤ 4 %). ⛔ Les dessins ne portent plus d'étiquette : le canvas écrivait
// « face carrée », « base triangulaire », « base circulaire » sur la figure dont on
// demandait le nom ou les faces.

import type {
  TutorBankItemV4,
  Solide3DCanvasData,
} from "@/lib/tutor-v4/types";
import { solidesGabarits } from "./solides-outils";

function solideCanvas(
  data: Omit<Solide3DCanvasData, "kind">
): Solide3DCanvasData {
  return {
    kind: "solide_3d",
    ...data,
  };
}

// ============================================================
// HELPERS CANVAS
// ============================================================

function cubeCanvas(): Solide3DCanvasData {
  return solideCanvas({
    solide: "cube",
    labels: {
      cote: "côté",
      aireBase: "face carrée",
    },
    highlight: {
      base: true,
      hauteur: false,
    },
    display: {
      showLabels: false,
      showDimensions: false,
      showFormulaHint: false,
    },
  });
}

function paveDroitCanvas(): Solide3DCanvasData {
  return solideCanvas({
    solide: "pave_droit",
    labels: {
      longueur: "longueur",
      largeur: "largeur",
      hauteur: "hauteur",
      aireBase: "face rectangulaire",
    },
    highlight: {
      base: true,
      hauteur: false,
    },
    display: {
      showLabels: false,
      showDimensions: false,
      showFormulaHint: false,
    },
  });
}

function prismeCanvas(): Solide3DCanvasData {
  return solideCanvas({
    solide: "prisme",
    labels: {
      hauteur: "hauteur",
      aireBase: "base triangulaire",
    },
    highlight: {
      base: true,
      hauteur: false,
    },
    display: {
      showLabels: false,
      showDimensions: false,
      showFormulaHint: false,
    },
  });
}

function cylindreCanvas(): Solide3DCanvasData {
  return solideCanvas({
    solide: "cylindre",
    labels: {
      rayon: "rayon",
      hauteur: "hauteur",
      aireBase: "base circulaire",
    },
    highlight: {
      base: true,
      hauteur: false,
    },
    display: {
      showLabels: false,
      showDimensions: false,
      showFormulaHint: false,
    },
  });
}

function coneCanvas(): Solide3DCanvasData {
  return solideCanvas({
    solide: "cone",
    labels: {
      rayon: "rayon",
      hauteur: "hauteur",
      aireBase: "base circulaire",
    },
    highlight: {
      base: true,
      hauteur: false,
    },
    display: {
      showLabels: false,
      showDimensions: false,
      showFormulaHint: false,
    },
  });
}

function bouleCanvas(): Solide3DCanvasData {
  return solideCanvas({
    solide: "boule",
    labels: {
      rayon: "rayon",
      diametre: "diamètre",
    },
    display: {
      showLabels: false,
      showDimensions: false,
      showFormulaHint: false,
    },
  });
}

function pyramideCanvas(): Solide3DCanvasData {
  return solideCanvas({
    solide: "pyramide",
    labels: {
      hauteur: "hauteur",
      aireBase: "base",
    },
    highlight: {
      base: true,
      hauteur: false,
    },
    display: {
      showLabels: false,
      showDimensions: false,
      showFormulaHint: false,
    },
  });
}

function assemblageCubesCanvas(): Solide3DCanvasData {
  return solideCanvas({
    solide: "assemblage_cubes",
    cubes: [
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 0, z: 0 },
      { x: 0, y: 1, z: 0 },
      { x: 1, y: 1, z: 0 },
      { x: 0, y: 0, z: 1 },
      { x: 1, y: 0, z: 1 },
    ],
    display: {
      showLabels: false,
      showDimensions: false,
      showFormulaHint: false,
    },
  });
}

// ============================================================
// BANK
// ============================================================

export const solidesBank: TutorBankItemV4[] = [
  // ============================================================
  // SOLIDE_RECONNAITRE
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_solide_reconnaitre_fixed_1_definition",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Un solide est une figure...",
    format: "qcm",
    choices: [
      "en trois dimensions",
      "uniquement tracée sur une feuille",
      "toujours plate",
      "toujours circulaire",
    ],
    expected: ["en trois dimensions"],
    comparator: "mcq_exact",
    hint: "Un solide a du volume.",
    explanation:
      "Un solide est une figure en trois dimensions. Il occupe de l’espace.",
    tags: ["cm2", "solide", "reconnaitre", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_solide_reconnaitre_fixed_2_cube",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Quel solide est représenté ?",
    format: "qcm",
    choices: ["cube", "cylindre", "boule", "cône"],
    expected: ["cube"],
    comparator: "mcq_exact",
    hint: "Toutes ses faces sont des carrés.",
    explanation:
      "Le solide représenté est un cube. Toutes ses faces sont des carrés.",
    tags: ["cm2", "solide", "reconnaitre", "cube", "qcm", "canvas"],
    canvas: cubeCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_solide_reconnaitre_fixed_3_pave_droit",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Quel solide est représenté ?",
    format: "qcm",
    choices: ["pavé droit", "boule", "cône", "pyramide"],
    expected: ["pavé droit"],
    comparator: "mcq_exact",
    hint: "Il ressemble à une boîte rectangulaire.",
    explanation:
      "Le solide représenté est un pavé droit. Il ressemble à une boîte rectangulaire.",
    tags: ["cm2", "solide", "reconnaitre", "pave_droit", "qcm", "canvas"],
    canvas: paveDroitCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_solide_reconnaitre_fixed_4_cylindre",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Quel solide est représenté ?",
    format: "qcm",
    choices: ["cylindre", "cube", "pyramide", "boule"],
    expected: ["cylindre"],
    comparator: "mcq_exact",
    hint: "Il a deux bases circulaires.",
    explanation:
      "Le solide représenté est un cylindre. Il possède deux bases circulaires.",
    tags: ["cm2", "solide", "reconnaitre", "cylindre", "qcm", "canvas"],
    canvas: cylindreCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_solide_reconnaitre_fixed_5_cone",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Quel solide est représenté ?",
    format: "qcm",
    choices: ["cône", "cylindre", "cube", "pavé droit"],
    expected: ["cône"],
    comparator: "mcq_exact",
    hint: "Il a une base circulaire et un sommet.",
    explanation:
      "Le solide représenté est un cône. Il possède une base circulaire et un sommet.",
    tags: ["cm2", "solide", "reconnaitre", "cone", "qcm", "canvas"],
    canvas: coneCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_solide_reconnaitre_fixed_6_boule",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Quel solide est représenté ?",
    format: "qcm",
    choices: ["boule", "cube", "pyramide", "pavé droit"],
    expected: ["boule"],
    comparator: "mcq_exact",
    hint: "Il est rond comme une balle.",
    explanation:
      "Le solide représenté est une boule. C’est un solide rond.",
    tags: ["cm2", "solide", "reconnaitre", "boule", "qcm", "canvas"],
    canvas: bouleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_solide_reconnaitre_fixed_7_pyramide",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Quel solide est représenté ?",
    format: "qcm",
    choices: ["pyramide", "cylindre", "boule", "pavé droit"],
    expected: ["pyramide"],
    comparator: "mcq_exact",
    hint: "Ses faces latérales sont triangulaires.",
    explanation:
      "Le solide représenté est une pyramide. Ses faces latérales se rejoignent en un sommet.",
    tags: ["cm2", "solide", "reconnaitre", "pyramide", "qcm", "canvas"],
    canvas: pyramideCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_solide_reconnaitre_fixed_8_prisme",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Quel solide est représenté ?",
    format: "qcm",
    choices: ["prisme droit", "cône", "boule", "cube"],
    expected: ["prisme droit"],
    comparator: "mcq_exact",
    hint: "Il possède deux bases identiques et parallèles.",
    explanation:
      "Le solide représenté est un prisme droit. Ici, ses bases sont triangulaires.",
    tags: ["cm2", "solide", "reconnaitre", "prisme", "qcm", "canvas"],
    canvas: prismeCanvas(),
  },
  // ============================================================
  // SOLIDE_SOMMET_ARETE_FACE
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_solide_sommet_arete_face_fixed_1_vocabulaire_face",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_sommet_arete_face",
    difficulty: 1,
    theme: "neutral",
    text: "Dans un solide, une face est...",
    format: "qcm",
    choices: [
      "une surface du solide",
      "un point du solide",
      "une ligne du solide",
      "le volume du solide",
    ],
    expected: ["une surface du solide"],
    comparator: "mcq_exact",
    hint: "Une face est une partie plate ou courbe de la surface du solide.",
    explanation:
      "Une face est une surface du solide. Par exemple, une face d’un cube est un carré.",
    tags: ["cm2", "solide", "face", "vocabulaire", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_solide_sommet_arete_face_fixed_2_vocabulaire_arete",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_sommet_arete_face",
    difficulty: 1,
    theme: "neutral",
    text: "Dans un polyèdre, une arête est...",
    format: "qcm",
    choices: [
      "le segment où deux faces se rencontrent",
      "le centre du solide",
      "une face circulaire",
      "l’intérieur du solide",
    ],
    expected: ["le segment où deux faces se rencontrent"],
    comparator: "mcq_exact",
    hint: "Une arête ressemble à un bord.",
    explanation:
      "Une arête est le segment où deux faces se rencontrent. C’est un bord du solide.",
    tags: ["cm2", "solide", "arete", "vocabulaire", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_solide_sommet_arete_face_fixed_3_vocabulaire_sommet",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_sommet_arete_face",
    difficulty: 1,
    theme: "neutral",
    text: "Dans un polyèdre, un sommet est...",
    format: "qcm",
    choices: [
      "un point où plusieurs arêtes se rejoignent",
      "une face du solide",
      "une surface courbe",
      "le nom du solide",
    ],
    expected: ["un point où plusieurs arêtes se rejoignent"],
    comparator: "mcq_exact",
    hint: "Un sommet est un point.",
    explanation:
      "Un sommet est un point où plusieurs arêtes se rejoignent.",
    tags: ["cm2", "solide", "sommet", "vocabulaire", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_solide_sommet_arete_face_fixed_4_cube_faces",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_sommet_arete_face",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de faces possède un cube ?",
    format: "qcm",
    choices: ["6", "8", "12", "4"],
    expected: ["6"],
    comparator: "mcq_exact",
    hint: "Pense aux faces d’un dé.",
    explanation:
      "Un cube possède 6 faces. Toutes ses faces sont des carrés.",
    tags: ["cm2", "solide", "cube", "faces", "qcm", "canvas"],
    canvas: cubeCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_solide_sommet_arete_face_fixed_5_cube_sommets",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_sommet_arete_face",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de sommets possède un cube ?",
    format: "qcm",
    choices: ["8", "6", "12", "4"],
    expected: ["8"],
    comparator: "mcq_exact",
    hint: "Les sommets sont les coins du cube.",
    explanation:
      "Un cube possède 8 sommets. Ce sont les 8 coins du cube.",
    tags: ["cm2", "solide", "cube", "sommets", "qcm", "canvas"],
    canvas: cubeCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_solide_sommet_arete_face_fixed_6_cube_aretes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_sommet_arete_face",
    difficulty: 2,
    theme: "neutral",
    text: "Combien d’arêtes possède un cube ?",
    format: "qcm",
    choices: ["12", "6", "8", "10"],
    expected: ["12"],
    comparator: "mcq_exact",
    hint: "Les arêtes sont les bords du cube.",
    explanation:
      "Un cube possède 12 arêtes. Ce sont les bords où les faces se rencontrent.",
    tags: ["cm2", "solide", "cube", "aretes", "qcm", "canvas"],
    canvas: cubeCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_solide_sommet_arete_face_fixed_7_pave_faces",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_sommet_arete_face",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de faces possède un pavé droit ?",
    format: "qcm",
    choices: ["6", "8", "12", "3"],
    expected: ["6"],
    comparator: "mcq_exact",
    hint: "Il a le même nombre de faces qu’un cube.",
    explanation:
      "Un pavé droit possède 6 faces. Elles sont généralement rectangulaires.",
    tags: ["cm2", "solide", "pave_droit", "faces", "qcm", "canvas"],
    canvas: paveDroitCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_solide_sommet_arete_face_fixed_8_pave_sommets",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_sommet_arete_face",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de sommets possède un pavé droit ?",
    format: "qcm",
    choices: ["8", "6", "12", "10"],
    expected: ["8"],
    comparator: "mcq_exact",
    hint: "Une boîte rectangulaire a 8 coins.",
    explanation:
      "Un pavé droit possède 8 sommets.",
    tags: ["cm2", "solide", "pave_droit", "sommets", "qcm", "canvas"],
    canvas: paveDroitCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_solide_sommet_arete_face_fixed_9_pave_aretes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_sommet_arete_face",
    difficulty: 2,
    theme: "neutral",
    text: "Combien d’arêtes possède un pavé droit ?",
    format: "qcm",
    choices: ["12", "6", "8", "14"],
    expected: ["12"],
    comparator: "mcq_exact",
    hint: "Il a le même nombre d’arêtes qu’un cube.",
    explanation:
      "Un pavé droit possède 12 arêtes.",
    tags: ["cm2", "solide", "pave_droit", "aretes", "qcm", "canvas"],
    canvas: paveDroitCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_solide_sommet_arete_face_fixed_10_cylindre_vocabulaire",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_sommet_arete_face",
    difficulty: 2,
    theme: "neutral",
    text: "Un cylindre possède...",
    format: "qcm",
    choices: [
      "deux bases circulaires et une surface courbe",
      "six faces carrées",
      "seulement des faces triangulaires",
      "huit sommets",
    ],
    expected: ["deux bases circulaires et une surface courbe"],
    comparator: "mcq_exact",
    hint: "Pense à une boîte de conserve.",
    explanation:
      "Un cylindre possède deux bases circulaires et une surface courbe.",
    tags: ["cm2", "solide", "cylindre", "faces", "qcm", "canvas"],
    canvas: cylindreCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_solide_sommet_arete_face_fixed_11_cone_vocabulaire",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_sommet_arete_face",
    difficulty: 2,
    theme: "neutral",
    text: "Un cône possède...",
    format: "qcm",
    choices: [
      "une base circulaire et un sommet",
      "deux bases circulaires",
      "six faces carrées",
      "huit sommets",
    ],
    expected: ["une base circulaire et un sommet"],
    comparator: "mcq_exact",
    hint: "Pense à un cornet.",
    explanation:
      "Un cône possède une base circulaire et un sommet.",
    tags: ["cm2", "solide", "cone", "sommet", "face", "qcm", "canvas"],
    canvas: coneCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_solide_sommet_arete_face_fixed_12_pyramide_vocabulaire",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_sommet_arete_face",
    difficulty: 3,
    theme: "neutral",
    text: "Une pyramide possède...",
    format: "qcm",
    choices: [
      "une base et des faces triangulaires qui se rejoignent en un sommet",
      "deux bases circulaires",
      "uniquement des faces courbes",
      "aucune arête",
    ],
    expected: ["une base et des faces triangulaires qui se rejoignent en un sommet"],
    comparator: "mcq_exact",
    hint: "Les faces latérales d’une pyramide sont triangulaires.",
    explanation:
      "Une pyramide possède une base. Ses faces latérales sont triangulaires et se rejoignent en un sommet.",
    tags: ["cm2", "solide", "pyramide", "faces", "sommet", "qcm", "canvas"],
    canvas: pyramideCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_solide_sommet_arete_face_fixed_13_boule_vocabulaire",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_sommet_arete_face",
    difficulty: 2,
    theme: "neutral",
    text: "Une boule possède...",
    format: "qcm",
    choices: [
      "une surface courbe",
      "six faces carrées",
      "douze arêtes",
      "deux bases circulaires",
    ],
    expected: ["une surface courbe"],
    comparator: "mcq_exact",
    hint: "Une boule est ronde.",
    explanation:
      "Une boule possède une surface courbe. Elle n’a pas de face plane, d’arête ou de sommet comme un cube.",
    tags: ["cm2", "solide", "boule", "surface_courbe", "qcm", "canvas"],
    canvas: bouleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_solide_sommet_arete_face_fixed_14_polyedre",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_sommet_arete_face",
    difficulty: 3,
    theme: "neutral",
    text: "Un polyèdre est un solide dont les faces sont...",
    format: "qcm",
    choices: [
      "des polygones",
      "des cercles uniquement",
      "toujours courbes",
      "des boules",
    ],
    expected: ["des polygones"],
    comparator: "mcq_exact",
    hint: "Cube, pavé droit et pyramide sont des polyèdres.",
    explanation:
      "Un polyèdre est un solide dont les faces sont des polygones. Le cube, le pavé droit, le prisme et la pyramide sont des polyèdres.",
    tags: ["cm2", "solide", "polyedre", "faces", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_solide_sommet_arete_face_fixed_15_non_polyedre",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_sommet_arete_face",
    difficulty: 3,
    theme: "neutral",
    text: "Quel solide n’est pas un polyèdre ?",
    format: "qcm",
    choices: ["cylindre", "cube", "pavé droit", "pyramide"],
    expected: ["cylindre"],
    comparator: "mcq_exact",
    hint: "Un cylindre a une surface courbe.",
    explanation:
      "Le cylindre n’est pas un polyèdre car il possède une surface courbe. Ses faces ne sont pas toutes des polygones.",
    tags: ["cm2", "solide", "polyedre", "non_polyedre", "qcm", "canvas"],
    canvas: cylindreCanvas(),
  },
    // ============================================================
  // SOLIDE_FACE
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_solide_face_fixed_1_cube_faces_carrees",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_face",
    difficulty: 1,
    theme: "neutral",
    text: "Les faces d’un cube sont...",
    format: "qcm",
    choices: [
      "des carrés",
      "des triangles",
      "des cercles",
      "des rectangles tous différents",
    ],
    expected: ["des carrés"],
    comparator: "mcq_exact",
    hint: "Pense aux faces d’un dé.",
    explanation:
      "Les faces d’un cube sont toutes des carrés.",
    tags: ["cm2", "solide", "face", "cube", "carre", "qcm", "canvas"],
    canvas: cubeCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_solide_face_fixed_2_pave_faces_rectangles",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_face",
    difficulty: 1,
    theme: "neutral",
    text: "Les faces d’un pavé droit sont généralement...",
    format: "qcm",
    choices: [
      "des rectangles",
      "des cercles",
      "des triangles uniquement",
      "des disques",
    ],
    expected: ["des rectangles"],
    comparator: "mcq_exact",
    hint: "Pense à une boîte à chaussures.",
    explanation:
      "Un pavé droit possède des faces rectangulaires. Un cube est un cas particulier de pavé droit.",
    tags: ["cm2", "solide", "face", "pave_droit", "rectangle", "qcm", "canvas"],
    canvas: paveDroitCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_solide_face_fixed_3_prisme_faces",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_face",
    difficulty: 2,
    theme: "neutral",
    text: "Le prisme droit représenté possède deux bases...",
    format: "qcm",
    choices: [
      "triangulaires",
      "circulaires",
      "carrées uniquement",
      "courbes",
    ],
    expected: ["triangulaires"],
    comparator: "mcq_exact",
    hint: "Observe les deux faces identiques.",
    explanation:
      "Le prisme droit représenté possède deux bases triangulaires identiques et parallèles.",
    tags: ["cm2", "solide", "face", "prisme", "triangle", "qcm", "canvas"],
    canvas: prismeCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_solide_face_fixed_4_cylindre_bases",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_face",
    difficulty: 2,
    theme: "neutral",
    text: "Les bases d’un cylindre sont...",
    format: "qcm",
    choices: [
      "des disques",
      "des carrés",
      "des triangles",
      "des rectangles uniquement",
    ],
    expected: ["des disques"],
    comparator: "mcq_exact",
    hint: "Pense à une boîte de conserve.",
    explanation:
      "Un cylindre possède deux bases en forme de disque.",
    tags: ["cm2", "solide", "face", "cylindre", "disque", "qcm", "canvas"],
    canvas: cylindreCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_solide_face_fixed_5_cone_base",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_face",
    difficulty: 2,
    theme: "neutral",
    text: "La base d’un cône est...",
    format: "qcm",
    choices: [
      "un disque",
      "un carré",
      "un rectangle",
      "un triangle",
    ],
    expected: ["un disque"],
    comparator: "mcq_exact",
    hint: "Pense à la base d’un cornet.",
    explanation:
      "La base d’un cône est un disque. Le cône possède aussi une surface courbe.",
    tags: ["cm2", "solide", "face", "cone", "disque", "qcm", "canvas"],
    canvas: coneCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_solide_face_fixed_6_pyramide_faces_laterales",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_face",
    difficulty: 2,
    theme: "neutral",
    text: "Les faces latérales d’une pyramide sont...",
    format: "qcm",
    choices: [
      "des triangles",
      "des disques",
      "des surfaces courbes",
      "des rectangles uniquement",
    ],
    expected: ["des triangles"],
    comparator: "mcq_exact",
    hint: "Elles se rejoignent au sommet de la pyramide.",
    explanation:
      "Les faces latérales d’une pyramide sont des triangles qui se rejoignent en un sommet.",
    tags: ["cm2", "solide", "face", "pyramide", "triangle", "qcm", "canvas"],
    canvas: pyramideCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_solide_face_fixed_7_boule_surface",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_face",
    difficulty: 2,
    theme: "neutral",
    text: "Une boule possède...",
    format: "qcm",
    choices: [
      "une surface courbe",
      "six faces carrées",
      "deux bases circulaires",
      "une base triangulaire",
    ],
    expected: ["une surface courbe"],
    comparator: "mcq_exact",
    hint: "Une boule n’a pas de face plane comme un cube.",
    explanation:
      "Une boule possède une surface courbe. Elle n’a pas de face plane, d’arête ou de sommet comme un polyèdre.",
    tags: ["cm2", "solide", "face", "boule", "surface_courbe", "qcm", "canvas"],
    canvas: bouleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_solide_face_fixed_8_faces_planes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_face",
    difficulty: 3,
    theme: "neutral",
    text: "Quel solide possède uniquement des faces planes ?",
    format: "qcm",
    choices: [
      "cube",
      "cylindre",
      "cône",
      "boule",
    ],
    expected: ["cube"],
    comparator: "mcq_exact",
    hint: "Un solide avec uniquement des faces planes est un polyèdre.",
    explanation:
      "Le cube possède uniquement des faces planes. Le cylindre, le cône et la boule ont une surface courbe.",
    tags: ["cm2", "solide", "face", "faces_planes", "polyedre", "qcm", "canvas"],
    canvas: cubeCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_solide_face_fixed_9_surface_courbe",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_face",
    difficulty: 3,
    theme: "neutral",
    text: "Quel solide possède une surface courbe ?",
    format: "qcm",
    choices: [
      "cylindre",
      "cube",
      "pavé droit",
      "pyramide",
    ],
    expected: ["cylindre"],
    comparator: "mcq_exact",
    hint: "Pense à une boîte de conserve.",
    explanation:
      "Le cylindre possède une surface courbe et deux bases en forme de disque.",
    tags: ["cm2", "solide", "face", "surface_courbe", "cylindre", "qcm", "canvas"],
    canvas: cylindreCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_solide_face_fixed_10_faces_carre_cube",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_face",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de faces carrées possède un cube ?",
    format: "qcm",
    choices: ["6", "4", "8", "12"],
    expected: ["6"],
    comparator: "mcq_exact",
    hint: "Toutes les faces du cube sont carrées.",
    explanation:
      "Un cube possède 6 faces, et toutes ces faces sont des carrés.",
    tags: ["cm2", "solide", "face", "cube", "carre", "qcm", "canvas"],
    canvas: cubeCanvas(),
  },
    // ============================================================
  // SOLIDE_PATRON
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_solide_patron_fixed_1_definition",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_patron",
    difficulty: 1,
    theme: "neutral",
    text: "Un patron de solide est...",
    format: "qcm",
    choices: [
      "une figure plane que l’on peut plier pour former un solide",
      "une figure impossible à plier",
      "le volume d’un solide",
      "la masse d’un solide",
    ],
    expected: ["une figure plane que l’on peut plier pour former un solide"],
    comparator: "mcq_exact",
    hint: "Un patron est à plat avant le pliage.",
    explanation:
      "Un patron est une figure plane. Si on la découpe et qu’on la plie correctement, on obtient un solide.",
    tags: ["cm2", "solide", "patron", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_solide_patron_fixed_2_cube_faces",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_patron",
    difficulty: 2,
    theme: "neutral",
    text: "Un patron de cube doit contenir...",
    format: "qcm",
    choices: [
      "6 carrés",
      "4 triangles",
      "2 disques",
      "1 seul rectangle",
    ],
    expected: ["6 carrés"],
    comparator: "mcq_exact",
    hint: "Un cube a 6 faces carrées.",
    explanation:
      "Un cube possède 6 faces carrées. Son patron doit donc contenir 6 carrés.",
    tags: ["cm2", "solide", "patron", "cube", "faces", "qcm", "canvas"],
    canvas: cubeCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_solide_patron_fixed_3_pave_faces",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_patron",
    difficulty: 2,
    theme: "neutral",
    text: "Un patron de pavé droit contient généralement...",
    format: "qcm",
    choices: [
      "6 rectangles",
      "6 disques",
      "4 triangles seulement",
      "une seule face",
    ],
    expected: ["6 rectangles"],
    comparator: "mcq_exact",
    hint: "Un pavé droit a 6 faces rectangulaires.",
    explanation:
      "Un pavé droit possède 6 faces. Dans un patron simple, on retrouve généralement 6 rectangles.",
    tags: ["cm2", "solide", "patron", "pave_droit", "rectangle", "qcm", "canvas"],
    canvas: paveDroitCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_solide_patron_fixed_4_cylindre",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_patron",
    difficulty: 3,
    theme: "neutral",
    text: "Un patron de cylindre contient...",
    format: "qcm",
    choices: [
      "2 disques et 1 rectangle",
      "6 carrés",
      "4 triangles",
      "1 seul disque",
    ],
    expected: ["2 disques et 1 rectangle"],
    comparator: "mcq_exact",
    hint: "Le rectangle forme la surface courbe quand il est enroulé.",
    explanation:
      "Un patron de cylindre contient deux disques pour les bases et un rectangle qui s’enroule pour former la surface courbe.",
    tags: ["cm2", "solide", "patron", "cylindre", "disques", "rectangle", "qcm", "canvas"],
    canvas: cylindreCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_solide_patron_fixed_5_cone",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_patron",
    difficulty: 3,
    theme: "neutral",
    text: "Un patron de cône contient généralement...",
    format: "qcm",
    choices: [
      "1 disque et une partie de disque",
      "6 carrés",
      "2 disques et 1 rectangle",
      "8 triangles",
    ],
    expected: ["1 disque et une partie de disque"],
    comparator: "mcq_exact",
    hint: "Le disque est la base du cône.",
    explanation:
      "Un patron de cône contient un disque pour la base et une partie de disque pour la surface latérale.",
    tags: ["cm2", "solide", "patron", "cone", "disque", "qcm", "canvas"],
    canvas: coneCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_solide_patron_fixed_6_pyramide",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_patron",
    difficulty: 3,
    theme: "neutral",
    text: "Un patron de pyramide à base carrée contient...",
    format: "qcm",
    choices: [
      "1 carré et 4 triangles",
      "6 carrés",
      "2 disques",
      "1 rectangle et 2 disques",
    ],
    expected: ["1 carré et 4 triangles"],
    comparator: "mcq_exact",
    hint: "La base est carrée et les faces latérales sont triangulaires.",
    explanation:
      "Une pyramide à base carrée a une base carrée et 4 faces latérales triangulaires. Son patron contient donc 1 carré et 4 triangles.",
    tags: ["cm2", "solide", "patron", "pyramide", "carre", "triangle", "qcm", "canvas"],
    canvas: pyramideCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_solide_patron_fixed_7_prisme_triangular",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_patron",
    difficulty: 3,
    theme: "neutral",
    text: "Un patron de prisme droit à base triangulaire contient...",
    format: "qcm",
    choices: [
      "2 triangles et 3 rectangles",
      "6 carrés",
      "2 disques et 1 rectangle",
      "1 disque et 1 triangle",
    ],
    expected: ["2 triangles et 3 rectangles"],
    comparator: "mcq_exact",
    hint: "Il a deux bases triangulaires.",
    explanation:
      "Un prisme droit à base triangulaire possède 2 bases triangulaires et 3 faces latérales rectangulaires.",
    tags: ["cm2", "solide", "patron", "prisme", "triangle", "rectangle", "qcm", "canvas"],
    canvas: prismeCanvas(),
  },
    // ============================================================
  // SOLIDE_DEFI
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_solide_defi_fixed_3_compter_cubes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Combien de cubes unités composent cet assemblage ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Compte les petits cubes un par un.",
    explanation:
      "L’assemblage est composé de 6 cubes unités.",
    tags: ["cm2", "solide", "defi", "assemblage_cubes", "short", "canvas"],
    canvas: assemblageCubesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_solide_defi_fixed_6_erreur_cone_cylindre",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève confond un cône et un cylindre. Quel indice permet de reconnaître le cône ?",
    format: "qcm",
    choices: [
      "il possède un sommet",
      "il possède deux bases circulaires",
      "il possède six faces carrées",
      "il n’a aucune surface courbe",
    ],
    expected: ["il possède un sommet"],
    comparator: "mcq_exact",
    hint: "Le cône se termine en pointe.",
    explanation:
      "Le cône possède une base circulaire et un sommet. Le cylindre, lui, possède deux bases circulaires.",
    tags: ["cm2", "solide", "defi", "cone", "cylindre", "qcm", "canvas"],
    canvas: coneCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_solide_defi_fixed_7_pyramide_cone",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle différence importante y a-t-il entre une pyramide et un cône ?",
    format: "qcm",
    choices: [
      "la pyramide a des faces latérales triangulaires, le cône a une surface courbe",
      "la pyramide est toujours ronde",
      "le cône a 6 faces carrées",
      "la pyramide n’a jamais de sommet",
    ],
    expected: [
      "la pyramide a des faces latérales triangulaires, le cône a une surface courbe",
    ],
    comparator: "mcq_exact",
    hint: "Observe les faces latérales.",
    explanation:
      "Une pyramide possède des faces latérales triangulaires. Un cône possède une surface latérale courbe.",
    tags: ["cm2", "solide", "defi", "pyramide", "cone", "qcm"],
    canvas: pyramideCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_solide_defi_fixed_8_cube_pave",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle affirmation est vraie ?",
    format: "qcm",
    choices: [
      "un cube est un pavé droit particulier",
      "un pavé droit est toujours une boule",
      "un cube possède des bases circulaires",
      "un pavé droit n’a aucune arête",
    ],
    expected: ["un cube est un pavé droit particulier"],
    comparator: "mcq_exact",
    hint: "Le cube est un pavé droit avec toutes les faces carrées.",
    explanation:
      "Un cube est un pavé droit particulier : ses faces sont toutes carrées.",
    tags: ["cm2", "solide", "defi", "cube", "pave_droit", "qcm"],
    canvas: cubeCanvas(),
  },

  ...solidesGabarits,
];
