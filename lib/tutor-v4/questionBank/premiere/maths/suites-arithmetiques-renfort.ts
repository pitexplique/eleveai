// Renfort des suites ARITHMÉTIQUES de 1re (module de maths sans spé, programme
// 2026, épreuve anticipée de juin 2027), 10/11/2026.
//
// Mesure du 10/11 (scripts/mesurer-squelettes-coach.ts premiere
// lin_suite_arithmetique lin_suite_terme_general) : 1 à 8 squelettes par micro,
// 13 à 19 répétitions sur 20. Les élèves reconnaissaient la PHRASE. On branche
// des générateurs : familles × tournures × situations de la vie courante et de
// culture scientifique (les maths sont transversales), avec le nom de la suite
// (u, v, w, t, p, s) qui change. Aucune question « open » : QCM ou réponse
// courte. Le rang de départ (0 ou 1) est TOUJOURS dit dans l'énoncé.
// Programme 2026 : « motifs géométriques évolutifs en forme de T ou de croix,
// carré bordé » → générateurs de motifs (figure_libre) dans reconnaitre,
// terme_rang et interpreter. Pas de somme de termes.
// Correcteurs : correcteurs/suites.ts (une fonction par générateur, tag « g:… »).

import type { CanvasFigure, TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { arr, cap, expl, fr, melange, randomInt, rc } from "./derivee-renfort-outils";

export type Q = TutorGeneratedQuestionV4;
export { arr, cap, expl, fr, melange, randomInt, rc };

/* ---------- Écritures ---------- */

/** Nombre en LaTeX : virgule « {,} », espace fine des milliers au-delà de 9 999. */
export function nb(x: number) {
  const r = arr(x);
  const [i, d] = String(Math.abs(r)).split(".");
  const ent = i.length > 4 ? i.replace(/\B(?=(\d{3})+(?!\d))/g, "\\,") : i;
  return (r < 0 ? "-" : "") + ent + (d ? `{,}${d}` : "");
}

/** « + 5 » ou « - 5 » derrière un terme. */
export function sg(x: number) {
  return x < 0 ? `- ${nb(-x)}` : `+ ${nb(x)}`;
}

/** a + bn en LaTeX (b ≠ 0) : « 7 + 3n », « 7 - n », « 4n ». */
export function aff(a: number, b: number, v = "n") {
  const coef = Math.abs(b) === 1 ? v : `${nb(Math.abs(b))}${v}`;
  if (a === 0) return b < 0 ? `-${coef}` : coef;
  return `${nb(a)} ${b < 0 ? "-" : "+"} ${coef}`;
}

/**
 * QCM à 4 choix : trois pièges distincts tirés au hasard, puis mélange de
 * Fisher-Yates (le makeChoices de la 4e mélange par `sort(() => Math.random() - 0.5)`,
 * qui laissait la bonne réponse en 1re ou 4e place 2 fois sur 3).
 */
export function qcm4(text: string, bon: string, pieges: string[], ex: string, canvas?: CanvasFigure): Q {
  const p = [...new Set(pieges.filter((x) => x && x !== bon))];
  if (p.length < 3) throw new Error(`QCM à moins de 4 choix : ${text}`);
  const choices = melange([bon, ...melange(p).slice(0, 3)]);
  return { text, format: "qcm", choices, expected: [bon], comparator: "mcq_exact", explanation: ex, ...(canvas ? { canvas } : {}) };
}

export function courte(text: string, v: number, ex: string, canvas?: CanvasFigure): Q {
  return { text, format: "short", expected: [fr(v)], comparator: "number_equal", explanation: ex, ...(canvas ? { canvas } : {}) };
}

export const LETTRES = ["u", "v", "w", "t", "p", "s"] as const;
export const lettre = () => rc(LETTRES);

/** Une phrase de cadre devant les questions sans situation (vide une fois sur trois). */
const CADRES = [
  "",
  "",
  "",
  "",
  "Question d’automatisme.",
  "Au tableau, la professeure écrit ceci.",
  "Dans un tableur, on a programmé une suite.",
  "Une calculatrice affiche les termes d’une suite.",
  "Un programme en Python calcule les termes d’une suite.",
  "Révision avant l’épreuve anticipée.",
  "Exercice du jour.",
  "Dans un carnet de recherche, on lit ceci.",
  "Un élève vérifie son cours.",
];
export const cadre = () => {
  const c = rc(CADRES);
  return c ? `${c} ` : "";
};

/* ---------- Périodes et notation ---------- */

export type Per = { chaque: string; plur: string; premier: string; nieme: string; an: boolean };
export const AN: Per = { chaque: "Chaque année", plur: "années", premier: "la première année", nieme: "l’année numéro $n$", an: true };
export const MOIS: Per = { chaque: "Chaque mois", plur: "mois", premier: "le premier mois", nieme: "le mois numéro $n$", an: false };
export const SEMAINE: Per = { chaque: "Chaque semaine", plur: "semaines", premier: "la première semaine", nieme: "la semaine numéro $n$", an: false };
export const JOUR: Per = { chaque: "Chaque jour", plur: "jours", premier: "le premier jour", nieme: "le jour numéro $n$", an: false };
export const HEURE: Per = { chaque: "Chaque heure", plur: "heures", premier: "la première heure", nieme: "l’heure numéro $n$", an: false };
export const MINUTE: Per = { chaque: "Chaque minute", plur: "minutes", premier: "la première minute", nieme: "la minute numéro $n$", an: false };

const aLe = (g: string) => g.replace(/^le /, "au ").replace(/^la /, "à la ").replace(/^l’/, "à l’");

/** « en 2026 », « au départ » ou « la première semaine ». */
export function moment0(p: Per, i0: number, an0: number) {
  return p.an ? `en ${an0}` : i0 === 0 ? "au départ" : p.premier;
}

/** La phrase qui fixe la notation ET le rang de départ : « ($u_0$ correspond à 2026) ». */
export function noteSuite(L: string, nom: string, p: Per, i0: number, an0: number) {
  if (i0 === 0) return `On note $${L}_n$ ${nom} ${p.an ? `en ${an0} + $n$` : `après $n$ ${p.plur}`} ($${L}_0$ correspond ${p.an ? `à ${an0}` : "au départ"}).`;
  return `On note $${L}_n$ ${nom} ${p.nieme} ($${L}_1$ correspond ${p.an ? `à ${an0}` : aLe(p.premier)}).`;
}

/** « semaines » → « semaine », « périodes de 30 ans » → « période de 30 ans », « mois » reste « mois ». */
const singulier = (plur: string) => (plur === "mois" ? plur : plur.replace(/^(\S+)s(?= |$)/, "$1"));

/** Libellé du moment qui correspond au rang k. */
export function quandRang(p: Per, i0: number, an0: number, k: number) {
  if (p.an) return `en ${an0 + k - i0}`;
  if (i0 === 0) return k === 0 ? "au départ" : `après ${k} ${k === 1 ? singulier(p.plur) : p.plur}`;
  return p.nieme.replace("$n$", String(k));
}

export const annee0 = () => rc([2024, 2025, 2026, 2027]);

/* ---------- Situations à évolution constante (arithmétiques) ---------- */

export type SitA = { sujet: string; verbe: string; unite: string; nom: string; ce: string; p: Per; u0: [number, number, number]; r: number[]; cumul?: boolean };

export const SITA: SitA[] = [
  { sujet: "Une médiathèque", verbe: "possède", unite: "livres", nom: "le nombre de livres de la médiathèque", ce: "ce nombre", p: AN, u0: [800, 3000, 100], r: [120, 150, 200, 250] },
  { sujet: "Une newsletter scientifique", verbe: "compte", unite: "abonnés", nom: "le nombre d’abonnés", ce: "ce nombre", p: SEMAINE, u0: [200, 900, 50], r: [15, 20, 25, 40] },
  { sujet: "Léa", verbe: "a", unite: "€ sur son livret", nom: "la somme sur le livret de Léa", ce: "cette somme", p: MOIS, u0: [50, 400, 10], r: [20, 25, 30, 40, 50] },
  { sujet: "Une citerne de récupération d’eau de pluie", verbe: "contient", unite: "litres", nom: "le volume d’eau dans la citerne", ce: "ce volume", p: JOUR, u0: [600, 2000, 100], r: [-40, -50, -60, -80] },
  { sujet: "Un garde forestier compte qu’une forêt", verbe: "a", unite: "arbres", nom: "le nombre d’arbres de la forêt", ce: "ce nombre", p: AN, u0: [1000, 5000, 100], r: [100, 150, 200, -50, -100] },
  { sujet: "Un club de handball", verbe: "compte", unite: "adhérents", nom: "le nombre d’adhérents du club", ce: "ce nombre", p: AN, u0: [300, 900, 10], r: [-10, -15, -20, 12, 25] },
  { sujet: "Une coureuse", verbe: "parcourt", unite: "km par semaine", nom: "la distance parcourue par semaine", ce: "cette distance", p: SEMAINE, u0: [10, 30, 1], r: [2, 3, 1.5, 2.5] },
  { sujet: "Selon une glaciologue, un glacier", verbe: "mesure", unite: "m de long", nom: "la longueur du glacier", ce: "cette longueur", p: AN, u0: [4000, 9000, 100], r: [-20, -25, -30, -40] },
  { sujet: "Une ville", verbe: "propose", unite: "vélos en libre-service", nom: "le nombre de vélos proposés", ce: "ce nombre", p: MOIS, u0: [200, 800, 50], r: [15, 20, 30, 40] },
  { sujet: "Un plant de tomate", verbe: "mesure", unite: "cm", nom: "la hauteur du plant", ce: "sa hauteur", p: SEMAINE, u0: [8, 30, 1], r: [3, 4, 5, 2.5] },
  { sujet: "Une pharmacie", verbe: "a en stock", unite: "boîtes de pansements", nom: "le nombre de boîtes en stock", ce: "ce stock", p: JOUR, u0: [400, 1200, 50], r: [-12, -15, -20, -25] },
  { sujet: "Un podcast d’astronomie", verbe: "a", unite: "auditeurs", nom: "le nombre d’auditeurs du podcast", ce: "ce nombre", p: MOIS, u0: [500, 3000, 100], r: [80, 120, 150, 200] },
  { sujet: "Un appartement", verbe: "se loue", unite: "€ par mois", nom: "le loyer mensuel", ce: "ce loyer", p: AN, u0: [450, 900, 10], r: [10, 12, 15, 20] },
  { sujet: "Pendant une sécheresse, un lac", verbe: "a une profondeur de", unite: "cm", nom: "la profondeur du lac", ce: "cette profondeur", p: JOUR, u0: [300, 800, 10], r: [-2, -3, -4, -5] },
  { sujet: "Une commune", verbe: "compte", unite: "panneaux solaires sur ses toits", nom: "le nombre de panneaux solaires", ce: "ce nombre", p: AN, u0: [100, 600, 20], r: [30, 40, 50, 60] },
  { sujet: "Une playlist", verbe: "contient", unite: "morceaux", nom: "le nombre de morceaux de la playlist", ce: "ce nombre", p: SEMAINE, u0: [20, 120, 5], r: [5, 6, 8, 10] },
  { sujet: "Un lycée", verbe: "compte", unite: "élèves inscrits au club robotique", nom: "le nombre d’inscrits au club", ce: "ce nombre", p: AN, u0: [12, 40, 1], r: [3, 4, 5, -2] },
  { sujet: "Le compteur d’une voiture", verbe: "affiche", unite: "km", nom: "le kilométrage affiché", ce: "ce kilométrage", p: MOIS, u0: [12000, 60000, 1000], r: [800, 900, 1200, 1500], cumul: true },
  { sujet: "Un randonneur", verbe: "est à une altitude de", unite: "m", nom: "l’altitude du randonneur", ce: "son altitude", p: HEURE, u0: [600, 1500, 50], r: [250, 300, 350, -400] },
  { sujet: "Une plongeuse", verbe: "est à", unite: "m sous la surface", nom: "la profondeur de la plongeuse", ce: "cette profondeur", p: MINUTE, u0: [2, 10, 1], r: [3, 4, 5, 2] },
  { sujet: "Une lectrice", verbe: "a déjà lu", unite: "pages d’un roman", nom: "le nombre de pages lues", ce: "ce nombre", p: JOUR, u0: [20, 120, 5], r: [15, 20, 25, 30], cumul: true },
  { sujet: "Une salariée", verbe: "gagne", unite: "€ par mois", nom: "le salaire mensuel de la salariée", ce: "ce salaire", p: AN, u0: [1700, 2600, 50], r: [40, 50, 60, 75] },
  { sujet: "Une apicultrice", verbe: "possède", unite: "ruches", nom: "le nombre de ruches de l’apicultrice", ce: "ce nombre", p: AN, u0: [10, 60, 2], r: [3, 4, 5, 6] },
  { sujet: "Une constellation de satellites", verbe: "compte", unite: "satellites", nom: "le nombre de satellites en orbite", ce: "ce nombre", p: MOIS, u0: [200, 1500, 50], r: [40, 60, 80, 120] },
  { sujet: "Un compteur d’eau", verbe: "indique", unite: "m³", nom: "l’index du compteur", ce: "cet index", p: MOIS, u0: [100, 900, 10], r: [8, 10, 12, 15], cumul: true },
  { sujet: "À Saint-Leu, une association", verbe: "a recensé", unite: "tortues marines", nom: "le nombre de tortues recensées", ce: "ce nombre", p: AN, u0: [60, 200, 2], r: [6, 8, 10, 12] },
];

/** Départ et pas tirés ; les termes restent positifs jusqu'au rang kmax. */
export function tireA(s: SitA, kmax = 12) {
  const [a, b, st] = s.u0;
  for (let essai = 0; ; essai++) {
    const u0 = a + st * randomInt(0, Math.floor((b - a) / st));
    const r = rc(s.r);
    if (u0 + r * kmax > 0) return { u0, r };
    if (essai > 200) return { u0, r: Math.abs(r) };
  }
}

/** « ce nombre augmente de $150$ livres » : verbes fixes, que le correcteur relit. */
export function evoA(s: SitA, r: number) {
  const v = r > 0 ? rc(["augmente de", "progresse de", "s’accroît de"]) : rc(["diminue de", "baisse de", "recule de"]);
  return `${s.p.chaque}, ${s.ce} ${v} $${nb(Math.abs(r))}$ ${s.unite.replace(/ (sur|par|de|sous|au|inscrits|d’|sur ses).*$/, "")}.`;
}

/** Début de situation : départ + évolution. */
export function situA(s: SitA, u0: number, r: number, i0: number, an0: number) {
  return `${s.sujet} ${s.verbe} $${nb(u0)}$ ${s.unite} ${moment0(s.p, i0, an0)}. ${evoA(s, r)}`;
}

/* ---------- Motifs géométriques évolutifs (programme 2026) ---------- */

type Cell = [number, number];
export type Motif = { forme: string; regle: string; objet: "carreaux" | "allumettes"; f: (k: number) => number; lineaire: boolean; cells?: (k: number) => Cell[] };

export const plage = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

export const MOTIFS: Motif[] = [
  {
    forme: "en forme de croix",
    regle: "à chaque étape, chacune des quatre branches s’allonge d’un carreau",
    objet: "carreaux",
    f: (k) => 4 * k + 1,
    lineaire: true,
    cells: (k) => [...plage(0, 2 * k).map((j): Cell => [k, j]), ...plage(0, 2 * k).filter((i) => i !== k).map((i): Cell => [i, k])],
  },
  {
    forme: "en forme de T",
    regle: "à chaque étape, la barre s’allonge d’un carreau de chaque côté et le pied d’un carreau",
    objet: "carreaux",
    f: (k) => 3 * k + 1,
    lineaire: true,
    cells: (k) => [...plage(0, 2 * k).map((j): Cell => [0, j]), ...plage(1, k).map((i): Cell => [i, k])],
  },
  {
    forme: "en carré bordé",
    regle: "l’étape $n$ est la bordure d’un carré de $n + 2$ carreaux de côté (le centre reste vide)",
    objet: "carreaux",
    f: (k) => 4 * k + 4,
    lineaire: true,
    cells: (k) => plage(0, k + 1).flatMap((i) => plage(0, k + 1).filter((j) => i === 0 || j === 0 || i === k + 1 || j === k + 1).map((j): Cell => [i, j])),
  },
  {
    forme: "en forme de L",
    regle: "à chaque étape, chacune des deux branches s’allonge d’un carreau",
    objet: "carreaux",
    f: (k) => 2 * k + 1,
    lineaire: true,
    cells: (k) => [...plage(0, k).map((i): Cell => [i, 0]), ...plage(1, k).map((j): Cell => [k, j])],
  },
  {
    forme: "en double rangée",
    regle: "à chaque étape, les deux rangées s’allongent d’un carreau",
    objet: "carreaux",
    f: (k) => 2 * k + 2,
    lineaire: true,
    cells: (k) => plage(0, 1).flatMap((i) => plage(0, k).map((j): Cell => [i, j])),
  },
  {
    forme: "en escalier",
    regle: "à chaque étape, on ajoute en bas une marche plus longue d’un carreau",
    objet: "carreaux",
    f: (k) => (k * (k + 1)) / 2,
    lineaire: false,
    cells: (k) => plage(0, k - 1).flatMap((i) => plage(0, i).map((j): Cell => [i, j])),
  },
  {
    forme: "en carré plein",
    regle: "l’étape $n$ est un carré plein de $n$ carreaux de côté",
    objet: "carreaux",
    f: (k) => k * k,
    lineaire: false,
    cells: (k) => plage(0, k - 1).flatMap((i) => plage(0, k - 1).map((j): Cell => [i, j])),
  },
  { forme: "en rangée de carrés", regle: "l’étape $n$ est une rangée de $n$ carrés collés, faits d’allumettes", objet: "allumettes", f: (k) => 3 * k + 1, lineaire: true },
  { forme: "en rangée de triangles", regle: "l’étape $n$ est une rangée de $n$ triangles collés, faits d’allumettes", objet: "allumettes", f: (k) => 2 * k + 1, lineaire: true },
  { forme: "en rangée d’hexagones", regle: "l’étape $n$ est une rangée de $n$ hexagones collés, faits d’allumettes", objet: "allumettes", f: (k) => 5 * k + 1, lineaire: true },
  { forme: "en rangée de maisons", regle: "l’étape $n$ est une rangée de $n$ maisons collées (un carré et un toit), faites d’allumettes", objet: "allumettes", f: (k) => 5 * k + 1, lineaire: true },
];

/** Les étapes 1, 2 et 3 côte à côte, une colonne vide entre deux étapes. */
export function canvasMotif(m: Motif): CanvasFigure | undefined {
  if (!m.cells) return undefined;
  const blocs = [1, 2, 3].map((k) => m.cells!(k));
  const filled: Cell[] = [];
  let off = 0;
  let h = 0;
  for (const b of blocs) {
    for (const [r, c] of b) filled.push([r, c + off]);
    off += Math.max(...b.map((x) => x[1])) + 2;
    h = Math.max(h, ...b.map((x) => x[0] + 1));
  }
  return {
    kind: "figure_libre",
    size: { cellSize: 16, padding: 8 },
    grid: { rows: h, cols: off - 1, filledCells: filled },
    display: { showGrid: true, showFilled: true, showCellLabels: false, showPerimeter: false, showVertices: false, showVertexLabels: false },
    colors: { filled: "#93c5fd", grid: "#e2e8f0", border: "#1e3a8a" },
  } as CanvasFigure;
}

/** « de carreaux », « d’allumettes » (élision). */
const deObj = (m: Motif) => (m.objet === "allumettes" ? "d’allumettes" : "de carreaux");

/** Énoncé commun des motifs : la règle et les trois premières étapes chiffrées. */
export function enonceMotif(m: Motif) {
  const debut = m.cells
    ? `On construit un motif ${m.forme} : ${m.regle}. Ci-dessous, les étapes $1$, $2$ et $3$, de gauche à droite.`
    : `On construit un motif ${m.forme} : ${m.regle}.`;
  return `${debut} Étape $1$ : $${m.f(1)}$ ${m.objet} ; étape $2$ : $${m.f(2)}$ ${m.objet} ; étape $3$ : $${m.f(3)}$ ${m.objet}.`;
}

/* ---------- Listes, natures ---------- */

export const liste = (ts: number[]) => ts.map(nb).join(" \\; ; \\; ");
export const NAT_A = (r: number) => `arithmétique de raison $${nb(r)}$`;
export const NAT_G = (q: number) => `géométrique de raison $${nb(q)}$`;
export const NI = "ni arithmétique ni géométrique";
export const NATURES = ["arithmétique", "géométrique", NI, "à la fois arithmétique et géométrique"];

/** Trois sortes de listes : arithmétique, géométrique, ni l'un ni l'autre. */
export function listeNature(sorte: "A" | "G" | "N", nT: number) {
  if (sorte === "A") {
    const u0 = randomInt(1, 60);
    const r = rc([2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 15, -2, -3, -4, -5]);
    const v0 = r < 0 ? u0 - r * nT : u0;
    return { ts: plage(0, nT - 1).map((k) => v0 + r * k), raison: r };
  }
  if (sorte === "G") {
    const q = rc([2, 3, 0.5, 1.5]);
    const u0 = q === 0.5 ? rc([64, 96, 128, 160, 192]) : q === 1.5 ? rc([16, 32, 48, 64]) : q === 3 ? rc([1, 2, 4, 5]) : rc([1, 3, 5, 6, 7, 10]);
    return { ts: plage(0, nT - 1).map((k) => u0 * q ** k), raison: q };
  }
  const u0 = randomInt(1, 30);
  const a = randomInt(2, 9);
  const c = rc([1, 2, 3, -1]);
  const ts = [u0];
  for (let k = 1; k < nT; k++) ts.push(ts[k - 1] + a + c * (k - 1));
  return { ts, raison: NaN };
}

/** Situation tirée au hasard ; `sens` impose le signe du pas quand c'est plausible. */
export const ordinal = (k: number) => (k === 1 ? "1er" : `${k}e`);

export function sitAuHasard(kmax = 12) {
  const s = rc(SITA);
  const t = tireA(s, kmax);
  return { s, ...t };
}

/* =========================================================
   LIN_SUITE_RECONNAITRE
========================================================= */

const H_REC = "Arithmétique : on AJOUTE toujours le même nombre (la raison r).";

function aRaisonListe(d: number): Q {
  const L = lettre();
  const i0 = rc([0, 1]);
  const nT = d === 1 ? 4 : 5;
  let ts: number[];
  let r: number;
  let text: string;
  if (randomInt(1, 2) === 1) {
    const { s, u0, r: rr } = sitAuHasard(nT);
    r = rr;
    ts = plage(0, nT - 1).map((k) => u0 + r * k);
    text = rc([
      `${s.sujet} : on relève ${s.nom} ${s.p.chaque.toLowerCase()}. On obtient $${liste(ts)}$. Ces nombres forment une suite arithmétique, à partir de $${L}_${i0}$. Quelle est sa raison ?`,
      `On a noté ${s.nom}, ${s.p.chaque.toLowerCase()} : $${liste(ts)}$. On admet que c’est une suite arithmétique $(${L}_n)$, qui commence à $${L}_${i0}$. Quelle est sa raison ?`,
    ]);
  } else {
    const u0 = d === 1 ? randomInt(1, 40) : d === 2 ? randomInt(-20, 60) : randomInt(-60, 60) / 2;
    r = d === 1 ? rc([2, 3, 4, 5, 6, 7, 8, 9, 10, -2, -3, -4]) : d === 2 ? rc([0.5, 1.5, 2.5, -1.5, -7, 12, 15, -12, 25]) : rc([-2.5, 0.25, -0.75, 1.2, -1.4, 17, -13, 0.4]);
    const v0 = d === 1 && r < 0 ? u0 - r * nT : u0;
    ts = plage(0, nT - 1).map((k) => v0 + r * k);
    text = rc([
      `${cadre()}Les premiers termes d’une suite arithmétique $(${L}_n)$ sont, à partir de $${L}_${i0}$ : $${liste(ts)}$. Quelle est sa raison ?`,
      `${cadre()}Une suite arithmétique $(${L}_n)$ commence, à partir de $${L}_${i0}$, par $${liste(ts)}$. Donne sa raison $r$.`,
      `${cadre()}Voici, dans l’ordre et à partir de $${L}_${i0}$, des termes consécutifs d’une suite arithmétique : $${liste(ts)}$. Quelle est sa raison ?`,
    ]);
  }
  return courte(
    text,
    r,
    expl(
      "dans une suite arithmétique, on passe d’un terme au suivant en ajoutant toujours le même nombre : la raison $r$.",
      "on soustrait deux termes consécutifs : le suivant moins le précédent.",
      `$${nb(ts[1])} - ${ts[0] < 0 ? `(${nb(ts[0])})` : nb(ts[0])} = ${nb(r)}$, et de même pour les autres écarts.`,
      `la raison est $r = ${nb(r)}$${r < 0 ? " (négative : les termes diminuent)" : ""}.`
    )
  );
}

const EX_NATURE = (sorte: "A" | "G" | "N", ts: number[]) =>
  expl(
    "une suite est arithmétique si l’on AJOUTE toujours le même nombre, géométrique si l’on MULTIPLIE toujours par le même nombre.",
    "on calcule les écarts entre termes consécutifs ; s’ils ne sont pas constants, on calcule les quotients.",
    `écarts : $${liste(ts.slice(1).map((t, k) => t - ts[k]))}$ ; quotients : $${liste(ts.slice(1, 3).map((t, k) => Math.round((t / ts[k]) * 100) / 100))}$${sorte === "N" ? "" : "…"}.`,
    sorte === "A" ? "les écarts sont constants : la suite est arithmétique." : sorte === "G" ? "les quotients sont constants : la suite est géométrique." : "ni les écarts ni les quotients ne sont constants : la suite n’est ni arithmétique ni géométrique."
  );

function aNatureListe(d: number): Q {
  const L = lettre();
  const sorte = rc(["A", "A", "G", "N"] as const);
  const { ts, raison } = listeNature(sorte, d === 1 ? 4 : 5);
  const text = rc([
    `${cadre()}La suite $(${L}_n)$ commence par $${liste(ts)}$. Cette suite semble :`,
    `${cadre()}On donne les premiers termes d’une suite $(${L}_n)$ : $${liste(ts)}$. Elle est :`,
    `${cadre()}Les termes $${L}_0$ à $${L}_${ts.length - 1}$ d’une suite valent $${liste(ts)}$. Quelle est la nature de cette suite ?`,
  ]);
  if (d === 1) {
    const bon = sorte === "A" ? "arithmétique" : sorte === "G" ? "géométrique" : NI;
    return qcm4(text, bon, NATURES.filter((x) => x !== bon), EX_NATURE(sorte, ts));
  }
  const ecart = ts[1] - ts[0];
  const quot = Math.round((ts[1] / ts[0]) * 100) / 100;
  const bon = sorte === "A" ? NAT_A(raison) : sorte === "G" ? NAT_G(raison) : NI;
  const pieges = sorte === "A" ? [NAT_G(raison), NAT_A(-raison), NI, NAT_A(ts[0])] : sorte === "G" ? [NAT_A(ecart), NAT_A(raison), NI, NAT_G(ecart)] : [NAT_A(ecart), NAT_A(ts[2] - ts[1]), NAT_G(quot), NAT_G(2)];
  return qcm4(text, bon, pieges, EX_NATURE(sorte, ts));
}

/** Évolution décrite en mots : somme fixe, pourcentage fixe, ou ni l'un ni l'autre. */
function aNatureSituation(d: number): Q {
  const { s, u0, r } = sitAuHasard(4);
  const sorte = rc(["A", "A", "G", "N"] as const);
  const an0 = annee0();
  const t = rc([2, 3, 4, 5, 10, 20]);
  const q = r > 0 ? 1 + t / 100 : 1 - t / 100;
  const debut = `${s.sujet} ${s.verbe} $${nb(u0)}$ ${s.unite} ${moment0(s.p, 0, an0)}.`;
  const evo =
    sorte === "A"
      ? evoA(s, r)
      : sorte === "G"
        ? `${s.p.chaque}, ${s.ce} ${r > 0 ? rc(["augmente de", "progresse de"]) : rc(["diminue de", "baisse de"])} $${t}\\,\\%$.`
        : `${s.p.chaque}, ${s.ce} ${r > 0 ? "augmente" : "diminue"}, mais pas de la même quantité : de $${nb(Math.abs(r))}$, puis de $${nb(Math.abs(r) + 1)}$, puis de $${nb(Math.abs(r) + 3)}$.`;
  const text = `${debut} ${evo} ${rc([`La suite des valeurs successives est :`, `On note $u_n$ ${s.nom} après $n$ ${s.p.plur}. La suite $(u_n)$ est :`, `Quelle suite modélise cette situation ?`])}`;
  const ex = expl(
    "une SOMME fixe ajoutée (ou retirée) à chaque étape donne une suite arithmétique ; un POURCENTAGE fixe donne une suite géométrique.",
    "on lit l’énoncé : une quantité en unités, ou un taux en %, ou des variations qui changent ?",
    sorte === "A" ? `on ajoute $${nb(r)}$ à chaque étape.` : sorte === "G" ? `on multiplie à chaque étape par $1 ${r > 0 ? "+" : "-"} \\dfrac{${t}}{100} = ${nb(q)}$.` : "les variations ne sont pas constantes, et ce ne sont pas des pourcentages fixes.",
    sorte === "A" ? `la suite est ${NAT_A(r)}.` : sorte === "G" ? `la suite est ${NAT_G(q)}.` : `la suite n’est ${NI}.`
  );
  if (d === 1) {
    const bon = sorte === "A" ? "arithmétique" : sorte === "G" ? "géométrique" : NI;
    return qcm4(text, bon, NATURES.filter((x) => x !== bon), ex);
  }
  const bon = sorte === "A" ? NAT_A(r) : sorte === "G" ? NAT_G(q) : NI;
  const pieges = sorte === "A" ? [NAT_G(r), NAT_A(-r), NAT_G(1 + r / 100), NI] : sorte === "G" ? [NAT_A(r > 0 ? t : -t), NAT_G(r > 0 ? t / 100 : -t / 100), NAT_A(q), NI] : [NAT_A(r), NAT_A(r + (r > 0 ? 1 : -1)), NAT_G(1 + r / 100), NAT_G(2)];
  return qcm4(text, bon, pieges, ex);
}

/** Motifs : combien ajoute-t-on d'une étape à la suivante ? */
function aMotifRaison(_d: number): Q {
  const m = rc(MOTIFS.filter((x) => x.lineaire));
  const L = lettre();
  return courte(
    `${enonceMotif(m)} ${rc([
      `On note $${L}_n$ le nombre ${deObj(m)} de l’étape $n$ ($${L}_1$ correspond à l’étape $1$) : c’est une suite arithmétique. Quelle est sa raison ?`,
      `D’une étape à la suivante, combien ${deObj(m)} ajoute-t-on ?`,
      `La suite des nombres ${deObj(m)} est arithmétique, à partir de l’étape $1$. Quelle est sa raison ?`,
    ])}`,
    m.f(2) - m.f(1),
    expl("la raison d’une suite arithmétique est ce que l’on ajoute à chaque étape.", "on soustrait deux étapes consécutives.", `$${m.f(2)} - ${m.f(1)} = ${m.f(2) - m.f(1)}$ et $${m.f(3)} - ${m.f(2)} = ${m.f(3) - m.f(2)}$.`, `on ajoute $${m.f(2) - m.f(1)}$ ${m.objet} à chaque étape : la raison vaut $${m.f(2) - m.f(1)}$.`),
    canvasMotif(m)
  );
}

function aMotifNature(_d: number): Q {
  const lin = randomInt(1, 3) > 1;
  const m = rc(MOTIFS.filter((x) => x.lineaire === lin));
  const [a, b, c] = [m.f(1), m.f(2), m.f(3)];
  const bon = lin ? NAT_A(b - a) : NI;
  const pieges = lin ? [NAT_A(a), NAT_G(2), NAT_A(b - a + 1), NI, NAT_A(c)] : [NAT_A(b - a), NAT_A(c - b), NAT_G(b / a), NAT_G(2)];
  return qcm4(
    `${enonceMotif(m)} ${rc([`La suite des nombres ${deObj(m)}, étape après étape, est :`, `On note $u_n$ le nombre ${deObj(m)} de l’étape $n$, pour $n \\ge 1$. La suite $(u_n)$ est :`, `Quelle est la nature de la suite des nombres ${deObj(m)} ?`])}`,
    bon,
    pieges,
    expl("arithmétique = on ajoute toujours le même nombre.", "on compare les écarts entre étapes consécutives.", `écarts : $${b - a}$, puis $${c - b}$.`, lin ? `les écarts sont constants : la suite est ${NAT_A(b - a)}.` : `les écarts changent, et les quotients aussi : la suite n’est ${NI}.`),
    canvasMotif(m)
  );
}

/** Définition par une formule ou une récurrence : quelle nature ? */
function aFormeNature(_d: number): Q {
  const L = lettre();
  let a = randomInt(2, 15);
  const b = rc([2, 3, 4, 5, 6, 7, -2, -3, -4, -5]);
  const c = rc([2, 3, 4]);
  const t = randomInt(1, 7);
  if (a === c || a === Math.abs(b)) a += 5;
  if (t === 5 && a * (c - 1) + b === 0) a += 1;
  let def = "";
  let bon = "";
  let pieges: string[] = [];
  if (t === 1) { def = `$${L}_n = ${aff(a, b)}$ pour tout entier naturel $n$`; bon = NAT_A(b); pieges = [NAT_A(a), NAT_G(b), NI, NAT_A(-b), NAT_G(a)]; }
  else if (t === 2) { def = `$${L}_0 = ${a}$ et $${L}_{n+1} = ${L}_n ${sg(b)}$ pour tout entier naturel $n$`; bon = NAT_A(b); pieges = [NAT_A(a), NAT_G(b), NI, NAT_A(-b), NAT_G(a)]; }
  else if (t === 3) { def = `$${L}_n = ${a} \\times ${c}^n$ pour tout entier naturel $n$`; bon = NAT_G(c); pieges = [NAT_A(c), NAT_G(a), NI, NAT_A(a)]; }
  else if (t === 4) { def = `$${L}_0 = ${a}$ et $${L}_{n+1} = ${c}${L}_n$ pour tout entier naturel $n$`; bon = NAT_G(c); pieges = [NAT_A(c), NAT_A(a), NI, NAT_G(a)]; }
  else if (t === 5) { def = `$${L}_0 = ${a}$ et $${L}_{n+1} = ${c}${L}_n ${sg(b)}$ pour tout entier naturel $n$`; bon = NI; pieges = [NAT_A(b), NAT_G(c), NAT_A(c), NAT_G(a)]; }
  else if (t === 6) { def = `$${L}_n = n^2 ${sg(a)}$ pour tout entier naturel $n$`; bon = NI; pieges = [NAT_A(a), NAT_A(2), NAT_G(2), NAT_A(1)]; }
  else { def = `$${L}_0 = ${a}$ et $${L}_{n+1} = ${L}_n + n$ pour tout entier naturel $n$`; bon = NI; pieges = [NAT_A(1), NAT_A(a), NAT_G(2), NAT_G(a)]; }
  return qcm4(
    `${cadre()}${rc(["On définit la suite par", "Une suite est définie par", "On considère la suite telle que"])} ${def}. ${rc(["Cette suite est :", "Quelle est sa nature ?", "Que peut-on dire de cette suite ?"])}`,
    bon,
    pieges,
    expl(
      "arithmétique : $u_{n+1} = u_n + r$, ou $u_n = u_0 + rn$ ; géométrique : $u_{n+1} = q \\times u_n$, ou $u_n = u_0 \\times q^n$.",
      "on reconnaît l’une de ces formes, ou on calcule les premiers termes.",
      t <= 2 ? `on ajoute toujours $${nb(b)}$.` : t <= 4 ? `on multiplie toujours par $${c}$.` : "les écarts entre termes consécutifs ne sont pas constants, les quotients non plus.",
      bon === NI ? `la suite n’est ${NI}.` : `la suite est ${bon}.`
    )
  );
}

/** Deux termes non consécutifs : la raison. */
function aRaisonDeuxTermes(d: number): Q {
  const L = lettre();
  const r = d === 2 ? rc([2, 3, 4, 5, 6, -2, -3, -4]) : rc([1.5, 2.5, -1.5, 7, -6, 12, 0.5]);
  const i = randomInt(0, 3); // j ≤ 9 : un indice à un chiffre s’écrit sans accolades
  const j = i + randomInt(2, 6);
  const ui = randomInt(-10, 40);
  const uj = ui + r * (j - i);
  const text = rc([
    `${cadre()}La suite $(${L}_n)$ est arithmétique, avec $${L}_${i} = ${nb(ui)}$ et $${L}_${j} = ${nb(uj)}$. Quelle est sa raison ?`,
    `${cadre()}Pour une suite arithmétique $(${L}_n)$, on sait que $${L}_${i} = ${nb(ui)}$ et que $${L}_${j} = ${nb(uj)}$. Calcule sa raison $r$.`,
    `${cadre()}On connaît deux termes d’une suite arithmétique : $${L}_${i} = ${nb(ui)}$ et $${L}_${j} = ${nb(uj)}$. Que vaut la raison ?`,
  ]);
  return courte(
    text,
    r,
    expl(`entre le rang $${i}$ et le rang $${j}$, on ajoute la raison $${j} - ${i} = ${j - i}$ fois.`, `$r = \\dfrac{${L}_${j} - ${L}_${i}}{${j} - ${i}}$ : on divise l’écart par le nombre de pas, pas par $${j}$.`, `$\\dfrac{${nb(uj)} - ${ui < 0 ? `(${nb(ui)})` : nb(ui)}}{${j - i}} = \\dfrac{${nb(uj - ui)}}{${j - i}} = ${nb(r)}$.`, `la raison vaut $${nb(r)}$.`)
  );
}

/* =========================================================
   LIN_SUITE_RECURRENCE
========================================================= */

const EX_REL = (L: string, r: number) =>
  expl(
    `la relation de récurrence donne le terme SUIVANT $${L}_{n+1}$ à partir du terme actuel $${L}_n$.`,
    `${r > 0 ? "augmenter" : "diminuer"} d’une quantité fixe, c’est ${r > 0 ? "ajouter" : "retirer"} cette quantité à chaque étape.`,
    `$${L}_{n+1} = ${L}_n ${sg(r)}$.`,
    `la suite est arithmétique de raison $${nb(r)}$.`
  );

function piegesRel(L: string, r: number, autre: number) {
  const R = `${L}_{n+1}`;
  const N = `${L}_n`;
  return [`$${R} = ${N} ${sg(-r)}$`, `$${R} = ${nb(Math.abs(r))}${N}$`, `$${N} = ${R} ${sg(r)}$`, `$${R} = ${N} ${sg(autre)}$`];
}

function aRelationSituation(d: number): Q {
  const { s, u0, r } = sitAuHasard(6);
  const L = lettre();
  const an0 = annee0();
  const i0 = d === 1 ? 0 : rc([0, 1]);
  const text = `${situA(s, u0, r, i0, an0)} ${noteSuite(L, s.nom, s.p, i0, an0)} ${rc(["Quelle relation de récurrence vérifie la suite ?", `Pour tout entier $n \\ge ${i0}$, on a :`, "Quelle égalité traduit cette évolution ?"])}`;
  return qcm4(text, `$${L}_{n+1} = ${L}_n ${sg(r)}$`, piegesRel(L, r, u0), EX_REL(L, r));
}

function aRelationListe(_d: number): Q {
  const L = lettre();
  const { ts, raison: r } = listeNature("A", 5);
  const text = rc([
    `${cadre()}Une suite arithmétique $(${L}_n)$ commence, à partir de $${L}_0$, par $${liste(ts)}$. Quelle relation vérifie-t-elle pour tout entier naturel $n$ ?`,
    `${cadre()}On lit les termes $${L}_0$ à $${L}_4$ d’une suite arithmétique : $${liste(ts)}$. Quelle est sa relation de récurrence ?`,
    `${cadre()}La suite $(${L}_n)$, dont les premiers termes sont $${liste(ts)}$ (à partir de $${L}_0$), est arithmétique. On a, pour tout entier naturel $n$ :`,
  ]);
  return qcm4(text, `$${L}_{n+1} = ${L}_n ${sg(r)}$`, piegesRel(L, r, ts[0]), EX_REL(L, r));
}

/** Données pour les questions « on déroule la récurrence ». */
function donneesRec(d: number) {
  const r = d === 1 ? rc([2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20, -2, -3, -5]) : d === 2 ? rc([4, 6, 8, 15, 25, -4, -6, -12, 1.5, -2.5]) : rc([1.5, -2.5, 0.5, -0.75, 12, -7, 3.5]);
  const x = d === 1 ? randomInt(10, 90) : randomInt(-30, 120) + (d === 3 ? rc([0, 0.5]) : 0);
  return { r, x };
}
const relEcrite = (L: string, r: number) => rc([`$${L}_{n+1} = ${L}_n ${sg(r)}$`, `$${L}_{n+1} = ${L}_n ${sg(r)}$`, `$${L}_{n+1} - ${L}_n = ${nb(r)}$`]);

function aSuivant(d: number): Q {
  const L = lettre();
  const { r, x } = donneesRec(d);
  const k = randomInt(1, 8);
  const text = rc([
    `${cadre()}La suite $(${L}_n)$ vérifie ${relEcrite(L, r)} pour tout entier naturel $n$. On sait que $${L}_${k} = ${nb(x)}$. Combien vaut $${L}_{${k + 1}}$ ?`,
    `${cadre()}Pour tout entier naturel $n$, ${relEcrite(L, r)}. Sachant que $${L}_${k} = ${nb(x)}$, calcule $${L}_{${k + 1}}$.`,
    `${cadre()}On a $${L}_${k} = ${nb(x)}$ et, pour tout entier naturel $n$, ${relEcrite(L, r)}. Que vaut le terme suivant, $${L}_{${k + 1}}$ ?`,
  ]);
  return courte(text, x + r, expl("la relation donne le terme suivant à partir du terme actuel.", `on remplace $n$ par $${k}$ : $${L}_{${k + 1}} = ${L}_${k} ${sg(r)}$.`, `$${L}_{${k + 1}} = ${nb(x)} ${sg(r)} = ${nb(x + r)}$.`, `$${L}_{${k + 1}} = ${nb(x + r)}$.`));
}

function aDerouler(d: number): Q {
  const L = lettre();
  const { r, x } = donneesRec(d);
  const i0 = rc([0, 1]);
  const pas = d === 1 ? 2 : rc([3, 4]);
  const k = i0 + pas;
  const vals = plage(0, pas).map((j) => x + r * j);
  const text = rc([
    `${cadre()}La suite $(${L}_n)$ est définie par $${L}_${i0} = ${nb(x)}$ et ${relEcrite(L, r)} pour tout entier $n \\ge ${i0}$. Combien vaut $${L}_{${k}}$ ?`,
    `${cadre()}On pose $${L}_${i0} = ${nb(x)}$ et, pour tout entier $n \\ge ${i0}$, ${relEcrite(L, r)}. Calcule $${L}_{${k}}$ pas à pas.`,
    `${cadre()}Une suite commence à $${L}_${i0} = ${nb(x)}$ et vérifie ${relEcrite(L, r)} pour $n \\ge ${i0}$. Que vaut $${L}_{${k}}$ ?`,
  ]);
  return courte(text, x + r * pas, expl("une relation de récurrence se déroule pas à pas depuis le premier terme.", `on calcule les termes un par un, de $${L}_${i0}$ jusqu’à $${L}_{${k}}$ : ${pas} pas.`, `$${liste(vals)}$.`, `$${L}_{${k}} = ${nb(x + r * pas)}$.`));
}

function aPrecedent(d: number): Q {
  const L = lettre();
  const { r, x } = donneesRec(d);
  const k = randomInt(4, 9);
  const recul = d === 2 ? 1 : rc([1, 2, 3]);
  const text = rc([
    `${cadre()}La suite $(${L}_n)$ vérifie ${relEcrite(L, r)} pour tout entier naturel $n$, et $${L}_${k} = ${nb(x)}$. Combien vaut $${L}_{${k - recul}}$ ?`,
    `${cadre()}On sait que $${L}_${k} = ${nb(x)}$ et que, pour tout entier naturel $n$, ${relEcrite(L, r)}. Retrouve $${L}_{${k - recul}}$.`,
    `${cadre()}Attention, on remonte le temps : pour tout entier naturel $n$, ${relEcrite(L, r)}, et $${L}_${k} = ${nb(x)}$. Que vaut $${L}_{${k - recul}}$ ?`,
  ]);
  return courte(text, x - r * recul, expl("pour revenir au terme PRÉCÉDENT, on fait l’opération inverse.", `chaque pas en arrière, on ${r > 0 ? "retire" : "ajoute"} $${nb(Math.abs(r))}$ ; il y a ${recul} pas.`, `$${L}_{${k - recul}} = ${nb(x)} ${sg(-r * recul)} = ${nb(x - r * recul)}$.`, `$${L}_{${k - recul}} = ${nb(x - r * recul)}$.`));
}

function aRecContexte(d: number): Q {
  const { s, u0, r } = sitAuHasard(5);
  const L = lettre();
  const an0 = annee0();
  const i0 = rc([0, 1]);
  const pas = d === 2 ? rc([2, 3]) : rc([3, 4, 5]);
  const k = i0 + pas;
  const text = `${situA(s, u0, r, i0, an0)} ${noteSuite(L, s.nom, s.p, i0, an0)} ${rc([`Calcule $${L}_{${k}}$, c’est-à-dire ${s.nom} ${quandRang(s.p, i0, an0, k)}.`, `Que vaut $${L}_{${k}}$ ?`, `En utilisant $${L}_{n+1} = ${L}_n ${sg(r)}$, calcule $${L}_{${k}}$.`])}`;
  return courte(text, u0 + r * pas, expl(`$${L}_{n+1} = ${L}_n ${sg(r)}$ et $${L}_${i0} = ${nb(u0)}$.`, `on avance de ${pas} pas depuis $${L}_${i0}$.`, `$${liste(plage(0, pas).map((j) => u0 + r * j))}$.`, `$${L}_{${k}} = ${nb(u0 + r * pas)}$ : c’est ${s.nom} ${quandRang(s.p, i0, an0, k)}.`));
}

/* =========================================================
   LIN_SUITE_NOTATION
========================================================= */

const EX_NOTA = expl(
  "une suite associe à chaque entier $n$ un nombre, noté $u(n)$ (notation fonctionnelle) ou $u_n$ (notation indicielle).",
  "ce qui est entre parenthèses passe en indice, tel quel.",
  "$u(5) = u_5$, $u(n+1) = u_{n+1}$, alors que $u(n) + 1 = u_n + 1$ (on ajoute $1$ au terme).",
  "l’indice est un RANG, pas un facteur."
);

function aNotaEcrire(d: number): Q {
  const L = lettre();
  const k = randomInt(2, 15);
  const t = d === 1 ? randomInt(1, 3) : randomInt(2, 5);
  const ouv = rc(["Comment s’écrit", "Quelle est l’écriture de", "Comment note-t-on"]);
  if (t === 1) return qcm4(`${cadre()}${ouv} $${L}(${k})$ en notation indicielle ?`, `$${L}_{${k}}$`, [`$${L} \\times ${k}$`, `$${k}${L}$`, `$${L}_{${k + 1}}$`, `$${L}_{${k - 1}}$`], EX_NOTA);
  if (t === 2) return qcm4(`${cadre()}${ouv} $${L}_{${k}}$ en notation fonctionnelle ?`, `$${L}(${k})$`, [`$${L}(${k + 1})$`, `$${L} \\times ${k}$`, `$${L}(n) + ${k}$`, `$${L}(${k - 1})$`], EX_NOTA);
  if (t === 3) return qcm4(`${cadre()}${ouv} $${L}(n+1)$ en notation indicielle ?`, `$${L}_{n+1}$`, [`$${L}_n + 1$`, `$${L}_{n-1}$`, `$(n+1)${L}$`, `$${L}_n \\times (n+1)$`], EX_NOTA);
  if (t === 4) return qcm4(`${cadre()}${ouv} $${L}(n) + ${k}$ en notation indicielle ?`, `$${L}_n + ${k}$`, [`$${L}_{n+${k}}$`, `$${L}_{n+${k}} + ${k}$`, `$(n+${k})${L}$`], EX_NOTA);
  return qcm4(`${cadre()}${ouv} $${L}(${k}n)$ en notation indicielle ?`, `$${L}_{${k}n}$`, [`$${k}${L}_n$`, `$${L}_{n+${k}}$`, `$${L}_n^${k}$`.replace(/\^(\d+)\$/, "^{$1}$")], EX_NOTA);
}

/** « On note u(n) … » : quel indice pour une année ou une semaine donnée ? */
function aNotaAnnee(_d: number): Q {
  const { s, u0, r } = sitAuHasard(10);
  const L = lettre();
  const an0 = annee0();
  const i0 = rc([0, 0, 1]);
  const k = i0 + randomInt(2, 9);
  const note = noteSuite(L, s.nom, s.p, i0, an0).replace(`$${L}_n$`, `$${L}(n)$`).replace(`$${L}_${i0}$`, `$${L}(${i0})$`);
  const text = `${situA(s, u0, r, i0, an0)} ${note} ${rc(["Comment s’écrit, en notation indicielle,", "Quel terme de la suite donne", "En notation indicielle, quel terme représente"])} ${s.nom} ${quandRang(s.p, i0, an0, k)} ?`;
  return qcm4(
    text,
    `$${L}_{${k}}$`,
    [`$${L}_{${k + 1}}$`, `$${L}_{${k - 1}}$`, s.p.an ? `$${L}_{${an0 + k - i0}}$` : `$${k}${L}$`, `$${L}(n) \\times ${k}$`],
    expl("l’indice est le RANG du terme, pas l’année ni la date.", `on part de $${L}(${i0})$, qui correspond ${moment0(s.p, i0, an0)}, et on compte les rangs.`, `${quandRang(s.p, i0, an0, k)} correspond au rang $${k}$.`, `c’est $${L}(${k}) = ${L}_{${k}}$.`)
  );
}

function aNotaCalcul(_d: number): Q {
  const L = lettre();
  const a = randomInt(-10, 30);
  const b = rc([2, 3, 4, 5, 6, 7, 8, 9, -2, -3, -4, 1.5, 0.5]);
  const k = randomInt(2, 12);
  const def = rc([`$${L}(n) = ${aff(a, b)}$`, `$${L}_n = ${aff(a, b)}$`]);
  const text = rc([
    `${cadre()}Une suite est définie pour tout entier naturel $n$ par ${def}. Calcule $${L}_{${k}}$.`,
    `${cadre()}On définit, pour tout entier naturel $n$, ${def}. Que vaut $${L}_{${k}}$ ?`,
    `${cadre()}Soit la suite définie par ${def} pour $n \\ge 0$. Donne la valeur de $${L}_{${k}}$.`,
  ]);
  return courte(text, a + b * k, expl("$u(n)$ et $u_n$ désignent le même terme.", `on remplace $n$ par $${k}$.`, `$${L}_{${k}} = ${a === 0 ? "" : `${nb(a)} ${b < 0 ? "-" : "+"} `}${nb(Math.abs(b))} \\times ${k} = ${nb(a + b * k)}$.`, `$${L}_{${k}} = ${nb(a + b * k)}$.`));
}

function aNotaSuivant(_d: number): Q {
  const L = lettre();
  const b = randomInt(2, 9);
  let a = randomInt(1, 20);
  if (a === b + 1 || a === b - 1) a += 3;
  const def = rc([`$${L}(n) = ${aff(a, b)}$`, `$${L}_n = ${aff(a, b)}$`]);
  return qcm4(
    `${cadre()}${rc(["Pour tout entier naturel $n$, on pose", "Une suite est définie, pour tout entier naturel $n$, par", "On considère la suite définie par"])} ${def}. ${rc([`Quelle est l’expression de $${L}_{n+1}$ ?`, `Que vaut $${L}(n+1)$ ?`, `On a $${L}_{n+1} =$`])}`,
    `$${aff(a + b, b)}$`,
    [`$${aff(a + 1, b)}$`, `$${aff(b, b)}$`, `$${aff(a, b + 1)}$`],
    expl(`$${L}_{n+1}$ est le terme de rang $n + 1$ : on remplace $n$ par $n + 1$, ce n’est pas $${L}_n + 1$.`, "on remplace, puis on développe.", `$${L}_{n+1} = ${nb(a)} + ${b}(n + 1) = ${aff(a + b, b)}$.`, `$${L}_{n+1} = ${aff(a + b, b)}$.`)
  );
}

function aRang(_d: number): Q {
  const L = lettre();
  const i0 = rc([0, 1]);
  const k = randomInt(3, 25);
  const t = randomInt(1, 3);
  const debut = `${cadre()}Les termes d’une suite $(${L}_n)$ sont numérotés à partir de $${L}_${i0}$.`;
  if (t === 1) return courte(`${debut} Quel est l’indice du ${ordinal(k)} terme ?`, k - 1 + i0, expl(`le premier terme est $${L}_${i0}$.`, "on décale le numéro de position du rang de départ.", `le ${ordinal(k)} terme est $${L}_{${k - 1 + i0}}$.`, `son indice est $${k - 1 + i0}$.`));
  if (t === 2) return courte(`${debut} Combien y a-t-il de termes de $${L}_${i0}$ à $${L}_{${k}}$, les deux compris ?`, k - i0 + 1, expl("de $u_a$ à $u_b$ compris, il y a $b - a + 1$ termes.", "on n’oublie pas de compter le premier.", `$${k} - ${i0} + 1 = ${k - i0 + 1}$.`, `il y a $${k - i0 + 1}$ termes.`));
  return courte(`${debut} À quelle position (premier, deuxième…) se trouve $${L}_{${k}}$ ? Donne le numéro de cette position.`, k - i0 + 1, expl(`$${L}_${i0}$ est le premier terme.`, `on compte depuis $${L}_${i0}$.`, `$${L}_{${k}}$ est à la position $${k} - ${i0} + 1 = ${k - i0 + 1}$.`, `c’est le ${ordinal(k - i0 + 1)} terme.`));
}

/** Tableau de valeurs u(n) : lire un terme, ou prolonger (arithmétique). */
function aNotaTableau(d: number): Q {
  const L = lettre();
  const i0 = rc([0, 1]);
  const { ts, raison: r } = listeNature("A", 5);
  const xs = plage(i0, i0 + 4);
  const canvas = { kind: "fonction_tableau", xValues: xs, yValues: ts, etiquettes: { x: "n", y: `${L}(n)` } } as CanvasFigure;
  if (d === 2) {
    const j = randomInt(1, 4);
    return courte(
      `${cadre()}Le tableau donne les premières valeurs de $${L}(n)$, à partir de $n = ${i0}$. ${rc([`Que vaut $${L}_{${xs[j]}}$ ?`, `Lis la valeur de $${L}_{${xs[j]}}$.`, `Quel nombre est $${L}_{${xs[j]}}$ ?`])}`,
      ts[j],
      expl("$u_n$ et $u(n)$ désignent le même nombre.", `on lit la colonne $n = ${xs[j]}$.`, `$${L}(${xs[j]}) = ${nb(ts[j])}$.`, `$${L}_{${xs[j]}} = ${nb(ts[j])}$.`),
      canvas
    );
  }
  const m = i0 + randomInt(6, 12);
  return courte(
    `${cadre()}Le tableau donne les premières valeurs d’une suite arithmétique $${L}(n)$, à partir de $n = ${i0}$. ${rc([`Que vaut $${L}_{${m}}$ ?`, `Calcule $${L}_{${m}}$.`, `Prolonge : combien vaut $${L}_{${m}}$ ?`])}`,
    ts[0] + r * (m - i0),
    expl("dans une suite arithmétique, on ajoute toujours la raison.", `raison : $${nb(ts[1])} - ${nb(ts[0])} = ${nb(r)}$ ; de $${L}_${i0}$ à $${L}_{${m}}$ il y a $${m - i0}$ pas.`, `$${L}_{${m}} = ${nb(ts[0])} ${sg(r)} \\times ${m - i0} = ${nb(ts[0] + r * (m - i0))}$.`,`$${L}_{${m}} = ${nb(ts[0] + r * (m - i0))}$.`),
    canvas
  );
}

/* =========================================================
   LIN_SUITE_TERME_RANG
========================================================= */

const par = (x: number) => (x < 0 ? `(${nb(x)})` : nb(x));

function donneesTerme(d: number) {
  const u = d === 1 ? randomInt(1, 60) : d === 2 ? randomInt(-20, 300) : randomInt(-100, 500) / 2;
  const r = d === 1 ? rc([2, 3, 4, 5, 6, 10, 20, 25]) : d === 2 ? rc([3, 7, 12, 15, 40, -3, -5, -8, 1.5]) : rc([0.5, 2.5, -1.5, -0.25, 13, -11, 0.75]);
  const k = d === 1 ? randomInt(3, 10) : d === 2 ? randomInt(10, 40) : randomInt(20, 100);
  return { u, r, k };
}

function aTerme0(d: number): Q {
  const L = lettre();
  const { u, r, k } = donneesTerme(d);
  const text = rc([
    `${cadre()}La suite arithmétique $(${L}_n)$ a pour premier terme $${L}_0 = ${nb(u)}$ et pour raison $r = ${nb(r)}$. Combien vaut $${L}_{${k}}$ ?`,
    `${cadre()}On considère la suite arithmétique de premier terme $${L}_0 = ${nb(u)}$ et de raison $r = ${nb(r)}$. Calcule $${L}_{${k}}$.`,
    `${cadre()}Une suite arithmétique $(${L}_n)$, définie pour $n \\ge 0$, vérifie $${L}_0 = ${nb(u)}$, avec la raison $r = ${nb(r)}$. Que vaut $${L}_{${k}}$ ?`,
  ]);
  return courte(text, u + r * k, expl("pour une suite arithmétique qui commence au rang $0$ : $u_n = u_0 + n \\times r$.", `de $${L}_0$ à $${L}_{${k}}$, on ajoute la raison $${k}$ fois.`, `$${L}_{${k}} = ${nb(u)} + ${k} \\times ${par(r)} = ${nb(u + r * k)}$.`, `$${L}_{${k}} = ${nb(u + r * k)}$.`));
}

function aTerme1(d: number): Q {
  const L = lettre();
  const { u, r, k } = donneesTerme(d);
  const text = rc([
    `${cadre()}La suite arithmétique $(${L}_n)$, définie pour $n \\ge 1$, a pour premier terme $${L}_1 = ${nb(u)}$ et pour raison $r = ${nb(r)}$. Combien vaut $${L}_{${k}}$ ?`,
    `${cadre()}Attention au rang de départ : une suite arithmétique de raison $r = ${nb(r)}$ commence à $${L}_1 = ${nb(u)}$. Calcule $${L}_{${k}}$.`,
    `${cadre()}On numérote les termes à partir de $1$ : $${L}_1 = ${nb(u)}$, et la raison est $r = ${nb(r)}$. Que vaut $${L}_{${k}}$ ?`,
  ]);
  return courte(text, u + r * (k - 1), expl("quand la suite commence au rang $1$ : $u_n = u_1 + (n - 1) \\times r$.", `de $${L}_1$ à $${L}_{${k}}$, il y a $${k} - 1 = ${k - 1}$ pas, et non $${k}$.`, `$${L}_{${k}} = ${nb(u)} + ${k - 1} \\times ${par(r)} = ${nb(u + r * (k - 1))}$.`, `$${L}_{${k}} = ${nb(u + r * (k - 1))}$.`));
}

function aTermeAutre(d: number): Q {
  const L = lettre();
  const { u, r } = donneesTerme(d);
  const i = randomInt(2, 9);
  const k = rc([i + randomInt(3, 15), Math.max(0, i - randomInt(2, i))]);
  const text = rc([
    `${cadre()}La suite $(${L}_n)$ est arithmétique de raison $r = ${nb(r)}$, et $${L}_${i} = ${nb(u)}$. Combien vaut $${L}_{${k}}$ ?`,
    `${cadre()}Pour une suite arithmétique de raison $r = ${nb(r)}$, on connaît $${L}_${i} = ${nb(u)}$. Calcule $${L}_{${k}}$.`,
    `${cadre()}On ne connaît pas le premier terme, seulement $${L}_${i} = ${nb(u)}$ et la raison $r = ${nb(r)}$ de cette suite arithmétique. Que vaut $${L}_{${k}}$ ?`,
  ]);
  const v = u + r * (k - i);
  return courte(text, v, expl("$u_k = u_i + (k - i) \\times r$ : on compte les pas entre les deux rangs.", `de $${L}_${i}$ à $${L}_{${k}}$ : $${k} - ${i} = ${k - i}$ pas.`, `$${L}_{${k}} = ${nb(u)} + ${par(k - i)} \\times ${par(r)} = ${nb(v)}$.`, `$${L}_{${k}} = ${nb(v)}$.`));
}

/** Quel calcul donne le terme ? (valeurs différentes garanties) */
function aTermeCalcul(d: number): Q {
  const L = lettre();
  const { u, r, k } = donneesTerme(Math.min(d, 2));
  const i0 = rc([0, 1]);
  const pas = k - i0;
  const cands: Array<[string, number]> = [
    [`$${nb(u)} + ${pas} \\times ${par(r)}$`, u + pas * r],
    [`$${nb(u)} + ${i0 === 0 ? k - 1 : k} \\times ${par(r)}$`, u + (i0 === 0 ? k - 1 : k) * r],
    [`$${nb(u)} + ${k + 1} \\times ${par(r)}$`, u + (k + 1) * r],
    [`$${par(u)} \\times ${par(r)}^{${pas}}$`, u * r ** pas],
    [`$${k} + ${par(u)} \\times ${par(r)}$`, k + u * r],
  ];
  const vus = new Set([arr(cands[0][1])]);
  const pieges: string[] = [];
  for (const [e, v] of cands.slice(1)) if (!vus.has(arr(v))) { vus.add(arr(v)); pieges.push(e); }
  return qcm4(
    `${cadre()}${rc(["La suite arithmétique", "La suite"])} $(${L}_n)$ ${i0 === 0 ? "commence au rang $0$" : "commence au rang $1$"} : $${L}_${i0} = ${nb(u)}$, raison $r = ${nb(r)}$. ${rc([`Quel calcul donne $${L}_{${k}}$ ?`, `Pour obtenir $${L}_{${k}}$, on calcule :`, `Quelle expression vaut $${L}_{${k}}$ ?`])}`,
    cands[0][0],
    pieges,
    expl(i0 === 0 ? "$u_n = u_0 + n \\times r$." : "$u_n = u_1 + (n - 1) \\times r$.",`de $${L}_${i0}$ à $${L}_{${k}}$, il y a $${pas}$ pas.`, `$${L}_{${k}} = ${nb(u)} + ${pas} \\times ${par(r)} = ${nb(u + pas * r)}$.`, `le bon calcul est $${nb(u)} + ${pas} \\times ${par(r)}$.`)
  );
}

function aTermeContexte(d: number): Q {
  const L = lettre();
  const an0 = annee0();
  const i0 = rc([0, 1]);
  const pas = d === 2 ? randomInt(4, 10) : randomInt(10, 20);
  const { s, u0, r } = sitAuHasard(pas);
  const k = i0 + pas;
  const text = `${situA(s, u0, r, i0, an0)} ${noteSuite(L, s.nom, s.p, i0, an0)} ${rc([`Combien vaut $${L}_{${k}}$, c’est-à-dire ${s.nom} ${quandRang(s.p, i0, an0, k)} ?`, `Calcule $${L}_{${k}}$.`, `Quelle est la valeur de $${L}_{${k}}$ ?`])}`;
  const v = u0 + r * pas;
  return courte(text, v, expl(`la suite est arithmétique de raison $${nb(r)}$, avec $${L}_${i0} = ${nb(u0)}$.`, `$${L}_n = ${L}_${i0} + (n ${i0 ? "- 1" : ""}) \\times r$`.replace("(n ) \\times r", "n \\times r") + ` : de $${L}_${i0}$ à $${L}_{${k}}$, il y a $${pas}$ pas.`, `$${L}_{${k}} = ${nb(u0)} + ${pas} \\times ${par(r)} = ${nb(v)}$.`, `${s.nom} ${quandRang(s.p, i0, an0, k)} vaut $${nb(v)}$.`));
}

function aMotifTerme(d: number): Q {
  const m = rc(MOTIFS.filter((x) => x.lineaire));
  const k = d === 1 ? randomInt(5, 10) : d === 2 ? randomInt(11, 30) : randomInt(31, 100);
  const b = m.f(2) - m.f(1);
  const text = `${enonceMotif(m)} ${rc([`Combien ${deObj(m)} faut-il pour l’étape $${k}$ ?`, `On note $u_n$ le nombre ${deObj(m)} de l’étape $n$ ($u_1$ correspond à l’étape $1$). Calcule le nombre ${deObj(m)} de l’étape $${k}$.`, `En gardant la même règle, combien l’étape $${k}$ comptera-t-elle ${deObj(m)} ?`])}`;
  return courte(text, m.f(k), expl(`la suite des ${m.objet} est arithmétique de raison $${b}$, à partir de $u_1 = ${m.f(1)}$.`, "$u_n = u_1 + (n - 1) \\times r$ : de l’étape $1$ à l’étape $k$, il y a $k - 1$ pas.", `$u_{${k}} = ${m.f(1)} + ${k - 1} \\times ${b} = ${m.f(k)}$.`, `l’étape $${k}$ compte $${m.f(k)}$ ${m.objet}.`), canvasMotif(m));
}

/* =========================================================
   LIN_SUITE_EXPLICITE
========================================================= */

const EX_EXPL = (L: string, i0: number, u: number, r: number, bon: string) =>
  expl(
    i0 === 0 ? "pour une suite arithmétique qui commence au rang $0$ : $u_n = u_0 + n \\times r$." : "pour une suite arithmétique qui commence au rang $1$ : $u_n = u_1 + (n - 1) \\times r$.",
    "on repère le premier terme et la raison, puis on remplace.",
    `$${L}_${i0} = ${nb(u)}$ et $r = ${nb(r)}$.`,
    `${bon} ; on vérifie avec $${L}_${i0} = ${nb(u)}$.`
  );

function explicitePieges(L: string, i0: number, u: number, r: number) {
  const P = (e: string) => `$${L}_n = ${e}$`;
  if (i0 === 0) return { bon: P(aff(u, r)), pieges: [P(aff(r, u)), P(`${nb(u)} ${r < 0 ? "-" : "+"} ${nb(Math.abs(r))}(n - 1)`), P(`${par(u)} \\times ${par(r)}^n`), P(aff(u + r, r))] };
  return {
    bon: rc([P(`${nb(u)} ${r < 0 ? "-" : "+"} ${nb(Math.abs(r))}(n - 1)`), P(aff(u - r, r))]),
    pieges: [P(aff(u, r)), P(`${nb(u)} ${r < 0 ? "-" : "+"} ${nb(Math.abs(r))}(n + 1)`), P(aff(r, u)), P(`${par(u)} \\times ${par(r)}^{n-1}`)],
  };
}

function aExpl0(d: number): Q {
  const L = lettre();
  const u = d === 1 ? randomInt(2, 40) : rc([randomInt(-30, -1), randomInt(1, 200)]);
  const r = d === 1 ? rc([2, 3, 4, 5, 7, 10]) : rc([-3, -5, -12, 6, 15, 1.5, -2.5]);
  const { bon, pieges } = explicitePieges(L, 0, u === r ? u + 1 : u, r);
  const uu = u === r ? u + 1 : u;
  const text = rc([
    `${cadre()}Une suite arithmétique $(${L}_n)$ a pour premier terme $${L}_0 = ${nb(uu)}$ et pour raison $r = ${nb(r)}$. Pour tout entier naturel $n$ :`,
    `${cadre()}On a $${L}_0 = ${nb(uu)}$ et ${relEcrite(L, r)} pour tout entier naturel $n$. Quelle est l’expression de $${L}_n$ en fonction de $n$ ?`,
    `${cadre()}Les premiers termes d’une suite arithmétique sont, à partir de $${L}_0$ : $${liste(plage(0, 3).map((j) => uu + r * j))}$. Quelle est l’expression de $${L}_n$ ?`,
  ]);
  return qcm4(text, bon, pieges, EX_EXPL(L, 0, uu, r, bon));
}

function aExpl1(d: number): Q {
  const L = lettre();
  let u = randomInt(-20, 150);
  const r = d === 2 ? rc([2, 3, 4, 5, 8, 10, -2, -4]) : rc([-3, -7, 12, 15, 1.5, -0.5, 2.5]);
  if (u === r || u === 2 * r || u === 0) u += 7;
  const { bon, pieges } = explicitePieges(L, 1, u, r);
  const text = rc([
    `${cadre()}Une suite arithmétique $(${L}_n)$, définie pour $n \\ge 1$, a pour premier terme $${L}_1 = ${nb(u)}$ et pour raison $r = ${nb(r)}$. Pour tout entier $n \\ge 1$ :`,
    `${cadre()}Attention, la suite commence au rang $1$ : $${L}_1 = ${nb(u)}$ et ${relEcrite(L, r)} pour $n \\ge 1$. Quelle est l’expression de $${L}_n$ ?`,
    `${cadre()}Les termes d’une suite arithmétique sont numérotés à partir de $1$ : $${L}_1 = ${nb(u)}$, $${L}_2 = ${nb(u + r)}$, $${L}_3 = ${nb(u + 2 * r)}$. Pour tout $n \\ge 1$ :`,
  ]);
  return qcm4(text, bon, pieges, EX_EXPL(L, 1, u, r, bon));
}

function aExplContexte(d: number): Q {
  const L = lettre();
  const an0 = annee0();
  const i0 = d === 1 ? 0 : rc([0, 1]);
  const { s, u0, r } = sitAuHasard(10);
  const uu = u0 === r || u0 === 2 * r ? u0 + s.u0[2] : u0;
  const { bon, pieges } = explicitePieges(L, i0, uu, r);
  const text = `${situA(s, uu, r, i0, an0)} ${noteSuite(L, s.nom, s.p, i0, an0)} ${rc([`Quelle est l’expression de $${L}_n$ en fonction de $n$ ?`, `Pour tout entier $n \\ge ${i0}$, on a :`, `Quelle formule permet de calculer directement $${L}_n$ ?`])}`;
  return qcm4(text, bon, pieges, EX_EXPL(L, i0, uu, r, bon));
}

function aExplLire(d: number): Q {
  const L = lettre();
  let a = randomInt(2, 60);
  const b = d === 1 ? rc([2, 3, 4, 5, 6, 8, -2, -3, -5]) : rc([-4, -7, 1.5, -0.5, 12, 2.5]);
  while (a === b || a === -b || a === 0) a += 5;
  const ecr = d === 1 ? aff(a, b) : rc([aff(a, b), `${nb(b)}n + ${nb(a)}`.replace("+ -", "- ")]);
  const C = (x: number, y: number) => `$${L}_0 = ${nb(x)}$ et $r = ${nb(y)}$`;
  return qcm4(
    `${cadre()}${rc(["Une suite arithmétique est définie, pour tout entier naturel $n$, par", "Pour tout entier naturel $n$, on pose", "On étudie la suite définie pour $n \\ge 0$ par"])} $${L}_n = ${ecr}$. ${rc(["Quels sont son premier terme et sa raison ?", "Lis son premier terme et sa raison :", "On en déduit :"])}`,
    C(a, b),
    [C(b, a), C(a, -b), C(a + b, b)],
    expl("$u_n = u_0 + r \\times n$ : le nombre seul est $u_0$, le coefficient de $n$ est la raison.", "on repère le terme constant et le coefficient de $n$.", `$${L}_0 = ${nb(a)}$ (on remplace $n$ par $0$) et le coefficient de $n$ vaut $${nb(b)}$.`, `${C(a, b)}.`)
  );
}

/* =========================================================
   LIN_SUITE_VARIATION
========================================================= */

export const SENS = ["croissante", "décroissante", "constante", "croissante puis décroissante", "décroissante puis croissante"];
const sensDe = (r: number) => (r > 0 ? "croissante" : r < 0 ? "décroissante" : "constante");
const EX_SENS = (r: number, ou: string) =>
  expl("une suite arithmétique est croissante si $r > 0$, décroissante si $r < 0$, constante si $r = 0$.", "seul le SIGNE de la raison compte, pas sa taille ni le premier terme.", `${ou} : $r = ${nb(r)}$${r > 0 ? " > 0" : r < 0 ? " < 0" : ""}.`, `la suite est ${sensDe(r)}.`);
const qcmSens = (text: string, r: number, ou: string, canvas?: CanvasFigure) => qcm4(text, sensDe(r), SENS.filter((x) => x !== sensDe(r)).slice(0, 4), EX_SENS(r, ou), canvas);
const raisonSignee = () => {
  const t = rc(["+", "+", "-", "-", "0"]);
  return t === "0" ? 0 : (t === "+" ? 1 : -1) * rc([0.5, 1, 2, 3, 5, 10, 25, 1.5]);
};

function aVarRaison(_d: number): Q {
  const L = lettre();
  const r = raisonSignee();
  const u = randomInt(-50, 200);
  return qcmSens(`${cadre()}${rc(["Une suite arithmétique", "La suite arithmétique"])} $(${L}_n)$ a pour premier terme $${L}_0 = ${nb(u)}$ et pour raison $r = ${nb(r)}$. ${rc(["Elle est :", "Quel est son sens de variation ?", "Cette suite est :"])}`, r, "la raison est donnée");
}

function aVarExpl(_d: number): Q {
  const L = lettre();
  const r = raisonSignee();
  const a = randomInt(-20, 80) || 5;
  const e = r === 0 ? nb(a) : rc([aff(a, r), `${nb(r)}n ${sg(a)}`.replace(/^1n/, "n").replace(/^-1n/, "-n")]);
  return qcmSens(`${cadre()}${rc(["Pour tout entier naturel $n$, on pose", "On définit, pour tout entier naturel $n$,", "Une suite arithmétique est définie pour $n \\ge 0$ par"])} $${L}_n = ${e}$. ${rc(["Cette suite est :", "Quel est son sens de variation ?"])}`, r, "le coefficient de $n$ est la raison");
}

function aVarRec(_d: number): Q {
  const L = lettre();
  const r = raisonSignee();
  const u = randomInt(-30, 100);
  const rel = r === 0 ? `$${L}_{n+1} = ${L}_n$` : relEcrite(L, r);
  return qcmSens(`${cadre()}La suite $(${L}_n)$ est définie par $${L}_0 = ${nb(u)}$ et ${rel} pour tout entier naturel $n$. ${rc(["Elle est :", "Quel est son sens de variation ?", "Que peut-on dire de ses variations ?"])}`, r, "on lit ce que l’on ajoute à chaque étape");
}

function aVarSituation(_d: number): Q {
  const L = lettre();
  const an0 = annee0();
  const { s, u0, r: r0 } = sitAuHasard(4);
  const r = s.cumul ? Math.abs(r0) : rc([1, -1]) * Math.abs(r0);
  const i0 = rc([0, 1]);
  return qcmSens(`${situA(s, u0, r, i0, an0)} ${noteSuite(L, s.nom, s.p, i0, an0)} ${rc([`La suite $(${L}_n)$ est :`, `Quel est le sens de variation de $(${L}_n)$ ?`, `Comment évolue la suite $(${L}_n)$ ?`])}`, r, "chaque période on ajoute (ou on retire) la même quantité");
}

function aVarPiege(_d: number): Q {
  const L = lettre();
  const up = rc([true, false]);
  const R = (up ? 1 : -1) * rc([0.5, 2, 3, 0.25, 1, 4]);
  const u = up ? -randomInt(5, 90) * 10 : randomInt(5, 90) * 10;
  const bon = up ? `croissante, car $r = ${nb(R)} > 0$` : `décroissante, car $r = ${nb(R)} < 0$`;
  const pieges = up
    ? [`décroissante, car $${L}_0 = ${nb(u)} < 0$`, "on ne peut pas savoir sans calculer d’autres termes", Math.abs(R) < 1 ? "décroissante, car $0 < r < 1$" : "décroissante, car ses premiers termes sont négatifs", "constante, car la raison est petite"]
    : [`croissante, car $${L}_0 = ${nb(u)} > 0$`, "on ne peut pas savoir sans calculer d’autres termes", "croissante, car ses premiers termes sont positifs", "constante, car la raison est petite"];
  return qcm4(
    `${cadre()}Une suite arithmétique $(${L}_n)$ a pour premier terme $${L}_0 = ${nb(u)}$ et pour raison $r = ${nb(R)}$. ${rc(["Quel est son sens de variation, et pourquoi ?", "Quelle affirmation est juste ?", "Un élève hésite. Quelle réponse est correcte ?"])}`,
    bon,
    pieges,
    expl("le sens de variation d’une suite arithmétique ne dépend QUE du signe de la raison.", "le premier terme fixe le point de départ, pas le sens ; et on compare $r$ à $0$ (pas à $1$ : ça, c’est pour les suites géométriques).", `$r = ${nb(R)}$ : $${liste([u, u + R, u + 2 * R])} \\ldots$`, `la suite est ${up ? "croissante" : "décroissante"}.`)
  );
}

/* =========================================================
   LIN_SUITE_GRAPHIQUE
========================================================= */

/** Les points (n ; L_n) dans un repère, ordonnées entières. */
export function nuage(L: string, ts: number[], i0 = 0, droite?: { a: number; b: number }): CanvasFigure {
  const ymin = Math.min(0, Math.floor(Math.min(...ts)) - 1);
  const ymax = Math.ceil(Math.max(...ts)) + 1;
  return {
    kind: "fonctionGraphique",
    titre: "Les termes de la suite",
    size: { width: 320, height: 260 },
    xmin: -1,
    xmax: ts.length + i0,
    ymin,
    ymax,
    grille: true,
    courbes: droite ? [{ id: "droite", type: "affine", a: droite.a, b: droite.b, couleur: "#94a3b8" }] : undefined,
    points: ts.map((y, k) => ({ x: k + i0, y, label: `${L}${k + i0}`, couleur: "#2563eb" })),
  } as CanvasFigure;
}

function petiteArith(sens?: "+" | "-" | "0") {
  const t = sens ?? rc(["+", "-"] as const);
  const r = t === "0" ? 0 : t === "+" ? rc([1, 2, 3]) : -rc([1, 2, 3]);
  const u0 = t === "-" ? randomInt(-5 * r + 1, -5 * r + 6) : randomInt(1, 8);
  return { r, ts: plage(0, 5).map((k) => u0 + r * k) };
}

function aGraphLire(_d: number): Q {
  const L = lettre();
  const { r, ts } = petiteArith();
  const canvas = nuage(L, ts);
  if (randomInt(1, 2) === 1) {
    const k = randomInt(1, 5);
    return courte(`${cadre()}${rc(["On a placé les points", "Le graphique montre les points", "Voici les points"])} $(n\\,;\\,${L}_n)$ d’une suite arithmétique, pour $n$ de $0$ à $5$. ${rc([`Lis la valeur de $${L}_{${k}}$.`, `Que vaut $${L}_{${k}}$ ?`, `Quelle est l’ordonnée du point d’abscisse $${k}$ ?`])}`, ts[k], expl("le point d’abscisse $n$ a pour ordonnée $u_n$.", `on lit l’ordonnée du point d’abscisse $${k}$.`, `ce point est à la hauteur $${ts[k]}$.`, `$${L}_{${k}} = ${ts[k]}$.`), canvas);
  }
  return courte(`${cadre()}${rc(["On a placé les points", "Le graphique montre les points", "Voici les points"])} $(n\\,;\\,${L}_n)$ d’une suite arithmétique, pour $n$ de $0$ à $5$. ${rc(["Lis sa raison sur le graphique.", "De combien varie l’ordonnée d’un point au suivant ? Donne la raison.", "Quelle est la raison de cette suite ?"])}`, r, expl("la raison est l’écart (constant) entre deux points consécutifs.", "on lit deux ordonnées consécutives et on soustrait.", `$${L}_1 - ${L}_0 = ${ts[1]} - ${ts[0]} = ${r}$.`, `la raison vaut $${r}$${r < 0 ? " : les points descendent" : ""}.`), canvas);
}

function aGraphRaison(_d: number): Q {
  const L = lettre();
  const r = rc([2, 3, 4, 5, -2, -3, -4, 1.5]);
  const u0 = r < 0 ? randomInt(-6 * r, -6 * r + 15) : randomInt(0, 20);
  const ts = plage(0, 6).map((k) => u0 + r * k);
  const i = randomInt(0, 2);
  const j = i + randomInt(2, 4);
  return courte(
    `${cadre()}On a placé les points $(n\\,;\\,${L}_n)$ d’une suite arithmétique et tracé la droite qui les porte. Deux de ces points sont $(${i}\\,;\\,${nb(ts[i])})$ et $(${j}\\,;\\,${nb(ts[j])})$. ${rc(["Quelle est la raison de la suite ?", "Déduis-en la raison.", "Calcule la raison $r$."])}`,
    r,
    expl("la raison d’une suite arithmétique est le coefficient directeur de la droite qui porte ses points.", "on divise l’écart des ordonnées par l’écart des abscisses.", `$\\dfrac{${nb(ts[j])} - ${par(ts[i])}}{${j} - ${i}} = \\dfrac{${nb(ts[j] - ts[i])}}{${j - i}} = ${nb(r)}$.`, `la raison est $${nb(r)}$.`),
    nuage(L, ts, 0, { a: r, b: u0 })
  );
}

export const NAT_GRAPHE = ["arithmétique de raison positive", "arithmétique de raison négative", "géométrique de raison supérieure à $1$", "géométrique de raison comprise entre $0$ et $1$"];

/** Nuage arithmétique (raison + ou −) ou géométrique (q > 1 ou 0 < q < 1). */
export function nuageNature(sorte: number) {
  if (sorte === 0) return petiteArith("+").ts.slice(0, 5);
  if (sorte === 1) return petiteArith("-").ts.slice(0, 5);
  if (sorte === 2) {
    const [u0, q] = rc([[1, 2], [2, 2], [1, 3], [4, 1.5], [3, 2]] as const);
    return plage(0, 4).map((k) => u0 * q ** k).filter((y, k) => k < 4 || y <= 50);
  }
  const [u0, q] = rc([[16, 0.5], [32, 0.5], [20, 0.5], [25, 0.6], [40, 0.5]] as const);
  return plage(0, 4).map((k) => u0 * q ** k);
}

function aGraphNature(_d: number): Q {
  const L = lettre();
  const sorte = randomInt(0, 3);
  const ts = nuageNature(sorte);
  return qcm4(
    `${cadre()}${rc(["Le graphique représente les premiers termes", "On a placé les points $(n\\,;\\," + L + "_n)$ des premiers termes", "Voici les premiers termes"])} d’une suite $(${L}_n)$. ${rc(["Cette suite semble :", "Quelle suite peut-on reconnaître ?", "D’après l’allure du nuage, la suite est :"])}`,
    NAT_GRAPHE[sorte],
    NAT_GRAPHE.filter((_, k) => k !== sorte),
    expl("points alignés = suite arithmétique (écart constant) ; points sur une courbe qui se creuse = suite géométrique.", "on regarde si les points sont alignés, puis s’ils montent ou descendent.", `ordonnées : $${liste(ts)}$.`, `la suite est ${NAT_GRAPHE[sorte]}.`),
    nuage(L, ts)
  );
}

function aGraphSens(_d: number): Q {
  const L = lettre();
  const t = rc(["+", "-", "+", "-", "0"] as const);
  const { r, ts } = petiteArith(t);
  return qcmSens(`${cadre()}${rc(["Le graphique montre les points", "On a placé les points", "Observe les points"])} $(n\\,;\\,${L}_n)$ d’une suite arithmétique. ${rc(["Cette suite est :", "Quel est son sens de variation ?", "D’après le graphique, elle est :"])}`, r, "on lit l’écart entre deux points consécutifs", nuage(L, ts));
}

function aGraphPoint(_d: number): Q {
  const L = lettre();
  let a = randomInt(-10, 30);
  const b = rc([2, 3, 4, 5, 6, -2, -3, -4]);
  while (a === b || a === 0) a += 7;
  const f = (x: number) => a + b * x;
  const k = randomInt(2, 12);
  const P = (x: number, y: number) => `$(${nb(x)}\\,;\\,${nb(y)})$`;
  const cands = [P(k, f(k) + b), P(f(k), k), P(k, b + a * k), P(k + 1, f(k)), P(k, f(k) - 1)];
  const pieges = cands.filter((_, i) => {
    const pts = [[k, f(k) + b], [f(k), k], [k, b + a * k], [k + 1, f(k)], [k, f(k) - 1]][i];
    return !(Number.isInteger(pts[0]) && pts[0] >= 0 && f(pts[0]) === pts[1]);
  });
  return qcm4(
    `${cadre()}La suite $(${L}_n)$ est définie pour tout entier naturel $n$ par $${L}_n = ${aff(a, b)}$. ${rc(["Quel point fait partie de sa représentation graphique ?", "Parmi ces points, lequel est un point $(n\\,;\\," + L + "_n)$ de la suite ?", "Quel point appartient au nuage des termes de la suite ?"])}`,
    P(k, f(k)),
    pieges,
    expl("la représentation graphique d’une suite est l’ensemble des points $(n\\,;\\,u_n)$.", "on calcule $u_n$ pour l’abscisse proposée.", `$${L}_{${k}} = ${nb(a)} ${b < 0 ? "-" : "+"} ${Math.abs(b)} \\times ${k} = ${nb(f(k))}$.`, `le point ${P(k, f(k))} appartient au nuage.`)
  );
}

function aGraphDroite(_d: number): Q {
  const L = lettre();
  let a = randomInt(-10, 30);
  const b = rc([2, 3, 4, 5, 1.5, -2, -3, -0.5]);
  while (a === b || a === 0 || a === -b) a += 4;
  const D = (p: number, c: number) => `$y = ${aff(p, c, "x")}$`;
  return qcm4(
    `${cadre()}La suite arithmétique $(${L}_n)$ vérifie $${L}_n = ${aff(a, b)}$ pour tout entier naturel $n$. ${rc(["Ses points $(n\\,;\\," + L + "_n)$ sont alignés sur la droite d’équation :", "Sur quelle droite se trouvent les points qui la représentent ?", "Les termes de la suite sont portés par la droite :"])}`,
    D(a, b),
    [D(b, a), D(a, -b), D(a + b, b)],
    expl("$u_n = u_0 + rn$ : les points $(n\\,;\\,u_n)$ sont sur la droite $y = u_0 + rx$.", "le coefficient directeur est la raison, l’ordonnée à l’origine est $u_0$.", `$${L}_0 = ${nb(a)}$ et $r = ${nb(b)}$.`, `la droite a pour équation ${D(a, b)}.`)
  );
}

/* =========================================================
   LIN_SUITE_INTERPRETER
========================================================= */

/** « le nombre » → « du nombre », « la somme » → « de la somme ». */
export const du = (gn: string) => (/^le /.test(gn) ? `du ${gn.slice(3)}` : `de ${gn}`);

function aInterpTerme(_d: number): Q {
  const L = lettre();
  const an0 = annee0();
  const i0 = rc([0, 1]);
  const pas = randomInt(3, 10);
  const { s, u0, r } = sitAuHasard(pas + 2);
  const k = i0 + pas;
  const V = u0 + r * pas;
  const Q_ = (j: number) => `${cap(s.nom)} ${quandRang(s.p, i0, an0, j)} vaut $${nb(V)}$`;
  return qcm4(
    `${situA(s, u0, r, i0, an0)} ${noteSuite(L, s.nom, s.p, i0, an0)} On calcule $${L}_{${k}} = ${nb(V)}$. ${rc(["Que signifie ce résultat ?", "Comment interpréter ce nombre ?", "Que représente ce nombre ?"])}`,
    Q_(k),
    [Q_(k + 1), Q_(k - 1), `${cap(s.ce)} a ${r > 0 ? "augmenté" : "diminué"} de $${nb(V)}$ depuis le départ`, Q_(k + 2)],
    expl(`l’énoncé fixe le rang de départ : $${L}_${i0}$ correspond ${moment0(s.p, i0, an0)}.`, `on traduit l’indice $${k}$ en moment.`, `$${L}_{${k}}$ correspond ${quandRang(s.p, i0, an0, k).replace(/^en /, "à ")}.`, `${Q_(k)} (c’est une valeur, pas l’augmentation depuis le départ).`)
  );
}

function aInterpRang(_d: number): Q {
  const L = lettre();
  const an0 = annee0();
  const i0 = rc([0, 1]);
  const s = rc(SITA.filter((x) => x.p.an));
  const { u0, r } = tireA(s, 10);
  const k = i0 + randomInt(2, 15);
  const debut = `${situA(s, u0, r, i0, an0)} ${noteSuite(L, s.nom, s.p, i0, an0)}`;
  if (randomInt(1, 2) === 1)
    return courte(`${debut} ${rc([`À quelle année correspond $${L}_{${k}}$ ?`, `$${L}_{${k}}$ donne ${s.nom} en quelle année ?`])}`, an0 + k - i0, expl(`$${L}_${i0}$ correspond à ${an0}.`, `de $${L}_${i0}$ à $${L}_{${k}}$, il y a $${k - i0}$ ans.`, `${an0} + ${k - i0} = ${an0 + k - i0}$`.replace(/^/, "$"), `$${L}_{${k}}$ correspond à ${an0 + k - i0}.`));
  return courte(`${debut} ${rc([`Quel est l’indice $n$ du terme qui donne ${s.nom} en ${an0 + k - i0} ?`, `Quel terme $${L}_n$ correspond à ${an0 + k - i0} ? Donne $n$.`])}`, k, expl(`$${L}_${i0}$ correspond à ${an0}.`, "on compte les années écoulées, puis on ajoute le rang de départ.", `$${an0 + k - i0} - ${an0} + ${i0} = ${k}$.`, `c’est $${L}_{${k}}$.`));
}

function aInterpRaison(_d: number): Q {
  const L = lettre();
  const an0 = annee0();
  const { s, u0, r: r0 } = sitAuHasard(10);
  const r = s.cumul ? Math.abs(r0) : r0;
  const u = u0 === Math.abs(r) ? u0 + s.u0[2] : u0;
  const surR = randomInt(1, 2) === 1;
  const X = surR ? Math.abs(r) : u;
  const VAR = `${r > 0 ? "l’augmentation" : "la diminution"} ${du(s.nom)} ${s.p.chaque.toLowerCase()}`;
  const ANTI = `${r > 0 ? "la diminution" : "l’augmentation"} ${du(s.nom)} ${s.p.chaque.toLowerCase()}`;
  const DEP = `${s.nom} ${moment0(s.p, 0, an0)}`;
  const UN = `${s.nom} ${quandRang(s.p, 0, an0, 1)}`;
  const DUREE = `le nombre de ${s.p.plur} écoulé${s.p.plur === "semaines" || s.p.plur === "heures" || s.p.plur === "minutes" || s.p.plur === "années" ? "e" : ""}s`;
  return qcm4(
    `${noteSuite(L, s.nom, s.p, 0, an0)} Une étude donne $${L}_n = ${aff(u, r)}$ pour tout entier naturel $n$. ${rc([`Dans cette formule, que représente le nombre $${nb(X)}$ ?`, `Que signifie le nombre $${nb(X)}$ dans cette formule ?`, `Quel est le sens du nombre $${nb(X)}$ ?`])}`,
    surR ? VAR : DEP,
    surR ? [DEP, ANTI, DUREE, UN] : [VAR, UN, DUREE],
    expl("dans $u_n = u_0 + rn$, $u_0$ est la valeur de départ et $r$ la variation à chaque étape.", "on repère le nombre seul (pour $n = 0$) et le coefficient de $n$.", `$${L}_0 = ${nb(u)}$ et $r = ${nb(r)}$.`, `$${nb(X)}$ est ${surR ? VAR : DEP}.`)
  );
}

function aInterpSeuil(_d: number): Q {
  const L = lettre();
  const an0 = annee0();
  const m = randomInt(4, 15);
  const { s, u0, r } = sitAuHasard(m + 1);
  const S = u0 + r * m - r / 2;
  const debut = `${situA(s, u0, r, 0, an0)} ${noteSuite(L, s.nom, s.p, 0, an0)} On admet que $${L}_n = ${aff(u0, r)}$.`;
  const ex = expl(`on cherche le premier rang $n$ tel que $${L}_n ${r > 0 ? ">" : "<"} ${nb(S)}$.`, `on résout $${aff(u0, r)} ${r > 0 ? ">" : "<"} ${nb(S)}$, puis on prend le premier entier qui convient.`, `$${L}_{${m - 1}} = ${nb(u0 + r * (m - 1))}$ et $${L}_{${m}} = ${nb(u0 + r * m)}$.`, `c’est à partir du rang $${m}$${s.p.an ? `, c’est-à-dire en ${an0 + m}` : ""}.`);
  if (s.p.an && randomInt(1, 2) === 1)
    return courte(`${debut} ${r > 0 ? `En quelle année la valeur $${nb(S)}$ est-elle dépassée pour la première fois ?` : `En quelle année passe-t-on pour la première fois sous la valeur $${nb(S)}$ ?`}`, an0 + m, ex);
  return courte(`${debut} ${rc([`À partir de quel rang $n$ a-t-on $${L}_n ${r > 0 ? ">" : "<"} ${nb(S)}$ ?`, `Quel est le plus petit entier $n$ tel que $${L}_n ${r > 0 ? ">" : "<"} ${nb(S)}$ ?`])}`, m, ex);
}

function aInterpMotif(_d: number): Q {
  const m = rc(MOTIFS.filter((x) => x.lineaire));
  const k = randomInt(6, 40);
  const b = m.f(2) - m.f(1);
  if (randomInt(1, 2) === 1)
    return courte(`${enonceMotif(m)} ${rc([`À quelle étape la figure compte-t-elle exactement $${m.f(k)}$ ${m.objet} ?`, `Quelle étape utilise $${m.f(k)}$ ${m.objet} ?`])}`, k, expl(`$u_n = ${m.f(1)} + ${b}(n - 1)$ pour $n \\ge 1$.`, `on résout $${m.f(1)} + ${b}(n - 1) = ${m.f(k)}$.`, `$${b}(n - 1) = ${m.f(k) - m.f(1)}$, donc $n - 1 = ${k - 1}$.`, `c’est l’étape $${k}$.`), canvasMotif(m));
  const N = m.f(k) + randomInt(0, b - 1);
  return courte(`${enonceMotif(m)} ${rc([`On dispose de $${N}$ ${m.objet}. Quelle est la plus grande étape que l’on peut construire entièrement ?`, `Avec $${N}$ ${m.objet}, jusqu’à quelle étape peut-on aller au plus ?`])}`, k, expl(`$u_n = ${m.f(1)} + ${b}(n - 1)$ pour $n \\ge 1$.`, `on cherche la plus grande étape $n$ telle que $u_n \\le ${N}$.`, `$u_{${k}} = ${m.f(k)} \\le ${N}$ mais $u_{${k + 1}} = ${m.f(k + 1)} > ${N}$.`, `on peut construire jusqu’à l’étape $${k}$.`), canvasMotif(m));
}

/* ---------- Gabarits et fusion ---------- */

const NOTION: Record<string, string> = {
  lin_suite_reconnaitre: "lin_suite_arithmetique",
  lin_suite_recurrence: "lin_suite_arithmetique",
  lin_suite_notation: "lin_suite_arithmetique",
  lin_suite_terme_rang: "lin_suite_arithmetique",
  lin_suite_explicite: "lin_suite_terme_general",
  lin_suite_variation: "lin_suite_terme_general",
  lin_suite_graphique: "lin_suite_terme_general",
  lin_suite_interpreter: "lin_suite_terme_general",
};

export type Gen = (d: number) => Q;
export type Ligne = [string, number, string, string];

/** Fabrique les gabarits : un id par (micro, étoile, rang), le générateur nommé dans le tag « g:… ». */
export function fabriquer(prefixe: string, notion: Record<string, string>, gens: Record<string, Gen>, lignes: Ligne[], tag: string): TutorBankItemV4[] {
  const rangs = new Map<string, number>();
  return lignes.map(([micro, d, g, hint]) => {
    const cle = `${micro}_${d}`;
    const r = (rangs.get(cle) ?? 0) + 1;
    rangs.set(cle, r);
    if (!gens[g]) throw new Error(`générateur inconnu ${g}`);
    return {
      kind: "template",
      id: `${prefixe}_${micro}_${d}_${r}`,
      niveau: "premiere",
      matiere: "maths",
      notionId: notion[micro],
      microId: micro,
      difficulty: d,
      theme: "neutral",
      hint,
      tags: ["premiere", "maths", "suites", tag, "renfort", "template", `g:${g}`],
      generate: () => gens[g](d),
    } as TutorBankItemV4;
  });
}

export const GENS_ARITH: Record<string, Gen> = {
  aRaisonListe, aNatureListe, aNatureSituation, aMotifRaison, aMotifNature, aFormeNature, aRaisonDeuxTermes,
  aRelationSituation, aRelationListe, aSuivant, aDerouler, aPrecedent, aRecContexte,
  aNotaEcrire, aNotaAnnee, aNotaCalcul, aNotaSuivant, aRang, aNotaTableau,
  aTerme0, aTerme1, aTermeAutre, aTermeCalcul, aTermeContexte, aMotifTerme,
  aExpl0, aExpl1, aExplContexte, aExplLire, aExplCalcul: aNotaCalcul,
  aVarRaison, aVarExpl, aVarRec, aVarSituation, aVarPiege,
  aGraphLire, aGraphRaison, aGraphNature, aGraphSens, aGraphPoint, aGraphDroite,
  aInterpTerme, aInterpRang, aInterpRaison, aInterpSeuil, aInterpMotif,
};

const H_RECU = "Le terme SUIVANT s’obtient en ajoutant la raison au terme actuel.";
const H_NOTA = "u(n) et uₙ, c’est le même terme : ce qui est entre parenthèses passe en indice.";
const H_TERME = "Compte les PAS entre le premier terme et le terme cherché (attention au rang de départ).";
const H_EXPL = "Rang 0 : uₙ = u₀ + n × r ; rang 1 : uₙ = u₁ + (n − 1) × r.";
const H_VAR = "Seul le SIGNE de la raison compte.";
const H_GRA = "Les points (n ; uₙ) d’une suite arithmétique sont alignés ; la pente est la raison.";
const H_INT = "L’indice compte les étapes depuis le départ : traduis-le en date.";
const H_MOTIF = "Compte ce que l’on ajoute d’une étape à la suivante.";

const LIGNES: Ligne[] = [
  ["lin_suite_reconnaitre", 1, "aRaisonListe", H_REC],
  ["lin_suite_reconnaitre", 1, "aNatureListe", H_REC],
  ["lin_suite_reconnaitre", 1, "aNatureSituation", H_REC],
  ["lin_suite_reconnaitre", 1, "aMotifRaison", H_MOTIF],
  ["lin_suite_reconnaitre", 2, "aRaisonListe", H_REC],
  ["lin_suite_reconnaitre", 2, "aNatureListe", H_REC],
  ["lin_suite_reconnaitre", 2, "aNatureSituation", H_REC],
  ["lin_suite_reconnaitre", 2, "aMotifNature", H_MOTIF],
  ["lin_suite_reconnaitre", 2, "aRaisonDeuxTermes", "r = (écart des termes) ÷ (écart des rangs)."],
  ["lin_suite_reconnaitre", 3, "aFormeNature", H_REC],
  ["lin_suite_reconnaitre", 3, "aRaisonDeuxTermes", "r = (écart des termes) ÷ (écart des rangs)."],
  ["lin_suite_reconnaitre", 3, "aNatureSituation", H_REC],
  ["lin_suite_reconnaitre", 3, "aMotifNature", H_MOTIF],
  ["lin_suite_reconnaitre", 3, "aRaisonListe", H_REC],

  ["lin_suite_recurrence", 1, "aSuivant", H_RECU],
  ["lin_suite_recurrence", 1, "aRelationSituation", H_RECU],
  ["lin_suite_recurrence", 1, "aDerouler", H_RECU],
  ["lin_suite_recurrence", 2, "aRelationSituation", H_RECU],
  ["lin_suite_recurrence", 2, "aRelationListe", H_RECU],
  ["lin_suite_recurrence", 2, "aDerouler", H_RECU],
  ["lin_suite_recurrence", 2, "aRecContexte", H_RECU],
  ["lin_suite_recurrence", 2, "aPrecedent", "Pour reculer d’un rang, on fait l’opération inverse."],
  ["lin_suite_recurrence", 3, "aPrecedent", "Pour reculer d’un rang, on fait l’opération inverse."],
  ["lin_suite_recurrence", 3, "aRecContexte", H_RECU],
  ["lin_suite_recurrence", 3, "aDerouler", H_RECU],
  ["lin_suite_recurrence", 3, "aRelationSituation", H_RECU],

  ["lin_suite_notation", 1, "aNotaEcrire", H_NOTA],
  ["lin_suite_notation", 1, "aRang", "Le premier terme est u₀ ou u₁ : lis bien l’énoncé."],
  ["lin_suite_notation", 1, "aNotaCalcul", H_NOTA],
  ["lin_suite_notation", 2, "aNotaEcrire", H_NOTA],
  ["lin_suite_notation", 2, "aNotaAnnee", "L’indice est le rang, pas l’année."],
  ["lin_suite_notation", 2, "aNotaTableau", H_NOTA],
  ["lin_suite_notation", 2, "aRang", "Le premier terme est u₀ ou u₁ : lis bien l’énoncé."],
  ["lin_suite_notation", 3, "aNotaSuivant", "u(n + 1) : on remplace n par n + 1 partout."],
  ["lin_suite_notation", 3, "aNotaAnnee", "L’indice est le rang, pas l’année."],
  ["lin_suite_notation", 3, "aNotaTableau", H_NOTA],
  ["lin_suite_notation", 3, "aNotaCalcul", H_NOTA],

  ["lin_suite_terme_rang", 1, "aTerme0", H_TERME],
  ["lin_suite_terme_rang", 1, "aMotifTerme", H_MOTIF],
  ["lin_suite_terme_rang", 1, "aTermeAutre", H_TERME],
  ["lin_suite_terme_rang", 2, "aTerme0", H_TERME],
  ["lin_suite_terme_rang", 2, "aTerme1", H_TERME],
  ["lin_suite_terme_rang", 2, "aTermeCalcul", H_TERME],
  ["lin_suite_terme_rang", 2, "aTermeContexte", H_TERME],
  ["lin_suite_terme_rang", 2, "aMotifTerme", H_MOTIF],
  ["lin_suite_terme_rang", 3, "aTerme1", H_TERME],
  ["lin_suite_terme_rang", 3, "aTermeAutre", H_TERME],
  ["lin_suite_terme_rang", 3, "aTermeContexte", H_TERME],
  ["lin_suite_terme_rang", 3, "aMotifTerme", H_MOTIF],

  ["lin_suite_explicite", 1, "aExpl0", H_EXPL],
  ["lin_suite_explicite", 1, "aExplCalcul", H_EXPL],
  ["lin_suite_explicite", 1, "aExplLire", H_EXPL],
  ["lin_suite_explicite", 1, "aExplContexte", H_EXPL],
  ["lin_suite_explicite", 2, "aExpl0", H_EXPL],
  ["lin_suite_explicite", 2, "aExpl1", H_EXPL],
  ["lin_suite_explicite", 2, "aExplContexte", H_EXPL],
  ["lin_suite_explicite", 2, "aExplLire", H_EXPL],
  ["lin_suite_explicite", 3, "aExpl1", H_EXPL],
  ["lin_suite_explicite", 3, "aExplContexte", H_EXPL],
  ["lin_suite_explicite", 3, "aExpl0", H_EXPL],
  ["lin_suite_explicite", 3, "aExplCalcul", H_EXPL],

  ["lin_suite_variation", 1, "aVarRaison", H_VAR],
  ["lin_suite_variation", 1, "aVarSituation", H_VAR],
  ["lin_suite_variation", 1, "aVarRec", H_VAR],
  ["lin_suite_variation", 2, "aVarExpl", H_VAR],
  ["lin_suite_variation", 2, "aVarRec", H_VAR],
  ["lin_suite_variation", 2, "aVarSituation", H_VAR],
  ["lin_suite_variation", 2, "aVarRaison", H_VAR],
  ["lin_suite_variation", 3, "aVarPiege", H_VAR],
  ["lin_suite_variation", 3, "aVarExpl", H_VAR],
  ["lin_suite_variation", 3, "aVarSituation", H_VAR],

  ["lin_suite_graphique", 1, "aGraphLire", H_GRA],
  ["lin_suite_graphique", 1, "aGraphSens", H_GRA],
  ["lin_suite_graphique", 1, "aGraphNature", H_GRA],
  ["lin_suite_graphique", 2, "aGraphNature", H_GRA],
  ["lin_suite_graphique", 2, "aGraphRaison", H_GRA],
  ["lin_suite_graphique", 2, "aGraphLire", H_GRA],
  ["lin_suite_graphique", 2, "aGraphDroite", H_GRA],
  ["lin_suite_graphique", 3, "aGraphPoint", H_GRA],
  ["lin_suite_graphique", 3, "aGraphDroite", H_GRA],
  ["lin_suite_graphique", 3, "aGraphRaison", H_GRA],
  ["lin_suite_graphique", 3, "aGraphNature", H_GRA],

  ["lin_suite_interpreter", 1, "aInterpRang", H_INT],
  ["lin_suite_interpreter", 1, "aInterpRaison", H_INT],
  ["lin_suite_interpreter", 1, "aInterpMotif", H_MOTIF],
  ["lin_suite_interpreter", 2, "aInterpTerme", H_INT],
  ["lin_suite_interpreter", 2, "aInterpRaison", H_INT],
  ["lin_suite_interpreter", 2, "aInterpMotif", H_MOTIF],
  ["lin_suite_interpreter", 2, "aInterpRang", H_INT],
  ["lin_suite_interpreter", 3, "aInterpSeuil", H_INT],
  ["lin_suite_interpreter", 3, "aInterpTerme", H_INT],
  ["lin_suite_interpreter", 3, "aInterpMotif", H_MOTIF],
];

export const renfortSuitesArithmetiques: TutorBankItemV4[] = fabriquer("premiere_suites_arith_renfort", NOTION, GENS_ARITH, LIGNES, "arithmetique");
