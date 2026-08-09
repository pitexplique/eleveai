// lib/tutor-v4/questionBank/ce1/maths/suite-nombre.bank.ts
//
// Les suites de nombres du CE1, écrites à la main.
//
// PÉRIMÈTRE BO (Annexe 4, programme de mathématiques du cycle 2) : la suite
// écrite et orale des nombres jusqu'à mille, dans les deux sens, de un en un,
// de deux en deux, de dix en dix et de cent en cent. Le programme relie ce
// travail aux suites de symboles des nombres ordinaux : « motifs organisés
// initiés à l'école maternelle ».
//
// LE PIÈGE DE LA NOTION : deviner la règle sur le PREMIER écart et ne pas la
// vérifier ensuite. Entre 4 et 8 il y a +4, mais aussi ×2 : c'est le troisième
// terme qui tranche.
//
// Second piège, propre au passage des centaines : après 398, on ne dit pas
// « trois cent cent », on dit 399 puis 400. Le passage d'une centaine à la
// suivante est l'endroit où la suite se casse.
//
// ⚠️ `SuiteCanvasData` n'est pas réexporté par types.ts : on l'importe depuis
// types_canvas.
//
// ⚠️ PAS DE QUESTION À RÉDIGER : `applyMathsKeyboardFree` retire les items
// `format: "open"`. Un CE1 clique, il ne tape pas.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import type { SuiteCanvasData } from "@/lib/tutor-v4/types_canvas";

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

function suiteCanvas(data: Omit<SuiteCanvasData, "kind">): SuiteCanvasData {
  return { kind: "suite", ...data };
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

export const suiteNombreBank: TutorBankItemV4[] = [
  /* =========================================================
     CE1_SUITE_CONTINUER — continuer une suite
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_suite_continuer_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "suite_nombre",
    microId: "ce1_suite_continuer",
    difficulty: 3,
    theme: "neutral",
    text: "Continue la suite : 396, 397, 398, 399, …",
    format: "short",
    expected: ["400"],
    comparator: "number_equal",
    hint: "Après 399, on change de centaine.",
    explanation: exp(
      "Une suite de un en un avance d'un nombre à chaque fois, même quand on change de centaine.",
      "On regarde le chiffre des unités : quand il atteint 9, la dizaine suivante commence.",
      "399 + 1 = 400. Les unités repassent à 0, les dizaines aussi, et on gagne une centaine.",
      "Le nombre suivant est 400.",
    ),
    tags: ["ce1", "suite_nombre", "continuer", "piege"],
  },
  {
    kind: "template",
    id: "ce1_suite_continuer_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "suite_nombre",
    microId: "ce1_suite_continuer",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde de combien on avance entre deux nombres.",
    tags: ["ce1", "suite_nombre", "continuer", "template", "canvas"],
    generate: () => {
      const pas = randomChoice([1, 2, 10, 100] as const);
      const depart = pas === 100 ? randomInt(1, 4) * 100 : randomInt(20, 400);
      const termes = [0, 1, 2, 3].map((i) => depart + i * pas);
      const suivant = depart + 4 * pas;
      return {
        text: `Continue la suite : ${termes.join(", ")}, …`,
        format: "short",
        expected: [String(suivant)],
        comparator: "number_equal",
        explanation: exp(
          "Dans une suite, on avance toujours du même pas d'un nombre au suivant.",
          "On calcule l'écart entre deux nombres voisins, puis on l'ajoute au dernier.",
          `De ${termes[0]} à ${termes[1]}, on avance de ${pas}. On vérifie sur les suivants, puis : ${termes[3]} + ${pas} = ${suivant}.`,
          `Le nombre suivant est ${suivant}.`,
        ),
        canvas: suiteCanvas({
          terms: [...termes, "?"],
          missingIndex: 4,
          display: { showArrows: true, showRule: false },
        }),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_suite_continuer_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "suite_nombre",
    microId: "ce1_suite_continuer",
    difficulty: 4,
    theme: "neutral",
    hint: "Cette suite descend : on enlève à chaque fois.",
    tags: ["ce1", "suite_nombre", "continuer", "template"],
    generate: () => {
      const pas = randomChoice([1, 2, 10] as const);
      const depart = randomInt(200, 900);
      const termes = [0, 1, 2, 3].map((i) => depart - i * pas);
      const suivant = depart - 4 * pas;
      return {
        text: `Continue la suite : ${termes.join(", ")}, …`,
        format: "short",
        expected: [String(suivant)],
        comparator: "number_equal",
        explanation: exp(
          "Une suite peut aussi descendre : on enlève alors toujours le même nombre.",
          "On regarde l'écart entre deux nombres voisins, puis on l'enlève au dernier.",
          `De ${termes[0]} à ${termes[1]}, on enlève ${pas}. Donc ${termes[3]} - ${pas} = ${suivant}.`,
          `Le nombre suivant est ${suivant}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_SUITE_PAS — trouver la règle
     LE piège : décider sur le premier écart sans vérifier.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_suite_pas_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "suite_nombre",
    microId: "ce1_suite_pas",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la règle de cette suite : 4, 8, 12, 16 ?",
    format: "qcm",
    choices: [
      "on ajoute 4 à chaque fois",
      "on double à chaque fois",
      "on ajoute 2 à chaque fois",
      "on ajoute 8 à chaque fois",
    ],
    expected: ["on ajoute 4 à chaque fois"],
    comparator: "mcq_exact",
    hint: "De 4 à 8, on peut ajouter 4 ou doubler. Vérifie sur le troisième nombre.",
    explanation: exp(
      "La règle d'une suite doit marcher entre TOUS les nombres, pas seulement entre les deux premiers.",
      "On cherche une règle sur le premier écart, puis on la vérifie sur les suivants.",
      "De 4 à 8, on peut ajouter 4 ou doubler. Mais le double de 8 est 16, alors que le nombre suivant est 12. C'est donc « ajouter 4 » : 4, 8, 12, 16.",
      "On ajoute 4 à chaque fois.",
    ),
    tags: ["ce1", "suite_nombre", "pas", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_suite_pas_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "suite_nombre",
    microId: "ce1_suite_pas",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule l'écart entre deux nombres voisins, puis vérifie-le partout.",
    tags: ["ce1", "suite_nombre", "pas", "template"],
    generate: () => {
      const pas = randomChoice([2, 5, 10, 20, 100] as const);
      const depart = randomInt(10, 300);
      const termes = [0, 1, 2, 3].map((i) => depart + i * pas);
      return {
        text: `De combien avance-t-on à chaque fois dans cette suite : ${termes.join(", ")} ?`,
        format: "short",
        expected: [String(pas)],
        comparator: "number_equal",
        explanation: exp(
          "Le pas d'une suite, c'est ce qu'on ajoute d'un nombre au suivant.",
          "On calcule l'écart entre deux nombres voisins, puis on vérifie qu'il est le même partout.",
          `${termes[1]} - ${termes[0]} = ${pas}, et ${termes[2]} - ${termes[1]} = ${pas} aussi. La règle marche pour toute la suite.`,
          `On avance de ${pas}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_suite_pas_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "suite_nombre",
    microId: "ce1_suite_pas",
    difficulty: 4,
    theme: "neutral",
    hint: "Le trou est au milieu : sers-toi des nombres qui l'entourent.",
    tags: ["ce1", "suite_nombre", "pas", "template", "canvas"],
    generate: () => {
      const pas = randomChoice([2, 5, 10, 50] as const);
      const depart = randomInt(20, 400);
      const termes = [0, 1, 2, 3, 4].map((i) => depart + i * pas);
      const manquant = termes[2];
      return {
        text: `Quel nombre manque dans cette suite : ${termes[0]}, ${termes[1]}, ?, ${termes[3]}, ${termes[4]} ?`,
        format: "short",
        expected: [String(manquant)],
        comparator: "number_equal",
        explanation: exp(
          "Dans une suite, on avance toujours du même pas.",
          "On trouve le pas grâce à deux nombres voisins connus, puis on l'applique au trou.",
          `De ${termes[0]} à ${termes[1]}, on avance de ${pas}. Donc le nombre qui manque est ${termes[1]} + ${pas} = ${manquant}. On vérifie : ${manquant} + ${pas} = ${termes[3]}.`,
          `Il manque ${manquant}.`,
        ),
        canvas: suiteCanvas({
          terms: [termes[0], termes[1], "?", termes[3], termes[4]],
          missingIndex: 2,
          display: { showArrows: true, showRule: false },
        }),
      };
    },
  },

  /* =========================================================
     CE1_SUITE_10_100 — compter de 10 en 10, de 100 en 100
     C'est la numération qui parle : on ne change qu'un rang.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_suite_10_100_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "suite_nombre",
    microId: "ce1_suite_10_100",
    difficulty: 3,
    theme: "neutral",
    text: "En comptant de 10 en 10 à partir de 347, quel nombre vient après 397 ?",
    format: "short",
    expected: ["407"],
    comparator: "number_equal",
    hint: "Neuf dizaines plus une dizaine : cela fait une centaine de plus.",
    explanation: exp(
      "Compter de 10 en 10, c'est ajouter une dizaine à chaque fois.",
      "On ajoute une dizaine et on regarde si les dizaines débordent.",
      "397 a 9 dizaines. Une dizaine de plus fait 10 dizaines, c'est-à-dire une centaine : on passe à 407. Le chiffre des unités, lui, ne bouge pas.",
      "Après 397 vient 407.",
    ),
    tags: ["ce1", "suite_nombre", "dizaines", "piege"],
  },
  {
    kind: "template",
    id: "ce1_suite_10_100_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "suite_nombre",
    microId: "ce1_suite_10_100",
    difficulty: 3,
    theme: "neutral",
    hint: "On ne change qu'un seul rang.",
    tags: ["ce1", "suite_nombre", "dizaines", "template"],
    generate: () => {
      const pas = randomChoice([10, 100] as const);
      const depart = randomInt(120, 600);
      const suivant = depart + pas;
      return {
        text: `En comptant de ${pas} en ${pas}, quel nombre vient juste après ${depart} ?`,
        format: "short",
        expected: [String(suivant)],
        comparator: "number_equal",
        explanation: exp(
          pas === 10
            ? "Compter de 10 en 10, c'est ajouter une dizaine à chaque fois."
            : "Compter de 100 en 100, c'est ajouter une centaine à chaque fois.",
          "On ajoute au rang concerné, sans toucher aux autres — sauf si le rang déborde.",
          `${depart} + ${pas} = ${suivant}.`,
          `C'est ${suivant}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_SUITE_DEFI — les défis
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_suite_defi_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "suite_nombre",
    microId: "ce1_suite_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Dans la suite 1, 2, 4, 8, 16, quelle est la règle ?",
    format: "qcm",
    choices: [
      "on double à chaque fois",
      "on ajoute 1 à chaque fois",
      "on ajoute 2 à chaque fois",
      "on ajoute 4 à chaque fois",
    ],
    expected: ["on double à chaque fois"],
    comparator: "mcq_exact",
    hint: "Les écarts grandissent : 1, 2, 4, 8. Ce n'est donc pas une addition toujours pareille.",
    explanation: exp(
      "Une suite n'avance pas toujours du même pas : parfois, elle se construit en multipliant.",
      "On regarde les écarts. S'ils changent, la règle n'est pas une addition constante.",
      "Les écarts sont 1, puis 2, puis 4, puis 8 : ils doublent. En fait, chaque nombre est le double du précédent : 1, 2, 4, 8, 16, et ensuite 32.",
      "On double à chaque fois.",
    ),
    tags: ["ce1", "suite_nombre", "defi", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_suite_defi_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "suite_nombre",
    microId: "ce1_suite_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Vérifie ta règle sur tous les nombres, pas seulement les deux premiers.",
    tags: ["ce1", "suite_nombre", "defi", "template"],
    generate: () => {
      const double = randomChoice([true, false]);
      const depart = double ? randomChoice([2, 3, 5] as const) : randomInt(4, 20);
      const pas = randomInt(3, 9);
      const termes = double
        ? [depart, depart * 2, depart * 4, depart * 8]
        : [depart, depart + pas, depart + 2 * pas, depart + 3 * pas];
      const suivant = double ? depart * 16 : depart + 4 * pas;
      return {
        text: `Continue la suite : ${termes.join(", ")}, …`,
        format: "short",
        expected: [String(suivant)],
        comparator: "number_equal",
        explanation: exp(
          "La règle d'une suite doit marcher entre TOUS les nombres, pas seulement entre les deux premiers.",
          "On cherche une règle, puis on la vérifie sur chaque écart avant de continuer.",
          double
            ? `Chaque nombre est le double du précédent : ${termes.join(", ")}. Après ${termes[3]} vient ${suivant}.`
            : `On ajoute ${pas} à chaque fois : ${termes.join(", ")}. Après ${termes[3]} vient ${suivant}.`,
          `Le nombre suivant est ${suivant}.`,
        ),
      };
    },
  },
];
