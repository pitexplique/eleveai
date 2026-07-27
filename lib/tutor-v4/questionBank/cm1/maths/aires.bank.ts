// lib/tutor-v4/question-banks/maths/cm1/aires.bank.ts

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
  observation: string,
  conclusion: string
) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nObservation / calcul : ${observation}\n\nConclusion : ${conclusion}`;
}

export const airesBank: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "cm1_aire_unite_fixed_g1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_unite",
    difficulty: 1,
    theme: "neutral",
    text: "Une figure recouvre 6 carreaux identiques. Quelle est son aire ?",
    format: "qcm",
    choices: ["6 carreaux unités","6 cm","3 carreaux unités","12 carreaux unités"],
    expected: ["6 carreaux unités"],
    comparator: "mcq_exact",
    hint: "Chaque carreau rempli vaut 1 unité d'aire.",
    explanation: "On compte les carreaux remplis : 6 carreaux, donc 6 carreaux unités.",
    tags: ["cm1","aire","aire_unite","guide","qcm"],
  },
  {
    kind: "fixed",
    id: "cm1_aire_composer_fixed_g1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_composer",
    difficulty: 3,
    theme: "neutral",
    text: "Une figure est faite de deux parties : une de 5 carreaux et une de 3 carreaux. Quelle est son aire totale ?",
    format: "qcm",
    choices: ["8 carreaux unités","15 carreaux unités","2 carreaux unités","53 carreaux unités"],
    expected: ["8 carreaux unités"],
    comparator: "mcq_exact",
    hint: "Additionne l'aire des deux parties.",
    explanation: "5 + 3 = 8 carreaux unités.",
    tags: ["cm1","aire","aire_composer","guide","qcm"],
  },

  // ============================================================
  // AIRE_COMPRENDRE
  // Comprendre ce qu’est une aire
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_aire_comprendre_fixed_001_definition",
    niveau: "cm1",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "L’aire d’une figure mesure...",
    format: "qcm",
    choices: [
      "la surface à l’intérieur de la figure",
      "le contour de la figure",
      "la masse de la figure",
      "la durée de la figure",
    ],
    expected: ["la surface à l’intérieur de la figure"],
    comparator: "mcq_exact",
    hint: "L’aire parle de la place occupée à l’intérieur.",
    explanation: expSimple(
      "L’aire mesure la surface à l’intérieur d’une figure. " +
        "Le contour de la figure correspond au périmètre. " +
        "Il faut donc bien distinguer l’intérieur et le tour."
    ),
    tags: ["cm1", "aire", "comprendre", "definition", "qcm"],
  },

  {
    kind: "template",
    id: "cm1_aire_comprendre_tpl_001_surface_ou_contour",
    niveau: "cm1",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_comprendre",
    difficulty: 1,
    theme: "neutral",
    hint: "L’aire mesure la surface. Le périmètre mesure le contour.",
    tags: ["cm1", "aire", "comprendre", "surface", "contour", "template"],
    generate: () => {
      const situation = randomChoice([
        {
          text: "On veut connaître la place occupée par une figure sur une feuille. Que cherche-t-on ?",
          correct: "son aire",
          explanation:
            "La place occupée par une figure correspond à sa surface. On cherche donc son aire.",
        },
        {
          text: "On veut connaître le tour d’une figure. Que cherche-t-on ?",
          correct: "son périmètre",
          explanation:
            "Le tour d’une figure correspond à son contour. On cherche donc son périmètre, pas son aire.",
        },
        {
          text: "On veut savoir quelle surface recouvre un tapis. Que cherche-t-on ?",
          correct: "son aire",
          explanation:
            "Un tapis recouvre une surface. Quand on mesure une surface, on parle d’aire.",
        },
        {
          text: "On veut savoir quelle longueur de ruban entoure une figure. Que cherche-t-on ?",
          correct: "son périmètre",
          explanation:
            "Le ruban entoure la figure : il suit le contour. On cherche donc le périmètre.",
        },
      ]);

      return {
        text: situation.text,
        format: "qcm",
        choices: makeChoices(situation.correct, [
          "son aire",
          "son périmètre",
          "sa masse",
          "sa contenance",
        ]),
        expected: [situation.correct],
        comparator: "mcq_exact",
        explanation: situation.explanation,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_aire_comprendre_tpl_002_unite_carree",
    niveau: "cm1",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_comprendre",
    difficulty: 1,
    theme: "neutral",
    hint: "Une aire se mesure avec une unité carrée : cm², m²...",
    tags: ["cm1", "aire", "comprendre", "unite", "template"],
    generate: () => {
      const item = randomChoice([
        {
          correct: "cm²",
          wrongs: ["cm", "kg", "L"],
          explanation:
            "Le cm² est une unité carrée. Elle sert à mesurer une surface.",
        },
        {
          correct: "m²",
          wrongs: ["m", "min", "kg"],
          explanation:
            "Le m² est une unité carrée. Elle sert à mesurer une surface, par exemple celle d’une pièce.",
        },
        {
          correct: "dm²",
          wrongs: ["dm", "mL", "g"],
          explanation:
            "Le dm² est une unité carrée. Elle peut servir à mesurer une aire.",
        },
      ]);

      return {
        text: "Quelle unité peut convenir pour exprimer une aire ?",
        format: "qcm",
        choices: makeChoices(item.correct, item.wrongs),
        expected: [item.correct],
        comparator: "mcq_exact",
        explanation:
          "Une aire mesure une surface. " +
          "Pour mesurer une surface, on utilise une unité carrée. " +
          item.explanation,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_aire_comprendre_tpl_003_ecriture_aire",
    niveau: "cm1",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_comprendre",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche l’écriture avec une unité carrée.",
    tags: ["cm1", "aire", "comprendre", "ecriture", "template"],
    generate: () => {
      const number = randomChoice([6, 8, 12, 15, 20, 24]);
      const unit = randomChoice(["cm²", "m²", "dm²"]);
      const correct = `${number} ${unit}`;

      return {
        text: "Quelle écriture peut correspondre à une aire ?",
        format: "qcm",
        choices: makeChoices(correct, [
          `${number} cm`,
          `${number} kg`,
          `${number} L`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Une aire s’exprime avec une unité carrée. " +
          `${correct} peut donc correspondre à une aire. ` +
          "Une écriture en cm ou en m correspond plutôt à une longueur.",
      };
    },
  },

  {
    kind: "template",
    id: "cm1_aire_comprendre_tpl_004_reunion_surface",
    niveau: "cm1",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_comprendre",
    difficulty: 1,
    theme: "reunion",
    hint: "Une surface correspond à une aire.",
    tags: ["cm1", "aire", "comprendre", "reunion", "surface", "template"],
    generate: () => {
      const lieu = randomChoice([
        "un petit potager à Saint-Pierre",
        "un tapis dans une salle de classe",
        "une parcelle de jardin au Tampon",
        "une zone dessinée sur une carte de La Réunion",
      ]);

      return {
        text: `Pour mesurer la surface de ${lieu}, on parle plutôt de...`,
        format: "qcm",
        choices: makeChoices("l’aire", [
          "le périmètre",
          "la masse",
          "la durée",
        ]),
        expected: ["l’aire"],
        comparator: "mcq_exact",
        explanation:
          `On parle de la surface de ${lieu}. ` +
          "Une surface se mesure avec une aire. " +
          "Le périmètre servirait à mesurer le tour.",
      };
    },
  },

  {
    kind: "template",
    id: "cm1_aire_comprendre_tpl_005_confusion_perimetre",
    niveau: "cm1",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_comprendre",
    difficulty: 2,
    theme: "neutral",
    hint: "Le tour, c’est le périmètre. La surface intérieure, c’est l’aire.",
    tags: ["cm1", "aire", "comprendre", "confusion", "perimetre", "template"],
    generate: () => {
      const figure = randomChoice(["rectangle", "carré", "triangle", "jardin rectangulaire"]);
      const phrase = randomChoice([
        `Un élève dit : “L’aire d’un ${figure}, c’est son contour.” A-t-il raison ?`,
        `Un élève dit : “Pour trouver l’aire d’un ${figure}, je fais le tour de la figure.” A-t-il raison ?`,
        `Un élève dit : “L’aire et le périmètre, c’est pareil.” A-t-il raison ?`,
      ]);

      return {
        text: phrase,
        format: "qcm",
        choices: ["non", "oui"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation:
          "L’élève confond deux grandeurs. " +
          "L’aire mesure la surface intérieure. " +
          "Le périmètre mesure le contour. " +
          "Ce n’est donc pas la même chose.",
      };
    },
  },

  {
    kind: "template",
    id: "cm1_aire_comprendre_tpl_006_plus_grande_surface",
    niveau: "cm1",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_comprendre",
    difficulty: 2,
    theme: "neutral",
    hint: "Une figure qui occupe plus de surface a une aire plus grande.",
    tags: ["cm1", "aire", "comprendre", "comparer", "template"],
    generate: () => {
      const a = randomInt(4, 9);
      const b = randomInt(a + 1, 14);

      return {
        text:
          `La figure A occupe ${a} carreaux. La figure B occupe ${b} carreaux. ` +
          `Quelle figure a la plus grande aire ?`,
        format: "qcm",
        choices: ["la figure A", "la figure B", "elles ont la même aire"],
        expected: ["la figure B"],
        comparator: "mcq_exact",
        explanation:
          "Pour comparer les aires avec la même unité, on compare le nombre de carreaux occupés. " +
          `La figure A occupe ${a} carreaux et la figure B occupe ${b} carreaux. ` +
          `${b} est plus grand que ${a}. La figure B a donc la plus grande aire.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_aire_comprendre_tpl_007_meme_aire_intro",
    niveau: "cm1",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_comprendre",
    difficulty: 2,
    theme: "neutral",
    hint: "Deux figures peuvent avoir des formes différentes mais occuper le même nombre de carreaux.",
    tags: ["cm1", "aire", "comprendre", "meme_aire", "template"],
    generate: () => {
      const nb = randomChoice([4, 5, 6, 8]);

      return {
        text:
          `Deux figures ont des formes différentes, mais elles occupent chacune ${nb} carreaux. ` +
          `Que peut-on dire de leurs aires ?`,
        format: "qcm",
        choices: [
          "elles ont la même aire",
          "la première a forcément une plus grande aire",
          "la deuxième a forcément une plus grande aire",
          "on ne peut jamais comparer",
        ],
        expected: ["elles ont la même aire"],
        comparator: "mcq_exact",
        explanation:
          "L’aire dépend de la surface occupée, pas seulement de la forme. " +
          `Si deux figures occupent chacune ${nb} carreaux de même taille, elles ont la même aire.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_aire_comprendre_tpl_008_open_expliquer_aire",
    niveau: "cm1",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_comprendre",
    difficulty: 2,
    theme: "neutral",
    hint: "Utilise les mots surface, intérieur ou place occupée.",
    tags: ["cm1", "aire", "comprendre", "open", "expliquer", "template"],
    generate: () => {
      const figure = randomChoice([
        "un rectangle",
        "un carré",
        "un tapis",
        "un petit jardin",
        "une figure sur quadrillage",
      ]);

      return {
        text: `Explique avec tes mots ce qu’est l’aire de ${figure}.`,
        format: "open",
        expected: ["surface", "intérieur", "place"],
        comparator: "contains_keyword",
        explanation:
          "Réponse possible : l’aire mesure la surface à l’intérieur de la figure. " +
          `Pour ${figure}, on cherche la place occupée, pas seulement le contour.`,
      };
    },
  },
    // ============================================================
  // AIRE_UNITE
  // Comparer des aires avec une unité
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_aire_unite_fixed_001_compter_carreaux_modele",
    niveau: "cm1",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_unite",
    difficulty: 1,
    theme: "neutral",
    text: "Observe la figure sur quadrillage. Quelle est son aire en carreaux unités ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Compte les carreaux remplis.",
    explanation:
      "Sur un quadrillage, chaque carreau rempli peut représenter 1 unité d’aire. " +
      "Ici, la figure contient 4 carreaux remplis. " +
      "Son aire est donc 4 carreaux unités.",
    tags: ["cm1", "aire", "unite", "quadrillage", "carreaux", "canvas", "modele"],
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
      },
    },
  },

  {
    kind: "template",
    id: "cm1_aire_unite_tpl_001_compter_cases_simples",
    niveau: "cm1",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_unite",
    difficulty: 1,
    theme: "neutral",
    hint: "Chaque case remplie vaut 1 unité d’aire.",
    tags: ["cm1", "aire", "unite", "compter", "quadrillage", "template", "canvas"],
    generate: () => {
      const shapes = [
        {
          cells: [
            [1, 1],
            [1, 2],
          ] as Array<[number, number]>,
          aire: 2,
          description: "deux carreaux remplis",
        },
        {
          cells: [
            [1, 1],
            [1, 2],
            [1, 3],
          ] as Array<[number, number]>,
          aire: 3,
          description: "trois carreaux alignés",
        },
        {
          cells: [
            [1, 1],
            [1, 2],
            [2, 1],
            [2, 2],
          ] as Array<[number, number]>,
          aire: 4,
          description: "un carré de 4 carreaux",
        },
        {
          cells: [
            [1, 1],
            [1, 2],
            [1, 3],
            [2, 1],
          ] as Array<[number, number]>,
          aire: 4,
          description: "une figure de 4 carreaux",
        },
        {
          cells: [
            [1, 1],
            [1, 2],
            [2, 1],
            [2, 2],
            [3, 1],
          ] as Array<[number, number]>,
          aire: 5,
          description: "une figure de 5 carreaux",
        },
      ];

      const shape = randomChoice(shapes);

      return {
        text: "Observe la figure sur quadrillage. Quelle est son aire en carreaux unités ?",
        format: "short",
        expected: [String(shape.aire)],
        comparator: "number_equal",
        explanation:
          "Chaque carreau rempli vaut 1 unité d’aire. " +
          `La figure contient ${shape.description}. ` +
          `Son aire est donc ${shape.aire} carreaux unités.`,
        canvas: {
          kind: "figure_libre",
          grid: {
            rows: 5,
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

  {
    kind: "template",
    id: "cm1_aire_unite_tpl_002_qcm_compter_cases",
    niveau: "cm1",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_unite",
    difficulty: 1,
    theme: "neutral",
    hint: "Compte seulement les cases remplies.",
    tags: ["cm1", "aire", "unite", "qcm", "quadrillage", "template", "canvas"],
    generate: () => {
      const shapes = [
        {
          cells: [
            [1, 1],
            [1, 2],
            [2, 1],
          ] as Array<[number, number]>,
          aire: 3,
        },
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
            [2, 2],
            [2, 3],
          ] as Array<[number, number]>,
          aire: 5,
        },
        {
          cells: [
            [1, 1],
            [1, 2],
            [1, 3],
            [2, 1],
            [2, 2],
            [2, 3],
          ] as Array<[number, number]>,
          aire: 6,
        },
      ];

      const shape = randomChoice(shapes);

      return {
        text: "Quelle est l’aire de la figure en carreaux unités ?",
        format: "qcm",
        choices: makeChoices(String(shape.aire), [
          String(shape.aire + 1),
          String(Math.max(1, shape.aire - 1)),
          String(shape.aire + 2),
        ]),
        expected: [String(shape.aire)],
        comparator: "mcq_exact",
        explanation:
          "Pour trouver l’aire avec une unité, on compte les carreaux remplis. " +
          `Ici, il y a ${shape.aire} carreaux remplis. ` +
          `L’aire est donc ${shape.aire} carreaux unités.`,
        canvas: {
          kind: "figure_libre",
          grid: {
            rows: 5,
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

  {
    kind: "template",
    id: "cm1_aire_unite_tpl_003_comparer_deux_aires",
    niveau: "cm1",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_unite",
    difficulty: 2,
    theme: "neutral",
    hint: "Compare le nombre de carreaux occupés par chaque figure.",
    tags: ["cm1", "aire", "unite", "comparer", "template"],
    generate: () => {
      const aireA = randomInt(3, 8);
      const aireB = randomChoice([
        aireA + 1,
        aireA + 2,
        Math.max(1, aireA - 1),
        Math.max(1, aireA - 2),
      ]);

      const correct =
        aireA > aireB
          ? "la figure A"
          : aireB > aireA
            ? "la figure B"
            : "elles ont la même aire";

      return {
        text:
          `La figure A occupe ${aireA} carreaux. ` +
          `La figure B occupe ${aireB} carreaux. ` +
          `Quelle figure a la plus grande aire ?`,
        format: "qcm",
        choices: ["la figure A", "la figure B", "elles ont la même aire"],
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Quand les carreaux ont tous la même taille, on compare simplement leur nombre. " +
          `La figure A occupe ${aireA} carreaux et la figure B occupe ${aireB} carreaux. ` +
          `La bonne réponse est : ${correct}.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_aire_unite_tpl_004_meme_aire_formes_differentes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_unite",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde le nombre de carreaux, pas seulement la forme.",
    tags: ["cm1", "aire", "unite", "meme_aire", "formes_differentes", "template"],
    generate: () => {
      const nb = randomChoice([4, 5, 6, 8, 9]);

      return {
        text:
          `Deux figures ont des formes différentes. La figure A occupe ${nb} carreaux et la figure B occupe aussi ${nb} carreaux. ` +
          `Que peut-on dire ?`,
        format: "qcm",
        choices: [
          "elles ont la même aire",
          "la figure A a forcément une plus grande aire",
          "la figure B a forcément une plus grande aire",
          "elles ont forcément le même périmètre",
        ],
        expected: ["elles ont la même aire"],
        comparator: "mcq_exact",
        explanation:
          "Deux figures peuvent avoir des formes différentes et pourtant la même aire. " +
          `Ici, elles occupent toutes les deux ${nb} carreaux. ` +
          "Elles ont donc la même aire. Attention : cela ne veut pas dire qu’elles ont forcément le même périmètre.",
      };
    },
  },

  {
    kind: "template",
    id: "cm1_aire_unite_tpl_005_figure_libre_meme_aire",
    niveau: "cm1",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_unite",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte les carreaux remplis : la forme peut changer, mais l’aire dépend du nombre de carreaux.",
    tags: ["cm1", "aire", "unite", "figure_libre", "meme_aire", "template", "canvas"],
    generate: () => {
      const pairs = [
        {
          cells: [
            [1, 1],
            [1, 2],
            [2, 1],
            [2, 2],
          ] as Array<[number, number]>,
          aire: 4,
          description: "Cette figure occupe 4 carreaux.",
        },
        {
          cells: [
            [1, 1],
            [1, 2],
            [1, 3],
            [2, 1],
          ] as Array<[number, number]>,
          aire: 4,
          description: "Cette figure a une forme différente, mais elle occupe aussi 4 carreaux.",
        },
        {
          cells: [
            [1, 1],
            [1, 2],
            [1, 3],
            [2, 2],
            [2, 3],
          ] as Array<[number, number]>,
          aire: 5,
          description: "Cette figure occupe 5 carreaux.",
        },
        {
          cells: [
            [1, 1],
            [2, 1],
            [3, 1],
            [3, 2],
            [3, 3],
          ] as Array<[number, number]>,
          aire: 5,
          description: "Cette figure a une forme différente, mais elle occupe aussi 5 carreaux.",
        },
      ];

      const shape = randomChoice(pairs);

      return {
        text:
          "Observe la figure sur quadrillage. " +
          "Quelle est son aire en carreaux unités ?",
        format: "short",
        expected: [String(shape.aire)],
        comparator: "number_equal",
        explanation:
          `${shape.description} ` +
          `Comme chaque carreau rempli vaut 1 unité d’aire, son aire est ${shape.aire} carreaux unités.`,
        canvas: {
          kind: "figure_libre",
          grid: {
            rows: 5,
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

  {
    kind: "template",
    id: "cm1_aire_unite_tpl_006_choisir_unite_adaptee",
    niveau: "cm1",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_unite",
    difficulty: 2,
    theme: "neutral",
    hint: "Pour une petite surface, on peut utiliser des carreaux ou des cm².",
    tags: ["cm1", "aire", "unite", "choisir", "template"],
    generate: () => {
      const situation = randomChoice([
        {
          text: "On mesure la surface d’un petit rectangle dessiné sur un cahier.",
          correct: "cm²",
          explanation:
            "Pour une petite surface dessinée sur un cahier, le cm² est une unité adaptée.",
        },
        {
          text: "On mesure la surface d’une salle de classe.",
          correct: "m²",
          explanation:
            "Pour une grande surface comme une salle de classe, le m² est une unité adaptée.",
        },
        {
          text: "On mesure la surface d’une figure sur quadrillage.",
          correct: "carreaux unités",
          explanation:
            "Sur un quadrillage, on peut utiliser les carreaux comme unités d’aire.",
        },
      ]);

      return {
        text: `${situation.text} Quelle unité semble la plus adaptée ?`,
        format: "qcm",
        choices: makeChoices(situation.correct, [
          "kg",
          "L",
          "minutes",
          "cm",
        ]),
        expected: [situation.correct],
        comparator: "mcq_exact",
        explanation:
          "Pour mesurer une aire, il faut choisir une unité de surface. " +
          situation.explanation,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_aire_unite_tpl_007_reunion_surface_carree",
    niveau: "cm1",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_unite",
    difficulty: 2,
    theme: "reunion",
    hint: "Compte le nombre de carreaux nécessaires pour recouvrir la surface.",
    tags: ["cm1", "aire", "unite", "reunion", "surface", "template"],
    generate: () => {
      const carreaux = randomInt(6, 15);
      const lieu = randomChoice([
        "un petit potager à Saint-Pierre",
        "un espace de jeu dans une cour",
        "une zone dessinée sur une carte de La Réunion",
        "un tapis dans une classe",
      ]);

      return {
        text:
          `On recouvre ${lieu} avec ${carreaux} carreaux identiques. ` +
          `Quelle est son aire avec cette unité ?`,
        format: "qcm",
        choices: makeChoices(`${carreaux} carreaux unités`, [
          `${carreaux} cm`,
          `${carreaux} kg`,
          `${carreaux} minutes`,
        ]),
        expected: [`${carreaux} carreaux unités`],
        comparator: "mcq_exact",
        explanation:
          "Les carreaux identiques servent ici d’unités d’aire. " +
          `Si la surface est recouverte par ${carreaux} carreaux, son aire est ${carreaux} carreaux unités.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_aire_unite_tpl_008_open_expliquer_comparaison",
    niveau: "cm1",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_unite",
    difficulty: 3,
    theme: "neutral",
    hint: "Explique qu’on compare le nombre de carreaux occupés.",
    tags: ["cm1", "aire", "unite", "open", "comparer", "template"],
    generate: () => {
      const a = randomInt(4, 8);
      const b = randomInt(a + 1, 12);

      return {
        text:
          `La figure A occupe ${a} carreaux. La figure B occupe ${b} carreaux. ` +
          `La figure B a une plus grande aire. Explique pourquoi.`,
        format: "open",
        expected: ["carreaux", "plus", "aire"],
        comparator: "contains_keyword",
        explanation:
          "Réponse possible : les deux figures sont mesurées avec la même unité, le carreau. " +
          `La figure A occupe ${a} carreaux, alors que la figure B occupe ${b} carreaux. ` +
          `Comme ${b} est plus grand que ${a}, la figure B a une plus grande aire.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_aire_unite_tpl_009_open_meme_aire",
    niveau: "cm1",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_unite",
    difficulty: 3,
    theme: "neutral",
    hint: "Explique que deux figures peuvent avoir la même aire si elles occupent le même nombre de carreaux.",
    tags: ["cm1", "aire", "unite", "open", "meme_aire", "template"],
    generate: () => {
      const nb = randomChoice([4, 5, 6, 8]);

      return {
        text:
          `Deux figures n’ont pas la même forme, mais elles occupent chacune ${nb} carreaux. ` +
          `Explique pourquoi elles ont la même aire.`,
        format: "open",
        expected: ["carreaux", "même", "aire"],
        comparator: "contains_keyword",
        explanation:
          "Réponse possible : l’aire dépend de la surface occupée. " +
          `Même si les formes sont différentes, les deux figures occupent chacune ${nb} carreaux. ` +
          "Elles ont donc la même aire.",
      };
    },
  },
    // ============================================================
  // AIRE_CARRE_RECTANGLE
  // Calculer l’aire d’un carré ou d’un rectangle
  // Version CM1 : quadrillage → rangées/colonnes → multiplication comme raccourci
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_aire_carre_rectangle_fixed_001_rectangle_quadrillage_modele",
    niveau: "cm1",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_carre_rectangle",
    difficulty: 2,
    theme: "neutral",
    text: "Un rectangle contient 3 rangées de 4 carreaux. Quelle est son aire en carreaux unités ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Compte les carreaux ou fais 3 × 4.",
    explanation:
      "On cherche l’aire du rectangle, donc la surface occupée. " +
      "Le rectangle contient 3 rangées de 4 carreaux. " +
      "On peut compter 4 + 4 + 4, ou utiliser le raccourci 3 × 4. " +
      "3 × 4 = 12. L’aire est donc 12 carreaux unités.",
    tags: ["cm1", "aire", "rectangle", "quadrillage", "rangees", "modele"],
  },

  {
    kind: "template",
    id: "cm1_aire_carre_rectangle_tpl_001_rectangle_rangees_colonnes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_carre_rectangle",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplie le nombre de rangées par le nombre de carreaux dans chaque rangée.",
    tags: ["cm1", "aire", "rectangle", "rangees", "colonnes", "template"],
    generate: () => {
      const rangees = randomInt(2, 6);
      const colonnes = randomInt(3, 8);
      const aire = rangees * colonnes;

      return {
        text:
          `Un rectangle contient ${rangees} rangées de ${colonnes} carreaux. ` +
          `Quelle est son aire en carreaux unités ?`,
        format: "short",
        expected: [String(aire)],
        comparator: "number_equal",
        explanation:
          "L’aire correspond au nombre de carreaux qui remplissent le rectangle. " +
          `Il y a ${rangees} rangées, avec ${colonnes} carreaux dans chaque rangée. ` +
          `On peut donc calculer ${rangees} × ${colonnes} = ${aire}. ` +
          `L’aire est ${aire} carreaux unités.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_aire_carre_rectangle_tpl_002_rectangle_qcm_raccourci",
    niveau: "cm1",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_carre_rectangle",
    difficulty: 2,
    theme: "neutral",
    hint: "L’aire du rectangle correspond au nombre total de carreaux.",
    tags: ["cm1", "aire", "rectangle", "qcm", "template"],
    generate: () => {
      const rangees = randomInt(2, 5);
      const colonnes = randomInt(3, 9);
      const aire = rangees * colonnes;
      const perimetrePiege = 2 * (rangees + colonnes);

      return {
        text:
          `Un rectangle a ${rangees} rangées et ${colonnes} colonnes de carreaux. ` +
          `Quelle est son aire ?`,
        format: "qcm",
        choices: makeChoices(`${aire} carreaux unités`, [
          `${rangees + colonnes} carreaux unités`,
          `${perimetrePiege} carreaux unités`,
          `${aire + rangees} carreaux unités`,
        ]),
        expected: [`${aire} carreaux unités`],
        comparator: "mcq_exact",
        explanation:
          "Pour trouver l’aire, on cherche combien de carreaux remplissent toute la surface. " +
          `Avec ${rangees} rangées et ${colonnes} colonnes, on calcule ${rangees} × ${colonnes} = ${aire}. ` +
          `L’aire est donc ${aire} carreaux unités. ` +
          "Attention : additionner les côtés ferait penser au périmètre, pas à l’aire.",
      };
    },
  },

  {
    kind: "template",
    id: "cm1_aire_carre_rectangle_tpl_003_carre_rangees_colonnes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_carre_rectangle",
    difficulty: 2,
    theme: "neutral",
    hint: "Un carré a autant de rangées que de colonnes.",
    tags: ["cm1", "aire", "carre", "quadrillage", "template"],
    generate: () => {
      const cote = randomInt(2, 8);
      const aire = cote * cote;

      return {
        text:
          `Un carré contient ${cote} rangées de ${cote} carreaux. ` +
          `Quelle est son aire en carreaux unités ?`,
        format: "short",
        expected: [String(aire)],
        comparator: "number_equal",
        explanation:
          "Dans ce carré, toutes les rangées ont le même nombre de carreaux. " +
          `Il y a ${cote} rangées de ${cote} carreaux. ` +
          `On peut calculer ${cote} × ${cote} = ${aire}. ` +
          `L’aire du carré est ${aire} carreaux unités.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_aire_carre_rectangle_tpl_004_carre_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_carre_rectangle",
    difficulty: 2,
    theme: "neutral",
    hint: "Pour un carré de côté 5 carreaux, on compte 5 rangées de 5 carreaux.",
    tags: ["cm1", "aire", "carre", "qcm", "template"],
    generate: () => {
      const cote = randomInt(3, 8);
      const aire = cote * cote;
      const perimetrePiege = 4 * cote;

      return {
        text:
          `Un carré a ${cote} carreaux sur chaque côté. ` +
          `Quelle est son aire en carreaux unités ?`,
        format: "qcm",
        choices: makeChoices(`${aire} carreaux unités`, [
          `${perimetrePiege} carreaux unités`,
          `${cote + cote} carreaux unités`,
          `${aire + cote} carreaux unités`,
        ]),
        expected: [`${aire} carreaux unités`],
        comparator: "mcq_exact",
        explanation:
          "L’aire du carré correspond au nombre de carreaux à l’intérieur. " +
          `Il y a ${cote} rangées de ${cote} carreaux. ` +
          `Donc ${cote} × ${cote} = ${aire}. ` +
          `L’aire est ${aire} carreaux unités. ` +
          `Le nombre ${perimetrePiege} correspondrait plutôt au contour si chaque côté mesurait ${cote} unités.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_aire_carre_rectangle_tpl_005_rectangle_cm2_doux",
    niveau: "cm1",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_carre_rectangle",
    difficulty: 3,
    theme: "neutral",
    hint: "Imagine un quadrillage : longueur × largeur donne le nombre de petits carrés de 1 cm².",
    tags: ["cm1", "aire", "rectangle", "cm2", "template", "canvas"],
    generate: () => {
      const longueur = randomInt(3, 9);
      const largeur = randomInt(2, 6);
      const aire = longueur * largeur;

      return {
        text:
          `Un rectangle mesure ${longueur} cm de long et ${largeur} cm de large. ` +
          `On le recouvre avec des petits carrés de 1 cm². Quelle est son aire ?`,
        format: "short",
        expected: [String(aire), `${aire} cm²`, `${aire} cm2`, `${aire}cm²`, `${aire}cm2`],
        comparator: "number_equal",
        explanation:
          "On peut imaginer le rectangle comme un quadrillage de petits carrés de 1 cm². " +
          `Il y aurait ${largeur} rangées de ${longueur} petits carrés. ` +
          `On calcule donc ${longueur} × ${largeur} = ${aire}. ` +
          `L’aire est ${aire} cm².`,
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
    id: "cm1_aire_carre_rectangle_tpl_006_carre_cm2_doux",
    niveau: "cm1",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_carre_rectangle",
    difficulty: 3,
    theme: "neutral",
    hint: "Imagine le carré rempli de petits carrés de 1 cm².",
    tags: ["cm1", "aire", "carre", "cm2", "template", "canvas"],
    generate: () => {
      const cote = randomInt(2, 8);
      const aire = cote * cote;

      return {
        text:
          `Un carré a un côté de ${cote} cm. ` +
          `On le recouvre avec des petits carrés de 1 cm². Quelle est son aire ?`,
        format: "short",
        expected: [String(aire), `${aire} cm²`, `${aire} cm2`, `${aire}cm²`, `${aire}cm2`],
        comparator: "number_equal",
        explanation:
          "On peut voir le carré comme un quadrillage. " +
          `Il contient ${cote} rangées de ${cote} petits carrés de 1 cm². ` +
          `On calcule donc ${cote} × ${cote} = ${aire}. ` +
          `L’aire est ${aire} cm².`,
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
    id: "cm1_aire_carre_rectangle_tpl_007_erreur_perimetre_rectangle",
    niveau: "cm1",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_carre_rectangle",
    difficulty: 3,
    theme: "neutral",
    hint: "Le périmètre mesure le contour. L’aire mesure la surface.",
    tags: ["cm1", "aire", "rectangle", "erreur", "perimetre", "template"],
    generate: () => {
      const longueur = randomInt(4, 10);
      const largeur = randomInt(2, 6);
      const aire = longueur * largeur;
      const perimetre = 2 * (longueur + largeur);

      return {
        text:
          `Un rectangle mesure ${longueur} cm sur ${largeur} cm. ` +
          `Un élève répond que son aire est ${perimetre} cm² car il a fait le tour du rectangle. A-t-il raison ?`,
        format: "qcm",
        choices: ["non", "oui"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation:
          "L’élève confond aire et périmètre. " +
          "Le périmètre mesure le contour, mais l’aire mesure la surface intérieure. " +
          `Pour l’aire, on imagine le rectangle rempli de petits carrés de 1 cm². ` +
          `On calcule ${longueur} × ${largeur} = ${aire}. ` +
          `L’aire est ${aire} cm², pas ${perimetre} cm².`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_aire_carre_rectangle_tpl_008_erreur_addition",
    niveau: "cm1",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_carre_rectangle",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour trouver tous les carreaux d’un rectangle, on ne compte pas seulement longueur + largeur.",
    tags: ["cm1", "aire", "rectangle", "erreur", "addition", "template"],
    generate: () => {
      const longueur = randomInt(4, 9);
      const largeur = randomInt(2, 6);
      const aire = longueur * largeur;
      const erreur = longueur + largeur;

      return {
        text:
          `Un rectangle contient ${largeur} rangées de ${longueur} carreaux. ` +
          `Un élève répond ${erreur} carreaux car il a fait ${longueur} + ${largeur}. A-t-il raison ?`,
        format: "qcm",
        choices: ["non", "oui"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation:
          "L’élève a seulement additionné une longueur et une largeur. " +
          "Mais pour l’aire, il faut compter tous les carreaux à l’intérieur du rectangle. " +
          `Il y a ${largeur} rangées de ${longueur} carreaux. ` +
          `On calcule donc ${largeur} × ${longueur} = ${aire}. ` +
          `L’aire est ${aire} carreaux unités.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_aire_carre_rectangle_tpl_009_reunion_potager_quadrillage",
    niveau: "cm1",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_carre_rectangle",
    difficulty: 3,
    theme: "reunion",
    hint: "Imagine le potager découpé en petits carrés identiques.",
    tags: ["cm1", "aire", "rectangle", "reunion", "potager", "template"],
    generate: () => {
      const longueur = randomInt(4, 10);
      const largeur = randomInt(2, 6);
      const aire = longueur * largeur;

      const lieu = randomChoice([
        "à Saint-Pierre",
        "au Tampon",
        "à Saint-Joseph",
        "dans les hauts de La Réunion",
      ]);

      return {
        text:
          `Un petit potager rectangulaire ${lieu} est découpé en carrés de 1 m². ` +
          `Il y a ${largeur} rangées de ${longueur} carrés. Quelle est son aire ?`,
        format: "short",
        expected: [String(aire), `${aire} m²`, `${aire} m2`, `${aire}m²`, `${aire}m2`],
        comparator: "number_equal",
        explanation:
          "Chaque carré représente 1 m². " +
          `Le potager contient ${largeur} rangées de ${longueur} carrés. ` +
          `On calcule ${largeur} × ${longueur} = ${aire}. ` +
          `L’aire du potager est ${aire} m².`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_aire_carre_rectangle_tpl_010_open_expliquer_rectangle",
    niveau: "cm1",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_carre_rectangle",
    difficulty: 3,
    theme: "neutral",
    hint: "Explique avec les rangées et les colonnes de carreaux.",
    tags: ["cm1", "aire", "rectangle", "open", "expliquer", "template"],
    generate: () => {
      const rangees = randomInt(2, 5);
      const colonnes = randomInt(3, 8);
      const aire = rangees * colonnes;

      return {
        text:
          `Un rectangle contient ${rangees} rangées de ${colonnes} carreaux. ` +
          `Son aire est ${aire} carreaux unités. Explique comment on peut le trouver.`,
        format: "open",
        expected: ["rangées", "carreaux", "multiplier"],
        comparator: "contains_keyword",
        explanation:
          "Réponse possible : on compte tous les carreaux du rectangle. " +
          `Il y a ${rangees} rangées de ${colonnes} carreaux. ` +
          `On peut donc multiplier ${rangees} × ${colonnes} = ${aire}. ` +
          `L’aire est ${aire} carreaux unités.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_aire_carre_rectangle_tpl_011_open_corriger_erreur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_carre_rectangle",
    difficulty: 4,
    theme: "neutral",
    hint: "Explique la différence entre compter l’intérieur et faire le tour.",
    tags: ["cm1", "aire", "rectangle", "open", "erreur", "perimetre", "template"],
    generate: () => {
      const longueur = randomInt(4, 9);
      const largeur = randomInt(2, 6);
      const aire = longueur * largeur;
      const perimetre = 2 * (longueur + largeur);

      return {
        text:
          `Un élève dit : “L’aire du rectangle de ${longueur} cm sur ${largeur} cm est ${perimetre} cm², ` +
          `car j’ai additionné les côtés du contour.” Corrige son erreur.`,
        format: "open",
        expected: ["aire", "surface", "périmètre"],
        comparator: "contains_keyword",
        explanation:
          "Réponse possible : l’élève calcule le périmètre, pas l’aire. " +
          "Le périmètre mesure le contour, alors que l’aire mesure la surface intérieure. " +
          `Pour l’aire, on peut imaginer ${largeur} rangées de ${longueur} carrés de 1 cm². ` +
          `${longueur} × ${largeur} = ${aire}. ` +
          `L’aire est donc ${aire} cm².`,
      };
    },
  },
    // ============================================================
  // AIRE_COMPOSER
  // Calculer une aire par découpage ou assemblage
  // Version CM1 : compter, découper, additionner des parties simples
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_aire_composer_fixed_001_figure_libre_modele",
    niveau: "cm1",
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
      "Sur un quadrillage, chaque carreau rempli vaut 1 unité d’aire. " +
      "La figure contient 5 carreaux remplis. " +
      "Son aire est donc 5 carreaux unités.",
    tags: ["cm1", "aire", "composer", "figure_libre", "quadrillage", "canvas", "modele"],
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
    kind: "template",
    id: "cm1_aire_composer_tpl_001_compter_figure_composee",
    niveau: "cm1",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_composer",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte tous les carreaux remplis, même si la figure n’est pas un rectangle.",
    tags: ["cm1", "aire", "composer", "quadrillage", "compter", "template", "canvas"],
    generate: () => {
      const shapes = [
        {
          cells: [
            [1, 1],
            [1, 2],
            [2, 1],
          ] as Array<[number, number]>,
          aire: 3,
          description: "une petite figure de 3 carreaux",
        },
        {
          cells: [
            [1, 1],
            [1, 2],
            [2, 1],
            [2, 2],
            [3, 1],
          ] as Array<[number, number]>,
          aire: 5,
          description: "une figure de 5 carreaux",
        },
        {
          cells: [
            [1, 1],
            [1, 2],
            [1, 3],
            [2, 1],
            [2, 2],
          ] as Array<[number, number]>,
          aire: 5,
          description: "une figure composée de 5 carreaux",
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
          description: "une figure composée de 6 carreaux",
        },
        {
          cells: [
            [1, 1],
            [1, 2],
            [1, 3],
            [2, 2],
            [2, 3],
            [3, 3],
          ] as Array<[number, number]>,
          aire: 6,
          description: "une figure en escalier de 6 carreaux",
        },
      ];

      const shape = randomChoice(shapes);

      return {
        text: "Observe la figure composée sur quadrillage. Quelle est son aire en carreaux unités ?",
        format: "short",
        expected: [String(shape.aire)],
        comparator: "number_equal",
        explanation:
          "Même si la figure n’est pas un rectangle, son aire correspond au nombre de carreaux remplis. " +
          `Ici, c’est ${shape.description}. ` +
          `Son aire est donc ${shape.aire} carreaux unités.`,
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

  {
    kind: "template",
    id: "cm1_aire_composer_tpl_002_qcm_figure_composee",
    niveau: "cm1",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_composer",
    difficulty: 2,
    theme: "neutral",
    hint: "L’aire correspond au nombre de carreaux remplis.",
    tags: ["cm1", "aire", "composer", "qcm", "quadrillage", "template", "canvas"],
    generate: () => {
      const shapes = [
        {
          cells: [
            [1, 1],
            [1, 2],
            [2, 1],
            [3, 1],
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
          ] as Array<[number, number]>,
          aire: 5,
        },
        {
          cells: [
            [1, 1],
            [1, 2],
            [2, 1],
            [2, 2],
            [3, 1],
            [3, 2],
          ] as Array<[number, number]>,
          aire: 6,
        },
        {
          cells: [
            [1, 1],
            [1, 2],
            [1, 3],
            [2, 2],
            [3, 2],
            [3, 3],
            [3, 4],
          ] as Array<[number, number]>,
          aire: 7,
        },
      ];

      const shape = randomChoice(shapes);

      return {
        text: "Quelle est l’aire de cette figure composée ?",
        format: "qcm",
        choices: makeChoices(`${shape.aire} carreaux unités`, [
          `${shape.aire + 1} carreaux unités`,
          `${Math.max(1, shape.aire - 1)} carreaux unités`,
          `${shape.aire + 2} carreaux unités`,
        ]),
        expected: [`${shape.aire} carreaux unités`],
        comparator: "mcq_exact",
        explanation:
          "Pour trouver l’aire, on compte les carreaux remplis. " +
          `La figure contient ${shape.aire} carreaux. ` +
          `Son aire est donc ${shape.aire} carreaux unités.`,
        canvas: {
          kind: "figure_libre",
          grid: {
            rows: 6,
            cols: 7,
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

  {
    kind: "template",
    id: "cm1_aire_composer_tpl_003_addition_deux_parties",
    niveau: "cm1",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_composer",
    difficulty: 2,
    theme: "neutral",
    hint: "Additionne l’aire des deux parties.",
    tags: ["cm1", "aire", "composer", "addition", "parties", "template"],
    generate: () => {
      const a = randomInt(3, 9);
      const b = randomInt(2, 8);
      const total = a + b;

      return {
        text:
          `Une figure est composée de deux parties. ` +
          `La première partie a une aire de ${a} carreaux unités et la deuxième de ${b} carreaux unités. ` +
          `Quelle est l’aire totale ?`,
        format: "short",
        expected: [String(total), `${total} carreaux unités`],
        comparator: "number_equal",
        explanation:
          "Quand une figure est composée de deux parties qui ne se chevauchent pas, on peut additionner leurs aires. " +
          `${a} + ${b} = ${total}. ` +
          `L’aire totale est donc ${total} carreaux unités.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_aire_composer_tpl_004_deux_rectangles",
    niveau: "cm1",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_composer",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule l’aire de chaque rectangle, puis additionne.",
    tags: ["cm1", "aire", "composer", "rectangles", "decoupage", "template"],
    generate: () => {
      const l1 = randomInt(3, 7);
      const h1 = randomInt(2, 5);
      const l2 = randomInt(2, 6);
      const h2 = randomInt(2, 4);

      const a1 = l1 * h1;
      const a2 = l2 * h2;
      const total = a1 + a2;

      return {
        text:
          `Une figure est composée de deux rectangles. ` +
          `Le premier contient ${h1} rangées de ${l1} carreaux. ` +
          `Le deuxième contient ${h2} rangées de ${l2} carreaux. ` +
          `Quelle est l’aire totale ?`,
        format: "short",
        expected: [String(total), `${total} carreaux unités`],
        comparator: "number_equal",
        explanation:
          "On peut découper la figure en deux rectangles simples. " +
          `Le premier rectangle contient ${h1} × ${l1} = ${a1} carreaux. ` +
          `Le deuxième contient ${h2} × ${l2} = ${a2} carreaux. ` +
          `On additionne : ${a1} + ${a2} = ${total}. ` +
          `L’aire totale est ${total} carreaux unités.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_aire_composer_tpl_005_figure_l_par_decoupage",
    niveau: "cm1",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_composer",
    difficulty: 3,
    theme: "neutral",
    hint: "Tu peux compter les carreaux ou découper la figure en rectangles.",
    tags: ["cm1", "aire", "composer", "figure_L", "decoupage", "template", "canvas"],
    generate: () => {
      const shapes = [
        {
          cells: [
            [1, 1],
            [1, 2],
            [1, 3],
            [2, 1],
            [3, 1],
          ] as Array<[number, number]>,
          aire: 5,
          decomposition: "3 carreaux en haut et 2 carreaux en bas à gauche",
        },
        {
          cells: [
            [1, 1],
            [1, 2],
            [1, 3],
            [1, 4],
            [2, 1],
            [3, 1],
          ] as Array<[number, number]>,
          aire: 6,
          decomposition: "4 carreaux sur la première ligne et 2 carreaux en dessous",
        },
        {
          cells: [
            [1, 1],
            [1, 2],
            [2, 1],
            [2, 2],
            [3, 1],
            [4, 1],
          ] as Array<[number, number]>,
          aire: 6,
          decomposition: "un bloc de 4 carreaux et 2 carreaux ajoutés",
        },
      ];

      const shape = randomChoice(shapes);

      return {
        text: "Observe la figure sur quadrillage. Quelle est son aire en carreaux unités ?",
        format: "short",
        expected: [String(shape.aire)],
        comparator: "number_equal",
        explanation:
          "On peut trouver l’aire en comptant les carreaux remplis. " +
          `On peut aussi décomposer la figure : ${shape.decomposition}. ` +
          `Au total, la figure contient ${shape.aire} carreaux. ` +
          `Son aire est donc ${shape.aire} carreaux unités.`,
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

  {
    kind: "template",
    id: "cm1_aire_composer_tpl_006_assembler_deux_figures",
    niveau: "cm1",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_composer",
    difficulty: 3,
    theme: "neutral",
    hint: "Quand on assemble sans superposer, on additionne les aires.",
    tags: ["cm1", "aire", "composer", "assembler", "template"],
    generate: () => {
      const a = randomInt(4, 10);
      const b = randomInt(3, 9);
      const total = a + b;

      return {
        text:
          `On assemble deux figures sans les superposer. ` +
          `La première a une aire de ${a} cm² et la deuxième a une aire de ${b} cm². ` +
          `Quelle est l’aire de la figure assemblée ?`,
        format: "short",
        expected: [String(total), `${total} cm²`, `${total} cm2`, `${total}cm²`, `${total}cm2`],
        comparator: "number_equal",
        explanation:
          "Si deux figures sont assemblées sans se superposer, leurs surfaces s’ajoutent. " +
          `On calcule ${a} + ${b} = ${total}. ` +
          `L’aire de la figure assemblée est ${total} cm².`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_aire_composer_tpl_007_erreur_perimetre_figure_composee",
    niveau: "cm1",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_composer",
    difficulty: 3,
    theme: "neutral",
    hint: "L’aire compte les carreaux remplis. Le contour, c’est le périmètre.",
    tags: ["cm1", "aire", "composer", "erreur", "perimetre", "template", "canvas"],
    generate: () => {
      const shape = randomChoice([
        {
          cells: [
            [1, 1],
            [1, 2],
            [2, 1],
          ] as Array<[number, number]>,
          aire: 3,
        },
        {
          cells: [
            [1, 1],
            [1, 2],
            [2, 1],
            [2, 2],
            [3, 1],
          ] as Array<[number, number]>,
          aire: 5,
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
      ]);

      return {
        text:
          `Observe la figure composée. Un élève dit : “Pour trouver l’aire, je dois faire le tour de la figure.” ` +
          `A-t-il raison ?`,
        format: "qcm",
        choices: ["non", "oui"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation:
          "L’élève confond aire et périmètre. " +
          "Faire le tour de la figure sert à trouver le périmètre. " +
          `Pour l’aire, on compte les carreaux remplis. Ici, la figure contient ${shape.aire} carreaux.`,
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

  {
    kind: "template",
    id: "cm1_aire_composer_tpl_008_trou_dans_rectangle",
    niveau: "cm1",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_composer",
    difficulty: 4,
    theme: "neutral",
    hint: "Compte seulement les carreaux remplis, pas les carreaux vides.",
    tags: ["cm1", "aire", "composer", "trou", "difference", "template", "canvas"],
    generate: () => {
      const shapes = [
        {
          cells: [
            [1, 1],
            [1, 2],
            [1, 3],
            [2, 1],
            [2, 3],
            [3, 1],
            [3, 2],
            [3, 3],
          ] as Array<[number, number]>,
          aire: 8,
          totalRectangle: 9,
          removed: 1,
        },
        {
          cells: [
            [1, 1],
            [1, 2],
            [1, 3],
            [1, 4],
            [2, 1],
            [2, 2],
            [2, 4],
            [3, 1],
            [3, 2],
            [3, 3],
            [3, 4],
          ] as Array<[number, number]>,
          aire: 11,
          totalRectangle: 12,
          removed: 1,
        },
      ];

      const shape = randomChoice(shapes);

      return {
        text:
          "Observe la figure sur quadrillage. Elle ressemble à un rectangle avec une case vide. " +
          "Quelle est son aire en carreaux unités ?",
        format: "qcm",
        choices: makeChoices(String(shape.aire), [
          String(shape.totalRectangle),
          String(shape.aire - 1),
          String(shape.aire + 2),
        ]),
        expected: [String(shape.aire)],
        comparator: "mcq_exact",
        explanation:
          "On compte seulement les carreaux remplis. " +
          `Le rectangle complet aurait ${shape.totalRectangle} carreaux, mais ${shape.removed} carreau est vide. ` +
          `Il reste donc ${shape.aire} carreaux remplis. ` +
          `L’aire est ${shape.aire} carreaux unités.`,
        canvas: {
          kind: "figure_libre",
          grid: {
            rows: 5,
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

  {
    kind: "template",
    id: "cm1_aire_composer_tpl_009_reunion_parcelles",
    niveau: "cm1",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_composer",
    difficulty: 3,
    theme: "reunion",
    hint: "Additionne les deux surfaces.",
    tags: ["cm1", "aire", "composer", "reunion", "potager", "template"],
    generate: () => {
      const a = randomInt(6, 15);
      const b = randomInt(4, 12);
      const total = a + b;

      const lieu = randomChoice([
        "à Saint-Pierre",
        "au Tampon",
        "dans les hauts de La Réunion",
        "près de Saint-Joseph",
      ]);

      return {
        text:
          `Un potager ${lieu} est composé de deux parcelles. ` +
          `La première mesure ${a} m² et la deuxième mesure ${b} m². ` +
          `Quelle est l’aire totale du potager ?`,
        format: "short",
        expected: [String(total), `${total} m²`, `${total} m2`, `${total}m²`, `${total}m2`],
        comparator: "number_equal",
        explanation:
          "Le potager est composé de deux parcelles qui ne se superposent pas. " +
          `On additionne donc leurs aires : ${a} + ${b} = ${total}. ` +
          `L’aire totale du potager est ${total} m².`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_aire_composer_tpl_010_open_expliquer_decoupage",
    niveau: "cm1",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_composer",
    difficulty: 3,
    theme: "neutral",
    hint: "Explique qu’on peut découper la figure en parties plus simples.",
    tags: ["cm1", "aire", "composer", "open", "decoupage", "template"],
    generate: () => {
      const a = randomInt(4, 10);
      const b = randomInt(3, 9);
      const total = a + b;

      return {
        text:
          `Une figure est découpée en deux parties d’aires ${a} cm² et ${b} cm². ` +
          `Son aire totale est ${total} cm². Explique comment on peut le trouver.`,
        format: "open",
        expected: ["additionner", "aires", "parties"],
        comparator: "contains_keyword",
        explanation:
          "Réponse possible : on découpe la figure en deux parties simples. " +
          `La première partie a une aire de ${a} cm² et la deuxième de ${b} cm². ` +
          `On additionne les deux aires : ${a} + ${b} = ${total}. ` +
          `L’aire totale est ${total} cm².`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_aire_composer_tpl_011_open_compter_cases",
    niveau: "cm1",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_composer",
    difficulty: 3,
    theme: "neutral",
    hint: "Explique que chaque case remplie compte pour 1 unité d’aire.",
    tags: ["cm1", "aire", "composer", "open", "quadrillage", "template", "canvas"],
    generate: () => {
      const shape = randomChoice([
        {
          cells: [
            [1, 1],
            [1, 2],
            [2, 1],
            [2, 2],
            [3, 1],
          ] as Array<[number, number]>,
          aire: 5,
        },
        {
          cells: [
            [1, 1],
            [1, 2],
            [1, 3],
            [2, 2],
            [3, 2],
            [3, 3],
          ] as Array<[number, number]>,
          aire: 6,
        },
      ]);

      return {
        text:
          `Observe la figure. Son aire est ${shape.aire} carreaux unités. ` +
          `Explique comment on peut le vérifier.`,
        format: "open",
        expected: ["carreaux", "compter", "aire"],
        comparator: "contains_keyword",
        explanation:
          "Réponse possible : chaque carreau rempli vaut 1 unité d’aire. " +
          `On compte les carreaux remplis dans la figure. ` +
          `Il y en a ${shape.aire}, donc l’aire est ${shape.aire} carreaux unités.`,
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
    // ============================================================
  // AIRE_DEFI
  // Résoudre un défi d’aire
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_aire_defi_fixed_001_erreur_perimetre",
    niveau: "cm1",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : “Pour trouver l’aire d’une figure, je dois faire le tour.” A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Faire le tour sert à trouver le périmètre.",
    explanation:
      "L’élève confond l’aire et le périmètre. " +
      "Faire le tour d’une figure sert à trouver son périmètre. " +
      "Pour trouver l’aire, on s’intéresse à la surface intérieure, par exemple en comptant les carreaux remplis.",
    tags: ["cm1", "aire", "defi", "erreur", "perimetre", "qcm"],
  },

  {
    kind: "template",
    id: "cm1_aire_defi_tpl_001_meme_aire_formes_differentes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux figures différentes peuvent occuper le même nombre de carreaux.",
    tags: ["cm1", "aire", "defi", "meme_aire", "formes_differentes", "template"],
    generate: () => {
      const nb = randomChoice([4, 5, 6, 8, 10]);

      return {
        text:
          `Deux figures ont des formes différentes, mais elles occupent chacune ${nb} carreaux. ` +
          `Ont-elles la même aire ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["oui"],
        comparator: "mcq_exact",
        explanation:
          "Oui, elles ont la même aire. " +
          "L’aire dépend de la surface occupée, pas seulement de la forme. " +
          `Comme les deux figures occupent chacune ${nb} carreaux de même taille, elles ont la même aire.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_aire_defi_tpl_002_comparer_rectangle_carre",
    niveau: "cm1",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule ou compte les carreaux de chaque figure, puis compare.",
    tags: ["cm1", "aire", "defi", "comparer", "carre", "rectangle", "template"],
    generate: () => {
      const longueur = randomInt(4, 8);
      const largeur = randomInt(2, 5);
      const aireRectangle = longueur * largeur;

      const cote = randomInt(3, 7);
      const aireCarre = cote * cote;

      const correct =
        aireRectangle > aireCarre
          ? "le rectangle"
          : aireCarre > aireRectangle
            ? "le carré"
            : "ils ont la même aire";

      return {
        text:
          `Un rectangle contient ${largeur} rangées de ${longueur} carreaux. ` +
          `Un carré contient ${cote} rangées de ${cote} carreaux. ` +
          `Quelle figure a la plus grande aire ?`,
        format: "qcm",
        choices: ["le rectangle", "le carré", "ils ont la même aire"],
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "On compare les surfaces occupées. " +
          `Le rectangle contient ${largeur} × ${longueur} = ${aireRectangle} carreaux. ` +
          `Le carré contient ${cote} × ${cote} = ${aireCarre} carreaux. ` +
          `La bonne réponse est : ${correct}.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_aire_defi_tpl_003_potager_reunion",
    niveau: "cm1",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_defi",
    difficulty: 3,
    theme: "reunion",
    hint: "Imagine le potager découpé en carrés de 1 m².",
    tags: ["cm1", "aire", "defi", "reunion", "potager", "rectangle", "template"],
    generate: () => {
      const longueur = randomInt(4, 10);
      const largeur = randomInt(2, 6);
      const aire = longueur * largeur;

      const lieu = randomChoice([
        "à Saint-Pierre",
        "au Tampon",
        "près de Saint-Joseph",
        "dans les hauts de La Réunion",
        "près de l’Étang-Salé",
      ]);

      return {
        text:
          `Un potager rectangulaire ${lieu} est découpé en carrés de 1 m². ` +
          `Il y a ${largeur} rangées de ${longueur} carrés. Quelle est son aire ?`,
        format: "short",
        expected: [String(aire), `${aire} m²`, `${aire} m2`, `${aire}m²`, `${aire}m2`],
        comparator: "number_equal",
        explanation:
          "Chaque carré représente 1 m². " +
          `Le potager contient ${largeur} rangées de ${longueur} carrés. ` +
          `On calcule ${largeur} × ${longueur} = ${aire}. ` +
          `L’aire du potager est ${aire} m².`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_aire_defi_tpl_004_figure_libre_piege_perimetre",
    niveau: "cm1",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour l’aire, compte les carreaux remplis. Ne compte pas le contour.",
    tags: ["cm1", "aire", "defi", "figure_libre", "piege_perimetre", "template", "canvas"],
    generate: () => {
      const shapes = [
        {
          cells: [
            [1, 1],
            [1, 2],
            [2, 1],
          ] as Array<[number, number]>,
          aire: 3,
          piege: 8,
          label: "une petite figure de 3 carreaux",
        },
        {
          cells: [
            [1, 1],
            [1, 2],
            [2, 1],
            [2, 2],
          ] as Array<[number, number]>,
          aire: 4,
          piege: 8,
          label: "un carré de 4 carreaux",
        },
        {
          cells: [
            [1, 1],
            [1, 2],
            [1, 3],
            [2, 1],
            [2, 2],
          ] as Array<[number, number]>,
          aire: 5,
          piege: 10,
          label: "une figure de 5 carreaux",
        },
        {
          cells: [
            [1, 1],
            [1, 2],
            [1, 3],
            [2, 2],
            [3, 2],
            [3, 3],
          ] as Array<[number, number]>,
          aire: 6,
          piege: 12,
          label: "une figure de 6 carreaux",
        },
      ];

      const shape = randomChoice(shapes);

      return {
        text:
          "Observe la figure sur quadrillage. " +
          "Quelle est son aire en carreaux unités ?",
        format: "qcm",
        choices: makeChoices(String(shape.aire), [
          String(shape.piege),
          String(shape.aire + 1),
          String(Math.max(1, shape.aire - 1)),
        ]),
        expected: [String(shape.aire)],
        comparator: "mcq_exact",
        explanation:
          "Attention : on cherche l’aire, pas le périmètre. " +
          "Pour l’aire, on compte les carreaux remplis. " +
          `Ici, la figure est ${shape.label}. ` +
          `Son aire est donc ${shape.aire} carreaux unités.`,
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

  {
    kind: "template",
    id: "cm1_aire_defi_tpl_005_figure_avec_trou",
    niveau: "cm1",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Compte seulement les carreaux remplis. Les carreaux vides ne comptent pas.",
    tags: ["cm1", "aire", "defi", "trou", "difference", "figure_libre", "template", "canvas"],
    generate: () => {
      const shapes = [
        {
          cells: [
            [1, 1],
            [1, 2],
            [1, 3],
            [2, 1],
            [2, 3],
            [3, 1],
            [3, 2],
            [3, 3],
          ] as Array<[number, number]>,
          aire: 8,
          rectangleTotal: 9,
          empty: 1,
        },
        {
          cells: [
            [1, 1],
            [1, 2],
            [1, 3],
            [1, 4],
            [2, 1],
            [2, 4],
            [3, 1],
            [3, 2],
            [3, 3],
            [3, 4],
          ] as Array<[number, number]>,
          aire: 10,
          rectangleTotal: 12,
          empty: 2,
        },
      ];

      const shape = randomChoice(shapes);

      return {
        text:
          "Observe la figure. Elle ressemble à un rectangle avec une ou plusieurs cases vides. " +
          "Quelle est son aire en carreaux unités ?",
        format: "qcm",
        choices: makeChoices(String(shape.aire), [
          String(shape.rectangleTotal),
          String(shape.aire - 1),
          String(shape.aire + 2),
        ]),
        expected: [String(shape.aire)],
        comparator: "mcq_exact",
        explanation:
          "On ne compte que les carreaux remplis. " +
          `Le rectangle complet aurait ${shape.rectangleTotal} carreaux, mais ${shape.empty} carreau(x) sont vides. ` +
          `Il reste ${shape.aire} carreaux remplis. ` +
          `L’aire est donc ${shape.aire} carreaux unités.`,
        canvas: {
          kind: "figure_libre",
          grid: {
            rows: 5,
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

  {
    kind: "template",
    id: "cm1_aire_defi_tpl_006_aire_assemblee",
    niveau: "cm1",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Quand on assemble sans superposer, on additionne les aires.",
    tags: ["cm1", "aire", "defi", "assembler", "addition", "template"],
    generate: () => {
      const a = randomInt(5, 12);
      const b = randomInt(4, 10);
      const c = randomInt(3, 8);
      const total = a + b + c;

      return {
        text:
          `On assemble trois parties sans les superposer. ` +
          `Leurs aires sont ${a} cm², ${b} cm² et ${c} cm². ` +
          `Quelle est l’aire totale ?`,
        format: "short",
        expected: [String(total), `${total} cm²`, `${total} cm2`, `${total}cm²`, `${total}cm2`],
        comparator: "number_equal",
        explanation:
          "Les trois parties ne se superposent pas, donc leurs surfaces s’ajoutent. " +
          `On calcule ${a} + ${b} + ${c} = ${total}. ` +
          `L’aire totale est ${total} cm².`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_aire_defi_tpl_007_erreur_unite",
    niveau: "cm1",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Une aire s’exprime avec une unité carrée.",
    tags: ["cm1", "aire", "defi", "unite", "erreur", "template"],
    generate: () => {
      const aire = randomChoice([12, 15, 18, 20, 24, 30]);

      return {
        text:
          `Un élève écrit : “L’aire de la figure est ${aire} cm.” ` +
          `L’unité est-elle bien choisie ?`,
        format: "qcm",
        choices: ["non", "oui"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation:
          "L’unité n’est pas bien choisie. " +
          "Le cm est une unité de longueur. " +
          "Pour une aire, on utilise une unité carrée, par exemple cm². " +
          `On devrait plutôt écrire ${aire} cm² si l’unité est le centimètre carré.`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_aire_defi_tpl_008_open_corriger_perimetre",
    niveau: "cm1",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Explique que l’aire mesure la surface intérieure.",
    tags: ["cm1", "aire", "defi", "open", "corriger", "perimetre", "template"],
    generate: () => {
      const longueur = randomInt(4, 9);
      const largeur = randomInt(2, 6);
      const aire = longueur * largeur;
      const perimetre = 2 * (longueur + largeur);

      return {
        text:
          `Un élève dit : “L’aire du rectangle de ${longueur} cm sur ${largeur} cm est ${perimetre} cm², ` +
          `car j’ai calculé le contour.” Corrige son erreur.`,
        format: "open",
        expected: ["aire", "surface", "périmètre"],
        comparator: "contains_keyword",
        explanation:
          "Réponse possible : l’élève calcule le périmètre, pas l’aire. " +
          "Le périmètre mesure le contour. L’aire mesure la surface intérieure. " +
          `Pour ce rectangle, on peut imaginer ${largeur} rangées de ${longueur} carrés de 1 cm². ` +
          `${longueur} × ${largeur} = ${aire}. ` +
          `L’aire est donc ${aire} cm².`,
      };
    },
  },

  {
    kind: "template",
    id: "cm1_aire_defi_tpl_009_open_strategie_figure_composee",
    niveau: "cm1",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Explique qu’on peut compter les carreaux ou découper la figure.",
    tags: ["cm1", "aire", "defi", "open", "strategie", "figure_composee", "template", "canvas"],
    generate: () => {
      const shape = randomChoice([
        {
          cells: [
            [1, 1],
            [1, 2],
            [2, 1],
            [2, 2],
            [3, 1],
          ] as Array<[number, number]>,
          aire: 5,
          explication: "un bloc de 4 carreaux et 1 carreau ajouté",
        },
        {
          cells: [
            [1, 1],
            [1, 2],
            [1, 3],
            [2, 1],
            [3, 1],
          ] as Array<[number, number]>,
          aire: 5,
          explication: "3 carreaux sur la première ligne et 2 carreaux en dessous",
        },
        {
          cells: [
            [1, 1],
            [1, 2],
            [1, 3],
            [2, 2],
            [3, 2],
            [3, 3],
          ] as Array<[number, number]>,
          aire: 6,
          explication: "une figure composée de 6 carreaux",
        },
      ]);

      return {
        text:
          `Observe la figure. Son aire est ${shape.aire} carreaux unités. ` +
          `Explique une stratégie pour le vérifier.`,
        format: "open",
        expected: ["carreaux", "compter", "aire"],
        comparator: "contains_keyword",
        explanation:
          "Réponse possible : on peut compter les carreaux remplis un par un. " +
          `On peut aussi décomposer la figure : ${shape.explication}. ` +
          `Au total, on trouve ${shape.aire} carreaux remplis. ` +
          `L’aire est donc ${shape.aire} carreaux unités.`,
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

  {
    kind: "template",
    id: "cm1_aire_defi_tpl_010_open_meme_aire",
    niveau: "cm1",
    matiere: "maths",
    notionId: "aire",
    microId: "aire_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Explique que l’aire dépend du nombre de carreaux occupés.",
    tags: ["cm1", "aire", "defi", "open", "meme_aire", "template"],
    generate: () => {
      const nb = randomChoice([5, 6, 8, 10]);

      return {
        text:
          `Deux figures ont des formes différentes mais occupent chacune ${nb} carreaux. ` +
          `Explique pourquoi elles ont la même aire.`,
        format: "open",
        expected: ["carreaux", "même", "aire"],
        comparator: "contains_keyword",
        explanation:
          "Réponse possible : l’aire mesure la surface occupée. " +
          `Même si les formes sont différentes, les deux figures occupent chacune ${nb} carreaux de même taille. ` +
          "Elles ont donc la même aire.",
      };
    },
  },
];
