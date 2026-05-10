import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const airesBank: TutorBankItemV4[] = [
  // =========================
  // AREA_COMPRENDRE
  // =========================
  {
    kind: "fixed",
    id: "area_comprendre_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "L’aire d’une figure mesure…",
    format: "qcm",
    choices: ["son contour", "sa surface", "sa longueur", "son angle"],
    expected: ["sa surface"],
    comparator: "mcq_exact",
    hint: "L’aire mesure la place occupée à l’intérieur.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("L’aire mesure la surface occupée par une figure, c’est-à-dire tout l’intérieur de la figure.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aires", "comprendre", "qcm"],
  },
  {
    kind: "fixed",
    id: "area_comprendre_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle unité convient pour mesurer une aire ?",
    format: "qcm",
    choices: ["cm", "cm²", "cm³", "g"],
    expected: ["cm²"],
    comparator: "mcq_exact",
    hint: "Une aire se mesure en unités carrées.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Une aire se mesure avec des unités carrées. Par exemple, on utilise cm² pour mesurer une surface.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aires", "comprendre", "qcm"],
  },
  {
    kind: "fixed",
    id: "area_comprendre_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle écriture correspond à une aire ?",
    format: "qcm",
    choices: ["15 cm", "15 cm²", "15 cm³", "15 kg"],
    expected: ["15 cm²"],
    comparator: "mcq_exact",
    hint: "Cherche l’unité carrée.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("15 cm est une longueur, 15 cm³ un volume, 15 kg une masse. Une aire s’écrit ici 15 cm².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aires", "comprendre", "qcm"],
  },
  {
    kind: "fixed",
    id: "area_comprendre_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_comprendre",
    difficulty: 2,
    theme: "reunion",
    text: "Pour mesurer la surface d’un jardin à La Réunion, on peut utiliser…",
    format: "qcm",
    choices: ["m", "m²", "m³", "L"],
    expected: ["m²"],
    comparator: "mcq_exact",
    hint: "Une surface se mesure en unités carrées.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("La surface d’un jardin est une aire. On la mesure donc en mètres carrés, notés m².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aires", "comprendre", "reunion", "qcm"],
  },
  {
    kind: "fixed",
    id: "area_comprendre_confusion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_comprendre",
    difficulty: 3,
    theme: "neutral",
    text: "Un rectangle mesure 5 cm sur 4 cm. Quelle grandeur vaut 20 ?",
    format: "qcm",
    choices: ["son périmètre en cm", "son aire en cm²", "son contour en cm²", "son volume en cm³"],
    expected: ["son aire en cm²"],
    comparator: "mcq_exact",
    hint: "Pour l’aire du rectangle, on multiplie longueur et largeur.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Pour un rectangle de 5 cm sur 4 cm, l’aire vaut 5 × 4 = 20 cm². Le périmètre vaudrait 18 cm.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aires", "comprendre", "confusion", "qcm"],
  },

  // =========================
  // AREA_COMPTER
  // =========================
  {
    kind: "fixed",
    id: "area_compter_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_compter",
    difficulty: 1,
    theme: "neutral",
    text: "Une surface recouvre 6 carreaux unités. Quelle est son aire ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "On compte les carreaux unités.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Quand on mesure une aire par comptage, on compte les carreaux unités. Ici, 6 carreaux donnent une aire de 6 unités d’aire.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aires", "compter"],
  },
  {
    kind: "fixed",
    id: "area_compter_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_compter",
    difficulty: 2,
    theme: "neutral",
    text: "Une figure occupe 12 carreaux unités. Quelle est son aire ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "L’aire est égale au nombre de carreaux unités.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("L’aire d’une figure mesurée sur quadrillage est le nombre de carreaux unités qu’elle recouvre. Ici, cela fait 12.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aires", "compter"],
  },
  {
    kind: "fixed",
    id: "area_compter_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_compter",
    difficulty: 2,
    theme: "neutral",
    text: "Une figure recouvre 9 carreaux unités. Son aire vaut…",
    format: "qcm",
    choices: ["6", "8", "9", "18"],
    expected: ["9"],
    comparator: "mcq_exact",
    hint: "On compte les carreaux.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Chaque carreau unité compte pour 1 unité d’aire. Avec 9 carreaux, l’aire est donc 9.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aires", "compter", "qcm"],
  },
  {
    kind: "fixed",
    id: "area_compter_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_compter",
    difficulty: 3,
    theme: "neutral",
    text: "Une surface couvre 3 rangées de 4 carreaux unités. Quelle est son aire ?",
    format: "qcm",
    choices: ["7", "10", "12", "14"],
    expected: ["12"],
    comparator: "mcq_exact",
    hint: "3 × 4 carreaux.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Il y a 3 rangées de 4 carreaux, donc 3 × 4 = 12 carreaux unités. L’aire est 12.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aires", "compter", "qcm"],
  },
  {
    kind: "fixed",
    id: "area_compter_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_compter",
    difficulty: 3,
    theme: "neutral",
    text: "Observe la figure sur quadrillage. Quelle est son aire en unités d’aire ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Compte les carreaux remplis.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("La figure recouvre 5 carreaux unités. Son aire vaut donc 5 unités d’aire.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aires", "compter", "canvas"],
    canvas: {
      kind: "figure_libre",
      grid: {
        rows: 5,
        cols: 5,
        filledCells: [
          [1, 1],
          [1, 2],
          [2, 1],
          [2, 2],
          [3, 1],
        ],
      },
      display: {
        showGrid: true,
        showFilled: true,
      },
    },
  },
  {
    kind: "fixed",
    id: "area_compter_canvas_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_compter",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est l’aire de cette figure sur quadrillage ?",
    format: "qcm",
    choices: ["4", "5", "6", "8"],
    expected: ["6"],
    comparator: "mcq_exact",
    hint: "Compte uniquement les carreaux remplis.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("La figure recouvre 6 carreaux unités. Son aire vaut donc 6 unités d’aire.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aires", "compter", "canvas", "qcm"],
    canvas: {
      kind: "figure_libre",
      grid: {
        rows: 5,
        cols: 5,
        filledCells: [
          [1, 1],
          [1, 2],
          [1, 3],
          [2, 1],
          [2, 2],
          [3, 1],
        ],
      },
      display: {
        showGrid: true,
        showFilled: true,
      },
    },
  },

  // =========================
  // AREA_RECTANGLE
  // =========================
  {
    kind: "fixed",
    id: "area_rectangle_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_rectangle",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est l’aire d’un rectangle de 4 cm sur 3 cm ?",
    format: "short",
    expected: ["12", "12 cm²", "12 cm2", "12cm²", "12cm2"],
    comparator: "number_equal",
    hint: "Aire du rectangle = longueur × largeur.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("L’aire d’un rectangle se calcule en multipliant la longueur par la largeur : 4 × 3 = 12. L’aire est donc 12 cm².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aires", "rectangle"],
  },
  {
    kind: "fixed",
    id: "area_rectangle_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_rectangle",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est l’aire d’un rectangle de 6 cm sur 4 cm ?",
    format: "qcm",
    choices: ["10 cm²", "20 cm²", "24 cm²", "28 cm²"],
    expected: ["24 cm²"],
    comparator: "mcq_exact",
    hint: "Pour l’aire, on multiplie longueur et largeur.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("On applique la formule de l’aire du rectangle : 6 × 4 = 24. L’aire est donc 24 cm².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aires", "rectangle", "qcm"],
  },
  {
    kind: "fixed",
    id: "area_rectangle_confusion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_rectangle",
    difficulty: 3,
    theme: "neutral",
    text: "Un rectangle mesure 8 cm de longueur et 5 cm de largeur. Quelle est son aire ?",
    format: "qcm",
    choices: ["13 cm²", "26 cm²", "40 cm²", "16 cm²"],
    expected: ["40 cm²"],
    comparator: "mcq_exact",
    hint: "Attention à ne pas confondre aire et périmètre.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("L’aire d’un rectangle est longueur × largeur. Ici, 8 × 5 = 40. L’aire est donc 40 cm².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aires", "rectangle", "confusion", "qcm"],
  },
  {
    kind: "fixed",
    id: "area_rectangle_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_rectangle",
    difficulty: 3,
    theme: "neutral",
    text: "Observe la figure. Quelle est l’aire du rectangle ABCD ?",
    format: "short",
    expected: ["18", "18 cm²", "18 cm2"],
    comparator: "number_equal",
    hint: "Multiplie la longueur par la largeur.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Le rectangle a une longueur de 6 cm et une largeur de 3 cm. Son aire vaut 6 × 3 = 18 cm².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aires", "rectangle", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 60, y: 80 },
        B: { x: 240, y: 80 },
        C: { x: 240, y: 170 },
        D: { x: 60, y: 170 },
      },
      sideLabels: {
        AB: "6 cm",
        BC: "3 cm",
      },
      display: {
        showPoints: true,
        showLabels: true,
        showSides: true,
        showAngles: false,
      },
      marks: {
        rightAnglesAt: ["A", "B", "C", "D"],
        equalSides: [["AB", "CD"], ["BC", "DA"]],
      },
    },
  },

  // =========================
  // AREA_SQUARE
  // =========================
  {
    kind: "fixed",
    id: "area_square_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_square",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est l’aire d’un carré de côté 5 cm ?",
    format: "short",
    expected: ["25", "25 cm²", "25 cm2", "25cm²", "25cm2"],
    comparator: "number_equal",
    hint: "Aire du carré = côté × côté.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Dans un carré, les côtés sont égaux. On calcule donc 5 × 5 = 25. L’aire est 25 cm².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aires", "carre"],
  },
  {
    kind: "fixed",
    id: "area_square_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_square",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est l’aire d’un carré de côté 7 cm ?",
    format: "qcm",
    choices: ["14 cm²", "28 cm²", "49 cm²", "21 cm²"],
    expected: ["49 cm²"],
    comparator: "mcq_exact",
    hint: "Il faut multiplier le côté par lui-même.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("L’aire d’un carré de côté 7 cm vaut 7 × 7 = 49. La bonne réponse est 49 cm².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aires", "carre", "qcm"],
  },
  {
    kind: "fixed",
    id: "area_square_confusion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_square",
    difficulty: 3,
    theme: "neutral",
    text: "Choisis la bonne réponse : l’aire d’un carré de côté 9 cm est...",
    format: "qcm",
    choices: ["18 cm²", "36 cm²", "81 cm²", "27 cm²"],
    expected: ["81 cm²"],
    comparator: "mcq_exact",
    hint: "Un carré de côté 9 a une aire de 9 × 9.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Pour un carré, on calcule côté × côté. Ici 9 × 9 = 81. L’aire est donc 81 cm².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aires", "carre", "confusion", "qcm"],
  },
  {
    kind: "fixed",
    id: "area_square_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_square",
    difficulty: 3,
    theme: "neutral",
    text: "Observe la figure. Quelle est l’aire du carré ABCD ?",
    format: "short",
    expected: ["16", "16 cm²", "16 cm2"],
    comparator: "number_equal",
    hint: "Dans un carré, on fait côté × côté.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Le côté du carré mesure 4 cm. Son aire vaut donc 4 × 4 = 16 cm².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aires", "carre", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 80, y: 70 },
        B: { x: 180, y: 70 },
        C: { x: 180, y: 170 },
        D: { x: 80, y: 170 },
      },
      sideLabels: {
        AB: "4 cm",
      },
      display: {
        showPoints: true,
        showLabels: true,
        showSides: true,
        showAngles: false,
      },
      marks: {
        rightAnglesAt: ["A", "B", "C", "D"],
        equalSides: [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]],
      },
    },
  },

  // =========================
  // AREA_COMPARER
  // =========================
  {
    kind: "fixed",
    id: "area_comparer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle aire est la plus grande : 12 cm² ou 15 cm² ?",
    format: "short",
    expected: ["15", "15 cm²", "15 cm2"],
    comparator: "contains_keyword",
    hint: "Compare les nombres 12 et 15.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Les deux aires sont dans la même unité. On compare donc 12 et 15. Comme 15 est plus grand, 15 cm² est la plus grande aire.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aires", "comparer"],
  },
  {
    kind: "fixed",
    id: "area_comparer_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle aire est la plus petite : 20 cm² ou 9 cm² ?",
    format: "short",
    expected: ["9", "9 cm²", "9 cm2"],
    comparator: "contains_keyword",
    hint: "Compare les nombres.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Comme les unités sont identiques, il suffit de comparer 20 et 9. La plus petite aire est 9 cm².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aires", "comparer"],
  },
  {
    kind: "fixed",
    id: "area_comparer_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Quel rectangle a la plus grande aire ?",
    format: "qcm",
    choices: ["8 cm²", "14 cm²", "11 cm²", "13 cm²"],
    expected: ["14 cm²"],
    comparator: "mcq_exact",
    hint: "Choisis la plus grande valeur.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("La plus grande des quatre aires proposées est 14 cm². C’est donc la bonne réponse.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aires", "comparer", "qcm"],
  },
  {
    kind: "fixed",
    id: "area_comparer_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_comparer",
    difficulty: 3,
    theme: "reunion",
    text: "À La Réunion, quel potager est le plus grand : 18 m² ou 21 m² ?",
    format: "short",
    expected: ["21", "21 m²", "21 m2"],
    comparator: "contains_keyword",
    hint: "Le plus grand nombre donne la plus grande aire.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("18 m² et 21 m² sont deux aires. Comme 21 est plus grand que 18, le potager de 21 m² est le plus grand.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aires", "comparer", "reunion"],
  },
  {
    kind: "fixed",
    id: "area_comparer_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_comparer",
    difficulty: 4,
    theme: "neutral",
    text: "Quel carré a la plus grande aire ?",
    format: "qcm",
    choices: ["côté 3 cm", "côté 4 cm", "côté 5 cm", "côté 6 cm"],
    expected: ["côté 6 cm"],
    comparator: "mcq_exact",
    hint: "L’aire du carré vaut côté × côté.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Les aires valent 9 cm², 16 cm², 25 cm² et 36 cm². La plus grande aire est celle du carré de côté 6 cm.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aires", "comparer", "qcm", "carre"],
  },

  // =========================
  // AREA_DECOMPOSER
  // =========================
  {
    kind: "fixed",
    id: "area_decomposer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_decomposer",
    difficulty: 3,
    theme: "neutral",
    text: "Une figure est formée de deux rectangles de 8 cm² et 5 cm². Quelle est son aire totale ?",
    format: "short",
    expected: ["13", "13 cm²", "13 cm2"],
    comparator: "number_equal",
    hint: "On additionne les aires des deux rectangles.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Quand une figure est décomposée en deux rectangles sans chevauchement, on additionne les aires : 8 + 5 = 13 cm².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aires", "decomposer"],
  },
  {
    kind: "fixed",
    id: "area_decomposer_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_decomposer",
    difficulty: 3,
    theme: "neutral",
    text: "Une figure est composée d’un rectangle de 12 cm² et d’un carré de 9 cm². Quelle est son aire ?",
    format: "short",
    expected: ["21", "21 cm²", "21 cm2"],
    comparator: "number_equal",
    hint: "Additionne les aires des deux parties.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("On décompose la figure en deux parties simples : 12 cm² et 9 cm². Leur somme vaut 21 cm².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aires", "decomposer"],
  },
  {
    kind: "fixed",
    id: "area_decomposer_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_decomposer",
    difficulty: 4,
    theme: "neutral",
    text: "Une figure en L est décomposée en deux rectangles d’aires 10 cm² et 6 cm². Quelle est l’aire totale ?",
    format: "qcm",
    choices: ["14 cm²", "16 cm²", "20 cm²", "60 cm²"],
    expected: ["16 cm²"],
    comparator: "mcq_exact",
    hint: "On additionne les aires des deux rectangles.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("La figure en L est découpée en deux rectangles. L’aire totale vaut 10 + 6 = 16 cm².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aires", "decomposer", "qcm"],
  },
  {
    kind: "fixed",
    id: "area_decomposer_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_decomposer",
    difficulty: 4,
    theme: "neutral",
    text: "Pour calculer l’aire d’une figure composée, que peut-on faire ?",
    format: "qcm",
    choices: [
      "multiplier toutes les longueurs",
      "la découper en figures simples",
      "additionner tous les périmètres",
      "chercher seulement le contour",
    ],
    expected: ["la découper en figures simples"],
    comparator: "mcq_exact",
    hint: "On cherche une méthode pour transformer une figure complexe en figures connues.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Pour calculer l’aire d’une figure composée, on peut la décomposer en rectangles ou carrés plus simples, puis additionner leurs aires.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aires", "decomposer", "qcm", "methode"],
  },
  {
    kind: "fixed",
    id: "area_decomposer_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_decomposer",
    difficulty: 4,
    theme: "neutral",
    text: "La figure sur quadrillage est décomposée en deux rectangles d’aires 4 et 2. Quelle est son aire totale ?",
    format: "short",
    expected: ["6", "6 unités", "6 u.a."],
    comparator: "contains_keyword",
    hint: "Additionne les aires des deux parties.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("La figure peut être vue comme un rectangle de 4 unités d’aire et un autre de 2 unités d’aire. L’aire totale vaut 6.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aires", "decomposer", "canvas"],
    canvas: {
      kind: "figure_libre",
      grid: {
        rows: 5,
        cols: 5,
        filledCells: [
          [1, 1],
          [1, 2],
          [1, 3],
          [2, 1],
          [2, 2],
          [3, 1],
        ],
      },
      display: {
        showGrid: true,
        showFilled: true,
      },
    },
  },

  // =========================
  // AREA_PROBLEMES
  // =========================
  {
    kind: "fixed",
    id: "area_problemes_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_problemes",
    difficulty: 4,
    theme: "neutral",
    text: "Un jardin rectangulaire mesure 7 m de long et 3 m de large. Quelle est son aire ?",
    format: "short",
    expected: ["21", "21 m²", "21 m2"],
    comparator: "number_equal",
    hint: "Aire du rectangle = longueur × largeur.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Le jardin est un rectangle. Son aire vaut 7 × 3 = 21 m².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aires", "problemes"],
  },
  {
    kind: "fixed",
    id: "area_problemes_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_problemes",
    difficulty: 4,
    theme: "reunion",
    text: "À La Réunion, une parcelle rectangulaire mesure 8 m sur 5 m. Quelle est son aire ?",
    format: "short",
    expected: ["40", "40 m²", "40 m2"],
    comparator: "number_equal",
    hint: "Multiplie la longueur par la largeur.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Comme la parcelle est rectangulaire, on calcule son aire en faisant 8 × 5 = 40 m².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aires", "problemes", "reunion"],
  },
  {
    kind: "fixed",
    id: "area_problemes_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_problemes",
    difficulty: 5,
    theme: "neutral",
    text: "Une pièce rectangulaire mesure 4,5 m sur 2 m. Quelle est son aire ?",
    format: "qcm",
    choices: ["6,5 m²", "9 m²", "13 m²", "4,5 m²"],
    expected: ["9 m²"],
    comparator: "mcq_exact",
    hint: "On multiplie 4,5 par 2.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("L’aire d’un rectangle se calcule par longueur × largeur. Ici, 4,5 × 2 = 9. L’aire est donc 9 m².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aires", "problemes", "qcm", "decimaux"],
  },
  {
    kind: "fixed",
    id: "area_problemes_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_problemes",
    difficulty: 5,
    theme: "neutral",
    text: "Un rectangle a une largeur de 3 m. Si sa longueur double, que devient son aire ?",
    format: "qcm",
    choices: ["elle diminue", "elle reste la même", "elle double", "elle triple"],
    expected: ["elle double"],
    comparator: "mcq_exact",
    hint: "L’aire = longueur × largeur.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Si la largeur reste la même et que la longueur est multipliée par 2, alors l’aire est aussi multipliée par 2. Elle double.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aires", "problemes", "qcm", "proportionnalite"],
  },
  {
    kind: "fixed",
    id: "area_problemes_qcm_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_problemes",
    difficulty: 5,
    theme: "neutral",
    text: "Une terrasse rectangulaire mesure 2,5 m sur 4 m. Quelle est son aire ?",
    format: "qcm",
    choices: ["6,5 m²", "10 m²", "12 m²", "20 m²"],
    expected: ["10 m²"],
    comparator: "mcq_exact",
    hint: "Multiplie 2,5 par 4.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("L’aire de la terrasse vaut 2,5 × 4 = 10 m².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aires", "problemes", "qcm", "decimaux"],
  },

  // =========================
  // AREA_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "area_defis_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_defis",
    difficulty: 4,
    theme: "neutral",
    text: "Pourquoi une aire ne peut-elle pas s’exprimer en cm³ ?",
    format: "short",
    expected: ["aire", "cm²", "volume", "cm³"],
    comparator: "contains_keyword",
    hint: "Une aire mesure une surface, pas un volume.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Une aire mesure une surface en 2 dimensions, donc elle s’exprime en cm². Le cm³ sert à mesurer un volume en 3 dimensions.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aires", "defi", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "area_defis_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_defis",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi un carré de côté 6 cm a une aire plus grande qu’un carré de côté 5 cm.",
    format: "short",
    expected: ["6", "5", "36", "25"],
    comparator: "contains_keyword",
    hint: "Compare 6 × 6 et 5 × 5.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Un carré de côté 6 cm a une aire de 6 × 6 = 36 cm². Un carré de côté 5 cm a une aire de 5 × 5 = 25 cm². Comme 36 est plus grand que 25, son aire est plus grande.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aires", "defi", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "area_defis_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_defis",
    difficulty: 4,
    theme: "neutral",
    text: "Deux rectangles peuvent-ils avoir la même aire mais des périmètres différents ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Compare par exemple 3 × 4 et 2 × 6.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Oui. Deux rectangles peuvent avoir la même aire mais des périmètres différents. Par exemple, 3 × 4 et 2 × 6 ont tous deux une aire de 12 cm², mais pas le même périmètre.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aires", "defi", "qcm", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "area_defis_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_defis",
    difficulty: 4,
    theme: "neutral",
    text: "Si on double la longueur d’un rectangle sans changer sa largeur, que devient son aire ?",
    format: "qcm",
    choices: ["elle reste la même", "elle double", "elle triple", "elle diminue"],
    expected: ["elle double"],
    comparator: "mcq_exact",
    hint: "L’aire vaut longueur × largeur.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Si la largeur reste la même et que la longueur est multipliée par 2, alors l’aire est aussi multipliée par 2. Elle double.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aires", "defi", "qcm", "proportionnalite"],
  },
  {
    kind: "fixed",
    id: "area_defis_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_defis",
    difficulty: 5,
    theme: "neutral",
    text: "Donne un exemple d’aire comprise entre 10 cm² et 15 cm².",
    format: "short",
    expected: ["11", "12", "13", "14"],
    comparator: "exact_text",
    hint: "Choisis un nombre strictement entre 10 et 15.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Une aire strictement comprise entre 10 cm² et 15 cm² peut être 11 cm², 12 cm², 13 cm² ou 14 cm².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aires", "defi", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "area_defis_fixed_6",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_defis",
    difficulty: 5,
    theme: "neutral",
    text: "Un carré a une aire de 36 cm². Combien mesure un côté ?",
    format: "short",
    expected: ["6", "6 cm", "6cm"],
    comparator: "number_equal",
    hint: "Cherche le nombre qui multiplié par lui-même donne 36.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Comme 6 × 6 = 36, un carré d’aire 36 cm² a un côté de 6 cm.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aires", "defi", "inverse"],
  },
  {
    kind: "fixed",
    id: "area_defis_fixed_7",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_defis",
    difficulty: 5,
    theme: "neutral",
    text: "Un rectangle a une aire de 24 cm² et une largeur de 4 cm. Quelle est sa longueur ?",
    format: "short",
    expected: ["6", "6 cm", "6cm"],
    comparator: "number_equal",
    hint: "Aire = longueur × largeur.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Si l’aire vaut 24 cm² et la largeur 4 cm, alors la longueur vaut 24 ÷ 4 = 6 cm.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aires", "defi", "inverse"],
  },
  {
    kind: "fixed",
    id: "area_defis_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_defis",
    difficulty: 5,
    theme: "neutral",
    text: "Observe la figure sur quadrillage. Cette figure a-t-elle la même aire qu’un rectangle de 3 unités sur 2 unités ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Le rectangle de 3 sur 2 a une aire de 6.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Le rectangle de 3 unités sur 2 unités a une aire de 6. La figure sur quadrillage recouvre aussi 6 carreaux unités. Les deux aires sont donc égales.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aires", "defi", "canvas", "qcm", "comparaison"],
    canvas: {
      kind: "figure_libre",
      grid: {
        rows: 5,
        cols: 5,
        filledCells: [
          [1, 1],
          [1, 2],
          [1, 3],
          [2, 1],
          [2, 2],
          [3, 1],
        ],
      },
      display: {
        showGrid: true,
        showFilled: true,
      },
    },
  },
  {
    kind: "fixed",
    id: "area_defis_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_defis",
    difficulty: 5,
    theme: "reunion",
    text: "À La Réunion, deux parcelles de 12 m² et 9 m² sont réunies. Quelle aire totale obtient-on ?",
    format: "short",
    expected: ["21", "21 m²", "21 m2"],
    comparator: "number_equal",
    hint: "Additionne les deux aires.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
      "Calcul : " +
      ("Quand on réunit deux parcelles sans chevauchement, on additionne leurs aires : 12 + 9 = 21 m².") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aires", "defi", "reunion"],
  },

  // =========================
  // TEMPLATES - AREA_COMPRENDRE
  // =========================
  {
    kind: "template",
    id: "area_comprendre_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_comprendre",
    difficulty: 1,
    theme: "neutral",
    hint: "Une aire se mesure en unités carrées.",
    tags: ["aires", "comprendre", "template"],
    generate: () => {
      return {
        text: "Quelle unité est adaptée pour mesurer une aire ?",
        format: "qcm",
        choices: shuffle(["cm²", "cm", "cm³", "kg"]),
        expected: ["cm²"],
        comparator: "mcq_exact",
        explanation:
          "Définition : une aire mesure la surface occupée par une figure.\n\n" +
          "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
          "Calcul : " +
          ("Une aire mesure une surface. Elle se mesure donc en unités carrées, par exemple en cm².") +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },

  // =========================
  // TEMPLATES - AREA_COMPTER
  // =========================
  {
    kind: "template",
    id: "area_compter_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_compter",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte les carreaux unités.",
    tags: ["aires", "compter", "template"],
    generate: () => {
      const n = randomInt(4, 16);
      return {
        text: `Une figure recouvre ${n} carreaux unités. Quelle est son aire ?`,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation: "Définition : une aire mesure la surface occupée par une figure.\n\n" +
          "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
          "Calcul : " +
          (`L’aire d’une figure mesurée par comptage est égale au nombre de carreaux unités. Ici, cela fait ${n}.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "area_compter_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_compter",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplie les rangées par les carreaux de chaque rangée.",
    tags: ["aires", "compter", "qcm", "template"],
    generate: () => {
      const a = randomInt(2, 4);
      const b = randomInt(3, 6);
      const good = a * b;

      return {
        text: `Une surface couvre ${a} rangées de ${b} carreaux unités. Quelle est son aire ?`,
        format: "qcm",
        choices: shuffle([
          String(good),
          String(good - 1),
          String(good + 1),
          String(a + b),
        ]),
        expected: [String(good)],
        comparator: "mcq_exact",
        explanation: "Définition : une aire mesure la surface occupée par une figure.\n\n" +
          "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
          "Calcul : " +
          (`Il y a ${a} rangées de ${b} carreaux, donc ${a} × ${b} = ${good}. L’aire est ${good}.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },

  // =========================
  // TEMPLATES - AREA_RECTANGLE
  // =========================
  {
    kind: "template",
    id: "area_rectangle_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_rectangle",
    difficulty: 2,
    theme: "neutral",
    hint: "Aire = longueur × largeur.",
    tags: ["aires", "rectangle", "template"],
    generate: () => {
      const l = [3, 4, 5, 6, 7, 8][Math.floor(Math.random() * 6)];
      const w = [2, 3, 4, 5, 6][Math.floor(Math.random() * 5)];
      const a = l * w;

      return {
        text: `Quelle est l’aire d’un rectangle de ${l} cm sur ${w} cm ?`,
        format: "short",
        expected: [String(a), `${a} cm²`, `${a} cm2`, `${a}cm²`, `${a}cm2`],
        comparator: "number_equal",
        explanation: "Définition : une aire mesure la surface occupée par une figure.\n\n" +
          "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
          "Calcul : " +
          (`L’aire d’un rectangle se calcule en faisant ${l} × ${w} = ${a}. L’aire vaut donc ${a} cm².`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "area_rectangle_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_rectangle",
    difficulty: 3,
    theme: "neutral",
    hint: "Ne confonds pas aire et périmètre.",
    tags: ["aires", "rectangle", "qcm", "template"],
    generate: () => {
      const l = [4, 5, 6, 7, 8][Math.floor(Math.random() * 5)];
      const w = [2, 3, 4, 5][Math.floor(Math.random() * 4)];
      const good = l * w;
      const distractors = Array.from(
        new Set([l + w, 2 * (l + w), l * 2, w * 2, good + l])
      )
        .filter((n) => n !== good)
        .slice(0, 3);

      const choices = shuffle([
        `${good} cm²`,
        ...distractors.map((n) => `${n} cm²`),
      ]);

      return {
        text: `Un rectangle mesure ${l} cm de longueur et ${w} cm de largeur. Quelle est son aire ?`,
        format: "qcm",
        choices,
        expected: [`${good} cm²`],
        comparator: "mcq_exact",
        explanation: "Définition : une aire mesure la surface occupée par une figure.\n\n" +
          "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
          "Calcul : " +
          (`Pour l’aire du rectangle, on calcule ${l} × ${w} = ${good}. La bonne réponse est donc ${good} cm².`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },

  // =========================
  // TEMPLATES - AREA_SQUARE
  // =========================
  {
    kind: "template",
    id: "area_square_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_square",
    difficulty: 2,
    theme: "neutral",
    hint: "Aire du carré = côté × côté.",
    tags: ["aires", "carre", "template"],
    generate: () => {
      const c = [2, 3, 4, 5, 6, 7, 8, 9][Math.floor(Math.random() * 8)];
      const a = c * c;

      return {
        text: `Quelle est l’aire d’un carré de côté ${c} cm ?`,
        format: "short",
        expected: [String(a), `${a} cm²`, `${a} cm2`, `${a}cm²`, `${a}cm2`],
        comparator: "number_equal",
        explanation: "Définition : une aire mesure la surface occupée par une figure.\n\n" +
          "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
          "Calcul : " +
          (`L’aire d’un carré se calcule en faisant ${c} × ${c} = ${a}. L’aire vaut donc ${a} cm².`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "area_square_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_square",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour un carré, on fait côté × côté.",
    tags: ["aires", "carre", "qcm", "template"],
    generate: () => {
      const c = [3, 4, 5, 6, 7, 8][Math.floor(Math.random() * 6)];
      const good = c * c;
      const distractors = Array.from(new Set([c + c, 4 * c, good - c, good + c]))
        .filter((n) => n !== good && n > 0)
        .slice(0, 3);

      const choices = shuffle([
        `${good} cm²`,
        ...distractors.map((n) => `${n} cm²`),
      ]);

      return {
        text: `Quelle est l’aire d’un carré de côté ${c} cm ?`,
        format: "qcm",
        choices,
        expected: [`${good} cm²`],
        comparator: "mcq_exact",
        explanation: "Définition : une aire mesure la surface occupée par une figure.\n\n" +
          "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
          "Calcul : " +
          (`Pour un carré de côté ${c} cm, on calcule ${c} × ${c} = ${good}. L’aire est donc ${good} cm².`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },

  // =========================
  // TEMPLATES - AREA_COMPARER
  // =========================
  {
    kind: "template",
    id: "area_comparer_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Compare les deux nombres.",
    tags: ["aires", "comparer", "template"],
    generate: () => {
      const a = randomInt(8, 20);
      let b = randomInt(8, 20);
      while (b === a) b = randomInt(8, 20);
      const good = Math.max(a, b);

      return {
        text: `Quelle aire est la plus grande : ${a} cm² ou ${b} cm² ?`,
        format: "short",
        expected: [String(good), `${good} cm²`, `${good} cm2`],
        comparator: "contains_keyword",
        explanation: "Définition : une aire mesure la surface occupée par une figure.\n\n" +
          "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
          "Calcul : " +
          (`Comme les deux aires sont dans la même unité, on compare ${a} et ${b}. La plus grande est ${good} cm².`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },

  // =========================
  // TEMPLATES - AREA_DECOMPOSER
  // =========================
  {
    kind: "template",
    id: "area_decomposer_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_decomposer",
    difficulty: 4,
    theme: "neutral",
    hint: "Découpe la figure en deux rectangles plus simples.",
    tags: ["aires", "decomposer", "template"],
    generate: () => {
      const a = randomInt(4, 12);
      const b = randomInt(3, 10);
      const total = a + b;

      return {
        text: `Une figure est décomposée en deux rectangles d’aires ${a} cm² et ${b} cm². Quelle est son aire totale ?`,
        format: "short",
        expected: [String(total), `${total} cm²`, `${total} cm2`],
        comparator: "number_equal",
        explanation: "Définition : une aire mesure la surface occupée par une figure.\n\n" +
          "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
          "Calcul : " +
          (`On additionne les aires des deux rectangles : ${a} + ${b} = ${total} cm².`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "area_decomposer_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_decomposer",
    difficulty: 4,
    theme: "neutral",
    hint: "On additionne les aires des parties.",
    tags: ["aires", "decomposer", "qcm", "template"],
    generate: () => {
      const a = randomInt(5, 12);
      const b = randomInt(4, 10);
      const good = a + b;

      return {
        text: `Une figure composée est découpée en deux parties d’aires ${a} cm² et ${b} cm². Quelle est l’aire totale ?`,
        format: "qcm",
        choices: shuffle([
          `${good} cm²`,
          `${a} cm²`,
          `${b} cm²`,
          `${a * b} cm²`,
        ]),
        expected: [`${good} cm²`],
        comparator: "mcq_exact",
        explanation: "Définition : une aire mesure la surface occupée par une figure.\n\n" +
          "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
          "Calcul : " +
          (`On additionne les aires des deux parties : ${a} + ${b} = ${good} cm².`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },

  // =========================
  // TEMPLATES - AREA_PROBLEMES
  // =========================
  {
    kind: "template",
    id: "area_problemes_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_problemes",
    difficulty: 4,
    theme: "neutral",
    hint: "Pour un rectangle, on multiplie longueur et largeur.",
    tags: ["aires", "problemes", "template"],
    generate: () => {
      const l = randomInt(3, 9);
      const w = randomInt(2, 6);
      const a = l * w;

      return {
        text: `Un jardin rectangulaire mesure ${l} m de long et ${w} m de large. Quelle est son aire ?`,
        format: "short",
        expected: [String(a), `${a} m²`, `${a} m2`],
        comparator: "number_equal",
        explanation: "Définition : une aire mesure la surface occupée par une figure.\n\n" +
          "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
          "Calcul : " +
          (`Le jardin est un rectangle. Son aire vaut ${l} × ${w} = ${a} m².`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "area_problemes_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_problemes",
    difficulty: 5,
    theme: "neutral",
    hint: "L’aire = longueur × largeur.",
    tags: ["aires", "problemes", "qcm", "template"],
    generate: () => {
      const lengths = [2, 2.5, 3.5, 4.5, 5.5];
      const widths = [2, 3, 4];
      const l = lengths[Math.floor(Math.random() * lengths.length)];
      const w = widths[Math.floor(Math.random() * widths.length)];
      const good = Number((l * w).toFixed(1));

      const distractors = Array.from(
        new Set([
          Number((l + w).toFixed(1)),
          Number((l * 2).toFixed(1)),
          Number((w * 2).toFixed(1)),
        ])
      ).filter((n) => n !== good);

      const choices = shuffle([
        `${String(good).replace(".", ",")} m²`,
        ...distractors.slice(0, 3).map((n) => `${String(n).replace(".", ",")} m²`),
      ]);

      return {
        text: `Une pièce rectangulaire mesure ${String(l).replace(".", ",")} m sur ${w} m. Quelle est son aire ?`,
        format: "qcm",
        choices,
        expected: [`${String(good).replace(".", ",")} m²`],
        comparator: "mcq_exact",
        explanation: "Définition : une aire mesure la surface occupée par une figure.\n\n" +
          "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
          "Calcul : " +
          (`L’aire du rectangle vaut ${String(l).replace(".", ",")} × ${w} = ${String(
          good
        ).replace(".", ",")} m².`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },

  // =========================
  // TEMPLATES - AREA_DEFIS
  // =========================
  {
    kind: "template",
    id: "area_defis_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_defis",
    difficulty: 5,
    theme: "neutral",
    hint: "Choisis un nombre strictement entre les deux bornes.",
    tags: ["aires", "defi", "template"],
    generate: () => {
      const low = randomInt(8, 12);
      const high = low + randomInt(3, 6);
      const validAnswers: string[] = [];

      for (let n = low + 1; n < high; n++) {
        validAnswers.push(String(n));
      }

      return {
        text: `Donne une aire en cm² plus grande que ${low} cm² et plus petite que ${high} cm².`,
        format: "short",
        expected: validAnswers,
        comparator: "exact_text",
        explanation: "Définition : une aire mesure la surface occupée par une figure.\n\n" +
          "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
          "Calcul : " +
          (`Il faut choisir une valeur strictement comprise entre ${low} et ${high}. Par exemple : ${validAnswers.join(
          ", "
        )}.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "area_defis_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aires",
    microId: "aire_defis",
    difficulty: 5,
    theme: "neutral",
    hint: "Cherche le nombre qui multiplié par lui-même donne l’aire.",
    tags: ["aires", "defi", "template", "inverse"],
    generate: () => {
      const side = randomInt(3, 9);
      const area = side * side;

      return {
        text: `Un carré a une aire de ${area} cm². Combien mesure un côté ?`,
        format: "short",
        expected: [String(side), `${side} cm`, `${side}cm`],
        comparator: "number_equal",
        explanation: "Définition : une aire mesure la surface occupée par une figure.\n\n" +
          "Méthode : on repère la figure, les mesures utiles ou les carreaux, puis on applique la formule adaptée.\n\n" +
          "Calcul : " +
          (`Comme ${side} × ${side} = ${area}, le côté du carré mesure ${side} cm.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
];