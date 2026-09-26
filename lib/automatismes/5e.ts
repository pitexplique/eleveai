// lib/automatismes/5e.ts
//
// Automatismes de 5e — 24/09/2026, réalignés le 26/09/2026.
//
// ⭐ RÉFÉRENCE : la rubrique « Automatismes » de 5e du nouveau programme du
// cycle 4 (annexe 2), comme pour la 4e. Règle du programme : les automatismes
// d'une classe portent sur ce qui a été ÉTUDIÉ AVANT sans être automatisé —
// pour la 5e, le cycle 3.
//
// Ce que la liste nomme : critères par 2, 5, 10 ; division euclidienne ;
// 21 = 3 × 7 ; 0,6 × 7, 40 × 0,03 ; ×/÷ 10, 100, 1 000 ; + et − de décimaux ;
// addition à trou ; fractions simples (écriture décimale, égales, comparaison,
// 17/5 = 3 + 2/5, sommes simples, fraction d'un nombre, 3 × … = 7) ; 1 %, 10 %,
// 50 % ; 1,2 = 6/5 = 120 % ; suites de motifs ; demi-droite graduée ;
// empilements de cubes ; symétrie axiale ; vocabulaire des angles, bissectrice,
// équerre ; triangles et quadrilatères par le codage, médiatrice ; échelle de
// probabilité ; proportionnalité (recette, prix, pourcentage de voix).
//
// Sortis le 26/09 : les ratios (objectif de 4e), la multiplication de fractions
// (objectif de 4e), la divisibilité par 3 et 9 (objectif de 5e, automatisme
// de 3e). Au programme mais hors liste — cochables, jamais dans « la totale » :
// relatifs, calcul littéral, diviseurs, repère, graphiques, moyenne, aires,
// volumes, durées, Scratch, inégalité triangulaire.

import type { AutoNiveau, AutoQuestion } from "./types";
import type { CanvasFigure } from "@/lib/tutor-v4/types_canvas";
import {
  aires,
  anglesVocabulaire,
  conversions,
  convertirDurees,
  coordonnees,
  droiteGraduee,
  ecritures,
  fractionDe,
  frequence,
  lireInstant,
  lireValeur,
  lireVariation,
  moyenne,
  pctEffectif,
  pctProportion,
  perimetres,
  polygone,
  probabilites,
  programmeCalcul,
  proportionnalite,
  solides,
  sommeAngles,
  volumes,
} from "./3e";
import { divisionEuclidienne } from "./4e";

/* ─────────────────────────── outils ─────────────────────────── */

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function entre(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function nonNul(min: number, max: number): number {
  let n = entre(min, max);
  while (n === 0) n = entre(min, max);
  return n;
}

function fr(n: number): string {
  return String(Math.round(n * 1e6) / 1e6).replace(".", ",");
}

function pgcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : pgcd(b, a % b);
}

function accepte(n: number): string[] {
  const s = fr(n);
  return Array.from(new Set([s, s.replace(",", ".")]));
}

/** Un relatif entre parenthèses s'il est négatif : « (−3) ». */
function par(n: number): string {
  return n < 0 ? `(${n})` : `${n}`;
}

function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** QCM : jamais deux fois la même ligne, la bonne réponse toujours présente. */
function qcm(correct: string, pieges: readonly string[]): string[] {
  const d = shuffle(Array.from(new Set(pieges)).filter((p) => p !== correct)).slice(0, 3);
  return shuffle([correct, ...d]);
}

function tex(n: number, d: number): string {
  return `\\dfrac{${n}}{${d}}`;
}

/** Les écritures acceptées d'une fraction n/d : « 6/8 », « 3/4 », « 0,75 ». */
function fractionAcceptee(n: number, d: number): string[] {
  const g = pgcd(n, d);
  const out = [`${n}/${d}`, `${n / g}/${d / g}`];
  if (d / g === 1) out.push(`${n / g}`);
  const dec = n / d;
  if (Math.abs(dec * 1000 - Math.round(dec * 1000)) < 1e-9) out.push(...accepte(dec));
  return Array.from(new Set(out));
}

function milliers(n: number): string {
  return n.toLocaleString("fr-FR").replace(/\s/g, " ");
}

function ouiNon(vrai: boolean): string[] {
  return vrai ? ["oui", "Oui"] : ["non", "Non"];
}

/* ═══════════════ NOMBRES RELATIFS (addition, soustraction) ═══════════════ */

function relatifs(): AutoQuestion {
  const cas = entre(1, 4);
  if (cas === 1) {
    const a = nonNul(-12, 12), b = nonNul(-12, 12);
    return {
      text: `Calculer $${par(a)} + ${par(b)}$.`,
      format: "short",
      expected: accepte(a + b),
      explanation:
        (a < 0) === (b < 0)
          ? `Même signe : on ajoute les distances à zéro et on garde le signe.\n$${par(a)} + ${par(b)} = ${a + b}$.`
          : `Signes contraires : on soustrait les distances à zéro, et on prend le signe de celui qui en est le plus loin.\n$${par(a)} + ${par(b)} = ${a + b}$.`,
    };
  }
  if (cas === 2) {
    const a = nonNul(-12, 12), b = nonNul(-12, 12);
    return {
      text: `Calculer $${par(a)} - ${par(b)}$.`,
      format: "short",
      expected: accepte(a - b),
      explanation: `Soustraire un nombre, c'est ajouter son OPPOSÉ.\n$${par(a)} - ${par(b)} = ${par(a)} + ${par(-b)} = ${a - b}$.`,
    };
  }
  if (cas === 3) {
    const a = nonNul(-9, 9), b = nonNul(-9, 9), c = nonNul(-9, 9);
    return {
      text: `Calculer $${a} ${b < 0 ? "-" : "+"} ${Math.abs(b)} ${c < 0 ? "-" : "+"} ${Math.abs(c)}$.`,
      format: "short",
      expected: accepte(a + b + c),
      explanation: `On calcule de gauche à droite : $${a} ${b < 0 ? "-" : "+"} ${Math.abs(b)} = ${a + b}$, puis $${a + b} ${c < 0 ? "-" : "+"} ${Math.abs(c)} = ${a + b + c}$.`,
    };
  }
  if (Math.random() < 0.5) {
    const t1 = entre(-9, 4), t2 = entre(t1 + 3, 18);
    return {
      text: `Le matin, il fait ${t1} °C ; l'après-midi, ${t2} °C. De combien de degrés la température a-t-elle monté ?`,
      format: "short",
      expected: accepte(t2 - t1),
      explanation: `L'écart, c'est « l'arrivée moins le départ ».\n$${t2} - ${par(t1)} = ${t2 - t1}$ °C.`,
    };
  }
  const p1 = entre(8, 30), p2 = entre(2, p1 - 3);
  return {
    text: `Un plongeur est à l'altitude −${p1} m. Il remonte jusqu'à l'altitude −${p2} m. De combien de mètres est-il remonté ?`,
    format: "short",
    expected: accepte(p1 - p2),
    explanation: `L'écart, c'est « l'arrivée moins le départ ».\n$(-${p2}) - (-${p1}) = -${p2} + ${p1} = ${p1 - p2}$ m.`,
  };
}

/* ═══════════════ FRACTIONS ═══════════════ */

/** Les fractions de la liste de 5e : égales, comparées, ajoutées, décomposées. */
function fractions5e(): AutoQuestion {
  const cas = entre(1, 5);
  if (cas === 1) {
    // 2/3 = …/15 ; 4/7 = …/14
    const [n, d] = pick([[1, 2], [2, 3], [3, 4], [2, 5], [3, 5], [4, 7], [5, 6], [3, 8], [7, 9], [1, 3]] as const);
    const k = entre(2, 6);
    const enHaut = Math.random() < 0.6;
    return {
      text: enHaut ? `Compléter : $${tex(n, d)} = \\dfrac{\\ldots}{${d * k}}$.` : `Compléter : $${tex(n, d)} = \\dfrac{${n * k}}{\\ldots}$.`,
      format: "short",
      expected: accepte(enHaut ? n * k : d * k),
      explanation: `On passe de ${enHaut ? `${d} à ${d * k}` : `${n} à ${n * k}`} en multipliant par ${k} : on multiplie l'autre terme par ${k} aussi.\n$${tex(n, d)} = ${tex(n * k, d * k)}$.`,
    };
  }
  if (cas === 2) {
    const forme = entre(1, 4);
    let a: number, b: number, c: number, d: number, pourquoi: string;
    if (forme === 1) {
      // même dénominateur : 2/7 et 5/7
      b = d = entre(3, 12); a = entre(1, b + 3); c = entre(1, b + 3);
      while (c === a) c = entre(1, b + 3);
      pourquoi = "Même dénominateur : la plus grande est celle qui a le plus grand numérateur.";
    } else if (forme === 2) {
      // même numérateur : 8/12 et 8/21
      a = c = entre(2, 9); b = entre(a + 1, 15); d = entre(a + 1, 24);
      while (d === b) d = entre(a + 1, 24);
      pourquoi = "Même numérateur : on partage en MOINS de parts, chaque part est plus grande. La plus grande a le plus petit dénominateur.";
    } else if (forme === 3) {
      // un dénominateur multiple de l'autre : 3/4 et 7/18 → non ; 3/4 et 7/12
      b = pick([2, 3, 4, 5] as const).valueOf(); const k = pick([2, 3, 4] as const).valueOf(); d = b * k;
      a = entre(1, b - 1 || 1); c = entre(1, d - 1);
      while (a * k === c) c = entre(1, d - 1);
      pourquoi = `On écrit la première avec le dénominateur ${d} : $${tex(a, b)} = ${tex(a * k, d)}$, puis on compare les numérateurs.`;
    } else {
      // l'une plus grande que 1, l'autre plus petite : 8/3 et 6/7
      b = entre(2, 5); a = b + entre(1, 6); d = entre(3, 9); c = entre(1, d - 1);
      pourquoi = `$${tex(a, b)}$ est plus grande que 1 (numérateur plus grand que le dénominateur), $${tex(c, d)}$ est plus petite que 1.`;
    }
    const grand = a * d > c * b ? `${a}/${b}` : `${c}/${d}`;
    const [gn, gd] = grand.split("/").map(Number);
    const [f1, f2] = shuffle([[a, b], [c, d]]);
    return {
      text: `Quelle est la plus grande des deux fractions $${tex(f1[0], f1[1])}$ et $${tex(f2[0], f2[1])}$ ? (Écrire la fraction.)`,
      format: "short",
      expected: [grand],
      explanation: `${pourquoi}\nLa plus grande est $${tex(gn, gd)}$.`,
    };
  }
  if (cas === 3) {
    const forme = entre(1, 5);
    if (forme === 1) {
      const d = entre(3, 9), a = entre(1, d - 1), b = entre(1, d - 1);
      return {
        text: `Calculer $${tex(a, d)} + ${tex(b, d)}$. (Donner une fraction.)`,
        format: "short",
        expected: fractionAcceptee(a + b, d),
        explanation: `Même dénominateur : on ajoute les numérateurs, le dénominateur ne change pas.\n$${tex(a, d)} + ${tex(b, d)} = ${tex(a + b, d)}$.`,
      };
    }
    if (forme === 2) {
      const d = entre(2, 9), a = entre(1, d - 1);
      return {
        text: `Calculer $1 - ${tex(a, d)}$. (Donner une fraction.)`,
        format: "short",
        expected: fractionAcceptee(d - a, d),
        explanation: `$1 = ${tex(d, d)}$ : on écrit 1 avec le même dénominateur.\n$${tex(d, d)} - ${tex(a, d)} = ${tex(d - a, d)}$.`,
      };
    }
    if (forme === 3) {
      const b = pick([3, 5, 7] as const).valueOf(), k = pick([2, 3] as const).valueOf(), D = b * k;
      const a = entre(1, b - 1);
      let c = entre(1, D - 1);
      while (c >= a * k) c = entre(1, D - 1);
      return {
        text: `Calculer $${tex(a, b)} - ${tex(c, D)}$. (Donner une fraction.)`,
        format: "short",
        expected: fractionAcceptee(a * k - c, D),
        explanation: `${D} est un multiple de ${b} : $${tex(a, b)} = ${tex(a * k, D)}$.\n$${tex(a * k, D)} - ${tex(c, D)} = ${tex(a * k - c, D)}$.`,
      };
    }
    if (forme === 4) {
      const n = entre(1, 5), d = entre(2, 9), a = entre(1, d - 1);
      return {
        text: `Calculer $${n} + ${tex(a, d)}$. (Donner une fraction.)`,
        format: "short",
        expected: fractionAcceptee(n * d + a, d),
        explanation: `$${n} = ${tex(n * d, d)}$.\n$${tex(n * d, d)} + ${tex(a, d)} = ${tex(n * d + a, d)}$.`,
      };
    }
    const [[a, b], [c, d]] = pick([[[2, 5], [1, 4]], [[1, 2], [1, 3]], [[1, 3], [1, 4]], [[3, 4], [1, 5]], [[1, 2], [2, 5]], [[2, 3], [1, 4]], [[1, 5], [1, 2]]] as const);
    const D = b * d;
    return {
      text: `Calculer $${tex(a, b)} + ${tex(c, d)}$. (Donner une fraction.)`,
      format: "short",
      expected: fractionAcceptee(a * d + c * b, D),
      explanation: `Dénominateur commun : $${b} \\times ${d} = ${D}$. $${tex(a, b)} = ${tex(a * d, D)}$ et $${tex(c, d)} = ${tex(c * b, D)}$.\n$${tex(a * d, D)} + ${tex(c * b, D)} = ${tex(a * d + c * b, D)}$.`,
    };
  }
  if (cas === 4) {
    // 17/5 = 3 + 2/5
    const d = entre(2, 9), q = entre(1, 5), r = entre(1, d - 1), n = q * d + r;
    const entier = Math.random() < 0.5;
    return {
      text: entier ? `Compléter : $${tex(n, d)} = \\ldots + ${tex(r, d)}$.` : `Compléter : $${tex(n, d)} = ${q} + \\dfrac{\\ldots}{${d}}$.`,
      format: "short",
      expected: accepte(entier ? q : r),
      explanation: `Dans ${n}, il y a ${q} fois ${d} (${q * d}), et il reste ${r} : $${n} = ${q} \\times ${d} + ${r}$.\nDonc $${tex(n, d)} = ${q} + ${tex(r, d)}$.`,
    };
  }
  // 3 × … = 7, puis 3 × 7/3 = …
  const [a, n] = pick([[3, 7], [4, 3], [5, 2], [7, 4], [3, 2], [6, 5], [9, 4], [7, 3], [8, 3], [5, 4], [3, 5], [7, 2]] as const);
  if (Math.random() < 0.5) {
    return {
      text: `Compléter : $${a} \\times \\ldots = ${n}$. (Donner une fraction.)`,
      format: "short",
      expected: fractionAcceptee(n, a),
      explanation: `Le nombre qui, multiplié par ${a}, donne ${n}, c'est le quotient de ${n} par ${a}.\nC'est $${tex(n, a)}$.`,
    };
  }
  return {
    text: `Calculer $${a} \\times ${tex(n, a)}$.`,
    format: "short",
    expected: accepte(n),
    explanation: `$${tex(n, a)}$ est le nombre qui, multiplié par ${a}, donne ${n}.\nDonc $${a} \\times ${tex(n, a)} = ${n}$.`,
  };
}

/** 1,2 = 12/10 = 6/5 = 1 + 1/5 = 120 % : un même nombre, plusieurs écritures. */
function ecrituresMultiples(): AutoQuestion {
  const [n, d] = pick([[1, 2], [1, 4], [3, 4], [3, 2], [5, 2], [6, 5], [1, 5], [2, 5], [7, 4], [5, 4], [7, 10], [3, 5], [9, 10], [4, 5], [7, 5]] as const);
  const dec = n / d;
  if (Math.random() < 0.5) {
    const sur = pick([10, 100] as const).valueOf();
    if ((dec * sur) % 1 !== 0) return ecrituresMultiples();
    return {
      text: `Compléter : $${fr(dec)} = \\dfrac{\\ldots}{${sur}}$.`,
      format: "short",
      expected: accepte(dec * sur),
      explanation: `$${fr(dec)} = ${fr(dec * sur)} \\div ${sur}$.\nDonc $${fr(dec)} = ${tex(dec * sur, sur)}$.`,
    };
  }
  const vrais = [`$${fr(dec)}$`, `$${tex(2 * n, 2 * d)}$`, `${fr(dec * 100)} %`];
  if (n > d) vrais.push(`$${Math.floor(n / d)} + ${tex(n % d, d)}$`);
  const faux = pick([`$${tex(d, n)}$`, `${fr(dec * 10)} %`, `$${tex(n, 10 * d)}$`, `$${fr(dec + 1)}$`]);
  return {
    text: `Parmi ces écritures, laquelle n'est PAS égale à $${tex(n, d)}$ ?`,
    format: "qcm",
    choices: qcm(faux, vrais),
    expected: [faux],
    explanation: `$${tex(n, d)} = ${n} \\div ${d} = ${fr(dec)} = ${fr(dec * 100)}$ %${n > d ? ` $= ${Math.floor(n / d)} + ${tex(n % d, d)}$` : ""}.\nL'intrus est ${faux}.`,
  };
}

/* ═══════════════ DIVISEURS ═══════════════ */

function diviseurs(): AutoQuestion {
  const n = pick([12, 15, 16, 18, 20, 24, 28, 30, 36, 40] as const).valueOf();
  const d = Array.from({ length: n }, (_, i) => i + 1).filter((k) => n % k === 0);
  // Le second gabarit prend la question par l'autre bout : un diviseur candidat.
  if (Math.random() < 0.5) {
    const k = entre(3, 12);
    const oui = n % k === 0;
    return {
      text: `${k} est-il un diviseur de ${n} ? Répondre par oui ou par non.`,
      format: "short",
      expected: oui ? ["oui", "Oui"] : ["non", "Non"],
      explanation: oui
        ? `Oui : $${n} = ${k} \\times ${n / k}$, la division tombe juste.`
        : `Non : $${n} = ${k} \\times ${Math.floor(n / k)} + ${n % k}$, il reste ${n % k}.`,
    };
  }
  return {
    text: `Combien le nombre ${n} a-t-il de diviseurs ?`,
    format: "short",
    expected: accepte(d.length),
    explanation: `On les cherche par paires : ${d.slice(0, Math.ceil(d.length / 2)).map((k) => `${k} × ${n / k}`).join(", ")}.\nLes diviseurs de ${n} sont ${d.join(", ")} : il y en a ${d.length}.`,
  };
}

/* ═══════════════ CALCUL LITTÉRAL DE 5e ═══════════════ */

function litteral5e(): AutoQuestion {
  const cas = entre(1, 4);
  if (cas === 1) {
    const a = entre(2, 9), b = entre(2, 9), x = entre(1, 6);
    return {
      text: `Calculer $${a}x + ${b}$ pour $x = ${x}$.`,
      format: "short",
      expected: accepte(a * x + b),
      explanation: `$${a}x$ veut dire $${a} \\times x$. On remplace $x$ par ${x} : $${a} \\times ${x} + ${b} = ${a * x} + ${b} = ${a * x + b}$.`,
    };
  }
  if (cas === 2) {
    const a = entre(2, 8), b = entre(1, 8), c = entre(1, 9);
    return {
      text: `Réduire $${a}x + ${b}x + ${c}$. Donner le coefficient de $x$.`,
      format: "short",
      expected: accepte(a + b),
      explanation: `On regroupe les termes en $x$ : $${a}x + ${b}x = ${a + b}x$. Le ${c} n'a pas de $x$, il reste à part.\n$${a + b}x + ${c}$ : le coefficient est ${a + b}.`,
    };
  }
  if (cas === 3) {
    const k = entre(2, 7), b = entre(1, 9);
    return {
      text: `On développe $${k}(x + ${b})$ et on obtient $${k}x + \\ldots$ Compléter.`,
      format: "short",
      expected: accepte(k * b),
      explanation: `${k} multiplie CHACUN des deux termes : $${k} \\times x + ${k} \\times ${b} = ${k}x + ${k * b}$.`,
    };
  }
  const a = entre(2, 6), b = entre(1, 9), c = entre(1, a - 1 || 1), x = entre(1, 6);
  const vrai = Math.random() < 0.5;
  const d = a * x + b - c * x + (vrai ? 0 : pick([1, 2, -1] as const));
  return {
    text: `L'égalité $${a}x + ${b} = ${c === 1 ? "" : c}x + ${d}$ est-elle vraie pour $x = ${x}$ ? Répondre par oui ou par non.`,
    format: "short",
    expected: vrai ? ["oui", "Oui"] : ["non", "Non"],
    explanation: `On calcule chaque membre pour $x = ${x}$ : à gauche $${a * x + b}$, à droite $${c * x + d}$.\n${vrai ? "Les deux sont égaux : oui." : "Ils sont différents : non."}`,
  };
}

/* ═══════════════ TRIANGLES ET PARALLÉLOGRAMMES ═══════════════ */

function triangleConstructible(): AutoQuestion {
  const a = entre(2, 9), b = entre(2, 9);
  const possible = Math.random() < 0.5;
  const c = possible ? entre(Math.abs(a - b) + 1, a + b - 1) : a + b + entre(0, 3);
  return {
    text: `Peut-on construire un triangle dont les côtés mesurent ${a} cm, ${b} cm et ${c} cm ? Répondre par oui ou par non.`,
    format: "short",
    expected: possible ? ["oui", "Oui"] : ["non", "Non"],
    explanation: `Le plus grand côté doit être STRICTEMENT plus petit que la somme des deux autres (inégalité triangulaire).\n${possible ? `${Math.max(a, b, c)} < ${a + b + c - Math.max(a, b, c)} : oui.` : `${c} ⩾ ${a} + ${b} = ${a + b} : non, les deux petits côtés ne se rejoignent pas.`}`,
  };
}

function parallelogramme(): AutoQuestion {
  const cas = entre(1, 3);
  if (cas === 1) {
    const a = entre(5, 16) * 5;
    const autre = Math.random() < 0.5;
    return {
      text: `ABCD est un parallélogramme et $\\widehat{A} = ${a}°$. Combien mesure $\\widehat{${autre ? "B" : "C"}}$, en degrés ?`,
      format: "short",
      expected: accepte(autre ? 180 - a : a),
      explanation: autre
        ? `Dans un parallélogramme, deux angles CONSÉCUTIFS sont supplémentaires.\n$180 - ${a} = ${180 - a}$°.`
        : `Dans un parallélogramme, les angles OPPOSÉS sont égaux : $\\widehat{C} = \\widehat{A} = ${a}$°.`,
    };
  }
  if (cas === 2) {
    const d = 2 * entre(3, 12);
    return {
      text: `ABCD est un parallélogramme de centre O, et $AC = ${d}$ cm. Combien mesure $AO$, en cm ?`,
      format: "short",
      expected: accepte(d / 2),
      explanation: `Les diagonales d'un parallélogramme se coupent en leur MILIEU : O est le milieu de [AC].\n$${d} \\div 2 = ${d / 2}$ cm.`,
    };
  }
  const b = entre(3, 12), h = entre(2, 9);
  return {
    text: `Un parallélogramme a une base de ${b} cm et une hauteur relative à cette base de ${h} cm. Quelle est son aire, en cm² ?`,
    format: "short",
    expected: accepte(b * h),
    explanation: `Aire d'un parallélogramme = base × hauteur (la hauteur, pas le côté oblique).\n$${b} \\times ${h} = ${b * h}$ cm².`,
  };
}

/* ═══════════════ RÉDIGER UNE RÉPONSE, À LA MESURE DE LA 5e ═══════════════ */

const CRITERE_ORTHO = "Ma phrase est complète, avec une majuscule, un point et sans faute d'orthographe.";

function redigerConstructible(): AutoQuestion {
  const a = entre(2, 5), b = entre(2, 5), c = a + b + entre(1, 3);
  return {
    text: `**Expliquer pourquoi on ne peut pas construire un triangle de côtés ${a} cm, ${b} cm et ${c} cm.**`,
    format: "redaction",
    expected: [],
    modele: `On ne peut pas construire ce triangle, car le plus grand côté, ${c} cm, est plus long que la somme des deux autres : ${a} + ${b} = ${a + b} cm. Les deux petits côtés ne peuvent pas se rejoindre.`,
    criteres: [
      "J'ai comparé le plus grand côté à la somme des deux autres, avec le calcul.",
      "J'ai écrit une conclusion claire : on ne peut pas construire ce triangle.",
      CRITERE_ORTHO,
    ],
    explanation: "Inégalité triangulaire : dans un triangle, chaque côté est plus court que la somme des deux autres.",
  };
}

function redigerDivisible(): AutoQuestion {
  const k = pick([3, 9] as const).valueOf();
  let n = k * entre(15, 111);
  while (n % 10 === 0) n = k * entre(15, 111);
  const somme = String(n).split("").reduce((s, c) => s + +c, 0);
  return {
    text: `**Sans poser la division, expliquer pourquoi ${n} est divisible par ${k}.**`,
    format: "redaction",
    expected: [],
    modele: `La somme des chiffres de ${n} est ${String(n).split("").join(" + ")} = ${somme}. Comme ${somme} est divisible par ${k}, le nombre ${n} est divisible par ${k}.`,
    criteres: [
      "J'ai calculé la somme des chiffres.",
      `J'ai cité le critère : un nombre est divisible par ${k} si la somme de ses chiffres l'est.`,
      CRITERE_ORTHO,
    ],
    explanation: `Critère de divisibilité par ${k} : on regarde la SOMME des chiffres, pas le dernier chiffre.`,
  };
}

function redigerProportionnalite(): AutoQuestion {
  const prix = entre(2, 5), n1 = entre(2, 4), n2 = n1 * 2;
  const offre = prix * n2 - entre(1, 3);
  return {
    text: `Au marché, ${n1} kg de pommes coûtent ${prix * n1} € et ${n2} kg coûtent ${offre} €. **Le prix est-il proportionnel à la masse ? Justifier.**`,
    format: "redaction",
    expected: [],
    modele: `Non. ${n2} kg, c'est deux fois ${n1} kg. Si le prix était proportionnel, ${n2} kg coûteraient deux fois ${prix * n1} €, soit ${prix * n2} €. Or ils coûtent ${offre} € : le prix n'est pas proportionnel à la masse.`,
    criteres: [
      "J'ai répondu par oui ou par non.",
      "J'ai comparé avec ce que donnerait la proportionnalité (le double, le coefficient…).",
      CRITERE_ORTHO,
    ],
    explanation: "Pour prouver qu'une situation N'EST PAS proportionnelle, un seul contre-exemple suffit.",
  };
}

/* ═══════════════ CALCUL MENTAL (liste de 5e) ═══════════════ */

function calcul5e(): AutoQuestion {
  const cas = entre(1, 6);
  if (cas === 1) {
    const a = entre(3, 9), b = entre(3, 10);
    return {
      text: `Compléter : $${a} \\times \\ldots = ${a * b}$.`,
      format: "short",
      expected: accepte(b),
      explanation: `On cherche dans la table de ${a}.\n$${a} \\times ${b} = ${a * b}$.`,
    };
  }
  if (cas === 2) {
    // 21 = 3 × 7 : un produit de deux nombres différents de 1
    const p = entre(2, 9), q = entre(2, 9);
    const N = p * q;
    const bonne = `$${p} \\times ${q}$`;
    return {
      text: `Quel produit est égal à ${N} ?`,
      format: "qcm",
      choices: qcm(bonne, [`$${p} \\times ${q + 1}$`, `$${p + 1} \\times ${q}$`, `$${p > 2 ? p - 1 : p + 2} \\times ${q}$`, `$${p} \\times ${q > 2 ? q - 1 : q + 2}$`]),
      expected: [bonne],
      explanation: `On cherche dans les tables de multiplication.\n$${p} \\times ${q} = ${N}$.`,
    };
  }
  if (cas === 3) {
    const [m, dec] = pick([[6, 1], [3, 1], [8, 1], [7, 1], [9, 1], [4, 1], [3, 2], [4, 2], [5, 2], [2, 2]] as const);
    const a = m / 10 ** dec;
    const b = dec === 2 ? pick([20, 30, 40, 50] as const).valueOf() : entre(3, 9);
    const rep = (m * b) / 10 ** dec;
    return {
      text: `Calculer $${fr(a)} \\times ${b}$.`,
      format: "short",
      expected: accepte(rep),
      explanation: `On calcule avec les entiers, puis on remet la virgule : $${fr(a)} = ${m} \\div ${10 ** dec}$.\n$${m} \\times ${b} = ${m * b}$, puis $${m * b} \\div ${10 ** dec} = ${fr(rep)}$.`,
    };
  }
  if (cas === 4) {
    const v = pick([3.7, 0.45, 12.5, 7, 0.8, 2.06, 45, 1.3, 0.09, 350] as const).valueOf();
    const p = pick([10, 100, 1000] as const).valueOf();
    const fois = Math.random() < 0.5;
    const rep = fois ? v * p : v / p;
    return {
      text: `Calculer $${fr(v)} ${fois ? "\\times" : "\\div"} ${milliers(p)}$.`,
      format: "short",
      expected: accepte(rep),
      explanation: `${fois ? "Multiplier" : "Diviser"} par ${milliers(p)} : chaque chiffre devient ${milliers(p)} fois plus ${fois ? "grand" : "petit"}, il se décale de ${String(p).length - 1} rang${p > 10 ? "s" : ""} vers la ${fois ? "gauche" : "droite"} (la virgule, elle, va vers la ${fois ? "droite" : "gauche"}).\n$${fr(v)} ${fois ? "\\times" : "\\div"} ${milliers(p)} = ${fr(rep)}$.`,
    };
  }
  if (cas === 5) {
    // 2,7 + 1,4 ; 3,4 − 0,8 : on compte en dixièmes
    const a = entre(11, 89), b = entre(3, 39);
    const moins = Math.random() < 0.5 && a > b;
    const rep = (moins ? a - b : a + b) / 10;
    return {
      text: `Calculer $${fr(a / 10)} ${moins ? "-" : "+"} ${fr(b / 10)}$.`,
      format: "short",
      expected: accepte(rep),
      explanation: `On compte en dixièmes : ${a} dixièmes ${moins ? "moins" : "plus"} ${b} dixièmes font ${moins ? a - b : a + b} dixièmes.\n$${fr(a / 10)} ${moins ? "-" : "+"} ${fr(b / 10)} = ${fr(rep)}$.`,
    };
  }
  // 2 + … = 7 se complète par 7 − 2
  const a = entre(5, 60), s = a + entre(3, 50);
  return {
    text: `Compléter : $${fr(a / 10)} + \\ldots = ${fr(s / 10)}$.`,
    format: "short",
    expected: accepte((s - a) / 10),
    explanation: `Une addition à trou se complète par une soustraction.\n$${fr(s / 10)} - ${fr(a / 10)} = ${fr((s - a) / 10)}$.`,
  };
}

function divisibilite5e(): AutoQuestion {
  const d = pick([2, 5, 10] as const).valueOf();
  // Une fois sur deux un multiple : sinon « non » sortirait neuf fois sur dix pour 10.
  let n = Math.random() < 0.5 ? d * entre(Math.ceil(101 / d), Math.floor(999 / d)) : entre(101, 999);
  if (n % d === 0 && Math.random() < 0.5) n += entre(1, d === 10 ? 9 : d - 1);
  const regle = { 2: "son chiffre des unités est 0, 2, 4, 6 ou 8", 5: "son chiffre des unités est 0 ou 5", 10: "son chiffre des unités est 0" }[d];
  const oui = n % d === 0;
  return {
    text: `Le nombre ${n} est-il divisible par ${d} ? Répondre par oui ou par non.`,
    format: "short",
    expected: ouiNon(oui),
    explanation: `Un nombre est divisible par ${d} si ${regle}.\nLe chiffre des unités de ${n} est ${n % 10} : ${oui ? "oui" : "non"}.`,
  };
}

/* ═══════════════ POURCENTAGES ET PROPORTIONNALITÉ ═══════════════ */

function pct5e(): AutoQuestion {
  const p = pick([1, 10, 50] as const).valueOf();
  const N = p === 1 ? entre(2, 60) * 100 : p === 10 ? entre(2, 90) * 10 : entre(3, 99) * 2;
  const ctx = pick([
    (x: string) => `d'un prix de ${x} €`,
    (x: string) => `d'une somme de ${x} €`,
    (x: string) => `de ${x} spectateurs`,
    (x: string) => `de ${x} habitants`,
    (x: string) => `d'une distance de ${x} m`,
  ]);
  const rep = (N * p) / 100;
  const astuce = { 1: "Prendre 1 %, c'est diviser par 100", 10: "Prendre 10 %, c'est diviser par 10", 50: "Prendre 50 %, c'est prendre la moitié" }[p];
  return {
    text: `Calculer ${p} % ${ctx(milliers(N))}.`,
    format: "short",
    expected: accepte(rep),
    explanation: `${astuce}.\n${p} % de ${milliers(N)} = ${milliers(rep)}.`,
  };
}

function recette(): AutoQuestion {
  const base = pick([2, 4, 6] as const).valueOf();
  const cible = pick([1, 2, 3, 6, 8, 12].filter((c) => c !== base));
  const ing = pick([
    { nom: "de farine", u: "g", q: [120, 180, 240, 300, 360] },
    { nom: "de lait", u: "mL", q: [240, 300, 480, 600] },
    { nom: "de sucre", u: "g", q: [60, 90, 120, 150, 180] },
    { nom: "de beurre", u: "g", q: [48, 60, 72, 96, 120] },
  ]);
  const q = pick(ing.q);
  const rep = (q * cible) / base;
  if (!Number.isInteger(rep)) return recette();
  const plat = pick(["Une pâte à crêpes", "Un gâteau au yaourt", "Une recette de cookies", "Un clafoutis"]);
  return {
    text: `${plat} pour ${base} personnes demande ${q} ${ing.u} ${ing.nom}. Quelle quantité faut-il pour ${cible} personne${cible > 1 ? "s" : ""}, en ${ing.u} ?`,
    format: "short",
    expected: accepte(rep),
    explanation: `Les quantités sont proportionnelles au nombre de personnes. Pour 1 personne : $${q} \\div ${base} = ${fr(q / base)}$ ${ing.u}.\nPour ${cible} : $${fr(q / base)} \\times ${cible} = ${rep}$ ${ing.u}.`,
  };
}

/* ═══════════════ SUITES DE MOTIFS ═══════════════ */

function motifs(): AutoQuestion {
  const ctx = pick([
    { objet: "allumettes", motif: "une rangée de carrés d'allumettes" },
    { objet: "jetons", motif: "une frise de jetons" },
    { objet: "carreaux", motif: "une frise de carreaux" },
    { objet: "chaises", motif: "des tables mises bout à bout" },
    { objet: "perles", motif: "un collier de perles" },
  ]);
  const a = entre(2, 6), b = entre(0, 5);
  const u = (k: number) => a * k + b;
  const debut = `On construit ${ctx.motif}. Étape 1 : ${u(1)} ${ctx.objet} ; étape 2 : ${u(2)} ; étape 3 : ${u(3)}.`;
  const cas = entre(1, 3);
  if (cas === 1) {
    return {
      text: `${debut} Combien de ${ctx.objet} de plus à chaque étape ?`,
      format: "short",
      expected: accepte(a),
      explanation: `On compare deux étapes qui se suivent : $${u(2)} - ${u(1)} = ${a}$, et $${u(3)} - ${u(2)} = ${a}$.\nOn ajoute ${a} ${ctx.objet} à chaque étape.`,
    };
  }
  const k = cas === 2 ? pick([4, 5] as const).valueOf() : pick([10, 20, 100] as const).valueOf();
  return {
    text: `${debut} Combien de ${ctx.objet} faut-il à l'étape ${k} ?`,
    format: "short",
    expected: accepte(u(k)),
    explanation:
      cas === 2
        ? `On ajoute ${a} à chaque étape.\n${Array.from({ length: k }, (_, i) => u(i + 1)).join(" → ")} : l'étape ${k} compte ${u(k)} ${ctx.objet}.`
        : `On ajoute ${a} à chaque étape, donc l'étape n compte $${a} \\times n${b ? ` + ${b}` : ""}$ ${ctx.objet} (on vérifie à l'étape 1 : ${u(1)}).\nÉtape ${k} : $${a} \\times ${k}${b ? ` + ${b}` : ""} = ${u(k)}$.`,
  };
}

/* ═══════════════ DEMI-DROITE GRADUÉE ═══════════════ */

function demiDroite(): AutoQuestion {
  const s = pick([0, 1, 2, 3, 5, 7] as const).valueOf();
  const k = entre(1, 9);
  const v = s + k / 10;
  const canvas = {
    kind: "number_line",
    min: s,
    max: s + 1,
    step: 0.1,
    points: [
      { value: s, label: `${s}` },
      { value: s + 1, label: `${s + 1}` },
      { value: v, label: "A", color: "#c2410c" },
    ],
    display: { showTicks: true, showValues: false, showPoints: true, showPointLabels: true },
    size: { width: 440, height: 110 },
  } as unknown as CanvasFigure;
  return {
    text: "Quelle est l'abscisse du point A ? (Écrire un nombre décimal.)",
    format: "short",
    expected: accepte(v),
    explanation: `Entre ${s} et ${s + 1}, l'unité est partagée en 10 : chaque graduation vaut 0,1.\nA est à ${k} graduation${k > 1 ? "s" : ""} après ${s} : son abscisse est ${fr(v)}.`,
    canvas,
  };
}

/* ═══════════════ CUBES ET EMPILEMENTS ═══════════════ */

function cubes(): AutoQuestion {
  const cas = entre(1, 4);
  const L = entre(2, 6), l = entre(2, 5), h = entre(2, 5);
  const bloc = `Un empilement de petits cubes forme un pavé de ${L} cubes de long, ${l} de large et ${h} de haut.`;
  if (cas === 1) {
    return {
      text: `${bloc} Combien de petits cubes contient-il ?`,
      format: "short",
      expected: accepte(L * l * h),
      explanation: `Un étage contient $${L} \\times ${l} = ${L * l}$ cubes, et il y a ${h} étages.\n$${L * l} \\times ${h} = ${L * l * h}$ cubes.`,
    };
  }
  if (cas === 2) {
    const vue = pick([
      { nom: "de dessus", n: L * l, e: `on voit la longueur et la largeur : $${L} \\times ${l}$` },
      { nom: "de face", n: L * h, e: `on voit la longueur et la hauteur : $${L} \\times ${h}$` },
      { nom: "de côté", n: l * h, e: `on voit la largeur et la hauteur : $${l} \\times ${h}$` },
    ]);
    return {
      text: `${bloc} Combien de carrés voit-on sur sa vue ${vue.nom} ?`,
      format: "short",
      expected: accepte(vue.n),
      explanation: `Vue ${vue.nom} : ${vue.e}.\nOn voit ${vue.n} carrés.`,
    };
  }
  if (cas === 3) {
    const n = entre(2, 5);
    return {
      text: `Un grand cube est formé de petits cubes : ${n} sur chaque arête. Combien de petits cubes contient-il ?`,
      format: "short",
      expected: accepte(n ** 3),
      explanation: `${n} étages de $${n} \\times ${n} = ${n * n}$ cubes.\n$${n * n} \\times ${n} = ${n ** 3}$ cubes.`,
    };
  }
  const q = pick([
    { t: "Combien de faces a un cube ?", r: 6, e: "Un cube a 6 faces carrées : dessus, dessous, et 4 sur le tour." },
    { t: "Combien d'arêtes a un cube ?", r: 12, e: "4 arêtes en haut, 4 en bas, 4 verticales : 12 arêtes." },
    { t: "Combien de sommets a un cube ?", r: 8, e: "4 sommets en haut, 4 en bas : 8 sommets." },
    { t: "Combien de faces a un pavé droit ?", r: 6, e: "Un pavé droit a 6 faces rectangulaires, opposées deux à deux." },
    { t: "Combien d'arêtes a un pavé droit ?", r: 12, e: "Comme le cube : 4 en haut, 4 en bas, 4 verticales." },
    { t: "Combien de sommets a un pavé droit ?", r: 8, e: "Comme le cube : 4 en haut, 4 en bas." },
    { t: "Un patron de cube est formé de combien de carrés ?", r: 6, e: "Un carré par face : 6 carrés." },
  ]);
  return { text: q.t, format: "short", expected: accepte(q.r), explanation: `${q.e}\nRéponse : ${q.r}.` };
}

/* ═══════════════ SYMÉTRIE AXIALE ═══════════════ */

function symetrieAxiale(): AutoQuestion {
  if (Math.random() < 0.45) {
    const f = pick([
      { nom: "un carré", n: 4, e: "les 2 médiatrices des côtés et les 2 diagonales" },
      { nom: "un rectangle (qui n'est pas un carré)", n: 2, e: "les 2 médiatrices des côtés ; les diagonales ne sont PAS des axes" },
      { nom: "un losange (qui n'est pas un carré)", n: 2, e: "ses 2 diagonales" },
      { nom: "un triangle équilatéral", n: 3, e: "les 3 médiatrices des côtés" },
      { nom: "un triangle isocèle (non équilatéral)", n: 1, e: "la médiatrice de sa base" },
      { nom: "un parallélogramme quelconque", n: 0, e: "aucun : un demi-tour le laisse en place, pas une symétrie axiale" },
      { nom: "un hexagone régulier", n: 6, e: "3 droites qui joignent des sommets opposés, 3 qui joignent des milieux de côtés opposés" },
      { nom: "un pentagone régulier", n: 5, e: "une droite par sommet, qui passe par le milieu du côté opposé" },
      { nom: "un triangle quelconque", n: 0, e: "aucun" },
      { nom: "un segment", n: 2, e: "sa médiatrice et la droite qui le porte" },
    ]);
    return {
      text: `Combien d'axes de symétrie a ${f.nom} ?`,
      format: "short",
      expected: accepte(f.n),
      explanation: `Un axe de symétrie partage la figure en deux moitiés qui se superposent par pliage.\n${f.nom[0].toUpperCase()}${f.nom.slice(1)} : ${f.n} — ${f.e}.`,
    };
  }
  const q = pick([
    () => { const v = entre(12, 95) / 10; return { t: `Le segment [AB] mesure ${fr(v)} cm. Quelle est la longueur de son symétrique [A'B'] par rapport à une droite, en cm ?`, r: v, e: "La symétrie axiale conserve les longueurs" }; },
    () => { const v = entre(12, 170); return { t: `Un angle mesure ${v}°. Combien mesure son symétrique par rapport à une droite, en degrés ?`, r: v, e: "La symétrie axiale conserve les angles" }; },
    () => { const v = entre(6, 80); return { t: `Une figure a une aire de ${v} cm². Quelle est l'aire de sa symétrique par rapport à une droite, en cm² ?`, r: v, e: "La symétrie axiale conserve les longueurs, donc les aires" }; },
    () => { const v = entre(2, 9); return { t: `Sur un quadrillage, le point A est à ${v} carreaux de l'axe de symétrie. À combien de carreaux de l'axe est son symétrique A' ?`, r: v, e: "L'axe est la médiatrice de [AA'] : A et A' sont à la même distance de l'axe, de part et d'autre" }; },
  ]);
  const { t, r, e } = q();
  return { text: t, format: "short", expected: accepte(r), explanation: `${e}.\nRéponse : ${fr(r)}.` };
}

/* ═══════════════ ANGLES, TRIANGLES, QUADRILATÈRES ═══════════════ */

function angles5e(): AutoQuestion {
  const cas = entre(1, 3);
  if (cas === 1) {
    const a = entre(15, 165);
    return {
      text: `Deux angles sont opposés par le sommet. L'un mesure ${a}°. Combien mesure l'autre, en degrés ?`,
      format: "short",
      expected: accepte(a),
      explanation: `Deux angles opposés par le sommet ont la même mesure.\nL'autre mesure aussi ${a}°.`,
    };
  }
  if (cas === 2) {
    const a = 2 * entre(10, 85);
    return {
      text: `On trace la bissectrice d'un angle de ${a}°. Combien mesure chacun des deux angles obtenus, en degrés ?`,
      format: "short",
      expected: accepte(a / 2),
      explanation: `La bissectrice partage un angle en deux angles de même mesure.\n$${a} \\div 2 = ${a / 2}$°.`,
    };
  }
  const q = pick([
    { t: "Une équerre a un angle droit et un angle de 30°. Combien mesure son troisième angle, en degrés ?", r: 60 },
    { t: "Une équerre a un angle droit et un angle de 60°. Combien mesure son troisième angle, en degrés ?", r: 30 },
    { t: "Une équerre a un angle droit et un angle de 45°. Combien mesure son troisième angle, en degrés ?", r: 45 },
    { t: "Combien mesure un angle plein, en degrés ?", r: 360 },
  ]);
  return {
    text: q.t,
    format: "short",
    expected: accepte(q.r),
    explanation: q.r === 360 ? "Un angle plein fait un tour complet.\n360°." : `Une équerre est un triangle : ses angles font 180° en tout.\n$180 - 90 - ${90 - q.r} = ${q.r}$°.`,
  };
}

const TRIANGLES_5E = [["A", "B", "C"], ["E", "F", "G"], ["R", "S", "T"], ["K", "L", "M"], ["P", "Q", "R"]] as const;

function triangles5e(): AutoQuestion {
  const [A, B, C] = pick(TRIANGLES_5E);
  const cas = entre(1, 3);
  if (cas === 1) {
    const f = pick([
      { t: `les côtés [${A}${B}] et [${A}${C}] portent le même codage`, r: "isocèle", e: `Deux côtés de même longueur : il est isocèle en ${A}.` },
      { t: "ses trois côtés portent le même codage", r: "équilatéral", e: "Trois côtés de même longueur : il est équilatéral." },
      { t: `un angle droit est codé en ${B}`, r: "rectangle", e: `Un angle droit : il est rectangle en ${B}.` },
      { t: `un angle droit est codé en ${A}, et [${A}${B}] et [${A}${C}] portent le même codage`, r: "rectangle isocèle", e: `Un angle droit en ${A} et deux côtés égaux issus de ${A} : il est rectangle isocèle en ${A}.` },
    ]);
    return {
      text: `Sur la figure du triangle ${A}${B}${C}, ${f.t}. Quelle est sa nature ?`,
      format: "qcm",
      choices: qcm(f.r, ["isocèle", "équilatéral", "rectangle", "rectangle isocèle", "quelconque"]),
      expected: [f.r],
      explanation: `On lit le codage : même trait = même longueur, petit carré = angle droit.\n${f.e}`,
    };
  }
  if (cas === 2) {
    const v = entre(15, 95) / 10;
    return {
      text: `Le point M est sur la médiatrice du segment [${A}${B}], et M${A} = ${fr(v)} cm. Combien mesure M${B}, en cm ?`,
      format: "short",
      expected: accepte(v),
      explanation: `Un point de la médiatrice d'un segment est à la même distance de ses deux extrémités.\nM${B} = M${A} = ${fr(v)} cm.`,
    };
  }
  const r = entre(15, 80) / 10;
  return {
    text: `O est le centre du cercle circonscrit au triangle ${A}${B}${C}, et O${A} = ${fr(r)} cm. Combien mesure O${C}, en cm ?`,
    format: "short",
    expected: accepte(r),
    explanation: `Le cercle circonscrit passe par les trois sommets : O${A}, O${B} et O${C} sont trois rayons.\nO${C} = ${fr(r)} cm.`,
  };
}

function quadrilateres5e(): AutoQuestion {
  const nom = pick(["ABCD", "EFGH", "MNOP", "RSTU", "IJKL"]);
  const f = pick([
    { t: `Sur la figure, les quatre côtés du quadrilatère ${nom} portent le même codage.`, r: "un losange", e: "Quatre côtés de même longueur : c'est un losange (on ne sait rien des angles)." },
    { t: `Sur la figure, les quatre angles du quadrilatère ${nom} sont codés droits.`, r: "un rectangle", e: "Quatre angles droits : c'est un rectangle (on ne sait rien des côtés)." },
    { t: `Sur la figure, les quatre côtés du quadrilatère ${nom} portent le même codage et ses quatre angles sont codés droits.`, r: "un carré", e: "Quatre côtés égaux ET quatre angles droits : c'est un carré." },
    { t: `Sur la figure, les côtés opposés du quadrilatère ${nom} sont parallèles deux à deux.`, r: "un parallélogramme", e: "Côtés opposés parallèles deux à deux : c'est un parallélogramme." },
    { t: `Le quadrilatère ${nom} a deux côtés parallèles, et deux seulement.`, r: "un trapèze", e: "Deux côtés parallèles (et pas les deux autres) : c'est un trapèze." },
    // Des lettres qu'aucun nom de NOMS n'emploie : pas de « IJKLK ».
    { t: `Le polygone ${nom}${pick(["V", "W"])} a 5 côtés.`, r: "un pentagone", e: "Cinq côtés : un pentagone (penta = 5)." },
    { t: `Le polygone ${nom}${pick(["VW", "XY"])} a 6 côtés.`, r: "un hexagone", e: "Six côtés : un hexagone (hexa = 6)." },
  ]);
  return {
    text: `${f.t} Quelle est la nature la plus précise que l'on peut affirmer ?`,
    format: "qcm",
    choices: qcm(f.r, ["un parallélogramme", "un rectangle", "un losange", "un carré", "un trapèze", "un pentagone", "un hexagone"]),
    expected: [f.r],
    explanation: `${f.e}\nOn ne conclut que ce que le codage PROUVE, pas ce que la figure semble montrer.`,
  };
}

/* ═══════════════ ÉCHELLE DE PROBABILITÉ ═══════════════ */

function probasEchelle(): AutoQuestion {
  const cas = entre(1, 3);
  if (cas === 1) {
    const f = pick([
      { e: "obtenir pile en lançant une pièce équilibrée", r: "une chance sur deux" },
      { e: "obtenir 7 en lançant un dé à six faces", r: "impossible" },
      { e: "obtenir un nombre entre 1 et 6 en lançant un dé à six faces", r: "certain" },
      { e: "ne pas trouver la bonne combinaison au loto", r: "presque certain" },
      { e: "obtenir 10 fois de suite 1 en lançant un dé à six faces", r: "presque impossible" },
      { e: "tirer une boule rouge dans un sac qui ne contient que des boules rouges", r: "certain" },
      { e: "tirer une boule verte dans un sac qui ne contient que des boules rouges et bleues", r: "impossible" },
      { e: "gagner le gros lot d'une loterie qui vend un million de billets, avec un seul billet", r: "presque impossible" },
    ]);
    return {
      text: `Où placer l'évènement « ${f.e} » sur l'échelle des probabilités ?`,
      format: "qcm",
      choices: qcm(f.r, ["impossible", "presque impossible", "une chance sur deux", "presque certain", "certain"]),
      expected: [f.r],
      explanation: `Impossible : probabilité 0. Certain : probabilité 1. Une chance sur deux : $\\dfrac{1}{2}$.\n« ${f.e} » : ${f.r}.`,
    };
  }
  const [n, d] = pick([[1, 2], [1, 4], [3, 4], [1, 5], [2, 5], [1, 10], [3, 10], [1, 20], [3, 5], [7, 10]] as const);
  if (cas === 2) {
    const texte = n === 1 ? `une chance sur ${d}` : `${n} chances sur ${d}`;
    return {
      text: `Un évènement a ${texte}. Quelle est sa probabilité ? (Écrire une fraction.)`,
      format: "short",
      expected: fractionAcceptee(n, d),
      explanation: `« ${n === 1 ? "Une chance" : `${n} chances`} sur ${d} », c'est la fraction $${tex(n, d)}$.\nLa probabilité est $${tex(n, d)}$.`,
    };
  }
  const enPct = Math.random() < 0.5;
  const v = n / d;
  return {
    text: `Une probabilité vaut $${tex(n, d)}$. L'écrire ${enPct ? "en pourcentage" : "sous forme décimale"}.`,
    format: "short",
    expected: enPct ? [...accepte(v * 100), ...accepte(v * 100).map((s) => `${s} %`)] : accepte(v),
    explanation: `$${tex(n, d)} = ${n} \\div ${d} = ${fr(v)}$${enPct ? `, soit ${fr(v * 100)} %` : ""}.\nUne probabilité peut s'écrire en fraction, en décimal ou en pourcentage.`,
  };
}

/* ═══════════════ LE NIVEAU ═══════════════ */

export const automatismes5e: AutoNiveau = {
  classe: "5e",
  label: "5e",
  duree: 15,
  examen: "Pas d'épreuve en 5e : les automatismes que le programme de 5e demande, de tête, sans calculatrice, avec une question à rédiger",
  nbQuestions: 10,
  toujours: ["rediger"],
  themes: [
    // Nombres et calculs
    { id: "calcul", label: "Calcul mental", generateurs: [calcul5e] },
    { id: "entiers", label: "Divisibilité, division euclidienne", generateurs: [divisibilite5e, divisionEuclidienne] },
    { id: "fractions", label: "Fractions", generateurs: [fractions5e, fractionDe, droiteGraduee, ecritures, ecrituresMultiples] },
    { id: "motifs", label: "Suites de motifs", generateurs: [motifs] },
    // Proportionnalité
    { id: "pourcentages", label: "Pourcentages", generateurs: [pct5e, pctProportion, pctEffectif] },
    { id: "proportionnalite", label: "Proportionnalité", generateurs: [proportionnalite, recette] },
    // Espace et géométrie
    { id: "droite", label: "Demi-droite graduée", generateurs: [demiDroite] },
    { id: "cubes", label: "Cubes et empilements", generateurs: [cubes] },
    { id: "symetrie", label: "Symétrie axiale", generateurs: [symetrieAxiale] },
    { id: "angles", label: "Angles", generateurs: [anglesVocabulaire, angles5e] },
    { id: "triangles", label: "Triangles", generateurs: [sommeAngles, triangles5e] },
    { id: "quadrilateres", label: "Quadrilatères", generateurs: [quadrilateres5e] },
    { id: "unites", label: "Unités", generateurs: [conversions] },
    // Probabilités
    { id: "probas", label: "Probabilités", generateurs: [probasEchelle, probabilites] },
    // Au programme de 5e, hors liste des automatismes
    { id: "relatifs", label: "Nombres relatifs (hors liste)", generateurs: [relatifs], horsEpreuve: true },
    { id: "litteral", label: "Calcul littéral (hors liste)", generateurs: [litteral5e], horsEpreuve: true },
    { id: "diviseurs", label: "Multiples et diviseurs (hors liste)", generateurs: [diviseurs], horsEpreuve: true },
    { id: "repere", label: "Repère (hors liste)", generateurs: [coordonnees], horsEpreuve: true },
    { id: "graphique", label: "Lire un graphique (hors liste)", generateurs: [lireValeur, lireVariation, lireInstant], horsEpreuve: true },
    { id: "stats", label: "Moyenne et fréquence (hors liste)", generateurs: [moyenne, frequence], horsEpreuve: true },
    { id: "mesures", label: "Périmètres et aires (hors liste)", generateurs: [perimetres, aires, parallelogramme], horsEpreuve: true },
    { id: "solides", label: "Solides et volumes (hors liste)", generateurs: [solides, volumes], horsEpreuve: true },
    { id: "constructible", label: "Construire un triangle (hors liste)", generateurs: [triangleConstructible], horsEpreuve: true },
    { id: "durees", label: "Durées (hors liste)", generateurs: [convertirDurees], horsEpreuve: true },
    { id: "scratch", label: "Scratch (hors liste)", generateurs: [programmeCalcul, polygone], horsEpreuve: true },
    // La langue
    { id: "rediger", label: "Rédiger une réponse", generateurs: [redigerConstructible, redigerDivisible, redigerProportionnalite] },
  ],
};
