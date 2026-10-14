// lib/tutor-v4/question-banks/maths/5e/probabilites.bank.ts

import type {
  TutorBankItemV4,
  CanvasProbabilitesData,
} from "@/lib/tutor-v4/types";
import { PRENOMS, de, type Prenom } from "@/lib/tutor-v4/questionBank/6e/maths/entiers.bank";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function pgcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : pgcd(b, a % b);
}

function fraction(n: number, d: number) {
  const g = pgcd(n, d);
  return `${n / g}/${d / g}`;
}

function rawFraction(n: number, d: number) {
  return `${n}/${d}`;
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  // Jamais deux fois la même ligne. Un gabarit dont le piège coïncide avec la
  // bonne réponse (les coordonnées inversées quand x = y, un arrondi égal à la
  // valeur de départ…) affichait la même proposition deux fois, et l'élève
  // voyait deux réponses justes.
  // ⚠️ 04/08/2026 — la version précédente dédoublonnait PUIS coupait à quatre :
  // avec cinq distracteurs, le mélange pouvait renvoyer la bonne réponse en
  // cinquième position et le découpage l'emportait. L'élève ne pouvait alors
  // pas réussir, et rien ne le signalait. On met désormais la bonne réponse de
  // côté, on tire trois distracteurs, puis on mélange l'ensemble.
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

const couleurs = {
  rouge: "#ef4444",
  bleu: "#3b82f6",
  vert: "#22c55e",
  jaune: "#eab308",
  violet: "#a855f7",
  orange: "#f97316",
};

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
function billesCanvas(
  elements: { label?: string; couleur: string }[]
): CanvasProbabilitesData {
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

function expl(calcul: string) {
  return (
    "Définition : une probabilité mesure la chance qu’un événement se produise entre 0 et 1.\n\n" +
    "Méthode : on compte les issues favorables et les issues possibles, puis on forme le quotient.\n\nCalcul : " +
    calcul +
    "\n\nConclusion : la probabilité obtenue répond à la question."
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   LES SITUATIONS (09/10/2026) — gabarits variés ET corrigés.
   Mesuré le 09/10 : 5 micros sur 5 sous le seuil (8 à 21 squelettes, 11 à 18
   répétitions sur 20). Chaque gabarit compose maintenant une SITUATION (sac,
   bocal, roue, cartes, loto…) × une TOURNURE × un PRÉNOM. Le texte écrit
   TOUJOURS le contenu en clair (« 3 billes rouges et 5 billes bleues »,
   « numérotées de 1 à 12 ») et l'événement entre guillemets : le correcteur
   (correcteurs/probabilites.ts) recompte les issues à partir de ce texte.
   ═══════════════════════════════════════════════════════════════════════════ */

const ri = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
const pick = <T,>(arr: readonly T[]): T => arr[Math.floor(Math.random() * arr.length)];
const melange = <T,>(arr: readonly T[]): T[] => [...arr].sort(() => Math.random() - 0.5);
const maj = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const ilElle = (p: Prenom) => (p.f ? "elle" : "il");
/** « a », « a et b », « a, b et c ». */
const listeFr = (xs: string[]) => (xs.length <= 1 ? xs.join("") : `${xs.slice(0, -1).join(", ")} et ${xs[xs.length - 1]}`);
/** Fraction réduite « 3/4 » (ou « 1 », « 0 »). */
function reduite(a: number, b: number) {
  if (a === 0) return "0";
  const g = pgcd(a, b);
  return b / g === 1 ? String(a / g) : `${a / g}/${b / g}`;
}
/** Les écritures acceptées d'une probabilité a/b : brute, puis réduite. */
const ecritures = (a: number, b: number) => [...new Set([a === 0 ? "0" : a === b ? "1" : `${a}/${b}`, reduite(a, b)])];
const pl = (n: number, s: string, p = `${s}s`) => (n > 1 ? p : s);
function pe(def: string, meth: string, obs: string, ccl: string) {
  return `Définition : ${def}\n\nMéthode : ${meth}\n\nObservation : ${obs}\n\nConclusion : ${ccl}`;
}

type Coul = "rouge" | "bleu" | "vert" | "jaune" | "violet" | "orange" | "rose" | "noir" | "blanc";
// masculin singulier, féminin singulier, masculin pluriel, féminin pluriel
const ACCORDS: Record<Coul, readonly [string, string, string, string]> = {
  rouge: ["rouge", "rouge", "rouges", "rouges"],
  bleu: ["bleu", "bleue", "bleus", "bleues"],
  vert: ["vert", "verte", "verts", "vertes"],
  jaune: ["jaune", "jaune", "jaunes", "jaunes"],
  violet: ["violet", "violette", "violets", "violettes"],
  orange: ["orange", "orange", "orange", "orange"],
  rose: ["rose", "rose", "roses", "roses"],
  noir: ["noir", "noire", "noirs", "noires"],
  blanc: ["blanc", "blanche", "blancs", "blanches"],
};
const accorde = (c: Coul, f: boolean, pluriel: boolean) => ACCORDS[c][(f ? 1 : 0) + (pluriel ? 2 : 0)];

type Objet = { s: string; p: string; f: boolean; couleurs: Coul[] };
const TOUTES: Coul[] = ["rouge", "bleu", "vert", "jaune", "violet", "orange", "noir", "blanc"];
const OBJ = {
  bille: { s: "bille", p: "billes", f: true, couleurs: TOUTES },
  jeton: { s: "jeton", p: "jetons", f: false, couleurs: TOUTES },
  bonbon: { s: "bonbon", p: "bonbons", f: false, couleurs: ["rouge", "vert", "jaune", "orange", "rose", "blanc"] },
  stylo: { s: "stylo", p: "stylos", f: false, couleurs: TOUTES },
  perle: { s: "perle", p: "perles", f: true, couleurs: TOUTES },
  chaussette: { s: "chaussette", p: "chaussettes", f: true, couleurs: ["rouge", "bleu", "vert", "noir", "blanc", "jaune"] },
  ballon: { s: "ballon", p: "ballons", f: false, couleurs: ["rouge", "bleu", "vert", "jaune", "rose", "violet", "orange"] },
  pomme: { s: "pomme", p: "pommes", f: true, couleurs: ["rouge", "vert", "jaune"] },
  carte: { s: "carte", p: "cartes", f: true, couleurs: ["rouge", "bleu", "vert", "jaune", "violet", "orange"] },
  cube: { s: "cube", p: "cubes", f: false, couleurs: TOUTES },
  macaron: { s: "macaron", p: "macarons", f: false, couleurs: ["rose", "vert", "jaune", "violet", "blanc", "orange"] },
  dossard: { s: "dossard", p: "dossards", f: false, couleurs: ["rouge", "bleu", "vert", "jaune", "orange", "blanc"] },
  bracelet: { s: "bracelet", p: "bracelets", f: false, couleurs: ["rouge", "bleu", "vert", "jaune", "violet", "noir"] },
  casquette: { s: "casquette", p: "casquettes", f: true, couleurs: ["rouge", "bleu", "vert", "noir", "blanc", "jaune"] },
} satisfies Record<string, Objet>;
const un = (o: Objet) => (o.f ? "une" : "un");

type CtxUrne = { o: Objet; pose: (p: Prenom, contenu: string) => string; tire: (p: Prenom) => string; v: string };
const CTX_URNES: CtxUrne[] = [
  { o: OBJ.bille, pose: (p, c) => `Dans le sac ${de(p.nom)}, il y a ${c}.`, tire: (p) => `${p.nom} tire une bille au hasard.`, v: "tirer" },
  { o: OBJ.jeton, pose: (_p, c) => `Pour un jeu de plateau, une boîte contient ${c}.`, tire: (p) => `${p.nom} pioche un jeton au hasard.`, v: "piocher" },
  { o: OBJ.bonbon, pose: (p, c) => `Le paquet de bonbons ${de(p.nom)} contient ${c}.`, tire: (p) => `${maj(ilElle(p))} prend un bonbon au hasard, sans regarder.`, v: "prendre" },
  { o: OBJ.stylo, pose: (p, c) => `Dans la trousse ${de(p.nom)}, il y a ${c}.`, tire: (p) => `${maj(ilElle(p))} attrape un stylo au hasard.`, v: "attraper" },
  { o: OBJ.perle, pose: (p, c) => `Pour un collier, ${p.nom} a une boîte avec ${c}.`, tire: (p) => `${maj(ilElle(p))} prend une perle au hasard.`, v: "prendre" },
  { o: OBJ.chaussette, pose: (p, c) => `Dans le tiroir ${de(p.nom)}, il y a ${c}.`, tire: (p) => `Le matin, dans le noir, ${ilElle(p)} prend une chaussette au hasard.`, v: "prendre" },
  { o: OBJ.ballon, pose: (_p, c) => `Pour la fête du club, un carton contient ${c}.`, tire: (p) => `${p.nom} sort un ballon au hasard.`, v: "sortir" },
  { o: OBJ.pomme, pose: (_p, c) => `Au marché, un cageot contient ${c}.`, tire: (p) => `${p.nom} prend une pomme au hasard.`, v: "prendre" },
  { o: OBJ.carte, pose: (_p, c) => `Pour un jeu de cartes, on garde ${c}.`, tire: (p) => `${p.nom} tire une carte au hasard.`, v: "tirer" },
  { o: OBJ.cube, pose: (p, c) => `Dans la boîte de construction ${de(p.nom)}, il y a ${c}.`, tire: (p) => `${maj(ilElle(p))} prend un cube au hasard.`, v: "prendre" },
  { o: OBJ.macaron, pose: (_p, c) => `À la boulangerie, une boîte contient ${c}.`, tire: (p) => `${p.nom} choisit un macaron au hasard, les yeux fermés.`, v: "choisir" },
  { o: OBJ.dossard, pose: (_p, c) => `Avant la course d’orientation, un sac contient ${c}.`, tire: (p) => `${p.nom} prend un dossard au hasard.`, v: "prendre" },
  { o: OBJ.bracelet, pose: (_p, c) => `Au festival, un panier contient ${c}.`, tire: (p) => `${p.nom} reçoit un bracelet tiré au hasard.`, v: "recevoir" },
  { o: OBJ.casquette, pose: (_p, c) => `Au camp de vacances, un carton contient ${c}.`, tire: (p) => `${p.nom} prend une casquette au hasard.`, v: "prendre" },
  { o: OBJ.jeton, pose: (_p, c) => `À la kermesse de Saint-Denis, à La Réunion, une urne contient ${c}.`, tire: (p) => `${p.nom} pioche un jeton au hasard.`, v: "piocher" },
];

type Urne = { ctx: CtxUrne; p: Prenom; contenu: { c: Coul; n: number }[] };
/** Une urne aux effectifs imposés (couleurs tirées). */
function urneAvec(ns: number[], minCouleurs = ns.length + 1): Urne {
  const ctx = pick(CTX_URNES.filter((c) => c.o.couleurs.length >= minCouleurs));
  const cs = melange(ctx.o.couleurs).slice(0, ns.length);
  return { ctx, p: pick(PRENOMS), contenu: cs.map((c, i) => ({ c, n: ns[i] })) };
}
/** Une urne de `k` couleurs, de `nMin` à `nMax` objets chacune. */
const nouvelleUrne = (k: number, nMin: number, nMax: number) => urneAvec(Array.from({ length: k }, () => ri(nMin, nMax)));
const totalUrne = (u: Urne) => u.contenu.reduce((a, x) => a + x.n, 0);
const groupe = (o: Objet, c: Coul, n: number) => `${n} ${n > 1 ? o.p : o.s} ${accorde(c, o.f, n > 1)}`;
const situationUrne = (u: Urne) => `${u.ctx.pose(u.p, listeFr(u.contenu.map((x) => groupe(u.ctx.o, x.c, x.n))))} ${u.ctx.tire(u.p)}`;
/** « tirer une bille rouge », « … rouge ou bleue », « … qui n’est pas verte ». */
function evtUrne(u: Urne, cs: Coul[], pas = false) {
  const o = u.ctx.o;
  const a = cs.map((c) => accorde(c, o.f, false));
  return pas ? `${u.ctx.v} ${un(o)} ${o.s} qui n’est pas ${a[0]}` : `${u.ctx.v} ${un(o)} ${o.s} ${a.join(" ou ")}`;
}
const favUrne = (u: Urne, cs: Coul[], pas = false) =>
  u.contenu.filter((x) => (pas ? !cs.includes(x.c) : cs.includes(x.c))).reduce((a, x) => a + x.n, 0);
/** Le sac dessiné : un rond par objet (24 au plus). */
function canvasUrne(u: Urne): CanvasProbabilitesData | undefined {
  if (totalUrne(u) > 24) return undefined;
  return { kind: "probabilites", variant: "billes", billes: { elements: u.contenu.flatMap((x) => Array.from({ length: x.n }, () => ({ couleur: x.c }))) } };
}

// Les expériences à issues numérotées de 1 à N (équiprobables).
type CtxNum = { Ns: number[]; mot: "nombre" | "numéro"; pose: (p: Prenom, N: number) => string; canvas?: (N: number) => CanvasProbabilitesData | undefined };
const roueNum = (N: number): CanvasProbabilitesData => ({ kind: "probabilites", variant: "roue", roue: { segments: Array.from({ length: N }, (_, i) => ({ label: String(i + 1), poids: 1 })) } });
const CTX_NUM: CtxNum[] = [
  { Ns: [6], mot: "nombre", pose: (p, N) => `${p.nom} lance un dé équilibré à ${N} faces, numérotées de 1 à ${N}.`, canvas: () => deCanvas() },
  { Ns: [4, 8, 10, 12, 20], mot: "nombre", pose: (p, N) => `Pour un jeu de rôle, ${p.nom} lance un dé équilibré à ${N} faces, numérotées de 1 à ${N}.` },
  { Ns: [8, 10, 12, 15, 20], mot: "nombre", pose: (p, N) => `${p.nom} mélange ${N} cartes numérotées de 1 à ${N}, puis en tire une au hasard.` },
  { Ns: [4, 5, 6, 8, 10, 12], mot: "nombre", pose: (p, N) => `À la fête du village, une roue a ${N} secteurs de même taille, numérotés de 1 à ${N}. ${p.nom} la fait tourner.`, canvas: roueNum },
  { Ns: [10, 12, 15, 20, 25, 30], mot: "numéro", pose: (p, N) => `Au loto du collège, un sac contient ${N} boules numérotées de 1 à ${N}. ${p.nom} en tire une au hasard.` },
  { Ns: [20, 30, 40, 50], mot: "numéro", pose: (p, N) => `Pour la tombola, ${N} tickets numérotés de 1 à ${N} sont dans une urne. ${p.nom} en tire un au hasard.` },
  { Ns: [20, 24, 25, 28, 30], mot: "numéro", pose: (_p, N) => `Les ${N} élèves d’une classe de 5e sont numérotés de 1 à ${N}. La professeure tire un numéro au hasard.` },
  { Ns: [11, 12, 14, 15, 16, 18], mot: "numéro", pose: (p, N) => `Au club de handball, ${N} maillots numérotés de 1 à ${N} sont dans un sac. ${p.nom} en prend un au hasard.` },
  { Ns: [8, 10, 12, 15, 20], mot: "numéro", pose: (p, N) => `Dans un jeu vidéo, ${p.nom} joue sur une carte de ${N} niveaux numérotés de 1 à ${N}. Le jeu en choisit un au hasard.` },
  { Ns: [10, 12, 15, 20], mot: "numéro", pose: (p, N) => `En classe de mer, ${N} chambres sont numérotées de 1 à ${N}. ${p.nom} reçoit une chambre tirée au hasard.` },
  { Ns: [12, 15, 20, 24], mot: "numéro", pose: (p, N) => `Au zoo, ${N} enclos sont numérotés de 1 à ${N}. ${p.nom} tire au hasard le premier enclos à visiter.` },
  { Ns: [8, 10, 12], mot: "numéro", pose: (p, N) => `Dans la playlist ${de(p.nom)}, ${N} chansons sont numérotées de 1 à ${N}. Le lecteur en choisit une au hasard.` },
  { Ns: [10, 12, 16, 20], mot: "numéro", pose: (p, N) => `À la médiathèque, ${N} romans sont numérotés de 1 à ${N}. ${p.nom} en emprunte un au hasard.` },
  { Ns: [10, 15, 20], mot: "numéro", pose: (p, N) => `Au marché forain de Saint-Paul, à La Réunion, une loterie a ${N} billets numérotés de 1 à ${N}. ${p.nom} en tire un au hasard.` },
];
type Num = { ctx: CtxNum; p: Prenom; N: number };
function nouveauNum(filtre: (N: number) => boolean = () => true): Num {
  const ctx = pick(CTX_NUM.filter((c) => c.Ns.some(filtre)));
  return { ctx, p: pick(PRENOMS), N: pick(ctx.Ns.filter(filtre)) };
}
const situationNum = (x: Num) => x.ctx.pose(x.p, x.N);
type EvtNum = { lib: string; ok: (v: number) => boolean };
const EVN = {
  pair: (m: string): EvtNum => ({ lib: `obtenir un ${m} pair`, ok: (v) => v % 2 === 0 }),
  impair: (m: string): EvtNum => ({ lib: `obtenir un ${m} impair`, ok: (v) => v % 2 === 1 }),
  sup: (m: string, k: number): EvtNum => ({ lib: `obtenir un ${m} supérieur à ${k}`, ok: (v) => v > k }),
  inf: (m: string, k: number): EvtNum => ({ lib: `obtenir un ${m} inférieur à ${k}`, ok: (v) => v < k }),
  supEg: (m: string, k: number): EvtNum => ({ lib: `obtenir un ${m} supérieur ou égal à ${k}`, ok: (v) => v >= k }),
  infEg: (m: string, k: number): EvtNum => ({ lib: `obtenir un ${m} inférieur ou égal à ${k}`, ok: (v) => v <= k }),
  egal: (m: string, k: number): EvtNum => ({ lib: `obtenir le ${m} ${k}`, ok: (v) => v === k }),
  pas: (m: string, k: number): EvtNum => ({ lib: `ne pas obtenir le ${m} ${k}`, ok: (v) => v !== k }),
  mult: (_m: string, k: number): EvtNum => ({ lib: `obtenir un multiple de ${k}`, ok: (v) => v % k === 0 }),
  pairSup: (m: string, k: number): EvtNum => ({ lib: `obtenir un ${m} pair supérieur à ${k}`, ok: (v) => v % 2 === 0 && v > k }),
  impairInf: (m: string, k: number): EvtNum => ({ lib: `obtenir un ${m} impair inférieur à ${k}`, ok: (v) => v % 2 === 1 && v < k }),
};
const listeFav = (x: Num, e: EvtNum) => Array.from({ length: x.N }, (_, i) => i + 1).filter(e.ok);
const favNum = (x: Num, e: EvtNum) => listeFav(x, e).length;
/** Un événement simple « ni impossible ni certain » sur des issues numérotées. */
function evtNumSimple(x: Num): EvtNum {
  const m = x.ctx.mot;
  const k = ri(2, x.N - 1);
  return pick([EVN.pair(m), EVN.impair(m), EVN.sup(m, k), EVN.inf(m, k), EVN.supEg(m, k), EVN.infEg(m, k), EVN.egal(m, ri(1, x.N)), EVN.mult(m, ri(3, Math.min(6, x.N)))]);
}

// Les roues à secteurs de même taille, coloriés.
const SECTEUR: Objet = { s: "secteur", p: "secteurs", f: false, couleurs: ["rouge", "bleu", "vert", "jaune", "violet", "orange", "rose"] };
const INTROS_ROUE: ((p: Prenom) => string)[] = [
  (p) => `À la kermesse, ${p.nom} fait tourner une roue.`,
  (p) => `Dans un jeu de société, ${p.nom} fait tourner la roue des couleurs.`,
  (p) => `À la fête du collège, ${p.nom} lance la roue de la loterie.`,
  (p) => `Au centre aéré, ${p.nom} fait tourner la roue des activités.`,
  (p) => `En EPS, ${p.nom} fait tourner une roue pour choisir son équipe.`,
  (p) => `Au musée des sciences, ${p.nom} fait tourner une roue de jeu.`,
  (p) => `À la radio du collège, ${p.nom} fait tourner la roue des cadeaux.`,
  (p) => `Au camping, ${p.nom} fait tourner la roue du jeu du soir.`,
];
type Roue = { intro: (p: Prenom) => string; p: Prenom; contenu: { c: Coul; n: number }[] };
function roueAvec(ns: number[]): Roue {
  const cs = melange(SECTEUR.couleurs).slice(0, ns.length);
  return { intro: pick(INTROS_ROUE), p: pick(PRENOMS), contenu: cs.map((c, i) => ({ c, n: ns[i] })) };
}
const totalRoue = (r: Roue) => r.contenu.reduce((a, x) => a + x.n, 0);
const situationRoue = (r: Roue) =>
  `${r.intro(r.p)} La roue a ${totalRoue(r)} secteurs de même taille : ${listeFr(r.contenu.map((x) => groupe(SECTEUR, x.c, x.n)))}.`;
function evtRoue(cs: Coul[], pas = false) {
  const a = cs.map((c) => accorde(c, false, false));
  return pas ? `obtenir un secteur qui n’est pas ${a[0]}` : `obtenir un secteur ${a.join(" ou ")}`;
}
const favRoue = (r: Roue, cs: Coul[], pas = false) =>
  r.contenu.filter((x) => (pas ? !cs.includes(x.c) : cs.includes(x.c))).reduce((a, x) => a + x.n, 0);
const canvasRoue = (r: Roue): CanvasProbabilitesData => ({
  kind: "probabilites",
  variant: "roue",
  roue: { segments: melange(r.contenu.flatMap((x) => Array.from({ length: x.n }, () => ({ label: "", poids: 1, couleur: x.c })))) },
});

/** Une situation quelconque et un événement : issues numérotées, sac ou roue. */
type Sit = { texte: string; canvas?: CanvasProbabilitesData; lib: string; fav: number; total: number; detail: string };
function situationQuelconque(opts: { maxN?: number; compose?: boolean } = {}): Sit {
  const r = Math.random();
  if (r < 0.4) {
    const x = nouveauNum((N) => N <= (opts.maxN ?? 20));
    const m = x.ctx.mot;
    let e = evtNumSimple(x);
    if (opts.compose) {
      const k = ri(2, x.N - 2);
      e = pick([EVN.pairSup(m, k), EVN.impairInf(m, k + 1), EVN.pas(m, ri(1, x.N)), EVN.mult(m, ri(3, Math.min(6, x.N))), EVN.supEg(m, k)]);
    }
    const fav = favNum(x, e);
    if (fav === 0 || fav === x.N) return situationQuelconque(opts);
    return { texte: situationNum(x), canvas: x.ctx.canvas?.(x.N), lib: e.lib, fav, total: x.N, detail: `Issues favorables : ${listeFr(listeFav(x, e).map(String))}.` };
  }
  if (r < 0.75) {
    const u = nouvelleUrne(ri(2, 3), 1, 7);
    const cs = melange(u.contenu.map((x) => x.c));
    const genre = opts.compose && u.contenu.length === 3 ? pick(["ou", "pas"] as const) : opts.compose ? "pas" : "une";
    const choisis = genre === "ou" ? cs.slice(0, 2) : cs.slice(0, 1);
    const fav = favUrne(u, choisis, genre === "pas");
    return { texte: situationUrne(u), canvas: canvasUrne(u), lib: evtUrne(u, choisis, genre === "pas"), fav, total: totalUrne(u), detail: `Chaque ${u.ctx.o.s} est une issue : ${fav} ${pl(fav, "issue favorable", "issues favorables")} sur ${totalUrne(u)}.` };
  }
  const ro = roueAvec(Array.from({ length: ri(2, 3) }, () => ri(1, 4)));
  const cs = melange(ro.contenu.map((x) => x.c));
  const genre = opts.compose && ro.contenu.length === 3 ? pick(["ou", "pas"] as const) : opts.compose ? "pas" : "une";
  const choisis = genre === "ou" ? cs.slice(0, 2) : cs.slice(0, 1);
  const fav = favRoue(ro, choisis, genre === "pas");
  return { texte: situationRoue(ro), canvas: canvasRoue(ro), lib: evtRoue(choisis, genre === "pas"), fav, total: totalRoue(ro), detail: `Chaque secteur est une issue : ${fav} ${pl(fav, "secteur convient", "secteurs conviennent")} sur ${totalRoue(ro)}.` };
}

/** Un événement impossible ou certain, dans une situation tirée. */
function situationExtreme(cat: "impossible" | "certain"): Sit {
  const r = Math.random();
  if (r < 0.45) {
    const x = nouveauNum((N) => N <= 30);
    const m = x.ctx.mot;
    const N = x.N;
    const e =
      cat === "impossible"
        ? pick([EVN.sup(m, N + ri(0, 4)), EVN.egal(m, N + ri(1, 9)), EVN.supEg(m, N + ri(1, 5)), EVN.egal(m, 0)])
        : pick([EVN.infEg(m, N + ri(0, 4)), EVN.inf(m, N + ri(1, 5)), EVN.sup(m, 0), EVN.supEg(m, 1)]);
    const fav = favNum(x, e);
    return { texte: situationNum(x), canvas: x.ctx.canvas?.(x.N), lib: e.lib, fav, total: N, detail: `${fav} issues favorables sur ${N}.` };
  }
  if (r < 0.8) {
    const u = nouvelleUrne(ri(2, 3), 1, 6);
    const absente = pick(u.ctx.o.couleurs.filter((c) => !u.contenu.some((y) => y.c === c)));
    let cs: Coul[];
    let pas = false;
    if (cat === "impossible") cs = [absente];
    else if (u.contenu.length === 2 && Math.random() < 0.5) cs = u.contenu.map((y) => y.c);
    else { cs = [absente]; pas = true; }
    const fav = favUrne(u, cs, pas);
    return { texte: situationUrne(u), canvas: canvasUrne(u), lib: evtUrne(u, cs, pas), fav, total: totalUrne(u), detail: "" };
  }
  const ro = roueAvec(Array.from({ length: 2 }, () => ri(1, 4)));
  const absente = pick(SECTEUR.couleurs.filter((c) => !ro.contenu.some((y) => y.c === c)));
  const [cs, pas] = cat === "impossible" ? [[absente], false] : pick([[[absente], true], [ro.contenu.map((y) => y.c), false]] as [Coul[], boolean][]);
  const fav = favRoue(ro, cs, pas);
  return { texte: situationRoue(ro), canvas: canvasRoue(ro), lib: evtRoue(cs, pas), fav, total: totalRoue(ro), detail: "" };
}

/** Des expériences aléatoires, et des actions dont le résultat est connu d'avance. */
const EXP_ALEATOIRES = [
  "lancer un dé et noter le nombre obtenu",
  "lancer une pièce de monnaie",
  "tirer une carte au hasard dans un jeu",
  "faire tourner une roue de loterie",
  "tirer au sort le nom d’un gagnant",
  "piocher un jeton au hasard dans un sac",
  "prendre un bonbon au hasard dans un paquet",
  "tirer au sort l’équipe qui commence le match",
  "écouter une chanson choisie au hasard",
  "tirer une boule au hasard au loto",
  "lancer un dé à 12 faces",
  "tirer au sort l’ordre de passage à l’oral",
];
const EXP_DETERMINEES = [
  "compter les élèves de sa classe",
  "mesurer la longueur de sa table",
  "peser un sac de farine",
  "lire l’heure sur une horloge",
  "compter les pages d’un livre",
  "additionner deux nombres donnés",
  "regarder la date sur un calendrier",
  "compter les fenêtres du collège",
  "mesurer sa taille avec une toise",
  "chercher la capitale de l’Italie dans un atlas",
  "calculer le prix de deux baguettes",
  "compter les jours d’une semaine",
];

/* ═══ 13/10/2026 — ÉQUIPROBABILITÉ, CALCULER, DÉFIS ════════════════════════
   Mesuré le 13/10 : proba_equiprobabilite 12 squelettes, proba_calculer 8,
   proba_defi 15 (15 à 18 répétitions sur 20). Les gabarits tirent maintenant
   leurs situations (sacs, roues, issues numérotées) ; les événements restent
   entre guillemets, le contenu en clair : le correcteur recompte.
   ═══════════════════════════════════════════════════════════════════════ */

/** « 3/8 », « 0 », « 1 » : une fraction écrite telle quelle. */
const ecrire = (a: number, b: number) => (a === 0 ? "0" : a === b ? "1" : `${a}/${b}`);
/** Des propositions de fractions de VALEURS toutes différentes, la bonne en premier. */
function fractionsDistinctes(juste: [number, number], pieges: [number, number][]): string[] {
  const vus = [juste[0] / juste[1]];
  const out = [ecrire(...juste)];
  for (const [a, b] of pieges) {
    if (b <= 0 || a < 0) continue;
    const v = a / b;
    if (vus.some((w) => Math.abs(w - v) < 1e-9)) continue;
    vus.push(v);
    out.push(ecrire(a, b));
  }
  return out;
}
const QUESTIONS_PROBA = (lib: string) => [
  `Quelle est la probabilité de l’événement « ${lib} » ?`,
  `Calcule la probabilité de « ${lib} ».`,
  `Quelle est la probabilité de « ${lib} » ?`,
  `Donne la probabilité de « ${lib} », sous forme de fraction.`,
];

function genCalculer(star: 2 | 3 | 4) {
  let s: Sit;
  if (star === 2) {
    // ★2 : un seul événement simple, issues numérotées ou une couleur
    do s = situationQuelconque({ maxN: 12 });
    while (/ou |n’est pas/.test(s.lib));
  } else s = situationQuelconque({ maxN: star === 3 ? 20 : 30, compose: star === 4 });
  const text = `${s.texte} ${pick(QUESTIONS_PROBA(s.lib))}`;
  const explanation = pe(
    "dans une situation d’équiprobabilité, la probabilité d’un événement est le nombre d’issues favorables divisé par le nombre d’issues possibles.",
    "on compte les issues possibles, puis les issues favorables.",
    `${s.detail} Il y a ${s.total} issues possibles.`,
    `la probabilité est ${ecrire(s.fav, s.total)}${reduite(s.fav, s.total) !== ecrire(s.fav, s.total) ? ` = ${reduite(s.fav, s.total)}` : ""}.`,
  );
  if (Math.random() < 0.4) {
    const ch = fractionsDistinctes([s.fav, s.total], [[s.total - s.fav, s.total], [s.fav, s.total - s.fav], [s.total, s.fav], [s.fav + 1, s.total], [1, s.total]]).slice(0, 4);
    if (ch.length >= 3) return { text, format: "qcm" as const, choices: melange(ch), expected: [ch[0]], comparator: "mcq_exact" as const, explanation, canvas: s.canvas };
  }
  return { text, format: "short" as const, expected: ecritures(s.fav, s.total), comparator: "fraction_decimal_equivalent" as const, explanation, canvas: s.canvas };
}

/** Deux événements ont-ils la même probabilité ? Quelle couleur a le plus de chances ? */
function genEquiprobabilite(star: 2 | 3) {
  const r = Math.random();
  // la probabilité de chaque issue d'une expérience équiprobable
  if (r < (star === 2 ? 0.35 : 0.2)) {
    const x = nouveauNum((N) => N <= 30);
    const text = `${situationNum(x)} ${pick([`Toutes les issues ont la même probabilité. Quelle est la probabilité de chacune ?`, `Les issues sont équiprobables. Quelle est la probabilité d’${x.ctx.mot === "nombre" ? "obtenir un nombre" : "obtenir un numéro"} donné ?`, `Quelle est la probabilité d’obtenir le ${x.ctx.mot} ${ri(1, x.N)} ?`])}`;
    return {
      text,
      format: "short" as const,
      expected: [`1/${x.N}`],
      comparator: "fraction_decimal_equivalent" as const,
      explanation: pe("des issues équiprobables ont toutes la même probabilité.", "on partage 1 entre toutes les issues.", `Il y a ${x.N} issues, de 1 à ${x.N}.`, `chaque issue a la probabilité 1/${x.N}.`),
      canvas: x.ctx.canvas?.(x.N),
    };
  }
  // deux couleurs : la même probabilité ?
  const egales = Math.random() < 0.45;
  const a = ri(1, 6);
  const b = egales ? a : pick([1, 2, 3, 4, 5, 6, 7].filter((n) => n !== a));
  const ns = star === 3 && Math.random() < 0.5 ? [a, b, ri(1, 5)] : [a, b];
  if (Math.random() < 0.6) {
    const u = urneAvec(ns);
    const [c1, c2] = [u.contenu[0].c, u.contenu[1].c];
    const e1 = evtUrne(u, [c1]), e2 = evtUrne(u, [c2]);
    if (star === 3 && !egales && Math.random() < 0.5) {
      const plus = a > b ? c1 : c2;
      const nomC = (c: Coul) => accorde(c, u.ctx.o.f, false);
      return {
        text: `${situationUrne(u)} ${pick([`Entre « ${e1} » et « ${e2} », quel événement est le plus probable ?`, `Qu’est-ce qui a le plus de chances d’arriver : « ${e1} » ou « ${e2} » ?`])}`,
        format: "qcm" as const,
        choices: [`« ${e1} »`, `« ${e2} »`, "les deux ont la même probabilité"],
        expected: [`« ${evtUrne(u, [plus])} »`],
        comparator: "mcq_exact" as const,
        explanation: pe("plus un événement a d’issues favorables, plus il est probable.", "on compare les effectifs.", `${a} ${pl(a, u.ctx.o.s, u.ctx.o.p)} ${nomC(c1)} contre ${b} ${nomC(c2)}.`, `« ${evtUrne(u, [plus])} » est le plus probable.`),
        canvas: canvasUrne(u),
      };
    }
    return {
      text: `${situationUrne(u)} ${pick([`Les événements « ${e1} » et « ${e2} » ont-ils la même probabilité ?`, `« ${e1} » et « ${e2} » : ces deux événements sont-ils équiprobables ?`])}`,
      format: "qcm" as const,
      choices: ["oui", "non"],
      expected: [egales ? "oui" : "non"],
      comparator: "mcq_exact" as const,
      explanation: pe("deux événements sont équiprobables s’ils ont la même probabilité.", "on compte les issues favorables à chacun.", `${a} contre ${b} sur ${totalUrne(u)}.`, egales ? "même nombre d’issues : ils sont équiprobables." : "pas le même nombre d’issues : ils ne sont pas équiprobables."),
      canvas: canvasUrne(u),
    };
  }
  const ro = roueAvec(ns.map((n) => Math.min(n, 5)));
  const [c1, c2] = [ro.contenu[0].c, ro.contenu[1].c];
  const [n1, n2] = [ro.contenu[0].n, ro.contenu[1].n];
  const e1 = evtRoue([c1]), e2 = evtRoue([c2]);
  return {
    text: `${situationRoue(ro)} ${pick([`Les événements « ${e1} » et « ${e2} » ont-ils la même probabilité ?`, `« ${e1} » et « ${e2} » sont-ils équiprobables ?`])}`,
    format: "qcm" as const,
    choices: ["oui", "non"],
    expected: [n1 === n2 ? "oui" : "non"],
    comparator: "mcq_exact" as const,
    explanation: pe("deux événements sont équiprobables s’ils ont la même probabilité.", "les secteurs ont la même taille : on compte les secteurs de chaque couleur.", `${n1} contre ${n2} sur ${totalRoue(ro)}.`, n1 === n2 ? "ils sont équiprobables." : "ils ne sont pas équiprobables."),
    canvas: canvasRoue(ro),
  };
}

/** Défis : l'événement contraire, deux sacs à comparer, le contenu à retrouver, l'erreur d'un élève. */
function genDefiProba(star: 4 | 5) {
  const r = Math.random();
  if (r < 0.3) {
    // le contraire, en situation
    const s = situationQuelconque({ maxN: 30, compose: true });
    if (!/n’est pas|ne pas/.test(s.lib)) return genDefiProba(star);
    const text = `${s.texte} ${pick(QUESTIONS_PROBA(s.lib))}`;
    return { text, format: "short" as const, expected: ecritures(s.fav, s.total), comparator: "fraction_decimal_equivalent" as const, explanation: pe("l’événement contraire se réalise quand l’événement ne se réalise pas.", "on compte les issues qui conviennent (ou on fait 1 moins la probabilité de l’événement).", `${s.detail}`, `la probabilité est ${ecrire(s.fav, s.total)}.`), canvas: s.canvas };
  }
  if (r < 0.55) {
    // deux sacs
    const o = pick([OBJ.bille, OBJ.jeton, OBJ.bonbon, OBJ.perle, OBJ.cube]);
    const [c1, c2] = melange(o.couleurs.filter((c) => c !== "orange")).slice(0, 2) as Coul[];
    let a1 = ri(1, 6), b1 = ri(1, 9), a2 = ri(1, 6), b2 = ri(1, 9);
    if (Math.random() < 0.2) [a2, b2] = [a1 * 2, b1 * 2];
    while (a1 * (a2 + b2) === a2 * (a1 + b1) && Math.random() < 0.7) [a2, b2] = [ri(1, 6), ri(1, 9)];
    const p1 = a1 / (a1 + b1), p2 = a2 / (a2 + b2);
    const rep = Math.abs(p1 - p2) < 1e-9 ? "autant dans les deux sacs" : p1 > p2 ? "dans le sac A" : "dans le sac B";
    const g = (n: number, c: Coul) => `${n} ${n > 1 ? o.p : o.s} ${accorde(c, o.f, n > 1)}`;
    const p = pick(PRENOMS);
    const text = `${pick([`${p.nom} a deux sacs.`, "Voici deux sacs."])} Le sac A contient ${g(a1, c1)} et ${g(b1, c2)}. Le sac B contient ${g(a2, c1)} et ${g(b2, c2)}. On tire au hasard dans un seul sac. Dans quel sac a-t-on le plus de chances de tirer ${un(o)} ${o.s} ${accorde(c1, o.f, false)} ?`;
    return {
      text,
      format: "qcm" as const,
      choices: ["dans le sac A", "dans le sac B", "autant dans les deux sacs"],
      expected: [rep],
      comparator: "mcq_exact" as const,
      explanation: pe("on compare des probabilités, pas des nombres d’objets.", "on calcule la probabilité dans chaque sac.", `Sac A : ${a1}/${a1 + b1}. Sac B : ${a2}/${a2 + b2}.`, `on a le plus de chances ${rep === "autant dans les deux sacs" ? "autant dans les deux sacs" : rep}.`),
    };
  }
  if (r < 0.8) {
    // le contenu à retrouver : « 3 billes rouges et des billes bleues ; p = 1/4 »
    const u = urneAvec([1]);
    const o = u.ctx.o;
    const c1 = u.contenu[0].c;
    const c2 = pick(o.couleurs.filter((c) => c !== c1));
    const d = pick([2, 3, 4, 5]);
    const k = ri(1, d - 1);
    const m = ri(1, 4);
    const a = k * m, tot = d * m;
    if (tot > 30) return genDefiProba(star);
    const text = `${u.ctx.pose(u.p, `${a} ${a > 1 ? o.p : o.s} ${accorde(c1, o.f, a > 1)} et des ${o.p} ${accorde(c2, o.f, true)}`)} La probabilité de ${evtUrne(u, [c1])} est ${k}/${d}. Combien y a-t-il de ${o.p} ${accorde(c2, o.f, true)} ?`;
    return {
      text,
      format: "short" as const,
      expected: [String(tot - a)],
      comparator: "number_equal" as const,
      explanation: pe("probabilité = issues favorables ÷ issues possibles.", `${a} ${o.p} sur le total valent ${k}/${d}.`, `${k}/${d} = ${a}/${tot} : il y a ${tot} ${o.p} en tout.`, `il y a ${tot} − ${a} = ${tot - a} ${o.p} ${accorde(c2, o.f, true)}.`),
    };
  }
  // l'erreur d'un élève
  const s = situationQuelconque({ maxN: 20, compose: star === 5 });
  const faux: [number, number] = pick([[s.fav, s.total - s.fav], [s.total - s.fav, s.total], [s.fav + 1, s.total]] as [number, number][]);
  if (Math.abs(faux[0] / faux[1] - s.fav / s.total) < 1e-9 || faux[1] === 0) return genDefiProba(star);
  const p = pick(PRENOMS);
  const text = `${s.texte} ${s.texte.includes(p.nom) ? "Un camarade" : p.nom} affirme que la probabilité de « ${s.lib} » est ${ecrire(...faux)}. Quelle est la bonne probabilité ?`;
  const ch = fractionsDistinctes([s.fav, s.total], [faux, [s.total - s.fav, s.total], [s.fav, s.total - s.fav], [1, s.total]]).slice(0, 4);
  return {
    text,
    format: "qcm" as const,
    choices: melange(ch),
    expected: [ch[0]],
    comparator: "mcq_exact" as const,
    explanation: pe("probabilité = issues favorables ÷ issues possibles.", "on recompte les issues.", `${s.detail} Il y a ${s.total} issues possibles.`, `la bonne probabilité est ${ecrire(s.fav, s.total)}.`),
    canvas: s.canvas,
  };
}

export const probabilitesBank: TutorBankItemV4[] = [
  // =========================
  // PROBA_VOCABULAIRE
  // =========================
  {
    kind: "fixed",
    id: "proba_vocabulaire_fixed_1",
    niveau: "5e",
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
      "est toujours égal à 0",
      "est toujours égal à 1",
    ],
    expected: ["n’est pas connu à l’avance"],
    comparator: "mcq_exact",
    hint: "Aléatoire signifie qu’on ne peut pas prévoir le résultat avec certitude.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise entre 0 et 1.\n\n" +
          "Méthode : on compte les issues favorables et les issues possibles, puis on forme le quotient.\n\nCalcul : " +
          ("Une expérience aléatoire est une expérience dont on ne peut pas connaître le résultat à l’avance avec certitude.") +
          "\n\nConclusion : la probabilité obtenue répond à la question.",
    tags: ["proba_experience", "vocabulaire", "qcm"],
  },
  {
    kind: "fixed",
    id: "proba_vocabulaire_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Lorsqu’on lance un dé, obtenir 4 est...",
    format: "qcm",
    choices: ["une issue", "une moyenne", "une fréquence", "un tableau"],
    expected: ["une issue"],
    comparator: "mcq_exact",
    hint: "Une issue est un résultat possible.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise entre 0 et 1.\n\n" +
          "Méthode : on compte les issues favorables et les issues possibles, puis on forme le quotient.\n\nCalcul : " +
          ("Obtenir 4 est un résultat possible du lancer de dé : c’est une issue.") +
          "\n\nConclusion : la probabilité obtenue répond à la question.",
    tags: ["proba_experience", "vocabulaire", "issue", "qcm"],
    canvas: deCanvas([4]),
  },
  {
    kind: "fixed",
    id: "proba_vocabulaire_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Lorsqu’on lance un dé, « obtenir un nombre pair » est...",
    format: "qcm",
    choices: ["un événement", "une seule issue", "une moyenne", "un coefficient"],
    expected: ["un événement"],
    comparator: "mcq_exact",
    hint: "Cet événement regroupe plusieurs issues : 2, 4 et 6.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise entre 0 et 1.\n\n" +
          "Méthode : on compte les issues favorables et les issues possibles, puis on forme le quotient.\n\nCalcul : " +
          ("Un événement peut regrouper plusieurs issues. Ici, « obtenir un nombre pair » correspond aux issues 2, 4 et 6.") +
          "\n\nConclusion : la probabilité obtenue répond à la question.",
    tags: ["proba_experience", "vocabulaire", "evenement", "qcm"],
    canvas: deCanvas([2, 4, 6]),
  },
  {
    kind: "fixed",
    id: "proba_vocabulaire_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique avec tes mots ce qu’est une expérience aléatoire ».
    text: "Laquelle de ces expériences est aléatoire ?",
    format: "qcm",
    choices: ["lancer une pièce", "compter les élèves de la classe", "mesurer sa table", "peser un sac de 1 kg"],
    expected: ["lancer une pièce"],
    comparator: "mcq_exact",
    hint: "Aléatoire : on ne peut pas savoir le résultat à l’avance.",
    explanation: expl("Quand on lance une pièce, on ne sait pas à l’avance si on aura pile ou face : c’est le hasard. Compter, mesurer, peser donnent un résultat qu’on peut retrouver à chaque fois."),
    tags: ["proba_experience", "vocabulaire", "qcm"],
  },
  {
    kind: "fixed",
    id: "proba_vocabulaire_open_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique la différence entre une issue et un événement ».
    text: "On lance un dé. Combien d’issues réalisent l’événement « obtenir un nombre impair » ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Écris les nombres impairs du dé.",
    explanation: expl("Les nombres impairs du dé sont 1, 3 et 5. L’événement « obtenir un nombre impair » regroupe donc 3 issues."),
    tags: ["proba_experience", "vocabulaire", "short"],
    canvas: deCanvas([1, 3, 5]),
  },

  // =========================
  // PROBA_ISSUES
  // =========================
  {
    kind: "fixed",
    id: "proba_issue_fixed_1",
    niveau: "5e",
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
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise entre 0 et 1.\n\n" +
          "Méthode : on compte les issues favorables et les issues possibles, puis on forme le quotient.\n\nCalcul : " +
          ("Les issues possibles sont 1, 2, 3, 4, 5 et 6 : il y en a 6.") +
          "\n\nConclusion : la probabilité obtenue répond à la question.",
    tags: ["proba_experience", "issue", "de", "qcm"],
    canvas: deCanvas(),
  },
  {
    kind: "fixed",
    id: "proba_issue_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 2,
    theme: "neutral",
    text: "On lance un dé. Combien y a-t-il d’issues favorables à l’événement « obtenir un nombre pair » ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Liste les nombres pairs du dé.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise entre 0 et 1.\n\n" +
          "Méthode : on compte les issues favorables et les issues possibles, puis on forme le quotient.\n\nCalcul : " +
          ("Les issues favorables sont 2, 4 et 6. Il y en a donc 3.") +
          "\n\nConclusion : la probabilité obtenue répond à la question.",
    tags: ["proba_experience", "issue", "de", "pair"],
    canvas: deCanvas([2, 4, 6]),
  },
  {
    kind: "fixed",
    id: "proba_issue_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 2,
    theme: "neutral",
    text: "On tire une bille dans ce sac. Combien y a-t-il de billes au total ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Compte toutes les billes.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise entre 0 et 1.\n\n" +
          "Méthode : on compte les issues favorables et les issues possibles, puis on forme le quotient.\n\nCalcul : " +
          ("Le sac contient 3 billes rouges et 2 billes bleues, donc 5 billes au total.") +
          "\n\nConclusion : la probabilité obtenue répond à la question.",
    tags: ["proba_experience", "issue", "billes", "canvas"],
    canvas: billesCanvas([
      { couleur: couleurs.rouge, label: "R" },
      { couleur: couleurs.rouge, label: "R" },
      { couleur: couleurs.rouge, label: "R" },
      { couleur: couleurs.bleu, label: "B" },
      { couleur: couleurs.bleu, label: "B" },
    ]),
  },
  {
    kind: "fixed",
    id: "proba_issue_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 2,
    theme: "neutral",
    text: "On lance un dé. Quelles sont les issues favorables à « obtenir un nombre strictement supérieur à 4 » ?",
    format: "qcm",
    choices: ["5 et 6", "4 et 5", "1, 2, 3 et 4", "6 seulement"],
    expected: ["5 et 6"],
    comparator: "mcq_exact",
    hint: "Supérieur à 4 signifie strictement plus grand que 4.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise entre 0 et 1.\n\n" +
          "Méthode : on compte les issues favorables et les issues possibles, puis on forme le quotient.\n\nCalcul : " +
          ("Les nombres strictement supérieurs à 4 sur un dé sont 5 et 6.") +
          "\n\nConclusion : la probabilité obtenue répond à la question.",
    tags: ["proba_experience", "issue", "qcm", "piege"],
    canvas: deCanvas([5, 6]),
  },
  {
    kind: "fixed",
    id: "proba_issue_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 2,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique pourquoi il y a 6 issues possibles » (dé).
    text: "On fait tourner une roue numérotée de 1 à 8. Combien y a-t-il d’issues possibles ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Liste les numéros possibles.",
    explanation: expl("La roue peut s’arrêter sur 1, 2, 3, 4, 5, 6, 7 ou 8. Il y a donc 8 issues possibles."),
    tags: ["proba_experience", "issue", "short"],
    canvas: deCanvas(),
  },
  {
    kind: "template",
    id: "proba_issue_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 2,
    theme: "neutral",
    hint: "Chaque objet, chaque secteur, chaque numéro est une issue : compte-les tous.",
    tags: ["proba_experience", "issue", "billes", "template"],
    // 09/10/2026 : sacs, roues coloriées et issues numérotées tirés ; « combien d'issues possibles ? ».
    generate: () => {
      let texte: string;
      let canvas: CanvasProbabilitesData | undefined;
      let total: number;
      let detail: string;
      const r = Math.random();
      if (r < 0.5) {
        const u = nouvelleUrne(ri(2, 3), 1, 7);
        total = totalUrne(u);
        texte = `${situationUrne(u)} Chaque ${u.ctx.o.s} est une issue.`;
        canvas = canvasUrne(u);
        detail = `${listeFr(u.contenu.map((y) => String(y.n)))} : ${total} ${u.ctx.o.p} en tout.`;
      } else if (r < 0.75) {
        const ro = roueAvec(Array.from({ length: ri(2, 3) }, () => ri(1, 5)));
        total = totalRoue(ro);
        texte = `${situationRoue(ro)} Chaque secteur est une issue.`;
        canvas = canvasRoue(ro);
        detail = `${total} secteurs en tout.`;
      } else {
        const x = nouveauNum((N) => N >= 10);
        total = x.N;
        texte = situationNum(x);
        canvas = x.ctx.canvas?.(x.N);
        detail = `les issues vont de 1 à ${x.N}.`;
      }
      const text = pick([
        `${texte} Combien y a-t-il d’issues possibles ?`,
        `${texte} Combien d’issues possibles compte cette expérience ?`,
        `${texte} Compte les issues possibles.`,
        `${texte} Quel est le nombre d’issues possibles ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: pe(
          "une issue est un résultat possible de l’expérience.",
          "on compte tous les résultats qui peuvent sortir.",
          detail,
          `il y a ${total} issues possibles.`,
        ),
        canvas,
      };
    },
  },

  // =========================
  // PROBA_EQUIPROBABILITE
  // =========================
  {
    kind: "fixed",
    id: "proba_equiprobabilite_fixed_1",
    niveau: "5e",
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
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise entre 0 et 1.\n\n" +
          "Méthode : on compte les issues favorables et les issues possibles, puis on forme le quotient.\n\nCalcul : " +
          ("Oui. Chaque face a la même probabilité d’apparaître : la situation est équiprobable.") +
          "\n\nConclusion : la probabilité obtenue répond à la question.",
    tags: ["proba_experience", "equiprobabilite", "de"],
    canvas: deCanvas(),
  },
  {
    kind: "fixed",
    id: "proba_equiprobabilite_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_equiprobabilite",
    difficulty: 3,
    theme: "neutral",
    text: "Cette roue correspond-elle à une situation d’équiprobabilité ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Regarde si toutes les zones ont le même poids.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise entre 0 et 1.\n\n" +
          "Méthode : on compte les issues favorables et les issues possibles, puis on forme le quotient.\n\nCalcul : " +
          ("Non. Le secteur rouge a un poids 3, alors que le secteur bleu a un poids 1. Les issues ne sont pas équiprobables.") +
          "\n\nConclusion : la probabilité obtenue répond à la question.",
    tags: ["proba_experience", "equiprobabilite", "roue", "piege"],
    canvas: roueCanvas([
      { label: "Rouge", poids: 3, couleur: couleurs.rouge },
      { label: "Bleu", poids: 1, couleur: couleurs.bleu },
    ]),
  },
  {
    kind: "fixed",
    id: "proba_equiprobabilite_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_equiprobabilite",
    difficulty: 3,
    theme: "neutral",
    text: "Dans ce sac, tirer rouge et tirer bleu sont-ils équiprobables ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Compte les billes de chaque couleur.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise entre 0 et 1.\n\n" +
          "Méthode : on compte les issues favorables et les issues possibles, puis on forme le quotient.\n\nCalcul : " +
          ("Il y a 4 billes rouges et 2 billes bleues. Les couleurs n’ont donc pas la même probabilité.") +
          "\n\nConclusion : la probabilité obtenue répond à la question.",
    tags: ["proba_experience", "equiprobabilite", "billes", "piege"],
    canvas: billesCanvas([
      ...Array.from({ length: 4 }, () => ({ couleur: couleurs.rouge, label: "R" })),
      ...Array.from({ length: 2 }, () => ({ couleur: couleurs.bleu, label: "B" })),
    ]),
  },
  {
    kind: "fixed",
    id: "proba_equiprobabilite_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_equiprobabilite",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique pourquoi une roue 3 rouges / 1 bleu n’est pas équiprobable ».
    text: "La roue a 3 secteurs rouges et 1 secteur bleu, tous de même taille. Quelle couleur a le plus de chances de sortir ?",
    format: "qcm",
    choices: ["Rouge", "Bleu", "autant l’une que l’autre"],
    expected: ["Rouge"],
    comparator: "mcq_exact",
    hint: "Compte les secteurs de chaque couleur.",
    explanation: expl("Le rouge occupe 3 secteurs sur 4, le bleu 1 seul. Rouge a plus de chances de sortir : la roue n’est pas équiprobable."),
    tags: ["proba_experience", "equiprobabilite", "qcm", "raisonnement"],
    canvas: roueCanvas([
      { label: "Rouge", poids: 3, couleur: couleurs.rouge },
      { label: "Bleu", poids: 1, couleur: couleurs.bleu },
    ]),
  },
  {
    kind: "template",
    id: "proba_equiprobabilite_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_equiprobabilite",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde si toutes les zones ont le même poids.",
    tags: ["proba_experience", "equiprobabilite", "roue", "template"],
    // 13/10/2026 : sacs et roues tirés, deux événements comparés, probabilité de chaque issue.
    generate: () => genEquiprobabilite(3),
  },

  // =========================
  // PROBA_CALCULER
  // =========================
  {
    kind: "fixed",
    id: "proba_calculer_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_calculer",
    difficulty: 2,
    theme: "neutral",
    text: "On lance un dé équilibré. Quelle est la probabilité d’obtenir un 3 ?",
    format: "short",
    expected: ["1/6"],
    comparator: "fraction_decimal_equivalent",
    hint: "Il y a 1 issue favorable sur 6 issues possibles.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise entre 0 et 1.\n\n" +
          "Méthode : on compte les issues favorables et les issues possibles, puis on forme le quotient.\n\nCalcul : " +
          ("Obtenir 3 correspond à une seule issue favorable parmi 6 issues possibles. La probabilité est donc 1/6.") +
          "\n\nConclusion : la probabilité obtenue répond à la question.",
    tags: ["proba_experience", "calcul", "de"],
    canvas: deCanvas([3]),
  },
  {
    kind: "fixed",
    id: "proba_calculer_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_calculer",
    difficulty: 2,
    theme: "neutral",
    text: "On lance un dé équilibré. Quelle est la probabilité d’obtenir un nombre pair ?",
    format: "short",
    expected: ["3/6", "1/2"],
    comparator: "fraction_decimal_equivalent",
    hint: "Les nombres pairs sont 2, 4 et 6.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise entre 0 et 1.\n\n" +
          "Méthode : on compte les issues favorables et les issues possibles, puis on forme le quotient.\n\nCalcul : " +
          ("Les issues favorables sont 2, 4 et 6 : 3 issues sur 6. Donc la probabilité est 3/6 = 1/2.") +
          "\n\nConclusion : la probabilité obtenue répond à la question.",
    tags: ["proba_experience", "calcul", "de", "pair"],
    canvas: deCanvas([2, 4, 6]),
  },
  {
    kind: "fixed",
    id: "proba_calculer_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_calculer",
    difficulty: 3,
    theme: "neutral",
    text: "Dans ce sac, quelle est la probabilité de tirer une bille rouge ?",
    format: "short",
    expected: ["3/5"],
    comparator: "fraction_decimal_equivalent",
    hint: "Compte les billes rouges et le total.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise entre 0 et 1.\n\n" +
          "Méthode : on compte les issues favorables et les issues possibles, puis on forme le quotient.\n\nCalcul : " +
          ("Il y a 3 billes rouges sur 5 billes au total. La probabilité est donc 3/5.") +
          "\n\nConclusion : la probabilité obtenue répond à la question.",
    tags: ["proba_experience", "calcul", "billes"],
    canvas: billesCanvas([
      ...Array.from({ length: 3 }, () => ({ couleur: couleurs.rouge, label: "R" })),
      ...Array.from({ length: 2 }, () => ({ couleur: couleurs.bleu, label: "B" })),
    ]),
  },
  {
    kind: "fixed",
    id: "proba_calculer_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_calculer",
    difficulty: 3,
    theme: "neutral",
    text: "On lance un dé. Quelle est la probabilité d’obtenir un nombre strictement supérieur à 4 ?",
    format: "qcm",
    choices: ["1/6", "2/6", "4/6", "5/6"],
    expected: ["2/6"],
    comparator: "mcq_exact",
    hint: "Les nombres strictement supérieurs à 4 sont 5 et 6.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise entre 0 et 1.\n\n" +
          "Méthode : on compte les issues favorables et les issues possibles, puis on forme le quotient.\n\nCalcul : " +
          ("Les issues favorables sont 5 et 6 : 2 issues sur 6. La probabilité est donc 2/6.") +
          "\n\nConclusion : la probabilité obtenue répond à la question.",
    tags: ["proba_experience", "calcul", "qcm", "piege"],
    canvas: deCanvas([5, 6]),
  },
  {
    kind: "fixed",
    id: "proba_calculer_tableau_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_calculer",
    difficulty: 3,
    theme: "neutral",
    text: "D’après le tableau, quelle est la probabilité de tirer une bille bleue ?",
    format: "short",
    expected: ["2/6", "1/3"],
    comparator: "fraction_decimal_equivalent",
    hint: "Probabilité = effectif favorable / effectif total.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise entre 0 et 1.\n\n" +
          "Méthode : on compte les issues favorables et les issues possibles, puis on forme le quotient.\n\nCalcul : " +
          ("Il y a 2 billes bleues sur 6 billes au total. La probabilité est donc 2/6 = 1/3.") +
          "\n\nConclusion : la probabilité obtenue répond à la question.",
    tags: ["proba_experience", "calcul", "tableau"],
    canvas: tableauCanvas(
      ["Couleur", "Rouge", "Bleu", "Vert", "Total"],
      [["Effectif", "3", "2", "1", "6"]],
      [
        [0, 2],
        [0, 4],
      ]
    ),
  },
  {
    kind: "fixed",
    id: "proba_calculer_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_calculer",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique pourquoi P(nombre pair) = 3/6 ».
    text: "On lance un dé équilibré. Quelle est la probabilité d’obtenir un nombre impair ?",
    format: "short",
    expected: ["3/6", "1/2", "0,5"],
    comparator: "fraction_decimal_equivalent",
    hint: "Compte les nombres impairs, puis le nombre total d’issues.",
    explanation: expl("Les nombres impairs sont 1, 3 et 5 : 3 issues favorables sur 6 issues possibles. La probabilité est 3/6 = 1/2."),
    tags: ["proba_experience", "calcul", "de", "short"],
    canvas: deCanvas([1, 3, 5]),
  },
  {
    kind: "template",
    id: "proba_calculer_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_calculer",
    difficulty: 3,
    theme: "neutral",
    hint: "Probabilité = cas favorables / cas possibles.",
    tags: ["proba_experience", "calcul", "billes", "template"],
    // 13/10/2026 : situations tirées (sac, roue, issues numérotées) ; QCM aux pièges de valeurs distinctes.
    generate: () => genCalculer(3),
  },
  {
    kind: "template",
    id: "proba_calculer_tpl_s2",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_calculer",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte les issues qui conviennent, puis toutes les issues.",
    tags: ["proba_experience", "calcul", "template"],
    generate: () => genCalculer(2),
  },
  {
    kind: "template",
    id: "proba_calculer_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_calculer",
    difficulty: 4,
    theme: "neutral",
    hint: "Compte les faces qui vérifient la condition.",
    tags: ["proba_experience", "calcul", "de", "template", "piege"],
    // 13/10/2026 : événements composés (pair et supérieur à…, « ou », « qui n’est pas »).
    generate: () => genCalculer(4),
  },

  // =========================
  // PROBA_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "proba_defi_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Une probabilité peut-elle être supérieure à 1 ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Une probabilité est comprise entre 0 et 1.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise entre 0 et 1.\n\n" +
          "Méthode : on compte les issues favorables et les issues possibles, puis on forme le quotient.\n\nCalcul : " +
          ("Non. Une probabilité est toujours comprise entre 0 et 1.") +
          "\n\nConclusion : la probabilité obtenue répond à la question.",
    tags: ["proba_experience", "defi", "bornes"],
  },
  {
    kind: "fixed",
    id: "proba_defi_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « … 2/6 car il y a le mot pair. Explique son erreur. »
    text: "Un élève dit : « Avec un dé, la probabilité d’obtenir un nombre pair est 2/6. » Quelle est la bonne probabilité ?",
    format: "qcm",
    choices: ["3/6", "2/6", "1/6", "6/3"],
    expected: ["3/6"],
    comparator: "mcq_exact",
    hint: "Compte les nombres pairs du dé : 2, 4, …",
    explanation: expl("Les nombres pairs du dé sont 2, 4 et 6 : il y en a 3, pas 2. La probabilité est 3/6."),
    tags: ["proba_experience", "defi", "qcm", "erreur", "piege"],
    canvas: deCanvas([2, 4, 6]),
  },
  {
    kind: "fixed",
    id: "proba_defi_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 5,
    theme: "reunion",
    text: "Dans un panier de fruits à La Réunion, il y a 4 mangues, 3 ananas et 2 letchis. On prend un fruit au hasard. Quelle est la probabilité de prendre une mangue ?",
    format: "short",
    expected: ["4/9"],
    comparator: "fraction_decimal_equivalent",
    hint: "Compte les mangues puis le total de fruits.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise entre 0 et 1.\n\n" +
          "Méthode : on compte les issues favorables et les issues possibles, puis on forme le quotient.\n\nCalcul : " +
          ("Il y a 4 mangues sur 9 fruits au total. La probabilité est donc 4/9.") +
          "\n\nConclusion : la probabilité obtenue répond à la question.",
    tags: ["proba_experience", "defi", "reunion", "billes"],
    canvas: billesCanvas([
      ...Array.from({ length: 4 }, () => ({
        label: "M",
        couleur: couleurs.jaune,
      })),
      ...Array.from({ length: 3 }, () => ({
        label: "A",
        couleur: couleurs.vert,
      })),
      ...Array.from({ length: 2 }, () => ({
        label: "L",
        couleur: couleurs.rouge,
      })),
    ]),
  },
  {
    kind: "fixed",
    id: "proba_defi_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Sur cette roue, quelle issue est la plus probable ?",
    format: "qcm",
    choices: ["Rouge", "Bleu", "Vert", "Elles sont toutes aussi probables"],
    expected: ["Rouge"],
    comparator: "mcq_exact",
    hint: "Regarde le secteur qui a le plus grand poids.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise entre 0 et 1.\n\n" +
          "Méthode : on compte les issues favorables et les issues possibles, puis on forme le quotient.\n\nCalcul : " +
          ("Le secteur Rouge a le poids le plus grand, donc c’est l’issue la plus probable.") +
          "\n\nConclusion : la probabilité obtenue répond à la question.",
    tags: ["proba_experience", "defi", "roue", "piege"],
    canvas: roueCanvas([
      { label: "Rouge", poids: 3, couleur: couleurs.rouge },
      { label: "Bleu", poids: 1, couleur: couleurs.bleu },
      { label: "Vert", poids: 1, couleur: couleurs.vert },
    ]),
  },
  {
    kind: "template",
    id: "proba_defi_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 5,
    // 13/10/2026 : plus La Réunion par défaut (un contexte sur quinze) ; contraire, deux sacs,
    // contenu à retrouver, l'erreur d'un élève.
    theme: "neutral",
    hint: "Compte les cas favorables et les cas possibles.",
    tags: ["proba_experience", "defi", "template"],
    generate: () => genDefiProba(5),
  },
  {
    kind: "template",
    id: "proba_defi_tpl_s4",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Une probabilité se compare en fractions, pas en nombre d’objets.",
    tags: ["proba_experience", "defi", "template"],
    generate: () => genDefiProba(4),
  },
  {
    kind: "template",
    id: "proba_defi_open_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Compte les secteurs de chaque couleur.",
    tags: ["proba_experience", "roue", "defi", "template"],
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique pourquoi Rouge est l’issue la plus
    // probable sur cette roue » (toujours la même roue). Désormais : nombres de secteurs tirés,
    // et soit la couleur la plus probable (QCM), soit la probabilité d’une couleur (réponse courte).
    // 13/10/2026 : roues et sacs tirés, défis variés (fini « rouge(s) ») ; même générateur que proba_defi_tpl_1.
    generate: () => genDefiProba(5),
  },

  // =========================
  // TOP-UP — PROBA_VOCABULAIRE (+5)
  // =========================
  {
    kind: "fixed",
    id: "proba_vocabulaire_fixed_6",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Une probabilité est toujours un nombre compris entre :",
    format: "qcm",
    choices: ["0 et 1", "1 et 10", "0 et 100", "-1 et 1"],
    expected: ["0 et 1"],
    comparator: "mcq_exact",
    hint: "Une probabilité ne dépasse jamais 1.",
    explanation: expl("Une probabilité est toujours comprise entre 0 (impossible) et 1 (certain)."),
    tags: ["proba_experience", "vocabulaire", "qcm"],
  },
  {
    kind: "fixed",
    id: "proba_vocabulaire_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Un événement qui ne peut jamais se produire a une probabilité de :",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "Impossible = aucune chance.",
    explanation: expl("Un événement impossible a une probabilité de 0."),
    tags: ["proba_experience", "vocabulaire"],
  },
  {
    kind: "fixed",
    id: "proba_vocabulaire_fixed_5",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Un événement certain a une probabilité de :",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Certain = se produit toujours.",
    explanation: expl("Un événement certain a une probabilité de 1."),
    tags: ["proba_experience", "vocabulaire"],
  },
  {
    kind: "fixed",
    id: "proba_vocabulaire_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 3,
    theme: "neutral",
    text: "Comment appelle-t-on l’ensemble des résultats possibles d’une expérience aléatoire ?",
    format: "qcm",
    choices: ["les issues", "les fréquences", "les moyennes", "les effectifs"],
    expected: ["les issues"],
    comparator: "mcq_exact",
    hint: "Chaque résultat possible porte ce nom.",
    explanation: expl("Les résultats possibles d’une expérience aléatoire s’appellent les issues."),
    tags: ["proba_experience", "vocabulaire", "qcm"],
  },
  {
    kind: "fixed",
    id: "proba_vocabulaire_open_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Pourquoi dit-on qu’une expérience est aléatoire ? Donne un exemple. »
    text: "Avant de lancer un dé, peut-on savoir quelle face va sortir ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Pense à ce qu’on peut dire, ou pas, AVANT de lancer.",
    explanation: expl("Non. On connaît les 6 faces possibles, mais on ne peut pas savoir laquelle sortira : c’est le hasard qui décide. C’est pour cela que lancer un dé est une expérience aléatoire."),
    tags: ["proba_experience", "vocabulaire", "qcm"],
  },

  // =========================
  // TOP-UP — PROBA_ISSUE (+4)
  // =========================
  {
    kind: "fixed",
    id: "proba_issue_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 2,
    theme: "neutral",
    text: "On lance un dé. Combien y a-t-il d’issues favorables à « obtenir un nombre supérieur ou égal à 5 » ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Liste les nombres concernés.",
    explanation: expl("Les issues favorables sont 5 et 6 : il y en a 2."),
    tags: ["proba_experience", "issue", "de"],
    canvas: deCanvas([5, 6]),
  },
  {
    kind: "fixed",
    id: "proba_issue_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 2,
    theme: "neutral",
    text: "On tire une carte parmi les 4 as d’un jeu. Combien y a-t-il d’issues possibles ?",
    format: "qcm",
    choices: ["4", "2", "8", "52"],
    expected: ["4"],
    comparator: "mcq_exact",
    hint: "Il y a 4 as.",
    explanation: expl("Il y a 4 as, donc 4 issues possibles."),
    tags: ["proba_experience", "issue", "qcm"],
  },
  {
    kind: "fixed",
    id: "proba_issue_open_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique la différence entre une issue favorable et une issue possible ».
    text: "Un sac contient 3 billes rouges et 5 billes bleues. On tire une bille. Combien y a-t-il d’issues favorables à « tirer une bille rouge » ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Favorables : seulement les billes rouges.",
    explanation: expl("Les issues possibles sont les 8 billes du sac. Les issues favorables sont les billes rouges : il y en a 3."),
    tags: ["proba_experience", "issue", "short"],
    canvas: billesCanvas([
      ...Array.from({ length: 3 }, () => ({ couleur: couleurs.rouge, label: "R" })),
      ...Array.from({ length: 5 }, () => ({ couleur: couleurs.bleu, label: "B" })),
    ]),
  },
  {
    kind: "template",
    id: "proba_issue_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 2,
    theme: "neutral",
    hint: "Garde seulement les issues qui réalisent l’événement, et compte-les.",
    tags: ["proba_experience", "issue", "billes", "template"],
    // 09/10/2026 : situations tirées (sac, roue, issues numérotées) × tournures × prénoms.
    generate: () => {
      const s = situationQuelconque({ maxN: 20 });
      const text = pick([
        `${s.texte} Combien d’issues réalisent l’événement « ${s.lib} » ?`,
        `${s.texte} Combien y a-t-il d’issues favorables à « ${s.lib} » ?`,
        `${s.texte} Compte les issues favorables à l’événement « ${s.lib} ».`,
        `${s.texte} Pour l’événement « ${s.lib} », combien d’issues conviennent ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(s.fav)],
        comparator: "number_equal",
        explanation: pe(
          "une issue favorable est un résultat qui réalise l’événement.",
          "on écrit les issues possibles, puis on garde celles qui conviennent.",
          s.detail,
          `il y a ${s.fav} ${pl(s.fav, "issue favorable", "issues favorables")}.`,
        ),
        canvas: s.canvas,
      };
    },
  },

  // =========================
  // TOP-UP — PROBA_EQUIPROBABILITE (+5)
  // =========================
  {
    kind: "fixed",
    id: "proba_equiprobabilite_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_equiprobabilite",
    difficulty: 2,
    theme: "neutral",
    text: "Lancer une pièce de monnaie équilibrée (pile ou face) est-il équiprobable ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Pile et face ont la même chance.",
    explanation: expl("Oui : pile et face ont chacun une probabilité de 1/2, c’est équiprobable."),
    tags: ["proba_experience", "equiprobabilite", "qcm"],
  },
  {
    kind: "fixed",
    id: "proba_equiprobabilite_fixed_5",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_equiprobabilite",
    difficulty: 3,
    theme: "neutral",
    text: "Dans une situation équiprobable à 5 issues, quelle est la probabilité de chaque issue ?",
    format: "short",
    expected: ["1/5"],
    comparator: "fraction_decimal_equivalent",
    hint: "Toutes les issues ont la même probabilité.",
    explanation: expl("Avec 5 issues équiprobables, chaque issue a une probabilité de 1/5."),
    tags: ["proba_experience", "equiprobabilite"],
  },
  {
    kind: "fixed",
    id: "proba_equiprobabilite_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_equiprobabilite",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle situation est équiprobable ?",
    format: "qcm",
    choices: [
      "un sac avec 3 billes rouges et 3 billes bleues",
      "un sac avec 5 billes rouges et 1 bleue",
      "une roue avec un grand secteur et un petit",
      "un dé pipé",
    ],
    expected: ["un sac avec 3 billes rouges et 3 billes bleues"],
    comparator: "mcq_exact",
    hint: "Cherche des quantités égales.",
    explanation: expl("Avec 3 billes rouges et 3 bleues, tirer rouge et tirer bleu ont la même probabilité : c’est équiprobable."),
    tags: ["proba_experience", "equiprobabilite", "qcm"],
  },
  {
    kind: "fixed",
    id: "proba_equiprobabilite_open_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_equiprobabilite",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique ce que signifie « équiprobable » ».
    text: "Un sac contient 2 billes rouges et 2 billes bleues. Rouge et bleu ont-ils la même chance d’être tirés ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Compte les billes de chaque couleur.",
    explanation: expl("Il y a autant de rouges que de bleues : 2 et 2. Rouge et bleu ont la même chance, 2/4 chacun : on dit qu’ils sont équiprobables."),
    tags: ["proba_experience", "equiprobabilite", "qcm"],
  },
  {
    kind: "template",
    id: "proba_equiprobabilite_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_equiprobabilite",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les billes de chaque couleur.",
    tags: ["proba_experience", "equiprobabilite", "billes", "template"],
    // 13/10/2026 : contextes tirés (sacs, paquets, roues), effectifs tirés.
    generate: () => genEquiprobabilite(3),
  },
  {
    kind: "template",
    id: "proba_equiprobabilite_tpl_s2",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_equiprobabilite",
    difficulty: 2,
    theme: "neutral",
    hint: "Deux événements sont équiprobables s’ils ont autant d’issues favorables.",
    tags: ["proba_experience", "equiprobabilite", "template"],
    generate: () => genEquiprobabilite(2),
  },

  // =========================
  // TOP-UP — PROBA_CALCULER (+2)
  // =========================
  {
    kind: "fixed",
    id: "proba_calculer_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_calculer",
    difficulty: 2,
    theme: "neutral",
    text: "On lance un dé équilibré. Quelle est la probabilité d’obtenir le nombre 3 ?",
    format: "short",
    expected: ["1/6"],
    comparator: "fraction_decimal_equivalent",
    hint: "1 issue favorable sur 6 possibles.",
    explanation: expl("Il y a 1 issue favorable (le 3) sur 6 issues possibles : la probabilité est 1/6."),
    tags: ["proba_experience", "calculer", "de"],
    canvas: deCanvas([3]),
  },
  {
    kind: "template",
    id: "proba_calculer_tpl_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_calculer",
    difficulty: 3,
    theme: "neutral",
    hint: "Probabilité = favorables ÷ total.",
    tags: ["proba_experience", "calculer", "billes", "template"],
    // 13/10/2026 : situations tirées (fini « bille(s) rouge(s) »).
    generate: () => genCalculer(3),
  },

  // =========================
  // TOP-UP — PROBA_DEFI (+4)
  // =========================
  {
    kind: "fixed",
    id: "proba_defi_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 4,
    theme: "neutral",
    text: "On lance un dé. Quelle est la probabilité de NE PAS obtenir 6 ?",
    format: "short",
    expected: ["5/6"],
    comparator: "fraction_decimal_equivalent",
    hint: "5 issues sur 6 ne sont pas le 6.",
    explanation: expl("Il y a 5 issues favorables (1, 2, 3, 4, 5) sur 6 : la probabilité est 5/6."),
    tags: ["proba_experience", "defi", "de"],
    canvas: deCanvas([1, 2, 3, 4, 5]),
  },
  {
    kind: "fixed",
    id: "proba_defi_qcm_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 4,
    theme: "neutral",
    text: "La probabilité d’un événement est $\\dfrac{3}{10}$. Quelle est la probabilité de l’événement contraire ?",
    format: "qcm",
    choices: ["7/10", "3/10", "10/3", "1/10"],
    expected: ["7/10"],
    comparator: "mcq_exact",
    hint: "Les deux probabilités font 1 au total.",
    explanation: expl("Probabilité du contraire = 1 − 3/10 = 10/10 − 3/10 = 7/10."),
    tags: ["proba_experience", "defi", "qcm", "contraire"],
  },
  {
    kind: "fixed",
    id: "proba_defi_open_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « … est 4. Explique pourquoi c’est impossible. »
    text: "Un sac contient 4 billes rouges et 6 billes bleues. Quelle est la probabilité de tirer une bille rouge ?",
    format: "short",
    expected: ["4/10", "2/5", "0,4"],
    comparator: "fraction_decimal_equivalent",
    hint: "Une probabilité est entre 0 et 1 : ce n’est pas 4.",
    explanation: expl("Il y a 4 billes rouges sur 4 + 6 = 10 billes. La probabilité est 4/10 = 0,4. Répondre « 4 », c’est donner le nombre de billes rouges, pas la probabilité."),
    tags: ["proba_experience", "defi", "short", "erreur"],
    canvas: billesCanvas([
      ...Array.from({ length: 4 }, () => ({ couleur: couleurs.rouge, label: "R" })),
      ...Array.from({ length: 6 }, () => ({ couleur: couleurs.bleu, label: "B" })),
    ]),
  },
  {
    kind: "template",
    id: "proba_defi_tpl_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Compte les issues favorables sur 6.",
    tags: ["proba_experience", "defi", "de", "template"],
    // 13/10/2026 : événements composés dans des situations tirées.
    generate: () => (Math.random() < 0.5 ? genCalculer(4) : genDefiProba(5)),
  },

  /* ===== PROBA_VOCABULAIRE =====
     Ce micro n'avait que des items figés : au dixième passage, l'élève
     retombait forcément sur une question déjà vue. Deux générateurs le
     réapprovisionnent, l'un sur le mot juste, l'autre sur ce que le mot veut
     dire. */
  {
    kind: "template",
    id: "proba_vocabulaire_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 3,
    theme: "neutral",
    hint: "Une issue est UN résultat ; un événement peut en regrouper plusieurs.",
    tags: ["proba_experience", "vocabulaire", "template"],
    // 09/10/2026 : situations tirées (issues numérotées, sac, roue). « Une issue » ou
    // « un événement » était ambigu (« obtenir 5 » est aussi un événement) : les
    // propositions disent maintenant combien d'issues l'événement regroupe.
    generate: () => {
      let s: Sit;
      const r = Math.random();
      if (r < 0.3) {
        // une seule issue : « obtenir le nombre 5 », ou la seule bille d'une couleur
        const x = nouveauNum((N) => N <= 20);
        const k = ri(1, x.N);
        s = { texte: situationNum(x), canvas: x.ctx.canvas?.(x.N), lib: EVN.egal(x.ctx.mot, k).lib, fav: 1, total: x.N, detail: `Seul le ${k} convient.` };
      } else if (r < 0.45) {
        const u = urneAvec(melange([1, ri(2, 6), ri(1, 5)]).slice(0, ri(2, 3)));
        const c = u.contenu.find((y) => y.n === 1)?.c ?? u.contenu[0].c;
        const fav = favUrne(u, [c]);
        s = { texte: situationUrne(u), canvas: canvasUrne(u), lib: evtUrne(u, [c]), fav, total: totalUrne(u), detail: `Chaque ${u.ctx.o.s} est une issue : ${fav} ${pl(fav, "issue convient", "issues conviennent")}.` };
      } else if (r < 0.55) {
        // impossible : aucune issue
        const x = nouveauNum((N) => N <= 20);
        s = { texte: situationNum(x), canvas: x.ctx.canvas?.(x.N), lib: EVN.sup(x.ctx.mot, x.N + ri(0, 3)).lib, fav: 0, total: x.N, detail: `Aucune issue ne dépasse ${x.N}.` };
      } else {
        do s = situationQuelconque({ maxN: 20 });
        while (s.fav < 2);
      }
      const bonne = s.fav === 0 ? "un événement impossible : aucune issue" : s.fav === 1 ? "une seule issue" : "un événement qui regroupe plusieurs issues";
      const text = pick([
        `${s.texte} Que représente « ${s.lib} » ?`,
        `${s.texte} Dans cette expérience, « ${s.lib} » est…`,
        `${s.texte} Comment décrire « ${s.lib} » ?`,
        `${s.texte} Choisis la bonne description de « ${s.lib} ».`,
      ]);
      return {
        text,
        format: "qcm",
        choices: melange([
          "une seule issue",
          "un événement qui regroupe plusieurs issues",
          "un événement impossible : aucune issue",
          "une expérience aléatoire",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: pe(
          "une issue est UN résultat possible ; un événement peut regrouper plusieurs issues, une seule, ou aucune.",
          "on compte les issues qui réalisent l’événement.",
          s.fav ? s.detail : "Aucune issue ne convient.",
          `« ${s.lib} » : ${bonne}.`,
        ),
        canvas: s.canvas,
      };
    },
  },
  {
    kind: "template",
    id: "proba_vocabulaire_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 4,
    theme: "neutral",
    hint: "Demande-toi si la chose peut arriver jamais, toujours, ou parfois.",
    tags: ["proba_experience", "vocabulaire", "qcm", "template"],
    // 08/10/2026 : précise et simple (Frédéric). Avant : « … certain, impossible, ou ni l’un ni l’autre ? Explique. »
    // corrigé par un mot-clé. Désormais un QCM à trois réponses, et deux cas « ni l’un ni l’autre ».
    // 09/10/2026 : situations tirées ; un tiers impossible, un tiers certain, un tiers ni l'un ni l'autre.
    generate: () => {
      const cat = pick(["impossible", "certain", "ni l’un ni l’autre"] as const);
      const s = cat === "ni l’un ni l’autre" ? situationQuelconque() : situationExtreme(cat);
      const text = pick([
        `${s.texte} L’événement « ${s.lib} » est-il certain, impossible, ou ni l’un ni l’autre ?`,
        `${s.texte} Comment qualifier l’événement « ${s.lib} » ?`,
        `${s.texte} « ${s.lib} » : est-ce certain, impossible, ou ni l’un ni l’autre ?`,
        `${s.texte} Choisis le mot qui convient pour « ${s.lib} ».`,
      ]);
      const proba = s.fav === 0 ? "0" : s.fav === s.total ? "1" : `${s.fav}/${s.total}`;
      return {
        text,
        format: "qcm",
        choices: ["certain", "impossible", "ni l’un ni l’autre"],
        expected: [cat],
        comparator: "mcq_exact",
        explanation: pe(
          "un événement impossible n’a aucune issue favorable (probabilité 0) ; un événement certain les a toutes (probabilité 1).",
          "on compte les issues favorables et on les compare au total.",
          `${s.fav} ${pl(s.fav, "issue favorable", "issues favorables")} sur ${s.total}.`,
          cat === "ni l’un ni l’autre" ? `ni l’un ni l’autre : la probabilité vaut ${proba}, entre 0 et 1.` : `l’événement est ${cat} : sa probabilité vaut ${proba}.`,
        ),
        canvas: s.canvas,
      };
    },
  },

  /* ===== PROBA_VOCABULAIRE : ★1, ★2, ★4 (09/10/2026) =====
     Les étoiles 1 et 2 n'avaient que des items figés. */
  {
    kind: "template",
    id: "proba_vocabulaire_tpl_alea",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    hint: "Aléatoire : on ne peut pas savoir le résultat à l’avance, c’est le hasard qui décide.",
    tags: ["proba_experience", "vocabulaire", "qcm", "template"],
    generate: () => {
      const p = pick(PRENOMS);
      const pas = Math.random() < 0.3;
      const [justes, faux] = pas ? [EXP_DETERMINEES, EXP_ALEATOIRES] : [EXP_ALEATOIRES, EXP_DETERMINEES];
      const bonne = pick(justes);
      const choices = melange([bonne, ...melange(faux).slice(0, 3)]);
      const text = pas
        ? pick([
            `Laquelle de ces expériences n’est PAS aléatoire ?`,
            `${p.nom} doit trouver l’expérience qui ne dépend PAS du hasard. Laquelle ?`,
            `Pour ${p.nom}, quelle expérience a un résultat qu’on peut prévoir à l’avance ?`,
          ])
        : pick([
            `Laquelle de ces expériences est aléatoire ?`,
            `${p.nom} hésite entre quatre activités. Laquelle est une expérience aléatoire ?`,
            `Pour ${p.nom}, quelle expérience a un résultat qu’on ne peut pas prévoir ?`,
            `${p.nom} cherche une expérience qui dépend du hasard. Laquelle choisir ?`,
            `En cours, ${p.nom} doit citer une expérience aléatoire. Laquelle convient ?`,
          ]);
      return {
        text,
        format: "qcm",
        choices,
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: pe(
          "une expérience est aléatoire quand on connaît les résultats possibles, mais qu’on ne peut pas savoir à l’avance lequel sortira.",
          "pour chaque expérience, on se demande : si on la refait, peut-on obtenir un autre résultat ?",
          pas ? `« ${bonne} » donne toujours le même résultat : rien n’est dû au hasard.` : `« ${bonne} » : le résultat dépend du hasard.`,
          pas ? `l’expérience qui n’est pas aléatoire est « ${bonne} ».` : `l’expérience aléatoire est « ${bonne} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "proba_vocabulaire_tpl_issue_possible",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    hint: "Une issue est un résultat qui peut vraiment sortir.",
    tags: ["proba_experience", "vocabulaire", "issue", "qcm", "template"],
    generate: () => {
      const pas = Math.random() < 0.35;
      let texte: string;
      let canvas: CanvasProbabilitesData | undefined;
      let possibles: string[];
      let impossibles: string[];
      if (Math.random() < 0.55) {
        const x = nouveauNum((N) => N <= 20);
        const m = x.ctx.mot;
        texte = situationNum(x);
        canvas = x.ctx.canvas?.(x.N);
        possibles = melange(Array.from({ length: x.N }, (_, i) => `le ${m} ${i + 1}`));
        impossibles = melange([0, x.N + 1, x.N + 2, x.N + ri(3, 5), x.N + ri(6, 10)].map((k) => `le ${m} ${k}`));
      } else {
        // assez de couleurs absentes pour trois leurres (ou trois couleurs présentes)
        const u = urneAvec(Array.from({ length: pas ? 3 : 2 }, () => ri(1, 6)), 5);
        const o = u.ctx.o;
        texte = situationUrne(u);
        canvas = canvasUrne(u);
        possibles = melange(u.contenu.map((y) => `${un(o)} ${o.s} ${accorde(y.c, o.f, false)}`));
        impossibles = melange(o.couleurs.filter((c) => !u.contenu.some((y) => y.c === c)).map((c) => `${un(o)} ${o.s} ${accorde(c, o.f, false)}`));
      }
      const [justes, faux] = pas ? [impossibles, possibles] : [possibles, impossibles];
      const bonne = justes[0];
      const text = pas
        ? pick([`${texte} Lequel de ces résultats n’est PAS une issue possible ?`, `${texte} Quel résultat ne peut PAS sortir ?`, `${texte} Une seule proposition n’est pas une issue. Laquelle ?`])
        : pick([`${texte} Lequel de ces résultats est une issue possible ?`, `${texte} Quel résultat peut sortir ?`, `${texte} Une seule proposition est une issue. Laquelle ?`]);
      return {
        text,
        format: "qcm",
        choices: melange([bonne, ...faux.slice(0, 3)]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: pe(
          "une issue est un résultat possible de l’expérience.",
          "on écrit la liste des résultats qui peuvent sortir.",
          pas ? `« ${bonne} » ne fait pas partie des résultats possibles.` : `« ${bonne} » fait partie des résultats possibles ; les autres propositions ne peuvent pas sortir.`,
          pas ? `« ${bonne} » n’est pas une issue.` : `« ${bonne} » est une issue.`,
        ),
        canvas,
      };
    },
  },
  {
    kind: "template",
    id: "proba_vocabulaire_tpl_01",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    hint: "Impossible : probabilité 0. Certain : probabilité 1.",
    tags: ["proba_experience", "vocabulaire", "template"],
    generate: () => {
      const cat = pick(["impossible", "certain"] as const);
      const s = situationExtreme(cat);
      const rep = cat === "impossible" ? "0" : "1";
      const text = pick([
        `${s.texte} Quelle est la probabilité de l’événement « ${s.lib} » ?`,
        `${s.texte} Donne la probabilité de l’événement « ${s.lib} ».`,
        `${s.texte} On note A l’événement « ${s.lib} ». Que vaut la probabilité de A ?`,
        `${s.texte} Écris la probabilité de l’événement « ${s.lib} ».`,
      ]);
      return {
        text,
        format: "short",
        expected: [rep],
        comparator: "number_equal",
        explanation: pe(
          "un événement impossible a pour probabilité 0 ; un événement certain a pour probabilité 1.",
          "on compte les issues favorables.",
          `${s.fav} ${pl(s.fav, "issue favorable", "issues favorables")} sur ${s.total} : l’événement est ${cat}.`,
          `la probabilité vaut ${rep}.`,
        ),
        canvas: s.canvas,
      };
    },
  },
  {
    kind: "template",
    id: "proba_vocabulaire_tpl_impcert",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    hint: "Peut-il arriver ? Arrive-t-il à coup sûr ?",
    tags: ["proba_experience", "vocabulaire", "qcm", "template"],
    generate: () => {
      const cat = pick(["impossible", "certain"] as const);
      const s = situationExtreme(cat);
      const text = pick([
        `${s.texte} L’événement « ${s.lib} » est…`,
        `${s.texte} Comment appelle-t-on l’événement « ${s.lib} » ?`,
        `${s.texte} Quel mot convient pour « ${s.lib} » ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: ["impossible", "certain", "possible mais pas certain"],
        expected: [cat],
        comparator: "mcq_exact",
        explanation: pe(
          "un événement impossible ne se produit jamais ; un événement certain se produit toujours.",
          "on compte les issues qui conviennent.",
          `${s.fav} ${pl(s.fav, "issue convient", "issues conviennent")} sur ${s.total}.`,
          `l’événement est ${cat}.`,
        ),
        canvas: s.canvas,
      };
    },
  },
  {
    kind: "template",
    id: "proba_vocabulaire_tpl_bornes",
    niveau: "5e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 4,
    theme: "neutral",
    hint: "Une probabilité est toujours entre 0 et 1.",
    tags: ["proba_experience", "vocabulaire", "bornes", "qcm", "template"],
    generate: () => {
      const p = pick(PRENOMS);
      const valide = () =>
        pick([
          () => { const b = ri(3, 12); return `${ri(1, b - 1)}/${b}`; },
          () => `0,${ri(1, 9)}${pick(["", String(ri(1, 9))])}`,
          () => pick(["0", "1"]),
        ])();
      const invalide = () =>
        pick([
          () => { const b = ri(2, 9); return `${b + ri(1, 5)}/${b}`; },
          () => `1,${ri(1, 9)}`,
          () => `${ri(2, 6)}`,
          () => `−0,${ri(1, 9)}`,
        ])();
      const peut = Math.random() < 0.35;
      const [faire, autre] = peut ? [valide, invalide] : [invalide, valide];
      const bonne = faire();
      const leurres = new Set<string>();
      while (leurres.size < 3) { const l = autre(); if (l !== bonne) leurres.add(l); }
      const text = peut
        ? pick([
            `Lequel de ces nombres peut être une probabilité ?`,
            `${p.nom} a trouvé quatre résultats. Un seul peut être une probabilité. Lequel ?`,
            `Quel nombre ${p.nom} peut-${p.f ? "elle" : "il"} donner comme probabilité ?`,
          ])
        : pick([
            `Lequel de ces nombres ne peut pas être une probabilité ?`,
            `${p.nom} a calculé quatre probabilités. Laquelle est forcément fausse ?`,
            `Un seul de ces nombres ne peut pas être une probabilité. Lequel ?`,
            `${p.nom} a fait une erreur : un de ses résultats ne peut pas être une probabilité. Lequel ?`,
          ]);
      return {
        text,
        format: "qcm",
        choices: melange([bonne, ...leurres]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: pe(
          "une probabilité est un nombre compris entre 0 (impossible) et 1 (certain).",
          "on compare chaque nombre à 0 et à 1.",
          peut ? `${bonne} est entre 0 et 1 ; les autres sont plus grands que 1 ou négatifs.` : `${bonne} est ${bonne.startsWith("−") ? "négatif" : "plus grand que 1"}.`,
          peut ? `${bonne} peut être une probabilité.` : `${bonne} ne peut pas être une probabilité.`,
        ),
      };
    },
  },
];