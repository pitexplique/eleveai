// lib/automatismes/4e.ts
//
// Automatismes de 4e — réécrits le 25/09/2026.
//
// ⭐ RÉFÉRENCE : la rubrique « Automatismes » de 4e du NOUVEAU programme du
// cycle 4 (annexe 2), apportée par Frédéric le 25/09. En vigueur en 2027, mais
// c'est la seule liste officielle par niveau : on s'y aligne dès maintenant
// (pas d'épreuve en 4e, rien à perdre).
//
// ⛔ LA RÈGLE DU PROGRAMME : « les automatismes à maîtriser s'appuient sur des
// contenus qui ont été étudiés sans être automatisés au niveau précédent ».
// Les automatismes de 4e ne sont donc PAS le programme de 4e. La première
// version (24/09) reprenait presque toute la 3e ; en sont sortis : Pythagore,
// cosinus, Thalès, notation scientifique, médiane, évolutions en %, ratios,
// échelles, facteurs premiers, préfixes. Ils restent exportés d'ici (5e, 3e).
//
// Ce que la liste nomme : sommes de relatifs et opposés ; multiplication à
// trou, addition itérée, ×/÷ 10, 100, 1 000 ; fractions (somme, comparaison,
// quotient, fraction d'un nombre) ; carrés de 0 à 12, puissances simples,
// 1 200 = 1,2 × … ; 3x, x × x = x², 3x × 2x = 6x², double, moitié, successeur,
// tester une égalité ; ax = c, x + b = c ; a % de c ; droite graduée et
// repère ; demi-tour et symétrie axiale ; parallélogrammes par le codage et
// les diagonales ; droites remarquables ; solides, volumes, aires ; moyenne,
// effectif manquant, fréquence.
// Hors liste mais au programme (cochables, jamais dans « la totale ») :
// graphiques, durées et vitesses, Scratch.

import type { AutoNiveau, AutoQuestion } from "./types";
import {
  aires,
  anglesVocabulaire,
  carres,
  conversions,
  convertirDurees,
  coordonnees,
  divisibilite,
  droiteGraduee,
  ecritures,
  expressionsDeN,
  fractionDe,
  frequence,
  lireInstant,
  lireValeur,
  lireVariation,
  moyenne,
  pctComplement,
  pctEffectif,
  pctProportion,
  perimetres,
  polygone,
  probabilites,
  programmeCalcul,
  proportionnalite,
  redigerPourcentages,
  redigerPremier,
  solides,
  sommeAngles,
  symetries,
  vitesseDistance,
  vitesseDuree,
  volumes,
} from "./3e";
import type { CanvasFigure } from "@/lib/tutor-v4/types_canvas";

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

function fr(n: number): string {
  return String(Math.round(n * 1e6) / 1e6).replace(".", ",");
}

function accepte(n: number): string[] {
  const s = fr(n);
  return Array.from(new Set([s, s.replace(",", ".")]));
}

/** QCM : jamais deux fois la même ligne, la bonne réponse toujours présente. */
function qcm(correct: string, pieges: readonly string[]): string[] {
  const d = shuffle(Array.from(new Set(pieges)).filter((p) => p !== correct)).slice(0, 3);
  return shuffle([correct, ...d]);
}

/** Un relatif entre parenthèses s'il est négatif : « (−3) ». */
function par(n: number): string {
  return n < 0 ? `(${n})` : `${n}`;
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

function tex(n: number, d: number): string {
  return `\\dfrac{${n}}{${d}}`;
}

/** 1200 → « 1 200 » (espace fine insécable des milliers, comme à l'écrit). */
function milliers(n: number): string {
  return n.toLocaleString("fr-FR").replace(/[  ]/g, " ");
}

/* ═══════════════ NOMBRES RELATIFS : sommes, différences, opposés ═══════════════ */

export function sommesRelatifs(): AutoQuestion {
  const cas = entre(1, 5);
  if (cas === 1) {
    const a = nonNul(-15, 15), b = nonNul(-15, 15);
    return {
      text: `Calculer $${par(a)} + ${par(b)}$.`,
      format: "short",
      expected: accepte(a + b),
      explanation:
        (a < 0) === (b < 0)
          ? `Même signe : on ajoute les distances à zéro et on garde le signe.\n$${par(a)} + ${par(b)} = ${a + b}$.`
          : `Signes contraires : on soustrait les distances à zéro, et on garde le signe du nombre le plus loin de zéro.\n$${par(a)} + ${par(b)} = ${a + b}$.`,
    };
  }
  if (cas === 2) {
    const a = nonNul(-15, 15), b = nonNul(-15, 15);
    return {
      text: `Calculer $${par(a)} - ${par(b)}$.`,
      format: "short",
      expected: accepte(a - b),
      explanation: `Soustraire un nombre, c'est ajouter son opposé.\n$${par(a)} - ${par(b)} = ${par(a)} + ${par(-b)} = ${a - b}$.`,
    };
  }
  if (cas === 3) {
    const a = nonNul(2, 19), b = nonNul(-12, 12);
    const ordre = Math.random() < 0.5;
    const texte = ordre ? `(-${a}) + ${par(b)} + ${a}` : `${a} + ${par(b)} + (-${a})`;
    return {
      text: `Calculer $${texte}$.`,
      format: "short",
      expected: accepte(b),
      explanation: `La somme de deux nombres opposés est nulle : $${a} + (-${a}) = 0$.\nIl reste ${b}.`,
    };
  }
  if (cas === 4) {
    const a = nonNul(-20, 20);
    const dec = Math.random() < 0.3;
    const v = dec ? a + (a < 0 ? -0.5 : 0.5) : a;
    return {
      text: `Quel est l'opposé de ${fr(v)} ?`,
      format: "short",
      expected: accepte(-v),
      explanation: `Deux nombres opposés ont la même distance à zéro et des signes contraires ; leur somme est nulle.\nL'opposé de ${fr(v)} est ${fr(-v)}.`,
    };
  }
  const a = nonNul(-9, 9), s = nonNul(-12, 12);
  return {
    text: `Compléter : $${par(a)} + \\ldots = ${s}$.`,
    format: "short",
    expected: accepte(s - a),
    explanation: `Une addition à trou se complète par une soustraction.\n$${s} - ${par(a)} = ${s - a}$.`,
  };
}

/* ═══════════════ CALCUL MENTAL ═══════════════ */

export function calculMental4e(): AutoQuestion {
  const cas = entre(1, 5);
  if (cas === 1) {
    const a = entre(3, 9), b = entre(3, 12);
    return {
      text: `Compléter : $${a} \\times \\ldots = ${a * b}$.`,
      format: "short",
      expected: accepte(b),
      explanation: `On cherche dans la table de ${a} : c'est une division.\n$${a * b} \\div ${a} = ${b}$.`,
    };
  }
  if (cas === 2) {
    const [a, n] = pick([[5, 3], [4, 3], [4, 1], [5, 2], [2, 7], [8, 3], [5, 4], [3, 2], [7, 5], [3, 1], [7, 2], [9, 4]] as const);
    return {
      text: `Compléter : $${a} \\times \\ldots = ${n}$. (Donner une fraction.)`,
      format: "short",
      expected: fractionAcceptee(n, a),
      explanation: `Le nombre qui, multiplié par ${a}, donne ${n}, c'est le quotient $${tex(n, a)}$.\nEn effet, $${a} \\times ${tex(n, a)} = ${n}$.`,
    };
  }
  if (cas === 3) {
    const v = pick([3.7, 0.45, 12.5, 7, 0.8, 2.06, 45, 1.3, 0.09] as const).valueOf();
    const p = pick([10, 100, 1000] as const).valueOf();
    const fois = Math.random() < 0.5;
    const rep = fois ? v * p : v / p;
    return {
      text: `Calculer $${fr(v)} ${fois ? "\\times" : "\\div"} ${milliers(p)}$.`,
      format: "short",
      expected: accepte(rep),
      explanation: `${fois ? "Multiplier" : "Diviser"} par ${milliers(p)}, c'est rendre chaque chiffre ${milliers(p)} fois plus ${fois ? "grand" : "petit"} : la virgule se déplace de ${String(p).length - 1} rang${p > 10 ? "s" : ""} vers la ${fois ? "droite" : "gauche"}.\n$${fr(v)} ${fois ? "\\times" : "\\div"} ${milliers(p)} = ${fr(rep)}$.`,
    };
  }
  if (cas === 4) {
    const k = entre(2, 9), n = entre(3, 7);
    return {
      text: `Compléter : $${Array(n).fill(k).join(" + ")} = \\ldots \\times ${k}$.`,
      format: "short",
      expected: accepte(n),
      explanation: `Ajouter ${n} fois le même nombre, c'est le multiplier par ${n}.\n$${Array(n).fill(k).join(" + ")} = ${n} \\times ${k} = ${n * k}$.`,
    };
  }
  const [m, dec] = pick([[6, 1], [3, 1], [8, 1], [7, 1], [9, 1], [3, 2], [4, 2], [5, 2], [12, 1]] as const);
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

/** Priorités opératoires, sans multiplier de relatifs (objectif de 4e, pas automatisme). */
export function expressionsNumeriques(): AutoQuestion {
  const cas = entre(1, 4);
  const a = entre(2, 9), b = entre(2, 9), c = entre(2, 9);
  if (cas === 1) {
    return {
      text: `Calculer $${a} + ${b} \\times ${c}$.`,
      format: "short",
      expected: accepte(a + b * c),
      explanation: `La multiplication passe avant l'addition.\n$${a} + ${b * c} = ${a + b * c}$.`,
    };
  }
  if (cas === 2) {
    return {
      text: `Calculer $${a} - ${b} \\times ${c}$.`,
      format: "short",
      expected: accepte(a - b * c),
      explanation: `La multiplication passe avant la soustraction.\n$${a} - ${b * c} = ${a - b * c}$.`,
    };
  }
  if (cas === 3) {
    const g = a + entre(1, 6);
    return {
      text: `Calculer $(${g} - ${a}) \\times ${c}$.`,
      format: "short",
      expected: accepte((g - a) * c),
      explanation: `Les parenthèses d'abord.\n$${g - a} \\times ${c} = ${(g - a) * c}$.`,
    };
  }
  const d = entre(2, 9);
  return {
    text: `Calculer $${a} \\times ${b} + ${c} \\times ${d}$.`,
    format: "short",
    expected: accepte(a * b + c * d),
    explanation: `Les deux multiplications d'abord, l'addition ensuite.\n$${a * b} + ${c * d} = ${a * b + c * d}$.`,
  };
}

/* ═══════════════ FRACTIONS ═══════════════ */

const DENOMINATEURS = [[2, 4], [3, 6], [4, 8], [5, 10], [2, 3], [2, 5], [3, 4], [4, 6], [3, 9], [2, 6]] as const;

export function fractions4e(): AutoQuestion {
  const cas = entre(1, 4);
  if (cas === 1) {
    const [d1, d2] = pick(DENOMINATEURS);
    const a = entre(1, d1 - 1), b = entre(1, d2 - 1);
    const L = (d1 * d2) / pgcd(d1, d2);
    const A = (a * L) / d1, B = (b * L) / d2;
    const moins = Math.random() < 0.5 && A !== B;
    const [g1, g2] = moins && A < B ? [[b, d2, B], [a, d1, A]] : [[a, d1, A], [b, d2, B]];
    const s = moins ? g1[2] - g2[2] : g1[2] + g2[2];
    const op = moins ? "-" : "+";
    return {
      text: `Calculer $${tex(g1[0], g1[1])} ${op} ${tex(g2[0], g2[1])}$. (Donner une fraction.)`,
      format: "short",
      expected: fractionAcceptee(s, L),
      explanation: `On écrit les deux fractions avec le même dénominateur, ${L}, puis on ${moins ? "soustrait" : "ajoute"} les numérateurs.\n$${tex(g1[2], L)} ${op} ${tex(g2[2], L)} = ${tex(s, L)}$${pgcd(s, L) > 1 ? ` $= ${L / pgcd(s, L) === 1 ? s / L : tex(s / pgcd(s, L), L / pgcd(s, L))}$` : ""}.`,
    };
  }
  if (cas === 2) {
    const [d1, d2] = shuffle(pick(DENOMINATEURS));
    let a = entre(1, 2 * d1 - 1), b = entre(1, 2 * d2 - 1);
    while (a * d2 === b * d1) { a = entre(1, 2 * d1 - 1); b = entre(1, 2 * d2 - 1); }
    const L = (d1 * d2) / pgcd(d1, d2);
    const grand = a * d2 > b * d1 ? `${a}/${d1}` : `${b}/${d2}`;
    const [gn, gd] = grand.split("/");
    return {
      text: `Quelle est la plus grande des deux fractions $${tex(a, d1)}$ et $${tex(b, d2)}$ ? (Écrire la fraction.)`,
      format: "short",
      expected: [grand],
      explanation: `On les écrit avec le même dénominateur, ${L} : $${tex(a, d1)} = ${tex((a * L) / d1, L)}$ et $${tex(b, d2)} = ${tex((b * L) / d2, L)}$.\nLa plus grande est $${tex(+gn, +gd)}$.`,
    };
  }
  if (cas === 3) {
    const d = pick([3, 7, 9, 11, 13] as const).valueOf();
    const n = entre(1, 12);
    if (Math.random() < 0.5) {
      return {
        text: `Calculer $${d} \\times ${tex(n, d)}$.`,
        format: "short",
        expected: accepte(n),
        explanation: `$${tex(n, d)}$ est le nombre qui, multiplié par ${d}, donne ${n}.\nDonc $${d} \\times ${tex(n, d)} = ${n}$.`,
      };
    }
    return {
      text: `Compléter : $${tex(n, d)} \\times \\ldots = ${n}$.`,
      format: "short",
      expected: accepte(d),
      explanation: `Par définition du quotient, $${tex(n, d)} \\times ${d} = ${n}$.\nLa réponse est ${d}.`,
    };
  }
  const [n, d] = pick([[2, 3], [3, 4], [2, 5], [3, 5], [5, 6], [4, 7], [3, 8], [7, 10]] as const);
  const q = d * entre(2, 9);
  return {
    text: `Calculer $${tex(n, d)} \\times ${q}$.`,
    format: "short",
    expected: accepte((n * q) / d),
    explanation: `Multiplier par $${tex(n, d)}$, c'est prendre les $${tex(n, d)}$ de ${q} : on divise par ${d}, puis on multiplie par ${n}.\n$${q} \\div ${d} = ${q / d}$, puis $${q / d} \\times ${n} = ${(n * q) / d}$.`,
  };
}

/* ═══════════════ CARRÉS ET PUISSANCES SIMPLES ═══════════════ */

export function puissancesSimples(): AutoQuestion {
  const cas = entre(1, 3);
  if (cas === 1) {
    const [b, e] = pick([[2, 3], [3, 3], [2, 4], [2, 5], [4, 3], [5, 3], [10, 2], [10, 3], [10, 4], [1, 7], [0, 4], [3, 4]] as const);
    const v = b ** e;
    return {
      text: `Calculer $${b}^${e}$.`,
      format: "short",
      expected: accepte(v),
      explanation: `$${b}^${e}$, c'est ${b} multiplié ${e} fois par lui-même (et non $${b} \\times ${e}$).\n$${Array(e).fill(b).join(" \\times ")} = ${milliers(v)}$.`,
    };
  }
  const m = pick([1.2, 3.5, 4.7, 2.8, 6.3, 1.5, 7.2, 9.1, 2.5] as const).valueOf();
  const p = pick([100, 1000, 10000] as const).valueOf();
  const N = Math.round(m * p);
  if (cas === 2) {
    return {
      text: `Compléter : $${milliers(N)} = ${fr(m)} \\times \\ldots$`,
      format: "short",
      expected: [...accepte(p), `10^${String(p).length - 1}`],
      explanation: `On passe de ${fr(m)} à ${milliers(N)} en déplaçant la virgule de ${String(p).length - 1} rangs vers la droite.\n$${milliers(N)} = ${fr(m)} \\times ${milliers(p)}$.`,
    };
  }
  return {
    text: `Compléter : $${milliers(N)} = \\ldots \\times ${milliers(p)}$`,
    format: "short",
    expected: accepte(m),
    explanation: `On cherche le nombre ${milliers(p)} fois plus petit que ${milliers(N)} : on divise par ${milliers(p)}.\n$${milliers(N)} \\div ${milliers(p)} = ${fr(m)}$.`,
  };
}

/* ═══════════════ CALCUL LITTÉRAL ═══════════════ */

export function reduire4e(): AutoQuestion {
  const cas = entre(1, 4);
  const a = entre(2, 9), b = entre(2, 9);
  const lettre = pick(["x", "y", "a", "t"]);
  if (cas === 1) {
    const bonne = `$${a + b}${lettre}$`;
    return {
      text: `Réduire $${a}${lettre} + ${b}${lettre}$.`,
      format: "qcm",
      choices: qcm(bonne, [`$${a * b}${lettre}$`, `$${a + b}${lettre}^2$`, `$${a * b}${lettre}^2$`, `$${a}${b}${lettre}$`]),
      expected: [bonne],
      explanation: `On ajoute des « ${lettre} » : ${a} ${lettre} plus ${b} ${lettre}, cela fait ${a + b} ${lettre}.\n$${a}${lettre} + ${b}${lettre} = ${a + b}${lettre}$.`,
    };
  }
  if (cas === 2) {
    const bonne = `$${a * b}${lettre}^2$`;
    return {
      text: `Réduire $${a}${lettre} \\times ${b}${lettre}$.`,
      format: "qcm",
      choices: qcm(bonne, [`$${a * b}${lettre}$`, `$${a + b}${lettre}^2$`, `$${a + b}${lettre}$`, `$${a * b}${lettre}^${2 * 1 + 1}$`]),
      expected: [bonne],
      explanation: `On multiplie les nombres entre eux et les lettres entre elles : $${lettre} \\times ${lettre} = ${lettre}^2$.\n$${a} \\times ${b} \\times ${lettre} \\times ${lettre} = ${a * b}${lettre}^2$.`,
    };
  }
  if (cas === 3) {
    const bonne = `$${a * b}${lettre}$`;
    return {
      text: `Réduire $${a}${lettre} \\times ${b}$.`,
      format: "qcm",
      choices: qcm(bonne, [`$${a + b}${lettre}$`, `$${a * b}${lettre}^2$`, `$${a}${lettre} + ${b}$`, `$${a}${b}${lettre}$`]),
      expected: [bonne],
      explanation: `$${a}${lettre}$, c'est $${a} \\times ${lettre}$ : on multiplie les nombres entre eux.\n$${a} \\times ${b} \\times ${lettre} = ${a * b}${lettre}$.`,
    };
  }
  const f = pick([
    { e: `${lettre} + ${lettre}`, r: `2${lettre}`, p: [`${lettre}^2`, `2`, `2${lettre}^2`], m: `deux fois ${lettre}` },
    { e: `${lettre} \\times ${lettre}`, r: `${lettre}^2`, p: [`2${lettre}`, `${lettre}`, `2${lettre}^2`], m: `${lettre} multiplié par lui-même, c'est son carré` },
    { e: `1 \\times ${lettre}`, r: `${lettre}`, p: [`1${lettre}^2`, `1 + ${lettre}`, `0`], m: `multiplier par 1 ne change rien` },
    { e: `${lettre} + ${lettre} + ${lettre}`, r: `3${lettre}`, p: [`${lettre}^3`, `3${lettre}^3`, `3 + ${lettre}`], m: `trois fois ${lettre}` },
    { e: `${lettre} \\times ${lettre} \\times ${lettre}`, r: `${lettre}^3`, p: [`3${lettre}`, `${lettre}^2`, `3${lettre}^3`], m: `${lettre} multiplié trois fois par lui-même, c'est son cube` },
  ]);
  const bonne = `$${f.r}$`;
  return {
    text: `Écrire plus simplement $${f.e}$.`,
    format: "qcm",
    choices: qcm(bonne, f.p.map((p) => `$${p}$`)),
    expected: [bonne],
    explanation: `$${f.e}$ : ${f.m}.\n$${f.e} = ${f.r}$.`,
  };
}

/** Valeur d'une expression, avec un nombre POSITIF : la multiplication des relatifs est un objectif de 4e. */
export function valeurExpression4e(): AutoQuestion {
  const cas = entre(1, 4);
  const x = entre(2, 6);
  if (cas === 1) {
    const a = entre(2, 9), b = entre(1, 12);
    const moins = Math.random() < 0.5;
    const rep = moins ? a * x - b : a * x + b;
    return {
      text: `Calculer $${a}x ${moins ? "-" : "+"} ${b}$ pour $x = ${x}$.`,
      format: "short",
      expected: accepte(rep),
      explanation: `$${a}x$ veut dire $${a} \\times x$ : on remplace $x$ par ${x}.\n$${a} \\times ${x} ${moins ? "-" : "+"} ${b} = ${a * x} ${moins ? "-" : "+"} ${b} = ${rep}$.`,
    };
  }
  if (cas === 2) {
    const a = entre(2, 6), b = entre(1, 8);
    return {
      text: `Calculer $${a}(x + ${b})$ pour $x = ${x}$.`,
      format: "short",
      expected: accepte(a * (x + b)),
      explanation: `On remplace $x$ par ${x} : $${a} \\times (${x} + ${b})$, la parenthèse d'abord.\n$${a} \\times ${x + b} = ${a * (x + b)}$.`,
    };
  }
  if (cas === 3) {
    const b = entre(1, 9);
    const moins = Math.random() < 0.5;
    const rep = moins ? x * x - b : x * x + b;
    return {
      text: `Calculer $x^2 ${moins ? "-" : "+"} ${b}$ pour $x = ${x}$.`,
      format: "short",
      expected: accepte(rep),
      explanation: `$x^2 = x \\times x$ : ici $${x} \\times ${x} = ${x * x}$ (et non $${x} \\times 2$).\n$${x * x} ${moins ? "-" : "+"} ${b} = ${rep}$.`,
    };
  }
  const a = entre(2, 4);
  return {
    text: `Calculer $${a}x^2$ pour $x = ${x}$.`,
    format: "short",
    expected: accepte(a * x * x),
    explanation: `Le carré porte sur $x$ seulement : $${a}x^2 = ${a} \\times x \\times x$.\n$${a} \\times ${x * x} = ${a * x * x}$ (et non $(${a} \\times ${x})^2 = ${(a * x) ** 2}$).`,
  };
}

export function testerEgalite(): AutoQuestion {
  const cas = entre(1, 3);
  const x = entre(1, 6);
  const vrai = Math.random() < 0.5;
  const decale = vrai ? 0 : pick([1, 2, -1, 3] as const).valueOf();
  let gauche: string, droite: string, g: number, d: number;
  if (cas === 1) {
    const a = entre(2, 9), b = entre(1, 9);
    g = a * x + b; d = g + decale;
    gauche = `${a}x + ${b}`; droite = `${d}`;
  } else if (cas === 2) {
    const a = entre(3, 7), c = entre(1, a - 1), b = entre(1, 9);
    g = a * x + b;
    const k = g - c * x + decale;
    d = c * x + k;
    gauche = `${a}x + ${b}`; droite = `${c === 1 ? "" : c}x + ${k}`;
  } else {
    const b = entre(1, 9);
    g = x * x + b; d = g + decale;
    gauche = `x^2 + ${b}`; droite = `${d}`;
  }
  return {
    text: `L'égalité $${gauche} = ${droite}$ est-elle vraie pour $x = ${x}$ ? Répondre par oui ou par non.`,
    format: "short",
    expected: vrai ? ["oui", "Oui"] : ["non", "Non"],
    explanation: `On remplace $x$ par ${x} dans CHAQUE membre, séparément.\nÀ gauche : ${g} ; à droite : ${d}. ${vrai ? "Les deux sont égaux : oui." : "Ils sont différents : non."}`,
  };
}

/* ═══════════════ ÉQUATIONS ax = c ET x + b = c ═══════════════ */

export function equations4e(): AutoQuestion {
  const cas = entre(1, 4);
  if (cas === 1) {
    const x = entre(-8, 15), b = entre(2, 15);
    return {
      text: `Résoudre l'équation $x + ${b} = ${x + b}$.`,
      format: "short",
      expected: accepte(x),
      explanation: `On retire ${b} des deux côtés (l'addition à trou se complète par une soustraction).\n$x = ${x + b} - ${b} = ${x}$.`,
    };
  }
  if (cas === 2) {
    const x = entre(-5, 15), b = entre(2, 12);
    return {
      text: `Résoudre l'équation $x - ${b} = ${x - b}$.`,
      format: "short",
      expected: accepte(x),
      explanation: `On ajoute ${b} des deux côtés.\n$x = ${x - b} + ${b} = ${x}$.`,
    };
  }
  if (cas === 3) {
    const a = entre(2, 9), x = entre(2, 12);
    return {
      text: `Résoudre l'équation $${a}x = ${a * x}$.`,
      format: "short",
      expected: accepte(x),
      explanation: `$${a}x$, c'est $${a} \\times x$ : on divise les deux côtés par ${a}.\n$x = ${a * x} \\div ${a} = ${x}$.`,
    };
  }
  const [a, c] = pick([[4, 3], [5, 2], [3, 2], [7, 4], [2, 5], [8, 5], [3, 7], [6, 5], [9, 2], [4, 7]] as const);
  return {
    text: `Résoudre l'équation $${a}x = ${c}$. (Donner une fraction.)`,
    format: "short",
    expected: fractionAcceptee(c, a),
    explanation: `On divise les deux côtés par ${a} : $x$ est le quotient de ${c} par ${a}.\n$x = ${tex(c, a)}$.`,
  };
}

/* ═══════════════ REPÈRE : DROITE GRADUÉE DES RELATIFS ═══════════════ */

export function droiteRelatifs(): AutoQuestion {
  const pas = pick([1, 0.5] as const).valueOf();
  let v = entre(-8, 8) * pas;
  while (v === 0 || v === 1 || v > 4 || v < -4) v = entre(-8, 8) * pas;
  const canvas = {
    kind: "number_line",
    min: -4,
    max: 4,
    step: pas,
    points: [
      { value: 0, label: "0" },
      { value: 1, label: "1" },
      { value: v, label: "M", color: "#c2410c" },
    ],
    display: { showTicks: true, showValues: false, showPoints: true, showPointLabels: true },
    size: { width: 440, height: 110 },
  } as unknown as CanvasFigure;
  return {
    text: "Quelle est l'abscisse du point M sur cette droite graduée ?",
    format: "short",
    expected: accepte(v),
    explanation: `On repère l'unité entre 0 et 1 : ${pas === 1 ? "chaque graduation vaut 1" : "elle est partagée en 2, chaque graduation vaut 0,5"}.\nM est à ${Math.abs(v / pas)} graduation${Math.abs(v / pas) > 1 ? "s" : ""} ${v < 0 ? "à gauche" : "à droite"} de 0 : son abscisse est ${fr(v)}.`,
    canvas,
  };
}

/* ═══════════════ PARALLÉLOGRAMMES PAR LE CODAGE ET LES DIAGONALES ═══════════════ */

const NOMS_QUADRI = ["ABCD", "EFGH", "MNOP", "RSTU", "IJKL"] as const;
const NATURES = ["un parallélogramme", "un rectangle", "un losange", "un carré"] as const;

export function quadrilateres(): AutoQuestion {
  const nom = pick(NOMS_QUADRI);
  const [A, B, C, D] = nom.split("");
  const cas = pick([
    { t: `Les diagonales du quadrilatère ${nom} se coupent en leur milieu.`, r: 0, e: "Des diagonales qui se coupent en leur milieu : c'est la propriété caractéristique du parallélogramme." },
    { t: `Les diagonales du quadrilatère ${nom} se coupent en leur milieu et ont la même longueur.`, r: 1, e: "Même milieu : parallélogramme ; même longueur en plus : rectangle." },
    { t: `Les diagonales du quadrilatère ${nom} se coupent en leur milieu et sont perpendiculaires.`, r: 2, e: "Même milieu : parallélogramme ; perpendiculaires en plus : losange." },
    { t: `Les diagonales du quadrilatère ${nom} se coupent en leur milieu, ont la même longueur et sont perpendiculaires.`, r: 3, e: "Même milieu et même longueur : rectangle ; perpendiculaires en plus : c'est aussi un losange, donc un carré." },
    { t: `Le quadrilatère ${nom} a ses côtés opposés parallèles deux à deux.`, r: 0, e: "Côtés opposés parallèles deux à deux : c'est la définition du parallélogramme." },
    { t: `Le quadrilatère ${nom} a ses côtés opposés de même longueur deux à deux.`, r: 0, e: "Côtés opposés de même longueur : c'est une propriété caractéristique du parallélogramme." },
    { t: `Le quadrilatère ${nom} a ses quatre côtés de même longueur.`, r: 2, e: "Quatre côtés de même longueur : c'est un losange." },
    { t: `${nom} est un parallélogramme et ${A}${B} = ${B}${C}.`, r: 2, e: "Un parallélogramme qui a deux côtés consécutifs de même longueur est un losange." },
    { t: `${nom} est un parallélogramme et l'angle $\\widehat{${A}${B}${C}}$ est droit.`, r: 1, e: "Un parallélogramme qui a un angle droit est un rectangle." },
    { t: `${nom} est un losange et l'angle $\\widehat{${B}${C}${D}}$ est droit.`, r: 3, e: "Un losange qui a un angle droit est aussi un rectangle : c'est un carré." },
    { t: `${nom} est un rectangle et ${A}${B} = ${B}${C}.`, r: 3, e: "Un rectangle qui a deux côtés consécutifs de même longueur est aussi un losange : c'est un carré." },
    { t: `${nom} est un parallélogramme et ses diagonales [${A}${C}] et [${B}${D}] ont la même longueur.`, r: 1, e: "Un parallélogramme dont les diagonales ont la même longueur est un rectangle." },
    { t: `${nom} est un parallélogramme et ses diagonales [${A}${C}] et [${B}${D}] sont perpendiculaires.`, r: 2, e: "Un parallélogramme dont les diagonales sont perpendiculaires est un losange." },
  ]);
  const bonne = NATURES[cas.r];
  return {
    text: `${cas.t} Quelle est sa nature, la plus précise possible ?`,
    format: "qcm",
    choices: [...NATURES],
    expected: [bonne],
    explanation: `${cas.e}\n${nom} est ${bonne}.`,
  };
}

/* ═══════════════ DROITES REMARQUABLES DU TRIANGLE ═══════════════ */

const TRIANGLES = [["A", "B", "C"], ["E", "F", "G"], ["R", "S", "T"], ["K", "L", "M"], ["P", "Q", "R"]] as const;

export function droitesRemarquables(): AutoQuestion {
  const tri = shuffle(pick(TRIANGLES));
  const [S, U, V] = tri;
  const nomTri = [...tri].sort().join("");
  const cas = pick([
    { t: `la droite qui passe par ${S} et qui est perpendiculaire à (${U}${V})`, r: "hauteur", e: `Elle part d'un sommet et coupe le côté opposé à angle droit : c'est la hauteur issue de ${S}.` },
    { t: `la droite qui passe par ${S} et par le milieu de [${U}${V}]`, r: "médiane", e: `Elle joint un sommet au milieu du côté opposé : c'est la médiane issue de ${S}.` },
    { t: `la droite perpendiculaire à [${U}${V}] qui passe par son milieu`, r: "médiatrice", e: `Perpendiculaire à un côté en son milieu : c'est la médiatrice de [${U}${V}].` },
    { t: `la droite qui partage l'angle $\\widehat{${U}${S}${V}}$ en deux angles égaux`, r: "bissectrice", e: `Elle coupe un angle en deux angles de même mesure : c'est la bissectrice de $\\widehat{${U}${S}${V}}$.` },
  ]);
  return {
    text: `Dans le triangle ${nomTri}, comment s'appelle ${cas.t} ?`,
    format: "qcm",
    choices: ["hauteur", "médiane", "médiatrice", "bissectrice"],
    expected: [cas.r],
    explanation: `${cas.e}\nHauteur : sommet + angle droit. Médiane : sommet + milieu. Médiatrice : milieu + angle droit. Bissectrice : angle coupé en deux.`,
  };
}

/* ═══════════════ STATISTIQUES : EFFECTIF MANQUANT ═══════════════ */

export function effectifManquant(): AutoQuestion {
  const ctx = pick([
    { q: "Dans une classe, on a demandé aux élèves comment ils viennent au collège.", cats: ["à pied", "en bus", "à vélo", "en voiture"] },
    { q: "Lors d'un comptage d'oiseaux, on a noté les espèces observées.", cats: ["moineaux", "mésanges", "merles", "pigeons"] },
    { q: "Un club de sport a relevé le sport préféré de ses adhérents.", cats: ["football", "natation", "tennis", "judo"] },
    { q: "On a relevé la couleur des voitures d'un parking.", cats: ["blanches", "noires", "grises", "rouges"] },
  ]);
  const n = pick([3, 4] as const).valueOf();
  const cats = ctx.cats.slice(0, n);
  const eff = cats.map(() => entre(3, 15));
  const total = eff.reduce((s, e) => s + e, 0);
  const i = entre(0, n - 1);
  const lignes = cats.map((c, k) => `${c} : ${k === i ? "?" : eff[k]}`).join(" ; ");
  const connus = eff.filter((_, k) => k !== i);
  return {
    text: `${ctx.q} Effectifs — ${lignes} ; total : ${total}. Quel est l'effectif manquant ?`,
    format: "short",
    expected: accepte(eff[i]),
    explanation: `L'effectif manquant, c'est le total moins la somme des autres effectifs.\n$${total} - (${connus.join(" + ")}) = ${total} - ${connus.reduce((s, e) => s + e, 0)} = ${eff[i]}$.`,
  };
}

/* ═══════════════ RÉDIGER UNE RÉPONSE, À LA MESURE DE LA 4e ═══════════════ */

const CRITERE_ORTHO = "Ma phrase est complète, avec une majuscule, un point et sans faute d'orthographe.";

export function redigerTester(): AutoQuestion {
  const a = entre(2, 5), b = entre(1, 9), c = entre(a + 1, 8);
  // On choisit x pour que l'égalité ax + b = cx soit FAUSSE : b ≠ (c − a)x.
  let x = entre(1, 5);
  while (b === (c - a) * x) x = entre(1, 5);
  const g = a * x + b, d = c * x;
  return {
    text: `Léo affirme que l'égalité $${a}x + ${b} = ${c}x$ est vraie pour $x = ${x}$. **A-t-il raison ? Justifier.**`,
    format: "redaction",
    expected: [],
    modele: `Non, il a tort. Pour $x = ${x}$, le membre de gauche vaut $${a} \\times ${x} + ${b} = ${g}$ et le membre de droite vaut $${c} \\times ${x} = ${d}$. Comme ${g} ≠ ${d}, l'égalité est fausse pour $x = ${x}$.`,
    criteres: [
      "J'ai répondu par oui ou par non.",
      "J'ai calculé les deux membres séparément, en remplaçant x.",
      CRITERE_ORTHO,
    ],
    explanation: "Pour tester une égalité, on calcule chaque membre avec la valeur donnée, puis on compare.",
  };
}

export function redigerNature(): AutoQuestion {
  const nom = pick(NOMS_QUADRI);
  const cas = pick([
    { t: "se coupent en leur milieu et ont la même longueur", r: "un rectangle", p: "Un quadrilatère dont les diagonales se coupent en leur milieu est un parallélogramme ; si, de plus, elles ont la même longueur, c'est un rectangle." },
    { t: "se coupent en leur milieu et sont perpendiculaires", r: "un losange", p: "Un quadrilatère dont les diagonales se coupent en leur milieu est un parallélogramme ; si, de plus, elles sont perpendiculaires, c'est un losange." },
    { t: "se coupent en leur milieu", r: "un parallélogramme", p: "Un quadrilatère dont les diagonales se coupent en leur milieu est un parallélogramme." },
    { t: "se coupent en leur milieu, ont la même longueur et sont perpendiculaires", r: "un carré", p: "Des diagonales de même milieu et de même longueur en font un rectangle ; perpendiculaires, elles en font aussi un losange : c'est donc un carré." },
  ]);
  return {
    text: `Les diagonales du quadrilatère ${nom} ${cas.t}. **Quelle est la nature de ${nom} ? Justifier.**`,
    format: "redaction",
    expected: [],
    modele: `${nom} est ${cas.r}. ${cas.p}`,
    criteres: [
      "J'ai donné la nature du quadrilatère.",
      "J'ai cité la propriété des diagonales qui le prouve.",
      CRITERE_ORTHO,
    ],
    explanation: "On justifie une nature par une propriété CARACTÉRISTIQUE : d'abord parallélogramme (même milieu), puis la propriété en plus.",
  };
}

/* ═══════════════ GÉNÉRATEURS SORTIS DE LA 4e (25/09), gardés pour la 5e et la 3e ═══════════════ */

export function divisionEuclidienne(): AutoQuestion {
  const b = entre(3, 9), q = entre(4, 15), r = entre(1, b - 1);
  const a = b * q + r;
  const ctx = pick([
    { t: `On range ${a} œufs dans des boîtes de ${b}.`, qQ: "Combien de boîtes pleines obtient-on ?", qR: "Combien d'œufs reste-t-il ?" },
    { t: `On forme des équipes de ${b} joueurs avec ${a} élèves.`, qQ: "Combien d'équipes complètes forme-t-on ?", qR: "Combien d'élèves restent sans équipe ?" },
    { t: `On plante ${a} arbres en rangées de ${b}.`, qQ: "Combien de rangées complètes obtient-on ?", qR: "Combien d'arbres reste-t-il ?" },
  ]);
  const demandeReste = Math.random() < 0.5;
  return {
    text: `${ctx.t} ${demandeReste ? ctx.qR : ctx.qQ}`,
    format: "short",
    expected: accepte(demandeReste ? r : q),
    explanation: `C'est la division euclidienne de ${a} par ${b} : $${a} = ${b} \\times ${q} + ${r}$, avec un reste ${r} < ${b}.\n${demandeReste ? `Le reste est ${r}.` : `Le quotient est ${q}.`}`,
  };
}

export function decomposition(): AutoQuestion {
  const cas = pick([
    { n: 60, d: "2^2 \\times 3 \\times 5", grand: 5, nb: 3 },
    { n: 84, d: "2^2 \\times 3 \\times 7", grand: 7, nb: 3 },
    { n: 90, d: "2 \\times 3^2 \\times 5", grand: 5, nb: 3 },
    { n: 126, d: "2 \\times 3^2 \\times 7", grand: 7, nb: 3 },
    { n: 150, d: "2 \\times 3 \\times 5^2", grand: 5, nb: 3 },
    { n: 132, d: "2^2 \\times 3 \\times 11", grand: 11, nb: 3 },
    { n: 66, d: "2 \\times 3 \\times 11", grand: 11, nb: 3 },
    { n: 70, d: "2 \\times 5 \\times 7", grand: 7, nb: 3 },
    { n: 98, d: "2 \\times 7^2", grand: 7, nb: 2 },
    { n: 45, d: "3^2 \\times 5", grand: 5, nb: 2 },
    { n: 72, d: "2^3 \\times 3^2", grand: 3, nb: 2 },
    { n: 104, d: "2^3 \\times 13", grand: 13, nb: 2 },
    { n: 117, d: "3^2 \\times 13", grand: 13, nb: 2 },
    { n: 170, d: "2 \\times 5 \\times 17", grand: 17, nb: 3 },
  ]);
  const q = pick(["grand", "nb"] as const);
  return {
    text:
      q === "grand"
        ? `Quel est le plus grand facteur premier de ${cas.n} ?`
        : `Combien de nombres premiers DIFFÉRENTS apparaissent dans la décomposition de ${cas.n} ?`,
    format: "short",
    expected: accepte(q === "grand" ? cas.grand : cas.nb),
    explanation: `On divise par les nombres premiers dans l'ordre (2, 3, 5, 7…) tant que c'est possible.\n$${cas.n} = ${cas.d}$.`,
  };
}

export function prefixes(): AutoQuestion {
  const cas = pick([
    () => { const v = entre(2, 9); return { t: `Combien de mètres y a-t-il dans ${v} km ?`, r: v * 1000, e: `kilo = mille : 1 km = $10^3$ m.\n$${v} \\times 1000 = ${v * 1000}$ m.` }; },
    () => { const v = entre(2, 9); return { t: `Combien d'octets y a-t-il dans ${v} ko ? (1 ko = 1 000 octets.)`, r: v * 1000, e: `kilo = $10^3$.\n${v} ko = ${v * 1000} octets.` }; },
    () => { const v = entre(2, 9); return { t: `Un fichier fait ${v} Go. Combien de Mo cela représente-t-il ? (1 Go = 1 000 Mo.)`, r: v * 1000, e: `giga = $10^9$, méga = $10^6$ : un giga vaut mille mégas.\n${v} Go = ${v * 1000} Mo.` }; },
    () => { const v = entre(2, 9); return { t: `Combien de millisecondes y a-t-il dans ${v} s ?`, r: v * 1000, e: `milli = un millième : 1 s = 1 000 ms.\n${v} s = ${v * 1000} ms.` }; },
    () => { const p = pick([3, 6, 9, -3, -6] as const).valueOf(); const nom = { 3: "kilo", 6: "méga", 9: "giga", [-3]: "milli", [-6]: "micro" }[p]; return { t: `Le préfixe « ${nom} » correspond à $10^n$. Donner $n$.`, r: p, e: `kilo = $10^3$, méga = $10^6$, giga = $10^9$ ; milli = $10^{-3}$, micro = $10^{-6}$.\n${nom} : $n = ${p}$.` }; },
    () => { const v = pick([2, 5, 8] as const).valueOf(); return { t: `Une cellule mesure ${v} µm (micromètres). Combien de mm cela fait-il ?`, r: v / 1000, e: `1 mm = 1 000 µm : on divise par 1 000.\n$${v} \\div 1000 = ${fr(v / 1000)}$ mm.` }; },
  ]);
  const { t, r, e } = cas();
  return { text: t, format: "short", expected: accepte(r), explanation: e };
}

export function ratios(): AutoQuestion {
  const [a, b] = pick([[2, 3], [1, 4], [3, 5], [2, 5], [1, 2], [3, 4], [4, 5]] as const);
  // k ≥ 4 : « une classe de 10 élèves » sortait à l'aperçu (24/09).
  const k = entre(4, 12);
  const total = (a + b) * k;
  const ctx = pick([
    // ⛔ `aQui` porte la préposition contractée : « à le bleu », « à les
    // externes » sortaient au premier jet (24/09).
    { t: `On partage ${total} € entre Léa et Sami dans le ratio ${a} : ${b}.`, qui: "Léa", quiB: "Sami", aQui: "à Léa", aQuiB: "à Sami", u: "€" },
    { t: `Une peinture mélange du bleu et du jaune dans le ratio ${a} : ${b}, pour ${total} L en tout.`, qui: "le bleu", quiB: "le jaune", aQui: "au bleu", aQuiB: "au jaune", u: "L" },
    { t: `Une classe de ${total} élèves compte des externes et des demi-pensionnaires dans le ratio ${a} : ${b}.`, qui: "les externes", quiB: "les demi-pensionnaires", aQui: "aux externes", aQuiB: "aux demi-pensionnaires", u: "" },
  ]);
  const premier = Math.random() < 0.5;
  const rep = (premier ? a : b) * k;
  return {
    text: `${ctx.t} Quelle part revient ${premier ? ctx.aQui : ctx.aQuiB}${ctx.u ? `, en ${ctx.u}` : ""} ?`,
    format: "short",
    expected: accepte(rep),
    explanation: `Un ratio ${a} : ${b}, c'est ${a + b} parts égales en tout.\nUne part vaut $${total} \\div ${a + b} = ${k}$ ; ${premier ? ctx.qui : ctx.quiB} en reçoit ${premier ? a : b}, soit ${rep}.`,
  };
}

export function echelles(): AutoQuestion {
  const cas = entre(1, 3);
  if (cas === 1) {
    const e = pick([100, 1000, 10000, 25000, 50000] as const).valueOf();
    const cm = entre(2, 9);
    const reelCm = cm * e;
    const km = reelCm / 100000;
    const enKm = km >= 1;
    return {
      text: `Sur une carte à l'échelle 1/${milliers(e)}, deux points sont à ${cm} cm. Quelle est la distance réelle, en ${enKm ? "km" : "m"} ?`,
      format: "short",
      expected: accepte(enKm ? km : reelCm / 100),
      explanation: `1 cm sur la carte représente ${e} cm en vrai.\n$${cm} \\times ${e} = ${reelCm}$ cm, soit ${enKm ? `${fr(km)} km` : `${fr(reelCm / 100)} m`}.`,
    };
  }
  const k = pick([2, 3, 0.5, 4] as const).valueOf();
  const aire = cas === 2;
  const v = entre(2, 9);
  const facteur = aire ? k * k : k * k * k;
  // Sans calculatrice : un volume × 27 ou × 64 ne se fait pas de tête.
  if (!aire && k > 2) return echelles();
  return {
    text: `On ${k > 1 ? "agrandit" : "réduit"} ${aire ? "une figure" : "un solide"} dans le rapport ${fr(k)}. ${aire ? `Son aire valait ${v} cm². Que vaut-elle ensuite, en cm² ?` : `Son volume valait ${v * 8} cm³. Que vaut-il ensuite, en cm³ ?`}`,
    format: "short",
    expected: accepte((aire ? v : v * 8) * facteur),
    explanation: `Les longueurs sont multipliées par ${fr(k)}, les AIRES par $${fr(k)}^2 = ${fr(k * k)}$, les VOLUMES par $${fr(k)}^3 = ${fr(k * k * k)}$.\n$${aire ? v : v * 8} \\times ${fr(facteur)} = ${fr((aire ? v : v * 8) * facteur)}$.`,
  };
}

/* ═══════════════ LE NIVEAU ═══════════════ */

export const automatismes4e: AutoNiveau = {
  classe: "4e",
  label: "4e",
  duree: 20,
  examen: "Pas d'épreuve en 4e : les automatismes que le programme de 4e demande, de tête, sans calculatrice, avec une question à rédiger",
  nbQuestions: 10,
  toujours: ["rediger"],
  themes: [
    // Nombres et calculs
    { id: "relatifs", label: "Nombres relatifs", generateurs: [sommesRelatifs] },
    { id: "calcul", label: "Calcul mental", generateurs: [calculMental4e, expressionsNumeriques] },
    { id: "fractions", label: "Fractions", generateurs: [fractions4e, fractionDe, droiteGraduee, ecritures] },
    { id: "puissances", label: "Carrés et puissances", generateurs: [carres, puissancesSimples] },
    { id: "entiers", label: "Divisibilité, division euclidienne", generateurs: [divisibilite, divisionEuclidienne] },
    { id: "litteral", label: "Calcul littéral", generateurs: [reduire4e, expressionsDeN, valeurExpression4e, testerEgalite] },
    { id: "equations", label: "Équations", generateurs: [equations4e] },
    // Proportionnalité
    { id: "pourcentages", label: "Pourcentages", generateurs: [pctEffectif, pctComplement, pctProportion] },
    { id: "proportionnalite", label: "Proportionnalité", generateurs: [proportionnalite] },
    // Espace et géométrie
    { id: "repere", label: "Droite graduée et repère", generateurs: [droiteRelatifs, coordonnees] },
    { id: "transformations", label: "Symétries et parallélogrammes", generateurs: [symetries, quadrilateres] },
    { id: "triangles", label: "Triangles et angles", generateurs: [droitesRemarquables, sommeAngles, anglesVocabulaire] },
    { id: "mesures", label: "Aires et périmètres", generateurs: [aires, perimetres] },
    { id: "solides", label: "Solides et volumes", generateurs: [solides, volumes, conversions] },
    // Données
    { id: "stats", label: "Moyenne, effectifs, fréquence", generateurs: [moyenne, frequence, effectifManquant] },
    { id: "probas", label: "Probabilités", generateurs: [probabilites] },
    // Au programme, hors liste des automatismes
    { id: "graphique", label: "Lire un graphique (hors liste)", generateurs: [lireValeur, lireVariation, lireInstant], horsEpreuve: true },
    { id: "durees", label: "Durées et vitesses (hors liste)", generateurs: [convertirDurees, vitesseDuree, vitesseDistance], horsEpreuve: true },
    { id: "scratch", label: "Scratch (hors liste)", generateurs: [programmeCalcul, polygone], horsEpreuve: true },
    // La langue
    { id: "rediger", label: "Rédiger une réponse", generateurs: [redigerTester, redigerNature, redigerPremier, redigerPourcentages] },
  ],
};
