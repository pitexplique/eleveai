// lib/tutor-v4/questionBank/ce2/maths/suite-nombre.bank.ts
//
// Les suites de nombres du CE2, écrites à la main. Quatre micro-compétences qui
// passaient par le constructeur commun.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cycle 2) : continuer une suite,
// trouver sa règle, reconnaître si elle croît ou décroît. Les nombres restent
// sous 10 000, et les règles sont des additions ou des soustractions répétées —
// de 2 en 2, de 5 en 5, de 10 en 10, de 25 en 25, de 100 en 100.
// ⛔ Pas de suite géométrique au programme, sauf le doublement, qui se dit
// « on double à chaque fois » et se comprend sans vocabulaire nouveau.
//
// LE PIÈGE DE LA NOTION : deviner la règle sur le PREMIER écart et ne pas la
// vérifier ensuite. 2, 4, 6, 10 : l'élève voit « + 2 » sur les deux premiers
// et continue sans regarder le reste. Une règle se vérifie sur TOUS les écarts,
// pas sur un seul.
// Le second : les suites qui descendent. L'élève cherche ce qu'on ajoute, ne
// trouve pas, et abandonne — alors qu'il fallait chercher ce qu'on enlève.
//
// ⚠️ PAS DE QUESTION À RÉDIGER. `applyMathsKeyboardFree` retire les items
// `format: "open"` (cf. ce2/maths/index.ts) : un CE2 clique, il ne tape pas.

// ⚠️ `SuiteCanvasData` n'est PAS réexporté par `types.ts` — contrairement aux
// autres canvas. On va le chercher à la source.
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

// La bonne réponse est mise de côté, trois pièges distincts sont tirés ensuite,
// puis on mélange. L'écrire autrement a rendu des questions impossibles à
// réussir dans 79 banques : voir scripts/verifier-generateurs.mjs.
function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function suiteCanvas(termes: Array<number | string>, regle?: string): SuiteCanvasData {
  return {
    kind: "suite",
    theme: "nombre",
    terms: termes,
    ...(regle ? { rule: regle } : {}),
    display: { showArrows: true, showRule: Boolean(regle) },
  };
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

/** Les pas au programme du CE2 : rien qui demande une table inconnue. */
const PAS = [2, 5, 10, 25, 50, 100] as const;

export const suiteNombreBank: TutorBankItemV4[] = [
  /* =========================================================
     CE2_SUITE_CONTINUER — trouver le terme suivant
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_suite_continuer_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "suite_nombre",
    microId: "ce2_suite_continuer",
    difficulty: 2,
    theme: "neutral",
    text: "Continue la suite : 5, 10, 15, 20, ...",
    format: "short",
    expected: ["25"],
    comparator: "number_equal",
    hint: "Regarde ce qu'on ajoute d'un nombre au suivant.",
    explanation: exp(
      "Une suite avance en répétant toujours la même opération.",
      "On cherche l'écart entre deux nombres voisins, puis on vérifie qu'il est le même partout.",
      "De 5 à 10 : + 5. De 10 à 15 : + 5. De 15 à 20 : + 5. La règle est donc « + 5 », et le suivant est 20 + 5 = 25.",
      "Le nombre suivant est 25.",
    ),
    tags: ["ce2", "suite_nombre", "continuer", "canvas"],
    canvas: suiteCanvas([5, 10, 15, 20, "?"]),
  },
  {
    kind: "fixed",
    id: "ce2_suite_continuer_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "suite_nombre",
    microId: "ce2_suite_continuer",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève voit la suite 2, 4, 6, 10 et annonce « c'est + 2, donc le suivant est 12 ». Pourquoi se trompe-t-il ?",
    format: "qcm",
    choices: [
      "il n'a vérifié la règle que sur les premiers nombres",
      "il a mal additionné",
      "il fallait multiplier",
      "il n'y a pas d'erreur",
    ],
    expected: ["il n'a vérifié la règle que sur les premiers nombres"],
    comparator: "mcq_exact",
    hint: "Regarde l'écart entre 6 et 10.",
    explanation: exp(
      "Une règle n'est valable que si elle marche entre TOUS les nombres voisins de la suite.",
      "On calcule chaque écart l'un après l'autre, du premier au dernier.",
      "De 2 à 4 : + 2. De 4 à 6 : + 2. Mais de 6 à 10 : + 4. La règle « + 2 » ne tient pas jusqu'au bout : cette suite ne suit pas une règle unique, ou l'un des nombres est faux.",
      "Il n'a vérifié la règle que sur les premiers nombres.",
    ),
    tags: ["ce2", "suite_nombre", "continuer", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_suite_continuer_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "suite_nombre",
    microId: "ce2_suite_continuer",
    difficulty: 3,
    theme: "neutral",
    text: "Continue la suite : 100, 90, 80, 70, ...",
    format: "short",
    expected: ["60"],
    comparator: "number_equal",
    hint: "Ici les nombres descendent : cherche ce qu'on enlève.",
    explanation: exp(
      "Une suite peut avancer en ajoutant, mais aussi en enlevant toujours la même chose.",
      "Quand les nombres descendent, on cherche ce qu'on retire à chaque étape.",
      "De 100 à 90 : − 10. De 90 à 80 : − 10. De 80 à 70 : − 10. La règle est « − 10 », et le suivant est 70 − 10 = 60.",
      "Le nombre suivant est 60.",
    ),
    tags: ["ce2", "suite_nombre", "continuer", "decroissante", "canvas"],
    canvas: suiteCanvas([100, 90, 80, 70, "?"]),
  },
  {
    kind: "template",
    id: "ce2_suite_continuer_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "suite_nombre",
    microId: "ce2_suite_continuer",
    difficulty: 3,
    theme: "neutral",
    hint: "Vérifie l'écart entre CHAQUE paire de nombres voisins.",
    tags: ["ce2", "suite_nombre", "continuer", "template", "canvas"],
    generate: () => {
      const pas = randomChoice(PAS);
      const monte = randomChoice([true, false]);
      const depart = monte ? randomInt(1, 40) * pas : randomInt(20, 60) * pas;
      const termes = [0, 1, 2, 3].map((k) => (monte ? depart + k * pas : depart - k * pas));
      const suivant = monte ? depart + 4 * pas : depart - 4 * pas;
      return {
        text: `Continue la suite : ${termes.join(", ")}, ...`,
        format: "short",
        expected: [String(suivant)],
        comparator: "number_equal",
        explanation: exp(
          "Une suite avance en répétant toujours la même opération.",
          "On calcule l'écart entre chaque paire de nombres voisins, et on vérifie qu'il est partout le même.",
          `${termes.map((t, i) => (i === 0 ? "" : `${monte ? "+" : "−"} ${pas}`)).filter(Boolean).join(", ")} : la règle est « ${monte ? "+" : "−"} ${pas} ». Le suivant est ${termes[3]} ${monte ? "+" : "−"} ${pas} = ${suivant}.`,
          `Le nombre suivant est ${suivant}.`,
        ),
        canvas: suiteCanvas([...termes, "?"]),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_suite_continuer_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "suite_nombre",
    microId: "ce2_suite_continuer",
    difficulty: 4,
    theme: "neutral",
    hint: "Le trou est au milieu : sers-toi des nombres qui l'entourent.",
    tags: ["ce2", "suite_nombre", "continuer", "template", "canvas"],
    generate: () => {
      const pas = randomChoice(PAS);
      const depart = randomInt(2, 40) * pas;
      const termes = [0, 1, 2, 3, 4].map((k) => depart + k * pas);
      const trou = randomInt(1, 3);
      const affiches = termes.map((t, i) => (i === trou ? "?" : t));
      return {
        text: `Quel nombre manque dans cette suite : ${affiches.join(", ")} ?`,
        format: "short",
        expected: [String(termes[trou])],
        comparator: "number_equal",
        explanation: exp(
          "Une suite avance en répétant toujours la même opération : le nombre manquant se déduit de ses voisins.",
          "On trouve la règle sur les nombres visibles, puis on l'applique au nombre qui précède le trou.",
          `L'écart entre deux nombres voisins vaut ${pas}. Le nombre juste avant le trou est ${termes[trou - 1]}, donc le manquant est ${termes[trou - 1]} + ${pas} = ${termes[trou]}.`,
          `Il manque ${termes[trou]}.`,
        ),
        canvas: suiteCanvas(affiches),
      };
    },
  },

  /* =========================================================
     CE2_SUITE_REGLE — nommer la règle
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_suite_regle_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "suite_nombre",
    microId: "ce2_suite_regle",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la règle de la suite 7, 17, 27, 37 ?",
    format: "qcm",
    choices: ["on ajoute 10", "on ajoute 1", "on ajoute 7", "on multiplie par 2"],
    expected: ["on ajoute 10"],
    comparator: "mcq_exact",
    hint: "Regarde comment change le chiffre des dizaines.",
    explanation: exp(
      "La règle d'une suite est l'opération qui fait passer d'un nombre au suivant.",
      "On calcule l'écart entre deux nombres voisins, puis on le vérifie sur toute la suite.",
      "De 7 à 17 : + 10. De 17 à 27 : + 10. De 27 à 37 : + 10. Le chiffre des unités ne bouge pas, seul celui des dizaines augmente de 1 à chaque fois.",
      "La règle est « on ajoute 10 ».",
    ),
    tags: ["ce2", "suite_nombre", "regle", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_suite_regle_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "suite_nombre",
    microId: "ce2_suite_regle",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la règle de la suite 3, 6, 12, 24 ?",
    format: "qcm",
    choices: [
      "on double à chaque fois",
      "on ajoute 3",
      "on ajoute 6",
      "on ajoute toujours le même nombre",
    ],
    expected: ["on double à chaque fois"],
    comparator: "mcq_exact",
    hint: "L'écart grandit : ce n'est pas une addition toujours pareille.",
    explanation: exp(
      "Une suite ne progresse pas toujours par addition : elle peut aussi doubler.",
      "On calcule les écarts : s'ils grandissent, on essaie la multiplication.",
      "Les écarts valent + 3, + 6, + 12 : ils ne sont pas égaux, donc ce n'est pas une addition régulière. En revanche 3 × 2 = 6, 6 × 2 = 12, 12 × 2 = 24 : on double à chaque fois.",
      "On double à chaque fois.",
    ),
    tags: ["ce2", "suite_nombre", "regle", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_suite_regle_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "suite_nombre",
    microId: "ce2_suite_regle",
    difficulty: 3,
    theme: "neutral",
    text: "Dans la suite 90, 85, 80, 75, de combien diminue-t-on à chaque étape ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Enlève un nombre à celui qui le précède.",
    explanation: exp(
      "Dans une suite décroissante, la règle est ce qu'on retire à chaque étape.",
      "On soustrait un nombre de celui qui le précède, puis on vérifie sur toute la suite.",
      "90 − 85 = 5, 85 − 80 = 5, 80 − 75 = 5. On enlève 5 à chaque fois.",
      "On diminue de 5.",
    ),
    tags: ["ce2", "suite_nombre", "regle", "decroissante"],
  },
  {
    kind: "template",
    id: "ce2_suite_regle_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "suite_nombre",
    microId: "ce2_suite_regle",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule l'écart, puis vérifie-le partout.",
    tags: ["ce2", "suite_nombre", "regle", "template", "canvas"],
    generate: () => {
      const pas = randomChoice(PAS);
      const monte = randomChoice([true, false]);
      const depart = monte ? randomInt(1, 30) * pas : randomInt(20, 60) * pas;
      const termes = [0, 1, 2, 3].map((k) => (monte ? depart + k * pas : depart - k * pas));
      const bonne = monte ? `on ajoute ${pas}` : `on enlève ${pas}`;
      const autrePas = randomChoice(PAS.filter((p) => p !== pas));
      return {
        text: `Quelle est la règle de la suite ${termes.join(", ")} ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          monte ? `on enlève ${pas}` : `on ajoute ${pas}`,
          `on ajoute ${autrePas}`,
          `on enlève ${autrePas}`,
          "on double à chaque fois",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "La règle d'une suite est l'opération qui fait passer d'un nombre au suivant.",
          "On calcule l'écart entre deux nombres voisins, puis on le vérifie sur toute la suite.",
          // ⚠️ On soustrait toujours le plus petit au plus grand : sur une
          // suite qui descend, écrire termes[1] − termes[0] donnerait un
          // nombre négatif, qui n'existe pas encore au CE2.
          `${monte ? termes[1] : termes[0]} − ${monte ? termes[0] : termes[1]} donne un écart de ${pas}, et les nombres ${monte ? "montent" : "descendent"} : la règle est donc « ${bonne} ».`,
          `La règle est « ${bonne} ».`,
        ),
        canvas: suiteCanvas(termes, bonne),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_suite_regle_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "suite_nombre",
    microId: "ce2_suite_regle",
    difficulty: 3,
    theme: "neutral",
    hint: "L'écart entre deux nombres voisins, c'est une soustraction.",
    tags: ["ce2", "suite_nombre", "regle", "template"],
    generate: () => {
      const pas = randomChoice(PAS);
      const monte = randomChoice([true, false]);
      const depart = monte ? randomInt(1, 30) * pas : randomInt(20, 60) * pas;
      const termes = [0, 1, 2, 3].map((k) => (monte ? depart + k * pas : depart - k * pas));
      return {
        text: `Dans la suite ${termes.join(", ")}, de combien ${monte ? "augmente" : "diminue"}-t-on à chaque étape ?`,
        format: "short",
        expected: [String(pas)],
        comparator: "number_equal",
        explanation: exp(
          "La règle d'une suite est l'écart, toujours le même, entre deux nombres voisins.",
          "On soustrait le plus petit du plus grand entre deux nombres qui se suivent.",
          `${monte ? termes[1] : termes[0]} − ${monte ? termes[0] : termes[1]} = ${pas}, et c'est le même écart partout dans la suite.`,
          `On ${monte ? "augmente" : "diminue"} de ${pas}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_SUITE_CROISSANTE_DECROISSANTE
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_suite_croissante_decroissante_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "suite_nombre",
    microId: "ce2_suite_croissante_decroissante",
    difficulty: 1,
    theme: "neutral",
    text: "La suite 12, 24, 36, 48 est-elle croissante ou décroissante ?",
    format: "qcm",
    choices: ["croissante", "décroissante", "ni l'une ni l'autre", "on ne peut pas savoir"],
    expected: ["croissante"],
    comparator: "mcq_exact",
    hint: "Les nombres montent-ils ou descendent-ils ?",
    explanation: exp(
      "Une suite est croissante quand ses nombres augmentent, décroissante quand ils diminuent.",
      "On regarde si chaque nombre est plus grand ou plus petit que le précédent.",
      "12, puis 24, puis 36, puis 48 : chaque nombre est plus grand que celui d'avant. La suite monte, elle est croissante.",
      "Elle est croissante.",
    ),
    tags: ["ce2", "suite_nombre", "croissante", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_suite_croissante_decroissante_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "suite_nombre",
    microId: "ce2_suite_croissante_decroissante",
    difficulty: 4,
    theme: "neutral",
    text: "La suite 40, 45, 42, 47 est-elle croissante ?",
    format: "qcm",
    choices: [
      "non, elle monte puis descend",
      "oui, elle finit plus haut qu'elle ne commence",
      "oui, tous les nombres sont grands",
      "on ne peut pas savoir",
    ],
    expected: ["non, elle monte puis descend"],
    comparator: "mcq_exact",
    hint: "Une suite croissante monte à CHAQUE étape, sans exception.",
    explanation: exp(
      "Une suite est croissante seulement si chaque nombre est plus grand que le précédent, sans exception.",
      "On compare chaque nombre à celui qui le précède, du premier au dernier.",
      "40 puis 45 : ça monte. Mais 45 puis 42 : ça descend. Il suffit d'une seule descente pour que la suite ne soit plus croissante, même si elle finit plus haut qu'elle n'a commencé.",
      "Non, elle n'est pas croissante.",
    ),
    tags: ["ce2", "suite_nombre", "croissante", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_suite_croissante_decroissante_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "suite_nombre",
    microId: "ce2_suite_croissante_decroissante",
    difficulty: 2,
    theme: "neutral",
    text: "Une suite décroissante avance en faisant quelle opération ?",
    format: "qcm",
    choices: [
      "une soustraction, répétée à chaque étape",
      "une addition, répétée à chaque étape",
      "une multiplication",
      "aucune, elle ne bouge pas",
    ],
    expected: ["une soustraction, répétée à chaque étape"],
    comparator: "mcq_exact",
    hint: "Pour que les nombres descendent, il faut leur enlever quelque chose.",
    explanation: exp(
      "Une suite décroissante diminue à chaque étape : on retire toujours la même quantité.",
      "On regarde le sens de la suite avant de chercher la règle.",
      "100, 90, 80 descend parce qu'on enlève 10 à chaque fois. Chercher ce qu'on ajoute ne mènerait à rien : c'est ce qu'on ENLÈVE qu'il faut trouver.",
      "Une soustraction, répétée à chaque étape.",
    ),
    tags: ["ce2", "suite_nombre", "decroissante", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_suite_croissante_decroissante_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "suite_nombre",
    microId: "ce2_suite_croissante_decroissante",
    difficulty: 2,
    theme: "neutral",
    hint: "Compare chaque nombre au précédent.",
    tags: ["ce2", "suite_nombre", "croissante", "template", "canvas"],
    generate: () => {
      const pas = randomChoice(PAS);
      const monte = randomChoice([true, false]);
      const depart = monte ? randomInt(1, 30) * pas : randomInt(20, 60) * pas;
      const termes = [0, 1, 2, 3].map((k) => (monte ? depart + k * pas : depart - k * pas));
      const bonne = monte ? "croissante" : "décroissante";
      return {
        text: `La suite ${termes.join(", ")} est-elle croissante ou décroissante ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          "croissante",
          "décroissante",
          "ni l'une ni l'autre",
          "on ne peut pas savoir",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Une suite est croissante quand ses nombres augmentent, décroissante quand ils diminuent.",
          "On compare chaque nombre à celui qui le précède.",
          `Chaque nombre est plus ${monte ? "grand" : "petit"} que le précédent : on ${monte ? "ajoute" : "enlève"} ${pas} à chaque étape.`,
          `Elle est ${bonne}.`,
        ),
        canvas: suiteCanvas(termes),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_suite_croissante_decroissante_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "suite_nombre",
    microId: "ce2_suite_croissante_decroissante",
    difficulty: 4,
    theme: "neutral",
    hint: "Il suffit d'une seule descente pour qu'une suite ne soit plus croissante.",
    tags: ["ce2", "suite_nombre", "croissante", "piege", "template"],
    generate: () => {
      const pas = randomChoice([2, 5, 10] as const);
      const depart = randomInt(4, 40) * pas;
      const reguliere = randomChoice([true, false]);
      const termes = reguliere
        ? [0, 1, 2, 3].map((k) => depart + k * pas)
        : [depart, depart + pas, depart + pas - Math.floor(pas / 2) - 1, depart + 2 * pas];
      const bonne = reguliere
        ? "oui, elle monte à chaque étape"
        : "non, elle descend à un moment";
      return {
        text: `La suite ${termes.join(", ")} est-elle croissante ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          "oui, elle monte à chaque étape",
          "non, elle descend à un moment",
          "oui, parce qu'elle finit plus haut qu'elle ne commence",
          "on ne peut pas savoir",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Une suite est croissante seulement si chaque nombre est plus grand que le précédent, sans exception.",
          "On compare chaque nombre à celui qui le précède, du premier au dernier.",
          reguliere
            ? `Chaque nombre est plus grand que le précédent : la suite monte de ${pas} à chaque étape.`
            : `De ${termes[1]} à ${termes[2]}, la suite descend. Une seule descente suffit : elle n'est pas croissante, même si elle finit plus haut qu'elle n'a commencé.`,
          `${bonne.charAt(0).toUpperCase() + bonne.slice(1)}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_SUITE_DEFI — les défis
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_suite_defi_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "suite_nombre",
    microId: "ce2_suite_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Dans la suite 4, 8, 16, 32, quel nombre vient après 32 ?",
    format: "short",
    expected: ["64"],
    comparator: "number_equal",
    hint: "Les écarts grandissent : essaie la multiplication.",
    explanation: exp(
      "Quand les écarts d'une suite grandissent, la règle n'est pas une addition mais un doublement.",
      "On essaie d'abord l'addition ; si les écarts ne sont pas égaux, on essaie de doubler.",
      "Les écarts valent + 4, + 8, + 16 : ils ne sont pas égaux. Mais 4 × 2 = 8, 8 × 2 = 16, 16 × 2 = 32. On double à chaque fois, donc le suivant est 32 × 2 = 64.",
      "Le nombre suivant est 64.",
    ),
    tags: ["ce2", "suite_nombre", "defi", "doublement"],
    canvas: suiteCanvas([4, 8, 16, 32, "?"]),
  },
  {
    kind: "fixed",
    id: "ce2_suite_defi_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "suite_nombre",
    microId: "ce2_suite_defi",
    difficulty: 5,
    theme: "reunion",
    text: "Un pied de vanille pousse de 25 cm par mois. Il mesure 40 cm aujourd'hui. Combien mesurera-t-il dans 4 mois, en cm ?",
    format: "short",
    expected: ["140"],
    comparator: "number_equal",
    hint: "C'est une suite : on ajoute 25 quatre fois.",
    explanation: exp(
      "Une croissance régulière est une suite : on ajoute toujours la même chose.",
      "On calcule d'abord ce qui s'ajoute en tout, puis on l'ajoute à la taille de départ.",
      "En 4 mois, il pousse de 25 × 4 = 100 cm. Avec les 40 cm de départ : 40 + 100 = 140. On pourrait aussi écrire la suite : 40, 65, 90, 115, 140.",
      "Il mesurera 140 cm.",
    ),
    tags: ["ce2", "suite_nombre", "defi", "reunion", "deux_etapes"],
  },
  {
    kind: "template",
    id: "ce2_suite_defi_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "suite_nombre",
    microId: "ce2_suite_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Trouve d'abord la règle, puis avance de plusieurs étapes d'un coup.",
    tags: ["ce2", "suite_nombre", "defi", "template", "canvas"],
    generate: () => {
      const pas = randomChoice(PAS);
      const depart = randomInt(2, 20) * pas;
      const termes = [0, 1, 2].map((k) => depart + k * pas);
      const saut = randomInt(3, 6);
      const cible = depart + (2 + saut) * pas;
      return {
        text: `Une suite commence par ${termes.join(", ")}. Quel sera le nombre situé ${saut} étapes après ${termes[2]} ?`,
        format: "short",
        expected: [String(cible)],
        comparator: "number_equal",
        explanation: exp(
          "Une suite avance en répétant la même opération : avancer de plusieurs étapes revient à répéter la règle autant de fois.",
          "On trouve d'abord la règle, puis on multiplie l'écart par le nombre d'étapes.",
          `La règle est « + ${pas} ». En ${saut} étapes, on ajoute ${pas} × ${saut} = ${pas * saut}. Donc ${termes[2]} + ${pas * saut} = ${cible}.`,
          `Le nombre est ${cible}.`,
        ),
        canvas: suiteCanvas([...termes, "…", "?"]),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_suite_defi_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "suite_nombre",
    microId: "ce2_suite_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "Ajoute le même nombre autant de fois qu'il y a d'étapes.",
    tags: ["ce2", "suite_nombre", "defi", "reunion", "template"],
    generate: () => {
      // ⚠️ « mois » ne prend pas de s : le pluriel voyage avec le mot.
      const contexte = randomChoice([
        { quoi: "un pied de vanille", verbe: "pousse", unite: "cm", periode: "mois", periodes: "mois" },
        { quoi: "un plant de canne", verbe: "pousse", unite: "cm", periode: "semaine", periodes: "semaines" },
        { quoi: "la cagnotte de la classe", verbe: "grossit", unite: "€", periode: "semaine", periodes: "semaines" },
      ]);
      const pas = randomChoice([5, 10, 15, 25] as const);
      const depart = randomInt(2, 12) * 10;
      const etapes = randomInt(3, 6);
      const total = depart + pas * etapes;
      return {
        text: `${contexte.quoi.charAt(0).toUpperCase() + contexte.quoi.slice(1)} ${contexte.verbe} de ${pas} ${contexte.unite} par ${contexte.periode}. Aujourd'hui, ${contexte.quoi} est à ${depart} ${contexte.unite}. Combien dans ${etapes} ${contexte.periodes}, en ${contexte.unite} ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Une progression régulière est une suite : on ajoute toujours la même chose.",
          "On calcule d'abord ce qui s'ajoute en tout, puis on l'ajoute au point de départ.",
          `En ${etapes} ${contexte.periodes} : ${pas} × ${etapes} = ${pas * etapes}. Avec le départ : ${depart} + ${pas * etapes} = ${total}.`,
          `Cela fera ${total} ${contexte.unite}.`,
        ),
      };
    },
  },
];
