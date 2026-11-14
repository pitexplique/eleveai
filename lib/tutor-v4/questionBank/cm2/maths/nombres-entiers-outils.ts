// OUTILS DES GABARITS « NOMBRES ENTIERS » DE CM2 (14/11/2026).
//
// Repris du modèle CM1 (`cm1/maths/nombres-entiers.bank.ts`, commit 13cffc60),
// monté au niveau CM2 : jusqu'au milliard (classes des millions et des
// milliards).
//   - l'écriture en lettres jusqu'aux milliards (« millions » et « milliards »
//     sont des noms : ils prennent un s, et « deux cents millions » aussi) ;
//   - le TABLEAU DE NUMÉRATION (`tableau_donnees`) : une colonne par chiffre
//     jusqu'à 9 chiffres, au-delà le tableau des CLASSES (milliards | millions
//     | mille | unités), qui tient dans la largeur d'un téléphone ;
//   - la DROITE GRADUÉE (`number_line`) pour arrondir et encadrer.
// ⛔ Le dessin porte les données, jamais la réponse.
// ⛔ Les leurres sont de vraies erreurs : une classe écrite sans ses zéros
// (« deux millions trente mille » → 230 000), une classe vide oubliée, un zéro
// de trop, deux chiffres échangés…

import type { CanvasFigure } from "@/lib/tutor-v4/types";
import { entre, etapes, fr, melange, un } from "../../cm1/maths/trous-outils";

export { entre, etapes, fr, melange, un };

/* ═════════════ L'écriture en lettres ═════════════ */
const UNITES_L = ["zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix", "onze", "douze", "treize", "quatorze", "quinze", "seize", "dix-sept", "dix-huit", "dix-neuf"];
const DIZAINES_L = ["", "dix", "vingt", "trente", "quarante", "cinquante", "soixante"];

function moinsDeCent(n: number, fin: boolean): string {
  if (n < 20) return UNITES_L[n];
  const d = Math.floor(n / 10);
  const u = n % 10;
  if (d === 7) return u === 1 ? "soixante et onze" : `soixante-${UNITES_L[10 + u]}`;
  if (d === 8) return u === 0 ? (fin ? "quatre-vingts" : "quatre-vingt") : `quatre-vingt-${UNITES_L[u]}`;
  if (d === 9) return `quatre-vingt-${UNITES_L[10 + u]}`;
  if (u === 0) return DIZAINES_L[d];
  return u === 1 ? `${DIZAINES_L[d]} et un` : `${DIZAINES_L[d]}-${UNITES_L[u]}`;
}

function moinsDeMille(n: number, fin: boolean): string {
  const c = Math.floor(n / 100);
  const r = n % 100;
  const mots: string[] = [];
  if (c === 1) mots.push("cent");
  else if (c > 1) mots.push(r === 0 && fin ? `${UNITES_L[c]} cents` : `${UNITES_L[c]} cent`);
  if (r > 0) mots.push(moinsDeCent(r, fin));
  return mots.join(" ");
}

/**
 * En lettres, orthographe traditionnelle (celle des items figés) :
 * « deux cents », « deux cent mille », « quatre-vingt mille », mais
 * « deux cents millions », « quatre-vingts milliards » (million et milliard
 * sont des noms, « mille » est invariable).
 */
export function enLettres(n: number): string {
  if (n === 0) return "zéro";
  let r = n;
  const G = Math.floor(r / 1e9);
  r %= 1e9;
  const M = Math.floor(r / 1e6);
  r %= 1e6;
  const K = Math.floor(r / 1000);
  r %= 1000;
  const mots: string[] = [];
  if (G) mots.push(G === 1 ? "un milliard" : `${moinsDeMille(G, true)} milliards`);
  if (M) mots.push(M === 1 ? "un million" : `${moinsDeMille(M, true)} millions`);
  if (K) mots.push(K === 1 ? "mille" : `${moinsDeMille(K, false)} mille`);
  if (r) mots.push(moinsDeMille(r, true));
  return mots.join(" ");
}

/* ═════════════ Classes et rangs ═════════════ */
export const NOMS_CLASSES = ["unités", "mille", "millions", "milliards"];

/** Les classes d'un nombre, de la plus haute à la plus basse : 2 030 005 → [2, 30, 5]. */
export function classes(n: number): number[] {
  const g: number[] = [];
  let r = n;
  do {
    g.unshift(r % 1000);
    r = Math.floor(r / 1000);
  } while (r > 0);
  return g;
}
const deClasses = (g: number[]) => g.reduce((a, v) => a * 1000 + v, 0);

export const RANGS = [
  { nom: "unités", un: "unité" },
  { nom: "dizaines", un: "dizaine" },
  { nom: "centaines", un: "centaine" },
  { nom: "unités de mille", un: "unité de mille" },
  { nom: "dizaines de mille", un: "dizaine de mille" },
  { nom: "centaines de mille", un: "centaine de mille" },
  { nom: "unités de millions", un: "unité de millions" },
  { nom: "dizaines de millions", un: "dizaine de millions" },
  { nom: "centaines de millions", un: "centaine de millions" },
  { nom: "unités de milliards", un: "unité de milliards" },
  { nom: "dizaines de milliards", un: "dizaine de milliards" },
  { nom: "centaines de milliards", un: "centaine de milliards" },
];

export const chiffreDe = (n: number, r: number) => Math.floor(n / 10 ** r) % 10;
export const arrondi = (n: number, p: number) => Math.floor(n / p + 0.5) * p;

/** La décomposition additive : 4 000 000 + 500 + 2 (les zéros ne s'écrivent pas). */
export const termes = (n: number) =>
  [...String(n)].map((c, i, t) => Number(c) * 10 ** (t.length - 1 - i)).filter((v) => v > 0);
export const decomposition = (n: number) => termes(n).map(fr).join(" + ");

/* ═════════════ Les nombres tirés ═════════════ */

/** Un nombre de k chiffres ; avec la probabilité pZero, au moins un zéro à l'intérieur. */
export function nombre(k: number, pZero = 0.6): number {
  const veutZero = Math.random() < pZero;
  for (let essai = 0; essai < 60; essai++) {
    const c = [entre(1, 9), ...Array.from({ length: k - 1 }, () => (Math.random() < 0.3 ? 0 : entre(1, 9)))];
    if (c.slice(1).includes(0) === veutZero) return Number(c.join(""));
  }
  return Number([entre(1, 9), ...Array.from({ length: k - 1 }, () => entre(1, 9))].join(""));
}

/** Le piège du CM2 : une classe entière vide ou presque (2 000 015, 4 030 700…). */
export function nombreClasses(k: number, p = 0.7): number {
  const n = nombre(k, 0.5);
  const g = classes(n);
  if (g.length < 2 || Math.random() >= p) return n;
  const i = entre(1, g.length - 1);
  g[i] = un([0, 0, entre(1, 9), entre(10, 99), entre(1, 9) * 10, entre(1, 9) * 100]);
  return deClasses(g);
}

/** Les vraies erreurs d'écriture d'un grand nombre. */
export function fauxEcrits(n: number): number[] {
  const s = String(n);
  const g = classes(n);
  const pad = (v: number) => String(v).padStart(3, "0");
  const parts = g.map((v, j) => (j === 0 ? String(v) : pad(v)));
  const f: number[] = []; // les erreurs de classe, d'abord
  const autres: number[] = [];
  for (let i = 1; i < g.length; i++) {
    if (g[i] > 0 && g[i] < 100) {
      const p = [...parts];
      p[i] = String(g[i]); // la classe écrite sans ses zéros : 2 | 30 | 000 → 230 000
      f.push(Number(p.join("")));
      const q = [...parts];
      q[i] = pad(g[i] * 10); // 30 mis aux centaines : 2 300 000
      if (g[i] * 10 < 1000) f.push(Number(q.join("")));
    }
    if (g[i] === 0) f.push(Number(parts.filter((_, j) => j !== i).join(""))); // la classe vide oubliée
    const z = [...parts];
    z[i] = "0" + pad(g[i]); // un zéro de trop dans une classe
    f.push(Number(z.join("")));
  }
  const iz = s.indexOf("0", 1);
  if (iz > 0) f.push(Number(s.slice(0, iz) + s.slice(iz + 1))); // un zéro oublié
  for (let k = 1; k + 1 < s.length; k++) if (s[k] !== s[k + 1]) autres.push(Number(s.slice(0, k) + s[k + 1] + s[k] + s.slice(k + 2))); // deux chiffres échangés
  const j = entre(1, s.length - 1);
  autres.push(Number(s.slice(0, j) + "0" + s.slice(j))); // un zéro ajouté
  autres.push(n * 10, Math.floor(n / 10)); // un chiffre de trop, de moins
  const garde = (l: number[]) => [...new Set(l.filter((x) => x >= 100 && x < 1e12 && x !== n))];
  // ⛔ qcm/qcmN mélangent la liste avant d'en prendre trois : on ne rend donc que
  // les erreurs de classe (au plus quatre), complétées au hasard s'il en manque.
  const prio = melange(garde(f)).slice(0, 4);
  return prio.length >= 3 ? prio : [...prio, ...melange(garde(autres).filter((x) => !prio.includes(x))).slice(0, 4 - prio.length)];
}

/** Quatre nombres voisins de k chiffres : deux chiffres échangés, un chiffre changé. */
export function voisins(k: number, combien = 4): number[] {
  const base = nombre(k, 0.5);
  const s = String(base);
  const vus = new Set<number>([base]);
  for (let essai = 0; vus.size < combien && essai < 200; essai++) {
    const t = s.split("");
    if (Math.random() < 0.5 && k >= 3) {
      const i = entre(1, k - 2);
      [t[i], t[i + 1]] = [t[i + 1], t[i]];
    } else t[entre(1, k - 1)] = String(entre(0, 9));
    vus.add(Number(t.join("")));
  }
  return melange([...vus]);
}

export function explComparer(a: number, b: number): string {
  const sa = String(a);
  const sb = String(b);
  if (sa.length !== sb.length)
    return `${fr(a)} a ${sa.length} chiffres et ${fr(b)} en a ${sb.length} : le nombre qui a le plus de chiffres est le plus grand.`;
  const i = [...sa].findIndex((c, k) => c !== sb[k]);
  if (i < 0) return `les deux nombres ont les mêmes chiffres aux mêmes places : ils sont égaux.`;
  return `même nombre de chiffres ; de gauche à droite, le premier chiffre différent est celui des ${RANGS[sa.length - 1 - i].nom} : ${sa[i]} et ${sb[i]}.`;
}

export const explEcrire = (n: number) => {
  const g = classes(n);
  const k = g.length;
  const morceaux = g.map((v, i) => `${i === 0 ? fr(v) : String(v).padStart(3, "0")} dans la classe des ${NOMS_CLASSES[k - 1 - i]}`);
  return etapes(
    `on écrit chaque classe (milliards, millions, mille, unités) avec TROIS chiffres, sauf la première : une place vide reçoit un zéro.`,
    `« ${enLettres(n)} » → ${morceaux.join(" ; ")}.`,
    `le nombre s’écrit ${fr(n)}.`,
  );
};

export const explLire = (n: number) => {
  const g = classes(n);
  return etapes(
    `on lit chaque classe comme un nombre à trois chiffres, puis on dit son nom (milliards, millions, mille) ; une classe vide ne se lit pas.`,
    `${g.map((v, i) => (i === 0 ? String(v) : String(v).padStart(3, "0"))).join(" | ")} → « ${enLettres(n)} ».`,
    `${fr(n)} se lit « ${enLettres(n)} ».`,
  );
};

/* ═════════════ Les dessins ═════════════ */
const ENTETES = [
  "c. de milliards", "d. de milliards", "u. de milliards",
  "c. de millions", "d. de millions", "u. de millions",
  "c. de mille", "d. de mille", "u. de mille",
  "centaines", "dizaines", "unités",
];
export type Ligne = number | string | null;
type OptTab = { labels?: string[]; cols?: number; colonne?: number };

const brutDe = (lignes: Ligne[]) => lignes.map((l) => (l === null ? "" : typeof l === "number" ? String(l) : l));

/** Le tableau de numération, une colonne par chiffre (null = ligne vide, une chaîne peut porter « ▢ »). */
export function tabNum(lignes: Ligne[], o: OptTab = {}): CanvasFigure {
  const brut = brutDe(lignes);
  const cols = Math.min(12, Math.max(o.cols ?? 6, ...brut.map((s) => s.length)));
  return {
    kind: "tableau_donnees",
    title: "Tableau de numération",
    ...(o.labels ? { coin: "" } : {}),
    headers: ENTETES.slice(12 - cols),
    rows: brut.map((s, i) => ({
      ...(o.labels ? { label: o.labels[i] } : {}),
      values: s.padStart(cols, " ").split("").map((c) => (c === " " ? "" : c)),
    })),
    ...(o.colonne !== undefined ? { highlight: { col: cols - 1 - o.colonne } } : {}),
    display: { compact: true, striped: false },
  } as CanvasFigure;
}

/** Le tableau des CLASSES : une colonne par classe, trois chiffres par case. */
export function tabClasses(lignes: Ligne[], o: OptTab = {}): CanvasFigure {
  const brut = brutDe(lignes);
  const ncl = Math.min(4, Math.max(Math.ceil((o.cols ?? 7) / 3), ...brut.map((s) => Math.ceil(s.length / 3))));
  const coupe = (s: string) => {
    const g: string[] = [];
    for (let i = s.length; i > 0; i -= 3) g.unshift(s.slice(Math.max(0, i - 3), i));
    while (g.length < ncl) g.unshift("");
    return g;
  };
  return {
    kind: "tableau_donnees",
    title: "Tableau des classes",
    ...(o.labels ? { coin: "" } : {}),
    headers: ["milliards", "millions", "mille", "unités"].slice(4 - ncl),
    rows: brut.map((s, i) => ({ ...(o.labels ? { label: o.labels[i] } : {}), values: coupe(s) })),
    display: { compact: true, striped: false },
  } as CanvasFigure;
}

/** Le bon tableau : une colonne par chiffre jusqu'à 9 chiffres, les classes au-delà. */
export function tab(lignes: Ligne[], o: OptTab = {}): CanvasFigure {
  const len = Math.max(o.cols ?? 0, ...brutDe(lignes).map((s) => s.length));
  return len <= 9 ? tabNum(lignes, o) : tabClasses(lignes, o);
}

export function droiteN(min: number, max: number, step: number, ecrites: number[], points: { value: number; label: string }[]): CanvasFigure {
  return {
    kind: "number_line",
    size: { width: 340, height: 100 },
    min,
    max,
    step,
    valeursEcrites: ecrites,
    points,
    display: { showTicks: true, showValues: true, showPoints: true, showPointLabels: true, showZero: true },
  } as CanvasFigure;
}

/** La table de k en une ligne : k × 1 … k × 10. */
export const tableDe = (k: number): CanvasFigure =>
  ({
    kind: "tableau_donnees",
    title: `La table de ${k}`,
    headers: Array.from({ length: 10 }, (_, i) => `× ${i + 1}`),
    rows: [{ values: Array.from({ length: 10 }, (_, i) => k * (i + 1)) }],
    display: { compact: true, striped: false },
  }) as CanvasFigure;

export const barrePaquets = (k: number, total: string, cont: string): CanvasFigure =>
  ({
    kind: "schema_barre",
    total,
    parts: [
      { label: `1 ${cont}`, value: String(k) },
      { label: `1 ${cont}`, value: String(k) },
      { label: "…", unknown: true },
    ],
    display: { showTotal: true, showPartLabels: true, showValues: true, showQuestion: false },
  }) as CanvasFigure;

/* ═════════════ Les situations ═════════════ */

/** Des nombres de la vie : {n} reçoit le nombre ; k = nombre de chiffres au plus. */
export const VIE: { t: string; k: number }[] = [
  { t: "Un pays compte {n} habitants.", k: 9 },
  { t: "Une grande ville compte {n} habitants.", k: 8 },
  { t: "Une vidéo de danse a été vue {n} fois.", k: 9 },
  { t: "Une sonde spatiale a parcouru {n} km.", k: 10 },
  { t: "Une chanteuse a été écoutée {n} fois en streaming.", k: 10 },
  { t: "Un aéroport a accueilli {n} voyageurs cette année.", k: 8 },
  { t: "Une usine fabrique {n} bouchons par an.", k: 9 },
  { t: "Un jeu vidéo a été téléchargé {n} fois.", k: 9 },
  { t: "Une entreprise de transport a livré {n} colis.", k: 9 },
  { t: "Un architecte construit un stade à {n} euros.", k: 9 },
  { t: "Une banque alimentaire a distribué {n} repas.", k: 8 },
  { t: "Un parc d’attractions a reçu {n} visiteurs en dix ans.", k: 8 },
  { t: "Une apicultrice estime ses abeilles à {n}.", k: 7 },
  { t: "Un pilote de ligne a parcouru {n} km dans sa carrière.", k: 8 },
  { t: "Une maison d’édition a imprimé {n} livres.", k: 8 },
  { t: "Un club de foot a {n} abonnés sur internet.", k: 8 },
  { t: "Une forêt compte {n} arbres.", k: 9 },
  { t: "Le cœur d’une personne bat environ {n} fois en un mois.", k: 7 },
  { t: "Une région a récolté {n} kg de pommes.", k: 9 },
  { t: "Une plateforme de musique a {n} utilisateurs.", k: 10 },
  { t: "Un satellite est à {n} m d’altitude.", k: 8 },
  { t: "Un musée national a reçu {n} visiteurs depuis son ouverture.", k: 9 },
  { t: "Un fleuve déverse {n} litres d’eau par heure.", k: 10 },
  { t: "Une infirmière a marché {n} pas en dix ans.", k: 8 },
  { t: "Les supporters d’une équipe ont envoyé {n} messages.", k: 7 },
  { t: "Le Piton de la Fournaise a reçu {n} visiteurs en vingt ans.", k: 7 },
];

export const PRENOMS = ["Léa", "Hugo", "Inès", "Noé", "Zoé", "Adam", "Lina", "Tom", "Jade", "Sami", "Maya", "Yanis", "Chloé", "Enzo", "Nour", "Théo"];

/** Des paquets égaux : t porte {N} et {k}, p seulement {k}. */
export const PAQUETS: { t: string; p: string; cont: string; f: boolean; obj: string }[] = [
  { t: "Une fleuriste a {N} roses. Elle fait des bouquets de {k} roses.", p: "Une fleuriste fait des bouquets de {k} roses.", cont: "bouquets", f: false, obj: "roses" },
  { t: "Un pâtissier a cuit {N} macarons. Il les range par boîtes de {k}.", p: "Un pâtissier range ses macarons par boîtes de {k}.", cont: "boîtes", f: true, obj: "macarons" },
  { t: "Une maraîchère a {N} tomates. Elle remplit des cagettes de {k} tomates.", p: "Une maraîchère remplit des cagettes de {k} tomates.", cont: "cagettes", f: true, obj: "tomates" },
  { t: "Un professeur de sport a {N} élèves. Il fait des équipes de {k}.", p: "Un professeur de sport fait des équipes de {k} élèves.", cont: "équipes", f: true, obj: "élèves" },
  { t: "Un libraire reçoit {N} livres. Il les met en piles de {k}.", p: "Un libraire met ses livres en piles de {k}.", cont: "piles", f: true, obj: "livres" },
  { t: "Une éleveuse a ramassé {N} œufs. Elle les range par boîtes de {k}.", p: "Une éleveuse range ses œufs par boîtes de {k}.", cont: "boîtes", f: true, obj: "œufs" },
  { t: "Un chocolatier a fait {N} chocolats. Il remplit des ballotins de {k}.", p: "Un chocolatier remplit des ballotins de {k} chocolats.", cont: "ballotins", f: false, obj: "chocolats" },
  { t: "Une jardinière a {N} plants de fraisiers. Elle les plante en rangées de {k}.", p: "Une jardinière plante ses fraisiers en rangées de {k}.", cont: "rangées", f: true, obj: "plants" },
  { t: "Un pharmacien a {N} pansements. Il en met {k} par boîte.", p: "Un pharmacien met {k} pansements par boîte.", cont: "boîtes", f: true, obj: "pansements" },
  { t: "Une couturière a {N} boutons. Elle les coud sur des cartes de {k}.", p: "Une couturière coud ses boutons sur des cartes de {k}.", cont: "cartes", f: true, obj: "boutons" },
  { t: "Pour la kermesse, on a {N} sucettes. On fait des sachets de {k} sucettes.", p: "Pour la kermesse, on fait des sachets de {k} sucettes.", cont: "sachets", f: false, obj: "sucettes" },
  { t: "Un apiculteur a {N} pots de miel. Il les range dans des cartons de {k}.", p: "Un apiculteur range ses pots de miel dans des cartons de {k}.", cont: "cartons", f: false, obj: "pots" },
  { t: "Une bibliothécaire a {N} bandes dessinées. Elle en met {k} par étagère.", p: "Une bibliothécaire met {k} bandes dessinées par étagère.", cont: "étagères", f: true, obj: "bandes dessinées" },
  { t: "Un boulanger a {N} croissants. Il les pose sur des plateaux de {k}.", p: "Un boulanger pose ses croissants sur des plateaux de {k}.", cont: "plateaux", f: false, obj: "croissants" },
  { t: "Une animatrice a {N} crayons. Elle remplit des pots de {k} crayons.", p: "Une animatrice remplit des pots de {k} crayons.", cont: "pots", f: false, obj: "crayons" },
  { t: "Un mécanicien a {N} vis. Il les range par sachets de {k}.", p: "Un mécanicien range ses vis par sachets de {k}.", cont: "sachets", f: false, obj: "vis" },
  { t: "Une vendeuse du marché a {N} mangues. Elle les met en sachets de {k}.", p: "Une vendeuse du marché met ses mangues en sachets de {k}.", cont: "sachets", f: false, obj: "mangues" },
  { t: "Un chauffeur de car emmène {N} supporters. Chaque minibus prend {k} personnes.", p: "Chaque minibus d’un club prend {k} supporters.", cont: "minibus", f: false, obj: "supporters" },
];
export const singulier = (cont: string) => (cont === "minibus" ? "minibus" : cont.replace(/x$|s$/, ""));
