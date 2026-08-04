// lib/tutor-v4/question-banks/maths/3e/aires.bank.ts

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

/* =========================
   HELPERS
========================= */

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  // Jamais deux fois la même ligne. Un gabarit dont le piège coïncide avec la
  // bonne réponse (les coordonnées inversées quand x = y, un arrondi égal à la
  // valeur de départ…) affichait la même proposition deux fois, et l'élève
  // voyait deux réponses justes. Dédupliquer AVANT de couper à quatre laisse
  // aussi une chance aux distracteurs surnuméraires de prendre la place.
  // ⚠️ 04/08/2026 — la bonne réponse était jetée dans le même chapeau que les
  // pièges : à cinq pièges écrits, le mélange pouvait la laisser au fond et
  // le découpage à quatre l'emportait. L'élève voyait alors quatre pièges et
  // rien d'autre. On la met de côté, on tire trois distracteurs, on mélange.
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function formatNumber(n: number) {
  const rounded = Math.round(n * 100) / 100;
  return Number.isInteger(rounded)
    ? String(rounded)
    : String(rounded).replace(".", ",");
}

function figureLibreCanvas(params: {
  rows: number;
  cols: number;
  filledCells: Array<[number, number]>;
  showCellLabels?: boolean;
  showPerimeter?: boolean;
}) {
  return {
    kind: "figure_libre",
    grid: {
      rows: params.rows,
      cols: params.cols,
      filledCells: params.filledCells,
    },
    display: {
      showGrid: true,
      showFilled: true,
      showCellLabels: params.showCellLabels ?? true,
      showPerimeter: params.showPerimeter ?? false,
    },
    size: {
      cellSize: 28,
      padding: 16,
    },
  } as any;
}

export const airesBank: TutorBankItemV4[] = [
  /* =========================
     AIRE_COMPRENDRE
  ========================= */

  {
    kind: "template",
    id: "3e_aire_comprendre_tpl_1_compter_cases",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_comprendre",
    difficulty: 1,
    theme: "neutral",
    hint: "Chaque carré colorié représente 1 unité d’aire.",
    tags: ["aire", "comprendre", "quadrillage", "template"],
    generate: () => {
      const rows = 4;
      const cols = 5;
      const nb = randomInt(6, 12);

      const allCells: Array<[number, number]> = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          allCells.push([r, c]);
        }
      }

      const filledCells = shuffle(allCells).slice(0, nb);

      return {
        text: "Quelle est l’aire de la figure coloriée en unités d’aire ?",
        format: "short",
        expected: [String(nb)],
        comparator: "number_equal",
        explanation:
          "Définition : l’aire mesure la surface occupée par une figure.\n\n" +
          "Méthode : sur un quadrillage, on compte les carrés unités coloriés.\n\n" +
          `Calcul : il y a ${nb} carrés coloriés.\n\n` +
          `Conclusion : l’aire de la figure est ${nb} unités d’aire.`,
        canvas: figureLibreCanvas({
          rows,
          cols,
          filledCells,
          showCellLabels: true,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "3e_aire_comprendre_tpl_2_rectangle_cases",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_comprendre",
    difficulty: 1,
    theme: "neutral",
    hint: "Tu peux compter les cases ou faire longueur × largeur.",
    tags: ["aire", "rectangle", "quadrillage", "template"],
    generate: () => {
      const longueur = randomInt(3, 6);
      const largeur = randomInt(2, 4);
      const aire = longueur * largeur;

      const filledCells: Array<[number, number]> = [];
      for (let r = 0; r < largeur; r++) {
        for (let c = 0; c < longueur; c++) {
          filledCells.push([r, c]);
        }
      }

      return {
        text: "Quelle est l’aire du rectangle colorié en unités d’aire ?",
        format: "short",
        expected: [String(aire)],
        comparator: "number_equal",
        explanation:
          "Définition : l’aire d’un rectangle correspond au nombre de carrés unités qu’il contient.\n\n" +
          "Méthode : on peut compter les cases ou calculer longueur × largeur.\n\n" +
          `Calcul : ${longueur} × ${largeur} = ${aire}.\n\n` +
          `Conclusion : l’aire du rectangle est ${aire} unités d’aire.`,
        canvas: figureLibreCanvas({
          rows: largeur + 1,
          cols: longueur + 1,
          filledCells,
          showCellLabels: true,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "3e_aire_comprendre_tpl_3_unite",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_comprendre",
    difficulty: 2,
    theme: "neutral",
    hint: "Une aire s’exprime avec une unité au carré.",
    tags: ["aire", "unite", "template", "qcm"],
    generate: () => {
      const unite = randomChoice(["cm", "m", "km"]);
      const correct = `${unite}²`;

      return {
        text: `Quelle unité convient pour mesurer une aire si les longueurs sont en ${unite} ?`,
        format: "qcm",
        choices: makeChoices(correct, [`${unite}`, `${unite}³`, "degrés"]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : une aire mesure une surface.\n\n" +
          "Méthode : quand une longueur est mesurée dans une unité, l’aire correspondante s’exprime avec cette unité au carré.\n\n" +
          `Calcul : si les longueurs sont en ${unite}, les aires sont en ${unite}².\n\n` +
          `Conclusion : l’unité d’aire correcte est ${correct}.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_aire_comprendre_piege_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "Un élève dit : « Le périmètre et l’aire, c’est la même chose. » A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le périmètre mesure le contour, l’aire mesure la surface.",
    explanation:
      "Définition : le périmètre mesure la longueur du contour, tandis que l’aire mesure la surface intérieure.\n\n" +
      "Méthode : on distingue ce qu’on mesure : contour ou surface.\n\n" +
      "Calcul : une figure peut avoir un grand périmètre sans avoir la même aire qu’une autre figure.\n\n" +
      "Conclusion : l’élève a tort, aire et périmètre sont deux grandeurs différentes.",
    tags: ["aire", "perimetre", "piege", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_aire_comprendre_piege_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle unité est correcte pour exprimer l’aire d’une surface ?",
    format: "qcm",
    choices: ["cm", "cm²", "cm³", "kg"],
    expected: ["cm²"],
    comparator: "mcq_exact",
    hint: "Une aire utilise une unité au carré.",
    explanation:
      "Définition : une aire mesure une surface.\n\n" +
      "Méthode : une surface s’exprime avec une unité au carré.\n\n" +
      "Calcul : cm mesure une longueur, cm² mesure une aire, cm³ mesure un volume.\n\n" +
      "Conclusion : l’unité correcte est cm².",
    tags: ["aire", "unite", "piege", "qcm"],
  },

  {
    kind: "template",
    id: "3e_aire_comprendre_tpl_4_reunion",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_comprendre",
    difficulty: 2,
    theme: "reunion",
    hint: "Compte les carreaux occupés par la zone.",
    tags: ["aire", "reunion", "quadrillage", "template"],
    generate: () => {
      const rows = 5;
      const cols = 5;
      const filledCells: Array<[number, number]> = [
        [1, 1],
        [1, 2],
        [1, 3],
        [2, 1],
        [2, 2],
        [2, 3],
        [3, 2],
      ];

      return {
        text:
          "Dans un jardin pédagogique à La Réunion, une zone est représentée sur quadrillage. " +
          "Quelle est son aire en carreaux unités ?",
        format: "short",
        expected: [String(filledCells.length)],
        comparator: "number_equal",
        explanation:
          "Définition : l’aire mesure la surface occupée par une figure.\n\n" +
          "Méthode : sur un quadrillage, on compte les carreaux coloriés.\n\n" +
          `Calcul : la zone contient ${filledCells.length} carreaux.\n\n` +
          `Conclusion : son aire est ${filledCells.length} unités d’aire.`,
        canvas: figureLibreCanvas({
          rows,
          cols,
          filledCells,
          showCellLabels: true,
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_aire_comprendre_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_comprendre",
    difficulty: 3,
    theme: "neutral",
    text: "Explique avec tes mots la différence entre aire et périmètre.",
    format: "open",
    expected: ["surface", "contour"],
    comparator: "contains_keyword",
    hint: "Utilise les mots surface et contour.",
    explanation:
      "Définition : l’aire mesure une surface, le périmètre mesure un contour.\n\n" +
      "Méthode : pour distinguer les deux, on se demande si on remplit la figure ou si on en fait le tour.\n\n" +
      "Calcul : compter des carreaux donne une aire ; additionner les côtés donne un périmètre.\n\n" +
      "Conclusion : l’aire correspond à l’intérieur de la figure, le périmètre à son contour.",
    tags: ["aire", "perimetre", "open"],
  },
    /* =========================
     AIRE_TRIANGLE
  ========================= */

  {
    kind: "template",
    id: "3e_aire_triangle_tpl_1_base_hauteur",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_triangle",
    difficulty: 2,
    theme: "neutral",
    hint: "Aire d’un triangle = base × hauteur ÷ 2.",
    tags: ["aire", "triangle", "base", "hauteur", "template"],
    generate: () => {
      const base = randomChoice([4, 6, 8, 10, 12]);
      const hauteur = randomChoice([3, 5, 6, 7, 9]);
      const aire = (base * hauteur) / 2;

      return {
        text: `Un triangle a une base de ${base} cm et une hauteur associée de ${hauteur} cm. Quelle est son aire ?`,
        format: "short",
        expected: [formatNumber(aire)],
        comparator: "number_equal",
        explanation:
          "Définition : l’aire d’un triangle se calcule avec une base et la hauteur associée.\n\n" +
          "Méthode : on utilise la formule Aire = base × hauteur ÷ 2.\n\n" +
          `Calcul : ${base} × ${hauteur} ÷ 2 = ${formatNumber(aire)}.\n\n` +
          `Conclusion : l’aire du triangle est ${formatNumber(aire)} cm².`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_aire_triangle_tpl_2_qcm",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_triangle",
    difficulty: 2,
    theme: "neutral",
    hint: "N’oublie pas de diviser par 2.",
    tags: ["aire", "triangle", "qcm", "template"],
    generate: () => {
      const base = randomChoice([6, 8, 10, 12]);
      const hauteur = randomChoice([4, 5, 6, 8]);
      const aire = (base * hauteur) / 2;

      return {
        text: `Quelle est l’aire d’un triangle de base ${base} cm et de hauteur ${hauteur} cm ?`,
        format: "qcm",
        choices: makeChoices(formatNumber(aire), [
          String(base * hauteur),
          String(base + hauteur),
          String(2 * (base + hauteur)),
        ]),
        expected: [formatNumber(aire)],
        comparator: "mcq_exact",
        explanation:
          "Définition : un triangle occupe la moitié d’un rectangle de même base et de même hauteur.\n\n" +
          "Méthode : on calcule base × hauteur, puis on divise par 2.\n\n" +
          `Calcul : ${base} × ${hauteur} ÷ 2 = ${formatNumber(aire)}.\n\n` +
          `Conclusion : l’aire est ${formatNumber(aire)} cm².`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_aire_triangle_tpl_3_retrouver_hauteur",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_triangle",
    difficulty: 3,
    theme: "neutral",
    hint: "Si Aire = base × hauteur ÷ 2, alors hauteur = 2 × Aire ÷ base.",
    tags: ["aire", "triangle", "hauteur", "template"],
    generate: () => {
      const base = randomChoice([4, 5, 6, 8, 10]);
      const hauteur = randomChoice([3, 4, 6, 7, 9]);
      const aire = (base * hauteur) / 2;

      return {
        text: `Un triangle a une aire de ${formatNumber(aire)} cm² et une base de ${base} cm. Quelle est sa hauteur associée ?`,
        format: "short",
        expected: [String(hauteur)],
        comparator: "number_equal",
        explanation:
          "Définition : dans la formule de l’aire du triangle, la hauteur est associée à la base choisie.\n\n" +
          "Méthode : on transforme la formule Aire = base × hauteur ÷ 2.\n\n" +
          `Calcul : hauteur = 2 × ${formatNumber(aire)} ÷ ${base} = ${hauteur}.\n\n` +
          `Conclusion : la hauteur associée mesure ${hauteur} cm.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_aire_triangle_tpl_4_reunion",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_triangle",
    difficulty: 3,
    theme: "reunion",
    hint: "Le terrain est triangulaire : utilise base × hauteur ÷ 2.",
    tags: ["aire", "triangle", "reunion", "probleme", "template"],
    generate: () => {
      const base = randomChoice([12, 16, 20, 24]);
      const hauteur = randomChoice([8, 10, 12, 15]);
      const aire = (base * hauteur) / 2;

      return {
        text:
          `À La Réunion, une parcelle triangulaire a une base de ${base} m ` +
          `et une hauteur associée de ${hauteur} m. Quelle est son aire ?`,
        format: "short",
        expected: [formatNumber(aire)],
        comparator: "number_equal",
        explanation:
          "Définition : l’aire d’un triangle se calcule avec une base et la hauteur correspondante.\n\n" +
          "Méthode : on applique Aire = base × hauteur ÷ 2.\n\n" +
          `Calcul : ${base} × ${hauteur} ÷ 2 = ${formatNumber(aire)}.\n\n` +
          `Conclusion : l’aire de la parcelle est ${formatNumber(aire)} m².`,
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_aire_triangle_piege_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_triangle",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève calcule l’aire d’un triangle de base 8 cm et de hauteur 5 cm ainsi : 8 × 5 = 40. A-t-il terminé correctement ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Pour un triangle, il faut diviser par 2.",
    explanation:
      "Définition : un triangle représente la moitié d’un rectangle de même base et de même hauteur.\n\n" +
      "Méthode : on calcule base × hauteur puis on divise par 2.\n\n" +
      "Calcul : 8 × 5 ÷ 2 = 20.\n\n" +
      "Conclusion : l’aire correcte est 20 cm², pas 40 cm².",
    tags: ["aire", "triangle", "piege", "oubli_diviser_2"],
  },

  {
    kind: "fixed",
    id: "3e_aire_triangle_piege_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_triangle",
    difficulty: 3,
    theme: "neutral",
    text: "Pour calculer l’aire d’un triangle, peut-on utiliser n’importe quel côté avec n’importe quelle hauteur ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "La hauteur doit être associée à la base choisie.",
    explanation:
      "Définition : dans un triangle, la hauteur utilisée doit correspondre à la base choisie.\n\n" +
      "Méthode : on choisit une base puis la hauteur perpendiculaire à cette base.\n\n" +
      "Calcul : si la base est AB, la hauteur doit être perpendiculaire à AB.\n\n" +
      "Conclusion : on ne peut pas mélanger une base et une hauteur non associée.",
    tags: ["aire", "triangle", "piege", "base_hauteur"],
  },

  {
    kind: "template",
    id: "3e_aire_triangle_tpl_5_rectangle_moitie",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_triangle",
    difficulty: 2,
    theme: "neutral",
    hint: "Un triangle rectangle est la moitié d’un rectangle.",
    tags: ["aire", "triangle_rectangle", "template"],
    generate: () => {
      const cote1 = randomChoice([3, 4, 5, 6, 8]);
      const cote2 = randomChoice([4, 6, 8, 10, 12]);
      const aire = (cote1 * cote2) / 2;

      return {
        text: `Un triangle rectangle a des côtés de l’angle droit mesurant ${cote1} cm et ${cote2} cm. Quelle est son aire ?`,
        format: "short",
        expected: [formatNumber(aire)],
        comparator: "number_equal",
        explanation:
          "Définition : dans un triangle rectangle, les deux côtés de l’angle droit peuvent servir de base et de hauteur.\n\n" +
          "Méthode : on calcule le produit des deux côtés de l’angle droit puis on divise par 2.\n\n" +
          `Calcul : ${cote1} × ${cote2} ÷ 2 = ${formatNumber(aire)}.\n\n` +
          `Conclusion : l’aire est ${formatNumber(aire)} cm².`,
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_aire_triangle_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_triangle",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi on divise par 2 dans la formule de l’aire d’un triangle.",
    format: "open",
    expected: ["rectangle", "moitie", "base", "hauteur"],
    comparator: "contains_keyword",
    hint: "Compare avec un rectangle de même base et de même hauteur.",
    explanation:
      "Définition : un triangle peut être vu comme la moitié d’un rectangle de même base et de même hauteur.\n\n" +
      "Méthode : on compare les deux surfaces.\n\n" +
      "Calcul : le rectangle a pour aire base × hauteur ; le triangle correspondant en occupe la moitié.\n\n" +
      "Conclusion : on divise donc par 2 pour obtenir l’aire du triangle.",
    tags: ["aire", "triangle", "open", "justification"],
  },
    /* =========================
     AIRE_DISQUE
  ========================= */

  {
    kind: "template",
    id: "3e_aire_disque_tpl_1_rayon",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_disque",
    difficulty: 2,
    theme: "neutral",
    hint: "Aire d’un disque = π × r².",
    tags: ["aire", "disque", "rayon", "template"],
    generate: () => {
      const r = randomChoice([2, 3, 4, 5, 6, 7, 8]);
      const exact = `${r * r}π`;
      const approx = Math.PI * r * r;

      return {
        text: `Un disque a un rayon de ${r} cm. Quelle est son aire exacte ?`,
        format: "qcm",
        choices: makeChoices(exact, [
          `${2 * r}π`,
          `${r}π`,
          `${2 * r * r}π`,
        ]),
        expected: [exact],
        comparator: "mcq_exact",
        explanation:
          "Définition : l’aire d’un disque se calcule avec la formule π × r².\n\n" +
          "Méthode : on identifie le rayon, puis on calcule r².\n\n" +
          `Calcul : r = ${r}, donc aire = π × ${r}² = ${exact}, soit environ ${formatNumber(approx)} cm².\n\n` +
          `Conclusion : l’aire exacte du disque est ${exact} cm².`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_aire_disque_tpl_2_diametre",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_disque",
    difficulty: 3,
    theme: "neutral",
    hint: "Le rayon est la moitié du diamètre.",
    tags: ["aire", "disque", "diametre", "template"],
    generate: () => {
      const d = randomChoice([4, 6, 8, 10, 12, 14, 16]);
      const r = d / 2;
      const exact = `${r * r}π`;

      return {
        text: `Un disque a un diamètre de ${d} cm. Quelle est son aire exacte ?`,
        format: "short",
        expected: [exact, `${r * r}pi`, `${r * r}π cm²`, `${r * r}pi cm²`],
        comparator: "exact_text",
        explanation:
          "Définition : l’aire d’un disque est π × r².\n\n" +
          "Méthode : si on connaît le diamètre, on calcule d’abord le rayon.\n\n" +
          `Calcul : rayon = ${d} ÷ 2 = ${r}. Donc aire = π × ${r}² = ${exact}.\n\n` +
          `Conclusion : l’aire exacte est ${exact} cm².`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_aire_disque_tpl_3_approx",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_disque",
    difficulty: 3,
    theme: "neutral",
    hint: "Utilise π ≈ 3,14.",
    tags: ["aire", "disque", "approximation", "template"],
    generate: () => {
      const r = randomChoice([2, 3, 4, 5, 6]);
      const approx = 3.14 * r * r;

      return {
        text: `En prenant π ≈ 3,14, calculer l’aire d’un disque de rayon ${r} cm.`,
        format: "short",
        expected: [formatNumber(approx)],
        comparator: "number_equal",
        explanation:
          "Définition : l’aire d’un disque est π × r².\n\n" +
          "Méthode : on remplace π par 3,14 puis on calcule.\n\n" +
          `Calcul : 3,14 × ${r}² = 3,14 × ${r * r} = ${formatNumber(approx)}.\n\n` +
          `Conclusion : l’aire est environ ${formatNumber(approx)} cm².`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_aire_disque_tpl_4_reunion",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_disque",
    difficulty: 3,
    theme: "reunion",
    hint: "Un rond-point est modélisé par un disque.",
    tags: ["aire", "disque", "reunion", "probleme", "template"],
    generate: () => {
      const r = randomChoice([5, 6, 8, 10]);
      const exact = `${r * r}π`;

      return {
        text:
          `À La Réunion, un rond-point est modélisé par un disque de rayon ${r} m. ` +
          `Quelle est son aire exacte ?`,
        format: "qcm",
        choices: makeChoices(exact, [
          `${2 * r}π`,
          `${r}π`,
          `${r * r * 2}π`,
        ]),
        expected: [exact],
        comparator: "mcq_exact",
        explanation:
          "Définition : l’aire d’un disque se calcule avec π × r².\n\n" +
          "Méthode : on identifie le rayon du rond-point.\n\n" +
          `Calcul : aire = π × ${r}² = ${exact}.\n\n` +
          `Conclusion : l’aire exacte du rond-point est ${exact} m².`,
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_aire_disque_piege_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_disque",
    difficulty: 3,
    theme: "neutral",
    text: "Un disque a un diamètre de 10 cm. Un élève utilise directement r = 10 dans la formule πr². A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le rayon est la moitié du diamètre.",
    explanation:
      "Définition : la formule de l’aire d’un disque utilise le rayon, pas le diamètre.\n\n" +
      "Méthode : on divise le diamètre par 2 pour obtenir le rayon.\n\n" +
      "Calcul : si le diamètre vaut 10 cm, alors le rayon vaut 5 cm.\n\n" +
      "Conclusion : l’élève a tort : il fallait utiliser r = 5.",
    tags: ["aire", "disque", "piege", "diametre"],
  },

  {
    kind: "fixed",
    id: "3e_aire_disque_piege_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_disque",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle formule permet de calculer l’aire d’un disque de rayon r ?",
    format: "qcm",
    choices: ["πr²", "2πr", "πd", "r²"],
    expected: ["πr²"],
    comparator: "mcq_exact",
    hint: "2πr correspond au périmètre du cercle.",
    explanation:
      "Définition : l’aire mesure la surface du disque.\n\n" +
      "Méthode : on distingue aire et périmètre.\n\n" +
      "Calcul : l’aire du disque est πr², alors que le périmètre du cercle est 2πr.\n\n" +
      "Conclusion : la bonne formule est πr².",
    tags: ["aire", "disque", "formule", "piege"],
  },

  {
    kind: "fixed",
    id: "3e_aire_disque_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_disque",
    difficulty: 4,
    theme: "neutral",
    text: "Explique la différence entre l’aire d’un disque et le périmètre d’un cercle.",
    format: "open",
    expected: ["surface", "contour", "πr²", "2πr"],
    comparator: "contains_keyword",
    hint: "L’aire mesure l’intérieur, le périmètre mesure le tour.",
    explanation:
      "Définition : l’aire d’un disque mesure sa surface, tandis que le périmètre d’un cercle mesure son contour.\n\n" +
      "Méthode : on choisit la formule selon ce qu’on cherche.\n\n" +
      "Calcul : aire = πr² ; périmètre = 2πr.\n\n" +
      "Conclusion : il ne faut pas confondre surface et contour.",
    tags: ["aire", "disque", "open", "perimetre"],
  },
    /* =========================
     AIRE_FIGURE_COMPOSEE
  ========================= */

  {
    kind: "template",
    id: "3e_aire_figure_composee_tpl_1_rect_triangle",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_figure_composee",
    difficulty: 3,
    theme: "neutral",
    hint: "Découpe la figure en plusieurs formes simples.",
    tags: ["aire", "figure_composee", "rectangle", "triangle", "template"],
    generate: () => {
      const L = randomChoice([8, 10, 12]);
      const l = randomChoice([4, 5, 6]);
      const b = randomChoice([4, 6, 8]);
      const h = randomChoice([3, 4, 5]);

      const aireRect = L * l;
      const aireTri = (b * h) / 2;
      const total = aireRect + aireTri;

      return {
        text:
          `Une figure est composée d’un rectangle ${L} cm × ${l} cm ` +
          `et d’un triangle de base ${b} cm et de hauteur ${h} cm. ` +
          `Calculer l’aire totale.`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation:
          "Définition : une figure composée peut être découpée en figures simples.\n\n" +
          "Méthode : on calcule chaque aire séparément puis on additionne.\n\n" +
          `Calcul : aire rectangle = ${L} × ${l} = ${aireRect}.\n` +
          `Aire triangle = (${b} × ${h}) ÷ 2 = ${aireTri}.\n` +
          `Aire totale = ${aireRect} + ${aireTri} = ${total}.\n\n` +
          `Conclusion : l’aire totale est ${total} cm².`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_aire_figure_composee_tpl_2_disque_rectangle",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_figure_composee",
    difficulty: 4,
    theme: "neutral",
    hint: "Additionne les aires des différentes parties.",
    tags: ["aire", "figure_composee", "disque", "rectangle", "template"],
    generate: () => {
      const L = randomChoice([10, 12, 15]);
      const l = randomChoice([4, 5, 6]);
      const r = randomChoice([2, 3, 4]);

      const aireRect = L * l;
      const aireDisque = r * r;
      const total = aireRect + aireDisque;

      return {
        text:
          `Une figure est composée d’un rectangle ${L} cm × ${l} cm ` +
          `et d’un disque de rayon ${r} cm. ` +
          `Quelle est son aire exacte ?`,
        format: "short",
        expected: [
          `${aireRect}+${aireDisque}π`,
          `${aireDisque}π+${aireRect}`,
        ],
        comparator: "exact_text",
        explanation:
          "Définition : une figure composée peut contenir plusieurs formes.\n\n" +
          "Méthode : on calcule chaque aire séparément.\n\n" +
          `Calcul : aire rectangle = ${aireRect}.\n` +
          `Aire disque = ${aireDisque}π.\n` +
          `Aire totale = ${aireRect} + ${aireDisque}π.\n\n` +
          `Conclusion : l’aire exacte est ${aireRect} + ${aireDisque}π cm².`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_aire_figure_composee_tpl_3_retrait",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_figure_composee",
    difficulty: 4,
    theme: "neutral",
    hint: "Parfois il faut soustraire une partie.",
    tags: ["aire", "figure_composee", "soustraction", "template"],
    generate: () => {
      const grandL = randomChoice([12, 14, 16]);
      const grandl = randomChoice([8, 10]);
      const petitL = randomChoice([4, 5, 6]);
      const petitl = randomChoice([2, 3, 4]);

      const grand = grandL * grandl;
      const petit = petitL * petitl;
      const reste = grand - petit;

      return {
        text:
          `On retire un petit rectangle ${petitL} cm × ${petitl} cm ` +
          `d’un grand rectangle ${grandL} cm × ${grandl} cm. ` +
          `Quelle est l’aire restante ?`,
        format: "short",
        expected: [String(reste)],
        comparator: "number_equal",
        explanation:
          "Définition : une figure composée peut être obtenue par retrait d’une partie.\n\n" +
          "Méthode : on calcule l’aire totale puis on retire l’aire manquante.\n\n" +
          `Calcul : grand rectangle = ${grand}.\n` +
          `Petit rectangle = ${petit}.\n` +
          `Aire restante = ${grand} - ${petit} = ${reste}.\n\n` +
          `Conclusion : l’aire restante est ${reste} cm².`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_aire_figure_composee_tpl_4_reunion",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_figure_composee",
    difficulty: 4,
    theme: "reunion",
    hint: "Découpe le jardin en formes simples.",
    tags: ["aire", "figure_composee", "reunion", "template"],
    generate: () => {
      const rectL = randomChoice([10, 12, 14]);
      const rectl = randomChoice([5, 6, 7]);
      const triB = randomChoice([4, 6, 8]);
      const triH = randomChoice([3, 4, 5]);

      const aireRect = rectL * rectl;
      const aireTri = (triB * triH) / 2;
      const total = aireRect + aireTri;

      return {
        text:
          `À La Réunion, un jardin est composé d’une partie rectangulaire ` +
          `${rectL} m × ${rectl} m et d’une partie triangulaire ` +
          `de base ${triB} m et de hauteur ${triH} m. ` +
          `Calculer son aire totale.`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation:
          "Définition : on peut décomposer un terrain complexe en formes simples.\n\n" +
          "Méthode : on calcule séparément les différentes aires.\n\n" +
          `Calcul : rectangle = ${aireRect} m².\n` +
          `Triangle = ${aireTri} m².\n` +
          `Total = ${aireRect} + ${aireTri} = ${total}.\n\n` +
          `Conclusion : l’aire totale du jardin est ${total} m².`,
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_aire_figure_composee_piege_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_figure_composee",
    difficulty: 4,
    theme: "neutral",
    text:
      "Pour calculer l’aire d’une figure composée, un élève additionne tous les côtés. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Additionner les côtés sert au périmètre.",
    explanation:
      "Définition : l’aire mesure une surface, le périmètre mesure un contour.\n\n" +
      "Méthode : pour une aire composée, on additionne ou soustrait des aires.\n\n" +
      "Calcul : additionner les côtés ne donne qu’un périmètre.\n\n" +
      "Conclusion : l’élève a tort.",
    tags: ["aire", "figure_composee", "piege"],
  },

  {
    kind: "fixed",
    id: "3e_aire_figure_composee_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_figure_composee",
    difficulty: 5,
    theme: "neutral",
    text:
      "Explique pourquoi il est souvent utile de découper une figure composée en plusieurs figures simples.",
    format: "open",
    expected: ["calcul", "simple", "rectangle", "triangle", "disque"],
    comparator: "contains_keyword",
    hint: "Les formules sont connues pour les figures simples.",
    explanation:
      "Définition : une figure composée est formée de plusieurs figures simples.\n\n" +
      "Méthode : on découpe la figure pour utiliser les formules connues.\n\n" +
      "Calcul : on calcule chaque aire séparément puis on additionne ou on soustrait.\n\n" +
      "Conclusion : cela rend les calculs plus simples et plus fiables.",
    tags: ["aire", "figure_composee", "open"],
  },
    /* =========================
     AIRE_AGRANDISSEMENT_REDUCTION
  ========================= */

  {
    kind: "fixed",
    id: "3e_aire_agrandissement_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_agrandissement_reduction",
    difficulty: 2,
    theme: "neutral",
    text:
      "Une figure est agrandie avec un coefficient 2. Par combien est multipliée son aire ?",
    format: "qcm",
    choices: ["2", "4", "8", "16"],
    expected: ["4"],
    comparator: "mcq_exact",
    hint: "L’aire est multipliée par le carré du coefficient.",
    explanation:
      "Définition : lors d’un agrandissement, les longueurs sont multipliées par k.\n\n" +
      "Méthode : les aires sont multipliées par k².\n\n" +
      "Calcul : ici k = 2 donc k² = 4.\n\n" +
      "Conclusion : l’aire est multipliée par 4.",
    tags: ["aire", "agrandissement", "coefficient"],
  },

  {
    kind: "fixed",
    id: "3e_aire_agrandissement_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_agrandissement_reduction",
    difficulty: 3,
    theme: "neutral",
    text:
      "Une figure est réduite avec un coefficient 0,5. Que devient son aire ?",
    format: "qcm",
    choices: [
      "elle est divisée par 2",
      "elle est divisée par 4",
      "elle reste identique",
      "elle est multipliée par 2",
    ],
    expected: ["elle est divisée par 4"],
    comparator: "mcq_exact",
    hint: "On élève le coefficient au carré.",
    explanation:
      "Définition : l’aire dépend du carré du coefficient d’agrandissement.\n\n" +
      "Méthode : on calcule k².\n\n" +
      "Calcul : 0,5² = 0,25 = 1/4.\n\n" +
      "Conclusion : l’aire est divisée par 4.",
    tags: ["aire", "reduction", "coefficient"],
  },

  {
    kind: "template",
    id: "3e_aire_agrandissement_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_agrandissement_reduction",
    difficulty: 3,
    theme: "neutral",
    hint: "L’aire est multipliée par k².",
    tags: ["aire", "agrandissement", "template"],
    generate: () => {
      const coeff = randomChoice([2, 3, 4]);
      const aire = randomChoice([5, 8, 10, 12]);

      const nouvelleAire = aire * coeff * coeff;

      return {
        text:
          `Une figure d’aire ${aire} cm² est agrandie ` +
          `avec un coefficient ${coeff}. ` +
          `Quelle est la nouvelle aire ?`,
        format: "short",
        expected: [String(nouvelleAire)],
        comparator: "number_equal",
        explanation:
          "Définition : les aires sont multipliées par le carré du coefficient.\n\n" +
          "Méthode : on calcule k² puis on multiplie l’aire initiale.\n\n" +
          `Calcul : ${coeff}² = ${coeff * coeff}.\n` +
          `${aire} × ${coeff * coeff} = ${nouvelleAire}.\n\n` +
          `Conclusion : la nouvelle aire est ${nouvelleAire} cm².`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_aire_agrandissement_tpl_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_agrandissement_reduction",
    difficulty: 4,
    theme: "neutral",
    hint: "Le coefficient agit au carré sur l’aire.",
    tags: ["aire", "reduction", "template"],
    generate: () => {
      const coeff = randomChoice([0.5, 0.2]);
      const aire = randomChoice([40, 60, 80, 100]);

      const nouvelleAire = aire * coeff * coeff;

      return {
        text:
          `Une figure d’aire ${aire} cm² est réduite ` +
          `avec un coefficient ${coeff}. ` +
          `Quelle est la nouvelle aire ?`,
        format: "short",
        expected: [String(nouvelleAire)],
        comparator: "number_equal",
        explanation:
          "Définition : lors d’une réduction, les aires sont multipliées par k².\n\n" +
          "Méthode : on calcule le carré du coefficient.\n\n" +
          `Calcul : ${coeff}² = ${nouvelleAire / aire}.\n` +
          `${aire} × ${nouvelleAire / aire} = ${nouvelleAire}.\n\n` +
          `Conclusion : la nouvelle aire est ${nouvelleAire} cm².`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_aire_agrandissement_tpl_3_reunion",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_agrandissement_reduction",
    difficulty: 4,
    theme: "reunion",
    hint: "Attention : l’aire ne suit pas directement le coefficient.",
    tags: ["aire", "agrandissement", "reunion", "template"],
    generate: () => {
      const coeff = randomChoice([2, 3]);
      const aire = randomChoice([25, 30, 40]);

      const nouvelleAire = aire * coeff * coeff;

      return {
        text:
          `À La Réunion, un terrain de ${aire} m² est représenté ` +
          `sur un plan agrandi avec un coefficient ${coeff}. ` +
          `Quelle serait l’aire correspondante après agrandissement ?`,
        format: "short",
        expected: [String(nouvelleAire)],
        comparator: "number_equal",
        explanation:
          "Définition : lors d’un agrandissement, les longueurs sont multipliées par k.\n\n" +
          "Méthode : l’aire est multipliée par k².\n\n" +
          `Calcul : ${coeff}² = ${coeff * coeff}.\n` +
          `${aire} × ${coeff * coeff} = ${nouvelleAire}.\n\n` +
          `Conclusion : l’aire agrandie est ${nouvelleAire} m².`,
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_aire_agrandissement_piege_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_agrandissement_reduction",
    difficulty: 4,
    theme: "neutral",
    text:
      "Un élève affirme : « Si on double les longueurs, on double l’aire. » A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "L’aire dépend du carré du coefficient.",
    explanation:
      "Définition : les aires varient avec le carré du coefficient.\n\n" +
      "Méthode : si les longueurs sont multipliées par 2, les aires sont multipliées par 2².\n\n" +
      "Calcul : 2² = 4.\n\n" +
      "Conclusion : l’aire est multipliée par 4 et non par 2.",
    tags: ["aire", "piege", "agrandissement"],
  },

  {
    kind: "fixed",
    id: "3e_aire_agrandissement_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_agrandissement_reduction",
    difficulty: 5,
    theme: "neutral",
    text:
      "Explique pourquoi les aires sont multipliées par le carré du coefficient d’agrandissement.",
    format: "open",
    expected: ["longueur", "largeur", "carré", "produit"],
    comparator: "contains_keyword",
    hint: "Une aire dépend de deux dimensions.",
    explanation:
      "Définition : une aire dépend de deux longueurs.\n\n" +
      "Méthode : si chaque longueur est multipliée par k, alors le produit est multiplié par k × k.\n\n" +
      "Calcul : k × k = k².\n\n" +
      "Conclusion : les aires sont multipliées par le carré du coefficient.",
    tags: ["aire", "agrandissement", "open"],
  },
    /* =========================
     AIRE_DEFIS
  ========================= */

  {
    kind: "fixed",
    id: "3e_aire_defi_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_defi",
    difficulty: 4,
    theme: "neutral",
    text:
      "Deux rectangles ont le même périmètre. Ont-ils forcément la même aire ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Teste avec plusieurs rectangles.",
    explanation:
      "Définition : le périmètre mesure le contour alors que l’aire mesure la surface.\n\n" +
      "Méthode : on compare deux rectangles ayant le même périmètre.\n\n" +
      "Calcul : un rectangle 6 × 4 et un rectangle 7 × 3 ont tous deux un périmètre de 20.\n" +
      "Mais leurs aires valent 24 et 21.\n\n" +
      "Conclusion : même périmètre ne signifie pas même aire.",
    tags: ["aire", "perimetre", "piege"],
  },

  {
    kind: "fixed",
    id: "3e_aire_defi_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_defi",
    difficulty: 5,
    theme: "neutral",
    text:
      "Un carré voit son côté multiplié par 3. Par combien son aire est-elle multipliée ?",
    format: "qcm",
    choices: ["3", "6", "9", "12"],
    expected: ["9"],
    comparator: "mcq_exact",
    hint: "L’aire dépend du carré du coefficient.",
    explanation:
      "Définition : l’aire varie avec le carré du coefficient d’agrandissement.\n\n" +
      "Méthode : on calcule 3².\n\n" +
      "Calcul : 3² = 9.\n\n" +
      "Conclusion : l’aire est multipliée par 9.",
    tags: ["aire", "agrandissement", "defi"],
  },

  {
    kind: "template",
    id: "3e_aire_defi_tpl_1_rectangle_max",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Calcule plusieurs aires possibles.",
    tags: ["aire", "rectangle", "defi", "template"],
    generate: () => {
      const perimetre = randomChoice([20, 24, 28]);

      const demi = perimetre / 2;

      const possibilities = [];

      for (let L = 1; L < demi; L++) {
        const l = demi - L;

        if (l > 0) {
          possibilities.push({
            L,
            l,
            aire: L * l,
          });
        }
      }

      const best = possibilities.reduce((a, b) =>
        a.aire > b.aire ? a : b
      );

      return {
        text:
          `On veut construire un rectangle de périmètre ${perimetre} cm. ` +
          `Quelle aire maximale peut-on obtenir ?`,
        format: "short",
        expected: [String(best.aire)],
        comparator: "number_equal",
        explanation:
          "Définition : pour un périmètre fixé, plusieurs rectangles sont possibles.\n\n" +
          "Méthode : on teste différentes dimensions.\n\n" +
          `Calcul : le rectangle donnant la plus grande aire est ${best.L} × ${best.l}.\n` +
          `Son aire vaut ${best.aire}.\n\n` +
          `Conclusion : l’aire maximale est ${best.aire} cm².`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_aire_defi_tpl_2_disque",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Utilise πr².",
    tags: ["aire", "disque", "defi", "template"],
    generate: () => {
      const r = randomChoice([2, 3, 4, 5]);

      return {
        text:
          `Un disque a un rayon de ${r} cm. ` +
          `Donner son aire exacte.`,
        format: "short",
        expected: [`${r * r}π`],
        comparator: "exact_text",
        explanation:
          "Définition : l’aire d’un disque est π × r².\n\n" +
          "Méthode : on calcule le carré du rayon.\n\n" +
          `Calcul : ${r}² = ${r * r}.\n` +
          `Aire = ${r * r}π.\n\n` +
          `Conclusion : l’aire exacte est ${r * r}π cm².`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_aire_defi_tpl_3_reunion",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "Découpe le terrain en formes simples.",
    tags: ["aire", "reunion", "figure_composee", "template"],
    generate: () => {
      const rectL = randomChoice([20, 24, 30]);
      const rectl = randomChoice([10, 12, 15]);

      const triB = randomChoice([6, 8, 10]);
      const triH = randomChoice([4, 5, 6]);

      const aireRect = rectL * rectl;
      const aireTri = (triB * triH) / 2;

      const total = aireRect + aireTri;

      return {
        text:
          `À La Réunion, un terrain agricole est composé ` +
          `d’un rectangle ${rectL} m × ${rectl} m ` +
          `et d’un triangle de base ${triB} m ` +
          `et de hauteur ${triH} m.\n` +
          `Calculer l’aire totale du terrain.`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation:
          "Définition : une figure complexe peut être découpée en figures simples.\n\n" +
          "Méthode : on calcule séparément les différentes aires.\n\n" +
          `Calcul : rectangle = ${aireRect} m².\n` +
          `Triangle = ${aireTri} m².\n` +
          `Total = ${aireRect} + ${aireTri} = ${total}.\n\n` +
          `Conclusion : l’aire totale du terrain est ${total} m².`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_aire_defi_tpl_4_carre",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "L’aire d’un carré est côté × côté.",
    tags: ["aire", "carre", "defi", "template"],
    generate: () => {
      const aire = randomChoice([25, 36, 49, 64]);

      const cote = Math.sqrt(aire);

      return {
        text:
          `Un carré a une aire de ${aire} cm². ` +
          `Quelle est la longueur de son côté ?`,
        format: "short",
        expected: [String(cote)],
        comparator: "number_equal",
        explanation:
          "Définition : l’aire d’un carré vaut côté².\n\n" +
          "Méthode : on cherche la racine carrée de l’aire.\n\n" +
          `Calcul : √${aire} = ${cote}.\n\n` +
          `Conclusion : le côté mesure ${cote} cm.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_aire_defi_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_defi",
    difficulty: 5,
    theme: "neutral",
    text:
      "Explique pourquoi il faut toujours vérifier l’unité lorsqu’on calcule une aire.",
    format: "open",
    expected: ["cm²", "m²", "surface", "unité"],
    comparator: "contains_keyword",
    hint: "Une aire ne s’exprime pas en cm mais en cm².",
    explanation:
      "Définition : une aire mesure une surface.\n\n" +
      "Méthode : on utilise des unités carrées adaptées.\n\n" +
      "Calcul : une aire peut être exprimée en cm², m², km²…\n\n" +
      "Conclusion : vérifier l’unité permet d’éviter les erreurs de sens.",
    tags: ["aire", "open", "unite"],
  },

  /* ===== AIRE_COMPRENDRE (compléments) ===== */
  {
    kind: "fixed",
    id: "3e_aire_comprendre_fixed_x1",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "L’aire d’une figure mesure…",
    format: "qcm",
    choices: ["sa surface", "son contour", "sa hauteur", "le nombre de ses côtés"],
    expected: ["sa surface"],
    comparator: "mcq_exact",
    hint: "Le contour, c’est le périmètre.",
    explanation:
      "Définition : l’aire mesure l’étendue d’une surface.\n\n" +
      "Méthode : on distingue aire (surface) et périmètre (contour).\n\n" +
      "Calcul : l’aire s’exprime en unités carrées.\n\n" +
      "Conclusion : l’aire mesure la surface.",
    tags: ["aire", "comprendre", "qcm"],
  },
  {
    kind: "template",
    id: "3e_aire_comprendre_tpl_x1_rectangle",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_comprendre",
    difficulty: 2,
    theme: "neutral",
    hint: "Aire d’un rectangle $= L \\times l$.",
    tags: ["aire", "comprendre", "rectangle", "template"],
    generate: () => {
      const L = randomInt(3, 9);
      const l = randomInt(2, 6);
      return {
        text: `Quelle est l’aire d’un rectangle de longueur $${L}$ cm et de largeur $${l}$ cm (en $\\text{cm}^2$) ?`,
        format: "short",
        expected: [String(L * l)],
        comparator: "number_equal",
        explanation:
          `Définition : aire d’un rectangle $= L \\times l$.\n\n` +
          `Méthode : on multiplie longueur et largeur.\n\n` +
          `Calcul : $${L} \\times ${l} = ${L * l}$.\n\n` +
          `Conclusion : l’aire est $${L * l}\\ \\text{cm}^2$.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_aire_comprendre_fixed_x2_unite",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle unité convient pour une aire ?",
    format: "qcm",
    choices: ["$\\text{cm}^2$", "cm", "$\\text{cm}^3$", "L"],
    expected: ["$\\text{cm}^2$"],
    comparator: "mcq_exact",
    hint: "Une surface se mesure en unités carrées.",
    explanation:
      "Définition : une aire se mesure en unités carrées.\n\n" +
      "Méthode : on choisit l’unité avec l’exposant $2$.\n\n" +
      "Calcul : le cm est une longueur, le $\\text{cm}^3$ un volume.\n\n" +
      "Conclusion : l’unité d’aire est le $\\text{cm}^2$.",
    tags: ["aire", "comprendre", "unite", "qcm"],
  },

  /* ===== AIRE_DISQUE (compléments) ===== */
  {
    kind: "fixed",
    id: "3e_aire_disque_fixed_x1_formule",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_disque",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la formule de l’aire d’un disque de rayon $r$ ?",
    format: "qcm",
    choices: ["$\\pi r^2$", "$2\\pi r$", "$\\pi r$", "$\\pi d$"],
    expected: ["$\\pi r^2$"],
    comparator: "mcq_exact",
    hint: "$2\\pi r$ est le périmètre.",
    explanation:
      "Définition : l’aire d’un disque est $\\pi r^2$.\n\n" +
      "Méthode : on distingue aire ($\\pi r^2$) et périmètre ($2\\pi r$).\n\n" +
      "Calcul : aire $= \\pi r^2$.\n\n" +
      "Conclusion : c’est $\\pi r^2$.",
    tags: ["aire", "disque", "formule", "qcm"],
  },
  {
    kind: "template",
    id: "3e_aire_disque_tpl_x1_valeur",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_disque",
    difficulty: 3,
    theme: "neutral",
    hint: "$A = \\pi r^2$, avec $\\pi \\approx 3{,}14$.",
    tags: ["aire", "disque", "valeur", "template"],
    generate: () => {
      const r = randomChoice([2, 3, 5, 10]);
      const A = Math.round(3.14 * r * r * 100) / 100;
      return {
        text: `Un disque a un rayon de $${r}$ cm. Calcule son aire au centième près (avec $\\pi \\approx 3{,}14$, en $\\text{cm}^2$).`,
        format: "short",
        expected: [String(A), String(A).replace(".", ",")],
        comparator: "number_equal",
        explanation:
          `Définition : $A = \\pi r^2$.\n\n` +
          `Méthode : on calcule $3{,}14 \\times r^2$.\n\n` +
          `Calcul : $3{,}14 \\times ${r}^2 = 3{,}14 \\times ${r * r} = ${formatNumber(A)}$.\n\n` +
          `Conclusion : l’aire est environ $${formatNumber(A)}\\ \\text{cm}^2$.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_aire_disque_fixed_x2",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_disque",
    difficulty: 3,
    theme: "neutral",
    text: "Un disque a un rayon de $4$ cm. Quelle est son aire au centième près (avec $\\pi \\approx 3{,}14$, en $\\text{cm}^2$) ?",
    format: "short",
    expected: ["50.24", "50,24"],
    comparator: "number_equal",
    hint: "$3{,}14 \\times 4^2$.",
    explanation:
      "Définition : $A = \\pi r^2$.\n\n" +
      "Méthode : on calcule $3{,}14 \\times 16$.\n\n" +
      "Calcul : $3{,}14 \\times 16 = 50{,}24$.\n\n" +
      "Conclusion : l’aire est environ $50{,}24\\ \\text{cm}^2$.",
    tags: ["aire", "disque", "short"],
  },

  /* ===== AIRE_FIGURE_COMPOSEE (compléments) ===== */
  {
    kind: "template",
    id: "3e_aire_figure_composee_tpl_x1_somme",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_figure_composee",
    difficulty: 3,
    theme: "neutral",
    hint: "On découpe la figure en deux rectangles et on additionne les aires.",
    tags: ["aire", "figure_composee", "template"],
    generate: () => {
      const a1 = randomInt(3, 6) * randomInt(2, 4);
      const a2 = randomInt(2, 5) * randomInt(2, 3);
      return {
        text: `Une figure en forme de L se décompose en deux rectangles d’aires $${a1}\\ \\text{cm}^2$ et $${a2}\\ \\text{cm}^2$. Quelle est l’aire totale (en $\\text{cm}^2$) ?`,
        format: "short",
        expected: [String(a1 + a2)],
        comparator: "number_equal",
        explanation:
          `Définition : l’aire d’une figure composée est la somme des aires des parties.\n\n` +
          `Méthode : on additionne les deux aires.\n\n` +
          `Calcul : $${a1} + ${a2} = ${a1 + a2}$.\n\n` +
          `Conclusion : l’aire totale est $${a1 + a2}\\ \\text{cm}^2$.`,
      };
    },
  },
  {
    kind: "template",
    id: "3e_aire_figure_composee_tpl_x2_difference",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_figure_composee",
    difficulty: 4,
    theme: "neutral",
    hint: "On soustrait l’aire du trou à l’aire totale.",
    tags: ["aire", "figure_composee", "difference", "template"],
    generate: () => {
      const L = randomInt(6, 10);
      const l = randomInt(4, 6);
      const c = randomInt(2, 3);
      const aire = L * l - c * c;
      return {
        text: `Dans un rectangle de $${L} \\times ${l}$ cm, on découpe un carré de côté $${c}$ cm. Quelle est l’aire restante (en $\\text{cm}^2$) ?`,
        format: "short",
        expected: [String(aire)],
        comparator: "number_equal",
        explanation:
          `Définition : on soustrait l’aire enlevée à l’aire totale.\n\n` +
          `Méthode : aire $= L \\times l - c^2$.\n\n` +
          `Calcul : $${L} \\times ${l} - ${c}^2 = ${L * l} - ${c * c} = ${aire}$.\n\n` +
          `Conclusion : l’aire restante est $${aire}\\ \\text{cm}^2$.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_aire_figure_composee_qcm_x1",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_figure_composee",
    difficulty: 3,
    theme: "neutral",
    text: "Pour calculer l’aire d’une figure composée, on peut…",
    format: "qcm",
    choices: [
      "la découper en figures simples puis additionner (ou soustraire) les aires",
      "additionner tous les côtés",
      "multiplier les périmètres",
      "compter seulement les sommets",
    ],
    expected: ["la découper en figures simples puis additionner (ou soustraire) les aires"],
    comparator: "mcq_exact",
    hint: "On se ramène à des figures connues.",
    explanation:
      "Définition : une figure composée se ramène à des figures simples.\n\n" +
      "Méthode : on découpe, on calcule chaque aire, puis on combine.\n\n" +
      "Calcul : on additionne ou on soustrait selon la forme.\n\n" +
      "Conclusion : on la découpe en figures simples.",
    tags: ["aire", "figure_composee", "methode", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_aire_figure_composee_fixed_x1",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_figure_composee",
    difficulty: 4,
    theme: "neutral",
    text: "Une figure est formée d’un carré de côté $4$ cm et d’un rectangle de $4 \\times 2$ cm accolés. Quelle est l’aire totale (en $\\text{cm}^2$) ?",
    format: "short",
    expected: ["24"],
    comparator: "number_equal",
    hint: "$16 + 8$.",
    explanation:
      "Définition : l’aire totale est la somme des aires.\n\n" +
      "Méthode : carré $= 4^2 = 16$ ; rectangle $= 4 \\times 2 = 8$.\n\n" +
      "Calcul : $16 + 8 = 24$.\n\n" +
      "Conclusion : l’aire totale est $24\\ \\text{cm}^2$.",
    tags: ["aire", "figure_composee", "short"],
  },

  /* ===== AIRE_AGRANDISSEMENT_REDUCTION (compléments) ===== */
  {
    kind: "fixed",
    id: "3e_aire_agrandissement_qcm_x1",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_agrandissement_reduction",
    difficulty: 3,
    theme: "neutral",
    text: "Si on multiplie les longueurs d’une figure par $k$, son aire est multipliée par…",
    format: "qcm",
    choices: ["$k^2$", "$k$", "$k^3$", "$2k$"],
    expected: ["$k^2$"],
    comparator: "mcq_exact",
    hint: "Une aire est en deux dimensions.",
    explanation:
      "Définition : un agrandissement de rapport $k$ multiplie l’aire par $k^2$.\n\n" +
      "Méthode : l’aire dépend de deux dimensions.\n\n" +
      "Calcul : chaque longueur ×$k$ donne une aire ×$k^2$.\n\n" +
      "Conclusion : l’aire est multipliée par $k^2$.",
    tags: ["aire", "agrandissement", "qcm"],
  },
  {
    kind: "template",
    id: "3e_aire_agrandissement_tpl_x1",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_agrandissement_reduction",
    difficulty: 4,
    theme: "neutral",
    hint: "Nouvelle aire $=$ ancienne $\\times k^2$.",
    tags: ["aire", "agrandissement", "template"],
    generate: () => {
      const A = randomChoice([5, 8, 10, 12]);
      const k = randomChoice([2, 3]);
      const newA = A * k * k;
      return {
        text: `Une figure a une aire de $${A}\\ \\text{cm}^2$. On agrandit ses longueurs d’un rapport $${k}$. Quelle est la nouvelle aire (en $\\text{cm}^2$) ?`,
        format: "short",
        expected: [String(newA)],
        comparator: "number_equal",
        explanation:
          `Définition : un agrandissement de rapport $${k}$ multiplie l’aire par $${k}^2$.\n\n` +
          `Méthode : on multiplie l’aire par $${k}^2 = ${k * k}$.\n\n` +
          `Calcul : $${A} \\times ${k * k} = ${newA}$.\n\n` +
          `Conclusion : la nouvelle aire est $${newA}\\ \\text{cm}^2$.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_aire_agrandissement_qcm_x2_double",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_agrandissement_reduction",
    difficulty: 3,
    theme: "neutral",
    text: "On double les côtés d’un carré. Son aire est multipliée par…",
    format: "qcm",
    choices: ["$4$", "$2$", "$8$", "$6$"],
    expected: ["$4$"],
    comparator: "mcq_exact",
    hint: "$k = 2$, donc $k^2 = 4$.",
    explanation:
      "Définition : doubler les longueurs, c’est $k = 2$.\n\n" +
      "Méthode : l’aire est multipliée par $k^2$.\n\n" +
      "Calcul : $2^2 = 4$.\n\n" +
      "Conclusion : l’aire est multipliée par $4$.",
    tags: ["aire", "agrandissement", "qcm"],
  },

  /* ===== AIRE_DEFI (compléments) ===== */
  {
    kind: "template",
    id: "3e_aire_defi_tpl_x1_disque_reel",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "Aire du disque $= \\pi r^2$, avec $\\pi \\approx 3{,}14$.",
    tags: ["aire", "defi", "disque", "reunion", "template"],
    generate: () => {
      const r = randomChoice([5, 10]);
      const A = Math.round(3.14 * r * r * 100) / 100;
      return {
        text: `Un rond-point circulaire a un rayon de $${r}$ m. Quelle est l’aire de la zone centrale au centième près (avec $\\pi \\approx 3{,}14$, en $\\text{m}^2$) ?`,
        format: "short",
        expected: [String(A), String(A).replace(".", ",")],
        comparator: "number_equal",
        explanation:
          `Définition : aire d’un disque $= \\pi r^2$.\n\n` +
          `Méthode : on calcule $3{,}14 \\times r^2$.\n\n` +
          `Calcul : $3{,}14 \\times ${r * r} = ${formatNumber(A)}$.\n\n` +
          `Conclusion : l’aire est environ $${formatNumber(A)}\\ \\text{m}^2$.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_aire_defi_qcm_x1",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Deux rectangles ont la même aire. Ont-ils forcément le même périmètre ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "$1 \\times 12$ et $3 \\times 4$ ont la même aire.",
    explanation:
      "Définition : aire et périmètre sont des grandeurs différentes.\n\n" +
      "Méthode : on cherche un contre-exemple.\n\n" +
      "Calcul : $1 \\times 12$ et $3 \\times 4$ ont une aire de $12$, mais des périmètres $26$ et $14$.\n\n" +
      "Conclusion : non, pas forcément le même périmètre.",
    tags: ["aire", "defi", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_aire_defi_fixed_x1_triangle",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_surface",
    microId: "aire_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un triangle a une base de $10$ cm et une hauteur de $6$ cm. Quelle est son aire (en $\\text{cm}^2$) ?",
    format: "short",
    expected: ["30"],
    comparator: "number_equal",
    hint: "Aire $= \\dfrac{b \\times h}{2}$.",
    explanation:
      "Définition : aire d’un triangle $= \\dfrac{b \\times h}{2}$.\n\n" +
      "Méthode : on multiplie base par hauteur, puis on divise par $2$.\n\n" +
      "Calcul : $\\dfrac{10 \\times 6}{2} = \\dfrac{60}{2} = 30$.\n\n" +
      "Conclusion : l’aire est $30\\ \\text{cm}^2$.",
    tags: ["aire", "defi", "triangle", "short"],
  },
]