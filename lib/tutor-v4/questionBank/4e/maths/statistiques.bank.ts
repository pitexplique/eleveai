// lib/tutor-v4/question-banks/maths/4e/statistiques.bank.ts

import type {
  TutorBankItemV4,
  TutorGeneratedQuestionV4,
  StatGraphCanvasData,
} from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function formatNumber(n: number) {
  const rounded = Math.round(n * 100) / 100;
  return Number.isInteger(rounded) ? String(rounded) : String(rounded).replace(".", ",");
}

function statGraphCanvas(
  params: Omit<StatGraphCanvasData, "kind">
): StatGraphCanvasData {
  return {
    kind: "stat_graph",
    ...params,
  };
}

function mediane(values: number[]) {
  const sorted = [...values].sort((a, b) => a - b);
  const n = sorted.length;

  if (n % 2 === 1) return sorted[Math.floor(n / 2)];

  return (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
}

function etendue(values: number[]) {
  return Math.max(...values) - Math.min(...values);
}

/* =========================================================================
   ⛔⛔ 04/10/2026 — « DES QUESTIONS REVIENNENT SOUVENT »
   =========================================================================
   Mesure de départ (scripts/mesurer-squelettes-coach.ts 4e stat_donnee
   stat_statistique) : 3 à 19 squelettes d'énoncé par micro, 10 à 19
   répétitions sur une série de 20. Les gabarits changeaient les NOMBRES et
   gardaient la PHRASE ; plusieurs étoiles n'avaient même que du figé.

   Chaque gabarit compose désormais une SITUATION tirée d'une table
   (ENQUETES : données qualitatives ; DISCRETES : un caractère compté avec
   ses effectifs ; SERIES : une série de mesures ; COMPARAISONS : deux
   séries à comparer) × une TOURNURE (3 ou 4 façons de présenter les données
   et de poser la question). Les nombres restent tirés au hasard, plausibles
   pour le contexte, et choisis pour que les calculs TOMBENT JUSTE :
   fréquences sur des totaux « ronds », moyennes entières ou au dixième.
   La Réunion reste un contexte parmi d'autres (un marché, un lagon).

   ⚠️ Le diagramme du coach (lib/canvas/StatGraphCanvas.tsx) n'a pas de
   graduation : les valeurs restent écrites au-dessus des barres, et les
   étiquettes sont courtes (10 caractères au plus) pour tenir sous 4 barres.
========================================================================= */

type QG = TutorGeneratedQuestionV4;

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** « de » devant un nom sans article, avec élision : « d'élèves », « de familles ». */
const deNu = (n: string) => (/^[aeiouyéèêâîôû]/i.test(n) ? "d'" + n : "de " + n);
/** « le club » → « du club », « les ventes » → « des ventes », « la 4e A » → « de la 4e A ». */
function de(gn: string): string {
  if (gn.startsWith("le ")) return "du " + gn.slice(3);
  if (gn.startsWith("les ")) return "des " + gn.slice(4);
  return deNu(gn);
}
/** « Quelle » devant un groupe nominal féminin (« la », « sa », « une »), « Quel » sinon. */
const quel = (gn: string) => (/^(la|sa|une) /.test(gn) ? "Quelle" : "Quel");

/** 8500 → « 8 500 », 12.5 → « 12,5 ». L'élève lit des nombres français. */
function fr(n: number): string {
  const r = Math.round(n * 100) / 100;
  const [e, d] = String(Math.abs(r)).split(".");
  return (r < 0 ? "-" : "") + e.replace(/\B(?=(\d{3})+(?!\d))/g, " ") + (d ? "," + d : "");
}

function joinEt(xs: string[]): string {
  if (xs.length < 2) return xs[0] ?? "";
  return `${xs.slice(0, -1).join(", ")} et ${xs[xs.length - 1]}`;
}

function sample<T>(arr: readonly T[], k: number): T[] {
  return shuffle([...arr]).slice(0, k);
}

function somme(xs: number[]) {
  return xs.reduce((s, v) => s + v, 0);
}

function pgcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : pgcd(b, a % b);
}

/** k entiers DISTINCTS entre min et max. */
function distincts(k: number, min: number, max: number): number[] {
  const pool: number[] = [];
  for (let v = min; v <= max; v++) pool.push(v);
  return sample(pool, k);
}

const expl = (def: string, meth: string, calc: string, concl: string) =>
  `Définition : ${def}\n\nMéthode : ${meth}\n\nCalcul : ${calc}\n\nConclusion : ${concl}`;

/** La VALEUR d'une proposition : « 1/4 », « 0,25 » et « 25 % » valent toutes 0,25. */
function valeurChoix(s: string): number {
  const t = s.replace(/\s/g, "").replace(",", ".").replace("%", "");
  const f = t.match(/^(-?\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)$/);
  const v = f ? Number(f[1]) / Number(f[2]) : Number(t);
  return s.includes("%") ? v / 100 : v;
}

/**
 * QCM numérique : jamais deux propositions de même VALEUR (0,5, 50 % et 1/2
 * sont la même réponse). On écarte les leurres égaux à la bonne réponse ou
 * entre eux, puis on en garde trois. (Elle remplace makeChoices, 04/10 : la
 * bonne réponse est mise de côté AVANT le tirage des leurres — leçon du
 * 04/08/2026, où elle pouvait disparaître du QCM.)
 */
function choixValeurs(correct: string, wrongs: readonly string[]): string[] {
  const vus = [valeurChoix(correct)];
  const garde: string[] = [];
  for (const w of shuffle(Array.from(new Set(wrongs)))) {
    const v = valeurChoix(w);
    if (w === correct || !Number.isFinite(v)) continue;
    if (vus.some((x) => Math.abs(x - v) < 1e-9)) continue;
    vus.push(v);
    garde.push(w);
    if (garde.length === 3) break;
  }
  return shuffle([correct, ...garde]);
}

/** Un nombre écrit avec au plus deux décimales, sans arrondi caché. */
const exact2 = (x: number) => Math.abs(x * 100 - Math.round(x * 100)) < 1e-9;

function diagramme(labels: string[], vals: number[], type: "barres" | "batons" = "barres") {
  return statGraphCanvas({
    graphType: type,
    data: labels.map((label, j) => ({ label, value: vals[j] })),
    display: { showLabels: true, showValues: true },
    size: { width: 360, height: 220 },
  });
}

const PRENOMS = ["Léa", "Hugo", "Inès", "Yanis", "Chloé", "Malik", "Emma", "Noah", "Jade", "Sami", "Zoé", "Lucas", "Nina", "Théo"];

/* ---------------------------------------------------------------------------
   ENQUETES — données qualitatives. `pred` complète « Combien d'élèves … ? » ;
   `label` est l'étiquette du tableau et du diagramme (courte).
--------------------------------------------------------------------------- */
type Cat = { label: string; pred: string };
type Enquete = { sujet: string; individus: string; min: number; max: number; cats: Cat[] };
const ct = (label: string, pred: string): Cat => ({ label, pred });

const ENQUETES: Enquete[] = [
  {
    sujet: "le sport préféré des élèves de 4e d'un collège", individus: "élèves", min: 6, max: 40,
    cats: [ct("football", "préfèrent le football"), ct("natation", "préfèrent la natation"), ct("danse", "préfèrent la danse"), ct("basket", "préfèrent le basket"), ct("handball", "préfèrent le handball"), ct("escalade", "préfèrent l'escalade"), ct("tennis", "préfèrent le tennis")],
  },
  {
    sujet: "le moyen de transport utilisé pour venir au collège", individus: "élèves", min: 12, max: 120,
    cats: [ct("à pied", "viennent à pied"), ct("bus", "viennent en bus"), ct("vélo", "viennent à vélo"), ct("voiture", "viennent en voiture"), ct("car", "viennent en car"), ct("tramway", "viennent en tramway")],
  },
  {
    sujet: "les instruments joués par les élèves d'une école de musique", individus: "élèves", min: 4, max: 30,
    cats: [ct("piano", "jouent du piano"), ct("guitare", "jouent de la guitare"), ct("violon", "jouent du violon"), ct("batterie", "jouent de la batterie"), ct("flûte", "jouent de la flûte"), ct("saxophone", "jouent du saxophone")],
  },
  {
    sujet: "les oiseaux comptés dans un jardin pendant une heure", individus: "oiseaux", min: 2, max: 25,
    cats: [ct("mésanges", "sont des mésanges"), ct("moineaux", "sont des moineaux"), ct("merles", "sont des merles"), ct("pigeons", "sont des pigeons"), ct("pinsons", "sont des pinsons"), ct("pies", "sont des pies")],
  },
  {
    sujet: "les déchets ramassés sur une plage lors d'une journée de nettoyage", individus: "déchets", min: 10, max: 90,
    cats: [ct("plastique", "sont en plastique"), ct("verre", "sont en verre"), ct("métal", "sont en métal"), ct("papier", "sont en papier"), ct("tissu", "sont en tissu"), ct("bois", "sont en bois")],
  },
  {
    sujet: "les menus choisis un midi par les clients d'un restaurant", individus: "clients", min: 5, max: 40,
    cats: [ct("poisson", "ont choisi le menu poisson"), ct("viande", "ont choisi le menu viande"), ct("végétarien", "ont choisi le menu végétarien"), ct("salade", "ont choisi une salade"), ct("pâtes", "ont choisi des pâtes")],
  },
  {
    sujet: "la destination d'été des familles interrogées par une agence de voyage", individus: "familles", min: 8, max: 60,
    cats: [ct("mer", "partent à la mer"), ct("montagne", "partent à la montagne"), ct("campagne", "partent à la campagne"), ct("étranger", "partent à l'étranger"), ct("maison", "restent chez elles")],
  },
  {
    sujet: "les livres empruntés au CDI en septembre", individus: "livres", min: 6, max: 70,
    cats: [ct("romans", "sont des romans"), ct("BD", "sont des bandes dessinées"), ct("mangas", "sont des mangas"), ct("revues", "sont des revues"), ct("albums", "sont des albums"), ct("contes", "sont des recueils de contes")],
  },
  {
    sujet: "les animaux de compagnie des familles d'un quartier", individus: "familles", min: 4, max: 45,
    cats: [ct("chat", "ont un chat"), ct("chien", "ont un chien"), ct("poissons", "ont des poissons"), ct("lapin", "ont un lapin"), ct("oiseau", "ont un oiseau"), ct("aucun", "n'ont aucun animal")],
  },
  {
    sujet: "les véhicules passés devant le collège entre 8 h et 9 h", individus: "véhicules", min: 6, max: 90,
    cats: [ct("voitures", "sont des voitures"), ct("camions", "sont des camions"), ct("motos", "sont des motos"), ct("bus", "sont des bus"), ct("vélos", "sont des vélos")],
  },
  {
    sujet: "la deuxième langue vivante choisie par les élèves de 5e d'un collège", individus: "élèves", min: 8, max: 80,
    cats: [ct("espagnol", "ont choisi l'espagnol"), ct("allemand", "ont choisi l'allemand"), ct("italien", "ont choisi l'italien"), ct("chinois", "ont choisi le chinois"), ct("portugais", "ont choisi le portugais")],
  },
  {
    sujet: "les fruits vendus un samedi matin au marché de Saint-Paul, à La Réunion", individus: "cagettes", min: 4, max: 30,
    cats: [ct("letchis", "contenaient des letchis"), ct("mangues", "contenaient des mangues"), ct("ananas", "contenaient des ananas"), ct("papayes", "contenaient des papayes"), ct("bananes", "contenaient des bananes")],
  },
  {
    sujet: "le mode de chauffage des logements d'une commune", individus: "logements", min: 20, max: 150,
    cats: [ct("gaz", "sont chauffés au gaz"), ct("électrique", "sont chauffés à l'électricité"), ct("bois", "sont chauffés au bois"), ct("fioul", "sont chauffés au fioul"), ct("solaire", "sont chauffés à l'énergie solaire")],
  },
  {
    sujet: "les arbres d'un parc municipal", individus: "arbres", min: 5, max: 60,
    cats: [ct("chênes", "sont des chênes"), ct("platanes", "sont des platanes"), ct("tilleuls", "sont des tilleuls"), ct("érables", "sont des érables"), ct("pins", "sont des pins"), ct("bouleaux", "sont des bouleaux")],
  },
  {
    sujet: "la boisson du petit-déjeuner des élèves de deux classes", individus: "élèves", min: 2, max: 20,
    cats: [ct("lait", "boivent du lait"), ct("chocolat", "boivent du chocolat chaud"), ct("jus", "boivent du jus de fruits"), ct("thé", "boivent du thé"), ct("eau", "boivent de l'eau"), ct("rien", "ne boivent rien")],
  },
  {
    sujet: "le genre musical préféré des spectateurs d'un festival", individus: "spectateurs", min: 20, max: 150,
    cats: [ct("rock", "préfèrent le rock"), ct("rap", "préfèrent le rap"), ct("jazz", "préfèrent le jazz"), ct("électro", "préfèrent l'électro"), ct("pop", "préfèrent la pop"), ct("reggae", "préfèrent le reggae")],
  },
  {
    sujet: "les insectes observés sur un massif de fleurs pendant une heure", individus: "insectes", min: 3, max: 30,
    cats: [ct("abeilles", "sont des abeilles"), ct("bourdons", "sont des bourdons"), ct("papillons", "sont des papillons"), ct("guêpes", "sont des guêpes"), ct("mouches", "sont des mouches")],
  },
];

function tirerEnquete(k: number) {
  const E = randomChoice(ENQUETES.filter((e) => e.cats.length >= k));
  return { E, cats: sample(E.cats, k), vals: distincts(k, E.min, E.max) };
}

function listeCats(cats: Cat[], vals: number[], style = randomInt(0, 3)): string {
  if (style === 0) return cats.map((c, j) => `${c.label} : ${vals[j]}`).join(" ; ");
  if (style === 1) return joinEt(cats.map((c, j) => `${vals[j]} pour « ${c.label} »`));
  if (style === 2) return cats.map((c, j) => `${c.label} (${vals[j]})`).join(", ");
  return `${cats.map((c) => c.label).join(" | ")} — effectifs : ${vals.join(" | ")}`;
}

function introTableau(E: Enquete, liste: string): string {
  return randomChoice([
    `Une enquête porte sur ${E.sujet}. Le tableau des résultats indique : ${liste}.`,
    `Voici le tableau des effectifs d'une enquête sur ${E.sujet} : ${liste}.`,
    `On a étudié ${E.sujet}. Le tableau donne : ${liste}.`,
    `Dans un tableau qui résume ${E.sujet}, on lit : ${liste}.`,
  ]);
}

function introGraphe(sujet: string, type: "barres" | "bâtons"): string {
  return randomChoice([
    `Le diagramme en ${type} représente ${sujet}.`,
    `On a représenté ${sujet} par un diagramme en ${type}.`,
    `Observe le diagramme en ${type} : il porte sur ${sujet}.`,
    `Ce diagramme en ${type} résume une enquête sur ${sujet}.`,
  ]);
}

function questionCat(E: Enquete, c: Cat): string {
  return randomChoice([
    `Combien ${deNu(E.individus)} ${c.pred} ?`,
    `Quel est l'effectif de la catégorie « ${c.label} » ?`,
    `Lis le nombre ${deNu(E.individus)} qui ${c.pred}.`,
    `D'après ces données, combien ${deNu(E.individus)} ${c.pred} ?`,
  ]);
}

function questionTotal(individus: string): string {
  return randomChoice([
    "Quel est l'effectif total ?",
    "Calcule l'effectif total.",
    `Quel est le nombre total ${deNu(individus)} ?`,
    `Combien ${deNu(individus)} compte-t-on en tout ?`,
  ]);
}

/** m effectifs entre min et max, de somme R, distincts entre eux et des `exclus`. */
function repartir(R: number, m: number, min: number, max: number, exclus: number[]): number[] | null {
  for (let t = 0; t < 300; t++) {
    const xs: number[] = [];
    for (let j = 0; j < m - 1; j++) xs.push(randomInt(min, max));
    const last = R - somme(xs);
    if (last < min || last > max) continue;
    xs.push(last);
    const tous = [...exclus, ...xs];
    if (new Set(tous).size !== tous.length) continue;
    return xs;
  }
  return null;
}

/**
 * Une enquête dont le TOTAL est rond (20, 25, 40, 50…) et dont la catégorie
 * visée `i` a une fréquence en pourcentage ENTIÈRE : la fréquence décimale a
 * alors au plus deux chiffres après la virgule. Rien à arrondir.
 */
function tirerEnqueteTotal(k: number) {
  const TOTAUX = [20, 25, 40, 50, 60, 75, 80, 100, 120, 125, 150, 200, 250, 300, 400, 500];
  for (let t = 0; t < 1000; t++) {
    const E = randomChoice(ENQUETES.filter((e) => e.cats.length >= k));
    const okT = TOTAUX.filter((T) => T >= k * E.min + k && T <= k * E.max - k);
    if (!okT.length) continue;
    const T = randomChoice(okT);
    const pas = 100 / pgcd(T, 100);
    const ps: number[] = [];
    for (let p = pas; p < 100; p += pas) {
      const e = (T * p) / 100;
      if (p >= 5 && p <= 80 && e >= E.min && e <= E.max) ps.push(p);
    }
    if (!ps.length) continue;
    const p = randomChoice(ps);
    const e = (T * p) / 100;
    const autres = repartir(T - e, k - 1, E.min, E.max, [e]);
    if (!autres) continue;
    const i = randomInt(0, k - 1);
    const vals = [...autres];
    vals.splice(i, 0, e);
    return { E, cats: sample(E.cats, k), vals, T, i, p, e };
  }
  throw new Error("statistiques 4e : aucun tirage d'enquête à total rond");
}

/* ---------------------------------------------------------------------------
   DISCRETES — un caractère qui se compte (0, 1, 2… frères et sœurs), avec
   ses effectifs. `q(v)` pose « Combien … ? » pour la valeur v ; `auMoins(v)`
   pour « au moins v ». Les effectifs valent au moins 2 (« 1 élèves » interdit).
--------------------------------------------------------------------------- */
type Discrete = {
  sujet: string;
  individus: string;
  valeurs: number[];
  eff: [number, number];
  q: (v: number) => string;
  auMoins: (v: number) => string;
  gnMoy: string;
};

const DISCRETES: Discrete[] = [
  {
    sujet: "le nombre de frères et sœurs des élèves d'une classe de 4e", individus: "élèves", valeurs: [0, 1, 2, 3, 4, 5], eff: [2, 9],
    q: (v) => (v === 0 ? "Combien d'élèves n'ont ni frère ni sœur ?" : v === 1 ? "Combien d'élèves ont exactement un frère ou une sœur ?" : `Combien d'élèves ont ${v} frères et sœurs ?`),
    auMoins: (v) => (v === 1 ? "Combien d'élèves ont au moins un frère ou une sœur ?" : `Combien d'élèves ont au moins ${v} frères et sœurs ?`),
    gnMoy: "le nombre moyen de frères et sœurs par élève",
  },
  {
    sujet: "les notes sur 10 obtenues par une classe à une interrogation", individus: "élèves", valeurs: [3, 4, 5, 6, 7, 8, 9, 10], eff: [2, 8],
    q: (v) => `Combien d'élèves ont obtenu ${v} sur 10 ?`,
    auMoins: (v) => `Combien d'élèves ont obtenu au moins ${v} sur 10 ?`,
    gnMoy: "la note moyenne de la classe",
  },
  {
    sujet: "le nombre de livres lus pendant l'été par les élèves d'une classe", individus: "élèves", valeurs: [0, 1, 2, 3, 4, 5, 6], eff: [2, 8],
    q: (v) => (v === 0 ? "Combien d'élèves n'ont lu aucun livre ?" : v === 1 ? "Combien d'élèves ont lu un seul livre ?" : `Combien d'élèves ont lu ${v} livres ?`),
    auMoins: (v) => (v === 1 ? "Combien d'élèves ont lu au moins un livre ?" : `Combien d'élèves ont lu au moins ${v} livres ?`),
    gnMoy: "le nombre moyen de livres lus par élève",
  },
  {
    sujet: "les pointures des paires de baskets vendues un samedi dans un magasin", individus: "paires", valeurs: [36, 37, 38, 39, 40, 41, 42, 43, 44], eff: [2, 12],
    q: (v) => `Combien de paires de pointure ${v} ont été vendues ?`,
    auMoins: (v) => `Combien de paires de pointure ${v} ou plus ont été vendues ?`,
    gnMoy: "la pointure moyenne des paires vendues",
  },
  {
    sujet: "le nombre de personnes par logement dans un immeuble", individus: "logements", valeurs: [1, 2, 3, 4, 5, 6], eff: [2, 10],
    q: (v) => (v === 1 ? "Combien de logements sont occupés par une seule personne ?" : `Combien de logements sont occupés par ${v} personnes ?`),
    auMoins: (v) => `Combien de logements sont occupés par au moins ${v} personnes ?`,
    gnMoy: "le nombre moyen de personnes par logement",
  },
  {
    sujet: "le nombre d'œufs ramassés chaque jour dans un poulailler", individus: "jours", valeurs: [1, 2, 3, 4, 5, 6, 7], eff: [2, 9],
    q: (v) => (v === 1 ? "Pendant combien de jours a-t-on ramassé un seul œuf ?" : `Pendant combien de jours a-t-on ramassé ${v} œufs ?`),
    auMoins: (v) => `Pendant combien de jours a-t-on ramassé au moins ${v} œufs ?`,
    gnMoy: "le nombre moyen d'œufs ramassés par jour",
  },
  {
    sujet: "le nombre de personnes à bord des voitures passées à un péage en dix minutes", individus: "voitures", valeurs: [1, 2, 3, 4, 5], eff: [3, 20],
    q: (v) => (v === 1 ? "Combien de voitures transportaient une seule personne ?" : `Combien de voitures transportaient ${v} personnes ?`),
    auMoins: (v) => `Combien de voitures transportaient au moins ${v} personnes ?`,
    gnMoy: "le nombre moyen de personnes par voiture",
  },
  {
    sujet: "le nombre de paniers réussis sur 10 tirs par les joueurs d'un club de basket", individus: "joueurs", valeurs: [2, 3, 4, 5, 6, 7, 8, 9, 10], eff: [2, 7],
    q: (v) => `Combien de joueurs ont réussi ${v} paniers ?`,
    auMoins: (v) => `Combien de joueurs ont réussi au moins ${v} paniers ?`,
    gnMoy: "le nombre moyen de paniers réussis par joueur",
  },
  {
    sujet: "l'âge des membres d'un atelier théâtre", individus: "membres", valeurs: [10, 11, 12, 13, 14, 15, 16, 17], eff: [2, 9],
    q: (v) => `Combien de membres ont ${v} ans ?`,
    auMoins: (v) => `Combien de membres ont au moins ${v} ans ?`,
    gnMoy: "l'âge moyen des membres",
  },
  {
    sujet: "le nombre de buts marqués par une équipe de football à chaque match de la saison", individus: "matchs", valeurs: [0, 1, 2, 3, 4, 5], eff: [2, 9],
    q: (v) => (v === 0 ? "Lors de combien de matchs l'équipe n'a-t-elle marqué aucun but ?" : v === 1 ? "Lors de combien de matchs l'équipe a-t-elle marqué un seul but ?" : `Lors de combien de matchs l'équipe a-t-elle marqué ${v} buts ?`),
    auMoins: (v) => (v === 1 ? "Lors de combien de matchs l'équipe a-t-elle marqué au moins un but ?" : `Lors de combien de matchs l'équipe a-t-elle marqué au moins ${v} buts ?`),
    gnMoy: "le nombre moyen de buts marqués par match",
  },
  {
    sujet: "le nombre d'écrans (télévisions, ordinateurs, tablettes) par foyer dans un village", individus: "foyers", valeurs: [1, 2, 3, 4, 5, 6], eff: [3, 15],
    q: (v) => (v === 1 ? "Combien de foyers possèdent un seul écran ?" : `Combien de foyers possèdent ${v} écrans ?`),
    auMoins: (v) => `Combien de foyers possèdent au moins ${v} écrans ?`,
    gnMoy: "le nombre moyen d'écrans par foyer",
  },
  {
    sujet: "le nombre de fautes faites à une dictée par les élèves d'une classe", individus: "élèves", valeurs: [0, 1, 2, 3, 4, 5, 6], eff: [2, 8],
    q: (v) => (v === 0 ? "Combien d'élèves n'ont fait aucune faute ?" : v === 1 ? "Combien d'élèves ont fait une seule faute ?" : `Combien d'élèves ont fait ${v} fautes ?`),
    auMoins: (v) => (v === 1 ? "Combien d'élèves ont fait au moins une faute ?" : `Combien d'élèves ont fait au moins ${v} fautes ?`),
    gnMoy: "le nombre moyen de fautes par élève",
  },
];

function tirerDiscret(nVal: number) {
  const D = randomChoice(DISCRETES);
  const start = randomInt(0, D.valeurs.length - nVal);
  const vs = D.valeurs.slice(start, start + nVal);
  const es = vs.map(() => randomInt(D.eff[0], D.eff[1]));
  return { D, vs, es };
}

function listeDiscret(D: Discrete, vs: number[], es: number[]): string {
  return randomChoice([
    vs.map((v, j) => `valeur ${v} : ${es[j]}`).join(" ; "),
    joinEt(vs.map((v, j) => `${es[j]} ${D.individus} pour la valeur ${v}`)),
    `valeurs : ${vs.join(" | ")} — effectifs : ${es.join(" | ")}`,
  ]);
}

function introDiscret(D: Discrete, liste: string): string {
  return randomChoice([
    `Un tableau donne ${D.sujet} : ${liste}.`,
    `Voici le tableau des effectifs pour ${D.sujet} : ${liste}.`,
    `On a relevé ${D.sujet}. Résultats : ${liste}.`,
  ]);
}

/** Effectifs d'un caractère compté dont la moyenne tombe au dixième près. */
function tirerDiscretMoyenneJuste(nMin: number, nMax: number) {
  for (let t = 0; t < 3000; t++) {
    const r = tirerDiscret(randomInt(nMin, nMax));
    const N = somme(r.es);
    const S = somme(r.vs.map((v, j) => v * r.es[j]));
    if ((S * 10) % N === 0) return { ...r, N, S, m: S / N };
  }
  const D = DISCRETES[0];
  return { D, vs: [1, 2, 3], es: [2, 2, 2], N: 6, S: 12, m: 2 };
}

/* ---------------------------------------------------------------------------
   SERIES — séries de mesures. `sujet(p, n)` écrit le groupe nominal pluriel
   (« les 5 notes sur 20 de Léa… ») : le nombre de valeurs annoncé est TOUJOURS
   celui de la liste. `etiq` : étiquettes courtes pour le diagramme.
--------------------------------------------------------------------------- */
type Serie = {
  sujet: (p: string, n: number) => string;
  noms: string;
  u: string;
  min: number;
  max: number;
  pas?: number;
  gnMoy: string;
  gnMed: string;
  etiq: string[];
};

const JOURS = ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."];
const MOIS = ["janv.", "févr.", "mars", "avril", "mai", "juin", "juil."];
const PLANTS = ["plant 1", "plant 2", "plant 3", "plant 4", "plant 5", "plant 6"];

const SERIES: Serie[] = [
  { sujet: (p, n) => `les ${n} notes sur 20 ${deNu(p)} en mathématiques ce trimestre`, noms: "notes", u: "", min: 5, max: 19, gnMoy: "sa moyenne", gnMed: "sa note médiane", etiq: ["DS 1", "DS 2", "DS 3", "DS 4", "DS 5", "DS 6"] },
  { sujet: (_p, n) => `les températures maximales relevées à Lyon pendant ${n} jours de juillet`, noms: "températures", u: " °C", min: 22, max: 36, gnMoy: "la température moyenne", gnMed: "la température médiane", etiq: JOURS },
  { sujet: (_p, n) => `les températures relevées à midi à Lille pendant ${n} jours de mars`, noms: "températures", u: " °C", min: 4, max: 15, gnMoy: "la température moyenne", gnMed: "la température médiane", etiq: JOURS },
  { sujet: (_p, n) => `les tailles des ${n} joueurs d'une équipe de basket`, noms: "tailles", u: " cm", min: 178, max: 206, gnMoy: "la taille moyenne", gnMed: "la taille médiane", etiq: ["Tom", "Enzo", "Adam", "Léo", "Nils", "Omar"] },
  { sujet: (_p, n) => `les temps de ${n} nageuses d'un club sur 50 m nage libre`, noms: "temps", u: " s", min: 29, max: 44, gnMoy: "le temps moyen", gnMed: "le temps médian", etiq: ["Inès", "Chloé", "Zoé", "Jade", "Nina", "Lina"] },
  { sujet: (p, n) => `les nombres de pas faits par ${p} pendant ${n} jours`, noms: "nombres de pas", u: "", min: 3000, max: 12000, pas: 100, gnMoy: "le nombre moyen de pas par jour", gnMed: "le nombre médian de pas par jour", etiq: JOURS },
  { sujet: (_p, n) => `les nombres de baguettes vendues par une boulangerie pendant ${n} jours`, noms: "ventes", u: "", min: 150, max: 320, gnMoy: "le nombre moyen de baguettes vendues par jour", gnMed: "le nombre médian de baguettes vendues par jour", etiq: JOURS },
  { sujet: (_p, n) => `les masses à la naissance des ${n} chatons d'une même portée`, noms: "masses", u: " g", min: 85, max: 130, gnMoy: "la masse moyenne", gnMed: "la masse médiane", etiq: ["chaton 1", "chaton 2", "chaton 3", "chaton 4", "chaton 5", "chaton 6"] },
  { sujet: (_p, n) => `les hauteurs de pluie tombées à Brest pendant ${n} mois`, noms: "hauteurs de pluie", u: " mm", min: 40, max: 130, gnMoy: "la hauteur de pluie moyenne par mois", gnMed: "la hauteur de pluie médiane", etiq: MOIS },
  { sujet: (p, n) => `les distances parcourues à vélo par ${p} lors de ${n} sorties du dimanche`, noms: "distances", u: " km", min: 15, max: 65, gnMoy: "la distance moyenne", gnMed: "la distance médiane", etiq: ["sortie 1", "sortie 2", "sortie 3", "sortie 4", "sortie 5", "sortie 6"] },
  { sujet: (_p, n) => `les scores des ${n} joueurs d'une équipe de bowling lors d'un tournoi`, noms: "scores", u: " points", min: 90, max: 190, gnMoy: "le score moyen", gnMed: "le score médian", etiq: ["Paul", "Lou", "Sami", "Rose", "Malo", "Anna"] },
  { sujet: (p, n) => `les temps d'écran quotidiens ${deNu(p)} pendant ${n} jours`, noms: "temps d'écran", u: " min", min: 45, max: 210, gnMoy: "le temps d'écran moyen par jour", gnMed: "le temps d'écran médian", etiq: JOURS },
  { sujet: (_p, n) => `les prix d'un même casque audio dans ${n} magasins différents`, noms: "prix", u: " €", min: 25, max: 60, gnMoy: "le prix moyen", gnMed: "le prix médian", etiq: ["mag. A", "mag. B", "mag. C", "mag. D", "mag. E", "mag. F"] },
  { sujet: (_p, n) => `les nombres de visiteurs d'un musée pendant ${n} jours`, noms: "nombres de visiteurs", u: "", min: 120, max: 480, gnMoy: "le nombre moyen de visiteurs par jour", gnMed: "le nombre médian de visiteurs par jour", etiq: JOURS },
  { sujet: (_p, n) => `les températures de l'eau relevées pendant ${n} matins dans le lagon de Saint-Gilles, à La Réunion`, noms: "températures", u: " °C", min: 22, max: 29, gnMoy: "la température moyenne de l'eau", gnMed: "la température médiane de l'eau", etiq: JOURS },
  { sujet: (_p, n) => `les consommations d'eau d'une famille pendant ${n} jours`, noms: "consommations", u: " L", min: 250, max: 460, gnMoy: "la consommation moyenne par jour", gnMed: "la consommation médiane", etiq: JOURS },
  { sujet: (_p, n) => `les nombres de tomates récoltées sur les ${n} plants d'un potager`, noms: "récoltes", u: "", min: 8, max: 32, gnMoy: "le nombre moyen de tomates par plant", gnMed: "le nombre médian de tomates par plant", etiq: PLANTS },
  { sujet: (_p, n) => `les temps des ${n} coureurs d'un club sur une course de 10 km`, noms: "temps", u: " min", min: 38, max: 62, gnMoy: "le temps moyen", gnMed: "le temps médian", etiq: ["Marc", "Lise", "Yann", "Sofia", "Karim", "Éva"] },
  { sujet: (_p, n) => `les hauteurs de ${n} plants de haricots trois semaines après le semis`, noms: "hauteurs", u: " cm", min: 12, max: 30, gnMoy: "la hauteur moyenne", gnMed: "la hauteur médiane", etiq: PLANTS },
];

function tirerValeurs(S: Serie, n: number): number[] {
  const pas = S.pas ?? 1;
  const nb = Math.floor((S.max - S.min) / pas);
  return Array.from({ length: n }, () => S.min + randomInt(0, nb) * pas);
}

/** n valeurs dont la moyenne tombe juste : entière, ou au dixième si `dixieme`. */
function tirerMoyenneJuste(S: Serie, n: number, dixieme = false): number[] {
  for (let t = 0; t < 3000; t++) {
    const v = tirerValeurs(S, n);
    if (((dixieme ? 10 : 1) * somme(v)) % n === 0) return v;
  }
  return Array.from({ length: n }, () => S.min);
}

function afficherSerie(S: Serie, vals: number[]): string {
  const avec = vals.map((v) => fr(v) + S.u);
  return randomChoice([
    avec.join(" ; "),
    S.u ? `${vals.map(fr).join(" ; ")} (en ${S.u.trim()})` : vals.map(fr).join(" ; "),
    joinEt(avec),
  ]);
}

function introSerie(S: Serie, p: string, n: number, liste: string): string {
  const s = S.sujet(p, n);
  return randomChoice([
    `${cap(s)} sont : ${liste}.`,
    `Voici ${s} : ${liste}.`,
    `On dispose ${de(s)} : ${liste}.`,
    `Série étudiée : ${s}. Valeurs : ${liste}.`,
  ]);
}

function introSerieRangee(S: Serie, p: string, n: number, liste: string): string {
  const s = S.sujet(p, n);
  return randomChoice([
    `Voici, dans l'ordre croissant, ${s} : ${liste}.`,
    `Série rangée dans l'ordre croissant — ${s} : ${liste}.`,
    `On dispose ${de(s)}. Dans l'ordre croissant, cela donne : ${liste}.`,
  ]);
}

const qMoy = (S: Serie) =>
  randomChoice([`Calcule ${S.gnMoy}.`, `${quel(S.gnMoy)} est ${S.gnMoy} ?`, `Détermine ${S.gnMoy}.`, `Que vaut ${S.gnMoy} ?`]);
const qMed = (S: Serie) =>
  randomChoice([`Détermine ${S.gnMed}.`, `${quel(S.gnMed)} est ${S.gnMed} ?`, `Trouve ${S.gnMed}.`, `Que vaut ${S.gnMed} ?`]);
const qEt = (S: Serie) =>
  randomChoice([
    "Calcule l'étendue de cette série.",
    `Quelle est l'étendue des ${S.noms} ?`,
    "Quel est l'écart entre la plus grande et la plus petite valeur ?",
    "Détermine l'étendue de la série.",
  ]);

const DEF_MOY = "la moyenne d'une série est la somme des valeurs divisée par le nombre de valeurs.";
const DEF_MED = "la médiane partage la série rangée dans l'ordre croissant en deux groupes de même effectif.";
const DEF_ET = "l'étendue d'une série est l'écart entre sa plus grande et sa plus petite valeur.";

function explMediane(vals: number[]): string {
  const s = [...vals].sort((a, b) => a - b);
  const n = s.length;
  const liste = s.map(fr).join(" ; ");
  if (n % 2 === 1) {
    const k = (n + 1) / 2;
    return `rangée : ${liste}. Il y a ${n} valeurs : la ${k}e, ${fr(s[k - 1])}, en laisse ${k - 1} avant elle et ${k - 1} après.`;
  }
  const a = s[n / 2 - 1];
  const b = s[n / 2];
  return `rangée : ${liste}. Il y a ${n} valeurs : les deux valeurs centrales sont la ${n / 2}e (${fr(a)}) et la ${n / 2 + 1}e (${fr(b)}) ; on prend leur moyenne : (${fr(a)} + ${fr(b)}) ÷ 2 = ${fr((a + b) / 2)}.`;
}

/* ---------------------------------------------------------------------------
   COMPARAISONS — deux séries de même moyenne, l'une resserrée, l'autre étalée.
   m : plage de la moyenne ; sp / sg : étendue petite / grande.
--------------------------------------------------------------------------- */
type Comparaison = { a: string; b: string; quoi: string; lequel: string; u: string; m: [number, number]; sp: [number, number]; sg: [number, number] };

const COMPARAISONS: Comparaison[] = [
  { a: "la 4e A", b: "la 4e B", quoi: "les notes au dernier contrôle", lequel: "Quelle classe", u: "", m: [9, 13], sp: [3, 6], sg: [10, 14] },
  { a: "Hugo", b: "Malik", quoi: "les points marqués à chaque match de basket", lequel: "Quel joueur", u: " points", m: [10, 18], sp: [3, 5], sg: [10, 16] },
  { a: "Brest", b: "Strasbourg", quoi: "les températures moyennes de chaque mois", lequel: "Quelle ville", u: " °C", m: [11, 12], sp: [8, 10], sg: [18, 20] },
  { a: "la boulangerie du centre", b: "la boulangerie de la gare", quoi: "les ventes quotidiennes de baguettes", lequel: "Quelle boulangerie", u: "", m: [180, 260], sp: [20, 40], sg: [80, 140] },
  { a: "Inès", b: "Chloé", quoi: "les temps au 50 m nage libre", lequel: "Quelle nageuse", u: " s", m: [33, 38], sp: [2, 3], sg: [6, 9] },
  { a: "l'équipe rouge", b: "l'équipe verte", quoi: "les scores au bowling", lequel: "Quelle équipe", u: " points", m: [120, 150], sp: [10, 20], sg: [50, 80] },
  { a: "le verger du nord", b: "le verger du sud", quoi: "les récoltes de pommes par arbre", lequel: "Quel verger", u: " kg", m: [40, 60], sp: [5, 10], sg: [25, 40] },
  { a: "la ligne 1", b: "la ligne 2", quoi: "les retards des bus", lequel: "Quelle ligne", u: " min", m: [6, 8], sp: [2, 4], sg: [9, 12] },
  { a: "Yanis", b: "Sami", quoi: "les distances lancées au javelot", lequel: "Quel athlète", u: " m", m: [30, 40], sp: [2, 4], sg: [10, 14] },
  { a: "la ruche 1", b: "la ruche 2", quoi: "les récoltes de miel de chaque mois", lequel: "Quelle ruche", u: " kg", m: [8, 14], sp: [2, 4], sg: [8, 12] },
  { a: "Saint-Denis", b: "Saint-Pierre", quoi: "les températures maximales d'une semaine de janvier", lequel: "Quelle ville", u: " °C", m: [29, 31], sp: [2, 3], sg: [5, 7] },
  { a: "le magasin en ligne", b: "le magasin de quartier", quoi: "les délais de livraison", lequel: "Quel magasin", u: " jours", m: [5, 7], sp: [2, 3], sg: [6, 9] },
  { a: "Emma", b: "Jade", quoi: "les notes obtenues en anglais", lequel: "Quelle élève", u: "", m: [11, 14], sp: [2, 4], sg: [8, 12] },
  { a: "la station du col", b: "la station de la vallée", quoi: "les hauteurs de neige mesurées chaque semaine", lequel: "Quelle station", u: " cm", m: [60, 90], sp: [10, 20], sg: [40, 60] },
  { a: "le collège Jules-Ferry", b: "le collège Marie-Curie", quoi: "les effectifs des classes", lequel: "Quel collège", u: " élèves", m: [24, 27], sp: [2, 4], sg: [8, 10] },
];

/** n valeurs de moyenne m et d'étendue E exactement (E ≥ 2). */
function serieAvec(m: number, E: number, n: number): number[] {
  for (let t = 0; t < 3000; t++) {
    const lo = m - randomInt(1, E - 1);
    const hi = lo + E;
    if (lo < 1) continue; // ni délai de 0 jour, ni récolte nulle
    const mids = Array.from({ length: n - 3 }, () => randomInt(lo, hi));
    const last = n * m - lo - hi - somme(mids);
    if (last < lo || last > hi) continue;
    return shuffle([lo, hi, ...mids, last]);
  }
  return [m - 1, m, m + 1].concat(Array(Math.max(0, n - 3)).fill(m));
}

/* =========================================================================
   LES GÉNÉRATEURS — un par forme de question ; les gabarits les appellent.
========================================================================= */

// ---------- stat_donnee : lire un tableau ----------
function genLireTableauCat(): QG {
  const k = randomInt(3, 4);
  const { E, cats, vals } = tirerEnquete(k);
  const i = randomInt(0, k - 1);
  return {
    text: `${introTableau(E, listeCats(cats, vals))} ${questionCat(E, cats[i])}`,
    format: "short",
    expected: [String(vals[i])],
    comparator: "number_equal",
    explanation: expl(
      "l'effectif d'une catégorie est le nombre d'individus qui lui correspondent.",
      `on cherche « ${cats[i].label} » dans le tableau et on lit le nombre qui lui est associé.`,
      `en face de « ${cats[i].label} », on lit ${vals[i]}.`,
      `${vals[i]} ${E.individus} ${cats[i].pred}.`,
    ),
  };
}

function genLireTableauDiscret(): QG {
  const { D, vs, es } = tirerDiscret(randomInt(4, 5));
  const i = randomInt(0, vs.length - 1);
  const v = vs[i];
  const q = randomChoice([D.q(v), `Quel est l'effectif de la valeur ${v} ?`, `Lis dans le tableau l'effectif de la valeur ${v}.`]);
  return {
    text: `${introDiscret(D, listeDiscret(D, vs, es))} ${q}`,
    format: "short",
    expected: [String(es[i])],
    comparator: "number_equal",
    explanation: expl(
      "l'effectif d'une valeur est le nombre d'individus qui ont cette valeur.",
      `on repère la valeur ${v} dans le tableau, puis on lit son effectif.`,
      `la valeur ${v} a pour effectif ${es[i]}.`,
      `la réponse est ${es[i]}.`,
    ),
  };
}

const RELEVES: [string, string][] = [
  ["lors du premier relevé", "lors du second relevé"],
  ["en 2024", "en 2025"],
  ["dans le groupe A", "dans le groupe B"],
  ["au printemps", "à l'automne"],
];

function genTableauDouble(): QG {
  const E = randomChoice(ENQUETES);
  const cats = sample(E.cats, 3);
  const v0 = distincts(3, E.min, E.max);
  const v1 = distincts(3, E.min, E.max);
  const R = randomChoice(RELEVES);
  const style = randomInt(1, 2);
  const i = randomInt(0, 2);
  const r = randomInt(0, 1);
  const lignes = [v0, v1];
  const intro = randomChoice([
    `Un tableau à double entrée donne ${E.sujet}, ${R[0]} et ${R[1]}. ${cap(R[0])} : ${listeCats(cats, v0, style)}. ${cap(R[1])} : ${listeCats(cats, v1, style)}.`,
    `On a étudié à deux reprises ${E.sujet}. ${cap(R[0])}, on a obtenu ${listeCats(cats, v0, style)} ; ${R[1]}, ${listeCats(cats, v1, style)}.`,
    `Voici un tableau à double entrée sur ${E.sujet}. Ligne « ${R[0]} » : ${listeCats(cats, v0, style)}. Ligne « ${R[1]} » : ${listeCats(cats, v1, style)}.`,
  ]);
  const mode = randomInt(0, 3);
  if (mode === 3) {
    const tot = v0[i] + v1[i];
    return {
      text: `${intro} Combien ${deNu(E.individus)} ${cats[i].pred}, en tout, ${R[0]} et ${R[1]} réunis ?`,
      format: "short",
      expected: [String(tot)],
      comparator: "number_equal",
      explanation: expl(
        "dans un tableau à double entrée, chaque case croise une ligne et une colonne.",
        `on lit la colonne « ${cats[i].label} » sur les deux lignes, puis on additionne.`,
        `${v0[i]} + ${v1[i]} = ${tot}.`,
        `au total, ${tot} ${E.individus} ${cats[i].pred}.`,
      ),
    };
  }
  const val = lignes[r][i];
  const q = [
    `Combien ${deNu(E.individus)} ${cats[i].pred}, ${R[r]} ?`,
    `Quel effectif lit-on pour « ${cats[i].label} », ${R[r]} ?`,
    `Quel nombre se trouve dans la case « ${cats[i].label} » de la ligne « ${R[r]} » ?`,
  ][mode];
  return {
    text: `${intro} ${q}`,
    format: "short",
    expected: [String(val)],
    comparator: "number_equal",
    explanation: expl(
      "dans un tableau à double entrée, chaque case croise une ligne et une colonne.",
      `on choisit la ligne « ${R[r]} », puis la colonne « ${cats[i].label} ».`,
      `la case lue contient ${val}.`,
      `${val} ${E.individus} ${cats[i].pred}, ${R[r]}.`,
    ),
  };
}

function genMaxMinTableau(): QG {
  const { E, cats, vals } = tirerEnquete(4);
  const max = Math.random() < 0.5;
  const cible = max ? Math.max(...vals) : Math.min(...vals);
  const i = vals.indexOf(cible);
  const q = max
    ? randomChoice(["Quelle catégorie a le plus grand effectif ?", "Quelle catégorie est la plus représentée ?", `Pour quelle catégorie compte-t-on le plus ${deNu(E.individus)} ?`])
    : randomChoice(["Quelle catégorie a le plus petit effectif ?", "Quelle catégorie est la moins représentée ?", `Pour quelle catégorie compte-t-on le moins ${deNu(E.individus)} ?`]);
  return {
    text: `${introTableau(E, listeCats(cats, vals))} ${q}`,
    format: "qcm",
    choices: shuffle(cats.map((c) => c.label)),
    expected: [cats[i].label],
    comparator: "mcq_exact",
    explanation: expl(
      "on compare les effectifs des catégories.",
      `on cherche le ${max ? "plus grand" : "plus petit"} des nombres du tableau.`,
      `les effectifs sont ${vals.join(", ")} ; le ${max ? "plus grand" : "plus petit"} est ${cible}.`,
      `c'est la catégorie « ${cats[i].label} ».`,
    ),
  };
}

// ---------- stat_donnee : lire un diagramme ----------
function genGrapheLireCat(): QG {
  const { E, cats, vals } = tirerEnquete(randomInt(3, 4));
  const i = randomInt(0, cats.length - 1);
  return {
    text: `${introGraphe(E.sujet, "barres")} ${questionCat(E, cats[i])}`,
    format: "short",
    expected: [String(vals[i])],
    comparator: "number_equal",
    explanation: expl(
      "dans un diagramme en barres, la hauteur d'une barre donne l'effectif de sa catégorie.",
      `on repère la barre « ${cats[i].label} » et on lit sa hauteur.`,
      `la barre « ${cats[i].label} » monte jusqu'à ${vals[i]}.`,
      `${vals[i]} ${E.individus} ${cats[i].pred}.`,
    ),
    canvas: diagramme(cats.map((c) => c.label), vals),
  };
}

function genGrapheEcart(): QG {
  const { E, cats, vals } = tirerEnquete(randomInt(3, 4));
  const [i, j] = sample(cats.map((_, x) => x), 2).sort((x, y) => vals[y] - vals[x]);
  const A = cats[i].label;
  const B = cats[j].label;
  const d = vals[i] - vals[j];
  const q = randomChoice([
    `De combien l'effectif de « ${A} » dépasse-t-il celui de « ${B} » ?`,
    `Quel est l'écart entre les effectifs de « ${A} » et de « ${B} » ?`,
    `Calcule la différence entre la barre « ${A} » et la barre « ${B} ».`,
  ]);
  return {
    text: `${introGraphe(E.sujet, "barres")} ${q}`,
    format: "short",
    expected: [String(d)],
    comparator: "number_equal",
    explanation: expl(
      "la hauteur de chaque barre donne l'effectif de sa catégorie.",
      "on lit les deux barres, puis on soustrait la plus petite de la plus grande.",
      `« ${A} » : ${vals[i]} ; « ${B} » : ${vals[j]} ; ${vals[i]} − ${vals[j]} = ${d}.`,
      `l'écart est de ${d}.`,
    ),
    canvas: diagramme(cats.map((c) => c.label), vals),
  };
}

function genGrapheBatons(): QG {
  const { D, vs, es } = tirerDiscret(randomInt(4, 5));
  const i = randomInt(0, vs.length - 1);
  const v = vs[i];
  const q = randomChoice([D.q(v), `Quel est l'effectif de la valeur ${v} ?`, `Lis la hauteur du bâton de la valeur ${v}.`]);
  return {
    text: `${introGraphe(D.sujet, "bâtons")} ${q}`,
    format: "short",
    expected: [String(es[i])],
    comparator: "number_equal",
    explanation: expl(
      "dans un diagramme en bâtons, la hauteur du bâton placé sur une valeur donne son effectif.",
      `on repère le bâton de la valeur ${v} et on lit sa hauteur.`,
      `le bâton de la valeur ${v} monte jusqu'à ${es[i]}.`,
      `l'effectif est ${es[i]}.`,
    ),
    canvas: diagramme(vs.map(String), es, "batons"),
  };
}

function genGrapheMaxMin(sens: "max" | "min"): QG {
  // Toujours 4 barres : un QCM qui passe de 4 à 3 propositions d'un tirage à
  // l'autre est signalé par scripts/verifier-generateurs.mjs.
  const { E, cats, vals } = tirerEnquete(4);
  const cible = sens === "max" ? Math.max(...vals) : Math.min(...vals);
  const i = vals.indexOf(cible);
  const q = sens === "max"
    ? randomChoice(["Quelle catégorie a le plus grand effectif ?", "Quelle barre est la plus haute ?", `Pour quelle catégorie compte-t-on le plus ${deNu(E.individus)} ?`])
    : randomChoice(["Quelle catégorie a le plus petit effectif ?", "Quelle barre est la plus basse ?", `Pour quelle catégorie compte-t-on le moins ${deNu(E.individus)} ?`]);
  return {
    text: `${introGraphe(E.sujet, "barres")} ${q}`,
    format: "qcm",
    choices: shuffle(cats.map((c) => c.label)),
    expected: [cats[i].label],
    comparator: "mcq_exact",
    explanation: expl(
      "on compare les hauteurs des barres.",
      `on cherche la barre la plus ${sens === "max" ? "haute" : "basse"}.`,
      `les effectifs sont ${vals.join(", ")} ; le ${sens === "max" ? "plus grand" : "plus petit"} est ${cible}.`,
      `c'est la catégorie « ${cats[i].label} ».`,
    ),
    canvas: diagramme(cats.map((c) => c.label), vals),
  };
}

function genGrapheCalcul(): QG {
  const { E, cats, vals } = tirerEnquete(4);
  const labels = cats.map((c) => c.label);
  const mode = randomInt(0, 2);
  let q: string;
  let rep: number;
  let calc: string;
  if (mode === 0) {
    const [i, j] = sample([0, 1, 2, 3], 2).sort((x, y) => x - y);
    rep = vals[i] + vals[j];
    q = randomChoice([
      `Quel est l'effectif total des catégories « ${labels[i]} » et « ${labels[j]} » réunies ?`,
      `Additionne les effectifs de « ${labels[i]} » et de « ${labels[j]} » : quel résultat obtiens-tu ?`,
      `Combien ${deNu(E.individus)} appartiennent à la catégorie « ${labels[i]} » ou à la catégorie « ${labels[j]} » ?`,
    ]);
    calc = `${vals[i]} + ${vals[j]} = ${rep}.`;
  } else if (mode === 1) {
    const tri = [...vals].sort((a, b) => a - b);
    const k = randomInt(0, 2);
    const s = randomInt(tri[k], tri[k + 1] - 1);
    rep = vals.filter((v) => v > s).length;
    q = randomChoice([
      `Combien de catégories ont un effectif strictement supérieur à ${s} ?`,
      `Pour combien de catégories la barre dépasse-t-elle ${s} ?`,
    ]);
    calc = `les effectifs sont ${vals.join(", ")} ; ceux qui dépassent ${s} sont au nombre de ${rep}.`;
  } else {
    rep = somme(vals);
    q = randomChoice([
      "Quel est l'effectif total représenté par ce diagramme ?",
      `Combien ${deNu(E.individus)} le diagramme représente-t-il en tout ?`,
    ]);
    calc = `${vals.join(" + ")} = ${rep}.`;
  }
  return {
    text: `${introGraphe(E.sujet, "barres")} ${q}`,
    format: "short",
    expected: [String(rep)],
    comparator: "number_equal",
    explanation: expl(
      "la hauteur de chaque barre donne l'effectif de sa catégorie.",
      "on lit d'abord les barres utiles, puis on calcule.",
      calc,
      `la réponse est ${rep}.`,
    ),
    canvas: diagramme(labels, vals),
  };
}

// ---------- stat_donnee : effectifs ----------
function genCompterListe(): QG {
  if (Math.random() < 0.5) {
    const E = randomChoice(ENQUETES);
    const cats = sample(E.cats, 3);
    const counts = cats.map(() => randomInt(2, 6));
    const brut = shuffle(cats.flatMap((c, j) => Array.from({ length: counts[j] }, () => c.label)));
    const i = randomInt(0, 2);
    const intro = randomChoice([
      `Voici les réponses brutes d'une enquête sur ${E.sujet} : ${brut.join(", ")}.`,
      `On a noté une à une les données d'une enquête sur ${E.sujet} : ${brut.join(", ")}.`,
      `Relevé brut — ${E.sujet} : ${brut.join(", ")}.`,
    ]);
    const q = randomChoice([
      `Quel est l'effectif de « ${cats[i].label} » ?`,
      `Combien de fois lit-on « ${cats[i].label} » dans cette liste ?`,
      `Compte l'effectif de la catégorie « ${cats[i].label} ».`,
    ]);
    return {
      text: `${intro} ${q}`,
      format: "short",
      expected: [String(counts[i])],
      comparator: "number_equal",
      explanation: expl(
        "l'effectif d'une catégorie est le nombre de fois où elle apparaît.",
        `on compte, un par un, les « ${cats[i].label} » de la liste.`,
        `on en trouve ${counts[i]} ; les deux autres catégories en comptent ${counts.filter((_, j) => j !== i).join(" et ")}, soit ${brut.length} données en tout.`,
        `l'effectif de « ${cats[i].label} » est ${counts[i]}.`,
      ),
    };
  }
  const { D, vs } = tirerDiscret(randomInt(3, 4));
  const counts = vs.map(() => randomInt(2, 6));
  const brut = shuffle(vs.flatMap((v, j) => Array.from({ length: counts[j] }, () => v)));
  const i = randomInt(0, vs.length - 1);
  const v = vs[i];
  const intro = randomChoice([
    `On a relevé ${D.sujet}. Voici les données brutes : ${brut.join(" ; ")}.`,
    `Voici, une à une, les données d'un relevé sur ${D.sujet} : ${brut.join(" ; ")}.`,
    `Données brutes — ${D.sujet} : ${brut.join(" ; ")}.`,
  ]);
  const q = randomChoice([`Quel est l'effectif de la valeur ${v} ?`, `Combien de fois la valeur ${v} apparaît-elle ?`, D.q(v)]);
  return {
    text: `${intro} ${q}`,
    format: "short",
    expected: [String(counts[i])],
    comparator: "number_equal",
    explanation: expl(
      "l'effectif d'une valeur est le nombre de fois où elle apparaît dans la série.",
      `on compte les ${v} de la liste.`,
      `la valeur ${v} apparaît ${counts[i]} fois sur ${brut.length} données.`,
      `l'effectif de la valeur ${v} est ${counts[i]}.`,
    ),
  };
}

function genTotalTableau(): QG {
  const { E, cats, vals } = tirerEnquete(randomInt(3, 5));
  const tot = somme(vals);
  return {
    text: `${introTableau(E, listeCats(cats, vals))} ${questionTotal(E.individus)}`,
    format: "short",
    expected: [String(tot)],
    comparator: "number_equal",
    explanation: expl(
      "l'effectif total est la somme des effectifs de toutes les catégories.",
      "on additionne tous les nombres du tableau.",
      `${vals.join(" + ")} = ${tot}.`,
      `l'effectif total est ${tot}.`,
    ),
  };
}

function genTotalGraphique(): QG {
  if (Math.random() < 0.5) {
    const { E, cats, vals } = tirerEnquete(randomInt(3, 4));
    const tot = somme(vals);
    return {
      text: `${introGraphe(E.sujet, "barres")} ${questionTotal(E.individus)}`,
      format: "short",
      expected: [String(tot)],
      comparator: "number_equal",
      explanation: expl(
        "l'effectif total est la somme des effectifs de toutes les catégories.",
        "on lit la hauteur de chaque barre, puis on additionne.",
        `${vals.join(" + ")} = ${tot}.`,
        `l'effectif total est ${tot}.`,
      ),
      canvas: diagramme(cats.map((c) => c.label), vals),
    };
  }
  const { D, vs, es } = tirerDiscret(randomInt(4, 5));
  const tot = somme(es);
  return {
    text: `${introGraphe(D.sujet, "bâtons")} ${questionTotal(D.individus)}`,
    format: "short",
    expected: [String(tot)],
    comparator: "number_equal",
    explanation: expl(
      "l'effectif total est la somme des effectifs de toutes les valeurs.",
      "on lit la hauteur de chaque bâton, puis on additionne.",
      `${es.join(" + ")} = ${tot}.`,
      `l'effectif total est ${tot}.`,
    ),
    canvas: diagramme(vs.map(String), es, "batons"),
  };
}

function genTotalDiscret(): QG {
  const { D, vs, es } = tirerDiscret(randomInt(4, 5));
  const tot = somme(es);
  return {
    text: `${introDiscret(D, listeDiscret(D, vs, es))} ${questionTotal(D.individus)}`,
    format: "short",
    expected: [String(tot)],
    comparator: "number_equal",
    explanation: expl(
      "l'effectif total est la somme des effectifs de toutes les valeurs.",
      "on additionne les effectifs, pas les valeurs.",
      `${es.join(" + ")} = ${tot}.`,
      tot === somme(vs) ? `l'effectif total est ${tot}.` : `l'effectif total est ${tot} (et non ${somme(vs)}, la somme des valeurs).`,
    ),
  };
}

function genEffectifManquant(): QG {
  const k = randomInt(3, 4);
  const { E, cats, vals } = tirerEnquete(k);
  const i = randomInt(0, k - 1);
  const T = somme(vals);
  const connus = cats.map((c, j) => ({ c, v: vals[j] })).filter((_, j) => j !== i);
  const liste = listeCats(connus.map((x) => x.c), connus.map((x) => x.v));
  const intro = randomChoice([
    `Une enquête porte sur ${E.sujet}. L'effectif total est ${T}. Le tableau indique : ${liste}, mais l'effectif de « ${cats[i].label} » a été effacé.`,
    `Dans un tableau qui résume ${E.sujet}, on lit : ${liste}. La case « ${cats[i].label} » est vide, et l'effectif total vaut ${T}.`,
    `On a étudié ${E.sujet} : ${T} ${E.individus} en tout. Résultats connus : ${liste}. Il manque l'effectif de « ${cats[i].label} ».`,
  ]);
  const q = randomChoice([
    `Combien ${deNu(E.individus)} ${cats[i].pred} ?`,
    "Quel est l'effectif manquant ?",
    `Retrouve l'effectif de « ${cats[i].label} ».`,
  ]);
  const autres = connus.map((x) => x.v);
  return {
    text: `${intro} ${q}`,
    format: "short",
    expected: [String(vals[i])],
    comparator: "number_equal",
    explanation: expl(
      "la somme des effectifs de toutes les catégories redonne l'effectif total.",
      "on retire du total les effectifs connus.",
      `${autres.join(" + ")} = ${somme(autres)}, et ${T} − ${somme(autres)} = ${vals[i]}.`,
      `l'effectif de « ${cats[i].label} » est ${vals[i]}.`,
    ),
  };
}

function genAuMoins(): QG {
  const { D, vs, es } = tirerDiscret(randomInt(4, 5));
  const j = randomInt(1, vs.length - 1);
  const v = vs[j];
  const auMoins = Math.random() < 0.6;
  const garde = auMoins ? es.slice(j) : es.slice(0, j);
  const rep = somme(garde);
  const q = auMoins
    ? randomChoice([D.auMoins(v), `Combien ${deNu(D.individus)} correspondent à une valeur supérieure ou égale à ${v} ?`])
    : `Combien ${deNu(D.individus)} correspondent à une valeur strictement inférieure à ${v} ?`;
  return {
    text: `${introDiscret(D, listeDiscret(D, vs, es))} ${q}`,
    format: "short",
    expected: [String(rep)],
    comparator: "number_equal",
    explanation: expl(
      "l'effectif d'un groupe de valeurs est la somme de leurs effectifs.",
      auMoins ? `on garde les valeurs ${v} et plus : ${vs.slice(j).join(", ")}.` : `on garde les valeurs inférieures à ${v} : ${vs.slice(0, j).join(", ")}.`,
      `${garde.join(" + ")} = ${rep}.`,
      `la réponse est ${rep}.`,
    ),
  };
}

// ---------- stat_donnee : fréquences ----------
type Forme = "decimal" | "pourcentage" | "fraction";

function demandeForme(f: Forme): string {
  if (f === "decimal") return randomChoice(["Donne-la sous forme décimale.", "Écris-la sous forme d'un nombre décimal."]);
  if (f === "pourcentage") return randomChoice(["Exprime-la en pourcentage.", "Donne le résultat en pourcentage."]);
  return randomChoice(["Donne-la sous forme de fraction.", "Écris-la sous forme d'une fraction."]);
}

function attenduFreq(f: Forme, e: number, T: number, p: number): string[] {
  if (f === "decimal") return [formatNumber(e / T)];
  if (f === "pourcentage") return [String(p), `${p} %`];
  const g = pgcd(e, T);
  return Array.from(new Set([`${e / g}/${T / g}`, `${e}/${T}`]));
}

function ecritFreq(f: Forme, e: number, T: number, p: number): string {
  if (f === "decimal") return `${e} ÷ ${T} = ${fr(e / T)}`;
  if (f === "pourcentage") return `${e} ÷ ${T} = ${fr(e / T)}, soit ${p} %`;
  const g = pgcd(e, T);
  return g > 1 ? `${e}/${T} = ${e / g}/${T / g}` : `${e}/${T}`;
}

function questionFreq(E: Enquete, c: Cat): string {
  return randomChoice([
    `Quelle est la fréquence de la catégorie « ${c.label} » ?`,
    `Calcule la fréquence des ${E.individus} qui ${c.pred}.`,
    `Quelle est la fréquence des ${E.individus} qui ${c.pred} ?`,
  ]);
}

function genFreq(forme: Forme, source: "texte" | "tableau" | "graphique"): QG {
  const { E, cats, vals, T, i, p, e } = tirerEnqueteTotal(source === "texte" ? 3 : randomInt(3, 4));
  const c = cats[i];
  let intro: string;
  if (source === "texte") {
    intro = randomChoice([
      `${e} ${E.individus} sur ${T} ${c.pred}.`,
      `Parmi ${T} ${E.individus}, ${e} ${c.pred}.`,
      `Dans une enquête sur ${E.sujet}, ${e} ${E.individus} sur ${T} ${c.pred}.`,
    ]);
  } else if (source === "tableau") {
    intro = introTableau(E, listeCats(cats, vals));
  } else {
    intro = introGraphe(E.sujet, "barres");
  }
  const calcTotal = source === "texte" ? "" : `effectif total : ${vals.join(" + ")} = ${T}. `;
  return {
    text: `${intro} ${questionFreq(E, c)} ${demandeForme(forme)}`,
    format: "short",
    expected: attenduFreq(forme, e, T, p),
    comparator: "number_equal",
    explanation: expl(
      "la fréquence d'une catégorie est son effectif divisé par l'effectif total.",
      source === "texte" ? "on divise l'effectif de la catégorie par l'effectif total." : "on calcule d'abord l'effectif total, puis on divise.",
      `${calcTotal}fréquence de « ${c.label} » : ${ecritFreq(forme, e, T, p)}.`,
      `la fréquence est ${forme === "pourcentage" ? `${p} %` : forme === "decimal" ? fr(e / T) : attenduFreq("fraction", e, T, p)[0]}.`,
    ),
    ...(source === "graphique" ? { canvas: diagramme(cats.map((x) => x.label), vals) } : {}),
  };
}

function genFreqQCM(): QG {
  const { E, cats, T, i, p, e } = tirerEnqueteTotal(3);
  const c = cats[i];
  const intro = randomChoice([
    `${e} ${E.individus} sur ${T} ${c.pred}.`,
    `Parmi ${T} ${E.individus}, ${e} ${c.pred}.`,
    `Dans une enquête sur ${E.sujet}, ${e} ${E.individus} sur ${T} ${c.pred}.`,
  ]);
  const enPct = Math.random() < 0.5;
  const f = e / T;
  const correct = enPct ? `${p} %` : fr(f);
  const wrongs = enPct
    ? [`${e} %`, `${100 - p} %`, `${fr(f)} %`, ...(T < 100 ? [`${T} %`] : []), `${Math.min(99, p + 10)} %`, `${Math.max(1, p - 10)} %`]
    : [String(e), fr(1 - f), ...(exact2(T / e) ? [fr(T / e)] : []), fr(e / 100), fr(f + 0.1), ...(f >= 0.2 ? [fr(f - 0.1)] : [])];
  return {
    text: `${intro} ${questionFreq(E, c)} ${enPct ? demandeForme("pourcentage") : demandeForme("decimal")}`,
    format: "qcm",
    choices: choixValeurs(correct, wrongs),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: expl(
      "la fréquence d'une catégorie est son effectif divisé par l'effectif total.",
      "on divise l'effectif de la catégorie par l'effectif total.",
      `${ecritFreq(enPct ? "pourcentage" : "decimal", e, T, p)}.`,
      `la fréquence est ${correct}.`,
    ),
  };
}

// ---------- stat_donnee : défis ----------
function genDefiFreqRegroupee(): QG {
  const k = randomInt(3, 4);
  const { E, cats, vals, T, i, p } = tirerEnqueteTotal(k);
  const autres = cats.filter((_, j) => j !== i);
  const eAutres = T - vals[i];
  const pAutres = 100 - p;
  const simple = Math.random() < 0.34;
  const q = simple
    ? `Quelle est la fréquence de la catégorie « ${cats[i].label} », en pourcentage ?`
    : k === 3
      ? `Quelle est la fréquence des catégories « ${autres[0].label} » et « ${autres[1].label} » réunies, en pourcentage ?`
      : `Quelle est, en pourcentage, la fréquence de toutes les catégories autres que « ${cats[i].label} » ?`;
  const eRep = simple ? vals[i] : eAutres;
  const pRep = simple ? p : pAutres;
  return {
    text: `${introGraphe(E.sujet, "barres")} ${q}`,
    format: "short",
    expected: [String(pRep), `${pRep} %`],
    comparator: "number_equal",
    explanation: expl(
      "une fréquence est un effectif rapporté au TOTAL de toutes les catégories.",
      "on additionne d'abord toutes les barres, puis on divise l'effectif voulu par ce total.",
      `total : ${vals.join(" + ")} = ${T}. Effectif voulu : ${eRep}. ${eRep} ÷ ${T} = ${fr(eRep / T)}, soit ${pRep} %.`,
      `⚠️ diviser par l'effectif d'une autre catégorie donnerait un rapport entre deux catégories, pas une fréquence. La réponse est ${pRep} %.`,
    ),
    canvas: diagramme(cats.map((c) => c.label), vals),
  };
}

function genDefiEffaceGraphe(): QG {
  const k = randomInt(3, 4);
  const { E, cats, vals } = tirerEnquete(k);
  const i = randomInt(0, k - 1);
  const T = somme(vals);
  const connus = vals.filter((_, j) => j !== i);
  const q = randomChoice([
    `Combien ${deNu(E.individus)} ${cats[i].pred} ?`,
    "Quel est l'effectif de la catégorie effacée ?",
    "Retrouve l'effectif manquant.",
  ]);
  return {
    text: `${introGraphe(E.sujet, "barres")} L'effectif total est ${T}, mais la barre « ${cats[i].label} » a été effacée. ${q}`,
    format: "short",
    expected: [String(vals[i])],
    comparator: "number_equal",
    explanation: expl(
      "la somme des effectifs de toutes les catégories redonne toujours le total.",
      "on additionne les barres visibles, puis on les retire du total.",
      `${connus.join(" + ")} = ${somme(connus)}, et ${T} − ${somme(connus)} = ${vals[i]}.`,
      `⭐ ce contrôle par la somme sert aussi à repérer une erreur de saisie. L'effectif de « ${cats[i].label} » est ${vals[i]}.`,
    ),
    canvas: diagramme(cats.filter((_, j) => j !== i).map((c) => c.label), connus),
  };
}

function genDefiEcart(): QG {
  const { E, cats, vals } = tirerEnquete(4);
  const iMax = vals.indexOf(Math.max(...vals));
  const iMin = vals.indexOf(Math.min(...vals));
  const ecart = vals[iMax] - vals[iMin];
  const q = randomChoice([
    "De combien la catégorie la plus représentée dépasse-t-elle la moins représentée ?",
    "Quel écart sépare la barre la plus haute de la barre la plus basse ?",
    `Combien ${deNu(E.individus)} de plus compte la catégorie la plus fréquente par rapport à la moins fréquente ?`,
  ]);
  return {
    text: `${introGraphe(E.sujet, "barres")} ${q}`,
    format: "qcm",
    choices: choixValeurs(String(ecart), [
      String(vals[iMax]),
      String(vals[iMin]),
      String(vals[iMax] + vals[iMin]),
      String(Math.round(somme(vals) / 4)),
      String(ecart + 1),
      String(ecart - 1),
    ]),
    expected: [String(ecart)],
    comparator: "mcq_exact",
    explanation: expl(
      "la question ne demande ni le maximum ni le minimum, mais leur ÉCART.",
      "on repère les deux barres extrêmes, puis on soustrait.",
      `« ${cats[iMax].label} » : ${vals[iMax]} et « ${cats[iMin].label} » : ${vals[iMin]}, soit ${vals[iMax]} − ${vals[iMin]} = ${ecart}.`,
      `⚠️ répondre ${vals[iMax]} serait donner le maximum au lieu de l'écart. La réponse est ${ecart}.`,
    ),
    canvas: diagramme(cats.map((c) => c.label), vals),
  };
}

function genDefiCamembert(): QG {
  const k = randomInt(3, 4);
  const E = randomChoice(ENQUETES);
  const cats = sample(E.cats, k);
  let pcts: number[] | null = null;
  while (!pcts) pcts = repartir(20, k, 2, 12, []);
  const ps = (pcts as number[]).map((x) => x * 5);
  // N multiple de 20 : N × (multiple de 5) ÷ 100 tombe juste. Et N reste
  // plausible pour le contexte (pas 1 200 oiseaux dans un jardin).
  const okN = [20, 40, 60, 80, 100, 120, 160, 200, 300, 400, 500, 600, 800, 1000, 1200].filter(
    (x) => x >= k * E.min && x <= k * E.max,
  );
  const N = randomChoice(okN.length ? okN : [100]);
  const i = randomInt(0, k - 1);
  const e = (N * ps[i]) / 100;
  const liste = randomChoice([
    cats.map((c, j) => `${c.label} : ${ps[j]} %`).join(" ; "),
    joinEt(cats.map((c, j) => `${ps[j]} % pour « ${c.label} »`)),
  ]);
  const intro = randomChoice([
    `Le diagramme circulaire donne la répartition, en pourcentage, ${de(E.sujet)} : ${liste}. L'enquête porte sur ${N} ${E.individus}.`,
    `Une enquête sur ${E.sujet} porte sur ${N} ${E.individus}. Le diagramme circulaire indique : ${liste}.`,
  ]);
  const q = randomChoice([
    `Combien ${deNu(E.individus)} ${cats[i].pred} ?`,
    `Quel est l'effectif de la catégorie « ${cats[i].label} » ?`,
    `Calcule le nombre ${deNu(E.individus)} qui ${cats[i].pred}.`,
  ]);
  return {
    text: `${intro} ${q}`,
    format: "short",
    expected: [String(e)],
    comparator: "number_equal",
    explanation: expl(
      "un pourcentage est une fréquence : effectif = fréquence × effectif total.",
      `on prend ${ps[i]} % des ${N} ${E.individus}.`,
      `${ps[i]} % de ${fr(N)} = ${fr(N)} × ${ps[i]} ÷ 100 = ${fr(e)}.`,
      `⚠️ répondre ${ps[i]} serait confondre le pourcentage et l'effectif. La réponse est ${fr(e)}.`,
    ),
    canvas: statGraphCanvas({
      graphType: "camembert",
      data: cats.map((c, j) => ({ label: c.label, value: ps[j] })),
      display: { showLabels: true, showValues: false },
      size: { width: 320, height: 220 },
    }),
  };
}

// ---------- stat_statistique : moyenne ----------
function genMoyenne(nMin: number, nMax: number, dixieme: boolean): QG {
  const S = randomChoice(SERIES);
  const p = randomChoice(PRENOMS);
  const n = randomInt(nMin, nMax);
  const vals = tirerMoyenneJuste(S, n, dixieme);
  const s = somme(vals);
  const m = s / n;
  return {
    text: `${introSerie(S, p, n, afficherSerie(S, vals))} ${qMoy(S)}`,
    format: "short",
    expected: [formatNumber(m)],
    comparator: "number_equal",
    explanation: expl(
      DEF_MOY,
      `on additionne les ${n} valeurs, puis on divise par ${n}.`,
      `(${vals.map(fr).join(" + ")}) ÷ ${n} = ${fr(s)} ÷ ${n} = ${fr(m)}.`,
      `${S.gnMoy} est ${fr(m)}${S.u}.`,
    ),
  };
}

function genMoyennePonderee(source: "tableau" | "graphe"): QG {
  const { D, vs, es, N, S, m } = tirerDiscretMoyenneJuste(3, 5);
  const intro = source === "tableau" ? introDiscret(D, listeDiscret(D, vs, es)) : introGraphe(D.sujet, "bâtons");
  const q = randomChoice([
    `Calcule ${D.gnMoy}.`,
    `${quel(D.gnMoy)} est ${D.gnMoy} ?`,
    `Détermine ${D.gnMoy}, en tenant compte des effectifs.`,
  ]);
  return {
    text: `${intro} ${q}`,
    format: "short",
    expected: [formatNumber(m)],
    comparator: "number_equal",
    explanation: expl(
      "avec des effectifs, chaque valeur compte autant de fois que son effectif (moyenne pondérée).",
      "on multiplie chaque valeur par son effectif, on additionne, puis on divise par l'effectif total.",
      `(${vs.map((v, j) => `${v} × ${es[j]}`).join(" + ")}) ÷ (${es.join(" + ")}) = ${fr(S)} ÷ ${N} = ${fr(m)}.`,
      `${D.gnMoy} est ${fr(m)}. ⚠️ Diviser par ${vs.length} (le nombre de valeurs différentes) serait faux.`,
    ),
    ...(source === "graphe" ? { canvas: diagramme(vs.map(String), es, "batons") } : {}),
  };
}

function genValeurManquante(style: "manque" | "objectif"): QG {
  for (let t = 0; t < 3000; t++) {
    const S = randomChoice(SERIES);
    const p = randomChoice(PRENOMS);
    const n = randomInt(4, 6);
    const pas = S.pas ?? 1;
    const known = tirerValeurs(S, n - 1);
    const quart = Math.floor((S.max - S.min) / 4 / pas) * pas;
    const m = S.min + quart + Math.round(randomInt(0, S.max - S.min - 2 * quart) / pas) * pas;
    const x = n * m - somme(known);
    if (x < S.min || x > S.max || x % pas !== 0) continue;
    const s = S.sujet(p, n);
    const liste = afficherSerie(S, known);
    const text = style === "manque"
      ? `On étudie ${s}. Une valeur a été perdue ; les ${n - 1} autres sont : ${liste}. La moyenne des ${n} valeurs est ${fr(m)}${S.u}. ${randomChoice(["Quelle est la valeur perdue ?", "Retrouve la valeur manquante.", "Que vaut la valeur perdue ?"])}`
      : `On étudie ${s}. Les ${n - 1} premières valeurs sont : ${liste}. ${randomChoice([
          `Quelle doit être la dernière valeur pour que la moyenne soit égale à ${fr(m)}${S.u} ?`,
          `Quelle dernière valeur faut-il pour obtenir une moyenne de ${fr(m)}${S.u} ?`,
          `Pour que la moyenne des ${n} valeurs atteigne exactement ${fr(m)}${S.u}, que doit valoir la ${n}e ?`,
        ])}`;
    return {
      text,
      format: "short",
      expected: [formatNumber(x)],
      comparator: "number_equal",
      explanation: expl(
        "somme des valeurs = moyenne × nombre de valeurs.",
        "on calcule la somme qu'il faut atteindre, puis on retire la somme des valeurs connues.",
        `somme nécessaire : ${fr(m)} × ${n} = ${fr(n * m)} ; valeurs connues : ${known.map(fr).join(" + ")} = ${fr(somme(known))} ; ${fr(n * m)} − ${fr(somme(known))} = ${fr(x)}.`,
        `la valeur cherchée est ${fr(x)}${S.u}.`,
      ),
    };
  }
  return genMoyenne(3, 3, false);
}

// ---------- stat_statistique : médiane ----------
function genMediane(ns: number[], rangee: boolean): QG {
  const S = randomChoice(SERIES);
  const p = randomChoice(PRENOMS);
  const n = randomChoice(ns);
  const vals = tirerValeurs(S, n);
  const sorted = [...vals].sort((a, b) => a - b);
  const med = mediane(vals);
  const liste = afficherSerie(S, rangee ? sorted : vals);
  return {
    text: `${rangee ? introSerieRangee(S, p, n, liste) : introSerie(S, p, n, liste)} ${qMed(S)}`,
    format: "short",
    expected: [formatNumber(med)],
    comparator: "number_equal",
    explanation: expl(
      DEF_MED,
      rangee ? "la série est déjà rangée : on repère le milieu." : "on range d'abord la série dans l'ordre croissant, puis on repère le milieu.",
      `série ${explMediane(vals)}`,
      `${S.gnMed} est ${fr(med)}${S.u}.`,
    ),
  };
}

// ---------- stat_statistique : étendue ----------
function genEtendueMinMax(): QG {
  const S = randomChoice(SERIES);
  const p = randomChoice(PRENOMS);
  const n = randomInt(5, 7);
  let [a, b] = tirerValeurs(S, 2);
  while (a === b) [a, b] = tirerValeurs(S, 2);
  const min = Math.min(a, b);
  const max = Math.max(a, b);
  const s = S.sujet(p, n);
  const MIN = `${fr(min)}${S.u}`;
  const MAX = `${fr(max)}${S.u}`;
  const intro = randomChoice([
    `On étudie ${s}. La plus grande valeur est ${MAX} et la plus petite est ${MIN}.`,
    `Parmi ${s}, la valeur maximale est ${MAX} et la valeur minimale est ${MIN}.`,
    `${cap(s)} vont de ${MIN} à ${MAX}.`,
  ]);
  return {
    text: `${intro} ${qEt(S)}`,
    format: "short",
    expected: [formatNumber(max - min)],
    comparator: "number_equal",
    explanation: expl(DEF_ET, "on soustrait la plus petite valeur de la plus grande.", `${fr(max)} − ${fr(min)} = ${fr(max - min)}.`, `l'étendue est ${fr(max - min)}${S.u}.`),
  };
}

function genEtendue(ns: number[], rangee: boolean): QG {
  const S = randomChoice(SERIES);
  const p = randomChoice(PRENOMS);
  const n = randomChoice(ns);
  let vals = tirerValeurs(S, n);
  while (etendue(vals) === 0) vals = tirerValeurs(S, n);
  const sorted = [...vals].sort((a, b) => a - b);
  const min = sorted[0];
  const max = sorted[n - 1];
  const liste = afficherSerie(S, rangee ? sorted : vals);
  return {
    text: `${rangee ? introSerieRangee(S, p, n, liste) : introSerie(S, p, n, liste)} ${qEt(S)}`,
    format: "short",
    expected: [formatNumber(max - min)],
    comparator: "number_equal",
    explanation: expl(
      DEF_ET,
      rangee ? "la série est rangée : la plus petite valeur est la première, la plus grande la dernière." : "on repère la plus grande et la plus petite valeur, puis on soustrait.",
      `maximum : ${fr(max)} ; minimum : ${fr(min)} ; ${fr(max)} − ${fr(min)} = ${fr(max - min)}.`,
      `l'étendue est ${fr(max - min)}${S.u}.`,
    ),
  };
}

function genEtendueGraphe(): QG {
  const S = randomChoice(SERIES);
  const p = randomChoice(PRENOMS);
  const n = randomInt(4, 6);
  let vals = tirerValeurs(S, n);
  while (etendue(vals) === 0) vals = tirerValeurs(S, n);
  const s = S.sujet(p, n);
  const intro = randomChoice([
    `Le diagramme en barres donne ${s}.`,
    `On a représenté ${s} par un diagramme en barres.`,
    `Observe le diagramme : il représente ${s}.`,
  ]);
  const q = randomChoice([`D'après le diagramme, quelle est l'étendue des ${S.noms} ?`, "Calcule l'étendue de la série représentée.", qEt(S)]);
  const max = Math.max(...vals);
  const min = Math.min(...vals);
  return {
    text: `${intro} ${q}`,
    format: "short",
    expected: [formatNumber(max - min)],
    comparator: "number_equal",
    explanation: expl(DEF_ET, "on repère la barre la plus haute et la barre la plus basse.", `maximum : ${fr(max)} ; minimum : ${fr(min)} ; ${fr(max)} − ${fr(min)} = ${fr(max - min)}.`, `l'étendue est ${fr(max - min)}${S.u}.`),
    canvas: diagramme(S.etiq.slice(0, n), vals),
  };
}

// ---------- stat_statistique : interpréter ----------
function genCompareEtendue(mode: "disperse" | "regulier"): QG {
  const C = randomChoice(COMPARAISONS);
  const m = randomInt(C.m[0], C.m[1]);
  const ep = randomInt(C.sp[0], C.sp[1]);
  const eg = randomInt(C.sg[0], C.sg[1]);
  const aLarge = Math.random() < 0.5;
  const eA = aLarge ? eg : ep;
  const eB = aLarge ? ep : eg;
  const large = aLarge ? C.a : C.b;
  const serre = aLarge ? C.b : C.a;
  const intro = randomChoice([
    `On compare ${C.quoi} ${de(C.a)} et ${de(C.b)}. Les deux séries ont la même moyenne : ${m}${C.u}. Étendue pour ${C.a} : ${eA}${C.u} ; pour ${C.b} : ${eB}${C.u}.`,
    `${cap(C.quoi)} ${de(C.a)} et ${de(C.b)} ont la même moyenne, ${m}${C.u}. L'étendue vaut ${eA}${C.u} pour ${C.a} et ${eB}${C.u} pour ${C.b}.`,
    `Moyenne commune : ${m}${C.u}. Étendues : ${eA}${C.u} pour ${C.a}, ${eB}${C.u} pour ${C.b}. Il s'agit ${de(C.quoi)}.`,
  ]);
  const q = mode === "disperse"
    ? randomChoice([`${C.lequel} présente la série la plus dispersée ?`, "Pour laquelle des deux séries les valeurs sont-elles les plus étalées ?"])
    : randomChoice([`${C.lequel} présente la série la plus régulière ?`, "Laquelle des deux séries a les valeurs les plus regroupées ?"]);
  const correct = cap(mode === "disperse" ? large : serre);
  return {
    text: `${intro} ${q}`,
    format: "qcm",
    choices: shuffle([cap(C.a), cap(C.b), "On ne peut pas savoir", mode === "disperse" ? "Les deux séries sont aussi dispersées" : "Les deux séries sont aussi régulières"]),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: expl(
      "à moyenne égale, l'étendue renseigne sur la dispersion : plus elle est grande, plus les valeurs sont étalées.",
      "les moyennes sont égales, on compare donc les étendues.",
      `${Math.max(eA, eB)}${C.u} > ${Math.min(eA, eB)}${C.u} : la série ${de(large)} est la plus étalée, celle ${de(serre)} la plus regroupée.`,
      `la réponse est : ${correct}.`,
    ),
  };
}

function genCompareSeries(): QG {
  const C = randomChoice(COMPARAISONS);
  const m = randomInt(C.m[0], C.m[1]);
  const ep = Math.max(2, randomInt(C.sp[0], C.sp[1]));
  const eg = randomInt(C.sg[0], C.sg[1]);
  const aLarge = Math.random() < 0.5;
  const A = serieAvec(m, aLarge ? eg : ep, 5);
  const B = serieAvec(m, aLarge ? ep : eg, 5);
  const regulier = Math.random() < 0.5;
  const cible = regulier ? (aLarge ? C.b : C.a) : (aLarge ? C.a : C.b);
  // « 1 jour », pas « 1 jours » (les retards et les délais peuvent valoir 1).
  const fmt = (xs: number[]) => xs.map((x) => `${x}${x <= 1 && C.u.endsWith("s") ? C.u.slice(0, -1) : C.u}`).join(" ; ");
  const intro = randomChoice([
    `Voici ${C.quoi} ${de(C.a)} : ${fmt(A)}, et ${de(C.b)} : ${fmt(B)}. Les deux séries ont la même moyenne, ${m}${C.u}.`,
    `On compare ${C.quoi}. ${cap(C.a)} : ${fmt(A)}. ${cap(C.b)} : ${fmt(B)}. Dans les deux cas, la moyenne vaut ${m}${C.u}.`,
  ]);
  const q = regulier
    ? randomChoice([`${C.lequel} présente la série la plus régulière ?`, "Laquelle des deux séries a les valeurs les plus regroupées ?"])
    : randomChoice([`${C.lequel} présente la série la plus dispersée ?`, "Pour laquelle des deux séries les valeurs sont-elles les plus étalées ?"]);
  return {
    text: `${intro} ${q}`,
    format: "qcm",
    choices: shuffle([cap(C.a), cap(C.b), "On ne peut pas savoir", regulier ? "Les deux séries sont aussi régulières" : "Les deux séries sont aussi dispersées"]),
    expected: [cap(cible)],
    comparator: "mcq_exact",
    explanation: expl(
      "à moyenne égale, on compare la dispersion avec l'étendue.",
      "on calcule l'étendue de chaque série : plus grande valeur − plus petite valeur.",
      `${C.a} : ${Math.max(...A)} − ${Math.min(...A)} = ${etendue(A)}${C.u} ; ${C.b} : ${Math.max(...B)} − ${Math.min(...B)} = ${etendue(B)}${C.u}.`,
      `la plus ${regulier ? "petite" : "grande"} étendue est celle ${de(cible)} : la réponse est ${cap(cible)}.`,
    ),
  };
}

function genSensIndicateur(): QG {
  const S = randomChoice(SERIES);
  const p = randomChoice(PRENOMS);
  const n = randomInt(5, 9);
  const indic = randomChoice<"médiane" | "moyenne" | "étendue">(["médiane", "moyenne", "étendue"]);
  const pas = S.pas ?? 1;
  const v = indic === "étendue"
    ? Math.max(pas, Math.round(randomInt(Math.floor((S.max - S.min) / 4), S.max - S.min) / pas) * pas)
    : tirerValeurs(S, 1)[0];
  const V = `${fr(v)}${S.u}`;
  const art = indic === "étendue" ? "L'étendue" : indic === "médiane" ? "La médiane" : "La moyenne";
  const intro = `On étudie ${S.sujet(p, n)}. ${art} de cette série vaut ${V}.`;
  const q = randomChoice(["Que peut-on affirmer avec certitude ?", "Quelle affirmation est forcément vraie ?", "Laquelle de ces phrases est sûrement exacte ?"]);
  let correct: string;
  let wrongs: string[];
  let pourquoi: string;
  if (indic === "médiane") {
    correct = `Au moins la moitié des valeurs sont inférieures ou égales à ${V}.`;
    wrongs = [`Toutes les valeurs sont égales à ${V}.`, `La moyenne de la série est ${V}.`, `La plus grande valeur de la série est ${V}.`, `Exactement la moitié des valeurs sont égales à ${V}.`];
    pourquoi = "la médiane partage la série rangée en deux groupes de même effectif : au moins la moitié des valeurs sont en dessous (ou égales), au moins la moitié au-dessus.";
  } else if (indic === "moyenne") {
    correct = `La somme des ${n} valeurs est ${fr(n * v)}${S.u}.`;
    wrongs = [`Toutes les valeurs sont égales à ${V}.`, `La médiane de la série est ${V}.`, `La somme des ${n} valeurs est ${V}.`, `La plus grande valeur de la série est ${V}.`];
    pourquoi = `moyenne = somme ÷ ${n}, donc somme = ${fr(v)} × ${n} = ${fr(n * v)}. Rien n'oblige les valeurs à être égales.`;
  } else {
    correct = `L'écart entre la plus grande et la plus petite valeur est ${V}.`;
    wrongs = [`La plus grande valeur de la série est ${V}.`, `La moyenne de la série est ${V}.`, `La plus petite valeur de la série est ${V}.`, `Toutes les valeurs sont inférieures à ${V}.`];
    pourquoi = "l'étendue est, par définition, la plus grande valeur moins la plus petite. Elle ne donne ni le maximum, ni le minimum.";
  }
  return {
    text: `${intro} ${q}`,
    format: "qcm",
    choices: shuffle([correct, ...sample(wrongs, 3)]),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: expl(
      `${indic === "médiane" ? DEF_MED : indic === "moyenne" ? DEF_MOY : DEF_ET}`,
      "on ne garde que ce que la définition GARANTIT.",
      pourquoi,
      `la seule affirmation sûre : « ${correct} »`,
    ),
  };
}

const INDICATEURS = ["la moyenne", "la médiane", "l'étendue", "l'effectif total"];

function genQuelIndicateur(): QG {
  const S = randomChoice(SERIES);
  const p = randomChoice(PRENOMS);
  const n = randomInt(5, 9);
  const k = randomInt(0, 3);
  const buts = [
    [
      "obtenir la valeur commune qu'auraient toutes les données si on répartissait le total de façon égale",
      "résumer la série par la somme des valeurs divisée par leur nombre",
    ],
    [
      "trouver une valeur qui partage la série rangée en deux groupes de même effectif",
      `savoir sous quelle valeur se trouvent au moins la moitié des ${S.noms}`,
    ],
    [
      "connaître l'écart entre la plus grande et la plus petite valeur",
      "mesurer la dispersion de la série entre ses deux extrêmes",
    ],
    ["savoir combien de valeurs compte la série", "connaître le nombre total de données"],
  ];
  const but = randomChoice(buts[k]);
  const text = randomChoice([
    `On étudie ${S.sujet(p, n)}. Quel indicateur faut-il calculer pour ${but} ?`,
    `Pour ${but}, quel indicateur faut-il calculer ? (Série étudiée : ${S.sujet(p, n)}.)`,
    `On veut ${but}. Les données sont ${S.sujet(p, n)}. Quel indicateur choisir ?`,
  ]);
  const raisons = [
    "la moyenne est la somme des valeurs divisée par leur nombre : c'est la valeur commune obtenue en partageant le total.",
    "la médiane partage la série rangée en deux groupes de même effectif.",
    "l'étendue est la différence entre la plus grande et la plus petite valeur.",
    "l'effectif total est le nombre de valeurs de la série.",
  ];
  return {
    text,
    format: "qcm",
    choices: shuffle([...INDICATEURS]),
    expected: [INDICATEURS[k]],
    comparator: "mcq_exact",
    explanation: expl(
      "chaque indicateur répond à une question différente.",
      "on relit ce que l'on veut savoir, puis on cherche l'indicateur dont c'est la définition.",
      raisons[k],
      `il faut calculer ${INDICATEURS[k]}.`,
    ),
  };
}

// ---------- stat_statistique : problèmes ----------
function genAuDessusMoyenne(): QG {
  const S = randomChoice(SERIES);
  const p = randomChoice(PRENOMS);
  const n = randomInt(5, 7);
  let vals = tirerMoyenneJuste(S, n);
  while (etendue(vals) === 0) vals = tirerMoyenneJuste(S, n);
  const m = somme(vals) / n;
  const dessus = vals.filter((v) => v > m);
  const q = randomChoice([
    "Combien de ces valeurs sont strictement supérieures à la moyenne ?",
    "Calcule la moyenne, puis compte les valeurs qui la dépassent strictement.",
    "Combien de valeurs dépassent strictement la moyenne de la série ?",
  ]);
  return {
    text: `${introSerie(S, p, n, afficherSerie(S, vals))} ${q}`,
    format: "short",
    expected: [String(dessus.length)],
    comparator: "number_equal",
    explanation: expl(
      DEF_MOY,
      "on calcule la moyenne, puis on compare chaque valeur à cette moyenne.",
      `moyenne : ${fr(somme(vals))} ÷ ${n} = ${fr(m)}. Valeurs strictement supérieures : ${dessus.length ? dessus.map(fr).join(" ; ") : "aucune"}.`,
      `${dessus.length} valeur${dessus.length > 1 ? "s dépassent" : " dépasse"} la moyenne.`,
    ),
  };
}

function genEcartMoyenne(): QG {
  const S = randomChoice(SERIES);
  const p = randomChoice(PRENOMS);
  const n = randomInt(4, 6);
  let vals = tirerMoyenneJuste(S, n);
  while (etendue(vals) === 0) vals = tirerMoyenneJuste(S, n);
  const m = somme(vals) / n;
  const haut = Math.random() < 0.5;
  const ext = haut ? Math.max(...vals) : Math.min(...vals);
  const d = Math.abs(ext - m);
  const q = haut
    ? randomChoice(["De combien la plus grande valeur dépasse-t-elle la moyenne ?", "Quel est l'écart entre la plus grande valeur et la moyenne ?"])
    : randomChoice(["De combien la plus petite valeur est-elle inférieure à la moyenne ?", "Quel est l'écart entre la moyenne et la plus petite valeur ?"]);
  return {
    text: `${introSerie(S, p, n, afficherSerie(S, vals))} ${q}`,
    format: "short",
    expected: [formatNumber(d)],
    comparator: "number_equal",
    explanation: expl(
      DEF_MOY,
      "on calcule la moyenne, puis l'écart avec la valeur extrême demandée.",
      `moyenne : ${fr(somme(vals))} ÷ ${n} = ${fr(m)} ; ${haut ? `${fr(ext)} − ${fr(m)}` : `${fr(m)} − ${fr(ext)}`} = ${fr(d)}.`,
      `l'écart est ${fr(d)}${S.u}.`,
    ),
  };
}

function genNouvelleMoyenne(): QG {
  const S = randomChoice(SERIES);
  const p = randomChoice(PRENOMS);
  const n = randomInt(4, 6);
  const tout = tirerMoyenneJuste(S, n + 1, true);
  const vals = tout.slice(0, n);
  const x = tout[n];
  const m = somme(tout) / (n + 1);
  const q = randomChoice(["Quelle est la nouvelle moyenne ?", `Calcule la moyenne des ${n + 1} valeurs.`, "Que vaut la moyenne après cet ajout ?"]);
  return {
    text: `${introSerie(S, p, n, afficherSerie(S, vals))} On ajoute ensuite une valeur : ${fr(x)}${S.u}. ${q}`,
    format: "short",
    expected: [formatNumber(m)],
    comparator: "number_equal",
    explanation: expl(
      DEF_MOY,
      `il y a maintenant ${n + 1} valeurs : on les additionne toutes, puis on divise par ${n + 1}.`,
      `(${tout.map(fr).join(" + ")}) ÷ ${n + 1} = ${fr(somme(tout))} ÷ ${n + 1} = ${fr(m)}.`,
      `la nouvelle moyenne est ${fr(m)}${S.u}.`,
    ),
  };
}

function genNouvelleEtendue(): QG {
  const S = randomChoice(SERIES);
  const p = randomChoice(PRENOMS);
  const n = randomInt(5, 6);
  const pas = S.pas ?? 1;
  let vals = tirerValeurs(S, n);
  let x = 0;
  for (let t = 0; t < 500; t++) {
    vals = tirerValeurs(S, n);
    const lo = Math.min(...vals);
    const hi = Math.max(...vals);
    if (hi === lo) continue;
    const mode = randomInt(0, 2);
    x = tirerValeurs(S, 1)[0];
    if (mode === 0 && x > hi) break;
    if (mode === 1 && x < lo) break;
    if (mode === 2 && x >= lo && x <= hi && x % pas === 0) break;
  }
  const avant = etendue(vals);
  const tout = [...vals, x];
  const apres = etendue(tout);
  const q = randomChoice(["Quelle est l'étendue de la série après cet ajout ?", "Que devient l'étendue ?", "Calcule la nouvelle étendue."]);
  return {
    text: `${introSerie(S, p, n, afficherSerie(S, vals))} On ajoute une nouvelle valeur : ${fr(x)}${S.u}. ${q}`,
    format: "short",
    expected: [formatNumber(apres)],
    comparator: "number_equal",
    explanation: expl(
      DEF_ET,
      "on regarde si la nouvelle valeur devient le nouveau maximum ou le nouveau minimum.",
      `avant : ${fr(Math.max(...vals))} − ${fr(Math.min(...vals))} = ${fr(avant)}. Après : ${fr(Math.max(...tout))} − ${fr(Math.min(...tout))} = ${fr(apres)}.`,
      apres === avant ? `l'étendue ne change pas : ${fr(apres)}${S.u}.` : `la nouvelle étendue est ${fr(apres)}${S.u}.`,
    ),
  };
}

// ---------- stat_statistique : défis ----------
const EVALUATIONS = ["un contrôle", "un devoir maison", "un oral", "une évaluation commune", "un exposé", "un test de calcul mental", "un devoir surveillé"];

function genCoefficients(): QG {
  if (Math.random() < 0.4) return genMoyennePonderee(Math.random() < 0.5 ? "tableau" : "graphe");
  for (let t = 0; t < 3000; t++) {
    const p = randomChoice(PRENOMS);
    const k = randomInt(3, 4);
    const evs = sample(EVALUATIONS, k);
    const notes = evs.map(() => randomInt(6, 19));
    const coefs = evs.map(() => randomInt(1, 3));
    if (new Set(coefs).size === 1) continue;
    const C = somme(coefs);
    const S = somme(notes.map((x, j) => x * coefs[j]));
    if ((S * 10) % C !== 0) continue;
    const m = S / C;
    const detail = joinEt(evs.map((e, j) => `${notes[j]} à ${e} (coefficient ${coefs[j]})`));
    const text = randomChoice([
      `${p} a obtenu ${detail}. Quelle est sa moyenne ?`,
      `Ce trimestre, ${p} a eu ${detail}. Calcule sa moyenne en tenant compte des coefficients.`,
      `Notes ${deNu(p)} : ${detail}. Que vaut sa moyenne ?`,
    ]);
    return {
      text,
      format: "short",
      expected: [formatNumber(m)],
      comparator: "number_equal",
      explanation: expl(
        "avec des coefficients, chaque note compte autant de fois que son coefficient.",
        "on multiplie chaque note par son coefficient, on additionne, puis on divise par la somme des coefficients.",
        `(${notes.map((x, j) => `${x} × ${coefs[j]}`).join(" + ")}) ÷ (${coefs.join(" + ")}) = ${S} ÷ ${C} = ${fr(m)}.`,
        `sa moyenne est ${fr(m)}. ⚠️ Diviser par ${k} (le nombre de notes) serait faux.`,
      ),
    };
  }
  return genMoyennePonderee("tableau");
}

function genAjoutValeur(): QG {
  for (let t = 0; t < 3000; t++) {
    const S = randomChoice(SERIES);
    const p = randomChoice(PRENOMS);
    const pas = S.pas ?? 1;
    const n = randomInt(4, 6);
    const m1 = tirerValeurs(S, 1)[0];
    const d = randomChoice([-2, -1, 1, 2]) * pas;
    const m2 = m1 + d;
    const x = (n + 1) * m2 - n * m1;
    if (x < S.min || x > S.max || x === m1) continue;
    const text = randomChoice([
      `On étudie ${S.sujet(p, n)} : leur moyenne est ${fr(m1)}${S.u}. On ajoute une ${n + 1}e valeur, et la moyenne passe à ${fr(m2)}${S.u}. Quelle est la valeur ajoutée ?`,
      `La moyenne de ${n} valeurs est ${fr(m1)}${S.u} (ce sont ${S.sujet(p, n)}). Après l'ajout d'une valeur, la moyenne des ${n + 1} valeurs vaut ${fr(m2)}${S.u}. Retrouve la valeur ajoutée.`,
      `${cap(S.sujet(p, n))} ont pour moyenne ${fr(m1)}${S.u}. Une valeur de plus fait passer la moyenne à ${fr(m2)}${S.u}. Que vaut cette nouvelle valeur ?`,
    ]);
    return {
      text,
      format: "short",
      expected: [formatNumber(x)],
      comparator: "number_equal",
      explanation: expl(
        "somme des valeurs = moyenne × nombre de valeurs.",
        "on calcule la somme avant et après l'ajout : leur différence est la valeur ajoutée.",
        `avant : ${fr(m1)} × ${n} = ${fr(n * m1)} ; après : ${fr(m2)} × ${n + 1} = ${fr((n + 1) * m2)} ; ${fr((n + 1) * m2)} − ${fr(n * m1)} = ${fr(x)}.`,
        `la valeur ajoutée est ${fr(x)}${S.u}.`,
      ),
    };
  }
  return genValeurManquante("objectif");
}

export const statistiquesBank: TutorBankItemV4[] = [
  /* =========================
     STAT_LIRE_TABLEAU
  ========================= */

  {
    kind: "fixed",
    id: "stat_lire_tableau_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_lire_tableau",
    difficulty: 1,
    theme: "neutral",
    text: "Dans un tableau statistique, que représente l’effectif ?",
    format: "qcm",
    choices: [
      "le nombre d’individus correspondant à une valeur",
      "la plus grande valeur de la série",
      "la différence entre deux valeurs",
      "la moyenne des valeurs",
    ],
    expected: ["le nombre d’individus correspondant à une valeur"],
    comparator: "mcq_exact",
    hint: "L’effectif répond à la question : combien ?",
    explanation:
      "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          ("L’effectif indique combien d’individus correspondent à une valeur ou à une catégorie.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
    tags: ["stat_statistique", "tableau", "effectif", "definition"],
  },

  {
    kind: "fixed",
    id: "stat_lire_tableau_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_lire_tableau",
    difficulty: 1,
    theme: "neutral",
    text: "Dans un tableau, on lit : vélo : 12 élèves. Que signifie 12 ?",
    format: "qcm",
    choices: [
      "12 élèves ont choisi vélo",
      "la moyenne est 12",
      "il y a 12 activités",
      "le vélo coûte 12 €",
    ],
    expected: ["12 élèves ont choisi vélo"],
    comparator: "mcq_exact",
    hint: "Le nombre est placé en face de la catégorie vélo.",
    explanation:
      "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          ("Le nombre 12 est l’effectif de la catégorie vélo : 12 élèves ont choisi vélo.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
    tags: ["stat_statistique", "tableau", "lecture"],
  },

  {
    kind: "template",
    id: "stat_lire_tableau_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_lire_tableau",
    difficulty: 1,
    theme: "neutral",
    hint: "Lis directement l’information demandée.",
    tags: ["stat_statistique", "tableau", "lecture", "template"],
    generate: () => genLireTableauCat(),
  },

  {
    kind: "template",
    id: "stat_lire_tableau_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_lire_tableau",
    difficulty: 2,
    theme: "neutral",
    hint: "Repère la ligne, puis la colonne : la case qui les croise contient l’effectif.",
    tags: ["stat_statistique", "tableau", "double_entree", "template"],
    generate: () => genTableauDouble(),
  },

  {
    kind: "fixed",
    id: "stat_lire_tableau_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_lire_tableau",
    difficulty: 2,
    theme: "neutral",
    text: "Explique ce que signifie : « marche : 18 élèves » dans un tableau statistique.",
    format: "open",
    expected: ["marche", "18", "élèves"],
    comparator: "contains_keyword",
    hint: "Il faut dire quelle catégorie est concernée et combien d’élèves sont concernés.",
    explanation:
      "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          ("Cela signifie que 18 élèves appartiennent à la catégorie « marche », par exemple qu’ils ont choisi cette activité.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
    tags: ["stat_statistique", "tableau", "open"],
  },

  /* =========================
     STAT_LIRE_GRAPHIQUE
  ========================= */

  {
    kind: "fixed",
    id: "stat_lire_graphique_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_lire_graphique",
    difficulty: 1,
    theme: "neutral",
    text: "Dans un diagramme en barres, que représente la hauteur d’une barre ?",
    format: "qcm",
    choices: [
      "la valeur ou l’effectif de la catégorie",
      "la couleur de la catégorie",
      "toujours une moyenne",
      "toujours une médiane",
    ],
    expected: ["la valeur ou l’effectif de la catégorie"],
    comparator: "mcq_exact",
    hint: "Plus la barre est haute, plus la valeur est grande.",
    explanation:
      "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          ("La hauteur d’une barre représente la valeur ou l’effectif associé à une catégorie.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
    tags: ["stat_statistique", "graphique", "barres"],
  },

  {
    kind: "template",
    id: "stat_lire_graphique_tpl_1_barres",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_lire_graphique",
    difficulty: 2,
    theme: "neutral",
    hint: "Lis les deux barres, puis soustrais la plus petite de la plus grande.",
    tags: ["stat_statistique", "graphique", "barres", "canvas", "template"],
    generate: () => genGrapheEcart(),
  },

  {
    kind: "template",
    id: "stat_lire_graphique_tpl_2_batons",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_lire_graphique",
    difficulty: 2,
    theme: "neutral",
    hint: "Lis la valeur au sommet du bâton.",
    tags: ["stat_statistique", "graphique", "batons", "canvas", "template"],
    generate: () => genGrapheBatons(),
  },

  {
    kind: "template",
    id: "stat_lire_graphique_tpl_3_max",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_lire_graphique",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche la barre la plus haute.",
    tags: ["stat_statistique", "graphique", "maximum", "canvas"],
    generate: () => genGrapheMaxMin("max"),
  },

  {
    kind: "fixed",
    id: "stat_lire_graphique_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_lire_graphique",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment lire une information dans un diagramme en barres.",
    format: "open",
    expected: ["barre", "hauteur", "valeur"],
    comparator: "contains_keyword",
    hint: "Tu dois parler de la catégorie et de la hauteur de la barre.",
    explanation:
      "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          ("On repère la catégorie demandée, puis on lit la hauteur de sa barre pour obtenir la valeur ou l’effectif.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
    tags: ["stat_statistique", "graphique", "open"],
  },
    /* =========================
     STAT_EFFECTIF
  ========================= */

  {
    kind: "fixed",
    id: "stat_effectif_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_effectif",
    difficulty: 1,
    theme: "neutral",
    text: "Un tableau indique : filles : 14, garçons : 11. Quel est l’effectif total ?",
    format: "qcm",
    choices: ["14", "11", "25", "154"],
    expected: ["25"],
    comparator: "mcq_exact",
    hint: "Additionne les effectifs.",
    explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          ("L’effectif total vaut 14 + 11 = 25.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
    tags: ["stat_statistique", "effectif", "total"],
  },

  {
    kind: "template",
    id: "stat_effectif_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_effectif",
    difficulty: 2,
    theme: "neutral",
    hint: "Additionne tous les effectifs.",
    tags: ["stat_statistique", "effectif", "template"],
    generate: () => genTotalTableau(),
  },

  {
    kind: "template",
    id: "stat_effectif_tpl_2_graphique",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_effectif",
    difficulty: 2,
    theme: "neutral",
    hint: "Additionne toutes les valeurs du graphique.",
    tags: ["stat_statistique", "effectif", "graphique", "canvas"],
    generate: () => genTotalGraphique(),
  },

  {
    kind: "fixed",
    id: "stat_effectif_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_effectif",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment trouver l’effectif total dans une série statistique.",
    format: "open",
    expected: ["additionne", "effectifs", "total"],
    comparator: "contains_keyword",
    hint: "On regroupe toutes les catégories.",
    explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          ("Pour trouver l’effectif total, on additionne tous les effectifs des catégories.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
    tags: ["stat_statistique", "effectif", "open"],
  },

  /* =========================
     STAT_FREQUENCE
  ========================= */

  {
    kind: "fixed",
    id: "stat_frequence_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_frequence",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une classe de 25 élèves, 10 pratiquent un sport. Quelle est la fréquence sous forme décimale ?",
    format: "qcm",
    choices: ["0,4", "0,25", "2,5", "10"],
    expected: ["0,4"],
    comparator: "mcq_exact",
    hint: "Fréquence = effectif ÷ effectif total.",
    explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          ("La fréquence vaut 10 ÷ 25 = 0,4.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
    tags: ["stat_statistique", "frequence", "qcm"],
  },

  {
    kind: "template",
    id: "stat_frequence_tpl_1_decimal",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_frequence",
    difficulty: 3,
    theme: "neutral",
    hint: "Fréquence = effectif de la catégorie ÷ effectif total.",
    tags: ["stat_statistique", "frequence", "decimal", "template"],
    generate: () => genFreq("decimal", Math.random() < 0.5 ? "texte" : "tableau"),
  },

  {
    kind: "template",
    id: "stat_frequence_tpl_2_pourcentage",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_frequence",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplie la fréquence décimale par 100.",
    tags: ["stat_statistique", "frequence", "pourcentage", "template"],
    generate: () => genFreq("pourcentage", Math.random() < 0.5 ? "texte" : "tableau"),
  },

  {
    kind: "template",
    id: "stat_frequence_tpl_3_graphique",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_frequence",
    difficulty: 4,
    theme: "neutral",
    hint: "Lis l’effectif de la catégorie puis divise par le total.",
    tags: ["stat_statistique", "frequence", "graphique", "canvas"],
    generate: () => genFreq(randomChoice<Forme>(["decimal", "pourcentage", "fraction"]), "graphique"),
  },

  {
    kind: "fixed",
    id: "stat_frequence_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_frequence",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment calculer une fréquence à partir d’un effectif et d’un effectif total.",
    format: "open",
    expected: ["effectif", "total", "divise"],
    comparator: "contains_keyword",
    hint: "C’est un quotient.",
    explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          ("On divise l’effectif de la catégorie par l’effectif total.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
    tags: ["stat_statistique", "frequence", "open"],
  },

  /* =========================
     STAT_MOYENNE
  ========================= */

  {
    kind: "fixed",
    id: "stat_moyenne_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_moyenne",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la moyenne de 8 ; 10 ; 12 ?",
    format: "qcm",
    choices: ["8", "10", "12", "30"],
    expected: ["10"],
    comparator: "mcq_exact",
    hint: "Additionne puis divise par le nombre de valeurs.",
    explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          ("Moyenne = (8 + 10 + 12) ÷ 3 = 30 ÷ 3 = 10.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
    tags: ["stat_statistique", "moyenne", "qcm"],
  },

  {
    kind: "fixed",
    id: "stat_moyenne_fixed_2_piege",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_moyenne",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève calcule la moyenne de 5 ; 10 ; 15 et répond 30. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "30 est la somme, pas la moyenne.",
    explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          ("La somme est 30, mais il faut diviser par 3. La moyenne vaut 10.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
    tags: ["stat_statistique", "moyenne", "erreur"],
  },

  {
    kind: "template",
    id: "stat_moyenne_tpl_1_liste",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_moyenne",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne toutes les valeurs puis divise par leur nombre.",
    tags: ["stat_statistique", "moyenne", "template"],
    generate: () => genMoyenne(4, 4, true),
  },

  {
    kind: "template",
    id: "stat_moyenne_tpl_2_effectifs",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_moyenne",
    difficulty: 4,
    theme: "neutral",
    hint: "Attention, chaque valeur peut apparaître plusieurs fois.",
    tags: ["stat_statistique", "moyenne", "effectifs", "template"],
    generate: () => genMoyennePonderee("tableau"),
  },

  {
    kind: "template",
    id: "stat_moyenne_tpl_3_retrouver_valeur",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_moyenne",
    difficulty: 5,
    theme: "neutral",
    hint: "Utilise somme totale = moyenne × nombre de valeurs.",
    tags: ["stat_statistique", "moyenne", "valeur_manquante", "template"],
    generate: () => genValeurManquante("manque"),
  },

  {
    kind: "fixed",
    id: "stat_moyenne_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_moyenne",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi la moyenne n’est pas toujours une valeur de la série.",
    format: "open",
    expected: ["somme", "divise", "valeurs"],
    comparator: "contains_keyword",
    hint: "La moyenne est un calcul, pas forcément une valeur observée.",
    explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          ("La moyenne est obtenue en additionnant les valeurs puis en divisant par leur nombre. Elle peut donc ne pas apparaître dans la série.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
    tags: ["stat_statistique", "moyenne", "open"],
  },
    /* =========================
     STAT_MEDIANE
  ========================= */

  {
    kind: "fixed",
    id: "stat_mediane_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_mediane",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la médiane de la série rangée : 4 ; 7 ; 9 ; 12 ; 15 ?",
    format: "qcm",
    choices: ["7", "9", "12", "15"],
    expected: ["9"],
    comparator: "mcq_exact",
    hint: "La médiane est la valeur centrale.",
    explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          ("Il y a 5 valeurs. La valeur centrale est la 3e : 9.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
    tags: ["stat_statistique", "mediane", "qcm"],
  },

  {
    kind: "fixed",
    id: "stat_mediane_fixed_2_pair",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_mediane",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la médiane de la série rangée : 4 ; 8 ; 10 ; 14 ?",
    format: "qcm",
    choices: ["8", "9", "10", "14"],
    expected: ["9"],
    comparator: "mcq_exact",
    hint: "Avec 4 valeurs, on prend la moyenne des deux valeurs centrales.",
    explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          ("Les deux valeurs centrales sont 8 et 10. Médiane = (8 + 10) ÷ 2 = 9.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
    tags: ["stat_statistique", "mediane", "pair"],
  },

  {
    kind: "template",
    id: "stat_mediane_tpl_1_impair",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_mediane",
    difficulty: 3,
    theme: "neutral",
    hint: "Range la série puis prends la valeur centrale.",
    tags: ["stat_statistique", "mediane", "impair", "template"],
    generate: () => genMediane([5], false),
  },

  {
    kind: "template",
    id: "stat_mediane_tpl_2_pair",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_mediane",
    difficulty: 4,
    theme: "neutral",
    hint: "Avec un nombre pair de valeurs, calcule la moyenne des deux valeurs centrales.",
    tags: ["stat_statistique", "mediane", "pair", "template"],
    generate: () => genMediane([4, 6], false),
  },

  {
    kind: "fixed",
    id: "stat_mediane_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_mediane",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi il faut d’abord ranger une série avant de déterminer sa médiane.",
    format: "open",
    expected: ["ranger", "ordre", "centrale"],
    comparator: "contains_keyword",
    hint: "La médiane dépend de la position centrale.",
    explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          ("Il faut ranger la série dans l’ordre croissant pour identifier correctement la ou les valeurs centrales.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
    tags: ["stat_statistique", "mediane", "open"],
  },

  /* =========================
     STAT_ETENDUE
  ========================= */

  {
    kind: "fixed",
    id: "stat_etendue_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_etendue",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est l’étendue de la série : 4 ; 7 ; 10 ; 15 ?",
    format: "qcm",
    choices: ["4", "7", "11", "15"],
    expected: ["11"],
    comparator: "mcq_exact",
    hint: "Étendue = maximum - minimum.",
    explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          ("Maximum = 15, minimum = 4. Étendue = 15 - 4 = 11.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
    tags: ["stat_statistique", "etendue", "qcm"],
  },

  {
    kind: "template",
    id: "stat_etendue_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_etendue",
    difficulty: 3,
    theme: "neutral",
    hint: "Repère la plus petite et la plus grande valeur.",
    tags: ["stat_statistique", "etendue", "template"],
    generate: () => genEtendue([5, 6], false),
  },

  {
    kind: "template",
    id: "stat_etendue_tpl_2_graphique",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_etendue",
    difficulty: 3,
    theme: "neutral",
    hint: "L’étendue se calcule avec la plus grande et la plus petite valeur.",
    tags: ["stat_statistique", "etendue", "graphique", "canvas"],
    generate: () => genEtendueGraphe(),
  },

  {
    kind: "fixed",
    id: "stat_etendue_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_etendue",
    difficulty: 4,
    theme: "neutral",
    text: "Explique ce que mesure l’étendue d’une série statistique.",
    format: "open",
    expected: ["maximum", "minimum", "écart"],
    comparator: "contains_keyword",
    hint: "L’étendue compare les extrêmes.",
    explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          ("L’étendue mesure l’écart entre la plus grande valeur et la plus petite valeur de la série.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
    tags: ["stat_statistique", "etendue", "open"],
  },

  /* =========================
     STAT_INTERPRETATION
  ========================= */

  {
    kind: "fixed",
    id: "stat_interpreter_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_interpreter",
    difficulty: 3,
    theme: "neutral",
    text: "Deux séries ont la même moyenne, mais l’une a une étendue plus grande. Que peut-on dire ?",
    format: "qcm",
    choices: [
      "ses valeurs sont plus dispersées",
      "sa moyenne est forcément plus grande",
      "sa médiane est forcément nulle",
      "son effectif est forcément plus petit",
    ],
    expected: ["ses valeurs sont plus dispersées"],
    comparator: "mcq_exact",
    hint: "L’étendue mesure la dispersion entre les extrêmes.",
    explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          ("Une étendue plus grande indique des valeurs plus dispersées.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
    tags: ["stat_statistique", "interpretation", "etendue"],
  },

  {
    kind: "fixed",
    id: "stat_interpreter_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_interpreter",
    difficulty: 3,
    theme: "neutral",
    text: "La moyenne d’un groupe est 12. Cela signifie forcément que chaque élève a eu 12 ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "La moyenne résume le groupe, elle ne donne pas chaque valeur.",
    explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          ("Non. Une moyenne de 12 peut venir de notes différentes, par exemple 10 et 14.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
    tags: ["stat_statistique", "interpretation", "moyenne", "piege"],
  },

  {
    kind: "template",
    id: "stat_interpreter_tpl_1_moyenne_etendue",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_interpreter",
    difficulty: 4,
    theme: "neutral",
    hint: "Compare surtout l’étendue pour juger la dispersion.",
    tags: ["stat_statistique", "interpretation", "template"],
    generate: () => genCompareEtendue("disperse"),
  },

  {
    kind: "fixed",
    id: "stat_interpreter_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_interpreter",
    difficulty: 4,
    theme: "neutral",
    text: "Explique la différence entre moyenne, médiane et étendue.",
    format: "open",
    expected: ["moyenne", "médiane", "étendue"],
    comparator: "contains_keyword",
    hint: "La moyenne résume, la médiane coupe la série, l’étendue mesure l’écart.",
    explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          ("La moyenne est un équilibre calculé, la médiane est la valeur centrale d’une série rangée, et l’étendue est l’écart entre le maximum et le minimum.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
    tags: ["stat_statistique", "interpretation", "open"],
  },

  /* =========================
     STAT_PROBLEME
  ========================= */

  {
    kind: "template",
    id: "stat_probleme_tpl_1_reunion",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Après l’ajout, il y a une valeur de plus : on divise par le nouveau nombre de valeurs.",
    tags: ["stat_statistique", "probleme", "moyenne", "template"],
    generate: () => genNouvelleMoyenne(),
  },

  {
    kind: "template",
    id: "stat_probleme_tpl_2_graphique",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Chaque valeur compte autant de fois que la hauteur de son bâton.",
    tags: ["stat_statistique", "probleme", "graphique", "moyenne_ponderee", "canvas"],
    generate: () => genMoyennePonderee("graphe"),
  },

  {
    kind: "fixed",
    id: "stat_probleme_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_probleme",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi les statistiques aident à comparer deux groupes.",
    format: "open",
    expected: ["moyenne", "médiane", "étendue"],
    comparator: "contains_keyword",
    hint: "Utilise au moins deux indicateurs.",
    explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          ("Les statistiques permettent de résumer et comparer des groupes avec des indicateurs comme la moyenne, la médiane et l’étendue.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
    tags: ["stat_statistique", "probleme", "open"],
  },

  /* =========================
     STAT_DEFIS
  ========================= */

  {
    kind: "fixed",
    id: "stat_defi_fixed_1_erreur_moyenne_mediane",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève dit : « La médiane est toujours égale à la moyenne. » A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "La moyenne et la médiane ne mesurent pas la même chose.",
    explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          ("Non. La moyenne utilise toutes les valeurs, alors que la médiane dépend de la position centrale dans la série rangée.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
    tags: ["stat_statistique", "defi", "erreur"],
  },

  {
    kind: "template",
    id: "stat_defi_tpl_1_retrouver_valeur",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Somme totale = moyenne × nombre de valeurs.",
    tags: ["stat_statistique", "defi", "valeur_manquante"],
    generate: () => genValeurManquante("objectif"),
  },

  {
    kind: "fixed",
    id: "stat_defi_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi une valeur extrême peut modifier fortement une moyenne.",
    format: "open",
    expected: ["valeur", "extrême", "moyenne"],
    comparator: "contains_keyword",
    hint: "La moyenne utilise toutes les valeurs.",
    explanation: "Définition : les statistiques permettent d’organiser et de résumer une série de données.\n\n" +
          "Méthode : on choisit l’indicateur demandé : effectif, fréquence, moyenne, médiane ou étendue.\n\nCalcul : " +
          ("Une valeur extrême entre dans le calcul de la somme totale, donc elle peut tirer la moyenne vers le haut ou vers le bas.") +
          "\n\nConclusion : l’indicateur obtenu résume correctement la série.",
    tags: ["stat_statistique", "defi", "open"],
  },

  /* =========================================================
     COMPLÉMENTS (top-up ~10 items / microSkill)
  ========================================================= */

  // ---------- STAT_LIRE_TABLEAU ----------
  {
    kind: "fixed",
    id: "stat_lire_tableau_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_lire_tableau",
    difficulty: 1,
    theme: "neutral",
    text: "Dans un tableau statistique, que désigne une « valeur » de la série ?",
    format: "qcm",
    choices: [
      "une donnée observée (par exemple une note)",
      "le nombre total d’individus",
      "la moyenne de la série",
      "l’écart entre deux nombres",
    ],
    expected: ["une donnée observée (par exemple une note)"],
    comparator: "mcq_exact",
    hint: "Une valeur est ce qu’on observe, pas un calcul.",
    explanation:
      "Définition : une valeur est une donnée observée de la série.\n\n" +
      "Méthode : on distingue valeur, effectif et indicateurs.\n\n" +
      "Calcul : la valeur est par exemple une note ou une catégorie.\n\n" +
      "Conclusion : une valeur est une donnée observée.",
    tags: ["stat_statistique", "tableau", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_lire_tableau_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_lire_tableau",
    difficulty: 2,
    theme: "neutral",
    text: "Un tableau indique : A : 5, B : 7, C : 3. Quel est l’effectif total ?",
    format: "qcm",
    choices: ["15", "7", "3", "12"],
    expected: ["15"],
    comparator: "mcq_exact",
    hint: "On additionne tous les effectifs.",
    explanation:
      "Définition : l’effectif total est la somme des effectifs.\n\n" +
      "Méthode : on additionne 5, 7 et 3.\n\n" +
      "Calcul : 5 + 7 + 3 = 15.\n\n" +
      "Conclusion : l’effectif total est 15.",
    tags: ["stat_statistique", "tableau", "total", "qcm"],
  },
  {
    kind: "template",
    id: "stat_lire_tableau_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_lire_tableau",
    difficulty: 1,
    theme: "neutral",
    hint: "Lis l’effectif en face de la catégorie demandée.",
    tags: ["stat_statistique", "tableau", "lecture", "template"],
    generate: () => genLireTableauDiscret(),
  },
  {
    kind: "template",
    id: "stat_lire_tableau_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_lire_tableau",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche le plus grand ou le plus petit effectif, selon la question.",
    tags: ["stat_statistique", "tableau", "maximum", "template"],
    generate: () => genMaxMinTableau(),
  },
  {
    kind: "fixed",
    id: "stat_lire_tableau_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_lire_tableau",
    difficulty: 2,
    theme: "neutral",
    text: "Explique comment trouver l’effectif total à partir d’un tableau.",
    format: "open",
    expected: ["additionne", "effectifs", "total"],
    comparator: "contains_keyword",
    hint: "On regroupe toutes les catégories.",
    explanation:
      "Définition : l’effectif total est la somme des effectifs.\n\n" +
      "Méthode : on additionne tous les effectifs du tableau.\n\n" +
      "Calcul : on fait la somme ligne par ligne.\n\n" +
      "Conclusion : l’effectif total s’obtient en additionnant tous les effectifs.",
    tags: ["stat_statistique", "tableau", "open"],
  },

  // ---------- STAT_LIRE_GRAPHIQUE ----------
  {
    kind: "fixed",
    id: "stat_lire_graphique_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_lire_graphique",
    difficulty: 1,
    theme: "neutral",
    text: "Dans un diagramme en barres, que lit-on sur l’axe horizontal ?",
    format: "qcm",
    choices: ["les catégories", "les effectifs", "la moyenne", "l’étendue"],
    expected: ["les catégories"],
    comparator: "mcq_exact",
    hint: "Les barres sont rangées par catégorie.",
    explanation:
      "Définition : l’axe horizontal porte les catégories.\n\n" +
      "Méthode : on repère ce qui est écrit sous chaque barre.\n\n" +
      "Calcul : ce sont les catégories ; les effectifs sont sur l’axe vertical.\n\n" +
      "Conclusion : l’axe horizontal indique les catégories.",
    tags: ["stat_statistique", "graphique", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_lire_graphique_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_lire_graphique",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un diagramme circulaire (camembert), que représente un secteur plus grand ?",
    format: "qcm",
    choices: [
      "une catégorie plus fréquente",
      "une catégorie plus rare",
      "la moyenne",
      "rien de particulier",
    ],
    expected: ["une catégorie plus fréquente"],
    comparator: "mcq_exact",
    hint: "Plus la part est grande, plus l’effectif est grand.",
    explanation:
      "Définition : dans un camembert, la taille d’un secteur est proportionnelle à l’effectif.\n\n" +
      "Méthode : on compare les tailles des secteurs.\n\n" +
      "Calcul : un grand secteur correspond à un grand effectif.\n\n" +
      "Conclusion : un secteur plus grand est une catégorie plus fréquente.",
    tags: ["stat_statistique", "graphique", "camembert", "qcm"],
  },
  {
    kind: "template",
    id: "stat_lire_graphique_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_lire_graphique",
    difficulty: 2,
    theme: "neutral",
    hint: "Lis la hauteur de la barre demandée.",
    tags: ["stat_statistique", "graphique", "barres", "canvas", "template"],
    generate: () => genGrapheLireCat(),
  },
  {
    kind: "template",
    id: "stat_lire_graphique_tpl_5_min",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_lire_graphique",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche la barre la plus basse.",
    tags: ["stat_statistique", "graphique", "minimum", "canvas", "template"],
    generate: () => genGrapheMaxMin("min"),
  },
  {
    kind: "fixed",
    id: "stat_lire_graphique_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_lire_graphique",
    difficulty: 3,
    theme: "neutral",
    text: "Explique l’avantage d’un graphique par rapport à un tableau de données.",
    format: "open",
    expected: ["visuel", "comparer", "rapide"],
    comparator: "contains_keyword",
    hint: "Pense à la lecture visuelle.",
    explanation:
      "Définition : un graphique représente visuellement les données.\n\n" +
      "Méthode : on compare les hauteurs ou les parts d’un coup d’œil.\n\n" +
      "Calcul : on repère vite le maximum, le minimum, les écarts.\n\n" +
      "Conclusion : le graphique permet de comparer rapidement et visuellement.",
    tags: ["stat_statistique", "graphique", "open"],
  },

  // ---------- STAT_EFFECTIF ----------
  {
    kind: "fixed",
    id: "stat_effectif_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_effectif",
    difficulty: 1,
    theme: "neutral",
    text: "L’effectif d’une valeur, c’est…",
    format: "qcm",
    choices: [
      "le nombre de fois où cette valeur apparaît",
      "la part de la série que cette valeur représente",
      "le rang de cette valeur dans la série rangée",
      "la somme de toutes les valeurs de la série",
    ],
    expected: ["le nombre de fois où cette valeur apparaît"],
    comparator: "mcq_exact",
    hint: "C’est un comptage.",
    explanation:
      "Définition : l’effectif compte les apparitions d’une valeur.\n\n" +
      "Méthode : on compte combien de fois la valeur revient.\n\n" +
      "Calcul : c’est un nombre d’individus.\n\n" +
      "Conclusion : l’effectif est le nombre de fois où la valeur apparaît.",
    tags: ["stat_statistique", "effectif", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_effectif_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_effectif",
    difficulty: 2,
    theme: "neutral",
    text: "Un tableau indique : A : 8, B : 12, total : 25. Quel est l’effectif de C ?",
    format: "qcm",
    choices: ["5", "20", "4", "13"],
    expected: ["5"],
    comparator: "mcq_exact",
    hint: "Total - (A + B).",
    explanation:
      "Définition : l’effectif total est la somme des effectifs.\n\n" +
      "Méthode : on soustrait les effectifs connus du total.\n\n" +
      "Calcul : 25 - (8 + 12) = 25 - 20 = 5.\n\n" +
      "Conclusion : l’effectif de C est 5.",
    tags: ["stat_statistique", "effectif", "qcm"],
  },
  {
    kind: "template",
    id: "stat_effectif_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_effectif",
    difficulty: 2,
    theme: "neutral",
    hint: "Additionne tous les effectifs.",
    tags: ["stat_statistique", "effectif", "template"],
    generate: () => genTotalDiscret(),
  },
  {
    kind: "template",
    id: "stat_effectif_tpl_4_manquant",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_effectif",
    difficulty: 3,
    theme: "neutral",
    hint: "Effectif manquant = total - somme des effectifs connus.",
    tags: ["stat_statistique", "effectif", "manquant", "template"],
    generate: () => genEffectifManquant(),
  },
  {
    kind: "fixed",
    id: "stat_effectif_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_effectif",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une série, la valeur 7 apparaît 3 fois. Quel est son effectif ?",
    format: "qcm",
    choices: ["3", "7", "21", "10"],
    expected: ["3"],
    comparator: "mcq_exact",
    hint: "On compte le nombre d’apparitions.",
    explanation:
      "Définition : l’effectif d’une valeur est le nombre de fois où elle apparaît.\n\n" +
      "Méthode : on compte les apparitions de 7.\n\n" +
      "Calcul : elle apparaît 3 fois.\n\n" +
      "Conclusion : son effectif est 3.",
    tags: ["stat_statistique", "effectif", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_effectif_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_effectif",
    difficulty: 3,
    theme: "neutral",
    text: "Explique la différence entre une valeur et son effectif.",
    format: "open",
    expected: ["valeur", "effectif", "nombre"],
    comparator: "contains_keyword",
    hint: "L’une est observée, l’autre est un comptage.",
    explanation:
      "Définition : la valeur est la donnée observée, l’effectif est le nombre de fois où elle apparaît.\n\n" +
      "Méthode : on distingue la donnée et son comptage.\n\n" +
      "Calcul : par exemple, la note 12 (valeur) obtenue par 4 élèves (effectif).\n\n" +
      "Conclusion : la valeur est la donnée, l’effectif est son nombre d’apparitions.",
    tags: ["stat_statistique", "effectif", "open"],
  },

  // ---------- STAT_FREQUENCE ----------
  {
    kind: "fixed",
    id: "stat_frequence_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_frequence",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une classe de 20 élèves, 5 portent des lunettes. Quelle est la fréquence en pourcentage ?",
    format: "qcm",
    choices: ["25 %", "5 %", "20 %", "50 %"],
    expected: ["25 %"],
    comparator: "mcq_exact",
    hint: "5 ÷ 20 = 0,25 = 25 %.",
    explanation:
      "Définition : la fréquence est l’effectif divisé par l’effectif total.\n\n" +
      "Méthode : on calcule 5 ÷ 20, puis on convertit en pourcentage.\n\n" +
      "Calcul : 5 ÷ 20 = 0,25 = 25 %.\n\n" +
      "Conclusion : la fréquence est 25 %.",
    tags: ["stat_statistique", "frequence", "pourcentage", "qcm"],
  },
  {
    kind: "template",
    id: "stat_frequence_tpl_4_decimal",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_frequence",
    difficulty: 3,
    theme: "neutral",
    hint: "Fréquence = effectif ÷ total.",
    tags: ["stat_statistique", "frequence", "decimal", "template"],
    generate: () =>
      genFreq(randomChoice<Forme>(["decimal", "fraction"]), Math.random() < 0.5 ? "texte" : "tableau"),
  },
  {
    kind: "template",
    id: "stat_frequence_tpl_5_pourcentage",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_frequence",
    difficulty: 3,
    theme: "neutral",
    hint: "Fréquence en % = (effectif ÷ total) × 100.",
    tags: ["stat_statistique", "frequence", "pourcentage", "template"],
    generate: () => genFreq("pourcentage", "tableau"),
  },
  {
    kind: "fixed",
    id: "stat_frequence_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_frequence",
    difficulty: 2,
    theme: "neutral",
    text: "Une fréquence peut-elle être supérieure à 1 (ou 100 %) ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Une partie ne dépasse pas le tout.",
    explanation:
      "Définition : une fréquence est un quotient effectif ÷ total, donc entre 0 et 1.\n\n" +
      "Méthode : l’effectif ne dépasse jamais le total.\n\n" +
      "Calcul : le quotient est au plus 1 (100 %).\n\n" +
      "Conclusion : non, une fréquence ne dépasse pas 1.",
    tags: ["stat_statistique", "frequence", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_frequence_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_frequence",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment passer d’une fréquence décimale à un pourcentage.",
    format: "open",
    expected: ["multiplie", "100", "pourcentage"],
    comparator: "contains_keyword",
    hint: "On change d’écriture en multipliant.",
    explanation:
      "Définition : un pourcentage est une fréquence exprimée sur 100.\n\n" +
      "Méthode : on multiplie la fréquence décimale par 100.\n\n" +
      "Calcul : par exemple 0,25 × 100 = 25 %.\n\n" +
      "Conclusion : on multiplie la fréquence décimale par 100 pour obtenir le pourcentage.",
    tags: ["stat_statistique", "frequence", "open"],
  },

  // ---------- STAT_MOYENNE ----------
  {
    kind: "fixed",
    id: "stat_moyenne_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_moyenne",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la moyenne de 6 ; 8 ; 10 ; 12 ?",
    format: "qcm",
    choices: ["9", "8", "10", "36"],
    expected: ["9"],
    comparator: "mcq_exact",
    hint: "Somme ÷ 4.",
    explanation:
      "Définition : la moyenne est la somme divisée par le nombre de valeurs.\n\n" +
      "Méthode : on additionne puis on divise par 4.\n\n" +
      "Calcul : (6 + 8 + 10 + 12) ÷ 4 = 36 ÷ 4 = 9.\n\n" +
      "Conclusion : la moyenne est 9.",
    tags: ["stat_statistique", "moyenne", "qcm"],
  },
  {
    kind: "template",
    id: "stat_moyenne_tpl_4_liste",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_moyenne",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne, puis divise par le nombre de valeurs.",
    tags: ["stat_statistique", "moyenne", "template"],
    generate: () => genMoyenne(3, 5, true),
  },
  {
    kind: "template",
    id: "stat_moyenne_tpl_5_contexte",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_moyenne",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne les notes, divise par leur nombre.",
    tags: ["stat_statistique", "moyenne", "contexte", "template"],
    generate: () => genMoyenne(5, 6, true),
  },
  {
    kind: "fixed",
    id: "stat_moyenne_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_moyenne",
    difficulty: 3,
    theme: "neutral",
    text: "Explique la méthode pour calculer une moyenne.",
    format: "open",
    expected: ["additionne", "divise", "nombre"],
    comparator: "contains_keyword",
    hint: "Deux étapes : somme puis division.",
    explanation:
      "Définition : la moyenne résume une série par une seule valeur.\n\n" +
      "Méthode : on additionne toutes les valeurs, puis on divise par leur nombre.\n\n" +
      "Calcul : moyenne = somme ÷ nombre de valeurs.\n\n" +
      "Conclusion : on additionne puis on divise par le nombre de valeurs.",
    tags: ["stat_statistique", "moyenne", "open"],
  },

  // ---------- STAT_MEDIANE ----------
  {
    kind: "fixed",
    id: "stat_mediane_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_mediane",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la médiane de la série rangée : 3 ; 5 ; 8 ?",
    format: "qcm",
    choices: ["5", "3", "8", "16"],
    expected: ["5"],
    comparator: "mcq_exact",
    hint: "Avec 3 valeurs, c’est celle du milieu.",
    explanation:
      "Définition : la médiane est la valeur centrale d’une série rangée.\n\n" +
      "Méthode : avec 3 valeurs, la médiane est la 2e.\n\n" +
      "Calcul : la valeur centrale est 5.\n\n" +
      "Conclusion : la médiane est 5.",
    tags: ["stat_statistique", "mediane", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_mediane_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_mediane",
    difficulty: 2,
    theme: "neutral",
    text: "Que signifie la médiane d’une série ?",
    format: "qcm",
    choices: [
      "la valeur qui partage la série rangée en deux moitiés",
      "la valeur qui apparaît le plus souvent dans la série",
      "la valeur qu’on obtient en divisant la somme par l’effectif",
      "la valeur qui sépare la plus grande de la plus petite",
    ],
    expected: ["la valeur qui partage la série rangée en deux moitiés"],
    comparator: "mcq_exact",
    hint: "C’est la valeur du milieu.",
    explanation:
      "Définition : la médiane partage la série rangée en deux moitiés de même effectif.\n\n" +
      "Méthode : on range puis on prend la valeur centrale.\n\n" +
      "Calcul : la moitié des valeurs lui est inférieure, l’autre supérieure.\n\n" +
      "Conclusion : la médiane partage la série en deux moitiés.",
    tags: ["stat_statistique", "mediane", "qcm"],
  },
  {
    kind: "template",
    id: "stat_mediane_tpl_3_impair",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_mediane",
    difficulty: 3,
    theme: "neutral",
    hint: "Range puis prends la valeur centrale.",
    tags: ["stat_statistique", "mediane", "impair", "template"],
    generate: () => genMediane([3, 7], false),
  },
  {
    kind: "template",
    id: "stat_mediane_tpl_4_pair",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_mediane",
    difficulty: 4,
    theme: "neutral",
    hint: "Avec un nombre pair, moyenne des deux valeurs centrales.",
    tags: ["stat_statistique", "mediane", "pair", "template"],
    generate: () => genMediane([6, 8], false),
  },
  {
    kind: "fixed",
    id: "stat_mediane_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_mediane",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment trouver la médiane d’une série ayant un nombre pair de valeurs.",
    format: "open",
    expected: ["ranger", "deux", "moyenne"],
    comparator: "contains_keyword",
    hint: "Il y a deux valeurs centrales.",
    explanation:
      "Définition : avec un nombre pair de valeurs, il y a deux valeurs centrales.\n\n" +
      "Méthode : on range la série, on repère les deux valeurs du milieu.\n\n" +
      "Calcul : la médiane est la moyenne de ces deux valeurs.\n\n" +
      "Conclusion : on prend la moyenne des deux valeurs centrales.",
    tags: ["stat_statistique", "mediane", "open"],
  },

  // ---------- STAT_ETENDUE ----------
  {
    kind: "fixed",
    id: "stat_etendue_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_etendue",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est l’étendue de la série : 3 ; 9 ; 5 ; 12 ?",
    format: "qcm",
    choices: ["9", "12", "3", "15"],
    expected: ["9"],
    comparator: "mcq_exact",
    hint: "Maximum - minimum = 12 - 3.",
    explanation:
      "Définition : l’étendue = maximum - minimum.\n\n" +
      "Méthode : on repère le plus grand (12) et le plus petit (3).\n\n" +
      "Calcul : 12 - 3 = 9.\n\n" +
      "Conclusion : l’étendue est 9.",
    tags: ["stat_statistique", "etendue", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_etendue_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_etendue",
    difficulty: 1,
    theme: "neutral",
    text: "L’étendue d’une série se calcule par…",
    format: "qcm",
    choices: ["maximum - minimum", "maximum + minimum", "somme ÷ nombre", "valeur centrale"],
    expected: ["maximum - minimum"],
    comparator: "mcq_exact",
    hint: "C’est un écart entre extrêmes.",
    explanation:
      "Définition : l’étendue mesure l’écart entre les extrêmes.\n\n" +
      "Méthode : on soustrait le minimum du maximum.\n\n" +
      "Calcul : étendue = maximum - minimum.\n\n" +
      "Conclusion : la formule est maximum - minimum.",
    tags: ["stat_statistique", "etendue", "qcm"],
  },
  {
    kind: "template",
    id: "stat_etendue_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_etendue",
    difficulty: 3,
    theme: "neutral",
    hint: "Repère le min et le max.",
    tags: ["stat_statistique", "etendue", "template"],
    generate: () => genEtendue([6, 7, 8], false),
  },
  {
    kind: "template",
    id: "stat_etendue_tpl_4_contexte",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_etendue",
    difficulty: 3,
    theme: "neutral",
    hint: "Étendue = plus grande valeur − plus petite valeur.",
    tags: ["stat_statistique", "etendue", "contexte", "template"],
    generate: () => genEtendue([4, 5, 6, 7], false),
  },
  {
    kind: "fixed",
    id: "stat_etendue_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_etendue",
    difficulty: 3,
    theme: "neutral",
    text: "Deux séries ont la même moyenne. La série dont l’étendue est la plus petite est…",
    format: "qcm",
    choices: ["la plus regroupée", "la plus dispersée", "la plus grande", "impossible à comparer"],
    expected: ["la plus regroupée"],
    comparator: "mcq_exact",
    hint: "Petite étendue = valeurs proches.",
    explanation:
      "Définition : l’étendue mesure la dispersion.\n\n" +
      "Méthode : une petite étendue signifie des valeurs proches.\n\n" +
      "Calcul : moins d’écart entre extrêmes = série regroupée.\n\n" +
      "Conclusion : la plus petite étendue correspond à la série la plus regroupée.",
    tags: ["stat_statistique", "etendue", "interpretation", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_etendue_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_etendue",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi l’étendue ne dépend que de deux valeurs.",
    format: "open",
    expected: ["maximum", "minimum", "extrêmes"],
    comparator: "contains_keyword",
    hint: "Quelles valeurs interviennent dans le calcul ?",
    explanation:
      "Définition : l’étendue = maximum - minimum.\n\n" +
      "Méthode : seules les valeurs extrêmes interviennent.\n\n" +
      "Calcul : les valeurs intermédiaires ne changent pas l’étendue.\n\n" +
      "Conclusion : l’étendue ne dépend que du maximum et du minimum.",
    tags: ["stat_statistique", "etendue", "open"],
  },

  // ---------- STAT_INTERPRETATION ----------
  {
    kind: "fixed",
    id: "stat_interpreter_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_interpreter",
    difficulty: 3,
    theme: "neutral",
    text: "Quel indicateur mesure la dispersion d’une série ?",
    format: "qcm",
    choices: ["l’étendue", "la moyenne", "la médiane", "l’effectif"],
    expected: ["l’étendue"],
    comparator: "mcq_exact",
    hint: "C’est l’écart entre les extrêmes.",
    explanation:
      "Définition : la dispersion décrit l’écart entre les valeurs.\n\n" +
      "Méthode : on choisit l’indicateur d’écart.\n\n" +
      "Calcul : l’étendue (max - min) mesure la dispersion.\n\n" +
      "Conclusion : c’est l’étendue.",
    tags: ["stat_statistique", "interpretation", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_interpreter_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_interpreter",
    difficulty: 3,
    theme: "neutral",
    text: "Quel indicateur n’est pas influencé par une seule valeur extrême ?",
    format: "qcm",
    choices: ["la médiane", "la moyenne", "l’étendue", "la somme"],
    expected: ["la médiane"],
    comparator: "mcq_exact",
    hint: "La médiane dépend de la position, pas des valeurs extrêmes.",
    explanation:
      "Définition : la médiane est la valeur centrale.\n\n" +
      "Méthode : elle dépend de la position, pas de la taille des extrêmes.\n\n" +
      "Calcul : une valeur extrême change la moyenne et l’étendue, mais peu la médiane.\n\n" +
      "Conclusion : la médiane résiste aux valeurs extrêmes.",
    tags: ["stat_statistique", "interpretation", "qcm"],
  },
  {
    kind: "template",
    id: "stat_interpreter_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_interpreter",
    difficulty: 4,
    theme: "neutral",
    hint: "Plus l’étendue est petite, plus les valeurs sont regroupées.",
    tags: ["stat_statistique", "interpretation", "template"],
    generate: () => genCompareEtendue("regulier"),
  },
  {
    kind: "fixed",
    id: "stat_interpreter_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_interpreter",
    difficulty: 3,
    theme: "neutral",
    text: "La moyenne d’une classe est 11/20. Peut-on en déduire la note de chaque élève ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "La moyenne résume, elle ne donne pas le détail.",
    explanation:
      "Définition : la moyenne est un résumé global.\n\n" +
      "Méthode : plusieurs répartitions donnent la même moyenne.\n\n" +
      "Calcul : 11 peut venir de 8 et 14, ou de 11 et 11, etc.\n\n" +
      "Conclusion : non, la moyenne ne donne pas chaque note.",
    tags: ["stat_statistique", "interpretation", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_interpreter_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_interpreter",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi il est utile d’utiliser plusieurs indicateurs pour décrire une série.",
    format: "open",
    expected: ["moyenne", "étendue", "dispersion"],
    comparator: "contains_keyword",
    hint: "Un seul indicateur ne dit pas tout.",
    explanation:
      "Définition : chaque indicateur décrit un aspect différent.\n\n" +
      "Méthode : la moyenne donne le niveau, l’étendue la dispersion, la médiane le centre.\n\n" +
      "Calcul : deux séries de même moyenne peuvent être très différentes.\n\n" +
      "Conclusion : plusieurs indicateurs donnent une image complète de la série.",
    tags: ["stat_statistique", "interpretation", "open"],
  },
  {
    kind: "template",
    id: "stat_interpreter_tpl_3_mieux",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_interpreter",
    difficulty: 4,
    theme: "neutral",
    hint: "À moyenne égale, on regarde la régularité.",
    tags: ["stat_statistique", "interpretation", "template"],
    generate: () => genCompareSeries(),
  },

  // ---------- STAT_PROBLEME ----------
  {
    kind: "fixed",
    id: "stat_probleme_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève a 12, 14 et 10 en maths. Quelle est sa moyenne ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Somme ÷ 3.",
    explanation:
      "Définition : la moyenne = somme ÷ nombre de notes.\n\n" +
      "Méthode : on additionne puis on divise par 3.\n\n" +
      "Calcul : (12 + 14 + 10) ÷ 3 = 36 ÷ 3 = 12.\n\n" +
      "Conclusion : la moyenne est 12.",
    tags: ["stat_statistique", "probleme", "moyenne"],
  },
  {
    kind: "fixed",
    id: "stat_probleme_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Sur 30 élèves, 18 font de l’anglais. Quelle est la fréquence en pourcentage ?",
    format: "qcm",
    choices: ["60 %", "18 %", "30 %", "12 %"],
    expected: ["60 %"],
    comparator: "mcq_exact",
    hint: "18 ÷ 30 = 0,6.",
    explanation:
      "Définition : fréquence = effectif ÷ total.\n\n" +
      "Méthode : on calcule 18 ÷ 30, puis × 100.\n\n" +
      "Calcul : 18 ÷ 30 = 0,6 = 60 %.\n\n" +
      "Conclusion : la fréquence est 60 %.",
    tags: ["stat_statistique", "probleme", "frequence", "qcm"],
  },
  {
    kind: "template",
    id: "stat_probleme_tpl_3_etendue",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Étendue = max - min.",
    tags: ["stat_statistique", "probleme", "etendue", "template"],
    generate: () => genNouvelleEtendue(),
  },
  {
    kind: "template",
    id: "stat_probleme_tpl_4_mediane",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Range les valeurs puis prends la centrale.",
    tags: ["stat_statistique", "probleme", "mediane", "template"],
    generate: () => genMediane([5, 6, 7, 8], false),
  },
  {
    kind: "template",
    id: "stat_probleme_tpl_5_total",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule d’abord la moyenne, puis compare chaque valeur à cette moyenne.",
    tags: ["stat_statistique", "probleme", "moyenne", "template"],
    generate: () => genAuDessusMoyenne(),
  },
  {
    kind: "fixed",
    id: "stat_probleme_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Explique quel indicateur choisir pour connaître le niveau moyen d’une classe.",
    format: "open",
    expected: ["moyenne", "somme", "divise"],
    comparator: "contains_keyword",
    hint: "Niveau moyen = moyenne.",
    explanation:
      "Définition : la moyenne donne le niveau global.\n\n" +
      "Méthode : on additionne les notes et on divise par leur nombre.\n\n" +
      "Calcul : moyenne = somme ÷ effectif.\n\n" +
      "Conclusion : pour le niveau moyen, on choisit la moyenne.",
    tags: ["stat_statistique", "probleme", "open"],
  },

  // ---------- STAT_DEFIS ----------
  {
    kind: "fixed",
    id: "stat_defi_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Une série est : 4 ; 4 ; 4 ; 4. Que vaut son étendue ?",
    format: "qcm",
    choices: ["0", "4", "16", "1"],
    expected: ["0"],
    comparator: "mcq_exact",
    hint: "Toutes les valeurs sont identiques.",
    explanation:
      "Définition : l’étendue = maximum - minimum.\n\n" +
      "Méthode : ici, maximum = minimum = 4.\n\n" +
      "Calcul : 4 - 4 = 0.\n\n" +
      "Conclusion : l’étendue est 0 (aucune dispersion).",
    tags: ["stat_statistique", "defi", "qcm"],
  },
  {
    kind: "fixed",
    id: "stat_defi_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève dit : « ajouter une note de 0 ne change pas la moyenne ». A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le nombre de valeurs change.",
    explanation:
      "Définition : la moyenne dépend de la somme ET du nombre de valeurs.\n\n" +
      "Méthode : ajouter un 0 augmente le nombre de valeurs sans augmenter la somme.\n\n" +
      "Calcul : la somme reste identique mais on divise par un nombre plus grand.\n\n" +
      "Conclusion : non, la moyenne diminue.",
    tags: ["stat_statistique", "defi", "moyenne", "qcm"],
  },
  {
    kind: "template",
    id: "stat_defi_tpl_2_moyenne_ponderee",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Chaque note compte autant de fois que son effectif.",
    tags: ["stat_statistique", "defi", "moyenne_ponderee", "template"],
    generate: () => genCoefficients(),
  },
  {
    kind: "fixed",
    id: "stat_defi_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi la médiane peut mieux représenter une série que la moyenne quand il y a une valeur très grande.",
    format: "open",
    expected: ["médiane", "extrême", "moyenne"],
    comparator: "contains_keyword",
    hint: "Pense à l’effet d’une valeur extrême.",
    explanation:
      "Définition : la médiane est la valeur centrale, peu sensible aux extrêmes.\n\n" +
      "Méthode : une valeur très grande tire la moyenne vers le haut.\n\n" +
      "Calcul : la médiane reste proche du centre des données.\n\n" +
      "Conclusion : avec une valeur extrême, la médiane représente souvent mieux la série.",
    tags: ["stat_statistique", "defi", "open"],
  },
  {
    kind: "fixed",
    id: "stat_defi_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Dans la série 2 ; 2 ; 2 ; 100, quel indicateur est le plus « tiré vers le haut » par le 100 ?",
    format: "qcm",
    choices: ["la moyenne", "la médiane", "le minimum", "l’effectif"],
    expected: ["la moyenne"],
    comparator: "mcq_exact",
    hint: "La moyenne utilise toutes les valeurs.",
    explanation:
      "Définition : la moyenne tient compte de toutes les valeurs.\n\n" +
      "Méthode : on compare l’effet de la valeur extrême.\n\n" +
      "Calcul : la moyenne vaut (2+2+2+100)÷4 = 26,5, alors que la médiane vaut 2.\n\n" +
      "Conclusion : c’est la moyenne qui est tirée vers le haut.",
    tags: ["stat_statistique", "defi", "qcm"],
  },
  {
    kind: "template",
    id: "stat_defi_tpl_3_valeur_manquante",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Somme totale = moyenne × nombre de valeurs.",
    tags: ["stat_statistique", "defi", "valeur_manquante", "template"],
    generate: () => genAjoutValeur(),
  },
  {
    kind: "fixed",
    id: "stat_defi_open_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi deux séries peuvent avoir la même moyenne mais des étendues très différentes.",
    format: "open",
    expected: ["moyenne", "étendue", "dispersion"],
    comparator: "contains_keyword",
    hint: "La moyenne ne dit rien sur la dispersion.",
    explanation:
      "Définition : la moyenne mesure le niveau, l’étendue mesure la dispersion.\n\n" +
      "Méthode : on peut garder la même somme avec des valeurs plus ou moins écartées.\n\n" +
      "Calcul : par exemple 9 ; 11 et 2 ; 18 ont une moyenne de 10 mais des étendues différentes.\n\n" +
      "Conclusion : la moyenne n’indique pas la dispersion, d’où des étendues différentes.",
    tags: ["stat_statistique", "defi", "open"],
  },

  /* =========================================================================
     STAT_DONNEE_DEFI — le bloc de défis de la notion neuve (28/08/2026)
  =========================================================================
     ⭐ La scission a laissé `stat_donnee` sans défis : `stat_defi` est resté
     avec les INDICATEURS, où il a toute sa place. Ces trois gabarits font le
     travail de l'autre moitié — LIRE et COMPTER, jamais calculer une moyenne.
     ⛔ Des générateurs, pas du figé : le bloc de défis d'une notion neuve est
     précisément celui qu'on est tenté de bâcler.
  ========================================================================= */
  {
    kind: "template",
    id: "4e_stat_donnee_defi_tpl_1_effectif_frequence",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Une fréquence se rapporte au TOTAL, pas à l'autre catégorie.",
    tags: ["stat_donnee", "defi", "frequence", "template", "canvas"],
    // ⚠️ 04/10 : l'ancienne version demandait un pourcentage qui ne tombait pas
    // juste (b ÷ total quelconque) SANS dire qu'il fallait arrondir. Le total
    // est désormais rond et le pourcentage entier.
    generate: () => genDefiFreqRegroupee(),
  },
  {
    kind: "template",
    id: "4e_stat_donnee_defi_tpl_2_total_manquant",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "La somme des effectifs doit redonner le total annoncé.",
    tags: ["stat_donnee", "defi", "effectif", "template", "canvas"],
    // ⚠️ 04/10 : l'ancien diagramme DESSINAIT la barre « effacée » avec sa
    // valeur écrite dessus — la réponse était sous les yeux. Le diagramme ne
    // montre plus que les barres connues.
    generate: () => genDefiEffaceGraphe(),
  },
  {
    kind: "template",
    id: "4e_stat_donnee_defi_tpl_3_lire_le_bon",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Lis la question avant le graphique : que demande-t-elle exactement ?",
    tags: ["stat_donnee", "defi", "lecture", "qcm", "template", "canvas"],
    generate: () => genDefiEcart(),
  },
  {
    kind: "template",
    id: "4e_stat_donnee_defi_tpl_4_camembert",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_donnee_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Un pourcentage n'est pas un effectif : prends ce pourcentage de l'effectif total.",
    tags: ["stat_donnee", "defi", "frequence", "camembert", "template", "canvas"],
    generate: () => genDefiCamembert(),
  },

  /* =========================================================================
     ⛔⛔ 04/10/2026 — GABARITS AJOUTÉS : une étoile servie sans gabarit
     (seulement du figé) faisait revenir les mêmes questions en boucle.
  ========================================================================= */
  {
    kind: "template",
    id: "stat_lire_graphique_tpl_6_lire",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_lire_graphique",
    difficulty: 1,
    theme: "neutral",
    hint: "Trouve la barre de la catégorie demandée et lis le nombre écrit au-dessus.",
    tags: ["stat_statistique", "graphique", "barres", "canvas", "template"],
    generate: () => genGrapheLireCat(),
  },
  {
    kind: "template",
    id: "stat_lire_graphique_tpl_7_calcul",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_lire_graphique",
    difficulty: 3,
    theme: "neutral",
    hint: "Lis d'abord les barres utiles, puis fais le calcul demandé.",
    tags: ["stat_statistique", "graphique", "barres", "canvas", "template"],
    generate: () => genGrapheCalcul(),
  },
  {
    kind: "template",
    id: "stat_effectif_tpl_5_compter",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_effectif",
    difficulty: 1,
    theme: "neutral",
    hint: "Compte une à une les apparitions de la valeur demandée.",
    tags: ["stat_statistique", "effectif", "comptage", "template"],
    generate: () => genCompterListe(),
  },
  {
    kind: "template",
    id: "stat_effectif_tpl_6_au_moins",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_effectif",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne les effectifs de toutes les valeurs concernées.",
    tags: ["stat_statistique", "effectif", "template"],
    generate: () => genAuMoins(),
  },
  {
    kind: "template",
    id: "stat_frequence_tpl_6_qcm",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_donnee",
    microId: "stat_frequence",
    difficulty: 2,
    theme: "neutral",
    hint: "Fréquence = effectif de la catégorie ÷ effectif total.",
    tags: ["stat_statistique", "frequence", "qcm", "template"],
    generate: () => genFreqQCM(),
  },
  {
    kind: "template",
    id: "stat_moyenne_tpl_6_trois_valeurs",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_moyenne",
    difficulty: 2,
    theme: "neutral",
    hint: "Additionne les trois valeurs, puis divise par 3.",
    tags: ["stat_statistique", "moyenne", "template"],
    generate: () => genMoyenne(3, 3, false),
  },
  {
    kind: "template",
    id: "stat_moyenne_tpl_7_longue",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_moyenne",
    difficulty: 4,
    theme: "neutral",
    hint: "Additionne toutes les valeurs (compte-les bien), puis divise par leur nombre.",
    tags: ["stat_statistique", "moyenne", "template"],
    generate: () => genMoyenne(7, 8, true),
  },
  {
    kind: "template",
    id: "stat_mediane_tpl_5_rangee",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_mediane",
    difficulty: 2,
    theme: "neutral",
    hint: "La série est déjà rangée : la médiane est la valeur du milieu.",
    tags: ["stat_statistique", "mediane", "template"],
    generate: () => genMediane([3, 5, 7], true),
  },
  {
    kind: "template",
    id: "stat_etendue_tpl_5_extremes",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_etendue",
    difficulty: 1,
    theme: "neutral",
    hint: "Étendue = plus grande valeur − plus petite valeur.",
    tags: ["stat_statistique", "etendue", "template"],
    generate: () => genEtendueMinMax(),
  },
  {
    kind: "template",
    id: "stat_etendue_tpl_6_rangee",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_etendue",
    difficulty: 2,
    theme: "neutral",
    hint: "Dans une série rangée, la plus petite valeur est au début, la plus grande à la fin.",
    tags: ["stat_statistique", "etendue", "template"],
    generate: () => genEtendue([4, 5], true),
  },
  {
    kind: "template",
    id: "stat_interpreter_tpl_4_sens",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_interpreter",
    difficulty: 3,
    theme: "neutral",
    hint: "Ne garde que ce que la définition de l'indicateur garantit.",
    tags: ["stat_statistique", "interpretation", "qcm", "template"],
    generate: () => genSensIndicateur(),
  },
  {
    kind: "template",
    id: "stat_interpreter_tpl_5_quel_indicateur",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_interpreter",
    difficulty: 3,
    theme: "neutral",
    hint: "Moyenne : partage égal du total. Médiane : milieu de la série rangée. Étendue : écart entre les extrêmes.",
    tags: ["stat_statistique", "interpretation", "qcm", "template"],
    generate: () => genQuelIndicateur(),
  },
  {
    kind: "template",
    id: "stat_probleme_tpl_6_ecart_moyenne",
    niveau: "4e",
    matiere: "maths",
    notionId: "stat_statistique",
    microId: "stat_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule la moyenne, puis l'écart avec la valeur demandée.",
    tags: ["stat_statistique", "probleme", "moyenne", "template"],
    generate: () => genEcartMoyenne(),
  },
];
