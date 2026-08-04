// lib/tutor-v4/question-banks/maths/cm2/suites.bank.ts

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

function formatNumber(n: number | string) {
  return String(n).replace(".", ",");
}

function exp(
  definition: string,
  methode: string,
  calcul: string,
  conclusion: string
) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;
}

function suiteCanvas(data: {
  theme?:
    | "nombre"
    | "margouillat"
    | "pieces"
    | "eau"
    | "dechet"
    | "jeu_video"
    | "surf"
    | "requin"
    | "pi";
  titre?: string;
  terms: Array<number | string>;
  missingIndex?: number;
  arrows?: string[];
  rule?: string;
  phrase?: string;
  display?: {
    showIcons?: boolean;
    showArrows?: boolean;
    showRule?: boolean;
    showLabels?: boolean;
  };
}) {
  return {
    kind: "suite" as const,
    theme: data.theme ?? "nombre",
    titre: data.titre,
    terms: data.terms,
    missingIndex: data.missingIndex,
    arrows: data.arrows,
    rule: data.rule,
    phrase: data.phrase,
    display: {
      showIcons: data.theme !== "nombre",
      showArrows: true,
      showRule: false,
      showLabels: true,
      ...(data.display ?? {}),
    },
  };
}

export const suitesBank: TutorBankItemV4[] = [
  // ============================================================
  // SUITE_CONTINUER
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_suite_continuer_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_continuer",
    difficulty: 1,
    theme: "neutral",
    text: "Continue la suite : 2 ; 4 ; 6 ; 8 ; ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "On ajoute toujours le même nombre.",
    explanation: exp(
      "Une suite de nombres est une liste de nombres rangés selon une règle.",
      "On cherche ce qui change d’un nombre au suivant.",
      "On ajoute 2 à chaque fois : 8 + 2 = 10.",
      "Le nombre suivant est 10."
    ),
    canvas: suiteCanvas({
      theme: "nombre",
      titre: "Continuer une suite",
      terms: [2, 4, 6, 8, "?"],
      missingIndex: 4,
      arrows: ["+2", "+2", "+2", "+2"],
      rule: "On ajoute 2 à chaque fois.",
      phrase: "Observe l’écart entre deux nombres voisins.",
    }),
    tags: ["cm2", "suite", "continuer", "addition", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm2_suite_continuer_fixed_2",
    niveau: "cm2",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_continuer",
    difficulty: 1,
    theme: "neutral",
    text: "Continue la suite : 5 ; 10 ; 15 ; 20 ; ?",
    format: "short",
    expected: ["25"],
    comparator: "number_equal",
    hint: "On ajoute 5 à chaque fois.",
    explanation: exp(
      "Une suite suit une règle régulière.",
      "On repère l’écart entre deux nombres voisins.",
      "5 ; 10 ; 15 ; 20 : on ajoute 5. Donc 20 + 5 = 25.",
      "Le nombre suivant est 25."
    ),
    canvas: suiteCanvas({
      theme: "pieces",
      titre: "Suite de pièces",
      terms: [5, 10, 15, 20, "?"],
      missingIndex: 4,
      arrows: ["+5", "+5", "+5", "+5"],
      rule: "On ajoute 5 à chaque fois.",
      phrase: "Les quantités augmentent régulièrement.",
    }),
    tags: ["cm2", "suite", "continuer", "addition", "pieces", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm2_suite_continuer_fixed_3",
    niveau: "cm2",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_continuer",
    difficulty: 2,
    theme: "neutral",
    text: "Continue la suite : 30 ; 27 ; 24 ; 21 ; ?",
    format: "short",
    expected: ["18"],
    comparator: "number_equal",
    hint: "La suite descend.",
    explanation: exp(
      "Une suite peut augmenter ou diminuer.",
      "On cherche l’écart entre deux termes.",
      "On enlève 3 à chaque fois : 21 - 3 = 18.",
      "Le nombre suivant est 18."
    ),
    canvas: suiteCanvas({
      theme: "eau",
      titre: "Suite décroissante",
      terms: [30, 27, 24, 21, "?"],
      missingIndex: 4,
      arrows: ["-3", "-3", "-3", "-3"],
      rule: "On enlève 3 à chaque fois.",
      phrase: "La suite diminue régulièrement.",
    }),
    tags: ["cm2", "suite", "continuer", "soustraction", "eau", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm2_suite_continuer_fixed_4_terme_manquant",
    niveau: "cm2",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_continuer",
    difficulty: 2,
    theme: "neutral",
    text: "Complète la suite : 5 ; 10 ; ? ; 20 ; 25",
    format: "short",
    expected: ["15"],
    comparator: "number_equal",
    hint: "On ajoute 5 à chaque fois.",
    explanation: exp(
      "Continuer une suite, c’est aussi trouver un terme manquant au milieu.",
      "On cherche la règle entre deux termes voisins.",
      "5 ; 10 ; 15 ; 20 ; 25 : on ajoute 5 à chaque fois.",
      "Le nombre manquant est 15."
    ),
    canvas: suiteCanvas({
      theme: "nombre",
      titre: "Trouver un terme manquant",
      terms: [5, 10, "?", 20, 25],
      missingIndex: 2,
      arrows: ["+5", "+5", "+5", "+5"],
      rule: "On ajoute 5 à chaque fois.",
      phrase: "Le nombre manquant doit respecter la règle de toute la suite.",
    }),
    tags: ["cm2", "suite", "continuer", "terme_manquant", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm2_suite_continuer_fixed_5_decimal",
    niveau: "cm2",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_continuer",
    difficulty: 3,
    theme: "neutral",
    text: "Continue la suite : 0,5 ; 1 ; 1,5 ; 2 ; ?",
    format: "short",
    expected: ["2,5", "2.5", "2,50", "2.50"],
    comparator: "number_equal",
    hint: "On ajoute 0,5 à chaque fois.",
    explanation: exp(
      "Une suite peut aussi contenir des nombres décimaux.",
      "On repère l’écart entre deux termes voisins.",
      "0,5 ; 1 ; 1,5 ; 2 : on ajoute 0,5. Donc 2 + 0,5 = 2,5.",
      "Le nombre suivant est 2,5."
    ),
    canvas: suiteCanvas({
      theme: "nombre",
      titre: "Suite avec décimaux",
      terms: ["0,5", "1", "1,5", "2", "?"],
      missingIndex: 4,
      arrows: ["+0,5", "+0,5", "+0,5", "+0,5"],
      rule: "On ajoute 0,5 à chaque fois.",
      phrase: "Les suites peuvent aussi avancer avec des nombres décimaux.",
    }),
    tags: ["cm2", "suite", "continuer", "decimal", "canvas"],
  },

  {
    kind: "template",
    id: "cm2_suite_continuer_tpl_1_addition",
    niveau: "cm2",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_continuer",
    difficulty: 2,
    theme: "neutral",
    hint: "Trouve ce qu’on ajoute à chaque étape.",
    tags: ["cm2", "suite", "continuer", "addition", "template", "canvas"],
    generate: () => {
      const start = randomInt(1, 20);
      const step = randomChoice([2, 3, 4, 5, 10]);
      const terms = [
        start,
        start + step,
        start + 2 * step,
        start + 3 * step,
      ];
      const next = start + 4 * step;

      return {
        text: `Continue la suite : ${terms.join(" ; ")} ; ?`,
        format: "short",
        expected: [String(next)],
        comparator: "number_equal",
        explanation: exp(
          "Une suite peut être construite en ajoutant toujours le même nombre.",
          "On cherche l’écart entre deux nombres voisins.",
          `On ajoute ${step} à chaque fois : ${terms[3]} + ${step} = ${next}.`,
          `Le nombre suivant est ${next}.`
        ),
        canvas: suiteCanvas({
          theme: randomChoice(["nombre", "margouillat", "pieces", "dechet"]),
          titre: "Suite croissante",
          terms: [...terms, "?"],
          missingIndex: 4,
          arrows: [`+${step}`, `+${step}`, `+${step}`, `+${step}`],
          rule: `On ajoute ${step} à chaque fois.`,
          phrase: "La suite augmente régulièrement.",
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_suite_continuer_tpl_2_soustraction",
    niveau: "cm2",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_continuer",
    difficulty: 2,
    theme: "neutral",
    hint: "La suite diminue : cherche ce qu’on enlève.",
    tags: ["cm2", "suite", "continuer", "soustraction", "template", "canvas"],
    generate: () => {
      const step = randomChoice([2, 3, 4, 5]);
      const next = randomInt(5, 25);
      const terms = [
        next + 4 * step,
        next + 3 * step,
        next + 2 * step,
        next + step,
      ];

      return {
        text: `Continue la suite : ${terms.join(" ; ")} ; ?`,
        format: "short",
        expected: [String(next)],
        comparator: "number_equal",
        explanation: exp(
          "Une suite peut diminuer régulièrement.",
          "On repère le nombre qu’on enlève à chaque étape.",
          `On enlève ${step} à chaque fois : ${terms[3]} - ${step} = ${next}.`,
          `Le nombre suivant est ${next}.`
        ),
        canvas: suiteCanvas({
          theme: randomChoice(["nombre", "eau", "dechet"]),
          titre: "Suite décroissante",
          terms: [...terms, "?"],
          missingIndex: 4,
          arrows: [`-${step}`, `-${step}`, `-${step}`, `-${step}`],
          rule: `On enlève ${step} à chaque fois.`,
          phrase: "La suite diminue régulièrement.",
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_suite_continuer_tpl_3_terme_manquant",
    niveau: "cm2",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_continuer",
    difficulty: 3,
    theme: "neutral",
    hint: "Utilise les nombres avant et après le trou.",
    tags: ["cm2", "suite", "continuer", "terme_manquant", "template", "canvas"],
    generate: () => {
      const start = randomInt(2, 20);
      const step = randomChoice([2, 3, 4, 5, 10]);
      const terms = [
        start,
        start + step,
        "?",
        start + 3 * step,
        start + 4 * step,
      ];
      const missing = start + 2 * step;

      return {
        text: `Complète la suite : ${terms.join(" ; ")}`,
        format: "short",
        expected: [String(missing)],
        comparator: "number_equal",
        explanation: exp(
          "Un terme manquant doit respecter la règle de la suite.",
          "On cherche l’écart entre les termes connus.",
          `La règle est +${step}. Donc le nombre manquant est ${start + step} + ${step} = ${missing}.`,
          `Le nombre manquant est ${missing}.`
        ),
        canvas: suiteCanvas({
          theme: "nombre",
          titre: "Nombre manquant",
          terms,
          missingIndex: 2,
          arrows: [`+${step}`, `+${step}`, `+${step}`, `+${step}`],
          rule: `On ajoute ${step} à chaque fois.`,
          phrase: "Le trou doit garder la régularité de la suite.",
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_suite_continuer_tpl_4_decimal",
    niveau: "cm2",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_continuer",
    difficulty: 3,
    theme: "neutral",
    hint: "Observe l’écart décimal entre deux termes.",
    tags: ["cm2", "suite", "continuer", "decimal", "template", "canvas"],
    generate: () => {
      const start = randomChoice([0.5, 1, 1.5, 2]);
      const step = randomChoice([0.5, 1.5]);
      const terms = [
        start,
        start + step,
        start + 2 * step,
        start + 3 * step,
      ].map(formatNumber);
      const next = start + 4 * step;

      return {
        text: `Continue la suite : ${terms.join(" ; ")} ; ?`,
        format: "short",
        expected: [String(next), formatNumber(next)],
        comparator: "number_equal",
        explanation: exp(
          "Une suite peut avancer avec un écart décimal.",
          "On calcule l’écart entre deux termes voisins.",
          `On ajoute ${formatNumber(step)} à chaque fois. Donc ${terms[3]} + ${formatNumber(step)} = ${formatNumber(next)}.`,
          `Le nombre suivant est ${formatNumber(next)}.`
        ),
        canvas: suiteCanvas({
          theme: "nombre",
          titre: "Suite décimale",
          terms: [...terms, "?"],
          missingIndex: 4,
          arrows: [
            `+${formatNumber(step)}`,
            `+${formatNumber(step)}`,
            `+${formatNumber(step)}`,
            `+${formatNumber(step)}`,
          ],
          rule: `On ajoute ${formatNumber(step)} à chaque fois.`,
          phrase: "Même avec des décimaux, on cherche l’écart entre deux termes.",
        }),
      };
    },
  },
  
  // ============================================================
  // SUITE_REGLE
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_suite_regle_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_regle",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la règle de la suite : 4 ; 7 ; 10 ; 13 ?",
    format: "qcm",
    choices: [
      "ajouter 3",
      "ajouter 4",
      "enlever 3",
      "multiplier par 3",
    ],
    expected: ["ajouter 3"],
    comparator: "mcq_exact",
    hint: "Compare deux nombres voisins.",
    explanation: exp(
      "Trouver la règle d’une suite, c’est trouver comment passer d’un nombre au suivant.",
      "On calcule l’écart entre deux nombres voisins.",
      "7 - 4 = 3, 10 - 7 = 3, 13 - 10 = 3.",
      "La règle est : ajouter 3."
    ),
    canvas: suiteCanvas({
      theme: "nombre",
      titre: "Trouver la règle",
      terms: [4, 7, 10, 13],
      arrows: ["+3", "+3", "+3"],
      rule: "On ajoute 3 à chaque fois.",
      phrase: "La même règle permet de passer d’un terme au suivant.",
      display: {
        showRule: false,
      },
    }),
    tags: ["cm2", "suite", "regle", "addition", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm2_suite_regle_fixed_2",
    niveau: "cm2",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_regle",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la règle de la suite : 40 ; 35 ; 30 ; 25 ?",
    format: "qcm",
    choices: [
      "enlever 5",
      "ajouter 5",
      "enlever 10",
      "multiplier par 5",
    ],
    expected: ["enlever 5"],
    comparator: "mcq_exact",
    hint: "La suite diminue.",
    explanation: exp(
      "Une règle peut faire augmenter ou diminuer une suite.",
      "On regarde comment passer d’un terme au suivant.",
      "40 - 5 = 35, 35 - 5 = 30, 30 - 5 = 25.",
      "La règle est : enlever 5."
    ),
    canvas: suiteCanvas({
      theme: "eau",
      titre: "Suite décroissante",
      terms: [40, 35, 30, 25],
      arrows: ["-5", "-5", "-5"],
      rule: "On enlève 5 à chaque fois.",
      phrase: "La suite descend régulièrement.",
      display: {
        showRule: false,
      },
    }),
    tags: ["cm2", "suite", "regle", "soustraction", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm2_suite_regle_fixed_3_multiplication",
    niveau: "cm2",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_regle",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la règle de la suite : 2 ; 4 ; 8 ; 16 ?",
    format: "qcm",
    choices: [
      "multiplier par 2",
      "ajouter 2",
      "ajouter 4",
      "multiplier par 4",
    ],
    expected: ["multiplier par 2"],
    comparator: "mcq_exact",
    hint: "L’écart n’est pas toujours le même : regarde aussi les multiplications.",
    explanation: exp(
      "Certaines suites ne se construisent pas en ajoutant toujours le même nombre.",
      "On regarde comment passer d’un terme au suivant.",
      "2 × 2 = 4, 4 × 2 = 8, 8 × 2 = 16.",
      "La règle est : multiplier par 2."
    ),
    canvas: suiteCanvas({
      theme: "pieces",
      titre: "Suite multiplicative",
      terms: [2, 4, 8, 16],
      arrows: ["×2", "×2", "×2"],
      rule: "On multiplie par 2 à chaque fois.",
      phrase: "Ici, on ne fait pas +2 à chaque fois : on multiplie par 2.",
      display: {
        showRule: false,
      },
    }),
    tags: ["cm2", "suite", "regle", "multiplication", "qcm", "piege", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm2_suite_regle_fixed_4_decimal",
    niveau: "cm2",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_regle",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la règle de la suite : 0,5 ; 1 ; 1,5 ; 2 ?",
    format: "qcm",
    choices: [
      "ajouter 0,5",
      "ajouter 1",
      "enlever 0,5",
      "multiplier par 2",
    ],
    expected: ["ajouter 0,5"],
    comparator: "mcq_exact",
    hint: "Compare deux termes voisins : 1 - 0,5 = 0,5.",
    explanation: exp(
      "Une suite peut aussi avancer avec des nombres décimaux.",
      "On calcule l’écart entre deux termes voisins.",
      "1 - 0,5 = 0,5 ; 1,5 - 1 = 0,5 ; 2 - 1,5 = 0,5.",
      "La règle est : ajouter 0,5."
    ),
    canvas: suiteCanvas({
      theme: "nombre",
      titre: "Règle avec décimaux",
      terms: ["0,5", "1", "1,5", "2"],
      arrows: ["+0,5", "+0,5", "+0,5"],
      rule: "On ajoute 0,5 à chaque fois.",
      phrase: "Pour trouver la règle, on compare deux termes voisins.",
      display: {
        showRule: false,
      },
    }),
    tags: ["cm2", "suite", "regle", "decimal", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm2_suite_regle_fixed_5_piege_non_reguliere",
    niveau: "cm2",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_regle",
    difficulty: 4,
    theme: "neutral",
    text: "La suite 3 ; 6 ; 10 ; 15 suit-elle la règle « ajouter 3 » ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Vérifie tous les écarts, pas seulement le premier.",
    explanation: exp(
      "Pour vérifier une règle, il faut tester tous les passages entre deux termes voisins.",
      "On compare les écarts successifs.",
      "6 - 3 = 3, mais 10 - 6 = 4 et 15 - 10 = 5.",
      "La règle « ajouter 3 » ne fonctionne pas pour toute la suite."
    ),
    canvas: suiteCanvas({
      theme: "nombre",
      titre: "Attention au piège",
      terms: [3, 6, 10, 15],
      arrows: ["+3", "+4", "+5"],
      rule: "Les écarts changent.",
      phrase: "Une règle doit fonctionner entre tous les termes voisins.",
      display: {
        showRule: false,
      },
    }),
    tags: ["cm2", "suite", "regle", "piege", "non_reguliere", "qcm", "canvas"],
  },

  {
    kind: "template",
    id: "cm2_suite_regle_tpl_1_addition",
    niveau: "cm2",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_regle",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche l’écart entre deux nombres voisins.",
    tags: ["cm2", "suite", "regle", "addition", "template", "canvas"],
    generate: () => {
      const start = randomInt(1, 20);
      const step = randomChoice([2, 3, 4, 5, 6, 10]);
      const terms = [
        start,
        start + step,
        start + 2 * step,
        start + 3 * step,
      ];

      const correct = `ajouter ${step}`;

      return {
        text: `Quelle est la règle de la suite : ${terms.join(" ; ")} ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `ajouter ${step + 1}`,
          `enlever ${step}`,
          `multiplier par ${step}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "La règle d’une suite explique comment passer d’un nombre au suivant.",
          "On calcule l’écart entre deux nombres voisins.",
          `${terms[1]} - ${terms[0]} = ${step}. On ajoute donc ${step} à chaque fois.`,
          `La règle est : ajouter ${step}.`
        ),
        canvas: suiteCanvas({
          theme: randomChoice(["nombre", "margouillat", "pieces", "dechet"]),
          titre: "Quelle est la règle ?",
          terms,
          arrows: [`+${step}`, `+${step}`, `+${step}`],
          rule: `On ajoute ${step} à chaque fois.`,
          phrase: "La suite augmente avec le même écart.",
          display: {
            showRule: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_suite_regle_tpl_2_soustraction",
    niveau: "cm2",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_regle",
    difficulty: 3,
    theme: "neutral",
    hint: "Observe si la suite monte ou descend.",
    tags: ["cm2", "suite", "regle", "soustraction", "template", "canvas"],
    generate: () => {
      const step = randomChoice([2, 3, 4, 5, 6]);
      const last = randomInt(5, 20);
      const terms = [
        last + 3 * step,
        last + 2 * step,
        last + step,
        last,
      ];

      const correct = `enlever ${step}`;

      return {
        text: `Quelle est la règle de la suite : ${terms.join(" ; ")} ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `ajouter ${step}`,
          `enlever ${step + 1}`,
          `multiplier par ${step}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Une suite décroissante diminue selon une règle.",
          "On calcule l’écart entre deux termes voisins.",
          `${terms[0]} - ${terms[1]} = ${step}. On enlève donc ${step} à chaque fois.`,
          `La règle est : enlever ${step}.`
        ),
        canvas: suiteCanvas({
          theme: randomChoice(["nombre", "eau", "dechet"]),
          titre: "Quelle est la règle ?",
          terms,
          arrows: [`-${step}`, `-${step}`, `-${step}`],
          rule: `On enlève ${step} à chaque fois.`,
          phrase: "La suite diminue avec le même écart.",
          display: {
            showRule: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_suite_regle_tpl_3_multiplication",
    niveau: "cm2",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_regle",
    difficulty: 4,
    theme: "neutral",
    hint: "Essaie de voir si on multiplie par le même nombre.",
    tags: ["cm2", "suite", "regle", "multiplication", "template", "canvas"],
    generate: () => {
      const start = randomChoice([2, 3, 4, 5]);
      const factor = randomChoice([2, 3]);
      const terms = [
        start,
        start * factor,
        start * factor ** 2,
        start * factor ** 3,
      ];

      const correct = `multiplier par ${factor}`;

      return {
        text: `Quelle est la règle de la suite : ${terms.join(" ; ")} ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `ajouter ${factor}`,
          `ajouter ${terms[1] - terms[0]}`,
          `multiplier par ${factor + 1}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Certaines suites se construisent en multipliant par le même nombre.",
          "On vérifie le passage d’un terme au suivant.",
          `${terms[0]} × ${factor} = ${terms[1]}, ${terms[1]} × ${factor} = ${terms[2]}.`,
          `La règle est : multiplier par ${factor}.`
        ),
        canvas: suiteCanvas({
          theme: randomChoice(["nombre", "pieces", "jeu_video"]),
          titre: "Règle multiplicative",
          terms,
          arrows: [`×${factor}`, `×${factor}`, `×${factor}`],
          rule: `On multiplie par ${factor} à chaque fois.`,
          phrase: "Attention : les écarts ne sont pas constants, mais le multiplicateur l’est.",
          display: {
            showRule: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_suite_regle_tpl_4_decimal",
    niveau: "cm2",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_regle",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule l’écart entre deux termes voisins.",
    tags: ["cm2", "suite", "regle", "decimal", "template", "canvas"],
    generate: () => {
      const start = randomChoice([0.5, 1, 1.5, 2]);
      const step = randomChoice([0.5, 1.5]);
      const termsNumber = [
        start,
        start + step,
        start + 2 * step,
        start + 3 * step,
      ];
      const terms = termsNumber.map(formatNumber);
      const stepText = formatNumber(step);
      const correct = `ajouter ${stepText}`;

      return {
        text: `Quelle est la règle de la suite : ${terms.join(" ; ")} ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          "ajouter 1",
          `enlever ${stepText}`,
          "multiplier par 2",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Une suite peut avoir une règle avec des nombres décimaux.",
          "On calcule l’écart entre deux termes voisins.",
          `${terms[1]} - ${terms[0]} = ${stepText}.`,
          `La règle est : ajouter ${stepText}.`
        ),
        canvas: suiteCanvas({
          theme: "nombre",
          titre: "Règle décimale",
          terms,
          arrows: [`+${stepText}`, `+${stepText}`, `+${stepText}`],
          rule: `On ajoute ${stepText} à chaque fois.`,
          phrase: "Même avec des décimaux, on peut chercher une règle régulière.",
          display: {
            showRule: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_suite_regle_tpl_5_piege_ecarts_variables",
    niveau: "cm2",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_regle",
    difficulty: 4,
    theme: "neutral",
    hint: "Vérifie tous les passages, pas seulement le premier.",
    tags: ["cm2", "suite", "regle", "piege", "ecarts_variables", "template", "canvas"],
    generate: () => {
      const start = randomInt(2, 10);
      const firstStep = randomChoice([2, 3, 4]);
      const secondStep = firstStep + 1;
      const thirdStep = secondStep + 1;
      const terms = [
        start,
        start + firstStep,
        start + firstStep + secondStep,
        start + firstStep + secondStep + thirdStep,
      ];

      const falseRule = `ajouter ${firstStep}`;

      return {
        text: `La suite ${terms.join(" ; ")} suit-elle la règle « ${falseRule} » ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Une règle doit être valable sur toute la suite.",
          "On vérifie chaque passage entre deux termes voisins.",
          `${terms[1]} - ${terms[0]} = ${firstStep}, mais ${terms[2]} - ${terms[1]} = ${secondStep}.`,
          `La suite ne suit donc pas la règle « ${falseRule} ».`
        ),
        canvas: suiteCanvas({
          theme: "nombre",
          titre: "Vérifier une règle",
          terms,
          arrows: [`+${firstStep}`, `+${secondStep}`, `+${thirdStep}`],
          rule: "Les écarts ne sont pas tous identiques.",
          phrase: "Attention : une règle doit fonctionner partout.",
          display: {
            showRule: false,
          },
        }),
      };
    },
  },
    // ============================================================
  // SUITE_CROISSANTE_DECROISSANTE
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_suite_croissante_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_croissante_decroissante",
    difficulty: 1,
    theme: "neutral",
    text: "La suite 3 ; 6 ; 9 ; 12 est-elle croissante ou décroissante ?",
    format: "qcm",
    choices: ["croissante", "décroissante", "ni l’une ni l’autre"],
    expected: ["croissante"],
    comparator: "mcq_exact",
    hint: "Les nombres deviennent-ils plus grands ?",
    explanation: exp(
      "Une suite croissante augmente quand on avance dans la liste.",
      "On compare les nombres dans l’ordre.",
      "3 < 6 < 9 < 12.",
      "La suite est croissante."
    ),
    canvas: suiteCanvas({
      theme: "nombre",
      titre: "Suite croissante",
      terms: [3, 6, 9, 12],
      arrows: ["+3", "+3", "+3"],
      rule: "Les nombres augmentent.",
      phrase: "Quand les nombres augmentent dans l’ordre, la suite est croissante.",
      display: {
        showRule: false,
      },
    }),
    tags: ["cm2", "suite", "croissante", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm2_suite_decroissante_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_croissante_decroissante",
    difficulty: 1,
    theme: "neutral",
    text: "La suite 20 ; 15 ; 10 ; 5 est-elle croissante ou décroissante ?",
    format: "qcm",
    choices: ["croissante", "décroissante", "ni l’une ni l’autre"],
    expected: ["décroissante"],
    comparator: "mcq_exact",
    hint: "Les nombres deviennent-ils plus petits ?",
    explanation: exp(
      "Une suite décroissante diminue quand on avance dans la liste.",
      "On compare les nombres dans l’ordre.",
      "20 > 15 > 10 > 5.",
      "La suite est décroissante."
    ),
    canvas: suiteCanvas({
      theme: "eau",
      titre: "Suite décroissante",
      terms: [20, 15, 10, 5],
      arrows: ["-5", "-5", "-5"],
      rule: "Les nombres diminuent.",
      phrase: "Quand les nombres diminuent dans l’ordre, la suite est décroissante.",
      display: {
        showRule: false,
      },
    }),
    tags: ["cm2", "suite", "decroissante", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm2_suite_constante_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_croissante_decroissante",
    difficulty: 2,
    theme: "neutral",
    text: "La suite 7 ; 7 ; 7 ; 7 est-elle croissante ou décroissante ?",
    format: "qcm",
    choices: ["croissante", "décroissante", "ni l’une ni l’autre"],
    expected: ["ni l’une ni l’autre"],
    comparator: "mcq_exact",
    hint: "Les nombres ne deviennent ni plus grands ni plus petits.",
    explanation: exp(
      "Au niveau CM2, on distingue surtout les suites qui montent, qui descendent, ou qui ne font pas clairement l’un des deux.",
      "On observe si les nombres augmentent ou diminuent.",
      "7 ; 7 ; 7 ; 7 : les nombres restent identiques.",
      "On choisit ici : ni l’une ni l’autre."
    ),
    canvas: suiteCanvas({
      theme: "nombre",
      titre: "Suite constante",
      terms: [7, 7, 7, 7],
      arrows: ["+0", "+0", "+0"],
      rule: "Les nombres ne changent pas.",
      phrase: "La suite ne monte pas et ne descend pas.",
      display: {
        showRule: false,
      },
    }),
    tags: ["cm2", "suite", "constante", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm2_suite_ni_croissante_ni_decroissante_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_croissante_decroissante",
    difficulty: 2,
    theme: "neutral",
    text: "La suite 4 ; 8 ; 6 ; 10 est-elle croissante ou décroissante ?",
    format: "qcm",
    choices: ["croissante", "décroissante", "ni l’une ni l’autre"],
    expected: ["ni l’une ni l’autre"],
    comparator: "mcq_exact",
    hint: "Elle monte puis elle descend.",
    explanation: exp(
      "Une suite croissante augmente toujours, une suite décroissante diminue toujours.",
      "On observe tous les passages.",
      "4 à 8 augmente, mais 8 à 6 diminue.",
      "La suite n’est ni croissante ni décroissante."
    ),
    canvas: suiteCanvas({
      theme: "nombre",
      titre: "Attention au piège",
      terms: [4, 8, 6, 10],
      arrows: ["+4", "-2", "+4"],
      rule: "La suite monte puis descend.",
      phrase:
        "Il ne suffit pas de regarder le premier et le dernier nombre : il faut tout vérifier.",
      display: {
        showRule: false,
      },
    }),
    tags: ["cm2", "suite", "croissante", "decroissante", "piege", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm2_suite_ni_croissante_ni_decroissante_fixed_2_piege_extremes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_croissante_decroissante",
    difficulty: 3,
    theme: "neutral",
    text: "La suite 2 ; 9 ; 5 ; 12 est-elle croissante ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Regarde tous les passages, pas seulement 2 et 12.",
    explanation: exp(
      "Une suite croissante doit augmenter à chaque étape.",
      "On observe tous les passages entre deux termes voisins.",
      "2 à 9 augmente, mais 9 à 5 diminue.",
      "La suite n’est pas croissante."
    ),
    canvas: suiteCanvas({
      theme: "nombre",
      titre: "Vérifier tous les passages",
      terms: [2, 9, 5, 12],
      arrows: ["+7", "-4", "+7"],
      rule: "Elle n’augmente pas tout le temps.",
      phrase:
        "Même si le dernier nombre est plus grand que le premier, la suite n’est pas forcément croissante.",
      display: {
        showRule: false,
      },
    }),
    tags: ["cm2", "suite", "croissante", "piege", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm2_suite_croissante_decimal_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_croissante_decroissante",
    difficulty: 3,
    theme: "neutral",
    text: "La suite 0,5 ; 1 ; 1,5 ; 2 est-elle croissante ou décroissante ?",
    format: "qcm",
    choices: ["croissante", "décroissante", "ni l’une ni l’autre"],
    expected: ["croissante"],
    comparator: "mcq_exact",
    hint: "Les nombres augmentent, même si ce sont des décimaux.",
    explanation: exp(
      "Une suite croissante peut contenir des nombres entiers ou décimaux.",
      "On compare les termes dans l’ordre.",
      "0,5 < 1 < 1,5 < 2.",
      "La suite est croissante."
    ),
    canvas: suiteCanvas({
      theme: "nombre",
      titre: "Suite décimale croissante",
      terms: ["0,5", "1", "1,5", "2"],
      arrows: ["+0,5", "+0,5", "+0,5"],
      rule: "Les nombres augmentent.",
      phrase: "Une suite de décimaux peut aussi être croissante.",
      display: {
        showRule: false,
      },
    }),
    tags: ["cm2", "suite", "croissante", "decimal", "qcm", "canvas"],
  },

  {
    kind: "template",
    id: "cm2_suite_croissante_decroissante_tpl_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_croissante_decroissante",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde si les nombres montent ou descendent.",
    tags: ["cm2", "suite", "croissante_decroissante", "template", "canvas"],
    generate: () => {
      const kind = randomChoice(["croissante", "décroissante"] as const);
      const start = randomInt(2, 30);
      const step = randomChoice([2, 3, 4, 5]);

      const terms =
        kind === "croissante"
          ? [start, start + step, start + 2 * step, start + 3 * step]
          : [start + 3 * step, start + 2 * step, start + step, start];

      return {
        text: `La suite ${terms.join(" ; ")} est-elle croissante ou décroissante ?`,
        format: "qcm",
        choices: ["croissante", "décroissante", "ni l’une ni l’autre"],
        expected: [kind],
        comparator: "mcq_exact",
        explanation: exp(
          "Une suite croissante monte, une suite décroissante descend.",
          "On compare les termes dans l’ordre.",
          kind === "croissante"
            ? "Les nombres augmentent à chaque étape."
            : "Les nombres diminuent à chaque étape.",
          `La suite est ${kind}.`
        ),
        canvas: suiteCanvas({
          theme: randomChoice(["nombre", "margouillat", "eau", "pieces"]),
          titre:
            kind === "croissante" ? "Suite croissante" : "Suite décroissante",
          terms,
          arrows:
            kind === "croissante"
              ? [`+${step}`, `+${step}`, `+${step}`]
              : [`-${step}`, `-${step}`, `-${step}`],
          rule:
            kind === "croissante"
              ? "Les nombres augmentent."
              : "Les nombres diminuent.",
          phrase:
            kind === "croissante"
              ? "La suite monte régulièrement."
              : "La suite descend régulièrement.",
          display: {
            showRule: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_suite_croissante_decroissante_tpl_2_constante",
    niveau: "cm2",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_croissante_decroissante",
    difficulty: 2,
    theme: "neutral",
    hint: "Les nombres ne changent pas.",
    tags: ["cm2", "suite", "constante", "template", "canvas"],
    generate: () => {
      const value = randomInt(3, 20);
      const terms = [value, value, value, value];

      return {
        text: `La suite ${terms.join(" ; ")} est-elle croissante ou décroissante ?`,
        format: "qcm",
        choices: ["croissante", "décroissante", "ni l’une ni l’autre"],
        expected: ["ni l’une ni l’autre"],
        comparator: "mcq_exact",
        explanation: exp(
          "Une suite qui ne change pas n’augmente pas et ne diminue pas.",
          "On compare les termes dans l’ordre.",
          `${value} ; ${value} ; ${value} ; ${value} : tous les nombres sont identiques.`,
          "On choisit ici : ni l’une ni l’autre."
        ),
        canvas: suiteCanvas({
          theme: "nombre",
          titre: "Suite constante",
          terms,
          arrows: ["+0", "+0", "+0"],
          rule: "Les nombres ne changent pas.",
          phrase: "La suite ne monte pas et ne descend pas.",
          display: {
            showRule: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_suite_croissante_decroissante_tpl_3_piege_monte_descend",
    niveau: "cm2",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_croissante_decroissante",
    difficulty: 3,
    theme: "neutral",
    hint: "Vérifie tous les passages.",
    tags: ["cm2", "suite", "croissante_decroissante", "piege", "template", "canvas"],
    generate: () => {
      const a = randomInt(2, 8);
      const b = a + randomChoice([4, 5, 6]);
      const c = b - randomChoice([2, 3]);
      const d = c + randomChoice([4, 5, 6]);
      const terms = [a, b, c, d];

      return {
        text: `La suite ${terms.join(" ; ")} est-elle croissante ou décroissante ?`,
        format: "qcm",
        choices: ["croissante", "décroissante", "ni l’une ni l’autre"],
        expected: ["ni l’une ni l’autre"],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour être croissante, une suite doit augmenter à chaque étape. Pour être décroissante, elle doit diminuer à chaque étape.",
          "On observe tous les passages entre deux termes voisins.",
          `${a} à ${b} augmente, mais ${b} à ${c} diminue.`,
          "La suite n’est ni croissante ni décroissante."
        ),
        canvas: suiteCanvas({
          theme: "nombre",
          titre: "Piège : ça monte puis ça descend",
          terms,
          arrows: [`+${b - a}`, `-${b - c}`, `+${d - c}`],
          rule: "La direction change.",
          phrase:
            "Il faut regarder tous les termes, pas seulement le début et la fin.",
          display: {
            showRule: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_suite_croissante_decroissante_tpl_4_decimal",
    niveau: "cm2",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_croissante_decroissante",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare les nombres décimaux dans l’ordre.",
    tags: ["cm2", "suite", "croissante_decroissante", "decimal", "template", "canvas"],
    generate: () => {
      const kind = randomChoice(["croissante", "décroissante"] as const);
      const start = randomChoice([0.5, 1, 1.5, 2, 2.5]);
      const step = randomChoice([0.5, 1]);

      const termsNumber =
        kind === "croissante"
          ? [start, start + step, start + 2 * step, start + 3 * step]
          : [start + 3 * step, start + 2 * step, start + step, start];

      const terms = termsNumber.map(formatNumber);
      const stepText = formatNumber(step);

      return {
        text: `La suite ${terms.join(" ; ")} est-elle croissante ou décroissante ?`,
        format: "qcm",
        choices: ["croissante", "décroissante", "ni l’une ni l’autre"],
        expected: [kind],
        comparator: "mcq_exact",
        explanation: exp(
          "Les suites peuvent contenir des nombres décimaux.",
          "On compare les nombres dans l’ordre.",
          kind === "croissante"
            ? "Les nombres augmentent à chaque étape."
            : "Les nombres diminuent à chaque étape.",
          `La suite est ${kind}.`
        ),
        canvas: suiteCanvas({
          theme: "nombre",
          titre:
            kind === "croissante"
              ? "Suite décimale croissante"
              : "Suite décimale décroissante",
          terms,
          arrows:
            kind === "croissante"
              ? [`+${stepText}`, `+${stepText}`, `+${stepText}`]
              : [`-${stepText}`, `-${stepText}`, `-${stepText}`],
          rule:
            kind === "croissante"
              ? "Les nombres augmentent."
              : "Les nombres diminuent.",
          phrase: "On peut aussi étudier le sens d’une suite avec des décimaux.",
          display: {
            showRule: false,
          },
        }),
      };
    },
  },

    // ============================================================
  // SUITE_DEFI
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_suite_defi_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_defi",
    difficulty: 3,
    theme: "reunion",
    text: "Sur un sentier, on place une balise tous les 5 mètres. Les premières balises sont à 5 m, 10 m, 15 m, 20 m. Où sera la suivante ?",
    format: "short",
    expected: ["25"],
    comparator: "number_equal",
    hint: "On ajoute toujours 5 mètres.",
    explanation: exp(
      "Une situation réelle peut former une suite de nombres.",
      "On repère la règle de la suite.",
      "On ajoute 5 m à chaque fois : 20 + 5 = 25.",
      "La balise suivante sera à 25 m."
    ),
    canvas: suiteCanvas({
      theme: "nombre",
      titre: "Balises sur un sentier",
      terms: [5, 10, 15, 20, "?"],
      missingIndex: 4,
      arrows: ["+5", "+5", "+5", "+5"],
      rule: "On ajoute 5 mètres à chaque fois.",
      phrase: "Une suite peut représenter des distances régulières sur un sentier.",
      display: {
        showRule: false,
      },
    }),
    tags: ["cm2", "suite", "defi", "reunion", "sentier", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm2_suite_defi_fixed_2",
    niveau: "cm2",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un jeu vidéo donne 10 pièces au niveau 1, 20 pièces au niveau 2, 30 pièces au niveau 3. Combien de pièces au niveau 4 si la règle continue ?",
    format: "short",
    expected: ["40"],
    comparator: "number_equal",
    hint: "On ajoute 10 pièces à chaque niveau.",
    explanation: exp(
      "Une suite peut modéliser un score dans un jeu.",
      "On cherche la règle entre les niveaux.",
      "10 ; 20 ; 30 : on ajoute 10. Donc le niveau 4 donne 40 pièces.",
      "La réponse est 40 pièces."
    ),
    canvas: suiteCanvas({
      theme: "pieces",
      titre: "Récompenses de jeu vidéo",
      terms: [10, 20, 30, "?"],
      missingIndex: 3,
      arrows: ["+10", "+10", "+10"],
      rule: "On ajoute 10 pièces à chaque niveau.",
      phrase: "Le score peut suivre une suite régulière.",
      display: {
        showRule: false,
      },
    }),
    tags: ["cm2", "suite", "defi", "jeu_video", "pieces", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm2_suite_defi_fixed_3_margouillats",
    niveau: "cm2",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_defi",
    difficulty: 3,
    theme: "reunion",
    text: "Sur un mur, on observe 2 margouillats, puis 4, puis 6, puis 8. Si la suite continue, combien en observe-t-on ensuite ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "Le nombre de margouillats augmente de 2 à chaque fois.",
    explanation: exp(
      "Une suite peut décrire une observation réelle.",
      "On cherche la règle entre deux observations successives.",
      "2 ; 4 ; 6 ; 8 : on ajoute 2. Donc 8 + 2 = 10.",
      "On observe ensuite 10 margouillats."
    ),
    canvas: suiteCanvas({
      theme: "margouillat",
      titre: "Suite de margouillats",
      terms: [2, 4, 6, 8, "?"],
      missingIndex: 4,
      arrows: ["+2", "+2", "+2", "+2"],
      rule: "On ajoute 2 margouillats.",
      phrase: "Le contexte aide à comprendre la suite.",
      display: {
        showRule: false,
      },
    }),
    tags: ["cm2", "suite", "defi", "reunion", "margouillat", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm2_suite_defi_fixed_4_eau_decroissante",
    niveau: "cm2",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_defi",
    difficulty: 3,
    theme: "reunion",
    text: "Une réserve d’eau contient 50 L, puis 45 L, puis 40 L, puis 35 L. Si la suite continue, combien restera-t-il de litres ?",
    format: "short",
    expected: ["30"],
    comparator: "number_equal",
    hint: "La quantité diminue de 5 L à chaque étape.",
    explanation: exp(
      "Une suite peut représenter une quantité qui diminue.",
      "On cherche ce qu’on enlève à chaque étape.",
      "50 ; 45 ; 40 ; 35 : on enlève 5. Donc 35 - 5 = 30.",
      "Il restera 30 L."
    ),
    canvas: suiteCanvas({
      theme: "eau",
      titre: "Réserve d’eau",
      terms: [50, 45, 40, 35, "?"],
      missingIndex: 4,
      arrows: ["-5", "-5", "-5", "-5"],
      rule: "On enlève 5 L à chaque étape.",
      phrase: "Une suite peut aussi diminuer régulièrement.",
      display: {
        showRule: false,
      },
    }),
    tags: ["cm2", "suite", "defi", "reunion", "eau", "decroissante", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm2_suite_defi_fixed_5_multiplicatif_pieces",
    niveau: "cm2",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Dans un jeu, un coffre donne 2 pièces, puis 4 pièces, puis 8 pièces, puis 16 pièces. Si la règle continue, combien de pièces donne le coffre suivant ?",
    format: "short",
    expected: ["32"],
    comparator: "number_equal",
    hint: "Cette suite ne fait pas +2 à chaque fois : elle double.",
    explanation: exp(
      "Certaines suites ne se construisent pas par addition.",
      "On cherche si on multiplie par le même nombre.",
      "2 ; 4 ; 8 ; 16 : on multiplie par 2. Donc 16 × 2 = 32.",
      "Le coffre suivant donne 32 pièces."
    ),
    canvas: suiteCanvas({
      theme: "pieces",
      titre: "Défi : le coffre double",
      terms: [2, 4, 8, 16, "?"],
      missingIndex: 4,
      arrows: ["×2", "×2", "×2", "×2"],
      rule: "On multiplie par 2 à chaque fois.",
      phrase: "Attention : ici, la règle est une multiplication.",
      display: {
        showRule: false,
      },
    }),
    tags: ["cm2", "suite", "defi", "multiplication", "pieces", "piege", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm2_suite_defi_fixed_6_requin",
    niveau: "cm2",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Dans un jeu d’observation marine, on repère 1 requin, puis 3, puis 5, puis 7. Si la suite continue, quel est le nombre suivant ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "On ajoute 2 à chaque étape.",
    explanation: exp(
      "Une suite peut être construite avec un contexte de jeu ou de nature.",
      "On cherche l’écart entre deux valeurs successives.",
      "1 ; 3 ; 5 ; 7 : on ajoute 2. Donc 7 + 2 = 9.",
      "Le nombre suivant est 9."
    ),
    canvas: suiteCanvas({
      theme: "requin",
      titre: "Observation marine",
      terms: [1, 3, 5, 7, "?"],
      missingIndex: 4,
      arrows: ["+2", "+2", "+2", "+2"],
      rule: "On ajoute 2 à chaque étape.",
      phrase: "La suite représente une progression dans un jeu d’observation.",
      display: {
        showRule: false,
      },
    }),
    tags: ["cm2", "suite", "defi", "reunion", "requin", "canvas"],
  },

  {
    kind: "template",
    id: "cm2_suite_defi_tpl_1_reunion_dechets",
    niveau: "cm2",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_defi",
    difficulty: 4,
    theme: "reunion",
    hint: "Transforme l’histoire en suite de nombres.",
    tags: ["cm2", "suite", "defi", "reunion", "dechet", "template", "canvas"],
    generate: () => {
      const step = randomChoice([3, 4, 5, 10]);
      const start = step;
      const terms = [start, start + step, start + 2 * step, start + 3 * step];
      const next = start + 4 * step;

      return {
        text: `Pendant une sortie nature, les élèves ramassent ${terms[0]}, puis ${terms[1]}, puis ${terms[2]}, puis ${terms[3]} déchets. Si la règle continue, combien ramassent-ils ensuite ?`,
        format: "short",
        expected: [String(next)],
        comparator: "number_equal",
        explanation: exp(
          "Une suite peut représenter une situation réelle.",
          "On cherche l’écart entre deux valeurs successives.",
          `On ajoute ${step} à chaque fois : ${terms[3]} + ${step} = ${next}.`,
          `Ils ramassent ensuite ${next} déchets.`
        ),
        canvas: suiteCanvas({
          theme: "dechet",
          titre: "Ramassage de déchets",
          terms: [...terms, "?"],
          missingIndex: 4,
          arrows: [`+${step}`, `+${step}`, `+${step}`, `+${step}`],
          rule: `On ajoute ${step} déchets.`,
          phrase: "Une situation d’écologie peut se modéliser par une suite.",
          display: {
            showRule: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_suite_defi_tpl_2_piege_multiplicatif",
    niveau: "cm2",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Attention : ce n’est pas toujours +2 ou +5.",
    tags: ["cm2", "suite", "defi", "piege", "multiplication", "template", "canvas"],
    generate: () => {
      const start = randomChoice([2, 3, 4]);
      const terms = [start, start * 2, start * 4, start * 8];
      const next = start * 16;

      return {
        text: `Défi : continue la suite ${terms.join(" ; ")} ; ?`,
        format: "short",
        expected: [String(next)],
        comparator: "number_equal",
        explanation: exp(
          "Certaines suites ne se construisent pas par addition.",
          "On cherche si on multiplie à chaque étape.",
          `Ici, on multiplie par 2 à chaque fois : ${terms[3]} × 2 = ${next}.`,
          `Le nombre suivant est ${next}.`
        ),
        canvas: suiteCanvas({
          theme: randomChoice(["nombre", "pieces", "jeu_video"]),
          titre: "Défi : suite multiplicative",
          terms: [...terms, "?"],
          missingIndex: 4,
          arrows: ["×2", "×2", "×2", "×2"],
          rule: "On multiplie par 2 à chaque fois.",
          phrase: "Le piège : la suite ne progresse pas par addition.",
          display: {
            showRule: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_suite_defi_tpl_3_sentier",
    niveau: "cm2",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_defi",
    difficulty: 3,
    theme: "reunion",
    hint: "Chaque balise est espacée de la même distance.",
    tags: ["cm2", "suite", "defi", "reunion", "sentier", "template", "canvas"],
    generate: () => {
      const step = randomChoice([5, 10, 20, 25]);
      const terms = [step, 2 * step, 3 * step, 4 * step];
      const next = 5 * step;

      return {
        text: `Sur un sentier, des balises sont placées à ${terms[0]} m, ${terms[1]} m, ${terms[2]} m et ${terms[3]} m. Où sera la balise suivante ?`,
        format: "short",
        expected: [String(next)],
        comparator: "number_equal",
        explanation: exp(
          "Une suite peut représenter des positions espacées régulièrement.",
          "On cherche l’écart entre deux positions successives.",
          `Les balises sont espacées de ${step} m. Donc ${terms[3]} + ${step} = ${next}.`,
          `La balise suivante sera à ${next} m.`
        ),
        canvas: suiteCanvas({
          theme: "nombre",
          titre: "Balises sur un sentier",
          terms: [...terms, "?"],
          missingIndex: 4,
          arrows: [`+${step}`, `+${step}`, `+${step}`, `+${step}`],
          rule: `On ajoute ${step} m.`,
          phrase: "La suite représente des distances sur un sentier.",
          display: {
            showRule: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_suite_defi_tpl_4_eau_decroissante",
    niveau: "cm2",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_defi",
    difficulty: 4,
    theme: "reunion",
    hint: "La quantité d’eau diminue régulièrement.",
    tags: ["cm2", "suite", "defi", "reunion", "eau", "decroissante", "template", "canvas"],
    generate: () => {
      const step = randomChoice([2, 3, 5, 10]);
      const next = randomInt(10, 30);
      const terms = [
        next + 4 * step,
        next + 3 * step,
        next + 2 * step,
        next + step,
      ];

      return {
        text: `Une réserve d’eau contient ${terms[0]} L, puis ${terms[1]} L, puis ${terms[2]} L, puis ${terms[3]} L. Si la suite continue, combien restera-t-il de litres ?`,
        format: "short",
        expected: [String(next)],
        comparator: "number_equal",
        explanation: exp(
          "Une suite peut représenter une quantité qui diminue régulièrement.",
          "On cherche ce qu’on enlève à chaque étape.",
          `On enlève ${step} L à chaque fois : ${terms[3]} - ${step} = ${next}.`,
          `Il restera ${next} L.`
        ),
        canvas: suiteCanvas({
          theme: "eau",
          titre: "Réserve d’eau",
          terms: [...terms, "?"],
          missingIndex: 4,
          arrows: [`-${step}`, `-${step}`, `-${step}`, `-${step}`],
          rule: `On enlève ${step} L.`,
          phrase: "Le contexte permet de comprendre que la suite diminue.",
          display: {
            showRule: false,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_suite_defi_tpl_5_alternance",
    niveau: "cm2",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Observe si deux règles alternent.",
    tags: ["cm2", "suite", "defi", "alternance", "piege", "template", "canvas"],
    generate: () => {
      const start = randomChoice([2, 3, 4, 5]);
      const add = randomChoice([3, 4, 5]);
      const sub = randomChoice([1, 2]);

      const t1 = start;
      const t2 = t1 + add;
      const t3 = t2 - sub;
      const t4 = t3 + add;
      const t5 = t4 - sub;

      return {
        text: `Défi : continue la suite ${t1} ; ${t2} ; ${t3} ; ${t4} ; ?`,
        format: "short",
        expected: [String(t5)],
        comparator: "number_equal",
        explanation: exp(
          "Certaines suites utilisent deux règles qui alternent.",
          "On observe les passages successifs.",
          `On fait +${add}, puis -${sub}, puis +${add}. Il faut donc faire -${sub}.`,
          `Le nombre suivant est ${t5}.`
        ),
        canvas: suiteCanvas({
          theme: "nombre",
          titre: "Défi : règle alternée",
          terms: [t1, t2, t3, t4, "?"],
          missingIndex: 4,
          arrows: [`+${add}`, `-${sub}`, `+${add}`, `-${sub}`],
          rule: `On alterne +${add} puis -${sub}.`,
          phrase: "Défi : la règle change une fois sur deux.",
          display: {
            showRule: false,
          },
        }),
      };
    },
  },
];