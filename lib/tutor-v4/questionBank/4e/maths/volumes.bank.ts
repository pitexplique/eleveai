// lib/tutor-v4/question-banks/maths/4e/volumes.bank.ts

/**
 * =========================================================
 * VOLUMES.BANK.TS
 * =========================================================
 *
 * Banque de questions Tutor V4 - Mathématiques 4e
 * Notion : Volumes
 *
 * Micro-compétences :
 * - volume_comprendre
 * - volume_lien_aire
 * - volume_pave
 * - volume_prisme
 * - volume_cylindre
 * - volume_unites
 * - volume_defis
 *
 * Choix pédagogiques :
 * - progression du simple vers le complexe ;
 * - priorité aux templates ;
 * - usage du Solide3DCanvas ;
 * - base colorée pour ancrer l'idée :
 *      Volume = aire de base × hauteur
 * - défis contextualisés et courts.
 */

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

function makeChoices(correct: string, wrongs: string[]) {
  return shuffle([correct, ...wrongs]).slice(0, 4);
}

function solideCanvas(params: Omit<Solide3DCanvasData, "kind">): Solide3DCanvasData {
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
    id: "volume_comprendre_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Que mesure un volume ?",
    format: "qcm",
    choices: [
      "la place occupée par un solide",
      "la longueur d’un contour",
      "la surface d’une figure",
      "la masse d’un objet",
    ],
    expected: ["la place occupée par un solide"],
    comparator: "mcq_exact",
    hint: "Le volume concerne un objet en 3 dimensions.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide dans l’espace.\n\n" +
      "Méthode : on repère qu’il s’agit d’une grandeur en trois dimensions.\n\n" +
      "Calcul : aucun calcul n’est nécessaire.\n\n" +
      "Conclusion : un volume mesure la place occupée.",
    tags: ["volume", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "volume_comprendre_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Un solide est formé de 6 cubes unités. Quel est son volume ?",
    format: "qcm",
    choices: ["3 unités de volume", "6 unités de volume", "12 unités de volume", "36 unités de volume"],
    expected: ["6 unités de volume"],
    comparator: "mcq_exact",
    hint: "Chaque petit cube compte pour 1 unité de volume.",
    explanation:
      "Définition : un cube unité représente 1 unité de volume.\n\n" +
      "Méthode : on compte tous les cubes unités du solide.\n\n" +
      "Calcul : il y a 6 cubes unités.\n\n" +
      "Conclusion : le volume est 6 unités de volume.",
    canvas: solideCanvas({
      solide: "assemblage_cubes",
      cubes: [
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 0, z: 0 },
        { x: 0, y: 1, z: 0 },
        { x: 1, y: 1, z: 0 },
        { x: 0, y: 0, z: 1 },
        { x: 1, y: 0, z: 1 },
      ],
      display: { showLabels: true },
    }),
    tags: ["volume", "cubes_unite", "canvas"],
  },

  {
    kind: "template",
    id: "volume_comprendre_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_comprendre",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte les cubes unités.",
    tags: ["volume", "cubes_unite", "template", "canvas"],
    generate: () => {
      const n = randomInt(4, 10);
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
        explanation:
          `Définition : un cube unité représente 1 unité de volume.\n\n` +
          `Méthode : on compte les cubes unités du solide.\n\n` +
          `Calcul : il y a ${n} cubes unités.\n\n` +
          `Conclusion : le volume est ${n} unités de volume.`,
        canvas: solideCanvas({
          solide: "assemblage_cubes",
          cubes,
          display: { showLabels: true },
        }),
      };
    },
  },

  /* =========================
     VOLUME_LIEN_AIRE
  ========================= */

  {
    kind: "fixed",
    id: "volume_lien_aire_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_lien_aire",
    difficulty: 1,
    theme: "neutral",
    text: "Pour calculer le volume d’un prisme ou d’un cylindre, on utilise souvent la formule…",
    format: "qcm",
    choices: [
      "Volume = aire de base × hauteur",
      "Volume = périmètre × hauteur",
      "Volume = longueur + largeur + hauteur",
      "Volume = aire de base + hauteur",
    ],
    expected: ["Volume = aire de base × hauteur"],
    comparator: "mcq_exact",
    hint: "On empile une base sur une certaine hauteur.",
    explanation:
      "Définition : pour un prisme droit ou un cylindre, le volume est l’aire de base multipliée par la hauteur.\n\n" +
      "Méthode : on utilise la formule Volume = aire de base × hauteur.\n\n" +
      "Calcul : aucun calcul n’est nécessaire ici.\n\n" +
      "Conclusion : la bonne formule est Volume = aire de base × hauteur.",
    tags: ["volume", "aire_base", "formule"],
  },

  {
    kind: "template",
    id: "volume_lien_aire_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_lien_aire",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplie l’aire de la base par la hauteur.",
    tags: ["volume", "aire_base", "template", "canvas"],
    generate: () => {
      const aireBase = randomChoice([12, 15, 18, 20, 24, 30]);
      const hauteur = randomInt(3, 9);
      const volume = aireBase * hauteur;

      return {
        text: `Un solide a une aire de base de ${aireBase} cm² et une hauteur de ${hauteur} cm. Quel est son volume ?`,
        format: "short",
        expected: [String(volume)],
        comparator: "number_equal",
        explanation:
          `Définition : le volume se calcule par aire de base × hauteur.\n\n` +
          `Méthode : on multiplie l’aire de base par la hauteur.\n\n` +
          `Calcul : ${aireBase} × ${hauteur} = ${volume}.\n\n` +
          `Conclusion : le volume est ${volume} cm³.`,
        canvas: solideCanvas({
          solide: "prisme",
          dimensions: { aireBase, hauteur },
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
    id: "volume_lien_aire_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_lien_aire",
    difficulty: 3,
    theme: "neutral",
    hint: "La base est déjà donnée : il ne reste qu’à multiplier par la hauteur.",
    tags: ["volume", "aire_base", "piege", "template"],
    generate: () => {
      const aireBase = randomChoice([10, 14, 16, 25, 28]);
      const hauteur = randomInt(2, 8);
      const volume = aireBase * hauteur;

      return {
        text: `Un élève dit : « L’aire de base vaut ${aireBase} cm² et la hauteur vaut ${hauteur} cm, donc le volume vaut ${aireBase + hauteur} cm³. » A-t-il raison ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation:
          `Définition : le volume se calcule par aire de base × hauteur.\n\n` +
          `Méthode : on multiplie, on n’additionne pas.\n\n` +
          `Calcul : ${aireBase} × ${hauteur} = ${volume}.\n\n` +
          `Conclusion : l’élève a tort, le volume est ${volume} cm³.`,
      };
    },
  },

  /* =========================
     VOLUME_PAVE
  ========================= */

  {
    kind: "fixed",
    id: "volume_pave_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_pave",
    difficulty: 2,
    theme: "neutral",
    text: "Un pavé droit mesure 4 cm de longueur, 3 cm de largeur et 5 cm de hauteur. Quel est son volume ?",
    format: "qcm",
    choices: ["12 cm³", "20 cm³", "60 cm³", "45 cm³"],
    expected: ["60 cm³"],
    comparator: "mcq_exact",
    hint: "Volume = longueur × largeur × hauteur.",
    explanation:
      "Définition : le volume d’un pavé droit est longueur × largeur × hauteur.\n\n" +
      "Méthode : on multiplie les trois dimensions.\n\n" +
      "Calcul : 4 × 3 × 5 = 60.\n\n" +
      "Conclusion : le volume est 60 cm³.",
    canvas: solideCanvas({
      solide: "pave_droit",
      dimensions: { longueur: 4, largeur: 3, hauteur: 5 },
      labels: {
        longueur: "4 cm",
        largeur: "3 cm",
        hauteur: "5 cm",
        aireBase: "12 cm²",
      },
      highlight: { base: true, hauteur: true },
      display: { showLabels: true, showDimensions: true },
    }),
    tags: ["volume", "pave_droit", "canvas"],
  },

  {
    kind: "template",
    id: "volume_pave_tpl_1",
    niveau: "4e",
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
      const hauteur = randomInt(2, 9);
      const aireBase = longueur * largeur;
      const volume = aireBase * hauteur;

      return {
        text: `Calculer le volume du pavé droit.`,
        format: "short",
        expected: [String(volume)],
        comparator: "number_equal",
        explanation:
          `Définition : le volume d’un pavé droit est aire de base × hauteur.\n\n` +
          `Méthode : on calcule l’aire de la base, puis on multiplie par la hauteur.\n\n` +
          `Calcul : ${longueur} × ${largeur} = ${aireBase}, puis ${aireBase} × ${hauteur} = ${volume}.\n\n` +
          `Conclusion : le volume est ${volume} cm³.`,
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
    id: "volume_pave_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_pave",
    difficulty: 3,
    theme: "neutral",
    hint: "Commence par calculer l’aire de la base.",
    tags: ["volume", "pave_droit", "aire_base", "template"],
    generate: () => {
      const longueur = randomInt(5, 12);
      const largeur = randomInt(3, 8);
      const hauteur = randomInt(2, 10);
      const aireBase = longueur * largeur;
      const volume = aireBase * hauteur;

      return {
        text: `La base d’un pavé droit est un rectangle de ${longueur} cm sur ${largeur} cm. Sa hauteur est ${hauteur} cm. Quel est son volume ?`,
        format: "short",
        expected: [String(volume)],
        comparator: "number_equal",
        explanation:
          `Définition : le volume d’un pavé droit est aire de base × hauteur.\n\n` +
          `Méthode : on calcule l’aire de la base, puis on multiplie par la hauteur.\n\n` +
          `Calcul : ${longueur} × ${largeur} = ${aireBase}, puis ${aireBase} × ${hauteur} = ${volume}.\n\n` +
          `Conclusion : le volume est ${volume} cm³.`,
        canvas: solideCanvas({
          solide: "pave_droit",
          dimensions: { longueur, largeur, hauteur },
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

  /* =========================
     VOLUME_PRISME
  ========================= */

  {
    kind: "fixed",
    id: "volume_prisme_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_prisme",
    difficulty: 2,
    theme: "neutral",
    text: "Un prisme droit a une aire de base de 18 cm² et une hauteur de 7 cm. Quel est son volume ?",
    format: "qcm",
    choices: ["25 cm³", "126 cm³", "63 cm³", "36 cm³"],
    expected: ["126 cm³"],
    comparator: "mcq_exact",
    hint: "Volume = aire de base × hauteur.",
    explanation:
      "Définition : le volume d’un prisme droit est aire de base × hauteur.\n\n" +
      "Méthode : on multiplie l’aire de base par la hauteur.\n\n" +
      "Calcul : 18 × 7 = 126.\n\n" +
      "Conclusion : le volume est 126 cm³.",
    canvas: solideCanvas({
      solide: "prisme",
      dimensions: { aireBase: 18, hauteur: 7 },
      labels: { aireBase: "18 cm²", hauteur: "7 cm" },
      highlight: { base: true, hauteur: true },
      display: { showLabels: true, showDimensions: true, showFormulaHint: true },
    }),
    tags: ["volume", "prisme", "canvas"],
  },

  {
    kind: "template",
    id: "volume_prisme_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_prisme",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplie l’aire de la base par la hauteur.",
    tags: ["volume", "prisme", "template", "canvas"],
    generate: () => {
      const aireBase = randomChoice([12, 15, 18, 21, 24, 30, 36]);
      const hauteur = randomInt(3, 12);
      const volume = aireBase * hauteur;

      return {
        text: `Un prisme droit a une aire de base de ${aireBase} cm² et une hauteur de ${hauteur} cm. Calculer son volume.`,
        format: "short",
        expected: [String(volume)],
        comparator: "number_equal",
        explanation:
          `Définition : le volume d’un prisme droit est aire de base × hauteur.\n\n` +
          `Méthode : on multiplie l’aire de base par la hauteur.\n\n` +
          `Calcul : ${aireBase} × ${hauteur} = ${volume}.\n\n` +
          `Conclusion : le volume est ${volume} cm³.`,
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
    id: "volume_prisme_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_prisme",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule d’abord l’aire du triangle de base.",
    tags: ["volume", "prisme", "triangle_base", "template"],
    generate: () => {
      const base = randomChoice([4, 6, 8, 10, 12]);
      const hauteurTriangle = randomChoice([3, 5, 6, 8]);
      const hauteurPrisme = randomInt(4, 10);
      const aireBase = (base * hauteurTriangle) / 2;
      const volume = aireBase * hauteurPrisme;

      return {
        text: `La base d’un prisme droit est un triangle de base ${base} cm et de hauteur ${hauteurTriangle} cm. La hauteur du prisme est ${hauteurPrisme} cm. Quel est son volume ?`,
        format: "short",
        expected: [formatNumber(volume)],
        comparator: "number_equal",
        explanation:
          `Définition : le volume d’un prisme droit est aire de base × hauteur.\n\n` +
          `Méthode : on calcule d’abord l’aire de la base triangulaire, puis on multiplie par la hauteur du prisme.\n\n` +
          `Calcul : ${base} × ${hauteurTriangle} ÷ 2 = ${formatNumber(aireBase)}, puis ${formatNumber(aireBase)} × ${hauteurPrisme} = ${formatNumber(volume)}.\n\n` +
          `Conclusion : le volume est ${formatNumber(volume)} cm³.`,
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
    id: "volume_cylindre_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_cylindre",
    difficulty: 2,
    theme: "neutral",
    text: "Un cylindre a une aire de base de 25π cm² et une hauteur de 4 cm. Quel est son volume ?",
    format: "qcm",
    choices: ["29π cm³", "100π cm³", "50π cm³", "25π cm³"],
    expected: ["100π cm³"],
    comparator: "mcq_exact",
    hint: "Volume = aire de base × hauteur.",
    explanation:
      "Définition : le volume d’un cylindre est aire de base × hauteur.\n\n" +
      "Méthode : on multiplie l’aire du disque de base par la hauteur.\n\n" +
      "Calcul : 25π × 4 = 100π.\n\n" +
      "Conclusion : le volume est 100π cm³.",
    canvas: solideCanvas({
      solide: "cylindre",
      dimensions: { rayon: 5, hauteur: 4 },
      labels: {
        rayon: "5 cm",
        hauteur: "4 cm",
        aireBase: "25π cm²",
      },
      highlight: { base: true, hauteur: true },
      display: { showLabels: true, showDimensions: true, showFormulaHint: true },
    }),
    tags: ["volume", "cylindre", "pi", "canvas"],
  },

  {
    kind: "template",
    id: "volume_cylindre_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_cylindre",
    difficulty: 3,
    theme: "neutral",
    hint: "Aire de base d’un disque : π × r².",
    tags: ["volume", "cylindre", "template", "canvas"],
    generate: () => {
      const rayon = randomChoice([2, 3, 4, 5, 6]);
      const hauteur = randomInt(3, 10);
      const r2 = rayon * rayon;
      const coeff = r2 * hauteur;

      return {
        text: `Un cylindre a un rayon de ${rayon} cm et une hauteur de ${hauteur} cm. Donner son volume sous la forme aπ.`,
        format: "short",
        expected: [`${coeff}π`, `${coeff} pi`, `${coeff}`],
        comparator: "contains_keyword",
        explanation:
          `Définition : le volume d’un cylindre est aire de base × hauteur.\n\n` +
          `Méthode : on calcule l’aire du disque de base, puis on multiplie par la hauteur.\n\n` +
          `Calcul : π × ${rayon}² = ${r2}π, puis ${r2}π × ${hauteur} = ${coeff}π.\n\n` +
          `Conclusion : le volume est ${coeff}π cm³.`,
        canvas: solideCanvas({
          solide: "cylindre",
          dimensions: { rayon, hauteur },
          labels: {
            rayon: `${rayon} cm`,
            hauteur: `${hauteur} cm`,
            aireBase: `${r2}π cm²`,
          },
          highlight: { base: true, hauteur: true },
          display: { showLabels: true, showDimensions: true, showFormulaHint: true },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "volume_cylindre_tpl_2",
    niveau: "4e",
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
      const hauteur = randomInt(3, 9);
      const coeff = rayon * rayon * hauteur;

      return {
        text: `Un cylindre a un diamètre de ${diametre} cm et une hauteur de ${hauteur} cm. Donner son volume sous la forme aπ.`,
        format: "short",
        expected: [`${coeff}π`, `${coeff} pi`, `${coeff}`],
        comparator: "contains_keyword",
        explanation:
          `Définition : le volume d’un cylindre est π × rayon² × hauteur.\n\n` +
          `Méthode : on trouve d’abord le rayon, puis on applique la formule.\n\n` +
          `Calcul : ${diametre} ÷ 2 = ${rayon}, puis π × ${rayon}² × ${hauteur} = ${coeff}π.\n\n` +
          `Conclusion : le volume est ${coeff}π cm³.`,
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

  /* =========================
     VOLUME_UNITES
  ========================= */

  {
    kind: "fixed",
    id: "volume_unite_fixed_1",
    niveau: "4e",
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
      "Définition : une unité de volume est une unité au cube.\n\n" +
      "Méthode : on cherche l’unité écrite avec un exposant 3.\n\n" +
      "Calcul : cm³ signifie centimètre cube.\n\n" +
      "Conclusion : cm³ est une unité de volume.",
    tags: ["volume", "unite"],
  },

  {
    kind: "fixed",
    id: "volume_unite_fixed_2",
    niveau: "4e",
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
    explanation:
      "Définition : convertir un volume demande de convertir les trois dimensions.\n\n" +
      "Méthode : comme 1 dm = 10 cm, alors 1 dm³ = 10 × 10 × 10 cm³.\n\n" +
      "Calcul : 10³ = 1 000.\n\n" +
      "Conclusion : 1 dm³ = 1 000 cm³.",
    tags: ["volume", "conversion", "unite"],
  },

  {
    kind: "template",
    id: "volume_unite_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_unite",
    difficulty: 3,
    theme: "neutral",
    hint: "1 L = 1 dm³.",
    tags: ["volume", "litre", "conversion", "template"],
    generate: () => {
      const litres = randomChoice([2, 3, 4, 5, 10, 12]);
      return {
        text: `${litres} L correspondent à combien de dm³ ?`,
        format: "short",
        expected: [String(litres)],
        comparator: "number_equal",
        explanation:
          `Définition : 1 litre correspond à 1 dm³.\n\n` +
          `Méthode : on remplace chaque litre par un dm³.\n\n` +
          `Calcul : ${litres} L = ${litres} dm³.\n\n` +
          `Conclusion : ${litres} L correspondent à ${litres} dm³.`,
      };
    },
  },

  {
    kind: "template",
    id: "volume_unite_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_unite",
    difficulty: 4,
    theme: "neutral",
    hint: "1 dm³ = 1 000 cm³.",
    tags: ["volume", "conversion", "template"],
    generate: () => {
      const dm3 = randomChoice([2, 3, 4, 5, 6, 8]);
      const cm3 = dm3 * 1000;

      return {
        text: `${dm3} dm³ correspondent à combien de cm³ ?`,
        format: "short",
        expected: [String(cm3)],
        comparator: "number_equal",
        explanation:
          `Définition : 1 dm³ vaut 1 000 cm³.\n\n` +
          `Méthode : on multiplie le nombre de dm³ par 1 000.\n\n` +
          `Calcul : ${dm3} × 1 000 = ${cm3}.\n\n` +
          `Conclusion : ${dm3} dm³ correspondent à ${cm3} cm³.`,
      };
    },
  },

  /* =========================
     VOLUME_DEFIS
  ========================= */

  {
    kind: "fixed",
    id: "volume_defi_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève calcule le volume d’un pavé droit de dimensions 5 cm, 4 cm et 3 cm. Il écrit : 5 + 4 + 3 = 12 cm³. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Pour un volume de pavé droit, on multiplie les trois dimensions.",
    explanation:
      "Définition : le volume d’un pavé droit est le produit de ses trois dimensions.\n\n" +
      "Méthode : on multiplie les dimensions, on ne les additionne pas.\n\n" +
      "Calcul : 5 × 4 × 3 = 60.\n\n" +
      "Conclusion : l’élève a tort, le volume est 60 cm³.",
    tags: ["volume", "defi", "erreur"],
  },

  {
    kind: "template",
    id: "volume_defi_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_defi",
    difficulty: 4,
    theme: "reunion",
    hint: "Modélise la réserve par un pavé droit.",
    tags: ["volume", "defi", "reunion", "pave", "template"],
    generate: () => {
      const longueur = randomInt(4, 9);
      const largeur = randomInt(2, 5);
      const hauteur = randomInt(2, 6);
      const volume = longueur * largeur * hauteur;

      return {
        text: `À La Réunion, une petite réserve d’eau a la forme d’un pavé droit de ${longueur} m de long, ${largeur} m de large et ${hauteur} m de haut. Quel est son volume en m³ ?`,
        format: "short",
        expected: [String(volume)],
        comparator: "number_equal",
        explanation:
          `Définition : le volume d’un pavé droit est longueur × largeur × hauteur.\n\n` +
          `Méthode : on multiplie les trois dimensions de la réserve.\n\n` +
          `Calcul : ${longueur} × ${largeur} × ${hauteur} = ${volume}.\n\n` +
          `Conclusion : le volume est ${volume} m³.`,
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
    id: "volume_defi_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Compare les volumes, pas seulement les hauteurs.",
    tags: ["volume", "defi", "comparaison", "template"],
    generate: () => {
      const aireA = randomChoice([12, 15, 20, 24]);
      const hA = randomInt(4, 8);
      const aireB = randomChoice([10, 18, 22, 30]);
      const hB = randomInt(3, 9);
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
        explanation:
          `Définition : pour comparer deux solides, on compare leurs volumes.\n\n` +
          `Méthode : on calcule chaque volume avec aire de base × hauteur.\n\n` +
          `Calcul : A = ${aireA} × ${hA} = ${vA} cm³ ; B = ${aireB} × ${hB} = ${vB} cm³.\n\n` +
          `Conclusion : ${
            correct === "les deux"
              ? "les deux solides ont le même volume"
              : `le plus grand volume est celui de ${correct}`
          }.`,
      };
    },
  },

  {
    kind: "template",
    id: "volume_defi_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Attention : il faut d’abord trouver le rayon.",
    tags: ["volume", "defi", "cylindre", "diametre", "template"],
    generate: () => {
      const rayon = randomChoice([2, 3, 4]);
      const diametre = rayon * 2;
      const hauteur = randomChoice([5, 6, 8, 10]);
      const coeff = rayon * rayon * hauteur;

      return {
        text: `Un réservoir cylindrique a un diamètre de ${diametre} m et une hauteur de ${hauteur} m. Donner son volume sous la forme aπ.`,
        format: "short",
        expected: [`${coeff}π`, `${coeff} pi`, `${coeff}`],
        comparator: "contains_keyword",
        explanation:
          `Définition : le volume d’un cylindre est π × rayon² × hauteur.\n\n` +
          `Méthode : on utilise le rayon, pas le diamètre, puis on applique la formule.\n\n` +
          `Calcul : ${diametre} ÷ 2 = ${rayon}, puis π × ${rayon}² × ${hauteur} = ${coeff}π.\n\n` +
          `Conclusion : le volume est ${coeff}π m³.`,
        canvas: solideCanvas({
          solide: "cylindre",
          dimensions: { rayon, hauteur },
          labels: {
            rayon: `${rayon} m`,
            hauteur: `${hauteur} m`,
            aireBase: `${rayon * rayon}π m²`,
          },
          highlight: { base: true, hauteur: true },
          display: { showLabels: true, showDimensions: true },
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "volume_defi_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi la formule Volume = aire de base × hauteur fonctionne pour un prisme droit.",
    format: "open",
    expected: ["base", "hauteur", "empile", "aire"],
    comparator: "contains_keyword",
    hint: "Imagine que l’on empile la même base plusieurs fois.",
    explanation:
      "Définition : un prisme droit garde la même base tout le long de sa hauteur.\n\n" +
      "Méthode : on imagine la base empilée régulièrement sur la hauteur.\n\n" +
      "Calcul : aire de base × hauteur donne la place occupée par l’empilement.\n\n" +
      "Conclusion : la formule Volume = aire de base × hauteur fonctionne pour un prisme droit.",
    tags: ["volume", "defi", "open", "raisonnement"],
  },
];