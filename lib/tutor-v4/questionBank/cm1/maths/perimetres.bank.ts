import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

/* =========================
   HELPERS
========================= */

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: string[]) {
  return shuffle([correct, ...wrongs])
    .filter((choice, index, arr) => arr.indexOf(choice) === index)
    .slice(0, 4);
}

function expSimple(message: string) {
  return message;
}

function exp(
  definition: string,
  methode: string,
  calcul: string,
  conclusion: string
) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul / observation : ${calcul}\n\nConclusion : ${conclusion}`;
}

export const perimetresBank: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "cm1_perimetre_quadrilatere_fixed_g1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_quadrilatere",
    difficulty: 2,
    theme: "neutral",
    text: "Un rectangle mesure 8 cm de long et 5 cm de large. Quel est son périmètre ?",
    format: "qcm",
    choices: ["26 cm","13 cm","40 cm","18 cm"],
    expected: ["26 cm"],
    comparator: "mcq_exact",
    hint: "Le périmètre, c'est le tour : on additionne les 4 côtés.",
    explanation: "Périmètre = 2 × (8 + 5) = 2 × 13 = 26 cm.",
    tags: ["cm1","perimetre","perimetre_quadrilatere","guide","qcm"],
  },

  // ============================================================
  // PERIMETRE_COMPRENDRE
  // Comprendre ce qu’est un périmètre
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_perimetre_comprendre_fixed_001_definition",
    niveau: "cm1",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Le périmètre d’une figure correspond à...",
    format: "qcm",
    choices: [
      "la longueur du contour de la figure",
      "la surface à l’intérieur de la figure",
      "le poids de la figure",
      "la quantité d’eau dans la figure",
    ],
    expected: ["la longueur du contour de la figure"],
    comparator: "mcq_exact",
    hint: "Le périmètre, c’est le tour de la figure.",
    explanation: expSimple(
      "Le périmètre mesure la longueur du contour d’une figure. " +
        "Quand on calcule un périmètre, on imagine que l’on fait tout le tour de la figure."
    ),
    tags: ["cm1", "perimetre", "comprendre", "definition", "qcm"],
  },

  {
    kind: "template",
    id: "cm1_perimetre_comprendre_tpl_001_vocabulaire_tour",
    niveau: "cm1",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_comprendre",
    difficulty: 1,
    theme: "neutral",
    hint: "Cherche le mot qui parle du tour de la figure.",
    tags: ["cm1", "perimetre", "comprendre", "vocabulaire", "template"],
    generate: () => {
      const contexte = randomChoice([
        {
          objet: "un terrain",
          phrase: "Pour connaître la longueur de clôture nécessaire autour d’un terrain, on calcule...",
        },
        {
          objet: "une figure",
          phrase: "Pour connaître la longueur du contour d’une figure, on calcule...",
        },
        {
          objet: "un jardin",
          phrase: "Pour faire tout le tour d’un jardin, on utilise...",
        },
        {
          objet: "une cour",
          phrase: "Pour mesurer le tour d’une cour, on cherche...",
        },
      ]);

      return {
        text: contexte.phrase,
        format: "qcm",
        choices: makeChoices("le périmètre", [
          "l’aire",
          "la masse",
          "la contenance",
        ]),
        expected: ["le périmètre"],
        comparator: "mcq_exact",
        explanation:
          `On parle ici du tour de ${contexte.objet}. ` +
          "Le tour d’une figure ou d’un terrain correspond au périmètre.",
      };
    },
  },

  {
    kind: "template",
    id: "cm1_perimetre_comprendre_tpl_002_unite_longueur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_comprendre",
    difficulty: 1,
    theme: "neutral",
    hint: "Un périmètre est une longueur.",
    tags: ["cm1", "perimetre", "comprendre", "unite", "template"],
    generate: () => {
      const unite = randomChoice([
        {
          correct: "cm",
          wrongs: ["cm²", "L", "kg"],
          explanation: "Le centimètre est une unité de longueur.",
        },
        {
          correct: "m",
          wrongs: ["m²", "g", "L"],
          explanation: "Le mètre est une unité de longueur.",
        },
        {
          correct: "km",
          wrongs: ["km²", "kg", "mL"],
          explanation: "Le kilomètre est une unité de longueur.",
        },
      ]);

      return {
        text: "Quelle unité peut convenir pour exprimer un périmètre ?",
        format: "qcm",
        choices: makeChoices(unite.correct, unite.wrongs),
        expected: [unite.correct],
        comparator: "mcq_exact",
        explanation:
          "Un périmètre est une longueur. " +
          `${unite.explanation} ` +
          "On peut donc utiliser cette unité pour exprimer un périmètre.",
      };
    },
  },

  {
    kind: "template",
    id: "cm1_perimetre_comprendre_tpl_003_aire_ou_perimetre",
    niveau: "cm1",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_comprendre",
    difficulty: 2,
    theme: "neutral",
    hint: "Le périmètre mesure le contour. L’aire mesure la surface intérieure.",
    tags: ["cm1", "perimetre", "comprendre", "aire", "confusion", "template"],
    generate: () => {
      const question = randomChoice([
        {
          text: "On veut mesurer le contour d’un rectangle. Que cherche-t-on ?",
          correct: "son périmètre",
          explanation:
            "Le contour d’une figure correspond au périmètre. L’aire, elle, mesure la surface intérieure.",
        },
        {
          text: "On veut mesurer la surface à l’intérieur d’un rectangle. Que cherche-t-on ?",
          correct: "son aire",
          explanation:
            "La surface intérieure correspond à l’aire. Le périmètre mesure seulement le contour.",
        },
        {
          text: "On veut savoir quelle longueur de ruban il faut pour entourer une figure. Que cherche-t-on ?",
          correct: "son périmètre",
          explanation:
            "Un ruban qui entoure une figure suit son contour. On cherche donc le périmètre.",
        },
      ]);

      return {
        text: question.text,
        format: "qcm",
        choices: makeChoices(question.correct, [
          "son périmètre",
          "son aire",
          "sa masse",
          "sa contenance",
        ]),
        expected: [question.correct],
        comparator: "mcq_exact",
        explanation: question.explanation,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_perimetre_comprendre_tpl_004_reunion_cloture",
    niveau: "cm1",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_comprendre",
    difficulty: 2,
    theme: "reunion",
    hint: "Une clôture fait le tour du terrain.",
    tags: ["cm1", "perimetre", "comprendre", "reunion", "cloture", "template"],
    generate: () => {
      const lieu = randomChoice([
        "un petit jardin à Saint-Pierre",
        "un potager près du Tampon",
        "une cour d’école à La Réunion",
        "un terrain près du bord de mer",
      ]);

      return {
        text: `On veut poser une clôture autour de ${lieu}. Que faut-il calculer ?`,
        format: "qcm",
        choices: makeChoices("le périmètre", [
          "l’aire",
          "la masse",
          "la contenance",
        ]),
        expected: ["le périmètre"],
        comparator: "mcq_exact",
        explanation:
          "Une clôture suit le tour du terrain. " +
          "Quand on cherche la longueur nécessaire pour faire tout le tour, on calcule le périmètre.",
      };
    },
  },

  {
    kind: "template",
    id: "cm1_perimetre_comprendre_tpl_005_erreur_longueur_largeur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_comprendre",
    difficulty: 2,
    theme: "neutral",
    hint: "Longueur × largeur sert à calculer une aire, pas un périmètre.",
    tags: ["cm1", "perimetre", "comprendre", "erreur", "aire", "rectangle", "template"],
    generate: () => {
      const longueur = randomInt(4, 10);
      const largeur = randomInt(2, 6);
      const produit = longueur * largeur;
      const perimetre = 2 * (longueur + largeur);

      return {
        text:
          `Un rectangle mesure ${longueur} cm de long et ${largeur} cm de large. ` +
          `Un élève dit : “Son périmètre est ${produit} cm car j’ai fait ${longueur} × ${largeur}.” A-t-il raison ?`,
        format: "qcm",
        choices: ["non", "oui"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation:
          "L’élève confond périmètre et aire. " +
          "Le calcul longueur × largeur sert à trouver l’aire d’un rectangle. " +
          "Pour le périmètre, on additionne les côtés du contour : " +
          `${longueur} + ${largeur} + ${longueur} + ${largeur} = ${perimetre}. ` +
          "L’élève n’a donc pas raison.",
      };
    },
  },

  {
    kind: "template",
    id: "cm1_perimetre_comprendre_tpl_006_open_expliquer_contour",
    niveau: "cm1",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_comprendre",
    difficulty: 2,
    theme: "neutral",
    hint: "Utilise les mots contour, tour ou côtés.",
    tags: ["cm1", "perimetre", "comprendre", "open", "expliquer", "template"],
    generate: () => {
      const situation = randomChoice([
        "un rectangle",
        "un jardin",
        "un triangle",
        "une figure dessinée sur une feuille",
      ]);

      return {
        text: `Explique avec tes mots ce qu’est le périmètre de ${situation}.`,
        format: "open",
        expected: ["contour", "tour", "côtés"],
        comparator: "contains_keyword",
        explanation:
          "Réponse possible : le périmètre, c’est la longueur du contour. " +
          `Pour ${situation}, on imagine que l’on fait tout le tour, puis on additionne les longueurs des côtés.`,
      };
    },
  },
    // ============================================================
  // PERIMETRE_TRIANGLE
  // Calculer le périmètre d’un triangle
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_perimetre_triangle_fixed_001_canvas_modele",
    niveau: "cm1",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_triangle",
    difficulty: 1,
    theme: "neutral",
    text: "Observe le triangle. Ses côtés mesurent 4 cm, 5 cm et 6 cm. Quel est son périmètre ?",
    format: "short",
    expected: ["15", "15 cm", "15cm"],
    comparator: "number_equal",
    hint: "Additionne les trois côtés du triangle.",
    explanation:
      "Le périmètre d’un triangle est la longueur de son contour. " +
      "Un triangle a trois côtés, donc on additionne les trois longueurs. " +
      "4 + 5 + 6 = 15. Le périmètre est donc 15 cm.",
    tags: ["cm1", "perimetre", "triangle", "modele", "canvas"],
    canvas: {
      kind: "triangle",
      points: {
        A: { x: 70, y: 180 },
        B: { x: 230, y: 180 },
        C: { x: 140, y: 60 },
      },
      sideLabels: {
        AB: "6 cm",
        BC: "5 cm",
        CA: "4 cm",
      },
      display: {
        showPoints: true,
        showLabels: true,
        showSides: true,
        showAngles: false,
      },
    },
  },

  {
    kind: "template",
    id: "cm1_perimetre_triangle_tpl_001_triangle_quelconque",
    niveau: "cm1",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_triangle",
    difficulty: 1,
    theme: "neutral",
    hint: "Un triangle a trois côtés : additionne les trois longueurs.",
    tags: ["cm1", "perimetre", "triangle", "quelconque", "template", "canvas"],
    generate: () => {
      const a = randomInt(3, 9);
      const b = randomInt(3, 9);
      const c = randomInt(3, 9);
      const p = a + b + c;

      return {
        text: `Un triangle a pour côtés ${a} cm, ${b} cm et ${c} cm. Calcule son périmètre.`,
        format: "short",
        expected: [String(p), `${p} cm`, `${p}cm`],
        comparator: "number_equal",
        explanation:
          "Pour calculer le périmètre d’un triangle, on additionne les longueurs de ses trois côtés. " +
          `${a} + ${b} + ${c} = ${p}. ` +
          `Le périmètre est donc ${p} cm.`,
        canvas: {
          kind: "triangle",
          points: {
            A: { x: 70, y: 180 },
            B: { x: 230, y: 180 },
            C: { x: 140, y: 60 },
          },
          sideLabels: {
            AB: `${a} cm`,
            BC: `${b} cm`,
            CA: `${c} cm`,
          },
          display: {
            showPoints: true,
            showLabels: true,
            showSides: true,
            showAngles: false,
          },
        },
      };
    },
  },

  {
    kind: "template",
    id: "cm1_perimetre_triangle_tpl_002_qcm_triangle_simple",
    niveau: "cm1",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_triangle",
    difficulty: 1,
    theme: "neutral",
    hint: "Additionne les trois côtés, sans en oublier.",
    tags: ["cm1", "perimetre", "triangle", "qcm", "template"],
    generate: () => {
      const a = randomInt(3, 8);
      const b = randomInt(3, 8);
      const c = randomInt(3, 8);
      const p = a + b + c;

      return {
        text: `Un triangle a pour côtés ${a} cm, ${b} cm et ${c} cm. Quel est son périmètre ?`,
        format: "qcm",
        choices: makeChoices(`${p} cm`, [
          `${a + b} cm`,
          `${b + c} cm`,
          `${a * b} cm`,
        ]),
        expected: [`${p} cm`],
        comparator: "mcq_exact",
        explanation:
          "Le périmètre est la longueur du contour. " +
          "Pour un triangle, il faut additionner les trois côtés. " +
          `${a} + ${b} + ${c} = ${p}. ` +
          `La bonne réponse est ${p} cm.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_perimetre_triangle_tpl_003_triangle_equilateral",
    niveau: "cm1",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_triangle",
    difficulty: 2,
    theme: "neutral",
    hint: "Un triangle équilatéral a trois côtés égaux.",
    tags: ["cm1", "perimetre", "triangle", "equilateral", "template", "canvas"],
    generate: () => {
      const cote = randomInt(3, 10);
      const p = 3 * cote;

      return {
        text: `Un triangle équilatéral a des côtés de ${cote} cm. Calcule son périmètre.`,
        format: "short",
        expected: [String(p), `${p} cm`, `${p}cm`],
        comparator: "number_equal",
        explanation:
          "Un triangle équilatéral a trois côtés de même longueur. " +
          `Chaque côté mesure ${cote} cm. ` +
          `On peut donc calculer ${cote} + ${cote} + ${cote}, ou 3 × ${cote}. ` +
          `Le périmètre est ${p} cm.`,
        canvas: {
          kind: "triangle",
          points: {
            A: { x: 70, y: 180 },
            B: { x: 230, y: 180 },
            C: { x: 150, y: 55 },
          },
          sideLabels: {
            AB: `${cote} cm`,
            BC: `${cote} cm`,
            CA: `${cote} cm`,
          },
          display: {
            showPoints: true,
            showLabels: true,
            showSides: true,
            showAngles: false,
          },
        },
      };
    },
  },

  {
    kind: "template",
    id: "cm1_perimetre_triangle_tpl_004_triangle_isocele",
    niveau: "cm1",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_triangle",
    difficulty: 2,
    theme: "neutral",
    hint: "Un triangle isocèle a deux côtés égaux.",
    tags: ["cm1", "perimetre", "triangle", "isocele", "template", "canvas"],
    generate: () => {
      const coteEgal = randomInt(4, 10);
      const base = randomInt(3, 9);
      const p = coteEgal + coteEgal + base;

      return {
        text:
          `Un triangle isocèle a deux côtés de ${coteEgal} cm ` +
          `et une base de ${base} cm. Calcule son périmètre.`,
        format: "short",
        expected: [String(p), `${p} cm`, `${p}cm`],
        comparator: "number_equal",
        explanation:
          "Un triangle isocèle a deux côtés de même longueur. " +
          `Ici, les deux côtés égaux mesurent ${coteEgal} cm et la base mesure ${base} cm. ` +
          `On additionne les trois côtés : ${coteEgal} + ${coteEgal} + ${base} = ${p}. ` +
          `Le périmètre est ${p} cm.`,
        canvas: {
          kind: "triangle",
          points: {
            A: { x: 70, y: 180 },
            B: { x: 230, y: 180 },
            C: { x: 150, y: 60 },
          },
          sideLabels: {
            AB: `${base} cm`,
            BC: `${coteEgal} cm`,
            CA: `${coteEgal} cm`,
          },
          display: {
            showPoints: true,
            showLabels: true,
            showSides: true,
            showAngles: false,
          },
        },
      };
    },
  },

  {
    kind: "template",
    id: "cm1_perimetre_triangle_tpl_005_trouver_cote_manquant",
    niveau: "cm1",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_triangle",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne les deux côtés connus, puis regarde ce qu’il manque pour atteindre le périmètre.",
    tags: ["cm1", "perimetre", "triangle", "cote_manquant", "template"],
    generate: () => {
      const a = randomInt(4, 9);
      const b = randomInt(4, 9);
      const c = randomInt(3, 8);
      const p = a + b + c;

      return {
        text:
          `Un triangle a un périmètre de ${p} cm. ` +
          `Deux côtés mesurent ${a} cm et ${b} cm. Combien mesure le troisième côté ?`,
        format: "short",
        expected: [String(c), `${c} cm`, `${c}cm`],
        comparator: "number_equal",
        explanation:
          "Le périmètre est la somme des trois côtés. " +
          `Les deux côtés connus mesurent ${a} cm et ${b} cm. ` +
          `On calcule d’abord ${a} + ${b} = ${a + b}. ` +
          `Il manque ${p} - ${a + b} = ${c}. ` +
          `Le troisième côté mesure donc ${c} cm.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_perimetre_triangle_tpl_006_erreur_oublier_un_cote",
    niveau: "cm1",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_triangle",
    difficulty: 2,
    theme: "neutral",
    hint: "Un triangle a trois côtés, pas seulement deux.",
    tags: ["cm1", "perimetre", "triangle", "erreur", "template"],
    generate: () => {
      const a = randomInt(3, 8);
      const b = randomInt(3, 8);
      const c = randomInt(3, 8);
      const wrong = a + b;
      const p = a + b + c;

      return {
        text:
          `Un triangle a pour côtés ${a} cm, ${b} cm et ${c} cm. ` +
          `Un élève répond ${wrong} cm car il a fait ${a} + ${b}. A-t-il raison ?`,
        format: "qcm",
        choices: ["non", "oui"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation:
          "L’élève a oublié un côté du triangle. " +
          "Pour calculer le périmètre, il faut additionner les trois côtés. " +
          `Il fallait faire ${a} + ${b} + ${c} = ${p}. ` +
          `Le bon périmètre est ${p} cm.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_perimetre_triangle_tpl_007_open_expliquer_methode",
    niveau: "cm1",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_triangle",
    difficulty: 3,
    theme: "neutral",
    hint: "Explique qu’il faut additionner les trois côtés.",
    tags: ["cm1", "perimetre", "triangle", "open", "methode", "template", "canvas"],
    generate: () => {
      const a = randomInt(3, 8);
      const b = randomInt(3, 8);
      const c = randomInt(3, 8);
      const p = a + b + c;

      return {
        text:
          `Un triangle a pour côtés ${a} cm, ${b} cm et ${c} cm. ` +
          `Son périmètre est ${p} cm. Explique comment on peut le trouver.`,
        format: "open",
        expected: ["additionner", "côtés", "triangle"],
        comparator: "contains_keyword",
        explanation:
          "Réponse possible : pour calculer le périmètre d’un triangle, on additionne les trois côtés. " +
          `Ici, on calcule ${a} + ${b} + ${c} = ${p}. ` +
          `Le périmètre est donc ${p} cm.`,
        canvas: {
          kind: "triangle",
          points: {
            A: { x: 70, y: 180 },
            B: { x: 230, y: 180 },
            C: { x: 140, y: 60 },
          },
          sideLabels: {
            AB: `${a} cm`,
            BC: `${b} cm`,
            CA: `${c} cm`,
          },
          display: {
            showPoints: true,
            showLabels: true,
            showSides: true,
            showAngles: false,
          },
        },
      };
    },
  },
    // ============================================================
  // PERIMETRE_QUADRILATERE
  // Calculer le périmètre d’un quadrilatère
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_perimetre_quadrilatere_fixed_001_rectangle_canvas",
    niveau: "cm1",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_quadrilatere",
    difficulty: 2,
    theme: "neutral",
    text: "Observe le rectangle ABCD. Il mesure 6 cm de long et 3 cm de large. Quel est son périmètre ?",
    format: "short",
    expected: ["18", "18 cm", "18cm"],
    comparator: "number_equal",
    hint: "Un rectangle a deux longueurs et deux largeurs.",
    explanation:
      "Le périmètre d’un rectangle est la longueur de son contour. " +
      "Un rectangle a deux longueurs et deux largeurs. " +
      "On additionne donc 6 + 3 + 6 + 3 = 18. " +
      "Le périmètre est 18 cm.",
    tags: ["cm1", "perimetre", "quadrilatere", "rectangle", "canvas", "modele"],
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
        equalSides: [
          ["AB", "CD"],
          ["BC", "DA"],
        ],
      },
    },
  },

  {
    kind: "template",
    id: "cm1_perimetre_quadrilatere_tpl_001_rectangle_short",
    niveau: "cm1",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_quadrilatere",
    difficulty: 2,
    theme: "neutral",
    hint: "Additionne deux longueurs et deux largeurs.",
    tags: ["cm1", "perimetre", "quadrilatere", "rectangle", "template", "canvas"],
    generate: () => {
      const longueur = randomInt(4, 12);
      const largeur = randomInt(2, 8);
      const p = 2 * (longueur + largeur);

      return {
        text:
          `Un rectangle mesure ${longueur} cm de long et ${largeur} cm de large. ` +
          `Calcule son périmètre.`,
        format: "short",
        expected: [String(p), `${p} cm`, `${p}cm`],
        comparator: "number_equal",
        explanation:
          "Le périmètre d’un rectangle est la longueur totale de son contour. " +
          "Un rectangle a deux longueurs et deux largeurs. " +
          `On calcule donc ${longueur} + ${largeur} + ${longueur} + ${largeur} = ${p}. ` +
          `Le périmètre est ${p} cm.`,
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
    id: "cm1_perimetre_quadrilatere_tpl_002_rectangle_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_quadrilatere",
    difficulty: 2,
    theme: "neutral",
    hint: "Attention : longueur × largeur donne l’aire, pas le périmètre.",
    tags: ["cm1", "perimetre", "quadrilatere", "rectangle", "qcm", "template"],
    generate: () => {
      const longueur = randomInt(5, 12);
      const largeur = randomInt(2, 7);
      const p = 2 * (longueur + largeur);
      const airePiege = longueur * largeur;

      return {
        text:
          `Un rectangle mesure ${longueur} cm de longueur et ${largeur} cm de largeur. ` +
          `Quel est son périmètre ?`,
        format: "qcm",
        choices: makeChoices(`${p} cm`, [
          `${longueur + largeur} cm`,
          `${airePiege} cm`,
          `${longueur + largeur + largeur} cm`,
        ]),
        expected: [`${p} cm`],
        comparator: "mcq_exact",
        explanation:
          "Pour un rectangle, le périmètre mesure le contour. " +
          `Il faut donc additionner les quatre côtés : ${longueur} + ${largeur} + ${longueur} + ${largeur} = ${p}. ` +
          `Le calcul ${longueur} × ${largeur} donnerait l’aire, pas le périmètre.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_perimetre_quadrilatere_tpl_003_carre_short",
    niveau: "cm1",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_quadrilatere",
    difficulty: 2,
    theme: "neutral",
    hint: "Un carré a quatre côtés égaux.",
    tags: ["cm1", "perimetre", "quadrilatere", "carre", "template", "canvas"],
    generate: () => {
      const cote = randomInt(3, 12);
      const p = 4 * cote;

      return {
        text: `Un carré a un côté de ${cote} cm. Calcule son périmètre.`,
        format: "short",
        expected: [String(p), `${p} cm`, `${p}cm`],
        comparator: "number_equal",
        explanation:
          "Un carré a quatre côtés de même longueur. " +
          `Chaque côté mesure ${cote} cm. ` +
          `On peut calculer ${cote} + ${cote} + ${cote} + ${cote}, ou 4 × ${cote}. ` +
          `Le périmètre est ${p} cm.`,
        canvas: {
          kind: "quadrilatere",
          points: {
            A: { x: 70, y: 70 },
            B: { x: 190, y: 70 },
            C: { x: 190, y: 190 },
            D: { x: 70, y: 190 },
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
    id: "cm1_perimetre_quadrilatere_tpl_004_carre_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_quadrilatere",
    difficulty: 2,
    theme: "neutral",
    hint: "Pour un carré, on multiplie le côté par 4.",
    tags: ["cm1", "perimetre", "quadrilatere", "carre", "qcm", "template"],
    generate: () => {
      const cote = randomInt(4, 10);
      const p = 4 * cote;

      return {
        text: `Un carré a un côté de ${cote} cm. Quel est son périmètre ?`,
        format: "qcm",
        choices: makeChoices(`${p} cm`, [
          `${2 * cote} cm`,
          `${cote * cote} cm`,
          `${cote + 4} cm`,
        ]),
        expected: [`${p} cm`],
        comparator: "mcq_exact",
        explanation:
          "Dans un carré, les quatre côtés sont égaux. " +
          `On additionne donc ${cote} + ${cote} + ${cote} + ${cote}. ` +
          `Cela revient à faire 4 × ${cote} = ${p}. ` +
          `Le périmètre est ${p} cm.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_perimetre_quadrilatere_tpl_005_quadrilatere_quelconque",
    niveau: "cm1",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_quadrilatere",
    difficulty: 3,
    theme: "neutral",
    hint: "Un quadrilatère a quatre côtés. Additionne les quatre longueurs.",
    tags: ["cm1", "perimetre", "quadrilatere", "quelconque", "template", "canvas"],
    generate: () => {
      const a = randomInt(3, 9);
      const b = randomInt(3, 9);
      const c = randomInt(3, 9);
      const d = randomInt(3, 9);
      const p = a + b + c + d;

      return {
        text:
          `Un quadrilatère a pour côtés ${a} cm, ${b} cm, ${c} cm et ${d} cm. ` +
          `Calcule son périmètre.`,
        format: "short",
        expected: [String(p), `${p} cm`, `${p}cm`],
        comparator: "number_equal",
        explanation:
          "Un quadrilatère a quatre côtés. " +
          "Son périmètre est la somme des longueurs de ces quatre côtés. " +
          `${a} + ${b} + ${c} + ${d} = ${p}. ` +
          `Le périmètre est ${p} cm.`,
        canvas: {
          kind: "quadrilatere",
          points: {
            A: { x: 70, y: 90 },
            B: { x: 230, y: 80 },
            C: { x: 210, y: 180 },
            D: { x: 80, y: 170 },
          },
          sideLabels: {
            AB: `${a} cm`,
            BC: `${b} cm`,
            CD: `${c} cm`,
            DA: `${d} cm`,
          },
          display: {
            showPoints: true,
            showLabels: true,
            showSides: true,
            showAngles: false,
          },
        },
      };
    },
  },

  {
    kind: "template",
    id: "cm1_perimetre_quadrilatere_tpl_006_jardin_reunion",
    niveau: "cm1",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_quadrilatere",
    difficulty: 3,
    theme: "reunion",
    hint: "Pour faire le tour du jardin, on calcule le périmètre.",
    tags: ["cm1", "perimetre", "quadrilatere", "rectangle", "jardin", "reunion", "template"],
    generate: () => {
      const longueur = randomInt(6, 14);
      const largeur = randomInt(3, 8);
      const p = 2 * (longueur + largeur);

      const lieu = randomChoice([
        "à Saint-Pierre",
        "près du Tampon",
        "à Saint-Joseph",
        "près du bord de mer",
      ]);

      return {
        text:
          `Un petit jardin rectangulaire ${lieu} mesure ${longueur} m de long et ${largeur} m de large. ` +
          `Quelle longueur de clôture faut-il pour faire tout le tour ?`,
        format: "short",
        expected: [String(p), `${p} m`, `${p}m`],
        comparator: "number_equal",
        explanation:
          "La clôture doit faire tout le tour du jardin. " +
          "On cherche donc le périmètre du rectangle. " +
          `Il y a deux longueurs de ${longueur} m et deux largeurs de ${largeur} m. ` +
          `${longueur} + ${largeur} + ${longueur} + ${largeur} = ${p}. ` +
          `Il faut ${p} m de clôture.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_perimetre_quadrilatere_tpl_007_erreur_aire_rectangle",
    niveau: "cm1",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_quadrilatere",
    difficulty: 3,
    theme: "neutral",
    hint: "Le périmètre mesure le contour. L’aire mesure la surface intérieure.",
    tags: ["cm1", "perimetre", "quadrilatere", "rectangle", "erreur", "aire", "template"],
    generate: () => {
      const longueur = randomInt(5, 12);
      const largeur = randomInt(2, 8);
      const airePiege = longueur * largeur;
      const p = 2 * (longueur + largeur);

      return {
        text:
          `Un rectangle mesure ${longueur} cm sur ${largeur} cm. ` +
          `Un élève dit : “Son périmètre est ${airePiege} cm, car ${longueur} × ${largeur} = ${airePiege}.” ` +
          `A-t-il raison ?`,
        format: "qcm",
        choices: ["non", "oui"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation:
          "L’élève n’a pas raison : il calcule l’aire du rectangle, pas son périmètre. " +
          "Le périmètre mesure le contour. " +
          `Il faut additionner les quatre côtés : ${longueur} + ${largeur} + ${longueur} + ${largeur} = ${p}. ` +
          `Le périmètre est ${p} cm.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_perimetre_quadrilatere_tpl_008_trouver_cote_carre",
    niveau: "cm1",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_quadrilatere",
    difficulty: 3,
    theme: "neutral",
    hint: "Dans un carré, les quatre côtés sont égaux. On partage le périmètre en 4.",
    tags: ["cm1", "perimetre", "quadrilatere", "carre", "inverse", "template"],
    generate: () => {
      const cote = randomInt(3, 10);
      const p = 4 * cote;

      return {
        text: `Un carré a un périmètre de ${p} cm. Combien mesure un côté ?`,
        format: "short",
        expected: [String(cote), `${cote} cm`, `${cote}cm`],
        comparator: "number_equal",
        explanation:
          "Dans un carré, les quatre côtés sont égaux. " +
          `Le périmètre de ${p} cm est donc partagé en 4 côtés identiques. ` +
          `${p} ÷ 4 = ${cote}. ` +
          `Un côté mesure ${cote} cm.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_perimetre_quadrilatere_tpl_009_open_expliquer_rectangle",
    niveau: "cm1",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_quadrilatere",
    difficulty: 3,
    theme: "neutral",
    hint: "Explique qu’un rectangle a deux longueurs et deux largeurs.",
    tags: ["cm1", "perimetre", "quadrilatere", "rectangle", "open", "methode", "template", "canvas"],
    generate: () => {
      const longueur = randomInt(5, 10);
      const largeur = randomInt(2, 6);
      const p = 2 * (longueur + largeur);

      return {
        text:
          `Un rectangle mesure ${longueur} cm de long et ${largeur} cm de large. ` +
          `Son périmètre est ${p} cm. Explique comment on peut le trouver.`,
        format: "open",
        expected: ["longueur", "largeur", "additionner"],
        comparator: "contains_keyword",
        explanation:
          "Réponse possible : un rectangle a deux longueurs et deux largeurs. " +
          `On additionne donc ${longueur} + ${largeur} + ${longueur} + ${largeur}. ` +
          `On trouve ${p} cm.`,
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
    // ============================================================
  // PERIMETRE_POLYGONE
  // Calculer le périmètre d’un polygone simple
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_perimetre_polygone_fixed_001_figure_libre_modele",
    niveau: "cm1",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_polygone",
    difficulty: 2,
    theme: "neutral",
    text: "Observe la figure sur quadrillage. Quel est son périmètre en unités ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Compte seulement le contour extérieur.",
    explanation:
      "Le périmètre est la longueur du contour extérieur. " +
      "Sur un quadrillage, chaque petit côté extérieur compte pour 1 unité. " +
      "Ici, la figure forme un carré de 2 cases sur 2. Son contour compte 8 unités. " +
      "Le périmètre est donc 8 unités.",
    tags: ["cm1", "perimetre", "polygone", "figure_libre", "quadrillage", "canvas", "modele"],
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
        ],
      },
      display: {
        showGrid: true,
        showFilled: true,
        showPerimeter: true,
      },
    },
  },

  {
    kind: "template",
    id: "cm1_perimetre_polygone_tpl_001_cotes_donnes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_polygone",
    difficulty: 2,
    theme: "neutral",
    hint: "Additionne toutes les longueurs du contour.",
    tags: ["cm1", "perimetre", "polygone", "cotes_donnes", "template"],
    generate: () => {
      const n = randomChoice([4, 5, 6]);
      const sides = Array.from({ length: n }, () => randomInt(2, 8));
      const p = sides.reduce((sum, side) => sum + side, 0);

      return {
        text:
          `Un polygone a pour côtés ${sides.map((s) => `${s} cm`).join(", ")}. ` +
          `Calcule son périmètre.`,
        format: "short",
        expected: [String(p), `${p} cm`, `${p}cm`],
        comparator: "number_equal",
        explanation:
          "Le périmètre d’un polygone est la somme des longueurs de tous ses côtés. " +
          `On additionne donc : ${sides.join(" + ")} = ${p}. ` +
          `Le périmètre est ${p} cm.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_perimetre_polygone_tpl_002_cotes_donnes_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_polygone",
    difficulty: 2,
    theme: "neutral",
    hint: "Un polygone peut avoir plus de 4 côtés. Il faut tous les additionner.",
    tags: ["cm1", "perimetre", "polygone", "qcm", "template"],
    generate: () => {
      const sides = [
        randomInt(2, 7),
        randomInt(2, 7),
        randomInt(2, 7),
        randomInt(2, 7),
        randomInt(2, 7),
      ];
      const p = sides.reduce((sum, side) => sum + side, 0);
      const wrongOneMissing = p - sides[sides.length - 1];
      const wrongProduct = sides[0] * sides[1];

      return {
        text:
          `Un polygone a pour côtés ${sides.map((s) => `${s} cm`).join(", ")}. ` +
          `Quel est son périmètre ?`,
        format: "qcm",
        choices: makeChoices(`${p} cm`, [
          `${wrongOneMissing} cm`,
          `${wrongProduct} cm`,
          `${p + 2} cm`,
        ]),
        expected: [`${p} cm`],
        comparator: "mcq_exact",
        explanation:
          "Pour calculer le périmètre, il ne faut oublier aucun côté. " +
          `On additionne toutes les longueurs : ${sides.join(" + ")} = ${p}. ` +
          `La bonne réponse est ${p} cm.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_perimetre_polygone_tpl_003_polygone_regulier",
    niveau: "cm1",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_polygone",
    difficulty: 2,
    theme: "neutral",
    hint: "Si tous les côtés sont égaux, tu peux multiplier.",
    tags: ["cm1", "perimetre", "polygone", "regulier", "template"],
    generate: () => {
      const nbCotes = randomChoice([5, 6, 8]);
      const cote = randomInt(2, 9);
      const p = nbCotes * cote;

      return {
        text:
          `Un polygone a ${nbCotes} côtés. Chaque côté mesure ${cote} cm. ` +
          `Calcule son périmètre.`,
        format: "short",
        expected: [String(p), `${p} cm`, `${p}cm`],
        comparator: "number_equal",
        explanation:
          "Tous les côtés ont la même longueur. " +
          `Au lieu d’écrire ${cote} plusieurs fois, on peut multiplier. ` +
          `${nbCotes} × ${cote} = ${p}. ` +
          `Le périmètre est ${p} cm.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_perimetre_polygone_tpl_004_figure_libre_simple",
    niveau: "cm1",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_polygone",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte les petits côtés qui sont sur le contour extérieur.",
    tags: ["cm1", "perimetre", "polygone", "figure_libre", "quadrillage", "template", "canvas"],
    generate: () => {
      const shapes = [
        {
          filledCells: [
            [1, 1],
            [1, 2],
            [2, 1],
            [2, 2],
          ] as Array<[number, number]>,
          perimeter: 8,
          label: "un carré de 2 cases sur 2",
        },
        {
          filledCells: [
            [1, 1],
            [1, 2],
            [1, 3],
          ] as Array<[number, number]>,
          perimeter: 8,
          label: "une barre de 3 cases",
        },
        {
          filledCells: [
            [1, 1],
            [2, 1],
            [3, 1],
          ] as Array<[number, number]>,
          perimeter: 8,
          label: "une colonne de 3 cases",
        },
        {
          filledCells: [
            [1, 1],
            [1, 2],
          ] as Array<[number, number]>,
          perimeter: 6,
          label: "deux cases collées",
        },
      ];

      const shape = randomChoice(shapes);

      return {
        text: "Observe la figure sur quadrillage. Quel est son périmètre en unités ?",
        format: "short",
        expected: [String(shape.perimeter)],
        comparator: "number_equal",
        explanation:
          "On compte uniquement les côtés qui sont sur le contour extérieur. " +
          `La figure représente ${shape.label}. ` +
          `Son contour mesure ${shape.perimeter} unités. ` +
          `Le périmètre est donc ${shape.perimeter} unités.`,
        canvas: {
          kind: "figure_libre",
          grid: {
            rows: 5,
            cols: 6,
            filledCells: shape.filledCells,
          },
          display: {
            showGrid: true,
            showFilled: true,
            showPerimeter: true,
          },
        },
      };
    },
  },

  {
    kind: "template",
    id: "cm1_perimetre_polygone_tpl_005_figure_en_l",
    niveau: "cm1",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_polygone",
    difficulty: 3,
    theme: "neutral",
    hint: "Les côtés collés entre deux cases ne comptent pas : ils sont à l’intérieur.",
    tags: ["cm1", "perimetre", "polygone", "figure_libre", "figure_L", "template", "canvas"],
    generate: () => {
      const shapes = [
        {
          filledCells: [
            [1, 1],
            [1, 2],
            [2, 1],
          ] as Array<[number, number]>,
          perimeter: 8,
          explanationShape: "une petite figure en L de 3 cases",
        },
        {
          filledCells: [
            [1, 1],
            [1, 2],
            [2, 1],
            [3, 1],
          ] as Array<[number, number]>,
          perimeter: 10,
          explanationShape: "une figure en L de 4 cases",
        },
        {
          filledCells: [
            [1, 1],
            [1, 2],
            [2, 1],
            [2, 2],
            [3, 1],
          ] as Array<[number, number]>,
          perimeter: 10,
          explanationShape: "une figure composée de 5 cases",
        },
        {
          filledCells: [
            [1, 1],
            [1, 2],
            [1, 3],
            [2, 1],
          ] as Array<[number, number]>,
          perimeter: 10,
          explanationShape: "une figure en angle de 4 cases",
        },
      ];

      const shape = randomChoice(shapes);

      return {
        text: "Observe la figure sur quadrillage. Quel est son périmètre en unités ?",
        format: "qcm",
        choices: makeChoices(String(shape.perimeter), [
          String(shape.perimeter - 2),
          String(shape.perimeter + 2),
          String(shape.filledCells.length * 4),
        ]),
        expected: [String(shape.perimeter)],
        comparator: "mcq_exact",
        explanation:
          "Le périmètre est le contour extérieur de la figure. " +
          "Les côtés collés entre deux cases ne se voient pas à l’extérieur : on ne les compte pas. " +
          `Ici, en suivant le contour de ${shape.explanationShape}, on obtient ${shape.perimeter} unités.`,
        canvas: {
          kind: "figure_libre",
          grid: {
            rows: 6,
            cols: 6,
            filledCells: shape.filledCells,
          },
          display: {
            showGrid: true,
            showFilled: true,
            showPerimeter: true,
          },
        },
      };
    },
  },

  {
    kind: "template",
    id: "cm1_perimetre_polygone_tpl_006_erreur_cotes_interieurs",
    niveau: "cm1",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_polygone",
    difficulty: 3,
    theme: "neutral",
    hint: "Le périmètre ne compte que le contour extérieur.",
    tags: ["cm1", "perimetre", "polygone", "erreur", "cotes_interieurs", "template"],
    generate: () => {
      const cases = randomChoice([
        {
          description: "deux cases collées",
          perimeter: 6,
        },
        {
          description: "trois cases alignées",
          perimeter: 8,
        },
        {
          description: "quatre cases formant un carré de 2 sur 2",
          perimeter: 8,
        },
      ]);

      return {
        text:
          `Sur une figure composée de ${cases.description}, un élève compte aussi les côtés collés entre les cases. ` +
          `A-t-il raison ?`,
        format: "qcm",
        choices: ["non", "oui"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation:
          "L’élève n’a pas raison. " +
          "Le périmètre correspond seulement au contour extérieur. " +
          "Les côtés collés entre deux cases sont à l’intérieur de la figure, donc on ne les compte pas.",
      };
    },
  },

  {
    kind: "template",
    id: "cm1_perimetre_polygone_tpl_007_open_expliquer_quadrillage",
    niveau: "cm1",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_polygone",
    difficulty: 3,
    theme: "neutral",
    hint: "Explique qu’on suit le contour extérieur.",
    tags: ["cm1", "perimetre", "polygone", "figure_libre", "open", "template", "canvas"],
    generate: () => {
      const shape = randomChoice([
        {
          filledCells: [
            [1, 1],
            [1, 2],
            [2, 1],
          ] as Array<[number, number]>,
          perimeter: 8,
          label: "une figure de 3 cases",
        },
        {
          filledCells: [
            [1, 1],
            [1, 2],
            [2, 1],
            [2, 2],
          ] as Array<[number, number]>,
          perimeter: 8,
          label: "un carré de 4 cases",
        },
        {
          filledCells: [
            [1, 1],
            [1, 2],
            [1, 3],
          ] as Array<[number, number]>,
          perimeter: 8,
          label: "une barre de 3 cases",
        },
      ]);

      return {
        text:
          `Observe la figure sur quadrillage. Son périmètre est ${shape.perimeter} unités. ` +
          `Explique comment on peut le vérifier.`,
        format: "open",
        expected: ["contour", "extérieur", "côtés"],
        comparator: "contains_keyword",
        explanation:
          "Réponse possible : on suit seulement le contour extérieur de la figure. " +
          "Chaque petit côté extérieur compte pour 1 unité. " +
          `En faisant le tour de ${shape.label}, on compte ${shape.perimeter} unités.`,
        canvas: {
          kind: "figure_libre",
          grid: {
            rows: 5,
            cols: 6,
            filledCells: shape.filledCells,
          },
          display: {
            showGrid: true,
            showFilled: true,
            showPerimeter: true,
          },
        },
      };
    },
  },
    // ============================================================
  // PERIMETRE_DEFI
  // Résoudre un défi de périmètre
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_perimetre_defi_fixed_001_erreur_aire_rectangle",
    niveau: "cm1",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Un rectangle mesure 8 cm de long et 3 cm de large. Un élève dit : “Son périmètre est 24 cm car 8 × 3 = 24.” A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "8 × 3 donne l’aire du rectangle, pas son périmètre.",
    explanation:
      "L’élève confond le périmètre et l’aire. " +
      "Le périmètre mesure le contour de la figure. " +
      "Pour un rectangle, on additionne deux longueurs et deux largeurs : 8 + 3 + 8 + 3 = 22. " +
      "Le périmètre est donc 22 cm, pas 24 cm.",
    tags: ["cm1", "perimetre", "defi", "erreur", "aire", "rectangle", "qcm"],
  },

  {
    kind: "template",
    id: "cm1_perimetre_defi_tpl_001_cloture_reunion",
    niveau: "cm1",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_defi",
    difficulty: 3,
    theme: "reunion",
    hint: "Pour faire le tour d’un terrain, on calcule le périmètre.",
    tags: ["cm1", "perimetre", "defi", "reunion", "cloture", "rectangle", "template"],
    generate: () => {
      const longueur = randomInt(6, 15);
      const largeur = randomInt(3, 9);
      const p = 2 * (longueur + largeur);

      const lieu = randomChoice([
        "à Saint-Pierre",
        "près du Tampon",
        "à Saint-Joseph",
        "près de l’Étang-Salé",
        "dans les hauts de La Réunion",
      ]);

      return {
        text:
          `Un petit terrain rectangulaire ${lieu} mesure ${longueur} m de long et ${largeur} m de large. ` +
          `Quelle longueur de grillage faut-il pour faire tout le tour ?`,
        format: "short",
        expected: [String(p), `${p} m`, `${p}m`],
        comparator: "number_equal",
        explanation:
          "Le grillage doit suivre tout le contour du terrain. " +
          "On cherche donc le périmètre du rectangle. " +
          `Le terrain a deux longueurs de ${longueur} m et deux largeurs de ${largeur} m. ` +
          `${longueur} + ${largeur} + ${longueur} + ${largeur} = ${p}. ` +
          `Il faut ${p} m de grillage.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_perimetre_defi_tpl_002_ruban_carre",
    niveau: "cm1",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Le ruban fait le tour du carré.",
    tags: ["cm1", "perimetre", "defi", "ruban", "carre", "template"],
    generate: () => {
      const cote = randomInt(4, 12);
      const p = 4 * cote;

      return {
        text:
          `On colle un ruban autour d’un cadre carré. Chaque côté du cadre mesure ${cote} cm. ` +
          `Quelle longueur de ruban faut-il ?`,
        format: "short",
        expected: [String(p), `${p} cm`, `${p}cm`],
        comparator: "number_equal",
        explanation:
          "Le ruban fait le tour du carré : on cherche donc le périmètre. " +
          "Un carré a quatre côtés égaux. " +
          `${cote} + ${cote} + ${cote} + ${cote} = ${p}. ` +
          `Il faut ${p} cm de ruban.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_perimetre_defi_tpl_003_carre_inverse_simple",
    niveau: "cm1",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Un carré a 4 côtés égaux : partage le périmètre en 4.",
    tags: ["cm1", "perimetre", "defi", "carre", "inverse", "template"],
    generate: () => {
      const cote = randomInt(3, 10);
      const p = 4 * cote;

      return {
        text: `Un carré a un périmètre de ${p} cm. Combien mesure un côté ?`,
        format: "short",
        expected: [String(cote), `${cote} cm`, `${cote}cm`],
        comparator: "number_equal",
        explanation:
          "Dans un carré, les quatre côtés sont égaux. " +
          `Le périmètre total est ${p} cm. ` +
          `Pour retrouver un côté, on partage ${p} en 4 parts égales : ${p} ÷ 4 = ${cote}. ` +
          `Un côté mesure ${cote} cm.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_perimetre_defi_tpl_004_meme_perimetre",
    niveau: "cm1",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux formes différentes peuvent avoir un contour de même longueur.",
    tags: ["cm1", "perimetre", "defi", "raisonnement", "meme_perimetre", "template"],
    generate: () => {
      const p = randomChoice([12, 16, 20, 24]);

      return {
        text:
          `Deux figures différentes peuvent-elles avoir toutes les deux un périmètre de ${p} cm ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["oui"],
        comparator: "mcq_exact",
        explanation:
          "Oui, c’est possible. " +
          "Le périmètre indique seulement la longueur totale du contour. " +
          "Deux figures peuvent avoir des formes différentes mais le même total quand on additionne leurs côtés. " +
          `Elles peuvent donc toutes les deux avoir un périmètre de ${p} cm.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_perimetre_defi_tpl_005_figure_libre_quadrillage",
    niveau: "cm1",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Compte uniquement les côtés du contour extérieur.",
    tags: ["cm1", "perimetre", "defi", "figure_libre", "quadrillage", "template", "canvas"],
    generate: () => {
      const shapes = [
        {
          filledCells: [
            [1, 1],
            [1, 2],
            [2, 1],
          ] as Array<[number, number]>,
          perimeter: 8,
          wrongInterior: 12,
          label: "une petite figure en L",
        },
        {
          filledCells: [
            [1, 1],
            [1, 2],
            [2, 1],
            [2, 2],
            [3, 1],
          ] as Array<[number, number]>,
          perimeter: 10,
          wrongInterior: 20,
          label: "une figure de 5 cases",
        },
        {
          filledCells: [
            [1, 1],
            [1, 2],
            [1, 3],
            [2, 1],
          ] as Array<[number, number]>,
          perimeter: 10,
          wrongInterior: 16,
          label: "une figure en angle",
        },
        {
          filledCells: [
            [1, 1],
            [1, 2],
            [1, 3],
            [2, 2],
          ] as Array<[number, number]>,
          perimeter: 10,
          wrongInterior: 16,
          label: "une figure en T",
        },
      ];

      const shape = randomChoice(shapes);

      return {
        text: "Observe la figure sur quadrillage. Quel est son périmètre en unités ?",
        format: "qcm",
        choices: makeChoices(String(shape.perimeter), [
          String(shape.perimeter - 2),
          String(shape.perimeter + 2),
          String(shape.wrongInterior),
        ]),
        expected: [String(shape.perimeter)],
        comparator: "mcq_exact",
        explanation:
          "Le périmètre correspond seulement au contour extérieur. " +
          "Les côtés collés entre deux cases sont à l’intérieur : on ne les compte pas. " +
          `En suivant le tour de ${shape.label}, on obtient ${shape.perimeter} unités.`,
        canvas: {
          kind: "figure_libre",
          grid: {
            rows: 6,
            cols: 6,
            filledCells: shape.filledCells,
          },
          display: {
            showGrid: true,
            showFilled: true,
            showPerimeter: true,
          },
        },
      };
    },
  },

  {
    kind: "template",
    id: "cm1_perimetre_defi_tpl_006_rectangle_cote_manquant",
    niveau: "cm1",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Le périmètre contient deux longueurs et deux largeurs.",
    tags: ["cm1", "perimetre", "defi", "rectangle", "cote_manquant", "template"],
    generate: () => {
      const longueur = randomInt(5, 10);
      const largeur = randomInt(2, 7);
      const p = 2 * (longueur + largeur);

      return {
        text:
          `Un rectangle a un périmètre de ${p} cm. Sa longueur mesure ${longueur} cm. ` +
          `Quelle est sa largeur ?`,
        format: "short",
        expected: [String(largeur), `${largeur} cm`, `${largeur}cm`],
        comparator: "number_equal",
        explanation:
          "Dans un rectangle, il y a deux longueurs et deux largeurs. " +
          `Les deux longueurs mesurent déjà ${longueur} + ${longueur} = ${2 * longueur} cm. ` +
          `Il reste ${p} - ${2 * longueur} = ${2 * largeur} cm pour les deux largeurs. ` +
          `Une largeur mesure donc ${2 * largeur} ÷ 2 = ${largeur} cm.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_perimetre_defi_tpl_007_erreur_oublier_cote",
    niveau: "cm1",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Le périmètre demande de faire tout le tour de la figure.",
    tags: ["cm1", "perimetre", "defi", "erreur", "oublier_cote", "template"],
    generate: () => {
      const a = randomInt(3, 8);
      const b = randomInt(3, 8);
      const c = randomInt(3, 8);
      const wrong = a + b;
      const p = a + b + c;

      return {
        text:
          `Un triangle a pour côtés ${a} cm, ${b} cm et ${c} cm. ` +
          `Un élève répond ${wrong} cm car il a additionné seulement deux côtés. A-t-il raison ?`,
        format: "qcm",
        choices: ["non", "oui"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation:
          "L’élève n’a pas fait tout le tour du triangle. " +
          "Un triangle a trois côtés. " +
          `Il fallait additionner ${a} + ${b} + ${c} = ${p}. ` +
          `Le bon périmètre est ${p} cm.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_perimetre_defi_tpl_008_open_strategie",
    niveau: "cm1",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Explique qu’il faut suivre le contour et additionner les côtés.",
    tags: ["cm1", "perimetre", "defi", "open", "strategie", "template"],
    generate: () => {
      const figure = randomChoice([
        "un triangle",
        "un rectangle",
        "un polygone",
        "une figure sur quadrillage",
      ]);

      return {
        text: `Explique une stratégie pour calculer le périmètre de ${figure}.`,
        format: "open",
        expected: ["contour", "additionner", "côtés"],
        comparator: "contains_keyword",
        explanation:
          "Réponse possible : pour calculer un périmètre, je suis le contour extérieur de la figure. " +
          "Je repère tous les côtés qui font le tour, puis j’additionne leurs longueurs. " +
          "Il ne faut pas oublier de côté et il ne faut pas compter les côtés intérieurs.",
      };
    },
  },

  {
    kind: "template",
    id: "cm1_perimetre_defi_tpl_009_open_corriger_aire",
    niveau: "cm1",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Explique la différence entre le contour et la surface intérieure.",
    tags: ["cm1", "perimetre", "defi", "open", "erreur", "aire", "template"],
    generate: () => {
      const longueur = randomInt(5, 10);
      const largeur = randomInt(2, 6);
      const airePiege = longueur * largeur;
      const p = 2 * (longueur + largeur);

      return {
        text:
          `Un élève dit : “Le périmètre du rectangle de ${longueur} cm sur ${largeur} cm est ${airePiege} cm, ` +
          `car ${longueur} × ${largeur} = ${airePiege}.” Corrige son erreur.`,
        format: "open",
        expected: ["périmètre", "contour", "aire"],
        comparator: "contains_keyword",
        explanation:
          "Réponse possible : l’élève calcule l’aire, pas le périmètre. " +
          "Le périmètre mesure le contour du rectangle. " +
          `Il faut additionner les côtés : ${longueur} + ${largeur} + ${longueur} + ${largeur} = ${p}. ` +
          `Le périmètre est donc ${p} cm.`,
      };
    },
  },

  // ============================================================
  // TOP-UP — PERIMETRE_COMPRENDRE
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_perimetre_comprendre_fixed_002_addition_cotes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Pour calculer le périmètre d’une figure, on additionne...",
    format: "qcm",
    choices: [
      "les longueurs de tous les côtés",
      "seulement deux côtés",
      "la longueur et la largeur multipliées",
      "le nombre de sommets",
    ],
    expected: ["les longueurs de tous les côtés"],
    comparator: "mcq_exact",
    hint: "Le périmètre fait le tour complet de la figure.",
    explanation: exp(
      "Le périmètre est la longueur du contour d’une figure.",
      "On fait le tour de la figure en additionnant chaque côté.",
      "On additionne donc toutes les longueurs des côtés.",
      "Pour le périmètre, on additionne les longueurs de tous les côtés."
    ),
    tags: ["cm1", "perimetre", "comprendre", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_perimetre_comprendre_fixed_003_unite",
    niveau: "cm1",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "Dans quelle unité exprime-t-on un périmètre ?",
    format: "qcm",
    choices: [
      "en centimètres (cm)",
      "en centimètres carrés (cm²)",
      "en kilogrammes (kg)",
      "en litres (L)",
    ],
    expected: ["en centimètres (cm)"],
    comparator: "mcq_exact",
    hint: "Un périmètre est une longueur.",
    explanation: exp(
      "Le périmètre est une longueur : celle du contour.",
      "On choisit une unité de longueur.",
      "Le cm² mesure une aire, le kg une masse et le litre une contenance.",
      "Un périmètre s’exprime en unités de longueur, comme le centimètre."
    ),
    tags: ["cm1", "perimetre", "comprendre", "unite", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_perimetre_comprendre_fixed_004_cloture",
    niveau: "cm1",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "On veut poser une clôture tout autour d’un jardin. Quelle grandeur faut-il calculer ?",
    format: "qcm",
    choices: ["le périmètre du jardin", "l’aire du jardin", "la masse du jardin", "le volume du jardin"],
    expected: ["le périmètre du jardin"],
    comparator: "mcq_exact",
    hint: "La clôture fait le tour du jardin.",
    explanation: exp(
      "Le périmètre est la longueur du contour d’une figure.",
      "On regarde ce que mesure la clôture : le tour du jardin.",
      "La clôture suit tout le contour du jardin.",
      "Il faut donc calculer le périmètre du jardin."
    ),
    tags: ["cm1", "perimetre", "comprendre", "cloture", "qcm"],
  },

  // ============================================================
  // TOP-UP — PERIMETRE_TRIANGLE
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_perimetre_triangle_fixed_002_quelconque",
    niveau: "cm1",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_triangle",
    difficulty: 2,
    theme: "neutral",
    text: "Un triangle a des côtés de 7 cm, 8 cm et 10 cm. Quel est son périmètre ?",
    format: "short",
    expected: ["25", "25 cm", "25cm"],
    comparator: "number_equal",
    hint: "Additionne les trois côtés.",
    explanation:
      "Le périmètre d’un triangle est la longueur de son contour. " +
      "On additionne les trois côtés. " +
      "7 + 8 + 10 = 25. Le périmètre est donc 25 cm.",
    tags: ["cm1", "perimetre", "triangle", "short"],
  },

  {
    kind: "fixed",
    id: "cm1_perimetre_triangle_fixed_003_equilateral",
    niveau: "cm1",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_triangle",
    difficulty: 2,
    theme: "neutral",
    text: "Un triangle équilatéral a ses trois côtés égaux à 6 cm. Quel est son périmètre ?",
    format: "short",
    expected: ["18", "18 cm", "18cm"],
    comparator: "number_equal",
    hint: "Les trois côtés sont égaux : tu peux additionner ou multiplier par 3.",
    explanation:
      "Un triangle équilatéral a ses trois côtés de même longueur. " +
      "On additionne les trois côtés, ou on multiplie un côté par 3. " +
      "6 + 6 + 6 = 18, ou 3 × 6 = 18. Le périmètre est donc 18 cm.",
    tags: ["cm1", "perimetre", "triangle", "equilateral", "short"],
  },

  // ============================================================
  // TOP-UP — PERIMETRE_POLYGONE
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_perimetre_polygone_fixed_002_pentagone_regulier",
    niveau: "cm1",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_polygone",
    difficulty: 2,
    theme: "neutral",
    text: "Un pentagone régulier a 5 côtés de 4 cm chacun. Quel est son périmètre ?",
    format: "short",
    expected: ["20", "20 cm", "20cm"],
    comparator: "number_equal",
    hint: "Un pentagone a 5 côtés. Multiplie 5 par 4.",
    explanation:
      "Le périmètre d’un polygone est la longueur de son contour. " +
      "Un pentagone régulier a 5 côtés égaux, donc on multiplie un côté par 5. " +
      "5 × 4 = 20. Le périmètre est donc 20 cm.",
    tags: ["cm1", "perimetre", "polygone", "regulier", "short"],
  },

  {
    kind: "fixed",
    id: "cm1_perimetre_polygone_fixed_003_cotes_donnes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "perimetre",
    microId: "perimetre_polygone",
    difficulty: 2,
    theme: "neutral",
    text: "Un polygone a des côtés de 3 cm, 4 cm, 5 cm et 6 cm. Quel est son périmètre ?",
    format: "short",
    expected: ["18", "18 cm", "18cm"],
    comparator: "number_equal",
    hint: "Additionne toutes les longueurs des côtés.",
    explanation:
      "Le périmètre est la longueur du contour. " +
      "On additionne tous les côtés. " +
      "3 + 4 + 5 + 6 = 18. Le périmètre est donc 18 cm.",
    tags: ["cm1", "perimetre", "polygone", "short"],
  },
];
