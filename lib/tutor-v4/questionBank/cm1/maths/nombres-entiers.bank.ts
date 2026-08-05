// lib/tutor-v4/question-banks/maths/cm1/nombres-entiers.bank.ts

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

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
  // Jamais deux fois la même ligne. Un gabarit dont le piège coïncide avec la
  // bonne réponse (les coordonnées inversées quand x = y, un arrondi égal à la
  // valeur de départ…) affichait la même proposition deux fois, et l'élève
  // voyait deux réponses justes. Dédupliquer AVANT de couper à quatre laisse
  // aussi une chance aux distracteurs surnuméraires de prendre la place.
  // ⚠️ 04/08/2026 — la bonne réponse était jetée dans le même chapeau que les
  // pièges : à cinq pièges écrits, le mélange pouvait la laisser au fond et
  // le découpage à quatre l'emportait. L'élève voyait alors quatre pièges et
  // rien d'autre. On la met de côté, on tire trois distracteurs, on mélange.
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function formatNumber(n: number): string {
  return n.toLocaleString("fr-FR");
}

function exp(
  definition: string,
  methode: string,
  calcul: string,
  conclusion: string
) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

export const nombresEntiersBank: TutorBankItemV4[] = [
  // ============================================================
  // ENTIER_LIRE
  // Lire et écrire des nombres entiers
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_entier_lire_qcm_001",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Comment écrit-on en chiffres : « trois mille deux cent quarante » ?",
    format: "qcm",
    choices: ["3 240", "3 024", "32 040", "324"],
    expected: ["3 240"],
    comparator: "mcq_exact",
    hint: "Repère les milliers, les centaines, les dizaines et les unités.",
    explanation: exp(
      "Lire un nombre entier, c’est reconnaître la valeur de chaque chiffre selon sa position.",
      "On sépare le nombre en milliers, centaines, dizaines et unités.",
      "« trois mille » donne 3 000 et « deux cent quarante » donne 240. Donc 3 000 + 240 = 3 240.",
      "Le nombre s’écrit 3 240."
    ),
    tags: ["cm1", "nombres_entiers", "lecture", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_lire_qcm_002",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Comment écrit-on en chiffres : « douze mille trente » ?",
    format: "qcm",
    choices: ["12 030", "12 300", "1 230", "120 030"],
    expected: ["12 030"],
    comparator: "mcq_exact",
    hint: "Il y a 12 milliers et 30 unités. Attention au zéro des centaines.",
    explanation: exp(
      "Un nombre entier peut contenir des zéros pour garder les bonnes positions.",
      "On place d’abord la classe des milliers, puis la classe des unités.",
      "« douze mille » donne 12 000 et « trente » donne 30. Donc 12 000 + 30 = 12 030.",
      "Le nombre s’écrit 12 030."
    ),
    tags: ["cm1", "nombres_entiers", "lecture", "zeros", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_lire_short_003",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Écris en chiffres : « vingt-quatre mille cinq cent six ».",
    format: "short",
    expected: ["24506", "24 506"],
    comparator: "number_equal",
    hint: "Il y a 24 milliers, puis 506.",
    explanation: exp(
      "Écrire un nombre en chiffres demande de placer chaque classe correctement.",
      "On repère les milliers puis les centaines, dizaines et unités.",
      "« vingt-quatre mille » = 24 000 et « cinq cent six » = 506. Donc 24 000 + 506 = 24 506.",
      "Le nombre est 24 506."
    ),
    tags: ["cm1", "nombres_entiers", "lecture", "short"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_lire_short_004",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Écris en chiffres : « quarante mille huit ».",
    format: "short",
    expected: ["40008", "40 008"],
    comparator: "number_equal",
    hint: "Il y a 40 milliers et 8 unités. Les zéros gardent les places vides.",
    explanation: exp(
      "Les zéros sont importants dans l’écriture d’un nombre entier.",
      "On place 40 000, puis 8 dans les unités.",
      "40 000 + 8 = 40 008. Les centaines et les dizaines sont vides, donc on écrit des zéros.",
      "Le nombre est 40 008."
    ),
    tags: ["cm1", "nombres_entiers", "lecture", "zeros", "short"],
  },

  {
    kind: "template",
    id: "cm1_entier_lire_tpl_005",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_lire",
    difficulty: 2,
    theme: "neutral",
    hint: "Attention aux zéros : ils servent à garder les bonnes colonnes.",
    tags: ["cm1", "nombres_entiers", "lecture", "template", "qcm"],
    generate: () => {
      const examples = [
        {
          words: "quinze mille sept",
          value: 15007,
          wrongs: ["15 700", "1 507", "150 007"],
        },
        {
          words: "trente-six mille quatre-vingts",
          value: 36080,
          wrongs: ["36 800", "3 680", "360 080"],
        },
        {
          words: "quatre-vingt mille cinq",
          value: 80005,
          wrongs: ["80 500", "8 005", "800 005"],
        },
        {
          words: "vingt-sept mille cinquante",
          value: 27050,
          wrongs: ["27 500", "2 750", "270 050"],
        },
      ];

      const e = randomChoice(examples);
      const correct = formatNumber(e.value);

      return {
        text: `Comment écrit-on en chiffres : « ${e.words} » ?`,
        format: "qcm",
        choices: makeChoices(correct, e.wrongs),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Lire un nombre entier demande de bien placer chaque classe.",
          "On identifie les milliers puis les unités. Les zéros servent à garder les bonnes positions.",
          `« ${e.words} » s’écrit ${correct}.`,
          `La bonne réponse est ${correct}.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "cm1_entier_lire_open_006",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Explique pourquoi le nombre 30 407 contient un zéro.",
    format: "open",
    expected: ["zéro", "0", "place", "colonne"],
    comparator: "contains_keyword",
    hint: "Le zéro sert à montrer qu’une colonne est vide.",
    explanation: exp(
      "Dans un nombre entier, chaque chiffre a une position : unités, dizaines, centaines, milliers...",
      "Quand une position est vide, on écrit un zéro pour garder la bonne place.",
      "Dans 30 407, le zéro montre qu’il n’y a pas de millier dans la classe des unités de milliers.",
      "Le zéro est donc utile : il garde la bonne écriture du nombre."
    ),
    tags: ["cm1", "nombres_entiers", "lecture", "zeros", "open"],
  },

  // ============================================================
  // ENTIER_COMPARER
  // Comparer et ordonner des nombres entiers
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_entier_comparer_qcm_001",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_comparer",
    difficulty: 1,
    theme: "neutral",
    text: "Quel est le plus grand nombre ?",
    format: "qcm",
    choices: ["8 760", "8 706", "8 607", "8 076"],
    expected: ["8 760"],
    comparator: "mcq_exact",
    hint: "Compare chiffre par chiffre en partant de la gauche.",
    explanation: exp(
      "Comparer deux nombres entiers, c’est déterminer lequel est le plus petit ou le plus grand.",
      "On compare d’abord le nombre de chiffres. S’il est identique, on compare les chiffres de gauche à droite.",
      "Tous les nombres ont 4 chiffres et commencent par 8. Ensuite, 7 centaines est plus grand que 6, 0 et 0.",
      "Le plus grand nombre est 8 760."
    ),
    tags: ["cm1", "nombres_entiers", "comparaison", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_comparer_qcm_002",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_comparer",
    difficulty: 1,
    theme: "neutral",
    text: "Complète : 12 408 ... 12 804",
    format: "qcm",
    choices: ["<", ">", "="],
    expected: ["<"],
    comparator: "mcq_exact",
    hint: "Les deux nombres commencent par 12. Compare ensuite les centaines.",
    explanation: exp(
      "Les signes < et > servent à comparer deux nombres.",
      "On compare les chiffres depuis la gauche.",
      "12 408 et 12 804 commencent tous les deux par 12. Ensuite, 4 centaines est plus petit que 8 centaines.",
      "On écrit donc 12 408 < 12 804."
    ),
    tags: ["cm1", "nombres_entiers", "comparaison", "symboles", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_comparer_qcm_003",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_comparer",
    difficulty: 1,
    theme: "neutral",
    text: "Complète : 35 120 ... 35 120",
    format: "qcm",
    choices: ["=", "<", ">"],
    expected: ["="],
    comparator: "mcq_exact",
    hint: "Les deux nombres sont exactement les mêmes.",
    explanation: exp(
      "Deux nombres sont égaux s’ils ont exactement la même valeur.",
      "On compare tous les chiffres dans l’ordre.",
      "35 120 et 35 120 ont les mêmes chiffres aux mêmes positions.",
      "On écrit donc 35 120 = 35 120."
    ),
    tags: ["cm1", "nombres_entiers", "comparaison", "egalite", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_ordonner_qcm_004",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel rangement est dans l’ordre croissant ?",
    format: "qcm",
    choices: [
      "3 045 < 3 405 < 3 450",
      "3 405 < 3 045 < 3 450",
      "3 450 < 3 405 < 3 045",
      "3 045 < 3 450 < 3 405",
    ],
    expected: ["3 045 < 3 405 < 3 450"],
    comparator: "mcq_exact",
    hint: "Ordre croissant signifie du plus petit au plus grand.",
    explanation: exp(
      "Ordonner des nombres, c’est les ranger du plus petit au plus grand ou du plus grand au plus petit.",
      "Pour l’ordre croissant, on commence par le plus petit.",
      "3 045 est plus petit que 3 405, et 3 405 est plus petit que 3 450.",
      "L’ordre croissant est : 3 045 < 3 405 < 3 450."
    ),
    tags: ["cm1", "nombres_entiers", "ordre_croissant", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_ordonner_qcm_005",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel rangement est dans l’ordre décroissant ?",
    format: "qcm",
    choices: [
      "9 500 > 9 050 > 8 950",
      "8 950 > 9 050 > 9 500",
      "9 050 > 9 500 > 8 950",
      "9 500 < 9 050 < 8 950",
    ],
    expected: ["9 500 > 9 050 > 8 950"],
    comparator: "mcq_exact",
    hint: "Ordre décroissant signifie du plus grand au plus petit.",
    explanation: exp(
      "Ordonner dans l’ordre décroissant, c’est ranger du plus grand au plus petit.",
      "On compare les nombres puis on place le plus grand d’abord.",
      "9 500 est plus grand que 9 050, et 9 050 est plus grand que 8 950.",
      "L’ordre décroissant est : 9 500 > 9 050 > 8 950."
    ),
    tags: ["cm1", "nombres_entiers", "ordre_decroissant", "qcm"],
  },

  {
    kind: "template",
    id: "cm1_entier_comparer_tpl_006",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_comparer",
    difficulty: 2,
    theme: "reunion",
    hint: "Compare les chiffres de gauche à droite.",
    tags: ["cm1", "nombres_entiers", "comparaison", "template", "reunion"],
    generate: () => {
      const a = randomInt(2000, 90000);
      const b = a + randomChoice([-900, -90, -9, 9, 90, 900]);

      const correct = a > b ? ">" : a < b ? "<" : "=";

      return {
        text: `À La Réunion, deux compteurs indiquent ${formatNumber(
          a
        )} et ${formatNumber(b)}. Complète : ${formatNumber(
          a
        )} ... ${formatNumber(b)}`,
        format: "qcm",
        choices: ["<", ">", "="],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Comparer deux entiers, c’est regarder lequel représente la plus grande quantité.",
          "On compare les chiffres de gauche à droite.",
          `${formatNumber(a)} ${correct} ${formatNumber(b)}.`,
          `Le bon signe est ${correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_entier_ordonner_tpl_007",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Ordre croissant : du plus petit au plus grand.",
    tags: ["cm1", "nombres_entiers", "ordonner", "template", "qcm"],
    generate: () => {
      const a = randomInt(1000, 9000);
      const b = a + randomChoice([100, 200, 300, 500]);
      const c = b + randomChoice([100, 200, 300, 500]);

      const correct = `${formatNumber(a)} < ${formatNumber(b)} < ${formatNumber(c)}`;

      return {
        text: "Quel rangement est dans l’ordre croissant ?",
        format: "qcm",
        choices: makeChoices(correct, [
          `${formatNumber(b)} < ${formatNumber(a)} < ${formatNumber(c)}`,
          `${formatNumber(c)} < ${formatNumber(b)} < ${formatNumber(a)}`,
          `${formatNumber(a)} < ${formatNumber(c)} < ${formatNumber(b)}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "L’ordre croissant va du plus petit au plus grand.",
          "On compare les nombres puis on les range.",
          `${formatNumber(a)} est plus petit que ${formatNumber(b)}, et ${formatNumber(b)} est plus petit que ${formatNumber(c)}.`,
          `L’ordre croissant est : ${correct}.`
        ),
      };
    },
  },
    // ============================================================
  // ENTIER_DECOMPOSER
  // Décomposer des nombres entiers
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_entier_decomposer_qcm_001",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_decomposer",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est la bonne décomposition de 4 582 ?",
    format: "qcm",
    choices: [
      "4 000 + 500 + 80 + 2",
      "4 000 + 50 + 80 + 2",
      "400 + 500 + 80 + 2",
      "4 000 + 500 + 8 + 2",
    ],
    expected: ["4 000 + 500 + 80 + 2"],
    comparator: "mcq_exact",
    hint: "Chaque chiffre représente une valeur selon sa position.",
    explanation: exp(
      "Décomposer un nombre, c’est écrire la valeur de chacun de ses chiffres.",
      "On repère les milliers, centaines, dizaines et unités.",
      "Dans 4 582 : 4 vaut 4 000, 5 vaut 500, 8 vaut 80 et 2 vaut 2.",
      "Donc 4 582 = 4 000 + 500 + 80 + 2."
    ),
    tags: ["cm1", "nombres_entiers", "decomposition", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_decomposer_qcm_002",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_decomposer",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est la bonne décomposition de 7 306 ?",
    format: "qcm",
    choices: [
      "7 000 + 300 + 6",
      "7 000 + 30 + 6",
      "700 + 300 + 6",
      "7 000 + 300 + 60",
    ],
    expected: ["7 000 + 300 + 6"],
    comparator: "mcq_exact",
    hint: "Le zéro des dizaines signifie qu’il n’y a pas de dizaine.",
    explanation: exp(
      "Décomposer un nombre, c’est écrire la valeur de ses chiffres non nuls.",
      "On repère la position de chaque chiffre.",
      "Dans 7 306 : 7 vaut 7 000, 3 vaut 300, 0 vaut 0 dizaine, 6 vaut 6.",
      "Donc 7 306 = 7 000 + 300 + 6."
    ),
    tags: ["cm1", "nombres_entiers", "decomposition", "zeros", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_decomposer_short_003",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_decomposer",
    difficulty: 2,
    theme: "neutral",
    text: "Complète : 20 000 + 400 + 9 = ...",
    format: "short",
    expected: ["20409", "20 409"],
    comparator: "number_equal",
    hint: "Il n’y a pas de milliers ni de dizaines dans la classe des unités : il faut garder les zéros.",
    explanation: exp(
      "Composer un nombre, c’est regrouper les valeurs de ses chiffres.",
      "On place chaque valeur dans la bonne colonne.",
      "20 000 + 400 + 9 = 20 409.",
      "Le nombre est 20 409."
    ),
    tags: ["cm1", "nombres_entiers", "composition", "zeros", "short"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_decomposer_short_004",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_decomposer",
    difficulty: 2,
    theme: "neutral",
    text: "Complète : 60 000 + 3 000 + 50 + 7 = ...",
    format: "short",
    expected: ["63057", "63 057"],
    comparator: "number_equal",
    hint: "Il n’y a pas de centaines : le chiffre des centaines est 0.",
    explanation: exp(
      "Composer un nombre, c’est additionner les valeurs placées dans les bonnes colonnes.",
      "On garde les colonnes vides avec des zéros.",
      "60 000 + 3 000 + 50 + 7 = 63 057.",
      "Le nombre est 63 057."
    ),
    tags: ["cm1", "nombres_entiers", "composition", "zeros", "short"],
  },

  {
    kind: "template",
    id: "cm1_entier_decomposer_tpl_005",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_decomposer",
    difficulty: 2,
    theme: "neutral",
    hint: "Écris séparément les milliers, centaines, dizaines et unités.",
    tags: ["cm1", "nombres_entiers", "decomposition", "template", "qcm"],
    generate: () => {
      const n = randomInt(2000, 9999);
      const milliers = Math.floor(n / 1000) * 1000;
      const centaines = Math.floor((n % 1000) / 100) * 100;
      const dizaines = Math.floor((n % 100) / 10) * 10;
      const unites = n % 10;

      const parts = [milliers, centaines, dizaines, unites].filter((x) => x > 0);
      const correct = parts.map(formatNumber).join(" + ");

      const wrongs = [
        `${formatNumber(milliers)} + ${formatNumber(centaines / 10)} + ${formatNumber(dizaines)} + ${unites}`,
        `${formatNumber(milliers / 10)} + ${formatNumber(centaines)} + ${formatNumber(dizaines)} + ${unites}`,
        `${formatNumber(milliers)} + ${formatNumber(centaines)} + ${formatNumber(dizaines + unites)}`,
      ];

      return {
        text: `Quelle est la bonne décomposition de ${formatNumber(n)} ?`,
        format: "qcm",
        choices: makeChoices(correct, wrongs),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Décomposer un nombre, c’est donner la valeur de chacun de ses chiffres.",
          "On lit le nombre de gauche à droite et on écrit chaque valeur non nulle.",
          `${formatNumber(n)} = ${correct}.`,
          `La bonne décomposition est ${correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_entier_decomposer_tpl_006_composer",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_decomposer",
    difficulty: 2,
    theme: "neutral",
    hint: "Place chaque valeur dans la bonne colonne.",
    tags: ["cm1", "nombres_entiers", "composition", "template", "short"],
    generate: () => {
      const dizainesMilliers = randomInt(1, 8) * 10000;
      const milliers = randomChoice([0, 1000, 2000, 3000, 4000, 5000]);
      const centaines = randomChoice([0, 100, 200, 300, 400, 500, 600, 700, 800, 900]);
      const dizaines = randomChoice([0, 10, 20, 30, 40, 50, 60, 70, 80, 90]);
      const unites = randomInt(1, 9);

      const n = dizainesMilliers + milliers + centaines + dizaines + unites;
      const parts = [dizainesMilliers, milliers, centaines, dizaines, unites].filter(
        (x) => x > 0
      );

      return {
        text: `Complète : ${parts.map(formatNumber).join(" + ")} = ...`,
        format: "short",
        expected: [String(n), formatNumber(n)],
        comparator: "number_equal",
        explanation: exp(
          "Composer un nombre, c’est regrouper les valeurs de ses chiffres.",
          "On additionne les valeurs en gardant les bonnes positions.",
          `${parts.map(formatNumber).join(" + ")} = ${formatNumber(n)}.`,
          `Le nombre est ${formatNumber(n)}.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "cm1_entier_decomposer_open_007",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_decomposer",
    difficulty: 3,
    theme: "neutral",
    text: "Explique l’erreur : un élève écrit 12 405 = 10 000 + 2 000 + 400 + 50.",
    format: "open",
    expected: ["5", "unités", "50", "dizaines"],
    comparator: "contains_keyword",
    hint: "Regarde le dernier chiffre de 12 405.",
    explanation: exp(
      "Chaque chiffre d’un nombre a une valeur selon sa position.",
      "Il faut vérifier les unités, dizaines, centaines, milliers...",
      "Dans 12 405, le dernier chiffre est 5 : il vaut 5 unités, pas 50.",
      "La bonne décomposition est 10 000 + 2 000 + 400 + 5."
    ),
    tags: ["cm1", "nombres_entiers", "decomposition", "erreur_frequente", "open"],
  },

  // ============================================================
  // ENTIER_ARRONDIR
  // Arrondir un nombre entier simple
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_entier_arrondir_qcm_001",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_arrondir",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est l’arrondi de 4 682 à la centaine près ?",
    format: "qcm",
    choices: ["4 700", "4 600", "4 680", "5 000"],
    expected: ["4 700"],
    comparator: "mcq_exact",
    hint: "Pour arrondir à la centaine, regarde le chiffre des dizaines.",
    explanation: exp(
      "Arrondir un nombre, c’est le remplacer par un nombre proche plus simple.",
      "Pour arrondir à la centaine, on regarde le chiffre des dizaines. S’il est 5 ou plus, on augmente la centaine.",
      "Dans 4 682, le chiffre des dizaines est 8. On arrondit donc vers le haut.",
      "L’arrondi à la centaine près est 4 700."
    ),
    tags: ["cm1", "nombres_entiers", "arrondi", "centaine", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_arrondir_qcm_002",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_arrondir",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est l’arrondi de 6 241 à la centaine près ?",
    format: "qcm",
    choices: ["6 200", "6 300", "6 240", "6 000"],
    expected: ["6 200"],
    comparator: "mcq_exact",
    hint: "Pour arrondir à la centaine, regarde le chiffre des dizaines.",
    explanation: exp(
      "Arrondir à la centaine près, c’est choisir la centaine la plus proche.",
      "On regarde le chiffre des dizaines.",
      "Dans 6 241, le chiffre des dizaines est 4. Comme 4 < 5, on garde 6 200.",
      "L’arrondi à la centaine près est 6 200."
    ),
    tags: ["cm1", "nombres_entiers", "arrondi", "centaine", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_arrondir_short_003",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_arrondir",
    difficulty: 2,
    theme: "neutral",
    text: "Arrondis 23 249 au millier près.",
    format: "short",
    expected: ["23000", "23 000"],
    comparator: "number_equal",
    hint: "Pour arrondir au millier, regarde le chiffre des centaines.",
    explanation: exp(
      "Arrondir au millier près, c’est choisir le millier le plus proche.",
      "On regarde le chiffre des centaines.",
      "Dans 23 249, le chiffre des centaines est 2. Comme 2 < 5, on garde 23 milliers.",
      "L’arrondi est 23 000."
    ),
    tags: ["cm1", "nombres_entiers", "arrondi", "millier", "short"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_arrondir_short_004",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_arrondir",
    difficulty: 2,
    theme: "neutral",
    text: "Arrondis 47 820 au millier près.",
    format: "short",
    expected: ["48000", "48 000"],
    comparator: "number_equal",
    hint: "Pour arrondir au millier, regarde le chiffre des centaines.",
    explanation: exp(
      "Arrondir au millier près, c’est choisir le millier le plus proche.",
      "On regarde le chiffre des centaines.",
      "Dans 47 820, le chiffre des centaines est 8. Comme 8 ≥ 5, on augmente le nombre de milliers.",
      "L’arrondi est 48 000."
    ),
    tags: ["cm1", "nombres_entiers", "arrondi", "millier", "short"],
  },

  {
    kind: "template",
    id: "cm1_entier_arrondir_tpl_005_centaine",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_arrondir",
    difficulty: 2,
    theme: "neutral",
    hint: "À la centaine près, regarde le chiffre des dizaines.",
    tags: ["cm1", "nombres_entiers", "arrondi", "centaine", "template", "qcm"],
    generate: () => {
      const n = randomChoice([1248, 3672, 4589, 6124, 7899, 9351]);
      const rounded = Math.round(n / 100) * 100;
      const correct = formatNumber(rounded);

      const wrongs = [
        formatNumber(Math.floor(n / 100) * 100),
        formatNumber(Math.ceil(n / 100) * 100),
        formatNumber(Math.round(n / 10) * 10),
      ].filter((x) => x !== correct);

      return {
        text: `Arrondis ${formatNumber(n)} à la centaine près.`,
        format: "qcm",
        choices: makeChoices(correct, wrongs),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Arrondir permet de donner une valeur approchée plus simple.",
          "Pour arrondir à la centaine près, on regarde le chiffre des dizaines.",
          `${formatNumber(n)} arrondi à la centaine près donne ${correct}.`,
          `La bonne réponse est ${correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_entier_arrondir_tpl_006_millier_reunion",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_arrondir",
    difficulty: 3,
    theme: "reunion",
    hint: "Au millier près, regarde le chiffre des centaines.",
    tags: ["cm1", "nombres_entiers", "arrondi", "millier", "template", "reunion"],
    generate: () => {
      const n = randomChoice([12480, 26720, 35890, 41240, 58999, 73510]);
      const rounded = Math.round(n / 1000) * 1000;
      const correct = formatNumber(rounded);

      const wrongs = [
        formatNumber(Math.floor(n / 1000) * 1000),
        formatNumber(Math.ceil(n / 1000) * 1000),
        formatNumber(Math.round(n / 100) * 100),
      ].filter((x) => x !== correct);

      return {
        text: `Une association de La Réunion compte environ ${formatNumber(
          n
        )} participants sur l’année. Arrondis ce nombre au millier près.`,
        format: "qcm",
        choices: makeChoices(correct, wrongs),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Arrondir permet de donner une valeur approchée plus simple.",
          "Pour arrondir au millier près, on regarde le chiffre des centaines.",
          `${formatNumber(n)} arrondi au millier près donne ${correct}.`,
          `La bonne réponse est ${correct}.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "cm1_entier_arrondir_open_007",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_arrondir",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi 8 549 s’arrondit à 8 500 à la centaine près, et non à 8 600.",
    format: "open",
    expected: ["dizaines", "4", "inférieur", "5"],
    comparator: "contains_keyword",
    hint: "Pour la centaine, on regarde le chiffre des dizaines.",
    explanation: exp(
      "Pour arrondir à la centaine près, on regarde le chiffre des dizaines.",
      "Si le chiffre des dizaines est 0, 1, 2, 3 ou 4, on garde la centaine. S’il est 5 ou plus, on augmente.",
      "Dans 8 549, le chiffre des dizaines est 4. Comme 4 < 5, on garde 8 500.",
      "Donc 8 549 s’arrondit à 8 500 à la centaine près."
    ),
    tags: ["cm1", "nombres_entiers", "arrondi", "justification", "open"],
  },
    // ============================================================
  // ENTIER_MULTIPLE
  // Reconnaître les multiples simples
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_entier_multiple_qcm_001",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_multiple",
    difficulty: 2,
    theme: "neutral",
    text: "Quel nombre est un multiple de 6 ?",
    format: "qcm",
    choices: ["42", "44", "46", "50"],
    expected: ["42"],
    comparator: "mcq_exact",
    hint: "Un multiple de 6 est dans la table de 6.",
    explanation: exp(
      "Un multiple d’un nombre est un résultat obtenu dans sa table de multiplication.",
      "Pour savoir si 42 est un multiple de 6, on cherche si 42 est dans la table de 6.",
      "6 × 7 = 42.",
      "Donc 42 est un multiple de 6."
    ),
    tags: ["cm1", "nombres_entiers", "multiples", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_multiple_qcm_002",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_multiple",
    difficulty: 2,
    theme: "neutral",
    text: "72 est-il un multiple de 8 ?",
    format: "qcm",
    choices: ["Oui", "Non"],
    expected: ["Oui"],
    comparator: "mcq_exact",
    hint: "Cherche si 72 apparaît dans la table de 8.",
    explanation: exp(
      "Un nombre est un multiple de 8 s’il peut s’écrire 8 × un entier.",
      "On utilise la table de 8.",
      "8 × 9 = 72.",
      "Oui, 72 est un multiple de 8."
    ),
    tags: ["cm1", "nombres_entiers", "multiples", "table", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_multiple_qcm_003",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_multiple",
    difficulty: 2,
    theme: "neutral",
    text: "35 est-il un multiple de 4 ?",
    format: "qcm",
    choices: ["Oui", "Non"],
    expected: ["Non"],
    comparator: "mcq_exact",
    hint: "Cherche dans la table de 4 : 4 × 8 = 32 et 4 × 9 = 36.",
    explanation: exp(
      "Un multiple de 4 est un nombre que l’on obtient dans la table de 4.",
      "On cherche si 35 peut s’écrire 4 × un entier.",
      "4 × 8 = 32 et 4 × 9 = 36. 35 n’est pas dans la table de 4.",
      "Non, 35 n’est pas un multiple de 4."
    ),
    tags: ["cm1", "nombres_entiers", "multiples", "table", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_multiple_qcm_004",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_multiple",
    difficulty: 2,
    theme: "neutral",
    text: "Quel nombre est un multiple de 9 ?",
    format: "qcm",
    choices: ["63", "65", "67", "70"],
    expected: ["63"],
    comparator: "mcq_exact",
    hint: "Un multiple de 9 est dans la table de 9.",
    explanation: exp(
      "Un multiple d’un nombre est un résultat de multiplication.",
      "On cherche un nombre de la table de 9.",
      "9 × 7 = 63.",
      "Donc 63 est un multiple de 9."
    ),
    tags: ["cm1", "nombres_entiers", "multiples", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_multiple_qcm_005_multiple_10",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_multiple",
    difficulty: 2,
    theme: "neutral",
    text: "Quel nombre est un multiple de 10 ?",
    format: "qcm",
    choices: ["120", "125", "128", "102"],
    expected: ["120"],
    comparator: "mcq_exact",
    hint: "Un multiple de 10 se termine par 0.",
    explanation: exp(
      "Un multiple de 10 est un nombre obtenu dans la table de 10.",
      "On peut aussi reconnaître les multiples de 10 : ils se terminent par 0.",
      "120 se termine par 0, et 10 × 12 = 120.",
      "Donc 120 est un multiple de 10."
    ),
    tags: ["cm1", "nombres_entiers", "multiples", "10", "qcm"],
  },

  {
    kind: "template",
    id: "cm1_entier_multiple_tpl_006_trouver_multiple",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_multiple",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche dans la table de multiplication.",
    tags: ["cm1", "nombres_entiers", "multiples", "template", "qcm"],
    generate: () => {
      const base = randomChoice([3, 4, 5, 6, 7, 8, 9]);
      const k = randomInt(3, 10);
      const correctNumber = base * k;

      const correct = String(correctNumber);

      return {
        text: `Quel nombre est un multiple de ${base} ?`,
        format: "qcm",
        // Pour un multiple de 3, « le suivant du suivant » et « le précédent du
        // multiple d'après » sont le même nombre : l'élève voyait deux fois la
        // même proposition. Aucun de ces voisins n'est multiple de la base,
        // c'est ce qui en fait des pièges honnêtes.
        choices: makeChoices(correct, [
          String(correctNumber + 1),
          String(correctNumber + 2),
          String(correctNumber + base - 1),
          String(correctNumber + base + 1),
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Un multiple est le résultat d’une multiplication par un nombre entier.",
          `On cherche un nombre qui peut s’écrire ${base} × un entier.`,
          `${base} × ${k} = ${correctNumber}.`,
          `${correctNumber} est donc un multiple de ${base}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_entier_multiple_tpl_007_oui_non",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_multiple",
    difficulty: 2,
    theme: "neutral",
    hint: "Essaie de retrouver une multiplication exacte.",
    tags: ["cm1", "nombres_entiers", "multiples", "template", "oui_non", "qcm"],
    generate: () => {
      const base = randomChoice([3, 4, 5, 6, 7, 8, 9]);
      const isMultiple = randomChoice([true, false]);

      const k = randomInt(3, 10);
      const value = isMultiple ? base * k : base * k + randomChoice([1, 2]);

      return {
        text: `${value} est-il un multiple de ${base} ?`,
        format: "qcm",
        choices: ["Oui", "Non"],
        expected: [isMultiple ? "Oui" : "Non"],
        comparator: "mcq_exact",
        explanation: exp(
          `Un multiple de ${base} est un résultat de la table de ${base}.`,
          "On cherche si le nombre peut s’écrire comme une multiplication par ce nombre.",
          isMultiple
            ? `${base} × ${k} = ${value}.`
            : `${value} n’apparaît pas exactement dans la table de ${base}.`,
          isMultiple
            ? `Oui, ${value} est un multiple de ${base}.`
            : `Non, ${value} n’est pas un multiple de ${base}.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "cm1_entier_multiple_open_008",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_multiple",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi 45 est un multiple de 5.",
    format: "open",
    expected: ["5", "9", "45"],
    comparator: "contains_keyword",
    hint: "Trouve une multiplication qui donne 45.",
    explanation: exp(
      "Un multiple de 5 est un nombre que l’on obtient dans la table de 5.",
      "On cherche une multiplication avec 5.",
      "5 × 9 = 45.",
      "Donc 45 est un multiple de 5."
    ),
    tags: ["cm1", "nombres_entiers", "multiples", "justification", "open"],
  },

  // ============================================================
  // ENTIER_DEFI
  // Résoudre un défi sur les nombres entiers
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_entier_defi_qcm_001",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Je suis un nombre entier. Je suis supérieur à 2 500, inférieur à 2 600, et multiple de 10. Quel nombre peut être la réponse ?",
    format: "qcm",
    choices: ["2 540", "2 499", "2 601", "2 555"],
    expected: ["2 540"],
    comparator: "mcq_exact",
    hint: "Vérifie les trois conditions une par une.",
    explanation: exp(
      "Un défi sur les nombres entiers demande souvent de vérifier plusieurs informations.",
      "On teste les conditions : intervalle, comparaison et multiple.",
      "2 540 est bien entre 2 500 et 2 600. Il se termine par 0, donc c’est un multiple de 10.",
      "La réponse possible est 2 540."
    ),
    tags: ["cm1", "nombres_entiers", "defi", "comparaison", "multiple", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_defi_qcm_002",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Je suis un nombre entier à 4 chiffres. Mon chiffre des milliers est 4. Je suis plus petit que 4 300. Quel nombre peut être la réponse ?",
    format: "qcm",
    choices: ["4 120", "5 120", "4 350", "412"],
    expected: ["4 120"],
    comparator: "mcq_exact",
    hint: "Le nombre doit avoir 4 chiffres, commencer par 4 et être inférieur à 4 300.",
    explanation: exp(
      "Un défi sur les nombres entiers peut contenir plusieurs contraintes.",
      "On vérifie chaque information.",
      "4 120 a 4 chiffres, commence par 4, et 4 120 < 4 300.",
      "Une réponse possible est 4 120."
    ),
    tags: ["cm1", "nombres_entiers", "defi", "comparaison", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_defi_short_003_marche",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_defi",
    difficulty: 3,
    theme: "reunion",
    text: "Au marché de Saint-Pierre, un vendeur range 72 letchis dans des sachets de 8. Combien de sachets peut-il remplir ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "Cherche combien de fois 8 est contenu dans 72.",
    explanation: exp(
      "Résoudre un problème avec des entiers demande de choisir la bonne opération.",
      "Quand on partage une quantité en groupes égaux, on utilise une division.",
      "72 ÷ 8 = 9.",
      "Le vendeur peut remplir 9 sachets."
    ),
    tags: ["cm1", "nombres_entiers", "defi", "division", "reunion"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_defi_short_004_classe",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Une école reçoit 96 cahiers. On les répartit dans 12 boîtes identiques. Combien de cahiers y a-t-il dans chaque boîte ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "On partage 96 en 12 groupes égaux.",
    explanation: exp(
      "Quand on répartit une quantité en parts égales, on utilise une division.",
      "On divise le total par le nombre de groupes.",
      "96 ÷ 12 = 8.",
      "Il y a 8 cahiers dans chaque boîte."
    ),
    tags: ["cm1", "nombres_entiers", "defi", "division", "probleme"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_defi_short_005_arrondi",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Un nombre entier est 3 482. Quel est son arrondi à la centaine près ?",
    format: "short",
    expected: ["3500", "3 500"],
    comparator: "number_equal",
    hint: "À la centaine près, regarde le chiffre des dizaines.",
    explanation: exp(
      "Arrondir à la centaine près, c’est choisir la centaine la plus proche.",
      "On regarde le chiffre des dizaines.",
      "Dans 3 482, le chiffre des dizaines est 8. Comme 8 ≥ 5, on augmente la centaine.",
      "L’arrondi est 3 500."
    ),
    tags: ["cm1", "nombres_entiers", "defi", "arrondi"],
  },

  {
    kind: "template",
    id: "cm1_entier_defi_tpl_006_sachets",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_defi",
    difficulty: 3,
    theme: "reunion",
    hint: "Il faut utiliser une multiplication ou une division.",
    tags: ["cm1", "nombres_entiers", "defi", "multiple", "probleme", "reunion"],
    generate: () => {
      const parSachet = randomChoice([4, 6, 8, 9, 12]);
      const nbSachets = randomInt(5, 12);
      const quantite = parSachet * nbSachets;

      return {
        text: `Pour une sortie à Mafate, on prépare ${quantite} biscuits. On veut faire des sachets de ${parSachet} biscuits. Combien de sachets complets peut-on préparer ?`,
        format: "short",
        expected: [String(nbSachets)],
        comparator: "number_equal",
        explanation: exp(
          "Quand on fait des groupes égaux, on utilise une division.",
          "On divise le nombre total par le nombre d’objets dans chaque groupe.",
          `${quantite} ÷ ${parSachet} = ${nbSachets}.`,
          `On peut préparer ${nbSachets} sachets complets.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_entier_defi_tpl_007_arrondi",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Commence par repérer le rang demandé : centaine ou millier.",
    tags: ["cm1", "nombres_entiers", "defi", "arrondi", "template"],
    generate: () => {
      const n = randomChoice([3482, 5618, 7291, 8467, 9349]);
      const rounded = Math.round(n / 100) * 100;

      return {
        text: `Un nombre entier est ${formatNumber(
          n
        )}. Quel est son arrondi à la centaine près ?`,
        format: "short",
        expected: [String(rounded), formatNumber(rounded)],
        comparator: "number_equal",
        explanation: exp(
          "Arrondir à la centaine près, c’est choisir la centaine la plus proche.",
          "On regarde le chiffre des dizaines.",
          `${formatNumber(n)} s’arrondit à ${formatNumber(rounded)}.`,
          `L’arrondi est ${formatNumber(rounded)}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_entier_defi_tpl_008_nombre_mystere",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Vérifie les indices un par un.",
    tags: ["cm1", "nombres_entiers", "defi", "nombre_mystere", "template", "qcm"],
    generate: () => {
      const millier = randomChoice([2, 3, 4, 5, 6]);
      const start = millier * 1000 + 400;
      const correctNumber = millier * 1000 + 520;

      const correct = formatNumber(correctNumber);

      return {
        text: `Je suis un nombre à 4 chiffres. Mon chiffre des milliers est ${millier}. Je suis plus grand que ${formatNumber(
          start
        )} et je suis un multiple de 10. Quel nombre peut convenir ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          formatNumber(millier * 1000 + 399),
          formatNumber((millier + 1) * 1000 + 20),
          formatNumber(millier * 1000 + 555),
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Un nombre mystère doit respecter tous les indices.",
          "On vérifie le chiffre des milliers, la comparaison et le multiple de 10.",
          `${correct} commence par ${millier}, est plus grand que ${formatNumber(
            start
          )}, et se termine par 0.`,
          `Donc ${correct} convient.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "cm1_entier_defi_open_009",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Je suis un nombre entier à 4 chiffres. Mon chiffre des milliers est 3. Je suis plus grand que 3 500. Je suis un multiple de 10. Donne un exemple possible et explique.",
    format: "open",
    expected: ["3", "multiple", "10", "0"],
    comparator: "contains_keyword",
    hint: "Un multiple de 10 se termine par 0.",
    explanation: exp(
      "Un défi peut avoir plusieurs réponses possibles si toutes les conditions sont respectées.",
      "On vérifie chaque condition : nombre à 4 chiffres, commence par 3, plus grand que 3 500, multiple de 10.",
      "Par exemple, 3 620 convient : il a 4 chiffres, commence par 3, est plus grand que 3 500, et se termine par 0.",
      "Une réponse possible est 3 620, mais il y en a d’autres."
    ),
    tags: ["cm1", "nombres_entiers", "defi", "open", "raisonnement"],
  },

  // ============================================================
  // TOP-UP — ENTIER_LIRE
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_entier_lire_short_007",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Écris en chiffres : « cinquante mille deux cents ».",
    format: "short",
    expected: ["50200", "50 200"],
    comparator: "number_equal",
    hint: "Il y a 50 milliers et 2 centaines.",
    explanation: exp(
      "Écrire un nombre en chiffres demande de placer chaque classe correctement.",
      "On repère les milliers, puis les centaines, dizaines et unités.",
      "« cinquante mille » = 50 000 et « deux cents » = 200. Donc 50 000 + 200 = 50 200.",
      "Le nombre est 50 200."
    ),
    tags: ["cm1", "nombres_entiers", "lecture", "short"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_lire_qcm_008",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Comment écrit-on en chiffres : « huit mille neuf » ?",
    format: "qcm",
    choices: ["8 009", "8 900", "8 090", "80 009"],
    expected: ["8 009"],
    comparator: "mcq_exact",
    hint: "Il y a 8 milliers et 9 unités. Attention aux zéros.",
    explanation: exp(
      "Les zéros gardent les positions vides dans un nombre entier.",
      "On place les milliers puis les unités.",
      "« huit mille » = 8 000 et « neuf » = 9. Donc 8 000 + 9 = 8 009.",
      "Le nombre s’écrit 8 009."
    ),
    tags: ["cm1", "nombres_entiers", "lecture", "zeros", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_lire_short_009",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Écris en chiffres : « seize mille ».",
    format: "short",
    expected: ["16000", "16 000"],
    comparator: "number_equal",
    hint: "Il y a 16 milliers et aucune unité.",
    explanation: exp(
      "Un nombre de milliers entiers se termine par trois zéros.",
      "On place 16 milliers, puis des zéros pour les centaines, dizaines et unités.",
      "« seize mille » = 16 000.",
      "Le nombre est 16 000."
    ),
    tags: ["cm1", "nombres_entiers", "lecture", "zeros", "short"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_lire_qcm_010",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Comment écrit-on en chiffres : « soixante mille quarante » ?",
    format: "qcm",
    choices: ["60 040", "60 400", "6 040", "600 040"],
    expected: ["60 040"],
    comparator: "mcq_exact",
    hint: "Il y a 60 milliers et 40 unités, pas de centaines.",
    explanation: exp(
      "Les zéros servent à garder les bonnes colonnes.",
      "On place les milliers puis les dizaines.",
      "« soixante mille » = 60 000 et « quarante » = 40. Donc 60 000 + 40 = 60 040.",
      "Le nombre s’écrit 60 040."
    ),
    tags: ["cm1", "nombres_entiers", "lecture", "zeros", "qcm"],
  },

  // ============================================================
  // TOP-UP — ENTIER_COMPARER
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_entier_comparer_qcm_008",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_comparer",
    difficulty: 1,
    theme: "neutral",
    text: "Quel est le plus petit nombre ?",
    format: "qcm",
    choices: ["5 067", "5 607", "5 706", "5 760"],
    expected: ["5 067"],
    comparator: "mcq_exact",
    hint: "Compare les chiffres de gauche à droite.",
    explanation: exp(
      "Comparer des nombres, c’est trouver le plus petit ou le plus grand.",
      "Tous commencent par 5. On compare ensuite les centaines.",
      "5 067 a 0 centaine, c’est le plus petit nombre de centaines.",
      "Le plus petit nombre est 5 067."
    ),
    tags: ["cm1", "nombres_entiers", "comparaison", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_comparer_qcm_009",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_comparer",
    difficulty: 1,
    theme: "neutral",
    text: "Complète : 47 050 ... 47 005",
    format: "qcm",
    choices: [">", "<", "="],
    expected: [">"],
    comparator: "mcq_exact",
    hint: "Les deux commencent par 47 0. Compare ensuite les dizaines.",
    explanation: exp(
      "Les signes < et > servent à comparer deux nombres.",
      "On compare les chiffres de gauche à droite.",
      "47 050 et 47 005 commencent pareil, mais 5 dizaines est plus grand que 0 dizaine.",
      "On écrit donc 47 050 > 47 005."
    ),
    tags: ["cm1", "nombres_entiers", "comparaison", "symboles", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_comparer_qcm_010",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel rangement est dans l’ordre décroissant ?",
    format: "qcm",
    choices: [
      "7 800 > 7 080 > 7 008",
      "7 008 > 7 080 > 7 800",
      "7 080 > 7 800 > 7 008",
      "7 800 > 7 008 > 7 080",
    ],
    expected: ["7 800 > 7 080 > 7 008"],
    comparator: "mcq_exact",
    hint: "Ordre décroissant : du plus grand au plus petit.",
    explanation: exp(
      "Ordonner dans l’ordre décroissant, c’est ranger du plus grand au plus petit.",
      "On compare les nombres puis on place le plus grand d’abord.",
      "7 800 > 7 080 > 7 008.",
      "L’ordre décroissant est : 7 800 > 7 080 > 7 008."
    ),
    tags: ["cm1", "nombres_entiers", "ordre_decroissant", "qcm"],
  },

  // ============================================================
  // TOP-UP — ENTIER_DECOMPOSER
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_entier_decomposer_qcm_008",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_decomposer",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est la bonne décomposition de 5 064 ?",
    format: "qcm",
    choices: [
      "5 000 + 60 + 4",
      "5 000 + 600 + 4",
      "500 + 60 + 4",
      "5 000 + 6 + 4",
    ],
    expected: ["5 000 + 60 + 4"],
    comparator: "mcq_exact",
    hint: "Le chiffre des centaines est 0.",
    explanation: exp(
      "Décomposer un nombre, c’est écrire la valeur de ses chiffres non nuls.",
      "On repère la position de chaque chiffre.",
      "Dans 5 064 : 5 vaut 5 000, 0 centaine, 6 vaut 60, 4 vaut 4.",
      "Donc 5 064 = 5 000 + 60 + 4."
    ),
    tags: ["cm1", "nombres_entiers", "decomposition", "zeros", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_decomposer_short_009",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_decomposer",
    difficulty: 2,
    theme: "neutral",
    text: "Complète : 30 000 + 2 000 + 700 + 5 = ...",
    format: "short",
    expected: ["32705", "32 705"],
    comparator: "number_equal",
    hint: "Il n’y a pas de dizaines : la colonne des dizaines est vide.",
    explanation: exp(
      "Composer un nombre, c’est regrouper les valeurs de ses chiffres.",
      "On place chaque valeur dans la bonne colonne, avec des zéros pour les colonnes vides.",
      "30 000 + 2 000 + 700 + 5 = 32 705.",
      "Le nombre est 32 705."
    ),
    tags: ["cm1", "nombres_entiers", "composition", "zeros", "short"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_decomposer_qcm_010",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_decomposer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel nombre vaut 8 000 + 40 + 6 ?",
    format: "qcm",
    choices: ["8 046", "8 406", "8 460", "846"],
    expected: ["8 046"],
    comparator: "mcq_exact",
    hint: "Il n’y a pas de centaines : le chiffre des centaines est 0.",
    explanation: exp(
      "Composer un nombre, c’est additionner les valeurs placées dans les bonnes colonnes.",
      "On garde les colonnes vides avec des zéros.",
      "8 000 + 40 + 6 = 8 046.",
      "Le nombre est 8 046."
    ),
    tags: ["cm1", "nombres_entiers", "composition", "zeros", "qcm"],
  },

  // ============================================================
  // TOP-UP — ENTIER_ARRONDIR
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_entier_arrondir_qcm_008",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_arrondir",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est l’arrondi de 5 350 à la centaine près ?",
    format: "qcm",
    choices: ["5 400", "5 300", "5 350", "5 000"],
    expected: ["5 400"],
    comparator: "mcq_exact",
    hint: "À la centaine près, regarde le chiffre des dizaines.",
    explanation: exp(
      "Arrondir à la centaine près, c’est choisir la centaine la plus proche.",
      "On regarde le chiffre des dizaines.",
      "Dans 5 350, le chiffre des dizaines est 5. Comme 5 ≥ 5, on augmente la centaine.",
      "L’arrondi à la centaine près est 5 400."
    ),
    tags: ["cm1", "nombres_entiers", "arrondi", "centaine", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_arrondir_short_009",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_arrondir",
    difficulty: 2,
    theme: "neutral",
    text: "Arrondis 18 600 au millier près.",
    format: "short",
    expected: ["19000", "19 000"],
    comparator: "number_equal",
    hint: "Au millier près, regarde le chiffre des centaines.",
    explanation: exp(
      "Arrondir au millier près, c’est choisir le millier le plus proche.",
      "On regarde le chiffre des centaines.",
      "Dans 18 600, le chiffre des centaines est 6. Comme 6 ≥ 5, on augmente le nombre de milliers.",
      "L’arrondi est 19 000."
    ),
    tags: ["cm1", "nombres_entiers", "arrondi", "millier", "short"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_arrondir_short_010",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_arrondir",
    difficulty: 2,
    theme: "neutral",
    text: "Arrondis 7 149 à la centaine près.",
    format: "short",
    expected: ["7100", "7 100"],
    comparator: "number_equal",
    hint: "À la centaine près, regarde le chiffre des dizaines.",
    explanation: exp(
      "Arrondir à la centaine près, c’est choisir la centaine la plus proche.",
      "On regarde le chiffre des dizaines.",
      "Dans 7 149, le chiffre des dizaines est 4. Comme 4 < 5, on garde 7 100.",
      "L’arrondi est 7 100."
    ),
    tags: ["cm1", "nombres_entiers", "arrondi", "centaine", "short"],
  },

  // ============================================================
  // TOP-UP — ENTIER_MULTIPLE
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_entier_multiple_qcm_009",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_multiple",
    difficulty: 2,
    theme: "neutral",
    text: "Quel nombre est un multiple de 7 ?",
    format: "qcm",
    choices: ["56", "58", "60", "51"],
    expected: ["56"],
    comparator: "mcq_exact",
    hint: "Un multiple de 7 est dans la table de 7.",
    explanation: exp(
      "Un multiple d’un nombre est un résultat de sa table de multiplication.",
      "On cherche un nombre de la table de 7.",
      "7 × 8 = 56.",
      "Donc 56 est un multiple de 7."
    ),
    tags: ["cm1", "nombres_entiers", "multiples", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_multiple_qcm_010",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_multiple",
    difficulty: 2,
    theme: "neutral",
    text: "48 est-il un multiple de 6 ?",
    format: "qcm",
    choices: ["Oui", "Non"],
    expected: ["Oui"],
    comparator: "mcq_exact",
    hint: "Cherche si 48 apparaît dans la table de 6.",
    explanation: exp(
      "Un nombre est un multiple de 6 s’il peut s’écrire 6 × un entier.",
      "On utilise la table de 6.",
      "6 × 8 = 48.",
      "Oui, 48 est un multiple de 6."
    ),
    tags: ["cm1", "nombres_entiers", "multiples", "table", "qcm"],
  },

  // ============================================================
  // TOP-UP — ENTIER_DEFI
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_entier_defi_qcm_010",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Je suis un nombre entier. Je suis supérieur à 6 000, inférieur à 6 100, et multiple de 10. Quel nombre peut être la réponse ?",
    format: "qcm",
    choices: ["6 050", "5 990", "6 105", "6 055"],
    expected: ["6 050"],
    comparator: "mcq_exact",
    hint: "Vérifie les trois conditions une par une.",
    explanation: exp(
      "Un défi sur les nombres entiers demande de vérifier plusieurs informations.",
      "On teste l’intervalle puis le multiple de 10.",
      "6 050 est bien entre 6 000 et 6 100, et il se termine par 0.",
      "La réponse possible est 6 050."
    ),
    tags: ["cm1", "nombres_entiers", "defi", "comparaison", "multiple", "qcm"],
  },
];
