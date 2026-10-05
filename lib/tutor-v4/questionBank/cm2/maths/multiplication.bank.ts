// lib/tutor-v4/question-banks/maths/cm2/multiplication.bank.ts

import type {
  TutorBankItemV4,
  TutorGeneratedQuestionV4,
  CalculPoseCanvasData,
} from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: T[]): T[] {
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

function calculPoseCanvas(
  data: Omit<CalculPoseCanvasData, "kind">
): CalculPoseCanvasData {
  return { kind: "calcul_pose", ...data };
}

function exp(
  definition: string,
  methode: string,
  calcul: string,
  conclusion: string
) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;
}

// ============================================================
// VARIÉTÉ DES ÉNONCÉS (05/10/2026)
// ============================================================
// ⛔ Mesure du 05/10 (scripts/mesurer-squelettes-coach.ts cm2 multiplication) :
// 4 à 13 squelettes par micro, 13 à 19 répétitions sur 20. Ceux qui révisent
// ici sont surtout des 6e en remédiation : ils reconnaissent la PHRASE, pas
// les nombres (« 3 paquets de 7 » et « 4 paquets de 9 », c'est la même
// question pour eux). Chaque gabarit tire donc une SITUATION × une TOURNURE.
// ⚠️ Un calcul nu (« Calcule : # × # ») a le MÊME squelette quel que soit le
// facteur : les gabarits de stratégie disent leur stratégie dans l'énoncé
// (« fais × 10 puis prends la moitié »), sinon ils se confondent tous.
// ⛔ Pas de format "open" : applyMathsKeyboardFree les retire au primaire, et
// change les "short" numériques en QCM (voisins, ±10, ×2).

type Q = TutorGeneratedQuestionV4;
type Mot = readonly [string, string];

/** 1 000, 4 800, 12 500 : l’espace des milliers (4 chiffres et plus). */
function F(f: number) {
  return f >= 1000 ? nf(f).replace(/^(\d)(\d{3})$/, "$1 $2") : String(f);
}

/** Grand nombre lisible : 12 500 (les nombres à 4 chiffres restent collés). */
function nf(n: number) {
  return n >= 10000 ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ") : String(n);
}

/** « 1 boîte », « 4 boîtes ». */
function pl(n: number, mot: Mot) {
  return `${nf(n)} ${n > 1 ? mot[1] : mot[0]}`;
}

/** « de crayons », « d’œufs » : l’élision devant une voyelle. */
function de(mot: string) {
  return /^[aeiouyàâéèêîïôœ]/i.test(mot) ? `d’${mot}` : `de ${mot}`;
}

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function min1(s: string) {
  return s.charAt(0).toLowerCase() + s.slice(1);
}

type Eleve = { nom: string; il: "il" | "elle" };

const ELEVES: Eleve[] = [
  { nom: "Léa", il: "elle" },
  { nom: "Noah", il: "il" },
  { nom: "Inès", il: "elle" },
  { nom: "Yanis", il: "il" },
  { nom: "Chloé", il: "elle" },
  { nom: "Adam", il: "il" },
  { nom: "Maëlle", il: "elle" },
  { nom: "Lucas", il: "il" },
  { nom: "Aïcha", il: "elle" },
  { nom: "Hugo", il: "il" },
  { nom: "Jade", il: "elle" },
  { nom: "Kenzo", il: "il" },
  { nom: "Sofia", il: "elle" },
  { nom: "Malo", il: "il" },
  { nom: "Nour", il: "elle" },
  { nom: "Théo", il: "il" },
  { nom: "Zoé", il: "elle" },
  { nom: "Ibrahim", il: "il" },
];

function deuxEleves(): [Eleve, Eleve] {
  const a = randomChoice(ELEVES);
  return [a, randomChoice(ELEVES.filter((e) => e.nom !== a.nom))];
}

function court(text: string, reponse: number, explanation: string, canvas?: CalculPoseCanvasData): Q {
  return {
    text,
    format: "short",
    expected: [String(reponse)],
    comparator: "number_equal",
    explanation,
    ...(canvas ? { canvas } : {}),
  };
}

function qcm(text: string, correct: string, wrongs: readonly string[], explanation: string): Q {
  return {
    text,
    format: "qcm",
    choices: makeChoices(correct, wrongs),
    expected: [correct],
    comparator: "mcq_exact",
    explanation,
  };
}

function posee(a: number, b: number, title: string, questionLabel?: string) {
  return calculPoseCanvas({
    operation: "multiplication",
    title,
    numbers: [String(a), String(b)],
    result: String(a * b),
    ...(questionLabel ? { questionLabel } : {}),
    display: {
      showResult: false,
      showRetenues: false,
    },
  });
}

// ------------------------------------------------------------
// Calculs nus : les tournures
// ------------------------------------------------------------

type Tournure = (a: string, b: string) => string;

const T_PRODUIT: Tournure[] = [
  (a, b) => `Calcule : ${a} × ${b}`,
  (a, b) => `Combien font ${a} × ${b} ?`,
  (a, b) => `Quel est le produit de ${a} par ${b} ?`,
  (a, b) => `${a} fois ${b}, cela fait combien ?`,
  (a, b) => `Complète : ${a} × ${b} = …`,
  (a, b) => `Quel nombre obtient-on en multipliant ${a} par ${b} ?`,
  (a, b) => `Complète : … = ${a} × ${b}`,
  (a, b) => `Que vaut ${a} × ${b} ?`,
];

const T_POSEE: Tournure[] = [
  (a, b) => `Pose et calcule : ${a} × ${b}`,
  (a, b) => `Pose la multiplication ${a} × ${b}. Quel résultat trouves-tu ?`,
  (a, b) => `Calcule en posant l’opération : ${a} × ${b}`,
  (a, b) => `Combien font ${a} × ${b} ? Tu peux poser l’opération.`,
  (a, b) => `Effectue la multiplication posée de ${a} par ${b}.`,
  (a, b) => `Quel est le résultat de ${a} × ${b} ? Pose-la en colonnes.`,
];

function texteFacteur(a: number, c: number) {
  return randomChoice([
    `Complète : ${a} × … = ${c}`,
    `Complète : … × ${a} = ${c}`,
    `Quel nombre multiplié par ${a} donne ${c} ?`,
    `Par combien faut-il multiplier ${a} pour obtenir ${c} ?`,
    `${a} fois combien font ${c} ?`,
    `Trouve le nombre manquant : ${c} = ${a} × …`,
    `Combien de fois ${a} y a-t-il dans ${c} ?`,
  ]);
}

/** Une égalité annoncée, juste ou fausse, sous l’une de ses formes. */
function qVraiFaux(a: number, b: number, annonce: number, definition: string, methode: string): Q {
  const r = a * b;
  const juste = annonce === r;
  const e = randomChoice(ELEVES);
  const [A, B, X] = [F(a), F(b), F(annonce)];
  const eg = randomChoice([
    `${A} × ${B} = ${X}`,
    `${X} = ${A} × ${B}`,
    `${A} fois ${B} font ${X}`,
    `le produit de ${A} par ${B} est ${X}`,
  ]);
  const [text, oui, non] = randomChoice<[string, string, string]>([
    [`Vrai ou faux : ${eg}.`, "vrai", "faux"],
    [`${e.nom} affirme que ${eg}. A-t-${e.il} raison ?`, "oui", "non"],
    [`Un élève a écrit : ${eg}. Est-ce juste ?`, "oui", "non"],
    [`Est-il vrai que ${eg} ?`, "oui", "non"],
    [`Au tableau, on lit : ${eg}. Est-ce correct ?`, "oui", "non"],
  ]);
  const rep = juste ? oui : non;
  return {
    text,
    format: "qcm",
    choices: [oui, non],
    expected: [rep],
    comparator: "mcq_exact",
    explanation: exp(
      definition,
      methode,
      juste ? `${A} × ${B} = ${F(r)}.` : `${A} × ${B} = ${F(r)}, et non ${X}.`,
      `La bonne réponse est « ${rep} ».`
    ),
  };
}

/** Une fois sur deux le bon résultat, sinon l’un des pièges proposés. */
function annonce(r: number, pieges: number[]) {
  const faux = pieges.filter((p) => p > 0 && p !== r);
  return Math.random() < 0.5 || !faux.length ? r : randomChoice(faux);
}

// ------------------------------------------------------------
// Situations : des groupes égaux
// ------------------------------------------------------------

type Lot = {
  lieu: string; // début de phrase : « À la cantine »
  cont: Mot; // le contenant : boîte, rangée, équipe…
  obj: Mot; // ce qu’il contient
  prep: "dans" | "sur";
  kMax: number; // objets par contenant, au plus (vraisemblance)
};

const LOTS: Lot[] = [
  { lieu: "À l’école", cont: ["boîte", "boîtes"], obj: ["crayon", "crayons"], prep: "dans", kMax: 24 },
  { lieu: "À la cantine", cont: ["table", "tables"], obj: ["assiette", "assiettes"], prep: "sur", kMax: 10 },
  { lieu: "Au potager", cont: ["rang", "rangs"], obj: ["salade", "salades"], prep: "dans", kMax: 30 },
  { lieu: "À la bibliothèque", cont: ["étagère", "étagères"], obj: ["livre", "livres"], prep: "sur", kMax: 40 },
  { lieu: "Au gymnase", cont: ["équipe", "équipes"], obj: ["joueur", "joueurs"], prep: "dans", kMax: 11 },
  { lieu: "À la ferme", cont: ["boîte", "boîtes"], obj: ["œuf", "œufs"], prep: "dans", kMax: 12 },
  { lieu: "Pour la fête", cont: ["sachet", "sachets"], obj: ["bonbon", "bonbons"], prep: "dans", kMax: 30 },
  { lieu: "Chez le fleuriste", cont: ["bouquet", "bouquets"], obj: ["fleur", "fleurs"], prep: "dans", kMax: 25 },
  { lieu: "Dans l’album", cont: ["page", "pages"], obj: ["autocollant", "autocollants"], prep: "sur", kMax: 12 },
  { lieu: "À la boulangerie", cont: ["plateau", "plateaux"], obj: ["croissant", "croissants"], prep: "sur", kMax: 24 },
  { lieu: "Au supermarché", cont: ["pack", "packs"], obj: ["bouteille", "bouteilles"], prep: "dans", kMax: 12 },
  { lieu: "Au cinéma", cont: ["rangée", "rangées"], obj: ["fauteuil", "fauteuils"], prep: "dans", kMax: 30 },
  { lieu: "Au club de tennis", cont: ["seau", "seaux"], obj: ["balle", "balles"], prep: "dans", kMax: 50 },
  { lieu: "À la papeterie", cont: ["lot", "lots"], obj: ["cahier", "cahiers"], prep: "dans", kMax: 10 },
  { lieu: "Sur le parking", cont: ["rangée", "rangées"], obj: ["voiture", "voitures"], prep: "dans", kMax: 40 },
  { lieu: "À la piscine", cont: ["couloir", "couloirs"], obj: ["nageur", "nageurs"], prep: "dans", kMax: 8 },
  // Le seul décor réunionnais de la liste (La Réunion n’est pas le décor par défaut).
  { lieu: "Au marché de Saint-Pierre", cont: ["panier", "paniers"], obj: ["mangue", "mangues"], prep: "dans", kMax: 15 },
  { lieu: "Au verger", cont: ["caisse", "caisses"], obj: ["pomme", "pommes"], prep: "dans", kMax: 40 },
  { lieu: "Dans la classe", cont: ["rangée", "rangées"], obj: ["table", "tables"], prep: "dans", kMax: 8 },
  { lieu: "Au jardin public", cont: ["massif", "massifs"], obj: ["rosier", "rosiers"], prep: "dans", kMax: 20 },
  { lieu: "À la poste", cont: ["carnet", "carnets"], obj: ["timbre", "timbres"], prep: "dans", kMax: 20 },
];

/** Les défis « nature » (le margouillat de l’ancien gabarit en fait partie). */
const NATURE: Lot[] = [
  { lieu: "Dans le jardin", cont: ["mur", "murs"], obj: ["margouillat", "margouillats"], prep: "sur", kMax: 9 },
  { lieu: "Dans la forêt", cont: ["arbre", "arbres"], obj: ["nid", "nids"], prep: "dans", kMax: 5 },
  { lieu: "Au bord de l’étang", cont: ["nénuphar", "nénuphars"], obj: ["grenouille", "grenouilles"], prep: "sur", kMax: 3 },
  { lieu: "Au rucher", cont: ["ruche", "ruches"], obj: ["cadre", "cadres"], prep: "dans", kMax: 10 },
  { lieu: "Dans le poulailler", cont: ["nid", "nids"], obj: ["œuf", "œufs"], prep: "dans", kMax: 6 },
  { lieu: "Sur la plage", cont: ["sac", "sacs"], obj: ["déchet", "déchets"], prep: "dans", kMax: 30 },
  { lieu: "Au parc", cont: ["banc", "bancs"], obj: ["pigeon", "pigeons"], prep: "sur", kMax: 9 },
  { lieu: "Dans le verger", cont: ["arbre", "arbres"], obj: ["oiseau", "oiseaux"], prep: "dans", kMax: 9 },
  { lieu: "Au bord de la rivière", cont: ["rocher", "rochers"], obj: ["tortue", "tortues"], prep: "sur", kMax: 6 },
  { lieu: "À l’aquarium du club", cont: ["bac", "bacs"], obj: ["poisson", "poissons"], prep: "dans", kMax: 15 },
  { lieu: "Dans le potager", cont: ["plant", "plants"], obj: ["tomate", "tomates"], prep: "sur", kMax: 20 },
];

/** Un coffre de jeu vidéo, pour le défi trésor. */
const COFFRE: Lot = { lieu: "Dans le jeu vidéo", cont: ["coffre", "coffres"], obj: ["pièce", "pièces"], prep: "dans", kMax: 50 };

/** Des groupes par 10, 100 ou 1 000 (puissances de dix). */
type LotDix = Lot & { ks: number[] };

const LOTS_DIX: LotDix[] = [
  { lieu: "À la fête foraine", cont: ["carnet", "carnets"], obj: ["ticket", "tickets"], prep: "dans", kMax: 10, ks: [10] },
  { lieu: "À la poste", cont: ["carnet", "carnets"], obj: ["timbre", "timbres"], prep: "dans", kMax: 10, ks: [10] },
  { lieu: "Au club de foot", cont: ["filet", "filets"], obj: ["ballon", "ballons"], prep: "dans", kMax: 10, ks: [10] },
  { lieu: "À l’école", cont: ["boîte", "boîtes"], obj: ["craie", "craies"], prep: "dans", kMax: 100, ks: [10, 100] },
  { lieu: "Au rayon jouets", cont: ["sachet", "sachets"], obj: ["bille", "billes"], prep: "dans", kMax: 100, ks: [10, 100] },
  { lieu: "À la cantine", cont: ["carton", "cartons"], obj: ["compote", "compotes"], prep: "dans", kMax: 100, ks: [10, 100] },
  { lieu: "Au bureau", cont: ["boîte", "boîtes"], obj: ["trombone", "trombones"], prep: "dans", kMax: 100, ks: [100] },
  { lieu: "À l’imprimerie", cont: ["paquet", "paquets"], obj: ["feuille", "feuilles"], prep: "dans", kMax: 100, ks: [100] },
  { lieu: "À la jardinerie", cont: ["sachet", "sachets"], obj: ["graine", "graines"], prep: "dans", kMax: 1000, ks: [100, 1000] },
  { lieu: "Au magasin de perles", cont: ["tube", "tubes"], obj: ["perle", "perles"], prep: "dans", kMax: 1000, ks: [100, 1000] },
  { lieu: "Sur le chantier", cont: ["palette", "palettes"], obj: ["brique", "briques"], prep: "sur", kMax: 1000, ks: [100, 1000] },
  { lieu: "À la papeterie", cont: ["carton", "cartons"], obj: ["enveloppe", "enveloppes"], prep: "dans", kMax: 1000, ks: [100, 1000] },
];

/** De grands nombres vraisemblables (multiplication posée, défis). */
type GrandLot = Lot & { grand: "n" | "k"; grandMax: number; petits: number[] };

const GRANDS: GrandLot[] = [
  { lieu: "À l’usine", cont: ["boîte", "boîtes"], obj: ["œuf", "œufs"], prep: "dans", kMax: 9999, grand: "n", grandMax: 999, petits: [6, 12] },
  { lieu: "À l’entrepôt", cont: ["pack", "packs"], obj: ["bouteille", "bouteilles"], prep: "dans", kMax: 9999, grand: "n", grandMax: 999, petits: [4, 6, 8, 12] },
  { lieu: "Au stade", cont: ["tribune", "tribunes"], obj: ["siège", "sièges"], prep: "dans", kMax: 9999, grand: "k", grandMax: 999, petits: [2, 3, 4, 5, 6, 7, 8] },
  { lieu: "À l’imprimerie", cont: ["carton", "cartons"], obj: ["livre", "livres"], prep: "dans", kMax: 9999, grand: "n", grandMax: 999, petits: [5, 6, 7, 8, 9, 12, 15, 16, 18, 20, 24, 25, 30] },
  { lieu: "Au verger", cont: ["caisse", "caisses"], obj: ["pomme", "pommes"], prep: "dans", kMax: 9999, grand: "n", grandMax: 600, petits: [6, 8, 9, 12, 15, 18, 20, 24, 25, 30, 35] },
  { lieu: "Dans le train", cont: ["wagon", "wagons"], obj: ["place", "places"], prep: "dans", kMax: 9999, grand: "k", grandMax: 96, petits: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
  { lieu: "À la jardinerie", cont: ["sachet", "sachets"], obj: ["graine", "graines"], prep: "dans", kMax: 9999, grand: "k", grandMax: 500, petits: [2, 3, 4, 5, 6, 7, 8, 9, 12, 15, 20, 24] },
  { lieu: "Au centre de tri", cont: ["sac", "sacs"], obj: ["lettre", "lettres"], prep: "dans", kMax: 9999, grand: "k", grandMax: 999, petits: [2, 3, 4, 5, 6, 7, 8, 9, 12, 15, 18, 25] },
  { lieu: "Dans le champ", cont: ["rang", "rangs"], obj: ["pied de maïs", "pieds de maïs"], prep: "dans", kMax: 9999, grand: "k", grandMax: 400, petits: [3, 4, 5, 6, 7, 8, 9, 12, 15, 16, 18, 20, 24] },
  { lieu: "Au concert", cont: ["rangée", "rangées"], obj: ["chaise", "chaises"], prep: "dans", kMax: 9999, grand: "k", grandMax: 48, petits: [12, 14, 15, 16, 18, 20, 22, 24, 25, 30, 35, 40] },
  { lieu: "À la bibliothèque municipale", cont: ["rayon", "rayons"], obj: ["livre", "livres"], prep: "dans", kMax: 9999, grand: "k", grandMax: 450, petits: [3, 4, 5, 6, 7, 8, 9, 12, 14, 16, 18, 24] },
  { lieu: "À la chocolaterie", cont: ["boîte", "boîtes"], obj: ["chocolat", "chocolats"], prep: "dans", kMax: 9999, grand: "n", grandMax: 999, petits: [6, 8, 9, 12, 16, 24] },
  { lieu: "À l’aquarium", cont: ["bassin", "bassins"], obj: ["poisson", "poissons"], prep: "dans", kMax: 9999, grand: "k", grandMax: 300, petits: [2, 3, 4, 5, 6, 7, 8, 9] },
  { lieu: "Pour le marathon", cont: ["carton", "cartons"], obj: ["bouteille d’eau", "bouteilles d’eau"], prep: "dans", kMax: 9999, grand: "n", grandMax: 400, petits: [6, 8, 12, 24] },
];

/** Un lot et un nombre d’objets par contenant qui lui va. */
function tireLot(lots: readonly Lot[], ks: readonly number[]): { L: Lot; k: number } {
  const L = randomChoice(lots.filter((l) => ks.some((k) => k <= l.kMax)));
  return { L, k: randomChoice(ks.filter((k) => k <= L.kMax)) };
}

/** Un grand nombre (entre min et max) et un petit facteur, placés selon le lot. */
function tireGrand(min: number, max: number, petitOk: (p: number) => boolean) {
  const L = randomChoice(GRANDS.filter((l) => l.grandMax >= min && l.petits.some(petitOk)));
  const g = randomInt(min, Math.min(max, L.grandMax));
  const p = randomChoice(L.petits.filter(petitOk));
  return L.grand === "n" ? { L, n: g, k: p, g, p } : { L, n: p, k: g, g, p };
}

function texteLot(L: Lot, n: number, k: number) {
  const e = randomChoice(ELEVES);
  return randomChoice([
    `${L.lieu}, il y a ${pl(n, L.cont)} avec ${pl(k, L.obj)} ${L.prep} chaque ${L.cont[0]}. Combien y a-t-il ${de(L.obj[1])} en tout ?`,
    `${L.lieu}, on compte ${pl(k, L.obj)} ${L.prep} chaque ${L.cont[0]}. Combien ${de(L.obj[1])} y a-t-il ${L.prep} ${pl(n, L.cont)} ?`,
    `${L.lieu} : ${pl(n, L.cont)} de ${pl(k, L.obj)}. Quel est le nombre total ${de(L.obj[1])} ?`,
    `${L.lieu}, ${e.nom} compte ${pl(n, L.cont)}. ${cap(L.prep)} chaque ${L.cont[0]}, il y a ${pl(k, L.obj)}. Combien ${de(L.obj[1])} ${e.nom} compte-t-${e.il} en tout ?`,
  ]);
}

function explLot(L: Lot, n: number, k: number) {
  return exp(
    "La multiplication sert à compter des groupes égaux.",
    `On multiplie le nombre ${de(L.cont[1])} par le nombre ${de(L.obj[1])} ${L.prep} chaque ${L.cont[0]}.`,
    `${nf(n)} × ${nf(k)} = ${nf(n * k)}.`,
    `Il y a ${pl(n * k, L.obj)} en tout.`
  );
}

function qLot(L: Lot, n: number, k: number, prefixe = "", canvas?: CalculPoseCanvasData): Q {
  // Après « Défi : », pas de majuscule (« Défi : au verger, … »).
  const texte = texteLot(L, n, k);
  return court(prefixe ? `${prefixe}${min1(texte)}` : texte, n * k, explLot(L, n, k), canvas);
}

/** Le même lot pris par l’autre bout : on connaît le total, on cherche un facteur. */
function qLotManquant(L: Lot, n: number, k: number): Q {
  const t = n * k;
  const e = randomChoice(ELEVES);
  if (Math.random() < 0.5) {
    const text = randomChoice([
      `${L.lieu}, on répartit ${pl(t, L.obj)} : ${k} ${L.prep} chaque ${L.cont[0]}. Combien ${de(L.cont[1])} faut-il ?`,
      `${L.lieu}, ${e.nom} range ${pl(t, L.obj)}, ${k} ${L.prep} chaque ${L.cont[0]}. Combien ${de(L.cont[1])} utilise-t-${e.il} ?`,
    ]);
    return court(
      text,
      n,
      exp(
        "Chercher le nombre de groupes, c’est chercher un facteur manquant.",
        `On cherche le nombre qui, multiplié par ${k}, donne ${t} : … × ${k} = ${t}.`,
        `${n} × ${k} = ${t}.`,
        `Il faut ${pl(n, L.cont)}.`
      )
    );
  }
  const text = randomChoice([
    `${L.lieu}, il y a en tout ${pl(t, L.obj)} ${L.prep} ${pl(n, L.cont)}, autant ${L.prep} chaque ${L.cont[0]}. Combien ${de(L.obj[1])} y a-t-il ${L.prep} chaque ${L.cont[0]} ?`,
    `${L.lieu}, on répartit ${pl(t, L.obj)} de façon égale ${L.prep} ${pl(n, L.cont)}. Combien ${de(L.obj[1])} y a-t-il ${L.prep} chaque ${L.cont[0]} ?`,
  ]);
  return court(
    text,
    k,
    exp(
      "Chercher la quantité dans chaque groupe, c’est chercher un facteur manquant.",
      `On cherche le nombre qui, multiplié par ${n}, donne ${t} : ${n} × … = ${t}.`,
      `${n} × ${k} = ${t}.`,
      `Il y a ${pl(k, L.obj)} ${L.prep} chaque ${L.cont[0]}.`
    )
  );
}

/** Quel calcul pour cette situation ? (n ≠ k) */
function qChoisirCalcul(L: Lot, n: number, k: number): Q {
  const situation = `${L.lieu}, il y a ${pl(n, L.cont)} avec ${pl(k, L.obj)} ${L.prep} chaque ${L.cont[0]}.`;
  const text = randomChoice([
    `« ${situation} » Quel calcul donne le nombre total ${de(L.obj[1])} ?`,
    `Quel calcul permet de trouver combien il y a ${de(L.obj[1])} en tout ? « ${situation} »`,
    `Lis : « ${situation} » Pour trouver le total, quel calcul faut-il faire ?`,
  ]);
  const grand = Math.max(n, k);
  const petit = Math.min(n, k);
  return qcm(
    text,
    `${n} × ${k}`,
    [`${n} + ${k}`, `${grand} − ${petit}`, `${n} + ${n} + ${k}`, `${grand} + ${grand}`],
    exp(
      "Choisir l’opération, c’est comprendre le sens du problème.",
      `« ${cap(L.prep)} chaque ${L.cont[0]} » : la même quantité est répétée ${n} fois.`,
      `Il faut calculer ${n} × ${k} = ${n * k}.`,
      `Le bon calcul est ${n} × ${k}.`
    )
  );
}

/** Un élève a-t-il choisi la bonne opération ? (une fois sur deux, oui) */
function qErreurOperation(L: Lot, n: number, k: number): Q {
  const e = randomChoice(ELEVES);
  const bon = Math.random() < 0.5;
  const calc = bon ? `${n} × ${k} = ${n * k}` : `${n} + ${k} = ${n + k}`;
  const situation = `${L.lieu}, il y a ${pl(n, L.cont)} avec ${pl(k, L.obj)} ${L.prep} chaque ${L.cont[0]}.`;
  const text = randomChoice([
    `${e.nom} lit : « ${situation} » Pour trouver le total, ${e.il} calcule ${calc}. A-t-${e.il} choisi la bonne opération ?`,
    `Problème : « ${situation} » ${e.nom} écrit ${calc}. Son calcul donne-t-il le nombre total ${de(L.obj[1])} ?`,
  ]);
  const rep = bon ? "oui" : "non";
  return {
    text,
    format: "qcm",
    choices: ["oui", "non"],
    expected: [rep],
    comparator: "mcq_exact",
    explanation: exp(
      "Quand plusieurs groupes contiennent chacun la même quantité, on multiplie.",
      `Il y a ${pl(n, L.cont)} de ${k} : c’est ${n} fois ${k}.`,
      bon ? `${n} × ${k} = ${n * k} : c’est bien le total.` : `Il fallait ${n} × ${k} = ${n * k}, et non ${n} + ${k}.`,
      `La bonne réponse est « ${rep} ».`
    ),
  };
}

// ------------------------------------------------------------
// Situations : des achats
// ------------------------------------------------------------

type Achat = { obj: Mot; g: "m" | "f"; lieu: string; prix: number[] };

const ACHATS: Achat[] = [
  { obj: ["cahier", "cahiers"], g: "m", lieu: "à la papeterie", prix: [2, 3, 4] },
  { obj: ["stylo", "stylos"], g: "m", lieu: "à la papeterie", prix: [2, 3] },
  { obj: ["place de cinéma", "places de cinéma"], g: "f", lieu: "au cinéma", prix: [6, 7, 8, 9] },
  { obj: ["ticket de manège", "tickets de manège"], g: "m", lieu: "à la fête foraine", prix: [2, 3, 4, 5] },
  { obj: ["livre", "livres"], g: "m", lieu: "à la librairie", prix: [5, 6, 7, 8, 9, 12, 15] },
  { obj: ["ballon", "ballons"], g: "m", lieu: "au magasin de sport", prix: [6, 7, 8, 9, 12, 15, 20] },
  { obj: ["pot de confiture", "pots de confiture"], g: "m", lieu: "au marché", prix: [3, 4, 5] },
  { obj: ["plante", "plantes"], g: "f", lieu: "à la jardinerie", prix: [4, 5, 6, 7, 8, 9, 12] },
  { obj: ["jeu de société", "jeux de société"], g: "m", lieu: "au magasin de jouets", prix: [12, 15, 20, 25, 30, 40] },
  { obj: ["entrée à la piscine", "entrées à la piscine"], g: "f", lieu: "à l’accueil de la piscine", prix: [2, 3, 4] },
  { obj: ["t-shirt", "t-shirts"], g: "m", lieu: "au magasin", prix: [7, 8, 9, 10, 12, 15] },
  { obj: ["boîte de peinture", "boîtes de peinture"], g: "f", lieu: "au magasin de loisirs", prix: [5, 6, 7, 8, 9] },
  { obj: ["melon", "melons"], g: "m", lieu: "au marché", prix: [2, 3, 4] },
  { obj: ["place de concert", "places de concert"], g: "f", lieu: "à la billetterie", prix: [9, 12, 15, 18, 20, 25, 30] },
  { obj: ["sandwich", "sandwichs"], g: "m", lieu: "à la boulangerie", prix: [3, 4, 5] },
  { obj: ["sac à dos", "sacs à dos"], g: "m", lieu: "au magasin", prix: [15, 20, 25, 30, 40] },
  { obj: ["paire de baskets", "paires de baskets"], g: "f", lieu: "au magasin de sport", prix: [30, 40, 45, 50, 60] },
];

const ACHETEURS = ["L’école", "Le centre de loisirs", "Le club de sport", "La mairie", "Une association", "Le collège"];

function tireAchat(prixOk: (p: number) => boolean) {
  const A = randomChoice(ACHATS.filter((a) => a.prix.some(prixOk)));
  return { A, p: randomChoice(A.prix.filter(prixOk)) };
}

function texteAchat(A: Achat, n: number, p: number) {
  const e = randomChoice(ELEVES);
  const un = A.g === "m" ? "un" : "une";
  return randomChoice([
    `${cap(A.lieu)}, ${un} ${A.obj[0]} coûte ${p} €. Combien coûtent ${pl(n, A.obj)} ?`,
    `${e.nom} achète ${pl(n, A.obj)} à ${p} € pièce ${A.lieu}. Combien paie-t-${e.il} ?`,
    `${cap(A.lieu)}, ${pl(n, A.obj)} à ${p} € l’${un} : quel est le prix total ?`,
    `Quel est le prix de ${pl(n, A.obj)} si ${un} ${A.obj[0]} coûte ${p} € ?`,
  ]);
}

function texteAchatGroupe(A: Achat, n: number, p: number) {
  const qui = randomChoice(ACHETEURS);
  const un = A.g === "m" ? "un" : "une";
  return randomChoice([
    `${qui} achète ${pl(n, A.obj)} à ${p} € pièce. Quel est le prix total ?`,
    `${qui} commande ${pl(n, A.obj)}. ${cap(un)} ${A.obj[0]} coûte ${p} €. Combien faut-il payer ?`,
    `Pour une sortie, ${min1(qui)} paie ${pl(n, A.obj)} à ${p} € l’${un}. Combien dépense-t-on ?`,
  ]);
}

function explAchat(A: Achat, n: number, p: number) {
  return exp(
    "Pour un prix total, on multiplie le prix d’un objet par le nombre d’objets.",
    `On multiplie le nombre ${de(A.obj[1])} par le prix ${A.g === "m" ? "d’un" : "d’une"} ${A.obj[0]}.`,
    `${nf(n)} × ${p} = ${nf(n * p)}.`,
    `Le prix total est ${nf(n * p)} €.`
  );
}

function qAchat(n: number, prixOk: (p: number) => boolean, groupe = false): Q {
  const { A, p } = tireAchat(prixOk);
  return court(groupe ? texteAchatGroupe(A, n, p) : texteAchat(A, n, p), n * p, explAchat(A, n, p));
}

// ------------------------------------------------------------
// Situations : « fois plus », rythmes, récompenses, quadrillages
// ------------------------------------------------------------

const COLLECTIONS: Mot[] = [
  ["bille", "billes"],
  ["carte", "cartes"],
  ["timbre", "timbres"],
  ["coquillage", "coquillages"],
  ["autocollant", "autocollants"],
  ["point", "points"],
  ["perle", "perles"],
  ["image", "images"],
  ["livre", "livres"],
  ["figurine", "figurines"],
  ["badge", "badges"],
];

function qFoisPlus(k: number, n: number): Q {
  const [A, B] = deuxEleves();
  const o = randomChoice(COLLECTIONS);
  const t = k * n;
  const formes = [
    `${A.nom} a ${pl(k, o)}. ${B.nom} en a ${n} fois plus. Combien ${de(o[1])} ${B.nom} a-t-${B.il} ?`,
    `${B.nom} a ${n} fois plus ${de(o[1])} que ${A.nom}, qui en a ${k}. Combien ${de(o[1])} a ${B.nom} ?`,
    `${A.nom} possède ${pl(k, o)}, et ${B.nom} ${n} fois plus. Combien ${de(o[1])} possède ${B.nom} ?`,
  ];
  const mot = { 2: "le double", 3: "le triple", 4: "le quadruple" }[n];
  if (mot) formes.push(`${A.nom} a ${pl(k, o)}. ${B.nom} en a ${mot}. Combien ${de(o[1])} a ${B.nom} ?`);
  return court(
    randomChoice(formes),
    t,
    exp(
      `« ${n} fois plus » se traduit par une multiplication par ${n}.`,
      `On multiplie le nombre ${de(o[1])} ${de(A.nom)} par ${n}.`,
      `${k} × ${n} = ${t}.`,
      `${B.nom} a ${pl(t, o)}.`
    )
  );
}

type Rythme = { ks: number[]; ns: number[]; unite: Mot; textes: (e: Eleve, k: number, n: number) => string[] };

const JOUR: Mot = ["jour", "jours"];
const SEMAINE: Mot = ["semaine", "semaines"];

const RYTHMES: Rythme[] = [
  {
    ks: [5, 6, 7, 8, 9, 12, 15, 20, 25], ns: [3, 4, 5, 6, 7, 8, 9, 10, 12], unite: ["page", "pages"],
    textes: (e, k, n) => [
      `${e.nom} lit ${pl(k, ["page", "pages"])} chaque jour pendant ${pl(n, JOUR)}. Combien de pages lit-${e.il} en tout ?`,
      `Pendant ${pl(n, JOUR)}, ${e.nom} lit ${pl(k, ["page", "pages"])} par jour. Combien de pages a-t-${e.il} lues ?`,
    ],
  },
  {
    ks: [2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15], ns: [3, 4, 5, 6, 7, 8, 9, 10, 12], unite: ["euro", "euros"],
    textes: (e, k, n) => [
      `${e.nom} met ${k} € dans sa tirelire chaque semaine. Combien d’euros a-t-${e.il} mis au bout de ${pl(n, SEMAINE)} ?`,
      `Chaque semaine, ${e.nom} économise ${k} €. Combien a-t-${e.il} économisé en ${pl(n, SEMAINE)} ?`,
    ],
  },
  {
    ks: [3, 4, 5, 6, 7, 8, 9, 10, 12], ns: [3, 4, 5, 6, 7, 8, 9, 10, 12], unite: ["tour", "tours"],
    textes: (e, k, n) => [
      `${e.nom} fait ${pl(k, ["tour", "tours"])} de piste à chaque entraînement. Combien de tours fait-${e.il} en ${pl(n, ["entraînement", "entraînements"])} ?`,
      `À chaque entraînement, ${e.nom} court ${pl(k, ["tour", "tours"])} de stade. Combien de tours court-${e.il} en ${pl(n, ["entraînement", "entraînements"])} ?`,
    ],
  },
  {
    ks: [6, 7, 8, 9, 12, 15, 20, 25, 30, 40], ns: [3, 4, 5, 6, 7, 8, 9, 10, 12, 15], unite: ["bouteille", "bouteilles"],
    textes: (_e, k, n) => [
      `Une machine remplit ${pl(k, ["bouteille", "bouteilles"])} par minute. Combien en remplit-elle en ${pl(n, ["minute", "minutes"])} ?`,
      `En ${pl(n, ["minute", "minutes"])}, combien de bouteilles remplit une machine qui en remplit ${k} par minute ?`,
    ],
  },
  {
    ks: [6, 7, 8, 9, 12, 14, 15, 18, 25, 35], ns: [2, 3, 4, 5, 6, 7, 8, 9, 10], unite: ["kilomètre", "kilomètres"],
    textes: (_e, k, n) => [
      `Un car scolaire fait ${k} km à chaque trajet. Combien de kilomètres fait-il en ${pl(n, ["trajet", "trajets"])} ?`,
      `Le bus de la ligne 3 parcourt ${k} km par trajet. Combien de kilomètres parcourt-il en ${pl(n, ["trajet", "trajets"])} ?`,
    ],
  },
  {
    ks: [2, 3, 4, 5, 6, 7, 8, 9, 12, 15], ns: [3, 4, 5, 6, 7, 8, 9, 10, 12, 24], unite: ["litre", "litres"],
    textes: (_e, k, n) => [
      `Un robinet qui fuit perd ${pl(k, ["litre", "litres"])} par heure. Combien de litres perd-il en ${pl(n, ["heure", "heures"])} ?`,
      `Une fuite d’eau fait perdre ${pl(k, ["litre", "litres"])} chaque heure. Combien de litres sont perdus en ${pl(n, ["heure", "heures"])} ?`,
    ],
  },
  {
    ks: [5, 6, 7, 8, 9, 10, 12, 15, 20, 25, 30], ns: [3, 4, 5, 6, 7, 8, 9, 10], unite: ["minute", "minutes"],
    textes: (e, k, n) => [
      `${e.nom} joue du piano ${pl(k, ["minute", "minutes"])} chaque jour. Combien de minutes joue-t-${e.il} en ${pl(n, JOUR)} ?`,
      `Chaque jour, ${e.nom} s’entraîne ${pl(k, ["minute", "minutes"])} au judo. Combien de minutes en ${pl(n, JOUR)} ?`,
    ],
  },
  {
    ks: [6, 7, 8, 9, 12, 15, 18, 20, 25], ns: [3, 4, 5, 6, 7, 8, 9, 10], unite: ["déchet", "déchets"],
    textes: (_e, k, n) => [
      `Chaque semaine, la classe ramasse ${pl(k, ["déchet", "déchets"])} dans la cour. Combien en ramasse-t-elle en ${pl(n, SEMAINE)} ?`,
      `En ${pl(n, SEMAINE)}, combien de déchets ramasse une classe qui en ramasse ${k} chaque semaine ?`,
    ],
  },
  {
    ks: [6, 7, 8, 9, 12, 15, 20, 24, 30, 40], ns: [2, 3, 4, 5, 6, 7, 8, 9], unite: ["baguette", "baguettes"],
    textes: (_e, k, n) => [
      `Un boulanger cuit ${pl(k, ["baguette", "baguettes"])} à chaque fournée. Combien de baguettes cuit-il en ${pl(n, ["fournée", "fournées"])} ?`,
      `À chaque fournée, le four de la boulangerie donne ${pl(k, ["baguette", "baguettes"])}. Combien de baguettes en ${pl(n, ["fournée", "fournées"])} ?`,
    ],
  },
  {
    ks: [6, 7, 8, 9, 12, 15, 18, 20, 25], ns: [2, 3, 4, 5, 6, 7, 8, 9, 10], unite: ["kilomètre", "kilomètres"],
    textes: (e, k, n) => [
      `${e.nom} parcourt ${k} km à vélo chaque dimanche. Combien de kilomètres parcourt-${e.il} en ${pl(n, ["dimanche", "dimanches"])} ?`,
      `Chaque dimanche, ${e.nom} fait une balade de ${k} km à vélo. Quelle distance parcourt-${e.il} en ${pl(n, ["dimanche", "dimanches"])} ?`,
    ],
  },
];

function qRythme(kOk: (k: number) => boolean, nOk: (n: number) => boolean): Q {
  const R = randomChoice(RYTHMES.filter((r) => r.ks.some(kOk) && r.ns.some(nOk)));
  const k = randomChoice(R.ks.filter(kOk));
  const n = randomChoice(R.ns.filter(nOk));
  const t = k * n;
  return court(
    randomChoice(R.textes(randomChoice(ELEVES), k, n)),
    t,
    exp(
      "Une même quantité répétée plusieurs fois se calcule par une multiplication.",
      `On multiplie la quantité répétée (${k}) par le nombre de répétitions (${n}).`,
      `${n} × ${k} = ${t}.`,
      `La réponse est ${pl(t, R.unite)}.`
    )
  );
}

type Recompense = { ks: number[]; unite: Mot; texte: (e: Eleve, n: number, k: number) => string };

const RECOMPENSES: Recompense[] = [
  { ks: [10, 20, 25, 50], unite: ["pièce", "pièces"], texte: (_e, n, k) => `Dans un jeu vidéo, chaque coffre donne ${k} pièces. Combien de pièces donnent ${n} coffres ?` },
  { ks: [10, 15, 20, 25, 50], unite: ["pièce", "pièces"], texte: (e, n, k) => `Dans un jeu vidéo, ${e.nom} ouvre ${n} coffres de ${k} pièces. Combien de pièces gagne-t-${e.il} ?` },
  { ks: [2, 3], unite: ["point", "points"], texte: (e, n, k) => `Au basket, ${e.nom} marque ${n} paniers à ${k} points. Combien de points marque-t-${e.il} ?` },
  { ks: [5, 10, 15, 20], unite: ["point", "points"], texte: (e, n, k) => `À un quiz, chaque bonne réponse rapporte ${k} points. ${e.nom} donne ${n} bonnes réponses. Combien de points gagne-t-${e.il} ?` },
  { ks: [5, 10, 15, 20, 25], unite: ["point", "points"], texte: (_e, n, k) => `Au magasin, chaque achat rapporte ${k} points de fidélité. Combien de points rapportent ${n} achats ?` },
  { ks: [5, 10, 20, 25, 50], unite: ["point", "points"], texte: (e, n, k) => `Aux fléchettes, ${e.nom} touche ${n} fois la zone à ${k} points. Combien de points marque-t-${e.il} ?` },
  { ks: [7], unite: ["point", "points"], texte: (_e, n, k) => `Au rugby, un essai transformé rapporte ${k} points. Combien de points rapportent ${n} essais transformés ?` },
  { ks: [2, 3, 4, 5, 10], unite: ["euro", "euros"], texte: (e, n, k) => `Pour une course solidaire, un parrain donne ${k} € par tour. ${e.nom} fait ${n} tours. Combien d’euros récolte-t-${e.il} ?` },
];

function qRecompense(nMin: number, nMax: number): Q {
  const R = randomChoice(RECOMPENSES);
  const k = randomChoice(R.ks);
  const n = randomInt(nMin, nMax);
  return court(
    R.texte(randomChoice(ELEVES), n, k),
    n * k,
    exp(
      "Une récompense répétée plusieurs fois se calcule par une multiplication.",
      `On multiplie le nombre de fois (${n}) par ce que rapporte chaque fois (${k}).`,
      `${n} × ${k} = ${n * k}.`,
      `La réponse est ${pl(n * k, R.unite)}.`
    )
  );
}

type Quadrillage = { kMax: number; unite: Mot; texte: (n: number, k: number) => string };

const QUADRILLAGES: Quadrillage[] = [
  { kMax: 12, unite: ["carreau", "carreaux"], texte: (n, k) => `Un carrelage compte ${n} rangées de ${k} carreaux. Combien de carreaux y a-t-il ?` },
  { kMax: 8, unite: ["carré", "carrés"], texte: (n, k) => `Une tablette de chocolat a ${n} rangées de ${k} carrés. Combien de carrés compte-t-elle ?` },
  { kMax: 12, unite: ["case", "cases"], texte: (n, k) => `Une grille de mots croisés a ${n} lignes et ${k} colonnes. Combien de cases a-t-elle ?` },
  { kMax: 12, unite: ["chaise", "chaises"], texte: (n, k) => `Dans une salle de spectacle, les chaises forment ${n} rangées de ${k}. Combien y a-t-il de chaises ?` },
  { kMax: 12, unite: ["brique", "briques"], texte: (n, k) => `Un mur est fait de ${n} rangées de ${k} briques. Combien de briques compte le mur ?` },
  { kMax: 8, unite: ["chocolat", "chocolats"], texte: (n, k) => `Une boîte de chocolats contient ${n} lignes de ${k} chocolats. Combien de chocolats y a-t-il ?` },
  { kMax: 12, unite: ["arbre", "arbres"], texte: (n, k) => `Un verger est planté en ${n} rangs de ${k} arbres. Combien d’arbres compte le verger ?` },
  { kMax: 10, unite: ["fenêtre", "fenêtres"], texte: (n, k) => `Un immeuble a ${n} étages avec ${k} fenêtres à chaque étage. Combien de fenêtres y a-t-il sur la façade ?` },
  { kMax: 12, unite: ["case", "cases"], texte: (n, k) => `Un plateau de jeu est un quadrillage de ${n} cases sur ${k} cases. Combien de cases compte-t-il ?` },
];

function qQuadrillage(nMin: number, nMax: number): Q {
  const R = randomChoice(QUADRILLAGES);
  const n = randomInt(nMin, nMax);
  const k = randomInt(4, R.kMax);
  return court(
    R.texte(n, k),
    n * k,
    exp(
      "Un rectangle d’objets se compte en multipliant les lignes par les colonnes.",
      `Il y a ${n} lignes de ${k} : on calcule ${n} × ${k}.`,
      `${n} × ${k} = ${n * k}.`,
      `Il y a ${pl(n * k, R.unite)}.`
    )
  );
}

// ------------------------------------------------------------
// Tables : petits gabarits de sens
// ------------------------------------------------------------

function qAdditionRepetee(k: number, n: number): Q {
  const somme = Array(n).fill(String(k)).join(" + ");
  const correct = `${n} × ${k}`;
  const expl = (conclusion: string) =>
    exp(
      "Une addition répétée du même nombre peut s’écrire comme une multiplication.",
      `On compte combien de fois ${k} est ajouté : ${n} fois.`,
      `${somme} = ${n} × ${k} = ${n * k}.`,
      conclusion
    );
  const wrongs = [`${k} × ${k}`, `${n} + ${k}`, `${n + 1} × ${k}`, `${n - 1} × ${k}`, `${n} × ${k + 1}`];
  const mode = randomInt(1, 4);
  if (mode === 1) return qcm(`Quelle multiplication est égale à ${somme} ?`, correct, wrongs, expl(`La multiplication est ${correct}.`));
  if (mode === 2) return qcm(`Écris ${somme} sous la forme d’une multiplication.`, correct, wrongs, expl(`On écrit ${correct}.`));
  if (mode === 3) return court(`Combien font ${somme} ? Tu peux utiliser une multiplication.`, n * k, expl(`La réponse est ${n * k}.`));
  return court(`Dans ${somme}, combien de fois ajoute-t-on ${k} ?`, n, expl(`On ajoute ${k} exactement ${n} fois.`));
}

function qSuiteTable(t: number, i: number): Q {
  const v = (j: number) => t * j;
  const [text, rep] = randomChoice<[string, number]>([
    [`Dans la table de ${t}, quel nombre vient juste après ${v(i)} ?`, v(i + 1)],
    [`Dans la table de ${t}, quel nombre vient juste avant ${v(i)} ?`, v(i - 1)],
    [`Quel nombre suit dans la table de ${t} : ${v(i)}, ${v(i + 1)}, … ?`, v(i + 2)],
    [`Complète la table de ${t} : ${v(i - 1)}, ${v(i)}, …, ${v(i + 2)}`, v(i + 1)],
    [`On compte de ${t} en ${t} : ${v(i)}, ${v(i + 1)}, ${v(i + 2)}… Quel est le nombre suivant ?`, v(i + 3)],
  ]);
  return court(
    text,
    rep,
    exp(
      `Dans la table de ${t}, on passe d’un nombre au suivant en ajoutant ${t}.`,
      `On avance ou on recule de ${t}.`,
      `${rep} = ${t} × ${rep / t}.`,
      `La réponse est ${rep}.`
    )
  );
}

function qProduitQcm(a: number, b: number): Q {
  const r = a * b;
  const wrongs = (
    [[a, b - 1], [a + 1, b], [a - 1, b + 1], [a, b + 1], [a + 1, b - 1], [a - 1, b]] as [number, number][]
  )
    .filter(([x, y]) => x >= 2 && y >= 2 && x * y !== r)
    .map(([x, y]) => `${x} × ${y}`);
  const text = randomChoice([
    `Quel produit est égal à ${r} ?`,
    `Quelle multiplication donne ${r} ?`,
    `Parmi ces calculs, lequel fait ${r} ?`,
    `${r} est le résultat de quelle multiplication ?`,
    `Quel calcul a pour résultat ${r} ?`,
  ]);
  return qcm(
    text,
    `${a} × ${b}`,
    wrongs,
    exp(
      "Un produit est le résultat d’une multiplication.",
      "On calcule chaque produit proposé et on garde celui qui donne le bon nombre.",
      `${a} × ${b} = ${r}.`,
      `Le bon produit est ${a} × ${b}.`
    )
  );
}

function qMultiple(t: number): Q {
  const nonMultiples = new Set<number>();
  while (nonMultiples.size < 5) nonMultiples.add(t * randomInt(2, 9) + randomInt(1, t - 1));
  const multiples = new Set<number>();
  while (multiples.size < 5) multiples.add(t * randomInt(2, 10));
  const nm = [...nonMultiples].map(String);
  const m = [...multiples].map(String);
  if (Math.random() < 0.65) {
    const juste = m[0];
    const text = randomChoice([
      `Quel nombre est dans la table de ${t} ?`,
      `Lequel de ces nombres est un résultat de la table de ${t} ?`,
      `Lequel de ces nombres peut s’écrire ${t} × … ?`,
      `En comptant de ${t} en ${t} à partir de 0, quel nombre rencontre-t-on ?`,
    ]);
    return qcm(
      text,
      juste,
      nm,
      exp(
        `Un nombre est dans la table de ${t} s’il s’écrit ${t} × un nombre entier.`,
        "On cherche, pour chaque nombre, s’il est un résultat de la table.",
        `${juste} = ${t} × ${Number(juste) / t}.`,
        `Le nombre de la table de ${t} est ${juste}.`
      )
    );
  }
  const x = Number(nm[0]);
  const q = Math.floor(x / t);
  const text = randomChoice([
    `Quel nombre n’est PAS dans la table de ${t} ?`,
    `Un seul de ces nombres n’est pas un résultat de la table de ${t}. Lequel ?`,
  ]);
  return qcm(
    text,
    nm[0],
    m,
    exp(
      `Un nombre est dans la table de ${t} s’il s’écrit ${t} × un nombre entier.`,
      "On vérifie chaque nombre avec la table.",
      `${t} × ${q} = ${t * q} et ${t} × ${q + 1} = ${t * (q + 1)} : ${x} tombe entre les deux.`,
      `${x} n’est pas dans la table de ${t}.`
    )
  );
}

/** Les égalités a × b = c × d entre produits des tables (a × b ≠ c × d écrit autrement). */
const EGALITES: [number, number, number, number][] = [];
for (let a = 2; a <= 9; a++)
  for (let b = 2; b <= 9; b++)
    for (let c = 2; c <= 9; c++)
      for (let d = 2; d <= 9; d++)
        if (a * b === c * d && c !== a && c !== b) EGALITES.push([a, b, c, d]);

function qEgaliteProduits(): Q {
  const [a, b, c, d] = randomChoice(EGALITES);
  const text = randomChoice([
    `Complète : ${a} × ${b} = ${c} × …`,
    `Quel nombre manque : ${a} × ${b} = … × ${c} ?`,
    `${a} × ${b} et ${c} × … donnent le même résultat. Quel est le nombre manquant ?`,
    `Trouve le nombre manquant pour que ${c} × … soit égal à ${a} × ${b}.`,
  ]);
  return court(
    text,
    d,
    exp(
      "Deux produits différents peuvent avoir le même résultat.",
      `On calcule ${a} × ${b}, puis on cherche quel nombre multiplié par ${c} donne ce résultat.`,
      `${a} × ${b} = ${a * b} et ${c} × ${d} = ${a * b}.`,
      `Le nombre manquant est ${d}.`
    )
  );
}

function qMemeResultat(a: number, b: number): Q {
  const r = a * b;
  const produits = ([[b, b], [a, a], [a + 1, b - 1], [a - 1, b + 1], [a, b + 1]] as [number, number][])
    .filter(([x, y]) => x >= 2 && y >= 2 && x * y !== r)
    .map(([x, y]) => `${x} × ${y}`);
  const text = randomChoice([
    `Quel calcul donne le même résultat que ${a} × ${b} ?`,
    `Sans calculer, quel produit est égal à ${a} × ${b} ?`,
    `${a} × ${b} a le même résultat que :`,
    `Quel calcul peut remplacer ${a} × ${b} ?`,
  ]);
  return qcm(
    text,
    `${b} × ${a}`,
    [`${a} + ${b}`, ...produits],
    exp(
      "Dans une multiplication, on peut changer l’ordre des facteurs.",
      `${a} × ${b} et ${b} × ${a} donnent le même résultat.`,
      `${a} × ${b} = ${b} × ${a} = ${r}.`,
      `Le bon calcul est ${b} × ${a}.`
    )
  );
}

// ------------------------------------------------------------
// Calcul mental : stratégies dites dans l’énoncé
// ------------------------------------------------------------

function qDouble(n: number): Q {
  const [A, B] = deuxEleves();
  const text = randomChoice([
    `Calcule mentalement : ${n} × 2`,
    `Quel est le double de ${n} ?`,
    `Combien font 2 fois ${n} ?`,
    `De tête : ${n} + ${n} = …`,
    `Complète de tête : 2 × ${n} = …`,
    `${A.nom} a ${n} billes. ${B.nom} en a deux fois plus. Combien de billes a ${B.nom} ?`,
    `Une recette pour 4 personnes demande ${n} g de farine. Combien de grammes faut-il pour 8 personnes ?`,
    `Un trajet aller mesure ${n} km. Combien de kilomètres font l’aller et le retour ?`,
    `Un livre coûte ${n} €. Combien coûtent deux livres ?`,
    `Double ${n} de tête. Quel nombre trouves-tu ?`,
  ]);
  return court(
    text,
    2 * n,
    exp(
      "Multiplier par 2 revient à doubler un nombre.",
      "On ajoute le nombre à lui-même.",
      `${n} × 2 = ${n} + ${n} = ${2 * n}.`,
      `La réponse est ${2 * n}.`
    )
  );
}

function qDizainesRondes(a: number, b: number): Q {
  const m = b * 10;
  const r = a * m;
  const text = randomChoice([
    `Sachant que ${a} × ${b} = ${a * b}, combien font ${a} × ${m} ?`,
    `Combien font ${a} × ${m} ? Pense à ${a} × ${b}, puis aux dizaines.`,
    `De tête, combien font ${m} × ${a} ?`,
    `Calcule ${a} × ${m} : c’est ${a} × ${b} dizaines.`,
    `${a} fois ${b} dizaines, combien cela fait-il ?`,
    `Complète : ${a} × ${m} = ${a} × ${b} × 10 = …`,
  ]);
  return court(
    text,
    r,
    exp(
      "Multiplier par un nombre de dizaines, c’est utiliser une table puis compter les dizaines.",
      `${m} = ${b} dizaines. On calcule ${a} × ${b}, puis on multiplie par 10.`,
      `${a} × ${b} = ${a * b}, donc ${a} × ${m} = ${r}.`,
      `La réponse est ${r}.`
    )
  );
}

function qTripleQuadruple(n: number): Q {
  if (Math.random() < 0.5) {
    const text = randomChoice([
      `Quel est le triple de ${n} ?`,
      `Calcule de tête : 3 fois ${n}.`,
      `De tête : ${n} + ${n} + ${n} = …`,
    ]);
    return court(
      text,
      3 * n,
      exp("Le triple d’un nombre, c’est ce nombre multiplié par 3.", "On ajoute trois fois le nombre, ou on fait le double puis une fois de plus.", `${n} × 3 = ${2 * n} + ${n} = ${3 * n}.`, `La réponse est ${3 * n}.`)
    );
  }
  const text = randomChoice([
    `Quel est le double du double de ${n} ?`,
    `Calcule ${n} × 4 en doublant deux fois.`,
    `Quel est le quadruple de ${n} ?`,
  ]);
  return court(
    text,
    4 * n,
    exp("Multiplier par 4, c’est doubler deux fois.", "On double le nombre, puis on double le résultat.", `${n} × 2 = ${2 * n}, puis ${2 * n} × 2 = ${4 * n}.`, `La réponse est ${4 * n}.`)
  );
}

type Strategie = { f: number; textes: (n: number) => string[]; methode: (n: number) => string; calcul: (n: number) => string };

const STRATEGIES: Record<string, Strategie> = {
  par5: {
    f: 5,
    textes: (n) => [
      `Calcule mentalement : ${n} × 5`,
      `Pour calculer ${n} × 5, fais ${n} × 10 puis prends la moitié. Quel est le résultat ?`,
      `Combien valent ${n} billets de 5 € ?`,
      `Combien font 5 fois ${n} ? Astuce : la moitié de ${n} × 10.`,
      `Complète de tête : 5 × ${n} = …`,
      `Une main a 5 doigts. Combien de doigts ont ${n} mains ?`,
    ],
    methode: () => "Multiplier par 5, c’est multiplier par 10 puis prendre la moitié.",
    calcul: (n) => `${n} × 10 = ${n * 10}, et la moitié de ${n * 10} est ${n * 5}.`,
  },
  par11: {
    f: 11,
    textes: (n) => [
      `Pour calculer ${n} × 11, fais ${n} × 10 puis ajoute ${n}. Quel résultat obtiens-tu ?`,
      `De tête : ${n} × 11 = …`,
      `Une équipe de football compte 11 joueurs. Combien de joueurs y a-t-il dans ${n} équipes ?`,
      `Combien font 11 fois ${n} ?`,
      `Calcule ${n} × 11 sans poser l’opération.`,
    ],
    methode: () => "Multiplier par 11, c’est multiplier par 10 puis ajouter le nombre.",
    calcul: (n) => `${n} × 10 = ${n * 10}, puis ${n * 10} + ${n} = ${n * 11}.`,
  },
  par4: {
    f: 4,
    textes: (n) => [
      `Un carré a des côtés de ${n} cm. Quel est son périmètre en cm ?`,
      `Une voiture a 4 roues. Combien de roues ont ${n} voitures ?`,
      `Un chien a 4 pattes. Combien de pattes ont ${n} chiens ?`,
      `${n} équipes de 4 joueurs participent au tournoi. Combien de joueurs en tout ?`,
      `Calcule de tête : 4 × ${n}. Pense au double du double.`,
    ],
    methode: () => "Multiplier par 4, c’est doubler deux fois.",
    calcul: (n) => `${n} × 2 = ${n * 2}, puis ${n * 2} × 2 = ${n * 4}.`,
  },
  par9: {
    f: 9,
    textes: (n) => [
      `Pour calculer ${n} × 9, fais ${n} × 10 puis enlève ${n}. Quel résultat trouves-tu ?`,
      `Calcule ${n} × 9 sans poser : pense à ${n} × 10.`,
      `Combien font 9 fois ${n} ?`,
      `Un paquet contient 9 biscuits. Combien de biscuits y a-t-il dans ${n} paquets ?`,
      `Calcule mentalement : ${n} × 9`,
      `De tête : 9 × ${n} = …`,
    ],
    methode: () => "Multiplier par 9, c’est multiplier par 10 puis enlever une fois le nombre.",
    calcul: (n) => `${n} × 10 = ${n * 10}, puis ${n * 10} − ${n} = ${n * 9}.`,
  },
  par25: {
    f: 25,
    textes: (n) => [
      `Calcule ${n} × 25 : multiplie par 100, puis divise par 4.`,
      `Combien valent ${n} pièces de 25 centimes ? Réponds en centimes.`,
      `Sachant que 4 × 25 = 100, combien font ${n} × 25 ?`,
      `Calcule mentalement : ${n} × 25`,
      `Combien font 25 fois ${n} ?`,
      `De tête : 25 × ${n} = …`,
    ],
    methode: () => "Multiplier par 25, c’est multiplier par 100 puis diviser par 4.",
    calcul: (n) => `${n} × 100 = ${n * 100}, puis ${n * 100} ÷ 4 = ${n * 25}.`,
  },
  par50: {
    f: 50,
    textes: (n) => [
      `Calcule ${n} × 50 : multiplie par 100, puis prends la moitié.`,
      `Combien valent ${n} billets de 50 € ?`,
      `Sachant que 2 × 50 = 100, combien font ${n} × 50 ?`,
      `De tête : 50 × ${n} = …`,
      `Combien font 50 fois ${n} ?`,
      `Calcule sans poser l’opération : ${n} × 50`,
    ],
    methode: () => "Multiplier par 50, c’est multiplier par 100 puis prendre la moitié.",
    calcul: (n) => `${n} × 100 = ${n * 100}, et la moitié de ${n * 100} est ${n * 50}.`,
  },
  par12: {
    f: 12,
    textes: (n) => [
      `Calcule ${n} × 12 en faisant ${n} × 10 puis ${n} × 2.`,
      `Une douzaine, c’est 12. Combien d’œufs y a-t-il dans ${n} douzaines ?`,
      `De tête : ${n} × 12 = …`,
      `Combien font 12 fois ${n} ?`,
      `Une année compte 12 mois. Combien de mois y a-t-il dans ${n} ans ?`,
      `Calcule mentalement : 12 × ${n}`,
    ],
    methode: () => "Multiplier par 12, c’est multiplier par 10, puis par 2, et additionner.",
    calcul: (n) => `${n} × 10 = ${n * 10} et ${n} × 2 = ${n * 2}, donc ${n * 10} + ${n * 2} = ${n * 12}.`,
  },
};

function qStrategie(cle: keyof typeof STRATEGIES, n: number): Q {
  const S = STRATEGIES[cle];
  return court(
    randomChoice(S.textes(n)),
    n * S.f,
    exp("Calculer mentalement, c’est choisir une stratégie rapide sans poser l’opération.", S.methode(n), S.calcul(n), `Donc ${n} × ${S.f} = ${n * S.f}.`)
  );
}

/** Vrai/faux sur une stratégie mentale, avec l’erreur la plus fréquente comme piège. */
function qVraiFauxMental(cle: keyof typeof STRATEGIES, n: number): Q {
  const S = STRATEGIES[cle];
  const r = n * S.f;
  const pieges: Record<number, number[]> = {
    4: [n * 2, r + 4, r - 4],
    5: [n * 10, r + 5, r - 5, r + 10],
    11: [n * 10, r + 10, r - 10],
    12: [n * 10 + 2, r + 12, r - 12, n * 10],
    25: [n * 20, r + 25, r - 25, n * 50],
    50: [n * 5, r + 50, r - 50, n * 500],
  };
  return qVraiFaux(n, S.f, annonce(r, pieges[S.f] ?? [r + 1]), "Une stratégie mentale permet de vérifier vite un résultat.", S.methode(n));
}

function qChoisirStrategie(n: number): Q {
  const e = randomChoice(ELEVES);
  const desc: Record<number, string> = {
    5: `faire ${n} × 10 puis prendre la moitié`,
    9: `faire ${n} × 10 puis enlever ${n}`,
    11: `faire ${n} × 10 puis ajouter ${n}`,
    4: `doubler ${n}, puis doubler encore`,
  };
  const f = randomChoice([5, 9, 11, 4]);
  const text = randomChoice([
    `Quelle stratégie est pratique pour calculer ${n} × ${f} ?`,
    `Pour calculer ${n} × ${f} de tête, que peut-on faire ?`,
    `${e.nom} veut calculer ${n} × ${f} sans poser. Quelle méthode marche ?`,
    `Quelle méthode donne bien ${n} × ${f} ?`,
  ]);
  const autres = Object.entries(desc).filter(([k]) => Number(k) !== f).map(([, v]) => v);
  return qcm(
    text,
    desc[f],
    [...autres, `faire ${n} + ${f}`],
    exp(
      "Calculer mentalement, c’est choisir une méthode efficace.",
      `Pour multiplier par ${f}, on peut ${desc[f]}.`,
      `${n} × ${f} = ${n * f}.`,
      `La bonne méthode est : ${desc[f]}.`
    )
  );
}

function qDecomposer(): Q {
  const tens = randomChoice([10, 20, 30, 40]);
  const units = randomInt(2, 9);
  const n = tens + units;
  const f = randomChoice([3, 4, 6, 7, 8]);
  const r = n * f;
  const text = randomChoice([
    `Décompose ${n} en ${tens} + ${units} pour calculer ${n} × ${f}. Quel est le résultat ?`,
    `Calcule ${n} × ${f} en faisant ${tens} × ${f} puis ${units} × ${f}.`,
    `Quel est le produit de ${n} par ${f} ? Décompose ${n} pour t’aider.`,
    `De tête, combien font ${f} fois ${n} ?`,
    `Calcule sans poser : ${f} × ${n}`,
  ]);
  return court(
    text,
    r,
    exp(
      "Décomposer un nombre facilite parfois le calcul mental.",
      `On écrit ${n} = ${tens} + ${units}.`,
      `${tens} × ${f} = ${tens * f} et ${units} × ${f} = ${units * f}. Donc ${tens * f} + ${units * f} = ${r}.`,
      `La réponse est ${r}.`
    )
  );
}

// ------------------------------------------------------------
// Multiplication posée
// ------------------------------------------------------------

/** Un nombre de `chiffres` chiffres dont chaque chiffre × p reste ≤ 9 (pas de retenue). */
function sansRetenue(chiffres: number, p: number) {
  const max = Math.floor(9 / p);
  let s = String(randomInt(1, max));
  for (let i = 1; i < chiffres; i++) s += String(randomInt(0, max));
  return Number(s);
}

function aRetenue(a: number, p: number) {
  return String(a).split("").some((c) => Number(c) * p >= 10);
}

/** Le résultat d’un élève qui oublie toutes les retenues (247 × 4 → 868). */
function oubliRetenues(a: number, p: number) {
  const ch = String(a).split("").map(Number);
  let s = String(ch[0] * p);
  for (let i = 1; i < ch.length; i++) s += String((ch[i] * p) % 10);
  return Number(s);
}

function qPosee(a: number, b: number, tournures: Tournure[], expl: [string, string], titre: string, label?: string): Q {
  return court(
    randomChoice(tournures)(String(a), String(b)),
    a * b,
    exp(expl[0], expl[1], `${a} × ${b} = ${nf(a * b)}.`, `Le résultat est ${nf(a * b)}.`),
    posee(a, b, titre, label)
  );
}

function qEtapePosee(a: number, b: number): Q {
  const u = a % 10;
  const t = Math.floor(a / 10) % 10;
  const r = a * b;
  const mode = randomInt(1, 5);
  if (mode <= 2) {
    const text =
      mode === 1
        ? `Pour poser ${a} × ${b}, quel produit calcule-t-on en premier ?`
        : `On pose ${a} × ${b}. Par quel calcul commence-t-on ?`;
    return qcm(
      text,
      `${b} × ${u}`,
      [`${b} × ${t}`, `${b} × ${a}`, `${a} + ${b}`, `${u} + ${b}`, `${b} × 10`],
      exp(
        "Dans une multiplication posée, on commence par les unités.",
        `On multiplie ${b} par le chiffre des unités de ${a}, qui est ${u}.`,
        `${b} × ${u} = ${b * u}.`,
        `On commence par ${b} × ${u}.`
      )
    );
  }
  if (mode === 3)
    return court(
      `On calcule ${a} × ${b}. Quel chiffre écrit-on aux unités du résultat ?`,
      r % 10,
      exp("Le chiffre des unités du résultat vient du produit des unités.", `On calcule ${b} × ${u} = ${b * u} et on garde le chiffre des unités.`, `${a} × ${b} = ${r}.`, `On écrit ${r % 10} aux unités.`)
    );
  if (mode === 4)
    return court(
      `Dans ${a} × ${b} posée, quelle est la première retenue ? Réponds 0 s’il n’y en a pas.`,
      Math.floor((u * b) / 10),
      exp("Une retenue apparaît quand un produit dépasse 9 dans une colonne.", `On calcule ${b} × ${u} = ${b * u}.`, `On écrit ${(u * b) % 10} et on retient ${Math.floor((u * b) / 10)}.`, `La première retenue est ${Math.floor((u * b) / 10)}.`)
    );
  return court(
    `Quel est le chiffre des dizaines du résultat de ${a} × ${b} ?`,
    Math.floor(r / 10) % 10,
    exp("Chaque chiffre du résultat a un rang : unités, dizaines, centaines…", "On pose et on calcule la multiplication, puis on lit le chiffre des dizaines.", `${a} × ${b} = ${r}.`, `Le chiffre des dizaines est ${Math.floor(r / 10) % 10}.`)
  );
}

function qProduitsPartiels(): Q {
  const a = randomInt(12, 98);
  const t = randomInt(1, 9);
  const u = randomInt(2, 9);
  const b = t * 10 + u;
  const definition = "Pour multiplier par un nombre à deux chiffres, on additionne deux produits partiels.";
  const methode = `${b} = ${t * 10} + ${u} : on calcule ${a} × ${u}, puis ${a} × ${t * 10}.`;
  const calcul = `${a} × ${u} = ${a * u} et ${a} × ${t * 10} = ${a * t * 10}, donc ${a * u} + ${a * t * 10} = ${a * b}.`;
  const mode = randomInt(1, 4);
  if (mode === 1)
    return court(`Pour poser ${a} × ${b}, on calcule ${a} × ${u} puis ${a} × ${t * 10}. Combien vaut ${a} × ${t * 10} ?`, a * t * 10, exp(definition, methode, calcul, `${a} × ${t * 10} = ${a * t * 10}.`));
  if (mode === 2)
    return court(`Dans ${a} × ${b} posée, la première ligne vaut ${a} × ${u}. Quel nombre écris-tu sur cette ligne ?`, a * u, exp(definition, methode, calcul, `La première ligne vaut ${a * u}.`));
  if (mode === 3)
    return qcm(
      `Pour calculer ${a} × ${b}, on additionne ${a} × ${u} et :`,
      `${a} × ${t * 10}`,
      [`${a} × ${t}`, `${a} × ${b}`, `${a} + ${t * 10}`, `${a * 10} × ${t * 10}`],
      exp(definition, methode, calcul, `Il faut ajouter ${a} × ${t * 10}.`)
    );
  return court(
    `On a calculé ${a} × ${u} = ${a * u} et ${a} × ${t * 10} = ${a * t * 10}. Combien vaut ${a} × ${b} ?`,
    a * b,
    exp(definition, methode, calcul, `${a} × ${b} = ${a * b}.`)
  );
}

// ------------------------------------------------------------
// Puissances de dix
// ------------------------------------------------------------


// ⛔ Décision de Frédéric (05/10/2026) : × 10, × 100, × 1 000 s’expliquent
// par la NUMÉRATION (« 7 × 10, c’est 7 dizaines » ; chaque chiffre prend une
// valeur 10 fois plus grande). Jamais « on ajoute un zéro » seul : la règle
// devient fausse dès les décimaux (2,5 × 10 ≠ 2,50).
const RANG: Record<number, string> = { 10: "dizaines", 100: "centaines", 1000: "milliers", 10000: "dizaines de milliers" };

// Modèle validé : « multiplier par 10, c’est rendre chaque chiffre dix fois
// plus grand : il monte d’une colonne. 3 unités deviennent 3 dizaines… »
const COLONNES: Mot[] = [
  ["unité", "unités"],
  ["dizaine", "dizaines"],
  ["centaine", "centaines"],
  ["millier", "milliers"],
  ["dizaine de milliers", "dizaines de milliers"],
  ["centaine de milliers", "centaines de milliers"],
  ["million", "millions"],
  ["dizaine de millions", "dizaines de millions"],
];

/** « Multiplier par 100, c’est rendre chaque chiffre cent fois plus grand : il monte de deux colonnes. » */
function methodeP10(f: number) {
  const z = String(f).length - 1;
  const fois = { 1: "dix", 2: "cent", 3: "mille", 4: "dix mille" }[z];
  const col = { 1: "d’une colonne", 2: "de deux colonnes", 3: "de trois colonnes", 4: "de quatre colonnes" }[z];
  return `Multiplier par ${F(f)}, c’est rendre chaque chiffre ${fois} fois plus grand : il monte ${col}.`;
}

/** « 4 unités deviennent 4 centaines, 3 dizaines deviennent 3 milliers : 3 400. » */
function colonnesP10(n: number, f: number) {
  const z = String(f).length - 1;
  const ch = String(n).split("").reverse().map(Number);
  const morceaux = ch
    .map((d, i) => (d === 0 ? "" : `${d} ${d > 1 ? COLONNES[i][1] : COLONNES[i][0]} ${d > 1 ? "deviennent" : "devient"} ${d} ${d > 1 ? COLONNES[i + z][1] : COLONNES[i + z][0]}`))
    .filter(Boolean);
  return `${cap(morceaux.join(", "))} : ${nf(n * f)}.`;
}

// Le raccourci « la virgule se décale » vient TOUJOURS après la raison
// (décision de Frédéric, 05/10) — mais seulement sur un nombre qui a une
// virgule. Cette banque ne contient que des entiers : une virgule
// « sous-entendue » dans 34 déroutait plus qu'elle n'aidait. Il n'y a donc
// ici que la valeur des chiffres.

function explP10(n: number, f: number) {
  return exp(
    "Multiplier par 10, 100 ou 1 000 change la valeur de chaque chiffre.",
    methodeP10(f),
    colonnesP10(n, f),
    `${n} × ${F(f)} = ${nf(n * f)}.`
  );
}

function qP10(n: number, f: number): Q {
  const r = n * f;
  const text = randomChoice([
    `Calcule : ${n} × ${F(f)}`,
    `Combien font ${n} × ${F(f)} ?`,
    `Multiplie ${n} par ${F(f)}. Quel nombre obtiens-tu ?`,
    `Quel nombre est ${F(f)} fois plus grand que ${n} ?`,
    `Complète : ${n} × ${F(f)} = …`,
    `${F(f)} fois ${n}, cela fait combien ?`,
    `${n} ${RANG[f]}, cela fait combien d’unités ?`,
    `Que vaut ${F(f)} × ${n} ?`,
  ]);
  return court(text, r, explP10(n, f));
}

function qFacteurP10(n: number, f: number): Q {
  const R = nf(n * f);
  const text = randomChoice([
    `Complète : ${n} × … = ${R}`,
    `Par combien faut-il multiplier ${n} pour obtenir ${R} ?`,
    `Combien de fois ${R} est-il plus grand que ${n} ?`,
    `${n} × … = ${R}. Quel nombre manque ?`,
    `On passe de ${n} à ${R} en multipliant par :`,
  ]);
  return qcm(
    text,
    F(f),
    ["10", "100", "1 000", "10 000"].filter((x) => x !== F(f)),
    exp(
      "Multiplier par 10, 100 ou 1 000, c’est compter en dizaines, en centaines ou en milliers.",
      `${methodeP10(f)} On regarde de combien de colonnes chaque chiffre de ${n} est monté.`,
      colonnesP10(n, f),
      `Le nombre manquant est ${F(f)}.`
    )
  );
}

type Conversion = { f: number; de: string; vers: string; textes: (n: number) => string[] };

const CONVERSIONS: Conversion[] = [
  { f: 10, de: "cm", vers: "mm", textes: (n) => [`Convertis : ${n} cm = … mm`, `Combien de millimètres y a-t-il dans ${n} cm ?`, `Un crayon mesure ${n} cm. Combien mesure-t-il en millimètres ?`] },
  { f: 10, de: "dm", vers: "cm", textes: (n) => [`Convertis : ${n} dm = … cm`, `Combien de centimètres y a-t-il dans ${n} dm ?`] },
  { f: 100, de: "m", vers: "cm", textes: (n) => [`Convertis : ${n} m = … cm`, `Combien de centimètres y a-t-il dans ${n} m ?`, `Un ruban mesure ${n} m. Combien mesure-t-il en centimètres ?`] },
  { f: 100, de: "€", vers: "centimes", textes: (n) => [`Combien de centimes y a-t-il dans ${n} € ?`, `${n} €, cela fait combien de centimes ?`] },
  { f: 1000, de: "kg", vers: "g", textes: (n) => [`Convertis : ${n} kg = … g`, `Combien de grammes y a-t-il dans ${n} kg ?`, `Un sac de pommes de terre pèse ${n} kg. Combien pèse-t-il en grammes ?`] },
  { f: 1000, de: "km", vers: "m", textes: (n) => [`Convertis : ${n} km = … m`, `Combien de mètres y a-t-il dans ${n} km ?`, `Une randonnée fait ${n} km. Combien cela fait-il de mètres ?`] },
  { f: 1000, de: "L", vers: "mL", textes: (n) => [`Convertis : ${n} L = … mL`, `Combien de millilitres y a-t-il dans ${n} L ?`] },
  { f: 1000, de: "t", vers: "kg", textes: (n) => [`Convertis : ${n} t = … kg`, `Un camion transporte ${n} tonnes. Combien cela fait-il de kilogrammes ?`] },
];

function qConversion(fOk: (f: number) => boolean, n: number): Q {
  const C = randomChoice(CONVERSIONS.filter((c) => fOk(c.f)));
  const r = n * C.f;
  return court(
    randomChoice(C.textes(n)),
    r,
    exp(
      "Pour convertir dans une unité plus petite, on multiplie.",
      `1 ${C.de} = ${F(C.f)} ${C.vers}, donc on multiplie par ${F(C.f)}.`,
      `${n} × ${F(C.f)} = ${nf(r)}.`,
      `${n} ${C.de} = ${nf(r)} ${C.vers}.`
    )
  );
}

function qDizainesFoisDizaines(): Q {
  const x = randomInt(2, 9);
  const y = randomInt(2, 9);
  const [i, j] = randomChoice([[1, 1], [1, 2], [2, 1]]);
  const A = x * 10 ** i;
  const B = y * 10 ** j;
  const r = A * B;
  const text = randomChoice([
    `Calcule : ${A} × ${B}`,
    `Sachant que ${x} × ${y} = ${x * y}, combien font ${A} × ${B} ?`,
    `Combien font ${A} × ${B} ? Pense à ${x} × ${y}, puis aux ${RANG[10 ** (i + j)]}.`,
    `Complète : ${A} × ${B} = …`,
    `Quel est le produit de ${A} par ${B} ?`,
  ]);
  return court(
    text,
    r,
    exp(
      "Pour multiplier des nombres ronds, on utilise une table puis la numération.",
      `${A} × ${B} = ${x} × ${y} × ${F(10 ** (i + j))} : on obtient ${x * y} ${RANG[10 ** (i + j)]}.`,
      `${x} × ${y} = ${x * y}, et ${x * y} ${RANG[10 ** (i + j)]} = ${nf(r)}.`,
      `La réponse est ${nf(r)}.`
    )
  );
}

function qLotDix(ks: number[], nMin: number, nMax: number): Q {
  const L = randomChoice(LOTS_DIX.filter((l) => l.ks.some((k) => ks.includes(k))));
  const k = randomChoice(L.ks.filter((x) => ks.includes(x)));
  return qLot(L, randomInt(nMin, nMax), k);
}

// ------------------------------------------------------------
// Défis : deux étapes, monnaie, comparaisons, estimations
// ------------------------------------------------------------

function qDeuxEtapes(): Q {
  if (Math.random() < 0.5) {
    const { L } = tireLot(LOTS, [6]);
    const ks = shuffle([2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 24].filter((k) => k <= L.kMax)).slice(0, 2);
    const [k1, k2] = ks.length === 2 ? ks : [2, 3];
    const n1 = randomInt(2, 9);
    const n2 = randomInt(2, 9);
    const t1 = n1 * k1;
    const t2 = n2 * k2;
    const text = randomChoice([
      `${L.lieu}, il y a ${pl(n1, L.cont)} de ${pl(k1, L.obj)} et ${pl(n2, L.cont)} de ${pl(k2, L.obj)}. Combien y a-t-il ${de(L.obj[1])} en tout ?`,
      `${L.lieu}, on prépare ${pl(n1, L.cont)} de ${pl(k1, L.obj)}, puis ${pl(n2, L.cont)} de ${pl(k2, L.obj)}. Quel est le nombre total ${de(L.obj[1])} ?`,
    ]);
    return court(
      text,
      t1 + t2,
      exp(
        "Un problème à deux étapes demande plusieurs calculs.",
        "On calcule chaque groupe, puis on additionne les résultats.",
        `${n1} × ${k1} = ${t1}, puis ${n2} × ${k2} = ${t2}. Enfin ${t1} + ${t2} = ${t1 + t2}.`,
        `Il y a ${pl(t1 + t2, L.obj)} en tout.`
      )
    );
  }
  const A1 = randomChoice(ACHATS);
  const A2 = randomChoice(ACHATS.filter((a) => a.obj[0] !== A1.obj[0]));
  const p1 = randomChoice(A1.prix);
  const p2 = randomChoice(A2.prix);
  const n1 = randomInt(2, 6);
  const n2 = randomInt(2, 6);
  const e = randomChoice(ELEVES);
  const un = (A: Achat) => (A.g === "m" ? "un" : "une");
  const text = randomChoice([
    `${e.nom} achète ${pl(n1, A1.obj)} à ${p1} € et ${pl(n2, A2.obj)} à ${p2} €, au prix de chaque objet. Combien paie-t-${e.il} en tout ?`,
    `Au total, combien coûtent ${pl(n1, A1.obj)} à ${p1} € l’${un(A1)} et ${pl(n2, A2.obj)} à ${p2} € l’${un(A2)} ?`,
  ]);
  return court(
    text,
    n1 * p1 + n2 * p2,
    exp(
      "Un problème à deux étapes demande plusieurs calculs.",
      "On calcule le prix de chaque sorte d’objet, puis on additionne.",
      `${n1} × ${p1} = ${n1 * p1}, puis ${n2} × ${p2} = ${n2 * p2}. Enfin ${n1 * p1} + ${n2 * p2} = ${n1 * p1 + n2 * p2}.`,
      `Le prix total est ${n1 * p1 + n2 * p2} €.`
    )
  );
}

function qMultiplierPuisEnlever(): Q {
  const e = randomChoice(ELEVES);
  if (Math.random() < 0.25) {
    const classes = randomInt(4, 9);
    const dechets = randomChoice([12, 15, 18, 20, 24, 25]);
    const deja = randomChoice([10, 15, 20, 25]);
    const brut = classes * dechets;
    return court(
      `Défi écologie : ${classes} classes ramassent chacune ${dechets} déchets. On retire ${deja} déchets déjà comptés. Quel est le total corrigé ?`,
      brut - deja,
      exp(
        "Un défi peut combiner plusieurs opérations.",
        "On calcule d’abord le total par multiplication, puis on corrige avec une soustraction.",
        `${classes} × ${dechets} = ${brut}, puis ${brut} − ${deja} = ${brut - deja}.`,
        `Le total corrigé est ${brut - deja} déchets.`
      )
    );
  }
  const { L, k } = tireLot([...LOTS, ...NATURE], [6, 8, 10, 12, 15, 20, 24, 25, 30]);
  const n = randomInt(3, 9);
  const t = n * k;
  const m = randomInt(2, t - 2);
  const text = randomChoice([
    `${L.lieu}, il y a ${pl(n, L.cont)} de ${pl(k, L.obj)}. On en prend ${m}. Combien en reste-t-il ?`,
    `${L.lieu}, ${e.nom} compte ${pl(n, L.cont)} de ${pl(k, L.obj)}, puis en enlève ${m}. Combien ${de(L.obj[1])} reste-t-il ?`,
  ]);
  return court(
    text,
    t - m,
    exp(
      "Un défi peut combiner multiplication et soustraction.",
      "On calcule d’abord le total des groupes égaux, puis on enlève ce qui est pris.",
      `${n} × ${k} = ${t}, puis ${t} − ${m} = ${t - m}.`,
      `Il reste ${pl(t - m, L.obj)}.`
    )
  );
}

function qRenduMonnaie(): Q {
  const e = randomChoice(ELEVES);
  const { A, p } = tireAchat((x) => x >= 3 && x <= 25);
  const n = randomInt(2, 6);
  const t = n * p;
  const billet = randomChoice([20, 50, 100].filter((b) => b > t).length ? [20, 50, 100].filter((b) => b > t) : [200]);
  const un = A.g === "m" ? "un" : "une";
  const text = randomChoice([
    `${e.nom} achète ${pl(n, A.obj)} à ${p} € pièce. ${cap(e.il)} paie avec un billet de ${billet} €. Combien lui rend-on ?`,
    `${cap(A.lieu)}, ${e.nom} prend ${pl(n, A.obj)} à ${p} € l’${un} et donne un billet de ${billet} €. Quelle somme lui rend-on ?`,
  ]);
  return court(
    text,
    billet - t,
    exp(
      "Pour rendre la monnaie, on calcule d’abord le prix total, puis la différence avec ce qui est donné.",
      "On multiplie le prix par le nombre d’objets, puis on soustrait du billet.",
      `${n} × ${p} = ${t}, puis ${billet} − ${t} = ${billet - t}.`,
      `On lui rend ${billet - t} €.`
    )
  );
}

/** Deux lots à comparer ; une fois sur quatre, ils contiennent autant (3 × 8 et 4 × 6). */
function qComparerLots(): Q {
  const L = randomChoice(LOTS.filter((l) => l.kMax >= 8));
  let n1: number, k1: number, n2: number, k2: number;
  const egaux = EGALITES.filter(([a, b, c, d]) => b <= L.kMax && d <= L.kMax && a !== c);
  if (Math.random() < 0.25 && egaux.length) {
    [n1, k1, n2, k2] = randomChoice(egaux);
  } else {
    do {
      n1 = randomInt(2, 9);
      n2 = randomInt(2, 9);
      k1 = randomInt(2, Math.min(12, L.kMax));
      k2 = randomInt(2, Math.min(12, L.kMax));
    } while (n1 === n2 || k1 === k2 || n1 * k1 === n2 * k2);
  }
  const t1 = n1 * k1;
  const t2 = n2 * k2;
  const [A, B] = deuxEleves();
  const calcul = `${n1} × ${k1} = ${t1} et ${n2} × ${k2} = ${t2}.`;
  if (Math.random() < 0.5) {
    const rep = t1 > t2 ? "le lot A" : t2 > t1 ? "le lot B" : "les deux lots en contiennent autant";
    return {
      text: `${L.lieu}, le lot A compte ${pl(n1, L.cont)} de ${pl(k1, L.obj)}, le lot B ${pl(n2, L.cont)} de ${pl(k2, L.obj)}. Quel lot a le plus ${de(L.obj[1])} ?`,
      format: "qcm",
      choices: shuffle(["le lot A", "le lot B", "les deux lots en contiennent autant", "on ne peut pas savoir"]),
      expected: [rep],
      comparator: "mcq_exact",
      explanation: exp("Pour comparer deux lots, on calcule le total de chacun.", "On multiplie dans chaque lot, puis on compare.", calcul, `La bonne réponse est : ${rep}.`),
    };
  }
  const rep = t1 > t2 ? A.nom : t2 > t1 ? B.nom : "ils en ont autant";
  return {
    text: `${L.lieu}, ${A.nom} a ${pl(n1, L.cont)} de ${pl(k1, L.obj)} et ${B.nom} ${pl(n2, L.cont)} de ${pl(k2, L.obj)}. Qui a le plus ${de(L.obj[1])} ?`,
    format: "qcm",
    choices: shuffle([A.nom, B.nom, "ils en ont autant", "on ne peut pas savoir"]),
    expected: [rep],
    comparator: "mcq_exact",
    explanation: exp("Pour comparer deux lots, on calcule le total de chacun.", "On multiplie dans chaque lot, puis on compare.", calcul, `La bonne réponse est : ${rep}.`),
  };
}

const CHERS: { obj: Mot; g: "m" | "f" }[] = [
  { obj: ["vélo", "vélos"], g: "m" },
  { obj: ["tablette", "tablettes"], g: "f" },
  { obj: ["console de jeux", "consoles de jeux"], g: "f" },
  { obj: ["télévision", "télévisions"], g: "f" },
  { obj: ["ordinateur", "ordinateurs"], g: "m" },
];

function qEstimation(): Q {
  const a = randomChoice([198, 203, 297, 302, 395, 402, 498, 503, 597, 604, 699, 701, 798, 802, 897, 903]);
  const b = randomInt(3, 9);
  const rond = Math.round(a / 100) * 100;
  const approx = rond * b;
  const e = randomChoice(ELEVES);
  const C = randomChoice(CHERS);
  const [text, unite] = randomChoice<[string, string]>([
    [`Avant de calculer exactement ${a} × ${b}, quel ordre de grandeur est raisonnable ?`, ""],
    [`Sans poser l’opération, quel est l’ordre de grandeur de ${a} × ${b} ?`, ""],
    [`Quel nombre est le plus proche de ${a} × ${b} ?`, ""],
    [`${e.nom} achète ${pl(b, C.obj)} à ${a} € l’${C.g === "m" ? "un" : "une"}. Environ combien va-t-${e.il} payer ?`, " €"],
    [`Un camion transporte ${a} kg à chaque voyage. Environ combien de kilogrammes transporte-t-il en ${b} voyages ?`, " kg"],
  ]);
  const lab = (x: number) => `environ ${nf(x)}${unite}`;
  return qcm(
    text,
    lab(approx),
    [lab(approx * 10), lab(approx / 10), lab(approx + rond), lab(approx - rond)],
    exp(
      "Une estimation permet de vérifier si un résultat est raisonnable.",
      "On arrondit le nombre le plus compliqué à la centaine.",
      `${a} est proche de ${rond}, donc ${a} × ${b} est proche de ${rond} × ${b} = ${nf(approx)}.`,
      `Un ordre de grandeur raisonnable est ${lab(approx)}.`
    )
  );
}

export const multiplicationBank: TutorBankItemV4[] = [
  // ============================================================
  // MULTIPLICATION_TABLE
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_multiplication_table_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_table",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 6 × 7",
    format: "short",
    expected: ["42"],
    comparator: "number_equal",
    hint: "Pense à la table de 6 ou à la table de 7.",
    explanation: exp(
      "Une table de multiplication permet de connaître rapidement certains produits.",
      "On utilise la table de 6 ou la table de 7.",
      "6 × 7 = 42.",
      "La réponse est 42."
    ),
    tags: ["cm2", "multiplication", "table", "automatisme"],
  },

  {
    kind: "fixed",
    id: "cm2_multiplication_table_fixed_2",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_table",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 8 × 5",
    format: "short",
    expected: ["40"],
    comparator: "number_equal",
    hint: "8 × 5, c’est aussi 5 × 8.",
    explanation: exp(
      "Dans une multiplication, on peut souvent changer l’ordre des facteurs.",
      "On utilise une table connue.",
      "8 × 5 = 40.",
      "La réponse est 40."
    ),
    tags: ["cm2", "multiplication", "table", "commutativite"],
  },

  {
    kind: "fixed",
    id: "cm2_multiplication_table_fixed_3_trou",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_table",
    difficulty: 2,
    theme: "neutral",
    text: "Complète : 7 × ? = 56",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Cherche dans la table de 7.",
    explanation: exp(
      "Une multiplication à trou demande de retrouver un facteur manquant.",
      "On cherche quel nombre multiplié par 7 donne 56.",
      "7 × 8 = 56.",
      "Le nombre manquant est 8."
    ),
    tags: ["cm2", "multiplication", "table", "facteur_manquant"],
  },

  {
    kind: "fixed",
    id: "cm2_multiplication_table_fixed_4_qcm",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_table",
    difficulty: 2,
    theme: "neutral",
    text: "Quel produit est égal à 36 ?",
    format: "qcm",
    choices: ["4 × 9", "5 × 8", "6 × 7", "3 × 11"],
    expected: ["4 × 9"],
    comparator: "mcq_exact",
    hint: "Cherche un calcul qui donne 36.",
    explanation: exp(
      "Un produit est le résultat d’une multiplication.",
      "On calcule ou on reconnaît chaque produit proposé.",
      "4 × 9 = 36.",
      "Le produit égal à 36 est 4 × 9."
    ),
    tags: ["cm2", "multiplication", "table", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_multiplication_table_fixed_5_piege",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_table",
    difficulty: 2,
    theme: "neutral",
    text: "Un élève dit que 6 × 8 = 46. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Vérifie dans la table de 6 ou de 8.",
    explanation: exp(
      "Une table de multiplication doit être vérifiée avec précision.",
      "On calcule le produit annoncé.",
      "6 × 8 = 48, et non 46.",
      "L’élève n’a pas raison."
    ),
    tags: ["cm2", "multiplication", "table", "erreur", "piege"],
  },

  {
    kind: "fixed",
    id: "cm2_multiplication_table_fixed_6_inverse",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_table",
    difficulty: 2,
    theme: "neutral",
    text: "Complète : ? × 9 = 63",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Cherche quel nombre multiplié par 9 donne 63.",
    explanation: exp(
      "On peut utiliser les tables pour retrouver un facteur manquant.",
      "On cherche dans la table de 9.",
      "7 × 9 = 63.",
      "Le nombre manquant est 7."
    ),
    tags: ["cm2", "multiplication", "table", "facteur_manquant"],
  },

  {
    kind: "template",
    id: "cm2_multiplication_table_tpl_1_produit_direct",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_table",
    difficulty: 1,
    theme: "neutral",
    hint: "Utilise tes tables de multiplication.",
    tags: ["cm2", "multiplication", "table", "template"],
    generate: () => {
      const a = randomInt(2, 9);
      const b = randomInt(2, 9);
      const result = a * b;

      return court(
        randomChoice(T_PRODUIT)(String(a), String(b)),
        result,
        exp(
          "Les tables de multiplication permettent de calculer rapidement.",
          "On cherche le produit des deux facteurs.",
          `${a} × ${b} = ${result}.`,
          `La réponse est ${result}.`
        )
      );
    },
  },

  {
    kind: "template",
    id: "cm2_multiplication_table_tpl_6_groupes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_table",
    difficulty: 1,
    theme: "neutral",
    hint: "Même nombre dans chaque groupe : on multiplie.",
    tags: ["cm2", "multiplication", "table", "groupes_egaux", "template"],
    generate: () => {
      const { L, k } = tireLot(LOTS, [2, 3, 4, 5, 6, 7, 8, 9]);
      return qLot(L, randomInt(2, 9), k);
    },
  },

  {
    kind: "template",
    id: "cm2_multiplication_table_tpl_7_addition_repetee",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_table",
    difficulty: 1,
    theme: "neutral",
    hint: "Compte combien de fois le même nombre est ajouté.",
    tags: ["cm2", "multiplication", "table", "addition_repetee", "template"],
    generate: () => qAdditionRepetee(randomInt(3, 9), randomInt(2, 5)),
  },

  {
    kind: "template",
    id: "cm2_multiplication_table_tpl_8_suite_table",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_table",
    difficulty: 1,
    theme: "neutral",
    hint: "Dans la table de 6, on avance de 6 en 6.",
    tags: ["cm2", "multiplication", "table", "suite", "template"],
    generate: () => qSuiteTable(randomInt(2, 9), randomInt(2, 6)),
  },

  {
    kind: "template",
    id: "cm2_multiplication_table_tpl_9_prix",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_table",
    difficulty: 1,
    theme: "neutral",
    hint: "Prix d’un objet × nombre d’objets.",
    tags: ["cm2", "multiplication", "table", "prix", "template"],
    generate: () => qAchat(randomInt(2, 9), (p) => p <= 9),
  },

  {
    kind: "template",
    id: "cm2_multiplication_table_tpl_2_facteur_manquant",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_table",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche dans la table du nombre donné.",
    tags: ["cm2", "multiplication", "table", "facteur_manquant", "template"],
    generate: () => {
      const a = randomInt(3, 9);
      const missing = randomInt(2, 9);
      const result = a * missing;

      return court(
        texteFacteur(a, result),
        missing,
        exp(
          "Une multiplication à trou demande de retrouver un facteur.",
          "On cherche quel nombre multiplié par le facteur connu donne le résultat.",
          `${a} × ${missing} = ${result}.`,
          `Le nombre manquant est ${missing}.`
        )
      );
    },
  },

  {
    kind: "template",
    id: "cm2_multiplication_table_tpl_3_qcm_produit",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_table",
    difficulty: 2,
    theme: "neutral",
    hint: "Calcule chaque produit proposé si besoin.",
    tags: ["cm2", "multiplication", "table", "qcm", "template"],
    generate: () => qProduitQcm(randomInt(4, 9), randomInt(3, 8)),
  },

  {
    // Ex-« réunion » (un seul marché, toujours la même phrase) : le décor est
    // désormais tiré parmi les situations, et on prend la question par l’autre
    // bout (on connaît le total, on cherche un facteur).
    kind: "template",
    id: "cm2_multiplication_table_tpl_5_reunion",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_table",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche le facteur manquant dans une table.",
    tags: ["cm2", "multiplication", "table", "facteur_manquant", "groupes_egaux", "template"],
    generate: () => {
      const { L, k } = tireLot(LOTS, [2, 3, 4, 5, 6, 7, 8, 9]);
      return qLotManquant(L, randomInt(2, 9), k);
    },
  },

  {
    kind: "template",
    id: "cm2_multiplication_table_tpl_10_vrai_faux",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_table",
    difficulty: 2,
    theme: "neutral",
    hint: "Vérifie le produit avec ta table.",
    tags: ["cm2", "multiplication", "table", "vrai_faux", "template"],
    generate: () => {
      const a = randomInt(2, 9);
      const b = randomInt(2, 9);
      const r = a * b;
      return qVraiFaux(a, b, annonce(r, [r + a, r - a, r + b, r - b, r + 1, r - 1, r + 2]), "Une table de multiplication doit être vérifiée avec précision.", "On calcule le produit et on le compare au résultat annoncé.");
    },
  },

  {
    kind: "template",
    id: "cm2_multiplication_table_tpl_11_multiple",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_table",
    difficulty: 2,
    theme: "neutral",
    hint: "Récite la table du nombre donné.",
    tags: ["cm2", "multiplication", "table", "multiple", "qcm", "template"],
    generate: () => qMultiple(randomInt(3, 9)),
  },

  {
    kind: "template",
    id: "cm2_multiplication_table_tpl_4_erreur",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_table",
    difficulty: 3,
    theme: "neutral",
    hint: "Vérifie le produit avec ta table.",
    tags: ["cm2", "multiplication", "table", "erreur", "template"],
    generate: () => {
      const a = randomInt(6, 9);
      const b = randomInt(6, 9);
      const correct = a * b;
      return qVraiFaux(a, b, annonce(correct, [correct - 3, correct - 2, correct + 2, correct + 3, correct + a, correct - b]), "Une erreur dans une table peut changer tout le calcul.", "On vérifie le produit donné.");
    },
  },

  {
    kind: "template",
    id: "cm2_multiplication_table_tpl_12_egalite_produits",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_table",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule le produit connu, puis cherche dans la table.",
    tags: ["cm2", "multiplication", "table", "facteur_manquant", "template"],
    generate: () => qEgaliteProduits(),
  },

  {
    kind: "template",
    id: "cm2_multiplication_table_tpl_13_groupes_manquant",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_table",
    difficulty: 3,
    theme: "neutral",
    hint: "Quel nombre multiplié par l’autre donne le total ?",
    tags: ["cm2", "multiplication", "table", "facteur_manquant", "groupes_egaux", "template"],
    generate: () => {
      const { L, k } = tireLot(LOTS, [6, 7, 8, 9]);
      return qLotManquant(L, randomInt(6, 9), k);
    },
  },

  {
    kind: "template",
    id: "cm2_multiplication_table_tpl_14_produit_difficile",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_table",
    difficulty: 3,
    theme: "neutral",
    hint: "Les tables de 6, 7, 8 et 9 sont les plus difficiles : récite-les.",
    tags: ["cm2", "multiplication", "table", "template"],
    generate: () => {
      const a = randomInt(6, 9);
      const b = randomInt(6, 9);
      return court(
        randomChoice(T_PRODUIT)(String(a), String(b)),
        a * b,
        exp("Les tables de multiplication permettent de calculer rapidement.", "On cherche le produit des deux facteurs.", `${a} × ${b} = ${a * b}.`, `La réponse est ${a * b}.`)
      );
    },
  },

  {
    kind: "template",
    id: "cm2_multiplication_table_tpl_15_meme_resultat",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_table",
    difficulty: 3,
    theme: "neutral",
    hint: "On peut changer l’ordre des facteurs.",
    tags: ["cm2", "multiplication", "table", "commutativite", "qcm", "template"],
    generate: () => {
      const a = randomInt(3, 9);
      let b = randomInt(3, 9);
      while (b === a) b = randomInt(3, 9);
      return qMemeResultat(a, b);
    },
  },

  {
    kind: "template",
    id: "cm2_multiplication_table_tpl_16_groupes_difficiles",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_table",
    difficulty: 3,
    theme: "neutral",
    hint: "Même nombre dans chaque groupe : on multiplie.",
    tags: ["cm2", "multiplication", "table", "groupes_egaux", "template"],
    generate: () => {
      const { L, k } = tireLot(LOTS, [6, 7, 8, 9]);
      return qLot(L, randomInt(6, 9), k);
    },
  },

  // ============================================================
  // MULTIPLICATION_MENTAL
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_multiplication_mental_fixed_1_double",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule mentalement : 18 × 2",
    format: "short",
    expected: ["36"],
    comparator: "number_equal",
    hint: "Multiplier par 2, c’est doubler.",
    explanation: exp(
      "Multiplier mentalement, c’est utiliser une stratégie rapide sans poser l’opération.",
      "Pour multiplier par 2, on double le nombre.",
      "18 × 2 = 18 + 18 = 36.",
      "La réponse est 36."
    ),
    tags: ["cm2", "multiplication", "mental", "double"],
  },

  {
    kind: "fixed",
    id: "cm2_multiplication_mental_fixed_2_par_5",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule mentalement : 24 × 5",
    format: "short",
    expected: ["120"],
    comparator: "number_equal",
    hint: "Multiplier par 5, c’est multiplier par 10 puis prendre la moitié.",
    explanation: exp(
      "Multiplier mentalement peut se faire avec une stratégie.",
      "Pour multiplier par 5, on peut multiplier par 10 puis diviser par 2.",
      "24 × 10 = 240, et la moitié de 240 est 120.",
      "Donc 24 × 5 = 120."
    ),
    tags: ["cm2", "multiplication", "mental", "par_5", "strategie"],
  },

  {
    kind: "fixed",
    id: "cm2_multiplication_mental_fixed_3_par_9",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule mentalement : 17 × 9",
    format: "short",
    expected: ["153"],
    comparator: "number_equal",
    hint: "Multiplier par 9, c’est multiplier par 10 puis enlever le nombre.",
    explanation: exp(
      "Une stratégie mentale permet d’éviter un calcul posé.",
      "Pour multiplier par 9, on peut faire ×10 puis enlever une fois le nombre.",
      "17 × 10 = 170, puis 170 - 17 = 153.",
      "Donc 17 × 9 = 153."
    ),
    tags: ["cm2", "multiplication", "mental", "par_9", "strategie"],
  },

  {
    kind: "fixed",
    id: "cm2_multiplication_mental_fixed_4_par_25",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule mentalement : 12 × 25",
    format: "short",
    expected: ["300"],
    comparator: "number_equal",
    hint: "25, c’est le quart de 100.",
    explanation: exp(
      "Multiplier mentalement demande parfois de transformer le calcul.",
      "Multiplier par 25, c’est multiplier par 100 puis diviser par 4.",
      "12 × 100 = 1200, et 1200 ÷ 4 = 300.",
      "Donc 12 × 25 = 300."
    ),
    tags: ["cm2", "multiplication", "mental", "par_25", "strategie"],
  },

  {
    kind: "fixed",
    id: "cm2_multiplication_mental_fixed_5_decomposer",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule mentalement : 14 × 6",
    format: "short",
    expected: ["84"],
    comparator: "number_equal",
    hint: "Tu peux décomposer 14 en 10 + 4.",
    explanation: exp(
      "Décomposer un nombre peut aider à multiplier mentalement.",
      "On transforme 14 × 6 en (10 × 6) + (4 × 6).",
      "10 × 6 = 60 et 4 × 6 = 24. Donc 60 + 24 = 84.",
      "La réponse est 84."
    ),
    tags: ["cm2", "multiplication", "mental", "decomposition"],
  },

  {
    kind: "fixed",
    id: "cm2_multiplication_mental_fixed_6_piege",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : 19 × 5 = 90. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Calcule 19 × 10 puis prends la moitié.",
    explanation: exp(
      "Une stratégie mentale permet de vérifier rapidement un résultat.",
      "Pour multiplier par 5, on peut multiplier par 10 puis diviser par 2.",
      "19 × 10 = 190, et la moitié de 190 est 95.",
      "Donc 19 × 5 = 95, pas 90."
    ),
    tags: ["cm2", "multiplication", "mental", "par_5", "erreur", "piege"],
  },

  {
    kind: "fixed",
    id: "cm2_multiplication_mental_fixed_7_choisir_strategie",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle stratégie est pratique pour calculer 32 × 5 ?",
    format: "qcm",
    choices: [
      "faire 32 × 10 puis diviser par 2",
      "faire 32 + 5",
      "faire 32 - 5",
      "faire 32 ÷ 5",
    ],
    expected: ["faire 32 × 10 puis diviser par 2"],
    comparator: "mcq_exact",
    hint: "Multiplier par 5, c’est prendre la moitié de ×10.",
    explanation: exp(
      "Multiplier mentalement, c’est choisir une méthode efficace.",
      "Pour multiplier par 5, on peut passer par ×10.",
      "32 × 10 = 320, puis 320 ÷ 2 = 160.",
      "La stratégie correcte est de faire 32 × 10 puis diviser par 2."
    ),
    tags: ["cm2", "multiplication", "mental", "strategie", "qcm"],
  },

  {
    kind: "template",
    id: "cm2_multiplication_mental_tpl_1_double",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 1,
    theme: "neutral",
    hint: "Multiplier par 2, c’est doubler.",
    tags: ["cm2", "multiplication", "mental", "double", "template"],
    generate: () => qDouble(randomInt(11, 49)),
  },

  {
    kind: "template",
    id: "cm2_multiplication_mental_tpl_7_dizaines_rondes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 1,
    theme: "neutral",
    hint: "30, c’est 3 dizaines : utilise ta table puis les dizaines.",
    tags: ["cm2", "multiplication", "mental", "dizaines", "template"],
    generate: () => qDizainesRondes(randomInt(2, 9), randomInt(2, 9)),
  },

  {
    kind: "template",
    id: "cm2_multiplication_mental_tpl_8_groupes_dizaines",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 1,
    theme: "neutral",
    hint: "Même nombre dans chaque groupe : on multiplie.",
    tags: ["cm2", "multiplication", "mental", "groupes_egaux", "template"],
    generate: () => {
      const { L, k } = tireLot(LOTS, [10, 20, 30, 40]);
      return qLot(L, randomInt(2, 9), k);
    },
  },

  {
    kind: "template",
    id: "cm2_multiplication_mental_tpl_9_triple_quadruple",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 1,
    theme: "neutral",
    hint: "Le triple, c’est × 3 ; le double du double, c’est × 4.",
    tags: ["cm2", "multiplication", "mental", "triple", "template"],
    generate: () => qTripleQuadruple(randomInt(11, 25)),
  },

  {
    kind: "template",
    id: "cm2_multiplication_mental_tpl_10_prix_ronds",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 1,
    theme: "neutral",
    hint: "Prix d’un objet × nombre d’objets.",
    tags: ["cm2", "multiplication", "mental", "prix", "template"],
    generate: () => qAchat(randomInt(2, 9), (p) => p % 10 === 0),
  },

  {
    kind: "template",
    id: "cm2_multiplication_mental_tpl_2_par_5",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplier par 5, c’est multiplier par 10 puis diviser par 2.",
    tags: ["cm2", "multiplication", "mental", "par_5", "template"],
    generate: () => qStrategie("par5", randomInt(11, 48)),
  },

  {
    kind: "template",
    id: "cm2_multiplication_mental_tpl_11_par_11",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplier par 11, c’est multiplier par 10 puis ajouter le nombre.",
    tags: ["cm2", "multiplication", "mental", "par_11", "template"],
    generate: () => qStrategie("par11", randomInt(12, 45)),
  },

  {
    kind: "template",
    id: "cm2_multiplication_mental_tpl_12_par_4",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplier par 4, c’est doubler deux fois.",
    tags: ["cm2", "multiplication", "mental", "par_4", "template"],
    generate: () => qStrategie("par4", randomInt(11, 30)),
  },

  {
    kind: "template",
    id: "cm2_multiplication_mental_tpl_13_groupes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 2,
    theme: "neutral",
    hint: "Décompose le plus grand nombre en dizaines et unités.",
    tags: ["cm2", "multiplication", "mental", "groupes_egaux", "template"],
    generate: () => {
      const { L, k } = tireLot(LOTS, [11, 12, 13, 14, 15, 16, 18, 21, 22, 24, 25]);
      return qLot(L, randomInt(2, 5), k);
    },
  },

  {
    kind: "template",
    id: "cm2_multiplication_mental_tpl_14_vrai_faux",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 2,
    theme: "neutral",
    hint: "Refais le calcul avec ta stratégie préférée.",
    tags: ["cm2", "multiplication", "mental", "vrai_faux", "template"],
    generate: () => qVraiFauxMental(randomChoice(["par5", "par4", "par11"] as const), randomInt(11, 39)),
  },

  {
    kind: "template",
    id: "cm2_multiplication_mental_tpl_23_rythme",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 2,
    theme: "neutral",
    hint: "La même quantité répétée : on multiplie, de tête.",
    tags: ["cm2", "multiplication", "mental", "repetition", "template"],
    generate: () => qRythme((k) => k >= 12 && k <= 25, (n) => n <= 5),
  },

  {
    kind: "template",
    id: "cm2_multiplication_mental_tpl_24_prix",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 2,
    theme: "neutral",
    hint: "Prix d’un objet × nombre d’objets ; décompose le prix.",
    tags: ["cm2", "multiplication", "mental", "prix", "template"],
    generate: () => qAchat(randomInt(2, 5), (p) => p >= 12 && p <= 15),
  },

  {
    kind: "template",
    id: "cm2_multiplication_mental_tpl_3_par_9",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplier par 9, c’est faire ×10 puis enlever une fois le nombre.",
    tags: ["cm2", "multiplication", "mental", "par_9", "template"],
    generate: () => qStrategie("par9", randomInt(11, 39)),
  },

  {
    kind: "template",
    id: "cm2_multiplication_mental_tpl_4_decomposer",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 3,
    theme: "neutral",
    hint: "Décompose le premier nombre en dizaines et unités.",
    tags: ["cm2", "multiplication", "mental", "decomposition", "template"],
    generate: () => qDecomposer(),
  },

  {
    // Ex-« réunion » (toujours la plage) : les situations sont tirées au sort.
    kind: "template",
    id: "cm2_multiplication_mental_tpl_6_reunion",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 3,
    theme: "neutral",
    hint: "Même nombre d’objets dans chaque groupe : on multiplie.",
    tags: ["cm2", "multiplication", "mental", "groupes_egaux", "template"],
    generate: () => {
      const { L, k } = tireLot(LOTS, [12, 14, 15, 16, 18, 20, 24, 25, 30, 35, 40]);
      return qLot(L, randomInt(3, 9), k);
    },
  },

  {
    kind: "template",
    id: "cm2_multiplication_mental_tpl_15_choisir_strategie",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 3,
    theme: "neutral",
    hint: "Pense à × 10, puis ajuste.",
    tags: ["cm2", "multiplication", "mental", "strategie", "qcm", "template"],
    generate: () => qChoisirStrategie(randomInt(12, 48)),
  },

  {
    kind: "template",
    id: "cm2_multiplication_mental_tpl_16_prix",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 3,
    theme: "neutral",
    hint: "Prix d’un objet × nombre d’objets ; décompose le prix si besoin.",
    tags: ["cm2", "multiplication", "mental", "prix", "template"],
    generate: () => qAchat(randomInt(3, 9), (p) => p >= 12 && p <= 25),
  },

  {
    kind: "template",
    id: "cm2_multiplication_mental_tpl_17_fois_plus",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 3,
    theme: "neutral",
    hint: "« 3 fois plus », c’est multiplier par 3.",
    tags: ["cm2", "multiplication", "mental", "fois_plus", "template"],
    generate: () => qFoisPlus(randomInt(12, 25), randomInt(2, 5)),
  },

  {
    kind: "template",
    id: "cm2_multiplication_mental_tpl_5_par_25",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 4,
    theme: "neutral",
    hint: "25 est le quart de 100.",
    tags: ["cm2", "multiplication", "mental", "par_25", "template"],
    generate: () => qStrategie("par25", 4 * randomInt(2, 12)),
  },

  {
    kind: "template",
    id: "cm2_multiplication_mental_tpl_18_par_50",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 4,
    theme: "neutral",
    hint: "50 est la moitié de 100.",
    tags: ["cm2", "multiplication", "mental", "par_50", "template"],
    generate: () => qStrategie("par50", randomInt(11, 48)),
  },

  {
    kind: "template",
    id: "cm2_multiplication_mental_tpl_19_par_12",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 4,
    theme: "neutral",
    hint: "12 = 10 + 2.",
    tags: ["cm2", "multiplication", "mental", "par_12", "template"],
    generate: () => qStrategie("par12", randomInt(11, 25)),
  },

  {
    kind: "template",
    id: "cm2_multiplication_mental_tpl_20_groupes_difficiles",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 4,
    theme: "neutral",
    hint: "Choisis une stratégie : × 10, la moitié, le double…",
    tags: ["cm2", "multiplication", "mental", "groupes_egaux", "template"],
    generate: () => {
      const { L, k } = tireLot(LOTS, [12, 15, 20, 25]);
      return qLot(L, randomInt(11, 30), k);
    },
  },

  {
    kind: "template",
    id: "cm2_multiplication_mental_tpl_21_vrai_faux",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 4,
    theme: "neutral",
    hint: "Refais le calcul avec ta stratégie préférée.",
    tags: ["cm2", "multiplication", "mental", "vrai_faux", "template"],
    generate: () => {
      const cle = randomChoice(["par25", "par50", "par12"] as const);
      return qVraiFauxMental(cle, cle === "par25" ? 4 * randomInt(2, 12) : randomInt(11, 25));
    },
  },

  {
    kind: "template",
    id: "cm2_multiplication_mental_tpl_22_prix_groupe",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 4,
    theme: "neutral",
    hint: "Prix d’un objet × nombre d’objets ; × 25 ou × 50 se font de tête.",
    tags: ["cm2", "multiplication", "mental", "prix", "template"],
    generate: () => qAchat(randomInt(11, 30), (p) => [12, 15, 20, 25, 50].includes(p), true),
  },

  {
    kind: "template",
    id: "cm2_multiplication_mental_tpl_25_rythme",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_mental",
    difficulty: 4,
    theme: "neutral",
    hint: "La même quantité répétée : choisis une stratégie de calcul mental.",
    tags: ["cm2", "multiplication", "mental", "repetition", "template"],
    generate: () => qRythme((k) => k >= 12, (n) => n >= 10),
  },

  // ============================================================
  // MULTIPLICATION_POSEE
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_multiplication_posee_fixed_1_methode",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 1,
    theme: "neutral",
    text: "Dans une multiplication posée, pourquoi faut-il bien aligner les chiffres ?",
    format: "qcm",
    choices: [
      "pour respecter le rang des chiffres",
      "pour écrire plus vite",
      "pour éviter de multiplier",
      "pour changer le résultat",
    ],
    expected: ["pour respecter le rang des chiffres"],
    comparator: "mcq_exact",
    hint: "Chaque chiffre a une valeur selon sa position : unités, dizaines, centaines.",
    explanation: exp(
      "Une multiplication posée organise un calcul en colonnes.",
      "On place les chiffres en respectant leur rang.",
      "Les unités, dizaines et centaines n’ont pas la même valeur.",
      "Il faut aligner correctement les chiffres pour ne pas mélanger les rangs."
    ),
    tags: ["cm2", "multiplication", "posee", "methode", "qcm", "canvas"],
    canvas: calculPoseCanvas({
      operation: "multiplication",
      title: "Multiplication posée",
      numbers: ["124", "3"],
      result: "372",
      questionLabel: "Observe le rang des chiffres.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_multiplication_posee_fixed_2_simple",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule la multiplication posée : 123 × 3",
    format: "short",
    expected: ["369"],
    comparator: "number_equal",
    hint: "Multiplie 3 par chaque chiffre : unités, dizaines, centaines.",
    explanation: exp(
      "Poser une multiplication permet de multiplier un grand nombre par étapes.",
      "On multiplie chaque chiffre du nombre du haut par le nombre du bas.",
      "123 × 3 = 369.",
      "Le résultat est 369."
    ),
    tags: ["cm2", "multiplication", "posee", "simple", "canvas"],
    canvas: calculPoseCanvas({
      operation: "multiplication",
      title: "Multiplication posée",
      numbers: ["123", "3"],
      result: "369",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_multiplication_posee_fixed_3_avec_retenue",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule : 247 × 4",
    format: "short",
    expected: ["988"],
    comparator: "number_equal",
    hint: "Attention aux retenues.",
    explanation: exp(
      "Une retenue apparaît quand un produit dépasse 9 dans une colonne.",
      "On multiplie colonne par colonne et on reporte les retenues.",
      "247 × 4 = 988.",
      "Le résultat est 988."
    ),
    tags: ["cm2", "multiplication", "posee", "retenue", "canvas"],
    canvas: calculPoseCanvas({
      operation: "multiplication",
      title: "Multiplication avec retenues",
      numbers: ["247", "4"],
      result: "988",
      questionLabel: "Pense aux retenues.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_multiplication_posee_fixed_4_erreur_retenue",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève calcule 126 × 4 et oublie une retenue. Pourquoi son résultat peut-il être faux ?",
    format: "open",
    expected: ["retenue", "reporter", "colonne", "résultat", "multiplier"],
    comparator: "contains_keyword",
    hint: "Une retenue oubliée change la colonne suivante.",
    explanation: exp(
      "Une retenue est une quantité à reporter dans la colonne suivante.",
      "On doit multiplier puis ajouter la retenue au bon moment.",
      "Si une retenue est oubliée, une colonne devient fausse.",
      "Oublier une retenue peut rendre tout le résultat faux."
    ),
    tags: ["cm2", "multiplication", "posee", "erreur", "retenue", "open", "canvas"],
    canvas: calculPoseCanvas({
      operation: "multiplication",
      title: "Erreur fréquente",
      numbers: ["126", "4"],
      result: "504",
      questionLabel: "La retenue doit être reportée.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_multiplication_posee_fixed_5_zero",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule : 306 × 5",
    format: "short",
    expected: ["1530"],
    comparator: "number_equal",
    hint: "N’oublie pas le zéro dans le nombre 306.",
    explanation: exp(
      "Dans une multiplication posée, chaque chiffre compte, même le zéro.",
      "On multiplie chaque chiffre en respectant son rang.",
      "306 × 5 = 1530.",
      "Le résultat est 1530."
    ),
    tags: ["cm2", "multiplication", "posee", "zero", "canvas"],
    canvas: calculPoseCanvas({
      operation: "multiplication",
      title: "Multiplication avec zéro",
      numbers: ["306", "5"],
      result: "1530",
      questionLabel: "Le zéro garde son rang.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

  {
    kind: "template",
    id: "cm2_multiplication_posee_tpl_6_deux_chiffres_sans_retenue",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 1,
    theme: "neutral",
    hint: "Commence par les unités, puis les dizaines.",
    tags: ["cm2", "multiplication", "posee", "template", "canvas"],
    generate: () => {
      const b = randomInt(2, 4);
      let a = sansRetenue(2, b);
      while (a < 11) a = sansRetenue(2, b);
      return qPosee(a, b, T_POSEE, ["Une multiplication posée permet de calculer en colonnes.", "On multiplie chaque chiffre du nombre par le chiffre du bas, en commençant par les unités."], "Multiplication posée");
    },
  },

  {
    kind: "template",
    id: "cm2_multiplication_posee_tpl_7_groupes_facile",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 1,
    theme: "neutral",
    hint: "Même nombre dans chaque groupe : on multiplie. Tu peux poser l’opération.",
    tags: ["cm2", "multiplication", "posee", "groupes_egaux", "template", "canvas"],
    generate: () => {
      const n = randomInt(2, 4);
      const L = randomChoice(LOTS.filter((l) => l.kMax >= 11));
      let k = randomInt(11, L.kMax);
      while (aRetenue(k, n)) k = randomInt(11, L.kMax);
      return qLot(L, n, k, "", posee(k, n, "Multiplication posée"));
    },
  },

  {
    kind: "template",
    id: "cm2_multiplication_posee_tpl_8_etapes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 1,
    theme: "neutral",
    hint: "On commence toujours par la colonne des unités.",
    tags: ["cm2", "multiplication", "posee", "methode", "template"],
    generate: () => qEtapePosee(randomInt(12, 98), randomInt(2, 9)),
  },

  {
    kind: "template",
    id: "cm2_multiplication_posee_tpl_9_prix",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 1,
    theme: "neutral",
    hint: "Prix d’un objet × nombre d’objets.",
    tags: ["cm2", "multiplication", "posee", "prix", "template"],
    generate: () => qAchat(randomInt(2, 4), (p) => p >= 12 && p <= 25),
  },

  {
    kind: "template",
    id: "cm2_multiplication_posee_tpl_21_rythme",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 1,
    theme: "neutral",
    hint: "La même quantité répétée : on multiplie. Tu peux poser l’opération.",
    tags: ["cm2", "multiplication", "posee", "repetition", "template"],
    generate: () => qRythme((k) => k >= 12, (n) => n <= 4),
  },

  {
    kind: "template",
    id: "cm2_multiplication_posee_tpl_1_un_chiffre_sans_retenue",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplie chaque chiffre du nombre par le chiffre du bas.",
    tags: ["cm2", "multiplication", "posee", "template", "canvas"],
    generate: () => {
      const b = randomInt(2, 3);
      return qPosee(sansRetenue(3, b), b, T_POSEE, ["Une multiplication posée permet de calculer en colonnes.", "On multiplie chaque chiffre du nombre par le chiffre du bas."], "Multiplication posée");
    },
  },

  {
    kind: "template",
    id: "cm2_multiplication_posee_tpl_10_groupes_sans_retenue",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 2,
    theme: "neutral",
    hint: "Même nombre dans chaque groupe : pose la multiplication.",
    tags: ["cm2", "multiplication", "posee", "groupes_egaux", "template", "canvas"],
    generate: () => {
      const L = randomChoice(GRANDS.filter((l) => l.grandMax >= 101 && l.petits.some((p) => p <= 4)));
      const p = randomChoice(L.petits.filter((x) => x <= 4));
      let g = sansRetenue(3, p);
      while (g > L.grandMax) g = sansRetenue(3, p);
      const [n, k] = L.grand === "n" ? [g, p] : [p, g];
      return qLot(L, n, k, "", posee(g, p, "Multiplication posée"));
    },
  },

  {
    kind: "template",
    id: "cm2_multiplication_posee_tpl_11_vrai_faux",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 2,
    theme: "neutral",
    hint: "Refais le calcul colonne par colonne.",
    tags: ["cm2", "multiplication", "posee", "vrai_faux", "template"],
    generate: () => {
      const b = randomInt(2, 3);
      const a = sansRetenue(3, b);
      const r = a * b;
      return qVraiFaux(a, b, annonce(r, [r + 10, r - 10, r + 100, r - 100, r + 1]), "Vérifier une multiplication permet de repérer une erreur.", "On refait le calcul colonne par colonne.");
    },
  },

  {
    kind: "template",
    id: "cm2_multiplication_posee_tpl_12_etapes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 2,
    theme: "neutral",
    hint: "On commence toujours par la colonne des unités.",
    tags: ["cm2", "multiplication", "posee", "methode", "template"],
    generate: () => qEtapePosee(randomInt(102, 989), randomInt(2, 9)),
  },

  {
    kind: "template",
    id: "cm2_multiplication_posee_tpl_13_prix",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 2,
    theme: "neutral",
    hint: "Prix d’un objet × nombre d’objets.",
    tags: ["cm2", "multiplication", "posee", "prix", "template"],
    generate: () => qAchat(randomInt(2, 5), (p) => p >= 12 && p <= 40),
  },

  {
    kind: "template",
    id: "cm2_multiplication_posee_tpl_2_un_chiffre_avec_retenue",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplie colonne par colonne et pense aux retenues.",
    tags: ["cm2", "multiplication", "posee", "retenue", "template", "canvas"],
    generate: () => {
      const b = randomInt(3, 9);
      let a = randomInt(112, 989);
      while (!aRetenue(a, b) || a % 100 < 10) a = randomInt(112, 989);
      return qPosee(
        a,
        b,
        [...T_POSEE.slice(0, 3), (x, y) => `Attention aux retenues : calcule ${x} × ${y}.`],
        ["Une multiplication posée peut nécessiter des retenues.", "On multiplie chaque colonne et on reporte les retenues."],
        "Multiplication avec retenues",
        "Attention aux retenues."
      );
    },
  },

  {
    kind: "template",
    id: "cm2_multiplication_posee_tpl_3_avec_zero",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 3,
    theme: "neutral",
    hint: "Le zéro est un chiffre : il garde sa place.",
    tags: ["cm2", "multiplication", "posee", "zero", "template", "canvas"],
    generate: () => {
      const a = randomInt(1, 9) * 100 + randomInt(1, 9);
      const b = randomInt(3, 9);
      return qPosee(
        a,
        b,
        [
          (x, y) => `Pose et calcule ${x} × ${y}. Attention au zéro !`,
          (x, y) => `Calcule ${x} × ${y} : n’oublie pas le zéro des dizaines.`,
          (x, y) => `Combien font ${x} × ${y} ? Le zéro de ${x} garde sa place.`,
          (x, y) => `Pose ${x} × ${y} en colonnes. Quel est le résultat ?`,
        ],
        ["Le zéro dans un nombre garde son rang.", "On pose la multiplication en respectant chaque chiffre : 0 × le chiffre du bas donne 0, plus la retenue éventuelle."],
        "Multiplication avec zéro",
        "Ne supprime pas le zéro : il garde une place."
      );
    },
  },

  {
    kind: "template",
    id: "cm2_multiplication_posee_tpl_14_groupes_retenue",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 3,
    theme: "neutral",
    hint: "Pose la multiplication et pense aux retenues.",
    tags: ["cm2", "multiplication", "posee", "retenue", "groupes_egaux", "template", "canvas"],
    generate: () => {
      const { L, n, k, g, p } = tireGrand(101, 999, (x) => x >= 3 && x <= 9);
      return qLot(L, n, k, "", posee(g, p, "Multiplication avec retenues", "Attention aux retenues."));
    },
  },

  {
    kind: "template",
    id: "cm2_multiplication_posee_tpl_16_oubli_retenue",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 3,
    theme: "neutral",
    hint: "Une retenue oubliée rend le résultat trop petit.",
    tags: ["cm2", "multiplication", "posee", "retenue", "erreur", "template"],
    generate: () => {
      const b = randomInt(3, 9);
      let a = randomInt(112, 989);
      while (!aRetenue(a, b) || oubliRetenues(a, b) === a * b) a = randomInt(112, 989);
      return qVraiFaux(a, b, annonce(a * b, [oubliRetenues(a, b)]), "Une retenue est une quantité à reporter dans la colonne suivante.", "On refait le calcul en reportant chaque retenue.");
    },
  },

  {
    kind: "template",
    id: "cm2_multiplication_posee_tpl_17_prix",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 3,
    theme: "neutral",
    hint: "Prix d’un objet × nombre d’objets : pose l’opération.",
    tags: ["cm2", "multiplication", "posee", "prix", "template"],
    generate: () => qAchat(randomInt(3, 9), (p) => p >= 12),
  },

  {
    kind: "template",
    id: "cm2_multiplication_posee_tpl_22_rythme",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 3,
    theme: "neutral",
    hint: "La même quantité répétée : pose la multiplication.",
    tags: ["cm2", "multiplication", "posee", "repetition", "template"],
    generate: () => qRythme((k) => k >= 12, (n) => n >= 3),
  },

  {
    kind: "template",
    id: "cm2_multiplication_posee_tpl_4_erreur_resultat",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 4,
    theme: "neutral",
    hint: "Sur la deuxième ligne, on multiplie par des dizaines : on écrit d’abord un 0.",
    tags: ["cm2", "multiplication", "posee", "erreur", "verification", "template"],
    generate: () => {
      const a = randomInt(12, 98);
      const t = randomInt(1, 9);
      const u = randomInt(1, 9);
      const b = t * 10 + u;
      return qVraiFaux(
        a,
        b,
        annonce(a * b, [a * u + a * t]),
        "Dans une multiplication par un nombre à deux chiffres, la deuxième ligne vaut des dizaines.",
        `On calcule ${a} × ${u} = ${a * u}, puis ${a} × ${t * 10} = ${a * t * 10} (sans oublier le 0), et on additionne.`
      );
    },
  },

  {
    // Ex-« réunion » (toujours le même marché) : de grands lots tirés au sort.
    kind: "template",
    id: "cm2_multiplication_posee_tpl_5_reunion",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 4,
    theme: "neutral",
    hint: "Même quantité répétée plusieurs fois : on multiplie. Pose l’opération.",
    tags: ["cm2", "multiplication", "posee", "probleme", "template", "canvas"],
    generate: () => {
      const { L, n, k, g, p } = Math.random() < 0.6 ? tireGrand(12, 99, (x) => x >= 11) : tireGrand(101, 999, (x) => x >= 11 && x <= 30);
      return qLot(L, n, k, "", posee(g, p, "Problème — multiplication posée", "On peut poser la multiplication."));
    },
  },

  {
    kind: "template",
    id: "cm2_multiplication_posee_tpl_18_deux_chiffres",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 4,
    theme: "neutral",
    hint: "Deux lignes : les unités, puis les dizaines (avec un 0).",
    tags: ["cm2", "multiplication", "posee", "deux_chiffres", "template", "canvas"],
    generate: () =>
      qPosee(
        randomInt(23, 98),
        randomInt(12, 49),
        [...T_POSEE, (x, y) => `Pose ${x} × ${y} : n’oublie pas le 0 au début de la deuxième ligne.`],
        ["Pour multiplier par un nombre à deux chiffres, on calcule deux lignes puis on les additionne.", "On multiplie par les unités, puis par les dizaines (en écrivant un 0), et on additionne."],
        "Multiplication à deux chiffres"
      ),
  },

  {
    kind: "template",
    id: "cm2_multiplication_posee_tpl_19_produits_partiels",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 4,
    theme: "neutral",
    hint: "47 × 23, c’est 47 × 3 plus 47 × 20.",
    tags: ["cm2", "multiplication", "posee", "deux_chiffres", "methode", "template"],
    generate: () => qProduitsPartiels(),
  },

  {
    kind: "template",
    id: "cm2_multiplication_posee_tpl_20_prix_groupe",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_posee",
    difficulty: 4,
    theme: "neutral",
    hint: "Prix d’un objet × nombre d’objets : pose l’opération.",
    tags: ["cm2", "multiplication", "posee", "prix", "template"],
    generate: () => qAchat(randomInt(11, 40), (p) => p >= 12, true),
  },

  // ============================================================
  // MULTIPLICATION_PUISSANCE_DIX
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_multiplication_puissance_dix_fixed_1_par_10",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 34 × 10",
    format: "short",
    expected: ["340"],
    comparator: "number_equal",
    hint: "Multiplier par 10, c’est rendre chaque chiffre dix fois plus grand : il monte d’une colonne.",
    explanation: exp(
      "Multiplier par 10, 100 ou 1 000 change la valeur de chaque chiffre.",
      "Multiplier par 10, c’est rendre chaque chiffre dix fois plus grand : il monte d’une colonne.",
      "4 unités deviennent 4 dizaines, 3 dizaines deviennent 3 centaines : 340.",
      "34 × 10 = 340."
    ),
    tags: ["cm2", "multiplication", "puissance_dix", "par_10"],
  },

  {
    kind: "fixed",
    id: "cm2_multiplication_puissance_dix_fixed_2_par_100",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule : 56 × 100",
    format: "short",
    expected: ["5600", "5 600"],
    comparator: "number_equal",
    hint: "Multiplier par 100, c’est rendre chaque chiffre cent fois plus grand : il monte de deux colonnes.",
    explanation: exp(
      "Multiplier par 100 change la valeur de chaque chiffre.",
      "Multiplier par 100, c’est rendre chaque chiffre cent fois plus grand : il monte de deux colonnes.",
      "6 unités deviennent 6 centaines, 5 dizaines deviennent 5 milliers : 5 600.",
      "56 × 100 = 5 600."
    ),
    tags: ["cm2", "multiplication", "puissance_dix", "par_100"],
  },

  {
    kind: "fixed",
    id: "cm2_multiplication_puissance_dix_fixed_3_par_1000",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 7 × 1 000",
    format: "short",
    expected: ["7000", "7 000"],
    comparator: "number_equal",
    hint: "Multiplier par 1 000, c’est rendre chaque chiffre mille fois plus grand : il monte de trois colonnes.",
    explanation: exp(
      "Multiplier par 1 000 change la valeur de chaque chiffre.",
      "Multiplier par 1 000, c’est rendre chaque chiffre mille fois plus grand : il monte de trois colonnes.",
      "7 unités deviennent 7 milliers : 7 000.",
      "7 × 1 000 = 7 000."
    ),
    tags: ["cm2", "multiplication", "puissance_dix", "par_1000"],
  },

  {
    kind: "fixed",
    id: "cm2_multiplication_puissance_dix_fixed_4_qcm",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est le résultat de 48 × 10 ?",
    format: "qcm",
    choices: ["480", "48", "4 800", "58"],
    expected: ["480"],
    comparator: "mcq_exact",
    hint: "Multiplier par 10, c’est rendre chaque chiffre dix fois plus grand : il monte d’une colonne.",
    explanation: exp(
      "Multiplier par 10 rend un nombre 10 fois plus grand.",
      "Multiplier par 10, c’est rendre chaque chiffre dix fois plus grand : il monte d’une colonne.",
      "8 unités deviennent 8 dizaines, 4 dizaines deviennent 4 centaines : 480.",
      "La bonne réponse est 480."
    ),
    tags: ["cm2", "multiplication", "puissance_dix", "qcm", "par_10"],
  },

  {
    kind: "fixed",
    id: "cm2_multiplication_puissance_dix_fixed_5_piege_zero",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève affirme que 205 × 10 = 2050. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Chaque chiffre de 205 monte d’une colonne, le zéro aussi.",
    explanation: exp(
      "Multiplier par 10 rend un nombre 10 fois plus grand.",
      "Multiplier par 10, c’est rendre chaque chiffre dix fois plus grand : il monte d’une colonne.",
      "5 unités deviennent 5 dizaines, 0 dizaine devient 0 centaine, 2 centaines deviennent 2 milliers : 2 050.",
      "205 × 10 = 2 050 : l’élève a raison."
    ),
    tags: ["cm2", "multiplication", "puissance_dix", "zero", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_multiplication_puissance_dix_fixed_6_piege_nombre_grand",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève affirme que 73 × 100 = 730. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Multiplier par 100 : chaque chiffre monte de deux colonnes.",
    explanation: exp(
      "Multiplier par 100 rend un nombre 100 fois plus grand.",
      "Multiplier par 100, c’est rendre chaque chiffre cent fois plus grand : il monte de deux colonnes.",
      "3 unités deviennent 3 centaines, 7 dizaines deviennent 7 milliers : 7 300, et non 730.",
      "L’élève n’a pas raison."
    ),
    tags: ["cm2", "multiplication", "puissance_dix", "erreur", "piege"],
  },

  {
    kind: "fixed",
    id: "cm2_multiplication_puissance_dix_fixed_7_rang",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 3,
    theme: "neutral",
    text: "Pourquoi 42 × 100 est-il plus grand que 42 × 10 ?",
    format: "open",
    expected: ["100", "10", "plus grand", "dix fois", "rang"],
    comparator: "contains_keyword",
    hint: "100 est dix fois plus grand que 10.",
    explanation: exp(
      "Multiplier par 10 ou par 100 ne donne pas le même ordre de grandeur.",
      "On compare les multiplicateurs 10 et 100.",
      "100 est dix fois plus grand que 10, donc 42 × 100 est dix fois plus grand que 42 × 10.",
      "Multiplier par 100 donne un résultat plus grand que multiplier par 10."
    ),
    tags: ["cm2", "multiplication", "puissance_dix", "open", "raisonnement"],
  },

  {
    kind: "template",
    id: "cm2_multiplication_puissance_dix_tpl_1_par_10",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 1,
    theme: "neutral",
    hint: "34 × 10, c’est 34 dizaines.",
    tags: ["cm2", "multiplication", "puissance_dix", "par_10", "template"],
    generate: () => qP10(randomInt(11, 99), 10),
  },

  {
    kind: "template",
    id: "cm2_multiplication_puissance_dix_tpl_7_groupes_de_dix",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 1,
    theme: "neutral",
    hint: "Des paquets de 10 : on multiplie par 10.",
    tags: ["cm2", "multiplication", "puissance_dix", "groupes_egaux", "template"],
    generate: () => qLotDix([10, 100], 2, 25),
  },

  {
    kind: "template",
    id: "cm2_multiplication_puissance_dix_tpl_8_facteur",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 1,
    theme: "neutral",
    hint: "De combien de colonnes chaque chiffre est-il monté ?",
    tags: ["cm2", "multiplication", "puissance_dix", "facteur_manquant", "qcm", "template"],
    generate: () => qFacteurP10(randomInt(2, 99), randomChoice([10, 100])),
  },

  {
    kind: "template",
    id: "cm2_multiplication_puissance_dix_tpl_9_conversion",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 1,
    theme: "neutral",
    hint: "1 m = 100 cm, 1 cm = 10 mm, 1 € = 100 centimes.",
    tags: ["cm2", "multiplication", "puissance_dix", "conversion", "template"],
    generate: () => qConversion((f) => f <= 100, randomInt(2, 45)),
  },

  {
    kind: "template",
    id: "cm2_multiplication_puissance_dix_tpl_10_vrai_faux",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 1,
    theme: "neutral",
    hint: "× 10 : chaque chiffre monte d’une colonne.",
    tags: ["cm2", "multiplication", "puissance_dix", "vrai_faux", "template"],
    generate: () => {
      const n = randomInt(12, 99);
      return qVraiFaux(n, 10, annonce(n * 10, [n * 100, n + 10, n * 10 + 1]), "Multiplier par 10 change la valeur de chaque chiffre.", `${methodeP10(10)} ${colonnesP10(n, 10)}`);
    },
  },

  {
    kind: "template",
    id: "cm2_multiplication_puissance_dix_tpl_16_prix_dix",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 1,
    theme: "neutral",
    hint: "10 objets : chaque chiffre du prix monte d’une colonne.",
    tags: ["cm2", "multiplication", "puissance_dix", "prix", "template"],
    generate: () => qAchat(10, (p) => p <= 9, true),
  },

  {
    kind: "template",
    id: "cm2_multiplication_puissance_dix_tpl_2_par_100",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 2,
    theme: "neutral",
    hint: "56 × 100, c’est 56 centaines.",
    tags: ["cm2", "multiplication", "puissance_dix", "par_100", "template"],
    generate: () => qP10(randomInt(11, 99), 100),
  },

  {
    kind: "template",
    id: "cm2_multiplication_puissance_dix_tpl_3_par_1000",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 2,
    theme: "neutral",
    hint: "7 × 1 000, c’est 7 milliers.",
    tags: ["cm2", "multiplication", "puissance_dix", "par_1000", "template"],
    generate: () => qP10(randomInt(2, 99), 1000),
  },

  {
    kind: "template",
    id: "cm2_multiplication_puissance_dix_tpl_4_qcm",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde si on multiplie par 10, 100 ou 1 000.",
    tags: ["cm2", "multiplication", "puissance_dix", "qcm", "template"],
    generate: () => {
      const n = randomInt(12, 98);
      const factor = randomChoice([10, 100, 1000]);
      const result = n * factor;

      const zeros = factor === 10 ? 1 : factor === 100 ? 2 : 3;
      const wrong1 = n * (factor === 10 ? 100 : 10);
      const wrong2 = Number(`${n}${"0".repeat(Math.max(0, zeros - 1))}`);
      const wrong3 = result + factor;
      const wrong4 = n * factor * 10;

      const text = randomChoice([
        `Quel est le résultat de ${n} × ${F(factor)} ?`,
        `Choisis le bon résultat : ${n} × ${F(factor)}`,
        `${n} × ${F(factor)} est égal à :`,
        `Lequel de ces nombres vaut ${n} × ${F(factor)} ?`,
      ]);

      return qcm(
        text,
        String(result),
        [String(wrong1), String(wrong2), String(wrong3), String(wrong4)],
        exp(
          "Multiplier par 10, 100 ou 1 000 change le rang des chiffres.",
          methodeP10(factor),
          colonnesP10(n, factor),
          `La bonne réponse est ${result}.`
        )
      );
    },
  },

  {
    kind: "template",
    id: "cm2_multiplication_puissance_dix_tpl_11_conversion",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 2,
    theme: "neutral",
    hint: "1 kg = 1 000 g, 1 km = 1 000 m, 1 L = 1 000 mL.",
    tags: ["cm2", "multiplication", "puissance_dix", "conversion", "template"],
    generate: () => qConversion((f) => f === 1000, randomInt(2, 45)),
  },

  {
    kind: "template",
    id: "cm2_multiplication_puissance_dix_tpl_12_groupes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 2,
    theme: "neutral",
    hint: "8 paquets de 100, c’est 8 centaines.",
    tags: ["cm2", "multiplication", "puissance_dix", "groupes_egaux", "template"],
    generate: () => qLotDix([100, 1000], 2, 9),
  },

  {
    kind: "template",
    id: "cm2_multiplication_puissance_dix_tpl_17_prix_cent",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 2,
    theme: "neutral",
    hint: "100 objets : chaque chiffre du prix monte de deux colonnes.",
    tags: ["cm2", "multiplication", "puissance_dix", "prix", "template"],
    generate: () => qAchat(100, (p) => p <= 9, true),
  },

  {
    kind: "template",
    id: "cm2_multiplication_puissance_dix_tpl_18_rythme",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 2,
    theme: "neutral",
    hint: "10 fois la même quantité : chaque chiffre monte d’une colonne.",
    tags: ["cm2", "multiplication", "puissance_dix", "repetition", "template"],
    generate: () => qRythme(() => true, (n) => n === 10),
  },

  {
    // Ex-« réunion » (toujours le même marché) : 10, 100 ou 1 000 contenants,
    // ou des contenants de 100 ou 1 000, dans des situations tirées au sort.
    kind: "template",
    id: "cm2_multiplication_puissance_dix_tpl_5_reunion",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 3,
    theme: "neutral",
    hint: "Chaque contenant a la même quantité : multiplie. 6 × 100, c’est 6 centaines.",
    tags: ["cm2", "multiplication", "puissance_dix", "groupes_egaux", "template"],
    generate: () => {
      const L = randomChoice(GRANDS.filter((l) => l.grandMax >= 100));
      const p = randomChoice(L.petits);
      const g = randomChoice([10, 100, 1000].filter((x) => x <= L.grandMax));
      const [n, k] = L.grand === "n" ? [g, p] : [p, g];
      return qLot(L, n, k);
    },
  },

  {
    kind: "template",
    id: "cm2_multiplication_puissance_dix_tpl_6_erreur",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 3,
    theme: "neutral",
    hint: "× 100 : chaque chiffre monte de deux colonnes ; × 1 000 : de trois.",
    tags: ["cm2", "multiplication", "puissance_dix", "erreur", "template"],
    generate: () => {
      const n = randomInt(12, 99);
      const factor = randomChoice([100, 1000]);
      const correct = n * factor;
      return qVraiFaux(n, factor, annonce(correct, [correct / 10, correct * 10]), "Multiplier par 100 ou 1 000 change la valeur de chaque chiffre.", `${methodeP10(factor)} ${colonnesP10(n, factor)}`);
    },
  },

  {
    kind: "template",
    id: "cm2_multiplication_puissance_dix_tpl_13_nombres_ronds",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 3,
    theme: "neutral",
    hint: "30 × 400 : 3 × 4 = 12, et dizaines × centaines donne des milliers : 12 milliers.",
    tags: ["cm2", "multiplication", "puissance_dix", "nombres_ronds", "template"],
    generate: () => qDizainesFoisDizaines(),
  },

  {
    kind: "template",
    id: "cm2_multiplication_puissance_dix_tpl_14_facteur",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 3,
    theme: "neutral",
    hint: "De combien de colonnes chaque chiffre est-il monté ?",
    tags: ["cm2", "multiplication", "puissance_dix", "facteur_manquant", "qcm", "template"],
    generate: () => qFacteurP10(randomInt(2, 99), randomChoice([100, 1000, 10000])),
  },

  {
    kind: "template",
    id: "cm2_multiplication_puissance_dix_tpl_15_prix_groupe",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_puissance_dix",
    difficulty: 3,
    theme: "neutral",
    hint: "10 ou 100 objets : multiplie le prix par 10 ou par 100.",
    tags: ["cm2", "multiplication", "puissance_dix", "prix", "template"],
    generate: () => qAchat(randomChoice([10, 100]), (p) => p <= 25, true),
  },

  // ============================================================
  // MULTIPLICATION_PROBLEME
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_multiplication_probleme_fixed_1_groupes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 2,
    theme: "neutral",
    text: "Il y a 6 boîtes avec 8 crayons dans chaque boîte. Combien y a-t-il de crayons au total ?",
    format: "short",
    expected: ["48"],
    comparator: "number_equal",
    hint: "Il y a le même nombre de crayons dans chaque boîte.",
    explanation: exp(
      "La multiplication permet de calculer rapidement des groupes égaux.",
      "On multiplie le nombre de boîtes par le nombre de crayons dans chaque boîte.",
      "6 × 8 = 48.",
      "Il y a 48 crayons au total."
    ),
    tags: ["cm2", "multiplication", "probleme", "groupes_egaux"],
  },

  {
    kind: "fixed",
    id: "cm2_multiplication_probleme_fixed_2_addition_repetee",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 2,
    theme: "neutral",
    text: "Quel calcul correspond à 9 + 9 + 9 + 9 ?",
    format: "qcm",
    choices: ["4 × 9", "9 × 9", "4 + 9", "9 - 4"],
    expected: ["4 × 9"],
    comparator: "mcq_exact",
    hint: "Le nombre 9 est répété 4 fois.",
    explanation: exp(
      "Une multiplication peut remplacer une addition répétée.",
      "On compte combien de fois le même nombre est ajouté.",
      "9 + 9 + 9 + 9 correspond à 4 fois 9, donc 4 × 9.",
      "Le calcul correspondant est 4 × 9."
    ),
    tags: ["cm2", "multiplication", "probleme", "addition_repetee", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_multiplication_probleme_fixed_3_reunion_marche",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 3,
    theme: "reunion",
    text: "Au marché de Saint-Pierre, un vendeur prépare 7 paniers avec 6 mangues dans chaque panier. Combien y a-t-il de mangues au total ?",
    format: "short",
    expected: ["42"],
    comparator: "number_equal",
    hint: "Chaque panier contient le même nombre de mangues.",
    explanation: exp(
      "La multiplication sert à calculer un total quand des groupes sont identiques.",
      "On multiplie le nombre de paniers par le nombre de mangues dans chaque panier.",
      "7 × 6 = 42.",
      "Il y a 42 mangues au total."
    ),
    tags: ["cm2", "multiplication", "probleme", "reunion", "marche"],
  },

  {
    kind: "fixed",
    id: "cm2_multiplication_probleme_fixed_4_dechets",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 3,
    theme: "reunion",
    text: "Pendant une sortie nature, 5 groupes ramassent chacun 12 déchets. Combien de déchets sont ramassés au total ?",
    format: "short",
    expected: ["60"],
    comparator: "number_equal",
    hint: "Chaque groupe ramasse 12 déchets.",
    explanation: exp(
      "La multiplication permet de calculer des groupes égaux.",
      "On multiplie le nombre de groupes par le nombre de déchets ramassés par groupe.",
      "5 × 12 = 60.",
      "Au total, 60 déchets sont ramassés."
    ),
    tags: ["cm2", "multiplication", "probleme", "reunion", "dechet", "ecologie"],
  },

  {
    kind: "fixed",
    id: "cm2_multiplication_probleme_fixed_5_pieces",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Dans un jeu vidéo, un coffre donne 25 pièces. Combien de pièces donnent 4 coffres ?",
    format: "short",
    expected: ["100"],
    comparator: "number_equal",
    hint: "Chaque coffre donne 25 pièces.",
    explanation: exp(
      "La multiplication permet de calculer une même quantité répétée plusieurs fois.",
      "On multiplie le nombre de coffres par le nombre de pièces par coffre.",
      "4 × 25 = 100.",
      "Les 4 coffres donnent 100 pièces."
    ),
    tags: ["cm2", "multiplication", "probleme", "jeu_video", "pieces"],
  },

  {
    kind: "fixed",
    id: "cm2_multiplication_probleme_fixed_6_choisir_operation",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Dans quel cas faut-il utiliser une multiplication ?",
    format: "qcm",
    choices: [
      "8 sacs avec 6 objets dans chaque sac",
      "8 objets auxquels on enlève 6 objets",
      "8 objets partagés entre 6 élèves",
      "8 objets et encore 6 objets",
    ],
    expected: ["8 sacs avec 6 objets dans chaque sac"],
    comparator: "mcq_exact",
    hint: "La multiplication sert souvent à calculer des groupes égaux.",
    explanation: exp(
      "Choisir l’opération dépend du sens du problème.",
      "On utilise une multiplication quand une même quantité est répétée plusieurs fois.",
      "8 sacs avec 6 objets dans chaque sac correspond à 8 × 6.",
      "C’est donc la situation qui utilise une multiplication."
    ),
    tags: ["cm2", "multiplication", "probleme", "choisir_operation", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_multiplication_probleme_fixed_7_piege_addition",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève lit : « 6 sachets contiennent chacun 8 bonbons ». Il calcule 6 + 8 = 14. A-t-il choisi la bonne opération ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le mot « chacun » indique des groupes égaux.",
    explanation: exp(
      "Dans un problème, il faut choisir l’opération qui correspond à la situation.",
      "Quand plusieurs groupes contiennent chacun la même quantité, on multiplie.",
      "6 sachets de 8 bonbons donnent 6 × 8 = 48, et non 6 + 8.",
      "L’élève n’a pas choisi la bonne opération."
    ),
    tags: ["cm2", "multiplication", "probleme", "erreur", "piege", "choisir_operation"],
  },

  {
    kind: "fixed",
    id: "cm2_multiplication_probleme_fixed_8_phrase_reponse",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Pourquoi faut-il écrire une phrase-réponse après un problème de multiplication ?",
    format: "open",
    expected: ["phrase", "réponse", "unité", "problème", "conclusion"],
    comparator: "contains_keyword",
    hint: "Le nombre seul ne dit pas toujours ce qu’il représente.",
    explanation: exp(
      "Une phrase-réponse relie le calcul au contexte du problème.",
      "On reprend les mots de la question et on ajoute l’unité si nécessaire.",
      "Par exemple, 6 × 8 = 48 doit devenir : il y a 48 crayons.",
      "La phrase-réponse permet de conclure clairement."
    ),
    tags: ["cm2", "multiplication", "probleme", "open", "redaction"],
  },

  {
    kind: "template",
    id: "cm2_multiplication_probleme_tpl_1_groupes_egaux",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 2,
    theme: "neutral",
    hint: "Même quantité dans chaque groupe : on multiplie.",
    tags: ["cm2", "multiplication", "probleme", "groupes_egaux", "template"],
    generate: () => {
      const { L, k } = tireLot(LOTS, [3, 4, 5, 6, 7, 8, 9]);
      return qLot(L, randomInt(3, 9), k);
    },
  },

  {
    kind: "template",
    id: "cm2_multiplication_probleme_tpl_7_prix",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 2,
    theme: "neutral",
    hint: "Prix d’un objet × nombre d’objets.",
    tags: ["cm2", "multiplication", "probleme", "prix", "template"],
    generate: () => qAchat(randomInt(2, 9), (p) => p <= 9),
  },

  {
    kind: "template",
    id: "cm2_multiplication_probleme_tpl_8_fois_plus",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 2,
    theme: "neutral",
    hint: "« 4 fois plus », c’est multiplier par 4.",
    tags: ["cm2", "multiplication", "probleme", "fois_plus", "template"],
    generate: () => qFoisPlus(randomInt(3, 9), randomInt(2, 5)),
  },

  {
    kind: "template",
    id: "cm2_multiplication_probleme_tpl_9_rythme",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 2,
    theme: "neutral",
    hint: "La même quantité chaque jour (ou chaque semaine) : on multiplie.",
    tags: ["cm2", "multiplication", "probleme", "repetition", "template"],
    generate: () => qRythme((k) => k <= 9, (n) => n <= 9),
  },

  {
    // Ex-« réunion marché » : les situations sont tirées au sort, avec des
    // groupes plus grands qu’à l’étoile 2.
    kind: "template",
    id: "cm2_multiplication_probleme_tpl_2_reunion_marche",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Chaque groupe contient le même nombre d’objets.",
    tags: ["cm2", "multiplication", "probleme", "groupes_egaux", "template"],
    generate: () => {
      const { L, k } = tireLot(LOTS, [10, 12, 15, 20, 24, 25, 30]);
      return qLot(L, randomInt(3, 9), k);
    },
  },

  {
    // Ex-« déchets » : le ramassage reste une situation parmi d’autres.
    kind: "template",
    id: "cm2_multiplication_probleme_tpl_3_dechets",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "La même quantité répétée plusieurs fois : on multiplie.",
    tags: ["cm2", "multiplication", "probleme", "repetition", "template"],
    generate: () => qRythme((k) => k >= 6, (n) => n >= 3),
  },

  {
    kind: "template",
    id: "cm2_multiplication_probleme_tpl_4_jeu_video",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Chaque fois rapporte la même chose : on multiplie.",
    tags: ["cm2", "multiplication", "probleme", "jeu_video", "points", "template"],
    generate: () => qRecompense(3, 12),
  },

  {
    kind: "template",
    id: "cm2_multiplication_probleme_tpl_10_fois_plus",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "« 3 fois plus », c’est multiplier par 3.",
    tags: ["cm2", "multiplication", "probleme", "fois_plus", "template"],
    generate: () => qFoisPlus(randomInt(11, 30), randomInt(2, 5)),
  },

  {
    kind: "template",
    id: "cm2_multiplication_probleme_tpl_11_quadrillage",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Lignes × colonnes.",
    tags: ["cm2", "multiplication", "probleme", "rectangle", "template"],
    generate: () => qQuadrillage(4, 12),
  },

  {
    kind: "template",
    id: "cm2_multiplication_probleme_tpl_5_choisir_operation",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche si on regroupe, enlève, partage ou répète.",
    tags: ["cm2", "multiplication", "probleme", "choisir_operation", "template"],
    generate: () => {
      const { L, k } = tireLot(LOTS, [4, 5, 6, 7, 8, 9, 12, 15]);
      let n = randomInt(3, 9);
      while (n === k) n = randomInt(3, 9);
      return qChoisirCalcul(L, n, k);
    },
  },

  {
    kind: "template",
    id: "cm2_multiplication_probleme_tpl_6_canvas_posee",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Tu peux poser la multiplication si le calcul est trop grand.",
    tags: ["cm2", "multiplication", "probleme", "canvas", "template"],
    generate: () => {
      const { L, n, k, g, p } = tireGrand(12, 250, (x) => x >= 3 && x <= 9);
      return qLot(L, n, k, "", posee(g, p, "Problème — multiplication", "On peut poser la multiplication."));
    },
  },

  {
    kind: "template",
    id: "cm2_multiplication_probleme_tpl_12_erreur_operation",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Le mot « chaque » indique souvent une multiplication.",
    tags: ["cm2", "multiplication", "probleme", "erreur", "choisir_operation", "template"],
    generate: () => {
      const { L, k } = tireLot(LOTS, [4, 5, 6, 7, 8, 9, 12]);
      return qErreurOperation(L, randomInt(3, 9), k);
    },
  },

  {
    kind: "template",
    id: "cm2_multiplication_probleme_tpl_13_prix_groupe",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Prix d’un objet × nombre d’objets.",
    tags: ["cm2", "multiplication", "probleme", "prix", "template"],
    generate: () => qAchat(randomInt(11, 30), (p) => p >= 3 && p <= 25, true),
  },

  {
    kind: "template",
    id: "cm2_multiplication_probleme_tpl_14_groupes_manquant",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "On connaît le total : cherche le facteur manquant dans une table.",
    tags: ["cm2", "multiplication", "probleme", "facteur_manquant", "template"],
    generate: () => {
      const { L, k } = tireLot(LOTS, [3, 4, 5, 6, 7, 8, 9]);
      return qLotManquant(L, randomInt(3, 9), k);
    },
  },

  // ============================================================
  // MULTIPLICATION_DEFI
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_multiplication_defi_fixed_1_tresor",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Défi trésor : un coffre contient 25 pièces. Il y a 8 coffres. Combien de pièces y a-t-il au total ?",
    format: "short",
    expected: ["200"],
    comparator: "number_equal",
    hint: "Calcule 25 × 8. Tu peux faire 25 × 4 puis doubler.",
    explanation: exp(
      "Un défi de multiplication peut demander une stratégie rapide.",
      "On repère des groupes égaux : 8 coffres de 25 pièces.",
      "25 × 8 = 200.",
      "Il y a 200 pièces au total."
    ),
    tags: ["cm2", "multiplication", "defi", "tresor", "pieces"],
  },

  {
    kind: "fixed",
    id: "cm2_multiplication_defi_fixed_2_margouillats",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Défi margouillats : on observe 6 murs. Sur chaque mur, il y a 7 margouillats. Combien observe-t-on de margouillats en tout ?",
    format: "short",
    expected: ["42"],
    comparator: "number_equal",
    hint: "Même nombre de margouillats sur chaque mur : on multiplie.",
    explanation: exp(
      "La multiplication permet de calculer des groupes égaux.",
      "On multiplie le nombre de murs par le nombre de margouillats sur chaque mur.",
      "6 × 7 = 42.",
      "On observe 42 margouillats en tout."
    ),
    tags: ["cm2", "multiplication", "defi", "reunion", "margouillat"],
  },

  {
    kind: "fixed",
    id: "cm2_multiplication_defi_fixed_3_erreur_operation",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève lit : « 9 équipes ont chacune 12 bouteilles d’eau ». Il calcule 9 + 12 = 21. A-t-il choisi la bonne opération ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le mot « chacune » indique des groupes égaux.",
    explanation: exp(
      "Dans un problème, il faut choisir l’opération adaptée.",
      "Le mot « chacune » indique que la même quantité est répétée plusieurs fois.",
      "Il faut calculer 9 × 12 = 108, et non 9 + 12.",
      "L’élève n’a pas choisi la bonne opération."
    ),
    tags: ["cm2", "multiplication", "defi", "erreur", "choisir_operation", "eau"],
  },

  {
    kind: "fixed",
    id: "cm2_multiplication_defi_fixed_4_deux_etapes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_defi",
    difficulty: 5,
    theme: "reunion",
    text: "Au marché, une famille achète 4 paniers de 12 mangues et 3 paniers de 8 letchis. Combien de fruits achète-t-elle en tout ?",
    format: "short",
    expected: ["72"],
    comparator: "number_equal",
    hint: "Calcule d’abord les mangues, puis les letchis, puis additionne.",
    explanation: exp(
      "Un problème à deux étapes demande plusieurs calculs.",
      "On calcule chaque groupe, puis on additionne les résultats.",
      "4 × 12 = 48 et 3 × 8 = 24. Puis 48 + 24 = 72.",
      "La famille achète 72 fruits en tout."
    ),
    tags: ["cm2", "multiplication", "defi", "reunion", "deux_etapes", "marche"],
  },

  {
    kind: "fixed",
    id: "cm2_multiplication_defi_fixed_5_canvas_posee",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Défi calcul posé : calcule 348 × 6.",
    format: "short",
    expected: ["2088"],
    comparator: "number_equal",
    hint: "Pose la multiplication et pense aux retenues.",
    explanation: exp(
      "Une multiplication posée aide à organiser un calcul difficile.",
      "On multiplie colonne par colonne en pensant aux retenues.",
      "348 × 6 = 2 088.",
      "Le résultat est 2 088."
    ),
    tags: ["cm2", "multiplication", "defi", "posee", "retenue", "canvas"],
    canvas: calculPoseCanvas({
      operation: "multiplication",
      title: "Défi calcul posé",
      numbers: ["348", "6"],
      result: "2088",
      questionLabel: "Pense aux retenues.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
  },

  {
    kind: "fixed",
    id: "cm2_multiplication_defi_fixed_6_estimation",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Avant de calculer 198 × 4, quel ordre de grandeur est le plus raisonnable ?",
    format: "qcm",
    choices: ["environ 800", "environ 80", "environ 8 000", "environ 200"],
    expected: ["environ 800"],
    comparator: "mcq_exact",
    hint: "198 est proche de 200.",
    explanation: exp(
      "Estimer un résultat permet de vérifier s’il est raisonnable.",
      "On remplace 198 par un nombre proche plus simple : 200.",
      "200 × 4 = 800.",
      "Un ordre de grandeur raisonnable est environ 800."
    ),
    tags: ["cm2", "multiplication", "defi", "estimation", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_multiplication_defi_fixed_7_reste_ecologie",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_defi",
    difficulty: 5,
    theme: "reunion",
    text: "Défi écologie : 7 classes ramassent chacune 18 déchets. Ensuite, 20 déchets sont retirés car ils ont déjà été comptés. Combien de déchets reste-t-il dans le total ?",
    format: "short",
    expected: ["106"],
    comparator: "number_equal",
    hint: "Calcule d’abord 7 × 18, puis enlève 20.",
    explanation: exp(
      "Un défi peut combiner multiplication et soustraction.",
      "On calcule d’abord le total des groupes égaux, puis on ajuste.",
      "7 × 18 = 126. Puis 126 - 20 = 106.",
      "Il reste 106 déchets dans le total."
    ),
    tags: ["cm2", "multiplication", "defi", "reunion", "ecologie", "deux_etapes"],
  },

  {
    kind: "fixed",
    id: "cm2_multiplication_defi_open_1_expliquer",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi la multiplication est utile dans la vie quotidienne.",
    format: "open",
    expected: ["groupes", "répéter", "calculer", "fois", "total"],
    comparator: "contains_keyword",
    hint: "Pense aux groupes égaux : paquets, prix, équipes, objets.",
    explanation: exp(
      "La multiplication sert à calculer plus vite des quantités répétées.",
      "On l’utilise quand on a plusieurs groupes identiques ou une même quantité plusieurs fois.",
      "Par exemple, 6 paquets de 8 objets se calculent avec 6 × 8.",
      "La multiplication est utile pour trouver rapidement un total."
    ),
    tags: ["cm2", "multiplication", "defi", "open", "sens"],
  },

  {
    kind: "template",
    id: "cm2_multiplication_defi_tpl_1_tresor",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Même nombre dans chaque groupe : on multiplie. × 25 ou × 50 se font de tête.",
    tags: ["cm2", "multiplication", "defi", "tresor", "groupes_egaux", "template"],
    generate: () => {
      const { L, k } = tireLot([...LOTS, COFFRE], [20, 25, 50]);
      return qLot(L, randomInt(3, 9), k, "Défi : ");
    },
  },

  {
    kind: "template",
    id: "cm2_multiplication_defi_tpl_2_margouillats",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Même nombre d’animaux dans chaque endroit : on multiplie.",
    tags: ["cm2", "multiplication", "defi", "nature", "template"],
    generate: () => {
      const L = randomChoice(NATURE);
      return qLot(L, randomInt(6, 20), randomInt(Math.min(3, L.kMax), L.kMax), "Défi nature : ");
    },
  },

  {
    kind: "template",
    id: "cm2_multiplication_defi_tpl_5_erreur_operation",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Le mot « chaque » indique souvent une multiplication.",
    tags: ["cm2", "multiplication", "defi", "erreur", "choisir_operation", "template"],
    generate: () => {
      const { L, k } = tireLot(LOTS, [8, 9, 12, 15, 20]);
      return qErreurOperation(L, randomInt(5, 9), k);
    },
  },

  {
    kind: "template",
    id: "cm2_multiplication_defi_tpl_8_fois_plus",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "« 6 fois plus », c’est multiplier par 6.",
    tags: ["cm2", "multiplication", "defi", "fois_plus", "template"],
    generate: () => qFoisPlus(randomInt(12, 50), randomInt(3, 9)),
  },

  {
    kind: "template",
    id: "cm2_multiplication_defi_tpl_9_prix_groupe",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Prix d’un objet × nombre d’objets.",
    tags: ["cm2", "multiplication", "defi", "prix", "template"],
    generate: () => qAchat(randomInt(11, 30), (p) => p >= 12, true),
  },

  {
    kind: "template",
    id: "cm2_multiplication_defi_tpl_3_deux_etapes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Deux multiplications, puis une addition.",
    tags: ["cm2", "multiplication", "defi", "deux_etapes", "template"],
    generate: () => qDeuxEtapes(),
  },

  {
    kind: "template",
    id: "cm2_multiplication_defi_tpl_4_canvas_posee",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Pose la multiplication et vérifie les retenues.",
    tags: ["cm2", "multiplication", "defi", "posee", "canvas", "template"],
    generate: () => {
      const a = randomInt(213, 989);
      const b = Math.random() < 0.6 ? randomInt(4, 9) : randomInt(12, 39);
      return qPosee(
        a,
        b,
        [
          (x, y) => `Défi calcul posé : calcule ${x} × ${y}.`,
          (x, y) => `Défi : pose et calcule ${x} × ${y}.`,
          (x, y) => `Défi : quel est le produit de ${x} par ${y} ? Pose l’opération.`,
          (x, y) => `Défi : ${x} × ${y} = … Pose-la pour trouver.`,
        ],
        ["Une multiplication posée permet de traiter un calcul complexe.", "On multiplie colonne par colonne et on pense aux retenues."],
        "Défi calcul posé",
        "Attention aux retenues."
      );
    },
  },

  {
    kind: "template",
    id: "cm2_multiplication_defi_tpl_6_ecologie_deux_etapes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Calcule d’abord le total, puis enlève ce qui est retiré.",
    tags: ["cm2", "multiplication", "defi", "deux_etapes", "template"],
    generate: () => qMultiplierPuisEnlever(),
  },

  {
    kind: "template",
    id: "cm2_multiplication_defi_tpl_7_estimation",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Arrondis le premier nombre à la centaine pour obtenir un ordre de grandeur.",
    tags: ["cm2", "multiplication", "defi", "estimation", "template"],
    generate: () => qEstimation(),
  },

  {
    kind: "template",
    id: "cm2_multiplication_defi_tpl_10_rendu_monnaie",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Calcule le prix total, puis ce qu’il reste du billet.",
    tags: ["cm2", "multiplication", "defi", "monnaie", "deux_etapes", "template"],
    generate: () => qRenduMonnaie(),
  },

  {
    kind: "template",
    id: "cm2_multiplication_defi_tpl_11_comparer_lots",
    niveau: "cm2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "multiplication_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Calcule le total de chaque lot avant de comparer.",
    tags: ["cm2", "multiplication", "defi", "comparaison", "qcm", "template"],
    generate: () => qComparerLots(),
  },
];
