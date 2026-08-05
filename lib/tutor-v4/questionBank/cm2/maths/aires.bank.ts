// lib/tutor-v4/question-banks/maths/cm2/aires.bank.ts

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// Les propositions d'un gabarit sont écrites à la main, et deux d'entre elles
// finissent par coïncider dès qu'un paramètre tombe sur une valeur particulière
// (a = b, un coefficient nul, une fraction qui se simplifie…). L'élève voyait
// alors deux fois la même ligne. On met la bonne réponse de côté, on tire trois
// pièges réellement distincts, puis on mélange l'ensemble.
function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}


function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const airesBank: TutorBankItemV4[] = [
  // =========================
  // AIRE_COMPRENDRE
  // =========================

  {
    kind: "fixed",
    id: "cm2_aire_comprendre_fixed_1_definition",
    niveau: "cm2",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "L’aire d’une figure mesure…",
    format: "qcm",
    choices: ["son contour", "sa surface", "son volume", "sa masse"],
    expected: ["sa surface"],
    comparator: "mcq_exact",
    hint: "L’aire mesure la place occupée à l’intérieur.",
    explanation:
      "Définition : une aire mesure la surface occupée par une figure.\n\n" +
      "Méthode : on distingue l’intérieur de la figure et son contour.\n\n" +
      "Calcul : " +
      "Le contour correspond au périmètre. L’intérieur correspond à l’aire.\n\n" +
      "Conclusion : l’aire mesure la surface.",
    tags: ["cm2", "aire", "comprendre", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_aire_comprendre_fixed_2_unite",
    niveau: "cm2",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle unité convient pour mesurer une aire ?",
    format: "qcm",
    choices: ["cm", "cm²", "cm³", "kg"],
    expected: ["cm²"],
    comparator: "mcq_exact",
    hint: "Une aire se mesure avec une unité carrée.",
    explanation:
      "Définition : une aire mesure une surface.\n\n" +
      "Méthode : on cherche une unité carrée.\n\n" +
      "Calcul : " +
      "cm est une unité de longueur, cm² est une unité d’aire, cm³ est une unité de volume.\n\n" +
      "Conclusion : l’unité adaptée est cm².",
    tags: ["cm2", "aire", "comprendre", "unite", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_aire_comprendre_fixed_3_ecriture",
    niveau: "cm2",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle écriture peut correspondre à une aire ?",
    format: "qcm",
    choices: ["15 cm", "15 cm²", "15 cm³", "15 kg"],
    expected: ["15 cm²"],
    comparator: "mcq_exact",
    hint: "Une aire s’exprime en unités carrées.",
    explanation:
      "Définition : une aire mesure une surface.\n\n" +
      "Méthode : on repère l’unité carrée.\n\n" +
      "Calcul : " +
      "15 cm est une longueur, 15 cm³ un volume, 15 kg une masse. 15 cm² est une aire.\n\n" +
      "Conclusion : l’écriture correcte est 15 cm².",
    tags: ["cm2", "aire", "comprendre", "unite", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_aire_comprendre_fixed_4_confusion_perimetre",
    niveau: "cm2",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "Un élève dit : “L’aire, c’est le tour de la figure.” A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le tour d’une figure s’appelle le périmètre.",
    explanation:
      "Définition : l’aire mesure la surface intérieure d’une figure.\n\n" +
      "Méthode : on compare aire et périmètre.\n\n" +
      "Calcul : " +
      "Le tour de la figure correspond au périmètre. L’aire correspond à l’intérieur de la figure.\n\n" +
      "Conclusion : l’élève a tort.",
    tags: ["cm2", "aire", "comprendre", "confusion", "perimetre", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_aire_comprendre_reunion_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_comprendre",
    difficulty: 2,
    theme: "reunion",
    text: "À La Réunion, pour mesurer la surface d’un petit potager, on parle plutôt de…",
    format: "qcm",
    choices: ["aire", "périmètre", "masse", "durée"],
    expected: ["aire"],
    comparator: "mcq_exact",
    hint: "Une surface correspond à une aire.",
    explanation:
      "Définition : une aire mesure une surface.\n\n" +
      "Méthode : on identifie la grandeur demandée dans la situation.\n\n" +
      "Calcul : " +
      "La surface d’un potager correspond à la place occupée au sol.\n\n" +
      "Conclusion : on parle donc d’aire.",
    tags: ["cm2", "aire", "comprendre", "reunion", "qcm"],
  },

  {
    kind: "template",
    id: "cm2_aire_comprendre_tpl_1_unite",
    niveau: "cm2",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_comprendre",
    difficulty: 1,
    theme: "neutral",
    hint: "Une aire se mesure en unités carrées.",
    tags: ["cm2", "aire", "comprendre", "template", "qcm"],
    generate: () => {
      const units = ["cm²", "m²", "dm²"];
      const correct = units[Math.floor(Math.random() * units.length)];

      return {
        text: "Quelle unité est adaptée pour mesurer une aire ?",
        format: "qcm",
        choices: shuffle([correct, "cm", "m", "L"]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : une aire mesure une surface.\n\n" +
          "Méthode : on cherche une unité carrée.\n\n" +
          "Calcul : " +
          `${correct} est une unité carrée.\n\n` +
          `Conclusion : ${correct} peut servir à mesurer une aire.`,
      };
    },
  },

  // =========================
  // AIRE_CARRE_RECTANGLE
  // =========================

  {
    kind: "fixed",
    id: "cm2_aire_carre_rectangle_fixed_1_rectangle",
    niveau: "cm2",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_carre_rectangle",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est l’aire d’un rectangle de 4 cm sur 3 cm ?",
    format: "short",
    expected: ["12", "12 cm²", "12 cm2", "12cm²", "12cm2"],
    comparator: "number_equal",
    hint: "Aire du rectangle = longueur × largeur.",
    explanation:
      "Définition : l’aire d’un rectangle mesure sa surface.\n\n" +
      "Méthode : on multiplie la longueur par la largeur.\n\n" +
      "Calcul : " +
      "4 × 3 = 12.\n\n" +
      "Conclusion : l’aire du rectangle est 12 cm².",
    tags: ["cm2", "aire", "rectangle", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 60, y: 80 },
        B: { x: 240, y: 80 },
        C: { x: 240, y: 170 },
        D: { x: 60, y: 170 },
      },
      sideLabels: {
        AB: "4 cm",
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
        equalSides: [
          ["AB", "CD"],
          ["BC", "DA"],
        ],
      },
    },
  },

  {
    kind: "fixed",
    id: "cm2_aire_carre_rectangle_fixed_2_carre",
    niveau: "cm2",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_carre_rectangle",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est l’aire d’un carré de côté 5 cm ?",
    format: "short",
    expected: ["25", "25 cm²", "25 cm2", "25cm²", "25cm2"],
    comparator: "number_equal",
    hint: "Aire du carré = côté × côté.",
    explanation:
      "Définition : l’aire d’un carré mesure sa surface.\n\n" +
      "Méthode : on multiplie le côté par lui-même.\n\n" +
      "Calcul : " +
      "5 × 5 = 25.\n\n" +
      "Conclusion : l’aire du carré est 25 cm².",
    tags: ["cm2", "aire", "carre", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 80, y: 70 },
        B: { x: 190, y: 70 },
        C: { x: 190, y: 180 },
        D: { x: 80, y: 180 },
      },
      sideLabels: {
        AB: "5 cm",
      },
      display: {
        showPoints: true,
        showLabels: true,
        showSides: true,
        showAngles: false,
      },
      marks: {
        rightAnglesAt: ["A", "B", "C", "D"],
        equalSides: [
          ["AB", "BC"],
          ["BC", "CD"],
          ["CD", "DA"],
        ],
      },
    },
  },

  {
    kind: "fixed",
    id: "cm2_aire_carre_rectangle_fixed_3_qcm_rectangle",
    niveau: "cm2",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_carre_rectangle",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est l’aire d’un rectangle de 6 cm sur 4 cm ?",
    format: "qcm",
    choices: ["10 cm²", "20 cm²", "24 cm²", "28 cm²"],
    expected: ["24 cm²"],
    comparator: "mcq_exact",
    hint: "Pour l’aire, on multiplie 6 par 4.",
    explanation:
      "Définition : l’aire d’un rectangle mesure sa surface.\n\n" +
      "Méthode : on multiplie longueur par largeur.\n\n" +
      "Calcul : " +
      "6 × 4 = 24.\n\n" +
      "Conclusion : l’aire est 24 cm².",
    tags: ["cm2", "aire", "rectangle", "qcm", "canvas"],
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
        BC: "4 cm",
      },
      display: {
        showPoints: true,
        showLabels: true,
        showSides: true,
        showAngles: false,
      },
      marks: {
        rightAnglesAt: ["A", "B", "C", "D"],
        equalSides: [
          ["AB", "CD"],
          ["BC", "DA"],
        ],
      },
    },
  },

  {
    kind: "fixed",
    id: "cm2_aire_carre_rectangle_fixed_4_piege_perimetre",
    niveau: "cm2",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_carre_rectangle",
    difficulty: 3,
    theme: "neutral",
    text: "Un rectangle mesure 8 cm sur 3 cm. Quelle est son aire ?",
    format: "qcm",
    choices: ["11 cm²", "22 cm²", "24 cm²", "48 cm²"],
    expected: ["24 cm²"],
    comparator: "mcq_exact",
    hint: "Attention : 22 cm correspondrait au périmètre.",
    explanation:
      "Définition : l’aire mesure la surface intérieure d’une figure.\n\n" +
      "Méthode : pour un rectangle, on calcule longueur × largeur.\n\n" +
      "Calcul : " +
      "8 × 3 = 24. Le calcul 2 × (8 + 3) = 22 correspondrait au périmètre.\n\n" +
      "Conclusion : l’aire est 24 cm².",
    tags: ["cm2", "aire", "rectangle", "confusion", "perimetre", "qcm"],
  },

  {
    kind: "template",
    id: "cm2_aire_carre_rectangle_tpl_1_rectangle",
    niveau: "cm2",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_carre_rectangle",
    difficulty: 2,
    theme: "neutral",
    hint: "Aire du rectangle = longueur × largeur.",
    tags: ["cm2", "aire", "rectangle", "template", "canvas"],
    generate: () => {
      const longueur = randomInt(3, 10);
      const largeur = randomInt(2, 7);
      const aire = longueur * largeur;

      return {
        text: `Calcule l’aire d’un rectangle de longueur ${longueur} cm et de largeur ${largeur} cm.`,
        format: "short",
        expected: [String(aire), `${aire} cm²`, `${aire} cm2`, `${aire}cm²`, `${aire}cm2`],
        comparator: "number_equal",
        explanation:
          "Définition : l’aire d’un rectangle mesure sa surface.\n\n" +
          "Méthode : on multiplie longueur par largeur.\n\n" +
          "Calcul : " +
          `${longueur} × ${largeur} = ${aire}.\n\n` +
          `Conclusion : l’aire est ${aire} cm².`,
        canvas: {
          kind: "quadrilatere",
          points: {
            A: { x: 60, y: 80 },
            B: { x: 240, y: 80 },
            C: { x: 240, y: 170 },
            D: { x: 60, y: 170 },
          },
          sideLabels: {
            AB: `${longueur} cm`,
            BC: `${largeur} cm`,
          },
          display: {
            showPoints: true,
            showLabels: true,
            showSides: true,
            showAngles: false,
          },
          marks: {
            rightAnglesAt: ["A", "B", "C", "D"],
            equalSides: [
              ["AB", "CD"],
              ["BC", "DA"],
            ],
          },
        },
      };
    },
  },

  {
    kind: "template",
    id: "cm2_aire_carre_rectangle_tpl_2_carre",
    niveau: "cm2",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_carre_rectangle",
    difficulty: 2,
    theme: "neutral",
    hint: "Aire du carré = côté × côté.",
    tags: ["cm2", "aire", "carre", "template", "canvas"],
    generate: () => {
      const cote = randomInt(2, 10);
      const aire = cote * cote;

      return {
        text: `Calcule l’aire d’un carré de côté ${cote} cm.`,
        format: "short",
        expected: [String(aire), `${aire} cm²`, `${aire} cm2`, `${aire}cm²`, `${aire}cm2`],
        comparator: "number_equal",
        explanation:
          "Définition : l’aire d’un carré mesure sa surface.\n\n" +
          "Méthode : on multiplie le côté par lui-même.\n\n" +
          "Calcul : " +
          `${cote} × ${cote} = ${aire}.\n\n` +
          `Conclusion : l’aire est ${aire} cm².`,
        canvas: {
          kind: "quadrilatere",
          points: {
            A: { x: 80, y: 70 },
            B: { x: 190, y: 70 },
            C: { x: 190, y: 180 },
            D: { x: 80, y: 180 },
          },
          sideLabels: {
            AB: `${cote} cm`,
          },
          display: {
            showPoints: true,
            showLabels: true,
            showSides: true,
            showAngles: false,
          },
          marks: {
            rightAnglesAt: ["A", "B", "C", "D"],
            equalSides: [
              ["AB", "BC"],
              ["BC", "CD"],
              ["CD", "DA"],
            ],
          },
        },
      };
    },
  },

  {
    kind: "template",
    id: "cm2_aire_carre_rectangle_qcm_tpl_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_carre_rectangle",
    difficulty: 3,
    theme: "neutral",
    hint: "Ne confonds pas aire et périmètre.",
    tags: ["cm2", "aire", "rectangle", "qcm", "template", "confusion"],
    generate: () => {
      const longueur = randomInt(4, 10);
      const largeur = randomInt(2, 6);
      const aire = longueur * largeur;
      const perimetre = 2 * (longueur + largeur);

      // Un 6 sur 3, un 4 sur 4 : l'aire et le périmètre tombent sur le même
      // nombre. Le piège devenait la bonne réponse, écrite deux fois. On garde
      // donc deux pièges de secours pour remplir les quatre lignes.
      const choices = makeChoices(`${aire} cm²`, [
        `${perimetre} cm²`,
        `${longueur + largeur} cm²`,
        `${aire + longueur} cm²`,
        `${aire + largeur} cm²`,
        `${aire * 2} cm²`,
      ]);

      return {
        text: `Un rectangle mesure ${longueur} cm sur ${largeur} cm. Quelle est son aire ?`,
        format: "qcm",
        choices,
        expected: [`${aire} cm²`],
        comparator: "mcq_exact",
        explanation:
          "Définition : l’aire mesure la surface.\n\n" +
          "Méthode : pour un rectangle, on multiplie longueur par largeur.\n\n" +
          "Calcul : " +
          `${longueur} × ${largeur} = ${aire}.\n\n` +
          `Conclusion : l’aire est ${aire} cm².`,
      };
    },
  },

  // =========================
  // AIRE_TRIANGLE_RECTANGLE
  // =========================

  {
    kind: "fixed",
    id: "cm2_aire_triangle_rectangle_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_triangle_rectangle",
    difficulty: 2,
    theme: "neutral",
    text: "Un triangle rectangle a deux côtés perpendiculaires de 6 cm et 4 cm. Quelle est son aire ?",
    format: "short",
    expected: ["12", "12 cm²", "12 cm2", "12cm²", "12cm2"],
    comparator: "number_equal",
    hint: "Aire du triangle rectangle = base × hauteur ÷ 2.",
    explanation:
      "Définition : un triangle rectangle peut être vu comme la moitié d’un rectangle.\n\n" +
      "Méthode : on multiplie les deux côtés perpendiculaires puis on divise par 2.\n\n" +
      "Calcul : " +
      "6 × 4 = 24, puis 24 ÷ 2 = 12.\n\n" +
      "Conclusion : l’aire est 12 cm².",
    tags: ["cm2", "aire", "triangle_rectangle", "canvas"],
    canvas: {
      kind: "triangle",
      points: {
        A: { x: 65, y: 180 },
        B: { x: 230, y: 180 },
        C: { x: 65, y: 65 },
      },
      sideLabels: {
        AB: "6 cm",
        CA: "4 cm",
      },
      display: {
        showPoints: true,
        showLabels: true,
        showSides: true,
        showAngles: false,
      },
      marks: {
       rightAngleAt: "A",
      },
    },
  },

  {
    kind: "fixed",
    id: "cm2_aire_triangle_rectangle_fixed_2_qcm",
    niveau: "cm2",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_triangle_rectangle",
    difficulty: 3,
    theme: "neutral",
    text: "Un triangle rectangle a une base de 8 cm et une hauteur de 5 cm. Quelle est son aire ?",
    format: "qcm",
    choices: ["13 cm²", "20 cm²", "40 cm²", "26 cm²"],
    expected: ["20 cm²"],
    comparator: "mcq_exact",
    hint: "N’oublie pas de diviser par 2.",
    explanation:
      "Définition : un triangle rectangle est la moitié d’un rectangle.\n\n" +
      "Méthode : on calcule base × hauteur ÷ 2.\n\n" +
      "Calcul : " +
      "8 × 5 = 40, puis 40 ÷ 2 = 20.\n\n" +
      "Conclusion : l’aire est 20 cm².",
    tags: ["cm2", "aire", "triangle_rectangle", "qcm", "piege"],
    canvas: {
      kind: "triangle",
      points: {
        A: { x: 65, y: 180 },
        B: { x: 230, y: 180 },
        C: { x: 65, y: 65 },
      },
      sideLabels: {
        AB: "8 cm",
        CA: "5 cm",
      },
      display: {
        showPoints: true,
        showLabels: true,
        showSides: true,
        showAngles: false,
      },
      marks: {
        rightAngleAt: "A",
      },
    },
  },

  {
    kind: "template",
    id: "cm2_aire_triangle_rectangle_tpl_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_triangle_rectangle",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule base × hauteur, puis divise par 2.",
    tags: ["cm2", "aire", "triangle_rectangle", "template", "canvas"],
    generate: () => {
      const bases = [4, 6, 8, 10, 12];
      const hauteurs = [3, 4, 5, 6, 8];
      const base = bases[Math.floor(Math.random() * bases.length)];
      const hauteur = hauteurs[Math.floor(Math.random() * hauteurs.length)];
      const aire = (base * hauteur) / 2;

      return {
        text: `Calcule l’aire d’un triangle rectangle dont les côtés perpendiculaires mesurent ${base} cm et ${hauteur} cm.`,
        format: "short",
        expected: [String(aire), `${aire} cm²`, `${aire} cm2`, `${aire}cm²`, `${aire}cm2`],
        comparator: "number_equal",
        explanation:
          "Définition : un triangle rectangle est la moitié d’un rectangle.\n\n" +
          "Méthode : on calcule base × hauteur ÷ 2.\n\n" +
          "Calcul : " +
          `${base} × ${hauteur} = ${base * hauteur}, puis ${base * hauteur} ÷ 2 = ${aire}.\n\n` +
          `Conclusion : l’aire est ${aire} cm².`,
        canvas: {
          kind: "triangle",
          points: {
            A: { x: 65, y: 180 },
            B: { x: 230, y: 180 },
            C: { x: 65, y: 65 },
          },
          sideLabels: {
            AB: `${base} cm`,
            CA: `${hauteur} cm`,
          },
          display: {
            showPoints: true,
            showLabels: true,
            showSides: true,
            showAngles: false,
          },
          marks: {
            rightAnglesAt: ["A"],
          },
        },
      };
    },
  },

  {
    kind: "template",
    id: "cm2_aire_triangle_rectangle_erreur_tpl_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_triangle_rectangle",
    difficulty: 4,
    theme: "neutral",
    hint: "Un triangle rectangle est la moitié du rectangle correspondant.",
    tags: ["cm2", "aire", "triangle_rectangle", "erreur", "qcm", "template"],
    generate: () => {
      const bases = [6, 8, 10, 12];
      const hauteurs = [4, 5, 6];
      const base = bases[Math.floor(Math.random() * bases.length)];
      const hauteur = hauteurs[Math.floor(Math.random() * hauteurs.length)];
      const produit = base * hauteur;
      const aire = produit / 2;

      return {
        text: `Un élève calcule l’aire d’un triangle rectangle de base ${base} cm et de hauteur ${hauteur} cm. Il répond ${produit} cm². A-t-il raison ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation:
          "Définition : un triangle rectangle est la moitié d’un rectangle.\n\n" +
          "Méthode : il faut diviser le produit base × hauteur par 2.\n\n" +
          "Calcul : " +
          `${base} × ${hauteur} = ${produit}, puis ${produit} ÷ 2 = ${aire}.\n\n` +
          `Conclusion : la bonne aire est ${aire} cm². L’élève a tort.`,
      };
    },
  },

  // =========================
  // AIRE_COMPOSER
  // =========================

  {
    kind: "fixed",
    id: "cm2_aire_composer_fixed_1_quadrillage",
    niveau: "cm2",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_composer",
    difficulty: 2,
    theme: "neutral",
    text: "Observe la figure sur quadrillage. Quelle est son aire en carreaux unités ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Compte les carreaux remplis.",
    explanation:
      "Définition : sur un quadrillage, chaque carreau rempli peut représenter 1 unité d’aire.\n\n" +
      "Méthode : on compte les carreaux remplis.\n\n" +
      "Calcul : " +
      "La figure contient 5 carreaux remplis.\n\n" +
      "Conclusion : son aire est 5 unités d’aire.",
    tags: ["cm2", "aire", "composer", "quadrillage", "canvas"],
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
    id: "cm2_aire_composer_fixed_2_decomposition",
    niveau: "cm2",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_composer",
    difficulty: 3,
    theme: "neutral",
    text: "Une figure est composée de deux rectangles d’aires 8 cm² et 5 cm². Quelle est son aire totale ?",
    format: "short",
    expected: ["13", "13 cm²", "13 cm2", "13cm²", "13cm2"],
    comparator: "number_equal",
    hint: "Additionne les deux aires.",
    explanation:
      "Définition : une figure composée peut être découpée en figures simples.\n\n" +
      "Méthode : on additionne les aires des parties sans chevauchement.\n\n" +
      "Calcul : " +
      "8 + 5 = 13.\n\n" +
      "Conclusion : l’aire totale est 13 cm².",
    tags: ["cm2", "aire", "composer", "decomposition"],
  },

  {
    kind: "fixed",
    id: "cm2_aire_composer_fixed_3_methode",
    niveau: "cm2",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_composer",
    difficulty: 3,
    theme: "neutral",
    text: "Pour calculer l’aire d’une figure composée, on peut…",
    format: "qcm",
    choices: [
      "la découper en figures simples",
      "compter seulement le contour",
      "additionner les périmètres",
      "compter les sommets",
    ],
    expected: ["la découper en figures simples"],
    comparator: "mcq_exact",
    hint: "On veut calculer une surface.",
    explanation:
      "Définition : une figure composée peut être découpée en figures simples.\n\n" +
      "Méthode : on calcule l’aire de chaque partie.\n\n" +
      "Calcul : " +
      "On peut découper la figure en rectangles, carrés ou triangles simples, puis additionner les aires.\n\n" +
      "Conclusion : la bonne méthode est de la découper en figures simples.",
    tags: ["cm2", "aire", "composer", "methode", "qcm"],
  },

  {
    kind: "template",
    id: "cm2_aire_composer_tpl_1_addition",
    niveau: "cm2",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_composer",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne les aires des deux parties.",
    tags: ["cm2", "aire", "composer", "template"],
    generate: () => {
      const a = randomInt(4, 12);
      const b = randomInt(3, 10);
      const total = a + b;

      return {
        text: `Une figure est composée de deux parties d’aires ${a} cm² et ${b} cm². Quelle est son aire totale ?`,
        format: "short",
        expected: [String(total), `${total} cm²`, `${total} cm2`, `${total}cm²`, `${total}cm2`],
        comparator: "number_equal",
        explanation:
          "Définition : pour une figure composée sans chevauchement, on additionne les aires des parties.\n\n" +
          "Méthode : on repère les deux aires données.\n\n" +
          "Calcul : " +
          `${a} + ${b} = ${total}.\n\n` +
          `Conclusion : l’aire totale est ${total} cm².`,
      };
    },
  },

  {
    kind: "template",
    id: "cm2_aire_composer_tpl_2_quadrillage",
    niveau: "cm2",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_composer",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les cases remplies.",
    tags: ["cm2", "aire", "composer", "quadrillage", "template", "canvas"],
    generate: () => {
      const shapes = [
        {
          cells: [
            [1, 1],
            [1, 2],
            [2, 1],
            [2, 2],
          ] as Array<[number, number]>,
          aire: 4,
        },
        {
          cells: [
            [1, 1],
            [1, 2],
            [1, 3],
            [2, 1],
            [2, 2],
            [3, 1],
          ] as Array<[number, number]>,
          aire: 6,
        },
        {
          cells: [
            [1, 1],
            [1, 2],
            [2, 1],
            [2, 2],
            [3, 1],
            [3, 2],
            [3, 3],
          ] as Array<[number, number]>,
          aire: 7,
        },
      ];

      const shape = shapes[Math.floor(Math.random() * shapes.length)];

      return {
        text: "Observe la figure sur quadrillage. Quelle est son aire en carreaux unités ?",
        format: "short",
        expected: [String(shape.aire)],
        comparator: "number_equal",
        explanation:
          "Définition : sur un quadrillage, chaque case remplie vaut 1 unité d’aire.\n\n" +
          "Méthode : on compte toutes les cases remplies.\n\n" +
          "Calcul : " +
          `La figure contient ${shape.aire} cases remplies.\n\n` +
          `Conclusion : son aire est ${shape.aire} unités d’aire.`,
        canvas: {
          kind: "figure_libre",
          grid: {
            rows: 6,
            cols: 6,
            filledCells: shape.cells,
          },
          display: {
            showGrid: true,
            showFilled: true,
          },
        },
      };
    },
  },

  // =========================
  // AIRE_DEFI
  // =========================

  {
    kind: "fixed",
    id: "cm2_aire_defi_fixed_1_inverse_carre",
    niveau: "cm2",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un carré a une aire de 36 cm². Combien mesure son côté ?",
    format: "short",
    expected: ["6", "6 cm", "6cm"],
    comparator: "number_equal",
    hint: "Cherche le nombre qui multiplié par lui-même donne 36.",
    explanation:
      "Définition : l’aire d’un carré vaut côté × côté.\n\n" +
      "Méthode : on cherche le nombre qui multiplié par lui-même donne 36.\n\n" +
      "Calcul : " +
      "6 × 6 = 36.\n\n" +
      "Conclusion : le côté mesure 6 cm.",
    tags: ["cm2", "aire", "defi", "inverse", "carre"],
  },

  {
    kind: "fixed",
    id: "cm2_aire_defi_fixed_2_meme_aire",
    niveau: "cm2",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Deux rectangles peuvent-ils avoir la même aire mais des périmètres différents ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Compare par exemple 3 × 4 et 2 × 6.",
    explanation:
      "Définition : l’aire mesure la surface, le périmètre mesure le contour.\n\n" +
      "Méthode : on cherche deux rectangles de même produit mais de formes différentes.\n\n" +
      "Calcul : " +
      "3 × 4 = 12 et 2 × 6 = 12, donc les deux rectangles ont la même aire. Mais leurs périmètres sont différents.\n\n" +
      "Conclusion : oui, c’est possible.",
    tags: ["cm2", "aire", "defi", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_aire_defi_fixed_3_reunion_potager",
    niveau: "cm2",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_defi",
    difficulty: 4,
    theme: "reunion",
    text: "À La Réunion, un petit potager rectangulaire mesure 7 m de long et 4 m de large. Quelle est son aire ?",
    format: "short",
    expected: ["28", "28 m²", "28 m2", "28m²", "28m2"],
    comparator: "number_equal",
    hint: "Aire du rectangle = longueur × largeur.",
    explanation:
      "Définition : la surface d’un potager correspond à une aire.\n\n" +
      "Méthode : on modélise le potager par un rectangle.\n\n" +
      "Calcul : " +
      "7 × 4 = 28.\n\n" +
      "Conclusion : l’aire du potager est 28 m².",
    tags: ["cm2", "aire", "defi", "reunion", "probleme"],
  },

  {
    kind: "template",
    id: "cm2_aire_defi_tpl_1_inverse_rectangle",
    niveau: "cm2",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Aire = longueur × largeur.",
    tags: ["cm2", "aire", "defi", "inverse", "template"],
    generate: () => {
      const largeur = [3, 4, 5, 6][Math.floor(Math.random() * 4)];
      const longueur = [6, 7, 8, 9, 10][Math.floor(Math.random() * 5)];
      const aire = largeur * longueur;

      return {
        text: `Un rectangle a une aire de ${aire} cm² et une largeur de ${largeur} cm. Quelle est sa longueur ?`,
        format: "short",
        expected: [String(longueur), `${longueur} cm`, `${longueur}cm`],
        comparator: "number_equal",
        explanation:
          "Définition : l’aire d’un rectangle vaut longueur × largeur.\n\n" +
          "Méthode : pour retrouver la longueur, on divise l’aire par la largeur.\n\n" +
          "Calcul : " +
          `${aire} ÷ ${largeur} = ${longueur}.\n\n` +
          `Conclusion : la longueur mesure ${longueur} cm.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm2_aire_defi_tpl_2_comparer",
    niveau: "cm2",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Calcule les deux aires puis compare.",
    tags: ["cm2", "aire", "defi", "comparer", "qcm", "template"],
    generate: () => {
      const longueur = [6, 7, 8][Math.floor(Math.random() * 3)];
      const largeur = [3, 4][Math.floor(Math.random() * 2)];
      const aireRectangle = longueur * largeur;

      const cote = [4, 5, 6][Math.floor(Math.random() * 3)];
      const aireCarre = cote * cote;

      const correct =
        aireRectangle > aireCarre
          ? "le rectangle"
          : aireCarre > aireRectangle
            ? "le carré"
            : "ils ont la même aire";

      return {
        text: `Un rectangle mesure ${longueur} cm sur ${largeur} cm. Un carré a un côté de ${cote} cm. Quelle figure a la plus grande aire ?`,
        format: "qcm",
        choices: shuffle(["le rectangle", "le carré", "ils ont la même aire"]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : pour comparer deux aires, on calcule chaque aire.\n\n" +
          "Méthode : on calcule l’aire du rectangle et l’aire du carré.\n\n" +
          "Calcul : " +
          `Rectangle : ${longueur} × ${largeur} = ${aireRectangle}. Carré : ${cote} × ${cote} = ${aireCarre}.\n\n` +
          `Conclusion : la bonne réponse est : ${correct}.`,
      };
    },
  },
];