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

  /* =========================================================
     COMPLÉMENTS (top-up ~10 items / microSkill)
  ========================================================= */

  // ---------- VOCABULAIRE ----------
  {
    kind: "fixed",
    id: "proba_vocabulaire_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Un événement est…",
    format: "qcm",
    choices: [
      "un ensemble d’issues",
      "le nombre total de lancers",
      "la moyenne des résultats",
      "un dé truqué",
    ],
    expected: ["un ensemble d’issues"],
    comparator: "mcq_exact",
    hint: "Un événement regroupe une ou plusieurs issues.",
    explanation:
      "Définition : un événement est un ensemble d’issues d’une expérience.\n\n" +
      "Méthode : on regroupe les issues qui réalisent l’événement.\n\n" +
      "Calcul : par exemple « obtenir un pair » = {2, 4, 6}.\n\n" +
      "Conclusion : un événement est un ensemble d’issues.",
    tags: ["proba_experience", "vocabulaire", "qcm"],
  },
  {
    kind: "fixed",
    id: "proba_vocabulaire_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Une issue, c’est…",
    format: "qcm",
    choices: [
      "un résultat possible de l’expérience",
      "le nombre d’expériences",
      "une probabilité",
      "une moyenne",
    ],
    expected: ["un résultat possible de l’expérience"],
    comparator: "mcq_exact",
    hint: "C’est un résultat possible.",
    explanation:
      "Définition : une issue est un résultat possible d’une expérience aléatoire.\n\n" +
      "Méthode : on liste les résultats possibles.\n\n" +
      "Calcul : pour un dé, une issue est par exemple 4.\n\n" +
      "Conclusion : une issue est un résultat possible.",
    tags: ["proba_experience", "vocabulaire", "qcm"],
  },
  {
    kind: "fixed",
    id: "proba_vocabulaire_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Parmi ces situations, laquelle est une expérience aléatoire ?",
    format: "qcm",
    choices: [
      "lancer un dé",
      "calculer 2 + 3",
      "mesurer la longueur d’une table",
      "ranger des nombres dans l’ordre",
    ],
    expected: ["lancer un dé"],
    comparator: "mcq_exact",
    hint: "Le résultat doit être imprévisible.",
    explanation:
      "Définition : une expérience aléatoire a un résultat imprévisible.\n\n" +
      "Méthode : on cherche la situation au résultat incertain.\n\n" +
      "Calcul : lancer un dé donne un résultat non connu à l’avance.\n\n" +
      "Conclusion : lancer un dé est une expérience aléatoire.",
    tags: ["proba_experience", "vocabulaire", "qcm"],
  },
  {
    kind: "fixed",
    id: "proba_vocabulaire_fixed_6",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Un événement « certain » est un événement qui…",
    format: "qcm",
    choices: [
      "se réalise toujours",
      "ne se réalise jamais",
      "a une chance sur deux",
      "dépend du joueur",
    ],
    expected: ["se réalise toujours"],
    comparator: "mcq_exact",
    hint: "Sa probabilité vaut 1.",
    explanation:
      "Définition : un événement certain se produit à coup sûr (probabilité 1).\n\n" +
      "Méthode : on regarde si toutes les issues le réalisent.\n\n" +
      "Calcul : sa probabilité est 1.\n\n" +
      "Conclusion : un événement certain se réalise toujours.",
    tags: ["proba_experience", "vocabulaire", "qcm"],
  },
  {
    kind: "template",
    id: "proba_vocabulaire_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    hint: "Issue = un résultat ; événement = un ensemble d’issues.",
    tags: ["proba_experience", "vocabulaire", "template"],
    generate: () => {
      const cas = randomChoice([
        { texte: "obtenir 5 en lançant un dé", rep: "une issue" },
        { texte: "obtenir un nombre pair en lançant un dé", rep: "un événement" },
        { texte: "lancer une pièce de monnaie", rep: "une expérience aléatoire" },
      ]);
      return {
        text: `Comment appelle-t-on : « ${cas.texte} » ?`,
        format: "qcm",
        choices: makeChoices(cas.rep, ["une moyenne", "une fréquence", "un pourcentage", "une issue", "un événement", "une expérience aléatoire"].filter((x) => x !== cas.rep)),
        expected: [cas.rep],
        comparator: "mcq_exact",
        explanation:
          "Définition : on distingue expérience, issue et événement.\n\n" +
          "Méthode : une issue est un résultat unique ; un événement regroupe des issues ; l’expérience est l’action.\n\n" +
          `Calcul : « ${cas.texte} » est ${cas.rep}.\n\n` +
          `Conclusion : c’est ${cas.rep}.`,
      };
    },
  },
  {
    kind: "template",
    id: "proba_vocabulaire_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    hint: "Un événement certain a toujours lieu, un impossible jamais.",
    tags: ["proba_experience", "vocabulaire", "template"],
    generate: () => {
      const cas = randomChoice([
        { texte: "obtenir un nombre entre 1 et 6 avec un dé", rep: "certain" },
        { texte: "obtenir 9 avec un dé à 6 faces", rep: "impossible" },
      ]);
      return {
        text: `L’événement « ${cas.texte} » est…`,
        format: "qcm",
        choices: ["certain", "impossible"],
        expected: [cas.rep],
        comparator: "mcq_exact",
        explanation:
          "Définition : un événement certain se réalise toujours, un impossible jamais.\n\n" +
          "Méthode : on regarde si l’événement peut ou non se produire.\n\n" +
          `Calcul : « ${cas.texte} » est ${cas.rep}.\n\n` +
          `Conclusion : l’événement est ${cas.rep}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "proba_vocabulaire_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Explique la différence entre une issue et un événement.",
    format: "open",
    expected: ["issue", "événement", "résultat"],
    comparator: "contains_keyword",
    hint: "L’un est un seul résultat, l’autre un ensemble.",
    explanation:
      "Définition : une issue est un résultat unique ; un événement est un ensemble d’issues.\n\n" +
      "Méthode : on compte les résultats concernés.\n\n" +
      "Calcul : « obtenir 4 » est une issue ; « obtenir un pair » est un événement.\n\n" +
      "Conclusion : une issue est un seul résultat, un événement en regroupe plusieurs.",
    tags: ["proba_experience", "vocabulaire", "open"],
  },

  // ---------- ISSUES ----------
  {
    kind: "fixed",
    id: "proba_issue_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 1,
    theme: "neutral",
    text: "Combien y a-t-il d’issues possibles lorsqu’on lance une pièce de monnaie ?",
    format: "qcm",
    choices: ["2", "1", "6", "4"],
    expected: ["2"],
    comparator: "mcq_exact",
    hint: "Pile ou face.",
    explanation:
      "Définition : une issue est un résultat possible.\n\n" +
      "Méthode : on liste les résultats d’une pièce.\n\n" +
      "Calcul : pile et face, soit 2 issues.\n\n" +
      "Conclusion : il y a 2 issues.",
    tags: ["proba_experience", "issue", "qcm"],
  },
  {
    kind: "fixed",
    id: "proba_issue_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 1,
    theme: "neutral",
    text: "Une roue est partagée en 4 secteurs de couleurs différentes. Combien d’issues a-t-elle ?",
    format: "qcm",
    choices: ["4", "2", "1", "8"],
    expected: ["4"],
    comparator: "mcq_exact",
    hint: "Une issue par secteur.",
    explanation:
      "Définition : chaque secteur est une issue possible.\n\n" +
      "Méthode : on compte les secteurs.\n\n" +
      "Calcul : 4 secteurs = 4 issues.\n\n" +
      "Conclusion : il y a 4 issues.",
    tags: ["proba_experience", "issue", "qcm"],
  },
  {
    kind: "fixed",
    id: "proba_issue_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 2,
    theme: "neutral",
    text: "Quelles sont les issues possibles lorsqu’on lance une pièce ?",
    format: "qcm",
    choices: ["pile et face", "1 et 6", "rouge et bleu", "vrai et impossible"],
    expected: ["pile et face"],
    comparator: "mcq_exact",
    hint: "Une pièce a deux côtés.",
    explanation:
      "Définition : les issues sont les résultats possibles.\n\n" +
      "Méthode : on liste les deux côtés de la pièce.\n\n" +
      "Calcul : ce sont pile et face.\n\n" +
      "Conclusion : les issues sont pile et face.",
    tags: ["proba_experience", "issue", "qcm"],
  },
  {
    kind: "template",
    id: "proba_issue_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 1,
    theme: "neutral",
    hint: "Compte toutes les billes.",
    tags: ["proba_experience", "issue", "billes", "template"],
    generate: () => {
      const rouges = randomInt(2, 5);
      const vertes = randomInt(1, 4);
      const jaunes = randomInt(1, 4);
      const total = rouges + vertes + jaunes;
      const elements = [
        ...Array.from({ length: rouges }, () => ({ couleur: couleurs.rouge })),
        ...Array.from({ length: vertes }, () => ({ couleur: couleurs.vert })),
        ...Array.from({ length: jaunes }, () => ({ couleur: couleurs.jaune })),
      ];
      return {
        text: `Un sac contient ${rouges} billes rouges, ${vertes} vertes et ${jaunes} jaunes. Combien de billes en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation:
          "Définition : le nombre d’issues correspond au nombre total de billes.\n\n" +
          "Méthode : on additionne toutes les billes.\n\n" +
          `Calcul : ${rouges} + ${vertes} + ${jaunes} = ${total}.\n\n` +
          `Conclusion : il y a ${total} billes.`,
        canvas: billesCanvas(elements),
      };
    },
  },
  {
    kind: "template",
    id: "proba_issue_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte le nombre de cartes.",
    tags: ["proba_experience", "issue", "template"],
    generate: () => {
      const n = randomChoice([5, 8, 10, 12]);
      return {
        text: `On tire une carte au hasard dans un paquet de ${n} cartes toutes différentes. Combien y a-t-il d’issues possibles ?`,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation:
          "Définition : une issue est un résultat possible.\n\n" +
          "Méthode : chaque carte est une issue.\n\n" +
          `Calcul : il y a ${n} cartes, donc ${n} issues.\n\n` +
          `Conclusion : il y a ${n} issues.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "proba_issue_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 2,
    theme: "neutral",
    text: "Explique comment trouver le nombre d’issues d’une expérience.",
    format: "open",
    expected: ["résultats", "possibles", "compte"],
    comparator: "contains_keyword",
    hint: "On liste les résultats possibles.",
    explanation:
      "Définition : le nombre d’issues est le nombre de résultats possibles.\n\n" +
      "Méthode : on liste tous les résultats que l’expérience peut donner.\n\n" +
      "Calcul : on les compte un par un.\n\n" +
      "Conclusion : le nombre d’issues est le nombre de résultats possibles.",
    tags: ["proba_experience", "issue", "open"],
  },

  // ---------- ÉVÉNEMENTS ----------
  {
    kind: "fixed",
    id: "proba_evenement_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_evenement",
    difficulty: 2,
    theme: "neutral",
    text: "Au lancer d’un dé, l’événement « obtenir un nombre positif » est…",
    format: "qcm",
    choices: ["certain", "impossible", "improbable", "vide"],
    expected: ["certain"],
    comparator: "mcq_exact",
    hint: "Toutes les faces sont positives.",
    explanation:
      "Définition : un événement certain se réalise toujours.\n\n" +
      "Méthode : on vérifie que toutes les issues le réalisent.\n\n" +
      "Calcul : 1, 2, 3, 4, 5, 6 sont tous positifs.\n\n" +
      "Conclusion : l’événement est certain.",
    tags: ["proba_experience", "evenement", "certain", "qcm"],
    canvas: deCanvas([1, 2, 3, 4, 5, 6]),
  },
  {
    kind: "fixed",
    id: "proba_evenement_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_evenement",
    difficulty: 2,
    theme: "neutral",
    text: "Au lancer d’un dé, quel est l’événement contraire de « obtenir 6 » ?",
    format: "qcm",
    choices: ["ne pas obtenir 6", "obtenir un nombre pair", "obtenir 1", "obtenir 6 deux fois"],
    expected: ["ne pas obtenir 6"],
    comparator: "mcq_exact",
    hint: "Le contraire regroupe toutes les autres issues.",
    explanation:
      "Définition : l’événement contraire contient toutes les issues qui ne réalisent pas l’événement.\n\n" +
      "Méthode : on prend le complément de « obtenir 6 ».\n\n" +
      "Calcul : c’est « ne pas obtenir 6 » (soit 1, 2, 3, 4 ou 5).\n\n" +
      "Conclusion : le contraire est « ne pas obtenir 6 ».",
    tags: ["proba_experience", "evenement", "contraire", "qcm"],
  },
  {
    kind: "fixed",
    id: "proba_evenement_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_evenement",
    difficulty: 2,
    theme: "neutral",
    text: "Au lancer d’un dé, l’événement « obtenir un nombre supérieur à 4 » correspond à quelles issues ?",
    format: "qcm",
    choices: ["5 et 6", "4 et 5", "1, 2 et 3", "6 seulement"],
    expected: ["5 et 6"],
    comparator: "mcq_exact",
    hint: "Strictement supérieur à 4.",
    explanation:
      "Définition : un événement regroupe les issues qui le réalisent.\n\n" +
      "Méthode : on cherche les faces strictement supérieures à 4.\n\n" +
      "Calcul : ce sont 5 et 6.\n\n" +
      "Conclusion : les issues sont 5 et 6.",
    tags: ["proba_experience", "evenement", "qcm"],
    canvas: deCanvas([5, 6]),
  },
  {
    kind: "template",
    id: "proba_evenement_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_evenement",
    difficulty: 2,
    theme: "neutral",
    hint: "Certain = toujours ; impossible = jamais.",
    tags: ["proba_experience", "evenement", "template"],
    generate: () => {
      const cas = randomChoice([
        { texte: "obtenir un nombre inférieur à 10", rep: "certain", faces: [1, 2, 3, 4, 5, 6] },
        { texte: "obtenir 0", rep: "impossible", faces: [] },
        { texte: "obtenir un nombre supérieur à 6", rep: "impossible", faces: [] },
      ]);
      return {
        text: `Au lancer d’un dé, l’événement « ${cas.texte} » est…`,
        format: "qcm",
        choices: ["certain", "impossible"],
        expected: [cas.rep],
        comparator: "mcq_exact",
        explanation:
          "Définition : un événement certain se réalise toujours, un impossible jamais.\n\n" +
          "Méthode : on regarde si des issues réalisent l’événement.\n\n" +
          `Calcul : « ${cas.texte} » est ${cas.rep}.\n\n` +
          `Conclusion : l’événement est ${cas.rep}.`,
        canvas: deCanvas(cas.faces),
      };
    },
  },
  {
    kind: "template",
    id: "proba_evenement_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_evenement",
    difficulty: 3,
    theme: "neutral",
    hint: "Le contraire est tout ce qui n’est pas l’événement.",
    tags: ["proba_experience", "evenement", "contraire", "template"],
    generate: () => {
      const n = randomInt(1, 6);
      const contraire = `ne pas obtenir ${n}`;
      return {
        text: `Quel est l’événement contraire de « obtenir ${n} » au lancer d’un dé ?`,
        format: "qcm",
        choices: makeChoices(contraire, [
          `obtenir ${n}`,
          "obtenir un nombre pair",
          "obtenir un nombre supérieur à 6",
        ]),
        expected: [contraire],
        comparator: "mcq_exact",
        explanation:
          "Définition : l’événement contraire regroupe les issues restantes.\n\n" +
          `Méthode : on retire l’issue ${n}.\n\n` +
          `Calcul : le contraire de « obtenir ${n} » est « ${contraire} ».\n\n` +
          `Conclusion : c’est « ${contraire} ».`,
      };
    },
  },
  {
    kind: "fixed",
    id: "proba_evenement_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_evenement",
    difficulty: 3,
    theme: "neutral",
    text: "Explique ce qu’est l’événement contraire d’un événement.",
    format: "open",
    expected: ["contraire", "issues", "réalisent"],
    comparator: "contains_keyword",
    hint: "Toutes les issues qui ne réalisent pas l’événement.",
    explanation:
      "Définition : l’événement contraire regroupe toutes les issues qui ne réalisent pas l’événement.\n\n" +
      "Méthode : on prend le complément de l’événement.\n\n" +
      "Calcul : par exemple le contraire de « pair » est « impair ».\n\n" +
      "Conclusion : le contraire regroupe les issues qui ne réalisent pas l’événement.",
    tags: ["proba_experience", "evenement", "open"],
  },

  // ---------- ÉQUIPROBABILITÉ ----------
  {
    kind: "fixed",
    id: "proba_equiprobabilite_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_equiprobabilite",
    difficulty: 1,
    theme: "neutral",
    text: "Avec une pièce équilibrée, pile et face ont-ils la même probabilité ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Une pièce équilibrée ne favorise aucun côté.",
    explanation:
      "Définition : une situation est équiprobable si toutes les issues ont la même probabilité.\n\n" +
      "Méthode : on vérifie que la pièce n’est pas truquée.\n\n" +
      "Calcul : pile et face ont chacun une probabilité 1/2.\n\n" +
      "Conclusion : oui, c’est équiprobable.",
    tags: ["proba_experience", "equiprobabilite", "qcm"],
  },
  {
    kind: "fixed",
    id: "proba_equiprobabilite_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_equiprobabilite",
    difficulty: 2,
    theme: "neutral",
    text: "Un dé est truqué pour tomber plus souvent sur 6. La situation est-elle équiprobable ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Une face est favorisée.",
    explanation:
      "Définition : l’équiprobabilité exige que toutes les issues aient la même probabilité.\n\n" +
      "Méthode : on vérifie si une issue est favorisée.\n\n" +
      "Calcul : ici 6 est favorisé, donc les probabilités diffèrent.\n\n" +
      "Conclusion : non, ce n’est pas équiprobable.",
    tags: ["proba_experience", "equiprobabilite", "qcm"],
  },
  {
    kind: "fixed",
    id: "proba_equiprobabilite_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_equiprobabilite",
    difficulty: 2,
    theme: "neutral",
    text: "« Équiprobable » signifie que…",
    format: "qcm",
    choices: [
      "toutes les issues ont la même probabilité",
      "il y a une seule issue",
      "la probabilité est nulle",
      "une issue est favorisée",
    ],
    expected: ["toutes les issues ont la même probabilité"],
    comparator: "mcq_exact",
    hint: "« équi » = égal.",
    explanation:
      "Définition : équiprobable signifie « même probabilité pour toutes les issues ».\n\n" +
      "Méthode : on compare les probabilités des issues.\n\n" +
      "Calcul : si elles sont toutes égales, c’est équiprobable.\n\n" +
      "Conclusion : équiprobable = toutes les issues ont la même probabilité.",
    tags: ["proba_experience", "equiprobabilite", "qcm"],
  },
  {
    kind: "fixed",
    id: "proba_equiprobabilite_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_equiprobabilite",
    difficulty: 2,
    theme: "neutral",
    text: "Avec un dé équilibré, quelle est la probabilité de chaque face ?",
    format: "qcm",
    choices: ["1/6", "1/2", "1/3", "6"],
    expected: ["1/6"],
    comparator: "mcq_exact",
    hint: "6 faces équiprobables.",
    explanation:
      "Définition : en situation équiprobable, chaque issue a la même probabilité.\n\n" +
      "Méthode : on divise 1 par le nombre d’issues.\n\n" +
      "Calcul : 1 ÷ 6 = 1/6.\n\n" +
      "Conclusion : chaque face a une probabilité 1/6.",
    tags: ["proba_experience", "equiprobabilite", "qcm"],
    canvas: deCanvas(),
  },
  {
    kind: "fixed",
    id: "proba_equiprobabilite_fixed_6",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_equiprobabilite",
    difficulty: 2,
    theme: "neutral",
    text: "Une roue partagée en 3 secteurs identiques est-elle équiprobable ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Secteurs identiques = mêmes chances.",
    explanation:
      "Définition : l’équiprobabilité exige des issues de même probabilité.\n\n" +
      "Méthode : on compare les tailles des secteurs.\n\n" +
      "Calcul : 3 secteurs identiques donnent chacun 1/3.\n\n" +
      "Conclusion : oui, c’est équiprobable.",
    tags: ["proba_experience", "equiprobabilite", "roue", "qcm"],
    canvas: roueCanvas([
      { label: "A", poids: 1, couleur: couleurs.rouge },
      { label: "B", poids: 1, couleur: couleurs.bleu },
      { label: "C", poids: 1, couleur: couleurs.vert },
    ]),
  },
  {
    kind: "template",
    id: "proba_equiprobabilite_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_equiprobabilite",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde si toutes les billes sont en même quantité par couleur.",
    tags: ["proba_experience", "equiprobabilite", "billes", "template"],
    generate: () => {
      const equal = randomChoice([true, false]);
      const n = randomInt(2, 4);
      const rouges = n;
      const bleues = equal ? n : n + randomInt(1, 2);
      const elements = [
        ...Array.from({ length: rouges }, () => ({ couleur: couleurs.rouge })),
        ...Array.from({ length: bleues }, () => ({ couleur: couleurs.bleu })),
      ];
      return {
        text: "En tirant une bille au hasard, a-t-on autant de chances d’avoir une rouge qu’une bleue ?",
        format: "qcm",
        choices: ["oui", "non"],
        expected: [equal ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          "Définition : l’équiprobabilité demande le même nombre de cas favorables.\n\n" +
          "Méthode : on compare le nombre de billes de chaque couleur.\n\n" +
          `Calcul : ${rouges} rouges et ${bleues} bleues.\n\n` +
          `Conclusion : ${equal ? "oui, les chances sont égales" : "non, une couleur est plus probable"}.`,
        canvas: billesCanvas(elements),
      };
    },
  },
  {
    kind: "fixed",
    id: "proba_equiprobabilite_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_equiprobabilite",
    difficulty: 2,
    theme: "neutral",
    text: "Explique ce que signifie une situation équiprobable, avec un exemple.",
    format: "open",
    expected: ["même", "probabilité", "issues"],
    comparator: "contains_keyword",
    hint: "Pense au dé équilibré.",
    explanation:
      "Définition : une situation est équiprobable si toutes les issues ont la même probabilité.\n\n" +
      "Méthode : on vérifie qu’aucune issue n’est favorisée.\n\n" +
      "Calcul : un dé équilibré donne 1/6 pour chaque face.\n\n" +
      "Conclusion : équiprobable signifie que toutes les issues ont la même probabilité.",
    tags: ["proba_experience", "equiprobabilite", "open"],
  },

  // ---------- CALCULER UNE PROBABILITÉ ----------
  {
    kind: "fixed",
    id: "proba_calculer_fraction_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_calculer_fraction",
    difficulty: 2,
    theme: "neutral",
    text: "On lance un dé équilibré. Quelle est la probabilité d’obtenir 3 ?",
    format: "qcm",
    choices: ["1/6", "3/6", "1/3", "1/2"],
    expected: ["1/6"],
    comparator: "mcq_exact",
    hint: "Une seule face favorable sur six.",
    explanation:
      "Définition : probabilité = cas favorables ÷ cas possibles.\n\n" +
      "Méthode : il y a 1 face « 3 » sur 6.\n\n" +
      "Calcul : 1 ÷ 6 = 1/6.\n\n" +
      "Conclusion : la probabilité est 1/6.",
    tags: ["proba_experience", "fraction", "qcm"],
    canvas: deCanvas([3]),
  },
  {
    kind: "fixed",
    id: "proba_calculer_fraction_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_calculer_fraction",
    difficulty: 2,
    theme: "neutral",
    text: "On lance un dé équilibré. Quelle est la probabilité d’obtenir un nombre impair ?",
    format: "qcm",
    choices: ["3/6", "1/6", "2/6", "4/6"],
    expected: ["3/6"],
    comparator: "mcq_exact",
    hint: "Les impairs sont 1, 3, 5.",
    explanation:
      "Définition : probabilité = cas favorables ÷ cas possibles.\n\n" +
      "Méthode : les impairs sont 1, 3, 5 (3 cas).\n\n" +
      "Calcul : 3 ÷ 6 = 3/6.\n\n" +
      "Conclusion : la probabilité est 3/6.",
    tags: ["proba_experience", "fraction", "qcm"],
    canvas: deCanvas([1, 3, 5]),
  },
  {
    kind: "template",
    id: "proba_calculer_fraction_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_calculer_fraction",
    difficulty: 2,
    theme: "neutral",
    hint: "Probabilité = billes de la couleur ÷ total.",
    tags: ["proba_experience", "billes", "fraction", "template"],
    generate: () => {
      const vertes = randomInt(1, 5);
      const autres = randomInt(2, 6);
      const total = vertes + autres;
      const result = `${vertes}/${total}`;
      const elements = [
        ...Array.from({ length: vertes }, () => ({ couleur: couleurs.vert })),
        ...Array.from({ length: autres }, () => ({ couleur: couleurs.bleu })),
      ];
      return {
        text: `Un sac contient ${vertes} billes vertes et ${autres} billes bleues. Quelle est la probabilité de tirer une bille verte ?`,
        format: "qcm",
        choices: makeChoices(result, [`${autres}/${total}`, `${vertes}/${autres}`, `${total}/${vertes}`]),
        expected: [result],
        comparator: "mcq_exact",
        explanation:
          "Définition : probabilité = cas favorables ÷ cas possibles.\n\n" +
          `Méthode : ${vertes} vertes sur ${total} billes.\n\n` +
          `Calcul : ${vertes} ÷ ${total} = ${result}.\n\n` +
          `Conclusion : la probabilité est ${result}.`,
        canvas: billesCanvas(elements),
      };
    },
  },
  {
    kind: "template",
    id: "proba_calculer_fraction_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_calculer_fraction",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les faces qui réalisent la condition.",
    tags: ["proba_experience", "de", "fraction", "template"],
    generate: () => {
      const cas = randomChoice([
        { texte: "un nombre supérieur à 4", faces: [5, 6], fav: 2 },
        { texte: "un nombre inférieur à 3", faces: [1, 2], fav: 2 },
        { texte: "un multiple de 3", faces: [3, 6], fav: 2 },
        { texte: "un nombre pair", faces: [2, 4, 6], fav: 3 },
      ]);
      const result = `${cas.fav}/6`;
      return {
        text: `On lance un dé équilibré. Quelle est la probabilité d’obtenir ${cas.texte} ?`,
        format: "qcm",
        choices: makeChoices(result, ["1/6", "4/6", `${cas.fav}/3`]),
        expected: [result],
        comparator: "mcq_exact",
        explanation:
          "Définition : probabilité = cas favorables ÷ cas possibles.\n\n" +
          `Méthode : les faces favorables sont ${cas.faces.join(", ")}.\n\n` +
          `Calcul : ${cas.fav} cas sur 6, soit ${result}.\n\n` +
          `Conclusion : la probabilité est ${result}.`,
        canvas: deCanvas(cas.faces),
      };
    },
  },
  {
    kind: "template",
    id: "proba_calculer_fraction_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_calculer_fraction",
    difficulty: 3,
    theme: "neutral",
    hint: "Probabilité = cartes favorables ÷ total.",
    tags: ["proba_experience", "fraction", "template"],
    generate: () => {
      const favorables = randomInt(1, 4);
      const total = randomChoice([8, 10, 12]);
      const result = `${favorables}/${total}`;
      return {
        text: `Dans un jeu de ${total} cartes, ${favorables} cartes sont gagnantes. Quelle est la probabilité de tirer une carte gagnante ?`,
        format: "qcm",
        choices: makeChoices(result, [`${total}/${favorables}`, `${favorables}/${total - favorables}`, `1/${total}`]),
        expected: [result],
        comparator: "mcq_exact",
        explanation:
          "Définition : probabilité = cas favorables ÷ cas possibles.\n\n" +
          `Méthode : ${favorables} cartes gagnantes sur ${total}.\n\n` +
          `Calcul : ${favorables} ÷ ${total} = ${result}.\n\n` +
          `Conclusion : la probabilité est ${result}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "proba_calculer_fraction_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_calculer_fraction",
    difficulty: 3,
    theme: "neutral",
    text: "Explique la formule qui permet de calculer une probabilité.",
    format: "open",
    expected: ["favorables", "possibles", "divise"],
    comparator: "contains_keyword",
    hint: "C’est un quotient.",
    explanation:
      "Définition : une probabilité est un quotient.\n\n" +
      "Méthode : on divise le nombre de cas favorables par le nombre de cas possibles.\n\n" +
      "Calcul : probabilité = cas favorables ÷ cas possibles.\n\n" +
      "Conclusion : on divise les cas favorables par les cas possibles.",
    tags: ["proba_experience", "fraction", "open"],
  },

  // ---------- CONVERTIR ----------
  {
    kind: "fixed",
    id: "proba_convertir_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "La probabilité 1/4 correspond à…",
    format: "qcm",
    choices: ["25 %", "40 %", "14 %", "75 %"],
    expected: ["25 %"],
    comparator: "mcq_exact",
    hint: "1/4 = 0,25.",
    explanation:
      "Définition : on convertit une fraction en pourcentage.\n\n" +
      "Méthode : 1/4 = 0,25, puis × 100.\n\n" +
      "Calcul : 0,25 = 25 %.\n\n" +
      "Conclusion : 1/4 = 25 %.",
    tags: ["proba_experience", "pourcentage", "qcm"],
  },
  {
    kind: "fixed",
    id: "proba_convertir_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "La probabilité 1/10 correspond à…",
    format: "qcm",
    choices: ["10 %", "1 %", "100 %", "50 %"],
    expected: ["10 %"],
    comparator: "mcq_exact",
    hint: "1/10 = 0,1.",
    explanation:
      "Définition : on convertit la fraction en pourcentage.\n\n" +
      "Méthode : 1/10 = 0,1, puis × 100.\n\n" +
      "Calcul : 0,1 = 10 %.\n\n" +
      "Conclusion : 1/10 = 10 %.",
    tags: ["proba_experience", "pourcentage", "qcm"],
  },
  {
    kind: "fixed",
    id: "proba_convertir_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "Une probabilité de 0 correspond à quel pourcentage ?",
    format: "qcm",
    choices: ["0 %", "100 %", "50 %", "10 %"],
    expected: ["0 %"],
    comparator: "mcq_exact",
    hint: "Probabilité 0 = événement impossible.",
    explanation:
      "Définition : une probabilité de 0 correspond à un événement impossible.\n\n" +
      "Méthode : on convertit 0 en pourcentage.\n\n" +
      "Calcul : 0 × 100 = 0 %.\n\n" +
      "Conclusion : une probabilité de 0 vaut 0 %.",
    tags: ["proba_experience", "pourcentage", "qcm"],
  },
  {
    kind: "fixed",
    id: "proba_convertir_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "Une probabilité de 1 correspond à quel pourcentage ?",
    format: "qcm",
    choices: ["100 %", "10 %", "50 %", "0 %"],
    expected: ["100 %"],
    comparator: "mcq_exact",
    hint: "Probabilité 1 = événement certain.",
    explanation:
      "Définition : une probabilité de 1 correspond à un événement certain.\n\n" +
      "Méthode : on convertit 1 en pourcentage.\n\n" +
      "Calcul : 1 × 100 = 100 %.\n\n" +
      "Conclusion : une probabilité de 1 vaut 100 %.",
    tags: ["proba_experience", "pourcentage", "qcm"],
  },
  {
    kind: "template",
    id: "proba_convertir_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_convertir",
    difficulty: 3,
    theme: "neutral",
    hint: "Convertis la fraction en pourcentage.",
    tags: ["proba_experience", "pourcentage", "template"],
    generate: () => {
      const item = randomChoice([
        { f: "2/5", p: "40 %" },
        { f: "3/10", p: "30 %" },
        { f: "1/2", p: "50 %" },
        { f: "1/4", p: "25 %" },
      ]);
      return {
        text: `À quel pourcentage correspond la probabilité ${item.f} ?`,
        format: "qcm",
        choices: makeChoices(item.p, ["10 %", "20 %", "30 %", "40 %", "50 %"].filter((x) => x !== item.p)),
        expected: [item.p],
        comparator: "mcq_exact",
        explanation:
          "Définition : on convertit la fraction en pourcentage.\n\n" +
          "Méthode : on transforme la fraction en décimal puis × 100.\n\n" +
          `Calcul : ${item.f} = ${item.p}.\n\n` +
          `Conclusion : ${item.f} correspond à ${item.p}.`,
      };
    },
  },
  {
    kind: "template",
    id: "proba_convertir_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_convertir",
    difficulty: 3,
    theme: "neutral",
    hint: "Convertis le pourcentage en fraction simple.",
    tags: ["proba_experience", "pourcentage", "reciproque", "template"],
    generate: () => {
      const item = randomChoice([
        { p: "50 %", f: "1/2" },
        { p: "25 %", f: "1/4" },
        { p: "20 %", f: "1/5" },
        { p: "10 %", f: "1/10" },
      ]);
      return {
        text: `À quelle probabilité (fraction simple) correspond ${item.p} ?`,
        format: "qcm",
        choices: makeChoices(item.f, ["1/2", "1/4", "1/5", "1/10"].filter((x) => x !== item.f)),
        expected: [item.f],
        comparator: "mcq_exact",
        explanation:
          "Définition : un pourcentage est une fraction sur 100.\n\n" +
          "Méthode : on écrit le pourcentage sur 100 puis on simplifie.\n\n" +
          `Calcul : ${item.p} = ${item.f}.\n\n` +
          `Conclusion : ${item.p} correspond à ${item.f}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "proba_convertir_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_convertir",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi une probabilité est toujours comprise entre 0 % et 100 %.",
    format: "open",
    expected: ["0", "100", "impossible"],
    comparator: "contains_keyword",
    hint: "0 = impossible, 100 % = certain.",
    explanation:
      "Définition : une probabilité est comprise entre 0 et 1, soit 0 % et 100 %.\n\n" +
      "Méthode : 0 correspond à l’impossible, 1 au certain.\n\n" +
      "Calcul : aucun événement ne peut avoir plus de 100 % de chances.\n\n" +
      "Conclusion : une probabilité est toujours entre 0 % et 100 %.",
    tags: ["proba_experience", "pourcentage", "open"],
  },

  // ---------- COMPARER ----------
  {
    kind: "fixed",
    id: "proba_comparer_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle probabilité est la plus grande : 3/6 ou 2/6 ?",
    format: "qcm",
    choices: ["3/6", "2/6", "elles sont égales"],
    expected: ["3/6"],
    comparator: "mcq_exact",
    hint: "Même dénominateur : on compare les numérateurs.",
    explanation:
      "Définition : à dénominateur égal, la plus grande probabilité a le plus grand numérateur.\n\n" +
      "Méthode : on compare 3 et 2.\n\n" +
      "Calcul : 3 > 2.\n\n" +
      "Conclusion : 3/6 est la plus grande.",
    tags: ["proba_experience", "comparer", "qcm"],
  },
  {
    kind: "fixed",
    id: "proba_comparer_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Une probabilité plus grande signifie…",
    format: "qcm",
    choices: [
      "plus de chances que l’événement se produise",
      "moins de chances",
      "un événement impossible",
      "rien de particulier",
    ],
    expected: ["plus de chances que l’événement se produise"],
    comparator: "mcq_exact",
    hint: "Plus la probabilité est proche de 1, plus c’est probable.",
    explanation:
      "Définition : une probabilité mesure la chance d’un événement.\n\n" +
      "Méthode : on compare les valeurs.\n\n" +
      "Calcul : plus la probabilité est grande, plus l’événement est probable.\n\n" +
      "Conclusion : une probabilité plus grande = plus de chances.",
    tags: ["proba_experience", "comparer", "qcm"],
  },
  {
    kind: "fixed",
    id: "proba_comparer_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Les probabilités 1/2 et 50 % sont-elles égales ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "1/2 = 0,5 = 50 %.",
    explanation:
      "Définition : une probabilité peut s’écrire en fraction ou en pourcentage.\n\n" +
      "Méthode : on convertit 1/2 en pourcentage.\n\n" +
      "Calcul : 1/2 = 0,5 = 50 %.\n\n" +
      "Conclusion : oui, elles sont égales.",
    tags: ["proba_experience", "comparer", "qcm"],
  },
  {
    kind: "template",
    id: "proba_comparer_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare le nombre de billes de chaque couleur.",
    tags: ["proba_experience", "comparer", "billes", "template"],
    generate: () => {
      const rouges = randomInt(2, 6);
      let bleues = randomInt(2, 6);
      while (bleues === rouges) bleues = randomInt(2, 6);
      const correct = rouges > bleues ? "rouge" : "bleue";
      const elements = [
        ...Array.from({ length: rouges }, () => ({ couleur: couleurs.rouge })),
        ...Array.from({ length: bleues }, () => ({ couleur: couleurs.bleu })),
      ];
      return {
        text: `Un sac contient ${rouges} billes rouges et ${bleues} billes bleues. Quelle couleur a-t-on le plus de chances de tirer ?`,
        format: "qcm",
        choices: ["rouge", "bleue", "autant l’une que l’autre"],
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : plus une couleur a de billes, plus elle est probable.\n\n" +
          "Méthode : on compare les effectifs.\n\n" +
          `Calcul : ${rouges} rouges contre ${bleues} bleues.\n\n` +
          `Conclusion : on a plus de chances de tirer une bille ${correct}.`,
        canvas: billesCanvas(elements),
      };
    },
  },
  {
    kind: "template",
    id: "proba_comparer_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "À numérateur 1, le plus petit dénominateur donne la plus grande probabilité.",
    tags: ["proba_experience", "comparer", "template"],
    generate: () => {
      const a = randomChoice([2, 3, 4]);
      let b = randomChoice([5, 6, 8, 10]);
      const correct = `1/${a}`;
      return {
        text: `Quelle probabilité est la plus grande : 1/${a} ou 1/${b} ?`,
        format: "qcm",
        choices: [`1/${a}`, `1/${b}`, "elles sont égales"],
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : à numérateur égal, plus le dénominateur est petit, plus la fraction est grande.\n\n" +
          `Méthode : on compare ${a} et ${b}.\n\n` +
          `Calcul : ${a} < ${b}, donc 1/${a} > 1/${b}.\n\n` +
          `Conclusion : la plus grande est 1/${a}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "proba_comparer_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment comparer deux probabilités données en fractions de dénominateurs différents.",
    format: "open",
    expected: ["même dénominateur", "comparer", "pourcentage"],
    comparator: "contains_keyword",
    hint: "On peut les mettre au même dénominateur ou en pourcentage.",
    explanation:
      "Définition : comparer deux probabilités, c’est comparer deux fractions.\n\n" +
      "Méthode : on les met au même dénominateur ou on les convertit en pourcentage.\n\n" +
      "Calcul : on compare ensuite les numérateurs ou les pourcentages.\n\n" +
      "Conclusion : on uniformise l’écriture avant de comparer.",
    tags: ["proba_experience", "comparer", "open"],
  },

  // ---------- DÉFIS ----------
  {
    kind: "fixed",
    id: "proba_defi_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Une probabilité de 0 signifie que l’événement est…",
    format: "qcm",
    choices: ["impossible", "certain", "probable", "équiprobable"],
    expected: ["impossible"],
    comparator: "mcq_exact",
    hint: "0 = aucune chance.",
    explanation:
      "Définition : une probabilité de 0 correspond à un événement impossible.\n\n" +
      "Méthode : aucune issue ne réalise l’événement.\n\n" +
      "Calcul : 0 cas favorable sur les cas possibles.\n\n" +
      "Conclusion : l’événement est impossible.",
    tags: ["proba_experience", "defi", "qcm"],
  },
  {
    kind: "fixed",
    id: "proba_defi_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 4,
    theme: "neutral",
    text: "On lance un dé. La probabilité d’obtenir « pair » est 3/6. Quelle est la probabilité d’obtenir « impair » ?",
    format: "qcm",
    choices: ["3/6", "1/6", "2/6", "6/6"],
    expected: ["3/6"],
    comparator: "mcq_exact",
    hint: "L’événement contraire : 1 - 3/6.",
    explanation:
      "Définition : la probabilité de l’événement contraire vaut 1 moins la probabilité de l’événement.\n\n" +
      "Méthode : on calcule 1 - 3/6.\n\n" +
      "Calcul : 6/6 - 3/6 = 3/6.\n\n" +
      "Conclusion : la probabilité d’obtenir « impair » est 3/6.",
    tags: ["proba_experience", "defi", "contraire", "qcm"],
  },
  {
    kind: "fixed",
    id: "proba_defi_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 4,
    theme: "neutral",
    text: "La somme des probabilités de toutes les issues d’une expérience vaut…",
    format: "qcm",
    choices: ["1", "0", "100", "le nombre d’issues"],
    expected: ["1"],
    comparator: "mcq_exact",
    hint: "Toutes les issues couvrent l’ensemble des cas.",
    explanation:
      "Définition : la somme des probabilités de toutes les issues vaut 1.\n\n" +
      "Méthode : on additionne les probabilités de chaque issue.\n\n" +
      "Calcul : par exemple 6 × (1/6) = 1.\n\n" +
      "Conclusion : la somme vaut 1.",
    tags: ["proba_experience", "defi", "qcm"],
  },
  {
    kind: "template",
    id: "proba_defi_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Probabilité de la couleur ÷ total.",
    tags: ["proba_experience", "defi", "billes", "template"],
    generate: () => {
      const noires = randomInt(2, 5);
      const blanches = randomInt(3, 7);
      const total = noires + blanches;
      const result = `${blanches}/${total}`;
      const elements = [
        ...Array.from({ length: noires }, () => ({ couleur: couleurs.violet })),
        ...Array.from({ length: blanches }, () => ({ couleur: couleurs.jaune })),
      ];
      return {
        text: `Une urne contient ${noires} jetons violets et ${blanches} jetons jaunes. Quelle est la probabilité de tirer un jeton jaune ?`,
        format: "qcm",
        choices: makeChoices(result, [`${noires}/${total}`, `${blanches}/${noires}`, `${total}/${blanches}`]),
        expected: [result],
        comparator: "mcq_exact",
        explanation:
          "Définition : probabilité = cas favorables ÷ cas possibles.\n\n" +
          `Méthode : ${blanches} jaunes sur ${total} jetons.\n\n` +
          `Calcul : ${blanches} ÷ ${total} = ${result}.\n\n` +
          `Conclusion : la probabilité est ${result}.`,
        canvas: billesCanvas(elements),
      };
    },
  },
  {
    kind: "template",
    id: "proba_defi_tpl_4_contraire",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Probabilité du contraire = total ÷ total - favorables ÷ total.",
    tags: ["proba_experience", "defi", "contraire", "template"],
    generate: () => {
      const fav = randomInt(1, 5);
      const total = randomChoice([6, 8, 10]);
      const contraire = `${total - fav}/${total}`;
      return {
        text: `La probabilité d’un événement est ${fav}/${total}. Quelle est la probabilité de l’événement contraire ?`,
        format: "qcm",
        choices: makeChoices(contraire, [`${fav}/${total}`, `${total}/${fav}`, `1/${total}`]),
        expected: [contraire],
        comparator: "mcq_exact",
        explanation:
          "Définition : probabilité du contraire = 1 - probabilité de l’événement.\n\n" +
          `Méthode : 1 - ${fav}/${total} = ${total}/${total} - ${fav}/${total}.\n\n` +
          `Calcul : = ${contraire}.\n\n` +
          `Conclusion : la probabilité du contraire est ${contraire}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "proba_defi_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi la probabilité d’un événement et celle de son contraire ont pour somme 1.",
    format: "open",
    expected: ["contraire", "1", "toutes les issues"],
    comparator: "contains_keyword",
    hint: "Ensemble, ils couvrent toutes les issues.",
    explanation:
      "Définition : un événement et son contraire couvrent toutes les issues possibles.\n\n" +
      "Méthode : on additionne leurs probabilités.\n\n" +
      "Calcul : comme toutes les issues sont couvertes, la somme vaut 1.\n\n" +
      "Conclusion : probabilité d’un événement + probabilité de son contraire = 1.",
    tags: ["proba_experience", "defi", "open"],
  },
];