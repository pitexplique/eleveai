// Moteur de conjugaison parametrique (cycle 3 : CM1, CM2, 6e).
//
// Idee (12/06/2026) : comme les banques de maths utilisent randomInt() dans des
// gabarits, on genere ici des centaines de questions de conjugaison correctes a
// partir de listes de verbes x pronoms x temps, au lieu d'ecrire chaque question
// a la main. Les distracteurs sont les confusions classiques (autre personne,
// infinitif, autre temps).
//
// Securite clavier : reponse libre uniquement pour les verbes reguliers (-er /
// -ir 2e groupe), dont toutes les formes au present/imparfait/futur sont SANS
// accent. Les verbes irreguliers (etre, avoir, aller...) passent en QCM, ou les
// accents ne posent pas de probleme puisqu'on clique.

export type ConjTense = "present" | "imparfait" | "futur";

export type ConjItem =
  | { kind: "qcm"; text: string; correct: string; wrongs: string[]; methode: string }
  | { kind: "short"; text: string; answers: string[]; methode: string };

const PRONOUNS = ["je", "tu", "il", "nous", "vous", "ils"] as const;

// ── Verbes reguliers (listes "propres" : pas de -ger/-cer/-yer/-eler/-eter ni
//    de changement de radical, pour que la generation par regle soit exacte). ──

const ER_VERBS = [
  "parler", "chanter", "jouer", "regarder", "donner", "trouver", "aimer",
  "montrer", "rester", "raconter", "sauter", "marcher", "danser", "gagner",
  "garder", "laver", "porter", "pousser", "attraper", "fermer", "casser",
  "coller", "sonner", "tomber", "dessiner", "ramasser", "klaxonner", "discuter",
];

const IR_VERBS = [
  "finir", "choisir", "grandir", "remplir", "ralentir", "punir", "salir",
  "unir", "nourrir", "applaudir", "avertir", "rougir", "maigrir", "jaunir",
  "blanchir", "obeir", "reflechir", "reunir", "guerir", "saisir",
];

const ER_PRESENT = ["e", "es", "e", "ons", "ez", "ent"];
const ER_IMPARFAIT = ["ais", "ais", "ait", "ions", "iez", "aient"];
const IR_PRESENT = ["is", "is", "it", "issons", "issez", "issent"];
const IR_IMPARFAIT = ["issais", "issais", "issait", "issions", "issiez", "issaient"];
const FUTUR = ["ai", "as", "a", "ons", "ez", "ont"]; // ajoutees a l'infinitif

function conjugateRegular(inf: string, group: "er" | "ir", tense: ConjTense): string[] {
  const stem = inf.slice(0, -2);
  if (tense === "futur") return FUTUR.map((end) => inf + end);
  if (group === "er") {
    return (tense === "present" ? ER_PRESENT : ER_IMPARFAIT).map((e) => stem + e);
  }
  return (tense === "present" ? IR_PRESENT : IR_IMPARFAIT).map((e) => stem + e);
}

// ── Verbes irreguliers (tables explicites) ──────────────────────────────────

type IrregularTable = { inf: string; present: string[]; imparfait: string[]; futur: string[] };

const IRREGULARS: IrregularTable[] = [
  {
    inf: "etre",
    present: ["suis", "es", "est", "sommes", "etes", "sont"],
    imparfait: ["etais", "etais", "etait", "etions", "etiez", "etaient"],
    futur: ["serai", "seras", "sera", "serons", "serez", "seront"],
  },
  {
    inf: "avoir",
    present: ["ai", "as", "a", "avons", "avez", "ont"],
    imparfait: ["avais", "avais", "avait", "avions", "aviez", "avaient"],
    futur: ["aurai", "auras", "aura", "aurons", "aurez", "auront"],
  },
  {
    inf: "aller",
    present: ["vais", "vas", "va", "allons", "allez", "vont"],
    imparfait: ["allais", "allais", "allait", "allions", "alliez", "allaient"],
    futur: ["irai", "iras", "ira", "irons", "irez", "iront"],
  },
  {
    inf: "faire",
    present: ["fais", "fais", "fait", "faisons", "faites", "font"],
    imparfait: ["faisais", "faisais", "faisait", "faisions", "faisiez", "faisaient"],
    futur: ["ferai", "feras", "fera", "ferons", "ferez", "feront"],
  },
  {
    inf: "dire",
    present: ["dis", "dis", "dit", "disons", "dites", "disent"],
    imparfait: ["disais", "disais", "disait", "disions", "disiez", "disaient"],
    futur: ["dirai", "diras", "dira", "dirons", "direz", "diront"],
  },
  {
    inf: "venir",
    present: ["viens", "viens", "vient", "venons", "venez", "viennent"],
    imparfait: ["venais", "venais", "venait", "venions", "veniez", "venaient"],
    futur: ["viendrai", "viendras", "viendra", "viendrons", "viendrez", "viendront"],
  },
  {
    inf: "prendre",
    present: ["prends", "prends", "prend", "prenons", "prenez", "prennent"],
    imparfait: ["prenais", "prenais", "prenait", "prenions", "preniez", "prenaient"],
    futur: ["prendrai", "prendras", "prendra", "prendrons", "prendrez", "prendront"],
  },
  {
    inf: "voir",
    present: ["vois", "vois", "voit", "voyons", "voyez", "voient"],
    imparfait: ["voyais", "voyais", "voyait", "voyions", "voyiez", "voyaient"],
    futur: ["verrai", "verras", "verra", "verrons", "verrez", "verront"],
  },
  {
    inf: "pouvoir",
    present: ["peux", "peux", "peut", "pouvons", "pouvez", "peuvent"],
    imparfait: ["pouvais", "pouvais", "pouvait", "pouvions", "pouviez", "pouvaient"],
    futur: ["pourrai", "pourras", "pourra", "pourrons", "pourrez", "pourront"],
  },
  {
    inf: "vouloir",
    present: ["veux", "veux", "veut", "voulons", "voulez", "veulent"],
    imparfait: ["voulais", "voulais", "voulait", "voulions", "vouliez", "voulaient"],
    futur: ["voudrai", "voudras", "voudra", "voudrons", "voudrez", "voudront"],
  },
  {
    inf: "partir",
    present: ["pars", "pars", "part", "partons", "partez", "partent"],
    imparfait: ["partais", "partais", "partait", "partions", "partiez", "partaient"],
    futur: ["partirai", "partiras", "partira", "partirons", "partirez", "partiront"],
  },
  {
    inf: "mettre",
    present: ["mets", "mets", "met", "mettons", "mettez", "mettent"],
    imparfait: ["mettais", "mettais", "mettait", "mettions", "mettiez", "mettaient"],
    futur: ["mettrai", "mettras", "mettra", "mettrons", "mettrez", "mettront"],
  },
];

// ── Utilitaires ─────────────────────────────────────────────────────────────

function randInt(max: number): number {
  return Math.floor(Math.random() * max);
}

function pick<T>(items: readonly T[]): T {
  return items[randInt(items.length)];
}

// Avec elision correcte devant voyelle : "a l'imparfait", pas "au imparfait".
const TENSE_PHRASE: Record<ConjTense, string> = {
  present: "au present",
  imparfait: "a l'imparfait",
  futur: "au futur",
};
const TENSE_OF: Record<ConjTense, string> = {
  present: "du present",
  imparfait: "de l'imparfait",
  futur: "du futur",
};

// Construit TOUJOURS 3 distracteurs distincts (autres personnes, autres temps,
// infinitif). Si les formes se repetent trop (je/tu identiques...), on complete
// avec un dernier recours pour ne jamais rendre un QCM a moins de 4 choix.
function buildWrongs(correct: string, ...pools: string[][]): string[] {
  const seen = new Set<string>([correct]);
  const flat = pools.flat();
  for (let i = flat.length - 1; i > 0; i--) {
    const j = randInt(i + 1);
    [flat[i], flat[j]] = [flat[j], flat[i]];
  }
  const out: string[] = [];
  for (const form of flat) {
    if (!seen.has(form)) {
      seen.add(form);
      out.push(form);
      if (out.length === 3) return out;
    }
  }
  for (const pad of [correct + "s", correct + "nt", correct + "ait", correct + "ons"]) {
    if (!seen.has(pad)) {
      seen.add(pad);
      out.push(pad);
      if (out.length === 3) return out;
    }
  }
  return out;
}

// ── Generation d'une question de conjugaison ────────────────────────────────

export function generateConjugationItem(tense: ConjTense): ConjItem {
  const useRegular = Math.random() < 0.65; // majorite de reguliers (reponse libre)

  if (useRegular) {
    const group: "er" | "ir" = Math.random() < 0.6 ? "er" : "ir";
    const inf = group === "er" ? pick(ER_VERBS) : pick(IR_VERBS);
    const table = conjugateRegular(inf, group, tense);
    const person = randInt(6);
    const correct = table[person];

    // Une fois sur deux : reponse libre (formes reguliere = sans accent) ;
    // sinon QCM pour varier le format.
    if (Math.random() < 0.5) {
      return {
        kind: "short",
        text: `Conjugue le verbe '${inf}' ${TENSE_PHRASE[tense]} avec '${PRONOUNS[person]}'.`,
        answers: [correct],
        methode: `On prend le radical de '${inf}' et la terminaison ${TENSE_OF[tense]} pour '${PRONOUNS[person]}'.`,
      };
    }

    const others = (["present", "imparfait", "futur"] as ConjTense[]).filter((t) => t !== tense);
    const wrongs = buildWrongs(
      correct,
      table,
      conjugateRegular(inf, group, others[0]),
      conjugateRegular(inf, group, others[1]),
      [inf]
    );
    return {
      kind: "qcm",
      text: `Choisis la bonne forme : '${inf}' ${TENSE_PHRASE[tense]} avec '${PRONOUNS[person]}'.`,
      correct,
      wrongs,
      methode: `On accorde la terminaison ${TENSE_OF[tense]} avec '${PRONOUNS[person]}'.`,
    };
  }

  // Verbe irregulier -> QCM (accents geres par le clic)
  const verb = pick(IRREGULARS);
  const table = verb[tense];
  const person = randInt(6);
  const correct = table[person];
  const others = (["present", "imparfait", "futur"] as ConjTense[]).filter((t) => t !== tense);
  const wrongs = buildWrongs(correct, table, verb[others[0]], verb[others[1]], [verb.inf]);
  return {
    kind: "qcm",
    text: `Choisis la bonne forme : '${verb.inf}' ${TENSE_PHRASE[tense]} avec '${PRONOUNS[person]}'.`,
    correct,
    wrongs,
    methode: `'${verb.inf}' est un verbe irregulier : on retient sa forme ${TENSE_PHRASE[tense]} pour '${PRONOUNS[person]}'.`,
  };
}

// Question "trouver l'infinitif" parametree : on montre une forme conjuguee.
export function generateInfinitifItem(): ConjItem {
  if (Math.random() < 0.7) {
    const group: "er" | "ir" = Math.random() < 0.5 ? "er" : "ir";
    const inf = group === "er" ? pick(ER_VERBS) : pick(IR_VERBS);
    const tense = pick(["present", "imparfait", "futur"] as const);
    const table = conjugateRegular(inf, group, tense);
    const person = randInt(6);
    const forme = table[person];
    const groupLabel = group === "er" ? "1er groupe" : "2e groupe";
    if (Math.random() < 0.5) {
      // demander l'infinitif (reponse libre, infinitifs reguliers sans accent ici)
      return {
        kind: "short",
        text: `Quel est l'infinitif du verbe dans la forme '${forme}' ?`,
        answers: [inf],
        methode: "On enleve la terminaison et on retrouve la forme de base du verbe.",
      };
    }
    return {
      kind: "qcm",
      text: `A quel groupe appartient le verbe '${inf}' ?`,
      correct: groupLabel,
      wrongs: ["1er groupe", "2e groupe", "3e groupe", "aucun des trois"].filter((g) => g !== groupLabel).slice(0, 3),
      methode: "Les verbes en -er (sauf aller) sont du 1er groupe ; ceux en -ir comme finir (nous finissons) du 2e.",
    };
  }
  const verb = pick(IRREGULARS);
  const tense = pick(["present", "imparfait", "futur"] as const);
  const person = randInt(6);
  const forme = verb[tense][person];
  return {
    kind: "qcm",
    text: `Quel est l'infinitif de la forme '${forme}' ?`,
    correct: verb.inf,
    wrongs: buildWrongs(
      verb.inf,
      IRREGULARS.map((v) => v.inf),
      ER_VERBS.slice(0, 6),
      IR_VERBS.slice(0, 6)
    ),
    methode: "On retrouve la forme de base (l'infinitif) du verbe.",
  };
}
