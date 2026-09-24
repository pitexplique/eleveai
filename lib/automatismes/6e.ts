// lib/automatismes/6e.ts
//
// Automatismes de 6e — 24/09/2026.
//
// Pas d'épreuve en 6e. La référence est le programme de 6e tel que le coach le
// porte (knowledge/maths/6e) : décimaux, calcul mental, fractions (y compris
// les additionner et les multiplier par un entier), pourcentages simples,
// proportionnalité, échelles, longueurs, périmètres (disque compris : P = π × d),
// aires (rectangle, carré, figures décomposées), volumes PAR COMPTAGE de cubes,
// angles, triangles, quadrilatères, somme des angles, milieu, bissectrice,
// durées et horaires, symétrie axiale, Scratch.
// ⛔ Pas au programme de 6e, donc jamais posé ici : les relatifs en calcul,
// l'aire du triangle et celle du disque, l'algèbre, Pythagore.
// Repris de 3e.ts quand c'est au programme de 6e : fraction d'un nombre, droite
// graduée, pourcentage d'un effectif, proportionnalité, durées, somme des
// angles, lecture de graphique, Scratch.

import type { AutoNiveau, AutoQuestion } from "./types";
import {
  convertirDurees,
  droiteGraduee,
  fractionDe,
  lireInstant,
  lireValeur,
  lireVariation,
  pctEffectif,
  polygone,
  programmeCalcul,
  proportionnalite,
  sommeAngles,
} from "./3e";

/* ─────────────────────────── outils ─────────────────────────── */

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function entre(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function fr(n: number): string {
  return String(Math.round(n * 1e6) / 1e6).replace(".", ",");
}

function accepte(n: number): string[] {
  const s = fr(n);
  return Array.from(new Set([s, s.replace(",", ".")]));
}

/** Un décimal tiré de tête : `entier` + `dec` centièmes, jamais de flottant. */
function dec(entierMin: number, entierMax: number, chiffres: 1 | 2): number {
  const e = entre(entierMin, entierMax);
  const d = chiffres === 1 ? entre(1, 9) / 10 : entre(1, 99) / 100;
  return Math.round((e + d) * 100) / 100;
}

/* ═══════════════ NOMBRES DÉCIMAUX ═══════════════ */

function decimaux(): AutoQuestion {
  const cas = entre(1, 4);
  if (cas === 1) {
    // Le piège classique : 3,5 contre 3,25 (« 25 est plus grand que 5 »).
    const e = entre(0, 20);
    const a = e + entre(1, 9) / 10, b = e + entre(11, 99) / 100;
    if (Math.round(a * 100) === Math.round(b * 100)) return decimaux();
    const g = a > b ? a : b;
    return {
      text: `Quel est le plus grand des deux nombres ${fr(a)} et ${fr(b)} ?`,
      format: "short",
      expected: accepte(g),
      explanation: `On compare chiffre par chiffre, en commençant par la gauche : mêmes unités, puis les dixièmes.\n${fr(a)} = ${fr(a)}0 : on compare ${fr(a)}0 et ${fr(b)}. Le plus grand est ${fr(g)}. (Le nombre de chiffres après la virgule ne compte pas.)`,
    };
  }
  if (cas === 2) {
    const n = dec(1, 99, 2);
    const rang = pick(["unité", "dixième"] as const);
    const r = rang === "unité" ? Math.round(n) : Math.round(n * 10) / 10;
    return {
      text: `Arrondir ${fr(n)} ${rang === "unité" ? "à l'unité" : "au dixième"}.`,
      format: "short",
      expected: accepte(r),
      explanation: `On regarde le chiffre juste APRÈS le rang voulu : s'il vaut 5 ou plus, on arrondit au-dessus.\n${fr(n)} ≈ ${fr(r)}.`,
    };
  }
  if (cas === 3) {
    const n = entre(10, 999) + entre(100, 999) / 1000;
    const s = fr(n);
    const [ent, decs] = s.split(",");
    const rang = pick(["dixièmes", "centièmes", "millièmes", "dizaines"] as const);
    const chiffre = rang === "dixièmes" ? decs[0] : rang === "centièmes" ? decs[1] : rang === "millièmes" ? decs[2] : ent[ent.length - 2];
    if (!chiffre) return decimaux();
    return {
      text: `Dans le nombre ${s}, quel est le chiffre des ${rang} ?`,
      format: "short",
      expected: [chiffre],
      explanation: `Après la virgule : dixièmes, centièmes, millièmes. Avant : unités, dizaines, centaines.\nLe chiffre des ${rang} de ${s} est ${chiffre}.`,
    };
  }
  const n = dec(1, 50, 2);
  return {
    text: `Entre quels deux nombres entiers consécutifs se trouve ${fr(n)} ? Donner le plus petit.`,
    format: "short",
    expected: accepte(Math.floor(n)),
    explanation: `${Math.floor(n)} < ${fr(n)} < ${Math.floor(n) + 1}.\nLe plus petit est ${Math.floor(n)}.`,
  };
}

/* ═══════════════ CALCUL MENTAL ═══════════════ */

function calculMental(): AutoQuestion {
  const cas = entre(1, 5);
  if (cas === 1) {
    const a = dec(1, 20, 1), b = dec(1, 20, 2);
    const r = Math.round((a + b) * 100) / 100;
    return { text: `Calculer ${fr(a)} + ${fr(b)}.`, format: "short", expected: accepte(r), explanation: `On aligne les virgules : unités avec unités, dixièmes avec dixièmes.\n${fr(a)} + ${fr(b)} = ${fr(r)}.` };
  }
  if (cas === 2) {
    const a = dec(10, 30, 1), b = dec(1, 9, 1);
    const r = Math.round((a - b) * 100) / 100;
    return { text: `Calculer ${fr(a)} − ${fr(b)}.`, format: "short", expected: accepte(r), explanation: `On aligne les virgules.\n${fr(a)} − ${fr(b)} = ${fr(r)}.` };
  }
  if (cas === 3) {
    const n = dec(1, 99, 2), k = pick([10, 100, 1000, 0.1, 0.01] as const).valueOf();
    const r = Math.round(n * k * 10000) / 10000;
    return {
      text: `Calculer ${fr(n)} × ${fr(k)}.`,
      format: "short",
      expected: accepte(r),
      explanation: k >= 10
        ? `Multiplier par ${k}, c'est décaler la virgule de ${String(k).length - 1} rang(s) vers la DROITE.\n${fr(n)} × ${k} = ${fr(r)}.`
        : `Multiplier par ${fr(k)}, c'est diviser par ${fr(1 / k)} : la virgule recule de ${k === 0.1 ? 1 : 2} rang(s) vers la GAUCHE.\n${fr(n)} × ${fr(k)} = ${fr(r)}.`,
    };
  }
  if (cas === 4) {
    const b = entre(2, 9), q = dec(1, 12, 1);
    const a = Math.round(b * q * 10) / 10;
    return { text: `Calculer ${fr(a)} ÷ ${b}.`, format: "short", expected: accepte(q), explanation: `${b} × ${fr(q)} = ${fr(a)}, donc ${fr(a)} ÷ ${b} = ${fr(q)}.` };
  }
  const [x, y] = pick([[25, 4], [50, 8], [125, 8], [25, 12], [5, 18], [50, 14], [20, 35], [4, 75]] as const);
  const k = entre(1, 3);
  return {
    text: `Calculer ${x} × ${y * k} de tête.`,
    format: "short",
    expected: accepte(x * y * k),
    explanation: `On cherche un produit « rond » : ${x} × ${y} = ${x * y}.\n${x} × ${y * k} = ${x * y} × ${k} = ${x * y * k}.`,
  };
}

/* ═══════════════ FRACTIONS DE 6e ═══════════════ */

function fractions6e(): AutoQuestion {
  const cas = entre(1, 4);
  if (cas === 1) {
    const d = pick([3, 4, 5, 6, 7, 8, 9, 10] as const).valueOf();
    const a = entre(1, d - 1), b = entre(1, d - 1);
    const plus = Math.random() < 0.5 || a <= b;
    const n = plus ? a + b : a - b;
    return {
      text: `Calculer $\\dfrac{${a}}{${d}} ${plus ? "+" : "-"} \\dfrac{${b}}{${d}}$. (Écrire une fraction de dénominateur ${d}.)`,
      format: "short",
      expected: [`${n}/${d}`],
      explanation: `Même dénominateur : on ${plus ? "additionne" : "soustrait"} les numérateurs et on GARDE le dénominateur.\n$\\dfrac{${a} ${plus ? "+" : "-"} ${b}}{${d}} = \\dfrac{${n}}{${d}}$.`,
    };
  }
  if (cas === 2) {
    const d = pick([3, 4, 5, 6, 7, 9] as const).valueOf(), a = entre(1, d - 1), k = entre(2, 9);
    return {
      text: `Calculer ${k} × $\\dfrac{${a}}{${d}}$. (Écrire une fraction de dénominateur ${d}.)`,
      format: "short",
      expected: [`${k * a}/${d}`],
      explanation: `On multiplie le numérateur seulement : ${k} fois ${a} ${d}ᵉ${a > 1 ? "s" : ""}.\n$\\dfrac{${k} \\times ${a}}{${d}} = \\dfrac{${k * a}}{${d}}$.`,
    };
  }
  if (cas === 3) {
    const [n, d] = pick([[1, 2], [1, 4], [3, 4], [1, 5], [2, 5], [7, 10], [3, 10], [9, 10], [3, 2], [5, 4], [13, 10], [11, 4]] as const);
    return {
      text: `Écrire $\\dfrac{${n}}{${d}}$ sous forme décimale.`,
      format: "short",
      expected: accepte(n / d),
      explanation: `$\\dfrac{${n}}{${d}} = ${n} \\div ${d} = ${fr(n / d)}$.`,
    };
  }
  const d = pick([3, 4, 5, 6, 7, 8] as const).valueOf(), n = entre(1, 2 * d);
  if (n === d) return fractions6e();
  const plus = n > d;
  return {
    text: `La fraction $\\dfrac{${n}}{${d}}$ est-elle plus grande ou plus petite que 1 ? (Répondre « plus grande » ou « plus petite ».)`,
    format: "short",
    expected: plus ? ["plus grande", "plus grand", "supérieure", "superieure"] : ["plus petite", "plus petit", "inférieure", "inferieure"],
    explanation: `$1 = \\dfrac{${d}}{${d}}$. Le numérateur ${n} est ${plus ? "plus grand" : "plus petit"} que le dénominateur ${d}.\nDonc $\\dfrac{${n}}{${d}}$ est ${plus ? "plus grande" : "plus petite"} que 1.`,
  };
}

/* ═══════════════ POURCENTAGES SIMPLES ═══════════════ */

function pourcentages6e(): AutoQuestion {
  if (Math.random() < 0.5) return pctEffectif();
  const [p, f, dval] = pick([[50, "1/2", 0.5], [25, "1/4", 0.25], [75, "3/4", 0.75], [10, "1/10", 0.1], [20, "1/5", 0.2]] as const);
  const sens = pick(["fraction", "decimal"] as const);
  return {
    text: sens === "fraction"
      ? `Écrire ${p} % sous la forme d'une fraction simple.`
      : `Écrire ${p} % sous la forme d'un nombre décimal.`,
    format: "short",
    expected: sens === "fraction" ? [f] : accepte(dval),
    explanation: `${p} % $= \\dfrac{${p}}{100}$` + (sens === "fraction" ? ` $= \\dfrac{${f.split("/")[0]}}{${f.split("/")[1]}}$.` : ` $= ${fr(dval)}$.`),
  };
}

/* ═══════════════ LONGUEURS, MILIEU, BISSECTRICE ═══════════════ */

function longueurs(): AutoQuestion {
  const cas = entre(1, 3);
  if (cas === 1) {
    const q = pick([
      () => { const v = dec(1, 9, 1); return { t: `Convertir ${fr(v)} m en cm.`, r: v * 100, e: `1 m = 100 cm : on multiplie par 100.\n${fr(v)} × 100 = ${fr(v * 100)} cm.` }; },
      () => { const v = entre(12, 950); return { t: `Convertir ${v} cm en m.`, r: v / 100, e: `On divise par 100.\n${v} ÷ 100 = ${fr(v / 100)} m.` }; },
      () => { const v = dec(1, 9, 1); return { t: `Convertir ${fr(v)} km en m.`, r: v * 1000, e: `1 km = 1 000 m.\n${fr(v)} × 1 000 = ${fr(v * 1000)} m.` }; },
      () => { const v = entre(2, 99); return { t: `Convertir ${v} mm en cm.`, r: v / 10, e: `1 cm = 10 mm : on divise par 10.\n${v} ÷ 10 = ${fr(v / 10)} cm.` }; },
      () => { const v = entre(150, 9500); return { t: `Convertir ${v.toLocaleString("fr-FR").replace(/\u202f|\u00a0/g, " ")} m en km.`, r: v / 1000, e: `On divise par 1 000.\n${v} ÷ 1 000 = ${fr(v / 1000)} km.` }; },
    ]);
    const { t, r, e } = q();
    return { text: t, format: "short", expected: accepte(Math.round(r * 1000) / 1000), explanation: e };
  }
  if (cas === 2) {
    const ab = pick([6, 8, 9, 11, 13, 15, 7, 10.4, 12.6] as const).valueOf();
    return {
      text: `M est le milieu du segment [AB] et AB = ${fr(ab)} cm. Combien mesure AM, en cm ?`,
      format: "short",
      expected: accepte(ab / 2),
      explanation: `Le milieu partage le segment en deux longueurs ÉGALES.\n${fr(ab)} ÷ 2 = ${fr(ab / 2)} cm.`,
    };
  }
  const a = 2 * entre(10, 85);
  return {
    text: `La demi-droite [Oz) est la bissectrice de l'angle $\\widehat{xOy}$, qui mesure ${a}°. Combien mesure $\\widehat{xOz}$, en degrés ?`,
    format: "short",
    expected: accepte(a / 2),
    explanation: `La bissectrice partage l'angle en deux angles ÉGAUX.\n${a} ÷ 2 = ${a / 2}°.`,
  };
}

/* ═══════════════ PÉRIMÈTRES, AIRES, VOLUMES ═══════════════ */

function perimetres6e(): AutoQuestion {
  const cas = entre(1, 3);
  if (cas === 1) {
    const c = entre(3, 15);
    return { text: `Quel est le périmètre d'un carré de côté ${c} cm, en cm ?`, format: "short", expected: accepte(4 * c), explanation: `Un carré a 4 côtés égaux.\n4 × ${c} = ${4 * c} cm.` };
  }
  if (cas === 2) {
    const L = entre(5, 20), l = entre(2, L - 1);
    return { text: `Quel est le périmètre d'un rectangle de ${L} cm sur ${l} cm, en cm ?`, format: "short", expected: accepte(2 * (L + l)), explanation: `On fait le tour : ${L} + ${l} + ${L} + ${l}, soit 2 × (${L} + ${l}).\n${2 * (L + l)} cm.` };
  }
  const d = entre(2, 12);
  return {
    text: `Un disque a un diamètre de ${d} cm. Donner la valeur exacte de son périmètre, en fonction de $\\pi$.`,
    format: "short",
    expected: [`${d}π`, `${d} π`, `${d}pi`, `${d} pi`, `π×${d}`, `${d}×π`],
    explanation: `Le périmètre d'un disque est proportionnel à son diamètre : $P = \\pi \\times d$.\n$P = ${d}\\pi$ cm (environ ${fr(Math.round(d * 314) / 100)} cm).`,
  };
}

function aires6e(): AutoQuestion {
  const cas = entre(1, 4);
  if (cas === 1) {
    const L = entre(3, 12), l = entre(2, 9);
    return { text: `Quelle est l'aire d'un rectangle de ${L} cm sur ${l} cm, en cm² ?`, format: "short", expected: accepte(L * l), explanation: `Aire du rectangle = longueur × largeur.\n${L} × ${l} = ${L * l} cm².` };
  }
  if (cas === 2) {
    const c = entre(2, 12);
    return { text: `Quelle est l'aire d'un carré de côté ${c} m, en m² ?`, format: "short", expected: accepte(c * c), explanation: `Aire du carré = côté × côté.\n${c} × ${c} = ${c * c} m².` };
  }
  if (cas === 3) {
    // Une figure en L : un grand rectangle moins un petit.
    const L = entre(6, 10), l = entre(5, 8), a = entre(2, L - 3), b = entre(2, l - 3);
    return {
      text: `Une pièce a la forme d'un rectangle de ${L} m sur ${l} m, auquel on a retiré un coin rectangulaire de ${a} m sur ${b} m. Quelle est son aire, en m² ?`,
      format: "short",
      expected: accepte(L * l - a * b),
      explanation: `On calcule le grand rectangle, puis on retire le coin.\n${L} × ${l} − ${a} × ${b} = ${L * l} − ${a * b} = ${L * l - a * b} m².`,
    };
  }
  const v = entre(2, 9);
  return { text: `Convertir ${v} m² en dm².`, format: "short", expected: accepte(v * 100), explanation: `1 m = 10 dm, donc 1 m² = 10 × 10 = 100 dm².\n${v} × 100 = ${v * 100} dm².` };
}

function volumes6e(): AutoQuestion {
  const a = entre(2, 6), b = entre(2, 5), c = entre(1, 4);
  return {
    text: `On empile des petits cubes pour former un pavé de ${a} cubes de long, ${b} de large et ${c} de haut. Combien de petits cubes faut-il ?`,
    format: "short",
    expected: accepte(a * b * c),
    explanation: `Une couche compte ${a} × ${b} = ${a * b} cubes, et il y a ${c} couche${c > 1 ? "s" : ""}.\n${a * b} × ${c} = ${a * b * c} cubes.`,
  };
}

/* ═══════════════ TRIANGLES, QUADRILATÈRES ═══════════════ */

function figures6e(): AutoQuestion {
  const q = pick([
    { t: "un quadrilatère qui a 4 angles droits et 4 côtés de même longueur", r: ["carré", "un carré", "carre"] },
    { t: "un quadrilatère qui a 4 angles droits (ses côtés ne sont pas tous égaux)", r: ["rectangle", "un rectangle"] },
    { t: "un quadrilatère qui a 4 côtés de même longueur (sans angle droit)", r: ["losange", "un losange"] },
    { t: "un triangle qui a deux côtés de même longueur", r: ["isocèle", "isocele", "triangle isocèle", "un triangle isocèle"] },
    { t: "un triangle qui a trois côtés de même longueur", r: ["équilatéral", "equilateral", "triangle équilatéral", "un triangle équilatéral"] },
    { t: "un triangle qui a un angle droit", r: ["rectangle", "triangle rectangle", "un triangle rectangle"] },
    { t: "un triangle dont les trois côtés sont de longueurs différentes", r: ["quelconque", "scalène", "triangle quelconque"] },
    { t: "un angle qui mesure exactement 90°", r: ["droit", "angle droit", "un angle droit"] },
    { t: "un angle qui mesure moins de 90°", r: ["aigu", "angle aigu", "un angle aigu"] },
    { t: "un angle qui mesure entre 90° et 180°", r: ["obtus", "angle obtus", "un angle obtus"] },
    { t: "un angle qui mesure exactement 180°", r: ["plat", "angle plat", "un angle plat"] },
  ]);
  const tirage = Math.random();
  if (tirage < 0.35) {
    // Cas GÉNÉRÉ : la nature d'un triangle d'après ses longueurs (le vocabulaire
    // seul ne donnait que 17 questions au thème, seuil 30).
    const a = entre(3, 12);
    const forme = pick(["equi", "iso", "quelc"] as const);
    let b = a, c = a;
    if (forme === "iso") { c = entre(2, 2 * a - 1); if (c === a) c = a + 1; }
    if (forme === "quelc") { b = a + entre(1, 3); c = a + b - entre(1, 3); if (c === a || c === b) c = b + 1; }
    const cotes = [a, b, c].sort(() => Math.random() - 0.5);
    const rep = forme === "equi" ? ["équilatéral", "equilateral"] : forme === "iso" ? ["isocèle", "isocele"] : ["quelconque", "scalène", "scalene"];
    return {
      text: `Un triangle a des côtés de ${cotes.join(" cm, ")} cm. Est-il équilatéral, isocèle ou quelconque ?`,
      format: "short",
      expected: rep,
      explanation: `On compte les côtés de même longueur : trois → équilatéral, deux → isocèle, aucun → quelconque.\nIci : ${rep[0]}.`,
    };
  }
  if (tirage < 0.6) {
    const n = pick([
      { f: "un carré", r: 4 }, { f: "un rectangle (non carré)", r: 2 }, { f: "un losange (non carré)", r: 2 },
      { f: "un triangle équilatéral", r: 3 }, { f: "un triangle isocèle (non équilatéral)", r: 1 }, { f: "un cercle", r: "une infinité" },
    ]);
    return {
      text: `Combien ${n.f} a-t-il d'axes de symétrie ?${n.r === "une infinité" ? " (Répondre en toutes lettres si besoin.)" : ""}`,
      format: "short",
      expected: typeof n.r === "number" ? accepte(n.r) : ["une infinité", "infinité", "infini", "une infinite"],
      explanation: `Un axe de symétrie plie la figure en deux moitiés qui se superposent.\n${n.f[0].toUpperCase()}${n.f.slice(1)} en a ${typeof n.r === "number" ? n.r : "une infinité (chaque diamètre)"}.`,
    };
  }
  return {
    text: `Comment appelle-t-on ${q.t} ? (Un seul mot suffit.)`,
    format: "short",
    expected: q.r,
    explanation: `On le nomme d'après ses côtés et ses angles : ${q.t}, c'est « ${q.r[0]} ».`,
  };
}

/* ═══════════════ ÉCHELLES, HORAIRES ═══════════════ */

function echelles6e(): AutoQuestion {
  const e = pick([100, 200, 1000, 10000, 50000] as const).valueOf();
  const cm = entre(2, 9);
  const reelCm = cm * e;
  const versReel = Math.random() < 0.6;
  const enM = reelCm < 100000;
  const reel = enM ? reelCm / 100 : reelCm / 100000;
  const echelle = `1/${e.toLocaleString("fr-FR").replace(/\u202f|\u00a0/g, " ")}`;
  if (versReel) {
    return {
      text: `Sur un plan à l'échelle ${echelle}, un mur mesure ${cm} cm. Quelle est sa longueur réelle, en ${enM ? "m" : "km"} ?`,
      format: "short",
      expected: accepte(reel),
      explanation: `1 cm sur le plan représente ${e} cm en vrai.\n${cm} × ${e} = ${reelCm} cm, soit ${fr(reel)} ${enM ? "m" : "km"}.`,
    };
  }
  return {
    text: `Sur un plan à l'échelle ${echelle}, quelle longueur, en cm, représente ${fr(reel)} ${enM ? "m" : "km"} réels ?`,
    format: "short",
    expected: accepte(cm),
    explanation: `${fr(reel)} ${enM ? "m" : "km"} = ${reelCm} cm, et on divise par ${e}.\n${reelCm} ÷ ${e} = ${cm} cm.`,
  };
}

function horaires(): AutoQuestion {
  const h = entre(8, 20), m = pick([0, 10, 15, 20, 30, 40, 45, 50] as const).valueOf();
  const dh = entre(0, 2), dm = pick([15, 20, 25, 30, 35, 40, 45, 50] as const).valueOf();
  const fin = h * 60 + m + dh * 60 + dm;
  const fh = Math.floor(fin / 60) % 24, fm = fin % 60;
  const deux = (x: number) => String(x).padStart(2, "0");
  // ⛔ Le pronom suit le sujet : « une randonnée […] se termine-t-ELLE »,
  // et un train ne « dure » pas — c'est le trajet (aperçu du 24/09).
  const ctx = pick([
    { s: "Un film", il: "il" },
    { s: "Un match", il: "il" },
    { s: "Un trajet en train", il: "il" },
    { s: "Une randonnée", il: "elle" },
    { s: "Une émission", il: "elle" },
  ]);
  return {
    text: `${ctx.s} commence à ${h} h ${deux(m)} et dure ${dh ? `${dh} h ` : ""}${dm} min. À quelle heure se termine-t-${ctx.il} ? (Écrire par exemple 14 h 05.)`,
    format: "short",
    expected: [`${fh} h ${deux(fm)}`, `${fh}h${deux(fm)}`, `${fh}:${deux(fm)}`, `${fh} h ${fm}`, `${fh}h${fm}`],
    explanation: `On ajoute les heures, puis les minutes ; 60 min font 1 h.\n${h} h ${deux(m)} + ${dh ? `${dh} h ` : ""}${dm} min = ${fh} h ${deux(fm)}.`,
  };
}

/* ═══════════════ RÉDIGER, À LA MESURE DE LA 6e ═══════════════ */

const CRITERE_ORTHO = "Ma phrase est complète, avec une majuscule, un point et sans faute d'orthographe.";

function redigerDecimaux(): AutoQuestion {
  const e = entre(1, 9), a = entre(3, 8), b = entre(11, a * 10 - 1);
  if (Math.floor(b / 10) >= a) return redigerDecimaux();
  return {
    text: `Tom dit : « ${e},${b} est plus grand que ${e},${a}, car ${b} est plus grand que ${a}. » **A-t-il raison ? Expliquer.**`,
    format: "redaction",
    expected: [],
    modele: `Non, Tom a tort. On compare d'abord les dixièmes : ${e},${a} a ${a} dixièmes et ${e},${b} n'en a que ${Math.floor(b / 10)}. Donc ${e},${a} est plus grand que ${e},${b}. On peut aussi écrire ${e},${a}0 et comparer ${a}0 centièmes à ${b} centièmes.`,
    criteres: ["J'ai dit clairement que Tom a tort.", "J'ai expliqué avec les dixièmes (ou en ajoutant un zéro).", CRITERE_ORTHO],
    explanation: "Le nombre de chiffres après la virgule ne dit pas qui est le plus grand : on compare rang par rang, dixièmes d'abord.",
  };
}

function redigerPerimetreAire(): AutoQuestion {
  const L = entre(4, 9), l = entre(2, L - 1);
  return {
    text: `Un rectangle mesure ${L} cm sur ${l} cm. **Expliquer la différence entre son périmètre et son aire, puis donner les deux avec leur unité.**`,
    format: "redaction",
    expected: [],
    modele: `Le périmètre est la longueur du tour de la figure : ${L} + ${l} + ${L} + ${l} = ${2 * (L + l)} cm. L'aire est la surface à l'intérieur : ${L} × ${l} = ${L * l} cm². Le périmètre se mesure en cm, l'aire en cm².`,
    criteres: ["J'ai expliqué ce que mesure chacun (le tour, la surface).", "J'ai donné les deux résultats avec la bonne unité (cm et cm²).", CRITERE_ORTHO],
    explanation: "Périmètre et aire ne mesurent pas la même chose : une longueur d'un côté, une surface de l'autre.",
  };
}

function redigerProportion(): AutoQuestion {
  // Objet, prix unitaire, quantité et multiplicateur tirés à part : le premier
  // jet n'avait que 6 énoncés (24/09).
  const objet = pick(["cahiers", "stylos", "baguettes", "classeurs", "billets de bus"]);
  const p = entre(2, 6), n = entre(2, 4), k = entre(2, 5);
  return {
    text: `${n} ${objet} coûtent ${p * n} €. **Expliquer comment trouver le prix de ${n * k} ${objet}, sans calculer le prix d'un seul.**`,
    format: "redaction",
    expected: [],
    modele: `${n * k} ${objet}, c'est ${k} fois ${n} ${objet}. Le prix est donc ${k} fois plus grand : ${k} × ${p * n} = ${p * n * k} €.`,
    criteres: [`J'ai repéré combien de fois plus de ${objet} il y a.`, "J'ai multiplié le prix par ce même nombre et donné le résultat en €.", CRITERE_ORTHO],
    explanation: `Si la quantité est multipliée par ${k}, le prix l'est aussi : c'est la proportionnalité.`,
  };
}

/* ═══════════════ LE NIVEAU ═══════════════ */

export const automatismes6e: AutoNiveau = {
  classe: "6e",
  label: "6e",
  duree: 15,
  examen: "Pas d'épreuve en 6e : les automatismes du programme de 6e, de tête, pour bien démarrer le collège",
  nbQuestions: 10,
  toujours: ["rediger"],
  themes: [
    { id: "decimaux", label: "Nombres décimaux", generateurs: [decimaux] },
    { id: "calcul", label: "Calcul mental", generateurs: [calculMental] },
    { id: "fractions", label: "Fractions", generateurs: [fractions6e, fractionDe, droiteGraduee] },
    { id: "pourcentages", label: "Pourcentages", generateurs: [pourcentages6e] },
    { id: "proportionnalite", label: "Proportionnalité et échelles", generateurs: [proportionnalite, echelles6e] },
    { id: "longueurs", label: "Longueurs, milieu, bissectrice", generateurs: [longueurs] },
    { id: "perimetres", label: "Périmètres", generateurs: [perimetres6e] },
    { id: "aires", label: "Aires", generateurs: [aires6e] },
    { id: "volumes", label: "Volumes", generateurs: [volumes6e] },
    { id: "figures", label: "Triangles, quadrilatères, symétrie", generateurs: [figures6e] },
    { id: "angles", label: "Angles d'un triangle", generateurs: [sommeAngles] },
    { id: "durees", label: "Durées et horaires", generateurs: [convertirDurees, horaires] },
    { id: "graphique", label: "Lire un graphique", generateurs: [lireValeur, lireVariation, lireInstant] },
    { id: "scratch", label: "Scratch", generateurs: [programmeCalcul, polygone] },
    { id: "rediger", label: "Rédiger une réponse", generateurs: [redigerDecimaux, redigerPerimetreAire, redigerProportion] },
  ],
};
