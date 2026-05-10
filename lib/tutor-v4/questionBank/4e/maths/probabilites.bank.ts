// lib/tutor-v4/question-banks/maths/4e/probabilites.bank.ts
//
// Banque de questions Tutor V4 - Mathématiques 4e
// Notion : Probabilités
//
// Objectifs pédagogiques :
// - comprendre le vocabulaire : expérience aléatoire, issue, événement ;
// - déterminer les issues d’une expérience simple ;
// - reconnaître une situation d’équiprobabilité ;
// - calculer une probabilité simple sous forme de fraction ;
// - relier probabilités, fractions et pourcentages ;
// - comparer des probabilités ;
// - développer le raisonnement dans des situations concrètes.
//
// Organisation de la bank :
// - questions fixed : QCM pour fixer les bases (vocabulaire, situations types) ;
// - questions template : génération aléatoire pour varier les contextes ;
// - questions open : justification, explication et raisonnement.
//
// Choix pédagogiques :
// - utilisation de visuels simples pour ancrer les concepts :
//   🎲 dé → issues équiprobables
//   🎡 roue → probabilités pondérées
//   🔴 billes → cas favorables / cas possibles
//   📊 tableau → lecture et comparaison
// - lien explicite avec fractions et pourcentages ;
// - contextualisation (ex : La Réunion) pour donner du sens ;
// - montée progressive vers des situations de défi.

import type { TutorBankItemV4, CanvasProbabilitesData } from "@/lib/tutor-v4/types";

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

function billesCanvas(elements: { label?: string; couleur: string }[]): CanvasProbabilitesData {
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
  // VOCABULAIRE
  // =========================
  {
    kind: "fixed",
    id: "proba_vocabulaire_fixed_1",
    niveau: "4e",
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
      "est toujours impossible",
      "est toujours égal à 1",
    ],
    expected: ["n’est pas connu à l’avance"],
    comparator: "mcq_exact",
    hint: "Aléatoire veut dire qu’on ne connaît pas le résultat avant de faire l’expérience.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise, entre 0 et 1.\n\n" +
          "Méthode : on compare les cas favorables à tous les cas possibles dans l’expérience aléatoire.\n\nCalcul : " +
          ("Une expérience aléatoire est une expérience dont on ne peut pas prévoir avec certitude le résultat.") +
          "\n\nConclusion : la probabilité obtenue correspond à l’événement demandé.",
    tags: ["proba_experience", "vocabulaire"],
  },
  {
    kind: "fixed",
    id: "proba_vocabulaire_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Lorsqu’on lance un dé, obtenir 4 est...",
    format: "qcm",
    choices: ["une issue", "une fréquence", "un tableau", "une moyenne"],
    expected: ["une issue"],
    comparator: "mcq_exact",
    hint: "Une issue est un résultat possible.",
    explanation: "Définition : une probabilité mesure la chance qu’un événement se produise, entre 0 et 1.\n\n" +
          "Méthode : on compare les cas favorables à tous les cas possibles dans l’expérience aléatoire.\n\nCalcul : " +
          ("Obtenir 4 est un résultat possible du lancer de dé : c’est une issue.") +
          "\n\nConclusion : la probabilité obtenue correspond à l’événement demandé.",
    tags: ["proba_experience", "issue"],
    canvas: deCanvas([4]),
  },
    {
    kind: "fixed",
    id: "proba_vocabulaire_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Explique avec tes mots ce qu’est une expérience aléatoire.",
    format: "open",
    expected: ["résultat", "avance"],
    comparator: "contains_keyword",
    hint: "On ne peut pas savoir avec certitude le résultat avant de faire l’expérience.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise, entre 0 et 1.\n\n" +
          "Méthode : on compare les cas favorables à tous les cas possibles dans l’expérience aléatoire.\n\nCalcul : " +
          ("Une expérience aléatoire est une expérience dont on ne connaît pas le résultat à l’avance.") +
          "\n\nConclusion : la probabilité obtenue correspond à l’événement demandé.",
    tags: ["proba_experience", "vocabulaire", "open"],
  },

  // =========================
  // ISSUES
  // =========================
  {
    kind: "fixed",
    id: "proba_issue_fixed_1",
    niveau: "4e",
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
    explanation: "Définition : une probabilité mesure la chance qu’un événement se produise, entre 0 et 1.\n\n" +
          "Méthode : on compare les cas favorables à tous les cas possibles dans l’expérience aléatoire.\n\nCalcul : " +
          ("Les issues possibles sont 1, 2, 3, 4, 5 et 6 : il y en a 6.") +
          "\n\nConclusion : la probabilité obtenue correspond à l’événement demandé.",
    tags: ["proba_experience", "issue", "de"],
    canvas: deCanvas(),
  },
  {
    kind: "template",
    id: "proba_issue_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 1,
    theme: "neutral",
    hint: "Compte tous les résultats possibles.",
    tags: ["proba_experience", "issue", "billes", "template"],
    generate: () => {
      const rouges = randomInt(2, 5);
      const bleues = randomInt(1, 4);
      const total = rouges + bleues;

      const elements = [
        ...Array.from({ length: rouges }, () => ({ couleur: couleurs.rouge })),
        ...Array.from({ length: bleues }, () => ({ couleur: couleurs.bleu })),
      ];

      return {
        text: `Un sac contient ${rouges} billes rouges et ${bleues} billes bleues. Combien y a-t-il de billes au total ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: "Définition : une probabilité mesure la chance qu’un événement se produise, entre 0 et 1.\n\n" +
          "Méthode : on compare les cas favorables à tous les cas possibles dans l’expérience aléatoire.\n\nCalcul : " +
          (`Il y a ${rouges} + ${bleues} = ${total} billes au total.`) +
          "\n\nConclusion : la probabilité obtenue correspond à l’événement demandé.",
        canvas: billesCanvas(elements),
      };
    },
  },
    {
    kind: "fixed",
    id: "proba_issue_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 2,
    theme: "neutral",
    text: "On lance un dé équilibré. Explique pourquoi il y a 6 issues possibles.",
    format: "open",
    expected: ["1", "2", "3", "4", "5", "6"],
    comparator: "contains_keyword",
    hint: "Liste les résultats possibles du dé.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise, entre 0 et 1.\n\n" +
          "Méthode : on compare les cas favorables à tous les cas possibles dans l’expérience aléatoire.\n\nCalcul : " +
          ("Les issues possibles sont 1, 2, 3, 4, 5 et 6. Il y a donc 6 issues.") +
          "\n\nConclusion : la probabilité obtenue correspond à l’événement demandé.",
    tags: ["proba_experience", "issue", "open"],
    canvas: deCanvas(),
  },

  // =========================
  // ÉVÉNEMENTS
  // =========================
  {
    kind: "fixed",
    id: "proba_evenement_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_evenement",
    difficulty: 1,
    theme: "neutral",
    text: "Lorsqu’on lance un dé à 6 faces, l’événement « obtenir un nombre inférieur à 7 » est...",
    format: "qcm",
    choices: ["impossible", "certain", "contraire", "vide"],
    expected: ["certain"],
    comparator: "mcq_exact",
    hint: "Toutes les faces du dé sont inférieures à 7.",
    explanation: "Définition : une probabilité mesure la chance qu’un événement se produise, entre 0 et 1.\n\n" +
          "Méthode : on compare les cas favorables à tous les cas possibles dans l’expérience aléatoire.\n\nCalcul : " +
          ("Les issues 1, 2, 3, 4, 5 et 6 sont toutes inférieures à 7 : l’événement est certain.") +
          "\n\nConclusion : la probabilité obtenue correspond à l’événement demandé.",
    tags: ["proba_experience", "certain"],
    canvas: deCanvas([1, 2, 3, 4, 5, 6]),
  },
  {
    kind: "fixed",
    id: "proba_evenement_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_evenement",
    difficulty: 1,
    theme: "neutral",
    text: "Lorsqu’on lance un dé à 6 faces, l’événement « obtenir 8 » est...",
    format: "qcm",
    choices: ["certain", "impossible", "équiprobable", "favorable"],
    expected: ["impossible"],
    comparator: "mcq_exact",
    hint: "Un dé classique ne possède pas de face 8.",
    explanation: "Définition : une probabilité mesure la chance qu’un événement se produise, entre 0 et 1.\n\n" +
          "Méthode : on compare les cas favorables à tous les cas possibles dans l’expérience aléatoire.\n\nCalcul : " +
          ("La face 8 n’existe pas sur un dé à 6 faces : l’événement est impossible.") +
          "\n\nConclusion : la probabilité obtenue correspond à l’événement demandé.",
    tags: ["proba_experience", "impossible"],
    canvas: deCanvas(),
  },
  {
    kind: "template",
    id: "proba_evenement_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_evenement",
    difficulty: 2,
    theme: "neutral",
    hint: "Un événement contraire contient toutes les issues qui ne réalisent pas l’événement.",
    tags: ["proba_experience", "contraire", "template"],
    generate: () => {
      const mode = randomChoice(["pair", "impair"]);
      const favorables = mode === "pair" ? [2, 4, 6] : [1, 3, 5];
      const contraire = mode === "pair" ? "obtenir un nombre impair" : "obtenir un nombre pair";

      return {
        text: `Au lancer d’un dé, quel est l’événement contraire de « obtenir un nombre ${mode} » ?`,
        format: "qcm",
        choices: makeChoices(contraire, [
          "obtenir 6",
          "obtenir un nombre inférieur à 3",
          "obtenir un nombre supérieur à 6",
        ]),
        expected: [contraire],
        comparator: "mcq_exact",
        explanation: "Définition : une probabilité mesure la chance qu’un événement se produise, entre 0 et 1.\n\n" +
          "Méthode : on compare les cas favorables à tous les cas possibles dans l’expérience aléatoire.\n\nCalcul : " +
          (`Le contraire de « obtenir un nombre ${mode} » est « ${contraire} ».`) +
          "\n\nConclusion : la probabilité obtenue correspond à l’événement demandé.",
        canvas: deCanvas(favorables),
      };
    },
  },
    {
    kind: "fixed",
    id: "proba_evenement_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_evenement",
    difficulty: 2,
    theme: "neutral",
    text: "Explique pourquoi l’événement « obtenir 8 » est impossible lorsqu’on lance un dé à 6 faces.",
    format: "open",
    expected: ["8", "dé", "6"],
    comparator: "contains_keyword",
    hint: "Regarde les faces possibles du dé.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise, entre 0 et 1.\n\n" +
          "Méthode : on compare les cas favorables à tous les cas possibles dans l’expérience aléatoire.\n\nCalcul : " +
          ("Un dé à 6 faces possède les faces 1, 2, 3, 4, 5 et 6. Il n’a pas de face 8, donc l’événement est impossible.") +
          "\n\nConclusion : la probabilité obtenue correspond à l’événement demandé.",
    tags: ["proba_experience", "evenement", "impossible", "open"],
    canvas: deCanvas(),
  },

  // =========================
  // ÉQUIPROBABILITÉ
  // =========================
  {
    kind: "fixed",
    id: "proba_equiprobabilite_fixed_1",
    niveau: "4e",
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
    explanation: "Définition : une probabilité mesure la chance qu’un événement se produise, entre 0 et 1.\n\n" +
          "Méthode : on compare les cas favorables à tous les cas possibles dans l’expérience aléatoire.\n\nCalcul : " +
          ("Oui. Chaque face a la même probabilité d’apparaître : la situation est équiprobable.") +
          "\n\nConclusion : la probabilité obtenue correspond à l’événement demandé.",
    tags: ["proba_experience", "equiprobabilite", "de"],
    canvas: deCanvas(),
  },
  {
    kind: "template",
    id: "proba_equiprobabilite_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_equiprobabilite",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde si toutes les zones ont le même poids.",
    tags: ["proba_experience", "roue", "equiprobabilite", "template"],
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
        explanation: "Définition : une probabilité mesure la chance qu’un événement se produise, entre 0 et 1.\n\n" +
          "Méthode : on compare les cas favorables à tous les cas possibles dans l’expérience aléatoire.\n\nCalcul : " +
          (equal
          ? "Oui. Toutes les zones ont le même poids."
          : "Non. Les zones n’ont pas toutes le même poids.") +
          "\n\nConclusion : la probabilité obtenue correspond à l’événement demandé.",
        canvas: roueCanvas(segments),
      };
    },
  },

  // =========================
  // CALCULER UNE PROBABILITÉ SOUS FORME DE FRACTION
  // =========================
  {
    kind: "fixed",
    id: "proba_calculer_fraction_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_calculer_fraction",
    difficulty: 2,
    theme: "neutral",
    text: "On lance un dé équilibré. Quelle est la probabilité d’obtenir un nombre pair ?",
    format: "qcm",
    choices: ["1/6", "2/6", "3/6", "6/3"],
    expected: ["3/6"],
    comparator: "mcq_exact",
    hint: "Les nombres pairs sont 2, 4 et 6.",
    explanation: "Définition : une probabilité mesure la chance qu’un événement se produise, entre 0 et 1.\n\n" +
          "Méthode : on compare les cas favorables à tous les cas possibles dans l’expérience aléatoire.\n\nCalcul : " +
          ("Il y a 3 issues favorables sur 6 issues possibles, donc la probabilité est 3/6.") +
          "\n\nConclusion : la probabilité obtenue correspond à l’événement demandé.",
    tags: ["proba_experience", "fraction", "de"],
    canvas: deCanvas([2, 4, 6]),
  },
  {
    kind: "template",
    id: "proba_calculer_fraction_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_calculer_fraction",
    difficulty: 2,
    theme: "neutral",
    hint: "Probabilité = nombre de cas favorables / nombre de cas possibles.",
    tags: ["proba_experience", "billes", "fraction", "template"],
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
          `${rouges}/${bleues}`,
          `${total}/${rouges}`,
        ]),
        expected: [result],
        comparator: "mcq_exact",
        explanation: "Définition : une probabilité mesure la chance qu’un événement se produise, entre 0 et 1.\n\n" +
          "Méthode : on compare les cas favorables à tous les cas possibles dans l’expérience aléatoire.\n\nCalcul : " +
          (`Il y a ${rouges} billes rouges sur ${total} billes au total, donc la probabilité est ${result}.`) +
          "\n\nConclusion : la probabilité obtenue correspond à l’événement demandé.",
        canvas: billesCanvas(elements),
      };
    },
  },
  {
    kind: "template",
    id: "proba_calculer_fraction_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_calculer_fraction",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne les poids des secteurs favorables, puis divise par le poids total.",
    tags: ["proba_experience", "roue", "fraction", "template"],
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
          `${poidsRouge}/${poidsBleu}`,
          `${total}/${poidsRouge}`,
        ]),
        expected: [result],
        comparator: "mcq_exact",
        explanation: "Définition : une probabilité mesure la chance qu’un événement se produise, entre 0 et 1.\n\n" +
          "Méthode : on compare les cas favorables à tous les cas possibles dans l’expérience aléatoire.\n\nCalcul : " +
          (`Le secteur Rouge a un poids ${poidsRouge} sur un poids total ${total}, donc la probabilité est ${result}.`) +
          "\n\nConclusion : la probabilité obtenue correspond à l’événement demandé.",
        canvas: roueCanvas([
          { label: "Rouge", poids: poidsRouge, couleur: couleurs.rouge },
          { label: "Bleu", poids: poidsBleu, couleur: couleurs.bleu },
          { label: "Vert", poids: poidsVert, couleur: couleurs.vert },
        ]),
      };
    },
  },
    {
    kind: "fixed",
    id: "proba_calculer_fraction_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_calculer_fraction",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi la probabilité d’obtenir un nombre pair avec un dé équilibré est 3/6.",
    format: "open",
    expected: ["2", "4", "6", "3", "6"],
    comparator: "contains_keyword",
    hint: "Compte les nombres pairs, puis le nombre total d’issues.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise, entre 0 et 1.\n\n" +
          "Méthode : on compare les cas favorables à tous les cas possibles dans l’expérience aléatoire.\n\nCalcul : " +
          ("Les nombres pairs sont 2, 4 et 6 : il y a 3 issues favorables sur 6 issues possibles. La probabilité est donc 3/6.") +
          "\n\nConclusion : la probabilité obtenue correspond à l’événement demandé.",
    tags: ["proba_experience", "fraction", "de", "open"],
    canvas: deCanvas([2, 4, 6]),
  },

  // =========================
  // CONVERTIR EN DÉCIMAL OU POURCENTAGE
  // =========================
  {
    kind: "fixed",
    id: "proba_convertir_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "La probabilité 1/2 correspond à...",
    format: "qcm",
    choices: ["25 %", "50 %", "75 %", "100 %"],
    expected: ["50 %"],
    comparator: "mcq_exact",
    hint: "1/2 = 0,5.",
    explanation: "Définition : une probabilité mesure la chance qu’un événement se produise, entre 0 et 1.\n\n" +
          "Méthode : on compare les cas favorables à tous les cas possibles dans l’expérience aléatoire.\n\nCalcul : " +
          ("1/2 = 0,5 = 50 %.") +
          "\n\nConclusion : la probabilité obtenue correspond à l’événement demandé.",
    tags: ["proba_experience", "pourcentage"],
  },
  {
    kind: "template",
    id: "proba_convertir_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_convertir",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour passer d’un décimal à un pourcentage, on multiplie par 100.",
    tags: ["proba_experience", "pourcentage", "template"],
    generate: () => {
      const values = [
        { f: "1/2", p: "50 %" },
        { f: "1/4", p: "25 %" },
        { f: "3/4", p: "75 %" },
        { f: "1/5", p: "20 %" },
        { f: "1/10", p: "10 %" },
      ];
      const item = randomChoice(values);

      return {
        text: `À quel pourcentage correspond la probabilité ${item.f} ?`,
        format: "qcm",
        choices: makeChoices(item.p, ["10 %", "20 %", "25 %", "50 %", "75 %"].filter((x) => x !== item.p)),
        expected: [item.p],
        comparator: "mcq_exact",
        explanation: "Définition : une probabilité mesure la chance qu’un événement se produise, entre 0 et 1.\n\n" +
          "Méthode : on compare les cas favorables à tous les cas possibles dans l’expérience aléatoire.\n\nCalcul : " +
          (`${item.f} correspond à ${item.p}.`) +
          "\n\nConclusion : la probabilité obtenue correspond à l’événement demandé.",
      };
    },
  },
    {
    kind: "fixed",
    id: "proba_convertir_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_convertir",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi une probabilité de 1/2 correspond à 50 %.",
    format: "open",
    expected: ["1/2", "0,5", "50"],
    comparator: "contains_keyword",
    hint: "1/2 signifie une chance sur deux.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise, entre 0 et 1.\n\n" +
          "Méthode : on compare les cas favorables à tous les cas possibles dans l’expérience aléatoire.\n\nCalcul : " +
          ("1/2 = 0,5. Pour passer en pourcentage, on multiplie par 100 : 0,5 = 50 %.") +
          "\n\nConclusion : la probabilité obtenue correspond à l’événement demandé.",
    tags: ["proba_experience", "conversion", "pourcentage", "open"],
  },

  // =========================
  // COMPARER
  // =========================
  {
    kind: "fixed",
    id: "proba_comparer_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle probabilité est la plus grande ?",
    format: "qcm",
    choices: ["1/2", "1/4", "1/6", "1/10"],
    expected: ["1/2"],
    comparator: "mcq_exact",
    hint: "À numérateur égal, plus le dénominateur est petit, plus la fraction est grande.",
    explanation: "Définition : une probabilité mesure la chance qu’un événement se produise, entre 0 et 1.\n\n" +
          "Méthode : on compare les cas favorables à tous les cas possibles dans l’expérience aléatoire.\n\nCalcul : " +
          ("1/2 est plus grand que 1/4, 1/6 et 1/10.") +
          "\n\nConclusion : la probabilité obtenue correspond à l’événement demandé.",
    tags: ["proba_experience", "comparer", "fraction_nombre"],
  },
  {
    kind: "template",
    id: "proba_comparer_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare les fractions ou transforme-les en pourcentages.",
    tags: ["proba_experience", "comparer", "tableau", "template"],
    generate: () => {
      const lignes = [
        ["Rouge", "3", "6", "3/6"],
        ["Bleu", "2", "6", "2/6"],
        ["Vert", "1", "6", "1/6"],
      ];

      return {
        text: "D’après le tableau, quelle couleur a la plus grande probabilité d’être tirée ?",
        format: "qcm",
        choices: ["Rouge", "Bleu", "Vert", "elles sont égales"],
        expected: ["Rouge"],
        comparator: "mcq_exact",
        explanation: "Définition : une probabilité mesure la chance qu’un événement se produise, entre 0 et 1.\n\n" +
          "Méthode : on compare les cas favorables à tous les cas possibles dans l’expérience aléatoire.\n\nCalcul : " +
          ("Rouge correspond à 3/6, Bleu à 2/6 et Vert à 1/6. La plus grande probabilité est Rouge.") +
          "\n\nConclusion : la probabilité obtenue correspond à l’événement demandé.",
        canvas: tableauCanvas(["Couleur", "Favorables", "Total", "Probabilité"], lignes, [[0, 3]]),
      };
    },
  },
    {
    kind: "fixed",
    id: "proba_comparer_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi 1/2 est plus grand que 1/4.",
    format: "open",
    expected: ["moitié", "quart"],
    comparator: "contains_keyword",
    hint: "Compare une moitié et un quart.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise, entre 0 et 1.\n\n" +
          "Méthode : on compare les cas favorables à tous les cas possibles dans l’expérience aléatoire.\n\nCalcul : " +
          ("1/2 représente une moitié, alors que 1/4 représente un quart. Une moitié est plus grande qu’un quart.") +
          "\n\nConclusion : la probabilité obtenue correspond à l’événement demandé.",
    tags: ["proba_experience", "comparer", "fraction_nombre", "open"],
  },

  // =========================
  // DÉFIS
  // =========================
  {
    kind: "fixed",
    id: "proba_defi_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Une probabilité peut-elle être supérieure à 1 ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Une probabilité est comprise entre 0 et 1.",
    explanation: "Définition : une probabilité mesure la chance qu’un événement se produise, entre 0 et 1.\n\n" +
          "Méthode : on compare les cas favorables à tous les cas possibles dans l’expérience aléatoire.\n\nCalcul : " +
          ("Non. Une probabilité est toujours comprise entre 0 et 1.") +
          "\n\nConclusion : la probabilité obtenue correspond à l’événement demandé.",
    tags: ["proba_experience", "defi", "bornes"],
  },
  {
    kind: "template",
    id: "proba_defi_tpl_1",
    niveau: "4e",
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
      const result = `${mangue}/${total}`;

      const elements = [
        ...Array.from({ length: mangue }, () => ({ label: "M", couleur: couleurs.jaune })),
        ...Array.from({ length: ananas }, () => ({ label: "A", couleur: couleurs.vert })),
        ...Array.from({ length: letchis }, () => ({ label: "L", couleur: couleurs.rouge })),
      ];

      return {
        text: `Dans un panier de fruits à La Réunion, il y a ${mangue} mangues, ${ananas} ananas et ${letchis} letchis. On prend un fruit au hasard. Quelle est la probabilité de prendre une mangue ?`,
        format: "qcm",
        choices: makeChoices(result, [
          `${ananas}/${total}`,
          `${letchis}/${total}`,
          `${mangue}/${ananas}`,
        ]),
        expected: [result],
        comparator: "mcq_exact",
        explanation: "Définition : une probabilité mesure la chance qu’un événement se produise, entre 0 et 1.\n\n" +
          "Méthode : on compare les cas favorables à tous les cas possibles dans l’expérience aléatoire.\n\nCalcul : " +
          (`Il y a ${mangue} mangues sur ${total} fruits au total, donc la probabilité est ${result}.`) +
          "\n\nConclusion : la probabilité obtenue correspond à l’événement demandé.",
        canvas: billesCanvas(elements),
      };
    },
  },
  {
    kind: "template",
    id: "proba_defi_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Attention : une roue non équilibrée ne donne pas forcément les mêmes probabilités.",
    tags: ["proba_experience", "roue", "defi", "piege"],
    generate: () => {
      return {
        text: "Sur cette roue, quelle issue est la plus probable ?",
        format: "qcm",
        choices: ["Rouge", "Bleu", "Vert", "Elles sont toutes aussi probables"],
        expected: ["Rouge"],
        comparator: "mcq_exact",
        explanation: "Définition : une probabilité mesure la chance qu’un événement se produise, entre 0 et 1.\n\n" +
          "Méthode : on compare les cas favorables à tous les cas possibles dans l’expérience aléatoire.\n\nCalcul : " +
          ("Le secteur Rouge a le poids le plus grand, donc c’est l’issue la plus probable.") +
          "\n\nConclusion : la probabilité obtenue correspond à l’événement demandé.",
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
    id: "proba_defi_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Compare les poids des secteurs.",
    tags: ["proba_experience", "roue", "defi", "open", "template"],
    generate: () => {
      return {
        text: "Explique pourquoi Rouge est l’issue la plus probable sur cette roue.",
        format: "open",
        expected: ["rouge", "poids", "plus grand"],
        comparator: "contains_keyword",
        explanation:
          "Définition : une probabilité mesure la chance qu’un événement se produise, entre 0 et 1.\n\n" +
          "Méthode : on compare les cas favorables à tous les cas possibles dans l’expérience aléatoire.\n\nCalcul : " +
          ("Le secteur Rouge a un poids 3, alors que Bleu et Vert ont chacun un poids 1. Rouge occupe donc la plus grande partie de la roue.") +
          "\n\nConclusion : la probabilité obtenue correspond à l’événement demandé.",
        canvas: roueCanvas([
          { label: "Rouge", poids: 3, couleur: couleurs.rouge },
          { label: "Bleu", poids: 1, couleur: couleurs.bleu },
          { label: "Vert", poids: 1, couleur: couleurs.vert },
        ]),
      };
    },
  },
];