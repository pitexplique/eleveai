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
    id: "quadrilatere_parallelogramme_reconnaitre_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_reconnaitre",
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
    id: "quadrilatere_parallelogramme_reconnaitre_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_reconnaitre",
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
    id: "quadrilatere_parallelogramme_reconnaitre_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_reconnaitre",
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
    id: "quadrilatere_parallelogramme_reconnaitre_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_reconnaitre",
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
    id: "quadrilatere_parallelogramme_propriete_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_propriete",
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
    tags: ["parallelogramme", "propriete"],
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_propriete_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_propriete",
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
    id: "quadrilatere_parallelogramme_propriete_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_propriete",
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
    id: "quadrilatere_parallelogramme_propriete_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_propriete",
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
    tags: ["parallelogramme", "propriete", "open"],
  },

  // =========================
  // PARA_DIAGONALES
  // =========================
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_diagonale_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_diagonale",
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
    tags: ["parallelogramme", "diagonale"],
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_diagonale_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_diagonale",
    difficulty: 3,
    theme: "neutral",
    hint: "Si les diagonales se coupent en leur milieu, alors chaque diagonale est partagée en deux morceaux égaux.",
    tags: ["parallelogramme", "diagonale", "template"],
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
    id: "quadrilatere_parallelogramme_diagonale_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_diagonale",
    difficulty: 4,
    theme: "neutral",
    hint: "Des diagonales égales ne suffisent pas toujours pour avoir un parallélogramme.",
    tags: ["parallelogramme", "diagonale", "piege", "template"],
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
    id: "quadrilatere_parallelogramme_diagonale_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_diagonale",
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
    tags: ["parallelogramme", "diagonale", "open"],
  },

  // =========================
  // PARA_MONTRER
  // =========================
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_montrer_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_montrer",
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
    id: "quadrilatere_parallelogramme_montrer_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_montrer",
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
    id: "quadrilatere_parallelogramme_montrer_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_montrer",
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
    id: "quadrilatere_parallelogramme_aire_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_aire",
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
    id: "quadrilatere_parallelogramme_aire_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_aire",
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
    id: "quadrilatere_parallelogramme_aire_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_aire",
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
    id: "quadrilatere_parallelogramme_aire_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_aire",
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
    id: "quadrilatere_parallelogramme_probleme_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_probleme",
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
    id: "quadrilatere_parallelogramme_defi_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_defi",
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
    id: "quadrilatere_parallelogramme_defi_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_defi",
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
    id: "quadrilatere_parallelogramme_defi_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_defi",
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

  /* =========================================================
     COMPLÉMENTS (top-up ~10 items / microSkill)
  ========================================================= */

  // ---------- PARA_RECONNAITRE ----------
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_reconnaitre_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Un parallélogramme possède…",
    format: "qcm",
    choices: [
      "deux paires de côtés parallèles",
      "une seule paire de côtés parallèles",
      "aucun côté parallèle",
      "quatre angles droits",
    ],
    expected: ["deux paires de côtés parallèles"],
    comparator: "mcq_exact",
    hint: "Pense au nombre de couples de côtés parallèles.",
    explanation:
      "Définition : un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.\n\n" +
      "Méthode : on compte les couples de côtés parallèles.\n\n" +
      "Calcul : il y a deux paires de côtés opposés, chacune parallèle.\n\n" +
      "Conclusion : un parallélogramme possède deux paires de côtés parallèles.",
    tags: ["parallelogramme", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_reconnaitre_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Parmi ces quadrilatères, lequel n’est PAS toujours un parallélogramme ?",
    format: "qcm",
    choices: ["un trapèze quelconque", "un rectangle", "un losange", "un carré"],
    expected: ["un trapèze quelconque"],
    comparator: "mcq_exact",
    hint: "Un parallélogramme a deux paires de côtés parallèles.",
    explanation:
      "Définition : un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.\n\n" +
      "Méthode : on vérifie si chaque figure a bien deux paires de côtés parallèles.\n\n" +
      "Calcul : rectangle, losange et carré sont des parallélogrammes particuliers ; un trapèze quelconque n’a qu’une seule paire de côtés parallèles.\n\n" +
      "Conclusion : le trapèze quelconque n’est pas toujours un parallélogramme.",
    tags: ["parallelogramme", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_reconnaitre_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Un losange a ses quatre côtés de même longueur. Est-il un parallélogramme ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Regarde si ses côtés opposés sont parallèles.",
    explanation:
      "Définition : un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.\n\n" +
      "Méthode : on vérifie que le losange a ses côtés opposés parallèles.\n\n" +
      "Calcul : un losange a ses côtés opposés parallèles deux à deux.\n\n" +
      "Conclusion : oui, un losange est un parallélogramme particulier.",
    tags: ["parallelogramme", "losange", "qcm"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_reconnaitre_fixed_6",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est la définition d’un parallélogramme ?",
    format: "qcm",
    choices: [
      "un quadrilatère dont les côtés opposés sont parallèles deux à deux",
      "un quadrilatère dont les quatre côtés sont égaux",
      "un quadrilatère qui a quatre angles droits",
      "un quadrilatère avec une seule paire de côtés parallèles",
    ],
    expected: [
      "un quadrilatère dont les côtés opposés sont parallèles deux à deux",
    ],
    comparator: "mcq_exact",
    hint: "C’est la définition, pas une propriété particulière.",
    explanation:
      "Définition : un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.\n\n" +
      "Méthode : on distingue la définition des propriétés des cas particuliers.\n\n" +
      "Calcul : avoir quatre côtés égaux ou quatre angles droits décrit des cas particuliers, pas la définition.\n\n" +
      "Conclusion : la définition est : côtés opposés parallèles deux à deux.",
    tags: ["parallelogramme", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_reconnaitre_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Une figure est un parallélogramme si ses deux paires de côtés opposés sont parallèles.",
    tags: ["parallelogramme", "canvas", "template"],
    generate: () => {
      const type = randomChoice(["parallelogramme", "rectangle", "trapeze"]);
      if (type === "rectangle") {
        return {
          text: "Cette figure est-elle un parallélogramme ?",
          format: "qcm",
          choices: ["oui", "non"],
          expected: ["oui"],
          comparator: "mcq_exact",
          explanation:
            "Définition : un parallélogramme a ses côtés opposés parallèles deux à deux.\n\n" +
            "Méthode : on observe le codage des côtés.\n\n" +
            "Calcul : un rectangle a ses côtés opposés parallèles et même des angles droits.\n\n" +
            "Conclusion : oui, cette figure est un parallélogramme (un rectangle).",
          canvas: rectangleFigure(randomInt(6, 12), randomInt(3, 7)),
        };
      }
      if (type === "trapeze") {
        return {
          text: "Cette figure n’a qu’une seule paire de côtés parallèles (codée). Est-ce un parallélogramme ?",
          format: "qcm",
          choices: ["oui", "non"],
          expected: ["non"],
          comparator: "mcq_exact",
          explanation:
            "Définition : un parallélogramme a ses côtés opposés parallèles deux à deux.\n\n" +
            "Méthode : on compte les paires de côtés parallèles codées.\n\n" +
            "Calcul : une seule paire de côtés est parallèle : c’est un trapèze.\n\n" +
            "Conclusion : non, ce n’est pas un parallélogramme.",
          canvas: {
            kind: "quadrilatere",
            points: {
              A: { x: 50, y: 170 },
              B: { x: 250, y: 170 },
              C: { x: 200, y: 80 },
              D: { x: 110, y: 80 },
            },
            labels: { A: "A", B: "B", C: "C", D: "D" },
            display: {
              showPoints: true,
              showLabels: true,
              showSides: false,
              showAngles: false,
              showDiagonals: false,
            },
            marks: { parallelSides: [["AB", "CD"]] },
            size: { width: 300, height: 220 },
          },
        };
      }
      return {
        text: "Cette figure est-elle un parallélogramme ?",
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["oui"],
        comparator: "mcq_exact",
        explanation:
          "Définition : un parallélogramme a ses côtés opposés parallèles deux à deux.\n\n" +
          "Méthode : on observe le codage des côtés parallèles.\n\n" +
          "Calcul : les deux paires de côtés opposés sont codées parallèles.\n\n" +
          "Conclusion : oui, cette figure est un parallélogramme.",
        canvas: parallelogramFigure(randomInt(6, 12), randomInt(4, 8)),
      };
    },
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_reconnaitre_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche si la propriété est vraie pour absolument tous les parallélogrammes.",
    tags: ["parallelogramme", "propriete", "template"],
    generate: () => {
      const vraies = [
        "les côtés opposés sont parallèles",
        "les côtés opposés sont égaux",
        "les diagonales se coupent en leur milieu",
        "les angles opposés sont égaux",
      ];
      const fausses = [
        "les diagonales sont perpendiculaires",
        "tous les angles sont droits",
        "les quatre côtés sont égaux",
        "les diagonales sont de même longueur",
      ];
      const vraie = randomChoice([true, false]);
      const prop = vraie ? randomChoice(vraies) : randomChoice(fausses);
      return {
        text: `Cette propriété est-elle vraie pour TOUS les parallélogrammes : « ${prop} » ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [vraie ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          "Définition : un parallélogramme a ses côtés opposés parallèles deux à deux.\n\n" +
          "Méthode : on distingue les propriétés vraies pour tous les parallélogrammes de celles qui ne valent que pour des cas particuliers.\n\n" +
          `Calcul : « ${prop} » ${vraie ? "est une propriété de tout parallélogramme" : "n’est vraie que pour certains cas particuliers (rectangle, losange…)"}.\n\n` +
          `Conclusion : la réponse est ${vraie ? "oui" : "non"}.`,
      };
    },
  },

  // ---------- PARA_PROPRIETES ----------
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_propriete_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_propriete",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un parallélogramme, deux angles consécutifs sont…",
    format: "qcm",
    choices: [
      "supplémentaires (de somme 180°)",
      "égaux",
      "complémentaires (de somme 90°)",
      "tous droits",
    ],
    expected: ["supplémentaires (de somme 180°)"],
    comparator: "mcq_exact",
    hint: "Deux angles qui se suivent ont une somme particulière.",
    explanation:
      "Définition : dans un parallélogramme, les côtés opposés sont parallèles.\n\n" +
      "Méthode : deux angles consécutifs sont entre deux côtés parallèles.\n\n" +
      "Calcul : leur somme vaut 180°, ils sont donc supplémentaires.\n\n" +
      "Conclusion : deux angles consécutifs sont supplémentaires.",
    tags: ["parallelogramme", "angles", "qcm"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_propriete_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_propriete",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un parallélogramme, les angles opposés sont…",
    format: "qcm",
    choices: ["égaux", "supplémentaires", "tous droits", "de somme 360°"],
    expected: ["égaux"],
    comparator: "mcq_exact",
    hint: "Les angles « en face » l’un de l’autre.",
    explanation:
      "Définition : dans un parallélogramme, les côtés opposés sont parallèles.\n\n" +
      "Méthode : on compare deux angles opposés.\n\n" +
      "Calcul : les angles opposés ont la même mesure.\n\n" +
      "Conclusion : les angles opposés sont égaux.",
    tags: ["parallelogramme", "angles", "qcm"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_propriete_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_propriete",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève affirme : « dans tout parallélogramme, les côtés opposés sont perpendiculaires ». A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Les côtés opposés sont parallèles, pas perpendiculaires.",
    explanation:
      "Définition : dans un parallélogramme, les côtés opposés sont parallèles et égaux.\n\n" +
      "Méthode : on confronte l’affirmation à la propriété.\n\n" +
      "Calcul : des côtés parallèles ne sont jamais perpendiculaires entre eux.\n\n" +
      "Conclusion : l’élève a tort, les côtés opposés sont parallèles.",
    tags: ["parallelogramme", "propriete", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_propriete_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_propriete",
    difficulty: 1,
    theme: "neutral",
    text: "Dans un parallélogramme, les côtés opposés ont…",
    format: "qcm",
    choices: [
      "la même longueur",
      "des longueurs toujours différentes",
      "une longueur nulle",
      "des longueurs aléatoires",
    ],
    expected: ["la même longueur"],
    comparator: "mcq_exact",
    hint: "Côtés opposés : pense à la propriété sur les longueurs.",
    explanation:
      "Définition : dans un parallélogramme, les côtés opposés sont parallèles deux à deux.\n\n" +
      "Méthode : on rappelle la propriété sur les longueurs.\n\n" +
      "Calcul : les côtés opposés sont égaux deux à deux.\n\n" +
      "Conclusion : les côtés opposés ont la même longueur.",
    tags: ["parallelogramme", "longueur", "qcm"],
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_propriete_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_propriete",
    difficulty: 2,
    theme: "neutral",
    hint: "Le périmètre vaut 2 × (somme de deux côtés consécutifs).",
    tags: ["parallelogramme", "perimetre", "template"],
    generate: () => {
      const base = randomInt(5, 14);
      const side = randomInt(3, 9);
      const perimetre = 2 * (base + side);
      return {
        text: `Dans un parallélogramme ABCD, AB = ${base} cm et BC = ${side} cm. Quel est son périmètre ?`,
        format: "short",
        expected: [String(perimetre)],
        comparator: "number_equal",
        explanation:
          "Définition : dans un parallélogramme, les côtés opposés sont égaux deux à deux.\n\n" +
          "Méthode : le périmètre vaut deux fois la somme de deux côtés consécutifs.\n\n" +
          `Calcul : $2 \\times (${base} + ${side}) = ${perimetre}$.\n\n` +
          `Conclusion : le périmètre est ${perimetre} cm.`,
        canvas: parallelogramFigure(base, side),
      };
    },
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_propriete_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_propriete",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux angles consécutifs ont une somme de 180°.",
    tags: ["parallelogramme", "angles", "template"],
    generate: () => {
      const angleA = randomChoice([55, 65, 70, 100, 115, 125]);
      const angleB = 180 - angleA;
      return {
        text: `Dans un parallélogramme ABCD, l’angle A mesure ${angleA}°. Quelle est la mesure de l’angle B (consécutif à A) ?`,
        format: "short",
        expected: [String(angleB)],
        comparator: "number_equal",
        explanation:
          "Définition : dans un parallélogramme, deux angles consécutifs sont supplémentaires.\n\n" +
          "Méthode : on soustrait l’angle connu de 180°.\n\n" +
          `Calcul : $180 - ${angleA} = ${angleB}$.\n\n` +
          `Conclusion : l’angle B mesure ${angleB}°.`,
        canvas: parallelogramFigure(),
      };
    },
  },

  // ---------- PARA_DIAGONALES ----------
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_diagonale_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_diagonale",
    difficulty: 2,
    theme: "neutral",
    text: "Le point d’intersection des diagonales d’un parallélogramme est…",
    format: "qcm",
    choices: [
      "le milieu de chacune des diagonales",
      "un sommet du parallélogramme",
      "situé sur un côté",
      "à l’extérieur de la figure",
    ],
    expected: ["le milieu de chacune des diagonales"],
    comparator: "mcq_exact",
    hint: "Les diagonales se coupent en leur milieu.",
    explanation:
      "Définition : dans un parallélogramme, les diagonales se coupent en leur milieu.\n\n" +
      "Méthode : on localise le point d’intersection des diagonales.\n\n" +
      "Calcul : ce point partage chaque diagonale en deux parts égales.\n\n" +
      "Conclusion : c’est le milieu de chacune des diagonales.",
    tags: ["parallelogramme", "diagonale", "qcm"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_diagonale_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_diagonale",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un parallélogramme quelconque, les deux diagonales ont-elles toujours la même longueur ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Les diagonales égales caractérisent plutôt le rectangle.",
    explanation:
      "Définition : dans un parallélogramme, les diagonales se coupent en leur milieu.\n\n" +
      "Méthode : on distingue le parallélogramme quelconque du rectangle.\n\n" +
      "Calcul : les diagonales d’un parallélogramme quelconque n’ont pas la même longueur ; c’est le rectangle qui a des diagonales égales.\n\n" +
      "Conclusion : non, les diagonales ne sont pas toujours égales.",
    tags: ["parallelogramme", "diagonale", "qcm"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_diagonale_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_diagonale",
    difficulty: 3,
    theme: "neutral",
    text: "Dans quel quadrilatère les diagonales se coupent en leur milieu ET sont de même longueur ?",
    format: "qcm",
    choices: [
      "le rectangle",
      "le parallélogramme quelconque",
      "le trapèze quelconque",
      "le losange quelconque",
    ],
    expected: ["le rectangle"],
    comparator: "mcq_exact",
    hint: "Cherche la figure dont les diagonales sont égales.",
    explanation:
      "Définition : dans un parallélogramme, les diagonales se coupent en leur milieu.\n\n" +
      "Méthode : on ajoute la condition « diagonales égales ».\n\n" +
      "Calcul : seul le rectangle (parallélogramme à angles droits) a ses diagonales égales.\n\n" +
      "Conclusion : c’est le rectangle.",
    tags: ["parallelogramme", "diagonale", "rectangle", "qcm"],
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_diagonale_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_diagonale",
    difficulty: 3,
    theme: "neutral",
    hint: "Le point d’intersection est le milieu : il partage la diagonale en deux moitiés égales.",
    tags: ["parallelogramme", "diagonale", "template"],
    generate: () => {
      const half = randomInt(3, 9);
      const whole = 2 * half;
      return {
        text: `Dans un parallélogramme ABCD, les diagonales se coupent en O. On sait que AO = ${half} cm. Quelle est la longueur totale de la diagonale AC ?`,
        format: "short",
        expected: [String(whole)],
        comparator: "number_equal",
        explanation:
          "Définition : dans un parallélogramme, les diagonales se coupent en leur milieu.\n\n" +
          "Méthode : O est le milieu de AC, donc AC = 2 × AO.\n\n" +
          `Calcul : $2 \\times ${half} = ${whole}$.\n\n` +
          `Conclusion : la diagonale AC mesure ${whole} cm.`,
        canvas: parallelogramWithDiagonals(whole, randomInt(6, 14)),
      };
    },
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_diagonale_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_diagonale",
    difficulty: 3,
    theme: "neutral",
    hint: "Les deux moitiés d’une même diagonale sont égales.",
    tags: ["parallelogramme", "diagonale", "template"],
    generate: () => {
      const ao = randomInt(3, 10);
      return {
        text: `Dans un parallélogramme ABCD, les diagonales se coupent en O. On sait que AO = ${ao} cm. Quelle est la longueur de OC ?`,
        format: "short",
        expected: [String(ao)],
        comparator: "number_equal",
        explanation:
          "Définition : dans un parallélogramme, les diagonales se coupent en leur milieu.\n\n" +
          "Méthode : O étant le milieu de AC, on a OC = AO.\n\n" +
          `Calcul : $OC = AO = ${ao}$.\n\n` +
          `Conclusion : OC mesure ${ao} cm.`,
        canvas: parallelogramWithDiagonals(2 * ao, randomInt(6, 14)),
      };
    },
  },
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_diagonale_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_diagonale",
    difficulty: 4,
    theme: "neutral",
    text: "Explique la différence entre les diagonales d’un parallélogramme quelconque et celles d’un rectangle.",
    format: "open",
    expected: ["milieu", "rectangle", "égales"],
    comparator: "contains_keyword",
    hint: "Les deux types se coupent en leur milieu, mais une seule famille a des diagonales égales.",
    explanation:
      "Définition : dans un parallélogramme, les diagonales se coupent en leur milieu.\n\n" +
      "Méthode : on compare la longueur des diagonales selon la figure.\n\n" +
      "Calcul : dans tout parallélogramme elles se coupent en leur milieu, mais seules celles d’un rectangle sont aussi égales.\n\n" +
      "Conclusion : le rectangle ajoute la propriété « diagonales égales ».",
    tags: ["parallelogramme", "diagonale", "open"],
  },

  // ---------- PARA_MONTRER ----------
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_montrer_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_montrer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle condition suffit à montrer qu’un quadrilatère est un parallélogramme ?",
    format: "qcm",
    choices: [
      "les côtés opposés sont parallèles deux à deux",
      "une seule paire de côtés est parallèle",
      "les diagonales sont de même longueur",
      "il possède un angle droit",
    ],
    expected: ["les côtés opposés sont parallèles deux à deux"],
    comparator: "mcq_exact",
    hint: "Cherche une condition caractéristique.",
    explanation:
      "Définition : un parallélogramme a ses côtés opposés parallèles deux à deux.\n\n" +
      "Méthode : on cherche la condition qui caractérise le parallélogramme.\n\n" +
      "Calcul : deux paires de côtés parallèles suffisent ; une seule paire ou des diagonales égales ne suffisent pas.\n\n" +
      "Conclusion : « côtés opposés parallèles deux à deux » suffit.",
    tags: ["parallelogramme", "demonstration", "qcm"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_montrer_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_montrer",
    difficulty: 3,
    theme: "neutral",
    text: "Dans ABCD, les côtés opposés sont égaux deux à deux. Alors ABCD est…",
    format: "qcm",
    choices: ["un parallélogramme", "un trapèze", "un triangle", "indéterminé"],
    expected: ["un parallélogramme"],
    comparator: "mcq_exact",
    hint: "Côtés opposés égaux deux à deux : c’est une condition suffisante.",
    explanation:
      "Définition : un parallélogramme a ses côtés opposés parallèles deux à deux.\n\n" +
      "Méthode : on utilise la réciproque sur les longueurs.\n\n" +
      "Calcul : si les côtés opposés d’un quadrilatère sont égaux deux à deux, alors c’est un parallélogramme.\n\n" +
      "Conclusion : ABCD est un parallélogramme.",
    tags: ["parallelogramme", "demonstration", "qcm"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_montrer_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_montrer",
    difficulty: 3,
    theme: "neutral",
    text: "Dans ABCD, on a AB // CD et AB = CD (un même couple de côtés à la fois parallèle et égal). Alors ABCD est…",
    format: "qcm",
    choices: ["un parallélogramme", "un trapèze quelconque", "un losange", "indéterminé"],
    expected: ["un parallélogramme"],
    comparator: "mcq_exact",
    hint: "Un couple de côtés à la fois parallèles et égaux suffit.",
    explanation:
      "Définition : un parallélogramme a ses côtés opposés parallèles deux à deux.\n\n" +
      "Méthode : on utilise la condition « un couple de côtés parallèles et de même longueur ».\n\n" +
      "Calcul : si AB // CD et AB = CD, alors ABCD est un parallélogramme.\n\n" +
      "Conclusion : ABCD est un parallélogramme.",
    tags: ["parallelogramme", "demonstration", "qcm"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_montrer_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_montrer",
    difficulty: 2,
    theme: "neutral",
    text: "Le fait que les diagonales d’un quadrilatère se coupent en leur milieu permet-il de conclure que c’est un parallélogramme ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "C’est une condition réciproque caractéristique.",
    explanation:
      "Définition : un parallélogramme a ses côtés opposés parallèles deux à deux.\n\n" +
      "Méthode : on utilise la réciproque sur les diagonales.\n\n" +
      "Calcul : si les diagonales se coupent en leur milieu, le quadrilatère est un parallélogramme.\n\n" +
      "Conclusion : oui, on peut conclure.",
    tags: ["parallelogramme", "demonstration", "diagonale", "qcm"],
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_montrer_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_montrer",
    difficulty: 4,
    theme: "neutral",
    hint: "Une seule paire de côtés parallèles ou des diagonales seulement égales ne suffisent pas.",
    tags: ["parallelogramme", "demonstration", "template"],
    generate: () => {
      const suffisantes = [
        "les côtés opposés sont parallèles deux à deux",
        "les côtés opposés sont égaux deux à deux",
        "les diagonales se coupent en leur milieu",
        "un couple de côtés est à la fois parallèle et de même longueur",
      ];
      const insuffisantes = [
        "une seule paire de côtés est parallèle",
        "les diagonales sont de même longueur",
        "un seul angle est droit",
        "deux côtés consécutifs sont égaux",
      ];
      const suffit = randomChoice([true, false]);
      const cond = suffit
        ? randomChoice(suffisantes)
        : randomChoice(insuffisantes);
      return {
        text: `Cette condition suffit-elle pour conclure qu’un quadrilatère est un parallélogramme : « ${cond} » ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [suffit ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          "Définition : un parallélogramme a ses côtés opposés parallèles deux à deux.\n\n" +
          "Méthode : on vérifie si la condition est une propriété caractéristique (réciproque).\n\n" +
          `Calcul : « ${cond} » ${suffit ? "est une condition suffisante" : "ne suffit pas à elle seule"}.\n\n` +
          `Conclusion : la réponse est ${suffit ? "oui" : "non"}.`,
      };
    },
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_montrer_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_montrer",
    difficulty: 3,
    theme: "neutral",
    hint: "Associe la donnée à la bonne propriété réciproque.",
    tags: ["parallelogramme", "demonstration", "template"],
    generate: () => {
      const cas = randomChoice(["paralleles", "egaux", "diagonales"]);
      const data: Record<string, { text: string; reponse: string }> = {
        paralleles: {
          text: "AB // CD et AD // BC",
          reponse: "côtés opposés parallèles deux à deux",
        },
        egaux: {
          text: "AB = CD et AD = BC",
          reponse: "côtés opposés égaux deux à deux",
        },
        diagonales: {
          text: "les diagonales [AC] et [BD] se coupent en leur milieu",
          reponse: "diagonales qui se coupent en leur milieu",
        },
      };
      const choisi = data[cas];
      const reponses = [
        "côtés opposés parallèles deux à deux",
        "côtés opposés égaux deux à deux",
        "diagonales qui se coupent en leur milieu",
      ];
      return {
        text: `On sait que dans ABCD : ${choisi.text}. Quelle propriété permet de conclure que ABCD est un parallélogramme ?`,
        format: "qcm",
        choices: reponses,
        expected: [choisi.reponse],
        comparator: "mcq_exact",
        explanation:
          "Définition : un parallélogramme a ses côtés opposés parallèles deux à deux.\n\n" +
          "Méthode : on choisit la propriété réciproque correspondant à la donnée.\n\n" +
          `Calcul : à partir de « ${choisi.text} », on utilise la propriété « ${choisi.reponse} ».\n\n` +
          "Conclusion : cette propriété permet de conclure que ABCD est un parallélogramme.",
      };
    },
  },
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_montrer_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_montrer",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment montrer qu’un quadrilatère est un parallélogramme à partir des longueurs de ses côtés.",
    format: "open",
    expected: ["côtés opposés", "égaux", "parallélogramme"],
    comparator: "contains_keyword",
    hint: "Pense à la propriété réciproque sur les longueurs.",
    explanation:
      "Définition : un parallélogramme a ses côtés opposés parallèles deux à deux.\n\n" +
      "Méthode : on utilise la réciproque sur les longueurs.\n\n" +
      "Calcul : si les côtés opposés sont égaux deux à deux, alors le quadrilatère est un parallélogramme.\n\n" +
      "Conclusion : il suffit de prouver que les côtés opposés sont égaux deux à deux.",
    tags: ["parallelogramme", "demonstration", "open"],
  },

  // ---------- PARA_AIRE ----------
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_aire_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_aire",
    difficulty: 1,
    theme: "neutral",
    text: "L’aire d’un parallélogramme se calcule par…",
    format: "qcm",
    choices: [
      "base × hauteur",
      "base × côté incliné",
      "base + hauteur",
      "côté × côté",
    ],
    expected: ["base × hauteur"],
    comparator: "mcq_exact",
    hint: "On multiplie la base par la hauteur relative à cette base.",
    explanation:
      "Définition : l’aire d’un parallélogramme est le produit d’une base par la hauteur associée.\n\n" +
      "Méthode : on identifie la base et la hauteur perpendiculaire à cette base.\n\n" +
      "Calcul : aire = base × hauteur.\n\n" +
      "Conclusion : la formule est base × hauteur.",
    tags: ["parallelogramme", "aire", "formule", "qcm"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_aire_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_aire",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer l’aire d’un parallélogramme de base 12 cm et de hauteur 6 cm.",
    format: "short",
    expected: ["72"],
    comparator: "number_equal",
    hint: "Aire = base × hauteur.",
    explanation:
      "Définition : l’aire d’un parallélogramme est base × hauteur.\n\n" +
      "Méthode : on multiplie la base par la hauteur.\n\n" +
      "Calcul : $12 \\times 6 = 72$.\n\n" +
      "Conclusion : l’aire est 72 cm².",
    canvas: slantedParallelogramForArea(12, 7, 6),
    tags: ["parallelogramme", "aire"],
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_aire_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_aire",
    difficulty: 2,
    theme: "neutral",
    hint: "Aire = base × hauteur.",
    tags: ["parallelogramme", "aire", "template"],
    generate: () => {
      const base = randomInt(6, 16);
      const side = randomInt(4, 10);
      const height = randomInt(3, 9);
      const area = base * height;
      return {
        text: `Calculer l’aire d’un parallélogramme de base ${base} cm et de hauteur ${height} cm.`,
        format: "short",
        expected: [String(area)],
        comparator: "number_equal",
        explanation:
          "Définition : l’aire d’un parallélogramme est base × hauteur.\n\n" +
          "Méthode : on multiplie la base par la hauteur.\n\n" +
          `Calcul : $${base} \\times ${height} = ${area}$.\n\n` +
          `Conclusion : l’aire est ${area} cm².`,
        canvas: slantedParallelogramForArea(base, side, height),
      };
    },
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_aire_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_aire",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour retrouver la hauteur, divise l’aire par la base.",
    tags: ["parallelogramme", "aire", "inverse", "template"],
    generate: () => {
      const base = randomChoice([6, 8, 9, 10, 12]);
      const height = randomInt(3, 9);
      const area = base * height;
      return {
        text: `Un parallélogramme a une aire de ${area} cm² et une base de ${base} cm. Quelle est sa hauteur ?`,
        format: "short",
        expected: [String(height)],
        comparator: "number_equal",
        explanation:
          "Définition : comme aire = base × hauteur, on a hauteur = aire ÷ base.\n\n" +
          "Méthode : on divise l’aire par la base.\n\n" +
          `Calcul : $${area} \\div ${base} = ${height}$.\n\n` +
          `Conclusion : la hauteur est ${height} cm.`,
      };
    },
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_aire_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_aire",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour retrouver la base, divise l’aire par la hauteur.",
    tags: ["parallelogramme", "aire", "inverse", "template"],
    generate: () => {
      const base = randomInt(4, 12);
      const height = randomChoice([3, 4, 5, 6, 8]);
      const area = base * height;
      return {
        text: `Un parallélogramme a une aire de ${area} cm² et une hauteur de ${height} cm. Quelle est la longueur de sa base ?`,
        format: "short",
        expected: [String(base)],
        comparator: "number_equal",
        explanation:
          "Définition : comme aire = base × hauteur, on a base = aire ÷ hauteur.\n\n" +
          "Méthode : on divise l’aire par la hauteur.\n\n" +
          `Calcul : $${area} \\div ${height} = ${base}$.\n\n` +
          `Conclusion : la base mesure ${base} cm.`,
      };
    },
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_aire_tpl_6",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_aire",
    difficulty: 4,
    theme: "neutral",
    hint: "Vérifie quelle longueur joue le rôle de hauteur.",
    tags: ["parallelogramme", "aire", "piege", "template"],
    generate: () => {
      const base = randomInt(7, 15);
      const side = randomInt(5, 11);
      const height = randomInt(3, side - 1 > 3 ? side - 1 : 4);
      const area = base * height;
      return {
        text: `Pour un parallélogramme de base ${base} cm, de côté incliné ${side} cm et de hauteur ${height} cm, quelle est l’aire ?`,
        format: "short",
        expected: [String(area)],
        comparator: "number_equal",
        explanation:
          "Définition : l’aire d’un parallélogramme est base × hauteur (et non base × côté incliné).\n\n" +
          "Méthode : on utilise la hauteur, pas le côté incliné.\n\n" +
          `Calcul : $${base} \\times ${height} = ${area}$.\n\n` +
          `Conclusion : l’aire est ${area} cm².`,
        canvas: slantedParallelogramForArea(base, side, height),
      };
    },
  },

  // ---------- PARA_PROBLEME ----------
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_probleme_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_probleme",
    difficulty: 2,
    theme: "neutral",
    text: "Un jardin a la forme d’un parallélogramme de base 15 m et de hauteur 8 m. Quelle est sa surface ?",
    format: "short",
    expected: ["120"],
    comparator: "number_equal",
    hint: "Surface = base × hauteur.",
    explanation:
      "Définition : la surface d’un parallélogramme est base × hauteur.\n\n" +
      "Méthode : on multiplie la base par la hauteur.\n\n" +
      "Calcul : $15 \\times 8 = 120$.\n\n" +
      "Conclusion : la surface est 120 m².",
    tags: ["parallelogramme", "probleme", "aire"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_probleme_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Une parcelle en forme de parallélogramme a deux côtés consécutifs de 20 m et 12 m. Quel est son périmètre ?",
    format: "short",
    expected: ["64"],
    comparator: "number_equal",
    hint: "Périmètre = 2 × (somme de deux côtés consécutifs).",
    explanation:
      "Définition : dans un parallélogramme, les côtés opposés sont égaux.\n\n" +
      "Méthode : le périmètre vaut deux fois la somme de deux côtés consécutifs.\n\n" +
      "Calcul : $2 \\times (20 + 12) = 64$.\n\n" +
      "Conclusion : le périmètre est 64 m.",
    tags: ["parallelogramme", "probleme", "perimetre"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_probleme_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Pour calculer la surface d’un terrain en forme de parallélogramme, de quelles mesures a-t-on besoin ?",
    format: "qcm",
    choices: [
      "une base et la hauteur associée",
      "les deux diagonales",
      "un seul côté",
      "les quatre angles",
    ],
    expected: ["une base et la hauteur associée"],
    comparator: "mcq_exact",
    hint: "La formule de l’aire fait intervenir une base et une hauteur.",
    explanation:
      "Définition : l’aire d’un parallélogramme est base × hauteur.\n\n" +
      "Méthode : on repère les grandeurs utiles à la formule.\n\n" +
      "Calcul : il faut une base et la hauteur perpendiculaire à cette base.\n\n" +
      "Conclusion : on a besoin d’une base et de la hauteur associée.",
    tags: ["parallelogramme", "probleme", "aire", "qcm"],
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_probleme_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Surface = base × hauteur.",
    tags: ["parallelogramme", "probleme", "aire", "template"],
    generate: () => {
      const base = randomInt(8, 22);
      const height = randomInt(4, 12);
      const area = base * height;
      return {
        text: `Un panneau publicitaire a la forme d’un parallélogramme de base ${base} m et de hauteur ${height} m. Quelle est sa surface ?`,
        format: "short",
        expected: [String(area)],
        comparator: "number_equal",
        explanation:
          "Définition : la surface d’un parallélogramme est base × hauteur.\n\n" +
          "Méthode : on multiplie la base par la hauteur.\n\n" +
          `Calcul : $${base} \\times ${height} = ${area}$.\n\n` +
          `Conclusion : la surface est ${area} m².`,
      };
    },
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_probleme_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Périmètre = 2 × (somme de deux côtés consécutifs).",
    tags: ["parallelogramme", "probleme", "perimetre", "template"],
    generate: () => {
      const a = randomInt(8, 20);
      const b = randomInt(5, 15);
      const perimetre = 2 * (a + b);
      return {
        text: `On veut clôturer un terrain en forme de parallélogramme dont deux côtés consécutifs mesurent ${a} m et ${b} m. Quelle longueur de clôture faut-il ?`,
        format: "short",
        expected: [String(perimetre)],
        comparator: "number_equal",
        explanation:
          "Définition : la clôture correspond au périmètre, et les côtés opposés sont égaux.\n\n" +
          "Méthode : périmètre = 2 × (somme de deux côtés consécutifs).\n\n" +
          `Calcul : $2 \\times (${a} + ${b}) = ${perimetre}$.\n\n` +
          `Conclusion : il faut ${perimetre} m de clôture.`,
      };
    },
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_probleme_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Connaissant le périmètre et un côté, retrouve l’autre côté.",
    tags: ["parallelogramme", "probleme", "perimetre", "inverse", "template"],
    generate: () => {
      const a = randomInt(6, 16);
      const b = randomInt(4, 14);
      const perimetre = 2 * (a + b);
      return {
        text: `Un parallélogramme a un périmètre de ${perimetre} cm. Un de ses côtés mesure ${a} cm. Quelle est la longueur du côté consécutif ?`,
        format: "short",
        expected: [String(b)],
        comparator: "number_equal",
        explanation:
          "Définition : périmètre = 2 × (somme de deux côtés consécutifs).\n\n" +
          "Méthode : on divise le périmètre par 2, puis on retire le côté connu.\n\n" +
          `Calcul : $${perimetre} \\div 2 = ${a + b}$, puis $${a + b} - ${a} = ${b}$.\n\n` +
          `Conclusion : le côté consécutif mesure ${b} cm.`,
      };
    },
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_probleme_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Connaissant l’aire et la base, retrouve la hauteur.",
    tags: ["parallelogramme", "probleme", "aire", "inverse", "template"],
    generate: () => {
      const base = randomChoice([6, 8, 10, 12, 15]);
      const height = randomInt(4, 12);
      const area = base * height;
      return {
        text: `Un terrain en forme de parallélogramme a une surface de ${area} m² et une base de ${base} m. Quelle est sa hauteur ?`,
        format: "short",
        expected: [String(height)],
        comparator: "number_equal",
        explanation:
          "Définition : surface = base × hauteur, donc hauteur = surface ÷ base.\n\n" +
          "Méthode : on divise la surface par la base.\n\n" +
          `Calcul : $${area} \\div ${base} = ${height}$.\n\n` +
          `Conclusion : la hauteur est ${height} m.`,
      };
    },
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_probleme_tpl_6",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Deux angles consécutifs sont supplémentaires.",
    tags: ["parallelogramme", "probleme", "angles", "template"],
    generate: () => {
      const angle = randomChoice([58, 64, 72, 105, 118, 124]);
      const autre = 180 - angle;
      return {
        text: `Dans une mosaïque, une tuile a la forme d’un parallélogramme dont un angle mesure ${angle}°. Quelle est la mesure d’un angle qui lui est consécutif ?`,
        format: "short",
        expected: [String(autre)],
        comparator: "number_equal",
        explanation:
          "Définition : dans un parallélogramme, deux angles consécutifs sont supplémentaires.\n\n" +
          "Méthode : on soustrait l’angle donné de 180°.\n\n" +
          `Calcul : $180 - ${angle} = ${autre}$.\n\n` +
          `Conclusion : l’angle consécutif mesure ${autre}°.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_probleme_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Un terrain en forme de parallélogramme doit être à la fois clôturé et engazonné. Explique quelles grandeurs il faut calculer.",
    format: "open",
    expected: ["périmètre", "aire", "clôture"],
    comparator: "contains_keyword",
    hint: "Clôturer fait penser au tour, engazonner à la surface.",
    explanation:
      "Définition : le périmètre mesure le tour, l’aire mesure la surface.\n\n" +
      "Méthode : on relie chaque besoin à une grandeur.\n\n" +
      "Calcul : la clôture correspond au périmètre, le gazon à l’aire (base × hauteur).\n\n" +
      "Conclusion : il faut calculer le périmètre (clôture) et l’aire (gazon).",
    tags: ["parallelogramme", "probleme", "open"],
  },

  // ---------- PARA_DEFIS ----------
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_defi_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle affirmation est correcte ?",
    format: "qcm",
    choices: [
      "Tout carré est un parallélogramme.",
      "Tout parallélogramme est un carré.",
      "Tout trapèze est un parallélogramme.",
      "Aucun losange n’est un parallélogramme.",
    ],
    expected: ["Tout carré est un parallélogramme."],
    comparator: "mcq_exact",
    hint: "Le carré est un cas très particulier de parallélogramme.",
    explanation:
      "Définition : un parallélogramme a ses côtés opposés parallèles deux à deux.\n\n" +
      "Méthode : on teste l’inclusion entre familles de quadrilatères.\n\n" +
      "Calcul : un carré a ses côtés opposés parallèles, donc c’est un parallélogramme ; l’inverse est faux.\n\n" +
      "Conclusion : « tout carré est un parallélogramme » est correcte.",
    tags: ["parallelogramme", "defi", "hierarchie", "qcm"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_defi_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un losange est-il toujours un parallélogramme ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Un losange a ses côtés opposés parallèles.",
    explanation:
      "Définition : un parallélogramme a ses côtés opposés parallèles deux à deux.\n\n" +
      "Méthode : on vérifie la définition pour le losange.\n\n" +
      "Calcul : un losange a ses côtés opposés parallèles, c’est donc un parallélogramme particulier.\n\n" +
      "Conclusion : oui, tout losange est un parallélogramme.",
    tags: ["parallelogramme", "defi", "losange", "qcm"],
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_defi_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Calcule chaque aire avec base × hauteur avant de comparer.",
    tags: ["parallelogramme", "defi", "comparaison", "template"],
    generate: () => {
      const bA = randomChoice([6, 8, 10, 12]);
      const hA = randomInt(3, 8);
      const bB = randomChoice([5, 7, 9, 11]);
      const hB = randomInt(3, 9);
      const aireA = bA * hA;
      const aireB = bB * hB;
      const correct =
        aireA > aireB
          ? "le parallélogramme A"
          : aireB > aireA
          ? "le parallélogramme B"
          : "les deux ont la même aire";
      return {
        text: `Parallélogramme A : base ${bA} cm, hauteur ${hA} cm. Parallélogramme B : base ${bB} cm, hauteur ${hB} cm. Lequel a la plus grande aire ?`,
        format: "qcm",
        choices: [
          "le parallélogramme A",
          "le parallélogramme B",
          "les deux ont la même aire",
        ],
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : l’aire d’un parallélogramme est base × hauteur.\n\n" +
          "Méthode : on calcule chaque aire puis on compare.\n\n" +
          `Calcul : A $= ${bA} \\times ${hA} = ${aireA}$ ; B $= ${bB} \\times ${hB} = ${aireB}$.\n\n` +
          `Conclusion : ${correct}.`,
      };
    },
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_defi_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "On cherche la base sachant l’aire et la hauteur.",
    tags: ["parallelogramme", "defi", "inverse", "template"],
    generate: () => {
      const base = randomChoice([4, 6, 8, 9]);
      const height = randomChoice([5, 6, 7, 8]);
      const area = base * height;
      return {
        text: `Un parallélogramme et un rectangle ont la même aire de ${area} cm². Le parallélogramme a une hauteur de ${height} cm. Quelle est la longueur de sa base ?`,
        format: "short",
        expected: [String(base)],
        comparator: "number_equal",
        explanation:
          "Définition : aire = base × hauteur, donc base = aire ÷ hauteur.\n\n" +
          "Méthode : on divise l’aire par la hauteur du parallélogramme.\n\n" +
          `Calcul : $${area} \\div ${height} = ${base}$.\n\n` +
          `Conclusion : la base mesure ${base} cm.`,
      };
    },
  },
  {
    kind: "template",
    id: "quadrilatere_parallelogramme_defi_tpl_6",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "À base égale, l’aire dépend uniquement de la hauteur.",
    tags: ["parallelogramme", "defi", "raisonnement", "template"],
    generate: () => {
      const base = randomChoice([8, 10, 12]);
      const h1 = randomInt(3, 6);
      const h2 = h1 + randomInt(1, 4);
      return {
        text: `Deux parallélogrammes ont la même base de ${base} cm. Le premier a une hauteur de ${h1} cm, le second de ${h2} cm. Lequel a la plus grande aire ?`,
        format: "qcm",
        choices: ["le premier", "le second", "ils ont la même aire"],
        expected: ["le second"],
        comparator: "mcq_exact",
        explanation:
          "Définition : l’aire d’un parallélogramme est base × hauteur.\n\n" +
          "Méthode : à base égale, on compare les hauteurs.\n\n" +
          `Calcul : $${base} \\times ${h1} = ${base * h1}$ contre $${base} \\times ${h2} = ${base * h2}$.\n\n` +
          "Conclusion : le second, qui a la plus grande hauteur, a la plus grande aire.",
      };
    },
  },
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_defi_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi un rectangle est un parallélogramme, mais un parallélogramme n’est pas toujours un rectangle.",
    format: "open",
    expected: ["côtés opposés", "parallèles", "angles droits"],
    comparator: "contains_keyword",
    hint: "Pense à ce qui distingue le rectangle : ses angles.",
    explanation:
      "Définition : un parallélogramme a ses côtés opposés parallèles deux à deux.\n\n" +
      "Méthode : on compare les propriétés des deux figures.\n\n" +
      "Calcul : un rectangle a en plus quatre angles droits, ce qui n’est pas exigé pour un parallélogramme.\n\n" +
      "Conclusion : tout rectangle est un parallélogramme, mais un parallélogramme sans angles droits n’est pas un rectangle.",
    tags: ["parallelogramme", "defi", "open"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_parallelogramme_defi_open_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "quadrilatere_parallelogramme",
    microId: "quadrilatere_parallelogramme_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi on peut transformer un parallélogramme en rectangle de même aire pour calculer son aire.",
    format: "open",
    expected: ["base", "hauteur", "aire"],
    comparator: "contains_keyword",
    hint: "On découpe un triangle d’un côté pour le recoller de l’autre.",
    explanation:
      "Définition : l’aire d’un parallélogramme est base × hauteur.\n\n" +
      "Méthode : on découpe un triangle d’un côté du parallélogramme et on le déplace de l’autre côté.\n\n" +
      "Calcul : on obtient un rectangle de mêmes base et hauteur, donc de même aire base × hauteur.\n\n" +
      "Conclusion : c’est pourquoi l’aire vaut base × hauteur, comme pour le rectangle obtenu.",
    tags: ["parallelogramme", "defi", "open", "aire"],
  },
];