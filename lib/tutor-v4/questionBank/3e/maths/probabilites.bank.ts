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

     ⛔⛔ RÉPARÉE LE 31/08/2026, ET C'ÉTAIT LE CAS LE PLUS GRAVE DE LA CLASSE :
     cette micro n'avait AUCUN GABARIT. Dix questions figées, et rien d'autre :
     l'élève revoyait les mêmes dix, indéfiniment. Un `fixed` ne se renouvelle
     jamais — c'est exactement ce que `verifier-renouvellement.ts` mesure, et
     il affichait 0 énoncé généré.

     ⭐ Les deux gabarits ajoutés ne récitent pas des définitions : ils font
     TRIER du vocabulaire sur des situations concrètes. Le premier demande de
     nommer ce qu'on désigne (issue, événement, univers) ; le second fait juger
     si une expérience est aléatoire — et son intérêt est là, parce que la
     plupart des situations de la vie ne le sont PAS.
  ========================= */

  {
    kind: "template",
    id: "3e_proba_vocabulaire_tpl_1_nommer",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    hint: "Une ISSUE est un résultat possible ; un ÉVÉNEMENT en regroupe plusieurs ; l'UNIVERS les contient tous.",
    tags: ["proba_experience", "vocabulaire", "qcm", "template"],
    generate: () => {
      const cas = randomChoice([
        { exp: "on lance un dé à six faces", quoi: "« obtenir 4 »", rep: "une issue", pourquoi: "c'est UN seul résultat possible" },
        { exp: "on lance un dé à six faces", quoi: "« obtenir un nombre pair »", rep: "un événement", pourquoi: "il regroupe trois issues : 2, 4 et 6" },
        { exp: "on lance un dé à six faces", quoi: "« 1, 2, 3, 4, 5, 6 »", rep: "l'univers", pourquoi: "c'est l'ensemble de TOUTES les issues" },
        { exp: "on tire une carte d'un jeu de 32", quoi: "« tirer le roi de cœur »", rep: "une issue", pourquoi: "une seule carte convient" },
        { exp: "on tire une carte d'un jeu de 32", quoi: "« tirer un cœur »", rep: "un événement", pourquoi: "huit cartes conviennent" },
        { exp: "on lance une pièce", quoi: "« pile »", rep: "une issue", pourquoi: "c'est un seul résultat possible" },
        { exp: "on lance une pièce", quoi: "« pile ou face »", rep: "l'univers", pourquoi: "les deux seules issues y sont" },
        { exp: "on tire une bille dans un sac", quoi: "« tirer une bille rouge »", rep: "un événement", pourquoi: "il regroupe toutes les billes rouges" },
        { exp: "on fait tourner une roue à huit secteurs", quoi: "« tomber sur le secteur 3 »", rep: "une issue", pourquoi: "un seul secteur convient" },
        { exp: "on fait tourner une roue à huit secteurs", quoi: "« tomber sur un secteur pair »", rep: "un événement", pourquoi: "quatre secteurs conviennent" },
      ]);
      return {
        text: `Dans l'expérience « ${cas.exp} », comment appelle-t-on ${cas.quoi} ?`,
        format: "qcm",
        choices: makeChoices(cas.rep, [
          "une issue",
          "un événement",
          "l'univers",
          "une probabilité",
          "une fréquence",
        ]),
        expected: [cas.rep],
        comparator: "mcq_exact",
        explanation:
          "Définition : une ISSUE est UN résultat possible. Un ÉVÉNEMENT regroupe une ou plusieurs issues. L'UNIVERS est l'ensemble de toutes les issues.\n\n" +
          "Méthode : on compte combien de résultats sont concernés — un seul, quelques-uns, ou tous.\n\n" +
          `Calcul : ici, ${cas.pourquoi}.\n\n` +
          `Conclusion : c'est ${cas.rep}. ⚠️ Une PROBABILITÉ n'est aucun des trois : c'est un NOMBRE entre 0 et 1, pas un résultat.`,
      };
    },
  },
  {
    kind: "template",
    id: "3e_proba_vocabulaire_tpl_2_aleatoire",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 3,
    theme: "neutral",
    hint: "Aléatoire ne veut pas dire « compliqué » : cela veut dire qu'on ne peut pas prévoir le résultat.",
    tags: ["proba_experience", "vocabulaire", "aleatoire", "qcm", "template"],
    generate: () => {
      const cas = randomChoice([
        { situation: "lancer un dé et noter le résultat", alea: true, pourquoi: "on ne peut pas savoir quelle face sortira" },
        { situation: "tirer une carte au hasard dans un jeu", alea: true, pourquoi: "aucune carte n'est prévisible" },
        { situation: "mesurer la longueur d'une table avec un mètre", alea: false, pourquoi: "la table a une longueur fixe, on la trouve à chaque fois" },
        { situation: "calculer 17 × 4", alea: false, pourquoi: "le résultat est toujours 68" },
        { situation: "faire tourner une roue de loterie", alea: true, pourquoi: "le secteur d'arrivée n'est pas prévisible" },
        { situation: "regarder si demain est un mardi, sachant qu'aujourd'hui est lundi", alea: false, pourquoi: "le calendrier le détermine à l'avance" },
        { situation: "tirer une bille les yeux fermés dans un sac", alea: true, pourquoi: "on ne choisit pas laquelle" },
        { situation: "compter les élèves présents dans une salle", alea: false, pourquoi: "il suffit de compter, le nombre est ce qu'il est" },
        { situation: "lancer deux dés et faire la somme", alea: true, pourquoi: "la somme dépend de deux résultats imprévisibles" },
        { situation: "peser un objet sur une balance", alea: false, pourquoi: "la masse de l'objet ne change pas" },
      ]);
      const correct = cas.alea ? "oui, c'est une expérience aléatoire" : "non, le résultat est prévisible";
      return {
        text: `« ${cas.situation.charAt(0).toUpperCase() + cas.situation.slice(1)} » : est-ce une expérience aléatoire ?`,
        format: "qcm",
        choices: shuffle([
          "oui, c'est une expérience aléatoire",
          "non, le résultat est prévisible",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : une expérience est ALÉATOIRE quand on ne peut pas prévoir son résultat, même en connaissant parfaitement les conditions.\n\n" +
          "Méthode : on se demande si, en refaisant l'expérience à l'identique, on obtiendrait forcément la même chose.\n\n" +
          `Calcul : ici, ${cas.pourquoi}.\n\n` +
          (cas.alea
            ? "Conclusion : oui, c'est une expérience aléatoire — et c'est pour ces expériences-là qu'on calcule des probabilités."
            : "Conclusion : ⚠️ non. ⭐ La plupart des situations de la vie ne sont PAS aléatoires : mesurer, compter, calculer donnent toujours le même résultat. C'est ce qui rend les expériences aléatoires particulières, et dignes d'un chapitre."),
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_proba_vocabulaire_fixed_1",
    niveau: "3e",
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
    hint: "Aléatoire signifie qu’on ne connaît pas le résultat avant l’expérience.",
    explanation:
      "Définition : une expérience aléatoire est une expérience dont on ne peut pas prévoir le résultat avec certitude.\n\n" +
      "Méthode : on se demande si le résultat est connu avant de faire l’expérience.\n\n" +
      "Calcul : ici, il n’y a pas de calcul ; il faut reconnaître le vocabulaire.\n\n" +
      "Conclusion : une expérience aléatoire a un résultat qui n’est pas connu à l’avance.",
    tags: ["proba_experience", "vocabulaire", "experience_aleatoire"],
  },

  {
    kind: "fixed",
    id: "3e_proba_vocabulaire_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
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
    tags: ["proba_experience", "vocabulaire", "issue", "de", "canvas"],
  },

  {
    kind: "fixed",
    id: "3e_proba_vocabulaire_fixed_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
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
    tags: ["proba_experience", "vocabulaire", "evenement", "de", "canvas"],
  },

  {
    kind: "fixed",
    id: "3e_proba_vocabulaire_open_1",
    niveau: "3e",
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
      "Définition : une expérience aléatoire est une expérience dont le résultat n’est pas connu à l’avance.\n\n" +
      "Méthode : pour reconnaître une expérience aléatoire, on vérifie s’il y a plusieurs résultats possibles.\n\n" +
      "Calcul : lancer un dé est aléatoire car on peut obtenir 1, 2, 3, 4, 5 ou 6.\n\n" +
      "Conclusion : une expérience aléatoire dépend du hasard.",
    tags: ["proba_experience", "vocabulaire", "open"],
  },

  /* =========================
     PROBA_ISSUES
  ========================= */

  {
    kind: "fixed",
    id: "3e_proba_issue_fixed_1",
    niveau: "3e",
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
    hint: "Un dé classique possède 6 faces.",
    explanation:
      "Définition : les issues sont tous les résultats possibles d’une expérience aléatoire.\n\n" +
      "Méthode : on liste les résultats possibles du dé.\n\n" +
      "Calcul : les issues sont 1, 2, 3, 4, 5 et 6 ; il y en a donc 6.\n\n" +
      "Conclusion : il y a 6 issues possibles.",
    canvas: deCanvas(),
    tags: ["proba_experience", "issue", "de", "canvas"],
  },

  {
    kind: "template",
    id: "3e_proba_issue_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 1,
    theme: "neutral",
    hint: "Compte tous les objets possibles.",
    tags: ["proba_experience", "issue", "billes", "template", "canvas"],
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
    id: "3e_proba_issue_tpl_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde toutes les zones de la roue.",
    tags: ["proba_experience", "issue", "roue", "template", "canvas"],
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
    id: "3e_proba_issue_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
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
    tags: ["proba_experience", "issue", "open", "de", "canvas"],
  },

  /* =========================
     PROBA_EQUIPROBABILITE
  ========================= */

  {
    kind: "fixed",
    id: "3e_proba_equiprobabilite_fixed_1",
    niveau: "3e",
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
      "Définition : une situation est équiprobable lorsque toutes les issues ont la même probabilité.\n\n" +
      "Méthode : on vérifie si aucune issue n’est favorisée.\n\n" +
      "Calcul : avec un dé équilibré, chaque face a la même chance d’apparaître.\n\n" +
      "Conclusion : la situation est équiprobable.",
    canvas: deCanvas(),
    tags: ["proba_experience", "equiprobabilite", "de", "canvas"],
  },

  {
    kind: "template",
    id: "3e_proba_equiprobabilite_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_equiprobabilite",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde si tous les secteurs ont la même taille ou le même poids.",
    tags: ["proba_experience", "equiprobabilite", "roue", "template", "canvas"],
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

      // ⛔ RÉPARÉ LE 01/09/2026, même défaut qu'en 4e la veille : le texte et
      // les propositions étaient constants, seule la ROUE changeait. Un seul
      // énoncé fabriqué — le vérificateur ne voit pas les canvas, et il compte
      // juste : l'élève relisait la même phrase à chaque tirage.
      const lieu = randomChoice([
        "d'une kermesse d'école",
        "d'une fête foraine",
        "d'un jeu télévisé",
        "d'une tombola de collège",
        "d'un stand de la fête du village",
        "d'un jeu de société",
      ]);
      return {
        text: `La roue ${lieu}, partagée en ${segments.length} secteurs, correspond-elle à une situation d'équiprobabilité ?`,
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
    id: "3e_proba_equiprobabilite_tpl_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_equiprobabilite",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare le nombre de billes de chaque couleur.",
    tags: ["proba_experience", "equiprobabilite", "billes", "template", "canvas"],
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
    id: "3e_proba_equiprobabilite_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
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
    tags: ["proba_experience", "equiprobabilite", "open", "de", "canvas"],
  },

  /* =========================
     PROBA_CALCULER
  ========================= */

  {
    kind: "fixed",
    id: "3e_proba_calculer_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
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
    tags: ["proba_experience", "calculer", "fraction", "de", "canvas"],
  },

  {
    kind: "template",
    id: "3e_proba_calculer_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_calculer",
    difficulty: 2,
    theme: "neutral",
    hint: "Probabilité = nombre de billes favorables / nombre total de billes.",
    tags: ["proba_experience", "calculer", "billes", "template", "canvas"],
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
    id: "3e_proba_calculer_tpl_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_calculer",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne les poids, puis compare le poids favorable au poids total.",
    tags: ["proba_experience", "calculer", "roue", "template", "canvas"],
    generate: () => {
      const poidsRouge = randomChoice([1, 2, 3]);
      const poidsBleu = randomChoice([1, 2]);
      const poidsVert = randomChoice([1, 2]);
      const total = poidsRouge + poidsBleu + poidsVert;
      const result = `${poidsRouge}/${total}`;

      return {
        text: "Quelle est la probabilité d’obtenir Rouge avec cette roue ?",
        format: "qcm",
        // ⚠️ Bleu et Vert se tirent tous deux dans {1, 2} : une fois sur deux
        // ils sont égaux, et leurs deux pièges n'en font plus qu'un. Quand
        // Rouge vaut 1 lui aussi, il ne restait qu'UNE proposition en face de
        // la bonne. Pièges de secours : le contraire (ce qui n'est pas rouge),
        // la cote au lieu de la probabilité, et un voisin toujours distinct.
        choices: makeChoices(result, [
          `${poidsBleu}/${total}`,
          `${poidsVert}/${total}`,
          `${total}/${poidsRouge}`,
          `${poidsBleu + poidsVert}/${total}`,
          `${poidsRouge}/${total - poidsRouge}`,
          `${poidsRouge + 1}/${total}`,
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
    id: "3e_proba_calculer_tpl_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_calculer",
    difficulty: 3,
    theme: "neutral",
    hint: "Tu peux simplifier la fraction si possible.",
    tags: ["proba_experience", "calculer", "fraction_simplifiee", "template"],
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
    id: "3e_proba_calculer_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
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
    tags: ["proba_experience", "calculer", "open", "de", "canvas"],
  },

  /* =========================
     PROBA_DEFIS
  ========================= */

  {
    kind: "fixed",
    id: "3e_proba_defi_fixed_1",
    niveau: "3e",
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
    hint: "Une probabilité est toujours comprise entre 0 et 1.",
    explanation:
      "Définition : une probabilité est un nombre compris entre 0 et 1.\n\n" +
      "Méthode : on vérifie si une probabilité peut dépasser le cas certain.\n\n" +
      "Calcul : l’événement certain a une probabilité égale à 1.\n\n" +
      "Conclusion : une probabilité ne peut pas être supérieure à 1.",
    tags: ["proba_experience", "defi", "bornes"],
  },

  {
    kind: "fixed",
    id: "3e_proba_defi_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
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
    tags: ["proba_experience", "defi", "erreur", "billes", "canvas"],
  },

  {
    kind: "template",
    id: "3e_proba_defi_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 4,
    theme: "reunion",
    hint: "Compte les fruits favorables et le nombre total de fruits.",
    tags: ["proba_experience", "defi", "reunion", "template", "canvas"],
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
        // ⚠️ ananas et letchis tombent souvent sur le même nombre : leurs deux
        // pièges n'en font plus qu'un. Secours : le rapport inversé et les
        // fruits qui ne sont PAS des mangues.
        choices: makeChoices(result, [
          `${ananas}/${total}`,
          `${letchis}/${total}`,
          `${mangues}/${ananas}`,
          `${total}/${mangues}`,
          `${ananas + letchis}/${total}`,
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
    id: "3e_proba_defi_tpl_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Compare les poids des secteurs.",
    tags: ["proba_experience", "defi", "roue", "template", "canvas"],
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
    id: "3e_proba_defi_tpl_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Lis le tableau ligne par ligne.",
    tags: ["proba_experience", "defi", "tableau", "template", "canvas"],
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
    id: "3e_proba_defi_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
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
    tags: ["proba_experience", "defi", "open", "impossible"],
  },

  /* =========================
     PROBA_EVENEMENT
  ========================= */

  {
    kind: "fixed",
    id: "3e_proba_evenement_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_evenement",
    difficulty: 1,
    theme: "neutral",
    text: "On lance un dé. L’événement « obtenir un nombre pair » est réalisé par quelles issues ?",
    format: "qcm",
    choices: ["$2$, $4$ et $6$", "$1$, $3$ et $5$", "seulement $6$", "$1$ à $6$"],
    expected: ["$2$, $4$ et $6$"],
    comparator: "mcq_exact",
    hint: "Les nombres pairs entre $1$ et $6$ sont $2$, $4$ et $6$.",
    explanation:
      "Définition : un événement est un ensemble d’issues qui le réalisent.\n\n" +
      "Méthode : on liste les issues du dé qui sont des nombres pairs.\n\n" +
      "Calcul : parmi $1, 2, 3, 4, 5, 6$, les nombres pairs sont $2$, $4$ et $6$.\n\n" +
      "Conclusion : l’événement est réalisé par les issues $2$, $4$ et $6$.",
    canvas: deCanvas([2, 4, 6]),
    tags: ["proba_experience", "evenement", "de", "canvas"],
  },

  {
    kind: "fixed",
    id: "3e_proba_evenement_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_evenement",
    difficulty: 2,
    theme: "neutral",
    text: "On lance un dé. Quelles issues réalisent l’événement « obtenir au moins $5$ » ?",
    format: "qcm",
    choices: ["$5$ et $6$", "$4$, $5$ et $6$", "seulement $5$", "$1$ à $5$"],
    expected: ["$5$ et $6$"],
    comparator: "mcq_exact",
    hint: "« Au moins $5$ » signifie $5$ ou plus.",
    explanation:
      "Définition : un événement regroupe les issues qui le réalisent.\n\n" +
      "Méthode : « au moins $5$ » veut dire supérieur ou égal à $5$.\n\n" +
      "Calcul : les issues $\\geq 5$ sont $5$ et $6$.\n\n" +
      "Conclusion : l’événement est réalisé par $5$ et $6$.",
    canvas: deCanvas([5, 6]),
    tags: ["proba_experience", "evenement", "de", "canvas"],
  },

  {
    kind: "fixed",
    id: "3e_proba_evenement_fixed_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_evenement",
    difficulty: 2,
    theme: "neutral",
    text: "Un événement réalisé par une seule issue s’appelle…",
    format: "qcm",
    choices: [
      "un événement élémentaire",
      "un événement certain",
      "un événement impossible",
      "un événement contraire",
    ],
    expected: ["un événement élémentaire"],
    comparator: "mcq_exact",
    hint: "« Élémentaire » signifie composé d’une seule issue.",
    explanation:
      "Définition : un événement élémentaire est un événement réalisé par exactement une issue.\n\n" +
      "Méthode : on compte le nombre d’issues qui réalisent l’événement.\n\n" +
      "Calcul : s’il n’y a qu’une seule issue, l’événement est élémentaire.\n\n" +
      "Conclusion : c’est un événement élémentaire.",
    tags: ["proba_experience", "evenement", "vocabulaire", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_proba_evenement_fixed_4_impossible",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_evenement",
    difficulty: 3,
    theme: "neutral",
    text: "On lance un dé à $6$ faces. L’événement « obtenir $7$ » est…",
    format: "qcm",
    choices: [
      "impossible",
      "certain",
      "élémentaire",
      "très probable",
    ],
    expected: ["impossible"],
    comparator: "mcq_exact",
    hint: "Aucune face du dé ne porte le nombre $7$.",
    explanation:
      "Définition : un événement impossible n’est réalisé par aucune issue.\n\n" +
      "Méthode : on cherche s’il existe une issue qui réalise l’événement.\n\n" +
      "Calcul : les faces vont de $1$ à $6$, aucune ne vaut $7$.\n\n" +
      "Conclusion : l’événement « obtenir $7$ » est impossible.",
    canvas: deCanvas(),
    tags: ["proba_experience", "evenement", "impossible", "de", "canvas"],
  },

  {
    kind: "template",
    id: "3e_proba_evenement_tpl_1_de_superieur",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_evenement",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte les faces strictement plus grandes que le nombre donné.",
    tags: ["proba_experience", "evenement", "de", "canvas", "template"],
    generate: () => {
      const n = randomInt(2, 4);
      const faces = [1, 2, 3, 4, 5, 6].filter((f) => f > n);

      return {
        text: `On lance un dé. Combien d’issues réalisent l’événement « obtenir un nombre strictement supérieur à ${n} » ?`,
        format: "short",
        expected: [String(faces.length)],
        comparator: "number_equal",
        explanation:
          `Définition : un événement est réalisé par un ensemble d’issues.\n\n` +
          `Méthode : on liste les faces du dé strictement supérieures à ${n}.\n\n` +
          `Calcul : ce sont ${faces.join(", ")}, soit ${faces.length} issues.\n\n` +
          `Conclusion : ${faces.length} issues réalisent cet événement.`,
        canvas: deCanvas(faces),
      };
    },
  },

  {
    kind: "template",
    id: "3e_proba_evenement_tpl_2_de_multiple",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_evenement",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche les faces qui sont des multiples du nombre donné.",
    tags: ["proba_experience", "evenement", "de", "canvas", "template"],
    generate: () => {
      const d = randomChoice([2, 3]);
      const faces = [1, 2, 3, 4, 5, 6].filter((f) => f % d === 0);

      return {
        text: `On lance un dé. Combien d’issues réalisent l’événement « obtenir un multiple de ${d} » ?`,
        format: "short",
        expected: [String(faces.length)],
        comparator: "number_equal",
        explanation:
          `Définition : un événement regroupe les issues qui le réalisent.\n\n` +
          `Méthode : on cherche les faces du dé qui sont des multiples de ${d}.\n\n` +
          `Calcul : ce sont ${faces.join(", ")}, soit ${faces.length} issues.\n\n` +
          `Conclusion : ${faces.length} issues réalisent cet événement.`,
        canvas: deCanvas(faces),
      };
    },
  },

  {
    kind: "template",
    id: "3e_proba_evenement_tpl_3_billes",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_evenement",
    difficulty: 3,
    theme: "neutral",
    hint: "« Ne pas être bleue » regroupe toutes les billes des autres couleurs.",
    tags: ["proba_experience", "evenement", "billes", "canvas", "template"],
    generate: () => {
      const rouges = randomInt(2, 4);
      const bleues = randomInt(2, 4);
      const vertes = randomInt(1, 3);
      const favorable = rouges + vertes;

      const elements = [
        ...Array.from({ length: rouges }, () => ({ couleur: couleurs.rouge })),
        ...Array.from({ length: bleues }, () => ({ couleur: couleurs.bleu })),
        ...Array.from({ length: vertes }, () => ({ couleur: couleurs.vert })),
      ];

      return {
        text: `Un sac contient ${rouges} billes rouges, ${bleues} billes bleues et ${vertes} billes vertes. Combien de billes réalisent l’événement « la bille tirée n’est pas bleue » ?`,
        format: "short",
        expected: [String(favorable)],
        comparator: "number_equal",
        explanation:
          `Définition : un événement est réalisé par les issues qui le rendent vrai.\n\n` +
          `Méthode : « ne pas être bleue » regroupe les billes rouges et vertes.\n\n` +
          `Calcul : ${rouges} rouges $+$ ${vertes} vertes $= ${favorable}$ billes.\n\n` +
          `Conclusion : ${favorable} billes réalisent cet événement.`,
        canvas: billesCanvas(elements),
      };
    },
  },

  {
    kind: "template",
    id: "3e_proba_evenement_tpl_4_roue",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_evenement",
    difficulty: 4,
    theme: "neutral",
    hint: "Compte les secteurs de la couleur demandée.",
    tags: ["proba_experience", "evenement", "roue", "canvas", "template"],
    generate: () => {
      const nbRouge = randomChoice([2, 3]);
      const segments = [
        ...Array.from({ length: nbRouge }, (_, i) => ({
          label: `R${i + 1}`,
          poids: 1,
          couleur: couleurs.rouge,
        })),
        { label: "B", poids: 1, couleur: couleurs.bleu },
        { label: "V", poids: 1, couleur: couleurs.vert },
      ];

      return {
        text: `Cette roue possède ${segments.length} secteurs de même taille, dont ${nbRouge} rouges. Combien de secteurs réalisent l’événement « obtenir un secteur rouge » ?`,
        format: "short",
        expected: [String(nbRouge)],
        comparator: "number_equal",
        explanation:
          `Définition : un événement est réalisé par l’ensemble des issues correspondantes.\n\n` +
          `Méthode : on compte les secteurs rouges de la roue.\n\n` +
          `Calcul : il y a ${nbRouge} secteurs rouges.\n\n` +
          `Conclusion : ${nbRouge} secteurs réalisent l’événement.`,
        canvas: roueCanvas(segments),
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_proba_evenement_fixed_5_certain",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_evenement",
    difficulty: 3,
    theme: "neutral",
    text: "On lance un dé. L’événement « obtenir un nombre entre $1$ et $6$ » est…",
    format: "qcm",
    choices: ["certain", "impossible", "élémentaire", "peu probable"],
    expected: ["certain"],
    comparator: "mcq_exact",
    hint: "Toutes les issues du dé réalisent cet événement.",
    explanation:
      "Définition : un événement certain est réalisé par toutes les issues.\n\n" +
      "Méthode : on vérifie si chaque issue réalise l’événement.\n\n" +
      "Calcul : toutes les faces, de $1$ à $6$, conviennent.\n\n" +
      "Conclusion : l’événement est certain.",
    canvas: deCanvas([1, 2, 3, 4, 5, 6]),
    tags: ["proba_experience", "evenement", "certain", "de", "canvas"],
  },

  {
    kind: "template",
    id: "3e_proba_evenement_tpl_5_entre",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_evenement",
    difficulty: 4,
    theme: "neutral",
    hint: "Compte les faces comprises entre les deux bornes (incluses).",
    tags: ["proba_experience", "evenement", "de", "canvas", "template"],
    generate: () => {
      const a = randomInt(2, 3);
      const b = randomInt(4, 5);
      const faces = [1, 2, 3, 4, 5, 6].filter((f) => f >= a && f <= b);

      return {
        text: `On lance un dé. Combien d’issues réalisent l’événement « obtenir un nombre compris entre ${a} et ${b} (inclus) » ?`,
        format: "short",
        expected: [String(faces.length)],
        comparator: "number_equal",
        explanation:
          `Définition : un événement regroupe les issues qui le réalisent.\n\n` +
          `Méthode : on liste les faces entre ${a} et ${b} inclus.\n\n` +
          `Calcul : ce sont ${faces.join(", ")}, soit ${faces.length} issues.\n\n` +
          `Conclusion : ${faces.length} issues réalisent l’événement.`,
        canvas: deCanvas(faces),
      };
    },
  },

  /* =========================
     PROBA_EVENEMENT_CONTRAIRE
  ========================= */

  {
    kind: "fixed",
    id: "3e_proba_evenement_contraire_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_evenement_contraire",
    difficulty: 2,
    theme: "neutral",
    text: "On lance un dé. Quel est l’événement contraire de « obtenir $6$ » ?",
    format: "qcm",
    choices: [
      "« ne pas obtenir $6$ »",
      "« obtenir $1$ »",
      "« obtenir un nombre pair »",
      "« obtenir $6$ deux fois »",
    ],
    expected: ["« ne pas obtenir $6$ »"],
    comparator: "mcq_exact",
    hint: "L’événement contraire regroupe toutes les autres issues.",
    explanation:
      "Définition : l’événement contraire de $A$ est réalisé exactement quand $A$ ne l’est pas.\n\n" +
      "Méthode : on prend toutes les issues qui ne réalisent pas l’événement.\n\n" +
      "Calcul : le contraire de « obtenir $6$ » est « obtenir $1, 2, 3, 4$ ou $5$ », c’est-à-dire « ne pas obtenir $6$ ».\n\n" +
      "Conclusion : le contraire est « ne pas obtenir $6$ ».",
    tags: ["proba_experience", "evenement_contraire", "de", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_proba_evenement_contraire_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_evenement_contraire",
    difficulty: 2,
    theme: "neutral",
    text: "Si $P(A) = \\dfrac{1}{4}$, quelle est la probabilité de l’événement contraire $\\overline{A}$ ?",
    format: "qcm",
    choices: ["$\\dfrac{3}{4}$", "$\\dfrac{1}{4}$", "$\\dfrac{4}{4}$", "$\\dfrac{1}{3}$"],
    expected: ["$\\dfrac{3}{4}$"],
    comparator: "mcq_exact",
    hint: "$P(\\overline{A}) = 1 - P(A)$.",
    explanation:
      "Définition : la probabilité de l’événement contraire vérifie $P(\\overline{A}) = 1 - P(A)$.\n\n" +
      "Méthode : on soustrait $P(A)$ à $1$.\n\n" +
      "Calcul : $1 - \\dfrac{1}{4} = \\dfrac{3}{4}$.\n\n" +
      "Conclusion : $P(\\overline{A}) = \\dfrac{3}{4}$.",
    tags: ["proba_experience", "evenement_contraire", "fraction", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_proba_evenement_contraire_fixed_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_evenement_contraire",
    difficulty: 2,
    theme: "neutral",
    text: "Que vaut toujours la somme $P(A) + P(\\overline{A})$ ?",
    format: "qcm",
    choices: ["$1$", "$0$", "$2$", "cela dépend de $A$"],
    expected: ["$1$"],
    comparator: "mcq_exact",
    hint: "Un événement et son contraire couvrent toutes les issues.",
    explanation:
      "Définition : un événement et son contraire se partagent toutes les issues possibles.\n\n" +
      "Méthode : on additionne les deux probabilités.\n\n" +
      "Calcul : ensemble, ils représentent la totalité, donc la somme vaut $1$.\n\n" +
      "Conclusion : $P(A) + P(\\overline{A}) = 1$.",
    tags: ["proba_experience", "evenement_contraire", "relation", "qcm"],
  },

  {
    kind: "template",
    id: "3e_proba_evenement_contraire_tpl_1_billes",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_evenement_contraire",
    difficulty: 3,
    theme: "neutral",
    hint: "P(pas rouge) = nombre de billes non rouges / nombre total.",
    tags: ["proba_experience", "evenement_contraire", "billes", "canvas", "template"],
    generate: () => {
      const rouges = randomInt(1, 4);
      const autres = randomInt(3, 6);
      const total = rouges + autres;
      const result = fraction(autres, total);

      const elements = [
        ...Array.from({ length: rouges }, () => ({ couleur: couleurs.rouge })),
        ...Array.from({ length: autres }, () => ({ couleur: couleurs.bleu })),
      ];

      return {
        text: `Un sac contient ${rouges} billes rouges et ${autres} billes bleues. Quelle est la probabilité de l’événement contraire de « tirer une bille rouge » ? Donne la fraction simplifiée.`,
        format: "short",
        expected: [result],
        comparator: "fraction_decimal_equivalent",
        explanation:
          `Définition : le contraire de « tirer rouge » est « tirer une bille non rouge ».\n\n` +
          `Méthode : on compte les billes non rouges, puis on divise par le total.\n\n` +
          `Calcul : il y a ${autres} billes non rouges sur ${total}, soit $\\dfrac{${autres}}{${total}} = ${result}$.\n\n` +
          `Conclusion : la probabilité du contraire est $${result}$.`,
        canvas: billesCanvas(elements),
      };
    },
  },

  {
    kind: "template",
    id: "3e_proba_evenement_contraire_tpl_2_decimal",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_evenement_contraire",
    difficulty: 3,
    theme: "neutral",
    hint: "P(contraire) = 1 − P(A).",
    tags: ["proba_experience", "evenement_contraire", "decimal", "template"],
    generate: () => {
      const pA = randomChoice([0.2, 0.3, 0.4, 0.6, 0.75]);
      const pBar = Math.round((1 - pA) * 100) / 100;

      return {
        text: `La probabilité qu’il pleuve demain est de ${String(pA).replace(
          ".",
          ","
        )}. Quelle est la probabilité qu’il ne pleuve pas ? (réponse décimale)`,
        format: "short",
        expected: [String(pBar).replace(".", ","), String(pBar)],
        comparator: "number_equal",
        explanation:
          `Définition : l’événement « ne pas pleuvoir » est le contraire de « pleuvoir ».\n\n` +
          `Méthode : on calcule $P(\\overline{A}) = 1 - P(A)$.\n\n` +
          `Calcul : $1 - ${String(pA).replace(".", ",")} = ${String(pBar).replace(
            ".",
            ","
          )}$.\n\n` +
          `Conclusion : la probabilité qu’il ne pleuve pas est ${String(pBar).replace(
            ".",
            ","
          )}.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_proba_evenement_contraire_tpl_3_de",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_evenement_contraire",
    difficulty: 3,
    theme: "neutral",
    hint: "Le contraire de « obtenir n » est réalisé par les 5 autres faces.",
    tags: ["proba_experience", "evenement_contraire", "de", "canvas", "template"],
    generate: () => {
      const n = randomInt(1, 6);
      const autres = [1, 2, 3, 4, 5, 6].filter((f) => f !== n);

      return {
        text: `On lance un dé. Quelle est la probabilité de l’événement contraire de « obtenir ${n} » ? Donne la fraction.`,
        format: "short",
        expected: ["5/6"],
        comparator: "fraction_decimal_equivalent",
        explanation:
          `Définition : le contraire de « obtenir ${n} » est « obtenir une autre face ».\n\n` +
          `Méthode : on compte les faces différentes de ${n}.\n\n` +
          `Calcul : il reste ${autres.length} faces sur $6$, soit $\\dfrac{5}{6}$.\n\n` +
          `Conclusion : la probabilité du contraire est $\\dfrac{5}{6}$.`,
        canvas: deCanvas(autres),
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_proba_evenement_contraire_fixed_4_aucun",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_evenement_contraire",
    difficulty: 4,
    theme: "neutral",
    text: "Quel est l’événement contraire de « obtenir au moins une fois pile » lorsqu’on lance deux pièces ?",
    format: "qcm",
    choices: [
      "« n’obtenir aucune fois pile »",
      "« obtenir deux fois pile »",
      "« obtenir au moins une fois face »",
      "« obtenir exactement une fois pile »",
    ],
    expected: ["« n’obtenir aucune fois pile »"],
    comparator: "mcq_exact",
    hint: "Le contraire de « au moins un » est « aucun ».",
    explanation:
      "Définition : le contraire d’un événement est réalisé exactement quand l’événement ne l’est pas.\n\n" +
      "Méthode : on nie l’expression « au moins une fois pile ».\n\n" +
      "Calcul : ne pas avoir « au moins un pile » signifie « aucun pile ».\n\n" +
      "Conclusion : le contraire est « n’obtenir aucune fois pile ».",
    tags: ["proba_experience", "evenement_contraire", "au_moins_un", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_proba_evenement_contraire_fixed_5_erreur",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_evenement_contraire",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève affirme : « Si $P(A) = 0{,}3$, alors $P(\\overline{A}) = 0{,}3$ aussi. » A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Utilise $P(\\overline{A}) = 1 - P(A)$.",
    explanation:
      "Définition : la probabilité du contraire vérifie $P(\\overline{A}) = 1 - P(A)$.\n\n" +
      "Méthode : on calcule $1 - P(A)$.\n\n" +
      "Calcul : $1 - 0{,}3 = 0{,}7 \\neq 0{,}3$.\n\n" +
      "Conclusion : l’élève a tort, $P(\\overline{A}) = 0{,}7$.",
    tags: ["proba_experience", "evenement_contraire", "erreur", "qcm"],
  },

  {
    kind: "template",
    id: "3e_proba_evenement_contraire_tpl_4_choix",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_evenement_contraire",
    difficulty: 4,
    theme: "neutral",
    hint: "P(contraire) = 1 − P(A) ; ici les probabilités sont des fractions de dénominateur 8.",
    tags: ["proba_experience", "evenement_contraire", "fraction", "qcm", "template"],
    generate: () => {
      const k = randomInt(1, 7);
      const correct = `$\\dfrac{${8 - k}}{8}$`;

      return {
        text: `Dans une expérience, $P(A) = \\dfrac{${k}}{8}$. Quelle est la probabilité de l’événement contraire ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `$\\dfrac{${k}}{8}$`,
          `$\\dfrac{8}{${k}}$`,
          `$\\dfrac{${k}}{${8 - k}}$`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          `Définition : $P(\\overline{A}) = 1 - P(A)$.\n\n` +
          `Méthode : on écrit $1 = \\dfrac{8}{8}$ puis on soustrait.\n\n` +
          `Calcul : $\\dfrac{8}{8} - \\dfrac{${k}}{8} = \\dfrac{${8 - k}}{8}$.\n\n` +
          `Conclusion : $P(\\overline{A}) = \\dfrac{${8 - k}}{8}$.`,
      };
    },
  },

  /* =========================
     PROBA_DEUX_EPREUVE
  ========================= */

  {
    kind: "fixed",
    id: "3e_proba_deux_epreuve_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_deux_epreuve",
    difficulty: 2,
    theme: "neutral",
    text: "On lance deux fois une pièce. Combien y a-t-il d’issues possibles ?",
    format: "qcm",
    choices: ["$4$", "$2$", "$3$", "$6$"],
    expected: ["$4$"],
    comparator: "mcq_exact",
    hint: "À chaque lancer, $2$ résultats possibles : $2 \\times 2$.",
    explanation:
      "Définition : pour deux épreuves successives, on combine les issues de chaque épreuve.\n\n" +
      "Méthode : on multiplie le nombre d’issues de la première par celui de la seconde.\n\n" +
      "Calcul : $2 \\times 2 = 4$. Les issues sont PP, PF, FP, FF.\n\n" +
      "Conclusion : il y a $4$ issues possibles.",
    tags: ["proba_experience", "deux_epreuve", "denombrement", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_proba_deux_epreuve_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_deux_epreuve",
    difficulty: 3,
    theme: "neutral",
    text: "On lance deux fois une pièce équilibrée. Quelle est la probabilité d’obtenir « pile puis pile » ?",
    format: "qcm",
    choices: ["$\\dfrac{1}{4}$", "$\\dfrac{1}{2}$", "$\\dfrac{2}{4}$", "$\\dfrac{1}{3}$"],
    expected: ["$\\dfrac{1}{4}$"],
    comparator: "mcq_exact",
    hint: "Une issue favorable (PP) sur $4$ issues possibles.",
    explanation:
      "Définition : en situation d’équiprobabilité, $P = \\dfrac{\\text{cas favorables}}{\\text{cas possibles}}$.\n\n" +
      "Méthode : on compte les issues favorables et toutes les issues.\n\n" +
      "Calcul : il y a $4$ issues (PP, PF, FP, FF) et une seule favorable (PP), soit $\\dfrac{1}{4}$.\n\n" +
      "Conclusion : la probabilité est $\\dfrac{1}{4}$.",
    tags: ["proba_experience", "deux_epreuve", "fraction", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_proba_deux_epreuve_fixed_3_liste",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_deux_epreuve",
    difficulty: 2,
    theme: "neutral",
    text: "On lance deux fois une pièce (P pour pile, F pour face). Quelle liste donne toutes les issues ?",
    format: "qcm",
    choices: [
      "PP, PF, FP, FF",
      "PP, FF",
      "P, F",
      "PP, PF, FF",
    ],
    expected: ["PP, PF, FP, FF"],
    comparator: "mcq_exact",
    hint: "Il faut distinguer l’ordre : PF est différent de FP.",
    explanation:
      "Définition : une issue d’une expérience à deux épreuves décrit le résultat des deux étapes dans l’ordre.\n\n" +
      "Méthode : on combine chaque résultat du premier lancer avec chaque résultat du second.\n\n" +
      "Calcul : P puis P/F, et F puis P/F donnent PP, PF, FP, FF.\n\n" +
      "Conclusion : les $4$ issues sont PP, PF, FP, FF.",
    tags: ["proba_experience", "deux_epreuve", "liste", "qcm"],
  },

  {
    kind: "template",
    id: "3e_proba_deux_epreuve_tpl_1_produit",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_deux_epreuve",
    difficulty: 2,
    theme: "reunion",
    hint: "Multiplie le nombre de choix de chaque étape.",
    tags: ["proba_experience", "deux_epreuve", "denombrement", "template"],
    generate: () => {
      const entrees = randomInt(2, 4);
      const plats = randomInt(2, 4);
      const total = entrees * plats;

      return {
        text: `Dans un snack à La Réunion, on choisit une entrée parmi ${entrees} et un plat parmi ${plats}. Combien de menus différents (entrée + plat) peut-on composer ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation:
          `Définition : pour deux choix successifs, on combine chaque possibilité de l’un avec chaque possibilité de l’autre.\n\n` +
          `Méthode : on multiplie le nombre d’entrées par le nombre de plats.\n\n` +
          `Calcul : $${entrees} \\times ${plats} = ${total}$.\n\n` +
          `Conclusion : on peut composer ${total} menus différents.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_proba_deux_epreuve_tpl_2_tableau",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_deux_epreuve",
    difficulty: 3,
    theme: "neutral",
    hint: "Le nombre d’issues est le nombre de cases du tableau croisé.",
    tags: ["proba_experience", "deux_epreuve", "tableau", "canvas", "template"],
    generate: () => {
      const faces1 = randomChoice([2, 3]);
      const faces2 = randomChoice([2, 3]);
      const total = faces1 * faces2;

      const entetes = ["", ...Array.from({ length: faces2 }, (_, j) => `B${j + 1}`)];
      const lignes = Array.from({ length: faces1 }, (_, i) => [
        `A${i + 1}`,
        ...Array.from({ length: faces2 }, (_, j) => `A${i + 1}B${j + 1}`),
      ]);

      return {
        text: `Une première roue a ${faces1} secteurs (A) et une seconde roue a ${faces2} secteurs (B). Combien y a-t-il d’issues possibles pour le couple (A, B) ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation:
          `Définition : chaque issue est un couple formé d’un résultat de A et d’un résultat de B.\n\n` +
          `Méthode : on remplit un tableau croisé, le nombre d’issues est le nombre de cases.\n\n` +
          `Calcul : $${faces1} \\times ${faces2} = ${total}$.\n\n` +
          `Conclusion : il y a ${total} issues possibles.`,
        canvas: tableauCanvas(entetes, lignes),
      };
    },
  },

  {
    kind: "template",
    id: "3e_proba_deux_epreuve_tpl_3_proba_couple",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_deux_epreuve",
    difficulty: 4,
    theme: "neutral",
    hint: "Une seule issue favorable sur le nombre total d’issues.",
    tags: ["proba_experience", "deux_epreuve", "fraction", "qcm", "template"],
    generate: () => {
      const faces1 = randomChoice([2, 3]);
      const faces2 = randomChoice([2, 3]);
      const total = faces1 * faces2;
      const correct = `$\\dfrac{1}{${total}}$`;

      return {
        text: `On tourne deux roues équilibrées : la première a ${faces1} secteurs, la seconde ${faces2}. Quelle est la probabilité d’obtenir un couple précis fixé à l’avance ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `$\\dfrac{1}{${faces1}}$`,
          `$\\dfrac{1}{${faces2}}$`,
          `$\\dfrac{2}{${total}}$`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          `Définition : en équiprobabilité, $P = \\dfrac{\\text{cas favorables}}{\\text{cas possibles}}$.\n\n` +
          `Méthode : on compte le nombre total d’issues, puis les issues favorables.\n\n` +
          `Calcul : il y a $${faces1} \\times ${faces2} = ${total}$ issues, et une seule favorable, soit $\\dfrac{1}{${total}}$.\n\n` +
          `Conclusion : la probabilité est $\\dfrac{1}{${total}}$.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_proba_deux_epreuve_fixed_4_arbre",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_deux_epreuve",
    difficulty: 4,
    theme: "neutral",
    text: "On représente une expérience à deux épreuves par un arbre. Si chaque épreuve a $3$ issues, combien de branches complètes (chemins) l’arbre comporte-t-il ?",
    format: "qcm",
    choices: ["$9$", "$6$", "$3$", "$12$"],
    expected: ["$9$"],
    comparator: "mcq_exact",
    hint: "Nombre de chemins $= 3 \\times 3$.",
    explanation:
      "Définition : dans un arbre, chaque chemin complet correspond à une issue de l’expérience.\n\n" +
      "Méthode : on multiplie le nombre d’issues de chaque épreuve.\n\n" +
      "Calcul : $3 \\times 3 = 9$ chemins.\n\n" +
      "Conclusion : l’arbre comporte $9$ branches complètes.",
    tags: ["proba_experience", "deux_epreuve", "arbre", "qcm"],
  },

  {
    kind: "template",
    id: "3e_proba_deux_epreuve_tpl_4_favorables",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_deux_epreuve",
    difficulty: 5,
    theme: "neutral",
    hint: "Compte les issues du tableau dont la somme correspond à la valeur cherchée.",
    tags: ["proba_experience", "deux_epreuve", "tableau", "canvas", "defi", "template"],
    generate: () => {
      // deux dés à 3 faces (1,2,3) ; on compte les couples de somme = s
      const s = randomChoice([3, 4]);
      const couples: string[] = [];
      for (let i = 1; i <= 3; i++) {
        for (let j = 1; j <= 3; j++) {
          if (i + j === s) couples.push(`(${i},${j})`);
        }
      }
      const entetes = ["+", "1", "2", "3"];
      const lignes = [1, 2, 3].map((i) => [
        String(i),
        ...[1, 2, 3].map((j) => String(i + j)),
      ]);

      return {
        text: `On lance deux dés à $3$ faces (numérotées $1$, $2$, $3$). Combien de couples donnent une somme égale à ${s} ?`,
        format: "short",
        expected: [String(couples.length)],
        comparator: "number_equal",
        explanation:
          `Définition : chaque issue est un couple (premier dé, second dé).\n\n` +
          `Méthode : on remplit le tableau des sommes et on compte les cases égales à ${s}.\n\n` +
          `Calcul : les couples de somme ${s} sont ${couples.join(", ")}, soit ${couples.length}.\n\n` +
          `Conclusion : ${couples.length} couples donnent une somme de ${s}.`,
        canvas: tableauCanvas(entetes, lignes),
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_proba_deux_epreuve_fixed_5_defi",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_deux_epreuve",
    difficulty: 5,
    theme: "neutral",
    text: "On lance deux fois une pièce. Quelle est la probabilité d’obtenir « exactement une fois pile » ?",
    format: "qcm",
    choices: ["$\\dfrac{2}{4}$", "$\\dfrac{1}{4}$", "$\\dfrac{3}{4}$", "$\\dfrac{1}{2}$"],
    expected: ["$\\dfrac{2}{4}$"],
    comparator: "mcq_exact",
    hint: "Repère parmi PP, PF, FP, FF les issues avec un seul pile.",
    explanation:
      "Définition : on compte les issues favorables parmi toutes les issues.\n\n" +
      "Méthode : on liste les $4$ issues PP, PF, FP, FF et on garde celles avec exactement un pile.\n\n" +
      "Calcul : les issues favorables sont PF et FP, soit $2$ sur $4$ : $\\dfrac{2}{4}$.\n\n" +
      "Conclusion : la probabilité est $\\dfrac{2}{4}$.",
    tags: ["proba_experience", "deux_epreuve", "defi", "qcm"],
  },

  /* =========================
     PROBA_VOCABULAIRE (compléments)
  ========================= */
  {
    kind: "fixed",
    id: "3e_proba_vocabulaire_fixed_4",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Une probabilité est toujours un nombre compris entre…",
    format: "qcm",
    choices: ["$0$ et $1$", "$1$ et $10$", "$-1$ et $1$", "$0$ et $100$"],
    expected: ["$0$ et $1$"],
    comparator: "mcq_exact",
    hint: "$0$ = impossible, $1$ = certain.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise.\n\n" +
      "Méthode : on encadre la valeur possible d’une probabilité.\n\n" +
      "Calcul : l’impossible vaut $0$, le certain vaut $1$.\n\n" +
      "Conclusion : une probabilité est comprise entre $0$ et $1$.",
    tags: ["proba_experience", "vocabulaire", "bornes", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_proba_vocabulaire_fixed_5_certain",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Un événement certain a une probabilité égale à…",
    format: "qcm",
    choices: ["$1$", "$0$", "$0{,}5$", "$2$"],
    expected: ["$1$"],
    comparator: "mcq_exact",
    hint: "Il se produit à coup sûr.",
    explanation:
      "Définition : un événement certain se réalise toujours.\n\n" +
      "Méthode : on associe « toujours » à la probabilité maximale.\n\n" +
      "Calcul : la probabilité d’un événement certain est $1$.\n\n" +
      "Conclusion : elle vaut $1$.",
    tags: ["proba_experience", "vocabulaire", "certain", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_proba_vocabulaire_fixed_6_impossible",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "On lance un dé à $6$ faces. « Obtenir $8$ » est un événement…",
    format: "qcm",
    choices: ["impossible", "certain", "probable", "équiprobable"],
    expected: ["impossible"],
    comparator: "mcq_exact",
    hint: "Aucune face ne porte le $8$.",
    explanation:
      "Définition : un événement impossible ne peut pas se produire.\n\n" +
      "Méthode : on vérifie si une issue le réalise.\n\n" +
      "Calcul : un dé va de $1$ à $6$, aucune face ne donne $8$.\n\n" +
      "Conclusion : « obtenir $8$ » est impossible (probabilité $0$).",
    canvas: deCanvas(),
    tags: ["proba_experience", "vocabulaire", "impossible", "de", "canvas"],
  },
  {
    kind: "fixed",
    id: "3e_proba_vocabulaire_fixed_7_certitude",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Une probabilité de $0{,}5$ correspond à…",
    format: "qcm",
    choices: ["une chance sur deux", "un événement impossible", "un événement certain", "deux chances sur trois"],
    expected: ["une chance sur deux"],
    comparator: "mcq_exact",
    hint: "$0{,}5 = \\dfrac{1}{2}$.",
    explanation:
      "Définition : une probabilité de $0{,}5$ vaut $\\dfrac{1}{2}$.\n\n" +
      "Méthode : on interprète la fraction.\n\n" +
      "Calcul : $\\dfrac{1}{2}$ correspond à une chance sur deux.\n\n" +
      "Conclusion : c’est une chance sur deux.",
    tags: ["proba_experience", "vocabulaire", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_proba_vocabulaire_fixed_8_evenement",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "« Obtenir un nombre pair » avec un dé est…",
    format: "qcm",
    choices: ["un événement", "une issue unique", "une probabilité", "une moyenne"],
    expected: ["un événement"],
    comparator: "mcq_exact",
    hint: "Il regroupe plusieurs issues ($2$, $4$, $6$).",
    explanation:
      "Définition : un événement regroupe une ou plusieurs issues.\n\n" +
      "Méthode : on regarde s’il correspond à plusieurs résultats.\n\n" +
      "Calcul : « pair » regroupe $2$, $4$ et $6$.\n\n" +
      "Conclusion : c’est un événement.",
    canvas: deCanvas([2, 4, 6]),
    tags: ["proba_experience", "vocabulaire", "evenement", "de", "canvas"],
  },
  {
    kind: "fixed",
    id: "3e_proba_vocabulaire_fixed_9_plus_probable",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 3,
    theme: "neutral",
    text: "Plus la probabilité d’un événement est proche de $1$, plus l’événement est…",
    format: "qcm",
    choices: ["probable", "impossible", "rare", "équiprobable"],
    expected: ["probable"],
    comparator: "mcq_exact",
    hint: "$1$ = certain.",
    explanation:
      "Définition : la probabilité mesure la chance d’un événement.\n\n" +
      "Méthode : on relie la valeur à la fréquence attendue.\n\n" +
      "Calcul : proche de $1$, l’événement se produit presque toujours.\n\n" +
      "Conclusion : il est très probable.",
    tags: ["proba_experience", "vocabulaire", "qcm"],
  },

  /* =========================
     PROBA_ISSUE (compléments)
  ========================= */
  {
    kind: "fixed",
    id: "3e_proba_issue_fixed_2_piece",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 1,
    theme: "neutral",
    text: "Combien y a-t-il d’issues possibles quand on lance une pièce ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Pile ou face.",
    explanation:
      "Définition : les issues sont les résultats possibles.\n\n" +
      "Méthode : on liste les résultats d’une pièce.\n\n" +
      "Calcul : pile et face, soit $2$ issues.\n\n" +
      "Conclusion : il y a $2$ issues.",
    tags: ["proba_experience", "issue", "piece", "short"],
  },
  {
    kind: "template",
    id: "3e_proba_issue_tpl_3_carte",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte le nombre d’objets différents possibles.",
    tags: ["proba_experience", "issue", "template"],
    generate: () => {
      const n = randomChoice([4, 5, 6, 8]);
      return {
        text: `Une urne contient ${n} jetons numérotés tous différents. On en tire un. Combien y a-t-il d’issues possibles ?`,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation:
          `Définition : chaque jeton possible est une issue.\n\n` +
          `Méthode : on compte le nombre de jetons.\n\n` +
          `Calcul : il y a ${n} jetons différents.\n\n` +
          `Conclusion : il y a ${n} issues possibles.`,
      };
    },
  },
  {
    kind: "template",
    id: "3e_proba_issue_tpl_4_billes_couleurs",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 2,
    theme: "neutral",
    hint: "Additionne toutes les billes.",
    tags: ["proba_experience", "issue", "billes", "canvas", "template"],
    generate: () => {
      const r = randomInt(2, 4);
      const b = randomInt(2, 4);
      const v = randomInt(1, 3);
      const total = r + b + v;
      const elements = [
        ...Array.from({ length: r }, () => ({ couleur: couleurs.rouge })),
        ...Array.from({ length: b }, () => ({ couleur: couleurs.bleu })),
        ...Array.from({ length: v }, () => ({ couleur: couleurs.vert })),
      ];
      return {
        text: `Un sac contient ${r} billes rouges, ${b} bleues et ${v} vertes. Combien y a-t-il d’issues possibles si on tire une bille ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation:
          `Définition : chaque bille tirable est une issue.\n\n` +
          `Méthode : on additionne toutes les billes.\n\n` +
          `Calcul : ${r} + ${b} + ${v} = ${total}.\n\n` +
          `Conclusion : il y a ${total} issues possibles.`,
        canvas: billesCanvas(elements),
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_proba_issue_fixed_3_evenement_vs_issue",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 2,
    theme: "neutral",
    text: "Avec un dé, combien d’issues réalisent l’événement « obtenir $3$ » ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Une seule face porte le $3$.",
    explanation:
      "Définition : une issue est un résultat élémentaire.\n\n" +
      "Méthode : on compte les faces qui donnent $3$.\n\n" +
      "Calcul : une seule face porte $3$.\n\n" +
      "Conclusion : $1$ issue réalise cet événement.",
    canvas: deCanvas([3]),
    tags: ["proba_experience", "issue", "de", "canvas"],
  },
  {
    kind: "template",
    id: "3e_proba_issue_tpl_5_roue",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte les secteurs.",
    tags: ["proba_experience", "issue", "roue", "canvas", "template"],
    generate: () => {
      const n = randomChoice([3, 4, 6]);
      const labels = ["A", "B", "C", "D", "E", "F"].slice(0, n);
      return {
        text: `Une roue a ${n} secteurs de même taille. Combien y a-t-il d’issues possibles ?`,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation:
          `Définition : chaque secteur est une issue.\n\n` +
          `Méthode : on compte les secteurs.\n\n` +
          `Calcul : la roue a ${n} secteurs.\n\n` +
          `Conclusion : il y a ${n} issues.`,
        canvas: roueCanvas(labels.map((label) => ({ label, poids: 1 }))),
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_proba_issue_fixed_4_de",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 2,
    theme: "neutral",
    text: "Combien d’issues réalisent « obtenir un nombre pair » avec un dé à $6$ faces ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Les pairs sont $2$, $4$, $6$.",
    explanation:
      "Définition : on compte les issues favorables.\n\n" +
      "Méthode : on liste les nombres pairs du dé.\n\n" +
      "Calcul : $2$, $4$ et $6$, soit $3$ issues.\n\n" +
      "Conclusion : $3$ issues.",
    canvas: deCanvas([2, 4, 6]),
    tags: ["proba_experience", "issue", "de", "canvas"],
  },

  /* =========================
     PROBA_EQUIPROBABILITE (compléments)
  ========================= */
  {
    kind: "fixed",
    id: "3e_proba_equiprobabilite_fixed_2_def",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_equiprobabilite",
    difficulty: 2,
    theme: "neutral",
    text: "Une situation est dite d’équiprobabilité quand…",
    format: "qcm",
    choices: [
      "toutes les issues ont la même probabilité",
      "il n’y a qu’une seule issue",
      "une issue est plus probable que les autres",
      "il n’y a aucune issue",
    ],
    expected: ["toutes les issues ont la même probabilité"],
    comparator: "mcq_exact",
    hint: "Aucune issue n’est favorisée.",
    explanation:
      "Définition : en équiprobabilité, toutes les issues ont la même chance.\n\n" +
      "Méthode : on vérifie qu’aucune issue n’est favorisée.\n\n" +
      "Calcul : par exemple, un dé équilibré.\n\n" +
      "Conclusion : toutes les issues ont la même probabilité.",
    tags: ["proba_experience", "equiprobabilite", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_proba_equiprobabilite_fixed_3_de_pipe",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_equiprobabilite",
    difficulty: 2,
    theme: "neutral",
    text: "Un dé truqué qui tombe plus souvent sur $6$ correspond-il à une situation d’équiprobabilité ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Une face est favorisée.",
    explanation:
      "Définition : l’équiprobabilité suppose qu’aucune issue n’est favorisée.\n\n" +
      "Méthode : on vérifie si une face revient plus souvent.\n\n" +
      "Calcul : ici le $6$ est favorisé.\n\n" +
      "Conclusion : non, ce n’est pas équiprobable.",
    tags: ["proba_experience", "equiprobabilite", "qcm"],
  },
  {
    kind: "template",
    id: "3e_proba_equiprobabilite_tpl_3_billes",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_equiprobabilite",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare le nombre de billes de chaque couleur.",
    tags: ["proba_experience", "equiprobabilite", "billes", "canvas", "template"],
    generate: () => {
      const equal = randomChoice([true, false]);
      const r = 3;
      const b = equal ? 3 : randomChoice([4, 5]);
      const elements = [
        ...Array.from({ length: r }, () => ({ couleur: couleurs.rouge })),
        ...Array.from({ length: b }, () => ({ couleur: couleurs.bleu })),
      ];
      return {
        text: `Un sac contient ${r} billes rouges et ${b} billes bleues. Tirer rouge et tirer bleu sont-ils équiprobables ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [equal ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          `Définition : deux événements sont équiprobables s’ils ont la même probabilité.\n\n` +
          `Méthode : on compare le nombre de billes de chaque couleur.\n\n` +
          `Calcul : ${r} rouges et ${b} bleues.\n\n` +
          `Conclusion : ${equal ? "oui, c’est équiprobable." : "non, ce n’est pas équiprobable."}`,
        canvas: billesCanvas(elements),
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_proba_equiprobabilite_fixed_4_piece",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_equiprobabilite",
    difficulty: 2,
    theme: "neutral",
    text: "Avec une pièce équilibrée, pile et face sont-ils équiprobables ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Aucune face n’est favorisée.",
    explanation:
      "Définition : une pièce équilibrée ne favorise aucune face.\n\n" +
      "Méthode : on compare les chances de pile et de face.\n\n" +
      "Calcul : chacune a une probabilité de $\\dfrac{1}{2}$.\n\n" +
      "Conclusion : oui, pile et face sont équiprobables.",
    tags: ["proba_experience", "equiprobabilite", "piece", "qcm"],
  },
  {
    kind: "template",
    id: "3e_proba_equiprobabilite_tpl_4_roue",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_equiprobabilite",
    difficulty: 3,
    theme: "neutral",
    hint: "Les secteurs doivent avoir le même poids.",
    tags: ["proba_experience", "equiprobabilite", "roue", "canvas", "template"],
    generate: () => {
      const equal = randomChoice([true, false]);
      const segments = equal
        ? [
            { label: "A", poids: 1, couleur: couleurs.rouge },
            { label: "B", poids: 1, couleur: couleurs.bleu },
            { label: "C", poids: 1, couleur: couleurs.vert },
          ]
        : [
            { label: "A", poids: 3, couleur: couleurs.rouge },
            { label: "B", poids: 1, couleur: couleurs.bleu },
            { label: "C", poids: 1, couleur: couleurs.vert },
          ];
      // ⛔ RÉPARÉ LE 01/09/2026. Il posait la MÊME question que `tpl_1` avec un
      // texte constant — deux gabarits pour une seule question, et un seul
      // énoncé chacun.
      // ⭐ Il porte maintenant la CONSÉQUENCE : quand la situation est
      // équiprobable, la probabilité de chaque secteur se calcule d'un coup —
      // et quand elle ne l'est pas, elle ne se calcule PAS en comptant les
      // secteurs. C'est l'erreur que le chapitre doit empêcher.
      const nb = segments.length;
      return {
        // ⚠️ Les deux branches doivent poser une question À RÉPONSE OUI/NON,
        // puisque `expected` vaut `equal ? "oui" : "non"`. Une première version
        // demandait « quelle est la probabilité ? » avec des choix oui/non :
        // incohérent, et le typecheck ne l'aurait jamais dit.
        text: equal
          ? `Une roue est partagée en ${nb} secteurs identiques. Peut-on dire que chaque secteur a une probabilité de $\\dfrac{1}{${nb}}$ ?`
          : `Une roue a ${nb} secteurs, mais l'un d'eux est plus large que les autres. Peut-on dire que chaque secteur a une probabilité de $\\dfrac{1}{${nb}}$ ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [equal ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          `Définition : l’équiprobabilité demande des secteurs de même taille.\n\n` +
          `Méthode : on compare les poids des secteurs.\n\n` +
          `Calcul : ${equal ? "tous les secteurs ont le même poids." : "un secteur est plus grand que les autres."}\n\n` +
          `Conclusion : ${equal ? "oui, c’est équiprobable." : "non, ce n’est pas équiprobable."}`,
        canvas: roueCanvas(segments),
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_proba_equiprobabilite_fixed_5_consequence",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_equiprobabilite",
    difficulty: 3,
    theme: "neutral",
    text: "En situation d’équiprobabilité avec $5$ issues, quelle est la probabilité de chaque issue ?",
    format: "qcm",
    choices: ["$\\dfrac{1}{5}$", "$\\dfrac{1}{2}$", "$\\dfrac{5}{1}$", "$1$"],
    expected: ["$\\dfrac{1}{5}$"],
    comparator: "mcq_exact",
    hint: "Une issue sur $5$.",
    explanation:
      "Définition : en équiprobabilité, chaque issue a la même probabilité.\n\n" +
      "Méthode : on divise $1$ par le nombre d’issues.\n\n" +
      "Calcul : $\\dfrac{1}{5}$.\n\n" +
      "Conclusion : chaque issue a une probabilité de $\\dfrac{1}{5}$.",
    tags: ["proba_experience", "equiprobabilite", "qcm"],
  },

  /* =========================
     PROBA_CALCULER (compléments)
  ========================= */
  {
    kind: "template",
    id: "3e_proba_calculer_tpl_4_de",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_calculer",
    difficulty: 2,
    theme: "neutral",
    hint: "Probabilité $= \\dfrac{\\text{cas favorables}}{6}$.",
    tags: ["proba_experience", "calculer", "de", "canvas", "qcm", "template"],
    generate: () => {
      const cible = randomChoice([
        { desc: "un nombre pair", faces: [2, 4, 6] },
        { desc: "un multiple de $3$", faces: [3, 6] },
        { desc: "un nombre supérieur à $4$", faces: [5, 6] },
      ]);
      const k = cible.faces.length;
      const correct = `$\\dfrac{${k}}{6}$`;
      return {
        text: `On lance un dé équilibré. Quelle est la probabilité d’obtenir ${cible.desc} ?`,
        format: "qcm",
        choices: shuffle([correct, `$\\dfrac{6}{${k}}$`, `$\\dfrac{${k}}{${k}}$`, `$\\dfrac{1}{6}$`]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          `Définition : probabilité $= \\dfrac{\\text{cas favorables}}{\\text{cas possibles}}$.\n\n` +
          `Méthode : on compte les faces favorables et toutes les faces.\n\n` +
          `Calcul : $${k}$ faces favorables sur $6$, soit $\\dfrac{${k}}{6}$.\n\n` +
          `Conclusion : la probabilité est $\\dfrac{${k}}{6}$.`,
        canvas: deCanvas(cible.faces),
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_proba_calculer_fixed_2_certain",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_calculer",
    difficulty: 2,
    theme: "neutral",
    text: "On lance un dé. Quelle est la probabilité d’obtenir un nombre entre $1$ et $6$ ?",
    format: "qcm",
    choices: ["$1$", "$\\dfrac{1}{6}$", "$\\dfrac{6}{1}$", "$0$"],
    expected: ["$1$"],
    comparator: "mcq_exact",
    hint: "Toutes les faces conviennent : événement certain.",
    explanation:
      "Définition : un événement certain a une probabilité de $1$.\n\n" +
      "Méthode : on compte les issues favorables.\n\n" +
      "Calcul : $6$ favorables sur $6$ : $\\dfrac{6}{6} = 1$.\n\n" +
      "Conclusion : la probabilité est $1$.",
    canvas: deCanvas([1, 2, 3, 4, 5, 6]),
    tags: ["proba_experience", "calculer", "certain", "de", "canvas"],
  },
  {
    kind: "template",
    id: "3e_proba_calculer_tpl_5_billes_decimal",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_calculer",
    difficulty: 3,
    theme: "neutral",
    hint: "P(rouge) $= \\dfrac{\\text{rouges}}{\\text{total}}$, en décimal.",
    tags: ["proba_experience", "calculer", "billes", "decimal", "canvas", "template"],
    generate: () => {
      const total = randomChoice([10, 20, 5, 4]);
      const r = total / randomChoice([2, 4]);
      const dec = r / total;
      const elements = [
        ...Array.from({ length: r }, () => ({ couleur: couleurs.rouge })),
        ...Array.from({ length: total - r }, () => ({ couleur: couleurs.bleu })),
      ];
      return {
        text: `Un sac contient ${total} billes dont ${r} rouges. Quelle est la probabilité de tirer une rouge ? (réponse décimale)`,
        format: "short",
        expected: [String(dec).replace(".", ","), String(dec)],
        comparator: "number_equal",
        explanation:
          `Définition : probabilité $= \\dfrac{\\text{favorables}}{\\text{total}}$.\n\n` +
          `Méthode : on divise $${r}$ par $${total}$.\n\n` +
          `Calcul : $${r} \\div ${total} = ${String(dec).replace(".", ",")}$.\n\n` +
          `Conclusion : la probabilité est $${String(dec).replace(".", ",")}$.`,
        canvas: billesCanvas(elements),
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_proba_calculer_fixed_3_impossible",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_calculer",
    difficulty: 3,
    theme: "neutral",
    text: "Un sac ne contient que des billes bleues. Quelle est la probabilité de tirer une bille rouge ?",
    format: "qcm",
    choices: ["$0$", "$1$", "$\\dfrac{1}{2}$", "on ne peut pas savoir"],
    expected: ["$0$"],
    comparator: "mcq_exact",
    hint: "Aucune bille rouge : événement impossible.",
    explanation:
      "Définition : un événement impossible a une probabilité de $0$.\n\n" +
      "Méthode : on compte les billes rouges.\n\n" +
      "Calcul : il y a $0$ bille rouge.\n\n" +
      "Conclusion : la probabilité est $0$.",
    tags: ["proba_experience", "calculer", "impossible", "qcm"],
  },
  {
    kind: "template",
    id: "3e_proba_calculer_tpl_6_roue",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_calculer",
    difficulty: 3,
    theme: "neutral",
    hint: "On divise le poids du secteur favorable par le poids total.",
    tags: ["proba_experience", "calculer", "roue", "canvas", "template"],
    generate: () => {
      const pr = randomChoice([1, 2]);
      // Le premier piège est la probabilité du Bleu : à poids égal, c'est la
      // bonne réponse recopiée. Une fois sur deux, l'élève voyait deux lignes
      // identiques toutes les deux justes.
      const pb = pr === 1 ? 2 : 1;
      const pv = randomChoice([1, 2]);
      const total = pr + pb + pv;
      const correct = `$\\dfrac{${pr}}{${total}}$`;
      return {
        text: "Quelle est la probabilité d’obtenir Rouge avec cette roue ?",
        format: "qcm",
        choices: shuffle([correct, `$\\dfrac{${pb}}{${total}}$`, `$\\dfrac{${total}}{${pr}}$`, `$\\dfrac{1}{3}$`]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          `Définition : sur une roue pondérée, $P = \\dfrac{\\text{poids favorable}}{\\text{poids total}}$.\n\n` +
          `Méthode : on additionne les poids, puis on isole le secteur Rouge.\n\n` +
          `Calcul : poids total $= ${pr} + ${pb} + ${pv} = ${total}$, Rouge $= ${pr}$, donc $\\dfrac{${pr}}{${total}}$.\n\n` +
          `Conclusion : la probabilité est $\\dfrac{${pr}}{${total}}$.`,
        canvas: roueCanvas([
          { label: "Rouge", poids: pr, couleur: couleurs.rouge },
          { label: "Bleu", poids: pb, couleur: couleurs.bleu },
          { label: "Vert", poids: pv, couleur: couleurs.vert },
        ]),
      };
    },
  },

  /* =========================
     PROBA_DEFI (compléments)
  ========================= */
  {
    kind: "template",
    id: "3e_proba_defi_tpl_4_billes",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 4,
    theme: "reunion",
    hint: "Probabilité $= \\dfrac{\\text{favorables}}{\\text{total}}$, simplifiée.",
    tags: ["proba_experience", "defi", "billes", "canvas", "template"],
    generate: () => {
      const r = randomChoice([2, 3, 4]);
      const total = randomChoice([8, 10, 12]);
      const result = fraction(r, total);
      const elements = [
        ...Array.from({ length: r }, () => ({ couleur: couleurs.rouge })),
        ...Array.from({ length: total - r }, () => ({ couleur: couleurs.bleu })),
      ];
      return {
        text: `Un sac contient ${total} billes dont ${r} rouges. Quelle est la probabilité de tirer une rouge ? Donne la fraction simplifiée.`,
        format: "short",
        expected: [result],
        comparator: "fraction_decimal_equivalent",
        explanation:
          `Définition : probabilité $= \\dfrac{\\text{favorables}}{\\text{total}}$.\n\n` +
          `Méthode : on écrit $\\dfrac{${r}}{${total}}$, puis on simplifie.\n\n` +
          `Calcul : $\\dfrac{${r}}{${total}} = ${result}$.\n\n` +
          `Conclusion : la probabilité simplifiée est $${result}$.`,
        canvas: billesCanvas(elements),
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_proba_defi_fixed_3_contraire",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 5,
    theme: "neutral",
    text: "La probabilité de gagner à un jeu est $0{,}3$. Quelle est la probabilité de perdre ?",
    format: "short",
    expected: ["0,7", "0.7"],
    comparator: "number_equal",
    hint: "$1 - P(\\text{gagner})$.",
    explanation:
      "Définition : « perdre » est l’événement contraire de « gagner ».\n\n" +
      "Méthode : on calcule $1 - 0{,}3$.\n\n" +
      "Calcul : $1 - 0{,}3 = 0{,}7$.\n\n" +
      "Conclusion : la probabilité de perdre est $0{,}7$.",
    tags: ["proba_experience", "defi", "contraire", "short"],
  },
  {
    kind: "fixed",
    id: "3e_proba_defi_fixed_4_brevet",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 5,
    theme: "neutral",
    text: "On tire une carte parmi $10$ cartes numérotées de $1$ à $10$. Quelle est la probabilité d’obtenir un nombre pair ?",
    format: "qcm",
    choices: ["$\\dfrac{5}{10}$", "$\\dfrac{1}{10}$", "$\\dfrac{2}{10}$", "$\\dfrac{10}{5}$"],
    expected: ["$\\dfrac{5}{10}$"],
    comparator: "mcq_exact",
    hint: "Les pairs de $1$ à $10$ : $2,4,6,8,10$.",
    explanation:
      "Définition : probabilité $= \\dfrac{\\text{favorables}}{\\text{total}}$.\n\n" +
      "Méthode : on compte les nombres pairs de $1$ à $10$.\n\n" +
      "Calcul : $2,4,6,8,10$ soit $5$ sur $10$ : $\\dfrac{5}{10}$.\n\n" +
      "Conclusion : la probabilité est $\\dfrac{5}{10}$.",
    tags: ["proba_experience", "defi", "brevet", "qcm"],
  },
  {
    kind: "template",
    id: "3e_proba_defi_tpl_5_comparer",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Compare les fractions au même dénominateur.",
    tags: ["proba_experience", "defi", "comparaison", "template"],
    generate: () => {
      const cas = randomChoice([
        { sac: "A", pa: "2/4", pb: "3/4", plus: "B" },
        { sac: "A", pa: "1/2", pb: "1/3", plus: "A" },
        { sac: "A", pa: "3/5", pb: "2/5", plus: "A" },
      ]);
      return {
        text: `Sac A : probabilité de gagner $= \\dfrac{${cas.pa.split("/")[0]}}{${cas.pa.split("/")[1]}}$. Sac B : $\\dfrac{${cas.pb.split("/")[0]}}{${cas.pb.split("/")[1]}}$. Avec quel sac a-t-on le plus de chances de gagner ?`,
        format: "qcm",
        choices: shuffle(["le sac A", "le sac B", "les deux pareil"]),
        expected: [cas.plus === "A" ? "le sac A" : "le sac B"],
        comparator: "mcq_exact",
        explanation:
          `Définition : on compare deux probabilités.\n\n` +
          `Méthode : on met au même dénominateur ou on convertit en décimal.\n\n` +
          `Calcul : la plus grande probabilité est celle du sac ${cas.plus}.\n\n` +
          `Conclusion : on a plus de chances avec le sac ${cas.plus}.`,
      };
    },
  },
];