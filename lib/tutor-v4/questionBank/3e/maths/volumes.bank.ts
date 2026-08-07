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
 * - volume_unite
 * - volume_defi
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
    hint: "Le volume concerne un objet en trois dimensions.",
    explanation:
    "Définition : le volume d’un solide mesure la place qu’il occupe dans l’espace.\n\n" +
    "Méthode : on reconnaît qu’un volume concerne un objet en trois dimensions.\n\n" +
    "Calcul : un volume s’exprime avec des unités cubes comme cm³, dm³ ou m³.\n\n" +
    "Conclusion : le volume mesure la place occupée dans l’espace.",
    tags: ["volume", "definition", "qcm"],
    },

  {
    kind: "fixed",
    id: "3e_volume_comprendre_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
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
    "Définition : un prisme droit ou un cylindre peut être vu comme une base empilée sur une hauteur.\n\n" +
    "Méthode : on calcule d’abord l’aire de la base, puis on multiplie par la hauteur.\n\n" +
    "Calcul : Volume = aire de base × hauteur.\n\n" +
    "Conclusion : la bonne formule générale est V = aire de base × hauteur.",
    tags: ["volume", "aire_base", "formule", "qcm"],
    },

  {
    kind: "fixed",
    id: "3e_volume_comprendre_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_comprendre",
    difficulty: 3,
    theme: "neutral",
    text: "Explique en une phrase pourquoi un volume s’exprime avec une unité au cube.",
    format: "open",
    expected: ["trois", "dimensions", "cube", "longueur", "largeur", "hauteur"],
    comparator: "contains_keyword",
    hint: "Un volume dépend de trois dimensions.",
    explanation:
    "Définition : un volume dépend de trois dimensions.\n\n" +
    "Méthode : on pense à un pavé droit : longueur, largeur et hauteur.\n\n" +
    "Calcul : une unité de volume correspond à unité × unité × unité, par exemple cm × cm × cm = cm³.\n\n" +
    "Conclusion : un volume s’exprime avec une unité au cube.",
    tags: ["volume", "open", "raisonnement"],
    },

  {
    kind: "template",
    id: "3e_volume_comprendre_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_comprendre",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte les cubes unités.",
    tags: ["volume", "cube_unite", "template", "canvas"],
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
        explanation:
          `Définition : avec des cubes unités, le volume correspond au nombre de cubes qui composent le solide.\n\n` +
          `Méthode : on compte tous les cubes unités visibles dans l’assemblage.\n\n` +
          `Calcul : il y a ${n} cubes unités.\n\n` +
          `Conclusion : le volume est donc ${n} unités de volume.`,
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
    notionId: "volume_solide",
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
      "Définition : le volume d’un pavé droit se calcule en multipliant longueur, largeur et hauteur.\n\n" +
      "Méthode : on identifie les trois dimensions du pavé droit.\n\n" +
      "Calcul : V = 8 × 5 × 4 = 160 cm³.\n\n" +
      "Conclusion : le volume du pavé droit est 160 cm³.",
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
    notionId: "volume_solide",
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
      "Définition : pour calculer le volume d’un pavé droit, on multiplie les trois dimensions.\n\n" +
      "Méthode : il ne faut pas additionner longueur, largeur et hauteur.\n\n" +
      "Calcul : V = 7 × 4 × 3 = 84 cm³, alors que 7 + 4 + 3 = 14.\n\n" +
      "Conclusion : l’élève a tort. Le volume est 84 cm³.",
      tags: ["volume", "pave_droit", "erreur", "qcm"],
  },

  {
    kind: "template",
    id: "3e_volume_pave_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
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
        explanation:
          `Définition : le volume d’un pavé droit vaut longueur × largeur × hauteur.\n\n` +
          `Méthode : on peut aussi calculer l’aire de la base, puis multiplier par la hauteur.\n\n` +
          `Calcul : aire de base = ${longueur} × ${largeur} = ${aireBase} cm². Donc V = ${aireBase} × ${hauteur} = ${volume} cm³.\n\n` +
          `Conclusion : le volume du pavé droit est ${volume} cm³.`,
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
    notionId: "volume_solide",
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
        explanation:
          `Définition : une réserve en forme de pavé droit se modélise par un volume longueur × largeur × hauteur.\n\n` +
          `Méthode : on multiplie les trois dimensions données en mètres.\n\n` +
          `Calcul : V = ${longueur} × ${largeur} × ${hauteur} = ${volume} m³.\n\n` +
          `Conclusion : le volume de la réserve est ${volume} m³.`, canvas: solideCanvas({
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
    notionId: "volume_solide",
    microId: "volume_prisme",
    difficulty: 2,
    theme: "neutral",
    text: "Un prisme droit a une aire de base de 24 cm² et une hauteur de 9 cm. Quel est son volume ?",
    format: "qcm",
    choices: ["33 cm³", "108 cm³", "216 cm³", "72 cm³"],
    expected: ["216 cm³"],
    comparator: "mcq_exact",
    explanation:
      "Définition : le volume d’un prisme droit se calcule avec la formule aire de base × hauteur.\n\n" +
      "Méthode : on multiplie l’aire de la base par la hauteur du prisme.\n\n" +
      "Calcul : V = 24 × 9 = 216 cm³.\n\n" +
      "Conclusion : le volume du prisme droit est 216 cm³.",
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
    notionId: "volume_solide",
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
        explanation:
          `Définition : un prisme droit a pour volume aire de base × hauteur.\n\n` +
          `Méthode : on utilise directement l’aire de base donnée dans l’énoncé.\n\n` +
          `Calcul : V = ${aireBase} × ${hauteur} = ${volume} cm³.\n\n` +
          `Conclusion : le volume du prisme droit est ${volume} cm³.`,canvas: solideCanvas({
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
    notionId: "volume_solide",
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
        explanation:
          `Définition : le volume d’un prisme droit vaut aire de base × hauteur.\n\n` +
          `Méthode : on calcule d’abord l’aire de la base triangulaire, puis on multiplie par la hauteur du prisme.\n\n` +
          `Calcul : aire de la base = ${base} × ${hauteurTriangle} ÷ 2 = ${formatNumber(
            aireBase
          )} cm². Puis V = ${formatNumber(aireBase)} × ${hauteurPrisme} = ${formatNumber(
            volume
          )} cm³.\n\n` +
          `Conclusion : le volume du prisme est ${formatNumber(volume)} cm³.`,
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
    notionId: "volume_solide",
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
      "Définition : le volume d’un cylindre vaut aire de base × hauteur.\n\n" +
      "Méthode : la base d’un cylindre est un disque, donc son aire vaut π × r².\n\n" +
      "Calcul : aire de base = π × 4² = 16π cm². Donc V = 16π × 7 = 112π cm³.\n\n" +
      "Conclusion : le volume du cylindre est 112π cm³.",
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
    notionId: "volume_solide",
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
        explanation:
          `Définition : le volume d’un cylindre se calcule avec la formule V = π × r² × hauteur.\n\n` +
          `Méthode : on calcule d’abord l’aire de la base circulaire, puis on multiplie par la hauteur.\n\n` +
          `Calcul : aire de base = π × ${rayon}² = ${r2}π cm². Donc V = ${r2}π × ${hauteur} = ${coeff}π cm³.\n\n` +
          `Conclusion : le volume du cylindre est ${coeff}π cm³.`,
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
    notionId: "volume_solide",
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
        explanation:
          `Définition : dans la formule du cylindre, on utilise le rayon, pas le diamètre.\n\n` +
          `Méthode : on commence par diviser le diamètre par 2 pour obtenir le rayon.\n\n` +
          `Calcul : rayon = ${diametre} ÷ 2 = ${rayon} cm. Donc V = π × ${rayon}² × ${hauteur} = ${coeff}π cm³.\n\n` +
          `Conclusion : le volume du cylindre est ${coeff}π cm³.`,
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
    notionId: "volume_solide",
    microId: "volume_cylindre",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi le volume d’un cylindre de rayon r et de hauteur h vaut π × r² × h.",
    format: "open",
    expected: ["aire", "base", "disque", "hauteur", "π"],
    comparator: "contains_keyword",
    hint: "La base est un disque.",
    explanation:
      "Définition : un cylindre est un solide formé par une base circulaire répétée sur une hauteur.\n\n" +
      "Méthode : la base est un disque d’aire π × r², puis on multiplie par la hauteur h.\n\n" +
      "Calcul : V = aire de base × hauteur = π × r² × h.\n\n" +
      "Conclusion : le volume d’un cylindre de rayon r et de hauteur h vaut π × r² × h.", tags: ["volume", "cylindre", "open", "raisonnement"],
      },

  /* =========================
     VOLUME_BOULE
  ========================= */

  {
    kind: "fixed",
    id: "3e_volume_boule_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
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
      "Définition : le volume d’une boule dépend uniquement de son rayon.\n\n" +
      "Méthode : on utilise la formule V = (4/3)πr³.\n\n" +
      "Calcul : la formule contient r³ car le volume dépend de trois dimensions.\n\n" +
      "Conclusion : le volume d’une boule de rayon r vaut V = (4/3)πr³.",
    tags: ["volume", "boule", "formule", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_volume_boule_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
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
      "Définition : le volume d’une boule se calcule avec la formule V = (4/3)πr³.\n\n" +
      "Méthode : on remplace le rayon par 3 dans la formule.\n\n" +
      "Calcul : V = (4/3)π × 3³ = (4/3)π × 27 = 36π cm³.\n\n" +
      "Conclusion : le volume de la boule est 36π cm³.",
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
    notionId: "volume_solide",
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
        explanation:
          `Définition : le volume d’une boule dépend du cube du rayon.\n\n` +
          `Méthode : on applique la formule V = (4/3)πr³.\n\n` +
          `Calcul : V = (4/3)π × ${rayon}³ = ${formatNumber(coeff)}π cm³.\n\n` +
          `Conclusion : le volume de la boule est ${formatNumber(coeff)}π cm³.`,
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
    notionId: "volume_solide",
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
        explanation:
          `Définition : la formule du volume d’une boule utilise le rayon.\n\n` +
          `Méthode : on commence par calculer le rayon en divisant le diamètre par 2.\n\n` +
          `Calcul : rayon = ${diametre} ÷ 2 = ${rayon} cm. Donc V = (4/3)π × ${rayon}³ = ${formatNumber(coeff)}π cm³.\n\n` +
          `Conclusion : le volume de la boule est ${formatNumber(coeff)}π cm³.`,
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
    notionId: "volume_solide",
    microId: "volume_boule",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi il faut utiliser le rayon, et non le diamètre, dans la formule du volume d’une boule.",
    format: "open",
    expected: ["rayon", "diamètre", "moitié", "formule"],
    comparator: "contains_keyword",
    hint: "La formule contient r, pas d.",
    explanation:
      "Définition : la formule du volume d’une boule contient le rayon r.\n\n" +
      "Méthode : si on connaît le diamètre, il faut d’abord calculer le rayon.\n\n" +
      "Calcul : le rayon est la moitié du diamètre, donc r = d ÷ 2.\n\n" +
      "Conclusion : il faut utiliser le rayon dans la formule V = (4/3)πr³.",
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
    notionId: "volume_solide",
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
      "Définition : lors d’un agrandissement, les volumes sont multipliés par le cube du coefficient.\n\n" +
      "Méthode : on calcule k³ avec k le coefficient d’agrandissement.\n\n" +
      "Calcul : ici k = 2, donc 2³ = 8.\n\n" +
      "Conclusion : le volume est multiplié par 8.",
    tags: ["volume", "agrandissement", "homothetie", "qcm"],
  },

  {
    kind: "template",
    id: "3e_volume_agrandissement_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
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
        explanation:
          `Définition : un agrandissement de coefficient k multiplie les volumes par k³.\n\n` +
          `Méthode : on calcule le cube du coefficient d’agrandissement.\n\n` +
          `Calcul : ${k}³ = ${factor}.\n\n` +
          `Conclusion : le volume est multiplié par ${factor}.`,
              };
            },
  },

  {
    kind: "template",
    id: "3e_volume_agrandissement_tpl_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
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
        explanation:
        `Définition : lors d’un agrandissement de coefficient k, les volumes sont multipliés par k³.\n\n` +
        `Méthode : on calcule d’abord ${k}³, puis on multiplie le volume initial.\n\n` +
        `Calcul : ${k}³ = ${k ** 3}. Donc ${volumeInitial} × ${k ** 3} = ${volumeFinal} cm³.\n\n` +
        `Conclusion : le nouveau volume est ${volumeFinal} cm³.`,
            };
    },
  },

  {
    kind: "template",
    id: "3e_volume_reduction_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
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
        explanation:
          `Définition : une réduction multiplie les volumes par le cube du coefficient.\n\n` +
          `Méthode : avec un coefficient 1/2, on calcule (1/2)³.\n\n` +
          `Calcul : (1/2)³ = 1/8. Donc ${volumeInitial} ÷ 8 = ${volumeFinal} cm³.\n\n` +
          `Conclusion : le nouveau volume est ${volumeFinal} cm³.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_volume_agrandissement_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
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
    id: "3e_volume_unite_fixed_1",
    niveau: "3e",
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
      "Définition : un volume se mesure avec une unité au cube.\n\n" +
      "Méthode : on distingue les unités de longueur, d’aire et de volume.\n\n" +
      "Calcul : cm mesure une longueur, cm² mesure une aire et cm³ mesure un volume.\n\n" +
      "Conclusion : cm³ est une unité de volume.",
      tags: ["volume", "unite", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_volume_unite_fixed_2",
    niveau: "3e",
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
    hint: "C’est une correspondance importante à connaître.",
    explanation:
      "Définition : le litre est lié aux unités de volume.\n\n" +
      "Méthode : on utilise les correspondances classiques entre litres et volumes.\n\n" +
      "Calcul : 1 litre correspond exactement à 1 dm³.\n\n" +
      "Conclusion : 1 L = 1 dm³.",
    tags: ["volume", "litre", "conversion", "qcm"],
  },

  {
    kind: "template",
    id: "3e_volume_unite_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_unite",
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
        explanation:
          `Définition : le litre et le décimètre cube représentent le même volume.\n\n` +
          `Méthode : on utilise l’égalité 1 L = 1 dm³.\n\n` +
          `Calcul : ${litres} L = ${litres} dm³.\n\n` +
          `Conclusion : ${litres} L correspondent à ${litres} dm³.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_volume_unite_tpl_2",
    niveau: "3e",
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
        explanation:
          `Définition : un décimètre cube contient mille centimètres cubes.\n\n` +
          `Méthode : on multiplie le nombre de dm³ par 1 000.\n\n` +
          `Calcul : ${dm3} × 1 000 = ${cm3}.\n\n` +
          `Conclusion : ${dm3} dm³ correspondent à ${cm3} cm³.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_volume_unite_tpl_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_unite",
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
        explanation:
          `Définition : un mètre cube correspond à mille litres.\n\n` +
          `Méthode : on multiplie le nombre de m³ par 1 000.\n\n` +
          `Calcul : ${m3} × 1 000 = ${litres}.\n\n` +
          `Conclusion : ${m3} m³ correspondent à ${litres} L.`,
              };
    },
  },

  {
    kind: "fixed",
    id: "3e_volume_unite_open_1",
    niveau: "3e",
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
      "Définition : les unités de volume dépendent de trois dimensions.\n\n" +
      "Méthode : on transforme chaque décimètre en centimètres.\n\n" +
      "Calcul : 1 dm = 10 cm, donc 1 dm³ = 10 × 10 × 10 = 1 000 cm³.\n\n" +
      "Conclusion : 1 dm³ = 1 000 cm³.",
    tags: ["volume", "conversion", "open", "raisonnement"],
  },

  /* =========================
     VOLUME_DEFIS
  ========================= */

  {
    kind: "fixed",
    id: "3e_volume_defi_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève calcule le volume d’une boule de rayon 3 cm. Il écrit : 4π × 3² = 36π cm³. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Il confond peut-être aire de sphère et volume de boule.",
    explanation:
      "Définition : le volume d’une boule se calcule avec V = (4/3)πr³.\n\n" +
      "Méthode : on vérifie si la formule utilisée par l’élève correspond bien à un volume.\n\n" +
      "Calcul : 4π × 3² = 36π correspond à l’aire d’une sphère, pas au volume. Le volume vaut V = (4/3)π × 3³ = 36π cm³.\n\n" +
      "Conclusion : l’élève utilise la mauvaise formule, même s’il trouve ici le même résultat numérique.",
    tags: ["volume", "boule", "erreur", "qcm"],
  },

  {
    kind: "template",
    id: "3e_volume_defi_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_defi",
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
        explanation:
          `Définition : le volume d’un cylindre vaut V = π × r² × hauteur.\n\n` +
          `Méthode : on remplace le rayon et la hauteur par les valeurs données.\n\n` +
          `Calcul : V = π × ${rayon}² × ${hauteur} = ${coeff}π m³.\n\n` +
          `Conclusion : le volume du réservoir est ${coeff}π m³.`,
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
    id: "3e_volume_defi_tpl_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_defi",
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
        explanation:
          `Définition : pour comparer deux boules, on compare leurs volumes.\n\n` +
          `Méthode : le volume d’une boule dépend du cube du rayon.\n\n` +
          `Calcul : Volume A = ${formatNumber(coeffA)}π cm³. Volume B = ${formatNumber(coeffB)}π cm³.\n\n` +
          `Conclusion : ${
            correct === "les deux"
              ? "les deux boules ont le même volume."
              : `${correct} a le plus grand volume.`
          }`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_volume_defi_tpl_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_defi",
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
       explanation:
        `Définition : le volume total d’un solide composé est la somme des volumes de ses parties.\n\n` +
        `Méthode : on calcule séparément le volume du cylindre et le volume de la boule, puis on additionne.\n\n` +
        `Calcul : volume du cylindre = π × ${rayonCylindre}² × ${hauteurCylindre} = ${coeffCylindre}π cm³. Volume de la boule = (4/3)π × ${rayonBoule}³ = ${formatNumber(coeffBoule)}π cm³. Volume total = ${formatNumber(coeffCylindre + coeffBoule)}π cm³.\n\n` +
        `Conclusion : le volume total est ${formatNumber(coeffCylindre + coeffBoule)}π cm³.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_volume_defi_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique la différence entre le volume d’un cylindre et le volume d’une boule dans le choix de la formule.",
    format: "open",
    expected: ["cylindre", "boule", "hauteur", "rayon", "formule"],
    comparator: "contains_keyword",
    hint: "Un cylindre a une hauteur, une boule n’en a pas.",
    explanation:
      "Définition : chaque solide a une formule de volume adaptée à sa forme.\n\n" +
      "Méthode : on repère si le solide possède une hauteur ou seulement un rayon.\n\n" +
      "Calcul : un cylindre a une hauteur, donc V = πr²h. Une boule n’a pas de hauteur, donc V = (4/3)πr³.\n\n" +
      "Conclusion : on ne choisit pas la même formule pour un cylindre et pour une boule.",
    tags: ["volume", "defi", "open", "raisonnement"],
  },

  /* =========================
     VOLUME_COMPRENDRE (compléments)
  ========================= */
  {
    kind: "fixed",
    id: "3e_volume_comprendre_fixed_4",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle unité est une unité de volume ?",
    format: "qcm",
    choices: ["le $\\text{cm}^3$", "le $\\text{cm}^2$", "le cm", "le degré"],
    expected: ["le $\\text{cm}^3$"],
    comparator: "mcq_exact",
    hint: "Un volume occupe les trois dimensions.",
    explanation:
      "Définition : un volume se mesure en unités cubes.\n\n" +
      "Méthode : on cherche l’unité avec un exposant $3$.\n\n" +
      "Calcul : le $\\text{cm}^2$ est une aire, le cm une longueur.\n\n" +
      "Conclusion : l’unité de volume est le $\\text{cm}^3$.",
    tags: ["volume", "comprendre", "unite", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_volume_comprendre_fixed_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "À quoi correspond $1$ litre ?",
    format: "qcm",
    choices: ["$1\\ \\text{dm}^3$", "$1\\ \\text{cm}^3$", "$1\\ \\text{m}^3$", "$1\\ \\text{cm}^2$"],
    expected: ["$1\\ \\text{dm}^3$"],
    comparator: "mcq_exact",
    hint: "$1$ L correspond à un cube de $1$ dm de côté.",
    explanation:
      "Définition : le litre est une unité de contenance.\n\n" +
      "Méthode : on relie le litre à une unité de volume.\n\n" +
      "Calcul : $1$ L $= 1\\ \\text{dm}^3$.\n\n" +
      "Conclusion : $1$ litre correspond à $1\\ \\text{dm}^3$.",
    tags: ["volume", "comprendre", "litre", "qcm"],
  },
  {
    kind: "template",
    id: "3e_volume_comprendre_tpl_1_cubes",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_comprendre",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte les petits cubes : longueur × largeur × hauteur.",
    tags: ["volume", "comprendre", "cubes", "canvas", "template"],
    generate: () => {
      const L = randomChoice([2, 3, 4]);
      const l = randomChoice([2, 3]);
      const h = randomChoice([2, 3]);
      const n = L * l * h;
      return {
        text: `Un pavé est construit avec des cubes unités : ${L} sur la longueur, ${l} sur la largeur et ${h} sur la hauteur. Combien de cubes unités le composent ?`,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation:
          `Définition : le volume compte le nombre de cubes unités.\n\n` +
          `Méthode : on multiplie longueur × largeur × hauteur.\n\n` +
          `Calcul : $${L} \\times ${l} \\times ${h} = ${n}$.\n\n` +
          `Conclusion : le pavé est composé de ${n} cubes unités.`,
        canvas: solideCanvas({
          solide: "pave_droit",
          dimensions: { longueur: L, largeur: l, hauteur: h },
          display: { showUnitCubes: true },
        }),
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_volume_comprendre_fixed_4_m3",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_comprendre",
    difficulty: 3,
    theme: "neutral",
    text: "Combien de litres y a-t-il dans $1\\ \\text{m}^3$ ?",
    format: "short",
    expected: ["1000"],
    comparator: "number_equal",
    hint: "$1\\ \\text{m}^3 = 1000\\ \\text{dm}^3$ et $1\\ \\text{dm}^3 = 1$ L.",
    explanation:
      "Définition : $1\\ \\text{m}^3$ contient $1000\\ \\text{dm}^3$.\n\n" +
      "Méthode : on convertit chaque $\\text{dm}^3$ en litre.\n\n" +
      "Calcul : $1\\ \\text{m}^3 = 1000\\ \\text{dm}^3 = 1000$ L.\n\n" +
      "Conclusion : il y a $1000$ litres dans $1\\ \\text{m}^3$.",
    tags: ["volume", "comprendre", "conversion", "short"],
  },
  {
    kind: "fixed",
    id: "3e_volume_comprendre_qcm_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "Le volume mesure…",
    format: "qcm",
    choices: [
      "l’espace occupé par un solide",
      "la longueur du contour",
      "la surface d’une face",
      "la masse du solide",
    ],
    expected: ["l’espace occupé par un solide"],
    comparator: "mcq_exact",
    hint: "C’est une grandeur en trois dimensions.",
    explanation:
      "Définition : le volume est l’espace occupé par un solide.\n\n" +
      "Méthode : on distingue volume, périmètre et aire.\n\n" +
      "Calcul : le volume utilise les trois dimensions.\n\n" +
      "Conclusion : le volume mesure l’espace occupé par un solide.",
    tags: ["volume", "comprendre", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_volume_comprendre_qcm_3_cl",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_comprendre",
    difficulty: 3,
    theme: "neutral",
    text: "Combien de centilitres (cL) y a-t-il dans $1$ litre ?",
    format: "short",
    expected: ["100"],
    comparator: "number_equal",
    hint: "« centi » signifie centième.",
    explanation:
      "Définition : $1$ L se divise en $100$ centilitres.\n\n" +
      "Méthode : « centi » veut dire $\\div 100$.\n\n" +
      "Calcul : $1$ L $= 100$ cL.\n\n" +
      "Conclusion : il y a $100$ cL dans $1$ L.",
    tags: ["volume", "comprendre", "conversion", "short"],
  },

  /* =========================
     VOLUME_PAVE (compléments)
  ========================= */
  {
    kind: "template",
    id: "3e_volume_pave_tpl_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_pave",
    difficulty: 2,
    theme: "neutral",
    hint: "$V = L \\times l \\times h$.",
    tags: ["volume", "pave", "canvas", "template"],
    generate: () => {
      const L = randomChoice([3, 4, 5, 6]);
      const l = randomChoice([2, 3, 4]);
      const h = randomChoice([2, 3, 5]);
      const V = L * l * h;
      return {
        text: `Un pavé droit a pour dimensions $${L}$ cm, $${l}$ cm et $${h}$ cm. Quel est son volume (en $\\text{cm}^3$) ?`,
        format: "short",
        expected: [String(V)],
        comparator: "number_equal",
        explanation:
          `Définition : le volume d’un pavé droit est $V = L \\times l \\times h$.\n\n` +
          `Méthode : on multiplie les trois dimensions.\n\n` +
          `Calcul : $${L} \\times ${l} \\times ${h} = ${V}$.\n\n` +
          `Conclusion : le volume est $${V}\\ \\text{cm}^3$.`,
        canvas: solideCanvas({
          solide: "pave_droit",
          dimensions: { longueur: L, largeur: l, hauteur: h },
          display: { showDimensions: true },
        }),
      };
    },
  },
  {
    kind: "template",
    id: "3e_volume_pave_tpl_3_cube",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_pave",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour un cube, $V = c^3$.",
    tags: ["volume", "pave", "cube", "canvas", "template"],
    generate: () => {
      const c = randomChoice([2, 3, 4, 5]);
      const V = c * c * c;
      return {
        text: `Un cube a une arête de $${c}$ cm. Quel est son volume (en $\\text{cm}^3$) ?`,
        format: "short",
        expected: [String(V)],
        comparator: "number_equal",
        explanation:
          `Définition : le volume d’un cube est $V = c^3$.\n\n` +
          `Méthode : on élève l’arête au cube.\n\n` +
          `Calcul : $${c}^3 = ${c} \\times ${c} \\times ${c} = ${V}$.\n\n` +
          `Conclusion : le volume est $${V}\\ \\text{cm}^3$.`,
        canvas: solideCanvas({
          solide: "cube",
          dimensions: { cote: c },
          display: { showDimensions: true },
        }),
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_volume_pave_qcm_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_pave",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la formule du volume d’un pavé droit ?",
    format: "qcm",
    choices: [
      "$V = L \\times l \\times h$",
      "$V = L + l + h$",
      "$V = 2(L + l)$",
      "$V = L \\times l$",
    ],
    expected: ["$V = L \\times l \\times h$"],
    comparator: "mcq_exact",
    hint: "On multiplie les trois dimensions.",
    explanation:
      "Définition : le volume d’un pavé droit utilise ses trois dimensions.\n\n" +
      "Méthode : on multiplie longueur, largeur et hauteur.\n\n" +
      "Calcul : $V = L \\times l \\times h$.\n\n" +
      "Conclusion : c’est la première formule.",
    tags: ["volume", "pave", "formule", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_volume_pave_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_pave",
    difficulty: 2,
    theme: "neutral",
    text: "Un pavé droit mesure $5$ cm sur $4$ cm sur $3$ cm. Quel est son volume (en $\\text{cm}^3$) ?",
    format: "short",
    expected: ["60"],
    comparator: "number_equal",
    hint: "$5 \\times 4 \\times 3$.",
    explanation:
      "Définition : $V = L \\times l \\times h$.\n\n" +
      "Méthode : on multiplie les trois dimensions.\n\n" +
      "Calcul : $5 \\times 4 \\times 3 = 60$.\n\n" +
      "Conclusion : le volume est $60\\ \\text{cm}^3$.",
    tags: ["volume", "pave", "short"],
  },
  {
    kind: "template",
    id: "3e_volume_pave_tpl_4_hauteur",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_pave",
    difficulty: 4,
    theme: "neutral",
    hint: "$h = V \\div (L \\times l)$.",
    tags: ["volume", "pave", "inverse", "template"],
    generate: () => {
      const L = randomChoice([2, 3, 4]);
      const l = randomChoice([2, 3, 5]);
      const h = randomChoice([2, 3, 4]);
      const V = L * l * h;
      return {
        text: `Un pavé droit a un volume de $${V}\\ \\text{cm}^3$, une longueur de $${L}$ cm et une largeur de $${l}$ cm. Quelle est sa hauteur (en cm) ?`,
        format: "short",
        expected: [String(h)],
        comparator: "number_equal",
        explanation:
          `Définition : $V = L \\times l \\times h$, donc $h = \\dfrac{V}{L \\times l}$.\n\n` +
          `Méthode : on divise le volume par l’aire de la base.\n\n` +
          `Calcul : $h = \\dfrac{${V}}{${L} \\times ${l}} = \\dfrac{${V}}{${L * l}} = ${h}$.\n\n` +
          `Conclusion : la hauteur est $${h}$ cm.`,
      };
    },
  },

  /* =========================
     VOLUME_PRISME (compléments)
  ========================= */
  {
    kind: "fixed",
    id: "3e_volume_prisme_qcm_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_prisme",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la formule du volume d’un prisme droit ?",
    format: "qcm",
    choices: [
      "$V = \\text{aire de la base} \\times \\text{hauteur}$",
      "$V = \\text{périmètre} \\times \\text{hauteur}$",
      "$V = \\text{aire de la base} + \\text{hauteur}$",
      "$V = \\text{base} \\times \\text{base}$",
    ],
    expected: ["$V = \\text{aire de la base} \\times \\text{hauteur}$"],
    comparator: "mcq_exact",
    hint: "On multiplie l’aire de la base par la hauteur.",
    explanation:
      "Définition : un prisme droit a un volume égal à l’aire de sa base multipliée par sa hauteur.\n\n" +
      "Méthode : on calcule l’aire de la base, puis on multiplie par la hauteur.\n\n" +
      "Calcul : $V = \\text{aire base} \\times h$.\n\n" +
      "Conclusion : c’est la première formule.",
    tags: ["volume", "prisme", "formule", "qcm"],
  },
  {
    kind: "template",
    id: "3e_volume_prisme_tpl_2_base_donnee",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_prisme",
    difficulty: 3,
    theme: "neutral",
    hint: "$V = \\text{aire base} \\times h$.",
    tags: ["volume", "prisme", "template"],
    generate: () => {
      const aire = randomChoice([6, 8, 10, 12]);
      const h = randomChoice([3, 4, 5, 6]);
      const V = aire * h;
      return {
        text: `Un prisme droit a une base d’aire $${aire}\\ \\text{cm}^2$ et une hauteur de $${h}$ cm. Quel est son volume (en $\\text{cm}^3$) ?`,
        format: "short",
        expected: [String(V)],
        comparator: "number_equal",
        explanation:
          `Définition : $V = \\text{aire base} \\times h$.\n\n` +
          `Méthode : on multiplie l’aire de la base par la hauteur.\n\n` +
          `Calcul : $${aire} \\times ${h} = ${V}$.\n\n` +
          `Conclusion : le volume est $${V}\\ \\text{cm}^3$.`,
      };
    },
  },
  {
    kind: "template",
    id: "3e_volume_prisme_tpl_3_triangle",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_prisme",
    difficulty: 4,
    theme: "neutral",
    hint: "Aire d’un triangle $= \\dfrac{b \\times h}{2}$, puis $\\times$ longueur du prisme.",
    tags: ["volume", "prisme", "triangle", "template"],
    generate: () => {
      const b = randomChoice([4, 6, 8]);
      const hTri = randomChoice([3, 5]);
      const aire = (b * hTri) / 2;
      const L = randomChoice([4, 5, 6]);
      const V = aire * L;
      return {
        text: `Un prisme droit a pour base un triangle de base $${b}$ cm et de hauteur $${hTri}$ cm. La longueur du prisme est $${L}$ cm. Quel est son volume (en $\\text{cm}^3$) ?`,
        format: "short",
        expected: [String(V)],
        comparator: "number_equal",
        explanation:
          `Définition : $V = \\text{aire base} \\times \\text{longueur}$.\n\n` +
          `Méthode : on calcule l’aire du triangle, puis on multiplie par la longueur.\n\n` +
          `Calcul : aire base $= \\dfrac{${b} \\times ${hTri}}{2} = ${aire}$ ; $V = ${aire} \\times ${L} = ${V}$.\n\n` +
          `Conclusion : le volume est $${V}\\ \\text{cm}^3$.`,
        canvas: solideCanvas({ solide: "prisme", display: { showLabels: true } }),
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_volume_prisme_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_prisme",
    difficulty: 3,
    theme: "neutral",
    text: "Un prisme droit a une base d’aire $15\\ \\text{cm}^2$ et une hauteur de $4$ cm. Quel est son volume (en $\\text{cm}^3$) ?",
    format: "short",
    expected: ["60"],
    comparator: "number_equal",
    hint: "$15 \\times 4$.",
    explanation:
      "Définition : $V = \\text{aire base} \\times h$.\n\n" +
      "Méthode : on multiplie l’aire de la base par la hauteur.\n\n" +
      "Calcul : $15 \\times 4 = 60$.\n\n" +
      "Conclusion : le volume est $60\\ \\text{cm}^3$.",
    tags: ["volume", "prisme", "short"],
  },
  {
    kind: "template",
    id: "3e_volume_prisme_tpl_4_hauteur",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_prisme",
    difficulty: 4,
    theme: "neutral",
    hint: "$h = V \\div \\text{aire base}$.",
    tags: ["volume", "prisme", "inverse", "template"],
    generate: () => {
      const aire = randomChoice([5, 6, 10]);
      const h = randomChoice([3, 4, 6]);
      const V = aire * h;
      return {
        text: `Un prisme droit a un volume de $${V}\\ \\text{cm}^3$ et une base d’aire $${aire}\\ \\text{cm}^2$. Quelle est sa hauteur (en cm) ?`,
        format: "short",
        expected: [String(h)],
        comparator: "number_equal",
        explanation:
          `Définition : $V = \\text{aire base} \\times h$, donc $h = \\dfrac{V}{\\text{aire base}}$.\n\n` +
          `Méthode : on divise le volume par l’aire de la base.\n\n` +
          `Calcul : $h = \\dfrac{${V}}{${aire}} = ${h}$.\n\n` +
          `Conclusion : la hauteur est $${h}$ cm.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_volume_prisme_qcm_2_lien_pave",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_prisme",
    difficulty: 3,
    theme: "neutral",
    text: "Un pavé droit est un cas particulier de prisme droit. Sa base est…",
    format: "qcm",
    choices: ["un rectangle", "un triangle", "un cercle", "un losange"],
    expected: ["un rectangle"],
    comparator: "mcq_exact",
    hint: "Pense aux faces d’un pavé.",
    explanation:
      "Définition : un prisme droit a deux bases identiques ; pour un pavé, ce sont des rectangles.\n\n" +
      "Méthode : on identifie la forme de la base.\n\n" +
      "Calcul : la base d’un pavé droit est un rectangle.\n\n" +
      "Conclusion : la base est un rectangle.",
    tags: ["volume", "prisme", "pave", "qcm"],
  },

  /* =========================
     VOLUME_CYLINDRE (compléments)
  ========================= */
  {
    kind: "fixed",
    id: "3e_volume_cylindre_qcm_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_cylindre",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la formule du volume d’un cylindre de rayon $r$ et de hauteur $h$ ?",
    format: "qcm",
    choices: ["$V = \\pi r^2 h$", "$V = 2\\pi r h$", "$V = \\pi r h^2$", "$V = \\dfrac{4}{3}\\pi r^3$"],
    expected: ["$V = \\pi r^2 h$"],
    comparator: "mcq_exact",
    hint: "Aire du disque de base $= \\pi r^2$, puis $\\times h$.",
    explanation:
      "Définition : le volume d’un cylindre est l’aire de la base ($\\pi r^2$) multipliée par la hauteur.\n\n" +
      "Méthode : on multiplie $\\pi r^2$ par $h$.\n\n" +
      "Calcul : $V = \\pi r^2 h$.\n\n" +
      "Conclusion : c’est la première formule.",
    tags: ["volume", "cylindre", "formule", "qcm"],
  },
  {
    kind: "template",
    id: "3e_volume_cylindre_tpl_2_valeur",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_cylindre",
    difficulty: 3,
    theme: "neutral",
    hint: "$V = \\pi r^2 h$, avec $\\pi \\approx 3{,}14$.",
    tags: ["volume", "cylindre", "valeur", "canvas", "template"],
    generate: () => {
      const r = randomChoice([2, 3, 5]);
      const h = randomChoice([4, 5, 10]);
      const V = Math.round(3.14 * r * r * h * 100) / 100;
      return {
        text: `Un cylindre a un rayon de $${r}$ cm et une hauteur de $${h}$ cm. Calcule son volume au centième près (avec $\\pi \\approx 3{,}14$, en $\\text{cm}^3$).`,
        format: "short",
        expected: [String(V), String(V).replace(".", ",")],
        comparator: "number_equal",
        explanation:
          `Définition : $V = \\pi r^2 h$.\n\n` +
          `Méthode : on calcule $3{,}14 \\times r^2 \\times h$.\n\n` +
          `Calcul : $3{,}14 \\times ${r}^2 \\times ${h} = 3{,}14 \\times ${r * r} \\times ${h} = ${formatNumber(V)}$.\n\n` +
          `Conclusion : le volume est environ $${formatNumber(V)}\\ \\text{cm}^3$.`,
        canvas: solideCanvas({
          solide: "cylindre",
          dimensions: { rayon: r, hauteur: h },
          display: { showDimensions: true },
        }),
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_volume_cylindre_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_cylindre",
    difficulty: 3,
    theme: "neutral",
    text: "Un cylindre a un rayon de $2$ cm et une hauteur de $10$ cm. Quel est son volume au centième près (avec $\\pi \\approx 3{,}14$, en $\\text{cm}^3$) ?",
    format: "short",
    expected: ["125.6", "125,6"],
    comparator: "number_equal",
    hint: "$3{,}14 \\times 2^2 \\times 10$.",
    explanation:
      "Définition : $V = \\pi r^2 h$.\n\n" +
      "Méthode : on calcule $3{,}14 \\times 4 \\times 10$.\n\n" +
      "Calcul : $3{,}14 \\times 4 \\times 10 = 125{,}6$.\n\n" +
      "Conclusion : le volume est environ $125{,}6\\ \\text{cm}^3$.",
    tags: ["volume", "cylindre", "short"],
  },
  {
    kind: "fixed",
    id: "3e_volume_cylindre_qcm_2_base",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_cylindre",
    difficulty: 3,
    theme: "neutral",
    text: "Pour calculer le volume d’un cylindre, on commence par calculer l’aire de la base, qui est…",
    format: "qcm",
    choices: ["$\\pi r^2$", "$2\\pi r$", "$\\pi r$", "$r^2$"],
    expected: ["$\\pi r^2$"],
    comparator: "mcq_exact",
    hint: "La base est un disque.",
    explanation:
      "Définition : la base d’un cylindre est un disque, d’aire $\\pi r^2$.\n\n" +
      "Méthode : on identifie l’aire du disque.\n\n" +
      "Calcul : aire base $= \\pi r^2$ (et $2\\pi r$ est le périmètre).\n\n" +
      "Conclusion : l’aire de la base est $\\pi r^2$.",
    tags: ["volume", "cylindre", "base", "qcm"],
  },
  {
    kind: "template",
    id: "3e_volume_cylindre_tpl_3_litres",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_cylindre",
    difficulty: 4,
    theme: "reunion",
    hint: "Calcule le volume en $\\text{cm}^3$, puis convertis en litres ($1000\\ \\text{cm}^3 = 1$ L).",
    tags: ["volume", "cylindre", "litres", "template"],
    generate: () => {
      const r = 10;
      const h = randomChoice([10, 20, 30]);
      const Vcm3 = Math.round(3.14 * r * r * h);
      const litres = Math.round((Vcm3 / 1000) * 100) / 100;
      return {
        text: `Un récupérateur d’eau cylindrique a un rayon de $${r}$ cm et une hauteur de $${h}$ cm. Quel est son volume en litres (avec $\\pi \\approx 3{,}14$) ?`,
        format: "short",
        expected: [String(litres), String(litres).replace(".", ",")],
        comparator: "number_equal",
        explanation:
          `Définition : $V = \\pi r^2 h$, puis on convertit en litres.\n\n` +
          `Méthode : on calcule le volume en $\\text{cm}^3$, puis on divise par $1000$.\n\n` +
          `Calcul : $V = 3{,}14 \\times ${r * r} \\times ${h} = ${Vcm3}\\ \\text{cm}^3 = ${formatNumber(litres)}$ L.\n\n` +
          `Conclusion : le volume est environ $${formatNumber(litres)}$ L.`,
        canvas: solideCanvas({ solide: "cylindre", dimensions: { rayon: r, hauteur: h } }),
      };
    },
  },

  /* =========================
     VOLUME_BOULE (compléments)
  ========================= */
  {
    kind: "fixed",
    id: "3e_volume_boule_qcm_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_boule",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la formule du volume d’une boule de rayon $r$ ?",
    format: "qcm",
    choices: ["$V = \\dfrac{4}{3}\\pi r^3$", "$V = \\pi r^2 h$", "$V = 4\\pi r^2$", "$V = \\dfrac{4}{3}\\pi r^2$"],
    expected: ["$V = \\dfrac{4}{3}\\pi r^3$"],
    comparator: "mcq_exact",
    hint: "La formule contient $r^3$.",
    explanation:
      "Définition : le volume d’une boule de rayon $r$ est $\\dfrac{4}{3}\\pi r^3$.\n\n" +
      "Méthode : on repère la formule avec $r^3$.\n\n" +
      "Calcul : $V = \\dfrac{4}{3}\\pi r^3$.\n\n" +
      "Conclusion : c’est la première formule.",
    tags: ["volume", "boule", "formule", "qcm"],
  },
  {
    kind: "template",
    id: "3e_volume_boule_tpl_1_valeur",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_boule",
    difficulty: 4,
    theme: "neutral",
    hint: "$V = \\dfrac{4}{3}\\pi r^3$, avec $\\pi \\approx 3{,}14$.",
    tags: ["volume", "boule", "valeur", "canvas", "template"],
    generate: () => {
      const r = randomChoice([3, 6, 9]);
      const V = Math.round((4 / 3) * 3.14 * r * r * r * 100) / 100;
      return {
        text: `Une boule a un rayon de $${r}$ cm. Calcule son volume au centième près (avec $\\pi \\approx 3{,}14$, en $\\text{cm}^3$).`,
        format: "short",
        expected: [String(V), String(V).replace(".", ",")],
        comparator: "number_equal",
        explanation:
          `Définition : $V = \\dfrac{4}{3}\\pi r^3$.\n\n` +
          `Méthode : on calcule $\\dfrac{4}{3} \\times 3{,}14 \\times r^3$.\n\n` +
          `Calcul : $\\dfrac{4}{3} \\times 3{,}14 \\times ${r}^3 = ${formatNumber(V)}$.\n\n` +
          `Conclusion : le volume est environ $${formatNumber(V)}\\ \\text{cm}^3$.`,
        canvas: solideCanvas({ solide: "boule", dimensions: { rayon: r } }),
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_volume_boule_qcm_2_rayon3",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_boule",
    difficulty: 4,
    theme: "neutral",
    text: "Dans la formule $V = \\dfrac{4}{3}\\pi r^3$, si le rayon double, le volume est multiplié par…",
    format: "qcm",
    choices: ["$8$", "$2$", "$4$", "$6$"],
    expected: ["$8$"],
    comparator: "mcq_exact",
    hint: "Le rayon intervient au cube : $2^3$.",
    explanation:
      "Définition : le volume dépend de $r^3$.\n\n" +
      "Méthode : si $r$ double, $r^3$ est multiplié par $2^3$.\n\n" +
      "Calcul : $2^3 = 8$.\n\n" +
      "Conclusion : le volume est multiplié par $8$.",
    tags: ["volume", "boule", "agrandissement", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_volume_boule_qcm_3_demi",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_boule",
    difficulty: 4,
    theme: "neutral",
    text: "Le volume d’une demi-boule est égal à…",
    format: "qcm",
    choices: [
      "la moitié du volume de la boule",
      "le double du volume de la boule",
      "le même volume que la boule",
      "le quart du volume de la boule",
    ],
    expected: ["la moitié du volume de la boule"],
    comparator: "mcq_exact",
    hint: "Une demi-boule, c’est une boule coupée en deux.",
    explanation:
      "Définition : une demi-boule est la moitié d’une boule.\n\n" +
      "Méthode : on divise le volume de la boule par $2$.\n\n" +
      "Calcul : $V_{\\text{demi}} = \\dfrac{1}{2} \\times \\dfrac{4}{3}\\pi r^3$.\n\n" +
      "Conclusion : c’est la moitié du volume de la boule.",
    tags: ["volume", "boule", "demi", "qcm"],
  },

  /* =========================
     VOLUME_AGRANDISSEMENT_REDUCTION (compléments)
  ========================= */
  {
    kind: "fixed",
    id: "3e_volume_agrandissement_qcm_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_agrandissement_reduction",
    difficulty: 3,
    theme: "neutral",
    text: "Si on multiplie toutes les longueurs d’un solide par $k$, son volume est multiplié par…",
    format: "qcm",
    choices: ["$k^3$", "$k$", "$k^2$", "$3k$"],
    expected: ["$k^3$"],
    comparator: "mcq_exact",
    hint: "Le volume est en trois dimensions.",
    explanation:
      "Définition : lors d’un agrandissement de rapport $k$, le volume est multiplié par $k^3$.\n\n" +
      "Méthode : on relie les dimensions au volume (trois dimensions).\n\n" +
      "Calcul : chaque longueur ×$k$ donne un volume ×$k^3$.\n\n" +
      "Conclusion : le volume est multiplié par $k^3$.",
    tags: ["volume", "agrandissement", "qcm"],
  },
  {
    kind: "template",
    id: "3e_volume_agrandissement_tpl_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_agrandissement_reduction",
    difficulty: 4,
    theme: "neutral",
    hint: "Nouveau volume $= $ ancien $\\times k^3$.",
    tags: ["volume", "agrandissement", "template"],
    generate: () => {
      const V = randomChoice([5, 10, 20]);
      const k = randomChoice([2, 3]);
      const newV = V * k * k * k;
      return {
        text: `Un solide a un volume de $${V}\\ \\text{cm}^3$. On agrandit toutes ses longueurs avec un rapport $${k}$. Quel est le nouveau volume (en $\\text{cm}^3$) ?`,
        format: "short",
        expected: [String(newV)],
        comparator: "number_equal",
        explanation:
          `Définition : un agrandissement de rapport $${k}$ multiplie le volume par $${k}^3$.\n\n` +
          `Méthode : on multiplie l’ancien volume par $${k}^3$.\n\n` +
          `Calcul : $${V} \\times ${k}^3 = ${V} \\times ${k * k * k} = ${newV}$.\n\n` +
          `Conclusion : le nouveau volume est $${newV}\\ \\text{cm}^3$.`,
      };
    },
  },
  {
    kind: "template",
    id: "3e_volume_reduction_tpl_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_agrandissement_reduction",
    difficulty: 4,
    theme: "neutral",
    hint: "Réduction de rapport $\\dfrac{1}{k}$ : volume $\\div k^3$.",
    tags: ["volume", "reduction", "template"],
    generate: () => {
      const k = randomChoice([2, 3]);
      const newV = randomChoice([4, 5, 8]);
      const V = newV * k * k * k;
      return {
        text: `Un solide a un volume de $${V}\\ \\text{cm}^3$. On le réduit avec un rapport $\\dfrac{1}{${k}}$. Quel est le nouveau volume (en $\\text{cm}^3$) ?`,
        format: "short",
        expected: [String(newV)],
        comparator: "number_equal",
        explanation:
          `Définition : une réduction de rapport $\\dfrac{1}{${k}}$ divise le volume par $${k}^3$.\n\n` +
          `Méthode : on divise l’ancien volume par $${k}^3$.\n\n` +
          `Calcul : $${V} \\div ${k * k * k} = ${newV}$.\n\n` +
          `Conclusion : le nouveau volume est $${newV}\\ \\text{cm}^3$.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_volume_agrandissement_qcm_2_double",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_agrandissement_reduction",
    difficulty: 3,
    theme: "neutral",
    text: "On double toutes les arêtes d’un cube. Son volume est multiplié par…",
    format: "qcm",
    choices: ["$8$", "$2$", "$4$", "$6$"],
    expected: ["$8$"],
    comparator: "mcq_exact",
    hint: "$k = 2$, donc $k^3 = 8$.",
    explanation:
      "Définition : doubler les longueurs, c’est $k = 2$.\n\n" +
      "Méthode : le volume est multiplié par $k^3$.\n\n" +
      "Calcul : $2^3 = 8$.\n\n" +
      "Conclusion : le volume est multiplié par $8$.",
    tags: ["volume", "agrandissement", "cube", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_volume_agrandissement_qcm_3_aire_vs_volume",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_agrandissement_reduction",
    difficulty: 4,
    theme: "neutral",
    text: "Lors d’un agrandissement de rapport $k$, l’aire est multipliée par $k^2$ et le volume par…",
    format: "qcm",
    choices: ["$k^3$", "$k^2$", "$k$", "$k^4$"],
    expected: ["$k^3$"],
    comparator: "mcq_exact",
    hint: "Aire : deux dimensions ; volume : trois dimensions.",
    explanation:
      "Définition : les longueurs sont ×$k$, les aires ×$k^2$, les volumes ×$k^3$.\n\n" +
      "Méthode : on associe le nombre de dimensions à l’exposant.\n\n" +
      "Calcul : volume = trois dimensions → $k^3$.\n\n" +
      "Conclusion : le volume est multiplié par $k^3$.",
    tags: ["volume", "agrandissement", "aire_volume", "qcm"],
  },

  /* =========================
     VOLUME_UNITE (compléments)
  ========================= */
  {
    kind: "fixed",
    id: "3e_volume_unite_fixed_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_unite",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de $\\text{cm}^3$ y a-t-il dans $1$ litre ?",
    format: "short",
    expected: ["1000"],
    comparator: "number_equal",
    hint: "$1$ L $= 1\\ \\text{dm}^3 = 1000\\ \\text{cm}^3$.",
    explanation:
      "Définition : $1$ L $= 1\\ \\text{dm}^3$.\n\n" +
      "Méthode : on convertit $1\\ \\text{dm}^3$ en $\\text{cm}^3$.\n\n" +
      "Calcul : $1\\ \\text{dm}^3 = 1000\\ \\text{cm}^3$.\n\n" +
      "Conclusion : il y a $1000\\ \\text{cm}^3$ dans $1$ L.",
    tags: ["volume", "unite", "conversion", "short"],
  },
  {
    kind: "template",
    id: "3e_volume_unite_tpl_1_litres",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_unite",
    difficulty: 3,
    theme: "neutral",
    hint: "$1000\\ \\text{cm}^3 = 1$ L.",
    tags: ["volume", "unite", "conversion", "template"],
    generate: () => {
      const litres = randomChoice([2, 3, 5, 10]);
      const cm3 = litres * 1000;
      return {
        text: `Un récipient a un volume de $${cm3}\\ \\text{cm}^3$. Combien cela fait-il de litres ?`,
        format: "short",
        expected: [String(litres)],
        comparator: "number_equal",
        explanation:
          `Définition : $1000\\ \\text{cm}^3 = 1$ L.\n\n` +
          `Méthode : on divise par $1000$.\n\n` +
          `Calcul : $${cm3} \\div 1000 = ${litres}$.\n\n` +
          `Conclusion : cela fait $${litres}$ L.`,
      };
    },
  },
  {
    kind: "template",
    id: "3e_volume_unite_tpl_2_m3",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_unite",
    difficulty: 4,
    theme: "neutral",
    hint: "$1\\ \\text{m}^3 = 1000$ L.",
    tags: ["volume", "unite", "conversion", "template"],
    generate: () => {
      const m3 = randomChoice([2, 3, 5]);
      const litres = m3 * 1000;
      return {
        text: `Une cuve a un volume de $${m3}\\ \\text{m}^3$. Quelle est sa contenance en litres ?`,
        format: "short",
        expected: [String(litres)],
        comparator: "number_equal",
        explanation:
          `Définition : $1\\ \\text{m}^3 = 1000$ L.\n\n` +
          `Méthode : on multiplie par $1000$.\n\n` +
          `Calcul : $${m3} \\times 1000 = ${litres}$.\n\n` +
          `Conclusion : la contenance est de $${litres}$ L.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_volume_unite_qcm_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_unite",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle égalité est correcte ?",
    format: "qcm",
    choices: ["$1\\ \\text{dm}^3 = 1$ L", "$1\\ \\text{cm}^3 = 1$ L", "$1\\ \\text{m}^3 = 1$ L", "$1\\ \\text{dm}^3 = 100$ L"],
    expected: ["$1\\ \\text{dm}^3 = 1$ L"],
    comparator: "mcq_exact",
    hint: "Le litre correspond au décimètre cube.",
    explanation:
      "Définition : le litre est défini comme le volume d’un cube de $1$ dm de côté.\n\n" +
      "Méthode : on relie litre et $\\text{dm}^3$.\n\n" +
      "Calcul : $1\\ \\text{dm}^3 = 1$ L.\n\n" +
      "Conclusion : la bonne égalité est $1\\ \\text{dm}^3 = 1$ L.",
    tags: ["volume", "unite", "qcm"],
  },

  /* =========================
     VOLUME_DEFI (compléments)
  ========================= */
  {
    kind: "template",
    id: "3e_volume_defi_tpl_1_pave_litres",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "Calcule le volume en $\\text{cm}^3$, puis convertis en litres.",
    tags: ["volume", "defi", "litres", "reunion", "template"],
    generate: () => {
      const L = randomChoice([20, 30]);
      const l = randomChoice([10, 20]);
      const h = randomChoice([10, 50]);
      const cm3 = L * l * h;
      const litres = cm3 / 1000;
      return {
        text: `Un aquarium en forme de pavé droit mesure $${L}$ cm sur $${l}$ cm sur $${h}$ cm. Quelle est sa contenance en litres ?`,
        format: "short",
        expected: [String(litres), String(litres).replace(".", ",")],
        comparator: "number_equal",
        explanation:
          `Définition : on calcule le volume puis on convertit.\n\n` +
          `Méthode : $V = L \\times l \\times h$, puis $\\div 1000$ pour les litres.\n\n` +
          `Calcul : $V = ${L} \\times ${l} \\times ${h} = ${cm3}\\ \\text{cm}^3 = ${formatNumber(litres)}$ L.\n\n` +
          `Conclusion : la contenance est de $${formatNumber(litres)}$ L.`,
        canvas: solideCanvas({ solide: "pave_droit", dimensions: { longueur: L, largeur: l, hauteur: h } }),
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_volume_defi_fixed_1_choix_formule",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Pour calculer le volume d’une boîte de conserve (cylindre), quelle formule choisir ?",
    format: "qcm",
    choices: ["$V = \\pi r^2 h$", "$V = L \\times l \\times h$", "$V = \\dfrac{4}{3}\\pi r^3$", "$V = c^3$"],
    expected: ["$V = \\pi r^2 h$"],
    comparator: "mcq_exact",
    hint: "Une boîte de conserve est un cylindre.",
    explanation:
      "Définition : une boîte de conserve a la forme d’un cylindre.\n\n" +
      "Méthode : on choisit la formule du cylindre.\n\n" +
      "Calcul : $V = \\pi r^2 h$.\n\n" +
      "Conclusion : on utilise $V = \\pi r^2 h$.",
    tags: ["volume", "defi", "choix_formule", "qcm"],
  },
  {
    kind: "template",
    id: "3e_volume_defi_tpl_2_cube_double",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Calcule le volume du cube, puis multiplie par $k^3$.",
    tags: ["volume", "defi", "agrandissement", "template"],
    generate: () => {
      const c = randomChoice([2, 3, 4]);
      const k = randomChoice([2, 3]);
      const V = c * c * c;
      const newV = V * k * k * k;
      return {
        text: `Un cube a une arête de $${c}$ cm. On agrandit toutes ses longueurs d’un rapport $${k}$. Quel est le volume du nouveau cube (en $\\text{cm}^3$) ?`,
        format: "short",
        expected: [String(newV)],
        comparator: "number_equal",
        explanation:
          `Définition : volume du cube $= c^3$ ; un agrandissement de rapport $${k}$ multiplie le volume par $${k}^3$.\n\n` +
          `Méthode : on calcule le volume initial, puis on multiplie par $${k}^3$.\n\n` +
          `Calcul : $V = ${c}^3 = ${V}$ ; nouveau volume $= ${V} \\times ${k * k * k} = ${newV}$.\n\n` +
          `Conclusion : le nouveau volume est $${newV}\\ \\text{cm}^3$.`,
        canvas: solideCanvas({ solide: "cube", dimensions: { cote: c } }),
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_volume_defi_fixed_2_brevet",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un pavé droit a un volume de $48\\ \\text{cm}^3$. Sa base mesure $4$ cm sur $3$ cm. Quelle est sa hauteur (en cm) ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "$h = V \\div (L \\times l)$.",
    explanation:
      "Définition : $V = L \\times l \\times h$.\n\n" +
      "Méthode : $h = \\dfrac{V}{L \\times l}$.\n\n" +
      "Calcul : $h = \\dfrac{48}{4 \\times 3} = \\dfrac{48}{12} = 4$.\n\n" +
      "Conclusion : la hauteur est $4$ cm.",
    tags: ["volume", "defi", "brevet", "short"],
  },
  {
    kind: "fixed",
    id: "3e_volume_defi_fixed_3_comparer",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un cube d’arête $3$ cm et un pavé droit de dimensions $3 \\times 3 \\times 2$ cm : lequel a le plus grand volume ?",
    format: "qcm",
    choices: ["le cube", "le pavé droit", "ils ont le même volume", "on ne peut pas savoir"],
    expected: ["le cube"],
    comparator: "mcq_exact",
    hint: "Calcule les deux volumes.",
    explanation:
      "Définition : on compare les volumes calculés.\n\n" +
      "Méthode : cube $= 3^3$ ; pavé $= 3 \\times 3 \\times 2$.\n\n" +
      "Calcul : cube $= 27\\ \\text{cm}^3$ ; pavé $= 18\\ \\text{cm}^3$.\n\n" +
      "Conclusion : le cube a le plus grand volume.",
    tags: ["volume", "defi", "comparaison", "qcm"],
  },
];