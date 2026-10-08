// lib/tutor-v4/question-banks/maths/4e/probabilites.bank.ts
//
// Banque de questions Tutor V4 - Mathématiques 4e
// Notion : Probabilités
//
// Objectifs pédagogiques :
// - comprendre le vocabulaire : expérience aléatoire, issue, événement ;
// - déterminer les issues d’une expérience simple ;
// - reconnaître une situation d’équiprobabilité ;
// - calculer une probabilité simple sous forme de fraction ;
// - relier probabilités, fractions et pourcentages ;
// - comparer des probabilités ;
// - développer le raisonnement dans des situations concrètes.
//
// Organisation de la bank :
// - questions fixed : QCM pour fixer les bases (vocabulaire, situations types) ;
// - questions template : génération aléatoire pour varier les contextes ;
// - questions open : justification, explication et raisonnement.
//
// Choix pédagogiques :
// - utilisation de visuels simples pour ancrer les concepts :
//   🎲 dé → issues équiprobables
//   🎡 roue → probabilités pondérées
//   🔴 billes → cas favorables / cas possibles
//   📊 tableau → lecture et comparaison
// - lien explicite avec fractions et pourcentages ;
// - montée progressive vers des situations de défi.
//
// ⛔⛔ 04/10/2026 — « DES QUESTIONS REVIENNENT SOUVENT ». Mesuré avec
// scripts/mesurer-squelettes-coach.ts 4e proba_experience : 7 à 29 squelettes
// d'énoncé par micro, jusqu'à 18 répétitions sur une série de 20. L'élève
// reconnaissait la PHRASE (« Un sac contient # billes rouges et # billes
// bleues… »), pas les nombres.
// 👉 Chaque gabarit compose désormais une EXPÉRIENCE tirée dans trois tables :
//   · UNIVERS NUMÉROTÉS : dés à 4, 6, 8, 10, 12 ou 20 faces, roue de loterie,
//     cartes, tickets de tombola, boules de loto, jetons, dossards d'un cross,
//     casiers du collège, jours d'un mois, places d'un car ;
//   · SCÈNES À CATÉGORIES : sac de billes, urne, boîte de jetons, bonbons,
//     perles, chaussettes, feutres, aquarium, sucettes, chocolats, playlist,
//     classe, club omnisports, panier de fruits (le seul contexte réunionnais),
//     tombola, cartes de collection, graines du jardin ;
//   · MOTS : une lettre par carte, on en tire une.
// × un ÉVÉNEMENT (pair, multiple de, strictement supérieur à, premier,
// diviseur de, couleur, union, contraire…) × une TOURNURE (3 ou 4 façons de
// poser la même question).
// ⛔ Programme de 4e : pas d'arbre, pas d'expérience à deux épreuves.
// ⭐ Les QCM ne montrent jamais deux propositions de même VALEUR (1/2, 0,5 et
// 50 %) : `makeChoices` les compare par leur valeur, pas par leur écriture.
// ⭐ Une réponse courte sous forme de fraction accepte toutes les fractions
// égales, SAUF quand l'énoncé exige la fraction irréductible
// (`reponsesFraction`).

import type {
  TutorBankItemV4,
  TutorGeneratedQuestionV4,
  CanvasProbabilitesData,
} from "@/lib/tutor-v4/types";

type Genere = TutorGeneratedQuestionV4;

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: readonly T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function pgcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : pgcd(b, a % b);
}

/** Valeur d'une proposition (« 3/6 », « 0,5 », « 50 % », « 7 ») ; null si ce n'est pas un nombre. */
function valeurDe(s: string): number | null {
  const t = s.replace(/\s/g, "").replace(",", ".");
  let m = t.match(/^(-?\d+)\/(\d+)$/);
  if (m) return Number(m[2]) === 0 ? null : Number(m[1]) / Number(m[2]);
  m = t.match(/^(-?\d+(?:\.\d+)?)%$/);
  if (m) return Number(m[1]) / 100;
  if (/^-?\d+(?:\.\d+)?$/.test(t)) return Number(t);
  return null;
}

function cleChoix(s: string) {
  const v = valeurDe(s);
  return v === null ? "t:" + s.trim() : "v:" + v.toFixed(9);
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  // Jamais deux fois la même ligne. Un gabarit dont le piège coïncide avec la
  // bonne réponse affichait la même proposition deux fois, et l'élève voyait
  // deux réponses justes. Dédupliquer AVANT de couper à quatre laisse aussi
  // une chance aux distracteurs surnuméraires de prendre la place.
  // ⚠️ 04/08/2026 — la bonne réponse était jetée dans le même chapeau que les
  // pièges : on la met de côté, on tire trois distracteurs, on mélange.
  // ⭐ 04/10/2026 — on compare les VALEURS : « 2/4 » à côté de « 1/2 », ou
  // « 0,5 » à côté de « 50 % », faisait deux bonnes réponses.
  const vues = new Set([cleChoix(correct)]);
  const distracteurs: string[] = [];
  for (const w of shuffle(wrongs)) {
    if (!w || !w.trim()) continue;
    const k = cleChoix(w);
    if (vues.has(k)) continue;
    vues.add(k);
    distracteurs.push(w);
  }
  return shuffle([correct, ...distracteurs.slice(0, 3)]);
}

/* ---------------------------------------------------------------------------
   Petite grammaire et écriture des nombres
--------------------------------------------------------------------------- */
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** « de » devant un groupe sans article, avec élision : « de tirer », « d'obtenir ». */
const deNu = (s: string) => (/^[aeiouyéèêâîôûh]/i.test(s) ? "d'" + s : "de " + s);
/** « que de tirer », « qu'obtenir »… on garde « que de » / « que d' ». */
const queDe = (s: string) => "que " + deNu(s);
/** « le chamboule-tout » → « au chamboule-tout », « la loterie » → « à la loterie ». */
function a(gn: string): string {
  if (gn.startsWith("le ")) return "au " + gn.slice(3);
  if (gn.startsWith("les ")) return "aux " + gn.slice(4);
  return "à " + gn;
}
function joinEt(xs: readonly string[], et = "et"): string {
  if (xs.length <= 1) return xs.join("");
  return xs.slice(0, -1).join(", ") + ` ${et} ` + xs[xs.length - 1];
}
/** Virgule décimale française. */
function fr(x: number): string {
  const r = Math.round(x * 10000) / 10000;
  return String(r).replace(".", ",");
}
function irr(n: number, d: number): string {
  if (n === 0) return "0";
  const g = pgcd(n, d);
  return d / g === 1 ? String(n / g) : `${n / g}/${d / g}`;
}
function decimalExact(n: number, d: number): number | null {
  let q = d / pgcd(n, d);
  while (q % 2 === 0) q /= 2;
  while (q % 5 === 0) q /= 5;
  return q === 1 ? n / d : null;
}
/**
 * Réponses acceptées pour une probabilité n/d écrite en fraction.
 * Non irréductible : la fraction de l'énoncé d'abord, puis TOUTES les
 * fractions égales (dénominateur jusqu'à 400), et l'écriture décimale si elle
 * est exacte. Irréductible exigée : la seule fraction irréductible.
 * ⚠️ `fraction_decimal_equivalent` ne connaît que six groupes d'égalité
 * (1/2, 1/4…) : sans cette liste, 10/24 serait refusé pour 5/12.
 */
function reponsesFraction(n: number, d: number, irreductible: boolean): string[] {
  const g = pgcd(n, d);
  const n0 = n / g;
  const d0 = d / g;
  if (irreductible) return [irr(n, d)];
  const out = [`${n}/${d}`, irr(n, d)];
  for (let k = 1; d0 * k <= Math.max(400, d); k++) out.push(`${n0 * k}/${d0 * k}`);
  // ⛔ 08/10 : 1/32 = 0,03125 était accepté sous la forme ARRONDIE « 0,0313 ».
  // On n'ajoute l'écriture décimale que si elle tient en quatre décimales.
  const v = decimalExact(n, d);
  if (v !== null && Math.abs(Math.round(v * 10000) / 10000 - v) < 1e-12) out.push(fr(v));
  return Array.from(new Set(out));
}
function consigneFraction(irreductible: boolean): string {
  return irreductible
    ? randomChoice([
        "Donne le résultat sous forme de fraction irréductible.",
        "Écris-la sous forme d'une fraction irréductible.",
        "Réponds par une fraction irréductible.",
      ])
    : randomChoice([
        "Donne le résultat sous forme de fraction.",
        "Réponds par une fraction (simplifiée ou non).",
        "Écris-la sous forme d'une fraction.",
      ]);
}
/** Les questions « quelle est la probabilité de… ». */
function qProba(E: string): string {
  return randomChoice([
    `Quelle est la probabilité de l'événement « ${E} » ?`,
    `Quelle est la probabilité ${deNu(E)} ?`,
    `Calcule la probabilité ${deNu(E)}.`,
    `On note A l'événement « ${E} ». Que vaut P(A) ?`,
  ]);
}
function expl(def: string, meth: string, calc: string, concl: string) {
  return `Définition : ${def}\n\nMéthode : ${meth}\n\nCalcul : ${calc}\n\nConclusion : ${concl}`;
}
function listeOuCompte(xs: readonly (number | string)[]): string {
  if (xs.length === 0) return "aucune issue";
  if (xs.length <= 12) return xs.join(", ");
  return `${xs.slice(0, 3).join(", ")}, …, ${xs[xs.length - 1]} (${xs.length} issues)`;
}

const couleurs = {
  rouge: "#ef4444",
  bleu: "#3b82f6",
  vert: "#22c55e",
  jaune: "#eab308",
  violet: "#a855f7",
};
const PALETTE = [couleurs.rouge, couleurs.bleu, couleurs.vert, couleurs.jaune, couleurs.violet, "#f97316", "#ec4899"];

type DiceFace = 1 | 2 | 3 | 4 | 5 | 6;

function isDiceFace(n: number): n is DiceFace {
  return n === 1 || n === 2 || n === 3 || n === 4 || n === 5 || n === 6;
}

function deCanvas(surligne?: number[]): CanvasProbabilitesData {
  const safeSurligne = surligne?.filter(isDiceFace);

  return {
    kind: "probabilites",
    variant: "de",
    de: {
      faces: [1, 2, 3, 4, 5, 6],
      surligne: safeSurligne,
    },
  };
}

function billesCanvas(elements: { label?: string; couleur: string }[]): CanvasProbabilitesData {
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
    tableau: {
      entetes,
      lignes,
      casesSurlignees,
    },
  };
}

function roueNumCanvas(n: number): CanvasProbabilitesData {
  return roueCanvas(
    Array.from({ length: n }, (_, i) => ({ label: String(i + 1), poids: 1, couleur: PALETTE[i % 5] })),
  );
}

/* ---------------------------------------------------------------------------
   LES COULEURS, accordées
--------------------------------------------------------------------------- */
type Couleur = { ms: string; mp: string; fs: string; fp: string; hex: string };
const COULEURS: Couleur[] = [
  { ms: "rouge", mp: "rouges", fs: "rouge", fp: "rouges", hex: "#ef4444" },
  { ms: "bleu", mp: "bleus", fs: "bleue", fp: "bleues", hex: "#3b82f6" },
  { ms: "vert", mp: "verts", fs: "verte", fp: "vertes", hex: "#22c55e" },
  { ms: "jaune", mp: "jaunes", fs: "jaune", fp: "jaunes", hex: "#eab308" },
  { ms: "noir", mp: "noirs", fs: "noire", fp: "noires", hex: "#1f2937" },
  { ms: "blanc", mp: "blancs", fs: "blanche", fp: "blanches", hex: "#e5e7eb" },
  { ms: "violet", mp: "violets", fs: "violette", fp: "violettes", hex: "#a855f7" },
  { ms: "orange", mp: "orange", fs: "orange", fp: "orange", hex: "#f97316" },
  { ms: "rose", mp: "roses", fs: "rose", fp: "roses", hex: "#ec4899" },
  { ms: "gris", mp: "gris", fs: "grise", fp: "grises", hex: "#9ca3af" },
];

/** « le rouge », mais « l'orange ». */
const leCoul = (c: Couleur) => (/^[aeiouy]/.test(c.ms) ? "l'" + c.ms : "le " + c.ms);

/* ---------------------------------------------------------------------------
   TABLE 1 — LES UNIVERS NUMÉROTÉS (issues : les entiers de 1 à n)
--------------------------------------------------------------------------- */
type UniversNum = {
  n: number;
  desc: string;
  /** « obtenir un nombre pair », « tirer une carte portant un nombre pair »… */
  evt: (p: string) => string;
  /** L'issue seule : « obtenir 5 », « tirer la carte numéro 5 »… */
  seul: (k: number) => string;
  /** L'expérience, à l'infinitif. */
  action: string;
  canvas?: CanvasProbabilitesData;
};

const MOIS = [
  { nom: "janvier", n: 31 },
  { nom: "février", n: 28 },
  { nom: "mars", n: 31 },
  { nom: "avril", n: 30 },
  { nom: "mai", n: 31 },
  { nom: "juin", n: 30 },
  { nom: "juillet", n: 31 },
  { nom: "août", n: 31 },
  { nom: "septembre", n: 30 },
  { nom: "octobre", n: 31 },
  { nom: "novembre", n: 30 },
  { nom: "décembre", n: 31 },
];

const FABRIQUES_NUM: Array<() => UniversNum> = [
  () => {
    const n = randomChoice([4, 6, 8, 10, 12, 20]);
    return {
      n,
      desc: randomChoice([
        `On lance un dé équilibré à ${n} faces, numérotées de 1 à ${n}.`,
        `Un dé bien équilibré a ${n} faces, qui portent les nombres de 1 à ${n}. On le lance une fois.`,
      ]),
      evt: (p) => `obtenir ${p}`,
      seul: (k) => `obtenir ${k}`,
      action: "lancer le dé et noter le nombre obtenu",
      canvas: n === 6 ? deCanvas() : undefined,
    };
  },
  () => {
    const n = randomChoice([5, 8, 10, 12, 16]);
    return {
      n,
      desc: `Une roue de loterie est partagée en ${n} secteurs égaux, numérotés de 1 à ${n}. On la fait tourner.`,
      evt: (p) => `obtenir ${p}`,
      seul: (k) => `obtenir le secteur ${k}`,
      action: "faire tourner la roue et lire le numéro désigné",
      canvas: roueNumCanvas(n),
    };
  },
  () => {
    const n = randomChoice([10, 12, 15, 20, 24, 30]);
    return {
      n,
      desc: `On mélange ${n} cartes numérotées de 1 à ${n}, puis on en tire une au hasard.`,
      evt: (p) => `tirer une carte portant ${p}`,
      seul: (k) => `tirer la carte numéro ${k}`,
      action: "tirer une carte au hasard et lire son numéro",
    };
  },
  () => {
    const n = randomChoice([20, 30, 40, 50, 60]);
    return {
      n,
      desc: `Pour une tombola, ${n} tickets numérotés de 1 à ${n} sont placés dans une boîte ; on en tire un au hasard.`,
      evt: (p) => `tirer un ticket portant ${p}`,
      seul: (k) => `tirer le ticket numéro ${k}`,
      action: "tirer un ticket au hasard dans la boîte",
    };
  },
  () => {
    const n = randomChoice([20, 30, 40, 50]);
    return {
      n,
      desc: `Une sphère de loto contient ${n} boules numérotées de 1 à ${n} ; on en tire une au hasard.`,
      evt: (p) => `tirer une boule portant ${p}`,
      seul: (k) => `tirer la boule numéro ${k}`,
      action: "tirer une boule de la sphère de loto",
    };
  },
  () => {
    const n = randomChoice([10, 12, 15, 18, 20, 25]);
    return {
      n,
      desc: `Un sac contient ${n} jetons identiques, numérotés de 1 à ${n} ; on en pioche un sans regarder.`,
      evt: (p) => `piocher un jeton portant ${p}`,
      seul: (k) => `piocher le jeton numéro ${k}`,
      action: "piocher un jeton dans le sac sans regarder",
    };
  },
  () => {
    const n = randomChoice([20, 24, 30, 36, 40, 50]);
    return {
      n,
      desc: `Les ${n} coureurs d'un cross portent des dossards numérotés de 1 à ${n}. On tire au sort l'un d'eux pour un contrôle.`,
      evt: (p) => `tirer au sort un coureur dont le dossard porte ${p}`,
      seul: (k) => `tirer au sort le coureur au dossard ${k}`,
      action: "tirer au sort un coureur du cross",
    };
  },
  () => {
    const n = randomChoice([20, 24, 30, 32, 40]);
    return {
      n,
      desc: `Les ${n} casiers d'un couloir du collège sont numérotés de 1 à ${n}. Un nouvel élève en reçoit un, attribué au hasard.`,
      evt: (p) => `recevoir un casier portant ${p}`,
      seul: (k) => `recevoir le casier numéro ${k}`,
      action: "attribuer un casier au hasard au nouvel élève",
    };
  },
  () => {
    const m = randomChoice(MOIS);
    return {
      n: m.n,
      desc: `On choisit au hasard un jour du mois ${deNu(m.nom)}, qui compte ${m.n} jours.`,
      evt: (p) => `choisir un jour dont la date est ${p}`,
      seul: (k) => `choisir le ${k === 1 ? "1er" : k} ${m.nom}`,
      action: `choisir au hasard un jour du mois ${deNu(m.nom)}`,
    };
  },
  () => {
    const n = randomChoice([30, 40, 48, 50, 56]);
    return {
      n,
      desc: `Dans un car de sortie scolaire, les ${n} places sont numérotées de 1 à ${n}, et chaque élève reçoit sa place par tirage au sort.`,
      evt: (p) => `obtenir une place dont le numéro est ${p}`,
      seul: (k) => `obtenir la place numéro ${k}`,
      action: "tirer au sort une place dans le car",
    };
  },
];

function tirerUniversNum(ok?: (n: number) => boolean): UniversNum {
  for (let essai = 0; essai < 200; essai++) {
    const u = randomChoice(FABRIQUES_NUM)();
    if (!ok || ok(u.n)) return u;
  }
  return FABRIQUES_NUM[0]();
}

const PREMIERS = new Set([2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59]);

type Pred = {
  txt: string;
  /** Le contraire, écrit comme un élève l'écrirait. */
  ctr: string;
  /** Le contraire RATÉ le plus fréquent (on oublie la borne). */
  piege?: string;
  test: (k: number) => boolean;
};

function issues(n: number, test: (k: number) => boolean): number[] {
  const out: number[] = [];
  for (let k = 1; k <= n; k++) if (test(k)) out.push(k);
  return out;
}

/** Les événements d'un univers numéroté de 1 à n (jamais certains ni impossibles). */
function predicats(n: number): Pred[] {
  const out: Pred[] = [
    { txt: "un nombre pair", ctr: "un nombre impair", test: (k) => k % 2 === 0 },
    { txt: "un nombre impair", ctr: "un nombre pair", test: (k) => k % 2 === 1 },
    { txt: "un nombre premier", ctr: "un nombre qui n'est pas premier", test: (k) => PREMIERS.has(k) },
  ];
  const s = randomInt(2, n - 2);
  out.push({
    txt: `un nombre strictement supérieur à ${s}`,
    ctr: `un nombre inférieur ou égal à ${s}`,
    piege: `un nombre strictement inférieur à ${s}`,
    test: (k) => k > s,
  });
  const t = randomInt(2, n - 2);
  out.push({
    txt: `un nombre inférieur ou égal à ${t}`,
    ctr: `un nombre strictement supérieur à ${t}`,
    piege: `un nombre supérieur ou égal à ${t}`,
    test: (k) => k <= t,
  });
  const u = randomInt(3, n - 1);
  out.push({
    txt: `un nombre supérieur ou égal à ${u}`,
    ctr: `un nombre strictement inférieur à ${u}`,
    piege: `un nombre inférieur ou égal à ${u}`,
    test: (k) => k >= u,
  });
  for (const m of [3, 4, 5]) {
    if (n >= 2 * m) {
      out.push({ txt: `un multiple de ${m}`, ctr: `un nombre qui n'est pas un multiple de ${m}`, test: (k) => k % m === 0 });
    }
  }
  if (n >= 8) {
    const lo = randomInt(2, n - 5);
    const hi = lo + randomInt(2, 3);
    out.push({
      txt: `un nombre compris entre ${lo} et ${hi} (${lo} et ${hi} inclus)`,
      ctr: `un nombre strictement inférieur à ${lo} ou strictement supérieur à ${hi}`,
      test: (k) => k >= lo && k <= hi,
    });
  }
  if (n >= 12) {
    out.push({ txt: "un nombre à deux chiffres", ctr: "un nombre à un seul chiffre", test: (k) => k >= 10 });
    const c = randomInt(1, 9);
    out.push({ txt: `un nombre qui se termine par ${c}`, ctr: `un nombre qui ne se termine pas par ${c}`, test: (k) => k % 10 === c });
  }
  const D = randomChoice([12, 18, 20, 24, 30, 36]);
  out.push({ txt: `un diviseur de ${D}`, ctr: `un nombre qui n'est pas un diviseur de ${D}`, test: (k) => D % k === 0 });
  return out.filter((p) => {
    const f = issues(n, p.test).length;
    return f >= 1 && f <= n - 1;
  });
}

/* ---------------------------------------------------------------------------
   TABLE 2 — LES SCÈNES À CATÉGORIES (on tire UN objet ; chaque objet est une issue)
--------------------------------------------------------------------------- */
type Groupe = { s: string; p: string; art: "un" | "une"; hex: string; nb?: [number, number] };
type Scene = {
  id: string;
  lieu: string;
  /** Avec l'article défini, pour « le sac A », « l'urne B ». */
  court: string;
  contient: string;
  objS: string;
  objP: string;
  groupes: Groupe[];
  tirage: string;
  verbe: string;
  /** Le verbe a-t-il un complément direct ? (« ne pas tirer DE bille »). */
  cod: boolean;
  dessin: boolean;
  nb: [number, number];
};

function coul(objS: string, objP: string, fem: boolean, noms?: string[]): Groupe[] {
  return COULEURS.filter((c) => !noms || noms.includes(c.ms)).map((c) => ({
    s: `${objS} ${fem ? c.fs : c.ms}`,
    p: `${objP} ${fem ? c.fp : c.mp}`,
    art: fem ? "une" : "un",
    hex: c.hex,
  }));
}
function grp(art: "un" | "une", liste: Array<[string, string]>, nbs?: Array<[number, number]>): Groupe[] {
  return liste.map(([s, p], i) => ({ s, p, art, hex: PALETTE[i % PALETTE.length], nb: nbs?.[i] }));
}

const SCENES: Scene[] = [
  { id: "sac", lieu: "un sac", court: "le sac", contient: "contient", objS: "bille", objP: "billes", groupes: coul("bille", "billes", true), tirage: "On tire une bille au hasard.", verbe: "tirer", cod: true, dessin: true, nb: [2, 8] },
  { id: "urne", lieu: "une urne", court: "l'urne", contient: "contient", objS: "boule", objP: "boules", groupes: coul("boule", "boules", true), tirage: "On tire une boule au hasard.", verbe: "tirer", cod: true, dessin: true, nb: [2, 8] },
  { id: "jetons", lieu: "une boîte", court: "la boîte", contient: "contient", objS: "jeton", objP: "jetons", groupes: coul("jeton", "jetons", false), tirage: "On pioche un jeton sans regarder.", verbe: "piocher", cod: true, dessin: true, nb: [2, 8] },
  { id: "bonbons", lieu: "un sachet", court: "le sachet", contient: "contient", objS: "bonbon", objP: "bonbons", groupes: coul("bonbon", "bonbons", false, ["rouge", "jaune", "vert", "orange", "rose", "violet", "blanc"]), tirage: "On prend un bonbon au hasard.", verbe: "prendre", cod: true, dessin: true, nb: [2, 9] },
  { id: "perles", lieu: "un bocal", court: "le bocal", contient: "contient", objS: "perle", objP: "perles", groupes: coul("perle", "perles", true), tirage: "On pioche une perle les yeux fermés.", verbe: "piocher", cod: true, dessin: true, nb: [2, 9] },
  { id: "chaussettes", lieu: "un tiroir", court: "le tiroir", contient: "contient", objS: "chaussette", objP: "chaussettes", groupes: coul("chaussette", "chaussettes", true, ["noir", "blanc", "gris", "bleu", "rouge"]), tirage: "Dans le noir, on attrape une chaussette au hasard.", verbe: "attraper", cod: true, dessin: true, nb: [2, 8] },
  { id: "feutres", lieu: "une trousse", court: "la trousse", contient: "contient", objS: "feutre", objP: "feutres", groupes: coul("feutre", "feutres", false), tirage: "On sort un feutre sans regarder.", verbe: "sortir", cod: true, dessin: true, nb: [2, 6] },
  { id: "poissons", lieu: "un aquarium", court: "l'aquarium", contient: "contient", objS: "poisson", objP: "poissons", groupes: coul("poisson", "poissons", false, ["rouge", "orange", "noir", "jaune", "bleu", "gris"]), tirage: "On attrape un poisson au hasard avec une épuisette.", verbe: "attraper", cod: true, dessin: true, nb: [2, 8] },
  {
    id: "sucettes", lieu: "un paquet de sucettes", court: "le paquet", contient: "contient", objS: "sucette", objP: "sucettes",
    groupes: grp("une", [["sucette à la fraise", "sucettes à la fraise"], ["sucette au citron", "sucettes au citron"], ["sucette à la menthe", "sucettes à la menthe"], ["sucette au cola", "sucettes au cola"], ["sucette à l'orange", "sucettes à l'orange"]]),
    tirage: "On prend une sucette au hasard.", verbe: "prendre", cod: true, dessin: false, nb: [2, 9],
  },
  {
    id: "chocolats", lieu: "une boîte de chocolats", court: "la boîte", contient: "contient", objS: "chocolat", objP: "chocolats",
    groupes: grp("un", [["chocolat au lait", "chocolats au lait"], ["chocolat noir", "chocolats noirs"], ["chocolat blanc", "chocolats blancs"], ["chocolat praliné", "chocolats pralinés"]]),
    tirage: "On choisit un chocolat sans regarder.", verbe: "choisir", cod: true, dessin: false, nb: [2, 9],
  },
  {
    id: "playlist", lieu: "une playlist", court: "la playlist", contient: "contient", objS: "chanson", objP: "chansons",
    groupes: grp("une", [["chanson de rap", "chansons de rap"], ["chanson de pop", "chansons de pop"], ["chanson de rock", "chansons de rock"], ["chanson de jazz", "chansons de jazz"], ["chanson de reggae", "chansons de reggae"]]),
    tirage: "En mode aléatoire, le lecteur choisit au hasard la première chanson.", verbe: "tomber sur", cod: false, dessin: false, nb: [3, 12],
  },
  {
    id: "classe", lieu: "une classe de 4e", court: "la classe", contient: "compte", objS: "élève", objP: "élèves",
    groupes: [
      { s: "fille", p: "filles", art: "une", hex: couleurs.violet },
      { s: "garçon", p: "garçons", art: "un", hex: couleurs.vert },
    ],
    tirage: "On désigne un élève au hasard pour représenter la classe.", verbe: "désigner", cod: true, dessin: false, nb: [10, 16],
  },
  {
    id: "club", lieu: "un club omnisports", court: "le club", contient: "compte", objS: "adhérent", objP: "adhérents",
    groupes: grp("un", [["judoka", "judokas"], ["nageur", "nageurs"], ["basketteur", "basketteurs"], ["gymnaste", "gymnastes"]]),
    tirage: "On choisit un adhérent au hasard pour la photo du journal local.", verbe: "choisir", cod: true, dessin: false, nb: [3, 12],
  },
  {
    id: "fruits", lieu: "un panier de fruits du marché de Saint-Pierre", court: "le panier", contient: "contient", objS: "fruit", objP: "fruits",
    groupes: [
      { s: "mangue", p: "mangues", art: "une", hex: couleurs.jaune },
      { s: "letchi", p: "letchis", art: "un", hex: couleurs.rouge },
      { s: "ananas", p: "ananas", art: "un", hex: "#a16207" },
      { s: "fruit de la passion", p: "fruits de la passion", art: "un", hex: couleurs.violet },
    ],
    tirage: "On prend un fruit au hasard.", verbe: "prendre", cod: true, dessin: false, nb: [2, 8],
  },
  {
    id: "tombola", lieu: "une urne de tombola", court: "l'urne", contient: "contient", objS: "billet", objP: "billets",
    groupes: grp("un", [["billet gagnant", "billets gagnants"], ["billet perdant", "billets perdants"]], [[2, 6], [10, 25]]),
    tirage: "On tire un billet au hasard.", verbe: "tirer", cod: true, dessin: false, nb: [2, 20],
  },
  {
    id: "cartes", lieu: "un paquet de cartes de collection", court: "le paquet", contient: "contient", objS: "carte", objP: "cartes",
    groupes: grp("une", [["carte commune", "cartes communes"], ["carte rare", "cartes rares"], ["carte brillante", "cartes brillantes"]], [[8, 15], [2, 6], [2, 4]]),
    tirage: "On tire une carte au hasard.", verbe: "tirer", cod: true, dessin: false, nb: [2, 10],
  },
  {
    id: "graines", lieu: "un sachet de graines mélangées", court: "le sachet", contient: "contient", objS: "graine", objP: "graines",
    groupes: grp("une", [["graine de radis", "graines de radis"], ["graine de tournesol", "graines de tournesol"], ["graine de capucine", "graines de capucine"], ["graine de haricot", "graines de haricot"]]),
    tirage: "On sème une graine prise au hasard.", verbe: "semer", cod: true, dessin: false, nb: [3, 12],
  },
];

type Compo = { g: Groupe; n: number };
type Sac = { scene: Scene; compo: Compo[]; total: number; desc: string; canvas?: CanvasProbabilitesData };

const qte = (n: number, g: Groupe) => (n === 1 ? `${g.art} ${g.s}` : `${n} ${g.p}`);
const evtG = (sc: Scene, g: Groupe) => `${sc.verbe} ${g.art} ${g.s}`;
const evtNonG = (sc: Scene, g: Groupe) =>
  sc.cod ? `ne pas ${sc.verbe} ${deNu(g.s)}` : `ne pas ${sc.verbe} ${g.art} ${g.s}`;
const evtOu = (sc: Scene, g1: Groupe, g2: Groupe) => `${sc.verbe} ${g1.art} ${g1.s} ou ${g2.art} ${g2.s}`;

function habiller(scene: Scene, compo: Compo[]): Sac {
  const total = compo.reduce((s, c) => s + c.n, 0);
  const liste = joinEt(compo.map((c) => qte(c.n, c.g)));
  const desc =
    randomChoice([`${cap(scene.lieu)} ${scene.contient} ${liste}.`, `Dans ${scene.lieu}, il y a ${liste}.`]) +
    " " +
    scene.tirage;
  const canvas =
    scene.dessin && total <= 30
      ? billesCanvas(compo.flatMap((c) => Array.from({ length: c.n }, () => ({ couleur: c.g.hex }))))
      : undefined;
  return { scene, compo, total, desc, canvas };
}

/** Une scène à k catégories ; `comptes` impose les effectifs (sinon tirés dans les bornes). */
function tirerSac(k: number, filtre?: (s: Scene) => boolean, comptes?: number[]): Sac {
  const scenes = SCENES.filter((s) => s.groupes.length >= k && (!filtre || filtre(s)));
  const scene = randomChoice(scenes);
  const gs = shuffle(scene.groupes).slice(0, k);
  const compo = gs.map((g, i) => ({ g, n: comptes?.[i] ?? randomInt(...(g.nb ?? scene.nb)) }));
  return habiller(scene, compo);
}

/** k entiers ≥ mini dont la somme vaut T. */
function partition(T: number, k: number, mini = 1): number[] {
  const out = Array.from({ length: k }, () => mini);
  for (let r = T - k * mini; r > 0; r--) out[randomInt(0, k - 1)]++;
  return out;
}

/* ---------------------------------------------------------------------------
   TABLE 3 — LES MOTS (une lettre par carte)
--------------------------------------------------------------------------- */
const VOYELLES = "AEIOUY";
const MOTS = [
  "BANANE", "ANANAS", "PAPILLON", "CHOCOLAT", "PARAPLUIE", "ABRACADABRA", "CARNAVAL", "TOBOGGAN",
  "MARMOTTE", "CROCODILE", "KANGOUROU", "PISCINE", "TOMATE", "GIRAFE", "MOUSTIQUE", "CHAMPIGNON",
  "PANTALON", "SALADE", "CASSEROLE", "TROMPETTE", "CALCULATRICE", "COMPAS", "TRAMPOLINE", "ORDINATEUR",
];
/** Des mots aux lettres toutes différentes : chaque lettre est alors UNE issue. */
const MOTS_DISTINCTS = [
  "LUNE", "CHAT", "PIANO", "ROUGE", "MONDE", "JARDIN", "CAMION", "PLUME", "VOLCAN", "SUCRE",
  "TIGRE", "POULE", "NUAGE", "CITRON", "FLEUR",
];
type Mot = { w: string; lettres: string[]; desc: string; action: string; unite: "carte" | "jeton" };
function tirerMot(distinct = false): Mot {
  const w = randomChoice(distinct ? MOTS_DISTINCTS : [...MOTS, ...MOTS_DISTINCTS]);
  const cartes = Math.random() < 0.5;
  return {
    w,
    lettres: w.split(""),
    desc: cartes
      ? `On écrit chaque lettre du mot ${w} sur une carte (une lettre par carte), on mélange les cartes et on en tire une au hasard.`
      : `Les lettres du mot ${w} sont écrites sur des jetons identiques, une lettre par jeton, puis placées dans un sac. On en tire un au hasard.`,
    action: cartes ? "tirer une carte et lire la lettre écrite dessus" : "tirer un jeton du sac et lire sa lettre",
    unite: cartes ? "carte" : "jeton",
  };
}
const nbLettre = (m: Mot, L: string) => m.lettres.filter((x) => x === L).length;
const nbVoy = (m: Mot) => m.lettres.filter((x) => VOYELLES.includes(x)).length;
const ABSENTES = "BDFGJKMQVWXZ".split("");

/* ---------------------------------------------------------------------------
   Briques partagées
--------------------------------------------------------------------------- */
type Nature = "certain" | "impossible" | "possible";
type EvtNature = { desc: string; E: string; nature: Nature; raison: string; canvas?: CanvasProbabilitesData };

function tirerEvenementNature(natures: Nature[]): EvtNature {
  const nature = randomChoice(natures);
  const src = randomInt(0, 2);
  if (src === 0) {
    const u = tirerUniversNum();
    const n = u.n;
    if (nature === "certain") {
      const p = randomChoice([
        `un nombre inférieur ou égal à ${n}`,
        `un nombre strictement inférieur à ${n + randomInt(1, 9)}`,
        "un nombre entier",
        `un nombre compris entre 1 et ${n}`,
        "un nombre strictement positif",
      ]);
      return { desc: u.desc, E: u.evt(p), nature, raison: `les ${n} issues, de 1 à ${n}, le réalisent toutes`, canvas: u.canvas };
    }
    if (nature === "impossible") {
      const p = randomChoice([
        `un nombre strictement supérieur à ${n}`,
        `le nombre ${n + randomInt(1, 9)}`,
        "le nombre 0",
        "un nombre négatif",
        "un nombre décimal non entier",
        n < 10 ? "un nombre à deux chiffres" : "un nombre à trois chiffres",
      ]);
      return { desc: u.desc, E: u.evt(p), nature, raison: `aucune des issues, de 1 à ${n}, ne le réalise`, canvas: u.canvas };
    }
    const q = randomChoice(predicats(n));
    return {
      desc: u.desc,
      E: u.evt(q.txt),
      nature,
      raison: `seules certaines issues le réalisent : ${listeOuCompte(issues(n, q.test))}`,
      canvas: u.canvas,
    };
  }
  if (src === 1) {
    const k = nature === "certain" ? 2 : randomInt(2, 3);
    const sac = tirerSac(k, nature === "impossible" ? (s) => s.groupes.length > k : undefined);
    const sc = sac.scene;
    const [c0, c1] = sac.compo;
    if (nature === "certain") {
      return { desc: sac.desc, E: evtOu(sc, c0.g, c1.g), nature, raison: `les ${sac.total} ${sc.objP} sont tous des ${c0.g.p} ou des ${c1.g.p}`, canvas: sac.canvas };
    }
    if (nature === "impossible") {
      const abs = randomChoice(sc.groupes.filter((g) => !sac.compo.some((c) => c.g === g)));
      return { desc: sac.desc, E: evtG(sc, abs), nature, raison: `il n'y a aucun${abs.art === "une" ? "e" : ""} ${abs.s} parmi les ${sac.total} ${sc.objP}`, canvas: sac.canvas };
    }
    const c = randomChoice(sac.compo);
    return { desc: sac.desc, E: evtG(sc, c.g), nature, raison: `il y a ${qte(c.n, c.g)} parmi ${sac.total} ${sc.objP}, mais pas seulement`, canvas: sac.canvas };
  }
  const m = tirerMot();
  if (nature === "certain") {
    return { desc: m.desc, E: randomChoice(["tirer une voyelle ou une consonne", `tirer une lettre du mot ${m.w}`]), nature, raison: `les ${m.lettres.length} lettres du mot ${m.w} le réalisent toutes` };
  }
  if (nature === "impossible") {
    const L = randomChoice(ABSENTES.filter((x) => !m.lettres.includes(x)));
    return { desc: m.desc, E: `tirer la lettre ${L}`, nature, raison: `le mot ${m.w} ne contient pas la lettre ${L}` };
  }
  const L = randomChoice(m.lettres);
  return { desc: m.desc, E: `tirer la lettre ${L}`, nature, raison: `la lettre ${L} est sur ${nbLettre(m, L)} carte(s) sur ${m.lettres.length}` };
}

/** Un événement et les phrases candidates, chacune avec l'ENSEMBLE d'issues qu'elle désigne. */
type Cand = { ph: string; key: string };
type UniversContraire = {
  desc: string;
  E: string;
  target: string;
  cands: Cand[];
  nbCtr: number;
  nbTot: number;
  unite: string;
  detail: string;
  canvas?: CanvasProbabilitesData;
};

function tirerContraire(srcImpose?: number): UniversContraire {
  const src = srcImpose ?? randomChoice([0, 0, 1, 1, 2]);
  if (src === 0) {
    const u = tirerUniversNum();
    const n = u.n;
    const preds = predicats(n);
    const p = randomChoice(preds);
    const key = (test: (k: number) => boolean) => issues(n, test).join(",");
    const cands: Cand[] = [];
    for (const q of preds) {
      cands.push({ ph: u.evt(q.txt), key: key(q.test) });
      cands.push({ ph: u.evt(q.ctr), key: key((k) => !q.test(k)) });
    }
    if (p.piege) {
      const m = p.piege.match(/(\d+)$/);
      const b = m ? Number(m[1]) : 0;
      const t = p.piege.includes("strictement inférieur") ? (k: number) => k < b : p.piege.includes("supérieur ou égal") ? (k: number) => k >= b : (k: number) => k <= b;
      cands.push({ ph: u.evt(p.piege), key: key(t) });
    }
    cands.push({ ph: `ne pas ${u.evt(p.txt)}`, key: key((k) => !p.test(k)) });
    const fav = issues(n, p.test);
    const comp = issues(n, (k) => !p.test(k));
    return {
      desc: u.desc,
      E: u.evt(p.txt),
      target: comp.join(","),
      cands,
      nbCtr: comp.length,
      nbTot: n,
      unite: "",
      detail: `« ${u.evt(p.txt)} » est réalisé par ${listeOuCompte(fav)} ; il reste ${listeOuCompte(comp)}`,
      canvas: u.canvas,
    };
  }
  if (src === 1) {
    const k = randomInt(2, 3);
    const sac = tirerSac(k);
    const sc = sac.scene;
    const gs = sac.compo.map((c) => c.g);
    const tous = gs.map((_, i) => i);
    const key = (ids: number[]) => [...ids].sort().join(",");
    const cands: Cand[] = [];
    gs.forEach((g, i) => {
      cands.push({ ph: evtG(sc, g), key: key([i]) });
      cands.push({ ph: evtNonG(sc, g), key: key(tous.filter((j) => j !== i)) });
      gs.forEach((h, j) => {
        if (j > i) cands.push({ ph: evtOu(sc, g, h), key: key([i, j]) });
      });
    });
    const abs = sc.groupes.find((g) => !gs.includes(g));
    if (abs) cands.push({ ph: evtG(sc, abs), key: "" });
    const evIds = k === 3 && Math.random() < 0.4 ? [0, 1] : [0];
    const E = evIds.length === 2 ? evtOu(sc, gs[0], gs[1]) : evtG(sc, gs[0]);
    const compIds = tous.filter((i) => !evIds.includes(i));
    const nbCtr = compIds.reduce((s, i) => s + sac.compo[i].n, 0);
    return {
      desc: sac.desc,
      E,
      target: key(compIds),
      cands,
      nbCtr,
      nbTot: sac.total,
      unite: sc.objS,
      detail: `le contraire regroupe ${joinEt(compIds.map((i) => `les ${sac.compo[i].g.p}`))}, soit ${nbCtr} ${sc.objP} sur ${sac.total}`,
      canvas: sac.canvas,
    };
  }
  const m = tirerMot();
  const pos = (f: (L: string) => boolean) => m.lettres.map((L, i) => (f(L) ? i : -1)).filter((i) => i >= 0).join(",");
  const cands: Cand[] = [
    { ph: "tirer une voyelle", key: pos((L) => VOYELLES.includes(L)) },
    { ph: "tirer une consonne", key: pos((L) => !VOYELLES.includes(L)) },
  ];
  const lettres = shuffle(Array.from(new Set(m.lettres))).slice(0, 3);
  for (const L of lettres) {
    cands.push({ ph: `tirer la lettre ${L}`, key: pos((x) => x === L) });
    cands.push({ ph: `ne pas tirer la lettre ${L}`, key: pos((x) => x !== L) });
  }
  const choix = randomInt(0, 2);
  const E = choix === 0 ? "tirer une voyelle" : choix === 1 ? "tirer une consonne" : `tirer la lettre ${lettres[0]}`;
  const test = choix === 0 ? (L: string) => VOYELLES.includes(L) : choix === 1 ? (L: string) => !VOYELLES.includes(L) : (L: string) => L === lettres[0];
  const comp = m.lettres.filter((L) => !test(L));
  return {
    desc: m.desc,
    E,
    target: pos((L) => !test(L)),
    cands,
    nbCtr: comp.length,
    nbTot: m.lettres.length,
    unite: m.unite,
    detail: `sur les ${m.lettres.length} lettres de ${m.w}, celles qui ne réalisent pas « ${E} » sont ${comp.join(", ")}`,
  };
}

/* ===========================================================================
   GÉNÉRATEURS — VOCABULAIRE
=========================================================================== */
const SITUATIONS_ALEA = [
  "lancer un dé à 12 faces et noter le nombre obtenu",
  "tirer une carte au hasard dans un paquet bien mélangé",
  "faire tourner une roue de loterie et noter la couleur obtenue",
  "tirer au sort le nom d'un élève de la classe",
  "piocher un jeton dans un sac sans regarder",
  "lancer une pièce de monnaie et noter le côté visible",
  "tirer une boule dans une sphère de loto",
  "lancer une playlist en mode aléatoire et noter la première chanson",
  "tirer au sort l'équipe qui engage un match",
  "piocher une lettre au Scrabble sans regarder",
  "tirer un billet de tombola dans une urne",
  "prendre un bonbon au hasard dans un sachet de couleurs mélangées",
  "désigner au hasard le gagnant d'un concours parmi les participants",
  "lancer un dé à 6 faces et noter si le résultat est pair",
  "attraper un poisson au hasard dans un aquarium",
  "semer une graine prise au hasard dans un sachet de graines mélangées",
  "choisir les yeux fermés une chaussette dans un tiroir",
  "tirer au sort l'ordre de passage des exposés",
];
const SITUATIONS_DET = [
  "calculer 7 × 8",
  "convertir 3 km en mètres",
  "compter les fenêtres de la salle de classe",
  "tracer un carré de 5 cm de côté et calculer son périmètre",
  "multiplier un nombre par 10",
  "ranger cinq nombres dans l'ordre croissant",
  "calculer l'aire d'un rectangle de 3 cm sur 4 cm",
  "compter les lettres du mot BANANE",
  "chercher quel jour de la semaine suit le lundi",
  "lâcher une balle et regarder si elle tombe",
  "additionner les nombres entiers de 1 à 10",
  "chercher le nombre de jours d'une semaine",
  "diviser 100 par 4",
  "écrire le nombre trois cent douze en chiffres",
  "calculer le double de 45",
  "compter les côtés d'un hexagone",
  "calculer le prix de 3 baguettes à 1,10 € pièce",
  "mesurer à la règle un segment tracé de 7 cm",
];

function genVocabAleatoire(): Genere {
  const alea = Math.random() < 0.5;
  const s = randomChoice(alea ? SITUATIONS_ALEA : SITUATIONS_DET);
  const t = randomInt(0, 3);
  const text = [
    `« ${cap(s)} » : est-ce une expérience aléatoire ?`,
    `Peut-on dire que « ${s} » est une expérience aléatoire ?`,
    `Si l'on recommence « ${s} » dans les mêmes conditions, obtient-on toujours le même résultat ?`,
    `Le résultat de l'action « ${s} » dépend-il du hasard ?`,
  ][t];
  const oui = t === 2 ? !alea : alea;
  return {
    text,
    format: "qcm",
    choices: ["oui", "non"],
    expected: [oui ? "oui" : "non"],
    comparator: "mcq_exact",
    explanation: expl(
      "une expérience aléatoire est une expérience dont on ne peut pas prévoir le résultat à l'avance : recommencée dans les mêmes conditions, elle peut donner des résultats différents.",
      "on se demande si plusieurs résultats sont possibles, ou si le résultat est déjà fixé.",
      alea
        ? `« ${s} » peut donner des résultats différents d'une fois sur l'autre : c'est le hasard qui décide.`
        : `« ${s} » donne toujours le même résultat : rien n'est laissé au hasard.`,
      alea
        ? `c'est une expérience aléatoire, donc la bonne réponse est « ${oui ? "oui" : "non"} ».`
        : `ce n'est pas une expérience aléatoire, donc la bonne réponse est « ${oui ? "oui" : "non"} ».`,
    ),
  };
}

function genVocabIssuePossible(): Genere {
  const src = randomInt(0, 2);
  const possible = Math.random() < 0.5;
  let desc: string;
  let R: string;
  let raison: string;
  let canvas: CanvasProbabilitesData | undefined;
  if (src === 0) {
    const u = tirerUniversNum();
    desc = u.desc;
    canvas = u.canvas;
    const k = possible ? randomInt(1, u.n) : randomChoice([0, u.n + randomInt(1, 6)]);
    R = String(k);
    raison = possible
      ? `les issues sont les entiers de 1 à ${u.n}, et ${k} en fait partie`
      : `les issues sont les entiers de 1 à ${u.n} : ${k} n'en fait pas partie`;
  } else if (src === 1) {
    const sac = tirerSac(randomInt(2, 3), (s) => s.groupes.length >= 4);
    desc = sac.desc;
    canvas = sac.canvas;
    const sc = sac.scene;
    const g = possible
      ? randomChoice(sac.compo).g
      : randomChoice(sc.groupes.filter((x) => !sac.compo.some((c) => c.g === x)));
    R = `${g.art} ${g.s}`;
    raison = possible
      ? `il y a bien des ${g.p} parmi les ${sc.objP}`
      : `il n'y a aucun${g.art === "une" ? "e" : ""} ${g.s} parmi les ${sc.objP}`;
  } else {
    const m = tirerMot();
    desc = m.desc;
    const L = possible ? randomChoice(m.lettres) : randomChoice(ABSENTES.filter((x) => !m.lettres.includes(x)));
    R = `la lettre ${L}`;
    raison = possible ? `le mot ${m.w} contient la lettre ${L}` : `le mot ${m.w} ne contient pas la lettre ${L}`;
  }
  const text = randomChoice([
    `${desc} Le résultat « ${R} » fait-il partie des issues possibles ?`,
    `${desc} « ${cap(R)} » : est-ce une issue possible de cette expérience ?`,
    `${desc} Peut-on obtenir « ${R} » ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: ["oui", "non"],
    expected: [possible ? "oui" : "non"],
    comparator: "mcq_exact",
    explanation: expl(
      "une issue est un résultat possible d'une expérience aléatoire.",
      "on liste les résultats que l'expérience peut donner, puis on regarde si celui-ci en fait partie.",
      `${cap(raison)}.`,
      possible ? `« ${R} » est une issue possible : oui.` : `« ${R} » ne peut pas se produire : non.`,
    ),
    canvas,
  };
}

function genVocabNature(): Genere {
  const sorte = randomChoice(["une expérience aléatoire", "une issue", "un événement"] as const);
  let desc: string;
  let X: string;
  let pourquoi: string;
  let canvas: CanvasProbabilitesData | undefined;
  if (Math.random() < 0.7) {
    const u = tirerUniversNum();
    desc = u.desc;
    canvas = u.canvas;
    if (sorte === "une expérience aléatoire") {
      X = u.action;
      pourquoi = "c'est l'action elle-même, dont on ne connaît pas le résultat à l'avance";
    } else if (sorte === "une issue") {
      const k = randomInt(1, u.n);
      X = u.seul(k);
      pourquoi = `c'est UN seul résultat possible : le ${k}`;
    } else {
      const p = randomChoice(predicats(u.n).filter((q) => issues(u.n, q.test).length >= 2));
      X = u.evt(p.txt);
      pourquoi = `il regroupe plusieurs issues : ${listeOuCompte(issues(u.n, p.test))}`;
    }
  } else {
    const m = tirerMot(sorte === "une issue");
    desc = m.desc;
    if (sorte === "une expérience aléatoire") {
      X = m.action;
      pourquoi = "c'est l'action elle-même, dont on ne connaît pas le résultat à l'avance";
    } else if (sorte === "une issue") {
      const L = randomChoice(m.lettres);
      X = `tirer la lettre ${L}`;
      pourquoi = `c'est UN seul résultat possible : la lettre ${L}, qui n'apparaît qu'une fois dans ${m.w}`;
    } else {
      const voy = nbVoy(m) >= 2 && Math.random() < 0.5;
      X = voy ? "tirer une voyelle" : "tirer une consonne";
      const ls = m.lettres.filter((L) => VOYELLES.includes(L) === voy);
      pourquoi = `il regroupe plusieurs issues : ${ls.join(", ")}`;
    }
  }
  const text = randomChoice([
    `${desc} Comment appelle-t-on « ${X} » ?`,
    `${desc} Dans cette situation, « ${X} » est…`,
    `${desc} Quel mot convient pour « ${X} » ?`,
    `${desc} Complète : « ${X} », c'est …`,
  ]);
  return {
    text,
    format: "qcm",
    choices: makeChoices(
      sorte,
      ["une expérience aléatoire", "une issue", "un événement", "une fréquence", "un effectif", "une moyenne"].filter((x) => x !== sorte),
    ),
    expected: [sorte],
    comparator: "mcq_exact",
    explanation: expl(
      "l'expérience aléatoire est l'action ; une issue est UN résultat possible ; un événement est un ensemble d'issues.",
      "on se demande si la phrase décrit l'action, un seul résultat ou un groupe de résultats.",
      `« ${X} » : ${pourquoi}.`,
      `c'est ${sorte}.`,
    ),
    canvas,
  };
}

function genVocabProba01(): Genere {
  const ev = tirerEvenementNature(["certain", "impossible", "possible"]);
  const rep =
    ev.nature === "certain" ? "1" : ev.nature === "impossible" ? "0" : "un nombre strictement compris entre 0 et 1";
  const text = randomChoice([
    `${ev.desc} Quelle est la probabilité de l'événement « ${ev.E} » ?`,
    `${ev.desc} Que vaut la probabilité ${deNu(ev.E)} ?`,
    `${ev.desc} Parmi ces réponses, laquelle donne la probabilité ${deNu(ev.E)} ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: shuffle(["0", "1", "un nombre strictement compris entre 0 et 1", "un nombre supérieur à 1"]),
    expected: [rep],
    comparator: "mcq_exact",
    explanation: expl(
      "un événement certain a une probabilité égale à 1, un événement impossible une probabilité égale à 0 ; tous les autres ont une probabilité strictement comprise entre 0 et 1. Une probabilité ne dépasse jamais 1.",
      "on regarde si toutes les issues, aucune, ou seulement certaines réalisent l'événement.",
      `« ${ev.E} » : ${ev.raison}.`,
      `l'événement est ${ev.nature === "possible" ? "possible sans être certain" : ev.nature}, donc sa probabilité est ${rep}.`,
    ),
    canvas: ev.canvas,
  };
}

/* ===========================================================================
   GÉNÉRATEURS — ISSUES
=========================================================================== */
function genIssueTotalSac(): Genere {
  const sac = tirerSac(randomInt(2, 3));
  const sc = sac.scene;
  const text = `${sac.desc} ${randomChoice([
    `Si l'on compte chaque ${sc.objS} comme une issue, combien cette expérience a-t-elle d'issues possibles ?`,
    `Combien y a-t-il ${deNu(sc.objP)} en tout ?`,
    `Combien y a-t-il d'issues possibles, chaque ${sc.objS} étant une issue ?`,
    `Quel est le nombre total d'issues, en comptant chaque ${sc.objS} séparément ?`,
  ])}`;
  return {
    text,
    format: "short",
    expected: [String(sac.total)],
    comparator: "number_equal",
    explanation: expl(
      `chaque ${sc.objS} peut sortir : chacun compte pour une issue.`,
      `on additionne les effectifs de toutes les catégories.`,
      `${sac.compo.map((c) => c.n).join(" + ")} = ${sac.total}.`,
      `il y a ${sac.total} issues possibles.`,
    ),
    canvas: sac.canvas,
  };
}

function genIssueNombre(): Genere {
  let desc: string;
  let n: number;
  let detail: string;
  let canvas: CanvasProbabilitesData | undefined;
  if (Math.random() < 0.75) {
    const u = tirerUniversNum();
    desc = u.desc;
    n = u.n;
    canvas = u.canvas;
    detail = `les issues sont les entiers de 1 à ${n}`;
  } else {
    const m = tirerMot(true);
    desc = m.desc;
    n = m.lettres.length;
    detail = `les issues sont les lettres ${m.lettres.join(", ")}, toutes différentes`;
  }
  const text = `${desc} ${randomChoice([
    "Combien y a-t-il d'issues possibles ?",
    "Combien cette expérience a-t-elle d'issues ?",
    "Combien de résultats différents peut-on obtenir ?",
    "Quel est le nombre d'issues possibles ?",
  ])}`;
  return {
    text,
    format: "short",
    expected: [String(n)],
    comparator: "number_equal",
    explanation: expl(
      "une issue est un résultat possible de l'expérience.",
      "on liste tous les résultats possibles, puis on les compte.",
      `${cap(detail)}.`,
      `il y a ${n} issues possibles.`,
    ),
    canvas,
  };
}

function genIssueFavorables(): Genere {
  let desc: string;
  let E: string;
  let fav: (number | string)[];
  let canvas: CanvasProbabilitesData | undefined;
  let precision = "";
  if (Math.random() < 0.75) {
    const u = tirerUniversNum();
    const p = randomChoice(predicats(u.n));
    desc = u.desc;
    E = u.evt(p.txt);
    fav = issues(u.n, p.test);
    canvas = u.canvas;
  } else {
    const m = tirerMot();
    desc = m.desc;
    const c = randomInt(0, 2);
    const L = randomChoice(m.lettres);
    E = c === 0 ? "tirer une voyelle" : c === 1 ? "tirer une consonne" : `tirer la lettre ${L}`;
    fav = m.lettres.filter((x) => (c === 0 ? VOYELLES.includes(x) : c === 1 ? !VOYELLES.includes(x) : x === L));
    precision = ` (chaque ${m.unite} compte pour une issue)`;
  }
  const text = `${desc} ${randomChoice([
    `Combien d'issues réalisent l'événement « ${E} »${precision} ?`,
    `Combien y a-t-il d'issues favorables à l'événement « ${E} »${precision} ?`,
    `L'événement « ${E} » est réalisé par combien d'issues${precision} ?`,
    `Combien de cas favorables compte l'événement « ${E} »${precision} ?`,
  ])}`;
  return {
    text,
    format: "short",
    expected: [String(fav.length)],
    comparator: "number_equal",
    explanation: expl(
      "les issues favorables à un événement sont celles qui le réalisent.",
      "on passe en revue toutes les issues et on garde celles qui conviennent.",
      `Issues favorables : ${listeOuCompte(fav)}.`,
      `l'événement « ${E} » est réalisé par ${fav.length} issue${fav.length > 1 ? "s" : ""}.`,
    ),
    canvas,
  };
}

function genIssueListe(): Genere {
  const src = randomInt(0, 2);
  let desc: string;
  let correct: string;
  let wrongs: string[];
  let canvas: CanvasProbabilitesData | undefined;
  const seq = (lo: number, hi: number) => Array.from({ length: hi - lo + 1 }, (_, i) => String(lo + i)).join(", ");
  if (src === 0) {
    const u = tirerUniversNum((n) => n <= 8);
    desc = u.desc;
    canvas = u.canvas;
    correct = seq(1, u.n);
    wrongs = [seq(0, u.n - 1), seq(1, u.n - 1), seq(1, u.n + 1), seq(2, u.n), issues(u.n, (k) => k % 2 === 0).join(", "), seq(0, u.n)];
  } else if (src === 1) {
    const m = tirerMot(true);
    desc = m.desc;
    const L = m.lettres;
    const absente = randomChoice(ABSENTES.filter((x) => !L.includes(x)));
    correct = L.join(", ");
    wrongs = [
      L.slice(0, -1).join(", "),
      L.slice(1).join(", "),
      [...L, absente].join(", "),
      L.filter((x) => VOYELLES.includes(x)).join(", "),
      L.filter((x) => !VOYELLES.includes(x)).join(", "),
    ];
  } else {
    const k = randomInt(3, 5);
    const cs = shuffle(COULEURS).slice(0, k);
    const abs = COULEURS.find((c) => !cs.includes(c))!;
    desc = `Une roue est partagée en ${k} secteurs égaux, de couleurs ${joinEt(cs.map((c) => c.ms))}. On la fait tourner et on note la couleur obtenue.`;
    canvas = roueCanvas(cs.map((c) => ({ label: c.ms, poids: 1, couleur: c.hex })));
    const noms = cs.map((c) => c.ms);
    correct = noms.join(", ");
    wrongs = [
      noms.slice(0, -1).join(", "),
      noms.slice(1).join(", "),
      [...noms, abs.ms].join(", "),
      [abs.ms, ...noms.slice(1)].join(", "),
    ];
  }
  const text = `${desc} ${randomChoice([
    "Quelles sont les issues possibles ?",
    "Quelle liste donne toutes les issues de cette expérience ?",
    "Parmi ces listes, laquelle contient exactement les issues possibles ?",
  ])}`;
  return {
    text,
    format: "qcm",
    choices: makeChoices(correct, wrongs.filter((w) => w && w !== correct)),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: expl(
      "les issues sont TOUS les résultats possibles de l'expérience, sans en oublier et sans en ajouter.",
      "on passe en revue ce que l'expérience peut donner.",
      `Les issues sont : ${correct}.`,
      "⚠️ une liste qui en oublie une, ou qui ajoute un résultat impossible, est fausse.",
    ),
    canvas,
  };
}

/* ===========================================================================
   GÉNÉRATEURS — ÉVÉNEMENTS
=========================================================================== */
function genEvtCertImp(): Genere {
  const ev = tirerEvenementNature(["certain", "impossible"]);
  const text = randomChoice([
    `${ev.desc} L'événement « ${ev.E} » est-il certain ou impossible ?`,
    `${ev.desc} « ${cap(ev.E)} » : cet événement est-il certain ou impossible ?`,
    `${ev.desc} Cet événement est-il certain ou impossible : « ${ev.E} » ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: ["certain", "impossible"],
    expected: [ev.nature],
    comparator: "mcq_exact",
    explanation: expl(
      "un événement certain se réalise à coup sûr ; un événement impossible ne se réalise jamais.",
      "on cherche les issues qui réalisent l'événement : toutes, ou aucune ?",
      `« ${ev.E} » : ${ev.raison}.`,
      `l'événement est ${ev.nature}.`,
    ),
    canvas: ev.canvas,
  };
}

function genEvtRealise(): Genere {
  const src = randomInt(0, 2);
  let desc: string;
  let E: string;
  let res: string;
  let ok: boolean;
  let raison: string;
  let canvas: CanvasProbabilitesData | undefined;
  let text: string;
  if (src === 0) {
    const u = tirerUniversNum();
    const p = randomChoice(predicats(u.n));
    const k = randomInt(1, u.n);
    desc = u.desc;
    canvas = u.canvas;
    E = u.evt(p.txt);
    ok = p.test(k);
    res = String(k);
    raison = `${k} ${ok ? "fait partie" : "ne fait pas partie"} des issues qui réalisent l'événement (${listeOuCompte(issues(u.n, p.test))})`;
    text = randomChoice([
      `${desc} Le résultat est ${k}. L'événement « ${E} » est-il réalisé ?`,
      `${desc} On obtient ${k}. Cette issue réalise-t-elle l'événement « ${E} » ?`,
      `${desc} L'issue ${k} réalise-t-elle l'événement « ${E} » ?`,
    ]);
  } else if (src === 1) {
    const m = tirerMot();
    const L = randomChoice(m.lettres);
    const c = randomInt(0, 2);
    const M = randomChoice(m.lettres);
    desc = m.desc;
    E = c === 0 ? "tirer une voyelle" : c === 1 ? "tirer une consonne" : `tirer la lettre ${M}`;
    ok = c === 0 ? VOYELLES.includes(L) : c === 1 ? !VOYELLES.includes(L) : L === M;
    res = `la lettre ${L}`;
    raison = `${L} ${c < 2 ? `est une ${VOYELLES.includes(L) ? "voyelle" : "consonne"}` : L === M ? `est bien la lettre ${M}` : `n'est pas la lettre ${M}`}`;
    text = randomChoice([
      `${desc} On tire la lettre ${L}. L'événement « ${E} » est-il réalisé ?`,
      `${desc} Le résultat est la lettre ${L}. Réalise-t-il l'événement « ${E} » ?`,
      `${desc} L'issue « ${L} » réalise-t-elle l'événement « ${E} » ?`,
    ]);
  } else {
    const sac = tirerSac(3);
    const sc = sac.scene;
    const [g0, g1, g2] = sac.compo.map((c) => c.g);
    const tire = randomChoice([g0, g1, g2]);
    const c = randomInt(0, 2);
    desc = sac.desc;
    canvas = sac.canvas;
    E = c === 0 ? evtG(sc, g0) : c === 1 ? evtOu(sc, g0, g1) : evtNonG(sc, g2);
    ok = c === 0 ? tire === g0 : c === 1 ? tire === g0 || tire === g1 : tire !== g2;
    res = `${tire.art} ${tire.s}`;
    raison = `le résultat est ${res}, ce qui ${ok ? "correspond" : "ne correspond pas"} à « ${E} »`;
    text = randomChoice([
      `${desc} Résultat du tirage : ${res}. L'événement « ${E} » est-il réalisé ?`,
      `${desc} Le tirage donne ${res}. Cette issue réalise-t-elle l'événement « ${E} » ?`,
      `${desc} On obtient ${res}. L'événement « ${E} » est-il réalisé ?`,
    ]);
  }
  return {
    text,
    format: "qcm",
    choices: ["oui", "non"],
    expected: [ok ? "oui" : "non"],
    comparator: "mcq_exact",
    explanation: expl(
      "un événement est réalisé quand l'issue obtenue fait partie des issues qui le composent.",
      "on regarde si le résultat obtenu vérifie la condition de l'événement.",
      `${cap(raison)}.`,
      ok ? "oui, l'événement est réalisé." : "non, l'événement n'est pas réalisé.",
    ),
    canvas,
  };
}

function genEvtContraireQcm(): Genere {
  const c = tirerContraire();
  const bons = c.cands.filter((x) => x.key === c.target && x.ph !== c.E);
  const bon = randomChoice(bons);
  const mauvais = c.cands.filter((x) => x.key !== c.target).map((x) => x.ph);
  const text = `${c.desc} ${randomChoice([
    `Quel est l'événement contraire de « ${c.E} » ?`,
    `Quel événement est le contraire de « ${c.E} » ?`,
    `Parmi ces événements, lequel est le contraire de « ${c.E} » ?`,
    `On note A l'événement « ${c.E} ». Quel est l'événement contraire de A ?`,
  ])}`;
  return {
    text,
    format: "qcm",
    choices: makeChoices(bon.ph, mauvais),
    expected: [bon.ph],
    comparator: "mcq_exact",
    explanation: expl(
      "l'événement contraire regroupe TOUTES les issues qui ne réalisent pas l'événement — ni plus, ni moins.",
      "on liste les issues de l'événement, puis on prend toutes celles qui restent.",
      `${cap(c.detail)}.`,
      `le contraire est « ${bon.ph} ». ⚠️ Un contraire n'est pas « une autre issue » : c'est TOUT le reste.`,
    ),
    canvas: c.canvas,
  };
}

function genEvtNature3(): Genere {
  const ev = tirerEvenementNature(["certain", "impossible", "possible"]);
  const rep = ev.nature === "possible" ? "possible, sans être certain" : ev.nature;
  const text = randomChoice([
    `${ev.desc} L'événement « ${ev.E} » est…`,
    `${ev.desc} Comment qualifie-t-on l'événement « ${ev.E} » ?`,
    `${ev.desc} Que peut-on dire de l'événement « ${ev.E} » ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: shuffle(["certain", "impossible", "possible, sans être certain"]),
    expected: [rep],
    comparator: "mcq_exact",
    explanation: expl(
      "un événement CERTAIN se réalise à tous les coups (probabilité 1), un événement IMPOSSIBLE ne se réalise jamais (probabilité 0). Entre les deux, tous les autres.",
      "on cherche les issues qui réalisent l'événement. Toutes ? certain. Aucune ? impossible. Quelques-unes ? possible sans être certain.",
      `« ${ev.E} » : ${ev.raison}.`,
      `l'événement est ${rep}. ⭐ La plupart des événements sont dans ce troisième cas — c'est justement pour eux qu'on calcule une probabilité.`,
    ),
    canvas: ev.canvas,
  };
}

function genEvtContraireListe(): Genere {
  const u = tirerUniversNum((n) => n <= 12);
  const p = randomChoice(predicats(u.n));
  const fav = issues(u.n, p.test);
  const comp = issues(u.n, (k) => !p.test(k));
  const s = (xs: number[]) => xs.join(", ");
  const voisin = fav.find((k) => comp.includes(k - 1) || comp.includes(k + 1)) ?? fav[0];
  const wrongs = [
    s(fav),
    s(comp.slice(1)),
    s(comp.slice(0, -1)),
    s([...comp, voisin].sort((x, y) => x - y)),
    s(issues(u.n, () => true)),
  ];
  const E = u.evt(p.txt);
  const text = `${u.desc} ${randomChoice([
    `Quelles issues réalisent l'événement contraire de « ${E} » ?`,
    `Quelles sont les issues de l'événement contraire de « ${E} » ?`,
    `On note A l'événement « ${E} ». Quelles issues réalisent le contraire de A ?`,
  ])}`;
  return {
    text,
    format: "qcm",
    choices: makeChoices(s(comp), wrongs.filter((w) => w && w !== s(comp))),
    expected: [s(comp)],
    comparator: "mcq_exact",
    explanation: expl(
      "l'événement contraire est réalisé par toutes les issues qui ne réalisent pas l'événement.",
      `on écrit les issues de 1 à ${u.n}, on barre celles de l'événement, on garde le reste.`,
      `« ${E} » : ${s(fav)}. Il reste ${s(comp)}.`,
      `le contraire est réalisé par ${s(comp)}. ⚠️ Attention aux bornes : « strictement » change tout.`,
    ),
    canvas: u.canvas,
  };
}

function genEvtContraireCompte(): Genere {
  const c = tirerContraire();
  const precision = c.unite ? ` (chaque ${c.unite} compte pour une issue)` : "";
  const text = `${c.desc} ${randomChoice([
    `Combien d'issues réalisent l'événement contraire de « ${c.E} »${precision} ?`,
    `L'événement contraire de « ${c.E} » est réalisé par combien d'issues${precision} ?`,
    `Combien de cas favorables compte le contraire de « ${c.E} »${precision} ?`,
  ])}`;
  return {
    text,
    format: "short",
    expected: [String(c.nbCtr)],
    comparator: "number_equal",
    explanation: expl(
      "l'événement contraire regroupe toutes les issues qui ne réalisent pas l'événement.",
      `on compte les issues de l'événement, puis on les retire des ${c.nbTot} issues possibles.`,
      `${cap(c.detail)} : ${c.nbTot} − ${c.nbTot - c.nbCtr} = ${c.nbCtr}.`,
      `le contraire est réalisé par ${c.nbCtr} issue${c.nbCtr > 1 ? "s" : ""}.`,
    ),
    canvas: c.canvas,
  };
}

/* ===========================================================================
   GÉNÉRATEURS — ÉQUIPROBABILITÉ
=========================================================================== */
type SitEqui = { ctx: string; oui: boolean; raison: string; canvas?: CanvasProbabilitesData };
const SITUATIONS_EQUI: Array<() => SitEqui> = [
  () => {
    const n = randomChoice([4, 6, 8, 12, 20]);
    return { ctx: `On lance un dé équilibré à ${n} faces et on note le nombre obtenu.`, oui: true, raison: "un dé équilibré ne favorise aucune face" };
  },
  () => {
    const f = randomInt(1, 6);
    return { ctx: `On lance un dé à 6 faces truqué, qui tombe sur ${f} une fois sur deux, et on note le nombre obtenu.`, oui: false, raison: `la face ${f} est favorisée` };
  },
  () => {
    const n = randomChoice([10, 20, 32, 52]);
    return { ctx: `On tire une carte au hasard parmi ${n} cartes identiques au dos, bien mélangées.`, oui: true, raison: "les cartes sont identiques et mélangées : aucune n'est favorisée" };
  },
  () => ({ ctx: "On lance une pièce de monnaie bien équilibrée et on note pile ou face.", oui: true, raison: "une pièce équilibrée ne favorise aucun côté" }),
  () => ({ ctx: "On lance une pièce lestée pour tomber plus souvent sur face.", oui: false, raison: "le côté face est favorisé" }),
  () => ({ ctx: "On lance une punaise, qui peut retomber sur la pointe ou sur le dos.", oui: false, raison: "la punaise n'est pas symétrique : rien ne garantit que les deux positions ont la même chance" }),
  () => {
    const n = randomInt(3, 8);
    return { ctx: `Une roue est partagée en ${n} secteurs égaux, de couleurs toutes différentes. On note la couleur désignée par la flèche.`, oui: true, raison: "les secteurs ont tous la même taille" };
  },
  () => {
    const n = randomInt(3, 6);
    return { ctx: `Une roue est partagée en ${n} secteurs : l'un d'eux occupe à lui seul la moitié de la roue, les autres se partagent le reste. On note le secteur désigné.`, oui: false, raison: "le grand secteur a plus de chances d'être désigné que les petits" };
  },
  () => {
    const egal = Math.random() < 0.5;
    const a0 = randomInt(2, 8);
    const sac = tirerSac(2, undefined, [a0, egal ? a0 : a0 + randomInt(1, 4)]);
    const [c0, c1] = sac.compo;
    return {
      ctx: `${sac.desc} On s'intéresse aux issues « ${evtG(sac.scene, c0.g)} » et « ${evtG(sac.scene, c1.g)} ».`,
      oui: egal,
      raison: egal ? `il y a autant de ${c0.g.p} que de ${c1.g.p} (${c0.n} de chaque)` : `il y a ${c0.n} ${c0.g.p} et ${c1.n} ${c1.g.p} : les effectifs sont différents`,
      canvas: sac.canvas,
    };
  },
  () => ({ ctx: "On lance un dé équilibré à 6 faces et on note seulement si l'on obtient « 6 » ou « pas 6 ».", oui: false, raison: "« 6 » correspond à une face, « pas 6 » à cinq faces" }),
  () => ({ ctx: "Un footballeur tire un penalty : il peut marquer ou rater.", oui: false, raison: "rien n'indique que marquer et rater ont la même chance ; un bon tireur marque bien plus souvent" }),
  () => ({ ctx: "Demain, il peut pleuvoir ou ne pas pleuvoir.", oui: false, raison: "rien ne permet de dire que ces deux issues ont la même chance : cela dépend de la saison et du climat" }),
  () => {
    const m = tirerMot();
    const ls = Array.from(new Set(m.lettres));
    const [A, B] = shuffle(ls);
    const egal = nbLettre(m, A) === nbLettre(m, B);
    return {
      ctx: `${m.desc} On s'intéresse aux issues « tirer la lettre ${A} » et « tirer la lettre ${B} ».`,
      oui: egal,
      raison: `la lettre ${A} est sur ${nbLettre(m, A)} carte(s), la lettre ${B} sur ${nbLettre(m, B)}`,
    };
  },
  () => {
    const u = tirerUniversNum();
    const [x, y] = shuffle(Array.from({ length: u.n }, (_, i) => i + 1)).slice(0, 2);
    return { ctx: `${u.desc} On s'intéresse aux issues « ${u.seul(x)} » et « ${u.seul(y)} ».`, oui: true, raison: "chacune correspond à un seul objet, et tous ont la même chance" };
  },
  () => ({ ctx: "Pour savoir qui commence une partie, on tire à pile ou face avec une pièce bien équilibrée.", oui: true, raison: "une pièce équilibrée donne la même chance aux deux joueurs" }),
  () => {
    const n = randomChoice([18, 24, 37]);
    return { ctx: `Une roulette de jeu compte ${n} cases identiques ; une bille s'arrête au hasard dans l'une d'elles.`, oui: true, raison: "les cases sont identiques" };
  },
  () => {
    const p = randomInt(2, 5);
    const g = randomInt(20, 28);
    return { ctx: `Dans une classe de ${g} élèves, on choisit au hasard un élève et on note s'il porte des lunettes ou non ; ${p} élèves en portent.`, oui: false, raison: `${p} élèves portent des lunettes, ${g - p} n'en portent pas` };
  },
  () => {
    const n = randomChoice([6, 8, 10]);
    return { ctx: `On tire un jeton dans une boîte de ${n} jetons de même taille, dont un seul est deux fois plus lourd et tombe toujours au fond.`, oui: false, raison: "le jeton lourd est plus difficile à attraper : les jetons ne sont plus identiques" };
  },
];

function genEquiSituation(): Genere {
  const s = randomChoice(SITUATIONS_EQUI)();
  const text = `${s.ctx} ${randomChoice([
    "Les issues sont-elles équiprobables ?",
    "Est-ce une situation d'équiprobabilité ?",
    "Ces issues ont-elles toutes la même probabilité ?",
    "Peut-on dire que chaque issue a la même chance de se produire ?",
  ])}`;
  return {
    text,
    format: "qcm",
    choices: ["oui", "non"],
    expected: [s.oui ? "oui" : "non"],
    comparator: "mcq_exact",
    explanation: expl(
      "il y a équiprobabilité quand toutes les issues ont exactement la même chance de se produire.",
      "on cherche si une issue est favorisée (objet truqué, secteur plus grand, effectif plus nombreux…).",
      `Ici, ${s.raison}.`,
      s.oui ? "oui, la situation est équiprobable." : "non, la situation n'est pas équiprobable.",
    ),
    canvas: s.canvas,
  };
}

const LIEUX_ROUE = [
  "d'une kermesse d'école",
  "d'une fête foraine",
  "d'un jeu télévisé",
  "d'une tombola de collège",
  "de la fête du village",
  "d'un jeu de société",
  "d'un jeu vidéo",
  "d'une émission de radio",
  "d'un marché de Noël",
  "d'une fête de quartier",
];

function genEquiRoue(): Genere {
  const lieu = randomChoice(LIEUX_ROUE);
  const v = randomInt(0, 2);
  let ctx: string;
  let oui: boolean;
  let raison: string;
  let canvas: CanvasProbabilitesData;
  let noms: string[];
  if (v < 2) {
    const k = randomInt(2, 3);
    const cs = shuffle(COULEURS.filter((c) => c.ms !== "blanc")).slice(0, k);
    oui = Math.random() < 0.45;
    const r = randomInt(1, 4);
    let nb = cs.map(() => (oui ? r : randomInt(1, 4)));
    if (!oui && nb.every((x) => x === nb[0])) nb = nb.map((x, i) => (i === 0 ? x + 1 : x));
    const N = nb.reduce((s, x) => s + x, 0);
    noms = cs.map((c) => c.ms);
    const liste = joinEt(cs.map((c, i) => (nb[i] === 1 ? `1 secteur ${c.ms}` : `${nb[i]} secteurs ${c.mp}`)));
    ctx = `La roue ${lieu} est partagée en ${N} secteurs égaux : ${liste}. On la fait tourner et on note la couleur obtenue.`;
    raison = oui ? `chaque couleur occupe ${r} secteur${r > 1 ? "s" : ""} sur ${N}` : `les couleurs n'occupent pas le même nombre de secteurs (${nb.join(", ")})`;
    canvas = roueCanvas(cs.flatMap((c, i) => Array.from({ length: nb[i] }, () => ({ label: c.ms, poids: 1, couleur: c.hex }))));
  } else {
    const cs = shuffle(COULEURS.filter((c) => c.ms !== "blanc")).slice(0, 3);
    noms = cs.map((c) => c.ms);
    oui = Math.random() < 0.4;
    ctx = oui
      ? `La roue ${lieu} est partagée en 3 secteurs de même taille : un ${cs[0].ms}, un ${cs[1].ms} et un ${cs[2].ms}. On note la couleur obtenue.`
      : `La roue ${lieu} est partagée en 3 secteurs : ${leCoul(cs[0])} occupe la moitié de la roue, ${leCoul(cs[1])} et ${leCoul(cs[2])} un quart chacun. On note la couleur obtenue.`;
    raison = oui ? "les trois secteurs ont la même taille" : `le secteur ${cs[0].ms} est deux fois plus grand que chacun des deux autres`;
    canvas = roueCanvas(cs.map((c, i) => ({ label: c.ms, poids: oui ? 1 : i === 0 ? 2 : 1, couleur: c.hex })));
  }
  const text = `${ctx} ${randomChoice([
    `Les couleurs ${joinEt(noms)} ont-elles la même probabilité ?`,
    "Est-ce une situation d'équiprobabilité pour les couleurs ?",
    "Chaque couleur a-t-elle la même chance de sortir ?",
  ])}`;
  return {
    text,
    format: "qcm",
    choices: ["oui", "non"],
    expected: [oui ? "oui" : "non"],
    comparator: "mcq_exact",
    explanation: expl(
      "il y a équiprobabilité quand toutes les issues ont exactement la MÊME chance de se produire.",
      "sur une roue, on ne compte pas les couleurs : on compare la PLACE que chacune occupe.",
      `Ici, ${raison}.`,
      oui
        ? "la situation est équiprobable : chaque couleur a la même probabilité."
        : "⚠️ la situation n'est PAS équiprobable. Compter les couleurs ne suffit jamais : c'est la place occupée qui décide.",
    ),
    canvas,
  };
}

function genEquiSac(): Genere {
  const egal = Math.random() < 0.4;
  const a0 = randomInt(2, 7);
  const b0 = egal ? a0 : a0 + randomInt(1, 4);
  const sac = tirerSac(2, undefined, Math.random() < 0.5 ? [a0, b0] : [b0, a0]);
  const sc = sac.scene;
  const [c0, c1] = sac.compo;
  const completer = !egal && Math.random() < 0.5;
  if (completer) {
    const petit = c0.n < c1.n ? c0 : c1;
    const grand = c0.n < c1.n ? c1 : c0;
    const d = grand.n - petit.n;
    const text = `${sac.desc} ${randomChoice([
      `Combien ${deNu(petit.g.p)} faudrait-il ajouter pour que « ${evtG(sc, petit.g)} » et « ${evtG(sc, grand.g)} » deviennent équiprobables ?`,
      `On veut avoir autant de chances ${deNu(evtG(sc, petit.g))} ${queDe(evtG(sc, grand.g))}. Combien ${deNu(petit.g.p)} faut-il ajouter ?`,
    ])}`;
    return {
      text,
      format: "short",
      expected: [String(d)],
      comparator: "number_equal",
      explanation: expl(
        "il y a équiprobabilité quand chaque catégorie offre le même nombre de cas favorables.",
        "on compte les deux catégories, puis on cherche l'écart.",
        `Il y a ${qte(petit.n, petit.g)} et ${qte(grand.n, grand.g)} : ${grand.n} − ${petit.n} = ${d}.`,
        `en ajoutant ${d} ${d > 1 ? petit.g.p : petit.g.s}, on obtient ${grand.n} de chaque. ⭐ Rendre une situation équiprobable, c'est égaliser les EFFECTIFS.`,
      ),
      canvas: sac.canvas,
    };
  }
  const text = `${sac.desc} ${randomChoice([
    `A-t-on autant de chances ${deNu(evtG(sc, c0.g))} ${queDe(evtG(sc, c1.g))} ?`,
    `Les issues « ${evtG(sc, c0.g)} » et « ${evtG(sc, c1.g)} » sont-elles équiprobables ?`,
    `« ${cap(evtG(sc, c0.g))} » et « ${evtG(sc, c1.g)} » ont-ils la même probabilité ?`,
  ])}`;
  return {
    text,
    format: "qcm",
    choices: ["oui", "non"],
    expected: [egal ? "oui" : "non"],
    comparator: "mcq_exact",
    explanation: expl(
      "l'équiprobabilité demande le même nombre de cas favorables pour chaque issue.",
      "on compte chaque catégorie, et on compare.",
      `${cap(qte(c0.n, c0.g))} et ${qte(c1.n, c1.g)}.`,
      egal
        ? "les effectifs sont égaux, les chances le sont donc aussi : oui."
        : `⚠️ non : les effectifs sont différents (${c0.n} et ${c1.n}). Une seule différence suffit à casser l'équiprobabilité.`,
    ),
    canvas: sac.canvas,
  };
}

function genEquiChaqueIssue(): Genere {
  const src = randomInt(0, 3);
  let desc: string;
  let n: number;
  let canvas: CanvasProbabilitesData | undefined;
  if (src <= 1) {
    const u = tirerUniversNum();
    desc = u.desc;
    n = u.n;
    canvas = u.canvas;
  } else if (src === 2) {
    const m = tirerMot(true);
    desc = m.desc;
    n = m.lettres.length;
  } else {
    n = randomInt(3, 6);
    const cs = shuffle(COULEURS).slice(0, n);
    desc = `Une roue ${randomChoice(LIEUX_ROUE)} est partagée en ${n} secteurs égaux, de couleurs ${joinEt(cs.map((c) => c.ms))}.`;
    canvas = roueCanvas(cs.map((c) => ({ label: c.ms, poids: 1, couleur: c.hex })));
  }
  const text = `${desc} ${randomChoice([
    "Toutes les issues sont équiprobables. Quelle est la probabilité de chacune d'elles ?",
    "Quelle est la probabilité de chaque issue ?",
    "Les issues étant équiprobables, quelle probabilité a chacune d'elles ?",
  ])} ${consigneFraction(false)}`;
  return {
    text,
    format: "short",
    expected: reponsesFraction(1, n, false),
    comparator: "fraction_decimal_equivalent",
    explanation: expl(
      "en situation d'équiprobabilité, chaque issue a la même probabilité, et toutes ensemble font 1.",
      "on partage 1 en autant de parts égales qu'il y a d'issues.",
      `Il y a ${n} issues : 1 ÷ ${n} = 1/${n}.`,
      `chaque issue a une probabilité de 1/${n}.`,
    ),
    canvas,
  };
}

/* ===========================================================================
   GÉNÉRATEURS — CALCULER UNE PROBABILITÉ
=========================================================================== */
function genCalcSacQcm(): Genere {
  const k = randomInt(2, 3);
  const sac = tirerSac(k);
  const sc = sac.scene;
  const c = randomChoice(sac.compo);
  const T = sac.total;
  const result = `${c.n}/${T}`;
  const E = evtG(sc, c.g);
  return {
    text: `${sac.desc} ${qProba(E)}`,
    format: "qcm",
    choices: makeChoices(result, [
      `${T - c.n}/${T}`,
      `${c.n}/${T - c.n}`,
      `${T}/${c.n}`,
      `1/${T}`,
      `1/${k}`,
      `${c.n}/${T + c.n}`,
      `${c.n + 1}/${T}`,
    ]),
    expected: [result],
    comparator: "mcq_exact",
    explanation: expl(
      "probabilité = nombre de cas favorables ÷ nombre de cas possibles (les issues étant équiprobables).",
      `chaque ${sc.objS} a la même chance : on compte les ${c.g.p}, puis tous les ${sc.objP}.`,
      `${c.n} cas favorables sur ${sac.compo.map((x) => x.n).join(" + ")} = ${T} cas possibles : ${result}.`,
      `la probabilité ${deNu(E)} est ${result}. ⚠️ Ce n'est pas 1/${k} : les ${k} catégories n'ont pas le même effectif.`,
    ),
    canvas: sac.canvas,
  };
}

function genCalcSimpleCourt(): Genere {
  let desc: string;
  let E: string;
  let f: number;
  let n: number;
  let detail: string;
  let canvas: CanvasProbabilitesData | undefined;
  if (Math.random() < 0.7) {
    const u = tirerUniversNum();
    const preds = predicats(u.n).filter((p) => /pair|impair|strictement supérieur|multiple/.test(p.txt));
    desc = u.desc;
    n = u.n;
    canvas = u.canvas;
    if (Math.random() < 0.3) {
      const k = randomInt(1, u.n);
      E = u.seul(k);
      f = 1;
      detail = `une seule issue convient (${k})`;
    } else {
      const p = randomChoice(preds);
      E = u.evt(p.txt);
      const fav = issues(u.n, p.test);
      f = fav.length;
      detail = `les issues favorables sont ${listeOuCompte(fav)}`;
    }
  } else {
    const m = tirerMot();
    desc = m.desc;
    n = m.lettres.length;
    if (Math.random() < 0.5) {
      const L = randomChoice(m.lettres);
      E = `tirer la lettre ${L}`;
      f = nbLettre(m, L);
      detail = `la lettre ${L} apparaît ${f} fois dans ${m.w}, qui a ${n} lettres`;
    } else {
      E = "tirer une voyelle";
      f = nbVoy(m);
      detail = `${m.w} contient ${f} voyelle${f > 1 ? "s" : ""} sur ${n} lettres`;
    }
  }
  return {
    text: `${desc} ${qProba(E)} ${consigneFraction(false)}`,
    format: "short",
    expected: reponsesFraction(f, n, false),
    comparator: "fraction_decimal_equivalent",
    explanation: expl(
      "probabilité = nombre de cas favorables ÷ nombre de cas possibles, quand les issues sont équiprobables.",
      "on compte les issues favorables, puis toutes les issues.",
      `${cap(detail)} : ${f} cas favorable${f > 1 ? "s" : ""} sur ${n}.`,
      `la probabilité est ${f}/${n}${irr(f, n) !== `${f}/${n}` ? ` (ou ${irr(f, n)} en simplifiant)` : ""}.`,
    ),
    canvas,
  };
}

function genCalcRoueQcm(): Genere {
  const lieu = randomChoice(LIEUX_ROUE);
  const cs = shuffle(COULEURS.filter((c) => c.ms !== "blanc")).slice(0, 3);
  let nb = cs.map(() => randomInt(1, 5));
  if (nb.every((x) => x === nb[0])) nb = nb.map((x, i) => (i === 0 ? x + 1 : x));
  const N = nb.reduce((s, x) => s + x, 0);
  const i = randomInt(0, 2);
  const c = nb[i];
  const result = `${c}/${N}`;
  const liste = joinEt(cs.map((col, j) => (nb[j] === 1 ? `1 secteur ${col.ms}` : `${nb[j]} secteurs ${col.mp}`)));
  const E = `obtenir ${leCoul(cs[i])}`;
  return {
    text: `La roue ${lieu} est partagée en ${N} secteurs égaux : ${liste}. On la fait tourner. ${qProba(E)}`,
    format: "qcm",
    choices: makeChoices(result, [`1/3`, `${c}/${N - c}`, `${N - c}/${N}`, `1/${N}`, `${N}/${c}`, `${c}/3`, `${c + 1}/${N}`]),
    expected: [result],
    comparator: "mcq_exact",
    explanation: expl(
      "probabilité = nombre de cas favorables ÷ nombre de cas possibles ; ici, les secteurs égaux sont les issues équiprobables.",
      `on compte les secteurs ${cs[i].mp}, puis tous les secteurs.`,
      `${c} secteur${c > 1 ? "s" : ""} ${c > 1 ? cs[i].mp : cs[i].ms} sur ${nb.join(" + ")} = ${N} : ${result}.`,
      `la probabilité ${deNu(E)} est ${result}. ⚠️ Pas 1/3 : les trois couleurs n'occupent pas la même place.`,
    ),
    canvas: roueCanvas(cs.flatMap((col, j) => Array.from({ length: nb[j] }, () => ({ label: col.ms, poids: 1, couleur: col.hex })))),
  };
}

function genCalcNumCourt(): Genere {
  const u = tirerUniversNum();
  const p = randomChoice(predicats(u.n));
  const fav = issues(u.n, p.test);
  const f = fav.length;
  const irreductible = Math.random() < 0.4 && irr(f, u.n) !== `${f}/${u.n}`;
  const E = u.evt(p.txt);
  return {
    text: `${u.desc} ${qProba(E)} ${consigneFraction(irreductible)}`,
    format: "short",
    expected: reponsesFraction(f, u.n, irreductible),
    comparator: "fraction_decimal_equivalent",
    explanation: expl(
      "probabilité = nombre de cas favorables ÷ nombre de cas possibles (issues équiprobables).",
      `on liste les issues qui réalisent l'événement parmi les ${u.n} issues.`,
      `Issues favorables : ${listeOuCompte(fav)}, soit ${f} sur ${u.n} : ${f}/${u.n}${irr(f, u.n) !== `${f}/${u.n}` ? ` = ${irr(f, u.n)}` : ""}.`,
      `la probabilité ${deNu(E)} est ${irr(f, u.n)}${irreductible ? " (fraction irréductible demandée)" : ""}.`,
    ),
    canvas: u.canvas,
  };
}

function genCalcUnionQcm(): Genere {
  if (Math.random() < 0.7) {
    const sac = tirerSac(3);
    const sc = sac.scene;
    const [c0, c1, c2] = sac.compo;
    const T = sac.total;
    const ou = Math.random() < 0.5;
    const E = ou ? evtOu(sc, c0.g, c1.g) : evtNonG(sc, c2.g);
    const f = c0.n + c1.n;
    const result = `${f}/${T}`;
    return {
      text: `${sac.desc} ${qProba(E)}`,
      format: "qcm",
      choices: makeChoices(result, [`${c0.n}/${T}`, `${c1.n}/${T}`, `${c2.n}/${T}`, `2/3`, `${f}/${c2.n}`, `${T}/${f}`, `${f + 1}/${T}`]),
      expected: [result],
      comparator: "mcq_exact",
      explanation: expl(
        "probabilité = nombre de cas favorables ÷ nombre de cas possibles.",
        ou
          ? `les cas favorables sont les ${c0.g.p} ET les ${c1.g.p} : on les additionne.`
          : `ne pas obtenir de ${c2.g.s}, c'est obtenir ${c0.g.art} ${c0.g.s} ou ${c1.g.art} ${c1.g.s}.`,
        `${c0.n} + ${c1.n} = ${f} cas favorables sur ${T} : ${result}.`,
        `la probabilité ${deNu(E)} est ${result}.`,
      ),
      canvas: sac.canvas,
    };
  }
  const m = tirerMot();
  const n = m.lettres.length;
  const voy = Math.random() < 0.5;
  const f = voy ? nbVoy(m) : n - nbVoy(m);
  const E = voy ? "tirer une voyelle" : "tirer une consonne";
  const result = `${f}/${n}`;
  const lettresDistinctes = new Set(m.lettres).size;
  return {
    text: `${m.desc} ${qProba(E)}`,
    format: "qcm",
    choices: makeChoices(result, [`${n - f}/${n}`, `${f}/${n - f}`, `1/${n}`, `${f}/${lettresDistinctes}`, `${n}/${f}`, `${f + 1}/${n}`, `1/2`]),
    expected: [result],
    comparator: "mcq_exact",
    explanation: expl(
      `probabilité = nombre de cas favorables ÷ nombre de cas possibles ; chaque ${m.unite} est une issue.`,
      `on compte les ${voy ? "voyelles" : "consonnes"} de ${m.w}, en comptant chaque répétition.`,
      `${m.w} : ${f} ${voy ? "voyelle" : "consonne"}${f > 1 ? "s" : ""} sur ${n} lettres, soit ${result}.`,
      `la probabilité ${deNu(E)} est ${result}.`,
    ),
  };
}

/* ===========================================================================
   GÉNÉRATEURS — CONVERTIR
=========================================================================== */
type CtxProba = { e: string; c: string };
const CONTEXTES_PROBA: CtxProba[] = [
  { e: "de gagner à la pêche aux canards", c: "de perdre à ce jeu" },
  { e: "qu'un ticket de tombola soit gagnant", c: "qu'il soit perdant" },
  { e: "qu'un élève tiré au sort soit demi-pensionnaire", c: "qu'il soit externe" },
  { e: "qu'une graine du sachet donne une fleur rouge", c: "qu'elle donne une fleur d'une autre couleur" },
  { e: "que la flèche de la roue s'arrête sur le jaune", c: "qu'elle ne s'arrête pas sur le jaune" },
  { e: "de tirer une carte gagnante", c: "de tirer une carte perdante" },
  { e: "qu'un bonbon pris au hasard soit à la fraise", c: "qu'il ne soit pas à la fraise" },
  { e: "que la première chanson de la playlist soit du rap", c: "qu'elle ne soit pas du rap" },
  { e: "qu'un coureur tiré au sort porte un dossard pair", c: "qu'il porte un dossard impair" },
  { e: "qu'une ampoule prise au hasard dans un lot soit défectueuse", c: "qu'elle fonctionne" },
  { e: "qu'un œuf pris au hasard dans un carton soit fêlé", c: "qu'il soit intact" },
  { e: "que le vélo de location attribué soit électrique", c: "qu'il ne soit pas électrique" },
  { e: "qu'un poisson attrapé au hasard dans l'aquarium soit rouge", c: "qu'il ne soit pas rouge" },
  { e: "qu'un adhérent du club choisi au hasard fasse du judo", c: "qu'il ne fasse pas de judo" },
  { e: "qu'une mangue prise au hasard dans la cagette soit mûre", c: "qu'elle ne soit pas mûre" },
  { e: "de gagner un lot à la roue de la fortune", c: "de ne rien gagner" },
];

function tirerFractionDecimale(): { n: number; d: number } {
  const d = randomChoice([2, 4, 5, 8, 10, 20, 25, 50]);
  return { n: randomInt(1, d - 1), d };
}

function genConvDecimal(): Genere {
  const { n, d } = tirerFractionDecimale();
  const F = `${n}/${d}`;
  const ctx = randomChoice(CONTEXTES_PROBA);
  const dec = fr(n / d);
  const text = randomChoice([
    `La probabilité ${ctx.e} est ${F}. Écris cette probabilité sous forme décimale.`,
    `La probabilité ${ctx.e} vaut ${F}. Quelle est son écriture décimale ?`,
    `On sait que la probabilité ${ctx.e} est égale à ${F}. Donne-la sous la forme d'un nombre décimal.`,
    `Convertis en nombre décimal la probabilité ${ctx.e}, qui vaut ${F}.`,
    `La probabilité ${ctx.e} est de ${F}. Quel nombre décimal lui est égal ?`,
  ]);
  return {
    text,
    format: "short",
    expected: [dec],
    comparator: "number_equal",
    explanation: expl(
      "une fraction est un quotient : n/d = n ÷ d.",
      "on effectue la division du numérateur par le dénominateur.",
      `${n} ÷ ${d} = ${dec}.`,
      `${F} = ${dec}.`,
    ),
  };
}

function genConvPourcentQcm(): Genere {
  const { n, d } = tirerFractionDecimale();
  const F = `${n}/${d}`;
  const p = (100 * n) / d;
  const ctx = randomChoice(CONTEXTES_PROBA);
  const correct = `${fr(p)} %`;
  const text = randomChoice([
    `La probabilité ${ctx.e} est ${F}. À quel pourcentage cela correspond-il ?`,
    `La probabilité ${ctx.e} est ${F}. Exprime-la en pourcentage.`,
    `La probabilité ${ctx.e} vaut ${F}. Quel pourcentage de chances cela représente-t-il ?`,
    `Sachant que la probabilité ${ctx.e} est égale à ${F}, écris-la en pourcentage.`,
  ]);
  return {
    text,
    format: "qcm",
    choices: makeChoices(correct, [
      `${n} %`,
      `${d} %`,
      `${fr(n / d)} %`,
      `${fr(p / 10)} %`,
      `${fr(100 - p)} %`,
      `${n * 10} %`,
    ]),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: expl(
      "un pourcentage est une fraction de dénominateur 100.",
      "on écrit la fraction sous forme décimale, puis on multiplie par 100.",
      `${F} = ${fr(n / d)} et ${fr(n / d)} × 100 = ${fr(p)}.`,
      `${F} correspond à ${correct}.`,
    ),
  };
}

function genConvCalculPourcent(): Genere {
  let desc: string;
  let E: string;
  let f: number;
  let T: number;
  let canvas: CanvasProbabilitesData | undefined;
  if (Math.random() < 0.5) {
    const u = tirerUniversNum((n) => 100 % n === 0);
    const p = randomChoice(predicats(u.n));
    desc = u.desc;
    E = u.evt(p.txt);
    f = issues(u.n, p.test).length;
    T = u.n;
    canvas = u.canvas;
  } else {
    T = randomChoice([10, 20, 25]);
    const k = randomInt(2, 3);
    const sac = tirerSac(k, undefined, partition(T, k, 2));
    const c = randomChoice(sac.compo);
    desc = sac.desc;
    E = evtG(sac.scene, c.g);
    f = c.n;
    canvas = sac.canvas;
  }
  const p = (100 * f) / T;
  return {
    text: `${desc} ${qProba(E)} ${randomChoice(["Donne le résultat en pourcentage.", "Exprime-la en pourcentage.", "Réponds en pourcentage."])}`,
    format: "short",
    expected: [`${fr(p)} %`, fr(p), `${fr(p)}%`],
    comparator: "number_equal",
    explanation: expl(
      "probabilité = cas favorables ÷ cas possibles ; un pourcentage est cette probabilité multipliée par 100.",
      "on écrit la fraction, on la convertit en nombre décimal, puis en pourcentage.",
      `${f}/${T} = ${fr(f / T)}, et ${fr(f / T)} × 100 = ${fr(p)}.`,
      `la probabilité ${deNu(E)} est de ${fr(p)} %.`,
    ),
    canvas,
  };
}

const POURCENTS = [2, 4, 5, 8, 10, 12, 15, 20, 24, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95];

function genConvVersFraction(): Genere {
  const p = randomChoice(POURCENTS);
  const ctx = randomChoice(CONTEXTES_PROBA);
  const X = Math.random() < 0.6 ? `${p} %` : fr(p / 100);
  const correct = irr(p, 100);
  const [cn, cd] = correct.split("/");
  const text = randomChoice([
    `La probabilité ${ctx.e} est de ${X}. Quelle fraction irréductible correspond à cette probabilité ?`,
    `La probabilité ${ctx.e} est ${X}. Écris-la sous forme de fraction irréductible.`,
    `Une étude annonce que la probabilité ${ctx.e} est de ${X}. Quelle est cette probabilité sous forme de fraction irréductible ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: makeChoices(correct, [`1/${p}`, `${p}/10`, `${p}/1000`, `${cd}/${cn}`, irr(100 - p, 100), `1/${Math.round(100 / p)}`]),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: expl(
      `un pourcentage est une fraction de dénominateur 100 : ${p} % = ${p}/100.`,
      "on écrit la probabilité sur 100, puis on simplifie au maximum.",
      `${X} = ${p}/100 = ${correct} (on divise en haut et en bas par ${pgcd(p, 100)}).`,
      `la fraction irréductible est ${correct}.`,
    ),
  };
}

function genConvDecPct(): Genere {
  const p = randomInt(1, 99);
  const ctx = randomChoice(CONTEXTES_PROBA);
  const dec = fr(p / 100);
  if (Math.random() < 0.5) {
    return {
      text: randomChoice([
        `La probabilité ${ctx.e} est ${dec}. Écris-la en pourcentage.`,
        `La probabilité ${ctx.e} vaut ${dec}. Quel pourcentage cela représente-t-il ?`,
        `Une probabilité de ${dec} : à quel pourcentage correspond-elle ?`,
      ]),
      format: "short",
      expected: [`${p} %`, String(p), `${p}%`],
      comparator: "number_equal",
      explanation: expl(
        "un pourcentage est une probabilité multipliée par 100.",
        "on multiplie l'écriture décimale par 100.",
        `${dec} × 100 = ${p}.`,
        `${dec} correspond à ${p} %.`,
      ),
    };
  }
  return {
    text: randomChoice([
      `La probabilité ${ctx.e} est de ${p} %. Écris-la sous forme décimale.`,
      `La probabilité ${ctx.e} vaut ${p} %. Quelle est son écriture décimale ?`,
      `Une probabilité de ${p} % : quel nombre décimal lui correspond ?`,
    ]),
    format: "short",
    expected: [dec],
    comparator: "number_equal",
    explanation: expl(
      `${p} % signifie ${p} sur 100.`,
      "on divise le pourcentage par 100.",
      `${p} ÷ 100 = ${dec}.`,
      `${p} % correspond à ${dec}.`,
    ),
  };
}

/* ===========================================================================
   GÉNÉRATEURS — COMPARER
=========================================================================== */
function genCompSacQcm(): Genere {
  const tous = Math.random() < 0.15;
  const r = randomInt(2, 7);
  const comptes = tous ? [r, r, r] : shuffle([2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 3);
  const sac = tirerSac(3, undefined, comptes);
  const sc = sac.scene;
  const plus = Math.random() < 0.6;
  const ext = plus ? Math.max(...comptes) : Math.min(...comptes);
  const egaux = "ils sont tous aussi probables";
  const correct = tous ? egaux : evtG(sc, sac.compo.find((c) => c.n === ext)!.g);
  const text = `${sac.desc} ${
    plus
      ? randomChoice(["Quel événement est le plus probable ?", "Lequel de ces événements a le plus de chances de se produire ?"])
      : randomChoice(["Quel événement est le moins probable ?", "Lequel de ces événements a le moins de chances de se produire ?"])
  }`;
  return {
    text,
    format: "qcm",
    choices: shuffle([...sac.compo.map((c) => evtG(sc, c.g)), egaux]),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: expl(
      `chaque ${sc.objS} a la même chance : plus une catégorie est nombreuse, plus elle est probable.`,
      "toutes les probabilités ont le même dénominateur (le total) : on compare les effectifs.",
      `${joinEt(sac.compo.map((c) => qte(c.n, c.g)))}, sur ${sac.total} en tout.`,
      tous ? "les trois effectifs sont égaux : les trois événements sont aussi probables." : `l'événement ${plus ? "le plus" : "le moins"} probable est « ${correct} ».`,
    ),
    canvas: sac.canvas,
  };
}

const JEUX = [
  "la pêche aux canards",
  "le chamboule-tout",
  "la roue de la fortune",
  "le lancer d'anneaux",
  "la loterie",
  "la tombola",
  "le jeu des gobelets",
  "le tir aux ballons",
  "la machine à pinces",
  "le jeu de la boîte mystère",
];
const LIEUX_JEU = [
  "À la kermesse du collège",
  "À la fête foraine",
  "À la fête du village",
  "Au marché de Noël",
  "Au salon du jeu",
  "À la fête de l'école",
  "À la brocante du quartier",
];

function genCompDeuxJeux(): Genere {
  const [A, B] = shuffle(JEUX).slice(0, 2);
  const lieu = randomChoice(LIEUX_JEU);
  const type = randomChoice(["denom", "denom", "num", "num", "egal"] as const);
  let n1: number, d1: number, n2: number, d2: number;
  if (type === "denom") {
    d1 = d2 = randomInt(5, 12);
    [n1, n2] = shuffle(Array.from({ length: d1 - 1 }, (_, i) => i + 1)).slice(0, 2);
  } else if (type === "num") {
    n1 = n2 = randomInt(1, 4);
    [d1, d2] = shuffle(Array.from({ length: 9 }, (_, i) => n1 + 2 + i)).slice(0, 2);
  } else {
    d1 = randomInt(3, 6);
    n1 = randomInt(1, d1 - 1);
    const k = randomInt(2, 3);
    n2 = n1 * k;
    d2 = d1 * k;
  }
  const v1 = n1 / d1;
  const v2 = n2 / d2;
  const plus = Math.random() < 0.65;
  const egal = "autant de chances aux deux jeux";
  const correct = Math.abs(v1 - v2) < 1e-9 ? egal : (v1 > v2) === plus ? cap(A) : cap(B);
  const text = `${lieu}, la probabilité de gagner ${a(A)} est ${n1}/${d1}, et celle de gagner ${a(B)} est ${n2}/${d2}. ${
    plus
      ? randomChoice(["À quel jeu a-t-on le plus de chances de gagner ?", "Quel jeu vaut-il mieux choisir pour gagner ?"])
      : "À quel jeu a-t-on le moins de chances de gagner ?"
  }`;
  return {
    text,
    format: "qcm",
    choices: shuffle([cap(A), cap(B), egal]),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: expl(
      "plus la probabilité est grande, plus on a de chances de gagner.",
      type === "denom"
        ? "même dénominateur : on compare les numérateurs."
        : type === "num"
          ? "même numérateur : la fraction la plus grande est celle qui a le PLUS PETIT dénominateur."
          : "on simplifie les deux fractions pour les comparer.",
      type === "egal"
        ? `${n2}/${d2} = ${n1}/${d1} : les deux fractions sont égales.`
        : `${n1}/${d1} ${v1 > v2 ? ">" : "<"} ${n2}/${d2}.`,
      `la bonne réponse est « ${correct} ».`,
    ),
  };
}

function genCompDeuxSacs(): Genere {
  const scene = randomChoice(SCENES.filter((s) => s.id !== "tombola"));
  const [g, h] = shuffle(scene.groupes).slice(0, 2);
  const egal = Math.random() < 0.2;
  let a1: number, b1: number, a2: number, b2: number;
  if (egal) {
    a1 = randomInt(1, 5);
    b1 = randomInt(1, 5);
    if (a1 === b1) b1++;
    const k = randomInt(2, 3);
    a2 = a1 * k;
    b2 = b1 * k;
  } else {
    do {
      a1 = randomInt(2, 9);
      b1 = randomInt(2, 9);
      a2 = randomInt(2, 9);
      b2 = randomInt(2, 9);
    } while (a1 * (a2 + b2) === a2 * (a1 + b1) || a1 + b1 === a2 + b2);
  }
  if (Math.random() < 0.5) [a1, b1, a2, b2] = [a2, b2, a1, b1];
  const T1 = a1 + b1;
  const T2 = a2 + b2;
  const A = `${scene.court} A`;
  const B = `${scene.court} B`;
  const E = evtG(scene, g);
  const egaux = "autant de chances dans les deux";
  const v1 = a1 / T1;
  const v2 = a2 / T2;
  const correct = Math.abs(v1 - v2) < 1e-9 ? egaux : v1 > v2 ? A : B;
  const text = `${cap(A)} ${scene.contient} ${qte(a1, g)} et ${qte(b1, h)} ; ${B} ${scene.contient} ${qte(a2, g)} et ${qte(b2, h)}. ${scene.tirage} ${randomChoice([
    `Pour ${E}, vaut-il mieux choisir ${A} ou ${B} ?`,
    `Où a-t-on le plus de chances ${deNu(E)} : dans ${A} ou dans ${B} ?`,
    `Dans quel cas la probabilité ${deNu(E)} est-elle la plus grande ?`,
  ])}`;
  return {
    text,
    format: "qcm",
    choices: shuffle([A, B, egaux]),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: expl(
      "on compare des PROBABILITÉS, pas des effectifs : le nombre de cas favorables ne suffit pas, il faut le rapporter au total.",
      "on calcule la probabilité dans chaque cas, puis on compare les deux fractions (même dénominateur, ou écriture décimale).",
      `${cap(A)} : ${a1}/${T1} ≈ ${fr(Math.round(v1 * 1000) / 1000)} ; ${B} : ${a2}/${T2} ≈ ${fr(Math.round(v2 * 1000) / 1000)}.`,
      correct === egaux ? "les deux probabilités sont égales." : `la probabilité est plus grande dans ${correct}.`,
    ),
    canvas: tableauCanvas(["", g.p, h.p, "Total"], [["A", String(a1), String(b1), String(T1)], ["B", String(a2), String(b2), String(T2)]]),
  };
}

function genCompDeuxEvts(): Genere {
  const u = tirerUniversNum();
  const [p1, p2] = shuffle(predicats(u.n)).slice(0, 2);
  const f1 = issues(u.n, p1.test).length;
  const f2 = issues(u.n, p2.test).length;
  const E1 = u.evt(p1.txt);
  const E2 = u.evt(p2.txt);
  const plus = Math.random() < 0.6;
  const egaux = "les deux sont aussi probables";
  const correct = f1 === f2 ? egaux : (f1 > f2) === plus ? E1 : E2;
  const text = `${u.desc} ${
    plus
      ? randomChoice([
          `Quel événement est le plus probable : « ${E1} » ou « ${E2} » ?`,
          `Entre « ${E1} » et « ${E2} », lequel a le plus de chances de se produire ?`,
        ])
      : `Quel événement est le moins probable : « ${E1} » ou « ${E2} » ?`
  }`;
  return {
    text,
    format: "qcm",
    choices: shuffle([E1, E2, egaux]),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: expl(
      "les issues sont équiprobables : l'événement le plus probable est celui qui a le plus d'issues favorables.",
      `on compte les issues favorables de chaque événement, sur les mêmes ${u.n} issues.`,
      `« ${E1} » : ${listeOuCompte(issues(u.n, p1.test))} → ${f1}/${u.n}. « ${E2} » : ${listeOuCompte(issues(u.n, p2.test))} → ${f2}/${u.n}.`,
      correct === egaux ? "les deux événements sont aussi probables." : `la bonne réponse est « ${correct} ».`,
    ),
    canvas: u.canvas,
  };
}

const FRACTIONS_SIMPLES: Array<[number, number]> = [
  [1, 2], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5], [1, 10], [3, 10], [7, 10], [9, 10],
  [1, 20], [3, 20], [7, 20], [9, 20], [11, 20], [13, 20], [17, 20], [1, 25], [6, 25], [8, 25], [12, 25], [16, 25],
];

function genCompTroisEcritures(): Genere {
  const lieu = randomChoice(LIEUX_JEU);
  const [A, B, C] = shuffle(JEUX).slice(0, 3);
  let fs: Array<[number, number]>;
  do {
    fs = shuffle(FRACTIONS_SIMPLES).slice(0, 3);
  } while (new Set(fs.map(([n, d]) => n / d)).size < 3);
  const [fa, fb, fc] = fs;
  const va = fa[0] / fa[1];
  const vb = fb[0] / fb[1];
  const vc = fc[0] / fc[1];
  const plus = Math.random() < 0.6;
  const vals = [va, vb, vc];
  const ext = plus ? Math.max(...vals) : Math.min(...vals);
  const noms = [A, B, C];
  const correct = cap(noms[vals.indexOf(ext)]);
  const text = `${lieu}, la probabilité de gagner est de ${fa[0]}/${fa[1]} ${a(A)}, de ${fr(vb * 100)} % ${a(B)} et de ${fr(vc)} ${a(C)}. ${
    plus ? "À quel jeu a-t-on le plus de chances de gagner ?" : "À quel jeu a-t-on le moins de chances de gagner ?"
  }`;
  return {
    text,
    format: "qcm",
    choices: shuffle([cap(A), cap(B), cap(C), "les trois jeux se valent"]),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: expl(
      "pour comparer des probabilités écrites de façons différentes, on les écrit toutes de la MÊME façon.",
      "on convertit tout en nombre décimal (ou tout en pourcentage).",
      `${cap(A)} : ${fa[0]}/${fa[1]} = ${fr(va)} ; ${B} : ${fr(vb * 100)} % = ${fr(vb)} ; ${C} : ${fr(vc)}.`,
      `${plus ? "la plus grande" : "la plus petite"} est ${fr(ext)} : c'est ${correct.charAt(0).toLowerCase() + correct.slice(1)}.`,
    ),
  };
}

/* ===========================================================================
   GÉNÉRATEURS — DÉFIS
=========================================================================== */
function genDefiContraireValeur(): Genere {
  const ctx = randomChoice(CONTEXTES_PROBA);
  const forme = randomChoice(["frac", "dec", "pct"] as const);
  let X: string;
  let expected: string[];
  let comparator: "fraction_decimal_equivalent" | "number_equal";
  let consigne: string;
  let calc: string;
  let rep: string;
  if (forme === "frac") {
    const d = randomInt(3, 20);
    const n = randomInt(1, d - 1);
    X = `${n}/${d}`;
    expected = reponsesFraction(d - n, d, false);
    comparator = "fraction_decimal_equivalent";
    consigne = "Donne le résultat sous forme de fraction.";
    rep = `${d - n}/${d}`;
    calc = `1 − ${n}/${d} = ${d}/${d} − ${n}/${d} = ${rep}.`;
  } else if (forme === "dec") {
    const p = randomInt(1, 99);
    X = fr(p / 100);
    rep = fr((100 - p) / 100);
    expected = [rep];
    comparator = "number_equal";
    consigne = "Donne le résultat sous forme décimale.";
    calc = `1 − ${X} = ${rep}.`;
  } else {
    const p = randomInt(1, 99);
    X = `${p} %`;
    rep = `${100 - p} %`;
    expected = [rep, String(100 - p), `${100 - p}%`];
    comparator = "number_equal";
    consigne = "Donne le résultat en pourcentage.";
    calc = `100 % − ${p} % = ${rep}.`;
  }
  const text = `${randomChoice([
    `La probabilité ${ctx.e} est ${X}. Quelle est la probabilité ${ctx.c} ?`,
    `On sait que la probabilité ${ctx.e} vaut ${X}. Calcule la probabilité ${ctx.c}.`,
    `La probabilité ${ctx.e} est égale à ${X}. Déduis-en la probabilité ${ctx.c}.`,
  ])} ${consigne}`;
  return {
    text,
    format: "short",
    expected,
    comparator,
    explanation: expl(
      "un événement et son contraire se partagent toutes les issues : leurs probabilités ont pour somme 1 (soit 100 %).",
      "probabilité du contraire = 1 − probabilité de l'événement.",
      calc,
      `la probabilité ${ctx.c} est ${rep}.`,
    ),
  };
}

function genDefiEffectifManquant(): Genere {
  const scene = randomChoice(SCENES.filter((s) => s.id !== "classe"));
  const [g, h] = shuffle(scene.groupes).slice(0, 2);
  const d0 = randomInt(2, 6);
  const n0 = randomInt(1, d0 - 1);
  const q = pgcd(n0, d0);
  const n = n0 / q;
  const d = d0 / q;
  const k = randomInt(2, 5);
  const ng = n * k;
  const T = d * k;
  const nh = T - ng;
  const total = Math.random() < 0.5;
  const text = `${cap(scene.lieu)} ${scene.contient} uniquement des ${g.p} et des ${h.p}. Il y a ${qte(ng, g)}. ${scene.tirage} La probabilité ${deNu(evtG(scene, g))} est ${n}/${d}. ${
    total ? `Combien y a-t-il ${deNu(scene.objP)} en tout ?` : `Combien y a-t-il ${deNu(h.p)} ?`
  }`;
  return {
    text,
    format: "short",
    expected: [String(total ? T : nh)],
    comparator: "number_equal",
    explanation: expl(
      "probabilité = cas favorables ÷ cas possibles.",
      `${n}/${d} signifie ${n} sur ${d} : il faut trouver une fraction égale à ${n}/${d} dont le numérateur est ${ng}.`,
      `${n}/${d} = ${ng}/${T} (on multiplie par ${k}) : il y a ${T} ${scene.objP} en tout, donc ${T} − ${ng} = ${nh} ${h.p}.`,
      total ? `il y a ${T} ${scene.objP} en tout.` : `il y a ${nh} ${nh > 1 ? h.p : h.s}.`,
    ),
  };
}

function genDefiUnion(): Genere {
  const sac = tirerSac(3);
  const sc = sac.scene;
  const [c0, c1, c2] = sac.compo;
  const T = sac.total;
  const ou = Math.random() < 0.5;
  const E = ou ? evtOu(sc, c0.g, c1.g) : evtNonG(sc, c2.g);
  const f = c0.n + c1.n;
  const irreductible = Math.random() < 0.5 && irr(f, T) !== `${f}/${T}`;
  return {
    text: `${sac.desc} ${qProba(E)} ${consigneFraction(irreductible)}`,
    format: "short",
    expected: reponsesFraction(f, T, irreductible),
    comparator: "fraction_decimal_equivalent",
    explanation: expl(
      "probabilité = cas favorables ÷ cas possibles.",
      ou
        ? `on additionne les ${c0.g.p} et les ${c1.g.p}.`
        : `ne pas obtenir de ${c2.g.s}, c'est obtenir l'un des autres : on retire les ${c2.g.p} du total.`,
      `${c0.n} + ${c1.n} = ${f} cas favorables sur ${T} : ${f}/${T}${irr(f, T) !== `${f}/${T}` ? ` = ${irr(f, T)}` : ""}.`,
      `la probabilité ${deNu(E)} est ${irr(f, T)}.`,
    ),
    canvas: sac.canvas,
  };
}

const ANGLES: number[][] = [
  [180, 90, 90],
  [180, 120, 60],
  [120, 120, 120],
  [180, 90, 45, 45],
  [120, 90, 90, 60],
  [150, 120, 90],
  [240, 60, 60],
  [210, 90, 60],
  [200, 100, 60],
  [90, 90, 90, 90],
  [160, 120, 80],
  [144, 144, 72],
];

function genDefiRoueAngles(): Genere {
  const lieu = randomChoice(LIEUX_ROUE);
  const qcm = Math.random() < 0.4;
  const pool = qcm ? ANGLES.filter((x) => x.length === 3 && x.filter((v) => v === Math.max(...x)).length === 1) : ANGLES;
  const ang = shuffle(randomChoice(pool));
  const cs = shuffle(COULEURS.filter((c) => c.ms !== "blanc")).slice(0, ang.length);
  const liste = joinEt(cs.map((c, i) => `un secteur ${c.ms} de ${ang[i]}°`));
  const ctx = `La roue ${lieu} est partagée en ${ang.length} secteurs : ${liste}. On la fait tourner.`;
  const canvas = roueCanvas(cs.map((c, i) => ({ label: c.ms, poids: ang[i], couleur: c.hex })));
  if (qcm) {
    const iMax = ang.indexOf(Math.max(...ang));
    const correct = leCoul(cs[iMax]);
    return {
      text: `${ctx} ${randomChoice(["Quelle couleur a le plus de chances de sortir ?", "Quelle est l'issue la plus probable ?", "Sur quelle couleur la roue a-t-elle le plus de chances de s'arrêter ?"])}`,
      format: "qcm",
      choices: shuffle([...cs.map(leCoul), "toutes les couleurs ont la même chance"]),
      expected: [correct],
      comparator: "mcq_exact",
      explanation: expl(
        "sur une roue, la probabilité d'un secteur est proportionnelle à son angle : angle ÷ 360°.",
        "on compare les angles des secteurs.",
        cs.map((c, i) => `${c.ms} : ${ang[i]}/360 = ${irr(ang[i], 360)}`).join(" ; ") + ".",
        `le plus grand angle est ${ang[iMax]}° : l'issue la plus probable est ${correct}.`,
      ),
      canvas,
    };
  }
  const i = randomInt(0, ang.length - 1);
  const E = `obtenir ${leCoul(cs[i])}`;
  return {
    text: `${ctx} ${qProba(E)} ${consigneFraction(false)}`,
    format: "short",
    expected: reponsesFraction(ang[i], 360, false),
    comparator: "fraction_decimal_equivalent",
    explanation: expl(
      "sur une roue, la probabilité d'un secteur est la part du tour complet qu'il occupe : angle ÷ 360°.",
      `on divise l'angle du secteur ${cs[i].ms} par 360.`,
      `${ang[i]}/360 = ${irr(ang[i], 360)}.`,
      `la probabilité ${deNu(E)} est ${irr(ang[i], 360)}.`,
    ),
    canvas,
  };
}

function genDefiRoueExplique(): Genere {
  const lieu = randomChoice(LIEUX_ROUE);
  const cs = shuffle(COULEURS.filter((c) => c.ms !== "blanc")).slice(0, 3);
  const m = randomInt(2, 4);
  return {
    // ⛔ 08/10 : c'était une question ouverte validée par des mots-clés
    // (« secteur » suffisait) → QCM sur les mêmes pièges (compter les couleurs).
    text: `Sur la roue ${lieu}, le secteur ${cs[0].ms} est ${m} fois plus grand que chacun des secteurs ${cs[1].ms} et ${cs[2].ms}. ${randomChoice([
      `Pourquoi « obtenir ${leCoul(cs[0])} » est-il l'issue la plus probable ?`,
      `Quelle raison explique que « obtenir ${leCoul(cs[0])} » soit l'issue la plus probable ?`,
    ])}`,
    format: "qcm",
    choices: shuffle([
      `parce que le secteur ${cs[0].ms} occupe ${m} parts sur ${m + 2} de la roue`,
      "parce qu'il y a trois couleurs : chacune a une chance sur trois",
      `parce que ${leCoul(cs[0])} est cité en premier`,
      `parce que ${leCoul(cs[0])} est une couleur plus voyante`,
    ]),
    expected: [`parce que le secteur ${cs[0].ms} occupe ${m} parts sur ${m + 2} de la roue`],
    comparator: "mcq_exact",
    explanation: expl(
      "sur une roue, une issue est d'autant plus probable que son secteur est grand.",
      "on compare la place occupée par chaque couleur.",
      `${cap(leCoul(cs[0]))} occupe ${m} parts sur ${m + 2}, ${leCoul(cs[1])} et ${leCoul(cs[2])} une seule chacun : P(${cs[0].ms}) = ${irr(m, m + 2)}, P(${cs[1].ms}) = P(${cs[2].ms}) = ${irr(1, m + 2)}.`,
      `${leCoul(cs[0])} occupe la plus grande partie de la roue : c'est l'issue la plus probable.`,
    ),
    canvas: roueCanvas(cs.map((c, i) => ({ label: c.ms, poids: i === 0 ? m : 1, couleur: c.hex }))),
  };
}

const CIBLES: Array<[number, number]> = [[1, 2], [1, 3], [2, 3], [3, 4], [2, 5], [3, 5], [1, 4]];

function genDefiAjouter(): Genere {
  const [p, q] = randomChoice(CIBLES);
  let k = 1;
  let x = 1;
  let gf = 0;
  for (let essai = 0; essai < 50; essai++) {
    k = randomInt(1, 4);
    gf = p * k;
    if (gf >= 3) break;
  }
  if (gf < 3) {
    k = 3;
    gf = p * k;
  }
  x = randomInt(1, gf - 2);
  const T = q * k;
  const ga = gf - x;
  const autres = T - gf;
  const scene = randomChoice(SCENES.filter((s) => s.id !== "classe" && s.id !== "club"));
  const [g, h] = shuffle(scene.groupes).slice(0, 2);
  const E = evtG(scene, g);
  const text = `${cap(scene.lieu)} ${scene.contient} ${qte(ga, g)} et ${qte(autres, h)}. ${scene.tirage} ${randomChoice([
    `Combien ${deNu(g.p)} faut-il ajouter pour que la probabilité ${deNu(E)} soit égale à ${p}/${q} ?`,
    `On veut que la probabilité ${deNu(E)} devienne ${p}/${q}. Combien ${deNu(g.p)} faut-il ajouter ?`,
  ])}`;
  return {
    text,
    format: "short",
    expected: [String(x)],
    comparator: "number_equal",
    explanation: expl(
      "probabilité = cas favorables ÷ cas possibles ; en ajoutant des objets, on augmente À LA FOIS le numérateur et le dénominateur.",
      `les ${autres} ${h.p} ne changent pas. On cherche une fraction égale à ${p}/${q} dont le dénominateur dépasse le numérateur de ${autres} : c'est le nombre d'objets qui ne sont pas favorables.`,
      `${k > 1 ? `${p}/${q} = ${gf}/${T} : ` : ""}il faut ${gf} ${g.p} pour ${autres} ${autres > 1 ? h.p : h.s}, soit ${T} en tout. Or il y en a ${ga} : ${gf} − ${ga} = ${x}. Vérification : avec ${gf} ${g.p} sur ${T}, la probabilité vaut ${gf}/${T}${k > 1 ? ` = ${p}/${q}` : ""}.`,
      `il faut ajouter ${x} ${x > 1 ? g.p : g.s}.`,
    ),
  };
}

function genDefiTroisieme(): Genere {
  const sc = randomChoice(SCENES.filter((s) => s.groupes.length >= 3));
  let comptes: number[];
  let T: number;
  do {
    T = randomChoice([12, 15, 18, 20, 24, 30, 36]);
    comptes = partition(T, 3, 1);
  } while (irr(comptes[0], T).split("/")[1] === irr(comptes[1], T).split("/")[1] && Math.random() < 0.7);
  const gs = shuffle(sc.groupes).slice(0, 3);
  const [g1, g2, g3] = gs;
  const P1 = irr(comptes[0], T);
  const P2 = irr(comptes[1], T);
  const c = comptes[2];
  const text = `Dans ${sc.lieu}, il n'y a que des ${g1.p}, des ${g2.p} et des ${g3.p}. ${sc.tirage} La probabilité ${deNu(evtG(sc, g1))} est ${P1}, et celle ${deNu(evtG(sc, g2))} est ${P2}. ${qProba(evtG(sc, g3))} ${consigneFraction(false)}`;
  return {
    text,
    format: "short",
    expected: reponsesFraction(c, T, false),
    comparator: "fraction_decimal_equivalent",
    explanation: expl(
      "les probabilités de toutes les catégories ont pour somme 1.",
      "on calcule 1 − (somme des deux probabilités connues), en mettant au même dénominateur.",
      `${[P1, P2].map((P, j) => (P !== `${comptes[j]}/${T}` ? `${P} = ${comptes[j]}/${T}` : "")).filter(Boolean).join(" et ")}${P1 !== `${comptes[0]}/${T}` || P2 !== `${comptes[1]}/${T}` ? ". " : ""}1 − ${comptes[0]}/${T} − ${comptes[1]}/${T} = ${c}/${T}${irr(c, T) !== `${c}/${T}` ? ` = ${irr(c, T)}` : ""}.`,
      `la probabilité ${deNu(evtG(sc, g3))} est ${irr(c, T)}.`,
    ),
  };
}

/* ===========================================================================
   LA BANQUE
=========================================================================== */
export const probabilitesBank: TutorBankItemV4[] = [
  // =========================
  // VOCABULAIRE
  // =========================
  {
    kind: "fixed",
    id: "proba_vocabulaire_fixed_1",
    niveau: "4e",
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
    hint: "Aléatoire veut dire qu’on ne connaît pas le résultat avant de faire l’expérience.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise, entre 0 et 1.\n\n" +
          "Méthode : on compare les cas favorables à tous les cas possibles dans l’expérience aléatoire.\n\nCalcul : " +
          ("Une expérience aléatoire est une expérience dont on ne peut pas prévoir avec certitude le résultat.") +
          "\n\nConclusion : la probabilité obtenue correspond à l’événement demandé.",
    tags: ["proba_experience", "vocabulaire"],
  },
  {
    kind: "fixed",
    id: "proba_vocabulaire_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Lorsqu’on lance un dé, obtenir 4 est...",
    format: "qcm",
    choices: ["une issue", "une fréquence", "un tableau", "une moyenne"],
    expected: ["une issue"],
    comparator: "mcq_exact",
    hint: "Une issue est un résultat possible.",
    explanation: "Définition : une probabilité mesure la chance qu’un événement se produise, entre 0 et 1.\n\n" +
          "Méthode : on compare les cas favorables à tous les cas possibles dans l’expérience aléatoire.\n\nCalcul : " +
          ("Obtenir 4 est un résultat possible du lancer de dé : c’est une issue.") +
          "\n\nConclusion : la probabilité obtenue correspond à l’événement demandé.",
    tags: ["proba_experience", "issue"],
    canvas: deCanvas([4]),
  },
    {
    kind: "fixed",
    id: "proba_vocabulaire_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    // ⛔ 08/10 : question ouverte à mots-clés (« résultat » suffisait) → QCM sur les mêmes pièges.
    text: "Qu’est-ce qu’une expérience aléatoire ?",
    format: "qcm",
    choices: [
      "une expérience dont on ne peut pas prévoir le résultat à l’avance",
      "une expérience qui donne toujours le même résultat",
      "une expérience dont le résultat est impossible",
      "une expérience qu’on ne peut faire qu’une seule fois",
    ],
    expected: ["une expérience dont on ne peut pas prévoir le résultat à l’avance"],
    comparator: "mcq_exact",
    hint: "On ne peut pas savoir avec certitude le résultat avant de faire l’expérience.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise, entre 0 et 1.\n\n" +
          "Méthode : on compare les cas favorables à tous les cas possibles dans l’expérience aléatoire.\n\nCalcul : " +
          ("Une expérience aléatoire est une expérience dont on ne connaît pas le résultat à l’avance.") +
          "\n\nConclusion : la probabilité obtenue correspond à l’événement demandé.",
    tags: ["proba_experience", "vocabulaire", "open"],
  },

  // =========================
  // ISSUES
  // =========================
  {
    kind: "fixed",
    id: "proba_issue_fixed_1",
    niveau: "4e",
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
    hint: "Un dé classique a 6 faces.",
    explanation: "Définition : une probabilité mesure la chance qu’un événement se produise, entre 0 et 1.\n\n" +
          "Méthode : on compare les cas favorables à tous les cas possibles dans l’expérience aléatoire.\n\nCalcul : " +
          ("Les issues possibles sont 1, 2, 3, 4, 5 et 6 : il y en a 6.") +
          "\n\nConclusion : la probabilité obtenue correspond à l’événement demandé.",
    tags: ["proba_experience", "issue", "de"],
    canvas: deCanvas(),
  },
  {
    kind: "template",
    id: "proba_issue_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 1,
    theme: "neutral",
    hint: "Chaque objet est une issue : additionne les effectifs de toutes les catégories.",
    tags: ["proba_experience", "issue", "billes", "template"],
    generate: genIssueTotalSac,
  },
    {
    kind: "fixed",
    id: "proba_issue_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 2,
    theme: "neutral",
    text: "On lance un dé équilibré à 6 faces. Pourquoi y a-t-il 6 issues possibles ?",
    format: "qcm",
    choices: [
      "parce que le dé peut tomber sur 1, 2, 3, 4, 5 ou 6",
      "parce qu’on lance le dé 6 fois",
      "parce que 6 est le plus grand nombre du dé",
      "parce que chaque issue a une probabilité de 6",
    ],
    expected: ["parce que le dé peut tomber sur 1, 2, 3, 4, 5 ou 6"],
    comparator: "mcq_exact",
    hint: "Liste les résultats possibles du dé.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise, entre 0 et 1.\n\n" +
          "Méthode : on compare les cas favorables à tous les cas possibles dans l’expérience aléatoire.\n\nCalcul : " +
          ("Les issues possibles sont 1, 2, 3, 4, 5 et 6. Il y a donc 6 issues.") +
          "\n\nConclusion : la probabilité obtenue correspond à l’événement demandé.",
    tags: ["proba_experience", "issue", "open"],
    canvas: deCanvas(),
  },

  // =========================
  // ÉVÉNEMENTS
  // =========================
  {
    kind: "fixed",
    id: "proba_evenement_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_evenement",
    difficulty: 1,
    theme: "neutral",
    text: "Lorsqu’on lance un dé à 6 faces, l’événement « obtenir un nombre inférieur à 7 » est...",
    format: "qcm",
    choices: ["impossible", "certain", "contraire", "vide"],
    expected: ["certain"],
    comparator: "mcq_exact",
    hint: "Toutes les faces du dé sont inférieures à 7.",
    explanation: "Définition : une probabilité mesure la chance qu’un événement se produise, entre 0 et 1.\n\n" +
          "Méthode : on compare les cas favorables à tous les cas possibles dans l’expérience aléatoire.\n\nCalcul : " +
          ("Les issues 1, 2, 3, 4, 5 et 6 sont toutes inférieures à 7 : l’événement est certain.") +
          "\n\nConclusion : la probabilité obtenue correspond à l’événement demandé.",
    tags: ["proba_experience", "certain"],
    canvas: deCanvas([1, 2, 3, 4, 5, 6]),
  },
  {
    kind: "fixed",
    id: "proba_evenement_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_evenement",
    difficulty: 1,
    theme: "neutral",
    text: "Lorsqu’on lance un dé à 6 faces, l’événement « obtenir 8 » est...",
    format: "qcm",
    choices: ["certain", "impossible", "équiprobable", "favorable"],
    expected: ["impossible"],
    comparator: "mcq_exact",
    hint: "Un dé classique ne possède pas de face 8.",
    explanation: "Définition : une probabilité mesure la chance qu’un événement se produise, entre 0 et 1.\n\n" +
          "Méthode : on compare les cas favorables à tous les cas possibles dans l’expérience aléatoire.\n\nCalcul : " +
          ("La face 8 n’existe pas sur un dé à 6 faces : l’événement est impossible.") +
          "\n\nConclusion : la probabilité obtenue correspond à l’événement demandé.",
    tags: ["proba_experience", "impossible"],
    canvas: deCanvas(),
  },
  {
    kind: "template",
    id: "proba_evenement_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_evenement",
    difficulty: 2,
    theme: "neutral",
    hint: "Un événement contraire contient toutes les issues qui ne réalisent pas l’événement.",
    tags: ["proba_experience", "contraire", "template"],
    // ⛔ RÉPARÉ LE 30/08/2026 (6 événements du dé), puis le 04/10/2026 : dés,
    // roues, cartes, sacs, mots… Les leurres sont choisis par ENSEMBLE
    // d'issues : une phrase qui désigne les mêmes issues que la bonne réponse
    // (« strictement inférieur à 6 » pour « inférieur ou égal à 5 ») n'est
    // jamais proposée comme piège.
    generate: genEvtContraireQcm,
  },
    {
    kind: "fixed",
    id: "proba_evenement_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_evenement",
    difficulty: 2,
    theme: "neutral",
    text: "On lance un dé à 6 faces. Pourquoi l’événement « obtenir 8 » est-il impossible ?",
    format: "qcm",
    choices: [
      "parce qu’aucune face du dé ne porte le nombre 8",
      "parce que 8 est un nombre pair",
      "parce que 8 a très peu de chances de sortir",
      "parce qu’il faudrait lancer le dé 8 fois",
    ],
    expected: ["parce qu’aucune face du dé ne porte le nombre 8"],
    comparator: "mcq_exact",
    hint: "Regarde les faces possibles du dé.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise, entre 0 et 1.\n\n" +
          "Méthode : on compare les cas favorables à tous les cas possibles dans l’expérience aléatoire.\n\nCalcul : " +
          ("Un dé à 6 faces possède les faces 1, 2, 3, 4, 5 et 6. Il n’a pas de face 8, donc l’événement est impossible.") +
          "\n\nConclusion : la probabilité obtenue correspond à l’événement demandé.",
    tags: ["proba_experience", "evenement", "impossible", "open"],
    canvas: deCanvas(),
  },

  // =========================
  // ÉQUIPROBABILITÉ
  // =========================
  {
    kind: "fixed",
    id: "proba_equiprobabilite_fixed_1",
    niveau: "4e",
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
    explanation: "Définition : une probabilité mesure la chance qu’un événement se produise, entre 0 et 1.\n\n" +
          "Méthode : on compare les cas favorables à tous les cas possibles dans l’expérience aléatoire.\n\nCalcul : " +
          ("Oui. Chaque face a la même probabilité d’apparaître : la situation est équiprobable.") +
          "\n\nConclusion : la probabilité obtenue correspond à l’événement demandé.",
    tags: ["proba_experience", "equiprobabilite", "de"],
    canvas: deCanvas(),
  },
  {
    kind: "template",
    id: "proba_equiprobabilite_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_equiprobabilite",
    difficulty: 2,
    theme: "neutral",
    hint: "Sur une roue, compare la place occupée par chaque couleur, pas le nombre de couleurs.",
    tags: ["proba_experience", "roue", "equiprobabilite", "template"],
    // ⛔ RÉPARÉ LE 30/08/2026 (le contexte entrait dans le texte), puis le
    // 04/10/2026 : le nombre de secteurs de chaque couleur est écrit dans
    // l'énoncé, et une roue sur trois a des secteurs de tailles différentes.
    generate: genEquiRoue,
  },

  // =========================
  // CALCULER UNE PROBABILITÉ SOUS FORME DE FRACTION
  // =========================
  {
    kind: "fixed",
    id: "proba_calculer_fraction_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_calculer_fraction",
    difficulty: 2,
    theme: "neutral",
    text: "On lance un dé équilibré. Quelle est la probabilité d’obtenir un nombre pair ?",
    format: "qcm",
    choices: ["1/6", "2/6", "3/6", "6/3"],
    expected: ["3/6"],
    comparator: "mcq_exact",
    hint: "Les nombres pairs sont 2, 4 et 6.",
    explanation: "Définition : une probabilité mesure la chance qu’un événement se produise, entre 0 et 1.\n\n" +
          "Méthode : on compare les cas favorables à tous les cas possibles dans l’expérience aléatoire.\n\nCalcul : " +
          ("Il y a 3 issues favorables sur 6 issues possibles, donc la probabilité est 3/6.") +
          "\n\nConclusion : la probabilité obtenue correspond à l’événement demandé.",
    tags: ["proba_experience", "fraction", "de"],
    canvas: deCanvas([2, 4, 6]),
  },
  {
    kind: "template",
    id: "proba_calculer_fraction_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_calculer_fraction",
    difficulty: 2,
    theme: "neutral",
    hint: "Probabilité = nombre de cas favorables / nombre de cas possibles.",
    tags: ["proba_experience", "billes", "fraction", "template"],
    generate: genCalcSacQcm,
  },
  {
    kind: "template",
    id: "proba_calculer_fraction_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_calculer_fraction",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les secteurs de la couleur, puis tous les secteurs : les secteurs égaux sont les issues.",
    tags: ["proba_experience", "roue", "fraction", "template"],
    generate: genCalcRoueQcm,
  },
    {
    kind: "fixed",
    id: "proba_calculer_fraction_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_calculer_fraction",
    difficulty: 3,
    theme: "neutral",
    text: "On lance un dé équilibré à 6 faces. Pourquoi la probabilité d’obtenir un nombre pair est-elle 3/6 ?",
    format: "qcm",
    choices: [
      "parce que 3 faces sur 6 sont paires : 2, 4 et 6",
      "parce que 3 est la moitié de 6",
      "parce que le plus petit nombre pair est 2 et qu’il y a 6 faces",
      "parce qu’on a 3 chances de lancer le dé",
    ],
    expected: ["parce que 3 faces sur 6 sont paires : 2, 4 et 6"],
    comparator: "mcq_exact",
    hint: "Compte les nombres pairs, puis le nombre total d’issues.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise, entre 0 et 1.\n\n" +
          "Méthode : on compare les cas favorables à tous les cas possibles dans l’expérience aléatoire.\n\nCalcul : " +
          ("Les nombres pairs sont 2, 4 et 6 : il y a 3 issues favorables sur 6 issues possibles. La probabilité est donc 3/6.") +
          "\n\nConclusion : la probabilité obtenue correspond à l’événement demandé.",
    tags: ["proba_experience", "fraction", "de", "open"],
    canvas: deCanvas([2, 4, 6]),
  },

  // =========================
  // CONVERTIR EN DÉCIMAL OU POURCENTAGE
  // =========================
  {
    kind: "fixed",
    id: "proba_convertir_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "La probabilité 1/2 correspond à...",
    format: "qcm",
    choices: ["25 %", "50 %", "75 %", "100 %"],
    expected: ["50 %"],
    comparator: "mcq_exact",
    hint: "1/2 = 0,5.",
    explanation: "Définition : une probabilité mesure la chance qu’un événement se produise, entre 0 et 1.\n\n" +
          "Méthode : on compare les cas favorables à tous les cas possibles dans l’expérience aléatoire.\n\nCalcul : " +
          ("1/2 = 0,5 = 50 %.") +
          "\n\nConclusion : la probabilité obtenue correspond à l’événement demandé.",
    tags: ["proba_experience", "pourcentage"],
  },
  {
    kind: "template",
    id: "proba_convertir_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_convertir",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule la fraction cas favorables / cas possibles, écris-la en décimal, puis multiplie par 100.",
    tags: ["proba_experience", "pourcentage", "template"],
    generate: genConvCalculPourcent,
  },
    {
    kind: "fixed",
    id: "proba_convertir_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_convertir",
    difficulty: 3,
    theme: "neutral",
    text: "Pourquoi une probabilité de 1/2 correspond-elle à 50 % ?",
    format: "qcm",
    choices: [
      "parce que 1/2 = 0,5 et 0,5 × 100 = 50",
      "parce que 1/2 s’écrit 1,2 en nombre décimal",
      "parce que 50 est la moitié de 1/2",
      "parce que toute probabilité vaut 50 %",
    ],
    expected: ["parce que 1/2 = 0,5 et 0,5 × 100 = 50"],
    comparator: "mcq_exact",
    hint: "1/2 signifie une chance sur deux.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise, entre 0 et 1.\n\n" +
          "Méthode : on compare les cas favorables à tous les cas possibles dans l’expérience aléatoire.\n\nCalcul : " +
          ("1/2 = 0,5. Pour passer en pourcentage, on multiplie par 100 : 0,5 = 50 %.") +
          "\n\nConclusion : la probabilité obtenue correspond à l’événement demandé.",
    tags: ["proba_experience", "conversion", "pourcentage", "open"],
  },

  // =========================
  // COMPARER
  // =========================
  {
    kind: "fixed",
    id: "proba_comparer_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle probabilité est la plus grande ?",
    format: "qcm",
    choices: ["1/2", "1/4", "1/6", "1/10"],
    expected: ["1/2"],
    comparator: "mcq_exact",
    hint: "À numérateur égal, plus le dénominateur est petit, plus la fraction est grande.",
    explanation: "Définition : une probabilité mesure la chance qu’un événement se produise, entre 0 et 1.\n\n" +
          "Méthode : on compare les cas favorables à tous les cas possibles dans l’expérience aléatoire.\n\nCalcul : " +
          ("1/2 est plus grand que 1/4, 1/6 et 1/10.") +
          "\n\nConclusion : la probabilité obtenue correspond à l’événement demandé.",
    tags: ["proba_experience", "comparer", "fraction_nombre"],
  },
  {
    kind: "template",
    id: "proba_comparer_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule la probabilité dans chaque cas : le nombre de cas favorables seul ne suffit pas.",
    tags: ["proba_experience", "comparer", "tableau", "template"],
    generate: genCompDeuxSacs,
  },
    {
    kind: "fixed",
    id: "proba_comparer_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Pourquoi la probabilité 1/2 est-elle plus grande que 1/4 ?",
    format: "qcm",
    choices: [
      "parce qu’une moitié est plus grande qu’un quart : 1/2 = 2/4",
      "parce que 4 est plus grand que 2",
      "parce que 1/4 = 0,4 et 1/2 = 0,2",
      "c’est faux : 1/4 est plus grand, car 4 > 2",
    ],
    expected: ["parce qu’une moitié est plus grande qu’un quart : 1/2 = 2/4"],
    comparator: "mcq_exact",
    hint: "Compare une moitié et un quart.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise, entre 0 et 1.\n\n" +
          "Méthode : on compare les cas favorables à tous les cas possibles dans l’expérience aléatoire.\n\nCalcul : " +
          ("1/2 représente une moitié, alors que 1/4 représente un quart. Une moitié est plus grande qu’un quart.") +
          "\n\nConclusion : la probabilité obtenue correspond à l’événement demandé.",
    tags: ["proba_experience", "comparer", "fraction_nombre", "open"],
  },

  // =========================
  // DÉFIS
  // =========================
  {
    kind: "fixed",
    id: "proba_defi_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Une probabilité peut-elle être supérieure à 1 ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Une probabilité est comprise entre 0 et 1.",
    explanation: "Définition : une probabilité mesure la chance qu’un événement se produise, entre 0 et 1.\n\n" +
          "Méthode : on compare les cas favorables à tous les cas possibles dans l’expérience aléatoire.\n\nCalcul : " +
          ("Non. Une probabilité est toujours comprise entre 0 et 1.") +
          "\n\nConclusion : la probabilité obtenue correspond à l’événement demandé.",
    tags: ["proba_experience", "defi", "bornes"],
  },
  {
    kind: "template",
    id: "proba_defi_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Additionne les cas favorables de toutes les catégories qui conviennent, puis divise par le total.",
    // ⭐ 04/10/2026 — c'était le panier de fruits réunionnais, toujours lui ;
    // il reste une scène parmi dix-sept.
    tags: ["proba_experience", "defi", "template"],
    generate: genDefiUnion,
  },
  {
    kind: "template",
    id: "proba_defi_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Sur une roue, la probabilité d'un secteur est son angle divisé par 360°.",
    tags: ["proba_experience", "roue", "defi", "piege"],
    generate: genDefiRoueAngles,
  },
    {
    kind: "template",
    id: "proba_defi_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Compare les tailles des secteurs.",
    tags: ["proba_experience", "roue", "defi", "open", "template"],
    generate: genDefiRoueExplique,
  },

  /* =========================================================
     COMPLÉMENTS (top-up ~10 items / microSkill)
  ========================================================= */

  // ---------- VOCABULAIRE ----------
  {
    kind: "fixed",
    id: "proba_vocabulaire_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Un événement est…",
    format: "qcm",
    choices: [
      "un ensemble d’issues",
      "le nombre total de lancers",
      "la moyenne des résultats",
      "un dé truqué",
    ],
    expected: ["un ensemble d’issues"],
    comparator: "mcq_exact",
    hint: "Un événement regroupe une ou plusieurs issues.",
    explanation:
      "Définition : un événement est un ensemble d’issues d’une expérience.\n\n" +
      "Méthode : on regroupe les issues qui réalisent l’événement.\n\n" +
      "Calcul : par exemple « obtenir un pair » = {2, 4, 6}.\n\n" +
      "Conclusion : un événement est un ensemble d’issues.",
    tags: ["proba_experience", "vocabulaire", "qcm"],
  },
  {
    kind: "fixed",
    id: "proba_vocabulaire_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Une issue, c’est…",
    format: "qcm",
    choices: [
      "un résultat possible de l’expérience",
      "le nombre d’expériences",
      "une probabilité",
      "une moyenne",
    ],
    expected: ["un résultat possible de l’expérience"],
    comparator: "mcq_exact",
    hint: "C’est un résultat possible.",
    explanation:
      "Définition : une issue est un résultat possible d’une expérience aléatoire.\n\n" +
      "Méthode : on liste les résultats possibles.\n\n" +
      "Calcul : pour un dé, une issue est par exemple 4.\n\n" +
      "Conclusion : une issue est un résultat possible.",
    tags: ["proba_experience", "vocabulaire", "qcm"],
  },
  {
    kind: "fixed",
    id: "proba_vocabulaire_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Parmi ces situations, laquelle est une expérience aléatoire ?",
    format: "qcm",
    choices: [
      "lancer un dé",
      "calculer 2 + 3",
      "mesurer la longueur d’une table",
      "ranger des nombres dans l’ordre",
    ],
    expected: ["lancer un dé"],
    comparator: "mcq_exact",
    hint: "Le résultat doit être imprévisible.",
    explanation:
      "Définition : une expérience aléatoire a un résultat imprévisible.\n\n" +
      "Méthode : on cherche la situation au résultat incertain.\n\n" +
      "Calcul : lancer un dé donne un résultat non connu à l’avance.\n\n" +
      "Conclusion : lancer un dé est une expérience aléatoire.",
    tags: ["proba_experience", "vocabulaire", "qcm"],
  },
  {
    kind: "fixed",
    id: "proba_vocabulaire_fixed_6",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Un événement « certain » est un événement qui…",
    format: "qcm",
    choices: [
      "se réalise toujours",
      "ne se réalise jamais",
      "a une chance sur deux",
      "dépend du joueur",
    ],
    expected: ["se réalise toujours"],
    comparator: "mcq_exact",
    hint: "Sa probabilité vaut 1.",
    explanation:
      "Définition : un événement certain se produit à coup sûr (probabilité 1).\n\n" +
      "Méthode : on regarde si toutes les issues le réalisent.\n\n" +
      "Calcul : sa probabilité est 1.\n\n" +
      "Conclusion : un événement certain se réalise toujours.",
    tags: ["proba_experience", "vocabulaire", "qcm"],
  },
  {
    kind: "template",
    id: "proba_vocabulaire_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    hint: "Expérience = l'action ; issue = un résultat ; événement = un ensemble d’issues.",
    tags: ["proba_experience", "vocabulaire", "template"],
    generate: genVocabNature,
  },
  {
    kind: "template",
    id: "proba_vocabulaire_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    hint: "Un événement certain a pour probabilité 1, un impossible 0.",
    tags: ["proba_experience", "vocabulaire", "template"],
    generate: genVocabProba01,
  },
  {
    kind: "fixed",
    id: "proba_vocabulaire_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle phrase décrit correctement la différence entre une issue et un événement ?",
    format: "qcm",
    choices: [
      "une issue est UN résultat possible ; un événement est un ensemble d’issues",
      "une issue est un ensemble de résultats ; un événement est un seul résultat",
      "une issue et un événement sont la même chose",
      "un événement est toujours impossible, une issue toujours possible",
    ],
    expected: ["une issue est UN résultat possible ; un événement est un ensemble d’issues"],
    comparator: "mcq_exact",
    hint: "L’un est un seul résultat, l’autre un ensemble.",
    explanation:
      "Définition : une issue est un résultat unique ; un événement est un ensemble d’issues.\n\n" +
      "Méthode : on compte les résultats concernés.\n\n" +
      "Calcul : « obtenir 4 » est une issue ; « obtenir un pair » est un événement.\n\n" +
      "Conclusion : une issue est un seul résultat, un événement en regroupe plusieurs.",
    tags: ["proba_experience", "vocabulaire", "open"],
  },

  // ---------- ISSUES ----------
  {
    kind: "fixed",
    id: "proba_issue_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 1,
    theme: "neutral",
    text: "Combien y a-t-il d’issues possibles lorsqu’on lance une pièce de monnaie ?",
    format: "qcm",
    choices: ["2", "1", "6", "4"],
    expected: ["2"],
    comparator: "mcq_exact",
    hint: "Pile ou face.",
    explanation:
      "Définition : une issue est un résultat possible.\n\n" +
      "Méthode : on liste les résultats d’une pièce.\n\n" +
      "Calcul : pile et face, soit 2 issues.\n\n" +
      "Conclusion : il y a 2 issues.",
    tags: ["proba_experience", "issue", "qcm"],
  },
  {
    kind: "fixed",
    id: "proba_issue_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 1,
    theme: "neutral",
    text: "Une roue est partagée en 4 secteurs de couleurs différentes. Combien d’issues a-t-elle ?",
    format: "qcm",
    choices: ["4", "2", "1", "8"],
    expected: ["4"],
    comparator: "mcq_exact",
    hint: "Une issue par secteur.",
    explanation:
      "Définition : chaque secteur est une issue possible.\n\n" +
      "Méthode : on compte les secteurs.\n\n" +
      "Calcul : 4 secteurs = 4 issues.\n\n" +
      "Conclusion : il y a 4 issues.",
    tags: ["proba_experience", "issue", "qcm"],
  },
  {
    kind: "fixed",
    id: "proba_issue_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 2,
    theme: "neutral",
    text: "Quelles sont les issues possibles lorsqu’on lance une pièce ?",
    format: "qcm",
    choices: ["pile et face", "1 et 6", "rouge et bleu", "vrai et impossible"],
    expected: ["pile et face"],
    comparator: "mcq_exact",
    hint: "Une pièce a deux côtés.",
    explanation:
      "Définition : les issues sont les résultats possibles.\n\n" +
      "Méthode : on liste les deux côtés de la pièce.\n\n" +
      "Calcul : ce sont pile et face.\n\n" +
      "Conclusion : les issues sont pile et face.",
    tags: ["proba_experience", "issue", "qcm"],
  },
  {
    kind: "template",
    id: "proba_issue_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 1,
    theme: "neutral",
    hint: "Liste tous les résultats possibles, puis compte-les.",
    tags: ["proba_experience", "issue", "template"],
    generate: genIssueNombre,
  },
  {
    kind: "template",
    id: "proba_issue_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 2,
    theme: "neutral",
    hint: "Passe en revue toutes les issues et garde celles qui réalisent l'événement.",
    tags: ["proba_experience", "issue", "template"],
    generate: genIssueFavorables,
  },
  {
    kind: "fixed",
    id: "proba_issue_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 2,
    theme: "neutral",
    text: "Comment trouve-t-on le nombre d’issues d’une expérience aléatoire ?",
    format: "qcm",
    choices: [
      "on liste tous les résultats possibles, puis on les compte",
      "on fait l’expérience une fois et on regarde le résultat",
      "on compte seulement les résultats favorables",
      "c’est toujours 6",
    ],
    expected: ["on liste tous les résultats possibles, puis on les compte"],
    comparator: "mcq_exact",
    hint: "On liste les résultats possibles.",
    explanation:
      "Définition : le nombre d’issues est le nombre de résultats possibles.\n\n" +
      "Méthode : on liste tous les résultats que l’expérience peut donner.\n\n" +
      "Calcul : on les compte un par un.\n\n" +
      "Conclusion : le nombre d’issues est le nombre de résultats possibles.",
    tags: ["proba_experience", "issue", "open"],
  },

  // ---------- ÉVÉNEMENTS ----------
  {
    kind: "fixed",
    id: "proba_evenement_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_evenement",
    difficulty: 2,
    theme: "neutral",
    text: "Au lancer d’un dé, l’événement « obtenir un nombre positif » est…",
    format: "qcm",
    choices: ["certain", "impossible", "improbable", "vide"],
    expected: ["certain"],
    comparator: "mcq_exact",
    hint: "Toutes les faces sont positives.",
    explanation:
      "Définition : un événement certain se réalise toujours.\n\n" +
      "Méthode : on vérifie que toutes les issues le réalisent.\n\n" +
      "Calcul : 1, 2, 3, 4, 5, 6 sont tous positifs.\n\n" +
      "Conclusion : l’événement est certain.",
    tags: ["proba_experience", "evenement", "certain", "qcm"],
    canvas: deCanvas([1, 2, 3, 4, 5, 6]),
  },
  {
    kind: "fixed",
    id: "proba_evenement_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_evenement",
    difficulty: 2,
    theme: "neutral",
    text: "Au lancer d’un dé, quel est l’événement contraire de « obtenir 6 » ?",
    format: "qcm",
    choices: ["ne pas obtenir 6", "obtenir un nombre pair", "obtenir 1", "obtenir 6 deux fois"],
    expected: ["ne pas obtenir 6"],
    comparator: "mcq_exact",
    hint: "Le contraire regroupe toutes les autres issues.",
    explanation:
      "Définition : l’événement contraire contient toutes les issues qui ne réalisent pas l’événement.\n\n" +
      "Méthode : on prend le complément de « obtenir 6 ».\n\n" +
      "Calcul : c’est « ne pas obtenir 6 » (soit 1, 2, 3, 4 ou 5).\n\n" +
      "Conclusion : le contraire est « ne pas obtenir 6 ».",
    tags: ["proba_experience", "evenement", "contraire", "qcm"],
  },
  {
    kind: "fixed",
    id: "proba_evenement_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_evenement",
    difficulty: 2,
    theme: "neutral",
    text: "Au lancer d’un dé, l’événement « obtenir un nombre supérieur à 4 » correspond à quelles issues ?",
    format: "qcm",
    choices: ["5 et 6", "4 et 5", "1, 2 et 3", "6 seulement"],
    expected: ["5 et 6"],
    comparator: "mcq_exact",
    hint: "Strictement supérieur à 4.",
    explanation:
      "Définition : un événement regroupe les issues qui le réalisent.\n\n" +
      "Méthode : on cherche les faces strictement supérieures à 4.\n\n" +
      "Calcul : ce sont 5 et 6.\n\n" +
      "Conclusion : les issues sont 5 et 6.",
    tags: ["proba_experience", "evenement", "qcm"],
    canvas: deCanvas([5, 6]),
  },
  {
    kind: "template",
    id: "proba_evenement_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_evenement",
    difficulty: 2,
    theme: "neutral",
    hint: "Certain = toujours ; impossible = jamais ; sinon, possible sans être certain.",
    tags: ["proba_experience", "evenement", "template"],
    // ⛔ RÉPARÉ LE 30/08/2026 : la table ne contenait que TROIS cas, et il
    // manquait la troisième réponse — POSSIBLE. Avec seulement « certain » et
    // « impossible », l'élève apprenait un faux dilemme.
    // ⭐ 04/10/2026 : dés, roues, cartes, sacs, mots — plus seulement le dé.
    generate: genEvtNature3,
  },
  {
    kind: "template",
    id: "proba_evenement_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_evenement",
    difficulty: 3,
    theme: "neutral",
    hint: "Écris toutes les issues, barre celles de l'événement : le contraire, c'est ce qui reste.",
    tags: ["proba_experience", "evenement", "contraire", "template"],
    // ⭐ 04/10/2026 — on liste les issues du contraire : c'est là que les
    // bornes (« strictement », « ou égal ») se paient.
    generate: genEvtContraireListe,
  },
  {
    kind: "fixed",
    id: "proba_evenement_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_evenement",
    difficulty: 3,
    theme: "neutral",
    text: "Qu’est-ce que l’événement contraire d’un événement A ?",
    format: "qcm",
    choices: [
      "l’événement formé de TOUTES les issues qui ne réalisent pas A",
      "une autre issue, prise au hasard, qui ne réalise pas A",
      "l’événement impossible",
      "l’événement formé des issues qui réalisent A",
    ],
    expected: ["l’événement formé de TOUTES les issues qui ne réalisent pas A"],
    comparator: "mcq_exact",
    hint: "Toutes les issues qui ne réalisent pas l’événement.",
    explanation:
      "Définition : l’événement contraire regroupe toutes les issues qui ne réalisent pas l’événement.\n\n" +
      "Méthode : on prend le complément de l’événement.\n\n" +
      "Calcul : par exemple le contraire de « pair » est « impair ».\n\n" +
      "Conclusion : le contraire regroupe les issues qui ne réalisent pas l’événement.",
    tags: ["proba_experience", "evenement", "open"],
  },

  // ---------- ÉQUIPROBABILITÉ ----------
  {
    kind: "fixed",
    id: "proba_equiprobabilite_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_equiprobabilite",
    difficulty: 1,
    theme: "neutral",
    text: "Avec une pièce équilibrée, pile et face ont-ils la même probabilité ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Une pièce équilibrée ne favorise aucun côté.",
    explanation:
      "Définition : une situation est équiprobable si toutes les issues ont la même probabilité.\n\n" +
      "Méthode : on vérifie que la pièce n’est pas truquée.\n\n" +
      "Calcul : pile et face ont chacun une probabilité 1/2.\n\n" +
      "Conclusion : oui, c’est équiprobable.",
    tags: ["proba_experience", "equiprobabilite", "qcm"],
  },
  {
    kind: "fixed",
    id: "proba_equiprobabilite_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_equiprobabilite",
    difficulty: 2,
    theme: "neutral",
    text: "Un dé est truqué pour tomber plus souvent sur 6. La situation est-elle équiprobable ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Une face est favorisée.",
    explanation:
      "Définition : l’équiprobabilité exige que toutes les issues aient la même probabilité.\n\n" +
      "Méthode : on vérifie si une issue est favorisée.\n\n" +
      "Calcul : ici 6 est favorisé, donc les probabilités diffèrent.\n\n" +
      "Conclusion : non, ce n’est pas équiprobable.",
    tags: ["proba_experience", "equiprobabilite", "qcm"],
  },
  {
    kind: "fixed",
    id: "proba_equiprobabilite_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_equiprobabilite",
    difficulty: 2,
    theme: "neutral",
    text: "« Équiprobable » signifie que…",
    format: "qcm",
    choices: [
      "toutes les issues ont la même probabilité",
      "il y a une seule issue",
      "la probabilité est nulle",
      "une issue est favorisée",
    ],
    expected: ["toutes les issues ont la même probabilité"],
    comparator: "mcq_exact",
    hint: "« équi » = égal.",
    explanation:
      "Définition : équiprobable signifie « même probabilité pour toutes les issues ».\n\n" +
      "Méthode : on compare les probabilités des issues.\n\n" +
      "Calcul : si elles sont toutes égales, c’est équiprobable.\n\n" +
      "Conclusion : équiprobable = toutes les issues ont la même probabilité.",
    tags: ["proba_experience", "equiprobabilite", "qcm"],
  },
  {
    kind: "fixed",
    id: "proba_equiprobabilite_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_equiprobabilite",
    difficulty: 2,
    theme: "neutral",
    text: "Avec un dé équilibré, quelle est la probabilité de chaque face ?",
    format: "qcm",
    choices: ["1/6", "1/2", "1/3", "6"],
    expected: ["1/6"],
    comparator: "mcq_exact",
    hint: "6 faces équiprobables.",
    explanation:
      "Définition : en situation équiprobable, chaque issue a la même probabilité.\n\n" +
      "Méthode : on divise 1 par le nombre d’issues.\n\n" +
      "Calcul : 1 ÷ 6 = 1/6.\n\n" +
      "Conclusion : chaque face a une probabilité 1/6.",
    tags: ["proba_experience", "equiprobabilite", "qcm"],
    canvas: deCanvas(),
  },
  {
    kind: "fixed",
    id: "proba_equiprobabilite_fixed_6",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_equiprobabilite",
    difficulty: 2,
    theme: "neutral",
    text: "Une roue partagée en 3 secteurs identiques est-elle équiprobable ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Secteurs identiques = mêmes chances.",
    explanation:
      "Définition : l’équiprobabilité exige des issues de même probabilité.\n\n" +
      "Méthode : on compare les tailles des secteurs.\n\n" +
      "Calcul : 3 secteurs identiques donnent chacun 1/3.\n\n" +
      "Conclusion : oui, c’est équiprobable.",
    tags: ["proba_experience", "equiprobabilite", "roue", "qcm"],
    canvas: roueCanvas([
      { label: "A", poids: 1, couleur: couleurs.rouge },
      { label: "B", poids: 1, couleur: couleurs.bleu },
      { label: "C", poids: 1, couleur: couleurs.vert },
    ]),
  },
  {
    kind: "template",
    id: "proba_equiprobabilite_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_equiprobabilite",
    difficulty: 2,
    theme: "neutral",
    hint: "Compare les effectifs des deux catégories.",
    tags: ["proba_experience", "equiprobabilite", "billes", "template"],
    // ⛔ RÉPARÉ LE 30/08/2026 : tantôt on demande si c'est équiprobable, tantôt
    // COMBIEN il faut ajouter pour que ça le devienne. ⭐ 04/10/2026 : dix-sept
    // scènes au lieu du seul sac de billes rouges et bleues.
    generate: genEquiSac,
  },
  {
    kind: "fixed",
    id: "proba_equiprobabilite_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_equiprobabilite",
    difficulty: 2,
    theme: "neutral",
    text: "Laquelle de ces situations est équiprobable ?",
    format: "qcm",
    choices: [
      "lancer un dé équilibré : chaque face a la même probabilité, 1/6",
      "tirer un penalty : marquer ou rater",
      "lancer une punaise : pointe en haut ou pointe en bas",
      "regarder le ciel demain : pluie ou pas de pluie",
    ],
    expected: ["lancer un dé équilibré : chaque face a la même probabilité, 1/6"],
    comparator: "mcq_exact",
    hint: "Pense au dé équilibré.",
    explanation:
      "Définition : une situation est équiprobable si toutes les issues ont la même probabilité.\n\n" +
      "Méthode : on vérifie qu’aucune issue n’est favorisée.\n\n" +
      "Calcul : un dé équilibré donne 1/6 pour chaque face.\n\n" +
      "Conclusion : équiprobable signifie que toutes les issues ont la même probabilité.",
    tags: ["proba_experience", "equiprobabilite", "open"],
  },

  // ---------- CALCULER UNE PROBABILITÉ ----------
  {
    kind: "fixed",
    id: "proba_calculer_fraction_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_calculer_fraction",
    difficulty: 2,
    theme: "neutral",
    text: "On lance un dé équilibré. Quelle est la probabilité d’obtenir 3 ?",
    format: "qcm",
    // ⚠️ 04/10/2026 — « 1/2 » côtoyait « 3/6 » : deux propositions de même
    // valeur. Remplacé par « 1/5 » (1 face favorable rapportée aux 5 autres).
    choices: ["1/6", "3/6", "1/3", "1/5"],
    expected: ["1/6"],
    comparator: "mcq_exact",
    hint: "Une seule face favorable sur six.",
    explanation:
      "Définition : probabilité = cas favorables ÷ cas possibles.\n\n" +
      "Méthode : il y a 1 face « 3 » sur 6.\n\n" +
      "Calcul : 1 ÷ 6 = 1/6.\n\n" +
      "Conclusion : la probabilité est 1/6.",
    tags: ["proba_experience", "fraction", "qcm"],
    canvas: deCanvas([3]),
  },
  {
    kind: "fixed",
    id: "proba_calculer_fraction_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_calculer_fraction",
    difficulty: 2,
    theme: "neutral",
    text: "On lance un dé équilibré. Quelle est la probabilité d’obtenir un nombre impair ?",
    format: "qcm",
    choices: ["3/6", "1/6", "2/6", "4/6"],
    expected: ["3/6"],
    comparator: "mcq_exact",
    hint: "Les impairs sont 1, 3, 5.",
    explanation:
      "Définition : probabilité = cas favorables ÷ cas possibles.\n\n" +
      "Méthode : les impairs sont 1, 3, 5 (3 cas).\n\n" +
      "Calcul : 3 ÷ 6 = 3/6.\n\n" +
      "Conclusion : la probabilité est 3/6.",
    tags: ["proba_experience", "fraction", "qcm"],
    canvas: deCanvas([1, 3, 5]),
  },
  {
    kind: "template",
    id: "proba_calculer_fraction_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_calculer_fraction",
    difficulty: 2,
    theme: "neutral",
    hint: "Probabilité = cas favorables ÷ cas possibles.",
    tags: ["proba_experience", "fraction", "template"],
    generate: genCalcSimpleCourt,
  },
  {
    kind: "template",
    id: "proba_calculer_fraction_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_calculer_fraction",
    difficulty: 3,
    theme: "neutral",
    hint: "Liste les issues qui réalisent la condition — attention à « strictement ».",
    tags: ["proba_experience", "de", "fraction", "template"],
    generate: genCalcNumCourt,
  },
  {
    kind: "template",
    id: "proba_calculer_fraction_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_calculer_fraction",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne les cas favorables de toutes les catégories qui conviennent.",
    tags: ["proba_experience", "fraction", "template"],
    generate: genCalcUnionQcm,
  },
  {
    kind: "fixed",
    id: "proba_calculer_fraction_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_calculer_fraction",
    difficulty: 3,
    theme: "neutral",
    text: "Les issues étant équiprobables, comment calcule-t-on la probabilité d’un événement ?",
    format: "qcm",
    choices: [
      "nombre de cas favorables ÷ nombre de cas possibles",
      "nombre de cas possibles ÷ nombre de cas favorables",
      "nombre de cas favorables ÷ nombre de cas défavorables",
      "nombre de cas favorables × nombre de cas possibles",
    ],
    expected: ["nombre de cas favorables ÷ nombre de cas possibles"],
    comparator: "mcq_exact",
    hint: "C’est un quotient.",
    explanation:
      "Définition : une probabilité est un quotient.\n\n" +
      "Méthode : on divise le nombre de cas favorables par le nombre de cas possibles.\n\n" +
      "Calcul : probabilité = cas favorables ÷ cas possibles.\n\n" +
      "Conclusion : on divise les cas favorables par les cas possibles.",
    tags: ["proba_experience", "fraction", "open"],
  },

  // ---------- CONVERTIR ----------
  {
    kind: "fixed",
    id: "proba_convertir_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "La probabilité 1/4 correspond à…",
    format: "qcm",
    choices: ["25 %", "40 %", "14 %", "75 %"],
    expected: ["25 %"],
    comparator: "mcq_exact",
    hint: "1/4 = 0,25.",
    explanation:
      "Définition : on convertit une fraction en pourcentage.\n\n" +
      "Méthode : 1/4 = 0,25, puis × 100.\n\n" +
      "Calcul : 0,25 = 25 %.\n\n" +
      "Conclusion : 1/4 = 25 %.",
    tags: ["proba_experience", "pourcentage", "qcm"],
  },
  {
    kind: "fixed",
    id: "proba_convertir_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "La probabilité 1/10 correspond à…",
    format: "qcm",
    choices: ["10 %", "1 %", "100 %", "50 %"],
    expected: ["10 %"],
    comparator: "mcq_exact",
    hint: "1/10 = 0,1.",
    explanation:
      "Définition : on convertit la fraction en pourcentage.\n\n" +
      "Méthode : 1/10 = 0,1, puis × 100.\n\n" +
      "Calcul : 0,1 = 10 %.\n\n" +
      "Conclusion : 1/10 = 10 %.",
    tags: ["proba_experience", "pourcentage", "qcm"],
  },
  {
    kind: "fixed",
    id: "proba_convertir_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "Une probabilité de 0 correspond à quel pourcentage ?",
    format: "qcm",
    choices: ["0 %", "100 %", "50 %", "10 %"],
    expected: ["0 %"],
    comparator: "mcq_exact",
    hint: "Probabilité 0 = événement impossible.",
    explanation:
      "Définition : une probabilité de 0 correspond à un événement impossible.\n\n" +
      "Méthode : on convertit 0 en pourcentage.\n\n" +
      "Calcul : 0 × 100 = 0 %.\n\n" +
      "Conclusion : une probabilité de 0 vaut 0 %.",
    tags: ["proba_experience", "pourcentage", "qcm"],
  },
  {
    kind: "fixed",
    id: "proba_convertir_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "Une probabilité de 1 correspond à quel pourcentage ?",
    format: "qcm",
    choices: ["100 %", "10 %", "50 %", "0 %"],
    expected: ["100 %"],
    comparator: "mcq_exact",
    hint: "Probabilité 1 = événement certain.",
    explanation:
      "Définition : une probabilité de 1 correspond à un événement certain.\n\n" +
      "Méthode : on convertit 1 en pourcentage.\n\n" +
      "Calcul : 1 × 100 = 100 %.\n\n" +
      "Conclusion : une probabilité de 1 vaut 100 %.",
    tags: ["proba_experience", "pourcentage", "qcm"],
  },
  {
    kind: "template",
    id: "proba_convertir_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_convertir",
    difficulty: 3,
    theme: "neutral",
    hint: "Écris le pourcentage sur 100, puis simplifie au maximum.",
    tags: ["proba_experience", "pourcentage", "reciproque", "template"],
    generate: genConvVersFraction,
  },
  {
    kind: "template",
    id: "proba_convertir_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_convertir",
    difficulty: 3,
    theme: "neutral",
    hint: "Décimal → pourcentage : × 100. Pourcentage → décimal : ÷ 100.",
    tags: ["proba_experience", "pourcentage", "template"],
    generate: genConvDecPct,
  },
  {
    kind: "fixed",
    id: "proba_convertir_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_convertir",
    difficulty: 3,
    theme: "neutral",
    text: "Pourquoi une probabilité est-elle toujours comprise entre 0 % et 100 % ?",
    format: "qcm",
    choices: [
      "parce que les cas favorables sont au plus aussi nombreux que les cas possibles : 0 % = impossible, 100 % = certain",
      "parce qu’on arrondit toujours les pourcentages",
      "parce qu’une probabilité est toujours égale à 50 %",
      "c’est faux : une probabilité peut dépasser 100 %",
    ],
    expected: ["parce que les cas favorables sont au plus aussi nombreux que les cas possibles : 0 % = impossible, 100 % = certain"],
    comparator: "mcq_exact",
    hint: "0 = impossible, 100 % = certain.",
    explanation:
      "Définition : une probabilité est comprise entre 0 et 1, soit 0 % et 100 %.\n\n" +
      "Méthode : 0 correspond à l’impossible, 1 au certain.\n\n" +
      "Calcul : aucun événement ne peut avoir plus de 100 % de chances.\n\n" +
      "Conclusion : une probabilité est toujours entre 0 % et 100 %.",
    tags: ["proba_experience", "pourcentage", "open"],
  },

  // ---------- COMPARER ----------
  {
    kind: "fixed",
    id: "proba_comparer_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle probabilité est la plus grande : 3/6 ou 2/6 ?",
    format: "qcm",
    choices: ["3/6", "2/6", "elles sont égales"],
    expected: ["3/6"],
    comparator: "mcq_exact",
    hint: "Même dénominateur : on compare les numérateurs.",
    explanation:
      "Définition : à dénominateur égal, la plus grande probabilité a le plus grand numérateur.\n\n" +
      "Méthode : on compare 3 et 2.\n\n" +
      "Calcul : 3 > 2.\n\n" +
      "Conclusion : 3/6 est la plus grande.",
    tags: ["proba_experience", "comparer", "qcm"],
  },
  {
    kind: "fixed",
    id: "proba_comparer_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Une probabilité plus grande signifie…",
    format: "qcm",
    choices: [
      "plus de chances que l’événement se produise",
      "moins de chances que l’événement se produise",
      "que l’événement se produira à coup sûr",
      "que l’événement s’est déjà produit souvent",
    ],
    expected: ["plus de chances que l’événement se produise"],
    comparator: "mcq_exact",
    hint: "Plus la probabilité est proche de 1, plus c’est probable.",
    explanation:
      "Définition : une probabilité mesure la chance d’un événement.\n\n" +
      "Méthode : on compare les valeurs.\n\n" +
      "Calcul : plus la probabilité est grande, plus l’événement est probable.\n\n" +
      "Conclusion : une probabilité plus grande = plus de chances.",
    tags: ["proba_experience", "comparer", "qcm"],
  },
  {
    kind: "fixed",
    id: "proba_comparer_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Les probabilités 1/2 et 50 % sont-elles égales ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "1/2 = 0,5 = 50 %.",
    explanation:
      "Définition : une probabilité peut s’écrire en fraction ou en pourcentage.\n\n" +
      "Méthode : on convertit 1/2 en pourcentage.\n\n" +
      "Calcul : 1/2 = 0,5 = 50 %.\n\n" +
      "Conclusion : oui, elles sont égales.",
    tags: ["proba_experience", "comparer", "qcm"],
  },
  {
    kind: "template",
    id: "proba_comparer_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les issues favorables de chaque événement.",
    tags: ["proba_experience", "comparer", "template"],
    generate: genCompDeuxEvts,
  },
  {
    kind: "template",
    id: "proba_comparer_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Écris les trois probabilités de la même façon (toutes en décimal, par exemple).",
    tags: ["proba_experience", "comparer", "template"],
    generate: genCompTroisEcritures,
  },
  {
    kind: "fixed",
    id: "proba_comparer_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Comment comparer deux probabilités écrites en fractions de dénominateurs différents, comme 2/3 et 3/5 ?",
    format: "qcm",
    choices: [
      "on les écrit au même dénominateur (10/15 et 9/15), ou en pourcentage, puis on compare",
      "on compare seulement les numérateurs : 3 > 2",
      "on compare seulement les dénominateurs : 5 > 3",
      "on ne peut pas les comparer",
    ],
    expected: ["on les écrit au même dénominateur (10/15 et 9/15), ou en pourcentage, puis on compare"],
    comparator: "mcq_exact",
    hint: "On peut les mettre au même dénominateur ou en pourcentage.",
    explanation:
      "Définition : comparer deux probabilités, c’est comparer deux fractions.\n\n" +
      "Méthode : on les met au même dénominateur ou on les convertit en pourcentage.\n\n" +
      "Calcul : on compare ensuite les numérateurs ou les pourcentages.\n\n" +
      "Conclusion : on uniformise l’écriture avant de comparer.",
    tags: ["proba_experience", "comparer", "open"],
  },

  // ---------- DÉFIS ----------
  {
    kind: "fixed",
    id: "proba_defi_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Une probabilité de 0 signifie que l’événement est…",
    format: "qcm",
    choices: ["impossible", "certain", "probable", "équiprobable"],
    expected: ["impossible"],
    comparator: "mcq_exact",
    hint: "0 = aucune chance.",
    explanation:
      "Définition : une probabilité de 0 correspond à un événement impossible.\n\n" +
      "Méthode : aucune issue ne réalise l’événement.\n\n" +
      "Calcul : 0 cas favorable sur les cas possibles.\n\n" +
      "Conclusion : l’événement est impossible.",
    tags: ["proba_experience", "defi", "qcm"],
  },
  {
    kind: "fixed",
    id: "proba_defi_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 4,
    theme: "neutral",
    text: "On lance un dé. La probabilité d’obtenir « pair » est 3/6. Quelle est la probabilité d’obtenir « impair » ?",
    format: "qcm",
    choices: ["3/6", "1/6", "2/6", "6/6"],
    expected: ["3/6"],
    comparator: "mcq_exact",
    hint: "L’événement contraire : 1 - 3/6.",
    explanation:
      "Définition : la probabilité de l’événement contraire vaut 1 moins la probabilité de l’événement.\n\n" +
      "Méthode : on calcule 1 - 3/6.\n\n" +
      "Calcul : 6/6 - 3/6 = 3/6.\n\n" +
      "Conclusion : la probabilité d’obtenir « impair » est 3/6.",
    tags: ["proba_experience", "defi", "contraire", "qcm"],
  },
  {
    kind: "fixed",
    id: "proba_defi_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 4,
    theme: "neutral",
    text: "La somme des probabilités de toutes les issues d’une expérience vaut…",
    format: "qcm",
    choices: ["1", "0", "100", "le nombre d’issues"],
    expected: ["1"],
    comparator: "mcq_exact",
    hint: "Toutes les issues couvrent l’ensemble des cas.",
    explanation:
      "Définition : la somme des probabilités de toutes les issues vaut 1.\n\n" +
      "Méthode : on additionne les probabilités de chaque issue.\n\n" +
      "Calcul : par exemple 6 × (1/6) = 1.\n\n" +
      "Conclusion : la somme vaut 1.",
    tags: ["proba_experience", "defi", "qcm"],
  },
  {
    kind: "template",
    id: "proba_defi_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Les autres objets ne changent pas : cherche une fraction égale à la probabilité visée.",
    tags: ["proba_experience", "defi", "billes", "template"],
    generate: genDefiAjouter,
  },
  {
    kind: "template",
    id: "proba_defi_tpl_4_contraire",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Les probabilités de toutes les catégories ont pour somme 1.",
    tags: ["proba_experience", "defi", "contraire", "template"],
    generate: genDefiTroisieme,
  },
  {
    kind: "fixed",
    id: "proba_defi_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Pourquoi la probabilité d’un événement et celle de son contraire ont-elles pour somme 1 ?",
    format: "qcm",
    choices: [
      "parce qu’à eux deux ils regroupent toutes les issues, une seule fois chacune",
      "parce qu’un événement et son contraire ont toujours la probabilité 1/2",
      "parce que l’événement contraire est impossible",
      "c’est faux : la somme vaut 2",
    ],
    expected: ["parce qu’à eux deux ils regroupent toutes les issues, une seule fois chacune"],
    comparator: "mcq_exact",
    hint: "Ensemble, ils couvrent toutes les issues.",
    explanation:
      "Définition : un événement et son contraire couvrent toutes les issues possibles.\n\n" +
      "Méthode : on additionne leurs probabilités.\n\n" +
      "Calcul : comme toutes les issues sont couvertes, la somme vaut 1.\n\n" +
      "Conclusion : probabilité d’un événement + probabilité de son contraire = 1.",
    tags: ["proba_experience", "defi", "open"],
  },

  /* =========================================================
     GÉNÉRATEURS AJOUTÉS LE 04/10/2026 — une étoile servie n'avait
     souvent QUE des items figés (vocabulaire ★1, événements ★1,
     convertir ★2, comparer ★2, défis ★4) : l'élève y revoyait les
     mêmes cinq phrases.
  ========================================================= */
  {
    kind: "template",
    id: "proba_vocabulaire_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    hint: "Une expérience est aléatoire quand, recommencée, elle peut donner un autre résultat.",
    tags: ["proba_experience", "vocabulaire", "template"],
    generate: genVocabAleatoire,
  },
  {
    kind: "template",
    id: "proba_vocabulaire_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    hint: "Une issue est un résultat que l'expérience peut réellement donner.",
    tags: ["proba_experience", "vocabulaire", "issue", "template"],
    generate: genVocabIssuePossible,
  },
  {
    kind: "template",
    id: "proba_issue_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 2,
    theme: "neutral",
    hint: "Toutes les issues, sans en oublier, sans en ajouter.",
    tags: ["proba_experience", "issue", "template"],
    generate: genIssueListe,
  },
  {
    kind: "template",
    id: "proba_evenement_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_evenement",
    difficulty: 1,
    theme: "neutral",
    hint: "Toutes les issues le réalisent ? certain. Aucune ? impossible.",
    tags: ["proba_experience", "evenement", "certain", "impossible", "template"],
    generate: genEvtCertImp,
  },
  {
    kind: "template",
    id: "proba_evenement_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_evenement",
    difficulty: 1,
    theme: "neutral",
    hint: "L'issue obtenue vérifie-t-elle la condition de l'événement ?",
    tags: ["proba_experience", "evenement", "template"],
    generate: genEvtRealise,
  },
  {
    kind: "template",
    id: "proba_evenement_tpl_6",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_evenement",
    difficulty: 3,
    theme: "neutral",
    hint: "Nombre d'issues du contraire = nombre total d'issues − nombre d'issues de l'événement.",
    tags: ["proba_experience", "evenement", "contraire", "template"],
    generate: genEvtContraireCompte,
  },
  {
    kind: "template",
    id: "proba_equiprobabilite_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_equiprobabilite",
    difficulty: 1,
    theme: "neutral",
    hint: "Une issue est-elle favorisée (objet truqué, secteur plus grand, effectif plus nombreux) ?",
    tags: ["proba_experience", "equiprobabilite", "template"],
    generate: genEquiSituation,
  },
  {
    kind: "template",
    id: "proba_equiprobabilite_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_equiprobabilite",
    difficulty: 2,
    theme: "neutral",
    hint: "En situation d'équiprobabilité, chaque issue a pour probabilité 1 ÷ (nombre d'issues).",
    tags: ["proba_experience", "equiprobabilite", "fraction", "template"],
    generate: genEquiChaqueIssue,
  },
  {
    kind: "template",
    id: "proba_convertir_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_convertir",
    difficulty: 2,
    theme: "neutral",
    hint: "Une fraction est une division : divise le numérateur par le dénominateur.",
    tags: ["proba_experience", "decimal", "template"],
    generate: genConvDecimal,
  },
  {
    kind: "template",
    id: "proba_convertir_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_convertir",
    difficulty: 2,
    theme: "neutral",
    hint: "Écris la fraction en décimal, puis multiplie par 100.",
    tags: ["proba_experience", "pourcentage", "template"],
    generate: genConvPourcentQcm,
  },
  {
    kind: "template",
    id: "proba_comparer_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Même total pour tous : compare les effectifs.",
    tags: ["proba_experience", "comparer", "billes", "template"],
    generate: genCompSacQcm,
  },
  {
    kind: "template",
    id: "proba_comparer_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Même dénominateur : compare les numérateurs. Même numérateur : le plus petit dénominateur gagne.",
    tags: ["proba_experience", "comparer", "template"],
    generate: genCompDeuxJeux,
  },
  {
    kind: "template",
    id: "proba_defi_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Probabilité du contraire = 1 − probabilité de l'événement.",
    tags: ["proba_experience", "defi", "contraire", "template"],
    generate: genDefiContraireValeur,
  },
  {
    kind: "template",
    id: "proba_defi_tpl_6",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche une fraction égale à la probabilité donnée, dont le numérateur est l'effectif connu.",
    tags: ["proba_experience", "defi", "template"],
    generate: genDefiEffectifManquant,
  },
];
