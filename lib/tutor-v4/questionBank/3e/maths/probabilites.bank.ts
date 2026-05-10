// lib/tutor-v4/question-banks/maths/5e/probabilites.bank.ts

import type {
  TutorBankItemV4,
  CanvasProbabilitesData,
} from "@/lib/tutor-v4/types";

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

function pgcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : pgcd(b, a % b);
}

function fraction(n: number, d: number) {
  const g = pgcd(n, d);
  return `${n / g}/${d / g}`;
}

function makeChoices(correct: string, wrongs: string[]) {
  return shuffle([correct, ...wrongs]).slice(0, 4);
}

const couleurs = {
  rouge: "#ef4444",
  bleu: "#3b82f6",
  vert: "#22c55e",
  jaune: "#eab308",
  violet: "#a855f7",
  orange: "#f97316",
};

type DiceFace = 1 | 2 | 3 | 4 | 5 | 6;

function isDiceFace(n: number): n is DiceFace {
  return n === 1 || n === 2 || n === 3 || n === 4 || n === 5 || n === 6;
}

function deCanvas(surligne?: number[]): CanvasProbabilitesData {
  return {
    kind: "probabilites",
    variant: "de",
    de: {
      faces: [1, 2, 3, 4, 5, 6],
      surligne: surligne?.filter(isDiceFace),
    },
  };
}

function billesCanvas(
  elements: { label?: string; couleur: string }[]
): CanvasProbabilitesData {
  return {
    kind: "probabilites",
    variant: "billes",
    billes: { elements },
  };
}

function roueCanvas(
  segments: { label: string; poids: number; couleur?: string }[]
): CanvasProbabilitesData {
  return {
    kind: "probabilites",
    variant: "roue",
    roue: { segments },
  };
}

function tableauCanvas(
  entetes: string[],
  lignes: string[][],
  casesSurlignees?: Array<[number, number]>
): CanvasProbabilitesData {
  return {
    kind: "probabilites",
    variant: "tableau",
    tableau: { entetes, lignes, casesSurlignees },
  };
}

/* =========================
   BANK
========================= */

export const probabilitesBank: TutorBankItemV4[] = [
  /* =========================
     PROBA_VOCABULAIRE
  ========================= */

  {
    kind: "fixed",
    id: "5e_proba_vocabulaire_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "probabilites",
    microId: "proba_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Une expérience aléatoire est une expérience dont le résultat...",
    format: "qcm",
    choices: [
      "est connu à l’avance",
      "n’est pas connu à l’avance",
      "est toujours impossible",
      "est toujours égal à 1",
    ],
    expected: ["n’est pas connu à l’avance"],
    comparator: "mcq_exact",
    hint: "Aléatoire signifie qu’on ne connaît pas le résultat avant l’expérience.",
    explanation:
      "Définition : une expérience aléatoire est une expérience dont on ne peut pas prévoir le résultat avec certitude.\n\n" +
      "Méthode : on se demande si le résultat est connu avant de faire l’expérience.\n\n" +
      "Calcul : ici, il n’y a pas de calcul ; il faut reconnaître le vocabulaire.\n\n" +
      "Conclusion : une expérience aléatoire a un résultat qui n’est pas connu à l’avance.",
    tags: ["probabilites", "vocabulaire", "experience_aleatoire"],
  },

  {
    kind: "fixed",
    id: "5e_proba_vocabulaire_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "probabilites",
    microId: "proba_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Lorsqu’on lance un dé, obtenir 4 est...",
    format: "qcm",
    choices: ["une issue", "une moyenne", "une fréquence", "une unité"],
    expected: ["une issue"],
    comparator: "mcq_exact",
    hint: "Une issue est un résultat possible d’une expérience.",
    explanation:
      "Définition : une issue est un résultat possible d’une expérience aléatoire.\n\n" +
      "Méthode : on regarde si « obtenir 4 » peut être un résultat du lancer de dé.\n\n" +
      "Calcul : un dé peut donner 1, 2, 3, 4, 5 ou 6 ; donc 4 est bien un résultat possible.\n\n" +
      "Conclusion : obtenir 4 est une issue.",
    canvas: deCanvas([4]),
    tags: ["probabilites", "vocabulaire", "issue", "de", "canvas"],
  },

  {
    kind: "fixed",
    id: "5e_proba_vocabulaire_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "probabilites",
    microId: "proba_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Un événement est...",
    format: "qcm",
    choices: [
      "un ensemble d’issues",
      "toujours une seule issue",
      "un calcul de moyenne",
      "une unité de longueur",
    ],
    expected: ["un ensemble d’issues"],
    comparator: "mcq_exact",
    hint: "Un événement peut contenir une ou plusieurs issues.",
    explanation:
      "Définition : un événement est un ensemble d’issues d’une expérience aléatoire.\n\n" +
      "Méthode : on repère quelles issues réalisent l’événement.\n\n" +
      "Calcul : par exemple, « obtenir un nombre pair » contient les issues 2, 4 et 6.\n\n" +
      "Conclusion : un événement peut regrouper plusieurs issues.",
    canvas: deCanvas([2, 4, 6]),
    tags: ["probabilites", "vocabulaire", "evenement", "de", "canvas"],
  },

  {
    kind: "fixed",
    id: "5e_proba_vocabulaire_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "probabilites",
    microId: "proba_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Explique avec tes mots ce qu’est une expérience aléatoire.",
    format: "open",
    expected: ["résultat", "avance"],
    comparator: "contains_keyword",
    hint: "On ne peut pas savoir avec certitude le résultat avant de faire l’expérience.",
    explanation:
      "Définition : une expérience aléatoire est une expérience dont le résultat n’est pas connu à l’avance.\n\n" +
      "Méthode : pour reconnaître une expérience aléatoire, on vérifie s’il y a plusieurs résultats possibles.\n\n" +
      "Calcul : lancer un dé est aléatoire car on peut obtenir 1, 2, 3, 4, 5 ou 6.\n\n" +
      "Conclusion : une expérience aléatoire dépend du hasard.",
    tags: ["probabilites", "vocabulaire", "open"],
  },

  /* =========================
     PROBA_ISSUES
  ========================= */

  {
    kind: "fixed",
    id: "5e_proba_issues_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "probabilites",
    microId: "proba_issue",
    difficulty: 1,
    theme: "neutral",
    text: "Combien y a-t-il d’issues possibles lorsqu’on lance un dé équilibré à 6 faces ?",
    format: "qcm",
    choices: ["2", "4", "6", "12"],
    expected: ["6"],
    comparator: "mcq_exact",
    hint: "Un dé classique possède 6 faces.",
    explanation:
      "Définition : les issues sont tous les résultats possibles d’une expérience aléatoire.\n\n" +
      "Méthode : on liste les résultats possibles du dé.\n\n" +
      "Calcul : les issues sont 1, 2, 3, 4, 5 et 6 ; il y en a donc 6.\n\n" +
      "Conclusion : il y a 6 issues possibles.",
    canvas: deCanvas(),
    tags: ["probabilites", "issues", "de", "canvas"],
  },

  {
    kind: "template",
    id: "5e_proba_issues_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "probabilites",
    microId: "proba_issue",
    difficulty: 1,
    theme: "neutral",
    hint: "Compte tous les objets possibles.",
    tags: ["probabilites", "issues", "billes", "template", "canvas"],
    generate: () => {
      const rouges = randomInt(2, 5);
      const bleues = randomInt(1, 4);
      const total = rouges + bleues;

      const elements = [
        ...Array.from({ length: rouges }, () => ({ couleur: couleurs.rouge })),
        ...Array.from({ length: bleues }, () => ({ couleur: couleurs.bleu })),
      ];

      return {
        text: `Un sac contient ${rouges} billes rouges et ${bleues} billes bleues. Combien y a-t-il d’issues possibles si on tire une bille ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation:
          `Définition : une issue est un résultat possible de l’expérience.\n\n` +
          `Méthode : ici, chaque bille tirée peut être considérée comme une issue possible.\n\n` +
          `Calcul : ${rouges} + ${bleues} = ${total} billes au total.\n\n` +
          `Conclusion : il y a ${total} issues possibles.`,
        canvas: billesCanvas(elements),
      };
    },
  },

  {
    kind: "template",
    id: "5e_proba_issues_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "probabilites",
    microId: "proba_issue",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde toutes les zones de la roue.",
    tags: ["probabilites", "issues", "roue", "template", "canvas"],
    generate: () => {
      const count = randomChoice([3, 4, 5]);
      const labels = ["A", "B", "C", "D", "E"].slice(0, count);

      return {
        text: `Une roue comporte ${count} secteurs nommés ${labels.join(", ")}. Combien y a-t-il d’issues possibles ?`,
        format: "short",
        expected: [String(count)],
        comparator: "number_equal",
        explanation:
          `Définition : les issues sont les résultats possibles de l’expérience.\n\n` +
          `Méthode : pour une roue, on compte les secteurs possibles.\n\n` +
          `Calcul : la roue possède ${count} secteurs.\n\n` +
          `Conclusion : il y a ${count} issues possibles.`,
        canvas: roueCanvas(labels.map((label) => ({ label, poids: 1 }))),
      };
    },
  },

  {
    kind: "fixed",
    id: "5e_proba_issues_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "probabilites",
    microId: "proba_issue",
    difficulty: 2,
    theme: "neutral",
    text: "On lance un dé équilibré. Explique pourquoi il y a 6 issues possibles.",
    format: "open",
    expected: ["1", "2", "3", "4", "5", "6"],
    comparator: "contains_keyword",
    hint: "Liste les résultats possibles.",
    explanation:
      "Définition : une issue est un résultat possible d’une expérience aléatoire.\n\n" +
      "Méthode : pour connaître le nombre d’issues, on liste tous les résultats possibles.\n\n" +
      "Calcul : avec un dé, les issues sont 1, 2, 3, 4, 5 et 6.\n\n" +
      "Conclusion : il y a donc 6 issues possibles.",
    canvas: deCanvas(),
    tags: ["probabilites", "issues", "open", "de", "canvas"],
  },

  /* =========================
     PROBA_EQUIPROBABILITE
  ========================= */

  {
    kind: "fixed",
    id: "5e_proba_equiprobabilite_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "probabilites",
    microId: "proba_equiprobabilite",
    difficulty: 2,
    theme: "neutral",
    text: "Avec un dé équilibré, les 6 faces ont-elles la même probabilité d’apparaître ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Un dé équilibré ne favorise aucune face.",
    explanation:
      "Définition : une situation est équiprobable lorsque toutes les issues ont la même probabilité.\n\n" +
      "Méthode : on vérifie si aucune issue n’est favorisée.\n\n" +
      "Calcul : avec un dé équilibré, chaque face a la même chance d’apparaître.\n\n" +
      "Conclusion : la situation est équiprobable.",
    canvas: deCanvas(),
    tags: ["probabilites", "equiprobabilite", "de", "canvas"],
  },

  {
    kind: "template",
    id: "5e_proba_equiprobabilite_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "probabilites",
    microId: "proba_equiprobabilite",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde si tous les secteurs ont la même taille ou le même poids.",
    tags: ["probabilites", "equiprobabilite", "roue", "template", "canvas"],
    generate: () => {
      const equal = randomChoice([true, false]);
      const segments = equal
        ? [
            { label: "A", poids: 1, couleur: couleurs.rouge },
            { label: "B", poids: 1, couleur: couleurs.bleu },
            { label: "C", poids: 1, couleur: couleurs.vert },
            { label: "D", poids: 1, couleur: couleurs.jaune },
          ]
        : [
            { label: "A", poids: 2, couleur: couleurs.rouge },
            { label: "B", poids: 1, couleur: couleurs.bleu },
            { label: "C", poids: 1, couleur: couleurs.vert },
          ];

      return {
        text: "La roue représentée correspond-elle à une situation d’équiprobabilité ?",
        format: "qcm",
        choices: ["oui", "non"],
        expected: [equal ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: equal
          ? "Définition : une situation est équiprobable lorsque toutes les issues ont la même probabilité.\n\n" +
            "Méthode : on compare les secteurs de la roue.\n\n" +
            "Calcul : tous les secteurs ont le même poids.\n\n" +
            "Conclusion : la situation est équiprobable."
          : "Définition : une situation est équiprobable lorsque toutes les issues ont la même probabilité.\n\n" +
            "Méthode : on compare les secteurs de la roue.\n\n" +
            "Calcul : les secteurs n’ont pas tous le même poids.\n\n" +
            "Conclusion : la situation n’est pas équiprobable.",
        canvas: roueCanvas(segments),
      };
    },
  },

  {
    kind: "template",
    id: "5e_proba_equiprobabilite_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "probabilites",
    microId: "proba_equiprobabilite",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare le nombre de billes de chaque couleur.",
    tags: ["probabilites", "equiprobabilite", "billes", "template", "canvas"],
    generate: () => {
      const equal = randomChoice([true, false]);
      const rouges = equal ? 3 : 4;
      const bleues = 3;

      const elements = [
        ...Array.from({ length: rouges }, () => ({ couleur: couleurs.rouge })),
        ...Array.from({ length: bleues }, () => ({ couleur: couleurs.bleu })),
      ];

      return {
        text: `Un sac contient ${rouges} billes rouges et ${bleues} billes bleues. Tirer rouge et tirer bleu sont-ils équiprobables ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [equal ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: equal
          ? `Définition : deux événements sont équiprobables s’ils ont la même probabilité.\n\n` +
            `Méthode : on compare le nombre de billes rouges et bleues.\n\n` +
            `Calcul : il y a ${rouges} billes rouges et ${bleues} billes bleues.\n\n` +
            `Conclusion : les deux événements sont équiprobables.`
          : `Définition : deux événements sont équiprobables s’ils ont la même probabilité.\n\n` +
            `Méthode : on compare le nombre de billes rouges et bleues.\n\n` +
            `Calcul : il y a ${rouges} billes rouges et ${bleues} billes bleues.\n\n` +
            `Conclusion : les deux événements ne sont pas équiprobables.`,
        canvas: billesCanvas(elements),
      };
    },
  },

  {
    kind: "fixed",
    id: "5e_proba_equiprobabilite_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "probabilites",
    microId: "proba_equiprobabilite",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi un dé équilibré correspond à une situation d’équiprobabilité.",
    format: "open",
    expected: ["même", "probabilité", "faces"],
    comparator: "contains_keyword",
    hint: "Aucune face n’est favorisée.",
    explanation:
      "Définition : une situation est équiprobable lorsque toutes les issues ont la même probabilité.\n\n" +
      "Méthode : on vérifie si toutes les faces du dé ont la même chance d’apparaître.\n\n" +
      "Calcul : avec un dé équilibré, aucune face n’est favorisée.\n\n" +
      "Conclusion : chaque face a la même probabilité d’apparaître.",
    canvas: deCanvas(),
    tags: ["probabilites", "equiprobabilite", "open", "de", "canvas"],
  },

  /* =========================
     PROBA_CALCULER
  ========================= */

  {
    kind: "fixed",
    id: "5e_proba_calculer_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "probabilites",
    microId: "proba_calculer",
    difficulty: 2,
    theme: "neutral",
    text: "On lance un dé équilibré. Quelle est la probabilité d’obtenir un nombre pair ?",
    format: "qcm",
    choices: ["1/6", "2/6", "3/6", "6/3"],
    expected: ["3/6"],
    comparator: "mcq_exact",
    hint: "Les nombres pairs du dé sont 2, 4 et 6.",
    explanation:
      "Définition : en situation d’équiprobabilité, une probabilité se calcule par cas favorables / cas possibles.\n\n" +
      "Méthode : on compte les issues favorables, puis toutes les issues possibles.\n\n" +
      "Calcul : les issues favorables sont 2, 4 et 6, soit 3 issues sur 6.\n\n" +
      "Conclusion : la probabilité est 3/6.",
    canvas: deCanvas([2, 4, 6]),
    tags: ["probabilites", "calculer", "fraction", "de", "canvas"],
  },

  {
    kind: "template",
    id: "5e_proba_calculer_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "probabilites",
    microId: "proba_calculer",
    difficulty: 2,
    theme: "neutral",
    hint: "Probabilité = nombre de billes favorables / nombre total de billes.",
    tags: ["probabilites", "calculer", "billes", "template", "canvas"],
    generate: () => {
      const rouges = randomInt(1, 5);
      const bleues = randomInt(1, 5);
      const total = rouges + bleues;
      const result = `${rouges}/${total}`;

      const elements = [
        ...Array.from({ length: rouges }, () => ({ couleur: couleurs.rouge })),
        ...Array.from({ length: bleues }, () => ({ couleur: couleurs.bleu })),
      ];

      return {
        text: `Un sac contient ${rouges} billes rouges et ${bleues} billes bleues. Quelle est la probabilité de tirer une bille rouge ?`,
        format: "qcm",
        choices: makeChoices(result, [
          `${bleues}/${total}`,
          `${total}/${rouges}`,
          `${rouges}/${bleues}`,
        ]),
        expected: [result],
        comparator: "mcq_exact",
        explanation:
          `Définition : une probabilité se calcule par cas favorables / cas possibles.\n\n` +
          `Méthode : les cas favorables sont les billes rouges, et les cas possibles sont toutes les billes.\n\n` +
          `Calcul : il y a ${rouges} billes rouges sur ${total} billes au total.\n\n` +
          `Conclusion : la probabilité de tirer une bille rouge est ${result}.`,
        canvas: billesCanvas(elements),
      };
    },
  },

  {
    kind: "template",
    id: "5e_proba_calculer_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "probabilites",
    microId: "proba_calculer",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne les poids, puis compare le poids favorable au poids total.",
    tags: ["probabilites", "calculer", "roue", "template", "canvas"],
    generate: () => {
      const poidsRouge = randomChoice([1, 2, 3]);
      const poidsBleu = randomChoice([1, 2]);
      const poidsVert = randomChoice([1, 2]);
      const total = poidsRouge + poidsBleu + poidsVert;
      const result = `${poidsRouge}/${total}`;

      return {
        text: "Quelle est la probabilité d’obtenir Rouge avec cette roue ?",
        format: "qcm",
        choices: makeChoices(result, [
          `${poidsBleu}/${total}`,
          `${poidsVert}/${total}`,
          `${total}/${poidsRouge}`,
        ]),
        expected: [result],
        comparator: "mcq_exact",
        explanation:
          `Définition : sur une roue pondérée, la probabilité dépend du poids du secteur favorable.\n\n` +
          `Méthode : on divise le poids du secteur Rouge par le poids total de la roue.\n\n` +
          `Calcul : le poids total vaut ${poidsRouge} + ${poidsBleu} + ${poidsVert} = ${total}. Rouge a un poids ${poidsRouge}.\n\n` +
          `Conclusion : la probabilité d’obtenir Rouge est ${result}.`,
        canvas: roueCanvas([
          { label: "Rouge", poids: poidsRouge, couleur: couleurs.rouge },
          { label: "Bleu", poids: poidsBleu, couleur: couleurs.bleu },
          { label: "Vert", poids: poidsVert, couleur: couleurs.vert },
        ]),
      };
    },
  },

  {
    kind: "template",
    id: "5e_proba_calculer_tpl_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "probabilites",
    microId: "proba_calculer",
    difficulty: 3,
    theme: "neutral",
    hint: "Tu peux simplifier la fraction si possible.",
    tags: ["probabilites", "calculer", "fraction_simplifiee", "template"],
    generate: () => {
      const favorables = randomChoice([2, 3, 4, 5, 6]);
      const total = randomChoice([8, 10, 12]);
      const result = fraction(favorables, total);

      return {
        text: `Dans une expérience, il y a ${favorables} cas favorables sur ${total} cas possibles. Donner la probabilité sous forme simplifiée.`,
        format: "short",
        expected: [result],
        comparator: "fraction_decimal_equivalent",
        explanation:
          `Définition : une probabilité se calcule par cas favorables / cas possibles.\n\n` +
          `Méthode : on écrit la fraction, puis on la simplifie si possible.\n\n` +
          `Calcul : ${favorables}/${total} = ${result}.\n\n` +
          `Conclusion : la probabilité simplifiée est ${result}.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "5e_proba_calculer_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "probabilites",
    microId: "proba_calculer",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi la probabilité d’obtenir un nombre pair avec un dé équilibré est 3/6.",
    format: "open",
    expected: ["2", "4", "6", "3", "6"],
    comparator: "contains_keyword",
    hint: "Compte les issues favorables puis les issues possibles.",
    explanation:
      "Définition : une probabilité se calcule en comparant les cas favorables aux cas possibles.\n\n" +
      "Méthode : on liste d’abord les nombres pairs du dé.\n\n" +
      "Calcul : les nombres pairs sont 2, 4 et 6 : il y a 3 cas favorables sur 6 issues possibles.\n\n" +
      "Conclusion : la probabilité est 3/6.",
    canvas: deCanvas([2, 4, 6]),
    tags: ["probabilites", "calculer", "open", "de", "canvas"],
  },

  /* =========================
     PROBA_DEFIS
  ========================= */

  {
    kind: "fixed",
    id: "5e_proba_defis_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "probabilites",
    microId: "proba_defis",
    difficulty: 4,
    theme: "neutral",
    text: "Une probabilité peut-elle être supérieure à 1 ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Une probabilité est toujours comprise entre 0 et 1.",
    explanation:
      "Définition : une probabilité est un nombre compris entre 0 et 1.\n\n" +
      "Méthode : on vérifie si une probabilité peut dépasser le cas certain.\n\n" +
      "Calcul : l’événement certain a une probabilité égale à 1.\n\n" +
      "Conclusion : une probabilité ne peut pas être supérieure à 1.",
    tags: ["probabilites", "defi", "bornes"],
  },

  {
    kind: "fixed",
    id: "5e_proba_defis_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "probabilites",
    microId: "proba_defis",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : « S’il y a 3 billes rouges et 5 billes bleues, la probabilité de tirer rouge est 3/5. » A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le dénominateur doit être le nombre total de billes.",
    explanation:
      "Définition : une probabilité se calcule par cas favorables / cas possibles.\n\n" +
      "Méthode : on vérifie le numérateur et le dénominateur.\n\n" +
      "Calcul : il y a 3 billes rouges sur 3 + 5 = 8 billes au total, donc la probabilité est 3/8.\n\n" +
      "Conclusion : l’élève a tort.",
    canvas: billesCanvas([
      ...Array.from({ length: 3 }, () => ({ couleur: couleurs.rouge })),
      ...Array.from({ length: 5 }, () => ({ couleur: couleurs.bleu })),
    ]),
    tags: ["probabilites", "defi", "erreur", "billes", "canvas"],
  },

  {
    kind: "template",
    id: "5e_proba_defis_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "probabilites",
    microId: "proba_defis",
    difficulty: 4,
    theme: "reunion",
    hint: "Compte les fruits favorables et le nombre total de fruits.",
    tags: ["probabilites", "defi", "reunion", "template", "canvas"],
    generate: () => {
      const mangues = randomInt(2, 5);
      const ananas = randomInt(1, 4);
      const letchis = randomInt(1, 4);
      const total = mangues + ananas + letchis;
      const result = `${mangues}/${total}`;

      const elements = [
        ...Array.from({ length: mangues }, () => ({
          label: "M",
          couleur: couleurs.jaune,
        })),
        ...Array.from({ length: ananas }, () => ({
          label: "A",
          couleur: couleurs.vert,
        })),
        ...Array.from({ length: letchis }, () => ({
          label: "L",
          couleur: couleurs.rouge,
        })),
      ];

      return {
        text: `Dans un panier de fruits à La Réunion, il y a ${mangues} mangues, ${ananas} ananas et ${letchis} letchis. On prend un fruit au hasard. Quelle est la probabilité de prendre une mangue ?`,
        format: "qcm",
        choices: makeChoices(result, [
          `${ananas}/${total}`,
          `${letchis}/${total}`,
          `${mangues}/${ananas}`,
        ]),
        expected: [result],
        comparator: "mcq_exact",
        explanation:
          `Définition : une probabilité se calcule par cas favorables / cas possibles.\n\n` +
          `Méthode : les cas favorables sont les mangues, et les cas possibles sont tous les fruits.\n\n` +
          `Calcul : il y a ${mangues} mangues sur ${total} fruits au total.\n\n` +
          `Conclusion : la probabilité de prendre une mangue est ${result}.`,
        canvas: billesCanvas(elements),
      };
    },
  },

  {
    kind: "template",
    id: "5e_proba_defis_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "probabilites",
    microId: "proba_defis",
    difficulty: 5,
    theme: "neutral",
    hint: "Compare les poids des secteurs.",
    tags: ["probabilites", "defi", "roue", "template", "canvas"],
    generate: () => {
      return {
        text: "Sur cette roue, quelle issue est la plus probable ?",
        format: "qcm",
        choices: ["Rouge", "Bleu", "Vert", "Elles sont toutes aussi probables"],
        expected: ["Rouge"],
        comparator: "mcq_exact",
        explanation:
          "Définition : l’issue la plus probable est celle qui occupe la plus grande part de l’expérience.\n\n" +
          "Méthode : on compare les poids des secteurs de la roue.\n\n" +
          "Calcul : Rouge a un poids 3, tandis que Bleu et Vert ont chacun un poids 1.\n\n" +
          "Conclusion : Rouge est l’issue la plus probable.",
        canvas: roueCanvas([
          { label: "Rouge", poids: 3, couleur: couleurs.rouge },
          { label: "Bleu", poids: 1, couleur: couleurs.bleu },
          { label: "Vert", poids: 1, couleur: couleurs.vert },
        ]),
      };
    },
  },

  {
    kind: "template",
    id: "5e_proba_defis_tpl_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "probabilites",
    microId: "proba_defis",
    difficulty: 5,
    theme: "neutral",
    hint: "Lis le tableau ligne par ligne.",
    tags: ["probabilites", "defi", "tableau", "template", "canvas"],
    generate: () => {
      const lignes = [
        ["Rouge", "4", "10", "4/10"],
        ["Bleu", "3", "10", "3/10"],
        ["Vert", "3", "10", "3/10"],
      ];

      return {
        text: "D’après le tableau, quelle couleur a la plus grande probabilité d’être tirée ?",
        format: "qcm",
        choices: ["Rouge", "Bleu", "Vert", "elles sont égales"],
        expected: ["Rouge"],
        comparator: "mcq_exact",
        explanation:
          "Définition : comparer des probabilités permet de savoir quel événement a le plus de chances de se produire.\n\n" +
          "Méthode : on compare les fractions du tableau.\n\n" +
          "Calcul : Rouge vaut 4/10, Bleu vaut 3/10 et Vert vaut 3/10.\n\n" +
          "Conclusion : Rouge a la plus grande probabilité.",
        canvas: tableauCanvas(
          ["Couleur", "Favorables", "Total", "Probabilité"],
          lignes,
          [[0, 3]]
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "5e_proba_defis_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "probabilites",
    microId: "proba_defis",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi une probabilité égale à 0 correspond à un événement impossible.",
    format: "open",
    expected: ["0", "impossible", "aucun"],
    comparator: "contains_keyword",
    hint: "Une probabilité de 0 signifie qu’il n’y a aucun cas favorable.",
    explanation:
      "Définition : une probabilité égale à 0 correspond à un événement impossible.\n\n" +
      "Méthode : on regarde le nombre de cas favorables.\n\n" +
      "Calcul : s’il n’y a aucun cas favorable, alors la probabilité vaut 0.\n\n" +
      "Conclusion : une probabilité de 0 signifie que l’événement ne peut pas se produire.",
    tags: ["probabilites", "defi", "open", "impossible"],
  },
];