// lib/tutor-v4/questionBank/cm1/maths/problemes.bank.ts
//
// Les PROBLÈMES du CM1 : six micros, sans vidéo (vocabulaire du cycle 3 :
// « chercher ce qu'on demande », « choisir l'opération », « phrase-réponse »,
// « vérifier que le résultat est cohérent », « ordre de grandeur »).
//
// ⭐ 14/11/2026 — GÉNÉRATEURS ET DESSINS. Avant : 8 à 14 squelettes par micro,
// 11 à 17 répétitions sur 20 ; une seule phrase par gabarit (« Une classe
// possède … livres »), des questions ouvertes (retirées par
// `applyMathsKeyboardFree`), des QCM « oui / non » à deux choix. Maintenant :
// chaque gabarit tire une SITUATION (boulangère, fermière, club de basket,
// cheffe de chantier, apicultrice, jeu vidéo, natation…) × une TOURNURE × des
// nombres, et la plupart posent leur figure :
//   - `schema_barre` (le modèle en barres) : le tout, les parts, « ? » à la place
//     de ce qu'on cherche ;
//   - `calcul_pose` : le calcul posé de l'élève qu'on vérifie ;
//   - `monnaie` : le billet avec lequel on paie.
// ⛔ Le dessin porte les DONNÉES, jamais la réponse.
// ⛔ `schema_barre` lit un nombre dans `value` (« 6 × 8 » y deviendrait 68) :
//    une expression va dans `label`, jamais dans `value`.
// ⛔ CM1 = zéro clavier : que des QCM (3 ou 4 choix). Les leurres sont de vraies
//    erreurs d'élève : la mauvaise opération (« de plus » → addition), l'étape
//    oubliée, la réponse intermédiaire prise pour la réponse finale, la
//    phrase-réponse sans unité, la retenue oubliée, le reste de la division
//    oublié.
// ⛔ Division : « ÷ ». Soustraction : « − ».
// ⛔ La Réunion ≈ 3 % des tirages (deux contextes sur vingt-quatre, tirés à part).

import type { DifficultyLevel, TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import type {
  CalculPoseCanvasData,
  MonnaieCanvasData,
  SchemaBarreCanvasData,
} from "@/lib/tutor-v4/types_canvas";
import { cap, entre, fr, melange, qcm, qcmN, un } from "./trous-outils";

type Gen = TutorGeneratedQuestionV4;
type Canvas = SchemaBarreCanvasData | CalculPoseCanvasData | MonnaieCanvasData;

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;
}

/* ───────────────────────── Les mots ───────────────────────── */

const VOY = /^[aeiouàâéèêëîïôûœh]/i;
/** « de baguettes », « d'œufs ». */
const de = (m: string) => (VOY.test(m) ? `d'${m}` : `de ${m}`);
/** « que Tom », « qu'Inès ». */
const que = (nom: string) => (/^[AEIOUÉ]/.test(nom) ? `qu'${nom}` : `que ${nom}`);
/** « vend-elle », « gagne-t-il », « fait-il imprimer ». */
function inv(verbe: string, il: string) {
  const [w, ...r] = verbe.split(" ");
  return [`${w}${/[ae]$/.test(w) ? "-t-" : "-"}${il}`, ...r].join(" ");
}
/** « au marché », « à la papeterie », « à l'épicerie ». */
const au = (lieu: string) => (lieu.startsWith("le ") ? `au ${lieu.slice(3)}` : `à ${lieu}`);
const uu = (u: string, avec: boolean) => (avec ? ` ${u}` : "");
const peut = (p: number) => Math.random() < p;

type Il = "il" | "elle";
type Qui = { s: string; il: Il };
const NOMS_F = ["Nina", "Zoé", "Lou", "Inès", "Jade", "Maya", "Lina", "Emma", "Léa", "Sarah", "Chloé", "Aya", "Rose", "Mila"];
const NOMS_M = ["Téo", "Ravi", "Malo", "Sacha", "Amir", "Tom", "Yanis", "Noé", "Lucas", "Karim", "Hugo", "Enzo", "Bilal", "Jules"];
function prenom(sauf?: string): Qui {
  const f = peut(0.5);
  const s = un((f ? NOMS_F : NOMS_M).filter((n) => n !== sauf));
  return { s, il: f ? "elle" : "il" };
}
const ELEVE = (): Qui => (peut(0.35) ? (peut(0.5) ? { s: "un élève", il: "il" } : { s: "une élève", il: "elle" }) : prenom());

/** La Réunion à part : environ 3 % des tirages, jamais par défaut. */
function tirer<T extends { reu?: boolean }>(l: readonly T[]): T {
  const r = l.filter((x) => x.reu);
  const n = l.filter((x) => !x.reu);
  return r.length && peut(0.03) ? un(r) : un(n);
}

/* ───────────────────────── Les situations ───────────────────────── */

/** Ce qu'on compte, ce qu'on ajoute, ce qu'on enlève. */
type Stock = {
  qui: () => Qui;
  obj: string;
  /** L'action comptée chaque jour : « vend », « vendu », « vendre ». */
  jour: string;
  pp: string;
  inf: string;
  /** Ce qui retire du stock, ce qui en ajoute (présent, après « en »). */
  moins: string;
  gagne: string;
  m: readonly [string, string];
  stock: boolean;
  /** Plafond réaliste à partir de ★2 (des kilomètres à vélo, des cartes…). */
  max?: number;
  reu?: boolean;
};
const metier = (s: string, il: Il) => (): Qui => ({ s, il });
const enfant = (): Qui => prenom();

const STOCKS: Stock[] = [
  { qui: metier("la boulangère", "elle"), obj: "baguettes", jour: "vend", pp: "vendu", inf: "vendre", moins: "vend", gagne: "cuit", m: ["le matin", "l'après-midi"], stock: true },
  { qui: metier("le libraire", "il"), obj: "livres", jour: "vend", pp: "vendu", inf: "vendre", moins: "vend", gagne: "reçoit", m: ["samedi", "dimanche"], stock: true },
  { qui: metier("la fermière", "elle"), obj: "œufs", jour: "ramasse", pp: "ramassé", inf: "ramasser", moins: "vend", gagne: "ramasse", m: ["lundi", "mardi"], stock: true },
  { qui: metier("le club de basket", "il"), obj: "billets", jour: "vend", pp: "vendu", inf: "vendre", moins: "vend", gagne: "fait imprimer", m: ["en septembre", "en octobre"], stock: true },
  { qui: enfant, obj: "cartes", jour: "gagne", pp: "gagné", inf: "gagner", moins: "donne", gagne: "gagne", m: ["lundi", "mardi"], stock: true, max: 400 },
  { qui: metier("le pharmacien", "il"), obj: "boîtes de pansements", jour: "vend", pp: "vendu", inf: "vendre", moins: "vend", gagne: "reçoit", m: ["lundi", "mardi"], stock: true },
  { qui: metier("la cheffe du restaurant", "elle"), obj: "repas", jour: "sert", pp: "servi", inf: "servir", moins: "sert", gagne: "prépare", m: ["à midi", "le soir"], stock: true },
  { qui: metier("le jardinier", "il"), obj: "plants de tomates", jour: "plante", pp: "planté", inf: "planter", moins: "donne", gagne: "achète", m: ["lundi", "mardi"], stock: true },
  { qui: metier("la bibliothécaire", "elle"), obj: "livres", jour: "prête", pp: "prêté", inf: "prêter", moins: "prête", gagne: "reçoit", m: ["mercredi", "samedi"], stock: true },
  { qui: metier("le facteur", "il"), obj: "lettres", jour: "distribue", pp: "distribué", inf: "distribuer", moins: "distribue", gagne: "reçoit", m: ["le matin", "l'après-midi"], stock: true },
  { qui: metier("le maraîcher", "il"), obj: "salades", jour: "vend", pp: "vendu", inf: "vendre", moins: "vend", gagne: "cueille", m: ["mardi", "vendredi"], stock: true },
  { qui: enfant, obj: "points", jour: "gagne", pp: "gagné", inf: "gagner", moins: "perd", gagne: "gagne", m: ["à la première partie", "à la deuxième partie"], stock: true },
  { qui: metier("la couturière", "elle"), obj: "boutons", jour: "coud", pp: "cousu", inf: "coudre", moins: "utilise", gagne: "achète", m: ["lundi", "mardi"], stock: true },
  { qui: metier("l'apicultrice", "elle"), obj: "pots de miel", jour: "remplit", pp: "rempli", inf: "remplir", moins: "vend", gagne: "remplit", m: ["en mai", "en juin"], stock: true },
  { qui: metier("le cinéma du quartier", "il"), obj: "tickets", jour: "vend", pp: "vendu", inf: "vendre", moins: "vend", gagne: "fait imprimer", m: ["samedi", "dimanche"], stock: true },
  { qui: metier("la fromagère", "elle"), obj: "fromages", jour: "fabrique", pp: "fabriqué", inf: "fabriquer", moins: "vend", gagne: "fabrique", m: ["en mars", "en avril"], stock: true },
  { qui: enfant, obj: "perles", jour: "enfile", pp: "enfilé", inf: "enfiler", moins: "donne", gagne: "achète", m: ["lundi", "mardi"], stock: true, max: 300 },
  { qui: metier("l'éleveuse", "elle"), obj: "litres de lait", jour: "trait", pp: "trait", inf: "traire", moins: "vend", gagne: "trait", m: ["le matin", "le soir"], stock: true },
  { qui: metier("l'informaticienne", "elle"), obj: "messages", jour: "envoie", pp: "envoyé", inf: "envoyer", moins: "supprime", gagne: "reçoit", m: ["lundi", "mardi"], stock: true },
  { qui: metier("la cycliste", "elle"), obj: "kilomètres", jour: "parcourt", pp: "parcouru", inf: "parcourir", moins: "", gagne: "", m: ["samedi", "dimanche"], stock: false, max: 120 },
  { qui: metier("le nageur", "il"), obj: "longueurs", jour: "nage", pp: "nagé", inf: "nager", moins: "", gagne: "", m: ["lundi", "mercredi"], stock: false, max: 80 },
  { qui: metier("le chauffeur du bus", "il"), obj: "voyageurs", jour: "transporte", pp: "transporté", inf: "transporter", moins: "", gagne: "", m: ["le matin", "l'après-midi"], stock: false },
  { qui: metier("le planteur", "il"), obj: "ananas", jour: "récolte", pp: "récolté", inf: "récolter", moins: "vend", gagne: "récolte", m: ["lundi", "mardi"], stock: true, reu: true },
  { qui: metier("la vendeuse de samoussas", "elle"), obj: "samoussas", jour: "vend", pp: "vendu", inf: "vendre", moins: "vend", gagne: "prépare", m: ["le matin", "l'après-midi"], stock: true, reu: true },
];

/** Des groupes égaux : « 6 bouquets de 8 roses ». */
type Grp = { qui: () => Qui; cont: string; contPl: string; obj: string; fait: string; ks: number[]; rangement: boolean; reu?: boolean };
const GROUPES: Grp[] = [
  { qui: metier("le fleuriste", "il"), cont: "bouquet", contPl: "bouquets", obj: "roses", fait: "compose", ks: [5, 6, 7, 8, 9, 10, 12], rangement: false },
  { qui: metier("la pâtissière", "elle"), cont: "plateau", contPl: "plateaux", obj: "éclairs", fait: "remplit", ks: [6, 8, 9, 10, 12], rangement: true },
  { qui: metier("l'entraîneur", "il"), cont: "filet", contPl: "filets", obj: "ballons", fait: "remplit", ks: [6, 7, 8, 9, 10], rangement: true },
  { qui: metier("la libraire", "elle"), cont: "carton", contPl: "cartons", obj: "livres", fait: "remplit", ks: [12, 15, 20, 24, 25], rangement: true },
  { qui: metier("le maraîcher", "il"), cont: "cagette", contPl: "cagettes", obj: "tomates", fait: "remplit", ks: [12, 15, 18, 20, 24], rangement: true },
  { qui: metier("l'apiculteur", "il"), cont: "carton", contPl: "cartons", obj: "pots de miel", fait: "prépare", ks: [6, 8, 10, 12], rangement: true },
  { qui: metier("le boulanger", "il"), cont: "sachet", contPl: "sachets", obj: "croissants", fait: "prépare", ks: [4, 5, 6, 8, 10], rangement: true },
  { qui: metier("l'infirmière", "elle"), cont: "boîte", contPl: "boîtes", obj: "pansements", fait: "prépare", ks: [10, 15, 20, 25], rangement: true },
  { qui: metier("le facteur", "il"), cont: "paquet", contPl: "paquets", obj: "lettres", fait: "prépare", ks: [12, 15, 20, 25, 30], rangement: true },
  { qui: metier("l'éleveur", "il"), cont: "boîte", contPl: "boîtes", obj: "œufs", fait: "remplit", ks: [6, 10, 12], rangement: true },
  { qui: metier("la maîtresse", "elle"), cont: "équipe", contPl: "équipes", obj: "élèves", fait: "forme", ks: [3, 4, 5, 6], rangement: false },
  { qui: metier("la cheffe de chantier", "elle"), cont: "palette", contPl: "palettes", obj: "briques", fait: "charge", ks: [20, 25, 30, 40, 50], rangement: true },
  { qui: metier("la poissonnière", "elle"), cont: "barquette", contPl: "barquettes", obj: "sardines", fait: "prépare", ks: [4, 5, 6, 8], rangement: true },
  { qui: metier("le pâtissier", "il"), cont: "boîte", contPl: "boîtes", obj: "macarons", fait: "remplit", ks: [6, 8, 9, 12], rangement: true },
  { qui: metier("la professeure de musique", "elle"), cont: "groupe", contPl: "groupes", obj: "musiciens", fait: "forme", ks: [3, 4, 5], rangement: false },
  { qui: metier("la laborantine", "elle"), cont: "boîte", contPl: "boîtes", obj: "tubes", fait: "remplit", ks: [6, 8, 10, 12], rangement: true },
  { qui: metier("le jardinier", "il"), cont: "bac", contPl: "bacs", obj: "plants de fraisiers", fait: "prépare", ks: [4, 5, 6, 8], rangement: true },
  { qui: metier("l'informaticien", "il"), cont: "carton", contPl: "cartons", obj: "claviers", fait: "remplit", ks: [4, 5, 6, 8], rangement: true },
  { qui: metier("la bibliothécaire", "elle"), cont: "pile", contPl: "piles", obj: "livres", fait: "forme", ks: [15, 20, 25, 30], rangement: true },
  { qui: metier("le planteur", "il"), cont: "caisse", contPl: "caisses", obj: "ananas", fait: "remplit", ks: [6, 8, 10, 12], rangement: true, reu: true },
];

/** Ce qu'un enfant collectionne. */
const COLLECTIONS = ["billes", "cartes", "timbres", "autocollants", "coquillages", "perles", "figurines", "images", "pin's", "porte-clés"];

/** « Le second en transporte 3 fois plus. » */
const MACHINES = [
  { a: "le premier camion", b: "le second", il: "il" as Il, v: "transporte", obj: "caisses" },
  { a: "la petite ruche", b: "la grande", il: "elle" as Il, v: "donne", obj: "pots de miel" },
  { a: "le petit train", b: "le grand", il: "il" as Il, v: "transporte", obj: "voyageurs" },
  { a: "la première imprimante", b: "la seconde", il: "elle" as Il, v: "imprime", obj: "pages" },
  { a: "le petit verger", b: "le grand", il: "il" as Il, v: "donne", obj: "kilos de pommes" },
  { a: "la première équipe", b: "la seconde", il: "elle" as Il, v: "marque", obj: "points" },
  { a: "la petite usine", b: "la grande", il: "elle" as Il, v: "fabrique", obj: "jouets" },
];

/** Ce qu'on achète. */
type Art = { un: string; le: string; nom: string; pl: string; f: boolean; p: [number, number] };
const ARTICLES: Art[] = [
  { un: "un cahier", le: "le cahier", nom: "cahier", pl: "cahiers", f: false, p: [2, 5] },
  { un: "un livre", le: "le livre", nom: "livre", pl: "livres", f: false, p: [6, 15] },
  { un: "un ballon", le: "le ballon", nom: "ballon", pl: "ballons", f: false, p: [8, 19] },
  { un: "un classeur", le: "le classeur", nom: "classeur", pl: "classeurs", f: false, p: [3, 7] },
  { un: "une place de cinéma", le: "la place", nom: "place", pl: "places de cinéma", f: true, p: [6, 10] },
  { un: "un jeu de cartes", le: "le jeu", nom: "jeu", pl: "jeux de cartes", f: false, p: [3, 8] },
  { un: "un t-shirt", le: "le t-shirt", nom: "t-shirt", pl: "t-shirts", f: false, p: [8, 15] },
  { un: "une plante verte", le: "la plante", nom: "plante", pl: "plantes vertes", f: true, p: [6, 12] },
  { un: "un pot de peinture", le: "le pot", nom: "pot", pl: "pots de peinture", f: false, p: [5, 12] },
  { un: "une boîte de feutres", le: "la boîte", nom: "boîte", pl: "boîtes de feutres", f: true, p: [4, 9] },
  { un: "un puzzle", le: "le puzzle", nom: "puzzle", pl: "puzzles", f: false, p: [7, 14] },
  { un: "une gourde", le: "la gourde", nom: "gourde", pl: "gourdes", f: true, p: [5, 11] },
  { un: "un paquet de graines", le: "le paquet", nom: "paquet", pl: "paquets de graines", f: false, p: [2, 5] },
  { un: "une raquette", le: "la raquette", nom: "raquette", pl: "raquettes", f: true, p: [9, 19] },
  { un: "un kilo de pommes", le: "le kilo", nom: "kilo", pl: "kilos de pommes", f: false, p: [2, 4] },
  { un: "une trousse", le: "la trousse", nom: "trousse", pl: "trousses", f: true, p: [4, 9] },
];
const deuxArticles = () => {
  const a = un(ARTICLES);
  return [a, un(ARTICLES.filter((x) => x.nom !== a.nom))] as const;
};
const LIEUX = ["le marché", "la papeterie", "le supermarché", "la boutique du coin", "le grand magasin", "l'épicerie", "la librairie", "le magasin de sport"];

/* ───────────────────────── Les nombres et les erreurs ───────────────────────── */

/** Un grand et un petit nombre, selon l'étoile. */
function paire(d: number, max?: number): [number, number] {
  if (max && d >= 2) return [entre(Math.ceil(max / 2), max), entre(8, Math.floor(max / 2) - 3)];
  const [ga, gb, pa, pb] =
    d <= 1 ? [35, 89, 11, 29] : d === 2 ? [120, 480, 25, 95] : d === 3 ? [210, 780, 105, 195] : [1200, 4800, 260, 980];
  return [entre(ga, gb), entre(pa, pb)];
}
const chiffres = (n: number) => String(n).split("").reverse().map(Number);
/** L'addition posée sans les retenues : 47 + 38 → 75. */
function sansRetenue(a: number, b: number) {
  const A = chiffres(a);
  const B = chiffres(b);
  return Number(Array.from({ length: Math.max(A.length, B.length) }, (_, i) => ((A[i] ?? 0) + (B[i] ?? 0)) % 10).reverse().join(""));
}
/** La soustraction « le petit chiffre ôté du grand » : 52 − 38 → 26. */
function ecartChiffres(a: number, b: number) {
  const A = chiffres(a);
  const B = chiffres(b);
  return Number(A.map((x, i) => Math.abs(x - (B[i] ?? 0))).reverse().join(""));
}
/** QCM de nombres avec l'unité ; jamais « 1 baguettes » ni deux fois la même valeur. */
function choixN(juste: number, faux: number[], u: string) {
  const ok = [...new Set(faux.filter((v) => Number.isInteger(v) && v >= 2 && v !== juste))];
  for (let k = 1; ok.length < 3 && k < 40; k++)
    for (const v of [juste + 10 * k, juste - k, juste + k])
      if (v >= 2 && v !== juste && !ok.includes(v) && ok.length < 3) ok.push(v);
  return qcmN(juste, ok, u);
}
const ec = (x: number, s: string, y: number) => `${fr(x)} ${s} ${fr(y)}`;

/* ───────────────────────── Les dessins ───────────────────────── */

type Part = SchemaBarreCanvasData["parts"][number];
const barre = (parts: Part[], total?: string, title?: string): SchemaBarreCanvasData => ({
  kind: "schema_barre",
  parts,
  ...(total ? { total } : {}),
  ...(title ? { title } : {}),
});
const egales = (n: number, part: Part): Part[] => Array.from({ length: n }, () => ({ ...part }));
const OPERATION = { "+": "addition", "−": "soustraction", "×": "multiplication", "÷": "division" } as const;
function pose(x: number, s: "+" | "−" | "×" | "÷", y: number, r?: number): CalculPoseCanvasData {
  if (s === "÷")
    return { kind: "calcul_pose", operation: "division", numbers: [String(x), String(y)], division: { dividende: String(x), diviseur: String(y), ...(r !== undefined ? { quotient: String(r) } : {}) }, display: { showResult: r !== undefined } };
  return { kind: "calcul_pose", operation: OPERATION[s], numbers: [String(x), String(y)], ...(r !== undefined ? { result: String(r) } : {}), display: { showResult: r !== undefined, showRetenues: false } };
}
/** Le billet ou les pièces d'une somme ronde. */
function argent(B: number): MonnaieCanvasData {
  const elements: { valeur: "50e" | "20e" | "10e" | "5e" | "2e" | "1e"; nombre?: number }[] = [];
  let r = B;
  for (const v of [50, 20, 10, 5, 2, 1] as const) {
    const n = Math.floor(r / v);
    if (n) elements.push({ valeur: `${v}e`, ...(n > 1 ? { nombre: n } : {}) });
    r -= n * v;
  }
  return { kind: "monnaie", elements };
}
const dessin = (c: Canvas | undefined, p = 0.75) => (c && peut(p) ? { canvas: c } : {});

/* ───────────────────────── Les problèmes à une étape ───────────────────────── */

type Signe = "+" | "−" | "×" | "÷";
type Pb = {
  enonce: string;
  question: string;
  rep: number;
  u: string;
  /** Le bon calcul : x signe y = rep. */
  x: number;
  s: Signe;
  y: number;
  calc: string;
  /** Les réponses des erreurs, et les calculs des erreurs (le premier = le piège du mot). */
  faux: number[];
  calcFaux: string[];
  piege: { x: number; s: "+" | "−" | "×"; y: number };
  phrase: (n: number, avecUnite?: boolean) => string;
  methode: string;
  canvas?: Canvas;
  qui: Qui;
};
const OP_NOM: Record<Signe, string> = { "+": "une addition", "−": "une soustraction", "×": "une multiplication", "÷": "une division" };

function pbTotal(d: number, nums?: [number, number]): Pb {
  const c = tirer(STOCKS);
  const qui = c.qui();
  const { s, il } = qui;
  const [g, p] = nums ?? paire(d, c.max);
  const [a, b] = peut(0.5) ? [g, p] : [p, g];
  const [m1, m2] = c.m;
  const base = {
    rep: a + b, u: c.obj, x: a, s: "+" as Signe, y: b, calc: ec(a, "+", b),
    faux: [g - p, sansRetenue(a, b), a + b + 10, g],
    calcFaux: [ec(g, "−", p), ec(a, "×", b), ec(g, "÷", p)],
    piege: { x: g, s: "−" as const, y: p },
    methode: "On réunit deux quantités : on les additionne.",
    qui,
  };
  if (c.stock && peut(0.4))
    return {
      ...base,
      enonce: un([
        `${cap(s)} a ${fr(a)} ${c.obj}. ${cap(il)} en ${c.gagne} ${fr(b)} de plus.`,
        `Au début, ${s} a ${fr(a)} ${c.obj}. Puis ${il} en ${c.gagne} ${fr(b)} autres.`,
        `${cap(s)} a déjà ${fr(a)} ${c.obj}. ${cap(m1)}, ${il} en ${c.gagne} encore ${fr(b)}.`,
      ]),
      question: un([`Combien ${de(c.obj)} ${s} a-t-${il} maintenant ?`, `Combien ${de(c.obj)} a-t-${il} maintenant ?`, `Combien ${de(c.obj)} cela fait-il en tout ?`]),
      phrase: (n, avec = true) => `${cap(s)} a maintenant ${fr(n)}${uu(c.obj, avec)}.`,
      canvas: barre([{ label: "au début", value: fr(a) }, { label: "en plus", value: fr(b) }], "?", cap(c.obj)),
    };
  return {
    ...base,
    enonce: un([
      `${cap(m1)}, ${s} ${c.jour} ${fr(a)} ${c.obj}. ${cap(m2)}, ${il} en ${c.jour} ${fr(b)}.`,
      `${cap(s)} ${c.jour} ${fr(a)} ${c.obj} ${m1} et ${fr(b)} ${m2}.`,
      `${cap(s)} note ce qu'${il} ${c.jour}. ${cap(m1)} : ${fr(a)} ${c.obj}. ${cap(m2)} : ${fr(b)} ${c.obj}.`,
      `${cap(m1)}, ${s} ${c.jour} ${fr(a)} ${c.obj}, et ${m2}, ${fr(b)}.`,
    ]),
    question: un([`Combien ${de(c.obj)} ${inv(c.jour, il)} en tout ?`, `Combien ${de(c.obj)} cela fait-il en tout ?`, `Quel est le nombre total ${de(c.obj)} ?`]),
    phrase: (n, avec = true) => `${cap(s)} a ${c.pp} ${fr(n)}${uu(c.obj, avec)} en tout.`,
    canvas: barre([{ label: cap(m1), value: fr(a) }, { label: cap(m2), value: fr(b) }], "?", cap(c.obj)),
  };
}

function pbReste(d: number): Pb {
  const c = tirer(STOCKS.filter((x) => x.stock));
  const qui = c.qui();
  const { s, il } = qui;
  const [a, b] = paire(d, c.max);
  return {
    enonce: un([
      `${cap(s)} a ${fr(a)} ${c.obj}. ${cap(il)} en ${c.moins} ${fr(b)}.`,
      `Au début, ${s} a ${fr(a)} ${c.obj}. ${cap(c.m[0])}, ${il} en ${c.moins} ${fr(b)}.`,
      `${cap(s)} commence avec ${fr(a)} ${c.obj}. ${cap(il)} en ${c.moins} ${fr(b)}.`,
    ]),
    question: un([`Combien ${de(c.obj)} reste-t-il ?`, `Combien ${de(c.obj)} lui reste-t-il ?`, `Combien ${de(c.obj)} ${s} a-t-${il} encore ?`, `Combien ${de(c.obj)} reste-t-il à la fin ?`]),
    rep: a - b, u: c.obj, x: a, s: "−", y: b, calc: ec(a, "−", b),
    faux: [a + b, ecartChiffres(a, b), a - b + 10, b],
    calcFaux: [ec(a, "+", b), ec(a, "×", b), ec(a, "÷", b)],
    piege: { x: a, s: "+", y: b },
    phrase: (n, avec = true) => `Il reste ${fr(n)}${uu(c.obj, avec)}.`,
    methode: "On enlève une quantité à ce qu'on avait : on soustrait.",
    canvas: barre([{ label: "en moins", value: fr(b) }, { label: "il reste", unknown: true }], fr(a), cap(c.obj)),
    qui,
  };
}

function pbEcart(d: number): Pb {
  const c = tirer(STOCKS);
  const qui = c.qui();
  const { s, il } = qui;
  const [g, p] = paire(d, c.max);
  const grandDAbord = peut(0.6);
  const [a, b] = grandDAbord ? [g, p] : [p, g];
  const [m1, m2] = c.m;
  const [mg, mp] = grandDAbord ? [m1, m2] : [m2, m1];
  const plus = peut(0.6);
  return {
    enonce: un([
      `${cap(m1)}, ${s} ${c.jour} ${fr(a)} ${c.obj}. ${cap(m2)}, ${il} en ${c.jour} ${fr(b)}.`,
      `${cap(s)} ${c.jour} ${fr(a)} ${c.obj} ${m1} et ${fr(b)} ${m2}.`,
      `${cap(s)} note ce qu'${il} ${c.jour}. ${cap(m1)} : ${fr(a)} ${c.obj}. ${cap(m2)} : ${fr(b)} ${c.obj}.`,
    ]),
    question: plus ? `Combien ${de(c.obj)} ${inv(c.jour, il)} de plus ${mg} ?` : `Combien ${de(c.obj)} ${inv(c.jour, il)} de moins ${mp} ?`,
    rep: g - p, u: c.obj, x: g, s: "−", y: p, calc: ec(g, "−", p),
    faux: [g + p, ecartChiffres(g, p), g, p],
    calcFaux: [ec(g, "+", p), ec(g, "×", p), ec(g, "÷", p)],
    piege: { x: g, s: "+", y: p },
    phrase: (n, avec = true) => (plus ? `${cap(s)} a ${c.pp} ${fr(n)}${uu(c.obj, avec)} de plus ${mg}.` : `${cap(s)} a ${c.pp} ${fr(n)}${uu(c.obj, avec)} de moins ${mp}.`),
    methode: "On compare deux quantités : l'écart se trouve par une soustraction, même si la question dit « de plus ».",
    canvas: barre([{ label: cap(mp), value: fr(p) }, { label: "écart", unknown: true }], fr(g), cap(mg)),
    qui,
  };
}

function pbComplement(d: number): Pb {
  const c = tirer(STOCKS);
  const qui = c.qui();
  const { s, il } = qui;
  const N = paire(d, c.max)[0];
  const a = entre(Math.ceil(N * 0.35), N - 6);
  return {
    enonce: un([
      `${cap(s)} veut ${c.inf} ${fr(N)} ${c.obj}. ${cap(il)} en a déjà ${c.pp} ${fr(a)}.`,
      `${cap(s)} s'est fixé un but : ${c.inf} ${fr(N)} ${c.obj}. Pour l'instant, ${il} en a ${c.pp} ${fr(a)}.`,
      `${cap(s)} a déjà ${c.pp} ${fr(a)} ${c.obj}. ${cap(il)} veut arriver à ${fr(N)}.`,
    ]),
    question: un([`Combien ${de(c.obj)} doit-${il} encore ${c.inf} ?`, `Combien ${de(c.obj)} lui manque-t-il ?`, `Combien ${de(c.obj)} reste-t-il à ${c.inf} ?`]),
    rep: N - a, u: c.obj, x: N, s: "−", y: a, calc: ec(N, "−", a),
    faux: [N + a, ecartChiffres(N, a), N - a + 10, a],
    calcFaux: [ec(N, "+", a), ec(N, "×", a), ec(N, "÷", a)],
    piege: { x: N, s: "+", y: a },
    phrase: (n, avec = true) => `${cap(s)} doit encore ${c.inf} ${fr(n)}${uu(c.obj, avec)}.`,
    methode: "On cherche ce qui manque pour arriver au but : on soustrait ce qui est fait.",
    canvas: barre([{ label: "déjà", value: fr(a) }, { label: "manque", unknown: true }], fr(N), cap(c.obj)),
    qui,
  };
}

function nk(d: number, c: Grp): [number, number] {
  let n: number;
  let k: number;
  do {
    n = d <= 2 ? entre(3, 8) : d === 3 ? entre(4, 9) : entre(6, 15);
    k = un(c.ks);
  } while (n === k);
  return [n, k];
}

function pbFois(d: number, nums?: [number, number]): Pb {
  const c = tirer(GROUPES);
  const qui = c.qui();
  const { s } = qui;
  const [n, k] = nums ?? nk(d, c);
  const P = n * k;
  return {
    enonce: un([
      `${cap(s)} ${c.fait} ${n} ${c.contPl} de ${k} ${c.obj}.`,
      `${cap(s)} ${c.fait} ${n} ${c.contPl}. Dans chaque ${c.cont}, il y a ${k} ${c.obj}.`,
      `Il y a ${n} ${c.contPl} de ${k} ${c.obj}.`,
      `${cap(s)} ${c.fait} ${n} ${c.contPl} : ${k} ${c.obj} par ${c.cont}.`,
    ]),
    question: un([`Combien ${de(c.obj)} y a-t-il en tout ?`, `Combien ${de(c.obj)} cela fait-il ?`, `Quel est le nombre total ${de(c.obj)} ?`]),
    rep: P, u: c.obj, x: n, s: "×", y: k, calc: ec(n, "×", k),
    faux: [n + k, (n - 1) * k, (n + 1) * k, P + 10],
    calcFaux: [ec(n, "+", k), ec(Math.max(n, k), "−", Math.min(n, k)), ec(Math.max(n, k), "÷", Math.min(n, k))],
    piege: { x: n, s: "+", y: k },
    phrase: (v, avec = true) => `Il y a ${fr(v)}${uu(c.obj, avec)} en tout.`,
    methode: "Des groupes égaux : le même nombre répété plusieurs fois, c'est une multiplication.",
    ...(n <= 8 ? { canvas: barre(egales(n, { label: "", value: fr(k) }), "?", cap(c.obj)) } : {}),
    qui,
  };
}

function pbPartage(d: number): Pb {
  const c = tirer(GROUPES);
  const qui = c.qui();
  const { s, il } = qui;
  const [n, k] = nk(d, c);
  const T = n * k;
  return {
    enonce: un([
      `${cap(s)} a ${fr(T)} ${c.obj}. ${cap(il)} les répartit dans ${n} ${c.contPl}, autant dans chaque ${c.cont}.`,
      `${cap(s)} répartit ${fr(T)} ${c.obj} dans ${n} ${c.contPl} identiques.`,
      `${cap(s)} partage ${fr(T)} ${c.obj} entre ${n} ${c.contPl}. Chaque ${c.cont} en reçoit autant.`,
    ]),
    question: un([`Combien ${de(c.obj)} y a-t-il dans chaque ${c.cont} ?`, `Combien ${de(c.obj)} met-${il} dans chaque ${c.cont} ?`, `Combien ${de(c.obj)} par ${c.cont} ?`]),
    rep: k, u: c.obj, x: T, s: "÷", y: n, calc: ec(T, "÷", n),
    faux: [T - n, T + n, n, k + 10],
    calcFaux: [ec(T, "−", n), ec(T, "×", n), ec(T, "+", n)],
    piege: { x: T, s: "−", y: n },
    phrase: (v, avec = true) => `Il y a ${fr(v)}${uu(c.obj, avec)} dans chaque ${c.cont}.`,
    methode: "On partage en parts égales et on cherche UNE part : c'est une division.",
    ...(n <= 8 ? { canvas: barre(egales(n, { label: "", unknown: true }), fr(T), cap(c.obj)) } : {}),
    qui,
  };
}

function pbGroupement(d: number): Pb {
  const c = tirer(GROUPES);
  const qui = c.qui();
  const { s, il } = qui;
  const [n, k] = nk(d, c);
  const T = n * k;
  // La phrase-réponse reprend le verbe de la question.
  const [question, verbe] = un([
    [`Combien ${de(c.contPl)} ${inv(c.fait, il)} ?`, c.fait],
    [`Combien ${de(c.contPl)} peut-${il} faire ?`, "peut faire"],
    [`Combien ${de(c.contPl)} obtient-${il} ?`, "obtient"],
  ] as const);
  return {
    enonce: un([
      `${cap(s)} a ${fr(T)} ${c.obj}. ${cap(il)} veut faire des ${c.contPl} de ${k} ${c.obj}.`,
      `${cap(s)} a ${fr(T)} ${c.obj}. ${cap(il)} en met ${k} dans chaque ${c.cont}.`,
      `${cap(s)} a ${fr(T)} ${c.obj}. Chaque ${c.cont} en contient ${k}.`,
    ]),
    question,
    rep: n, u: c.contPl, x: T, s: "÷", y: k, calc: ec(T, "÷", k),
    faux: [T - k, k, n + 10, T + k],
    calcFaux: [ec(T, "−", k), ec(T, "×", k), ec(T, "+", k)],
    piege: { x: T, s: "−", y: k },
    phrase: (v, avec = true) => `${cap(il)} ${verbe} ${fr(v)}${uu(c.contPl, avec)}.`,
    methode: "On cherche combien de groupes de même taille on peut faire : c'est une division.",
    canvas: barre([{ label: c.cont, value: fr(k) }, { label: c.cont, value: fr(k) }, { label: "…", unknown: true }], fr(T), cap(c.obj)),
    qui,
  };
}

function pbFoisPlus(d: number): Pb {
  const n = entre(2, d >= 4 ? 9 : 6);
  const k = d >= 4 ? entre(25, 150) : entre(12, 45);
  const P = n * k;
  const commun = {
    rep: P, x: k, s: "×" as Signe, y: n, calc: ec(k, "×", n),
    faux: [k + n, (n - 1) * k, P + k, n],
    calcFaux: [ec(k, "+", n), ec(k, "−", n), ec(k, "÷", n)],
    piege: { x: k, s: "+" as const, y: n },
    methode: "« fois plus » : on multiplie.",
  };
  if (peut(0.35)) {
    const ma = un(MACHINES);
    return {
      ...commun,
      u: ma.obj,
      enonce: `${cap(ma.a)} ${ma.v} ${fr(k)} ${ma.obj}. ${cap(ma.b)} en ${ma.v} ${n} fois plus.`,
      question: `Combien ${de(ma.obj)} ${ma.b} ${inv(ma.v, ma.il)} ?`,
      phrase: (v, avec = true) => `${cap(ma.b)} ${ma.v} ${fr(v)}${uu(ma.obj, avec)}.`,
      ...(n <= 8 ? { canvas: barre(egales(n, { label: "", value: fr(k) }), "?", cap(ma.b)) } : {}),
      qui: { s: ma.b, il: ma.il },
    };
  }
  const A = prenom();
  const B = prenom(A.s);
  const obj = un(COLLECTIONS);
  return {
    ...commun,
    u: obj,
    enonce: un([
      `${A.s} a ${fr(k)} ${obj}. ${B.s} en a ${n} fois plus.`,
      `${B.s} a ${n} fois plus ${de(obj)} ${que(A.s)}. ${A.s} en a ${fr(k)}.`,
      `${A.s} possède ${fr(k)} ${obj}, et ${B.s} en possède ${n} fois plus.`,
    ]),
    question: un([`Combien ${de(obj)} ${B.s} a-t-${B.il} ?`, `Combien ${de(obj)} possède ${B.s} ?`]),
    phrase: (v, avec = true) => `${B.s} a ${fr(v)}${uu(obj, avec)}.`,
    ...(n <= 8 ? { canvas: barre(egales(n, { label: "", value: fr(k) }), "?", B.s) } : {}),
    qui: B,
  };
}

function pbPlusQue(d: number): Pb {
  const A = prenom();
  const B = prenom(A.s);
  const obj = un(COLLECTIONS);
  const a = d >= 4 ? entre(120, 480) : entre(35, 95);
  const e = d >= 4 ? entre(25, 95) : entre(8, 29);
  const plus = peut(0.5);
  const rep = plus ? a - e : a + e;
  return {
    enonce: plus
      ? un([`${A.s} a ${fr(a)} ${obj}. ${cap(A.il)} en a ${fr(e)} de plus ${que(B.s)}.`, `${A.s} a ${fr(a)} ${obj}, soit ${fr(e)} de plus ${que(B.s)}.`])
      : un([`${A.s} a ${fr(a)} ${obj}. ${cap(A.il)} en a ${fr(e)} de moins ${que(B.s)}.`, `${A.s} a ${fr(a)} ${obj}, soit ${fr(e)} de moins ${que(B.s)}.`]),
    question: un([`Combien ${de(obj)} ${B.s} a-t-${B.il} ?`, `Combien ${de(obj)} possède ${B.s} ?`]),
    rep, u: obj, x: a, s: plus ? "−" : "+", y: e, calc: plus ? ec(a, "−", e) : ec(a, "+", e),
    faux: plus ? [a + e, ecartChiffres(a, e), a] : [a - e, sansRetenue(a, e), a],
    calcFaux: plus ? [ec(a, "+", e), ec(a, "×", e), ec(a, "÷", e)] : [ec(a, "−", e), ec(a, "×", e), ec(a, "÷", e)],
    piege: plus ? { x: a, s: "+", y: e } : { x: a, s: "−", y: e },
    phrase: (v, avec = true) => `${B.s} a ${fr(v)}${uu(obj, avec)}.`,
    methode: plus
      ? `${A.s} en a plus que ${B.s} : ${B.s} en a donc MOINS. On soustrait, même si on lit « de plus ».`
      : `${A.s} en a moins que ${B.s} : ${B.s} en a donc PLUS. On additionne, même si on lit « de moins ».`,
    canvas: plus
      ? barre([{ label: B.s, unknown: true }, { label: "de plus", value: fr(e) }], fr(a), A.s)
      : barre([{ label: A.s, value: fr(a) }, { label: "de plus", value: fr(e) }], "?", B.s),
    qui: B,
  };
}

type TypeUn = "total" | "reste" | "ecart" | "complement" | "fois" | "partage" | "groupement" | "foisPlus" | "plusQue";
const FAB: Record<TypeUn, (d: number) => Pb> = {
  total: pbTotal, reste: pbReste, ecart: pbEcart, complement: pbComplement, fois: pbFois,
  partage: pbPartage, groupement: pbGroupement, foisPlus: pbFoisPlus, plusQue: pbPlusQue,
};
const pb = (types: TypeUn[], d: number) => FAB[un(types)](d);

/* ───────────────────────── Les problèmes à deux étapes ───────────────────────── */

type Pb2 = {
  enonce: string;
  question: string;
  rep: number;
  u: string;
  inter: number;
  etapes: string;
  premier: string;
  premierFaux: string[];
  /** Ce que l'élève a oublié quand il s'arrête à la réponse intermédiaire. */
  oubli: string;
  faux: number[];
  phrase: (n: number, avecUnite?: boolean) => string;
  canvas?: Canvas;
};

function e1GainPerte(d: number): Pb2 {
  const c = tirer(STOCKS.filter((x) => x.stock));
  const { s, il } = c.qui();
  const a = d >= 4 ? entre(450, 1800) : entre(120, 450);
  const b = d >= 4 ? entre(120, 600) : entre(35, 180);
  let cc = entre(Math.ceil((a + b) * 0.25), a + b - 20);
  if (cc === b) cc += 1;
  const [m1, m2] = c.m;
  const inter = a + b;
  return {
    enonce: un([
      `${cap(s)} a ${fr(a)} ${c.obj}. ${cap(m1)}, ${il} en ${c.gagne} ${fr(b)}. ${cap(m2)}, ${il} en ${c.moins} ${fr(cc)}.`,
      `Au début, ${s} a ${fr(a)} ${c.obj}. Puis ${il} en ${c.gagne} ${fr(b)}, et ${il} en ${c.moins} ${fr(cc)}.`,
    ]),
    question: un([`Combien ${de(c.obj)} ${s} a-t-${il} à la fin ?`, `Combien ${de(c.obj)} reste-t-il à la fin ?`]),
    rep: inter - cc, u: c.obj, inter,
    etapes: `${ec(a, "+", b)} = ${fr(inter)}, puis ${ec(inter, "−", cc)} = ${fr(inter - cc)}.`,
    premier: ec(a, "+", b),
    premierFaux: [ec(a, "×", b), ec(a, "+", cc), b > cc ? ec(b, "−", cc) : ec(cc, "−", b)],
    oubli: `il faut encore enlever les ${fr(cc)} ${c.obj}`,
    faux: [inter, inter + cc, a - cc, a - b - cc],
    phrase: (n, avec = true) => `À la fin, ${s} a ${fr(n)}${uu(c.obj, avec)}.`,
  };
}

function e2DejaPlusGroupes(d: number): Pb2 {
  const c = tirer(GROUPES);
  const { s, il } = c.qui();
  const a = d >= 4 ? entre(100, 400) : entre(15, 95);
  const [n, k] = nk(d >= 4 ? 3 : 2, c);
  const inter = n * k;
  return {
    enonce: un([
      `${cap(s)} a déjà ${fr(a)} ${c.obj}. ${cap(il)} reçoit encore ${n} ${c.contPl} de ${k} ${c.obj}.`,
      `${cap(s)} a ${fr(a)} ${c.obj}. On lui livre ${n} ${c.contPl} de ${k} ${c.obj}.`,
    ]),
    question: un([`Combien ${de(c.obj)} a-t-${il} maintenant ?`, `Combien ${de(c.obj)} cela fait-il en tout ?`]),
    rep: a + inter, u: c.obj, inter,
    etapes: `${ec(n, "×", k)} = ${fr(inter)}, puis ${ec(a, "+", inter)} = ${fr(a + inter)}.`,
    premier: ec(n, "×", k),
    premierFaux: [ec(a, "+", n), ec(a, "×", n), ec(a, "+", k)],
    oubli: `il faut encore ajouter les ${fr(a)} ${c.obj} du début`,
    faux: [inter, a + n + k, (a + n) * k, a + k],
    phrase: (v, avec = true) => `${cap(s)} a maintenant ${fr(v)}${uu(c.obj, avec)}.`,
    canvas: barre([{ label: "déjà", value: fr(a) }, { label: `${n} × ${k}` }], "?", cap(c.obj)),
  };
}

function e3GroupesMoins(d: number): Pb2 {
  const c = tirer(GROUPES.filter((g) => g.rangement));
  const { s, il } = c.qui();
  const [n, k] = nk(d >= 4 ? 3 : 2, c);
  const P = n * k;
  const cc = entre(Math.max(2, Math.ceil(P * 0.15)), Math.max(3, Math.floor(P * 0.6)));
  return {
    enonce: un([
      `${cap(s)} ${c.fait} ${n} ${c.contPl} de ${k} ${c.obj}. ${cap(il)} en donne ${fr(cc)}.`,
      `${cap(s)} ${c.fait} ${n} ${c.contPl} de ${k} ${c.obj}. Ensuite, ${il} en retire ${fr(cc)}.`,
    ]),
    question: un([`Combien ${de(c.obj)} reste-t-il ?`, `Combien ${de(c.obj)} lui reste-t-il ?`]),
    rep: P - cc, u: c.obj, inter: P,
    etapes: `${ec(n, "×", k)} = ${fr(P)}, puis ${ec(P, "−", cc)} = ${fr(P - cc)}.`,
    premier: ec(n, "×", k),
    premierFaux: [ec(n, "+", k), ec(k, "+", cc), ec(n, "×", cc)],
    oubli: `il faut encore enlever les ${fr(cc)} ${c.obj}`,
    faux: [P, P + cc, n + k - cc, P - k],
    phrase: (v, avec = true) => `Il reste ${fr(v)}${uu(c.obj, avec)}.`,
    canvas: barre([{ label: "en moins", value: fr(cc) }, { label: "il reste", unknown: true }], `${n} × ${k}`, cap(c.obj)),
  };
}

function e4Achats(d: number): Pb2 {
  const { s, il } = prenom();
  const [A, B] = deuxArticles();
  // Trois nombres différents : sinon « 4 × 4 » et « 4 + 4 » se confondent avec les autres calculs.
  let n: number;
  let p: number;
  let q: number;
  do {
    n = entre(2, d >= 4 ? 9 : 6);
    p = entre(...A.p);
    q = entre(...B.p);
  } while (n === p || n === q || p === q);
  const inter = n * p;
  return {
    enonce: un([
      `${s} achète ${n} ${A.pl} à ${p} € ${A.le} et ${B.un} à ${q} €.`,
      `Au magasin, ${s} prend ${n} ${A.pl} à ${p} € ${A.le}, puis ${B.un} à ${q} €.`,
    ]),
    question: un([`Combien paie-t-${il} en tout ?`, `Quel est le prix total ?`, `Combien d'argent dépense-t-${il} ?`]),
    rep: inter + q, u: "€", inter,
    etapes: `${ec(n, "×", p)} = ${inter}, puis ${ec(inter, "+", q)} = ${inter + q}.`,
    premier: ec(n, "×", p),
    premierFaux: [ec(n, "+", p), ec(p, "+", q), ec(n, "×", q)],
    oubli: `il faut encore ajouter les ${q} € de l'autre achat`,
    faux: [inter, n + p + q, (p + q) * n, p + q],
    phrase: (v, avec = true) => `${s} paie ${fr(v)}${uu("€", avec)} en tout.`,
    canvas: barre([{ label: `${n} × ${p} €` }, { label: B.nom, value: `${q}` }], "?", "Les achats"),
  };
}

function e5Rendu(d: number): Pb2 {
  const { s, il } = prenom();
  const A = un(ARTICLES);
  let n: number;
  let p: number;
  do {
    n = entre(2, d >= 4 ? 6 : 4);
    p = entre(...A.p);
  } while (n * p >= 50);
  const B = [10, 20, 50].find((b) => b > n * p + 1) ?? 50;
  const inter = n * p;
  return {
    enonce: un([
      `${s} achète ${n} ${A.pl} à ${p} € ${A.le}. ${cap(il)} paie avec un billet de ${B} €.`,
      `${s} prend ${n} ${A.pl}. ${cap(A.le)} coûte ${p} €. ${cap(il)} donne un billet de ${B} €.`,
    ]),
    question: un([`Combien d'argent lui rend-on ?`, `Quelle somme lui rend-on ?`, `Combien la caissière lui rend-elle ?`]),
    rep: B - inter, u: "€", inter,
    etapes: `${ec(n, "×", p)} = ${inter}, puis ${ec(B, "−", inter)} = ${B - inter}.`,
    premier: ec(n, "×", p),
    premierFaux: [ec(B, "−", n), ec(n, "+", p), ec(B, "÷", n)],
    oubli: `il faut encore enlever ce prix des ${B} €`,
    faux: [inter, B - p, B - n - p, B - inter + p],
    phrase: (v, avec = true) => `On lui rend ${fr(v)}${uu("€", avec)}.`,
    canvas: argent(B),
  };
}

function e6RecuPartage(d: number): Pb2 {
  const c = tirer(GROUPES);
  const { s, il } = c.qui();
  const n = entre(3, d >= 4 ? 8 : 6);
  const a = n * entre(4, d >= 4 ? 40 : 15);
  let b: number;
  do b = n * entre(3, d >= 4 ? 30 : 12); while (b === a);
  const inter = a + b;
  return {
    enonce: un([
      `${cap(s)} a ${fr(a)} ${c.obj}. ${cap(il)} en reçoit ${fr(b)} de plus. ${cap(il)} répartit tout dans ${n} ${c.contPl}, autant dans chaque ${c.cont}.`,
      `${cap(s)} a ${fr(a)} ${c.obj}, puis on lui en apporte ${fr(b)}. ${cap(il)} partage le tout entre ${n} ${c.contPl} identiques.`,
    ]),
    question: un([`Combien ${de(c.obj)} y a-t-il dans chaque ${c.cont} ?`, `Combien ${de(c.obj)} met-${il} dans chaque ${c.cont} ?`]),
    rep: inter / n, u: c.obj, inter,
    etapes: `${ec(a, "+", b)} = ${fr(inter)}, puis ${ec(inter, "÷", n)} = ${fr(inter / n)}.`,
    premier: ec(a, "+", b),
    premierFaux: [ec(a, "×", b), ec(n, "×", b), ec(a, "+", n)],
    oubli: `il faut encore partager en ${n} ${c.contPl}`,
    faux: [inter, a / n + b, b / n, inter - n],
    phrase: (v, avec = true) => `Il y a ${fr(v)}${uu(c.obj, avec)} dans chaque ${c.cont}.`,
    canvas: barre([{ label: "au début", value: fr(a) }, { label: "reçus", value: fr(b) }], "?", cap(c.obj)),
  };
}

function e7DeuxGroupes(d: number): Pb2 {
  const c = tirer(GROUPES);
  const { s } = c.qui();
  const [n, k] = nk(d >= 4 ? 3 : 2, c);
  let m: number;
  let j: number;
  do {
    m = entre(2, 7);
    j = un(c.ks.length > 1 ? c.ks : [k + 2]);
  } while (j === k || m === n);
  const inter = n * k;
  return {
    enonce: un([
      `${cap(s)} ${c.fait} ${n} ${c.contPl} de ${k} ${c.obj}, puis ${m} ${c.contPl} de ${j} ${c.obj}.`,
      `Il y a ${n} ${c.contPl} de ${k} ${c.obj} et ${m} ${c.contPl} de ${j} ${c.obj}.`,
    ]),
    question: un([`Combien ${de(c.obj)} y a-t-il en tout ?`, `Combien ${de(c.obj)} cela fait-il en tout ?`]),
    rep: inter + m * j, u: c.obj, inter,
    etapes: `${ec(n, "×", k)} = ${fr(inter)} et ${ec(m, "×", j)} = ${fr(m * j)}, puis ${ec(inter, "+", m * j)} = ${fr(inter + m * j)}.`,
    premier: ec(n, "×", k),
    premierFaux: [ec(n, "+", k), ec(n, "+", m), ec(k, "+", j)],
    oubli: `il faut encore ajouter les ${m} ${c.contPl} de ${j}`,
    faux: [inter, (n + m) * k, inter + m, n + k + m + j],
    phrase: (v, avec = true) => `Il y a ${fr(v)}${uu(c.obj, avec)} en tout.`,
    canvas: barre([{ label: `${n} × ${k}` }, { label: `${m} × ${j}` }], "?", cap(c.obj)),
  };
}

function e8ObjectifDeuxJours(d: number): Pb2 {
  const c = tirer(STOCKS);
  const { s, il } = c.qui();
  const N = c.max ? entre(Math.ceil(c.max * 0.7), c.max) : d >= 4 ? entre(1500, 4000) : entre(300, 900);
  const a = entre(Math.ceil(N * 0.2), Math.floor(N * 0.4));
  const b = entre(Math.ceil(N * 0.15), Math.floor(N * 0.35));
  const [m1, m2] = c.m;
  const inter = a + b;
  return {
    enonce: un([
      `${cap(s)} veut ${c.inf} ${fr(N)} ${c.obj}. ${cap(m1)}, ${il} en ${c.jour} ${fr(a)}. ${cap(m2)}, ${il} en ${c.jour} ${fr(b)}.`,
      `Objectif : ${fr(N)} ${c.obj}. ${cap(s)} en ${c.jour} ${fr(a)} ${m1} et ${fr(b)} ${m2}.`,
    ]),
    question: un([`Combien ${de(c.obj)} doit-${il} encore ${c.inf} ?`, `Combien ${de(c.obj)} lui manque-t-il ?`]),
    rep: N - inter, u: c.obj, inter,
    etapes: `${ec(a, "+", b)} = ${fr(inter)}, puis ${ec(N, "−", inter)} = ${fr(N - inter)}.`,
    premier: ec(a, "+", b),
    premierFaux: [ec(N, "+", a), ec(a, "×", b), ec(N, "+", b)],
    oubli: `il faut encore calculer ce qui manque pour arriver à ${fr(N)}`,
    faux: [inter, N - a, N - b, N - a + b],
    phrase: (v, avec = true) => `${cap(s)} doit encore ${c.inf} ${fr(v)}${uu(c.obj, avec)}.`,
    canvas: barre([{ label: cap(m1), value: fr(a) }, { label: cap(m2), value: fr(b) }, { label: "manque", unknown: true }], fr(N), cap(c.obj)),
  };
}

const ETAPES_3 = [e1GainPerte, e2DejaPlusGroupes, e3GroupesMoins, e4Achats];
const ETAPES_4 = [e5Rendu, e6RecuPartage, e7DeuxGroupes, e8ObjectifDeuxJours];

/* ───────────────────────── Les fabricants ───────────────────────── */

const atelier =
  (micro: string) =>
  (suffixe: string, difficulty: DifficultyLevel, hint: string, generate: () => Gen): TutorBankItemV4 => ({
    kind: "template",
    id: `cm1_probleme_${micro}_tpl_${suffixe}`,
    niveau: "cm1",
    matiere: "maths",
    notionId: "probleme",
    microId: `probleme_${micro}`,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["cm1", "probleme", micro, "template"],
    generate,
  });

type Fixe = Omit<Extract<TutorBankItemV4, { kind: "fixed" }>, "kind" | "niveau" | "matiere" | "notionId" | "theme">;
const fixe = (f: Fixe): TutorBankItemV4 => ({ kind: "fixed", niveau: "cm1", matiere: "maths", notionId: "probleme", theme: "neutral", ...f });

const DEF_UN = "Un problème à une étape se résout avec un seul calcul.";
const DEF_DEUX = "Un problème à plusieurs étapes demande plusieurs calculs, dans le bon ordre.";

/* =========================================================
   PROBLEME_CHOISIR_OPERATION
========================================================= */
const CH = atelier("choisir_operation");
const Q_CALC = ["Quel calcul permet de répondre ?", "Quel calcul faut-il faire ?", "Choisis le bon calcul.", "Quel calcul écris-tu pour trouver la réponse ?", "Quel calcul donne la réponse ?"];
const Q_OP = ["Quelle opération faut-il faire ?", "Quelle opération choisis-tu ?", "Pour répondre, quelle opération faut-il ?"];

function choisirCalcul(p: Pb): Gen {
  return {
    text: `${p.enonce} ${p.question} ${un(Q_CALC)}`,
    ...qcm(p.calc, p.calcFaux),
    explanation: exp("Pour choisir l'opération, on se demande d'abord ce que l'on cherche.", p.methode, `${p.calc} = ${fr(p.rep)}.`, `Le bon calcul est ${p.calc}.`),
    ...dessin(p.canvas),
  };
}
function choisirOperation(p: Pb): Gen {
  return {
    text: `${p.enonce} ${p.question} ${un(Q_OP)}`,
    ...qcm(OP_NOM[p.s], Object.values(OP_NOM)),
    explanation: exp("Pour choisir l'opération, on se demande d'abord ce que l'on cherche.", p.methode, `${p.calc} = ${fr(p.rep)}.`, `Il faut faire ${OP_NOM[p.s]}.`),
    ...dessin(p.canvas, 0.6),
  };
}

const choisirItems: TutorBankItemV4[] = [
  fixe({
    id: "cm1_probleme_choisir_operation_fixed_001_total",
    microId: "probleme_choisir_operation",
    difficulty: 1,
    text: "Dans un problème, on cherche le total de 45 livres et 32 livres. Quelle opération faut-il choisir ?",
    format: "qcm",
    choices: ["45 + 32", "45 − 32", "45 × 32", "45 ÷ 32"],
    expected: ["45 + 32"],
    comparator: "mcq_exact",
    hint: "Quand on réunit deux quantités, on additionne.",
    explanation: exp("Un problème de total demande de réunir des quantités.", "On ajoute les 45 livres et les 32 livres.", "45 + 32 = 77.", "Il faut choisir l'addition."),
    tags: ["cm1", "probleme", "choisir_operation", "fixed"],
  }),
  fixe({
    id: "cm1_probleme_choisir_operation_fixed_002_chacun",
    microId: "probleme_choisir_operation",
    difficulty: 2,
    text: "Dans un problème, on lit : « 6 sachets contiennent chacun 8 billes ». Quelle opération faut-il choisir pour trouver le nombre de billes ?",
    format: "qcm",
    choices: ["6 × 8", "6 + 8", "8 − 6", "8 ÷ 6"],
    expected: ["6 × 8"],
    comparator: "mcq_exact",
    hint: "Le mot « chacun » annonce des groupes égaux.",
    explanation: exp("Des groupes égaux se comptent avec une multiplication.", "6 sachets de 8 billes : 8 répété 6 fois.", "6 × 8 = 48.", "Il faut choisir la multiplication."),
    tags: ["cm1", "probleme", "choisir_operation", "fixed"],
  }),
  CH("g01_total", 1, "On réunit deux quantités : c'est un total.", () => choisirCalcul(pbTotal(1))),
  CH("g02_reste", 1, "On enlève une partie : que reste-t-il ?", () => choisirCalcul(pbReste(1))),
  CH("g03_nom_ajout_retrait", 1, "Ajoute-t-on ou enlève-t-on ?", () => choisirOperation(pb(["total", "reste"], 1))),
  CH("g04_groupes", 2, "Des groupes égaux : le même nombre plusieurs fois.", () => choisirCalcul(pbFois(2))),
  CH("g05_partage", 2, "On partage en parts égales.", () => choisirCalcul(pbPartage(2))),
  CH("g06_nom_quatre", 2, "Cherche-t-on un total, un reste, des groupes égaux ou un partage ?", () => choisirOperation(pb(["total", "reste", "fois", "partage"], 2))),
  CH("g07_ecart", 3, "« De plus » ne veut pas toujours dire addition : on compare.", () => choisirCalcul(pbEcart(3))),
  CH("g08_complement", 3, "Combien manque-t-il pour arriver au but ?", () => choisirCalcul(pbComplement(3))),
  CH("g09_groupement", 3, "Combien de groupes de même taille peut-on faire ?", () => choisirCalcul(pbGroupement(3))),
  CH("g10_nom_pieges", 3, "Lis bien la question : comparer, compléter ou grouper ?", () => choisirOperation(pb(["ecart", "complement", "groupement"], 3))),
  CH("g11_plus_que", 4, "Qui en a le plus ? Fais un schéma avant de choisir.", () => choisirCalcul(pbPlusQue(4))),
  CH("g12_fois_plus", 4, "« Fois plus » : on multiplie.", () => choisirCalcul(pbFoisPlus(4))),
  CH("g13_melange", 4, "Que cherche-t-on ? Un total, un écart, une part, un nombre de groupes ?", () => choisirCalcul(pb(["ecart", "complement", "groupement", "partage", "plusQue", "foisPlus"], 4))),
];

/* =========================================================
   PROBLEME_UNE_ETAPE
========================================================= */
const UN1 = atelier("une_etape");
function resoudre(p: Pb): Gen {
  return {
    text: `${p.enonce} ${p.question}`,
    ...choixN(p.rep, p.faux, p.u),
    explanation: exp(DEF_UN, p.methode, `${p.calc} = ${fr(p.rep)}.`, p.phrase(p.rep)),
    ...dessin(p.canvas),
  };
}

const uneEtapeItems: TutorBankItemV4[] = [
  fixe({
    id: "cm1_probleme_une_etape_fixed_001_modele_addition",
    microId: "probleme_une_etape",
    difficulty: 2,
    text: "Une classe possède 125 livres. Elle reçoit 48 livres de plus. Combien de livres possède-t-elle maintenant ?",
    format: "short",
    expected: ["173"],
    comparator: "number_equal",
    hint: "On cherche un total : il faut additionner.",
    explanation: exp(DEF_UN, "La classe reçoit des livres en plus : on additionne.", "125 + 48 = 173.", "La classe possède maintenant 173 livres."),
    tags: ["cm1", "probleme", "une_etape", "fixed"],
  }),
  fixe({
    id: "cm1_probleme_une_etape_fixed_002_modele_soustraction",
    microId: "probleme_une_etape",
    difficulty: 2,
    text: "Une école a 240 cahiers. Elle en distribue 85. Combien de cahiers reste-t-il ?",
    format: "short",
    expected: ["155"],
    comparator: "number_equal",
    hint: "On cherche ce qui reste : il faut soustraire.",
    explanation: exp(DEF_UN, "On part des 240 cahiers et on enlève les 85 distribués.", "240 − 85 = 155.", "Il reste 155 cahiers."),
    tags: ["cm1", "probleme", "une_etape", "fixed"],
  }),
  UN1("g01_total", 2, "On réunit deux quantités : on additionne.", () => resoudre(pbTotal(2))),
  UN1("g02_reste", 2, "On enlève une partie : on soustrait.", () => resoudre(pbReste(2))),
  UN1("g03_groupes", 2, "Des groupes égaux : on multiplie.", () => resoudre(pbFois(2))),
  UN1("g04_partage", 2, "On partage en parts égales : on divise.", () => resoudre(pbPartage(2))),
  UN1("g05_ecart", 3, "On compare : l'écart est une soustraction.", () => resoudre(pbEcart(3))),
  UN1("g06_complement", 3, "Ce qui manque = le but moins ce qui est déjà fait.", () => resoudre(pbComplement(3))),
  UN1("g07_groupement", 3, "Combien de fois le groupe tient-il dans le total ? On divise.", () => resoudre(pbGroupement(3))),
  UN1("g08_comparer", 3, "« fois plus » : on multiplie ; « de plus que » : qui en a le plus ?", () => resoudre(pb(["foisPlus", "plusQue"], 3))),
];

/* =========================================================
   PROBLEME_PLUSIEURS_ETAPES
========================================================= */
const PL = atelier("plusieurs_etapes");
function resoudre2(p: Pb2): Gen {
  return {
    text: `${p.enonce} ${p.question}`,
    ...choixN(p.rep, p.faux, p.u),
    explanation: exp(DEF_DEUX, "On cherche d'abord ce qu'on ne connaît pas encore, puis on répond à la question.", p.etapes, p.phrase(p.rep)),
    ...dessin(p.canvas, 0.85),
  };
}
const Q_PREMIER = ["Quel calcul faut-il faire en premier ?", "Par quel calcul commencer ?", "Quelle est la première étape ?"];
function premierCalcul(p: Pb2): Gen {
  return {
    text: `${p.enonce} ${p.question} ${un(Q_PREMIER)}`,
    ...qcm(p.premier, p.premierFaux),
    explanation: exp(DEF_DEUX, "On commence par trouver la quantité qui manque pour répondre.", p.etapes, `On commence par ${p.premier}.`),
    ...dessin(p.canvas, 0.85),
  };
}

const plusieursItems: TutorBankItemV4[] = [
  fixe({
    id: "cm1_probleme_plusieurs_etapes_fixed_001_modele",
    microId: "probleme_plusieurs_etapes",
    difficulty: 3,
    text: "Une école reçoit 120 cahiers le matin et 85 cahiers l'après-midi. Elle en distribue 96. Combien de cahiers reste-t-il ?",
    format: "short",
    expected: ["109"],
    comparator: "number_equal",
    hint: "Calcule d'abord le total reçu, puis enlève les cahiers distribués.",
    explanation: exp(DEF_DEUX, "On réunit les cahiers reçus, puis on enlève les cahiers distribués.", "120 + 85 = 205, puis 205 − 96 = 109.", "Il reste 109 cahiers."),
    tags: ["cm1", "probleme", "plusieurs_etapes", "fixed"],
  }),
  PL("g01_gain_perte", 3, "D'abord ce qu'on a après l'ajout, puis on enlève.", () => resoudre2(e1GainPerte(3))),
  PL("g02_deja_plus_groupes", 3, "D'abord les groupes (multiplication), puis on ajoute ce qu'on avait.", () => resoudre2(e2DejaPlusGroupes(3))),
  PL("g03_groupes_moins", 3, "D'abord le total des groupes, puis on enlève.", () => resoudre2(e3GroupesMoins(3))),
  PL("g04_achats", 3, "D'abord le prix des objets identiques, puis on ajoute l'autre achat.", () => resoudre2(e4Achats(3))),
  PL("g05_premier_calcul", 3, "Que faut-il connaître avant de répondre ?", () => premierCalcul(un(ETAPES_3)(3))),
  PL("g06_rendu", 4, "D'abord le prix à payer, puis ce qu'on rend sur le billet.", () => resoudre2(e5Rendu(4))),
  PL("g07_recu_partage", 4, "D'abord tout réunir, puis partager.", () => resoudre2(e6RecuPartage(4))),
  PL("g08_deux_groupes", 4, "Deux sortes de groupes : deux multiplications, puis une addition.", () => resoudre2(e7DeuxGroupes(4))),
  PL("g09_objectif", 4, "D'abord ce qui est déjà fait, puis ce qui manque.", () => resoudre2(e8ObjectifDeuxJours(4))),
  PL("g10_premier_calcul", 4, "Que faut-il connaître avant de répondre ?", () => premierCalcul(un(ETAPES_4)(4))),
];

/* =========================================================
   PROBLEME_REDIGER — la phrase-réponse
========================================================= */
const RE = atelier("rediger");
const Q_PHRASE = ["Quelle phrase-réponse convient ?", "Choisis la bonne phrase-réponse.", "Quelle phrase répond bien à la question ?", "Quelle est la phrase-réponse correcte ?"];
const DEF_PHRASE = "Une phrase-réponse reprend la question, donne le bon nombre et son unité.";

function rediger(p: Pb, calculDonne: boolean): Gen {
  const juste = p.phrase(p.rep);
  const fauxNb = [...new Set(p.faux.filter((v) => Number.isInteger(v) && v >= 2 && v !== p.rep))];
  const intro = calculDonne
    ? ` ${un([`Le calcul donne ${p.calc} = ${fr(p.rep)}.`, `On a calculé : ${p.calc} = ${fr(p.rep)}.`, `Le bon calcul est ${p.calc} = ${fr(p.rep)}.`])}`
    : "";
  const faux = [p.phrase(p.rep, false), fr(p.rep), ...melange(fauxNb).slice(0, 2).map((v) => p.phrase(v))];
  return {
    text: `${p.enonce} ${p.question}${intro} ${un(Q_PHRASE)}`,
    ...qcm(juste, faux),
    explanation: exp(DEF_PHRASE, p.methode, `${p.calc} = ${fr(p.rep)}.`, juste),
    ...dessin(p.canvas, 0.7),
  };
}
function rediger2(p: Pb2): Gen {
  const juste = p.phrase(p.rep);
  const autres = p.faux.filter((v) => Number.isInteger(v) && v >= 2 && v !== p.rep && v !== p.inter);
  return {
    text: `${p.enonce} ${p.question} ${un(Q_PHRASE)}`,
    ...qcm(juste, [p.phrase(p.inter), p.phrase(p.rep, false), ...autres.slice(0, 1).map((v) => p.phrase(v))]),
    explanation: exp(DEF_PHRASE, "La phrase-réponse donne le résultat de la DERNIÈRE étape, pas celui de la première.", p.etapes, juste),
    ...dessin(p.canvas, 0.85),
  };
}

const redigerItems: TutorBankItemV4[] = [
  RE("g01_calcul_donne_ajout_retrait", 2, "La phrase reprend la question, avec le nombre ET l'unité.", () => rediger(pb(["total", "reste"], 2), true)),
  RE("g02_calcul_donne_groupes", 2, "La phrase reprend la question, avec le nombre ET l'unité.", () => rediger(pb(["fois", "partage"], 2), true)),
  RE("g03_comparer", 3, "Calcule d'abord, puis choisis la phrase qui répond à LA question posée.", () => rediger(pb(["ecart", "complement"], 3), false)),
  RE("g04_groupes_fois", 3, "Calcule d'abord, puis vérifie le nombre et l'unité.", () => rediger(pb(["groupement", "foisPlus", "plusQue"], 3), false)),
  RE("g05_deux_etapes", 4, "La réponse est le résultat de la dernière étape.", () => rediger2(un(ETAPES_3)(3))),
  RE("g06_deux_etapes_plus", 4, "La réponse est le résultat de la dernière étape.", () => rediger2(un(ETAPES_4)(4))),
];

/* =========================================================
   PROBLEME_VERIFIER — le résultat est-il cohérent ?
========================================================= */
const VE = atelier("verifier");
const OUI = ["Oui, c'est cohérent.", "Oui, ce résultat est possible.", "Oui, c'est vraisemblable."];
const Q_COHERENT = ["Ce résultat est-il possible ?", "Ce résultat est-il cohérent ?", "Qu'en penses-tu ?"];

function coherence(type: "total" | "reste" | "fois", d: number): Gen {
  const p = type === "total" ? pbTotal(d) : type === "reste" ? pbReste(d) : pbFois(d);
  const eleve = ELEVE();
  const juste = peut(0.4);
  const faux = type === "total" ? Math.abs(p.x - p.y) : p.x + p.y;
  const X = juste ? p.rep : faux;
  const big = Math.max(p.x, p.y);
  const small = Math.min(p.x, p.y);
  const raisons =
    type === "total"
      ? { vrai: `Non : en tout, il doit y en avoir plus de ${fr(big)}.`, f1: `Non : en tout, il doit y en avoir moins de ${fr(small)}.`, f2: "Non : il fallait soustraire." }
      : type === "reste"
        ? { vrai: `Non : il ne peut pas rester plus de ${fr(p.x)} ${p.u}.`, f1: `Non : il doit rester plus de ${fr(p.x)} ${p.u}.`, f2: "Non : il fallait additionner." }
        : { vrai: "Non : il fallait multiplier, pas additionner.", f1: "Non : il fallait additionner.", f2: `Non : le résultat doit être plus petit que ${fr(Math.max(p.x, p.y))}.` };
  const oui = un(OUI);
  return {
    text: `${p.enonce} ${p.question} ${cap(eleve.s)} trouve ${fr(X)} ${p.u}. ${un(Q_COHERENT)}`,
    ...(juste ? qcm(oui, [raisons.f1, raisons.f2]) : qcm(raisons.vrai, [oui, raisons.f1])),
    explanation: exp(
      "Vérifier, c'est se demander si le résultat a du sens dans la situation.",
      type === "total" ? "Un total est plus grand que chacune des parts." : type === "reste" ? "Ce qui reste est plus petit que ce qu'on avait au départ." : "Des groupes égaux se comptent avec une multiplication.",
      `${p.calc} = ${fr(p.rep)}.`,
      juste ? `${fr(X)} ${p.u} : c'est cohérent.` : `${fr(X)} ${p.u} n'est pas possible : la bonne réponse est ${fr(p.rep)} ${p.u}.`,
    ),
    ...dessin(p.canvas, 0.75),
  };
}

const Q_VERIF = ["Quel calcul permet de vérifier ce résultat ?", "Comment peut-on vérifier ?", "Quel calcul sert à vérifier ?"];
function inverse(d: number): Gen {
  const p = pb(["total", "reste", "fois", "partage", "complement"], d);
  const eleve = ELEVE();
  const { x, y, rep: r } = p;
  const [juste, faux]: [string, string[]] =
    p.s === "+"
      ? [ec(r, "−", y), [ec(r, "+", y), ec(Math.max(x, y), "−", Math.min(x, y)), ec(r, "×", y)]]
      : p.s === "−"
        ? [ec(r, "+", y), [ec(r, "−", y), ec(x, "+", y), ec(x, "×", y)]]
        : p.s === "×"
          ? [ec(r, "÷", x), [ec(r, "−", x), ec(r, "×", x), ec(x, "+", y)]]
          : [ec(r, "×", y), [ec(r, "+", y), ec(x, "×", y), ec(x, "−", r)]];
  const attendu = p.s === "+" ? x : p.s === "−" ? x : p.s === "×" ? y : x;
  return {
    text: `${p.enonce} ${p.question} ${cap(eleve.s)} pose ${p.calc} et trouve ${fr(r)}. ${un(Q_VERIF)}`,
    ...qcm(juste, faux),
    explanation: exp(
      "On vérifie un calcul avec l'opération contraire.",
      p.s === "+" || p.s === "−" ? "L'addition et la soustraction se défont l'une l'autre." : "La multiplication et la division se défont l'une l'autre.",
      `${juste} = ${fr(attendu)} : on retrouve le nombre de l'énoncé.`,
      `On vérifie avec ${juste}.`,
    ),
    ...(peut(0.8) ? { canvas: pose(x, p.s, y, r) } : {}),
  };
}

const Q_ERREUR = (il: string) => ["Quelle est son erreur ?", `Qu'a-t-${il} mal fait ?`, "Que penses-tu de son calcul ?"];
function erreurOperation(d: number): Gen {
  const p = pb(["ecart", "complement", "plusQue", "foisPlus", "reste", "fois"], d);
  const eleve = ELEVE();
  const { x, s, y } = p.piege;
  const val = s === "+" ? x + y : s === "−" ? x - y : x * y;
  const calcEleve = ec(x, s, y);
  const autre = p.calcFaux.find((c) => c !== calcEleve) ?? p.calcFaux[1];
  return {
    text: `${p.enonce} ${p.question} ${cap(eleve.s)} écrit : « ${calcEleve} = ${fr(val)} ». ${un(Q_ERREUR(eleve.il))}`,
    ...qcm(`${cap(eleve.il)} s'est trompé${eleve.il === "elle" ? "e" : ""} d'opération : il fallait calculer ${p.calc}.`, [
      "Son calcul est juste : c'est la bonne réponse.",
      `${cap(eleve.il)} s'est trompé${eleve.il === "elle" ? "e" : ""} d'opération : il fallait calculer ${autre}.`,
      `${cap(eleve.il)} a mal compté : ${calcEleve} ne fait pas ${fr(val)}.`,
    ]),
    explanation: exp("Vérifier, c'est relire la question et se demander si l'opération choisie convient.", p.methode, `${p.calc} = ${fr(p.rep)}.`, `La bonne réponse est ${fr(p.rep)} ${p.u}.`),
    ...(peut(0.8) ? { canvas: pose(x, s, y, val) } : {}),
  };
}

function etapeOubliee(d: number): Gen {
  const p = un(d >= 4 ? [...ETAPES_3, ...ETAPES_4] : ETAPES_3)(d);
  const eleve = ELEVE();
  const juste = peut(0.3);
  const e = eleve.il === "elle" ? "e" : "";
  const oubli = `${cap(eleve.il)} a oublié une étape : ${p.oubli}.`;
  const bon = "C'est la bonne réponse.";
  const faux = [`${cap(eleve.il)} aurait dû diviser par 2.`, `${cap(eleve.il)} s'est trompé${e} dans le calcul de la première étape.`];
  return {
    text: `${p.enonce} ${p.question} ${cap(eleve.s)} répond : « ${p.phrase(juste ? p.rep : p.inter)} » ${un(["Que penses-tu de sa réponse ?", "Sa réponse est-elle juste ?", "Qu'en penses-tu ?"])}`,
    ...(juste ? qcm(bon, [oubli, ...faux]) : qcm(oubli, [bon, ...faux])),
    explanation: exp("Vérifier, c'est se demander si on a bien répondu à LA question posée.", "Dans un problème à étapes, le premier résultat n'est souvent qu'une étape.", p.etapes, p.phrase(p.rep)),
    ...dessin(p.canvas, 0.85),
  };
}

/** Un nombre proche d'une centaine (à 20 près) : l'arrondi ne se discute pas. */
const presDe = (lo: number, hi: number) => {
  const h = entre(lo, hi);
  return { v: h * 100 + entre(-20, 20), r: h * 100 };
};
function ordreDeGrandeur(): Gen {
  const eleve = ELEVE();
  const Q = un(["Quel résultat est le plus proche ?", "Environ combien va-t-on trouver ?", "Quel ordre de grandeur est correct ?"]);
  const env = (v: number, u: string) => `environ ${fr(v)} ${u}`;
  if (peut(0.5)) {
    let A: { v: number; r: number };
    let B: { v: number; r: number };
    do {
      A = presDe(3, 9);
      B = presDe(1, 5);
    } while (A.r === B.r);
    const p = pbTotal(3, [A.v, B.v]);
    const R = A.r + B.r;
    return {
      text: `${p.enonce} ${p.question} Avant de poser le calcul, ${eleve.s} cherche un ordre de grandeur. ${Q}`,
      ...qcm(env(R, p.u), [env(Math.abs(A.r - B.r), p.u), env(R * 10, p.u), env(R + 1000, p.u)]),
      explanation: exp("Un ordre de grandeur est un résultat arrondi, pour vérifier qu'on ne s'est pas trompé.", "On arrondit chaque nombre à la centaine, puis on calcule.", `${fr(A.v)} ≈ ${fr(A.r)} et ${fr(B.v)} ≈ ${fr(B.r)}, donc ${fr(A.r)} + ${fr(B.r)} = ${fr(R)}.`, `On trouvera environ ${fr(R)} ${p.u} (exactement ${fr(p.rep)}).`),
      ...dessin(p.canvas, 0.8),
    };
  }
  const K = un([20, 30, 40, 50, 60, 70, 80, 90]);
  const k = K + un([-2, -1, 1, 2]);
  const n = entre(3, 8);
  const p = pbFois(3, [n, k]);
  const R = n * K;
  return {
    text: `${p.enonce} ${p.question} Avant de poser le calcul, ${eleve.s} cherche un ordre de grandeur. ${Q}`,
    ...qcm(env(R, p.u), [env(n + K, p.u), env(R * 10, p.u), env(K, p.u)]),
    explanation: exp("Un ordre de grandeur est un résultat arrondi, pour vérifier qu'on ne s'est pas trompé.", "On arrondit le nombre à la dizaine, puis on multiplie.", `${k} ≈ ${K}, donc ${n} × ${K} = ${fr(R)}.`, `On trouvera environ ${fr(R)} ${p.u} (exactement ${fr(p.rep)}).`),
    ...dessin(p.canvas, 0.8),
  };
}

const verifierItems: TutorBankItemV4[] = [
  VE("g01_coherence_total_reste", 3, "Un total est plus grand que ses parts ; un reste est plus petit que le départ.", () => coherence(un(["total", "reste"] as const), 3)),
  VE("g02_coherence_groupes", 3, "Des groupes égaux : multiplication. Le résultat est grand !", () => coherence(un(["fois", "total", "reste"] as const), 2)),
  VE("g03_operation_contraire", 3, "On vérifie avec l'opération contraire.", () => inverse(2)),
  VE("g04_erreur_operation", 4, "Relis la question : l'élève a-t-il choisi la bonne opération ?", () => erreurOperation(3)),
  VE("g05_etape_oubliee", 4, "La réponse de l'élève répond-elle à LA question, ou à une étape ?", () => etapeOubliee(4)),
  VE("g06_ordre_grandeur", 4, "Arrondis les nombres, puis calcule de tête.", () => ordreDeGrandeur()),
  VE("g07_operation_contraire_grands", 4, "On vérifie avec l'opération contraire.", () => inverse(4)),
];

/* =========================================================
   PROBLEME_DEFI
========================================================= */
const DE = atelier("defi");

function d1TroisEtapes(): Gen {
  const c = tirer(GROUPES.filter((g) => g.rangement));
  const { s, il } = c.qui();
  let n: number;
  let k: number;
  let m: number;
  let q: number;
  let cc: number;
  do {
    [n, k] = nk(3, c);
    m = entre(2, 5);
    q = entre(3, Math.max(3, Math.floor((n * k) / m) - 2));
    cc = n * k - m * q;
  } while (cc < 2);
  const P = n * k;
  const R = m * q;
  return {
    text: `${cap(s)} reçoit ${n} ${c.contPl} de ${k} ${c.obj}. ${cap(il)} en garde ${fr(cc)}, puis ${il} partage le reste en ${m} parts égales. ${un([`Combien ${de(c.obj)} y a-t-il dans chaque part ?`, `Combien ${de(c.obj)} contient chaque part ?`])}`,
    ...choixN(q, [R, P % m === 0 ? P / m : P - cc - m, q + cc, P - cc], c.obj),
    explanation: exp(DEF_DEUX, "Trois étapes : le total, ce qui reste, puis le partage.", `${n} × ${k} = ${fr(P)} ; ${fr(P)} − ${fr(cc)} = ${fr(R)} ; ${fr(R)} ÷ ${m} = ${fr(q)}.`, `Il y a ${fr(q)} ${c.obj} dans chaque part.`),
    ...(peut(0.8) ? { canvas: barre([{ label: "gardés", value: fr(cc) }, ...egales(m, { label: "part", unknown: true })], `${n} × ${k}`, cap(c.obj)) } : {}),
  };
}

function d2Budget(): Gen {
  const { s, il } = prenom();
  const [A, B] = deuxArticles();
  const n = entre(2, 5);
  const p = entre(...A.p);
  const q = entre(...B.p);
  const cout = n * p + q;
  const argentDispo = Math.max(5, cout + un([-7, -4, -2, 0, 3, 5, 8, 11]));
  const phrase = (dd: number) => (dd === 0 ? "Oui, c'est juste assez." : dd > 0 ? `Oui, il lui restera ${dd} €.` : `Non, il lui manque ${-dd} €.`);
  const dd = argentDispo - cout;
  return {
    text: `${s} a ${argentDispo} €. ${cap(il)} veut acheter ${n} ${A.pl} à ${p} € ${A.le} et ${B.un} à ${q} €. ${un([`A-t-${il} assez d'argent ?`, `Peut-${il} tout acheter ?`, `Son argent suffit-il ?`])}`,
    ...qcm(phrase(dd), [phrase(argentDispo - n * p), phrase(argentDispo - p - q), phrase(-dd || 3), phrase(argentDispo - n * q - p), phrase(dd + 10)]),
    explanation: exp(DEF_DEUX, "On calcule ce que coûtent les achats, puis on compare avec l'argent qu'on a.", `${n} × ${p} = ${n * p} ; ${n * p} + ${q} = ${cout} € ; ${argentDispo} − ${cout} ${dd >= 0 ? `= ${dd}` : `: il manque ${cout} − ${argentDispo} = ${-dd}`}.`, phrase(dd)),
    ...(peut(0.8) ? { canvas: argent(argentDispo) } : {}),
  };
}

function d5PrixUnite(): Gen {
  const A = un(ARTICLES);
  let n1: number;
  let n2: number;
  let u1: number;
  let u2: number;
  do {
    n1 = entre(2, 6);
    n2 = entre(2, 6);
    u1 = entre(A.p[0], A.p[1] + 2);
    u2 = entre(A.p[0], A.p[1] + 2);
  } while (n1 === n2 || u1 === u2 || n1 * u1 === n2 * u2);
  const [L1, L2] = melange([...LIEUX]).slice(0, 2);
  const P1 = n1 * u1;
  const P2 = n2 * u2;
  const pron = A.f ? "elle" : "il";
  const [Lc, uc, Lo, uo] = u1 < u2 ? [L1, u1, L2, u2] : [L2, u2, L1, u1];
  const petitTotal = P1 < P2 ? L1 : L2;
  const faux = [`${cap(au(Lo))} : ${uo} € ${A.le}.`, "C'est le même prix aux deux endroits."];
  // Le piège : comparer les prix TOTAUX (ou le nombre d'objets) au lieu du prix d'un objet.
  const nLo = Lo === L1 ? n1 : n2;
  const nLc = Lc === L1 ? n1 : n2;
  if (petitTotal !== Lc) faux.push(`${cap(au(petitTotal))}, car ${Math.min(P1, P2)} € est le prix le plus bas.`);
  else if (nLo > nLc) faux.push(`${cap(au(Lo))}, car on y achète plus ${de(A.pl)}.`);
  return {
    text: `${cap(au(L1))}, ${n1} ${A.pl} coûtent ${P1} €. ${cap(au(L2))}, ${n2} ${A.pl} coûtent ${P2} €. ${un([`Où ${A.le} est-${pron} le moins cher ?`, `À quel endroit ${A.le} coûte-t-${pron} le moins cher ?`])}`,
    ...qcm(`${cap(au(Lc))} : ${uc} € ${A.le}.`, faux),
    explanation: exp("Pour comparer, on cherche le prix d'UN objet à chaque endroit.", "On divise chaque prix par le nombre d'objets.", `${P1} ÷ ${n1} = ${u1} € et ${P2} ÷ ${n2} = ${u2} €.`, `C'est ${au(Lc)} que ${A.le} est le moins cher : ${uc} €.`),
  };
}

function d8FoisPlusEnsemble(): Gen {
  const A = prenom();
  const B = prenom(A.s);
  const obj = un(COLLECTIONS);
  const k = entre(12, 60);
  const n = entre(2, 6);
  const elles = A.il === "elle" && B.il === "elle" ? "elles" : "ils";
  const rep = k + n * k;
  return {
    text: `${A.s} a ${k} ${obj}. ${B.s} en a ${n} fois plus. ${un([`Combien ${de(obj)} ont-${elles} ensemble ?`, `Combien ${de(obj)} ont-${elles} à ${elles === "elles" ? "elles" : "eux"} deux ?`])}`,
    ...choixN(rep, [n * k, k + n, n * k - k, k * n + n], obj),
    explanation: exp(DEF_DEUX, `D'abord ce qu'a ${B.s} (multiplication), puis on ajoute ce qu'a ${A.s}.`, `${n} × ${k} = ${n * k} ; ${n * k} + ${k} = ${rep}.`, `Ensemble, ${elles} ont ${rep} ${obj}.`),
    ...(peut(0.8) ? { canvas: barre([{ label: A.s, value: fr(k) }, { label: B.s, value: fr(k) }, ...egales(n - 1, { label: "", value: fr(k) })], "?", cap(obj)) } : {}),
  };
}

const TRANSPORTS = [
  { txt: (T: number, k: number) => `${T} élèves partent en sortie. Chaque minibus a ${k} places.`, pl: "minibus", ks: [8, 9, 12] },
  { txt: (T: number, k: number) => `${T} supporters vont au match. Un car peut transporter ${k} personnes.`, pl: "cars", ks: [45, 50, 55] },
  { txt: (T: number, k: number) => `${T} invités viennent au repas. Une table accueille ${k} personnes.`, pl: "tables", ks: [6, 8, 10] },
  { txt: (T: number, k: number) => `${T} touristes visitent les grottes. Un bateau prend ${k} passagers.`, pl: "bateaux", ks: [12, 15, 20] },
  { txt: (T: number, k: number) => `${T} joueurs vont au tournoi. Une voiture peut emmener ${k} joueurs.`, pl: "voitures", ks: [4] },
  { txt: (T: number, k: number) => `${T} randonneurs dorment au refuge. Un dortoir a ${k} lits.`, pl: "dortoirs", ks: [6, 8, 10, 12] },
];
function d3ArrondiSup(): Gen {
  let T: number;
  let k: number;
  let texte: string;
  let pl: string;
  let q: number;
  let r: number;
  const tr = peut(0.5) ? un(TRANSPORTS) : null;
  const c = tirer(GROUPES.filter((g) => g.rangement));
  do {
    k = un(tr ? tr.ks : c.ks);
    q = entre(3, 9);
    r = entre(1, k - 1);
    T = q * k + r;
  } while (T > 600);
  if (tr) {
    texte = tr.txt(T, k);
    pl = tr.pl;
  } else {
    const { s } = c.qui();
    texte = `${cap(s)} veut ranger ${T} ${c.obj} dans des ${c.contPl} de ${k}.`;
    pl = c.contPl;
  }
  return {
    text: `${texte} ${un([`Combien ${de(pl)} faut-il au minimum ?`, `Au minimum, combien ${de(pl)} faut-il ?`])}`,
    ...choixN(q + 1, [q, r, q + 2, k], pl),
    explanation: exp("Dans une division, le reste compte aussi.", "On divise, puis on regarde le reste : il faut encore une place pour lui.", `${T} ÷ ${k} : ${q} et il reste ${r}. Il faut donc ${q} + 1 = ${q + 1}.`, `Il faut ${q + 1} ${pl}.`),
    ...(peut(0.75) ? { canvas: pose(T, "÷", k) } : {}),
  };
}

function d4Reste(): Gen {
  const c = tirer(GROUPES.filter((g) => g.rangement && g.ks.some((x) => x >= 5)));
  const { s, il } = c.qui();
  const k = un(c.ks.filter((x) => x >= 5));
  const q = entre(3, 12);
  const r = entre(2, k - 1);
  const T = q * k + r;
  return {
    text: `${un([`${cap(s)} a ${T} ${c.obj}. ${cap(il)} fait des ${c.contPl} de ${k}.`, `${cap(s)} range ${T} ${c.obj} par ${k} dans des ${c.contPl}.`])} ${un([`Combien ${de(c.obj)} reste-t-il à la fin, en dehors des ${c.contPl} ?`, `Combien ${de(c.obj)} ne trouvent pas de place ?`])}`,
    ...choixN(r, [q, k - r, r + k, q + 1], c.obj),
    explanation: exp("Le reste d'une division, c'est ce qui ne suffit pas pour faire un groupe de plus.", `On cherche combien de fois ${k} tient dans ${T}.`, `${q} × ${k} = ${q * k} et ${T} − ${q * k} = ${r}.`, `Il reste ${r} ${c.obj}.`),
    ...(peut(0.75) ? { canvas: pose(T, "÷", k) } : {}),
  };
}

function d6SommeDifference(): Gen {
  const A = prenom();
  const B = prenom(A.s);
  const obj = un(COLLECTIONS);
  const b = entre(15, 120);
  const e = entre(4, 40);
  const T = 2 * b + e;
  const deux = A.il === "elle" && B.il === "elle" ? "à elles deux" : "à eux deux";
  const demandeA = peut(0.4);
  const rep = demandeA ? b + e : b;
  return {
    text: `${un([`${A.s} et ${B.s} ont ${T} ${obj} ${deux}.`, `Ensemble, ${A.s} et ${B.s} ont ${T} ${obj}.`])} ${A.s} en a ${e} de plus ${que(B.s)}. ${demandeA ? `Combien ${de(obj)} ${A.s} a-t-${A.il} ?` : `Combien ${de(obj)} ${B.s} a-t-${B.il} ?`}`,
    ...choixN(rep, [T % 2 === 0 ? T / 2 : T - e, T - e, demandeA ? b : b + e, T - b], obj),
    explanation: exp(
      "Un défi : on connaît la somme et l'écart.",
      `On enlève l'écart pour avoir deux parts égales, celle de ${B.s}.`,
      `${T} − ${e} = ${2 * b} ; ${2 * b} ÷ 2 = ${b}${demandeA ? ` ; ${b} + ${e} = ${b + e}` : ""}.`,
      `${demandeA ? A.s : B.s} a ${rep} ${obj}.`,
    ),
    ...(peut(0.8) ? { canvas: barre([{ label: B.s, unknown: true }, { label: A.s, unknown: true }, { label: "de plus", value: fr(e) }], fr(T), cap(obj)) } : {}),
  };
}

function d7PartagePrix(): Gen {
  const A = un(ARTICLES);
  let n: number;
  let m: number;
  let p: number;
  do {
    n = entre(2, 5);
    m = entre(n + 1, 9);
    p = entre(...A.p);
  } while ((m * p) % n !== 0 || (m * p) / n < 2);
  const P = m * p;
  const v = P / n;
  const noms: string[] = [];
  while (noms.length < n) {
    const x = prenom().s;
    if (!noms.includes(x)) noms.push(x);
  }
  const qui = n <= 3 && peut(0.5) ? `${noms.slice(0, -1).join(", ")} et ${noms[n - 1]}` : `${n} amis`;
  return {
    text: `${qui} achètent ensemble ${m} ${A.pl} à ${p} € ${A.le}. ${un(["Ils partagent la dépense en parts égales.", "Chacun paie la même somme."])} ${un(["Combien paie chacun ?", "Quelle somme chacun paie-t-il ?"])}`,
    ...choixN(v, [P, p, P - n, v + p], "€"),
    explanation: exp(DEF_DEUX, "D'abord le prix total, puis on le partage entre les amis.", `${m} × ${p} = ${P} € ; ${P} ÷ ${n} = ${v} €.`, `Chacun paie ${v} €.`),
    ...(peut(0.8) ? { canvas: barre(egales(n, { label: "", unknown: true }), `${m} × ${p} €`, "La dépense") } : {}),
  };
}

const defiItems: TutorBankItemV4[] = [
  fixe({
    id: "cm1_probleme_defi_fixed_001_modele",
    microId: "probleme_defi",
    difficulty: 4,
    text: "Défi : une école reçoit 3 cartons de 24 cahiers. Elle distribue ensuite 38 cahiers. Combien de cahiers reste-t-il ?",
    format: "short",
    expected: ["34"],
    comparator: "number_equal",
    hint: "Calcule d'abord le nombre total de cahiers reçus.",
    explanation: exp(DEF_DEUX, "Le total des cartons, puis on enlève les cahiers distribués.", "3 × 24 = 72, puis 72 − 38 = 34.", "Il reste 34 cahiers."),
    tags: ["cm1", "probleme", "defi", "fixed"],
  }),
  DE("g01_trois_etapes", 4, "Trois étapes : le total, ce qui reste, puis le partage.", d1TroisEtapes),
  DE("g02_budget", 4, "Calcule le prix de tout, puis compare avec l'argent qu'on a.", d2Budget),
  DE("g03_prix_unite", 4, "Compare le prix d'UN objet, pas le prix total.", d5PrixUnite),
  DE("g04_fois_plus_ensemble", 4, "D'abord la part du second, puis on ajoute.", d8FoisPlusEnsemble),
  DE("g05_arrondi_superieur", 5, "Le reste compte : il lui faut une place de plus.", d3ArrondiSup),
  DE("g06_reste", 5, "Le reste, c'est ce qui ne suffit pas pour un groupe de plus.", d4Reste),
  DE("g07_somme_ecart", 5, "Enlève l'écart, puis partage en deux.", d6SommeDifference),
  DE("g08_partage_prix", 5, "D'abord le prix total, puis le partage.", d7PartagePrix),
];

export const problemesBank: TutorBankItemV4[] = [
  ...choisirItems,
  ...uneEtapeItems,
  ...plusieursItems,
  ...redigerItems,
  ...verifierItems,
  ...defiItems,
];
