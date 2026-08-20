// lib/tutor-v4/questionBank/ce1/francais/sons-complexes.bank.ts
//
// Les sons complexes du CE1, écrits à la main. Six micro-compétences.
//
// CE QU'ELLE REMPLACE : quatre énoncés pour six micro-compétences, dont deux
// qui ne tiennent pas debout. « Dans quel mot le "e" est-il muet ? » attendait
// « grande » avec « porte » parmi les pièges — le e de porte est muet aussi.
// Et « Quel mot contient un "e" avec un accent aigu ? » attendait « ecole »,
// écrit SANS accent aigu.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cours élémentaire première année) :
//   — « Décoder toutes les correspondances entre les lettres et les sons, y
//     compris les plus complexes » ;
//   — « Mémoriser l'ensemble des graphèmes, en particulier ceux des sons
//     proches ».
//
// ⛔ RIEN QUI DÉPENDE DE L'ACCENT D'ICI. C'est la règle qui a le plus pesé sur
// cette banque, et elle en a écarté la moitié des exercices habituels :
//
//   — PAS de [e] contre [ɛ]. « lait » se dit [lɛ] dans le nord et souvent [le]
//     à La Réunion. Demander « entends-tu é ou è ? » ferait rater un enfant
//     d'ici à cause de son accent, pas de son orthographe. On travaille donc
//     les accents par ce qui NE dépend d'aucune région : leur NOM, leur SENS
//     de tracé, et le mot dans lequel ils s'écrivent.
//   — PAS de « e » muet final à compter en syllabes. « porte » fait une
//     syllabe à Paris et souvent deux ici.
//   — En revanche, f/v, b/p, ch/j et s/z sont des oppositions de voix,
//     entendues partout de la même façon. Elles sont au cœur de la banque, et
//     le BO les nomme lui-même : « les sons proches ».

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function exp(definition: string, methode: string, exemple: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Exemple : ${exemple}

Conclusion : ${conclusion}`;
}

/* ── gn, ill, ail, eil, euil, ouil ───────────────────────────────────────── */

type MotGraphie = { readonly mot: string; readonly graphie: string };

const GRAPHIES_COMPLEXES: readonly MotGraphie[] = [
  { mot: "montagne", graphie: "gn" }, { mot: "agneau", graphie: "gn" },
  { mot: "peigne", graphie: "gn" }, { mot: "cygne", graphie: "gn" },
  { mot: "champignon", graphie: "gn" }, { mot: "araignée", graphie: "gn" },
  { mot: "famille", graphie: "ill" }, { mot: "papillon", graphie: "ill" },
  { mot: "coquille", graphie: "ill" }, { mot: "brille", graphie: "ill" },
  { mot: "margouillat", graphie: "ouill" }, { mot: "grenouille", graphie: "ouill" },
  { mot: "citrouille", graphie: "ouill" }, { mot: "rouille", graphie: "ouill" },
  { mot: "travail", graphie: "ail" }, { mot: "portail", graphie: "ail" },
  { mot: "détail", graphie: "ail" }, { mot: "corail", graphie: "ail" },
  { mot: "soleil", graphie: "eil" }, { mot: "réveil", graphie: "eil" },
  { mot: "orteil", graphie: "eil" }, { mot: "sommeil", graphie: "eil" },
  { mot: "feuille", graphie: "euill" }, { mot: "fauteuil", graphie: "euill" },
  { mot: "écureuil", graphie: "euil" }, { mot: "chevreuil", graphie: "euil" },
];

const GRAPHIES = ["gn", "ill", "ouill", "ail", "eil", "euill", "euil"];

/* ── Les accents ─────────────────────────────────────────────────────────────
   ⛔ On ne demande JAMAIS quel son on entend. On demande le NOM de l'accent,
   son sens de tracé, et dans quel mot il s'écrit : rien de tout cela ne change
   d'une région à l'autre. */

type MotAccent = {
  readonly mot: string;
  /** La lettre accentuée, telle qu'elle s'écrit. */
  readonly lettre: string;
  readonly nom: string;
  readonly sansAccent: string;
};

const ACCENTS: readonly MotAccent[] = [
  { mot: "école", lettre: "é", nom: "un accent aigu", sansAccent: "ecole" },
  { mot: "été", lettre: "é", nom: "un accent aigu", sansAccent: "ete" },
  { mot: "récré", lettre: "é", nom: "un accent aigu", sansAccent: "recre" },
  { mot: "vélo", lettre: "é", nom: "un accent aigu", sansAccent: "velo" },
  { mot: "café", lettre: "é", nom: "un accent aigu", sansAccent: "cafe" },
  { mot: "père", lettre: "è", nom: "un accent grave", sansAccent: "pere" },
  { mot: "mère", lettre: "è", nom: "un accent grave", sansAccent: "mere" },
  { mot: "frère", lettre: "è", nom: "un accent grave", sansAccent: "frere" },
  { mot: "règle", lettre: "è", nom: "un accent grave", sansAccent: "regle" },
  { mot: "colère", lettre: "è", nom: "un accent grave", sansAccent: "colere" },
  { mot: "fête", lettre: "ê", nom: "un accent circonflexe", sansAccent: "fete" },
  { mot: "tête", lettre: "ê", nom: "un accent circonflexe", sansAccent: "tete" },
  { mot: "forêt", lettre: "ê", nom: "un accent circonflexe", sansAccent: "foret" },
  { mot: "rêve", lettre: "ê", nom: "un accent circonflexe", sansAccent: "reve" },
  { mot: "pêcheur", lettre: "ê", nom: "un accent circonflexe", sansAccent: "pecheur" },
];

const NOMS_ACCENTS = ["un accent aigu", "un accent grave", "un accent circonflexe"];

/* ── Les consonnes doubles ───────────────────────────────────────────────── */

const DOUBLES: readonly MotGraphie[] = [
  { mot: "belle", graphie: "ll" }, { mot: "ville", graphie: "ll" },
  { mot: "colle", graphie: "ll" }, { mot: "balle", graphie: "ll" },
  { mot: "chatte", graphie: "tt" }, { mot: "galette", graphie: "tt" },
  { mot: "assiette", graphie: "tt" }, { mot: "lunettes", graphie: "tt" },
  { mot: "poisson", graphie: "ss" }, { mot: "chausson", graphie: "ss" },
  { mot: "tasse", graphie: "ss" }, { mot: "brosse", graphie: "ss" },
  { mot: "bonne", graphie: "nn" }, { mot: "année", graphie: "nn" },
  { mot: "personne", graphie: "nn" }, { mot: "sonner", graphie: "nn" },
  { mot: "pomme", graphie: "mm" }, { mot: "gomme", graphie: "mm" },
  { mot: "flamme", graphie: "mm" }, { mot: "comment", graphie: "mm" },
  { mot: "terre", graphie: "rr" }, { mot: "arrive", graphie: "rr" },
  { mot: "serrure", graphie: "rr" }, { mot: "barrière", graphie: "rr" },
];

/* ── Les sons proches ────────────────────────────────────────────────────────
   Quatre oppositions de VOIX : la gorge vibre, ou elle ne vibre pas. Cela
   s'entend de la même façon dans toutes les régions — c'est ce qui les rend
   utilisables ici. */

type PaireProche = {
  readonly a: string;
  readonly b: string;
  readonly sonA: string;
  readonly sonB: string;
  readonly sensA: string;
  readonly sensB: string;
};

const SONS_PROCHES: readonly PaireProche[] = [
  { a: "poisson", b: "poison", sonA: "s", sonB: "z", sensA: "un animal qui nage", sensB: "un produit dangereux" },
  { a: "coussin", b: "cousin", sonA: "s", sonB: "z", sensA: "un objet moelleux", sensB: "un membre de la famille" },
  { a: "dessert", b: "désert", sonA: "s", sonB: "z", sensA: "ce qu'on mange à la fin du repas", sensB: "un lieu de sable sans eau" },
  { a: "basse", b: "base", sonA: "s", sonB: "z", sensA: "pas haute", sensB: "le point de départ" },
  { a: "pain", b: "bain", sonA: "p", sonB: "b", sensA: "ce que fait le boulanger", sensB: "ce qu'on prend dans la baignoire" },
  { a: "peau", b: "beau", sonA: "p", sonB: "b", sensA: "ce qui recouvre le corps", sensB: "joli" },
  { a: "poule", b: "boule", sonA: "p", sonB: "b", sensA: "un oiseau de la basse-cour", sensB: "un objet tout rond" },
  { a: "pont", b: "bon", sonA: "p", sonB: "b", sensA: "ce qui traverse une rivière", sensB: "qui a bon goût" },
  { a: "fin", b: "vin", sonA: "f", sonB: "v", sensA: "la dernière partie", sensB: "une boisson" },
  { a: "fer", b: "ver", sonA: "f", sonB: "v", sensA: "un métal dur", sensB: "un petit animal sans pattes" },
  { a: "faux", b: "veau", sonA: "f", sonB: "v", sensA: "qui n'est pas vrai", sensB: "le petit de la vache" },
  { a: "cache", b: "cage", sonA: "ch", sonB: "j", sensA: "un endroit où l'on se cache", sensB: "ce qui enferme un oiseau" },
  { a: "bouche", b: "bouge", sonA: "ch", sonB: "j", sensA: "ce avec quoi on parle", sensB: "il remue" },
  { a: "manche", b: "mange", sonA: "ch", sonB: "j", sensA: "la partie du vêtement autour du bras", sensB: "il avale" },
];

/* ── Les lettres muettes ─────────────────────────────────────────────────────
   ⛔ Aucun « e » muet final : « porte » fait une syllabe à Paris et souvent
   deux ici. On ne garde que des CONSONNES finales, qui ne se prononcent nulle
   part — et dont un mot de la même famille révèle la présence. */

type LettreMuette = {
  readonly mot: string;
  readonly lettre: string;
  readonly famille: string;
};

const MUETTES: readonly LettreMuette[] = [
  { mot: "chat", lettre: "t", famille: "chaton" },
  { mot: "grand", lettre: "d", famille: "grandir" },
  { mot: "gros", lettre: "s", famille: "grossir" },
  { mot: "blanc", lettre: "c", famille: "blanche" },
  { mot: "petit", lettre: "t", famille: "petite" },
  { mot: "long", lettre: "g", famille: "longue" },
  { mot: "lourd", lettre: "d", famille: "lourde" },
  { mot: "tapis", lettre: "s", famille: "tapisserie" },
  { mot: "dent", lettre: "t", famille: "dentiste" },
  { mot: "bras", lettre: "s", famille: "brasse" },
  { mot: "chaud", lettre: "d", famille: "chaude" },
  { mot: "froid", lettre: "d", famille: "froide" },
  { mot: "vert", lettre: "t", famille: "verte" },
  { mot: "plat", lettre: "t", famille: "plate" },
  { mot: "rang", lettre: "g", famille: "ranger" },
  { mot: "sang", lettre: "g", famille: "sanguin" },
];

export const sonsComplexesBank: TutorBankItemV4[] = [
  /* =========================================================
     CE1_SONS_GN_ILL
  ========================================================= */
  {
    kind: "template",
    id: "ce1_sons_gn_ill_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "sons_complexes",
    microId: "ce1_sons_gn_ill",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche le groupe de lettres qui se lit d'un seul coup.",
    tags: ["ce1", "sons", "gn-ill", "template"],
    generate: () => {
      const m = randomChoice(GRAPHIES_COMPLEXES);
      return {
        text: `Quel groupe de lettres complexe trouve-t-on dans le mot « ${m.mot} » ?`,
        format: "qcm" as const,
        choices: makeChoices(m.graphie, GRAPHIES),
        expected: [m.graphie],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Certaines lettres se lisent ensemble, d'un seul coup : gn, ill, ail, eil, euil, ouil.",
          "Découpe le mot lentement, et repère l'endroit où plusieurs lettres n'en font qu'une.",
          `${m.mot} contient « ${m.graphie} ». Si on lisait les lettres une par une, le mot ne se dirait plus.`,
          `Le groupe est « ${m.graphie} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_sons_gn_ill_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "sons_complexes",
    microId: "ce1_sons_gn_ill",
    difficulty: 2,
    theme: "neutral",
    hint: "Trois mots contiennent le même groupe de lettres. Le quatrième, non.",
    tags: ["ce1", "sons", "gn-ill", "template"],
    generate: () => {
      const graphie = randomChoice([...new Set(GRAPHIES_COMPLEXES.map((m) => m.graphie))]);
      const memes = shuffle(GRAPHIES_COMPLEXES.filter((m) => m.graphie === graphie))
        .slice(0, 3)
        .map((m) => m.mot);
      const intrus = randomChoice(GRAPHIES_COMPLEXES.filter((m) => m.graphie !== graphie)).mot;
      return {
        text: `Quel mot ne contient PAS le groupe de lettres « ${graphie} » ?\n\n${shuffle([intrus, ...memes]).join(" · ")}`,
        format: "qcm" as const,
        choices: makeChoices(intrus, memes),
        expected: [intrus],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un même groupe de lettres se lit toujours de la même façon, quel que soit le mot.",
          "Cherche les lettres une à une dans chaque mot, en posant ton doigt dessus.",
          `${memes.join(", ")} portent tous « ${graphie} ». « ${intrus} », non.`,
          `L'intrus est « ${intrus} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_SONS_E_ACCENT — nommer et voir, jamais entendre
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_sons_e_accent_fixed_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "sons_complexes",
    microId: "ce1_sons_e_accent",
    difficulty: 1,
    theme: "neutral",
    text: "Dans « école », le petit trait sur le « e » monte vers la droite. Comment s'appelle cet accent ?",
    format: "qcm",
    choices: [
      "un accent aigu",
      "un accent grave",
      "un accent circonflexe",
      "un tréma",
    ],
    expected: ["un accent aigu"],
    comparator: "mcq_exact",
    hint: "Aigu comme une aiguille : le trait pointe vers le haut à droite.",
    explanation: exp(
      "Il y a trois accents sur le « e » : é (aigu), è (grave), ê (circonflexe, le petit chapeau).",
      "Regarde le sens du trait : é monte vers la droite, è descend vers la droite, ê a un toit.",
      "école, été, vélo : accent aigu. père, règle : accent grave. fête, forêt : accent circonflexe.",
      "C'est un accent aigu.",
    ),
    tags: ["ce1", "sons", "accents", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_sons_e_accent_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "sons_complexes",
    microId: "ce1_sons_e_accent",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde le sens du trait : é monte, è descend, ê porte un chapeau.",
    tags: ["ce1", "sons", "accents", "template"],
    generate: () => {
      const m = randomChoice(ACCENTS);
      return {
        text: `Dans le mot « ${m.mot} », quel accent porte la lettre « ${m.lettre} » ?`,
        format: "qcm" as const,
        choices: makeChoices(m.nom, [...NOMS_ACCENTS, "un tréma"]),
        expected: [m.nom],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un accent est un petit signe posé sur une voyelle. On le reconnait à son dessin, pas à son bruit.",
          "Regarde le trait : é monte vers la droite, è descend vers la droite, ê a un toit pointu.",
          `« ${m.mot} » s'écrit avec « ${m.lettre} » : c'est ${m.nom}.`,
          `C'est ${m.nom}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_sons_e_accent_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "sons_complexes",
    microId: "ce1_sons_e_accent",
    difficulty: 3,
    theme: "neutral",
    hint: "Un accent oublié, c'est une faute : le mot n'est plus le bon.",
    tags: ["ce1", "sons", "accents", "template"],
    generate: () => {
      const m = randomChoice(ACCENTS);
      const autres = shuffle(ACCENTS.filter((x) => x.mot !== m.mot))
        .slice(0, 3)
        .map((x) => x.mot);
      return {
        text: `Comment s'écrit correctement ce mot : « ${m.sansAccent} » ?`,
        format: "qcm" as const,
        choices: makeChoices(m.mot, [m.sansAccent, ...autres]),
        expected: [m.mot],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "L'accent fait partie du mot. Oublier l'accent, c'est écrire une autre chose.",
          "Repère la voyelle qui porte l'accent et vérifie son dessin.",
          `On écrit « ${m.mot} », avec ${m.nom}. « ${m.sansAccent} », sans accent, n'existe pas.`,
          `Le mot correct est « ${m.mot} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_SONS_DOUBLE_CONS
  ========================================================= */
  {
    kind: "template",
    id: "ce1_sons_double_cons_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "sons_complexes",
    microId: "ce1_sons_double_cons",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche la lettre écrite deux fois de suite.",
    tags: ["ce1", "sons", "doubles", "template"],
    generate: () => {
      const m = randomChoice(DOUBLES);
      const autres = [...new Set(DOUBLES.map((x) => x.graphie))].filter((g) => g !== m.graphie);
      return {
        text: `Quelle consonne est doublée dans le mot « ${m.mot} » ?`,
        format: "qcm" as const,
        choices: makeChoices(m.graphie, autres),
        expected: [m.graphie],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une consonne double s'écrit deux fois, mais ne se prononce qu'une seule.",
          "Cherche les deux lettres identiques collées l'une à l'autre.",
          `${m.mot} porte « ${m.graphie} ». On ne dit pas la lettre deux fois pour autant.`,
          `La consonne doublée est « ${m.graphie} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_SONS_PROCHES — la gorge vibre, ou non
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_sons_proches_fixed_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "sons_complexes",
    microId: "ce1_sons_proches",
    difficulty: 3,
    theme: "neutral",
    text: "Pose ta main sur ta gorge et dis « fffff », puis « vvvvv ». Que se passe-t-il ?",
    format: "qcm",
    choices: [
      "Ça vibre pour le v, pas pour le f",
      "Ça vibre pour le f, pas pour le v",
      "Ça vibre pour les deux",
      "Ça ne vibre jamais",
    ],
    expected: ["Ça vibre pour le v, pas pour le f"],
    comparator: "mcq_exact",
    hint: "Essaie pour de vrai, la main bien à plat sur la gorge.",
    explanation: exp(
      "f et v se font exactement au même endroit de la bouche. Une seule chose les sépare : la gorge vibre pour le v.",
      "Pose ta main sur ta gorge et allonge le son. Ta main sent la différence mieux que ton oreille.",
      "fer / ver, fin / vin : deux lettres, deux mots complètement différents. C'est pareil pour p/b, ch/j et s/z.",
      "Ça vibre pour le v, pas pour le f.",
    ),
    tags: ["ce1", "sons", "sons-proches", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_sons_proches_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "sons_complexes",
    microId: "ce1_sons_proches",
    difficulty: 3,
    theme: "neutral",
    hint: "Une seule lettre change, et le mot ne veut plus dire la même chose.",
    tags: ["ce1", "sons", "sons-proches", "template"],
    generate: () => {
      const p = randomChoice(SONS_PROCHES);
      const versA = Math.random() < 0.5;
      const bon = versA ? p.a : p.b;
      const sens = versA ? p.sensA : p.sensB;
      const autres = shuffle(SONS_PROCHES.filter((x) => x.a !== p.a))
        .slice(0, 2)
        .map((x) => x.a);
      return {
        text: `Quel mot veut dire « ${sens} » ?`,
        format: "qcm" as const,
        choices: makeChoices(bon, [versA ? p.b : p.a, ...autres]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Deux sons très proches ne changent qu'une lettre, mais ils changent tout le mot.",
          "Dis les deux mots à voix haute, la main sur la gorge : elle vibre pour l'un et pas pour l'autre.",
          `« ${p.a} » (${p.sensA}) et « ${p.b} » (${p.sensB}) : seule la lettre « ${p.sonA} » ou « ${p.sonB} » les sépare.`,
          `Le mot est « ${bon} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_sons_proches_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "sons_complexes",
    microId: "ce1_sons_proches",
    difficulty: 2,
    theme: "neutral",
    hint: "Un des deux sons fait vibrer la gorge. Lequel ?",
    tags: ["ce1", "sons", "sons-proches", "template"],
    generate: () => {
      const p = randomChoice(SONS_PROCHES);
      const versA = Math.random() < 0.5;
      const mot = versA ? p.a : p.b;
      const bon = versA ? p.sonA : p.sonB;
      return {
        text: `Dans le mot « ${mot} », entend-on le son « ${p.sonA} » ou le son « ${p.sonB} » ?`,
        format: "qcm" as const,
        choices: shuffle([p.sonA, p.sonB]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Les sons proches se distinguent par la vibration de la gorge, pas par la place de la langue.",
          "Dis le mot lentement, la main sur la gorge. Si elle vibre, c'est le son sonore.",
          `« ${p.a} » ne fait pas vibrer, « ${p.b} » fait vibrer. Et les deux mots ne veulent pas dire la même chose : ${p.sensA} contre ${p.sensB}.`,
          `Dans « ${mot} », on entend « ${bon} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_SONS_LETTRES_MUETTES
  ========================================================= */
  {
    kind: "template",
    id: "ce1_sons_lettres_muettes_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "sons_complexes",
    microId: "ce1_sons_lettres_muettes",
    difficulty: 2,
    theme: "neutral",
    hint: "Dis le mot à voix haute : la dernière lettre écrite s'entend-elle ?",
    tags: ["ce1", "sons", "muettes", "template"],
    generate: () => {
      const m = randomChoice(MUETTES);
      const autres = [...new Set(MUETTES.map((x) => x.lettre))].filter((l) => l !== m.lettre);
      return {
        text: `Dans le mot « ${m.mot} », quelle lettre s'écrit sans se prononcer ?`,
        format: "qcm" as const,
        choices: makeChoices(m.lettre, autres),
        expected: [m.lettre],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Beaucoup de mots finissent par une consonne qu'on écrit et qu'on ne dit pas.",
          "Dis le mot, puis regarde-le : la lettre en trop à la fin est la lettre muette.",
          `« ${m.mot} » : on ne dit pas le « ${m.lettre} ». Mais « ${m.famille} », de la même famille, le réveille — et c'est comme ça qu'on sait qu'il faut l'écrire.`,
          `La lettre muette est « ${m.lettre} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_sons_lettres_muettes_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "sons_complexes",
    microId: "ce1_sons_lettres_muettes",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche un mot de la même famille : la lettre endormie s'y réveille.",
    tags: ["ce1", "sons", "muettes", "template"],
    generate: () => {
      const m = randomChoice(MUETTES);
      const autres = shuffle(MUETTES.filter((x) => x.mot !== m.mot))
        .slice(0, 3)
        .map((x) => x.famille);
      return {
        text: `Quel mot de la même famille fait entendre la lettre muette de « ${m.mot} » ?`,
        format: "qcm" as const,
        choices: makeChoices(m.famille, autres),
        expected: [m.famille],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "La lettre muette d'un mot se retrouve grâce à un mot de la même famille, où elle se prononce.",
          "Allonge le mot : cherche un mot plus long qui commence pareil.",
          `${m.mot} → ${m.famille} : le « ${m.lettre} » se réveille. C'est la preuve qu'il faut l'écrire dans « ${m.mot} ».`,
          `Le mot de la famille est « ${m.famille} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_SONS_DEFI
  ========================================================= */
  {
    kind: "template",
    id: "ce1_sons_defi_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "sons_complexes",
    microId: "ce1_sons_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux choses à vérifier : le son entendu, et le sens du mot.",
    tags: ["ce1", "sons", "defi", "template"],
    generate: () => {
      const p = randomChoice(SONS_PROCHES);
      const bon = `« ${p.a} » : ${p.sensA} · « ${p.b} » : ${p.sensB}`;
      return {
        text: `« ${p.a} » et « ${p.b} » ne changent que d'une lettre.\n\nQuelle réponse est entièrement juste ?`,
        format: "qcm" as const,
        choices: shuffle([
          bon,
          `« ${p.a} » : ${p.sensB} · « ${p.b} » : ${p.sensA}`,
          `« ${p.a} » : ${p.sensA} · « ${p.b} » : ${p.sensA}`,
          `« ${p.a} » : ${p.sensB} · « ${p.b} » : ${p.sensB}`,
        ]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une seule lettre sépare ces deux mots, et elle change tout leur sens.",
          "Prends un mot à la fois : dis-le, puis demande-toi ce qu'il désigne.",
          `« ${p.a} » veut dire ${p.sensA}. « ${p.b} » veut dire ${p.sensB}. Écrire l'un pour l'autre change complètement la phrase.`,
          `La réponse juste est : ${bon}.`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce1_sons_defi_meth_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "sons_complexes",
    microId: "ce1_sons_defi",
    difficulty: 3,
    theme: "neutral",
    text: "« Il y a un poisson dans l'assiette. » et « Il y a un poison dans l'assiette. »\n\nUne seule lettre change. Pourquoi faut-il faire très attention à celle-là ?",
    format: "qcm",
    choices: [
      "Parce qu'un seul « s » entre deux voyelles se lit [z] : le mot devient un autre mot.",
      // L'erreur réelle : ne voir qu'une variante d'écriture, pas deux mots.
      "Parce que les deux mots veulent dire la même chose, écrite de deux façons.",
      "Parce que la lettre « s » est difficile à écrire.",
      "Parce qu'il faut toujours doubler les consonnes au milieu d'un mot.",
    ],
    expected: [
      "Parce qu'un seul « s » entre deux voyelles se lit [z] : le mot devient un autre mot.",
    ],
    comparator: "mcq_exact",
    hint: "Dis les deux mots à voix haute, la main sur la gorge.",
    explanation: exp(
      "Entre deux voyelles, un seul « s » se dit [z] et deux « ss » se disent [s]. Cette lettre en plus change tout le mot.",
      "Pose ta main sur ta gorge : elle vibre pour « poison », elle ne vibre pas pour « poisson ».",
      "Un poisson se mange. Un poison rend malade. Une lettre de différence à l'écrit, et deux phrases qui ne disent pas du tout la même chose.",
      "Parce qu'un seul « s » entre deux voyelles se lit [z] : le mot devient un autre mot.",
    ),
    tags: ["ce1", "sons", "defi", "piege", "qcm"],
  },

  /* ═══════════════════════════════════════════════════════════════════════
     LE SECOND ITEM (20/08/2026)
     ---------------------------------------------------------------------
     `ce1_sons_double_cons` portait UN SEUL item : la ligne cliquée ouvrait
     `ce1_sons_proches`. Celui-ci prend le chemin inverse — la consonne double
     est donnée, on cherche le mot qui la porte.
     ═══════════════════════════════════════════════════════════════════════ */
  {
    kind: "template",
    id: "ce1_sons_double_cons_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "sons_complexes",
    microId: "ce1_sons_double_cons",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche le mot où cette lettre est écrite deux fois de suite.",
    tags: ["ce1", "sons", "doubles", "template"],
    generate: () => {
      const m = randomChoice(DOUBLES);
      /* Les leurres portent une AUTRE consonne double : chacun est donc un vrai
         mot à consonne double, mais un seul répond à la lettre demandée. */
      const autres = shuffle(DOUBLES.filter((x) => x.graphie !== m.graphie))
        .slice(0, 3)
        .map((x) => x.mot);
      return {
        text: `Dans lequel de ces mots la consonne « ${m.graphie} » est-elle doublée ?`,
        format: "qcm" as const,
        choices: makeChoices(m.mot, autres),
        expected: [m.mot],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une consonne double s'écrit deux fois et ne se prononce qu'une. Savoir laquelle est doublée dans un mot, c'est savoir l'écrire.",
          "Le premier exercice partait du mot pour trouver la consonne. Celui-ci fait l'inverse : la consonne est donnée, cherche le mot où elle apparait deux fois de suite.",
          `« ${m.mot} » porte « ${m.graphie} ». Les trois autres mots ont bien une consonne double, mais ce n'est pas celle-là.`,
          `C'est « ${m.mot} ».`,
        ),
      };
    },
  },
];
