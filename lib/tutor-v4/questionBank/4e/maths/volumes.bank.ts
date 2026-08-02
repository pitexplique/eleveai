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

function makeChoices(correct: string, wrongs: readonly string[]) {
  // Jamais deux fois la même ligne. Un gabarit dont le piège coïncide avec la
  // bonne réponse (les coordonnées inversées quand x = y, un arrondi égal à la
  // valeur de départ…) affichait la même proposition deux fois, et l'élève
  // voyait deux réponses justes. Dédupliquer AVANT de couper à quatre laisse
  // aussi une chance aux distracteurs surnuméraires de prendre la place.
  return shuffle(Array.from(new Set([correct, ...wrongs]))).slice(0, 4);
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

  /* =========================================================
     COMPLÉMENTS (top-up ~10 items / microSkill)
  ========================================================= */

  /* ---------- VOLUME_COMPRENDRE ---------- */

  {
    kind: "fixed",
    id: "volume_comprendre_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Deux solides occupent exactement la même place dans l’espace. Que peut-on dire ?",
    format: "qcm",
    choices: [
      "Ils ont le même volume.",
      "Ils ont la même masse.",
      "Ils ont le même périmètre.",
      "Ils ont la même couleur.",
    ],
    expected: ["Ils ont le même volume."],
    comparator: "mcq_exact",
    hint: "Le volume mesure la place occupée dans l’espace.",
    explanation:
      "Définition : le volume mesure la place occupée par un solide.\n\n" +
      "Méthode : si deux solides occupent la même place, ils ont le même volume.\n\n" +
      "Calcul : aucun calcul n’est nécessaire.\n\n" +
      "Conclusion : ils ont le même volume.",
    tags: ["volume", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "volume_comprendre_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "Une boîte est remplie par 4 rangées de 3 cubes unités, sur 2 étages. Combien de cubes unités contient-elle ?",
    format: "short",
    expected: ["24"],
    comparator: "number_equal",
    hint: "On calcule le nombre de cubes par étage, puis on multiplie par le nombre d’étages.",
    explanation:
      "Définition : le volume en cubes unités est le nombre total de cubes.\n\n" +
      "Méthode : on compte les cubes d’un étage, puis on multiplie par le nombre d’étages.\n\n" +
      "Calcul : $4 \\times 3 = 12$ cubes par étage, puis $12 \\times 2 = 24$.\n\n" +
      "Conclusion : la boîte contient 24 cubes unités.",
    tags: ["volume", "cubes_unite"],
  },

  {
    kind: "fixed",
    id: "volume_comprendre_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "Un solide est formé de 5 cubes unités. On le démonte et on range les 5 cubes autrement. Que devient son volume ?",
    format: "qcm",
    choices: [
      "Il reste égal à 5 unités de volume.",
      "Il augmente.",
      "Il diminue.",
      "Il devient nul.",
    ],
    expected: ["Il reste égal à 5 unités de volume."],
    comparator: "mcq_exact",
    hint: "Le nombre de cubes n’a pas changé.",
    explanation:
      "Définition : le volume dépend du nombre de cubes unités, pas de leur disposition.\n\n" +
      "Méthode : on compte les cubes : il y en a toujours 5.\n\n" +
      "Calcul : 5 cubes restent 5 cubes.\n\n" +
      "Conclusion : le volume reste égal à 5 unités de volume.",
    tags: ["volume", "cubes_unite", "qcm"],
  },

  {
    kind: "fixed",
    id: "volume_comprendre_fixed_6",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Pour mesurer un volume, on choisit comme unité…",
    format: "qcm",
    choices: ["un cube", "un carré", "un segment", "un point"],
    expected: ["un cube"],
    comparator: "mcq_exact",
    hint: "Un volume est une grandeur en trois dimensions.",
    explanation:
      "Définition : un volume se mesure avec une unité en trois dimensions.\n\n" +
      "Méthode : on choisit un petit cube comme unité de volume.\n\n" +
      "Calcul : aucun calcul n’est nécessaire.\n\n" +
      "Conclusion : l’unité de volume est un cube.",
    tags: ["volume", "definition", "qcm"],
  },

  {
    kind: "template",
    id: "volume_comprendre_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_comprendre",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte les cubes unités de la couche.",
    tags: ["volume", "cubes_unite", "template", "canvas"],
    generate: () => {
      const cols = randomInt(2, 4);
      const rows = randomInt(2, 3);
      const n = cols * rows;
      const cubes: { x: number; y: number; z: number }[] = [];
      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          cubes.push({ x, y, z: 0 });
        }
      }
      return {
        text: "Quel est le volume de ce solide en cubes unités ?",
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation:
          `Définition : un cube unité représente 1 unité de volume.\n\n` +
          `Méthode : on compte tous les cubes de la couche.\n\n` +
          `Calcul : $${cols} \\times ${rows} = ${n}$.\n\n` +
          `Conclusion : le volume est ${n} unités de volume.`,
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
    id: "volume_comprendre_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_comprendre",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les cubes par étage, puis multiplie par le nombre d’étages.",
    tags: ["volume", "cubes_unite", "template", "canvas"],
    generate: () => {
      const cols = randomInt(2, 3);
      const rows = randomInt(2, 3);
      const layers = 2;
      const n = cols * rows * layers;
      const cubes: { x: number; y: number; z: number }[] = [];
      for (let z = 0; z < layers; z++) {
        for (let x = 0; x < cols; x++) {
          for (let y = 0; y < rows; y++) {
            cubes.push({ x, y, z });
          }
        }
      }
      return {
        text: "Quel est le volume de ce solide en cubes unités ?",
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation:
          `Définition : le volume en cubes unités est le nombre total de cubes.\n\n` +
          `Méthode : on compte les cubes d’un étage, puis on multiplie par le nombre d’étages.\n\n` +
          `Calcul : $${cols} \\times ${rows} = ${cols * rows}$ par étage, puis $${cols * rows} \\times ${layers} = ${n}$.\n\n` +
          `Conclusion : le volume est ${n} unités de volume.`,
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
    id: "volume_comprendre_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_comprendre",
    difficulty: 3,
    theme: "neutral",
    hint: "Le plus grand volume correspond au plus grand nombre de cubes.",
    tags: ["volume", "cubes_unite", "comparaison", "template"],
    generate: () => {
      const nA = randomInt(5, 12);
      let nB = randomInt(5, 12);
      while (nB === nA) nB = randomInt(5, 12);
      const correct = nA > nB ? "le solide A" : "le solide B";
      return {
        text: `Le solide A est formé de ${nA} cubes unités, le solide B de ${nB} cubes unités. Lequel a le plus grand volume ?`,
        format: "qcm",
        choices: ["le solide A", "le solide B", "les deux ont le même volume"],
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          `Définition : le volume en cubes unités est le nombre de cubes.\n\n` +
          `Méthode : on compare les deux nombres de cubes.\n\n` +
          `Calcul : on compare ${nA} et ${nB}.\n\n` +
          `Conclusion : ${correct} a le plus grand volume.`,
      };
    },
  },

  /* ---------- VOLUME_LIEN_AIRE ---------- */

  {
    kind: "fixed",
    id: "volume_lien_aire_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_lien_aire",
    difficulty: 1,
    theme: "neutral",
    text: "Dans la formule Volume = aire de base × hauteur, que représente l’aire de base ?",
    format: "qcm",
    choices: [
      "l’aire de la face sur laquelle repose le solide",
      "le périmètre de la base",
      "la somme des arêtes",
      "la hauteur du solide",
    ],
    expected: ["l’aire de la face sur laquelle repose le solide"],
    comparator: "mcq_exact",
    hint: "La base est la face du dessous, qui se répète tout le long de la hauteur.",
    explanation:
      "Définition : l’aire de base est l’aire de la face sur laquelle repose le solide.\n\n" +
      "Méthode : on identifie la base, puis on calcule son aire.\n\n" +
      "Calcul : aucun calcul n’est nécessaire ici.\n\n" +
      "Conclusion : l’aire de base est l’aire de la face d’appui du solide.",
    tags: ["volume", "aire_base", "qcm"],
  },

  {
    kind: "fixed",
    id: "volume_lien_aire_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_lien_aire",
    difficulty: 2,
    theme: "neutral",
    text: "L’aire de base d’un solide est 20 cm² et sa hauteur 5 cm. Quel est son volume ?",
    format: "qcm",
    choices: [
      "$100 \\text{ cm}^3$",
      "$25 \\text{ cm}^3$",
      "$4 \\text{ cm}^3$",
      "$15 \\text{ cm}^3$",
    ],
    expected: ["$100 \\text{ cm}^3$"],
    comparator: "mcq_exact",
    hint: "Volume = aire de base × hauteur.",
    explanation:
      "Définition : le volume vaut aire de base × hauteur.\n\n" +
      "Méthode : on multiplie l’aire de base par la hauteur.\n\n" +
      "Calcul : $20 \\times 5 = 100$.\n\n" +
      "Conclusion : le volume est $100 \\text{ cm}^3$.",
    tags: ["volume", "aire_base", "qcm"],
  },

  {
    kind: "fixed",
    id: "volume_lien_aire_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_lien_aire",
    difficulty: 1,
    theme: "neutral",
    text: "Si l’aire de base est en cm² et la hauteur en cm, dans quelle unité s’exprime le volume ?",
    format: "qcm",
    choices: [
      "$\\text{cm}^3$",
      "$\\text{cm}^2$",
      "$\\text{cm}$",
      "$\\text{L}$",
    ],
    expected: ["$\\text{cm}^3$"],
    comparator: "mcq_exact",
    hint: "On multiplie une aire (cm²) par une longueur (cm).",
    explanation:
      "Définition : multiplier une aire par une longueur donne un volume.\n\n" +
      "Méthode : $\\text{cm}^2 \\times \\text{cm} = \\text{cm}^3$.\n\n" +
      "Calcul : les unités se multiplient comme les nombres.\n\n" +
      "Conclusion : le volume est en $\\text{cm}^3$.",
    tags: ["volume", "aire_base", "unite", "qcm"],
  },

  {
    kind: "template",
    id: "volume_lien_aire_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_lien_aire",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplie l’aire de base par la hauteur.",
    tags: ["volume", "aire_base", "template"],
    generate: () => {
      const aireBase = randomChoice([16, 22, 27, 32, 40]);
      const hauteur = randomInt(2, 9);
      const volume = aireBase * hauteur;
      return {
        text: `Un solide a une aire de base de ${aireBase} cm² et une hauteur de ${hauteur} cm. Calculer son volume.`,
        format: "short",
        expected: [String(volume)],
        comparator: "number_equal",
        explanation:
          `Définition : le volume vaut aire de base × hauteur.\n\n` +
          `Méthode : on multiplie l’aire de base par la hauteur.\n\n` +
          `Calcul : $${aireBase} \\times ${hauteur} = ${volume}$.\n\n` +
          `Conclusion : le volume est ${volume} cm³.`,
      };
    },
  },

  {
    kind: "template",
    id: "volume_lien_aire_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_lien_aire",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour retrouver l’aire de base, on divise le volume par la hauteur.",
    tags: ["volume", "aire_base", "inverse", "template"],
    generate: () => {
      const aireBase = randomChoice([12, 15, 18, 20, 24]);
      const hauteur = randomInt(2, 8);
      const volume = aireBase * hauteur;
      return {
        text: `Un prisme a un volume de ${volume} cm³ et une hauteur de ${hauteur} cm. Quelle est l’aire de sa base ?`,
        format: "short",
        expected: [String(aireBase)],
        comparator: "number_equal",
        explanation:
          `Définition : comme Volume = aire de base × hauteur, on a aire de base = volume ÷ hauteur.\n\n` +
          `Méthode : on divise le volume par la hauteur.\n\n` +
          `Calcul : $${volume} \\div ${hauteur} = ${aireBase}$.\n\n` +
          `Conclusion : l’aire de base est ${aireBase} cm².`,
      };
    },
  },

  {
    kind: "template",
    id: "volume_lien_aire_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_lien_aire",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour retrouver la hauteur, on divise le volume par l’aire de base.",
    tags: ["volume", "aire_base", "inverse", "template"],
    generate: () => {
      const aireBase = randomChoice([10, 12, 15, 20, 25]);
      const hauteur = randomInt(2, 9);
      const volume = aireBase * hauteur;
      return {
        text: `Un prisme a un volume de ${volume} cm³ et une aire de base de ${aireBase} cm². Quelle est sa hauteur ?`,
        format: "short",
        expected: [String(hauteur)],
        comparator: "number_equal",
        explanation:
          `Définition : comme Volume = aire de base × hauteur, on a hauteur = volume ÷ aire de base.\n\n` +
          `Méthode : on divise le volume par l’aire de base.\n\n` +
          `Calcul : $${volume} \\div ${aireBase} = ${hauteur}$.\n\n` +
          `Conclusion : la hauteur est ${hauteur} cm.`,
      };
    },
  },

  {
    kind: "template",
    id: "volume_lien_aire_tpl_6",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_lien_aire",
    difficulty: 4,
    theme: "neutral",
    hint: "On utilise l’aire de la base, pas son périmètre.",
    tags: ["volume", "aire_base", "piege", "template"],
    generate: () => {
      const cote = randomInt(3, 7);
      const hauteur = randomInt(3, 8);
      const aireBase = cote * cote;
      const perimetre = cote * 4;
      const volume = aireBase * hauteur;
      return {
        text: `Pour un prisme à base carrée de côté ${cote} cm et de hauteur ${hauteur} cm, un élève calcule ${perimetre} × ${hauteur} = ${perimetre * hauteur}. A-t-il bien calculé le volume ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation:
          `Définition : le volume vaut aire de base × hauteur, et non périmètre × hauteur.\n\n` +
          `Méthode : on calcule d’abord l’aire de base d’un carré : côté × côté.\n\n` +
          `Calcul : aire de base $= ${cote} \\times ${cote} = ${aireBase}$, puis $${aireBase} \\times ${hauteur} = ${volume}$.\n\n` +
          `Conclusion : l’élève a utilisé le périmètre ; le volume est ${volume} cm³.`,
      };
    },
  },

  /* ---------- VOLUME_PAVE ---------- */

  {
    kind: "fixed",
    id: "volume_pave_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_pave",
    difficulty: 1,
    theme: "neutral",
    text: "Le volume d’un pavé droit se calcule par…",
    format: "qcm",
    choices: [
      "longueur × largeur × hauteur",
      "longueur + largeur + hauteur",
      "2 × (longueur + largeur)",
      "longueur × largeur",
    ],
    expected: ["longueur × largeur × hauteur"],
    comparator: "mcq_exact",
    hint: "On multiplie les trois dimensions.",
    explanation:
      "Définition : le volume d’un pavé droit est le produit de ses trois dimensions.\n\n" +
      "Méthode : on multiplie longueur, largeur et hauteur.\n\n" +
      "Calcul : aucun calcul n’est nécessaire ici.\n\n" +
      "Conclusion : Volume = longueur × largeur × hauteur.",
    tags: ["volume", "pave_droit", "formule", "qcm"],
  },

  {
    kind: "fixed",
    id: "volume_pave_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_pave",
    difficulty: 2,
    theme: "neutral",
    text: "Un cube a une arête de 3 cm. Quel est son volume ?",
    format: "qcm",
    choices: [
      "$27 \\text{ cm}^3$",
      "$9 \\text{ cm}^3$",
      "$18 \\text{ cm}^3$",
      "$12 \\text{ cm}^3$",
    ],
    expected: ["$27 \\text{ cm}^3$"],
    comparator: "mcq_exact",
    hint: "Un cube a ses trois dimensions égales.",
    explanation:
      "Définition : un cube est un pavé droit dont les trois dimensions sont égales.\n\n" +
      "Méthode : on multiplie l’arête par elle-même trois fois.\n\n" +
      "Calcul : $3 \\times 3 \\times 3 = 27$.\n\n" +
      "Conclusion : le volume est $27 \\text{ cm}^3$.",
    canvas: solideCanvas({
      solide: "pave_droit",
      dimensions: { longueur: 3, largeur: 3, hauteur: 3 },
      labels: { longueur: "3 cm", largeur: "3 cm", hauteur: "3 cm" },
      highlight: { base: true, hauteur: true },
      display: { showLabels: true, showDimensions: true },
    }),
    tags: ["volume", "cube", "canvas", "qcm"],
  },

  {
    kind: "fixed",
    id: "volume_pave_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_pave",
    difficulty: 2,
    theme: "neutral",
    text: "Une boîte cubique a une arête de 10 cm. Quel est son volume ?",
    format: "qcm",
    choices: [
      "$1000 \\text{ cm}^3$",
      "$100 \\text{ cm}^3$",
      "$300 \\text{ cm}^3$",
      "$30 \\text{ cm}^3$",
    ],
    expected: ["$1000 \\text{ cm}^3$"],
    comparator: "mcq_exact",
    hint: "Volume d’un cube = arête × arête × arête.",
    explanation:
      "Définition : le volume d’un cube est arête × arête × arête.\n\n" +
      "Méthode : on multiplie l’arête trois fois.\n\n" +
      "Calcul : $10 \\times 10 \\times 10 = 1000$.\n\n" +
      "Conclusion : le volume est $1000 \\text{ cm}^3$.",
    tags: ["volume", "cube", "qcm"],
  },

  {
    kind: "template",
    id: "volume_pave_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_pave",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplie l’arête par elle-même trois fois.",
    tags: ["volume", "cube", "template", "canvas"],
    generate: () => {
      const a = randomInt(2, 8);
      const volume = a * a * a;
      return {
        text: `Calculer le volume d’un cube d’arête ${a} cm.`,
        format: "short",
        expected: [String(volume)],
        comparator: "number_equal",
        explanation:
          `Définition : le volume d’un cube est arête × arête × arête.\n\n` +
          `Méthode : on multiplie l’arête trois fois.\n\n` +
          `Calcul : $${a} \\times ${a} \\times ${a} = ${volume}$.\n\n` +
          `Conclusion : le volume est ${volume} cm³.`,
        canvas: solideCanvas({
          solide: "pave_droit",
          dimensions: { longueur: a, largeur: a, hauteur: a },
          labels: { longueur: `${a} cm`, largeur: `${a} cm`, hauteur: `${a} cm` },
          highlight: { base: true, hauteur: true },
          display: { showLabels: true, showDimensions: true },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "volume_pave_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_pave",
    difficulty: 3,
    theme: "neutral",
    hint: "Volume = longueur × largeur × hauteur.",
    tags: ["volume", "pave_droit", "template"],
    generate: () => {
      const longueur = randomInt(4, 12);
      const largeur = randomInt(2, 9);
      const hauteur = randomInt(2, 8);
      const volume = longueur * largeur * hauteur;
      return {
        text: `Un pavé droit mesure ${longueur} cm de long, ${largeur} cm de large et ${hauteur} cm de haut. Quel est son volume ?`,
        format: "short",
        expected: [String(volume)],
        comparator: "number_equal",
        explanation:
          `Définition : le volume d’un pavé droit est longueur × largeur × hauteur.\n\n` +
          `Méthode : on multiplie les trois dimensions.\n\n` +
          `Calcul : $${longueur} \\times ${largeur} \\times ${hauteur} = ${volume}$.\n\n` +
          `Conclusion : le volume est ${volume} cm³.`,
      };
    },
  },

  {
    kind: "template",
    id: "volume_pave_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_pave",
    difficulty: 4,
    theme: "neutral",
    hint: "Pour retrouver la hauteur, divise le volume par l’aire de la base.",
    tags: ["volume", "pave_droit", "inverse", "template"],
    generate: () => {
      const longueur = randomInt(3, 8);
      const largeur = randomInt(2, 6);
      const hauteur = randomInt(2, 8);
      const aireBase = longueur * largeur;
      const volume = aireBase * hauteur;
      return {
        text: `Un pavé droit a un volume de ${volume} cm³. Sa base est un rectangle de ${longueur} cm sur ${largeur} cm. Quelle est sa hauteur ?`,
        format: "short",
        expected: [String(hauteur)],
        comparator: "number_equal",
        explanation:
          `Définition : Volume = aire de base × hauteur, donc hauteur = volume ÷ aire de base.\n\n` +
          `Méthode : on calcule l’aire de base, puis on divise le volume par cette aire.\n\n` +
          `Calcul : aire de base $= ${longueur} \\times ${largeur} = ${aireBase}$, puis $${volume} \\div ${aireBase} = ${hauteur}$.\n\n` +
          `Conclusion : la hauteur est ${hauteur} cm.`,
      };
    },
  },

  {
    kind: "template",
    id: "volume_pave_tpl_6",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_pave",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour un volume, on multiplie les trois dimensions (pas seulement deux).",
    tags: ["volume", "pave_droit", "piege", "template"],
    generate: () => {
      const longueur = randomInt(3, 9);
      const largeur = randomInt(2, 7);
      const hauteur = randomInt(2, 8);
      const volume = longueur * largeur * hauteur;
      return {
        text: `Pour un pavé droit de ${longueur} cm sur ${largeur} cm et de hauteur ${hauteur} cm, un élève répond ${longueur * largeur} cm³. A-t-il trouvé le bon volume ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation:
          `Définition : le volume d’un pavé droit est longueur × largeur × hauteur.\n\n` +
          `Méthode : l’élève a oublié de multiplier par la hauteur.\n\n` +
          `Calcul : $${longueur} \\times ${largeur} \\times ${hauteur} = ${volume}$.\n\n` +
          `Conclusion : le bon volume est ${volume} cm³, l’élève a tort.`,
      };
    },
  },

  /* ---------- VOLUME_PRISME ---------- */

  {
    kind: "fixed",
    id: "volume_prisme_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_prisme",
    difficulty: 1,
    theme: "neutral",
    text: "Un prisme droit a deux bases identiques. Son volume se calcule par…",
    format: "qcm",
    choices: [
      "aire de base × hauteur",
      "périmètre de base × hauteur",
      "aire de base + hauteur",
      "aire de base × aire de base",
    ],
    expected: ["aire de base × hauteur"],
    comparator: "mcq_exact",
    hint: "On empile la base sur toute la hauteur.",
    explanation:
      "Définition : un prisme droit garde la même base le long de sa hauteur.\n\n" +
      "Méthode : on multiplie l’aire de cette base par la hauteur.\n\n" +
      "Calcul : aucun calcul n’est nécessaire ici.\n\n" +
      "Conclusion : Volume = aire de base × hauteur.",
    tags: ["volume", "prisme", "formule", "qcm"],
  },

  {
    kind: "fixed",
    id: "volume_prisme_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_prisme",
    difficulty: 2,
    theme: "neutral",
    text: "Un prisme droit a une base triangulaire d’aire 12 cm² et une hauteur de 5 cm. Quel est son volume ?",
    format: "qcm",
    choices: [
      "$60 \\text{ cm}^3$",
      "$17 \\text{ cm}^3$",
      "$30 \\text{ cm}^3$",
      "$120 \\text{ cm}^3$",
    ],
    expected: ["$60 \\text{ cm}^3$"],
    comparator: "mcq_exact",
    hint: "Volume = aire de base × hauteur.",
    explanation:
      "Définition : le volume d’un prisme droit est aire de base × hauteur.\n\n" +
      "Méthode : on multiplie l’aire de la base triangulaire par la hauteur.\n\n" +
      "Calcul : $12 \\times 5 = 60$.\n\n" +
      "Conclusion : le volume est $60 \\text{ cm}^3$.",
    tags: ["volume", "prisme", "triangle_base", "qcm"],
  },

  {
    kind: "fixed",
    id: "volume_prisme_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_prisme",
    difficulty: 3,
    theme: "neutral",
    text: "La base d’un prisme droit est un triangle rectangle dont les côtés de l’angle droit mesurent 3 cm et 4 cm. La hauteur du prisme est 10 cm. Quel est son volume ?",
    format: "qcm",
    choices: [
      "$60 \\text{ cm}^3$",
      "$120 \\text{ cm}^3$",
      "$70 \\text{ cm}^3$",
      "$30 \\text{ cm}^3$",
    ],
    expected: ["$60 \\text{ cm}^3$"],
    comparator: "mcq_exact",
    hint: "Aire d’un triangle rectangle = (côté × côté) ÷ 2.",
    explanation:
      "Définition : le volume d’un prisme droit est aire de base × hauteur.\n\n" +
      "Méthode : on calcule l’aire du triangle rectangle, puis on multiplie par la hauteur.\n\n" +
      "Calcul : aire $= (3 \\times 4) \\div 2 = 6$, puis $6 \\times 10 = 60$.\n\n" +
      "Conclusion : le volume est $60 \\text{ cm}^3$.",
    tags: ["volume", "prisme", "triangle_base", "qcm"],
  },

  {
    kind: "template",
    id: "volume_prisme_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_prisme",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplie l’aire de base par la hauteur.",
    tags: ["volume", "prisme", "template"],
    generate: () => {
      const aireBase = randomChoice([14, 16, 20, 27, 33]);
      const hauteur = randomInt(3, 11);
      const volume = aireBase * hauteur;
      return {
        text: `Un prisme droit a une aire de base de ${aireBase} cm² et une hauteur de ${hauteur} cm. Quel est son volume ?`,
        format: "short",
        expected: [String(volume)],
        comparator: "number_equal",
        explanation:
          `Définition : le volume d’un prisme droit est aire de base × hauteur.\n\n` +
          `Méthode : on multiplie l’aire de base par la hauteur.\n\n` +
          `Calcul : $${aireBase} \\times ${hauteur} = ${volume}$.\n\n` +
          `Conclusion : le volume est ${volume} cm³.`,
      };
    },
  },

  {
    kind: "template",
    id: "volume_prisme_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_prisme",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule d’abord l’aire du triangle de base.",
    tags: ["volume", "prisme", "triangle_base", "template"],
    generate: () => {
      const base = randomChoice([4, 6, 8, 10]);
      const hauteurTriangle = randomChoice([3, 5, 6]);
      const hauteurPrisme = randomInt(4, 9);
      const aireBase = (base * hauteurTriangle) / 2;
      const volume = aireBase * hauteurPrisme;
      return {
        text: `La base d’un prisme droit est un triangle de base ${base} cm et de hauteur ${hauteurTriangle} cm. La hauteur du prisme est ${hauteurPrisme} cm. Quel est son volume ?`,
        format: "short",
        expected: [formatNumber(volume)],
        comparator: "number_equal",
        explanation:
          `Définition : le volume d’un prisme droit est aire de base × hauteur.\n\n` +
          `Méthode : on calcule l’aire du triangle de base, puis on multiplie par la hauteur du prisme.\n\n` +
          `Calcul : aire $= ${base} \\times ${hauteurTriangle} \\div 2 = ${formatNumber(aireBase)}$, puis $${formatNumber(aireBase)} \\times ${hauteurPrisme} = ${formatNumber(volume)}$.\n\n` +
          `Conclusion : le volume est ${formatNumber(volume)} cm³.`,
      };
    },
  },

  {
    kind: "template",
    id: "volume_prisme_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_prisme",
    difficulty: 3,
    theme: "neutral",
    hint: "La base est un rectangle : aire = longueur × largeur.",
    tags: ["volume", "prisme", "rectangle_base", "template"],
    generate: () => {
      const longueur = randomInt(4, 9);
      const largeur = randomInt(2, 6);
      const hauteur = randomInt(3, 10);
      const aireBase = longueur * largeur;
      const volume = aireBase * hauteur;
      return {
        text: `Un prisme droit a pour base un rectangle de ${longueur} cm sur ${largeur} cm. Sa hauteur est ${hauteur} cm. Quel est son volume ?`,
        format: "short",
        expected: [String(volume)],
        comparator: "number_equal",
        explanation:
          `Définition : le volume d’un prisme droit est aire de base × hauteur.\n\n` +
          `Méthode : on calcule l’aire du rectangle de base, puis on multiplie par la hauteur.\n\n` +
          `Calcul : aire $= ${longueur} \\times ${largeur} = ${aireBase}$, puis $${aireBase} \\times ${hauteur} = ${volume}$.\n\n` +
          `Conclusion : le volume est ${volume} cm³.`,
      };
    },
  },

  {
    kind: "template",
    id: "volume_prisme_tpl_6",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_prisme",
    difficulty: 4,
    theme: "neutral",
    hint: "Pour retrouver la hauteur, divise le volume par l’aire de base.",
    tags: ["volume", "prisme", "inverse", "template"],
    generate: () => {
      const aireBase = randomChoice([12, 15, 18, 24]);
      const hauteur = randomInt(3, 9);
      const volume = aireBase * hauteur;
      return {
        text: `Un prisme droit a un volume de ${volume} cm³ et une aire de base de ${aireBase} cm². Quelle est sa hauteur ?`,
        format: "short",
        expected: [String(hauteur)],
        comparator: "number_equal",
        explanation:
          `Définition : Volume = aire de base × hauteur, donc hauteur = volume ÷ aire de base.\n\n` +
          `Méthode : on divise le volume par l’aire de base.\n\n` +
          `Calcul : $${volume} \\div ${aireBase} = ${hauteur}$.\n\n` +
          `Conclusion : la hauteur est ${hauteur} cm.`,
      };
    },
  },

  /* ---------- VOLUME_CYLINDRE ---------- */

  {
    kind: "fixed",
    id: "volume_cylindre_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_cylindre",
    difficulty: 1,
    theme: "neutral",
    text: "L’aire de base d’un cylindre (un disque) se calcule par…",
    format: "qcm",
    choices: [
      "$\\pi \\times r^2$",
      "$2 \\times \\pi \\times r$",
      "$\\pi \\times r$",
      "$r^2$",
    ],
    expected: ["$\\pi \\times r^2$"],
    comparator: "mcq_exact",
    hint: "L’aire d’un disque de rayon r est π × r².",
    explanation:
      "Définition : la base d’un cylindre est un disque.\n\n" +
      "Méthode : l’aire d’un disque de rayon $r$ est $\\pi \\times r^2$.\n\n" +
      "Calcul : aucun calcul n’est nécessaire ici.\n\n" +
      "Conclusion : l’aire de base est $\\pi \\times r^2$.",
    tags: ["volume", "cylindre", "aire_base", "qcm"],
  },

  {
    kind: "fixed",
    id: "volume_cylindre_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_cylindre",
    difficulty: 2,
    theme: "neutral",
    text: "Un cylindre a une aire de base de 9π cm² et une hauteur de 2 cm. Quel est son volume ?",
    format: "qcm",
    choices: [
      "$18\\pi \\text{ cm}^3$",
      "$11\\pi \\text{ cm}^3$",
      "$9\\pi \\text{ cm}^3$",
      "$36\\pi \\text{ cm}^3$",
    ],
    expected: ["$18\\pi \\text{ cm}^3$"],
    comparator: "mcq_exact",
    hint: "Volume = aire de base × hauteur.",
    explanation:
      "Définition : le volume d’un cylindre est aire de base × hauteur.\n\n" +
      "Méthode : on multiplie l’aire du disque par la hauteur.\n\n" +
      "Calcul : $9\\pi \\times 2 = 18\\pi$.\n\n" +
      "Conclusion : le volume est $18\\pi \\text{ cm}^3$.",
    tags: ["volume", "cylindre", "pi", "qcm"],
  },

  {
    kind: "fixed",
    id: "volume_cylindre_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_cylindre",
    difficulty: 2,
    theme: "neutral",
    text: "Un cylindre a une aire de base de 16π cm² et une hauteur de 5 cm. Quel est son volume ?",
    format: "qcm",
    choices: [
      "$80\\pi \\text{ cm}^3$",
      "$21\\pi \\text{ cm}^3$",
      "$16\\pi \\text{ cm}^3$",
      "$40\\pi \\text{ cm}^3$",
    ],
    expected: ["$80\\pi \\text{ cm}^3$"],
    comparator: "mcq_exact",
    hint: "Volume = aire de base × hauteur.",
    explanation:
      "Définition : le volume d’un cylindre est aire de base × hauteur.\n\n" +
      "Méthode : on multiplie l’aire du disque par la hauteur.\n\n" +
      "Calcul : $16\\pi \\times 5 = 80\\pi$.\n\n" +
      "Conclusion : le volume est $80\\pi \\text{ cm}^3$.",
    tags: ["volume", "cylindre", "pi", "qcm"],
  },

  {
    kind: "template",
    id: "volume_cylindre_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_cylindre",
    difficulty: 3,
    theme: "neutral",
    hint: "Aire de base = π × r², puis on multiplie par la hauteur.",
    tags: ["volume", "cylindre", "pi", "template", "canvas"],
    generate: () => {
      const rayon = randomChoice([2, 3, 4, 5, 6]);
      const hauteur = randomInt(2, 9);
      const r2 = rayon * rayon;
      const coeff = r2 * hauteur;
      return {
        text: `Un cylindre a un rayon de ${rayon} cm et une hauteur de ${hauteur} cm. Donner son volume sous la forme aπ.`,
        format: "short",
        expected: [`${coeff}π`, `${coeff} pi`, `${coeff}`],
        comparator: "contains_keyword",
        explanation:
          `Définition : le volume d’un cylindre est π × rayon² × hauteur.\n\n` +
          `Méthode : on calcule l’aire du disque, puis on multiplie par la hauteur.\n\n` +
          `Calcul : $\\pi \\times ${rayon}^2 = ${r2}\\pi$, puis $${r2}\\pi \\times ${hauteur} = ${coeff}\\pi$.\n\n` +
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
    id: "volume_cylindre_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_cylindre",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplie l’aire de base (en π) par la hauteur.",
    tags: ["volume", "cylindre", "pi", "qcm", "template"],
    generate: () => {
      const aireCoeff = randomChoice([4, 9, 16, 25]);
      const hauteur = randomInt(2, 6);
      const volume = aireCoeff * hauteur;
      const correct = `$${volume}\\pi \\text{ cm}^3$`;
      const wrongs = [
        `$${aireCoeff + hauteur}\\pi \\text{ cm}^3$`,
        `$${aireCoeff}\\pi \\text{ cm}^3$`,
        `$${volume * 2}\\pi \\text{ cm}^3$`,
      ];
      return {
        text: `Un cylindre a une aire de base de ${aireCoeff}π cm² et une hauteur de ${hauteur} cm. Quel est son volume ?`,
        format: "qcm",
        choices: makeChoices(correct, wrongs),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          `Définition : le volume d’un cylindre est aire de base × hauteur.\n\n` +
          `Méthode : on multiplie l’aire du disque par la hauteur.\n\n` +
          `Calcul : $${aireCoeff}\\pi \\times ${hauteur} = ${volume}\\pi$.\n\n` +
          `Conclusion : le volume est $${volume}\\pi \\text{ cm}^3$.`,
      };
    },
  },

  {
    kind: "template",
    id: "volume_cylindre_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_cylindre",
    difficulty: 4,
    theme: "neutral",
    hint: "Volume = π × r² × hauteur, avec π ≈ 3,14.",
    tags: ["volume", "cylindre", "valeur_approchee", "template"],
    generate: () => {
      const [rayon, hauteur] = randomChoice([
        [2, 5],
        [2, 10],
        [3, 5],
        [3, 10],
        [4, 5],
        [5, 2],
      ]) as [number, number];
      const v = Math.round(3.14 * rayon * rayon * hauteur * 100) / 100;
      const vPoint = String(v);
      const vComma = vPoint.replace(".", ",");
      return {
        text: `Un cylindre a un rayon de ${rayon} cm et une hauteur de ${hauteur} cm. Calculer son volume en cm³ (prendre π ≈ 3,14).`,
        format: "short",
        expected: [vPoint, vComma],
        comparator: "number_equal",
        explanation:
          `Définition : le volume d’un cylindre est π × rayon² × hauteur.\n\n` +
          `Méthode : on remplace π par 3,14 et on calcule.\n\n` +
          `Calcul : $3{,}14 \\times ${rayon}^2 \\times ${hauteur} = ${vComma}$.\n\n` +
          `Conclusion : le volume est environ ${vComma} cm³.`,
      };
    },
  },

  {
    kind: "template",
    id: "volume_cylindre_tpl_6",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_cylindre",
    difficulty: 4,
    theme: "neutral",
    hint: "Attention : on donne le diamètre, pas le rayon.",
    tags: ["volume", "cylindre", "diametre", "piege", "template"],
    generate: () => {
      const rayon = randomChoice([2, 3, 4, 5]);
      const diametre = rayon * 2;
      const hauteur = randomInt(2, 8);
      const coeff = rayon * rayon * hauteur;
      return {
        text: `Un cylindre a un diamètre de ${diametre} cm et une hauteur de ${hauteur} cm. Donner son volume sous la forme aπ.`,
        format: "short",
        expected: [`${coeff}π`, `${coeff} pi`, `${coeff}`],
        comparator: "contains_keyword",
        explanation:
          `Définition : le volume d’un cylindre est π × rayon² × hauteur.\n\n` +
          `Méthode : on trouve d’abord le rayon (moitié du diamètre), puis on applique la formule.\n\n` +
          `Calcul : $${diametre} \\div 2 = ${rayon}$, puis $\\pi \\times ${rayon}^2 \\times ${hauteur} = ${coeff}\\pi$.\n\n` +
          `Conclusion : le volume est ${coeff}π cm³.`,
      };
    },
  },

  /* ---------- VOLUME_UNITE ---------- */

  {
    kind: "fixed",
    id: "volume_unite_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_unite",
    difficulty: 2,
    theme: "neutral",
    text: "1 L correspond à…",
    format: "qcm",
    choices: ["1 dm³", "1 cm³", "1 m³", "10 dm³"],
    expected: ["1 dm³"],
    comparator: "mcq_exact",
    hint: "Le litre est l’unité de contenance liée au dm³.",
    explanation:
      "Définition : 1 litre correspond à 1 dm³.\n\n" +
      "Méthode : on retient l’égalité 1 L = 1 dm³.\n\n" +
      "Calcul : aucun calcul n’est nécessaire.\n\n" +
      "Conclusion : 1 L = 1 dm³.",
    tags: ["volume", "litre", "unite", "qcm"],
  },

  {
    kind: "fixed",
    id: "volume_unite_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_unite",
    difficulty: 3,
    theme: "neutral",
    text: "1 m³ correspond à combien de dm³ ?",
    format: "qcm",
    choices: ["1 000 dm³", "100 dm³", "10 dm³", "10 000 dm³"],
    expected: ["1 000 dm³"],
    comparator: "mcq_exact",
    hint: "1 m = 10 dm, donc 1 m³ = 10 × 10 × 10 dm³.",
    explanation:
      "Définition : convertir un volume demande de convertir les trois dimensions.\n\n" +
      "Méthode : comme 1 m = 10 dm, alors 1 m³ = 10 × 10 × 10 dm³.\n\n" +
      "Calcul : $10^3 = 1\\,000$.\n\n" +
      "Conclusion : 1 m³ = 1 000 dm³.",
    tags: ["volume", "conversion", "unite", "qcm"],
  },

  {
    kind: "template",
    id: "volume_unite_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_unite",
    difficulty: 2,
    theme: "neutral",
    hint: "1 L = 1 000 cm³.",
    tags: ["volume", "litre", "conversion", "template"],
    generate: () => {
      const litres = randomChoice([2, 3, 4, 5, 6, 10]);
      const cm3 = litres * 1000;
      return {
        text: `${litres} L correspondent à combien de cm³ ?`,
        format: "short",
        expected: [String(cm3)],
        comparator: "number_equal",
        explanation:
          `Définition : 1 L = 1 dm³ = 1 000 cm³.\n\n` +
          `Méthode : on multiplie le nombre de litres par 1 000.\n\n` +
          `Calcul : $${litres} \\times 1\\,000 = ${cm3}$.\n\n` +
          `Conclusion : ${litres} L correspondent à ${cm3} cm³.`,
      };
    },
  },

  {
    kind: "template",
    id: "volume_unite_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_unite",
    difficulty: 3,
    theme: "neutral",
    hint: "1 dm³ = 1 000 cm³, donc on divise par 1 000.",
    tags: ["volume", "conversion", "template"],
    generate: () => {
      const dm3 = randomChoice([2, 3, 4, 5, 7, 9]);
      const cm3 = dm3 * 1000;
      return {
        text: `${cm3} cm³ correspondent à combien de dm³ ?`,
        format: "short",
        expected: [String(dm3)],
        comparator: "number_equal",
        explanation:
          `Définition : 1 dm³ = 1 000 cm³.\n\n` +
          `Méthode : on divise le nombre de cm³ par 1 000.\n\n` +
          `Calcul : $${cm3} \\div 1\\,000 = ${dm3}$.\n\n` +
          `Conclusion : ${cm3} cm³ correspondent à ${dm3} dm³.`,
      };
    },
  },

  {
    kind: "template",
    id: "volume_unite_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_unite",
    difficulty: 3,
    theme: "neutral",
    hint: "1 m³ = 1 000 dm³.",
    tags: ["volume", "conversion", "template"],
    generate: () => {
      const m3 = randomChoice([2, 3, 4, 5, 8]);
      const dm3 = m3 * 1000;
      return {
        text: `${m3} m³ correspondent à combien de dm³ ?`,
        format: "short",
        expected: [String(dm3)],
        comparator: "number_equal",
        explanation:
          `Définition : 1 m³ = 1 000 dm³.\n\n` +
          `Méthode : on multiplie le nombre de m³ par 1 000.\n\n` +
          `Calcul : $${m3} \\times 1\\,000 = ${dm3}$.\n\n` +
          `Conclusion : ${m3} m³ correspondent à ${dm3} dm³.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "volume_unite_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_unite",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève affirme : « 1 dm³ = 100 cm³ ». A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Pour un volume, on convertit les trois dimensions : 1 dm = 10 cm.",
    explanation:
      "Définition : convertir un volume demande de convertir les trois dimensions.\n\n" +
      "Méthode : comme 1 dm = 10 cm, alors 1 dm³ = 10 × 10 × 10 cm³.\n\n" +
      "Calcul : $10^3 = 1\\,000$, pas 100.\n\n" +
      "Conclusion : l’élève a tort, 1 dm³ = 1 000 cm³.",
    tags: ["volume", "conversion", "piege", "qcm"],
  },

  /* ---------- VOLUME_DEFIS ---------- */

  {
    kind: "fixed",
    id: "volume_defi_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un cube a une arête de 4 cm. Un pavé droit mesure 8 cm sur 4 cm et 2 cm de haut. Lequel a le plus grand volume ?",
    format: "qcm",
    choices: ["le cube", "le pavé", "ils ont le même volume", "impossible à dire"],
    expected: ["ils ont le même volume"],
    comparator: "mcq_exact",
    hint: "Calcule les deux volumes avant de comparer.",
    explanation:
      "Définition : on compare deux volumes en les calculant.\n\n" +
      "Méthode : volume d’un pavé droit = produit des trois dimensions.\n\n" +
      "Calcul : cube $= 4 \\times 4 \\times 4 = 64$ ; pavé $= 8 \\times 4 \\times 2 = 64$.\n\n" +
      "Conclusion : les deux ont le même volume, 64 cm³.",
    tags: ["volume", "defi", "comparaison", "qcm"],
  },

  {
    kind: "template",
    id: "volume_defi_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "1 L = 1 dm³ : le volume en dm³ donne directement le nombre de litres.",
    tags: ["volume", "defi", "litre", "pave", "template"],
    generate: () => {
      const longueur = randomInt(3, 8);
      const largeur = randomInt(2, 6);
      const hauteur = randomInt(2, 5);
      const volume = longueur * largeur * hauteur;
      return {
        text: `Un aquarium en forme de pavé droit mesure ${longueur} dm de long, ${largeur} dm de large et ${hauteur} dm de haut. Combien de litres d’eau peut-il contenir ?`,
        format: "short",
        expected: [String(volume)],
        comparator: "number_equal",
        explanation:
          `Définition : le volume d’un pavé droit est longueur × largeur × hauteur, et 1 dm³ = 1 L.\n\n` +
          `Méthode : on calcule le volume en dm³, qui donne directement le nombre de litres.\n\n` +
          `Calcul : $${longueur} \\times ${largeur} \\times ${hauteur} = ${volume}$ dm³ $= ${volume}$ L.\n\n` +
          `Conclusion : l’aquarium peut contenir ${volume} litres.`,
        canvas: solideCanvas({
          solide: "pave_droit",
          dimensions: { longueur, largeur, hauteur, volume },
          labels: {
            longueur: `${longueur} dm`,
            largeur: `${largeur} dm`,
            hauteur: `${hauteur} dm`,
            aireBase: `${longueur * largeur} dm²`,
          },
          highlight: { base: true, hauteur: true },
          display: { showLabels: true, showDimensions: true },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "volume_defi_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Volume d’un cylindre = π × r² × hauteur, avec π ≈ 3,14.",
    tags: ["volume", "defi", "cylindre", "valeur_approchee", "template"],
    generate: () => {
      const [rayon, hauteur] = randomChoice([
        [2, 5],
        [3, 4],
        [2, 8],
        [4, 3],
        [5, 4],
      ]) as [number, number];
      const v = Math.round(3.14 * rayon * rayon * hauteur * 100) / 100;
      const vPoint = String(v);
      const vComma = vPoint.replace(".", ",");
      return {
        text: `Un seau cylindrique a un rayon de ${rayon} cm et une hauteur de ${hauteur} cm. Quel est son volume en cm³ (prendre π ≈ 3,14) ?`,
        format: "short",
        expected: [vPoint, vComma],
        comparator: "number_equal",
        explanation:
          `Définition : le volume d’un cylindre est π × rayon² × hauteur.\n\n` +
          `Méthode : on remplace π par 3,14 et on calcule.\n\n` +
          `Calcul : $3{,}14 \\times ${rayon}^2 \\times ${hauteur} = ${vComma}$.\n\n` +
          `Conclusion : le volume est environ ${vComma} cm³.`,
      };
    },
  },

  {
    kind: "template",
    id: "volume_defi_tpl_6",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Combien de petits cubes tiennent sur la longueur, la largeur et la hauteur ?",
    tags: ["volume", "defi", "denombrement", "template"],
    generate: () => {
      const a = 2;
      const nL = randomInt(2, 5);
      const nl = randomInt(2, 4);
      const nh = randomInt(2, 4);
      const longueur = nL * a;
      const largeur = nl * a;
      const hauteur = nh * a;
      const total = nL * nl * nh;
      return {
        text: `On range des petits cubes de ${a} cm d’arête dans une caisse en pavé droit de ${longueur} cm × ${largeur} cm × ${hauteur} cm. Combien de cubes peut-on ranger ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation:
          `Définition : on compte combien de petits cubes tiennent dans chaque direction.\n\n` +
          `Méthode : on divise chaque dimension par l’arête du cube, puis on multiplie les résultats.\n\n` +
          `Calcul : $${longueur} \\div ${a} = ${nL}$, $${largeur} \\div ${a} = ${nl}$, $${hauteur} \\div ${a} = ${nh}$, puis $${nL} \\times ${nl} \\times ${nh} = ${total}$.\n\n` +
          `Conclusion : on peut ranger ${total} cubes.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "volume_defi_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique comment passer d’un volume exprimé en dm³ à un volume exprimé en litres, et donne un exemple.",
    format: "open",
    expected: ["litre", "dm", "égal", "1"],
    comparator: "contains_keyword",
    hint: "Pense à l’égalité entre le litre et le dm³.",
    explanation:
      "Définition : le litre est l’unité de contenance liée au dm³.\n\n" +
      "Méthode : comme 1 L = 1 dm³, un volume en dm³ donne directement le même nombre de litres.\n\n" +
      "Calcul : par exemple, 5 dm³ = 5 L.\n\n" +
      "Conclusion : pour passer des dm³ aux litres, on garde le même nombre car 1 dm³ = 1 L.",
    tags: ["volume", "defi", "open", "litre"],
  },
];