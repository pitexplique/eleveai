// lib/tutor-v4/questionBank/cm2/maths/nombres-decimaux-outils.ts
//
// ⭐ 14/11/2026 — LES GABARITS DES NOMBRES DÉCIMAUX DE CM2 (notion `nombre_decimal`).
// Les sept micros decimal_lire, decimal_fraction, decimal_valeur_chiffre,
// decimal_comparer, decimal_ordonner, decimal_arrondir et decimal_defi n'avaient
// que 1 à 4 squelettes (16 à 19 répétitions sur 20 à chaque étoile). Même
// architecture que le CM1 (cm1/maths/decimaux-outils.ts, 7c56ec6e), au niveau
// CM2 : JUSQU'AUX MILLIÈMES. Chaque gabarit tire une SITUATION (métiers, sport,
// cuisine, jardin, marché…) × une TOURNURE × des nombres, et porte un dessin
// `@/lib/canvas` cohérent :
//   - le TABLEAU DE NUMÉRATION (`tableau_donnees` : centaines | dizaines | unités
//     | dixièmes | centièmes | millièmes), VIDE quand la question demande
//     d'écrire un nombre ou de trouver un rang ;
//   - la DROITE GRADUÉE (`number_line`) : lire, comparer, encadrer, arrondir ;
//   - la BANDE de 10 et la GRILLE de 100 (`fraction`) : dixièmes et centièmes.
// ⛔ Les pièges sont de vraies erreurs d'élève : « 2,15 > 2,9 car 15 > 9 »,
// « 0,305 > 0,35 », 3/1000 → 0,03 ou 0,3, dixième / centième / millième
// confondus (et dizaine / dixième, centaine / centième), oublier le zéro de
// 7,025, arrondir en tronquant. Jamais deux choix de même valeur (« 2,5 » et
// « 2,50 ») : `choisir` compare les VALEURS avant de garder un piège.
// ⛔ CM2 = zéro clavier : uniquement des QCM. Le « / » n'apparaît que dans la
// micro decimal_fraction ; ailleurs on écrit « 3 dixièmes ».

import type { CanvasFigure, TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { melangeEnPlace } from "@/lib/tutor-v4/questionBank/melange";

type Q = TutorGeneratedQuestionV4;
type Etoile = 1 | 2 | 3 | 4;
type Nd = 1 | 2 | 3;

/* ───────────────────────── petits outils ───────────────────────── */

const ent = (a: number, b: number) => Math.floor(Math.random() * (b - a + 1)) + a;
const pick = <T,>(l: readonly T[]): T => l[Math.floor(Math.random() * l.length)];
const melange = <T,>(l: readonly T[]): T[] => melangeEnPlace([...l]);
const hasard = (p: number) => Math.random() < p;
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const pl = (n: number, mot: string) => `${n} ${mot}${n > 1 ? "s" : ""}`;
/** « de Léa », « d’Ambre ». */
const de = (nom: string) => (/^[AEIOUYÉÈ]/.test(nom) ? `d’${nom}` : `de ${nom}`);
const parfois = (p: number, f: () => CanvasFigure | undefined) => (hasard(p) ? f() : undefined);

/** Des chiffres tous différents, de 1 à 9. */
const chiffres = (n: number, sauf: number[] = []) => melange([1, 2, 3, 4, 5, 6, 7, 8, 9].filter((c) => !sauf.includes(c))).slice(0, n);

/** « 1250 » → « 1 250 ». */
const milliers = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
/** Nombre de chiffres utiles après la virgule d'une valeur en millièmes. */
const ndNat = (v: number): 0 | Nd => (v % 1000 === 0 ? 0 : v % 100 === 0 ? 1 : v % 10 === 0 ? 2 : 3);
/** v millièmes écrit avec nd chiffres après la virgule (nd naturel si absent ; jamais moins). */
function fm(v: number, nd?: number): string {
  const e = Math.floor(v / 1000);
  const r = v % 1000;
  const n = Math.max(nd ?? 0, ndNat(v));
  if (n === 0) return milliers(e);
  return `${milliers(e)},${String(r).padStart(3, "0").slice(0, n)}`;
}
/** « 2,15 » → 2150 millièmes. */
const val = (s: string) => Math.round(Number(s.replace(/\s/g, "").replace(",", ".")) * 1000);
/** Nombre de chiffres après la virgule. */
const nbDec = (s: string) => (s.split(",")[1] ?? "").length;
const RANG_DEC = ["dixième", "centième", "millième"] as const;

const UNITES_L = ["zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix", "onze", "douze", "treize", "quatorze", "quinze", "seize", "dix-sept", "dix-huit", "dix-neuf"];
const DIZAINES_L = ["", "dix", "vingt", "trente", "quarante", "cinquante", "soixante"];
function lettres(n: number): string {
  if (n >= 100) {
    const c = Math.floor(n / 100);
    const r = n % 100;
    const tete = c === 1 ? "cent" : `${UNITES_L[c]} cent${r === 0 ? "s" : ""}`;
    return r === 0 ? tete : `${tete} ${lettres(r)}`;
  }
  if (n < 20) return UNITES_L[n];
  const d = Math.floor(n / 10);
  const u = n % 10;
  if (d === 7) return u === 1 ? "soixante et onze" : `soixante-${UNITES_L[10 + u]}`;
  if (d === 8) return u === 0 ? "quatre-vingts" : `quatre-vingt-${UNITES_L[u]}`;
  if (d === 9) return `quatre-vingt-${UNITES_L[10 + u]}`;
  if (u === 0) return DIZAINES_L[d];
  return u === 1 ? `${DIZAINES_L[d]} et un` : `${DIZAINES_L[d]}-${UNITES_L[u]}`;
}
/** « deux unités », « une unité », « vingt et un millièmes ». */
function enLettres(n: number, mot: string, fem = false): string {
  let l = lettres(n);
  if (fem && /(^|[ -])un$/.test(l)) l = l.replace(/un$/, "une");
  return `${l} ${mot}${n > 1 ? "s" : ""}`;
}

/** « 4 unités et 56 centièmes » (p = partie décimale en nombre de dixièmes, centièmes ou millièmes). */
const lecture = (e: number, p: number, nd: Nd) => (e === 0 ? pl(p, RANG_DEC[nd - 1]) : `${pl(e, "unité")} et ${pl(p, RANG_DEC[nd - 1])}`);
const lectureL = (e: number, p: number, nd: Nd) =>
  e === 0 ? enLettres(p, RANG_DEC[nd - 1]) : `${enLettres(e, "unité", true)} et ${enLettres(p, RANG_DEC[nd - 1])}`;
/** e et p écrits avec p au rang nd (null si p ne tient pas dans nd chiffres). */
const auRang = (e: number, p: number, nd: number) => (p < 10 ** nd ? `${milliers(e)},${String(p).padStart(nd, "0")}` : null);

/** La valeur d'un choix : un nombre (avec unité), une fraction, une addition ; sinon le texte. */
function cle(s: string): string {
  const t = s.trim().replace(/(\d) (?=\d{3}(?!\d))/g, "$1");
  const somme = t.match(/^\d+(?:,\d+)?(?:\s\+\s\d+(?:,\d+)?)+$/);
  if (somme) return String(Math.round(t.split(" + ").reduce((a, x) => a + Number(x.replace(",", ".")), 0) * 1e6) / 1e6);
  const f = t.match(/^(\d+)\s*\/\s*(\d+)$/);
  if (f) return String(Math.round((Number(f[1]) / Number(f[2])) * 1e6) / 1e6);
  const m = t.match(/^(\d+(?:,\d+)?)(?:\s+(.*))?$/);
  if (m) return `${Math.round(Number(m[1].replace(",", ".")) * 1e6) / 1e6}|${m[2] ?? ""}`;
  return t.toLowerCase();
}

/** La bonne réponse + trois pièges au plus, tous de valeurs différentes. */
function choisir(correct: string, pieges: readonly (string | false | null | undefined)[]): string[] {
  const vus = new Set([cle(correct)]);
  const out: string[] = [];
  for (const p of melange(pieges.filter((x): x is string => !!x))) {
    const k = cle(p);
    if (vus.has(k)) continue;
    vus.add(k);
    out.push(p);
    if (out.length === 3) break;
  }
  return melange([correct, ...out]);
}

function qcm(text: string, correct: string, pieges: readonly (string | false | null | undefined)[], explanation: string, canvas?: CanvasFigure): Q {
  return {
    text,
    format: "qcm",
    choices: choisir(correct, pieges),
    expected: [correct],
    comparator: "mcq_exact",
    explanation,
    ...(canvas ? { canvas } : {}),
  };
}

const exp = (methode: string, calcul: string, conclusion: string) =>
  `Méthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;

function gab(id: string, microId: string, difficulty: Etoile, hint: string, tags: string[], generate: () => Q): TutorBankItemV4 {
  return {
    kind: "template",
    id,
    niveau: "cm2",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["cm2", "nombre_decimal", ...tags, "template", "qcm"],
    generate,
  } as TutorBankItemV4;
}

/* ───────────────────────── les dessins ───────────────────────── */

const ENTIERS = ["centaines", "dizaines", "unités"];
const DECIMAUX = ["dixièmes", "centièmes", "millièmes"];

/** Le tableau de numération : une ligne par nombre (null = ligne vide). */
function tab(nombres: (string | null)[], o: { labels?: string[]; nInt?: number; nd?: number } = {}): CanvasFigure {
  const parts = nombres.map((s) => (s === null ? null : s.replace(/\s/g, "").split(",")));
  const nInt = Math.min(3, Math.max(o.nInt ?? 1, ...parts.map((p) => (p ? p[0].length : 1))));
  const nd = Math.min(3, Math.max(o.nd ?? 1, ...parts.map((p) => (p ? (p[1] ?? "").length : 1))));
  const headers = [...ENTIERS.slice(3 - nInt), ...DECIMAUX.slice(0, nd)];
  const rows = parts.map((p, i) => {
    let values: string[];
    if (!p) values = headers.map(() => "");
    else {
      const ip = p[0];
      const dp = p[1] ?? "";
      const entiers = Array.from({ length: nInt }, (_, k) => {
        const idx = ip.length - nInt + k;
        return idx >= 0 ? ip[idx] : "";
      });
      values = [...entiers, ...Array.from({ length: nd }, (_, k) => dp[k] ?? "")];
    }
    return { ...(o.labels ? { label: o.labels[i] } : {}), values };
  });
  return {
    kind: "tableau_donnees",
    title: "Tableau de numération",
    ...(o.labels ? { coin: "" } : {}),
    headers,
    rows,
    display: { compact: true, striped: false },
  } as CanvasFigure;
}

const arr = (x: number) => Math.round(x * 10000) / 10000;

/** Une droite graduée de min à max, petits traits tous les `pas`, seuls `ecrites` portent leur nombre. */
function droite(min: number, max: number, pas: number, ecrites: number[], points: { value: number; label: string }[]): CanvasFigure {
  return {
    kind: "number_line",
    size: { width: 340, height: 110 },
    min: arr(min),
    max: arr(max),
    step: arr(max - min),
    minorStep: pas,
    valeursEcrites: ecrites.map(arr),
    points: points.map((p) => ({ value: arr(p.value), label: p.label, color: "#2563eb" })),
    display: { showTicks: true, showValues: true, showPoints: true, showPointLabels: true, showZero: true },
  } as CanvasFigure;
}
/** La droite de e à e + 1 (dixièmes) qui porte les nombres donnés en millièmes. */
const droiteUnite = (e: number, pts: { v: number; label: string }[]) =>
  droite(e, e + 1, 0.1, [e, e + 1], pts.map((p) => ({ value: p.v / 1000, label: p.label })));

const bande = (k: number): CanvasFigure =>
  ({
    kind: "fraction",
    model: "bar",
    fraction: { numerator: k, denominator: 10 },
    display: { showFraction: false, showLabel: false, showParts: true, unequalParts: false },
  }) as CanvasFigure;

const grille = (n: number): CanvasFigure =>
  ({
    kind: "fraction",
    model: "grid",
    grid: { rows: 10, cols: 10, shaded: n },
    display: { showFraction: false },
  }) as CanvasFigure;

/* ───────────────────────── les situations ───────────────────────── */

type Personne = { nom: string; f: boolean };
const PERSONNES: Personne[] = [
  ["Léa", 1], ["Noah", 0], ["Inès", 1], ["Malik", 0], ["Sofia", 1], ["Hugo", 0], ["Nora", 1], ["Yanis", 0],
  ["Jade", 1], ["Adam", 0], ["Lina", 1], ["Tom", 0], ["Chloé", 1], ["Rayan", 0], ["Emma", 1], ["Kenji", 0],
  ["Aya", 1], ["Lucas", 0], ["Zoé", 1], ["Samuel", 0], ["Maëlys", 1], ["Ilyes", 0], ["Ambre", 1], ["Oscar", 0],
].map(([nom, f]) => ({ nom: nom as string, f: f === 1 }));
const il = (p: Personne) => (p.f ? "elle" : "il");
/** « Le boulanger » → « du boulanger » ; « La maîtresse » → « de la maîtresse ». */
const duQui = (qui: string) => qui.replace(/^Le /, "du ").replace(/^La /, "de la ").replace(/^L’/, "de l’");
const personnes = (n: number) => melange(PERSONNES).slice(0, n);

/** Une personne qui écrit, dicte ou annonce un nombre (métiers compris). */
const ANNONCEURS: { qui: string; f: boolean }[] = [
  { qui: "La maîtresse", f: true }, { qui: "Le boulanger", f: false }, { qui: "La couturière", f: true },
  { qui: "Le menuisier", f: false }, { qui: "La pharmacienne", f: true }, { qui: "Le facteur", f: false },
  { qui: "L’infirmière", f: true }, { qui: "Le jardinier", f: false }, { qui: "La vétérinaire", f: true },
  { qui: "Le caissier", f: false }, { qui: "La cheffe cuisinière", f: true }, { qui: "Le maçon", f: false },
  { qui: "L’arbitre", f: false }, { qui: "La météorologue", f: true }, { qui: "Le chauffeur du car", f: false },
  { qui: "La chimiste", f: true }, { qui: "L’architecte", f: false }, { qui: "La géomètre", f: true },
];

/** Le nom de l'unité, pour « au dixième de kilogramme près ». */
const NOM_U: Record<string, { n: string; f?: boolean }> = {
  kg: { n: "kilogramme" }, m: { n: "mètre" }, L: { n: "litre" }, km: { n: "kilomètre" },
  s: { n: "seconde", f: true }, cm: { n: "centimètre" }, "°C": { n: "degré" }, "€": { n: "euro" },
};
function pres(u: string, r: 0 | 1 | 2): string {
  const { n, f } = NOM_U[u];
  const voy = /^[aeiouyé]/.test(n);
  if (r === 0) return voy ? `à l’${n} près` : f ? `à la ${n} près` : `au ${n} près`;
  return `au ${r === 1 ? "dixième" : "centième"} ${voy ? "d’" : "de "}${n} près`;
}

type Mesure = {
  u: string;
  min: number;
  max: number;
  /** nombre de chiffres après la virgule que la situation supporte */
  nd: Nd;
  dit: (x: string, p: Personne) => string;
  /** ce qu'on mesure, pour « On arrondit … » */
  quoi: string;
  prix?: boolean;
};
const MESURES: Mesure[] = [
  { u: "kg", min: 1, max: 6, nd: 3, quoi: "la masse des pommes", dit: (x) => `La balance du primeur affiche ${x} kg de pommes.` },
  { u: "kg", min: 1, max: 9, nd: 3, quoi: "la masse du colis", dit: (x) => `Le facteur pèse un colis : ${x} kg.` },
  { u: "m", min: 2, max: 4, nd: 2, quoi: "la longueur du saut", dit: (x, p) => `${p.nom} saute ${x} m au saut en longueur.` },
  { u: "m", min: 1, max: 6, nd: 2, quoi: "la longueur du tissu", dit: (x) => `La couturière coupe ${x} m de tissu.` },
  { u: "m", min: 1, max: 4, nd: 3, quoi: "la longueur de la planche", dit: (x) => `Le menuisier scie une planche de ${x} m.` },
  { u: "s", min: 7, max: 12, nd: 2, quoi: "le temps de la course", dit: (x, p) => `${p.nom} court le 60 m en ${x} s.` },
  { u: "L", min: 0, max: 1, nd: 3, quoi: "l’eau de la gourde", dit: (x, p) => `La gourde ${de(p.nom)} contient ${x} L d’eau.` },
  { u: "km", min: 12, max: 45, nd: 3, quoi: "la distance parcourue", dit: (x) => `La cycliste a parcouru ${x} km ce matin.` },
  { u: "°C", min: 36, max: 39, nd: 1, quoi: "la température", dit: (x) => `Le thermomètre de l’infirmière indique ${x} °C.` },
  { u: "L", min: 0, max: 2, nd: 3, quoi: "le lait versé", dit: (x) => `La pâtissière verse ${x} L de lait dans la pâte.` },
  { u: "m", min: 3, max: 9, nd: 2, quoi: "la longueur de la haie", dit: (x) => `Le jardinier plante une haie de ${x} m.` },
  { u: "kg", min: 2, max: 9, nd: 3, quoi: "la masse du chiot", dit: (x) => `La vétérinaire pèse un chiot : ${x} kg.` },
  { u: "km", min: 3, max: 15, nd: 3, quoi: "la distance de la balade", dit: (x) => `La randonneuse a marché ${x} km.` },
  { u: "m", min: 1, max: 5, nd: 3, quoi: "la longueur du tuyau", dit: (x) => `Le plombier coupe un tuyau de ${x} m.` },
  { u: "L", min: 20, max: 60, nd: 1, quoi: "l’eau de l’aquarium", dit: (x) => `L’aquarium du soigneur contient ${x} L d’eau.` },
  { u: "m", min: 2, max: 12, nd: 2, quoi: "la longueur du mur", dit: (x) => `La maçonne construit un mur de ${x} m de long.` },
  { u: "s", min: 15, max: 30, nd: 2, quoi: "le temps de nage", dit: (x, p) => `${p.nom} nage le 25 m en ${x} s.` },
  { u: "cm", min: 0, max: 5, nd: 1, quoi: "la hauteur de pluie", dit: (x) => `Le pluviomètre de la météo indique ${x} cm de pluie.` },
  { u: "€", min: 4, max: 15, nd: 2, prix: true, quoi: "le prix du livre", dit: (x) => `À la librairie, le livre coûte ${x} €.` },
  { u: "m", min: 1, max: 1, nd: 2, quoi: "la taille", dit: (x, p) => `Chez le médecin, ${p.nom} mesure ${x} m.` },
  { u: "kg", min: 1, max: 9, nd: 3, quoi: "la masse de farine", dit: (x) => `La boulangère pèse ${x} kg de farine.` },
  { u: "km", min: 10, max: 90, nd: 1, quoi: "la distance du trajet", dit: (x) => `Le chauffeur du car a roulé ${x} km.` },
  { u: "cm", min: 3, max: 12, nd: 1, quoi: "la hauteur de la tige", dit: (x, p) => `La tige du haricot ${de(p.nom)} mesure ${x} cm.` },
  { u: "€", min: 1, max: 3, nd: 2, prix: true, quoi: "le prix de la baguette", dit: (x) => `À la boulangerie, la baguette coûte ${x} €.` },
  { u: "kg", min: 3, max: 8, nd: 3, quoi: "la masse du poisson", dit: (x) => `Le pêcheur a pris un poisson de ${x} kg.` },
  { u: "m", min: 5, max: 20, nd: 2, quoi: "la longueur du lancer", dit: (x, p) => `${p.nom} lance la balle à ${x} m.` },
  { u: "km", min: 2, max: 9, nd: 3, quoi: "la distance de la montée", dit: (x) => `Au Piton de la Fournaise, la guide fait marcher son groupe ${x} km.` },
  { u: "L", min: 1, max: 3, nd: 3, quoi: "l’eau du bécher", dit: (x) => `La chimiste verse ${x} L d’eau dans un grand bécher.` },
  { u: "m", min: 0, max: 1, nd: 3, quoi: "la largeur de la fenêtre", dit: (x) => `L’architecte dessine une fenêtre de ${x} m de large.` },
  { u: "s", min: 9, max: 12, nd: 2, quoi: "le temps du sprint", dit: (x) => `Au chronomètre de l’arbitre, le sprinteur court le 100 m en ${x} s.` },
  { u: "kg", min: 0, max: 1, nd: 3, quoi: "la masse des plantes", dit: (x) => `La pharmacienne pèse ${x} kg de plantes pour la tisane.` },
  { u: "m", min: 10, max: 60, nd: 2, quoi: "la longueur du terrain", dit: (x) => `La géomètre mesure un terrain de ${x} m de long.` },
];

/** Une situation qui accueille le nombre x (sinon une phrase neutre). */
function phrase(x: string, p = pick(PERSONNES)): { texte: string; m?: Mesure } {
  const e = Math.floor(val(x) / 1000);
  const nd = nbDec(x);
  const ok = MESURES.filter((m) => e >= m.min && e <= m.max && nd <= m.nd && !(m.prix && nd !== 2));
  if (ok.length && hasard(0.85)) {
    const m = pick(ok);
    return { texte: m.dit(x, p), m };
  }
  const neutres = [
    `${p.nom} écrit ${x} au tableau.`,
    `Le nombre ${x} s’affiche sur la calculatrice.`,
    `${p.nom} lit le nombre ${x} dans son cahier.`,
    `La maîtresse écrit ${x} au tableau.`,
    `Sur l’écran du jeu, on lit ${x}.`,
  ];
  return { texte: pick(neutres) };
}

/** Une mesure tirée : situation + partie entière dans son intervalle. */
function mesure(o: { nd: Nd; maxEnt?: number; minEnt?: number; prixOk?: boolean }) {
  let l = MESURES.filter(
    (m) => m.nd >= o.nd && (o.maxEnt === undefined || m.min <= o.maxEnt) && (o.minEnt === undefined || m.max >= o.minEnt) && !(m.prix && (o.nd !== 2 || o.prixOk === false)),
  );
  if (!l.length) l = MESURES.filter((m) => m.nd >= o.nd && !m.prix);
  const m = pick(l);
  const e = ent(Math.max(m.min, o.minEnt ?? 0), Math.max(Math.max(m.min, o.minEnt ?? 0), Math.min(m.max, o.maxEnt ?? 999)));
  return { m, e };
}

/** Une partie décimale de nd chiffres, en millièmes, dernier chiffre non nul. */
function partDec(nd: Nd): number {
  if (nd === 1) return ent(1, 9) * 100;
  if (nd === 2) {
    let c = ent(1, 99);
    if (c % 10 === 0) c += 1;
    return c * 10;
  }
  let m = ent(1, 999);
  if (m % 10 === 0) m += 1;
  return m;
}

/** Deux personnes, une même épreuve : grand = la plus grande mesure, petit = la plus petite. */
type Duel = { u: string; min: number; max: number; nd: Nd; dit: (p: string, x: string) => string; grand: string; petit: string };
const DUELS: Duel[] = [
  { u: "m", min: 2, max: 4, nd: 2, dit: (p, x) => `${p} saute ${x} m`, grand: "Qui a sauté le plus loin ?", petit: "Qui a sauté le moins loin ?" },
  { u: "m", min: 8, max: 25, nd: 2, dit: (p, x) => `${p} lance le ballon à ${x} m`, grand: "Qui a lancé le plus loin ?", petit: "Qui a lancé le moins loin ?" },
  { u: "s", min: 7, max: 10, nd: 2, dit: (p, x) => `${p} court le 50 m en ${x} s`, grand: "Qui a été le plus lent ?", petit: "Qui a été le plus rapide ?" },
  { u: "s", min: 18, max: 30, nd: 2, dit: (p, x) => `${p} nage le 25 m en ${x} s`, grand: "Qui a mis le plus de temps ?", petit: "Qui a nagé le plus vite ?" },
  { u: "m", min: 0, max: 1, nd: 3, dit: (p, x) => `le plant de tomates ${de(p)} mesure ${x} m`, grand: "Qui a le plant le plus haut ?", petit: "Qui a le plant le plus petit ?" },
  { u: "kg", min: 1, max: 9, nd: 3, dit: (p, x) => `le colis ${de(p)} pèse ${x} kg`, grand: "Qui envoie le colis le plus lourd ?", petit: "Qui envoie le colis le plus léger ?" },
  { u: "kg", min: 3, max: 8, nd: 3, dit: (p, x) => `la pastèque ${de(p)} pèse ${x} kg`, grand: "Qui a la pastèque la plus lourde ?", petit: "Qui a la pastèque la plus légère ?" },
  { u: "km", min: 2, max: 9, nd: 3, dit: (p, x) => `${p} marche ${x} km`, grand: "Qui a marché le plus ?", petit: "Qui a marché le moins ?" },
  { u: "km", min: 5, max: 30, nd: 3, dit: (p, x) => `${p} roule ${x} km à vélo`, grand: "Qui a roulé le plus loin ?", petit: "Qui a roulé le moins loin ?" },
  { u: "L", min: 0, max: 1, nd: 3, dit: (p, x) => `la gourde ${de(p)} contient ${x} L`, grand: "Qui a le plus d’eau ?", petit: "Qui a le moins d’eau ?" },
  { u: "m", min: 1, max: 1, nd: 2, dit: (p, x) => `${p} mesure ${x} m`, grand: "Qui est le plus grand ?", petit: "Qui est le plus petit ?" },
  { u: "kg", min: 1, max: 4, nd: 3, dit: (p, x) => `le chaton ${de(p)} pèse ${x} kg`, grand: "Qui a le chaton le plus lourd ?", petit: "Qui a le chaton le plus léger ?" },
  { u: "m", min: 1, max: 6, nd: 2, dit: (p, x) => `le ruban ${de(p)} mesure ${x} m`, grand: "Qui a le ruban le plus long ?", petit: "Qui a le ruban le plus court ?" },
  { u: "m", min: 1, max: 4, nd: 3, dit: (p, x) => `la planche ${de(p)} mesure ${x} m`, grand: "Qui a la planche la plus longue ?", petit: "Qui a la planche la plus courte ?" },
  { u: "kg", min: 2, max: 7, nd: 3, dit: (p, x) => `le poisson pêché par ${p} pèse ${x} kg`, grand: "Qui a pêché le plus gros poisson ?", petit: "Qui a pêché le plus petit poisson ?" },
  { u: "L", min: 2, max: 9, nd: 3, dit: (p, x) => `le seau ${de(p)} recueille ${x} L de pluie`, grand: "Qui a recueilli le plus de pluie ?", petit: "Qui a recueilli le moins de pluie ?" },
  { u: "m", min: 0, max: 1, nd: 2, dit: (p, x) => `${p} saute ${x} m en hauteur`, grand: "Qui a sauté le plus haut ?", petit: "Qui a sauté le moins haut ?" },
  { u: "kg", min: 0, max: 1, nd: 3, dit: (p, x) => `le sac de bonbons ${de(p)} pèse ${x} kg`, grand: "Qui a le sac le plus lourd ?", petit: "Qui a le sac le plus léger ?" },
];
const duel = (nd: Nd) => pick(DUELS.filter((d) => d.nd >= nd));
const eDe = (min: number, max: number) => ent(Math.max(min, max >= 1 ? 1 : 0), max);

/** Plusieurs objets d'un même genre, pour les rangements. */
type Lot = { u: string; min: number; max: number; nd: Nd; objets: string; verbe: string; croiss: string; decroiss: string; grand: string; petit: string };
const LOTS: Lot[] = [
  { u: "kg", min: 1, max: 9, nd: 3, objets: "colis", verbe: "pèsent", croiss: "du plus léger au plus lourd", decroiss: "du plus lourd au plus léger", grand: "Quel est le plus lourd ?", petit: "Quel est le plus léger ?" },
  { u: "m", min: 1, max: 4, nd: 3, objets: "planches", verbe: "mesurent", croiss: "de la plus courte à la plus longue", decroiss: "de la plus longue à la plus courte", grand: "Quelle est la plus longue ?", petit: "Quelle est la plus courte ?" },
  { u: "m", min: 2, max: 4, nd: 2, objets: "sauts", verbe: "mesurent", croiss: "du plus court au plus long", decroiss: "du plus long au plus court", grand: "Quel saut est le plus long ?", petit: "Quel saut est le plus court ?" },
  { u: "L", min: 0, max: 1, nd: 3, objets: "gourdes", verbe: "contiennent", croiss: "de la moins remplie à la plus remplie", decroiss: "de la plus remplie à la moins remplie", grand: "Laquelle contient le plus d’eau ?", petit: "Laquelle contient le moins d’eau ?" },
  { u: "kg", min: 1, max: 2, nd: 3, objets: "melons", verbe: "pèsent", croiss: "du plus léger au plus lourd", decroiss: "du plus lourd au plus léger", grand: "Quel melon est le plus lourd ?", petit: "Quel melon est le plus léger ?" },
  { u: "m", min: 1, max: 6, nd: 2, objets: "rubans", verbe: "mesurent", croiss: "du plus court au plus long", decroiss: "du plus long au plus court", grand: "Quel ruban est le plus long ?", petit: "Quel ruban est le plus court ?" },
  { u: "km", min: 3, max: 15, nd: 3, objets: "randonnées", verbe: "font", croiss: "de la plus courte à la plus longue", decroiss: "de la plus longue à la plus courte", grand: "Quelle randonnée est la plus longue ?", petit: "Quelle randonnée est la plus courte ?" },
  { u: "L", min: 1, max: 2, nd: 3, objets: "bouteilles de jus", verbe: "contiennent", croiss: "de la moins remplie à la plus remplie", decroiss: "de la plus remplie à la moins remplie", grand: "Laquelle contient le plus de jus ?", petit: "Laquelle contient le moins de jus ?" },
  { u: "kg", min: 2, max: 7, nd: 3, objets: "poissons", verbe: "pèsent", croiss: "du plus léger au plus lourd", decroiss: "du plus lourd au plus léger", grand: "Quel poisson est le plus lourd ?", petit: "Quel poisson est le plus léger ?" },
  { u: "kg", min: 3, max: 8, nd: 3, objets: "pastèques", verbe: "pèsent", croiss: "de la plus légère à la plus lourde", decroiss: "de la plus lourde à la plus légère", grand: "Quelle pastèque est la plus lourde ?", petit: "Quelle pastèque est la plus légère ?" },
  { u: "kg", min: 2, max: 9, nd: 3, objets: "chiots", verbe: "pèsent", croiss: "du plus léger au plus lourd", decroiss: "du plus lourd au plus léger", grand: "Quel chiot est le plus lourd ?", petit: "Quel chiot est le plus léger ?" },
  { u: "m", min: 0, max: 1, nd: 3, objets: "plants de tomates", verbe: "mesurent", croiss: "du plus petit au plus haut", decroiss: "du plus haut au plus petit", grand: "Quel plant est le plus haut ?", petit: "Quel plant est le plus petit ?" },
  { u: "m", min: 1, max: 5, nd: 3, objets: "tuyaux", verbe: "mesurent", croiss: "du plus court au plus long", decroiss: "du plus long au plus court", grand: "Quel tuyau est le plus long ?", petit: "Quel tuyau est le plus court ?" },
  { u: "km", min: 5, max: 30, nd: 3, objets: "balades à vélo", verbe: "font", croiss: "de la plus courte à la plus longue", decroiss: "de la plus longue à la plus courte", grand: "Quelle balade est la plus longue ?", petit: "Quelle balade est la plus courte ?" },
  { u: "kg", min: 1, max: 9, nd: 3, objets: "sacs de farine", verbe: "pèsent", croiss: "du plus léger au plus lourd", decroiss: "du plus lourd au plus léger", grand: "Quel sac est le plus lourd ?", petit: "Quel sac est le plus léger ?" },
  { u: "L", min: 0, max: 2, nd: 3, objets: "flacons de sirop", verbe: "contiennent", croiss: "du moins rempli au plus rempli", decroiss: "du plus rempli au moins rempli", grand: "Quel flacon contient le plus ?", petit: "Quel flacon contient le moins ?" },
  { u: "kg", min: 0, max: 1, nd: 3, objets: "pots de miel", verbe: "pèsent", croiss: "du plus léger au plus lourd", decroiss: "du plus lourd au plus léger", grand: "Quel pot est le plus lourd ?", petit: "Quel pot est le plus léger ?" },
];
const NOMBRE_L = ["", "", "Deux", "Trois", "Quatre", "Cinq"];
const lot = (nd: Nd = 1) => pick(LOTS.filter((l) => l.nd >= nd));
const eLot = (l: Lot) => ent(l.min, l.max);

/** Une écriture donnée par ses chiffres, avec le rang de chacun. */
type Rang = "centaines" | "dizaines" | "unités" | "dixièmes" | "centièmes" | "millièmes";
const SING: Record<Rang, string> = { centaines: "centaine", dizaines: "dizaine", unités: "unité", dixièmes: "dixième", centièmes: "centième", millièmes: "millième" };
const EXPO: Record<Rang, number> = { centaines: 2, dizaines: 1, unités: 0, dixièmes: -1, centièmes: -2, millièmes: -3 };
const TOUS_RANGS: Rang[] = ["centaines", "dizaines", "unités", "dixièmes", "centièmes", "millièmes"];
/** Les mots qui se ressemblent : la vraie erreur d'élève. */
const VOISIN: Record<Rang, Rang> = { centaines: "centièmes", dizaines: "dixièmes", unités: "dixièmes", dixièmes: "dizaines", centièmes: "centaines", millièmes: "centièmes" };
/** La valeur d'un chiffre c au rang r, écrite en nombre : 300 ; 30 ; 3 ; 0,3 ; 0,03 ; 0,003. */
const valeurRang = (c: number, r: Rang) => (EXPO[r] >= 0 ? String(c * 10 ** EXPO[r]) : `0,${"0".repeat(-EXPO[r] - 1)}${c}`);
/** « 3 dixièmes », « 1 centième ». */
const nomRang = (c: number, r: Rang) => pl(c, SING[r]);

type Ecrit = { x: string; v: number; e: number; nInt: number; nd: number; pos: { r: Rang; c: number }[] };
function ecrit(intDigits: number[], decDigits: number[]): Ecrit {
  const ip = intDigits.length ? intDigits.join("") : "0";
  const x = decDigits.length ? `${ip},${decDigits.join("")}` : ip;
  const ri = ENTIERS.slice(3 - Math.max(1, intDigits.length)) as Rang[];
  const pos = [
    ...intDigits.map((c, i) => ({ r: ri[i], c })),
    ...decDigits.map((c, i) => ({ r: DECIMAUX[i] as Rang, c })),
  ];
  return { x, v: val(x), e: Number(ip), nInt: Math.max(1, intDigits.length), nd: decDigits.length, pos };
}
/** Un nombre aux chiffres tous différents (1 à 9). */
function distinct(nInt: number, nd: number): Ecrit {
  const ds = chiffres(nInt + nd);
  return ecrit(ds.slice(0, nInt), ds.slice(nInt));
}

/* ═══════════════════════════ DECIMAL_LIRE ═══════════════════════════ */

const ML = "decimal_lire";

/** Une phrase « écris ce nombre » portée par une personne ou un métier. */
function ecrire(desc: string): string {
  const p = pick(PERSONNES);
  const a = pick(ANNONCEURS);
  return pick([
    `Écris en chiffres : ${desc}.`,
    `${a.qui} dicte : « ${desc} ». Quel nombre faut-il écrire ?`,
    `${p.nom} doit écrire ${desc}. Quel nombre écrit-${il(p)} ?`,
    `Quel nombre a ${desc} ?`,
    `${a.qui} note une mesure : ${desc}. Quel nombre écrit-${a.f ? "elle" : "il"} ?`,
    `Sur son cahier, ${p.nom} lit « ${desc} ». Comment l’écrire avec une virgule ?`,
  ]);
}

/** Les mauvaises écritures de « e unités et p (dixièmes|centièmes|millièmes) ». */
function piegesEcriture(e: number, p: number, nd: Nd): (string | null)[] {
  const pad = String(p).padStart(nd, "0");
  return [
    ...[1, 2, 3, 4].filter((n) => n !== nd).map((n) => auRang(e, p, n)),
    `${milliers(Number(`${e}${pad}`))}`,
    p !== e && p < 1000 && e < 10 ** nd && e > 0 ? `${p},${String(e).padStart(nd, "0")}` : null,
    e > 0 ? `0,${e}${pad}` : null,
  ];
}

/** ★1 Lire un nombre à un ou deux chiffres après la virgule. */
function lireQ(): Q {
  const nd = pick([1, 2, 2] as const);
  const { m, e } = mesure({ nd, maxEnt: 99 });
  const r = partDec(nd);
  const v = e * 1000 + r;
  const x = fm(v);
  const p = r / 10 ** (3 - nd);
  const ctx = m.dit(x, pick(PERSONNES));
  const t = pick([`Comment lit-on ${x} ?`, `Que veut dire ${x} ?`, "Comment se lit ce nombre ?", `Quelle phrase dit la même chose que ${x} ?`, `Comment dire ${x} avec des mots ?`]);
  const correct = lecture(e, p, nd);
  const pad = String(p).padStart(nd, "0");
  return qcm(
    `${ctx} ${t}`,
    correct,
    [
      ...([1, 2, 3] as const).filter((n) => n !== nd).map((n) => lecture(e, p, n)),
      e > 0 && e !== p && e < 10 ** nd ? lecture(p, e, nd) : null,
      pl(Number(`${e}${pad}`), "unité"),
      nd === 2 && p < 10 ? lecture(e, p, 1) : null,
    ],
    exp(
      `Le dernier chiffre après la virgule donne le rang : ${nd === 1 ? "un chiffre → des dixièmes" : "deux chiffres → des centièmes"}.`,
      `${x} : ${e} avant la virgule, ${pad} après la virgule.`,
      `${x} se lit ${correct}.`,
    ),
    hasard(0.5) ? tab([x]) : parfois(0.7, () => droiteUnite(e, [{ v, label: x }])),
  );
}

/** ★1 Écrire « e unités et p dixièmes / centièmes ». */
function ecrireQ(): Q {
  const nd = pick([1, 2, 2] as const);
  const e = hasard(0.3) ? ent(10, 49) : ent(0, 9);
  let p = nd === 1 ? ent(1, 9) : hasard(0.4) ? ent(1, 9) : ent(11, 99);
  if (p % 10 === 0) p += 1;
  const desc = hasard(0.35) ? lectureL(e, p, nd) : lecture(e, p, nd);
  const x = auRang(e, p, nd) as string;
  return qcm(
    ecrire(desc),
    x,
    piegesEcriture(e, p, nd),
    exp(
      "On écrit les unités, la virgule, puis la partie décimale : le dernier chiffre tombe au rang demandé.",
      `${lecture(e, p, nd)} → ${x}${nd === 2 && p < 10 ? " (0 au rang des dixièmes)" : ""}.`,
      `Le nombre est ${x}.`,
    ),
    parfois(0.75, () => tab([null], { nd, nInt: String(e).length })),
  );
}

/** ★1 Partie entière, partie décimale. */
function partieQ(): Q {
  const nd = pick([1, 2, 3] as const);
  const { m, e } = mesure({ nd, minEnt: 1 });
  const r = partDec(nd);
  const v = e * 1000 + r;
  const x = fm(v);
  const ctx = m.dit(x, pick(PERSONNES));
  const dp = x.split(",")[1];
  const entiere = hasard(0.6);
  const t = entiere
    ? pick([`Quelle est la partie entière de ${x} ?`, `Dans ${x}, quel nombre forme la partie entière ?`, `Combien d’unités entières y a-t-il dans ${x} ?`, `Quel nombre est écrit avant la virgule de ${x} ?`])
    : pick([`Quelle est la partie décimale de ${x} ?`, `Dans ${x}, que vaut la partie après la virgule ?`, `Quel nombre forme la partie décimale de ${x} ?`]);
  const s = String(e);
  const correct = entiere ? s : `0,${dp}`;
  const pieges = entiere
    ? [String(Number(dp)), s.length > 1 ? s[s.length - 1] : null, `${s}${dp}`, String(e + 1), `${s},${dp[0]}`]
    : [String(Number(dp)), s, `0,${s}`, `${s},${dp}`, `0,0${dp}`];
  return qcm(
    `${ctx} ${t}`,
    correct,
    pieges,
    exp("La virgule sépare la partie entière (avant) de la partie décimale (après).", `Dans ${x} : ${s} avant la virgule, ${dp} après.`, `La réponse est ${correct}.`),
    hasard(0.45) ? tab([x]) : parfois(0.7, () => droiteUnite(e, [{ v, label: x }])),
  );
}

/** ★2 Lire un nombre à trois chiffres après la virgule. */
function lireMilliemesQ(): Q {
  const { m, e } = mesure({ nd: 3, maxEnt: 49 });
  const p = hasard(0.35) ? ent(1, 99) : partDec(3);
  const pp = p % 10 === 0 ? p + 1 : p;
  const v = e * 1000 + pp;
  const x = fm(v);
  const ctx = m.dit(x, pick(PERSONNES));
  const t = pick([`Comment lit-on ${x} ?`, `Que veut dire ${x} ?`, "Comment se lit ce nombre ?", `Quelle phrase dit la même chose que ${x} ?`, `${x}, c’est :`]);
  const correct = lecture(e, pp, 3);
  return qcm(
    `${ctx} ${t}`,
    correct,
    [lecture(e, pp, 2), lecture(e, pp, 1), e > 0 && e < 1000 && e !== pp ? lecture(pp, e, 3) : null, pl(Number(`${e}${String(pp).padStart(3, "0")}`), "unité")],
    exp("Trois chiffres après la virgule : le dernier est au rang des millièmes, on lit des millièmes.", `${x} : ${e} unité${e > 1 ? "s" : ""}, puis ${String(pp).padStart(3, "0")} après la virgule.`, `${x} se lit ${correct}.`),
    hasard(0.6) ? tab([x]) : parfois(0.6, () => droite(Math.floor(v / 100) / 10, Math.floor(v / 100) / 10 + 0.1, 0.01, [Math.floor(v / 100) / 10, Math.floor(v / 100) / 10 + 0.1], [{ value: v / 1000, label: x }])),
  );
}

/** ★2 Écrire « e unités et p millièmes » (le zéro utile de 7,025). */
function ecrireMilliemesQ(): Q {
  const e = hasard(0.3) ? ent(10, 39) : ent(1, 9);
  const genre = pick(["unite", "dizaine", "centaine", "dizaine"] as const);
  let p = genre === "unite" ? ent(1, 9) : genre === "dizaine" ? ent(11, 99) : ent(101, 999);
  if (p % 10 === 0) p += 1;
  const desc = hasard(0.35) ? lectureL(e, p, 3) : lecture(e, p, 3);
  const x = auRang(e, p, 3) as string;
  return qcm(
    ecrire(desc),
    x,
    [...piegesEcriture(e, p, 3), p >= 100 ? `${e},0${p}` : null],
    exp(
      "Les millièmes occupent le 3e rang après la virgule ; un rang vide reçoit un 0.",
      `${lecture(e, p, 3)} → ${x}.`,
      `Le nombre est ${x}${p < 100 ? ` (et non ${e},${p})` : ""}.`,
    ),
    parfois(0.75, () => tab([null], { nd: 3, nInt: String(e).length })),
  );
}

/** ★2 Dictée en lettres jusqu'aux millièmes. */
function dicteeQ(): Q {
  const nd = pick([2, 3, 3] as const);
  const e = hasard(0.45) ? ent(10, 89) : ent(1, 9);
  let p = nd === 2 ? (hasard(0.3) ? ent(1, 9) : ent(11, 99)) : pick([ent(1, 9), ent(11, 99), ent(101, 999), ent(101, 999)]);
  if (p % 10 === 0) p += 1;
  const desc = lectureL(e, p, nd);
  const x = auRang(e, p, nd) as string;
  return qcm(
    ecrire(desc),
    x,
    piegesEcriture(e, p, nd),
    exp(`On écrit la partie entière, la virgule, puis la partie décimale sur ${nd} rangs.`, `${desc} → ${x}.`, `Le nombre est ${x}.`),
    parfois(0.7, () => tab([null], { nd, nInt: String(e).length })),
  );
}

/** ★2 Un nombre donné par ses rangs, un rang vide au milieu. */
function rangsVersNombreQ(): Q {
  const e = ent(1, 9);
  const [a, b] = chiffres(2);
  const trou = pick(["dixièmes", "centièmes"] as const);
  const digits = trou === "dixièmes" ? [0, a, b] : [a, 0, b];
  const x = `${e},${digits.join("")}`;
  const morceaux = [nomRang(e, "unités"), ...digits.map((c, i) => (c ? nomRang(c, DECIMAUX[i] as Rang) : null)).filter((s): s is string => !!s)];
  const desc = `${morceaux.slice(0, -1).join(", ")} et ${morceaux[morceaux.length - 1]}`;
  const p = pick(PERSONNES);
  const text = pick([
    `Quel nombre a ${desc} ?`,
    `${p.nom} a ${desc}. Quel nombre a-t-${il(p)} ?`,
    `${pick(ANNONCEURS).qui} écrit un nombre : ${desc}. Lequel ?`,
    `Écris en chiffres : ${desc}.`,
  ]);
  return qcm(
    text,
    x,
    [`${e},${a}${b}`, trou === "dixièmes" ? `${e},${a}0${b}` : `${e},0${a}${b}`, trou === "dixièmes" ? `${e},00${a}${b}` : `${e},${a}00${b}`, `${b},${a}${e}`],
    exp("Chaque chiffre va dans son rang ; un rang sans chiffre reçoit un 0.", `${desc} → ${e} | ${digits.join(" | ")}.`, `Le nombre est ${x}.`),
    parfois(0.8, () => tab([null], { nd: 3 })),
  );
}

/* ═══════════════════════════ DECIMAL_FRACTION ═══════════════════════════ */
// ⚠️ La seule micro où le « / » est permis : on relie k/10, n/100, n/1000 et l'écriture à virgule.

const MF = "decimal_fraction";
const BANDES: ((k: number, p: Personne) => string)[] = [
  (k, p) => `Une tablette de chocolat a 10 carrés. ${p.nom} en mange ${k}.`,
  (k) => `La palissade a 10 lattes. Le peintre en a peint ${k}.`,
  (k) => `Un ruban est partagé en 10 parts égales ; la couturière en colorie ${k}.`,
  (k, p) => `Le gâteau ${de(p.nom)} est coupé en 10 parts égales ; ${k} parts sont mangées.`,
  (k) => `Le potager a 10 rangs ; la jardinière en a semé ${k}.`,
  (k) => `Une barre de 10 cubes a ${k} cubes rouges.`,
  (k) => `Le chemin est partagé en 10 tronçons ; la randonneuse en a parcouru ${k}.`,
  (k) => `Le mur a 10 rangées de briques ; le maçon en a monté ${k}.`,
  (k) => `La jauge du réservoir a 10 crans ; ${k} crans sont allumés.`,
  (k) => `La pizza est coupée en 10 parts égales ; le pizzaïolo en sert ${k}.`,
  (k, p) => `${p.nom} lit un livre de 10 chapitres. ${cap(il(p))} en a lu ${k}.`,
  (k) => `La piscine a 10 lignes d’eau ; ${k} lignes sont occupées.`,
  (k) => `Une frise de 10 cases a ${k} cases coloriées.`,
  (k) => `La batterie de la tablette a 10 barres ; ${k} sont allumées.`,
  (k) => `Le car a 10 rangées de sièges ; ${k} rangées sont occupées.`,
];
const GRILLES: ((n: number, p: Personne) => string)[] = [
  (n) => `Le carreleur doit poser 100 carreaux. Il en a posé ${n}.`,
  (n, p) => `Sur une grille de 100 cases, ${p.nom} en colorie ${n}.`,
  (n) => `Le jardin est partagé en 100 parcelles ; ${n} sont plantées.`,
  (n, p) => `L’album ${de(p.nom)} a 100 vignettes ; ${p.nom} en a collé ${n}.`,
  (n) => `La salle de spectacle a 100 places ; ${n} sont vendues.`,
  (n) => `Le maraîcher a 100 salades ; il en a vendu ${n}.`,
  (n) => `Une mosaïque compte 100 carrés ; l’artiste en a peint ${n}.`,
  (n) => `Le parking a 100 places ; ${n} sont prises.`,
  (n, p) => `${p.nom} a un puzzle de 100 pièces ; ${n} sont posées.`,
  (n) => `La bibliothécaire range 100 livres ; ${n} sont déjà rangés.`,
];

/** Une quantité donnée en fraction (« 3/10 de kilogramme ») ou à virgule (« 0,3 kg »). */
type CtxFrac = { u: string; nomU: string; dit: (q: string, p: Personne) => string };
const CTX_FRAC: CtxFrac[] = [
  { u: "kg", nomU: "kilogramme", dit: (q) => `La pharmacienne pèse ${q} de plantes.` },
  { u: "m", nomU: "mètre", dit: (q) => `Le menuisier rabote ${q} de bois.` },
  { u: "km", nomU: "kilomètre", dit: (q) => `La cycliste a déjà parcouru ${q}.` },
  { u: "L", nomU: "litre", dit: (q) => `La chimiste verse ${q} d’eau dans un tube.` },
  { u: "L", nomU: "litre", dit: (q, p) => `${p.nom} boit ${q} de jus d’orange.` },
  { u: "kg", nomU: "kilogramme", dit: (q) => `Le boulanger ajoute ${q} de sel dans la pâte.` },
  { u: "m", nomU: "mètre", dit: (q) => `La couturière coupe ${q} de ruban.` },
  { u: "L", nomU: "litre", dit: (q) => `L’infirmière prépare ${q} de sirop.` },
  { u: "kg", nomU: "kilogramme", dit: (q) => `Le facteur pèse une lettre : ${q}.` },
  { u: "km", nomU: "kilomètre", dit: (q, p) => `${p.nom} marche ${q} jusqu’à l’école.` },
  { u: "m", nomU: "mètre", dit: (q) => `Le plombier coupe ${q} de tuyau.` },
  { u: "kg", nomU: "kilogramme", dit: (q) => `La cheffe cuisinière pèse ${q} de beurre.` },
  { u: "L", nomU: "litre", dit: (q) => `Le jardinier verse ${q} d’engrais dans l’arrosoir.` },
  { u: "km", nomU: "kilomètre", dit: (q) => `Le nageur a déjà nagé ${q}.` },
  { u: "kg", nomU: "kilogramme", dit: (q) => `La bijoutière pèse ${q} d’argent.` },
  { u: "m", nomU: "mètre", dit: (q) => `L’escargot de la classe a avancé de ${q}.` },
];
/** « Le menuisier rabote 3/10 de mètre de bois. Quel nombre décimal est-ce ? » */
function enFraction(frac: string): string {
  const c = pick(CTX_FRAC);
  const q = `${frac} de ${c.nomU}`;
  return `${c.dit(q, pick(PERSONNES))} ${pick([`Écris cette quantité avec une virgule.`, `Combien de ${c.nomU}s est-ce, en nombre décimal ?`, `Comment écrire ${frac} avec une virgule ?`, `Quel nombre décimal est égal à ${frac} ?`])}`;
}
/** « La pharmacienne pèse 0,7 kg de plantes. Quelle fraction de kilogramme est-ce ? » */
function enVirgule(x: string): string {
  const c = pick(CTX_FRAC);
  return `${c.dit(`${x} ${c.u}`, pick(PERSONNES))} ${pick([`Quelle fraction de ${c.nomU} est-ce ?`, `Écris ${x} avec une fraction décimale.`, `Quelle fraction décimale est égale à ${x} ?`])}`;
}

/** ★1 La bande de 10 : fraction ou nombre décimal. */
function bandeQ(): Q {
  const k = ent(1, 9);
  const ctx = pick(BANDES)(k, pick(PERSONNES));
  const enDec = hasard(0.55);
  const t = enDec
    ? pick(["Quel nombre décimal représente cette part ?", "Écris cette part avec une virgule.", "Cette part du tout s’écrit :", "Quelle part du tout est-ce, en nombre décimal ?"])
    : pick(["Quelle fraction du tout est-ce ?", "Quelle fraction représente cette part ?", "Cette part s’écrit avec une fraction :", "Quelle fraction est coloriée ?"]);
  const correct = enDec ? `0,${k}` : `${k}/10`;
  const pieges = enDec ? [`0,0${k}`, 10 - k !== k ? `0,${10 - k}` : null, `1,${k}`, String(k)] : [`${k}/100`, 10 - k !== k ? `${10 - k}/10` : null, k > 1 ? `1/${k}` : null, `10/${k}`];
  return qcm(
    `${ctx} ${t}`,
    correct,
    pieges,
    exp("Le tout est partagé en 10 : chaque part est un dixième (1/10 = 0,1).", `${k} parts sur 10 → ${k}/10 = 0,${k}.`, `La réponse est ${correct}.`),
    bande(k),
  );
}

/** ★1 k/10 → 0,k. */
function fracDixQ(): Q {
  const k = ent(1, 9);
  const p = pick(PERSONNES);
  const t = hasard(0.5) ? enFraction(`${k}/10`) : pick([
    `Écris ${k}/10 avec une virgule.`,
    `${k}/10 = ?`,
    `Quel nombre décimal est égal à ${k}/10 ?`,
    `${p.nom} a bu ${k}/10 du litre de jus. Quel nombre décimal de litre est-ce ?`,
    `La recette demande ${k}/10 de kilogramme de farine. Comment l’écrire avec une virgule ?`,
    `Le peintre a peint ${k}/10 du mur. Quel nombre décimal est-ce ?`,
  ]);
  return qcm(
    t,
    `0,${k}`,
    [`0,0${k}`, `${k},10`, `1,${k}`, `0,00${k}`, `${k},1`],
    exp("k/10, c’est k dixièmes : le chiffre va juste après la virgule.", `${k}/10 = ${k} dixième${k > 1 ? "s" : ""} = 0,${k}.`, `${k}/10 = 0,${k}.`),
    parfois(0.8, () => bande(k)),
  );
}

/** ★1 0,k → k/10. */
function decVersDixQ(): Q {
  const k = ent(1, 9);
  const x = `0,${k}`;
  const p = pick(PERSONNES);
  const t = hasard(0.5) ? enVirgule(x) : pick([
    `Quelle fraction est égale à ${x} ?`,
    `Écris ${x} avec une fraction.`,
    `${x} = ?`,
    `${p.nom} a mangé ${x} de la tablette. Quelle fraction de la tablette est-ce ?`,
    `La jauge indique ${x} du réservoir. Quelle fraction est-ce ?`,
  ]);
  return qcm(
    t,
    `${k}/10`,
    [`${k}/100`, k > 1 ? `1/${k}` : `1/100`, `10/${k}`, `${k}/1000`],
    exp("Un chiffre après la virgule : ce sont des dixièmes.", `${x} = ${k} dixième${k > 1 ? "s" : ""} = ${k}/10.`, `${x} = ${k}/10.`),
    parfois(0.8, () => bande(k)),
  );
}

/** ★1 La grille de 100 : centièmes. */
function grilleQ(): Q {
  let n = hasard(0.25) ? ent(1, 9) : ent(11, 99);
  if (n % 10 === 0) n += 1;
  const ctx = pick(GRILLES)(n, pick(PERSONNES));
  const enDec = hasard(0.55);
  const x = fm(n * 10);
  const t = enDec
    ? pick(["Quel nombre décimal représente cette part ?", "Écris cette part avec une virgule.", "Quelle part du tout est-ce, en nombre décimal ?"])
    : pick(["Quelle fraction du tout est-ce ?", "Quelle fraction représente cette part ?", "Cette part s’écrit avec une fraction :"]);
  const correct = enDec ? x : `${n}/100`;
  const pieges = enDec
    ? [n < 10 ? `0,${n}` : fm(n * 100), `0,0${n}`, fm((100 - n) * 10), String(n)]
    : [`${n}/10`, `${n}/1000`, `${100 - n}/100`, `100/${n}`];
  return qcm(
    `${ctx} ${t}`,
    correct,
    pieges,
    exp("Le tout est partagé en 100 : chaque case est un centième (1/100 = 0,01).", `${n} cases sur 100 → ${n}/100 = ${x}.`, `La réponse est ${correct}.`),
    grille(n),
  );
}

/** ★2 n/100 → écriture décimale. */
function fracCentQ(): Q {
  let n = pick([ent(1, 9), ent(11, 99), ent(11, 99), ent(101, 999)]);
  if (n % 10 === 0) n += 1;
  const x = fm(n * 10);
  const p = pick(PERSONNES);
  const a = pick(ANNONCEURS);
  const t = hasard(0.55) ? enFraction(`${n}/100`) : pick([
    `Écris ${n}/100 avec une virgule.`,
    `${n}/100 = ?`,
    `Quel nombre décimal est égal à ${n}/100 ?`,
    `${a.qui} écrit ${n}/100 au tableau. Quelle écriture décimale correspond ?`,
    `${p.nom} a parcouru ${n}/100 de kilomètre. Quel nombre décimal de kilomètre est-ce ?`,
  ]);
  return qcm(
    t,
    x,
    [n * 100 < 1e6 ? fm(n * 100) : null, fm(n), `0,${n}`, `${n},100`, n < 10 ? `0,00${n}` : null],
    exp("n/100, ce sont n centièmes : le dernier chiffre va au 2e rang après la virgule.", `${n}/100 = ${n} centième${n > 1 ? "s" : ""} = ${x}.`, `${n}/100 = ${x}.`),
    n < 100 ? parfois(0.85, () => grille(n)) : parfois(0.7, () => droiteUnite(Math.floor(n / 100), [{ v: n * 10, label: "?" }])),
  );
}

/** ★2 n/1000 → écriture décimale (3/1000 n'est pas 0,03). */
function fracMilleQ(): Q {
  let n = pick([ent(1, 9), ent(1, 9), ent(11, 99), ent(101, 999), ent(1001, 9999)]);
  if (n % 10 === 0) n += 1;
  const x = fm(n);
  const p = pick(PERSONNES);
  const a = pick(ANNONCEURS);
  const t = hasard(0.55) ? enFraction(`${n}/1000`) : pick([
    `Écris ${n}/1000 avec une virgule.`,
    `${n}/1000 = ?`,
    `Quel nombre décimal est égal à ${n}/1000 ?`,
    `${a.qui} écrit ${n}/1000 au tableau. Quelle écriture décimale correspond ?`,
    `La pharmacienne pèse ${n}/1000 de kilogramme de plantes. Quel nombre décimal de kilogramme est-ce ?`,
    `${p.nom} verse ${n}/1000 de litre d’eau. Comment l’écrire avec une virgule ?`,
  ]);
  const figure =
    n < 10
      ? droite(0, 0.01, 0.001, [0, 0.01], [{ value: n / 1000, label: "?" }])
      : n < 100
        ? droite(0, 0.1, 0.01, [0, 0.1], [{ value: n / 1000, label: "?" }])
        : tab([null], { nd: 3, nInt: n >= 10000 ? 2 : 1 });
  return qcm(
    t,
    x,
    [fm(n * 10), n * 100 < 1e7 ? fm(n * 100) : null, n < 1000 ? `0,${n}` : null, n < 10 ? `0,0${n}` : null, `${n},1000`],
    exp("n/1000, ce sont n millièmes : le dernier chiffre va au 3e rang après la virgule.", `${n}/1000 = ${n} millième${n > 1 ? "s" : ""} = ${x}.`, `${n}/1000 = ${x}${n < 10 ? ` (et non 0,0${n})` : ""}.`),
    parfois(0.8, () => figure),
  );
}

/** ★2 Écriture décimale → fraction décimale. */
function decVersFracQ(): Q {
  const nd = pick([2, 3, 3] as const);
  const e = hasard(0.4) ? ent(1, 9) : 0;
  const r = hasard(0.35) ? ent(1, 9) * 10 ** (3 - nd) : partDec(nd);
  const v = e * 1000 + r;
  const x = fm(v, nd);
  const n = v / 10 ** (3 - nd);
  const d = 10 ** nd;
  const t = hasard(0.5) ? enVirgule(x) : `${phrase(x).texte} ${pick([`Quelle fraction décimale est égale à ${x} ?`, `Écris ${x} avec une fraction.`, `${x} = ?`, `Quelle fraction correspond à ce nombre ?`])}`;
  const rr = r / 10 ** (3 - nd);
  return qcm(
    t,
    `${n}/${d}`,
    [`${n}/${d / 10}`, `${n}/${d * 10}`, e > 0 ? `${rr}/${d}` : `${n}/${d * 100}`],
    exp(`${nd} chiffres après la virgule : on compte des ${RANG_DEC[nd - 1]}s, donc on divise par ${d}.`, `${x} = ${n} ${RANG_DEC[nd - 1]}s = ${n}/${d}.`, `${x} = ${n}/${d}.`),
    parfois(0.65, () => tab([x])),
  );
}

/** ★2 Les équivalences : 1 dixième = 10 centièmes = 100 millièmes. */
function equivalenceQ(): Q {
  const type = pick(["dix_mil", "cent_mil", "frac_mil", "frac_cent", "dix_cent"] as const);
  const a = ent(1, 9);
  const p = pick(PERSONNES);
  if (type === "frac_mil" || type === "frac_cent") {
    const [num, den, f] = type === "frac_mil" ? [a, 10, 100] : [a, 10, 10];
    const cible = den * f;
    const t = pick([`Complète : ${num}/${den} = ?/${cible}`, `Quelle fraction sur ${cible} est égale à ${num}/${den} ?`, `${p.nom} veut écrire ${num}/${den} avec ${cible} en bas. Quelle fraction obtient-${il(p)} ?`]);
    const correct = `${num * f}/${cible}`;
    return qcm(
      t,
      correct,
      [`${num}/${cible}`, `${num * 10 ** (type === "frac_mil" ? 1 : 2)}/${cible}`, `${num * f * 10}/${cible}`],
      exp("1 dixième = 10 centièmes = 100 millièmes.", `${num}/${den} = ${fm(num * 100)} = ${correct}.`, `${num}/${den} = ${correct}.`),
      parfois(0.8, () => (type === "frac_cent" ? grille(num * 10) : bande(num))),
    );
  }
  const [de1, vers, f] = type === "dix_mil" ? ["dixième", "millième", 100] : type === "cent_mil" ? ["centième", "millième", 10] : ["dixième", "centième", 10];
  const t = pick([`Complète : ${pl(a, de1)} = ? ${vers}s`, `Combien de ${vers}s font ${pl(a, de1)} ?`, `${p.nom} échange ${pl(a, de1)} contre des ${vers}s. Combien en obtient-${il(p)} ?`, `${pl(a, de1)}, c’est combien de ${vers}s ?`]);
  const correct = `${a * f} ${vers}s`;
  return qcm(
    t,
    correct,
    [pl(a, vers), `${a * 10} ${vers}s`, `${a * 100} ${vers}s`, `${a * 1000} ${vers}s`].filter((s) => s !== correct),
    exp("1 dixième = 10 centièmes = 100 millièmes ; 1 centième = 10 millièmes.", `${pl(a, de1)} = ${a} × ${f} ${vers}s.`, `${pl(a, de1)} = ${correct}.`),
    parfois(0.6, () => (de1 === "dixième" ? bande(a) : grille(a))),
  );
}

/** ★2 Une somme de fractions décimales → un nombre décimal. */
function sommeFracQ(): Q {
  const e = ent(0, 12);
  const [d, c, m] = chiffres(3);
  const trou = pick(["d", "c", "m", "aucun"] as const);
  const dd = trou === "d" ? 0 : d;
  const cc = trou === "c" ? 0 : c;
  const mm = trou === "m" ? 0 : m;
  const termes = [e ? String(e) : null, dd ? `${dd}/10` : null, cc ? `${cc}/100` : null, mm ? `${mm}/1000` : null].filter((s): s is string => !!s);
  const ordre = hasard(0.35) ? melange(termes) : termes;
  const x = fm(e * 1000 + dd * 100 + cc * 10 + mm);
  const dans = ordre.map((s) => (s.includes("/") ? Number(s.split("/")[0]) : null)).filter((k): k is number => k !== null);
  const p = pick(PERSONNES);
  const t = pick([
    `${ordre.join(" + ")} = ?`,
    `Quel nombre décimal est égal à ${ordre.join(" + ")} ?`,
    `Écris avec une virgule : ${ordre.join(" + ")}.`,
    `${p.nom} écrit ${ordre.join(" + ")} au tableau. Quel nombre décimal est-ce ?`,
    `${pick(ANNONCEURS).qui} additionne ${ordre.join(" + ")}. Quel nombre obtient-on ?`,
    `La balance de la pharmacienne affiche ${ordre.join(" + ")} kg. Comment l’écrire avec une virgule ?`,
    `Le compteur de la cycliste indique ${ordre.join(" + ")} km. Quel nombre décimal est-ce ?`,
  ]);
  return qcm(
    t,
    x,
    [`${e},${dans.join("")}`, `${e},${[dd, cc, mm].filter(Boolean).join("")}`, `${e},${mm}${cc}${dd}`, `${e + dd},${cc}${mm}`, `${e},0${dd}${cc}${mm}`],
    exp("Les dixièmes vont au 1er rang après la virgule, les centièmes au 2e, les millièmes au 3e.", `${ordre.join(" + ")} → ${e} | ${dd} | ${cc} | ${mm}.`, `La somme vaut ${x}.`),
    parfois(0.75, () => tab([null], { nd: 3, nInt: String(e).length })),
  );
}

/* ═══════════════════════════ DECIMAL_VALEUR_CHIFFRE ═══════════════════════════ */

const MV = "decimal_valeur_chiffre";

/** Les noms de rang à proposer : le bon, son « voisin » trompeur, les autres rangs du nombre. */
const nomsPieges = (E: Ecrit, r: Rang) => [VOISIN[r], ...E.pos.map((p) => p.r), ...TOUS_RANGS].filter((n) => n !== r);
const avecPhrase = (x: string, t: string) => (hasard(0.5) ? `${phrase(x).texte} ${t}` : t);

/** Le chiffre d'un rang (★1 jusqu'aux centièmes, ★2 jusqu'aux millièmes). */
function chiffreDuRangQ(etoile: 1 | 2): Q {
  const n1 = ent(1, 2);
  const E = etoile === 1 ? distinct(n1, n1 === 1 ? 2 : ent(1, 2)) : distinct(ent(1, 3), 3);
  const cible = hasard(0.7) ? pick(E.pos.filter((p) => EXPO[p.r] < 0)) : pick(E.pos);
  const t = pick([
    `Dans ${E.x}, quel est le chiffre des ${cible.r} ?`,
    `Quel chiffre occupe le rang des ${cible.r} dans ${E.x} ?`,
    `${E.x} : quel chiffre est au rang des ${cible.r} ?`,
    `Dans le nombre ${E.x}, quel chiffre compte les ${cible.r} ?`,
  ]);
  return qcm(
    avecPhrase(E.x, t),
    String(cible.c),
    E.pos.filter((p) => p.c !== cible.c).map((p) => String(p.c)),
    exp("Après la virgule : dixièmes, centièmes, puis millièmes. Avant : unités, dizaines, centaines.", `${E.x} : ${E.pos.map((p) => `${p.c} ${p.r}`).join(", ")}.`, `Le chiffre des ${cible.r} est ${cible.c}.`),
    parfois(0.8, () => tab([null], { nInt: E.nInt, nd: E.nd })),
  );
}

/** Le rang d'un chiffre. */
function rangDuChiffreQ(etoile: 1 | 2): Q {
  const E = etoile === 1 ? distinct(ent(1, 2), 2) : distinct(ent(1, 3), 3);
  const cible = hasard(0.75) ? pick(E.pos.filter((p) => EXPO[p.r] < 0)) : pick(E.pos);
  const t = pick([
    `Dans ${E.x}, quel est le rang du chiffre ${cible.c} ?`,
    `Le chiffre ${cible.c} de ${E.x} est au rang des…`,
    `${E.x} : à quel rang est le chiffre ${cible.c} ?`,
    `Que compte le chiffre ${cible.c} dans ${E.x} ?`,
  ]);
  return qcm(
    avecPhrase(E.x, t),
    cible.r,
    nomsPieges(E, cible.r),
    exp("On lit les rangs autour de la virgule : … dizaines, unités | dixièmes, centièmes, millièmes.", `${E.x} : ${E.pos.map((p) => `${p.c} → ${p.r}`).join(", ")}.`, `Le chiffre ${cible.c} est au rang des ${cible.r}.`),
    parfois(0.8, () => tab([null], { nInt: E.nInt, nd: E.nd })),
  );
}

/** Ce que vaut un chiffre, en mots (★1 jusqu'aux centièmes, ★2 jusqu'aux millièmes). */
function valeurMotsQ(etoile: 1 | 2): Q {
  const n1 = ent(1, 2);
  const E = etoile === 1 ? distinct(n1, n1 === 1 ? 2 : ent(1, 2)) : distinct(ent(1, 2), 3);
  const cible = hasard(0.8) ? pick(E.pos.filter((p) => EXPO[p.r] < 0)) : pick(E.pos);
  const t = pick([`Que vaut le chiffre ${cible.c} dans ${E.x} ?`, `Dans ${E.x}, le chiffre ${cible.c} vaut :`, `${E.x} : que représente le chiffre ${cible.c} ?`, `Quelle est la valeur du chiffre ${cible.c} dans ${E.x} ?`]);
  const correct = nomRang(cible.c, cible.r);
  return qcm(
    avecPhrase(E.x, t),
    correct,
    nomsPieges(E, cible.r).map((r) => nomRang(cible.c, r)),
    exp("La valeur d’un chiffre dépend de son rang.", `${E.x} : ${E.pos.map((p) => `${p.c} ${p.r}`).join(", ")}.`, `Le chiffre ${cible.c} vaut ${correct}.`),
    parfois(0.75, () => (hasard(0.5) ? tab([E.x]) : tab([null], { nInt: E.nInt, nd: E.nd }))),
  );
}

/** ★2 Les mots qui se ressemblent : dizaines / dixièmes, centaines / centièmes. */
function motsVoisinsQ(): Q {
  const E = distinct(3, ent(2, 3));
  const r = pick(["dizaines", "dixièmes", "centaines", "centièmes"] as const);
  const cible = E.pos.find((p) => p.r === r)!;
  const piege = E.pos.find((p) => p.r === VOISIN[r])!;
  const t = pick([
    `Attention aux mots ! Dans ${E.x}, quel est le chiffre des ${r} ?`,
    `Dans ${E.x}, quel chiffre est au rang des ${r} ?`,
    `${E.x} : quel chiffre compte les ${r} ?`,
  ]);
  const ctx = pick([
    "",
    `${pick(ANNONCEURS).qui} écrit ${E.x} au tableau. `,
    `La géomètre mesure un champ de ${E.x} m. `,
    `Le compteur du vélo affiche ${E.x} km. `,
    `L’aquarium de la ville contient ${E.x} L d’eau. `,
  ]);
  return qcm(
    `${ctx}${t}`,
    String(cible.c),
    [String(piege.c), ...E.pos.filter((p) => p.c !== cible.c && p.c !== piege.c).map((p) => String(p.c))],
    exp("Dizaines et centaines sont AVANT la virgule ; dixièmes et centièmes sont APRÈS.", `${E.x} : ${E.pos.map((p) => `${p.c} ${p.r}`).join(", ")}.`, `Le chiffre des ${r} est ${cible.c} (le ${piege.c} compte les ${piege.r}).`),
    parfois(0.8, () => tab([null], { nInt: 3, nd: E.nd })),
  );
}

/** ★3 Ce que vaut un chiffre, écrit avec un nombre (0,03). */
function valeurNombreQ(): Q {
  const E = distinct(ent(1, 2), ent(2, 3));
  const cible = hasard(0.8) ? pick(E.pos.filter((p) => EXPO[p.r] < 0)) : pick(E.pos);
  const t = pick([`Dans ${E.x}, que vaut le chiffre ${cible.c} ? Écris sa valeur avec un nombre.`, `Quel nombre donne la valeur du chiffre ${cible.c} dans ${E.x} ?`, `${E.x} : le chiffre ${cible.c} vaut…`, `Dans ${E.x}, quelle est la valeur du chiffre ${cible.c} ?`]);
  const correct = valeurRang(cible.c, cible.r);
  return qcm(
    avecPhrase(E.x, t),
    correct,
    nomsPieges(E, cible.r).map((r) => valeurRang(cible.c, r)),
    exp("1 dixième = 0,1 ; 1 centième = 0,01 ; 1 millième = 0,001.", `${cible.c} ${cible.r} = ${correct}.`, `Le chiffre ${cible.c} vaut ${correct}.`),
    parfois(0.8, () => tab([E.x])),
  );
}

/** ★3 Décomposer en somme (0,4 + 0,007). */
function decomposerSommeQ(): Q {
  const nInt = ent(1, 2);
  const ds = chiffres(nInt + 3);
  const dec = ds.slice(nInt);
  if (hasard(0.5)) dec[ent(0, 1)] = 0;
  const E = ecrit(ds.slice(0, nInt), dec);
  const terme = (c: number, k: number) => (c ? valeurRang(c, DECIMAUX[k] as Rang) : null);
  const somme = (sh: number[]) => [String(E.e), ...dec.map((c, k) => terme(c, Math.min(2, Math.max(0, k + sh[k]))))].filter(Boolean).join(" + ");
  const correct = somme([0, 0, 0]);
  const t = pick([`Quelle addition est égale à ${E.x} ?`, `${E.x} = ?`, `Comment décomposer ${E.x} ?`, `Quelle décomposition de ${E.x} est juste ?`]);
  return qcm(
    avecPhrase(E.x, t),
    correct,
    [somme([0, 0, -1]), somme([0, -1, 0]), somme([1, 0, 0]), somme([0, 1, 0]), [String(E.e), ...dec.filter(Boolean).map(String)].join(" + "), `${E.e} + 0,${dec.filter(Boolean).join("")}0`],
    exp("Chaque chiffre donne sa valeur : 0,1 pour un dixième, 0,01 pour un centième, 0,001 pour un millième.", `${E.x} : ${E.pos.map((p) => `${p.c} ${p.r}`).join(", ")}.`, `${E.x} = ${correct}.`),
    parfois(0.8, () => tab([E.x])),
  );
}

/** ★3 Combien de dixièmes / centièmes / millièmes EN TOUT. */
function enToutQ(): Q {
  const rk = pick([1, 2, 3, 3] as const);
  const nd = ent(1, rk) as Nd;
  const e = ent(1, 9);
  const v = e * 1000 + partDec(nd);
  const x = fm(v);
  const n = v / 10 ** (3 - rk);
  const nom = RANG_DEC[rk - 1];
  const t = pick([`Combien y a-t-il de ${nom}s en tout dans ${x} ?`, `${x}, c’est combien de ${nom}s ?`, `Écris ${x} en ${nom}s.`, `Combien de ${nom}s faut-il pour faire ${x} ?`]);
  const dp = (v % 1000) / 10 ** (3 - rk);
  return qcm(
    avecPhrase(x, t),
    `${milliers(n)} ${nom}s`,
    [`${dp} ${nom}${dp > 1 ? "s" : ""}`, `${milliers(n * 10)} ${nom}s`, n >= 10 ? pl(Math.floor(n / 10), nom) : null, n % 10 ? pl(n % 10, nom) : null, pl(e, nom)],
    exp("1 unité = 10 dixièmes = 100 centièmes = 1 000 millièmes.", `${x} = ${milliers(n)} ${nom}s (on lit le nombre jusqu’au rang des ${nom}s, sans la virgule).`, `${x} = ${milliers(n)} ${nom}s.`),
    parfois(0.75, () => tab([fm(v, rk)])),
  );
}

/** ★3 Construire un nombre à partir de rangs donnés dans le désordre. */
function construireQ(): Q {
  const [u, a, b, c3] = chiffres(4);
  const vides = pick([[], ["dixièmes"], ["centièmes"]] as Rang[][]);
  const rangs: Rang[] = (["dixièmes", "centièmes", "millièmes"] as Rang[]).filter((r) => !vides.includes(r));
  const dec = [0, 0, 0];
  const valeurs = vides.length ? [a, b] : [a, b, c3];
  rangs.forEach((r, i) => (dec[DECIMAUX.indexOf(r)] = valeurs[i]));
  const E = ecrit([u], dec);
  const morceaux = melange([{ r: "unités" as Rang, c: u }, ...rangs.map((r, i) => ({ r, c: valeurs[i] }))]);
  const desc = morceaux.map((m) => nomRang(m.c, m.r));
  const liste = `${desc.slice(0, -1).join(", ")} et ${desc[desc.length - 1]}`;
  const p = pick(PERSONNES);
  const t = pick([`Quel nombre a ${liste} ?`, `${p.nom} a ${liste}. Quel nombre forme-t-${il(p)} ?`, `Écris le nombre qui a ${liste}.`, `${pick(ANNONCEURS).qui} annonce : ${liste}. Quel nombre faut-il écrire ?`]);
  const dansLOrdre = `${morceaux[0].c},${morceaux.slice(1).map((m) => m.c).join("")}`;
  return qcm(
    t,
    E.x,
    [dansLOrdre, `${u},${valeurs.join("")}`, `${u},${[...dec].reverse().join("")}`.replace(/0+$/, ""), `${valeurs[0]},${u}${valeurs.slice(1).join("")}`],
    exp("On range chaque chiffre dans son rang, quel que soit l’ordre de la phrase ; un rang vide reçoit un 0.", `${E.pos.map((q) => `${q.c} ${q.r}`).join(", ")}.`, `Le nombre est ${E.x}.`),
    parfois(0.8, () => tab([null], { nd: 3 })),
  );
}

/** ★3 Un même chiffre écrit deux fois : deux valeurs. */
function chiffreRepeteQ(): Q {
  const [a, b, c] = chiffres(3);
  const forme = pick(["u_c", "u_d", "d_m", "diz_dix", "c_m"] as const);
  const [ints, decs] =
    forme === "u_c" ? [[a], [b, a]] : forme === "u_d" ? [[a], [a, b, c]] : forme === "d_m" ? [[b], [a, c, a]] : forme === "diz_dix" ? [[a, b], [a, c]] : [[b], [c, a, a]];
  const E = ecrit(ints, decs);
  const vus = E.pos.filter((p) => p.c === a);
  const droiteDe = hasard(0.5);
  const cible = droiteDe ? vus[vus.length - 1] : vus[0];
  const t = pick([
    `Dans ${E.x}, le chiffre ${a} est écrit deux fois. Que vaut celui le plus à ${droiteDe ? "droite" : "gauche"} ?`,
    `${E.x} : que vaut le chiffre ${a} écrit le plus à ${droiteDe ? "droite" : "gauche"} ?`,
    `Dans ${E.x}, quel est le rang du ${a} le plus à ${droiteDe ? "droite" : "gauche"} ?`,
  ]);
  const enRang = t.includes("rang");
  const correct = enRang ? cible.r : nomRang(a, cible.r);
  const autres = nomsPieges(E, cible.r);
  return qcm(
    avecPhrase(E.x, t),
    correct,
    enRang ? autres : autres.map((r) => nomRang(a, r)),
    exp("Un même chiffre n’a pas la même valeur à deux rangs différents.", `${E.x} : ${E.pos.map((p) => `${p.c} ${p.r}`).join(", ")}.`, `Le ${a} le plus à ${droiteDe ? "droite" : "gauche"} compte les ${cible.r}.`),
    parfois(0.8, () => tab([E.x])),
  );
}

/* ═══════════════════════════ DECIMAL_COMPARER ═══════════════════════════ */

const MC = "decimal_comparer";
const EGALITE = "Les deux sont à égalité";
const signe = (a: number, b: number) => (a < b ? "<" : a > b ? ">" : "=");

/** Deux mesures d'une même épreuve, en millièmes. */
function duelQ(D: Duel, v1: number, v2: number, nd1: number, nd2: number, o: { canvas: number }): Q {
  const [p1, p2] = personnes(2);
  const x1 = fm(v1, nd1);
  const x2 = fm(v2, nd2);
  const grand = hasard(0.5);
  const q = grand ? D.grand : D.petit;
  const gagnant = v1 === v2 ? EGALITE : (v1 > v2) === grand ? p1.nom : p2.nom;
  const n = Math.max(nd1, nd2, ndNat(v1), ndNat(v2));
  const methode = nd1 === nd2 ? "On compare les parties entières, puis les dixièmes, puis les centièmes, puis les millièmes." : "On écrit les deux nombres avec autant de chiffres après la virgule, puis on compare rang par rang.";
  const e = Math.floor(Math.min(v1, v2) / 1000);
  const memeE = Math.floor(v1 / 1000) === Math.floor(v2 / 1000);
  return qcm(
    `${cap(D.dit(p1.nom, x1))} et ${D.dit(p2.nom, x2)}. ${q}`,
    gagnant,
    [p1.nom, p2.nom, EGALITE].filter((s) => s !== gagnant),
    exp(methode, `${fm(v1, n)} et ${fm(v2, n)} : ${v1 === v2 ? "les deux nombres sont égaux" : `${fm(Math.max(v1, v2))} est le plus grand`}.`, `Réponse : ${gagnant}.`),
    parfois(o.canvas, () =>
      hasard(0.5) && memeE ? droiteUnite(e, [{ v: v1, label: p1.nom }, { v: v2, label: p2.nom }]) : tab([x1, x2], { labels: [p1.nom, p2.nom] }),
    ),
  );
}

/** ★1 Deux mesures, un ou deux chiffres après la virgule. */
function quiPlusQ(): Q {
  const D = duel(1);
  const e1 = eDe(D.min, D.max);
  const e2 = hasard(0.65) || D.min === D.max ? e1 : e1 + (e1 < D.max ? 1 : -1);
  const [d1, d2] = chiffres(2);
  const nd2 = hasard(0.3) && D.nd >= 2 ? 2 : 1;
  const v2 = e2 * 1000 + d2 * 100 + (nd2 === 2 ? ent(1, 9) * 10 : 0);
  return duelQ(D, e1 * 1000 + d1 * 100, v2, 1, nd2, { canvas: 0.8 });
}

/** ★1 Le signe <, > ou =. */
function signeQ(): Q {
  const D = duel(1);
  const e = eDe(D.min, D.max);
  const deux = hasard(0.35) && D.nd >= 2;
  const [a, b] = chiffres(2);
  const [a2, b2] = chiffres(2);
  const v1 = e * 1000 + a * 100 + (deux ? a2 * 10 : 0);
  const v2 = e * 1000 + (deux ? a * 100 + b2 * 10 : b * 100);
  const x1 = fm(v1);
  const x2 = fm(v2);
  const sg = signe(v1, v2);
  const p = pick(PERSONNES);
  const [q1, q2] = personnes(2);
  const dessin = hasard(0.8);
  const text = pick([
    `Complète avec <, > ou = : ${x1} … ${x2}`,
    `Quel signe faut-il mettre entre ${x1} et ${x2} ?`,
    `${p.nom} compare ${x1} et ${x2}. Quel signe écrit-${il(p)} : ${x1} … ${x2} ?`,
    `${cap(D.dit(q1.nom, x1))} et ${D.dit(q2.nom, x2)}. Complète : ${x1} … ${x2}`,
    `${pick(ANNONCEURS).qui} écrit ${x1} et ${x2}. Quel signe va entre les deux ?`,
  ]);
  const [lo, hi, pas] = deux ? [e + a / 10, e + (a + 1) / 10, 0.01] : [e, e + 1, 0.1];
  return qcm(
    text,
    sg,
    ["<", ">", "="].filter((s) => s !== sg),
    exp("Même partie entière : on compare les dixièmes, puis les centièmes. Sur la droite, le plus grand est à droite.", `${x1} et ${x2} : ${deux ? "même dixième, on regarde les centièmes" : "on regarde les dixièmes"}.`, `${x1} ${sg} ${x2}.`),
    dessin ? droite(lo, hi, pas, [lo, hi], [{ value: v1 / 1000, label: x1 }, { value: v2 / 1000, label: x2 }]) : undefined,
  );
}

/** ★1 Le plus grand / le plus petit de quatre. */
function plusGrandQ(): Q {
  const l = lot(1);
  const e = eLot(l);
  const vals = melange(chiffres(3).map((d) => e * 1000 + d * 100)).concat([(e + pick([1, -1].filter((k) => e + k >= 0))) * 1000 + ent(1, 9) * 100]);
  const xs = melange(vals);
  const grand = hasard(0.5);
  const cible = grand ? Math.max(...xs) : Math.min(...xs);
  const s = (v: number) => `${fm(v)} ${l.u}`;
  const avecU = hasard(0.75);
  const text = avecU
    ? `Quatre ${l.objets} ${l.verbe} ${xs.slice(0, 3).map(s).join(", ")} et ${s(xs[3])}. ${grand ? l.grand : l.petit}`
    : pick([`Quel est le plus ${grand ? "grand" : "petit"} de ces nombres : ${xs.map((v) => fm(v)).join(" ; ")} ?`, `${pick(ANNONCEURS).qui} écrit ${xs.map((v) => fm(v)).join(" ; ")}. Lequel est le plus ${grand ? "grand" : "petit"} ?`]);
  const f = (v: number) => (avecU ? s(v) : fm(v));
  return qcm(
    text,
    f(cible),
    xs.filter((v) => v !== cible).map(f),
    exp("On compare d’abord les parties entières, puis les dixièmes.", `Rangés : ${[...xs].sort((u, v) => u - v).map((v) => fm(v)).join(" < ")}.`, `Le plus ${grand ? "grand" : "petit"} est ${fm(cible)}.`),
    parfois(0.7, () => tab(xs.map((v) => fm(v)))),
  );
}

/** ★2 Le piège « 2,15 > 2,9 car 15 > 9 » (et « 0,305 > 0,35 »). */
function piegeLongueurQ(): Q {
  const nc = pick([1, 1, 2] as const);
  const D = duel((nc + 1) as Nd);
  const avecDuel = hasard(0.55);
  const e = avecDuel ? eDe(D.min, D.max) : ent(0, 9);
  // le court : nc chiffres ; le long : nc + 1 chiffres, plus petit, premier chiffre décimal ≥ 1
  let court = 0;
  let long = 0;
  for (let k = 0; k < 30; k++) {
    court = e * 1000 + (nc === 1 ? ent(2, 9) * 100 : ent(15, 99) * 10);
    if (ndNat(court) !== nc) continue;
    const lo = e * 1000 + 100;
    const pasL = nc === 1 ? 10 : 1;
    const cand = Array.from({ length: Math.floor((court - lo) / pasL) }, (_, i) => lo + i * pasL).filter((w) => ndNat(w) === nc + 1);
    if (cand.length) {
      long = pick(cand);
      break;
    }
  }
  const inv = hasard(0.5);
  const [va, vb, na, nb] = inv ? [long, court, nc + 1, nc] : [court, long, nc, nc + 1];
  if (avecDuel) return duelQ(D, va, vb, na, nb, { canvas: 0.8 });
  const xa = fm(va, na);
  const xb = fm(vb, nb);
  const grand = hasard(0.6);
  const cible = grand ? Math.max(va, vb) : Math.min(va, vb);
  const text = pick([`Quel nombre est le plus ${grand ? "grand" : "petit"} : ${xa} ou ${xb} ?`, `Entre ${xa} et ${xb}, lequel est le plus ${grand ? "grand" : "petit"} ?`, `${pick(ANNONCEURS).qui} écrit ${xa} et ${xb}. Lequel est le plus ${grand ? "grand" : "petit"} ?`]);
  return qcm(
    text,
    fm(cible),
    [fm(cible === long ? court : long), "Ils sont égaux"],
    exp("On compare rang par rang, pas le nombre écrit après la virgule.", `${fm(court)} = ${fm(court, nc + 1)}, à comparer avec ${fm(long)}.`, `${fm(court)} > ${fm(long)}.`),
    parfois(0.8, () => (hasard(0.5) ? tab([xa, xb]) : droiteUnite(e, [{ v: va, label: xa }, { v: vb, label: xb }]))),
  );
}

/** ★2 Les zéros : 2,5 = 2,50 = 2,500 ; 2,05 < 2,5. */
function zeroFinalQ(): Q {
  const e = ent(0, 19);
  const c = ent(1, 9);
  const type = pick(["egal", "egal", "zero_milieu", "zero_milieu", "mil"] as const);
  let v1: number, n1: number, v2: number, n2: number;
  if (type === "egal") [v1, n1, v2, n2] = [e * 1000 + c * 100, 1, e * 1000 + c * 100, pick([2, 3])];
  else if (type === "zero_milieu") [v1, n1, v2, n2] = [e * 1000 + c * 10, 2, e * 1000 + c * 100, 1];
  else [v1, n1, v2, n2] = [e * 1000 + c, 3, e * 1000 + c * 10, 2];
  if (hasard(0.5)) [v1, n1, v2, n2] = [v2, n2, v1, n1];
  const x1 = fm(v1, n1);
  const x2 = fm(v2, n2);
  const sg = signe(v1, v2);
  const p = pick(PERSONNES);
  const { texte } = phrase(x1);
  const text = pick([
    `Complète avec <, > ou = : ${x1} … ${x2}`,
    `Quel signe faut-il mettre entre ${x1} et ${x2} ?`,
    `${p.nom} dit que ${x1} et ${x2}, c’est pareil. Quel signe faut-il écrire : ${x1} … ${x2} ?`,
    `${texte} On compare ${x1} et ${x2}. Quel signe va entre les deux ?`,
  ]);
  return qcm(
    text,
    sg,
    ["<", ">", "="].filter((s) => s !== sg),
    exp("Un zéro à la FIN de la partie décimale ne change rien ; un zéro juste après la virgule, si.", `${fm(v1, 3)} et ${fm(v2, 3)}.`, `${x1} ${sg} ${x2}.`),
    parfois(0.85, () => tab([x1, x2])),
  );
}

/** ★2 Un nombre entre deux autres. */
function entreDeuxQ(): Q {
  const nd = pick([1, 2] as const);
  const { m, e } = mesure({ nd: (nd + 1) as Nd, prixOk: false });
  const pas = nd === 1 ? 100 : 10;
  const sub = pas / 10;
  const lo = e * 1000 + (nd === 1 ? ent(1, 8) * 100 : ent(11, 98) * 10);
  const hi = lo + pas;
  const k = ent(1, 9);
  const correct = lo + k * sub;
  const xlo = fm(lo, nd);
  const xhi = fm(hi, nd);
  const cand = [hi + k * sub, lo - pas + k * sub, e * 1000 + k * sub, hi + pas, lo - pas].filter((w) => w > 0 && (w <= lo || w >= hi));
  const avecU = hasard(0.35);
  const t = avecU
    ? `${m.dit("…", pick(PERSONNES))} C’est plus que ${xlo} ${m.u} et moins que ${xhi} ${m.u}. Quelle mesure est possible ?`
    : pick([
        `Quel nombre est compris entre ${xlo} et ${xhi} ?`,
        `Quel nombre peut-on placer entre ${xlo} et ${xhi} ?`,
        `${pick(ANNONCEURS).qui} cherche un nombre plus grand que ${xlo} et plus petit que ${xhi}. Lequel ?`,
        `${pick(PERSONNES).nom} veut écrire un nombre entre ${xlo} et ${xhi}. Lequel convient ?`,
      ]);
  const f = (v: number) => (avecU ? `${fm(v)} ${m.u}` : fm(v));
  return qcm(
    t,
    f(correct),
    cand.map(f),
    exp(`On écrit ${xlo} = ${fm(lo, nd + 1)} et ${xhi} = ${fm(hi, nd + 1)} : on cherche entre les deux.`, `${fm(lo, nd + 1)} < ${fm(correct)} < ${fm(hi, nd + 1)}.`, `${fm(correct)} convient.`),
    parfois(0.85, () => droite(lo / 1000, hi / 1000, sub / 1000, [lo / 1000, hi / 1000], [])),
  );
}

/** ★2 Le plus grand ou le plus petit, jusqu'aux millièmes. */
function milliemesQ(): Q {
  const l = lot(3);
  const e = eLot(l);
  const d = ent(2, 8);
  const pool = [d * 100, d * 100 + ent(1, 9), d * 100 + ent(1, 9) * 10, (d - 1) * 100 + ent(11, 99), d * 10 + ent(1, 9) * 0, (d + 1) * 10 + ent(1, 9)].map((r) => e * 1000 + r);
  const xs = melange([...new Set(pool)].filter((w) => w > e * 1000)).slice(0, 4);
  const grand = hasard(0.5);
  const cible = grand ? Math.max(...xs) : Math.min(...xs);
  const s = (v: number) => `${fm(v)} ${l.u}`;
  const avecU = hasard(0.7);
  const text = avecU
    ? `${NOMBRE_L[xs.length]} ${l.objets} ${l.verbe} ${xs.slice(0, -1).map(s).join(", ")} et ${s(xs[xs.length - 1])}. ${grand ? l.grand : l.petit}`
    : `Quel est le plus ${grand ? "grand" : "petit"} de ces nombres : ${xs.map((v) => fm(v)).join(" ; ")} ?`;
  const f = (v: number) => (avecU ? s(v) : fm(v));
  return qcm(
    text,
    f(cible),
    xs.filter((v) => v !== cible).map(f),
    exp("On écrit tous les nombres avec trois chiffres après la virgule, puis on compare rang par rang.", `${xs.map((v) => fm(v, 3)).join(" ; ")}.`, `Le plus ${grand ? "grand" : "petit"} est ${fm(cible)}.`),
    parfois(0.8, () => tab(xs.map((v) => fm(v)))),
  );
}

/** ★2 Juger un raisonnement faux (ou juste). */
function raisonnementQ(): Q {
  const p = pick(PERSONNES);
  const nc = pick([1, 1, 2] as const);
  const e = ent(0, 12);
  const vCourt = e * 1000 + (nc === 1 ? ent(3, 9) * 100 : (ent(3, 9) * 10 + ent(1, 9)) * 10);
  const lo = e * 1000 + 100;
  const pasL = nc === 1 ? 10 : 1;
  const cand = Array.from({ length: Math.floor((vCourt - lo) / pasL) }, (_, i) => lo + i * pasL).filter((w) => ndNat(w) === nc + 1);
  const long = pick(cand);
  const xc = fm(vCourt, nc);
  const xl = fm(long, nc + 1);
  const dc = xc.split(",")[1];
  const dl = xl.split(",")[1];
  const text = pick([
    `${p.nom} dit : « ${xl} > ${xc}, car ${Number(dl)} > ${Number(dc)}. » A-t-${il(p)} raison ?`,
    `Pour comparer ${xl} et ${xc}, ${p.nom} regarde ${Number(dl)} et ${Number(dc)}, et dit que ${xl} est le plus grand. A-t-${il(p)} raison ?`,
    `${p.nom} pense que ${xl} est plus grand que ${xc} parce qu’il a plus de chiffres. A-t-${il(p)} raison ?`,
  ]);
  const correct = `Non : ${xc} = ${fm(vCourt, nc + 1)} et ${fm(vCourt, nc + 1)} > ${xl}`;
  return qcm(
    text,
    correct,
    [`Oui : ${Number(dl)} est plus grand que ${Number(dc)}`, `Oui : ${xl} a plus de chiffres`, `Non : ${xl} et ${xc} sont égaux`],
    exp("On compare rang par rang après avoir écrit autant de chiffres après la virgule.", `${xc} = ${fm(vCourt, nc + 1)} ; ${fm(vCourt, nc + 1)} > ${xl}.`, `${p.nom} se trompe : ${xc} > ${xl}.`),
    parfois(0.85, () => tab([xl, xc])),
  );
}

/* ═══════════════════════════ DECIMAL_ORDONNER ═══════════════════════════ */

const MO = "decimal_ordonner";
const ordre = (xs: string[], croiss: boolean) => xs.join(croiss ? " < " : " > ");

/** Les choix d'un rangement : le bon, l'inverse, des permutations, le faux ordre « après la virgule ». */
function rangements(vals: number[], s: (v: number) => string, croiss: boolean) {
  const tri = [...vals].sort((a, b) => (croiss ? a - b : b - a));
  const correct = ordre(tri.map(s), croiss);
  const pieges: string[] = [ordre([...tri].reverse().map(s), croiss)];
  const apres = (v: number) => Number(s(v).split(",")[1] ?? "0");
  const faux = [...vals].sort((a, b) => (Math.floor(a / 1000) - Math.floor(b / 1000) || apres(a) - apres(b)) * (croiss ? 1 : -1));
  pieges.push(ordre(faux.map(s), croiss));
  const longueur = [...vals].sort((a, b) => (Math.floor(a / 1000) - Math.floor(b / 1000) || s(a).length - s(b).length || a - b) * (croiss ? 1 : -1));
  pieges.push(ordre(longueur.map(s), croiss));
  for (let k = 0; k < 4; k++) {
    const i = ent(0, tri.length - 2);
    const sw = [...tri];
    [sw[i], sw[i + 1]] = [sw[i + 1], sw[i]];
    pieges.push(ordre(sw.map(s), croiss));
  }
  return { correct, pieges: pieges.filter((p) => p !== correct), tri };
}

/** Des nombres de même partie entière, avec le piège « plus de chiffres = plus grand ». */
function melesMemeEntier(e: number, n: number, ndMax: Nd): number[] {
  for (let essai = 0; essai < 40; essai++) {
    const d = ent(2, 8);
    const pool = [d * 100, (d - 1) * 100 + ent(1, 9) * 10 + (ndMax === 3 ? ent(1, 9) : 0), d * 100 + ent(1, 9) * 10, (d + 1) * 100, d * 10 + ent(1, 9) * (ndMax === 3 ? 1 : 0), (d - 1) * 100 + ent(1, 9) * 10]
      .map((r) => e * 1000 + r)
      .filter((w) => w % 1000 !== 0 && ndNat(w) <= ndMax);
    const u = melange([...new Set(pool)]).slice(0, n);
    if (u.length === n && new Set(u.map(ndNat)).size >= 2) return u;
  }
  return Array.from({ length: n }, (_, i) => e * 1000 + (i + 1) * 100);
}

/** ★2 Ranger trois nombres. */
function rangerTroisQ(): Q {
  const l = lot(2);
  const e = eLot(l);
  const xs = melesMemeEntier(e, 3, 2);
  const croiss = hasard(0.6);
  const s = (v: number) => fm(v);
  const r = rangements(xs, s, croiss);
  const liste = `${xs.slice(0, -1).map((v) => `${s(v)} ${l.u}`).join(", ")} et ${s(xs[2])} ${l.u}`;
  const text = pick([
    `Trois ${l.objets} ${l.verbe} ${liste}. Quel rangement va ${croiss ? l.croiss : l.decroiss} ?`,
    `Range dans l’ordre ${croiss ? "croissant" : "décroissant"} : ${xs.map(s).join(" ; ")}.`,
    `Trois ${l.objets} ${l.verbe} ${liste}. Quel rangement est dans l’ordre ${croiss ? "croissant" : "décroissant"} ?`,
    `${pick(PERSONNES).nom} range trois ${l.objets} ${croiss ? l.croiss : l.decroiss} : ${liste}. Quel rangement est juste ?`,
    `${pick(ANNONCEURS).qui} écrit ${xs.map(s).join(" ; ")}. Quel rangement va dans l’ordre ${croiss ? "croissant" : "décroissant"} ?`,
  ]);
  return qcm(
    text,
    r.correct,
    r.pieges,
    exp(`Ordre ${croiss ? "croissant : du plus petit au plus grand" : "décroissant : du plus grand au plus petit"}. On compare les dixièmes, puis les centièmes.`, `${xs.map((v) => fm(v, 2)).join(" ; ")}.`, `Le bon rangement est ${r.correct}.`),
    hasard(0.5) ? droiteUnite(e, xs.map((v) => ({ v, label: s(v) }))) : parfois(0.6, () => tab(xs.map(s))),
  );
}

/** ★2 Le premier ou le dernier d'un rangement. */
function premierDernierQ(): Q {
  const l = lot(2);
  const e = eLot(l);
  const xs = melesMemeEntier(e, 4, 2);
  const croiss = hasard(0.5);
  const premier = hasard(0.5);
  const tri = [...xs].sort((a, b) => (croiss ? a - b : b - a));
  const cible = premier ? tri[0] : tri[tri.length - 1];
  const s = (v: number) => `${fm(v)} ${l.u}`;
  const liste = `${xs.slice(0, -1).map(s).join(", ")} et ${s(xs[3])}`;
  const text = pick([
    `Quatre ${l.objets} ${l.verbe} ${liste}. On les range ${croiss ? l.croiss : l.decroiss}. Lequel vient en ${premier ? "premier" : "dernier"} ?`,
    `${pick(PERSONNES).nom} range ${liste} dans l’ordre ${croiss ? "croissant" : "décroissant"}. Quelle mesure écrit-on en ${premier ? "premier" : "dernier"} ?`,
    `Dans l’ordre ${croiss ? "croissant" : "décroissant"}, quelle mesure vient en ${premier ? "premier" : "dernier"} : ${liste} ?`,
  ]);
  return qcm(
    text,
    s(cible),
    xs.filter((v) => v !== cible).map(s),
    exp(`Ordre ${croiss ? "croissant" : "décroissant"} : ${croiss ? "le plus petit d’abord" : "le plus grand d’abord"}.`, ordre(tri.map((v) => fm(v)), croiss), `En ${premier ? "premier" : "dernier"} : ${s(cible)}.`),
    parfois(0.7, () => tab(xs.map((v) => fm(v)))),
  );
}

/** ★2 Le nombre du milieu. */
function milieuQ(): Q {
  const l = lot(2);
  const e = eLot(l);
  const n = pick([3, 5] as const);
  const xs = melesMemeEntier(e, n, 2);
  const tri = [...xs].sort((a, b) => a - b);
  const mid = tri[Math.floor(tri.length / 2)];
  const s = (v: number) => fm(v);
  const text = pick([
    `${pick(ANNONCEURS).qui} range ces nombres dans l’ordre croissant : ${xs.map(s).join(" ; ")}. Lequel sera au milieu ?`,
    `Une fois rangés, quel nombre est au milieu : ${xs.map(s).join(" ; ")} ?`,
    `${NOMBRE_L[xs.length]} ${l.objets} ${l.verbe} ${xs.map((v) => `${s(v)} ${l.u}`).join(" ; ")}. Rangés ${l.croiss}, lequel est au milieu ?`,
  ]);
  const avecU = text.includes(l.verbe);
  const f = (v: number) => (avecU ? `${s(v)} ${l.u}` : s(v));
  return qcm(
    text,
    f(mid),
    xs.filter((v) => v !== mid).map(f),
    exp("On range d’abord tous les nombres, puis on prend celui du milieu.", tri.map(s).join(" < "), `Au milieu : ${s(mid)}.`),
    parfois(0.7, () => droiteUnite(e, xs.map((v) => ({ v, label: s(v) })))),
  );
}

/** ★3 Ranger quatre nombres mêlés (jusqu'aux millièmes). */
function rangerMelesQ(): Q {
  const l = lot(3);
  const e = eLot(l);
  const xs = melesMemeEntier(e, 4, 3);
  const croiss = hasard(0.55);
  const s = (v: number) => fm(v);
  const r = rangements(xs, s, croiss);
  const text = pick([
    `Range dans l’ordre ${croiss ? "croissant" : "décroissant"} : ${xs.map(s).join(" ; ")}.`,
    `Quatre ${l.objets} ${l.verbe} ${xs.map((v) => `${s(v)} ${l.u}`).join(" ; ")}. Quel rangement va ${croiss ? l.croiss : l.decroiss} ?`,
    `${pick(PERSONNES).nom} doit ranger ${xs.map(s).join(" ; ")} dans l’ordre ${croiss ? "croissant" : "décroissant"}. Quel rangement est juste ?`,
    `${pick(ANNONCEURS).qui} note ${xs.map(s).join(" ; ")}. Quel est l’ordre ${croiss ? "croissant" : "décroissant"} ?`,
  ]);
  return qcm(
    text,
    r.correct,
    r.pieges,
    exp("On écrit tous les nombres avec trois chiffres après la virgule, puis on compare rang par rang.", xs.map((v) => fm(v, 3)).join(" ; "), `Le bon rangement est ${r.correct}.`),
    parfois(0.8, () => tab(xs.map(s))),
  );
}

/** ★3 Le classement d'une course : le plus petit temps gagne. */
function courseQ(): Q {
  const sport = pick([
    { quoi: "le 50 m", min: 7, max: 9, verbe: "court" },
    { quoi: "le 100 m", min: 12, max: 15, verbe: "court" },
    { quoi: "le 25 m nage libre", min: 18, max: 24, verbe: "nage" },
    { quoi: "le 60 m haies", min: 10, max: 13, verbe: "court" },
    { quoi: "la descente à ski", min: 40, max: 55, verbe: "dévale" },
    { quoi: "le slalom en roller", min: 20, max: 30, verbe: "fait" },
  ]);
  const ps = personnes(pick([3, 4]));
  const e = ent(sport.min, sport.max);
  const xs = melesMemeEntier(e, ps.length, 2);
  const tri = [...xs].sort((a, b) => a - b);
  const place = pick([1, 2, ps.length] as const);
  const cible = tri[place - 1];
  const qui = ps[xs.indexOf(cible)].nom;
  const lignes = ps.map((p, i) => `${p.nom} ${fm(xs[i])} s`).join(", ");
  const question = place === 1 ? "Qui gagne la course ?" : place === 2 ? "Qui arrive deuxième ?" : "Qui arrive dernier ?";
  const text = pick([
    `Au chronomètre, sur ${sport.quoi} : ${lignes}. ${question}`,
    `L’arbitre note les temps sur ${sport.quoi} : ${lignes}. ${question}`,
    `Résultats sur ${sport.quoi} : ${lignes}. ${question}`,
  ]);
  return qcm(
    text,
    qui,
    ps.filter((p) => p.nom !== qui).map((p) => p.nom),
    exp("Dans une course, le plus petit temps gagne : on range les temps dans l’ordre croissant.", tri.map((v) => `${fm(v)} s`).join(" < "), `${qui} (${fm(cible)} s).`),
    parfois(0.75, () => (hasard(0.5) ? tab(xs.map((v) => fm(v)), { labels: ps.map((p) => p.nom) }) : droiteUnite(e, xs.map((v, i) => ({ v, label: ps[i].nom }))))),
  );
}

/** ★3 Où placer un nombre dans une liste rangée. */
function placerQ(): Q {
  const e = ent(0, 15);
  const tous = melesMemeEntier(e, 4, 3);
  const x = tous[ent(0, 3)];
  const tri = tous.filter((v) => v !== x).sort((a, b) => a - b);
  const s = (v: number) => fm(v);
  const pos = [`avant ${s(tri[0])}`, `entre ${s(tri[0])} et ${s(tri[1])}`, `entre ${s(tri[1])} et ${s(tri[2])}`, `après ${s(tri[2])}`];
  const idx = tri.filter((v) => v < x).length;
  const text = pick([
    `Les nombres ${tri.map(s).join(" ; ")} sont rangés dans l’ordre croissant. Où placer ${s(x)} ?`,
    `${pick(PERSONNES).nom} a rangé ${tri.map(s).join(" < ")}. Où doit-on écrire ${s(x)} ?`,
    `Dans la liste ${tri.map(s).join(" < ")}, où se range ${s(x)} ?`,
  ]);
  return qcm(
    text,
    pos[idx],
    pos.filter((_, i) => i !== idx),
    exp("On compare le nombre à chacun des nombres rangés, rang par rang.", [...tri, x].sort((a, b) => a - b).map(s).join(" < "), `${s(x)} se place ${pos[idx]}.`),
    parfois(0.75, () => tab([...tri, x].map(s), { labels: [...tri.map(() => ""), "?"] })),
  );
}

/** ★3 Le podium : plus grand ou plus petit selon l'épreuve. */
function podiumQ(): Q {
  const ep = pick([
    { quoi: "au saut en longueur", u: "m", min: 3, max: 5, grand: true },
    { quoi: "au lancer de poids", u: "m", min: 6, max: 9, grand: true },
    { quoi: "au saut en hauteur", u: "m", min: 1, max: 1, grand: true },
    { quoi: "au 50 m", u: "s", min: 7, max: 9, grand: false },
    { quoi: "au 25 m dos", u: "s", min: 20, max: 26, grand: false },
    { quoi: "au lancer de javelot", u: "m", min: 15, max: 25, grand: true },
  ]);
  const ps = personnes(4);
  const e = ent(ep.min, ep.max);
  const xs = melesMemeEntier(e, 4, 2);
  const tri = [...xs].sort((a, b) => (ep.grand ? b - a : a - b));
  const marche = pick([1, 2, 3] as const);
  const cible = tri[marche - 1];
  const qui = ps[xs.indexOf(cible)].nom;
  const lignes = ps.map((p, i) => `${p.nom} ${fm(xs[i])} ${ep.u}`).join(", ");
  const question = marche === 1 ? "Qui monte sur la première marche du podium ?" : marche === 2 ? "Qui monte sur la deuxième marche du podium ?" : "Qui monte sur la troisième marche du podium ?";
  return qcm(
    `Résultats ${ep.quoi} : ${lignes}. ${question}`,
    qui,
    ps.filter((p) => p.nom !== qui).map((p) => p.nom),
    exp(ep.grand ? "Au saut ou au lancer, la plus grande mesure gagne." : "À la course ou à la nage, le plus petit temps gagne.", ordre(tri.map((v) => fm(v)), !ep.grand), `Marche ${marche} : ${qui}.`),
    parfois(0.7, () => tab(xs.map((v) => fm(v)), { labels: ps.map((p) => p.nom) })),
  );
}

/* ═══════════════════════════ DECIMAL_ARRONDIR ═══════════════════════════ */

const MA = "decimal_arrondir";
/** Arrondi de v (millièmes) au pas donné (1000 = unité, 100 = dixième, 10 = centième). */
const arrondi = (v: number, pas: number) => Math.floor((v + pas / 2) / pas) * pas;
const tronque = (v: number, pas: number) => Math.floor(v / pas) * pas;
/** Une valeur qui n'est pas pile au milieu. */
function pasAuMilieu(v: number, pas: number) {
  return v % pas === pas / 2 ? v + (pas >= 100 ? pas / 10 : 1) : v;
}

/** ★3 Arrondir à l'unité. */
function arrondiUniteQ(): Q {
  const nd = pick([1, 2, 3] as const);
  const { m, e } = mesure({ nd, prixOk: false });
  const v = pasAuMilieu(e * 1000 + partDec(nd), 1000);
  const x = fm(v);
  const a = arrondi(v, 1000);
  const ctx = hasard(0.75);
  const u = ctx ? ` ${m.u}` : "";
  const text = ctx
    ? `${m.dit(x, pick(PERSONNES))} ${pick([`On arrondit ${m.quoi} ${pres(m.u, 0)}. Quel résultat ?`, `Quel est l’arrondi ${pres(m.u, 0)} ?`, `Arrondis cette mesure ${pres(m.u, 0)}.`])}`
    : pick([`Arrondis ${x} à l’unité.`, `Quel est l’arrondi de ${x} à l’unité ?`, `Quel entier est le plus proche de ${x} ?`]);
  const f = (w: number) => `${fm(w)}${u}`;
  return qcm(
    text,
    f(a),
    [f(tronque(v, 1000)), f(tronque(v, 1000) + 1000), e > 0 ? f(tronque(v, 1000) - 1000) : null, f(tronque(v, 1000) + 2000), `${x}${u}`],
    exp("À l’unité, on regarde le chiffre des dixièmes : 5 ou plus, on monte ; moins de 5, on garde.", `${x} : chiffre des dixièmes ${Math.floor((v % 1000) / 100)}.`, `L’arrondi à l’unité est ${fm(a)}.`),
    parfois(0.8, () => droiteUnite(e, [{ v, label: x }])),
  );
}

/** ★3 Arrondir au dixième. */
function arrondiDixiemeQ(): Q {
  const nd = pick([2, 3] as const);
  const { m, e } = mesure({ nd, prixOk: false });
  const v = pasAuMilieu(e * 1000 + partDec(nd), 100);
  const x = fm(v);
  const a = arrondi(v, 100);
  const t = tronque(v, 100);
  const ctx = hasard(0.7);
  const u = ctx ? ` ${m.u}` : "";
  const text = ctx
    ? `${m.dit(x, pick(PERSONNES))} ${pick([`On arrondit ${m.quoi} ${pres(m.u, 1)}. Quel résultat ?`, `Quel est l’arrondi ${pres(m.u, 1)} ?`, `Arrondis cette mesure ${pres(m.u, 1)}.`])}`
    : pick([`Arrondis ${x} au dixième.`, `Quel est l’arrondi de ${x} au dixième ?`, `Quel nombre à un chiffre après la virgule est le plus proche de ${x} ?`]);
  const f = (w: number) => `${fm(w, 1)}${u}`;
  return qcm(
    text,
    f(a),
    [f(t), f(t + 100), t >= 100 ? f(t - 100) : f(t + 200), `${fm(arrondi(v, 1000))}${u}`, nd === 3 ? `${fm(arrondi(v, 10), 2)}${u}` : `${x}${u}`],
    exp("Au dixième, on regarde le chiffre des centièmes : 5 ou plus, on monte d’un dixième.", `${x} : chiffre des centièmes ${Math.floor((v % 100) / 10)}.`, `L’arrondi au dixième est ${fm(a, 1)}.`),
    parfois(0.8, () => droite(t / 1000, (t + 100) / 1000, 0.01, [t / 1000, (t + 100) / 1000], [{ value: v / 1000, label: x }])),
  );
}

/** ★3 Arrondir au centième. */
function arrondiCentiemeQ(): Q {
  const { m, e } = mesure({ nd: 3 });
  const v = pasAuMilieu(e * 1000 + partDec(3), 10);
  const x = fm(v);
  const a = arrondi(v, 10);
  const t = tronque(v, 10);
  const ctx = hasard(0.7);
  const u = ctx ? ` ${m.u}` : "";
  const text = ctx
    ? `${m.dit(x, pick(PERSONNES))} ${pick([`On arrondit ${m.quoi} ${pres(m.u, 2)}. Quel résultat ?`, `Quel est l’arrondi ${pres(m.u, 2)} ?`])}`
    : pick([`Arrondis ${x} au centième.`, `Quel est l’arrondi de ${x} au centième ?`, `Quel nombre à deux chiffres après la virgule est le plus proche de ${x} ?`]);
  const f = (w: number) => `${fm(w, 2)}${u}`;
  return qcm(
    text,
    f(a),
    [f(t), f(t + 10), t >= 10 ? f(t - 10) : f(t + 20), `${fm(arrondi(v, 100), 1)}${u}`, `${x}${u}`],
    exp("Au centième, on regarde le chiffre des millièmes : 5 ou plus, on monte d’un centième.", `${x} : chiffre des millièmes ${v % 10}.`, `L’arrondi au centième est ${fm(a, 2)}.`),
    parfois(0.8, () => droite(t / 1000, (t + 10) / 1000, 0.001, [t / 1000, (t + 10) / 1000], [{ value: v / 1000, label: x }])),
  );
}

/** ★3 Encadrer entre deux entiers ou deux dixièmes consécutifs. */
function encadrerQ(): Q {
  const dix = hasard(0.5);
  const nd = dix ? pick([2, 3] as const) : pick([1, 2, 3] as const);
  const e = ent(0, 30);
  const v = e * 1000 + partDec(nd);
  const x = fm(v);
  const pas = dix ? 100 : 1000;
  const lo = tronque(v, pas);
  const f = (w: number) => fm(w, dix ? 1 : 0);
  const ent2 = (a: number, b: number) => `entre ${f(a)} et ${f(b)}`;
  const text = dix
    ? pick([`Entre quels dixièmes consécutifs se trouve ${x} ?`, `Encadre ${x} entre deux nombres à un chiffre après la virgule qui se suivent.`, `${phrase(x).texte} Entre quels dixièmes consécutifs est ce nombre ?`])
    : pick([`Entre quels nombres entiers consécutifs se trouve ${x} ?`, `Encadre ${x} entre deux entiers qui se suivent.`, `${phrase(x).texte} Entre quels entiers consécutifs est ce nombre ?`]);
  return qcm(
    text,
    ent2(lo, lo + pas),
    [lo >= pas ? ent2(lo - pas, lo) : null, ent2(lo + pas, lo + 2 * pas), dix ? `entre ${fm(tronque(v, 1000))} et ${fm(tronque(v, 1000) + 1000)}` : `entre ${fm(tronque(v, 100), 1)} et ${fm(tronque(v, 100) + 100, 1)}`, dix && nd === 3 ? `entre ${fm(tronque(v, 10), 2)} et ${fm(tronque(v, 10) + 10, 2)}` : null],
    exp(dix ? "On garde le chiffre des dixièmes, puis on ajoute un dixième." : "La partie entière donne l’entier juste en dessous ; on ajoute 1.", `${f(lo)} < ${x} < ${f(lo + pas)}.`, `${x} est ${ent2(lo, lo + pas)}.`),
    parfois(0.85, () => droite(lo / 1000, (lo + pas) / 1000, pas / 10000, [lo / 1000, (lo + pas) / 1000], [{ value: v / 1000, label: x }])),
  );
}

/** ★3 Arrondir un prix. */
function arrondiPrixQ(): Q {
  const boutique = pick([
    { ou: "À la librairie, un roman", min: 6, max: 19 },
    { ou: "Au marché, un panier de légumes", min: 4, max: 15 },
    { ou: "À la pharmacie, une boîte de pansements", min: 2, max: 9 },
    { ou: "Chez le fleuriste, un bouquet", min: 12, max: 35 },
    { ou: "Au magasin de sport, un ballon", min: 9, max: 29 },
    { ou: "À la quincaillerie, une boîte de vis", min: 3, max: 12 },
    { ou: "À la boulangerie, un gâteau", min: 8, max: 24 },
    { ou: "Chez le disquaire, un vinyle", min: 15, max: 39 },
    { ou: "À la papeterie, une trousse", min: 3, max: 14 },
    { ou: "Au cinéma, une place", min: 5, max: 12 },
  ]);
  const e = ent(boutique.min, boutique.max);
  const euro = hasard(0.55);
  const pas = euro ? 1000 : 100;
  const v = pasAuMilieu(e * 1000 + partDec(2), pas);
  const x = fm(v, 2);
  const a = arrondi(v, pas);
  const t = tronque(v, pas);
  const f = (w: number) => `${fm(w, euro ? 0 : 2)} €`;
  const text = `${boutique.ou} coûte ${x} €. ${pick([`Quel est son prix arrondi ${pres("€", euro ? 0 : 1)} ?`, `Arrondis ce prix ${pres("€", euro ? 0 : 1)}.`, `Combien cela fait-il environ, ${pres("€", euro ? 0 : 1)} ?`])}`;
  return qcm(
    text,
    f(a),
    [f(t), f(t + pas), t >= pas ? f(t - pas) : null, euro ? `${fm(arrondi(v, 100), 2)} €` : `${fm(arrondi(v, 1000))} €`],
    exp(euro ? "À l’euro près : on regarde les dixièmes (le 1er chiffre des centimes)." : "Au dixième d’euro près : on regarde les centièmes.", `${x} € : chiffre des ${euro ? "dixièmes" : "centièmes"} ${euro ? Math.floor((v % 1000) / 100) : Math.floor((v % 100) / 10)}.`, `Arrondi : ${f(a)}.`),
    parfois(0.7, () => (euro ? droiteUnite(e, [{ v, label: `${x} €` }]) : droite(t / 1000, (t + 100) / 1000, 0.01, [t / 1000, (t + 100) / 1000], [{ value: v / 1000, label: `${x} €` }]))),
  );
}

/** ★3 Quel nombre a cet arrondi ? (le piège de la troncature) */
function quelNombreQ(): Q {
  const dix = hasard(0.4);
  const pas = dix ? 100 : 1000;
  const n = (dix ? ent(1, 9) * 1000 + ent(1, 8) * 100 : ent(2, 19) * 1000);
  const fin = pas / 100;
  const dans = (lo: number, hi: number) => {
    const c = Array.from({ length: Math.floor((hi - lo) / fin) }, (_, i) => lo + i * fin).filter((w) => w % (fin * 10) !== 0 && w % pas !== pas / 2);
    return pick(c);
  };
  // la bonne : sous n (le tronqueur dirait n - pas) ou au-dessus de n
  const correct = hasard(0.5) ? dans(n - pas / 2 + fin, n) : dans(n + fin, n + pas / 2);
  const pieges = [dans(n + pas / 2 + fin, n + pas), dans(n - pas + fin, n - pas / 2), dans(n + pas + fin, n + pas + pas / 2), dans(n - pas - pas / 2 + fin, n - pas)];
  const xn = fm(n, dix ? 1 : 0);
  const text = pick([
    `Quel nombre a pour arrondi ${dix ? "au dixième" : "à l’unité"} ${xn} ?`,
    `${pick(PERSONNES).nom} a arrondi un nombre ${dix ? "au dixième" : "à l’unité"} et trouve ${xn}. Quel était ce nombre ?`,
    `${pick(ANNONCEURS).qui} arrondit une mesure ${dix ? "au dixième" : "à l’unité"} : ${xn}. Quelle mesure est possible ?`,
  ]);
  return qcm(
    text,
    fm(correct),
    pieges.filter((w) => arrondi(w, pas) !== n).map((w) => fm(w)),
    exp(`Le nombre doit être plus proche de ${xn} que de ${fm(n - pas, dix ? 1 : 0)} et de ${fm(n + pas, dix ? 1 : 0)}.`, `${fm(correct)} est plus proche de ${xn} que de ses voisins.`, `${fm(correct)} s’arrondit à ${xn}.`),
    parfois(0.75, () => droite((n - pas) / 1000, (n + pas) / 1000, pas / 10000, [(n - pas) / 1000, n / 1000, (n + pas) / 1000], [])),
  );
}

/* ═══════════════════════════ DECIMAL_DEFI ═══════════════════════════ */

const MD = "decimal_defi";

/** ★3 Devinette : les indices, dans le désordre. */
function devinetteQ(): Q {
  const e = hasard(0.5) ? ent(10, 59) : ent(1, 9);
  const [d, c, m] = chiffres(3);
  const zero = pick(["d", "c", "aucun"] as const);
  const dd = zero === "d" ? 0 : d;
  const cc = zero === "c" ? 0 : c;
  const x = `${e},${dd}${cc}${m}`;
  const ind = melange([
    `Ma partie entière est ${e}.`,
    `Mon chiffre des dixièmes est ${dd}.`,
    `Mon chiffre des centièmes est ${cc}.`,
    `Mon chiffre des millièmes est ${m}.`,
  ]);
  const p = pick(PERSONNES);
  const text = pick([
    `${ind.join(" ")} Qui suis-je ?`,
    `${p.nom} pense à un nombre. ${ind.join(" ")} Quel est ce nombre ?`,
    `Devinette ${duQui(pick(ANNONCEURS).qui)} : ${ind.join(" ")} Quel nombre est-ce ?`,
  ]);
  return qcm(
    text,
    x,
    [`${e},${[dd, cc, m].filter(Boolean).join("")}`, `${e},${m}${cc}${dd}`, `${e},${cc}${dd}${m}`, `${e},${dd}${m}${cc}`, `${e},0${dd}${cc}${m}`],
    exp("On place chaque indice dans le tableau de numération, rang par rang.", `${e} | ${dd} | ${cc} | ${m}.`, `Le nombre est ${x}.`),
    parfois(0.8, () => tab([null], { nd: 3, nInt: String(e).length })),
  );
}

/** ★3 Les cartes : le plus grand / le plus petit nombre possible. */
function cartesQ(): Q {
  const k = pick([3, 4] as const);
  const cs = chiffres(k);
  const grand = hasard(0.5);
  const tri = [...cs].sort((a, b) => (grand ? b - a : a - b));
  const correct = `${tri[0]},${tri.slice(1).join("")}`;
  const inverse = [...tri].reverse();
  const p = pick(PERSONNES);
  const text = pick([
    `Avec les cartes ${cs.join(", ")} et une virgule, quel est le plus ${grand ? "grand" : "petit"} nombre possible avec un seul chiffre avant la virgule ?`,
    `${p.nom} a les cartes ${cs.join(", ")} et une carte virgule. Avec un seul chiffre avant la virgule, quel est le plus ${grand ? "grand" : "petit"} nombre qu’${il(p)} peut écrire ?`,
    `Jeu de cartes : ${cs.join(" ; ")} et une virgule. Un seul chiffre avant la virgule. Quel nombre est le plus ${grand ? "grand" : "petit"} ?`,
  ]);
  return qcm(
    text,
    correct,
    [`${inverse[0]},${inverse.slice(1).join("")}`, `${tri[0]},${[...tri.slice(1)].reverse().join("")}`, `${tri[1]},${[tri[0], ...tri.slice(2)].join("")}`, `${cs[0]},${cs.slice(1).join("")}`],
    exp(grand ? "Le plus grand chiffre va au rang le plus fort (les unités), puis on descend." : "Le plus petit chiffre va aux unités, puis les autres du plus petit au plus grand.", `${tri.join(" puis ")}.`, `Le nombre est ${correct}.`),
    parfois(0.7, () => tab([null], { nd: k - 1 })),
  );
}

/** ★3 Ajouter 1 dixième, 1 centième ou 1 millième (avec retenue). */
function ajouterQ(): Q {
  const nd = pick([2, 3] as const);
  const e = ent(0, 19);
  const rk = ent(1, nd) as Nd;
  // un chiffre 9 au rang ajouté, pour la retenue
  const ds = Array.from({ length: nd }, () => ent(1, 8));
  ds[rk - 1] = 9;
  const x = `${e},${ds.join("")}`;
  const v = val(x);
  const pas = 10 ** (3 - rk);
  const res = v + pas;
  const nom = RANG_DEC[rk - 1];
  const p = pick(PERSONNES);
  const { texte } = phrase(x);
  const text = pick([
    `Ajoute 1 ${nom} à ${x}.`,
    `${x} + 1 ${nom} = ?`,
    `${p.nom} ajoute 1 ${nom} à ${x}. Quel nombre obtient-${il(p)} ?`,
    `${texte} On ajoute 1 ${nom}. Quel nombre obtient-on ?`,
  ]);
  const naif = `${e},${ds.map((c, i) => (i === rk - 1 ? c + 1 : c)).join("")}`;
  return qcm(
    text,
    fm(res),
    [naif, ...([1, 2, 3] as const).filter((r) => r !== rk).map((r) => fm(v + 10 ** (3 - r))), fm(v + 1000)],
    exp("10 millièmes font 1 centième, 10 centièmes font 1 dixième, 10 dixièmes font 1 unité.", `${x} + ${fm(pas, 3)} = ${fm(res)}.`, `On obtient ${fm(res)}.`),
    parfois(0.75, () => tab([x], { nd })),
  );
}

/** ★3 Retirer 1 dixième, 1 centième ou 1 millième (avec emprunt). */
function retirerQ(): Q {
  const nd = pick([1, 2] as const);
  const e = ent(1, 19);
  const v = e * 1000 + partDec(nd);
  const x = fm(v);
  const rk = ent(nd, 3) as Nd;
  const pas = 10 ** (3 - rk);
  const res = v - pas;
  const nom = RANG_DEC[rk - 1];
  const p = pick(PERSONNES);
  const { texte } = phrase(x);
  const text = pick([
    `Retire 1 ${nom} à ${x}.`,
    `${x} − 1 ${nom} = ?`,
    `${p.nom} enlève 1 ${nom} à ${x}. Quel nombre obtient-${il(p)} ?`,
    `${texte} On enlève 1 ${nom}. Quel nombre reste-t-il ?`,
  ]);
  return qcm(
    text,
    fm(res),
    [...([1, 2, 3] as const).filter((r) => r !== rk).map((r) => (v - 10 ** (3 - r) > 0 ? fm(v - 10 ** (3 - r)) : null)), fm(v + pas), fm(v - 1000)],
    exp("Pour retirer 1 centième à 5,3, on écrit 5,30 : 30 centièmes − 1 centième = 29 centièmes.", `${fm(v, rk)} − ${fm(pas, 3)} = ${fm(res)}.`, `On obtient ${fm(res)}.`),
    parfois(0.75, () => tab([fm(v, rk)])),
  );
}

/** ★4 Combien de nombres entre deux décimaux ? */
function combienEntreQ(): Q {
  const type = pick(["d_c", "d_c2", "c_m", "d_m"] as const);
  const e = ent(0, 20);
  const d = ent(1, 7);
  let lo: number, hi: number, nd: number, correct: number, pas: number;
  if (type === "d_c") [lo, hi, nd, correct, pas] = [e * 1000 + d * 100, e * 1000 + (d + 1) * 100, 2, 9, 0.01];
  else if (type === "d_c2") [lo, hi, nd, correct, pas] = [e * 1000 + d * 100, e * 1000 + (d + 2) * 100, 2, 19, 0.01];
  else if (type === "c_m") {
    const c = ent(11, 98);
    [lo, hi, nd, correct, pas] = [e * 1000 + c * 10, e * 1000 + (c + 1) * 10, 3, 9, 0.001];
  } else [lo, hi, nd, correct, pas] = [e * 1000 + d * 100, e * 1000 + (d + 1) * 100, 3, 99, 0.01];
  const xl = fm(lo);
  const xh = fm(hi);
  const avec = nd === 2 ? "deux chiffres" : "trois chiffres";
  const p = pick(PERSONNES);
  const text = pick([
    `Combien de nombres à ${avec} après la virgule y a-t-il entre ${xl} et ${xh} (sans compter ${xl} ni ${xh}) ?`,
    `${p.nom} écrit tous les nombres à ${avec} après la virgule compris entre ${xl} et ${xh}, sans les deux bouts. Combien en écrit-${il(p)} ?`,
    `Sur la droite graduée, combien de nombres à ${avec} après la virgule se trouvent entre ${xl} et ${xh}, bouts exclus ?`,
    `${pick(ANNONCEURS).qui} cherche les nombres à ${avec} après la virgule plus grands que ${xl} et plus petits que ${xh}. Combien y en a-t-il ?`,
    `La balance de l’épicière va de ${xl} kg à ${xh} kg. Combien de masses à ${avec} après la virgule sont entre les deux, bouts exclus ?`,
    `Le chronomètre de l’arbitre affiche des temps entre ${xl} s et ${xh} s. Combien de temps à ${avec} après la virgule sont possibles, sans les deux bouts ?`,
    `${p.nom} et ${pick(PERSONNES.filter((q) => q.nom !== p.nom)).nom} jouent : il faut écrire un nombre à ${avec} après la virgule entre ${xl} et ${xh}, sans les bouts. Combien de nombres différents peut-on écrire ?`,
  ]);
  const pieges = correct === 9 ? [10, 11, 8, 1, 0] : correct === 19 ? [20, 21, 18, 2] : [100, 9, 10, 98];
  return qcm(
    text,
    String(correct),
    pieges.map(String),
    exp("On compte les pas entre les deux bouts, puis on enlève les bouts.", `De ${fm(lo, nd)} à ${fm(hi, nd)} : ${correct + 1} pas, donc ${correct} nombres entre les deux.`, `Il y en a ${correct}.`),
    correct <= 19 ? parfois(0.85, () => droite(lo / 1000, hi / 1000, pas, [lo / 1000, hi / 1000], [])) : undefined,
  );
}

/** ★4 Convertir une mesure décimale (2,05 km = 2 050 m). */
function conversionQ(): Q {
  const conv = pick([
    { de: "km", vers: "m", f: 1000, nd: 3 as Nd, dit: (x: string) => pick([`La coureuse a parcouru ${x} km.`, `Le chauffeur livre un colis à ${x} km.`, `La randonnée fait ${x} km.`]) },
    { de: "kg", vers: "g", f: 1000, nd: 3 as Nd, dit: (x: string) => pick([`Le boucher pèse ${x} kg de viande.`, `La boulangère utilise ${x} kg de farine.`, `Le colis pèse ${x} kg.`]) },
    { de: "L", vers: "mL", f: 1000, nd: 3 as Nd, dit: (x: string) => pick([`L’infirmière prépare ${x} L de sérum.`, `La bouteille contient ${x} L d’eau.`, `Le cuisinier verse ${x} L de bouillon.`]) },
    { de: "m", vers: "cm", f: 100, nd: 2 as Nd, dit: (x: string) => pick([`Le menuisier scie une planche de ${x} m.`, `La couturière coupe ${x} m de tissu.`, `Le basketteur mesure ${x} m.`]) },
    { de: "m", vers: "mm", f: 1000, nd: 3 as Nd, dit: (x: string) => pick([`Le plombier coupe un tuyau de ${x} m.`, `L’architecte dessine un mur de ${x} m.`]) },
  ]);
  const e = ent(0, 9);
  const ndv = ent(1, conv.nd) as Nd;
  let r = partDec(ndv);
  if (hasard(0.4) && ndv >= 2) r = ent(1, 9) * 10 ** (3 - ndv);
  const v = e * 1000 + r;
  const x = fm(v);
  const res = (v * conv.f) / 1000;
  const p = pick(PERSONNES);
  const text = `${conv.dit(x)} ${pick([`Combien cela fait-il de ${conv.vers === "mL" ? "millilitres" : conv.vers === "g" ? "grammes" : conv.vers === "cm" ? "centimètres" : conv.vers === "mm" ? "millimètres" : "mètres"} ?`, `Écris cette mesure en ${conv.vers}.`, `${p.nom} veut l’écrire en ${conv.vers}. Que trouve-t-${il(p)} ?`])}`;
  const dp = x.split(",")[1] ?? "";
  const colle = Number(`${e}${dp}`);
  return qcm(
    text,
    `${milliers(res)} ${conv.vers}`,
    [res / 10, res * 10, res / 100, res * 100, colle, e * conv.f + Number(dp), e * conv.f + Number(dp) * 10].filter((w) => Number.isInteger(w) && w > 0 && w !== res).map((w) => `${milliers(w)} ${conv.vers}`),
    exp(`1 ${conv.de} = ${milliers(conv.f)} ${conv.vers} : on écrit la mesure avec ${conv.f === 1000 ? "trois" : "deux"} chiffres après la virgule et on enlève la virgule.`, `${x} ${conv.de} = ${fm(v, conv.f === 1000 ? 3 : 2)} ${conv.de} = ${milliers(res)} ${conv.vers}.`, `${x} ${conv.de} = ${milliers(res)} ${conv.vers}.`),
  );
}

/** ★4 Combien manque-t-il pour faire l'entier suivant ? */
function manqueQ(): Q {
  const nd = pick([1, 2, 2, 3] as const);
  const { m, e } = mesure({ nd, prixOk: false });
  const v = e * 1000 + partDec(nd);
  const x = fm(v);
  const cible = (e + 1) * 1000;
  const res = cible - v;
  const ds = (x.split(",")[1] ?? "").split("").map(Number);
  const chiffreAChiffre = `0,${ds.map((c) => (10 - c) % 10).join("")}`;
  const text = pick([
    `Combien manque-t-il à ${x} pour faire ${e + 1} ?`,
    `${x} + … = ${e + 1}. Quel nombre manque ?`,
    `${m.dit(x, pick(PERSONNES))} Combien manque-t-il pour arriver à ${e + 1} ${m.u} ?`,
  ]);
  const avecU = text.includes(` ${m.u} ?`);
  const f = (w: number | string) => `${typeof w === "number" ? fm(w) : w}${avecU ? ` ${m.u}` : ""}`;
  return qcm(
    text,
    f(res),
    [chiffreAChiffre, fm(v - e * 1000), fm(res + 1000), fm(res + 100), res > 100 ? fm(res - 100) : null].map((w) => (w ? f(w) : null)),
    exp("On complète rang par rang jusqu’à l’unité suivante : 1 unité = 10 dixièmes = 100 centièmes = 1 000 millièmes.", `${x} + ${fm(res)} = ${e + 1}.`, `Il manque ${fm(res)}.`),
    parfois(0.8, () => droiteUnite(e, [{ v, label: x }])),
  );
}

/** ★4 Deux écritures du même nombre ? (mots contre virgule) */
function motsContreQ(): Q {
  const [p1, p2] = personnes(2);
  const e = ent(1, 19);
  const k = ent(1, 9);
  const type = pick(["dix_cent", "cent_mil", "meme_dix", "meme_mil"] as const);
  const [rangMots, xEcrit] =
    type === "dix_cent" ? [2 as Nd, `${e},${k}`] : type === "cent_mil" ? [3 as Nd, `${e},0${k}`] : type === "meme_dix" ? [1 as Nd, `${e},${k}`] : [3 as Nd, `${e},00${k}`];
  const vrai = auRang(e, k, rangMots) as string;
  const meme = val(vrai) === val(xEcrit);
  const text = pick([
    `${p1.nom} écrit « ${lecture(e, k, rangMots)} ». ${p2.nom} écrit ${xEcrit}. Ont-ils écrit le même nombre ?`,
    `${p1.nom} dicte « ${lecture(e, k, rangMots)} » et ${p2.nom} note ${xEcrit}. ${p2.nom} a-t-${il(p2)} bien noté ?`,
    `Pour « ${lecture(e, k, rangMots)} », ${p2.nom} propose ${xEcrit}. Est-ce juste ?`,
  ]);
  const OUI = "Oui, c’est le même nombre";
  const correct = meme ? OUI : `Non : il fallait écrire ${vrai}`;
  const autres = [auRang(e, k, 1), auRang(e, k, 2), auRang(e, k, 3), `${e}${k}`].filter((s): s is string => !!s && val(s) !== val(vrai) && s !== xEcrit).map((s) => `Non : il fallait écrire ${s}`);
  return qcm(
    text,
    correct,
    meme ? autres : [OUI, ...autres],
    exp("On écrit les mots dans le tableau de numération : le dernier chiffre tombe au rang annoncé.", `${lecture(e, k, rangMots)} = ${vrai}.`, meme ? `${xEcrit} est juste.` : `${xEcrit} est faux : c’est ${vrai}.`),
    parfois(0.8, () => tab([null, null], { labels: [p1.nom, p2.nom], nd: 3 })),
  );
}

/* ═══════════════════════════ LES GABARITS ═══════════════════════════ */
// ⚠️ Mêmes étoiles qu'avant 14/11 : lire ★1-2, fraction ★1-2, valeur ★1-3,
// comparer ★1-2, ordonner ★2-3, arrondir ★3, défi ★3-4. Les id des anciens
// gabarits sont repris par le gabarit le plus proche.

export const gabaritsDecimauxCm2: TutorBankItemV4[] = [
  // decimal_lire
  gab("cm2_decimal_lire_tpl_lire_e1", ML, 1, "Le dernier chiffre après la virgule donne le rang : dixièmes ou centièmes.", ["lecture", "canvas"], lireQ),
  gab("cm2_decimal_lire_tpl_1", ML, 1, "Les unités, la virgule, puis la partie décimale.", ["lecture", "ecrire", "canvas"], ecrireQ),
  gab("cm2_decimal_lire_tpl_partie_e1", ML, 1, "La virgule sépare la partie entière de la partie décimale.", ["lecture", "partie_entiere", "canvas"], partieQ),
  gab("cm2_decimal_lire_tpl_milliemes_e2", ML, 2, "Trois chiffres après la virgule : on lit des millièmes.", ["lecture", "millieme", "canvas"], lireMilliemesQ),
  gab("cm2_decimal_lire_tpl_2_centiemes", ML, 2, "Les millièmes sont au 3e rang après la virgule ; un rang vide reçoit un 0.", ["lecture", "ecrire", "millieme", "piege", "canvas"], ecrireMilliemesQ),
  gab("cm2_decimal_lire_tpl_dictee_e2", ML, 2, "Écris la partie entière, la virgule, puis la partie décimale.", ["lecture", "lettres", "canvas"], dicteeQ),
  gab("cm2_decimal_lire_tpl_rangs_e2", ML, 2, "Chaque chiffre dans son rang ; un rang vide reçoit un 0.", ["lecture", "zero", "canvas"], rangsVersNombreQ),

  // decimal_fraction
  gab("cm2_decimal_fraction_tpl_bande_e1", MF, 1, "Une part sur 10, c’est 1/10 = 0,1.", ["fraction_decimale", "dixieme", "canvas"], bandeQ),
  gab("cm2_decimal_fraction_tpl_1_dixiemes", MF, 1, "k/10, c’est k dixièmes : 0,k.", ["fraction_decimale", "dixieme", "canvas"], fracDixQ),
  gab("cm2_decimal_fraction_tpl_dec_vers_dix_e1", MF, 1, "0,k, c’est k dixièmes : k/10.", ["fraction_decimale", "dixieme", "canvas"], decVersDixQ),
  gab("cm2_decimal_fraction_tpl_grille_e1", MF, 1, "Une case sur 100, c’est 1/100 = 0,01.", ["fraction_decimale", "centieme", "canvas"], grilleQ),
  gab("cm2_decimal_fraction_tpl_2_centiemes", MF, 2, "n/100 : le dernier chiffre au 2e rang après la virgule.", ["fraction_decimale", "centieme", "canvas"], fracCentQ),
  gab("cm2_decimal_fraction_qcm_tpl_1", MF, 2, "n/1000 : le dernier chiffre au 3e rang après la virgule.", ["fraction_decimale", "millieme", "piege", "canvas"], fracMilleQ),
  gab("cm2_decimal_fraction_tpl_dec_vers_frac_e2", MF, 2, "Deux chiffres après la virgule → sur 100 ; trois → sur 1000.", ["fraction_decimale", "canvas"], decVersFracQ),
  gab("cm2_decimal_fraction_tpl_equivalence_e2", MF, 2, "1 dixième = 10 centièmes = 100 millièmes.", ["fraction_decimale", "equivalence", "canvas"], equivalenceQ),
  gab("cm2_decimal_fraction_tpl_somme_e2", MF, 2, "Dixièmes au 1er rang, centièmes au 2e, millièmes au 3e.", ["fraction_decimale", "decomposer", "canvas"], sommeFracQ),

  // decimal_valeur_chiffre
  gab("cm2_decimal_valeur_tpl_chiffre_rang_e1", MV, 1, "Après la virgule : dixièmes, puis centièmes.", ["rang", "canvas"], () => chiffreDuRangQ(1)),
  gab("cm2_decimal_valeur_tpl_rang_e1", MV, 1, "Dizaines, unités | dixièmes, centièmes.", ["rang", "canvas"], () => rangDuChiffreQ(1)),
  gab("cm2_decimal_valeur_tpl_valeur_e1", MV, 1, "La valeur d’un chiffre dépend de son rang.", ["valeur", "canvas"], () => valeurMotsQ(1)),
  gab("cm2_decimal_valeur_tpl_1", MV, 2, "Après la virgule : dixièmes, centièmes, millièmes.", ["rang", "millieme", "canvas"], () => chiffreDuRangQ(2)),
  gab("cm2_decimal_valeur_tpl_rang_e2", MV, 2, "Le 3e chiffre après la virgule compte les millièmes.", ["rang", "millieme", "canvas"], () => rangDuChiffreQ(2)),
  gab("cm2_decimal_valeur_tpl_valeur_e2", MV, 2, "Dixièmes, centièmes, millièmes : un rang par chiffre.", ["valeur", "millieme", "canvas"], () => valeurMotsQ(2)),
  gab("cm2_decimal_valeur_tpl_mots_voisins_e2", MV, 2, "Dizaine : avant la virgule ; dixième : juste après.", ["rang", "piege", "canvas"], motsVoisinsQ),
  gab("cm2_decimal_valeur_tpl_en_nombre_e3", MV, 3, "1 dixième = 0,1 ; 1 centième = 0,01 ; 1 millième = 0,001.", ["valeur", "canvas"], valeurNombreQ),
  gab("cm2_decimal_valeur_tpl_addition_e3", MV, 3, "Chaque chiffre donne un nombre qu’on additionne.", ["valeur", "decomposer", "canvas"], decomposerSommeQ),
  gab("cm2_decimal_valeur_tpl_en_tout_e3", MV, 3, "1 unité = 10 dixièmes = 100 centièmes = 1 000 millièmes.", ["valeur", "en_tout", "canvas"], enToutQ),
  gab("cm2_decimal_valeur_tpl_construire_e3", MV, 3, "Range chaque chiffre dans son rang ; un rang vide reçoit un 0.", ["valeur", "construire", "canvas"], construireQ),
  gab("cm2_decimal_valeur_qcm_tpl_1", MV, 3, "Un même chiffre n’a pas la même valeur à deux rangs différents.", ["rang", "canvas"], chiffreRepeteQ),

  // decimal_comparer
  gab("cm2_decimal_comparer_tpl_qui_plus_e1", MC, 1, "Compare les unités, puis les dixièmes.", ["comparaison", "canvas"], quiPlusQ),
  gab("cm2_decimal_comparer_tpl_signe_e1", MC, 1, "Même partie entière : regarde les dixièmes.", ["comparaison", "signe", "canvas"], signeQ),
  gab("cm2_decimal_comparer_tpl_plus_grand_e1", MC, 1, "Compare d’abord les parties entières.", ["comparaison", "canvas"], plusGrandQ),
  gab("cm2_decimal_comparer_tpl_1", MC, 2, "Le nombre le plus long n’est pas forcément le plus grand.", ["comparaison", "piege", "canvas"], piegeLongueurQ),
  gab("cm2_decimal_comparer_tpl_zeros_e2", MC, 2, "2,5 = 2,50 = 2,500 ; mais 2,05 < 2,5.", ["comparaison", "zero", "canvas"], zeroFinalQ),
  gab("cm2_decimal_comparer_tpl_entre_deux_e2", MC, 2, "Écris 3,4 = 3,40 et 3,5 = 3,50 : qu’y a-t-il entre ?", ["comparaison", "encadrer", "canvas"], entreDeuxQ),
  gab("cm2_decimal_comparer_qcm_tpl_1", MC, 2, "Écris tous les nombres avec trois chiffres après la virgule.", ["comparaison", "millieme", "canvas"], milliemesQ),
  gab("cm2_decimal_comparer_tpl_raisonnement_e2", MC, 2, "On compare rang par rang, pas le nombre écrit après la virgule.", ["comparaison", "piege", "canvas"], raisonnementQ),

  // decimal_ordonner
  gab("cm2_decimal_ordonner_tpl_trois_e2", MO, 2, "Croissant : du plus petit au plus grand.", ["ordonner", "canvas"], rangerTroisQ),
  gab("cm2_decimal_ordonner_tpl_premier_dernier_e2", MO, 2, "Croissant : le plus petit vient en premier.", ["ordonner", "canvas"], premierDernierQ),
  gab("cm2_decimal_ordonner_tpl_milieu_e2", MO, 2, "Range d’abord tous les nombres.", ["ordonner", "canvas"], milieuQ),
  gab("cm2_decimal_ordonner_tpl_1", MO, 3, "Écris tous les nombres avec trois chiffres après la virgule.", ["ordonner", "piege", "canvas"], rangerMelesQ),
  gab("cm2_decimal_ordonner_tpl_course_e3", MO, 3, "Dans une course, le plus petit temps gagne.", ["ordonner", "probleme", "canvas"], courseQ),
  gab("cm2_decimal_ordonner_tpl_placer_e3", MO, 3, "Compare le nombre à chacun de ses voisins.", ["ordonner", "canvas"], placerQ),
  gab("cm2_decimal_ordonner_tpl_podium_e3", MO, 3, "Le meilleur résultat dépend de l’épreuve : plus grand ou plus petit.", ["ordonner", "probleme", "canvas"], podiumQ),

  // decimal_arrondir
  gab("cm2_decimal_arrondir_tpl_1", MA, 3, "Regarde le chiffre des dixièmes : 5 ou plus, on monte.", ["arrondir", "unite", "canvas"], arrondiUniteQ),
  gab("cm2_decimal_arrondir_tpl_dixieme_e3", MA, 3, "Au dixième : regarde le chiffre des centièmes.", ["arrondir", "dixieme", "canvas"], arrondiDixiemeQ),
  gab("cm2_decimal_arrondir_tpl_centieme_e3", MA, 3, "Au centième : regarde le chiffre des millièmes.", ["arrondir", "centieme", "canvas"], arrondiCentiemeQ),
  gab("cm2_decimal_arrondir_tpl_encadrer_e3", MA, 3, "Garde le rang demandé, puis ajoute un pas.", ["arrondir", "encadrer", "canvas"], encadrerQ),
  gab("cm2_decimal_arrondir_tpl_prix_e3", MA, 3, "À l’euro : les dixièmes ; au dixième d’euro : les centièmes.", ["arrondir", "prix", "canvas"], arrondiPrixQ),
  gab("cm2_decimal_arrondir_tpl_quel_nombre_e3", MA, 3, "Cherche le nombre le plus proche de la valeur donnée, pas celui qui commence pareil.", ["arrondir", "piege", "canvas"], quelNombreQ),

  // decimal_defi
  gab("cm2_decimal_defi_tpl_devinette_e3", MD, 3, "Place chaque indice dans le tableau de numération.", ["defi", "canvas"], devinetteQ),
  gab("cm2_decimal_defi_tpl_cartes_e3", MD, 3, "Le chiffre le plus fort va au rang le plus fort.", ["defi", "canvas"], cartesQ),
  gab("cm2_decimal_defi_tpl_ajouter_e3", MD, 3, "10 millièmes font 1 centième ; 10 centièmes font 1 dixième.", ["defi", "retenue", "canvas"], ajouterQ),
  gab("cm2_decimal_defi_tpl_retirer_e3", MD, 3, "5,3 = 5,30 : on peut retirer 1 centième.", ["defi", "canvas"], retirerQ),
  gab("cm2_decimal_defi_tpl_combien_entre_e4", MD, 4, "Compte les pas, sans les deux bouts.", ["defi", "canvas"], combienEntreQ),
  gab("cm2_decimal_defi_tpl_1_eau", MD, 4, "1 km = 1 000 m ; 1 kg = 1 000 g ; 1 L = 1 000 mL ; 1 m = 100 cm.", ["defi", "mesure"], conversionQ),
  gab("cm2_decimal_defi_tpl_manque_e4", MD, 4, "Complète jusqu’à l’unité suivante.", ["defi", "canvas"], manqueQ),
  gab("cm2_decimal_defi_tpl_mots_e4", MD, 4, "Place les mots dans le tableau de numération avant de comparer.", ["defi", "piege", "canvas"], motsContreQ),
];
