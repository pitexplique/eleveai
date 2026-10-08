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

function makeChoices(correct: string, wrongs: readonly string[]) {
  // Jamais deux fois la même ligne. Un gabarit dont le piège coïncide avec la
  // bonne réponse (les coordonnées inversées quand x = y, un arrondi égal à la
  // valeur de départ…) affichait la même proposition deux fois, et l'élève
  // voyait deux réponses justes.
  // ⚠️ 04/08/2026 — la version précédente dédoublonnait PUIS coupait à quatre :
  // avec cinq distracteurs, le mélange pouvait renvoyer la bonne réponse en
  // cinquième position et le découpage l'emportait. L'élève ne pouvait alors
  // pas réussir, et rien ne le signalait. On met désormais la bonne réponse de
  // côté, on tire trois distracteurs, puis on mélange l'ensemble.
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
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

function expl(calcul: string) {
  return (
    "Définition : une probabilité mesure la chance qu’un événement se produise entre 0 et 1.\n\n" +
    "Méthode : on compte les issues favorables et les issues possibles, puis on forme le quotient.\n\nCalcul : " +
    calcul +
    "\n\nConclusion : la probabilité obtenue répond à la question."
  );
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
    notionId: "proba_experience",
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
    tags: ["proba_experience", "vocabulaire", "qcm"],
  },
  {
    kind: "fixed",
    id: "proba_vocabulaire_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
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
    tags: ["proba_experience", "vocabulaire", "issue", "qcm"],
    canvas: deCanvas([4]),
  },
  {
    kind: "fixed",
    id: "proba_vocabulaire_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
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
    tags: ["proba_experience", "vocabulaire", "evenement", "qcm"],
    canvas: deCanvas([2, 4, 6]),
  },
  {
    kind: "fixed",
    id: "proba_vocabulaire_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique avec tes mots ce qu’est une expérience aléatoire ».
    text: "Laquelle de ces expériences est aléatoire ?",
    format: "qcm",
    choices: ["lancer une pièce", "compter les élèves de la classe", "mesurer sa table", "peser un sac de 1 kg"],
    expected: ["lancer une pièce"],
    comparator: "mcq_exact",
    hint: "Aléatoire : on ne peut pas savoir le résultat à l’avance.",
    explanation: expl("Quand on lance une pièce, on ne sait pas à l’avance si on aura pile ou face : c’est le hasard. Compter, mesurer, peser donnent un résultat qu’on peut retrouver à chaque fois."),
    tags: ["proba_experience", "vocabulaire", "qcm"],
  },
  {
    kind: "fixed",
    id: "proba_vocabulaire_open_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique la différence entre une issue et un événement ».
    text: "On lance un dé. Combien d’issues réalisent l’événement « obtenir un nombre impair » ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Écris les nombres impairs du dé.",
    explanation: expl("Les nombres impairs du dé sont 1, 3 et 5. L’événement « obtenir un nombre impair » regroupe donc 3 issues."),
    tags: ["proba_experience", "vocabulaire", "short"],
    canvas: deCanvas([1, 3, 5]),
  },

  // =========================
  // PROBA_ISSUES
  // =========================
  {
    kind: "fixed",
    id: "proba_issue_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
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
    tags: ["proba_experience", "issue", "de", "qcm"],
    canvas: deCanvas(),
  },
  {
    kind: "fixed",
    id: "proba_issue_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
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
    tags: ["proba_experience", "issue", "de", "pair"],
    canvas: deCanvas([2, 4, 6]),
  },
  {
    kind: "fixed",
    id: "proba_issue_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
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
    tags: ["proba_experience", "issue", "billes", "canvas"],
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
    id: "proba_issue_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
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
    tags: ["proba_experience", "issue", "qcm", "piege"],
    canvas: deCanvas([5, 6]),
  },
  {
    kind: "fixed",
    id: "proba_issue_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 2,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique pourquoi il y a 6 issues possibles » (dé).
    text: "On fait tourner une roue numérotée de 1 à 8. Combien y a-t-il d’issues possibles ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Liste les numéros possibles.",
    explanation: expl("La roue peut s’arrêter sur 1, 2, 3, 4, 5, 6, 7 ou 8. Il y a donc 8 issues possibles."),
    tags: ["proba_experience", "issue", "short"],
    canvas: deCanvas(),
  },
  {
    kind: "template",
    id: "proba_issue_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte tous les objets possibles.",
    tags: ["proba_experience", "issue", "billes", "template"],
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
    notionId: "proba_experience",
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
    tags: ["proba_experience", "equiprobabilite", "de"],
    canvas: deCanvas(),
  },
  {
    kind: "fixed",
    id: "proba_equiprobabilite_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
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
    tags: ["proba_experience", "equiprobabilite", "roue", "piege"],
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
    notionId: "proba_experience",
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
    tags: ["proba_experience", "equiprobabilite", "billes", "piege"],
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
    notionId: "proba_experience",
    microId: "proba_equiprobabilite",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique pourquoi une roue 3 rouges / 1 bleu n’est pas équiprobable ».
    text: "La roue a 3 secteurs rouges et 1 secteur bleu, tous de même taille. Quelle couleur a le plus de chances de sortir ?",
    format: "qcm",
    choices: ["Rouge", "Bleu", "autant l’une que l’autre"],
    expected: ["Rouge"],
    comparator: "mcq_exact",
    hint: "Compte les secteurs de chaque couleur.",
    explanation: expl("Le rouge occupe 3 secteurs sur 4, le bleu 1 seul. Rouge a plus de chances de sortir : la roue n’est pas équiprobable."),
    tags: ["proba_experience", "equiprobabilite", "qcm", "raisonnement"],
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
    notionId: "proba_experience",
    microId: "proba_equiprobabilite",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde si toutes les zones ont le même poids.",
    tags: ["proba_experience", "equiprobabilite", "roue", "template"],
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
    notionId: "proba_experience",
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
    tags: ["proba_experience", "calcul", "de"],
    canvas: deCanvas([3]),
  },
  {
    kind: "fixed",
    id: "proba_calculer_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
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
    tags: ["proba_experience", "calcul", "de", "pair"],
    canvas: deCanvas([2, 4, 6]),
  },
  {
    kind: "fixed",
    id: "proba_calculer_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
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
    tags: ["proba_experience", "calcul", "billes"],
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
    notionId: "proba_experience",
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
    tags: ["proba_experience", "calcul", "qcm", "piege"],
    canvas: deCanvas([5, 6]),
  },
  {
    kind: "fixed",
    id: "proba_calculer_tableau_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
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
    tags: ["proba_experience", "calcul", "tableau"],
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
    notionId: "proba_experience",
    microId: "proba_calculer",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique pourquoi P(nombre pair) = 3/6 ».
    text: "On lance un dé équilibré. Quelle est la probabilité d’obtenir un nombre impair ?",
    format: "short",
    expected: ["3/6", "1/2", "0,5"],
    comparator: "fraction_decimal_equivalent",
    hint: "Compte les nombres impairs, puis le nombre total d’issues.",
    explanation: expl("Les nombres impairs sont 1, 3 et 5 : 3 issues favorables sur 6 issues possibles. La probabilité est 3/6 = 1/2."),
    tags: ["proba_experience", "calcul", "de", "short"],
    canvas: deCanvas([1, 3, 5]),
  },
  {
    kind: "template",
    id: "proba_calculer_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_calculer",
    difficulty: 3,
    theme: "neutral",
    hint: "Probabilité = cas favorables / cas possibles.",
    tags: ["proba_experience", "calcul", "billes", "template"],
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
    notionId: "proba_experience",
    microId: "proba_calculer",
    difficulty: 4,
    theme: "neutral",
    hint: "Compte les faces qui vérifient la condition.",
    tags: ["proba_experience", "calcul", "de", "template", "piege"],
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
    id: "proba_defi_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
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
    tags: ["proba_experience", "defi", "bornes"],
  },
  {
    kind: "fixed",
    id: "proba_defi_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « … 2/6 car il y a le mot pair. Explique son erreur. »
    text: "Un élève dit : « Avec un dé, la probabilité d’obtenir un nombre pair est 2/6. » Quelle est la bonne probabilité ?",
    format: "qcm",
    choices: ["3/6", "2/6", "1/6", "6/3"],
    expected: ["3/6"],
    comparator: "mcq_exact",
    hint: "Compte les nombres pairs du dé : 2, 4, …",
    explanation: expl("Les nombres pairs du dé sont 2, 4 et 6 : il y en a 3, pas 2. La probabilité est 3/6."),
    tags: ["proba_experience", "defi", "qcm", "erreur", "piege"],
    canvas: deCanvas([2, 4, 6]),
  },
  {
    kind: "fixed",
    id: "proba_defi_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
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
    tags: ["proba_experience", "defi", "reunion", "billes"],
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
    id: "proba_defi_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
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
    tags: ["proba_experience", "defi", "roue", "piege"],
    canvas: roueCanvas([
      { label: "Rouge", poids: 3, couleur: couleurs.rouge },
      { label: "Bleu", poids: 1, couleur: couleurs.bleu },
      { label: "Vert", poids: 1, couleur: couleurs.vert },
    ]),
  },
  {
    kind: "template",
    id: "proba_defi_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "Compte les cas favorables et les cas possibles.",
    tags: ["proba_experience", "reunion", "defi", "template"],
    generate: () => {
      const mangue = randomInt(2, 5);
      const ananas = randomInt(1, 4);
      const letchis = randomInt(1, 4);
      const total = mangue + ananas + letchis;
      const result = rawFraction(mangue, total);

      return {
        text: `Dans un panier de fruits à La Réunion, il y a ${mangue} mangue(s), ${ananas} ananas et ${letchis} letchi(s). On prend un fruit au hasard. Quelle est la probabilité de prendre une mangue ?`,
        format: "qcm",
        // ⚠️ ananas et letchis tombent souvent sur le même nombre : les deux
        // premiers pièges s'écrivent alors pareil et fondent au dédoublonnage.
        // Deux pièges de secours : le rapport inversé, et les fruits qui ne
        // sont PAS des mangues.
        choices: makeChoices(result, [
          rawFraction(ananas, total),
          rawFraction(letchis, total),
          rawFraction(mangue, ananas),
          rawFraction(total, mangue),
          rawFraction(ananas + letchis, total),
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
    id: "proba_defi_open_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Compte les secteurs de chaque couleur.",
    tags: ["proba_experience", "roue", "defi", "template"],
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique pourquoi Rouge est l’issue la plus
    // probable sur cette roue » (toujours la même roue). Désormais : nombres de secteurs tirés,
    // et soit la couleur la plus probable (QCM), soit la probabilité d’une couleur (réponse courte).
    generate: () => {
      const noms = ["Rouge", "Bleu", "Vert"] as const;
      const teintes = [couleurs.rouge, couleurs.bleu, couleurs.vert];
      // Trois nombres distincts : une seule couleur est la plus probable.
      const ns = shuffle([randomInt(4, 5), randomInt(2, 3), 1]);
      const total = ns[0] + ns[1] + ns[2];
      const decrire = `La roue a ${total} secteurs de même taille : ${ns[0]} rouge(s), ${ns[1]} bleu(s), ${ns[2]} vert(s).`;
      const canvas = roueCanvas(noms.map((label, i) => ({ label, poids: ns[i], couleur: teintes[i] })));
      if (Math.random() < 0.5) {
        const iMax = ns.indexOf(Math.max(...ns));
        return {
          text: `${decrire} Quelle couleur a le plus de chances de sortir ?`,
          format: "qcm" as const,
          choices: [...noms],
          expected: [noms[iMax]],
          comparator: "mcq_exact" as const,
          explanation: expl(`${noms[iMax]} occupe ${ns[iMax]} secteurs sur ${total} : c’est la couleur qui a le plus de secteurs, donc le plus de chances de sortir.`),
          canvas,
        };
      }
      const i = randomInt(0, 2);
      const bonne = rawFraction(ns[i], total);
      const reduite = fraction(ns[i], total);
      return {
        text: `${decrire} Quelle est la probabilité d’obtenir ${noms[i]} ?`,
        format: "short" as const,
        expected: bonne === reduite ? [bonne] : [bonne, reduite],
        comparator: "fraction_decimal_equivalent" as const,
        explanation: expl(`${noms[i]} occupe ${ns[i]} secteur(s) sur ${total}. La probabilité est ${bonne}${bonne === reduite ? "" : ` = ${reduite}`}.`),
        canvas,
      };
    },
  },

  // =========================
  // TOP-UP — PROBA_VOCABULAIRE (+5)
  // =========================
  {
    kind: "fixed",
    id: "proba_vocabulaire_fixed_6",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Une probabilité est toujours un nombre compris entre :",
    format: "qcm",
    choices: ["0 et 1", "1 et 10", "0 et 100", "-1 et 1"],
    expected: ["0 et 1"],
    comparator: "mcq_exact",
    hint: "Une probabilité ne dépasse jamais 1.",
    explanation: expl("Une probabilité est toujours comprise entre 0 (impossible) et 1 (certain)."),
    tags: ["proba_experience", "vocabulaire", "qcm"],
  },
  {
    kind: "fixed",
    id: "proba_vocabulaire_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Un événement qui ne peut jamais se produire a une probabilité de :",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "Impossible = aucune chance.",
    explanation: expl("Un événement impossible a une probabilité de 0."),
    tags: ["proba_experience", "vocabulaire"],
  },
  {
    kind: "fixed",
    id: "proba_vocabulaire_fixed_5",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Un événement certain a une probabilité de :",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Certain = se produit toujours.",
    explanation: expl("Un événement certain a une probabilité de 1."),
    tags: ["proba_experience", "vocabulaire"],
  },
  {
    kind: "fixed",
    id: "proba_vocabulaire_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 3,
    theme: "neutral",
    text: "Comment appelle-t-on l’ensemble des résultats possibles d’une expérience aléatoire ?",
    format: "qcm",
    choices: ["les issues", "les fréquences", "les moyennes", "les effectifs"],
    expected: ["les issues"],
    comparator: "mcq_exact",
    hint: "Chaque résultat possible porte ce nom.",
    explanation: expl("Les résultats possibles d’une expérience aléatoire s’appellent les issues."),
    tags: ["proba_experience", "vocabulaire", "qcm"],
  },
  {
    kind: "fixed",
    id: "proba_vocabulaire_open_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Pourquoi dit-on qu’une expérience est aléatoire ? Donne un exemple. »
    text: "Avant de lancer un dé, peut-on savoir quelle face va sortir ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Pense à ce qu’on peut dire, ou pas, AVANT de lancer.",
    explanation: expl("Non. On connaît les 6 faces possibles, mais on ne peut pas savoir laquelle sortira : c’est le hasard qui décide. C’est pour cela que lancer un dé est une expérience aléatoire."),
    tags: ["proba_experience", "vocabulaire", "qcm"],
  },

  // =========================
  // TOP-UP — PROBA_ISSUE (+4)
  // =========================
  {
    kind: "fixed",
    id: "proba_issue_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 2,
    theme: "neutral",
    text: "On lance un dé. Combien y a-t-il d’issues favorables à « obtenir un nombre supérieur ou égal à 5 » ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Liste les nombres concernés.",
    explanation: expl("Les issues favorables sont 5 et 6 : il y en a 2."),
    tags: ["proba_experience", "issue", "de"],
    canvas: deCanvas([5, 6]),
  },
  {
    kind: "fixed",
    id: "proba_issue_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 2,
    theme: "neutral",
    text: "On tire une carte parmi les 4 as d’un jeu. Combien y a-t-il d’issues possibles ?",
    format: "qcm",
    choices: ["4", "2", "8", "52"],
    expected: ["4"],
    comparator: "mcq_exact",
    hint: "Il y a 4 as.",
    explanation: expl("Il y a 4 as, donc 4 issues possibles."),
    tags: ["proba_experience", "issue", "qcm"],
  },
  {
    kind: "fixed",
    id: "proba_issue_open_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique la différence entre une issue favorable et une issue possible ».
    text: "Un sac contient 3 billes rouges et 5 billes bleues. On tire une bille. Combien y a-t-il d’issues favorables à « tirer une bille rouge » ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Favorables : seulement les billes rouges.",
    explanation: expl("Les issues possibles sont les 8 billes du sac. Les issues favorables sont les billes rouges : il y en a 3."),
    tags: ["proba_experience", "issue", "short"],
    canvas: billesCanvas([
      ...Array.from({ length: 3 }, () => ({ couleur: couleurs.rouge, label: "R" })),
      ...Array.from({ length: 5 }, () => ({ couleur: couleurs.bleu, label: "B" })),
    ]),
  },
  {
    kind: "template",
    id: "proba_issue_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte les billes de la couleur demandée.",
    tags: ["proba_experience", "issue", "billes", "template"],
    generate: () => {
      const rouges = randomInt(2, 5);
      const bleues = randomInt(2, 5);
      return {
        text: `Un sac contient ${rouges} billes rouges et ${bleues} billes bleues. Combien y a-t-il d’issues favorables à « tirer une bille rouge » ?`,
        format: "short",
        expected: [String(rouges)],
        comparator: "number_equal",
        explanation: expl(`Il y a ${rouges} billes rouges : ${rouges} issues favorables.`),
        canvas: billesCanvas([
          ...Array.from({ length: rouges }, () => ({ couleur: couleurs.rouge, label: "R" })),
          ...Array.from({ length: bleues }, () => ({ couleur: couleurs.bleu, label: "B" })),
        ]),
      };
    },
  },

  // =========================
  // TOP-UP — PROBA_EQUIPROBABILITE (+5)
  // =========================
  {
    kind: "fixed",
    id: "proba_equiprobabilite_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_equiprobabilite",
    difficulty: 2,
    theme: "neutral",
    text: "Lancer une pièce de monnaie équilibrée (pile ou face) est-il équiprobable ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Pile et face ont la même chance.",
    explanation: expl("Oui : pile et face ont chacun une probabilité de 1/2, c’est équiprobable."),
    tags: ["proba_experience", "equiprobabilite", "qcm"],
  },
  {
    kind: "fixed",
    id: "proba_equiprobabilite_fixed_5",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_equiprobabilite",
    difficulty: 3,
    theme: "neutral",
    text: "Dans une situation équiprobable à 5 issues, quelle est la probabilité de chaque issue ?",
    format: "short",
    expected: ["1/5"],
    comparator: "fraction_decimal_equivalent",
    hint: "Toutes les issues ont la même probabilité.",
    explanation: expl("Avec 5 issues équiprobables, chaque issue a une probabilité de 1/5."),
    tags: ["proba_experience", "equiprobabilite"],
  },
  {
    kind: "fixed",
    id: "proba_equiprobabilite_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_equiprobabilite",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle situation est équiprobable ?",
    format: "qcm",
    choices: [
      "un sac avec 3 billes rouges et 3 billes bleues",
      "un sac avec 5 billes rouges et 1 bleue",
      "une roue avec un grand secteur et un petit",
      "un dé pipé",
    ],
    expected: ["un sac avec 3 billes rouges et 3 billes bleues"],
    comparator: "mcq_exact",
    hint: "Cherche des quantités égales.",
    explanation: expl("Avec 3 billes rouges et 3 bleues, tirer rouge et tirer bleu ont la même probabilité : c’est équiprobable."),
    tags: ["proba_experience", "equiprobabilite", "qcm"],
  },
  {
    kind: "fixed",
    id: "proba_equiprobabilite_open_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_equiprobabilite",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique ce que signifie « équiprobable » ».
    text: "Un sac contient 2 billes rouges et 2 billes bleues. Rouge et bleu ont-ils la même chance d’être tirés ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Compte les billes de chaque couleur.",
    explanation: expl("Il y a autant de rouges que de bleues : 2 et 2. Rouge et bleu ont la même chance, 2/4 chacun : on dit qu’ils sont équiprobables."),
    tags: ["proba_experience", "equiprobabilite", "qcm"],
  },
  {
    kind: "template",
    id: "proba_equiprobabilite_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_equiprobabilite",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les billes de chaque couleur.",
    tags: ["proba_experience", "equiprobabilite", "billes", "template"],
    generate: () => {
      const equal = randomChoice([true, false]);
      const rouges = 3;
      const bleues = equal ? 3 : randomInt(1, 2);
      return {
        text: `Un sac contient ${rouges} billes rouges et ${bleues} billes bleues. Tirer rouge et tirer bleu sont-ils équiprobables ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [equal ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: expl(
          equal
            ? `Il y a ${rouges} rouges et ${bleues} bleues : mêmes quantités, donc équiprobable.`
            : `Il y a ${rouges} rouges et ${bleues} bleues : quantités différentes, donc pas équiprobable.`
        ),
        canvas: billesCanvas([
          ...Array.from({ length: rouges }, () => ({ couleur: couleurs.rouge, label: "R" })),
          ...Array.from({ length: bleues }, () => ({ couleur: couleurs.bleu, label: "B" })),
        ]),
      };
    },
  },

  // =========================
  // TOP-UP — PROBA_CALCULER (+2)
  // =========================
  {
    kind: "fixed",
    id: "proba_calculer_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_calculer",
    difficulty: 2,
    theme: "neutral",
    text: "On lance un dé équilibré. Quelle est la probabilité d’obtenir le nombre 3 ?",
    format: "short",
    expected: ["1/6"],
    comparator: "fraction_decimal_equivalent",
    hint: "1 issue favorable sur 6 possibles.",
    explanation: expl("Il y a 1 issue favorable (le 3) sur 6 issues possibles : la probabilité est 1/6."),
    tags: ["proba_experience", "calculer", "de"],
    canvas: deCanvas([3]),
  },
  {
    kind: "template",
    id: "proba_calculer_tpl_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_calculer",
    difficulty: 3,
    theme: "neutral",
    hint: "Probabilité = favorables ÷ total.",
    tags: ["proba_experience", "calculer", "billes", "template"],
    generate: () => {
      const rouges = randomInt(1, 4);
      const bleues = randomInt(1, 4);
      const total = rouges + bleues;
      return {
        text: `Un sac contient ${rouges} bille(s) rouge(s) et ${bleues} bille(s) bleue(s). Quelle est la probabilité de tirer une bille rouge ?`,
        format: "short",
        expected: [rawFraction(rouges, total), fraction(rouges, total)],
        comparator: "fraction_decimal_equivalent",
        explanation: expl(`Il y a ${rouges} billes rouges sur ${total} au total : probabilité = ${rawFraction(rouges, total)}.`),
        canvas: billesCanvas([
          ...Array.from({ length: rouges }, () => ({ couleur: couleurs.rouge, label: "R" })),
          ...Array.from({ length: bleues }, () => ({ couleur: couleurs.bleu, label: "B" })),
        ]),
      };
    },
  },

  // =========================
  // TOP-UP — PROBA_DEFI (+4)
  // =========================
  {
    kind: "fixed",
    id: "proba_defi_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 4,
    theme: "neutral",
    text: "On lance un dé. Quelle est la probabilité de NE PAS obtenir 6 ?",
    format: "short",
    expected: ["5/6"],
    comparator: "fraction_decimal_equivalent",
    hint: "5 issues sur 6 ne sont pas le 6.",
    explanation: expl("Il y a 5 issues favorables (1, 2, 3, 4, 5) sur 6 : la probabilité est 5/6."),
    tags: ["proba_experience", "defi", "de"],
    canvas: deCanvas([1, 2, 3, 4, 5]),
  },
  {
    kind: "fixed",
    id: "proba_defi_qcm_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 4,
    theme: "neutral",
    text: "La probabilité d’un événement est $\\dfrac{3}{10}$. Quelle est la probabilité de l’événement contraire ?",
    format: "qcm",
    choices: ["7/10", "3/10", "10/3", "1/10"],
    expected: ["7/10"],
    comparator: "mcq_exact",
    hint: "Les deux probabilités font 1 au total.",
    explanation: expl("Probabilité du contraire = 1 − 3/10 = 10/10 − 3/10 = 7/10."),
    tags: ["proba_experience", "defi", "qcm", "contraire"],
  },
  {
    kind: "fixed",
    id: "proba_defi_open_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « … est 4. Explique pourquoi c’est impossible. »
    text: "Un sac contient 4 billes rouges et 6 billes bleues. Quelle est la probabilité de tirer une bille rouge ?",
    format: "short",
    expected: ["4/10", "2/5", "0,4"],
    comparator: "fraction_decimal_equivalent",
    hint: "Une probabilité est entre 0 et 1 : ce n’est pas 4.",
    explanation: expl("Il y a 4 billes rouges sur 4 + 6 = 10 billes. La probabilité est 4/10 = 0,4. Répondre « 4 », c’est donner le nombre de billes rouges, pas la probabilité."),
    tags: ["proba_experience", "defi", "short", "erreur"],
    canvas: billesCanvas([
      ...Array.from({ length: 4 }, () => ({ couleur: couleurs.rouge, label: "R" })),
      ...Array.from({ length: 6 }, () => ({ couleur: couleurs.bleu, label: "B" })),
    ]),
  },
  {
    kind: "template",
    id: "proba_defi_tpl_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Compte les issues favorables sur 6.",
    tags: ["proba_experience", "defi", "de", "template"],
    generate: () => {
      const seuil = randomChoice([2, 3, 4]);
      const favorables = 6 - seuil;
      const faces = Array.from({ length: 6 }, (_, i) => i + 1).filter((n) => n > seuil);
      return {
        text: `On lance un dé. Quelle est la probabilité d’obtenir un nombre strictement supérieur à ${seuil} ?`,
        format: "short",
        expected: [rawFraction(favorables, 6), fraction(favorables, 6)],
        comparator: "fraction_decimal_equivalent",
        explanation: expl(`Les issues favorables sont ${faces.join(", ")} : ${favorables} sur 6, soit ${rawFraction(favorables, 6)}.`),
        canvas: deCanvas(faces),
      };
    },
  },

  /* ===== PROBA_VOCABULAIRE =====
     Ce micro n'avait que des items figés : au dixième passage, l'élève
     retombait forcément sur une question déjà vue. Deux générateurs le
     réapprovisionnent, l'un sur le mot juste, l'autre sur ce que le mot veut
     dire. */
  {
    kind: "template",
    id: "proba_vocabulaire_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 3,
    theme: "neutral",
    hint: "Une issue est UN résultat ; un événement peut en regrouper plusieurs.",
    tags: ["proba_experience", "vocabulaire", "template"],
    generate: () => {
      const cas = randomChoice([
        {
          phrase: "obtenir 5 en lançant un dé",
          bonne: "une issue",
          pourquoi: "c’est un seul résultat possible du lancer, on ne peut pas le décomposer.",
        },
        {
          phrase: "obtenir un nombre impair en lançant un dé",
          bonne: "un événement",
          pourquoi: "cette phrase regroupe trois issues à la fois : 1, 3 et 5.",
        },
        {
          phrase: "tirer la bille rouge d’un sac qui en contient une seule",
          bonne: "une issue",
          pourquoi: "une seule bille répond à la description : c’est un résultat unique.",
        },
        {
          phrase: "obtenir un nombre plus grand que 4 en lançant un dé",
          bonne: "un événement",
          pourquoi: "deux issues conviennent, 5 et 6 : la phrase en regroupe plusieurs.",
        },
        {
          phrase: "obtenir pile en lançant une pièce",
          bonne: "une issue",
          pourquoi: "la pièce n’a que deux résultats possibles, et pile en est un seul.",
        },
      ]);
      return {
        text: `En probabilités, comment appelle-t-on « ${cas.phrase} » ?`,
        format: "qcm",
        choices: makeChoices(cas.bonne, [
          "une issue",
          "un événement",
          "une expérience aléatoire",
          "une fréquence",
        ]),
        expected: [cas.bonne],
        comparator: "mcq_exact",
        explanation: expl(
          `C’est ${cas.bonne} : ${cas.pourquoi} Rappel : une issue est UN résultat possible, un événement peut en regrouper plusieurs.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "proba_vocabulaire_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 4,
    theme: "neutral",
    hint: "Demande-toi si la chose peut arriver jamais, toujours, ou parfois.",
    tags: ["proba_experience", "vocabulaire", "qcm", "template"],
    // 08/10/2026 : précise et simple (Frédéric). Avant : « … certain, impossible, ou ni l’un ni l’autre ? Explique. »
    // corrigé par un mot-clé. Désormais un QCM à trois réponses, et deux cas « ni l’un ni l’autre ».
    generate: () => {
      const cas = randomChoice([
        {
          phrase: "obtenir 7 en lançant un dé à six faces",
          nature: "impossible",
          proba: "0",
          pourquoi: "aucune face ne porte le 7 : aucune issue ne convient.",
        },
        {
          phrase: "obtenir un nombre plus petit que 7 en lançant un dé à six faces",
          nature: "certain",
          proba: "1",
          pourquoi: "les six faces conviennent : toutes les issues sont favorables.",
        },
        {
          phrase: "tirer une bille verte dans un sac qui ne contient que des billes rouges",
          nature: "impossible",
          proba: "0",
          pourquoi: "aucune bille verte ne s’y trouve : aucune issue ne convient.",
        },
        {
          phrase: "obtenir pile ou face en lançant une pièce",
          nature: "certain",
          proba: "1",
          pourquoi: "la pièce retombe forcément sur l’une des deux faces.",
        },
        {
          phrase: "obtenir 6 en lançant un dé à six faces",
          nature: "ni l’un ni l’autre",
          proba: "1/6",
          pourquoi: "le 6 peut sortir, mais pas à coup sûr : une issue sur six convient.",
        },
        {
          phrase: "tirer une bille rouge dans un sac de 2 billes rouges et 3 billes bleues",
          nature: "ni l’un ni l’autre",
          proba: "2/5",
          pourquoi: "une bille rouge peut sortir, mais une bleue aussi : 2 issues sur 5 conviennent.",
        },
      ]);
      return {
        text: `L’événement « ${cas.phrase} » est-il certain, impossible, ou ni l’un ni l’autre ?`,
        format: "qcm",
        choices: ["certain", "impossible", "ni l’un ni l’autre"],
        expected: [cas.nature],
        comparator: "mcq_exact",
        explanation: expl(
          cas.nature === "ni l’un ni l’autre"
            ? `Ni l’un ni l’autre : ${cas.pourquoi} Sa probabilité vaut ${cas.proba}, entre 0 et 1.`
            : `Cet événement est ${cas.nature} : ${cas.pourquoi} Sa probabilité vaut donc ${cas.proba}.`,
        ),
      };
    },
  },
];