// lib/tutor-v4/question-banks/maths/3e/triangles.bank.ts

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

function makeChoices(correct: string, wrongs: string[]) {
  return shuffle([correct, ...wrongs]).slice(0, 4);
}

function formatNumber(n: number) {
  return Number.isInteger(n) ? String(n) : String(n).replace(".", ",");
}

function triangleCanvas(params: {
  points: {
    A: { x: number; y: number };
    B: { x: number; y: number };
    C: { x: number; y: number };
  };
  labels?: { A?: string; B?: string; C?: string };
  sideLabels?: { AB?: string; BC?: string; AC?: string };
  angleLabels?: { A?: string; B?: string; C?: string };
  marks?: {
    equalSides?: string[][];
    rightAngle?: "A" | "B" | "C";
  };
}) {
  return {
    kind: "triangle",
    points: params.points,
    labels: params.labels ?? { A: "A", B: "B", C: "C" },
    display: {
      showLabels: true,
      showSideLabels: true,
      showAngleLabels: true,
    },
    sideLabels: params.sideLabels,
    angleLabels: params.angleLabels,
    marks: params.marks,
  } as any;
}

export const trianglesBank: TutorBankItemV4[] = [
  /* =========================
     TRIANGLE_RECONNAITRE
  ========================= */

  {
    kind: "template",
    id: "3e_triangle_reconnaitre_tpl_1_nature_cotes",
    niveau: "3e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    hint: "Regarde si certains côtés ont la même longueur.",
    tags: ["triangle", "reconnaitre", "nature", "template"],
    generate: () => {
      const type = randomChoice(["équilatéral", "isocèle", "quelconque"]);

      if (type === "équilatéral") {
        const cote = randomChoice([4, 5, 6, 7]);
        return {
          text: `Un triangle a trois côtés de longueur ${cote} cm. Quelle est sa nature ?`,
          format: "qcm",
          choices: makeChoices("équilatéral", [
            "isocèle seulement",
            "rectangle",
            "quelconque",
          ]),
          expected: ["équilatéral"],
          comparator: "mcq_exact",
          explanation:
            "Définition : un triangle équilatéral possède trois côtés de même longueur.\n\n" +
            "Méthode : on compare les trois longueurs.\n\n" +
            `Calcul : les trois côtés mesurent ${cote} cm.\n\n` +
            "Conclusion : le triangle est équilatéral.",
          canvas: triangleCanvas({
            points: {
              A: { x: 160, y: 35 },
              B: { x: 60, y: 205 },
              C: { x: 260, y: 205 },
            },
            sideLabels: { AB: `${cote} cm`, BC: `${cote} cm`, AC: `${cote} cm` },
            marks: { equalSides: [["AB", "BC", "AC"]] },
          }),
        };
      }

      if (type === "isocèle") {
        const egal = randomChoice([5, 6, 7, 8]);
        const base = randomChoice([4, 6, 9, 10]);
        return {
          text: `Un triangle a deux côtés de longueur ${egal} cm et un troisième côté de longueur ${base} cm. Quelle est sa nature ?`,
          format: "qcm",
          choices: makeChoices("isocèle", [
            "équilatéral",
            "rectangle",
            "impossible",
          ]),
          expected: ["isocèle"],
          comparator: "mcq_exact",
          explanation:
            "Définition : un triangle isocèle possède au moins deux côtés de même longueur.\n\n" +
            "Méthode : on cherche deux longueurs égales.\n\n" +
            `Calcul : deux côtés mesurent ${egal} cm.\n\n` +
            "Conclusion : le triangle est isocèle.",
          canvas: triangleCanvas({
            points: {
              A: { x: 160, y: 35 },
              B: { x: 65, y: 205 },
              C: { x: 255, y: 205 },
            },
            sideLabels: { AB: `${egal} cm`, AC: `${egal} cm`, BC: `${base} cm` },
            marks: { equalSides: [["AB", "AC"]] },
          }),
        };
      }

      const a = 5;
      const b = 6;
      const c = 7;

      return {
        text: `Un triangle a pour côtés ${a} cm, ${b} cm et ${c} cm. Quelle est sa nature d’après les longueurs ?`,
        format: "qcm",
        choices: makeChoices("quelconque", [
          "équilatéral",
          "isocèle",
          "rectangle obligatoirement",
        ]),
        expected: ["quelconque"],
        comparator: "mcq_exact",
        explanation:
          "Définition : un triangle quelconque n’a pas de côtés nécessairement égaux.\n\n" +
          "Méthode : on compare les longueurs données.\n\n" +
          `Calcul : ${a}, ${b} et ${c} sont trois longueurs différentes.\n\n` +
          "Conclusion : d’après les longueurs, le triangle est quelconque.",
        canvas: triangleCanvas({
          points: {
            A: { x: 145, y: 45 },
            B: { x: 55, y: 205 },
            C: { x: 270, y: 190 },
          },
          sideLabels: { AB: `${a} cm`, BC: `${b} cm`, AC: `${c} cm` },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "3e_triangle_reconnaitre_tpl_2_rectangle",
    niveau: "3e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Un triangle rectangle possède un angle droit.",
    tags: ["triangle", "rectangle", "angle_droit", "template"],
    generate: () => {
      const sommet = randomChoice(["A", "B", "C"] as const);

      return {
        text: `Un triangle possède un angle droit en ${sommet}. Quelle est sa nature ?`,
        format: "qcm",
        choices: makeChoices("rectangle", [
          "équilatéral",
          "isocèle obligatoirement",
          "quelconque sans précision",
        ]),
        expected: ["rectangle"],
        comparator: "mcq_exact",
        explanation:
          "Définition : un triangle rectangle est un triangle qui possède un angle droit.\n\n" +
          "Méthode : on repère le codage de l’angle droit.\n\n" +
          `Calcul : l’angle droit est indiqué en ${sommet}.\n\n` +
          "Conclusion : le triangle est rectangle.",
        canvas: triangleCanvas({
          points: {
            A: { x: 70, y: 190 },
            B: { x: 70, y: 60 },
            C: { x: 250, y: 190 },
          },
          marks: { rightAngle: sommet },
          angleLabels: { [sommet]: "90°" },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "3e_triangle_reconnaitre_tpl_3_angles",
    niveau: "3e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Un angle de 90° indique un triangle rectangle.",
    tags: ["triangle", "angles", "template"],
    generate: () => {
      const angleA = randomChoice([30, 35, 40, 50]);
      const angleB = 90;
      const angleC = 180 - angleA - angleB;

      return {
        text: `Un triangle a pour angles ${angleA}°, ${angleB}° et ${angleC}°. Quelle est sa nature ?`,
        format: "qcm",
        choices: makeChoices("rectangle", [
          "équilatéral",
          "impossible",
          "obtusangle uniquement",
        ]),
        expected: ["rectangle"],
        comparator: "mcq_exact",
        explanation:
          "Définition : un triangle rectangle possède un angle de 90°.\n\n" +
          "Méthode : on observe les mesures des angles.\n\n" +
          `Calcul : l’un des angles mesure ${angleB}°.\n\n` +
          "Conclusion : le triangle est rectangle.",
        canvas: triangleCanvas({
          points: {
            A: { x: 70, y: 190 },
            B: { x: 70, y: 60 },
            C: { x: 250, y: 190 },
          },
          angleLabels: { A: `${angleA}°`, B: "90°", C: `${angleC}°` },
          marks: { rightAngle: "B" },
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_triangle_reconnaitre_piege_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Un triangle équilatéral est-il aussi isocèle ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Un triangle isocèle possède au moins deux côtés égaux.",
    explanation:
      "Définition : un triangle isocèle possède au moins deux côtés de même longueur.\n\n" +
      "Méthode : on vérifie si un triangle équilatéral respecte cette condition.\n\n" +
      "Calcul : un triangle équilatéral possède trois côtés égaux, donc il possède aussi deux côtés égaux.\n\n" +
      "Conclusion : oui, un triangle équilatéral est aussi isocèle.",
    tags: ["triangle", "piege", "equilateral", "isocele"],
  },

  {
    kind: "fixed",
    id: "3e_triangle_reconnaitre_piege_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Un triangle qui possède deux côtés égaux est forcément équilatéral. Vrai ou faux ?",
    format: "qcm",
    choices: ["vrai", "faux"],
    expected: ["faux"],
    comparator: "mcq_exact",
    hint: "Deux côtés égaux suffisent pour être isocèle, pas forcément équilatéral.",
    explanation:
      "Définition : un triangle équilatéral possède trois côtés égaux, alors qu’un triangle isocèle en possède au moins deux.\n\n" +
      "Méthode : on compare les conditions.\n\n" +
      "Calcul : deux côtés égaux ne garantissent pas que le troisième côté soit égal.\n\n" +
      "Conclusion : l’affirmation est fausse.",
    tags: ["triangle", "piege", "isocele", "equilateral"],
  },

  {
    kind: "fixed",
    id: "3e_triangle_reconnaitre_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Explique la différence entre un triangle isocèle et un triangle équilatéral.",
    format: "open",
    expected: ["deux", "trois", "côtés"],
    comparator: "contains_keyword",
    hint: "Compare le nombre de côtés égaux.",
    explanation:
      "Définition : un triangle isocèle possède au moins deux côtés égaux ; un triangle équilatéral possède trois côtés égaux.\n\n" +
      "Méthode : on regarde combien de côtés ont la même longueur.\n\n" +
      "Calcul : deux côtés égaux suffisent pour isocèle ; trois côtés égaux donnent équilatéral.\n\n" +
      "Conclusion : tout triangle équilatéral est isocèle, mais tout triangle isocèle n’est pas forcément équilatéral.",
    tags: ["triangle", "open", "nature"],
  },
    /* =========================
     TRIANGLE_ANGLES
  ========================= */

  {
    kind: "template",
    id: "3e_triangle_angles_tpl_1_angle_manquant",
    niveau: "3e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_angles",
    difficulty: 2,
    theme: "neutral",
    hint: "La somme des angles d’un triangle est 180°.",
    tags: ["triangle", "angles", "somme", "template"],
    generate: () => {
      const A = randomChoice([35, 40, 45, 50, 60]);
      const B = randomChoice([45, 50, 55, 60, 70]);
      const C = 180 - A - B;

      return {
        text: `Dans un triangle, deux angles mesurent ${A}° et ${B}°. Quelle est la mesure du troisième angle ?`,
        format: "short",
        expected: [String(C)],
        comparator: "number_equal",
        explanation:
          "Définition : la somme des angles d’un triangle est toujours égale à 180°.\n\n" +
          "Méthode : on soustrait les deux angles connus à 180°.\n\n" +
          `Calcul : 180 - ${A} - ${B} = ${C}.\n\n` +
          `Conclusion : le troisième angle mesure ${C}°.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_triangle_angles_tpl_2_qcm",
    niveau: "3e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_angles",
    difficulty: 2,
    theme: "neutral",
    hint: "Additionne les deux angles connus puis complète à 180°.",
    tags: ["triangle", "angles", "qcm", "template"],
    generate: () => {
      const A = randomChoice([25, 30, 40, 55]);
      const B = randomChoice([60, 70, 80, 90]);
      const C = 180 - A - B;

      return {
        text: `Dans un triangle ABC, on sait que Â = ${A}° et B̂ = ${B}°. Que vaut Ĉ ?`,
        format: "qcm",
        choices: makeChoices(String(C), [
          String(A + B),
          String(180 - A),
          String(180 - B),
        ]),
        expected: [String(C)],
        comparator: "mcq_exact",
        explanation:
          "Définition : dans tout triangle, les trois angles ont une somme de 180°.\n\n" +
          "Méthode : on calcule l’angle manquant avec 180° - les deux angles connus.\n\n" +
          `Calcul : Ĉ = 180 - ${A} - ${B} = ${C}°.\n\n` +
          `Conclusion : l’angle Ĉ mesure ${C}°.`,
        canvas: triangleCanvas({
          points: {
            A: { x: 70, y: 190 },
            B: { x: 250, y: 190 },
            C: { x: 150, y: 45 },
          },
          angleLabels: { A: `${A}°`, B: `${B}°`, C: "?" },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "3e_triangle_angles_tpl_3_rectangle",
    niveau: "3e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_angles",
    difficulty: 2,
    theme: "neutral",
    hint: "Dans un triangle rectangle, les deux angles aigus font ensemble 90°.",
    tags: ["triangle", "rectangle", "angles", "template"],
    generate: () => {
      const A = randomChoice([25, 30, 35, 40, 55]);
      const C = 90 - A;

      return {
        text: `Dans un triangle rectangle, un angle aigu mesure ${A}°. Quelle est la mesure de l’autre angle aigu ?`,
        format: "short",
        expected: [String(C)],
        comparator: "number_equal",
        explanation:
          "Définition : dans un triangle rectangle, un angle mesure 90°.\n\n" +
          "Méthode : les deux autres angles complètent jusqu’à 180°, donc ils font ensemble 90°.\n\n" +
          `Calcul : 90 - ${A} = ${C}.\n\n` +
          `Conclusion : l’autre angle aigu mesure ${C}°.`,
        canvas: triangleCanvas({
          points: {
            A: { x: 70, y: 190 },
            B: { x: 70, y: 60 },
            C: { x: 250, y: 190 },
          },
          marks: { rightAngle: "A" },
          angleLabels: { A: "90°", B: `${A}°`, C: "?" },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "3e_triangle_angles_tpl_4_isocele",
    niveau: "3e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_angles",
    difficulty: 3,
    theme: "neutral",
    hint: "Dans un triangle isocèle, les angles à la base sont égaux.",
    tags: ["triangle", "isocele", "angles", "template"],
    generate: () => {
      const sommet = randomChoice([40, 50, 60, 80]);
      const baseAngle = (180 - sommet) / 2;

      return {
        text: `Dans un triangle isocèle, l’angle au sommet mesure ${sommet}°. Quelle est la mesure de chacun des angles à la base ?`,
        format: "short",
        expected: [formatNumber(baseAngle)],
        comparator: "number_equal",
        explanation:
          "Définition : dans un triangle isocèle, les deux angles à la base sont égaux.\n\n" +
          "Méthode : on retire l’angle au sommet à 180°, puis on partage le reste en deux.\n\n" +
          `Calcul : (180 - ${sommet}) ÷ 2 = ${formatNumber(baseAngle)}.\n\n` +
          `Conclusion : chaque angle à la base mesure ${formatNumber(baseAngle)}°.`,
        canvas: triangleCanvas({
          points: {
            A: { x: 160, y: 40 },
            B: { x: 65, y: 205 },
            C: { x: 255, y: 205 },
          },
          marks: { equalSides: [["AB", "AC"]] },
          angleLabels: { A: `${sommet}°`, B: "?", C: "?" },
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_triangle_angles_piege_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_angles",
    difficulty: 2,
    theme: "neutral",
    text: "Un élève affirme : « La somme des angles d’un triangle est 360°. » A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "360° est la somme des angles autour d’un point ou d’un quadrilatère.",
    explanation:
      "Définition : la somme des angles d’un triangle est 180°.\n\n" +
      "Méthode : on utilise la propriété fondamentale des triangles.\n\n" +
      "Calcul : les trois angles d’un triangle complètent un angle plat, soit 180°.\n\n" +
      "Conclusion : l’élève a tort.",
    tags: ["triangle", "angles", "piege"],
  },

  {
    kind: "fixed",
    id: "3e_triangle_angles_piege_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_angles",
    difficulty: 3,
    theme: "neutral",
    text: "Un triangle peut-il avoir deux angles droits ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Deux angles droits feraient déjà 180°.",
    explanation:
      "Définition : la somme des angles d’un triangle est 180°.\n\n" +
      "Méthode : on additionne deux angles droits.\n\n" +
      "Calcul : 90° + 90° = 180°, il ne resterait plus aucun angle pour le troisième sommet.\n\n" +
      "Conclusion : un triangle ne peut pas avoir deux angles droits.",
    tags: ["triangle", "angles", "rectangle", "piege"],
  },

  {
    kind: "fixed",
    id: "3e_triangle_angles_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_angles",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment trouver un angle manquant dans un triangle.",
    format: "open",
    expected: ["180", "somme", "soustraire"],
    comparator: "contains_keyword",
    hint: "Utilise la somme des angles d’un triangle.",
    explanation:
      "Définition : dans un triangle, la somme des trois angles est 180°.\n\n" +
      "Méthode : on additionne les angles connus, puis on soustrait cette somme à 180°.\n\n" +
      "Calcul : si deux angles mesurent 50° et 60°, alors le troisième vaut 180 - 50 - 60 = 70°.\n\n" +
      "Conclusion : on trouve l’angle manquant en complétant à 180°.",
    tags: ["triangle", "angles", "open"],
  },
    /* =========================
     TRIANGLE_INEGALITE
  ========================= */

  {
    kind: "template",
    id: "3e_triangle_inegalite_tpl_1_existence",
    niveau: "3e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_inegalite",
    difficulty: 2,
    theme: "neutral",
    hint: "Dans un triangle, la plus grande longueur doit être plus petite que la somme des deux autres.",
    tags: ["triangle", "inegalite_triangulaire", "existence", "template"],
    generate: () => {
      const a = randomInt(3, 8);
      const b = randomInt(4, 9);
      const possible = randomChoice([true, false]);

      const c = possible
        ? randomInt(Math.abs(a - b) + 1, a + b - 1)
        : a + b + randomInt(0, 3);

      const max = Math.max(a, b, c);
      const sumOthers = a + b + c - max;
      const answer = max < sumOthers ? "oui" : "non";

      return {
        text: `Peut-on construire un triangle avec des côtés de longueurs ${a} cm, ${b} cm et ${c} cm ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [answer],
        comparator: "mcq_exact",
        explanation:
          "Définition : dans un triangle, la plus grande longueur doit être strictement inférieure à la somme des deux autres.\n\n" +
          "Méthode : on repère la plus grande longueur puis on la compare à la somme des deux autres.\n\n" +
          `Calcul : la plus grande longueur est ${max} cm et la somme des deux autres vaut ${sumOthers} cm.\n\n` +
          `Conclusion : comme ${max} ${max < sumOthers ? "<" : "≥"} ${sumOthers}, la réponse est ${answer}.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_triangle_inegalite_tpl_2_longueur_manquante",
    niveau: "3e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_inegalite",
    difficulty: 3,
    theme: "neutral",
    hint: "La troisième longueur doit être plus grande que la différence des deux autres et plus petite que leur somme.",
    tags: ["triangle", "inegalite_triangulaire", "longueur_manquante", "template"],
    generate: () => {
      const a = randomInt(4, 10);
      const b = randomInt(4, 10);
      const min = Math.abs(a - b);
      const max = a + b;

      const correct = randomInt(min + 1, max - 1);

      return {
        text: `On connaît deux côtés d’un triangle : ${a} cm et ${b} cm. Parmi les propositions, laquelle peut être la troisième longueur ?`,
        format: "qcm",
        choices: makeChoices(String(correct), [
          String(min),
          String(max),
          String(max + 2),
        ]),
        expected: [String(correct)],
        comparator: "mcq_exact",
        explanation:
          "Définition : une longueur de triangle doit respecter l’inégalité triangulaire.\n\n" +
          "Méthode : la troisième longueur doit être strictement comprise entre la différence et la somme des deux autres longueurs.\n\n" +
          `Calcul : ${Math.abs(a - b)} < troisième longueur < ${a + b}.\n\n` +
          `Conclusion : ${correct} cm convient.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_triangle_inegalite_tpl_3_reunion",
    niveau: "3e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_inegalite",
    difficulty: 3,
    theme: "reunion",
    hint: "Vérifie si le plus grand côté est inférieur à la somme des deux autres.",
    tags: ["triangle", "inegalite_triangulaire", "reunion", "template"],
    generate: () => {
      const a = randomChoice([5, 6, 7, 8]);
      const b = randomChoice([6, 7, 8, 9]);
      const c = randomChoice([9, 10, 11, 12, 15]);

      const max = Math.max(a, b, c);
      const sumOthers = a + b + c - max;
      const answer = max < sumOthers ? "oui" : "non";

      return {
        text:
          `Pour tracer un petit parcours triangulaire dans une cour à La Réunion, on propose trois côtés de ` +
          `${a} m, ${b} m et ${c} m. Ce triangle est-il constructible ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [answer],
        comparator: "mcq_exact",
        explanation:
          "Définition : pour construire un triangle, la plus grande longueur doit être inférieure à la somme des deux autres.\n\n" +
          "Méthode : on compare la plus grande longueur avec la somme des deux autres.\n\n" +
          `Calcul : plus grande longueur = ${max} m ; somme des deux autres = ${sumOthers} m.\n\n` +
          `Conclusion : comme ${max} ${max < sumOthers ? "<" : "≥"} ${sumOthers}, la réponse est ${answer}.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_triangle_inegalite_piege_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_inegalite",
    difficulty: 3,
    theme: "neutral",
    text: "Peut-on construire un triangle avec des côtés de 3 cm, 4 cm et 7 cm ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Attention : il faut une inégalité stricte.",
    explanation:
      "Définition : la plus grande longueur doit être strictement inférieure à la somme des deux autres.\n\n" +
      "Méthode : on compare 7 avec 3 + 4.\n\n" +
      "Calcul : 3 + 4 = 7. Ce n’est pas strictement supérieur à 7.\n\n" +
      "Conclusion : on ne peut pas construire un vrai triangle avec ces longueurs.",
    tags: ["triangle", "inegalite_triangulaire", "piege", "egalite"],
  },

  {
    kind: "fixed",
    id: "3e_triangle_inegalite_piege_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_inegalite",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : « Si le plus grand côté est égal à la somme des deux autres, le triangle existe. » A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "L’inégalité doit être stricte.",
    explanation:
      "Définition : dans un triangle, la plus grande longueur est strictement inférieure à la somme des deux autres.\n\n" +
      "Méthode : on distingue égalité et inégalité stricte.\n\n" +
      "Calcul : si le plus grand côté est égal à la somme des deux autres, les points sont alignés.\n\n" +
      "Conclusion : l’élève a tort : ce n’est pas un triangle.",
    tags: ["triangle", "inegalite_triangulaire", "piege"],
  },

  {
    kind: "fixed",
    id: "3e_triangle_inegalite_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_inegalite",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment vérifier si trois longueurs peuvent former un triangle.",
    format: "open",
    expected: ["plus grand", "somme", "inférieur"],
    comparator: "contains_keyword",
    hint: "Il suffit de comparer la plus grande longueur à la somme des deux autres.",
    explanation:
      "Définition : l’inégalité triangulaire permet de savoir si un triangle est constructible.\n\n" +
      "Méthode : on repère la plus grande longueur, puis on la compare à la somme des deux autres.\n\n" +
      "Calcul : si la plus grande longueur est strictement inférieure à cette somme, le triangle existe.\n\n" +
      "Conclusion : cette vérification suffit pour décider si les trois longueurs forment un triangle.",
    tags: ["triangle", "inegalite_triangulaire", "open"],
  },
    /* =========================
     TRIANGLE_DEFIS
  ========================= */

  {
    kind: "template",
    id: "3e_triangle_defis_tpl_1_angles_nature",
    niveau: "3e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_defis",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule d’abord le troisième angle.",
    tags: ["triangle", "defi", "angles", "nature", "template"],
    generate: () => {
      const a = randomChoice([40, 50, 60, 70]);
      const b = a;
      const c = 180 - a - b;

      return {
        text: `Dans un triangle, deux angles mesurent ${a}° et ${b}°. Quelle est la nature du triangle ?`,
        format: "qcm",
        choices: makeChoices("isocèle", [
          "équilatéral obligatoirement",
          "rectangle obligatoirement",
          "impossible",
        ]),
        expected: ["isocèle"],
        comparator: "mcq_exact",
        explanation:
          "Définition : si deux angles d’un triangle sont égaux, alors le triangle est isocèle.\n\n" +
          "Méthode : on observe les deux angles donnés et on peut aussi calculer le troisième.\n\n" +
          `Calcul : les deux angles donnés sont égaux : ${a}° et ${b}°. Le troisième vaut ${c}°.\n\n` +
          "Conclusion : le triangle est isocèle.",
      };
    },
  },

  {
    kind: "template",
    id: "3e_triangle_defis_tpl_2_inegalite_perimetre",
    niveau: "3e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_defis",
    difficulty: 4,
    theme: "neutral",
    hint: "Vérifie d’abord que le triangle existe, puis additionne les côtés.",
    tags: ["triangle", "defi", "inegalite", "perimetre", "template"],
    generate: () => {
      const a = randomInt(4, 9);
      const b = randomInt(5, 10);
      const c = randomInt(Math.abs(a - b) + 1, a + b - 1);
      const p = a + b + c;
      const max = Math.max(a, b, c);
      const sumOthers = p - max;

      return {
        text: `Un triangle a pour côtés ${a} cm, ${b} cm et ${c} cm. Vérifier qu’il est constructible puis donner son périmètre.`,
        format: "short",
        expected: [String(p)],
        comparator: "number_equal",
        explanation:
          "Définition : pour qu’un triangle existe, la plus grande longueur doit être strictement inférieure à la somme des deux autres.\n\n" +
          "Méthode : on vérifie l’inégalité triangulaire, puis on additionne les trois côtés.\n\n" +
          `Calcul : la plus grande longueur est ${max} cm et la somme des deux autres est ${sumOthers} cm. Comme ${max} < ${sumOthers}, le triangle est constructible.\n` +
          `Périmètre : ${a} + ${b} + ${c} = ${p}.\n\n` +
          `Conclusion : le périmètre est ${p} cm.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_triangle_defis_tpl_3_aire_rectangle",
    niveau: "3e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_defis",
    difficulty: 4,
    theme: "neutral",
    hint: "Dans un triangle rectangle, les côtés de l’angle droit peuvent servir de base et de hauteur.",
    tags: ["triangle", "defi", "rectangle", "aire", "template"],
    generate: () => {
      const a = randomChoice([3, 4, 5, 6, 8]);
      const b = randomChoice([4, 6, 8, 10, 12]);
      const aire = (a * b) / 2;

      return {
        text: `Un triangle rectangle a pour côtés de l’angle droit ${a} cm et ${b} cm. Quelle est son aire ?`,
        format: "short",
        expected: [String(aire)],
        comparator: "number_equal",
        explanation:
          "Définition : l’aire d’un triangle vaut base × hauteur ÷ 2.\n\n" +
          "Méthode : dans un triangle rectangle, les deux côtés de l’angle droit sont perpendiculaires.\n\n" +
          `Calcul : ${a} × ${b} ÷ 2 = ${aire}.\n\n` +
          `Conclusion : l’aire est ${aire} cm².`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_triangle_defis_tpl_4_reunion_angles",
    niveau: "3e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_defis",
    difficulty: 5,
    theme: "reunion",
    hint: "Utilise la somme des angles d’un triangle.",
    tags: ["triangle", "defi", "reunion", "angles", "template"],
    generate: () => {
      const a = randomChoice([48, 52, 60]);
      const b = randomChoice([58, 62, 70]);
      const c = 180 - a - b;

      return {
        text:
          `À La Réunion, un élève dessine un panneau triangulaire avec deux angles de ${a}° et ${b}°. ` +
          `Quel est le troisième angle ?`,
        format: "short",
        expected: [String(c)],
        comparator: "number_equal",
        explanation:
          "Définition : la somme des angles d’un triangle est égale à 180°.\n\n" +
          "Méthode : on additionne les deux angles connus puis on soustrait à 180°.\n\n" +
          `Calcul : ${a} + ${b} = ${a + b}. Donc le troisième angle vaut 180 - ${a + b} = ${c}°.\n\n` +
          `Conclusion : le troisième angle mesure ${c}°.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_triangle_defis_tpl_5_melange_nature",
    niveau: "3e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_defis",
    difficulty: 5,
    theme: "neutral",
    hint: "Utilise les angles et les côtés.",
    tags: ["triangle", "defi", "nature", "angles", "template"],
    generate: () => {
      const angleSommet = randomChoice([40, 60, 80]);
      const angleBase = (180 - angleSommet) / 2;

      return {
        text:
          `Dans un triangle isocèle, l’angle au sommet mesure ${angleSommet}°. ` +
          `Quelle est la mesure de chacun des deux angles à la base ?`,
        format: "short",
        expected: [String(angleBase)],
        comparator: "number_equal",
        explanation:
          "Définition : dans un triangle isocèle, les deux angles à la base sont égaux.\n\n" +
          "Méthode : on enlève l’angle au sommet à 180°, puis on partage le reste en deux.\n\n" +
          `Calcul : (180 - ${angleSommet}) ÷ 2 = ${angleBase}.\n\n` +
          `Conclusion : chaque angle à la base mesure ${angleBase}°.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_triangle_defis_piege_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_defis",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève dit : « Si un triangle a deux angles égaux, alors il a deux côtés égaux. » A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Deux angles égaux caractérisent un triangle isocèle.",
    explanation:
      "Définition : dans un triangle, si deux angles sont égaux, alors les côtés opposés à ces angles sont égaux.\n\n" +
      "Méthode : on utilise la propriété réciproque du triangle isocèle.\n\n" +
      "Calcul : deux angles égaux indiquent que le triangle est isocèle.\n\n" +
      "Conclusion : l’élève a raison.",
    tags: ["triangle", "defi", "piege", "isocele"],
  },

  {
    kind: "fixed",
    id: "3e_triangle_defis_piege_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_defis",
    difficulty: 5,
    theme: "neutral",
    text: "Peut-on construire un triangle dont les longueurs sont 6 cm, 8 cm et 14 cm ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "L’inégalité triangulaire doit être stricte.",
    explanation:
      "Définition : dans un triangle, la plus grande longueur doit être strictement inférieure à la somme des deux autres.\n\n" +
      "Méthode : on compare 14 avec 6 + 8.\n\n" +
      "Calcul : 6 + 8 = 14. Il y a égalité, donc les points seraient alignés.\n\n" +
      "Conclusion : on ne peut pas construire un triangle avec ces longueurs.",
    tags: ["triangle", "defi", "piege", "inegalite"],
  },

  {
    kind: "fixed",
    id: "3e_triangle_defis_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_defis",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi un triangle équilatéral est aussi un triangle isocèle.",
    format: "open",
    expected: ["trois", "deux", "côtés"],
    comparator: "contains_keyword",
    hint: "Un triangle isocèle doit avoir au moins deux côtés égaux.",
    explanation:
      "Définition : un triangle isocèle possède au moins deux côtés égaux, tandis qu’un triangle équilatéral possède trois côtés égaux.\n\n" +
      "Méthode : on compare les deux définitions.\n\n" +
      "Calcul : si un triangle a trois côtés égaux, alors il a forcément au moins deux côtés égaux.\n\n" +
      "Conclusion : tout triangle équilatéral est aussi isocèle.",
    tags: ["triangle", "defi", "open", "nature"],
  },

  {
    kind: "fixed",
    id: "3e_triangle_defis_open_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_defis",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi la somme des angles d’un triangle ne peut pas dépasser 180°.",
    format: "open",
    expected: ["somme", "angles", "180"],
    comparator: "contains_keyword",
    hint: "Utilise la propriété de la somme des angles d’un triangle.",
    explanation:
      "Définition : dans un triangle, la somme des trois angles est toujours égale à 180°.\n\n" +
      "Méthode : on utilise cette propriété pour vérifier si des mesures sont possibles.\n\n" +
      "Calcul : si la somme dépasse 180°, il est impossible de former un triangle.\n\n" +
      "Conclusion : la somme des angles d’un triangle ne peut pas dépasser 180°.",
    tags: ["triangle", "defi", "open", "angles"],
  },
];