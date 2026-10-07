// lib/tutor-v4/question-banks/maths/6e/probabilites.bank.ts

import type {
  TutorBankItemV4,
  CanvasProbabilitesData,
} from "@/lib/tutor-v4/types";
import { PRENOMS, de, type Prenom } from "./entiers.bank";

function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: readonly T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function probabilitesCanvas(
  data: Omit<CanvasProbabilitesData, "kind">
): CanvasProbabilitesData {
  return { kind: "probabilites", ...data };
}

function pe(def: string, meth: string, obs: string, ccl: string) {
  return `Définition : ${def}\n\nMéthode : ${meth}\n\nObservation : ${obs}\n\nConclusion : ${ccl}`;
}

type DiceFace = 1 | 2 | 3 | 4 | 5 | 6;

/* ═══════════════════════════════════════════════════════════════════════════
   LES SITUATIONS (07/10/2026) — gabarits variés ET corrigés.
   Mesuré le 07/10 : 9 micros sur 9 sous le seuil (7 à 19 squelettes, 12 à 18
   répétitions sur 20). Chaque gabarit compose maintenant une SITUATION (sac de
   billes, bocal de bonbons, roue de kermesse, cartes, loto…) × une TOURNURE ×
   un PRÉNOM. Le texte écrit TOUJOURS le contenu en clair (« 3 billes rouges,
   5 billes bleues et 1 bille verte », « numérotées de 1 à 12 ») et l'événement
   entre guillemets : le correcteur (correcteurs/probabilites.ts) recompte les
   issues à partir de ce texte et refait le raisonnement.
   ═══════════════════════════════════════════════════════════════════════════ */

const ri = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
/** Virgule décimale française, trois décimales au plus. */
const virg = (x: number) => String(Math.round(x * 1000) / 1000).replace(".", ",");
/** « 2 000 » : espace des milliers. */
const milliers = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
const maj = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** « de tirer », « d’obtenir » (élision devant une voyelle). */
const deV = (s: string) => (/^[aeiouéèêàâîôûh]/i.test(s) ? `d’${s}` : `de ${s}`);
const pgcd = (a: number, b: number): number => (b ? pgcd(b, a % b) : a);
const ilElle = (p: Prenom) => (p.f ? "elle" : "il");
function deuxPrenoms(): [Prenom, Prenom] {
  const p = randomChoice(PRENOMS);
  let q = randomChoice(PRENOMS);
  while (q.nom === p.nom) q = randomChoice(PRENOMS);
  return [p, q];
}
/** « a », « a et b », « a, b et c ». */
function listeFr(xs: string[]) {
  return xs.length <= 1 ? xs.join("") : `${xs.slice(0, -1).join(", ")} et ${xs[xs.length - 1]}`;
}
/** Fraction réduite « 3/4 » (ou « 1 », « 0 »). */
function reduite(a: number, b: number) {
  if (a === 0) return "0";
  const g = pgcd(a, b);
  return b / g === 1 ? String(a / g) : `${a / g}/${b / g}`;
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
const O = {
  bille: { s: "bille", p: "billes", f: true, couleurs: TOUTES },
  jeton: { s: "jeton", p: "jetons", f: false, couleurs: TOUTES },
  bonbon: { s: "bonbon", p: "bonbons", f: false, couleurs: ["rouge", "vert", "jaune", "orange", "rose", "blanc"] },
  feutre: { s: "feutre", p: "feutres", f: false, couleurs: TOUTES },
  perle: { s: "perle", p: "perles", f: true, couleurs: TOUTES },
  balle: { s: "balle de tennis", p: "balles de tennis", f: true, couleurs: ["jaune", "orange", "blanc", "vert", "rose"] },
  ballon: { s: "ballon", p: "ballons", f: false, couleurs: ["rouge", "bleu", "vert", "jaune", "rose", "violet", "orange"] },
  pomme: { s: "pomme", p: "pommes", f: true, couleurs: ["rouge", "vert", "jaune"] },
  poisson: { s: "poisson", p: "poissons", f: false, couleurs: ["rouge", "orange", "jaune", "bleu", "vert"] },
  teeshirt: { s: "tee-shirt", p: "tee-shirts", f: false, couleurs: TOUTES },
  crayon: { s: "crayon", p: "crayons", f: false, couleurs: TOUTES },
  cube: { s: "cube", p: "cubes", f: false, couleurs: TOUTES },
  macaron: { s: "macaron", p: "macarons", f: false, couleurs: ["rose", "vert", "jaune", "violet", "blanc", "orange"] },
  fleur: { s: "fleur", p: "fleurs", f: true, couleurs: ["rouge", "jaune", "blanc", "rose", "violet", "orange"] },
  dossard: { s: "dossard", p: "dossards", f: false, couleurs: ["rouge", "bleu", "vert", "jaune", "orange", "blanc"] },
  mediator: { s: "médiator", p: "médiators", f: false, couleurs: TOUTES },
} satisfies Record<string, Objet>;
const un = (o: Objet) => (o.f ? "une" : "un");

type CtxUrne = {
  o: Objet;
  /** La phrase qui pose le contenu. */
  pose: (p: Prenom, contenu: string) => string;
  /** La phrase du tirage au hasard. */
  tire: (p: Prenom) => string;
  /** Le verbe de l'événement : « tirer », « attraper »… */
  v: string;
};
const CTX_URNES: CtxUrne[] = [
  { o: O.bille, pose: (p, c) => `Dans le sac de billes ${de(p.nom)}, il y a ${c}.`, tire: (p) => `${p.nom} prend une bille au hasard, sans regarder.`, v: "tirer" },
  { o: O.jeton, pose: (_p, c) => `Pour un jeu de société, une boîte contient ${c}.`, tire: (p) => `${p.nom} pioche un jeton au hasard.`, v: "piocher" },
  { o: O.bonbon, pose: (p, c) => `Au goûter, le bocal ${de(p.nom)} contient ${c}.`, tire: (p) => `${maj(ilElle(p))} prend un bonbon au hasard, les yeux fermés.`, v: "prendre" },
  { o: O.feutre, pose: (p, c) => `Dans la trousse ${de(p.nom)}, il y a ${c}.`, tire: (p) => `${maj(ilElle(p))} attrape un feutre au hasard, sans regarder.`, v: "attraper" },
  { o: O.perle, pose: (p, c) => `Pour fabriquer un bracelet, ${p.nom} a une boîte avec ${c}.`, tire: (p) => `${maj(ilElle(p))} prend une perle au hasard.`, v: "prendre" },
  { o: O.balle, pose: (_p, c) => `Au club de tennis, un panier contient ${c}.`, tire: (p) => `${p.nom} prend une balle au hasard.`, v: "prendre" },
  { o: O.ballon, pose: (p, c) => `Pour l’anniversaire ${de(p.nom)}, un carton contient ${c}.`, tire: (p) => `${p.nom} sort un ballon au hasard.`, v: "sortir" },
  { o: O.pomme, pose: (_p, c) => `Dans la cuisine, un panier contient ${c}.`, tire: (p) => `${p.nom} prend une pomme au hasard, sans regarder.`, v: "prendre" },
  { o: O.poisson, pose: (_p, c) => `À la fête foraine, le bac de la pêche à la ligne contient ${c}.`, tire: (p) => `${p.nom} attrape un poisson au hasard.`, v: "attraper" },
  { o: O.teeshirt, pose: (p, c) => `Pour son voyage, ${p.nom} a mis dans sa valise ${c}.`, tire: (p) => `Le matin, ${ilElle(p)} prend un tee-shirt au hasard.`, v: "prendre" },
  { o: O.crayon, pose: (_p, c) => `En arts plastiques, un pot contient ${c}.`, tire: (p) => `${p.nom} prend un crayon au hasard.`, v: "prendre" },
  { o: O.cube, pose: (p, c) => `Dans le jeu de construction ${de(p.nom)}, il y a ${c}.`, tire: (p) => `${maj(ilElle(p))} prend un cube au hasard dans la boîte.`, v: "prendre" },
  { o: O.macaron, pose: (_p, c) => `À la pâtisserie, une boîte contient ${c}.`, tire: (p) => `${p.nom} choisit un macaron au hasard, les yeux fermés.`, v: "choisir" },
  { o: O.fleur, pose: (p, c) => `Au jardin, ${p.nom} a cueilli ${c}.`, tire: (p) => `${maj(ilElle(p))} en prend une au hasard pour faire un bouquet.`, v: "prendre" },
  { o: O.dossard, pose: (_p, c) => `Avant le cross du collège, un sac contient ${c}.`, tire: (p) => `${p.nom} prend un dossard au hasard.`, v: "prendre" },
  { o: O.mediator, pose: (p, c) => `Dans l’étui de guitare ${de(p.nom)}, il y a ${c}.`, tire: (p) => `${maj(ilElle(p))} prend un médiator au hasard.`, v: "prendre" },
  { o: O.jeton, pose: (_p, c) => `À la kermesse de Saint-Pierre, à La Réunion, un sac contient ${c}.`, tire: (p) => `${p.nom} pioche un jeton au hasard.`, v: "piocher" },
];

type Urne = { ctx: CtxUrne; p: Prenom; contenu: { c: Coul; n: number }[] };
/** Une urne de `k` couleurs, de `nMin` à `nMax` objets par couleur. */
function nouvelleUrne(k: number, nMin: number, nMax: number, opts: { distincts?: boolean; maxTotal?: number } = {}): Urne {
  const ctx = randomChoice(CTX_URNES.filter((c) => c.o.couleurs.length >= k + 1));
  const couleurs = shuffle(ctx.o.couleurs).slice(0, k);
  for (;;) {
    const ns = couleurs.map(() => ri(nMin, nMax));
    if (opts.distincts && new Set(ns).size < k) continue;
    if (opts.maxTotal && ns.reduce((a, b) => a + b, 0) > opts.maxTotal) continue;
    return { ctx, p: randomChoice(PRENOMS), contenu: couleurs.map((c, i) => ({ c, n: ns[i] })) };
  }
}
/** Une urne dont on impose les effectifs. */
function urneAvec(ns: number[]): Urne {
  const ctx = randomChoice(CTX_URNES.filter((c) => c.o.couleurs.length >= ns.length + 1));
  const couleurs = shuffle(ctx.o.couleurs).slice(0, ns.length);
  return { ctx, p: randomChoice(PRENOMS), contenu: couleurs.map((c, i) => ({ c, n: ns[i] })) };
}
const totalUrne = (u: Urne) => u.contenu.reduce((a, x) => a + x.n, 0);
const groupe = (o: Objet, c: Coul, n: number) => `${n} ${n > 1 ? o.p : o.s} ${accorde(c, o.f, n > 1)}`;
const contenuUrne = (u: Urne) => listeFr(u.contenu.map((x) => groupe(u.ctx.o, x.c, x.n)));
const situationUrne = (u: Urne) => `${u.ctx.pose(u.p, contenuUrne(u))} ${u.ctx.tire(u.p)}`;
/** Une couleur de l'objet absente de l'urne. */
const couleurAbsente = (u: Urne) => randomChoice(u.ctx.o.couleurs.filter((c) => !u.contenu.some((x) => x.c === c)));
/** L'événement « tirer une bille rouge », « … rouge ou bleue », « … qui n’est pas verte ». */
function evtUrne(u: Urne, cs: Coul[], pas = false) {
  const o = u.ctx.o;
  const a = cs.map((c) => accorde(c, o.f, false));
  return pas ? `${u.ctx.v} ${un(o)} ${o.s} qui n’est pas ${a[0]}` : `${u.ctx.v} ${un(o)} ${o.s} ${a.join(" ou ")}`;
}
const favUrne = (u: Urne, cs: Coul[], pas = false) =>
  u.contenu.filter((x) => (pas ? !cs.includes(x.c) : cs.includes(x.c))).reduce((a, x) => a + x.n, 0);
/** Le sac dessiné : une bille par objet (24 au plus). */
function canvasUrne(u: Urne): CanvasProbabilitesData | undefined {
  if (totalUrne(u) > 24) return undefined;
  return probabilitesCanvas({
    variant: "billes",
    billes: { elements: u.contenu.flatMap((x) => Array.from({ length: x.n }, () => ({ couleur: x.c }))) },
  });
}

// Les expériences à issues numérotées de 1 à N (équiprobables).
type CtxNum = {
  Ns: number[];
  /** « nombre » ou « numéro » : le mot de l'événement. */
  mot: "nombre" | "numéro";
  pose: (p: Prenom, N: number) => string;
  canvas?: (N: number) => CanvasProbabilitesData | undefined;
};
const CTX_NUM: CtxNum[] = [
  {
    Ns: [4, 6, 8, 10, 12, 20], mot: "nombre",
    pose: (p, N) => `${p.nom} lance un dé à ${N} faces, numérotées de 1 à ${N}.`,
    canvas: (N) => (N === 6 ? probabilitesCanvas({ variant: "de", de: { faces: [1, 2, 3, 4, 5, 6] } }) : undefined),
  },
  { Ns: [6, 8, 10, 12, 15, 20], mot: "nombre", pose: (p, N) => `${p.nom} mélange ${N} cartes numérotées de 1 à ${N}. ${maj(ilElle(p))} en tire une au hasard.` },
  {
    Ns: [4, 5, 6, 8, 10, 12], mot: "nombre",
    pose: (p, N) => `À la kermesse, une roue a ${N} secteurs de même taille, numérotés de 1 à ${N}. ${p.nom} la fait tourner.`,
    canvas: (N) => probabilitesCanvas({ variant: "roue", roue: { segments: Array.from({ length: N }, (_, i) => ({ label: String(i + 1), poids: 1 })) } }),
  },
  { Ns: [10, 12, 15, 20, 25, 30], mot: "numéro", pose: (p, N) => `Au loto de l’école, un sac contient ${N} boules numérotées de 1 à ${N}. ${p.nom} en tire une au hasard.` },
  { Ns: [20, 30, 40, 50], mot: "numéro", pose: (p, N) => `Pour la tombola, ${N} tickets numérotés de 1 à ${N} sont dans une urne. ${p.nom} en tire un au hasard.` },
  { Ns: [20, 24, 25, 28, 30], mot: "numéro", pose: (_p, N) => `Les ${N} élèves d’une classe sont numérotés de 1 à ${N}. Le professeur tire un numéro au hasard.` },
  { Ns: [11, 12, 15, 16, 18, 20], mot: "numéro", pose: (p, N) => `Au club de foot, ${N} maillots numérotés de 1 à ${N} sont dans un sac. ${p.nom} en prend un au hasard.` },
  { Ns: [8, 10, 12, 15, 20], mot: "numéro", pose: (p, N) => `Dans un jeu vidéo, ${p.nom} entre dans un monde de ${N} niveaux numérotés de 1 à ${N}. Le jeu en choisit un au hasard.` },
  { Ns: [10, 12, 16, 20], mot: "numéro", pose: (p, N) => `Au jardin partagé, ${N} parcelles sont numérotées de 1 à ${N}. On tire au sort la parcelle ${de(p.nom)}.` },
  { Ns: [10, 12, 15, 20], mot: "numéro", pose: (p, N) => `En colonie de vacances, ${N} chambres sont numérotées de 1 à ${N}. ${p.nom} reçoit une chambre tirée au hasard.` },
  { Ns: [12, 15, 20, 24], mot: "numéro", pose: (p, N) => `Au parc animalier, ${N} enclos sont numérotés de 1 à ${N}. ${p.nom} tire au hasard le premier enclos à visiter.` },
  { Ns: [8, 10, 12], mot: "numéro", pose: (p, N) => `Au cours de musique, ${N} morceaux sont numérotés de 1 à ${N}. ${p.nom} en tire un au hasard pour le jouer.` },
  { Ns: [10, 15, 20], mot: "numéro", pose: (p, N) => `Au marché de Saint-Paul, à La Réunion, une loterie a ${N} billets numérotés de 1 à ${N}. ${p.nom} en tire un au hasard.` },
];
type Num = { ctx: CtxNum; p: Prenom; N: number };
function nouveauNum(filtre: (N: number) => boolean = () => true): Num {
  const ctx = randomChoice(CTX_NUM.filter((c) => c.Ns.some(filtre)));
  return { ctx, p: randomChoice(PRENOMS), N: randomChoice(ctx.Ns.filter(filtre)) };
}
const situationNum = (x: Num) => x.ctx.pose(x.p, x.N);
type EvtNum = { lib: string; ok: (v: number) => boolean };
/** Les événements sur des issues numérotées. `m` = « nombre » ou « numéro ». */
const EVN = {
  pair: (m: string): EvtNum => ({ lib: `obtenir un ${m} pair`, ok: (v) => v % 2 === 0 }),
  impair: (m: string): EvtNum => ({ lib: `obtenir un ${m} impair`, ok: (v) => v % 2 === 1 }),
  sup: (m: string, k: number): EvtNum => ({ lib: `obtenir un ${m} supérieur à ${k}`, ok: (v) => v > k }),
  inf: (m: string, k: number): EvtNum => ({ lib: `obtenir un ${m} inférieur à ${k}`, ok: (v) => v < k }),
  supEg: (m: string, k: number): EvtNum => ({ lib: `obtenir un ${m} supérieur ou égal à ${k}`, ok: (v) => v >= k }),
  infEg: (m: string, k: number): EvtNum => ({ lib: `obtenir un ${m} inférieur ou égal à ${k}`, ok: (v) => v <= k }),
  egal: (m: string, k: number): EvtNum => ({ lib: `obtenir le ${m} ${k}`, ok: (v) => v === k }),
  pas: (m: string, k: number): EvtNum => ({ lib: `ne pas obtenir le ${m} ${k}`, ok: (v) => v !== k }),
  mult: (m: string, k: number): EvtNum => ({ lib: `obtenir un multiple de ${k}`, ok: (v) => v % k === 0 }),
  deuxChiffres: (m: string): EvtNum => ({ lib: `obtenir un ${m} à deux chiffres`, ok: (v) => v >= 10 && v <= 99 }),
  pairSup: (m: string, k: number): EvtNum => ({ lib: `obtenir un ${m} pair supérieur à ${k}`, ok: (v) => v % 2 === 0 && v > k }),
  impairInf: (m: string, k: number): EvtNum => ({ lib: `obtenir un ${m} impair inférieur à ${k}`, ok: (v) => v % 2 === 1 && v < k }),
};
const favNum = (x: Num, e: EvtNum) => Array.from({ length: x.N }, (_, i) => i + 1).filter(e.ok).length;
const listeFav = (x: Num, e: EvtNum) => Array.from({ length: x.N }, (_, i) => i + 1).filter(e.ok);

/* Les cinq cases de l'échelle des probabilités. « peu » = au plus une chance sur
   quatre (sans être impossible) ; « tres » = au moins trois chances sur quatre
   (sans être certain). On ne tire JAMAIS un cas entre les deux (2 chances sur 5 :
   peu probable ou pas ?) : le correcteur refuse ces cas douteux. */
type Cat = "impossible" | "peu" | "moitie" | "tres" | "certain";
const MOT_CAT: Record<Cat, string> = {
  impossible: "impossible",
  peu: "peu probable",
  moitie: "une chance sur deux",
  tres: "très probable",
  certain: "certain",
};
function evtNumCat(x: Num, cat: Cat): EvtNum | null {
  const m = x.ctx.mot;
  const N = x.N;
  const o: EvtNum[] = [];
  const q = Math.floor(N / 4);
  if (cat === "impossible") o.push(EVN.sup(m, N), EVN.egal(m, N + ri(1, 9)), EVN.supEg(m, N + ri(1, 5)));
  if (cat === "certain") o.push(EVN.infEg(m, N), EVN.inf(m, N + ri(1, 5)), EVN.sup(m, 0));
  if (cat === "moitie" && N % 2 === 0) o.push(EVN.pair(m), EVN.impair(m), EVN.sup(m, N / 2), EVN.infEg(m, N / 2));
  if (cat === "peu" && N >= 4) {
    o.push(EVN.egal(m, ri(1, N)));
    for (let j = 1; j <= q; j++) o.push(EVN.sup(m, N - j), EVN.inf(m, j + 1));
    for (let k = 4; k <= Math.min(N, 10); k++) if (Math.floor(N / k) * 4 <= N) o.push(EVN.mult(m, k));
  }
  if (cat === "tres" && N >= 4) {
    o.push(EVN.pas(m, ri(1, N)));
    for (let j = 1; j <= q; j++) o.push(EVN.sup(m, j), EVN.infEg(m, N - j));
  }
  return o.length ? randomChoice(o) : null;
}
type EvtU = { u: Urne; cs: Coul[]; pas: boolean };
function urneCat(cat: Cat): EvtU {
  if (cat === "impossible") {
    const u = nouvelleUrne(ri(2, 3), 1, 6);
    return { u, cs: [couleurAbsente(u)], pas: false };
  }
  if (cat === "certain") {
    if (Math.random() < 0.5) {
      const u = nouvelleUrne(2, 1, 8);
      return { u, cs: u.contenu.map((x) => x.c), pas: false };
    }
    const u = nouvelleUrne(ri(2, 3), 1, 6);
    return { u, cs: [couleurAbsente(u)], pas: true };
  }
  if (cat === "moitie") {
    if (Math.random() < 0.5) {
      const n = ri(2, 8);
      const u = urneAvec([n, n]);
      return { u, cs: [u.contenu[ri(0, 1)].c], pas: false };
    }
    const b = ri(1, 4);
    const c = ri(1, 4);
    const u = urneAvec(shuffle([b + c, b, c]));
    const grand = u.contenu.find((x) => x.n === b + c)!.c;
    return { u, cs: [grand], pas: Math.random() < 0.5 };
  }
  // « peu » ou « tres » : une couleur rare (au plus un quart des objets).
  const rare = ri(1, 2);
  const autres = ri(2, 3) === 2 ? [ri(3 * rare, 12)] : [ri(rare, 6), ri(rare + 1, 7)];
  if (rare * 4 > rare + autres.reduce((a, b) => a + b, 0)) autres[0] += 3 * rare;
  const u = urneAvec(shuffle([rare, ...autres]));
  const cRare = u.contenu.find((x) => x.n === rare && !autres.includes(rare))?.c ?? u.contenu.find((x) => x.n === rare)!.c;
  if (cat === "peu") return { u, cs: [cRare], pas: false };
  // « très probable » : « qui n'est pas » la couleur rare, ou la seule autre couleur.
  if (u.contenu.length === 2 && Math.random() < 0.5) return { u, cs: [u.contenu.find((x) => x.c !== cRare)!.c], pas: false };
  return { u, cs: [cRare], pas: true };
}
type Exemple = { texte: string; canvas?: CanvasProbabilitesData; lib: string; fav: number; total: number };
/** Une situation et un événement de la catégorie demandée (urne, issues numérotées ou pièce). */
function exemple(cat: Cat, piece = false): Exemple {
  const r = Math.random();
  if (piece && r < 0.15 && (cat === "moitie" || cat === "certain")) {
    const p = randomChoice(PRENOMS);
    const texte = randomChoice([
      `${p.nom} lance une pièce de monnaie : elle tombe sur pile ou sur face.`,
      `Pour savoir qui commence le match, ${p.nom} lance une pièce : pile ou face.`,
    ]);
    const lib = cat === "certain" ? "obtenir pile ou face" : randomChoice(["obtenir pile", "obtenir face"]);
    return { texte, lib, fav: cat === "certain" ? 2 : 1, total: 2 };
  }
  if (r < 0.55) {
    for (;;) {
      const x = nouveauNum();
      const e = evtNumCat(x, cat);
      if (!e) continue;
      return { texte: situationNum(x), canvas: x.ctx.canvas?.(x.N), lib: e.lib, fav: favNum(x, e), total: x.N };
    }
  }
  const { u, cs, pas } = urneCat(cat);
  return { texte: situationUrne(u), canvas: canvasUrne(u), lib: evtUrne(u, cs, pas), fav: favUrne(u, cs, pas), total: totalUrne(u) };
}

// Les roues à secteurs de même taille, coloriés : le texte dit combien de secteurs de chaque couleur.
const SECTEUR: Objet = { s: "secteur", p: "secteurs", f: false, couleurs: ["rouge", "bleu", "vert", "jaune", "violet", "orange", "rose"] };
const INTROS_ROUE: ((p: Prenom) => string)[] = [
  (p) => `À la kermesse, ${p.nom} fait tourner une roue.`,
  (p) => `Dans un jeu de société, ${p.nom} fait tourner la roue des couleurs.`,
  (p) => `À la fête de l’école, ${p.nom} lance la roue de la loterie.`,
  (p) => `Au centre de loisirs, ${p.nom} fait tourner la roue des activités.`,
  (p) => `Au cours de sport, ${p.nom} fait tourner une roue pour choisir son équipe.`,
  (p) => `Au musée des sciences, ${p.nom} fait tourner une roue de jeu.`,
  (p) => `Au festival de musique, ${p.nom} fait tourner la roue des cadeaux.`,
  (p) => `Au camping, ${p.nom} fait tourner la roue du jeu du soir.`,
];
type Roue = { intro: (p: Prenom) => string; p: Prenom; contenu: { c: Coul; n: number }[] };
function roueAvec(ns: number[]): Roue {
  const couleurs = shuffle(SECTEUR.couleurs).slice(0, ns.length);
  return { intro: randomChoice(INTROS_ROUE), p: randomChoice(PRENOMS), contenu: couleurs.map((c, i) => ({ c, n: ns[i] })) };
}
const totalRoue = (r: Roue) => r.contenu.reduce((a, x) => a + x.n, 0);
const situationRoue = (r: Roue) =>
  `${r.intro(r.p)} La roue a ${totalRoue(r)} secteurs de même taille : ${listeFr(r.contenu.map((x) => groupe(SECTEUR, x.c, x.n)))}.`;
function evtRoue(r: Roue, cs: Coul[], pas = false) {
  const a = cs.map((c) => accorde(c, false, false));
  return pas ? `obtenir un secteur qui n’est pas ${a[0]}` : `obtenir un secteur ${a.join(" ou ")}`;
}
const favRoue = (r: Roue, cs: Coul[], pas = false) =>
  r.contenu.filter((x) => (pas ? !cs.includes(x.c) : cs.includes(x.c))).reduce((a, x) => a + x.n, 0);
/** La roue dessinée : un secteur par secteur du texte, couleurs mêlées. */
const canvasRoue = (r: Roue) =>
  probabilitesCanvas({
    variant: "roue",
    roue: { segments: shuffle(r.contenu.flatMap((x) => Array.from({ length: x.n }, () => ({ label: "", poids: 1, couleur: x.c })))) },
  });

/** Une expérience et un événement ni impossible ni certain : issues numérotées, sac ou roue. */
function experienceQuelconque(): Exemple {
  const r = Math.random();
  if (r < 0.4) {
    const x = nouveauNum((N) => N <= 20);
    const e = randomChoice(evenementsNum(x));
    return { texte: situationNum(x), canvas: x.ctx.canvas?.(x.N), lib: e.lib, fav: e.fav, total: x.N };
  }
  if (r < 0.8) {
    const u = nouvelleUrne(ri(2, 3), 1, 7, { maxTotal: 18 });
    const e = randomChoice(evenementsUrne(u));
    return { texte: situationUrne(u), canvas: canvasUrne(u), lib: e.lib, fav: e.fav, total: totalUrne(u) };
  }
  const ro = roueAvec(Array.from({ length: ri(2, 3) }, () => ri(1, 4)));
  const cs = shuffle(ro.contenu.map((x) => x.c));
  const pas = Math.random() < 0.3;
  return { texte: situationRoue(ro), canvas: canvasRoue(ro), lib: evtRoue(ro, [cs[0]], pas), fav: favRoue(ro, [cs[0]], pas), total: totalRoue(ro) };
}
/** « 1 chance sur 6 », « 3 chances sur 8 ». */
const chances = (a: number, b: number) => `${a} chance${a > 1 ? "s" : ""} sur ${b}`;
/** La bonne fraction et trois leurres de VALEURS différentes (inversée, contraire, favorables sur défavorables). */
function fractionsProposees(fav: number, tot: number, forme: (a: number, b: number) => string) {
  const bonne = forme(fav, tot);
  // « 8 chances sur 3 » ne se lit pas : la fraction inversée n'est proposée qu'écrite en fraction.
  const inverse: [number, number][] = forme === chances ? [] : [[tot, fav]];
  const cands: [number, number][] = [[tot - fav, tot], [fav, tot - fav], ...inverse, [fav, tot + fav], [fav + 1, tot], [1, tot]];
  const vus = new Set<number>([fav / tot]);
  const leurres: string[] = [];
  for (const [a, b] of cands) {
    if (a <= 0 || b <= 1 || vus.has(a / b) || leurres.length >= 3 || (forme === chances && a > b)) continue;
    vus.add(a / b);
    leurres.push(forme(a, b));
  }
  return { bonne, choices: shuffle([bonne, ...leurres]) };
}
/** Un exemple « proche de 0 » (au plus 1 sur 5) ou « proche de 1 » (au moins 4 sur 5). */
function exempleProche(cat: Cat): Exemple {
  for (;;) {
    const ex = exemple(cat);
    if (cat === "peu" && ex.fav * 5 > ex.total) continue;
    if (cat === "tres" && ex.fav * 5 < 4 * ex.total) continue;
    return ex;
  }
}

/** La question « proche de 0, proche de 1, impossible ou certain ? ». */
function poserProche(ex: Exemple, cat: Cat) {
  const rep = cat === "peu" ? "proche de 0" : cat === "tres" ? "proche de 1" : MOT_CAT[cat];
  const text = randomChoice([
    `${ex.texte} La probabilité de « ${ex.lib} » est-elle proche de 0, proche de 1, ou est-ce impossible ou certain ?`,
    `${ex.texte} Où se place la probabilité de « ${ex.lib} » ?`,
    `${ex.texte} La probabilité de « ${ex.lib} » est…`,
    `${ex.texte} Choisis ce qui décrit le mieux « ${ex.lib} ».`,
  ]);
  return {
    text,
    format: "qcm" as const,
    choices: ["proche de 0", "proche de 1", "impossible", "certain"],
    expected: [rep],
    comparator: "mcq_exact" as const,
    explanation: pe(
      "0 = impossible, 1 = certain. Très peu d’issues favorables : proche de 0. Presque toutes : proche de 1.",
      "on compare le nombre d’issues favorables au total.",
      `${chances(ex.fav, ex.total)}.`,
      cat === "peu" || cat === "tres" ? `la probabilité est ${rep}, sans être ${cat === "peu" ? "impossible" : "certain"}.` : `l’événement est ${rep}.`
    ),
    canvas: ex.canvas,
  };
}

/* LIRE UNE FIGURE : le texte ne donne PAS les nombres, l'élève les lit sur le dessin. */
type CtxVoici = { o: Objet; voici: (p: Prenom) => string };
const CTX_VOICI: CtxVoici[] = [
  { o: O.bille, voici: (p) => `Voici le sac de billes ${de(p.nom)}.` },
  { o: O.jeton, voici: () => "Voici les jetons d’un jeu de société." },
  { o: O.bonbon, voici: (p) => `Voici les bonbons du bocal ${de(p.nom)}.` },
  { o: O.perle, voici: (p) => `Voici les perles de la boîte ${de(p.nom)}.` },
  { o: O.feutre, voici: (p) => `Voici les feutres de la trousse ${de(p.nom)}.` },
  { o: O.dossard, voici: () => "Voici les dossards du cross, rangés dans un sac." },
  { o: O.cube, voici: (p) => `Voici les cubes du jeu de construction ${de(p.nom)}.` },
  { o: O.ballon, voici: (p) => `Voici les ballons de l’anniversaire ${de(p.nom)}.` },
  { o: O.balle, voici: () => "Voici les balles de tennis du panier du club." },
  { o: O.macaron, voici: () => "Voici les macarons d’une boîte de pâtisserie." },
  { o: O.mediator, voici: (p) => `Voici les médiators de l’étui de guitare ${de(p.nom)}.` },
  { o: O.poisson, voici: () => "Voici les poissons du bac de la pêche à la ligne." },
  { o: O.fleur, voici: (p) => `Voici les fleurs cueillies par ${p.nom} au jardin.` },
];
const ROUES_VOICI = [
  "Voici la roue de la kermesse.",
  "Voici la roue des couleurs d’un jeu de société.",
  "Voici la roue de la fête de l’école.",
  "Voici la roue du jeu du soir, au camping.",
  "Voici la roue du centre de loisirs.",
];
/** Un dessin (sac ou roue) dont seules les couleurs sont nommées dans le texte. */
function dessinColore(ns: number[]) {
  if (Math.random() < 0.7) {
    const ctx = randomChoice(CTX_VOICI.filter((c) => c.o.couleurs.length >= ns.length));
    const couleurs = shuffle(ctx.o.couleurs).slice(0, ns.length);
    const contenu = couleurs.map((c, i) => ({ c, n: ns[i] }));
    const canvas = probabilitesCanvas({ variant: "billes", billes: { elements: shuffle(contenu.flatMap((x) => Array.from({ length: x.n }, () => ({ couleur: x.c })))) } });
    return { intro: ctx.voici(randomChoice(PRENOMS)), o: ctx.o, contenu, canvas };
  }
  const couleurs = shuffle(SECTEUR.couleurs).slice(0, ns.length);
  const contenu = couleurs.map((c, i) => ({ c, n: ns[i] }));
  const canvas = probabilitesCanvas({
    variant: "roue",
    roue: { segments: shuffle(contenu.flatMap((x) => Array.from({ length: x.n }, () => ({ label: "", poids: 1, couleur: x.c })))) },
  });
  return { intro: `${randomChoice(ROUES_VOICI)} Ses secteurs ont tous la même taille.`, o: SECTEUR, contenu, canvas };
}

/* ═══ FRÉQUENCES (07/10/2026) ═══
   Une série d'essais se décrit TOUJOURS ainsi : « Résultats : « panier » 13 fois,
   « raté » 7 fois. » (ou dans un tableau Résultat | Nombre de fois). Les nombres
   obtenus sont TIRÉS AU HASARD (loi binomiale simulée) : ils ressemblent à de
   vrais relevés. */
/** Nombre de succès sur n essais de probabilité p (simulation). */
function binomial(n: number, p: number) {
  let k = 0;
  for (let i = 0; i < n; i++) if (Math.random() < p) k++;
  return k;
}
/** Répartit n essais entre des issues de probabilités données (simulation). */
function repartir(n: number, ps: number[]) {
  const ks = ps.map(() => 0);
  for (let i = 0; i < n; i++) {
    let r = Math.random();
    let j = 0;
    while (j < ps.length - 1 && (r -= ps[j]) >= 0) j++;
    ks[j]++;
  }
  return ks;
}
type CtxCalc = { intro: (p: Prenom, n: number) => string; issues: [string, number][] };
const CTX_CALC: CtxCalc[] = [
  { intro: (p, n) => `Au basket, ${p.nom} tente ${n} lancers francs.`, issues: [["panier", 0.6], ["raté", 0.4]] },
  { intro: (p, n) => `Au foot, ${p.nom} tire ${n} penalties.`, issues: [["but", 0.7], ["arrêté", 0.2], ["à côté", 0.1]] },
  { intro: (p, n) => `Aux fléchettes, ${p.nom} lance ${n} fléchettes.`, issues: [["dans la cible", 0.55], ["à côté", 0.45]] },
  { intro: (p, n) => `Au jardin, ${p.nom} sème ${n} graines de radis.`, issues: [["a germé", 0.8], ["n’a pas germé", 0.2]] },
  { intro: (p, n) => `Pendant ${n} jours de vacances, ${p.nom} note le temps qu’il fait.`, issues: [["soleil", 0.5], ["nuages", 0.3], ["pluie", 0.2]] },
  { intro: (p, n) => `${p.nom} lance ${n} fois une pièce.`, issues: [["pile", 0.5], ["face", 0.5]] },
  { intro: (p, n) => `${p.nom} lance ${n} fois un dé.`, issues: [["six", 1 / 6], ["autre chose", 5 / 6]] },
  { intro: (p, n) => `À la pêche, ${p.nom} lance sa ligne ${n} fois.`, issues: [["un poisson", 0.3], ["rien", 0.7]] },
  { intro: (p, n) => `Au bowling, ${p.nom} joue ${n} lancers.`, issues: [["strike", 0.2], ["pas de strike", 0.8]] },
  { intro: (p, n) => `En sciences, ${p.nom} laisse tomber ${n} fois une tartine en carton, beurrée d’un côté.`, issues: [["côté beurre", 0.5], ["côté sec", 0.5]] },
  { intro: (p, n) => `Au ping-pong, ${p.nom} fait ${n} services.`, issues: [["réussi", 0.75], ["faute", 0.25]] },
  { intro: (p, n) => `Au tir à l’arc, ${p.nom} tire ${n} flèches.`, issues: [["dans le jaune", 0.3], ["dans le rouge", 0.4], ["ailleurs", 0.3]] },
  { intro: (p, n) => `Au parc, ${p.nom} observe les ${n} premiers chiens qui passent.`, issues: [["en laisse", 0.7], ["sans laisse", 0.3]] },
  { intro: (p, n) => `À la kermesse, ${p.nom} joue ${n} fois à la pêche aux canards.`, issues: [["gagné", 0.3], ["perdu", 0.7]] },
  { intro: (p, n) => `Au marché de Saint-Pierre, à La Réunion, ${p.nom} joue ${n} fois à la roue de la loterie.`, issues: [["gagné", 0.25], ["perdu", 0.75]] },
];
type SerieCalc = { texte: string; canvas: CanvasProbabilitesData; issues: { l: string; k: number }[]; n: number; p: Prenom };
/** Une série relevée : le texte liste les résultats (ou renvoie au tableau). Aucune issue à 0. */
function serieCalc(ns: number[], maxIssues = 3): SerieCalc {
  for (;;) {
    const ctx = randomChoice(CTX_CALC.filter((c) => c.issues.length <= maxIssues));
    const n = randomChoice(ns);
    const ks = repartir(n, ctx.issues.map((x) => x[1]));
    if (ks.some((k) => k === 0)) continue;
    const p = randomChoice(PRENOMS);
    const issues = ctx.issues.map(([l], i) => ({ l, k: ks[i] }));
    const dansTexte = Math.random() < 0.5;
    const res = `Résultats : ${listeFr(issues.map((x) => `« ${x.l} » ${x.k} fois`))}.`;
    return {
      texte: `${ctx.intro(p, n)} ${dansTexte ? res : "Le tableau donne les résultats."}`,
      canvas: probabilitesCanvas({ variant: "tableau", tableau: { entetes: ["Résultat", "Nombre de fois"], lignes: issues.map((x) => [x.l, String(x.k)]) } }),
      issues,
      n,
      p,
    };
  }
}
/** Les écritures acceptées d'une fréquence k/n : décimal (2 chiffres au plus), fraction, fraction réduite, pourcentage. */
function ecrituresFrequence(k: number, n: number) {
  const f = k / n;
  return [...new Set([virg(f), `${k}/${n}`, reduite(k, n), `${virg(f * 100)} %`])];
}

/* Les expériences répétées dont on CONNAÎT la probabilité (le texte la rend calculable). */
type ExpRep = { intro: (n: number) => string; lib: string; num: number; den: number; objet: string; p: Prenom };
function experienceRepetee(): ExpRep {
  const p = randomChoice(PRENOMS);
  const r = ri(0, 4);
  if (r === 0) {
    return { p, intro: (n) => `${p.nom} lance ${milliers(n)} fois une pièce.`, lib: randomChoice(["obtenir pile", "obtenir face"]), num: 1, den: 2, objet: "la pièce" };
  }
  if (r === 1) {
    const [lib, num, den] = randomChoice([["obtenir deux piles", 1, 4], ["obtenir deux faces", 1, 4], ["obtenir un pile et un face", 1, 2]] as const);
    return { p, intro: (n) => `${p.nom} lance ${milliers(n)} fois deux pièces en même temps.`, lib, num, den, objet: "les pièces" };
  }
  if (r === 2) {
    const N = randomChoice([4, 6, 6, 8, 10, 12]);
    const e = Math.random() < 0.7 ? EVN.egal("nombre", ri(1, N)) : EVN.pair("nombre");
    // une seule face (1/N), ou les faces paires (la moitié, N étant pair)
    const den = e.lib.includes("pair") ? 2 : N;
    return { p, intro: (n) => `${p.nom} lance ${milliers(n)} fois un dé à ${N} faces, numérotées de 1 à ${N}.`, lib: e.lib, num: 1, den, objet: "le dé" };
  }
  if (r === 3) {
    const T = randomChoice([4, 5, 6, 8, 10]);
    const c = ri(1, T - 1);
    const ro = roueAvec([c, T - c]);
    const intro = (n: number) => `${p.nom} fait tourner ${milliers(n)} fois une roue. Elle a ${T} secteurs de même taille : ${listeFr(ro.contenu.map((x) => groupe(SECTEUR, x.c, x.n)))}.`;
    const g = pgcd(c, T);
    return { p, intro, lib: evtRoue(ro, [ro.contenu[0].c]), num: c / g, den: T / g, objet: "la roue" };
  }
  const o = randomChoice([O.bille, O.jeton, O.perle, O.cube]);
  const [c1, c2] = shuffle(o.couleurs).slice(0, 2);
  const a = ri(1, 5);
  const b = ri(1, 5);
  const g = pgcd(a, a + b);
  const cont = randomChoice(["Un sac", "Une boîte", "Une urne"]);
  return {
    p,
    intro: (n) =>
      `${cont} contient ${listeFr([groupe(o, c1, a), groupe(o, c2, b)])}. ${p.nom} tire ${milliers(n)} fois ${un(o)} ${o.s} au hasard, en ${o.f ? "la" : "le"} remettant à chaque fois.`,
    lib: `tirer ${un(o)} ${o.s} ${accorde(c1, o.f, false)}`,
    num: a / g,
    den: (a + b) / g,
    objet: cont === "Un sac" ? "le sac" : cont === "Une boîte" ? "la boîte" : "l’urne",
  };
}
const egalP = (a: number, b: number) => Math.abs(a - b) < 1e-9;
const fracTxt = (num: number, den: number) => (den === 1 ? String(num) : `${num}/${den}`);
const TRUQUE: Record<string, string> = {
  "la pièce": "la pièce est sans doute truquée",
  "les pièces": "les pièces sont sans doute truquées",
  "le dé": "le dé est sans doute truqué",
  "la roue": "la roue est sans doute truquée",
  "le sac": "le tirage est sans doute truqué",
  "la boîte": "le tirage est sans doute truqué",
  "l’urne": "le tirage est sans doute truqué",
};
/** Une série : écart NORMAL (peu d'essais, écart d'au plus 1,2 écart type) ou SUSPECT (beaucoup d'essais, au moins 5 écarts types). */
function tirageEcart(normal: boolean) {
  for (;;) {
    const e = experienceRepetee();
    const p = e.num / e.den;
    const n = normal ? randomChoice([20, 30, 40, 50, 60, 100]) : randomChoice([600, 800, 1000, 1200]);
    const s = Math.sqrt(n * p * (1 - p));
    const z = normal ? Math.random() * 2.4 - 1.2 : (Math.random() < 0.5 ? 1 : -1) * (6 + 3 * Math.random());
    const k = Math.round(n * p + z * s);
    if (k <= 0 || k >= n) continue;
    const zr = (k - n * p) / s;
    if (normal ? Math.abs(zr) > 1.2 : Math.abs(zr) < 5) continue;
    return { e, n, k, attendu: Math.round(n * p) };
  }
}


/* Deux contenants, deux enfants (comparer deux sacs). */
type CtxDeux = { o: Objet; cont: string; contF: boolean; v: string; tire: (filles: boolean) => string };
const chac = (f: boolean) => (f ? "chacune" : "chacun");
const CTX_DEUX: CtxDeux[] = [
  { o: O.bille, cont: "sac", contF: false, v: "tirer", tire: (f) => `${chac(f)} tire une bille au hasard dans son sac.` },
  { o: O.bonbon, cont: "bocal", contF: false, v: "prendre", tire: (f) => `${chac(f)} prend un bonbon au hasard dans son bocal.` },
  { o: O.jeton, cont: "boîte", contF: true, v: "piocher", tire: (f) => `${chac(f)} pioche un jeton au hasard dans sa boîte.` },
  { o: O.feutre, cont: "trousse", contF: true, v: "prendre", tire: (f) => `${chac(f)} prend un feutre au hasard dans sa trousse.` },
  { o: O.perle, cont: "boîte", contF: true, v: "prendre", tire: (f) => `${chac(f)} prend une perle au hasard dans sa boîte.` },
  { o: O.cube, cont: "boîte", contF: true, v: "prendre", tire: (f) => `${chac(f)} prend un cube au hasard dans sa boîte.` },
  { o: O.balle, cont: "panier", contF: false, v: "prendre", tire: (f) => `${chac(f)} prend une balle au hasard dans son panier.` },
  { o: O.ballon, cont: "carton", contF: false, v: "sortir", tire: (f) => `${chac(f)} sort un ballon au hasard de son carton.` },
  { o: O.crayon, cont: "pot", contF: false, v: "prendre", tire: (f) => `${chac(f)} prend un crayon au hasard dans son pot.` },
  { o: O.macaron, cont: "boîte", contF: true, v: "choisir", tire: (f) => `${chac(f)} choisit un macaron au hasard dans sa boîte.` },
];

/* Comparer deux événements d'une même expérience. */
type Ev = { lib: string; fav: number };
/** Tous les événements simples d'une urne : une couleur, deux couleurs, « qui n'est pas ». */
function evenementsUrne(u: Urne): Ev[] {
  const cs = u.contenu.map((x) => x.c);
  const out: Ev[] = [];
  for (const c of cs) {
    out.push({ lib: evtUrne(u, [c]), fav: favUrne(u, [c]) });
    out.push({ lib: evtUrne(u, [c], true), fav: favUrne(u, [c], true) });
  }
  for (let i = 0; i < cs.length; i++)
    for (let j = i + 1; j < cs.length; j++) out.push({ lib: evtUrne(u, [cs[i], cs[j]]), fav: favUrne(u, [cs[i], cs[j]]) });
  return out.filter((e) => e.fav > 0 && e.fav < totalUrne(u));
}
function evenementsNum(x: Num): Ev[] {
  const m = x.ctx.mot;
  const N = x.N;
  const es: EvtNum[] = [EVN.pair(m), EVN.impair(m)];
  for (let k = 2; k < N; k++) es.push(EVN.sup(m, k), EVN.inf(m, k));
  for (let k = 1; k <= N; k += ri(1, 3)) es.push(EVN.egal(m, k));
  for (let k = 3; k <= Math.min(6, N); k++) es.push(EVN.mult(m, k));
  return es.map((e) => ({ lib: e.lib, fav: favNum(x, e) })).filter((e) => e.fav > 0 && e.fav < N);
}
/** Deux événements distincts ; `egaux` : de même chance ou non. */
function deuxEv(evs: Ev[], egaux: boolean): [Ev, Ev] | null {
  for (let k = 0; k < 60; k++) {
    const a = randomChoice(evs);
    const b = randomChoice(evs);
    if (a.lib === b.lib) continue;
    if ((a.fav === b.fav) === egaux) return [a, b];
  }
  return null;
}
/** La question « lequel a le plus de chances ? », sous quatre tournures. */
function poserComparaison(texte: string, canvas: CanvasProbabilitesData | undefined, A: Ev, B: Ev, total: number) {
  const [p2, p3] = deuxPrenoms();
  const autant = p2.f && p3.f ? "elles ont autant de chances" : "ils ont autant de chances";
  const t = ri(0, 3);
  let text: string;
  let choices: string[];
  let expected: string;
  const gagne = A.fav > B.fav ? 0 : A.fav < B.fav ? 1 : 2;
  if (t === 0 || t === 1) {
    text = t === 0
      ? `${texte} Quel événement a le plus de chances : « ${A.lib} » ou « ${B.lib} » ?`
      : `${texte} Qu’est-ce qui est le plus probable : « ${A.lib} » ou « ${B.lib} » ?`;
    choices = [A.lib, B.lib, "les deux ont autant de chances"];
  } else if (t === 2) {
    text = `${texte} ${p2.nom} parie sur « ${A.lib} ». ${p3.nom} parie sur « ${B.lib} ». Qui a le plus de chances de gagner ?`;
    choices = [p2.nom, p3.nom, autant];
  } else {
    text = `${texte} Compare les chances de « ${A.lib} » et de « ${B.lib} ».`;
    choices = [`« ${A.lib} » a plus de chances`, `« ${B.lib} » a plus de chances`, "les deux ont autant de chances"];
  }
  expected = choices[gagne];
  return {
    text,
    format: "qcm" as const,
    choices,
    expected: [expected],
    comparator: "mcq_exact" as const,
    explanation: pe(
      "l’événement qui a le plus d’issues favorables a le plus de chances (les issues ont toutes la même chance).",
      "on compte les issues favorables de chaque événement, sur le même total.",
      `« ${A.lib} » : ${A.fav} chance${A.fav > 1 ? "s" : ""} sur ${total}. « ${B.lib} » : ${B.fav} chance${B.fav > 1 ? "s" : ""} sur ${total}.`,
      gagne === 2 ? "les deux événements ont autant de chances." : `« ${gagne === 0 ? A.lib : B.lib} » a plus de chances.`
    ),
    canvas,
  };
}

export const probabilitesBank: TutorBankItemV4[] = [
  /* =========================
     PROBA_VOCABULAIRE
  ========================= */

  {
    kind: "fixed",
    id: "6e_proba_vocabulaire_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Une issue est...",
    format: "qcm",
    choices: [
      "un résultat possible d’une expérience",
      "un calcul de périmètre",
      "une figure géométrique",
      "une unité de longueur",
    ],
    expected: ["un résultat possible d’une expérience"],
    comparator: "mcq_exact",
    hint: "Pense aux résultats possibles quand on lance un dé.",
    explanation:
      "Définition : une issue est un résultat possible d’une expérience aléatoire.\n\n" +
      "Méthode : on cherche les résultats qui peuvent arriver.\n\n" +
      "Observation : quand on lance un dé, obtenir 1, 2, 3, 4, 5 ou 6 sont des issues possibles.\n\n" +
      "Conclusion : une issue est donc un résultat possible.",
    tags: ["proba_experience", "vocabulaire", "issue", "qcm"],
  },

  {
    kind: "fixed",
    id: "6e_proba_vocabulaire_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Un événement impossible est un événement qui...",
    format: "qcm",
    choices: [
      "ne peut jamais se produire",
      "se produit toujours",
      "se produit une fois sur deux",
      "est très probable",
    ],
    expected: ["ne peut jamais se produire"],
    comparator: "mcq_exact",
    hint: "Impossible signifie que cela ne peut pas arriver.",
    explanation:
      "Définition : un événement impossible ne peut jamais se produire.\n\n" +
      "Méthode : on vérifie si l’événement peut apparaître parmi les issues possibles.\n\n" +
      "Observation : obtenir 7 avec un dé classique à 6 faces est impossible.\n\n" +
      "Conclusion : un événement impossible ne peut jamais arriver.",
    tags: ["proba_experience", "vocabulaire", "impossible", "qcm"],
  },

  {
    kind: "fixed",
    id: "6e_proba_vocabulaire_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Un événement certain est un événement qui...",
    format: "qcm",
    choices: [
      "se produit toujours",
      "ne se produit jamais",
      "est impossible à prévoir",
      "a une chance sur deux",
    ],
    expected: ["se produit toujours"],
    comparator: "mcq_exact",
    hint: "Certain signifie que cela arrive à chaque fois.",
    explanation:
      "Définition : un événement certain se produit toujours.\n\n" +
      "Méthode : on vérifie si toutes les issues possibles réalisent l’événement.\n\n" +
      "Observation : obtenir un nombre inférieur à 7 avec un dé classique est certain.\n\n" +
      "Conclusion : un événement certain arrive toujours.",
    tags: ["proba_experience", "vocabulaire", "certain", "qcm"],
  },

  {
    kind: "fixed",
    id: "6e_proba_vocabulaire_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "La probabilité d’un événement est toujours comprise entre...",
    format: "qcm",
    choices: ["0 et 1", "1 et 10", "0 et 1000", "-1 et 1"],
    expected: ["0 et 1"],
    comparator: "mcq_exact",
    hint: "0 signifie impossible, 1 signifie certain.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise.\n\n" +
      "Méthode : on utilise une valeur entre 0 et 1.\n\n" +
      "Observation : 0 correspond à impossible et 1 correspond à certain.\n\n" +
      "Conclusion : une probabilité est toujours comprise entre 0 et 1.",
    tags: ["proba_experience", "vocabulaire", "probabilite", "qcm"],
  },

  {
    kind: "fixed",
    id: "6e_proba_vocabulaire_open_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle phrase dit bien la différence entre « impossible » et « certain » ?",
    format: "qcm",
    choices: [
      "Impossible : cela n’arrive jamais. Certain : cela arrive à chaque fois.",
      "Impossible : cela arrive rarement. Certain : cela arrive souvent.",
      "Impossible et certain veulent dire la même chose.",
      "Impossible : cela arrive à chaque fois. Certain : cela n’arrive jamais.",
    ],
    expected: ["Impossible : cela n’arrive jamais. Certain : cela arrive à chaque fois."],
    comparator: "mcq_exact",
    hint: "Utilise les mots jamais et toujours.",
    explanation:
      "Définition : un événement impossible ne peut jamais se produire, alors qu’un événement certain se produit toujours.\n\n" +
      "Méthode : on regarde les issues possibles.\n\n" +
      "Observation : si aucune issue ne réalise l’événement, il est impossible ; si toutes les issues le réalisent, il est certain.\n\n" +
      "Conclusion : impossible signifie jamais, certain signifie toujours.",
    tags: ["proba_experience", "vocabulaire", "qcm", "langage"],
  },

  /* =========================
     PROBA_ISSUE
  ========================= */

  {
    kind: "fixed",
    id: "6e_proba_issue_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 1,
    theme: "neutral",
    text: "On lance un dé classique à 6 faces. Combien y a-t-il d’issues possibles ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Compte les faces du dé.",
    explanation:
      "Définition : les issues sont tous les résultats possibles.\n\n" +
      "Méthode : on compte les faces du dé.\n\n" +
      "Observation : un dé classique possède 6 faces numérotées de 1 à 6.\n\n" +
      "Conclusion : il y a 6 issues possibles.",
    tags: ["proba_experience", "issue", "de", "canvas"],
    canvas: probabilitesCanvas({
      variant: "de",
      de: {
        faces: [1, 2, 3, 4, 5, 6],
      },
    }),
  },

  {
    kind: "fixed",
    id: "6e_proba_issue_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 2,
    theme: "neutral",
    text: "On lance un dé classique. Combien d’issues réalisent l’événement : obtenir un nombre pair ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Les nombres pairs du dé sont 2, 4 et 6.",
    explanation:
      "Définition : une issue réalise un événement si elle correspond à ce que l’on cherche.\n\n" +
      "Méthode : on liste les nombres pairs possibles sur le dé.\n\n" +
      "Observation : les issues favorables sont 2, 4 et 6.\n\n" +
      "Conclusion : 3 issues réalisent l’événement.",
    tags: ["proba_experience", "issue", "de", "pair", "canvas"],
    canvas: probabilitesCanvas({
      variant: "de",
      de: {
        faces: [1, 2, 3, 4, 5, 6],
        surligne: [2, 4, 6],
      },
    }),
  },

{
  kind: "template",
  id: "6e_proba_issue_tpl_1_de",
  niveau: "6e",
  matiere: "maths",
  notionId: "proba_experience",
  microId: "proba_issue",
  difficulty: 2,
  theme: "neutral",
  hint: "Écris toutes les issues, puis entoure celles qui réalisent l’événement.",
  tags: ["proba_experience", "issue", "de", "template", "canvas"],
  // ★2 : combien d'issues réalisent un événement simple ?
  generate: () => {
    let texte: string;
    let canvas: CanvasProbabilitesData | undefined;
    let lib: string;
    let fav: number;
    let detail: string;
    if (Math.random() < 0.65) {
      const x = nouveauNum((N) => N <= 20);
      const m = x.ctx.mot;
      const k = ri(2, x.N - 1);
      const e = randomChoice([EVN.pair(m), EVN.impair(m), EVN.sup(m, k), EVN.inf(m, k), EVN.supEg(m, k), EVN.infEg(m, k), EVN.egal(m, ri(1, x.N))]);
      texte = situationNum(x);
      canvas = x.ctx.canvas?.(x.N);
      lib = e.lib;
      fav = favNum(x, e);
      detail = fav ? `Les issues favorables sont : ${listeFr(listeFav(x, e).map(String))}.` : "Aucune issue ne convient.";
    } else {
      const u = nouvelleUrne(ri(2, 3), 1, 7, { maxTotal: 20 });
      const c = randomChoice(u.contenu).c;
      texte = situationUrne(u);
      canvas = canvasUrne(u);
      lib = evtUrne(u, [c]);
      fav = favUrne(u, [c]);
      detail = `Chaque ${u.ctx.o.s} est une issue. ${maj(groupe(u.ctx.o, c, fav))} : ${fav} issue${fav > 1 ? "s" : ""}.`;
    }
    const text = randomChoice([
      `${texte} Combien d’issues réalisent l’événement « ${lib} » ?`,
      `${texte} Combien d’issues sont favorables à « ${lib} » ?`,
      `${texte} Compte les issues favorables à l’événement « ${lib} ».`,
      `${texte} Pour l’événement « ${lib} », combien d’issues conviennent ?`,
    ]);
    return {
      text,
      format: "short",
      expected: [String(fav)],
      comparator: "number_equal",
      explanation: pe(
        "une issue favorable est un résultat qui réalise l’événement.",
        "on écrit les issues possibles, puis on garde celles qui conviennent.",
        detail,
        `il y a ${fav} issue${fav > 1 ? "s" : ""} favorable${fav > 1 ? "s" : ""}.`
      ),
      canvas,
    };
  },
},

  {
    kind: "template",
    id: "6e_proba_issue_tpl_2_roue",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 3,
    theme: "neutral",
    hint: "Chaque secteur est une issue : compte les secteurs qui conviennent.",
    tags: ["proba_experience", "issue", "roue", "template", "canvas"],
    // ★3 : roue coloriée ; « rouge ou bleu », « qui n'est pas vert ».
    generate: () => {
      const r = roueAvec(Array.from({ length: ri(3, 4) }, () => ri(1, 4)));
      const cs = shuffle(r.contenu.map((x) => x.c));
      const genre = randomChoice(["ou", "pas", "ou", "pas", "une"] as const);
      const choisis = genre === "ou" ? cs.slice(0, 2) : cs.slice(0, 1);
      const lib = evtRoue(r, choisis, genre === "pas");
      const fav = favRoue(r, choisis, genre === "pas");
      const text = randomChoice([
        `${situationRoue(r)} Combien de secteurs réalisent l’événement « ${lib} » ?`,
        `${situationRoue(r)} Combien d’issues sont favorables à « ${lib} » ?`,
        `${situationRoue(r)} Compte les secteurs favorables à l’événement « ${lib} ».`,
        `${situationRoue(r)} Pour l’événement « ${lib} », combien de secteurs conviennent ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(fav)],
        comparator: "number_equal",
        explanation: pe(
          "chaque secteur est une issue ; les secteurs ont la même taille, donc la même chance.",
          genre === "pas" ? "on compte tous les secteurs SAUF ceux de la couleur citée." : "on additionne les secteurs des couleurs citées.",
          `${listeFr(r.contenu.filter((x) => (genre === "pas" ? !choisis.includes(x.c) : choisis.includes(x.c))).map((x) => groupe(SECTEUR, x.c, x.n)))} : ${fav} secteur${fav > 1 ? "s" : ""}.`,
          `${fav} issue${fav > 1 ? "s" : ""} réalise${fav > 1 ? "nt" : ""} l’événement.`
        ),
        canvas: canvasRoue(r),
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_proba_issue_open_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 4,
    theme: "neutral",
    text: "Pourquoi faut-il lister TOUTES les issues avant de calculer une probabilité ?",
    format: "qcm",
    choices: [
      "Si on oublie une issue, le total est faux, donc la probabilité aussi.",
      "Pour que la probabilité soit plus grande.",
      "Ce n’est pas utile : on peut deviner.",
      "Pour avoir toujours une chance sur deux.",
    ],
    expected: ["Si on oublie une issue, le total est faux, donc la probabilité aussi."],
    comparator: "mcq_exact",
    hint: "Si on oublie une issue, le raisonnement peut être faux.",
    explanation:
      "Définition : une probabilité dépend des issues possibles et des issues favorables.\n\n" +
      "Méthode : on commence par lister toutes les issues.\n\n" +
      "Observation : si on oublie une issue, on peut mal comparer ou mal calculer.\n\n" +
      "Conclusion : lister toutes les issues permet d’éviter les erreurs.",
    tags: ["proba_experience", "issue", "qcm", "methode", "raisonnement"],
  },

  /* =========================
     PROBA_COMPARER
  ========================= */

  {
    kind: "fixed",
    id: "6e_proba_comparer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Sur ce dé, quel événement est le plus probable ?",
    format: "qcm",
    choices: [
      "obtenir un nombre pair",
      "obtenir 6",
      "obtenir un nombre supérieur à 5",
      "obtenir 1",
    ],
    expected: ["obtenir un nombre pair"],
    comparator: "mcq_exact",
    hint: "Compare le nombre d’issues favorables.",
    explanation:
      "Définition : plus un événement a d’issues favorables, plus il est probable.\n\n" +
      "Méthode : on compte les issues favorables pour chaque événement.\n\n" +
      "Observation : obtenir un nombre pair correspond à 2, 4 et 6, donc 3 issues favorables.\n\n" +
      "Conclusion : obtenir un nombre pair est l’événement le plus probable.",
    tags: ["proba_experience", "comparer", "de", "canvas"],
    canvas: probabilitesCanvas({
      variant: "de",
      de: {
        faces: [1, 2, 3, 4, 5, 6],
        surligne: [2, 4, 6],
      },
    }),
  },

  {
    kind: "template",
    id: "6e_proba_comparer_tpl_1_billes",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les objets favorables à chaque événement, puis compare.",
    tags: ["proba_experience", "comparer", "billes", "template", "canvas"],
    // ★3 : deux événements sur un même sac (une couleur, deux couleurs, « qui n'est pas »).
    generate: () => {
      for (;;) {
        const u = nouvelleUrne(ri(3, 4), 1, 6, { maxTotal: 20 });
        const AB = deuxEv(evenementsUrne(u), Math.random() < 0.3);
        if (!AB) continue;
        return poserComparaison(situationUrne(u), canvasUrne(u), AB[0], AB[1], totalUrne(u));
      }
    },
  },

  {
    kind: "template",
    id: "6e_proba_comparer_tpl_2_roue",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Écris les issues favorables à chaque événement, puis compare leurs nombres.",
    tags: ["proba_experience", "comparer", "roue", "template", "canvas"],
    // ★3 : deux événements sur des issues numérotées (dé, cartes, roue, loto…).
    generate: () => {
      for (;;) {
        const x = nouveauNum((N) => N <= 20);
        const AB = deuxEv(evenementsNum(x), Math.random() < 0.3);
        if (!AB) continue;
        return poserComparaison(situationNum(x), x.ctx.canvas?.(x.N), AB[0], AB[1], x.N);
      }
    },
  },

  {
    kind: "template",
    id: "6e_proba_comparer_tpl_4_couleur",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "La couleur la plus nombreuse a le plus de chances de sortir.",
    tags: ["proba_experience", "comparer", "template", "canvas"],
    // ★2 : quelle couleur a le plus (le moins) de chances ? sac ou roue coloriée.
    generate: () => {
      const k = ri(3, 4);
      const ns = shuffle([1, 2, 3, 4, 5, 6, 7]).slice(0, k);
      let texte: string;
      let canvas: CanvasProbabilitesData;
      let contenu: { c: Coul; n: number }[];
      let mot: string;
      if (Math.random() < 0.65) {
        const u = urneAvec(ns);
        texte = situationUrne(u);
        canvas = canvasUrne(u)!;
        contenu = u.contenu;
        mot = u.ctx.o.p;
      } else {
        const r = roueAvec(ns);
        texte = situationRoue(r);
        canvas = canvasRoue(r);
        contenu = r.contenu;
        mot = "secteurs";
      }
      const plus = Math.random() < 0.6;
      const [p2] = deuxPrenoms();
      const text = plus
        ? randomChoice([
            `${texte} Quelle couleur a le plus de chances de sortir ?`,
            `${texte} Quelle couleur est la plus probable ?`,
            `${texte} ${p2.nom} veut gagner. Sur quelle couleur doit-${ilElle(p2)} parier ?`,
          ])
        : randomChoice([`${texte} Quelle couleur a le moins de chances de sortir ?`, `${texte} Quelle couleur est la moins probable ?`]);
      const tri = [...contenu].sort((a, b) => b.n - a.n);
      const bonne = plus ? tri[0] : tri[tri.length - 1];
      return {
        text,
        format: "qcm",
        choices: [...shuffle(contenu.map((x) => x.c as string)), "toutes les couleurs ont autant de chances"],
        expected: [bonne.c],
        comparator: "mcq_exact",
        explanation: pe(
          "chaque objet (ou secteur) a la même chance : la couleur la plus nombreuse est la plus probable.",
          `on compte les ${mot} de chaque couleur.`,
          `${tri.map((x) => `${accorde(x.c, false, false)} : ${x.n}`).join(" ; ")}.`,
          `la couleur ${plus ? "la plus" : "la moins"} probable est : ${bonne.c}.`
        ),
        canvas,
      };
    },
  },
  {
    kind: "template",
    id: "6e_proba_comparer_tpl_5_deux_sacs",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_comparer",
    difficulty: 4,
    theme: "neutral",
    hint: "Ce n’est pas le nombre qui compte, c’est la part : compare à la moitié, ou au même total.",
    tags: ["proba_experience", "comparer", "deux_sacs", "template"],
    // ★4 : deux sacs ; le piège « plus de billes rouges = plus de chances ».
    generate: () => {
      const ctx = randomChoice(CTX_DEUX);
      const [p1, p2] = deuxPrenoms();
      const [c, d] = shuffle(ctx.o.couleurs).slice(0, 2);
      const cas = randomChoice(["total", "rouges", "moitie", "moitie", "egal"] as const);
      let r1: number, t1: number, r2: number, t2: number;
      for (;;) {
        r1 = ri(1, 6); t1 = r1 + ri(1, 8); r2 = ri(1, 6); t2 = r2 + ri(1, 8);
        if (cas === "total") { t2 = t1; if (r2 >= t2) continue; if (r1 === r2) continue; }
        if (cas === "rouges") { r2 = r1; t2 = r2 + ri(1, 8); if (t1 === t2) continue; }
        if (cas === "moitie") {
          // l'un dépasse la moitié, l'autre non, et celui qui en a le MOINS a la meilleure part
          if (!((2 * r1 > t1 && 2 * r2 < t2 && r1 < r2) || (2 * r2 > t2 && 2 * r1 < t1 && r2 < r1))) continue;
        }
        if (cas === "egal") { const f = ri(2, 3); r2 = r1 * f; t2 = t1 * f; if (t2 > 16) continue; }
        if (t1 <= 16 && t2 <= 16) break;
      }
      const o = ctx.o;
      const cont = (p: Prenom) => `${ctx.contF ? "la" : "le"} ${ctx.cont} ${de(p.nom)}`;
      const s1 = listeFr([groupe(o, c, r1), groupe(o, d, t1 - r1)]);
      const s2 = listeFr([groupe(o, d, t2 - r2), groupe(o, c, r2)]);
      const lib = `${ctx.v} ${un(o)} ${o.s} ${accorde(c, o.f, false)}`;
      const filles = p1.f && p2.f;
      const autant = filles ? "elles ont autant de chances" : "ils ont autant de chances";
      const text =
        `${p1.nom} et ${p2.nom} ont ${filles ? "chacune" : "chacun"} ${ctx.contF ? "une" : "un"} ${ctx.cont}. ` +
        `Dans ${cont(p1)}, il y a ${s1}. Dans ${cont(p2)}, il y a ${s2}. ${maj(ctx.tire(filles))} ` +
        randomChoice([
          `Qui a le plus de chances de « ${lib} » ?`,
          `Qui a la meilleure chance de « ${lib} » ?`,
          `Pour « ${lib} », qui a le plus de chances ?`,
        ]);
      const comp = r1 * t2 - r2 * t1;
      const expected = comp > 0 ? p1.nom : comp < 0 ? p2.nom : autant;
      return {
        text,
        format: "qcm",
        choices: [p1.nom, p2.nom, autant],
        expected: [expected],
        comparator: "mcq_exact",
        explanation: pe(
          "les chances dépendent de la PART des objets favorables, pas de leur nombre.",
          "on écrit « nombre favorable sur nombre total » pour chacun, puis on compare (au même total, ou à la moitié).",
          `${p1.nom} : ${r1} sur ${t1}${reduite(r1, t1) !== `${r1}/${t1}` ? `, soit ${reduite(r1, t1)}` : ""}. ` +
            `${p2.nom} : ${r2} sur ${t2}${reduite(r2, t2) !== `${r2}/${t2}` ? `, soit ${reduite(r2, t2)}` : ""}.` +
            (cas === "moitie" ? " L’un a plus de la moitié de ses objets favorables, l’autre moins de la moitié." : ""),
          comp === 0 ? "les deux parts sont égales : autant de chances." : `${expected} a le plus de chances.`
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "6e_proba_comparer_open_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_comparer",
    difficulty: 4,
    theme: "neutral",
    text: "Sur un même dé, comment savoir lequel de deux événements est le plus probable ?",
    format: "qcm",
    choices: [
      "On compte les issues favorables de chacun : le plus grand nombre gagne.",
      "On choisit celui qui a le plus long nom.",
      "On choisit celui avec les plus grands nombres.",
      "On ne peut pas savoir avant de lancer le dé.",
    ],
    expected: ["On compte les issues favorables de chacun : le plus grand nombre gagne."],
    comparator: "mcq_exact",
    hint: "Il faut compter les issues favorables.",
    explanation:
      "Définition : un événement est plus probable s’il a plus de chances de se produire.\n\n" +
      "Méthode : on compte les issues favorables pour chaque événement.\n\n" +
      "Observation : l’événement qui possède le plus d’issues favorables est le plus probable.\n\n" +
      "Conclusion : comparer des probabilités demande de comparer les issues favorables.",
    tags: ["proba_experience", "comparer", "qcm", "methode"],
  },
    /* =========================
     PROBA_ESTIMER
  ========================= */

  {
    kind: "fixed",
    id: "6e_proba_estimer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_estimer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle probabilité correspond à un événement impossible ?",
    format: "qcm",
    choices: ["0", "1", "0,5", "2"],
    expected: ["0"],
    comparator: "mcq_exact",
    hint: "Impossible signifie que cela ne peut jamais arriver.",
    explanation:
      "Définition : une probabilité est comprise entre 0 et 1.\n\n" +
      "Méthode : on associe 0 à impossible et 1 à certain.\n\n" +
      "Observation : un événement impossible ne se produit jamais.\n\n" +
      "Conclusion : sa probabilité est 0.",
    tags: ["proba_experience", "estimer", "impossible", "qcm"],
  },

  {
    kind: "fixed",
    id: "6e_proba_estimer_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_estimer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle probabilité correspond à un événement certain ?",
    format: "qcm",
    choices: ["1", "0", "0,25", "10"],
    expected: ["1"],
    comparator: "mcq_exact",
    hint: "Certain signifie que cela arrive toujours.",
    explanation:
      "Définition : une probabilité est comprise entre 0 et 1.\n\n" +
      "Méthode : on associe 1 à un événement certain.\n\n" +
      "Observation : un événement certain se produit toujours.\n\n" +
      "Conclusion : sa probabilité est 1.",
    tags: ["proba_experience", "estimer", "certain", "qcm"],
  },

{
  kind: "template",
  id: "6e_proba_estimer_tpl_1_de_fraction",
  niveau: "6e",
  matiere: "maths",
  notionId: "proba_experience",
  microId: "proba_estimer",
  difficulty: 3,
  theme: "neutral",
  hint: "Probabilité = nombre d’issues favorables sur nombre d’issues possibles.",
  tags: ["proba_experience", "estimer", "de", "fraction", "template", "canvas"],
  // ★3 : la probabilité en fraction, ou « 3 chances sur 8 ».
  generate: () => {
    const ex = experienceQuelconque();
    const enChances = Math.random() < 0.4;
    const { bonne, choices } = fractionsProposees(ex.fav, ex.total, enChances ? chances : (a, b) => `${a}/${b}`);
    const [p2] = deuxPrenoms();
    const text = enChances
      ? randomChoice([
          `${ex.texte} Combien de chances y a-t-il de « ${ex.lib} » ?`,
          `${ex.texte} ${p2.nom} veut « ${ex.lib} ». Combien de chances a-t-${ilElle(p2)} ?`,
        ])
      : randomChoice([
          `${ex.texte} Quelle est la probabilité de « ${ex.lib} » ?`,
          `${ex.texte} Écris la probabilité de l’événement « ${ex.lib} ».`,
          `${ex.texte} Quelle fraction donne la probabilité de « ${ex.lib} » ?`,
        ]);
    return {
      text,
      format: "qcm",
      choices,
      expected: [bonne],
      comparator: "mcq_exact",
      explanation: pe(
        "quand toutes les issues ont la même chance, la probabilité est : nombre d’issues favorables sur nombre total d’issues.",
        "on compte le total, puis les issues favorables.",
        `Il y a ${ex.total} issues, dont ${ex.fav} favorable${ex.fav > 1 ? "s" : ""} : ${chances(ex.fav, ex.total)}.`,
        `la probabilité est ${ex.fav}/${ex.total}${reduite(ex.fav, ex.total) !== `${ex.fav}/${ex.total}` ? ` (c’est aussi ${reduite(ex.fav, ex.total)})` : ""}.`
      ),
      canvas: ex.canvas,
    };
  },
},

  {
    kind: "template",
    id: "6e_proba_estimer_tpl_2_billes_proche",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_estimer",
    difficulty: 4,
    theme: "neutral",
    hint: "Presque toutes les issues favorables : proche de 1. Presque aucune : proche de 0.",
    tags: ["proba_experience", "estimer", "billes", "template", "canvas"],
    // ★4 : proche de 0, proche de 1 — ou vraiment impossible, certain ? (sacs et issues numérotées)
    generate: () => {
      const cat = randomChoice<Cat>(["peu", "tres", "peu", "tres", "impossible", "certain"]);
      const ex = exempleProche(cat);
      return poserProche(ex, cat);
    },
  },

  {
    kind: "template",
    id: "6e_proba_estimer_tpl_4_zero_un",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_estimer",
    difficulty: 1,
    theme: "neutral",
    hint: "Impossible : 0. Certain : 1. Une chance sur deux : 1/2.",
    tags: ["proba_experience", "estimer", "template"],
    // ★1 : 0, 1/2 ou 1.
    generate: () => {
      const cat = randomChoice<Cat>(["impossible", "moitie", "certain"]);
      const ex = exemple(cat, true);
      const rep = cat === "impossible" ? "0" : cat === "certain" ? "1" : "1/2";
      const text = randomChoice([
        `${ex.texte} Quelle est la probabilité de « ${ex.lib} » ?`,
        `${ex.texte} Quel nombre donne la chance de « ${ex.lib} » ?`,
        `${ex.texte} La probabilité de « ${ex.lib} » vaut-elle 0, 1/2 ou 1 ?`,
        `${ex.texte} Place « ${ex.lib} » sur l’échelle de 0 à 1.`,
      ]);
      return {
        text,
        format: "qcm",
        choices: ["0", "1/2", "1"],
        expected: [rep],
        comparator: "mcq_exact",
        explanation: pe(
          "impossible vaut 0 ; certain vaut 1 ; une chance sur deux vaut 1/2.",
          "on compte les issues favorables parmi toutes les issues.",
          `${chances(ex.fav, ex.total)}.`,
          `la probabilité de « ${ex.lib} » est ${rep}.`
        ),
        canvas: ex.canvas,
      };
    },
  },
  {
    kind: "template",
    id: "6e_proba_estimer_tpl_5_echelle",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_estimer",
    difficulty: 2,
    theme: "neutral",
    hint: "Compare le nombre d’issues favorables au total : aucune, très peu, la moitié, presque toutes, toutes ?",
    tags: ["proba_experience", "estimer", "template"],
    // ★2 : l'échelle 0, proche de 0, 1/2, proche de 1, 1.
    generate: () => {
      const cat = randomChoice<Cat>(["impossible", "peu", "moitie", "tres", "certain"]);
      const ex = exempleProche(cat);
      const rep = { impossible: "0", peu: "proche de 0", moitie: "1/2", tres: "proche de 1", certain: "1" }[cat];
      const text = randomChoice([
        `${ex.texte} Où places-tu la probabilité de « ${ex.lib} » entre 0 et 1 ?`,
        `${ex.texte} La probabilité de « ${ex.lib} » est…`,
        `${ex.texte} Quelle valeur convient pour la probabilité de « ${ex.lib} » ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: ["0", "proche de 0", "1/2", "proche de 1", "1"],
        expected: [rep],
        comparator: "mcq_exact",
        explanation: pe(
          "une probabilité est entre 0 (impossible) et 1 (certain) ; 1/2 = une chance sur deux.",
          "on compare le nombre d’issues favorables au total.",
          `${chances(ex.fav, ex.total)}.`,
          `la probabilité est : ${rep}.`
        ),
        canvas: ex.canvas,
      };
    },
  },
  {
    kind: "fixed",
    id: "6e_proba_estimer_open_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_estimer",
    difficulty: 4,
    theme: "neutral",
    text: "Pourquoi une probabilité ne peut-elle pas être plus grande que 1 ?",
    format: "qcm",
    choices: [
      "1, c’est déjà certain : on ne peut pas avoir plus d’issues favorables que d’issues en tout.",
      "Parce que les grands nombres sont interdits en mathématiques.",
      "Elle peut dépasser 1 si l’événement est très probable.",
      "Parce qu’un dé n’a que 6 faces.",
    ],
    expected: ["1, c’est déjà certain : on ne peut pas avoir plus d’issues favorables que d’issues en tout."],
    comparator: "mcq_exact",
    hint: "1 correspond déjà à l’événement certain.",
    explanation:
      "Définition : une probabilité est un nombre compris entre 0 et 1.\n\n" +
      "Méthode : on interprète 1 comme l’événement certain.\n\n" +
      "Observation : si toutes les issues réalisent l’événement, la probabilité vaut déjà 1.\n\n" +
      "Conclusion : une probabilité ne peut donc pas dépasser 1.",
    tags: ["proba_experience", "estimer", "qcm", "raisonnement"],
  },

  /* =========================
     PROBA_LIRE
  ========================= */

  {
    kind: "fixed",
    id: "6e_proba_lire_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Dans ce sac, quelle couleur est la plus présente ?",
    format: "qcm",
    choices: ["rouge", "bleu", "vert", "elles sont toutes égales"],
    expected: ["rouge"],
    comparator: "mcq_exact",
    hint: "Compte les billes de chaque couleur.",
    explanation:
      "Définition : lire une situation probabiliste, c’est repérer les issues possibles et leur fréquence dans la situation.\n\n" +
      "Méthode : on compte les billes de chaque couleur.\n\n" +
      "Observation : il y a plus de billes rouges que de billes bleues ou vertes.\n\n" +
      "Conclusion : la couleur rouge est la plus présente.",
    tags: ["proba_experience", "lire", "billes", "canvas"],
    canvas: probabilitesCanvas({
      variant: "billes",
      billes: {
        elements: [
          { couleur: "rouge" },
          { couleur: "rouge" },
          { couleur: "rouge" },
          { couleur: "rouge" },
          { couleur: "bleu" },
          { couleur: "bleu" },
          { couleur: "vert" },
        ],
      },
    }),
  },

  {
    kind: "fixed",
    id: "6e_proba_lire_fixed_2_tableau",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_lire",
    difficulty: 3,
    theme: "neutral",
    text: "Dans le tableau, combien d’issues favorables correspondent à l’événement « obtenir une voyelle » ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Les voyelles affichées sont A et E.",
    explanation:
      "Définition : les issues favorables sont les résultats qui réalisent l’événement.\n\n" +
      "Méthode : on repère les cases qui correspondent à des voyelles.\n\n" +
      "Observation : A et E sont des voyelles, il y a donc 2 issues favorables.\n\n" +
      "Conclusion : il y a 2 issues favorables.",
    tags: ["proba_experience", "lire", "tableau", "canvas"],
    canvas: probabilitesCanvas({
      variant: "tableau",
      tableau: {
        entetes: ["Issue"],
        lignes: [["A"], ["B"], ["C"], ["D"], ["E"]],
        casesSurlignees: [
          [0, 0],
          [4, 0],
        ],
      },
    }),
  },

  {
    kind: "template",
    id: "6e_proba_lire_tpl_1_roue",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_lire",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les secteurs de chaque lot sur le dessin.",
    tags: ["proba_experience", "lire", "roue", "template", "canvas"],
    // ★3 : la roue des lots ; chaque secteur porte le nom d'un lot. On LIT le dessin.
    generate: () => {
      const LOTS: [string, Coul][] = [["Stylo", "bleu"], ["Livre", "vert"], ["Badge", "violet"], ["Perdu", "rouge"], ["Bille", "orange"], ["Jeu", "jaune"], ["Gomme", "rose"]];
      const k = ri(3, 4);
      const lots = shuffle(LOTS).slice(0, k);
      const ns = shuffle([1, 2, 3, 4]).slice(0, k);
      const total = ns.reduce((a, b) => a + b, 0);
      const segments = shuffle(lots.flatMap(([label, couleur], i) => Array.from({ length: ns[i] }, () => ({ label, poids: 1, couleur }))));
      const p = randomChoice(PRENOMS);
      const intro = randomChoice([
        `À la kermesse, ${p.nom} fait tourner la roue des lots.`,
        `À la fête de l’école, ${p.nom} joue à la roue des lots.`,
        `Au centre de loisirs, ${p.nom} fait tourner la roue des cadeaux.`,
        `Au marché de Noël, ${p.nom} tente sa chance à la roue des lots.`,
      ]) + " Tous les secteurs ont la même taille. Chacun porte le nom d’un lot.";
      const genre = randomChoice(["plus", "moins", "chances", "compte"] as const);
      const iCible = ri(0, k - 1);
      const [lot] = lots[iCible];
      const tri = lots.map(([l], i) => ({ l, n: ns[i] })).sort((a, b) => b.n - a.n);
      let text: string;
      let format: "qcm" | "short" = "qcm";
      let choices: string[] | undefined;
      let expected: string;
      let comparator: "mcq_exact" | "number_equal" = "mcq_exact";
      if (genre === "plus" || genre === "moins") {
        text = `${intro} Quel lot a le ${genre} de chances de sortir ?`;
        choices = shuffle(lots.map(([l]) => l));
        expected = genre === "plus" ? tri[0].l : tri[tri.length - 1].l;
      } else if (genre === "chances") {
        text = `${intro} Combien de chances ${p.nom} a-t-${ilElle(p)} de gagner le lot « ${lot} » ?`;
        const f = fractionsProposees(ns[iCible], total, chances);
        choices = f.choices;
        expected = f.bonne;
      } else {
        text = `${intro} Combien de secteurs donnent le lot « ${lot} » ?`;
        format = "short";
        comparator = "number_equal";
        expected = String(ns[iCible]);
      }
      return {
        text,
        format,
        choices,
        expected: [expected],
        comparator,
        explanation: pe(
          "les secteurs ont la même taille : chaque secteur est une issue, avec la même chance.",
          "on compte, sur le dessin, les secteurs de chaque lot.",
          `${tri.map((x) => `« ${x.l} » : ${x.n}`).join(" ; ")} — ${total} secteurs en tout.`,
          genre === "chances" ? `${chances(ns[iCible], total)} pour « ${lot} ».` : `la réponse est ${expected}.`
        ),
        canvas: probabilitesCanvas({ variant: "roue", roue: { segments } }),
      };
    },
  },

  {
    kind: "template",
    id: "6e_proba_lire_tpl_3_compter",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_lire",
    difficulty: 1,
    theme: "neutral",
    hint: "Compte sur le dessin, un par un.",
    tags: ["proba_experience", "lire", "template", "canvas"],
    // ★1 : compter sur le dessin (aucun nombre dans le texte).
    generate: () => {
      const d = dessinColore(Array.from({ length: ri(2, 3) }, () => ri(1, 6)));
      const o = d.o;
      const x = randomChoice(d.contenu);
      const adj = accorde(x.c, o.f, true);
      const total = d.contenu.reduce((a, y) => a + y.n, 0);
      const enTout = Math.random() < 0.25;
      const text = enTout
        ? `${d.intro} Combien de ${o.p} y a-t-il en tout ?`
        : randomChoice([
            `${d.intro} Combien de ${o.p} ${adj} vois-tu ?`,
            `${d.intro} Compte les ${o.p} ${adj}.`,
            `${d.intro} Combien y a-t-il de ${o.p} ${adj} ?`,
          ]);
      const rep = enTout ? total : x.n;
      return {
        text,
        format: "short",
        expected: [String(rep)],
        comparator: "number_equal",
        explanation: pe(
          "lire un dessin, c’est compter ce qu’il montre.",
          enTout ? "on compte tout, couleur par couleur, puis on additionne." : `on compte seulement les ${o.p} ${adj}.`,
          d.contenu.map((y) => groupe(o, y.c, y.n)).join(" ; ") + ".",
          `la réponse est ${rep}.`
        ),
        canvas: d.canvas,
      };
    },
  },
  {
    kind: "template",
    id: "6e_proba_lire_tpl_4_dessin",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_lire",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte chaque couleur sur le dessin avant de répondre.",
    tags: ["proba_experience", "lire", "template", "canvas"],
    // ★2 : lire le dessin pour comparer, ou compter « pas rouge », « rouge ou bleu ».
    generate: () => {
      const d = dessinColore(shuffle([1, 2, 3, 4, 5, 6]).slice(0, 3));
      const o = d.o;
      const total = d.contenu.reduce((a, y) => a + y.n, 0);
      const genre = randomChoice(["plus", "moins", "pas", "ou"] as const);
      const tri = [...d.contenu].sort((a, b) => b.n - a.n);
      const [a, b] = shuffle(d.contenu);
      let text: string;
      let rep: string;
      let qcm = false;
      if (genre === "plus" || genre === "moins") {
        qcm = true;
        text = randomChoice([
          `${d.intro} Quelle couleur est la ${genre} présente ?`,
          `${d.intro} D’après le dessin, quelle couleur a le ${genre} de chances de sortir ?`,
        ]);
        rep = (genre === "plus" ? tri[0] : tri[2]).c;
      } else if (genre === "pas") {
        text = randomChoice([
          `${d.intro} Combien de ${o.p} ne sont pas ${accorde(a.c, o.f, true)} ?`,
          `${d.intro} Compte les ${o.p} qui ne sont pas ${accorde(a.c, o.f, true)}.`,
        ]);
        rep = String(total - a.n);
      } else {
        text = randomChoice([
          `${d.intro} Combien de ${o.p} sont ${accorde(a.c, o.f, true)} ou ${accorde(b.c, o.f, true)} ?`,
          `${d.intro} Compte les ${o.p} ${accorde(a.c, o.f, true)} et les ${o.p} ${accorde(b.c, o.f, true)}. Combien en tout ?`,
        ]);
        rep = String(a.n + b.n);
      }
      return {
        text,
        format: qcm ? "qcm" : "short",
        choices: qcm ? [...shuffle(d.contenu.map((y) => y.c as string)), "toutes les couleurs autant"] : undefined,
        expected: [rep],
        comparator: qcm ? "mcq_exact" : "number_equal",
        explanation: pe(
          "on lit le dessin : chaque objet (ou secteur) compte pour un.",
          "on compte chaque couleur.",
          d.contenu.map((y) => groupe(o, y.c, y.n)).join(" ; ") + `, soit ${total} en tout.`,
          `la réponse est ${rep}.`
        ),
        canvas: d.canvas,
      };
    },
  },
  {
    kind: "fixed",
    id: "6e_proba_lire_open_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_lire",
    difficulty: 4,
    theme: "neutral",
    text: "Pour lire une situation de hasard, quelle est la bonne méthode ?",
    format: "qcm",
    choices: [
      "Compter toutes les issues, puis celles qui réalisent l’événement.",
      "Regarder la couleur qui saute aux yeux.",
      "Choisir la réponse qui semble la plus probable, sans compter.",
      "Compter seulement les issues favorables.",
    ],
    expected: ["Compter toutes les issues, puis celles qui réalisent l’événement."],
    comparator: "mcq_exact",
    hint: "Commence par identifier les issues possibles.",
    explanation:
      "Définition : une situation de probabilité présente des résultats possibles appelés issues.\n\n" +
      "Méthode : on identifie les issues possibles, puis celles qui réalisent l’événement étudié.\n\n" +
      "Observation : on peut ensuite compter ou comparer les issues favorables.\n\n" +
      "Conclusion : lire une situation probabiliste demande d’identifier les issues et l’événement.",
    tags: ["proba_experience", "lire", "qcm", "methode"],
  },

  /* =========================
     PROBA_DEFIS
  ========================= */

  {
    kind: "fixed",
    id: "6e_proba_defi_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : « obtenir 6 avec un dé est impossible ». A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le 6 est une face du dé.",
    explanation:
      "Définition : un événement impossible ne peut jamais se produire.\n\n" +
      "Méthode : on vérifie si l’issue 6 existe sur le dé.\n\n" +
      "Observation : un dé classique possède une face 6.\n\n" +
      "Conclusion : obtenir 6 n’est pas impossible, c’est possible.",
    tags: ["proba_experience", "defi", "erreur", "de"],
    canvas: probabilitesCanvas({
      variant: "de",
      de: {
        faces: [1, 2, 3, 4, 5, 6],
        surligne: [6],
      },
    }),
  },

  {
    kind: "template",
    id: "6e_proba_defi_tpl_1_billes_fraction",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Additionne d’abord TOUTES les couleurs pour le total ; puis compte les objets favorables.",
    tags: ["proba_experience", "defi", "billes", "fraction", "template", "canvas"],
    // ★5 : sac de 3 ou 4 couleurs, événement « ou » / « qui n'est pas » ; fraction ou chances.
    generate: () => {
      const u = nouvelleUrne(ri(3, 4), 1, 8, { maxTotal: 24 });
      const cs = shuffle(u.contenu.map((x) => x.c));
      const pas = Math.random() < 0.5;
      const choisis = pas ? [cs[0]] : cs.slice(0, 2);
      const lib = evtUrne(u, choisis, pas);
      const fav = favUrne(u, choisis, pas);
      const total = totalUrne(u);
      const enChances = Math.random() < 0.4;
      const { bonne, choices } = fractionsProposees(fav, total, enChances ? chances : (a, b) => `${a}/${b}`);
      const text = enChances
        ? `Défi. ${situationUrne(u)} Combien de chances y a-t-il de « ${lib} » ?`
        : randomChoice([
            `Défi. ${situationUrne(u)} Quelle est la probabilité de « ${lib} » ?`,
            `Défi. ${situationUrne(u)} Donne la probabilité de « ${lib} ».`,
          ]);
      return {
        text,
        format: "qcm",
        choices,
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: pe(
          "probabilité = nombre d’issues favorables sur nombre total d’issues.",
          "on additionne toutes les couleurs pour le total, puis seulement les couleurs qui conviennent.",
          `Total : ${u.contenu.map((x) => x.n).join(" + ")} = ${total}. Favorables : ${fav}.`,
          `${chances(fav, total)}, soit ${fav}/${total}.`
        ),
        canvas: canvasUrne(u),
      };
    },
  },

  {
    kind: "template",
    id: "6e_proba_defi_tpl_3_vrai_faux",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 2,
    theme: "neutral",
    hint: "Ne crois pas sur parole : compte les issues favorables, puis juge.",
    tags: ["proba_experience", "defi", "erreur", "template"],
    // ★2 : un camarade affirme ; a-t-il raison ? (rare ≠ impossible, très probable ≠ certain)
    generate: () => {
      const vrai = Math.random() < 0.5;
      const forme = randomChoice(["impossible", "certain", "moitie", "plus"] as const);
      const [p2] = deuxPrenoms();
      let texte: string;
      let canvas: CanvasProbabilitesData | undefined;
      let phrase: string;
      let detail: string;
      if (forme === "plus") {
        let AB: [Ev, Ev] | null = null;
        let total = 0;
        texte = "";
        while (!AB) {
          if (Math.random() < 0.5) {
            const x = nouveauNum((N) => N <= 20);
            AB = deuxEv(evenementsNum(x), false);
            texte = situationNum(x); canvas = x.ctx.canvas?.(x.N); total = x.N;
          } else {
            const u = nouvelleUrne(3, 1, 6, { maxTotal: 18 });
            AB = deuxEv(evenementsUrne(u), false);
            texte = situationUrne(u); canvas = canvasUrne(u); total = totalUrne(u);
          }
        }
        let [A, B] = AB;
        if ((A.fav > B.fav) !== vrai) [A, B] = [B, A];
        phrase = `On a plus de chances ${deV(A.lib)} que ${deV(B.lib)}.`;
        detail = `« ${A.lib} » : ${A.fav} sur ${total} ; « ${B.lib} » : ${B.fav} sur ${total}.`;
      } else {
        // la phrase dit « impossible » (ou « certain », « une chance sur deux ») ; fausse, l'événement est voisin
        const cat: Cat = vrai ? forme : forme === "impossible" ? "peu" : forme === "certain" ? "tres" : randomChoice<Cat>(["peu", "tres"]);
        const ex = exemple(cat);
        texte = ex.texte;
        canvas = ex.canvas;
        phrase =
          forme === "moitie" ? `${maj(ex.lib)}, c’est une chance sur deux.` : `${maj(ex.lib)} est ${forme}.`;
        detail = `${chances(ex.fav, ex.total)} pour « ${ex.lib} ».`;
      }
      const text = randomChoice([
        `${texte} ${p2.nom} dit : « ${phrase} » A-t-${ilElle(p2)} raison ?`,
        `${texte} ${p2.nom} affirme : « ${phrase} » Est-ce vrai ?`,
        `${texte} Selon ${p2.nom} : « ${phrase} » Qu’en penses-tu ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: ["oui", "non", "on ne peut pas savoir"],
        expected: [vrai ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: pe(
          "impossible = 0 issue favorable ; certain = toutes ; une chance sur deux = la moitié. Rare n’est pas impossible, très probable n’est pas certain.",
          "on compte les issues favorables, on vérifie la phrase.",
          detail,
          vrai ? "la phrase est juste." : "la phrase est fausse. Et on PEUT savoir : il suffit de compter."
        ),
        canvas,
      };
    },
  },
  {
    kind: "template",
    id: "6e_proba_defi_tpl_4_ajouter",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Essaie : ajoute (ou enlève) un objet, recompte, et recommence jusqu’à ce que ça marche.",
    tags: ["proba_experience", "defi", "template"],
    // ★3 : combien en ajouter (ou en enlever) pour rendre deux couleurs aussi probables, ou pour « une chance sur deux » ?
    generate: () => {
      const forme = randomChoice(["ajouter", "enlever", "moitie"] as const);
      let u: Urne;
      let text: string;
      let rep: number;
      let detail: string;
      if (forme !== "moitie") {
        const a = ri(1, 5);
        const b = a + ri(1, 6);
        u = urneAvec(shuffle([a, b]));
        const petit = u.contenu.find((x) => x.n === a)!.c;
        const grand = u.contenu.find((x) => x.n === b)!.c;
        const o = u.ctx.o;
        const cond = `autant de chances ${deV(`« ${evtUrne(u, [petit])} »`)} que ${deV(`« ${evtUrne(u, [grand])} »`)}`;
        text = forme === "ajouter"
          ? `${situationUrne(u)} Combien de ${o.p} ${accorde(petit, o.f, true)} faut-il ajouter pour avoir ${cond} ?`
          : `${situationUrne(u)} Combien de ${o.p} ${accorde(grand, o.f, true)} faut-il enlever pour avoir ${cond} ?`;
        rep = b - a;
        detail = `Il y a ${a} ${accorde(petit, o.f, a > 1)} et ${b} ${accorde(grand, o.f, true)} : il faut le même nombre des deux. ${b} − ${a} = ${rep}.`;
      } else {
        let a: number, autres: number[];
        do {
          a = ri(1, 4);
          autres = [ri(1, 6), ri(1, 6)];
        } while (autres[0] + autres[1] - a < 1);
        u = urneAvec(shuffle([a, ...autres]));
        const c = u.contenu.find((x) => x.n === a && !autres.includes(a))?.c ?? u.contenu.find((x) => x.n === a)!.c;
        const o = u.ctx.o;
        const aC = u.contenu.find((x) => x.c === c)!.n;
        const reste = totalUrne(u) - aC;
        text = `${situationUrne(u)} Combien de ${o.p} ${accorde(c, o.f, true)} faut-il ajouter pour avoir une chance sur deux ${deV(`« ${evtUrne(u, [c])} »`)} ?`;
        rep = reste - aC;
        detail = `Une chance sur deux : il faut autant de ${o.p} ${accorde(c, o.f, true)} que de ${o.p} des autres couleurs. Les autres : ${reste}. Il y en a ${aC} : ${reste} − ${aC} = ${rep}.`;
      }
      return {
        text,
        format: "short",
        expected: [String(rep)],
        comparator: "number_equal",
        explanation: pe(
          "deux événements ont autant de chances s’ils ont autant d’issues favorables.",
          "on cherche ce qu’il faut changer pour que les nombres deviennent égaux.",
          detail,
          `il en faut ${rep}.`
        ),
        canvas: canvasUrne(u),
      };
    },
  },
  {
    kind: "template",
    id: "6e_proba_defi_tpl_5_proba_compose",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Écris la liste des issues favorables, puis : favorables sur total.",
    tags: ["proba_experience", "defi", "fraction", "template"],
    // ★4 : la probabilité d'un événement à deux conditions (multiples, pair ET supérieur…).
    generate: () => {
      const x = nouveauNum((N) => N >= 10 && N <= 30);
      const m = x.ctx.mot;
      const e = randomChoice([
        EVN.mult(m, ri(3, 5)),
        EVN.pairSup(m, ri(2, Math.floor(x.N / 2))),
        EVN.impairInf(m, ri(4, x.N - 2)),
        EVN.deuxChiffres(m),
        EVN.pas(m, ri(1, x.N)),
      ]);
      const fav = favNum(x, e);
      const enChances = Math.random() < 0.4;
      const { bonne, choices } = fractionsProposees(fav, x.N, enChances ? chances : (a, b) => `${a}/${b}`);
      const text = enChances
        ? `Défi. ${situationNum(x)} Combien de chances y a-t-il de « ${e.lib} » ?`
        : randomChoice([
            `Défi. ${situationNum(x)} Quelle est la probabilité de « ${e.lib} » ?`,
            `Défi. ${situationNum(x)} Donne la probabilité de « ${e.lib} ».`,
          ]);
      const l = listeFav(x, e);
      return {
        text,
        format: "qcm",
        choices,
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: pe(
          "probabilité = nombre d’issues favorables sur nombre total d’issues.",
          "on liste les issues qui remplissent TOUTES les conditions.",
          l.length <= 12 ? `Favorables : ${listeFr(l.map(String))} (${fav} sur ${x.N}).` : `Seules ${x.N - fav} issues ne conviennent pas : ${fav} sur ${x.N}.`,
          `${chances(fav, x.N)}, soit ${fav}/${x.N}.`
        ),
        canvas: x.ctx.canvas?.(x.N),
      };
    },
  },
  {
    kind: "fixed",
    id: "6e_proba_defi_open_1_doute",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un camarade dit qu’un événement est « très probable ». Que dois-tu vérifier avant d’être d’accord ?",
    format: "qcm",
    choices: [
      "Que presque toutes les issues réalisent l’événement.",
      "Qu’il y a beaucoup d’issues en tout.",
      "Que l’événement est déjà arrivé une fois.",
      "Rien : s’il le dit, c’est vrai.",
    ],
    expected: ["Que presque toutes les issues réalisent l’événement."],
    comparator: "mcq_exact",
    hint: "Il faut comparer les issues favorables au nombre total d’issues.",
    explanation:
      "Définition : un événement est très probable s’il possède beaucoup d’issues favorables par rapport au total.\n\n" +
      "Méthode : on identifie l’événement, on compte les issues favorables et toutes les issues possibles.\n\n" +
      "Observation : on ne doit pas se fier seulement à une impression.\n\n" +
      "Conclusion : il faut vérifier les nombres avant d’accepter l’affirmation.",
    tags: ["proba_experience", "defi", "qcm", "verification", "raisonnement"],
  },

  {
    kind: "fixed",
    id: "6e_proba_defi_open_2_langage",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 5,
    theme: "neutral",
    text: "On lance un dé à 6 faces. Quelle phrase utilise les mots avec précision ?",
    format: "qcm",
    choices: [
      "Obtenir 6 est possible, mais pas certain.",
      "Obtenir 6 est certain, puisque le 6 est sur le dé.",
      "Obtenir 6 est impossible, car c’est rare.",
      "Obtenir 7 est peu probable.",
    ],
    expected: ["Obtenir 6 est possible, mais pas certain."],
    comparator: "mcq_exact",
    hint: "Ces mots ne veulent pas dire la même chose.",
    explanation:
      "Définition : en probabilités, chaque mot a un sens précis.\n\n" +
      "Méthode : on distingue impossible, possible, probable et certain selon les issues.\n\n" +
      "Observation : une mauvaise utilisation du vocabulaire peut conduire à une conclusion fausse.\n\n" +
      "Conclusion : utiliser un vocabulaire précis aide à raisonner correctement.",
    tags: ["proba_experience", "defi", "qcm", "langage", "vocabulaire"],
  },
    /* =========================
     RENFORT — PROBABILITÉS 6e
  ========================= */

  {
    kind: "fixed",
    id: "6e_proba_vocabulaire_erreur_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : « possible » et « certain », c’est pareil. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Possible veut dire que cela peut arriver. Certain veut dire que cela arrive toujours.",
    explanation:
      "Définition : un événement possible peut se produire, mais il n’est pas forcément certain.\n\n" +
      "Méthode : on distingue les mots du vocabulaire probabiliste.\n\n" +
      "Observation : obtenir 6 avec un dé est possible, mais pas certain.\n\n" +
      "Conclusion : possible et certain ne veulent pas dire la même chose.",
    tags: ["proba_experience", "vocabulaire", "erreur", "possible", "certain"],
  },

  {
    kind: "fixed",
    id: "6e_proba_issue_erreur_1_oublier_issue",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève liste les issues possibles d’un dé à 6 faces : 1, 2, 3, 4, 5. Quelle issue a-t-il oubliée ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Un dé classique a 6 faces.",
    explanation:
      "Définition : les issues sont tous les résultats possibles d’une expérience.\n\n" +
      "Méthode : on doit lister toutes les faces du dé.\n\n" +
      "Observation : l’élève a oublié l’issue 6.\n\n" +
      "Conclusion : la liste est incomplète, donc le raisonnement peut devenir faux.",
    tags: ["proba_experience", "issue", "short", "erreur", "verification"],
  },

  {
    kind: "template",
    id: "6e_proba_issue_tpl_3_billes_total",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 3,
    theme: "neutral",
    hint: "Chaque objet est une issue : additionne ceux qui conviennent.",
    tags: ["proba_experience", "issue", "billes", "total", "template", "canvas"],
    // ★3 : sac de trois couleurs ; « rouge ou bleue », « qui n'est pas verte ».
    generate: () => {
      const u = nouvelleUrne(3, 1, 8, { maxTotal: 22 });
      const o = u.ctx.o;
      const cs = shuffle(u.contenu.map((x) => x.c));
      const pas = Math.random() < 0.5;
      const choisis = pas ? cs.slice(0, 1) : cs.slice(0, 2);
      const lib = evtUrne(u, choisis, pas);
      const fav = favUrne(u, choisis, pas);
      const gardes = u.contenu.filter((x) => (pas ? !choisis.includes(x.c) : choisis.includes(x.c)));
      const text = randomChoice([
        `${situationUrne(u)} Combien d’issues réalisent l’événement « ${lib} » ?`,
        `${situationUrne(u)} Combien de ${o.p} sont favorables à « ${lib} » ?`,
        `${situationUrne(u)} Pour l’événement « ${lib} », combien d’issues conviennent ?`,
        `${situationUrne(u)} Compte les issues favorables à « ${lib} ».`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(fav)],
        comparator: "number_equal",
        explanation: pe(
          `chaque ${o.s} est une issue.`,
          pas ? "on garde toutes les couleurs SAUF celle qui est citée." : "on additionne les deux couleurs citées.",
          `${listeFr(gardes.map((x) => groupe(o, x.c, x.n)))} : ${gardes.map((x) => x.n).join(" + ")} = ${fav}.`,
          `${fav} issues réalisent l’événement.`
        ),
        canvas: canvasUrne(u),
      };
    },
  },

  {
    kind: "template",
    id: "6e_proba_issue_tpl_4_total",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 1,
    theme: "neutral",
    hint: "Une issue = un résultat possible. Compte-les tous.",
    tags: ["proba_experience", "issue", "total", "template"],
    // ★1 : combien d'issues en tout ? (issues numérotées, pièce, couleurs, objets)
    generate: () => {
      const r = Math.random();
      if (r < 0.5) {
        const x = nouveauNum();
        const text = randomChoice([
          `${situationNum(x)} Combien y a-t-il d’issues possibles ?`,
          `${situationNum(x)} Combien de résultats différents peut-on obtenir ?`,
          `${situationNum(x)} Combien d’issues compte cette expérience ?`,
          `${situationNum(x)} Écris le nombre d’issues possibles.`,
        ]);
        return {
          text,
          format: "short",
          expected: [String(x.N)],
          comparator: "number_equal",
          explanation: pe(
            "une issue est un résultat possible.",
            "on compte tous les numéros possibles.",
            `On peut obtenir 1, 2, 3… jusqu’à ${x.N} : cela fait ${x.N} résultats.`,
            `il y a ${x.N} issues possibles.`
          ),
          canvas: x.ctx.canvas?.(x.N),
        };
      }
      if (r < 0.6) {
        const p = randomChoice(PRENOMS);
        const text = randomChoice([
          `${p.nom} lance une pièce de monnaie. Combien y a-t-il d’issues possibles ?`,
          `Pour savoir qui commence le match, ${p.nom} lance une pièce. Combien de résultats différents peut-on obtenir ?`,
          `${p.nom} joue à pile ou face avec une pièce. Combien d’issues compte cette expérience ?`,
        ]);
        return {
          text,
          format: "short",
          expected: ["2"],
          comparator: "number_equal",
          explanation: pe("une issue est un résultat possible.", "on écrit tous les résultats.", "La pièce tombe sur pile ou sur face.", "il y a 2 issues possibles."),
        };
      }
      const u = nouvelleUrne(ri(2, 4), 1, 6, { maxTotal: 20 });
      const o = u.ctx.o;
      if (r < 0.8) {
        const k = u.contenu.length;
        const text = randomChoice([
          `${situationUrne(u)} Combien de couleurs différentes peut-on obtenir ?`,
          `${situationUrne(u)} Combien y a-t-il de couleurs différentes possibles ?`,
          `${situationUrne(u)} De combien de couleurs différentes peut être ${o.f ? "la" : "le"} ${o.s} ?`,
        ]);
        return {
          text,
          format: "short",
          expected: [String(k)],
          comparator: "number_equal",
          explanation: pe(
            "on cherche les couleurs possibles, pas le nombre d’objets.",
            "on liste les couleurs citées, chacune une seule fois.",
            `Les couleurs sont : ${listeFr(u.contenu.map((x) => accorde(x.c, false, false)))}.`,
            `il y a ${k} couleurs possibles.`
          ),
          canvas: canvasUrne(u),
        };
      }
      const t = totalUrne(u);
      const text = randomChoice([
        `${situationUrne(u)} Combien y a-t-il de ${o.p} en tout ?`,
        `${situationUrne(u)} Chaque ${o.s} est une issue. Combien d’issues y a-t-il en tout ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(t)],
        comparator: "number_equal",
        explanation: pe(
          `chaque ${o.s} peut être tiré${o.f ? "e" : ""} : c’est une issue.`,
          "on additionne les nombres de chaque couleur.",
          `${u.contenu.map((x) => x.n).join(" + ")} = ${t}.`,
          `il y a ${t} ${o.p} en tout.`
        ),
        canvas: canvasUrne(u),
      };
    },
  },
  {
    kind: "template",
    id: "6e_proba_issue_tpl_5_compose",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 4,
    theme: "neutral",
    hint: "Écris la liste de toutes les issues, puis barre celles qui ne conviennent pas.",
    tags: ["proba_experience", "issue", "template"],
    // ★4 : événements à deux conditions, multiples, issue oubliée.
    generate: () => {
      const x = nouveauNum((N) => N >= 8);
      const m = x.ctx.mot;
      if (x.N <= 12 && Math.random() < 0.25) {
        const oubli = ri(1, x.N);
        const liste = Array.from({ length: x.N }, (_, i) => i + 1).filter((v) => v !== oubli);
        const [p2] = deuxPrenoms();
        const text = randomChoice([
          `${situationNum(x)} ${p2.nom} écrit les issues possibles : ${liste.join(", ")}. Quelle issue a-t-${ilElle(p2)} oubliée ?`,
          `${situationNum(x)} ${p2.nom} liste les issues : ${liste.join(", ")}. Il en manque une. Laquelle ?`,
        ]);
        return {
          text,
          format: "short",
          expected: [String(oubli)],
          comparator: "number_equal",
          explanation: pe(
            "les issues sont TOUS les résultats possibles.",
            `on vérifie la liste de 1 à ${x.N}, dans l’ordre.`,
            `Le ${m} ${oubli} manque.`,
            `l’issue oubliée est ${oubli}.`
          ),
          canvas: x.ctx.canvas?.(x.N),
        };
      }
      const k = ri(2, Math.floor(x.N / 2));
      const e = randomChoice([
        EVN.mult(m, ri(3, 6)),
        EVN.mult(m, ri(3, 6)),
        EVN.pairSup(m, k),
        EVN.impairInf(m, ri(4, x.N)),
        EVN.pas(m, ri(1, x.N)),
        ...(x.N >= 12 ? [EVN.deuxChiffres(m)] : []),
      ]);
      const fav = favNum(x, e);
      const text = randomChoice([
        `${situationNum(x)} Combien d’issues réalisent l’événement « ${e.lib} » ?`,
        `${situationNum(x)} Combien d’issues sont favorables à « ${e.lib} » ?`,
        `${situationNum(x)} Pour l’événement « ${e.lib} », combien d’issues conviennent ?`,
      ]);
      const l = listeFav(x, e);
      return {
        text,
        format: "short",
        expected: [String(fav)],
        comparator: "number_equal",
        explanation: pe(
          "une issue favorable réalise l’événement : toutes ses conditions à la fois.",
          `on passe en revue les ${m}s de 1 à ${x.N}.`,
          l.length > 12 ? `Il y a ${x.N} issues, et ${x.N - fav} ne conviennent pas : ${x.N} − ${x.N - fav} = ${fav}.` : `Les issues favorables sont : ${listeFr(l.map(String))}.`,
          `il y a ${fav} issue${fav > 1 ? "s" : ""} favorable${fav > 1 ? "s" : ""}.`
        ),
        canvas: x.ctx.canvas?.(x.N),
      };
    },
  },
  {
    kind: "template",
    id: "6e_proba_comparer_tpl_3_aussi_probable",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux événements ont autant de chances s’ils ont le même nombre d’issues favorables.",
    tags: ["proba_experience", "comparer", "aussi_probable", "template", "canvas"],
    // ★3 : oui ou non, ces deux événements ont-ils autant de chances ?
    generate: () => {
      for (;;) {
        const egaux = Math.random() < 0.5;
        let texte: string;
        let canvas: CanvasProbabilitesData | undefined;
        let total: number;
        let AB: [Ev, Ev] | null;
        if (Math.random() < 0.5) {
          const x = nouveauNum((N) => N <= 20);
          AB = deuxEv(evenementsNum(x), egaux);
          texte = situationNum(x);
          canvas = x.ctx.canvas?.(x.N);
          total = x.N;
        } else {
          const u = nouvelleUrne(ri(3, 4), 1, 6, { maxTotal: 20 });
          AB = deuxEv(evenementsUrne(u), egaux);
          texte = situationUrne(u);
          canvas = canvasUrne(u);
          total = totalUrne(u);
        }
        if (!AB) continue;
        const [A, B] = AB;
        const text = randomChoice([
          `${texte} Les événements « ${A.lib} » et « ${B.lib} » ont-ils autant de chances ?`,
          `${texte} « ${A.lib} » et « ${B.lib} » : est-ce aussi probable ?`,
          `${texte} A-t-on autant de chances de « ${A.lib} » que de « ${B.lib} » ?`,
        ]);
        return {
          text,
          format: "qcm",
          choices: ["oui", "non"],
          expected: [A.fav === B.fav ? "oui" : "non"],
          comparator: "mcq_exact",
          explanation: pe(
            "deux événements ont autant de chances s’ils ont le même nombre d’issues favorables.",
            "on compte les issues favorables de chacun.",
            `« ${A.lib} » : ${A.fav} sur ${total}. « ${B.lib} » : ${B.fav} sur ${total}.`,
            A.fav === B.fav ? "oui, ils ont autant de chances." : "non, ils n’ont pas autant de chances."
          ),
          canvas,
        };
      }
    },
  },

  {
    kind: "fixed",
    id: "6e_proba_estimer_erreur_1_plus_que_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_estimer",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : « La probabilité de gagner est 1,5 ». Que lui réponds-tu ?",
    format: "qcm",
    choices: [
      "C’est faux : une probabilité est toujours entre 0 et 1.",
      "C’est juste : il a beaucoup de chances de gagner.",
      "C’est juste si le jeu a plus de 2 issues.",
      "C’est faux : une probabilité est toujours un nombre entier.",
    ],
    expected: ["C’est faux : une probabilité est toujours entre 0 et 1."],
    comparator: "mcq_exact",
    hint: "Une probabilité est comprise entre 0 et 1.",
    explanation:
      "Définition : une probabilité est toujours comprise entre 0 et 1.\n\n" +
      "Méthode : on vérifie si la valeur proposée respecte cet intervalle.\n\n" +
      "Observation : 1 correspond déjà à un événement certain, donc 1,5 est trop grand.\n\n" +
      "Conclusion : une probabilité de 1,5 est impossible.",
    tags: ["proba_experience", "estimer", "qcm", "erreur", "intervalle"],
  },

  {
    kind: "template",
    id: "6e_proba_estimer_tpl_3_roue_proche_0",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_estimer",
    difficulty: 4,
    theme: "neutral",
    hint: "Un tout petit secteur correspond à une probabilité proche de 0.",
    tags: ["proba_experience", "estimer", "roue", "proche_0", "template", "canvas"],
    // ★4 : la roue coloriée ; un secteur rare (au plus 1 sur 5).
    generate: () => {
      const rare = 1;
      const autres = Math.random() < 0.5 ? [ri(5, 11)] : [ri(2, 6), ri(2, 6)];
      while (rare * 5 > rare + autres.reduce((a, b) => a + b, 0)) autres[0]++;
      const r = roueAvec(shuffle([rare, ...autres]));
      const cRare = r.contenu.find((x) => x.n === rare && !autres.includes(rare))?.c ?? r.contenu.find((x) => x.n === rare)!.c;
      const absente = randomChoice(SECTEUR.couleurs.filter((c) => !r.contenu.some((x) => x.c === c)));
      const cat = randomChoice<Cat>(["peu", "tres", "peu", "tres", "impossible", "certain"]);
      const def: Record<string, [Coul[], boolean]> = {
        peu: [[cRare], false],
        tres: [[cRare], true],
        impossible: [[absente], false],
        certain: [[absente], true],
      };
      const [cs, pas] = def[cat];
      const ex: Exemple = { texte: situationRoue(r), canvas: canvasRoue(r), lib: evtRoue(r, cs, pas), fav: favRoue(r, cs, pas), total: totalRoue(r) };
      return poserProche(ex, cat);
    },
  },

  {
    kind: "fixed",
    id: "6e_proba_lire_erreur_1_impression",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_lire",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève regarde vite un sac de billes et conclut sans compter. Que penses-tu de sa méthode ?",
    format: "qcm",
    choices: [
      "Elle est fragile : une impression peut tromper, il faut compter.",
      "Elle est sûre : on voit tout de suite la bonne couleur.",
      "Elle est sûre s’il y a beaucoup de billes.",
      "Elle est fragile : il faudrait tirer toutes les billes.",
    ],
    expected: ["Elle est fragile : une impression peut tromper, il faut compter."],
    comparator: "mcq_exact",
    hint: "Il faut vérifier les nombres.",
    explanation:
      "Définition : une conclusion probabiliste doit s’appuyer sur les issues possibles et favorables.\n\n" +
      "Méthode : on compte les objets ou les secteurs avant de conclure.\n\n" +
      "Observation : une impression visuelle peut être trompeuse.\n\n" +
      "Conclusion : il faut compter et vérifier avant de conclure.",
    tags: ["proba_experience", "lire", "qcm", "verification", "doute_raisonnable"],
  },

  {
    kind: "template",
    id: "6e_proba_lire_tpl_2_tableau_favorable",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_lire",
    difficulty: 4,
    theme: "neutral",
    hint: "Lis le tableau : additionne pour avoir le total, puis compte les objets favorables.",
    tags: ["proba_experience", "lire", "tableau", "issues_favorables", "template", "canvas"],
    // ★4 : le contenu est donné par un TABLEAU ; probabilité en fraction ou en « chances sur ».
    generate: () => {
      const ctx = randomChoice(CTX_VOICI.filter((c) => c.o.couleurs.length >= 4));
      const o = ctx.o;
      const k = ri(3, 4);
      const couleurs = shuffle(ctx.o.couleurs).slice(0, k);
      const contenu = couleurs.map((c) => ({ c, n: ri(1, 9) }));
      const total = contenu.reduce((a, y) => a + y.n, 0);
      const [a, b] = shuffle(contenu);
      const genre = randomChoice(["une", "ou", "pas"] as const);
      const verbe = o === O.poisson ? "attraper" : "prendre";
      const qual = genre === "pas" ? `qui n’est pas ${accorde(a.c, o.f, false)}` : genre === "ou" ? `${accorde(a.c, o.f, false)} ou ${accorde(b.c, o.f, false)}` : accorde(a.c, o.f, false);
      const lib = `${verbe} ${un(o)} ${o.s} ${qual}`;
      const fav = genre === "pas" ? total - a.n : genre === "ou" ? a.n + b.n : a.n;
      const p = randomChoice(PRENOMS);
      const enChances = Math.random() < 0.5;
      const { bonne, choices } = fractionsProposees(fav, total, enChances ? chances : (x, y) => `${x}/${y}`);
      const intro = `${ctx.voici(p)} Le tableau donne le nombre de ${o.p} de chaque couleur. ${maj(un(o))} ${o.s} est ${o.f ? "prise" : "pris"} au hasard.`;
      const text = enChances
        ? `${intro} Combien de chances y a-t-il de « ${lib} » ?`
        : randomChoice([`${intro} Quelle est la probabilité de « ${lib} » ?`, `${intro} Écris la probabilité de « ${lib} ».`]);
      return {
        text,
        format: "qcm",
        choices,
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: pe(
          "probabilité = nombre d’issues favorables sur nombre total d’issues.",
          "on additionne la colonne pour le total, puis on compte les objets favorables.",
          `Total : ${contenu.map((y) => y.n).join(" + ")} = ${total}. Favorables : ${fav}.`,
          `${chances(fav, total)}, soit ${fav}/${total}.`
        ),
        canvas: probabilitesCanvas({
          variant: "tableau",
          tableau: { entetes: ["Couleur", `Nombre de ${o.p}`], lignes: contenu.map((y) => [y.c, String(y.n)]) },
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_proba_defi_open_3_demarche",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Dans quel ordre résout-on une question de probabilité simple ?",
    format: "qcm",
    choices: [
      "Lister toutes les issues, compter les favorables, puis écrire favorables sur total.",
      "Écrire une fraction au hasard, puis vérifier avec un dé.",
      "Compter les favorables, puis écrire total sur favorables.",
      "Deviner la réponse la plus probable.",
    ],
    expected: ["Lister toutes les issues, compter les favorables, puis écrire favorables sur total."],
    comparator: "mcq_exact",
    hint: "Commence par les issues possibles, puis les issues favorables.",
    explanation:
      "Définition : une probabilité simple compare les issues favorables aux issues possibles.\n\n" +
      "Méthode : on identifie l’expérience, on liste les issues possibles, puis on compte les issues favorables.\n\n" +
      "Calcul : si nécessaire, on écrit issues favorables / issues possibles.\n\n" +
      "Conclusion : on formule une réponse claire avec une justification.",
    tags: ["proba_experience", "defi", "qcm", "methode", "raisonnement"],
  },

  {
    kind: "template",
    id: "6e_proba_defi_tpl_2_reunion",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Pour chaque stand : nombre de cas gagnants SUR nombre total. Compare les parts, pas les nombres.",
    tags: ["proba_experience", "defi", "template"],
    // ★5 : deux stands, deux jeux ; lequel donne le plus de chances ? (le piège : « il y a plus de gagnants »)
    generate: () => {
      const JEUX: ((n: number, k: number) => string)[] = [
        (n, k) => `une roue a ${n} secteurs de même taille, dont ${k} gagnant${k > 1 ? "s" : ""}`,
        (n, k) => `un sac contient ${n} jetons, dont ${k} gagnant${k > 1 ? "s" : ""}`,
        (n, k) => `on tire une carte parmi ${n}, dont ${k} gagnante${k > 1 ? "s" : ""}`,
        (n, k) => `on choisit une enveloppe parmi ${n}, dont ${k} gagnante${k > 1 ? "s" : ""}`,
        (n, k) => `on pêche un canard parmi ${n}, dont ${k} gagnant${k > 1 ? "s" : ""}`,
        (n, k) => `on tire un ticket parmi ${n}, dont ${k} gagnant${k > 1 ? "s" : ""}`,
      ];
      const LIEUX = [
        "À la kermesse", "À la fête foraine", "À la fête de l’école", "À la fête du village",
        "Au festival de musique", "Au marché de Saint-Paul, à La Réunion", "Au centre de loisirs",
      ];
      const cas = randomChoice(["total", "gagnants", "moitie", "moitie", "egal"] as const);
      let n1: number, k1: number, n2: number, k2: number;
      for (;;) {
        n1 = randomChoice([4, 5, 6, 8, 10, 12]); k1 = ri(1, n1 - 1);
        n2 = randomChoice([4, 5, 6, 8, 10, 12, 20]); k2 = ri(1, n2 - 1);
        if (cas === "total") n2 = n1, k2 = ri(1, n1 - 1);
        if (cas === "gagnants") k2 = k1;
        if (cas === "egal") { const f = randomChoice([2, 3]); n2 = n1 * f; k2 = k1 * f; }
        if (k2 >= n2 || (n1 === n2 && k1 === k2)) continue;
        const comp = k1 * n2 - k2 * n1;
        if (cas === "egal" && comp !== 0) continue;
        if (cas !== "egal" && comp === 0) continue;
        if (cas === "moitie" && !((2 * k1 - n1) * (2 * k2 - n2) < 0 && (k1 - k2) * comp < 0)) continue;
        if (n2 <= 24) break;
      }
      const [jA, jB] = shuffle(JEUX).slice(0, 2);
      const p = randomChoice(PRENOMS);
      const text =
        `${randomChoice(LIEUX)}, deux stands proposent un jeu. Stand A : ${jA(n1, k1)}. Stand B : ${jB(n2, k2)}. ` +
        randomChoice([
          `${p.nom} veut avoir le plus de chances de gagner. Quel stand doit-${ilElle(p)} choisir ?`,
          `Où ${p.nom} a-t-${ilElle(p)} le plus de chances de gagner ?`,
          `${p.nom} hésite. Quel stand donne le plus de chances de gagner ?`,
        ]);
      const comp = k1 * n2 - k2 * n1;
      const expected = comp > 0 ? "le stand A" : comp < 0 ? "le stand B" : "les deux se valent";
      return {
        text,
        format: "qcm",
        choices: ["le stand A", "le stand B", "les deux se valent"],
        expected: [expected],
        comparator: "mcq_exact",
        explanation: pe(
          "la chance de gagner, c’est la PART des cas gagnants : gagnants sur total.",
          "on écrit les deux fractions, puis on les compare (même total, même nombre de gagnants, ou par rapport à la moitié).",
          `Stand A : ${k1} sur ${n1}. Stand B : ${k2} sur ${n2}.` +
            (cas === "moitie" ? " L’un fait gagner plus d’une fois sur deux, l’autre moins." : cas === "egal" ? ` ${reduite(k1, n1)} des deux côtés.` : ""),
          comp === 0 ? "les deux stands se valent." : `il faut choisir ${expected}.`
        ),
      };
    },
  },

  /* ========================= TOP-UP — PROBA_VOCABULAIRE ========================= */
  {
    kind: "fixed", id: "6e_proba_vocabulaire_topup_1",
    niveau: "6e", matiere: "maths", notionId: "proba_experience", microId: "proba_vocabulaire",
    difficulty: 1, theme: "neutral",
    text: "Une expérience aléatoire est une expérience dont...",
    format: "qcm",
    choices: ["on ne connaît pas le résultat à l’avance", "on connaît toujours le résultat", "il n’y a aucun résultat", "le résultat est un dessin"],
    expected: ["on ne connaît pas le résultat à l’avance"], comparator: "mcq_exact",
    hint: "Pense au lancer d’un dé.",
    explanation: pe("une expérience aléatoire a un résultat qui dépend du hasard.", "on se demande si le résultat est connu à l’avance.", "quand on lance un dé, on ne sait pas quelle face sortira.", "une expérience aléatoire a un résultat inconnu à l’avance."),
    tags: ["proba_experience", "vocabulaire", "qcm"],
  },
  {
    kind: "fixed", id: "6e_proba_vocabulaire_topup_2",
    niveau: "6e", matiere: "maths", notionId: "proba_experience", microId: "proba_vocabulaire",
    difficulty: 1, theme: "neutral",
    text: "Un événement certain est un événement qui...",
    format: "qcm",
    choices: ["se produit toujours", "ne se produit jamais", "se produit une fois sur deux", "est impossible"],
    expected: ["se produit toujours"], comparator: "mcq_exact",
    hint: "Certain = sûr d’arriver.",
    explanation: pe("un événement certain se produit à coup sûr.", "on se demande si l’événement arrive toujours.", "obtenir un nombre entre 1 et 6 avec un dé est certain.", "un événement certain se produit toujours."),
    tags: ["proba_experience", "vocabulaire", "qcm"],
  },
  {
    kind: "fixed", id: "6e_proba_vocabulaire_topup_3",
    niveau: "6e", matiere: "maths", notionId: "proba_experience", microId: "proba_vocabulaire",
    difficulty: 1, theme: "neutral",
    text: "Un événement impossible est un événement qui...",
    format: "qcm",
    choices: ["ne se produit jamais", "se produit toujours", "arrive une fois sur deux", "est certain"],
    expected: ["ne se produit jamais"], comparator: "mcq_exact",
    hint: "Impossible = ne peut pas arriver.",
    explanation: pe("un événement impossible ne peut pas se produire.", "on se demande si l’événement peut arriver.", "obtenir 7 avec un dé classique est impossible.", "un événement impossible ne se produit jamais."),
    tags: ["proba_experience", "vocabulaire", "qcm"],
  },
  {
    kind: "fixed", id: "6e_proba_vocabulaire_topup_4",
    niveau: "6e", matiere: "maths", notionId: "proba_experience", microId: "proba_vocabulaire",
    difficulty: 1, theme: "neutral",
    text: "Lancer un dé est une expérience...",
    format: "qcm",
    choices: ["aléatoire", "certaine", "impossible", "géométrique"],
    expected: ["aléatoire"], comparator: "mcq_exact",
    hint: "Le résultat dépend du hasard.",
    explanation: pe("une expérience dont le résultat dépend du hasard est aléatoire.", "on regarde si le résultat est prévisible.", "le résultat d’un lancer de dé n’est pas prévisible.", "lancer un dé est une expérience aléatoire."),
    tags: ["proba_experience", "vocabulaire", "qcm"],
  },

  /* ========================= TOP-UP — PROBA_LIRE ========================= */
  {
    kind: "fixed", id: "6e_proba_lire_topup_1",
    niveau: "6e", matiere: "maths", notionId: "proba_experience", microId: "proba_lire",
    difficulty: 1, theme: "neutral",
    text: "Dans ce sac, quelle couleur est la plus présente ?",
    format: "qcm", choices: ["rouge", "bleu", "vert", "elles sont toutes égales"], expected: ["rouge"], comparator: "mcq_exact",
    hint: "Compte les billes de chaque couleur.",
    explanation: pe("lire une situation de hasard, c’est compter les issues.", "on compte les billes de chaque couleur.", "il y a 3 billes rouges, 2 bleues et 1 verte.", "la couleur rouge est la plus présente."),
    tags: ["proba_experience", "lire", "billes", "canvas"],
    canvas: probabilitesCanvas({ variant: "billes", billes: { elements: [{ couleur: "rouge" }, { couleur: "rouge" }, { couleur: "rouge" }, { couleur: "bleu" }, { couleur: "bleu" }, { couleur: "vert" }] } }),
  },
  {
    kind: "fixed", id: "6e_proba_lire_topup_2",
    niveau: "6e", matiere: "maths", notionId: "proba_experience", microId: "proba_lire",
    difficulty: 1, theme: "neutral",
    text: "Combien de faces possède ce dé ?",
    format: "short", expected: ["6"], comparator: "number_equal",
    hint: "Compte les faces.",
    explanation: pe("un dé classique a des faces numérotées.", "on compte les faces.", "les faces sont 1, 2, 3, 4, 5 et 6.", "ce dé possède 6 faces."),
    tags: ["proba_experience", "lire", "de", "canvas"],
    canvas: probabilitesCanvas({ variant: "de", de: { faces: [1, 2, 3, 4, 5, 6] } }),
  },
  {
    kind: "fixed", id: "6e_proba_lire_topup_3",
    niveau: "6e", matiere: "maths", notionId: "proba_experience", microId: "proba_lire",
    difficulty: 2, theme: "neutral",
    text: "Combien y a-t-il de billes rouges dans ce sac ?",
    format: "short", expected: ["3"], comparator: "number_equal",
    hint: "Compte seulement les billes rouges.",
    explanation: pe("on lit une donnée précise dans la situation.", "on compte les billes rouges.", "il y a 3 billes rouges.", "la réponse est 3."),
    tags: ["proba_experience", "lire", "billes", "canvas"],
    canvas: probabilitesCanvas({ variant: "billes", billes: { elements: [{ couleur: "rouge" }, { couleur: "rouge" }, { couleur: "rouge" }, { couleur: "bleu" }, { couleur: "bleu" }, { couleur: "vert" }] } }),
  },
  {
    kind: "fixed", id: "6e_proba_lire_topup_4",
    niveau: "6e", matiere: "maths", notionId: "proba_experience", microId: "proba_lire",
    difficulty: 2, theme: "neutral",
    text: "Combien de secteurs différents possède cette roue ?",
    format: "short", expected: ["4"], comparator: "number_equal",
    hint: "Compte les secteurs colorés.",
    explanation: pe("on lit le nombre d’issues d’une roue.", "on compte les secteurs.", "la roue possède 4 secteurs.", "il y a 4 secteurs différents."),
    tags: ["proba_experience", "lire", "roue", "canvas"],
    canvas: probabilitesCanvas({ variant: "roue", roue: { segments: [{ label: "Rouge", poids: 1 }, { label: "Bleu", poids: 1 }, { label: "Vert", poids: 1 }, { label: "Jaune", poids: 1 }] } }),
  },

  /* ========================= TOP-UP — PROBA_ISSUE ========================= */
  {
    kind: "fixed", id: "6e_proba_issue_topup_1",
    niveau: "6e", matiere: "maths", notionId: "proba_experience", microId: "proba_issue",
    difficulty: 1, theme: "neutral",
    text: "Combien d’issues possibles y a-t-il quand on lance un dé à 6 faces ?",
    format: "short", expected: ["6"], comparator: "number_equal",
    hint: "Une issue par face.",
    explanation: pe("une issue est un résultat possible.", "on compte les résultats possibles d’un lancer de dé.", "on peut obtenir 1, 2, 3, 4, 5 ou 6.", "il y a 6 issues possibles."),
    tags: ["proba_experience", "issue", "de", "canvas"],
    canvas: probabilitesCanvas({ variant: "de", de: { faces: [1, 2, 3, 4, 5, 6] } }),
  },
  {
    kind: "fixed", id: "6e_proba_issue_topup_2",
    niveau: "6e", matiere: "maths", notionId: "proba_experience", microId: "proba_issue",
    difficulty: 1, theme: "neutral",
    text: "Combien d’issues possibles y a-t-il quand on lance une pièce (pile ou face) ?",
    format: "short", expected: ["2"], comparator: "number_equal",
    hint: "Pile ou face.",
    explanation: pe("une issue est un résultat possible.", "on compte les résultats d’un lancer de pièce.", "on peut obtenir pile ou face.", "il y a 2 issues possibles."),
    tags: ["proba_experience", "issue"],
  },
  {
    kind: "fixed", id: "6e_proba_issue_topup_3",
    niveau: "6e", matiere: "maths", notionId: "proba_experience", microId: "proba_issue",
    difficulty: 2, theme: "neutral",
    text: "Combien d’issues différentes peut-on obtenir avec cette roue ?",
    format: "short", expected: ["3"], comparator: "number_equal",
    hint: "Compte les secteurs différents.",
    explanation: pe("le nombre d’issues est le nombre de résultats possibles.", "on compte les secteurs de la roue.", "la roue a 3 secteurs : A, B et C.", "il y a 3 issues possibles."),
    tags: ["proba_experience", "issue", "roue", "canvas"],
    canvas: probabilitesCanvas({ variant: "roue", roue: { segments: [{ label: "A", poids: 1 }, { label: "B", poids: 1 }, { label: "C", poids: 1 }] } }),
  },

  /* ========================= TOP-UP — PROBA_COMPARER ========================= */
  {
    kind: "fixed", id: "6e_proba_comparer_topup_1",
    niveau: "6e", matiere: "maths", notionId: "proba_experience", microId: "proba_comparer",
    difficulty: 2, theme: "neutral",
    text: "Dans ce sac, quelle couleur a le plus de chances d’être tirée ?",
    format: "qcm", choices: ["rouge", "bleu", "vert", "elles sont toutes égales"], expected: ["rouge"], comparator: "mcq_exact",
    hint: "La couleur la plus présente est la plus probable.",
    explanation: pe("la couleur la plus présente a le plus de chances.", "on compte les billes de chaque couleur.", "il y a 4 rouges, 2 bleues et 1 verte.", "la couleur rouge a le plus de chances."),
    tags: ["proba_experience", "comparer", "billes", "canvas"],
    canvas: probabilitesCanvas({ variant: "billes", billes: { elements: [{ couleur: "rouge" }, { couleur: "rouge" }, { couleur: "rouge" }, { couleur: "rouge" }, { couleur: "bleu" }, { couleur: "bleu" }, { couleur: "vert" }] } }),
  },
  {
    kind: "fixed", id: "6e_proba_comparer_topup_2",
    niveau: "6e", matiere: "maths", notionId: "proba_experience", microId: "proba_comparer",
    difficulty: 2, theme: "neutral",
    text: "Dans ce sac, quelle couleur a le moins de chances d’être tirée ?",
    format: "qcm", choices: ["vert", "rouge", "bleu", "elles sont toutes égales"], expected: ["vert"], comparator: "mcq_exact",
    hint: "La couleur la moins présente est la moins probable.",
    explanation: pe("la couleur la moins présente a le moins de chances.", "on compte les billes de chaque couleur.", "il y a 3 rouges, 2 bleues et 1 verte.", "la couleur verte a le moins de chances."),
    tags: ["proba_experience", "comparer", "billes", "canvas"],
    canvas: probabilitesCanvas({ variant: "billes", billes: { elements: [{ couleur: "rouge" }, { couleur: "rouge" }, { couleur: "rouge" }, { couleur: "bleu" }, { couleur: "bleu" }, { couleur: "vert" }] } }),
  },
  {
    kind: "fixed", id: "6e_proba_comparer_topup_3",
    niveau: "6e", matiere: "maths", notionId: "proba_experience", microId: "proba_comparer",
    difficulty: 2, theme: "neutral",
    text: "Sur cette roue, quelle issue est la plus probable ?",
    format: "qcm", choices: ["A", "B", "C", "elles sont égales"], expected: ["A"], comparator: "mcq_exact",
    hint: "Le plus grand secteur est le plus probable.",
    explanation: pe("sur une roue, le plus grand secteur est le plus probable.", "on compare la taille des secteurs.", "le secteur A est plus grand que B et C.", "l’issue A est la plus probable."),
    tags: ["proba_experience", "comparer", "roue", "canvas"],
    canvas: probabilitesCanvas({ variant: "roue", roue: { segments: [{ label: "A", poids: 3 }, { label: "B", poids: 1 }, { label: "C", poids: 1 }] } }),
  },
  {
    kind: "fixed", id: "6e_proba_comparer_topup_4",
    niveau: "6e", matiere: "maths", notionId: "proba_experience", microId: "proba_comparer",
    difficulty: 3, theme: "neutral",
    text: "On lance un dé. A-t-on plus de chances d’obtenir un nombre pair ou un nombre impair ?",
    format: "qcm", choices: ["autant de chances", "plus de chances d’avoir un pair", "plus de chances d’avoir un impair", "aucune chance"], expected: ["autant de chances"], comparator: "mcq_exact",
    hint: "Compte les faces paires et impaires.",
    explanation: pe("on compare le nombre d’issues favorables.", "on compte les faces paires et impaires.", "pairs : 2, 4, 6 (3 faces) ; impairs : 1, 3, 5 (3 faces).", "on a autant de chances d’obtenir un pair qu’un impair."),
    tags: ["proba_experience", "comparer", "de", "canvas"],
    canvas: probabilitesCanvas({ variant: "de", de: { faces: [1, 2, 3, 4, 5, 6] } }),
  },
  {
    kind: "fixed", id: "6e_proba_comparer_topup_5",
    niveau: "6e", matiere: "maths", notionId: "proba_experience", microId: "proba_comparer",
    difficulty: 2, theme: "neutral",
    text: "Un sac contient 5 billes rouges et 2 billes bleues. Quelle couleur est la plus probable au tirage ?",
    format: "qcm", choices: ["rouge", "bleu", "elles sont égales", "noir"], expected: ["rouge"], comparator: "mcq_exact",
    hint: "5 rouges contre 2 bleues.",
    explanation: pe("la couleur la plus présente est la plus probable.", "on compare 5 rouges et 2 bleues.", "5 est plus grand que 2.", "la couleur rouge est la plus probable."),
    tags: ["proba_experience", "comparer", "qcm"],
  },

  /* ========================= TOP-UP — PROBA_ESTIMER ========================= */
  {
    kind: "fixed", id: "6e_proba_estimer_topup_1",
    niveau: "6e", matiere: "maths", notionId: "proba_experience", microId: "proba_estimer",
    difficulty: 1, theme: "neutral",
    text: "Avec un dé classique, l’événement « obtenir 7 » est...",
    format: "qcm", choices: ["impossible", "possible", "certain"], expected: ["impossible"], comparator: "mcq_exact",
    hint: "Un dé n’a pas de face 7.",
    explanation: pe("un événement impossible a une probabilité de 0.", "on regarde les faces du dé.", "il n’y a pas de face 7.", "l’événement « obtenir 7 » est impossible."),
    tags: ["proba_experience", "estimer", "de", "canvas"],
    canvas: probabilitesCanvas({ variant: "de", de: { faces: [1, 2, 3, 4, 5, 6] } }),
  },
  {
    kind: "fixed", id: "6e_proba_estimer_topup_2",
    niveau: "6e", matiere: "maths", notionId: "proba_experience", microId: "proba_estimer",
    difficulty: 1, theme: "neutral",
    text: "Avec un dé classique, l’événement « obtenir un nombre entre 1 et 6 » est...",
    format: "qcm", choices: ["certain", "possible", "impossible"], expected: ["certain"], comparator: "mcq_exact",
    hint: "Toutes les faces sont entre 1 et 6.",
    explanation: pe("un événement certain a une probabilité de 1.", "on regarde toutes les faces.", "elles sont toutes entre 1 et 6.", "l’événement est certain."),
    tags: ["proba_experience", "estimer", "de", "canvas"],
    canvas: probabilitesCanvas({ variant: "de", de: { faces: [1, 2, 3, 4, 5, 6], surligne: [1, 2, 3, 4, 5, 6] } }),
  },
  {
    kind: "fixed", id: "6e_proba_estimer_topup_3",
    niveau: "6e", matiere: "maths", notionId: "proba_experience", microId: "proba_estimer",
    difficulty: 2, theme: "neutral",
    text: "Un sac contient 7 billes rouges et 1 bille bleue. Tirer une bille rouge est plutôt proche de 0 ou de 1 ?",
    format: "qcm", choices: ["proche de 1", "proche de 0", "exactement au milieu"], expected: ["proche de 1"], comparator: "mcq_exact",
    hint: "Presque toutes les billes sont rouges.",
    explanation: pe("plus l’événement est probable, plus sa probabilité est proche de 1.", "on compare le nombre de billes rouges au total.", "il y a 7 rouges sur 8 billes.", "tirer une bille rouge est proche de 1 (sans être certain)."),
    tags: ["proba_experience", "estimer", "billes", "canvas"],
    canvas: probabilitesCanvas({ variant: "billes", billes: { elements: [{ couleur: "rouge" }, { couleur: "rouge" }, { couleur: "rouge" }, { couleur: "rouge" }, { couleur: "rouge" }, { couleur: "rouge" }, { couleur: "rouge" }, { couleur: "bleu" }] } }),
  },

  /* ========================= TOP-UP — PROBA_DEFI ========================= */
  {
    kind: "fixed", id: "6e_proba_defi_topup_1",
    niveau: "6e", matiere: "maths", notionId: "proba_experience", microId: "proba_defi",
    difficulty: 3, theme: "neutral",
    text: "Défi : on lance un dé. Quelle est la probabilité d’obtenir un nombre pair ?",
    format: "qcm", choices: ["1/2", "1/3", "1/6", "2/3"], expected: ["1/2"], comparator: "mcq_exact",
    hint: "3 faces paires sur 6.",
    explanation: pe("une probabilité est le nombre de cas favorables sur le nombre de cas possibles.", "on compte les faces paires sur le total.", "3 faces paires sur 6 : 3/6 = 1/2.", "la probabilité d’obtenir un nombre pair est 1/2."),
    tags: ["proba_experience", "defi", "de", "fraction", "canvas"],
    canvas: probabilitesCanvas({ variant: "de", de: { faces: [1, 2, 3, 4, 5, 6], surligne: [2, 4, 6] } }),
  },
  {
    kind: "fixed", id: "6e_proba_defi_topup_2",
    niveau: "6e", matiere: "maths", notionId: "proba_experience", microId: "proba_defi",
    difficulty: 3, theme: "neutral",
    text: "Un sac contient 5 billes rouges et 5 billes bleues. A-t-on autant de chances de tirer une rouge qu’une bleue ?",
    format: "qcm", choices: ["oui", "non"], expected: ["oui"], comparator: "mcq_exact",
    hint: "Compare le nombre de rouges et de bleues.",
    explanation: pe("deux couleurs ont autant de chances si elles sont en même nombre.", "on compare 5 rouges et 5 bleues.", "il y a autant de rouges que de bleues.", "oui, on a autant de chances de tirer rouge que bleu."),
    tags: ["proba_experience", "defi", "qcm"],
  },
  {
    kind: "fixed", id: "6e_proba_defi_topup_3",
    niveau: "6e", matiere: "maths", notionId: "proba_experience", microId: "proba_defi",
    difficulty: 2, theme: "neutral",
    text: "On lance une pièce une seule fois. Peut-on être certain d’obtenir pile ?",
    format: "qcm", choices: ["non", "oui"], expected: ["non"], comparator: "mcq_exact",
    hint: "Le résultat dépend du hasard.",
    explanation: pe("un résultat de hasard n’est pas garanti.", "on regarde les issues possibles.", "on peut obtenir pile ou face : on ne peut pas être sûr.", "non, on ne peut pas être certain d’obtenir pile."),
    tags: ["proba_experience", "defi", "qcm"],
  },
  {
    kind: "fixed", id: "6e_proba_defi_topup_4",
    niveau: "6e", matiere: "maths", notionId: "proba_experience", microId: "proba_defi",
    difficulty: 4, theme: "neutral",
    text: "Défi : on lance un dé. Quelle est la probabilité d’obtenir le nombre 3 ?",
    format: "qcm", choices: ["1/6", "1/3", "1/2", "3/6"], expected: ["1/6"], comparator: "mcq_exact",
    hint: "Une seule face porte le 3, sur 6 faces.",
    explanation: pe("une probabilité = cas favorables / cas possibles.", "on compte les faces portant un 3 sur le total.", "1 face sur 6 : 1/6.", "la probabilité d’obtenir 3 est 1/6."),
    tags: ["proba_experience", "defi", "de", "fraction", "canvas"],
    canvas: probabilitesCanvas({ variant: "de", de: { faces: [1, 2, 3, 4, 5, 6], surligne: [3] } }),
  },
  /* =========================
     PROBA_VOCABULAIRE — LES GENERATEURS
     ⛔ Ajoutes le 22/08/2026 : la micro n'avait que dix items figes. Regle d'or
     de Frederic — un eleve ne doit pas retomber sur la meme question en dix
     minutes, soit dix variantes MINIMUM, donc un generateur.
     ⭐ Une micro de vocabulaire se parametre sur la SITUATION (de, piece, urne,
     roue) : le raisonnement ne bouge pas, l'habillage si.
  ========================= */
  {
    kind: "template",
    id: "6e_proba_vocabulaire_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte les issues qui réalisent l’événement, puis compare au nombre total d’issues.",
    tags: ["proba_experience", "vocabulaire", "template"],
    // ★2 : l'échelle à cinq cases (impossible → certain).
    generate: () => {
      const cat = randomChoice<Cat>(["impossible", "peu", "moitie", "tres", "certain"]);
      const ex = exemple(cat, true);
      const text = randomChoice([
        `${ex.texte} Où places-tu l’événement « ${ex.lib} » sur l’échelle des probabilités ?`,
        `${ex.texte} L’événement « ${ex.lib} » est…`,
        `${ex.texte} Choisis le mot juste pour l’événement « ${ex.lib} ».`,
        `${ex.texte} Quelle est la chance de « ${ex.lib} » ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: ["impossible", "peu probable", "une chance sur deux", "très probable", "certain"],
        expected: [MOT_CAT[cat]],
        comparator: "mcq_exact",
        explanation: pe(
          "impossible = jamais ; certain = toujours ; entre les deux, on compare les issues favorables au total.",
          "on compte toutes les issues, puis celles qui réalisent l’événement.",
          `Il y a ${ex.total} issues possibles. ${ex.fav === 0 ? "Aucune ne réalise" : `${ex.fav} ${ex.fav > 1 ? "réalisent" : "réalise"}`} l’événement : ${ex.fav} chance${ex.fav > 1 ? "s" : ""} sur ${ex.total}.`,
          `l’événement « ${ex.lib} » est : ${MOT_CAT[cat]}.`
        ),
        canvas: ex.canvas,
      };
    },
  },
  {
    kind: "template",
    id: "6e_proba_vocabulaire_tpl_3_mots",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    hint: "Impossible : jamais. Certain : toujours. Sinon, c’est possible.",
    tags: ["proba_experience", "vocabulaire", "template"],
    // ★1 : impossible, possible ou certain.
    generate: () => {
      const genre = randomChoice(["impossible", "certain", "possible"] as const);
      const cat: Cat = genre === "possible" ? randomChoice<Cat>(["peu", "moitie", "tres"]) : genre;
      const ex = exemple(cat, true);
      const rep = genre === "possible" ? "possible mais pas certain" : genre;
      const text = randomChoice([
        `${ex.texte} L’événement « ${ex.lib} » est-il impossible, possible ou certain ?`,
        `${ex.texte} Choisis le bon mot pour l’événement « ${ex.lib} ».`,
        `${ex.texte} Complète : « ${ex.lib} » est un événement…`,
        `${ex.texte} Quel mot convient pour l’événement « ${ex.lib} » ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: ["impossible", "possible mais pas certain", "certain"],
        expected: [rep],
        comparator: "mcq_exact",
        explanation: pe(
          "impossible = cela n’arrive jamais ; certain = cela arrive à chaque fois.",
          "on regarde toutes les issues : combien réalisent l’événement ?",
          ex.fav === 0
            ? "Aucune issue ne réalise l’événement."
            : ex.fav === ex.total
              ? "Toutes les issues réalisent l’événement."
              : `${ex.fav} issue${ex.fav > 1 ? "s" : ""} sur ${ex.total} ${ex.fav > 1 ? "réalisent" : "réalise"} l’événement : il peut arriver, mais pas à coup sûr.`,
          `l’événement est ${rep}.`
        ),
        canvas: ex.canvas,
      };
    },
  },
  {
    kind: "template",
    id: "6e_proba_vocabulaire_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 3,
    theme: "neutral",
    hint: "Impossible vaut 0, certain vaut 1.",
    tags: ["proba_experience", "vocabulaire", "template"],
    // ★3 : quatre événements sur la même expérience ; lequel est certain,
    // impossible, peu probable ou très probable ?
    generate: () => {
      const cible = randomChoice<Cat>(["impossible", "certain", "peu", "tres"]);
      let texte: string;
      let canvas: CanvasProbabilitesData | undefined;
      let evts: { cat: Cat; lib: string; fav: number }[];
      let total: number;
      if (Math.random() < 0.5) {
        const x = nouveauNum((N) => N % 2 === 0 && N >= 4);
        const cats = shuffle<Cat>(["impossible", "certain", "peu", "tres", "moitie"].filter((c) => c !== cible) as Cat[]).slice(0, 3);
        evts = [cible, ...cats].map((c) => {
          const e = evtNumCat(x, c)!;
          return { cat: c, lib: e.lib, fav: favNum(x, e) };
        });
        texte = situationNum(x);
        canvas = x.ctx.canvas?.(x.N);
        total = x.N;
      } else {
        const rare = ri(1, 2);
        const u = Math.random() < 0.5 ? urneAvec(shuffle([rare, ri(3 * rare, 10)])) : urneAvec(shuffle([rare, ri(rare + 1, 6), ri(2 * rare + 2, 8)]));
        const cRare = u.contenu.find((x) => x.n === rare)!.c;
        const abs = couleurAbsente(u);
        const certain = u.contenu.length === 2 && Math.random() < 0.5 ? { cs: u.contenu.map((x) => x.c), pas: false } : { cs: [abs], pas: true };
        const def: Record<Exclude<Cat, "moitie">, { cs: Coul[]; pas: boolean }> = {
          impossible: { cs: [abs], pas: false },
          certain,
          peu: { cs: [cRare], pas: false },
          tres: { cs: [cRare], pas: true },
        };
        evts = (["impossible", "certain", "peu", "tres"] as const).map((c) => ({ cat: c, lib: evtUrne(u, def[c].cs, def[c].pas), fav: favUrne(u, def[c].cs, def[c].pas) }));
        evts = [evts.find((e) => e.cat === cible)!, ...evts.filter((e) => e.cat !== cible)];
        texte = situationUrne(u);
        canvas = canvasUrne(u);
        total = totalUrne(u);
      }
      const mot = MOT_CAT[cible];
      const [p2] = deuxPrenoms();
      const text = randomChoice([
        `${texte} Parmi ces événements, lequel est ${mot} ?`,
        `${texte} Quel événement est ${mot} ?`,
        `${texte} ${p2.nom} cherche un événement ${mot}. Lequel doit-${ilElle(p2)} choisir ?`,
        `${texte} Coche l’événement ${mot}.`,
      ]);
      return {
        text,
        format: "qcm",
        choices: shuffle(evts.map((e) => e.lib)),
        expected: [evts[0].lib],
        comparator: "mcq_exact",
        explanation: pe(
          "impossible = 0 issue favorable ; certain = toutes les issues ; peu probable = très peu d’issues ; très probable = presque toutes.",
          `on compte, pour chaque événement, les issues favorables parmi les ${total} issues.`,
          evts.map((e) => `« ${e.lib} » : ${e.fav} sur ${total}`).join(" ; ") + ".",
          `l’événement ${mot} est « ${evts[0].lib} ».`
        ),
        canvas,
      };
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PROBA_FREQUENCE_CALCULER — la fréquence observée
  //
  // ⛔ NOTION OUVERTE LE 23/08/2026 — TROU DU PROGRAMME (6e-D-probabilites-3) :
  // « comparer des résultats d'une expérience aléatoire répétée à une
  // probabilité calculée ». Le BO l'annonce comme une nouveauté de la classe :
  // « l'approche fréquentiste des probabilités est également introduite ».
  //
  // ⭐ C'EST UNE AUTRE IDÉE QUE COMPTER LES ISSUES, et c'est pourquoi elle a sa
  // propre notion. `proba_experience` répond à « combien de cas favorables sur
  // combien de cas possibles » — un calcul fait AVANT toute expérience. Ici on
  // lance vraiment, on compte ce qui est SORTI, et on confronte les deux. C'est
  // le seul endroit du programme où l'élève découvre ce qu'une probabilité veut
  // dire dans le monde réel.
  //
  // ⚠️ LES DEUX ERREURS SYMÉTRIQUES, et elles ont chacune leur item :
  //   · croire que l'expérience DOIT donner le résultat calculé — 20 lancers ne
  //     donnent presque jamais exactement 5 « deux piles » ;
  //   · en conclure que le calcul est faux, ou que la pièce est truquée.
  // La bonne lecture est la troisième : l'écart est normal, et il se réduit
  // quand on répète davantage.
  //
  // L'exemple de réussite du BO est ici : lancer 20 fois deux pièces, mettre
  // les résultats en commun, comparer la proportion obtenue à la probabilité.
  // ═══════════════════════════════════════════════════════════════════════════
  {
    kind: "fixed",
    id: "proba_frequence_calculer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_frequence",
    microId: "proba_frequence_calculer",
    difficulty: 2,
    theme: "neutral",
    text: "On lance 20 fois deux pièces. On obtient « deux piles » 6 fois. Quelle est la fréquence observée de « deux piles » ?",
    format: "short",
    expected: ["0,3", "0.3", "6/20", "3/10", "30 %", "30%"],
    comparator: "fraction_decimal_equivalent",
    hint: "Nombre de fois obtenu, divisé par nombre de lancers.",
    explanation: pe(
      "la fréquence observée d'un résultat est le nombre de fois où il est sorti, divisé par le nombre total d'essais.",
      "on écrit la fraction « nombre de fois obtenu / nombre d'essais », puis on la donne en écriture décimale ou en pourcentage.",
      "« Deux piles » est sorti 6 fois sur 20 lancers : la fréquence observée est 6/20, soit 0,3 ou 30 %. Elle se lit après coup, sur ce qui s'est réellement passé — contrairement à la probabilité, qui se calcule avant d'avoir lancé quoi que ce soit.",
      "on garde 6/20 = 0,3."
    ),
    tags: ["proba_frequence", "calculer", "short"],
  },
  {
    kind: "fixed",
    id: "proba_frequence_calculer_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_frequence",
    microId: "proba_frequence_calculer",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la différence entre une fréquence observée et une probabilité ?",
    format: "qcm",
    choices: [
      "la fréquence se lit sur des essais déjà faits, la probabilité se calcule avant",
      "il n'y en a aucune, ce sont deux mots pour la même chose",
      "la fréquence est toujours plus grande que la probabilité",
      "la probabilité se mesure en lançant, la fréquence se calcule",
    ],
    expected: [
      "la fréquence se lit sur des essais déjà faits, la probabilité se calcule avant",
    ],
    comparator: "mcq_exact",
    hint: "Laquelle des deux a besoin qu'on ait vraiment lancé ?",
    explanation: pe(
      "la probabilité se calcule à partir des issues possibles ; la fréquence observée se compte sur des essais réellement effectués.",
      "on se demande si le nombre vient d'un raisonnement ou d'un relevé.",
      "La probabilité d'obtenir « deux piles » vaut 1/4 : on l'obtient en comptant les issues possibles (PP, PF, FP, FF), sans lancer une seule fois. La fréquence, elle, exige d'avoir lancé : elle change d'une série à l'autre, alors que la probabilité, elle, ne bouge jamais. La dernière proposition dit exactement l'inverse de la vérité.",
      "l'une se calcule, l'autre se relève."
    ),
    tags: ["proba_frequence", "calculer", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "proba_frequence_calculer_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_frequence",
    microId: "proba_frequence_calculer",
    difficulty: 3,
    theme: "neutral",
    text: "Une fréquence observée peut-elle valoir 1,4 ?",
    format: "qcm",
    choices: [
      "non : elle est toujours comprise entre 0 et 1",
      "oui, si le résultat sort très souvent",
      "oui, mais seulement avec plus de 100 essais",
      "non, elle doit être un nombre entier",
    ],
    expected: ["non : elle est toujours comprise entre 0 et 1"],
    comparator: "mcq_exact",
    hint: "Peut-on obtenir un résultat plus de fois qu'on n'a lancé ?",
    explanation: pe(
      "une fréquence observée est un quotient dont le numérateur ne peut pas dépasser le dénominateur.",
      "on compare le nombre de fois obtenu au nombre d'essais.",
      "Un résultat ne peut pas sortir plus souvent qu'on n'a fait d'essais : le numérateur est au plus égal au dénominateur, donc le quotient ne dépasse jamais 1. Il vaut 0 si le résultat n'est jamais sorti, 1 s'il est sorti à chaque fois. C'est la même contrainte que pour une probabilité — et un résultat hors de [0 ; 1] signale à coup sûr une erreur de calcul.",
      "une fréquence reste entre 0 et 1."
    ),
    tags: ["proba_frequence", "calculer", "qcm"],
  },
  {
    kind: "template",
    id: "proba_frequence_calculer_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_frequence",
    microId: "proba_frequence_calculer",
    difficulty: 3,
    theme: "neutral",
    hint: "Fréquence = nombre de fois obtenu ÷ nombre d'essais.",
    tags: ["proba_frequence", "calculer", "template"],
    // ★3 : trois issues parfois ; la fréquence d'une issue ou de deux réunies ; en décimal ou en pourcentage.
    generate: () => {
      const s = serieCalc([20, 25, 50, 100]);
      const deux = s.issues.length === 3 && Math.random() < 0.4;
      const [a, b] = shuffle(s.issues);
      const k = deux ? a.k + b.k : a.k;
      const cible = deux ? `« ${a.l} » ou « ${b.l} »` : `« ${a.l} »`;
      const text = randomChoice([
        `${s.texte} Quelle est la fréquence de ${cible} ? Donne-la en nombre décimal.`,
        `${s.texte} Quelle est la fréquence de ${cible}, en pourcentage ?`,
        `${s.texte} Calcule la fréquence observée de ${cible}.`,
      ]);
      // la réponse affichée en premier suit la consigne (pourcentage demandé → « 35 % »)
      const ecr0 = ecrituresFrequence(k, s.n);
      const ecr = /pourcentage/.test(text) ? [ecr0[ecr0.length - 1], ...ecr0.slice(0, -1)] : ecr0;
      return {
        text,
        format: "short",
        expected: ecr,
        comparator: "fraction_decimal_equivalent",
        explanation: pe(
          "fréquence = nombre de fois où le résultat est sorti ÷ nombre d’essais.",
          deux ? "on additionne les deux résultats, puis on divise par le nombre d’essais." : "on divise le nombre de fois par le nombre d’essais.",
          `${deux ? `${a.k} + ${b.k} = ${k}. ` : ""}${k} ÷ ${s.n} = ${virg(k / s.n)}, soit ${virg((100 * k) / s.n)} %.`,
          `la fréquence est ${virg(k / s.n)} (ou ${k}/${s.n}).`
        ),
        canvas: s.canvas,
      };
    },
  },
  {
    kind: "template",
    id: "proba_frequence_calculer_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_frequence",
    microId: "proba_frequence_calculer",
    difficulty: 4,
    theme: "neutral",
    hint: "Fréquence = nombre de fois ÷ nombre d’essais. Elle est toujours entre 0 et 1.",
    tags: ["proba_frequence", "calculer", "template", "qcm"],
    // ★4 (07/10/2026 : plus de question ouverte) : la bonne fréquence parmi les pièges,
    // la fréquence impossible, la fréquence observée face à la probabilité.
    generate: () => {
      const genre = randomChoice(["pieges", "impossible", "proba"] as const);
      if (genre === "proba") {
        // la probabilité est donnée ; la fréquence observée n'est pas elle
        for (;;) {
          const e = experienceRepetee();
          const n = randomChoice([20, 25, 50, 100]);
          const k = binomial(n, e.num / e.den);
          if (k === 0 || k === n || k * e.den === n * e.num) continue;
          const pr = fracTxt(e.num, e.den);
          const cands = [`${k}/${n}`, pr, `${n - k}/${n}`, `${k}/${n - k}`];
          const vals = cands.map((c) => { const [a, b] = c.split("/").map(Number); return b ? a / b : a; });
          if (new Set(vals).size !== 4) continue;
          return {
            text:
              `${e.intro(n)} La probabilité de « ${e.lib} » vaut ${pr}. ` +
              `${maj(ilElle(e.p))} obtient ce résultat ${k} fois. Quelle est la fréquence observée de ce résultat ?`,
            format: "qcm",
            choices: shuffle(cands),
            expected: [`${k}/${n}`],
            comparator: "mcq_exact",
            explanation: pe(
              "la probabilité se calcule avant ; la fréquence se lit sur les essais faits.",
              "fréquence = nombre de fois obtenu sur nombre d’essais.",
              `${k} fois sur ${n} essais : ${k}/${n}, soit ${virg(k / n)}. La probabilité ${pr} est un autre nombre.`,
              `la fréquence observée est ${k}/${n}.`
            ),
          };
        }
      }
      const s = serieCalc([20, 25, 50, 100]);
      const x = randomChoice(s.issues);
      if (genre === "impossible") {
        // trois fréquences possibles, une qui dépasse 1
        const vrais = new Set<string>(s.issues.map((y) => virg(y.k / s.n)));
        while (vrais.size < 3) vrais.add(virg(ri(1, 99) / 100));
        const faux = randomChoice([virg(ri(11, 19) / 10), `${s.n + ri(1, 9)}/${s.n}`, virg(ri(101, 150) / 100)]);
        return {
          text: `${s.texte} ${s.p.nom} calcule des fréquences, mais se trompe une fois. Quelle fréquence est impossible ?`,
          format: "qcm",
          choices: shuffle([...vrais, faux]),
          expected: [faux],
          comparator: "mcq_exact",
          explanation: pe(
            "une fréquence est toujours entre 0 et 1 : un résultat ne peut pas sortir plus souvent qu’on n’a fait d’essais.",
            "on cherche la valeur plus grande que 1.",
            `${faux} est plus grand que 1.`,
            `${faux} est impossible.`
          ),
          canvas: s.canvas,
        };
      }
      const cands = [`${x.k}/${s.n}`, `${s.n - x.k}/${s.n}`, `${x.k}/${s.n - x.k}`, `${s.n}/${x.k}`];
      const vals = cands.map((c) => { const [a, b] = c.split("/").map(Number); return a / b; });
      const garde = cands.filter((c, i) => i === 0 || !vals.slice(0, i).some((v) => Math.abs(v - vals[i]) < 1e-9));
      return {
        text: randomChoice([
          `${s.texte} Quelle est la fréquence de « ${x.l} » ?`,
          `${s.texte} ${s.p.nom} veut la fréquence de « ${x.l} ». Laquelle est juste ?`,
        ]),
        format: "qcm",
        choices: shuffle(garde),
        expected: [cands[0]],
        comparator: "mcq_exact",
        explanation: pe(
          "fréquence = nombre de fois où le résultat est sorti SUR nombre total d’essais.",
          "on prend le résultat demandé, sur le total (pas sur les autres résultats).",
          `« ${x.l} » : ${x.k} fois sur ${s.n} essais.`,
          `la fréquence est ${x.k}/${s.n}, soit ${virg(x.k / s.n)}.`
        ),
        canvas: s.canvas,
      };
    },
  },
  {
    kind: "template",
    id: "proba_frequence_calculer_tpl_2_simple",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_frequence",
    microId: "proba_frequence_calculer",
    difficulty: 2,
    theme: "neutral",
    hint: "Fréquence = nombre de fois ÷ nombre d’essais.",
    tags: ["proba_frequence", "calculer", "template"],
    // ★2 : deux résultats ; la fréquence de l'un.
    generate: () => {
      const s = serieCalc([10, 20, 25, 50], 2);
      const x = randomChoice(s.issues);
      const text = randomChoice([
        `${s.texte} Quelle est la fréquence de « ${x.l} » ?`,
        `${s.texte} Calcule la fréquence de « ${x.l} ».`,
        `${s.texte} Donne la fréquence observée de « ${x.l} ».`,
        `${s.texte} Quelle est la fréquence du résultat « ${x.l} » ?`,
      ]);
      return {
        text,
        format: "short",
        expected: ecrituresFrequence(x.k, s.n),
        comparator: "fraction_decimal_equivalent",
        explanation: pe(
          "la fréquence d’un résultat = nombre de fois où il est sorti ÷ nombre d’essais.",
          "on divise, puis on écrit en nombre décimal (ou en fraction).",
          `« ${x.l} » : ${x.k} fois sur ${s.n}. ${x.k} ÷ ${s.n} = ${virg(x.k / s.n)}.`,
          `la fréquence est ${virg(x.k / s.n)} (ou ${x.k}/${s.n}).`
        ),
        canvas: s.canvas,
      };
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PROBA_FREQUENCE_COMPARER — confronter l'observé au calculé
  // ═══════════════════════════════════════════════════════════════════════════
  {
    kind: "fixed",
    id: "proba_frequence_comparer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_frequence",
    microId: "proba_frequence_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "On lance deux pièces. Quelle est la probabilité d'obtenir « deux piles » ?",
    format: "short",
    expected: ["1/4", "0,25", "0.25", "25 %", "25%"],
    comparator: "fraction_decimal_equivalent",
    hint: "Écris toutes les issues possibles des deux pièces.",
    explanation: pe(
      "la probabilité d'un évènement, en situation d'équiprobabilité, est le nombre de cas favorables divisé par le nombre de cas possibles.",
      "on écrit toutes les issues possibles, puis on compte celles qui conviennent.",
      "Avec deux pièces, les issues possibles sont PP, PF, FP et FF : il y en a 4, et elles ont toutes la même chance. Une seule donne « deux piles » : la probabilité vaut donc 1/4, soit 0,25 ou 25 %. Attention à ne pas oublier que PF et FP sont deux issues DIFFÉRENTES — c'est l'erreur qui fait répondre 1/3.",
      "on garde 1/4."
    ),
    tags: ["proba_frequence", "comparer", "canvas", "short"],
    canvas: probabilitesCanvas({
      variant: "tableau",
      tableau: {
        entetes: ["Pièce 1", "Pièce 2", "Résultat"],
        lignes: [
          ["Pile", "Pile", "deux piles"],
          ["Pile", "Face", "—"],
          ["Face", "Pile", "—"],
          ["Face", "Face", "—"],
        ],
        casesSurlignees: [[0, 2]],
      },
    }),
  },
  {
    kind: "fixed",
    id: "proba_frequence_comparer_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_frequence",
    microId: "proba_frequence_comparer",
    difficulty: 4,
    theme: "neutral",
    text: "La probabilité de « deux piles » vaut 0,25. Une classe lance 20 fois et obtient 6 « deux piles », soit une fréquence de 0,3. Que faut-il en conclure ?",
    format: "qcm",
    choices: [
      "rien d'anormal : sur 20 lancers, un écart de ce genre est attendu",
      "le calcul de la probabilité est faux",
      "les pièces sont truquées",
      "la classe a mal compté ses lancers",
    ],
    expected: ["rien d'anormal : sur 20 lancers, un écart de ce genre est attendu"],
    comparator: "mcq_exact",
    hint: "0,25 sur 20 lancers, cela ferait 5 fois. Est-ce si loin de 6 ?",
    explanation: pe(
      "une fréquence observée s'approche de la probabilité sans avoir à lui être égale.",
      "on convertit la probabilité en nombre de fois attendu, puis on regarde l'écart.",
      "0,25 × 20 = 5 : on s'attendait à environ 5 « deux piles », il y en a eu 6. Un seul de plus — c'est exactement le genre d'écart que produit le hasard sur si peu de lancers. Croire que l'expérience DOIT donner 5, ou en déduire que le calcul est faux, sont les deux erreurs symétriques du chapitre.",
      "l'écart est normal, on ne conclut rien contre le calcul."
    ),
    tags: ["proba_frequence", "comparer", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "proba_frequence_comparer_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_frequence",
    microId: "proba_frequence_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "On lance 60 fois un dé équilibré. Combien de 6 peut-on s'attendre à obtenir, à peu près ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "La probabilité d'obtenir un 6 vaut 1/6.",
    explanation: pe(
      "le nombre de fois attendu s'obtient en multipliant la probabilité par le nombre d'essais.",
      "on calcule probabilité × nombre d'essais.",
      "La probabilité d'obtenir un 6 vaut 1/6, donc sur 60 lancers on s'attend à environ 60 × 1/6 = 10 sorties du 6. « À peu près » est important : on obtiendra sans doute 8, 11 ou 13, presque jamais exactement 10. Le calcul donne un ORDRE DE GRANDEUR, pas une promesse.",
      "on garde environ 10."
    ),
    tags: ["proba_frequence", "comparer", "short"],
  },
  {
    kind: "template",
    id: "proba_frequence_comparer_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_frequence",
    microId: "proba_frequence_comparer",
    difficulty: 4,
    theme: "neutral",
    hint: "Multiplie la probabilité par le nombre d'essais.",
    tags: ["proba_frequence", "comparer", "template"],
    // ★4 : un écart observé est-il NORMAL (peu d'essais) ou SUSPECT (beaucoup d'essais, très loin) ?
    // Le correcteur calcule l'écart en écarts types : au plus 1,5 → hasard ; au moins 4 → truqué.
    generate: () => {
      const normal = Math.random() < 0.55;
      const { e, n, k, attendu } = tirageEcart(normal);
      const choices = [
        "rien d’anormal : c’est l’effet du hasard",
        TRUQUE[e.objet],
        "le calcul de la probabilité est faux",
        `${e.p.nom} a forcément mal compté`,
      ];
      return {
        text:
          `${e.intro(n)} L’événement « ${e.lib} » se produit ${milliers(k)} fois. ` +
          `La probabilité est ${fracTxt(e.num, e.den)} : on en attendait environ ${milliers(attendu)}. ` +
          randomChoice(["Que peut-on en penser ?", "Qu’en conclure ?", "Quelle conclusion est la bonne ?"]),
        format: "qcm",
        choices: shuffle(choices),
        expected: [normal ? choices[0] : choices[1]],
        comparator: "mcq_exact",
        explanation: pe(
          "une fréquence observée s’approche de la probabilité sans lui être égale ; l’écart compte d’autant plus que les essais sont nombreux.",
          "on compare l’écart au nombre d’essais.",
          normal
            ? `${milliers(k)} au lieu d’environ ${milliers(attendu)} sur seulement ${milliers(n)} essais : un écart de ce genre arrive très souvent par hasard.`
            : `${milliers(k)} au lieu d’environ ${milliers(attendu)} sur ${milliers(n)} essais : avec autant d’essais, le hasard ne peut presque jamais faire un tel écart.`,
          normal ? "rien d’anormal." : `${TRUQUE[e.objet]}.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "proba_frequence_comparer_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_frequence",
    microId: "proba_frequence_comparer",
    difficulty: 5,
    theme: "neutral",
    hint: "Un écart n'est pas une erreur : c'est le nombre d'essais qui dit s'il est suspect.",
    tags: ["proba_frequence", "comparer", "template", "qcm"],
    // ★5 (07/10/2026 : plus de question ouverte) : mettre en commun les résultats de la
    // classe (le geste du BO), ou dire quelle série fait VRAIMENT douter.
    generate: () => {
      if (Math.random() < 0.5) {
        const [g, m] = randomChoice([[2, 10], [2, 25], [5, 10], [4, 25], [5, 20]] as const);
        const exp = randomChoice([
          { quoi: "deux pièces", res: "deux piles", p: 1 / 4 },
          { quoi: "une pièce", res: "pile", p: 1 / 2 },
          { quoi: "un dé", res: "six", p: 1 / 6 },
          { quoi: "une punaise", res: "pointe en haut", p: 0.6 },
        ]);
        const ks = Array.from({ length: g }, () => binomial(m, exp.p));
        const K = ks.reduce((a, b) => a + b, 0);
        if (K === 0) ks[0] = 1;
        const Kf = ks.reduce((a, b) => a + b, 0);
        const p = randomChoice(PRENOMS);
        const text =
          `Dans la classe ${de(p.nom)}, ${g} groupes lancent chacun ${m} fois ${exp.quoi} et comptent les « ${exp.res} ». ` +
          ks.map((k, i) => `Groupe ${i + 1} : ${k}.`).join(" ") +
          ` On réunit les résultats de tous les groupes. ` +
          randomChoice([`Quelle est la fréquence de « ${exp.res} » pour toute la classe ?`, `Calcule la fréquence de « ${exp.res} » pour la classe entière.`]);
        return {
          text,
          format: "short",
          expected: ecrituresFrequence(Kf, g * m),
          comparator: "fraction_decimal_equivalent",
          explanation: pe(
            "en réunissant les groupes, on a plus d’essais : la fréquence est plus fiable.",
            "on additionne les résultats, on additionne les essais, puis on divise.",
            `${ks.join(" + ")} = ${Kf} sur ${g} × ${m} = ${g * m} essais. ${Kf} ÷ ${g * m} = ${virg(Kf / (g * m))}.`,
            `la fréquence de la classe est ${virg(Kf / (g * m))}.`
          ),
        };
      }
      // Deux séries : la petite s'écarte beaucoup (hasard), la grande s'écarte un peu en fréquence mais énormément en nombre.
      const piece = Math.random() < 0.5;
      const lib = piece ? "obtenir pile" : "obtenir le nombre 6";
      const objet = piece ? "une pièce" : "un dé à 6 faces, numérotées de 1 à 6";
      const pr = piece ? 1 / 2 : 1 / 6;
      const [A, B] = deuxPrenoms();
      const cas = randomChoice(["grande", "grande", "aucune"] as const);
      let n1: number, k1: number, n2: number, k2: number;
      for (;;) {
        n1 = randomChoice([10, 12, 20]);
        k1 = Math.round(n1 * pr + (Math.random() < 0.5 ? 1 : -1) * (0.6 + 0.6 * Math.random()) * Math.sqrt(n1 * pr * (1 - pr)));
        n2 = randomChoice([600, 900, 1200]);
        const s2 = Math.sqrt(n2 * pr * (1 - pr));
        k2 = Math.round(n2 * pr + (Math.random() < 0.5 ? 1 : -1) * (cas === "grande" ? 6 + 2 * Math.random() : Math.random()) * s2);
        const z1 = Math.abs(k1 - n1 * pr) / Math.sqrt(n1 * pr * (1 - pr));
        const z2 = Math.abs(k2 - n2 * pr) / s2;
        if (k1 <= 0 || k1 >= n1 || z1 > 1.2) continue;
        if (cas === "grande" ? z2 < 5 : z2 > 1.2) continue;
        break;
      }
      const ordre = Math.random() < 0.5;
      const phr = (nom: Prenom, n: number, k: number) => `${nom.nom} lance ${milliers(n)} fois ${objet}. L’événement « ${lib} » se produit ${milliers(k)} fois.`;
      const text =
        `${ordre ? phr(A, n1, k1) : phr(A, n2, k2)} ${ordre ? phr(B, n2, k2) : phr(B, n1, k1)} ` +
        `La probabilité de « ${lib} » vaut ${piece ? "1/2" : "1/6"}. Quelle série fait vraiment douter ${piece ? "de la pièce" : "du dé"} ?`;
      const grand = ordre ? B : A;
      const choices = [`celle ${de(A.nom)}`, `celle ${de(B.nom)}`, "les deux", "aucune des deux"];
      return {
        text,
        format: "qcm",
        choices,
        expected: [cas === "grande" ? `celle ${de(grand.nom)}` : "aucune des deux"],
        comparator: "mcq_exact",
        explanation: pe(
          "un écart compte d’autant plus que les essais sont nombreux.",
          "pour chaque série, on compare le résultat au nombre attendu (probabilité × essais).",
          `Sur ${n1} lancers, on attendait environ ${virg(Math.round(n1 * pr * 10) / 10)} : ${k1}, c’est l’effet du hasard. Sur ${milliers(n2)} lancers, on attendait environ ${milliers(Math.round(n2 * pr))} : ${milliers(k2)}, ${cas === "grande" ? "c’est beaucoup trop loin pour être le hasard" : "c’est tout près"}.`,
          cas === "grande" ? `seule la série de ${grand.nom} fait douter.` : "aucune série ne fait douter."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "proba_frequence_comparer_tpl_2_attendu",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_frequence",
    microId: "proba_frequence_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Nombre attendu = probabilité × nombre d’essais.",
    tags: ["proba_frequence", "comparer", "template"],
    // ★3 : combien de fois peut-on s'attendre à obtenir le résultat ? (la probabilité se calcule à partir du texte)
    generate: () => {
      const e = experienceRepetee();
      const n = e.den * ri(2, Math.max(2, Math.floor(120 / e.den)));
      const attendu = (n * e.num) / e.den;
      const text = randomChoice([
        `${e.intro(n)} À combien de fois « ${e.lib} » peut-on s’attendre, à peu près ?`,
        `${e.intro(n)} Environ combien de fois peut-${ilElle(e.p)} s’attendre à « ${e.lib} » ?`,
        `${e.intro(n)} Combien de fois « ${e.lib} » peut-on prévoir, environ ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(attendu)],
        comparator: "number_equal",
        explanation: pe(
          "nombre de fois attendu = probabilité × nombre d’essais.",
          "on calcule d’abord la probabilité, puis on la multiplie par le nombre d’essais.",
          `La probabilité de « ${e.lib} » vaut ${fracTxt(e.num, e.den)}. ${n} × ${fracTxt(e.num, e.den)} = ${n} ÷ ${e.den}${e.num > 1 ? ` × ${e.num}` : ""} = ${attendu}.`,
          `on peut s’attendre à environ ${attendu} fois — presque jamais exactement.`
        ),
      };
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PROBA_FREQUENCE_REPETER — plus on répète, plus l'écart se réduit
  // ═══════════════════════════════════════════════════════════════════════════
  {
    kind: "fixed",
    id: "proba_frequence_repeter_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_frequence",
    microId: "proba_frequence_repeter",
    difficulty: 4,
    theme: "neutral",
    text: "Voici les fréquences de « pile » obtenues en lançant une pièce de plus en plus de fois. Que constate-t-on ?",
    format: "qcm",
    choices: [
      "plus on lance, plus la fréquence se rapproche de 0,5",
      "la fréquence augmente toujours quand on lance plus",
      "la fréquence finit par valoir exactement 0,5",
      "le nombre de lancers ne change rien à la fréquence",
    ],
    expected: ["plus on lance, plus la fréquence se rapproche de 0,5"],
    comparator: "mcq_exact",
    hint: "Regarde l'écart à 0,5 à chaque ligne, pas la fréquence elle-même.",
    explanation: pe(
      "quand on répète beaucoup une expérience, la fréquence observée se rapproche de la probabilité.",
      "on suit l'écart entre la fréquence et la probabilité au fil des lignes.",
      "L'écart à 0,5 passe de 0,10 à 0,06, puis 0,02, puis 0,008 : il diminue nettement. La fréquence ne monte pas toujours — elle oscille autour de 0,5 — et elle n'atteint presque jamais 0,5 tout rond. Ce qui se réduit, c'est l'ÉCART, pas la fréquence.",
      "la fréquence se rapproche de la probabilité sans l'atteindre."
    ),
    tags: ["proba_frequence", "repeter", "canvas", "qcm"],
    canvas: probabilitesCanvas({
      variant: "tableau",
      tableau: {
        entetes: ["Nombre de lancers", "Fréquence de « pile »", "Écart à 0,5"],
        lignes: [
          ["10", "0,60", "0,10"],
          ["50", "0,44", "0,06"],
          ["500", "0,52", "0,02"],
          ["5 000", "0,492", "0,008"],
        ],
      },
    }),
  },
  {
    kind: "fixed",
    id: "proba_frequence_repeter_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_frequence",
    microId: "proba_frequence_repeter",
    difficulty: 4,
    theme: "neutral",
    text: "Une pièce équilibrée est tombée 5 fois de suite sur pile. Quelle est la probabilité qu'elle tombe sur face au lancer suivant ?",
    format: "short",
    expected: ["1/2", "0,5", "0.5", "50 %", "50%"],
    comparator: "fraction_decimal_equivalent",
    hint: "La pièce se souvient-elle des lancers précédents ?",
    explanation: pe(
      "chaque lancer est indépendant des précédents : la probabilité ne change pas.",
      "on raisonne sur le lancer suivant seul, sans tenir compte de ce qui s'est passé avant.",
      "La probabilité reste 1/2. La pièce n'a pas de mémoire : elle ne « doit » rien rattraper. Croire que face devient plus probable après cinq piles est une erreur si répandue qu'elle porte un nom — et c'est bien pour cela que le rapprochement de la fréquence vers 0,5 ne vient pas d'une compensation, mais du fait que les premiers lancers pèsent de moins en moins lourd quand leur nombre grandit.",
      "la probabilité reste 1/2 à chaque lancer."
    ),
    tags: ["proba_frequence", "repeter", "piege", "short"],
  },
  {
    kind: "fixed",
    id: "proba_frequence_repeter_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_frequence",
    microId: "proba_frequence_repeter",
    difficulty: 3,
    theme: "neutral",
    text: "Deux séries donnent une fréquence de 0,30 pour « deux piles » : l'une sur 20 lancers, l'autre sur 2 000. Laquelle renseigne le mieux sur la vraie probabilité ?",
    format: "qcm",
    choices: [
      "celle sur 2 000 lancers",
      "celle sur 20 lancers",
      "les deux également, la fréquence est la même",
      "aucune, il faudrait connaître les résultats détaillés",
    ],
    expected: ["celle sur 2 000 lancers"],
    comparator: "mcq_exact",
    hint: "Sur laquelle le hasard a-t-il le moins de prise ?",
    explanation: pe(
      "plus une série est longue, plus sa fréquence observée est un bon indicateur de la probabilité.",
      "on compare le nombre d'essais, pas seulement la fréquence obtenue.",
      "Les deux fréquences sont égales, mais elles ne pèsent pas le même poids. Sur 20 lancers, un ou deux résultats de plus suffisent à faire passer la fréquence de 0,25 à 0,30 : le hasard explique tout. Sur 2 000 lancers, un écart de 0,05 correspond à une centaine de résultats — le hasard seul ne suffit plus. La deuxième série mérite donc bien plus de confiance, et suggère même que la probabilité n'est peut-être pas 0,25.",
      "on garde la série la plus longue."
    ),
    tags: ["proba_frequence", "repeter", "qcm"],
  },
  {
    kind: "template",
    id: "proba_frequence_repeter_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_frequence",
    microId: "proba_frequence_repeter",
    difficulty: 4,
    theme: "neutral",
    hint: "Compare les écarts à la probabilité, pas les fréquences entre elles.",
    tags: ["proba_frequence", "repeter", "template"],
    // ★4 : une petite et une grande série — laquelle est plus proche de la probabilité ?
    // ou un tableau de fréquences cumulées : vers quelle valeur se rapproche-t-on ?
    generate: () => {
      const e = experienceRepetee();
      const p = e.num / e.den;
      const pr = fracTxt(e.num, e.den);
      if (Math.random() < 0.5) {
        for (;;) {
          const n1 = randomChoice([10, 20, 25, 50]);
          const n2 = randomChoice([500, 1000, 2000]);
          const k1 = binomial(n1, p);
          const k2 = binomial(n2, p);
          const d1 = Math.abs(k1 / n1 - p);
          const d2 = Math.abs(k2 / n2 - p);
          if (Math.abs(d1 - d2) < 0.03 || k1 === 0 || k1 === n1) continue;
          const c1 = `celle sur ${n1} essais`;
          const c2 = `celle sur ${milliers(n2)} essais`;
          return {
            text:
              `${e.intro(n1)} L’événement « ${e.lib} » se produit ${k1} fois. ` +
              `Puis ${ilElle(e.p)} recommence avec ${milliers(n2)} essais : l’événement se produit ${milliers(k2)} fois. ` +
              `La probabilité de cet événement vaut ${pr}. Quelle série a une fréquence plus proche de la probabilité ?`,
            format: "qcm",
            choices: [c1, c2, "les deux sont aussi proches"],
            expected: [d1 < d2 ? c1 : c2],
            comparator: "mcq_exact",
            explanation: pe(
              "plus on répète, plus la fréquence a de chances d’être proche de la probabilité — mais on vérifie en calculant.",
              "on calcule chaque fréquence, puis son écart à la probabilité.",
              `${k1} ÷ ${n1} ≈ ${virg(Math.round((k1 / n1) * 100) / 100)} ; ${milliers(k2)} ÷ ${milliers(n2)} ≈ ${virg(Math.round((k2 / n2) * 1000) / 1000)} ; probabilité ≈ ${virg(Math.round(p * 1000) / 1000)}.`,
              `la plus proche est ${d1 < d2 ? c1 : c2}.`
            ),
          };
        }
      }
      // le tableau des fréquences cumulées
      const paliers = [10, 50, 100, 500, 1000];
      let ks: number[] = [];
      do {
        ks = [];
        let k = 0;
        paliers.forEach((n, i) => {
          k += binomial(n - (i ? paliers[i - 1] : 0), p);
          ks.push(k);
        });
      } while (Math.abs(ks[4] / 1000 - p) >= 0.03);
      const fFin = ks[4] / 1000;
      const LEURRES: [number, number][] = [[1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [2, 3], [3, 4], [1, 10], [2, 5], [3, 5]];
      const leurres = shuffle(LEURRES.filter(([a, b]) => Math.abs(a / b - fFin) >= 0.06 && !egalP(a / b, p))).slice(0, 3);
      return {
        text:
          `${e.intro(1000)} Le tableau donne les résultats au fur et à mesure, pour l’événement « ${e.lib} ». ` +
          randomChoice(["Vers quelle valeur la fréquence se rapproche-t-elle ?", "De quelle valeur la fréquence se rapproche-t-elle quand on répète ?"]),
        format: "qcm",
        choices: shuffle([pr, ...leurres.map(([a, b]) => `${a}/${b}`)]),
        expected: [pr],
        comparator: "mcq_exact",
        explanation: pe(
          "quand on répète beaucoup, la fréquence se rapproche de la probabilité.",
          "on regarde les dernières lignes, celles qui ont le plus d’essais.",
          `Après 1 000 essais, la fréquence vaut ${virg(fFin)}. La probabilité de « ${e.lib} » vaut ${pr}, soit environ ${virg(Math.round(p * 1000) / 1000)}.`,
          `la fréquence se rapproche de ${pr}.`
        ),
        canvas: probabilitesCanvas({
          variant: "tableau",
          tableau: {
            entetes: ["Nombre d’essais", "Nombre de fois", "Fréquence"],
            lignes: paliers.map((n, i) => [milliers(n), milliers(ks[i]), virg(Math.round((ks[i] / n) * 1000) / 1000)]),
          },
        }),
      };
    },
  },
  {
    kind: "template",
    id: "proba_frequence_repeter_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_frequence",
    microId: "proba_frequence_repeter",
    difficulty: 5,
    theme: "neutral",
    hint: "Attention : « se rapprocher » ne veut pas dire « rattraper ». Le hasard n’a pas de mémoire.",
    tags: ["proba_frequence", "repeter", "template", "qcm"],
    // ★5 (07/10/2026 : plus de question ouverte) : le hasard n'a pas de mémoire ; et
    // sur des milliers d'essais, la fréquence sera TRÈS PROCHE de la probabilité, pas égale.
    generate: () => {
      const p = randomChoice(PRENOMS);
      if (Math.random() < 0.6) {
        const k = ri(3, 9);
        let texte: string;
        let lib: string;
        let sortie: string;
        let num = 1;
        let den: number;
        const r = ri(0, 2);
        if (r === 0) {
          const [deja, autre] = shuffle(["pile", "face"]);
          texte = `${p.nom} lance une pièce. La pièce tombe ${k} fois de suite sur ${deja}.`;
          lib = `obtenir ${autre}`;
          sortie = autre;
          den = 2;
        } else if (r === 1) {
          const N = randomChoice([4, 6, 8, 10, 12]);
          const v = ri(1, N);
          texte = `${p.nom} lance un dé à ${N} faces, numérotées de 1 à ${N}. Le ${v} n’est pas sorti depuis ${k} lancers.`;
          lib = `obtenir le nombre ${v}`;
          sortie = `le ${v}`;
          den = N;
        } else {
          // une couleur minoritaire : qu'elle ne sorte pas pendant quelques tours est plausible
          const T = randomChoice([4, 5, 6, 8, 10]);
          const c = ri(1, Math.floor(T / 2));
          const ro = roueAvec([c, T - c]);
          const coul = ro.contenu[0].c;
          const leC = coul === "orange" ? "l’orange" : `le ${coul}`;
          texte = `${p.nom} fait tourner une roue. Elle a ${T} secteurs de même taille : ${listeFr(ro.contenu.map((x) => groupe(SECTEUR, x.c, x.n)))}. ${maj(leC)} n’est pas sorti depuis ${k} tours.`;
          lib = evtRoue(ro, [coul]);
          sortie = leC;
          num = c / pgcd(c, T);
          den = T / pgcd(c, T);
        }
        const pr = fracTxt(num, den);
        const [p2] = deuxPrenoms();
        return {
          text:
            `${texte} ${p2.nom} pense que ${sortie} va forcément sortir bientôt. ` +
            `Quelle est la probabilité de « ${lib} » au prochain essai ?`,
          format: "qcm",
          choices: shuffle([pr, `plus que ${pr}`, `moins que ${pr}`, "0"]),
          expected: [pr],
          comparator: "mcq_exact",
          explanation: pe(
            "chaque essai est indépendant des précédents : le hasard n’a pas de mémoire.",
            "on calcule la probabilité comme au premier essai, sans tenir compte de ce qui est déjà sorti.",
            `La probabilité de « ${lib} » vaut ${pr}, avant comme après les ${k} essais. Rien ne « doit » sortir.`,
            `la probabilité reste ${pr}.`
          ),
        };
      }
      const e = experienceRepetee();
      const n = randomChoice([5000, 10000, 20000]);
      const pr = fracTxt(e.num, e.den);
      return {
        text: `${e.intro(n)} Que peut-on prévoir pour la fréquence de « ${e.lib} » ?`,
        format: "qcm",
        choices: shuffle([`très proche de ${pr}`, `exactement ${pr}`, `loin de ${pr}`, "égale à 1"]),
        expected: [`très proche de ${pr}`],
        comparator: "mcq_exact",
        explanation: pe(
          "plus on répète, plus la fréquence se rapproche de la probabilité ; elle ne tombe presque jamais pile dessus.",
          "on calcule la probabilité, puis on pense au grand nombre d’essais.",
          `La probabilité de « ${e.lib} » vaut ${pr}. Avec ${milliers(n)} essais, la fréquence sera très proche de ${pr}, mais presque jamais exactement égale.`,
          `très proche de ${pr}.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "proba_frequence_repeter_tpl_2_confiance",
    niveau: "6e",
    matiere: "maths",
    notionId: "proba_frequence",
    microId: "proba_frequence_repeter",
    difficulty: 3,
    theme: "neutral",
    hint: "Une série plus longue laisse moins de place au hasard.",
    tags: ["proba_frequence", "repeter", "template"],
    // ★3 : une petite et une grande série ; laquelle renseigne le mieux sur la probabilité ?
    generate: () => {
      const OBJ = [
        { o: "une pièce", lib: "obtenir pile", p: 0.5 },
        { o: "une punaise", lib: "tomber pointe en haut", p: 0.6 },
        { o: "un bouchon", lib: "tomber debout", p: 0.15 },
        { o: "un gobelet", lib: "tomber à l’endroit", p: 0.3 },
        { o: "un dé", lib: "obtenir six", p: 1 / 6 },
        { o: "une tartine en carton", lib: "tomber côté beurre", p: 0.5 },
        { o: "une capsule de bouteille", lib: "tomber à l’envers", p: 0.4 },
      ];
      const x = randomChoice(OBJ);
      const [A, B] = deuxPrenoms();
      const petit = randomChoice([10, 12, 15, 20]);
      const grand = randomChoice([200, 500, 1000, 2000]);
      const aPetit = Math.random() < 0.5;
      const nA = aPetit ? petit : grand;
      const nB = aPetit ? grand : petit;
      const phr = (nom: Prenom, n: number) => `${nom.nom} lance ${milliers(n)} fois ${x.o}. L’événement « ${x.lib} » se produit ${milliers(binomial(n, x.p))} fois.`;
      const text =
        `${phr(A, nA)} ${phr(B, nB)} ` +
        randomChoice([
          `Quelle série renseigne le mieux sur la probabilité de « ${x.lib} » ?`,
          `À quelle série faut-il faire le plus confiance pour estimer la probabilité de « ${x.lib} » ?`,
        ]);
      const choices = [`celle ${de(A.nom)}`, `celle ${de(B.nom)}`, "les deux autant"];
      return {
        text,
        format: "qcm",
        choices,
        expected: [aPetit ? choices[1] : choices[0]],
        comparator: "mcq_exact",
        explanation: pe(
          "plus une série est longue, plus sa fréquence est proche de la probabilité, en général.",
          "on compare le nombre d’essais des deux séries.",
          `${milliers(grand)} essais contre ${petit} : sur peu d’essais, le hasard peut beaucoup changer la fréquence.`,
          `on fait confiance à la série ${de(aPetit ? B.nom : A.nom)}.`
        ),
      };
    },
  },
]
