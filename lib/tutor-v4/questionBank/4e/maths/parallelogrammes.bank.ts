/**
 * Banque de questions Tutor V4 - Mathématiques 4e
 * Notion : Parallélogrammes
 *
 * Objectifs :
 * - reconnaître un parallélogramme ;
 * - utiliser ses propriétés : côtés opposés, angles, diagonales ;
 * - montrer qu’un quadrilatère est un parallélogramme ;
 * - calculer l’aire d’un parallélogramme ;
 * - résoudre des problèmes de géométrie plane ;
 * - éviter les confusions : rectangle/parallélogramme, diagonales égales, hauteur/côté incliné.
 *
 * Organisation :
 * - fixed : définitions et propriétés essentielles ;
 * - templates : variations de longueurs, angles, figures et situations ;
 * - canvas : figures codées avec côtés parallèles, côtés égaux, diagonales ;
 * - open : justification et rédaction courte.
 */
import type {
  TutorBankItemV4,
  QuadrilatereCanvasData,
} from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function parallelogramFigure(base = 8, side = 5): QuadrilatereCanvasData {
  return {
    kind: "quadrilatere",
    points: {
      A: { x: 60, y: 160 },
      B: { x: 220, y: 160 },
      C: { x: 250, y: 80 },
      D: { x: 90, y: 80 },
    },
    labels: {
      A: "A",
      B: "B",
      C: "C",
      D: "D",
    },
    sideLabels: {
      AB: String(base),
      BC: String(side),
      CD: String(base),
      DA: String(side),
    },
    display: {
      showPoints: true,
      showLabels: true,
      showSides: true,
      showAngles: false,
      showDiagonals: false,
    },
    marks: {
      parallelSides: [
        ["AB", "CD"],
        ["BC", "DA"],
      ],
      equalSides: [
        ["AB", "CD"],
        ["BC", "DA"],
      ],
    },
    size: {
      width: 300,
      height: 220,
    },
  };
}

function genericQuadWithDiagonals(ac: number, bd: number): QuadrilatereCanvasData {
  return {
    kind: "quadrilatere",
    points: {
      A: { x: 55, y: 70 },
      B: { x: 230, y: 55 },
      C: { x: 255, y: 175 },
      D: { x: 80, y: 190 },
    },
    labels: {
      A: "A",
      B: "B",
      C: "C",
      D: "D",
    },
    sideLabels: {
      AC: String(ac),
      BD: String(bd),
    },
    display: {
      showPoints: true,
      showLabels: true,
      showSides: false,
      showAngles: false,
      showDiagonals: true,
    },
    size: {
      width: 300,
      height: 220,
    },
  };
}

function parallelogramWithDiagonals(ac: number, bd: number): QuadrilatereCanvasData {
  return {
    kind: "quadrilatere",
    points: {
      A: { x: 60, y: 160 },
      B: { x: 220, y: 160 },
      C: { x: 250, y: 80 },
      D: { x: 90, y: 80 },
    },
    labels: {
      A: "A",
      B: "B",
      C: "C",
      D: "D",
    },
    sideLabels: {
      AC: String(ac),
      BD: String(bd),
    },
    display: {
      showPoints: true,
      showLabels: true,
      showSides: false,
      showAngles: false,
      showDiagonals: true,
    },
    marks: {
      parallelSides: [
        ["AB", "CD"],
        ["BC", "DA"],
      ],
    },
    size: {
      width: 300,
      height: 220,
    },
  };
}

function rectangleFigure(length: number, width: number): QuadrilatereCanvasData {
  return {
    kind: "quadrilatere",
    points: {
      A: { x: 50, y: 60 },
      B: { x: 230, y: 60 },
      C: { x: 230, y: 170 },
      D: { x: 50, y: 170 },
    },
    labels: {
      A: "A",
      B: "B",
      C: "C",
      D: "D",
    },
    sideLabels: {
      AB: String(length),
      BC: String(width),
      CD: String(length),
      DA: String(width),
    },
    display: {
      showPoints: true,
      showLabels: true,
      showSides: true,
      showAngles: false,
      showDiagonals: false,
    },
    marks: {
      rightAnglesAt: ["A", "B", "C", "D"],
      parallelSides: [
        ["AB", "CD"],
        ["BC", "DA"],
      ],
    },
    size: {
      width: 280,
      height: 220,
    },
  };
}

function slantedParallelogramForArea(
  base: number,
  side: number,
  height: number
): QuadrilatereCanvasData {
  return {
    kind: "quadrilatere",
    points: {
      A: { x: 60, y: 170 },
      B: { x: 220, y: 170 },
      C: { x: 255, y: 95 },
      D: { x: 95, y: 95 },
    },
    labels: {
      A: "A",
      B: "B",
      C: "C",
      D: "D",
    },
    sideLabels: {
      AB: String(base),
      BC: String(side),
      CD: String(base),
      DA: String(side),
    },
    angleLabels: {
      A: String(height),
    },
    display: {
      showPoints: true,
      showLabels: true,
      showSides: true,
      showAngles: false,
      showDiagonals: false,
    },
    marks: {
      parallelSides: [
        ["AB", "CD"],
        ["BC", "DA"],
      ],
    },
    size: {
      width: 300,
      height: 230,
    },
  };
}

export const parallelogrammesBank: TutorBankItemV4[] = [
  // =========================
  // PARA_RECONNAITRE
  // =========================
  {
    kind: "fixed",
    id: "para_reconnaitre_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "parallelogrammes",
    microId: "para_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Un quadrilatère dont les côtés opposés sont parallèles deux à deux est…",
    format: "qcm",
    choices: ["un triangle", "un parallélogramme", "un cercle", "un pentagone"],
    expected: ["un parallélogramme"],
    comparator: "mcq_exact",
    hint: "C’est la définition du parallélogramme.",
    explanation:
      "Définition : un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.\n\n" +
          "Méthode : on utilise la propriété du parallélogramme qui correspond aux données de l’énoncé.\n\nCalcul : " +
          ("Un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.") +
          "\n\nConclusion : la propriété choisie permet de conclure sur la figure.",
    tags: ["parallelogramme", "definition"],
  },
  {
    kind: "fixed",
    id: "para_reconnaitre_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "parallelogrammes",
    microId: "para_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Un rectangle est-il un parallélogramme ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Un rectangle a aussi ses côtés opposés parallèles.",
    explanation: "Définition : un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.\n\n" +
          "Méthode : on utilise la propriété du parallélogramme qui correspond aux données de l’énoncé.\n\nCalcul : " +
          ("Oui. Un rectangle est un parallélogramme particulier.") +
          "\n\nConclusion : la propriété choisie permet de conclure sur la figure.",
    tags: ["parallelogramme", "rectangle"],
  },
  {
    kind: "template",
    id: "para_reconnaitre_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "parallelogrammes",
    microId: "para_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Observe le codage des côtés parallèles.",
    tags: ["parallelogramme", "canvas", "template"],
    generate: () => {
      const yes = randomChoice([true, false]);

      const canvas: QuadrilatereCanvasData = yes
        ? parallelogramFigure(randomInt(6, 12), randomInt(4, 8))
        : {
            kind: "quadrilatere",
            points: {
              A: { x: 50, y: 80 },
              B: { x: 230, y: 60 },
              C: { x: 210, y: 180 },
              D: { x: 85, y: 180 },
            },
            labels: { A: "A", B: "B", C: "C", D: "D" },
            display: {
              showPoints: true,
              showLabels: true,
              showSides: false,
              showAngles: false,
              showDiagonals: false,
            },
            marks: {
              parallelSides: [["AB", "CD"]],
            },
            size: { width: 300, height: 220 },
          };

      return {
        text: "La figure codée représente-t-elle un parallélogramme ?",
        format: "qcm",
        choices: ["oui", "non"],
        expected: [yes ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: "Définition : un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.\n\n" +
          "Méthode : on utilise la propriété du parallélogramme qui correspond aux données de l’énoncé.\n\nCalcul : " +
          (yes
          ? "Oui. Les côtés opposés sont parallèles deux à deux."
          : "Non. Un seul couple de côtés opposés est codé parallèle.") +
          "\n\nConclusion : la propriété choisie permet de conclure sur la figure.",
        canvas,
      };
    },
  },
    {
    kind: "fixed",
    id: "para_reconnaitre_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "parallelogrammes",
    microId: "para_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Explique pourquoi un rectangle est un parallélogramme particulier.",
    format: "open",
    expected: ["rectangle", "côtés opposés", "parallèles"],
    comparator: "contains_keyword",
    hint: "Observe les côtés opposés d’un rectangle.",
    explanation:
      "Définition : un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.\n\n" +
          "Méthode : on utilise la propriété du parallélogramme qui correspond aux données de l’énoncé.\n\nCalcul : " +
          ("Un rectangle a ses côtés opposés parallèles deux à deux. Il vérifie donc la définition d’un parallélogramme.") +
          "\n\nConclusion : la propriété choisie permet de conclure sur la figure.",
    tags: ["parallelogramme", "rectangle", "open"],
  },

  // =========================
  // PARA_PROPRIETES
  // =========================
  {
    kind: "fixed",
    id: "para_proprietes_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "parallelogrammes",
    microId: "para_proprietes",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un parallélogramme, les côtés opposés sont…",
    format: "qcm",
    choices: [
      "égaux et parallèles",
      "perpendiculaires",
      "de longueurs quelconques",
      "toujours verticaux",
    ],
    expected: ["égaux et parallèles"],
    comparator: "mcq_exact",
    hint: "C’est une propriété fondamentale du parallélogramme.",
    explanation:
      "Définition : un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.\n\n" +
          "Méthode : on utilise la propriété du parallélogramme qui correspond aux données de l’énoncé.\n\nCalcul : " +
          ("Dans un parallélogramme, les côtés opposés sont parallèles et de même longueur.") +
          "\n\nConclusion : la propriété choisie permet de conclure sur la figure.",
    tags: ["parallelogramme", "proprietes"],
  },
  {
    kind: "template",
    id: "para_proprietes_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "parallelogrammes",
    microId: "para_proprietes",
    difficulty: 2,
    theme: "neutral",
    hint: "Dans un parallélogramme, les côtés opposés ont même longueur.",
    tags: ["parallelogramme", "longueur", "template"],
    generate: () => {
      const base = randomInt(6, 14);
      const side = randomInt(3, 9);
      const ask = randomChoice(["AB", "BC", "CD", "DA"]);

      const answerMap: Record<string, number> = {
        AB: base,
        CD: base,
        BC: side,
        DA: side,
      };

      return {
        text: `Dans un parallélogramme ABCD, on sait que AB = ${base} cm et BC = ${side} cm. Quelle est la longueur de ${ask} ?`,
        format: "short",
        expected: [String(answerMap[ask])],
        comparator: "number_equal",
        explanation: "Définition : un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.\n\n" +
          "Méthode : on utilise la propriété du parallélogramme qui correspond aux données de l’énoncé.\n\nCalcul : " +
          (`Dans un parallélogramme, les côtés opposés sont égaux : AB = CD = ${base} et BC = DA = ${side}.`) +
          "\n\nConclusion : la propriété choisie permet de conclure sur la figure.",
        canvas: parallelogramFigure(base, side),
      };
    },
  },
  {
    kind: "template",
    id: "para_proprietes_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "parallelogrammes",
    microId: "para_proprietes",
    difficulty: 3,
    theme: "neutral",
    hint: "Dans un parallélogramme, les angles opposés sont égaux.",
    tags: ["parallelogramme", "angles", "template"],
    generate: () => {
      const angleA = randomChoice([50, 60, 70, 110, 120, 130]);
      const ask = randomChoice(["A", "B", "C", "D"]);
      const answerMap: Record<string, number> = {
        A: angleA,
        C: angleA,
        B: 180 - angleA,
        D: 180 - angleA,
      };

      return {
        text: `Dans un parallélogramme ABCD, on sait que l’angle A mesure ${angleA}°. Quelle est la mesure de l’angle ${ask} ?`,
        format: "short",
        expected: [String(answerMap[ask])],
        comparator: "number_equal",
        explanation:
          "Définition : un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.\n\n" +
          "Méthode : on utilise la propriété du parallélogramme qui correspond aux données de l’énoncé.\n\nCalcul : " +
          ("Les angles opposés sont égaux et deux angles consécutifs sont supplémentaires.") +
          "\n\nConclusion : la propriété choisie permet de conclure sur la figure.",
        canvas: parallelogramFigure(),
      };
    },
  },
    {
    kind: "fixed",
    id: "para_proprietes_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "parallelogrammes",
    microId: "para_proprietes",
    difficulty: 3,
    theme: "neutral",
    text: "Explique quelles propriétés possèdent les côtés opposés d’un parallélogramme.",
    format: "open",
    expected: ["opposés", "parallèles", "égaux"],
    comparator: "contains_keyword",
    hint: "Il y a deux propriétés importantes : direction et longueur.",
    explanation:
      "Définition : un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.\n\n" +
          "Méthode : on utilise la propriété du parallélogramme qui correspond aux données de l’énoncé.\n\nCalcul : " +
          ("Dans un parallélogramme, les côtés opposés sont parallèles et de même longueur.") +
          "\n\nConclusion : la propriété choisie permet de conclure sur la figure.",
    tags: ["parallelogramme", "proprietes", "open"],
  },

  // =========================
  // PARA_DIAGONALES
  // =========================
  {
    kind: "fixed",
    id: "para_diagonales_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "parallelogrammes",
    microId: "para_diagonales",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un parallélogramme, les diagonales…",
    format: "qcm",
    choices: [
      "se coupent en leur milieu",
      "sont toujours perpendiculaires",
      "sont toujours égales",
      "n’existent pas",
    ],
    expected: ["se coupent en leur milieu"],
    comparator: "mcq_exact",
    hint: "C’est une propriété centrale du parallélogramme.",
    explanation:
      "Définition : un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.\n\n" +
          "Méthode : on utilise la propriété du parallélogramme qui correspond aux données de l’énoncé.\n\nCalcul : " +
          ("Dans un parallélogramme, les diagonales se coupent en leur milieu.") +
          "\n\nConclusion : la propriété choisie permet de conclure sur la figure.",
    tags: ["parallelogramme", "diagonales"],
  },
  {
    kind: "template",
    id: "para_diagonales_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "parallelogrammes",
    microId: "para_diagonales",
    difficulty: 3,
    theme: "neutral",
    hint: "Si les diagonales se coupent en leur milieu, alors chaque diagonale est partagée en deux morceaux égaux.",
    tags: ["parallelogramme", "diagonales", "template"],
    generate: () => {
      const half = randomInt(3, 10);
      const whole = 2 * half;
      const ask = randomChoice(["demi", "total"]);

      return {
        text:
          ask === "demi"
            ? `Dans un parallélogramme, une diagonale mesure ${whole} cm. Quelle est la longueur de chacune de ses deux moitiés ?`
            : `Dans un parallélogramme, les deux moitiés d’une diagonale mesurent ${half} cm chacune. Quelle est la longueur totale de cette diagonale ?`,
        format: "short",
        expected: [String(ask === "demi" ? half : whole)],
        comparator: "number_equal",
        explanation:
          "Définition : un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.\n\n" +
          "Méthode : on utilise la propriété du parallélogramme qui correspond aux données de l’énoncé.\n\nCalcul : " +
          (ask === "demi"
            ? `Les diagonales se coupent en leur milieu, donc chaque moitié mesure ${half} cm.`
            : `La diagonale entière vaut ${half} + ${half} = ${whole} cm.`) +
          "\n\nConclusion : la propriété choisie permet de conclure sur la figure.",
        canvas: parallelogramWithDiagonals(randomInt(8, 16), randomInt(6, 14)),
      };
    },
  },
  {
    kind: "template",
    id: "para_diagonales_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "parallelogrammes",
    microId: "para_diagonales",
    difficulty: 4,
    theme: "neutral",
    hint: "Des diagonales égales ne suffisent pas toujours pour avoir un parallélogramme.",
    tags: ["parallelogramme", "diagonales", "piege", "template"],
    generate: () => {
      return {
        text: "Un quadrilatère dont les diagonales sont de même longueur est-il forcément un parallélogramme ?",
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation:
          "Définition : un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.\n\n" +
          "Méthode : on utilise la propriété du parallélogramme qui correspond aux données de l’énoncé.\n\nCalcul : " +
          ("Non. Des diagonales égales ne suffisent pas. Par exemple, un trapèze isocèle peut avoir des diagonales égales sans être un parallélogramme.") +
          "\n\nConclusion : la propriété choisie permet de conclure sur la figure.",
        canvas: genericQuadWithDiagonals(randomInt(8, 16), randomInt(8, 16)),
      };
    },
  },
    {
    kind: "fixed",
    id: "para_diagonales_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "parallelogrammes",
    microId: "para_diagonales",
    difficulty: 3,
    theme: "neutral",
    text: "Explique ce que signifie : « les diagonales d’un parallélogramme se coupent en leur milieu ».",
    format: "open",
    expected: ["diagonales", "milieu", "moitiés"],
    comparator: "contains_keyword",
    hint: "Chaque diagonale est partagée en deux morceaux égaux.",
    explanation:
      "Définition : un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.\n\n" +
          "Méthode : on utilise la propriété du parallélogramme qui correspond aux données de l’énoncé.\n\nCalcul : " +
          ("Cela signifie que le point d’intersection partage chaque diagonale en deux segments de même longueur.") +
          "\n\nConclusion : la propriété choisie permet de conclure sur la figure.",
    tags: ["parallelogramme", "diagonales", "open"],
  },

  // =========================
  // PARA_MONTRER
  // =========================
  {
    kind: "fixed",
    id: "para_montrer_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "parallelogrammes",
    microId: "para_montrer",
    difficulty: 3,
    theme: "neutral",
    text: "Si les diagonales d’un quadrilatère se coupent en leur milieu, alors ce quadrilatère est…",
    format: "qcm",
    choices: ["un triangle", "un cercle", "un parallélogramme", "un hexagone"],
    expected: ["un parallélogramme"],
    comparator: "mcq_exact",
    hint: "C’est une condition caractéristique du parallélogramme.",
    explanation:
      "Définition : un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.\n\n" +
          "Méthode : on utilise la propriété du parallélogramme qui correspond aux données de l’énoncé.\n\nCalcul : " +
          ("Si les diagonales d’un quadrilatère se coupent en leur milieu, alors ce quadrilatère est un parallélogramme.") +
          "\n\nConclusion : la propriété choisie permet de conclure sur la figure.",
    tags: ["parallelogramme", "demonstration"],
  },
  {
    kind: "template",
    id: "para_montrer_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "parallelogrammes",
    microId: "para_montrer",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche la propriété qui permet de conclure.",
    tags: ["parallelogramme", "demonstration", "template"],
    generate: () => {
      const mode = randomChoice(["paralleles", "diagonales", "longueurs"]);

      if (mode === "paralleles") {
        return {
          text: "On sait que dans le quadrilatère ABCD, AB // CD et AD // BC. Peut-on conclure que ABCD est un parallélogramme ?",
          format: "qcm",
          choices: ["oui", "non"],
          expected: ["oui"],
          comparator: "mcq_exact",
          explanation:
            "Définition : un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.\n\n" +
          "Méthode : on utilise la propriété du parallélogramme qui correspond aux données de l’énoncé.\n\nCalcul : " +
          ("Oui. Si les côtés opposés d’un quadrilatère sont parallèles deux à deux, alors c’est un parallélogramme.") +
          "\n\nConclusion : la propriété choisie permet de conclure sur la figure.",
          canvas: parallelogramFigure(),
        };
      }

      if (mode === "diagonales") {
        return {
          text: "On sait que les diagonales d’un quadrilatère se coupent en leur milieu. Peut-on conclure que c’est un parallélogramme ?",
          format: "qcm",
          choices: ["oui", "non"],
          expected: ["oui"],
          comparator: "mcq_exact",
          explanation:
            "Définition : un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.\n\n" +
          "Méthode : on utilise la propriété du parallélogramme qui correspond aux données de l’énoncé.\n\nCalcul : " +
          ("Oui. C’est une condition suffisante pour montrer qu’un quadrilatère est un parallélogramme.") +
          "\n\nConclusion : la propriété choisie permet de conclure sur la figure.",
          canvas: parallelogramWithDiagonals(randomInt(8, 14), randomInt(6, 12)),
        };
      }

      return {
        text: "On sait qu’un quadrilatère a ses côtés opposés de même longueur deux à deux. Peut-on conclure que c’est un parallélogramme ?",
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["oui"],
        comparator: "mcq_exact",
        explanation:
          "Définition : un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.\n\n" +
          "Méthode : on utilise la propriété du parallélogramme qui correspond aux données de l’énoncé.\n\nCalcul : " +
          ("Oui. Si dans un quadrilatère les côtés opposés sont égaux deux à deux, alors c’est un parallélogramme.") +
          "\n\nConclusion : la propriété choisie permet de conclure sur la figure.",
        canvas: parallelogramFigure(randomInt(6, 12), randomInt(4, 8)),
      };
    },
  },
    {
    kind: "fixed",
    id: "para_montrer_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "parallelogrammes",
    microId: "para_montrer",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment montrer qu’un quadrilatère est un parallélogramme à partir de ses diagonales.",
    format: "open",
    expected: ["diagonales", "milieu", "parallélogramme"],
    comparator: "contains_keyword",
    hint: "Cherche la propriété réciproque avec les diagonales.",
    explanation:
      "Définition : un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.\n\n" +
          "Méthode : on utilise la propriété du parallélogramme qui correspond aux données de l’énoncé.\n\nCalcul : " +
          ("Si les diagonales d’un quadrilatère se coupent en leur milieu, alors ce quadrilatère est un parallélogramme.") +
          "\n\nConclusion : la propriété choisie permet de conclure sur la figure.",
    tags: ["parallelogramme", "demonstration", "open"],
  },

  // =========================
  // PARA_AIRE
  // =========================
  {
    kind: "fixed",
    id: "para_aire_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "parallelogrammes",
    microId: "para_aire",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer l’aire d’un parallélogramme de base 8 cm et de hauteur 5 cm.",
    format: "short",
    expected: ["40"],
    comparator: "number_equal",
    hint: "Aire du parallélogramme = base × hauteur.",
    explanation: "Définition : un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.\n\n" +
          "Méthode : on utilise la propriété du parallélogramme qui correspond aux données de l’énoncé.\n\nCalcul : " +
          ("A = 8 × 5 = 40.") +
          "\n\nConclusion : la propriété choisie permet de conclure sur la figure.",
    tags: ["parallelogramme", "aire"],
  },
  {
    kind: "template",
    id: "para_aire_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "parallelogrammes",
    microId: "para_aire",
    difficulty: 3,
    theme: "neutral",
    hint: "On utilise la base et la hauteur, pas le côté incliné.",
    tags: ["parallelogramme", "aire", "template"],
    generate: () => {
      const base = randomInt(5, 14);
      const side = randomInt(4, 10);
      const height = randomInt(3, 8);
      const area = base * height;

      return {
        text: `Calculer l’aire d’un parallélogramme de base ${base} cm et de hauteur ${height} cm.`,
        format: "short",
        expected: [String(area)],
        comparator: "number_equal",
        explanation: "Définition : un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.\n\n" +
          "Méthode : on utilise la propriété du parallélogramme qui correspond aux données de l’énoncé.\n\nCalcul : " +
          (`L’aire vaut base × hauteur = ${base} × ${height} = ${area}.`) +
          "\n\nConclusion : la propriété choisie permet de conclure sur la figure.",
        canvas: slantedParallelogramForArea(base, side, height),
      };
    },
  },
  {
    kind: "template",
    id: "para_aire_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "parallelogrammes",
    microId: "para_aire",
    difficulty: 4,
    theme: "neutral",
    hint: "Le côté incliné n’est pas la hauteur.",
    tags: ["parallelogramme", "aire", "piege", "template"],
    generate: () => {
      const base = randomInt(6, 15);
      const side = randomInt(5, 11);
      const height = randomInt(3, 8);
      const wrong = base * side;

      return {
        text: `Un élève affirme que l’aire d’un parallélogramme de base ${base} cm, de côté ${side} cm et de hauteur ${height} cm vaut ${wrong} cm². A-t-il raison ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation:
          "Définition : un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.\n\n" +
          "Méthode : on utilise la propriété du parallélogramme qui correspond aux données de l’énoncé.\n\nCalcul : " +
          (`Non. Il faut utiliser la hauteur, pas le côté incliné. La bonne aire est ${base} × ${height}.`) +
          "\n\nConclusion : la propriété choisie permet de conclure sur la figure.",
        canvas: slantedParallelogramForArea(base, side, height),
      };
    },
  },
    {
    kind: "fixed",
    id: "para_aire_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "parallelogrammes",
    microId: "para_aire",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi on utilise la hauteur et non le côté incliné pour calculer l’aire d’un parallélogramme.",
    format: "open",
    expected: ["base", "hauteur", "côté incliné"],
    comparator: "contains_keyword",
    hint: "La hauteur est perpendiculaire à la base.",
    explanation:
      "Définition : un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.\n\n" +
          "Méthode : on utilise la propriété du parallélogramme qui correspond aux données de l’énoncé.\n\nCalcul : " +
          ("L’aire d’un parallélogramme se calcule avec base × hauteur. Le côté incliné n’est pas forcément perpendiculaire à la base, donc ce n’est pas la hauteur.") +
          "\n\nConclusion : la propriété choisie permet de conclure sur la figure.",
    tags: ["parallelogramme", "aire", "open", "erreur"],
  },

  // =========================
  // PARA_PROBLEME
  // =========================
  {
    kind: "template",
    id: "para_probleme_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "parallelogrammes",
    microId: "para_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Lis bien ce qu’on te demande : reconnaître, justifier ou calculer.",
    tags: ["parallelogramme", "probleme", "template"],
    generate: () => {
      const mode = randomChoice(["aire", "reconnaissance"]);

      if (mode === "aire") {
        const base = randomInt(10, 25);
        const height = randomInt(4, 10);
        const area = base * height;

        return {
          text: `Une parcelle de terrain a la forme d’un parallélogramme de base ${base} m et de hauteur ${height} m. Quelle est sa surface ?`,
          format: "short",
          expected: [String(area)],
          comparator: "number_equal",
          explanation: "Définition : un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.\n\n" +
          "Méthode : on utilise la propriété du parallélogramme qui correspond aux données de l’énoncé.\n\nCalcul : " +
          (`La surface d’un parallélogramme vaut base × hauteur, donc ${base} × ${height} = ${area}.`) +
          "\n\nConclusion : la propriété choisie permet de conclure sur la figure.",
        };
      }

      return {
        text: "Sur un plan, un terrain quadrilatère a ses côtés opposés parallèles deux à deux. Quelle est la nature de ce terrain ?",
        format: "short",
        expected: ["parallelogramme"],
        comparator: "contains_keyword",
        explanation:
          "Définition : un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.\n\n" +
          "Méthode : on utilise la propriété du parallélogramme qui correspond aux données de l’énoncé.\n\nCalcul : " +
          ("Un quadrilatère dont les côtés opposés sont parallèles deux à deux est un parallélogramme.") +
          "\n\nConclusion : la propriété choisie permet de conclure sur la figure.",
      };
    },
  },

  // =========================
  // PARA_DEFIS
  // =========================
  {
    kind: "template",
    id: "para_defis_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "parallelogrammes",
    microId: "para_defis",
    difficulty: 5,
    theme: "neutral",
    hint: "Un rectangle est un parallélogramme particulier.",
    tags: ["parallelogramme", "defi", "hpi", "template"],
    generate: () => {
      return {
        text: "Un rectangle est-il toujours un parallélogramme ? Et un parallélogramme est-il toujours un rectangle ?",
        format: "qcm",
        choices: ["oui / oui", "oui / non", "non / oui", "non / non"],
        expected: ["oui / non"],
        comparator: "mcq_exact",
        explanation:
          "Définition : un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.\n\n" +
          "Méthode : on utilise la propriété du parallélogramme qui correspond aux données de l’énoncé.\n\nCalcul : " +
          ("Un rectangle est toujours un parallélogramme, mais un parallélogramme n’a pas forcément d’angles droits, donc ce n’est pas toujours un rectangle.") +
          "\n\nConclusion : la propriété choisie permet de conclure sur la figure.",
      };
    },
  },
  {
    kind: "template",
    id: "para_defis_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "parallelogrammes",
    microId: "para_defis",
    difficulty: 5,
    theme: "neutral",
    hint: "Plusieurs propriétés peuvent permettre de conclure.",
    tags: ["parallelogramme", "defi", "raisonnement", "template"],
    generate: () => {
      const property = randomChoice([
        "cotes_paralleles",
        "cotes_egaux",
        "diagonales",
      ]);

      if (property === "cotes_paralleles") {
        return {
          text: "Explique pourquoi un quadrilatère dont les côtés opposés sont parallèles deux à deux est un parallélogramme.",
          format: "open",
          expected: ["parallèles", "opposés", "parallélogramme"],
          comparator: "contains_keyword",
          explanation:
            "Définition : un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.\n\n" +
          "Méthode : on utilise la propriété du parallélogramme qui correspond aux données de l’énoncé.\n\nCalcul : " +
          ("C’est la définition même du parallélogramme : un quadrilatère ayant ses côtés opposés parallèles deux à deux.") +
          "\n\nConclusion : la propriété choisie permet de conclure sur la figure.",
        };
      }

      if (property === "cotes_egaux") {
        return {
          text: "Explique pourquoi un quadrilatère dont les côtés opposés sont égaux deux à deux est un parallélogramme.",
          format: "open",
          expected: ["égaux", "opposés", "parallélogramme"],
          comparator: "contains_keyword",
          explanation:
            "Définition : un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.\n\n" +
          "Méthode : on utilise la propriété du parallélogramme qui correspond aux données de l’énoncé.\n\nCalcul : " +
          ("Dans un quadrilatère, si les côtés opposés sont égaux deux à deux, alors on peut conclure que c’est un parallélogramme.") +
          "\n\nConclusion : la propriété choisie permet de conclure sur la figure.",
        };
      }

      return {
        text: "Explique pourquoi un quadrilatère dont les diagonales se coupent en leur milieu est un parallélogramme.",
        format: "open",
        expected: ["diagonales", "milieu", "parallélogramme"],
        comparator: "contains_keyword",
        explanation:
          "Définition : un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.\n\n" +
          "Méthode : on utilise la propriété du parallélogramme qui correspond aux données de l’énoncé.\n\nCalcul : " +
          ("Si les diagonales d’un quadrilatère se coupent en leur milieu, alors ce quadrilatère est un parallélogramme.") +
          "\n\nConclusion : la propriété choisie permet de conclure sur la figure.",
      };
    },
  },
  {
    kind: "template",
    id: "para_defis_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "parallelogrammes",
    microId: "para_defis",
    difficulty: 5,
    theme: "neutral",
    hint: "Même aire ne veut pas dire même périmètre.",
    tags: ["parallelogramme", "defi", "hpi", "template"],
    generate: () => {
      const b1 = randomInt(6, 12);
      const h1 = randomInt(3, 8);
      const area = b1 * h1;

      return {
        text: "Peut-on construire deux parallélogrammes différents ayant la même aire ?",
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["oui"],
        comparator: "mcq_exact",
        explanation:
          "Définition : un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.\n\n" +
          "Méthode : on utilise la propriété du parallélogramme qui correspond aux données de l’énoncé.\n\nCalcul : " +
          (`Oui. Par exemple, on peut changer la base et la hauteur tout en gardant le même produit base × hauteur = ${area}.`) +
          "\n\nConclusion : la propriété choisie permet de conclure sur la figure.",
      };
    },
  },
];