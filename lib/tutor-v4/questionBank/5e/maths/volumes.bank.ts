// lib/tutor-v4/question-banks/maths/5e/volumes.bank.ts

import type {
  TutorBankItemV4,
  Solide3DCanvasData,
} from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function formatNumber(n: number) {
  return Number.isInteger(n) ? String(n) : String(Math.round(n * 100) / 100);
}

function solideCanvas(
  params: Omit<Solide3DCanvasData, "kind">
): Solide3DCanvasData {
  return {
    kind: "solide_3d",
    ...params,
  };
}

export const volumesBank: TutorBankItemV4[] = [
  /* =========================
     VOLUME_COMPRENDRE
  ========================= */

  {
    kind: "fixed",
    id: "5e_volume_comprendre_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Que mesure le volume d’un solide ?",
    format: "qcm",
    choices: [
      "la place occupée dans l’espace",
      "la longueur du contour",
      "la surface d’une face",
      "la masse du solide",
    ],
    expected: ["la place occupée dans l’espace"],
    comparator: "mcq_exact",
    hint: "Un volume concerne un objet en trois dimensions.",
    explanation:
      "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
          ("Le volume mesure la place occupée par un solide dans l’espace. Il s’exprime avec des unités cubes comme cm³, dm³ ou m³.") +
          "\n\nConclusion : le volume ou la grandeur obtenu répond à la question.",
    tags: ["volume", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "5e_volume_comprendre_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle expression correspond à un volume ?",
    format: "qcm",
    choices: ["12 cm", "12 cm²", "12 cm³", "12 kg"],
    expected: ["12 cm³"],
    comparator: "mcq_exact",
    hint: "Le petit 3 indique une unité de volume.",
    explanation:
      "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
          ("Une longueur s’exprime en cm, une aire en cm², une masse en kg. Un volume s’exprime en cm³.") +
          "\n\nConclusion : le volume ou la grandeur obtenu répond à la question.",
    tags: ["volume", "unite", "qcm"],
  },

  {
    kind: "fixed",
    id: "5e_volume_comprendre_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "Un solide est formé de 12 cubes unités. Quel est son volume ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Chaque petit cube compte pour 1 unité de volume.",
    explanation:
      "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
          ("Le volume en cubes unités correspond au nombre total de cubes. Ici, il y a 12 cubes, donc le volume vaut 12 unités de volume.") +
          "\n\nConclusion : le volume ou la grandeur obtenu répond à la question.",
    canvas: solideCanvas({
      solide: "assemblage_cubes",
      cubes: [
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 0, z: 0 },
        { x: 2, y: 0, z: 0 },
        { x: 0, y: 1, z: 0 },
        { x: 1, y: 1, z: 0 },
        { x: 2, y: 1, z: 0 },
        { x: 0, y: 0, z: 1 },
        { x: 1, y: 0, z: 1 },
        { x: 2, y: 0, z: 1 },
        { x: 0, y: 1, z: 1 },
        { x: 1, y: 1, z: 1 },
        { x: 2, y: 1, z: 1 },
      ],
      display: { showLabels: true },
    }),
    tags: ["volume", "cubes_unite", "canvas"],
  },

  {
    kind: "fixed",
    id: "5e_volume_comprendre_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_comprendre",
    difficulty: 3,
    theme: "neutral",
    text: "Explique en une phrase pourquoi un volume s’exprime souvent avec une unité au cube.",
    format: "open",
    expected: ["longueur", "largeur", "hauteur", "trois", "dimensions", "cube"],
    comparator: "contains_keyword",
    hint: "Pense aux trois dimensions d’un solide.",
    explanation:
      "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
          ("Un volume concerne trois dimensions : longueur, largeur et hauteur. C’est pour cela qu’on utilise des unités cubes comme cm³.") +
          "\n\nConclusion : le volume ou la grandeur obtenu répond à la question.",
    tags: ["volume", "open", "raisonnement"],
  },

  {
    kind: "template",
    id: "5e_volume_comprendre_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_comprendre",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte les cubes unités.",
    tags: ["volume", "cubes_unite", "template", "canvas"],
    generate: () => {
      const n = randomInt(6, 18);

      const cubes = Array.from({ length: n }, (_, i) => ({
        x: i % 3,
        y: Math.floor(i / 3) % 2,
        z: Math.floor(i / 6),
      }));

      return {
        text: "Quel est le volume du solide en cubes unités ?",
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation: "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
          (`On compte ${n} cubes unités. Le volume est donc ${n} unités de volume.`) +
          "\n\nConclusion : le volume ou la grandeur obtenu répond à la question.",
        canvas: solideCanvas({
          solide: "assemblage_cubes",
          cubes,
          display: { showLabels: true },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "5e_volume_comprendre_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_comprendre",
    difficulty: 2,
    theme: "neutral",
    hint: "Une aire est en unités carrées, un volume en unités cubes.",
    tags: ["volume", "aire_volume", "template", "qcm"],
    generate: () => {
      const unit = randomChoice(["cm", "dm", "m"]);
      const correct = `${unit}³`;

      return {
        text: "Quelle unité convient pour mesurer un volume ?",
        format: "qcm",
        choices: shuffle([unit, `${unit}²`, correct, "kg"]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
          (`Un volume se mesure avec une unité cube : ${correct}.`) +
          "\n\nConclusion : le volume ou la grandeur obtenu répond à la question.",
      };
    },
  },

  /* =========================
     VOLUME_PAVE
  ========================= */

  {
    kind: "fixed",
    id: "5e_volume_pave_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_pave",
    difficulty: 2,
    theme: "neutral",
    text: "Un pavé droit mesure 6 cm de longueur, 4 cm de largeur et 3 cm de hauteur. Quel est son volume ?",
    format: "qcm",
    choices: ["13 cm³", "24 cm³", "72 cm³", "36 cm³"],
    expected: ["72 cm³"],
    comparator: "mcq_exact",
    hint: "Volume = longueur × largeur × hauteur.",
    explanation: "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
          ("V = 6 × 4 × 3 = 72 cm³.") +
          "\n\nConclusion : le volume ou la grandeur obtenu répond à la question.",
    canvas: solideCanvas({
      solide: "pave_droit",
      dimensions: { longueur: 6, largeur: 4, hauteur: 3 },
      labels: {
        longueur: "6 cm",
        largeur: "4 cm",
        hauteur: "3 cm",
        aireBase: "24 cm²",
      },
      highlight: { base: true, hauteur: true },
      display: { showLabels: true, showDimensions: true, showFormulaHint: true },
    }),
    tags: ["volume", "pave_droit", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "5e_volume_pave_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_pave",
    difficulty: 2,
    theme: "neutral",
    text: "Un pavé droit a pour dimensions 5 cm, 3 cm et 2 cm. Calculer son volume.",
    format: "short",
    expected: ["30"],
    comparator: "number_equal",
    hint: "Multiplie les trois dimensions.",
    explanation:
      "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
          ("Le volume d’un pavé droit se calcule avec longueur × largeur × hauteur. Donc V = 5 × 3 × 2 = 30 cm³.") +
          "\n\nConclusion : le volume ou la grandeur obtenu répond à la question.",
    canvas: solideCanvas({
      solide: "pave_droit",
      dimensions: { longueur: 5, largeur: 3, hauteur: 2, volume: 30 },
      labels: {
        longueur: "5 cm",
        largeur: "3 cm",
        hauteur: "2 cm",
        aireBase: "15 cm²",
      },
      highlight: { base: true, hauteur: true },
      display: { showLabels: true, showDimensions: true },
    }),
    tags: ["volume", "pave_droit", "short", "canvas"],
  },

  {
    kind: "fixed",
    id: "5e_volume_pave_erreur_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_pave",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève calcule le volume d’un pavé droit de dimensions 5 cm, 4 cm et 3 cm. Il écrit : 5 + 4 + 3 = 12 cm³. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Pour un volume de pavé droit, on ne fait pas une addition.",
    explanation:
      "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
          ("Non. Pour un pavé droit, on multiplie les trois dimensions : 5 × 4 × 3 = 60 cm³.") +
          "\n\nConclusion : le volume ou la grandeur obtenu répond à la question.",
    tags: ["volume", "pave_droit", "erreur", "qcm"],
  },

  {
    kind: "fixed",
    id: "5e_volume_pave_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_pave",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi le volume d’un pavé droit de dimensions 4 cm, 3 cm et 5 cm vaut 60 cm³.",
    format: "open",
    expected: ["4", "3", "5", "multiplie", "60"],
    comparator: "contains_keyword",
    hint: "Utilise la formule longueur × largeur × hauteur.",
    explanation:
      "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
          ("On multiplie les trois dimensions du pavé droit : 4 × 3 × 5 = 60. Le volume vaut donc 60 cm³.") +
          "\n\nConclusion : le volume ou la grandeur obtenu répond à la question.",
    tags: ["volume", "pave_droit", "open", "raisonnement"],
  },

  {
    kind: "template",
    id: "5e_volume_pave_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_pave",
    difficulty: 2,
    theme: "neutral",
    hint: "Calcule longueur × largeur × hauteur.",
    tags: ["volume", "pave_droit", "template", "canvas"],
    generate: () => {
      const longueur = randomInt(3, 10);
      const largeur = randomInt(2, 8);
      const hauteur = randomInt(2, 6);
      const aireBase = longueur * largeur;
      const volume = aireBase * hauteur;

      return {
        text: "Calculer le volume du pavé droit.",
        format: "short",
        expected: [String(volume)],
        comparator: "number_equal",
        explanation: "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
          (`Volume = longueur × largeur × hauteur = ${longueur} × ${largeur} × ${hauteur} = ${volume} cm³.`) +
          "\n\nConclusion : le volume ou la grandeur obtenu répond à la question.",
        canvas: solideCanvas({
          solide: "pave_droit",
          dimensions: { longueur, largeur, hauteur, aireBase, volume },
          labels: {
            longueur: `${longueur} cm`,
            largeur: `${largeur} cm`,
            hauteur: `${hauteur} cm`,
            aireBase: `${aireBase} cm²`,
          },
          highlight: { base: true, hauteur: true },
          display: { showLabels: true, showDimensions: true, showFormulaHint: true },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "5e_volume_pave_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_pave",
    difficulty: 3,
    theme: "neutral",
    hint: "Commence par calculer l’aire de la base.",
    tags: ["volume", "pave_droit", "aire_base", "template", "canvas"],
    generate: () => {
      const longueur = randomInt(4, 12);
      const largeur = randomInt(3, 8);
      const hauteur = randomInt(2, 7);
      const aireBase = longueur * largeur;
      const volume = aireBase * hauteur;

      return {
        text: `La base d’un pavé droit est un rectangle de ${longueur} cm sur ${largeur} cm. Sa hauteur est ${hauteur} cm. Quel est son volume ?`,
        format: "short",
        expected: [String(volume)],
        comparator: "number_equal",
        explanation: "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
          (`Aire de base = ${longueur} × ${largeur} = ${aireBase} cm². Volume = ${aireBase} × ${hauteur} = ${volume} cm³.`) +
          "\n\nConclusion : le volume ou la grandeur obtenu répond à la question.",
        canvas: solideCanvas({
          solide: "pave_droit",
          dimensions: { longueur, largeur, hauteur, aireBase, volume },
          labels: {
            longueur: `${longueur} cm`,
            largeur: `${largeur} cm`,
            hauteur: `${hauteur} cm`,
            aireBase: `${aireBase} cm²`,
          },
          highlight: { base: true, hauteur: true },
          display: { showLabels: true, showDimensions: true },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "5e_volume_pave_qcm_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_pave",
    difficulty: 3,
    theme: "neutral",
    hint: "Ne pas additionner : il faut multiplier.",
    tags: ["volume", "pave_droit", "qcm", "template", "piege"],
    generate: () => {
      const longueur = randomInt(3, 9);
      const largeur = randomInt(2, 6);
      const hauteur = randomInt(2, 5);
      const volume = longueur * largeur * hauteur;
      const somme = longueur + largeur + hauteur;
      const aireBase = longueur * largeur;

      return {
        text: `Un pavé droit mesure ${longueur} cm, ${largeur} cm et ${hauteur} cm. Quel est son volume ?`,
        format: "qcm",
        choices: shuffle([
          `${volume} cm³`,
          `${somme} cm³`,
          `${aireBase} cm³`,
          `${volume + hauteur} cm³`,
        ]),
        expected: [`${volume} cm³`],
        comparator: "mcq_exact",
        explanation: "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
          (`Il faut multiplier les trois dimensions : ${longueur} × ${largeur} × ${hauteur} = ${volume} cm³.`) +
          "\n\nConclusion : le volume ou la grandeur obtenu répond à la question.",
      };
    },
  },

  /* =========================
     VOLUME_PRISME
  ========================= */

  {
    kind: "fixed",
    id: "5e_volume_prisme_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_prisme",
    difficulty: 2,
    theme: "neutral",
    text: "Un prisme droit a une aire de base de 15 cm² et une hauteur de 8 cm. Quel est son volume ?",
    format: "qcm",
    choices: ["23 cm³", "60 cm³", "120 cm³", "45 cm³"],
    expected: ["120 cm³"],
    comparator: "mcq_exact",
    hint: "Volume = aire de base × hauteur.",
    explanation: "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
          ("V = 15 × 8 = 120 cm³.") +
          "\n\nConclusion : le volume ou la grandeur obtenu répond à la question.",
    canvas: solideCanvas({
      solide: "prisme",
      dimensions: { aireBase: 15, hauteur: 8, volume: 120 },
      labels: {
        aireBase: "15 cm²",
        hauteur: "8 cm",
      },
      highlight: { base: true, hauteur: true },
      display: { showLabels: true, showDimensions: true, showFormulaHint: true },
    }),
    tags: ["volume", "prisme", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "5e_volume_prisme_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_prisme",
    difficulty: 2,
    theme: "neutral",
    text: "Pour calculer le volume d’un prisme droit, quelle formule peut-on utiliser ?",
    format: "qcm",
    choices: [
      "Volume = aire de base × hauteur",
      "Volume = périmètre de base × hauteur",
      "Volume = aire de base + hauteur",
      "Volume = longueur + largeur + hauteur",
    ],
    expected: ["Volume = aire de base × hauteur"],
    comparator: "mcq_exact",
    hint: "On imagine qu’on empile la même base sur une hauteur.",
    explanation:
      "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
          ("Le volume d’un prisme droit se calcule avec la formule : Volume = aire de base × hauteur.") +
          "\n\nConclusion : le volume ou la grandeur obtenu répond à la question.",
    tags: ["volume", "prisme", "formule", "qcm"],
  },

  {
    kind: "template",
    id: "5e_volume_prisme_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_prisme",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplie l’aire de base par la hauteur.",
    tags: ["volume", "prisme", "template", "canvas"],
    generate: () => {
      const aireBase = randomChoice([8, 10, 12, 15, 18, 20, 24, 30]);
      const hauteur = randomInt(3, 10);
      const volume = aireBase * hauteur;

      return {
        text: `Un prisme droit a une aire de base de ${aireBase} cm² et une hauteur de ${hauteur} cm. Calculer son volume.`,
        format: "short",
        expected: [String(volume)],
        comparator: "number_equal",
        explanation: "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
          (`Volume = aire de base × hauteur = ${aireBase} × ${hauteur} = ${volume} cm³.`) +
          "\n\nConclusion : le volume ou la grandeur obtenu répond à la question.",
        canvas: solideCanvas({
          solide: "prisme",
          dimensions: { aireBase, hauteur, volume },
          labels: {
            aireBase: `${aireBase} cm²`,
            hauteur: `${hauteur} cm`,
          },
          highlight: { base: true, hauteur: true },
          display: { showLabels: true, showDimensions: true, showFormulaHint: true },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "5e_volume_prisme_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_prisme",
    difficulty: 3,
    theme: "neutral",
    hint: "La base est un triangle : aire = base × hauteur ÷ 2.",
    tags: ["volume", "prisme", "triangle_base", "template", "canvas"],
    generate: () => {
      const base = randomChoice([4, 6, 8, 10, 12]);
      const hauteurTriangle = randomChoice([3, 4, 5, 6, 8]);
      const hauteurPrisme = randomInt(4, 10);
      const aireBase = (base * hauteurTriangle) / 2;
      const volume = aireBase * hauteurPrisme;

      return {
        text: `La base d’un prisme droit est un triangle de base ${base} cm et de hauteur ${hauteurTriangle} cm. La hauteur du prisme est ${hauteurPrisme} cm. Quel est son volume ?`,
        format: "short",
        expected: [formatNumber(volume)],
        comparator: "number_equal",
        explanation: "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
          (`Aire de la base triangulaire = ${base} × ${hauteurTriangle} ÷ 2 = ${formatNumber(
          aireBase
        )} cm². Volume = ${formatNumber(aireBase)} × ${hauteurPrisme} = ${formatNumber(
          volume
        )} cm³.`) +
          "\n\nConclusion : le volume ou la grandeur obtenu répond à la question.",
        canvas: solideCanvas({
          solide: "prisme",
          dimensions: { aireBase, hauteur: hauteurPrisme, volume },
          labels: {
            aireBase: `${formatNumber(aireBase)} cm²`,
            hauteur: `${hauteurPrisme} cm`,
          },
          highlight: { base: true, hauteur: true },
          display: { showLabels: true, showDimensions: true },
        }),
      };
    },
  },
    /* =========================
     VOLUME_CYLINDRE
  ========================= */

  {
    kind: "fixed",
    id: "5e_volume_cylindre_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_cylindre",
    difficulty: 2,
    theme: "neutral",
    text: "Un cylindre a une aire de base de 20 cm² et une hauteur de 6 cm. Quel est son volume ?",
    format: "qcm",
    choices: ["26 cm³", "60 cm³", "120 cm³", "140 cm³"],
    expected: ["120 cm³"],
    comparator: "mcq_exact",
    hint: "Volume = aire de base × hauteur.",
    explanation: "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
          ("V = 20 × 6 = 120 cm³.") +
          "\n\nConclusion : le volume ou la grandeur obtenu répond à la question.",
    canvas: solideCanvas({
      solide: "cylindre",
      dimensions: { aireBase: 20, hauteur: 6 },
      labels: {
        aireBase: "20 cm²",
        hauteur: "6 cm",
      },
      highlight: { base: true, hauteur: true },
      display: { showLabels: true, showDimensions: true, showFormulaHint: true },
    }),
    tags: ["volume", "cylindre", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "5e_volume_cylindre_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_cylindre",
    difficulty: 3,
    theme: "neutral",
    text: "Un cylindre a un rayon de 3 cm et une hauteur de 5 cm. Donner son volume sous la forme aπ.",
    format: "short",
    expected: ["45π", "45 pi", "45"],
    comparator: "contains_keyword",
    hint: "Aire de base = π × r².",
    explanation:
      "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
          ("Aire de base = π × 3² = 9π cm². Volume = 9π × 5 = 45π cm³.") +
          "\n\nConclusion : le volume ou la grandeur obtenu répond à la question.",
    canvas: solideCanvas({
      solide: "cylindre",
      dimensions: { rayon: 3, hauteur: 5 },
      labels: {
        rayon: "3 cm",
        hauteur: "5 cm",
        aireBase: "9π cm²",
      },
      highlight: { base: true, hauteur: true },
      display: { showLabels: true, showDimensions: true, showFormulaHint: true },
    }),
    tags: ["volume", "cylindre", "pi", "canvas"],
  },

  {
    kind: "template",
    id: "5e_volume_cylindre_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_cylindre",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplie l’aire de base par la hauteur.",
    tags: ["volume", "cylindre", "template", "canvas"],
    generate: () => {
      const aireBase = randomChoice([10, 12, 15, 18, 20, 25, 30]);
      const hauteur = randomInt(3, 10);
      const volume = aireBase * hauteur;

      return {
        text: `Un cylindre a une aire de base de ${aireBase} cm² et une hauteur de ${hauteur} cm. Calculer son volume.`,
        format: "short",
        expected: [String(volume)],
        comparator: "number_equal",
        explanation: "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
          (`Volume = aire de base × hauteur = ${aireBase} × ${hauteur} = ${volume} cm³.`) +
          "\n\nConclusion : le volume ou la grandeur obtenu répond à la question.",
        canvas: solideCanvas({
          solide: "cylindre",
          dimensions: { aireBase, hauteur, volume },
          labels: {
            aireBase: `${aireBase} cm²`,
            hauteur: `${hauteur} cm`,
          },
          highlight: { base: true, hauteur: true },
          display: { showLabels: true, showDimensions: true, showFormulaHint: true },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "5e_volume_cylindre_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_cylindre",
    difficulty: 3,
    theme: "neutral",
    hint: "Aire de base d’un disque : π × r².",
    tags: ["volume", "cylindre", "pi", "template", "canvas"],
    generate: () => {
      const rayon = randomChoice([2, 3, 4, 5, 6]);
      const hauteur = randomInt(3, 10);
      const coeff = rayon * rayon * hauteur;

      return {
        text: `Un cylindre a un rayon de ${rayon} cm et une hauteur de ${hauteur} cm. Donner son volume sous la forme aπ.`,
        format: "short",
        expected: [`${coeff}π`, `${coeff} pi`, `${coeff}`],
        comparator: "contains_keyword",
        explanation: "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
          (`Aire de base = π × ${rayon}² = ${
          rayon * rayon
        }π cm². Volume = ${rayon * rayon}π × ${hauteur} = ${coeff}π cm³.`) +
          "\n\nConclusion : le volume ou la grandeur obtenu répond à la question.",
        canvas: solideCanvas({
          solide: "cylindre",
          dimensions: { rayon, hauteur },
          labels: {
            rayon: `${rayon} cm`,
            hauteur: `${hauteur} cm`,
            aireBase: `${rayon * rayon}π cm²`,
          },
          highlight: { base: true, hauteur: true },
          display: { showLabels: true, showDimensions: true, showFormulaHint: true },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "5e_volume_cylindre_erreur_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_cylindre",
    difficulty: 4,
    theme: "neutral",
    hint: "Attention : le rayon n’est pas le diamètre.",
    tags: ["volume", "cylindre", "diametre", "piege", "template"],
    generate: () => {
      const rayon = randomChoice([2, 3, 4, 5]);
      const diametre = rayon * 2;
      const hauteur = randomChoice([4, 5, 6, 8]);
      const coeff = rayon * rayon * hauteur;

      return {
        text: `Un cylindre a un diamètre de ${diametre} cm et une hauteur de ${hauteur} cm. Donner son volume sous la forme aπ.`,
        format: "short",
        expected: [`${coeff}π`, `${coeff} pi`, `${coeff}`],
        comparator: "contains_keyword",
        explanation: "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
          (`Le rayon vaut ${diametre} ÷ 2 = ${rayon} cm. Volume = π × ${rayon}² × ${hauteur} = ${coeff}π cm³.`) +
          "\n\nConclusion : le volume ou la grandeur obtenu répond à la question.",
        canvas: solideCanvas({
          solide: "cylindre",
          dimensions: { rayon, hauteur },
          labels: {
            rayon: `${rayon} cm`,
            hauteur: `${hauteur} cm`,
            aireBase: `${rayon * rayon}π cm²`,
          },
          highlight: { base: true, hauteur: true },
          display: { showLabels: true, showDimensions: true },
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "5e_volume_cylindre_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_cylindre",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi, pour calculer le volume d’un cylindre, on multiplie l’aire du disque de base par la hauteur.",
    format: "open",
    expected: ["base", "disque", "hauteur", "empile", "aire"],
    comparator: "contains_keyword",
    hint: "Imagine que le cylindre est formé de très nombreuses bases identiques empilées.",
    explanation:
      "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
          ("Un cylindre peut être vu comme un disque de base que l’on empile sur une certaine hauteur. On multiplie donc l’aire de la base par la hauteur.") +
          "\n\nConclusion : le volume ou la grandeur obtenu répond à la question.",
    tags: ["volume", "cylindre", "open", "raisonnement"],
  },

  /* =========================
     VOLUME_ASSEMBLAGE
  ========================= */

  {
    kind: "fixed",
    id: "5e_volume_assemblage_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_assemblage",
    difficulty: 3,
    theme: "neutral",
    text: "Un solide est formé d’un pavé droit de 40 cm³ et d’un prisme droit de 30 cm³. Quel est le volume total ?",
    format: "short",
    expected: ["70"],
    comparator: "number_equal",
    hint: "On additionne les deux volumes.",
    explanation:
      "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
          ("Le volume total d’un assemblage est la somme des volumes des solides qui le composent : 40 + 30 = 70 cm³.") +
          "\n\nConclusion : le volume ou la grandeur obtenu répond à la question.",
    tags: ["volume", "assemblage", "short"],
  },

  {
    kind: "fixed",
    id: "5e_volume_assemblage_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_assemblage",
    difficulty: 3,
    theme: "neutral",
    text: "On colle deux pavés droits de volumes 24 cm³ et 36 cm³. Quel volume obtient-on ?",
    format: "qcm",
    choices: ["12 cm³", "48 cm³", "60 cm³", "864 cm³"],
    expected: ["60 cm³"],
    comparator: "mcq_exact",
    hint: "On ajoute les volumes, on ne les multiplie pas.",
    explanation:
      "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
          ("Quand on assemble deux solides sans superposition, on additionne les volumes : 24 + 36 = 60 cm³.") +
          "\n\nConclusion : le volume ou la grandeur obtenu répond à la question.",
    tags: ["volume", "assemblage", "qcm"],
  },

  {
    kind: "template",
    id: "5e_volume_assemblage_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_assemblage",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne les volumes.",
    tags: ["volume", "assemblage", "template"],
    generate: () => {
      const v1 = randomChoice([20, 24, 30, 36, 40, 48]);
      const v2 = randomChoice([12, 18, 25, 32, 45]);
      const total = v1 + v2;

      return {
        text: `Un assemblage est formé de deux solides de volumes ${v1} cm³ et ${v2} cm³. Quel est son volume total ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
          (`On additionne les volumes : ${v1} + ${v2} = ${total} cm³.`) +
          "\n\nConclusion : le volume ou la grandeur obtenu répond à la question.",
      };
    },
  },

  {
    kind: "template",
    id: "5e_volume_assemblage_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_assemblage",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule d’abord chaque volume séparément.",
    tags: ["volume", "assemblage", "pave_prisme", "template"],
    generate: () => {
      const longueur = randomInt(3, 8);
      const largeur = randomInt(2, 5);
      const hauteurPave = randomInt(2, 5);
      const volumePave = longueur * largeur * hauteurPave;

      const aireBasePrisme = randomChoice([10, 12, 15, 18, 20]);
      const hauteurPrisme = randomInt(3, 8);
      const volumePrisme = aireBasePrisme * hauteurPrisme;

      const total = volumePave + volumePrisme;

      return {
        text: `Un assemblage est formé d’un pavé droit de dimensions ${longueur} cm, ${largeur} cm et ${hauteurPave} cm, et d’un prisme droit d’aire de base ${aireBasePrisme} cm² et de hauteur ${hauteurPrisme} cm. Quel est le volume total ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
          (`Volume du pavé = ${longueur} × ${largeur} × ${hauteurPave} = ${volumePave} cm³. Volume du prisme = ${aireBasePrisme} × ${hauteurPrisme} = ${volumePrisme} cm³. Total = ${volumePave} + ${volumePrisme} = ${total} cm³.`) +
          "\n\nConclusion : le volume ou la grandeur obtenu répond à la question.",
      };
    },
  },

  {
    kind: "template",
    id: "5e_volume_assemblage_tpl_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_assemblage",
    difficulty: 4,
    theme: "reunion",
    hint: "Additionne les deux parties du réservoir.",
    tags: ["volume", "assemblage", "reunion", "template"],
    generate: () => {
      const v1 = randomChoice([500, 800, 1000, 1200, 1500]);
      const v2 = randomChoice([200, 300, 400, 600, 700]);
      const total = v1 + v2;

      return {
        text: `À La Réunion, une réserve d’eau est composée de deux parties : ${v1} L et ${v2} L. Quelle quantité totale d’eau peut-elle contenir ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
          (`On additionne les deux capacités : ${v1} + ${v2} = ${total} L.`) +
          "\n\nConclusion : le volume ou la grandeur obtenu répond à la question.",
      };
    },
  },

  {
    kind: "fixed",
    id: "5e_volume_assemblage_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_assemblage",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi on peut additionner les volumes de deux solides assemblés sans superposition.",
    format: "open",
    expected: ["additionne", "somme", "volumes", "sans", "superposition"],
    comparator: "contains_keyword",
    hint: "Aucun morceau d’espace n’est compté deux fois.",
    explanation:
      "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
          ("Si les deux solides sont assemblés sans superposition, ils occupent deux parties différentes de l’espace. Le volume total est donc la somme des deux volumes.") +
          "\n\nConclusion : le volume ou la grandeur obtenu répond à la question.",
    tags: ["volume", "assemblage", "open", "raisonnement"],
  },

  /* =========================
     VOLUME_UNITES
  ========================= */

  {
    kind: "fixed",
    id: "5e_volume_unite_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_unite",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle unité est une unité de volume ?",
    format: "qcm",
    choices: ["cm", "cm²", "cm³", "kg"],
    expected: ["cm³"],
    comparator: "mcq_exact",
    hint: "Un volume se mesure avec une unité au cube.",
    explanation:
      "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
          ("Le cm³ est une unité de volume. Le cm mesure une longueur et le cm² une aire.") +
          "\n\nConclusion : le volume ou la grandeur obtenu répond à la question.",
    tags: ["volume", "unite", "qcm"],
  },

  {
    kind: "fixed",
    id: "5e_volume_unite_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_unite",
    difficulty: 2,
    theme: "neutral",
    text: "1 dm³ correspond à combien de cm³ ?",
    format: "qcm",
    choices: ["10 cm³", "100 cm³", "1 000 cm³", "10 000 cm³"],
    expected: ["1 000 cm³"],
    comparator: "mcq_exact",
    hint: "1 dm = 10 cm, donc 1 dm³ = 10 × 10 × 10 cm³.",
    explanation: "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
          ("1 dm³ = 10³ cm³ = 1 000 cm³.") +
          "\n\nConclusion : le volume ou la grandeur obtenu répond à la question.",
    tags: ["volume", "conversion", "unite"],
  },

  {
    kind: "fixed",
    id: "5e_volume_unite_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_unite",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle égalité est correcte ?",
    format: "qcm",
    choices: ["1 L = 1 cm³", "1 L = 1 dm³", "1 L = 1 m³", "1 L = 100 m³"],
    expected: ["1 L = 1 dm³"],
    comparator: "mcq_exact",
    hint: "C’est une correspondance classique à connaître.",
    explanation:
      "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
          ("La correspondance importante est : 1 L = 1 dm³.") +
          "\n\nConclusion : le volume ou la grandeur obtenu répond à la question.",
    tags: ["volume", "litre", "conversion", "qcm"],
  },

  {
    kind: "template",
    id: "5e_volume_unite_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_unite",
    difficulty: 2,
    theme: "neutral",
    hint: "1 L = 1 dm³.",
    tags: ["volume", "litre", "conversion", "template"],
    generate: () => {
      const litres = randomChoice([2, 3, 4, 5, 6, 8, 10, 12, 15]);
      return {
        text: `${litres} L correspondent à combien de dm³ ?`,
        format: "short",
        expected: [String(litres)],
        comparator: "number_equal",
        explanation: "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
          (`1 L = 1 dm³, donc ${litres} L = ${litres} dm³.`) +
          "\n\nConclusion : le volume ou la grandeur obtenu répond à la question.",
      };
    },
  },

  {
    kind: "template",
    id: "5e_volume_unite_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_unite",
    difficulty: 3,
    theme: "neutral",
    hint: "1 dm³ = 1 000 cm³.",
    tags: ["volume", "conversion", "template"],
    generate: () => {
      const dm3 = randomChoice([2, 3, 4, 5, 6, 8, 10]);
      const cm3 = dm3 * 1000;

      return {
        text: `${dm3} dm³ correspondent à combien de cm³ ?`,
        format: "short",
        expected: [String(cm3)],
        comparator: "number_equal",
        explanation: "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
          (`1 dm³ = 1 000 cm³, donc ${dm3} dm³ = ${cm3} cm³.`) +
          "\n\nConclusion : le volume ou la grandeur obtenu répond à la question.",
      };
    },
  },

  {
    kind: "template",
    id: "5e_volume_unite_tpl_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_unite",
    difficulty: 3,
    theme: "neutral",
    hint: "1 m³ = 1 000 L.",
    tags: ["volume", "litre", "m3", "conversion", "template"],
    generate: () => {
      const m3 = randomChoice([1, 2, 3, 4, 5]);
      const litres = m3 * 1000;

      return {
        text: `${m3} m³ correspondent à combien de litres ?`,
        format: "short",
        expected: [String(litres)],
        comparator: "number_equal",
        explanation: "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
          (`1 m³ = 1 000 L, donc ${m3} m³ = ${litres} L.`) +
          "\n\nConclusion : le volume ou la grandeur obtenu répond à la question.",
      };
    },
  },

  {
    kind: "fixed",
    id: "5e_volume_unite_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_unite",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi 1 dm³ = 1 000 cm³.",
    format: "open",
    expected: ["10", "10", "10", "1000", "cube"],
    comparator: "contains_keyword",
    hint: "1 dm = 10 cm, et un cube a trois dimensions.",
    explanation:
      "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
          ("Comme 1 dm = 10 cm, alors 1 dm³ = 10 cm × 10 cm × 10 cm = 1 000 cm³.") +
          "\n\nConclusion : le volume ou la grandeur obtenu répond à la question.",
    tags: ["volume", "conversion", "open", "raisonnement"],
  },

  /* =========================
     VOLUME_DEFIS
  ========================= */

  {
    kind: "fixed",
    id: "5e_volume_defi_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève calcule le volume d’un cylindre de rayon 4 cm et de hauteur 5 cm. Il écrit : 4 × 5 = 20π cm³. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Il faut utiliser π × r² × hauteur.",
    explanation:
      "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
          ("Non. Il a oublié le carré du rayon. Le volume vaut π × 4² × 5 = 80π cm³.") +
          "\n\nConclusion : le volume ou la grandeur obtenu répond à la question.",
    tags: ["volume", "defi", "cylindre", "erreur", "qcm"],
  },

  {
    kind: "template",
    id: "5e_volume_defi_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_defi",
    difficulty: 4,
    theme: "reunion",
    hint: "Modélise la réserve par un pavé droit.",
    tags: ["volume", "defi", "reunion", "pave", "template", "canvas"],
    generate: () => {
      const longueur = randomInt(3, 8);
      const largeur = randomInt(2, 5);
      const hauteur = randomInt(2, 5);
      const volume = longueur * largeur * hauteur;

      return {
        text: `À La Réunion, une petite réserve d’eau a la forme d’un pavé droit de ${longueur} m de long, ${largeur} m de large et ${hauteur} m de haut. Quel est son volume en m³ ?`,
        format: "short",
        expected: [String(volume)],
        comparator: "number_equal",
        explanation: "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
          (`Volume = longueur × largeur × hauteur = ${longueur} × ${largeur} × ${hauteur} = ${volume} m³.`) +
          "\n\nConclusion : le volume ou la grandeur obtenu répond à la question.",
        canvas: solideCanvas({
          solide: "pave_droit",
          dimensions: { longueur, largeur, hauteur, volume },
          labels: {
            longueur: `${longueur} m`,
            largeur: `${largeur} m`,
            hauteur: `${hauteur} m`,
            aireBase: `${longueur * largeur} m²`,
          },
          highlight: { base: true, hauteur: true },
          display: { showLabels: true, showDimensions: true },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "5e_volume_defi_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Compare les volumes, pas seulement les hauteurs.",
    tags: ["volume", "defi", "comparaison", "template"],
    generate: () => {
      const aireA = randomChoice([12, 15, 18, 20, 24]);
      const hA = randomInt(3, 8);
      const aireB = randomChoice([10, 16, 21, 25, 30]);
      const hB = randomInt(3, 8);

      const vA = aireA * hA;
      const vB = aireB * hB;

      const correct =
        vA > vB ? "solide A" : vB > vA ? "solide B" : "les deux";

      return {
        text: `Solide A : aire de base ${aireA} cm² et hauteur ${hA} cm. Solide B : aire de base ${aireB} cm² et hauteur ${hB} cm. Lequel a le plus grand volume ?`,
        format: "qcm",
        choices: ["solide A", "solide B", "les deux"],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
          (`Volume A = ${aireA} × ${hA} = ${vA} cm³. Volume B = ${aireB} × ${hB} = ${vB} cm³.`) +
          "\n\nConclusion : le volume ou la grandeur obtenu répond à la question.",
      };
    },
  },

  {
    kind: "template",
    id: "5e_volume_defi_tpl_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Calcule d’abord chaque volume, puis additionne.",
    tags: ["volume", "defi", "assemblage", "template"],
    generate: () => {
      const rayon = randomChoice([2, 3, 4]);
      const hauteurCylindre = randomChoice([4, 5, 6]);
      const coeffCylindre = rayon * rayon * hauteurCylindre;

      const aireBasePrisme = randomChoice([12, 15, 20]);
      const hauteurPrisme = randomChoice([3, 4, 5]);
      const volumePrisme = aireBasePrisme * hauteurPrisme;

      return {
        text: `Un assemblage est formé d’un cylindre de rayon ${rayon} cm et de hauteur ${hauteurCylindre} cm, et d’un prisme droit de volume ${volumePrisme} cm³. Donner le volume total sous la forme aπ + b.`,
        format: "open",
        expected: [String(coeffCylindre), String(volumePrisme), "π"],
        comparator: "contains_keyword",
        explanation: "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
          (`Volume du cylindre = π × ${rayon}² × ${hauteurCylindre} = ${coeffCylindre}π cm³. Volume du prisme = ${volumePrisme} cm³. Volume total = ${coeffCylindre}π + ${volumePrisme} cm³.`) +
          "\n\nConclusion : le volume ou la grandeur obtenu répond à la question.",
        canvas: solideCanvas({
          solide: "cylindre",
          dimensions: { rayon, hauteur: hauteurCylindre },
          labels: {
            rayon: `${rayon} cm`,
            hauteur: `${hauteurCylindre} cm`,
            aireBase: `${rayon * rayon}π cm²`,
          },
          highlight: { base: true, hauteur: true },
          display: { showLabels: true, showDimensions: true },
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "5e_volume_defi_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi la formule Volume = aire de base × hauteur fonctionne pour un prisme droit ou un cylindre.",
    format: "open",
    expected: ["base", "hauteur", "empile", "aire", "volume"],
    comparator: "contains_keyword",
    hint: "Imagine que l’on empile la même base sur toute la hauteur.",
    explanation:
      "Définition : le volume mesure l’espace occupé par un solide.\n\n" +
          "Méthode : on choisit la formule du solide, puis on remplace par les dimensions données.\n\nCalcul : " +
          ("Un prisme droit ou un cylindre peut être vu comme une base que l’on empile sur une certaine hauteur. Le volume est donc l’aire de cette base multipliée par la hauteur.") +
          "\n\nConclusion : le volume ou la grandeur obtenu répond à la question.",
    tags: ["volume", "defi", "open", "raisonnement"],
  },
];