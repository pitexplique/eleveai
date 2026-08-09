// lib/tutor-v4/question-banks/maths/cm2/nombres-entiers.bank.ts

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: T[]): T[] {
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
    id: "cm2_entier_lire_qcm_001",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Comment écrit-on en chiffres : « cinq mille deux cent quarante » ?",
    format: "qcm",
    choices: ["5 240", "5 024", "52 040", "524"],
    expected: ["5 240"],
    comparator: "mcq_exact",
    hint: "Repère les milliers, les centaines, les dizaines et les unités.",
    explanation: exp(
      "Lire un nombre entier, c’est reconnaître la valeur de chaque chiffre selon sa position.",
      "On sépare le nombre en classes : milliers, centaines, dizaines, unités.",
      "« cinq mille » donne 5 000 et « deux cent quarante » donne 240. Donc 5 000 + 240 = 5 240.",
      "Le nombre s’écrit 5 240."
    ),
    tags: ["cm2", "nombres_entiers", "lecture", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_entier_lire_short_002",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Écris en chiffres : « trente-deux mille quinze ».",
    format: "short",
    expected: ["32015", "32 015"],
    comparator: "number_equal",
    hint: "Il y a 32 milliers et 15 unités.",
    explanation: exp(
      "Un nombre entier peut s’écrire avec des chiffres.",
      "On repère la classe des milliers puis la classe des unités.",
      "« trente-deux mille » = 32 000 et « quinze » = 15. Donc 32 000 + 15 = 32 015.",
      "Le nombre est 32 015."
    ),
    tags: ["cm2", "nombres_entiers", "lecture", "short"],
  },

  {
    kind: "template",
    id: "cm2_entier_lire_tpl_003",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_lire",
    difficulty: 2,
    theme: "neutral",
    hint: "Attention aux zéros dans la classe des unités.",
    tags: ["cm2", "nombres_entiers", "lecture", "template"],
    generate: () => {
      const examples = [
        {
          words: "quarante-huit mille sept",
          value: 48007,
          wrongs: ["48 700", "4 807", "480 007"],
        },
        {
          words: "soixante-douze mille trente",
          value: 72030,
          wrongs: ["72 300", "7 230", "720 030"],
        },
        {
          words: "neuf cent mille quatre",
          value: 900004,
          wrongs: ["900 040", "90 004", "904 000"],
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
    id: "cm2_entier_lire_open_004",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Explique pourquoi le nombre 60 408 contient un zéro au rang des centaines.",
    format: "open",
    expected: ["centaines", "0", "aucune centaine"],
    comparator: "contains_keyword",
    hint: "Regarde le chiffre placé dans la colonne des centaines.",
    explanation: exp(
      "Dans un nombre entier, chaque chiffre a une position : unités, dizaines, centaines, milliers...",
      "On lit les chiffres de droite à gauche pour repérer leur rang.",
      "Dans 60 408, les chiffres sont : 8 unités, 0 dizaine, 4 centaines, 0 millier, 6 dizaines de milliers.",
      "Attention : dans 60 408, le zéro n’est pas au rang des centaines mais au rang des dizaines et des milliers."
    ),
    tags: ["cm2", "nombres_entiers", "lecture", "rang", "open", "piege"],
  },

  // ============================================================
  // ENTIER_COMPARER
  // Comparer et ordonner des nombres entiers
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_entier_comparer_qcm_001",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_comparer",
    difficulty: 1,
    theme: "neutral",
    text: "Quel est le plus grand nombre ?",
    format: "qcm",
    choices: ["9 870", "9 708", "9 807", "9 078"],
    expected: ["9 870"],
    comparator: "mcq_exact",
    hint: "Compare chiffre par chiffre en partant de la gauche.",
    explanation: exp(
      "Comparer deux nombres entiers, c’est déterminer lequel est le plus petit ou le plus grand.",
      "On compare d’abord le nombre de chiffres. S’il est identique, on compare les chiffres de gauche à droite.",
      "Tous les nombres ont 4 chiffres et commencent par 9. On compare ensuite les centaines : 8 est plus grand que 7, 0 et 0.",
      "Le plus grand nombre est 9 870."
    ),
    tags: ["cm2", "nombres_entiers", "comparaison", "qcm"],
  },

 {
  kind: "fixed",
  id: "cm2_entier_comparer_qcm_002",
  niveau: "cm2",
  matiere: "maths",
  notionId: "nombre_entier",
  microId: "entier_comparer",
  difficulty: 1,
  theme: "neutral",
  text: "Complète : 45 098 ... 45 908",
  format: "qcm",
  choices: ["<", ">", "="],
  expected: ["<"],
  comparator: "mcq_exact",
  hint: "Les deux nombres commencent par 45. Compare ensuite les centaines.",
  explanation: exp(
    "Les signes < et > servent à comparer deux nombres.",
    "On compare les chiffres depuis la gauche.",
    "45 098 et 45 908 commencent tous les deux par 45. Ensuite, 0 centaine est plus petit que 9 centaines.",
    "On écrit donc 45 098 < 45 908."
  ),
  tags: ["cm2", "nombres_entiers", "comparaison", "symboles"],
},
  {
  kind: "template",
  id: "cm2_entier_comparer_tpl_003",
  niveau: "cm2",
  matiere: "maths",
  notionId: "nombre_entier",
  microId: "entier_comparer",
  difficulty: 2,
  theme: "reunion",
  hint: "Le nombre le plus grand n’est pas toujours celui qui contient le chiffre 9.",
  tags: ["cm2", "nombres_entiers", "comparaison", "template", "reunion"],
  generate: () => {
    const a = randomInt(12000, 98000);
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
    kind: "fixed",
    id: "cm2_entier_ordonner_qcm_004",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel rangement est dans l’ordre croissant ?",
    format: "qcm",
    choices: [
      "8 045 < 8 405 < 8 450",
      "8 405 < 8 045 < 8 450",
      "8 450 < 8 405 < 8 045",
      "8 045 < 8 450 < 8 405",
    ],
    expected: ["8 045 < 8 405 < 8 450"],
    comparator: "mcq_exact",
    hint: "Ordre croissant signifie du plus petit au plus grand.",
    explanation: exp(
      "Ordonner des nombres, c’est les ranger du plus petit au plus grand ou du plus grand au plus petit.",
      "Pour l’ordre croissant, on commence par le plus petit.",
      "8 045 est plus petit que 8 405, et 8 405 est plus petit que 8 450.",
      "L’ordre croissant est : 8 045 < 8 405 < 8 450."
    ),
    tags: ["cm2", "nombres_entiers", "ordre_croissant", "qcm"],
  },

  // ============================================================
  // ENTIER_DECOMPOSER
  // Décomposer des nombres entiers
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_entier_decomposer_qcm_001",
    niveau: "cm2",
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
    tags: ["cm2", "nombres_entiers", "decomposition", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_entier_decomposer_short_002",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_decomposer",
    difficulty: 2,
    theme: "neutral",
    text: "Complète : 70 000 + 800 + 9 = ...",
    format: "short",
    expected: ["70809", "70 809"],
    comparator: "number_equal",
    hint: "Il n’y a pas de milliers ni de dizaines : il faut garder les zéros.",
    explanation: exp(
      "Composer un nombre, c’est regrouper les valeurs de ses chiffres.",
      "On place chaque valeur dans la bonne colonne.",
      "70 000 + 800 + 9 = 70 809.",
      "Le nombre est 70 809."
    ),
    tags: ["cm2", "nombres_entiers", "composition", "zeros"],
  },

  {
    kind: "template",
    id: "cm2_entier_decomposer_tpl_003",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_decomposer",
    difficulty: 2,
    theme: "neutral",
    hint: "Écris séparément les milliers, centaines, dizaines et unités.",
    tags: ["cm2", "nombres_entiers", "decomposition", "template"],
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
    kind: "fixed",
    id: "cm2_entier_decomposer_open_004",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_decomposer",
    difficulty: 3,
    theme: "neutral",
    text: "Explique l’erreur : un élève écrit 36 205 = 30 000 + 6 000 + 200 + 50.",
    format: "open",
    expected: ["5", "unités", "50", "dizaines"],
    comparator: "contains_keyword",
    hint: "Regarde le dernier chiffre de 36 205.",
    explanation: exp(
      "Chaque chiffre d’un nombre a une valeur selon sa position.",
      "Il faut vérifier les unités, dizaines, centaines, milliers...",
      "Dans 36 205, le dernier chiffre est 5 : il vaut 5 unités, pas 50.",
      "La bonne décomposition est 30 000 + 6 000 + 200 + 5."
    ),
    tags: ["cm2", "nombres_entiers", "decomposition", "erreur_frequente", "open"],
  },

  // ============================================================
  // ENTIER_ARRONDIR
  // Arrondir un nombre entier
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_entier_arrondir_qcm_001",
    niveau: "cm2",
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
    tags: ["cm2", "nombres_entiers", "arrondi", "centaine"],
  },

  {
    kind: "fixed",
    id: "cm2_entier_arrondir_short_002",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_arrondir",
    difficulty: 2,
    theme: "neutral",
    text: "Arrondis 73 249 au millier près.",
    format: "short",
    expected: ["73000", "73 000"],
    comparator: "number_equal",
    hint: "Pour arrondir au millier, regarde le chiffre des centaines.",
    explanation: exp(
      "Arrondir au millier près, c’est choisir le millier le plus proche.",
      "On regarde le chiffre des centaines.",
      "Dans 73 249, le chiffre des centaines est 2. Comme 2 < 5, on garde 73 milliers.",
      "L’arrondi est 73 000."
    ),
    tags: ["cm2", "nombres_entiers", "arrondi", "millier"],
  },

  {
    kind: "template",
    id: "cm2_entier_arrondir_tpl_003",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_arrondir",
    difficulty: 3,
    theme: "reunion",
    hint: "Au millier près, regarde le chiffre des centaines.",
    tags: ["cm2", "nombres_entiers", "arrondi", "template", "reunion"],
    generate: () => {
      const n = randomChoice([12480, 36720, 45890, 61240, 78999, 93510]);
      const rounded = Math.round(n / 1000) * 1000;
      const correct = formatNumber(rounded);

      // ⚠️ L'un des deux voisins EST la bonne réponse — c'est le principe même
      // de l'arrondi — et l'arrondi à la centaine tombe dessus aussi quand le
      // nombre est proche du millier (78 999 → 79 000 des deux côtés). Il ne
      // restait alors qu'une seule proposition en face. Deux milliers voisins,
      // qui ne peuvent jamais coïncider, complètent la liste.
      const wrongs = [
        formatNumber(Math.floor(n / 1000) * 1000),
        formatNumber(Math.ceil(n / 1000) * 1000),
        formatNumber(Math.round(n / 100) * 100),
        formatNumber(rounded + 1000),
        formatNumber(rounded - 1000),
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
    id: "cm2_entier_arrondir_open_004",
    niveau: "cm2",
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
    tags: ["cm2", "nombres_entiers", "arrondi", "justification", "open"],
  },

  // ============================================================
  // ENTIER_MULTIPLE
  // Reconnaître les multiples d’un nombre
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_entier_multiple_qcm_001",
    niveau: "cm2",
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
    tags: ["cm2", "nombres_entiers", "multiples", "qcm"],
  },
{
  kind: "fixed",
  id: "cm2_entier_multiple_qcm_002",
  niveau: "cm2",
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
  tags: ["cm2", "nombres_entiers", "multiples", "table"],
},

  {
    kind: "template",
    id: "cm2_entier_multiple_tpl_003",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_multiple",
    difficulty: 3,
    theme: "neutral",
    hint: "Divise mentalement ou cherche dans la table.",
    tags: ["cm2", "nombres_entiers", "multiples", "template"],
    generate: () => {
      const base = randomChoice([3, 4, 5, 6, 7, 8, 9]);
      const k = randomInt(4, 12);
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
          String(correctNumber + base - 1),
          String(correctNumber + 2),
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
    kind: "fixed",
    id: "cm2_entier_multiple_open_004",
    niveau: "cm2",
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
    tags: ["cm2", "nombres_entiers", "multiples", "justification", "open"],
  },

  // ============================================================
  // ENTIER_DEFI
  // Résoudre un défi sur les nombres entiers
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_entier_defi_qcm_001",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Je suis un nombre entier. Je suis supérieur à 4 500, inférieur à 4 600, et multiple de 25. Quel nombre peut être la réponse ?",
    format: "qcm",
    choices: ["4 525", "4 510", "4 601", "4 499"],
    expected: ["4 525"],
    comparator: "mcq_exact",
    hint: "Vérifie les trois conditions une par une.",
    explanation: exp(
      "Un défi sur les nombres entiers demande souvent de vérifier plusieurs informations.",
      "On teste les conditions : intervalle, comparaison, multiple.",
      "4 525 est bien entre 4 500 et 4 600. C’est aussi un multiple de 25 car 25 × 181 = 4 525.",
      "La réponse possible est 4 525."
    ),
    tags: ["cm2", "nombres_entiers", "defi", "comparaison", "multiple"],
  },

  {
    kind: "fixed",
    id: "cm2_entier_defi_short_002",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_defi",
    difficulty: 3,
    theme: "reunion",
    text: "Au marché de Saint-Pierre, un vendeur range 96 letchis dans des sachets de 8. Combien de sachets peut-il remplir ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Cherche combien de fois 8 est contenu dans 96.",
    explanation: exp(
      "Résoudre un problème avec des entiers demande de choisir la bonne opération.",
      "Quand on partage une quantité en groupes égaux, on utilise une division.",
      "96 ÷ 8 = 12.",
      "Le vendeur peut remplir 12 sachets."
    ),
    tags: ["cm2", "nombres_entiers", "defi", "division", "reunion"],
  },

  {
    kind: "template",
    id: "cm2_entier_defi_tpl_003",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Commence par l’arrondi, puis vérifie la comparaison.",
    tags: ["cm2", "nombres_entiers", "defi", "arrondi", "template"],
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
    id: "cm2_entier_defi_tpl_004",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_defi",
    difficulty: 4,
    theme: "reunion",
    hint: "Il faut utiliser une multiplication ou une division.",
    tags: ["cm2", "nombres_entiers", "defi", "multiple", "probleme", "reunion"],
    generate: () => {
      const paquets = randomChoice([6, 8, 9, 12]);
      const quantite = paquets * randomInt(7, 15);

      return {
        text: `Pour une sortie à Mafate, on prépare ${quantite} biscuits. On veut faire des sachets de ${paquets} biscuits. Combien de sachets complets peut-on préparer ?`,
        format: "short",
        expected: [String(quantite / paquets)],
        comparator: "number_equal",
        explanation: exp(
          "Quand on fait des groupes égaux, on utilise une division.",
          "On divise le nombre total par le nombre d’objets dans chaque groupe.",
          `${quantite} ÷ ${paquets} = ${quantite / paquets}.`,
          `On peut préparer ${quantite / paquets} sachets complets.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "cm2_entier_defi_open_005",
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_defi",
    difficulty: 5,
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
    tags: ["cm2", "nombres_entiers", "defi", "open", "raisonnement"],
  },
];