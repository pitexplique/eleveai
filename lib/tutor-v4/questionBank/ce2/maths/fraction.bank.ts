// lib/tutor-v4/questionBank/ce2/maths/fraction.bank.ts
//
// Les fractions du CE2, écrites à la main.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, applicable à la rentrée 2025, cycle
// 2), repris du tableau CE2 : « Les fractions rencontrées au CE2 ont un
// dénominateur inférieur ou égal à DOUZE et sont toutes INFÉRIEURES OU ÉGALES
// À UN. » La banque tire dans {2, 3, 4, 5, 6, 8, 10, 12}.
//
// ⚠️ L'ADDITION DE FRACTIONS EST AU PROGRAMME (relu le 09/08/2026) :
// « Additionner et soustraire des fractions » est un attendu de fin de CE2, y
// compris « lorsque le dénominateur de l'une est un MULTIPLE du dénominateur
// de l'autre » (1/2 + 1/4). Restent hors CE2 : les dénominateurs sans rapport
// (1/3 + 1/4), la fraction plus grande que 1 et la simplification.
//
// ⚠️ PAS DE QUESTION À RÉDIGER : tout ce qui se répond par une fraction est
// écrit directement en `qcm`, avec ses propositions.
//
// ⛔ RÉÉCRITE LE 10/11/2026 (robustesse du coach, cycle 2) : 2 à 39 squelettes
// par micro, 4 à 19 répétitions sur 20. Chaque micro a désormais un générateur
// par étoile (familles × situations × tournures) ; les items figés sont devenus
// des gabarits de même idée, sous le même id. Les gâteaux patate, caris et
// samoussas d'avant (un décor sur deux) sont redevenus rares.
//
// ⭐ LES DESSINS : barre, disque, rectangle quadrillé (`fraction`) et droite
// graduée de 0 à 1. ⛔ `showFraction` est TOUJOURS coupé (le canvas écrit
// sinon « 3/4 » sous la barre — la réponse), et la droite n'écrit que 0 et 1.
// ⛔ Jamais de dessin à parts inégales : `unequalParts` écrit « les parts ne
// sont pas égales » en rouge, c'est-à-dire la réponse de ces questions-là.

import type { FractionCanvasData, NumberLineCanvasData, TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { type Etoile, type Q, choix as choixBrut, de, deuxPersonnes, exp, gabarit, maj, pick, quelquun, rint, shuffle, tirer } from "./outils-nombres-ce2";

const NOTION = "fraction";

/**
 * Les choix d'une question de fractions : ⛔ aucune fraction hors du CE2 parmi
 * les pièges (plus grande que 1, partage au-delà de 12 ou en 1, nombre à
 * virgule). S'il en manque, on complète par des voisines de même partage.
 */
function horsCE2(s: string): boolean {
  if (/\d[.,]\d/.test(s)) return true;
  for (const m of s.matchAll(/(\d+)\/(\d+)/g)) {
    const a = Number(m[1]), b = Number(m[2]);
    if (b < 2 || b > 12 || a > b || a < 1) return true;
  }
  return false;
}
function choix(correct: string, pieges: readonly string[]): string[] {
  const bons = Array.from(new Set(pieges.filter((x) => x && !horsCE2(x) && x !== correct)));
  const m = correct.match(/^(\d+)\/(\d+)(.*)$/);
  if (m) {
    const n = Number(m[1]), d = Number(m[2]);
    const voisins = Array.from({ length: d }, (_, i) => i + 1).filter((k) => k !== n).sort((x, y) => Math.abs(x - n) - Math.abs(y - n));
    for (const k of voisins) {
      if (new Set(bons.map((x) => { const v = x.match(/^(\d+)\/(\d+)/); return v ? Number(v[1]) / Number(v[2]) : x; })).size >= 4) break;
      const v = `${k}/${d}${m[3].startsWith(",") ? "" : m[3]}`;
      if (!bons.includes(v)) bons.push(v);
    }
  }
  // ⛔ jamais deux choix de même valeur (2/4 et 1/2) : on garde le premier.
  const valeur = (x: string) => {
    const v = x.match(/^(\d+)\/(\d+)/);
    return v ? Number(v[1]) / Number(v[2]) : x;
  };
  const vus = new Set<number | string>([valeur(correct)]);
  const uniques = bons.filter((x) => {
    const v = valeur(x);
    if (vus.has(v)) return false;
    vus.add(v);
    return true;
  });
  // Un partage en 2 ou en 3 n'a pas assez de voisines : quelques fractions simples en renfort.
  if (m) for (const x of ["1/4", "3/4", "1/3", "2/3", "1/2"]) {
    if (uniques.length >= 3) break;
    if (!vus.has(valeur(x))) { vus.add(valeur(x)); uniques.push(x); }
  }
  return choixBrut(correct, uniques);
}

// ============================================================
// LES MOTS DES FRACTIONS
// ============================================================

const DEN_NOM: Record<number, [string, string]> = {
  2: ["demi", "demis"],
  3: ["tiers", "tiers"],
  4: ["quart", "quarts"],
  5: ["cinquième", "cinquièmes"],
  6: ["sixième", "sixièmes"],
  8: ["huitième", "huitièmes"],
  10: ["dixième", "dixièmes"],
  12: ["douzième", "douzièmes"],
};
const NUM = ["zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix", "onze", "douze"];

/** 3/4 se lit « trois quarts », 1/2 « un demi ». */
function nom(n: number, d: number): string {
  const [s, p] = DEN_NOM[d];
  return `${NUM[n]} ${n > 1 ? p : s}`;
}

/** « des quarts », « des tiers ». */
const des = (d: number) => `des ${DEN_NOM[d][1]}`;

const fr = (n: number, d: number) => `${n}/${d}`;

const DENS = [2, 3, 4, 5, 6, 8, 10, 12] as const;
const DENS_SIMPLES = [2, 3, 4, 5, 6, 8, 10] as const;

// ============================================================
// LES TOUTS QU'ON PARTAGE
// ============================================================

type Tout = { nom: string; f: boolean; forme: "circle" | "bar" | "grid" };
const TOUTS: readonly Tout[] = [
  { nom: "pizza", f: true, forme: "circle" },
  { nom: "gâteau", f: false, forme: "circle" },
  { nom: "tarte aux pommes", f: true, forme: "circle" },
  { nom: "crêpe géante", f: true, forme: "circle" },
  { nom: "galette", f: true, forme: "circle" },
  { nom: "pastèque", f: true, forme: "circle" },
  { nom: "tablette de chocolat", f: true, forme: "grid" },
  { nom: "ruban", f: false, forme: "bar" },
  { nom: "bande de papier", f: true, forme: "bar" },
  { nom: "baguette", f: true, forme: "bar" },
  { nom: "drapeau", f: false, forme: "bar" },
  { nom: "jardin", f: false, forme: "grid" },
  { nom: "gâteau roulé", f: false, forme: "bar" },
  { nom: "barre de céréales", f: true, forme: "bar" },
  { nom: "plaque de biscuits", f: true, forme: "grid" },
  { nom: "carré de potager", f: false, forme: "grid" },
  { nom: "tapis de jeu", f: false, forme: "grid" },
  { nom: "corde à sauter", f: true, forme: "bar" },
];
const tout = () => pick(TOUTS);
const le = (t: Tout) => (t.f ? `la ${t.nom}` : `le ${t.nom}`);
const un = (t: Tout) => (t.f ? `une ${t.nom}` : `un ${t.nom}`);
const du = (t: Tout) => (t.f ? `de la ${t.nom}` : `du ${t.nom}`);
const Le = (t: Tout) => maj(le(t));

/** Celui ou celle qui partage : un enfant, un métier, Pic. */
function quiPartage(): { qui: string; il: string } {
  const p = quelquun();
  return pick([
    { qui: p.nom, il: p.il },
    { qui: p.nom, il: p.il },
    { qui: "La boulangère", il: "elle" },
    { qui: "Le chef cuisinier", il: "il" },
    { qui: "La maîtresse", il: "elle" },
    { qui: "Le jardinier", il: "il" },
    { qui: "Pic le paille-en-queue", il: "il" },
    { qui: "Le pirate", il: "il" },
  ]);
}

/** Le colorié, le mangé, le planté… selon le tout. */
function action(t: Tout): { verbe: string; part: string } {
  if (["pizza", "gâteau", "tarte aux pommes", "crêpe géante", "galette", "pastèque", "tablette de chocolat", "gâteau roulé", "barre de céréales", "plaque de biscuits", "baguette"].includes(t.nom))
    return pick([{ verbe: "mangé", part: "mangée" }, { verbe: "croqué", part: "croquée" }, { verbe: "colorié", part: "coloriée" }]);
  if (t.nom === "jardin" || t.nom === "carré de potager") return pick([{ verbe: "planté", part: "plantée" }, { verbe: "colorié", part: "coloriée" }]);
  return { verbe: "colorié", part: "coloriée" };
}

/** Une courte phrase d'entrée, pour que la même question ne revienne pas mot pour mot. */
function entree(): string {
  const p = quelquun();
  return pick([
    `${p.nom} fait ses devoirs.`,
    `${p.nom} joue à la maîtresse.`,
    `${p.nom} prépare un jeu pour la classe.`,
    `Pic le paille-en-queue pose une énigme.`,
    `${p.nom} interroge son grand frère.`,
    `${p.nom} s'entraîne avant le contrôle.`,
    "C'est le défi du jour.",
    `${p.nom} lance un quiz à la classe.`,
    "Le maître lance un défi.",
    "On est au club de maths.",
    "",
    "",
  ]);
}
const avec = (s: string) => {
  const e = entree();
  if (!e) return s;
  return `${e} ${s}`;
};

// ============================================================
// LES DESSINS (showFraction coupé, toujours)
// ============================================================

function grille(d: number): { rows: number; cols: number } {
  if (d === 12) return { rows: 3, cols: 4 };
  if (d % 2 === 0 && d >= 4) return { rows: 2, cols: d / 2 };
  return { rows: 1, cols: d };
}

function dessin(n: number, d: number, forme: Tout["forme"] = "bar"): FractionCanvasData {
  if (forme === "circle")
    return { kind: "fraction", model: "circle", fraction: { numerator: n, denominator: d }, display: { showFraction: false }, size: { width: 300, height: 170 } };
  if (forme === "grid" && d >= 4)
    return { kind: "fraction", model: "grid", grid: { ...grille(d), shaded: n }, display: { showFraction: false }, size: { width: 300, height: 140 } };
  return { kind: "fraction", model: "bar", fraction: { numerator: n, denominator: d }, display: { showFraction: false }, size: { width: 320, height: 120 } };
}

/** Deux bandes identiques, nommées A et B (jamais leur fraction). */
function deuxBandes(a: [number, number], b: [number, number]): FractionCanvasData {
  return {
    kind: "fraction",
    model: "compare",
    fractions: [
      { numerator: a[0], denominator: a[1], label: "A" },
      { numerator: b[0], denominator: b[1], label: "B" },
    ],
    display: { showFraction: true },
    size: { width: 320, height: 200 },
  };
}

/** La droite de 0 à 1, partagée en d : seuls 0 et 1 sont écrits. */
function droite01(d: number, points: NonNullable<NumberLineCanvasData["points"]>): NumberLineCanvasData {
  return {
    kind: "number_line",
    min: 0,
    max: 1,
    step: 1 / d,
    valeursEcrites: [0, 1],
    points,
    size: { width: 340, height: 100 },
    display: { showTicks: true, showValues: true, showPoints: true, showPointLabels: true },
  };
}

/** Des fractions pièges autour de n/d : inversée, voisins, mauvais partage. */
function piegesFraction(n: number, d: number): string[] {
  return [fr(d, n), fr(n + 1, d), fr(Math.max(1, n - 1), d), fr(n, d + 1), fr(d - n || 1, d), fr(n, n + d)].filter((x) => x !== fr(n, d));
}

// ============================================================
// ce2_fraction_unite — Partager en parts égales, l'unité fractionnaire
// ============================================================

function partsEgales(): Q {
  const d = pick(DENS_SIMPLES);
  const t = tout();
  const { qui } = quiPartage();
  const correct = "toutes de la même taille";
  const text = pick([
    `${qui} partage ${un(t)} en ${d} parts. Pour parler ${d === 3 ? "de tiers" : `de ${DEN_NOM[d][1]}`}, comment doivent être les parts ?`,
    `Pour que chaque part soit ${nom(1, d).replace("un ", "un ")} ${du(t)}, comment faut-il couper ?`,
    `On veut des ${DEN_NOM[d][1]} ${du(t)}. Comment doivent être les ${d} parts ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: choix(correct, ["de tailles différentes", "au moins deux pareilles", "peu importe, il faut juste " + d + " parts"]),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      "Une fraction partage un tout en parts toutes égales.",
      "On vérifie que le partage est juste avant de compter les parts.",
      `Si les parts n'ont pas la même taille, aucune n'est « ${nom(1, d)} ».`,
      "Les parts doivent être toutes de la même taille.",
    ),
  };
}

function nomDeLaPart(): Q {
  const d = pick(DENS_SIMPLES);
  const t = tout();
  const { qui } = quiPartage();
  const correct = nom(1, d);
  const autres = DENS_SIMPLES.filter((x) => x !== d).map((x) => nom(1, x));
  const text = pick([
    `${qui} partage ${un(t)} en ${d} parts égales. Comment s'appelle une part ?`,
    `${Le(t)} est coupé${t.f ? "e" : ""} en ${d} parts égales. Une part, c'est…`,
    `Le dessin montre ${un(t)} partagé${t.f ? "e" : ""} en parts égales. Comment s'appelle la part coloriée ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: choix(correct, [`un ${NUM[d]}`, ...shuffle(autres).slice(0, 3)]),
    expected: [correct],
    comparator: "mcq_exact",
    canvas: dessin(1, d, t.forme),
    explanation: exp(
      `Quand on partage un tout en ${d} parts égales, chaque part est ${nom(1, d)}.`,
      "On compte les parts égales : leur nombre donne le nom de la part.",
      `${d} parts égales → ${nom(1, d)}, qui s'écrit ${fr(1, d)}.`,
      `Une part, c'est ${correct}.`,
    ),
  };
}

function combienDeParts(): Q {
  const d = pick(DENS);
  const t = tout();
  const { qui, il } = quiPartage();
  const correct = String(d);
  const text = pick([
    `${qui} veut couper ${un(t)} en ${DEN_NOM[d][1]}. En combien de parts égales doit-${il} ${t.f ? "la" : "le"} partager ?`,
    `On partage ${un(t)} en parts égales pour obtenir ${des(d)}. Combien de parts faut-il faire ?`,
    `Pour avoir des parts d'${nom(1, d).replace(/^un /, "")} ${du(t)}, en combien de parts égales faut-il couper ?`.replace("d'un", "d'un").replace("d'demi", "d'un demi").replace(/d'(tiers|quart|cinquième|sixième|huitième|dixième|douzième)/, "d'un $1"),
  ]);
  return {
    text,
    format: "qcm",
    choices: choix(correct, [String(d * 2), String(d + 1), String(d - 1), String(d + 10)]),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      `Le nom de la part dit en combien on a partagé : ${DEN_NOM[d][1]} → ${d} parts.`,
      "On cherche le nombre de parts égales qui donne ce nom.",
      `${nom(1, d)} = ${fr(1, d)} : on partage en ${d}.`,
      `Il faut ${d} parts égales.`,
    ),
  };
}

function combienPourLeTout(d3: boolean): Q {
  const d = pick(DENS);
  const t = tout();
  const { qui, il } = quiPartage();
  const correct = String(d);
  const text = d3
    ? pick([
        `${qui} a coupé ${un(t)} en ${d} parts égales. Combien de parts faut-il pour avoir ${le(t)} ${t.f ? "entière" : "entier"} ?`,
        `Combien de ${DEN_NOM[d][1]} faut-il pour faire ${un(t)} ${t.f ? "entière" : "entier"} ?`,
        `Le dessin montre une part ${du(t)}. Combien de parts comme celle-ci forment ${le(t)} ${t.f ? "entière" : "entier"} ?`,
        `${qui} a ${nom(1, d)} ${du(t)}. Combien de parts pareilles lui faut-il pour avoir tout${t.f ? "e" : ""} ${le(t)} ?`.replace(`${il} `, ""),
      ])
    : `Combien de ${DEN_NOM[d][1]} y a-t-il dans un tout ?`;
  return {
    text,
    format: "qcm",
    choices: choix(correct, [String(d * 2), String(d + 1), String(d - 1), String(d * 3)]),
    expected: [correct],
    comparator: "mcq_exact",
    canvas: dessin(1, d, t.forme),
    explanation: exp(
      `${nom(1, d)} est une des ${d} parts égales du tout.`,
      "On compte combien de parts égales forment le tout.",
      `${d} × ${fr(1, d)} = ${fr(d, d)} = le tout.`,
      `Il faut ${d} parts.`,
    ),
  };
}

function genUnite(d: Etoile): Q {
  if (d <= 1) return tirer([partsEgales, nomDeLaPart]);
  if (d === 2) return tirer([nomDeLaPart, combienDeParts, partsEgales]);
  return tirer([() => combienPourLeTout(true), combienDeParts, nomDeLaPart]);
}

// ============================================================
// ce2_fraction_lire — Lire et écrire une fraction
// ============================================================

function sensDuDenominateur(): Q {
  const d = pick(DENS_SIMPLES);
  const n = rint(1, d - 1);
  const haut = Math.random() < 0.5;
  const t = tout();
  const correct = haut ? `on prend ${n} part${n > 1 ? "s" : ""}` : `le tout est partagé en ${d} parts égales`;
  const text = pick([
    `Dans la fraction ${fr(n, d)}, que veut dire le nombre du ${haut ? "haut" : "bas"}, le ${haut ? n : d} ?`,
    `${maj(quelquun().nom)} a ${fr(n, d)} ${du(t)}. Que dit le ${haut ? n : d} ${haut ? "du haut" : "du bas"} ?`,
    `Dans ${fr(n, d)} ${du(t)}, à quoi sert le ${haut ? n : d} ?`,
  ]);
  const pieges = haut
    ? [`le tout est partagé en ${n} parts égales`, `il reste ${n} part${n > 1 ? "s" : ""}`, `chaque part vaut ${n}`]
    : [`on prend ${d} parts`, `il reste ${d} parts`, `chaque part vaut ${d}`];
  return {
    text,
    format: "qcm",
    choices: choix(correct, pieges),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      "Le nombre du bas dit en combien de parts égales on partage ; celui du haut, combien on en prend.",
      "On lit d'abord le bas (le partage), puis le haut (les parts prises).",
      `${fr(n, d)} : partagé en ${d}, on prend ${n}.`,
      `Le ${haut ? n : d} veut dire : ${correct}.`,
    ),
  };
}

function lireLaFraction(d0?: number): Q {
  const d = d0 ?? pick(DENS);
  const n = rint(1, d);
  const correct = nom(n, d);
  const p = quelquun();
  const text = pick([
    `Comment se lit la fraction ${fr(n, d)} ?`,
    `${p.nom} lit ${fr(n, d)} à voix haute. Que dit-${p.il} ?`,
    `La maîtresse écrit ${fr(n, d)} au tableau. Comment le lit-on ?`,
    `Sur la recette, on lit ${fr(n, d)} de tasse de farine. Comment dit-on ${fr(n, d)} ?`,
  ]);
  const autres = DENS.filter((x) => x !== d && x >= n);
  const pieges = [`${NUM[n]} sur ${NUM[d]}`, d > n ? nom(d - n, d) : nom(1, d), n + 1 <= d ? nom(n + 1, d) : nom(n - 1, d)];
  if (autres.length) pieges.push(nom(n, pick(autres)));
  return {
    text,
    format: "qcm",
    choices: choix(correct, pieges),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      "On lit d'abord le nombre du haut, puis le nom des parts donné par le nombre du bas.",
      `Le bas, ${d}, donne ${DEN_NOM[d][1]} ; le haut, ${n}, dit combien.`,
      `${fr(n, d)} → ${correct}.`,
      `On lit « ${correct} ».`,
    ),
  };
}

function ecrireLaFraction(): Q {
  const d = pick(DENS);
  const n = rint(1, d - 1);
  const correct = fr(n, d);
  const p = quelquun();
  const text = pick([
    `Comment s'écrit « ${nom(n, d)} » en chiffres ?`,
    `${p.nom} entend « ${nom(n, d)} ». Quelle fraction écrit-${p.il} ?`,
    `Le chef cuisinier demande « ${nom(n, d)} » de litre de lait. Quelle fraction est-ce ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: choix(correct, piegesFraction(n, d)),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      "Le nom de la part (quart, tiers…) va en bas, le nombre de parts va en haut.",
      `« ${DEN_NOM[d][1]} » → ${d} en bas ; « ${NUM[n]} » → ${n} en haut.`,
      `${nom(n, d)} = ${correct}.`,
      `On écrit ${correct}.`,
    ),
  };
}

/** Le dessin → la fraction coloriée (ou non coloriée, au ★3). */
function quelleFractionColoriee(d: Etoile, pasColoriee = false): Q {
  const den = d <= 2 ? pick(DENS_SIMPLES) : pick(DENS);
  const n = rint(1, den - 1);
  const t = tout();
  const { part } = action(t);
  const cible = pasColoriee ? den - n : n;
  const correct = fr(cible, den);
  const p = quelquun();
  const quoi = pasColoriee ? (part === "coloriée" ? "n'est PAS coloriée" : `n'est PAS ${part}`) : `est ${part}`;
  const text = pick([
    `Le dessin montre ${un(t)}. Quelle fraction ${du(t)} ${quoi} ?`,
    `${p.nom} regarde ${le(t)} dessiné${t.f ? "e" : ""}. Quelle part ${quoi} ?`,
    `Quelle fraction ${du(t)} ${quoi} sur le dessin ?`,
    `Pic le paille-en-queue a dessiné ${un(t)}. Quelle fraction ${quoi} ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: choix(correct, [fr(n === cible ? den - n : n, den), fr(den, cible), fr(cible, den + 1), fr(cible + 1, den), fr(cible, den - cible || den + 2)].filter((x) => x !== correct)),
    expected: [correct],
    comparator: "mcq_exact",
    canvas: dessin(n, den, t.forme),
    explanation: exp(
      "Le nombre du bas compte toutes les parts égales ; celui du haut, les parts dont on parle.",
      `On compte les parts : ${den} en tout, ${n} colorées${pasColoriee ? `, donc ${den - n} blanches` : ""}.`,
      `${cible} parts sur ${den} : ${correct}.`,
      `La réponse est ${correct}.`,
    ),
  };
}

function leTout(): Q {
  const d = pick(DENS);
  const t = tout();
  const p = quelquun();
  const correct = fr(d, d);
  const text = pick([
    `${p.nom} a mangé toutes les parts ${du(t)}, coupé${t.f ? "e" : ""} en ${d}. Quelle fraction ${du(t)} a-t-${p.il} mangée ?`,
    `Quelle fraction est égale ${t.f ? "à toute la" : "à tout le"} ${t.nom}, partagé${t.f ? "e" : ""} en ${d} ?`,
    `Toutes les parts ${du(t)} sont coloriées. Quelle fraction est coloriée ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: choix(correct, [fr(1, d), fr(d, 1), fr(0, d), fr(d - 1, d)]),
    expected: [correct],
    comparator: "mcq_exact",
    canvas: dessin(d, d, t.forme),
    explanation: exp(
      "Quand on prend toutes les parts, on a le tout.",
      "Le nombre du haut est alors égal au nombre du bas.",
      `${d} parts sur ${d} : ${fr(d, d)}.`,
      `${fr(d, d)} = le tout.`,
    ),
  };
}

function genLire(d: Etoile): Q {
  if (d <= 1) return tirer([sensDuDenominateur, () => lireLaFraction(pick([2, 3, 4])), () => quelleFractionColoriee(1)]);
  if (d === 2) return tirer([() => lireLaFraction(), ecrireLaFraction, () => quelleFractionColoriee(2), sensDuDenominateur]);
  return tirer([() => quelleFractionColoriee(3), () => quelleFractionColoriee(3, true), leTout, ecrireLaFraction]);
}

// ============================================================
// ce2_fraction_representer — Représenter une fraction
// ============================================================

function commentRepresenter(): Q {
  const d = pick(DENS);
  const n = rint(1, d - 1);
  const t = pick(TOUTS.filter((x) => x.forme !== "circle"));
  const correct = `on partage en ${d} parts égales et on colorie ${n} part${n > 1 ? "s" : ""}`;
  const p = quelquun();
  const text = pick([
    `Pour représenter ${fr(n, d)} ${du(t)}, que fait-on ?`,
    `${p.nom} veut colorier ${fr(n, d)} ${du(t)}. Comment doit-${p.il} faire ?`,
    `Comment montrer ${nom(n, d)} ${du(t)} sur un dessin ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: choix(correct, [
      `on partage en ${n} parts égales et on colorie ${d} parts`,
      `on partage en ${n + d} parts égales et on colorie ${n} part${n > 1 ? "s" : ""}`,
      `on partage en ${d} parts, même inégales, et on colorie ${n} part${n > 1 ? "s" : ""}`,
    ]),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      "Le bas dit en combien de parts égales on partage ; le haut, combien on en colorie.",
      `Pour ${fr(n, d)} : ${d} parts égales, puis ${n} coloriée${n > 1 ? "s" : ""}.`,
      `${d} en bas, ${n} en haut.`,
      `On ${correct.replace(/^on /, "")}.`,
    ),
  };
}

function partsAColorier(): Q {
  const d = pick(DENS);
  const n = rint(2, d - 1);
  const t = pick(TOUTS.filter((x) => x.forme !== "circle"));
  const deja = rint(0, n - 1);
  const p = quelquun();
  const reste = n - deja;
  const correct = String(reste);
  const text = deja === 0
    ? pick([
        `${p.nom} doit colorier ${fr(n, d)} de ce${t.f ? "tte" : ""} ${t.nom}. Combien de parts doit-${p.il} colorier ?`,
        `Combien de parts faut-il colorier sur le dessin pour montrer ${fr(n, d)} ?`,
      ])
    : pick([
        `${p.nom} veut colorier ${fr(n, d)} ${du(t)}. ${maj(p.il)} a déjà colorié les parts du dessin. Combien de parts doit-${p.il} encore colorier ?`,
        `Il faut ${fr(n, d)} ${du(t)} en couleur. Le dessin montre ce qui est déjà fait. Combien de parts reste-t-il à colorier ?`,
      ]);
  return {
    text,
    format: "qcm",
    choices: choix(correct, [String(n), String(d), String(d - n), String(reste + 1), String(Math.max(1, reste - 1))]),
    expected: [correct],
    comparator: "mcq_exact",
    canvas: dessin(deja, d, t.forme),
    explanation: exp(
      `${fr(n, d)}, c'est ${n} parts sur ${d}.`,
      "On compte les parts déjà coloriées et on cherche ce qui manque.",
      `${n} − ${deja} = ${reste}.`,
      `Il faut colorier ${reste} part${reste > 1 ? "s" : ""}.`,
    ),
  };
}

function partsInegales(): Q {
  const d = pick([3, 4, 5, 6]);
  const n = rint(1, d - 1);
  const t = tout();
  const p = quelquun();
  const correct = "non, les parts ne sont pas égales";
  const text = pick([
    `${p.nom} veut colorier ${fr(n, d)} ${du(t)}. ${maj(p.il)} coupe en ${d} parts de tailles différentes et en colorie ${n}. A-t-${p.il} représenté ${fr(n, d)} ?`,
    `${p.nom} a coupé ${un(t)} en ${d} morceaux, un gros et des petits. Chaque morceau est-il ${nom(1, d)} ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: choix(correct, ["oui, il y a bien " + d + " parts", "oui, si on compte bien les morceaux", "on ne peut pas savoir"]),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      "Une fraction se fait avec des parts ÉGALES.",
      "On vérifie que toutes les parts ont la même taille.",
      `Des parts inégales ne sont pas des ${DEN_NOM[d][1]}.`,
      "Non : les parts ne sont pas égales.",
    ),
  };
}

function genRepresenter(d: Etoile): Q {
  if (d <= 2) return tirer([commentRepresenter, () => quelleFractionColoriee(2), partsAColorier]);
  if (d === 3) return tirer([partsAColorier, commentRepresenter, () => quelleFractionColoriee(3)]);
  return tirer([partsInegales, partsAColorier, () => quelleFractionColoriee(3, true)]);
}

// ============================================================
// ce2_fraction_egalite — Fractions égales
// ============================================================

const PAIRES = [
  [1, 2, 2, 4], [1, 2, 3, 6], [1, 2, 4, 8], [1, 2, 5, 10], [1, 2, 6, 12],
  [1, 3, 2, 6], [2, 3, 4, 6], [1, 3, 4, 12], [1, 4, 2, 8], [3, 4, 6, 8],
  [1, 4, 3, 12], [1, 5, 2, 10], [2, 5, 4, 10], [3, 5, 6, 10], [1, 6, 2, 12],
  [5, 6, 10, 12], [2, 4, 4, 8], [3, 6, 6, 12], [3, 4, 9, 12], [2, 3, 8, 12],
] as const;

function memeSurface(): Q {
  const [a, b, c, e] = pick(PAIRES);
  const correct = fr(c, e);
  const p = quelquun();
  const text = avec(pick([
    `Les bandes A et B sont pareilles, et leurs parties coloriées aussi. La bande A montre ${fr(a, b)}. Quelle fraction montre la bande B ?`,
    `${p.nom} colorie ${fr(a, b)} de la bande A. Sur la bande B, ${p.il} colorie autant. Quelle fraction de la bande B est coloriée ?`,
    `Regarde les deux bandes : elles ont la même partie coloriée. A = ${fr(a, b)}. Et B ?`,
  ]));
  return {
    text,
    format: "qcm",
    choices: choix(correct, [fr(c, b), fr(a, e), fr(e, c), fr(c + 1, e), fr(c - 1 || 1, e)]),
    expected: [correct],
    comparator: "mcq_exact",
    canvas: deuxBandes([a, b], [c, e]),
    explanation: exp(
      "Deux fractions sont égales quand elles couvrent la même partie du même tout.",
      "On compte les parts de la bande B : combien en tout, combien de coloriées.",
      `B est partagée en ${e}, ${c} parts sont coloriées : ${fr(a, b)} = ${correct}.`,
      `La bande B montre ${correct}.`,
    ),
  };
}

function laquelleEgale(): Q {
  const [a, b, c, e] = pick(PAIRES);
  const correct = fr(c, e);
  const p = quelquun();
  const t = tout();
  const text = avec(pick([
    `Quelle fraction est égale à ${fr(a, b)} ?`,
    `${p.nom} a ${fr(a, b)} ${du(t)}. Quelle fraction est la même quantité ?`,
    `Pic dit : « ${fr(a, b)}, c'est pareil que… ». Que doit-il dire ?`,
    `Laquelle de ces fractions vaut ${nom(a, b)} ?`,
  ]));
  return {
    text,
    format: "qcm",
    choices: choix(correct, [fr(a + 1, e), fr(c, b + e > 12 ? e - 1 : b + e), fr(b, a), fr(a, e), fr(c + 1, e)].filter((x) => x !== correct && !x.startsWith("0"))),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      "Deux fractions sont égales quand elles représentent la même part du tout.",
      `On partage chaque part en ${e / b} : on a ${e / b} fois plus de parts, ${e / b} fois plus petites.`,
      `${fr(a, b)} = ${fr(a * (e / b), b * (e / b))}.`,
      `${fr(a, b)} = ${correct}.`,
    ),
  };
}

function trouEgalite(): Q {
  const [a, b, c, e] = pick(PAIRES);
  const enHaut = Math.random() < 0.7;
  const correct = String(enHaut ? c : e);
  const p = quelquun();
  const ecrit = enHaut ? `${fr(a, b)} = …/${e}` : `${fr(a, b)} = ${c}/…`;
  const text = avec(pick([
    `Complète : ${ecrit}`,
    `Quel nombre manque ? ${ecrit}`,
    `${p.nom} a effacé un nombre : ${ecrit}. Lequel ?`,
  ]));
  return {
    text,
    format: "qcm",
    choices: choix(correct, enHaut ? [String(a), String(c + 1), String(e - c), String(b), String(c * 2)] : [String(b), String(e + 1), String(e * 2), String(c + b)]),
    expected: [correct],
    comparator: "mcq_exact",
    canvas: Math.random() < 0.5 ? deuxBandes([a, b], [c, e]) : undefined,
    explanation: exp(
      "Pour garder une fraction égale, on multiplie le haut ET le bas par le même nombre.",
      `De ${b} à ${e}, on multiplie par ${e / b}.`,
      `${a} × ${e / b} = ${c} et ${b} × ${e / b} = ${e}.`,
      `${fr(a, b)} = ${fr(c, e)} : il manque ${correct}.`,
    ),
  };
}

function piegeGrandNombre(): Q {
  const [x, y] = shuffle([2, 3, 4, 5, 6, 8, 10]).slice(0, 2).sort((m, n) => m - n);
  const p = quelquun();
  const correct = "non";
  return {
    text: pick([
      `${p.nom} dit : « ${fr(1, y)} est plus grand que ${fr(1, x)}, parce que ${y} est plus grand que ${x} ». A-t-${p.il} raison ?`,
      `Est-ce que ${fr(1, y)} est plus grand que ${fr(1, x)} parce que ${y} > ${x} ?`,
    ]),
    format: "qcm",
    choices: shuffle(["oui", "non", "on ne peut pas savoir"]),
    expected: [correct],
    comparator: "mcq_exact",
    canvas: deuxBandes([1, x], [1, y]),
    explanation: exp(
      "Plus on partage en beaucoup de parts, plus chaque part est petite.",
      "On compare la taille des parts, pas les nombres du bas.",
      `Une part sur ${y} est plus petite qu'une part sur ${x} : ${fr(1, y)} < ${fr(1, x)}.`,
      "Non, c'est le contraire.",
    ),
  };
}

function combienDansUn(): Q {
  const [a, b, c, e] = pick(PAIRES.filter((q) => q[0] === 1));
  const t = tout();
  const correct = String(c);
  const p = quelquun();
  const text = pick([
    `Combien de ${DEN_NOM[e][1]} faut-il pour faire ${nom(1, b)} ?`,
    `${p.nom} a ${nom(1, b)} ${du(t)}. Combien de parts d'${DEN_NOM[e][0].match(/^[aeiou]/) ? "" : ""}un ${DEN_NOM[e][0]} cela fait-il ?`.replace("d'un", "d'un"),
    `Dans ${nom(1, b)}, combien y a-t-il de ${DEN_NOM[e][1]} ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: choix(correct, [String(e), String(c + 1), String(b), String(e - b)]),
    expected: [correct],
    comparator: "mcq_exact",
    canvas: deuxBandes([a, b], [c, e]),
    explanation: exp(
      "Une part peut être découpée en parts plus petites, toutes égales.",
      `On découpe chaque ${DEN_NOM[b][0]} en ${e / b}.`,
      `${fr(1, b)} = ${fr(c, e)}.`,
      `Il faut ${correct} ${DEN_NOM[e][1]}.`,
    ),
  };
}

function genEgalite(d: Etoile): Q {
  if (d <= 2) return tirer([memeSurface, memeSurface, laquelleEgale]);
  if (d === 3) return tirer([memeSurface, laquelleEgale, trouEgalite, combienDansUn]);
  return tirer([trouEgalite, piegeGrandNombre, combienDansUn, laquelleEgale]);
}

// ============================================================
// ce2_fraction_add_sous — Additionner et soustraire
// ============================================================

function additionNue(d: Etoile): Q {
  const den = pick(d <= 2 ? [4, 5, 6, 8, 10] : DENS);
  const a = rint(1, den - 2);
  const b = rint(1, den - a);
  const moins = d >= 3 && Math.random() < 0.5;
  const [x, y] = moins ? [a + b, b] : [a, b];
  const r = moins ? a : a + b;
  const correct = fr(r, den);
  const p = quelquun();
  const op = `${fr(x, den)} ${moins ? "−" : "+"} ${fr(y, den)}`;
  const text = avec(pick([`Combien font ${op} ?`, `Calcule : ${op} = …`, `${p.nom} calcule ${op}. Que trouve-t-${p.il} ?`, `Quel est le résultat de ${op} ?`]));
  return {
    text,
    format: "qcm",
    choices: choix(correct, [moins ? fr(r, 0 || den - den) : fr(x + y, den * 2), fr(r + 1, den), fr(Math.max(1, r - 1), den), moins ? fr(x + y, den) : fr(x + y, den + den), fr(r, den * 2)].filter((s) => !/\/0$/.test(s))),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      "Quand le partage est le même, on ajoute (ou on enlève) les parts, et le nombre du bas ne change pas.",
      "On calcule avec les nombres du haut et on garde le nombre du bas.",
      `${x} ${moins ? "−" : "+"} ${y} = ${r}, et on garde ${den}.`,
      `${op} = ${correct}.`,
    ),
  };
}

function additionHistoire(d: Etoile): Q {
  const t = tout();
  const den = pick(d <= 2 ? [4, 5, 6, 8] : DENS);
  const a = rint(1, den - 2);
  const b = rint(1, den - a);
  const [p, q] = deuxPersonnes();
  const { verbe, part } = action(t);
  const r = a + b;
  const correct = r === den ? `${fr(r, den)}, c'est-à-dire tout${t.f ? "e" : ""} ${le(t)}` : fr(r, den);
  const text = pick([
    `${maj(un(t))} est partagé${t.f ? "e" : ""} en ${den} parts égales. ${p.nom} en a ${verbe} ${fr(a, den)} et ${q.nom} ${fr(b, den)}. Quelle part ${du(t)} ont-ils ${part} à eux deux ?`,
    `${p.nom} a ${verbe} ${fr(a, den)} ${du(t)}, puis encore ${fr(b, den)}. Quelle part ${du(t)} a-t-${p.il} ${part} en tout ?`,
    `Le dessin montre ce que ${p.nom} a ${verbe}. ${q.nom} en ${verbe === "colorié" ? "colorie" : "prend"} encore ${fr(b, den)}. Quelle part ${du(t)} est ${verbe}${t.f ? "e" : ""} maintenant ?`,
  ]).replace(/ont-ils/, p.il === "elle" && q.il === "elle" ? "ont-elles" : "ont-ils");
  return {
    text,
    format: "qcm",
    choices: choix(correct, [fr(r, den * 2), fr(r + 1, den), fr(Math.max(1, r - 1), den), fr(a * b, den)].filter((x) => x !== fr(r, den))),
    expected: [correct],
    comparator: "mcq_exact",
    canvas: dessin(a, den, t.forme),
    explanation: exp(
      "Les parts ont toutes la même taille : on peut les compter ensemble.",
      "On ajoute les parts, et le nombre du bas (le partage) ne change pas.",
      `${fr(a, den)} + ${fr(b, den)} = ${fr(r, den)}.`,
      `En tout : ${correct}.`,
    ),
  };
}

function ceQuiReste(d: Etoile): Q {
  const t = tout();
  const den = pick(d <= 3 ? [4, 5, 6, 8, 10] : DENS);
  const deuxParts = d >= 4 && Math.random() < 0.5;
  const a = rint(1, den - (deuxParts ? 3 : 2));
  const b = deuxParts ? rint(1, den - a - 1) : 0;
  const reste = den - a - b;
  const [p, q] = deuxPersonnes();
  const { verbe, part } = action(t);
  const correct = fr(reste, den);
  const text = deuxParts
    ? `${maj(un(t))} est partagé${t.f ? "e" : ""} en ${den} parts égales. ${p.nom} en a ${verbe} ${fr(a, den)} et ${q.nom} ${fr(b, den)}. Quelle part ${du(t)} reste-t-il ?`
    : pick([
        `${maj(un(t))} est coupé${t.f ? "e" : ""} en ${den} parts égales. On en a ${verbe} ${fr(a, den)}. Quelle part reste-t-il ?`,
        `${p.nom} a ${verbe} ${fr(a, den)} ${du(t)}. Quelle fraction ${du(t)} reste-t-il ?`,
        `Le dessin montre la part ${part} ${du(t)}. Quelle fraction reste-t-il ?`,
      ]);
  return {
    text,
    format: "qcm",
    choices: choix(correct, [fr(a + b, den), fr(reste, den * 2), fr(reste + 1, den), fr(Math.max(1, reste - 1), den), fr(den, reste)].filter((x) => x !== correct)),
    expected: [correct],
    comparator: "mcq_exact",
    ...(deuxParts ? {} : { canvas: dessin(a, den, t.forme) }),
    explanation: exp(
      `Le tout, c'est ${fr(den, den)}.`,
      "On enlève au tout ce qui est parti.",
      `${fr(den, den)} − ${deuxParts ? `${fr(a, den)} − ${fr(b, den)}` : fr(a, den)} = ${correct}.`,
      `Il reste ${correct}.`,
    ),
  };
}

function quePourLeTout(): Q {
  const den = pick(DENS);
  const a = rint(1, den - 1);
  const correct = fr(den - a, den);
  const p = quelquun();
  const t = tout();
  const text = avec(pick([
    `Quelle fraction faut-il ajouter à ${fr(a, den)} pour obtenir le tout ?`,
    `${p.nom} a déjà ${fr(a, den)} ${du(t)}. Quelle fraction lui manque-t-il pour l'avoir en entier ?`,
    `Complète : ${fr(a, den)} + … = ${fr(den, den)}`,
  ]));
  return {
    text,
    format: "qcm",
    choices: choix(correct, [fr(a, den), fr(den - a, den * 2), fr(den - a + 1, den), fr(den, a), fr(Math.max(1, den - a - 1), den)].filter((x) => x !== correct)),
    expected: [correct],
    comparator: "mcq_exact",
    canvas: dessin(a, den, t.forme),
    explanation: exp(
      `Le tout, c'est ${fr(den, den)}.`,
      "On cherche combien de parts manquent pour arriver à toutes les parts.",
      `${den} − ${a} = ${den - a}.`,
      `Il faut ajouter ${correct}.`,
    ),
  };
}

function nombresDuBas(): Q {
  const den = pick(DENS);
  const a = rint(1, den - 2);
  const b = rint(1, den - a);
  const correct = `on garde ${den} : le partage ne change pas`;
  const p = quelquun();
  return {
    text: pick([
      `Pour calculer ${fr(a, den)} + ${fr(b, den)}, que fait-on des nombres du bas ?`,
      `${p.nom} additionne ${fr(a, den)} et ${fr(b, den)}. Que devient le ${den} du bas ?`,
    ]),
    format: "qcm",
    choices: choix(correct, [`on les additionne : ${den * 2}`, `on les multiplie : ${den * den}`, "on les enlève"]),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      "Le nombre du bas dit en combien de parts on a partagé.",
      "Ajouter des parts ne change pas leur taille : le partage reste le même.",
      `${fr(a, den)} + ${fr(b, den)} = ${fr(a + b, den)}.`,
      `On garde ${den}.`,
    ),
  };
}

/** 1/2 + 1/4 : un dénominateur MULTIPLE de l'autre (au programme du CE2). */
const MULTIPLES = [[2, 4], [2, 6], [2, 8], [2, 10], [2, 12], [3, 6], [3, 12], [4, 8], [4, 12], [5, 10], [6, 12]] as const;

function partagesMultiples(): Q {
  const [d1, d2] = pick(MULTIPLES);
  const k = d2 / d1;
  const a = rint(1, d1 - 1);
  const maxB = d2 - a * k;
  if (maxB < 1) return partagesMultiples();
  const b = rint(1, Math.min(maxB, d2 - 1));
  const moins = Math.random() < 0.35 && a * k > b;
  const r = moins ? a * k - b : a * k + b;
  const op = `${fr(a, d1)} ${moins ? "−" : "+"} ${fr(b, d2)}`;
  const correct = fr(r, d2);
  const p = quelquun();
  const t = tout();
  const text = avec(pick([
    `Combien font ${op} ?`,
    `Calcule : ${op} = …`,
    moins
      ? `${p.nom} avait ${fr(a, d1)} ${du(t)}. ${maj(p.il)} en donne ${fr(b, d2)}. Quelle part lui reste-t-il ?`
      : `${p.nom} a ${fr(a, d1)} ${du(t)} et reçoit encore ${fr(b, d2)}. Quelle part a-t-${p.il} en tout ?`,
  ]));
  return {
    text,
    format: "qcm",
    choices: choix(correct, [fr(moins ? Math.abs(a - b) || 1 : a + b, moins ? d2 : d1 + d2), fr(moins ? Math.abs(a - b) || 1 : a + b, d2), fr(r + 1, d2), fr(r, d1)].filter((x) => x !== correct && !/^0/.test(x))),
    expected: [correct],
    comparator: "mcq_exact",
    canvas: deuxBandes([a, d1], [a * k, d2]),
    explanation: exp(
      "Pour ajouter des parts, il faut qu'elles aient la même taille.",
      `On change ${fr(a, d1)} en ${DEN_NOM[d2][1]} : chaque ${DEN_NOM[d1][0]} vaut ${k} ${DEN_NOM[d2][1]} (les bandes A et B).`,
      `${fr(a, d1)} = ${fr(a * k, d2)} ; ${fr(a * k, d2)} ${moins ? "−" : "+"} ${fr(b, d2)} = ${correct}.`,
      `${op} = ${correct}.`,
    ),
  };
}

function genAddSous(d: Etoile): Q {
  if (d <= 2) return tirer([() => additionNue(2), () => additionHistoire(2)]);
  if (d === 3) return tirer([() => additionNue(3), () => additionHistoire(3), () => ceQuiReste(3), nombresDuBas]);
  if (d === 4) return tirer([quePourLeTout, () => ceQuiReste(4), partagesMultiples, () => additionHistoire(4)]);
  return tirer([partagesMultiples, partagesMultiples, () => ceQuiReste(5), quePourLeTout]);
}

// ============================================================
// ce2_fraction_bande_unite — Mesurer avec une bande unité
// ============================================================

const SEGMENTS = ["un segment", "un ruban", "un crayon", "une ficelle", "un bâton", "une chenille en papier", "une paille", "une baguette magique"] as const;

function longueurSegment(d: Etoile): Q {
  const den = pick(d <= 2 ? [2, 3, 4, 5, 6] : DENS);
  const n = rint(1, den - 1);
  const s = pick(SEGMENTS);
  const p = quelquun();
  const correct = `${fr(n, den)} d'unité`;
  const text = pick([
    `La bande unité est partagée en ${den} parts égales. ${maj(s)} couvre la partie coloriée. Quelle est sa longueur ?`,
    `${p.nom} pose ${s} contre la bande unité dessinée. ${maj(s)} va jusqu'au bout de la partie coloriée. Combien mesure-t-${s.startsWith("une ") ? "elle" : "il"} ?`,
    `Avec la bande unité, ${p.nom} trouve que ${s.replace(/^un/, "qu'un").replace(/^qu'un /, "qu'un ").replace(/^qu'une/, "qu'une")} mesure autant que la partie coloriée. Quelle est cette longueur ?`.replace("trouve que qu'", "trouve qu'"),
  ]);
  return {
    text,
    format: "qcm",
    choices: choix(correct, [`${fr(den, n)} d'unité`, `${n} unités`, `${fr(n, den + 1)} d'unité`, `${fr(den - n, den)} d'unité`].filter((x) => x !== correct)),
    expected: [correct],
    comparator: "mcq_exact",
    canvas: dessin(n, den, "bar"),
    explanation: exp(
      "La bande unité vaut 1. Partagée en parts égales, chaque part est une fraction de l'unité.",
      "On compte les parts de la bande (le bas), puis les parts couvertes (le haut).",
      `${n} parts sur ${den} : ${fr(n, den)}.`,
      `La longueur est ${correct}.`,
    ),
  };
}

function enCombienPartagee(): Q {
  const den = pick(DENS);
  const n = rint(1, den - 1);
  const s = pick(SEGMENTS);
  const correct = String(den);
  const p = quelquun();
  const text = pick([
    `${maj(s)} mesure ${fr(n, den)} d'unité. En combien de parts égales la bande unité a-t-elle été partagée ?`,
    `${p.nom} dit : « ${s} mesure ${nom(n, den)} de la bande unité ». En combien de parts la bande est-elle coupée ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: choix(correct, [String(n), String(den + n), String(den * 2), String(den - n || den + 1)]),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      "Le nombre du bas dit en combien de parts égales on a partagé la bande unité.",
      `Dans ${fr(n, den)}, on lit le bas.`,
      `${fr(n, den)} → ${den} parts.`,
      `La bande est partagée en ${den}.`,
    ),
  };
}

function deuxBandesMemeLongueur(): Q {
  const [a, b, c, e] = pick(PAIRES);
  const [p, q] = deuxPersonnes();
  const s = pick(SEGMENTS);
  const correct = "les deux : c'est la même longueur";
  return {
    text: `${p.nom} mesure ${s} avec une bande partagée en ${b} : ${fr(a, b)}. ${q.nom} mesure le même avec une bande partagée en ${e} : ${fr(c, e)}. Qui a raison ?`.replace("le même", /^une /.test(s) ? "la même" : "le même"),
    format: "qcm",
    choices: choix(correct, [`${p.nom} seulement`, `${q.nom} seulement`, "aucun des deux"]),
    expected: [correct],
    comparator: "mcq_exact",
    canvas: deuxBandes([a, b], [c, e]),
    explanation: exp(
      "Deux fractions égales donnent la même longueur.",
      "On compare les parties coloriées des deux bandes.",
      `${fr(a, b)} = ${fr(c, e)}.`,
      "Les deux ont raison.",
    ),
  };
}

function genBandeUnite(d: Etoile): Q {
  if (d <= 2) return tirer([() => longueurSegment(2), enCombienPartagee]);
  if (d === 3) return tirer([() => longueurSegment(3), enCombienPartagee, () => longueurSegment(3)]);
  return tirer([deuxBandesMemeLongueur, () => longueurSegment(4), enCombienPartagee]);
}

// ============================================================
// ce2_fraction_droite — Placer une fraction sur la droite graduée
// ============================================================

function lireSurLaDroite(d: Etoile): Q {
  const den = pick(d <= 2 ? [2, 3, 4, 5] : DENS);
  const n = rint(1, den - 1);
  const correct = fr(n, den);
  const p = quelquun();
  const text = avec(pick([
    "Quelle fraction est marquée par le point rouge ?",
    `${p.nom} a posé un jeton sur la droite. Quelle fraction montre-t-${p.il} ?`,
    "Pic le paille-en-queue s'est posé sur le point rouge. Sur quelle fraction ?",
    "La coccinelle s'arrête au point rouge. Quelle fraction est-ce ?",
    "Quelle fraction se cache sous le « ? » ?",
  ]));
  return {
    text,
    format: "qcm",
    choices: choix(correct, [fr(den, n), fr(n + 1, den), fr(Math.max(1, n - 1), den), fr(n, den + 1), fr(n, den * 2 > 12 ? den - 1 : den * 2)].filter((x) => x !== correct)),
    expected: [correct],
    comparator: "mcq_exact",
    canvas: droite01(den, [{ value: n / den, label: "?", color: "#ef4444" }]),
    explanation: exp(
      "Entre 0 et 1, la droite est partagée en parts égales : chaque part est une fraction de l'unité.",
      "On compte les parts entre 0 et 1 (le bas), puis les parts de 0 jusqu'au point (le haut).",
      `${den} parts entre 0 et 1, le point est à ${n} part${n > 1 ? "s" : ""} de 0.`,
      `Le point montre ${correct}.`,
    ),
  };
}

function quelleLettre(): Q {
  const den = pick([4, 5, 6, 8, 10]);
  const ks = shuffle(Array.from({ length: den - 1 }, (_, i) => i + 1)).slice(0, 3);
  const lettres = ["A", "B", "C"];
  const cible = rint(0, 2);
  const p = quelquun();
  const text = avec(pick([
    `Quelle lettre est placée sur ${fr(ks[cible], den)} ?`,
    `${p.nom} cherche ${fr(ks[cible], den)} sur la droite. Quelle lettre doit-${p.il} montrer ?`,
    `Le trésor est caché à ${fr(ks[cible], den)}. Quelle lettre marque le trésor ?`,
  ]));
  return {
    text,
    format: "qcm",
    choices: [...lettres],
    expected: [lettres[cible]],
    comparator: "mcq_exact",
    canvas: droite01(den, ks.map((k, i) => ({ value: k / den, label: lettres[i], color: ["#ef4444", "#2563eb", "#16a34a"][i] }))),
    explanation: exp(
      "Entre 0 et 1, chaque petit trait avance d'une même fraction.",
      `La droite est partagée en ${den} : on compte ${ks[cible]} traits depuis 0.`,
      `${fr(ks[cible], den)} : ${ks[cible]} parts sur ${den}.`,
      `C'est la lettre ${lettres[cible]}.`,
    ),
  };
}

function ouEstLeDemi(): Q {
  const cas = pick([
    { f: "1/2", rep: "exactement au milieu, entre 0 et 1" },
    { f: "1/4", rep: "au milieu entre 0 et 1/2" },
    { f: "3/4", rep: "au milieu entre 1/2 et 1" },
    { f: "4/4", rep: "sur le 1" },
  ]);
  const p = quelquun();
  const pieges = ["exactement au milieu, entre 0 et 1", "au milieu entre 0 et 1/2", "au milieu entre 1/2 et 1", "sur le 1", "après le 1"].filter((x) => x !== cas.rep);
  return {
    text: pick([
      `Sur une droite graduée de 0 à 1, où se place ${cas.f} ?`,
      `${p.nom} doit placer ${cas.f} entre 0 et 1. Où le met-${p.il} ?`,
    ]),
    format: "qcm",
    choices: choix(cas.rep, pieges),
    expected: [cas.rep],
    comparator: "mcq_exact",
    canvas: droite01(4, []),
    explanation: exp(
      "Entre 0 et 1, on partage en parts égales.",
      "1/2 coupe le segment en deux ; 1/4 et 3/4 coupent chaque moitié en deux.",
      `${cas.f} : ${cas.rep}.`,
      `${cas.f} se place ${cas.rep}.`,
    ),
  };
}

function avantApres(): Q {
  const den = pick([4, 6, 8, 10]);
  const a = rint(1, den - 2);
  const b = rint(a + 1, den - 1);
  const p = quelquun();
  const correct = "non";
  return {
    text: pick([
      `Sur une droite graduée de 0 à 1, ${p.nom} place ${fr(b, den)} avant ${fr(a, den)}. A-t-${p.il} raison ?`,
      `Entre 0 et 1, ${fr(b, den)} est-il plus près de 0 que ${fr(a, den)} ?`,
    ]),
    format: "qcm",
    choices: shuffle(["oui", "non", "on ne peut pas savoir"]),
    expected: [correct],
    comparator: "mcq_exact",
    canvas: droite01(den, []),
    explanation: exp(
      "Sur la droite, plus on prend de parts, plus on s'éloigne de 0.",
      "Avec le même partage, on compare les nombres du haut.",
      `${b} parts > ${a} parts : ${fr(b, den)} est après ${fr(a, den)}.`,
      `Non : ${fr(a, den)} vient avant ${fr(b, den)}.`,
    ),
  };
}

function enCombienPourPlacer(): Q {
  const den = pick(DENS);
  const correct = String(den);
  const p = quelquun();
  return {
    text: pick([
      `Pour placer ${des(den)} sur une droite graduée, en combien de parts égales faut-il partager le segment de 0 à 1 ?`,
      `${p.nom} veut placer ${fr(rint(1, den - 1), den)} sur la droite. En combien de parts égales doit-${p.il} couper le segment de 0 à 1 ?`,
    ]),
    format: "qcm",
    choices: choix(correct, [String(den * 2), String(den + 1), String(den - 1), String(Math.max(2, den / 2))]),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      "Le nombre du bas donne le partage du segment de 0 à 1.",
      `Pour ${des(den)}, on partage en ${den}.`,
      `${den} parts égales entre 0 et 1.`,
      `Il faut ${den} parts.`,
    ),
  };
}

function genDroite(d: Etoile): Q {
  if (d <= 2) return tirer([() => lireSurLaDroite(2), ouEstLeDemi]);
  if (d === 3) return tirer([() => lireSurLaDroite(3), quelleLettre, enCombienPourPlacer]);
  return tirer([avantApres, quelleLettre, () => lireSurLaDroite(4)]);
}

// ============================================================
// ce2_fraction_comparer — Comparer deux fractions
// ============================================================

function comparerQuestion(a: [number, number], b: [number, number], avecDessin: boolean): Q {
  const va = a[0] / a[1];
  const vb = b[0] / b[1];
  const plus = Math.random() < 0.6;
  const correct = va === vb ? "elles sont égales" : (plus ? va > vb : va < vb) ? fr(...a) : fr(...b);
  const p = quelquun();
  const t = tout();
  const [q] = deuxPersonnes().filter((x) => x.nom !== p.nom);
  const text = avec(pick([
    `Laquelle est la plus ${plus ? "grande" : "petite"} : ${fr(...a)} ou ${fr(...b)} ?`,
    `${p.nom} mange ${fr(...a)} ${du(t)}, ${q.nom} ${fr(...b)} ${t.f ? "d'une autre, pareille" : "d'un autre, pareil"}. Quelle part est la plus ${plus ? "grosse" : "petite"} ?`,
    `Quelle fraction est la plus ${plus ? "grande" : "petite"}, ${fr(...a)} ou ${fr(...b)} ?`,
    `Pic hésite entre ${fr(...a)} et ${fr(...b)} ${du(t)}. Laquelle est la plus ${plus ? "grosse" : "petite"} part ?`,
  ]));
  return {
    text,
    format: "qcm",
    choices: shuffle([fr(...a), fr(...b), "elles sont égales"]),
    expected: [correct],
    comparator: "mcq_exact",
    ...(avecDessin ? { canvas: deuxBandes(a, b) } : {}),
    explanation: exp(
      a[1] === b[1]
        ? "Avec le même partage, la plus grande fraction est celle qui prend le plus de parts."
        : a[0] === b[0]
          ? "Avec le même nombre de parts prises, plus le partage est grand, plus les parts sont petites."
          : "On écrit les deux fractions avec le même partage, puis on compare les parts.",
      avecDessin ? "On compare les parties coloriées des bandes A et B." : "On regarde le nombre du bas et le nombre du haut.",
      `${fr(...a)} ${va > vb ? ">" : va < vb ? "<" : "="} ${fr(...b)}.`,
      `La réponse est ${correct}.`,
    ),
  };
}

function memeDenominateur(dessiner: boolean): Q {
  const den = pick(DENS);
  const [x, y] = shuffle(Array.from({ length: den }, (_, i) => i + 1)).slice(0, 2);
  return comparerQuestion([x, den], [y, den], dessiner);
}

function memeNumerateur(): Q {
  const [d1, d2] = shuffle([3, 4, 5, 6, 8, 10, 12]).slice(0, 2);
  const n = rint(1, Math.min(d1, d2) - 1);
  return comparerQuestion([n, d1], [n, d2], Math.random() < 0.3);
}

function pourquoiPlusPetit(): Q {
  const [x, y] = shuffle([3, 4, 5, 6, 8, 10]).slice(0, 2).sort((m, n) => m - n);
  const correct = `parce qu'en partageant en ${y}, les parts sont plus petites qu'en partageant en ${x}`;
  const p = quelquun();
  return {
    text: pick([
      `Pourquoi ${fr(1, y)} est-il plus petit que ${fr(1, x)}, alors que ${y} est plus grand que ${x} ?`,
      `${p.nom} s'étonne : ${fr(1, y)} < ${fr(1, x)}, pourtant ${y} > ${x}. Pourquoi ?`,
    ]),
    format: "qcm",
    choices: choix(correct, [`ce n'est pas vrai : ${fr(1, y)} est plus grand que ${fr(1, x)}`, `parce que ${y} est un nombre ${y % 2 ? "impair" : "pair"}`, "parce qu'on prend une seule part des deux côtés"]),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      "Plus on partage un tout en beaucoup de parts, plus chaque part est petite.",
      "On compare la TAILLE des parts.",
      `Une part sur ${y} < une part sur ${x}.`,
      `${fr(1, y)} < ${fr(1, x)}.`,
    ),
  };
}

function partagesDifferents(): Q {
  const [d1, d2] = pick(MULTIPLES);
  const k = d2 / d1;
  const a = rint(1, d1 - 1);
  let b = rint(1, d2 - 1);
  if (Math.random() < 0.2) b = a * k;
  return comparerQuestion([a, d1], [b, d2], false);
}

function genComparer(d: Etoile): Q {
  if (d <= 2) return tirer([() => memeDenominateur(true), () => memeDenominateur(false)]);
  if (d <= 4) return tirer([memeNumerateur, pourquoiPlusPetit, memeNumerateur, () => memeDenominateur(false)]);
  return tirer([partagesDifferents, partagesDifferents, memeNumerateur]);
}

// ============================================================
// ce2_fraction_comparer_unite — Comparer une fraction à 1
// ============================================================

function egaleAuTout(): Q {
  const den = pick(DENS);
  const n = Math.random() < 0.4 ? den : rint(1, den - 1);
  const correct = n === den ? "égale au tout" : "plus petite que le tout";
  const p = quelquun();
  const t = tout();
  const text = avec(pick([
    `La fraction ${fr(n, den)} est-elle égale au tout, ou plus petite que le tout ?`,
    `${p.nom} a ${fr(n, den)} ${du(t)}. A-t-${p.il} ${le(t)} ${t.f ? "entière" : "entier"} ?`,
    `Regarde le dessin : ${fr(n, den)} ${du(t)} est colorié. Est-ce ${t.f ? "toute" : "tout"} ${le(t)} ?`,
  ]));
  const ouiNon = text.includes("A-t-") || text.includes("Est-ce to");
  const c = ouiNon ? (n === den ? "oui" : "non") : correct;
  return {
    text,
    format: "qcm",
    choices: ouiNon ? shuffle(["oui", "non", "on ne peut pas savoir"]) : shuffle(["égale au tout", "plus petite que le tout", "plus grande que le tout"]),
    expected: [c],
    comparator: "mcq_exact",
    canvas: dessin(n, den, t.forme),
    explanation: exp(
      "Une fraction est égale au tout quand le nombre du haut est égal à celui du bas.",
      "On compare le nombre de parts prises au nombre de parts du partage.",
      n === den ? `${n} parts sur ${den} : toutes les parts.` : `${n} parts sur ${den} : il en manque ${den - n}.`,
      n === den ? `${fr(n, den)} est égale au tout.` : `${fr(n, den)} est plus petite que le tout.`,
    ),
  };
}

function quandEgaleA1(): Q {
  const p = quelquun();
  const correct = "quand le nombre du haut est égal à celui du bas";
  return {
    text: pick([
      "Quand une fraction est-elle égale au tout ?",
      `${p.nom} cherche une règle : quand une fraction vaut-elle le tout entier ?`,
      "Comment reconnaître une fraction qui vaut 1 ?",
    ]),
    format: "qcm",
    choices: choix(correct, ["quand le nombre du haut est 1", "quand le nombre du bas est 1", "quand les deux nombres sont pairs"]),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      "Le tout, c'est toutes les parts du partage.",
      "Si on prend autant de parts qu'il y en a, on a le tout.",
      "4/4, 6/6, 10/10 valent 1.",
      `Une fraction vaut 1 ${correct}.`,
    ),
  };
}

function combienPourCompleter(): Q {
  const den = pick(DENS);
  const n = rint(1, den - 1);
  const t = pick(TOUTS.filter((x) => x.forme !== "circle"));
  const correct = String(den - n);
  const p = quelquun();
  const text = pick([
    `On a colorié ${fr(n, den)} ${du(t)}. Combien de parts reste-t-il à colorier pour l'avoir en entier ?`,
    `${p.nom} a colorié la partie dessinée ${du(t)}. Combien de parts lui manque-t-il pour tout colorier ?`,
    `Pour arriver au tout, combien de ${DEN_NOM[den][1]} faut-il ajouter à ${fr(n, den)} ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: choix(correct, [String(n), String(den), String(den + n), String(den - n + 1)]),
    expected: [correct],
    comparator: "mcq_exact",
    canvas: dessin(n, den, t.forme),
    explanation: exp(
      `Le tout, c'est ${den} parts sur ${den}.`,
      "On enlève les parts déjà coloriées au nombre total de parts.",
      `${den} − ${n} = ${den - n}.`,
      `Il reste ${den - n} part${den - n > 1 ? "s" : ""}.`,
    ),
  };
}

function enResteTIl(): Q {
  const den = pick(DENS);
  const n = rint(den - 3 > 0 ? den - 3 : 1, den);
  const t = tout();
  const { verbe } = action(t);
  const [p, q] = deuxPersonnes();
  const correct = n === den ? `non, ${le(t)} est fini${t.f ? "e" : ""}` : `oui, il reste ${fr(den - n, den)}`;
  const text = pick([
    `À la fête de l'école, on a ${verbe} ${fr(n, den)} ${du(t)}. En reste-t-il ?`,
    `${p.nom} et ${q.nom} ont ${verbe} ${fr(n, den)} ${du(t)}. Reste-t-il une part ?`,
    `Pic a picoré ${fr(n, den)} ${du(t)}. En reste-t-il pour les autres ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: choix(correct, [n === den ? `oui, il reste ${fr(1, den)}` : `non, ${le(t)} est fini${t.f ? "e" : ""}`, `oui, il reste ${fr(n, den)}`, "on ne peut pas savoir"].filter((x) => x !== correct)),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      "Le tout entier, c'est quand le nombre du haut est égal au nombre du bas.",
      `On compare ${n} à ${den}.`,
      n === den ? `${fr(n, den)} = le tout.` : `${fr(n, den)} < ${fr(den, den)} : il manque ${fr(den - n, den)}.`,
      `Réponse : ${correct}.`,
    ),
  };
}

function genComparerUnite(d: Etoile): Q {
  if (d <= 2) return tirer([egaleAuTout, quandEgaleA1, egaleAuTout]);
  if (d === 3) return tirer([combienPourCompleter, egaleAuTout, enResteTIl]);
  return tirer([enResteTIl, combienPourCompleter, egaleAuTout]);
}

// ============================================================
// ce2_fraction_defi — Défis
// ============================================================

function plusGrossePart(): Q {
  const [p, q] = deuxPersonnes();
  const [x, y] = shuffle([2, 3, 4, 5, 6, 8, 10]).slice(0, 2);
  const t = tout();
  const correct = x < y ? `chez ${p.nom}` : `chez ${q.nom}`;
  return {
    text: pick([
      `Deux familles ont ${un(t)} pareil${t.f ? "le" : ""}. Chez ${p.nom}, on ${t.f ? "la" : "le"} partage entre ${x} personnes ; chez ${q.nom}, entre ${y}. Où les parts sont-elles les plus grosses ?`,
      `${p.nom} partage ${un(t)} avec ${x - 1} ami${x - 1 > 1 ? "s" : ""}, ${q.nom} partage ${un(t)} pareil${t.f ? "le" : ""} avec ${y - 1} ami${y - 1 > 1 ? "s" : ""}. Où la part de chacun est-elle la plus grosse ?`,
    ]),
    format: "qcm",
    choices: shuffle([`chez ${p.nom}`, `chez ${q.nom}`, "les parts sont pareilles"]),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      "Moins on est nombreux à partager, plus la part de chacun est grosse.",
      "On compare le nombre de parts : le plus petit partage donne les plus grosses parts.",
      `${fr(1, x)} ${x < y ? ">" : "<"} ${fr(1, y)}.`,
      `Les parts sont plus grosses ${correct}.`,
    ),
  };
}

function fractionDUneQuantite(): Q {
  const den = pick([2, 3, 4, 5, 10]);
  const part = rint(2, 10);
  const total = den * part;
  const n = Math.random() < 0.6 ? 1 : rint(2, den - 1 || 1);
  const rep = n * part;
  const objet = pick(["billes", "bonbons", "images", "graines", "perles", "coquillages", "cartes", "crayons", "œufs", "fraises"]);
  const p = quelquun();
  const correct = String(rep);
  const qui = pick([`${p.nom} a`, "Pic le paille-en-queue a trouvé", "Le pirate garde", "La fermière a ramassé", "Dans le bocal, il y a"]);
  return {
    text: `${qui} ${total} ${objet}. ${pick([`${maj(p.il)} en donne ${nom(n, den)}`, `On en prend ${nom(n, den)}`, `${nom(n, den).replace(/^\w/, (c) => c.toUpperCase())} sont pour Zoé`])}. Combien ${de(objet)} cela fait-il ?`.replace(/^Pic le paille-en-queue a trouvé (.*?)\. (Il|Elle) en donne/, "Pic le paille-en-queue a trouvé $1. Il en donne").replace(/^(Le pirate garde|La fermière a ramassé|Dans le bocal, il y a) (.*?)\. (Il|Elle) en donne/, "$1 $2. On en donne"),
    format: "qcm",
    choices: choix(correct, [String(total - rep), String(part + 1), String(total % 2 ? total - part : total / 2 === rep ? total / 2 + den : total / 2), String(rep + den), String(den)]),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      `Prendre ${nom(1, den)}, c'est partager en ${den} parts égales et en prendre une.`,
      `On partage ${total} en ${den} parts égales, puis on prend ${n} part${n > 1 ? "s" : ""}.`,
      `${total} ÷ ${den} = ${part}${n > 1 ? ` ; ${n} × ${part} = ${rep}` : ""}.`,
      `Cela fait ${rep} ${objet}.`,
    ),
  };
}

function egaliteDefi(): Q {
  const [a, b, c, e] = pick(PAIRES);
  const p = quelquun();
  const correct = `non, ${fr(c, e)} et ${fr(a, b)} c'est pareil`;
  return {
    text: `${p.nom} colorie ${c} cases sur une bande de ${e} cases et dit : « j'ai colorié ${fr(c, e)}, donc plus que ${fr(a, b)} ». A-t-${p.il} raison ?`,
    format: "qcm",
    choices: choix(correct, [`oui, ${c} est plus grand que ${a}`, `oui, ${e} est plus grand que ${b}`, `non, ${fr(c, e)} est plus petit`]),
    expected: [correct],
    comparator: "mcq_exact",
    canvas: deuxBandes([a, b], [c, e]),
    explanation: exp(
      "Deux fractions égales couvrent la même partie du tout, même avec des nombres différents.",
      "On compare les parties coloriées des deux bandes.",
      `${fr(a, b)} = ${fr(c, e)}.`,
      "Non : c'est la même quantité.",
    ),
  };
}

function resteApresManger(): Q {
  const den = pick(DENS);
  const n = rint(2, den - 1);
  const t = tout();
  const { verbe } = action(t);
  const p = quelquun();
  const correct = fr(den - n, den);
  return {
    text: pick([
      `${maj(un(t))} est partagé${t.f ? "e" : ""} en ${den} parts égales. On en a ${verbe} ${n}. Quelle fraction ${du(t)} reste-t-il ?`,
      `${p.nom} a ${verbe} ${n} parts ${du(t)}, coupé${t.f ? "e" : ""} en ${den}. Quelle fraction reste-t-il ?`,
    ]),
    format: "qcm",
    choices: choix(correct, [fr(n, den), fr(den, den - n), fr(den - n, n), fr(1, den - n)].filter((x) => x !== correct)),
    expected: [correct],
    comparator: "mcq_exact",
    canvas: dessin(n, den, t.forme),
    explanation: exp(
      `Le tout, c'est ${den} parts sur ${den}.`,
      "On enlève les parts parties.",
      `${den} − ${n} = ${den - n} : il reste ${fr(den - n, den)}.`,
      `Il reste ${correct}.`,
    ),
  };
}

function genDefi(d: Etoile): Q {
  if (d <= 4) return tirer([plusGrossePart, fractionDUneQuantite, resteApresManger]);
  return tirer([egaliteDefi, fractionDUneQuantite, resteApresManger, partagesMultiples]);
}

// ============================================================
// LA BANQUE — mêmes ids, mêmes micros, mêmes étoiles qu'avant.
// ============================================================

const item = (id: string, microId: string, difficulty: Etoile, hint: string, gen: (d: Etoile) => Q, tags: string[]): TutorBankItemV4 =>
  gabarit({ id, notionId: NOTION, microId, difficulty, hint, tags: ["fraction", ...tags] }, () => gen(difficulty));

export const fractionBank: TutorBankItemV4[] = [
  item("ce2_fraction_unite_fixed_1", "ce2_fraction_unite", 1, "Pour une fraction, les parts doivent être toutes égales.", genUnite, ["unite"]),
  item("ce2_fraction_unite_fixed_2", "ce2_fraction_unite", 2, "Compte les parts égales : leur nombre donne le nom de la part.", genUnite, ["unite"]),
  item("ce2_fraction_unite_fixed_3", "ce2_fraction_unite", 3, "Combien de parts égales forment le tout ?", genUnite, ["unite"]),
  item("ce2_fraction_unite_tpl_1", "ce2_fraction_unite", 2, "Quart → 4 parts, tiers → 3 parts…", genUnite, ["unite"]),
  item("ce2_fraction_unite_tpl_2", "ce2_fraction_unite", 3, "Le tout, c'est toutes les parts.", genUnite, ["unite"]),

  item("ce2_fraction_lire_fixed_1", "ce2_fraction_lire", 1, "Le bas dit le partage, le haut dit combien on en prend.", genLire, ["lire"]),
  item("ce2_fraction_lire_fixed_2", "ce2_fraction_lire", 2, "Lis le haut, puis le nom des parts.", genLire, ["lire"]),
  item("ce2_fraction_lire_fixed_3", "ce2_fraction_lire", 3, "Compte toutes les parts, puis les parts coloriées.", genLire, ["lire"]),
  item("ce2_fraction_lire_tpl_1", "ce2_fraction_lire", 2, "Le nombre du bas donne le nom des parts.", genLire, ["lire"]),
  item("ce2_fraction_lire_tpl_2", "ce2_fraction_lire", 3, "Compte toutes les parts, puis celles dont on parle.", genLire, ["lire", "canvas"]),

  item("ce2_fraction_representer_fixed_1", "ce2_fraction_representer", 2, "Partage d'abord en parts égales, puis colorie.", genRepresenter, ["representer"]),
  item("ce2_fraction_representer_fixed_2", "ce2_fraction_representer", 4, "Les parts doivent être égales.", genRepresenter, ["representer", "piege"]),
  item("ce2_fraction_representer_tpl_1", "ce2_fraction_representer", 2, "Compte les parts coloriées et toutes les parts.", genRepresenter, ["representer", "canvas"]),
  item("ce2_fraction_representer_tpl_2", "ce2_fraction_representer", 3, "Le haut dit combien de parts colorier.", genRepresenter, ["representer"]),

  item("ce2_fraction_egalite_fixed_1", "ce2_fraction_egalite", 2, "Compare les parties coloriées des deux bandes.", genEgalite, ["egalite", "canvas"]),
  item("ce2_fraction_egalite_fixed_2", "ce2_fraction_egalite", 4, "Plus il y a de parts, plus elles sont petites.", genEgalite, ["egalite", "piege"]),
  item("ce2_fraction_egalite_tpl_1", "ce2_fraction_egalite", 3, "Multiplie le haut et le bas par le même nombre.", genEgalite, ["egalite"]),
  item("ce2_fraction_egalite_tpl_2", "ce2_fraction_egalite", 4, "Découpe chaque part en parts plus petites.", genEgalite, ["egalite"]),

  item("ce2_fraction_add_sous_fixed_3", "ce2_fraction_add_sous", 3, "Même partage : ajoute les parts, garde le bas.", genAddSous, ["addition"]),
  item("ce2_fraction_add_sous_fixed_4", "ce2_fraction_add_sous", 4, "Le tout, c'est toutes les parts.", genAddSous, ["soustraction"]),
  item("ce2_fraction_add_sous_fixed_5", "ce2_fraction_add_sous", 4, "Change d'abord les demis en quarts (ou en sixièmes…).", genAddSous, ["addition"]),
  item("ce2_fraction_add_sous_fixed_6", "ce2_fraction_add_sous", 5, "Enlève au tout tout ce qui est parti.", genAddSous, ["soustraction"]),
  item("ce2_fraction_add_sous_tpl_1", "ce2_fraction_add_sous", 2, "Ajoute les nombres du haut, garde celui du bas.", genAddSous, ["addition"]),
  item("ce2_fraction_add_sous_tpl_2", "ce2_fraction_add_sous", 3, "Enlève les nombres du haut, garde celui du bas.", genAddSous, ["soustraction"]),
  item("ce2_fraction_add_sous_tpl_3", "ce2_fraction_add_sous", 4, "Combien de parts manquent pour le tout ?", genAddSous, ["addition"]),
  item("ce2_fraction_add_sous_tpl_4", "ce2_fraction_add_sous", 4, "Additionne ce qui est parti, puis enlève-le au tout.", genAddSous, ["soustraction"]),
  item("ce2_fraction_add_sous_tpl_5", "ce2_fraction_add_sous", 5, "Écris les deux fractions avec le même partage.", genAddSous, ["addition"]),
  item("ce2_fraction_add_sous_tpl_6", "ce2_fraction_add_sous", 5, "Écris les deux fractions avec le même partage.", genAddSous, ["soustraction"]),
  item("ce2_fraction_add_sous_tpl_7", "ce2_fraction_add_sous", 2, "Les parts ont la même taille : compte-les ensemble.", genAddSous, ["addition"]),
  item("ce2_fraction_add_sous_tpl_8", "ce2_fraction_add_sous", 3, "Le partage ne change pas quand on ajoute des parts.", genAddSous, ["addition"]),

  item("ce2_fraction_bande_unite_fixed_1", "ce2_fraction_bande_unite", 2, "Compte les parts de la bande, puis les parts couvertes.", genBandeUnite, ["mesure"]),
  item("ce2_fraction_bande_unite_fixed_2", "ce2_fraction_bande_unite", 4, "Deux fractions égales donnent la même longueur.", genBandeUnite, ["mesure"]),
  item("ce2_fraction_bande_unite_tpl_1", "ce2_fraction_bande_unite", 3, "La bande unité vaut 1.", genBandeUnite, ["mesure", "canvas"]),
  item("ce2_fraction_bande_unite_tpl_2", "ce2_fraction_bande_unite", 3, "Le bas dit en combien on a partagé la bande.", genBandeUnite, ["mesure"]),

  item("ce2_fraction_droite_fixed_1", "ce2_fraction_droite", 2, "Entre 0 et 1, compte les parts égales.", genDroite, ["droite"]),
  item("ce2_fraction_droite_fixed_2", "ce2_fraction_droite", 4, "Plus on prend de parts, plus on s'éloigne de 0.", genDroite, ["droite"]),
  item("ce2_fraction_droite_tpl_1", "ce2_fraction_droite", 3, "Compte les parts entre 0 et 1, puis jusqu'au point.", genDroite, ["droite", "canvas"]),
  item("ce2_fraction_droite_tpl_2", "ce2_fraction_droite", 3, "Le bas donne le partage du segment de 0 à 1.", genDroite, ["droite"]),

  item("ce2_fraction_comparer_fixed_1", "ce2_fraction_comparer", 2, "Même partage : compare les nombres du haut.", genComparer, ["comparer"]),
  item("ce2_fraction_comparer_fixed_2", "ce2_fraction_comparer", 4, "Même haut : plus le bas est grand, plus les parts sont petites.", genComparer, ["comparer"]),
  item("ce2_fraction_comparer_fixed_3", "ce2_fraction_comparer", 4, "Compare la taille des parts.", genComparer, ["comparer", "piege"]),
  item("ce2_fraction_comparer_fixed_4", "ce2_fraction_comparer", 5, "Écris les deux fractions avec le même partage.", genComparer, ["comparer"]),
  item("ce2_fraction_comparer_tpl_1", "ce2_fraction_comparer", 2, "Même partage : la plus grande prend le plus de parts.", genComparer, ["comparer", "canvas"]),
  item("ce2_fraction_comparer_tpl_2", "ce2_fraction_comparer", 4, "Même haut : regarde le partage.", genComparer, ["comparer"]),
  item("ce2_fraction_comparer_tpl_3", "ce2_fraction_comparer", 5, "Change une des fractions pour avoir le même partage.", genComparer, ["comparer"]),

  item("ce2_fraction_comparer_unite_fixed_1", "ce2_fraction_comparer_unite", 2, "Le tout : le haut est égal au bas.", genComparerUnite, ["unite"]),
  item("ce2_fraction_comparer_unite_fixed_2", "ce2_fraction_comparer_unite", 4, "Compare le haut au bas.", genComparerUnite, ["unite"]),
  item("ce2_fraction_comparer_unite_tpl_1", "ce2_fraction_comparer_unite", 2, "Toutes les parts sont-elles prises ?", genComparerUnite, ["unite"]),
  item("ce2_fraction_comparer_unite_tpl_2", "ce2_fraction_comparer_unite", 3, "Combien de parts manquent pour le tout ?", genComparerUnite, ["unite"]),

  item("ce2_fraction_defi_fixed_1", "ce2_fraction_defi", 4, "Moins on est nombreux, plus la part est grosse.", genDefi, ["defi"]),
  item("ce2_fraction_defi_fixed_2", "ce2_fraction_defi", 5, "Deux fractions égales couvrent la même partie.", genDefi, ["defi"]),
  item("ce2_fraction_defi_tpl_1", "ce2_fraction_defi", 5, "Partage la quantité en parts égales.", genDefi, ["defi"]),
  item("ce2_fraction_defi_tpl_2", "ce2_fraction_defi", 5, "Enlève au tout ce qui est parti.", genDefi, ["defi"]),
];
