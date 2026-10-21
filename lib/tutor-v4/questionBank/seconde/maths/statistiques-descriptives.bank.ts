// lib/tutor-v4/questionBank/seconde/maths/statistiques-descriptives.bank.ts
//
// Chapitre : Statistiques descriptives de 2de (notion statistiques_descriptives).
//
// ⛔⛔ 21/10/2026 — RÉÉCRITE EN GÉNÉRATEURS. Mesure de départ
// (scripts/mesurer-squelettes-coach.ts seconde statistiques_descriptives) :
// 9 micros sur 9 sous le seuil, 8 à 35 squelettes d'énoncé, des gabarits qui ne
// changeaient que les NOMBRES (un seul squelette chacun). Les élèves revoyaient
// la même phrase.
//
// Chaque gabarit compose désormais une SITUATION tirée d'une table (SERIES :
// une série de mesures ; DISCRETS : un caractère compté avec ses effectifs ;
// CLASSES : des valeurs regroupées en classes ; COEFFS : des critères
// coefficientés ; LIN : une transformation de toutes les valeurs) × une
// TOURNURE. Chaque situation est portée par un MÉTIER (météorologue,
// sage-femme, apicultrice, ingénieur du son…) : les maths sont transversales.
//
// Conventions du programme de 2de, tenues partout :
// - médiane : valeur centrale de la série rangée (n impair), demi-somme des
//   deux valeurs centrales (n pair) ;
// - Q1 (resp. Q3) : plus petite valeur de la série telle qu'AU MOINS 25 %
//   (resp. 75 %) des valeurs lui sont inférieures ou égales → rang ⌈n/4⌉
//   (resp. ⌈3n/4⌉) dans la série rangée ;
// - écart type : σ = √( (1/N) Σ nᵢ (xᵢ − x̄)² ), celui de la calculatrice (σx).
// Les nombres s'écrivent à la française (« 12,5 »), les listes se séparent par
// « ; » (une virgule y serait ambiguë), tout arrondi est annoncé dans l'énoncé.

import type { TutorBankItemV4, TutorGeneratedQuestionV4, CanvasFigure } from "@/lib/tutor-v4/types";

type Q = TutorGeneratedQuestionV4;
type Etoile = 1 | 2 | 3 | 4 | 5;

/* ============================== OUTILS ============================== */

function rnd(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function pick<T>(xs: readonly T[]): T {
  return xs[Math.floor(Math.random() * xs.length)];
}
function shuffle<T>(xs: readonly T[]): T[] {
  const s = [...xs];
  for (let i = s.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [s[i], s[j]] = [s[j], s[i]];
  }
  return s;
}
const somme = (xs: number[]) => xs.reduce((s, v) => s + v, 0);
const trie = (xs: number[]) => [...xs].sort((a, b) => a - b);
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** « de » élidé devant voyelle : « d'appartements », « de familles ». */
const de = (n: string) => (/^[aeiouéèêâîôûh]/i.test(n) ? "d'" + n : "de " + n);

/** Arrondi à d décimales (sans les faux 2,4999999). */
function arr(x: number, d = 2): number {
  const f = 10 ** d;
  return Math.round(x * f + (x >= 0 ? 1e-7 : -1e-7)) / f;
}
/** 3600 → « 3 600 », 12.5 → « 12,5 » : le texte de l'énoncé et la réponse attendue. */
function fr(x: number, d = 2): string {
  const r = arr(x, d);
  const [e, dec] = String(Math.abs(r)).split(".");
  return (r < 0 ? "-" : "") + e.replace(/\B(?=(\d{3})+(?!\d))/g, " ") + (dec ? "," + dec : "");
}
/** La même écriture, en LaTeX : « 3\,600 », « 12{,}5 ». */
const frm = (x: number, d = 2) => fr(x, d).replace(",", "{,}").replace(/ /g, "\\,");
/** Une liste de valeurs dans le texte : « 12,5 ; 13 ; 9 ». */
const liste = (xs: number[], d = 2) => xs.map((x) => fr(x, d)).join(" ; ");
const listeM = (xs: number[], d = 2) => xs.map((x) => frm(x, d)).join(" ; ");

/** Arrondi annoncé : la phrase de l'énoncé et le nombre de décimales. */
const ARRONDIS = [
  { d: 1, txt: "Arrondis au dixième." },
  { d: 2, txt: "Arrondis au centième." },
] as const;

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return (
    `Définition : ${definition}\n\n` +
    `Méthode : ${methode}\n\n` +
    `Calcul / Observation : ${calcul}\n\n` +
    `Conclusion : ${conclusion}`
  );
}

/** La VALEUR d'une proposition : « 12,5 », « 25 % », « $12{,}5$ ». */
function valeurChoix(s: string): number {
  // « 3\,600{,}5 » : l'espace fine des milliers d'abord, puis la virgule décimale.
  const t = s.replace(/\\,/g, "").replace(/[$\s\\]/g, "").replace("{,}", ".").replace(",", ".").replace("%", "");
  const m = t.match(/-?\d+(?:\.\d+)?/);
  return m ? Number(m[0]) : NaN;
}

/**
 * QCM numérique : jamais deux propositions de même VALEUR (« 32 » ≠ « 32 000 »
 * reste vrai : on compare des nombres, pas des textes). Trois leurres au plus,
 * pris dans l'ordre donné puis dans le secours ; la position de la bonne
 * réponse est mélangée par questionPairBuilder.
 */
function choixValeurs(correct: string, leurres: string[], secours: string[] = []): string[] {
  const vus = [valeurChoix(correct)];
  const sortie = [correct];
  for (const w of [...leurres, ...secours]) {
    if (sortie.length === 4) break;
    const v = valeurChoix(w);
    if (!Number.isFinite(v) || vus.some((x) => Math.abs(x - v) < 1e-9)) continue;
    vus.push(v);
    sortie.push(w);
  }
  return sortie;
}
/** QCM de phrases : propositions deux à deux différentes. */
function choixTextes(correct: string, leurres: string[]): string[] {
  const sortie = [correct];
  for (const w of leurres) if (sortie.length < 4 && !sortie.includes(w)) sortie.push(w);
  return sortie;
}

/* ----------------------------- calculs ----------------------------- */

function mediane(xs: number[]): number {
  const s = trie(xs);
  const n = s.length;
  return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2;
}
/** Quartile du programme : la valeur de rang ⌈p·n⌉ de la série rangée. */
function quartile(xs: number[], p: 0.25 | 0.75): number {
  const s = trie(xs);
  return s[Math.ceil(p * s.length - 1e-9) - 1];
}
const rangQ = (n: number, p: 0.25 | 0.75) => Math.ceil(p * n - 1e-9);
function moyenne(xs: number[], effs?: number[]): number {
  if (!effs) return somme(xs) / xs.length;
  return somme(xs.map((x, i) => x * effs[i])) / somme(effs);
}
function ecartType(xs: number[], effs?: number[]): number {
  const e = effs ?? xs.map(() => 1);
  const m = moyenne(xs, e);
  return Math.sqrt(somme(xs.map((x, i) => e[i] * (x - m) ** 2)) / somme(e));
}
/** Valeur de rang r (1 = la plus petite) d'un tableau valeurs / effectifs. */
function valeurDeRang(vals: number[], effs: number[], r: number): number {
  let c = 0;
  for (let i = 0; i < vals.length; i += 1) {
    c += effs[i];
    if (c >= r) return vals[i];
  }
  return vals[vals.length - 1];
}
function cumuls(effs: number[]): number[] {
  let c = 0;
  return effs.map((e) => (c += e));
}

/* ----------------------------- figures ----------------------------- */

/** Le tableau valeurs / effectifs. Pas de `label` de ligne : sinon le rendu
 *  écrit « Données » dans le coin (TableauDonneesCanvas). */
function tableauEffectifs(colValeur: string, valeurs: (string | number)[], effectifs: number[], ligne = "Effectif"): CanvasFigure {
  return {
    kind: "tableau_donnees",
    headers: [colValeur, ...valeurs.map((v) => (typeof v === "number" ? fr(v) : v))],
    rows: [{ values: [ligne, ...effectifs] }],
    display: { compact: true },
  };
}

function diagrammeBarres(
  labels: string[],
  valeurs: number[],
  opts: { valeurs?: boolean; axeY?: string; type?: "barres" | "batons"; titre?: string } = {},
): CanvasFigure {
  return {
    kind: "stat_graph",
    graphType: opts.type ?? "barres",
    title: opts.titre,
    data: labels.map((label, i) => ({ label, value: valeurs[i] })),
    display: { showLabels: true, showValues: opts.valeurs ?? true, showAxis: !(opts.valeurs ?? true), axeY: opts.axeY },
    size: { width: 340, height: 230 },
  };
}

type Cinq = { min: number; q1: number; mediane: number; q3: number; max: number };
function diagrammeBoites(series: (Cinq & { label?: string })[], titre?: string): CanvasFigure {
  const couleurs = ["#2563eb", "#059669"];
  return {
    kind: "diagramme_boite",
    titre,
    series: series.map((s, i) => ({ ...s, couleur: couleurs[i] })),
    size: { width: 340 },
  };
}

/**
 * La même série, dans le désordre — et JAMAIS dans l'ordre par accident.
 * ⛔ On remélange tant que la liste sort triée, que son premier terme est le
 * minimum, ou que la valeur du MILIEU de la liste brute est déjà la médiane :
 * l'élève qui lit le centre sans ranger ne doit pas tomber juste.
 */
function melanger(serie: number[]): number[] {
  const t = trie(serie);
  const n = t.length;
  let s = shuffle(serie);
  for (let k = 0; k < 60; k += 1) {
    const milieuBrut = n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2;
    if (!s.every((v, i) => v === t[i]) && s[0] !== t[0] && Math.abs(milieuBrut - mediane(t)) > 1e-9) break;
    s = shuffle(serie);
  }
  return s;
}

/* ------------------------- fabrique d'items ------------------------- */

function T(microId: string, difficulty: Etoile, id: string, hint: string, tags: string[], generate: () => Q): TutorBankItemV4 {
  return {
    kind: "template",
    id: `seconde_stat_${id}`,
    niveau: "seconde",
    matiere: "maths",
    notionId: "statistiques_descriptives",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["seconde", "maths", "statistiques", ...tags, "template"],
    generate,
  };
}
const court = (text: string, reponse: string, explanation: string, canvas?: CanvasFigure): Q => ({
  text,
  format: "short",
  expected: [reponse],
  comparator: "number_equal",
  explanation,
  ...(canvas ? { canvas } : {}),
});
const qcm = (text: string, choices: string[], explanation: string, canvas?: CanvasFigure): Q => ({
  text,
  format: "qcm",
  choices,
  expected: [choices[0]],
  comparator: "mcq_exact",
  explanation,
  ...(canvas ? { canvas } : {}),
});

/* ============================ SITUATIONS ============================ */

/** Une série de mesures, portée par un métier. Le texte se compose ainsi :
 *  « {qui} {quoi} {sur(n)} : 21 ; 24 ; … ». */
type Serie = {
  qui: string;
  quoi: string;
  sur: (n: number) => string;
  /** Groupe nominal pluriel : « ces températures ». */
  ces: string;
  unite: string;
  min: number;
  max: number;
  pas: number;
  /** Décimales des valeurs (0 sauf mesures fines). */
  dec: number;
  /** Deux séries du même genre, pour comparer. */
  deux: [string, string];
  /** Étiquette courte d'un individu sous une barre : « J » → J1, J2… */
  etiq: string;
};

const SERIES: Serie[] = [
  { qui: "Une météorologue", quoi: "a relevé la température maximale (en °C)", sur: (n) => `pendant ${n} jours`, ces: "ces températures", unite: "°C", min: 14, max: 33, pas: 1, dec: 0, deux: ["Lille", "Marseille"], etiq: "J" },
  { qui: "Une sage-femme", quoi: "a noté la masse (en g)", sur: (n) => `de ${n} nouveau-nés de sa maternité`, ces: "ces masses", unite: "g", min: 2700, max: 4300, pas: 10, dec: 0, deux: ["la maternité du nord", "la maternité du sud"], etiq: "B" },
  { qui: "Un entraîneur d'athlétisme", quoi: "a mesuré les sauts en longueur (en cm)", sur: (n) => `de ${n} athlètes de son club`, ces: "ces sauts", unite: "cm", min: 420, max: 640, pas: 5, dec: 0, deux: ["le club de Lyon", "le club de Nantes"], etiq: "A" },
  { qui: "Une éleveuse", quoi: "a mesuré la production de lait (en L) sur une journée", sur: (n) => `de ${n} vaches de son troupeau`, ces: "ces productions", unite: "L", min: 18, max: 38, pas: 1, dec: 0, deux: ["la ferme des Pins", "la ferme du Moulin"], etiq: "V" },
  { qui: "Un infirmier", quoi: "a mesuré la fréquence cardiaque au repos (en battements par minute)", sur: (n) => `de ${n} patients`, ces: "ces fréquences", unite: "battements par minute", min: 52, max: 96, pas: 1, dec: 0, deux: ["le service de cardiologie", "le service de pneumologie"], etiq: "P" },
  { qui: "Une productrice de musique", quoi: "a chronométré la durée (en s)", sur: (n) => (n <= 20 ? `des ${n} morceaux d'un album` : `de ${n} morceaux d'une plateforme d'écoute`), ces: "ces durées", unite: "s", min: 150, max: 320, pas: 1, dec: 0, deux: ["le premier album", "le deuxième album"], etiq: "M" },
  { qui: "Une ingénieure en environnement", quoi: "a pesé les déchets plastiques ramassés (en kg)", sur: (n) => `lors de ${n} nettoyages de plage`, ces: "ces masses", unite: "kg", min: 12, max: 60, pas: 1, dec: 0, deux: ["la plage nord", "la plage sud"], etiq: "N" },
  { qui: "Un caissier", quoi: "a relevé le montant (en €)", sur: (n) => `des achats de ${n} clients`, ces: "ces montants", unite: "€", min: 8, max: 95, pas: 1, dec: 0, deux: ["le samedi", "le mardi"], etiq: "C" },
  { qui: "Un technicien de maintenance éolienne", quoi: "a relevé la production d'un parc (en MWh)", sur: (n) => `pendant ${n} jours`, ces: "ces productions", unite: "MWh", min: 12, max: 64, pas: 1, dec: 0, deux: ["le parc côtier", "le parc de montagne"], etiq: "J" },
  { qui: "Une pharmacienne", quoi: "a compté les ordonnances reçues chaque jour", sur: (n) => `pendant ${n} jours`, ces: "ces nombres d'ordonnances", unite: "ordonnances", min: 35, max: 110, pas: 1, dec: 0, deux: ["la pharmacie du centre", "la pharmacie du port"], etiq: "J" },
  { qui: "Un biologiste marin", quoi: "a mesuré la longueur de la carapace (en cm)", sur: (n) => `de ${n} tortues vertes`, ces: "ces longueurs", unite: "cm", min: 62, max: 112, pas: 1, dec: 0, deux: ["la baie de l'Ermitage", "la baie de Saint-Paul"], etiq: "T" },
  { qui: "Une libraire", quoi: "a compté les livres vendus chaque jour", sur: (n) => `pendant ${n} jours`, ces: "ces ventes", unite: "livres", min: 14, max: 62, pas: 1, dec: 0, deux: ["la librairie du centre", "la librairie de la gare"], etiq: "J" },
  { qui: "Une conductrice de bus", quoi: "a noté son retard (en min) à l'arrivée", sur: (n) => `de ${n} trajets`, ces: "ces retards", unite: "min", min: 0, max: 14, pas: 1, dec: 0, deux: ["la ligne 3", "la ligne 8"], etiq: "T" },
  { qui: "Une apicultrice", quoi: "a pesé le miel récolté (en kg)", sur: (n) => `dans ${n} ruches`, ces: "ces récoltes", unite: "kg", min: 8, max: 32, pas: 1, dec: 0, deux: ["le rucher des collines", "le rucher de la plaine"], etiq: "R" },
  { qui: "Un chef cuisinier", quoi: "a compté les couverts servis chaque soir", sur: (n) => `pendant ${n} soirs`, ces: "ces nombres de couverts", unite: "couverts", min: 28, max: 96, pas: 1, dec: 0, deux: ["le restaurant du port", "le restaurant de la place"], etiq: "S" },
  { qui: "Une hydrologue", quoi: "a mesuré les précipitations (en mm)", sur: (n) => `pendant ${n} mois`, ces: "ces hauteurs de pluie", unite: "mm", min: 18, max: 190, pas: 1, dec: 0, deux: ["Brest", "Perpignan"], etiq: "M" },
  { qui: "Une entraîneuse de basket", quoi: "a noté les points marqués par son équipe", sur: (n) => `lors de ${n} matchs`, ces: "ces scores", unite: "points", min: 52, max: 98, pas: 1, dec: 0, deux: ["l'équipe des cadettes", "l'équipe des seniors"], etiq: "M" },
  { qui: "Un vétérinaire", quoi: "a pesé (en kg)", sur: (n) => `${n} chiens reçus en consultation`, ces: "ces masses", unite: "kg", min: 4, max: 42, pas: 1, dec: 0, deux: ["la clinique A", "la clinique B"], etiq: "C" },
  { qui: "Un ingénieur du son", quoi: "a mesuré le niveau sonore maximal (en dB)", sur: (n) => `pendant ${n} concerts`, ces: "ces niveaux", unite: "dB", min: 82, max: 108, pas: 1, dec: 0, deux: ["la salle de rock", "la salle de jazz"], etiq: "C" },
  { qui: "Une guide de randonnée", quoi: "a noté le dénivelé positif (en m)", sur: (n) => `de ${n} randonnées`, ces: "ces dénivelés", unite: "m", min: 250, max: 1400, pas: 10, dec: 0, deux: ["le massif des Vosges", "le massif des Pyrénées"], etiq: "R" },
  { qui: "Une arboricultrice", quoi: "a pesé les mangues récoltées (en kg)", sur: (n) => `sur ${n} arbres`, ces: "ces récoltes", unite: "kg", min: 18, max: 64, pas: 1, dec: 0, deux: ["le verger du haut", "le verger du bas"], etiq: "A" },
  { qui: "Une économiste", quoi: "a relevé le loyer mensuel (en €)", sur: (n) => `de ${n} appartements d'un quartier`, ces: "ces loyers", unite: "€", min: 420, max: 980, pas: 10, dec: 0, deux: ["le quartier de la gare", "le quartier du port"], etiq: "L" },
  { qui: "Un développeur de jeux vidéo", quoi: "a mesuré la durée (en min)", sur: (n) => `de ${n} parties de son jeu`, ces: "ces durées", unite: "min", min: 6, max: 48, pas: 1, dec: 0, deux: ["la version 1", "la version 2"], etiq: "P" },
  { qui: "Un coursier à vélo", quoi: "a noté la distance parcourue (en km) chaque jour", sur: (n) => `pendant ${n} jours`, ces: "ces distances", unite: "km", min: 18, max: 72, pas: 1, dec: 0, deux: ["Paul", "Yasmine"], etiq: "J" },
  { qui: "Une entraîneuse de natation", quoi: "a chronométré le 50 m nage libre (en s)", sur: (n) => `de ${n} nageuses`, ces: "ces temps", unite: "s", min: 27, max: 36, pas: 0.1, dec: 1, deux: ["le club de Rennes", "le club de Nice"], etiq: "N" },
  { qui: "Une pédiatre", quoi: "a mesuré la taille (en cm)", sur: (n) => `de ${n} enfants de six ans`, ces: "ces tailles", unite: "cm", min: 108, max: 126, pas: 0.5, dec: 1, deux: ["l'école A", "l'école B"], etiq: "E" },
];

/** Une valeur plausible du contexte (multiple du pas, entre min et max). */
function valeur(c: Serie, min = c.min, max = c.max): number {
  const k = rnd(0, Math.floor((max - min) / c.pas + 1e-9));
  return arr(min + k * c.pas, 2);
}
function tirerSerie(c: Serie, n: number): number[] {
  return Array.from({ length: n }, () => valeur(c));
}
/** n valeurs deux à deux DISTINCTES. */
function tirerDistinctes(c: Serie, n: number): number[] {
  const s = new Set<number>();
  for (let k = 0; s.size < n && k < 500; k += 1) s.add(valeur(c));
  return [...s];
}
const phrase = (c: Serie, n: number) => `${c.qui} ${c.quoi} ${c.sur(n)}`;
/** « 21 °C », « 3 600 g », « 54 points ». */
const avecU = (c: Serie, x: number, d = 2) =>
  `${fr(x, d)} ${Math.abs(x) < 2 ? c.unite.replace(/^(battement|ordonnance|livre|couvert|point)s/, "$1") : c.unite}`;
/** « le projet » → « du projet », « la candidate » → « de la candidate ». */
const deGN = (gn: string) => (gn.startsWith("le ") ? "du " + gn.slice(3) : gn.startsWith("les ") ? "des " + gn.slice(4) : "de " + gn);

/** « 1 enfant », « 0 enfant », « 3 enfants ». */
const pl = (v: number, sg: string, plur = sg + "s") => (Math.abs(v) >= 2 ? plur : sg);

/** Un caractère compté (petites valeurs entières) et son tableau d'effectifs.
 *  `cond(c, v)` écrit la condition après « Combien de {individus} » :
 *  cond("au moins ", 3) → « ont au moins 3 pièces ». */
type Discret = {
  intro: string;
  individus: string;
  col: string;
  vmin: number;
  k: number;
  cond: (c: string, v: number) => string;
};

const DISCRETS: Discret[] = [
  { intro: "Un agent immobilier a relevé le nombre de pièces des appartements à vendre dans une ville.", individus: "appartements", col: "Nombre de pièces", vmin: 1, k: 6, cond: (c, v) => `ont ${c}${v} ${pl(v, "pièce")}` },
  { intro: "Une sociologue a interrogé des familles sur leur nombre d'enfants.", individus: "familles", col: "Nombre d'enfants", vmin: 0, k: 6, cond: (c, v) => `ont ${c}${v} ${pl(v, "enfant")}` },
  { intro: "Un entraîneur de football a compté les buts marqués par son équipe à chaque match de la saison.", individus: "matchs", col: "Buts marqués", vmin: 0, k: 6, cond: (c, v) => `ont vu son équipe marquer ${c}${v} ${pl(v, "but")}` },
  { intro: "Une libraire a noté le nombre de livres achetés par chaque client un samedi.", individus: "clients", col: "Livres achetés", vmin: 1, k: 6, cond: (c, v) => `ont acheté ${c}${v} ${pl(v, "livre")}` },
  { intro: "Une infirmière scolaire a demandé aux élèves de 2de combien d'heures ils avaient dormi la nuit dernière.", individus: "élèves", col: "Heures de sommeil", vmin: 5, k: 6, cond: (c, v) => `ont dormi ${c}${v} ${pl(v, "heure")}` },
  { intro: "Un viticulteur a compté les grappes sur des pieds de vigne de sa parcelle.", individus: "pieds de vigne", col: "Nombre de grappes", vmin: 8, k: 6, cond: (c, v) => `portent ${c}${v} grappes` },
  { intro: "Une professeure de piano a compté les fausses notes de chaque élève pendant l'audition.", individus: "élèves", col: "Fausses notes", vmin: 0, k: 6, cond: (c, v) => `ont fait ${c}${v} ${pl(v, "fausse note", "fausses notes")}` },
  { intro: "Un technicien réseau a relevé le nombre de coupures internet de chaque semaine de l'année.", individus: "semaines", col: "Coupures", vmin: 0, k: 5, cond: (c, v) => `ont connu ${c}${v} ${pl(v, "coupure")}` },
  { intro: "Une apicultrice a compté les cadres remplis de miel dans chacune de ses ruches.", individus: "ruches", col: "Cadres pleins", vmin: 4, k: 6, cond: (c, v) => `contiennent ${c}${v} cadres pleins` },
  { intro: "Un météorologue a compté, pour chaque semaine de l'année, le nombre de jours de pluie.", individus: "semaines", col: "Jours de pluie", vmin: 0, k: 8, cond: (c, v) => `ont compté ${c}${v} ${pl(v, "jour")} de pluie` },
  { intro: "Une ludothécaire a recueilli la note, en étoiles, donnée par des joueurs à un nouveau jeu de société.", individus: "joueurs", col: "Note (étoiles)", vmin: 1, k: 5, cond: (c, v) => `ont donné ${c}${v} ${pl(v, "étoile")}` },
  { intro: "Un kinésithérapeute a relevé le nombre de séances suivies par chacun de ses patients.", individus: "patients", col: "Nombre de séances", vmin: 3, k: 6, cond: (c, v) => `ont suivi ${c}${v} séances` },
  { intro: "Une contrôleuse de train a compté les bagages de chaque voyageur d'une voiture.", individus: "voyageurs", col: "Nombre de bagages", vmin: 0, k: 5, cond: (c, v) => `ont ${c}${v} ${pl(v, "bagage")}` },
  { intro: "Une agricultrice a compté les œufs pondus par chacune de ses poules en une semaine.", individus: "poules", col: "Œufs pondus", vmin: 3, k: 5, cond: (c, v) => `ont pondu ${c}${v} ${pl(v, "œuf")}` },
  { intro: "Une critique de cinéma a noté sur 10 chacun des films sortis cette année.", individus: "films", col: "Note sur 10", vmin: 3, k: 7, cond: (c, v) => `ont obtenu ${c}${v} sur 10` },
  { intro: "Une arbitre de tennis a compté les doubles fautes commises dans chaque match d'un tournoi.", individus: "matchs", col: "Doubles fautes", vmin: 0, k: 6, cond: (c, v) => `ont compté ${c}${v} ${pl(v, "double faute", "doubles fautes")}` },
  { intro: "Un dentiste a compté les caries des élèves examinés lors d'une visite au collège.", individus: "élèves", col: "Nombre de caries", vmin: 0, k: 5, cond: (c, v) => `ont ${c}${v} ${pl(v, "carie")}` },
];

const valeursDe = (c: Discret) => Array.from({ length: c.k }, (_, i) => c.vmin + i);
function effectifs(k: number, min = 1, max = 14): number[] {
  return Array.from({ length: k }, () => rnd(min, max));
}

/** Des valeurs regroupées en classes [a ; b[ de même amplitude. */
type Classes = { intro: string; individus: string; col: string; debut: number; largeur: number; k: number; unite: string };
const CLASSES: Classes[] = [
  { intro: "Une urbaniste a relevé le temps de trajet domicile-travail (en min) d'habitants d'une ville.", individus: "habitants", col: "Temps (min)", debut: 0, largeur: 10, k: 5, unite: "min" },
  { intro: "Un organisateur de festival de musique a relevé l'âge (en années) des spectateurs.", individus: "spectateurs", col: "Âge (ans)", debut: 10, largeur: 10, k: 6, unite: "ans" },
  { intro: "Un logisticien a pesé (en kg) les colis expédiés en une matinée.", individus: "colis", col: "Masse (kg)", debut: 0, largeur: 5, k: 5, unite: "kg" },
  { intro: "Une maraîchère a mesuré la hauteur (en cm) de ses plants de tomates.", individus: "plants", col: "Hauteur (cm)", debut: 20, largeur: 10, k: 5, unite: "cm" },
  { intro: "Un gendarme a relevé au radar la vitesse (en km/h) de véhicules sur une route de campagne.", individus: "véhicules", col: "Vitesse (km/h)", debut: 50, largeur: 10, k: 5, unite: "km/h" },
  { intro: "La responsable d'un service client a mesuré la durée (en min) des appels reçus.", individus: "appels", col: "Durée (min)", debut: 0, largeur: 4, k: 5, unite: "min" },
  { intro: "Une économiste a relevé le loyer mensuel (en €) d'appartements d'une ville moyenne.", individus: "appartements", col: "Loyer (€)", debut: 400, largeur: 100, k: 5, unite: "€" },
  { intro: "Un forestier a mesuré le diamètre (en cm) des arbres d'une parcelle.", individus: "arbres", col: "Diamètre (cm)", debut: 10, largeur: 10, k: 5, unite: "cm" },
  { intro: "Une coach sportive a relevé le temps (en min) mis par des coureurs pour boucler un 10 km.", individus: "coureurs", col: "Temps (min)", debut: 40, largeur: 5, k: 5, unite: "min" },
  { intro: "Un pêcheur professionnel a mesuré la longueur (en cm) des poissons d'une prise.", individus: "poissons", col: "Longueur (cm)", debut: 20, largeur: 5, k: 6, unite: "cm" },
];
const bornesDe = (c: Classes) => Array.from({ length: c.k + 1 }, (_, i) => c.debut + i * c.largeur);
const nomClasse = (a: number, b: number) => `[${fr(a)} ; ${fr(b)}[`;
const nomsClasses = (c: Classes) => bornesDe(c).slice(0, -1).map((a) => nomClasse(a, a + c.largeur));
const centres = (c: Classes) => bornesDe(c).slice(0, -1).map((a) => a + c.largeur / 2);

/** Des critères notés sur 20 et coefficientés. */
type Coeffs = { intro: string; qui: string; criteres: string[] };
const COEFFS: Coeffs[] = [
  { intro: "Une candidate passe le concours d'entrée d'une école de cuisine.", qui: "la candidate", criteres: ["dégustation", "dressage", "hygiène", "oral"] },
  { intro: "Un jury de conservatoire évalue une violoncelliste.", qui: "la violoncelliste", criteres: ["technique", "interprétation", "déchiffrage", "culture musicale"] },
  { intro: "Une acheteuse note un fournisseur de café.", qui: "le fournisseur", criteres: ["qualité", "prix", "délai de livraison", "service après-vente"] },
  { intro: "Un recruteur évalue une candidate à un poste de technicienne en énergie solaire.", qui: "la candidate", criteres: ["tests techniques", "entretien", "anglais", "expérience"] },
  { intro: "Un jury de danse note un candidat à une école de ballet.", qui: "le candidat", criteres: ["technique", "musicalité", "présence", "chorégraphie"] },
  { intro: "Une inspectrice de l'hygiène note la cuisine d'un restaurant.", qui: "le restaurant", criteres: ["propreté", "stockage", "traçabilité", "formation du personnel"] },
  { intro: "Une architecte note un projet de médiathèque.", qui: "le projet", criteres: ["coût", "isolation", "accessibilité", "délai"] },
  { intro: "Un sélectionneur évalue un jeune footballeur.", qui: "le joueur", criteres: ["vitesse", "technique", "endurance", "jeu collectif"] },
  { intro: "Une aspirante guide de haute montagne passe son examen.", qui: "la candidate", criteres: ["orientation", "secourisme", "escalade", "météorologie"] },
  { intro: "Un jury de start-up note le projet d'une jeune entreprise de recyclage.", qui: "le projet", criteres: ["innovation", "rentabilité", "impact écologique", "présentation"] },
];

/** La même transformation appliquée à TOUTES les valeurs : y = a·x + b. */
type Lin = {
  /** « des notes d'un devoir de physique » : « La moyenne {sujet} est de … ». */
  sujet: string;
  unite: string;
  /** Moyenne de départ : entre mMin et mMax, avec mDec décimales. */
  mMin: number;
  mMax: number;
  mDec: number;
  /** Tire a et b, et écrit la phrase qui les annonce. */
  tirer: () => { a: number; b: number; phrase: string };
  /** « la nouvelle moyenne, en cm » */
  nouveau: string;
  uniteN: string;
};

const choixPas = (min: number, max: number, pas: number) => arr(min + pas * rnd(0, Math.round((max - min) / pas)), 3);

/** Ajouter (ou retirer) la même quantité à chaque valeur. */
const LIN_AJOUT: Lin[] = [
  { sujet: "des notes d'un devoir de physique", unite: "", mMin: 8, mMax: 14, mDec: 1, nouveau: "la nouvelle moyenne des notes", uniteN: "",
    tirer: () => { const b = rnd(1, 3); return { a: 1, b, phrase: `Le professeur ajoute ${b} ${pl(b, "point")} à chaque note.` }; } },
  { sujet: "des prix (en €) des viennoiseries d'une boulangerie", unite: " €", mMin: 1.2, mMax: 2.8, mDec: 2, nouveau: "le nouveau prix moyen", uniteN: " €",
    tirer: () => { const b = choixPas(0.1, 0.3, 0.05); return { a: 1, b, phrase: `La boulangère augmente chaque prix de ${fr(b)} €.` }; } },
  { sujet: "des températures (en °C) relevées par un thermomètre mal réglé", unite: " °C", mMin: 15, mMax: 28, mDec: 1, nouveau: "la moyenne des températures corrigées", uniteN: " °C",
    tirer: () => { const b = choixPas(0.5, 2.5, 0.5); return { a: 1, b: -b, phrase: `La météorologue découvre que l'appareil affichait ${fr(b)} °C de trop : elle retire ${fr(b)} °C à chaque relevé.` }; } },
  { sujet: "des temps (en min) des coureurs d'un trail", unite: " min", mMin: 95, mMax: 140, mDec: 1, nouveau: "le nouveau temps moyen", uniteN: " min",
    tirer: () => { const b = rnd(2, 6); return { a: 1, b, phrase: `Le parcours ayant été raccourci par erreur, l'organisatrice ajoute ${b} min au temps de chaque coureur.` }; } },
  { sujet: "des salaires mensuels (en €) d'une entreprise", unite: " €", mMin: 1650, mMax: 2400, mDec: 0, nouveau: "le nouveau salaire moyen", uniteN: " €",
    tirer: () => { const b = 10 * rnd(4, 12); return { a: 1, b, phrase: `La direction ajoute une prime de ${b} € à chaque salaire.` }; } },
  { sujet: "des niveaux sonores (en dB) mesurés pendant un concert", unite: " dB", mMin: 88, mMax: 102, mDec: 1, nouveau: "le nouveau niveau moyen", uniteN: " dB",
    tirer: () => { const b = rnd(3, 8); return { a: 1, b: -b, phrase: `L'ingénieur du son baisse tous les niveaux de ${b} dB.` }; } },
  { sujet: "des masses (en kg) des lots de légumes d'un maraîcher", unite: " kg", mMin: 4.5, mMax: 9.5, mDec: 1, nouveau: "la masse moyenne d'un lot avec sa caisse", uniteN: " kg",
    tirer: () => { const b = choixPas(0.2, 0.6, 0.1); return { a: 1, b, phrase: `Chaque lot est livré dans une caisse de ${fr(b)} kg.` }; } },
  { sujet: "des âges (en années) des membres d'une chorale", unite: " ans", mMin: 34, mMax: 58, mDec: 1, nouveau: "l'âge moyen des membres à ce moment-là", uniteN: " ans",
    tirer: () => { const b = rnd(2, 6); return { a: 1, b, phrase: `${cap(fr(b))} ans plus tard, aucun membre n'a quitté la chorale et personne ne l'a rejointe.` }; } },
  { sujet: "des hauteurs (en cm) des arbustes d'une pépinière", unite: " cm", mMin: 45, mMax: 90, mDec: 1, nouveau: "la hauteur moyenne un mois plus tard", uniteN: " cm",
    tirer: () => { const b = rnd(3, 9); return { a: 1, b, phrase: `En un mois, chaque arbuste grandit de ${b} cm.` }; } },
  { sujet: "des retards (en min) des trains d'une ligne", unite: " min", mMin: 6, mMax: 15, mDec: 1, nouveau: "le retard moyen avec les nouveaux horaires", uniteN: " min",
    tirer: () => { const b = rnd(2, 5); return { a: 1, b: -b, phrase: `La compagnie décale tous ses horaires de ${b} min plus tard : chaque retard diminue de ${b} min.` }; } },
];

/** Multiplier chaque valeur par le même nombre. */
const LIN_MULT: Lin[] = [
  { sujet: "des longueurs (en m) des planches d'un menuisier", unite: " m", mMin: 1.2, mMax: 2.8, mDec: 2, nouveau: "la longueur moyenne, en cm", uniteN: " cm",
    tirer: () => ({ a: 100, b: 0, phrase: "Le menuisier convertit chaque longueur en centimètres." }) },
  { sujet: "des durées (en h) des vols d'une compagnie aérienne", unite: " h", mMin: 1.5, mMax: 4.5, mDec: 1, nouveau: "la durée moyenne, en min", uniteN: " min",
    tirer: () => ({ a: 60, b: 0, phrase: "La pilote convertit chaque durée en minutes." }) },
  { sujet: "des masses (en kg) des pains de campagne d'un boulanger", unite: " kg", mMin: 0.4, mMax: 1.2, mDec: 2, nouveau: "la masse moyenne, en g", uniteN: " g",
    tirer: () => ({ a: 1000, b: 0, phrase: "Le boulanger convertit chaque masse en grammes." }) },
  { sujet: "des prix (en €) des vélos d'un magasin", unite: " €", mMin: 280, mMax: 650, mDec: 0, nouveau: "le nouveau prix moyen", uniteN: " €",
    tirer: () => { const p = pick([5, 10, 20]); return { a: 1 + p / 100, b: 0, phrase: `Le magasin augmente chaque prix de ${p} %.` }; } },
  { sujet: "des prix (en €) des manteaux d'une boutique", unite: " €", mMin: 60, mMax: 180, mDec: 0, nouveau: "le prix moyen soldé", uniteN: " €",
    tirer: () => { const p = pick([20, 30, 40]); return { a: 1 - p / 100, b: 0, phrase: `La boutique baisse chaque prix de ${p} % pendant les soldes.` }; } },
  { sujet: "des vitesses (en m/s) des sprinteuses d'un club", unite: " m/s", mMin: 7.5, mMax: 9.5, mDec: 1, nouveau: "la vitesse moyenne, en km/h", uniteN: " km/h",
    tirer: () => ({ a: 3.6, b: 0, phrase: "La coach convertit chaque vitesse en km/h en la multipliant par 3,6." }) },
  { sujet: "des distances (en milles marins) parcourues chaque jour par un navire de pêche", unite: " milles", mMin: 40, mMax: 90, mDec: 0, nouveau: "la distance moyenne, en km", uniteN: " km",
    tirer: () => ({ a: 1.852, b: 0, phrase: "Le capitaine convertit chaque distance en kilomètres : un mille marin vaut 1,852 km." }) },
  { sujet: "des doses (en mL) d'engrais versées dans les arrosoirs d'une serre", unite: " mL", mMin: 12, mMax: 30, mDec: 1, nouveau: "la nouvelle dose moyenne", uniteN: " mL",
    tirer: () => { const a = pick([2, 3]); return { a, b: 0, phrase: `La notice ayant été mal lue, l'horticultrice multiplie chaque dose par ${a}.` }; } },
  { sujet: "des prix (en €) des billets d'une tournée de concerts", unite: " €", mMin: 35, mMax: 85, mDec: 0, nouveau: "le prix moyen, en dollars", uniteN: " $",
    tirer: () => ({ a: 1.08, b: 0, phrase: "Une agence américaine convertit chaque prix en dollars, au taux de 1,08 $ pour 1 €." }) },
  { sujet: "des recettes quotidiennes (en €) d'un glacier en mai", unite: " €", mMin: 420, mMax: 780, mDec: 0, nouveau: "la recette quotidienne moyenne prévue en juillet", uniteN: " €",
    tirer: () => { const a = pick([1.5, 2, 2.5]); return { a, b: 0, phrase: `Le glacier prévoit qu'en juillet chaque recette quotidienne sera multipliée par ${fr(a)}.` }; } },
];

/** Multiplier puis ajouter : y = a·x + b, les deux non triviaux. */
const LIN_AFFINE: Lin[] = [
  { sujet: "des températures (en °C) relevées à New York en mai", unite: " °C", mMin: 12, mMax: 26, mDec: 1, nouveau: "la température moyenne, en °F", uniteN: " °F",
    tirer: () => ({ a: 1.8, b: 32, phrase: "Un météorologue américain convertit chaque température en degrés Fahrenheit : F = 1,8 × C + 32." }) },
  { sujet: "des prix hors taxes (en €) des casques audio d'un site", unite: " €", mMin: 40, mMax: 160, mDec: 0, nouveau: "le prix moyen payé par le client", uniteN: " €",
    tirer: () => { const p = pick([10, 20]); const b = pick([3, 5, 8]); return { a: 1 + p / 100, b, phrase: `Le site ajoute ${p} % de TVA à chaque prix, puis ${b} € de livraison.` }; } },
  { sujet: "des notes d'un devoir sur 20", unite: "", mMin: 7, mMax: 12, mDec: 1, nouveau: "la moyenne des notes ajustées", uniteN: "",
    tirer: () => { const a = pick([1.1, 1.2, 1.25]); const b = rnd(1, 2); return { a, b, phrase: `Le professeur multiplie chaque note par ${fr(a)}, puis ajoute ${b} ${pl(b, "point")}.` }; } },
  { sujet: "des distances (en km) des courses d'un taxi", unite: " km", mMin: 6, mMax: 18, mDec: 1, nouveau: "le prix moyen d'une course", uniteN: " €",
    tirer: () => { const a = pick([1.6, 1.8, 2.1]); const b = pick([3, 4, 5]); return { a, b, phrase: `Une course coûte ${fr(a)} € par kilomètre, plus ${b} € de prise en charge.` }; } },
  { sujet: "des consommations mensuelles (en kWh) des foyers d'un immeuble", unite: " kWh", mMin: 180, mMax: 420, mDec: 0, nouveau: "la facture mensuelle moyenne", uniteN: " €",
    tirer: () => { const a = pick([0.2, 0.25]); const b = pick([10, 12, 15]); return { a, b, phrase: `La facture d'un mois vaut ${fr(a)} € par kWh, plus ${b} € d'abonnement.` }; } },
  { sujet: "des ventes mensuelles (en €) des commerciaux d'une entreprise", unite: " €", mMin: 8000, mMax: 20000, mDec: 0, nouveau: "le salaire moyen d'un commercial", uniteN: " €",
    tirer: () => { const p = pick([4, 5]); const b = pick([1400, 1500]); return { a: p / 100, b, phrase: `Chaque commercial touche ${fr(b)} € fixes plus ${p} % de ses ventes.` }; } },
  { sujet: "des durées (en min) des séances d'un club d'escalade", unite: " min", mMin: 70, mMax: 110, mDec: 0, nouveau: "le prix moyen d'une séance", uniteN: " €",
    tirer: () => { const a = pick([0.1, 0.12]); const b = pick([2, 3]); return { a, b, phrase: `Une séance coûte ${fr(a)} € la minute, plus ${b} € de location de matériel.` }; } },
];

/** Un indice de la grille du contexte entre deux valeurs. */
function vEntre(c: Serie, a: number, b: number): number {
  const k0 = Math.ceil((a - c.min) / c.pas - 1e-9);
  const k1 = Math.max(k0, Math.floor((b - c.min) / c.pas + 1e-9));
  return arr(c.min + c.pas * rnd(k0, k1), 2);
}
/** Les cinq nombres d'un diagramme en boîte, plausibles pour le contexte et
 *  STRICTEMENT croissants (une boîte sans largeur ne s'enseigne pas). */
function cinqDe(c: Serie): Cinq {
  const L = c.max - c.min;
  const at = (p: number, q: number) => vEntre(c, c.min + p * L, c.min + q * L);
  return { min: at(0, 0.12), q1: at(0.2, 0.35), mediane: at(0.42, 0.58), q3: at(0.65, 0.8), max: at(0.88, 1) };
}

/** Le support d'un tableau d'effectifs : tableau OU diagramme en barres. */
function support(d: Discret, vals: number[], effs: number[]): { canvas: CanvasFigure; mot: string } {
  return Math.random() < 0.5
    ? { canvas: tableauEffectifs(d.col, vals, effs), mot: "Le tableau" }
    : { canvas: diagrammeBarres(vals.map(String), effs, { titre: d.col, axeY: "effectif" }), mot: "Le diagramme" };
}

/* ========================== STAT_LIRE_SERIE ========================== */

const LIRE: TutorBankItemV4[] = [
  T("stat_lire_serie", 1, "lire_effectif", "L'effectif d'une valeur est le nombre de fois où elle apparaît.", ["lire_serie", "canvas"], () => {
    const d = pick(DISCRETS);
    const vals = valeursDe(d);
    const effs = effectifs(d.k, 1, 15);
    const i = rnd(0, d.k - 1);
    const s = support(d, vals, effs);
    const q = pick([
      `Combien ${de(d.individus)} ${d.cond("", vals[i])} ?`,
      `Lis l'effectif : combien ${de(d.individus)} ${d.cond("exactement ", vals[i])} ?`,
      `${s.mot} donne les effectifs. Quel est l'effectif de la valeur ${vals[i]} ?`,
    ]);
    return court(`${d.intro} ${q}`, String(effs[i]), exp(
      "L'effectif d'une valeur est le nombre d'individus qui ont cette valeur.",
      `On repère la valeur $${vals[i]}$ et on lit l'effectif qui lui correspond.`,
      `En face de $${vals[i]}$, on lit $${effs[i]}$.`,
      `$${effs[i]}$ ${d.individus} ${d.cond("", vals[i])}.`,
    ), s.canvas);
  }),

  T("stat_lire_serie", 1, "lire_valeur_effectif", "On cherche la colonne (ou la barre) qui porte cet effectif.", ["lire_serie", "canvas"], () => {
    const d = pick(DISCRETS);
    const vals = valeursDe(d);
    // Effectifs deux à deux distincts : une seule valeur répond.
    const effs = shuffle(Array.from({ length: 15 }, (_, k) => k + 1)).slice(0, d.k);
    const i = rnd(0, d.k - 1);
    const s = support(d, vals, effs);
    const q = pick([
      `Quelle valeur de la série a pour effectif ${effs[i]} ?`,
      `Exactement ${effs[i]} ${d.individus} ont la même valeur. Laquelle ?`,
      `${s.mot} donne les effectifs. Quelle valeur est prise par exactement ${effs[i]} ${d.individus} ?`,
    ]);
    return court(`${d.intro} ${q}`, String(vals[i]), exp(
      "Une série statistique associe à chaque VALEUR son EFFECTIF.",
      `On cherche l'effectif $${effs[i]}$, puis on lit la valeur qui lui correspond.`,
      `L'effectif $${effs[i]}$ est celui de la valeur $${vals[i]}$.`,
      `La valeur cherchée est $${vals[i]}$. ⛔ Ne pas confondre la valeur ($${vals[i]}$) et son effectif ($${effs[i]}$).`,
    ), s.canvas);
  }),

  T("stat_lire_serie", 2, "lire_total", "L'effectif total est la somme de tous les effectifs.", ["lire_serie", "canvas"], () => {
    const d = pick(DISCRETS);
    const vals = valeursDe(d);
    const effs = effectifs(d.k, 1, 16);
    const N = somme(effs);
    const s = support(d, vals, effs);
    const q = pick([
      `Combien ${de(d.individus)} l'étude compte-t-elle en tout ?`,
      `Quel est l'effectif total de cette série ?`,
      `${s.mot} donne les effectifs. Combien ${de(d.individus)} compte l'étude ?`,
    ]);
    return court(`${d.intro} ${q}`, String(N), exp(
      "L'effectif total $N$ est le nombre d'individus étudiés : la somme des effectifs.",
      "On additionne tous les effectifs.",
      `$N = ${effs.join(" + ")} = ${N}$.`,
      `L'étude porte sur $${N}$ ${d.individus}. ⛔ Ce n'est pas la somme des VALEURS.`,
    ), s.canvas);
  }),

  T("stat_lire_serie", 2, "lire_etendue", "Étendue = plus grande valeur − plus petite valeur.", ["lire_serie"], () => {
    const c = pick(SERIES);
    const n = rnd(6, 10);
    const xs = tirerSerie(c, n);
    const mx = Math.max(...xs);
    const mn = Math.min(...xs);
    const e = arr(mx - mn, 2);
    const q = pick([
      "Quelle est l'étendue de cette série ?",
      "De combien la plus grande valeur dépasse-t-elle la plus petite ?",
      `Calcule l'étendue de ${c.ces}.`,
    ]);
    return court(`${phrase(c, n)} : ${liste(xs)}. ${q}`, fr(e), exp(
      "L'étendue d'une série est la différence entre sa plus grande et sa plus petite valeur.",
      "On repère le maximum et le minimum, puis on soustrait.",
      `Maximum $${frm(mx)}$, minimum $${frm(mn)}$ : $${frm(mx)} - ${frm(mn)} = ${frm(e)}$.`,
      `L'étendue vaut $${frm(e)}$ ${c.unite}.`,
    ));
  }),

  T("stat_lire_serie", 3, "lire_condition", "« Au moins 3 » compte 3 ET les valeurs au-dessus ; « plus de 3 » ne compte pas 3.", ["lire_serie", "canvas"], () => {
    const d = pick(DISCRETS);
    const vals = valeursDe(d);
    const effs = effectifs(d.k, 1, 14);
    const v = vals[rnd(1, d.k - 2)];
    const cmp = pick([
      { mot: "au moins ", ok: (x: number) => x >= v, sym: "\\geqslant" },
      { mot: "au plus ", ok: (x: number) => x <= v, sym: "\\leqslant" },
      { mot: "plus de ", ok: (x: number) => x > v, sym: ">" },
      { mot: "moins de ", ok: (x: number) => x < v, sym: "<" },
    ]);
    const idx = vals.map((x, i) => (cmp.ok(x) ? i : -1)).filter((i) => i >= 0);
    const rep = somme(idx.map((i) => effs[i]));
    const s = support(d, vals, effs);
    const q = pick([`Combien ${de(d.individus)} ${d.cond(cmp.mot, v)} ?`, `${s.mot} donne les effectifs. Combien ${de(d.individus)} ${d.cond(cmp.mot, v)} ?`]);
    return court(`${d.intro} ${q}`, String(rep), exp(
      `« ${cmp.mot.trim()} $${v}$ » se traduit par $x ${cmp.sym} ${v}$.`,
      "On repère les valeurs qui conviennent, puis on additionne leurs effectifs.",
      `Valeurs retenues : $${idx.map((i) => vals[i]).join(" ; ")}$. Effectifs : $${idx.map((i) => effs[i]).join(" + ")} = ${rep}$.`,
      `$${rep}$ ${d.individus} ${d.cond(cmp.mot, v)}.`,
    ), s.canvas);
  }),

  T("stat_lire_serie", 3, "lire_mode", "La valeur la plus fréquente est celle qui a le plus grand effectif.", ["lire_serie", "canvas"], () => {
    const d = pick(DISCRETS);
    const vals = valeursDe(d);
    const effs = shuffle(Array.from({ length: 18 }, (_, k) => k + 2)).slice(0, d.k);
    const plus = Math.random() < 0.6;
    const cible = plus ? Math.max(...effs) : Math.min(...effs);
    const i = effs.indexOf(cible);
    const s = support(d, vals, effs);
    const q = plus
      ? pick(["Quelle est la valeur la plus fréquente de la série ?", `Quelle valeur est prise par le plus grand nombre ${de(d.individus)} ?`])
      : pick(["Quelle est la valeur la moins fréquente de la série ?", `Quelle valeur est prise par le plus petit nombre ${de(d.individus)} ?`]);
    return court(`${d.intro} ${q}`, String(vals[i]), exp(
      `La valeur la ${plus ? "plus" : "moins"} fréquente est celle dont l'effectif est le ${plus ? "plus grand" : "plus petit"}.`,
      "On compare les effectifs, puis on lit la VALEUR correspondante.",
      `Le ${plus ? "plus grand" : "plus petit"} effectif est $${cible}$, celui de la valeur $${vals[i]}$.`,
      `Réponse : $${vals[i]}$. ⛔ La réponse est une valeur, pas l'effectif $${cible}$.`,
    ), s.canvas);
  }),

  T("stat_lire_serie", 4, "lire_boite", "Moustaches : minimum et maximum. Bords de la boîte : Q1 et Q3. Trait intérieur : la médiane.", ["lire_serie", "canvas", "boite"], () => {
    const c = pick(SERIES);
    const n = rnd(20, 60);
    const b = cinqDe(c);
    const lu = pick([
      { nom: "le premier quartile $Q_1$", v: b.q1, ou: "le bord GAUCHE de la boîte" },
      { nom: "le troisième quartile $Q_3$", v: b.q3, ou: "le bord DROIT de la boîte" },
      { nom: "la médiane", v: b.mediane, ou: "le trait à l'intérieur de la boîte" },
      { nom: "la plus grande valeur", v: b.max, ou: "le bout de la moustache droite" },
      { nom: "la plus petite valeur", v: b.min, ou: "le bout de la moustache gauche" },
      { nom: "l'étendue", v: arr(b.max - b.min, 2), ou: "les deux bouts des moustaches (maximum − minimum)" },
    ]);
    const q = pick([`Lis ${lu.nom} de cette série.`, `D'après le diagramme en boîte, quelle est ${lu.nom} ?`.replace("quelle est le", "quel est le").replace("quelle est l'", "quelle est l'")]);
    return court(`${phrase(c, n)}. Le diagramme en boîte résume ${c.ces}. ${q}`, fr(lu.v), exp(
      "Un diagramme en boîte résume une série par cinq nombres : minimum, $Q_1$, médiane, $Q_3$, maximum.",
      `On lit ${lu.ou}.`,
      `Min $${frm(b.min)}$ ; $Q_1 = ${frm(b.q1)}$ ; médiane $${frm(b.mediane)}$ ; $Q_3 = ${frm(b.q3)}$ ; max $${frm(b.max)}$.`,
      `Réponse : $${frm(lu.v)}$ ${c.unite}.`,
    ), diagrammeBoites([b]));
  }),

  T("stat_lire_serie", 4, "lire_boite_pourcentage", "Q1 : au moins 25 % des valeurs sont en dessous ou égales ; médiane : 50 % ; Q3 : 75 %.", ["lire_serie", "canvas", "boite"], () => {
    const c = pick(SERIES);
    const n = rnd(20, 60);
    const b = cinqDe(c);
    const cas = pick([
      { v: b.q1, sens: "inférieures ou égales", p: 25, qui: "$Q_1$" },
      { v: b.mediane, sens: "inférieures ou égales", p: 50, qui: "la médiane" },
      { v: b.q3, sens: "inférieures ou égales", p: 75, qui: "$Q_3$" },
      { v: b.q1, sens: "supérieures ou égales", p: 75, qui: "$Q_1$" },
      { v: b.mediane, sens: "supérieures ou égales", p: 50, qui: "la médiane" },
      { v: b.q3, sens: "supérieures ou égales", p: 25, qui: "$Q_3$" },
    ]);
    const q = pick([
      `Au moins quel pourcentage des valeurs sont ${cas.sens} à ${avecU(c, cas.v)} ?`,
      `D'après le diagramme, quel pourcentage des valeurs, au minimum, sont ${cas.sens} à ${avecU(c, cas.v)} ? Réponds en %.`,
    ]);
    return court(`${phrase(c, n)}. Le diagramme en boîte résume ${c.ces}. ${q}`, String(cas.p), exp(
      "Au moins 25 % des valeurs sont inférieures ou égales à $Q_1$, au moins 50 % à la médiane, au moins 75 % à $Q_3$ (et symétriquement pour « supérieures ou égales »).",
      `On reconnaît que $${frm(cas.v)}$ est ${cas.qui} sur le diagramme.`,
      `Valeurs ${cas.sens} à ${cas.qui} : au moins $${cas.p}\\,\\%$.`,
      `Au moins $${cas.p}\\,\\%$ des valeurs sont ${cas.sens} à $${frm(cas.v)}$.`,
    ), diagrammeBoites([b]));
  }),
];

/* ============================ STAT_MOYENNE ============================ */

const MOYENNE: TutorBankItemV4[] = [
  T("stat_moyenne", 1, "moy_entiere", "Moyenne = somme des valeurs ÷ nombre de valeurs.", ["moyenne"], () => {
    const c = pick(SERIES.filter((s) => s.dec === 0));
    const n = rnd(4, 6);
    // Somme multiple de n : la moyenne tombe juste.
    let xs = tirerSerie(c, n);
    for (let k = 0; k < 200 && (somme(xs) / c.pas) % n !== 0; k += 1) xs = tirerSerie(c, n);
    const m = arr(somme(xs) / n, 2);
    const q = pick([`Quelle est la moyenne de ${c.ces} ?`, "Calcule la moyenne de cette série.", `En moyenne, quelle valeur obtient-on (en ${c.unite}) ?`]);
    return court(`${phrase(c, n)} : ${liste(xs)}. ${q}`, fr(m), exp(
      "La moyenne d'une série est la somme des valeurs divisée par le nombre de valeurs.",
      `On additionne les $${n}$ valeurs, puis on divise par $${n}$.`,
      `$\\bar{x} = \\dfrac{${xs.map((x) => frm(x)).join(" + ")}}{${n}} = \\dfrac{${frm(somme(xs))}}{${n}} = ${frm(m)}$.`,
      `La moyenne vaut $${frm(m)}$ ${c.unite}.`,
    ));
  }),

  T("stat_moyenne", 1, "moy_total", "Moyenne = total ÷ nombre de valeurs.", ["moyenne"], () => {
    const c = pick(SERIES.filter((s) => s.dec === 0));
    const n = pick([4, 5, 8, 10, 20, 25]);
    const m = valeur(c);
    const tot = arr(m * n, 2);
    const q = pick([
      `En additionnant ${c.ces}, on obtient ${avecU(c, tot)}. Quelle est la moyenne ?`,
      `La somme de ${c.ces} vaut ${avecU(c, tot)}. Calcule leur moyenne.`,
    ]);
    return court(`${phrase(c, n)}. ${q}`, fr(m), exp(
      "La moyenne est la somme des valeurs divisée par leur nombre.",
      `On divise le total par l'effectif $${n}$.`,
      `$\\bar{x} = ${frm(tot)} \\div ${n} = ${frm(m)}$.`,
      `La moyenne vaut $${frm(m)}$ ${c.unite}.`,
    ));
  }),

  T("stat_moyenne", 2, "moy_arrondie", "Somme ÷ nombre de valeurs, puis l'arrondi demandé.", ["moyenne"], () => {
    const c = pick(SERIES);
    const n = rnd(5, 9);
    const xs = tirerSerie(c, n);
    const a = pick(ARRONDIS);
    const m = somme(xs) / n;
    const q = pick([`Calcule la moyenne de ${c.ces}.`, "Quelle est la moyenne de cette série ?", `Quelle est la valeur moyenne, en ${c.unite} ?`]);
    return court(`${phrase(c, n)} : ${liste(xs)}. ${q} ${a.txt}`, fr(m, a.d), exp(
      "La moyenne d'une série est la somme des valeurs divisée par le nombre de valeurs.",
      `On additionne les $${n}$ valeurs, on divise par $${n}$, puis on arrondit.`,
      `$\\bar{x} = \\dfrac{${frm(somme(xs))}}{${n}} \\approx ${frm(m, a.d)}$.`,
      `La moyenne vaut environ $${frm(m, a.d)}$ ${c.unite}.`,
    ));
  }),

  T("stat_moyenne", 2, "moy_diagramme", "On lit chaque valeur sur le diagramme, puis somme ÷ nombre de barres.", ["moyenne", "canvas"], () => {
    const c = pick(SERIES.filter((s) => s.dec === 0));
    const n = rnd(5, 8);
    const xs = tirerSerie(c, n);
    const a = pick(ARRONDIS);
    const m = somme(xs) / n;
    const q = pick([`Le diagramme donne ${c.ces}. Calcule leur moyenne.`, `D'après le diagramme, quelle est la moyenne de ${c.ces} ?`]);
    return court(`${phrase(c, n)}. ${q} ${a.txt}`, fr(m, a.d), exp(
      "La moyenne est la somme des valeurs divisée par leur nombre.",
      `On lit les $${n}$ hauteurs, on les additionne, on divise par $${n}$.`,
      `$\\bar{x} = \\dfrac{${xs.map((x) => frm(x)).join(" + ")}}{${n}} = \\dfrac{${frm(somme(xs))}}{${n}} \\approx ${frm(m, a.d)}$.`,
      `La moyenne vaut environ $${frm(m, a.d)}$ ${c.unite}.`,
    ), diagrammeBarres(xs.map((_, i) => `${c.etiq}${i + 1}`), xs, { axeY: c.unite }));
  }),

  T("stat_moyenne", 3, "moy_manquante", "La somme des n valeurs doit valoir n × la moyenne visée.", ["moyenne", "probleme"], () => {
    const c = pick(SERIES.filter((s) => s.dec === 0));
    const n = rnd(4, 7);
    let xs = tirerSerie(c, n - 1);
    let x = valeur(c);
    for (let k = 0; k < 300 && ((somme(xs) + x) / c.pas) % n !== 0; k += 1) {
      x = valeur(c);
      if (k % 30 === 29) xs = tirerSerie(c, n - 1);
    }
    const m = arr((somme(xs) + x) / n, 2);
    const q = pick([
      `Quelle doit être la ${n}e valeur pour que la moyenne des ${n} valeurs soit égale à ${avecU(c, m)} ?`,
      `Il manque la dernière mesure. Sachant que la moyenne des ${n} valeurs vaut ${avecU(c, m)}, retrouve-la.`,
    ]);
    const S = somme(xs);
    return court(`${phrase(c, n)}. Les ${n - 1} premières valeurs sont : ${liste(xs)}. ${q}`, fr(x), exp(
      "Si la moyenne de $n$ valeurs vaut $\\bar{x}$, leur somme vaut $n \\times \\bar{x}$.",
      "On calcule la somme visée, puis on retire la somme des valeurs connues.",
      `Somme visée : $${n} \\times ${frm(m)} = ${frm(n * m)}$. Valeurs connues : $${frm(S)}$. Il manque $${frm(n * m)} - ${frm(S)} = ${frm(x)}$.`,
      `La dernière valeur est $${frm(x)}$ ${c.unite}.`,
    ));
  }),

  T("stat_moyenne", 3, "moy_ajout", "Somme = moyenne × effectif ; on ajoute la valeur, puis on divise par le nouvel effectif.", ["moyenne", "probleme"], () => {
    const c = pick(SERIES.filter((s) => s.dec === 0));
    const n = rnd(5, 24);
    const m = arr(vEntre(c, c.min + 0.3 * (c.max - c.min), c.min + 0.7 * (c.max - c.min)) + pick([0, 0.5]), 1);
    let v = valeur(c);
    while (Math.abs(v - m) < c.pas) v = valeur(c);
    const a = pick(ARRONDIS);
    const nv = (n * m + v) / (n + 1);
    const q = pick([
      `On ajoute une nouvelle mesure : ${avecU(c, v)}. Quelle est la nouvelle moyenne ?`,
      `Une mesure oubliée est ajoutée : ${avecU(c, v)}. Calcule la moyenne des ${n + 1} valeurs.`,
    ]);
    return court(`${phrase(c, n)} ; la moyenne de ${c.ces} est ${avecU(c, m)}. ${q} ${a.txt}`, fr(nv, a.d), exp(
      "Moyenne $=$ somme $\\div$ effectif, donc somme $=$ moyenne $\\times$ effectif.",
      `Somme des $${n}$ valeurs, plus la nouvelle, divisée par $${n + 1}$.`,
      `$\\dfrac{${n} \\times ${frm(m)} + ${frm(v)}}{${n + 1}} = \\dfrac{${frm(n * m + v)}}{${n + 1}} \\approx ${frm(nv, a.d)}$.`,
      `La nouvelle moyenne vaut environ $${frm(nv, a.d)}$ ${c.unite}. ⛔ Faire $(${frm(m)} + ${frm(v)}) \\div 2$ donnerait autant de poids à la nouvelle valeur qu'aux $${n}$ autres.`,
    ));
  }),

  T("stat_moyenne", 4, "moy_erreur", "Une valeur fausse change la somme : on corrige la somme, puis on redivise.", ["moyenne", "probleme"], () => {
    const c = pick(SERIES.filter((s) => s.dec === 0));
    const n = rnd(8, 30);
    const m = arr(vEntre(c, c.min + 0.3 * (c.max - c.min), c.min + 0.7 * (c.max - c.min)) + pick([0, 0.5]), 1);
    const faux = valeur(c);
    let vrai = valeur(c);
    while (Math.abs(vrai - faux) < 2 * c.pas) vrai = valeur(c);
    const a = pick(ARRONDIS);
    const nm = (n * m - faux + vrai) / n;
    const q = pick([
      `On s'aperçoit qu'une valeur a été mal recopiée : ${avecU(c, faux)} au lieu de ${avecU(c, vrai)}. Quelle est la moyenne corrigée ?`,
      `Une erreur de saisie : la valeur ${fr(faux)} devait être ${fr(vrai)}. Calcule la vraie moyenne.`,
    ]);
    return court(`${phrase(c, n)} ; la moyenne calculée est ${avecU(c, m)}. ${q} ${a.txt}`, fr(nm, a.d), exp(
      "Somme des valeurs $=$ moyenne $\\times$ effectif.",
      "On recalcule la somme en remplaçant la valeur fausse par la vraie, puis on divise par le même effectif.",
      `$\\dfrac{${n} \\times ${frm(m)} - ${frm(faux)} + ${frm(vrai)}}{${n}} = \\dfrac{${frm(n * m - faux + vrai)}}{${n}} \\approx ${frm(nm, a.d)}$.`,
      `La moyenne corrigée vaut environ $${frm(nm, a.d)}$ ${c.unite}.`,
    ));
  }),

  T("stat_moyenne", 4, "moy_retrait", "On retire la valeur de la somme ET un individu de l'effectif.", ["moyenne", "probleme"], () => {
    const c = pick(SERIES.filter((s) => s.dec === 0));
    const n = rnd(6, 25);
    const m = arr(vEntre(c, c.min + 0.3 * (c.max - c.min), c.min + 0.7 * (c.max - c.min)) + pick([0, 0.5]), 1);
    let v = valeur(c);
    while (Math.abs(v - m) < c.pas) v = valeur(c);
    const a = pick(ARRONDIS);
    const nm = (n * m - v) / (n - 1);
    const q = pick([
      `On retire une valeur jugée douteuse : ${avecU(c, v)}. Quelle est la moyenne des valeurs restantes ?`,
      `La mesure de ${avecU(c, v)} est écartée. Calcule la moyenne des ${n - 1} autres.`,
    ]);
    return court(`${phrase(c, n)} ; la moyenne de ${c.ces} est ${avecU(c, m)}. ${q} ${a.txt}`, fr(nm, a.d), exp(
      "Somme des valeurs $=$ moyenne $\\times$ effectif.",
      `On enlève la valeur de la somme, et on divise par $${n - 1}$.`,
      `$\\dfrac{${n} \\times ${frm(m)} - ${frm(v)}}{${n - 1}} = \\dfrac{${frm(n * m - v)}}{${n - 1}} \\approx ${frm(nm, a.d)}$.`,
      `La nouvelle moyenne vaut environ $${frm(nm, a.d)}$ ${c.unite}.`,
    ));
  }),
];

/* ======================== STAT_MOYENNE_PONDEREE ======================== */

const PONDEREE: TutorBankItemV4[] = [
  T("stat_moyenne_ponderee", 2, "pond_tableau", "Somme des (valeur × effectif) ÷ effectif total.", ["moyenne_ponderee", "canvas"], () => {
    const d = pick(DISCRETS);
    const vals = valeursDe(d);
    const effs = effectifs(d.k, 1, 14);
    const N = somme(effs);
    const S = somme(vals.map((v, i) => v * effs[i]));
    const a = pick(ARRONDIS);
    const s = support(d, vals, effs);
    const q = pick(["Calcule la moyenne de cette série.", "Quelle est la valeur moyenne de la série ?", `${s.mot} donne les effectifs. Calcule la moyenne pondérée par les effectifs.`]);
    return court(`${d.intro} ${q} ${a.txt}`, fr(S / N, a.d), exp(
      "Pour une série donnée par valeurs et effectifs : $\\bar{x} = \\dfrac{n_1 x_1 + n_2 x_2 + \\dots}{N}$.",
      "Chaque valeur compte autant de fois que son effectif.",
      `$\\bar{x} = \\dfrac{${vals.map((v, i) => `${effs[i]} \\times ${v}`).join(" + ")}}{${N}} = \\dfrac{${S}}{${N}} \\approx ${frm(S / N, a.d)}$.`,
      `La moyenne vaut environ $${frm(S / N, a.d)}$. ⛔ Diviser par le nombre de colonnes ($${d.k}$) au lieu de $N = ${N}$ est l'erreur classique.`,
    ), s.canvas);
  }),

  T("stat_moyenne_ponderee", 2, "pond_batons", "Chaque valeur est multipliée par son effectif ; on divise par l'effectif total.", ["moyenne_ponderee", "canvas"], () => {
    const d = pick(DISCRETS);
    const vals = valeursDe(d);
    const effs = effectifs(d.k, 2, 18);
    const N = somme(effs);
    const S = somme(vals.map((v, i) => v * effs[i]));
    const a = pick(ARRONDIS);
    const q = pick([
      `Le diagramme en bâtons donne la répartition des ${d.individus}. Quelle est la moyenne de la série ?`,
      `D'après le diagramme en bâtons, calcule la moyenne de la série.`,
    ]);
    return court(`${d.intro} ${q} ${a.txt}`, fr(S / N, a.d), exp(
      "$\\bar{x} = \\dfrac{\\sum n_i x_i}{N}$, avec $N$ l'effectif total.",
      "On lit l'effectif de chaque valeur (hauteur du bâton), puis on calcule la somme pondérée.",
      `$N = ${N}$ et $\\sum n_i x_i = ${vals.map((v, i) => `${effs[i]} \\times ${v}`).join(" + ")} = ${S}$, donc $\\bar{x} = \\dfrac{${S}}{${N}} \\approx ${frm(S / N, a.d)}$.`,
      `La moyenne vaut environ $${frm(S / N, a.d)}$.`,
    ), diagrammeBarres(vals.map(String), effs, { type: "batons", titre: d.col, axeY: "effectif" }));
  }),

  T("stat_moyenne_ponderee", 3, "pond_coeffs", "Somme des (note × coefficient) ÷ somme des coefficients.", ["moyenne_ponderee"], () => {
    const c = pick(COEFFS);
    const k = rnd(3, 4);
    const crit = c.criteres.slice(0, k);
    const notes = crit.map(() => rnd(6, 19));
    const co = crit.map(() => rnd(1, 5));
    const S = somme(notes.map((x, i) => x * co[i]));
    const C = somme(co);
    const a = pick(ARRONDIS);
    const detail = crit.map((nom, i) => `${nom} : ${notes[i]}/20 (coefficient ${co[i]})`).join(" ; ");
    const q = pick([`Quelle est la note finale ${deGN(c.qui)} ?`, `Calcule la moyenne pondérée ${deGN(c.qui)}.`, "Quelle note sur 20 obtient-on en tenant compte des coefficients ?"]);
    return court(`${c.intro} Notes obtenues — ${detail}. ${q} ${a.txt}`, fr(S / C, a.d), exp(
      "Moyenne pondérée : $\\bar{x} = \\dfrac{\\sum c_i x_i}{\\sum c_i}$.",
      "On multiplie chaque note par son coefficient, on additionne, puis on divise par la SOMME des coefficients.",
      `$\\dfrac{${notes.map((x, i) => `${co[i]} \\times ${x}`).join(" + ")}}{${co.join(" + ")}} = \\dfrac{${S}}{${C}} \\approx ${frm(S / C, a.d)}$.`,
      `La note finale vaut environ $${frm(S / C, a.d)}$ sur $20$. ⛔ Diviser par $${k}$ (le nombre de notes) est faux.`,
    ));
  }),

  T("stat_moyenne_ponderee", 3, "pond_deux_groupes", "Moyenne globale = (n₁ × m₁ + n₂ × m₂) ÷ (n₁ + n₂).", ["moyenne_ponderee", "probleme"], () => {
    const c = pick(SERIES.filter((s) => s.dec === 0));
    const n1 = rnd(8, 40);
    let n2 = rnd(8, 40);
    while (n2 === n1) n2 = rnd(8, 40);
    const m1 = arr(valeur(c) + pick([0, 0.5]), 1);
    let m2 = arr(valeur(c) + pick([0, 0.5]), 1);
    while (Math.abs(m2 - m1) < 2 * c.pas) m2 = arr(valeur(c) + pick([0, 0.5]), 1);
    const g = (n1 * m1 + n2 * m2) / (n1 + n2);
    const a = pick(ARRONDIS);
    const q = pick([`Quelle est la moyenne de l'ensemble des ${n1 + n2} valeurs ?`, "Calcule la moyenne des deux séries réunies."]);
    return court(`${phrase(c, n1 + n2)}, en deux séries. Série « ${c.deux[0]} » : ${n1} valeurs, de moyenne ${avecU(c, m1)}. Série « ${c.deux[1]} » : ${n2} valeurs, de moyenne ${avecU(c, m2)}. ${q} ${a.txt}`, fr(g, a.d), exp(
      "La moyenne de deux séries réunies est la moyenne des deux moyennes PONDÉRÉE par les effectifs.",
      "On reconstitue chaque somme ($n \\times m$), on les additionne, puis on divise par l'effectif total.",
      `$\\dfrac{${n1} \\times ${frm(m1)} + ${n2} \\times ${frm(m2)}}{${n1} + ${n2}} = \\dfrac{${frm(n1 * m1 + n2 * m2)}}{${n1 + n2}} \\approx ${frm(g, a.d)}$.`,
      `La moyenne globale vaut environ $${frm(g, a.d)}$ ${c.unite}. ⛔ La moyenne des deux moyennes, $${frm((m1 + m2) / 2)}$, ignore que les séries n'ont pas le même effectif.`,
    ));
  }),

  T("stat_moyenne_ponderee", 4, "pond_classes", "On remplace chaque classe par son CENTRE, puis moyenne pondérée par les effectifs.", ["moyenne_ponderee", "canvas", "classes"], () => {
    const c = pick(CLASSES);
    const noms = nomsClasses(c);
    const ce = centres(c);
    const effs = effectifs(c.k, 2, 30);
    const N = somme(effs);
    const S = somme(ce.map((x, i) => x * effs[i]));
    const a = pick(ARRONDIS);
    const q = pick([
      `En utilisant le centre de chaque classe, donne une estimation de la moyenne (en ${c.unite}).`,
      `Estime la moyenne de la série à l'aide des centres des classes.`,
    ]);
    return court(`${c.intro} Le tableau donne la répartition des ${N} ${c.individus}. ${q} ${a.txt}`, fr(S / N, a.d), exp(
      "Pour une série en classes, on estime la moyenne en remplaçant chaque classe $[a ; b[$ par son centre $\\dfrac{a + b}{2}$.",
      "Centres × effectifs, on additionne, on divise par l'effectif total.",
      `Centres : $${ce.map((x) => frm(x)).join(" ; ")}$. $\\bar{x} \\approx \\dfrac{${ce.map((x, i) => `${effs[i]} \\times ${frm(x)}`).join(" + ")}}{${N}} = \\dfrac{${frm(S)}}{${N}} \\approx ${frm(S / N, a.d)}$.`,
      `La moyenne est estimée à environ $${frm(S / N, a.d)}$ ${c.unite}.`,
    ), tableauEffectifs(c.col, noms, effs));
  }),

  T("stat_moyenne_ponderee", 4, "pond_note_manquante", "Somme visée = moyenne visée × somme des coefficients.", ["moyenne_ponderee", "probleme"], () => {
    for (;;) {
      const c = pick(COEFFS);
      const k = rnd(3, 4);
      const crit = c.criteres.slice(0, k);
      const notes = crit.map(() => rnd(7, 18));
      const co = crit.map(() => rnd(1, 5));
      const C = somme(co);
      const x = notes[k - 1];
      const S = somme(notes.map((v, i) => v * co[i]));
      if (((S * 10) % C) !== 0) continue; // la moyenne visée s'écrit avec un chiffre après la virgule au plus
      const m = S / C;
      const connus = crit.slice(0, -1).map((nom, i) => `${nom} : ${notes[i]}/20 (coefficient ${co[i]})`).join(" ; ");
      const q = pick([
        `Quelle note doit obtenir ${c.qui} en ${crit[k - 1]} (coefficient ${co[k - 1]}) pour que sa note finale soit exactement ${fr(m)} ?`,
        `Il reste l'épreuve « ${crit[k - 1]} », de coefficient ${co[k - 1]}. Quelle note y faut-il pour une note finale de ${fr(m)} ?`,
      ]);
      const Sc = S - x * co[k - 1];
      return court(`${c.intro} Notes déjà connues — ${connus}. ${q}`, String(x), exp(
        "Moyenne pondérée $= \\dfrac{\\sum c_i x_i}{\\sum c_i}$, donc $\\sum c_i x_i = $ moyenne $\\times \\sum c_i$.",
        "On calcule la somme pondérée visée, on retire ce qui est déjà acquis, puis on divise par le coefficient restant.",
        `Somme visée : $${frm(m)} \\times ${C} = ${S}$. Déjà acquis : $${Sc}$. Il manque $${S} - ${Sc} = ${S - Sc}$, soit $${S - Sc} \\div ${co[k - 1]} = ${x}$.`,
        `Il faut obtenir $${x}$ sur $20$.`,
      ));
    }
  }),

  T("stat_moyenne_ponderee", 5, "pond_effectif_manquant", "Écris la moyenne avec l'effectif inconnu x, puis résous l'équation.", ["moyenne_ponderee", "probleme", "canvas"], () => {
    for (;;) {
      const d = pick(DISCRETS);
      const vals = valeursDe(d);
      const effs = effectifs(d.k, 1, 12);
      const j = rnd(0, d.k - 1);
      const S = somme(vals.map((v, i) => v * effs[i]));
      const N = somme(effs);
      if (((S * 100) % N) !== 0) continue; // moyenne exacte au centième
      const m = S / N;
      const S0 = S - vals[j] * effs[j];
      const N0 = N - effs[j];
      if (Math.abs(vals[j] - m) < 1e-9) continue; // x serait indéterminé
      const canvas: CanvasFigure = {
        kind: "tableau_donnees",
        headers: [d.col, ...vals.map(String)],
        rows: [{ values: ["Effectif", ...effs.map((e, i) => (i === j ? "x" : e))] }],
        display: { compact: true },
      };
      const q = pick([
        `La moyenne de la série vaut exactement ${fr(m)}. Quel est l'effectif x de la valeur ${vals[j]} ?`,
        `Un effectif a été effacé (x). Sachant que la moyenne vaut ${fr(m)}, retrouve x.`,
      ]);
      return court(`${d.intro} ${q}`, String(effs[j]), exp(
        "$\\bar{x} = \\dfrac{\\sum n_i x_i}{N}$ : l'inconnue apparaît au numérateur ET au dénominateur.",
        `$\\dfrac{${S0} + ${vals[j]}x}{${N0} + x} = ${frm(m)}$, d'où $${S0} + ${vals[j]}x = ${frm(m)}(${N0} + x)$.`,
        `$${S0} + ${vals[j]}x = ${frm(m * N0)} + ${frm(m)}x$, donc $(${vals[j]} - ${frm(m)})x = ${frm(m * N0)} - ${S0}$, soit $x = ${effs[j]}$.`,
        `L'effectif manquant est $${effs[j]}$. Vérification : $\\dfrac{${S}}{${N}} = ${frm(m)}$.`,
      ), canvas);
    }
  }),

  T("stat_moyenne_ponderee", 5, "pond_piege_moyennes", "Deux groupes d'effectifs différents : on pondère par les effectifs.", ["moyenne_ponderee", "qcm", "raisonnement"], () => {
    const c = pick(SERIES.filter((s) => s.dec === 0));
    const n1 = rnd(5, 15);
    const n2 = n1 * pick([2, 3, 4]);
    const m1 = valeur(c);
    let m2 = valeur(c);
    while (Math.abs(m2 - m1) < 3 * c.pas) m2 = valeur(c);
    const g = (n1 * m1 + n2 * m2) / (n1 + n2);
    const bon = `$${frm(g, 1)}$`;
    const choices = choixValeurs(bon, [
      `$${frm((m1 + m2) / 2, 1)}$`,
      `$${frm((n2 * m1 + n1 * m2) / (n1 + n2), 1)}$`,
      `$${frm((n1 * m1 + n2 * m2) / 2, 1)}$`,
    ], [`$${frm(g + c.pas * 2, 1)}$`, `$${frm(g - c.pas * 2, 1)}$`]);
    const q = pick([
      "Quelle est la moyenne de l'ensemble (arrondie au dixième) ?",
      `Quelle est la moyenne de toutes les valeurs réunies, au dixième près ?`,
    ]);
    return qcm(`${phrase(c, n1 + n2)}. Les ${n1} premières valeurs ont pour moyenne ${avecU(c, m1)}, les ${n2} suivantes ${avecU(c, m2)}. ${q}`, choices, exp(
      "La moyenne d'un regroupement est pondérée par les effectifs de chaque groupe.",
      "Somme totale $\\div$ effectif total.",
      `$\\dfrac{${n1} \\times ${frm(m1)} + ${n2} \\times ${frm(m2)}}{${n1 + n2}} \\approx ${frm(g, 1)}$.`,
      `Réponse : $${frm(g, 1)}$. ⛔ $\\dfrac{${frm(m1)} + ${frm(m2)}}{2} = ${frm((m1 + m2) / 2, 1)}$ ferait comme si les deux groupes avaient le même effectif.`,
    ));
  }),
];

/* ======================= STAT_MEDIANE_QUARTILES ======================= */

/** L'explication de la médiane d'une liste (rangée ou non). */
function explMediane(xs: number[], dejaRangee: boolean, unite: string): string {
  const s = trie(xs);
  const n = s.length;
  const med = mediane(s);
  const calc = n % 2
    ? `$n = ${n}$ est impair : la médiane est la valeur de rang $\\dfrac{${n} + 1}{2} = ${(n + 1) / 2}$, soit $${frm(med)}$.`
    : `$n = ${n}$ est pair : la médiane est la demi-somme des valeurs de rangs $${n / 2}$ et $${n / 2 + 1}$ : $\\dfrac{${frm(s[n / 2 - 1])} + ${frm(s[n / 2])}}{2} = ${frm(med)}$.`;
  return exp(
    "La médiane partage la série RANGÉE en deux groupes de même effectif.",
    dejaRangee ? "La série est déjà rangée dans l'ordre croissant." : `On range d'abord la série : $${listeM(s)}$.`,
    calc,
    `La médiane vaut $${frm(med)}$ ${unite}.${dejaRangee ? "" : " ⛔ Prendre la valeur du milieu de la liste NON rangée est faux."}`,
  );
}
function explQuartile(xs: number[], p: 0.25 | 0.75, unite: string): string {
  const s = trie(xs);
  const n = s.length;
  const r = rangQ(n, p);
  const nom = p === 0.25 ? "Q_1" : "Q_3";
  return exp(
    `$${nom}$ est la plus petite valeur de la série telle qu'au moins $${p * 100}\\,\\%$ des valeurs lui soient inférieures ou égales.`,
    `On range la série, puis on calcule $${p === 0.25 ? "\\dfrac{n}{4}" : "\\dfrac{3n}{4}"} = ${frm(p * n)}$ : on prend l'entier égal ou juste au-dessus, $${r}$.`,
    `Série rangée : $${listeM(s)}$. La valeur de rang $${r}$ est $${frm(s[r - 1])}$.`,
    `$${nom} = ${frm(s[r - 1])}$ ${unite}.`,
  );
}

const MEDIANE: TutorBankItemV4[] = [
  T("stat_mediane_quartiles", 2, "med_impaire", "Nombre impair de valeurs rangées : la médiane est celle du milieu.", ["mediane"], () => {
    const c = pick(SERIES);
    const n = pick([5, 7, 9, 11]);
    const xs = trie(tirerSerie(c, n));
    const q = pick(["Quelle est la médiane de cette série ?", `Détermine la médiane de ${c.ces}.`, "Quelle valeur partage cette série rangée en deux groupes de même effectif ?"]);
    return court(`${phrase(c, n)}. Valeurs rangées dans l'ordre croissant : ${liste(xs)}. ${q}`, fr(mediane(xs)), explMediane(xs, true, c.unite));
  }),

  T("stat_mediane_quartiles", 2, "med_paire", "Nombre pair de valeurs : demi-somme des deux valeurs centrales.", ["mediane"], () => {
    const c = pick(SERIES);
    const n = pick([6, 8, 10, 12]);
    const xs = trie(tirerSerie(c, n));
    const q = pick(["Quelle est la médiane de cette série ?", `Détermine la médiane de ${c.ces}.`, "Calcule la médiane de cette série rangée."]);
    return court(`${phrase(c, n)}. Valeurs rangées dans l'ordre croissant : ${liste(xs)}. ${q}`, fr(mediane(xs)), explMediane(xs, true, c.unite));
  }),

  T("stat_mediane_quartiles", 3, "med_desordre", "D'abord RANGER la série, ensuite chercher le milieu.", ["mediane"], () => {
    const c = pick(SERIES);
    const n = rnd(6, 11);
    const xs = melanger(tirerDistinctes(c, n));
    const q = pick(["Quelle est la médiane de cette série ?", `Détermine la médiane de ${c.ces}.`, "Calcule la médiane."]);
    return court(`${phrase(c, n)} : ${liste(xs)}. ${q}`, fr(mediane(xs)), explMediane(xs, false, c.unite));
  }),

  T("stat_mediane_quartiles", 3, "med_tableau", "On cumule les effectifs pour trouver la (ou les) valeur(s) du milieu.", ["mediane", "canvas"], () => {
    const d = pick(DISCRETS);
    const vals = valeursDe(d);
    const effs = effectifs(d.k, 1, 12);
    const N = somme(effs);
    const cum = cumuls(effs);
    const med = N % 2 ? valeurDeRang(vals, effs, (N + 1) / 2) : (valeurDeRang(vals, effs, N / 2) + valeurDeRang(vals, effs, N / 2 + 1)) / 2;
    const s = support(d, vals, effs);
    const q = pick(["Quelle est la médiane de cette série ?", `${s.mot} donne les effectifs. Détermine la médiane.`]);
    const rangs = N % 2 ? `$N = ${N}$ est impair : la médiane est la valeur de rang $${(N + 1) / 2}$.` : `$N = ${N}$ est pair : la médiane est la demi-somme des valeurs de rangs $${N / 2}$ et $${N / 2 + 1}$.`;
    return court(`${d.intro} ${q}`, fr(med), exp(
      "Dans un tableau d'effectifs, la médiane se trouve en CUMULANT les effectifs.",
      rangs,
      `Effectifs cumulés : $${cum.join(" ; ")}$.${N % 2 ? ` Le rang $${(N + 1) / 2}$ correspond à la valeur $${valeurDeRang(vals, effs, (N + 1) / 2)}$.` : ` Rang $${N / 2}$ : $${valeurDeRang(vals, effs, N / 2)}$ ; rang $${N / 2 + 1}$ : $${valeurDeRang(vals, effs, N / 2 + 1)}$.`}`,
      `La médiane vaut $${frm(med)}$. ⛔ Ce n'est ni la valeur du milieu du tableau, ni celle du plus grand effectif.`,
    ), s.canvas);
  }),

  T("stat_mediane_quartiles", 4, "q1_liste", "Q1 : rang n ÷ 4, arrondi à l'entier égal ou juste au-dessus, dans la série RANGÉE.", ["quartiles"], () => {
    const c = pick(SERIES);
    const n = rnd(8, 15);
    const xs = melanger(tirerDistinctes(c, n));
    const q = pick(["Détermine le premier quartile $Q_1$ de cette série.", `Quel est le premier quartile de ${c.ces} ?`]);
    return court(`${phrase(c, n)} : ${liste(xs)}. ${q}`, fr(quartile(xs, 0.25)), explQuartile(xs, 0.25, c.unite));
  }),

  T("stat_mediane_quartiles", 4, "q3_liste", "Q3 : rang 3n ÷ 4, arrondi à l'entier égal ou juste au-dessus, dans la série RANGÉE.", ["quartiles"], () => {
    const c = pick(SERIES);
    const n = rnd(8, 15);
    const xs = melanger(tirerDistinctes(c, n));
    const q = pick(["Détermine le troisième quartile $Q_3$ de cette série.", `Quel est le troisième quartile de ${c.ces} ?`]);
    return court(`${phrase(c, n)} : ${liste(xs)}. ${q}`, fr(quartile(xs, 0.75)), explQuartile(xs, 0.75, c.unite));
  }),

  T("stat_mediane_quartiles", 5, "quartile_tableau", "Rang de Q1 : N ÷ 4 (arrondi au-dessus) ; de Q3 : 3N ÷ 4. Puis les effectifs cumulés.", ["quartiles", "canvas"], () => {
    const d = pick(DISCRETS);
    const vals = valeursDe(d);
    const effs = effectifs(d.k, 2, 16);
    const N = somme(effs);
    const p = pick([0.25, 0.75] as const);
    const r = rangQ(N, p);
    const v = valeurDeRang(vals, effs, r);
    const nom = p === 0.25 ? "premier quartile $Q_1$" : "troisième quartile $Q_3$";
    const s = support(d, vals, effs);
    const q = pick([`Détermine le ${nom} de cette série.`, `${s.mot} donne les effectifs. Quel est le ${nom} ?`]);
    return court(`${d.intro} ${q}`, String(v), exp(
      `Le ${nom} est la plus petite valeur telle qu'au moins $${p * 100}\\,\\%$ des valeurs lui soient inférieures ou égales.`,
      `$N = ${N}$ et $${p === 0.25 ? "\\dfrac{N}{4}" : "\\dfrac{3N}{4}"} = ${frm(p * N)}$ : on cherche la valeur de rang $${r}$.`,
      `Effectifs cumulés : $${cumuls(effs).join(" ; ")}$. Le premier cumul qui atteint $${r}$ est en face de la valeur $${v}$.`,
      `Le ${nom} vaut $${v}$.`,
    ), s.canvas);
  }),

  T("stat_mediane_quartiles", 5, "classe_mediane", "La classe médiane contient la valeur du milieu : cumule les effectifs jusqu'à dépasser N ÷ 2.", ["mediane", "classes", "canvas", "qcm"], () => {
    for (;;) {
      const c = pick(CLASSES);
      const noms = nomsClasses(c);
      const effs = effectifs(c.k, 3, 30);
      const N = somme(effs);
      const cum = cumuls(effs);
      const i = cum.findIndex((x) => x > N / 2);
      if (i < 0 || (i > 0 && cum[i - 1] >= N / 2 - 1) || cum[i] <= N / 2 + 1) continue;
      const autres = shuffle(noms.filter((_, k) => k !== i));
      const leurres = [noms[effs.indexOf(Math.max(...effs))], noms[Math.floor(c.k / 2)], ...autres].filter((x) => x !== noms[i]);
      const q = pick(["Dans quelle classe se trouve la médiane ?", `Quelle est la classe médiane de cette série de ${N} ${c.individus} ?`]);
      return qcm(`${c.intro} Le tableau donne la répartition des ${N} ${c.individus}. ${q}`, choixTextes(noms[i], leurres), exp(
        "La médiane est la valeur du milieu de la série rangée : la moitié des individus en dessous, la moitié au-dessus.",
        `$N = ${N}$ : on cherche la classe où le cumul dépasse $${frm(N / 2)}$.`,
        `Effectifs cumulés : $${cum.join(" ; ")}$. On dépasse $${frm(N / 2)}$ dans la classe ${noms[i]}.`,
        `La médiane appartient à la classe ${noms[i]}. ⛔ Ce n'est pas forcément la classe du milieu du tableau, ni celle du plus grand effectif.`,
      ), tableauEffectifs(c.col, noms, effs));
    }
  }),
];

/* ============================ STAT_FREQUENCE ============================ */

/** Des effectifs dont la somme vaut exactement N. */
function effectifsDeTotal(k: number, N: number): number[] {
  for (;;) {
    const coupes = trie(shuffle(Array.from({ length: N - 1 }, (_, i) => i + 1)).slice(0, k - 1));
    const effs = [...coupes, N].map((x, i, t) => x - (i ? t[i - 1] : 0));
    if (effs.every((e) => e >= 1)) return effs;
  }
}

const FREQUENCE: TutorBankItemV4[] = [
  T("stat_frequence", 1, "freq_pourcent", "Fréquence = effectif ÷ effectif total ; × 100 pour l'avoir en %.", ["frequence", "canvas"], () => {
    const d = pick(DISCRETS);
    const vals = valeursDe(d);
    const N = pick([20, 25, 50, 100]);
    const effs = effectifsDeTotal(d.k, N);
    const i = rnd(0, d.k - 1);
    const f = (effs[i] / N) * 100;
    const s = support(d, vals, effs);
    const q = pick([
      `Quelle est la fréquence, en %, de la valeur ${vals[i]} ?`,
      `Quel pourcentage des ${N} ${d.individus} ${d.cond("", vals[i])} ?`,
      `${s.mot} porte sur ${N} ${d.individus}. Donne, en %, la fréquence de la valeur ${vals[i]}.`,
    ]);
    return court(`${d.intro} ${q}`, fr(f), exp(
      "La fréquence d'une valeur est son effectif divisé par l'effectif total.",
      "On divise, puis on multiplie par $100$ pour un pourcentage.",
      `$f = \\dfrac{${effs[i]}}{${N}} = ${frm(effs[i] / N, 4)}$, soit $${frm(f)}\\,\\%$.`,
      `$${frm(f)}\\,\\%$ des ${d.individus} ${d.cond("", vals[i])}.`,
    ), s.canvas);
  }),

  T("stat_frequence", 1, "freq_decimale", "Fréquence = effectif ÷ effectif total, un nombre entre 0 et 1.", ["frequence"], () => {
    const c = pick(SERIES);
    const N = pick([20, 25, 40, 50, 100, 200]);
    const e = rnd(1, N - 1);
    const seuil = vEntre(c, c.min + 0.3 * (c.max - c.min), c.min + 0.7 * (c.max - c.min));
    const sens = pick(["supérieure", "inférieure"]);
    const q = pick(["Quelle est la fréquence de ces valeurs, sous forme décimale ?", "Donne cette fréquence sous forme d'un nombre décimal."]);
    return court(`${phrase(c, N)}. Parmi ces ${N} valeurs, ${e} sont ${sens}s à ${avecU(c, seuil)}. ${q}`, fr(e / N, 4), exp(
      "La fréquence est l'effectif divisé par l'effectif total.",
      "On divise l'effectif concerné par l'effectif total.",
      `$f = \\dfrac{${e}}{${N}} = ${frm(e / N, 4)}$.`,
      `La fréquence vaut $${frm(e / N, 4)}$, soit $${frm((e / N) * 100, 2)}\\,\\%$.`,
    ));
  }),

  T("stat_frequence", 2, "freq_arrondie", "Fréquence = effectif ÷ effectif total, puis l'arrondi demandé.", ["frequence", "canvas"], () => {
    const d = pick(DISCRETS);
    const vals = valeursDe(d);
    const effs = effectifs(d.k, 1, 14);
    const N = somme(effs);
    const i = rnd(0, d.k - 1);
    const s = support(d, vals, effs);
    const q = pick([
      `Quelle est la fréquence de la valeur ${vals[i]} ? Donne-la sous forme décimale, arrondie au centième.`,
      `Calcule la fréquence des ${d.individus} qui ${d.cond("", vals[i])}, sous forme décimale arrondie au centième.`,
    ]);
    return court(`${d.intro} ${q}`, fr(effs[i] / N, 2), exp(
      "La fréquence d'une valeur est son effectif divisé par l'effectif TOTAL.",
      "On calcule d'abord l'effectif total, puis le quotient.",
      `$N = ${effs.join(" + ")} = ${N}$ ; $f = \\dfrac{${effs[i]}}{${N}} \\approx ${frm(effs[i] / N, 2)}$.`,
      `La fréquence vaut environ $${frm(effs[i] / N, 2)}$. ⛔ Diviser par un autre effectif que le total $${N}$ est l'erreur classique.`,
    ), s.canvas);
  }),

  T("stat_frequence", 2, "freq_pourcent_arrondi", "Pourcentage = effectif ÷ total × 100, arrondi au dixième.", ["frequence"], () => {
    const c = pick(SERIES);
    const N = rnd(30, 200);
    const e = rnd(3, N - 3);
    const seuil = vEntre(c, c.min + 0.3 * (c.max - c.min), c.min + 0.7 * (c.max - c.min));
    const sens = pick(["supérieures", "inférieures"]);
    const q = pick(["Quel pourcentage des valeurs cela représente-t-il ? Arrondis au dixième.", "Exprime la fréquence de ces valeurs en %, arrondie au dixième."]);
    const f = (e / N) * 100;
    return court(`${phrase(c, N)}. ${cap(fr(e))} de ces valeurs sont ${sens} à ${avecU(c, seuil)}. ${q}`, fr(f, 1), exp(
      "La fréquence est l'effectif divisé par l'effectif total ; en %, on multiplie par $100$.",
      "On divise, on multiplie par $100$, puis on arrondit.",
      `$\\dfrac{${e}}{${N}} \\times 100 \\approx ${frm(f, 1)}$.`,
      `Environ $${frm(f, 1)}\\,\\%$ des valeurs sont ${sens} à $${frm(seuil)}$.`,
    ));
  }),

  T("stat_frequence", 3, "freq_vers_effectif", "Effectif = fréquence × effectif total.", ["frequence", "probleme"], () => {
    const c = pick(SERIES);
    let N = 0;
    let p = 0;
    do {
      N = pick([40, 60, 80, 120, 150, 200, 250, 300, 400, 500]);
      p = 5 * rnd(1, 19);
    } while ((p * N) % 100 !== 0);
    const seuil = vEntre(c, c.min + 0.3 * (c.max - c.min), c.min + 0.7 * (c.max - c.min));
    const sens = pick(["supérieures", "inférieures"]);
    const e = (p * N) / 100;
    const q = pick(["Combien de valeurs cela représente-t-il ?", `Combien de ces ${N} valeurs sont concernées ?`]);
    return court(`${phrase(c, N)}. ${p} % de ces valeurs sont ${sens} à ${avecU(c, seuil)}. ${q}`, String(e), exp(
      "Fréquence $= \\dfrac{\\text{effectif}}{\\text{effectif total}}$, donc effectif $=$ fréquence $\\times$ effectif total.",
      `On prend $${p}\\,\\%$ de $${N}$.`,
      `$\\dfrac{${p}}{100} \\times ${N} = ${frm(p / 100, 2)} \\times ${N} = ${e}$.`,
      `$${e}$ valeurs sont ${sens} à $${frm(seuil)}$.`,
    ));
  }),

  T("stat_frequence", 3, "freq_cumulee", "« Au plus v » : on additionne les effectifs des valeurs ≤ v, puis ÷ total.", ["frequence", "canvas"], () => {
    const d = pick(DISCRETS);
    const vals = valeursDe(d);
    const N = pick([20, 25, 50, 100]);
    const effs = effectifsDeTotal(d.k, N);
    const j = rnd(1, d.k - 2);
    const auPlus = Math.random() < 0.5;
    const idx = vals.map((_, i) => i).filter((i) => (auPlus ? i <= j : i >= j));
    const e = somme(idx.map((i) => effs[i]));
    const f = (e / N) * 100;
    const s = support(d, vals, effs);
    const cond = d.cond(auPlus ? "au plus " : "au moins ", vals[j]);
    const q = pick([`Quel pourcentage des ${N} ${d.individus} ${cond} ?`, `Quelle est la fréquence, en %, des ${d.individus} qui ${cond} ?`]);
    return court(`${d.intro} ${q}`, fr(f), exp(
      `On cumule les effectifs des valeurs ${auPlus ? "inférieures" : "supérieures"} ou égales à $${vals[j]}$.`,
      "Effectif cumulé, divisé par l'effectif total, puis $\\times 100$.",
      `$${idx.map((i) => effs[i]).join(" + ")} = ${e}$ ; $\\dfrac{${e}}{${N}} \\times 100 = ${frm(f)}$.`,
      `$${frm(f)}\\,\\%$ des ${d.individus} ${cond}.`,
    ), s.canvas);
  }),

  T("stat_frequence", 4, "freq_classe", "Effectif de la (des) classe(s) ÷ effectif total × 100.", ["frequence", "classes", "canvas"], () => {
    const c = pick(CLASSES);
    const noms = nomsClasses(c);
    const b = bornesDe(c);
    const effs = effectifs(c.k, 2, 35);
    const N = somme(effs);
    const forme = rnd(0, 2);
    const j = rnd(1, c.k - 1);
    const idx = forme === 0 ? [j] : forme === 1 ? effs.map((_, i) => i).filter((i) => i < j) : effs.map((_, i) => i).filter((i) => i >= j);
    const e = somme(idx.map((i) => effs[i]));
    const f = (e / N) * 100;
    const q = forme === 0
      ? `Quelle est la fréquence, en %, de la classe ${noms[j]} ?`
      : forme === 1
        ? `Quel pourcentage des ${c.individus} ont une valeur strictement inférieure à ${fr(b[j])} ${c.unite} ?`
        : `Quel pourcentage des ${c.individus} ont une valeur d'au moins ${fr(b[j])} ${c.unite} ?`;
    return court(`${c.intro} Le tableau donne la répartition des ${N} ${c.individus}. ${q} Arrondis au dixième.`, fr(f, 1), exp(
      "La fréquence d'une classe (ou d'un groupe de classes) est son effectif divisé par l'effectif total.",
      "On additionne les effectifs des classes concernées, on divise par $N$, puis $\\times 100$.",
      `Classes retenues : ${idx.map((i) => noms[i]).join(", ")}. $\\dfrac{${idx.map((i) => effs[i]).join(" + ")}}{${N}} \\times 100 = \\dfrac{${e}}{${N}} \\times 100 \\approx ${frm(f, 1)}$.`,
      `Environ $${frm(f, 1)}\\,\\%$.`,
    ), tableauEffectifs(c.col, noms, effs));
  }),

  T("stat_frequence", 4, "freq_vers_total", "Effectif total = effectif ÷ fréquence.", ["frequence", "probleme"], () => {
    const d = pick(DISCRETS);
    let N = 0;
    let p = 0;
    do {
      N = rnd(4, 60) * 5;
      p = pick([4, 5, 8, 10, 12, 15, 16, 20, 24, 25, 30, 35, 40, 45, 60, 75]);
    } while ((p * N) % 100 !== 0);
    const e = (p * N) / 100;
    const v = valeursDe(d)[rnd(1, d.k - 2)];
    const q = pick([`Combien ${de(d.individus)} l'étude compte-t-elle en tout ?`, "Quel est l'effectif total de l'étude ?"]);
    return court(`${d.intro} ${cap(fr(e))} ${d.individus} ${d.cond("", v)}, soit ${p} % de l'effectif total. ${q}`, String(N), exp(
      "Effectif $=$ fréquence $\\times$ effectif total, donc effectif total $=$ effectif $\\div$ fréquence.",
      `$${p}\\,\\% = ${frm(p / 100)}$.`,
      `$N = ${e} \\div ${frm(p / 100)} = ${N}$.`,
      `L'étude porte sur $${N}$ ${d.individus}. Vérification : $${frm(p / 100)} \\times ${N} = ${e}$.`,
    ));
  }),
];

/* ======================= STAT_ECART_INTERQUARTILE ======================= */

const DEF_EIQ = "L'écart interquartile est $Q_3 - Q_1$ : la largeur de l'intervalle qui contient la moitié centrale des valeurs.";

const EIQ: TutorBankItemV4[] = [
  T("stat_ecart_interquartile", 2, "eiq_donnes", "Écart interquartile = Q3 − Q1.", ["ecart_interquartile"], () => {
    const c = pick(SERIES);
    const n = rnd(20, 80);
    const b = cinqDe(c);
    const e = arr(b.q3 - b.q1, 2);
    const info = pick([
      `Q1 = ${avecU(c, b.q1)} et Q3 = ${avecU(c, b.q3)}`,
      `Q1 = ${avecU(c, b.q1)}, la médiane vaut ${avecU(c, b.mediane)} et Q3 = ${avecU(c, b.q3)}`,
      `le troisième quartile vaut ${avecU(c, b.q3)} et le premier ${avecU(c, b.q1)}`,
    ]);
    const q = pick(["Quel est l'écart interquartile ?", `Calcule l'écart interquartile de ${c.ces}.`]);
    return court(`${phrase(c, n)}. Pour ${c.ces}, ${info}. ${q}`, fr(e), exp(
      DEF_EIQ,
      "On soustrait le premier quartile au troisième (la médiane ne sert pas).",
      `$${frm(b.q3)} - ${frm(b.q1)} = ${frm(e)}$.`,
      `L'écart interquartile vaut $${frm(e)}$ ${c.unite}.`,
    ));
  }),

  T("stat_ecart_interquartile", 2, "eiq_boite", "Largeur de la boîte : Q3 − Q1.", ["ecart_interquartile", "canvas", "boite"], () => {
    const c = pick(SERIES);
    const n = rnd(20, 80);
    const b = cinqDe(c);
    const e = arr(b.q3 - b.q1, 2);
    const q = pick(["Quel est l'écart interquartile de cette série ?", "Lis Q1 et Q3 sur le diagramme, puis calcule l'écart interquartile."]);
    return court(`${phrase(c, n)}. Le diagramme en boîte résume ${c.ces}. ${q}`, fr(e), exp(
      DEF_EIQ,
      "Les bords de la boîte sont $Q_1$ (à gauche) et $Q_3$ (à droite).",
      `$Q_3 - Q_1 = ${frm(b.q3)} - ${frm(b.q1)} = ${frm(e)}$.`,
      `L'écart interquartile vaut $${frm(e)}$ ${c.unite}.`,
    ), diagrammeBoites([b]));
  }),

  T("stat_ecart_interquartile", 3, "eiq_boite_qcm", "Ne confonds pas l'écart interquartile (la boîte) et l'étendue (les moustaches).", ["ecart_interquartile", "canvas", "boite", "qcm"], () => {
    const c = pick(SERIES);
    const n = rnd(20, 80);
    const b = cinqDe(c);
    const e = arr(b.q3 - b.q1, 2);
    const choices = choixValeurs(fr(e), [fr(b.max - b.min), fr(b.q3 - b.mediane), fr(b.mediane - b.q1)], [fr(b.max - b.q1), fr(b.q3 - b.min)]);
    const q = pick(["Quel est l'écart interquartile de cette série ?", `Quelle est la largeur de l'intervalle qui contient la moitié centrale de ${c.ces} ?`]);
    return qcm(`${phrase(c, n)}. Le diagramme en boîte résume ${c.ces}. ${q}`, choices, exp(
      DEF_EIQ,
      "On lit $Q_1$ et $Q_3$ aux bords de la boîte.",
      `$${frm(b.q3)} - ${frm(b.q1)} = ${frm(e)}$. (L'étendue, $${frm(b.max)} - ${frm(b.min)} = ${frm(b.max - b.min)}$, utilise les moustaches.)`,
      `L'écart interquartile vaut $${frm(e)}$ ${c.unite}.`,
    ), diagrammeBoites([b]));
  }),

  T("stat_ecart_interquartile", 3, "eiq_deux_boites", "La boîte la plus large a le plus grand écart interquartile.", ["ecart_interquartile", "canvas", "boite"], () => {
    const c = pick(SERIES);
    const n = rnd(20, 60);
    let a = cinqDe(c);
    let b = cinqDe(c);
    for (let k = 0; k < 100 && Math.abs((a.q3 - a.q1) - (b.q3 - b.q1)) < 2 * c.pas; k += 1) b = cinqDe(c);
    if (Math.abs((a.q3 - a.q1) - (b.q3 - b.q1)) < 2 * c.pas) {
      a = { ...a, q1: arr(a.mediane - 2 * c.pas, 2), q3: arr(a.mediane + 2 * c.pas, 2) };
    }
    const ea = arr(a.q3 - a.q1, 2);
    const eb = arr(b.q3 - b.q1, 2);
    const fig = diagrammeBoites([{ ...a, label: c.deux[0] }, { ...b, label: c.deux[1] }]);
    const grand = ea > eb ? c.deux[0] : c.deux[1];
    const ecart = arr(Math.abs(ea - eb), 2);
    const debut = `${phrase(c, n)}, pour deux séries : « ${c.deux[0]} » et « ${c.deux[1]} ».`;
    const expl = exp(
      DEF_EIQ,
      "On calcule $Q_3 - Q_1$ pour chaque boîte.",
      `« ${c.deux[0]} » : $${frm(a.q3)} - ${frm(a.q1)} = ${frm(ea)}$. « ${c.deux[1]} » : $${frm(b.q3)} - ${frm(b.q1)} = ${frm(eb)}$.`,
      `L'écart interquartile le plus grand est celui de « ${grand} », de $${frm(ecart)}$ ${c.unite} de plus.`,
    );
    return Math.random() < 0.5
      ? qcm(`${debut} Quelle série a le plus grand écart interquartile ?`, choixTextes(`« ${grand} »`, [`« ${grand === c.deux[0] ? c.deux[1] : c.deux[0]} »`, "Les deux écarts interquartiles sont égaux"]), expl, fig)
      : court(`${debut} De combien l'écart interquartile de « ${grand} » dépasse-t-il celui de l'autre série ?`, fr(ecart), expl, fig);
  }),

  T("stat_ecart_interquartile", 4, "eiq_liste", "Range la série, trouve Q1 (rang n ÷ 4) et Q3 (rang 3n ÷ 4, arrondis au-dessus), puis Q3 − Q1.", ["ecart_interquartile", "quartiles"], () => {
    const c = pick(SERIES);
    const n = rnd(8, 15);
    const xs = melanger(tirerDistinctes(c, n));
    const s = trie(xs);
    const q1 = quartile(xs, 0.25);
    const q3 = quartile(xs, 0.75);
    const q = pick(["Calcule l'écart interquartile de cette série.", `Quel est l'écart interquartile de ${c.ces} ?`]);
    return court(`${phrase(c, n)} : ${liste(xs)}. ${q}`, fr(q3 - q1), exp(
      DEF_EIQ,
      `On range la série. $\\dfrac{n}{4} = ${frm(n / 4)}$ donne le rang $${rangQ(n, 0.25)}$ ; $\\dfrac{3n}{4} = ${frm((3 * n) / 4)}$ donne le rang $${rangQ(n, 0.75)}$.`,
      `Série rangée : $${listeM(s)}$. $Q_1 = ${frm(q1)}$, $Q_3 = ${frm(q3)}$ ; $Q_3 - Q_1 = ${frm(q3 - q1)}$.`,
      `L'écart interquartile vaut $${frm(q3 - q1)}$ ${c.unite}.`,
    ));
  }),

  T("stat_ecart_interquartile", 4, "eiq_tableau", "Effectifs cumulés : Q1 au rang N ÷ 4, Q3 au rang 3N ÷ 4 (arrondis au-dessus).", ["ecart_interquartile", "quartiles", "canvas"], () => {
    const d = pick(DISCRETS);
    const vals = valeursDe(d);
    let effs = effectifs(d.k, 2, 16);
    const eiq = () => valeurDeRang(vals, effs, rangQ(somme(effs), 0.75)) - valeurDeRang(vals, effs, rangQ(somme(effs), 0.25));
    for (let k = 0; k < 50 && eiq() === 0; k += 1) effs = effectifs(d.k, 2, 16);
    const N = somme(effs);
    const r1 = rangQ(N, 0.25);
    const r3 = rangQ(N, 0.75);
    const q1 = valeurDeRang(vals, effs, r1);
    const q3 = valeurDeRang(vals, effs, r3);
    const s = support(d, vals, effs);
    const q = pick(["Détermine l'écart interquartile de cette série.", `${s.mot} donne les effectifs. Quel est l'écart interquartile ?`]);
    return court(`${d.intro} ${q}`, String(q3 - q1), exp(
      DEF_EIQ,
      `$N = ${N}$ : $Q_1$ est la valeur de rang $${r1}$, $Q_3$ celle de rang $${r3}$.`,
      `Effectifs cumulés : $${cumuls(effs).join(" ; ")}$. $Q_1 = ${q1}$, $Q_3 = ${q3}$.`,
      `L'écart interquartile vaut $${q3} - ${q1} = ${q3 - q1}$.`,
    ), s.canvas);
  }),
];

/* ============================ STAT_ECART_TYPE ============================ */

const DEF_SIGMA = "L'écart type $\\sigma$ mesure la dispersion des valeurs AUTOUR DE LA MOYENNE : $\\sigma = \\sqrt{\\dfrac{1}{N}\\sum n_i (x_i - \\bar{x})^2}$ (le $\\sigma_x$ de la calculatrice).";

/** Deux séries de MÊME moyenne : l'une serrée, l'autre étalée (écarts × k). */
function serieSerreeEtalee(c: Serie, n: number) {
  const L = c.max - c.min;
  const m = vEntre(c, c.min + 0.45 * L, c.min + 0.55 * L);
  const kmax = Math.max(2, Math.min(5, Math.floor(L / (4 * c.pas))));
  const k = rnd(2, kmax);
  const ecarts: number[] = n % 2 ? [0] : [];
  while (ecarts.length < n) {
    const a = rnd(1, 2);
    ecarts.push(a, -a);
  }
  const serre = melangeSimple(ecarts.map((e) => arr(m + e * c.pas, 2)));
  const etale = melangeSimple(ecarts.map((e) => arr(m + e * k * c.pas, 2)));
  return { m, serre, etale };
}
function melangeSimple(xs: number[]): number[] {
  return shuffle(xs);
}

const ECART_TYPE: TutorBankItemV4[] = [
  T("stat_ecart_type", 2, "et_comparer_series", "Des valeurs plus éloignées de la moyenne donnent un écart type plus grand.", ["ecart_type", "qcm", "raisonnement"], () => {
    const c = pick(SERIES);
    const n = pick([4, 5, 6, 7]);
    const { m, serre, etale } = serieSerreeEtalee(c, n);
    const etaleEnA = Math.random() < 0.5;
    const A = etaleEnA ? etale : serre;
    const B = etaleEnA ? serre : etale;
    const gagnant = etaleEnA ? c.deux[0] : c.deux[1];
    const perdant = etaleEnA ? c.deux[1] : c.deux[0];
    const plusGrand = Math.random() < 0.6;
    const bon = plusGrand ? `« ${gagnant} »` : `« ${perdant} »`;
    const q = plusGrand ? "Quelle série a le plus grand écart type ?" : "Quelle série a le plus petit écart type ?";
    return qcm(`${phrase(c, 2 * n)}, en deux séries de ${n} valeurs. « ${c.deux[0]} » : ${liste(A)}. « ${c.deux[1]} » : ${liste(B)}. Les deux séries ont la même moyenne, ${avecU(c, m)}. ${q}`,
      choixTextes(bon, [plusGrand ? `« ${perdant} »` : `« ${gagnant} »`, "Les deux ont le même écart type, puisqu'elles ont la même moyenne"]), exp(
        DEF_SIGMA,
        "À moyenne égale, on regarde de COMBIEN les valeurs s'éloignent de la moyenne.",
        `Série « ${gagnant} » : écarts jusqu'à $${frm(Math.max(...etale.map((x) => Math.abs(x - m))))}$ ; série « ${perdant} » : jusqu'à $${frm(Math.max(...serre.map((x) => Math.abs(x - m))))}$. Calculatrice : $\\sigma \\approx ${frm(ecartType(etale), 2)}$ contre $${frm(ecartType(serre), 2)}$.`,
        `« ${gagnant} » est la plus dispersée : plus grand écart type. Même moyenne ne veut pas dire même dispersion.`,
      ));
  }),

  T("stat_ecart_type", 2, "et_regularite", "La série la plus régulière est celle dont l'écart type est le plus petit.", ["ecart_type", "qcm", "raisonnement"], () => {
    const c = pick(SERIES);
    const L = c.max - c.min;
    const m1 = vEntre(c, c.min + 0.3 * L, c.min + 0.7 * L);
    const m2 = vEntre(c, c.min + 0.3 * L, c.min + 0.7 * L);
    const s1 = arr(L * rnd(4, 16) / 100, 1);
    let s2 = arr(L * rnd(4, 16) / 100, 1);
    while (Math.abs(s2 - s1) < 0.2) s2 = arr(L * rnd(4, 16) / 100, 1);
    const regulier = s1 < s2 ? c.deux[0] : c.deux[1];
    const autre = s1 < s2 ? c.deux[1] : c.deux[0];
    const q = pick(["Quelle série est la plus régulière ?", "Quelle série a ses valeurs les plus resserrées autour de sa moyenne ?"]);
    return qcm(`${phrase(c, rnd(20, 60))}, en deux séries. « ${c.deux[0]} » : moyenne ${avecU(c, m1)}, écart type ${avecU(c, s1)}. « ${c.deux[1]} » : moyenne ${avecU(c, m2)}, écart type ${avecU(c, s2)}. ${q}`,
      choixTextes(`« ${regulier} »`, [`« ${autre} »`, "On ne peut pas comparer sans connaître toutes les valeurs"]), exp(
        DEF_SIGMA,
        "La régularité se lit sur l'écart type, pas sur la moyenne.",
        `$\\sigma$ : $${frm(s1, 1)}$ pour « ${c.deux[0]} », $${frm(s2, 1)}$ pour « ${c.deux[1]} ».`,
        `« ${regulier} » a le plus petit écart type : c'est la série la plus régulière.`,
      ));
  }),

  T("stat_ecart_type", 3, "et_petite_serie", "Moyenne, carrés des écarts à la moyenne, leur moyenne, puis la racine carrée.", ["ecart_type", "calcul"], () => {
    const c = pick(SERIES.filter((s) => s.dec === 0 && s.max - s.min <= 120));
    const n = rnd(4, 6);
    let xs = tirerSerie(c, n);
    for (let k = 0; k < 200 && (somme(xs) / c.pas) % n !== 0; k += 1) xs = tirerSerie(c, n);
    const m = moyenne(xs);
    const ec = xs.map((x) => arr((x - m) ** 2, 4));
    const v = somme(ec) / n;
    const a = pick(ARRONDIS);
    const q = pick([`Calcule l'écart type de ${c.ces}.`, "Quel est l'écart type de cette série ?"]);
    return court(`${phrase(c, n)} : ${liste(xs)}. ${q} ${a.txt}`, fr(Math.sqrt(v), a.d), exp(
      DEF_SIGMA,
      "1) la moyenne ; 2) le carré de chaque écart à la moyenne ; 3) la moyenne de ces carrés (la variance) ; 4) sa racine carrée.",
      `$\\bar{x} = ${frm(m)}$. Carrés des écarts : $${listeM(ec)}$. Variance : $\\dfrac{${frm(somme(ec))}}{${n}} = ${frm(v, 4)}$. $\\sigma = \\sqrt{${frm(v, 4)}} \\approx ${frm(Math.sqrt(v), a.d)}$.`,
      `L'écart type vaut environ $${frm(Math.sqrt(v), a.d)}$ ${c.unite}.`,
    ));
  }),

  T("stat_ecart_type", 3, "et_intervalle", "L'intervalle [x̄ − σ ; x̄ + σ] : moyenne moins / plus l'écart type.", ["ecart_type"], () => {
    const c = pick(SERIES);
    const L = c.max - c.min;
    const n = rnd(20, 200);
    const m = arr(vEntre(c, c.min + 0.35 * L, c.min + 0.65 * L) + (c.dec ? 0 : pick([0, 0.5])), 2);
    const s = arr((L * rnd(5, 18)) / 100, 1);
    const bas = Math.random() < 0.5;
    // ⛔ Pas de borne hors du domaine du contexte (un retard négatif).
    const k = bas && m - 2 * s < c.min ? 1 : pick([1, 2]);
    const rep = bas ? m - k * s : m + k * s;
    const borne = bas ? "la borne inférieure" : "la borne supérieure";
    const inter = k === 1 ? "[x̄ − σ ; x̄ + σ]" : "[x̄ − 2σ ; x̄ + 2σ]";
    return court(`${phrase(c, n)}. La moyenne est x̄ = ${avecU(c, m)} et l'écart type σ = ${avecU(c, s)}. Quelle est ${borne} de l'intervalle ${inter} ?`, fr(rep), exp(
      DEF_SIGMA,
      `${cap(borne)} vaut $\\bar{x} ${bas ? "-" : "+"} ${k === 1 ? "" : "2"}\\sigma$.`,
      `$${frm(m)} ${bas ? "-" : "+"} ${k === 1 ? "" : "2 \\times "}${frm(s)} = ${frm(rep)}$.`,
      `${cap(borne)} vaut $${frm(rep)}$ ${c.unite}.`,
    ));
  }),

  T("stat_ecart_type", 4, "et_tableau", "Calculatrice : valeurs en liste 1, effectifs en liste 2, puis σx.", ["ecart_type", "canvas", "calculatrice"], () => {
    const d = pick(DISCRETS);
    const vals = valeursDe(d);
    const effs = effectifs(d.k, 1, 14);
    const N = somme(effs);
    const m = moyenne(vals, effs);
    const sg = ecartType(vals, effs);
    const a = pick(ARRONDIS);
    const s = support(d, vals, effs);
    const q = pick(["À la calculatrice, détermine l'écart type de cette série.", `${s.mot} donne les effectifs. Quel est l'écart type de la série ?`]);
    return court(`${d.intro} ${q} ${a.txt}`, fr(sg, a.d), exp(
      DEF_SIGMA,
      "On saisit les valeurs et leurs effectifs, puis on lit $\\sigma_x$ (et non $s_x$).",
      `$N = ${N}$, $\\bar{x} = \\dfrac{${somme(vals.map((v, i) => v * effs[i]))}}{${N}} \\approx ${frm(m, 3)}$, $\\sigma = \\sqrt{\\dfrac{1}{${N}}\\sum n_i (x_i - \\bar{x})^2} \\approx ${frm(sg, 3)}$.`,
      `L'écart type vaut environ $${frm(sg, a.d)}$.`,
    ), s.canvas);
  }),

  T("stat_ecart_type", 4, "et_compter_intervalle", "Calcule x̄ − σ et x̄ + σ, puis compte les valeurs entre les deux.", ["ecart_type", "raisonnement"], () => {
    for (;;) {
      const c = pick(SERIES);
      const n = rnd(8, 12);
      const xs = tirerSerie(c, n);
      const m = arr(moyenne(xs), 1);
      const s = arr(ecartType(xs), 1);
      const bas = arr(m - s, 2);
      const haut = arr(m + s, 2);
      // ⛔ Aucune valeur à moins d'un demi-pas d'une borne : l'arrondi de x̄ ou de σ ne doit pas changer la réponse.
      if (s < c.pas || xs.some((x) => Math.abs(x - bas) < 0.5 * c.pas || Math.abs(x - haut) < 0.5 * c.pas)) continue;
      const dedans = xs.filter((x) => x >= bas && x <= haut);
      const q = pick([
        "Combien de valeurs de la série sont dans l'intervalle [x̄ − σ ; x̄ + σ] ?",
        "Combien de valeurs s'écartent de la moyenne d'au plus un écart type ?",
      ]);
      return court(`${phrase(c, n)} : ${liste(xs)}. La moyenne vaut environ ${avecU(c, m)} et l'écart type environ ${avecU(c, s)}. ${q}`, String(dedans.length), exp(
        DEF_SIGMA,
        "On calcule les bornes de l'intervalle, puis on compte les valeurs qui y tombent.",
        `$[${frm(m)} - ${frm(s)} ; ${frm(m)} + ${frm(s)}] = [${frm(bas)} ; ${frm(haut)}]$. Valeurs dedans : $${listeM(dedans)}$.`,
        `$${dedans.length}$ valeurs sur $${n}$ sont dans l'intervalle.`,
      ));
    }
  }),

  T("stat_ecart_type", 5, "et_transformation", "y = a·x + b : l'écart type est multiplié par a ; ajouter b ne le change pas.", ["ecart_type", "linearite"], () => {
    const famille = pick([LIN_AJOUT, LIN_MULT, LIN_AFFINE]);
    const L = pick(famille);
    const t = L.tirer();
    const m = arr(L.mMin + (L.mMax - L.mMin) * Math.random(), L.mDec);
    const s = arr(m * rnd(6, 20) / 100, Math.max(1, L.mDec));
    const ns = Math.abs(t.a) * s;
    const q = pick([
      `Quel est le nouvel écart type${L.uniteN ? ` (en${L.uniteN})` : ""} ?`,
      `Après cette transformation, que vaut l'écart type${L.uniteN ? ` (en${L.uniteN})` : ""} ?`,
    ]);
    return court(`L'écart type ${L.sujet} est de ${fr(s, 2)}${L.unite}. ${t.phrase} ${q} Arrondis au centième si besoin.`, fr(ns, 2), exp(
      "Si chaque valeur $x$ devient $y = ax + b$, alors $\\sigma_y = |a| \\, \\sigma_x$ : ajouter $b$ décale toutes les valeurs sans les écarter.",
      t.a === 1 ? `Ici $a = 1$ et $b = ${frm(t.b)}$ : on ajoute la même quantité à toutes les valeurs.` : `Ici $a = ${frm(t.a, 3)}$${t.b ? ` et $b = ${frm(t.b)}$` : ""}.`,
      `$\\sigma_y = ${frm(t.a, 3)} \\times ${frm(s)} = ${frm(ns, 4)}$.`,
      `Le nouvel écart type vaut ${t.a === 1 ? "toujours" : "environ"} $${frm(ns, 2)}$${L.uniteN}.${t.b ? " ⛔ Le $b$ ne s'ajoute pas à l'écart type." : ""}`,
    ));
  }),

  T("stat_ecart_type", 5, "et_classes", "Centres des classes en liste 1, effectifs en liste 2, puis σx à la calculatrice.", ["ecart_type", "classes", "canvas", "calculatrice"], () => {
    const c = pick(CLASSES);
    const noms = nomsClasses(c);
    const ce = centres(c);
    const effs = effectifs(c.k, 2, 30);
    const N = somme(effs);
    const m = moyenne(ce, effs);
    const sg = ecartType(ce, effs);
    const a = pick(ARRONDIS);
    const q = pick([
      "En remplaçant chaque classe par son centre, estime l'écart type de la série.",
      "À la calculatrice, avec les centres des classes, donne une estimation de l'écart type.",
    ]);
    return court(`${c.intro} Le tableau donne la répartition des ${N} ${c.individus}. ${q} ${a.txt}`, fr(sg, a.d), exp(
      DEF_SIGMA,
      "Chaque classe est remplacée par son centre, affecté de l'effectif de la classe.",
      `Centres : $${ce.map((x) => frm(x)).join(" ; ")}$. $\\bar{x} \\approx ${frm(m, 3)}$ et $\\sigma \\approx ${frm(sg, 3)}$.`,
      `L'écart type est estimé à environ $${frm(sg, a.d)}$ ${c.unite}.`,
    ), tableauEffectifs(c.col, noms, effs));
  }),
];

/* ============================ STAT_INTERPRETER ============================ */

const INTERPRETER: TutorBankItemV4[] = [
  T("stat_interpreter", 2, "interp_phrase_indicateur", "Médiane : au moins 50 % en dessous ou égales ; Q1 : au moins 25 % ; Q3 : au moins 75 %.", ["interpreter", "qcm"], () => {
    const c = pick(SERIES);
    const n = rnd(30, 200);
    const b = cinqDe(c);
    const u = (x: number) => avecU(c, x);
    const cas = pick([
      { nom: "La médiane", v: b.mediane, bon: `Au moins la moitié des valeurs sont inférieures ou égales à ${u(b.mediane)}.`,
        faux: [`La moitié des valeurs sont exactement égales à ${u(b.mediane)}.`, `La moyenne de la série vaut ${u(b.mediane)}.`, `Au moins la moitié des valeurs sont supérieures à ${u(b.q3)}.`] },
      { nom: "Le premier quartile Q1", v: b.q1, bon: `Au moins 25 % des valeurs sont inférieures ou égales à ${u(b.q1)}.`,
        faux: [`Au moins 75 % des valeurs sont inférieures ou égales à ${u(b.q1)}.`, `25 % des valeurs sont exactement égales à ${u(b.q1)}.`, `${u(b.q1)} est le quart de la plus grande valeur.`] },
      { nom: "Le troisième quartile Q3", v: b.q3, bon: `Au moins 75 % des valeurs sont inférieures ou égales à ${u(b.q3)}.`,
        faux: [`Au moins 75 % des valeurs sont supérieures ou égales à ${u(b.q3)}.`, `75 % des valeurs sont exactement égales à ${u(b.q3)}.`, `Au plus 25 % des valeurs sont inférieures ou égales à ${u(b.q3)}.`] },
    ]);
    return qcm(`${phrase(c, n)}. ${cas.nom} de ${c.ces} vaut ${u(cas.v)}. Quelle phrase est juste ?`, choixTextes(cas.bon, cas.faux), exp(
      "Les quartiles et la médiane partagent la série rangée : au moins 25 %, 50 %, 75 % des valeurs sont inférieures ou égales à $Q_1$, à la médiane, à $Q_3$.",
      "On traduit l'indicateur en pourcentage de valeurs.",
      `${cas.nom} vaut $${frm(cas.v)}$.`,
      `Phrase juste : « ${cas.bon} »`,
    ));
  }),

  T("stat_interpreter", 2, "interp_comparer_moyennes", "On calcule les deux moyennes avant de comparer.", ["interpreter", "qcm"], () => {
    const c = pick(SERIES);
    const n = pick([4, 5, 6]);
    let A = tirerSerie(c, n);
    let B = tirerSerie(c, n);
    for (let k = 0; k < 100 && Math.abs(moyenne(A) - moyenne(B)) < c.pas; k += 1) B = tirerSerie(c, n);
    if (Math.abs(moyenne(A) - moyenne(B)) < c.pas) { A = A.map((x) => arr(Math.min(c.max, x + 2 * c.pas), 2)); }
    const plus = Math.random() < 0.5;
    const mA = moyenne(A);
    const mB = moyenne(B);
    const gagne = (mA > mB) === plus ? c.deux[0] : c.deux[1];
    const perd = gagne === c.deux[0] ? c.deux[1] : c.deux[0];
    return qcm(`${phrase(c, 2 * n)}, en deux séries. « ${c.deux[0]} » : ${liste(A)}. « ${c.deux[1]} » : ${liste(B)}. Quelle série a la ${plus ? "plus grande" : "plus petite"} moyenne ?`,
      choixTextes(`« ${gagne} »`, [`« ${perd} »`, "Les deux moyennes sont égales"]), exp(
        "La moyenne résume le niveau d'une série : somme des valeurs divisée par leur nombre.",
        "On calcule la moyenne de chaque série.",
        `« ${c.deux[0]} » : $\\dfrac{${frm(somme(A))}}{${n}} \\approx ${frm(mA)}$. « ${c.deux[1]} » : $\\dfrac{${frm(somme(B))}}{${n}} \\approx ${frm(mB)}$.`,
        `« ${gagne} » a la ${plus ? "plus grande" : "plus petite"} moyenne.`,
      ));
  }),

  T("stat_interpreter", 3, "interp_niveau_regularite", "La moyenne dit le NIVEAU, l'écart type la RÉGULARITÉ.", ["interpreter", "qcm", "ecart_type"], () => {
    const c = pick(SERIES);
    const L = c.max - c.min;
    let m1 = vEntre(c, c.min + 0.3 * L, c.min + 0.7 * L);
    const m2 = vEntre(c, c.min + 0.3 * L, c.min + 0.7 * L);
    if (Math.abs(m1 - m2) < c.pas) m1 = arr(m2 + 2 * c.pas, 2);
    const s1 = arr((L * rnd(4, 16)) / 100, 1);
    let s2 = arr((L * rnd(4, 16)) / 100, 1);
    while (Math.abs(s2 - s1) < 0.2) s2 = arr((L * rnd(4, 16)) / 100, 1);
    const [A, B] = c.deux;
    const phraseDe = (haut: string, regulier: string) => `« ${haut} » a la moyenne la plus élevée ; « ${regulier} » est la plus régulière.`;
    const haut = m1 > m2 ? A : B;
    const reg = s1 < s2 ? A : B;
    const autre = (x: string) => (x === A ? B : A);
    const bon = phraseDe(haut, reg);
    const faux = [phraseDe(autre(haut), reg), phraseDe(haut, autre(reg)), phraseDe(autre(haut), autre(reg))];
    return qcm(`${phrase(c, rnd(30, 120))}, en deux séries. « ${A} » : moyenne ${avecU(c, m1)}, écart type ${avecU(c, s1)}. « ${B} » : moyenne ${avecU(c, m2)}, écart type ${avecU(c, s2)}. Quelle conclusion est juste ?`,
      choixTextes(bon, faux), exp(
        "La moyenne indique le niveau ; l'écart type, la dispersion autour de la moyenne (petit écart type = série régulière).",
        "On compare séparément les moyennes, puis les écarts types.",
        `Moyennes : $${frm(m1)}$ et $${frm(m2)}$. Écarts types : $${frm(s1, 1)}$ et $${frm(s2, 1)}$.`,
        `Conclusion : « ${bon} »`,
      ));
  }),

  T("stat_interpreter", 3, "interp_valeur_extreme", "Une valeur extrême tire la moyenne vers elle ; la médiane bouge peu.", ["interpreter", "calcul"], () => {
    // Seulement des contextes où une valeur très grande reste plausible
    // (un loyer de luxe, un cyclone, un mariage au restaurant…).
    const c = pick(SERIES.filter((s) => s.dec === 0 && ["€", "mm", "min", "kg", "ordonnances", "couverts", "m", "km", "livres"].includes(s.unite)));
    const n = pick([6, 7, 8, 9]);
    const L = c.max - c.min;
    let xs: number[] = [];
    let ext = 0;
    do {
      const base = tirerSerie(c, n);
      ext = arr(c.max + c.pas * Math.round((L * rnd(4, 12)) / 10 / c.pas), 2);
      xs = melangeSimple([...base, ext]);
    } while (moyenne(xs) - mediane(xs) < c.pas);
    const m = moyenne(xs);
    const med = mediane(xs);
    const a = pick(ARRONDIS);
    const q = pick(["Calcule la différence entre la moyenne et la médiane de cette série.", "De combien la moyenne dépasse-t-elle la médiane ?"]);
    return court(`${phrase(c, n + 1)} : ${liste(xs)}. La valeur ${fr(ext)} est exceptionnellement grande. ${q} ${a.txt}`, fr(m - med, a.d), exp(
      "La moyenne utilise TOUTES les valeurs, la médiane seulement leur rang : une valeur extrême déplace la moyenne bien plus que la médiane.",
      "On calcule la moyenne, puis la médiane (série rangée), puis la différence.",
      `$\\bar{x} = \\dfrac{${frm(somme(xs))}}{${n + 1}} \\approx ${frm(m, 3)}$ ; série rangée : $${listeM(trie(xs))}$, médiane $${frm(med)}$. Différence $\\approx ${frm(m - med, a.d)}$.`,
      `La moyenne dépasse la médiane d'environ $${frm(m - med, a.d)}$ ${c.unite} : la valeur $${frm(ext)}$ la tire vers le haut.`,
    ));
  }),

  T("stat_interpreter", 4, "interp_deux_boites", "Médiane : trait intérieur ; écart interquartile : largeur de la boîte ; étendue : d'un bout à l'autre des moustaches.", ["interpreter", "canvas", "boite", "qcm"], () => {
    const c = pick(SERIES);
    let a = cinqDe(c);
    let b = cinqDe(c);
    const indicateurs = (x: Cinq) => [x.mediane, x.q3 - x.q1, x.max - x.min, x.max];
    for (let k = 0; k < 200 && indicateurs(a).some((v, i) => Math.abs(v - indicateurs(b)[i]) < c.pas / 2); k += 1) {
      a = cinqDe(c);
      b = cinqDe(c);
    }
    const [A, B] = c.deux;
    const noms = ["la médiane", "l'écart interquartile", "l'étendue", "la plus grande valeur"];
    const phrases: { t: string; vrai: boolean }[] = [];
    indicateurs(a).forEach((va, i) => {
      const vb = indicateurs(b)[i];
      phrases.push({ t: `${cap(noms[i])} de « ${A} » est plus grande que celle de « ${B} ».`.replace("plus grande que celle", noms[i].startsWith("l'écart") ? "plus grand que celui" : "plus grande que celle"), vrai: va > vb });
      phrases.push({ t: `${cap(noms[i])} de « ${B} » est plus grande que celle de « ${A} ».`.replace("plus grande que celle", noms[i].startsWith("l'écart") ? "plus grand que celui" : "plus grande que celle"), vrai: vb > va });
    });
    const vraies = shuffle(phrases.filter((p) => p.vrai));
    const fausses = shuffle(phrases.filter((p) => !p.vrai)).map((p) => p.t);
    const bon = vraies[0].t;
    return qcm(`${phrase(c, rnd(40, 120))}, en deux séries : « ${A} » et « ${B} ». Les diagrammes en boîte les résument. Quelle affirmation est vraie ?`, choixTextes(bon, fausses), exp(
      "Sur un diagramme en boîte : médiane = trait intérieur, écart interquartile = $Q_3 - Q_1$, étendue = max $-$ min.",
      "On calcule chaque indicateur pour les deux séries, puis on compare.",
      `« ${A} » : médiane $${frm(a.mediane)}$, EIQ $${frm(a.q3 - a.q1)}$, étendue $${frm(a.max - a.min)}$, max $${frm(a.max)}$. « ${B} » : médiane $${frm(b.mediane)}$, EIQ $${frm(b.q3 - b.q1)}$, étendue $${frm(b.max - b.min)}$, max $${frm(b.max)}$.`,
      `Affirmation vraie : « ${bon} »`,
    ), diagrammeBoites([{ ...a, label: A }, { ...b, label: B }]));
  }),

  T("stat_interpreter", 4, "interp_seuil_quartile", "Au moins 75 % des valeurs sont ≥ Q1 : on compare chaque Q1 au seuil.", ["interpreter", "qcm", "quartiles"], () => {
    const c = pick(SERIES);
    const a = cinqDe(c);
    const b = cinqDe(c);
    const [A, B] = c.deux;
    const L = c.max - c.min;
    const X = vEntre(c, c.min + 0.15 * L, c.min + 0.4 * L);
    const okA = a.q1 >= X;
    const okB = b.q1 >= X;
    const bon = okA && okB ? "Les deux séries" : okA ? `« ${A} » seulement` : okB ? `« ${B} » seulement` : "Aucune des deux";
    const tous = ["Les deux séries", `« ${A} » seulement`, `« ${B} » seulement`, "Aucune des deux"];
    const resume = (nom: string, s: Cinq) => `« ${nom} » : Q1 = ${avecU(c, s.q1)}, médiane ${avecU(c, s.mediane)}, Q3 = ${avecU(c, s.q3)}`;
    return qcm(`${phrase(c, rnd(40, 160))}, en deux séries. ${resume(A, a)}. ${resume(B, b)}. Pour quelle(s) série(s) peut-on affirmer qu'au moins 75 % des valeurs sont supérieures ou égales à ${avecU(c, X)} ?`,
      choixTextes(bon, tous.filter((t) => t !== bon)), exp(
        "Au moins 75 % des valeurs sont supérieures ou égales à $Q_1$. C'est garanti pour un seuil inférieur ou égal à $Q_1$.",
        `On compare le seuil $${frm(X)}$ au $Q_1$ de chaque série.`,
        `« ${A} » : $Q_1 = ${frm(a.q1)}$ ${okA ? "$\\geqslant$" : "$<$"} $${frm(X)}$. « ${B} » : $Q_1 = ${frm(b.q1)}$ ${okB ? "$\\geqslant$" : "$<$"} $${frm(X)}$.`,
        `Réponse : ${bon}.`,
      ));
  }),

  T("stat_interpreter", 5, "interp_remplacer_max", "Changer la plus grande valeur change la somme (donc la moyenne), pas le rang du milieu (donc pas la médiane).", ["interpreter", "qcm", "raisonnement"], () => {
    const c = pick(SERIES.filter((s) => s.dec === 0));
    // La série vit dans les 60 % bas du domaine, la correction reste plausible (pas de 66 °C).
    const L = c.max - c.min;
    const n = pick([5, 7, 9, 11].filter((k) => k * c.pas <= 0.4 * L));
    const pool = new Set<number>();
    for (let k = 0; pool.size < n && k < 500; k += 1) pool.add(valeur(c, c.min, c.min + 0.6 * L));
    const xs = trie([...pool]);
    const V = xs[n - 1];
    const j = rnd(1, Math.max(1, Math.floor((0.4 * L) / (n * c.pas))));
    const W = arr(V + n * j * c.pas, 2);
    const d = arr(j * c.pas, 2);
    const u = (x: number) => avecU(c, x);
    const bon = `La moyenne augmente de ${u(d)} et la médiane ne change pas.`;
    const faux = [
      `La moyenne et la médiane augmentent toutes les deux de ${u(d)}.`,
      `La moyenne augmente de ${u(W - V)} et la médiane ne change pas.`,
      `La médiane augmente de ${u(d)} et la moyenne ne change pas.`,
    ];
    return qcm(`${phrase(c, n)}. Valeurs rangées dans l'ordre croissant : ${liste(xs)}. On s'aperçoit que la plus grande valeur, ${u(V)}, était en réalité ${u(W)}. Quel est l'effet de cette correction ?`, choixTextes(bon, faux), exp(
      "La moyenne dépend de la SOMME des valeurs ; la médiane, seulement de la valeur du milieu de la série rangée.",
      "La somme augmente de $W - V$, et l'effectif ne change pas ; la valeur du milieu reste la même.",
      `Somme : $+ ${frm(W - V)}$, donc moyenne : $+ \\dfrac{${frm(W - V)}}{${n}} = + ${frm(d)}$. Médiane : toujours $${frm(xs[(n - 1) / 2])}$.`,
      `« ${bon} »`,
    ));
  }),

  T("stat_interpreter", 5, "interp_effectif_quartile", "Au moins 25 % des valeurs sont ≤ Q1, 50 % ≤ médiane, 75 % ≤ Q3 : on applique ce pourcentage à l'effectif.", ["interpreter", "canvas", "boite"], () => {
    const c = pick(SERIES);
    const N = 4 * rnd(8, 60);
    const b = cinqDe(c);
    const cas = pick([
      { v: b.q1, p: 25, qui: "$Q_1$" },
      { v: b.mediane, p: 50, qui: "la médiane" },
      { v: b.q3, p: 75, qui: "$Q_3$" },
    ]);
    const rep = (cas.p * N) / 100;
    const q = pick([
      `Au moins combien de ces ${N} valeurs sont inférieures ou égales à ${avecU(c, cas.v)} ?`,
      `D'après le diagramme, combien de valeurs, au minimum, sont inférieures ou égales à ${avecU(c, cas.v)} ?`,
    ]);
    return court(`${phrase(c, N)}. Le diagramme en boîte résume ${c.ces}. ${q}`, String(rep), exp(
      "Au moins 25 % des valeurs sont inférieures ou égales à $Q_1$, au moins 50 % à la médiane, au moins 75 % à $Q_3$.",
      `$${frm(cas.v)}$ est ${cas.qui} : au moins $${cas.p}\\,\\%$ des $${N}$ valeurs.`,
      `$\\dfrac{${cas.p}}{100} \\times ${N} = ${rep}$.`,
      `Au moins $${rep}$ valeurs sont inférieures ou égales à $${frm(cas.v)}$.`,
    ), diagrammeBoites([b]));
  }),
];

/* ========================= STAT_LINEARITE_MOYENNE ========================= */

/** La réponse exacte si elle tient en deux décimales ; sinon l'arrondi au centième, ANNONCÉ. */
function exacteOuCentieme(x: number): { rep: string; txt: string } {
  return Math.abs(arr(x, 2) - arr(x, 6)) < 1e-9 ? { rep: fr(x, 2), txt: "" } : { rep: fr(x, 2), txt: " Arrondis au centième." };
}
const tirerM = (L: Lin) => arr(L.mMin + (L.mMax - L.mMin) * Math.random(), L.mDec);
const DEF_LIN = "Linéarité de la moyenne : si chaque valeur $x$ devient $y = ax + b$, alors $\\bar{y} = a\\bar{x} + b$.";

/** La moyenne d'une situation Lin, transformée : le cœur commun des gabarits. */
function linNouvelle(L: Lin, tournures: string[]) {
  const t = L.tirer();
  const m = tirerM(L);
  const y = t.a * m + t.b;
  const r = exacteOuCentieme(y);
  const q = pick(tournures).replace("{N}", L.nouveau).replace("{U}", L.uniteN ? ` (en${L.uniteN})` : "");
  const text = `La moyenne ${L.sujet} est de ${fr(m)}${L.unite}. ${t.phrase} ${q}${r.txt}`;
  const expl = exp(
    DEF_LIN,
    `Ici $a = ${frm(t.a, 3)}$ et $b = ${frm(t.b)}$ : inutile de connaître les valeurs une par une.`,
    `$\\bar{y} = ${frm(t.a, 3)} \\times ${frm(m)} ${t.b < 0 ? "-" : "+"} ${frm(Math.abs(t.b))} = ${frm(y, 4)}$.`,
    `${cap(L.nouveau)} vaut ${r.txt ? "environ " : ""}$${frm(y, 2)}$${L.uniteN}.`,
  );
  return { t, m, y, r, text, expl };
}

/** Une transformation générique d'une série de mesures (SERIES). */
function serieTransformee(c: Serie, a: number, b: number) {
  const n = rnd(5, 8);
  // Une moyenne écrite avec un chiffre après la virgule au plus : elle est EXACTE.
  let xs = tirerSerie(c, n);
  for (let k = 0; k < 300 && (somme(xs) * 10) % n !== 0; k += 1) xs = tirerSerie(c, n);
  const m = moyenne(xs);
  const y = a * m + b;
  return { n, xs, m, y };
}

const LINEARITE: TutorBankItemV4[] = [
  T("stat_linearite_moyenne", 1, "lin_ajout", "Ajouter b à chaque valeur ajoute b à la moyenne.", ["linearite"], () => {
    const L = pick(LIN_AJOUT);
    const z = linNouvelle(L, ["Quelle est {N} ?", "Calcule {N}{U}.", "Sans connaître les valeurs, donne {N}."]);
    return court(z.text, z.r.rep, z.expl);
  }),

  T("stat_linearite_moyenne", 1, "lin_ajout_variation", "La moyenne bouge exactement de la quantité ajoutée (ou retirée) à chaque valeur.", ["linearite"], () => {
    const L = pick(LIN_AJOUT);
    const t = L.tirer();
    const m = tirerM(L);
    const sens = t.b > 0 ? "augmenté" : "diminué";
    return court(`La moyenne ${L.sujet} est de ${fr(m)}${L.unite}. ${t.phrase} De combien la moyenne a-t-elle ${sens}${L.uniteN ? ` (en${L.uniteN})` : ""} ?`, fr(Math.abs(t.b)), exp(
      DEF_LIN,
      `Ici $a = 1$ et $b = ${frm(t.b)}$.`,
      `Nouvelle moyenne : $${frm(m)} ${t.b < 0 ? "-" : "+"} ${frm(Math.abs(t.b))} = ${frm(m + t.b)}$.`,
      `La moyenne a ${sens} de $${frm(Math.abs(t.b))}$${L.uniteN}, exactement comme chaque valeur.`,
    ));
  }),

  T("stat_linearite_moyenne", 1, "lin_ajout_serie", "Moyenne de départ + la quantité ajoutée à chaque valeur.", ["linearite"], () => {
    const c = pick(SERIES.filter((s) => s.dec === 0));
    const b0 = c.pas * rnd(2, 6) * pick([1, -1]);
    const b = c.min + b0 < 0 ? -b0 : b0; // pas de valeur négative (un retard, une masse)
    const z = serieTransformee(c, 1, b);
    const verbe = b > 0 ? `On ajoute ${avecU(c, b)} à chacune de ces valeurs.` : `On retire ${avecU(c, -b)} à chacune de ces valeurs.`;
    const q = pick(["Quelle est la nouvelle moyenne ?", `Que devient la moyenne de ${c.ces} ?`]);
    const r = exacteOuCentieme(z.y);
    return court(`${phrase(c, z.n)} : ${liste(z.xs)} ; leur moyenne vaut ${avecU(c, z.m)}. ${verbe} ${q}${r.txt}`, r.rep, exp(
      DEF_LIN,
      `Toutes les valeurs ${b > 0 ? "augmentent" : "diminuent"} de $${frm(Math.abs(b))}$ : la moyenne aussi.`,
      `$${frm(z.m)} ${b > 0 ? "+" : "-"} ${frm(Math.abs(b))} = ${frm(z.y, 4)}$.`,
      `La nouvelle moyenne vaut ${r.txt ? "environ " : ""}$${frm(z.y, 2)}$ ${c.unite}. Pas besoin de refaire la somme des $${z.n}$ valeurs.`,
    ));
  }),

  T("stat_linearite_moyenne", 2, "lin_mult", "Multiplier chaque valeur par a multiplie la moyenne par a.", ["linearite"], () => {
    const L = pick(LIN_MULT);
    const z = linNouvelle(L, ["Quelle est {N} ?", "Calcule {N}.", "Sans connaître les valeurs, donne {N}."]);
    return court(z.text, z.r.rep, z.expl);
  }),

  T("stat_linearite_moyenne", 2, "lin_mult_qcm", "La moyenne subit la même multiplication que chaque valeur.", ["linearite", "qcm"], () => {
    const L = pick(LIN_MULT);
    const t = L.tirer();
    const m = tirerM(L);
    const y = t.a * m;
    const bon = fr(y, 2);
    const choices = choixValeurs(bon, [fr(m + t.a, 2), fr(m, 2), fr(y / 10, 2), fr(y * 10, 2)], [fr(y + t.a, 2), fr(m * (t.a + 1), 2)]);
    return qcm(`La moyenne ${L.sujet} est de ${fr(m)}${L.unite}. ${t.phrase} ${pick(["Quelle est", "Que vaut"])} ${L.nouveau} ?${Math.abs(arr(y, 2) - y) > 1e-9 ? " (valeurs arrondies au centième)" : ""}`, choices, exp(
      DEF_LIN,
      `Ici $a = ${frm(t.a, 3)}$ et $b = 0$.`,
      `$${frm(t.a, 3)} \\times ${frm(m)} = ${frm(y, 4)}$.`,
      `${cap(L.nouveau)} vaut $${frm(y, 2)}$${L.uniteN}. ⛔ Ajouter $${frm(t.a, 3)}$ au lieu de multiplier est l'erreur classique.`,
    ));
  }),

  T("stat_linearite_moyenne", 2, "lin_mult_serie", "Moyenne de départ × le coefficient appliqué à chaque valeur.", ["linearite"], () => {
    const c = pick(SERIES.filter((s) => s.dec === 0));
    const a = pick([2, 3, 0.5, 1.5, 1.1, 0.9]);
    const z = serieTransformee(c, a, 0);
    const q = pick(["Quelle est la nouvelle moyenne ?", `Que devient la moyenne de ${c.ces} ?`]);
    const r = exacteOuCentieme(z.y);
    return court(`${phrase(c, z.n)} : ${liste(z.xs)} ; leur moyenne vaut ${avecU(c, z.m)}. On multiplie chacune de ces valeurs par ${fr(a)}. ${q}${r.txt}`, r.rep, exp(
      DEF_LIN,
      `Ici $a = ${frm(a)}$ et $b = 0$.`,
      `$${frm(a)} \\times ${frm(z.m)} = ${frm(z.y, 4)}$.`,
      `La nouvelle moyenne vaut ${r.txt ? "environ " : ""}$${frm(z.y, 2)}$ ${c.unite}.`,
    ));
  }),

  T("stat_linearite_moyenne", 3, "lin_affine", "y = a·x + b pour chaque valeur, donc moyenne de y = a × (moyenne de x) + b.", ["linearite"], () => {
    const L = pick(LIN_AFFINE);
    const z = linNouvelle(L, ["Quelle est {N} ?", "Calcule {N}.", "Sans connaître les valeurs, donne {N}."]);
    return court(z.text, z.r.rep, z.expl);
  }),

  T("stat_linearite_moyenne", 3, "lin_affine_qcm", "On multiplie la moyenne par a, PUIS on ajoute b.", ["linearite", "qcm"], () => {
    const L = pick(LIN_AFFINE);
    const t = L.tirer();
    const m = tirerM(L);
    const y = t.a * m + t.b;
    const choices = choixValeurs(fr(y, 2), [fr(t.a * m, 2), fr(t.a * (m + t.b), 2), fr(m + t.b, 2)], [fr(y + t.b, 2), fr(t.a * m - t.b, 2)]);
    return qcm(`La moyenne ${L.sujet} est de ${fr(m)}${L.unite}. ${t.phrase} ${pick(["Quelle est", "Que vaut"])} ${L.nouveau} ?${Math.abs(arr(y, 2) - y) > 1e-9 ? " (valeurs arrondies au centième)" : ""}`, choices, exp(
      DEF_LIN,
      `Ici $a = ${frm(t.a, 3)}$ et $b = ${frm(t.b)}$.`,
      `$${frm(t.a, 3)} \\times ${frm(m)} + ${frm(t.b)} = ${frm(y, 4)}$.`,
      `${cap(L.nouveau)} vaut $${frm(y, 2)}$${L.uniteN}. ⛔ Oublier le $+ ${frm(t.b)}$ donne $${frm(t.a * m, 2)}$.`,
    ));
  }),

  T("stat_linearite_moyenne", 3, "lin_affine_serie", "Moyenne de y = a × moyenne de x + b.", ["linearite"], () => {
    const c = pick(SERIES.filter((s) => s.dec === 0));
    const a = pick([2, 3, 0.5, 1.5, 1.2]);
    const b = c.pas * rnd(1, 5);
    const z = serieTransformee(c, a, b);
    const q = pick(["Quelle est la moyenne des nouvelles valeurs ?", `Que devient la moyenne de ${c.ces} ?`]);
    const r = exacteOuCentieme(z.y);
    return court(`${phrase(c, z.n)} : ${liste(z.xs)} ; leur moyenne vaut ${avecU(c, z.m)}. Chaque valeur est multipliée par ${fr(a)}, puis augmentée de ${fr(b)}. ${q}${r.txt}`, r.rep, exp(
      DEF_LIN,
      `Ici $a = ${frm(a)}$ et $b = ${frm(b)}$.`,
      `$${frm(a)} \\times ${frm(z.m)} + ${frm(b)} = ${frm(z.y, 4)}$.`,
      `La nouvelle moyenne vaut ${r.txt ? "environ " : ""}$${frm(z.y, 2)}$.`,
    ));
  }),

  T("stat_linearite_moyenne", 4, "lin_inverse", "Si ȳ = a·x̄ + b, alors x̄ = (ȳ − b) ÷ a.", ["linearite", "probleme"], () => {
    const L = pick([...LIN_AJOUT, ...LIN_MULT, ...LIN_AFFINE]);
    const t = L.tirer();
    const m = tirerM(L);
    const y = arr(t.a * m + t.b, 4);
    const avant = L.sujet.replace(/^des /, "").replace(/^d'/, "");
    const q = pick([`Quelle était la moyenne de départ${L.unite ? ` (en${L.unite})` : ""} ?`, "Retrouve la moyenne avant la transformation."]);
    return court(`On étudie les valeurs ${L.sujet}. ${t.phrase} Après cette transformation, ${L.nouveau} vaut ${fr(y, 4)}${L.uniteN}. ${q}`, fr(m), exp(
      DEF_LIN,
      `On remonte le calcul : $\\bar{x} = \\dfrac{\\bar{y} - b}{a}$, avec $a = ${frm(t.a, 3)}$ et $b = ${frm(t.b)}$.`,
      `$\\bar{x} = \\dfrac{${frm(y, 4)} ${t.b < 0 ? "+" : "-"} ${frm(Math.abs(t.b))}}{${frm(t.a, 3)}} = ${frm(m)}$.`,
      `La moyenne de départ (${avant}) était $${frm(m)}$${L.unite}.`,
    ));
  }),

  T("stat_linearite_moyenne", 4, "lin_deux_etapes", "L'ORDRE compte : ajouter puis multiplier donne a × (x̄ + b).", ["linearite", "probleme"], () => {
    const c = pick(SERIES.filter((s) => s.dec === 0));
    const L = c.max - c.min;
    const m = arr(vEntre(c, c.min + 0.3 * L, c.min + 0.7 * L) + pick([0, 0.5]), 1);
    const b = c.pas * rnd(1, 6);
    const a = pick([2, 3, 1.5, 0.5, 1.1, 1.2]);
    const ajoutPuisMult = Math.random() < 0.5;
    const y = ajoutPuisMult ? a * (m + b) : a * m + b;
    const r = exacteOuCentieme(y);
    const etapes = ajoutPuisMult
      ? `On ajoute d'abord ${fr(b)} à chacune de ces valeurs, puis on multiplie chaque résultat par ${fr(a)}.`
      : `On multiplie d'abord chacune de ces valeurs par ${fr(a)}, puis on ajoute ${fr(b)} à chaque résultat.`;
    return court(`${phrase(c, rnd(10, 40))} ; leur moyenne vaut ${avecU(c, m)}. ${etapes} Quelle est la moyenne des résultats ?${r.txt}`, r.rep, exp(
      DEF_LIN,
      ajoutPuisMult ? `Chaque valeur devient $${frm(a)}(x + ${frm(b)})$ : la moyenne devient $${frm(a)}(\\bar{x} + ${frm(b)})$.` : `Chaque valeur devient $${frm(a)}x + ${frm(b)}$ : la moyenne devient $${frm(a)}\\bar{x} + ${frm(b)}$.`,
      ajoutPuisMult ? `$${frm(a)} \\times (${frm(m)} + ${frm(b)}) = ${frm(y, 4)}$.` : `$${frm(a)} \\times ${frm(m)} + ${frm(b)} = ${frm(y, 4)}$.`,
      `La moyenne des résultats vaut ${r.txt ? "environ " : ""}$${frm(y, 2)}$. ⛔ ${ajoutPuisMult ? `$${frm(a)} \\times ${frm(m)} + ${frm(b)} = ${frm(a * m + b, 2)}$ oublie de multiplier le $${frm(b)}$.` : `$${frm(a)} \\times (${frm(m)} + ${frm(b)})$ inverserait l'ordre des étapes.`}`,
    ));
  }),

  T("stat_linearite_moyenne", 5, "lin_trouver_a", "Si toutes les valeurs sont multipliées par k, la moyenne aussi : k = nouvelle moyenne ÷ ancienne.", ["linearite", "probleme"], () => {
    const L = pick([...LIN_AJOUT, ...LIN_MULT]);
    const m = tirerM(L);
    const k = pick([1.05, 1.1, 1.2, 1.25, 1.5, 2, 2.5, 0.8, 0.75, 0.9]);
    const y = arr(k * m, 4);
    const q = pick(["Par quel nombre a-t-on multiplié chaque valeur ?", "Quel est ce coefficient multiplicateur ?"]);
    return court(`La moyenne ${L.sujet} est de ${fr(m)}${L.unite}. Chaque valeur est multipliée par un même nombre k ; la moyenne devient ${fr(y, 4)}${L.unite}. ${q}`, fr(k), exp(
      DEF_LIN,
      "Avec $b = 0$ : $\\bar{y} = k\\bar{x}$, donc $k = \\dfrac{\\bar{y}}{\\bar{x}}$.",
      `$k = ${frm(y, 4)} \\div ${frm(m)} = ${frm(k)}$.`,
      `Chaque valeur a été multipliée par $${frm(k)}$${k > 1 ? ` (une hausse de $${frm(arr((k - 1) * 100, 2))}\\,\\%$)` : ` (une baisse de $${frm(arr((1 - k) * 100, 2))}\\,\\%$)`}.`,
    ));
  }),

  T("stat_linearite_moyenne", 5, "lin_trouver_b", "ȳ = a·x̄ + b, donc b = ȳ − a·x̄.", ["linearite", "probleme"], () => {
    const L = pick([...LIN_AFFINE, ...LIN_MULT]);
    const t = L.tirer();
    const m = tirerM(L);
    const b = pick([2, 3, 4, 5, 8, 10, 12, 15, 20]);
    const y = arr(t.a * m + b, 4);
    const q = pick(["Quel est ce nombre b ?", "Quelle quantité b a-t-on ajoutée à chaque valeur ?"]);
    return court(`La moyenne ${L.sujet} est de ${fr(m)}${L.unite}. Chaque valeur est multipliée par ${fr(t.a, 3)}, puis on ajoute un même nombre b. La nouvelle moyenne vaut ${fr(y, 4)}. ${q}`, fr(b), exp(
      DEF_LIN,
      "On isole $b$ : $b = \\bar{y} - a\\bar{x}$.",
      `$b = ${frm(y, 4)} - ${frm(t.a, 3)} \\times ${frm(m)} = ${frm(y, 4)} - ${frm(t.a * m, 4)} = ${frm(b)}$.`,
      `On a ajouté $${frm(b)}$ à chaque valeur.`,
    ));
  }),
];

export const statistiquesDescriptivesBank: TutorBankItemV4[] = [
  ...LIRE,
  ...MOYENNE,
  ...PONDEREE,
  ...MEDIANE,
  ...FREQUENCE,
  ...EIQ,
  ...ECART_TYPE,
  ...INTERPRETER,
  ...LINEARITE,
];
