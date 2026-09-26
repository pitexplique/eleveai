// lib/automatismes/6e.ts
//
// Automatismes de 6e — 24/09/2026, réécrits le 26/09/2026.
//
// ⭐ RÉFÉRENCE : les rubriques « Automatismes » de 6e du programme du cycle 3
// (BO n° 16 du 17 avril 2025, en vigueur en 6e depuis la rentrée 2025). Le
// programme le dit : « En 6e, les automatismes couvrent l'ensemble des domaines
// du programme, mais portent uniquement sur des connaissances, des procédures
// et des stratégies déjà étudiées au cours moyen. » Frédéric, 26/09 : on colle
// STRICTEMENT la liste.
//
// Les neuf rubriques :
// - nombres : relations entre 1, 1/10, 1/100, 1/1 000 ; 1/10 = 0,1… ; fraction
//   décimale ↔ écriture décimale (4 107/1 000 = 4 + 1/10 + 7/1 000 = 4,107) ;
//   × et ÷ par 1, 10, 100, 1 000 ;
// - fractions : reconnaître une fraction dessinée ; égalités à trous avec 1/4,
//   1/2, 3/4 et 1 ; 1/4 = 0,25, 1/2, 3/4, 3/2, 4/2, 5/2 ; 2/3 de 12 œufs ;
// - longueurs : préfixes du kilo au milli, unités successives, conversions
//   vers le mètre et depuis le mètre ; périmètre du carré et du rectangle ;
// - aires : sur quadrillage ; 1 m² = 100 dm², 1 dm² = 100 cm², 1 cm² = 0,01 dm² ;
// - durées : lire l'heure ; jour, heure, minute, seconde ; jours d'une année,
//   siècle, millénaire ; demi-heure, quart d'heure, trois quarts d'heure ;
// - géométrie plane : codage (angle droit, longueurs égales, angles égaux) ;
//   carré, rectangle, triangle ; axes de symétrie ;
// - espace : reconnaître les solides ;
// - données : lire un tableau, un diagramme, une courbe (lecture immédiate) ;
// - proportionnalité : double, quadruple, moitié, tiers, quart ; « 4 fois plus
//   grand », « 5 fois moins » → × ou ÷.
//
// ⛔ Sortis le 26/09 (au programme, mais pas dans la liste) : comparer et
// arrondir des décimaux, calcul posé, somme de fractions de même dénominateur,
// pourcentages, échelles, milieu, bissectrice, aire du rectangle par la
// formule, périmètre du disque, volumes, nature des triangles, somme des
// angles, horaires, Scratch — et la question à rédiger (une exigence du brevet).

import type { CanvasFigure } from "@/lib/tutor-v4/types_canvas";
import type { AutoNiveau, AutoQuestion } from "./types";
import { lireInstant, lireValeur, lireVariation } from "./3e";

/* ─────────────────────────── outils ─────────────────────────── */

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function entre(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pgcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : pgcd(b, a % b);
}

/** Un nombre à l'écrit : « 12 000 », « 3,25 ». */
function nb(n: number): string {
  const r = Math.round(n * 1e6) / 1e6;
  const [e, d] = String(Math.abs(r)).split(".");
  return `${r < 0 ? "-" : ""}${e.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}${d ? `,${d}` : ""}`;
}

/** « 12 000 » d'abord (c'est ce que le bilan affiche), puis « 12000 », « 0.25 ». */
function accepte(n: number): string[] {
  const s = nb(n).replace(/ /g, "");
  return Array.from(new Set([nb(n), s, s.replace(",", ".")]));
}

/** Une fraction : « 2/4 », « 1/2 », « 0,5 ». */
function fraction(n: number, d: number): string[] {
  const g = pgcd(n, d);
  // Un entier s'écrit d'abord comme un entier : le bilan affiche « 1 », pas « 1/1 ».
  const out = d / g === 1 ? [`${n / g}`, `${n}/${d}`] : [`${n}/${d}`, `${n / g}/${d / g}`];
  if (Math.abs(((n / d) * 1000) % 1) < 1e-9) out.push(...accepte(n / d));
  return Array.from(new Set(out));
}

/** QCM : la bonne réponse et trois pièges distincts (l'ordre est mélangé au service). */
function qcm(correct: string, pieges: readonly string[]): string[] {
  return [correct, ...shuffle(pieges.filter((p) => p !== correct)).slice(0, 3)];
}

/* ═══════════════ NOMBRES : 1, 1/10, 1/100, 1/1 000 ═══════════════ */

function numeration6e(): AutoQuestion {
  const cas = entre(1, 4);
  if (cas === 1) {
    const r = pick([
      { t: "Compléter : 1 = …/10.", r: ["10"], e: "Une unité, c'est dix dixièmes." },
      { t: "Compléter : 1 = …/100.", r: ["100"], e: "Une unité, c'est cent centièmes." },
      { t: "Compléter : 1 = …/1 000.", r: ["1000", "1 000"], e: "Une unité, c'est mille millièmes." },
      { t: "Compléter : 1/10 = …/100.", r: ["10"], e: "Un dixième, c'est dix centièmes." },
      { t: "Compléter : 1/10 = …/1 000.", r: ["100"], e: "Un dixième, c'est cent millièmes." },
      { t: "Compléter : 1/100 = …/1 000.", r: ["10"], e: "Un centième, c'est dix millièmes." },
      { t: "Compléter : 1 = 10 × … (écrire une fraction).", r: ["1/10", "0,1", "0.1"], e: "Dix dixièmes font une unité : 1 = 10 × 1/10." },
      { t: "Compléter : 1 = 100 × … (écrire une fraction).", r: ["1/100", "0,01", "0.01"], e: "Cent centièmes font une unité : 1 = 100 × 1/100." },
      { t: "Compléter : 1/10 = 10 × … (écrire une fraction).", r: ["1/100", "0,01", "0.01"], e: "Dix centièmes font un dixième : 1/10 = 10 × 1/100." },
      { t: "Combien y a-t-il de centièmes dans un dixième ?", r: ["10"], e: "1/10 = 10/100 : dix centièmes." },
      { t: "Combien y a-t-il de millièmes dans un centième ?", r: ["10"], e: "1/100 = 10/1 000 : dix millièmes." },
      { t: "Combien y a-t-il de millièmes dans une unité ?", r: ["1000", "1 000"], e: "1 = 1 000/1 000 : mille millièmes." },
      { t: "Combien y a-t-il de centièmes dans une unité ?", r: ["100"], e: "1 = 100/100 : cent centièmes." },
    ]);
    return { text: r.t, format: "short", expected: r.r, explanation: `${r.e}\nRéponse : ${r.r[0]}.` };
  }
  if (cas === 2) {
    const [f, d] = pick([["1/10", 0.1], ["1/100", 0.01], ["1/1 000", 0.001]] as const);
    if (Math.random() < 0.5) {
      return { text: `Écrire ${f} sous forme décimale.`, format: "short", expected: accepte(d), explanation: `${f} = ${nb(d)} : à connaître par cœur.\nLe 1 est au rang des ${d === 0.1 ? "dixièmes" : d === 0.01 ? "centièmes" : "millièmes"}.` };
    }
    const den = f.split("/")[1];
    return { text: `Compléter : ${nb(d)} = 1/… .`, format: "short", expected: [den, den.replace(/ /g, "")], explanation: `${nb(d)} = ${f} : à connaître par cœur.\nRéponse : ${den}.` };
  }
  if (cas === 3) {
    // 4 107/1 000 = 4 + 1/10 + 7/1 000 = 4,107
    const e = entre(1, 29), t = entre(0, 9), c = entre(0, 9), m = entre(1, 9);
    const milliemes = e * 1000 + t * 100 + c * 10 + m;
    const v = milliemes / 1000;
    const forme = entre(1, 3);
    if (forme === 1) {
      return { text: `Écrire ${nb(milliemes)}/1 000 sous forme décimale.`, format: "short", expected: accepte(v), explanation: `${nb(milliemes)} millièmes : le dernier chiffre est celui des millièmes.\n${nb(milliemes)}/1 000 = ${nb(v)}.` };
    }
    if (forme === 2) {
      const parts = [`${e}`, t ? `${t}/10` : "", c ? `${c}/100` : "", `${m}/1 000`].filter(Boolean);
      return { text: `Écrire ${parts.join(" + ")} sous forme décimale.`, format: "short", expected: accepte(v), explanation: `Chaque fraction décimale donne un chiffre à son rang : ${t} dixième${t > 1 ? "s" : ""}, ${c} centième${c > 1 ? "s" : ""}, ${m} millième${m > 1 ? "s" : ""}.\n${parts.join(" + ")} = ${nb(v)}.` };
    }
    return { text: `Compléter : ${nb(v)} = …/1 000.`, format: "short", expected: accepte(milliemes), explanation: `${nb(v)}, c'est ${nb(milliemes)} millièmes.\n${nb(v)} = ${nb(milliemes)}/1 000.` };
  }
  // × et ÷ par 1, 10, 100, 1 000 — le résultat ne dépasse pas les millièmes.
  const p = pick([1, 10, 100, 1000] as const).valueOf();
  const fois = Math.random() < 0.5;
  const rangs = String(p).length - 1;
  const dec = fois ? entre(1, 3) : entre(1, Math.max(1, 3 - rangs));
  if (!fois && dec + rangs > 3) return numeration6e();
  const m = entre(11, 9999);
  if (m % 10 === 0) return numeration6e();
  const v = m / 10 ** dec;
  const r = fois ? (m * p) / 10 ** dec : m / (10 ** dec * p);
  return {
    text: `Calculer ${nb(v)} ${fois ? "×" : "÷"} ${nb(p)}.`,
    format: "short",
    expected: accepte(r),
    explanation: p === 1
      ? `${fois ? "Multiplier" : "Diviser"} par 1 ne change pas le nombre.\n${nb(v)} ${fois ? "×" : "÷"} 1 = ${nb(v)}.`
      : `${fois ? "Multiplier" : "Diviser"} par ${nb(p)} : chaque chiffre devient ${nb(p)} fois plus ${fois ? "grand" : "petit"}, il avance de ${rangs} rang${rangs > 1 ? "s" : ""} vers la ${fois ? "gauche" : "droite"}.\n${nb(v)} ${fois ? "×" : "÷"} ${nb(p)} = ${nb(r)}.`,
  };
}

/* ═══════════════ FRACTIONS ═══════════════ */

function fractions6e(): AutoQuestion {
  const cas = entre(1, 4);
  if (cas === 1) {
    // Reconnaître une fraction dessinée (le canvas `fraction` du coach de CM1).
    const d = entre(2, 8), n = entre(1, d - 1);
    const canvas = {
      kind: "fraction",
      model: pick(["bar", "circle"] as const),
      fraction: { numerator: n, denominator: d },
      display: { showFraction: false, showLabel: false, showParts: true },
    } as unknown as CanvasFigure;
    return {
      text: "Quelle fraction de la figure est coloriée ? (Écrire une fraction.)",
      format: "short",
      expected: fraction(n, d),
      explanation: `La figure est partagée en ${d} parts égales (le dénominateur) ; ${n} sont coloriées (le numérateur).\nC'est ${n}/${d}.`,
      canvas,
    };
  }
  if (cas === 2) {
    const e = pick([
      { t: "1/2 + 1/2", n: 1, d: 1 },
      { t: "1/4 + 1/4", n: 1, d: 2 },
      { t: "1 − 1/4", n: 3, d: 4 },
      { t: "1/2 + 1/4", n: 3, d: 4 },
      { t: "1 − 1/2", n: 1, d: 2 },
      { t: "3/4 + 1/4", n: 1, d: 1 },
      { t: "1/2 − 1/4", n: 1, d: 4 },
      { t: "3/4 − 1/4", n: 1, d: 2 },
    ]);
    return {
      text: `Compléter : ${e.t} = … (écrire un nombre ou une fraction).`,
      format: "short",
      expected: fraction(e.n, e.d),
      explanation: `On pense en quarts : 1 = 4/4 et 1/2 = 2/4.\n${e.t} = ${e.d === 1 ? "1" : `${e.n}/${e.d}`}.`,
    };
  }
  if (cas === 3) {
    const [n, d, v] = pick([[1, 4, 0.25], [1, 2, 0.5], [3, 4, 0.75], [3, 2, 1.5], [4, 2, 2], [5, 2, 2.5]] as const);
    const sens = entre(1, 2);
    if (sens === 1) {
      return { text: `Écrire ${n}/${d} sous forme décimale.`, format: "short", expected: accepte(v), explanation: `${n}/${d} = ${nb(v)} : à connaître par cœur.` };
    }
    return { text: `Compléter : ${nb(v)} = …/${d}.`, format: "short", expected: accepte(n), explanation: `${nb(v)} = ${n}/${d} : à connaître par cœur.` };
  }
  // 2/3 de 12 œufs, 3/4 de 10 m
  const [n, d] = pick([[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [1, 5], [2, 5]] as const);
  const q = pick([
    { u: "œufs", k: d * entre(2, 6), entier: true },
    { u: "m", k: pick([10, 20, 30, 12, 24, 100] as const).valueOf(), entier: false },
    { u: "€", k: d * entre(2, 12), entier: true },
    { u: "élèves", k: d * entre(3, 8), entier: true },
  ]);
  const r = (n * q.k) / d;
  if ((q.entier && !Number.isInteger(r)) || Math.abs((r * 100) % 1) > 1e-9) return fractions6e();
  const mots: Record<string, string> = { "1/2": "la moitié", "1/3": "le tiers", "1/4": "le quart", "1/5": "le cinquième" };
  const mot = mots[`${n}/${d}`];
  return {
    text: `Combien font ${n}/${d} de ${q.k} ${q.u} ?`,
    format: "short",
    expected: accepte(r),
    explanation: `On partage en ${d} parts égales, puis on en prend ${n}${mot ? ` (c'est ${mot})` : ""}.\n${q.k} ÷ ${d} = ${nb(q.k / d)}${n > 1 ? `, puis ${nb(q.k / d)} × ${n} = ${nb(r)}` : ""} ${q.u}.`,
  };
}

/* ═══════════════ LONGUEURS ET PÉRIMÈTRES ═══════════════ */

// Chaque unité en millimètres : on calcule en entiers.
const UNITES = [
  { u: "km", mm: 1_000_000, prefixe: "kilo", sens: "mille" },
  { u: "hm", mm: 100_000, prefixe: "hecto", sens: "cent" },
  { u: "dam", mm: 10_000, prefixe: "déca", sens: "dix" },
  { u: "m", mm: 1000, prefixe: "", sens: "" },
  { u: "dm", mm: 100, prefixe: "déci", sens: "un dixième" },
  { u: "cm", mm: 10, prefixe: "centi", sens: "un centième" },
  { u: "mm", mm: 1, prefixe: "milli", sens: "un millième" },
] as const;

function longueurs6e(): AutoQuestion {
  const cas = entre(1, 3);
  if (cas === 1) {
    // Préfixes et unités successives
    const i = entre(0, UNITES.length - 2);
    const a = UNITES[i], b = UNITES[i + 1];
    const q = pick([
      { t: `Compléter : 1 ${a.u} = … ${b.u}.`, r: 10, e: `Deux unités qui se suivent : la plus grande vaut 10 fois l'autre.` },
      { t: `Compléter : 1 ${b.u} = … ${a.u}.`, r: 0.1, e: `Deux unités qui se suivent : la plus petite vaut un dixième de l'autre.` },
      ...(a.u !== "m" && a.prefixe ? [{ t: `Compléter : 1 ${a.u} = … m.`, r: a.mm / 1000, e: `« ${a.prefixe} » veut dire ${a.sens} : 1 ${a.u} = ${nb(a.mm / 1000)} m.` }] : []),
      ...(b.u !== "m" && b.prefixe ? [{ t: `Compléter : 1 ${b.u} = … m.`, r: b.mm / 1000, e: `« ${b.prefixe} » veut dire ${b.sens} : 1 ${b.u} = ${nb(b.mm / 1000)} m.` }] : []),
    ]);
    return { text: q.t, format: "short", expected: accepte(q.r), explanation: `${q.e}\nRéponse : ${nb(q.r)}.` };
  }
  const autre = pick(UNITES.filter((x) => x.u !== "m"));
  if (cas === 2) {
    // vers le mètre
    const v10 = autre.mm >= 10000 ? entre(11, 99) : entre(2, 950) * 10; // en dixièmes de l'unité
    const mm = (v10 * autre.mm) / 10;
    if (!Number.isInteger(mm)) return longueurs6e();
    const v = v10 / 10, r = mm / 1000;
    return { text: `Convertir ${nb(v)} ${autre.u} en m.`, format: "short", expected: accepte(r), explanation: `1 ${autre.u} = ${nb(autre.mm / 1000)} m : on ${autre.mm > 1000 ? "multiplie" : "divise"} par ${nb(autre.mm > 1000 ? autre.mm / 1000 : 1000 / autre.mm)}.\n${nb(v)} ${autre.u} = ${nb(r)} m.` };
  }
  // depuis le mètre
  const cm = entre(1, 99999); // la longueur en centimètres, pour rester au plus au centième de mètre
  const mm = cm * 10;
  const r = mm / autre.mm;
  if (Math.abs((r * 1000) % 1) > 1e-9 || cm % 10 === 0) return longueurs6e();
  return { text: `Convertir ${nb(mm / 1000)} m en ${autre.u}.`, format: "short", expected: accepte(r), explanation: `1 m = ${nb(1000 / autre.mm)} ${autre.u} : on ${autre.mm < 1000 ? "multiplie" : "divise"} par ${nb(autre.mm < 1000 ? 1000 / autre.mm : autre.mm / 1000)}.\n${nb(mm / 1000)} m = ${nb(r)} ${autre.u}.` };
}

function perimetres6e(): AutoQuestion {
  const u = pick(["cm", "m", "mm"] as const);
  if (Math.random() < 0.5) {
    const c = entre(3, 25);
    return { text: `Quel est le périmètre d'un carré de côté ${c} ${u}, en ${u} ?`, format: "short", expected: accepte(4 * c), explanation: `Le périmètre est la longueur du contour ; un carré a 4 côtés égaux.\n4 × ${c} = ${4 * c} ${u}.` };
  }
  const L = entre(5, 30), l = entre(2, L - 1);
  return { text: `Quel est le périmètre d'un rectangle de ${L} ${u} sur ${l} ${u}, en ${u} ?`, format: "short", expected: accepte(2 * (L + l)), explanation: `On fait le tour : ${L} + ${l} + ${L} + ${l}, soit 2 × (${L} + ${l}).\n${2 * (L + l)} ${u}.` };
}

/* ═══════════════ AIRES ═══════════════ */

function aires6e(): AutoQuestion {
  const cas = entre(1, 3);
  if (cas === 1) {
    const L = entre(2, 9), l = entre(2, 7);
    return {
      text: `Sur un quadrillage dont les carreaux ont 1 cm de côté, un rectangle recouvre exactement ${L} carreaux en longueur et ${l} en largeur. Quelle est son aire, en cm² ?`,
      format: "short",
      expected: accepte(L * l),
      explanation: `Chaque carreau est un carré de 1 cm de côté : son aire est 1 cm². On compte les carreaux : ${l} rangées de ${L}.\n${L} × ${l} = ${L * l} carreaux, soit ${L * l} cm².`,
    };
  }
  if (cas === 2) {
    const L = entre(4, 9), l = entre(3, 7), a = entre(1, L - 2), b = entre(1, l - 2);
    return {
      text: `Sur un quadrillage dont les carreaux ont 1 cm de côté, une figure est un rectangle de ${L} carreaux sur ${l}, auquel il manque un coin de ${a} carreau${a > 1 ? "x" : ""} sur ${b}. Quelle est son aire, en cm² ?`,
      format: "short",
      expected: accepte(L * l - a * b),
      explanation: `On compte les carreaux du rectangle, puis on retire ceux du coin.\n${L * l} − ${a * b} = ${L * l - a * b} carreaux, soit ${L * l - a * b} cm².`,
    };
  }
  const q = pick([
    () => { const v = entre(2, 90); return { t: `Convertir ${v} m² en dm².`, r: v * 100, e: "1 m² = 10 dm × 10 dm = 100 dm² : on multiplie par 100." }; },
    () => { const v = entre(2, 90); return { t: `Convertir ${v} dm² en cm².`, r: v * 100, e: "1 dm² = 10 cm × 10 cm = 100 cm² : on multiplie par 100." }; },
    () => { const v = entre(2, 950); return { t: `Convertir ${v} cm² en dm².`, r: v / 100, e: "1 cm² = 1/100 dm² = 0,01 dm² : on divise par 100." }; },
    () => { const v = entre(2, 950); return { t: `Convertir ${v} dm² en m².`, r: v / 100, e: "1 dm² = 1/100 m² = 0,01 m² : on divise par 100." }; },
    () => ({ t: "Compléter : 1 cm² = … dm² (écriture décimale).", r: 0.01, e: "Un centimètre carré, c'est un centième de décimètre carré." }),
    () => ({ t: "Compléter : 1 dm² = … m² (écriture décimale).", r: 0.01, e: "Un décimètre carré, c'est un centième de mètre carré." }),
  ]);
  const { t, r, e } = q();
  return { text: t, format: "short", expected: accepte(r), explanation: `${e}\nRéponse : ${nb(r)}.` };
}

/* ═══════════════ DURÉES ═══════════════ */

function durees6e(): AutoQuestion {
  const cas = entre(1, 3);
  if (cas === 1) {
    // Lire l'heure sur un cadran (le canvas `duree` du coach de CE1)
    const h = entre(1, 11), m = 5 * entre(0, 11); // « le matin » : pas de 12 h, c'est midi
    const mm = String(m).padStart(2, "0");
    const canvas = {
      kind: "duree",
      variant: "horloge",
      time: { hour: h, minute: m },
      display: { showNumbers: true, showMinuteTicks: true, showDigital: false },
    } as unknown as CanvasFigure;
    return {
      text: `Quelle heure indique cette horloge (le matin) ? (Écrire par exemple 9 h 05.)`,
      format: "short",
      expected: [`${h} h ${mm}`, `${h}h${mm}`, `${h}:${mm}`, `${h} h ${m}`, `${h}h${m}`, ...(m === 0 ? [`${h} h`, `${h}h`] : [])],
      explanation: `La petite aiguille donne l'heure (celle qu'elle a dépassée), la grande les minutes : chaque chiffre du cadran vaut 5 minutes.\nIl est ${h} h ${mm}.`,
      canvas,
    };
  }
  if (cas === 2) {
    const q = pick([
      { t: "Combien y a-t-il de minutes dans une heure ?", r: 60 },
      { t: "Combien y a-t-il de secondes dans une minute ?", r: 60 },
      { t: "Combien y a-t-il d'heures dans un jour ?", r: 24 },
      { t: "Combien y a-t-il de jours dans une année qui n'est pas bissextile ?", r: 365 },
      { t: "Combien y a-t-il de jours dans une année bissextile ?", r: 366 },
      { t: "Combien y a-t-il d'années dans un siècle ?", r: 100 },
      { t: "Combien y a-t-il d'années dans un millénaire ?", r: 1000 },
      { t: "Combien de minutes dure une demi-heure ?", r: 30 },
      { t: "Combien de minutes dure un quart d'heure ?", r: 15 },
      { t: "Combien de minutes durent trois quarts d'heure ?", r: 45 },
      { t: "Combien y a-t-il de secondes dans une heure ?", r: 3600 },
    ]);
    return { text: q.t, format: "short", expected: accepte(q.r), explanation: `À connaître par cœur : 1 j = 24 h, 1 h = 60 min, 1 min = 60 s ; une année compte 365 jours (366 si elle est bissextile).\nRéponse : ${nb(q.r)}.` };
  }
  const q = pick([
    () => { const k = entre(2, 9); return { t: `Combien y a-t-il de minutes dans ${k} h ?`, r: k * 60, e: `1 h = 60 min : ${k} × 60` }; },
    () => { const k = entre(2, 7); return { t: `Combien y a-t-il d'heures dans ${k} jours ?`, r: k * 24, e: `1 jour = 24 h : ${k} × 24` }; },
    () => { const k = entre(2, 9); return { t: `Combien y a-t-il de secondes dans ${k} min ?`, r: k * 60, e: `1 min = 60 s : ${k} × 60` }; },
    () => { const k = entre(2, 9); return { t: `Combien y a-t-il d'années dans ${k} siècles ?`, r: k * 100, e: `1 siècle = 100 ans : ${k} × 100` }; },
    () => { const k = entre(1, 5); return { t: `Combien de minutes durent ${k} h et demie ?`, r: k * 60 + 30, e: `${k} h = ${k * 60} min, et une demi-heure = 30 min : ${k * 60} + 30` }; },
    () => { const k = entre(1, 5); return { t: `Combien de minutes durent ${k} h et quart ?`, r: k * 60 + 15, e: `${k} h = ${k * 60} min, et un quart d'heure = 15 min : ${k * 60} + 15` }; },
  ]);
  const { t, r, e } = q();
  return { text: t, format: "short", expected: accepte(r), explanation: `${e}.\nRéponse : ${nb(r)}.` };
}

/* ═══════════════ GÉOMÉTRIE PLANE : CODAGE, FIGURES, AXES ═══════════════ */

function geometrie6e(): AutoQuestion {
  const cas = entre(1, 3);
  if (cas === 1) {
    const [A, B, C, D] = pick(["ABCD", "EFGH", "MNOP", "RSTU", "IJKL"]).split("");
    const c = pick([
      { t: `Sur la figure, un petit carré est dessiné au sommet ${B}, entre [${A}${B}] et [${B}${C}]. Que signifie ce codage ?`, r: "un angle droit", p: ["deux longueurs égales", "deux angles égaux", "un milieu"] },
      { t: `Sur la figure, les segments [${A}${B}] et [${C}${D}] portent le même petit trait. Que signifie ce codage ?`, r: "deux longueurs égales", p: ["un angle droit", "deux angles égaux", "deux droites parallèles"] },
      { t: `Sur la figure, les angles en ${A} et en ${C} portent le même petit arc. Que signifie ce codage ?`, r: "deux angles égaux", p: ["un angle droit", "deux longueurs égales", "un milieu"] },
    ]);
    return { text: c.t, format: "qcm", choices: qcm(c.r, c.p), expected: [c.r], explanation: `Petit carré : angle droit. Même petit trait : même longueur. Même petit arc : même mesure d'angle.\nIci : ${c.r}.` };
  }
  if (cas === 2) {
    const nom = pick(["ABCD", "EFGH", "MNOP", "RSTU", "IJKL"]);
    const f = pick([
      { t: `Le quadrilatère ${nom} a ses quatre angles codés droits et ses quatre côtés codés égaux.`, r: "un carré" },
      { t: `Le quadrilatère ${nom} a ses quatre angles codés droits ; ses côtés ne sont pas tous égaux.`, r: "un rectangle" },
      { t: `La figure ${nom.slice(0, 3)} a trois côtés.`, r: "un triangle" },
    ]);
    return { text: `${f.t} Quelle est cette figure ?`, format: "qcm", choices: qcm(f.r, ["un carré", "un rectangle", "un triangle", "un losange"]), expected: [f.r], explanation: `Carré : 4 angles droits et 4 côtés égaux. Rectangle : 4 angles droits. Triangle : 3 côtés.\nC'est ${f.r}.` };
  }
  const n = pick([
    { f: "un carré", r: 4 }, { f: "un rectangle (qui n'est pas un carré)", r: 2 }, { f: "un losange (qui n'est pas un carré)", r: 2 },
    { f: "un triangle équilatéral", r: 3 }, { f: "un triangle isocèle (non équilatéral)", r: 1 }, { f: "un triangle quelconque", r: 0 },
    { f: "un parallélogramme quelconque", r: 0 }, { f: "un hexagone régulier", r: 6 }, { f: "un segment", r: 2 },
  ]);
  return {
    text: `Combien d'axes de symétrie a ${n.f} ?`,
    format: "short",
    expected: accepte(n.r),
    explanation: `Un axe de symétrie plie la figure en deux moitiés qui se superposent exactement.\n${n.f[0].toUpperCase()}${n.f.slice(1)} en a ${n.r}.`,
  };
}

/* ═══════════════ SOLIDES ═══════════════ */

const SOLIDES = [
  { kind: "cube", nom: "un cube", d: "a six faces carrées identiques" },
  { kind: "pave_droit", nom: "un pavé droit", d: "a six faces rectangulaires, opposées deux à deux" },
  { kind: "prisme", nom: "un prisme droit", d: "a deux bases polygonales identiques et parallèles, reliées par des rectangles" },
  { kind: "cylindre", nom: "un cylindre", d: "a deux bases qui sont des disques identiques et parallèles" },
  { kind: "cone", nom: "un cône", d: "a une base qui est un disque, et un sommet" },
  { kind: "boule", nom: "une boule", d: "est parfaitement ronde, sans face plane" },
  { kind: "pyramide", nom: "une pyramide", d: "a une base polygonale, et des faces triangulaires qui se rejoignent en un sommet" },
] as const;

function solides6e(): AutoQuestion {
  const s = pick(SOLIDES);
  const pieges = SOLIDES.map((x) => x.nom);
  if (Math.random() < 0.6) {
    // Le solide dessiné en perspective (le canvas `solide_3d` du coach)
    const canvas = { kind: "solide_3d", solide: s.kind, display: { showLabels: false, showDimensions: false } } as unknown as CanvasFigure;
    return { text: "Quel est ce solide ?", format: "qcm", choices: qcm(s.nom, pieges), expected: [s.nom], explanation: `On regarde les faces : ce solide ${s.d}.\nC'est ${s.nom}.`, canvas };
  }
  return { text: `Quel solide ${s.d} ?`, format: "qcm", choices: qcm(s.nom, pieges), expected: [s.nom], explanation: `Un solide se reconnaît à ses faces et à ses bases.\nC'est ${s.nom}.` };
}

/* ═══════════════ PROPORTIONNALITÉ : RELATIONS MULTIPLICATIVES ═══════════════ */

function relations6e(): AutoQuestion {
  if (Math.random() < 0.5) {
    const r = pick([
      { mot: "le double", k: 2, fois: true },
      { mot: "le quadruple", k: 4, fois: true },
      { mot: "la moitié", k: 2, fois: false },
      { mot: "le tiers", k: 3, fois: false },
      { mot: "le quart", k: 4, fois: false },
    ]);
    const n = r.fois ? entre(6, 99) : r.k * entre(3, 40);
    const res = r.fois ? n * r.k : n / r.k;
    return { text: `${r.mot.startsWith("la ") ? "Quelle" : "Quel"} est ${r.mot} de ${n} ?`, format: "short", expected: accepte(res), explanation: `${r.mot[0].toUpperCase()}${r.mot.slice(1)}, c'est ${r.fois ? "multiplier" : "diviser"} par ${r.k}.\n${n} ${r.fois ? "×" : "÷"} ${r.k} = ${res}.` };
  }
  const k = entre(2, 6);
  const fois = Math.random() < 0.5;
  const base = fois ? entre(3, 25) : k * entre(3, 25);
  const res = fois ? base * k : base / k;
  const plusMoins = fois ? "plus" : "moins";
  // ⛔ Des phrases entières, écrites une à une : « mesure 3 fois plus haut que »
  // et « que Inès » sortaient d'un gabarit à trous (26/09).
  const phrase = pick([
    () => `Tom a ${base} billes. Léa a ${k} fois ${plusMoins} de billes que Tom. Combien Léa a-t-elle de billes ?`,
    () => `Ce chat pèse ${base} kg. Ce chien pèse ${k} fois ${plusMoins} que ce chat. Combien pèse ce chien, en kg ?`,
    () => `Inès a ${base} €. Sami a ${k} fois ${plusMoins} d'argent qu'Inès. Combien Sami a-t-il, en € ?`,
    () => `Une maison mesure ${base} m de haut. Une tour est ${k} fois ${fois ? "plus haute" : "moins haute"} que cette maison. Combien mesure la tour, en m ?`,
    () => `Une corde mesure ${base} m. Une ficelle est ${k} fois ${fois ? "plus longue" : "plus courte"} que cette corde. Combien mesure la ficelle, en m ?`,
  ])();
  return {
    text: phrase,
    format: "short",
    expected: accepte(res),
    explanation: `« ${k} fois ${fois ? "plus" : "moins"} » (ou « ${k} fois plus ${fois ? "grand" : "petit"} »), c'est ${fois ? "multiplier" : "diviser"} par ${k}.
${base} ${fois ? "×" : "÷"} ${k} = ${res}.`,
  };
}

/* ═══════════════ LE NIVEAU ═══════════════ */

export const automatismes6e: AutoNiveau = {
  classe: "6e",
  label: "6e",
  duree: 15,
  examen: "Pas d'épreuve en 6e : les automatismes que le programme de 6e demande, sur ce qui a été vu au CM, de tête, sans calculatrice",
  nbQuestions: 10,
  themes: [
    { id: "numeration", label: "Unités, dixièmes, centièmes, millièmes", generateurs: [numeration6e] },
    { id: "fractions", label: "Fractions", generateurs: [fractions6e] },
    { id: "longueurs", label: "Longueurs et conversions", generateurs: [longueurs6e] },
    { id: "perimetres", label: "Périmètre du carré et du rectangle", generateurs: [perimetres6e] },
    { id: "aires", label: "Aires", generateurs: [aires6e] },
    { id: "durees", label: "Heures et durées", generateurs: [durees6e] },
    { id: "geometrie", label: "Codage, figures, axes de symétrie", generateurs: [geometrie6e] },
    { id: "solides", label: "Solides", generateurs: [solides6e] },
    { id: "donnees", label: "Lire un graphique", generateurs: [lireValeur, lireVariation, lireInstant] },
    { id: "proportionnalite", label: "Double, moitié, « fois plus », « fois moins »", generateurs: [relations6e] },
  ],
};
