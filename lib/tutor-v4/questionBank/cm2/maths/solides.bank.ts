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

function makeChoices(correct: string, wrongs: readonly string[]): string[] {
  return shuffle([correct, ...wrongs]).slice(0, 4);
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

]