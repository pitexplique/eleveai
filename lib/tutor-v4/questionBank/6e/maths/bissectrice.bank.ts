// ─── La bissectrice d'un angle (6e) ────────────────────────────────────────────
//
// ⛔ POURQUOI CETTE BANQUE EXISTE (22/08/2026). « Bissectrice d'un angle
// saillant » est une section entière du chapitre « Étude de configurations
// planes » du programme de 6e, et le coach n'en avait AUCUNE micro. Le canvas
// `angle` savait pourtant déjà poser un rapporteur sur une figure et mettre en
// avant chaque geste de la mesure.
//
// Les objectifs, mot pour mot (Exemples pour la mise en œuvre des programmes,
// 6e, 2025, p. 14) :
//   · « Connaître la définition de la bissectrice d'un angle saillant » ;
//   · « Utiliser la définition de la bissectrice d'un angle pour effectuer des
//     constructions et résoudre des problèmes ».
//
// Et les exemples de réussite :
//   « La bissectrice d'un angle saillant est définie comme la droite qui
//   partage cet angle en deux angles adjacents égaux. » · « L'élève observe,
//   puis admet, que la bissectrice d'un angle est l'axe de symétrie de cet
//   angle. » · « L'élève construit la bissectrice d'un angle par pliage, puis à
//   l'aide d'un rapporteur. » · « L'élève élabore un programme de construction
//   permettant à un camarade de reproduire la figure. »
//
// ⭐ LA BISSECTRICE EST À L'ANGLE CE QUE LA MÉDIATRICE EST AU SEGMENT : la
// droite qui le coupe en deux parts égales, et son axe de symétrie. Les deux
// notions se construisent au compas de la même façon, et se plient de la même
// façon. Plusieurs items le disent explicitement — un élève qui voit le
// parallèle retient les deux au lieu d'une.
//
// ⚠️ « SAILLANT » N'EST PAS UN DÉTAIL. Deux demi-droites de même origine
// définissent DEUX angles : le saillant (le plus petit, celui qu'on dessine) et
// le rentrant. Le programme se limite au saillant, et le mot est dans
// l'intitulé même de l'objectif.

import type { TutorBankItemV4, DroitesCanvasData, AngleCanvasData } from "@/lib/tutor-v4/types";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function expl(calcul: string) {
  return (
    "Définition : la bissectrice d'un angle saillant est la droite qui le partage en deux angles adjacents égaux.\n\n" +
    "Méthode : on mesure l'angle et on prend sa moitié, ou on plie de façon à amener un côté sur l'autre.\n\n" +
    "Calcul : " +
    calcul +
    "\n\nConclusion : on garde la réponse obtenue."
  );
}

/** Un angle seul, avec sa mesure — le point de départ avant de le partager. */
function angleSeul(deg: number, mesure?: string): AngleCanvasData {
  return {
    kind: "angle",
    size: { width: 300, height: 240 },
    angle: {
      angleDeg: deg,
      labels: { vertex: "O", left: "A", right: "B", angle: mesure },
      display: { showLabels: true, showMeasure: Boolean(mesure), showArc: true },
    },
  };
}

/**
 * L'angle AOB et sa bissectrice [OC) : trois demi-droites de même origine.
 * Le canvas `angle` ne sait dessiner qu'un angle ; `droites` sait poser
 * plusieurs demi-droites au même point, et c'est ce qu'il faut ici.
 */
function angleEtBissectrice(deg: number, opts: { bissectriceJuste?: boolean } = {}): DroitesCanvasData {
  const O = { x: 60, y: 225 };
  const L = 175;
  const partage = opts.bissectriceJuste === false ? deg * 0.3 : deg / 2;
  const rad = (d: number) => (d * Math.PI) / 180;
  const bout = (d: number) => ({
    x: O.x + L * Math.cos(rad(d)),
    y: O.y - L * Math.sin(rad(d)),
  });
  const A = bout(deg);
  const B = bout(0);
  const C = bout(partage);
  return {
    kind: "droites",
    size: { width: 320, height: 265 },
    lines: [
      { id: "OA", type: "demi_droite", from: O, to: A },
      { id: "OB", type: "demi_droite", from: O, to: B },
      {
        id: "OC",
        type: "demi_droite",
        from: O,
        to: C,
        color: "#2563eb",
        dashed: true,
      },
    ],
    points: [
      { x: O.x, y: O.y, label: "O", highlight: true },
      { x: A.x, y: A.y, label: "A" },
      { x: B.x, y: B.y, label: "B" },
      { x: C.x, y: C.y, label: "C", color: "#2563eb" },
    ],
    display: { showLabels: true, showPoints: true },
  };
}

export const bissectriceBank: TutorBankItemV4[] = [
  // =========================
  // BISSECTRICE_DEFINITION
  // =========================
  {
    kind: "fixed",
    id: "bissectrice_definition_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "bissectrice_angle",
    microId: "bissectrice_definition",
    difficulty: 1,
    theme: "neutral",
    text: "Qu'est-ce que la bissectrice d'un angle saillant ?",
    format: "qcm",
    choices: [
      "la droite qui partage l'angle en deux angles adjacents égaux",
      "la droite qui passe par le sommet de l'angle",
      "la droite perpendiculaire à l'un des côtés de l'angle",
      "la droite qui joint les extrémités des deux côtés",
    ],
    expected: ["la droite qui partage l'angle en deux angles adjacents égaux"],
    comparator: "mcq_exact",
    hint: "Elle coupe l'angle en deux parts identiques.",
    explanation: expl(
      "La bissectrice partage l'angle en DEUX ANGLES ÉGAUX, côte à côte (on dit adjacents). Passer par le sommet ne suffit pas : une infinité de droites le font, et une seule partage l'angle en deux parts égales."
    ),
    tags: ["bissectrice_angle", "definition", "canvas", "qcm"],
    canvas: angleEtBissectrice(80),
  },
  {
    kind: "fixed",
    id: "bissectrice_definition_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "bissectrice_angle",
    microId: "bissectrice_definition",
    difficulty: 2,
    theme: "neutral",
    text: "La bissectrice d'un angle de 80° le partage en deux angles. Combien mesure chacun ?",
    format: "short",
    expected: ["40"],
    comparator: "number_equal",
    hint: "Deux parts égales, donc la moitié.",
    explanation: expl("80 ÷ 2 = 40. Chacun des deux angles mesure 40°."),
    tags: ["bissectrice_angle", "definition", "canvas", "short"],
    canvas: angleSeul(80, "80°"),
  },
  {
    kind: "fixed",
    id: "bissectrice_definition_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "bissectrice_angle",
    microId: "bissectrice_definition",
    difficulty: 3,
    theme: "neutral",
    text: "Que représente aussi la bissectrice d'un angle ?",
    format: "qcm",
    choices: [
      "l'axe de symétrie de l'angle",
      "la médiatrice du segment qui joint les deux côtés",
      "la hauteur de l'angle",
      "la perpendiculaire à l'angle",
    ],
    expected: ["l'axe de symétrie de l'angle"],
    comparator: "mcq_exact",
    hint: "Si on plie la feuille le long de la bissectrice, que devient l'angle ?",
    explanation: expl(
      "En pliant la feuille le long de la bissectrice, un côté de l'angle vient exactement sur l'autre : c'est donc l'axe de symétrie de l'angle. La bissectrice est à l'angle ce que la médiatrice est au segment."
    ),
    tags: ["bissectrice_angle", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "bissectrice_definition_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "bissectrice_angle",
    microId: "bissectrice_definition",
    difficulty: 3,
    theme: "neutral",
    text: "Observe la figure. La demi-droite [OC) est-elle la bissectrice de l'angle AOB ?",
    format: "qcm",
    choices: [
      "non : elle partage l'angle en deux parts inégales",
      "oui : elle passe par le sommet O",
      "oui : elle est à l'intérieur de l'angle",
      "non : une bissectrice ne peut pas être en pointillés",
    ],
    expected: ["non : elle partage l'angle en deux parts inégales"],
    comparator: "mcq_exact",
    hint: "Compare les deux parts de part et d'autre de [OC).",
    explanation: expl(
      "[OC) passe bien par le sommet et se trouve à l'intérieur de l'angle, mais elle le coupe en deux parts visiblement différentes. Or la bissectrice partage l'angle en deux angles ÉGAUX : ce n'est donc pas elle."
    ),
    tags: ["bissectrice_angle", "definition", "canvas", "piege", "qcm"],
    canvas: angleEtBissectrice(90, { bissectriceJuste: false }),
  },
  {
    kind: "fixed",
    id: "bissectrice_definition_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "bissectrice_angle",
    microId: "bissectrice_definition",
    difficulty: 3,
    theme: "neutral",
    text: "Que veut dire « angle saillant » ?",
    format: "qcm",
    choices: [
      "l'angle le plus petit des deux formés par les deux demi-droites",
      "un angle qui mesure plus de 180°",
      "un angle qui dépasse de la figure",
      "un angle dont les côtés sont tracés en gras",
    ],
    expected: ["l'angle le plus petit des deux formés par les deux demi-droites"],
    comparator: "mcq_exact",
    hint: "Deux demi-droites de même origine découpent le plan en deux morceaux.",
    explanation: expl(
      "Deux demi-droites de même origine définissent deux angles : le SAILLANT, inférieur à 180°, et le RENTRANT, qui est l'autre morceau. Le programme de 6e s'en tient au saillant — c'est celui qu'on dessine et qu'on mesure au rapporteur."
    ),
    tags: ["bissectrice_angle", "definition", "vocabulaire", "qcm"],
  },
  {
    kind: "template",
    id: "bissectrice_definition_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "bissectrice_angle",
    microId: "bissectrice_definition",
    difficulty: 2,
    theme: "neutral",
    hint: "La bissectrice coupe l'angle en deux moitiés.",
    tags: ["bissectrice_angle", "definition", "template"],
    generate: () => {
      const moitie = randomInt(10, 84);
      const angle = 2 * moitie;
      return {
        text: `La bissectrice d'un angle de ${angle}° le partage en deux angles adjacents. Combien mesure chacun d'eux ?`,
        format: "short",
        expected: [String(moitie), `${moitie}°`],
        comparator: "number_equal",
        explanation: expl(`${angle} ÷ 2 = ${moitie}. Chacun des deux angles mesure ${moitie}°.`),
        canvas: angleSeul(angle, `${angle}°`),
      };
    },
  },
  {
    kind: "template",
    id: "bissectrice_definition_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "bissectrice_angle",
    microId: "bissectrice_definition",
    difficulty: 4,
    theme: "neutral",
    hint: "Dis ce qu'il faut vérifier, pas seulement ce qu'on voit.",
    tags: ["bissectrice_angle", "definition", "template", "ouverte"],
    generate: () => {
      const cas = [
        {
          q: "Explique pourquoi passer par le sommet d'un angle ne suffit pas à être sa bissectrice.",
          mots: ["égaux", "egaux", "deux parts", "moitié", "moitie", "infinité", "infinite"],
          r: "Une infinité de droites passent par le sommet d'un angle, et elles le découpent de toutes les façons possibles. Une seule le partage en deux angles ÉGAUX, et c'est elle la bissectrice. Il faut donc vérifier l'égalité des deux parts, pas seulement le passage par le sommet.",
        },
        {
          q: "Explique en quoi la bissectrice d'un angle ressemble à la médiatrice d'un segment.",
          mots: ["deux parts", "égales", "egales", "symétrie", "symetrie", "pliage", "milieu"],
          r: "Les deux coupent un objet en deux parts égales, et les deux sont son axe de symétrie. La médiatrice partage un segment en deux morceaux de même longueur et amène A sur B par pliage ; la bissectrice partage un angle en deux angles de même mesure et amène un côté sur l'autre par pliage.",
        },
        {
          q: "Explique pourquoi on précise « angle saillant » dans la définition de la bissectrice.",
          mots: ["rentrant", "saillant", "deux angles", "180"],
          r: "Deux demi-droites de même origine forment deux angles : le saillant, plus petit que l'angle plat, et le rentrant, qui est tout le reste du tour. Sans préciser, on ne saurait pas lequel on partage. Le programme de 6e se limite au saillant.",
        },
      ];
      const c = cas[randomInt(0, cas.length - 1)];
      return {
        text: c.q,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: expl(c.r),
      };
    },
  },

  // =========================
  // BISSECTRICE_CONSTRUIRE
  // =========================
  {
    kind: "fixed",
    id: "bissectrice_construire_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "bissectrice_angle",
    microId: "bissectrice_construire",
    difficulty: 2,
    theme: "neutral",
    text: "On plie une feuille de façon à amener un côté de l'angle exactement sur l'autre. Que représente le pli ?",
    format: "qcm",
    choices: [
      "la bissectrice de l'angle",
      "la médiatrice de l'angle",
      "la perpendiculaire à l'un des côtés",
      "un côté de l'angle",
    ],
    expected: ["la bissectrice de l'angle"],
    comparator: "mcq_exact",
    hint: "Le pli est l'axe de symétrie de la figure pliée.",
    explanation: expl(
      "Le pli qui amène un côté sur l'autre est l'axe de symétrie de l'angle : de part et d'autre, les deux parts se superposent exactement, donc elles sont égales. C'est la bissectrice."
    ),
    tags: ["bissectrice_angle", "construire", "qcm"],
  },
  {
    kind: "fixed",
    id: "bissectrice_construire_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "bissectrice_angle",
    microId: "bissectrice_construire",
    difficulty: 2,
    theme: "neutral",
    text: "Comment tracer la bissectrice d'un angle avec un rapporteur ?",
    format: "qcm",
    choices: [
      "on mesure l'angle, on divise sa mesure par 2, puis on trace la demi-droite à cette mesure",
      "on mesure l'angle, puis on trace une demi-droite à 45° d'un côté",
      "on pose le rapporteur au hasard à l'intérieur de l'angle",
      "on mesure l'angle et on multiplie sa mesure par 2",
    ],
    expected: [
      "on mesure l'angle, on divise sa mesure par 2, puis on trace la demi-droite à cette mesure",
    ],
    comparator: "mcq_exact",
    hint: "La bissectrice est à la moitié de la mesure, en partant d'un côté.",
    explanation: expl(
      "On mesure d'abord l'angle au rapporteur — par exemple 74°. On calcule sa moitié : 37°. On repose le rapporteur, le centre sur le sommet et le zéro sur un côté, et on marque 37°. La demi-droite tracée est la bissectrice."
    ),
    tags: ["bissectrice_angle", "construire", "qcm"],
  },
  {
    kind: "fixed",
    id: "bissectrice_construire_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "bissectrice_angle",
    microId: "bissectrice_construire",
    difficulty: 3,
    theme: "neutral",
    text: "Un angle mesure 110°. À quelle graduation faut-il marquer un point pour tracer sa bissectrice ?",
    format: "short",
    expected: ["55"],
    comparator: "number_equal",
    hint: "La moitié de la mesure, en partant d'un côté.",
    explanation: expl(
      "110 ÷ 2 = 55. On marque un point à la graduation 55°, en comptant depuis le côté sur lequel le zéro du rapporteur est aligné."
    ),
    tags: ["bissectrice_angle", "construire", "canvas", "short"],
    canvas: angleSeul(110, "110°"),
  },
  {
    kind: "fixed",
    id: "bissectrice_construire_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "bissectrice_angle",
    microId: "bissectrice_construire",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève trace une demi-droite à 45° pour partager un angle de 110°. Que se passe-t-il ?",
    format: "qcm",
    choices: [
      "les deux parts font 45° et 65° : ce n'est pas la bissectrice",
      "c'est correct : 45° est toujours la bonne mesure",
      "les deux parts font 45° chacune",
      "l'angle devient un angle droit",
    ],
    expected: ["les deux parts font 45° et 65° : ce n'est pas la bissectrice"],
    comparator: "mcq_exact",
    hint: "45°, c'est la moitié de 90°, pas de 110°.",
    explanation: expl(
      "Il reste 110 − 45 = 65° de l'autre côté : les deux parts sont inégales. La moitié dépend de l'angle qu'on partage — ici 110 ÷ 2 = 55°, et non 45°, qui n'est la bonne réponse que pour un angle droit."
    ),
    tags: ["bissectrice_angle", "construire", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "bissectrice_construire_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "bissectrice_angle",
    microId: "bissectrice_construire",
    difficulty: 3,
    theme: "neutral",
    hint: "On divise la mesure par 2, puis on marque cette graduation.",
    tags: ["bissectrice_angle", "construire", "template"],
    generate: () => {
      const moitie = randomInt(12, 87);
      const angle = 2 * moitie;
      return {
        text: `Un angle mesure ${angle}°. À quelle graduation du rapporteur faut-il marquer un point pour tracer sa bissectrice ?`,
        format: "short",
        expected: [String(moitie), `${moitie}°`],
        comparator: "number_equal",
        explanation: expl(
          `${angle} ÷ 2 = ${moitie}. On aligne le zéro du rapporteur sur un côté, le centre sur le sommet, et on marque la graduation ${moitie}°.`
        ),
        canvas: angleSeul(angle, `${angle}°`),
      };
    },
  },
  {
    kind: "template",
    id: "bissectrice_construire_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "bissectrice_angle",
    microId: "bissectrice_construire",
    difficulty: 5,
    theme: "neutral",
    hint: "Écris des étapes qu'un camarade peut suivre sans te voir faire.",
    tags: ["bissectrice_angle", "construire", "template", "ouverte"],
    generate: () => {
      const cas = [
        {
          q: "Écris un programme de construction de la bissectrice d'un angle au rapporteur.",
          mots: ["mesure", "diviser", "moitié", "moitie", "sommet", "graduation", "tracer"],
          r: "1. Poser le centre du rapporteur sur le sommet de l'angle et aligner le zéro sur un côté. 2. Lire la mesure de l'angle. 3. Diviser cette mesure par 2. 4. Sans bouger le rapporteur, marquer un point à la graduation obtenue. 5. Tracer la demi-droite qui part du sommet et passe par ce point.",
        },
        {
          q: "Explique pourquoi le pliage donne la bissectrice sans qu'on ait besoin de mesurer quoi que ce soit.",
          mots: ["superpose", "symétrie", "symetrie", "égales", "egales", "pli", "côté sur", "cote sur"],
          r: "En amenant un côté exactement sur l'autre, les deux parts de l'angle se superposent : elles sont donc égales, quelle que soit la mesure de l'angle. Le pli est l'axe de symétrie de l'angle, c'est-à-dire sa bissectrice — et on n'a jamais eu besoin de connaître un nombre de degrés.",
        },
        {
          q: "Explique pourquoi il ne faut pas apprendre par cœur que « la bissectrice est à 45° ».",
          mots: ["dépend", "depend", "moitié", "moitie", "90", "angle droit"],
          r: "45° n'est la bonne réponse que pour un angle DROIT, puisque 90 ÷ 2 = 45. Pour tout autre angle, la moitié est différente : 55° pour un angle de 110°, 30° pour un angle de 60°. La bissectrice se calcule à partir de l'angle qu'on partage, elle ne se récite pas.",
        },
      ];
      const c = cas[randomInt(0, cas.length - 1)];
      return {
        text: c.q,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: expl(c.r),
      };
    },
  },

  // =========================
  // BISSECTRICE_PROBLEME
  // =========================
  {
    kind: "fixed",
    id: "bissectrice_probleme_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "bissectrice_angle",
    microId: "bissectrice_probleme",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la mesure des deux angles formés par la bissectrice d'un angle droit ?",
    format: "short",
    expected: ["45"],
    comparator: "number_equal",
    hint: "Un angle droit mesure 90°.",
    explanation: expl("Un angle droit mesure 90°, donc sa bissectrice forme deux angles de 90 ÷ 2 = 45°."),
    tags: ["bissectrice_angle", "probleme", "short"],
  },
  {
    kind: "fixed",
    id: "bissectrice_probleme_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "bissectrice_angle",
    microId: "bissectrice_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la mesure des deux angles formés par la bissectrice d'un angle plat ?",
    format: "short",
    expected: ["90"],
    comparator: "number_equal",
    hint: "Un angle plat mesure 180°.",
    explanation: expl(
      "Un angle plat mesure 180°, donc sa bissectrice forme deux angles de 180 ÷ 2 = 90° : elle est perpendiculaire aux deux côtés."
    ),
    tags: ["bissectrice_angle", "probleme", "short"],
  },
  {
    kind: "fixed",
    id: "bissectrice_probleme_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "bissectrice_angle",
    microId: "bissectrice_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "La demi-droite [OC) est la bissectrice de l'angle AOB, et l'angle AOC mesure 37°. Combien mesure l'angle AOB ?",
    format: "short",
    expected: ["74"],
    comparator: "number_equal",
    hint: "L'angle entier vaut deux fois la moitié.",
    explanation: expl(
      "[OC) est la bissectrice, donc les angles AOC et COB sont égaux : chacun mesure 37°. L'angle AOB vaut la somme des deux : 37 + 37 = 74°."
    ),
    tags: ["bissectrice_angle", "probleme", "canvas", "short"],
    canvas: angleEtBissectrice(74),
  },
  {
    kind: "fixed",
    id: "bissectrice_probleme_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "bissectrice_angle",
    microId: "bissectrice_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Dans un triangle équilatéral, combien mesurent les deux angles formés par la bissectrice d'un de ses angles ?",
    format: "short",
    expected: ["30"],
    comparator: "number_equal",
    hint: "Commence par la mesure d'un angle du triangle équilatéral.",
    explanation: expl(
      "Dans un triangle équilatéral, chaque angle mesure 60° (180 ÷ 3). La bissectrice le partage en deux : 60 ÷ 2 = 30°."
    ),
    tags: ["bissectrice_angle", "probleme", "short"],
  },
  {
    kind: "template",
    id: "bissectrice_probleme_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "bissectrice_angle",
    microId: "bissectrice_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Selon ce qu'on te donne, tu divises ou tu multiplies par 2.",
    tags: ["bissectrice_angle", "probleme", "template"],
    generate: () => {
      const moitie = randomInt(15, 80);
      const angle = 2 * moitie;
      const versLeTout = Math.random() < 0.5;
      return versLeTout
        ? {
            text: `La demi-droite [OC) est la bissectrice de l'angle AOB, et l'angle AOC mesure ${moitie}°. Combien mesure l'angle AOB ?`,
            format: "short",
            expected: [String(angle), `${angle}°`],
            comparator: "number_equal",
            explanation: expl(
              `Les deux angles AOC et COB sont égaux, donc l'angle AOB vaut ${moitie} + ${moitie} = ${angle}°.`
            ),
            canvas: angleEtBissectrice(angle),
          }
        : {
            text: `La demi-droite [OC) est la bissectrice de l'angle AOB, qui mesure ${angle}°. Combien mesure l'angle COB ?`,
            format: "short",
            expected: [String(moitie), `${moitie}°`],
            comparator: "number_equal",
            explanation: expl(`${angle} ÷ 2 = ${moitie}. L'angle COB mesure ${moitie}°.`),
            canvas: angleEtBissectrice(angle),
          };
    },
  },
  {
    kind: "template",
    id: "bissectrice_probleme_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "bissectrice_angle",
    microId: "bissectrice_probleme",
    difficulty: 5,
    theme: "neutral",
    hint: "Appuie-toi sur l'égalité des deux angles, pas sur le dessin.",
    tags: ["bissectrice_angle", "probleme", "template", "ouverte"],
    generate: () => {
      const cas = [
        {
          q: "Explique pourquoi la bissectrice d'un angle plat est perpendiculaire à ses deux côtés.",
          mots: ["180", "90", "moitié", "moitie", "droit"],
          r: "Un angle plat mesure 180°. Sa bissectrice le partage en deux angles égaux, donc de 180 ÷ 2 = 90° chacun. Un angle de 90° est un angle droit : la bissectrice est donc perpendiculaire aux deux côtés, qui sont alignés.",
        },
        {
          q: "On connaît seulement l'un des deux angles formés par une bissectrice. Explique comment retrouver l'angle entier.",
          mots: ["deux fois", "double", "égaux", "egaux", "multiplie", "somme"],
          r: "Les deux angles formés sont égaux par définition de la bissectrice. L'angle entier est donc la somme des deux, c'est-à-dire le double de celui qu'on connaît. Si l'un mesure 37°, l'angle entier mesure 74°.",
        },
        {
          q: "Explique pourquoi la bissectrice d'un angle d'un triangle équilatéral forme deux angles de 30°.",
          mots: ["60", "180", "trois", "équilatéral", "equilateral", "moitié", "moitie"],
          r: "Dans un triangle équilatéral, les trois angles sont égaux et leur somme vaut 180° : chacun mesure donc 180 ÷ 3 = 60°. La bissectrice partage l'un d'eux en deux parts égales : 60 ÷ 2 = 30°.",
        },
      ];
      const c = cas[randomInt(0, cas.length - 1)];
      return {
        text: c.q,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: expl(c.r),
      };
    },
  },

  // =========================
  // BISSECTRICE_DEFI
  // =========================
  {
    kind: "fixed",
    id: "bissectrice_defi_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "bissectrice_angle",
    microId: "bissectrice_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un angle mesure 90°. On trace sa bissectrice, puis la bissectrice de l'une des deux moitiés. Combien mesure le plus petit angle obtenu ?",
    format: "short",
    expected: ["22,5", "22.5"],
    comparator: "number_equal",
    hint: "On divise deux fois par 2.",
    explanation: expl(
      "La première bissectrice donne 90 ÷ 2 = 45°. La seconde partage ce 45° en deux : 45 ÷ 2 = 22,5°. Une mesure d'angle n'est pas forcément un nombre entier."
    ),
    tags: ["bissectrice_angle", "defi", "short"],
  },
  {
    kind: "fixed",
    id: "bissectrice_defi_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "bissectrice_angle",
    microId: "bissectrice_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Combien de bissectrices un angle saillant possède-t-il ?",
    format: "qcm",
    choices: [
      "une seule",
      "deux : une de chaque côté",
      "une infinité",
      "aucune, si l'angle n'est pas droit",
    ],
    expected: ["une seule"],
    comparator: "mcq_exact",
    hint: "Combien de demi-droites partagent l'angle en deux parts égales ?",
    explanation: expl(
      "Une seule demi-droite issue du sommet partage l'angle en deux parts égales : si on la déplace d'un degré, une part grandit et l'autre diminue. La bissectrice est donc unique, comme la médiatrice d'un segment."
    ),
    tags: ["bissectrice_angle", "defi", "qcm"],
  },
  {
    kind: "template",
    id: "bissectrice_defi_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "bissectrice_angle",
    microId: "bissectrice_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Partage deux fois de suite.",
    tags: ["bissectrice_angle", "defi", "template"],
    generate: () => {
      const quart = randomInt(8, 40);
      const angle = 4 * quart;
      return {
        text: `Un angle mesure ${angle}°. On trace sa bissectrice, puis la bissectrice de l'une des deux moitiés. Combien mesure le plus petit angle obtenu ?`,
        format: "short",
        expected: [String(quart), `${quart}°`],
        comparator: "number_equal",
        explanation: expl(
          `La première bissectrice donne ${angle} ÷ 2 = ${2 * quart}°. La seconde partage cette moitié en deux : ${2 * quart} ÷ 2 = ${quart}°.`
        ),
        canvas: angleSeul(angle, `${angle}°`),
      };
    },
  },
  {
    kind: "template",
    id: "bissectrice_defi_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "bissectrice_angle",
    microId: "bissectrice_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Compare avec la médiatrice, et dis ce qui joue le rôle de quoi.",
    tags: ["bissectrice_angle", "defi", "template", "ouverte"],
    generate: () => {
      const cas = [
        {
          q: "Explique pourquoi la bissectrice d'un angle est unique.",
          mots: ["une seule", "unique", "déplace", "deplace", "égales", "egales"],
          r: "Si on fait tourner d'un degré la demi-droite qui partage l'angle, l'une des deux parts gagne ce degré et l'autre le perd : elles ne sont plus égales. Il n'existe donc qu'une seule position qui convienne, et la bissectrice est unique.",
        },
        {
          q: "Compare la bissectrice d'un angle et la médiatrice d'un segment : qu'ont-elles en commun, et qu'est-ce qui change ?",
          mots: ["deux parts", "égales", "egales", "symétrie", "symetrie", "angle", "segment", "pliage"],
          r: "Toutes deux coupent un objet en deux parts égales et en sont l'axe de symétrie ; toutes deux s'obtiennent par pliage, en amenant une extrémité ou un côté sur l'autre. Ce qui change est l'objet et la grandeur partagée : la médiatrice partage une LONGUEUR, la bissectrice partage une MESURE D'ANGLE.",
        },
        {
          q: "Un élève affirme qu'en traçant plusieurs fois de suite des bissectrices, on finit toujours par tomber sur un nombre entier de degrés. Qu'en penses-tu ?",
          mots: ["non", "22,5", "22.5", "moitié", "moitie", "décimal", "decimal"],
          r: "C'est faux. Partager 90° donne 45°, puis 22,5° : dès la deuxième bissectrice, le nombre n'est plus entier. Une mesure d'angle est un nombre comme un autre, elle peut avoir une partie décimale — et en continuant, on obtient 11,25°, puis 5,625°.",
        },
      ];
      const c = cas[randomInt(0, cas.length - 1)];
      return {
        text: c.q,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: expl(c.r),
      };
    },
  },
];
