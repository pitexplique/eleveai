// lib/tutor-v4/questionBank/cp/maths/donnees.bank.ts
//
// Les tableaux et les diagrammes du CP, écrits à la main.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cours préparatoire) :
//   — « Avant d'apprendre à extraire de l'information à partir de tableaux ou
//     de graphiques, les élèves apprennent au CP à ORGANISER sous la forme
//     d'un tableau ou d'un graphique des données QU'ILS ONT EUX-MÊMES
//     RECUEILLIES » ;
//   — l'enquête porte sur un caractère QUALITATIF prenant de DEUX À CINQ
//     valeurs, sur une population de moins de quarante individus ;
//   — recueil en bâtons, puis tableau, puis diagramme en barres — « un axe
//     vertical fournit l'échelle pour les barres, il est gradué DE UN EN UN » ;
//   — construire et compléter un TABLEAU À DOUBLE ENTRÉE représentant tous les
//     couples possibles à partir de deux critères, par exemple la forme et la
//     couleur ;
//   — interpréter avec les expressions : « le plus », « le moins », « autant
//     que », « plus que », « moins que ».
//
// LE PIÈGE DE LA NOTION : la case du croisement. Dans un tableau à double
// entrée, on suit la ligne du doigt, on suit la colonne de l'autre main, et on
// lit là où les deux se rencontrent. Son cousin est le passage des bâtons au
// nombre : deux paquets de cinq bâtons ne font pas deux.
//
// ⭐ 10/11/2026 — GÉNÉRATEURS. Chaque gabarit tire une ENQUÊTE (fruit, animal,
// couleur, jeu de récré, goûter, glace, sport, trajet, instrument…) × un
// enquêteur (la troupe et ses amis) × un lieu × une tournure. Le dessin porte
// toujours les données : tableau (`tableau_donnees`) ou diagramme en barres
// (`stat_graph`, axe gradué de un en un, AUCUNE valeur écrite sur les barres,
// aucune barre surlignée) — c'est la lecture qu'on demande.
//
// ⚠️ PAS DE QUESTION À RÉDIGER : `applyMathsKeyboardFree` retire les items
// `format: "open"`. Un CP clique, il ne tape pas.

import type {
  StatGraphCanvasData,
  TableauDonneesCanvasData,
  TutorBankItemV4,
} from "@/lib/tutor-v4/types";

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
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function tableau(data: Omit<TableauDonneesCanvasData, "kind">): TableauDonneesCanvasData {
  return { kind: "tableau_donnees", ...data };
}

/** Diagramme en barres du CP : axe gradué de un en un, aucune valeur écrite. */
function barres(data: { label: string; value: number }[]): StatGraphCanvasData {
  return {
    kind: "stat_graph",
    graphType: "barres",
    size: { width: 340, height: 220 },
    data,
    display: {
      // ⛔ Les valeurs écrites au-dessus des barres donneraient la réponse :
      // on lit la hauteur sur l'axe, gradué de un en un comme le veut le BO.
      showValues: false,
      showLabels: true,
      showAxis: true,
      step: 1,
    },
  };
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

const maj = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** « de Nina », « d'Inès ». */
const de = (p: string) => (/^[AEIOUÉÈÊaeiou]/.test(p) ? `d'${p}` : `de ${p}`);
/** « a, b et c ». */
const enListe = (l: readonly string[]) =>
  l.length < 2 ? l.join("") : `${l.slice(0, -1).join(", ")} et ${l[l.length - 1]}`;

const PRENOMS = [
  "Nina", "Téo", "Zoé", "Ravi", "Lou", "Malo", "Inès", "Sacha",
  "Amir", "Jade", "Naïa", "Tom", "Lina", "Yanis",
] as const;

const LIEUX = [
  "En classe",
  "Au centre de loisirs",
  "À la cantine",
  "Au club de judo",
  "À la piscine",
  "Au goûter d'anniversaire",
  "Dans le bus de la sortie",
  "À la bibliothèque",
  "Au club de foot",
  "En colonie",
] as const;

// Les enquêtes : un caractère qualitatif, 4 ou 5 valeurs au mot court (≤ 8
// lettres : les étiquettes du diagramme ne doivent pas se toucher).
type Enquete = { question: string; entete: string; cats: readonly string[] };
const ENQUETES: readonly Enquete[] = [
  { question: "Quel est ton fruit préféré ?", entete: "Fruit", cats: ["pomme", "banane", "fraise", "kiwi", "mangue"] },
  { question: "Quel est ton animal préféré ?", entete: "Animal", cats: ["chien", "chat", "lapin", "poisson", "cheval"] },
  { question: "Quelle est ta couleur préférée ?", entete: "Couleur", cats: ["rouge", "bleu", "vert", "jaune", "rose"] },
  { question: "À quoi joues-tu à la récré ?", entete: "Jeu", cats: ["ballon", "corde", "billes", "marelle", "loup"] },
  { question: "Que manges-tu au goûter ?", entete: "Goûter", cats: ["gâteau", "fruit", "yaourt", "pain", "compote"] },
  { question: "Quelle glace préfères-tu ?", entete: "Glace", cats: ["vanille", "chocolat", "fraise", "citron", "coco"] },
  { question: "Quel sport aimes-tu ?", entete: "Sport", cats: ["foot", "judo", "danse", "natation", "vélo"] },
  { question: "Comment viens-tu à l'école ?", entete: "Trajet", cats: ["à pied", "en bus", "à vélo", "en voiture"] },
  { question: "Quel instrument aimes-tu ?", entete: "Instrument", cats: ["tambour", "flûte", "guitare", "piano"] },
  { question: "Quel est ton jouet préféré ?", entete: "Jouet", cats: ["poupée", "ballon", "puzzle", "toupie", "peluche"] },
  { question: "Quelle saison préfères-tu ?", entete: "Saison", cats: ["été", "hiver", "automne", "printemps"] },
  { question: "Quel métier veux-tu faire ?", entete: "Métier", cats: ["pompier", "pilote", "fermier", "docteur", "cuisinier"] },
];

type Tirage = { e: Enquete; p: string; lieu: string; valeurs: { label: string; value: number }[] };

/** Une enquête tirée : n catégories, des effectifs (distincts si demandé). */
function enquete(n: number, min: number, max: number, distincts = false): Tirage {
  const e = randomChoice(ENQUETES);
  const cats = shuffle(e.cats).slice(0, Math.min(n, e.cats.length));
  const pool = shuffle(Array.from({ length: max - min + 1 }, (_, i) => min + i));
  const valeurs = cats.map((label, i) => ({
    label,
    value: distincts ? pool[i] : randomInt(min, max),
  }));
  return { e, p: randomChoice(PRENOMS), lieu: randomChoice(LIEUX), valeurs };
}

function tableauEnquete(t: Tirage, enfants = "Enfants"): TableauDonneesCanvasData {
  return tableau({
    headers: [t.e.entete, enfants],
    rows: t.valeurs.map((v) => ({ values: [v.label, v.value] })),
  });
}

/** Une phrase qui pose l'enquête, différente à chaque fois. */
function intro(t: Tirage, support: "tableau" | "diagramme") {
  return randomChoice([
    `${t.p} a demandé : « ${t.e.question} »`,
    `${t.lieu}, ${t.p} a fait une enquête.`,
    `Regarde le ${support} ${de(t.p)}.`,
    `${t.lieu}, on a demandé : « ${t.e.question} »`,
    `Pic le paille-en-queue a fait une enquête.`,
    `Lis le ${support}.`,
  ]);
}

/** Bâtons groupés par cinq : « ||||| ||| ». */
function batons(n: number) {
  const paquets = Math.floor(n / 5);
  const reste = n % 5;
  return [...Array.from({ length: paquets }, () => "|||||"), ...(reste ? ["|".repeat(reste)] : [])].join(" ");
}

// Tableaux à double entrée : des choses (lignes) × des couleurs (colonnes).
const CHOSES = [
  { nom: "ronds", f: false, famille: "formes" },
  { nom: "carrés", f: false, famille: "formes" },
  { nom: "triangles", f: false, famille: "formes" },
  { nom: "ballons", f: false, famille: "jouets" },
  { nom: "voitures", f: true, famille: "jouets" },
  { nom: "toupies", f: true, famille: "jouets" },
  { nom: "pommes", f: true, famille: "fruits" },
  { nom: "poires", f: true, famille: "fruits" },
  { nom: "bonnets", f: false, famille: "habits" },
  { nom: "écharpes", f: true, famille: "habits" },
  { nom: "gants", f: false, famille: "habits" },
  { nom: "chats", f: false, famille: "animaux" },
  { nom: "lapins", f: false, famille: "animaux" },
  { nom: "poules", f: true, famille: "animaux" },
] as const;
const FAMILLES = ["formes", "jouets", "fruits", "habits", "animaux"] as const;
const COULEURS_PAR_FAMILLE: Record<string, readonly { m: string; mp: string; fp: string }[]> = {
  formes: [
    { m: "bleu", mp: "bleus", fp: "bleues" },
    { m: "rouge", mp: "rouges", fp: "rouges" },
    { m: "vert", mp: "verts", fp: "vertes" },
    { m: "jaune", mp: "jaunes", fp: "jaunes" },
  ],
  jouets: [
    { m: "bleu", mp: "bleus", fp: "bleues" },
    { m: "rouge", mp: "rouges", fp: "rouges" },
    { m: "vert", mp: "verts", fp: "vertes" },
    { m: "jaune", mp: "jaunes", fp: "jaunes" },
  ],
  fruits: [
    { m: "rouge", mp: "rouges", fp: "rouges" },
    { m: "vert", mp: "verts", fp: "vertes" },
    { m: "jaune", mp: "jaunes", fp: "jaunes" },
  ],
  habits: [
    { m: "bleu", mp: "bleus", fp: "bleues" },
    { m: "rouge", mp: "rouges", fp: "rouges" },
    { m: "noir", mp: "noirs", fp: "noires" },
    { m: "blanc", mp: "blancs", fp: "blanches" },
  ],
  animaux: [
    { m: "blanc", mp: "blancs", fp: "blanches" },
    { m: "noir", mp: "noirs", fp: "noires" },
    { m: "roux", mp: "roux", fp: "rousses" },
  ],
};

function doubleEntree(nbLignes = 3, nbCols = 3) {
  const famille = randomChoice(FAMILLES);
  const lignes = shuffle(CHOSES.filter((c) => c.famille === famille)).slice(0, nbLignes);
  const cols = shuffle(COULEURS_PAR_FAMILLE[famille]).slice(0, nbCols);
  return { famille, lignes, cols };
}

export const donneesBank: TutorBankItemV4[] = [
  /* =========================================================
     CP_DONNEES_LIRE_TABLEAU — lire une valeur dans un tableau
  ========================================================= */
  {
    kind: "template",
    id: "cp_donnees_lire_tableau_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "donnees",
    microId: "cp_donnees_lire_tableau",
    difficulty: 2,
    theme: "neutral",
    hint: "Trouve la ligne demandée, puis lis le nombre écrit à côté.",
    tags: ["cp", "donnees", "lire_tableau", "template", "canvas"],
    generate: () => {
      const t = enquete(randomInt(3, 4), 2, 12);
      const cible = randomChoice(t.valeurs);
      const q = randomChoice([
        `Combien d'enfants ont répondu « ${cible.label} » ?`,
        `Combien d'enfants ont choisi « ${cible.label} » ?`,
        `« ${maj(cible.label)} » : combien d'enfants ?`,
        `Combien de voix pour « ${cible.label} » ?`,
      ]);
      return {
        text: `${intro(t, "tableau")} ${q}`,
        format: "short",
        expected: [String(cible.value)],
        comparator: "number_equal",
        explanation: exp(
          "Un tableau range les résultats d'une enquête : chaque ligne porte une réponse et son nombre.",
          "On cherche la ligne demandée, puis on lit le nombre écrit en face.",
          `La ligne « ${cible.label} » indique ${cible.value}.`,
          `${cible.value} enfants ont répondu « ${cible.label} ».`,
        ),
        canvas: tableauEnquete(t),
      };
    },
  },
  {
    kind: "template",
    id: "cp_donnees_lire_tableau_tpl_3",
    niveau: "cp",
    matiere: "maths",
    notionId: "donnees",
    microId: "cp_donnees_lire_tableau",
    difficulty: 2,
    theme: "neutral",
    hint: "Lis tous les nombres du tableau et trouve le plus grand (ou le plus petit).",
    tags: ["cp", "donnees", "lire_tableau", "template", "canvas"],
    generate: () => {
      const t = enquete(randomInt(3, 4), 1, 12, true);
      const trie = [...t.valeurs].sort((a, b) => a.value - b.value);
      const max = randomChoice([true, false]);
      const bonne = max ? trie[trie.length - 1] : trie[0];
      const q = randomChoice([
        `Quelle réponse a été choisie le ${max ? "PLUS" : "MOINS"} souvent ?`,
        `Quelle réponse a le ${max ? "PLUS" : "MOINS"} de voix ?`,
        `Quelle réponse a été donnée par le ${max ? "PLUS" : "MOINS"} d'enfants ?`,
      ]);
      return {
        text: `${intro(t, "tableau")} ${q}`,
        format: "qcm",
        choices: shuffle(t.valeurs.map((v) => v.label)),
        expected: [bonne.label],
        comparator: "mcq_exact",
        explanation: exp(
          "Dans le tableau, chaque réponse a son nombre d'enfants.",
          `On lit tous les nombres et on cherche le plus ${max ? "grand" : "petit"}.`,
          `Les nombres sont ${t.valeurs.map((v) => v.value).join(", ")}. Le plus ${max ? "grand" : "petit"} est ${bonne.value}, sur la ligne « ${bonne.label} ».`,
          `C'est « ${bonne.label} ».`,
        ),
        canvas: tableauEnquete(t),
      };
    },
  },
  {
    kind: "fixed",
    id: "cp_donnees_lire_tableau_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "donnees",
    microId: "cp_donnees_lire_tableau",
    difficulty: 3,
    theme: "neutral",
    text: "Pour compter les réponses d'une enquête, on fait des bâtons, par paquets de cinq. On voit ||||| ||||| ||. Combien cela fait-il ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Chaque paquet vaut 5. Compte les paquets, puis ce qui reste.",
    explanation: exp(
      "Les bâtons servent à compter au fil de l'enquête ; on les regroupe pour les relire facilement.",
      "On compte les paquets de cinq, puis les bâtons isolés.",
      "Deux paquets de 5 font 10, plus 2 bâtons isolés : 10 + 2 = 12. Compter les paquets comme des unités donnerait 3, ce qui serait faux.",
      "Cela fait 12.",
    ),
    tags: ["cp", "donnees", "lire_tableau", "piege"],
  },
  {
    kind: "template",
    id: "cp_donnees_lire_tableau_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "donnees",
    microId: "cp_donnees_lire_tableau",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne toutes les lignes du tableau.",
    tags: ["cp", "donnees", "lire_tableau", "template", "canvas"],
    generate: () => {
      const t = enquete(3, 2, 9);
      const total = t.valeurs.reduce((s, v) => s + v.value, 0);
      const q = randomChoice([
        "Combien d'enfants ont répondu en tout ?",
        "Combien d'enfants ont répondu à l'enquête ?",
        "Combien de réponses y a-t-il en tout ?",
      ]);
      return {
        text: `${intro(t, "tableau")} ${q}`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Le total d'une enquête est la somme de toutes les réponses recueillies.",
          "On additionne les nombres de toutes les lignes.",
          `${t.valeurs.map((v) => v.value).join(" + ")} = ${total}.`,
          `${total} enfants ont répondu.`,
        ),
        canvas: tableauEnquete(t),
      };
    },
  },
  {
    kind: "template",
    id: "cp_donnees_lire_tableau_tpl_4",
    niveau: "cp",
    matiere: "maths",
    notionId: "donnees",
    microId: "cp_donnees_lire_tableau",
    difficulty: 3,
    theme: "neutral",
    hint: "Un paquet de bâtons vaut 5. Compte les paquets de 5, puis les bâtons seuls.",
    tags: ["cp", "donnees", "lire_tableau", "batons", "template", "canvas"],
    generate: () => {
      const t = enquete(3, 3, 14);
      const cible = randomChoice(t.valeurs);
      const q = randomChoice([
        `Combien d'enfants ont choisi « ${cible.label} » ?`,
        `Compte les bâtons de « ${cible.label} ». Combien d'enfants ?`,
        `Combien de bâtons pour « ${cible.label} » ?`,
      ]);
      const debut = randomChoice([
        `${t.p} a compté les réponses avec des bâtons.`,
        `${t.lieu}, ${t.p} a noté les réponses avec des bâtons.`,
        `Pic a fait un bâton pour chaque réponse.`,
        `Ti Margo a compté avec des bâtons.`,
      ]);
      return {
        text: `${debut} ${q}`,
        format: "short",
        expected: [String(cible.value)],
        comparator: "number_equal",
        explanation: exp(
          "Un bâton, c'est une réponse. On les range par paquets de cinq pour compter vite.",
          "On compte les paquets de 5, puis on ajoute les bâtons seuls.",
          `« ${cible.label} » : ${batons(cible.value)}. ${Math.floor(cible.value / 5)} paquet(s) de 5 et ${cible.value % 5} bâton(s) seul(s) : cela fait ${cible.value}.`,
          `${cible.value} enfants ont choisi « ${cible.label} ».`,
        ),
        canvas: tableau({
          headers: [t.e.entete, "Bâtons"],
          rows: t.valeurs.map((v) => ({ values: [v.label, batons(v.value)] })),
        }),
      };
    },
  },

  /* =========================================================
     CP_DONNEES_BARRES — lire un diagramme en barres
  ========================================================= */
  {
    kind: "template",
    id: "cp_donnees_barres_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "donnees",
    microId: "cp_donnees_barres",
    difficulty: 2,
    theme: "neutral",
    hint: "La barre la plus haute, c'est la réponse la plus choisie.",
    tags: ["cp", "donnees", "barres", "template", "canvas"],
    generate: () => {
      const t = enquete(4, 1, 10, true);
      const max = randomChoice([true, false]);
      const trie = [...t.valeurs].sort((a, b) => a.value - b.value);
      const bonne = max ? trie[trie.length - 1] : trie[0];
      const q = randomChoice([
        `Quelle réponse a été choisie par le ${max ? "PLUS" : "MOINS"} d'enfants ?`,
        `Quelle est la barre la plus ${max ? "HAUTE" : "BASSE"} ?`,
        `Quelle réponse a eu le ${max ? "PLUS" : "MOINS"} de voix ?`,
      ]);
      return {
        text: `${intro(t, "diagramme")} ${q}`,
        format: "qcm",
        choices: shuffle(t.valeurs.map((v) => v.label)),
        expected: [bonne.label],
        comparator: "mcq_exact",
        explanation: exp(
          "Dans un diagramme en barres, plus une barre est haute, plus la réponse a été choisie.",
          "On compare les hauteurs des barres.",
          `La barre ${max ? "la plus haute" : "la plus basse"} est celle de « ${bonne.label} ».`,
          `C'est « ${bonne.label} ».`,
        ),
        canvas: barres(t.valeurs),
      };
    },
  },
  {
    kind: "fixed",
    id: "cp_donnees_barres_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "donnees",
    microId: "cp_donnees_barres",
    difficulty: 3,
    theme: "neutral",
    text: "Dans un diagramme en barres, que veut dire une barre plus haute qu'une autre ?",
    format: "qcm",
    choices: [
      "que cette réponse a été choisie plus souvent",
      "que cette réponse est la meilleure",
      "que cette barre est plus large",
      "que cette réponse vient en premier",
    ],
    expected: ["que cette réponse a été choisie plus souvent"],
    comparator: "mcq_exact",
    hint: "La hauteur montre une quantité, pas une qualité.",
    explanation: exp(
      "Dans un diagramme en barres, la hauteur d'une barre représente le nombre de réponses.",
      "On lit la hauteur sur l'axe vertical, gradué de un en un.",
      "Une barre plus haute correspond à plus d'enfants. Cela ne dit rien sur la qualité de la réponse : le fruit le plus choisi n'est pas « le meilleur fruit ».",
      "Une barre plus haute veut dire que cette réponse a été choisie plus souvent.",
    ),
    tags: ["cp", "donnees", "barres", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cp_donnees_barres_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "donnees",
    microId: "cp_donnees_barres",
    difficulty: 3,
    theme: "neutral",
    hint: "Suis le haut de la barre jusqu'à l'axe, et lis le nombre.",
    tags: ["cp", "donnees", "barres", "template", "canvas"],
    generate: () => {
      const t = enquete(4, 1, 10);
      const cible = randomChoice(t.valeurs);
      const q = randomChoice([
        `Combien d'enfants ont choisi « ${cible.label} » ?`,
        `Jusqu'où monte la barre « ${cible.label} » ?`,
        `Combien de voix pour « ${cible.label} » ?`,
        `« ${maj(cible.label)} » : combien d'enfants ?`,
      ]);
      return {
        text: `${intro(t, "diagramme")} ${q}`,
        format: "short",
        expected: [String(cible.value)],
        comparator: "number_equal",
        explanation: exp(
          "Sur un axe gradué de un en un, chaque graduation compte un enfant de plus.",
          "On suit le haut de la barre jusqu'à l'axe, et on lit le nombre.",
          `Le haut de la barre « ${cible.label} » arrive au ${cible.value}.`,
          `${cible.value} enfants ont choisi « ${cible.label} ».`,
        ),
        canvas: barres(t.valeurs),
      };
    },
  },

  /* =========================================================
     CP_DONNEES_COMPLETER_TABLEAU — le tableau à double entrée
     LE piège de la notion : la case du croisement.
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_donnees_completer_tableau_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "donnees",
    microId: "cp_donnees_completer_tableau",
    difficulty: 4,
    theme: "neutral",
    text: "Dans un tableau à double entrée, comment trouve-t-on la case des ronds bleus ?",
    format: "qcm",
    choices: [
      "on suit la ligne des ronds et la colonne du bleu, et on lit là où elles se croisent",
      "on prend la première case de la ligne des ronds",
      "on prend la dernière case de la colonne du bleu",
      "on regarde la case du milieu",
    ],
    expected: [
      "on suit la ligne des ronds et la colonne du bleu, et on lit là où elles se croisent",
    ],
    comparator: "mcq_exact",
    hint: "Il faut les DEUX indications à la fois : la forme et la couleur.",
    explanation: exp(
      "Un tableau à double entrée croise deux critères : chaque case correspond à un couple, ici une forme et une couleur.",
      "On pose un doigt sur la ligne, un doigt sur la colonne, et on les fait glisser jusqu'à ce qu'ils se rencontrent.",
      "La ligne des ronds contient tous les ronds, de toutes les couleurs. La colonne du bleu contient tout ce qui est bleu. Seule la case où les deux se croisent contient les ronds bleus.",
      "On lit la case où la ligne et la colonne se croisent.",
    ),
    tags: ["cp", "donnees", "double_entree", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cp_donnees_completer_tableau_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "donnees",
    microId: "cp_donnees_completer_tableau",
    difficulty: 4,
    theme: "neutral",
    hint: "Un doigt sur la ligne, un doigt sur la colonne : lis la case où ils se croisent.",
    tags: ["cp", "donnees", "double_entree", "template", "canvas"],
    generate: () => {
      const { famille, lignes, cols } = doubleEntree(3, 3);
      const grille = lignes.map(() => cols.map(() => randomInt(0, 9)));
      const i = randomInt(0, lignes.length - 1);
      const j = randomInt(0, cols.length - 1);
      const valeur = grille[i][j];
      const quoi = `${lignes[i].nom} ${lignes[i].f ? cols[j].fp : cols[j].mp}`;
      const p = randomChoice(PRENOMS);
      const text = randomChoice([
        `Combien y a-t-il ${de(quoi)} ?`,
        `${p} a trié ses ${famille}. Combien ${de(quoi)} ?`,
        `Lis le tableau ${de(p)}. Combien ${de(quoi)} ?`,
        `Pic cherche les ${quoi}. Combien y en a-t-il ?`,
        `${p} a rangé des ${famille} dans un tableau. Combien ${de(quoi)} ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(valeur)],
        comparator: "number_equal",
        explanation: exp(
          "Dans un tableau à double entrée, chaque case répond à deux questions à la fois.",
          "On suit la ligne et la colonne, et on lit leur croisement.",
          `La ligne « ${lignes[i].nom} » et la colonne « ${cols[j].m} » se croisent sur la case ${valeur}.`,
          `Il y a ${valeur} ${quoi}.`,
        ),
        canvas: tableau({
          headers: ["", ...cols.map((c) => c.m)],
          rows: lignes.map((l, k) => ({ values: [l.nom, ...grille[k]] })),
        }),
      };
    },
  },
  {
    kind: "template",
    id: "cp_donnees_completer_tableau_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "donnees",
    microId: "cp_donnees_completer_tableau",
    difficulty: 5,
    theme: "neutral",
    hint: "Chaque chose peut avoir chaque couleur : une case pour chaque couple.",
    tags: ["cp", "donnees", "double_entree", "template"],
    generate: () => {
      const { famille, lignes, cols } = doubleEntree(randomInt(2, 3), randomInt(2, 4));
      const total = lignes.length * cols.length;
      const p = randomChoice(PRENOMS);
      const liste = enListe(lignes.map((l) => l.nom));
      const couleurs = enListe(cols.map((c) => c.m));
      const text = randomChoice([
        `${p} fait un tableau à double entrée : ${liste} en lignes ; ${couleurs} en colonnes. Combien de cases à remplir ?`,
        `Un tableau range des ${famille} : ${liste}. Les couleurs sont ${couleurs}. Combien de cases faut-il ?`,
        `Pic veut un tableau pour ses ${famille} (${liste}) et les couleurs ${couleurs}. Combien de cases ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Un tableau à double entrée contient une case pour chaque couple possible entre les deux critères.",
          "On compte les cases ligne par ligne.",
          `Chaque ligne a ${cols.length} cases (une par couleur). Avec ${lignes.length} lignes : ${lignes.map(() => cols.length).join(" + ")} = ${total}.`,
          `Il faut ${total} cases.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_donnees_completer_tableau_tpl_3",
    niveau: "cp",
    matiere: "maths",
    notionId: "donnees",
    microId: "cp_donnees_completer_tableau",
    difficulty: 5,
    theme: "neutral",
    hint: "Le total de la ligne est connu : enlève les cases que tu connais.",
    tags: ["cp", "donnees", "double_entree", "template", "canvas"],
    generate: () => {
      const { famille, lignes, cols } = doubleEntree(3, 3);
      const grille = lignes.map(() => cols.map(() => randomInt(1, 6)));
      const i = randomInt(0, lignes.length - 1);
      const j = randomInt(0, cols.length - 1);
      const valeur = grille[i][j];
      const totalLigne = grille[i].reduce((s, v) => s + v, 0);
      const quoi = `${lignes[i].nom} ${lignes[i].f ? cols[j].fp : cols[j].mp}`;
      const p = randomChoice(PRENOMS);
      const text = randomChoice([
        `${p} a ${totalLigne} ${lignes[i].nom} en tout. Une case est cachée. Combien ${de(quoi)} ?`,
        `Il y a ${totalLigne} ${lignes[i].nom} en tout. Combien ${de(quoi)} ?`,
        `Pic a renversé de l'eau sur une case ! Il y a ${totalLigne} ${lignes[i].nom}. Combien ${de(quoi)} ?`,
        `${p} range ses ${famille} : ${totalLigne} ${lignes[i].nom} en tout. Combien ${de(quoi)} ?`,
      ]);
      const connus = grille[i].filter((_, k) => k !== j);
      return {
        text,
        format: "short",
        expected: [String(valeur)],
        comparator: "number_equal",
        explanation: exp(
          "Toutes les cases d'une ligne, ensemble, font le total de la ligne.",
          "On additionne les cases connues de la ligne, puis on complète jusqu'au total.",
          `${connus.join(" + ")} = ${connus.reduce((s, v) => s + v, 0)}. Pour aller jusqu'à ${totalLigne}, il manque ${valeur}.`,
          `Il y a ${valeur} ${quoi}.`,
        ),
        canvas: tableau({
          headers: ["", ...cols.map((c) => c.m)],
          rows: lignes.map((l, k) => ({
            values: [l.nom, ...grille[k].map((v, c) => (k === i && c === j ? "?" : v))],
          })),
        }),
      };
    },
  },

  /* =========================================================
     CP_DONNEES_INTERPRETER — le plus, le moins, autant que
  ========================================================= */
  {
    kind: "template",
    id: "cp_donnees_interpreter_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "donnees",
    microId: "cp_donnees_interpreter",
    difficulty: 3,
    theme: "neutral",
    hint: "« Plus que » veut dire davantage, « autant que » veut dire pareil.",
    tags: ["cp", "donnees", "interpreter", "template", "canvas"],
    generate: () => {
      const t = enquete(randomInt(3, 4), 2, 10);
      const [a, b] = shuffle(t.valeurs).slice(0, 2);
      if (Math.random() < 0.25) b.value = a.value;
      const bonne = a.value > b.value ? "plus" : a.value < b.value ? "moins" : "autant";
      const enBarres = randomChoice([true, false]);
      const q = randomChoice([
        `Pour « ${a.label} », y a-t-il plus, moins ou autant de voix que pour « ${b.label} » ?`,
        `Y a-t-il plus, moins ou autant d'enfants pour « ${a.label} » que pour « ${b.label} » ?`,
        `Compare « ${a.label} » et « ${b.label} ». Pour « ${a.label} », il y a plus, moins ou autant de voix ?`,
      ]);
      return {
        text: `${intro(t, enBarres ? "diagramme" : "tableau")} ${q}`,
        format: "qcm",
        choices: shuffle(["plus", "moins", "autant"]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Comparer deux données, c'est dire laquelle est la plus grande, ou si elles sont égales.",
          enBarres ? "On compare la hauteur des deux barres." : "On lit les deux nombres dans le tableau, puis on les compare.",
          `« ${a.label} » : ${a.value}. « ${b.label} » : ${b.value}. ${a.value === b.value ? "Les deux nombres sont égaux." : `${a.value} est ${a.value > b.value ? "plus grand" : "plus petit"} que ${b.value}.`}`,
          `Il y a ${bonne} de voix pour « ${a.label} » que pour « ${b.label} ».`,
        ),
        canvas: enBarres ? barres(t.valeurs) : tableauEnquete(t),
      };
    },
  },
  {
    kind: "template",
    id: "cp_donnees_interpreter_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "donnees",
    microId: "cp_donnees_interpreter",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche l'écart entre les deux nombres : compte de l'un à l'autre.",
    tags: ["cp", "donnees", "interpreter", "template", "canvas"],
    generate: () => {
      const t = enquete(randomInt(3, 4), 1, 12, true);
      const [x, y] = shuffle(t.valeurs).slice(0, 2);
      const haut = x.value > y.value ? x : y;
      const bas = x.value > y.value ? y : x;
      const ecart = haut.value - bas.value;
      const enBarres = randomChoice([true, false]);
      const q = randomChoice([
        `Combien d'enfants de plus ont choisi « ${haut.label} » que « ${bas.label} » ?`,
        `« ${maj(haut.label)} » a combien de voix de plus que « ${bas.label} » ?`,
        `Combien de voix de moins pour « ${bas.label} » que pour « ${haut.label} » ?`,
      ]);
      return {
        text: `${intro(t, enBarres ? "diagramme" : "tableau")} ${q}`,
        format: "short",
        expected: [String(ecart)],
        comparator: "number_equal",
        explanation: exp(
          "Comparer deux données chiffrées, c'est trouver leur écart.",
          "On lit les deux nombres, puis on compte du plus petit au plus grand.",
          `« ${haut.label} » : ${haut.value}. « ${bas.label} » : ${bas.value}. ${haut.value} - ${bas.value} = ${ecart}.`,
          `Il y a ${ecart} voix d'écart.`,
        ),
        canvas: enBarres ? barres(t.valeurs) : tableauEnquete(t),
      };
    },
  },
  {
    kind: "fixed",
    id: "cp_donnees_interpreter_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "donnees",
    microId: "cp_donnees_interpreter",
    difficulty: 3,
    theme: "neutral",
    text: "Que veut dire « il y a autant de chats que de chiens » ?",
    format: "qcm",
    choices: [
      "il y en a exactement le même nombre",
      "il y a plus de chats",
      "il y a plus de chiens",
      "il n'y a ni chat ni chien",
    ],
    expected: ["il y en a exactement le même nombre"],
    comparator: "mcq_exact",
    hint: "« Autant » va avec le signe =.",
    explanation: exp(
      "« Autant que » veut dire « le même nombre ».",
      "On compare les deux nombres du tableau.",
      "Si les deux barres ont la même hauteur, ou si les deux lignes du tableau portent le même nombre, il y a autant de chats que de chiens.",
      "Cela veut dire qu'il y en a exactement le même nombre.",
    ),
    tags: ["cp", "donnees", "interpreter", "lexique", "qcm"],
  },

  /* =========================================================
     CP_DONNEES_DEFI — l'enquête entière, du recueil à la lecture
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_donnees_defi_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "donnees",
    microId: "cp_donnees_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Les 24 élèves de la classe ont tous répondu. On compte 4 oranges, 12 fraises et 6 bananes. Combien d'élèves ont choisi un autre fruit ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Le total des réponses doit faire 24.",
    explanation: exp(
      "Quand tout le monde répond, la somme des réponses est égale au nombre de personnes interrogées.",
      "On additionne les réponses connues, puis on complète jusqu'au total.",
      "4 + 12 + 6 = 22 réponses connues. Il y a 24 élèves : 24 - 22 = 2.",
      "2 élèves ont choisi un autre fruit.",
    ),
    tags: ["cp", "donnees", "defi", "piege"],
  },
  {
    kind: "template",
    id: "cp_donnees_defi_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "donnees",
    microId: "cp_donnees_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Toutes les lignes ensemble doivent faire le nombre d'enfants.",
    tags: ["cp", "donnees", "defi", "template", "canvas"],
    generate: () => {
      const t = enquete(4, 1, 8);
      const k = randomInt(0, t.valeurs.length - 1);
      const manquant = t.valeurs[k];
      const total = t.valeurs.reduce((s, v) => s + v.value, 0);
      const connus = t.valeurs.filter((_, i) => i !== k).map((v) => v.value);
      const debut = randomChoice([
        `Les ${total} enfants de la classe ${de(t.p)} ont tous répondu.`,
        `${t.lieu}, ${total} enfants ont tous répondu à l'enquête.`,
        `Pic a interrogé ${total} enfants. Tous ont répondu.`,
        `${t.p} a posé sa question à ${total} enfants. Tous ont répondu.`,
      ]);
      const q = randomChoice([
        `Combien ont répondu « ${manquant.label} » ?`,
        `Une case est effacée. Combien pour « ${manquant.label} » ?`,
        `Trouve le nombre caché.`,
      ]);
      return {
        text: `${debut} ${q}`,
        format: "short",
        expected: [String(manquant.value)],
        comparator: "number_equal",
        explanation: exp(
          "Quand tout le monde répond, la somme des réponses est égale au nombre d'enfants.",
          "On additionne les nombres connus, puis on complète jusqu'au total.",
          `${connus.join(" + ")} = ${total - manquant.value}. Pour aller jusqu'à ${total}, il manque ${manquant.value}.`,
          `${manquant.value} enfants ont répondu « ${manquant.label} ».`,
        ),
        canvas: tableau({
          headers: [t.e.entete, "Enfants"],
          rows: t.valeurs.map((v, i) => ({ values: [v.label, i === k ? "?" : v.value] })),
        }),
      };
    },
  },
  {
    kind: "template",
    id: "cp_donnees_defi_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "donnees",
    microId: "cp_donnees_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Chaque enfant donne une seule réponse : additionne tout et compare au nombre d'enfants.",
    tags: ["cp", "donnees", "defi", "piege", "template", "canvas"],
    generate: () => {
      const t = enquete(3, 2, 8);
      const somme = t.valeurs.reduce((s, v) => s + v.value, 0);
      const juste = randomChoice([true, false]);
      const enfants = juste ? somme : somme - randomInt(1, 4);
      const debut = randomChoice([
        `Il y a ${enfants} enfants dans le groupe ${de(t.p)}.`,
        `${t.lieu}, il y a ${enfants} enfants.`,
        `${t.p} interroge ${enfants} enfants.`,
        `Pic interroge les ${enfants} enfants du club.`,
      ]);
      const q = randomChoice([
        "Chacun donne une seule réponse. Ce tableau peut-il être juste ?",
        "Chaque enfant répond une fois. Le tableau est-il possible ?",
        "Une seule réponse par enfant. Ce tableau peut-il être vrai ?",
      ]);
      const bonne = juste ? "oui" : "non";
      return {
        text: `${debut} ${q}`,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Chaque enfant donne une seule réponse : il ne peut pas y avoir plus de réponses que d'enfants.",
          "On additionne toutes les réponses du tableau, puis on compare au nombre d'enfants.",
          `${t.valeurs.map((v) => v.value).join(" + ")} = ${somme}. ${juste ? `C'est bien le nombre d'enfants, ${enfants}.` : `C'est plus que ${enfants} enfants : il y a une erreur.`}`,
          juste ? "Oui, le tableau peut être juste." : "Non, le tableau ne peut pas être juste.",
        ),
        canvas: tableauEnquete(t),
      };
    },
  },
];
