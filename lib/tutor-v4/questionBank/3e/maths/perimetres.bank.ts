// lib/tutor-v4/question-banks/maths/3e/perimetres.bank.ts

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
  return shuffle(Array.from(new Set([correct, ...wrongs]))).slice(0, 4);
}

function formatNumber(n: number) {
  const rounded = Math.round(n * 100) / 100;
  return Number.isInteger(rounded)
    ? String(rounded)
    : String(rounded).replace(".", ",");
}

export const perimetresBank: TutorBankItemV4[] = [
  /* =========================
     PERIMETRE_COMPRENDRE
  ========================= */

  {
    kind: "template",
    id: "3e_aire_perimetre_comprendre_tpl_1_contour",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_comprendre",
    difficulty: 1,
    theme: "neutral",
    hint: "Le périmètre mesure le contour d’une figure.",
    tags: ["perimetre", "comprendre", "template"],
    generate: () => {
      const mot = randomChoice(["contour", "tour", "bord"]);

      return {
        text: `Le périmètre d’une figure correspond à son...`,
        format: "qcm",
        choices: makeChoices(mot, ["surface", "volume", "hauteur"]),
        expected: [mot],
        comparator: "mcq_exact",
        explanation:
          "Définition : le périmètre mesure la longueur du contour d’une figure.\n\n" +
          "Méthode : on imagine que l’on fait le tour de la figure.\n\n" +
          "Calcul : on additionne les longueurs des côtés du contour.\n\n" +
          "Conclusion : le périmètre correspond au contour de la figure.",
      };
    },
  },

  {
    kind: "template",
    id: "3e_aire_perimetre_comprendre_tpl_2_unite",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_comprendre",
    difficulty: 1,
    theme: "neutral",
    hint: "Un périmètre est une longueur.",
    tags: ["perimetre", "unite", "template"],
    generate: () => {
      const unite = randomChoice(["cm", "m", "km"]);

      return {
        text: `Si les côtés d’une figure sont mesurés en ${unite}, dans quelle unité s’exprime son périmètre ?`,
        format: "qcm",
        choices: makeChoices(unite, [`${unite}²`, `${unite}³`, "degrés"]),
        expected: [unite],
        comparator: "mcq_exact",
        explanation:
          "Définition : un périmètre est une longueur.\n\n" +
          "Méthode : une longueur s’exprime avec une unité simple, pas au carré.\n\n" +
          `Calcul : si les côtés sont en ${unite}, le périmètre est aussi en ${unite}.\n\n` +
          `Conclusion : l’unité correcte est ${unite}.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_aire_perimetre_comprendre_piege_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "Un élève dit : « Le périmètre mesure la surface d’une figure. » A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "La surface correspond à l’aire.",
    explanation:
      "Définition : le périmètre mesure le contour, tandis que l’aire mesure la surface.\n\n" +
      "Méthode : on se demande si l’on mesure le tour ou l’intérieur.\n\n" +
      "Calcul : faire le tour donne un périmètre ; remplir la figure donne une aire.\n\n" +
      "Conclusion : l’élève confond périmètre et aire.",
    tags: ["perimetre", "aire", "piege"],
  },

  {
    kind: "fixed",
    id: "3e_aire_perimetre_comprendre_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "Explique avec tes mots ce qu’est le périmètre d’une figure.",
    format: "open",
    expected: ["contour", "tour", "longueur"],
    comparator: "contains_keyword",
    hint: "Imagine que tu marches autour de la figure.",
    explanation:
      "Définition : le périmètre est la longueur du contour d’une figure.\n\n" +
      "Méthode : pour le trouver, on additionne les longueurs des côtés qui forment le tour.\n\n" +
      "Calcul : par exemple, le périmètre d’un triangle est la somme de ses trois côtés.\n\n" +
      "Conclusion : le périmètre mesure le tour de la figure.",
    tags: ["perimetre", "open", "definition"],
  },
  /* =========================
     PERIMETRE_POLYGONE
  ========================= */

  {
    kind: "template",
    id: "3e_aire_perimetre_polygone_tpl_1_rectangle",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_polygone",
    difficulty: 2,
    theme: "neutral",
    hint: "Périmètre du rectangle = 2 × (longueur + largeur).",
    tags: ["perimetre", "rectangle", "template"],
    generate: () => {
      const L = randomInt(5, 18);
      const l = randomInt(2, 10);
      const p = 2 * (L + l);

      return {
        text: `Un rectangle mesure ${L} cm de longueur et ${l} cm de largeur. Quel est son périmètre ?`,
        format: "short",
        expected: [String(p)],
        comparator: "number_equal",
        explanation:
          "Définition : le périmètre d’un polygone est la somme des longueurs de ses côtés.\n\n" +
          "Méthode : pour un rectangle, on additionne deux longueurs et deux largeurs.\n\n" +
          `Calcul : 2 × (${L} + ${l}) = ${p}.\n\n` +
          `Conclusion : le périmètre du rectangle est ${p} cm.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_aire_perimetre_polygone_tpl_2_triangle",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_polygone",
    difficulty: 2,
    theme: "neutral",
    hint: "Additionne les trois côtés.",
    tags: ["perimetre", "triangle", "template"],
    generate: () => {
      const a = randomInt(4, 12);
      const b = randomInt(4, 12);
      const c = randomInt(Math.abs(a - b) + 1, a + b - 1);
      const p = a + b + c;

      return {
        text: `Un triangle a pour côtés ${a} cm, ${b} cm et ${c} cm. Quel est son périmètre ?`,
        format: "short",
        expected: [String(p)],
        comparator: "number_equal",
        explanation:
          "Définition : le périmètre d’un triangle est la somme de ses trois côtés.\n\n" +
          "Méthode : on additionne toutes les longueurs du contour.\n\n" +
          `Calcul : ${a} + ${b} + ${c} = ${p}.\n\n` +
          `Conclusion : le périmètre du triangle est ${p} cm.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_aire_perimetre_polygone_tpl_3_carre",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_polygone",
    difficulty: 2,
    theme: "neutral",
    hint: "Un carré a quatre côtés de même longueur.",
    tags: ["perimetre", "carre", "template"],
    generate: () => {
      const c = randomInt(3, 15);
      const p = 4 * c;

      return {
        text: `Un carré a un côté de ${c} cm. Quel est son périmètre ?`,
        format: "short",
        expected: [String(p)],
        comparator: "number_equal",
        explanation:
          "Définition : le périmètre d’un carré est la somme de ses quatre côtés.\n\n" +
          "Méthode : comme les quatre côtés sont égaux, on calcule 4 × côté.\n\n" +
          `Calcul : 4 × ${c} = ${p}.\n\n` +
          `Conclusion : le périmètre du carré est ${p} cm.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_aire_perimetre_polygone_tpl_4_polygone",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_polygone",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne toutes les longueurs du contour.",
    tags: ["perimetre", "polygone", "template"],
    generate: () => {
      const sides = [
        randomInt(3, 10),
        randomInt(3, 10),
        randomInt(3, 10),
        randomInt(3, 10),
        randomInt(3, 10),
      ];
      const p = sides.reduce((s, v) => s + v, 0);

      return {
        text: `Un pentagone a pour côtés ${sides.join(" cm ; ")} cm. Quel est son périmètre ?`,
        format: "short",
        expected: [String(p)],
        comparator: "number_equal",
        explanation:
          "Définition : le périmètre d’un polygone est la somme des longueurs de tous ses côtés.\n\n" +
          "Méthode : on additionne les cinq longueurs données.\n\n" +
          `Calcul : ${sides.join(" + ")} = ${p}.\n\n` +
          `Conclusion : le périmètre du pentagone est ${p} cm.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_aire_perimetre_polygone_tpl_5_retrouver_cote_carre",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_polygone",
    difficulty: 3,
    theme: "neutral",
    hint: "Dans un carré, périmètre = 4 × côté.",
    tags: ["perimetre", "carre", "inverse", "template"],
    generate: () => {
      const cote = randomInt(4, 15);
      const p = 4 * cote;

      return {
        text: `Un carré a un périmètre de ${p} cm. Quelle est la longueur de son côté ?`,
        format: "short",
        expected: [String(cote)],
        comparator: "number_equal",
        explanation:
          "Définition : un carré possède quatre côtés de même longueur.\n\n" +
          "Méthode : pour retrouver le côté, on divise le périmètre par 4.\n\n" +
          `Calcul : ${p} ÷ 4 = ${cote}.\n\n` +
          `Conclusion : le côté mesure ${cote} cm.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_aire_perimetre_polygone_tpl_6_reunion",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_polygone",
    difficulty: 3,
    theme: "reunion",
    hint: "Pour clôturer, on cherche le périmètre.",
    tags: ["perimetre", "rectangle", "reunion", "probleme", "template"],
    generate: () => {
      const L = randomChoice([12, 15, 18, 20, 24]);
      const l = randomChoice([6, 8, 10, 12]);
      const p = 2 * (L + l);

      return {
        text:
          `À La Réunion, on veut clôturer un jardin rectangulaire de ${L} m sur ${l} m. ` +
          `Quelle longueur de clôture faut-il prévoir ?`,
        format: "short",
        expected: [String(p)],
        comparator: "number_equal",
        explanation:
          "Définition : la longueur de clôture correspond au périmètre du jardin.\n\n" +
          "Méthode : le jardin est rectangulaire, donc on calcule 2 × (longueur + largeur).\n\n" +
          `Calcul : 2 × (${L} + ${l}) = ${p}.\n\n` +
          `Conclusion : il faut prévoir ${p} m de clôture.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_aire_perimetre_polygone_piege_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_polygone",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève calcule le périmètre d’un rectangle de 8 cm sur 5 cm ainsi : 8 × 5 = 40. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "8 × 5 donne l’aire, pas le périmètre.",
    explanation:
      "Définition : le périmètre mesure le contour d’une figure.\n\n" +
      "Méthode : pour un rectangle, on additionne les quatre côtés.\n\n" +
      "Calcul : 2 × (8 + 5) = 26.\n\n" +
      "Conclusion : l’élève a confondu périmètre et aire.",
    tags: ["perimetre", "rectangle", "piege", "aire"],
  },

  {
    kind: "fixed",
    id: "3e_aire_perimetre_polygone_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_polygone",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment calculer le périmètre d’un polygone.",
    format: "open",
    expected: ["additionne", "côtés", "contour"],
    comparator: "contains_keyword",
    hint: "Un polygone est formé de plusieurs côtés.",
    explanation:
      "Définition : le périmètre d’un polygone est la longueur totale de son contour.\n\n" +
      "Méthode : on repère tous les côtés du contour.\n\n" +
      "Calcul : on additionne toutes leurs longueurs.\n\n" +
      "Conclusion : le périmètre est la somme des côtés du polygone.",
    tags: ["perimetre", "polygone", "open"],
  },
    /* =========================
     PERIMETRE_CERCLE
  ========================= */

  {
    kind: "template",
    id: "3e_aire_perimetre_cercle_tpl_1_rayon_exact",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_cercle",
    difficulty: 2,
    theme: "neutral",
    hint: "Longueur d’un cercle = 2πr.",
    tags: ["perimetre", "cercle", "rayon", "template"],
    generate: () => {
      const r = randomChoice([2, 3, 4, 5, 6, 8]);
      const exact = `${2 * r}π`;

      return {
        text: `Un cercle a un rayon de ${r} cm. Quelle est sa longueur exacte ?`,
        format: "qcm",
        choices: makeChoices(exact, [
          `${r}π`,
          `${r * r}π`,
          `${2 * r * r}π`,
        ]),
        expected: [exact],
        comparator: "mcq_exact",
        explanation:
          "Définition : la longueur d’un cercle correspond à son périmètre.\n\n" +
          "Méthode : on utilise la formule 2πr.\n\n" +
          `Calcul : 2 × π × ${r} = ${exact}.\n\n` +
          `Conclusion : la longueur exacte du cercle est ${exact} cm.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_aire_perimetre_cercle_tpl_2_diametre_exact",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_cercle",
    difficulty: 2,
    theme: "neutral",
    hint: "Avec le diamètre, la formule est πd.",
    tags: ["perimetre", "cercle", "diametre", "template"],
    generate: () => {
      const d = randomChoice([4, 6, 8, 10, 12, 14]);
      const exact = `${d}π`;

      return {
        text: `Un cercle a un diamètre de ${d} cm. Quelle est sa longueur exacte ?`,
        format: "short",
        expected: [exact, `${d}pi`, `${d}π cm`, `${d}pi cm`],
        comparator: "exact_text",
        explanation:
          "Définition : la longueur d’un cercle est son périmètre.\n\n" +
          "Méthode : quand on connaît le diamètre, on utilise la formule π × diamètre.\n\n" +
          `Calcul : π × ${d} = ${exact}.\n\n` +
          `Conclusion : la longueur exacte du cercle est ${exact} cm.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_aire_perimetre_cercle_tpl_3_approx",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_cercle",
    difficulty: 3,
    theme: "neutral",
    hint: "Utilise 2πr avec π ≈ 3,14.",
    tags: ["perimetre", "cercle", "approximation", "template"],
    generate: () => {
      const r = randomChoice([2, 3, 4, 5, 6]);
      const approx = 2 * 3.14 * r;

      return {
        text: `En prenant π ≈ 3,14, calculer la longueur d’un cercle de rayon ${r} cm.`,
        format: "short",
        expected: [formatNumber(approx)],
        comparator: "number_equal",
        explanation:
          "Définition : la longueur d’un cercle se calcule avec 2πr.\n\n" +
          "Méthode : on remplace π par 3,14.\n\n" +
          `Calcul : 2 × 3,14 × ${r} = ${formatNumber(approx)}.\n\n` +
          `Conclusion : la longueur du cercle est environ ${formatNumber(approx)} cm.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_aire_perimetre_cercle_tpl_4_reunion",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_cercle",
    difficulty: 3,
    theme: "reunion",
    hint: "Un tour de rond-point correspond à la longueur d’un cercle.",
    tags: ["perimetre", "cercle", "reunion", "template"],
    generate: () => {
      const d = randomChoice([20, 30, 40, 50]);
      const exact = `${d}π`;

      return {
        text:
          `À La Réunion, un rond-point est modélisé par un cercle de diamètre ${d} m. ` +
          `Quelle est la longueur exacte d’un tour de rond-point ?`,
        format: "qcm",
        choices: makeChoices(exact, [
          `${d / 2}π`,
          `${d * d}π`,
          `${2 * d}π`,
        ]),
        expected: [exact],
        comparator: "mcq_exact",
        explanation:
          "Définition : faire un tour de rond-point revient à parcourir le périmètre d’un cercle.\n\n" +
          "Méthode : avec le diamètre, on utilise la formule πd.\n\n" +
          `Calcul : π × ${d} = ${exact}.\n\n` +
          `Conclusion : un tour mesure ${exact} m exactement.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_aire_perimetre_cercle_piege_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_cercle",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève utilise la formule πr² pour calculer la longueur d’un cercle. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "πr² sert à calculer une aire.",
    explanation:
      "Définition : la longueur d’un cercle mesure son contour.\n\n" +
      "Méthode : on distingue longueur du cercle et aire du disque.\n\n" +
      "Calcul : la longueur du cercle est 2πr, alors que l’aire du disque est πr².\n\n" +
      "Conclusion : l’élève confond périmètre et aire.",
    tags: ["perimetre", "cercle", "piege", "aire"],
  },

  {
    kind: "fixed",
    id: "3e_aire_perimetre_cercle_piege_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_cercle",
    difficulty: 3,
    theme: "neutral",
    text: "Un cercle a un diamètre de 12 cm. Un élève calcule 2π × 12. A-t-il utilisé correctement la donnée ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "2πr utilise le rayon, pas le diamètre.",
    explanation:
      "Définition : la formule 2πr utilise le rayon.\n\n" +
      "Méthode : si on connaît le diamètre, on peut utiliser directement πd.\n\n" +
      "Calcul : ici, diamètre = 12 cm, donc longueur = 12π cm.\n\n" +
      "Conclusion : l’élève a utilisé le diamètre comme si c’était le rayon.",
    tags: ["perimetre", "cercle", "piege", "diametre"],
  },

  {
    kind: "fixed",
    id: "3e_aire_perimetre_cercle_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_cercle",
    difficulty: 4,
    theme: "neutral",
    text: "Explique la différence entre la longueur d’un cercle et l’aire d’un disque.",
    format: "open",
    expected: ["contour", "surface", "2πr", "πr²"],
    comparator: "contains_keyword",
    hint: "La longueur mesure le tour, l’aire mesure l’intérieur.",
    explanation:
      "Définition : la longueur du cercle mesure son contour, l’aire du disque mesure sa surface intérieure.\n\n" +
      "Méthode : on choisit la formule selon ce que l’on cherche.\n\n" +
      "Calcul : longueur = 2πr ; aire = πr².\n\n" +
      "Conclusion : il faut bien distinguer contour et surface.",
    tags: ["perimetre", "cercle", "open", "aire"],
  },
    /* =========================
     PERIMETRE_FIGURE_COMPOSEE
  ========================= */

  {
    kind: "template",
    id: "3e_aire_perimetre_figure_composee_tpl_1_rectangle_demi_cercle",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_figure_composee",
    difficulty: 4,
    theme: "neutral",
    hint: "Attention : le diamètre du demi-cercle n’est pas forcément à compter s’il est collé au rectangle.",
    tags: ["perimetre", "figure_composee", "demi_cercle", "template"],
    generate: () => {
      const L = randomChoice([8, 10, 12, 14]);
      const h = randomChoice([4, 6, 8]);
      const rayon = h / 2;
      const exact = `${L * 2 + h}+${rayon}π`;

      return {
        text:
          `Une figure est composée d’un rectangle de longueur ${L} cm et de largeur ${h} cm, ` +
          `avec un demi-cercle collé sur un côté de largeur ${h} cm. ` +
          `Donner le périmètre exact de la figure.`,
        format: "short",
        expected: [
          exact,
          `${L * 2 + h} + ${rayon}π`,
          `${rayon}π+${L * 2 + h}`,
          `${rayon}π + ${L * 2 + h}`,
        ],
        comparator: "exact_text",
        explanation:
          "Définition : le périmètre d’une figure composée est la longueur de son contour extérieur.\n\n" +
          "Méthode : on additionne les côtés visibles du rectangle et l’arc du demi-cercle.\n\n" +
          `Calcul : les trois côtés visibles du rectangle donnent ${L} + ${L} + ${h} = ${L * 2 + h}.\n` +
          `Le demi-cercle a pour rayon ${rayon}, donc son arc mesure π × ${rayon} = ${rayon}π.\n\n` +
          `Conclusion : le périmètre exact est ${L * 2 + h} + ${rayon}π cm.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_aire_perimetre_figure_composee_tpl_2_polygone_et_arc",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_figure_composee",
    difficulty: 4,
    theme: "neutral",
    hint: "Additionne les segments du contour et la longueur de l’arc.",
    tags: ["perimetre", "figure_composee", "arc", "template"],
    generate: () => {
      const a = randomChoice([5, 6, 8, 10]);
      const b = randomChoice([4, 6, 8]);
      const r = randomChoice([2, 3, 4]);
      const segments = 2 * a + b;
      const exact = `${segments}+${r}π`;

      return {
        text:
          `Une figure possède trois segments extérieurs de longueurs ${a} cm, ${a} cm et ${b} cm, ` +
          `ainsi qu’un demi-cercle de rayon ${r} cm. Donner son périmètre exact.`,
        format: "short",
        expected: [
          exact,
          `${segments} + ${r}π`,
          `${r}π+${segments}`,
          `${r}π + ${segments}`,
        ],
        comparator: "exact_text",
        explanation:
          "Définition : un périmètre de figure composée combine des segments et parfois des arcs de cercle.\n\n" +
          "Méthode : on additionne toutes les parties du contour extérieur.\n\n" +
          `Calcul : les segments mesurent ${a} + ${a} + ${b} = ${segments}.\n` +
          `Le demi-cercle de rayon ${r} cm a pour longueur ${r}π.\n\n` +
          `Conclusion : le périmètre exact est ${segments} + ${r}π cm.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_aire_perimetre_figure_composee_tpl_3_retrait_rectangle",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_figure_composee",
    difficulty: 4,
    theme: "neutral",
    hint: "Un trou ou une découpe peut ajouter du contour.",
    tags: ["perimetre", "figure_composee", "decoupe", "template"],
    generate: () => {
      const L = randomChoice([12, 14, 16]);
      const l = randomChoice([8, 10]);
      const a = randomChoice([3, 4, 5]);
      const b = randomChoice([2, 3, 4]);

      // rectangle avec encoche rectangulaire sur un côté : périmètre = périmètre grand rectangle + 2b
      const p = 2 * (L + l) + 2 * b;

      return {
        text:
          `On découpe une encoche rectangulaire de profondeur ${b} cm dans un rectangle de ${L} cm sur ${l} cm. ` +
          `La largeur de l’encoche est sur le bord extérieur. Quel est le périmètre de la nouvelle figure ?`,
        format: "short",
        expected: [String(p)],
        comparator: "number_equal",
        explanation:
          "Définition : le périmètre mesure tout le contour extérieur de la nouvelle figure.\n\n" +
          "Méthode : une encoche retire une partie du bord mais ajoute deux côtés de profondeur.\n\n" +
          `Calcul : périmètre du rectangle initial = 2 × (${L} + ${l}) = ${2 * (L + l)}.\n` +
          `L’encoche ajoute deux profondeurs : 2 × ${b} = ${2 * b}.\n` +
          `Périmètre total = ${2 * (L + l)} + ${2 * b} = ${p}.\n\n` +
          `Conclusion : le périmètre de la nouvelle figure est ${p} cm.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_aire_perimetre_figure_composee_tpl_4_reunion",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_figure_composee",
    difficulty: 4,
    theme: "reunion",
    hint: "Pour une clôture, on cherche uniquement le contour extérieur.",
    tags: ["perimetre", "figure_composee", "reunion", "template"],
    generate: () => {
      const L = randomChoice([20, 24, 30]);
      const l = randomChoice([10, 12, 15]);
      const r = randomChoice([3, 4, 5]);

      const segments = 2 * L + l;
      const exact = `${segments}+${r}π`;

      return {
        text:
          `À La Réunion, un jardin est formé d’un rectangle de ${L} m sur ${l} m ` +
          `et d’un demi-cercle de rayon ${r} m placé sur un côté. ` +
          `Donner la longueur exacte de clôture nécessaire.`,
        format: "short",
        expected: [
          exact,
          `${segments} + ${r}π`,
          `${r}π+${segments}`,
          `${r}π + ${segments}`,
        ],
        comparator: "exact_text",
        explanation:
          "Définition : la clôture correspond au périmètre extérieur du jardin.\n\n" +
          "Méthode : on additionne les segments extérieurs et l’arc du demi-cercle.\n\n" +
          `Calcul : les segments droits donnent ${segments} m.\n` +
          `L’arc du demi-cercle mesure ${r}π m.\n\n` +
          `Conclusion : il faut ${segments} + ${r}π m de clôture.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_aire_perimetre_figure_composee_piege_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_figure_composee",
    difficulty: 4,
    theme: "neutral",
    text:
      "Pour calculer le périmètre d’une figure composée, faut-il additionner toutes les longueurs visibles, même celles à l’intérieur de la figure ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le périmètre correspond uniquement au contour extérieur.",
    explanation:
      "Définition : le périmètre est la longueur du contour extérieur d’une figure.\n\n" +
      "Méthode : on ne compte que les segments ou arcs qui forment le bord de la figure.\n\n" +
      "Calcul : une longueur intérieure peut aider à calculer, mais elle ne fait pas partie du périmètre.\n\n" +
      "Conclusion : il ne faut pas compter les longueurs intérieures si elles ne sont pas sur le contour.",
    tags: ["perimetre", "figure_composee", "piege", "contour"],
  },

  {
    kind: "fixed",
    id: "3e_aire_perimetre_figure_composee_piege_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_figure_composee",
    difficulty: 4,
    theme: "neutral",
    text:
      "Une figure composée d’un rectangle et d’un demi-cercle : l’élève additionne l’aire du rectangle et l’aire du demi-cercle pour obtenir le périmètre. Est-ce correct ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le périmètre est une longueur, pas une surface.",
    explanation:
      "Définition : le périmètre mesure une longueur de contour.\n\n" +
      "Méthode : il faut additionner des longueurs, pas des aires.\n\n" +
      "Calcul : l’aire du rectangle et l’aire du demi-cercle donnent une surface totale, pas un contour.\n\n" +
      "Conclusion : l’élève confond périmètre et aire.",
    tags: ["perimetre", "figure_composee", "piege", "aire"],
  },

  {
    kind: "fixed",
    id: "3e_aire_perimetre_figure_composee_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_figure_composee",
    difficulty: 5,
    theme: "neutral",
    text:
      "Explique comment calculer le périmètre d’une figure composée.",
    format: "open",
    expected: ["contour", "segments", "arcs", "extérieur"],
    comparator: "contains_keyword",
    hint: "Il faut suivre seulement le bord extérieur de la figure.",
    explanation:
      "Définition : le périmètre d’une figure composée est la longueur totale de son contour extérieur.\n\n" +
      "Méthode : on repère toutes les parties du bord : segments droits et éventuellement arcs de cercle.\n\n" +
      "Calcul : on additionne uniquement les longueurs du contour extérieur.\n\n" +
      "Conclusion : pour éviter les erreurs, il faut suivre le tour de la figure dans l’ordre.",
    tags: ["perimetre", "figure_composee", "open"],
  },
    /* =========================
     PERIMETRE_DEFIS
  ========================= */

  {
    kind: "fixed",
    id: "3e_aire_perimetre_defi_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Deux figures ont la même aire. Ont-elles forcément le même périmètre ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Même surface ne signifie pas même contour.",
    explanation:
      "Définition : l’aire mesure la surface, le périmètre mesure le contour.\n\n" +
      "Méthode : on compare deux grandeurs différentes.\n\n" +
      "Calcul : un carré 4 cm × 4 cm a une aire de 16 cm² et un périmètre de 16 cm. Un rectangle 8 cm × 2 cm a aussi une aire de 16 cm², mais son périmètre vaut 20 cm.\n\n" +
      "Conclusion : deux figures peuvent avoir la même aire sans avoir le même périmètre.",
    tags: ["perimetre", "aire", "defi", "piege"],
  },

  {
    kind: "template",
    id: "3e_aire_perimetre_defi_tpl_1_carre_depuis_aire",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Retrouve d’abord le côté du carré.",
    tags: ["perimetre", "carre", "aire", "defi", "template"],
    generate: () => {
      const cote = randomChoice([4, 5, 6, 7, 8, 9]);
      const aire = cote * cote;
      const perimetre = 4 * cote;

      return {
        text: `Un carré a une aire de ${aire} cm². Quel est son périmètre ?`,
        format: "short",
        expected: [String(perimetre)],
        comparator: "number_equal",
        explanation:
          "Définition : dans un carré, l’aire vaut côté² et le périmètre vaut 4 × côté.\n\n" +
          "Méthode : on retrouve d’abord la longueur du côté avec la racine carrée de l’aire.\n\n" +
          `Calcul : √${aire} = ${cote}. Donc périmètre = 4 × ${cote} = ${perimetre}.\n\n` +
          `Conclusion : le périmètre du carré est ${perimetre} cm.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_aire_perimetre_defi_tpl_2_rectangle_depuis_perimetre",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Pour un rectangle, demi-périmètre = longueur + largeur.",
    tags: ["perimetre", "rectangle", "defi", "template"],
    generate: () => {
      const L = randomChoice([8, 10, 12, 15]);
      const l = randomChoice([3, 4, 5, 6]);
      const p = 2 * (L + l);

      return {
        text: `Un rectangle a un périmètre de ${p} cm et une longueur de ${L} cm. Quelle est sa largeur ?`,
        format: "short",
        expected: [String(l)],
        comparator: "number_equal",
        explanation:
          "Définition : le périmètre d’un rectangle vaut 2 × (longueur + largeur).\n\n" +
          "Méthode : on calcule d’abord le demi-périmètre.\n\n" +
          `Calcul : ${p} ÷ 2 = ${L + l}. Donc largeur = ${L + l} - ${L} = ${l}.\n\n` +
          `Conclusion : la largeur du rectangle est ${l} cm.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_aire_perimetre_defi_tpl_3_cercle_depuis_demi_tour",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Un demi-cercle mesure la moitié du périmètre du cercle.",
    tags: ["perimetre", "cercle", "demi_cercle", "defi", "template"],
    generate: () => {
      const r = randomChoice([3, 4, 5, 6, 8]);
      const exact = `${r}π`;

      return {
        text: `Un demi-cercle a un rayon de ${r} cm. Quelle est la longueur exacte de son arc ?`,
        format: "short",
        expected: [exact, `${r}pi`],
        comparator: "exact_text",
        explanation:
          "Définition : l’arc d’un demi-cercle correspond à la moitié de la longueur du cercle complet.\n\n" +
          "Méthode : la longueur du cercle est 2πr, donc celle du demi-cercle est πr.\n\n" +
          `Calcul : π × ${r} = ${exact}.\n\n` +
          `Conclusion : la longueur de l’arc est ${exact} cm.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_aire_perimetre_defi_tpl_4_reunion",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "La clôture correspond au contour extérieur.",
    tags: ["perimetre", "reunion", "defi", "probleme", "template"],
    generate: () => {
      const L = randomChoice([18, 20, 24, 30]);
      const l = randomChoice([8, 10, 12]);
      const portail = randomChoice([2, 3, 4]);
      const cloture = 2 * (L + l) - portail;

      return {
        text:
          `À La Réunion, un jardin rectangulaire de ${L} m sur ${l} m doit être clôturé. ` +
          `On laisse une ouverture de ${portail} m pour un portail. Quelle longueur de clôture faut-il acheter ?`,
        format: "short",
        expected: [String(cloture)],
        comparator: "number_equal",
        explanation:
          "Définition : la clôture correspond au périmètre, sauf la partie laissée ouverte.\n\n" +
          "Méthode : on calcule le périmètre du rectangle puis on retire la largeur du portail.\n\n" +
          `Calcul : périmètre = 2 × (${L} + ${l}) = ${2 * (L + l)}.\n` +
          `Clôture = ${2 * (L + l)} - ${portail} = ${cloture}.\n\n` +
          `Conclusion : il faut acheter ${cloture} m de clôture.`,
      };
    },
  },

  {
  kind: "template",
  id: "3e_aire_perimetre_defi_tpl_5_expression_litterale",
  niveau: "3e",
  matiere: "maths",
  notionId: "aire_perimetre",
  microId: "aire_perimetre_defi",
  difficulty: 5,
  theme: "neutral",
  hint: "Additionne toutes les longueurs du contour puis réduis.",
  tags: ["perimetre", "litteral", "defi", "template"],
  generate: () => {
    const a = randomInt(2, 6);
    const b = randomInt(3, 9);

    const coeffX = 4 * a;
    const constant = 2 * b;

    return {
      text: `Un rectangle a pour longueur ${a}x + ${b} et pour largeur ${a}x. Écrire son périmètre sous forme réduite.`,
      format: "short",
      expected: [
        `${coeffX}x+${constant}`,
        `${coeffX}x + ${constant}`,
      ],
      comparator: "exact_text",
      explanation:
        "Définition : le périmètre d’un rectangle vaut 2 × (longueur + largeur).\n\n" +
        "Méthode : on additionne la longueur et la largeur puis on multiplie par 2.\n\n" +
        `Calcul : 2 × ((${a}x + ${b}) + ${a}x)\n` +
        `= 2 × (${2 * a}x + ${b})\n` +
        `= ${coeffX}x + ${constant}.\n\n` +
        `Conclusion : le périmètre réduit est ${coeffX}x + ${constant}.`,
    };
  },
},

  {
    kind: "fixed",
    id: "3e_aire_perimetre_defi_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi deux figures peuvent avoir la même aire mais des périmètres différents.",
    format: "open",
    expected: ["aire", "surface", "périmètre", "contour"],
    comparator: "contains_keyword",
    hint: "Compare une surface et un contour.",
    explanation:
      "Définition : l’aire mesure la surface, tandis que le périmètre mesure le contour.\n\n" +
      "Méthode : deux figures peuvent occuper la même surface mais avoir des formes différentes.\n\n" +
      "Calcul : un rectangle long et étroit peut avoir la même aire qu’un carré, mais un contour plus grand.\n\n" +
      "Conclusion : aire et périmètre ne varient pas toujours de la même façon.",
    tags: ["perimetre", "aire", "open", "defi"],
  },

  /* ===== PERIMETRE_COMPRENDRE (compléments) ===== */
  {
    kind: "fixed",
    id: "3e_aire_perimetre_comprendre_fixed_x1",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Le périmètre d’une figure mesure…",
    format: "qcm",
    choices: ["la longueur de son contour", "sa surface", "son volume", "le nombre de sommets"],
    expected: ["la longueur de son contour"],
    comparator: "mcq_exact",
    hint: "On en fait le tour.",
    explanation:
      "Définition : le périmètre est la longueur du contour d’une figure.\n\n" +
      "Méthode : on additionne les longueurs des côtés.\n\n" +
      "Calcul : l’aire, elle, mesure la surface.\n\n" +
      "Conclusion : le périmètre mesure la longueur du contour.",
    tags: ["perimetre", "comprendre", "qcm"],
  },
  {
    kind: "template",
    id: "3e_aire_perimetre_comprendre_tpl_x1_rectangle",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_comprendre",
    difficulty: 2,
    theme: "neutral",
    hint: "Périmètre d’un rectangle $= 2 \\times (L + l)$.",
    tags: ["perimetre", "comprendre", "rectangle", "template"],
    generate: () => {
      const L = randomInt(4, 9);
      const l = randomInt(2, 5);
      const p = 2 * (L + l);
      return {
        text: `Quel est le périmètre d’un rectangle de longueur $${L}$ cm et de largeur $${l}$ cm (en cm) ?`,
        format: "short",
        expected: [String(p)],
        comparator: "number_equal",
        explanation:
          `Définition : périmètre d’un rectangle $= 2 \\times (L + l)$.\n\n` +
          `Méthode : on additionne longueur et largeur, puis on multiplie par $2$.\n\n` +
          `Calcul : $2 \\times (${L} + ${l}) = 2 \\times ${L + l} = ${p}$.\n\n` +
          `Conclusion : le périmètre est $${p}$ cm.`,
      };
    },
  },
  {
    kind: "template",
    id: "3e_aire_perimetre_comprendre_tpl_x2_carre",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_comprendre",
    difficulty: 2,
    theme: "neutral",
    hint: "Périmètre d’un carré $= 4 \\times$ côté.",
    tags: ["perimetre", "comprendre", "carre", "template"],
    generate: () => {
      const c = randomInt(3, 12);
      return {
        text: `Quel est le périmètre d’un carré de côté $${c}$ cm (en cm) ?`,
        format: "short",
        expected: [String(4 * c)],
        comparator: "number_equal",
        explanation:
          `Définition : périmètre d’un carré $= 4 \\times$ côté.\n\n` +
          `Méthode : on multiplie le côté par $4$.\n\n` +
          `Calcul : $4 \\times ${c} = ${4 * c}$.\n\n` +
          `Conclusion : le périmètre est $${4 * c}$ cm.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_aire_perimetre_comprendre_qcm_x1_unite",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle unité convient pour un périmètre ?",
    format: "qcm",
    choices: ["cm", "$\\text{cm}^2$", "$\\text{cm}^3$", "L"],
    expected: ["cm"],
    comparator: "mcq_exact",
    hint: "Un périmètre est une longueur.",
    explanation:
      "Définition : le périmètre est une longueur.\n\n" +
      "Méthode : on choisit une unité de longueur.\n\n" +
      "Calcul : le $\\text{cm}^2$ est une aire.\n\n" +
      "Conclusion : on l’exprime en cm.",
    tags: ["perimetre", "comprendre", "unite", "qcm"],
  },
  {
    kind: "template",
    id: "3e_aire_perimetre_comprendre_tpl_x3_triangle",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_comprendre",
    difficulty: 2,
    theme: "neutral",
    hint: "On additionne les trois côtés.",
    tags: ["perimetre", "comprendre", "triangle", "template"],
    generate: () => {
      const a = randomInt(3, 8);
      const b = randomInt(3, 8);
      const c = randomInt(3, 8);
      return {
        text: `Un triangle a des côtés de $${a}$ cm, $${b}$ cm et $${c}$ cm. Quel est son périmètre (en cm) ?`,
        format: "short",
        expected: [String(a + b + c)],
        comparator: "number_equal",
        explanation:
          `Définition : le périmètre est la somme des côtés.\n\n` +
          `Méthode : on additionne les trois longueurs.\n\n` +
          `Calcul : $${a} + ${b} + ${c} = ${a + b + c}$.\n\n` +
          `Conclusion : le périmètre est $${a + b + c}$ cm.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_aire_perimetre_comprendre_qcm_x2_difference",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_comprendre",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la différence entre périmètre et aire ?",
    format: "qcm",
    choices: [
      "le périmètre est le contour, l’aire est la surface",
      "ce sont deux mots pour la même chose",
      "le périmètre est la surface, l’aire est le contour",
      "le périmètre est un volume",
    ],
    expected: ["le périmètre est le contour, l’aire est la surface"],
    comparator: "mcq_exact",
    hint: "L’un fait le tour, l’autre remplit.",
    explanation:
      "Définition : le périmètre mesure le contour, l’aire mesure la surface.\n\n" +
      "Méthode : on associe chaque mot à sa grandeur.\n\n" +
      "Calcul : périmètre en cm, aire en $\\text{cm}^2$.\n\n" +
      "Conclusion : périmètre = contour, aire = surface.",
    tags: ["perimetre", "aire", "comprendre", "qcm"],
  },

  /* ===== PERIMETRE_CERCLE (compléments) ===== */
  {
    kind: "fixed",
    id: "3e_aire_perimetre_cercle_qcm_x1_formule",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_cercle",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la formule de la longueur (périmètre) d’un cercle de rayon $r$ ?",
    format: "qcm",
    choices: ["$2\\pi r$", "$\\pi r^2$", "$\\pi r$", "$2r$"],
    expected: ["$2\\pi r$"],
    comparator: "mcq_exact",
    hint: "$\\pi r^2$ est l’aire du disque.",
    explanation:
      "Définition : la longueur d’un cercle est $2\\pi r$ (ou $\\pi d$).\n\n" +
      "Méthode : on distingue longueur ($2\\pi r$) et aire ($\\pi r^2$).\n\n" +
      "Calcul : longueur $= 2\\pi r$.\n\n" +
      "Conclusion : c’est $2\\pi r$.",
    tags: ["perimetre", "cercle", "formule", "qcm"],
  },
  {
    kind: "template",
    id: "3e_aire_perimetre_cercle_tpl_x1_valeur",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_cercle",
    difficulty: 3,
    theme: "neutral",
    hint: "Longueur $= \\pi \\times d$, avec $\\pi \\approx 3{,}14$.",
    tags: ["perimetre", "cercle", "valeur", "template"],
    generate: () => {
      const d = randomChoice([4, 6, 10, 20]);
      const p = Math.round(3.14 * d * 100) / 100;
      return {
        text: `Un cercle a un diamètre de $${d}$ cm. Quelle est sa longueur au centième près (avec $\\pi \\approx 3{,}14$, en cm) ?`,
        format: "short",
        expected: [String(p), String(p).replace(".", ",")],
        comparator: "number_equal",
        explanation:
          `Définition : longueur d’un cercle $= \\pi \\times d$.\n\n` +
          `Méthode : on multiplie le diamètre par $3{,}14$.\n\n` +
          `Calcul : $3{,}14 \\times ${d} = ${formatNumber(p)}$.\n\n` +
          `Conclusion : la longueur est environ $${formatNumber(p)}$ cm.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_aire_perimetre_cercle_fixed_x1",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_cercle",
    difficulty: 3,
    theme: "neutral",
    text: "Un cercle a un rayon de $5$ cm. Quelle est sa longueur au centième près (avec $\\pi \\approx 3{,}14$, en cm) ?",
    format: "short",
    expected: ["31.4", "31,4"],
    comparator: "number_equal",
    hint: "$2 \\times 3{,}14 \\times 5$.",
    explanation:
      "Définition : longueur $= 2\\pi r$.\n\n" +
      "Méthode : on calcule $2 \\times 3{,}14 \\times 5$.\n\n" +
      "Calcul : $2 \\times 3{,}14 \\times 5 = 31{,}4$.\n\n" +
      "Conclusion : la longueur est environ $31{,}4$ cm.",
    tags: ["perimetre", "cercle", "short"],
  },

  /* ===== PERIMETRE_FIGURE_COMPOSEE (compléments) ===== */
  {
    kind: "template",
    id: "3e_aire_perimetre_figure_composee_tpl_x1",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_figure_composee",
    difficulty: 4,
    theme: "neutral",
    hint: "On additionne toutes les longueurs du contour.",
    tags: ["perimetre", "figure_composee", "template"],
    generate: () => {
      const a = randomInt(2, 6);
      const b = randomInt(2, 6);
      const c = randomInt(2, 6);
      const d = randomInt(2, 6);
      const perimetre = a + b + c + d + (a + c) + (b + d);
      return {
        text: `Une figure en L a pour côtés successifs $${a}$, $${b}$, $${c}$, $${d}$, $${a + c}$ et $${b + d}$ (en cm). Quel est son périmètre (en cm) ?`,
        format: "short",
        expected: [String(perimetre)],
        comparator: "number_equal",
        explanation:
          `Définition : le périmètre est la somme de toutes les longueurs du contour.\n\n` +
          `Méthode : on additionne les six côtés.\n\n` +
          `Calcul : $${a} + ${b} + ${c} + ${d} + ${a + c} + ${b + d} = ${perimetre}$.\n\n` +
          `Conclusion : le périmètre est $${perimetre}$ cm.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_aire_perimetre_figure_composee_qcm_x1",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_figure_composee",
    difficulty: 3,
    theme: "neutral",
    text: "Pour calculer le périmètre d’une figure composée, on…",
    format: "qcm",
    choices: [
      "additionne toutes les longueurs du contour",
      "multiplie les aires",
      "additionne les aires",
      "compte les sommets",
    ],
    expected: ["additionne toutes les longueurs du contour"],
    comparator: "mcq_exact",
    hint: "Le périmètre, c’est le tour complet.",
    explanation:
      "Définition : le périmètre est la longueur du contour.\n\n" +
      "Méthode : on parcourt tout le contour en additionnant les côtés.\n\n" +
      "Calcul : on n’oublie aucun segment.\n\n" +
      "Conclusion : on additionne toutes les longueurs du contour.",
    tags: ["perimetre", "figure_composee", "methode", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_aire_perimetre_figure_composee_fixed_x1",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_figure_composee",
    difficulty: 4,
    theme: "neutral",
    text: "Un terrain rectangulaire de $20$ m sur $15$ m est entièrement clôturé. Quelle longueur de clôture faut-il (en m) ?",
    format: "short",
    expected: ["70"],
    comparator: "number_equal",
    hint: "Périmètre $= 2 \\times (20 + 15)$.",
    explanation:
      "Définition : la clôture suit le périmètre du terrain.\n\n" +
      "Méthode : $2 \\times (L + l)$.\n\n" +
      "Calcul : $2 \\times (20 + 15) = 2 \\times 35 = 70$.\n\n" +
      "Conclusion : il faut $70$ m de clôture.",
    tags: ["perimetre", "figure_composee", "short"],
  },

  /* ===== PERIMETRE_DEFI (compléments) ===== */
  {
    kind: "template",
    id: "3e_aire_perimetre_defi_tpl_x1_demi_cercle",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Demi-cercle : longueur de l’arc $= \\pi r$.",
    tags: ["perimetre", "defi", "cercle", "template"],
    generate: () => {
      const r = randomChoice([10, 20]);
      const arc = Math.round(3.14 * r * 100) / 100;
      return {
        text: `Une piste a la forme d’un demi-cercle de rayon $${r}$ m. Quelle est la longueur de l’arc (la partie courbe) au centième près (avec $\\pi \\approx 3{,}14$, en m) ?`,
        format: "short",
        expected: [String(arc), String(arc).replace(".", ",")],
        comparator: "number_equal",
        explanation:
          `Définition : l’arc d’un demi-cercle vaut la moitié de la longueur du cercle, soit $\\pi r$.\n\n` +
          `Méthode : on calcule $3{,}14 \\times r$.\n\n` +
          `Calcul : $3{,}14 \\times ${r} = ${formatNumber(arc)}$.\n\n` +
          `Conclusion : l’arc mesure environ $${formatNumber(arc)}$ m.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_aire_perimetre_defi_qcm_x1",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Si on double le rayon d’un cercle, sa longueur ($2\\pi r$) est multipliée par…",
    format: "qcm",
    choices: ["$2$", "$4$", "$\\pi$", "$8$"],
    expected: ["$2$"],
    comparator: "mcq_exact",
    hint: "La longueur est proportionnelle au rayon.",
    explanation:
      "Définition : la longueur $2\\pi r$ est proportionnelle à $r$.\n\n" +
      "Méthode : on regarde l’effet de doubler $r$.\n\n" +
      "Calcul : si $r$ double, $2\\pi r$ double aussi.\n\n" +
      "Conclusion : la longueur est multipliée par $2$.",
    tags: ["perimetre", "defi", "cercle", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_aire_perimetre_defi_fixed_x1",
    niveau: "3e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un carré et un rectangle ont le même périmètre de $24$ cm. Le carré a un côté de combien de cm ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Périmètre du carré $= 4 \\times$ côté.",
    explanation:
      "Définition : périmètre d’un carré $= 4 \\times$ côté.\n\n" +
      "Méthode : on divise le périmètre par $4$.\n\n" +
      "Calcul : $24 \\div 4 = 6$.\n\n" +
      "Conclusion : le côté du carré est $6$ cm.",
    tags: ["perimetre", "defi", "short"],
  },
];
