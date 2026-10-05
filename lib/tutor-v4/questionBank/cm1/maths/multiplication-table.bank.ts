// lib/tutor-v4/question-banks/maths/cm1/tables-multiplication.bank.ts

import type {
  DifficultyLevel,
  TutorBankItemV4,
  TutorGeneratedQuestionV4,
  TableauDonneesCanvasData,
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

function exp(
  definition: string,
  methode: string,
  calcul: string,
  conclusion: string
) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

function tableCanvas(data: {
  table: number;
  multiplicateur?: number;
  title?: string;
  questionLabel?: string;
}): TableauDonneesCanvasData {
  const rows = Array.from({ length: 10 }, (_, index) => {
    const k = index + 1;
    return {
      label: `${data.table} × ${k}`,
      values: [
        k === data.multiplicateur ? "?" : data.table * k,
      ],
    };
  });

  return {
    kind: "tableau_donnees",
    title: data.title ?? `Table de ${data.table}`,
    headers: ["Calcul", "Résultat"],
    rows,
    highlight:
      data.multiplicateur !== undefined
        ? { row: data.multiplicateur - 1, col: 1 }
        : undefined,
    questionLabel:
      data.questionLabel ??
      "Observe la table et retrouve le résultat manquant.",
    display: {
      compact: true,
      striped: true,
    },
  };
}

function miniTableCanvas(data: {
  table: number;
  multiplicateurs: number[];
  missing: number;
  title?: string;
  questionLabel?: string;
}): TableauDonneesCanvasData {
  return {
    kind: "tableau_donnees",
    title: data.title ?? `Mini-table de ${data.table}`,
    headers: ["Calcul", "Résultat"],
    rows: data.multiplicateurs.map((k) => ({
      label: `${data.table} × ${k}`,
      values: [k === data.missing ? "?" : data.table * k],
    })),
    highlight: {
      row: data.multiplicateurs.indexOf(data.missing),
      col: 1,
    },
    questionLabel:
      data.questionLabel ??
      "Complète la case manquante sans afficher directement la réponse.",
    display: {
      compact: true,
      striped: true,
    },
  };
}

// ============================================================
// LE RÉSERVOIR PARTAGÉ DES TABLES (05/10/2026)
// ============================================================
// ⛔ POURQUOI. Ces micros sont révisées par des 6e en remédiation. Mesuré le
// 05/10 avec scripts/mesurer-squelettes-coach.ts : 4 à 8 SQUELETTES d'énoncés
// par micro, 14 à 19 répétitions sur 20 questions. L'élève reconnaît la PHRASE,
// pas les nombres : « Calcule : 7 × 4 » et « Calcule : 7 × 9 » sont pour lui
// la même question. Chaque gabarit tire donc une TOURNURE (et souvent une
// situation, un prénom) en plus des nombres.
//
// ⭐ Les neuf micros table_N se ressemblent : au lieu de copier-coller, une
// FAMILLE de questions est écrite une fois, paramétrée par (a, b) — a la table,
// b le multiplicateur — et `gabaritsFamilles` l'installe dans chaque micro,
// à chaque étoile. Les ids anciens sont gardés ; leurs `generate` appellent les
// mêmes familles.

const PRENOMS = [
  "Léa", "Hugo", "Inès", "Malik", "Chloé", "Yanis", "Jade", "Noah",
  "Sofia", "Lucas", "Aya", "Tom", "Emma", "Adam", "Lina", "Nathan",
  "Zoé", "Ilyes", "Manon", "Kenji", "Maëlys", "Enzo", "Nora", "Sacha",
] as const;

function prenom() {
  return randomChoice(PRENOMS);
}

function deuxPrenoms(): [string, string] {
  const p = prenom();
  let q = prenom();
  while (q === p) q = prenom();
  return [p, q];
}

function maj(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** « de crayons », mais « d’œufs », « d’élèves ». */
function de(mot: string) {
  return /^[aeiouyàâéèêîïôœ]/i.test(mot) ? `d’${mot}` : `de ${mot}`;
}

/** Quatre propositions numériques distinctes, la bonne incluse. */
function choixNombres(correct: number, pieges: number[]) {
  return makeChoices(
    String(correct),
    pieges
      .filter((x) => Number.isInteger(x) && x > 0 && x !== correct)
      .map(String),
  );
}

/** a, 2a, 3a… jusqu'à a × n. */
function suiteTable(a: number, n: number) {
  return Array.from({ length: n }, (_, i) => a * (i + 1)).join(", ");
}

/** La stratégie de classe pour t × k, t étant la table. */
function astuce(t: number, k: number) {
  const r = t * k;
  switch (t) {
    case 2:
      return `${t} × ${k}, c’est le double de ${k} : ${k} + ${k} = ${r}.`;
    case 3:
      return `${t} × ${k}, c’est ${k} + ${k} + ${k} = ${r}.`;
    case 4:
      return `${t} × ${k}, c’est le double du double : ${k} × 2 = ${2 * k}, puis ${2 * k} × 2 = ${r}.`;
    case 5:
      return `${t} × ${k}, c’est la moitié de 10 × ${k} : 10 × ${k} = ${10 * k}, et la moitié de ${10 * k} est ${r}.`;
    case 6:
      return `${t} × ${k}, c’est 5 × ${k} plus encore ${k} : ${5 * k} + ${k} = ${r}.`;
    case 7:
      return `${t} × ${k}, c’est 5 × ${k} plus 2 × ${k} : ${5 * k} + ${2 * k} = ${r}.`;
    case 8:
      return `${t} × ${k}, c’est trois doubles de suite : ${k}, puis ${2 * k}, puis ${4 * k}, puis ${r}.`;
    case 9:
      return `${t} × ${k}, c’est 10 × ${k} moins ${k} : ${10 * k} - ${k} = ${r}.`;
    case 10:
      return `${t} × ${k}, c’est ${k} dizaines, donc ${r}.`;
    default:
      return `On récite la table de ${t} : ${suiteTable(t, k)}.`;
  }
}

/** Pour un produit quelconque, on part de la table la plus facile des deux. */
function astuceProduit(a: number, b: number) {
  const ordre = [10, 2, 5, 9, 4, 3, 6, 8, 7];
  const t = ordre.find((x) => x === a || x === b);
  if (t === undefined) return astuce(a, b);
  return astuce(t, t === a ? b : a);
}

/** « a × b = b × a = r », ou « a × a = r ». */
function egalite(a: number, b: number) {
  return a === b
    ? `${a} × ${b} = ${a * b}`
    : `${a} × ${b} = ${b} × ${a} = ${a * b}`;
}

function voisinsDe(k: number) {
  return [k - 2, k - 1, k, k + 1, k + 2]
    .map((v) => Math.min(10, Math.max(1, v)))
    .filter((v, i, arr) => arr.indexOf(v) === i)
    .sort((x, y) => x - y);
}

type Question = TutorGeneratedQuestionV4;

// ------------------------------------------------------------
// Les situations de groupes égaux (aucune réunionnaise ici : les décors
// réunionnais restent dans leurs gabarits d'origine).
// `groupesDe` : « 7 boîtes de 4 crayons » se dit naturellement.
// ------------------------------------------------------------

type Situation = {
  lieu: string;
  groupes: string;
  objets: string;
  dansChaque: string;
  groupesDe: boolean;
};

const SITUATIONS: Situation[] = [
  { lieu: "Dans la classe", groupes: "boîtes", objets: "crayons", dansChaque: "dans chaque boîte", groupesDe: true },
  { lieu: "À la cantine", groupes: "tables", objets: "élèves", dansChaque: "autour de chaque table", groupesDe: true },
  { lieu: "Au tournoi de football", groupes: "équipes", objets: "joueurs", dansChaque: "dans chaque équipe", groupesDe: true },
  { lieu: "Dans la cuisine", groupes: "plaques", objets: "cookies", dansChaque: "sur chaque plaque", groupesDe: true },
  { lieu: "Au jardin", groupes: "rangées", objets: "salades", dansChaque: "dans chaque rangée", groupesDe: true },
  { lieu: "Au supermarché", groupes: "paquets", objets: "yaourts", dansChaque: "dans chaque paquet", groupesDe: true },
  { lieu: "À la bibliothèque", groupes: "étagères", objets: "livres", dansChaque: "sur chaque étagère", groupesDe: true },
  { lieu: "Au poulailler", groupes: "boîtes", objets: "œufs", dansChaque: "dans chaque boîte", groupesDe: true },
  { lieu: "À la fête de l’école", groupes: "tables", objets: "gâteaux", dansChaque: "sur chaque table", groupesDe: false },
  { lieu: "Au cinéma", groupes: "rangées", objets: "fauteuils", dansChaque: "dans chaque rangée", groupesDe: true },
  { lieu: "Pour la sortie scolaire", groupes: "minibus", objets: "élèves", dansChaque: "dans chaque minibus", groupesDe: true },
  { lieu: "Chez le primeur", groupes: "cagettes", objets: "mangues", dansChaque: "dans chaque cagette", groupesDe: true },
  { lieu: "À la piscine", groupes: "couloirs", objets: "nageurs", dansChaque: "dans chaque couloir", groupesDe: true },
  { lieu: "À la papeterie", groupes: "lots", objets: "cahiers", dansChaque: "dans chaque lot", groupesDe: true },
  { lieu: "À la boulangerie", groupes: "plateaux", objets: "croissants", dansChaque: "sur chaque plateau", groupesDe: true },
  { lieu: "À l’aquarium", groupes: "bassins", objets: "poissons", dansChaque: "dans chaque bassin", groupesDe: false },
  { lieu: "Chez le fleuriste", groupes: "bouquets", objets: "roses", dansChaque: "dans chaque bouquet", groupesDe: true },
  { lieu: "Au parking du stade", groupes: "rangées", objets: "voitures", dansChaque: "dans chaque rangée", groupesDe: true },
  { lieu: "À l’atelier couture", groupes: "gilets", objets: "boutons", dansChaque: "sur chaque gilet", groupesDe: false },
  { lieu: "Pour le cross du collège", groupes: "groupes", objets: "coureurs", dansChaque: "dans chaque groupe", groupesDe: true },
];

/** Les décors réunionnais d'origine (un par gabarit « reunion »). */
const DECORS = {
  margouillats: { lieu: "Autour de la case", groupes: "murs", objets: "margouillats", dansChaque: "sur chaque mur", groupesDe: false },
  vanille: { lieu: "Chez l’artisan vanillier", groupes: "sachets", objets: "gousses de vanille", dansChaque: "dans chaque sachet", groupesDe: true },
  balises: { lieu: "Sur le sentier du volcan", groupes: "zones", objets: "balises", dansChaque: "dans chaque zone", groupesDe: false },
  sachetsFruits: { lieu: "Au marché de Saint-Pierre", groupes: "sachets", objets: "fruits", dansChaque: "dans chaque sachet", groupesDe: true },
  paniersFruits: { lieu: "Au marché de Saint-Pierre", groupes: "paniers", objets: "fruits", dansChaque: "dans chaque panier", groupesDe: true },
  cartonsFruits: { lieu: "Au marché de Saint-Pierre", groupes: "cartons", objets: "fruits", dansChaque: "dans chaque carton", groupesDe: true },
  bouteilles: { lieu: "Pour une sortie nature", groupes: "équipes", objets: "bouteilles d’eau", dansChaque: "pour chaque équipe", groupesDe: false },
  plots: { lieu: "Pour une activité sportive", groupes: "équipes", objets: "plots", dansChaque: "pour chaque équipe", groupesDe: false },
} satisfies Record<string, Situation>;

// ------------------------------------------------------------
// Les situations « par unité » : un prix, une durée, des points…
// `inverse` pose la question par l'autre bout (on cherche le nombre d'unités).
// ------------------------------------------------------------

type Taux = {
  regle: (n: number, p: string) => string;
  question: (k: number) => string;
  reponse: (k: number, r: number) => string;
  inverse: (r: number) => string;
  reponseInverse: (k: number) => string;
};

const TAUX: Taux[] = [
  {
    regle: (n) => `Un cahier coûte ${n} €.`,
    question: (k) => `Combien coûtent ${k} cahiers, en euros ?`,
    reponse: (k, r) => `${k} cahiers coûtent ${r} €.`,
    inverse: (r) => `Combien de cahiers peut-on acheter avec ${r} € ?`,
    reponseInverse: (k) => `On peut acheter ${k} cahiers.`,
  },
  {
    regle: (n) => `Une place de cinéma coûte ${n} €.`,
    question: (k) => `Quel est le prix de ${k} places, en euros ?`,
    reponse: (k, r) => `${k} places coûtent ${r} €.`,
    inverse: (r) => `Un groupe paie ${r} € en tout. Combien de places a-t-il achetées ?`,
    reponseInverse: (k) => `Le groupe a acheté ${k} places.`,
  },
  {
    regle: (n) => `Un épisode de dessin animé dure ${n} minutes.`,
    question: (k) => `Combien de minutes durent ${k} épisodes à la suite ?`,
    reponse: (k, r) => `${k} épisodes durent ${r} minutes.`,
    inverse: (r) => `On en regarde pendant ${r} minutes, sans pause. Combien d’épisodes a-t-on vus ?`,
    reponseInverse: (k) => `On a vu ${k} épisodes.`,
  },
  {
    regle: (n) => `Au quiz de la classe, chaque bonne réponse rapporte ${n} points.`,
    question: (k) => `Combien de points marque-t-on avec ${k} bonnes réponses ?`,
    reponse: (k, r) => `Avec ${k} bonnes réponses, on marque ${r} points.`,
    inverse: (r) => `Combien faut-il de bonnes réponses pour marquer ${r} points ?`,
    reponseInverse: (k) => `Il faut ${k} bonnes réponses.`,
  },
  {
    regle: (n, p) => `Chaque jour, ${p} lit ${n} pages de son roman.`,
    question: (k) => `Combien de pages sont lues en ${k} jours ?`,
    reponse: (k, r) => `En ${k} jours, ${r} pages sont lues.`,
    inverse: (r) => `Le roman a ${r} pages. Combien de jours faut-il pour le finir ?`,
    reponseInverse: (k) => `Il faut ${k} jours.`,
  },
  {
    regle: (n, p) => `Chaque semaine, ${p} met ${n} € dans sa tirelire, vide au départ.`,
    question: (k) => `Combien d’euros contient la tirelire au bout de ${k} semaines ?`,
    reponse: (k, r) => `Au bout de ${k} semaines, la tirelire contient ${r} €.`,
    inverse: (r) => `Au bout de combien de semaines la tirelire contient-elle ${r} € ?`,
    reponseInverse: (k) => `Au bout de ${k} semaines.`,
  },
  {
    regle: (n) => `Chaque jour, on verse ${n} litres d’eau sur le potager.`,
    question: (k) => `Combien de litres verse-t-on en ${k} jours ?`,
    reponse: (k, r) => `En ${k} jours, on verse ${r} litres.`,
    inverse: (r) => `On a versé ${r} litres en tout. Pendant combien de jours a-t-on arrosé ?`,
    reponseInverse: (k) => `On a arrosé pendant ${k} jours.`,
  },
  {
    regle: (n) => `Un tour de manège coûte ${n} jetons.`,
    question: (k) => `Combien de jetons faut-il pour faire ${k} tours ?`,
    reponse: (k, r) => `Pour ${k} tours, il faut ${r} jetons.`,
    inverse: (r) => `Avec ${r} jetons, combien de tours peut-on faire ?`,
    reponseInverse: (k) => `On peut faire ${k} tours.`,
  },
  {
    regle: (n, p) => `Chaque dimanche, ${p} fait ${n} km à vélo.`,
    question: (k) => `Combien de kilomètres cela fait-il en ${k} dimanches ?`,
    reponse: (k, r) => `En ${k} dimanches, cela fait ${r} km.`,
    inverse: (r) => `Combien de dimanches faut-il pour parcourir ${r} km ?`,
    reponseInverse: (k) => `Il faut ${k} dimanches.`,
  },
  {
    regle: (n) => `Une pochette contient ${n} autocollants.`,
    question: (k) => `Combien d’autocollants y a-t-il dans ${k} pochettes ?`,
    reponse: (k, r) => `Dans ${k} pochettes, il y a ${r} autocollants.`,
    inverse: (r) => `Combien de pochettes faut-il pour avoir ${r} autocollants ?`,
    reponseInverse: (k) => `Il faut ${k} pochettes.`,
  },
  {
    regle: (n) => `Un kilo de cerises coûte ${n} €.`,
    question: (k) => `Combien coûtent ${k} kilos de cerises, en euros ?`,
    reponse: (k, r) => `${k} kilos de cerises coûtent ${r} €.`,
    inverse: (r) => `Avec ${r} €, combien de kilos de cerises peut-on acheter ?`,
    reponseInverse: (k) => `On peut acheter ${k} kilos.`,
  },
  {
    regle: (n) => `Dans un relais, chaque coureur fait ${n} tours de piste.`,
    question: (k) => `Combien de tours font ${k} coureurs en tout ?`,
    reponse: (k, r) => `${k} coureurs font ${r} tours.`,
    inverse: (r) => `L’équipe a fait ${r} tours en tout. Combien y a-t-il de coureurs ?`,
    reponseInverse: (k) => `Il y a ${k} coureurs.`,
  },
  {
    regle: (n) => `Une fournée de biscuits cuit pendant ${n} minutes.`,
    question: (k) => `Combien de minutes faut-il pour ${k} fournées, l’une après l’autre ?`,
    reponse: (k, r) => `Pour ${k} fournées, il faut ${r} minutes.`,
    inverse: (r) => `Le four a tourné ${r} minutes, une fournée après l’autre. Combien de fournées a-t-on cuites ?`,
    reponseInverse: (k) => `On a cuit ${k} fournées.`,
  },
  {
    regle: (n) => `Une boîte de feutres coûte ${n} €.`,
    question: (k) => `Quel est le prix de ${k} boîtes, en euros ?`,
    reponse: (k, r) => `${k} boîtes coûtent ${r} €.`,
    inverse: (r) => `La maîtresse dépense ${r} € en boîtes de feutres. Combien en achète-t-elle ?`,
    reponseInverse: (k) => `Elle en achète ${k}.`,
  },
];

const TAUX_JEUX: Taux[] = [
  {
    regle: (n) => `Dans un jeu vidéo, chaque niveau réussi rapporte ${n} pièces.`,
    question: (k) => `Combien de pièces gagnes-tu en réussissant ${k} niveaux ?`,
    reponse: (k, r) => `En ${k} niveaux, tu gagnes ${r} pièces.`,
    inverse: (r) => `Combien de niveaux faut-il réussir pour gagner ${r} pièces ?`,
    reponseInverse: (k) => `Il faut réussir ${k} niveaux.`,
  },
  {
    regle: (n) => `Dans un jeu vidéo, chaque mission terminée donne ${n} étoiles.`,
    question: (k) => `Combien d’étoiles obtiens-tu après ${k} missions ?`,
    reponse: (k, r) => `Après ${k} missions, tu as ${r} étoiles.`,
    inverse: (r) => `Combien de missions faut-il terminer pour avoir ${r} étoiles ?`,
    reponseInverse: (k) => `Il faut terminer ${k} missions.`,
  },
  {
    regle: (n) => `Dans un jeu vidéo, chaque coffre ouvert contient ${n} pièces.`,
    question: (k) => `Combien de pièces récupères-tu en ouvrant ${k} coffres ?`,
    reponse: (k, r) => `En ouvrant ${k} coffres, tu récupères ${r} pièces.`,
    inverse: (r) => `Combien de coffres faut-il ouvrir pour récupérer ${r} pièces ?`,
    reponseInverse: (k) => `Il faut ouvrir ${k} coffres.`,
  },
];

/** Des articles pour les défis d'achat (« à 7 € pièce » évite l'accord). */
const ARTICLES = [
  "cahiers", "livres de poche", "places de cinéma", "ballons", "classeurs",
  "jeux de cartes", "t-shirts", "boîtes de feutres", "tickets de piscine",
  "puzzles", "gourdes", "kilos de pommes",
];

/** Des collections à comparer (« 6 paquets de 7 cartes »). */
const COLLECTIONS: [string, string][] = [
  ["paquets", "cartes"], ["sachets", "billes"], ["boîtes", "crayons"],
  ["pochettes", "autocollants"], ["sachets", "bonbons"], ["boîtes", "perles"],
  ["albums", "photos"], ["planches", "timbres"],
];

// ------------------------------------------------------------
// LES FAMILLES. Chacune reçoit (a, b) : a la table, b le multiplicateur.
// ------------------------------------------------------------

/** Le produit, posé de douze façons. */
function genProduit(a: number, b: number, avecCanvas = false): Question {
  const r = a * b;
  const p = prenom();
  const tournures = [
    `Calcule : ${a} × ${b}`,
    `Combien font ${a} × ${b} ?`,
    `Quel est le produit de ${a} par ${b} ?`,
    `${a} fois ${b}, cela fait combien ?`,
    `Complète : ${a} × ${b} = …`,
    `Combien font ${b} fois ${a} ?`,
    `Écris le résultat de ${b} × ${a}.`,
    `Multiplie ${a} par ${b}. Quel nombre obtiens-tu ?`,
    `Aide ${p} : combien font ${a} × ${b} ?`,
    `${p} récite la table de ${a}. Que vaut ${a} × ${b} ?`,
    `Quel nombre obtient-on en ajoutant ${b} fois le nombre ${a} ?`,
    `Calcule avec une multiplication : ${Array(b).fill(a).join(" + ")}`,
  ];
  if (b >= 4) {
    tournures.push(
      `On compte de ${a} en ${a} à partir de 0 : ${a}, ${2 * a}, ${3 * a}… Quel est le ${b}e nombre de la liste ?`,
    );
  }
  return {
    text: randomChoice(tournures),
    format: "short",
    expected: [String(r)],
    comparator: "number_equal",
    explanation: exp(
      `Multiplier ${a} par ${b}, c’est ajouter ${b} fois le nombre ${a}.`,
      astuceProduit(a, b),
      `${egalite(a, b)}.`,
      `La réponse est ${r}.`,
    ),
    canvas: avecCanvas
      ? miniTableCanvas({
          table: a,
          multiplicateurs: voisinsDe(b),
          missing: b,
          title: `Table de ${a}`,
          questionLabel: `Le résultat de ${a} × ${b} est caché.`,
        })
      : undefined,
  };
}

/** Le produit en QCM : pièges d'une ligne à côté, de l'addition, de ± 1. */
function genProduitQcm(a: number, b: number): Question {
  const r = a * b;
  const p = prenom();
  const tournures = [
    `Quel est le résultat de ${a} × ${b} ?`,
    `Choisis le bon résultat : ${a} × ${b} = ?`,
    `${p} doit calculer ${a} × ${b}. Quelle réponse est juste ?`,
    `Combien font ${b} fois ${a} ?`,
    `Quel nombre est égal à ${b} × ${a} ?`,
    `Dans la table de ${a}, que vaut ${a} × ${b} ?`,
  ];
  return {
    text: randomChoice(tournures),
    format: "qcm",
    choices: choixNombres(r, [r + a, r - a, a + b, r + 1, r - 1, r + 10]),
    expected: [String(r)],
    comparator: "mcq_exact",
    explanation: exp(
      `Multiplier ${a} par ${b}, c’est ajouter ${b} fois le nombre ${a}.`,
      astuceProduit(a, b),
      `${egalite(a, b)}.`,
      `La bonne réponse est ${r}.`,
    ),
  };
}

/** Le facteur manquant. `cote` : où se trouve le trou. */
function genFacteur(a: number, b: number, cote: "droite" | "gauche" | "tous" = "tous"): Question {
  const r = a * b;
  const p = prenom();
  const droite = [
    `Complète : ${a} × ? = ${r}`,
    `Par quel nombre faut-il multiplier ${a} pour obtenir ${r} ?`,
    `${r}, c’est ${a} fois combien ?`,
    `Trouve le nombre manquant : ${r} = ${a} × ?`,
    `${p} cherche le nombre qui manque dans ${a} × … = ${r}. Quel est ce nombre ?`,
  ];
  const gauche = [
    `Complète : ? × ${a} = ${r}`,
    `Quel nombre, multiplié par ${a}, donne ${r} ?`,
    `Combien de fois faut-il ${a} pour faire ${r} ?`,
    `Je pense à un nombre. Je le multiplie par ${a} et je trouve ${r}. Quel est ce nombre ?`,
    `${p} a multiplié un nombre par ${a} et a trouvé ${r}. Quel était ce nombre ?`,
    `En comptant de ${a} en ${a} à partir de 0, combien de bonds faut-il pour arriver à ${r} ?`,
  ];
  const tournures = cote === "droite" ? droite : cote === "gauche" ? gauche : [...droite, ...gauche];
  return {
    text: randomChoice(tournures),
    format: "short",
    expected: [String(b)],
    comparator: "number_equal",
    explanation: exp(
      "Chercher un facteur manquant, c’est retrouver la bonne ligne d’une table.",
      `On récite la table de ${a} jusqu’à ${r} : ${suiteTable(a, b)}.`,
      `${a} × ${b} = ${r}.`,
      `Le nombre cherché est ${b}.`,
    ),
  };
}

/** Le facteur manquant en QCM. */
function genFacteurQcm(a: number, b: number): Question {
  const r = a * b;
  const p = prenom();
  const tournures = [
    `Quel nombre complète : ${a} × ? = ${r} ?`,
    `Quel nombre manque : ? × ${a} = ${r} ?`,
    `${p} veut obtenir ${r} en multipliant ${a} par un nombre. Lequel ?`,
    `${r} est dans la table de ${a}. C’est ${a} fois combien ?`,
    `Combien de fois ${a} y a-t-il dans ${r} ?`,
  ];
  return {
    text: randomChoice(tournures),
    format: "qcm",
    choices: choixNombres(b, [b + 1, b - 1, b + 2, b - 2, a, 10]),
    expected: [String(b)],
    comparator: "mcq_exact",
    explanation: exp(
      "Chercher un facteur manquant, c’est retrouver la bonne ligne d’une table.",
      `On récite la table de ${a} jusqu’à ${r} : ${suiteTable(a, b)}.`,
      `${a} × ${b} = ${r}.`,
      `Le nombre cherché est ${b}.`,
    ),
  };
}

/** Quelqu'un affirme une égalité, juste ou fausse : l'élève tranche. */
function genAffirmation(a: number, b: number): Question {
  const r = a * b;
  const p = prenom();
  // Dédupliqué : pour la table de 2, r + a et r + 2 coïncident.
  const faux = Array.from(new Set([r + a, r - a, r + 1, r - 1, r + 2, r + 10, r - 10])).filter(
    (x) => x > 0 && x !== r,
  );
  const juste = Math.random() < 0.35;
  const annonce = juste ? r : randomChoice(faux);
  const tournures = [
    `${p} affirme que ${a} × ${b} = ${annonce}. Qu’en penses-tu ?`,
    `Sur son cahier, ${p} a écrit : ${a} × ${b} = ${annonce}. Que lui dis-tu ?`,
    `Au tableau, on lit : ${a} × ${b} = ${annonce}. Est-ce juste ?`,
    `${p} récite : « ${a} fois ${b}, ${annonce} ». Qu’en penses-tu ?`,
    `Vrai ou faux : ${a} × ${b} = ${annonce} ?`,
  ];
  const bonne = juste ? "C’est juste." : `C’est faux : ${a} × ${b} = ${r}.`;
  const autres = faux
    .filter((x) => x !== annonce)
    .map((x) => `C’est faux : ${a} × ${b} = ${x}.`);
  // Quand l'égalité est fausse, « C’est juste. » est TOUJOURS proposé : c'est
  // le piège de l'élève qui ne recalcule pas.
  const choices = juste
    ? makeChoices(bonne, autres)
    : shuffle([bonne, "C’est juste.", ...shuffle(autres).slice(0, 2)]);
  return {
    text: randomChoice(tournures),
    format: "qcm",
    choices,
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: exp(
      "Pour vérifier une égalité, on recalcule le produit.",
      astuceProduit(a, b),
      juste ? `${a} × ${b} = ${r}.` : `${a} × ${b} = ${r}, et non ${annonce}.`,
      juste ? "L’égalité est juste." : `L’égalité est fausse : le bon résultat est ${r}.`,
    ),
  };
}

/** Reconnaître un résultat de la table parmi des nombres qui n'y sont pas. */
function genMultiple(a: number, b: number): Question {
  const r = a * b;
  const p = prenom();
  const pieges: number[] = [];
  for (let x = Math.max(3, r - 2 * a); x <= r + 2 * a; x++) {
    if (x % a !== 0) pieges.push(x);
  }
  const tournures = [
    `Lequel de ces nombres est dans la table de ${a} ?`,
    `Un seul de ces nombres est un résultat de la table de ${a}. Lequel ?`,
    `Quel nombre peut-on entendre quand ${p} récite la table de ${a} ?`,
    // ⛔ Pas « multiple » ici : cette famille est servie au palier découverte (★1-2).
    // Frédéric, 05/10/2026 : le mot reste « pour les plus forts » (intrus,
    // devinettes), pas pour l'élève fragile.
    `Lequel de ces nombres se trouve dans la table de ${a} ?`,
    `En comptant de ${a} en ${a} à partir de 0, sur lequel de ces nombres tombe-t-on ?`,
  ];
  return {
    text: randomChoice(tournures),
    format: "qcm",
    choices: choixNombres(r, pieges),
    expected: [String(r)],
    comparator: "mcq_exact",
    explanation: exp(
      `Les résultats de la table de ${a} s’obtiennent en comptant de ${a} en ${a}.`,
      `On récite la table : ${suiteTable(a, b)}…`,
      `${r} = ${a} × ${b}.`,
      `${r} est dans la table de ${a}.`,
    ),
  };
}

/** L'intrus : le seul nombre qui N'est PAS dans la table. */
function genIntrus(a: number, b: number): Question {
  const p = prenom();
  const horsTable: number[] = [];
  for (let x = a + 1; x < 10 * a; x++) if (x % a !== 0) horsTable.push(x);
  const x = randomChoice(horsTable);
  const q = Math.floor(x / a);
  const ks = shuffle([2, 3, 4, 5, 6, 7, 8, 9, 10].filter((k) => k !== b)).slice(0, 2);
  const multiples = [b, ...ks].map((k) => a * k);
  const tournures = [
    `Lequel de ces nombres n’est PAS dans la table de ${a} ?`,
    `Trouve l’intrus : trois de ces nombres sont dans la table de ${a}, un seul n’y est pas.`,
    `${p} récite la table de ${a}. Quel nombre ne peut-on pas entendre ?`,
    // « Multiple » pour les plus forts seulement (Frédéric, 05/10/2026) : les
    // tables de 2 et de 10 servent l'intrus dès ★2, les autres à ★3.
    ...(a === 2 || a === 10 ? [] : [`Quel nombre n’est pas un multiple de ${a} ?`]),
  ];
  return {
    text: randomChoice(tournures),
    format: "qcm",
    choices: makeChoices(String(x), multiples.map(String)),
    expected: [String(x)],
    comparator: "mcq_exact",
    explanation: exp(
      `Un nombre est dans la table de ${a} s’il s’écrit ${a} × un nombre entier.`,
      `On vérifie chaque proposition : ${[b, ...ks].map((k) => `${a * k} = ${a} × ${k}`).join(", ")}.`,
      `${a} × ${q} = ${a * q} et ${a} × ${q + 1} = ${a * (q + 1)} : ${x} tombe entre les deux.`,
      `L’intrus est ${x}.`,
    ),
  };
}

/** Choisir la multiplication qui donne un résultat. */
function genChoisirCalcul(a: number, b: number): Question {
  const r = a * b;
  const p = prenom();
  const bonne = `${a} × ${b}`;
  const pieges = [
    [a, b + 1], [a, b - 1], [a + 1, b], [a - 1, b], [a, b + 2],
  ]
    .filter(([x, y]) => x >= 2 && y >= 2 && x <= 10 && y <= 10 && x * y !== r)
    .map(([x, y]) => `${x} × ${y}`);
  if (a + b !== r) pieges.push(`${a} + ${b}`);
  const tournures = [
    `Quel calcul donne ${r} ?`,
    `Quelle multiplication a pour résultat ${r} ?`,
    `${p} cherche un calcul qui fait ${r}. Lequel convient ?`,
    `Dans la table de ${a}, quelle ligne donne ${r} ?`,
  ];
  return {
    text: randomChoice(tournures),
    format: "qcm",
    choices: makeChoices(bonne, pieges),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: exp(
      "Un produit est le résultat d’une multiplication.",
      "On calcule chaque proposition et on garde celle qui tombe juste.",
      `${a} × ${b} = ${r}.`,
      `Le bon calcul est ${bonne}.`,
    ),
  };
}

/** Des groupes égaux : a objets dans chacun des b groupes. */
function genGroupes(a: number, b: number, situations: readonly Situation[] = SITUATIONS): Question {
  const s = randomChoice(situations);
  const p = prenom();
  const r = a * b;
  const tournures = [
    `${s.lieu}, il y a ${b} ${s.groupes} avec ${a} ${s.objets} ${s.dansChaque}. Combien y a-t-il ${de(s.objets)} en tout ?`,
    `${p} compte ${b} ${s.groupes}, avec ${a} ${s.objets} ${s.dansChaque}. Combien y a-t-il ${de(s.objets)} en tout ?`,
    `${maj(s.dansChaque)}, il y a ${a} ${s.objets}. ${s.lieu}, on compte ${b} ${s.groupes}. Combien y a-t-il ${de(s.objets)} au total ?`,
  ];
  if (s.groupesDe) {
    tournures.push(
      `${s.lieu} : ${b} ${s.groupes} de ${a} ${s.objets}. Combien ${de(s.objets)} cela fait-il ?`,
      `Combien y a-t-il ${de(s.objets)} dans ${b} ${s.groupes} de ${a} ${s.objets} ?`,
    );
  }
  return {
    text: randomChoice(tournures),
    format: "short",
    expected: [String(r)],
    comparator: "number_equal",
    explanation: exp(
      "Quand la même quantité se répète, on multiplie.",
      `Il y a ${b} ${s.groupes} et ${a} ${s.objets} ${s.dansChaque} : on calcule ${b} × ${a}.`,
      `${b} × ${a} = ${r}.`,
      `Il y a ${r} ${s.objets} en tout.`,
    ),
  };
}

/** Les groupes égaux par l'autre bout : on connaît le total, on cherche le nombre de groupes. */
function genGroupesInverse(a: number, b: number, situations: readonly Situation[] = SITUATIONS): Question {
  const s = randomChoice(situations);
  const p = prenom();
  const r = a * b;
  const tournures = [
    `${s.lieu}, on répartit ${r} ${s.objets}, ${a} ${s.dansChaque}. Combien faut-il ${de(s.groupes)} ?`,
    `${p} a ${r} ${s.objets} et en met ${a} ${s.dansChaque}. Combien ${de(s.groupes)} lui faut-il ?`,
    `Il y a ${r} ${s.objets} en tout et ${a} ${s.dansChaque}. Combien y a-t-il ${de(s.groupes)} ?`,
    `${maj(s.dansChaque)}, il y a ${a} ${s.objets}. ${s.lieu}, on compte ${r} ${s.objets} en tout. Combien y a-t-il ${de(s.groupes)} ?`,
  ];
  return {
    text: randomChoice(tournures),
    format: "short",
    expected: [String(b)],
    comparator: "number_equal",
    explanation: exp(
      "Chercher le nombre de groupes, c’est chercher un facteur manquant.",
      `On cherche combien de fois ${a} dans ${r} : ${a} × ? = ${r}.`,
      `${a} × ${b} = ${r}.`,
      `Il y a ${b} ${s.groupes}.`,
    ),
  };
}

/** Un prix, une durée, des points par unité : combien pour b unités ? */
function genTaux(a: number, b: number, liste: readonly Taux[] = TAUX): Question {
  const t = randomChoice(liste);
  const r = a * b;
  return {
    text: `${t.regle(a, prenom())} ${t.question(b)}`,
    format: "short",
    expected: [String(r)],
    comparator: "number_equal",
    explanation: exp(
      "Quand la même quantité revient pour chaque unité, on multiplie.",
      `On répète ${b} fois la quantité ${a} : on calcule ${b} × ${a}.`,
      `${b} × ${a} = ${r}.`,
      t.reponse(b, r),
    ),
  };
}

/** Le même, par l'autre bout : on connaît le total, on cherche le nombre d'unités. */
function genTauxInverse(a: number, b: number, liste: readonly Taux[] = TAUX): Question {
  const t = randomChoice(liste);
  const r = a * b;
  return {
    text: `${t.regle(a, prenom())} ${t.inverse(r)}`,
    format: "short",
    expected: [String(b)],
    comparator: "number_equal",
    explanation: exp(
      "Chercher combien de fois une quantité se répète, c’est chercher un facteur manquant.",
      `On cherche combien de fois ${a} dans ${r} : ${a} × ? = ${r}.`,
      `${a} × ${b} = ${r}.`,
      t.reponseInverse(b),
    ),
  };
}

/** S'appuyer sur un résultat connu : a × (b ± 1). */
function genVoisin(a: number, b: number): Question {
  const p = prenom();
  const c = b >= 10 ? b - 1 : b <= 2 ? b + 1 : randomChoice([b - 1, b + 1]);
  const r = a * b;
  const rc = a * c;
  const tournures = [
    `Tu sais que ${a} × ${b} = ${r}. Combien font ${a} × ${c} ?`,
    `On sait que ${a} × ${b} = ${r}. Déduis-en ${a} × ${c}.`,
    `${p} connaît par cœur ${a} × ${b} = ${r}. Que vaut alors ${a} × ${c} ?`,
    `Sachant que ${b} × ${a} = ${r}, calcule ${c} × ${a}.`,
    `${p} sait que ${a} × ${b} = ${r}. Sans réciter toute la table, trouve ${a} × ${c}.`,
  ];
  const plus = c > b;
  return {
    text: randomChoice(tournures),
    format: "short",
    expected: [String(rc)],
    comparator: "number_equal",
    explanation: exp(
      "Deux lignes voisines d’une table sont séparées par le nombre de la table.",
      `${a} × ${c}, c’est ${a} ${plus ? "de plus" : "de moins"} que ${a} × ${b}.`,
      plus ? `${r} + ${a} = ${rc}.` : `${r} - ${a} = ${rc}.`,
      `${a} × ${c} = ${rc}.`,
    ),
  };
}

/** Le lien avec la division : r ÷ a = b. */
function genDivision(a: number, b: number): Question {
  const r = a * b;
  const p = prenom();
  const tournures = [
    `Si ${a} × ${b} = ${r}, combien vaut ${r} ÷ ${a} ?`,
    `Calcule ${r} ÷ ${a} en t’aidant de la table de ${a}.`,
    `${p} partage ${r} billes en ${a} parts égales. Combien de billes y a-t-il dans chaque part ?`,
    `On distribue ${r} cartes à ${a} joueurs, autant à chacun. Combien de cartes reçoit chaque joueur ?`,
    `Combien vaut ${r} ÷ ${a} ?`,
  ];
  return {
    text: randomChoice(tournures),
    format: "short",
    expected: [String(b)],
    comparator: "number_equal",
    explanation: exp(
      `Diviser ${r} par ${a}, c’est chercher le nombre qui, multiplié par ${a}, donne ${r}.`,
      `On cherche dans la table de ${a} : ${suiteTable(a, b)}.`,
      `${a} × ${b} = ${r}, donc ${r} ÷ ${a} = ${b}.`,
      `La réponse est ${b}.`,
    ),
  };
}

/** Quelle division aide à trouver le facteur manquant ? */
function genDivisionAide(a: number, b: number): Question {
  const r = a * b;
  const p = prenom();
  const bonne = `${r} ÷ ${a}`;
  const tournures = [
    `Pour compléter ${a} × ? = ${r}, quel calcul peut aider ?`,
    `${p} cherche le nombre qui manque dans ? × ${a} = ${r}. Quel calcul lui donne la réponse ?`,
    `Quel calcul permet de trouver combien de fois ${a} il y a dans ${r} ?`,
    `${p} a ${r} billes et veut en faire des tas de ${a}. Quel calcul donne le nombre de tas ?`,
    `Pour savoir par quel nombre multiplier ${a} pour obtenir ${r}, quel calcul faut-il faire ?`,
  ];
  return {
    text: randomChoice(tournures),
    format: "qcm",
    choices: makeChoices(bonne, [`${r} - ${a}`, `${r} + ${a}`, `${r} × ${a}`]),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: exp(
      "Une multiplication à trou est liée à une division.",
      "Pour retrouver le facteur manquant, on divise le produit par le facteur connu.",
      `${r} ÷ ${a} = ${b}, car ${a} × ${b} = ${r}.`,
      `Le calcul utile est ${bonne}.`,
    ),
  };
}

/** La table cachée dans un tableau (le canvas montre la table, une case en « ? »). */
function genTableauCache(a: number, b: number): Question {
  const r = a * b;
  const p = prenom();
  const tournures = [
    `Défi tableau : retrouve le résultat de ${a} × ${b}.`,
    `Défi : dans le tableau, la case de ${a} × ${b} est cachée. Quel nombre y était écrit ?`,
    `${p} a caché le résultat de ${a} × ${b} dans la table. Retrouve-le.`,
    `Défi tableau : quel nombre se cache derrière le « ? » de la table de ${a} ?`,
  ];
  return {
    text: randomChoice(tournures),
    format: "short",
    expected: [String(r)],
    comparator: "number_equal",
    explanation: exp(
      "Un tableau peut aider à retrouver un résultat de table.",
      astuceProduit(a, b),
      `${a} × ${b} = ${r}.`,
      `La réponse est ${r}.`,
    ),
    canvas: tableCanvas({
      table: a,
      multiplicateur: b,
      title: `Défi table de ${a}`,
      questionLabel: `Le résultat de ${a} × ${b} est caché.`,
    }),
  };
}

// ---------------- Les familles des DÉFIS (deux étapes, devinettes) ----------------

/** Devinette : le seul résultat de la table entre deux nombres (a ≥ 3). */
function genDevinetteEntre(a: number, b: number): Question {
  const r = a * b;
  const p = prenom();
  const r1 = randomInt(1, a - 2);
  const r2 = randomInt(1, a - 1 - r1);
  const lo = r - r1;
  const hi = r + r2;
  const tournures = [
    `Devinette : je suis dans la table de ${a} et je suis compris entre ${lo} et ${hi}. Qui suis-je ?`,
    `${p} pense à un nombre de la table de ${a}, plus grand que ${lo} et plus petit que ${hi}. Quel est ce nombre ?`,
    `Quel résultat de la table de ${a} se trouve entre ${lo} et ${hi} ?`,
    `Je suis un multiple de ${a}, entre ${lo} et ${hi}. Qui suis-je ?`,
  ];
  return {
    text: randomChoice(tournures),
    format: "short",
    expected: [String(r)],
    comparator: "number_equal",
    explanation: exp(
      `On cherche un résultat de la table de ${a}.`,
      `On récite la table de ${a} et on regarde quel nombre tombe entre ${lo} et ${hi}.`,
      `${a} × ${b} = ${r}, et ${r} est entre ${lo} et ${hi}.`,
      `Le nombre est ${r}.`,
    ),
  };
}

/** Devinette : le plus petit nombre présent dans deux tables. */
function genDevinetteCommun(): Question {
  const p = prenom();
  const pgcd = (x: number, y: number): number => (y === 0 ? x : pgcd(y, x % y));
  let a = 2;
  let b = 3;
  let l = 6;
  do {
    a = randomInt(2, 10);
    b = randomInt(2, 10);
    l = (a * b) / pgcd(a, b);
  } while (a === b || a % b === 0 || b % a === 0 || l > 10 * Math.min(a, b));
  const tournures = [
    `Devinette : je suis le plus petit nombre, autre que 0, qui est à la fois dans la table de ${a} et dans la table de ${b}. Qui suis-je ?`,
    `${p} cherche le premier nombre qui apparaît à la fois dans la table de ${a} et dans celle de ${b}. Lequel est-ce ?`,
    `Quel est le plus petit résultat commun aux tables de ${a} et de ${b} ?`,
  ];
  return {
    text: randomChoice(tournures),
    format: "short",
    expected: [String(l)],
    comparator: "number_equal",
    explanation: exp(
      "Un nombre commun à deux tables apparaît dans les deux listes.",
      `Table de ${a} : ${suiteTable(a, l / a)}. Table de ${b} : ${suiteTable(b, l / b)}.`,
      `${l} = ${a} × ${l / a} = ${b} × ${l / b}.`,
      `Le nombre cherché est ${l}.`,
    ),
  };
}

/** Deux produits à additionner, nus ou en situation. */
function genDeuxProduits(): Question {
  const a = randomInt(4, 9);
  const b = randomInt(4, 9);
  const c = randomInt(4, 9);
  const d = randomInt(4, 9);
  const p1 = a * b;
  const p2 = c * d;
  const total = p1 + p2;
  const p = prenom();
  const s = randomChoice(SITUATIONS);
  const [art1, art2] = shuffle(ARTICLES).slice(0, 2);
  const tournures = [
    `Défi : calcule ${a} × ${b}, puis ${c} × ${d}. Quelle est la somme des deux résultats ?`,
    `Défi : ajoute le résultat de ${a} × ${b} à celui de ${c} × ${d}. Que trouves-tu ?`,
    `${p} achète ${a} ${art1} à ${b} € pièce et ${c} ${art2} à ${d} € pièce. Quel est le prix total, en euros ?`,
    `${s.lieu}, il y a ${a} ${s.groupes} avec ${b} ${s.objets} ${s.dansChaque}, puis ${c} autres ${s.groupes} avec ${d} ${s.objets} ${s.dansChaque}. Combien y a-t-il ${de(s.objets)} en tout ?`,
  ];
  return {
    text: randomChoice(tournures),
    format: "short",
    expected: [String(total)],
    comparator: "number_equal",
    explanation: exp(
      "Un défi peut combiner deux produits.",
      "On calcule d’abord chaque multiplication, puis on additionne les résultats.",
      `${a} × ${b} = ${p1} et ${c} × ${d} = ${p2}. Puis ${p1} + ${p2} = ${total}.`,
      `Le total est ${total}.`,
    ),
  };
}

/** Des groupes égaux, puis on en retire une partie. */
function genReste(a: number, b: number): Question {
  const s = randomChoice(SITUATIONS);
  const p = prenom();
  const r = a * b;
  const m = randomInt(2, r - 2);
  const tournures = [
    `${s.lieu}, il y a ${b} ${s.groupes} avec ${a} ${s.objets} ${s.dansChaque}. On en enlève ${m}. Combien en reste-t-il ?`,
    `${p} compte ${b} ${s.groupes}, avec ${a} ${s.objets} ${s.dansChaque}, puis en retire ${m}. Combien ${de(s.objets)} reste-t-il ?`,
    `${maj(s.dansChaque)}, il y a ${a} ${s.objets}, et on compte ${b} ${s.groupes}. Si l’on en retire ${m}, combien en reste-t-il ?`,
  ];
  return {
    text: randomChoice(tournures),
    format: "short",
    expected: [String(r - m)],
    comparator: "number_equal",
    explanation: exp(
      "Ce défi se fait en deux étapes : une multiplication, puis une soustraction.",
      `D’abord le total : ${b} × ${a}. Ensuite on enlève ${m}.`,
      `${b} × ${a} = ${r}, puis ${r} - ${m} = ${r - m}.`,
      `Il en reste ${r - m}.`,
    ),
  };
}

/** Acheter b articles à a € et payer avec un billet : la monnaie rendue. */
function genMonnaie(a: number, b: number): Question {
  const p = prenom();
  const art = randomChoice(ARTICLES);
  const r = a * b;
  const billet = [10, 20, 50, 100].find((x) => x > r) ?? 100;
  const rendu = billet - r;
  const tournures = [
    `${p} achète ${b} ${art} à ${a} € pièce et paie avec un billet de ${billet} €. Combien d’euros lui rend-on ?`,
    `Défi courses : ${b} ${art} à ${a} € pièce, payés avec un billet de ${billet} €. Quelle somme rend le vendeur, en euros ?`,
    `On paie ${b} ${art} à ${a} € pièce avec ${billet} €. Combien d’euros doit-on rendre ?`,
  ];
  return {
    text: randomChoice(tournures),
    format: "short",
    expected: [String(rendu)],
    comparator: "number_equal",
    explanation: exp(
      "Ce défi se fait en deux étapes : le prix total, puis la monnaie.",
      `Le prix total est ${b} × ${a} €. On le retire de ${billet} €.`,
      `${b} × ${a} = ${r}, puis ${billet} - ${r} = ${rendu}.`,
      `On rend ${rendu} €.`,
    ),
  };
}

/** Deux collections à comparer : la différence. */
function genComparaison(a: number, b: number): Question {
  const [p, q] = deuxPrenoms();
  const [groupes, objets] = randomChoice(COLLECTIONS);
  let c = randomInt(4, 9);
  let d = randomInt(4, 9);
  while (c * d === a * b) {
    c = randomInt(4, 9);
    d = randomInt(4, 9);
  }
  const r1 = b * a;
  const r2 = c * d;
  const diff = Math.abs(r1 - r2);
  const tournures = [
    `${p} a ${b} ${groupes} de ${a} ${objets}. ${q} a ${c} ${groupes} de ${d} ${objets}. Quelle est la différence entre leurs deux nombres ${de(objets)} ?`,
    `Défi : ${p} possède ${b} ${groupes} de ${a} ${objets} et ${q} ${c} ${groupes} de ${d} ${objets}. Combien ${de(objets)} les séparent ?`,
    `${p} et ${q} comparent leurs ${objets} : ${b} ${groupes} de ${a} pour l’un, ${c} ${groupes} de ${d} pour l’autre. Quel est l’écart entre les deux ?`,
  ];
  return {
    text: randomChoice(tournures),
    format: "short",
    expected: [String(diff)],
    comparator: "number_equal",
    explanation: exp(
      "Pour comparer deux collections, on calcule chaque total puis l’écart.",
      "Deux multiplications, puis une soustraction du plus grand moins le plus petit.",
      `${b} × ${a} = ${r1} et ${c} × ${d} = ${r2}. L’écart est ${Math.max(r1, r2)} - ${Math.min(r1, r2)} = ${diff}.`,
      `La différence est de ${diff} ${objets}.`,
    ),
  };
}

/** Le décor réunionnais du défi écologie, en quelques tournures. */
function genDechets(a: number, b: number): Question {
  const r = a * b;
  const p = prenom();
  const tournures = [
    `Défi écologie : ${b} équipes ramassent chacune ${a} déchets sur la plage de l’Hermitage. Combien de déchets sont ramassés au total ?`,
    `Sur la plage de l’Hermitage, chaque équipe ramasse ${a} déchets. Il y a ${b} équipes. Combien de déchets sont ramassés en tout ?`,
    `L’équipe de ${p} ramasse ${a} déchets, comme chacune des ${b} équipes de la classe. Combien de déchets la classe ramasse-t-elle ?`,
  ];
  return {
    text: randomChoice(tournures),
    format: "short",
    expected: [String(r)],
    comparator: "number_equal",
    explanation: exp(
      "Les tables servent à calculer rapidement des groupes égaux.",
      "On multiplie le nombre d’équipes par le nombre de déchets par équipe.",
      `${b} × ${a} = ${r}.`,
      `Au total, ${r} déchets sont ramassés.`,
    ),
  };
}

// ------------------------------------------------------------
// L'INSTALLATION : une famille devient un gabarit du coach.
// ------------------------------------------------------------

type Famille = {
  nom: string;
  hint: string;
  tag: string;
  gen: (a: number, b: number) => Question;
};

const F = {
  produit: { nom: "produit_tournures", hint: "Récite la table, ou pars d’un résultat que tu connais.", tag: "produit", gen: (a, b) => genProduit(a, b) },
  produitQcm: { nom: "produit_qcm", hint: "Calcule avant de regarder les propositions.", tag: "qcm", gen: genProduitQcm },
  facteur: { nom: "facteur_manquant", hint: "Récite la table jusqu’à tomber sur le résultat.", tag: "facteur_manquant", gen: (a, b) => genFacteur(a, b) },
  facteurQcm: { nom: "facteur_qcm", hint: "Essaie chaque proposition : multiplie-la par le nombre de la table.", tag: "facteur_manquant", gen: genFacteurQcm },
  affirmation: { nom: "vrai_faux", hint: "Recalcule le produit toi-même avant de répondre.", tag: "erreur", gen: genAffirmation },
  multiple: { nom: "reconnaitre", hint: "Compte de tant en tant : sur quel nombre tombes-tu ?", tag: "multiple", gen: genMultiple },
  intrus: { nom: "intrus", hint: "Vérifie chaque nombre : peut-il s’écrire avec la table ?", tag: "multiple", gen: genIntrus },
  choisirCalcul: { nom: "choisir_calcul", hint: "Calcule chaque proposition.", tag: "qcm", gen: genChoisirCalcul },
  groupes: { nom: "groupes_egaux", hint: "La même quantité se répète : c’est une multiplication.", tag: "probleme", gen: (a, b) => genGroupes(a, b) },
  groupesInverse: { nom: "nombre_de_groupes", hint: "Combien de fois la quantité tient-elle dans le total ?", tag: "probleme", gen: (a, b) => genGroupesInverse(a, b) },
  taux: { nom: "par_unite", hint: "Même quantité pour chaque unité : multiplie.", tag: "probleme", gen: (a, b) => genTaux(a, b) },
  tauxInverse: { nom: "par_unite_inverse", hint: "Cherche combien de fois la quantité tient dans le total.", tag: "probleme", gen: (a, b) => genTauxInverse(a, b) },
  voisin: { nom: "ligne_voisine", hint: "Une ligne de plus, c’est un nombre de la table en plus.", tag: "strategie", gen: genVoisin },
  division: { nom: "lien_division", hint: "La division se lit dans la table de multiplication.", tag: "division", gen: genDivision },
  divisionAide: { nom: "division_aide", hint: "Quelle opération défait une multiplication ?", tag: "division", gen: genDivisionAide },
  devinetteEntre: { nom: "devinette_entre", hint: "Récite la table et regarde quel nombre tombe dans l’intervalle.", tag: "defi", gen: genDevinetteEntre },
  reste: { nom: "deux_etapes_reste", hint: "D’abord la multiplication, ensuite la soustraction.", tag: "defi", gen: genReste },
  monnaie: { nom: "deux_etapes_monnaie", hint: "D’abord le prix total, ensuite la monnaie.", tag: "defi", gen: genMonnaie },
  comparaison: { nom: "comparaison", hint: "Calcule les deux totaux, puis l’écart.", tag: "defi", gen: genComparaison },
  devinetteCommun: { nom: "devinette_commun", hint: "Écris les deux tables et cherche le premier nombre commun.", tag: "defi", gen: () => genDevinetteCommun() },
} satisfies Record<string, Famille>;

type Palier = "decouverte" | "entrainement" | "approfondissement";

/** Les familles de chaque palier d'une table. */
const PALIERS: Record<Palier, Famille[]> = {
  decouverte: [F.produit, F.produitQcm, F.groupes, F.taux, F.multiple, F.affirmation],
  entrainement: [F.facteur, F.affirmation, F.choisirCalcul, F.groupesInverse, F.facteurQcm],
  approfondissement: [F.voisin, F.intrus, F.tauxInverse, F.division, F.divisionAide, F.reste],
};

/** Installe des familles dans une micro, à une étoile. */
function gabaritsFamilles(o: {
  microId: string;
  prefixe: string;
  difficulty: DifficultyLevel;
  tags: string[];
  familles: Famille[];
  tirer: () => [number, number];
}): TutorBankItemV4[] {
  return o.familles.map((f) => ({
    kind: "template" as const,
    id: `${o.prefixe}_${f.nom}`,
    niveau: "cm1" as const,
    matiere: "maths" as const,
    notionId: "tables_multiplication",
    microId: o.microId,
    difficulty: o.difficulty,
    theme: "neutral" as const,
    hint: f.hint,
    tags: [...o.tags, f.tag, "template"],
    generate: () => {
      const [a, b] = o.tirer();
      return f.gen(a, b);
    },
  }));
}

/** Les gabarits d'une table : chaque palier à l'étoile donnée. */
function gabaritsTable(
  n: number,
  etoiles: Partial<Record<Palier, DifficultyLevel>>,
): TutorBankItemV4[] {
  return (Object.keys(etoiles) as Palier[]).flatMap((palier) =>
    gabaritsFamilles({
      microId: `table_${n}`,
      prefixe: `cm1_table_${n}_tpl_${palier}`,
      difficulty: etoiles[palier]!,
      tags: ["cm1", "tables", `table_${n}`],
      familles: PALIERS[palier],
      tirer: () => [n, randomInt(2, 10)],
    }),
  );
}

/** Deux facteurs tirés dans une plage (tables mélangées, trous, défis). */
function paire(min: number, max: number): () => [number, number] {
  return () => [randomInt(min, max), randomInt(min, max)];
}

export const MultiplicationTablesBank: TutorBankItemV4[] = [
  // ============================================================
  // TABLE_2
  // Connaître la table de 2
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_table_2_fixed_1_double_simple",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_2",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 2 × 6",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "La table de 2 correspond aux doubles.",
    explanation: exp(
      "La table de 2 permet de calculer les doubles.",
      "On cherche le double de 6.",
      "2 × 6 = 12.",
      "La réponse est 12."
    ),
    canvas: miniTableCanvas({
      table: 2,
      multiplicateurs: [4, 5, 6, 7, 8],
      missing: 6,
      title: "Table de 2",
      questionLabel: "Le résultat de 2 × 6 est caché.",
    }),
    tags: ["cm1", "tables", "table_2", "double", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_table_2_fixed_2_trou",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_2",
    difficulty: 1,
    theme: "neutral",
    text: "Complète : 2 × ? = 14",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Cherche quel nombre a pour double 14.",
    explanation: exp(
      "Une multiplication à trou demande de retrouver le facteur manquant.",
      "On cherche le nombre qui, multiplié par 2, donne 14.",
      "2 × 7 = 14.",
      "Le nombre manquant est 7."
    ),
    canvas: miniTableCanvas({
      table: 2,
      multiplicateurs: [5, 6, 7, 8, 9],
      missing: 7,
      title: "Table de 2 à trou",
      questionLabel: "Quelle ligne donne 14 ?",
    }),
    tags: ["cm1", "tables", "table_2", "facteur_manquant", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_table_2_fixed_3_qcm_pair",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_2",
    difficulty: 1,
    theme: "neutral",
    text: "Quel résultat appartient à la table de 2 ?",
    format: "qcm",
    choices: ["16", "17", "19", "21"],
    expected: ["16"],
    comparator: "mcq_exact",
    hint: "Les résultats de la table de 2 sont des nombres pairs.",
    explanation: exp(
      "Les résultats de la table de 2 sont les doubles.",
      "On repère le nombre qui peut s’écrire 2 × un entier.",
      "16 = 2 × 8.",
      "16 appartient à la table de 2."
    ),
    tags: ["cm1", "tables", "table_2", "pair", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_table_2_fixed_4_erreur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_2",
    difficulty: 2,
    theme: "neutral",
    text: "Un élève affirme que 2 × 9 = 16. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Calcule le double de 9.",
    explanation: exp(
      "Une table de multiplication doit être vérifiée précisément.",
      "On calcule 2 × 9.",
      "2 × 9 = 18, et non 16.",
      "L’élève n’a pas raison."
    ),
    tags: ["cm1", "tables", "table_2", "erreur", "qcm"],
  },

  {
    kind: "template",
    id: "cm1_table_2_tpl_1_produit_direct",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_2",
    difficulty: 1,
    theme: "neutral",
    hint: "Multiplier par 2, c’est doubler.",
    tags: ["cm1", "tables", "table_2", "template", "double", "canvas"],
    generate: () => genProduit(2, randomInt(2, 10), true),
  },

  {
    kind: "template",
    id: "cm1_table_2_tpl_2_facteur_manquant",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_2",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche le nombre dont le double donne le résultat.",
    tags: ["cm1", "tables", "table_2", "facteur_manquant", "template"],
    generate: () => genFacteur(2, randomInt(2, 10)),
  },

  {
    kind: "template",
    id: "cm1_table_2_tpl_3_reunion_margouillats",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_2",
    difficulty: 2,
    theme: "reunion",
    hint: "Chaque mur a le même nombre de margouillats.",
    tags: ["cm1", "tables", "table_2", "reunion", "margouillat", "template"],
    generate: () => genGroupes(2, randomInt(3, 10), [DECORS.margouillats]),
  },

  // ============================================================
  // TABLE_3
  // Connaître la table de 3
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_table_3_fixed_1_produit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_3",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 3 × 4",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Compte 3 + 3 + 3 + 3.",
    explanation: exp(
      "La table de 3 permet de compter de 3 en 3.",
      "On cherche 4 groupes de 3.",
      "3 × 4 = 12.",
      "La réponse est 12."
    ),
    canvas: miniTableCanvas({
      table: 3,
      multiplicateurs: [2, 3, 4, 5, 6],
      missing: 4,
      title: "Table de 3",
      questionLabel: "Le résultat de 3 × 4 est caché.",
    }),
    tags: ["cm1", "tables", "table_3", "produit", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_table_3_fixed_2_produit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_3",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 3 × 8",
    format: "short",
    expected: ["24"],
    comparator: "number_equal",
    hint: "Tu peux compter de 3 en 3 jusqu’à 8 fois.",
    explanation: exp(
      "La table de 3 donne les résultats des multiplications par 3.",
      "On cherche 8 groupes de 3.",
      "3 × 8 = 24.",
      "La réponse est 24."
    ),
    tags: ["cm1", "tables", "table_3", "produit"],
  },

  {
    kind: "fixed",
    id: "cm1_table_3_fixed_3_trou",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_3",
    difficulty: 2,
    theme: "neutral",
    text: "Complète : 3 × ? = 27",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "Cherche dans la table de 3.",
    explanation: exp(
      "Une multiplication à trou demande de retrouver le facteur manquant.",
      "On cherche quel nombre multiplié par 3 donne 27.",
      "3 × 9 = 27.",
      "Le nombre manquant est 9."
    ),
    canvas: miniTableCanvas({
      table: 3,
      multiplicateurs: [6, 7, 8, 9, 10],
      missing: 9,
      title: "Table de 3 à trou",
      questionLabel: "Quelle ligne donne 27 ?",
    }),
    tags: ["cm1", "tables", "table_3", "facteur_manquant", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_table_3_fixed_4_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_3",
    difficulty: 2,
    theme: "neutral",
    text: "Quel calcul donne 21 ?",
    format: "qcm",
    choices: ["3 × 7", "3 × 6", "3 × 8", "2 × 9"],
    expected: ["3 × 7"],
    comparator: "mcq_exact",
    hint: "Cherche dans la table de 3.",
    explanation: exp(
      "Un produit est le résultat d’une multiplication.",
      "On cherche le calcul qui donne 21.",
      "3 × 7 = 21.",
      "Le bon calcul est 3 × 7."
    ),
    tags: ["cm1", "tables", "table_3", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_table_3_fixed_5_erreur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_3",
    difficulty: 2,
    theme: "neutral",
    text: "Un élève affirme que 3 × 6 = 20. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Compte 3, 6, 9, 12, 15, 18.",
    explanation: exp(
      "Il faut vérifier précisément les résultats d’une table.",
      "On calcule 3 × 6.",
      "3 × 6 = 18, et non 20.",
      "L’élève n’a pas raison."
    ),
    tags: ["cm1", "tables", "table_3", "erreur", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_table_3_fixed_6_lien_division",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_3",
    difficulty: 3,
    theme: "neutral",
    text: "Si 3 × 8 = 24, alors combien vaut 24 ÷ 3 ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "La division est liée à la multiplication.",
    explanation: exp(
      "Les tables de multiplication aident à comprendre la division.",
      "Si 3 × 8 = 24, alors 24 partagé en groupes de 3 donne 8 groupes.",
      "24 ÷ 3 = 8.",
      "La réponse est 8."
    ),
    tags: ["cm1", "tables", "table_3", "division", "lien"],
  },

  {
    kind: "template",
    id: "cm1_table_3_tpl_1_produit_direct",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_3",
    difficulty: 1,
    theme: "neutral",
    hint: "Utilise la table de 3.",
    tags: ["cm1", "tables", "table_3", "template", "canvas"],
    generate: () => genProduit(3, randomInt(2, 10), true),
  },

  {
    kind: "template",
    id: "cm1_table_3_tpl_2_facteur_manquant",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_3",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche dans la table de 3.",
    tags: ["cm1", "tables", "table_3", "facteur_manquant", "template"],
    generate: () => genFacteur(3, randomInt(2, 10)),
  },

  {
    kind: "template",
    id: "cm1_table_3_tpl_3_qcm_resultat",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_3",
    difficulty: 2,
    theme: "neutral",
    hint: "Calcule le produit demandé.",
    tags: ["cm1", "tables", "table_3", "qcm", "template"],
    generate: () => genProduitQcm(3, randomInt(3, 10)),
  },

  {
    kind: "template",
    id: "cm1_table_3_tpl_4_reunion_vanille",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_3",
    difficulty: 2,
    theme: "reunion",
    hint: "Chaque sachet contient 3 gousses.",
    tags: ["cm1", "tables", "table_3", "reunion", "vanille", "template"],
    generate: () => genGroupes(3, randomInt(3, 10), [DECORS.vanille]),
  },

    // ============================================================
  // TABLE_4
  // Connaître la table de 4
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_table_4_fixed_1_produit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_4",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 4 × 6",
    format: "short",
    expected: ["24"],
    comparator: "number_equal",
    hint: "Tu peux faire le double du double : 6 doublé donne 12, puis 12 doublé donne 24.",
    explanation: exp(
      "La table de 4 peut se comprendre comme le double du double.",
      "On cherche 4 groupes de 6, ou le double du double de 6.",
      "6 × 2 = 12, puis 12 × 2 = 24. Donc 4 × 6 = 24.",
      "La réponse est 24."
    ),
    canvas: miniTableCanvas({
      table: 4,
      multiplicateurs: [4, 5, 6, 7, 8],
      missing: 6,
      title: "Table de 4",
      questionLabel: "Le résultat de 4 × 6 est caché.",
    }),
    tags: ["cm1", "tables", "table_4", "produit", "double_double", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_table_4_fixed_2_produit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_4",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 4 × 8",
    format: "short",
    expected: ["32"],
    comparator: "number_equal",
    hint: "Compte de 4 en 4 ou utilise le double du double.",
    explanation: exp(
      "La table de 4 donne les résultats des multiplications par 4.",
      "On cherche 8 groupes de 4.",
      "4 × 8 = 32.",
      "La réponse est 32."
    ),
    tags: ["cm1", "tables", "table_4", "produit"],
  },

  {
    kind: "fixed",
    id: "cm1_table_4_fixed_3_trou",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_4",
    difficulty: 2,
    theme: "neutral",
    text: "Complète : 4 × ? = 28",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Cherche dans la table de 4.",
    explanation: exp(
      "Une multiplication à trou demande de retrouver le facteur manquant.",
      "On cherche quel nombre multiplié par 4 donne 28.",
      "4 × 7 = 28.",
      "Le nombre manquant est 7."
    ),
    canvas: miniTableCanvas({
      table: 4,
      multiplicateurs: [5, 6, 7, 8, 9],
      missing: 7,
      title: "Table de 4 à trou",
      questionLabel: "Quelle ligne donne 28 ?",
    }),
    tags: ["cm1", "tables", "table_4", "facteur_manquant", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_table_4_fixed_4_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_4",
    difficulty: 2,
    theme: "neutral",
    text: "Quel calcul donne 36 ?",
    format: "qcm",
    choices: ["4 × 9", "4 × 8", "4 × 7", "3 × 9"],
    expected: ["4 × 9"],
    comparator: "mcq_exact",
    hint: "Cherche dans la table de 4.",
    explanation: exp(
      "Un produit est le résultat d’une multiplication.",
      "On cherche le calcul qui donne 36.",
      "4 × 9 = 36.",
      "Le bon calcul est 4 × 9."
    ),
    tags: ["cm1", "tables", "table_4", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_table_4_fixed_5_erreur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_4",
    difficulty: 2,
    theme: "neutral",
    text: "Un élève affirme que 4 × 7 = 30. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Vérifie la table de 4.",
    explanation: exp(
      "Il faut vérifier précisément les résultats d’une table.",
      "On calcule 4 × 7.",
      "4 × 7 = 28, et non 30.",
      "L’élève n’a pas raison."
    ),
    tags: ["cm1", "tables", "table_4", "erreur", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_table_4_fixed_6_lien_division",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_4",
    difficulty: 3,
    theme: "neutral",
    text: "Si 4 × 8 = 32, alors combien vaut 32 ÷ 4 ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "La division est liée à la multiplication.",
    explanation: exp(
      "Les tables de multiplication aident à retrouver des divisions.",
      "Si 4 × 8 = 32, alors 32 partagé en groupes de 4 donne 8 groupes.",
      "32 ÷ 4 = 8.",
      "La réponse est 8."
    ),
    tags: ["cm1", "tables", "table_4", "division", "lien"],
  },

  {
    kind: "template",
    id: "cm1_table_4_tpl_1_produit_direct",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_4",
    difficulty: 1,
    theme: "neutral",
    hint: "Utilise la table de 4 ou le double du double.",
    tags: ["cm1", "tables", "table_4", "template", "canvas"],
    generate: () => genProduit(4, randomInt(2, 10), true),
  },

  {
    kind: "template",
    id: "cm1_table_4_tpl_2_facteur_manquant",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_4",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche dans la table de 4.",
    tags: ["cm1", "tables", "table_4", "facteur_manquant", "template"],
    generate: () => genFacteur(4, randomInt(2, 10)),
  },

  {
    kind: "template",
    id: "cm1_table_4_tpl_3_qcm_resultat",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_4",
    difficulty: 2,
    theme: "neutral",
    hint: "Calcule le produit demandé.",
    tags: ["cm1", "tables", "table_4", "qcm", "template"],
    generate: () => genProduitQcm(4, randomInt(3, 10)),
  },

  {
    kind: "template",
    id: "cm1_table_4_tpl_4_reunion_balises",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_4",
    difficulty: 2,
    theme: "reunion",
    hint: "Chaque zone contient 4 balises.",
    tags: ["cm1", "tables", "table_4", "reunion", "sentier", "template"],
    generate: () => genGroupes(4, randomInt(3, 10), [DECORS.balises]),
  },

  // ============================================================
  // TABLE_5
  // Connaître la table de 5
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_table_5_fixed_1_produit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_5",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 5 × 6",
    format: "short",
    expected: ["30"],
    comparator: "number_equal",
    hint: "La table de 5 finit souvent par 0 ou par 5.",
    explanation: exp(
      "La table de 5 permet de compter de 5 en 5.",
      "On cherche 6 groupes de 5.",
      "5 × 6 = 30.",
      "La réponse est 30."
    ),
    canvas: miniTableCanvas({
      table: 5,
      multiplicateurs: [4, 5, 6, 7, 8],
      missing: 6,
      title: "Table de 5",
      questionLabel: "Le résultat de 5 × 6 est caché.",
    }),
    tags: ["cm1", "tables", "table_5", "produit", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_table_5_fixed_2_produit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_5",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 5 × 9",
    format: "short",
    expected: ["45"],
    comparator: "number_equal",
    hint: "Compte de 5 en 5.",
    explanation: exp(
      "La table de 5 avance de 5 en 5.",
      "On cherche 9 groupes de 5.",
      "5 × 9 = 45.",
      "La réponse est 45."
    ),
    tags: ["cm1", "tables", "table_5", "produit"],
  },

  {
    kind: "fixed",
    id: "cm1_table_5_fixed_3_trou",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_5",
    difficulty: 2,
    theme: "neutral",
    text: "Complète : 5 × ? = 40",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Cherche dans la table de 5.",
    explanation: exp(
      "Une multiplication à trou demande de retrouver le facteur manquant.",
      "On cherche quel nombre multiplié par 5 donne 40.",
      "5 × 8 = 40.",
      "Le nombre manquant est 8."
    ),
    canvas: miniTableCanvas({
      table: 5,
      multiplicateurs: [6, 7, 8, 9, 10],
      missing: 8,
      title: "Table de 5 à trou",
      questionLabel: "Quelle ligne donne 40 ?",
    }),
    tags: ["cm1", "tables", "table_5", "facteur_manquant", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_table_5_fixed_4_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_5",
    difficulty: 2,
    theme: "neutral",
    text: "Quel résultat appartient à la table de 5 ?",
    format: "qcm",
    choices: ["35", "36", "38", "41"],
    expected: ["35"],
    comparator: "mcq_exact",
    hint: "Les résultats de la table de 5 finissent souvent par 0 ou 5.",
    explanation: exp(
      "Les résultats de la table de 5 s'obtiennent en comptant de 5 en 5.",
      "On cherche un nombre qui peut s’écrire 5 × un entier.",
      "35 = 5 × 7.",
      "35 appartient à la table de 5."
    ),
    tags: ["cm1", "tables", "table_5", "multiple", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_table_5_fixed_5_erreur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_5",
    difficulty: 2,
    theme: "neutral",
    text: "Un élève affirme que 5 × 8 = 45. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Vérifie la table de 5.",
    explanation: exp(
      "Il faut vérifier précisément les résultats d’une table.",
      "On calcule 5 × 8.",
      "5 × 8 = 40, et non 45.",
      "L’élève n’a pas raison."
    ),
    tags: ["cm1", "tables", "table_5", "erreur", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_table_5_fixed_6_lien_division",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_5",
    difficulty: 3,
    theme: "neutral",
    text: "Si 5 × 9 = 45, alors combien vaut 45 ÷ 9 ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Regarde bien par quel nombre on divise : ce n’est pas le même que d’habitude.",
    explanation: exp(
      "Une même multiplication donne DEUX divisions.",
      "5 × 9 = 45 se lit dans les deux sens : 45 ÷ 5 = 9, et aussi 45 ÷ 9 = 5.",
      "Ici on divise par 9, donc le résultat est l’autre facteur : 5.",
      "La réponse est 5."
    ),
    tags: ["cm1", "tables", "table_5", "division", "lien"],
  },

  {
    kind: "fixed",
    id: "cm1_table_5_fixed_7_strategie_par_10",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_5",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle stratégie peut aider à calculer 5 × 18 ?",
    format: "qcm",
    choices: [
      "calculer 10 × 18 puis prendre la moitié",
      "calculer 18 + 5",
      "calculer 18 - 5",
      "calculer 18 ÷ 5",
    ],
    expected: ["calculer 10 × 18 puis prendre la moitié"],
    comparator: "mcq_exact",
    hint: "5 est la moitié de 10.",
    explanation: exp(
      "Multiplier par 5 peut se faire avec une stratégie.",
      "On peut multiplier par 10 puis prendre la moitié.",
      "10 × 18 = 180, et la moitié de 180 est 90.",
      "La stratégie correcte est de calculer 10 × 18 puis prendre la moitié."
    ),
    tags: ["cm1", "tables", "table_5", "strategie", "qcm"],
  },

  {
    kind: "template",
    id: "cm1_table_5_tpl_1_produit_direct",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_5",
    difficulty: 1,
    theme: "neutral",
    hint: "Utilise la table de 5.",
    tags: ["cm1", "tables", "table_5", "template", "canvas"],
    generate: () => genProduit(5, randomInt(2, 10), true),
  },

  {
    kind: "template",
    id: "cm1_table_5_tpl_2_facteur_manquant",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_5",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche dans la table de 5.",
    tags: ["cm1", "tables", "table_5", "facteur_manquant", "template"],
    generate: () => genFacteur(5, randomInt(2, 10)),
  },

  {
    kind: "template",
    id: "cm1_table_5_tpl_3_qcm_resultat",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_5",
    difficulty: 2,
    theme: "neutral",
    hint: "Calcule le produit demandé.",
    tags: ["cm1", "tables", "table_5", "qcm", "template"],
    generate: () => genProduitQcm(5, randomInt(3, 10)),
  },

  {
    kind: "template",
    id: "cm1_table_5_tpl_4_reunion_fruits",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_5",
    difficulty: 2,
    theme: "reunion",
    hint: "Chaque sachet contient 5 fruits.",
    tags: ["cm1", "tables", "table_5", "reunion", "marche", "template"],
    generate: () => genGroupes(5, randomInt(3, 10), [DECORS.sachetsFruits]),
  },
    // ============================================================
  // TABLE_6
  // Connaître la table de 6
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_table_6_fixed_1_produit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_6",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 6 × 4",
    format: "short",
    expected: ["24"],
    comparator: "number_equal",
    hint: "Tu peux utiliser 4 × 6 si tu connais mieux ce calcul.",
    explanation: exp(
      "La table de 6 permet de compter de 6 en 6.",
      "On cherche 4 groupes de 6.",
      "6 × 4 = 24.",
      "La réponse est 24."
    ),
    canvas: miniTableCanvas({
      table: 6,
      multiplicateurs: [2, 3, 4, 5, 6],
      missing: 4,
      title: "Table de 6",
      questionLabel: "Le résultat de 6 × 4 est caché.",
    }),
    tags: ["cm1", "tables", "table_6", "produit", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_table_6_fixed_2_produit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_6",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 6 × 8",
    format: "short",
    expected: ["48"],
    comparator: "number_equal",
    hint: "6 × 8, c’est aussi 8 × 6.",
    explanation: exp(
      "Dans une multiplication, on peut changer l’ordre des facteurs.",
      "On utilise la table de 6 ou la table de 8.",
      "6 × 8 = 48.",
      "La réponse est 48."
    ),
    tags: ["cm1", "tables", "table_6", "commutativite"],
  },

  {
    kind: "fixed",
    id: "cm1_table_6_fixed_3_trou",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_6",
    difficulty: 2,
    theme: "neutral",
    text: "Complète : 6 × ? = 42",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Cherche dans la table de 6.",
    explanation: exp(
      "Une multiplication à trou demande de retrouver le facteur manquant.",
      "On cherche quel nombre multiplié par 6 donne 42.",
      "6 × 7 = 42.",
      "Le nombre manquant est 7."
    ),
    canvas: miniTableCanvas({
      table: 6,
      multiplicateurs: [5, 6, 7, 8, 9],
      missing: 7,
      title: "Table de 6 à trou",
      questionLabel: "Quelle ligne donne 42 ?",
    }),
    tags: ["cm1", "tables", "table_6", "facteur_manquant", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_table_6_fixed_4_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_6",
    difficulty: 2,
    theme: "neutral",
    text: "Quel calcul donne 54 ?",
    format: "qcm",
    choices: ["6 × 9", "6 × 8", "6 × 7", "5 × 9"],
    expected: ["6 × 9"],
    comparator: "mcq_exact",
    hint: "Cherche dans la table de 6.",
    explanation: exp(
      "Un produit est le résultat d’une multiplication.",
      "On cherche le calcul qui donne 54.",
      "6 × 9 = 54.",
      "Le bon calcul est 6 × 9."
    ),
    tags: ["cm1", "tables", "table_6", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_table_6_fixed_5_erreur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_6",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève affirme que 6 × 7 = 44. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Vérifie la table de 6.",
    explanation: exp(
      "Il faut vérifier précisément les résultats d’une table.",
      "On calcule 6 × 7.",
      "6 × 7 = 42, et non 44.",
      "L’élève n’a pas raison."
    ),
    tags: ["cm1", "tables", "table_6", "erreur", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_table_6_fixed_6_lien_division",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_6",
    difficulty: 3,
    theme: "neutral",
    text: "Si 6 × 8 = 48, alors combien vaut 48 ÷ 6 ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "La division est liée à la multiplication.",
    explanation: exp(
      "Les tables de multiplication aident à retrouver des divisions.",
      "Si 6 × 8 = 48, alors 48 partagé en groupes de 6 donne 8 groupes.",
      "48 ÷ 6 = 8.",
      "La réponse est 8."
    ),
    tags: ["cm1", "tables", "table_6", "division", "lien"],
  },

  {
    kind: "fixed",
    id: "cm1_table_6_fixed_7_strategie_5_plus_1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_6",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle stratégie peut aider à calculer 6 × 7 ?",
    format: "qcm",
    choices: [
      "faire 5 × 7 puis ajouter 1 × 7",
      "faire 6 + 7",
      "faire 7 - 6",
      "faire 6 × 10 puis ajouter 7",
    ],
    expected: ["faire 5 × 7 puis ajouter 1 × 7"],
    comparator: "mcq_exact",
    hint: "6 groupes, c’est 5 groupes plus 1 groupe.",
    explanation: exp(
      "Une stratégie peut utiliser une table déjà bien connue.",
      "On peut décomposer 6 en 5 + 1.",
      "6 × 7 = 5 × 7 + 1 × 7 = 35 + 7 = 42.",
      "La stratégie correcte est de faire 5 × 7 puis ajouter 1 × 7."
    ),
    tags: ["cm1", "tables", "table_6", "strategie", "qcm"],
  },

  {
    kind: "template",
    id: "cm1_table_6_tpl_1_produit_direct",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_6",
    difficulty: 2,
    theme: "neutral",
    hint: "Utilise la table de 6.",
    tags: ["cm1", "tables", "table_6", "template", "canvas"],
    generate: () => genProduit(6, randomInt(2, 10), true),
  },

  {
    kind: "template",
    id: "cm1_table_6_tpl_2_facteur_manquant",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_6",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche dans la table de 6.",
    tags: ["cm1", "tables", "table_6", "facteur_manquant", "template"],
    generate: () => genFacteur(6, randomInt(2, 10)),
  },

  {
    kind: "template",
    id: "cm1_table_6_tpl_3_qcm_resultat",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_6",
    difficulty: 2,
    theme: "neutral",
    hint: "Calcule le produit demandé.",
    tags: ["cm1", "tables", "table_6", "qcm", "template"],
    generate: () => genProduitQcm(6, randomInt(3, 10)),
  },

  {
    kind: "template",
    id: "cm1_table_6_tpl_4_reunion_paniers",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_6",
    difficulty: 3,
    theme: "reunion",
    hint: "Chaque panier contient 6 fruits.",
    tags: ["cm1", "tables", "table_6", "reunion", "marche", "template"],
    generate: () => genGroupes(6, randomInt(3, 10), [DECORS.paniersFruits]),
  },

  // ============================================================
  // TABLE_7
  // Connaître la table de 7
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_table_7_fixed_1_produit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_7",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 7 × 4",
    format: "short",
    expected: ["28"],
    comparator: "number_equal",
    hint: "7 × 4, c’est aussi 4 × 7.",
    explanation: exp(
      "La table de 7 permet de compter de 7 en 7.",
      "On cherche 4 groupes de 7.",
      "7 × 4 = 28.",
      "La réponse est 28."
    ),
    canvas: miniTableCanvas({
      table: 7,
      multiplicateurs: [2, 3, 4, 5, 6],
      missing: 4,
      title: "Table de 7",
      questionLabel: "Le résultat de 7 × 4 est caché.",
    }),
    tags: ["cm1", "tables", "table_7", "produit", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_table_7_fixed_2_produit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_7",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 7 × 8",
    format: "short",
    expected: ["56"],
    comparator: "number_equal",
    hint: "Tu peux utiliser 8 × 7 si tu le connais mieux.",
    explanation: exp(
      "Dans une multiplication, on peut changer l’ordre des facteurs.",
      "On utilise la table de 7 ou la table de 8.",
      "7 × 8 = 56.",
      "La réponse est 56."
    ),
    tags: ["cm1", "tables", "table_7", "commutativite"],
  },

  {
    kind: "fixed",
    id: "cm1_table_7_fixed_3_trou",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_7",
    difficulty: 3,
    theme: "neutral",
    text: "Complète : 7 × ? = 63",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "Cherche dans la table de 7.",
    explanation: exp(
      "Une multiplication à trou demande de retrouver le facteur manquant.",
      "On cherche quel nombre multiplié par 7 donne 63.",
      "7 × 9 = 63.",
      "Le nombre manquant est 9."
    ),
    canvas: miniTableCanvas({
      table: 7,
      multiplicateurs: [6, 7, 8, 9, 10],
      missing: 9,
      title: "Table de 7 à trou",
      questionLabel: "Quelle ligne donne 63 ?",
    }),
    tags: ["cm1", "tables", "table_7", "facteur_manquant", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_table_7_fixed_4_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_7",
    difficulty: 2,
    theme: "neutral",
    text: "Quel calcul donne 49 ?",
    format: "qcm",
    choices: ["7 × 7", "7 × 6", "7 × 8", "6 × 9"],
    expected: ["7 × 7"],
    comparator: "mcq_exact",
    hint: "Cherche dans la table de 7.",
    explanation: exp(
      "Un produit est le résultat d’une multiplication.",
      "On cherche le calcul qui donne 49.",
      "7 × 7 = 49.",
      "Le bon calcul est 7 × 7."
    ),
    tags: ["cm1", "tables", "table_7", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_table_7_fixed_5_erreur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_7",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève affirme que 7 × 6 = 40. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Vérifie la table de 7 ou la table de 6.",
    explanation: exp(
      "Il faut vérifier précisément les résultats d’une table.",
      "On calcule 7 × 6.",
      "7 × 6 = 42, et non 40.",
      "L’élève n’a pas raison."
    ),
    tags: ["cm1", "tables", "table_7", "erreur", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_table_7_fixed_6_lien_division",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_7",
    difficulty: 3,
    theme: "neutral",
    text: "Si 7 × 8 = 56, alors combien vaut 56 ÷ 7 ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "La division est liée à la multiplication.",
    explanation: exp(
      "Les tables de multiplication aident à retrouver des divisions.",
      "Si 7 × 8 = 56, alors 56 partagé en groupes de 7 donne 8 groupes.",
      "56 ÷ 7 = 8.",
      "La réponse est 8."
    ),
    tags: ["cm1", "tables", "table_7", "division", "lien"],
  },

  {
    kind: "fixed",
    id: "cm1_table_7_fixed_7_strategie_5_plus_2",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_7",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle stratégie peut aider à calculer 7 × 8 ?",
    format: "qcm",
    choices: [
      "faire 5 × 8 puis ajouter 2 × 8",
      "faire 7 + 8",
      "faire 8 - 7",
      "faire 7 × 10 puis ajouter 8",
    ],
    expected: ["faire 5 × 8 puis ajouter 2 × 8"],
    comparator: "mcq_exact",
    hint: "7 groupes, c’est 5 groupes plus 2 groupes.",
    explanation: exp(
      "Une stratégie peut utiliser des tables déjà bien connues.",
      "On peut décomposer 7 en 5 + 2.",
      "7 × 8 = 5 × 8 + 2 × 8 = 40 + 16 = 56.",
      "La stratégie correcte est de faire 5 × 8 puis ajouter 2 × 8."
    ),
    tags: ["cm1", "tables", "table_7", "strategie", "qcm"],
  },

  {
    kind: "template",
    id: "cm1_table_7_tpl_1_produit_direct",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_7",
    difficulty: 2,
    theme: "neutral",
    hint: "Utilise la table de 7.",
    tags: ["cm1", "tables", "table_7", "template", "canvas"],
    generate: () => genProduit(7, randomInt(2, 10), true),
  },

  {
    kind: "template",
    id: "cm1_table_7_tpl_2_facteur_manquant",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_7",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche dans la table de 7.",
    tags: ["cm1", "tables", "table_7", "facteur_manquant", "template"],
    generate: () => genFacteur(7, randomInt(2, 10)),
  },

  {
    kind: "template",
    id: "cm1_table_7_tpl_3_qcm_resultat",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_7",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule le produit demandé.",
    tags: ["cm1", "tables", "table_7", "qcm", "template"],
    generate: () => genProduitQcm(7, randomInt(3, 10)),
  },

  {
    kind: "template",
    id: "cm1_table_7_tpl_4_reunion_sortie",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_7",
    difficulty: 3,
    theme: "reunion",
    hint: "Chaque équipe a 7 bouteilles.",
    tags: ["cm1", "tables", "table_7", "reunion", "sortie", "template"],
    generate: () => genGroupes(7, randomInt(3, 10), [DECORS.bouteilles]),
  },
    // ============================================================
  // TABLE_8
  // Connaître la table de 8
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_table_8_fixed_1_produit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_8",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 8 × 4",
    format: "short",
    expected: ["32"],
    comparator: "number_equal",
    hint: "Tu peux utiliser 4 × 8 si tu le connais mieux.",
    explanation: exp(
      "La table de 8 permet de compter de 8 en 8.",
      "On cherche 4 groupes de 8.",
      "8 × 4 = 32.",
      "La réponse est 32."
    ),
    canvas: miniTableCanvas({
      table: 8,
      multiplicateurs: [2, 3, 4, 5, 6],
      missing: 4,
      title: "Table de 8",
      questionLabel: "Le résultat de 8 × 4 est caché.",
    }),
    tags: ["cm1", "tables", "table_8", "produit", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_table_8_fixed_2_produit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_8",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 8 × 7",
    format: "short",
    expected: ["56"],
    comparator: "number_equal",
    hint: "8 × 7, c’est aussi 7 × 8.",
    explanation: exp(
      "Dans une multiplication, on peut changer l’ordre des facteurs.",
      "On utilise la table de 8 ou la table de 7.",
      "8 × 7 = 56.",
      "La réponse est 56."
    ),
    tags: ["cm1", "tables", "table_8", "commutativite"],
  },

  {
    kind: "fixed",
    id: "cm1_table_8_fixed_3_trou",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_8",
    difficulty: 3,
    theme: "neutral",
    text: "Complète : 8 × ? = 64",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Cherche dans la table de 8.",
    explanation: exp(
      "Une multiplication à trou demande de retrouver le facteur manquant.",
      "On cherche quel nombre multiplié par 8 donne 64.",
      "8 × 8 = 64.",
      "Le nombre manquant est 8."
    ),
    canvas: miniTableCanvas({
      table: 8,
      multiplicateurs: [6, 7, 8, 9, 10],
      missing: 8,
      title: "Table de 8 à trou",
      questionLabel: "Quelle ligne donne 64 ?",
    }),
    tags: ["cm1", "tables", "table_8", "facteur_manquant", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_table_8_fixed_4_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_8",
    difficulty: 2,
    theme: "neutral",
    text: "Quel calcul donne 72 ?",
    format: "qcm",
    choices: ["8 × 9", "8 × 8", "8 × 7", "7 × 9"],
    expected: ["8 × 9"],
    comparator: "mcq_exact",
    hint: "Cherche dans la table de 8.",
    explanation: exp(
      "Un produit est le résultat d’une multiplication.",
      "On cherche le calcul qui donne 72.",
      "8 × 9 = 72.",
      "Le bon calcul est 8 × 9."
    ),
    tags: ["cm1", "tables", "table_8", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_table_8_fixed_5_erreur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_8",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève affirme que 8 × 6 = 46. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Vérifie la table de 8 ou la table de 6.",
    explanation: exp(
      "Il faut vérifier précisément les résultats d’une table.",
      "On calcule 8 × 6.",
      "8 × 6 = 48, et non 46.",
      "L’élève n’a pas raison."
    ),
    tags: ["cm1", "tables", "table_8", "erreur", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_table_8_fixed_6_lien_division",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_8",
    difficulty: 3,
    theme: "neutral",
    text: "Si 8 × 7 = 56, alors combien vaut 56 ÷ 8 ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "La division est liée à la multiplication.",
    explanation: exp(
      "Les tables de multiplication aident à retrouver des divisions.",
      "Si 8 × 7 = 56, alors 56 partagé en groupes de 8 donne 7 groupes.",
      "56 ÷ 8 = 7.",
      "La réponse est 7."
    ),
    tags: ["cm1", "tables", "table_8", "division", "lien"],
  },

  {
    kind: "fixed",
    id: "cm1_table_8_fixed_7_strategie_double_double_double",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_8",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle stratégie peut aider à calculer 8 × 6 ?",
    format: "qcm",
    choices: [
      "doubler 6, puis doubler encore, puis doubler encore",
      "faire 8 + 6",
      "faire 8 - 6",
      "faire 8 × 10 puis ajouter 6",
    ],
    expected: ["doubler 6, puis doubler encore, puis doubler encore"],
    comparator: "mcq_exact",
    hint: "8 = 2 × 2 × 2.",
    explanation: exp(
      "La table de 8 peut se construire avec des doubles successifs.",
      "On double 6 trois fois.",
      "6 → 12 → 24 → 48.",
      "Donc 8 × 6 = 48."
    ),
    tags: ["cm1", "tables", "table_8", "strategie", "qcm"],
  },

  {
    kind: "template",
    id: "cm1_table_8_tpl_1_produit_direct",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_8",
    difficulty: 2,
    theme: "neutral",
    hint: "Utilise la table de 8.",
    tags: ["cm1", "tables", "table_8", "template", "canvas"],
    generate: () => genProduit(8, randomInt(2, 10), true),
  },

  {
    kind: "template",
    id: "cm1_table_8_tpl_2_facteur_manquant",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_8",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche dans la table de 8.",
    tags: ["cm1", "tables", "table_8", "facteur_manquant", "template"],
    generate: () => genFacteur(8, randomInt(2, 10)),
  },

  {
    kind: "template",
    id: "cm1_table_8_tpl_3_qcm_resultat",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_8",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule le produit demandé.",
    tags: ["cm1", "tables", "table_8", "qcm", "template"],
    generate: () => genProduitQcm(8, randomInt(3, 10)),
  },

  {
    kind: "template",
    id: "cm1_table_8_tpl_4_reunion_equipes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_8",
    difficulty: 3,
    theme: "reunion",
    hint: "Chaque équipe a 8 objets.",
    tags: ["cm1", "tables", "table_8", "reunion", "sport", "template"],
    generate: () => genGroupes(8, randomInt(3, 10), [DECORS.plots]),
  },

  // ============================================================
  // TABLE_9
  // Connaître la table de 9
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_table_9_fixed_1_produit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_9",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 9 × 4",
    format: "short",
    expected: ["36"],
    comparator: "number_equal",
    hint: "Tu peux faire 10 × 4 puis enlever 4.",
    explanation: exp(
      "La table de 9 peut se calculer à partir de la table de 10.",
      "On fait 10 fois le nombre, puis on enlève une fois ce nombre.",
      "10 × 4 = 40, puis 40 - 4 = 36.",
      "Donc 9 × 4 = 36."
    ),
    canvas: miniTableCanvas({
      table: 9,
      multiplicateurs: [2, 3, 4, 5, 6],
      missing: 4,
      title: "Table de 9",
      questionLabel: "Le résultat de 9 × 4 est caché.",
    }),
    tags: ["cm1", "tables", "table_9", "produit", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_table_9_fixed_2_produit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_9",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 9 × 8",
    format: "short",
    expected: ["72"],
    comparator: "number_equal",
    hint: "Tu peux faire 10 × 8 puis enlever 8.",
    explanation: exp(
      "Multiplier par 9 peut se faire avec une stratégie.",
      "On multiplie par 10 puis on enlève une fois le nombre.",
      "10 × 8 = 80, puis 80 - 8 = 72.",
      "Donc 9 × 8 = 72."
    ),
    tags: ["cm1", "tables", "table_9", "strategie"],
  },

  {
    kind: "fixed",
    id: "cm1_table_9_fixed_3_trou",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_9",
    difficulty: 3,
    theme: "neutral",
    text: "Complète : 9 × ? = 81",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "Cherche dans la table de 9.",
    explanation: exp(
      "Une multiplication à trou demande de retrouver le facteur manquant.",
      "On cherche quel nombre multiplié par 9 donne 81.",
      "9 × 9 = 81.",
      "Le nombre manquant est 9."
    ),
    canvas: miniTableCanvas({
      table: 9,
      multiplicateurs: [6, 7, 8, 9, 10],
      missing: 9,
      title: "Table de 9 à trou",
      questionLabel: "Quelle ligne donne 81 ?",
    }),
    tags: ["cm1", "tables", "table_9", "facteur_manquant", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_table_9_fixed_4_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_9",
    difficulty: 2,
    theme: "neutral",
    text: "Quel calcul donne 63 ?",
    format: "qcm",
    choices: ["9 × 7", "9 × 6", "9 × 8", "8 × 7"],
    expected: ["9 × 7"],
    comparator: "mcq_exact",
    hint: "Cherche dans la table de 9.",
    explanation: exp(
      "Un produit est le résultat d’une multiplication.",
      "On cherche le calcul qui donne 63.",
      "9 × 7 = 63.",
      "Le bon calcul est 9 × 7."
    ),
    tags: ["cm1", "tables", "table_9", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_table_9_fixed_5_erreur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_9",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève affirme que 9 × 6 = 56. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Tu peux faire 10 × 6 puis enlever 6.",
    explanation: exp(
      "Il faut vérifier précisément les résultats d’une table.",
      "On calcule 9 × 6.",
      "10 × 6 = 60, puis 60 - 6 = 54.",
      "Donc 9 × 6 = 54, et non 56."
    ),
    tags: ["cm1", "tables", "table_9", "erreur", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_table_9_fixed_6_lien_division",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_9",
    difficulty: 3,
    theme: "neutral",
    text: "Si 9 × 7 = 63, alors combien vaut 63 ÷ 9 ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "La division est liée à la multiplication.",
    explanation: exp(
      "Les tables de multiplication aident à retrouver des divisions.",
      "Si 9 × 7 = 63, alors 63 partagé en groupes de 9 donne 7 groupes.",
      "63 ÷ 9 = 7.",
      "La réponse est 7."
    ),
    tags: ["cm1", "tables", "table_9", "division", "lien"],
  },

  {
    kind: "fixed",
    id: "cm1_table_9_fixed_7_strategie_10_moins_1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_9",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle stratégie peut aider à calculer 9 × 8 ?",
    format: "qcm",
    choices: [
      "faire 10 × 8 puis enlever 8",
      "faire 9 + 8",
      "faire 10 × 8 puis ajouter 8",
      "faire 9 × 10 puis ajouter 8",
    ],
    expected: ["faire 10 × 8 puis enlever 8"],
    comparator: "mcq_exact",
    hint: "9 fois, c’est 10 fois moins 1 fois.",
    explanation: exp(
      "Multiplier par 9 peut se calculer à partir de la table de 10.",
      "9 fois un nombre, c’est 10 fois ce nombre moins 1 fois ce nombre.",
      "10 × 8 = 80, puis 80 - 8 = 72.",
      "La bonne stratégie est de faire 10 × 8 puis enlever 8."
    ),
    tags: ["cm1", "tables", "table_9", "strategie", "qcm"],
  },

  {
    kind: "template",
    id: "cm1_table_9_tpl_1_produit_direct",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_9",
    difficulty: 2,
    theme: "neutral",
    hint: "Utilise la table de 9 ou la stratégie ×10 puis - le nombre.",
    tags: ["cm1", "tables", "table_9", "template", "canvas"],
    generate: () => genProduit(9, randomInt(2, 10), true),
  },

  {
    kind: "template",
    id: "cm1_table_9_tpl_2_facteur_manquant",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_9",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche dans la table de 9.",
    tags: ["cm1", "tables", "table_9", "facteur_manquant", "template"],
    generate: () => genFacteur(9, randomInt(2, 10)),
  },

  {
    kind: "template",
    id: "cm1_table_9_tpl_3_qcm_resultat",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_9",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule le produit demandé.",
    tags: ["cm1", "tables", "table_9", "qcm", "template"],
    generate: () => genProduitQcm(9, randomInt(3, 10)),
  },

  {
    kind: "template",
    id: "cm1_table_9_tpl_4_jeu_video",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_9",
    difficulty: 3,
    theme: "jeux_video",
    hint: "Chaque niveau donne 9 pièces.",
    tags: ["cm1", "tables", "table_9", "jeu_video", "template"],
    generate: () => genTaux(9, randomInt(3, 10), TAUX_JEUX),
  },

  // ============================================================
  // TABLE_10
  // Connaître la table de 10
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_table_10_fixed_1_produit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_10",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 10 × 6",
    format: "short",
    expected: ["60"],
    comparator: "number_equal",
    hint: "10 × 6, c'est 6 dizaines.",
    explanation: exp(
      "La table de 10 est une table très régulière.",
      "Multiplier par 10, c'est transformer chaque unité en dizaine.",
      "10 × 6, c'est 6 dizaines : 60.",
      "La réponse est 60."
    ),
    canvas: miniTableCanvas({
      table: 10,
      multiplicateurs: [4, 5, 6, 7, 8],
      missing: 6,
      title: "Table de 10",
      questionLabel: "Le résultat de 10 × 6 est caché.",
    }),
    tags: ["cm1", "tables", "table_10", "produit", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_table_10_fixed_2_produit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_10",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 10 × 9",
    format: "short",
    expected: ["90"],
    comparator: "number_equal",
    hint: "10 × 9, c'est 9 dizaines.",
    explanation: exp(
      "La table de 10 permet de compter de 10 en 10.",
      "Multiplier par 10, c'est transformer chaque unité en dizaine.",
      "10 × 9, c'est 9 dizaines : 90.",
      "La réponse est 90."
    ),
    tags: ["cm1", "tables", "table_10", "produit"],
  },

  {
    kind: "fixed",
    id: "cm1_table_10_fixed_3_trou",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_10",
    difficulty: 1,
    theme: "neutral",
    text: "Complète : 10 × ? = 80",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Cherche dans la table de 10.",
    explanation: exp(
      "Une multiplication à trou demande de retrouver le facteur manquant.",
      "On cherche quel nombre multiplié par 10 donne 80.",
      "10 × 8 = 80.",
      "Le nombre manquant est 8."
    ),
    canvas: miniTableCanvas({
      table: 10,
      multiplicateurs: [6, 7, 8, 9, 10],
      missing: 8,
      title: "Table de 10 à trou",
      questionLabel: "Quelle ligne donne 80 ?",
    }),
    tags: ["cm1", "tables", "table_10", "facteur_manquant", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_table_10_fixed_4_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_10",
    difficulty: 1,
    theme: "neutral",
    text: "Quel résultat appartient à la table de 10 ?",
    format: "qcm",
    choices: ["70", "72", "75", "77"],
    expected: ["70"],
    comparator: "mcq_exact",
    hint: "Les résultats de la table de 10 finissent par 0.",
    explanation: exp(
      "Les résultats de la table de 10 se terminent tous par 0 : ce sont des dizaines entières.",
      "On cherche un nombre qui peut s’écrire 10 × un entier.",
      "70 = 10 × 7.",
      "70 appartient à la table de 10."
    ),
    tags: ["cm1", "tables", "table_10", "multiple", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_table_10_fixed_5_erreur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_10",
    difficulty: 2,
    theme: "neutral",
    text: "Un élève affirme que 10 × 8 = 18. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "10 × 8 veut dire 8 dizaines.",
    explanation: exp(
      "Il faut distinguer multiplication et addition.",
      "10 × 8 ne veut pas dire 10 + 8.",
      "10 × 8 = 80, et non 18.",
      "L’élève n’a pas raison."
    ),
    tags: ["cm1", "tables", "table_10", "erreur", "confusion_addition", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_table_10_fixed_6_lien_division",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_10",
    difficulty: 2,
    theme: "neutral",
    text: "Si 10 × 7 = 70, alors combien vaut 70 ÷ 10 ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "La division est liée à la multiplication.",
    explanation: exp(
      "Les tables de multiplication aident à retrouver des divisions.",
      "Si 10 × 7 = 70, alors 70 partagé en groupes de 10 donne 7 groupes.",
      "70 ÷ 10 = 7.",
      "La réponse est 7."
    ),
    tags: ["cm1", "tables", "table_10", "division", "lien"],
  },

  {
    kind: "template",
    id: "cm1_table_10_tpl_1_produit_direct",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_10",
    difficulty: 1,
    theme: "neutral",
    hint: "Multiplier par 10, c'est transformer chaque unité en dizaine.",
    tags: ["cm1", "tables", "table_10", "template", "canvas"],
    generate: () => genProduit(10, randomInt(2, 10), true),
  },

  {
    kind: "template",
    id: "cm1_table_10_tpl_2_facteur_manquant",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_10",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche dans la table de 10.",
    tags: ["cm1", "tables", "table_10", "facteur_manquant", "template"],
    generate: () => genFacteur(10, randomInt(2, 10)),
  },

  {
    kind: "template",
    id: "cm1_table_10_tpl_3_qcm_resultat",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_10",
    difficulty: 2,
    theme: "neutral",
    hint: "Calcule le produit demandé.",
    tags: ["cm1", "tables", "table_10", "qcm", "template"],
    generate: () => genProduitQcm(10, randomInt(3, 10)),
  },

  {
    kind: "template",
    id: "cm1_table_10_tpl_4_reunion_cartons",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_10",
    difficulty: 2,
    theme: "reunion",
    hint: "Chaque carton contient 10 fruits.",
    tags: ["cm1", "tables", "table_10", "reunion", "marche", "template"],
    generate: () => genGroupes(10, randomInt(3, 10), [DECORS.cartonsFruits]),
  },
    // ============================================================
  // TABLES_MELANGEES
  // Réviser les tables mélangées
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_tables_melangees_fixed_1_produit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_melangees",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule : 7 × 8",
    format: "short",
    expected: ["56"],
    comparator: "number_equal",
    hint: "Tu peux utiliser la table de 7 ou la table de 8.",
    explanation: exp(
      "Les tables mélangées demandent de reconnaître rapidement la bonne table.",
      "On peut utiliser la commutativité : 7 × 8 = 8 × 7.",
      "7 × 8 = 56.",
      "La réponse est 56."
    ),
    canvas: tableCanvas({
      table: 7,
      multiplicateur: 8,
      title: "Table de 7",
      questionLabel: "Retrouve le résultat de 7 × 8.",
    }),
    tags: ["cm1", "tables", "melangees", "produit", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_tables_melangees_fixed_2_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_melangees",
    difficulty: 3,
    theme: "neutral",
    text: "Quel calcul donne 48 ?",
    format: "qcm",
    choices: ["6 × 8", "7 × 8", "8 × 8", "9 × 6"],
    expected: ["6 × 8"],
    comparator: "mcq_exact",
    hint: "Cherche dans les tables de 6 et de 8.",
    explanation: exp(
      "Un produit peut apparaître dans plusieurs tables, mais il faut trouver un calcul correct.",
      "On vérifie les propositions.",
      "6 × 8 = 48.",
      "Le bon calcul est 6 × 8."
    ),
    tags: ["cm1", "tables", "melangees", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_tables_melangees_fixed_3_commutativite",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_melangees",
    difficulty: 3,
    theme: "neutral",
    text: "Quel calcul donne le même résultat que 9 × 6 ?",
    format: "qcm",
    choices: ["6 × 9", "9 + 6", "9 × 9", "6 × 6"],
    expected: ["6 × 9"],
    comparator: "mcq_exact",
    hint: "Dans une multiplication, on peut échanger les facteurs.",
    explanation: exp(
      "La multiplication est commutative.",
      "Cela signifie qu’on peut changer l’ordre des facteurs.",
      "9 × 6 = 6 × 9 = 54.",
      "Le calcul équivalent est 6 × 9."
    ),
    tags: ["cm1", "tables", "melangees", "commutativite", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_tables_melangees_fixed_4_erreur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_melangees",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève affirme que 8 × 9 = 70. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Tu peux faire 9 × 8 : 10 × 8 puis enlever 8.",
    explanation: exp(
      "Une table mélangée doit être vérifiée avec méthode.",
      "On peut utiliser la stratégie de la table de 9.",
      "10 × 8 = 80, puis 80 - 8 = 72. Donc 9 × 8 = 72.",
      "L’élève n’a pas raison."
    ),
    tags: ["cm1", "tables", "melangees", "erreur", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_tables_melangees_fixed_5_lien_division",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_melangees",
    difficulty: 4,
    theme: "neutral",
    text: "Si 8 × 9 = 72, alors combien vaut 72 ÷ 9 ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "La division inverse la multiplication.",
    explanation: exp(
      "Les tables mélangées aident aussi à retrouver des divisions.",
      "On utilise le lien entre multiplication et division.",
      "8 × 9 = 72, donc 72 ÷ 9 = 8.",
      "La réponse est 8."
    ),
    tags: ["cm1", "tables", "melangees", "division", "lien"],
  },

  {
    kind: "template",
    id: "cm1_tables_melangees_tpl_1_produit_direct",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_melangees",
    difficulty: 3,
    theme: "neutral",
    hint: "Repère la table la plus facile pour toi.",
    tags: ["cm1", "tables", "melangees", "produit", "template", "canvas"],
    generate: () => genProduit(randomInt(2, 10), randomInt(2, 10), true),
  },

  {
    kind: "template",
    id: "cm1_tables_melangees_tpl_2_qcm_resultat",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_melangees",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule avant de choisir.",
    tags: ["cm1", "tables", "melangees", "qcm", "template"],
    generate: () => genProduitQcm(randomInt(4, 9), randomInt(4, 9)),
  },

  {
    kind: "template",
    id: "cm1_tables_melangees_tpl_3_reunion_marche",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_melangees",
    difficulty: 3,
    theme: "reunion",
    hint: "Chaque panier contient le même nombre de fruits.",
    tags: ["cm1", "tables", "melangees", "reunion", "marche", "template"],
    generate: () => genGroupes(randomInt(4, 9), randomInt(4, 9), [DECORS.paniersFruits]),
  },

  {
    kind: "template",
    id: "cm1_tables_melangees_tpl_4_erreur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_melangees",
    difficulty: 4,
    theme: "neutral",
    hint: "Vérifie le calcul proposé.",
    tags: ["cm1", "tables", "melangees", "erreur", "template"],
    generate: () => genAffirmation(randomInt(6, 9), randomInt(6, 9)),
  },

  // ============================================================
  // TABLES_TROUS
  // Retrouver un facteur manquant
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_tables_trous_fixed_1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_trous",
    difficulty: 3,
    theme: "neutral",
    text: "Complète : 8 × ? = 56",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Cherche quel nombre multiplié par 8 donne 56.",
    explanation: exp(
      "Une multiplication à trou demande de retrouver un facteur manquant.",
      "On cherche dans la table de 8.",
      "8 × 7 = 56.",
      "Le nombre manquant est 7."
    ),
    canvas: miniTableCanvas({
      table: 8,
      multiplicateurs: [5, 6, 7, 8, 9],
      missing: 7,
      title: "Table de 8 à trou",
      questionLabel: "Quelle ligne donne 56 ?",
    }),
    tags: ["cm1", "tables", "trous", "facteur_manquant", "canvas"],
  },

  {
    kind: "fixed",
    id: "cm1_tables_trous_fixed_2",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_trous",
    difficulty: 3,
    theme: "neutral",
    text: "Complète : ? × 8 = 48",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Cherche quel nombre multiplié par 8 donne 48.",
    explanation: exp(
      "Le facteur manquant peut être placé au début de la multiplication.",
      "On cherche dans la table de 8 : 8, 16, 24, 32, 40, 48.",
      "48 est le sixième nombre de la table : 6 × 8 = 48.",
      "Le nombre manquant est 6."
    ),
    tags: ["cm1", "tables", "trous", "facteur_manquant"],
  },

  {
    kind: "fixed",
    id: "cm1_tables_trous_fixed_3_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_trous",
    difficulty: 3,
    theme: "neutral",
    text: "Quel nombre complète : 6 × ? = 48 ?",
    format: "qcm",
    choices: ["8", "7", "9", "6"],
    expected: ["8"],
    comparator: "mcq_exact",
    hint: "Cherche dans la table de 6.",
    explanation: exp(
      "Une multiplication à trou peut être résolue avec les tables.",
      "On cherche quel facteur donne 48 avec 6.",
      "6 × 8 = 48.",
      "Le nombre manquant est 8."
    ),
    tags: ["cm1", "tables", "trous", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_tables_trous_fixed_4_lien_division",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_trous",
    difficulty: 4,
    theme: "neutral",
    text: "Pour compléter 7 × ? = 42, quelle division peut aider ?",
    format: "qcm",
    choices: ["42 ÷ 7", "42 + 7", "42 - 7", "42 × 7"],
    expected: ["42 ÷ 7"],
    comparator: "mcq_exact",
    hint: "La division permet de retrouver un facteur manquant.",
    explanation: exp(
      "Une multiplication à trou est liée à une division.",
      "Pour retrouver le facteur manquant, on peut diviser le produit par le facteur connu.",
      "42 ÷ 7 = 6.",
      "La division utile est 42 ÷ 7."
    ),
    tags: ["cm1", "tables", "trous", "division", "qcm"],
  },

  {
    kind: "template",
    id: "cm1_tables_trous_tpl_1_facteur_manquant_droite",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_trous",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche dans la table du nombre donné.",
    tags: ["cm1", "tables", "trous", "facteur_manquant", "template", "canvas"],
    generate: () => {
      const a = randomInt(4, 9);
      const manquant = randomInt(3, 10);
      return {
        ...genFacteur(a, manquant, "droite"),
        canvas: miniTableCanvas({
          table: a,
          multiplicateurs: voisinsDe(manquant),
          missing: manquant,
          title: `Table de ${a} à trou`,
          questionLabel: `Quelle ligne donne ${a * manquant} ?`,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_tables_trous_tpl_2_facteur_manquant_gauche",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_trous",
    difficulty: 3,
    theme: "neutral",
    hint: "Tu peux échanger l’ordre des facteurs.",
    tags: ["cm1", "tables", "trous", "commutativite", "template"],
    generate: () => genFacteur(randomInt(4, 9), randomInt(3, 10), "gauche"),
  },

  {
    kind: "template",
    id: "cm1_tables_trous_tpl_3_qcm",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_trous",
    difficulty: 4,
    theme: "neutral",
    hint: "Teste chaque facteur proposé.",
    tags: ["cm1", "tables", "trous", "qcm", "template"],
    generate: () => genFacteurQcm(randomInt(6, 9), randomInt(4, 9)),
  },

  // ============================================================
  // TABLES_DEFI
  // Résoudre un défi sur les tables
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_tables_defi_fixed_1_tresor",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Défi trésor : 8 coffres contiennent chacun 7 pièces. Combien y a-t-il de pièces au total ?",
    format: "short",
    expected: ["56"],
    comparator: "number_equal",
    hint: "Utilise 8 × 7.",
    explanation: exp(
      "Un défi de tables peut représenter des groupes égaux.",
      "On multiplie le nombre de coffres par le nombre de pièces dans chaque coffre.",
      "8 × 7 = 56.",
      "Il y a 56 pièces au total."
    ),
    tags: ["cm1", "tables", "defi", "tresor", "pieces"],
  },

  {
    kind: "fixed",
    id: "cm1_tables_defi_fixed_2_reunion_margouillats",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Défi margouillats : on observe 7 murs avec 6 margouillats sur chaque mur. Combien observe-t-on de margouillats en tout ?",
    format: "short",
    expected: ["42"],
    comparator: "number_equal",
    hint: "Même nombre sur chaque mur : utilise une multiplication.",
    explanation: exp(
      "Les tables servent à calculer rapidement des groupes égaux.",
      "On multiplie le nombre de murs par le nombre de margouillats sur chaque mur.",
      "7 × 6 = 42.",
      "On observe 42 margouillats en tout."
    ),
    tags: ["cm1", "tables", "defi", "reunion", "margouillat"],
  },

  {
    kind: "fixed",
    id: "cm1_tables_defi_fixed_3_erreur_operation",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève lit : « 9 sachets contiennent chacun 8 billes ». Il calcule 9 + 8 = 17. A-t-il choisi la bonne opération ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le mot « chacun » indique des groupes égaux.",
    explanation: exp(
      "Dans un problème, il faut choisir l’opération adaptée.",
      "Le mot « chacun » indique que la même quantité est répétée plusieurs fois.",
      "Il faut calculer 9 × 8 = 72, et non 9 + 8.",
      "L’élève n’a pas choisi la bonne opération."
    ),
    tags: ["cm1", "tables", "defi", "erreur", "choisir_operation", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_tables_defi_fixed_4_deux_tables",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Défi : calcule 6 × 7 puis 8 × 4. Quelle est la somme des deux résultats ?",
    format: "short",
    expected: ["74"],
    comparator: "number_equal",
    hint: "Calcule les deux produits puis additionne.",
    explanation: exp(
      "Un défi peut demander plusieurs calculs de tables.",
      "On calcule chaque produit, puis on additionne.",
      "6 × 7 = 42 et 8 × 4 = 32. Puis 42 + 32 = 74.",
      "La somme est 74."
    ),
    tags: ["cm1", "tables", "defi", "deux_etapes"],
  },

  {
    kind: "fixed",
    id: "cm1_tables_defi_fixed_5_canvas",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Défi tableau : retrouve le résultat de 9 × 7.",
    format: "short",
    expected: ["63"],
    comparator: "number_equal",
    hint: "Utilise la table de 9 ou fais 10 × 7 puis enlève 7.",
    explanation: exp(
      "On peut retrouver un produit avec une table ou une stratégie.",
      "Pour la table de 9, on peut utiliser 10 fois le nombre moins 1 fois le nombre.",
      "10 × 7 = 70, puis 70 - 7 = 63.",
      "9 × 7 = 63."
    ),
    canvas: tableCanvas({
      table: 9,
      multiplicateur: 7,
      title: "Défi table de 9",
      questionLabel: "Le résultat de 9 × 7 est caché.",
    }),
    tags: ["cm1", "tables", "defi", "canvas", "table_9"],
  },

  {
    kind: "template",
    id: "cm1_tables_defi_tpl_1_reunion_dechets",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_defi",
    difficulty: 4,
    theme: "reunion",
    hint: "Chaque équipe ramasse la même quantité.",
    tags: ["cm1", "tables", "defi", "reunion", "ecologie", "template"],
    generate: () => genDechets(randomInt(4, 9), randomInt(4, 9)),
  },

  {
    kind: "template",
    id: "cm1_tables_defi_tpl_2_jeu_video",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_defi",
    difficulty: 4,
    theme: "jeux_video",
    hint: "Chaque coffre donne le même nombre de pièces.",
    tags: ["cm1", "tables", "defi", "jeu_video", "template"],
    generate: () => genTaux(randomInt(4, 9), randomInt(4, 9), TAUX_JEUX),
  },

  {
    kind: "template",
    id: "cm1_tables_defi_tpl_3_deux_produits",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Calcule les deux multiplications, puis additionne.",
    tags: ["cm1", "tables", "defi", "deux_etapes", "template"],
    generate: () => genDeuxProduits(),
  },

  {
    kind: "template",
    id: "cm1_tables_defi_tpl_4_canvas_cache",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Utilise la table affichée.",
    tags: ["cm1", "tables", "defi", "canvas", "template"],
    generate: () => genTableauCache(randomInt(6, 9), randomInt(5, 9)),
  },

  {
    kind: "fixed",
    id: "cm1_tables_defi_open_1_expliquer",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique une stratégie pour retrouver un résultat de table que tu as oublié.",
    format: "open",
    expected: ["double", "fois", "table", "décomposer", "10"],
    comparator: "contains_keyword",
    hint: "Tu peux parler des doubles, de la table de 10, ou de la décomposition.",
    explanation: exp(
      "Il existe plusieurs stratégies pour retrouver un résultat oublié.",
      "On peut utiliser une table proche ou décomposer un facteur.",
      "Par exemple, pour 9 × 7, on peut faire 10 × 7 - 7. Pour 8 × 6, on peut doubler 6 trois fois.",
      "Une stratégie aide à retrouver un résultat sans apprendre mécaniquement."
    ),
    tags: ["cm1", "tables", "defi", "open", "strategie"],
  },

  // ============================================================
  // TOP-UP — TABLE_2
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_table_2_fixed_5_produit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_2",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 2 × 9",
    format: "short",
    expected: ["18"],
    comparator: "number_equal",
    hint: "La table de 2, ce sont les doubles.",
    explanation: exp(
      "La table de 2 permet de calculer les doubles.",
      "On cherche le double de 9.",
      "2 × 9 = 18.",
      "La réponse est 18."
    ),
    tags: ["cm1", "tables", "table_2", "double", "short"],
  },

  {
    kind: "fixed",
    id: "cm1_table_2_fixed_6_produit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_2",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 2 × 8",
    format: "short",
    expected: ["16"],
    comparator: "number_equal",
    hint: "La table de 2, ce sont les doubles.",
    explanation: exp(
      "La table de 2 permet de calculer les doubles.",
      "On cherche le double de 8.",
      "2 × 8 = 16.",
      "La réponse est 16."
    ),
    tags: ["cm1", "tables", "table_2", "double", "short"],
  },

  {
    kind: "fixed",
    id: "cm1_table_2_fixed_7_trou",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "table_2",
    difficulty: 1,
    theme: "neutral",
    text: "Complète : 2 × ? = 20",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "Cherche quel nombre a pour double 20.",
    explanation: exp(
      "Une multiplication à trou demande de retrouver le facteur manquant.",
      "On cherche le nombre qui, multiplié par 2, donne 20.",
      "2 × 10 = 20.",
      "Le nombre manquant est 10."
    ),
    tags: ["cm1", "tables", "table_2", "facteur_manquant", "short"],
  },

  // ============================================================
  // TOP-UP — TABLES_TROUS
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_tables_trous_fixed_5",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_trous",
    difficulty: 2,
    theme: "neutral",
    text: "Complète : 6 × ? = 42",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Cherche dans la table de 6.",
    explanation: exp(
      "Une multiplication à trou demande de retrouver le facteur manquant.",
      "On cherche le nombre qui, multiplié par 6, donne 42.",
      "6 × 7 = 42.",
      "Le nombre manquant est 7."
    ),
    tags: ["cm1", "tables", "tables_trous", "facteur_manquant", "short"],
  },

  {
    kind: "fixed",
    id: "cm1_tables_trous_fixed_6",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_trous",
    difficulty: 2,
    theme: "neutral",
    text: "Complète : ? × 8 = 56",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Cherche dans la table de 8.",
    explanation: exp(
      "On peut retrouver un facteur manquant à gauche du signe ×.",
      "On cherche le nombre qui, multiplié par 8, donne 56.",
      "7 × 8 = 56.",
      "Le nombre manquant est 7."
    ),
    tags: ["cm1", "tables", "tables_trous", "facteur_manquant", "short"],
  },

  {
    kind: "fixed",
    id: "cm1_tables_trous_fixed_7",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_trous",
    difficulty: 2,
    theme: "neutral",
    text: "Complète : 9 × ? = 81",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "Cherche dans la table de 9.",
    explanation: exp(
      "Une multiplication à trou demande de retrouver le facteur manquant.",
      "On cherche le nombre qui, multiplié par 9, donne 81.",
      "9 × 9 = 81.",
      "Le nombre manquant est 9."
    ),
    tags: ["cm1", "tables", "tables_trous", "facteur_manquant", "short"],
  },

  // ============================================================
  // TOP-UP — TABLES_MELANGEES
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_tables_melangees_fixed_6_produit",
    niveau: "cm1",
    matiere: "maths",
    notionId: "tables_multiplication",
    microId: "tables_melangees",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 6 × 9",
    format: "short",
    expected: ["54"],
    comparator: "number_equal",
    hint: "Si tu hésites, pars de 6 × 10 = 60 et enlève un 6.",
    explanation: exp(
      "Les tables mélangées demandent de connaître plusieurs tables.",
      "On cherche le produit de 6 par 9. Astuce : 6 × 9, c’est 6 × 10 moins 6.",
      "6 × 10 = 60, puis 60 - 6 = 54.",
      "La réponse est 54."
    ),
    tags: ["cm1", "tables", "tables_melangees", "short"],
  },

  // ============================================================
  // GABARITS PARTAGÉS (05/10/2026) — les familles du réservoir, installées
  // micro par micro. Une table à deux étoiles reçoit l'entraînement ET
  // l'approfondissement à sa deuxième étoile.
  // ============================================================

  ...gabaritsTable(2, { decouverte: 1, entrainement: 2, approfondissement: 2 }),
  ...gabaritsTable(3, { decouverte: 1, entrainement: 2, approfondissement: 3 }),
  ...gabaritsTable(4, { decouverte: 1, entrainement: 2, approfondissement: 3 }),
  ...gabaritsTable(5, { decouverte: 1, entrainement: 2, approfondissement: 3 }),
  ...gabaritsTable(6, { decouverte: 2, entrainement: 3, approfondissement: 3 }),
  ...gabaritsTable(7, { decouverte: 2, entrainement: 3, approfondissement: 3 }),
  ...gabaritsTable(8, { decouverte: 2, entrainement: 3, approfondissement: 3 }),
  ...gabaritsTable(9, { decouverte: 2, entrainement: 3, approfondissement: 3 }),
  ...gabaritsTable(10, { decouverte: 1, entrainement: 2, approfondissement: 2 }),

  // TABLES_MELANGEES : des facteurs de plus en plus « durs » d'une étoile à l'autre.
  ...gabaritsFamilles({
    microId: "tables_melangees",
    prefixe: "cm1_tables_melangees_tpl_decouverte",
    difficulty: 2,
    tags: ["cm1", "tables", "melangees"],
    familles: PALIERS.decouverte,
    tirer: paire(2, 10),
  }),
  ...gabaritsFamilles({
    microId: "tables_melangees",
    prefixe: "cm1_tables_melangees_tpl_entrainement",
    difficulty: 3,
    tags: ["cm1", "tables", "melangees"],
    familles: PALIERS.entrainement,
    tirer: paire(3, 9),
  }),
  ...gabaritsFamilles({
    microId: "tables_melangees",
    prefixe: "cm1_tables_melangees_tpl_approfondissement",
    difficulty: 4,
    tags: ["cm1", "tables", "melangees"],
    familles: PALIERS.approfondissement,
    tirer: paire(6, 9),
  }),

  // TABLES_TROUS : toujours le facteur manquant, pris par tous les bouts.
  ...gabaritsFamilles({
    microId: "tables_trous",
    prefixe: "cm1_tables_trous_tpl_etoile2",
    difficulty: 2,
    tags: ["cm1", "tables", "trous"],
    familles: [F.facteur, F.facteurQcm, F.groupesInverse, F.division, F.tauxInverse],
    tirer: () => [randomInt(2, 9), randomInt(2, 10)],
  }),
  ...gabaritsFamilles({
    microId: "tables_trous",
    prefixe: "cm1_tables_trous_tpl_etoile3",
    difficulty: 3,
    tags: ["cm1", "tables", "trous"],
    familles: [F.groupesInverse, F.tauxInverse, F.division, F.divisionAide],
    tirer: paire(3, 9),
  }),
  ...gabaritsFamilles({
    microId: "tables_trous",
    prefixe: "cm1_tables_trous_tpl_etoile4",
    difficulty: 4,
    tags: ["cm1", "tables", "trous"],
    familles: [F.facteur, F.tauxInverse, F.groupesInverse, F.divisionAide],
    tirer: paire(6, 9),
  }),

  // TABLES_DEFI : deux étapes, comparaisons, devinettes.
  ...gabaritsFamilles({
    microId: "tables_defi",
    prefixe: "cm1_tables_defi_tpl_etoile4",
    difficulty: 4,
    tags: ["cm1", "tables", "defi"],
    familles: [F.groupes, F.tauxInverse, F.devinetteEntre, F.reste, F.voisin],
    tirer: paire(4, 9),
  }),
  ...gabaritsFamilles({
    microId: "tables_defi",
    prefixe: "cm1_tables_defi_tpl_etoile5",
    difficulty: 5,
    tags: ["cm1", "tables", "defi"],
    familles: [F.monnaie, F.comparaison, F.devinetteCommun, F.reste],
    tirer: paire(4, 9),
  }),
];
