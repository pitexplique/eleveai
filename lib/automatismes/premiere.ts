// lib/automatismes/premiere.ts
//
// Automatismes de Première — la première partie de l'épreuve anticipée de
// mathématiques (EAM), 24/09/2026.
//
// ⛔ PLUS DE QCM (message de l'IPR, 24/09/2026) : « questions à réponses
// courtes ; le format QCM est donc désormais écarté ». Et « les automatismes
// évalués sont ceux des nouveaux programmes de seconde et de première, communs
// aux différents profils d'élèves (avec ou sans EDS et voie technologique) ».
// Toutes les questions ci-dessous se tapent donc au clavier.
//
// RÉFÉRENCE DE CONTENU : deux évaluations d'entraînement de Galilee (« Automatismes
// — Évaluation 1 et 2 », 12 questions, 30 min, encore en QCM) apportées par
// Frédéric, et leur découpage en thèmes (fractions, puissances, écriture
// scientifique, racines, conversions, développer-factoriser, équations,
// inéquations, fonctions, droites, pourcentages, évolutions, probabilités,
// statistiques). ⛔ On ne reprend AUCUNE de leurs questions : on en tire les
// thèmes et le niveau, et chaque question est générée ici.
//
// ⚠️ Répondre au clavier sans QCM : une expression algébrique ne se compare pas
// en chaîne (« 4x²−20x+25 » et « 25−20x+4x² »). On demande donc un NOMBRE :
// le coefficient manquant d'un développement, l'exposant, la solution.

import type { CanvasFigure } from "@/lib/tutor-v4/types_canvas";
import type { AutoNiveau, AutoQuestion } from "./types";

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

/** Une fraction irréductible, dénominateur positif. */
type Frac = { n: number; d: number };
function frac(n: number, d: number): Frac {
  const g = pgcd(n, d) || 1;
  const s = d < 0 ? -1 : 1;
  return { n: (s * n) / g, d: (s * d) / g };
}
const plus = (a: Frac, b: Frac) => frac(a.n * b.d + b.n * a.d, a.d * b.d);
const moins = (a: Frac, b: Frac) => frac(a.n * b.d - b.n * a.d, a.d * b.d);
const fois = (a: Frac, b: Frac) => frac(a.n * b.n, a.d * b.d);
const divise = (a: Frac, b: Frac) => frac(a.n * b.d, a.d * b.n);
const tex = (f: Frac) => (f.d === 1 ? `${f.n}` : `${f.n < 0 ? "-" : ""}\\dfrac{${Math.abs(f.n)}}{${f.d}}`);
const texte = (f: Frac) => (f.d === 1 ? `${f.n}` : `${f.n}/${f.d}`);

/** Signe écrit devant un terme : « + 3 », « − 3 ». */
function sg(b: number): string {
  return b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`;
}

/** « 3x », « −x », « x » */
function coefX(a: number, lettre = "x"): string {
  if (a === 1) return lettre;
  if (a === -1) return `-${lettre}`;
  return `${a}${lettre}`;
}

/* ═══════════════ FRACTIONS ═══════════════ */

export function fractionsCalcul(): AutoQuestion {
  for (;;) {
    const x = frac(entre(1, 9), pick([2, 3, 4, 5, 6] as const));
    const y = frac(entre(1, 7), pick([2, 3, 4, 5] as const));
    const z = frac(entre(1, 9), pick([2, 3, 4, 5] as const));
    const forme = entre(1, 3);
    let r: Frac;
    let expr: string;
    let etapes: string;
    if (forme === 1) {
      const p = fois(y, z);
      r = moins(x, p);
      expr = `${tex(x)} - ${tex(y)} \\times ${tex(z)}`;
      etapes = `La multiplication d'abord : $${tex(y)} \\times ${tex(z)} = ${tex(p)}$.\nPuis $${tex(x)} - ${tex(p)} = ${tex(r)}$.`;
    } else if (forme === 2) {
      const q = divise(y, z);
      r = plus(x, q);
      expr = `${tex(x)} + ${tex(y)} \\div ${tex(z)}`;
      etapes = `La division d'abord : diviser, c'est multiplier par l'inverse. $${tex(y)} \\div ${tex(z)} = ${tex(y)} \\times ${tex(frac(z.d, z.n))} = ${tex(q)}$.\nPuis $${tex(x)} + ${tex(q)} = ${tex(r)}$.`;
    } else {
      const s = plus(x, y);
      r = fois(s, z);
      expr = `\\left(${tex(x)} + ${tex(y)}\\right) \\times ${tex(z)}`;
      etapes = `Les parenthèses d'abord : $${tex(x)} + ${tex(y)} = ${tex(s)}$.\nPuis $${tex(s)} \\times ${tex(z)} = ${tex(r)}$.`;
    }
    if (r.d > 30 || Math.abs(r.n) > 40 || x.d === 1 || y.d === 1 || z.d === 1) continue;
    return {
      text: `Calculer $A = ${expr}$. Donner le résultat sous forme de fraction irréductible (ou d'entier).`,
      format: "short",
      expected: [texte(r)],
      explanation: `${etapes}\nOn simplifie jusqu'à ce que le numérateur et le dénominateur n'aient plus de diviseur commun.`,
    };
  }
}

export function fractionDeFraction(): AutoQuestion {
  // Contextes et fractions se tirent À PART : 6 × 36 combinaisons.
  const ctx = pick([
    { qui: "des adhérents d'un club font du sport collectif", sous: "d'entre eux jouent au football" },
    { qui: "des élèves d'un lycée mangent à la cantine", sous: "d'entre eux sont en seconde" },
    { qui: "des arbres d'une forêt sont des feuillus", sous: "de ces feuillus sont des chênes" },
    { qui: "des visiteurs d'un musée viennent de l'étranger", sous: "d'entre eux viennent d'Europe" },
    { qui: "des coureurs d'une course finissent en moins d'une heure", sous: "d'entre eux sont des femmes" },
    { qui: "des spectateurs ont moins de 30 ans", sous: "d'entre eux sont venus à vélo" },
  ]);
  const FR = [[1, 2], [2, 3], [3, 4], [2, 5], [3, 5], [5, 6]] as const;
  const [an, ad] = pick(FR);
  const [bn, bd] = pick(FR);
  const cas = { a: frac(an, ad), b: frac(bn, bd), ...ctx };
  const r = fois(cas.a, cas.b);
  return {
    text: `$${tex(cas.a)}$ ${cas.qui}, et $${tex(cas.b)}$ ${cas.sous}. Quelle fraction de l'ensemble cela représente-t-il ? (Fraction irréductible.)`,
    format: "short",
    expected: [texte(r)],
    explanation: `Prendre une fraction d'une fraction, c'est les multiplier.\n$${tex(cas.b)} \\times ${tex(cas.a)} = ${tex(r)}$.`,
  };
}

/* ═══════════════ PUISSANCES ET ÉCRITURE SCIENTIFIQUE ═══════════════ */

export function puissances(): AutoQuestion {
  const cas = entre(1, 3);
  if (cas === 1) {
    const b = pick([2, 3, 5, 10] as const).valueOf();
    const m = entre(2, 7), n = entre(2, 6), p = entre(1, 5);
    const r = m + n - p;
    return {
      text: `Écrire $\\dfrac{${b}^{${m}} \\times ${b}^{${n}}}{${b}^{${p}}}$ sous la forme $${b}^k$. Donner $k$.`,
      format: "short",
      expected: accepte(r),
      explanation: `On ajoute les exposants d'un produit, on retranche celui du dénominateur.\n$${m} + ${n} - ${p} = ${r}$, donc $${b}^{${r}}$.`,
    };
  }
  if (cas === 2) {
    const b = pick([2, 3, 10] as const).valueOf();
    const m = entre(2, 5), n = entre(2, 4);
    return {
      text: `Écrire $(${b}^{${m}})^{${n}}$ sous la forme $${b}^k$. Donner $k$.`,
      format: "short",
      expected: accepte(m * n),
      explanation: `Une puissance de puissance : on MULTIPLIE les exposants.\n$${m} \\times ${n} = ${m * n}$ (et non $${m} + ${n}$).`,
    };
  }
  const m = entre(-4, 6), n = entre(-5, 4);
  const r = m + n;
  return {
    text: `Écrire $10^{${m}} \\times 10^{${n}}$ sous la forme $10^k$. Donner $k$.`,
    format: "short",
    expected: accepte(r),
    explanation: `$10^a \\times 10^b = 10^{a+b}$.\n$${m} + (${n}) = ${r}$.`,
  };
}

export function ecritureScientifique(): AutoQuestion {
  if (Math.random() < 0.5) {
    // B = (a·10^p × b·10^q) / (c·10^r), de tête.
    const [a, b, c] = pick([[2, 9, 3], [4, 3, 6], [6, 5, 3], [3, 8, 4], [5, 4, 2], [2, 6, 4], [8, 3, 6]] as const);
    const p = entre(2, 6), q = entre(-4, -1), r = entre(1, 5);
    const valeur = ((a * b) / c) * 10 ** (p + q - r);
    const exposant = p + q - r;
    if (exposant < -3 || exposant > 3) return ecritureScientifique();
    return {
      text: `Donner l'écriture décimale de $B = \\dfrac{${a} \\times 10^{${p}} \\times ${b} \\times 10^{${q}}}{${c} \\times 10^{${r}}}$.`,
      format: "short",
      expected: accepte(valeur),
      explanation: `On sépare les nombres et les puissances de 10.\n$\\dfrac{${a} \\times ${b}}{${c}} = ${fr((a * b) / c)}$ et $10^{${p} + (${q}) - ${r}} = 10^{${exposant}}$, donc $B = ${fr((a * b) / c)} \\times 10^{${exposant}} = ${fr(valeur)}$.`,
    };
  }
  const m = pick([1.2, 2.5, 3.4, 4.5, 6.7, 7.2, 8.1] as const).valueOf();
  const k = pick([-5, -4, -3, 3, 4, 5, 6] as const).valueOf();
  const valeur = m * 10 ** k;
  const ecrit = k > 0 ? valeur.toLocaleString("fr-FR").replace(/\u202f|\u00a0/g, " ") : fr(valeur);
  return {
    text: `On écrit ${ecrit} en notation scientifique : $a \\times 10^n$ avec $1 \\leqslant a < 10$. Donner $n$.`,
    format: "short",
    expected: accepte(k),
    explanation: `${ecrit} $= ${fr(m)} \\times 10^{${k}}$ : ${k > 0 ? `la virgule recule de ${k} rangs, l'exposant est positif` : `la virgule avance de ${-k} rangs, l'exposant est négatif`}.`,
  };
}

/* ═══════════════ RACINES CARRÉES ═══════════════ */

export function racines(): AutoQuestion {
  // Troisième cas, en tirage libre : √(a² × b²) = a × b (le réservoir figé des
  // deux autres ne donnait que 28 questions pour le thème, seuil 30).
  if (Math.random() < 0.34) {
    const a = entre(2, 9), b = entre(2, 9);
    return {
      text: `Calculer $\\sqrt{${a * a} \\times ${b * b}}$ sans calculatrice.`,
      format: "short",
      expected: accepte(a * b),
      explanation: `$\\sqrt{x \\times y} = \\sqrt{x} \\times \\sqrt{y}$ : on n'a pas à calculer le produit.\n$\\sqrt{${a * a}} \\times \\sqrt{${b * b}} = ${a} \\times ${b} = ${a * b}$.`,
    };
  }
  if (Math.random() < 0.5) {
    const [a, b, r] = pick([[2, 8, 4], [3, 12, 6], [5, 20, 10], [2, 18, 6], [3, 27, 9], [2, 32, 8], [6, 24, 12], [5, 45, 15]] as const);
    return {
      text: `Calculer $\\sqrt{${a}} \\times \\sqrt{${b}}$.`,
      format: "short",
      expected: accepte(r),
      explanation: `$\\sqrt{a} \\times \\sqrt{b} = \\sqrt{a \\times b}$.\n$\\sqrt{${a} \\times ${b}} = \\sqrt{${a * b}} = ${r}$.`,
    };
  }
  const k = entre(2, 6), m = pick([2, 3, 5, 7] as const).valueOf();
  return {
    text: `Écrire $\\sqrt{${k * k * m}}$ sous la forme $a\\sqrt{${m}}$ avec $a$ entier. Donner $a$.`,
    format: "short",
    expected: accepte(k),
    explanation: `On cherche un carré parfait dans ${k * k * m} : $${k * k * m} = ${k * k} \\times ${m}$.\n$\\sqrt{${k * k * m}} = \\sqrt{${k * k}} \\times \\sqrt{${m}} = ${k}\\sqrt{${m}}$.`,
  };
}

/* ═══════════════ CONVERSIONS D'UNITÉS ═══════════════ */

export function conversions(): AutoQuestion {
  const cas = pick([
    () => { const v = pick([36, 72, 90, 108, 18, 54] as const).valueOf(); return { t: `Convertir ${v} km/h en m/s.`, r: v / 3.6, e: `1 km/h = 1 000 m en 3 600 s : on divise par 3,6.\n$${v} \\div 3,6 = ${fr(v / 3.6)}$ m/s.` }; },
    () => { const v = pick([5, 10, 15, 20, 25] as const).valueOf(); return { t: `Convertir ${v} m/s en km/h.`, r: v * 3.6, e: `On multiplie par 3,6 (3 600 s dans une heure, 1 000 m dans un km).\n$${v} \\times 3,6 = ${fr(v * 3.6)}$ km/h.` }; },
    () => { const v = pick([250, 500, 750, 1500, 2000] as const).valueOf(); return { t: `Convertir ${v} cm³ en litres.`, r: v / 1000, e: `1 L = 1 dm³ = 1 000 cm³.\n$${v} \\div 1000 = ${fr(v / 1000)}$ L.` }; },
    () => { const v = pick([2, 3, 5, 0.5] as const).valueOf(); return { t: `Convertir ${fr(v)} m² en cm².`, r: v * 10000, e: `1 m² = 100 cm × 100 cm = 10 000 cm².\n$${fr(v)} \\times 10\\,000 = ${fr(v * 10000)}$ cm².` }; },
    () => { const v = pick([1.5, 2.5, 0.75, 3.2] as const).valueOf(); return { t: `Convertir ${fr(v)} h en minutes.`, r: v * 60, e: `$${fr(v)} \\times 60 = ${fr(v * 60)}$ min.` }; },
    () => { const v = pick([2, 3, 4, 7] as const).valueOf(); return { t: `Combien de mL y a-t-il dans ${v} dL ?`, r: v * 100, e: `1 dL = 100 mL.\n$${v} \\times 100 = ${v * 100}$ mL.` }; },
    () => { const v = pick([1.2, 0.8, 2.5] as const).valueOf(); return { t: `Une masse volumique vaut ${fr(v)} g/cm³. Quelle est la masse, en g, de 10 cm³ ?`, r: v * 10, e: `Masse = masse volumique × volume.\n$${fr(v)} \\times 10 = ${fr(v * 10)}$ g.` }; },
  ]);
  const { t, r, e } = cas();
  return { text: t, format: "short", expected: accepte(r), explanation: e };
}

/* ═══════════════ DÉVELOPPER, FACTORISER ═══════════════ */

export function developperFactoriser(): AutoQuestion {
  const cas = entre(1, 4);
  if (cas === 1) {
    const a = entre(1, 4), b = nonNul(-7, 7);
    const milieu = 2 * a * b;
    return {
      text: `On développe $(${coefX(a)} ${sg(b)})^2$ et on obtient $${a * a === 1 ? "" : a * a}x^2 + \\ldots x + ${b * b}$. Quel est le coefficient de $x$ ?`,
      format: "short",
      expected: accepte(milieu),
      explanation: `$(u ${b > 0 ? "+" : "-"} v)^2 = u^2 ${b > 0 ? "+" : "-"} 2uv + v^2$ : le terme du milieu est le DOUBLE PRODUIT.\n$2 \\times ${coefX(a)} \\times (${b}) = ${milieu}x$.`,
    };
  }
  if (cas === 2) {
    const p = nonNul(-6, 6), q = nonNul(-6, 6);
    return {
      text: `On développe $(x ${sg(p)})(x ${sg(q)})$ et on obtient $x^2 + bx + c$. Donner $b$.`,
      format: "short",
      expected: accepte(p + q),
      explanation: `Double distributivité : $x^2 + ${p}x + ${q}x + ${p * q}$.\nLe coefficient de $x$ est $${p} + (${q}) = ${p + q}$, et $c = ${p * q}$.`,
    };
  }
  if (cas === 3) {
    const a = entre(2, 5), b = entre(1, 9);
    return {
      text: `Compléter la factorisation : $${a * a}x^2 - ${b * b} = (${a}x - ${b})(${a}x + \\ldots)$.`,
      format: "short",
      expected: accepte(b),
      explanation: `$${a * a}x^2 - ${b * b} = (${a}x)^2 - ${b}^2$ : c'est $u^2 - v^2 = (u - v)(u + v)$.\nDonc $(${a}x - ${b})(${a}x + ${b})$.`,
    };
  }
  const k = entre(2, 5), a = entre(2, 4), b = nonNul(-7, 7);
  return {
    text: `Compléter la factorisation : $${k * a}x^2 ${sg(k * b)}x = ${k}x(${a}x + \\ldots)$.`,
    format: "short",
    expected: accepte(b),
    explanation: `Le facteur commun est $${k}x$ : $${k * a}x^2 = ${k}x \\times ${a}x$ et $${k * b}x = ${k}x \\times (${b})$.\nDonc $${k}x(${a}x ${sg(b)})$.`,
  };
}

/* ═══════════════ ÉQUATIONS ═══════════════ */

export function equations(): AutoQuestion {
  const cas = entre(1, 3);
  if (cas === 1) {
    const x = entre(-6, 8);
    const a = entre(3, 9), c = entre(1, a - 1);
    const b = nonNul(-9, 9);
    const d = (a - c) * x + b;
    return {
      text: `Résoudre $${a}x ${sg(b)} = ${c === 1 ? "" : c}x ${sg(d)}$. Donner la solution.`,
      format: "short",
      expected: accepte(x),
      explanation: `On regroupe les $x$ d'un côté, les nombres de l'autre.\n$${a - c}x = ${d} - (${b}) = ${d - b}$, donc $x = ${d - b} \\div ${a - c} = ${x}$.`,
    };
  }
  if (cas === 2) {
    const a = entre(1, 3), r1 = nonNul(-5, 5), r2 = nonNul(-6, 6);
    if (r1 === r2) return equations();
    // (a·x − a·r1)(x − r2) = 0
    return {
      text: `Résoudre $(${coefX(a)} ${sg(-a * r1)})(x ${sg(-r2)}) = 0$. Donner les deux solutions, séparées par « ; ».`,
      format: "short",
      expected: [`${r1};${r2}`],
      compare: "ensemble",
      explanation: `Un produit est nul si et seulement si l'un de ses facteurs est nul.\n$${coefX(a)} ${sg(-a * r1)} = 0$ donne $x = ${r1}$ ; $x ${sg(-r2)} = 0$ donne $x = ${r2}$.`,
    };
  }
  const k = entre(1, 9);
  const nb = pick(["carre", "carre", "negatif"] as const);
  if (nb === "negatif") {
    return {
      text: `Combien de solutions réelles a l'équation $x^2 = -${k * k}$ ?`,
      format: "short",
      expected: ["0", "aucune", "Aucune", "zéro"],
      explanation: `Un carré n'est jamais négatif : $x^2 = -${k * k}$ n'a aucune solution réelle.`,
    };
  }
  return {
    text: `Résoudre $x^2 = ${k * k}$. Donner les solutions, séparées par « ; ».`,
    format: "short",
    expected: [`${k};${-k}`],
    compare: "ensemble",
    explanation: `$x^2 = ${k * k}$ a DEUX solutions : $${k}$ et $-${k}$, car $(-${k})^2 = ${k * k}$ aussi.`,
  };
}

/* ═══════════════ INÉQUATIONS ET SIGNES ═══════════════ */

export function inequations(): AutoQuestion {
  if (Math.random() < 0.6) {
    const a = nonNul(-5, 5), s = entre(-6, 6);
    const b = -a * s;
    const sensInitial = pick(["\\geqslant", "\\leqslant"] as const);
    // a·x + b ≥ 0 ⇔ x ≥ s si a > 0, x ≤ s si a < 0.
    const grand = sensInitial === "\\geqslant";
    const xGrand = a > 0 ? grand : !grand;
    const op = xGrand ? "≥" : "≤";
    return {
      text: `Résoudre $${coefX(a)} ${sg(b)} ${sensInitial} 0$. Écrire la réponse sous la forme « x ≥ … » ou « x ≤ … ».`,
      format: "short",
      expected: [`x${op}${s}`],
      compare: "inegalite",
      explanation: `$${coefX(a)} ${sensInitial} ${-b}$. On divise par ${a}` +
        (a < 0 ? `, un nombre NÉGATIF : le sens de l'inégalité change.` : `, un nombre positif : le sens ne change pas.`) +
        `\n$x ${op === "≥" ? "\\geqslant" : "\\leqslant"} ${s}$.`,
    };
  }
  const r1 = entre(-5, 0), r2 = entre(1, 5);
  const signes = pick([["-", "+", "-"], ["+", "-", "+"]] as const);
  const x = pick([r1 - 2, Math.round((r1 + r2) / 2) === r1 ? r1 + 1 : Math.round((r1 + r2) / 2), r2 + 2]);
  const idx = x < r1 ? 0 : x < r2 ? 1 : 2;
  const rep = signes[idx] === "+" ? "positif" : "négatif";
  const canvas = {
    kind: "tableau_signes",
    bornes: ["-∞", String(r1), String(r2), "+∞"],
    lignes: [{ label: "f(x)", signes: [...signes], marques: ["0", "0"] }],
    size: { width: 360, height: 110 },
  } as unknown as CanvasFigure;
  return {
    text: `Voici le tableau de signes d'une fonction $f$. Le nombre $f(${x})$ est-il positif ou négatif ?`,
    format: "short",
    expected: rep === "positif" ? ["positif", "positive"] : ["négatif", "negatif", "négative", "negative"],
    explanation: `${x} est ${idx === 0 ? `avant ${r1}` : idx === 1 ? `entre ${r1} et ${r2}` : `après ${r2}`} : sur cet intervalle, le tableau indique « ${signes[idx]} ».\n$f(${x})$ est ${rep}.`,
    canvas,
  };
}

/* ═══════════════ FONCTIONS : GÉNÉRALITÉS ═══════════════ */

export function fonctions(): AutoQuestion {
  const cas = entre(1, 3);
  if (cas === 1) {
    const a = nonNul(-3, 3), b = entre(-5, 5), c = entre(-6, 6), x = nonNul(-3, 3);
    const r = a * x * x + b * x + c;
    const expr = `${coefX(a)}^2`.replace("x^2", "x^2") + (b ? ` ${sg(b).replace(/(\d+)$/, "$1x")}` : "") + (c ? ` ${sg(c)}` : "");
    return {
      text: `On considère $f(x) = ${expr}$. Calculer $f(${x})$.`,
      format: "short",
      expected: accepte(r),
      explanation: `On remplace $x$ par $(${x})$, sans oublier les parenthèses.\n$f(${x}) = ${a} \\times (${x})^2 ${b ? `${sg(b)} \\times (${x})` : ""} ${c ? sg(c) : ""} = ${a * x * x}${b ? ` ${sg(b * x)}` : ""}${c ? ` ${sg(c)}` : ""} = ${r}$.`,
    };
  }
  if (cas === 2) {
    const g = entre(-5, -2), m = entre(0, 2), d = entre(3, 6);
    const vMin = entre(-4, 0), vMax = entre(2, 6), vFin = entre(vMin + 1, vMax - 1);
    const canvas = {
      kind: "tableau_variations",
      bornes: [String(g), String(m), String(d)],
      variations: { label: "g(x)", valeurs: [String(vMin), String(vMax), String(vFin)] },
      size: { width: 360, height: 160 },
    } as unknown as CanvasFigure;
    const q = pick(["max", "min", "ou"] as const);
    if (q === "ou") {
      return {
        text: `D'après ce tableau de variations, pour quelle valeur de $x$ la fonction $g$ atteint-elle son maximum sur $[${g} ; ${d}]$ ?`,
        format: "short",
        expected: accepte(m),
        explanation: `Le maximum se lit sur la ligne du haut : ${vMax}, atteint pour $x = ${m}$.\n⚠️ Le maximum est une valeur de $g(x)$ ; « où » il est atteint est une valeur de $x$.`,
        canvas,
      };
    }
    return {
      text: `D'après ce tableau de variations, quel est le ${q === "max" ? "maximum" : "minimum"} de $g$ sur $[${g} ; ${d}]$ ?`,
      format: "short",
      expected: accepte(q === "max" ? vMax : Math.min(vMin, vFin)),
      explanation: q === "max"
        ? `Le maximum est la plus grande valeur de la ligne $g(x)$ : ${vMax}, atteint en $x = ${m}$.`
        : `Le minimum est la plus petite valeur de la ligne $g(x)$ : on compare ${vMin} et ${vFin}. C'est ${Math.min(vMin, vFin)}.`,
      canvas,
    };
  }
  // Une parabole à sommet entier : on lit une image.
  const h = entre(-1, 2), k = entre(-2, 1), a = pick([1, -1] as const).valueOf();
  const x = h + pick([-1, 1, 2, -2] as const);
  const y = a * (x - h) ** 2 + k;
  if (y < -4 || y > 5) return fonctions();
  const canvas = {
    kind: "fonctionGraphique",
    xmin: -3,
    xmax: 4,
    ymin: -4,
    ymax: 5,
    grille: true,
    courbes: [{ id: "f", type: "quadratique", a, b: -2 * a * h, c: a * h * h + k, couleur: "#0d9488" }],
  } as unknown as CanvasFigure;
  return {
    text: `Voici la courbe d'une fonction $f$. Lire graphiquement $f(${x})$.`,
    format: "short",
    expected: accepte(y),
    explanation: `On part de ${x} sur l'axe des abscisses, on va jusqu'à la courbe, on lit l'ordonnée.\n$f(${x}) = ${y}$.`,
    canvas,
  };
}

/* ═══════════════ FONCTIONS AFFINES, DROITES ═══════════════ */

export function affines(): AutoQuestion {
  const cas = entre(1, 3);
  if (cas === 1) {
    const m = pick([-3, -2, -1, 2, 3, 0.5, -0.5] as const).valueOf();
    const xA = entre(-3, 2), dx = pick([2, 4] as const).valueOf();
    const yA = entre(-4, 5);
    const xB = xA + dx, yB = yA + m * dx;
    return {
      text: `Dans un repère, $A(${xA} ; ${yA})$ et $B(${xB} ; ${fr(yB)})$. Quel est le coefficient directeur de la droite $(AB)$ ?`,
      format: "short",
      expected: accepte(m),
      explanation: `$m = \\dfrac{y_B - y_A}{x_B - x_A} = \\dfrac{${fr(yB)} - (${yA})}{${xB} - (${xA})} = \\dfrac{${fr(yB - yA)}}{${dx}} = ${fr(m)}$.`,
    };
  }
  if (cas === 2) {
    const m = pick([-2, -1, -0.5, 0.5, 1, 2] as const).valueOf();
    const p = entre(-2, 2);
    const q = pick(["m", "p"] as const);
    const canvas = {
      kind: "fonctionGraphique",
      xmin: -3,
      xmax: 4,
      ymin: -3,
      ymax: 3,
      grille: true,
      courbes: [{ id: "d", type: "affine", a: m, b: p, couleur: "#2563eb" }],
    } as unknown as CanvasFigure;
    return {
      text: q === "m"
        ? "Voici une droite d'équation $y = mx + p$. Lire son coefficient directeur $m$."
        : "Voici une droite d'équation $y = mx + p$. Lire son ordonnée à l'origine $p$.",
      format: "short",
      expected: accepte(q === "m" ? m : p),
      explanation: q === "m"
        ? `Quand $x$ augmente de 1, $y$ ${m > 0 ? "augmente" : "diminue"} de ${fr(Math.abs(m))}${Math.abs(m) === 0.5 ? " (de 1 quand x augmente de 2)" : ""}.\n$m = ${fr(m)}$.`
        : `L'ordonnée à l'origine se lit là où la droite coupe l'axe des ordonnées ($x = 0$).\n$p = ${p}$.`,
      canvas,
    };
  }
  const m = nonNul(-4, 4), p = nonNul(-6, 6);
  // Intersection avec l'axe des abscisses : x = −p/m, on choisit p multiple de m.
  const x0 = entre(-4, 4);
  const pp = -m * x0;
  if (pp === 0) return affines();
  return {
    text: `La droite d'équation $y = ${coefX(m)} ${sg(pp)}$ coupe l'axe des abscisses en un point. Quelle est son abscisse ?`,
    format: "short",
    expected: accepte(x0),
    explanation: `Sur l'axe des abscisses, $y = 0$ : on résout $${coefX(m)} ${sg(pp)} = 0$.\n$x = ${-pp} \\div ${m} = ${x0}$.` + (p ? "" : ""),
  };
}

export function droites(): AutoQuestion {
  if (Math.random() < 0.5) {
    const m = nonNul(-4, 4), p = entre(-5, 5), x = entre(-3, 3);
    const vrai = Math.random() < 0.5;
    const y = m * x + p + (vrai ? 0 : pick([-1, 1, 2] as const));
    return {
      text: `Le point $M(${x} ; ${y})$ appartient-il à la droite d'équation $y = ${coefX(m)} ${sg(p)}$ ? Répondre par oui ou par non.`,
      format: "short",
      expected: vrai ? ["oui", "Oui"] : ["non", "Non"],
      explanation: `On remplace $x$ par ${x} : $${m} \\times (${x}) ${sg(p)} = ${m * x + p}$.\n${vrai ? `On trouve bien ${y} : oui, M est sur la droite.` : `On trouve ${m * x + p}, pas ${y} : non.`}`,
    };
  }
  const m = nonNul(-5, 5), p = entre(-5, 5), q = entre(-5, 5);
  return {
    text: `La droite $d$ est parallèle à la droite d'équation $y = ${coefX(m)} ${sg(p)}$ et passe par le point $(0 ; ${q})$. Son équation est $y = mx + q$ : donner $m$.`,
    format: "short",
    expected: accepte(m),
    explanation: `Deux droites parallèles ont le MÊME coefficient directeur.\n$m = ${m}$, et l'équation de $d$ est $y = ${coefX(m)} ${sg(q)}$.`,
  };
}

/* ═══════════════ POURCENTAGES ET PROPORTIONS ═══════════════ */

export function proportions(): AutoQuestion {
  const cas = entre(1, 3);
  // ⭐ Tirages LIBRES dans les trois cas (24/09) : les listes figées ne
  // donnaient que 19 questions au thème, sous le seuil de 30.
  if (cas === 1) {
    const p1 = pick([10, 20, 25, 40, 50, 60, 75, 80] as const).valueOf();
    const p2 = pick([10, 20, 25, 30, 40, 50] as const).valueOf();
    const totaux = [20, 40, 60, 80, 100, 120, 200, 300, 400, 500, 600, 800, 1000].filter((t) => (t * p1 * p2) % 10000 === 0);
    if (!totaux.length) return proportions();
    const total = pick(totaux);
    const r = (total * p1 * p2) / 10000;
    return {
      text: `Dans un groupe de ${total} personnes, ${p1} % sont des femmes. Parmi elles, ${p2} % font de la randonnée. Combien de femmes font de la randonnée ?`,
      format: "short",
      expected: accepte(r),
      explanation: `${p1} % de ${total} : ${(total * p1) / 100} femmes. Puis ${p2} % de ${(total * p1) / 100} : ${r}.\n(Ou d'un coup : $${fr(p1 / 100)} \\times ${fr(p2 / 100)} = ${fr((p1 * p2) / 10000)}$, soit ${fr((p1 * p2) / 100)} % du groupe.)`,
    };
  }
  if (cas === 2) {
    const p1 = pick([10, 20, 25, 40, 50, 60, 80] as const).valueOf();
    const p2 = pick([10, 20, 25, 40, 50, 75] as const).valueOf();
    const r = (p1 * p2) / 100;
    return {
      text: `${p1} % des élèves d'un lycée sont externes, et ${p2} % des externes viennent à vélo. Quel pourcentage des élèves du lycée cela représente-t-il ?`,
      format: "short",
      expected: [...accepte(r), `${fr(r)} %`, `${fr(r)}%`],
      explanation: `Une proportion d'une proportion : on multiplie.\n$${fr(p1 / 100)} \\times ${fr(p2 / 100)} = ${fr(r / 100)}$, soit ${fr(r)} %.`,
    };
  }
  const n = pick([20, 25, 40, 50, 60, 80, 120, 200] as const).valueOf();
  const pct = pick([5, 10, 15, 20, 25, 30, 40, 45, 60, 75] as const).valueOf();
  const k = (n * pct) / 100;
  if (!Number.isInteger(k) || k === 0) return proportions();
  const r = pct;
  return {
    text: `Sur ${n} salariés d'une entreprise, ${k} travaillent à temps partiel. Quelle proportion, en %, cela représente-t-il ?`,
    format: "short",
    expected: [...accepte(r), `${fr(r)} %`, `${fr(r)}%`],
    explanation: `Proportion = partie ÷ tout.\n$\\dfrac{${k}}{${n}} = ${fr(k / n)}$, soit ${fr(r)} %.`,
  };
}

/* ═══════════════ TAUX D'ÉVOLUTION ═══════════════ */

export function evolutions(): AutoQuestion {
  const cas = entre(1, 4);
  if (cas === 1) {
    const t = pick([8, 3, 15, 25, 40, 2, 12] as const).valueOf();
    const hausse = Math.random() < 0.5;
    const cm = hausse ? 1 + t / 100 : 1 - t / 100;
    return {
      text: `${hausse ? "Augmenter" : "Diminuer"} une quantité de ${t} % revient à la multiplier par quel nombre ?`,
      format: "short",
      expected: accepte(cm),
      explanation: `Coefficient multiplicateur = $1 ${hausse ? "+" : "-"} \\dfrac{${t}}{100}$.\n$1 ${hausse ? "+" : "-"} ${fr(t / 100)} = ${fr(cm)}$.`,
    };
  }
  if (cas === 2) {
    const t = pick([10, 20, 30, 50] as const).valueOf();
    const premierBaisse = Math.random() < 0.5;
    const cm = (1 - t / 100) * (1 + t / 100);
    const global = Math.round((cm - 1) * 10000) / 100;
    return {
      text: `Un prix ${premierBaisse ? "baisse" : "augmente"} de ${t} %, puis ${premierBaisse ? "augmente" : "baisse"} de ${t} %. Quel est le taux d'évolution global, en % ? (Négatif si c'est une baisse.)`,
      format: "short",
      expected: [...accepte(global), `${fr(global)} %`, `${fr(global)}%`],
      explanation: `On multiplie les coefficients : $${fr(1 - t / 100)} \\times ${fr(1 + t / 100)} = ${fr(cm)}$.\n$${fr(cm)} - 1 = ${fr(cm - 1)}$ : une baisse de ${fr(-global)} %. Le prix NE revient PAS à sa valeur de départ.`,
    };
  }
  if (cas === 3) {
    const [t, r] = pick([[100, -50], [25, -20], [-50, 100], [-20, 25], [300, -75], [-75, 300]] as const);
    return {
      text: `Un prix ${t > 0 ? `augmente de ${t}` : `baisse de ${-t}`} %. Quel taux d'évolution, en %, permet de revenir au prix initial ? (Négatif si c'est une baisse.)`,
      format: "short",
      expected: [...accepte(r), `${r} %`, `${r}%`],
      explanation: `Le coefficient réciproque est l'INVERSE : $\\dfrac{1}{${fr(1 + t / 100)}} = ${fr(1 + r / 100)}$.\nSoit ${r > 0 ? `une hausse de ${r}` : `une baisse de ${-r}`} % — et non ${t > 0 ? `une baisse de ${t}` : `une hausse de ${-t}`} %.`,
    };
  }
  const [a, b] = pick([[80, 100], [50, 60], [200, 150], [40, 50], [120, 90], [25, 30], [60, 45]] as const);
  const t = ((b - a) / a) * 100;
  return {
    text: `Une valeur passe de ${a} à ${b}. Quel est le taux d'évolution, en % ? (Négatif si c'est une baisse.)`,
    format: "short",
    expected: [...accepte(t), `${fr(t)} %`, `${fr(t)}%`],
    explanation: `Taux = $\\dfrac{\\text{arrivée} - \\text{départ}}{\\text{départ}}$.\n$\\dfrac{${b} - ${a}}{${a}} = ${fr((b - a) / a)}$, soit ${fr(t)} %.`,
  };
}

/* ═══════════════ PROBABILITÉS ═══════════════ */

export function probabilites(): AutoQuestion {
  const cas = entre(1, 3);
  if (cas === 1) {
    const pA = pick([0.4, 0.3, 0.6, 0.2, 0.5] as const).valueOf();
    const pB = pick([0.2, 0.5, 0.3, 0.1, 0.4] as const).valueOf();
    const pB2 = pick([0.7, 0.6, 0.9] as const).valueOf();
    const r = Math.round(pA * pB * 1000) / 1000;
    const canvas = {
      kind: "arbre_proba",
      racineEnfants: [
        { label: "A", proba: fr(pA), enfants: [{ label: "B", proba: fr(pB) }, { label: "B̄", proba: fr(1 - pB) }] },
        { label: "Ā", proba: fr(1 - pA), enfants: [{ label: "B", proba: fr(pB2) }, { label: "B̄", proba: fr(1 - pB2) }] },
      ],
    } as unknown as CanvasFigure;
    return {
      text: "D'après cet arbre pondéré, calculer $P(A \\cap B)$.",
      format: "short",
      expected: accepte(r),
      explanation: `On suit le chemin A puis B et on MULTIPLIE les probabilités rencontrées.\n$P(A \\cap B) = ${fr(pA)} \\times ${fr(pB)} = ${fr(r)}$.`,
      canvas,
    };
  }
  if (cas === 2) {
    const fs = entre(10, 30), fm = entre(10, 30), gs = entre(10, 40), gm = entre(5, 25);
    const canvas = {
      kind: "tableau_donnees",
      // ⚠️ Pas de case vide en tête : le canvas ajoute LUI-MÊME la colonne des
      // `label` (titrée « Données »). Un "" ici décalait toutes les colonnes.
      headers: ["Sport", "Musique", "Total"],
      rows: [
        { label: "Filles", values: [fs, fm, fs + fm] },
        { label: "Garçons", values: [gs, gm, gs + gm] },
        { label: "Total", values: [fs + gs, fm + gm, fs + fm + gs + gm] },
      ],
    } as unknown as CanvasFigure;
    const g = pgcd(fs, fs + fm);
    return {
      text: "On choisit au hasard un élève de ce tableau. Sachant que c'est une fille, quelle est la probabilité qu'elle fasse du sport ? (Écrire une fraction.)",
      format: "short",
      expected: Array.from(new Set([`${fs}/${fs + fm}`, `${fs / g}/${(fs + fm) / g}`])),
      explanation: `« Sachant que c'est une fille » : on ne regarde QUE la ligne des filles, ${fs + fm} élèves.\n$P = \\dfrac{${fs}}{${fs + fm}}$ — et non $\\dfrac{${fs}}{${fs + fm + gs + gm}}$, qui serait la probabilité d'« une fille qui fait du sport ».`,
      canvas,
    };
  }
  const ev = pick([
    { e: "un nombre strictement supérieur à 4", n: 2 },
    { e: "un nombre pair", n: 3 },
    { e: "un multiple de 3", n: 2 },
    { e: "un nombre inférieur ou égal à 2", n: 2 },
    { e: "un nombre premier", n: 3 },
    { e: "un diviseur de 6", n: 4 },
  ]);
  const g = pgcd(ev.n, 6);
  return {
    text: `On lance un dé équilibré à six faces. Quelle est la probabilité d'obtenir ${ev.e} ? (Fraction irréductible.)`,
    format: "short",
    expected: [`${ev.n / g}/${6 / g}`],
    explanation: `${ev.n} issues favorables sur 6, équiprobables : $\\dfrac{${ev.n}}{6} = \\dfrac{${ev.n / g}}{${6 / g}}$.`,
  };
}

/* ═══════════════ STATISTIQUES ═══════════════ */

export function statistiques(): AutoQuestion {
  const cas = entre(1, 3);
  if (cas === 1) {
    const n1 = entre(8, 14), c1 = pick([2, 3] as const).valueOf(), m = n1 + pick([1, 2] as const);
    const x = m * (c1 + 1) - n1 * c1;
    if (x > 20 || x < 0) return statistiques();
    return {
      text: `Une élève a eu ${n1} avec un coefficient ${c1}, puis une note $x$ avec un coefficient 1. Sa moyenne est ${m}. Que vaut $x$ ?`,
      format: "short",
      expected: accepte(x),
      explanation: `Moyenne pondérée : $\\dfrac{${c1} \\times ${n1} + x}{${c1 + 1}} = ${m}$.\nDonc $${n1 * c1} + x = ${m * (c1 + 1)}$ et $x = ${x}$.`,
    };
  }
  if (cas === 2) {
    const min = entre(0, 3), q1 = min + entre(1, 3), med = q1 + entre(1, 2), q3 = med + entre(1, 3), max = q3 + entre(1, 2);
    const canvas = {
      kind: "diagramme_boite",
      series: [{ min, q1, mediane: med, q3, max }],
      min: 0,
      max: 12,
      step: 1,
      display: { showAxis: true, showValues: false },
    } as unknown as CanvasFigure;
    const q = pick(["eiq", "med", "etendue"] as const);
    const rep = q === "eiq" ? q3 - q1 : q === "med" ? med : max - min;
    return {
      text: `Voici le diagramme en boîte d'une série. ${q === "eiq" ? "Quel est son écart interquartile ?" : q === "med" ? "Quelle est sa médiane ?" : "Quelle est son étendue ?"}`,
      format: "short",
      expected: accepte(rep),
      explanation:
        q === "eiq"
          ? `Écart interquartile = $Q_3 - Q_1$ : la LARGEUR de la boîte.\n$${q3} - ${q1} = ${rep}$.`
          : q === "med"
            ? `La médiane est le trait À L'INTÉRIEUR de la boîte : ${med}.`
            : `Étendue = maximum − minimum : le bout des moustaches.\n$${max} - ${min} = ${rep}$.`,
      canvas,
    };
  }
  // ⛔ Des notes RANGÉES et distinctes : « 10, 11, 12, 15, 14 » sortait à
  // l'aperçu du 24/09, un axe dans le désordre.
  const debut = entre(6, 11), pas = pick([1, 2] as const).valueOf();
  const notes = [0, 1, 2, 3, 4].map((i) => debut + i * pas);
  const effectifs = notes.map(() => entre(1, 6));
  const canvas = {
    kind: "stat_graph",
    graphType: "batons",
    title: "Effectifs par note",
    data: notes.map((v, i) => ({ label: String(v), value: effectifs[i] })),
    display: { showValues: true, showLabels: true },
  } as unknown as CanvasFigure;
  const total = effectifs.reduce((a, b) => a + b, 0);
  if (Math.random() < 0.5) {
    const et = Math.max(...notes) - Math.min(...notes);
    return {
      text: "Ce diagramme donne la répartition des notes d'un contrôle. Quelle est l'étendue de la série des notes ?",
      format: "short",
      expected: accepte(et),
      explanation: `L'étendue porte sur les NOTES (l'axe horizontal), pas sur les effectifs.\n$${Math.max(...notes)} - ${Math.min(...notes)} = ${et}$.`,
      canvas,
    };
  }
  return {
    text: "Ce diagramme donne la répartition des notes d'un contrôle. Combien d'élèves ont passé ce contrôle ?",
    format: "short",
    expected: accepte(total),
    explanation: `On additionne les effectifs (les hauteurs des bâtons).\n$${effectifs.join(" + ")} = ${total}$.`,
    canvas,
  };
}

/* ═══════════════ LE NIVEAU ═══════════════ */

export const automatismesPremiere: AutoNiveau = {
  classe: "premiere",
  label: "Première",
  duree: 30,
  examen: "Première partie de l'épreuve anticipée : réponses courtes, sans calculatrice, sans QCM",
  nbQuestions: 12,
  themes: [
    { id: "fractions", label: "Fractions", generateurs: [fractionsCalcul, fractionDeFraction] },
    { id: "puissances", label: "Puissances", generateurs: [puissances] },
    { id: "scientifique", label: "Écriture scientifique", generateurs: [ecritureScientifique] },
    { id: "racines", label: "Racines carrées", generateurs: [racines] },
    { id: "unites", label: "Conversions d'unités", generateurs: [conversions] },
    { id: "devfac", label: "Développer, factoriser", generateurs: [developperFactoriser] },
    { id: "equations", label: "Équations", generateurs: [equations] },
    { id: "inequations", label: "Inéquations et signes", generateurs: [inequations] },
    { id: "fonctions", label: "Fonctions : généralités", generateurs: [fonctions] },
    { id: "affines", label: "Fonctions affines", generateurs: [affines] },
    { id: "droites", label: "Droites du plan", generateurs: [droites] },
    { id: "proportions", label: "Pourcentages et proportions", generateurs: [proportions] },
    { id: "evolutions", label: "Taux d'évolution", generateurs: [evolutions] },
    { id: "probas", label: "Probabilités", generateurs: [probabilites] },
    { id: "stats", label: "Statistiques", generateurs: [statistiques] },
  ],
};
