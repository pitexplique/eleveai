// lib/tutor-v4/question-banks/maths/6e/probabilites.bank.ts

import type {
  TutorBankItemV4,
  CanvasProbabilitesData,
} from "@/lib/tutor-v4/types";

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function probabilitesCanvas(
  data: Omit<CanvasProbabilitesData, "kind">
): CanvasProbabilitesData {
  return { kind: "probabilites", ...data };
}

function pe(def: string, meth: string, obs: string, ccl: string) {
  return `Définition : ${def}\n\nMéthode : ${meth}\n\nObservation : ${obs}\n\nConclusion : ${ccl}`;
}

type DiceFace = 1 | 2 | 3 | 4 | 5 | 6;

export const probabilitesBank: TutorBankItemV4[] = [
  /* =========================
     PROBA_VOCABULAIRE
  ========================= */

  {
    kind: "fixed",
    id: "6e_proba_vocabulaire_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Une issue est...",
    format: "qcm",
    choices: [
      "un résultat possible d’une expérience",
      "un calcul de périmètre",
      "une figure géométrique",
      "une unité de longueur",
    ],
    expected: ["un résultat possible d’une expérience"],
    comparator: "mcq_exact",
    hint: "Pense aux résultats possibles quand on lance un dé.",
    explanation:
      "Définition : une issue est un résultat possible d’une expérience aléatoire.\n\n" +
      "Méthode : on cherche les résultats qui peuvent arriver.\n\n" +
      "Observation : quand on lance un dé, obtenir 1, 2, 3, 4, 5 ou 6 sont des issues possibles.\n\n" +
      "Conclusion : une issue est donc un résultat possible.",
    tags: ["proba_experience", "vocabulaire", "issue", "qcm"],
  },

  {
    kind: "fixed",
    id: "6e_proba_vocabulaire_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Un événement impossible est un événement qui...",
    format: "qcm",
    choices: [
      "ne peut jamais se produire",
      "se produit toujours",
      "se produit une fois sur deux",
      "est très probable",
    ],
    expected: ["ne peut jamais se produire"],
    comparator: "mcq_exact",
    hint: "Impossible signifie que cela ne peut pas arriver.",
    explanation:
      "Définition : un événement impossible ne peut jamais se produire.\n\n" +
      "Méthode : on vérifie si l’événement peut apparaître parmi les issues possibles.\n\n" +
      "Observation : obtenir 7 avec un dé classique à 6 faces est impossible.\n\n" +
      "Conclusion : un événement impossible ne peut jamais arriver.",
    tags: ["proba_experience", "vocabulaire", "impossible", "qcm"],
  },

  {
    kind: "fixed",
    id: "6e_proba_vocabulaire_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Un événement certain est un événement qui...",
    format: "qcm",
    choices: [
      "se produit toujours",
      "ne se produit jamais",
      "est impossible à prévoir",
      "a une chance sur deux",
    ],
    expected: ["se produit toujours"],
    comparator: "mcq_exact",
    hint: "Certain signifie que cela arrive à chaque fois.",
    explanation:
      "Définition : un événement certain se produit toujours.\n\n" +
      "Méthode : on vérifie si toutes les issues possibles réalisent l’événement.\n\n" +
      "Observation : obtenir un nombre inférieur à 7 avec un dé classique est certain.\n\n" +
      "Conclusion : un événement certain arrive toujours.",
    tags: ["proba_experience", "vocabulaire", "certain", "qcm"],
  },

  {
    kind: "fixed",
    id: "6e_proba_vocabulaire_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "La probabilité d’un événement est toujours comprise entre...",
    format: "qcm",
    choices: ["0 et 1", "1 et 10", "0 et 1000", "-1 et 1"],
    expected: ["0 et 1"],
    comparator: "mcq_exact",
    hint: "0 signifie impossible, 1 signifie certain.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise.\n\n" +
      "Méthode : on utilise une valeur entre 0 et 1.\n\n" +
      "Observation : 0 correspond à impossible et 1 correspond à certain.\n\n" +
      "Conclusion : une probabilité est toujours comprise entre 0 et 1.",
    tags: ["proba_experience", "vocabulaire", "probabilite", "qcm"],
  },

  {
    kind: "fixed",
    id: "6e_proba_vocabulaire_open_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 3,
    theme: "neutral",
    text: "Explique avec tes mots la différence entre un événement impossible et un événement certain.",
    format: "open",
    expected: ["impossible", "jamais", "certain", "toujours", "produire"],
    comparator: "contains_keyword",
    hint: "Utilise les mots jamais et toujours.",
    explanation:
      "Définition : un événement impossible ne peut jamais se produire, alors qu’un événement certain se produit toujours.\n\n" +
      "Méthode : on regarde les issues possibles.\n\n" +
      "Observation : si aucune issue ne réalise l’événement, il est impossible ; si toutes les issues le réalisent, il est certain.\n\n" +
      "Conclusion : impossible signifie jamais, certain signifie toujours.",
    tags: ["proba_experience", "vocabulaire", "open", "langage"],
  },

  /* =========================
     PROBA_ISSUE
  ========================= */

  {
    kind: "fixed",
    id: "6e_proba_issue_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 1,
    theme: "neutral",
    text: "On lance un dé classique à 6 faces. Combien y a-t-il d’issues possibles ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Compte les faces du dé.",
    explanation:
      "Définition : les issues sont tous les résultats possibles.\n\n" +
      "Méthode : on compte les faces du dé.\n\n" +
      "Observation : un dé classique possède 6 faces numérotées de 1 à 6.\n\n" +
      "Conclusion : il y a 6 issues possibles.",
    tags: ["proba_experience", "issue", "de", "canvas"],
    canvas: probabilitesCanvas({
      variant: "de",
      de: {
        faces: [1, 2, 3, 4, 5, 6],
      },
    }),
  },

  {
    kind: "fixed",
    id: "6e_proba_issue_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 2,
    theme: "neutral",
    text: "On lance un dé classique. Combien d’issues réalisent l’événement : obtenir un nombre pair ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Les nombres pairs du dé sont 2, 4 et 6.",
    explanation:
      "Définition : une issue réalise un événement si elle correspond à ce que l’on cherche.\n\n" +
      "Méthode : on liste les nombres pairs possibles sur le dé.\n\n" +
      "Observation : les issues favorables sont 2, 4 et 6.\n\n" +
      "Conclusion : 3 issues réalisent l’événement.",
    tags: ["proba_experience", "issue", "de", "pair", "canvas"],
    canvas: probabilitesCanvas({
      variant: "de",
      de: {
        faces: [1, 2, 3, 4, 5, 6],
        surligne: [2, 4, 6],
      },
    }),
  },

{
  kind: "template",
  id: "6e_proba_issue_tpl_1_de",
  niveau: "6e",
  matiere: "maths",
  notionId: "proba_experience",
  microId: "proba_issue",
  difficulty: 2,
  theme: "neutral",
  hint: "Compte les faces surlignées.",
  tags: ["proba_experience", "issue", "de", "template", "canvas"],
  generate: () => {
    const events: {
      text: string;
      surligne: DiceFace[];
      answer: number;
    }[] = [
      {
        text: "obtenir un nombre impair",
        surligne: [1, 3, 5],
        answer: 3,
      },
      {
        text: "obtenir un nombre supérieur à 4",
        surligne: [5, 6],
        answer: 2,
      },
      {
        text: "obtenir un nombre inférieur à 3",
        surligne: [1, 2],
        answer: 2,
      },
      {
        text: "obtenir 6",
        surligne: [6],
        answer: 1,
      },
    ];

    const event = randomChoice(events);

    return {
      text: `Combien d’issues réalisent l’événement : ${event.text} ?`,
      format: "short",
      expected: [String(event.answer)],
      comparator: "number_equal",
      explanation:
        "Définition : les issues favorables sont les résultats qui réalisent l’événement.\n\n" +
        "Méthode : on liste les faces du dé qui correspondent à l’événement.\n\n" +
        `Observation : les faces favorables sont ${event.surligne.join(", ")}.\n\n` +
        `Conclusion : il y a ${event.answer} issue(s) favorable(s).`,
      canvas: probabilitesCanvas({
        variant: "de",
        de: {
          faces: [1, 2, 3, 4, 5, 6],
          surligne: event.surligne,
        },
      }),
    };
  },
},

  {
    kind: "template",
    id: "6e_proba_issue_tpl_2_roue",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les secteurs de la roue.",
    tags: ["proba_experience", "issue", "roue", "template", "canvas"],
    generate: () => {
      const segments = randomChoice([
        [
          { label: "A", poids: 1 },
          { label: "B", poids: 1 },
          { label: "C", poids: 1 },
          { label: "D", poids: 1 },
        ],
        [
          { label: "Rouge", poids: 1 },
          { label: "Bleu", poids: 1 },
          { label: "Vert", poids: 1 },
        ],
      ]);

      return {
        text: "Combien d’issues différentes peut-on obtenir avec cette roue ?",
        format: "short",
        expected: [String(segments.length)],
        comparator: "number_equal",
        explanation:
          "Définition : les issues sont les résultats possibles d’une expérience.\n\n" +
          "Méthode : on compte les secteurs différents de la roue.\n\n" +
          `Observation : la roue possède ${segments.length} secteur(s) différent(s).\n\n` +
          `Conclusion : il y a ${segments.length} issues possibles.`,
        canvas: probabilitesCanvas({
          variant: "roue",
          roue: { segments },
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_proba_issue_open_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi il est important de lister toutes les issues avant de calculer une probabilité.",
    format: "open",
    expected: ["issues", "toutes", "oublier", "probabilité", "erreur"],
    comparator: "contains_keyword",
    hint: "Si on oublie une issue, le raisonnement peut être faux.",
    explanation:
      "Définition : une probabilité dépend des issues possibles et des issues favorables.\n\n" +
      "Méthode : on commence par lister toutes les issues.\n\n" +
      "Observation : si on oublie une issue, on peut mal comparer ou mal calculer.\n\n" +
      "Conclusion : lister toutes les issues permet d’éviter les erreurs.",
    tags: ["proba_experience", "issue", "open", "methode", "raisonnement"],
  },

  /* =========================
     PROBA_COMPARER
  ========================= */

  {
    kind: "fixed",
    id: "6e_proba_comparer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Sur ce dé, quel événement est le plus probable ?",
    format: "qcm",
    choices: [
      "obtenir un nombre pair",
      "obtenir 6",
      "obtenir un nombre supérieur à 5",
      "obtenir 1",
    ],
    expected: ["obtenir un nombre pair"],
    comparator: "mcq_exact",
    hint: "Compare le nombre d’issues favorables.",
    explanation:
      "Définition : plus un événement a d’issues favorables, plus il est probable.\n\n" +
      "Méthode : on compte les issues favorables pour chaque événement.\n\n" +
      "Observation : obtenir un nombre pair correspond à 2, 4 et 6, donc 3 issues favorables.\n\n" +
      "Conclusion : obtenir un nombre pair est l’événement le plus probable.",
    tags: ["proba_experience", "comparer", "de", "canvas"],
    canvas: probabilitesCanvas({
      variant: "de",
      de: {
        faces: [1, 2, 3, 4, 5, 6],
        surligne: [2, 4, 6],
      },
    }),
  },

  {
    kind: "template",
    id: "6e_proba_comparer_tpl_1_billes",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare le nombre de billes de chaque couleur.",
    tags: ["proba_experience", "comparer", "billes", "template", "canvas"],
    generate: () => {
      const rouge = randomChoice([2, 3, 4]);
      const bleu = randomChoice([5, 6, 7]);
      const vert = randomChoice([1, 2]);

      const elements = [
        ...Array.from({ length: rouge }, () => ({ couleur: "rouge" })),
        ...Array.from({ length: bleu }, () => ({ couleur: "bleu" })),
        ...Array.from({ length: vert }, () => ({ couleur: "vert" })),
      ];

      return {
        text: "Quelle couleur a le plus de chances d’être tirée ?",
        format: "qcm",
        choices: shuffle(["bleu", "rouge", "vert"]),
        expected: ["bleu"],
        comparator: "mcq_exact",
        explanation:
          "Définition : dans un tirage, la couleur la plus présente est la plus probable.\n\n" +
          "Méthode : on compte les billes de chaque couleur.\n\n" +
          `Observation : il y a ${bleu} billes bleues, ${rouge} rouges et ${vert} vertes.\n\n` +
          "Conclusion : la couleur bleue a le plus de chances d’être tirée.",
        canvas: probabilitesCanvas({
          variant: "billes",
          billes: { elements },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "6e_proba_comparer_tpl_2_roue",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde la taille des secteurs.",
    tags: ["proba_experience", "comparer", "roue", "template", "canvas"],
    generate: () => {
      const target = randomChoice([
        {
          segments: [
            { label: "A", poids: 3 },
            { label: "B", poids: 1 },
            { label: "C", poids: 1 },
          ],
          expected: "A",
        },
        {
          segments: [
            { label: "Rouge", poids: 1 },
            { label: "Bleu", poids: 3 },
            { label: "Vert", poids: 1 },
          ],
          expected: "Bleu",
        },
      ]);

      return {
        text: "Sur cette roue, quelle issue est la plus probable ?",
        format: "qcm",
        choices: shuffle(target.segments.map((s) => s.label)),
        expected: [target.expected],
        comparator: "mcq_exact",
        explanation:
          "Définition : sur une roue, un secteur plus grand a plus de chances d’être obtenu.\n\n" +
          "Méthode : on compare la taille des secteurs.\n\n" +
          `Observation : le secteur ${target.expected} est le plus grand.\n\n` +
          `Conclusion : l’issue ${target.expected} est la plus probable.`,
        canvas: probabilitesCanvas({
          variant: "roue",
          roue: { segments: target.segments },
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_proba_comparer_open_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_comparer",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment comparer deux événements pour savoir lequel est le plus probable.",
    format: "open",
    expected: ["issues", "favorables", "compter", "plus", "probable"],
    comparator: "contains_keyword",
    hint: "Il faut compter les issues favorables.",
    explanation:
      "Définition : un événement est plus probable s’il a plus de chances de se produire.\n\n" +
      "Méthode : on compte les issues favorables pour chaque événement.\n\n" +
      "Observation : l’événement qui possède le plus d’issues favorables est le plus probable.\n\n" +
      "Conclusion : comparer des probabilités demande de comparer les issues favorables.",
    tags: ["proba_experience", "comparer", "open", "methode"],
  },
    /* =========================
     PROBA_ESTIMER
  ========================= */

  {
    kind: "fixed",
    id: "6e_proba_estimer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_estimer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle probabilité correspond à un événement impossible ?",
    format: "qcm",
    choices: ["0", "1", "0,5", "2"],
    expected: ["0"],
    comparator: "mcq_exact",
    hint: "Impossible signifie que cela ne peut jamais arriver.",
    explanation:
      "Définition : une probabilité est comprise entre 0 et 1.\n\n" +
      "Méthode : on associe 0 à impossible et 1 à certain.\n\n" +
      "Observation : un événement impossible ne se produit jamais.\n\n" +
      "Conclusion : sa probabilité est 0.",
    tags: ["proba_experience", "estimer", "impossible", "qcm"],
  },

  {
    kind: "fixed",
    id: "6e_proba_estimer_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_estimer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle probabilité correspond à un événement certain ?",
    format: "qcm",
    choices: ["1", "0", "0,25", "10"],
    expected: ["1"],
    comparator: "mcq_exact",
    hint: "Certain signifie que cela arrive toujours.",
    explanation:
      "Définition : une probabilité est comprise entre 0 et 1.\n\n" +
      "Méthode : on associe 1 à un événement certain.\n\n" +
      "Observation : un événement certain se produit toujours.\n\n" +
      "Conclusion : sa probabilité est 1.",
    tags: ["proba_experience", "estimer", "certain", "qcm"],
  },

{
  kind: "template",
  id: "6e_proba_estimer_tpl_1_de_fraction",
  niveau: "6e",
  matiere: "maths",
  notionId: "proba_experience",
  microId: "proba_estimer",
  difficulty: 3,
  theme: "neutral",
  hint: "Probabilité = issues favorables / issues possibles.",
  tags: ["proba_experience", "estimer", "de", "fraction", "template", "canvas"],
  generate: () => {
    const event: {
      text: string;
      fav: DiceFace[];
      expected: string;
    } = randomChoice([
      {
        text: "obtenir un nombre pair",
        fav: [2, 4, 6],
        expected: "3/6",
      },
      {
        text: "obtenir 6",
        fav: [6],
        expected: "1/6",
      },
      {
        text: "obtenir un nombre inférieur à 3",
        fav: [1, 2],
        expected: "2/6",
      },
      {
        text: "obtenir un nombre supérieur à 4",
        fav: [5, 6],
        expected: "2/6",
      },
    ]);

    return {
      text: `Avec un dé classique, quelle est la probabilité de ${event.text} ?`,
      format: "qcm",
      choices: shuffle([event.expected, "1", "0", "6/6"]),
      expected: [event.expected],
      comparator: "mcq_exact",
      explanation:
        "Définition : dans une situation d’équiprobabilité, la probabilité vaut issues favorables / issues possibles.\n\n" +
        "Méthode : on compte les issues favorables et les issues possibles.\n\n" +
        `Calcul : les issues favorables sont ${event.fav.join(", ")} ; il y a donc ${event.fav.length} issue(s) favorable(s) sur 6.\n\n` +
        `Conclusion : la probabilité est ${event.expected}.`,
      canvas: probabilitesCanvas({
        variant: "de",
        de: {
          faces: [1, 2, 3, 4, 5, 6],
          surligne: event.fav,
        },
      }),
    };
  },
},

  {
    kind: "template",
    id: "6e_proba_estimer_tpl_2_billes_proche",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_estimer",
    difficulty: 4,
    theme: "neutral",
    hint: "Plus il y a de billes favorables, plus la probabilité est proche de 1.",
    tags: ["proba_experience", "estimer", "billes", "template", "canvas"],
    generate: () => {
      const rouges = randomChoice([7, 8, 9]);
      const bleues = randomChoice([1, 2]);
      const elements = [
        ...Array.from({ length: rouges }, () => ({ couleur: "rouge" })),
        ...Array.from({ length: bleues }, () => ({ couleur: "bleu" })),
      ];

      return {
        text: "On tire une bille au hasard. L’événement « tirer une bille rouge » est plutôt proche de 0 ou proche de 1 ?",
        format: "qcm",
        choices: ["proche de 1", "proche de 0", "impossible", "certain"],
        expected: ["proche de 1"],
        comparator: "mcq_exact",
        explanation:
          "Définition : une probabilité proche de 1 signifie que l’événement a beaucoup de chances de se produire.\n\n" +
          "Méthode : on compare le nombre de billes rouges au nombre total de billes.\n\n" +
          `Observation : il y a ${rouges} billes rouges et seulement ${bleues} bille(s) bleue(s).\n\n` +
          "Conclusion : tirer une bille rouge est proche de 1, sans être certain.",
        canvas: probabilitesCanvas({
          variant: "billes",
          billes: { elements },
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_proba_estimer_open_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_estimer",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi une probabilité ne peut pas être plus grande que 1.",
    format: "open",
    expected: ["1", "certain", "toutes", "issues", "impossible"],
    comparator: "contains_keyword",
    hint: "1 correspond déjà à l’événement certain.",
    explanation:
      "Définition : une probabilité est un nombre compris entre 0 et 1.\n\n" +
      "Méthode : on interprète 1 comme l’événement certain.\n\n" +
      "Observation : si toutes les issues réalisent l’événement, la probabilité vaut déjà 1.\n\n" +
      "Conclusion : une probabilité ne peut donc pas dépasser 1.",
    tags: ["proba_experience", "estimer", "open", "raisonnement"],
  },

  /* =========================
     PROBA_LIRE
  ========================= */

  {
    kind: "fixed",
    id: "6e_proba_lire_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Dans ce sac, quelle couleur est la plus présente ?",
    format: "qcm",
    choices: ["rouge", "bleu", "vert", "elles sont toutes égales"],
    expected: ["rouge"],
    comparator: "mcq_exact",
    hint: "Compte les billes de chaque couleur.",
    explanation:
      "Définition : lire une situation probabiliste, c’est repérer les issues possibles et leur fréquence dans la situation.\n\n" +
      "Méthode : on compte les billes de chaque couleur.\n\n" +
      "Observation : il y a plus de billes rouges que de billes bleues ou vertes.\n\n" +
      "Conclusion : la couleur rouge est la plus présente.",
    tags: ["proba_experience", "lire", "billes", "canvas"],
    canvas: probabilitesCanvas({
      variant: "billes",
      billes: {
        elements: [
          { couleur: "rouge" },
          { couleur: "rouge" },
          { couleur: "rouge" },
          { couleur: "rouge" },
          { couleur: "bleu" },
          { couleur: "bleu" },
          { couleur: "vert" },
        ],
      },
    }),
  },

  {
    kind: "fixed",
    id: "6e_proba_lire_fixed_2_tableau",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_lire",
    difficulty: 3,
    theme: "neutral",
    text: "Dans le tableau, combien d’issues favorables correspondent à l’événement « obtenir une voyelle » ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Les voyelles affichées sont A et E.",
    explanation:
      "Définition : les issues favorables sont les résultats qui réalisent l’événement.\n\n" +
      "Méthode : on repère les cases qui correspondent à des voyelles.\n\n" +
      "Observation : A et E sont des voyelles, il y a donc 2 issues favorables.\n\n" +
      "Conclusion : il y a 2 issues favorables.",
    tags: ["proba_experience", "lire", "tableau", "canvas"],
    canvas: probabilitesCanvas({
      variant: "tableau",
      tableau: {
        entetes: ["Issue"],
        lignes: [["A"], ["B"], ["C"], ["D"], ["E"]],
        casesSurlignees: [
          [0, 0],
          [4, 0],
        ],
      },
    }),
  },

  {
    kind: "template",
    id: "6e_proba_lire_tpl_1_roue",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_lire",
    difficulty: 3,
    theme: "neutral",
    hint: "Lis les secteurs de la roue.",
    tags: ["proba_experience", "lire", "roue", "template", "canvas"],
    generate: () => {
      const segments = [
        { label: "A", poids: 2 },
        { label: "B", poids: 1 },
        { label: "C", poids: 1 },
      ];

      return {
        text: "Sur cette roue, quelle lettre a le plus de chances d’être obtenue ?",
        format: "qcm",
        choices: shuffle(["A", "B", "C"]),
        expected: ["A"],
        comparator: "mcq_exact",
        explanation:
          "Définition : sur une roue, plus un secteur est grand, plus l’issue est probable.\n\n" +
          "Méthode : on compare les tailles des secteurs.\n\n" +
          "Observation : le secteur A est plus grand que les secteurs B et C.\n\n" +
          "Conclusion : la lettre A a le plus de chances d’être obtenue.",
        canvas: probabilitesCanvas({
          variant: "roue",
          roue: { segments },
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_proba_lire_open_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_lire",
    difficulty: 4,
    theme: "neutral",
    text: "Décris les étapes pour lire correctement une situation de probabilité.",
    format: "open",
    expected: ["issues", "favorables", "compter", "événement", "comparer"],
    comparator: "contains_keyword",
    hint: "Commence par identifier les issues possibles.",
    explanation:
      "Définition : une situation de probabilité présente des résultats possibles appelés issues.\n\n" +
      "Méthode : on identifie les issues possibles, puis celles qui réalisent l’événement étudié.\n\n" +
      "Observation : on peut ensuite compter ou comparer les issues favorables.\n\n" +
      "Conclusion : lire une situation probabiliste demande d’identifier les issues et l’événement.",
    tags: ["proba_experience", "lire", "open", "methode"],
  },

  /* =========================
     PROBA_DEFIS
  ========================= */

  {
    kind: "fixed",
    id: "6e_proba_defi_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : « obtenir 6 avec un dé est impossible ». A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le 6 est une face du dé.",
    explanation:
      "Définition : un événement impossible ne peut jamais se produire.\n\n" +
      "Méthode : on vérifie si l’issue 6 existe sur le dé.\n\n" +
      "Observation : un dé classique possède une face 6.\n\n" +
      "Conclusion : obtenir 6 n’est pas impossible, c’est possible.",
    tags: ["proba_experience", "defi", "erreur", "de"],
    canvas: probabilitesCanvas({
      variant: "de",
      de: {
        faces: [1, 2, 3, 4, 5, 6],
        surligne: [6],
      },
    }),
  },

  {
    kind: "template",
    id: "6e_proba_defi_tpl_1_billes_fraction",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Compte les billes favorables et le nombre total de billes.",
    tags: ["proba_experience", "defi", "billes", "fraction", "template", "canvas"],
    generate: () => {
      const rouges = randomChoice([2, 3, 4]);
      // Le premier piège est la probabilité du bleu : à nombre égal, c'est la
      // bonne réponse recopiée.
      const bleues = randomChoice([3, 4, 5].filter((n) => n !== rouges));
      const total = rouges + bleues;

      const elements = [
        ...Array.from({ length: rouges }, () => ({ couleur: "rouge" })),
        ...Array.from({ length: bleues }, () => ({ couleur: "bleu" })),
      ];

      return {
        text: "Quelle est la probabilité de tirer une bille rouge ?",
        format: "qcm",
        choices: shuffle([
          `${rouges}/${total}`,
          `${bleues}/${total}`,
          `${total}/${rouges}`,
          "1",
        ]),
        expected: [`${rouges}/${total}`],
        comparator: "mcq_exact",
        explanation:
          "Définition : dans une situation d’équiprobabilité, la probabilité vaut issues favorables / issues possibles.\n\n" +
          "Méthode : on compte les billes rouges et le nombre total de billes.\n\n" +
          `Calcul : il y a ${rouges} billes rouges sur ${total} billes.\n\n` +
          `Conclusion : la probabilité de tirer une bille rouge est ${rouges}/${total}.`,
        canvas: probabilitesCanvas({
          variant: "billes",
          billes: { elements },
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_proba_defi_open_1_doute",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un camarade affirme qu’un événement est « très probable ». Quelles vérifications dois-tu faire avant d’être d’accord ?",
    format: "open",
    expected: ["issues", "favorables", "compter", "total", "comparer"],
    comparator: "contains_keyword",
    hint: "Il faut comparer les issues favorables au nombre total d’issues.",
    explanation:
      "Définition : un événement est très probable s’il possède beaucoup d’issues favorables par rapport au total.\n\n" +
      "Méthode : on identifie l’événement, on compte les issues favorables et toutes les issues possibles.\n\n" +
      "Observation : on ne doit pas se fier seulement à une impression.\n\n" +
      "Conclusion : il faut vérifier les nombres avant d’accepter l’affirmation.",
    tags: ["proba_experience", "defi", "open", "verification", "raisonnement"],
  },

  {
    kind: "fixed",
    id: "6e_proba_defi_open_2_langage",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi les mots impossible, possible, probable et certain doivent être utilisés avec précision.",
    format: "open",
    expected: ["impossible", "possible", "probable", "certain", "précision"],
    comparator: "contains_keyword",
    hint: "Ces mots ne veulent pas dire la même chose.",
    explanation:
      "Définition : en probabilités, chaque mot a un sens précis.\n\n" +
      "Méthode : on distingue impossible, possible, probable et certain selon les issues.\n\n" +
      "Observation : une mauvaise utilisation du vocabulaire peut conduire à une conclusion fausse.\n\n" +
      "Conclusion : utiliser un vocabulaire précis aide à raisonner correctement.",
    tags: ["proba_experience", "defi", "open", "langage", "vocabulaire"],
  },
    /* =========================
     RENFORT — PROBABILITÉS 6e
  ========================= */

  {
    kind: "fixed",
    id: "6e_proba_vocabulaire_erreur_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : « possible » et « certain », c’est pareil. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Possible veut dire que cela peut arriver. Certain veut dire que cela arrive toujours.",
    explanation:
      "Définition : un événement possible peut se produire, mais il n’est pas forcément certain.\n\n" +
      "Méthode : on distingue les mots du vocabulaire probabiliste.\n\n" +
      "Observation : obtenir 6 avec un dé est possible, mais pas certain.\n\n" +
      "Conclusion : possible et certain ne veulent pas dire la même chose.",
    tags: ["proba_experience", "vocabulaire", "erreur", "possible", "certain"],
  },

  {
    kind: "fixed",
    id: "6e_proba_issue_erreur_1_oublier_issue",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève liste les issues possibles d’un dé : 1, 2, 3, 4, 5. Quelle erreur a-t-il faite ?",
    format: "open",
    expected: ["oublié", "6", "issue", "toutes", "dé"],
    comparator: "contains_keyword",
    hint: "Un dé classique a 6 faces.",
    explanation:
      "Définition : les issues sont tous les résultats possibles d’une expérience.\n\n" +
      "Méthode : on doit lister toutes les faces du dé.\n\n" +
      "Observation : l’élève a oublié l’issue 6.\n\n" +
      "Conclusion : la liste est incomplète, donc le raisonnement peut devenir faux.",
    tags: ["proba_experience", "issue", "open", "erreur", "verification"],
  },

  {
    kind: "template",
    id: "6e_proba_issue_tpl_3_billes_total",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte toutes les billes.",
    tags: ["proba_experience", "issue", "billes", "total", "template", "canvas"],
    generate: () => {
      const rouges = randomChoice([2, 3, 4]);
      const bleues = randomChoice([3, 4, 5]);
      const vertes = randomChoice([1, 2, 3]);
      const total = rouges + bleues + vertes;

      const elements = [
        ...Array.from({ length: rouges }, () => ({ couleur: "rouge" })),
        ...Array.from({ length: bleues }, () => ({ couleur: "bleu" })),
        ...Array.from({ length: vertes }, () => ({ couleur: "vert" })),
      ];

      return {
        text: "Combien d’issues possibles y a-t-il si on tire une bille au hasard ?",
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation:
          "Définition : chaque bille peut être tirée, donc chaque bille correspond ici à une issue possible.\n\n" +
          "Méthode : on compte toutes les billes du sac.\n\n" +
          `Calcul : ${rouges} + ${bleues} + ${vertes} = ${total}.\n\n` +
          `Conclusion : il y a ${total} issues possibles.`,
        canvas: probabilitesCanvas({
          variant: "billes",
          billes: { elements },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "6e_proba_comparer_tpl_3_aussi_probable",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare le nombre de billes rouges et bleues.",
    tags: ["proba_experience", "comparer", "aussi_probable", "template", "canvas"],
    generate: () => {
      const n = randomChoice([2, 3, 4]);
      const elements = [
        ...Array.from({ length: n }, () => ({ couleur: "rouge" })),
        ...Array.from({ length: n }, () => ({ couleur: "bleu" })),
        ...Array.from({ length: 1 }, () => ({ couleur: "vert" })),
      ];

      return {
        text: "Les événements « tirer une bille rouge » et « tirer une bille bleue » sont-ils aussi probables ?",
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["oui"],
        comparator: "mcq_exact",
        explanation:
          "Définition : deux événements sont aussi probables s’ils ont le même nombre d’issues favorables.\n\n" +
          "Méthode : on compare le nombre de billes rouges et bleues.\n\n" +
          `Observation : il y a ${n} billes rouges et ${n} billes bleues.\n\n` +
          "Conclusion : les deux événements sont aussi probables.",
        canvas: probabilitesCanvas({
          variant: "billes",
          billes: { elements },
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_proba_estimer_erreur_1_plus_que_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_estimer",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : « La probabilité de gagner est 1,5 ». Pourquoi est-ce impossible ?",
    format: "open",
    expected: ["probabilité", "0", "1", "certain", "plus grande"],
    comparator: "contains_keyword",
    hint: "Une probabilité est comprise entre 0 et 1.",
    explanation:
      "Définition : une probabilité est toujours comprise entre 0 et 1.\n\n" +
      "Méthode : on vérifie si la valeur proposée respecte cet intervalle.\n\n" +
      "Observation : 1 correspond déjà à un événement certain, donc 1,5 est trop grand.\n\n" +
      "Conclusion : une probabilité de 1,5 est impossible.",
    tags: ["proba_experience", "estimer", "open", "erreur", "intervalle"],
  },

  {
    kind: "template",
    id: "6e_proba_estimer_tpl_3_roue_proche_0",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_estimer",
    difficulty: 4,
    theme: "neutral",
    hint: "Un tout petit secteur correspond à une probabilité proche de 0.",
    tags: ["proba_experience", "estimer", "roue", "proche_0", "template", "canvas"],
    generate: () => {
      const segments = [
        { label: "A", poids: 8 },
        { label: "B", poids: 1 },
        { label: "C", poids: 1 },
      ];

      return {
        text: "L’événement « obtenir B » est-il plutôt proche de 0 ou proche de 1 ?",
        format: "qcm",
        choices: ["proche de 0", "proche de 1", "certain", "impossible"],
        expected: ["proche de 0"],
        comparator: "mcq_exact",
        explanation:
          "Définition : une probabilité proche de 0 signifie que l’événement a peu de chances de se produire.\n\n" +
          "Méthode : on observe la taille du secteur B sur la roue.\n\n" +
          "Observation : le secteur B est petit par rapport au secteur A.\n\n" +
          "Conclusion : obtenir B est plutôt proche de 0.",
        canvas: probabilitesCanvas({
          variant: "roue",
          roue: { segments },
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_proba_lire_erreur_1_impression",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_lire",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève regarde rapidement un sac de billes et conclut sans compter. Pourquoi sa conclusion peut-elle être fragile ?",
    format: "open",
    expected: ["compter", "billes", "vérifier", "impression", "issues"],
    comparator: "contains_keyword",
    hint: "Il faut vérifier les nombres.",
    explanation:
      "Définition : une conclusion probabiliste doit s’appuyer sur les issues possibles et favorables.\n\n" +
      "Méthode : on compte les objets ou les secteurs avant de conclure.\n\n" +
      "Observation : une impression visuelle peut être trompeuse.\n\n" +
      "Conclusion : il faut compter et vérifier avant de conclure.",
    tags: ["proba_experience", "lire", "open", "verification", "doute_raisonnable"],
  },

  {
    kind: "template",
    id: "6e_proba_lire_tpl_2_tableau_favorable",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_lire",
    difficulty: 4,
    theme: "neutral",
    hint: "Compte les cases surlignées.",
    tags: ["proba_experience", "lire", "tableau", "issues_favorables", "template", "canvas"],
    generate: () => {
    const favorable: {
      event: string;
      lignes: string[][];
      cases: [number, number][];
      answer: number;
    } = randomChoice([
      {
        event: "obtenir une lettre dans le mot MATHS qui est une voyelle",
        lignes: [["M"], ["A"], ["T"], ["H"], ["S"]],
        cases: [[1, 0]],
        answer: 1,
      },
      {
        event: "obtenir une lettre dans le mot REUNION qui est une voyelle",
        lignes: [["R"], ["E"], ["U"], ["N"], ["I"], ["O"], ["N"]],
        cases: [[1, 0], [2, 0], [4, 0], [5, 0]],
        answer: 4,
      },
    ]);
      return {
        text: `Combien d’issues favorables correspondent à l’événement : ${favorable.event} ?`,
        format: "short",
        expected: [String(favorable.answer)],
        comparator: "number_equal",
        explanation:
          "Définition : les issues favorables sont les issues qui réalisent l’événement.\n\n" +
          "Méthode : on repère les cases qui correspondent à l’événement.\n\n" +
          `Observation : il y a ${favorable.answer} case(s) favorable(s).\n\n` +
          `Conclusion : il y a ${favorable.answer} issue(s) favorable(s).`,
        canvas: probabilitesCanvas({
          variant: "tableau",
          tableau: {
            entetes: ["Issue"],
            lignes: favorable.lignes,
            casesSurlignees: favorable.cases,
          },
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_proba_defi_open_3_demarche",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Décris une méthode rigoureuse pour résoudre une question de probabilité simple.",
    format: "open",
    expected: ["issues", "favorables", "compter", "total", "conclusion"],
    comparator: "contains_keyword",
    hint: "Commence par les issues possibles, puis les issues favorables.",
    explanation:
      "Définition : une probabilité simple compare les issues favorables aux issues possibles.\n\n" +
      "Méthode : on identifie l’expérience, on liste les issues possibles, puis on compte les issues favorables.\n\n" +
      "Calcul : si nécessaire, on écrit issues favorables / issues possibles.\n\n" +
      "Conclusion : on formule une réponse claire avec une justification.",
    tags: ["proba_experience", "defi", "open", "methode", "raisonnement"],
  },

  {
    kind: "template",
    id: "6e_proba_defi_tpl_2_reunion",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "Compte les choix possibles et les choix favorables.",
    tags: ["proba_experience", "defi", "reunion", "template", "canvas"],
    generate: () => {
      const segments = [
        { label: "Volcan", poids: 2 },
        { label: "Plage", poids: 4 },
        { label: "Forêt", poids: 1 },
      ];

      return {
        text: "Sur cette roue des sorties à La Réunion, quelle sortie est la plus probable ? Justifie mentalement avec les secteurs.",
        format: "qcm",
        choices: shuffle(["Volcan", "Plage", "Forêt"]),
        expected: ["Plage"],
        comparator: "mcq_exact",
        explanation:
          "Définition : sur une roue, plus le secteur est grand, plus l’issue est probable.\n\n" +
          "Méthode : on compare les secteurs de la roue.\n\n" +
          "Observation : le secteur Plage est le plus grand.\n\n" +
          "Conclusion : la sortie Plage est la plus probable.",
        canvas: probabilitesCanvas({
          variant: "roue",
          roue: { segments },
        }),
      };
    },
  },

  /* ========================= TOP-UP — PROBA_VOCABULAIRE ========================= */
  {
    kind: "fixed", id: "6e_proba_vocabulaire_topup_1",
    niveau: "6e", matiere: "maths", notionId: "proba_experience", microId: "proba_vocabulaire",
    difficulty: 1, theme: "neutral",
    text: "Une expérience aléatoire est une expérience dont...",
    format: "qcm",
    choices: ["on ne connaît pas le résultat à l’avance", "on connaît toujours le résultat", "il n’y a aucun résultat", "le résultat est un dessin"],
    expected: ["on ne connaît pas le résultat à l’avance"], comparator: "mcq_exact",
    hint: "Pense au lancer d’un dé.",
    explanation: pe("une expérience aléatoire a un résultat qui dépend du hasard.", "on se demande si le résultat est connu à l’avance.", "quand on lance un dé, on ne sait pas quelle face sortira.", "une expérience aléatoire a un résultat inconnu à l’avance."),
    tags: ["proba_experience", "vocabulaire", "qcm"],
  },
  {
    kind: "fixed", id: "6e_proba_vocabulaire_topup_2",
    niveau: "6e", matiere: "maths", notionId: "proba_experience", microId: "proba_vocabulaire",
    difficulty: 1, theme: "neutral",
    text: "Un événement certain est un événement qui...",
    format: "qcm",
    choices: ["se produit toujours", "ne se produit jamais", "se produit une fois sur deux", "est impossible"],
    expected: ["se produit toujours"], comparator: "mcq_exact",
    hint: "Certain = sûr d’arriver.",
    explanation: pe("un événement certain se produit à coup sûr.", "on se demande si l’événement arrive toujours.", "obtenir un nombre entre 1 et 6 avec un dé est certain.", "un événement certain se produit toujours."),
    tags: ["proba_experience", "vocabulaire", "qcm"],
  },
  {
    kind: "fixed", id: "6e_proba_vocabulaire_topup_3",
    niveau: "6e", matiere: "maths", notionId: "proba_experience", microId: "proba_vocabulaire",
    difficulty: 1, theme: "neutral",
    text: "Un événement impossible est un événement qui...",
    format: "qcm",
    choices: ["ne se produit jamais", "se produit toujours", "arrive une fois sur deux", "est certain"],
    expected: ["ne se produit jamais"], comparator: "mcq_exact",
    hint: "Impossible = ne peut pas arriver.",
    explanation: pe("un événement impossible ne peut pas se produire.", "on se demande si l’événement peut arriver.", "obtenir 7 avec un dé classique est impossible.", "un événement impossible ne se produit jamais."),
    tags: ["proba_experience", "vocabulaire", "qcm"],
  },
  {
    kind: "fixed", id: "6e_proba_vocabulaire_topup_4",
    niveau: "6e", matiere: "maths", notionId: "proba_experience", microId: "proba_vocabulaire",
    difficulty: 1, theme: "neutral",
    text: "Lancer un dé est une expérience...",
    format: "qcm",
    choices: ["aléatoire", "certaine", "impossible", "géométrique"],
    expected: ["aléatoire"], comparator: "mcq_exact",
    hint: "Le résultat dépend du hasard.",
    explanation: pe("une expérience dont le résultat dépend du hasard est aléatoire.", "on regarde si le résultat est prévisible.", "le résultat d’un lancer de dé n’est pas prévisible.", "lancer un dé est une expérience aléatoire."),
    tags: ["proba_experience", "vocabulaire", "qcm"],
  },

  /* ========================= TOP-UP — PROBA_LIRE ========================= */
  {
    kind: "fixed", id: "6e_proba_lire_topup_1",
    niveau: "6e", matiere: "maths", notionId: "proba_experience", microId: "proba_lire",
    difficulty: 1, theme: "neutral",
    text: "Dans ce sac, quelle couleur est la plus présente ?",
    format: "qcm", choices: ["rouge", "bleu", "vert", "elles sont toutes égales"], expected: ["rouge"], comparator: "mcq_exact",
    hint: "Compte les billes de chaque couleur.",
    explanation: pe("lire une situation de hasard, c’est compter les issues.", "on compte les billes de chaque couleur.", "il y a 3 billes rouges, 2 bleues et 1 verte.", "la couleur rouge est la plus présente."),
    tags: ["proba_experience", "lire", "billes", "canvas"],
    canvas: probabilitesCanvas({ variant: "billes", billes: { elements: [{ couleur: "rouge" }, { couleur: "rouge" }, { couleur: "rouge" }, { couleur: "bleu" }, { couleur: "bleu" }, { couleur: "vert" }] } }),
  },
  {
    kind: "fixed", id: "6e_proba_lire_topup_2",
    niveau: "6e", matiere: "maths", notionId: "proba_experience", microId: "proba_lire",
    difficulty: 1, theme: "neutral",
    text: "Combien de faces possède ce dé ?",
    format: "short", expected: ["6"], comparator: "number_equal",
    hint: "Compte les faces.",
    explanation: pe("un dé classique a des faces numérotées.", "on compte les faces.", "les faces sont 1, 2, 3, 4, 5 et 6.", "ce dé possède 6 faces."),
    tags: ["proba_experience", "lire", "de", "canvas"],
    canvas: probabilitesCanvas({ variant: "de", de: { faces: [1, 2, 3, 4, 5, 6] } }),
  },
  {
    kind: "fixed", id: "6e_proba_lire_topup_3",
    niveau: "6e", matiere: "maths", notionId: "proba_experience", microId: "proba_lire",
    difficulty: 2, theme: "neutral",
    text: "Combien y a-t-il de billes rouges dans ce sac ?",
    format: "short", expected: ["3"], comparator: "number_equal",
    hint: "Compte seulement les billes rouges.",
    explanation: pe("on lit une donnée précise dans la situation.", "on compte les billes rouges.", "il y a 3 billes rouges.", "la réponse est 3."),
    tags: ["proba_experience", "lire", "billes", "canvas"],
    canvas: probabilitesCanvas({ variant: "billes", billes: { elements: [{ couleur: "rouge" }, { couleur: "rouge" }, { couleur: "rouge" }, { couleur: "bleu" }, { couleur: "bleu" }, { couleur: "vert" }] } }),
  },
  {
    kind: "fixed", id: "6e_proba_lire_topup_4",
    niveau: "6e", matiere: "maths", notionId: "proba_experience", microId: "proba_lire",
    difficulty: 2, theme: "neutral",
    text: "Combien de secteurs différents possède cette roue ?",
    format: "short", expected: ["4"], comparator: "number_equal",
    hint: "Compte les secteurs colorés.",
    explanation: pe("on lit le nombre d’issues d’une roue.", "on compte les secteurs.", "la roue possède 4 secteurs.", "il y a 4 secteurs différents."),
    tags: ["proba_experience", "lire", "roue", "canvas"],
    canvas: probabilitesCanvas({ variant: "roue", roue: { segments: [{ label: "Rouge", poids: 1 }, { label: "Bleu", poids: 1 }, { label: "Vert", poids: 1 }, { label: "Jaune", poids: 1 }] } }),
  },

  /* ========================= TOP-UP — PROBA_ISSUE ========================= */
  {
    kind: "fixed", id: "6e_proba_issue_topup_1",
    niveau: "6e", matiere: "maths", notionId: "proba_experience", microId: "proba_issue",
    difficulty: 1, theme: "neutral",
    text: "Combien d’issues possibles y a-t-il quand on lance un dé à 6 faces ?",
    format: "short", expected: ["6"], comparator: "number_equal",
    hint: "Une issue par face.",
    explanation: pe("une issue est un résultat possible.", "on compte les résultats possibles d’un lancer de dé.", "on peut obtenir 1, 2, 3, 4, 5 ou 6.", "il y a 6 issues possibles."),
    tags: ["proba_experience", "issue", "de", "canvas"],
    canvas: probabilitesCanvas({ variant: "de", de: { faces: [1, 2, 3, 4, 5, 6] } }),
  },
  {
    kind: "fixed", id: "6e_proba_issue_topup_2",
    niveau: "6e", matiere: "maths", notionId: "proba_experience", microId: "proba_issue",
    difficulty: 1, theme: "neutral",
    text: "Combien d’issues possibles y a-t-il quand on lance une pièce (pile ou face) ?",
    format: "short", expected: ["2"], comparator: "number_equal",
    hint: "Pile ou face.",
    explanation: pe("une issue est un résultat possible.", "on compte les résultats d’un lancer de pièce.", "on peut obtenir pile ou face.", "il y a 2 issues possibles."),
    tags: ["proba_experience", "issue"],
  },
  {
    kind: "fixed", id: "6e_proba_issue_topup_3",
    niveau: "6e", matiere: "maths", notionId: "proba_experience", microId: "proba_issue",
    difficulty: 2, theme: "neutral",
    text: "Combien d’issues différentes peut-on obtenir avec cette roue ?",
    format: "short", expected: ["3"], comparator: "number_equal",
    hint: "Compte les secteurs différents.",
    explanation: pe("le nombre d’issues est le nombre de résultats possibles.", "on compte les secteurs de la roue.", "la roue a 3 secteurs : A, B et C.", "il y a 3 issues possibles."),
    tags: ["proba_experience", "issue", "roue", "canvas"],
    canvas: probabilitesCanvas({ variant: "roue", roue: { segments: [{ label: "A", poids: 1 }, { label: "B", poids: 1 }, { label: "C", poids: 1 }] } }),
  },

  /* ========================= TOP-UP — PROBA_COMPARER ========================= */
  {
    kind: "fixed", id: "6e_proba_comparer_topup_1",
    niveau: "6e", matiere: "maths", notionId: "proba_experience", microId: "proba_comparer",
    difficulty: 2, theme: "neutral",
    text: "Dans ce sac, quelle couleur a le plus de chances d’être tirée ?",
    format: "qcm", choices: ["rouge", "bleu", "vert", "elles sont toutes égales"], expected: ["rouge"], comparator: "mcq_exact",
    hint: "La couleur la plus présente est la plus probable.",
    explanation: pe("la couleur la plus présente a le plus de chances.", "on compte les billes de chaque couleur.", "il y a 4 rouges, 2 bleues et 1 verte.", "la couleur rouge a le plus de chances."),
    tags: ["proba_experience", "comparer", "billes", "canvas"],
    canvas: probabilitesCanvas({ variant: "billes", billes: { elements: [{ couleur: "rouge" }, { couleur: "rouge" }, { couleur: "rouge" }, { couleur: "rouge" }, { couleur: "bleu" }, { couleur: "bleu" }, { couleur: "vert" }] } }),
  },
  {
    kind: "fixed", id: "6e_proba_comparer_topup_2",
    niveau: "6e", matiere: "maths", notionId: "proba_experience", microId: "proba_comparer",
    difficulty: 2, theme: "neutral",
    text: "Dans ce sac, quelle couleur a le moins de chances d’être tirée ?",
    format: "qcm", choices: ["vert", "rouge", "bleu", "elles sont toutes égales"], expected: ["vert"], comparator: "mcq_exact",
    hint: "La couleur la moins présente est la moins probable.",
    explanation: pe("la couleur la moins présente a le moins de chances.", "on compte les billes de chaque couleur.", "il y a 3 rouges, 2 bleues et 1 verte.", "la couleur verte a le moins de chances."),
    tags: ["proba_experience", "comparer", "billes", "canvas"],
    canvas: probabilitesCanvas({ variant: "billes", billes: { elements: [{ couleur: "rouge" }, { couleur: "rouge" }, { couleur: "rouge" }, { couleur: "bleu" }, { couleur: "bleu" }, { couleur: "vert" }] } }),
  },
  {
    kind: "fixed", id: "6e_proba_comparer_topup_3",
    niveau: "6e", matiere: "maths", notionId: "proba_experience", microId: "proba_comparer",
    difficulty: 2, theme: "neutral",
    text: "Sur cette roue, quelle issue est la plus probable ?",
    format: "qcm", choices: ["A", "B", "C", "elles sont égales"], expected: ["A"], comparator: "mcq_exact",
    hint: "Le plus grand secteur est le plus probable.",
    explanation: pe("sur une roue, le plus grand secteur est le plus probable.", "on compare la taille des secteurs.", "le secteur A est plus grand que B et C.", "l’issue A est la plus probable."),
    tags: ["proba_experience", "comparer", "roue", "canvas"],
    canvas: probabilitesCanvas({ variant: "roue", roue: { segments: [{ label: "A", poids: 3 }, { label: "B", poids: 1 }, { label: "C", poids: 1 }] } }),
  },
  {
    kind: "fixed", id: "6e_proba_comparer_topup_4",
    niveau: "6e", matiere: "maths", notionId: "proba_experience", microId: "proba_comparer",
    difficulty: 3, theme: "neutral",
    text: "On lance un dé. A-t-on plus de chances d’obtenir un nombre pair ou un nombre impair ?",
    format: "qcm", choices: ["autant de chances", "plus de chances d’avoir un pair", "plus de chances d’avoir un impair", "aucune chance"], expected: ["autant de chances"], comparator: "mcq_exact",
    hint: "Compte les faces paires et impaires.",
    explanation: pe("on compare le nombre d’issues favorables.", "on compte les faces paires et impaires.", "pairs : 2, 4, 6 (3 faces) ; impairs : 1, 3, 5 (3 faces).", "on a autant de chances d’obtenir un pair qu’un impair."),
    tags: ["proba_experience", "comparer", "de", "canvas"],
    canvas: probabilitesCanvas({ variant: "de", de: { faces: [1, 2, 3, 4, 5, 6] } }),
  },
  {
    kind: "fixed", id: "6e_proba_comparer_topup_5",
    niveau: "6e", matiere: "maths", notionId: "proba_experience", microId: "proba_comparer",
    difficulty: 2, theme: "neutral",
    text: "Un sac contient 5 billes rouges et 2 billes bleues. Quelle couleur est la plus probable au tirage ?",
    format: "qcm", choices: ["rouge", "bleu", "elles sont égales", "noir"], expected: ["rouge"], comparator: "mcq_exact",
    hint: "5 rouges contre 2 bleues.",
    explanation: pe("la couleur la plus présente est la plus probable.", "on compare 5 rouges et 2 bleues.", "5 est plus grand que 2.", "la couleur rouge est la plus probable."),
    tags: ["proba_experience", "comparer", "qcm"],
  },

  /* ========================= TOP-UP — PROBA_ESTIMER ========================= */
  {
    kind: "fixed", id: "6e_proba_estimer_topup_1",
    niveau: "6e", matiere: "maths", notionId: "proba_experience", microId: "proba_estimer",
    difficulty: 1, theme: "neutral",
    text: "Avec un dé classique, l’événement « obtenir 7 » est...",
    format: "qcm", choices: ["impossible", "possible", "certain"], expected: ["impossible"], comparator: "mcq_exact",
    hint: "Un dé n’a pas de face 7.",
    explanation: pe("un événement impossible a une probabilité de 0.", "on regarde les faces du dé.", "il n’y a pas de face 7.", "l’événement « obtenir 7 » est impossible."),
    tags: ["proba_experience", "estimer", "de", "canvas"],
    canvas: probabilitesCanvas({ variant: "de", de: { faces: [1, 2, 3, 4, 5, 6] } }),
  },
  {
    kind: "fixed", id: "6e_proba_estimer_topup_2",
    niveau: "6e", matiere: "maths", notionId: "proba_experience", microId: "proba_estimer",
    difficulty: 1, theme: "neutral",
    text: "Avec un dé classique, l’événement « obtenir un nombre entre 1 et 6 » est...",
    format: "qcm", choices: ["certain", "possible", "impossible"], expected: ["certain"], comparator: "mcq_exact",
    hint: "Toutes les faces sont entre 1 et 6.",
    explanation: pe("un événement certain a une probabilité de 1.", "on regarde toutes les faces.", "elles sont toutes entre 1 et 6.", "l’événement est certain."),
    tags: ["proba_experience", "estimer", "de", "canvas"],
    canvas: probabilitesCanvas({ variant: "de", de: { faces: [1, 2, 3, 4, 5, 6], surligne: [1, 2, 3, 4, 5, 6] } }),
  },
  {
    kind: "fixed", id: "6e_proba_estimer_topup_3",
    niveau: "6e", matiere: "maths", notionId: "proba_experience", microId: "proba_estimer",
    difficulty: 2, theme: "neutral",
    text: "Un sac contient 7 billes rouges et 1 bille bleue. Tirer une bille rouge est plutôt proche de 0 ou de 1 ?",
    format: "qcm", choices: ["proche de 1", "proche de 0", "exactement au milieu"], expected: ["proche de 1"], comparator: "mcq_exact",
    hint: "Presque toutes les billes sont rouges.",
    explanation: pe("plus l’événement est probable, plus sa probabilité est proche de 1.", "on compare le nombre de billes rouges au total.", "il y a 7 rouges sur 8 billes.", "tirer une bille rouge est proche de 1 (sans être certain)."),
    tags: ["proba_experience", "estimer", "billes", "canvas"],
    canvas: probabilitesCanvas({ variant: "billes", billes: { elements: [{ couleur: "rouge" }, { couleur: "rouge" }, { couleur: "rouge" }, { couleur: "rouge" }, { couleur: "rouge" }, { couleur: "rouge" }, { couleur: "rouge" }, { couleur: "bleu" }] } }),
  },

  /* ========================= TOP-UP — PROBA_DEFI ========================= */
  {
    kind: "fixed", id: "6e_proba_defi_topup_1",
    niveau: "6e", matiere: "maths", notionId: "proba_experience", microId: "proba_defi",
    difficulty: 3, theme: "neutral",
    text: "Défi : on lance un dé. Quelle est la probabilité d’obtenir un nombre pair ?",
    format: "qcm", choices: ["1/2", "1/3", "1/6", "2/3"], expected: ["1/2"], comparator: "mcq_exact",
    hint: "3 faces paires sur 6.",
    explanation: pe("une probabilité est le nombre de cas favorables sur le nombre de cas possibles.", "on compte les faces paires sur le total.", "3 faces paires sur 6 : 3/6 = 1/2.", "la probabilité d’obtenir un nombre pair est 1/2."),
    tags: ["proba_experience", "defi", "de", "fraction", "canvas"],
    canvas: probabilitesCanvas({ variant: "de", de: { faces: [1, 2, 3, 4, 5, 6], surligne: [2, 4, 6] } }),
  },
  {
    kind: "fixed", id: "6e_proba_defi_topup_2",
    niveau: "6e", matiere: "maths", notionId: "proba_experience", microId: "proba_defi",
    difficulty: 3, theme: "neutral",
    text: "Un sac contient 5 billes rouges et 5 billes bleues. A-t-on autant de chances de tirer une rouge qu’une bleue ?",
    format: "qcm", choices: ["oui", "non"], expected: ["oui"], comparator: "mcq_exact",
    hint: "Compare le nombre de rouges et de bleues.",
    explanation: pe("deux couleurs ont autant de chances si elles sont en même nombre.", "on compare 5 rouges et 5 bleues.", "il y a autant de rouges que de bleues.", "oui, on a autant de chances de tirer rouge que bleu."),
    tags: ["proba_experience", "defi", "qcm"],
  },
  {
    kind: "fixed", id: "6e_proba_defi_topup_3",
    niveau: "6e", matiere: "maths", notionId: "proba_experience", microId: "proba_defi",
    difficulty: 2, theme: "neutral",
    text: "On lance une pièce une seule fois. Peut-on être certain d’obtenir pile ?",
    format: "qcm", choices: ["non", "oui"], expected: ["non"], comparator: "mcq_exact",
    hint: "Le résultat dépend du hasard.",
    explanation: pe("un résultat de hasard n’est pas garanti.", "on regarde les issues possibles.", "on peut obtenir pile ou face : on ne peut pas être sûr.", "non, on ne peut pas être certain d’obtenir pile."),
    tags: ["proba_experience", "defi", "qcm"],
  },
  {
    kind: "fixed", id: "6e_proba_defi_topup_4",
    niveau: "6e", matiere: "maths", notionId: "proba_experience", microId: "proba_defi",
    difficulty: 4, theme: "neutral",
    text: "Défi : on lance un dé. Quelle est la probabilité d’obtenir le nombre 3 ?",
    format: "qcm", choices: ["1/6", "1/3", "1/2", "3/6"], expected: ["1/6"], comparator: "mcq_exact",
    hint: "Une seule face porte le 3, sur 6 faces.",
    explanation: pe("une probabilité = cas favorables / cas possibles.", "on compte les faces portant un 3 sur le total.", "1 face sur 6 : 1/6.", "la probabilité d’obtenir 3 est 1/6."),
    tags: ["proba_experience", "defi", "de", "fraction", "canvas"],
    canvas: probabilitesCanvas({ variant: "de", de: { faces: [1, 2, 3, 4, 5, 6], surligne: [3] } }),
  },
  /* =========================
     PROBA_VOCABULAIRE — LES GENERATEURS
     ⛔ Ajoutes le 22/08/2026 : la micro n'avait que dix items figes. Regle d'or
     de Frederic — un eleve ne doit pas retomber sur la meme question en dix
     minutes, soit dix variantes MINIMUM, donc un generateur.
     ⭐ Une micro de vocabulaire se parametre sur la SITUATION (de, piece, urne,
     roue) : le raisonnement ne bouge pas, l'habillage si.
  ========================= */
  {
    kind: "template",
    id: "6e_proba_vocabulaire_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    hint: "Une issue est UN resultat possible de l'experience.",
    tags: ["proba_experience", "vocabulaire", "template"],
    generate: () => {
      const situations = [
        { exp: "on lance un de a six faces", n: 6, issues: "1, 2, 3, 4, 5 et 6" },
        { exp: "on lance une piece de monnaie", n: 2, issues: "pile et face" },
        { exp: "on tire une bille dans un sac contenant une bille de chaque couleur : rouge, bleue, verte et jaune", n: 4, issues: "rouge, bleue, verte et jaune" },
        { exp: "on fait tourner une roue partagee en 8 secteurs numerotes", n: 8, issues: "les nombres de 1 a 8" },
      ];
      const s = situations[Math.floor(Math.random() * situations.length)];
      return {
        text: `Une experience aleatoire : ${s.exp}. Combien y a-t-il d'issues possibles ?`,
        format: "short",
        expected: [String(s.n)],
        comparator: "number_equal",
        explanation: pe(
          "une issue est un resultat possible d'une experience aleatoire.",
          "on enumere tous les resultats que l'experience peut donner, sans en oublier ni en compter deux fois.",
          `Les issues sont ${s.issues}.`,
          `Il y a donc ${s.n} issues possibles.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "6e_proba_vocabulaire_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 3,
    theme: "neutral",
    hint: "Impossible vaut 0, certain vaut 1.",
    tags: ["proba_experience", "vocabulaire", "template"],
    generate: () => {
      const cas = [
        { txt: "obtenir un 7 en lancant un de a six faces", rep: "impossible" },
        { txt: "obtenir un nombre entier compris entre 1 et 6 en lancant un de a six faces", rep: "certain" },
        { txt: "obtenir pile en lancant une piece equilibree", rep: "ni impossible ni certain" },
        { txt: "obtenir un nombre pair en lancant un de a six faces", rep: "ni impossible ni certain" },
        { txt: "tirer une bille rouge dans un sac ne contenant que des billes bleues", rep: "impossible" },
        { txt: "tirer une bille bleue dans un sac ne contenant que des billes bleues", rep: "certain" },
      ];
      const c = cas[Math.floor(Math.random() * cas.length)];
      const explications = {
        impossible: "L'evenement ne peut jamais se produire : sa probabilite vaut 0.",
        certain: "L'evenement se produit a coup sur : sa probabilite vaut 1.",
        "ni impossible ni certain":
          "L'evenement se produit parfois : sa probabilite est strictement comprise entre 0 et 1.",
      } as const;
      return {
        text: `Cet evenement est-il impossible, certain, ou ni l'un ni l'autre : ${c.txt} ?`,
        format: "qcm",
        choices: shuffle(["impossible", "certain", "ni impossible ni certain"]),
        expected: [c.rep],
        comparator: "mcq_exact",
        explanation: pe(
          "une probabilite est un nombre compris entre 0 (impossible) et 1 (certain).",
          "on se demande si l'evenement peut ne jamais arriver, toujours arriver, ou parfois.",
          explications[c.rep as keyof typeof explications],
          "On situe l'evenement sur l'echelle de 0 a 1."
        ),
      };
    },
  },
]
