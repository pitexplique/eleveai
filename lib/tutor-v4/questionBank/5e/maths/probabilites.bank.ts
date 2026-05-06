// lib/tutor-v4/question-banks/maths/5e/probabilites.bank.ts

import type {
  TutorBankItemV4,
  CanvasProbabilitesData,
} from "@/lib/tutor-v4/types";

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

function rawFraction(n: number, d: number) {
  return `${n}/${d}`;
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
  const safeSurligne = surligne?.filter(isDiceFace);

  return {
    kind: "probabilites",
    variant: "de",
    de: {
      faces: [1, 2, 3, 4, 5, 6],
      surligne: safeSurligne,
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
    tableau: {
      entetes,
      lignes,
      casesSurlignees,
    },
  };
}

export const probabilitesBank: TutorBankItemV4[] = [
  // =========================
  // PROBA_VOCABULAIRE
  // =========================
  {
    kind: "fixed",
    id: "proba_vocabulaire_fixed_1",
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
      "est toujours égal à 0",
      "est toujours égal à 1",
    ],
    expected: ["n’est pas connu à l’avance"],
    comparator: "mcq_exact",
    hint: "Aléatoire signifie qu’on ne peut pas prévoir le résultat avec certitude.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise entre 0 et 1.\n\n" +
          "Méthode : on compte les issues favorables et les issues possibles, puis on forme le quotient.\n\nCalcul : " +
          ("Une expérience aléatoire est une expérience dont on ne peut pas connaître le résultat à l’avance avec certitude.") +
          "\n\nConclusion : la probabilité obtenue répond à la question.",
    tags: ["probabilites", "vocabulaire", "qcm"],
  },
  {
    kind: "fixed",
    id: "proba_vocabulaire_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "probabilites",
    microId: "proba_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Lorsqu’on lance un dé, obtenir 4 est...",
    format: "qcm",
    choices: ["une issue", "une moyenne", "une fréquence", "un tableau"],
    expected: ["une issue"],
    comparator: "mcq_exact",
    hint: "Une issue est un résultat possible.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise entre 0 et 1.\n\n" +
          "Méthode : on compte les issues favorables et les issues possibles, puis on forme le quotient.\n\nCalcul : " +
          ("Obtenir 4 est un résultat possible du lancer de dé : c’est une issue.") +
          "\n\nConclusion : la probabilité obtenue répond à la question.",
    tags: ["probabilites", "vocabulaire", "issue", "qcm"],
    canvas: deCanvas([4]),
  },
  {
    kind: "fixed",
    id: "proba_vocabulaire_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "probabilites",
    microId: "proba_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Lorsqu’on lance un dé, « obtenir un nombre pair » est...",
    format: "qcm",
    choices: ["un événement", "une seule issue", "une moyenne", "un coefficient"],
    expected: ["un événement"],
    comparator: "mcq_exact",
    hint: "Cet événement regroupe plusieurs issues : 2, 4 et 6.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise entre 0 et 1.\n\n" +
          "Méthode : on compte les issues favorables et les issues possibles, puis on forme le quotient.\n\nCalcul : " +
          ("Un événement peut regrouper plusieurs issues. Ici, « obtenir un nombre pair » correspond aux issues 2, 4 et 6.") +
          "\n\nConclusion : la probabilité obtenue répond à la question.",
    tags: ["probabilites", "vocabulaire", "evenement", "qcm"],
    canvas: deCanvas([2, 4, 6]),
  },
  {
    kind: "fixed",
    id: "proba_vocabulaire_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "probabilites",
    microId: "proba_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Explique avec tes mots ce qu’est une expérience aléatoire.",
    format: "open",
    expected: ["résultat", "avance", "hasard"],
    comparator: "contains_keyword",
    hint: "On ne peut pas savoir avec certitude le résultat avant de faire l’expérience.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise entre 0 et 1.\n\n" +
          "Méthode : on compte les issues favorables et les issues possibles, puis on forme le quotient.\n\nCalcul : " +
          ("Une expérience aléatoire est une expérience dont on ne connaît pas le résultat à l’avance.") +
          "\n\nConclusion : la probabilité obtenue répond à la question.",
    tags: ["probabilites", "vocabulaire", "open"],
  },
  {
    kind: "fixed",
    id: "proba_vocabulaire_open_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "probabilites",
    microId: "proba_vocabulaire",
    difficulty: 3,
    theme: "neutral",
    text: "Explique la différence entre une issue et un événement.",
    format: "open",
    expected: ["issue", "résultat", "événement", "plusieurs"],
    comparator: "contains_keyword",
    hint: "Une issue est un résultat possible ; un événement peut contenir une ou plusieurs issues.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise entre 0 et 1.\n\n" +
          "Méthode : on compte les issues favorables et les issues possibles, puis on forme le quotient.\n\nCalcul : " +
          ("Une issue est un résultat possible. Un événement est une condition qui peut regrouper une ou plusieurs issues.") +
          "\n\nConclusion : la probabilité obtenue répond à la question.",
    tags: ["probabilites", "vocabulaire", "open"],
  },

  // =========================
  // PROBA_ISSUES
  // =========================
  {
    kind: "fixed",
    id: "proba_issues_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "probabilites",
    microId: "proba_issues",
    difficulty: 1,
    theme: "neutral",
    text: "Combien y a-t-il d’issues possibles lorsqu’on lance un dé équilibré à 6 faces ?",
    format: "qcm",
    choices: ["2", "4", "6", "12"],
    expected: ["6"],
    comparator: "mcq_exact",
    hint: "Un dé classique a 6 faces.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise entre 0 et 1.\n\n" +
          "Méthode : on compte les issues favorables et les issues possibles, puis on forme le quotient.\n\nCalcul : " +
          ("Les issues possibles sont 1, 2, 3, 4, 5 et 6 : il y en a 6.") +
          "\n\nConclusion : la probabilité obtenue répond à la question.",
    tags: ["probabilites", "issues", "de", "qcm"],
    canvas: deCanvas(),
  },
  {
    kind: "fixed",
    id: "proba_issues_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "probabilites",
    microId: "proba_issues",
    difficulty: 2,
    theme: "neutral",
    text: "On lance un dé. Combien y a-t-il d’issues favorables à l’événement « obtenir un nombre pair » ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Liste les nombres pairs du dé.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise entre 0 et 1.\n\n" +
          "Méthode : on compte les issues favorables et les issues possibles, puis on forme le quotient.\n\nCalcul : " +
          ("Les issues favorables sont 2, 4 et 6. Il y en a donc 3.") +
          "\n\nConclusion : la probabilité obtenue répond à la question.",
    tags: ["probabilites", "issues", "de", "pair"],
    canvas: deCanvas([2, 4, 6]),
  },
  {
    kind: "fixed",
    id: "proba_issues_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "probabilites",
    microId: "proba_issues",
    difficulty: 2,
    theme: "neutral",
    text: "On tire une bille dans ce sac. Combien y a-t-il de billes au total ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Compte toutes les billes.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise entre 0 et 1.\n\n" +
          "Méthode : on compte les issues favorables et les issues possibles, puis on forme le quotient.\n\nCalcul : " +
          ("Le sac contient 3 billes rouges et 2 billes bleues, donc 5 billes au total.") +
          "\n\nConclusion : la probabilité obtenue répond à la question.",
    tags: ["probabilites", "issues", "billes", "canvas"],
    canvas: billesCanvas([
      { couleur: couleurs.rouge, label: "R" },
      { couleur: couleurs.rouge, label: "R" },
      { couleur: couleurs.rouge, label: "R" },
      { couleur: couleurs.bleu, label: "B" },
      { couleur: couleurs.bleu, label: "B" },
    ]),
  },
  {
    kind: "fixed",
    id: "proba_issues_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "probabilites",
    microId: "proba_issues",
    difficulty: 2,
    theme: "neutral",
    text: "On lance un dé. Quelles sont les issues favorables à « obtenir un nombre strictement supérieur à 4 » ?",
    format: "qcm",
    choices: ["5 et 6", "4 et 5", "1, 2, 3 et 4", "6 seulement"],
    expected: ["5 et 6"],
    comparator: "mcq_exact",
    hint: "Supérieur à 4 signifie strictement plus grand que 4.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise entre 0 et 1.\n\n" +
          "Méthode : on compte les issues favorables et les issues possibles, puis on forme le quotient.\n\nCalcul : " +
          ("Les nombres strictement supérieurs à 4 sur un dé sont 5 et 6.") +
          "\n\nConclusion : la probabilité obtenue répond à la question.",
    tags: ["probabilites", "issues", "qcm", "piege"],
    canvas: deCanvas([5, 6]),
  },
  {
    kind: "fixed",
    id: "proba_issues_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "probabilites",
    microId: "proba_issues",
    difficulty: 2,
    theme: "neutral",
    text: "On lance un dé équilibré. Explique pourquoi il y a 6 issues possibles.",
    format: "open",
    expected: ["1", "2", "3", "4", "5", "6"],
    comparator: "contains_keyword",
    hint: "Liste les résultats possibles du dé.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise entre 0 et 1.\n\n" +
          "Méthode : on compte les issues favorables et les issues possibles, puis on forme le quotient.\n\nCalcul : " +
          ("Les issues possibles sont 1, 2, 3, 4, 5 et 6. Il y a donc 6 issues possibles.") +
          "\n\nConclusion : la probabilité obtenue répond à la question.",
    tags: ["probabilites", "issues", "open"],
    canvas: deCanvas(),
  },
  {
    kind: "template",
    id: "proba_issues_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "probabilites",
    microId: "proba_issues",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte tous les objets possibles.",
    tags: ["probabilites", "issues", "billes", "template"],
    generate: () => {
      const rouges = randomInt(2, 5);
      const bleues = randomInt(1, 4);
      const total = rouges + bleues;

      return {
        text: `Un sac contient ${rouges} billes rouges et ${bleues} billes bleues. Combien y a-t-il de billes au total ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: "Définition : une probabilité mesure la chance qu’un événement se produise entre 0 et 1.\n\n" +
          "Méthode : on compte les issues favorables et les issues possibles, puis on forme le quotient.\n\nCalcul : " +
          (`Il y a ${rouges} + ${bleues} = ${total} billes au total.`) +
          "\n\nConclusion : la probabilité obtenue répond à la question.",
        canvas: billesCanvas([
          ...Array.from({ length: rouges }, () => ({
            couleur: couleurs.rouge,
            label: "R",
          })),
          ...Array.from({ length: bleues }, () => ({
            couleur: couleurs.bleu,
            label: "B",
          })),
        ]),
      };
    },
  },

  // =========================
  // PROBA_EQUIPROBABILITE
  // =========================
  {
    kind: "fixed",
    id: "proba_equiprobabilite_fixed_1",
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
      "Définition : une probabilité mesure la chance qu’un événement se produise entre 0 et 1.\n\n" +
          "Méthode : on compte les issues favorables et les issues possibles, puis on forme le quotient.\n\nCalcul : " +
          ("Oui. Chaque face a la même probabilité d’apparaître : la situation est équiprobable.") +
          "\n\nConclusion : la probabilité obtenue répond à la question.",
    tags: ["probabilites", "equiprobabilite", "de"],
    canvas: deCanvas(),
  },
  {
    kind: "fixed",
    id: "proba_equiprobabilite_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "probabilites",
    microId: "proba_equiprobabilite",
    difficulty: 3,
    theme: "neutral",
    text: "Cette roue correspond-elle à une situation d’équiprobabilité ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Regarde si toutes les zones ont le même poids.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise entre 0 et 1.\n\n" +
          "Méthode : on compte les issues favorables et les issues possibles, puis on forme le quotient.\n\nCalcul : " +
          ("Non. Le secteur rouge a un poids 3, alors que le secteur bleu a un poids 1. Les issues ne sont pas équiprobables.") +
          "\n\nConclusion : la probabilité obtenue répond à la question.",
    tags: ["probabilites", "equiprobabilite", "roue", "piege"],
    canvas: roueCanvas([
      { label: "Rouge", poids: 3, couleur: couleurs.rouge },
      { label: "Bleu", poids: 1, couleur: couleurs.bleu },
    ]),
  },
  {
    kind: "fixed",
    id: "proba_equiprobabilite_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "probabilites",
    microId: "proba_equiprobabilite",
    difficulty: 3,
    theme: "neutral",
    text: "Dans ce sac, tirer rouge et tirer bleu sont-ils équiprobables ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Compte les billes de chaque couleur.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise entre 0 et 1.\n\n" +
          "Méthode : on compte les issues favorables et les issues possibles, puis on forme le quotient.\n\nCalcul : " +
          ("Il y a 4 billes rouges et 2 billes bleues. Les couleurs n’ont donc pas la même probabilité.") +
          "\n\nConclusion : la probabilité obtenue répond à la question.",
    tags: ["probabilites", "equiprobabilite", "billes", "piege"],
    canvas: billesCanvas([
      ...Array.from({ length: 4 }, () => ({ couleur: couleurs.rouge, label: "R" })),
      ...Array.from({ length: 2 }, () => ({ couleur: couleurs.bleu, label: "B" })),
    ]),
  },
  {
    kind: "fixed",
    id: "proba_equiprobabilite_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "probabilites",
    microId: "proba_equiprobabilite",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi une roue avec 3 secteurs rouges et 1 secteur bleu n’est pas équiprobable.",
    format: "open",
    expected: ["rouge", "bleu", "3", "1", "même chance"],
    comparator: "contains_keyword",
    hint: "Les couleurs ne sont pas présentes en même quantité.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise entre 0 et 1.\n\n" +
          "Méthode : on compte les issues favorables et les issues possibles, puis on forme le quotient.\n\nCalcul : " +
          ("Le rouge apparaît 3 fois et le bleu 1 fois. Les deux couleurs n’ont pas la même chance d’être obtenues.") +
          "\n\nConclusion : la probabilité obtenue répond à la question.",
    tags: ["probabilites", "equiprobabilite", "open", "raisonnement"],
    canvas: roueCanvas([
      { label: "Rouge", poids: 3, couleur: couleurs.rouge },
      { label: "Bleu", poids: 1, couleur: couleurs.bleu },
    ]),
  },
  {
    kind: "template",
    id: "proba_equiprobabilite_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "probabilites",
    microId: "proba_equiprobabilite",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde si toutes les zones ont le même poids.",
    tags: ["probabilites", "equiprobabilite", "roue", "template"],
    generate: () => {
      const equal = randomChoice([true, false]);

      const segments = equal
        ? [
            { label: "A", poids: 1, couleur: couleurs.rouge },
            { label: "B", poids: 1, couleur: couleurs.bleu },
            { label: "C", poids: 1, couleur: couleurs.vert },
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
        explanation: "Définition : une probabilité mesure la chance qu’un événement se produise entre 0 et 1.\n\n" +
          "Méthode : on compte les issues favorables et les issues possibles, puis on forme le quotient.\n\nCalcul : " +
          (equal
          ? "Oui. Toutes les zones ont le même poids."
          : "Non. Les zones n’ont pas toutes le même poids.") +
          "\n\nConclusion : la probabilité obtenue répond à la question.",
        canvas: roueCanvas(segments),
      };
    },
  },

  // =========================
  // PROBA_CALCULER
  // =========================
  {
    kind: "fixed",
    id: "proba_calculer_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "probabilites",
    microId: "proba_calculer",
    difficulty: 2,
    theme: "neutral",
    text: "On lance un dé équilibré. Quelle est la probabilité d’obtenir un 3 ?",
    format: "short",
    expected: ["1/6"],
    comparator: "fraction_decimal_equivalent",
    hint: "Il y a 1 issue favorable sur 6 issues possibles.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise entre 0 et 1.\n\n" +
          "Méthode : on compte les issues favorables et les issues possibles, puis on forme le quotient.\n\nCalcul : " +
          ("Obtenir 3 correspond à une seule issue favorable parmi 6 issues possibles. La probabilité est donc 1/6.") +
          "\n\nConclusion : la probabilité obtenue répond à la question.",
    tags: ["probabilites", "calcul", "de"],
    canvas: deCanvas([3]),
  },
  {
    kind: "fixed",
    id: "proba_calculer_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "probabilites",
    microId: "proba_calculer",
    difficulty: 2,
    theme: "neutral",
    text: "On lance un dé équilibré. Quelle est la probabilité d’obtenir un nombre pair ?",
    format: "short",
    expected: ["3/6", "1/2"],
    comparator: "fraction_decimal_equivalent",
    hint: "Les nombres pairs sont 2, 4 et 6.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise entre 0 et 1.\n\n" +
          "Méthode : on compte les issues favorables et les issues possibles, puis on forme le quotient.\n\nCalcul : " +
          ("Les issues favorables sont 2, 4 et 6 : 3 issues sur 6. Donc la probabilité est 3/6 = 1/2.") +
          "\n\nConclusion : la probabilité obtenue répond à la question.",
    tags: ["probabilites", "calcul", "de", "pair"],
    canvas: deCanvas([2, 4, 6]),
  },
  {
    kind: "fixed",
    id: "proba_calculer_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "probabilites",
    microId: "proba_calculer",
    difficulty: 3,
    theme: "neutral",
    text: "Dans ce sac, quelle est la probabilité de tirer une bille rouge ?",
    format: "short",
    expected: ["3/5"],
    comparator: "fraction_decimal_equivalent",
    hint: "Compte les billes rouges et le total.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise entre 0 et 1.\n\n" +
          "Méthode : on compte les issues favorables et les issues possibles, puis on forme le quotient.\n\nCalcul : " +
          ("Il y a 3 billes rouges sur 5 billes au total. La probabilité est donc 3/5.") +
          "\n\nConclusion : la probabilité obtenue répond à la question.",
    tags: ["probabilites", "calcul", "billes"],
    canvas: billesCanvas([
      ...Array.from({ length: 3 }, () => ({ couleur: couleurs.rouge, label: "R" })),
      ...Array.from({ length: 2 }, () => ({ couleur: couleurs.bleu, label: "B" })),
    ]),
  },
  {
    kind: "fixed",
    id: "proba_calculer_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "probabilites",
    microId: "proba_calculer",
    difficulty: 3,
    theme: "neutral",
    text: "On lance un dé. Quelle est la probabilité d’obtenir un nombre strictement supérieur à 4 ?",
    format: "qcm",
    choices: ["1/6", "2/6", "4/6", "5/6"],
    expected: ["2/6"],
    comparator: "mcq_exact",
    hint: "Les nombres strictement supérieurs à 4 sont 5 et 6.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise entre 0 et 1.\n\n" +
          "Méthode : on compte les issues favorables et les issues possibles, puis on forme le quotient.\n\nCalcul : " +
          ("Les issues favorables sont 5 et 6 : 2 issues sur 6. La probabilité est donc 2/6.") +
          "\n\nConclusion : la probabilité obtenue répond à la question.",
    tags: ["probabilites", "calcul", "qcm", "piege"],
    canvas: deCanvas([5, 6]),
  },
  {
    kind: "fixed",
    id: "proba_calculer_tableau_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "probabilites",
    microId: "proba_calculer",
    difficulty: 3,
    theme: "neutral",
    text: "D’après le tableau, quelle est la probabilité de tirer une bille bleue ?",
    format: "short",
    expected: ["2/6", "1/3"],
    comparator: "fraction_decimal_equivalent",
    hint: "Probabilité = effectif favorable / effectif total.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise entre 0 et 1.\n\n" +
          "Méthode : on compte les issues favorables et les issues possibles, puis on forme le quotient.\n\nCalcul : " +
          ("Il y a 2 billes bleues sur 6 billes au total. La probabilité est donc 2/6 = 1/3.") +
          "\n\nConclusion : la probabilité obtenue répond à la question.",
    tags: ["probabilites", "calcul", "tableau"],
    canvas: tableauCanvas(
      ["Couleur", "Rouge", "Bleu", "Vert", "Total"],
      [["Effectif", "3", "2", "1", "6"]],
      [
        [0, 2],
        [0, 4],
      ]
    ),
  },
  {
    kind: "fixed",
    id: "proba_calculer_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "probabilites",
    microId: "proba_calculer",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi la probabilité d’obtenir un nombre pair avec un dé équilibré est 3/6.",
    format: "open",
    expected: ["2", "4", "6", "3", "6"],
    comparator: "contains_keyword",
    hint: "Compte les nombres pairs, puis le nombre total d’issues.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise entre 0 et 1.\n\n" +
          "Méthode : on compte les issues favorables et les issues possibles, puis on forme le quotient.\n\nCalcul : " +
          ("Les nombres pairs sont 2, 4 et 6 : il y a 3 issues favorables sur 6 issues possibles. La probabilité est donc 3/6.") +
          "\n\nConclusion : la probabilité obtenue répond à la question.",
    tags: ["probabilites", "calcul", "de", "open"],
    canvas: deCanvas([2, 4, 6]),
  },
  {
    kind: "template",
    id: "proba_calculer_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "probabilites",
    microId: "proba_calculer",
    difficulty: 3,
    theme: "neutral",
    hint: "Probabilité = cas favorables / cas possibles.",
    tags: ["probabilites", "calcul", "billes", "template"],
    generate: () => {
      const rouges = randomInt(1, 5);
      const bleues = randomInt(1, 5);
      const total = rouges + bleues;
      const result = rawFraction(rouges, total);

      return {
        text: `Un sac contient ${rouges} bille(s) rouge(s) et ${bleues} bille(s) bleue(s). Quelle est la probabilité de tirer une bille rouge ?`,
        format: "qcm",
        choices: makeChoices(result, [
          rawFraction(bleues, total),
          rawFraction(rouges, bleues),
          rawFraction(total, rouges),
        ]),
        expected: [result],
        comparator: "mcq_exact",
        explanation: "Définition : une probabilité mesure la chance qu’un événement se produise entre 0 et 1.\n\n" +
          "Méthode : on compte les issues favorables et les issues possibles, puis on forme le quotient.\n\nCalcul : " +
          (`Il y a ${rouges} bille(s) rouge(s) sur ${total} bille(s) au total, donc la probabilité est ${result}.`) +
          "\n\nConclusion : la probabilité obtenue répond à la question.",
        canvas: billesCanvas([
          ...Array.from({ length: rouges }, () => ({
            couleur: couleurs.rouge,
            label: "R",
          })),
          ...Array.from({ length: bleues }, () => ({
            couleur: couleurs.bleu,
            label: "B",
          })),
        ]),
      };
    },
  },
  {
    kind: "template",
    id: "proba_calculer_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "probabilites",
    microId: "proba_calculer",
    difficulty: 4,
    theme: "neutral",
    hint: "Compte les faces qui vérifient la condition.",
    tags: ["probabilites", "calcul", "de", "template", "piege"],
    generate: () => {

                      const seuil = randomChoice([2, 3, 4] as const);

                      const favorables = [1, 2, 3, 4, 5, 6].filter(
                        (n): n is 1 | 2 | 3 | 4 | 5 | 6 => n > seuil
                      );

                      const result = rawFraction(favorables.length, 6);

                      return {
                        text: `On lance un dé. Quelle est la probabilité d’obtenir un nombre strictement supérieur à ${seuil} ?`,
                        format: "short",
                        expected: [result, fraction(favorables.length, 6)],
                        comparator: "fraction_decimal_equivalent",
                        explanation: "Définition : une probabilité mesure la chance qu’un événement se produise entre 0 et 1.\n\n" +
          "Méthode : on compte les issues favorables et les issues possibles, puis on forme le quotient.\n\nCalcul : " +
          (`Les issues favorables sont ${favorables.join(
                          ", "
                        )} : il y en a ${favorables.length} sur 6. La probabilité est donc ${result}.`) +
          "\n\nConclusion : la probabilité obtenue répond à la question.",
                        canvas: deCanvas(favorables),
                      };
                    },
  },

  // =========================
  // PROBA_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "proba_defis_fixed_1",
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
    hint: "Une probabilité est comprise entre 0 et 1.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise entre 0 et 1.\n\n" +
          "Méthode : on compte les issues favorables et les issues possibles, puis on forme le quotient.\n\nCalcul : " +
          ("Non. Une probabilité est toujours comprise entre 0 et 1.") +
          "\n\nConclusion : la probabilité obtenue répond à la question.",
    tags: ["probabilites", "defi", "bornes"],
  },
  {
    kind: "fixed",
    id: "proba_defis_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "probabilites",
    microId: "proba_defis",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : « Sur un dé, obtenir un nombre pair a une probabilité de 2/6 car il y a le mot pair. » Explique son erreur.",
    format: "open",
    expected: ["2", "4", "6", "3/6", "erreur"],
    comparator: "contains_keyword",
    hint: "Il faut compter les issues favorables.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise entre 0 et 1.\n\n" +
          "Méthode : on compte les issues favorables et les issues possibles, puis on forme le quotient.\n\nCalcul : " +
          ("Les issues favorables sont 2, 4 et 6 : il y en a 3. La probabilité est donc 3/6, pas 2/6.") +
          "\n\nConclusion : la probabilité obtenue répond à la question.",
    tags: ["probabilites", "defi", "open", "erreur", "piege"],
    canvas: deCanvas([2, 4, 6]),
  },
  {
    kind: "fixed",
    id: "proba_defis_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "probabilites",
    microId: "proba_defis",
    difficulty: 5,
    theme: "reunion",
    text: "Dans un panier de fruits à La Réunion, il y a 4 mangues, 3 ananas et 2 letchis. On prend un fruit au hasard. Quelle est la probabilité de prendre une mangue ?",
    format: "short",
    expected: ["4/9"],
    comparator: "fraction_decimal_equivalent",
    hint: "Compte les mangues puis le total de fruits.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise entre 0 et 1.\n\n" +
          "Méthode : on compte les issues favorables et les issues possibles, puis on forme le quotient.\n\nCalcul : " +
          ("Il y a 4 mangues sur 9 fruits au total. La probabilité est donc 4/9.") +
          "\n\nConclusion : la probabilité obtenue répond à la question.",
    tags: ["probabilites", "defi", "reunion", "billes"],
    canvas: billesCanvas([
      ...Array.from({ length: 4 }, () => ({
        label: "M",
        couleur: couleurs.jaune,
      })),
      ...Array.from({ length: 3 }, () => ({
        label: "A",
        couleur: couleurs.vert,
      })),
      ...Array.from({ length: 2 }, () => ({
        label: "L",
        couleur: couleurs.rouge,
      })),
    ]),
  },
  {
    kind: "fixed",
    id: "proba_defis_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "probabilites",
    microId: "proba_defis",
    difficulty: 5,
    theme: "neutral",
    text: "Sur cette roue, quelle issue est la plus probable ?",
    format: "qcm",
    choices: ["Rouge", "Bleu", "Vert", "Elles sont toutes aussi probables"],
    expected: ["Rouge"],
    comparator: "mcq_exact",
    hint: "Regarde le secteur qui a le plus grand poids.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise entre 0 et 1.\n\n" +
          "Méthode : on compte les issues favorables et les issues possibles, puis on forme le quotient.\n\nCalcul : " +
          ("Le secteur Rouge a le poids le plus grand, donc c’est l’issue la plus probable.") +
          "\n\nConclusion : la probabilité obtenue répond à la question.",
    tags: ["probabilites", "defi", "roue", "piege"],
    canvas: roueCanvas([
      { label: "Rouge", poids: 3, couleur: couleurs.rouge },
      { label: "Bleu", poids: 1, couleur: couleurs.bleu },
      { label: "Vert", poids: 1, couleur: couleurs.vert },
    ]),
  },
  {
    kind: "template",
    id: "proba_defis_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "probabilites",
    microId: "proba_defis",
    difficulty: 5,
    theme: "reunion",
    hint: "Compte les cas favorables et les cas possibles.",
    tags: ["probabilites", "reunion", "defi", "template"],
    generate: () => {
      const mangue = randomInt(2, 5);
      const ananas = randomInt(1, 4);
      const letchis = randomInt(1, 4);
      const total = mangue + ananas + letchis;
      const result = rawFraction(mangue, total);

      return {
        text: `Dans un panier de fruits à La Réunion, il y a ${mangue} mangue(s), ${ananas} ananas et ${letchis} letchi(s). On prend un fruit au hasard. Quelle est la probabilité de prendre une mangue ?`,
        format: "qcm",
        choices: makeChoices(result, [
          rawFraction(ananas, total),
          rawFraction(letchis, total),
          rawFraction(mangue, ananas),
        ]),
        expected: [result],
        comparator: "mcq_exact",
        explanation: "Définition : une probabilité mesure la chance qu’un événement se produise entre 0 et 1.\n\n" +
          "Méthode : on compte les issues favorables et les issues possibles, puis on forme le quotient.\n\nCalcul : " +
          (`Il y a ${mangue} mangue(s) sur ${total} fruits au total, donc la probabilité est ${result}.`) +
          "\n\nConclusion : la probabilité obtenue répond à la question.",
        canvas: billesCanvas([
          ...Array.from({ length: mangue }, () => ({
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
        ]),
      };
    },
  },
  {
    kind: "template",
    id: "proba_defis_open_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "probabilites",
    microId: "proba_defis",
    difficulty: 5,
    theme: "neutral",
    hint: "Compare les poids des secteurs.",
    tags: ["probabilites", "roue", "defi", "open", "template"],
    generate: () => {
      return {
        text: "Explique pourquoi Rouge est l’issue la plus probable sur cette roue.",
        format: "open",
        expected: ["rouge", "poids", "plus grand"],
        comparator: "contains_keyword",
        explanation:
          "Définition : une probabilité mesure la chance qu’un événement se produise entre 0 et 1.\n\n" +
          "Méthode : on compte les issues favorables et les issues possibles, puis on forme le quotient.\n\nCalcul : " +
          ("Le secteur Rouge a un poids 3, alors que Bleu et Vert ont chacun un poids 1. Rouge occupe donc la plus grande partie de la roue.") +
          "\n\nConclusion : la probabilité obtenue répond à la question.",
        canvas: roueCanvas([
          { label: "Rouge", poids: 3, couleur: couleurs.rouge },
          { label: "Bleu", poids: 1, couleur: couleurs.bleu },
          { label: "Vert", poids: 1, couleur: couleurs.vert },
        ]),
      };
    },
  },
];