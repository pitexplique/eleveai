// lib/tutor-v4/questionBank/ce1/maths/nombres-entiers.bank.ts
//
// Les nombres entiers du CE1, écrits à la main. C'est la plus grosse notion de
// la classe : dix-huit micro-compétences, et le programme rappelle que les
// deux tiers du temps de mathématiques vont au domaine « Nombres, calcul et
// résolution de problèmes ».
//
// PÉRIMÈTRE BO (Annexe 4, programme de mathématiques du cycle 2) :
//   — les nombres vont jusqu'à MILLE. La centaine est abordée dès la période 1,
//     le millier au plus tard en période 2 ;
//   — quatre écritures d'un même nombre : chiffres, lettres, unités de
//     numération, décomposition additive. L'élève passe de l'une à l'autre ;
//   — comparer, encadrer, intercaler avec =, < et > ; ranger dans l'ordre ;
//   — les expressions « égal à », « supérieur à », « inférieur à »,
//     « compris entre … et … » ;
//   — placer un nombre sur une demi-droite graduée de un en un, de dix en dix
//     ou de cent en cent ;
//   — les nombres ORDINAUX jusqu'à cent, et cinq façons de s'en servir.
//
// LES DEUX PIÈGES DE LA NOTION :
//   1. la position des chiffres. Le programme le dit mot pour mot : l'élève
//      doit savoir expliquer « pourquoi 23 n'est pas le même nombre que 32,
//      bien que les écritures soient composées des mêmes chiffres » ;
//   2. les ordinaux. Le cinquième a QUATRE éléments devant lui, pas cinq. Le
//      programme donne l'exemple : « Il y a six personnes qui font la queue à
//      la caisse. Je suis la troisième. Combien y a-t-il de personnes devant
//      moi ? »
//
// ⚠️ PAS DE QUESTION À RÉDIGER : `applyMathsKeyboardFree` retire les items
// `format: "open"`. Un CE1 clique, il ne tape pas.

import type { NumberLineCanvasData, TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function numberLine(data: Omit<NumberLineCanvasData, "kind">): NumberLineCanvasData {
  return { kind: "number_line", ...data };
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

/** Les rangs jusqu'à douze, avec leur écriture en toutes lettres. */
const ORDINAUX = [
  { rang: 1, mot: "premier" },
  { rang: 2, mot: "deuxième" },
  { rang: 3, mot: "troisième" },
  { rang: 4, mot: "quatrième" },
  { rang: 5, mot: "cinquième" },
  { rang: 6, mot: "sixième" },
  { rang: 7, mot: "septième" },
  { rang: 8, mot: "huitième" },
  { rang: 9, mot: "neuvième" },
  { rang: 10, mot: "dixième" },
  { rang: 11, mot: "onzième" },
  { rang: 12, mot: "douzième" },
] as const;

export const nombresEntiersBank: TutorBankItemV4[] = [
  /* =========================================================
     CE1_ENTIER_DENOMBRER — compter en organisant
     On ne compte pas un à un : on groupe par dix et par cent.
     C'est ce groupement qui fabrique la numération.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_entier_denombrer_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_denombrer",
    difficulty: 2,
    theme: "neutral",
    text: "Pour compter un grand tas de jetons sans se tromper, que vaut-il mieux faire ?",
    format: "qcm",
    choices: [
      "les grouper par paquets de dix",
      "les compter un par un très vite",
      "les compter deux fois de suite",
      "en prendre une poignée au hasard",
    ],
    expected: ["les grouper par paquets de dix"],
    comparator: "mcq_exact",
    hint: "Avec des paquets de dix, on compte les paquets, pas les jetons.",
    explanation: exp(
      "Dénombrer, c'est trouver combien il y a d'objets en tout.",
      "On organise la collection en paquets de dix avant de compter.",
      "Avec des paquets de dix, on lit directement le nombre de dizaines, puis on ajoute les jetons isolés. Compter un par un, c'est long et on perd le fil.",
      "Il vaut mieux les grouper par paquets de dix.",
    ),
    tags: ["ce1", "nombre_entier", "denombrer", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_entier_denombrer_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_denombrer",
    difficulty: 3,
    theme: "neutral",
    hint: "Chaque plaque vaut 100, chaque barre vaut 10.",
    tags: ["ce1", "nombre_entier", "denombrer", "template"],
    generate: () => {
      const c = randomInt(1, 9);
      const d = randomInt(1, 9);
      const u = randomInt(1, 9);
      const total = c * 100 + d * 10 + u;
      return {
        text: `Une collection contient ${c} plaque${c > 1 ? "s" : ""} de cent cubes, ${d} barre${d > 1 ? "s" : ""} de dix cubes et ${u} cube${u > 1 ? "s" : ""} isolé${u > 1 ? "s" : ""}. Combien y a-t-il de cubes en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Chaque groupe a sa valeur : la plaque vaut cent, la barre vaut dix, le cube isolé vaut un.",
          "On compte chaque sorte de groupe, puis on additionne.",
          `${c} × 100 = ${c * 100}, ${d} × 10 = ${d * 10}, et ${u} cube${u > 1 ? "s" : ""} isolé${u > 1 ? "s" : ""}. ${c * 100} + ${d * 10} + ${u} = ${total}.`,
          `Il y a ${total} cubes.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_entier_denombrer_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_denombrer",
    difficulty: 4,
    theme: "neutral",
    hint: "Attention : il y a plus de dix unités isolées. Refais un groupe de dix.",
    tags: ["ce1", "nombre_entier", "denombrer", "piege", "template"],
    generate: () => {
      // Une collection MAL organisée : plus de dix unités isolées. L'élève doit
      // regrouper avant de lire, sinon il écrit les chiffres à la suite.
      const d = randomInt(2, 7);
      const u = randomInt(11, 19);
      const total = d * 10 + u;
      return {
        text: `Une collection contient ${d} barres de dix cubes et ${u} cubes isolés. Combien y a-t-il de cubes en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Quand il reste plus de dix objets isolés, on peut encore former une dizaine.",
          "On regroupe dix cubes isolés pour faire une barre de plus, puis on compte.",
          `${u} cubes isolés, cela fait une barre de dix et ${u - 10} cubes. On a donc ${d + 1} barres et ${u - 10} cubes : ${(d + 1) * 10} + ${u - 10} = ${total}.`,
          `Il y a ${total} cubes.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_ENTIER_CONSTRUIRE_COLLECTION — fabriquer un nombre
     La question à l'envers : on connaît le nombre, on cherche
     les groupes.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_entier_construire_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_construire_collection",
    difficulty: 3,
    theme: "neutral",
    text: "J'ai besoin de 235 timbres. Ils sont vendus par plaques de cent, par carnets de dix, ou à l'unité. Quelle commande fait exactement 235 ?",
    format: "qcm",
    choices: [
      "2 plaques, 3 carnets et 5 timbres",
      "2 plaques, 5 carnets et 3 timbres",
      "3 plaques, 2 carnets et 5 timbres",
      "23 carnets et 5 timbres seulement",
    ],
    expected: ["2 plaques, 3 carnets et 5 timbres"],
    comparator: "mcq_exact",
    hint: "Lis les chiffres de 235 dans l'ordre : centaines, dizaines, unités.",
    explanation: exp(
      "Chaque chiffre d'un nombre dit combien il faut de groupes de sa taille.",
      "On lit le nombre chiffre par chiffre, en partant de la gauche.",
      "Dans 235 : le 2 dit deux centaines, donc 2 plaques ; le 3 dit trois dizaines, donc 3 carnets ; le 5 dit cinq unités, donc 5 timbres.",
      "Il faut 2 plaques, 3 carnets et 5 timbres.",
    ),
    tags: ["ce1", "nombre_entier", "construire", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_entier_construire_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_construire_collection",
    difficulty: 4,
    theme: "neutral",
    text: "Il n'y a plus de plaques de cent timbres. Combien de carnets de dix faut-il pour faire 200 timbres ?",
    format: "short",
    expected: ["20"],
    comparator: "number_equal",
    hint: "Combien de dizaines dans une centaine ?",
    explanation: exp(
      "Une centaine, c'est dix dizaines.",
      "On cherche combien de fois dix tient dans le nombre.",
      "100 timbres, c'est 10 carnets. Pour 200 timbres, il en faut deux fois plus : 20 carnets.",
      "Il faut 20 carnets.",
    ),
    tags: ["ce1", "nombre_entier", "construire", "piege"],
  },
  {
    kind: "template",
    id: "ce1_entier_construire_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_construire_collection",
    difficulty: 3,
    theme: "neutral",
    hint: "Le chiffre des dizaines dit combien de paquets de dix.",
    tags: ["ce1", "nombre_entier", "construire", "template"],
    generate: () => {
      const c = randomInt(1, 9);
      const d = randomInt(1, 9);
      const u = randomInt(1, 9);
      const n = c * 100 + d * 10 + u;
      const quoi = randomChoice([
        { objet: "billes", gros: "sachets de cent", moyen: "boites de dix" },
        { objet: "images", gros: "planches de cent", moyen: "pochettes de dix" },
        { objet: "bonbons", gros: "boites de cent", moyen: "rouleaux de dix" },
      ]);
      return {
        text: `Tu dois réunir ${n} ${quoi.objet}. Tu prends ${c} ${quoi.gros} et ${d} ${quoi.moyen}. Combien de ${quoi.objet} isolé${u > 1 ? "s" : ""} faut-il ajouter ?`,
        format: "short",
        expected: [String(u)],
        comparator: "number_equal",
        explanation: exp(
          "Chaque chiffre d'un nombre dit combien il faut de groupes de sa taille.",
          "On lit le nombre chiffre par chiffre : centaines, dizaines, unités.",
          `Dans ${n}, le chiffre des unités est ${u}. Les ${c} ${quoi.gros} et les ${d} ${quoi.moyen} donnent déjà ${c * 100 + d * 10}, il manque ${u}.`,
          `Il faut ajouter ${u} ${quoi.objet}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_ENTIER_LIRE_ECRIRE — lire et écrire jusqu'à 1 000
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_entier_lire_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_lire_ecrire",
    difficulty: 2,
    theme: "neutral",
    text: "Comment s'écrit en chiffres « six cent trente-cinq » ?",
    format: "qcm",
    choices: ["635", "6035", "60035", "563"],
    expected: ["635"],
    comparator: "mcq_exact",
    hint: "Six cents, puis trente, puis cinq.",
    explanation: exp(
      "Un nombre à trois chiffres a un chiffre des centaines, un des dizaines et un des unités.",
      "On écoute le nombre par morceaux : les centaines, puis les dizaines, puis les unités.",
      "« Six cent » donne le 6 des centaines, « trente » donne le 3 des dizaines, « cinq » donne le 5 des unités. Cela fait 635, sans zéro à l'intérieur.",
      "Cela s'écrit 635.",
    ),
    tags: ["ce1", "nombre_entier", "lire_ecrire", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_entier_lire_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_lire_ecrire",
    difficulty: 3,
    theme: "neutral",
    text: "Comment s'écrit en chiffres « quatre cent sept » ?",
    format: "qcm",
    choices: ["407", "47", "470", "4007"],
    expected: ["407"],
    comparator: "mcq_exact",
    hint: "Il n'y a aucune dizaine : que met-on à cette place ?",
    explanation: exp(
      "Quand un rang est vide, on écrit un zéro pour garder sa place.",
      "On repère les centaines, les dizaines et les unités dans ce qu'on entend.",
      "« Quatre cent » donne 4 centaines. On n'entend aucune dizaine : on écrit 0. « Sept » donne 7 unités. Cela fait 407. Sans le zéro, on lirait 47, un tout petit nombre.",
      "Cela s'écrit 407.",
    ),
    tags: ["ce1", "nombre_entier", "lire_ecrire", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_entier_lire_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_lire_ecrire",
    difficulty: 3,
    theme: "neutral",
    hint: "Un zéro garde la place d'un rang vide.",
    tags: ["ce1", "nombre_entier", "lire_ecrire", "template"],
    generate: () => {
      const c = randomInt(1, 9);
      const u = randomInt(1, 9);
      const n = c * 100 + u; // toujours zéro dizaine : c'est là qu'on se trompe
      const lettresUnites = [
        "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf",
      ] as const;
      return {
        text: `Comment s'écrit en chiffres « ${lettresUnites[c - 1]} cent ${lettresUnites[u - 1]} » ?`,
        format: "qcm",
        choices: makeChoices(String(n), [
          String(c * 10 + u),
          String(c * 100 + u * 10),
          String(c * 1000 + u),
          String(u * 100 + c),
        ]),
        expected: [String(n)],
        comparator: "mcq_exact",
        explanation: exp(
          "Quand un rang est vide, on écrit un zéro pour garder sa place.",
          "On repère les centaines, les dizaines et les unités dans ce qu'on entend.",
          `Il y a ${c} centaine${c > 1 ? "s" : ""}, aucune dizaine, et ${u} unité${u > 1 ? "s" : ""}. On écrit donc ${c}, puis 0 pour les dizaines, puis ${u} : ${n}.`,
          `Cela s'écrit ${n}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_ENTIER_CENTAINES — unités, dizaines, centaines
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_entier_centaines_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_centaines",
    difficulty: 1,
    theme: "neutral",
    text: "Combien y a-t-il de dizaines dans une centaine ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "Compte les barres de dix qu'il faut pour faire une plaque de cent.",
    explanation: exp(
      "Une centaine, c'est dix dizaines.",
      "On empile les barres de dix jusqu'à remplir une plaque de cent.",
      "10 + 10 + 10 + 10 + 10 + 10 + 10 + 10 + 10 + 10 = 100. Il faut dix barres.",
      "Il y a 10 dizaines dans une centaine.",
    ),
    tags: ["ce1", "nombre_entier", "centaines", "remarquable"],
  },
  {
    kind: "fixed",
    id: "ce1_entier_centaines_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_centaines",
    difficulty: 3,
    theme: "neutral",
    text: "Combien y a-t-il d'unités dans une centaine ?",
    format: "short",
    expected: ["100"],
    comparator: "number_equal",
    hint: "Dix barres de dix cubes, cela fait combien de cubes ?",
    explanation: exp(
      "Une centaine, c'est dix dizaines, et chaque dizaine vaut dix unités.",
      "On compte de dix en dix : dix, vingt, trente… jusqu'à la dixième barre.",
      "Dix barres de dix cubes font cent cubes. Une plaque de cent, c'est bien 100 unités.",
      "Il y a 100 unités dans une centaine.",
    ),
    tags: ["ce1", "nombre_entier", "centaines", "remarquable"],
  },
  {
    kind: "template",
    id: "ce1_entier_centaines_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_centaines",
    difficulty: 3,
    theme: "neutral",
    hint: "Une centaine vaut dix dizaines.",
    tags: ["ce1", "nombre_entier", "centaines", "template"],
    generate: () => {
      const c = randomInt(2, 9);
      const dizaines = c * 10;
      return {
        text: `Combien de dizaines y a-t-il dans ${c} centaines ?`,
        format: "short",
        expected: [String(dizaines)],
        comparator: "number_equal",
        explanation: exp(
          "Une centaine, c'est dix dizaines.",
          "On compte dix dizaines par centaine.",
          `${c} × 10 = ${dizaines}. Il y a donc ${dizaines} dizaines dans ${c} centaines, c'est-à-dire dans ${c * 100}.`,
          `Il y a ${dizaines} dizaines.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_ENTIER_VALEUR_POSITION — la place fait la valeur
     LE piège que le programme nomme : 23 et 32 s'écrivent avec
     les mêmes chiffres et ne valent pas la même chose.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_entier_position_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_valeur_position",
    difficulty: 4,
    theme: "neutral",
    text: "Pourquoi 23 n'est-il pas le même nombre que 32, alors qu'on écrit les deux avec un 2 et un 3 ?",
    format: "qcm",
    choices: [
      "parce que les chiffres ne sont pas à la même place",
      "parce qu'on ne peut pas comparer deux nombres",
      "parce que 23 s'écrit avant 32 dans la liste",
      "ce sont en fait les mêmes nombres",
    ],
    expected: ["parce que les chiffres ne sont pas à la même place"],
    comparator: "mcq_exact",
    hint: "Dans 23, où est le 2 ? Et dans 32 ?",
    explanation: exp(
      "Un chiffre ne vaut pas la même chose selon la place qu'il occupe.",
      "On lit chaque nombre en disant ses dizaines et ses unités.",
      "23, c'est 2 dizaines et 3 unités : vingt-trois. 32, c'est 3 dizaines et 2 unités : trente-deux. Les mêmes chiffres, mais pas aux mêmes places, donc pas le même nombre.",
      "Parce que les chiffres ne sont pas à la même place.",
    ),
    tags: ["ce1", "nombre_entier", "position", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_entier_position_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_valeur_position",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les rangs en partant de la droite.",
    tags: ["ce1", "nombre_entier", "position", "template"],
    generate: () => {
      const c = randomInt(1, 9);
      const d = randomInt(1, 9);
      const u = randomInt(1, 9);
      const n = c * 100 + d * 10 + u;
      const rang = randomChoice([
        { nom: "des centaines", chiffre: c },
        { nom: "des dizaines", chiffre: d },
        { nom: "des unités", chiffre: u },
      ]);
      return {
        text: `Dans le nombre ${n}, quel est le chiffre ${rang.nom} ?`,
        format: "short",
        expected: [String(rang.chiffre)],
        comparator: "number_equal",
        explanation: exp(
          "Chaque chiffre d'un nombre occupe un rang : unités, dizaines, centaines.",
          "On repère les rangs en partant de la droite.",
          `Dans ${n} : ${u} est aux unités, ${d} aux dizaines, ${c} aux centaines. Le chiffre ${rang.nom} est donc ${rang.chiffre}.`,
          `C'est ${rang.chiffre}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_entier_position_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_valeur_position",
    difficulty: 4,
    theme: "neutral",
    hint: "Le chiffre dit combien ; la place dit combien ça vaut.",
    tags: ["ce1", "nombre_entier", "position", "piege", "template"],
    generate: () => {
      const c = randomInt(1, 9);
      const d = randomInt(1, 9);
      const u = randomInt(1, 9);
      const n = c * 100 + d * 10 + u;
      const bonne = String(c * 100);
      return {
        text: `Dans le nombre ${n}, que vaut le chiffre des centaines ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          String(c),
          String(c * 10),
          String(d * 100),
          String(c * 100 + d * 10),
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "La valeur d'un chiffre dépend de sa place : aux centaines, il compte des paquets de cent.",
          "On repère le rang, puis on multiplie le chiffre par la valeur du rang.",
          `Dans ${n}, le chiffre des centaines est ${c}. Il compte ${c} paquets de cent : ${c} × 100 = ${c * 100}.`,
          `Il vaut ${bonne}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_ENTIER_REPRESENTATIONS — passer d'une écriture à l'autre
     Le programme en nomme cinq : matériel, chiffres, lettres,
     unités de numération, décomposition additive.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_entier_representations_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_representations",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle écriture ne désigne PAS le nombre 305 ?",
    format: "qcm",
    choices: [
      "3 dizaines et 5 unités",
      "3 centaines et 5 unités",
      "300 + 5",
      "trois cent cinq",
    ],
    expected: ["3 dizaines et 5 unités"],
    comparator: "mcq_exact",
    hint: "3 dizaines, cela fait combien ?",
    explanation: exp(
      "Un même nombre s'écrit de plusieurs façons, mais elles doivent toutes donner la même quantité.",
      "On calcule ce que vaut chaque écriture, puis on la compare à 305.",
      "3 dizaines et 5 unités font 35, pas 305. Les trois autres écritures donnent bien 305.",
      "L'intruse est « 3 dizaines et 5 unités ».",
    ),
    tags: ["ce1", "nombre_entier", "representations", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_entier_representations_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_representations",
    difficulty: 3,
    theme: "neutral",
    hint: "Une centaine vaut cent, une dizaine vaut dix.",
    tags: ["ce1", "nombre_entier", "representations", "template"],
    generate: () => {
      const c = randomInt(1, 9);
      const d = randomInt(1, 9);
      const u = randomInt(1, 9);
      const n = c * 100 + d * 10 + u;
      return {
        text: `Quel nombre s'écrit « ${c} centaine${c > 1 ? "s" : ""}, ${d} dizaine${d > 1 ? "s" : ""} et ${u} unité${u > 1 ? "s" : ""} » ?`,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation: exp(
          "Une écriture en unités de numération dit combien il y a de groupes de chaque taille.",
          "On transforme chaque groupe en nombre, puis on additionne.",
          `${c} centaine${c > 1 ? "s" : ""} font ${c * 100}, ${d} dizaine${d > 1 ? "s" : ""} font ${d * 10}, et il reste ${u}. ${c * 100} + ${d * 10} + ${u} = ${n}.`,
          `C'est le nombre ${n}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_entier_representations_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_representations",
    difficulty: 4,
    theme: "neutral",
    hint: "Il y a plus de dix dizaines : refais des centaines.",
    tags: ["ce1", "nombre_entier", "representations", "piege", "template"],
    generate: () => {
      // Écriture NON canonique : plus de dix dizaines. Le programme la demande
      // explicitement — « 63 dizaines et 5 unités », « 3 dizaines et 605 unités ».
      const dizaines = randomInt(11, 60);
      const u = randomInt(1, 9);
      const n = dizaines * 10 + u;
      return {
        text: `Quel nombre s'écrit « ${dizaines} dizaines et ${u} unité${u > 1 ? "s" : ""} » ?`,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation: exp(
          "On peut compter un nombre en dizaines même quand il y en a plus de dix.",
          "On transforme les dizaines en nombre, puis on ajoute les unités.",
          `${dizaines} dizaines font ${dizaines * 10}, car chaque dizaine vaut dix. On ajoute les ${u} unité${u > 1 ? "s" : ""} : ${dizaines * 10} + ${u} = ${n}.`,
          `C'est le nombre ${n}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_ENTIER_DECOMPOSER — la décomposition additive
  ========================================================= */
  {
    kind: "template",
    id: "ce1_entier_decomposer_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_decomposer",
    difficulty: 3,
    theme: "neutral",
    hint: "Chaque chiffre garde la valeur de sa place.",
    tags: ["ce1", "nombre_entier", "decomposer", "template"],
    generate: () => {
      const c = randomInt(1, 9);
      const d = randomInt(1, 9);
      const u = randomInt(1, 9);
      const n = c * 100 + d * 10 + u;
      const bonne = `${c * 100} + ${d * 10} + ${u}`;
      return {
        text: `Quelle est la décomposition du nombre ${n} ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `${c} + ${d} + ${u}`,
          `${c * 10} + ${d * 10} + ${u}`,
          `${c * 100} + ${d} + ${u * 10}`,
          `${c * 100} + ${d * 100} + ${u}`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Décomposer, c'est écrire le nombre comme une somme où chaque chiffre garde la valeur de son rang.",
          "On écrit les centaines, puis les dizaines, puis les unités.",
          `Dans ${n} : le ${c} vaut ${c * 100}, le ${d} vaut ${d * 10}, le ${u} vaut ${u}.`,
          `C'est ${bonne}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_entier_decomposer_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_decomposer",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne les trois morceaux.",
    tags: ["ce1", "nombre_entier", "decomposer", "template"],
    generate: () => {
      const c = randomInt(1, 9);
      const d = randomInt(1, 9);
      const u = randomInt(1, 9);
      const n = c * 100 + d * 10 + u;
      return {
        text: `Quel nombre vaut ${c * 100} + ${d * 10} + ${u} ?`,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation: exp(
          "Une décomposition additive se recompose en additionnant ses morceaux.",
          "On additionne les centaines, les dizaines et les unités.",
          `${c * 100} + ${d * 10} + ${u} = ${n}. Chaque morceau donne un chiffre du nombre.`,
          `C'est ${n}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_ENTIER_COMPARER — =, < et >
     Le piège : le nombre qui a le plus de chiffres est le plus
     grand, mais à nombre de chiffres égal, c'est le rang le
     plus à gauche qui décide.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_entier_comparer_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_comparer",
    difficulty: 4,
    theme: "neutral",
    text: "Aaron a 49 trombones dans sa trousse et Mia en a 53. Qui a le plus de trombones ?",
    format: "qcm",
    choices: ["Mia", "Aaron", "ils en ont autant", "on ne peut pas savoir"],
    expected: ["Mia"],
    comparator: "mcq_exact",
    hint: "Compare les dizaines avant les unités.",
    explanation: exp(
      "Pour comparer deux nombres à deux chiffres, on regarde d'abord les dizaines.",
      "On compte les dizaines de chacun, puis les unités seulement en cas d'égalité.",
      "Aaron a 4 dizaines et 9 unités, Mia a 5 dizaines et 3 unités. Cinq dizaines, c'est plus que quatre, même si 9 est plus grand que 3.",
      "C'est Mia qui en a le plus.",
    ),
    tags: ["ce1", "nombre_entier", "comparer", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_entier_comparer_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "La pointe du signe montre le plus petit nombre.",
    tags: ["ce1", "nombre_entier", "comparer", "template"],
    generate: () => {
      const a = randomInt(100, 999);
      let b = randomInt(100, 999);
      if (b === a) b = a + randomInt(1, 50);
      const bonne = a < b ? "<" : ">";
      return {
        text: `Quel signe faut-il placer entre ${a} et ${b} ?`,
        format: "qcm",
        choices: makeChoices(bonne, ["<", ">", "=", "+"]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Le signe < se lit « est inférieur à », le signe > se lit « est supérieur à ». La pointe montre le plus petit.",
          "On compare les centaines, puis les dizaines, puis les unités.",
          `${a} et ${b} : le plus petit est ${Math.min(a, b)}. On écrit donc ${a} ${bonne} ${b}.`,
          `Il faut le signe ${bonne}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_ENTIER_EXPRESSIONS — dire la comparaison avec des mots
     Le programme les nomme : « égal à », « supérieur à »,
     « inférieur à », « compris entre … et … ».
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_entier_expressions_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_expressions",
    difficulty: 2,
    theme: "neutral",
    text: "Comment lit-on le signe < ?",
    format: "qcm",
    choices: [
      "est inférieur à",
      "est supérieur à",
      "est égal à",
      "est compris entre",
    ],
    expected: ["est inférieur à"],
    comparator: "mcq_exact",
    hint: "La pointe du signe est du côté du plus petit.",
    explanation: exp(
      "Le signe < veut dire « est inférieur à », c'est-à-dire « est plus petit que ».",
      "On regarde de quel côté est la pointe : elle montre le plus petit nombre.",
      "Dans 12 < 30, la pointe est vers le 12 : douze est inférieur à trente.",
      "Le signe < se lit « est inférieur à ».",
    ),
    tags: ["ce1", "nombre_entier", "expressions", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_entier_expressions_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_expressions",
    difficulty: 3,
    theme: "neutral",
    hint: "Traduis la phrase en signe, ou le signe en phrase.",
    tags: ["ce1", "nombre_entier", "expressions", "template"],
    generate: () => {
      const a = randomInt(100, 900);
      const b = a + randomInt(5, 90);
      const sens = randomChoice(["inferieur", "superieur"] as const);
      const bonne = sens === "inferieur" ? String(a) : String(b);
      return {
        text: sens === "inferieur"
          ? `Parmi ${a} et ${b}, lequel est INFÉRIEUR à l'autre ?`
          : `Parmi ${a} et ${b}, lequel est SUPÉRIEUR à l'autre ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          sens === "inferieur" ? String(b) : String(a),
          "les deux sont égaux",
          String(a + b),
          String(b + 100),
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "« Inférieur à » veut dire « plus petit que » ; « supérieur à » veut dire « plus grand que ».",
          "On compare les deux nombres rang par rang, en partant de la gauche.",
          `${a} est plus petit que ${b}. Donc ${a} est inférieur à ${b}, et ${b} est supérieur à ${a}.`,
          `C'est ${bonne}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_entier_expressions_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_expressions",
    difficulty: 4,
    theme: "neutral",
    hint: "« Compris entre » veut dire : plus grand que le premier, plus petit que le second.",
    tags: ["ce1", "nombre_entier", "expressions", "template"],
    generate: () => {
      const bas = randomInt(100, 800);
      const haut = bas + randomInt(20, 90);
      const dedans = randomInt(bas + 1, haut - 1);
      return {
        text: `Quel nombre est compris entre ${bas} et ${haut} ?`,
        format: "qcm",
        choices: makeChoices(String(dedans), [
          String(bas - randomInt(5, 40)),
          String(haut + randomInt(5, 40)),
          String(haut + 100),
          String(bas - 100),
        ]),
        expected: [String(dedans)],
        comparator: "mcq_exact",
        explanation: exp(
          "« Compris entre … et … » veut dire plus grand que le premier nombre et plus petit que le second.",
          "On vérifie les deux conditions l'une après l'autre.",
          `${dedans} est plus grand que ${bas} et plus petit que ${haut} : il est bien entre les deux.`,
          `C'est ${dedans}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_ENTIER_ENCADRER — encadrer et intercaler
  ========================================================= */
  {
    kind: "template",
    id: "ce1_entier_encadrer_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_encadrer",
    difficulty: 3,
    theme: "neutral",
    hint: "La dizaine d'avant se termine par 0.",
    tags: ["ce1", "nombre_entier", "encadrer", "template"],
    generate: () => {
      const dizaine = randomInt(10, 98);
      const u = randomInt(1, 9);
      const n = dizaine * 10 + u;
      const bas = dizaine * 10;
      const haut = bas + 10;
      return {
        text: `Entre quelles dizaines se trouve le nombre ${n} ?`,
        format: "qcm",
        choices: makeChoices(`entre ${bas} et ${haut}`, [
          `entre ${bas - 10} et ${bas}`,
          `entre ${haut} et ${haut + 10}`,
          `entre ${n - 1} et ${n + 1}`,
          `entre ${bas} et ${bas + 100}`,
        ]),
        expected: [`entre ${bas} et ${haut}`],
        comparator: "mcq_exact",
        explanation: exp(
          "Encadrer par des dizaines, c'est trouver la dizaine juste avant et celle juste après.",
          "On enlève les unités pour obtenir la dizaine d'avant, puis on ajoute dix.",
          `${n} a ${dizaine} dizaines et ${u} unité${u > 1 ? "s" : ""}. La dizaine d'avant est ${bas}, la suivante ${haut} : ${bas} < ${n} < ${haut}.`,
          `${n} est entre ${bas} et ${haut}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_entier_encadrer_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_encadrer",
    difficulty: 3,
    theme: "neutral",
    hint: "Intercaler, c'est trouver un nombre qui tient entre les deux.",
    tags: ["ce1", "nombre_entier", "encadrer", "template"],
    generate: () => {
      const debut = randomInt(200, 900);
      const manquant = debut + 4;
      const bande = [debut, debut + 1, debut + 2, debut + 3, "?", debut + 5, debut + 6];
      return {
        text: `Dans cette bande de nombres, quel nombre remplace le point d'interrogation ? ${bande.join(" · ")}`,
        format: "short",
        expected: [String(manquant)],
        comparator: "number_equal",
        explanation: exp(
          "Sur une bande de nombres, on avance de un en un.",
          "On regarde le nombre juste avant le trou, puis on ajoute 1.",
          `Le nombre juste avant est ${debut + 3}, et le suivant est ${debut + 5}. Entre les deux, il n'y a que ${manquant}.`,
          `C'est ${manquant}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_ENTIER_ORDONNER — croissant et décroissant
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_entier_ordonner_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_ordonner",
    difficulty: 2,
    theme: "neutral",
    text: "Ranger des nombres dans l'ordre CROISSANT, cela veut dire les ranger comment ?",
    format: "qcm",
    choices: [
      "du plus petit au plus grand",
      "du plus grand au plus petit",
      "par ordre alphabétique",
      "au hasard",
    ],
    expected: ["du plus petit au plus grand"],
    comparator: "mcq_exact",
    hint: "« Croissant » vient de « croître », c'est-à-dire grandir.",
    explanation: exp(
      "L'ordre croissant va du plus petit au plus grand ; l'ordre décroissant fait l'inverse.",
      "On retient le mot : croître, c'est grandir.",
      "Dans l'ordre croissant, les nombres grandissent au fur et à mesure : 12, 45, 128, 340.",
      "C'est du plus petit au plus grand.",
    ),
    tags: ["ce1", "nombre_entier", "ordonner", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_entier_ordonner_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_ordonner",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare les centaines d'abord.",
    tags: ["ce1", "nombre_entier", "ordonner", "template"],
    generate: () => {
      const nombres = shuffle([
        randomInt(100, 299),
        randomInt(300, 599),
        randomInt(600, 799),
        randomInt(800, 999),
      ]).slice(0, 4);
      const croissant = randomChoice([true, false]);
      const bonne = croissant ? Math.min(...nombres) : Math.max(...nombres);
      const autres = nombres.filter((n) => n !== bonne).map(String);
      return {
        text: croissant
          ? `Pour ranger ces nombres dans l'ordre croissant, lequel écrit-on en PREMIER : ${nombres.join(", ")} ?`
          : `Pour ranger ces nombres dans l'ordre décroissant, lequel écrit-on en PREMIER : ${nombres.join(", ")} ?`,
        format: "qcm",
        choices: makeChoices(String(bonne), autres),
        expected: [String(bonne)],
        comparator: "mcq_exact",
        explanation: exp(
          "L'ordre croissant commence par le plus petit, l'ordre décroissant par le plus grand.",
          "On compare les centaines de chaque nombre.",
          `Le plus ${croissant ? "petit" : "grand"} de la liste est ${bonne}, parce que son chiffre des centaines est le plus ${croissant ? "petit" : "grand"}.`,
          `On écrit ${bonne} en premier.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_ENTIER_DROITE — la demi-droite graduée
     Le programme fait le lien avec la règle graduée : la
     distance à l'origine, c'est le nombre.
  ========================================================= */
  {
    kind: "template",
    id: "ce1_entier_droite_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_droite",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde de combien on avance entre deux graduations.",
    tags: ["ce1", "nombre_entier", "droite", "template", "canvas"],
    generate: () => {
      const pas = randomChoice([10, 100] as const);
      const depart = pas === 10 ? randomInt(10, 60) * 10 : randomInt(1, 5) * 100;
      const cherche = depart + pas * randomInt(2, 4);
      return {
        text: `Cette demi-droite est graduée de ${pas} en ${pas}. Quel nombre se trouve au point marqué ?`,
        format: "short",
        expected: [String(cherche)],
        comparator: "number_equal",
        explanation: exp(
          "Sur une demi-droite graduée, chaque graduation avance du même pas.",
          "On part de la graduation connue et on ajoute le pas autant de fois qu'il faut.",
          `Le pas est de ${pas}. En partant de ${depart} et en avançant de ${(cherche - depart) / pas} graduations, on arrive à ${cherche}.`,
          `C'est ${cherche}.`,
        ),
        canvas: numberLine({
          min: depart,
          max: depart + pas * 6,
          step: pas,
          points: [{ value: cherche, label: "?", color: "#ef4444" }],
        }),
      };
    },
  },

  /* =========================================================
     CE1_ORDINAL_JUSQU_CENT — premier, deuxième, troisième…
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_ordinal_connaitre_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_ordinal_jusqu_cent",
    difficulty: 1,
    theme: "neutral",
    text: "Dans une course, celui qui arrive juste après le premier est le…",
    format: "qcm",
    choices: ["deuxième", "troisième", "dernier", "premier aussi"],
    expected: ["deuxième"],
    comparator: "mcq_exact",
    hint: "Compte dans l'ordre d'arrivée.",
    explanation: exp(
      "Les nombres ordinaux disent une place, pas une quantité : premier, deuxième, troisième…",
      "On compte les places dans l'ordre d'arrivée.",
      "Le premier arrive en tête, celui qui le suit occupe la deuxième place.",
      "C'est le deuxième.",
    ),
    tags: ["ce1", "nombre_entier", "ordinaux", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_ordinal_connaitre_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_ordinal_jusqu_cent",
    difficulty: 2,
    theme: "neutral",
    hint: "Le rang se dit avec un mot qui finit par « ième », sauf le premier.",
    tags: ["ce1", "nombre_entier", "ordinaux", "template"],
    generate: () => {
      const o = randomChoice(ORDINAUX.slice(1));
      const autres = ORDINAUX.filter((x) => x.rang !== o.rang).map((x) => x.mot);
      return {
        text: `Dans une file, quelle place occupe la personne numéro ${o.rang} ?`,
        format: "qcm",
        choices: makeChoices(`la ${o.mot}`, autres.map((m) => `la ${m}`)),
        expected: [`la ${o.mot}`],
        comparator: "mcq_exact",
        explanation: exp(
          "Un nombre ordinal dit la place occupée dans une file ou une liste.",
          "On compte les places une à une depuis le début de la file.",
          `La personne numéro ${o.rang} occupe la ${o.mot} place. Sauf « premier », tous ces mots se terminent par « ième ».`,
          `C'est la ${o.mot}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_ORDINAL_RANG_PRECEDENTS — LE piège des ordinaux
     Le programme donne l'exemple : « Il y a six personnes qui
     font la queue. Je suis la troisième. Combien y a-t-il de
     personnes devant moi ? » Le cinquième a QUATRE personnes
     devant lui, pas cinq.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_ordinal_precedents_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_ordinal_rang_precedents",
    difficulty: 3,
    theme: "neutral",
    text: "Six personnes font la queue à la caisse. Je suis la troisième. Combien y a-t-il de personnes devant moi ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Compte les personnes devant toi, sans te compter toi-même.",
    explanation: exp(
      "Le rang dit la place qu'on occupe, en se comptant soi-même.",
      "Pour savoir combien de personnes précèdent, on enlève 1 au rang.",
      "Être troisième, c'est avoir deux personnes devant soi : la première et la deuxième. 3 - 1 = 2.",
      "Il y a 2 personnes devant moi.",
    ),
    tags: ["ce1", "nombre_entier", "ordinaux", "piege"],
  },
  {
    kind: "fixed",
    id: "ce1_ordinal_precedents_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_ordinal_rang_precedents",
    difficulty: 4,
    theme: "neutral",
    text: "Dans une file, Malia a quatre enfants devant elle. Quelle est sa place ?",
    format: "qcm",
    choices: ["cinquième", "quatrième", "troisième", "sixième"],
    expected: ["cinquième"],
    comparator: "mcq_exact",
    hint: "N'oublie pas de te compter toi-même.",
    explanation: exp(
      "Le rang compte les personnes qui précèdent, plus soi-même.",
      "On ajoute 1 au nombre de personnes devant.",
      "Quatre enfants devant Malia, et Malia juste après : 4 + 1 = 5. Elle est cinquième.",
      "Malia est cinquième.",
    ),
    tags: ["ce1", "nombre_entier", "ordinaux", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_ordinal_precedents_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_ordinal_rang_precedents",
    difficulty: 3,
    theme: "neutral",
    hint: "Le rang te compte, toi aussi.",
    tags: ["ce1", "nombre_entier", "ordinaux", "piege", "template"],
    generate: () => {
      const o = randomChoice(ORDINAUX.slice(2));
      const devant = o.rang - 1;
      const total = o.rang + randomInt(1, 4);
      return {
        text: `${total} enfants font la queue à la cantine. Kevin est le ${o.mot}. Combien d'enfants y a-t-il devant lui ?`,
        format: "short",
        expected: [String(devant)],
        comparator: "number_equal",
        explanation: exp(
          "Le rang dit la place qu'on occupe, en se comptant soi-même.",
          "Pour savoir combien d'enfants précèdent, on enlève 1 au rang.",
          `Être ${o.mot}, c'est avoir ${devant} enfant${devant > 1 ? "s" : ""} devant soi : ${o.rang} - 1 = ${devant}.`,
          `Il y a ${devant} enfant${devant > 1 ? "s" : ""} devant lui.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_ORDINAL_RANG_FILE — repérer un rang dans une file
  ========================================================= */
  {
    kind: "template",
    id: "ce1_ordinal_file_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_ordinal_rang_file",
    difficulty: 3,
    theme: "neutral",
    hint: "La place et la valeur ne sont pas la même chose.",
    tags: ["ce1", "nombre_entier", "ordinaux", "file", "template"],
    generate: () => {
      const depart = randomInt(2, 9);
      const pas = randomInt(2, 6);
      const liste = [0, 1, 2, 3, 4, 5].map((i) => depart + i * pas);
      const o = randomChoice(ORDINAUX.slice(1, 6));
      const valeur = liste[o.rang - 1];
      return {
        text: `Voici une liste de nombres : ${liste.join(", ")}. Quel est le ${o.mot} nombre ?`,
        format: "short",
        expected: [String(valeur)],
        comparator: "number_equal",
        explanation: exp(
          "Le rang d'un nombre dit sa place dans la liste, pas sa valeur.",
          "On compte les nombres depuis le début, en pointant chacun du doigt.",
          `En comptant depuis le début, le ${o.mot} nombre de la liste est ${valeur}.`,
          `C'est ${valeur}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_ORDINAL_UTILISER — se servir des ordinaux
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_ordinal_utiliser_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_ordinal_utiliser",
    difficulty: 2,
    theme: "neutral",
    text: "Le jeton est caché sous le sixième gobelet en partant de la gauche. Sous combien de gobelets faut-il regarder avant de le trouver, si on commence par la gauche ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "On soulève les gobelets avant le bon.",
    explanation: exp(
      "Le rang dit la place, en comptant depuis le point de départ choisi.",
      "On compte les gobelets qui précèdent celui du jeton.",
      "Le jeton est sous le sixième : il y a cinq gobelets avant lui. 6 - 1 = 5.",
      "Il faut regarder sous 5 gobelets.",
    ),
    tags: ["ce1", "nombre_entier", "ordinaux", "piege"],
  },
  {
    kind: "fixed",
    id: "ce1_ordinal_utiliser_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_ordinal_utiliser",
    difficulty: 4,
    theme: "reunion",
    text: "À la course de la Diagonale, 167 coureurs sont partis. Combien de coureurs sont arrivés avant le quarante-huitième ?",
    format: "short",
    expected: ["47"],
    comparator: "number_equal",
    hint: "Le nombre de coureurs partis ne sert à rien ici.",
    explanation: exp(
      "Le rang d'arrivée compte le coureur lui-même.",
      "Pour savoir combien sont arrivés avant, on enlève 1 au rang.",
      "48 - 1 = 47. Les 167 partants ne changent rien : la question porte sur ce qui se passe avant la quarante-huitième place.",
      "47 coureurs sont arrivés avant lui.",
    ),
    tags: ["ce1", "nombre_entier", "ordinaux", "reunion", "piege"],
  },

  /* =========================================================
     CE1_ORDINAL_SUITE_SYMBOLES — les suites répétitives
     Le programme le demande mot pour mot : « Dans la suite
     répétitive ABABAB…, quelle est la dix-neuvième lettre ? »
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_ordinal_symboles_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_ordinal_suite_symboles",
    difficulty: 4,
    theme: "neutral",
    text: "Dans la suite ABABAB…, quelle est la dixième lettre ?",
    format: "qcm",
    choices: ["B", "A", "C", "il n'y en a pas"],
    expected: ["B"],
    comparator: "mcq_exact",
    hint: "Les lettres de rang pair sont toujours les mêmes.",
    explanation: exp(
      "Dans une suite qui se répète, le rang suffit à savoir quel symbole tombe.",
      "On regarde le motif : ici il fait deux lettres, A puis B.",
      "Les rangs impairs (1, 3, 5…) donnent A, les rangs pairs (2, 4, 6…) donnent B. Dix est pair, donc c'est B.",
      "La dixième lettre est B.",
    ),
    tags: ["ce1", "nombre_entier", "ordinaux", "suite", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_ordinal_symboles_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_ordinal_suite_symboles",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche la longueur du motif qui se répète.",
    tags: ["ce1", "nombre_entier", "ordinaux", "suite", "template"],
    generate: () => {
      const motif = randomChoice([
        ["A", "B"],
        ["A", "B", "C"],
        ["▲", "●"],
        ["▲", "▲", "●"],
      ]);
      const rang = randomInt(7, 20);
      const bonne = motif[(rang - 1) % motif.length];
      const autres = motif.filter((s) => s !== bonne);
      const debut = Array.from({ length: 8 }, (_, i) => motif[i % motif.length]).join("");
      return {
        text: `Dans la suite ${debut}…, quel est le symbole numéro ${rang} ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          ...autres,
          "aucun de ceux-là",
          "on ne peut pas savoir",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Dans une suite qui se répète, le motif revient toujours identique.",
          "On compte la longueur du motif, puis on avance de motif en motif jusqu'au rang cherché.",
          `Le motif fait ${motif.length} symboles : ${motif.join(" ")}. En avançant de ${motif.length} en ${motif.length}, on tombe sur ${bonne} au rang ${rang}.`,
          `C'est ${bonne}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_ENTIER_DEFI — les défis
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_entier_defi_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Avec les chiffres 4, 7 et 2, quel est le plus GRAND nombre à trois chiffres qu'on peut écrire ?",
    format: "short",
    expected: ["742"],
    comparator: "number_equal",
    hint: "Où faut-il mettre le plus grand chiffre pour qu'il compte le plus ?",
    explanation: exp(
      "Un chiffre compte d'autant plus qu'il est placé à gauche.",
      "On range les chiffres du plus grand au plus petit, en partant des centaines.",
      "Le plus grand chiffre, 7, va aux centaines. Puis 4 aux dizaines, puis 2 aux unités : 742.",
      "Le plus grand nombre est 742.",
    ),
    tags: ["ce1", "nombre_entier", "defi"],
  },
  {
    kind: "template",
    id: "ce1_entier_defi_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Le chiffre placé aux centaines pèse le plus lourd.",
    tags: ["ce1", "nombre_entier", "defi", "template"],
    generate: () => {
      const chiffres = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 3);
      const tries = [...chiffres].sort((a, b) => a - b);
      const plusGrand = randomChoice([true, false]);
      const bonne = plusGrand
        ? Number([...tries].reverse().join(""))
        : Number(tries.join(""));
      return {
        text: `Avec les chiffres ${chiffres.join(", ")}, quel est le plus ${plusGrand ? "GRAND" : "PETIT"} nombre à trois chiffres qu'on peut écrire ?`,
        format: "short",
        expected: [String(bonne)],
        comparator: "number_equal",
        explanation: exp(
          "Un chiffre compte d'autant plus qu'il est placé à gauche : les centaines pèsent cent fois plus que les unités.",
          `On range les chiffres du plus ${plusGrand ? "grand" : "petit"} au plus ${plusGrand ? "petit" : "grand"}, en commençant par les centaines.`,
          `Rangés dans cet ordre, ${chiffres.join(", ")} donnent ${bonne}.`,
          `C'est ${bonne}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_entier_defi_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce1_entier_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Les mêmes chiffres, deux places différentes.",
    tags: ["ce1", "nombre_entier", "defi", "piege", "template"],
    generate: () => {
      const d = randomInt(2, 9);
      let u = randomInt(1, 9);
      if (u === d) u = d === 9 ? 1 : d + 1;
      const a = d * 10 + u;
      const b = u * 10 + d;
      const ecart = Math.abs(a - b);
      return {
        text: `On écrit ${a}, puis on échange ses deux chiffres pour obtenir ${b}. De combien les deux nombres sont-ils éloignés ?`,
        format: "short",
        expected: [String(ecart)],
        comparator: "number_equal",
        explanation: exp(
          "Échanger deux chiffres change le nombre, parce que chaque chiffre change de valeur en changeant de place.",
          "On calcule la différence entre le plus grand et le plus petit.",
          `${Math.max(a, b)} - ${Math.min(a, b)} = ${ecart}. Les mêmes chiffres, mais pas la même quantité.`,
          `Ils sont éloignés de ${ecart}.`,
        ),
      };
    },
  },
];
