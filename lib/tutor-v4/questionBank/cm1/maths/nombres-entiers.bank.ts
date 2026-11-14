// lib/tutor-v4/question-banks/maths/cm1/nombres-entiers.bank.ts

import type { CanvasFigure, TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { melangeEnPlace } from "@/lib/tutor-v4/questionBank/melange";
import { atelier, entre, etapes, fr, melange, qcm, qcmN, tournure, un } from "./trous-outils";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return melangeEnPlace([...items]);
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

function formatNumber(n: number): string {
  return n.toLocaleString("fr-FR");
}

function exp(
  definition: string,
  methode: string,
  calcul: string,
  conclusion: string
) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

/* ════════════════════════════════════════════════════════════════════
   GABARITS DU 14/11/2026 — les six micros historiques de la notion
   (lire, comparer, décomposer, arrondir, multiples, défi).
   Avant : 3 à 12 squelettes par micro, 13 à 18 répétitions sur 20, aucun
   dessin, et 30 à 45 % des énoncés « À La Réunion ». Chaque étoile servie a
   maintenant plusieurs gabarits SITUATION × TOURNURE × nombres, presque tous
   avec un dessin :
     - le TABLEAU DE NUMÉRATION (`tableau_donnees`, classe des mille | classe
       des unités) : lire, comparer colonne par colonne, décomposer ;
     - la DROITE GRADUÉE (`number_line`) : arrondir, encadrer un défi ;
     - la TABLE de k en ligne (`tableau_donnees`) : les multiples ;
     - la BARRE (`schema_barre`) : les paquets égaux.
   ⛔ Le dessin porte les données, jamais la réponse (tableau VIDE quand on
   demande d'écrire un nombre en chiffres).
   ⛔ Les leurres sont de vraies erreurs : oublier un zéro de classe, écrire
   « douze mille trente » 1 230, confondre chiffre et nombre des centaines,
   tronquer au lieu d'arrondir, le premier chiffre plus grand dans un nombre
   plus court…
   ════════════════════════════════════════════════════════════════════ */

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

/** En lettres, orthographe traditionnelle (celle des items figés) : « deux cents », « deux cent mille », « quatre-vingt mille ». */
function enLettres(n: number): string {
  if (n === 0) return "zéro";
  if (n === 1000000) return "un million";
  const m = Math.floor(n / 1000);
  const r = n % 1000;
  const mots: string[] = [];
  if (m === 1) mots.push("mille");
  else if (m > 1) mots.push(`${moinsDeMille(m, false)} mille`);
  if (r > 0) mots.push(moinsDeMille(r, true));
  return mots.join(" ");
}

/** Un nombre de k chiffres ; avec la probabilité pZero, au moins un zéro à l'intérieur (le piège de la notion). */
function nombre(k: number, pZero = 0.6): number {
  const veutZero = Math.random() < pZero;
  for (let essai = 0; essai < 60; essai++) {
    const c = [entre(1, 9), ...Array.from({ length: k - 1 }, () => (Math.random() < 0.3 ? 0 : entre(1, 9)))];
    if (c.slice(1).includes(0) === veutZero) return Number(c.join(""));
  }
  return Number([entre(1, 9), ...Array.from({ length: k - 1 }, () => entre(1, 9))].join(""));
}

/** Les vraies erreurs d'écriture d'un grand nombre. */
function fauxEcrits(n: number): number[] {
  const s = String(n);
  const t = Math.floor(n / 1000);
  const r = n % 1000;
  const f: number[] = [];
  if (t > 0 && r > 0 && r < 100) f.push(Number(`${t}${r}`)); // « douze mille trente » → 1 230 : la classe des unités sans ses zéros
  if (t > 0) f.push(t * 10000 + r); // un zéro de trop : 120 030
  if (t > 0 && r > 0 && r < 100) f.push(t * 1000 + r * 10); // 30 mis aux centaines : 12 300
  if (t > 0 && r === 0) f.push(t * 100, t * 10);
  const iz = s.indexOf("0", 1);
  if (iz > 0) f.push(Number(s.slice(0, iz) + s.slice(iz + 1))); // un zéro oublié
  const i = entre(1, Math.max(1, s.length - 2));
  if (s[i] !== s[i + 1] && i + 1 < s.length) f.push(Number(s.slice(0, i) + s[i + 1] + s[i] + s.slice(i + 2))); // deux chiffres échangés
  const j = entre(1, s.length - 1);
  f.push(Number(s.slice(0, j) + "0" + s.slice(j))); // un zéro ajouté
  const garde = (l: number[]) => [...new Set(l.filter((x) => x >= 100 && x < 1000000 && x !== n))];
  const vrais = garde(f);
  if (vrais.length >= 3) return vrais;
  // Pas de zéro à oublier : deux chiffres échangés ailleurs, un chiffre de trop ou de moins.
  const plus: number[] = [n * 10, Math.floor(n / 10), t * 10000 + r, t * 100 + r];
  for (let k = 0; k + 1 < s.length; k++) if (s[k] !== s[k + 1]) plus.push(Number(s.slice(0, k) + s[k + 1] + s[k] + s.slice(k + 2)));
  return garde([...vrais, ...melange(garde(plus).filter((x) => String(x)[0] !== "0" && !vrais.includes(x)))]);
}

const ENTETES = ["c. de mille", "d. de mille", "u. de mille", "centaines", "dizaines", "unités"];
type Ligne = number | string | null;

/** Le tableau de numération : une ligne par nombre (null = ligne vide, une chaîne peut porter « ▢ »). */
function tabNum(lignes: Ligne[], o: { labels?: string[]; cols?: number; colonne?: number } = {}): CanvasFigure {
  const brut = lignes.map((l) => (l === null ? "" : typeof l === "number" ? String(l) : l));
  const cols = Math.min(6, Math.max(o.cols ?? 4, ...brut.map((s) => s.length)));
  return {
    kind: "tableau_donnees",
    title: "Tableau de numération",
    ...(o.labels ? { coin: "" } : {}),
    headers: ENTETES.slice(6 - cols),
    rows: brut.map((s, i) => ({
      ...(o.labels ? { label: o.labels[i] } : {}),
      values: s.padStart(cols, " ").split("").map((c) => (c === " " ? "" : c)),
    })),
    ...(o.colonne !== undefined ? { highlight: { col: cols - 1 - o.colonne } } : {}),
    display: { compact: true, striped: false },
  } as CanvasFigure;
}

function droiteN(min: number, max: number, step: number, ecrites: number[], points: { value: number; label: string }[]): CanvasFigure {
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
const tableDe = (k: number): CanvasFigure =>
  ({
    kind: "tableau_donnees",
    title: `La table de ${k}`,
    headers: Array.from({ length: 10 }, (_, i) => `× ${i + 1}`),
    rows: [{ values: Array.from({ length: 10 }, (_, i) => k * (i + 1)) }],
    display: { compact: true, striped: false },
  }) as CanvasFigure;

const barrePaquets = (k: number, total: string, cont: string): CanvasFigure =>
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

const RANGS = [
  { nom: "unités", un: "unité", val: 1 },
  { nom: "dizaines", un: "dizaine", val: 10 },
  { nom: "centaines", un: "centaine", val: 100 },
  { nom: "unités de mille", un: "unité de mille", val: 1000 },
  { nom: "dizaines de mille", un: "dizaine de mille", val: 10000 },
  { nom: "centaines de mille", un: "centaine de mille", val: 100000 },
];
const chiffreDe = (n: number, r: number) => Math.floor(n / 10 ** r) % 10;
const arrondi = (n: number, p: number) => Math.floor(n / p + 0.5) * p;
const grouper = (s: string) => {
  const g: string[] = [];
  for (let i = s.length; i > 0; i -= 3) g.unshift(s.slice(Math.max(0, i - 3), i));
  return g.join(" ");
};
/** La décomposition additive : 4 000 + 500 + 80 + 2 (les zéros ne s'écrivent pas). */
const decomposition = (n: number) =>
  [...String(n)]
    .map((c, i, t) => Number(c) * 10 ** (t.length - 1 - i))
    .filter((v) => v > 0)
    .map(fr)
    .join(" + ");
const termes = (n: number) =>
  [...String(n)].map((c, i, t) => Number(c) * 10 ** (t.length - 1 - i)).filter((v) => v > 0);

/** Quatre nombres voisins de k chiffres : deux chiffres échangés, un chiffre changé. */
function voisins(k: number, combien = 4): number[] {
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

function explComparer(a: number, b: number): string {
  const sa = String(a);
  const sb = String(b);
  if (sa.length !== sb.length)
    return `${fr(a)} a ${sa.length} chiffres et ${fr(b)} en a ${sb.length} : le nombre qui a le plus de chiffres est le plus grand.`;
  const i = [...sa].findIndex((c, k) => c !== sb[k]);
  if (i < 0) return `les deux nombres ont les mêmes chiffres aux mêmes places : ils sont égaux.`;
  return `même nombre de chiffres ; de gauche à droite, le premier chiffre différent est celui des ${RANGS[sa.length - 1 - i].nom} : ${sa[i]} et ${sb[i]}.`;
}

/** Des nombres de la vie : {n} reçoit le nombre, en chiffres ou en lettres. */
const VIE: { t: string; k: number }[] = [
  { t: "Une ville compte {n} habitants.", k: 6 },
  { t: "Un stade peut accueillir {n} spectateurs.", k: 5 },
  { t: "Une bibliothécaire a rangé {n} livres.", k: 5 },
  { t: "Un boulanger a vendu {n} baguettes cette année.", k: 5 },
  { t: "Une vidéo de skate a été vue {n} fois.", k: 6 },
  { t: "Le compteur du taxi de Karim affiche {n} km.", k: 6 },
  { t: "Une apicultrice élève {n} abeilles.", k: 6 },
  { t: "Une pilote d’avion a parcouru {n} km cette année.", k: 6 },
  { t: "Dans un jeu vidéo, Lina a marqué {n} points.", k: 6 },
  { t: "Une usine fabrique {n} bouteilles par semaine.", k: 6 },
  { t: "Un concert a réuni {n} personnes.", k: 5 },
  { t: "Un éleveur a ramassé {n} œufs dans l’année.", k: 5 },
  { t: "Une architecte dessine une maison à {n} euros.", k: 6 },
  { t: "Un musée a reçu {n} visiteurs.", k: 6 },
  { t: "Le cuisinier de la cantine a servi {n} repas cette année.", k: 5 },
  { t: "Une agricultrice a planté {n} salades.", k: 5 },
  { t: "Un club de foot compte {n} supporters.", k: 5 },
  { t: "Une forêt compte {n} arbres.", k: 6 },
  { t: "Un camion de livraison a roulé {n} km.", k: 6 },
  { t: "Une infirmière a fait {n} pas en un mois.", k: 6 },
  { t: "Un marathon compte {n} coureurs.", k: 5 },
  { t: "Une plage a accueilli {n} baigneurs cet été.", k: 5 },
  { t: "Un vétérinaire a soigné {n} animaux en dix ans.", k: 5 },
  { t: "Le marché de Saint-Paul a reçu {n} visiteurs.", k: 5 },
];

const PRENOMS = ["Léa", "Hugo", "Inès", "Noé", "Zoé", "Adam", "Lina", "Tom", "Jade", "Sami", "Maya", "Yanis", "Chloé", "Enzo", "Nour", "Théo"];

/** Des paquets égaux : t porte {N} et {k}, p seulement {k}. */
const PAQUETS: { t: string; p: string; cont: string; f: boolean; obj: string }[] = [
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
const singulier = (cont: string) => (cont === "minibus" ? "minibus" : cont.replace(/x$|s$/, ""));

/* ═════════════════ entier_lire ═════════════════ */
const GL = atelier("cm1", "nombre_entier", "entier_lire", "cm1_");
const EN_CHIFFRES = ["Écris en chiffres : « {w} ».", "Comment s’écrit « {w} » en chiffres ?", "Quel nombre s’écrit « {w} » ?", "Choisis l’écriture en chiffres de « {w} ».", "« {w} » : quelle écriture en chiffres est juste ?", "Retrouve en chiffres le nombre « {w} »."];
const INTRO_TABLEAU = ["Pense au tableau de numération.", "Une classe, c’est trois chiffres.", "Attention aux zéros.", "Le tableau peut t’aider.", ""];
const explEcrire = (n: number) =>
  etapes(
    `on écrit la classe des mille, puis la classe des unités avec TROIS chiffres : une place vide reçoit un zéro.`,
    n >= 1000 ? `${enLettres(Math.floor(n / 1000) === 1 ? 1000 : Math.floor(n / 1000) * 1000)} → ${fr(Math.floor(n / 1000))} dans la classe des mille ; ${n % 1000 === 0 ? "rien ensuite → 000" : `${enLettres(n % 1000)} → ${String(n % 1000).padStart(3, "0")}`} dans la classe des unités.` : `${enLettres(n)} → ${fr(n)}.`,
    `le nombre s’écrit ${fr(n)}.`,
  );
const explLire = (n: number) =>
  etapes(
    `on lit la classe des mille, on dit « mille », puis on lit la classe des unités.`,
    `${fr(Math.floor(n / 1000))} | ${String(n % 1000).padStart(3, "0")} → « ${enLettres(n)} ».`,
    `${fr(n)} se lit « ${enLettres(n)} ».`,
  );

const entierLireGab: TutorBankItemV4[] = [
  GL(20, 1, "Écris d’abord la classe des mille, puis la classe des unités avec ses trois chiffres.", () => {
    const n = nombre(un([4, 5]));
    return {
      text: tournure(INTRO_TABLEAU, EN_CHIFFRES).replace("{w}", enLettres(n)),
      ...qcmN(n, fauxEcrits(n), "", 1000),
      canvas: tabNum([null], { cols: 6 }),
      explanation: explEcrire(n),
    };
  }),
  GL(21, 1, "Lis la classe des mille, dis « mille », puis lis la classe des unités.", () => {
    const n = nombre(un([4, 5]));
    return {
      text: tournure(["Le nombre {n} est rangé dans le tableau.", "Voici {n} dans le tableau.", "Regarde {n} dans le tableau.", "Observe le tableau : on y lit {n}.", "Dans le tableau, on a écrit {n}."], ["Comment se lit-il ?", "Comment l’écrit-on en lettres ?", "Quelle est son écriture en lettres ?", "Choisis la bonne lecture.", "Quelle phrase le lit correctement ?"]).replace("{n}", fr(n)),
      ...qcm(enLettres(n), fauxEcrits(n).map(enLettres)),
      canvas: tabNum([n]),
      explanation: explLire(n),
    };
  }),
  GL(22, 1, "Repère la colonne dans le tableau, puis lis le chiffre écrit dedans.", () => {
    const n = nombre(un([4, 5, 6]), 0.4);
    const k = String(n).length;
    const r = entre(0, k - 1);
    const c = chiffreDe(n, r);
    const nom = RANGS[r].nom;
    return {
      text: tournure(["Regarde le tableau.", "Observe le tableau.", "Chaque chiffre est dans sa colonne.", "Voici un tableau de numération.", ""], [`Dans {n}, quel est le chiffre des ${nom} ?`, `Quel est le chiffre des ${nom} de {n} ?`, `Quel chiffre est aux ${nom} dans {n} ?`, `Dans {n}, quel chiffre occupe la colonne des ${nom} ?`]).replace("{n}", fr(n)),
      ...qcm(String(c), [...String(n)].filter((x) => x !== String(c)).concat(String((c + 1) % 10), String((c + 9) % 10))),
      canvas: tabNum([n]),
      explanation: etapes(`on cherche la colonne des ${nom} dans le tableau.`, `dans ${fr(n)}, la colonne des ${nom} contient ${c}.`, `le chiffre des ${nom} est ${c}.`),
    };
  }),
  GL(23, 2, "Écris le nombre en chiffres dans ta tête, puis compte ses zéros.", () => {
    const n = nombre(un([5, 6]), 1);
    const z = [...String(n)].filter((x) => x === "0").length;
    return {
      text: tournure([`Pour écrire « {w} » en chiffres,`, `Quand on écrit « {w} » en chiffres,`, `On écrit « {w} » avec des chiffres.`], ["combien de zéros faut-il ?", "combien de zéros écrit-on ?", "combien de 0 y a-t-il ?"]).replace("{w}", enLettres(n)).replace(". combien", ". Combien"),
      ...qcmN(z, [z + 1, z - 1, z + 2, z + 3], "", 1),
      canvas: tabNum([null], { cols: 6 }),
      explanation: etapes(`on écrit le nombre en chiffres, classe par classe : chaque place vide reçoit un zéro.`, `« ${enLettres(n)} » s’écrit ${fr(n)}.`, `il y a ${z} zéro${z > 1 ? "s" : ""}.`),
    };
  }),
  GL(24, 2, "Jusqu’au million : la classe des mille a trois chiffres, la classe des unités aussi.", () => {
    const n = nombre(6);
    return {
      text: tournure(["Un grand nombre !", "Attention aux zéros.", "Pense aux deux classes.", "Prends le tableau.", ""], EN_CHIFFRES).replace("{w}", enLettres(n)),
      ...qcmN(n, fauxEcrits(n), "", 10000),
      canvas: tabNum([null], { cols: 6 }),
      explanation: explEcrire(n),
    };
  }),
  GL(25, 2, "Le chiffre des centaines est UN chiffre ; le nombre de centaines compte tout ce qui est à sa gauche aussi.", () => {
    const n = nombre(un([5, 6]), 0.4);
    const r = un([1, 2, 3]);
    const nom = r === 3 ? "milliers" : RANGS[r].nom;
    const juste = Math.floor(n / 10 ** r);
    return {
      text: tournure(["Regarde le tableau.", "Attention : nombre, pas chiffre.", "Observe bien.", ""], [`Combien y a-t-il de ${nom} en tout dans {n} ?`, `Quel est le nombre de ${nom} de {n} ?`, `Dans {n}, combien de ${nom} en tout ?`, `Combien de ${nom} contient {n} ?`]).replace("{n}", fr(n)),
      ...qcmN(juste, [chiffreDe(n, r), Math.floor(n / 10 ** (r + 1)), Math.floor(n / 10 ** (r - 1)), n % 10 ** (r + 1)], "", 1),
      canvas: tabNum([n]),
      explanation: etapes(`le CHIFFRE des ${nom} est ${chiffreDe(n, r)} ; le NOMBRE de ${nom} se lit avec tous les chiffres à sa gauche.`, `${fr(n)} : on cache les ${r} dernier${r > 1 ? "s" : ""} chiffre${r > 1 ? "s" : ""} et on lit ${fr(juste)}.`, `il y a ${fr(juste)} ${nom} en tout.`),
    };
  }),
  GL(26, 2, "Écris la classe des mille, puis trois chiffres pour la classe des unités.", () => {
    const c = un(VIE);
    const n = nombre(entre(4, c.k));
    return {
      text: `${c.t.replace("{n}", `« ${enLettres(n)} »`)} ${un(["Comment écrit-on ce nombre en chiffres ?", "Écris ce nombre en chiffres.", "Quelle est son écriture en chiffres ?", "Choisis l’écriture en chiffres.", "Comment le noter en chiffres ?"])}`,
      ...qcmN(n, fauxEcrits(n), "", 1000),
      canvas: tabNum([null], { cols: 6 }),
      explanation: explEcrire(n),
    };
  }),
  GL(27, 2, "Lis la classe des mille, dis « mille », puis lis la classe des unités.", () => {
    const c = un(VIE);
    const n = nombre(entre(4, c.k));
    return {
      text: `${c.t.replace("{n}", fr(n))} ${un(["Comment lit-on ce nombre ?", "Comment s’écrit ce nombre en lettres ?", "Quelle phrase dit ce nombre ?", "Comment le dire à voix haute ?", "Choisis sa lecture."])}`,
      ...qcm(enLettres(n), fauxEcrits(n).map(enLettres)),
      canvas: tabNum([n]),
      explanation: explLire(n),
    };
  }),
];

/* ═════════════════ entier_comparer ═════════════════ */
const GC = atelier("cm1", "nombre_entier", "entier_comparer", "cm1_");
const HINT_COMP = "Compte d’abord les chiffres. S’il y en a autant, compare de gauche à droite.";

const entierComparerGab: TutorBankItemV4[] = [
  GC(30, 1, HINT_COMP, () => {
    let a: number;
    let b: number;
    const cas = Math.random();
    if (cas < 0.25) {
      const k = entre(4, 5);
      a = entre(6, 9) * 10 ** (k - 1) + entre(0, 10 ** (k - 1) - 1);
      b = 10 ** k + entre(0, 3 * 10 ** (k - 1));
    } else if (cas < 0.33) {
      a = nombre(entre(4, 6), 0.5);
      b = a;
    } else [a, b] = voisins(entre(4, 6), 2);
    if (Math.random() < 0.5) [a, b] = [b, a];
    const s = a > b ? ">" : a < b ? "<" : "=";
    return {
      text: tournure(["Compare ces deux nombres.", "Regarde les deux lignes du tableau.", "Compte d’abord les chiffres.", "Attention aux colonnes.", ""], ["Complète : {a} … {b}", "{a} … {b} : quel signe faut-il ?", "Quel signe va entre {a} et {b} ?", "Entre {a} et {b}, choisis <, > ou =."]).replace("{a}", fr(a)).replace("{b}", fr(b)),
      ...qcm(s, ["<", ">", "="]),
      canvas: tabNum([a, b]),
      explanation: etapes(`on compte les chiffres, puis on compare de gauche à droite.`, explComparer(a, b), `${fr(a)} ${s} ${fr(b)}.`),
    };
  }),
  GC(31, 1, HINT_COMP, () => {
    const ns = voisins(entre(4, 6));
    const grand = Math.random() < 0.5;
    const juste = grand ? Math.max(...ns) : Math.min(...ns);
    const mot = grand ? "grand" : "petit";
    return {
      text: tournure(["Voici quatre nombres.", "Regarde le tableau.", "Compare ces nombres colonne par colonne.", "Quatre nombres sont rangés dans le tableau.", ""], [`Quel est le plus ${mot} ?`, `Lequel est le plus ${mot} ?`, `Quel nombre est le plus ${mot} ?`, `Trouve le plus ${mot} de ces nombres.`]),
      ...qcm(fr(juste), ns.filter((x) => x !== juste).map(fr)),
      canvas: tabNum(ns),
      explanation: etapes(`ils ont tous autant de chiffres : on compare de gauche à droite, colonne par colonne.`, `rangés : ${[...ns].sort((x, y) => x - y).map(fr).join(" < ")}.`, `le plus ${mot} est ${fr(juste)}.`),
    };
  }),
  GC(32, 1, "Écris d’abord le nombre en lettres avec des chiffres, puis compare.", () => {
    let [a, b] = voisins(5, 2);
    if (Math.random() < 0.15) b = a;
    const s = a > b ? ">" : a < b ? "<" : "=";
    return {
      text: tournure(["Un nombre est écrit en lettres.", "Lis bien les deux nombres.", "Attention aux zéros.", ""], ["Complète : « {w} » … {b}", "Quel signe va entre « {w} » et {b} ?", "« {w} » … {b} : quel est le bon signe ?"]).replace("{w}", enLettres(a)).replace("{b}", fr(b)),
      ...qcm(s, ["<", ">", "="]),
      explanation: etapes(`on écrit d’abord « ${enLettres(a)} » en chiffres : ${fr(a)}.`, explComparer(a, b), `« ${enLettres(a)} » ${s} ${fr(b)}.`),
    };
  }),
  GC(33, 2, "Range d’abord du plus petit au plus grand, en comparant de gauche à droite.", () => {
    const ns = voisins(entre(4, 6));
    const asc = [...ns].sort((x, y) => x - y);
    const croissant = Math.random() < 0.5;
    const bon = croissant ? asc : [...asc].reverse();
    const ecr = (l: number[]) => l.map(fr).join(" ; ");
    const echange = (l: number[], i: number) => {
      const t = [...l];
      [t[i], t[i + 1]] = [t[i + 1], t[i]];
      return t;
    };
    const ordre = croissant ? "croissant (du plus petit au plus grand)" : "décroissant (du plus grand au plus petit)";
    return {
      text: tournure(["Regarde le tableau.", "Compare colonne par colonne.", "Quatre nombres à ranger.", ""], [`Quel rangement est dans l’ordre ${ordre} ?`, `Range ces nombres dans l’ordre ${ordre}.`, `Choisis la liste rangée dans l’ordre ${ordre}.`]),
      ...qcm(ecr(bon), [ecr([...bon].reverse()), ecr(echange(bon, 1)), ecr(echange(bon, 0)), ecr(echange(bon, 2))]),
      canvas: tabNum(ns),
      explanation: etapes(`on compare les nombres de gauche à droite pour trouver le plus petit, puis le suivant…`, `${asc.map(fr).join(" < ")}.`, `dans l’ordre ${croissant ? "croissant" : "décroissant"} : ${ecr(bon)}.`),
    };
  }),
  GC(34, 2, HINT_COMP, () => {
    const c = un([
      { t: "Quatre villes comptent leurs habitants.", plus: "Quelle ville a le plus d’habitants ?", moins: "Quelle ville a le moins d’habitants ?", noms: ["Belair", "Montvert", "Clairval", "Pontneuf", "Rochebrune"] },
      { t: "Des youtubeurs comparent leurs abonnés.", plus: "Qui a le plus d’abonnés ?", moins: "Qui a le moins d’abonnés ?", noms: PRENOMS },
      { t: "Des joueurs comparent leurs scores.", plus: "Qui a le meilleur score ?", moins: "Qui a le plus petit score ?", noms: PRENOMS },
      { t: "Des classes ramassent des bouchons pour une association.", plus: "Quelle classe en a ramassé le plus ?", moins: "Quelle classe en a ramassé le moins ?", noms: ["CM1 A", "CM1 B", "CM2 A", "CM2 B", "CE2"] },
      { t: "Une entreprise note les kilomètres de ses camions.", plus: "Quel camion a roulé le plus ?", moins: "Quel camion a roulé le moins ?", noms: ["Camion bleu", "Camion rouge", "Camion vert", "Camion jaune"] },
      { t: "Des fermes comptent les œufs de l’année.", plus: "Quelle ferme a le plus d’œufs ?", moins: "Quelle ferme a le moins d’œufs ?", noms: ["Ferme du Pré", "Ferme du Lac", "Ferme du Bois", "Ferme des Pins"] },
      { t: "Des musées comptent leurs visiteurs.", plus: "Quel musée a eu le plus de visiteurs ?", moins: "Quel musée a eu le moins de visiteurs ?", noms: ["Musée des sciences", "Musée de la mer", "Musée du jouet", "Musée de l’espace"] },
      { t: "Des coureuses notent leurs pas de la semaine.", plus: "Qui a fait le plus de pas ?", moins: "Qui a fait le moins de pas ?", noms: PRENOMS },
      { t: "Des libraires comptent les livres vendus.", plus: "Qui a vendu le plus de livres ?", moins: "Qui a vendu le moins de livres ?", noms: PRENOMS },
      { t: "Des montagnes sont mesurées en mètres.", plus: "Quelle montagne est la plus haute ?", moins: "Quelle montagne est la moins haute ?", noms: ["Pic Rouge", "Mont Gris", "Pic Blanc", "Mont Bleu"] },
      { t: "Des parcs comptent leurs arbres.", plus: "Quel parc a le plus d’arbres ?", moins: "Quel parc a le moins d’arbres ?", noms: ["Parc Nord", "Parc Sud", "Parc Est", "Parc Ouest"] },
      { t: "Des chanteuses comptent les écoutes de leur chanson.", plus: "Quelle chanteuse a le plus d’écoutes ?", moins: "Quelle chanteuse a le moins d’écoutes ?", noms: PRENOMS.filter((_, i) => i % 2 === 0) },
    ]);
    const nb = entre(3, 4);
    const noms = melange([...c.noms]).slice(0, nb);
    const ns = voisins(c.t.includes("montagnes") ? 4 : entre(4, 6), nb);
    const plus = Math.random() < 0.5;
    const iJ = ns.indexOf(plus ? Math.max(...ns) : Math.min(...ns));
    return {
      text: `${c.t} ${plus ? c.plus : c.moins}`,
      ...qcm(noms[iJ], noms.filter((_, i) => i !== iJ)),
      canvas: tabNum(ns, { labels: noms }),
      explanation: etapes(`on compare les nombres de gauche à droite, colonne par colonne.`, `${[...ns].sort((x, y) => x - y).map(fr).join(" < ")}.`, `la réponse est ${noms[iJ]} (${fr(ns[iJ])}).`),
    };
  }),
  GC(35, 2, "Tous les autres chiffres sont pareils : seul le chiffre caché décide.", () => {
    const k = entre(4, 6);
    const plus = Math.random() < 0.5;
    let n = nombre(k, 0.3);
    const i = entre(1, k - 1);
    const s = String(n).split("");
    const d0 = plus ? entre(2, 8) : entre(1, 7);
    s[i] = String(d0);
    n = Number(s.join(""));
    const juste = plus ? entre(d0 + 1, 9) : entre(0, d0 - 1);
    const faux = plus ? [d0, d0 - 1, d0 - 2] : [d0, d0 + 1, d0 + 2];
    const cache = [...s];
    cache[i] = "▢";
    const A = grouper(cache.join(""));
    const signe = plus ? ">" : "<";
    return {
      text: tournure(["Un chiffre est caché.", "Le carré cache un chiffre.", "Regarde le tableau.", ""], [`Quel chiffre peut remplacer ▢ pour que ${A} ${signe} {B} ?`, `Pour avoir ${A} ${signe} {B}, quel chiffre met-on dans ▢ ?`, `${A} ${signe} {B}. Quel chiffre peut se cacher sous ▢ ?`]).replace("{B}", fr(n)),
      ...qcm(String(juste), faux.map(String)),
      canvas: tabNum([cache.join(""), n]),
      explanation: etapes(`les chiffres sont les mêmes partout, sauf dans la colonne des ${RANGS[k - 1 - i].nom}.`, `il faut ▢ ${signe} ${d0} : ${juste} convient, ${d0} donnerait deux nombres égaux.`, `on peut mettre ${juste}.`),
    };
  }),
];

/* ═════════════════ entier_decomposer ═════════════════ */
const GD = atelier("cm1", "nombre_entier", "entier_decomposer", "cm1_");
const explDec = (n: number) => etapes(`chaque chiffre vaut selon sa colonne ; un zéro ne s’écrit pas dans la décomposition.`, `${fr(n)} = ${decomposition(n)}.`, `la décomposition est ${decomposition(n)}.`);

const entierDecomposerGab: TutorBankItemV4[] = [
  GD(40, 1, "Chaque chiffre vaut selon sa colonne : regarde le tableau.", () => {
    const n = nombre(un([4, 5]));
    const t = termes(n);
    const decale = (j: number, f: number) => t.map((v, i) => (i === j ? v * f : v)).map(fr).join(" + ");
    const j = entre(0, t.length - 1);
    return {
      text: tournure(["Regarde le tableau.", "Chaque chiffre a sa valeur.", "Pense aux colonnes.", ""], ["Quelle est la bonne décomposition de {n} ?", "Quelle addition est égale à {n} ?", "Comment décomposer {n} ?", "{n} = … Choisis la bonne décomposition."]).replace("{n}", fr(n)),
      ...qcm(decomposition(n), [...fauxEcrits(n).map(decomposition), decale(j, 10), decale(j, t[j] >= 10 ? 0.1 : 10)]),
      canvas: tabNum([n]),
      explanation: explDec(n),
    };
  }),
  GD(41, 1, "Range chaque nombre dans sa colonne, puis lis le résultat.", () => {
    const n = nombre(un([4, 5]));
    const expr = termes(n).map(fr).join(" + ");
    return {
      text: tournure(["Additionne les valeurs.", "Range les nombres dans le tableau.", "Pense aux colonnes.", ""], ["Complète : {e} = …", "Quel nombre fait {e} ?", "{e}, c’est quel nombre ?", "Calcule {e}."]).replace("{e}", expr),
      ...qcmN(n, fauxEcrits(n), "", 1000),
      canvas: tabNum(termes(n), { cols: String(n).length }),
      explanation: etapes(`chaque nombre va dans sa colonne ; une colonne vide reçoit un zéro.`, `${expr} = ${fr(n)}.`, `le nombre est ${fr(n)}.`),
    };
  }),
  GD(42, 1, "Regarde la colonne du chiffre : elle donne sa valeur.", () => {
    let n = nombre(un([4, 5, 6]), 0.4);
    let r = entre(1, String(n).length - 1);
    let d = chiffreDe(n, r);
    for (let e = 0; (d === 0 || String(n).split(String(d)).length > 2) && e < 30; e++) {
      n = nombre(un([4, 5, 6]), 0.4);
      r = entre(1, String(n).length - 1);
      d = chiffreDe(n, r);
    }
    const v = d * 10 ** r;
    return {
      text: tournure(["Pense au tableau.", "Regarde la colonne du chiffre.", "Chaque chiffre a sa valeur.", ""], ["Dans {n}, que vaut le chiffre {d} ?", "Quelle est la valeur du chiffre {d} dans {n} ?", "Le chiffre {d} de {n} vaut combien ?", "Dans {n}, combien vaut le {d} ?"]).replace("{n}", fr(n)).replace(/\{d\}/g, String(d)),
      ...qcmN(v, [d, d * 10 ** (r - 1), d * 10 ** (r + 1), d * 10 ** (r + 2)], "", 10 ** r),
      canvas: tabNum([n]),
      explanation: etapes(`le chiffre ${d} est dans la colonne des ${RANGS[r].nom}.`, `${d} ${RANGS[r].nom} = ${fr(v)}.`, `le chiffre ${d} vaut ${fr(v)}.`),
    };
  }),
  GD(43, 2, "Un chiffre × la valeur de sa colonne : 4 × 1 000, 5 × 100…", () => {
    const n = nombre(un([4, 5, 6]));
    const mult = (m: number) =>
      [...String(m)]
        .map((c, i, t) => ({ c: Number(c), p: 10 ** (t.length - 1 - i) }))
        .filter((x) => x.c > 0)
        .map((x) => `${x.c} × ${fr(x.p)}`)
        .join(" + ");
    return {
      text: tournure(["Regarde le tableau.", "Pense aux colonnes.", ""], ["Quelle écriture est égale à {n} ?", "Décompose {n} avec des multiplications.", "Quelle décomposition de {n} est juste ?", "{n} = … Choisis la bonne écriture."]).replace("{n}", fr(n)),
      ...qcm(mult(n), fauxEcrits(n).map(mult)),
      canvas: tabNum([n]),
      explanation: etapes(`chaque chiffre est multiplié par la valeur de sa colonne.`, `${fr(n)} = ${mult(n)}.`, `la bonne écriture est ${mult(n)}.`),
    };
  }),
  GD(44, 2, "Place chaque chiffre dans sa colonne ; les colonnes vides reçoivent un zéro.", () => {
    const n = nombre(un([4, 5, 6]), 1);
    const desc = [...String(n)]
      .map((c, i, t) => ({ c: Number(c), r: t.length - 1 - i }))
      .filter((x) => x.c > 0)
      .map((x) => `${x.c} ${x.c > 1 ? RANGS[x.r].nom : RANGS[x.r].un}`);
    const phrase = desc.length > 1 ? `${desc.slice(0, -1).join(", ")} et ${desc[desc.length - 1]}` : desc[0];
    const sansZero = Number(String(n).replace(/0/g, ""));
    return {
      text: un(["Quel nombre a {p} ?", "Écris le nombre qui a {p}.", "Je suis formé de {p}. Qui suis-je ?", "Quel nombre s’écrit avec {p} ?"]).replace("{p}", phrase),
      ...qcmN(n, [sansZero, ...fauxEcrits(n)], "", 1000),
      canvas: tabNum([null], { cols: 6 }),
      explanation: etapes(`on place chaque chiffre dans sa colonne ; les colonnes vides reçoivent un zéro.`, `${phrase} → ${fr(n)}.`, `le nombre est ${fr(n)}.`),
    };
  }),
  GD(45, 2, "La classe des mille donne le nombre de milliers, la classe des unités le reste.", () => {
    const n = nombre(un([5, 6]), 0.4);
    const m = Math.floor(n / 1000);
    const r = n % 1000;
    const trouMille = Math.random() < 0.5;
    return trouMille
      ? {
          text: un(["Complète : {n} = … milliers et {r} unités.", "{n}, c’est combien de milliers et {r} unités ?", "Dans {n}, combien de milliers y a-t-il en plus des {r} unités ?"]).replace("{n}", fr(n)).replace("{r}", fr(r)),
          ...qcmN(m, [chiffreDe(n, 3), Math.floor(n / 100), Math.floor(n / 10000), m + 1], "", 1),
          canvas: tabNum([n]),
          explanation: etapes(`la classe des mille se lit comme un nombre de milliers.`, `${fr(n)} = ${fr(m)} milliers et ${fr(r)} unités.`, `il y a ${fr(m)} milliers.`),
        }
      : {
          text: un(["Complète : {n} = {m} milliers et … unités.", "{n}, c’est {m} milliers et combien d’unités ?", "Dans {n}, il y a {m} milliers et combien d’unités ?"]).replace("{n}", fr(n)).replace("{m}", fr(m)),
          ...qcmN(r, [n % 100, n % 10000, Math.floor(r / 10), r * 10], "", 1),
          canvas: tabNum([n]),
          explanation: etapes(`la classe des unités, ce sont les trois derniers chiffres.`, `${fr(n)} = ${fr(m)} milliers et ${fr(r)} unités.`, `il y a ${fr(r)} unités.`),
        };
  }),
  GD(46, 2, "Les nombres ne sont pas dans l’ordre : range-les par colonne.", () => {
    const n = nombre(un([4, 5]), 1);
    const t = melange(termes(n));
    const expr = t.map(fr).join(" + ");
    const enLigne = Number(t.map((v) => String(v)[0]).join(""));
    return {
      text: tournure(["Attention à l’ordre.", "Range chaque nombre dans sa colonne.", "Les termes sont mélangés.", ""], ["Complète : {e} = …", "Quel nombre fait {e} ?", "{e}, c’est quel nombre ?", "Calcule {e}."]).replace("{e}", expr),
      ...qcmN(n, [enLigne, ...fauxEcrits(n)], "", 1000),
      canvas: tabNum(t, { cols: String(n).length }),
      explanation: etapes(`chaque nombre va dans sa colonne, quel que soit l’ordre de l’addition.`, `${expr} = ${decomposition(n)} = ${fr(n)}.`, `le nombre est ${fr(n)}.`),
    };
  }),
];

/* ═════════════════ entier_arrondir ═════════════════ */
const GA = atelier("cm1", "nombre_entier", "entier_arrondir", "cm1_");
const NOM_P: Record<number, string> = { 10: "la dizaine", 100: "la centaine", 1000: "au millier", 10000: "la dizaine de mille" };
const aP = (p: number) => (p === 1000 ? "au millier près" : `à ${NOM_P[p]} près`);
const rangP: Record<number, number> = { 10: 0, 100: 1, 1000: 2, 10000: 3 };

function arrondiQ(p: number, k: number) {
  let n = nombre(k, 0.3);
  if (Math.random() < 0.15) n = Math.floor(n / p) * p + p / 2; // le milieu : on arrondit au-dessus
  if (n % p === 0) n += entre(1, p - 1);
  const lo = Math.floor(n / p) * p;
  const juste = arrondi(n, p);
  const d = chiffreDe(n, rangP[p]);
  return {
    n,
    lo,
    juste,
    faux: [lo === juste ? lo + p : lo, arrondi(n, p / 10), arrondi(n, p * 10), juste + p, lo - p],
    canvas: droiteN(lo, lo + p, p / 10, [lo, lo + p / 2, lo + p], [{ value: n, label: fr(n) }]),
    explanation: etapes(
      `on encadre : ${fr(lo)} < ${fr(n)} < ${fr(lo + p)}. On regarde le chiffre juste à droite (${RANGS[rangP[p]].un}) : de 0 à 4 on garde, de 5 à 9 on monte.`,
      `le chiffre des ${RANGS[rangP[p]].nom} est ${d}${d >= 5 ? " ≥ 5 : on monte" : " < 5 : on garde"}.`,
      `${fr(n)} arrondi ${aP(p)} donne ${fr(juste)}.`,
    ),
  };
}
const ARR_Q = (p: number) => [`Arrondis {n} ${aP(p)}.`, `Quel est l’arrondi de {n} ${aP(p)} ?`, `{n}, arrondi ${aP(p)}, ça donne ?`, `Donne l’arrondi ${aP(p)} de {n}.`, `Quelle valeur approchée ${aP(p)} choisis-tu pour {n} ?`, `${aP(p).charAt(0).toUpperCase() + aP(p).slice(1)}, {n} vaut environ combien ?`];
const ARR_INTRO = ["Regarde la droite.", "Cherche le plus proche.", "Où est le nombre sur la droite ?", "Encadre d’abord le nombre.", "Pense au chiffre juste à droite.", "Le point montre le nombre.", "Aide-toi du milieu de la droite.", ""];

const entierArrondirGab: TutorBankItemV4[] = [
  ...([[100, 2, [4, 5]], [10, 2, [3, 4]], [1000, 2, [4, 5]]] as const).map(([p, et, ks], i) =>
    GA(50 + i, et, `${aP(p)} : regarde le chiffre juste à droite. De 0 à 4 on garde, de 5 à 9 on monte.`, () => {
      const q = arrondiQ(p, un(ks));
      return { text: tournure(ARR_INTRO, ARR_Q(p)).replace("{n}", fr(q.n)), ...qcmN(q.juste, q.faux, "", p), canvas: q.canvas, explanation: q.explanation };
    }),
  ),
  GA(53, 2, "Regarde la droite : de quel côté le point est-il le plus près ?", () => {
    const p = un([10, 100, 1000]);
    const q = arrondiQ(p, p === 10 ? 3 : un([4, 5]));
    let n = q.n;
    if (n === q.lo + p / 2) n += 1;
    const juste = arrondi(n, p);
    return {
      text: tournure(["Regarde la droite.", "Observe le point.", "Cherche le milieu.", "Compte les graduations.", ""], ["{n} est-il plus proche de {a} ou de {b} ?", "Entre {a} et {b}, de quel nombre {n} est-il le plus près ?", "{n} : plutôt {a} ou plutôt {b} ?", "Qui est le plus près de {n} : {a} ou {b} ?", "{n} est entre {a} et {b}. Duquel est-il le plus proche ?"]).replace("{n}", fr(n)).replace("{a}", fr(q.lo)).replace("{b}", fr(q.lo + p)),
      ...qcm(fr(juste), [fr(juste === q.lo ? q.lo + p : q.lo), "Il est juste au milieu"]),
      canvas: droiteN(q.lo, q.lo + p, p / 10, [q.lo, q.lo + p / 2, q.lo + p], [{ value: n, label: fr(n) }]),
      explanation: etapes(`le milieu de ${fr(q.lo)} et ${fr(q.lo + p)} est ${fr(q.lo + p / 2)}.`, `${fr(n)} est ${n < q.lo + p / 2 ? "avant" : "après"} le milieu.`, `${fr(n)} est plus proche de ${fr(juste)}.`),
    };
  }),
  GA(54, 3, "Regarde le chiffre juste à droite du rang demandé.", () => {
    const c = un(VIE);
    const p = un([100, 1000]);
    const q = arrondiQ(p, Math.min(c.k, entre(4, 6)));
    return {
      text: `${c.t.replace("{n}", fr(q.n))} ${un([`${aP(p).charAt(0).toUpperCase() + aP(p).slice(1)}, cela fait environ combien ?`, `Arrondis ce nombre ${aP(p)}.`, `Quel est son arrondi ${aP(p)} ?`, `On veut un ordre de grandeur ${aP(p)}. Lequel ?`])}`,
      ...qcmN(q.juste, q.faux, "", p),
      canvas: q.canvas,
      explanation: q.explanation,
    };
  }),
  GA(55, 3, "À la dizaine de mille près : regarde le chiffre des unités de mille.", () => {
    const q = arrondiQ(10000, un([5, 6]));
    return { text: tournure(ARR_INTRO, ARR_Q(10000)).replace("{n}", fr(q.n)), ...qcmN(q.juste, q.faux, "", 10000), canvas: q.canvas, explanation: q.explanation };
  }),
  GA(56, 3, "Un nombre qui s’arrondit à R est à moins d’une demi-graduation de R.", () => {
    const p = un([10, 100, 1000]);
    const R = (p === 10 ? entre(20, 99) : entre(3, 99)) * p;
    const ok = R + un([-1, 1]) * entre(1, p / 2 - 1);
    const faux = [R + p / 2 + entre(0, p / 2 - 1), R - p / 2 - entre(1, p / 2 - 1), R + p + entre(1, p / 2 - 1), R - p - entre(1, p / 2 - 1)].filter((f) => arrondi(f, p) !== R);
    return {
      text: tournure(["Un seul nombre convient.", "Regarde la droite.", "Attention au milieu.", ""], [`Quel nombre a pour arrondi ${fr(R)} ${aP(p)} ?`, `Lequel s’arrondit à ${fr(R)} ${aP(p)} ?`, `${aP(p).charAt(0).toUpperCase() + aP(p).slice(1)}, quel nombre devient ${fr(R)} ?`]),
      ...qcm(fr(ok), faux.map(fr)),
      canvas: droiteN(R - p, R + p, p / 10, [R - p, R - p / 2, R, R + p / 2, R + p], []),
      explanation: etapes(`les nombres qui s’arrondissent à ${fr(R)} sont entre ${fr(R - p / 2)} (compris) et ${fr(R + p / 2)} (non compris).`, `${fr(ok)} est dans cet intervalle ; les autres s’arrondissent à un autre nombre.`, `la réponse est ${fr(ok)}.`),
    };
  }),
];

/* ═════════════════ entier_multiple ═════════════════ */
const GM = atelier("cm1", "nombre_entier", "entier_multiple", "cm1_");
const pasMultiple = (k: number, max: number) => {
  let x = entre(k + 1, max);
  while (x % k === 0) x = entre(k + 1, max);
  return x;
};

const entierMultipleGab: TutorBankItemV4[] = [
  GM(60, 2, "Un multiple de k est dans la table de k : k × un nombre entier.", () => {
    const k = entre(3, 9);
    const m = k * entre(3, 12);
    return {
      text: tournure(["Pense à la table de {k}.", "Compte de {k} en {k}.", "Récite la table de {k}.", "Un seul nombre convient.", ""], ["Quel nombre est un multiple de {k} ?", "Lequel de ces nombres est un multiple de {k} ?", "Choisis le multiple de {k}.", "Quel nombre peut s’écrire {k} × … ?"]).replace(/\{k\}/g, String(k)),
      ...qcmN(m, [m + 1, m - 1, m + 2, m - 2, m + k - 1].filter((x) => x % k !== 0), "", 1),
      explanation: etapes(`un multiple de ${k} s’écrit ${k} × un nombre entier.`, `${fr(m)} = ${k} × ${m / k}.`, `${fr(m)} est un multiple de ${k}.`),
    };
  }),
  GM(61, 2, "Cherche le nombre dans la table : s’il y est, c’est un multiple.", () => {
    const k = entre(3, 9);
    const oui = Math.random() < 0.5;
    const m = oui ? k * entre(2, 10) : pasMultiple(k, 10 * k);
    return {
      text: tournure(["Regarde la table de {k}.", "Voici la table de {k}.", ""], ["{m} est-il un multiple de {k} ?", "{m} est-il dans la table de {k} ?", "Est-ce que {m} est un multiple de {k} ?", "Peut-on écrire {m} = {k} × … avec un nombre entier ?"]).replace(/\{k\}/g, String(k)).replace(/\{m\}/g, String(m)),
      ...qcm(oui ? "Oui" : "Non", [oui ? "Non" : "Oui"]),
      canvas: tableDe(k),
      explanation: etapes(`on cherche ${m} dans la table de ${k}.`, oui ? `${k} × ${m / k} = ${m}.` : `${k} × ${Math.floor(m / k)} = ${k * Math.floor(m / k)} et ${k} × ${Math.floor(m / k) + 1} = ${k * (Math.floor(m / k) + 1)} : ${m} n’y est pas.`, oui ? `${m} est un multiple de ${k}.` : `${m} n’est pas un multiple de ${k}.`),
    };
  }),
  GM(62, 2, "Trois nombres sont dans la table, un seul n’y est pas.", () => {
    const k = entre(3, 9);
    const qs = melange([2, 3, 4, 5, 6, 7, 8, 9, 10]).slice(0, 3);
    const intrus = pasMultiple(k, 10 * k);
    return {
      text: tournure(["Regarde la table de {k}.", "Un intrus s’est caché.", "Trois nombres sont dans la table.", ""], ["Quel nombre n’est pas un multiple de {k} ?", "Lequel n’est pas dans la table de {k} ?", "Trouve le nombre qui n’est pas un multiple de {k}."]).replace(/\{k\}/g, String(k)),
      ...qcm(String(intrus), qs.map((q) => String(k * q))),
      canvas: tableDe(k),
      explanation: etapes(`on cherche chaque nombre dans la table de ${k}.`, `${qs.map((q) => `${k} × ${q} = ${k * q}`).join(" ; ")} ; ${intrus} n’y est pas.`, `l’intrus est ${intrus}.`),
    };
  }),
  GM(63, 2, "Regarde le chiffre des unités.", () => {
    const k = un([2, 5, 10, 100]);
    const base = nombre(un([4, 5]), 0.3);
    const fin = (u: number[]) => Math.floor(base / 100) * 100 + un(u);
    let juste: number;
    let faux: number[];
    let regle: string;
    if (k === 2) {
      juste = fin([10, 12, 34, 56, 78, 90, 24, 46]);
      faux = [fin([11, 13, 35]), fin([57, 79, 91]), fin([23, 45, 67])];
      regle = "un multiple de 2 se termine par 0, 2, 4, 6 ou 8";
    } else if (k === 5) {
      juste = fin([15, 25, 40, 65, 70, 85]);
      faux = [fin([12, 23, 34]), fin([46, 57, 68]), fin([51, 79, 93])];
      regle = "un multiple de 5 se termine par 0 ou 5";
    } else if (k === 10) {
      juste = fin([10, 20, 40, 60, 70, 90]);
      faux = [fin([15, 25, 35]), fin([1, 11, 21]), fin([55, 65, 75])];
      regle = "un multiple de 10 se termine par 0";
    } else {
      juste = Math.floor(base / 100) * 100;
      faux = [juste + un([10, 20, 30]), juste + un([50, 60]), juste + un([1, 5, 9])];
      regle = "un multiple de 100 se termine par 00";
    }
    const ns = melange([juste, ...faux]);
    return {
      text: tournure(["Regarde la fin des nombres.", "Pas besoin de calculer.", "Observe la colonne des unités.", ""], [`Quel nombre est un multiple de ${k} ?`, `Lequel de ces nombres est un multiple de ${k} ?`, `Choisis le multiple de ${k}.`]),
      ...qcm(fr(juste), faux.map(fr)),
      canvas: tabNum(ns, k === 100 ? {} : { colonne: 0 }),
      explanation: etapes(`${regle}.`, `${fr(juste)} se termine par ${String(juste).slice(k === 100 ? -2 : -1)}.`, `${fr(juste)} est un multiple de ${k}.`),
    };
  }),
  GM(64, 2, "Il ne doit rien rester : le nombre doit être dans la table.", () => {
    const c = un(PAQUETS);
    const k = entre(3, 9);
    const m = k * entre(4, 10);
    const pl = c.f ? "pleines" : "pleins";
    return {
      text: `${c.p.replace("{k}", String(k))} ${un([`Avec combien de ${c.obj} remplit-on des ${c.cont} ${pl} sans qu’il en reste ?`, `Quel nombre de ${c.obj} donne des ${c.cont} ${pl}, sans reste ?`, `Combien de ${c.obj} faut-il pour des ${c.cont} ${pl}, sans aucun reste ?`])}`,
      ...qcmN(m, [m + 1, m - 1, m + 2, m + k - 2].filter((x) => x % k !== 0), "", 1),
      canvas: barrePaquets(k, "?", singulier(c.cont)),
      explanation: etapes(`il ne reste rien si le nombre est un multiple de ${k}.`, `${fr(m)} = ${k} × ${m / k}.`, `${fr(m)} ${c.obj} conviennent.`),
    };
  }),
  GM(65, 2, "Cherche le résultat dans la table, puis lis le nombre de fois.", () => {
    const k = entre(3, 9);
    const q = entre(2, 10);
    return {
      text: tournure(["Regarde la table de {k}.", "Utilise la table.", "Cherche {m} dans la table.", ""], ["Complète : {k} × … = {m}", "Par combien multiplier {k} pour obtenir {m} ?", "{m} = {k} × … : quel nombre manque ?", "Combien de fois {k} dans {m} ?"]).replace(/\{k\}/g, String(k)).replace(/\{m\}/g, String(k * q)),
      ...qcmN(q, [q + 1, q - 1, k * q - k, k], "", 1),
      canvas: tableDe(k),
      explanation: etapes(`on cherche ${k * q} dans la table de ${k}.`, `${k} × ${q} = ${k * q}.`, `il manque ${q}.`),
    };
  }),
  GM(66, 2, "Avance de k en k sur la droite jusqu’à dépasser le nombre.", () => {
    const k = entre(3, 9);
    const n = pasMultiple(k, 9 * k);
    const apres = Math.ceil(n / k) * k;
    const avant = Math.floor(n / k) * k;
    return {
      text: tournure(["Regarde la droite.", "On compte de {k} en {k}.", "Une grenouille saute de {k} en {k}.", ""], ["Quel est le multiple de {k} juste après {n} ?", "Après {n}, quel est le premier multiple de {k} ?", "Quel multiple de {k} vient juste après {n} ?"]).replace(/\{k\}/g, String(k)).replace("{n}", String(n)),
      ...qcmN(apres, [avant, n + 1, apres + k, n + k], "", k),
      canvas: droiteN(0, 10 * k, k, [], [{ value: n, label: String(n) }]),
      explanation: etapes(`on compte de ${k} en ${k} : ${avant} < ${n} < ${apres}.`, `${apres} = ${k} × ${apres / k}.`, `le multiple suivant est ${apres}.`),
    };
  }),
  GM(67, 2, "On ajoute k à chaque fois.", () => {
    const k = entre(3, 9);
    const a = k * entre(2, 6);
    const l = [a, a + k, a + 2 * k];
    return {
      text: tournure(["On compte de {k} en {k}.", "Voici des multiples de {k}.", "Un robot saute de {k} en {k}."], ["{l}… Quel nombre vient ensuite ?", "Après {l}, quel est le multiple suivant ?", "{l}… Quel est le nombre suivant ?"]).replace(/\{k\}/g, String(k)).replace("{l}", l.join(", ")),
      ...qcmN(a + 3 * k, [a + 3 * k + 1, a + 4 * k, a + 2 * k + 1, a + 3 * k - 1], "", 1),
      canvas: droiteN(0, 10 * k, k, [], l.map((v) => ({ value: v, label: String(v) }))),
      explanation: etapes(`on ajoute ${k} à chaque fois.`, `${a + 2 * k} + ${k} = ${a + 3 * k}.`, `le nombre suivant est ${a + 3 * k}.`),
    };
  }),
];

/* ═════════════════ entier_defi ═════════════════ */
const GF = atelier("cm1", "nombre_entier", "entier_defi", "cm1_");
const DEVINETTE = ["Devinette :", "Nombre mystère :", "Énigme du jour :", "Le code secret d’un cadenas :", "Le numéro d’une maison :", "Un jeu de piste :"];

const entierDefiGab: TutorBankItemV4[] = [
  GF(70, 3, "Utilise chaque indice l’un après l’autre et barre les nombres qui ne vont pas.", () => {
    const a = entre(10, 99) * 100;
    const d = entre(1, 9);
    const variante = Math.random() < 0.5;
    const u = entre(1, 9);
    const juste = variante ? a + 10 * d : a + 10 * d + u;
    const indices = variante ? `Je suis un multiple de 10. Mon chiffre des dizaines est ${d}.` : `Mon chiffre des dizaines est ${d} et mon chiffre des unités est ${u}.`;
    const faux = variante ? [a + 10 * d + 5, a + 100 + 10 * d, a + d, a - 100 + 10 * d] : [a + 10 * u + d, a + 100 + 10 * d + u, a + 10 * d, a + d * 100 + u];
    return {
      text: `${un(DEVINETTE)} je suis plus grand que ${fr(a)} et plus petit que ${fr(a + 100)}. ${indices} ${un(["Qui suis-je ?", "Quel nombre suis-je ?", "Quel est ce nombre ?"])}`,
      ...qcm(fr(juste), faux.filter((f) => f !== juste).map(fr)),
      canvas: droiteN(a, a + 100, 10, [a, a + 50, a + 100], []),
      explanation: etapes(`on garde les nombres entre ${fr(a)} et ${fr(a + 100)}, puis on applique les autres indices.`, variante ? `multiple de 10 → il finit par 0 ; dizaines ${d} → ${fr(juste)}.` : `dizaines ${d}, unités ${u} → ${fr(juste)}.`, `le nombre est ${fr(juste)}.`),
    };
  }),
  GF(71, 3, "Des paquets égaux : divise le total par le nombre dans un paquet.", () => {
    const c = un(PAQUETS);
    const k = un([3, 4, 5, 6, 7, 8, 9, 10]);
    const q = entre(6, 25);
    const N = k * q;
    const cpl = c.f ? "complètes" : "complets";
    return {
      text: `${c.t.replace("{N}", String(N)).replace("{k}", String(k))} ${un([`Combien de ${c.cont} obtient-on ?`, `Combien de ${c.cont} ${cpl} y a-t-il ?`, `Combien de ${c.cont} faut-il ?`])}`,
      ...qcmN(q, [q + 1, q - 1, N - k, N + k, q * 2], "", 1),
      canvas: barrePaquets(k, String(N), singulier(c.cont)),
      explanation: etapes(`on cherche combien de fois ${k} dans ${N} : c’est une division.`, `${N} ÷ ${k} = ${q}, car ${k} × ${q} = ${N}.`, `on obtient ${q} ${c.cont}.`),
    };
  }),
  GF(72, 3, "Pour le plus grand, le plus grand chiffre devant. Pour le plus petit, jamais 0 devant.", () => {
    const avecZero = Math.random() < 0.6;
    const ds = melange([...new Set([...(avecZero ? [0] : []), ...melange([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 4)])]).slice(0, 4);
    const desc = [...ds].sort((x, y) => y - x);
    const asc = [...ds].sort((x, y) => x - y);
    const grand = Math.random() < 0.5;
    const num = (l: number[]) => Number(l.join(""));
    const min = asc[0] === 0 ? num([asc[1], 0, ...asc.slice(2)]) : num(asc);
    const juste = grand ? num(desc) : min;
    const ech = (l: number[]) => num([...l.slice(0, 2), l[3], l[2]]);
    const faux = grand ? [ech(desc), min, num(ds), num([desc[1], desc[0], ...desc.slice(2)])] : [num(asc), ech(asc[0] === 0 ? [asc[1], 0, ...asc.slice(2)] : asc), num(desc), num(ds)];
    const qui = un(PRENOMS);
    const mot = grand ? "grand" : "petit";
    return {
      text: `${tournure([`${qui} a quatre étiquettes : ${ds.join(", ")}.`, `Voici quatre étiquettes chiffres : ${ds.join(", ")}.`, `Le cadenas de ${qui} utilise les chiffres ${ds.join(", ")}.`, `${qui} tire les chiffres ${ds.join(", ")}.`])} ${un([`Avec chaque chiffre une seule fois, quel est le plus ${mot} nombre de 4 chiffres ?`, `Quel est le plus ${mot} nombre de 4 chiffres qu’on peut écrire avec ces chiffres, une fois chacun ?`, `En utilisant chaque chiffre une fois, quel plus ${mot} nombre de 4 chiffres obtient-on ?`])}`,
      ...qcm(fr(juste), faux.filter((f) => f !== juste).map(fr)),
      canvas: { kind: "tableau_donnees", title: "Les étiquettes", headers: ds.map(String), rows: [], display: { compact: true } } as CanvasFigure,
      explanation: etapes(grand ? `on place les chiffres du plus grand au plus petit.` : `on place les chiffres du plus petit au plus grand, mais 0 ne peut pas être devant : sinon le nombre n’a que 3 chiffres.`, grand ? `${desc.join(" > ")} → ${fr(juste)}.` : `${fr(juste)}.`, `le plus ${mot} nombre est ${fr(juste)}.`),
    };
  }),
  GF(73, 3, "Complète d’abord jusqu’à la centaine, puis jusqu’au millier.", () => {
    const c = un(VIE);
    const M = entre(2, 60) * 1000;
    let ec = entre(110, 990);
    if (ec % 100 === 0) ec += 10;
    const n = M - ec;
    return {
      text: `${c.t.replace("{n}", fr(n))} ${un([`Combien manque-t-il pour atteindre ${fr(M)} ?`, `Combien faut-il ajouter pour arriver à ${fr(M)} ?`, `Combien en manque-t-il pour faire ${fr(M)} ?`, `Quel écart reste-t-il jusqu’à ${fr(M)} ?`])}`,
      ...qcmN(ec, [ec + 100, ec - 100, ec + 1000, ec + 10, M - n - 10], "", 10),
      canvas: droiteN(M - 1000, M, 100, [M - 1000, M - 500, M], [{ value: n, label: fr(n) }]),
      explanation: etapes(`on avance jusqu’à la centaine suivante, puis jusqu’à ${fr(M)}.`, `${fr(n)} + ${fr(Math.ceil(n / 100) * 100 - n)} = ${fr(Math.ceil(n / 100) * 100)} ; ${fr(Math.ceil(n / 100) * 100)} + ${fr(M - Math.ceil(n / 100) * 100)} = ${fr(M)}. En tout : ${fr(ec)}.`, `il manque ${fr(ec)}.`),
    };
  }),
  GF(74, 4, "Remplis le tableau colonne par colonne avec chaque indice.", () => {
    const m = entre(1, 4);
    const cen = un([2 * m, m + 1, ...(3 * m <= 9 ? [3 * m] : [])]);
    const diz = un([0, m - 1, 0]);
    const uni = un([m + 2, 2 * m + 1, m]);
    const cinq = Math.random() < 0.4;
    const e = cinq ? entre(1, 9) : 0;
    const n = Number(`${cinq ? e : ""}${m}${cen}${diz}${uni}`);
    const rel = (v: number) => (v === 2 * m && m > 0 ? "le double de mon chiffre des milliers" : v === 3 * m ? "le triple de mon chiffre des milliers" : v === m + 1 ? "un de plus que mon chiffre des milliers" : v === m + 2 ? "deux de plus que mon chiffre des milliers" : v === 2 * m + 1 ? "un de plus que le double de mon chiffre des milliers" : v === m - 1 ? "un de moins que mon chiffre des milliers" : v === m ? "égal à mon chiffre des milliers" : String(v));
    const phrases = [
      ...(cinq ? [`Mon chiffre des dizaines de mille est ${e}.`] : []),
      `Mon chiffre des milliers est ${m}.`,
      `Mon chiffre des centaines est ${rel(cen)}.`,
      diz === 0 ? "Mon chiffre des dizaines est 0." : `Mon chiffre des dizaines est ${rel(diz)}.`,
      `Mon chiffre des unités est ${rel(uni)}.`,
    ];
    const s = String(n);
    const k = s.length;
    const swap = Number(s.slice(0, k - 3) + s[k - 1] + s[k - 2] + s[k - 3]);
    return {
      text: `${un(DEVINETTE)} ${phrases.join(" ").replace(/^M/, "m")} ${un(["Qui suis-je ?", "Quel nombre suis-je ?", "Quel est ce nombre ?"])}`,
      ...qcmN(n, [swap, ...fauxEcrits(n)], "", 100),
      canvas: tabNum(["?".repeat(k)], { cols: k }),
      explanation: etapes(`on remplit le tableau colonne par colonne avec chaque indice.`, phrases.map((p) => p.replace(/^Mon chiffre des /, "").replace(/\.$/, "")).join(" ; ") + ` → ${fr(n)}.`, `le nombre est ${fr(n)}.`),
    };
  }),
  GF(75, 4, "L’arrondi donne un intervalle ; les autres indices choisissent dedans.", () => {
    const R = entre(12, 98) * 100;
    const d = entre(0, 9);
    const juste = d >= 5 ? R - 100 + 10 * d : R + 10 * d;
    const autre = d >= 5 ? R + 10 * d : R - 100 + 10 * d;
    return {
      text: `${un(DEVINETTE)} arrondi à la centaine près, je deviens ${fr(R)}. Je suis un multiple de 10. Mon chiffre des dizaines est ${d}. ${un(["Qui suis-je ?", "Quel nombre suis-je ?", "Quel est ce nombre ?"])}`,
      ...qcm(fr(juste), [fr(autre), fr(juste + 5), fr(R + d), fr(juste + 100)].filter((f) => f !== fr(juste))),
      canvas: droiteN(R - 100, R + 100, 10, [R - 100, R - 50, R, R + 50, R + 100], []),
      explanation: etapes(`les nombres qui s’arrondissent à ${fr(R)} sont de ${fr(R - 50)} à ${fr(R + 49)}.`, `multiple de 10 avec ${d} dizaines dans cet intervalle : ${fr(juste)} (${fr(autre)} s’arrondit à ${fr(arrondi(autre, 100))}).`, `le nombre est ${fr(juste)}.`),
    };
  }),
  GF(76, 4, "Range d’abord tous les nombres, puis compte les places.", () => {
    const c = un([
      { t: "Quatre joueurs d’un jeu vidéo comparent leurs scores.", u: "points" },
      { t: "Quatre coureuses notent leurs pas du mois.", u: "pas" },
      { t: "Quatre youtubeurs comparent leurs abonnés.", u: "abonnés" },
      { t: "Quatre cyclistes notent les mètres parcourus.", u: "m" },
      { t: "Quatre vendeurs comptent leurs ventes de l’année.", u: "€" },
      { t: "Quatre autrices comptent leurs livres vendus.", u: "livres" },
      { t: "Quatre apiculteurs comptent leurs abeilles.", u: "abeilles" },
      { t: "Quatre pilotes notent leurs kilomètres de l’année.", u: "km" },
      { t: "Quatre streameuses comptent les vues de leur vidéo.", u: "vues" },
      { t: "Quatre agriculteurs comptent leurs salades plantées.", u: "salades" },
    ]);
    const noms = melange([...PRENOMS]).slice(0, 4);
    const ns = voisins(entre(5, 6));
    const desc = [...ns].sort((x, y) => y - x);
    const sens = Math.random() < 0.6;
    const place = entre(2, 3);
    const v = sens ? desc[place - 1] : desc[4 - place];
    const iJ = ns.indexOf(v);
    const rang = place === 2 ? "deuxième" : "troisième";
    return {
      text: `${c.t} ${un([`Qui est ${rang} si on range du plus ${sens ? "grand au plus petit" : "petit au plus grand"} ?`, `Du plus ${sens ? "grand au plus petit" : "petit au plus grand"}, qui arrive ${rang} ?`, `Qui occupe la ${rang} place, du plus ${sens ? "grand au plus petit" : "petit au plus grand"} ?`])}`,
      ...qcm(noms[iJ], noms.filter((_, i) => i !== iJ)),
      canvas: tabNum(ns, { labels: noms }),
      explanation: etapes(`on range les ${c.u} du plus ${sens ? "grand au plus petit" : "petit au plus grand"}, en comparant de gauche à droite.`, `${(sens ? desc : [...desc].reverse()).map(fr).join(sens ? " > " : " < ")}.`, `${rang} : ${noms[iJ]} (${fr(v)}).`),
    };
  }),
  GF(77, 4, "Le nombre de paquets COMPLETS, puis ce qui reste : moins qu’un paquet.", () => {
    const c = un(PAQUETS);
    const k = un([3, 4, 5, 6, 7, 8, 9, 10]);
    const q = entre(6, 25);
    const r = entre(1, k - 1);
    const N = k * q + r;
    const reste = Math.random() < 0.4;
    const cpl = c.f ? "complètes" : "complets";
    return {
      text: `${c.t.replace("{N}", String(N)).replace("{k}", String(k))} ${reste ? un([`Combien de ${c.obj} reste-t-il ?`, `Une fois les ${c.cont} ${cpl} ${c.f ? "faites" : "faits"}, combien de ${c.obj} restent ?`]) : un([`Combien de ${c.cont} ${cpl} obtient-on ?`, `Combien de ${c.cont} ${cpl} y a-t-il ?`])}`,
      ...(reste ? qcmN(r, [k - r, q, r + 1, r + k], "", 1) : qcmN(q, [q + 1, q - 1, r, q + r], "", 1)),
      canvas: barrePaquets(k, String(N), singulier(c.cont)),
      explanation: etapes(`on cherche le plus grand multiple de ${k} qui ne dépasse pas ${N}.`, `${k} × ${q} = ${k * q} et ${N} − ${k * q} = ${r} (moins que ${k}).`, reste ? `il reste ${r} ${c.obj}.` : `on obtient ${q} ${c.cont} ${cpl}.`),
    };
  }),
];

export const nombresEntiersBank: TutorBankItemV4[] = [
  ...entierLireGab,
  ...entierComparerGab,
  ...entierDecomposerGab,
  ...entierArrondirGab,
  ...entierMultipleGab,
  ...entierDefiGab,
  // ============================================================
  // ENTIER_LIRE
  // Lire et écrire des nombres entiers
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_entier_lire_qcm_001",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Comment écrit-on en chiffres : « trois mille deux cent quarante » ?",
    format: "qcm",
    choices: ["3 240", "3 024", "32 040", "324"],
    expected: ["3 240"],
    comparator: "mcq_exact",
    hint: "Repère les milliers, les centaines, les dizaines et les unités.",
    explanation: exp(
      "Lire un nombre entier, c’est reconnaître la valeur de chaque chiffre selon sa position.",
      "On sépare le nombre en milliers, centaines, dizaines et unités.",
      "« trois mille » donne 3 000 et « deux cent quarante » donne 240. Donc 3 000 + 240 = 3 240.",
      "Le nombre s’écrit 3 240."
    ),
    tags: ["cm1", "nombres_entiers", "lecture", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_lire_qcm_002",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Comment écrit-on en chiffres : « douze mille trente » ?",
    format: "qcm",
    choices: ["12 030", "12 300", "1 230", "120 030"],
    expected: ["12 030"],
    comparator: "mcq_exact",
    hint: "Il y a 12 milliers et 30 unités. Attention au zéro des centaines.",
    explanation: exp(
      "Un nombre entier peut contenir des zéros pour garder les bonnes positions.",
      "On place d’abord la classe des milliers, puis la classe des unités.",
      "« douze mille » donne 12 000 et « trente » donne 30. Donc 12 000 + 30 = 12 030.",
      "Le nombre s’écrit 12 030."
    ),
    tags: ["cm1", "nombres_entiers", "lecture", "zeros", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_lire_short_003",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Écris en chiffres : « vingt-quatre mille cinq cent six ».",
    format: "short",
    expected: ["24506", "24 506"],
    comparator: "number_equal",
    hint: "Il y a 24 milliers, puis 506.",
    explanation: exp(
      "Écrire un nombre en chiffres demande de placer chaque classe correctement.",
      "On repère les milliers puis les centaines, dizaines et unités.",
      "« vingt-quatre mille » = 24 000 et « cinq cent six » = 506. Donc 24 000 + 506 = 24 506.",
      "Le nombre est 24 506."
    ),
    tags: ["cm1", "nombres_entiers", "lecture", "short"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_lire_short_004",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Écris en chiffres : « quarante mille huit ».",
    format: "short",
    expected: ["40008", "40 008"],
    comparator: "number_equal",
    hint: "Il y a 40 milliers et 8 unités. Les zéros gardent les places vides.",
    explanation: exp(
      "Les zéros sont importants dans l’écriture d’un nombre entier.",
      "On place 40 000, puis 8 dans les unités.",
      "40 000 + 8 = 40 008. Les centaines et les dizaines sont vides, donc on écrit des zéros.",
      "Le nombre est 40 008."
    ),
    tags: ["cm1", "nombres_entiers", "lecture", "zeros", "short"],
  },

  {
    kind: "template",
    id: "cm1_entier_lire_tpl_005",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_lire",
    difficulty: 2,
    theme: "neutral",
    hint: "Attention aux zéros : ils servent à garder les bonnes colonnes.",
    tags: ["cm1", "nombres_entiers", "lecture", "template", "qcm"],
    generate: () => {
      const examples = [
        {
          words: "quinze mille sept",
          value: 15007,
          wrongs: ["15 700", "1 507", "150 007"],
        },
        {
          words: "trente-six mille quatre-vingts",
          value: 36080,
          wrongs: ["36 800", "3 680", "360 080"],
        },
        {
          words: "quatre-vingt mille cinq",
          value: 80005,
          wrongs: ["80 500", "8 005", "800 005"],
        },
        {
          words: "vingt-sept mille cinquante",
          value: 27050,
          wrongs: ["27 500", "2 750", "270 050"],
        },
      ];

      const e = randomChoice(examples);
      const correct = formatNumber(e.value);

      return {
        text: tournure(INTRO_TABLEAU, EN_CHIFFRES).replace("{w}", e.words),
        canvas: tabNum([null], { cols: 6 }),
        format: "qcm",
        choices: makeChoices(correct, e.wrongs),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Lire un nombre entier demande de bien placer chaque classe.",
          "On identifie les milliers puis les unités. Les zéros servent à garder les bonnes positions.",
          `« ${e.words} » s’écrit ${correct}.`,
          `La bonne réponse est ${correct}.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "cm1_entier_lire_open_006",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Explique pourquoi le nombre 30 407 contient un zéro.",
    format: "open",
    expected: ["zéro", "0", "place", "colonne"],
    comparator: "contains_keyword",
    hint: "Le zéro sert à montrer qu’une colonne est vide.",
    explanation: exp(
      "Dans un nombre entier, chaque chiffre a une position : unités, dizaines, centaines, milliers...",
      "Quand une position est vide, on écrit un zéro pour garder la bonne place.",
      "Dans 30 407, le zéro montre qu’il n’y a pas de millier dans la classe des unités de milliers.",
      "Le zéro est donc utile : il garde la bonne écriture du nombre."
    ),
    tags: ["cm1", "nombres_entiers", "lecture", "zeros", "open"],
  },

  // ============================================================
  // ENTIER_COMPARER
  // Comparer et ordonner des nombres entiers
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_entier_comparer_qcm_001",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_comparer",
    difficulty: 1,
    theme: "neutral",
    text: "Quel est le plus grand nombre ?",
    format: "qcm",
    choices: ["8 760", "8 706", "8 607", "8 076"],
    expected: ["8 760"],
    comparator: "mcq_exact",
    hint: "Compare chiffre par chiffre en partant de la gauche.",
    explanation: exp(
      "Comparer deux nombres entiers, c’est déterminer lequel est le plus petit ou le plus grand.",
      "On compare d’abord le nombre de chiffres. S’il est identique, on compare les chiffres de gauche à droite.",
      "Tous les nombres ont 4 chiffres et commencent par 8. Ensuite, 7 centaines est plus grand que 6, 0 et 0.",
      "Le plus grand nombre est 8 760."
    ),
    tags: ["cm1", "nombres_entiers", "comparaison", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_comparer_qcm_002",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_comparer",
    difficulty: 1,
    theme: "neutral",
    text: "Complète : 12 408 ... 12 804",
    format: "qcm",
    choices: ["<", ">", "="],
    expected: ["<"],
    comparator: "mcq_exact",
    hint: "Les deux nombres commencent par 12. Compare ensuite les centaines.",
    explanation: exp(
      "Les signes < et > servent à comparer deux nombres.",
      "On compare les chiffres depuis la gauche.",
      "12 408 et 12 804 commencent tous les deux par 12. Ensuite, 4 centaines est plus petit que 8 centaines.",
      "On écrit donc 12 408 < 12 804."
    ),
    tags: ["cm1", "nombres_entiers", "comparaison", "symboles", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_comparer_qcm_003",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_comparer",
    difficulty: 1,
    theme: "neutral",
    text: "Complète : 35 120 ... 35 120",
    format: "qcm",
    choices: ["=", "<", ">"],
    expected: ["="],
    comparator: "mcq_exact",
    hint: "Les deux nombres sont exactement les mêmes.",
    explanation: exp(
      "Deux nombres sont égaux s’ils ont exactement la même valeur.",
      "On compare tous les chiffres dans l’ordre.",
      "35 120 et 35 120 ont les mêmes chiffres aux mêmes positions.",
      "On écrit donc 35 120 = 35 120."
    ),
    tags: ["cm1", "nombres_entiers", "comparaison", "egalite", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_ordonner_qcm_004",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel rangement est dans l’ordre croissant ?",
    format: "qcm",
    choices: [
      "3 045 < 3 405 < 3 450",
      "3 405 < 3 045 < 3 450",
      "3 450 < 3 405 < 3 045",
      "3 045 < 3 450 < 3 405",
    ],
    expected: ["3 045 < 3 405 < 3 450"],
    comparator: "mcq_exact",
    hint: "Ordre croissant signifie du plus petit au plus grand.",
    explanation: exp(
      "Ordonner des nombres, c’est les ranger du plus petit au plus grand ou du plus grand au plus petit.",
      "Pour l’ordre croissant, on commence par le plus petit.",
      "3 045 est plus petit que 3 405, et 3 405 est plus petit que 3 450.",
      "L’ordre croissant est : 3 045 < 3 405 < 3 450."
    ),
    tags: ["cm1", "nombres_entiers", "ordre_croissant", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_ordonner_qcm_005",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel rangement est dans l’ordre décroissant ?",
    format: "qcm",
    choices: [
      "9 500 > 9 050 > 8 950",
      "8 950 > 9 050 > 9 500",
      "9 050 > 9 500 > 8 950",
      "9 500 < 9 050 < 8 950",
    ],
    expected: ["9 500 > 9 050 > 8 950"],
    comparator: "mcq_exact",
    hint: "Ordre décroissant signifie du plus grand au plus petit.",
    explanation: exp(
      "Ordonner dans l’ordre décroissant, c’est ranger du plus grand au plus petit.",
      "On compare les nombres puis on place le plus grand d’abord.",
      "9 500 est plus grand que 9 050, et 9 050 est plus grand que 8 950.",
      "L’ordre décroissant est : 9 500 > 9 050 > 8 950."
    ),
    tags: ["cm1", "nombres_entiers", "ordre_decroissant", "qcm"],
  },

  {
    kind: "template",
    id: "cm1_entier_comparer_tpl_006",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Compare les chiffres de gauche à droite.",
    tags: ["cm1", "nombres_entiers", "comparaison", "template"],
    generate: () => {
      const a = randomInt(2000, 90000);
      const b = a + randomChoice([-900, -90, -9, 9, 90, 900]);

      const correct = a > b ? ">" : a < b ? "<" : "=";

      return {
        text: `${un(["Deux compteurs indiquent", "Deux tirelires affichent", "Deux podomètres affichent", "Deux tableaux de score affichent", "Deux caisses enregistreuses affichent", "Deux panneaux lumineux affichent", "Deux balances de camion affichent"])} ${formatNumber(a)} et ${formatNumber(b)}. ${un(["Complète", "Choisis le bon signe", "Mets le bon signe"])} : ${formatNumber(a)} ... ${formatNumber(b)}`,
        canvas: tabNum([a, b]),
        format: "qcm",
        choices: ["<", ">", "="],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Comparer deux entiers, c’est regarder lequel représente la plus grande quantité.",
          "On compare les chiffres de gauche à droite.",
          `${formatNumber(a)} ${correct} ${formatNumber(b)}.`,
          `Le bon signe est ${correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_entier_ordonner_tpl_007",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Ordre croissant : du plus petit au plus grand.",
    tags: ["cm1", "nombres_entiers", "ordonner", "template", "qcm"],
    generate: () => {
      const a = randomInt(1000, 9000);
      const b = a + randomChoice([100, 200, 300, 500]);
      const c = b + randomChoice([100, 200, 300, 500]);

      const correct = `${formatNumber(a)} < ${formatNumber(b)} < ${formatNumber(c)}`;

      return {
        text: tournure(["Regarde le tableau.", "Compare colonne par colonne.", "Trois nombres à ranger.", ""], ["Quel rangement est dans l’ordre croissant ?", "Quelle liste va du plus petit au plus grand ?", "Range ces nombres dans l’ordre croissant.", "Choisis le rangement du plus petit au plus grand."]),
        canvas: tabNum(melange([a, b, c])),
        format: "qcm",
        choices: makeChoices(correct, [
          `${formatNumber(b)} < ${formatNumber(a)} < ${formatNumber(c)}`,
          `${formatNumber(c)} < ${formatNumber(b)} < ${formatNumber(a)}`,
          `${formatNumber(a)} < ${formatNumber(c)} < ${formatNumber(b)}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "L’ordre croissant va du plus petit au plus grand.",
          "On compare les nombres puis on les range.",
          `${formatNumber(a)} est plus petit que ${formatNumber(b)}, et ${formatNumber(b)} est plus petit que ${formatNumber(c)}.`,
          `L’ordre croissant est : ${correct}.`
        ),
      };
    },
  },
    // ============================================================
  // ENTIER_DECOMPOSER
  // Décomposer des nombres entiers
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_entier_decomposer_qcm_001",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_decomposer",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est la bonne décomposition de 4 582 ?",
    format: "qcm",
    choices: [
      "4 000 + 500 + 80 + 2",
      "4 000 + 50 + 80 + 2",
      "400 + 500 + 80 + 2",
      "4 000 + 500 + 8 + 2",
    ],
    expected: ["4 000 + 500 + 80 + 2"],
    comparator: "mcq_exact",
    hint: "Chaque chiffre représente une valeur selon sa position.",
    explanation: exp(
      "Décomposer un nombre, c’est écrire la valeur de chacun de ses chiffres.",
      "On repère les milliers, centaines, dizaines et unités.",
      "Dans 4 582 : 4 vaut 4 000, 5 vaut 500, 8 vaut 80 et 2 vaut 2.",
      "Donc 4 582 = 4 000 + 500 + 80 + 2."
    ),
    tags: ["cm1", "nombres_entiers", "decomposition", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_decomposer_qcm_002",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_decomposer",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est la bonne décomposition de 7 306 ?",
    format: "qcm",
    choices: [
      "7 000 + 300 + 6",
      "7 000 + 30 + 6",
      "700 + 300 + 6",
      "7 000 + 300 + 60",
    ],
    expected: ["7 000 + 300 + 6"],
    comparator: "mcq_exact",
    hint: "Le zéro des dizaines signifie qu’il n’y a pas de dizaine.",
    explanation: exp(
      "Décomposer un nombre, c’est écrire la valeur de ses chiffres non nuls.",
      "On repère la position de chaque chiffre.",
      "Dans 7 306 : 7 vaut 7 000, 3 vaut 300, 0 vaut 0 dizaine, 6 vaut 6.",
      "Donc 7 306 = 7 000 + 300 + 6."
    ),
    tags: ["cm1", "nombres_entiers", "decomposition", "zeros", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_decomposer_short_003",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_decomposer",
    difficulty: 2,
    theme: "neutral",
    text: "Complète : 20 000 + 400 + 9 = ...",
    format: "short",
    expected: ["20409", "20 409"],
    comparator: "number_equal",
    hint: "Il n’y a pas de milliers ni de dizaines dans la classe des unités : il faut garder les zéros.",
    explanation: exp(
      "Composer un nombre, c’est regrouper les valeurs de ses chiffres.",
      "On place chaque valeur dans la bonne colonne.",
      "20 000 + 400 + 9 = 20 409.",
      "Le nombre est 20 409."
    ),
    tags: ["cm1", "nombres_entiers", "composition", "zeros", "short"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_decomposer_short_004",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_decomposer",
    difficulty: 2,
    theme: "neutral",
    text: "Complète : 60 000 + 3 000 + 50 + 7 = ...",
    format: "short",
    expected: ["63057", "63 057"],
    comparator: "number_equal",
    hint: "Il n’y a pas de centaines : le chiffre des centaines est 0.",
    explanation: exp(
      "Composer un nombre, c’est additionner les valeurs placées dans les bonnes colonnes.",
      "On garde les colonnes vides avec des zéros.",
      "60 000 + 3 000 + 50 + 7 = 63 057.",
      "Le nombre est 63 057."
    ),
    tags: ["cm1", "nombres_entiers", "composition", "zeros", "short"],
  },

  {
    kind: "template",
    id: "cm1_entier_decomposer_tpl_005",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_decomposer",
    difficulty: 2,
    theme: "neutral",
    hint: "Écris séparément les milliers, centaines, dizaines et unités.",
    tags: ["cm1", "nombres_entiers", "decomposition", "template", "qcm"],
    generate: () => {
      const n = randomInt(2000, 9999);
      const milliers = Math.floor(n / 1000) * 1000;
      const centaines = Math.floor((n % 1000) / 100) * 100;
      const dizaines = Math.floor((n % 100) / 10) * 10;
      const unites = n % 10;

      const parts = [milliers, centaines, dizaines, unites].filter((x) => x > 0);
      const correct = parts.map(formatNumber).join(" + ");

      const wrongs = [
        `${formatNumber(milliers)} + ${formatNumber(centaines / 10)} + ${formatNumber(dizaines)} + ${unites}`,
        `${formatNumber(milliers / 10)} + ${formatNumber(centaines)} + ${formatNumber(dizaines)} + ${unites}`,
        `${formatNumber(milliers)} + ${formatNumber(centaines)} + ${formatNumber(dizaines + unites)}`,
      ];

      return {
        text: tournure(["Regarde le tableau.", "Pense aux colonnes.", "Chaque chiffre a sa valeur.", ""], ["Quelle est la bonne décomposition de {n} ?", "Comment décomposer {n} ?", "Quelle addition est égale à {n} ?"]).replace("{n}", formatNumber(n)),
        canvas: tabNum([n]),
        format: "qcm",
        choices: makeChoices(correct, wrongs),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Décomposer un nombre, c’est donner la valeur de chacun de ses chiffres.",
          "On lit le nombre de gauche à droite et on écrit chaque valeur non nulle.",
          `${formatNumber(n)} = ${correct}.`,
          `La bonne décomposition est ${correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_entier_decomposer_tpl_006_composer",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_decomposer",
    difficulty: 2,
    theme: "neutral",
    hint: "Place chaque valeur dans la bonne colonne.",
    tags: ["cm1", "nombres_entiers", "composition", "template", "short"],
    generate: () => {
      const dizainesMilliers = randomInt(1, 8) * 10000;
      const milliers = randomChoice([0, 1000, 2000, 3000, 4000, 5000]);
      const centaines = randomChoice([0, 100, 200, 300, 400, 500, 600, 700, 800, 900]);
      const dizaines = randomChoice([0, 10, 20, 30, 40, 50, 60, 70, 80, 90]);
      const unites = randomInt(1, 9);

      const n = dizainesMilliers + milliers + centaines + dizaines + unites;
      const parts = [dizainesMilliers, milliers, centaines, dizaines, unites].filter(
        (x) => x > 0
      );

      return {
        text: tournure(["Range chaque nombre dans sa colonne.", "Additionne les valeurs.", "Pense au tableau.", ""], ["Complète : {e} = ...", "Quel nombre fait {e} ?", "Calcule {e}.", "{e}, c’est quel nombre ?"]).replace("{e}", parts.map(formatNumber).join(" + ")),
        canvas: tabNum(parts, { cols: 5 }),
        format: "short",
        expected: [String(n), formatNumber(n)],
        comparator: "number_equal",
        explanation: exp(
          "Composer un nombre, c’est regrouper les valeurs de ses chiffres.",
          "On additionne les valeurs en gardant les bonnes positions.",
          `${parts.map(formatNumber).join(" + ")} = ${formatNumber(n)}.`,
          `Le nombre est ${formatNumber(n)}.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "cm1_entier_decomposer_open_007",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_decomposer",
    difficulty: 3,
    theme: "neutral",
    text: "Explique l’erreur : un élève écrit 12 405 = 10 000 + 2 000 + 400 + 50.",
    format: "open",
    expected: ["5", "unités", "50", "dizaines"],
    comparator: "contains_keyword",
    hint: "Regarde le dernier chiffre de 12 405.",
    explanation: exp(
      "Chaque chiffre d’un nombre a une valeur selon sa position.",
      "Il faut vérifier les unités, dizaines, centaines, milliers...",
      "Dans 12 405, le dernier chiffre est 5 : il vaut 5 unités, pas 50.",
      "La bonne décomposition est 10 000 + 2 000 + 400 + 5."
    ),
    tags: ["cm1", "nombres_entiers", "decomposition", "erreur_frequente", "open"],
  },

  // ============================================================
  // ENTIER_ARRONDIR
  // Arrondir un nombre entier simple
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_entier_arrondir_qcm_001",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_arrondir",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est l’arrondi de 4 682 à la centaine près ?",
    format: "qcm",
    choices: ["4 700", "4 600", "4 680", "5 000"],
    expected: ["4 700"],
    comparator: "mcq_exact",
    hint: "Pour arrondir à la centaine, regarde le chiffre des dizaines.",
    explanation: exp(
      "Arrondir un nombre, c’est le remplacer par un nombre proche plus simple.",
      "Pour arrondir à la centaine, on regarde le chiffre des dizaines. S’il est 5 ou plus, on augmente la centaine.",
      "Dans 4 682, le chiffre des dizaines est 8. On arrondit donc vers le haut.",
      "L’arrondi à la centaine près est 4 700."
    ),
    tags: ["cm1", "nombres_entiers", "arrondi", "centaine", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_arrondir_qcm_002",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_arrondir",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est l’arrondi de 6 241 à la centaine près ?",
    format: "qcm",
    choices: ["6 200", "6 300", "6 240", "6 000"],
    expected: ["6 200"],
    comparator: "mcq_exact",
    hint: "Pour arrondir à la centaine, regarde le chiffre des dizaines.",
    explanation: exp(
      "Arrondir à la centaine près, c’est choisir la centaine la plus proche.",
      "On regarde le chiffre des dizaines.",
      "Dans 6 241, le chiffre des dizaines est 4. Comme 4 < 5, on garde 6 200.",
      "L’arrondi à la centaine près est 6 200."
    ),
    tags: ["cm1", "nombres_entiers", "arrondi", "centaine", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_arrondir_short_003",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_arrondir",
    difficulty: 2,
    theme: "neutral",
    text: "Arrondis 23 249 au millier près.",
    format: "short",
    expected: ["23000", "23 000"],
    comparator: "number_equal",
    hint: "Pour arrondir au millier, regarde le chiffre des centaines.",
    explanation: exp(
      "Arrondir au millier près, c’est choisir le millier le plus proche.",
      "On regarde le chiffre des centaines.",
      "Dans 23 249, le chiffre des centaines est 2. Comme 2 < 5, on garde 23 milliers.",
      "L’arrondi est 23 000."
    ),
    tags: ["cm1", "nombres_entiers", "arrondi", "millier", "short"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_arrondir_short_004",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_arrondir",
    difficulty: 2,
    theme: "neutral",
    text: "Arrondis 47 820 au millier près.",
    format: "short",
    expected: ["48000", "48 000"],
    comparator: "number_equal",
    hint: "Pour arrondir au millier, regarde le chiffre des centaines.",
    explanation: exp(
      "Arrondir au millier près, c’est choisir le millier le plus proche.",
      "On regarde le chiffre des centaines.",
      "Dans 47 820, le chiffre des centaines est 8. Comme 8 ≥ 5, on augmente le nombre de milliers.",
      "L’arrondi est 48 000."
    ),
    tags: ["cm1", "nombres_entiers", "arrondi", "millier", "short"],
  },

  {
    kind: "template",
    id: "cm1_entier_arrondir_tpl_005_centaine",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_arrondir",
    difficulty: 2,
    theme: "neutral",
    hint: "À la centaine près, regarde le chiffre des dizaines.",
    tags: ["cm1", "nombres_entiers", "arrondi", "centaine", "template", "qcm"],
    generate: () => {
      const n = randomChoice([1248, 3672, 4589, 6124, 7899, 9351]);
      const rounded = Math.round(n / 100) * 100;
      const correct = formatNumber(rounded);

      // ⚠️ L'un des deux voisins EST la bonne réponse — c'est le principe même
      // de l'arrondi — et l'arrondi à la dizaine tombe dessus aussi quand les
      // unités sont proches de 100 (7899 → 7900 des deux côtés). Il ne restait
      // alors qu'une seule proposition en face. Deux centaines voisines, qui
      // ne peuvent jamais coïncider, complètent la liste.
      const wrongs = [
        formatNumber(Math.floor(n / 100) * 100),
        formatNumber(Math.ceil(n / 100) * 100),
        formatNumber(Math.round(n / 10) * 10),
        formatNumber(rounded + 100),
        formatNumber(rounded - 100),
      ].filter((x) => x !== correct);

      return {
        text: tournure(ARR_INTRO, ARR_Q(100)).replace("{n}", formatNumber(n)),
        canvas: droiteN(Math.floor(n / 100) * 100, Math.floor(n / 100) * 100 + 100, 10, [Math.floor(n / 100) * 100, Math.floor(n / 100) * 100 + 50, Math.floor(n / 100) * 100 + 100], [{ value: n, label: fr(n) }]),
        format: "qcm",
        choices: makeChoices(correct, wrongs),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Arrondir permet de donner une valeur approchée plus simple.",
          "Pour arrondir à la centaine près, on regarde le chiffre des dizaines.",
          `${formatNumber(n)} arrondi à la centaine près donne ${correct}.`,
          `La bonne réponse est ${correct}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_entier_arrondir_tpl_006_millier_reunion",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_arrondir",
    difficulty: 3,
    theme: "neutral",
    hint: "Au millier près, regarde le chiffre des centaines.",
    tags: ["cm1", "nombres_entiers", "arrondi", "millier", "template"],
    generate: () => {
      let n = randomInt(10000, 99999);
      if (n % 1000 === 0) n += 370;
      const rounded = Math.round(n / 1000) * 1000;
      const correct = formatNumber(rounded);

      // ⚠️ Même raison qu'au gabarit précédent : l'un des voisins est la bonne
      // réponse, et l'arrondi à la centaine tombe dessus quand le nombre est
      // proche du millier (58 999 → 59 000 des deux côtés).
      const wrongs = [
        formatNumber(Math.floor(n / 1000) * 1000),
        formatNumber(Math.ceil(n / 1000) * 1000),
        formatNumber(Math.round(n / 100) * 100),
        formatNumber(rounded + 1000),
        formatNumber(rounded - 1000),
      ].filter((x) => x !== correct);

      return {
        text: `${un(VIE.filter((c) => c.k >= 5)).t.replace("{n}", formatNumber(n))} ${un(["Arrondis ce nombre au millier près.", "Quel est son arrondi au millier près ?", "Au millier près, cela fait environ combien ?", "Donne une valeur approchée au millier près."])}`,
        canvas: droiteN(Math.floor(n / 1000) * 1000, Math.floor(n / 1000) * 1000 + 1000, 100, [Math.floor(n / 1000) * 1000, Math.floor(n / 1000) * 1000 + 500, Math.floor(n / 1000) * 1000 + 1000], [{ value: n, label: fr(n) }]),
        format: "qcm",
        choices: makeChoices(correct, wrongs),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Arrondir permet de donner une valeur approchée plus simple.",
          "Pour arrondir au millier près, on regarde le chiffre des centaines.",
          `${formatNumber(n)} arrondi au millier près donne ${correct}.`,
          `La bonne réponse est ${correct}.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "cm1_entier_arrondir_open_007",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_arrondir",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi 8 549 s’arrondit à 8 500 à la centaine près, et non à 8 600.",
    format: "open",
    expected: ["dizaines", "4", "inférieur", "5"],
    comparator: "contains_keyword",
    hint: "Pour la centaine, on regarde le chiffre des dizaines.",
    explanation: exp(
      "Pour arrondir à la centaine près, on regarde le chiffre des dizaines.",
      "Si le chiffre des dizaines est 0, 1, 2, 3 ou 4, on garde la centaine. S’il est 5 ou plus, on augmente.",
      "Dans 8 549, le chiffre des dizaines est 4. Comme 4 < 5, on garde 8 500.",
      "Donc 8 549 s’arrondit à 8 500 à la centaine près."
    ),
    tags: ["cm1", "nombres_entiers", "arrondi", "justification", "open"],
  },
    // ============================================================
  // ENTIER_MULTIPLE
  // Reconnaître les multiples simples
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_entier_multiple_qcm_001",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_multiple",
    difficulty: 2,
    theme: "neutral",
    text: "Quel nombre est un multiple de 6 ?",
    format: "qcm",
    choices: ["42", "44", "46", "50"],
    expected: ["42"],
    comparator: "mcq_exact",
    hint: "Un multiple de 6 est dans la table de 6.",
    explanation: exp(
      "Un multiple d’un nombre est un résultat obtenu dans sa table de multiplication.",
      "Pour savoir si 42 est un multiple de 6, on cherche si 42 est dans la table de 6.",
      "6 × 7 = 42.",
      "Donc 42 est un multiple de 6."
    ),
    tags: ["cm1", "nombres_entiers", "multiples", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_multiple_qcm_002",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_multiple",
    difficulty: 2,
    theme: "neutral",
    text: "72 est-il un multiple de 8 ?",
    format: "qcm",
    choices: ["Oui", "Non"],
    expected: ["Oui"],
    comparator: "mcq_exact",
    hint: "Cherche si 72 apparaît dans la table de 8.",
    explanation: exp(
      "Un nombre est un multiple de 8 s’il peut s’écrire 8 × un entier.",
      "On utilise la table de 8.",
      "8 × 9 = 72.",
      "Oui, 72 est un multiple de 8."
    ),
    tags: ["cm1", "nombres_entiers", "multiples", "table", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_multiple_qcm_003",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_multiple",
    difficulty: 2,
    theme: "neutral",
    text: "35 est-il un multiple de 4 ?",
    format: "qcm",
    choices: ["Oui", "Non"],
    expected: ["Non"],
    comparator: "mcq_exact",
    hint: "Cherche dans la table de 4 : 4 × 8 = 32 et 4 × 9 = 36.",
    explanation: exp(
      "Un multiple de 4 est un nombre que l’on obtient dans la table de 4.",
      "On cherche si 35 peut s’écrire 4 × un entier.",
      "4 × 8 = 32 et 4 × 9 = 36. 35 n’est pas dans la table de 4.",
      "Non, 35 n’est pas un multiple de 4."
    ),
    tags: ["cm1", "nombres_entiers", "multiples", "table", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_multiple_qcm_004",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_multiple",
    difficulty: 2,
    theme: "neutral",
    text: "Quel nombre est un multiple de 9 ?",
    format: "qcm",
    choices: ["63", "65", "67", "70"],
    expected: ["63"],
    comparator: "mcq_exact",
    hint: "Un multiple de 9 est dans la table de 9.",
    explanation: exp(
      "Un multiple d’un nombre est un résultat de multiplication.",
      "On cherche un nombre de la table de 9.",
      "9 × 7 = 63.",
      "Donc 63 est un multiple de 9."
    ),
    tags: ["cm1", "nombres_entiers", "multiples", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_multiple_qcm_005_multiple_10",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_multiple",
    difficulty: 2,
    theme: "neutral",
    text: "Quel nombre est un multiple de 10 ?",
    format: "qcm",
    choices: ["120", "125", "128", "102"],
    expected: ["120"],
    comparator: "mcq_exact",
    hint: "Un multiple de 10 se termine par 0.",
    explanation: exp(
      "Un multiple de 10 est un nombre obtenu dans la table de 10.",
      "On peut aussi reconnaître les multiples de 10 : ils se terminent par 0.",
      "120 se termine par 0, et 10 × 12 = 120.",
      "Donc 120 est un multiple de 10."
    ),
    tags: ["cm1", "nombres_entiers", "multiples", "10", "qcm"],
  },

  {
    kind: "template",
    id: "cm1_entier_multiple_tpl_006_trouver_multiple",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_multiple",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche dans la table de multiplication.",
    tags: ["cm1", "nombres_entiers", "multiples", "template", "qcm"],
    generate: () => {
      const base = randomChoice([3, 4, 5, 6, 7, 8, 9]);
      const k = randomInt(3, 10);
      const correctNumber = base * k;

      const correct = String(correctNumber);

      // Les décalages doivent être distincts ET ne jamais retomber sur un
      // multiple de la base. L'ancien « base - 1 » valait 2 quand la base
      // valait 3 : le même nombre était alors proposé deux fois.
      const decalages = [1, -1, 2, -2, base + 1, -(base + 1)];

      return {
        text: tournure(["Pense à la table de {k}.", "Compte de {k} en {k}.", ""], ["Quel nombre est un multiple de {k} ?", "Lequel est dans la table de {k} ?", "Choisis le multiple de {k}.", "Quel nombre s’écrit {k} × un nombre entier ?"]).replace(/\{k\}/g, String(base)),
        format: "qcm",
        choices: makeChoices(
          correct,
          decalages.map((d) => String(correctNumber + d)),
        ),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Un multiple est le résultat d’une multiplication par un nombre entier.",
          `On cherche un nombre qui peut s’écrire ${base} × un entier.`,
          `${base} × ${k} = ${correctNumber}.`,
          `${correctNumber} est donc un multiple de ${base}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_entier_multiple_tpl_007_oui_non",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_multiple",
    difficulty: 2,
    theme: "neutral",
    hint: "Essaie de retrouver une multiplication exacte.",
    tags: ["cm1", "nombres_entiers", "multiples", "template", "oui_non", "qcm"],
    generate: () => {
      const base = randomChoice([3, 4, 5, 6, 7, 8, 9]);
      const isMultiple = randomChoice([true, false]);

      const k = randomInt(3, 10);
      const value = isMultiple ? base * k : base * k + randomChoice([1, 2]);

      return {
        text: tournure(["Regarde la table de {k}.", "Voici la table de {k}.", ""], ["{v} est-il un multiple de {k} ?", "{v} est-il dans la table de {k} ?", "Est-ce que {v} est un multiple de {k} ?"]).replace(/\{k\}/g, String(base)).replace("{v}", String(value)),
        canvas: tableDe(base),
        format: "qcm",
        choices: ["Oui", "Non"],
        expected: [isMultiple ? "Oui" : "Non"],
        comparator: "mcq_exact",
        explanation: exp(
          `Un multiple de ${base} est un résultat de la table de ${base}.`,
          "On cherche si le nombre peut s’écrire comme une multiplication par ce nombre.",
          isMultiple
            ? `${base} × ${k} = ${value}.`
            : `${value} n’apparaît pas exactement dans la table de ${base}.`,
          isMultiple
            ? `Oui, ${value} est un multiple de ${base}.`
            : `Non, ${value} n’est pas un multiple de ${base}.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "cm1_entier_multiple_open_008",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_multiple",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi 45 est un multiple de 5.",
    format: "open",
    expected: ["5", "9", "45"],
    comparator: "contains_keyword",
    hint: "Trouve une multiplication qui donne 45.",
    explanation: exp(
      "Un multiple de 5 est un nombre que l’on obtient dans la table de 5.",
      "On cherche une multiplication avec 5.",
      "5 × 9 = 45.",
      "Donc 45 est un multiple de 5."
    ),
    tags: ["cm1", "nombres_entiers", "multiples", "justification", "open"],
  },

  // ============================================================
  // ENTIER_DEFI
  // Résoudre un défi sur les nombres entiers
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_entier_defi_qcm_001",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Je suis un nombre entier. Je suis supérieur à 2 500, inférieur à 2 600, et multiple de 10. Quel nombre peut être la réponse ?",
    format: "qcm",
    choices: ["2 540", "2 499", "2 601", "2 555"],
    expected: ["2 540"],
    comparator: "mcq_exact",
    hint: "Vérifie les trois conditions une par une.",
    explanation: exp(
      "Un défi sur les nombres entiers demande souvent de vérifier plusieurs informations.",
      "On teste les conditions : intervalle, comparaison et multiple.",
      "2 540 est bien entre 2 500 et 2 600. Il se termine par 0, donc c’est un multiple de 10.",
      "La réponse possible est 2 540."
    ),
    tags: ["cm1", "nombres_entiers", "defi", "comparaison", "multiple", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_defi_qcm_002",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Je suis un nombre entier à 4 chiffres. Mon chiffre des milliers est 4. Je suis plus petit que 4 300. Quel nombre peut être la réponse ?",
    format: "qcm",
    choices: ["4 120", "5 120", "4 350", "412"],
    expected: ["4 120"],
    comparator: "mcq_exact",
    hint: "Le nombre doit avoir 4 chiffres, commencer par 4 et être inférieur à 4 300.",
    explanation: exp(
      "Un défi sur les nombres entiers peut contenir plusieurs contraintes.",
      "On vérifie chaque information.",
      "4 120 a 4 chiffres, commence par 4, et 4 120 < 4 300.",
      "Une réponse possible est 4 120."
    ),
    tags: ["cm1", "nombres_entiers", "defi", "comparaison", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_defi_short_003_marche",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_defi",
    difficulty: 3,
    theme: "reunion",
    text: "Au marché de Saint-Pierre, un vendeur range 72 letchis dans des sachets de 8. Combien de sachets peut-il remplir ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "Cherche combien de fois 8 est contenu dans 72.",
    explanation: exp(
      "Résoudre un problème avec des entiers demande de choisir la bonne opération.",
      "Quand on partage une quantité en groupes égaux, on utilise une division.",
      "72 ÷ 8 = 9.",
      "Le vendeur peut remplir 9 sachets."
    ),
    tags: ["cm1", "nombres_entiers", "defi", "division", "reunion"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_defi_short_004_classe",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Une école reçoit 96 cahiers. On les répartit dans 12 boîtes identiques. Combien de cahiers y a-t-il dans chaque boîte ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "On partage 96 en 12 groupes égaux.",
    explanation: exp(
      "Quand on répartit une quantité en parts égales, on utilise une division.",
      "On divise le total par le nombre de groupes.",
      "96 ÷ 12 = 8.",
      "Il y a 8 cahiers dans chaque boîte."
    ),
    tags: ["cm1", "nombres_entiers", "defi", "division", "probleme"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_defi_short_005_arrondi",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Un nombre entier est 3 482. Quel est son arrondi à la centaine près ?",
    format: "short",
    expected: ["3500", "3 500"],
    comparator: "number_equal",
    hint: "À la centaine près, regarde le chiffre des dizaines.",
    explanation: exp(
      "Arrondir à la centaine près, c’est choisir la centaine la plus proche.",
      "On regarde le chiffre des dizaines.",
      "Dans 3 482, le chiffre des dizaines est 8. Comme 8 ≥ 5, on augmente la centaine.",
      "L’arrondi est 3 500."
    ),
    tags: ["cm1", "nombres_entiers", "defi", "arrondi"],
  },

  {
    kind: "template",
    id: "cm1_entier_defi_tpl_006_sachets",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Il faut utiliser une multiplication ou une division.",
    tags: ["cm1", "nombres_entiers", "defi", "multiple", "probleme"],
    generate: () => {
      const parSachet = randomChoice([4, 6, 8, 9, 12]);
      const nbSachets = randomInt(5, 12);
      const quantite = parSachet * nbSachets;

      return {
        text: (() => {
          const c = un(PAQUETS);
          return `${c.t.replace("{N}", String(quantite)).replace("{k}", String(parSachet))} Combien de ${c.cont} ${c.f ? "complètes" : "complets"} peut-on faire ?`;
        })(),
        canvas: barrePaquets(parSachet, String(quantite), "paquet"),
        format: "short",
        expected: [String(nbSachets)],
        comparator: "number_equal",
        explanation: exp(
          "Quand on fait des groupes égaux, on utilise une division.",
          "On divise le nombre total par le nombre d’objets dans chaque groupe.",
          `${quantite} ÷ ${parSachet} = ${nbSachets}.`,
          `On peut préparer ${nbSachets} sachets complets.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_entier_defi_tpl_007_arrondi",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Commence par repérer le rang demandé : centaine ou millier.",
    tags: ["cm1", "nombres_entiers", "defi", "arrondi", "template"],
    generate: () => {
      let n = randomInt(1000, 9999);
      if (n % 100 === 0) n += 37;
      const rounded = Math.round(n / 100) * 100;

      return {
        text: `${un(VIE).t.replace("{n}", formatNumber(n))} ${un(["Quel est l’arrondi de ce nombre à la centaine près ?", "Arrondis-le à la centaine près.", "À la centaine près, cela fait environ combien ?"])}`,
        canvas: droiteN(Math.floor(n / 100) * 100, Math.floor(n / 100) * 100 + 100, 10, [Math.floor(n / 100) * 100, Math.floor(n / 100) * 100 + 50, Math.floor(n / 100) * 100 + 100], [{ value: n, label: fr(n) }]),
        format: "short",
        expected: [String(rounded), formatNumber(rounded)],
        comparator: "number_equal",
        explanation: exp(
          "Arrondir à la centaine près, c’est choisir la centaine la plus proche.",
          "On regarde le chiffre des dizaines.",
          `${formatNumber(n)} s’arrondit à ${formatNumber(rounded)}.`,
          `L’arrondi est ${formatNumber(rounded)}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm1_entier_defi_tpl_008_nombre_mystere",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Vérifie les indices un par un.",
    tags: ["cm1", "nombres_entiers", "defi", "nombre_mystere", "template", "qcm"],
    generate: () => {
      const millier = randomChoice([2, 3, 4, 5, 6]);
      const start = millier * 1000 + 400;
      const correctNumber = millier * 1000 + 520;

      const correct = formatNumber(correctNumber);

      return {
        text: `${un(DEVINETTE)} je suis un nombre à 4 chiffres. Mon chiffre des milliers est ${millier}. Je suis plus grand que ${formatNumber(
          start
        )} et je suis un multiple de 10. Quel nombre peut convenir ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          formatNumber(millier * 1000 + 399),
          formatNumber((millier + 1) * 1000 + 20),
          formatNumber(millier * 1000 + 555),
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Un nombre mystère doit respecter tous les indices.",
          "On vérifie le chiffre des milliers, la comparaison et le multiple de 10.",
          `${correct} commence par ${millier}, est plus grand que ${formatNumber(
            start
          )}, et se termine par 0.`,
          `Donc ${correct} convient.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "cm1_entier_defi_open_009",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Je suis un nombre entier à 4 chiffres. Mon chiffre des milliers est 3. Je suis plus grand que 3 500. Je suis un multiple de 10. Donne un exemple possible et explique.",
    format: "open",
    expected: ["3", "multiple", "10", "0"],
    comparator: "contains_keyword",
    hint: "Un multiple de 10 se termine par 0.",
    explanation: exp(
      "Un défi peut avoir plusieurs réponses possibles si toutes les conditions sont respectées.",
      "On vérifie chaque condition : nombre à 4 chiffres, commence par 3, plus grand que 3 500, multiple de 10.",
      "Par exemple, 3 620 convient : il a 4 chiffres, commence par 3, est plus grand que 3 500, et se termine par 0.",
      "Une réponse possible est 3 620, mais il y en a d’autres."
    ),
    tags: ["cm1", "nombres_entiers", "defi", "open", "raisonnement"],
  },

  // ============================================================
  // TOP-UP — ENTIER_LIRE
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_entier_lire_short_007",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Écris en chiffres : « cinquante mille deux cents ».",
    format: "short",
    expected: ["50200", "50 200"],
    comparator: "number_equal",
    hint: "Il y a 50 milliers et 2 centaines.",
    explanation: exp(
      "Écrire un nombre en chiffres demande de placer chaque classe correctement.",
      "On repère les milliers, puis les centaines, dizaines et unités.",
      "« cinquante mille » = 50 000 et « deux cents » = 200. Donc 50 000 + 200 = 50 200.",
      "Le nombre est 50 200."
    ),
    tags: ["cm1", "nombres_entiers", "lecture", "short"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_lire_qcm_008",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Comment écrit-on en chiffres : « huit mille neuf » ?",
    format: "qcm",
    choices: ["8 009", "8 900", "8 090", "80 009"],
    expected: ["8 009"],
    comparator: "mcq_exact",
    hint: "Il y a 8 milliers et 9 unités. Attention aux zéros.",
    explanation: exp(
      "Les zéros gardent les positions vides dans un nombre entier.",
      "On place les milliers puis les unités.",
      "« huit mille » = 8 000 et « neuf » = 9. Donc 8 000 + 9 = 8 009.",
      "Le nombre s’écrit 8 009."
    ),
    tags: ["cm1", "nombres_entiers", "lecture", "zeros", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_lire_short_009",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Écris en chiffres : « seize mille ».",
    format: "short",
    expected: ["16000", "16 000"],
    comparator: "number_equal",
    hint: "Il y a 16 milliers et aucune unité.",
    explanation: exp(
      "Un nombre de milliers entiers se termine par trois zéros.",
      "On place 16 milliers, puis des zéros pour les centaines, dizaines et unités.",
      "« seize mille » = 16 000.",
      "Le nombre est 16 000."
    ),
    tags: ["cm1", "nombres_entiers", "lecture", "zeros", "short"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_lire_qcm_010",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Comment écrit-on en chiffres : « soixante mille quarante » ?",
    format: "qcm",
    choices: ["60 040", "60 400", "6 040", "600 040"],
    expected: ["60 040"],
    comparator: "mcq_exact",
    hint: "Il y a 60 milliers et 40 unités, pas de centaines.",
    explanation: exp(
      "Les zéros servent à garder les bonnes colonnes.",
      "On place les milliers puis les dizaines.",
      "« soixante mille » = 60 000 et « quarante » = 40. Donc 60 000 + 40 = 60 040.",
      "Le nombre s’écrit 60 040."
    ),
    tags: ["cm1", "nombres_entiers", "lecture", "zeros", "qcm"],
  },

  // ============================================================
  // TOP-UP — ENTIER_COMPARER
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_entier_comparer_qcm_008",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_comparer",
    difficulty: 1,
    theme: "neutral",
    text: "Quel est le plus petit nombre ?",
    format: "qcm",
    choices: ["5 067", "5 607", "5 706", "5 760"],
    expected: ["5 067"],
    comparator: "mcq_exact",
    hint: "Compare les chiffres de gauche à droite.",
    explanation: exp(
      "Comparer des nombres, c’est trouver le plus petit ou le plus grand.",
      "Tous commencent par 5. On compare ensuite les centaines.",
      "5 067 a 0 centaine, c’est le plus petit nombre de centaines.",
      "Le plus petit nombre est 5 067."
    ),
    tags: ["cm1", "nombres_entiers", "comparaison", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_comparer_qcm_009",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_comparer",
    difficulty: 1,
    theme: "neutral",
    text: "Complète : 47 050 ... 47 005",
    format: "qcm",
    choices: [">", "<", "="],
    expected: [">"],
    comparator: "mcq_exact",
    hint: "Les deux commencent par 47 0. Compare ensuite les dizaines.",
    explanation: exp(
      "Les signes < et > servent à comparer deux nombres.",
      "On compare les chiffres de gauche à droite.",
      "47 050 et 47 005 commencent pareil, mais 5 dizaines est plus grand que 0 dizaine.",
      "On écrit donc 47 050 > 47 005."
    ),
    tags: ["cm1", "nombres_entiers", "comparaison", "symboles", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_comparer_qcm_010",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel rangement est dans l’ordre décroissant ?",
    format: "qcm",
    choices: [
      "7 800 > 7 080 > 7 008",
      "7 008 > 7 080 > 7 800",
      "7 080 > 7 800 > 7 008",
      "7 800 > 7 008 > 7 080",
    ],
    expected: ["7 800 > 7 080 > 7 008"],
    comparator: "mcq_exact",
    hint: "Ordre décroissant : du plus grand au plus petit.",
    explanation: exp(
      "Ordonner dans l’ordre décroissant, c’est ranger du plus grand au plus petit.",
      "On compare les nombres puis on place le plus grand d’abord.",
      "7 800 > 7 080 > 7 008.",
      "L’ordre décroissant est : 7 800 > 7 080 > 7 008."
    ),
    tags: ["cm1", "nombres_entiers", "ordre_decroissant", "qcm"],
  },

  // ============================================================
  // TOP-UP — ENTIER_DECOMPOSER
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_entier_decomposer_qcm_008",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_decomposer",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est la bonne décomposition de 5 064 ?",
    format: "qcm",
    choices: [
      "5 000 + 60 + 4",
      "5 000 + 600 + 4",
      "500 + 60 + 4",
      "5 000 + 6 + 4",
    ],
    expected: ["5 000 + 60 + 4"],
    comparator: "mcq_exact",
    hint: "Le chiffre des centaines est 0.",
    explanation: exp(
      "Décomposer un nombre, c’est écrire la valeur de ses chiffres non nuls.",
      "On repère la position de chaque chiffre.",
      "Dans 5 064 : 5 vaut 5 000, 0 centaine, 6 vaut 60, 4 vaut 4.",
      "Donc 5 064 = 5 000 + 60 + 4."
    ),
    tags: ["cm1", "nombres_entiers", "decomposition", "zeros", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_decomposer_short_009",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_decomposer",
    difficulty: 2,
    theme: "neutral",
    text: "Complète : 30 000 + 2 000 + 700 + 5 = ...",
    format: "short",
    expected: ["32705", "32 705"],
    comparator: "number_equal",
    hint: "Il n’y a pas de dizaines : la colonne des dizaines est vide.",
    explanation: exp(
      "Composer un nombre, c’est regrouper les valeurs de ses chiffres.",
      "On place chaque valeur dans la bonne colonne, avec des zéros pour les colonnes vides.",
      "30 000 + 2 000 + 700 + 5 = 32 705.",
      "Le nombre est 32 705."
    ),
    tags: ["cm1", "nombres_entiers", "composition", "zeros", "short"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_decomposer_qcm_010",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_decomposer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel nombre vaut 8 000 + 40 + 6 ?",
    format: "qcm",
    choices: ["8 046", "8 406", "8 460", "846"],
    expected: ["8 046"],
    comparator: "mcq_exact",
    hint: "Il n’y a pas de centaines : le chiffre des centaines est 0.",
    explanation: exp(
      "Composer un nombre, c’est additionner les valeurs placées dans les bonnes colonnes.",
      "On garde les colonnes vides avec des zéros.",
      "8 000 + 40 + 6 = 8 046.",
      "Le nombre est 8 046."
    ),
    tags: ["cm1", "nombres_entiers", "composition", "zeros", "qcm"],
  },

  // ============================================================
  // TOP-UP — ENTIER_ARRONDIR
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_entier_arrondir_qcm_008",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_arrondir",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est l’arrondi de 5 350 à la centaine près ?",
    format: "qcm",
    choices: ["5 400", "5 300", "5 350", "5 000"],
    expected: ["5 400"],
    comparator: "mcq_exact",
    hint: "À la centaine près, regarde le chiffre des dizaines.",
    explanation: exp(
      "Arrondir à la centaine près, c’est choisir la centaine la plus proche.",
      "On regarde le chiffre des dizaines.",
      "Dans 5 350, le chiffre des dizaines est 5. Comme 5 ≥ 5, on augmente la centaine.",
      "L’arrondi à la centaine près est 5 400."
    ),
    tags: ["cm1", "nombres_entiers", "arrondi", "centaine", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_arrondir_short_009",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_arrondir",
    difficulty: 2,
    theme: "neutral",
    text: "Arrondis 18 600 au millier près.",
    format: "short",
    expected: ["19000", "19 000"],
    comparator: "number_equal",
    hint: "Au millier près, regarde le chiffre des centaines.",
    explanation: exp(
      "Arrondir au millier près, c’est choisir le millier le plus proche.",
      "On regarde le chiffre des centaines.",
      "Dans 18 600, le chiffre des centaines est 6. Comme 6 ≥ 5, on augmente le nombre de milliers.",
      "L’arrondi est 19 000."
    ),
    tags: ["cm1", "nombres_entiers", "arrondi", "millier", "short"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_arrondir_short_010",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_arrondir",
    difficulty: 2,
    theme: "neutral",
    text: "Arrondis 7 149 à la centaine près.",
    format: "short",
    expected: ["7100", "7 100"],
    comparator: "number_equal",
    hint: "À la centaine près, regarde le chiffre des dizaines.",
    explanation: exp(
      "Arrondir à la centaine près, c’est choisir la centaine la plus proche.",
      "On regarde le chiffre des dizaines.",
      "Dans 7 149, le chiffre des dizaines est 4. Comme 4 < 5, on garde 7 100.",
      "L’arrondi est 7 100."
    ),
    tags: ["cm1", "nombres_entiers", "arrondi", "centaine", "short"],
  },

  // ============================================================
  // TOP-UP — ENTIER_MULTIPLE
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_entier_multiple_qcm_009",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_multiple",
    difficulty: 2,
    theme: "neutral",
    text: "Quel nombre est un multiple de 7 ?",
    format: "qcm",
    choices: ["56", "58", "60", "51"],
    expected: ["56"],
    comparator: "mcq_exact",
    hint: "Un multiple de 7 est dans la table de 7.",
    explanation: exp(
      "Un multiple d’un nombre est un résultat de sa table de multiplication.",
      "On cherche un nombre de la table de 7.",
      "7 × 8 = 56.",
      "Donc 56 est un multiple de 7."
    ),
    tags: ["cm1", "nombres_entiers", "multiples", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_entier_multiple_qcm_010",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_multiple",
    difficulty: 2,
    theme: "neutral",
    text: "48 est-il un multiple de 6 ?",
    format: "qcm",
    choices: ["Oui", "Non"],
    expected: ["Oui"],
    comparator: "mcq_exact",
    hint: "Cherche si 48 apparaît dans la table de 6.",
    explanation: exp(
      "Un nombre est un multiple de 6 s’il peut s’écrire 6 × un entier.",
      "On utilise la table de 6.",
      "6 × 8 = 48.",
      "Oui, 48 est un multiple de 6."
    ),
    tags: ["cm1", "nombres_entiers", "multiples", "table", "qcm"],
  },

  // ============================================================
  // TOP-UP — ENTIER_DEFI
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_entier_defi_qcm_010",
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "entier_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Je suis un nombre entier. Je suis supérieur à 6 000, inférieur à 6 100, et multiple de 10. Quel nombre peut être la réponse ?",
    format: "qcm",
    choices: ["6 050", "5 990", "6 105", "6 055"],
    expected: ["6 050"],
    comparator: "mcq_exact",
    hint: "Vérifie les trois conditions une par une.",
    explanation: exp(
      "Un défi sur les nombres entiers demande de vérifier plusieurs informations.",
      "On teste l’intervalle puis le multiple de 10.",
      "6 050 est bien entre 6 000 et 6 100, et il se termine par 0.",
      "La réponse possible est 6 050."
    ),
    tags: ["cm1", "nombres_entiers", "defi", "comparaison", "multiple", "qcm"],
  },
];
