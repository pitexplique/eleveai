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

/**
 * ⭐ `permis` : les CAS qu'un niveau autorise. L'annexe du BO (12 juin 2025)
 * met en italique ce qui relève de la seconde : la Seconde appelle donc
 * `equations([1, 3, 4])`, sans le produit nul (cas 2), réservé à la première.
 */
function tirerCas(permis: readonly number[] | undefined, tous: number): number {
  return permis?.length ? pick(permis) : entre(1, tous);
}

export function equations(permis?: readonly number[]): AutoQuestion {
  const cas = tirerCas(permis, 4);
  if (cas === 4) {
    // « a/x = b » — cité en toutes lettres par l'annexe.
    const x = pick([-5, -4, -2, 2, 3, 4, 5, 6, 8, 10] as const).valueOf();
    const b = pick([-3, -2, 2, 3, 4, 5] as const).valueOf();
    const a = x * b;
    return {
      text: `Résoudre $\\dfrac{${a}}{x} = ${b}$ (avec $x \\neq 0$). Donner $x$.`,
      format: "short",
      expected: accepte(x),
      explanation: `$\\dfrac{${a}}{x} = ${b}$ équivaut à $${a} = ${b}x$, donc $x = \\dfrac{${a}}{${b}} = ${x}$.`,
    };
  }
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
    if (r1 === r2) return equations(permis);
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

export function inequations(permis?: readonly number[]): AutoQuestion {
  const cas = tirerCas(permis, 3);
  if (cas === 3) {
    // « Déterminer le signe d'une expression du premier degré, d'une expression
    // factorisée du second degré » (annexe, rubrique non italique : première).
    const r1 = entre(-5, 2), r2 = entre(r1 + 2, 6);
    const x = pick([r1 - 1, r1 + 1, r2 + 1, r2 - 1, 0].filter((v) => v !== r1 && v !== r2));
    const val = (x - r1) * (x - r2);
    const rep = val > 0 ? "positif" : "négatif";
    return {
      text: `L'expression $(x ${sg(-r1)})(x ${sg(-r2)})$ est-elle positive ou négative pour $x = ${x}$ ? (Répondre « positif » ou « négatif ».)`,
      format: "short",
      expected: rep === "positif" ? ["positif", "positive"] : ["négatif", "negatif", "négative", "negative"],
      explanation: `C'est l'expression $(x ${sg(-r1)})(x ${sg(-r2)})$ pour $x = ${x}$. Ses racines sont ${r1} et ${r2} : elle est NÉGATIVE entre les racines, positive à l'extérieur.\n${x} est ${val < 0 ? "entre" : "à l'extérieur"} : ${rep} (le produit vaut ${val}).`,
    };
  }
  if (cas === 1) {
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

export function fonctions(permis?: readonly number[]): AutoQuestion {
  const cas = tirerCas(permis, 4);
  if (cas === 4) {
    // « Résoudre graphiquement une équation f(x) = k » / « déterminer
    // graphiquement des antécédents » (annexe). Une parabole à sommet entier,
    // et k choisi pour que les solutions tombent sur des entiers.
    const h = entre(-1, 2), s = pick([1, -1] as const).valueOf(), k0 = s > 0 ? entre(-3, -1) : entre(2, 4);
    const d = pick([1, 2] as const).valueOf();
    const m = k0 + s * d * d;
    if (m < -4 || m > 5) return fonctions(permis);
    const canvas = {
      kind: "fonctionGraphique",
      xmin: -3,
      xmax: 5,
      ymin: -4,
      ymax: 5,
      grille: true,
      courbes: [{ id: "f", type: "quadratique", a: s, b: -2 * s * h, c: s * h * h + k0, couleur: "#0d9488" }],
    } as unknown as CanvasFigure;
    return {
      text: `Voici la courbe d'une fonction $f$. Résoudre graphiquement $f(x) = ${m}$. Donner les solutions, séparées par « ; ».`,
      format: "short",
      expected: [`${h - d};${h + d}`],
      compare: "ensemble",
      explanation: `On trace la droite horizontale $y = ${m}$ et on lit les ABSCISSES des points où elle coupe la courbe.\nSolutions : ${h - d} et ${h + d} — ce sont les antécédents de ${m}.`,
      canvas,
    };
  }
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
  if (y < -4 || y > 5) return fonctions(permis);
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
  // ⛔ Était « droite parallèle, même coefficient directeur » : hors de
  // l'annexe (24/09). Remplacé par ce qu'elle cite : « exploiter une équation
  // de courbe (appartenance d'un point, CALCUL DE COORDONNÉES) ».
  const m = nonNul(-5, 5), p = entre(-6, 6), x = entre(-4, 4);
  return {
    text: `Le point $A$ d'abscisse ${x} est sur la droite d'équation $y = ${coefX(m)} ${sg(p)}$. Quelle est son ordonnée ?`,
    format: "short",
    expected: accepte(m * x + p),
    explanation: `Un point est sur la droite si ses coordonnées vérifient l'équation : on remplace $x$ par ${x}.\n$y = ${m} \\times (${x}) ${sg(p)} = ${m * x + p}$.`,
  };
}

/* ═══════════════ POURCENTAGES ET PROPORTIONS ═══════════════ */

export function proportions(permis?: readonly number[]): AutoQuestion {
  const cas = tirerCas(permis, 4);
  if (cas === 4) {
    // « Utiliser une proportion pour calculer […] le tout connaissant une
    // partie » (annexe, en italique : dès la seconde).
    const pct = pick([10, 20, 25, 40, 50, 75] as const).valueOf();
    const tout = pick([40, 60, 80, 120, 200, 240, 400] as const).valueOf();
    const partie = (tout * pct) / 100;
    if (!Number.isInteger(partie)) return proportions(permis);
    const ctx = pick([
      `Les ${partie} élèves de seconde représentent ${pct} % des élèves d'un lycée.`,
      `Les ${partie} chênes représentent ${pct} % des arbres d'un parc.`,
      `Les ${partie} abonnés venus en train représentent ${pct} % des spectateurs.`,
    ]);
    return {
      text: `${ctx} Quel est l'effectif total ?`,
      format: "short",
      expected: accepte(tout),
      explanation: `${pct} % du total font ${partie} : total $\\times ${fr(pct / 100)} = ${partie}$.\nTotal $= ${partie} \\div ${fr(pct / 100)} = ${tout}$.`,
    };
  }
  // ⭐ Tirages LIBRES dans les trois cas (24/09) : les listes figées ne
  // donnaient que 19 questions au thème, sous le seuil de 30.
  if (cas === 1) {
    const p1 = pick([10, 20, 25, 40, 50, 60, 75, 80] as const).valueOf();
    const p2 = pick([10, 20, 25, 30, 40, 50] as const).valueOf();
    const totaux = [20, 40, 60, 80, 100, 120, 200, 300, 400, 500, 600, 800, 1000].filter((t) => (t * p1 * p2) % 10000 === 0);
    if (!totaux.length) return proportions(permis);
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
  if (!Number.isInteger(k) || k === 0) return proportions(permis);
  const r = pct;
  return {
    text: `Sur ${n} salariés d'une entreprise, ${k} travaillent à temps partiel. Quelle proportion, en %, cela représente-t-il ?`,
    format: "short",
    expected: [...accepte(r), `${fr(r)} %`, `${fr(r)}%`],
    explanation: `Proportion = partie ÷ tout.\n$\\dfrac{${k}}{${n}} = ${fr(k / n)}$, soit ${fr(r)} %.`,
  };
}

/* ═══════════════ TAUX D'ÉVOLUTION ═══════════════ */

export function evolutions(permis?: readonly number[]): AutoQuestion {
  const cas = tirerCas(permis, 5);
  if (cas === 5) {
    // « Appliquer un taux d'évolution pour calculer une valeur finale ou
    // INITIALE » (annexe) : on remonte en divisant par le coefficient.
    const t = pick([10, 20, 25, 50, -20, -25, -50, -10] as const).valueOf();
    const cm = 1 + t / 100;
    const initial = pick([40, 60, 80, 120, 200, 400] as const).valueOf();
    const final = initial * cm;
    if (!Number.isInteger(final)) return evolutions(permis);
    const cherche = pick(["final", "initial"] as const);
    return {
      text: cherche === "final"
        ? `Un article coûte ${initial} €. Son prix ${t > 0 ? "augmente" : "baisse"} de ${Math.abs(t)} %. Quel est son nouveau prix, en € ?`
        : `Après ${t > 0 ? "une hausse" : "une baisse"} de ${Math.abs(t)} %, un article coûte ${final} €. Quel était son prix initial, en € ?`,
      format: "short",
      expected: accepte(cherche === "final" ? final : initial),
      explanation: cherche === "final"
        ? `On multiplie par le coefficient $${fr(cm)}$.\n$${initial} \\times ${fr(cm)} = ${final}$ €.`
        : `Initial × $${fr(cm)}$ = ${final} : on DIVISE par le coefficient (et non on retire ${Math.abs(t)} % au prix final).\n$${final} \\div ${fr(cm)} = ${initial}$ €.`,
    };
  }
  if (cas === 1) {
    // « Passer d'une formulation additive à une formulation multiplicative » —
    // dans les DEUX sens (seul cas d'évolution en italique : c'est tout ce que
    // la seconde en a ; 14 questions dans un seul sens, sous le seuil de 30).
    const t = pick([2, 3, 5, 8, 12, 15, 20, 25, 30, 40, 50, 60, 75] as const).valueOf();
    const hausse = Math.random() < 0.5;
    const cm = hausse ? 1 + t / 100 : 1 - t / 100;
    if (Math.random() < 0.5) {
      return {
        text: `Multiplier une quantité par ${fr(cm)} revient à ${hausse ? "l'augmenter" : "la diminuer"} de combien de % ?`,
        format: "short",
        expected: [...accepte(t), `${t} %`, `${t}%`],
        explanation: `$${fr(cm)} = 1 ${hausse ? "+" : "-"} ${fr(t / 100)}$ : ${hausse ? "une hausse" : "une baisse"} de ${t} %.`,
      };
    }
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

export function probabilites(permis?: readonly number[]): AutoQuestion {
  const cas = tirerCas(permis, 5);
  if (cas === 4) {
    // « Savoir calculer la probabilité de l'événement contraire » (italique).
    const p = pick([0.15, 0.2, 0.35, 0.4, 0.45, 0.62, 0.7, 0.85, 0.08, 0.3] as const).valueOf();
    const ev = pick(["il pleuve demain", "un composant soit défectueux", "un joueur marque son tir", "un train soit en retard"]);
    return {
      text: `La probabilité qu'${ev} est ${fr(p)}. Quelle est la probabilité de l'événement contraire ?`,
      format: "short",
      expected: accepte(Math.round((1 - p) * 100) / 100),
      explanation: `$P(\\overline{A}) = 1 - P(A)$.\n$1 - ${fr(p)} = ${fr(Math.round((1 - p) * 100) / 100)}$.`,
    };
  }
  if (cas === 5) {
    // « Distinguer P(A ∩ B), P_A(B), P_B(A) » : sur l'arbre, P_A(B) se LIT sur
    // la branche ; P(A ∩ B) se CALCULE en multipliant.
    const pA = pick([0.4, 0.3, 0.6, 0.2, 0.7] as const).valueOf();
    const pB = pick([0.2, 0.5, 0.3, 0.1, 0.8] as const).valueOf();
    const pB2 = pick([0.6, 0.4, 0.9, 0.25] as const).valueOf();
    const canvas = {
      kind: "arbre_proba",
      racineEnfants: [
        { label: "A", proba: fr(pA), enfants: [{ label: "B", proba: fr(pB) }, { label: "B̄", proba: fr(1 - pB) }] },
        { label: "Ā", proba: fr(1 - pA), enfants: [{ label: "B", proba: fr(pB2) }, { label: "B̄", proba: fr(1 - pB2) }] },
      ],
    } as unknown as CanvasFigure;
    const q = pick(["PA", "PAbarre", "inter"] as const);
    const rep = q === "PA" ? pB : q === "PAbarre" ? pB2 : Math.round((1 - pA) * pB2 * 1000) / 1000;
    return {
      text: q === "PA"
        ? "D'après cet arbre, que vaut $P_A(B)$ ?"
        : q === "PAbarre"
          ? "D'après cet arbre, que vaut $P_{\\overline{A}}(B)$ ?"
          : "D'après cet arbre, calculer $P(\\overline{A} \\cap B)$.",
      format: "short",
      expected: accepte(rep),
      explanation: q === "inter"
        ? `$P(\\overline{A} \\cap B)$ : le CHEMIN $\\overline{A}$ puis $B$, on multiplie.\n$${fr(1 - pA)} \\times ${fr(pB2)} = ${fr(rep)}$.`
        : `Une probabilité conditionnelle se LIT sur la branche de second niveau : pas de calcul.\n${q === "PA" ? "$P_A(B)$" : "$P_{\\overline{A}}(B)$"} $= ${fr(rep)}$ — à ne pas confondre avec l'intersection, qui se calcule.`,
      canvas,
    };
  }
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

export function statistiques(permis?: readonly number[]): AutoQuestion {
  const cas = tirerCas(permis, 6);
  if (cas === 4) {
    // « Diagramme circulaire, semi-circulaire » (annexe, italique).
    const parts = pick([[50, 25, 25], [25, 25, 50], [50, 30, 20], [40, 35, 25], [60, 25, 15], [20, 30, 50]] as const);
    const noms = pick([["Bus", "Vélo", "À pied"], ["Sport", "Musique", "Lecture"], ["Solaire", "Éolien", "Hydraulique"]]);
    const i = entre(0, 2);
    const canvas = {
      kind: "stat_graph",
      graphType: "camembert",
      title: "Répartition (en %)",
      data: noms.map((n, k) => ({ label: n, value: parts[k] })),
      display: { showValues: false, showLabels: true },
    } as unknown as CanvasFigure;
    const degres = Math.random() < 0.5;
    return {
      text: degres
        ? `Dans ce diagramme circulaire, « ${noms[i]} » représente ${parts[i]} %. Quelle est la mesure de l'angle de son secteur, en degrés ?`
        : `Ce diagramme circulaire porte sur 200 personnes. « ${noms[i]} » en représente ${parts[i]} %. Combien de personnes cela fait-il ?`,
      format: "short",
      expected: accepte(degres ? (parts[i] * 360) / 100 : parts[i] * 2),
      explanation: degres
        ? `Le disque entier, c'est 360° pour 100 %.\n$${parts[i]} \\% \\times 360 = ${(parts[i] * 360) / 100}$°.`
        : `$${parts[i]} \\%$ de 200 : $200 \\times ${fr(parts[i] / 100)} = ${parts[i] * 2}$.`,
      canvas,
    };
  }
  if (cas === 5) {
    // « Comparer des distributions à l'aide de boîtes à moustaches » (italique).
    const serie = () => {
      const min = entre(0, 3), q1 = min + entre(1, 3), med = q1 + entre(1, 2), q3 = med + entre(1, 3), max = q3 + entre(1, 2);
      return { min, q1, mediane: med, q3, max };
    };
    const A = serie(), B = serie();
    const q = pick(["mediane", "eiq"] as const);
    const vA = q === "mediane" ? A.mediane : A.q3 - A.q1, vB = q === "mediane" ? B.mediane : B.q3 - B.q1;
    if (vA === vB) return statistiques(permis);
    const canvas = {
      kind: "diagramme_boite",
      series: [{ ...A, label: "A", couleur: "#2563eb" }, { ...B, label: "B", couleur: "#c2410c" }],
      min: 0,
      max: 12,
      step: 1,
      display: { showAxis: true, showValues: false },
    } as unknown as CanvasFigure;
    const rep = vA > vB ? "A" : "B";
    return {
      text: q === "mediane"
        ? "Quelle série, A ou B, a la plus grande médiane ? (Répondre A ou B.)"
        : "Quelle série, A ou B, est la plus dispersée autour de sa médiane, c'est-à-dire a le plus grand écart interquartile ? (Répondre A ou B.)",
      format: "short",
      expected: [rep, rep.toLowerCase()],
      explanation: q === "mediane"
        ? `La médiane est le trait dans la boîte : ${A.mediane} pour A, ${B.mediane} pour B.\nC'est ${rep}.`
        : `L'écart interquartile est la LARGEUR de la boîte : ${A.q3 - A.q1} pour A, ${B.q3 - B.q1} pour B.\nC'est ${rep}.`,
      canvas,
    };
  }
  if (cas === 6) {
    // « Calculer des indicateurs (moyenne, médiane, QUARTILES) » (italique).
    const n = pick([8, 12] as const).valueOf();
    const vals = Array.from({ length: n }, () => entre(2, 20)).sort((a, b) => a - b);
    const q = pick(["Q1", "Q3"] as const);
    const rang = q === "Q1" ? Math.ceil(n / 4) : Math.ceil((3 * n) / 4);
    return {
      text: `Voici une série RANGÉE de ${n} valeurs : ${vals.join(" ; ")}. Quel est son ${q === "Q1" ? "premier quartile $Q_1$" : "troisième quartile $Q_3$"} ?`,
      format: "short",
      expected: accepte(vals[rang - 1]),
      explanation: `${q} est la plus petite valeur telle qu'au moins ${q === "Q1" ? "25" : "75"} % des valeurs lui soient inférieures ou égales : rang $${q === "Q1" ? `${n} \\times 0,25` : `${n} \\times 0,75`} = ${q === "Q1" ? n / 4 : (3 * n) / 4}$, arrondi au-dessus : ${rang}.\n${q} = ${vals[rang - 1]}.`,
    };
  }
  if (cas === 1) {
    const n1 = entre(8, 14), c1 = pick([2, 3] as const).valueOf(), m = n1 + pick([1, 2] as const);
    const x = m * (c1 + 1) - n1 * c1;
    if (x > 20 || x < 0) return statistiques(permis);
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

/* ═══════════════ CE QUE L'ANNEXE DEMANDE ET QUI MANQUAIT (24/09) ═══════════════ */
//
// Annexe du BO n° 24 du 12 juin 2025, « Calcul numérique et algébrique » —
// toutes ces lignes sont en ITALIQUE, donc dès la seconde.

/** « Comparer deux nombres directement ou par calcul de leur différence ou,
 *  s'ils sont strictement positifs, de leur quotient. » */
export function comparer(): AutoQuestion {
  const cas = pick([
    () => { const [a, b, c, d] = pick([[3, 4, 5, 7], [2, 3, 5, 8], [4, 5, 7, 9], [5, 6, 7, 8], [3, 5, 4, 7], [7, 9, 3, 4]] as const); const x = a / b, y = c / d; return { t: `Quel est le plus grand des deux nombres $\\dfrac{${a}}{${b}}$ et $\\dfrac{${c}}{${d}}$ ? (Écrire la fraction.)`, r: [x > y ? `${a}/${b}` : `${c}/${d}`], e: `On calcule la différence : $\\dfrac{${a}}{${b}} - \\dfrac{${c}}{${d}} = \\dfrac{${a * d - b * c}}{${b * d}}$, ${a * d - b * c > 0 ? "positive" : "négative"}.\nLe plus grand est $\\dfrac{${x > y ? a : c}}{${x > y ? b : d}}$.` }; },
    () => { const a = pick([0.7, 0.35, 0.62, 0.8, 0.45] as const).valueOf(); const [n, d] = pick([[2, 3], [3, 4], [5, 8], [3, 5], [4, 7]] as const); const g = a > n / d; return { t: `Quel est le plus grand des deux nombres ${fr(a)} et $\\dfrac{${n}}{${d}}$ ? (Écrire le nombre tel qu'il est donné.)`, r: g ? accepte(a) : [`${n}/${d}`], e: `$\\dfrac{${n}}{${d}} \\approx ${fr(Math.round((n / d) * 1000) / 1000)}$, à comparer à ${fr(a)}.\nLe plus grand est ${g ? fr(a) : `$\\dfrac{${n}}{${d}}$`}.` }; },
    () => { const x = pick([3, 5, 7, 12] as const).valueOf(), k = pick([2, 3, 4] as const).valueOf(); const A = x * k, B = x; return { t: `$A = ${A} \\times 10^{-3}$ et $B = ${B} \\times 10^{-3}$. Calculer le quotient $\\dfrac{A}{B}$.`, r: accepte(k), e: `$\\dfrac{A}{B} = \\dfrac{${A}}{${B}} = ${k}$ : A est ${k} fois plus grand que B. Le quotient compare deux nombres POSITIFS.` }; },
  ]);
  const { t, r, e } = cas();
  return { text: t, format: "short", expected: r, explanation: e };
}

/** « Passer d'une écriture d'un nombre à une autre (décimale, fractionnaire,
 *  pourcentage). » */
export function ecrituresNombre(): AutoQuestion {
  const [n, d] = pick([[1, 4], [3, 4], [1, 5], [2, 5], [3, 8], [7, 20], [1, 8], [9, 25], [3, 50], [6, 5], [5, 4], [7, 10]] as const);
  const dec = n / d;
  const sens = entre(1, 3);
  if (sens === 1) {
    return { text: `Écrire $\\dfrac{${n}}{${d}}$ en pourcentage.`, format: "short", expected: [...accepte(dec * 100), `${fr(dec * 100)} %`, `${fr(dec * 100)}%`], explanation: `$\\dfrac{${n}}{${d}} = ${fr(dec)} = \\dfrac{${fr(dec * 100)}}{100}$, soit ${fr(dec * 100)} %.` };
  }
  if (sens === 2) {
    return { text: `Écrire ${fr(dec * 100)} % sous forme décimale.`, format: "short", expected: accepte(dec), explanation: `${fr(dec * 100)} % $= \\dfrac{${fr(dec * 100)}}{100} = ${fr(dec)}$.` };
  }
  return { text: `Écrire ${fr(dec)} sous forme d'une fraction irréductible.`, format: "short", expected: [`${n}/${d}`], explanation: `$${fr(dec)} = \\dfrac{${fr(dec * 1000)}}{1000}$, qu'on simplifie : $\\dfrac{${n}}{${d}}$.` };
}

/** « Estimer un ordre de grandeur. » On arrondit chaque facteur à UN chiffre
 *  significatif ; la réponse attendue est ce produit arrondi. */
export function ordreGrandeur(): AutoQuestion {
  const a = pick([19.8, 49.7, 301, 0.498, 2.03, 98.6, 5.02, 0.0198] as const).valueOf();
  const b = pick([21, 4.97, 198, 0.51, 39.9, 7.02] as const).valueOf();
  const ar = Number(a.toPrecision(1)), br = Number(b.toPrecision(1));
  const r = Number((ar * br).toPrecision(2));
  return {
    text: `Sans calculatrice, donner un ordre de grandeur de $${fr(a)} \\times ${fr(b)}$ (arrondir chaque nombre à un seul chiffre significatif).`,
    format: "short",
    expected: accepte(r),
    explanation: `$${fr(a)} \\approx ${fr(ar)}$ et $${fr(b)} \\approx ${fr(br)}$.\n$${fr(ar)} \\times ${fr(br)} = ${fr(r)}$ : le résultat exact en est proche. C'est aussi ce qui permet de contrôler la vraisemblance d'un calcul.`,
  };
}

/** « Effectuer un calcul littéral élémentaire » : −(a − b) = b − a,
 *  x/a = (1/a)x, a/b ÷ c/d = ad/bc… On demande toujours un NOMBRE. */
export function calculLitteral(): AutoQuestion {
  const cas = entre(1, 3);
  if (cas === 1) {
    const b = entre(2, 12);
    return {
      text: `On écrit $-(x - ${b})$ sans parenthèses : $-x + \\ldots$ Compléter.`,
      format: "short",
      expected: accepte(b),
      explanation: `Un signe moins devant une parenthèse change le signe de CHAQUE terme : $-(a - b) = -a + b$.\n$-(x - ${b}) = -x + ${b}$.`,
    };
  }
  if (cas === 2) {
    const a = pick([2, 4, 5, 10] as const).valueOf();
    return {
      text: `$\\dfrac{x}{${a}}$ s'écrit aussi $k \\times x$. Donner $k$ sous forme décimale.`,
      format: "short",
      expected: accepte(1 / a),
      explanation: `$\\dfrac{x}{a} = \\dfrac{1}{a}\\,x$ : diviser par ${a}, c'est multiplier par $\\dfrac{1}{${a}} = ${fr(1 / a)}$.`,
    };
  }
  const [a, b] = pick([[2, 3], [3, 4], [1, 2], [4, 5], [5, 6]] as const);
  const [c, d] = pick([[4, 5], [1, 3], [2, 7], [3, 8], [5, 9]] as const);
  const n = a * d, D = b * c, g = pgcd(n, D);
  return {
    text: `Calculer $\\dfrac{\\dfrac{${a}}{${b}}}{\\dfrac{${c}}{${d}}}$. Donner une fraction irréductible.`,
    format: "short",
    expected: [D / g === 1 ? `${n / g}` : `${n / g}/${D / g}`],
    explanation: `Diviser par une fraction, c'est multiplier par son inverse : $\\dfrac{${a}}{${b}} \\times \\dfrac{${d}}{${c}} = \\dfrac{${n}}{${D}}$${g > 1 ? ` $= \\dfrac{${n / g}}{${D / g}}$` : ""}.`,
  };
}

/** « Isoler une variable dans une égalité qui en comporte plusieurs » et
 *  « effectuer une application numérique d'une formule (notamment pour les
 *  formules utilisées dans les autres disciplines) ». C'est la question 12 du
 *  sujet 0 de spécialité (a = v²/R). */
export function formules(): AutoQuestion {
  const cas = pick([
    () => { const R = pick([2, 4, 5, 10] as const).valueOf(), v = pick([2, 4, 6, 10] as const).valueOf(); return { t: `L'accélération centripète vaut $a = \\dfrac{v^2}{R}$. Calculer $a$ (en m/s²) pour $v = ${v}$ m/s et $R = ${R}$ m.`, r: (v * v) / R, e: `Application numérique : $a = \\dfrac{${v}^2}{${R}} = \\dfrac{${v * v}}{${R}} = ${fr((v * v) / R)}$ m/s².` }; },
    () => { const R = pick([2, 5, 10, 20] as const).valueOf(), I = pick([2, 3, 4, 0.5] as const).valueOf(); return { t: `La loi d'Ohm s'écrit $U = R \\times I$. On mesure $U = ${fr(R * I)}$ V et $I = ${fr(I)}$ A. Calculer $R$, en ohms.`, r: R, e: `On isole $R$ : $R = \\dfrac{U}{I}$.\n$R = \\dfrac{${fr(R * I)}}{${fr(I)}} = ${R}$ Ω.` }; },
    () => { const d = pick([120, 180, 240, 300] as const).valueOf(), v = pick([60, 80, 90, 120] as const).valueOf(); const t = d / v; if (!Number.isInteger(t * 4)) return null; return { t: `On a $v = \\dfrac{d}{t}$. Un train parcourt $d = ${d}$ km à $v = ${v}$ km/h. Calculer $t$, en heures.`, r: t, e: `On isole $t$ : $t = \\dfrac{d}{v}$.\n$t = \\dfrac{${d}}{${v}} = ${fr(t)}$ h.` }; },
    () => { const m = pick([2, 5, 10, 0.5] as const).valueOf(), v = pick([2, 4, 6] as const).valueOf(); return { t: `L'énergie cinétique vaut $E = \\dfrac{1}{2} m v^2$. Calculer $E$ (en J) pour $m = ${fr(m)}$ kg et $v = ${v}$ m/s.`, r: 0.5 * m * v * v, e: `$E = 0,5 \\times ${fr(m)} \\times ${v}^2 = 0,5 \\times ${fr(m)} \\times ${v * v} = ${fr(0.5 * m * v * v)}$ J.` }; },
    () => { const rho = pick([2, 4, 8] as const).valueOf(), V = pick([3, 5, 10] as const).valueOf(); return { t: `La masse volumique vaut $\\rho = \\dfrac{m}{V}$. Un objet a $\\rho = ${rho}$ g/cm³ et $V = ${V}$ cm³. Calculer sa masse $m$, en g.`, r: rho * V, e: `On isole $m$ : $m = \\rho \\times V$.\n$m = ${rho} \\times ${V} = ${rho * V}$ g.` }; },
    () => { const P = pick([100, 200, 500, 1000] as const).valueOf(), t = pick([2, 3, 5] as const).valueOf(); return { t: `L'énergie consommée vaut $E = P \\times t$. Un appareil de ${P} W fonctionne ${t} h. Calculer $E$ en Wh.`, r: P * t, e: `$E = ${P} \\times ${t} = ${P * t}$ Wh.` }; },
  ]);
  const c = cas();
  if (!c) return formules();
  return { text: c.t, format: "short", expected: accepte(c.r), explanation: c.e };
}

/* ═══════════════ LE NIVEAU ═══════════════ */

export const automatismesPremiere: AutoNiveau = {
  classe: "premiere",
  label: "Première",
  duree: 30,
  examen: "Première partie de l'épreuve anticipée : réponses courtes, sans calculatrice, sans QCM",
  nbQuestions: 12,
  // ⭐ ALIGNÉ SUR L'ANNEXE DU BO n° 24 DU 12 JUIN 2025 (24/09/2026), dans
  // l'ordre de ses rubriques : Calcul numérique et algébrique, Proportions et
  // pourcentages, Évolutions et variations, Fonctions et représentations,
  // Statistiques, Probabilités. La même liste vaut pour TOUS les élèves de
  // première — avec ou sans spécialité, voie générale ou technologique (le
  // sujet 0 de spécialité ne pose, en première partie, que ces automatismes).
  // ⛔ Retirés parce que l'annexe ne les cite pas : les produits de racines
  // (√2 × √8, √48 = a√3) et les droites parallèles.
  themes: [
    // Calcul numérique et algébrique
    { id: "comparer", label: "Comparer deux nombres", generateurs: [comparer] },
    { id: "fractions", label: "Fractions", generateurs: [fractionsCalcul] },
    { id: "puissances", label: "Puissances", generateurs: [puissances, ecritureScientifique] },
    { id: "ecritures", label: "Écritures d'un nombre", generateurs: [ecrituresNombre] },
    { id: "grandeur", label: "Ordre de grandeur", generateurs: [ordreGrandeur] },
    { id: "unites", label: "Conversions d'unités", generateurs: [conversions] },
    { id: "litteral", label: "Calcul littéral élémentaire", generateurs: [calculLitteral] },
    { id: "devfac", label: "Développer, factoriser", generateurs: [developperFactoriser] },
    { id: "equations", label: "Équations", generateurs: [equations] },
    { id: "inequations", label: "Inéquations et signes", generateurs: [inequations] },
    { id: "formules", label: "Formules : isoler, appliquer", generateurs: [formules] },
    // Proportions et pourcentages ; Évolutions et variations
    { id: "proportions", label: "Proportions et pourcentages", generateurs: [proportions, fractionDeFraction] },
    { id: "evolutions", label: "Évolutions et variations", generateurs: [evolutions] },
    // Fonctions et représentations
    { id: "fonctions", label: "Fonctions : lectures graphiques", generateurs: [fonctions] },
    { id: "droites", label: "Droites et fonctions affines", generateurs: [affines, droites] },
    // Statistiques ; Probabilités
    { id: "stats", label: "Statistiques", generateurs: [statistiques] },
    { id: "probas", label: "Probabilités", generateurs: [probabilites] },
  ],
};
