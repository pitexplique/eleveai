// lib/tutor-v4/question-banks/maths/3e/volumes.bank.ts

/**
 * =========================================================
 * VOLUMES.BANK.TS — 3e
 * =========================================================
 *
 * Banque de questions Tutor V4 - Mathématiques 3e
 * Notion : Volumes
 *
 * Micro-compétences :
 * - volume_comprendre
 * - volume_pave
 * - volume_prisme
 * - volume_cylindre
 * - volume_boule
 * - volume_agrandissement_reduction
 * - volume_unites
 * - volume_defis
 *
 * Choix pédagogiques :
 * - consolidation des volumes de 5e / 4e ;
 * - introduction de la boule ;
 * - lien avec l’homothétie : effet du coefficient k sur les volumes ;
 * - usage du Solide3DCanvas ;
 * - questions fixed + template + short + qcm + open.
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
    id: "3e_volume_comprendre_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "volumes",
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
    hint: "Le volume concerne un objet en trois dimensions.",
    explanation:
      "Le volume mesure la place occupée par un solide dans l’espace. Il s’exprime en unités cubes comme cm³, dm³ ou m³.",
    tags: ["volume", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_volume_comprendre_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle formule générale permet de calculer le volume d’un prisme droit ou d’un cylindre ?",
    format: "qcm",
    choices: [
      "Volume = aire de base × hauteur",
      "Volume = périmètre de base × hauteur",
      "Volume = aire de base + hauteur",
      "Volume = longueur + largeur + hauteur",
    ],
    expected: ["Volume = aire de base × hauteur"],
    comparator: "mcq_exact",
    hint: "On empile une même base sur une certaine hauteur.",
    explanation:
      "Pour un prisme droit ou un cylindre, on peut voir le solide comme une base que l’on empile sur une hauteur. On utilise donc V = aire de base × hauteur.",
    tags: ["volume", "aire_base", "formule", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_volume_comprendre_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_comprendre",
    difficulty: 3,
    theme: "neutral",
    text: "Explique en une phrase pourquoi un volume s’exprime avec une unité au cube.",
    format: "open",
    expected: ["trois", "dimensions", "cube", "longueur", "largeur", "hauteur"],
    comparator: "contains_keyword",
    hint: "Un volume dépend de trois dimensions.",
    explanation:
      "Un volume dépend de trois dimensions : longueur, largeur et hauteur. C’est pour cela qu’on utilise des unités cubes comme cm³.",
    tags: ["volume", "open", "raisonnement"],
  },

  {
    kind: "template",
    id: "3e_volume_comprendre_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_comprendre",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte les cubes unités.",
    tags: ["volume", "cubes_unites", "template", "canvas"],
    generate: () => {
      const n = randomInt(8, 20);

      const cubes = Array.from({ length: n }, (_, i) => ({
        x: i % 4,
        y: Math.floor(i / 4) % 2,
        z: Math.floor(i / 8),
      }));

      return {
        text: "Quel est le volume du solide en cubes unités ?",
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation: `On compte ${n} cubes unités. Le volume est donc ${n} unités de volume.`,
        canvas: solideCanvas({
          solide: "assemblage_cubes",
          cubes,
          display: { showLabels: true },
        }),
      };
    },
  },

  /* =========================
     VOLUME_PAVE
  ========================= */

  {
    kind: "fixed",
    id: "3e_volume_pave_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_pave",
    difficulty: 2,
    theme: "neutral",
    text: "Un pavé droit mesure 8 cm de longueur, 5 cm de largeur et 4 cm de hauteur. Quel est son volume ?",
    format: "qcm",
    choices: ["17 cm³", "40 cm³", "160 cm³", "80 cm³"],
    expected: ["160 cm³"],
    comparator: "mcq_exact",
    hint: "Volume = longueur × largeur × hauteur.",
    explanation:
      "Le volume d’un pavé droit vaut longueur × largeur × hauteur. Donc V = 8 × 5 × 4 = 160 cm³.",
    canvas: solideCanvas({
      solide: "pave_droit",
      dimensions: { longueur: 8, largeur: 5, hauteur: 4, volume: 160 },
      labels: {
        longueur: "8 cm",
        largeur: "5 cm",
        hauteur: "4 cm",
        aireBase: "40 cm²",
      },
      highlight: { base: true, hauteur: true },
      display: { showLabels: true, showDimensions: true, showFormulaHint: true },
    }),
    tags: ["volume", "pave_droit", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "3e_volume_pave_erreur_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_pave",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève calcule le volume d’un pavé droit de dimensions 7 cm, 4 cm et 3 cm. Il écrit : 7 + 4 + 3 = 14 cm³. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Pour un volume de pavé droit, on multiplie les trois dimensions.",
    explanation:
      "Non. Il ne faut pas additionner les dimensions. Le volume vaut 7 × 4 × 3 = 84 cm³.",
    tags: ["volume", "pave_droit", "erreur", "qcm"],
  },

  {
    kind: "template",
    id: "3e_volume_pave_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_pave",
    difficulty: 2,
    theme: "neutral",
    hint: "Calcule longueur × largeur × hauteur.",
    tags: ["volume", "pave_droit", "template", "canvas"],
    generate: () => {
      const longueur = randomInt(4, 12);
      const largeur = randomInt(3, 9);
      const hauteur = randomInt(2, 8);
      const aireBase = longueur * largeur;
      const volume = aireBase * hauteur;

      return {
        text: "Calculer le volume du pavé droit.",
        format: "short",
        expected: [String(volume)],
        comparator: "number_equal",
        explanation: `Aire de base = ${longueur} × ${largeur} = ${aireBase} cm². Volume = ${aireBase} × ${hauteur} = ${volume} cm³.`,
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
    id: "3e_volume_pave_tpl_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_pave",
    difficulty: 3,
    theme: "reunion",
    hint: "Modélise la réserve par un pavé droit.",
    tags: ["volume", "pave_droit", "probleme", "reunion", "template", "canvas"],
    generate: () => {
      const longueur = randomInt(4, 10);
      const largeur = randomInt(2, 6);
      const hauteur = randomInt(2, 5);
      const volume = longueur * largeur * hauteur;

      return {
        text: `À La Réunion, une petite réserve d’eau a la forme d’un pavé droit de ${longueur} m de long, ${largeur} m de large et ${hauteur} m de haut. Quel est son volume en m³ ?`,
        format: "short",
        expected: [String(volume)],
        comparator: "number_equal",
        explanation: `Volume = ${longueur} × ${largeur} × ${hauteur} = ${volume} m³.`,
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

  /* =========================
     VOLUME_PRISME
  ========================= */

  {
    kind: "fixed",
    id: "3e_volume_prisme_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_prisme",
    difficulty: 2,
    theme: "neutral",
    text: "Un prisme droit a une aire de base de 24 cm² et une hauteur de 9 cm. Quel est son volume ?",
    format: "qcm",
    choices: ["33 cm³", "108 cm³", "216 cm³", "72 cm³"],
    expected: ["216 cm³"],
    comparator: "mcq_exact",
    hint: "Volume = aire de base × hauteur.",
    explanation:
      "V = aire de base × hauteur = 24 × 9 = 216 cm³.",
    canvas: solideCanvas({
      solide: "prisme",
      dimensions: { aireBase: 24, hauteur: 9, volume: 216 },
      labels: {
        aireBase: "24 cm²",
        hauteur: "9 cm",
      },
      highlight: { base: true, hauteur: true },
      display: { showLabels: true, showDimensions: true, showFormulaHint: true },
    }),
    tags: ["volume", "prisme", "qcm", "canvas"],
  },

  {
    kind: "template",
    id: "3e_volume_prisme_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_prisme",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplie l’aire de base par la hauteur.",
    tags: ["volume", "prisme", "template", "canvas"],
    generate: () => {
      const aireBase = randomChoice([12, 15, 18, 20, 24, 30, 36, 40]);
      const hauteur = randomInt(4, 12);
      const volume = aireBase * hauteur;

      return {
        text: `Un prisme droit a une aire de base de ${aireBase} cm² et une hauteur de ${hauteur} cm. Calculer son volume.`,
        format: "short",
        expected: [String(volume)],
        comparator: "number_equal",
        explanation: `V = aire de base × hauteur = ${aireBase} × ${hauteur} = ${volume} cm³.`,
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
    id: "3e_volume_prisme_tpl_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_prisme",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule d’abord l’aire du triangle de base.",
    tags: ["volume", "prisme", "triangle_base", "template", "canvas"],
    generate: () => {
      const base = randomChoice([6, 8, 10, 12, 14]);
      const hauteurTriangle = randomChoice([4, 5, 6, 8]);
      const hauteurPrisme = randomInt(5, 12);
      const aireBase = (base * hauteurTriangle) / 2;
      const volume = aireBase * hauteurPrisme;

      return {
        text: `La base d’un prisme droit est un triangle de base ${base} cm et de hauteur ${hauteurTriangle} cm. La hauteur du prisme est ${hauteurPrisme} cm. Quel est son volume ?`,
        format: "short",
        expected: [formatNumber(volume)],
        comparator: "number_equal",
        explanation: `Aire de la base triangulaire = ${base} × ${hauteurTriangle} ÷ 2 = ${formatNumber(
          aireBase
        )} cm². Volume = ${formatNumber(aireBase)} × ${hauteurPrisme} = ${formatNumber(
          volume
        )} cm³.`,
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
    id: "3e_volume_cylindre_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_cylindre",
    difficulty: 2,
    theme: "neutral",
    text: "Un cylindre a un rayon de 4 cm et une hauteur de 7 cm. Donner son volume sous la forme aπ.",
    format: "qcm",
    choices: ["28π cm³", "56π cm³", "112π cm³", "196π cm³"],
    expected: ["112π cm³"],
    comparator: "mcq_exact",
    hint: "Volume = π × r² × hauteur.",
    explanation:
      "Aire de base = π × 4² = 16π cm². Volume = 16π × 7 = 112π cm³.",
    canvas: solideCanvas({
      solide: "cylindre",
      dimensions: { rayon: 4, hauteur: 7 },
      labels: {
        rayon: "4 cm",
        hauteur: "7 cm",
        aireBase: "16π cm²",
      },
      highlight: { base: true, hauteur: true },
      display: { showLabels: true, showDimensions: true, showFormulaHint: true },
    }),
    tags: ["volume", "cylindre", "pi", "qcm", "canvas"],
  },

  {
    kind: "template",
    id: "3e_volume_cylindre_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_cylindre",
    difficulty: 3,
    theme: "neutral",
    hint: "Aire de base d’un disque : π × r².",
    tags: ["volume", "cylindre", "pi", "template", "canvas"],
    generate: () => {
      const rayon = randomChoice([2, 3, 4, 5, 6]);
      const hauteur = randomInt(4, 12);
      const r2 = rayon * rayon;
      const coeff = r2 * hauteur;

      return {
        text: `Un cylindre a un rayon de ${rayon} cm et une hauteur de ${hauteur} cm. Donner son volume sous la forme aπ.`,
        format: "short",
        expected: [`${coeff}π`, `${coeff} pi`, `${coeff}`],
        comparator: "contains_keyword",
        explanation: `Aire de base = π × ${rayon}² = ${r2}π cm². Volume = ${r2}π × ${hauteur} = ${coeff}π cm³.`,
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
    id: "3e_volume_cylindre_tpl_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_cylindre",
    difficulty: 4,
    theme: "neutral",
    hint: "Attention : le rayon est la moitié du diamètre.",
    tags: ["volume", "cylindre", "diametre", "piege", "template", "canvas"],
    generate: () => {
      const rayon = randomChoice([2, 3, 4, 5]);
      const diametre = rayon * 2;
      const hauteur = randomChoice([5, 6, 8, 10]);
      const coeff = rayon * rayon * hauteur;

      return {
        text: `Un cylindre a un diamètre de ${diametre} cm et une hauteur de ${hauteur} cm. Donner son volume sous la forme aπ.`,
        format: "short",
        expected: [`${coeff}π`, `${coeff} pi`, `${coeff}`],
        comparator: "contains_keyword",
        explanation: `Le rayon vaut ${diametre} ÷ 2 = ${rayon} cm. Volume = π × ${rayon}² × ${hauteur} = ${coeff}π cm³.`,
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
    id: "3e_volume_cylindre_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_cylindre",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi le volume d’un cylindre de rayon r et de hauteur h vaut π × r² × h.",
    format: "open",
    expected: ["aire", "base", "disque", "hauteur", "π"],
    comparator: "contains_keyword",
    hint: "La base est un disque.",
    explanation:
      "La base d’un cylindre est un disque d’aire π × r². Le volume est donc aire de base × hauteur, soit π × r² × h.",
    tags: ["volume", "cylindre", "open", "raisonnement"],
  },

  /* =========================
     VOLUME_BOULE
  ========================= */

  {
    kind: "fixed",
    id: "3e_volume_boule_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_boule",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle formule donne le volume d’une boule de rayon r ?",
    format: "qcm",
    choices: [
      "V = 4πr²",
      "V = (4/3)πr³",
      "V = πr²h",
      "V = aire de base × hauteur",
    ],
    expected: ["V = (4/3)πr³"],
    comparator: "mcq_exact",
    hint: "Le volume d’une boule fait intervenir r³.",
    explanation:
      "Le volume d’une boule de rayon r est donné par la formule V = (4/3)πr³.",
    tags: ["volume", "boule", "formule", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_volume_boule_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_boule",
    difficulty: 3,
    theme: "neutral",
    text: "Une boule a un rayon de 3 cm. Donner son volume sous la forme aπ.",
    format: "qcm",
    choices: ["12π cm³", "27π cm³", "36π cm³", "108π cm³"],
    expected: ["36π cm³"],
    comparator: "mcq_exact",
    hint: "Utilise V = (4/3)πr³.",
    explanation:
      "V = (4/3)π × 3³ = (4/3)π × 27 = 36π cm³.",
    canvas: solideCanvas({
      solide: "boule",
      dimensions: { rayon: 3 },
      labels: { rayon: "3 cm" },
      display: { showLabels: true, showDimensions: true },
    }),
    tags: ["volume", "boule", "pi", "qcm", "canvas"],
  },

  {
    kind: "template",
    id: "3e_volume_boule_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_boule",
    difficulty: 3,
    theme: "neutral",
    hint: "Utilise V = (4/3)πr³.",
    tags: ["volume", "boule", "template", "pi", "canvas"],
    generate: () => {
      const rayon = randomChoice([3, 6, 9]);
      const coeff = (4 * rayon * rayon * rayon) / 3;

      return {
        text: `Une boule a un rayon de ${rayon} cm. Donner son volume sous la forme aπ.`,
        format: "short",
        expected: [`${formatNumber(coeff)}π`, `${formatNumber(coeff)} pi`, `${formatNumber(coeff)}`],
        comparator: "contains_keyword",
        explanation: `V = (4/3)π × ${rayon}³ = ${formatNumber(coeff)}π cm³.`,
        canvas: solideCanvas({
          solide: "boule",
          dimensions: { rayon },
          labels: { rayon: `${rayon} cm` },
          display: { showLabels: true, showDimensions: true },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "3e_volume_boule_tpl_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_boule",
    difficulty: 4,
    theme: "neutral",
    hint: "Le diamètre est le double du rayon.",
    tags: ["volume", "boule", "diametre", "piege", "template", "canvas"],
    generate: () => {
      const rayon = randomChoice([2, 3, 4, 5, 6]);
      const diametre = 2 * rayon;
      const coeff = (4 * rayon * rayon * rayon) / 3;

      return {
        text: `Une boule a un diamètre de ${diametre} cm. Donner son volume sous la forme aπ.`,
        format: "short",
        expected: [`${formatNumber(coeff)}π`, `${formatNumber(coeff)} pi`, `${formatNumber(coeff)}`],
        comparator: "contains_keyword",
        explanation: `Le rayon vaut ${diametre} ÷ 2 = ${rayon} cm. Donc V = (4/3)π × ${rayon}³ = ${formatNumber(coeff)}π cm³.`,
        canvas: solideCanvas({
          solide: "boule",
          dimensions: { rayon },
          labels: {
            rayon: `${rayon} cm`,
            diametre: `${diametre} cm`,
          },
          display: { showLabels: true, showDimensions: true },
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_volume_boule_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_boule",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi il faut utiliser le rayon, et non le diamètre, dans la formule du volume d’une boule.",
    format: "open",
    expected: ["rayon", "diamètre", "moitié", "formule"],
    comparator: "contains_keyword",
    hint: "La formule contient r, pas d.",
    explanation:
      "La formule V = (4/3)πr³ utilise le rayon r. Si on connaît le diamètre, il faut d’abord le diviser par 2 pour trouver le rayon.",
    tags: ["volume", "boule", "open", "raisonnement"],
  },

  /* =========================
     VOLUME_AGRANDISSEMENT_REDUCTION
  ========================= */

  {
    kind: "fixed",
    id: "3e_volume_agrandissement_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_agrandissement_reduction",
    difficulty: 3,
    theme: "neutral",
    text: "Lors d’un agrandissement de rapport 2, par combien le volume est-il multiplié ?",
    format: "qcm",
    choices: ["2", "4", "6", "8"],
    expected: ["8"],
    comparator: "mcq_exact",
    hint: "Pour les volumes, on utilise le cube du coefficient.",
    explanation:
      "Lors d’un agrandissement de rapport k, les volumes sont multipliés par k³. Ici 2³ = 8.",
    tags: ["volume", "agrandissement", "homothetie", "qcm"],
  },

  {
    kind: "template",
    id: "3e_volume_agrandissement_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_agrandissement_reduction",
    difficulty: 3,
    theme: "neutral",
    hint: "Le volume est multiplié par k³.",
    tags: ["volume", "agrandissement", "homothetie", "template"],
    generate: () => {
      const k = randomChoice([2, 3, 4]);
      const factor = k ** 3;

      return {
        text: `Une figure solide est agrandie avec un coefficient ${k}. Par combien son volume est-il multiplié ?`,
        format: "short",
        expected: [String(factor)],
        comparator: "number_equal",
        explanation: `Un agrandissement de coefficient ${k} multiplie les volumes par ${k}³ = ${factor}.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_volume_agrandissement_tpl_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_agrandissement_reduction",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule d’abord k³.",
    tags: ["volume", "agrandissement", "probleme", "template"],
    generate: () => {
      const volumeInitial = randomChoice([10, 12, 15, 20, 25, 30]);
      const k = randomChoice([2, 3]);
      const volumeFinal = volumeInitial * k ** 3;

      return {
        text: `Un solide de volume ${volumeInitial} cm³ est agrandi avec un coefficient ${k}. Quel est son nouveau volume ?`,
        format: "short",
        expected: [String(volumeFinal)],
        comparator: "number_equal",
        explanation: `Les volumes sont multipliés par ${k}³ = ${k ** 3}. Donc le nouveau volume vaut ${volumeInitial} × ${k ** 3} = ${volumeFinal} cm³.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_volume_reduction_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_agrandissement_reduction",
    difficulty: 5,
    theme: "neutral",
    hint: "Une réduction de rapport 1/2 multiplie le volume par (1/2)³.",
    tags: ["volume", "reduction", "fraction", "template"],
    generate: () => {
      const volumeInitial = randomChoice([64, 80, 96, 120, 160]);
      const volumeFinal = volumeInitial / 8;

      return {
        text: `Un solide de volume ${volumeInitial} cm³ est réduit avec un coefficient 1/2. Quel est son nouveau volume ?`,
        format: "short",
        expected: [String(volumeFinal)],
        comparator: "number_equal",
        explanation: `Une réduction de coefficient 1/2 multiplie les volumes par (1/2)³ = 1/8. Donc ${volumeInitial} ÷ 8 = ${volumeFinal} cm³.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_volume_agrandissement_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_agrandissement_reduction",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi un agrandissement de rapport k multiplie les volumes par k³.",
    format: "open",
    expected: ["longueur", "largeur", "hauteur", "trois", "k", "cube"],
    comparator: "contains_keyword",
    hint: "Un volume dépend de trois dimensions.",
    explanation:
      "Un volume dépend de trois dimensions. Si chaque longueur est multipliée par k, alors le volume est multiplié par k × k × k = k³.",
    tags: ["volume", "agrandissement", "open", "raisonnement"],
  },

  /* =========================
     VOLUME_UNITES
  ========================= */

  {
    kind: "fixed",
    id: "3e_volume_unites_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_unites",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle unité est une unité de volume ?",
    format: "qcm",
    choices: ["cm", "cm²", "cm³", "kg"],
    expected: ["cm³"],
    comparator: "mcq_exact",
    hint: "Un volume se mesure avec une unité au cube.",
    explanation:
      "Le cm³ est une unité de volume. Le cm mesure une longueur, le cm² mesure une aire.",
    tags: ["volume", "unites", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_volume_unites_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_unites",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle égalité est correcte ?",
    format: "qcm",
    choices: ["1 L = 1 cm³", "1 L = 1 dm³", "1 L = 1 m³", "1 L = 100 m³"],
    expected: ["1 L = 1 dm³"],
    comparator: "mcq_exact",
    hint: "C’est une correspondance importante à connaître.",
    explanation:
      "La correspondance classique est 1 L = 1 dm³.",
    tags: ["volume", "litre", "conversion", "qcm"],
  },

  {
    kind: "template",
    id: "3e_volume_unites_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_unites",
    difficulty: 2,
    theme: "neutral",
    hint: "1 L = 1 dm³.",
    tags: ["volume", "litre", "conversion", "template"],
    generate: () => {
      const litres = randomChoice([2, 3, 4, 5, 8, 10, 12, 15]);
      return {
        text: `${litres} L correspondent à combien de dm³ ?`,
        format: "short",
        expected: [String(litres)],
        comparator: "number_equal",
        explanation: `1 L = 1 dm³, donc ${litres} L = ${litres} dm³.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_volume_unites_tpl_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_unites",
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
        explanation: `1 dm³ = 1 000 cm³, donc ${dm3} dm³ = ${cm3} cm³.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_volume_unites_tpl_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_unites",
    difficulty: 3,
    theme: "neutral",
    hint: "1 m³ = 1 000 L.",
    tags: ["volume", "m3", "litre", "conversion", "template"],
    generate: () => {
      const m3 = randomChoice([1, 2, 3, 4, 5]);
      const litres = m3 * 1000;

      return {
        text: `${m3} m³ correspondent à combien de litres ?`,
        format: "short",
        expected: [String(litres)],
        comparator: "number_equal",
        explanation: `1 m³ = 1 000 L, donc ${m3} m³ = ${litres} L.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_volume_unites_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_unites",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi 1 dm³ = 1 000 cm³.",
    format: "open",
    expected: ["10", "10", "10", "1000", "cube"],
    comparator: "contains_keyword",
    hint: "1 dm = 10 cm, et un cube a trois dimensions.",
    explanation:
      "Comme 1 dm = 10 cm, alors 1 dm³ = 10 cm × 10 cm × 10 cm = 1 000 cm³.",
    tags: ["volume", "conversion", "open", "raisonnement"],
  },

  /* =========================
     VOLUME_DEFIS
  ========================= */

  {
    kind: "fixed",
    id: "3e_volume_defis_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_defis",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève calcule le volume d’une boule de rayon 3 cm. Il écrit : 4π × 3² = 36π cm³. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Il confond peut-être aire de sphère et volume de boule.",
    explanation:
      "Non. Il a utilisé une formule qui ressemble à l’aire d’une sphère. Le volume d’une boule vaut V = (4/3)πr³. Ici V = 36π cm³.",
    tags: ["volume", "boule", "erreur", "qcm"],
  },

  {
    kind: "template",
    id: "3e_volume_defis_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_defis",
    difficulty: 4,
    theme: "reunion",
    hint: "Modélise le réservoir par un cylindre.",
    tags: ["volume", "defi", "reunion", "cylindre", "template", "canvas"],
    generate: () => {
      const rayon = randomChoice([2, 3, 4]);
      const hauteur = randomChoice([5, 6, 8, 10]);
      const coeff = rayon * rayon * hauteur;

      return {
        text: `À La Réunion, un réservoir cylindrique a un rayon de ${rayon} m et une hauteur de ${hauteur} m. Donner son volume sous la forme aπ.`,
        format: "short",
        expected: [`${coeff}π`, `${coeff} pi`, `${coeff}`],
        comparator: "contains_keyword",
        explanation: `Volume = π × ${rayon}² × ${hauteur} = ${coeff}π m³.`,
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
    kind: "template",
    id: "3e_volume_defis_tpl_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_defis",
    difficulty: 5,
    theme: "neutral",
    hint: "Compare les volumes, pas seulement les rayons.",
    tags: ["volume", "defi", "comparaison", "template"],
    generate: () => {
      const rA = randomChoice([3, 4, 5]);
      const rB = randomChoice([2, 3, 4]);
      const coeffA = (4 * rA ** 3) / 3;
      const coeffB = (4 * rB ** 3) / 3;

      const correct =
        coeffA > coeffB ? "boule A" : coeffB > coeffA ? "boule B" : "les deux";

      return {
        text: `Boule A : rayon ${rA} cm. Boule B : rayon ${rB} cm. Laquelle a le plus grand volume ?`,
        format: "qcm",
        choices: ["boule A", "boule B", "les deux"],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: `Volume A = ${formatNumber(coeffA)}π cm³. Volume B = ${formatNumber(coeffB)}π cm³. On compare donc ${formatNumber(coeffA)} et ${formatNumber(coeffB)}.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_volume_defis_tpl_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_defis",
    difficulty: 5,
    theme: "neutral",
    hint: "Calcule séparément chaque partie.",
    tags: ["volume", "defi", "assemblage", "template"],
    generate: () => {
      const rayonCylindre = randomChoice([2, 3, 4]);
      const hauteurCylindre = randomChoice([4, 5, 6]);
      const coeffCylindre = rayonCylindre * rayonCylindre * hauteurCylindre;

      const rayonBoule = randomChoice([3, 6]);
      const coeffBoule = (4 * rayonBoule ** 3) / 3;

      return {
        text: `Un solide est formé d’un cylindre de rayon ${rayonCylindre} cm et de hauteur ${hauteurCylindre} cm, puis d’une boule de rayon ${rayonBoule} cm. Donner le volume total sous la forme aπ.`,
        format: "open",
        expected: [
          String(formatNumber(coeffCylindre + coeffBoule)),
          "π",
        ],
        comparator: "contains_keyword",
        explanation: `Volume du cylindre = π × ${rayonCylindre}² × ${hauteurCylindre} = ${coeffCylindre}π cm³. Volume de la boule = (4/3)π × ${rayonBoule}³ = ${formatNumber(coeffBoule)}π cm³. Volume total = ${formatNumber(coeffCylindre + coeffBoule)}π cm³.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_volume_defis_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "volumes",
    microId: "volume_defis",
    difficulty: 5,
    theme: "neutral",
    text: "Explique la différence entre le volume d’un cylindre et le volume d’une boule dans le choix de la formule.",
    format: "open",
    expected: ["cylindre", "boule", "hauteur", "rayon", "formule"],
    comparator: "contains_keyword",
    hint: "Un cylindre a une hauteur, une boule n’en a pas.",
    explanation:
      "Un cylindre possède une base circulaire et une hauteur : son volume vaut πr²h. Une boule dépend seulement de son rayon : son volume vaut (4/3)πr³.",
    tags: ["volume", "defi", "open", "raisonnement"],
  },
];