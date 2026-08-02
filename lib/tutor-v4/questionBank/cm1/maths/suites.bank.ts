// lib/tutor-v4/question-banks/maths/cm1/suites.bank.ts

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
  return shuffle(Array.from(new Set([correct, ...wrongs]))).slice(0, 4);
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
  {
    kind: "fixed",
    id: "cm1_suite_continuer_fixed_g1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_continuer",
    difficulty: 1,
    theme: "neutral",
    text: "Continue la suite : 3 ; 6 ; 9 ; 12 ; ?",
    format: "qcm",
    choices: ["15","13","18","14"],
    expected: ["15"],
    comparator: "mcq_exact",
    hint: "On ajoute toujours le même nombre.",
    explanation: "On ajoute 3 à chaque fois : 12 + 3 = 15. Le nombre suivant est 15.",
    tags: ["cm1","suite","suite_continuer","guide","qcm"],
  },
  {
    kind: "fixed",
    id: "cm1_suite_continuer_fixed_g2",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_continuer",
    difficulty: 1,
    theme: "neutral",
    text: "Continue la suite : 10 ; 20 ; 30 ; ?",
    format: "qcm",
    choices: ["40","31","50","35"],
    expected: ["40"],
    comparator: "mcq_exact",
    hint: "Regarde l'écart entre deux nombres voisins.",
    explanation: "On ajoute 10 à chaque fois : 30 + 10 = 40.",
    tags: ["cm1","suite","suite_continuer","guide","qcm"],
  },
  {
    kind: "fixed",
    id: "cm1_suite_regle_fixed_g1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_regle",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la règle de la suite 4 ; 8 ; 12 ; 16 ?",
    format: "qcm",
    choices: ["on ajoute 4","on ajoute 8","on multiplie par 2","on enlève 4"],
    expected: ["on ajoute 4"],
    comparator: "mcq_exact",
    hint: "Calcule un écart : le nombre suivant moins le précédent.",
    explanation: "8 − 4 = 4 : l'écart est toujours 4. La règle est « ajouter 4 ».",
    tags: ["cm1","suite","suite_regle","guide","qcm"],
  },
  {
    kind: "fixed",
    id: "cm1_suite_croissante_decroissante_fixed_g1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_croissante_decroissante",
    difficulty: 2,
    theme: "neutral",
    text: "La suite 30 ; 25 ; 20 ; 15 est...",
    format: "qcm",
    choices: ["décroissante","croissante","constante","au hasard"],
    expected: ["décroissante"],
    comparator: "mcq_exact",
    hint: "Regarde si les nombres montent ou descendent.",
    explanation: "Les nombres descendent (on enlève 5 à chaque fois) : la suite est décroissante.",
    tags: ["cm1","suite","suite_croissante_decroissante","guide","qcm"],
  },
  {
    kind: "fixed",
    id: "cm1_suite_defi_fixed_g1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_defi",
    difficulty: 3,
    theme: "reunion",
    text: "Sur un sentier de La Réunion, une balise est posée tous les 5 m : 5 ; 10 ; 15 ; 20. À combien de mètres sera la 6e balise ?",
    format: "qcm",
    choices: ["30 m","25 m","35 m","26 m"],
    expected: ["30 m"],
    comparator: "mcq_exact",
    hint: "Continue à ajouter 5.",
    explanation: "On ajoute 5 à chaque balise : la 5e est à 25 m, la 6e à 30 m.",
    tags: ["cm1","suite","suite_defi","guide","qcm"],
  },

  // ============================================================
  // SUITE_CONTINUER
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_suite_continuer_fixed_1_plus_2",
    niveau: "cm1",
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
    tags: ["cm1", "suite", "continuer", "addition", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_suite_continuer_fixed_2_plus_5",
    niveau: "cm1",
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
    tags: ["cm1", "suite", "continuer", "addition", "pieces", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_suite_continuer_fixed_3_plus_10",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_continuer",
    difficulty: 1,
    theme: "neutral",
    text: "Continue la suite : 10 ; 20 ; 30 ; 40 ; ?",
    format: "short",
    expected: ["50"],
    comparator: "number_equal",
    hint: "On avance de dizaine en dizaine.",
    explanation: exp(
      "Une suite peut avancer de 10 en 10.",
      "On cherche l’écart entre deux nombres voisins.",
      "10 ; 20 ; 30 ; 40 : on ajoute 10. Donc 40 + 10 = 50.",
      "Le nombre suivant est 50."
    ),
    canvas: suiteCanvas({
      theme: "nombre",
      titre: "Suite de dizaines",
      terms: [10, 20, 30, 40, "?"],
      missingIndex: 4,
      arrows: ["+10", "+10", "+10", "+10"],
      rule: "On ajoute 10 à chaque fois.",
      phrase: "Les nombres augmentent de 10 en 10.",
    }),
    tags: ["cm1", "suite", "continuer", "dizaines", "addition", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_suite_continuer_fixed_4_moins_3",
    niveau: "cm1",
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
      "On cherche l’écart entre deux termes voisins.",
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
    tags: ["cm1", "suite", "continuer", "soustraction", "eau", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_suite_continuer_fixed_5_moins_5",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_continuer",
    difficulty: 2,
    theme: "neutral",
    text: "Continue la suite : 50 ; 45 ; 40 ; 35 ; ?",
    format: "short",
    expected: ["30"],
    comparator: "number_equal",
    hint: "On enlève 5 à chaque fois.",
    explanation: exp(
      "Une suite décroissante diminue régulièrement.",
      "On cherche ce qu’on enlève à chaque étape.",
      "50 ; 45 ; 40 ; 35 : on enlève 5. Donc 35 - 5 = 30.",
      "Le nombre suivant est 30."
    ),
    canvas: suiteCanvas({
      theme: "eau",
      titre: "Suite qui diminue",
      terms: [50, 45, 40, 35, "?"],
      missingIndex: 4,
      arrows: ["-5", "-5", "-5", "-5"],
      rule: "On enlève 5 à chaque fois.",
      phrase: "La quantité baisse régulièrement.",
    }),
    tags: ["cm1", "suite", "continuer", "soustraction", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_suite_continuer_fixed_6_terme_manquant_plus_5",
    niveau: "cm1",
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
    tags: ["cm1", "suite", "continuer", "terme_manquant", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_suite_continuer_fixed_7_terme_manquant_plus_10",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_continuer",
    difficulty: 2,
    theme: "neutral",
    text: "Complète la suite : 20 ; 30 ; ? ; 50 ; 60",
    format: "short",
    expected: ["40"],
    comparator: "number_equal",
    hint: "On ajoute 10 à chaque fois.",
    explanation: exp(
      "Un terme manquant doit garder la régularité de la suite.",
      "On repère l’écart entre deux termes voisins.",
      "20 ; 30 ; 40 ; 50 ; 60 : on ajoute 10 à chaque fois.",
      "Le nombre manquant est 40."
    ),
    canvas: suiteCanvas({
      theme: "nombre",
      titre: "Nombre manquant",
      terms: [20, 30, "?", 50, 60],
      missingIndex: 2,
      arrows: ["+10", "+10", "+10", "+10"],
      rule: "On ajoute 10 à chaque fois.",
      phrase: "Le trou doit garder la même règle.",
    }),
    tags: ["cm1", "suite", "continuer", "terme_manquant", "dizaines", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_suite_continuer_fixed_8_margouillats",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_continuer",
    difficulty: 1,
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
    }),
    tags: ["cm1", "suite", "continuer", "reunion", "margouillat", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_suite_continuer_fixed_9_pieces_jeu",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_continuer",
    difficulty: 2,
    theme: "jeux_video",
    text: "Dans un jeu, on gagne 10 pièces, puis 20 pièces, puis 30 pièces, puis 40 pièces. Si la suite continue, combien gagne-t-on ensuite ?",
    format: "short",
    expected: ["50"],
    comparator: "number_equal",
    hint: "On ajoute 10 pièces à chaque étape.",
    explanation: exp(
      "Une suite peut représenter une progression dans un jeu.",
      "On cherche l’écart entre deux valeurs successives.",
      "10 ; 20 ; 30 ; 40 : on ajoute 10. Donc 40 + 10 = 50.",
      "On gagne ensuite 50 pièces."
    ),
    canvas: suiteCanvas({
      theme: "pieces",
      titre: "Suite de pièces",
      terms: [10, 20, 30, 40, "?"],
      missingIndex: 4,
      arrows: ["+10", "+10", "+10", "+10"],
      rule: "On ajoute 10 pièces.",
      phrase: "La récompense augmente régulièrement.",
    }),
    tags: ["cm1", "suite", "continuer", "jeu_video", "pieces", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_suite_continuer_fixed_10_dechets",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_continuer",
    difficulty: 2,
    theme: "reunion",
    text: "Pendant une sortie nature, les élèves ramassent 3 déchets, puis 6, puis 9, puis 12. Si la suite continue, combien ramassent-ils ensuite ?",
    format: "short",
    expected: ["15"],
    comparator: "number_equal",
    hint: "On ajoute 3 déchets à chaque fois.",
    explanation: exp(
      "Une suite peut représenter une situation réelle.",
      "On cherche l’écart entre deux valeurs successives.",
      "3 ; 6 ; 9 ; 12 : on ajoute 3. Donc 12 + 3 = 15.",
      "Ils ramassent ensuite 15 déchets."
    ),
    canvas: suiteCanvas({
      theme: "dechet",
      titre: "Ramassage de déchets",
      terms: [3, 6, 9, 12, "?"],
      missingIndex: 4,
      arrows: ["+3", "+3", "+3", "+3"],
      rule: "On ajoute 3 déchets.",
      phrase: "Une situation d’écologie peut former une suite.",
    }),
    tags: ["cm1", "suite", "continuer", "reunion", "dechet", "canvas"],
  },

  {
    kind: "template",
    id: "cm1_suite_continuer_tpl_1_addition",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_continuer",
    difficulty: 2,
    theme: "neutral",
    hint: "Trouve ce qu’on ajoute à chaque étape.",
    tags: ["cm1", "suite", "continuer", "addition", "template", "canvas"],
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
    id: "cm1_suite_continuer_tpl_2_soustraction",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_continuer",
    difficulty: 2,
    theme: "neutral",
    hint: "La suite diminue : cherche ce qu’on enlève.",
    tags: ["cm1", "suite", "continuer", "soustraction", "template", "canvas"],
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
    id: "cm1_suite_continuer_tpl_3_terme_manquant",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_continuer",
    difficulty: 3,
    theme: "neutral",
    hint: "Utilise les nombres avant et après le trou.",
    tags: ["cm1", "suite", "continuer", "terme_manquant", "template", "canvas"],
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
    // ============================================================
  // SUITE_REGLE
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_suite_regle_fixed_1_plus_3",
    niveau: "cm1",
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
    tags: ["cm1", "suite", "regle", "addition", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_suite_regle_fixed_2_plus_5",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_regle",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la règle de la suite : 5 ; 10 ; 15 ; 20 ?",
    format: "qcm",
    choices: [
      "ajouter 5",
      "ajouter 10",
      "enlever 5",
      "multiplier par 5",
    ],
    expected: ["ajouter 5"],
    comparator: "mcq_exact",
    hint: "Regarde l’écart entre 5 et 10.",
    explanation: exp(
      "Une règle de suite doit fonctionner entre tous les termes voisins.",
      "On observe ce qui change d’un nombre au suivant.",
      "5 → 10 : on ajoute 5. 10 → 15 : on ajoute encore 5.",
      "La règle est : ajouter 5."
    ),
    canvas: suiteCanvas({
      theme: "pieces",
      titre: "Trouver la règle",
      terms: [5, 10, 15, 20],
      arrows: ["+5", "+5", "+5"],
      rule: "On ajoute 5 à chaque fois.",
      phrase: "Les pièces augmentent régulièrement.",
      display: {
        showRule: false,
      },
    }),
    tags: ["cm1", "suite", "regle", "addition", "pieces", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_suite_regle_fixed_3_moins_5",
    niveau: "cm1",
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
    tags: ["cm1", "suite", "regle", "soustraction", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_suite_regle_fixed_4_moins_10",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_regle",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la règle de la suite : 100 ; 90 ; 80 ; 70 ?",
    format: "qcm",
    choices: [
      "enlever 10",
      "ajouter 10",
      "enlever 5",
      "multiplier par 10",
    ],
    expected: ["enlever 10"],
    comparator: "mcq_exact",
    hint: "La suite descend de dizaine en dizaine.",
    explanation: exp(
      "Une suite peut diminuer avec un écart régulier.",
      "On regarde la différence entre deux nombres voisins.",
      "100 - 90 = 10, 90 - 80 = 10, 80 - 70 = 10.",
      "La règle est : enlever 10."
    ),
    canvas: suiteCanvas({
      theme: "nombre",
      titre: "Règle décroissante",
      terms: [100, 90, 80, 70],
      arrows: ["-10", "-10", "-10"],
      rule: "On enlève 10 à chaque fois.",
      phrase: "La suite descend régulièrement.",
      display: {
        showRule: false,
      },
    }),
    tags: ["cm1", "suite", "regle", "soustraction", "dizaines", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_suite_regle_fixed_5_fois_2",
    niveau: "cm1",
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
    tags: ["cm1", "suite", "regle", "multiplication", "qcm", "piege", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_suite_regle_fixed_6_fois_3",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_regle",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la règle de la suite : 3 ; 9 ; 27 ; 81 ?",
    format: "qcm",
    choices: [
      "multiplier par 3",
      "ajouter 3",
      "multiplier par 2",
      "ajouter 9",
    ],
    expected: ["multiplier par 3"],
    comparator: "mcq_exact",
    hint: "Regarde le passage de 3 à 9, puis de 9 à 27.",
    explanation: exp(
      "Certaines suites utilisent une multiplication répétée.",
      "On vérifie le passage d’un terme au suivant.",
      "3 × 3 = 9, 9 × 3 = 27, 27 × 3 = 81.",
      "La règle est : multiplier par 3."
    ),
    canvas: suiteCanvas({
      theme: "jeu_video",
      titre: "Suite multiplicative",
      terms: [3, 9, 27, 81],
      arrows: ["×3", "×3", "×3"],
      rule: "On multiplie par 3 à chaque fois.",
      phrase: "Attention : ici, on multiplie.",
      display: {
        showRule: false,
      },
    }),
    tags: ["cm1", "suite", "regle", "multiplication", "jeu_video", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_suite_regle_fixed_7_piege_non_reguliere",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_regle",
    difficulty: 3,
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
    tags: ["cm1", "suite", "regle", "piege", "non_reguliere", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_suite_regle_fixed_8_piege_multiplication",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_regle",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : « Dans la suite 10 ; 20 ; 40 ; 80, on ajoute toujours 10. » A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Compare 20 → 40 et 40 → 80.",
    explanation: exp(
      "Il faut vérifier une règle sur toute la suite.",
      "On observe chaque passage entre deux termes voisins.",
      "10 → 20 peut faire +10, mais 20 → 40 ne fait pas +10.",
      "L’élève a tort : ici, on multiplie par 2."
    ),
    canvas: suiteCanvas({
      theme: "pieces",
      titre: "Piège : addition ou multiplication ?",
      terms: [10, 20, 40, 80],
      arrows: ["×2", "×2", "×2"],
      rule: "On multiplie par 2.",
      phrase: "Une règle doit fonctionner partout.",
      display: {
        showRule: false,
      },
    }),
    tags: ["cm1", "suite", "regle", "piege", "multiplication", "qcm", "canvas"],
  },

  {
    kind: "template",
    id: "cm1_suite_regle_tpl_1_addition",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_regle",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche l’écart entre deux nombres voisins.",
    tags: ["cm1", "suite", "regle", "addition", "template", "canvas"],
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
    id: "cm1_suite_regle_tpl_2_soustraction",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_regle",
    difficulty: 2,
    theme: "neutral",
    hint: "Observe si la suite monte ou descend.",
    tags: ["cm1", "suite", "regle", "soustraction", "template", "canvas"],
    generate: () => {
      const step = randomChoice([2, 3, 4, 5, 6, 10]);
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
    id: "cm1_suite_regle_tpl_3_multiplication",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_regle",
    difficulty: 3,
    theme: "neutral",
    hint: "Essaie de voir si on multiplie par le même nombre.",
    tags: ["cm1", "suite", "regle", "multiplication", "template", "canvas"],
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
    id: "cm1_suite_regle_tpl_4_piege_ecarts_variables",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_regle",
    difficulty: 3,
    theme: "neutral",
    hint: "Vérifie tous les passages, pas seulement le premier.",
    tags: ["cm1", "suite", "regle", "piege", "ecarts_variables", "template", "canvas"],
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
    id: "cm1_suite_croissante_fixed_1",
    niveau: "cm1",
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
    tags: ["cm1", "suite", "croissante", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_suite_croissante_fixed_2",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_croissante_decroissante",
    difficulty: 1,
    theme: "neutral",
    text: "La suite 10 ; 20 ; 30 ; 40 est-elle croissante ou décroissante ?",
    format: "qcm",
    choices: ["croissante", "décroissante", "ni l’une ni l’autre"],
    expected: ["croissante"],
    comparator: "mcq_exact",
    hint: "Les nombres augmentent de 10 en 10.",
    explanation: exp(
      "Une suite est croissante quand les nombres augmentent dans l’ordre.",
      "On compare chaque nombre avec le suivant.",
      "10 < 20 < 30 < 40.",
      "La suite est croissante."
    ),
    canvas: suiteCanvas({
      theme: "pieces",
      titre: "Suite croissante",
      terms: [10, 20, 30, 40],
      arrows: ["+10", "+10", "+10"],
      rule: "Les nombres augmentent.",
      phrase: "Les valeurs deviennent plus grandes.",
      display: {
        showRule: false,
      },
    }),
    tags: ["cm1", "suite", "croissante", "pieces", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_suite_decroissante_fixed_1",
    niveau: "cm1",
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
    tags: ["cm1", "suite", "decroissante", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_suite_decroissante_fixed_2",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_croissante_decroissante",
    difficulty: 1,
    theme: "neutral",
    text: "La suite 100 ; 90 ; 80 ; 70 est-elle croissante ou décroissante ?",
    format: "qcm",
    choices: ["croissante", "décroissante", "ni l’une ni l’autre"],
    expected: ["décroissante"],
    comparator: "mcq_exact",
    hint: "La suite descend de 10 en 10.",
    explanation: exp(
      "Une suite est décroissante quand les nombres diminuent dans l’ordre.",
      "On observe les nombres un par un.",
      "100 > 90 > 80 > 70.",
      "La suite est décroissante."
    ),
    canvas: suiteCanvas({
      theme: "nombre",
      titre: "Suite décroissante",
      terms: [100, 90, 80, 70],
      arrows: ["-10", "-10", "-10"],
      rule: "Les nombres diminuent.",
      phrase: "Les valeurs deviennent plus petites.",
      display: {
        showRule: false,
      },
    }),
    tags: ["cm1", "suite", "decroissante", "dizaines", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_suite_constante_fixed_1",
    niveau: "cm1",
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
      "Au niveau CM1, on distingue les suites qui montent, qui descendent, ou qui ne font pas clairement l’un des deux.",
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
    tags: ["cm1", "suite", "constante", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_suite_constante_fixed_2",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_croissante_decroissante",
    difficulty: 2,
    theme: "neutral",
    text: "La suite 12 ; 12 ; 12 ; 12 est-elle croissante ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Les nombres ne montent pas.",
    explanation: exp(
      "Une suite croissante augmente quand on avance.",
      "On vérifie si les nombres deviennent plus grands.",
      "12 ; 12 ; 12 ; 12 : les nombres restent identiques.",
      "La suite n’est pas croissante au sens attendu ici."
    ),
    canvas: suiteCanvas({
      theme: "nombre",
      titre: "Suite constante",
      terms: [12, 12, 12, 12],
      arrows: ["+0", "+0", "+0"],
      rule: "Les nombres ne changent pas.",
      phrase: "Attention : rester identique n’est pas augmenter.",
      display: {
        showRule: false,
      },
    }),
    tags: ["cm1", "suite", "constante", "croissante", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_suite_ni_croissante_ni_decroissante_fixed_1",
    niveau: "cm1",
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
    tags: ["cm1", "suite", "croissante", "decroissante", "piege", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_suite_ni_croissante_ni_decroissante_fixed_2",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_croissante_decroissante",
    difficulty: 2,
    theme: "neutral",
    text: "La suite 5 ; 9 ; 7 ; 11 est-elle décroissante ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Elle ne descend pas tout le temps.",
    explanation: exp(
      "Une suite décroissante doit diminuer à chaque étape.",
      "On vérifie tous les passages entre deux termes voisins.",
      "5 à 9 augmente, donc la suite ne descend pas tout le temps.",
      "La suite n’est pas décroissante."
    ),
    canvas: suiteCanvas({
      theme: "nombre",
      titre: "Vérifier tous les passages",
      terms: [5, 9, 7, 11],
      arrows: ["+4", "-2", "+4"],
      rule: "La direction change.",
      phrase: "Il faut tout vérifier, pas seulement une partie de la suite.",
      display: {
        showRule: false,
      },
    }),
    tags: ["cm1", "suite", "decroissante", "piege", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_suite_croissante_margouillats_fixed_1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_croissante_decroissante",
    difficulty: 1,
    theme: "reunion",
    text: "La suite 2 ; 4 ; 6 ; 8 margouillats est-elle croissante ou décroissante ?",
    format: "qcm",
    choices: ["croissante", "décroissante", "ni l’une ni l’autre"],
    expected: ["croissante"],
    comparator: "mcq_exact",
    hint: "On observe de plus en plus de margouillats.",
    explanation: exp(
      "Une suite est croissante quand les nombres augmentent.",
      "On compare les nombres dans l’ordre.",
      "2 < 4 < 6 < 8.",
      "La suite est croissante."
    ),
    canvas: suiteCanvas({
      theme: "margouillat",
      titre: "Suite de margouillats",
      terms: [2, 4, 6, 8],
      arrows: ["+2", "+2", "+2"],
      rule: "Les nombres augmentent.",
      phrase: "On observe de plus en plus de margouillats.",
      display: {
        showRule: false,
      },
    }),
    tags: ["cm1", "suite", "croissante", "reunion", "margouillat", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_suite_decroissante_eau_fixed_1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_croissante_decroissante",
    difficulty: 1,
    theme: "reunion",
    text: "La suite 50 ; 45 ; 40 ; 35 litres est-elle croissante ou décroissante ?",
    format: "qcm",
    choices: ["croissante", "décroissante", "ni l’une ni l’autre"],
    expected: ["décroissante"],
    comparator: "mcq_exact",
    hint: "La quantité d’eau diminue.",
    explanation: exp(
      "Une suite est décroissante quand les nombres diminuent.",
      "On compare les valeurs dans l’ordre.",
      "50 > 45 > 40 > 35.",
      "La suite est décroissante."
    ),
    canvas: suiteCanvas({
      theme: "eau",
      titre: "Réserve d’eau",
      terms: [50, 45, 40, 35],
      arrows: ["-5", "-5", "-5"],
      rule: "Les nombres diminuent.",
      phrase: "La quantité d’eau baisse régulièrement.",
      display: {
        showRule: false,
      },
    }),
    tags: ["cm1", "suite", "decroissante", "reunion", "eau", "qcm", "canvas"],
  },

  {
    kind: "template",
    id: "cm1_suite_croissante_decroissante_tpl_1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_croissante_decroissante",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde si les nombres montent ou descendent.",
    tags: ["cm1", "suite", "croissante_decroissante", "template", "canvas"],
    generate: () => {
      const kind = randomChoice(["croissante", "décroissante"] as const);
      const start = randomInt(2, 30);
      const step = randomChoice([2, 3, 4, 5, 10]);

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
    id: "cm1_suite_croissante_decroissante_tpl_2_constante",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_croissante_decroissante",
    difficulty: 2,
    theme: "neutral",
    hint: "Les nombres ne changent pas.",
    tags: ["cm1", "suite", "constante", "template", "canvas"],
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
    id: "cm1_suite_croissante_decroissante_tpl_3_piege_monte_descend",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_croissante_decroissante",
    difficulty: 3,
    theme: "neutral",
    hint: "Vérifie tous les passages.",
    tags: ["cm1", "suite", "croissante_decroissante", "piege", "template", "canvas"],
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
    // ============================================================
  // SUITE_DEFI
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_suite_defi_fixed_1_sentier",
    niveau: "cm1",
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
    tags: ["cm1", "suite", "defi", "reunion", "sentier", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_suite_defi_fixed_2_jeu_video",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_defi",
    difficulty: 3,
    theme: "jeux_video",
    text: "Un jeu donne 10 pièces au niveau 1, 20 pièces au niveau 2, 30 pièces au niveau 3. Combien de pièces au niveau 4 si la règle continue ?",
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
      titre: "Récompenses de jeu",
      terms: [10, 20, 30, "?"],
      missingIndex: 3,
      arrows: ["+10", "+10", "+10"],
      rule: "On ajoute 10 pièces à chaque niveau.",
      phrase: "Le score peut suivre une suite régulière.",
      display: {
        showRule: false,
      },
    }),
    tags: ["cm1", "suite", "defi", "jeu_video", "pieces", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_suite_defi_fixed_3_margouillats",
    niveau: "cm1",
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
    tags: ["cm1", "suite", "defi", "reunion", "margouillat", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_suite_defi_fixed_4_eau_decroissante",
    niveau: "cm1",
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
    tags: ["cm1", "suite", "defi", "reunion", "eau", "decroissante", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_suite_defi_fixed_5_nombre_manquant",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Trouve le nombre manquant : 6 ; 12 ; ? ; 24 ; 30",
    format: "short",
    expected: ["18"],
    comparator: "number_equal",
    hint: "La suite avance de 6 en 6.",
    explanation: exp(
      "Un défi de suite peut demander de trouver un nombre au milieu.",
      "On cherche la règle entre les termes voisins.",
      "6 ; 12 ; 18 ; 24 ; 30 : on ajoute 6 à chaque fois.",
      "Le nombre manquant est 18."
    ),
    canvas: suiteCanvas({
      theme: "nombre",
      titre: "Nombre manquant",
      terms: [6, 12, "?", 24, 30],
      missingIndex: 2,
      arrows: ["+6", "+6", "+6", "+6"],
      rule: "On ajoute 6 à chaque fois.",
      phrase: "Le nombre manquant doit respecter la règle.",
      display: {
        showRule: false,
      },
    }),
    tags: ["cm1", "suite", "defi", "nombre_manquant", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_suite_defi_fixed_6_piege_multiplicatif",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Défi : continue la suite 3 ; 6 ; 12 ; 24 ; ?",
    format: "short",
    expected: ["48"],
    comparator: "number_equal",
    hint: "Attention : on ne fait pas +3 à chaque fois.",
    explanation: exp(
      "Certaines suites ne se construisent pas par addition.",
      "On cherche si on multiplie à chaque étape.",
      "3 × 2 = 6, 6 × 2 = 12, 12 × 2 = 24. Donc 24 × 2 = 48.",
      "Le nombre suivant est 48."
    ),
    canvas: suiteCanvas({
      theme: "pieces",
      titre: "Défi : suite multiplicative",
      terms: [3, 6, 12, 24, "?"],
      missingIndex: 4,
      arrows: ["×2", "×2", "×2", "×2"],
      rule: "On multiplie par 2 à chaque fois.",
      phrase: "Le piège : la suite ne progresse pas par addition.",
      display: {
        showRule: false,
      },
    }),
    tags: ["cm1", "suite", "defi", "multiplication", "piege", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_suite_defi_fixed_7_piege_regle_fausse",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : « Dans la suite 2 ; 4 ; 8 ; 16, on ajoute toujours 2. » A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Vérifie le passage de 4 à 8.",
    explanation: exp(
      "Pour vérifier une règle, il faut tester tous les passages.",
      "On compare chaque terme avec le suivant.",
      "2 à 4 peut faire +2, mais 4 à 8 ne fait pas +2.",
      "L’élève a tort : ici, on multiplie par 2."
    ),
    canvas: suiteCanvas({
      theme: "nombre",
      titre: "Attention à la règle",
      terms: [2, 4, 8, 16],
      arrows: ["×2", "×2", "×2"],
      rule: "On multiplie par 2.",
      phrase: "Une règle doit fonctionner partout.",
      display: {
        showRule: false,
      },
    }),
    tags: ["cm1", "suite", "defi", "erreur", "multiplication", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_suite_defi_fixed_8_aller_retour",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Sur un sentier, des panneaux sont placés tous les 10 m : 10 m, 20 m, 30 m, 40 m. Si on va jusqu’au panneau suivant puis on revient au départ, quelle distance parcourt-on au total ?",
    format: "short",
    expected: ["100"],
    comparator: "number_equal",
    hint: "Trouve d’abord la position du panneau suivant, puis pense à l’aller-retour.",
    explanation: exp(
      "Un défi peut mélanger une suite et un petit problème.",
      "On trouve d’abord le terme suivant, puis on calcule l’aller-retour.",
      "La suite ajoute 10 : après 40 m, le panneau suivant est à 50 m. Aller-retour : 50 + 50 = 100 m.",
      "On parcourt 100 m au total."
    ),
    canvas: suiteCanvas({
      theme: "nombre",
      titre: "Balises sur un sentier",
      terms: [10, 20, 30, 40, "?"],
      missingIndex: 4,
      arrows: ["+10", "+10", "+10", "+10"],
      rule: "On ajoute 10 m.",
      phrase: "Trouve le panneau suivant, puis pense au retour.",
      display: {
        showRule: false,
      },
    }),
    tags: ["cm1", "suite", "defi", "reunion", "sentier", "probleme", "canvas"],
  },

  {
    kind: "template",
    id: "cm1_suite_defi_tpl_1_reunion_dechets",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_defi",
    difficulty: 3,
    theme: "reunion",
    hint: "Transforme l’histoire en suite de nombres.",
    tags: ["cm1", "suite", "defi", "reunion", "dechet", "template", "canvas"],
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
    id: "cm1_suite_defi_tpl_2_sentier",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_defi",
    difficulty: 3,
    theme: "reunion",
    hint: "Chaque balise est espacée de la même distance.",
    tags: ["cm1", "suite", "defi", "reunion", "sentier", "template", "canvas"],
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
    id: "cm1_suite_defi_tpl_3_eau_decroissante",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_defi",
    difficulty: 3,
    theme: "reunion",
    hint: "La quantité d’eau diminue régulièrement.",
    tags: ["cm1", "suite", "defi", "reunion", "eau", "decroissante", "template", "canvas"],
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
    id: "cm1_suite_defi_tpl_4_multiplication",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Attention : ce n’est pas toujours une addition.",
    tags: ["cm1", "suite", "defi", "multiplication", "template", "canvas"],
    generate: () => {
      const start = randomChoice([2, 3, 4, 5]);
      const factor = randomChoice([2, 3]);
      const terms = [
        start,
        start * factor,
        start * factor ** 2,
        start * factor ** 3,
      ];
      const next = start * factor ** 4;

      return {
        text: `Défi : continue la suite ${terms.join(" ; ")} ; ?`,
        format: "short",
        expected: [String(next)],
        comparator: "number_equal",
        explanation: exp(
          "Certaines suites se construisent par multiplication.",
          "On cherche si le même multiplicateur revient à chaque étape.",
          `Ici, on multiplie par ${factor} à chaque fois : ${terms[3]} × ${factor} = ${next}.`,
          `Le nombre suivant est ${next}.`
        ),
        canvas: suiteCanvas({
          theme: randomChoice(["nombre", "pieces", "jeu_video"]),
          titre: "Défi : suite multiplicative",
          terms: [...terms, "?"],
          missingIndex: 4,
          arrows: [`×${factor}`, `×${factor}`, `×${factor}`, `×${factor}`],
          rule: `On multiplie par ${factor} à chaque fois.`,
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
    id: "cm1_suite_defi_tpl_5_trou_milieu",
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId: "suite_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Le nombre manquant doit respecter la même règle que les autres.",
    tags: ["cm1", "suite", "defi", "terme_manquant", "template", "canvas"],
    generate: () => {
      const start = randomInt(2, 15);
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
        text: `Défi : trouve le nombre manquant dans la suite ${terms.join(" ; ")}`,
        format: "short",
        expected: [String(missing)],
        comparator: "number_equal",
        explanation: exp(
          "Un nombre manquant doit garder la règle de la suite.",
          "On cherche l’écart entre les termes connus.",
          `La règle est +${step}. Donc ${start + step} + ${step} = ${missing}.`,
          `Le nombre manquant est ${missing}.`
        ),
        canvas: suiteCanvas({
          theme: "nombre",
          titre: "Défi : nombre manquant",
          terms,
          missingIndex: 2,
          arrows: [`+${step}`, `+${step}`, `+${step}`, `+${step}`],
          rule: `On ajoute ${step} à chaque fois.`,
          phrase: "Le trou doit respecter la régularité.",
          display: {
            showRule: false,
          },
        }),
      };
    },
  },
];