// lib/tutor-v4/questionBank/ce1/maths/multiplication.bank.ts
//
// La multiplication du CE1, écrite à la main.
//
// PÉRIMÈTRE BO (Annexe 4, programme de mathématiques du cycle 2) :
//   — comprendre la multiplication comme une addition répétée, et le mot
//     « fois » avant le symbole ;
//   — comprendre et utiliser le symbole « × », plus court que l'addition
//     répétée : le programme donne « 7 × 20 biscuits = 140 biscuits » ;
//   — savoir que la multiplication est COMMUTATIVE — huit colonnes de quatre
//     salades, ou quatre rangées de huit, c'est le même potager ;
//   — connaître la notion de PARITÉ : dire si un nombre est pair ou impair ;
//   — les tables s'apprennent toute l'année, progressivement. La mémorisation
//     peut être encore imparfaite en fin de CE1, elle sera renforcée au CE2.
//   — il n'y a PAS de multiplication posée au CE1.
//
// LE PIÈGE DE LA NOTION : confondre les deux nombres d'un produit. « 3 paquets
// de 7 biscuits » ne se lit pas « 7 paquets de 3 biscuits » — même résultat,
// mais pas la même histoire. C'est justement ce que la commutativité permet de
// comprendre, à condition de l'avoir vue.
//
// ⚠️ PAS DE QUESTION À RÉDIGER : `applyMathsKeyboardFree` retire les items
// `format: "open"`. Un CE1 clique, il ne tape pas.
//
// ⛔ LES SQUELETTES (05/10/2026). Les élèves réels sont des 6e en remédiation :
// ils reconnaissent la PHRASE, pas les nombres. « 3 paquets de 7 » et « 4
// paquets de 9 », c'est pour eux la même question. Chaque gabarit tire donc
// une FAMILLE (prendre la question par un autre bout : trouver un facteur,
// choisir le bon calcul, reconnaître un multiple…), puis une SITUATION et une
// TOURNURE. Mesure : scripts/mesurer-squelettes-coach.ts ce1 multiplication.
// Les décors restent ceux de tous les jours, pas enfantins : cuisine, magasin,
// sport, bibliothèque, potager… La Réunion n'en est qu'un parmi d'autres.

import type { TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";

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

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

/* =========================================================
   OUTILS DE RÉDACTION
========================================================= */

type Q = TutorGeneratedQuestionV4;
type Famille = () => Q;

/** Tire une famille de questions, puis la question elle-même. */
const tirer = (familles: readonly Famille[]): Q => randomChoice(familles)();

/** « 1 paquet », « 3 paquets ». */
const pl = (n: number, sg: string, plu: string) => (n === 1 ? sg : plu);

/** « de feutres », « d'œufs ». */
const de = (mot: string) => (/^[aeiouyàâéèêëîïôœ]/i.test(mot) ? `d'${mot}` : `de ${mot}`);

const maj = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** 5 répété 3 fois : « 5 + 5 + 5 ». */
const repete = (n: number, fois: number) => Array.from({ length: fois }, () => n).join(" + ");

/** Deux nombres différents dans [min, max]. */
function deuxDifferents(min: number, max: number): [number, number] {
  const a = randomInt(min, max);
  let b = randomInt(min, max - 1);
  if (b >= a) b += 1;
  return [a, b];
}

type Prenom = { nom: string; il: "il" | "elle" };
const PRENOMS: readonly Prenom[] = [
  { nom: "Inès", il: "elle" },
  { nom: "Noah", il: "il" },
  { nom: "Lina", il: "elle" },
  { nom: "Malik", il: "il" },
  { nom: "Chloé", il: "elle" },
  { nom: "Yanis", il: "il" },
  { nom: "Jade", il: "elle" },
  { nom: "Hugo", il: "il" },
  { nom: "Aïcha", il: "elle" },
  { nom: "Lucas", il: "il" },
  { nom: "Emma", il: "elle" },
  { nom: "Kylian", il: "il" },
  { nom: "Sofia", il: "elle" },
  { nom: "Théo", il: "il" },
  { nom: "Maëlys", il: "elle" },
  { nom: "Ibrahim", il: "il" },
  { nom: "Zoé", il: "elle" },
  { nom: "Nathan", il: "il" },
  { nom: "Camille", il: "elle" },
  { nom: "Mehdi", il: "il" },
];
const quelquun = () => randomChoice(PRENOMS);
function deuxPersonnes(): [Prenom, Prenom] {
  const p = quelquun();
  let q = quelquun();
  while (q.nom === p.nom) q = quelquun();
  return [p, q];
}

const LETTRES: Record<number, string> = {
  2: "deux", 3: "trois", 4: "quatre", 5: "cinq", 6: "six",
  7: "sept", 8: "huit", 9: "neuf", 10: "dix", 20: "vingt",
};

/* ---------------------------------------------------------
   LES LOTS : des contenants identiques, remplis pareil.
   `prep` : « Dans chaque boîte », « Sur chaque étagère »,
   « À chaque table ». `objet` : on peut en retirer sans
   que la phrase sonne faux (pas des moutons ni des élèves).
--------------------------------------------------------- */
type Lot = { un: string; des: string; obj: string; obj1: string; prep: string; objet: boolean };
const LOTS: readonly Lot[] = [
  { un: "boîte", des: "boîtes", obj: "œufs", obj1: "œuf", prep: "Dans", objet: true },
  { un: "paquet", des: "paquets", obj: "feutres", obj1: "feutre", prep: "Dans", objet: true },
  { un: "étagère", des: "étagères", obj: "livres", obj1: "livre", prep: "Sur", objet: true },
  { un: "rangée", des: "rangées", obj: "sièges", obj1: "siège", prep: "Dans", objet: false },
  { un: "pack", des: "packs", obj: "bouteilles d'eau", obj1: "bouteille d'eau", prep: "Dans", objet: true },
  { un: "barquette", des: "barquettes", obj: "fraises", obj1: "fraise", prep: "Dans", objet: true },
  { un: "enclos", des: "enclos", obj: "moutons", obj1: "mouton", prep: "Dans", objet: false },
  { un: "table", des: "tables", obj: "invités", obj1: "invité", prep: "À", objet: false },
  { un: "plaque", des: "plaques", obj: "cookies", obj1: "cookie", prep: "Sur", objet: true },
  { un: "pochette", des: "pochettes", obj: "cartes à collectionner", obj1: "carte à collectionner", prep: "Dans", objet: true },
  { un: "minibus", des: "minibus", obj: "élèves", obj1: "élève", prep: "Dans", objet: false },
  { un: "filet", des: "filets", obj: "ballons", obj1: "ballon", prep: "Dans", objet: true },
  { un: "sachet", des: "sachets", obj: "vis", obj1: "vis", prep: "Dans", objet: true },
  { un: "caisse", des: "caisses", obj: "mangues", obj1: "mangue", prep: "Dans", objet: true },
  { un: "lot", des: "lots", obj: "cahiers", obj1: "cahier", prep: "Dans", objet: true },
  { un: "équipe", des: "équipes", obj: "joueurs", obj1: "joueur", prep: "Dans", objet: false },
  { un: "bouquet", des: "bouquets", obj: "tulipes", obj1: "tulipe", prep: "Dans", objet: true },
  { un: "carnet", des: "carnets", obj: "tickets de bus", obj1: "ticket de bus", prep: "Dans", objet: true },
];

/** « 3 boîtes de 6 œufs », dite de quatre façons. `qui` : la phrase a-t-elle une personne ? */
function situationLots(lot: Lot, n: number, k: number, p: Prenom) {
  const obj = pl(k, lot.obj1, lot.obj);
  const des = pl(n, lot.un, lot.des);
  return randomChoice([
    `Il y a ${n} ${des} de ${k} ${obj}.`,
    `${p.nom} compte ${n} ${des} de ${k} ${obj}.`,
    `${p.nom} observe ${n} ${des}. ${lot.prep} chaque ${lot.un}, il y a ${k} ${obj}.`,
    `${lot.prep} chaque ${lot.un}, il y a ${k} ${obj}, et il y a ${n} ${des}.`,
    `On a préparé ${n} ${des} identiques de ${k} ${obj}.`,
  ]);
}

function questionTotal(lot: Lot) {
  return randomChoice([
    `Combien ${de(lot.obj)} y a-t-il en tout ?`,
    `Quel est le nombre total ${de(lot.obj)} ?`,
    `Combien cela fait-il ${de(lot.obj)} ?`,
    `Trouve le nombre ${de(lot.obj)} au total.`,
  ]);
}

/* ---------------------------------------------------------
   LES QUADRILLAGES : rangées × colonnes (commutativité, défis).
--------------------------------------------------------- */
const GRILLES: readonly { obj: string; lieu: string }[] = [
  { obj: "chaises", lieu: "Dans la salle des fêtes" },
  { obj: "salades", lieu: "Dans le potager" },
  { obj: "pots de fleurs", lieu: "Sur la terrasse" },
  { obj: "casiers", lieu: "Dans le vestiaire" },
  { obj: "carreaux de chocolat", lieu: "Sur la tablette" },
  { obj: "fenêtres", lieu: "Sur la façade de l'immeuble" },
  { obj: "places de parking", lieu: "Sur le parking" },
  { obj: "tables", lieu: "Dans la salle d'examen" },
  { obj: "œufs", lieu: "Dans le grand plateau" },
  { obj: "panneaux solaires", lieu: "Sur le toit du gymnase" },
  { obj: "cases", lieu: "Sur le plateau de jeu" },
  { obj: "arbres", lieu: "Dans le verger" },
  { obj: "croissants", lieu: "Sur la plaque du boulanger" },
  { obj: "bacs de rangement", lieu: "Dans la bibliothèque" },
  { obj: "pieds de canne à sucre", lieu: "Dans le champ" },
  { obj: "boîtes de conserve", lieu: "En rayon, au supermarché" },
];

/* ---------------------------------------------------------
   LES TABLES EN SITUATION : ce qui va naturellement par 2, 5, 10.
--------------------------------------------------------- */
type Groupe = { quoi: (n: number) => string; obj: string; rappel: string };
const PAR_2: readonly Groupe[] = [
  { quoi: (n) => `${n} paires de chaussettes`, obj: "chaussettes", rappel: "une paire compte 2 chaussettes" },
  { quoi: (n) => `${n} vélos`, obj: "roues", rappel: "un vélo a 2 roues" },
  { quoi: (n) => `${n} poules`, obj: "pattes", rappel: "une poule a 2 pattes" },
  { quoi: (n) => `${n} binômes d'élèves`, obj: "élèves", rappel: "un binôme, c'est 2 élèves" },
  { quoi: (n) => `${n} paires de baskets`, obj: "baskets", rappel: "une paire compte 2 baskets" },
  { quoi: (n) => `${n} pigeons`, obj: "ailes", rappel: "un pigeon a 2 ailes" },
  { quoi: (n) => `${n} pains au chocolat`, obj: "barres de chocolat", rappel: "un pain au chocolat contient 2 barres de chocolat" },
  { quoi: (n) => `${n} kayaks biplaces`, obj: "places", rappel: "un kayak biplace a 2 places" },
  { quoi: (n) => `${n} paires de lunettes`, obj: "verres", rappel: "une paire de lunettes a 2 verres" },
  { quoi: (n) => `${n} boîtes de 2 piles`, obj: "piles", rappel: "une boîte contient 2 piles" },
  { quoi: (n) => `${n} paires de gants`, obj: "gants", rappel: "une paire compte 2 gants" },
  { quoi: (n) => `${n} trottinettes`, obj: "roues", rappel: "une trottinette a 2 roues" },
];
const PAR_5: readonly Groupe[] = [
  { quoi: (n) => `${n} mains`, obj: "doigts", rappel: "une main a 5 doigts" },
  { quoi: (n) => `${n} étoiles de mer`, obj: "bras", rappel: "une étoile de mer a 5 bras" },
  { quoi: (n) => `${n} équipes de basket sur le terrain`, obj: "joueurs", rappel: "une équipe de basket aligne 5 joueurs" },
  { quoi: (n) => `${n} billets de 5 €`, obj: "euros", rappel: "un billet de 5 € vaut 5 euros" },
  { quoi: (n) => `${n} pièces de 5 centimes`, obj: "centimes", rappel: "une pièce de 5 centimes vaut 5 centimes" },
  { quoi: (n) => `${n} fleurs à 5 pétales`, obj: "pétales", rappel: "chaque fleur a 5 pétales" },
  { quoi: (n) => `${n} tours de piste de 5 minutes`, obj: "minutes", rappel: "un tour dure 5 minutes" },
  { quoi: (n) => `${n} packs de 5 yaourts`, obj: "yaourts", rappel: "un pack contient 5 yaourts" },
  { quoi: (n) => `${n} pentagones`, obj: "côtés", rappel: "un pentagone a 5 côtés" },
  { quoi: (n) => `${n} sachets de 5 croissants`, obj: "croissants", rappel: "un sachet contient 5 croissants" },
  { quoi: (n) => `${n} rangées de 5 casiers`, obj: "casiers", rappel: "chaque rangée compte 5 casiers" },
  { quoi: (n) => `${n} boîtes de 5 balles de tennis`, obj: "balles", rappel: "une boîte contient 5 balles" },
];
const PAR_10: readonly Groupe[] = [
  { quoi: (n) => `${n} billets de 10 €`, obj: "euros", rappel: "un billet de 10 € vaut 10 euros" },
  { quoi: (n) => `${n} boîtes de 10 crayons`, obj: "crayons", rappel: "une boîte contient 10 crayons" },
  { quoi: (n) => `${n} paquets de 10 mouchoirs`, obj: "mouchoirs", rappel: "un paquet contient 10 mouchoirs" },
  { quoi: (n) => `${n} carnets de 10 tickets`, obj: "tickets", rappel: "un carnet contient 10 tickets" },
  { quoi: (n) => `${n} barres de 10 cubes`, obj: "cubes", rappel: "une barre compte 10 cubes" },
  { quoi: (n) => `${n} lots de 10 cartes`, obj: "cartes", rappel: "un lot contient 10 cartes" },
  { quoi: (n) => `${n} rouleaux de 10 sacs`, obj: "sacs", rappel: "un rouleau contient 10 sacs" },
  { quoi: (n) => `${n} plateaux de 10 œufs`, obj: "œufs", rappel: "un plateau contient 10 œufs" },
  { quoi: (n) => `${n} paires de mains`, obj: "doigts", rappel: "deux mains ont 10 doigts" },
  { quoi: (n) => `${n} étages de 10 marches`, obj: "marches", rappel: "chaque étage compte 10 marches" },
  { quoi: (n) => `${n} cartons de 10 bouteilles de jus`, obj: "bouteilles", rappel: "un carton contient 10 bouteilles" },
  { quoi: (n) => `${n} filets de 10 oranges`, obj: "oranges", rappel: "un filet contient 10 oranges" },
];

/** Les articles d'un magasin, pour « un cahier coûte 5 € ». */
const ARTICLES: readonly [string, string][] = [
  ["cahier", "cahiers"], ["stylo", "stylos"], ["ticket de cinéma", "tickets de cinéma"],
  ["sandwich", "sandwichs"], ["magazine", "magazines"], ["savon", "savons"],
  ["pot de peinture", "pots de peinture"], ["ballon", "ballons"], ["classeur", "classeurs"],
  ["jus de fruit", "jus de fruit"], ["porte-clés", "porte-clés"], ["plant de tomate", "plants de tomate"],
  ["bracelet", "bracelets"], ["paquet de graines", "paquets de graines"],
];

const OBJETS_PARTAGE: readonly string[] = [
  "billes", "cartes", "bonbons", "images", "crayons", "biscuits", "timbres", "perles",
  "graines", "coquillages", "autocollants", "jetons", "feuilles", "livres", "fraises",
];

/* =========================================================
   FAMILLES COMMUNES AUX TABLES (2, 5, 10)
========================================================= */

/** Le calcul nu, dit de huit façons. */
function tableNue(k: number, n: number): Q {
  const p = k * n;
  const [a, b] = randomChoice([true, false]) ? [n, k] : [k, n];
  const qui = quelquun();
  const text = randomChoice([
    `Combien font ${a} × ${b} ?`,
    `Calcule ${a} × ${b}.`,
    `${a} fois ${b}, cela fait combien ?`,
    `Complète : ${a} × ${b} = …`,
    `Quel est le résultat de ${a} × ${b} ?`,
    `Quel est le produit de ${a} par ${b} ?`,
    `${qui.nom} doit calculer ${a} × ${b}. Quel résultat doit-${qui.il} trouver ?`,
    `Donne le résultat de ${a} × ${b}, de tête.`,
    `Sans poser d'opération : ${a} × ${b} = ?`,
    `En calcul mental, ${qui.nom} doit trouver ${a} × ${b}. Quelle est la bonne réponse ?`,
    `${qui.nom} vérifie sa table : combien font ${a} × ${b} ?`,
  ]);
  return {
    text,
    format: "short",
    expected: [String(p)],
    comparator: "number_equal",
    explanation: exp(
      `Multiplier par ${k}, c'est ajouter ${k} autant de fois qu'il le faut.`,
      `On récite la table de ${k} jusqu'au ${n}e résultat, ou on additionne ${n} fois ${k}.`,
      `${repete(k, n)} = ${p}.`,
      `${a} × ${b} = ${p}.`,
    ),
  };
}

/** La table dans une histoire : n groupes de k. */
function tableEnSituation(k: number, groupes: readonly Groupe[], n: number): Q {
  const g = randomChoice(groupes);
  const p = k * n;
  const qui = quelquun();
  const text = randomChoice([
    `Il y a ${g.quoi(n)}. Combien ${de(g.obj)} en tout ?`,
    `${qui.nom} compte ${g.quoi(n)}. Combien ${de(g.obj)} cela fait-il ?`,
    `Sachant qu'${g.rappel}, combien ${de(g.obj)} y a-t-il pour ${g.quoi(n)} ?`,
    `On regroupe ${g.quoi(n)}. Quel est le nombre total ${de(g.obj)} ?`,
  ]);
  return {
    text,
    format: "short",
    expected: [String(p)],
    comparator: "number_equal",
    explanation: exp(
      "Quand une même quantité se répète, on multiplie.",
      `On sait qu'${g.rappel} : on prend ${k} autant de fois qu'il y a de groupes, ici ${n} fois.`,
      `${n} × ${k} = ${p}.`,
      `Il y a ${p} ${g.obj}.`,
    ),
  };
}

/** Un prix unitaire de k €. */
function tablePrix(k: number, n: number): Q {
  const [art, arts] = randomChoice(ARTICLES);
  const p = k * n;
  const qui = quelquun();
  const text = randomChoice([
    `Un ${art} coûte ${k} €. Combien coûtent ${n} ${arts} ?`,
    `${qui.nom} achète ${n} ${arts} à ${k} € pièce. Combien paie-t-${qui.il} ?`,
    `Combien d'euros faut-il pour acheter ${n} ${arts} à ${k} € pièce ?`,
    `Au magasin, le ${art} est à ${k} €. ${qui.nom} en prend ${n}. Quel est le prix à payer ?`,
  ]);
  return {
    text,
    format: "short",
    expected: [String(p)],
    comparator: "number_equal",
    explanation: exp(
      "Acheter plusieurs fois le même article, c'est payer plusieurs fois le même prix.",
      `On multiplie le prix d'un ${art} par le nombre d'articles.`,
      `${n} × ${k} = ${p}.`,
      `Cela coûte ${p} €.`,
    ),
  };
}

/** Le nombre qui manque : k × … = p. */
function tableTrou(k: number, n: number): Q {
  const p = k * n;
  const qui = quelquun();
  const text = randomChoice([
    `Quel nombre manque : ${k} × … = ${p} ?`,
    `Complète : … × ${k} = ${p}.`,
    `Par combien faut-il multiplier ${k} pour obtenir ${p} ?`,
    `${qui.nom} pense à un nombre. ${maj(qui.il)} le multiplie par ${k} et trouve ${p}. Quel est ce nombre ?`,
    `Combien de fois ${k} faut-il pour faire ${p} ?`,
  ]);
  return {
    text,
    format: "short",
    expected: [String(n)],
    comparator: "number_equal",
    explanation: exp(
      "Une égalité à trou se remplit en cherchant combien de fois le nombre connu tient dans le résultat.",
      `On récite la table de ${k} jusqu'à tomber sur ${p}.`,
      `${k} × ${n} = ${p} : il faut ${n} fois ${k} pour arriver à ${p}.`,
      `Le nombre cherché est ${n}.`,
    ),
  };
}

/** Lequel de ces nombres est dans la table de k ? */
function tableReconnaitre(k: number): Q {
  const n = randomInt(2, 10);
  const p = k * n;
  const faux =
    k === 2
      ? [p + 1, p - 1, p + 3, p + 5]
      : k === 5
        ? [p + 1, p + 2, p - 1, p + 3, p - 2]
        : [p + 5, p + 2, p - 1, p + 1, p - 5];
  const qui = quelquun();
  const text = randomChoice([
    `Lequel de ces nombres est dans la table de ${k} ?`,
    `Un seul de ces nombres est un résultat de la table de ${k}. Lequel ?`,
    `${qui.nom} récite la table de ${k}. Quel nombre va-t-${qui.il} dire ?`,
    `Quel nombre peut s'écrire … × ${k} ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: makeChoices(String(p), faux.filter((x) => x > 0).map(String)),
    expected: [String(p)],
    comparator: "mcq_exact",
    explanation: exp(
      `Les résultats de la table de ${k} avancent de ${k} en ${k}.`,
      k === 2
        ? "On regarde le chiffre des unités : un résultat de la table de 2 est pair (0, 2, 4, 6 ou 8)."
        : k === 5
          ? "On regarde le chiffre des unités : un résultat de la table de 5 se termine par 0 ou par 5."
          : "On regarde le chiffre des unités : un résultat de la table de 10 se termine par 0.",
      `${n} × ${k} = ${p}. Les autres nombres ne tombent pas dans la table.`,
      `C'est ${p}.`,
    ),
  };
}

/** La suite de la table : 5, 10, 15, … */
function tableSuite(k: number): Q {
  const debut = randomInt(1, 6);
  const termes = [debut, debut + 1, debut + 2, debut + 3].map((x) => x * k);
  const suivant = (debut + 4) * k;
  const text = randomChoice([
    `Quel nombre vient ensuite : ${termes.join(", ")}, … ?`,
    `On compte de ${k} en ${k} : ${termes.join(", ")}. Quel est le nombre suivant ?`,
    `Continue la table de ${k} : ${termes.join(", ")}, …`,
  ]);
  return {
    text,
    format: "short",
    expected: [String(suivant)],
    comparator: "number_equal",
    explanation: exp(
      `La table de ${k} avance de ${k} en ${k}.`,
      `On ajoute ${k} au dernier nombre.`,
      `${termes[3]} + ${k} = ${suivant}, et c'est bien ${debut + 4} × ${k}.`,
      `Le nombre suivant est ${suivant}.`,
    ),
  };
}

export const multiplicationBank: TutorBankItemV4[] = [
  /* =========================================================
     CE1_MULTIPLICATION_SENS — une addition répétée
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_multiplication_sens_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce1_multiplication_sens",
    difficulty: 2,
    theme: "neutral",
    text: "Jan a 3 paquets de biscuits. Chaque paquet contient 20 biscuits. Quelle addition permet de trouver le total ?",
    format: "qcm",
    choices: [
      "20 + 20 + 20",
      "3 + 20",
      "3 + 3 + 3",
      "20 + 3 + 20",
    ],
    expected: ["20 + 20 + 20"],
    comparator: "mcq_exact",
    hint: "On répète le contenu d'un paquet, autant de fois qu'il y a de paquets.",
    explanation: exp(
      "Multiplier, c'est additionner plusieurs fois la même quantité.",
      "On repère ce qui se répète — ici le contenu d'un paquet — et combien de fois il se répète.",
      "Il y a 3 paquets de 20 biscuits : on ajoute 20 trois fois, soit 20 + 20 + 20 = 60. On dit « trois fois vingt ».",
      "C'est 20 + 20 + 20.",
    ),
    tags: ["ce1", "multiplication", "sens", "qcm"],
  },
  {
    // ★2 : reconnaître l'addition répétée, dans les deux sens.
    kind: "template",
    id: "ce1_multiplication_sens_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce1_multiplication_sens",
    difficulty: 2,
    theme: "neutral",
    hint: "Qu'est-ce qui se répète, et combien de fois ?",
    tags: ["ce1", "multiplication", "sens", "template"],
    generate: () =>
      tirer([
        // L'histoire → l'addition qui la compte.
        () => {
          const lot = randomChoice(LOTS);
          const [n, k] = deuxDifferents(2, 5);
          const bonne = repete(k, n);
          const question = randomChoice([
            `Quelle addition donne le nombre total ${de(lot.obj)} ?`,
            `Quel calcul permet de compter les ${lot.obj} en tout ?`,
            `Pour trouver combien il y a ${de(lot.obj)}, quelle addition faut-il faire ?`,
            "Laquelle de ces additions donne le total ?",
          ]);
          return {
            text: `${situationLots(lot, n, k, quelquun())} ${question}`,
            format: "qcm",
            // ⚠️ Pas de « n répété k fois » parmi les pièges : il donne le même
            // total (commutativité), ce serait une deuxième bonne réponse.
            choices: makeChoices(bonne, [
              `${n} + ${k}`,
              repete(n, n),
              repete(k, n + 1),
              `${k} + ${n} + ${k}`,
            ]),
            expected: [bonne],
            comparator: "mcq_exact",
            explanation: exp(
              "Multiplier, c'est additionner plusieurs fois la même quantité.",
              `On répète ce que contient un lot (${k}) autant de fois qu'il y a de lots (${n}).`,
              `${n} ${lot.des} de ${k} : on ajoute ${k} ${LETTRES[n]} fois, soit ${bonne} = ${n * k}.`,
              `C'est ${bonne}.`,
            ),
          };
        },
        // L'addition → l'histoire qu'elle raconte.
        () => {
          const lot = randomChoice(LOTS);
          const [n, k] = deuxDifferents(2, 5);
          const somme = repete(k, n);
          const bonne = `${n} ${lot.des} de ${k} ${lot.obj}`;
          const qui = quelquun();
          const text = randomChoice([
            `Quelle situation correspond à l'addition ${somme} ?`,
            `${qui.nom} a écrit ${somme}. Qu'a-t-${qui.il} voulu compter ?`,
            `L'addition ${somme} raconte une histoire. Laquelle ?`,
          ]);
          return {
            text,
            format: "qcm",
            choices: makeChoices(bonne, [
              `${k} ${lot.des} de ${n} ${lot.obj}`,
              `${n} ${lot.des} et ${k} ${lot.obj}`,
              `${n + 1} ${lot.des} de ${k} ${lot.obj}`,
              `${n} ${lot.des} de ${k + 1} ${lot.obj}`,
            ]),
            expected: [bonne],
            comparator: "mcq_exact",
            explanation: exp(
              "Dans une addition répétée, le nombre écrit est le contenu d'un groupe ; le nombre de fois qu'il est écrit, c'est le nombre de groupes.",
              `On regarde quel nombre est répété (${k}) et combien de fois il l'est (${n} fois).`,
              `${somme} : ${k} est écrit ${n} fois, donc ${n} ${lot.des} de ${k} ${lot.obj}, soit ${n * k} ${lot.obj}.`,
              `C'est ${bonne}.`,
            ),
          };
        },
        // Le total, en additionnant.
        () => {
          const lot = randomChoice(LOTS);
          const n = randomInt(2, 5);
          const k = randomChoice([2, 3, 4, 5, 10] as const);
          const total = n * k;
          return {
            text: `${situationLots(lot, n, k, quelquun())} ${questionTotal(lot)}`,
            format: "short",
            expected: [String(total)],
            comparator: "number_equal",
            explanation: exp(
              "Multiplier, c'est additionner plusieurs fois la même quantité.",
              `On ajoute ${k} autant de fois qu'il y a ${de(lot.des)}.`,
              `${repete(k, n)} = ${total}. On dit « ${LETTRES[n]} fois ${LETTRES[k]} ».`,
              `Il y a ${total} ${lot.obj}.`,
            ),
          };
        },
        // Combien de fois ?
        () => {
          const k = randomChoice([2, 3, 4, 5, 10, 20] as const);
          const n = randomInt(2, 6);
          const somme = repete(k, n);
          const qui = quelquun();
          const text = randomChoice([
            `Dans ${somme}, combien de fois le nombre ${k} est-il écrit ?`,
            `${somme} : combien de fois ajoute-t-on ${k} ?`,
            `${qui.nom} calcule ${somme}. Combien de fois ajoute-t-${qui.il} ${k} ?`,
            `Pour dire ${somme} avec le mot « fois », il faut savoir combien de fois ${k} est répété. Combien ?`,
          ]);
          return {
            text,
            format: "short",
            expected: [String(n)],
            comparator: "number_equal",
            explanation: exp(
              "Une addition répétée ajoute plusieurs fois le même nombre.",
              `On compte les ${k} écrits dans l'addition.`,
              `${somme} : le nombre ${k} apparaît ${n} fois. On dit « ${LETTRES[n]} fois ${LETTRES[k]} ».`,
              `${k} est répété ${n} fois.`,
            ),
          };
        },
      ]),
  },
  {
    kind: "template",
    id: "ce1_multiplication_sens_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce1_multiplication_sens",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte combien de fois la même quantité se répète.",
    tags: ["ce1", "multiplication", "sens", "template"],
    generate: () =>
      tirer([
        // Le total d'une histoire de lots.
        () => {
          const lot = randomChoice(LOTS);
          const combien = randomInt(3, 6);
          const dans = randomInt(3, 9);
          const total = combien * dans;
          return {
            text: `${situationLots(lot, combien, dans, quelquun())} ${questionTotal(lot)}`,
            format: "short",
            expected: [String(total)],
            comparator: "number_equal",
            explanation: exp(
              "Multiplier, c'est additionner plusieurs fois la même quantité.",
              `On répète le contenu d'un lot autant de fois qu'il y a ${de(lot.des)}.`,
              `${repete(dans, combien)} = ${total}. On écrit plus vite ${combien} × ${dans} = ${total}.`,
              `Il y a ${total} ${lot.obj}.`,
            ),
          };
        },
        // L'histoire → le bon calcul (addition ou ×).
        () => {
          const lot = randomChoice(LOTS);
          const [n, k] = deuxDifferents(3, 6);
          const bonne = `${n} × ${k}, c'est-à-dire ${repete(k, n)}`;
          const question = randomChoice([
            "Quel calcul donne le total ?",
            `Comment trouver le nombre ${de(lot.obj)} ?`,
            "Quel calcul faut-il choisir ?",
          ]);
          return {
            text: `${situationLots(lot, n, k, quelquun())} ${question}`,
            format: "qcm",
            choices: makeChoices(bonne, [
              `${n} + ${k}`,
              `${n} × ${k}, c'est-à-dire ${n} + ${k}`,
              `${k} + ${k}`,
              `${n} × ${k}, c'est-à-dire ${repete(n, n)}`,
            ]),
            expected: [bonne],
            comparator: "mcq_exact",
            explanation: exp(
              "Le signe × raccourcit une addition qui répète toujours le même nombre.",
              `Ce qui se répète, c'est le contenu d'un lot (${k}) ; il se répète ${n} fois.`,
              `${n} × ${k} = ${repete(k, n)} = ${n * k}.`,
              `C'est ${bonne}.`,
            ),
          };
        },
        // Le nombre de lots, connaissant le total (addition répétée à rebours).
        () => {
          const lot = randomChoice(LOTS);
          const k = randomChoice([2, 5, 10] as const);
          const n = randomInt(3, 9);
          const total = n * k;
          const qui = quelquun();
          const text = randomChoice([
            `${qui.nom} range ${total} ${lot.obj} par ${k}. Combien ${de(lot.des)} peut-${qui.il} remplir ?`,
            `On fait des ${lot.des} de ${k} ${lot.obj} avec ${total} ${lot.obj}. Combien ${de(lot.des)} obtient-on ?`,
            `${total} ${lot.obj}, c'est combien ${de(lot.des)} de ${k} ?`,
          ]);
          return {
            text,
            format: "short",
            expected: [String(n)],
            comparator: "number_equal",
            explanation: exp(
              "Faire des groupes égaux, c'est chercher combien de fois un nombre tient dans un autre.",
              `On ajoute ${k} jusqu'à atteindre ${total}, et on compte les ajouts.`,
              `${repete(k, n)} = ${total} : il y a ${n} fois ${k}, donc ${n} × ${k} = ${total}.`,
              `On obtient ${n} ${lot.des}.`,
            ),
          };
        },
        // L'addition répétée → le total.
        () => {
          const k = randomChoice([3, 4, 5, 6, 10, 20] as const);
          const n = randomInt(3, 6);
          const somme = repete(k, n);
          const qui = quelquun();
          const text = randomChoice([
            `Combien font ${somme} ?`,
            `Calcule ${somme}, puis dis combien de fois tu as ajouté ${k}. Quel est le résultat ?`,
            `${qui.nom} ajoute ${k}, ${LETTRES[n]} fois de suite. Combien trouve-t-${qui.il} ?`,
            `${maj(LETTRES[n])} fois ${LETTRES[k]}, c'est ${somme}. Combien cela fait-il ?`,
          ]);
          return {
            text,
            format: "short",
            expected: [String(n * k)],
            comparator: "number_equal",
            explanation: exp(
              "Multiplier, c'est additionner plusieurs fois la même quantité.",
              `On ajoute ${k} de proche en proche.`,
              `${Array.from({ length: n }, (_, i) => (i + 1) * k).join(", ")} : ${somme} = ${n * k}.`,
              `Cela fait ${n * k}, c'est-à-dire ${n} × ${k}.`,
            ),
          };
        },
      ]),
  },

  /* =========================================================
     CE1_MULTIPLICATION_SYMBOLE — le signe ×
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_multiplication_symbole_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce1_multiplication_symbole",
    difficulty: 1,
    theme: "neutral",
    text: "Comment lit-on le symbole × dans 4 × 5 ?",
    format: "qcm",
    choices: ["fois", "plus", "moins", "égale"],
    expected: ["fois"],
    comparator: "mcq_exact",
    hint: "Quatre… cinq.",
    explanation: exp(
      "Le symbole × se lit « fois » : il annonce une addition répétée.",
      "On lit le premier nombre, puis « fois », puis le second.",
      "4 × 5 se lit « quatre fois cinq », c'est-à-dire 5 + 5 + 5 + 5 = 20.",
      "Le symbole × se lit « fois ».",
    ),
    tags: ["ce1", "multiplication", "symbole", "definition", "qcm"],
  },
  {
    // ★1 : lire, écrire et comprendre le signe ×.
    kind: "template",
    id: "ce1_multiplication_symbole_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce1_multiplication_symbole",
    difficulty: 1,
    theme: "neutral",
    hint: "Le signe × se lit « fois ».",
    tags: ["ce1", "multiplication", "symbole", "template"],
    generate: () =>
      tirer([
        // Lire a × b.
        () => {
          const [a, b] = deuxDifferents(2, 10);
          const qui = quelquun();
          const bonne = `${LETTRES[a]} fois ${LETTRES[b]}`;
          const text = randomChoice([
            `Comment lit-on ${a} × ${b} ?`,
            `À voix haute, ${a} × ${b} se dit…`,
            `Quelle est la bonne lecture de ${a} × ${b} ?`,
            `${qui.nom} lit ${a} × ${b} à voix haute. Que dit-${qui.il} ?`,
            `Au tableau, il est écrit ${a} × ${b}. Comment ${qui.nom} doit-${qui.il} le lire ?`,
          ]);
          return {
            text,
            format: "qcm",
            choices: makeChoices(bonne, [
              `${LETTRES[a]} plus ${LETTRES[b]}`,
              `${LETTRES[a]} moins ${LETTRES[b]}`,
              `${LETTRES[a]} égale ${LETTRES[b]}`,
            ]),
            expected: [bonne],
            comparator: "mcq_exact",
            explanation: exp(
              "Le symbole × se lit « fois ».",
              "On lit le premier nombre, puis « fois », puis le second.",
              `${a} × ${b} se lit « ${bonne} ».`,
              `On dit « ${bonne} ».`,
            ),
          };
        },
        // Écrire « a fois b ».
        () => {
          const [a, b] = deuxDifferents(2, 10);
          const qui = quelquun();
          const bonne = `${a} × ${b}`;
          const text = randomChoice([
            `Quelle écriture veut dire « ${LETTRES[a]} fois ${LETTRES[b]} » ?`,
            `Comment écrit-on « ${LETTRES[a]} fois ${LETTRES[b]} » avec des chiffres ?`,
            `${qui.nom} entend « ${LETTRES[a]} fois ${LETTRES[b]} ». Que doit-${qui.il} écrire ?`,
            `Le professeur dicte « ${LETTRES[a]} fois ${LETTRES[b]} ». Qu'écrit ${qui.nom} dans son cahier ?`,
          ]);
          return {
            text,
            format: "qcm",
            choices: makeChoices(bonne, [`${a} + ${b}`, `${a}${b}`, `${a} = ${b}`]),
            expected: [bonne],
            comparator: "mcq_exact",
            explanation: exp(
              "Le mot « fois » s'écrit avec le symbole ×.",
              "On écrit le premier nombre, le signe ×, puis le second nombre.",
              `« ${LETTRES[a]} fois ${LETTRES[b]} » s'écrit ${bonne}.`,
              `On écrit ${bonne}.`,
            ),
          };
        },
        // Ce que veut dire a × b.
        () => {
          const [a, b] = deuxDifferents(2, 5);
          const bonne = repete(b, a);
          const qui = quelquun();
          const text = randomChoice([
            `Que veut dire ${a} × ${b} ?`,
            `${a} × ${b}, c'est la même chose que…`,
            `Quelle addition se cache derrière ${a} × ${b} ?`,
            `${qui.nom} lit « ${LETTRES[a]} fois ${LETTRES[b]} ». Quelle addition cela veut-il dire ?`,
            `${qui.nom} veut expliquer ${a} × ${b} avec une addition. Laquelle doit-${qui.il} écrire ?`,
          ]);
          return {
            text,
            format: "qcm",
            choices: makeChoices(bonne, [
              `${a} + ${b}`,
              repete(b, a + 1),
              a > 2 ? repete(b, a - 1) : repete(b, a + 2),
            ]),
            expected: [bonne],
            comparator: "mcq_exact",
            explanation: exp(
              `${a} × ${b} se lit « ${LETTRES[a]} fois ${LETTRES[b]} » : on ajoute ${b}, ${LETTRES[a]} fois.`,
              `On écrit ${b} autant de fois que l'indique le ${a}.`,
              `${a} × ${b} = ${bonne} = ${a * b}.`,
              `C'est ${bonne}.`,
            ),
          };
        },
        // L'histoire → la multiplication.
        () => {
          const lot = randomChoice(LOTS);
          const [a, b] = deuxDifferents(2, 5);
          const bonne = `${a} × ${b}`;
          return {
            text: `${situationLots(lot, a, b, quelquun())} Quelle multiplication donne le nombre ${de(lot.obj)} ?`,
            format: "qcm",
            choices: makeChoices(bonne, [`${a} + ${b}`, `${a} × ${a}`, `${b} + ${b}`, `${a + 1} × ${b}`]),
            expected: [bonne],
            comparator: "mcq_exact",
            explanation: exp(
              "Le signe × compte des groupes qui ont tous la même taille.",
              "On écrit le nombre de groupes, le signe ×, puis ce que contient un groupe.",
              `${a} ${lot.des} de ${b} : ${bonne} = ${repete(b, a)} = ${a * b}.`,
              `C'est ${bonne}.`,
            ),
          };
        },
      ]),
  },
  {
    kind: "template",
    id: "ce1_multiplication_symbole_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce1_multiplication_symbole",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte combien de fois le nombre est répété.",
    tags: ["ce1", "multiplication", "symbole", "template"],
    generate: () =>
      tirer([
        // L'addition répétée → l'écriture avec ×.
        () => {
          const fois = randomInt(3, 6);
          const nombre = randomChoice([2, 3, 5, 10, 20] as const);
          const somme = repete(nombre, fois);
          const bonne = `${fois} × ${nombre}`;
          const qui = quelquun();
          const text = randomChoice([
            `Comment écrit-on ${somme} avec le symbole × ?`,
            `Écris ${somme} plus rapidement : quelle est la bonne écriture ?`,
            `${qui.nom} veut raccourcir ${somme}. Que doit-${qui.il} écrire ?`,
            `Quelle multiplication remplace ${somme} ?`,
          ]);
          return {
            text,
            format: "qcm",
            // ⚠️ Pièges choisis pour ne JAMAIS coïncider entre eux. La première
            // version écrivait « nombre × nombre » et « fois × fois » : quand les
            // deux valeurs tombaient égales, un piège doublonnait l'autre ET la
            // bonne réponse, et le QCM sortait à trois lignes sur 21 % des tirages.
            choices: makeChoices(bonne, [
              `${fois} + ${nombre}`,
              `${fois + 1} × ${nombre}`,
              `${fois} × ${nombre + 1}`,
              `${fois + nombre} × ${nombre}`,
            ]),
            expected: [bonne],
            comparator: "mcq_exact",
            explanation: exp(
              "Le symbole × remplace une addition qui répète toujours le même nombre.",
              "On compte combien de fois le nombre est répété, puis on écrit ce compte, le signe ×, et le nombre.",
              `${nombre} est répété ${fois} fois : cela s'écrit ${bonne}, et cela fait ${fois * nombre}.`,
              `On écrit ${bonne}.`,
            ),
          };
        },
        // Une histoire → la multiplication (le programme : « 7 × 20 biscuits »).
        () => {
          const lot = randomChoice(LOTS);
          const n = randomInt(3, 7);
          const k = randomChoice([2, 5, 10, 20] as const);
          const bonne = `${n} × ${k}`;
          const qui = quelquun();
          const question = randomChoice([
            `Quelle multiplication donne le nombre ${de(lot.obj)} ?`,
            `${qui.nom} veut écrire le calcul avec le signe ×. Lequel ?`,
            "Quel calcul avec × correspond à la situation ?",
          ]);
          return {
            text: `${situationLots(lot, n, k, qui)} ${question}`,
            format: "qcm",
            choices: makeChoices(bonne, [`${n} + ${k}`, `${n} × ${n}`, `${n + 1} × ${k}`, `${n} × ${k + 1}`]),
            expected: [bonne],
            comparator: "mcq_exact",
            explanation: exp(
              "Le signe × compte des groupes qui ont tous la même taille.",
              "On écrit le nombre de groupes, le signe ×, puis ce que contient un groupe.",
              `${n} ${lot.des} de ${k} ${lot.obj} : ${bonne} = ${n * k} ${lot.obj}.`,
              `C'est ${bonne}.`,
            ),
          };
        },
        // Le × → le résultat, en passant par l'addition.
        () => {
          const fois = randomInt(3, 6);
          const nombre = randomChoice([2, 3, 4, 5, 10, 20] as const);
          const somme = repete(nombre, fois);
          const qui = quelquun();
          const text = randomChoice([
            `${fois} × ${nombre}, c'est ${somme}. Combien cela fait-il ?`,
            `Calcule ${fois} × ${nombre} en l'écrivant comme une addition.`,
            `${qui.nom} remplace ${fois} × ${nombre} par une addition. Quel résultat trouve-t-${qui.il} ?`,
            `Que vaut ${fois} × ${nombre} ? Aide-toi de l'addition répétée.`,
          ]);
          return {
            text,
            format: "short",
            expected: [String(fois * nombre)],
            comparator: "number_equal",
            explanation: exp(
              `${fois} × ${nombre} se lit « ${LETTRES[fois]} fois ${LETTRES[nombre]} » : on ajoute ${nombre}, ${LETTRES[fois]} fois.`,
              "On remplace la multiplication par l'addition répétée, puis on additionne.",
              `${somme} = ${fois * nombre}.`,
              `${fois} × ${nombre} = ${fois * nombre}.`,
            ),
          };
        },
        // Le trou : combien de fois ?
        () => {
          const fois = randomInt(3, 6);
          const nombre = randomChoice([2, 3, 5, 10, 20] as const);
          const somme = repete(nombre, fois);
          const text = randomChoice([
            `Complète : ${somme} = … × ${nombre}.`,
            `Quel nombre manque : ${somme} = … × ${nombre} ?`,
            `${somme}, c'est combien de fois ${nombre} ?`,
          ]);
          return {
            text,
            format: "short",
            expected: [String(fois)],
            comparator: "number_equal",
            explanation: exp(
              "Le premier nombre d'une multiplication dit combien de fois on ajoute le second.",
              `On compte les ${nombre} de l'addition.`,
              `${nombre} est écrit ${fois} fois : ${somme} = ${fois} × ${nombre}.`,
              `Il manque ${fois}.`,
            ),
          };
        },
      ]),
  },

  /* =========================================================
     CE1_MULTIPLICATION_COMMUTATIVITE — l'ordre ne change rien
     Le programme le montre par le potager : huit colonnes de
     quatre salades, ou quatre rangées de huit.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_multiplication_commutativite_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce1_multiplication_commutativite",
    difficulty: 3,
    theme: "neutral",
    text: "Un potager a 8 colonnes de 4 salades. On peut aussi le voir comme 4 rangées de 8 salades. Que peut-on en conclure ?",
    format: "qcm",
    choices: [
      "8 × 4 et 4 × 8 donnent le même résultat",
      "8 × 4 est plus grand que 4 × 8",
      "il faut recompter à chaque fois",
      "les deux ne sont pas comparables",
    ],
    expected: ["8 × 4 et 4 × 8 donnent le même résultat"],
    comparator: "mcq_exact",
    hint: "C'est le même potager, regardé dans l'autre sens.",
    explanation: exp(
      "Dans une multiplication, on peut échanger les deux nombres sans changer le résultat.",
      "On regarde la même collection dans les deux sens : en colonnes, puis en rangées.",
      "Les salades ne bougent pas, seul le regard change : 8 × 4 = 32 et 4 × 8 = 32. Cela s'appelle la commutativité.",
      "8 × 4 et 4 × 8 donnent le même résultat.",
    ),
    tags: ["ce1", "multiplication", "commutativite", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_multiplication_commutativite_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce1_multiplication_commutativite",
    difficulty: 4,
    theme: "neutral",
    text: "Est-ce que 12 - 5 et 5 - 12 donnent aussi le même résultat ?",
    format: "qcm",
    choices: [
      "non, seule la multiplication permet d'échanger les nombres",
      "oui, l'ordre ne change jamais rien",
      "oui, mais seulement avec des petits nombres",
      "on ne peut pas savoir",
    ],
    expected: ["non, seule la multiplication permet d'échanger les nombres"],
    comparator: "mcq_exact",
    hint: "Peut-on enlever 12 à 5 ?",
    explanation: exp(
      "L'addition et la multiplication permettent d'échanger les nombres ; la soustraction, non.",
      "On essaie dans les deux sens et on regarde si l'opération a encore un sens.",
      "12 - 5 = 7, mais on ne peut pas enlever 12 à 5 au CE1. En revanche 3 × 4 = 4 × 3, et 3 + 4 = 4 + 3.",
      "Non : seules l'addition et la multiplication permettent d'échanger les nombres.",
    ),
    tags: ["ce1", "multiplication", "commutativite", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_multiplication_commutativite_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce1_multiplication_commutativite",
    difficulty: 3,
    theme: "neutral",
    hint: "Échange les deux nombres : le résultat ne bouge pas.",
    tags: ["ce1", "multiplication", "commutativite", "template"],
    generate: () =>
      tirer([
        // a × b connu → b × a.
        () => {
          const [a, b] = deuxDifferents(2, 10);
          const produit = a * b;
          const qui = quelquun();
          const text = randomChoice([
            `On sait que ${a} × ${b} = ${produit}. Que vaut ${b} × ${a} ?`,
            `${qui.nom} sait que ${a} × ${b} = ${produit}. Sans recalculer, combien fait ${b} × ${a} ?`,
            `${a} × ${b} = ${produit}. Alors ${b} × ${a} = … ?`,
            `Sachant que ${a} fois ${b} font ${produit}, combien font ${b} fois ${a} ?`,
            `Dans son cahier, ${qui.nom} a écrit ${a} × ${b} = ${produit}. Combien fait ${b} × ${a} ?`,
            `${qui.nom} a trouvé ${a} × ${b} = ${produit} à l'exercice précédent. Que vaut ${b} × ${a} ?`,
          ]);
          return {
            text,
            format: "short",
            expected: [String(produit)],
            comparator: "number_equal",
            explanation: exp(
              "Dans une multiplication, l'ordre des deux nombres ne change pas le résultat.",
              "On relit l'égalité connue à l'envers, au lieu de recalculer.",
              `${a} rangées de ${b} ou ${b} rangées de ${a}, cela fait le même nombre d'objets : ${produit}.`,
              `${b} × ${a} = ${produit}.`,
            ),
          };
        },
        // Le même quadrillage, vu dans l'autre sens.
        () => {
          const g = randomChoice(GRILLES);
          const [r, c] = deuxDifferents(2, 9);
          const qui = quelquun();
          const text = randomChoice([
            `${g.lieu}, on a ${r} rangées de ${c} ${g.obj}. ${qui.nom} les voit plutôt en ${c} colonnes. Combien ${de(g.obj)} dans chaque colonne ?`,
            `${g.lieu}, il y a ${r} rangées de ${c} ${g.obj}. Si ${qui.nom} compte par colonnes, ${qui.il} trouve ${c} colonnes de combien ${de(g.obj)} ?`,
            `${g.lieu} : ${r} rangées de ${c} ${g.obj}, c'est aussi ${c} colonnes de … ${g.obj}. ${qui.nom} doit compléter : quel nombre écrit-${qui.il} ?`,
          ]);
          return {
            text,
            format: "short",
            expected: [String(r)],
            comparator: "number_equal",
            explanation: exp(
              "Un quadrillage se lit par rangées ou par colonnes : c'est la même collection.",
              "Chaque colonne prend un objet dans chaque rangée.",
              `${r} rangées de ${c} donnent ${c} colonnes de ${r} : ${r} × ${c} = ${c} × ${r} = ${r * c}.`,
              `Chaque colonne compte ${r} ${g.obj}.`,
            ),
          };
        },
        // Quelle multiplication donne le même résultat ?
        () => {
          const [a, b] = deuxDifferents(2, 9);
          const bonne = `${b} × ${a}`;
          const qui = quelquun();
          const text = randomChoice([
            `Quelle multiplication donne le même résultat que ${a} × ${b} ?`,
            `${qui.nom} a oublié combien fait ${a} × ${b}. Quel calcul donne sûrement le même résultat ?`,
            `Laquelle de ces multiplications est égale à ${a} × ${b} ?`,
            `${qui.nom} veut vérifier son calcul de ${a} × ${b} par un autre calcul qui donne forcément le même résultat. Lequel ?`,
          ]);
          return {
            text,
            format: "qcm",
            choices: makeChoices(bonne, [`${a} + ${b}`, `${a + 1} × ${b}`, `${a} × ${b + 1}`, `${b} × ${b}`]),
            expected: [bonne],
            comparator: "mcq_exact",
            explanation: exp(
              "On peut échanger les deux nombres d'une multiplication sans changer le résultat.",
              "On cherche la multiplication qui contient les mêmes nombres, dans l'autre ordre.",
              `${a} × ${b} = ${a * b} et ${b} × ${a} = ${a * b}.`,
              `C'est ${bonne}.`,
            ),
          };
        },
        // L'égalité à compléter.
        () => {
          const [a, b] = deuxDifferents(2, 10);
          const qui = quelquun();
          const [text, rep] = randomChoice([
            [`Complète : ${a} × ${b} = ${b} × …`, a],
            [`Quel nombre manque : ${a} × … = ${b} × ${a} ?`, b],
            [`Trouve le nombre manquant : … × ${a} = ${a} × ${b}.`, b],
            [`${qui.nom} écrit ${a} × ${b} = ${b} × … Quel nombre doit-${qui.il} mettre à la place des points ?`, a],
            [`Pour que l'égalité ${a} × … = ${b} × ${a} soit vraie, quel nombre ${qui.nom} doit-${qui.il} écrire ?`, b],
          ] as const);
          return {
            text,
            format: "short",
            expected: [String(rep)],
            comparator: "number_equal",
            explanation: exp(
              "Dans une multiplication, on peut échanger les deux nombres.",
              "Les deux côtés de l'égalité doivent contenir les mêmes nombres.",
              `${a} × ${b} = ${b} × ${a} = ${a * b}.`,
              `Il manque ${rep}.`,
            ),
          };
        },
      ]),
  },
  {
    // ★4 : se servir de la commutativité, et la distinguer de ce qui ne l'a pas.
    kind: "template",
    id: "ce1_multiplication_commutativite_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce1_multiplication_commutativite",
    difficulty: 4,
    theme: "neutral",
    hint: "Retourne la multiplication pour tomber sur une table connue.",
    tags: ["ce1", "multiplication", "commutativite", "template"],
    generate: () =>
      tirer([
        // Retourner le produit pour utiliser une table connue.
        () => {
          const k = randomChoice([2, 5, 10] as const);
          const n = randomInt(3, 9);
          const qui = quelquun();
          const bonne = `en calculant ${k} × ${n} avec la table de ${k}`;
          const text = randomChoice([
            `${qui.nom} ne connaît pas encore la table de ${n}. Comment peut-${qui.il} calculer ${n} × ${k} ?`,
            `Pour calculer ${n} × ${k} quand on ne connaît que les tables de 2, 5 et 10, que faire ?`,
            `${n} × ${k} : quelle est la façon la plus simple de le calculer ?`,
            `${qui.nom} bloque sur ${n} × ${k}. Quel conseil lui donner ?`,
            `${qui.nom} connaît par cœur la table de ${k}, pas celle de ${n}. Comment trouver ${n} × ${k} ?`,
          ]);
          return {
            text,
            format: "qcm",
            choices: makeChoices(bonne, [
              `en calculant ${n} + ${k}`,
              `en calculant ${n} × ${n}`,
              `en calculant ${k} + ${k}`,
              "c'est impossible sans la table",
            ]),
            expected: [bonne],
            comparator: "mcq_exact",
            explanation: exp(
              "On peut échanger les deux nombres d'une multiplication : on choisit le sens le plus facile.",
              `On retourne ${n} × ${k} en ${k} × ${n} pour utiliser la table de ${k}.`,
              `${k} × ${n} = ${k * n}, donc ${n} × ${k} = ${k * n} aussi.`,
              `On calcule ${k} × ${n} avec la table de ${k}.`,
            ),
          };
        },
        // Quelle égalité est vraie ?
        () => {
          const [b, a] = deuxDifferents(2, 9).sort((x, y) => x - y);
          const bonne = `${a} × ${b} = ${b} × ${a}`;
          const qui = quelquun();
          const text = randomChoice([
            "Quelle égalité est vraie ?",
            "Une seule de ces égalités est juste. Laquelle ?",
            "Laquelle de ces phrases mathématiques est exacte ?",
            `${qui.nom} doit cocher la seule égalité juste. Laquelle ?`,
            `${qui.nom} a écrit quatre égalités, mais une seule est vraie. Laquelle ?`,
            `Au tableau, ${qui.nom} lit quatre égalités. Laquelle est correcte ?`,
          ]);
          return {
            text,
            format: "qcm",
            choices: makeChoices(bonne, [
              `${a} - ${b} = ${b} - ${a}`,
              `${a} × ${b} = ${a} + ${b}`,
              `${a} × ${b} = ${a}${b}`,
              `${a} × ${b} = ${a} × ${b + 1}`,
            ]),
            expected: [bonne],
            comparator: "mcq_exact",
            explanation: exp(
              "La multiplication est commutative : on peut échanger ses deux nombres. La soustraction, elle, ne l'est pas.",
              "On calcule les deux côtés de chaque égalité.",
              `${a} × ${b} = ${a * b} et ${b} × ${a} = ${a * b}. Mais ${a} - ${b} = ${a - b}, et on ne peut pas enlever ${a} à ${b}.`,
              `C'est ${bonne}.`,
            ),
          };
        },
        // Deux personnes comptent le même rangement.
        () => {
          const g = randomChoice(GRILLES);
          const [r, c] = deuxDifferents(2, 9);
          const [p, q] = deuxPersonnes();
          const bonne = "ils trouvent le même nombre";
          const text = randomChoice([
            `${g.lieu}, ${p.nom} compte ${r} rangées de ${c} ${g.obj}. ${q.nom} compte ${c} colonnes de ${r} ${g.obj}. Qui en trouve le plus ?`,
            `${p.nom} calcule ${r} × ${c} et ${q.nom} calcule ${c} × ${r} pour compter les ${g.obj}. Qui trouve le plus grand nombre ?`,
            `${g.lieu}, il y a ${r} rangées de ${c} ${g.obj}. ${p.nom} les compte par rangées, ${q.nom} par colonnes. Que se passe-t-il ?`,
          ]);
          return {
            text,
            format: "qcm",
            choices: makeChoices(bonne, [
              `${p.nom} en trouve plus`,
              `${q.nom} en trouve plus`,
              "on ne peut pas savoir",
            ]),
            expected: [bonne],
            comparator: "mcq_exact",
            explanation: exp(
              "Compter par rangées ou par colonnes, c'est compter la même collection.",
              "On compare les deux multiplications : ce sont les mêmes nombres, échangés.",
              `${r} × ${c} = ${r * c} et ${c} × ${r} = ${r * c}.`,
              "Ils trouvent le même nombre.",
            ),
          };
        },
        // Le résultat, en retournant le produit.
        () => {
          const k = randomChoice([2, 5, 10] as const);
          const n = randomInt(3, 9);
          const qui = quelquun();
          const text = randomChoice([
            `Calcule ${n} × ${k} en le retournant.`,
            `${qui.nom} retourne ${n} × ${k} pour utiliser la table de ${k}. Quel résultat trouve-t-${qui.il} ?`,
            `${n} × ${k} = ${k} × ${n}. Combien cela fait-il ?`,
            `Combien font ${n} fois ${k} ? Pense à la table de ${k}.`,
            `${qui.nom} ne connaît pas la table de ${n}. Aide-${qui.il === "il" ? "le" : "la"} : combien font ${n} × ${k} ?`,
            `Pour trouver ${n} × ${k}, ${qui.nom} récite la table de ${k}. Quel résultat obtient-${qui.il} ?`,
          ]);
          return {
            text,
            format: "short",
            expected: [String(n * k)],
            comparator: "number_equal",
            explanation: exp(
              "On peut échanger les deux nombres d'une multiplication.",
              `On calcule ${k} × ${n} avec la table de ${k}.`,
              `${k} × ${n} = ${repete(k, n)} = ${n * k}.`,
              `${n} × ${k} = ${n * k}.`,
            ),
          };
        },
      ]),
  },

  /* =========================================================
     CE1_NOMBRE_PARITE — pair ou impair
     Le programme demande aussi de donner tous les nombres
     pairs entre deux bornes.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_parite_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce1_nombre_parite",
    difficulty: 2,
    theme: "neutral",
    text: "Comment reconnaît-on qu'un nombre est PAIR ?",
    format: "qcm",
    choices: [
      "son chiffre des unités est 0, 2, 4, 6 ou 8",
      "il est plus grand que 10",
      "son premier chiffre est pair",
      "on peut le couper en trois parts égales",
    ],
    expected: ["son chiffre des unités est 0, 2, 4, 6 ou 8"],
    comparator: "mcq_exact",
    hint: "Regarde seulement le dernier chiffre.",
    explanation: exp(
      "Un nombre pair peut se partager en deux parts égales, sans reste.",
      "On regarde uniquement le chiffre des unités, celui tout à droite.",
      "Si ce chiffre est 0, 2, 4, 6 ou 8, le nombre est pair. 348 est pair à cause du 8, même si 3 est impair.",
      "Son chiffre des unités est 0, 2, 4, 6 ou 8.",
    ),
    tags: ["ce1", "multiplication", "parite", "definition", "qcm"],
  },
  {
    // ★2 : la parité des nombres à deux chiffres, et le partage en deux.
    kind: "template",
    id: "ce1_parite_tpl_3",
    niveau: "ce1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce1_nombre_parite",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde seulement le chiffre des unités.",
    tags: ["ce1", "multiplication", "parite", "template"],
    generate: () => familleParite(10, 99),
  },
  {
    kind: "fixed",
    id: "ce1_parite_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce1_nombre_parite",
    difficulty: 4,
    theme: "neutral",
    text: "Le nombre 347 est-il pair ou impair ?",
    format: "qcm",
    choices: ["impair", "pair", "les deux", "on ne peut pas savoir"],
    expected: ["impair"],
    comparator: "mcq_exact",
    hint: "Ne regarde que le dernier chiffre : 7.",
    explanation: exp(
      "C'est le chiffre des unités qui décide de la parité, pas les autres.",
      "On regarde le chiffre tout à droite.",
      "Le chiffre des unités est 7, qui n'est pas dans la liste 0, 2, 4, 6, 8. Le nombre 347 est donc impair, même si le 4 du milieu est pair.",
      "347 est impair.",
    ),
    tags: ["ce1", "multiplication", "parite", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_parite_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce1_nombre_parite",
    difficulty: 3,
    theme: "neutral",
    hint: "Seul le dernier chiffre compte.",
    tags: ["ce1", "multiplication", "parite", "template"],
    generate: () =>
      tirer([
        () => familleParite(100, 999),
        // Le chiffre qui rend le nombre pair (ou impair).
        () => {
          const centaines = randomInt(1, 9);
          const dizaines = randomInt(0, 9);
          const veutPair = randomChoice([true, false]);
          const bon = randomChoice(veutPair ? [0, 2, 4, 6, 8] : [1, 3, 5, 7, 9]);
          const autres = shuffle(veutPair ? [1, 3, 5, 7, 9] : [0, 2, 4, 6, 8]).slice(0, 3);
          const mot = veutPair ? "pair" : "impair";
          const debut = `${centaines}${dizaines}`;
          const qui = quelquun();
          const text = randomChoice([
            `Le nombre ${debut}… doit être ${mot}. Quel chiffre des unités peut-on écrire ?`,
            `${qui.nom} écrit un nombre qui commence par ${debut} et qui est ${mot}. Quel peut être son dernier chiffre ?`,
            `Quel chiffre faut-il ajouter à droite de ${debut} pour obtenir un nombre ${mot} ?`,
          ]);
          return {
            text,
            format: "qcm",
            choices: makeChoices(String(bon), autres.map(String)),
            expected: [String(bon)],
            comparator: "mcq_exact",
            explanation: exp(
              "C'est le chiffre des unités qui décide si un nombre est pair ou impair.",
              veutPair
                ? "Un nombre pair se termine par 0, 2, 4, 6 ou 8."
                : "Un nombre impair se termine par 1, 3, 5, 7 ou 9.",
              `Avec ${bon}, on obtient ${debut}${bon}, qui est ${mot}. Les autres chiffres proposés donnent l'inverse.`,
              `On peut écrire ${bon}.`,
            ),
          };
        },
        // Le nombre pair (ou impair) juste avant, juste après.
        () => {
          const n = randomInt(101, 997);
          const apres = randomChoice([true, false]);
          const veutPair = randomChoice([true, false]);
          let r = apres ? n + 1 : n - 1;
          while ((r % 2 === 0) !== veutPair) r += apres ? 1 : -1;
          const mot = veutPair ? "pair" : "impair";
          const qui = quelquun();
          const text = randomChoice([
            `Quel est le premier nombre ${mot} ${apres ? "après" : "avant"} ${n} ?`,
            `${qui.nom} cherche le nombre ${mot} qui vient juste ${apres ? "après" : "avant"} ${n}. Lequel est-ce ?`,
            `Donne le nombre ${mot} le plus proche de ${n}, ${apres ? "en avançant" : "en reculant"}.`,
          ]);
          return {
            text,
            format: "short",
            expected: [String(r)],
            comparator: "number_equal",
            explanation: exp(
              "Pairs et impairs se suivent en alternance : pair, impair, pair, impair…",
              `On ${apres ? "avance" : "recule"} de 1 en 1 à partir de ${n} et on s'arrête au premier nombre ${mot}.`,
              `${r} se termine par ${r % 10}, il est ${mot}.`,
              `C'est ${r}.`,
            ),
          };
        },
      ]),
  },
  {
    kind: "template",
    id: "ce1_parite_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce1_nombre_parite",
    difficulty: 4,
    theme: "neutral",
    hint: "Les nombres pairs se suivent de deux en deux.",
    tags: ["ce1", "multiplication", "parite", "template"],
    generate: () =>
      tirer([
        // Compter les pairs (ou les impairs) entre deux bornes.
        () => {
          const ecart = randomInt(7, 15);
          const debut = randomInt(100, 980);
          const fin = debut + ecart;
          const veutPair = randomChoice([true, false]);
          const liste: number[] = [];
          for (let i = debut + 1; i < fin; i += 1) if ((i % 2 === 0) === veutPair) liste.push(i);
          const mot = veutPair ? "pairs" : "impairs";
          const qui = quelquun();
          const text = randomChoice([
            `Combien y a-t-il de nombres ${mot} compris entre ${debut} et ${fin} ?`,
            `${qui.nom} écrit tous les nombres ${mot} situés entre ${debut} et ${fin}. Combien en écrit-${qui.il} ?`,
            `Entre ${debut} et ${fin} (sans compter ces deux nombres), combien trouve-t-on de nombres ${mot} ?`,
            `Les casiers du collège vont du n° ${debut} au n° ${fin}. ${qui.nom} compte les numéros ${mot} situés strictement entre les deux. Combien en trouve-t-${qui.il} ?`,
          ]);
          return {
            text,
            format: "short",
            expected: [String(liste.length)],
            comparator: "number_equal",
            explanation: exp(
              `Les nombres ${mot} se suivent de deux en deux : un nombre sur deux est ${veutPair ? "pair" : "impair"}.`,
              `On part du premier nombre ${veutPair ? "pair" : "impair"} après ${debut}, puis on avance de 2 en 2 sans atteindre ${fin}.`,
              `Ce sont ${liste.join(", ")}.`,
              `Il y en a ${liste.length}.`,
            ),
          };
        },
        // Avancer de 2 en 2.
        () => {
          const depart = randomInt(100, 970);
          const termes = [0, 1, 2, 3].map((i) => depart + 2 * i);
          const suivant = depart + 8;
          const qui = quelquun();
          const text = randomChoice([
            `Quel nombre vient ensuite : ${termes.join(", ")}, … ?`,
            `${qui.nom} compte de 2 en 2 : ${termes.join(", ")}. Quel nombre dit-${qui.il} ensuite ?`,
            `Continue la suite : ${termes.join(", ")}, …`,
            `Dans une rue, ${qui.nom} passe devant les numéros ${termes.join(", ")}. Quel est le numéro suivant ?`,
          ]);
          return {
            text,
            format: "short",
            expected: [String(suivant)],
            comparator: "number_equal",
            explanation: exp(
              "En comptant de 2 en 2, on reste toujours dans les pairs, ou toujours dans les impairs.",
              "On ajoute 2 au dernier nombre.",
              `${termes[3]} + 2 = ${suivant}. Tous ces nombres sont ${depart % 2 === 0 ? "pairs" : "impairs"}.`,
              `Le nombre suivant est ${suivant}.`,
            ),
          };
        },
        // Le plus grand (ou plus petit) pair d'un intervalle.
        () => {
          const debut = randomInt(100, 980);
          const fin = debut + randomInt(6, 12);
          const grand = randomChoice([true, false]);
          let r = grand ? fin - 1 : debut + 1;
          if (r % 2 !== 0) r += grand ? -1 : 1;
          const qui = quelquun();
          const lequel = grand ? "plus grand" : "plus petit";
          const text = randomChoice([
            `Quel est le ${lequel} nombre pair compris entre ${debut} et ${fin} ?`,
            `Entre ${debut} et ${fin}, on cherche le nombre pair le ${lequel}. Lequel est-ce ?`,
            `${qui.nom} doit écrire le ${lequel} nombre pair situé entre ${debut} et ${fin}. Lequel écrit-${qui.il} ?`,
            `Les places d'un concert sont numérotées de ${debut} à ${fin}. ${qui.nom} veut le ${lequel} numéro pair, sans prendre ces deux bornes. Lequel ?`,
          ]);
          return {
            text,
            format: "short",
            expected: [String(r)],
            comparator: "number_equal",
            explanation: exp(
              "Un nombre pair se termine par 0, 2, 4, 6 ou 8.",
              grand
                ? `On part de ${fin - 1}, juste avant ${fin}, et on recule jusqu'au premier nombre pair.`
                : `On part de ${debut + 1}, juste après ${debut}, et on avance jusqu'au premier nombre pair.`,
              `${r} se termine par ${r % 10} : il est pair.`,
              `C'est ${r}.`,
            ),
          };
        },
        // Le rang : le 3e nombre pair après n.
        () => {
          const n = randomInt(100, 960);
          const rang = randomInt(2, 4);
          let premier = n + 1;
          if (premier % 2 !== 0) premier += 1;
          const r = premier + 2 * (rang - 1);
          const rangMot = rang === 2 ? "deuxième" : rang === 3 ? "troisième" : "quatrième";
          const qui = quelquun();
          const text = randomChoice([
            `Quel est le ${rangMot} nombre pair après ${n} ?`,
            `En comptant les nombres pairs à partir de ${n}, quel est le ${rangMot} ?`,
            `${qui.nom} habite au numéro ${n}. En marchant du côté des numéros pairs, quel est le ${rangMot} numéro pair qu'${qui.il} rencontre après le sien ?`,
            `${qui.nom} récite les nombres pairs qui suivent ${n}. Quel est le ${rangMot} qu'${qui.il} dit ?`,
          ]);
          return {
            text,
            format: "short",
            expected: [String(r)],
            comparator: "number_equal",
            explanation: exp(
              "Les nombres pairs se suivent de deux en deux.",
              `On trouve le premier nombre pair après ${n}, puis on avance de 2 en 2.`,
              `${Array.from({ length: rang }, (_, i) => premier + 2 * i).join(", ")}.`,
              `Le ${rangMot} est ${r}.`,
            ),
          };
        },
      ]),
  },

  /* =========================================================
     CE1_TABLE_2 — la table de 2, celle des doubles
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_table_2_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce1_table_2",
    difficulty: 2,
    theme: "neutral",
    text: "Multiplier un nombre par 2, c'est la même chose que…",
    format: "qcm",
    choices: [
      "prendre son double",
      "prendre sa moitié",
      "lui ajouter 2",
      "lui enlever 2",
    ],
    expected: ["prendre son double"],
    comparator: "mcq_exact",
    hint: "Deux fois la même chose.",
    explanation: exp(
      "Multiplier par 2, c'est prendre deux fois le nombre : c'est son double.",
      "On additionne le nombre avec lui-même.",
      "7 × 2 = 7 + 7 = 14. Ajouter 2 donnerait 9, ce qui est tout autre chose.",
      "C'est prendre son double.",
    ),
    tags: ["ce1", "multiplication", "table_2", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_table_2_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce1_table_2",
    difficulty: 2,
    theme: "neutral",
    hint: "Additionne le nombre avec lui-même.",
    tags: ["ce1", "multiplication", "table_2", "template"],
    generate: () =>
      tirer([
        () => tableNue(2, randomInt(2, 10)),
        () => tableEnSituation(2, PAR_2, randomInt(2, 10)),
        () => tablePrix(2, randomInt(2, 10)),
        () => tableTrou(2, randomInt(2, 10)),
        () => tableReconnaitre(2),
        // Le double, dit en mots.
        () => {
          const n = randomInt(2, 10);
          const qui = quelquun();
          const sens = randomChoice(["double", "moitie"] as const);
          const text =
            sens === "double"
              ? randomChoice([
                  `Quel est le double de ${n} ?`,
                  `${qui.nom} a ${n} ans. Son grand frère a le double de son âge. Quel âge a-t-il ?`,
                  `Le double de ${n}, c'est combien ?`,
                ])
              : randomChoice([
                  `Le double de quel nombre est ${2 * n} ?`,
                  `${qui.nom} a doublé sa collection et a maintenant ${2 * n} images. Combien en avait-${qui.il} au départ ?`,
                  `Quel nombre faut-il multiplier par 2 pour obtenir ${2 * n} ?`,
                ]);
          const rep = sens === "double" ? 2 * n : n;
          return {
            text,
            format: "short",
            expected: [String(rep)],
            comparator: "number_equal",
            explanation: exp(
              "Le double d'un nombre, c'est ce nombre multiplié par 2.",
              sens === "double"
                ? "On additionne le nombre avec lui-même."
                : "On cherche le nombre qui, ajouté à lui-même, donne le résultat.",
              `${n} + ${n} = ${n} × 2 = ${2 * n}.`,
              sens === "double" ? `Le double de ${n} est ${2 * n}.` : `C'est ${n}, car ${n} × 2 = ${2 * n}.`,
            ),
          };
        },
      ]),
  },

  /* =========================================================
     CE1_TABLE_5 — la table de 5
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_table_5_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce1_table_5",
    difficulty: 3,
    theme: "neutral",
    text: "Par quel chiffre se terminent tous les résultats de la table de 5 ?",
    format: "qcm",
    choices: ["par 0 ou par 5", "par 5 seulement", "par 0 seulement", "par n'importe quel chiffre"],
    expected: ["par 0 ou par 5"],
    comparator: "mcq_exact",
    hint: "Récite la table : 5, 10, 15, 20, 25…",
    explanation: exp(
      "Les résultats de la table de 5 suivent une régularité qui aide à les retenir.",
      "On récite la table et on regarde le dernier chiffre de chaque résultat.",
      "5, 10, 15, 20, 25, 30… Les résultats se terminent tour à tour par 5 et par 0. Cela permet de repérer une erreur tout de suite : 5 × 7 ne peut pas faire 34.",
      "Ils se terminent par 0 ou par 5.",
    ),
    tags: ["ce1", "multiplication", "table_5", "remarquable", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_table_5_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce1_table_5",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte de 5 en 5.",
    tags: ["ce1", "multiplication", "table_5", "template"],
    generate: () =>
      tirer([
        () => tableNue(5, randomInt(2, 10)),
        () => tableEnSituation(5, PAR_5, randomInt(2, 10)),
        () => tablePrix(5, randomInt(2, 10)),
        () => tableTrou(5, randomInt(2, 10)),
        () => tableReconnaitre(5),
        () => tableSuite(5),
        // La moitié de la table de 10.
        () => {
          const n = randomInt(2, 10);
          const qui = quelquun();
          const text = randomChoice([
            `${n} × 10 = ${n * 10}. Combien font alors ${n} × 5 ?`,
            `${qui.nom} sait que ${n} × 10 = ${n * 10}. Comment trouve-t-${qui.il} vite ${n} × 5 ? Donne le résultat.`,
            `Sachant que ${n} billets de 10 € font ${n * 10} €, combien font ${n} billets de 5 € ?`,
          ]);
          return {
            text,
            format: "short",
            expected: [String(n * 5)],
            comparator: "number_equal",
            explanation: exp(
              "5, c'est la moitié de 10 : multiplier par 5, c'est la moitié de multiplier par 10.",
              `On calcule ${n} × 10, puis on prend la moitié.`,
              `${n} × 10 = ${n * 10}, et la moitié de ${n * 10} est ${n * 5}.`,
              `${n} × 5 = ${n * 5}.`,
            ),
          };
        },
      ]),
  },

  /* =========================================================
     CE1_TABLE_10 — la table de 10
     Le programme l'explique par la numération : chaque chiffre
     prend une valeur dix fois plus grande.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_table_10_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce1_table_10",
    difficulty: 3,
    theme: "neutral",
    text: "Pourquoi 7 × 10 s'écrit-il 70 ?",
    format: "qcm",
    choices: [
      "parce que les 7 unités deviennent 7 dizaines",
      "parce qu'on ajoute toujours un zéro à la fin, sans raison",
      "parce que 7 + 10 = 70",
      "parce que 7 et 10 se ressemblent",
    ],
    expected: ["parce que les 7 unités deviennent 7 dizaines"],
    comparator: "mcq_exact",
    hint: "Sept paquets de dix, c'est sept dizaines.",
    explanation: exp(
      "Multiplier par 10, c'est faire prendre à chaque chiffre une valeur dix fois plus grande.",
      "On regarde ce que deviennent les unités : elles se transforment en dizaines.",
      "7 × 10, c'est 7 paquets de dix, donc 7 dizaines : cela s'écrit 70. Le zéro n'est pas ajouté au hasard, il marque qu'il n'y a plus d'unités isolées.",
      "Parce que les 7 unités deviennent 7 dizaines.",
    ),
    tags: ["ce1", "multiplication", "table_10", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_table_10_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce1_table_10",
    difficulty: 2,
    theme: "neutral",
    hint: "Chaque unité devient une dizaine.",
    tags: ["ce1", "multiplication", "table_10", "template"],
    generate: () =>
      tirer([
        () => tableNue(10, randomInt(2, 10)),
        () => tableEnSituation(10, PAR_10, randomInt(2, 10)),
        () => tablePrix(10, randomInt(2, 10)),
        () => tableTrou(10, randomInt(2, 10)),
        () => tableReconnaitre(10),
        () => tableSuite(10),
      ]),
  },
  {
    // ★3 : la table de 10 au-delà de 10 × 10, par la numération (< 1000).
    kind: "template",
    id: "ce1_table_10_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce1_table_10",
    difficulty: 3,
    theme: "neutral",
    hint: "Les unités deviennent des dizaines, les dizaines des centaines.",
    tags: ["ce1", "multiplication", "table_10", "template"],
    generate: () =>
      tirer([
        // n × 10 avec n à deux chiffres.
        () => {
          const n = randomInt(11, 99);
          const p = n * 10;
          const q = tableNue(10, n);
          return {
            ...q,
            explanation: exp(
              "Multiplier par 10, c'est faire prendre à chaque chiffre une valeur dix fois plus grande.",
              "Les unités deviennent des dizaines, les dizaines deviennent des centaines.",
              `${n} × 10, c'est ${n} dizaines : ${p}.`,
              `Cela fait ${p}.`,
            ),
          };
        },
        // n dizaines → le nombre.
        () => {
          const n = randomInt(11, 99);
          const qui = quelquun();
          const text = randomChoice([
            `Combien d'unités y a-t-il dans ${n} dizaines ?`,
            `${n} dizaines, c'est quel nombre ?`,
            `${qui.nom} a ${n} paquets de 10 cartes. Combien de cartes a-t-${qui.il} ?`,
            `Quel nombre s'écrit avec ${n} dizaines et 0 unité ?`,
            `${qui.nom} empile ${n} barres de 10 cubes. Combien de cubes cela fait-il ?`,
            `Une bibliothèque range ses livres par 10 sur des étagères. ${qui.nom} compte ${n} étagères pleines. Combien de livres ?`,
          ]);
          return {
            text,
            format: "short",
            expected: [String(n * 10)],
            comparator: "number_equal",
            explanation: exp(
              "Une dizaine, c'est 10 unités.",
              `On compte ${n} fois 10, c'est-à-dire ${n} × 10.`,
              `${n} × 10 = ${n * 10}.`,
              `C'est ${n * 10}.`,
            ),
          };
        },
        // Payer avec des billets de 10 €, trouver le facteur.
        () => {
          const n = randomInt(3, 99);
          const p = n * 10;
          const qui = quelquun();
          const text = randomChoice([
            `Combien de billets de 10 € faut-il pour payer ${p} € ?`,
            `${qui.nom} paie ${p} € uniquement avec des billets de 10 €. Combien de billets donne-t-${qui.il} ?`,
            `Quel nombre manque : … × 10 = ${p} ?`,
            `Combien de dizaines y a-t-il dans ${p} ?`,
            `${qui.nom} range ${p} œufs dans des plateaux de 10. Combien de plateaux remplit-${qui.il} ?`,
            `Pour la fête, ${qui.nom} achète ${p} gobelets vendus par paquets de 10. Combien de paquets prend-${qui.il} ?`,
          ]);
          return {
            text,
            format: "short",
            expected: [String(n)],
            comparator: "number_equal",
            explanation: exp(
              "Multiplier par 10 transforme les unités en dizaines ; on peut lire le chemin à l'envers.",
              `On cherche combien de dizaines il y a dans ${p}.`,
              `${n} × 10 = ${p}.`,
              `C'est ${n}.`,
            ),
          };
        },
        // Le bon résultat parmi des erreurs fréquentes.
        () => {
          const n = randomInt(12, 49);
          const p = n * 10;
          const qui = quelquun();
          const text = randomChoice([
            `Quel est le résultat de ${n} × 10 ?`,
            `${qui.nom} calcule ${n} × 10. Quelle réponse est juste ?`,
            `${n} × 10 = ?`,
            `Quatre élèves ont calculé ${n} × 10. ${qui.nom} a la bonne réponse : laquelle ?`,
            `${qui.nom} achète ${n} paquets de 10 images. Combien d'images a-t-${qui.il} ?`,
          ]);
          return {
            text,
            format: "qcm",
            choices: makeChoices(String(p), [String(n + 10), String(p + 10), String(p - 10), String(n * 100)]),
            expected: [String(p)],
            comparator: "mcq_exact",
            explanation: exp(
              "Multiplier par 10, ce n'est pas ajouter 10 : chaque unité devient une dizaine.",
              `${n} unités deviennent ${n} dizaines.`,
              `${n} dizaines = ${p}. Attention : ${n} + 10 = ${n + 10}, ce n'est pas la même chose.`,
              `${n} × 10 = ${p}.`,
            ),
          };
        },
      ]),
  },

  /* =========================================================
     CE1_MULTIPLICATION_CALCULER — calculer un produit
  ========================================================= */
  {
    kind: "template",
    id: "ce1_multiplication_calculer_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce1_multiplication_calculer",
    difficulty: 3,
    theme: "neutral",
    hint: "Choisis la table la plus facile des deux.",
    tags: ["ce1", "multiplication", "calculer", "template"],
    generate: () =>
      tirer([
        () => tableNue(randomChoice([2, 5, 10] as const), randomInt(2, 10)),
        () => tablePrix(randomChoice([2, 5, 10] as const), randomInt(2, 10)),
        () => {
          const k = randomChoice([2, 5, 10] as const);
          return tableEnSituation(k, k === 2 ? PAR_2 : k === 5 ? PAR_5 : PAR_10, randomInt(2, 10));
        },
        // Le bon résultat parmi des pièges.
        () => {
          const facile = randomChoice([2, 5, 10] as const);
          const n = randomInt(3, 10);
          const p = facile * n;
          const [a, b] = randomChoice([true, false]) ? [n, facile] : [facile, n];
          const qui = quelquun();
          const text = randomChoice([
            `Quel est le bon résultat de ${a} × ${b} ?`,
            `${qui.nom} a calculé ${a} × ${b}. Quelle réponse est la bonne ?`,
            `${a} × ${b} = ?`,
            `Parmi ces nombres, lequel est égal à ${a} × ${b} ?`,
          ]);
          return {
            text,
            format: "qcm",
            choices: makeChoices(String(p), [String(a + b), String(p + facile), String(p - facile), String(p + 1)]),
            expected: [String(p)],
            comparator: "mcq_exact",
            explanation: exp(
              "L'ordre des deux nombres ne change pas le résultat : on peut prendre la table la plus facile.",
              `On utilise la table de ${facile}.`,
              `${facile} répété ${n} fois donne ${p}. Attention : ${a} + ${b} = ${a + b}, c'est une addition.`,
              `Cela fait ${p}.`,
            ),
          };
        },
      ]),
  },
  {
    kind: "template",
    id: "ce1_multiplication_calculer_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce1_multiplication_calculer",
    difficulty: 4,
    theme: "neutral",
    hint: "Combien de fois le nombre tient-il dans le résultat ?",
    tags: ["ce1", "multiplication", "calculer", "template"],
    generate: () =>
      tirer([
        () => tableTrou(randomChoice([2, 5, 10] as const), randomInt(2, 10)),
        // Quelle égalité est juste ?
        () => {
          const facile = randomChoice([2, 5, 10] as const);
          const n = randomInt(3, 10);
          const p = facile * n;
          const bonne = `${n} × ${facile} = ${p}`;
          const text = randomChoice([
            "Quelle égalité est juste ?",
            "Une seule de ces égalités est exacte. Laquelle ?",
            "Repère le calcul sans erreur.",
          ]);
          return {
            text,
            format: "qcm",
            choices: makeChoices(bonne, [
              `${n} × ${facile} = ${p + facile}`,
              `${n} × ${facile} = ${p - facile}`,
              `${n} × ${facile} = ${n + facile}`,
              `${n} × ${facile} = ${p + 1}`,
            ]),
            expected: [bonne],
            comparator: "mcq_exact",
            explanation: exp(
              "Pour vérifier une égalité, on refait le calcul.",
              `On utilise la table de ${facile}.`,
              `${facile} répété ${n} fois donne ${p}.`,
              `C'est ${bonne}.`,
            ),
          };
        },
        // Comparer deux produits.
        () => {
          const k1 = randomChoice([2, 5, 10] as const);
          const k2 = randomChoice([2, 5, 10] as const);
          const n1 = randomInt(2, 10);
          const n2 = randomInt(2, 10);
          const e1 = `${n1} × ${k1}`;
          const e2 = `${n2} × ${k2}`;
          if (e1 === e2) return tableTrou(k1, n1);
          const p1 = n1 * k1;
          const p2 = n2 * k2;
          const bonne = p1 === p2 ? "ils sont égaux" : p1 > p2 ? e1 : e2;
          const qui = quelquun();
          const text = randomChoice([
            `Quel est le plus grand : ${e1} ou ${e2} ?`,
            `${qui.nom} hésite entre ${e1} et ${e2}. Lequel donne le plus grand résultat ?`,
            `Compare ${e1} et ${e2} : lequel est le plus grand ?`,
          ]);
          return {
            text,
            format: "qcm",
            choices: makeChoices(bonne, [e1, e2, "ils sont égaux", "on ne peut pas savoir"]),
            expected: [bonne],
            comparator: "mcq_exact",
            explanation: exp(
              "Pour comparer deux multiplications, on calcule chacune avec sa table.",
              "On calcule les deux produits, puis on compare les résultats.",
              `${e1} = ${p1} et ${e2} = ${p2}.`,
              p1 === p2 ? "Ils sont égaux." : `Le plus grand est ${bonne}.`,
            ),
          };
        },
        // Faire des groupes : combien de lots ?
        () => {
          const lot = randomChoice(LOTS);
          const k = randomChoice([2, 5, 10] as const);
          const n = randomInt(3, 10);
          const total = n * k;
          const qui = quelquun();
          const text = randomChoice([
            `${lot.prep} chaque ${lot.un}, il y a ${k} ${lot.obj}. Il y a ${total} ${lot.obj} en tout. Combien y a-t-il ${de(lot.des)} ?`,
            `${qui.nom} répartit ${total} ${lot.obj} par ${k}. Combien ${de(lot.des)} remplit-${qui.il} ?`,
            `Avec ${total} ${lot.obj}, on fait des ${lot.des} de ${k}. Combien ${de(lot.des)} ?`,
          ]);
          return {
            text,
            format: "short",
            expected: [String(n)],
            comparator: "number_equal",
            explanation: exp(
              "Chercher un nombre de groupes, c'est chercher le nombre qui manque dans une multiplication.",
              `On cherche … × ${k} = ${total}, en récitant la table de ${k}.`,
              `${n} × ${k} = ${total}.`,
              `Il y a ${n} ${lot.des}.`,
            ),
          };
        },
      ]),
  },

  /* =========================================================
     CE1_MULTIPLICATION_DEFI — les défis
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_multiplication_defi_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce1_multiplication_defi",
    difficulty: 5,
    theme: "reunion",
    text: "Un marchand vend ses letchis par sachets de 10. Il en a préparé 7 sachets et il lui reste 4 letchis isolés. Combien a-t-il de letchis ?",
    format: "short",
    expected: ["74"],
    comparator: "number_equal",
    hint: "Sept sachets de dix, c'est sept dizaines.",
    explanation: exp(
      "Multiplier par 10 fabrique des dizaines : c'est la numération elle-même.",
      "On compte d'abord les sachets, puis on ajoute ce qui reste.",
      "7 × 10 = 70, puis 70 + 4 = 74. Le nombre 74 se lit d'ailleurs directement : 7 dizaines et 4 unités.",
      "Il a 74 letchis.",
    ),
    tags: ["ce1", "multiplication", "defi", "reunion"],
  },
  {
    kind: "template",
    id: "ce1_multiplication_defi_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce1_multiplication_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Deux étapes : le produit d'abord, l'ajout ensuite.",
    tags: ["ce1", "multiplication", "defi", "template"],
    generate: () =>
      tirer([
        // Des lots pleins, et quelques-uns en plus.
        () => {
          const lot = randomChoice(LOTS.filter((l) => l.objet));
          const paquets = randomInt(3, 8);
          const parPaquet = randomChoice([2, 5, 10] as const);
          const isoles = randomInt(1, parPaquet === 2 ? 1 : parPaquet - 1);
          const total = paquets * parPaquet + isoles;
          const qui = quelquun();
          const en = `${isoles} ${pl(isoles, lot.obj1, lot.obj)}`;
          const text = randomChoice([
            `Il y a ${paquets} ${lot.des} de ${parPaquet} ${lot.obj}, et ${en} en plus. Combien ${de(lot.obj)} en tout ?`,
            `${qui.nom} a ${paquets} ${lot.des} de ${parPaquet} ${lot.obj}. À côté, il reste ${en}. Combien ${de(lot.obj)} cela fait-il ?`,
            `${lot.prep} chaque ${lot.un}, il y a ${parPaquet} ${lot.obj}. On a ${paquets} ${lot.des}, plus ${en} à part. Quel est le total ?`,
          ]);
          return {
            text,
            format: "short",
            expected: [String(total)],
            comparator: "number_equal",
            explanation: exp(
              "Un problème à deux étapes se résout dans l'ordre : on cherche d'abord ce qu'on peut trouver.",
              "On calcule le contenu des lots, puis on ajoute ce qui est à part.",
              `${paquets} × ${parPaquet} = ${paquets * parPaquet}, puis ${paquets * parPaquet} + ${isoles} = ${total}.`,
              `Il y a ${total} ${lot.obj}.`,
            ),
          };
        },
        // Des lots pleins, et on en retire.
        () => {
          const lot = randomChoice(LOTS.filter((l) => l.objet));
          const paquets = randomInt(3, 9);
          const parPaquet = randomChoice([5, 10] as const);
          const plein = paquets * parPaquet;
          const retires = randomInt(2, parPaquet + 4);
          const reste = plein - retires;
          const qui = quelquun();
          const text = randomChoice([
            `${qui.nom} a ${paquets} ${lot.des} de ${parPaquet} ${lot.obj}. ${maj(qui.il)} donne ${retires} ${lot.obj}. Combien lui en reste-t-il ?`,
            `On achète ${paquets} ${lot.des} de ${parPaquet} ${lot.obj}, puis on utilise ${retires} ${lot.obj}. Combien en reste-t-il ?`,
            `Il y avait ${paquets} ${lot.des} de ${parPaquet} ${lot.obj}. On a pris ${retires} ${lot.obj}. Combien ${de(lot.obj)} reste-t-il ?`,
          ]);
          return {
            text,
            format: "short",
            expected: [String(reste)],
            comparator: "number_equal",
            explanation: exp(
              "Un problème à deux étapes : d'abord le total, ensuite ce qu'on enlève.",
              "On multiplie pour trouver le total, puis on soustrait.",
              `${paquets} × ${parPaquet} = ${plein}, puis ${plein} - ${retires} = ${reste}.`,
              `Il en reste ${reste}.`,
            ),
          };
        },
        // Deux tailles de lots.
        () => {
          const lot = randomChoice(LOTS.filter((l) => l.objet));
          const [k1, k2] = shuffle([2, 5, 10]).slice(0, 2);
          const n1 = randomInt(2, 6);
          const n2 = randomInt(2, 6);
          const total = n1 * k1 + n2 * k2;
          const qui = quelquun();
          const text = randomChoice([
            `${qui.nom} a ${n1} ${lot.des} de ${k1} ${lot.obj} et ${n2} ${lot.des} de ${k2} ${lot.obj}. Combien ${de(lot.obj)} en tout ?`,
            `Il y a ${n1} ${lot.des} de ${k1} ${lot.obj}, puis ${n2} ${lot.des} de ${k2} ${lot.obj}. Quel est le nombre total ${de(lot.obj)} ?`,
            `On réunit ${n1} ${lot.des} de ${k1} ${lot.obj} avec ${n2} ${lot.des} de ${k2} ${lot.obj}. Combien cela fait-il ${de(lot.obj)} ?`,
          ]);
          return {
            text,
            format: "short",
            expected: [String(total)],
            comparator: "number_equal",
            explanation: exp(
              "Deux sortes de lots : on compte chaque sorte, puis on additionne.",
              "Deux multiplications, puis une addition.",
              `${n1} × ${k1} = ${n1 * k1} ; ${n2} × ${k2} = ${n2 * k2} ; ${n1 * k1} + ${n2 * k2} = ${total}.`,
              `Il y a ${total} ${lot.obj}.`,
            ),
          };
        },
      ]),
  },
  {
    kind: "template",
    id: "ce1_multiplication_defi_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce1_multiplication_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Les deux façons de voir le quadrillage donnent le même total.",
    tags: ["ce1", "multiplication", "defi", "template"],
    generate: () =>
      tirer([
        // Le total d'un quadrillage.
        () => {
          const g = randomChoice(GRILLES);
          const lignes = randomInt(3, 9);
          const colonnes = randomChoice([2, 3, 4, 5, 10] as const);
          const total = lignes * colonnes;
          const qui = quelquun();
          const text = randomChoice([
            `${g.lieu}, on a ${lignes} rangées de ${colonnes} ${g.obj}. Combien ${de(g.obj)} en tout ?`,
            `${g.lieu}, ${qui.nom} compte ${colonnes} ${g.obj} par rangée, sur ${lignes} rangées. Combien en compte-t-${qui.il} ?`,
            `${g.lieu}, les ${g.obj} forment ${lignes} rangées de ${colonnes}. Quel est leur nombre total ?`,
          ]);
          return {
            text,
            format: "short",
            expected: [String(total)],
            comparator: "number_equal",
            explanation: exp(
              "Une collection rangée en lignes et en colonnes se compte par une multiplication.",
              "On peut compter les rangées ou les colonnes : le résultat est le même.",
              `${lignes} × ${colonnes} = ${total}, et ${colonnes} × ${lignes} = ${total} aussi.`,
              `Il y a ${total} ${g.obj}.`,
            ),
          };
        },
        // Le quadrillage dont il manque une dimension.
        () => {
          const g = randomChoice(GRILLES);
          const lignes = randomInt(3, 9);
          const colonnes = randomChoice([2, 5, 10] as const);
          const total = lignes * colonnes;
          const text = randomChoice([
            `${g.lieu}, ${total} ${g.obj} forment des rangées de ${colonnes}. Combien y a-t-il de rangées ?`,
            `${g.lieu}, on compte ${total} ${g.obj} en rangées de ${colonnes}, sans trou. Combien y a-t-il de rangées ?`,
            `${g.lieu}, il y a ${total} ${g.obj} en rangées de ${colonnes}. Combien de rangées faut-il ?`,
          ]);
          return {
            text,
            format: "short",
            expected: [String(lignes)],
            comparator: "number_equal",
            explanation: exp(
              "Chercher un nombre de rangées, c'est chercher le nombre qui manque dans une multiplication.",
              `On cherche … × ${colonnes} = ${total}, avec la table de ${colonnes}.`,
              `${lignes} × ${colonnes} = ${total}.`,
              `Il y a ${lignes} rangées.`,
            ),
          };
        },
        // Qui en a le plus, et de combien ?
        () => {
          const lot = randomChoice(LOTS.filter((l) => l.objet));
          const [p, q] = deuxPersonnes();
          let a = randomInt(2, 8);
          let k1 = randomChoice([2, 5, 10] as const) as number;
          let b = randomInt(2, 8);
          let k2 = randomChoice([2, 5, 10] as const) as number;
          if (a * k1 === b * k2) b += 1;
          if (a * k1 > b * k2) [a, k1, b, k2] = [b, k2, a, k1];
          const ecart = b * k2 - a * k1;
          const text = randomChoice([
            `${p.nom} a ${a} ${lot.des} de ${k1} ${lot.obj}. ${q.nom} a ${b} ${lot.des} de ${k2} ${lot.obj}. Combien ${de(lot.obj)} ${q.nom} a-t-${q.il} de plus ?`,
            `${p.nom} : ${a} ${lot.des} de ${k1} ${lot.obj}. ${q.nom} : ${b} ${lot.des} de ${k2} ${lot.obj}. Quelle est la différence entre les deux ?`,
            `${q.nom} a ${b} ${lot.des} de ${k2} ${lot.obj} et ${p.nom} ${a} ${lot.des} de ${k1}. Combien ${de(lot.obj)} manque-t-il à ${p.nom} pour en avoir autant ?`,
          ]);
          return {
            text,
            format: "short",
            expected: [String(ecart)],
            comparator: "number_equal",
            explanation: exp(
              "Comparer deux collections, c'est calculer chacune, puis chercher l'écart.",
              "Deux multiplications, puis une soustraction.",
              `${a} × ${k1} = ${a * k1} ; ${b} × ${k2} = ${b * k2} ; ${b * k2} - ${a * k1} = ${ecart}.`,
              `L'écart est de ${ecart} ${pl(ecart, lot.obj1, lot.obj)}.`,
            ),
          };
        },
      ]),
  },
];

/* =========================================================
   FAMILLES DE LA PARITÉ (★2 sur deux chiffres, ★3 sur trois)
   Déclarée en `function` : hissée, elle sert dans le tableau.
========================================================= */
function familleParite(min: number, max: number): Q {
  return tirer([
    // Pair ou impair ?
    () => {
      const n = randomInt(min, max);
      const bonne = n % 2 === 0 ? "pair" : "impair";
      const qui = quelquun();
      const text = randomChoice([
        `Le nombre ${n} est-il pair ou impair ?`,
        `Pair ou impair : ${n} ?`,
        `${qui.nom} dit que ${n} est pair. Que faut-il répondre ?`,
        `Range ${n} dans la bonne colonne : pair ou impair ?`,
        `${qui.nom} a le dossard n° ${n}. Ce numéro est-il pair ou impair ?`,
        `${qui.nom} tire le numéro ${n} à la loterie de la kermesse. Pair ou impair ?`,
        `La salle ${n} est au fond du couloir. ${qui.nom} se demande : ce numéro est-il pair ou impair ?`,
      ]);
      const pourQui = text.includes(" dit que ");
      const bonneTxt = pourQui
        ? bonne === "pair"
          ? `${qui.il} a raison, c'est pair`
          : `${qui.il} se trompe, c'est impair`
        : bonne;
      return {
        text,
        format: "qcm",
        choices: pourQui
          ? makeChoices(bonneTxt, [
              `${qui.il} a raison, c'est pair`,
              `${qui.il} se trompe, c'est impair`,
              "on ne peut pas savoir",
              "c'est les deux à la fois",
            ])
          : makeChoices(bonneTxt, [
              n % 2 === 0 ? "impair" : "pair",
              "les deux à la fois",
              "on ne peut pas savoir",
              "ni l'un ni l'autre",
            ]),
        expected: [bonneTxt],
        comparator: "mcq_exact",
        explanation: exp(
          "Un nombre pair se partage en deux parts égales sans reste ; un nombre impair, non.",
          "On regarde uniquement le chiffre des unités.",
          `Le chiffre des unités de ${n} est ${n % 10}. ${n % 2 === 0 ? "Il est dans la liste 0, 2, 4, 6, 8" : "Il n'est pas dans la liste 0, 2, 4, 6, 8"} : le nombre est donc ${bonne}.`,
          `${n} est ${bonne}.`,
        ),
      };
    },
    // Partager en deux parts égales.
    () => {
      const n = randomInt(min, max);
      const obj = randomChoice(OBJETS_PARTAGE);
      const [p, q] = deuxPersonnes();
      const pair = n % 2 === 0;
      const bonne = pair ? `oui, car ${n} est pair` : `non, car ${n} est impair`;
      const text = randomChoice([
        `${p.nom} a ${n} ${obj}. Peut-${p.il} les partager en deux parts égales, sans reste ?`,
        `${p.nom} veut partager ${n} ${obj} avec ${q.nom}, autant chacun. Est-ce possible sans rien couper ?`,
        `On répartit ${n} ${obj} entre deux équipes, autant pour chacune. Est-ce possible sans reste ?`,
        `${n} ${obj} à ranger dans deux boîtes, le même nombre dans chacune. Est-ce possible ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: makeChoices(bonne, [
          `oui, car ${n} est pair`,
          `non, car ${n} est impair`,
          `oui, car ${n} est impair`,
          `non, car ${n} est pair`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Un nombre est pair quand on peut le partager en deux parts égales, sans reste.",
          "On regarde le chiffre des unités.",
          pair
            ? `${n} se termine par ${n % 10} : il est pair, chacun en aura ${n / 2}.`
            : `${n} se termine par ${n % 10} : il est impair, il en restera toujours 1.`,
          pair ? "Oui, le partage tombe juste." : "Non, il reste 1 objet.",
        ),
      };
    },
    // Le seul pair (ou le seul impair) d'une liste.
    () => {
      const veutPair = randomChoice([true, false]);
      const ok = (x: number) => (x % 2 === 0) === veutPair;
      let bon = randomInt(min, max);
      if (!ok(bon)) bon = bon + 1 <= max ? bon + 1 : bon - 1;
      const pieges = new Set<string>();
      while (pieges.size < 3) {
        let x = randomInt(min, max);
        if (ok(x)) x = x + 1 <= max ? x + 1 : x - 1;
        if (x !== bon) pieges.add(String(x));
      }
      const mot = veutPair ? "pair" : "impair";
      const qui = quelquun();
      const text = randomChoice([
        `Lequel de ces nombres est ${mot} ?`,
        `Un seul de ces nombres est ${mot}. Lequel ?`,
        `${qui.nom} cherche le nombre ${mot}. Lequel doit-${qui.il} choisir ?`,
        `${qui.nom} ne veut que des numéros ${mot}s. Lequel de ces tickets garde-t-${qui.il} ?`,
        `Sur ces quatre maillots, un seul porte un numéro ${mot}. ${qui.nom} le cherche : lequel est-ce ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: makeChoices(String(bon), [...pieges]),
        expected: [String(bon)],
        comparator: "mcq_exact",
        explanation: exp(
          "C'est le chiffre des unités qui décide si un nombre est pair ou impair.",
          veutPair
            ? "On cherche le nombre qui se termine par 0, 2, 4, 6 ou 8."
            : "On cherche le nombre qui se termine par 1, 3, 5, 7 ou 9.",
          `${bon} se termine par ${bon % 10} : il est ${mot}.`,
          `C'est ${bon}.`,
        ),
      };
    },
  ]);
}
