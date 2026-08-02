// lib/tutor-v4/question-banks/maths/cm2/solides.bank.ts

import type {
  TutorBankItemV4,
  Solide3DCanvasData,
} from "@/lib/tutor-v4/types";

function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: readonly T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  // Jamais deux fois la même ligne. Un gabarit dont le piège coïncide avec la
  // bonne réponse (les coordonnées inversées quand x = y, un arrondi égal à la
  // valeur de départ…) affichait la même proposition deux fois, et l'élève
  // voyait deux réponses justes. Dédupliquer AVANT de couper à quatre laisse
  // aussi une chance aux distracteurs surnuméraires de prendre la place.
  return shuffle(Array.from(new Set([correct, ...wrongs]))).slice(0, 4);
}
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
      showLabels: true,
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
      showLabels: true,
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
      showLabels: true,
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
      showLabels: true,
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
      showLabels: true,
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
      showLabels: true,
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
      showLabels: true,
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
      showLabels: true,
      showDimensions: false,
      showFormulaHint: false,
    },
  });
}

const solidesUsuels = [
  {
    name: "cube",
    canvas: cubeCanvas,
    explanation:
      "Un cube est un solide dont toutes les faces sont des carrés.",
    wrongs: ["pavé droit", "cylindre", "boule"],
  },
  {
    name: "pavé droit",
    canvas: paveDroitCanvas,
    explanation:
      "Un pavé droit est un solide avec des faces rectangulaires. Une boîte à chaussures peut être modélisée par un pavé droit.",
    wrongs: ["cube", "cône", "boule"],
  },
  {
    name: "prisme droit",
    canvas: prismeCanvas,
    explanation:
      "Un prisme droit possède deux bases identiques et parallèles. Ici, les bases sont triangulaires.",
    wrongs: ["cylindre", "boule", "cube"],
  },
  {
    name: "cylindre",
    canvas: cylindreCanvas,
    explanation:
      "Un cylindre possède deux bases circulaires et une surface courbe.",
    wrongs: ["cube", "pyramide", "boule"],
  },
  {
    name: "cône",
    canvas: coneCanvas,
    explanation:
      "Un cône possède une base circulaire et un sommet.",
    wrongs: ["cylindre", "cube", "pavé droit"],
  },
  {
    name: "boule",
    canvas: bouleCanvas,
    explanation:
      "Une boule est un solide rond, comme une balle.",
    wrongs: ["cube", "cylindre", "pyramide"],
  },
  {
    name: "pyramide",
    canvas: pyramideCanvas,
    explanation:
      "Une pyramide possède une base et des faces triangulaires qui se rejoignent en un sommet.",
    wrongs: ["cylindre", "boule", "pavé droit"],
  },
] as const;

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

  {
    kind: "fixed",
    id: "cm2_solide_reconnaitre_fixed_9_objet_cube",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Un dé classique peut être modélisé par...",
    format: "qcm",
    choices: ["un cube", "un cylindre", "un cône", "une boule"],
    expected: ["un cube"],
    comparator: "mcq_exact",
    hint: "Un dé a souvent six faces carrées.",
    explanation:
      "Un dé classique peut être modélisé par un cube, car ses faces sont carrées.",
    tags: ["cm2", "solide", "reconnaitre", "objet", "cube", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_solide_reconnaitre_fixed_10_objet_pave",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Une boîte à chaussures peut être modélisée par...",
    format: "qcm",
    choices: ["un pavé droit", "une boule", "un cône", "un cylindre"],
    expected: ["un pavé droit"],
    comparator: "mcq_exact",
    hint: "Elle ressemble à une boîte rectangulaire.",
    explanation:
      "Une boîte à chaussures peut être modélisée par un pavé droit.",
    tags: ["cm2", "solide", "reconnaitre", "objet", "pave_droit", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_solide_reconnaitre_fixed_11_objet_cylindre",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Une boîte de conserve peut être modélisée par...",
    format: "qcm",
    choices: ["un cylindre", "un cube", "une pyramide", "une boule"],
    expected: ["un cylindre"],
    comparator: "mcq_exact",
    hint: "Elle a deux bases circulaires.",
    explanation:
      "Une boîte de conserve peut être modélisée par un cylindre.",
    tags: ["cm2", "solide", "reconnaitre", "objet", "cylindre", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_solide_reconnaitre_fixed_12_objet_cone",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Un cornet de glace peut être modélisé par...",
    format: "qcm",
    choices: ["un cône", "un cube", "un pavé droit", "une pyramide"],
    expected: ["un cône"],
    comparator: "mcq_exact",
    hint: "Il a une base circulaire et un sommet.",
    explanation:
      "Un cornet de glace peut être modélisé par un cône.",
    tags: ["cm2", "solide", "reconnaitre", "objet", "cone", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_solide_reconnaitre_fixed_13_objet_boule",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Une balle peut être modélisée par...",
    format: "qcm",
    choices: ["une boule", "un cube", "un cylindre", "un prisme droit"],
    expected: ["une boule"],
    comparator: "mcq_exact",
    hint: "Elle est ronde dans toutes les directions.",
    explanation:
      "Une balle peut être modélisée par une boule.",
    tags: ["cm2", "solide", "reconnaitre", "objet", "boule", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_solide_reconnaitre_fixed_14_reunion_citerne",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_reconnaitre",
    difficulty: 2,
    theme: "reunion",
    text: "Une citerne ronde d’eau de pluie à La Réunion peut souvent être modélisée par...",
    format: "qcm",
    choices: ["un cylindre", "un cube", "une pyramide", "une boule"],
    expected: ["un cylindre"],
    comparator: "mcq_exact",
    hint: "Elle a souvent deux bases circulaires.",
    explanation:
      "Une citerne ronde peut être modélisée par un cylindre.",
    tags: ["cm2", "solide", "reconnaitre", "reunion", "cylindre", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_solide_reconnaitre_fixed_15_reunion_ballons",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_reconnaitre",
    difficulty: 2,
    theme: "reunion",
    text: "Un ballon utilisé sur la plage de Saint-Pierre peut être modélisé par...",
    format: "qcm",
    choices: ["une boule", "un pavé droit", "un cône", "une pyramide"],
    expected: ["une boule"],
    comparator: "mcq_exact",
    hint: "Un ballon est rond.",
    explanation:
      "Un ballon peut être modélisé par une boule.",
    tags: ["cm2", "solide", "reconnaitre", "reunion", "boule", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_solide_reconnaitre_fixed_16_open",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_reconnaitre",
    difficulty: 4,
    theme: "neutral",
    text: "Explique avec tes mots ce qu’est un solide.",
    format: "open",
    expected: ["3", "dimensions", "volume", "espace"],
    comparator: "contains_keyword",
    hint: "Un solide n’est pas une figure plate.",
    explanation:
      "Un solide est une figure en trois dimensions. Il occupe de l’espace et possède un volume.",
    tags: ["cm2", "solide", "reconnaitre", "open", "definition"],
  },

  {
    kind: "fixed",
    id: "cm2_solide_reconnaitre_fixed_17_open_exemples",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_reconnaitre",
    difficulty: 4,
    theme: "neutral",
    text: "Donne deux exemples de solides usuels.",
    format: "open",
    expected: ["cube", "pavé", "cylindre", "cône", "boule", "pyramide", "prisme"],
    comparator: "contains_keyword",
    hint: "Pense aux solides vus dans les exercices.",
    explanation:
      "On peut citer par exemple : cube, pavé droit, cylindre, cône, boule, pyramide ou prisme droit.",
    tags: ["cm2", "solide", "reconnaitre", "open", "exemples"],
  },

  
{
  kind: "template",
  id: "cm2_solide_reconnaitre_tpl_1_nom_canvas",
  niveau: "cm2",
  matiere: "maths",
  notionId: "solide",
  microId: "solide_reconnaitre",
  difficulty: 2,
  theme: "neutral",
  hint: "Observe la forme générale du solide.",
  tags: ["cm2", "solide", "reconnaitre", "template", "qcm", "canvas"],
  generate: () => {
    const item = randomChoice(solidesUsuels);

    return {
      text: "Quel solide est représenté ?",
      format: "qcm",
      choices: makeChoices(item.name, item.wrongs),
      expected: [item.name],
      comparator: "mcq_exact",
      explanation: item.explanation,
      canvas: item.canvas(),
    };
  },
},

  {
    kind: "template",
    id: "cm2_solide_reconnaitre_tpl_2_objet",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Associe l’objet à sa forme géométrique.",
    tags: ["cm2", "solide", "reconnaitre", "objet", "template", "qcm"],
    generate: () => {
      const item = randomChoice([
        {
          objet: "un dé classique",
          correct: "un cube",
          explanation:
            "Un dé classique peut être modélisé par un cube.",
        },
        {
          objet: "une boîte à chaussures",
          correct: "un pavé droit",
          explanation:
            "Une boîte à chaussures peut être modélisée par un pavé droit.",
        },
        {
          objet: "une boîte de conserve",
          correct: "un cylindre",
          explanation:
            "Une boîte de conserve peut être modélisée par un cylindre.",
        },
        {
          objet: "un cornet de glace",
          correct: "un cône",
          explanation:
            "Un cornet de glace peut être modélisé par un cône.",
        },
        {
          objet: "une balle",
          correct: "une boule",
          explanation:
            "Une balle peut être modélisée par une boule.",
        },
      ]);

      return {
        text: `${item.objet} peut être modélisé par...`,
        format: "qcm",
        choices: makeChoices(item.correct, [
          "un cube",
          "un pavé droit",
          "un cylindre",
          "un cône",
          "une boule",
          "une pyramide",
        ]),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation: item.explanation,
      };
    },
  },

  {
    kind: "template",
    id: "cm2_solide_reconnaitre_tpl_3_propriete",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche le solide qui correspond à la description.",
    tags: ["cm2", "solide", "reconnaitre", "description", "template", "qcm"],
    generate: () => {
      const item = randomChoice([
        {
          description: "toutes ses faces sont des carrés",
          correct: "cube",
          explanation:
            "Un cube possède uniquement des faces carrées.",
        },
        {
          description: "il a deux bases circulaires",
          correct: "cylindre",
          explanation:
            "Un cylindre possède deux bases circulaires.",
        },
        {
          description: "il a une base circulaire et un sommet",
          correct: "cône",
          explanation:
            "Un cône possède une base circulaire et un sommet.",
        },
        {
          description: "il est rond comme une balle",
          correct: "boule",
          explanation:
            "Une boule est un solide rond.",
        },
        {
          description: "ses faces latérales sont triangulaires et se rejoignent en un sommet",
          correct: "pyramide",
          explanation:
            "Une pyramide possède des faces latérales triangulaires qui se rejoignent en un sommet.",
        },
      ]);

      return {
        text: `Quel solide correspond à cette description : ${item.description} ?`,
        format: "qcm",
        choices: makeChoices(item.correct, [
          "cube",
          "pavé droit",
          "cylindre",
          "cône",
          "boule",
          "pyramide",
        ]),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation: item.explanation,
      };
    },
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

  {
    kind: "fixed",
    id: "cm2_solide_sommet_arete_face_fixed_16_open_vocabulaire",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_sommet_arete_face",
    difficulty: 4,
    theme: "neutral",
    text: "Explique la différence entre une face, une arête et un sommet.",
    format: "open",
    expected: ["face", "surface", "arête", "bord", "sommet", "point"],
    comparator: "contains_keyword",
    hint: "Face = surface, arête = bord, sommet = point.",
    explanation:
      "Une face est une surface du solide. Une arête est un bord où deux faces se rencontrent. Un sommet est un point où plusieurs arêtes se rejoignent.",
    tags: ["cm2", "solide", "vocabulaire", "face", "arete", "sommet", "open"],
  },

  {
    kind: "fixed",
    id: "cm2_solide_sommet_arete_face_fixed_17_open_cube",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_sommet_arete_face",
    difficulty: 4,
    theme: "neutral",
    text: "Décris un cube en utilisant les mots face, arête et sommet.",
    format: "open",
    expected: ["6", "faces", "12", "arêtes", "8", "sommets"],
    comparator: "contains_keyword",
    hint: "Un cube a 6 faces, 12 arêtes et 8 sommets.",
    explanation:
      "Un cube possède 6 faces carrées, 12 arêtes et 8 sommets.",
    tags: ["cm2", "solide", "cube", "description", "open"],
    canvas: cubeCanvas(),
  },

  {
    kind: "template",
    id: "cm2_solide_sommet_arete_face_tpl_1_cube_pave",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_sommet_arete_face",
    difficulty: 2,
    theme: "neutral",
    hint: "Cube et pavé droit ont les mêmes nombres de faces, sommets et arêtes.",
    tags: ["cm2", "solide", "cube", "pave_droit", "template", "qcm", "canvas"],
    generate: () => {
      const solide = randomChoice([
        {
          nom: "cube",
          canvas: cubeCanvas,
        },
        {
          nom: "pavé droit",
          canvas: paveDroitCanvas,
        },
      ]);

      const question = randomChoice([
        {
          mot: "faces",
          correct: "6",
          explanation: `Un ${solide.nom} possède 6 faces.`,
        },
        {
          mot: "sommets",
          correct: "8",
          explanation: `Un ${solide.nom} possède 8 sommets.`,
        },
        {
          mot: "arêtes",
          correct: "12",
          explanation: `Un ${solide.nom} possède 12 arêtes.`,
        },
      ]);

      return {
        text: `Combien de ${question.mot} possède un ${solide.nom} ?`,
        format: "qcm",
        choices: makeChoices(question.correct, ["4", "6", "8", "10", "12"]),
        expected: [question.correct],
        comparator: "mcq_exact",
        explanation: question.explanation,
        canvas: solide.canvas(),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_solide_sommet_arete_face_tpl_2_vocabulaire",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_sommet_arete_face",
    difficulty: 3,
    theme: "neutral",
    hint: "Associe le mot à sa définition.",
    tags: ["cm2", "solide", "vocabulaire", "template", "qcm"],
    generate: () => {
      const item = randomChoice([
        {
          mot: "face",
          correct: "une surface du solide",
          explanation:
            "Une face est une surface du solide.",
        },
        {
          mot: "arête",
          correct: "un bord où deux faces se rencontrent",
          explanation:
            "Une arête est un bord où deux faces se rencontrent.",
        },
        {
          mot: "sommet",
          correct: "un point où plusieurs arêtes se rejoignent",
          explanation:
            "Un sommet est un point où plusieurs arêtes se rejoignent.",
        },
      ]);

      return {
        text: `Dans un solide, que désigne le mot “${item.mot}” ?`,
        format: "qcm",
        choices: makeChoices(item.correct, [
          "une surface du solide",
          "un bord où deux faces se rencontrent",
          "un point où plusieurs arêtes se rejoignent",
          "le volume du solide",
          "la couleur du solide",
        ]),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation: item.explanation,
      };
    },
  },

  {
    kind: "template",
    id: "cm2_solide_sommet_arete_face_tpl_3_solide_description",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_sommet_arete_face",
    difficulty: 3,
    theme: "neutral",
    hint: "Lis bien les indices.",
    tags: ["cm2", "solide", "description", "template", "qcm", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          text: "Il possède deux bases circulaires et une surface courbe.",
          correct: "cylindre",
          explanation:
            "Un cylindre possède deux bases circulaires et une surface courbe.",
          canvas: cylindreCanvas,
        },
        {
          text: "Il possède une base circulaire et un sommet.",
          correct: "cône",
          explanation:
            "Un cône possède une base circulaire et un sommet.",
          canvas: coneCanvas,
        },
        {
          text: "Il possède une base et des faces triangulaires qui se rejoignent en un sommet.",
          correct: "pyramide",
          explanation:
            "Une pyramide possède une base et des faces triangulaires qui se rejoignent en un sommet.",
          canvas: pyramideCanvas,
        },
        {
          text: "Il est rond comme une balle.",
          correct: "boule",
          explanation:
            "Une boule est un solide rond.",
          canvas: bouleCanvas,
        },
      ]);

      return {
        text: `Quel solide correspond à cette description ? ${item.text}`,
        format: "qcm",
        choices: makeChoices(item.correct, [
          "cube",
          "pavé droit",
          "cylindre",
          "cône",
          "boule",
          "pyramide",
        ]),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation: item.explanation,
        canvas: item.canvas(),
      };
    },
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

  {
    kind: "fixed",
    id: "cm2_solide_face_fixed_11_erreur_cube_rectangle",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_face",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : “Un cube a des faces triangulaires.” A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Les faces d’un cube sont des carrés.",
    explanation:
      "Non. Un cube a 6 faces carrées, pas des faces triangulaires.",
    tags: ["cm2", "solide", "face", "erreur", "cube", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_solide_face_fixed_12_erreur_cylindre",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_face",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : “Un cylindre possède uniquement des faces rectangulaires.” A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Un cylindre a des bases circulaires et une surface courbe.",
    explanation:
      "Non. Un cylindre possède deux bases en forme de disque et une surface courbe.",
    tags: ["cm2", "solide", "face", "erreur", "cylindre", "qcm", "canvas"],
    canvas: cylindreCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_solide_face_fixed_13_reunion_boite_ananas",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_face",
    difficulty: 2,
    theme: "reunion",
    text: "Une boîte de conserve d’ananas Victoria a la forme d’un cylindre. Ses bases sont...",
    format: "qcm",
    choices: [
      "des disques",
      "des triangles",
      "des carrés",
      "des losanges",
    ],
    expected: ["des disques"],
    comparator: "mcq_exact",
    hint: "Une boîte de conserve est cylindrique.",
    explanation:
      "Une boîte de conserve peut être modélisée par un cylindre. Les bases d’un cylindre sont des disques.",
    tags: ["cm2", "solide", "face", "reunion", "cylindre", "disque", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_solide_face_fixed_14_reunion_de",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_face",
    difficulty: 2,
    theme: "reunion",
    text: "Dans un jeu de société à La Réunion, un dé a la forme d’un cube. Ses faces sont...",
    format: "qcm",
    choices: [
      "des carrés",
      "des triangles",
      "des disques",
      "des surfaces courbes",
    ],
    expected: ["des carrés"],
    comparator: "mcq_exact",
    hint: "Un dé classique est modélisé par un cube.",
    explanation:
      "Un dé classique peut être modélisé par un cube. Les faces d’un cube sont des carrés.",
    tags: ["cm2", "solide", "face", "reunion", "cube", "carre", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_solide_face_fixed_15_open_nature_faces",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_face",
    difficulty: 4,
    theme: "neutral",
    text: "Explique la nature des faces d’un cube.",
    format: "open",
    expected: ["6", "faces", "carrés", "carrées"],
    comparator: "contains_keyword",
    hint: "Toutes les faces du cube ont la même forme.",
    explanation:
      "Un cube possède 6 faces. Toutes ses faces sont des carrés.",
    tags: ["cm2", "solide", "face", "cube", "open"],
    canvas: cubeCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_solide_face_fixed_16_open_cylindre",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_face",
    difficulty: 4,
    theme: "neutral",
    text: "Décris les faces ou surfaces d’un cylindre.",
    format: "open",
    expected: ["deux", "bases", "disques", "circulaires", "surface", "courbe"],
    comparator: "contains_keyword",
    hint: "Pense aux deux bases et au côté courbe.",
    explanation:
      "Un cylindre possède deux bases circulaires, en forme de disque, et une surface courbe.",
    tags: ["cm2", "solide", "face", "cylindre", "open"],
    canvas: cylindreCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_solide_face_fixed_17_open_pyramide",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_face",
    difficulty: 4,
    theme: "neutral",
    text: "Décris les faces d’une pyramide.",
    format: "open",
    expected: ["base", "faces", "triangulaires", "triangles", "sommet"],
    comparator: "contains_keyword",
    hint: "Les faces latérales se rejoignent en un sommet.",
    explanation:
      "Une pyramide possède une base. Ses faces latérales sont des triangles qui se rejoignent en un sommet.",
    tags: ["cm2", "solide", "face", "pyramide", "open"],
    canvas: pyramideCanvas(),
  },

  {
    kind: "template",
    id: "cm2_solide_face_tpl_1_nature_face",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_face",
    difficulty: 2,
    theme: "neutral",
    hint: "Associe le solide à la forme de ses faces ou bases.",
    tags: ["cm2", "solide", "face", "nature", "template", "qcm", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          solide: "cube",
          question: "Quelle est la forme des faces d’un cube ?",
          correct: "des carrés",
          wrongs: ["des triangles", "des disques", "des surfaces courbes"],
          explanation:
            "Les faces d’un cube sont des carrés.",
          canvas: cubeCanvas,
        },
        {
          solide: "pavé droit",
          question: "Quelle est généralement la forme des faces d’un pavé droit ?",
          correct: "des rectangles",
          wrongs: ["des disques", "des triangles uniquement", "des surfaces courbes"],
          explanation:
            "Les faces d’un pavé droit sont généralement rectangulaires.",
          canvas: paveDroitCanvas,
        },
        {
          solide: "cylindre",
          question: "Quelle est la forme des bases d’un cylindre ?",
          correct: "des disques",
          wrongs: ["des carrés", "des triangles", "des rectangles uniquement"],
          explanation:
            "Les bases d’un cylindre sont des disques.",
          canvas: cylindreCanvas,
        },
        {
          solide: "cône",
          question: "Quelle est la forme de la base d’un cône ?",
          correct: "un disque",
          wrongs: ["un carré", "un triangle", "un rectangle"],
          explanation:
            "La base d’un cône est un disque.",
          canvas: coneCanvas,
        },
        {
          solide: "pyramide",
          question: "Quelle est la forme des faces latérales d’une pyramide ?",
          correct: "des triangles",
          wrongs: ["des disques", "des surfaces courbes", "des carrés uniquement"],
          explanation:
            "Les faces latérales d’une pyramide sont des triangles.",
          canvas: pyramideCanvas,
        },
      ]);

      return {
        text: item.question,
        format: "qcm",
        choices: makeChoices(item.correct, item.wrongs),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation: item.explanation,
        canvas: item.canvas(),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_solide_face_tpl_2_solide_depuis_faces",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_face",
    difficulty: 3,
    theme: "neutral",
    hint: "Lis la description des faces.",
    tags: ["cm2", "solide", "face", "description", "template", "qcm", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          description: "il possède 6 faces carrées",
          correct: "cube",
          explanation:
            "Un cube possède 6 faces carrées.",
          canvas: cubeCanvas,
        },
        {
          description: "il possède deux bases circulaires et une surface courbe",
          correct: "cylindre",
          explanation:
            "Un cylindre possède deux bases circulaires et une surface courbe.",
          canvas: cylindreCanvas,
        },
        {
          description: "il possède une base circulaire et une surface courbe qui rejoint un sommet",
          correct: "cône",
          explanation:
            "Un cône possède une base circulaire et un sommet.",
          canvas: coneCanvas,
        },
        {
          description: "il possède des faces latérales triangulaires qui se rejoignent en un sommet",
          correct: "pyramide",
          explanation:
            "Une pyramide possède des faces latérales triangulaires.",
          canvas: pyramideCanvas,
        },
        {
          description: "il est formé d’une surface courbe ronde, sans face plane",
          correct: "boule",
          explanation:
            "Une boule possède une surface courbe et n’a pas de face plane.",
          canvas: bouleCanvas,
        },
      ]);

      return {
        text: `Quel solide correspond à cette description : ${item.description} ?`,
        format: "qcm",
        choices: makeChoices(item.correct, [
          "cube",
          "pavé droit",
          "cylindre",
          "cône",
          "boule",
          "pyramide",
          "prisme droit",
        ]),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation: item.explanation,
        canvas: item.canvas(),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_solide_face_tpl_3_erreur_eleve",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_face",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche la forme correcte des faces ou des bases.",
    tags: ["cm2", "solide", "face", "erreur", "template", "qcm"],
    generate: () => {
      const item = randomChoice([
        {
          text: "Un élève dit : “Les faces d’un cube sont des triangles.” A-t-il raison ?",
          expected: "non",
          explanation:
            "Non. Les faces d’un cube sont des carrés.",
        },
        {
          text: "Un élève dit : “Les bases d’un cylindre sont des disques.” A-t-il raison ?",
          expected: "oui",
          explanation:
            "Oui. Les bases d’un cylindre sont des disques.",
        },
        {
          text: "Un élève dit : “Une boule a 6 faces carrées.” A-t-il raison ?",
          expected: "non",
          explanation:
            "Non. Une boule possède une surface courbe, pas 6 faces carrées.",
        },
        {
          text: "Un élève dit : “Les faces latérales d’une pyramide sont triangulaires.” A-t-il raison ?",
          expected: "oui",
          explanation:
            "Oui. Les faces latérales d’une pyramide sont des triangles.",
        },
      ]);

      return {
        text: item.text,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [item.expected],
        comparator: "mcq_exact",
        explanation: item.explanation,
      };
    },
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

  {
    kind: "fixed",
    id: "cm2_solide_patron_fixed_8_boule",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_patron",
    difficulty: 4,
    theme: "neutral",
    text: "Peut-on faire facilement un patron exact de boule avec des polygones plats comme pour un cube ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "La boule est entièrement courbe.",
    explanation:
      "Non. Une boule possède une surface courbe. On ne la déplie pas simplement en faces planes comme un cube ou un pavé droit.",
    tags: ["cm2", "solide", "patron", "boule", "surface_courbe", "qcm", "canvas"],
    canvas: bouleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_solide_patron_fixed_9_erreur_cube_5_carres",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_patron",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dessine un patron avec seulement 5 carrés. Peut-il obtenir un cube complet ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Un cube possède 6 faces.",
    explanation:
      "Non. Un cube possède 6 faces carrées. Avec seulement 5 carrés, il manque une face.",
    tags: ["cm2", "solide", "patron", "cube", "erreur", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_solide_patron_fixed_10_erreur_cylindre_un_disque",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_patron",
    difficulty: 3,
    theme: "neutral",
    text: "Un patron de cylindre avec un seul disque et un rectangle est-il complet ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Un cylindre possède deux bases.",
    explanation:
      "Non. Un cylindre possède deux bases circulaires. Il faut donc deux disques et un rectangle.",
    tags: ["cm2", "solide", "patron", "cylindre", "erreur", "qcm", "canvas"],
    canvas: cylindreCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_solide_patron_fixed_11_erreur_pyramide_faces",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_patron",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève propose un patron de pyramide à base carrée avec 1 carré et 3 triangles. Est-il complet ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Une pyramide à base carrée a 4 faces latérales.",
    explanation:
      "Non. Une pyramide à base carrée possède 4 faces latérales triangulaires. Il faut donc 1 carré et 4 triangles.",
    tags: ["cm2", "solide", "patron", "pyramide", "erreur", "qcm", "canvas"],
    canvas: pyramideCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_solide_patron_fixed_12_reunion_emballage",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_patron",
    difficulty: 3,
    theme: "reunion",
    text: "Pour fabriquer une petite boîte en forme de cube pour vendre des bonbons coco, il faut un patron avec...",
    format: "qcm",
    choices: [
      "6 carrés",
      "4 triangles",
      "2 disques",
      "1 rectangle seulement",
    ],
    expected: ["6 carrés"],
    comparator: "mcq_exact",
    hint: "La boîte a la forme d’un cube.",
    explanation:
      "Une boîte en forme de cube possède 6 faces carrées. Son patron doit contenir 6 carrés.",
    tags: ["cm2", "solide", "patron", "reunion", "cube", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_solide_patron_fixed_13_reunion_conserve",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_patron",
    difficulty: 3,
    theme: "reunion",
    text: "Une boîte cylindrique d’ananas Victoria peut être fabriquée avec un patron contenant...",
    format: "qcm",
    choices: [
      "2 disques et 1 rectangle",
      "6 carrés",
      "1 carré et 4 triangles",
      "2 triangles et 3 rectangles",
    ],
    expected: ["2 disques et 1 rectangle"],
    comparator: "mcq_exact",
    hint: "La boîte est un cylindre.",
    explanation:
      "Un patron de cylindre contient deux disques pour les bases et un rectangle pour la surface latérale.",
    tags: ["cm2", "solide", "patron", "reunion", "cylindre", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_solide_patron_fixed_14_open_cube",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_patron",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi un patron de cube doit contenir 6 carrés.",
    format: "open",
    expected: ["cube", "6", "faces", "carrés", "patron"],
    comparator: "contains_keyword",
    hint: "Le patron contient les faces du solide.",
    explanation:
      "Un cube possède 6 faces et chacune de ses faces est un carré. Donc un patron de cube doit contenir 6 carrés.",
    tags: ["cm2", "solide", "patron", "cube", "open"],
    canvas: cubeCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_solide_patron_fixed_15_open_cylindre",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_patron",
    difficulty: 4,
    theme: "neutral",
    text: "Explique ce que doit contenir un patron de cylindre.",
    format: "open",
    expected: ["2", "disques", "rectangle", "bases", "surface"],
    comparator: "contains_keyword",
    hint: "Pense aux deux bases et à la surface latérale.",
    explanation:
      "Un patron de cylindre contient deux disques pour les bases et un rectangle qui s’enroule pour former la surface latérale.",
    tags: ["cm2", "solide", "patron", "cylindre", "open"],
    canvas: cylindreCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_solide_patron_fixed_16_open_pyramide",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_patron",
    difficulty: 4,
    theme: "neutral",
    text: "Explique ce que doit contenir un patron de pyramide à base carrée.",
    format: "open",
    expected: ["carré", "4", "triangles", "base", "faces"],
    comparator: "contains_keyword",
    hint: "Il faut la base et les faces latérales.",
    explanation:
      "Un patron de pyramide à base carrée contient un carré pour la base et 4 triangles pour les faces latérales.",
    tags: ["cm2", "solide", "patron", "pyramide", "open"],
    canvas: pyramideCanvas(),
  },

  {
    kind: "template",
    id: "cm2_solide_patron_tpl_1_associer",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_patron",
    difficulty: 3,
    theme: "neutral",
    hint: "Un patron contient toutes les faces du solide.",
    tags: ["cm2", "solide", "patron", "associer", "template", "qcm", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          solide: "cube",
          correct: "6 carrés",
          wrongs: ["2 disques et 1 rectangle", "1 carré et 4 triangles", "2 triangles et 3 rectangles"],
          explanation:
            "Un patron de cube contient 6 carrés.",
          canvas: cubeCanvas,
        },
        {
          solide: "pavé droit",
          correct: "6 rectangles",
          wrongs: ["6 disques", "4 triangles seulement", "1 seul carré"],
          explanation:
            "Un patron de pavé droit contient les 6 faces du pavé, généralement des rectangles.",
          canvas: paveDroitCanvas,
        },
        {
          solide: "cylindre",
          correct: "2 disques et 1 rectangle",
          wrongs: ["6 carrés", "1 carré et 4 triangles", "2 triangles et 3 rectangles"],
          explanation:
            "Un patron de cylindre contient 2 disques et 1 rectangle.",
          canvas: cylindreCanvas,
        },
        {
          solide: "pyramide à base carrée",
          correct: "1 carré et 4 triangles",
          wrongs: ["6 carrés", "2 disques et 1 rectangle", "2 triangles et 3 rectangles"],
          explanation:
            "Un patron de pyramide à base carrée contient 1 carré et 4 triangles.",
          canvas: pyramideCanvas,
        },
        {
          solide: "prisme droit à base triangulaire",
          correct: "2 triangles et 3 rectangles",
          wrongs: ["6 carrés", "2 disques et 1 rectangle", "1 carré et 4 triangles"],
          explanation:
            "Un patron de prisme droit à base triangulaire contient 2 triangles et 3 rectangles.",
          canvas: prismeCanvas,
        },
      ]);

      return {
        text: `Quel ensemble de figures peut former un patron de ${item.solide} ?`,
        format: "qcm",
        choices: makeChoices(item.correct, item.wrongs),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation: item.explanation,
        canvas: item.canvas(),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_solide_patron_tpl_2_vrai_faux",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_patron",
    difficulty: 4,
    theme: "neutral",
    hint: "Compare avec les faces du solide.",
    tags: ["cm2", "solide", "patron", "vrai_faux", "template", "qcm"],
    generate: () => {
      const item = randomChoice([
        {
          text: "Un patron de cube peut contenir 6 carrés.",
          expected: "vrai",
          explanation:
            "Vrai. Un cube possède 6 faces carrées.",
        },
        {
          text: "Un patron de cylindre complet contient un seul disque.",
          expected: "faux",
          explanation:
            "Faux. Un cylindre a deux bases circulaires, donc il faut deux disques.",
        },
        {
          text: "Un patron de pyramide à base carrée peut contenir 1 carré et 4 triangles.",
          expected: "vrai",
          explanation:
            "Vrai. Le carré forme la base et les triangles forment les faces latérales.",
        },
        {
          text: "Un patron de pavé droit contient généralement 6 rectangles.",
          expected: "vrai",
          explanation:
            "Vrai. Un pavé droit possède 6 faces rectangulaires.",
        },
        {
          text: "Un patron de cube avec 5 carrés suffit pour fermer le cube.",
          expected: "faux",
          explanation:
            "Faux. Il manque une face : un cube possède 6 faces.",
        },
      ]);

      return {
        text: item.text,
        format: "qcm",
        choices: ["vrai", "faux"],
        expected: [item.expected],
        comparator: "mcq_exact",
        explanation: item.explanation,
      };
    },
  },

  {
    kind: "template",
    id: "cm2_solide_patron_tpl_3_erreur_eleve",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_patron",
    difficulty: 4,
    theme: "neutral",
    hint: "Un patron doit contenir toutes les faces nécessaires.",
    tags: ["cm2", "solide", "patron", "erreur", "template", "qcm"],
    generate: () => {
      const item = randomChoice([
        {
          text: "Un élève propose 5 carrés pour faire un patron de cube. A-t-il raison ?",
          expected: "non",
          explanation:
            "Non. Un cube possède 6 faces carrées, donc il faut 6 carrés.",
        },
        {
          text: "Un élève propose 2 disques et 1 rectangle pour faire un patron de cylindre. A-t-il raison ?",
          expected: "oui",
          explanation:
            "Oui. Les deux disques forment les bases et le rectangle forme la surface latérale.",
        },
        {
          text: "Un élève propose 1 carré et 3 triangles pour une pyramide à base carrée. A-t-il raison ?",
          expected: "non",
          explanation:
            "Non. Il manque une face triangulaire : il faut 4 triangles.",
        },
      ]);

      return {
        text: item.text,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [item.expected],
        comparator: "mcq_exact",
        explanation: item.explanation,
      };
    },
  },
    // ============================================================
  // SOLIDE_DEFI
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_solide_defi_fixed_1_intrus_polyedre",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Quel est l’intrus parmi ces solides ?",
    format: "qcm",
    choices: ["cylindre", "cube", "pavé droit", "pyramide"],
    expected: ["cylindre"],
    comparator: "mcq_exact",
    hint: "Cherche le solide qui possède une surface courbe.",
    explanation:
      "Le cylindre est l’intrus : il possède une surface courbe. Le cube, le pavé droit et la pyramide sont des polyèdres.",
    tags: ["cm2", "solide", "defi", "intrus", "polyedre", "qcm", "canvas"],
    canvas: cylindreCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_solide_defi_fixed_2_intrus_boule",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Quel est l’intrus parmi ces solides : cube, pavé droit, prisme droit, boule ?",
    format: "qcm",
    choices: ["boule", "cube", "pavé droit", "prisme droit"],
    expected: ["boule"],
    comparator: "mcq_exact",
    hint: "La boule n’a pas de face plane.",
    explanation:
      "La boule est l’intrus : elle est entièrement courbe. Les autres solides ont des faces planes.",
    tags: ["cm2", "solide", "defi", "intrus", "boule", "qcm", "canvas"],
    canvas: bouleCanvas(),
  },

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
    id: "cm2_solide_defi_fixed_4_erreur_cube_faces",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : “Un cube possède 8 faces.” A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Les 8 correspondent aux sommets.",
    explanation:
      "Non. Un cube possède 6 faces, 8 sommets et 12 arêtes. L’élève a confondu faces et sommets.",
    tags: ["cm2", "solide", "defi", "erreur", "cube", "faces", "qcm", "canvas"],
    canvas: cubeCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_solide_defi_fixed_5_erreur_aretes_sommets",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : “Un pavé droit possède 12 sommets.” A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "12 correspond au nombre d’arêtes.",
    explanation:
      "Non. Un pavé droit possède 8 sommets et 12 arêtes. L’élève a confondu sommets et arêtes.",
    tags: ["cm2", "solide", "defi", "erreur", "pave_droit", "qcm", "canvas"],
    canvas: paveDroitCanvas(),
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

  {
    kind: "fixed",
    id: "cm2_solide_defi_fixed_9_patron_intrus",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Quel ensemble ne peut pas former le patron d’un cube ?",
    format: "qcm",
    choices: [
      "5 carrés",
      "6 carrés",
      "six faces carrées",
      "un assemblage de 6 carrés bien disposés",
    ],
    expected: ["5 carrés"],
    comparator: "mcq_exact",
    hint: "Un cube possède 6 faces.",
    explanation:
      "Un cube possède 6 faces carrées. Avec seulement 5 carrés, il manque une face.",
    tags: ["cm2", "solide", "defi", "patron", "cube", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_solide_defi_fixed_10_reunion_caisse",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Au marché de Saint-Pierre, une caisse rectangulaire de fruits peut être modélisée par...",
    format: "qcm",
    choices: [
      "un pavé droit",
      "une boule",
      "un cône",
      "une pyramide",
    ],
    expected: ["un pavé droit"],
    comparator: "mcq_exact",
    hint: "Une caisse rectangulaire ressemble à une boîte.",
    explanation:
      "Une caisse rectangulaire peut être modélisée par un pavé droit.",
    tags: ["cm2", "solide", "defi", "reunion", "pave_droit", "qcm"],
    canvas: paveDroitCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_solide_defi_fixed_11_reunion_cornet",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Sur le front de mer de Saint-Pierre, un marchand vend des glaces en cornet. Le cornet peut être modélisé par...",
    format: "qcm",
    choices: [
      "un cône",
      "un cylindre",
      "un cube",
      "un pavé droit",
    ],
    expected: ["un cône"],
    comparator: "mcq_exact",
    hint: "Un cornet se termine en pointe.",
    explanation:
      "Un cornet de glace peut être modélisé par un cône.",
    tags: ["cm2", "solide", "defi", "reunion", "cone", "qcm"],
    canvas: coneCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_solide_defi_fixed_12_reunion_citerne",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Une citerne ronde d’eau de pluie peut être modélisée par un cylindre. Quel indice aide à le reconnaître ?",
    format: "qcm",
    choices: [
      "elle a deux bases circulaires",
      "elle a six faces carrées",
      "elle a une seule pointe",
      "elle est entièrement ronde comme une balle",
    ],
    expected: ["elle a deux bases circulaires"],
    comparator: "mcq_exact",
    hint: "Un cylindre a deux bases circulaires.",
    explanation:
      "Un cylindre possède deux bases circulaires et une surface courbe. C’est pourquoi une citerne ronde peut être modélisée par un cylindre.",
    tags: ["cm2", "solide", "defi", "reunion", "cylindre", "qcm"],
    canvas: cylindreCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_solide_defi_fixed_13_open_intrus",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi le cylindre n’est pas un polyèdre.",
    format: "open",
    expected: ["surface", "courbe", "faces", "polygones", "polyèdre"],
    comparator: "contains_keyword",
    hint: "Un polyèdre a uniquement des faces planes polygonales.",
    explanation:
      "Un polyèdre possède uniquement des faces planes qui sont des polygones. Le cylindre possède une surface courbe : ce n’est donc pas un polyèdre.",
    tags: ["cm2", "solide", "defi", "open", "polyedre", "cylindre"],
    canvas: cylindreCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_solide_defi_fixed_14_open_cube_pave",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi on peut dire qu’un cube est un pavé droit particulier.",
    format: "open",
    expected: ["cube", "pavé", "faces", "carrées", "rectangle"],
    comparator: "contains_keyword",
    hint: "Un carré est aussi un rectangle particulier.",
    explanation:
      "Un pavé droit possède des faces rectangulaires. Un cube est un pavé droit particulier car ses faces sont toutes carrées.",
    tags: ["cm2", "solide", "defi", "open", "cube", "pave_droit"],
    canvas: cubeCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_solide_defi_fixed_15_open_pyramide_cone",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique la différence entre une pyramide et un cône.",
    format: "open",
    expected: ["pyramide", "triangles", "cône", "courbe", "base"],
    comparator: "contains_keyword",
    hint: "Compare les faces latérales.",
    explanation:
      "Une pyramide a une base et des faces latérales triangulaires. Un cône a une base circulaire et une surface latérale courbe.",
    tags: ["cm2", "solide", "defi", "open", "pyramide", "cone"],
  },

  {
    kind: "fixed",
    id: "cm2_solide_defi_fixed_16_open_patron",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève propose 5 carrés pour fabriquer un cube. Explique son erreur.",
    format: "open",
    expected: ["6", "faces", "carrés", "manque", "cube"],
    comparator: "contains_keyword",
    hint: "Un cube possède 6 faces.",
    explanation:
      "Un cube possède 6 faces carrées. Avec seulement 5 carrés, il manque une face : le patron ne permet pas de fermer le cube.",
    tags: ["cm2", "solide", "defi", "open", "patron", "erreur", "cube"],
    canvas: cubeCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_solide_defi_fixed_17_open_objet_reunion",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_defi",
    difficulty: 5,
    theme: "reunion",
    text: "Choisis un objet que l’on peut voir à La Réunion et explique à quel solide il ressemble.",
    format: "open",
    expected: [
      "citerne",
      "cylindre",
      "ballon",
      "boule",
      "caisse",
      "pavé",
      "cornet",
      "cône",
    ],
    comparator: "contains_keyword",
    hint: "Exemples : citerne, ballon, caisse, cornet.",
    explanation:
      "On peut dire par exemple : une citerne ronde ressemble à un cylindre, un ballon ressemble à une boule, une caisse ressemble à un pavé droit, un cornet ressemble à un cône.",
    tags: ["cm2", "solide", "defi", "open", "reunion", "objet"],
  },

  {
    kind: "template",
    id: "cm2_solide_defi_tpl_1_intrus",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche la propriété qui change.",
    tags: ["cm2", "solide", "defi", "intrus", "template", "qcm", "canvas"],
    generate: () => {
      const item = randomChoice([
        {
          correct: "boule",
          choices: ["boule", "cube", "pavé droit", "pyramide"],
          explanation:
            "La boule est l’intrus : elle n’a pas de face plane.",
          canvas: bouleCanvas,
        },
        {
          correct: "cylindre",
          choices: ["cylindre", "cube", "pavé droit", "prisme droit"],
          explanation:
            "Le cylindre est l’intrus : il possède une surface courbe.",
          canvas: cylindreCanvas,
        },
        {
          correct: "cube",
          choices: ["cube", "cylindre", "cône", "boule"],
          explanation:
            "Le cube est l’intrus ici : c’est le seul solide qui possède uniquement des faces planes carrées.",
          canvas: cubeCanvas,
        },
        {
          correct: "cône",
          choices: ["cône", "cube", "pavé droit", "prisme droit"],
          explanation:
            "Le cône est l’intrus : il possède une base circulaire et une surface courbe.",
          canvas: coneCanvas,
        },
      ]);

      return {
        text: "Quel est l’intrus parmi ces solides ?",
        format: "qcm",
        choices: shuffle(item.choices),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation: item.explanation,
        canvas: item.canvas(),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_solide_defi_tpl_2_erreur_eleve",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche la confusion de vocabulaire.",
    tags: ["cm2", "solide", "defi", "erreur", "template", "qcm"],
    generate: () => {
      const item = randomChoice([
        {
          text: "Un élève dit : “Un cube possède 8 faces.” A-t-il raison ?",
          expected: "non",
          explanation:
            "Non. Un cube possède 6 faces. Il possède 8 sommets.",
        },
        {
          text: "Un élève dit : “Un pavé droit possède 12 arêtes.” A-t-il raison ?",
          expected: "oui",
          explanation:
            "Oui. Un pavé droit possède 12 arêtes.",
        },
        {
          text: "Un élève dit : “Une boule possède 6 faces carrées.” A-t-il raison ?",
          expected: "non",
          explanation:
            "Non. Une boule possède une surface courbe, pas 6 faces carrées.",
        },
        {
          text: "Un élève dit : “Un cône possède une base circulaire et un sommet.” A-t-il raison ?",
          expected: "oui",
          explanation:
            "Oui. Un cône possède une base circulaire et un sommet.",
        },
      ]);

      return {
        text: item.text,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [item.expected],
        comparator: "mcq_exact",
        explanation: item.explanation,
      };
    },
  },

  {
    kind: "template",
    id: "cm2_solide_defi_tpl_3_objet_reunion",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_defi",
    difficulty: 4,
    theme: "reunion",
    hint: "Associe l’objet à sa forme géométrique.",
    tags: ["cm2", "solide", "defi", "reunion", "objet", "template", "qcm"],
    generate: () => {
      const item = randomChoice([
        {
          objet: "une citerne ronde d’eau de pluie",
          correct: "un cylindre",
          explanation:
            "Une citerne ronde peut être modélisée par un cylindre.",
          canvas: cylindreCanvas,
        },
        {
          objet: "un ballon sur la plage",
          correct: "une boule",
          explanation:
            "Un ballon peut être modélisé par une boule.",
          canvas: bouleCanvas,
        },
        {
          objet: "une caisse rectangulaire de fruits",
          correct: "un pavé droit",
          explanation:
            "Une caisse rectangulaire peut être modélisée par un pavé droit.",
          canvas: paveDroitCanvas,
        },
        {
          objet: "un cornet de glace",
          correct: "un cône",
          explanation:
            "Un cornet de glace peut être modélisé par un cône.",
          canvas: coneCanvas,
        },
      ]);

      return {
        text: `À quel solide ressemble ${item.objet} ?`,
        format: "qcm",
        choices: makeChoices(item.correct, [
          "un cube",
          "un pavé droit",
          "un cylindre",
          "un cône",
          "une boule",
          "une pyramide",
        ]),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation: item.explanation,
        canvas: item.canvas(),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_solide_defi_tpl_4_patron_erreur",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Vérifie le nombre de faces nécessaires.",
    tags: ["cm2", "solide", "defi", "patron", "erreur", "template", "qcm"],
    generate: () => {
      const item = randomChoice([
        {
          text: "Un élève propose 5 carrés pour fabriquer un cube. Est-ce suffisant ?",
          expected: "non",
          explanation:
            "Non. Un cube possède 6 faces carrées.",
        },
        {
          text: "Un élève propose 2 disques et 1 rectangle pour fabriquer un cylindre. Est-ce correct ?",
          expected: "oui",
          explanation:
            "Oui. Un cylindre a deux bases circulaires et une surface latérale qui peut être représentée par un rectangle.",
        },
        {
          text: "Un élève propose 1 carré et 3 triangles pour une pyramide à base carrée. Est-ce suffisant ?",
          expected: "non",
          explanation:
            "Non. Une pyramide à base carrée a 4 faces latérales triangulaires.",
        },
      ]);

      return {
        text: item.text,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [item.expected],
        comparator: "mcq_exact",
        explanation: item.explanation,
      };
    },
  },

  {
    kind: "template",
    id: "cm2_solide_defi_tpl_5_assemblage_cubes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Compte tous les cubes unités.",
    tags: ["cm2", "solide", "defi", "assemblage_cubes", "template", "short", "canvas"],
    generate: () => {
      const n = randomChoice([4, 5, 6, 7, 8]);

      const cubes = Array.from({ length: n }, (_, i) => ({
        x: i % 3,
        y: Math.floor(i / 3) % 2,
        z: Math.floor(i / 6),
      }));

      return {
        text: "Combien de cubes unités composent cet assemblage ?",
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation:
          `On compte les cubes unités un par un. Il y en a ${n}.`,
        canvas: solideCanvas({
          solide: "assemblage_cubes",
          cubes,
          display: {
            showLabels: true,
            showDimensions: false,
            showFormulaHint: false,
          },
        }),
      };
    },
  },
];
