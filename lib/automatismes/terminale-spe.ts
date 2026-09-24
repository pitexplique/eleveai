// lib/automatismes/terminale-spe.ts
//
// Réflexes de Terminale spécialité — 24/09/2026 (Frédéric : « et si on faisait
// automatisme pour terminale spé pour les profs et élèves »).
//
// ⚠️ IL N'Y A PAS D'ÉPREUVE D'AUTOMATISMES EN TERMINALE, et il faut le dire
// sur la page : l'annexe du BO du 12 juin 2025 ne vaut que pour l'épreuve
// anticipée de première, et le bac de spécialité de terminale est fait
// d'exercices. Ce niveau rassemble donc ce qui DOIT être automatique le jour
// du bac — ce qui coûte des points dans les exercices quand ça ne l'est pas —,
// et sert au professeur de « questions flash » en début d'heure.
//
// Référence : les 18 notions du coach (knowledge/maths/terminale-spe — il couvre
// le BO, Frédéric le 24/09), une par thème. Réponse TAPÉE quand c'est un
// nombre ; QCM SEULEMENT quand la réponse est une expression qu'on ne tape pas
// — primitive, dérivée, intégrale exacte, solution d'équation différentielle,
// vecteur normal (Frédéric, sujets du bac en main : « les QCM ont disparu, mais
// on peut en laisser lorsque l'écriture devient compliquée »). Une limite
// infinie s'écrit « +inf » (ou « +∞ », « +infini ») : l'énoncé le rappelle.

import type { AutoNiveau, AutoQuestion } from "./types";
import { probabilites } from "./premiere";

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

function accepte(n: number): string[] {
  const s = fr(n);
  return Array.from(new Set([s, s.replace(",", ".")]));
}

function sg(b: number): string {
  return b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`;
}

function coefX(a: number, x = "x"): string {
  if (a === 1) return x;
  if (a === -1) return `-${x}`;
  return `${a}${x}`;
}

const PLUS_INF = ["+∞", "+inf", "+infini", "∞", "inf", "infini", "plus l'infini", "+ ∞"];
const MOINS_INF = ["-∞", "-inf", "-infini", "moins l'infini", "- ∞"];

function limite(v: "plus" | "moins" | number): string[] {
  if (v === "plus") return PLUS_INF;
  if (v === "moins") return MOINS_INF;
  return accepte(v);
}

/* ═══════════════ SUITES ═══════════════ */

function suites(): AutoQuestion {
  const cas = entre(1, 3);
  if (cas === 1) {
    const q = pick([2, 3] as const).valueOf(), n = entre(3, 7), u0 = pick([1, 2, 3] as const).valueOf();
    const s = (u0 * (q ** (n + 1) - 1)) / (q - 1);
    return {
      text: `$(u_n)$ est géométrique, $u_0 = ${u0}$, raison $q = ${q}$. Calculer $S = u_0 + u_1 + \\ldots + u_{${n}}$.`,
      format: "short",
      expected: accepte(s),
      explanation: `$S = u_0 \\times \\dfrac{1 - q^{n+1}}{1 - q}$, avec ${n + 1} termes.\n$S = ${u0} \\times \\dfrac{${q}^{${n + 1}} - 1}{${q} - 1} = ${s}$.`,
    };
  }
  if (cas === 2) {
    const q = pick([0.5, 0.2, 0.9, 1.5, 2, 3, -0.5, 0.75] as const).valueOf();
    const rep: "plus" | number = Math.abs(q) < 1 ? 0 : "plus";
    return {
      text: `Quelle est la limite de $(${fr(q)})^n$ quand $n$ tend vers $+\\infty$ ? (Écrire +inf pour +∞.)`,
      format: "short",
      expected: limite(rep),
      explanation: Math.abs(q) < 1
        ? `$-1 < ${fr(q)} < 1$ : $q^n$ tend vers 0.`
        : `$${fr(q)} > 1$ : $q^n$ tend vers $+\\infty$.`,
    };
  }
  const a = pick([2, 3, 0.5] as const).valueOf(), b = entre(-4, 4), u0 = entre(1, 5);
  const u1 = a * u0 + b, u2 = a * u1 + b;
  return {
    text: `$u_0 = ${u0}$ et $u_{n+1} = ${fr(a)}\\,u_n ${sg(b)}$. Calculer $u_2$.`,
    format: "short",
    expected: accepte(u2),
    explanation: `On applique la relation deux fois : $u_1 = ${fr(a)} \\times ${u0} ${sg(b)} = ${fr(u1)}$, puis $u_2 = ${fr(a)} \\times ${fr(u1)} ${sg(b)} = ${fr(u2)}$.`,
  };
}

/* ═══════════════ LIMITES DE FONCTIONS ═══════════════ */

function limites(): AutoQuestion {
  const cas = entre(1, 3);
  if (cas === 1) {
    // Polynôme : le terme de plus haut degré l'emporte.
    const a = nonNul(-4, 4), n = pick([2, 3] as const).valueOf(), b = entre(-9, 9), c = entre(-9, 9);
    const versPlus = Math.random() < 0.5;
    const signe = versPlus ? Math.sign(a) : Math.sign(a) * (n % 2 === 0 ? 1 : -1);
    return {
      text: `Quelle est la limite de $${coefX(a, `x^${n}`)} ${sg(b)}x ${sg(c)}$ quand $x$ tend vers $${versPlus ? "+" : "-"}\\infty$ ? (Écrire +inf ou -inf pour l'infini.)`,
      format: "short",
      expected: limite(signe > 0 ? "plus" : "moins"),
      explanation: `En l'infini, un polynôme se comporte comme son terme de plus haut degré : $${coefX(a, `x^${n}`)}$.\nIci, la limite est $${signe > 0 ? "+" : "-"}\\infty$.`,
    };
  }
  if (cas === 2) {
    // Quotient de polynômes de même degré : le rapport des coefficients dominants.
    const a = nonNul(-6, 6), c = pick([1, 2, 3, 4] as const).valueOf(), b = entre(-5, 5), d = entre(-5, 5);
    return {
      text: `Quelle est la limite de $\\dfrac{${coefX(a)} ${sg(b)}}{${coefX(c)} ${sg(d)}}$ quand $x$ tend vers $+\\infty$ ?`,
      format: "short",
      expected: [...accepte(a / c), `${a}/${c}`],
      explanation: `Même degré en haut et en bas : la limite est le quotient des coefficients dominants.\n$\\dfrac{${a}}{${c}} = ${fr(a / c)}$.`,
    };
  }
  const q = pick([
    { t: "\\dfrac{e^x}{x}", v: "plus" as const, e: "Croissances comparées : l'exponentielle l'emporte sur toute puissance de $x$." },
    { t: "x\\,e^{-x}", v: 0, e: "Croissances comparées : $e^{-x}$ tend vers 0 plus vite que $x$ ne grandit." },
    { t: "\\dfrac{\\ln x}{x}", v: 0, e: "Croissances comparées : $x$ l'emporte sur $\\ln x$." },
    { t: "\\dfrac{x^2}{e^x}", v: 0, e: "Croissances comparées : $e^x$ l'emporte sur $x^2$." },
    { t: "e^{-x} + 3", v: 3, e: "$e^{-x}$ tend vers 0 : il reste 3." },
    { t: "\\ln x - x", v: "moins" as const, e: "$x$ l'emporte sur $\\ln x$ : la différence tend vers $-\\infty$." },
    { t: "\\dfrac{1}{x} + 2", v: 2, e: "$\\dfrac{1}{x}$ tend vers 0 : il reste 2." },
    { t: "e^{x} - x", v: "plus" as const, e: "L'exponentielle l'emporte sur $x$." },
  ]);
  return {
    text: `Quelle est la limite de $${q.t}$ quand $x$ tend vers $+\\infty$ ? (Écrire +inf ou -inf pour l'infini.)`,
    format: "short",
    expected: limite(q.v),
    explanation: q.e,
  };
}

/* ═══════════════ CONTINUITÉ, TVI ═══════════════ */

function tvi(): AutoQuestion {
  const a = entre(-3, 1), b = entre(a + 2, 6);
  const fa = entre(-8, 8), fb = entre(-8, 8);
  if (fa === fb) return tvi();
  const k = entre(Math.min(fa, fb) - 3, Math.max(fa, fb) + 3);
  if (k === fa || k === fb) return tvi();
  const dedans = k > Math.min(fa, fb) && k < Math.max(fa, fb);
  return {
    text: `$f$ est continue et strictement ${fa < fb ? "croissante" : "décroissante"} sur $[${a} ; ${b}]$, avec $f(${a}) = ${fa}$ et $f(${b}) = ${fb}$. Combien de solutions l'équation $f(x) = ${k}$ a-t-elle sur cet intervalle ?`,
    format: "short",
    expected: dedans ? ["1", "une", "une seule"] : ["0", "aucune", "zéro"],
    explanation: dedans
      ? `${k} est compris entre ${fa} et ${fb}, et $f$ est continue et strictement monotone : par le théorème des valeurs intermédiaires (corollaire), il y a exactement UNE solution.`
      : `${k} n'est pas compris entre ${fa} et ${fb} : $f$, strictement monotone, n'atteint jamais ${k}. Aucune solution.`,
  };
}

/* ═══════════════ DÉRIVÉES DE FONCTIONS COMPOSÉES ═══════════════ */

function derivees(): AutoQuestion {
  const cas = entre(1, 3);
  if (cas === 1) {
    const a = nonNul(-4, 4), b = entre(-3, 3);
    return {
      text: `$f(x) = e^{${coefX(a)} ${sg(b)}}$. Écrire $f'(x) = k\\,e^{${coefX(a)} ${sg(b)}}$ : donner $k$.`,
      format: "short",
      expected: accepte(a),
      explanation: `$(e^{u})' = u'\\,e^{u}$, avec $u = ${coefX(a)} ${sg(b)}$ et $u' = ${a}$.\n$k = ${a}$.`,
    };
  }
  if (cas === 2) {
    const a = nonNul(-3, 3), b = entre(-3, 3), n = pick([2, 3] as const).valueOf(), x = entre(-2, 2);
    const d = n * a * (a * x + b) ** (n - 1);
    return {
      text: `$g(x) = (${coefX(a)} ${sg(b)})^${n}$. Calculer $g'(${x})$.`,
      format: "short",
      expected: accepte(d),
      explanation: `$(u^n)' = n\\,u'\\,u^{n-1}$ : $g'(x) = ${n} \\times ${a} \\times (${coefX(a)} ${sg(b)})^{${n - 1}}$.\n$g'(${x}) = ${n * a} \\times (${a * x + b})^{${n - 1}} = ${d}$.`,
    };
  }
  const a = pick([1, 2, 3, 4] as const).valueOf(), b = pick([1, 2, 4] as const).valueOf(), x = entre(0, 3);
  const d = a / (a * x + b);
  return {
    text: `$h(x) = \\ln(${coefX(a)} + ${b})$. Calculer $h'(${x})$ (valeur exacte : fraction ou décimal).`,
    format: "short",
    expected: [...accepte(Math.round(d * 1e6) / 1e6), `${a}/${a * x + b}`],
    explanation: `$(\\ln u)' = \\dfrac{u'}{u}$ : $h'(x) = \\dfrac{${a}}{${coefX(a)} + ${b}}$.\n$h'(${x}) = \\dfrac{${a}}{${a * x + b}}$.`,
  };
}

/* ═══════════════ CONVEXITÉ ═══════════════ */

function convexite(): AutoQuestion {
  const a = pick([2, 3, 6, -2, -3, -6] as const).valueOf(), r = entre(-4, 4);
  const b = -a * r;
  if (Math.random() < 0.5) {
    return {
      text: `On sait que $f''(x) = ${a}x ${sg(b)}$. Quelle est l'abscisse du point d'inflexion de la courbe de $f$ ?`,
      format: "short",
      expected: accepte(r),
      explanation: `Un point d'inflexion est un point où $f''$ s'annule EN CHANGEANT DE SIGNE — ce qu'une expression du premier degré fait toujours.\n$${a}x ${sg(b)} = 0$ donne $x = ${r}$.`,
    };
  }
  const x = r + pick([-2, -1, 1, 2] as const);
  const v = a * x + b;
  return {
    text: `On sait que $f''(x) = ${a}x ${sg(b)}$. La fonction $f$ est-elle convexe ou concave au voisinage de $x = ${x}$ ?`,
    format: "short",
    expected: v > 0 ? ["convexe"] : ["concave"],
    explanation: `$f''(${x}) = ${v}$, ${v > 0 ? "positif : $f$ est convexe" : "négatif : $f$ est concave"} (la courbe est ${v > 0 ? "au-dessus" : "au-dessous"} de ses tangentes).`,
  };
}

/* ═══════════════ EXPONENTIELLE ET LOGARITHME ═══════════════ */

/** Le coach sépare « Fonction exponentielle » et « Fonction logarithme
 *  népérien » : deux thèmes, donc deux familles de cas. */
function expLnCas(famille: "exp" | "ln"): AutoQuestion {
  if (famille === "ln") return expLn();
  const cas = entre(1, 3);
  if (cas === 1) {
    const a = entre(-5, 6), b = entre(-5, 6), c = entre(-4, 4);
    return {
      text: `Écrire $\\dfrac{e^{${a}} \\times e^{${b}}}{e^{${c}}}$ sous la forme $e^k$. Donner $k$.`,
      format: "short",
      expected: accepte(a + b - c),
      explanation: `On ajoute les exposants d'un produit, on retranche celui du dénominateur.\n$${a} + (${b}) - (${c}) = ${a + b - c}$.`,
    };
  }
  if (cas === 2) {
    const a = entre(-4, 6);
    return {
      text: `Simplifier $e^{\\ln(${Math.abs(a) + 2})}$.`,
      format: "short",
      expected: accepte(Math.abs(a) + 2),
      explanation: `$\\exp$ et $\\ln$ sont réciproques : $e^{\\ln a} = a$ pour $a > 0$.\nIci ${Math.abs(a) + 2}.`,
    };
  }
  const a = nonNul(-4, 4), b = entre(-8, 8);
  const x = -b / a;
  if (!Number.isInteger(x)) return expLnCas("exp");
  return {
    text: `Résoudre $e^{${coefX(a)} ${sg(b)}} = 1$. Donner $x$.`,
    format: "short",
    expected: accepte(x),
    explanation: `$e^X = 1 \\iff X = 0$ : on résout $${coefX(a)} ${sg(b)} = 0$.\n$x = ${x}$.`,
  };
}

function expLn(): AutoQuestion {
  // Famille « ln » : les quatre cas historiques de ce générateur, sauf e^X = 1
  // (passé à l'exponentielle).
  const cas = entre(1, 4);
  if (cas === 1) {
    const a = entre(-5, 8);
    return { text: `Simplifier $\\ln(e^{${a}})$.`, format: "short", expected: accepte(a), explanation: `$\\ln$ et $\\exp$ sont réciproques : $\\ln(e^a) = a$.\nIci ${a}.` };
  }
  if (cas === 2) {
    const a = entre(2, 9), b = entre(2, 9);
    return {
      text: `Écrire $\\ln(${a}) + \\ln(${b})$ sous la forme $\\ln(k)$. Donner $k$.`,
      format: "short",
      expected: accepte(a * b),
      explanation: `$\\ln a + \\ln b = \\ln(ab)$ : le logarithme transforme un produit en somme.\n$k = ${a} \\times ${b} = ${a * b}$.`,
    };
  }
  if (cas === 3) {
    const a = pick([2, 3, 5, 10] as const).valueOf(), n = entre(2, 5);
    return {
      text: `Écrire $\\ln(${a ** n})$ sous la forme $k \\ln(${a})$. Donner $k$.`,
      format: "short",
      expected: accepte(n),
      explanation: `$${a ** n} = ${a}^{${n}}$ et $\\ln(a^n) = n \\ln a$.\n$k = ${n}$.`,
    };
  }
  const a = nonNul(-4, 4), b = entre(-8, 8);
  const x = -b / a;
  if (!Number.isInteger(x)) return expLn();
  const f = "ln" as "ln" | "exp"; // la branche « exp » vit dans expLnCas("exp")
  return f === "ln"
    ? {
        text: `Résoudre $\\ln(${coefX(a)} ${sg(b + a)}) = 0$ (sur l'intervalle où l'expression est définie). Donner $x$.`,
        format: "short",
        expected: accepte(x),
        explanation: `$\\ln X = 0 \\iff X = 1$ : on résout $${coefX(a)} ${sg(b + a)} = 1$, soit $${coefX(a)} = ${-b}$.\n$x = ${x}$.`,
      }
    : {
        text: `Résoudre $e^{${coefX(a)} ${sg(b)}} = 1$. Donner $x$.`,
        format: "short",
        expected: accepte(x),
        explanation: `$e^X = 1 \\iff X = 0$ : on résout $${coefX(a)} ${sg(b)} = 0$.\n$x = ${x}$.`,
      };
}

/* ═══════════════ PRIMITIVES ET INTÉGRALES ═══════════════ */

function integrales(): AutoQuestion {
  const cas = entre(1, 3);
  if (cas === 1) {
    const k = nonNul(-5, 6), a = entre(-3, 2), b = entre(a + 1, 6);
    return {
      text: `Calculer $\\displaystyle\\int_{${a}}^{${b}} ${k}\\,dx$.`,
      format: "short",
      expected: accepte(k * (b - a)),
      explanation: `L'intégrale d'une constante $k$ sur $[a ; b]$ vaut $k(b - a)$ — l'aire d'un rectangle quand $k > 0$.\n$${k} \\times (${b} - (${a})) = ${k * (b - a)}$.`,
    };
  }
  if (cas === 2) {
    const a = entre(0, 3), b = entre(a + 1, 5);
    return {
      text: `Calculer $\\displaystyle\\int_{${a}}^{${b}} 2x\\,dx$.`,
      format: "short",
      expected: accepte(b * b - a * a),
      explanation: `Une primitive de $2x$ est $x^2$.\n$${b}^2 - ${a}^2 = ${b * b - a * a}$.`,
    };
  }
  const k = pick([2, 3, 4, 6, 8, 10, 12] as const).valueOf(), n = pick([1, 2, 3] as const).valueOf();
  // Une primitive de k·x^n est k/(n+1)·x^(n+1)
  const c = k / (n + 1);
  if (!Number.isInteger(c)) return integrales();
  return {
    text: `Une primitive de $f(x) = ${k}x${n > 1 ? `^${n}` : ""}$ s'écrit $F(x) = c\\,x^{${n + 1}}$. Donner $c$.`,
    format: "short",
    expected: accepte(c),
    explanation: `Une primitive de $x^n$ est $\\dfrac{x^{n+1}}{n+1}$.\n$c = \\dfrac{${k}}{${n + 1}} = ${c}$ (on vérifie en dérivant : $${n + 1} \\times ${c} = ${k}$).`,
  };
}

/* ═══════════════ DÉNOMBREMENT ═══════════════ */

function denombrement(): AutoQuestion {
  const cas = entre(1, 4);
  if (cas === 4) {
    // Arrangements : k places ordonnées parmi n (le podium) — le thème n'avait
    // que 25 questions, sous le seuil de 30 (24/09).
    const n = entre(5, 12), k = pick([2, 3] as const).valueOf();
    const r = k === 2 ? n * (n - 1) : n * (n - 1) * (n - 2);
    return {
      text: `${n} coureurs prennent le départ. Combien de podiums différents (${k === 2 ? "1er et 2e" : "1er, 2e et 3e"}) sont possibles ?`,
      format: "short",
      expected: accepte(r),
      explanation: `L'ordre compte et on ne répète pas : ${k === 2 ? `$${n} \\times ${n - 1}$` : `$${n} \\times ${n - 1} \\times ${n - 2}$`} $= ${r}$.`,
    };
  }
  if (cas === 1) {
    const n = entre(3, 6);
    const f = Array.from({ length: n }, (_, i) => i + 1).reduce((a, b) => a * b, 1);
    return {
      text: `De combien de façons peut-on ranger ${n} livres différents sur une étagère ?`,
      format: "short",
      expected: accepte(f),
      explanation: `C'est le nombre de permutations de ${n} objets : $${n}! = ${Array.from({ length: n }, (_, i) => n - i).join(" \\times ")} = ${f}$.`,
    };
  }
  if (cas === 2) {
    const n = entre(4, 12);
    return {
      text: `Combien de poignées de main échangent ${n} personnes si chacune serre la main de toutes les autres une seule fois ?`,
      format: "short",
      expected: accepte((n * (n - 1)) / 2),
      explanation: `On choisit 2 personnes parmi ${n}, sans ordre : $\\dbinom{${n}}{2} = \\dfrac{${n} \\times ${n - 1}}{2} = ${(n * (n - 1)) / 2}$.`,
    };
  }
  const n = pick([2, 3, 4, 10] as const).valueOf(), k = pick([2, 3, 4] as const).valueOf();
  if (n ** k > 10000) return denombrement();
  return {
    text: `Un code est formé de ${k} symboles, chacun choisi parmi ${n} (les répétitions sont permises). Combien de codes différents existe-t-il ?`,
    format: "short",
    expected: accepte(n ** k),
    explanation: `C'est le nombre de ${k}-uplets d'un ensemble à ${n} éléments : $${n}^{${k}} = ${n ** k}$.`,
  };
}

/* ═══════════════ LOI BINOMIALE ═══════════════ */

function binomiale(): AutoQuestion {
  const n = pick([10, 20, 25, 40, 50, 100] as const).valueOf(), p = pick([0.1, 0.2, 0.25, 0.3, 0.4, 0.5] as const).valueOf();
  const cas = entre(1, 3);
  if (cas === 1) {
    return { text: `$X$ suit la loi binomiale $\\mathcal{B}(${n} ; ${fr(p)})$. Calculer son espérance $E(X)$.`, format: "short", expected: accepte(n * p), explanation: `$E(X) = np = ${n} \\times ${fr(p)} = ${fr(n * p)}$.` };
  }
  if (cas === 2) {
    return { text: `$X$ suit la loi binomiale $\\mathcal{B}(${n} ; ${fr(p)})$. Calculer sa variance $V(X)$.`, format: "short", expected: accepte(Math.round(n * p * (1 - p) * 1e6) / 1e6), explanation: `$V(X) = np(1 - p) = ${n} \\times ${fr(p)} \\times ${fr(1 - p)} = ${fr(n * p * (1 - p))}$.` };
  }
  const m = pick([2, 3, 4] as const).valueOf(), q = pick([0.5, 0.2, 0.1] as const).valueOf();
  const v = Math.round(q ** m * 1e6) / 1e6;
  return {
    text: `$X$ suit la loi binomiale $\\mathcal{B}(${m} ; ${fr(q)})$. Calculer $P(X = ${m})$.`,
    format: "short",
    expected: accepte(v),
    explanation: `$P(X = n) = p^n$ : tous les essais sont des succès.\n$${fr(q)}^{${m}} = ${fr(v)}$.`,
  };
}

/* ═══════════════ GÉOMÉTRIE ET PRODUIT SCALAIRE DANS L'ESPACE ═══════════════ */

function espace(): AutoQuestion {
  const cas = entre(1, 3);
  if (cas === 1) {
    const u = [entre(-4, 4), entre(-4, 4), entre(-4, 4)], v = [entre(-4, 4), entre(-4, 4), entre(-4, 4)];
    const p = u[0] * v[0] + u[1] * v[1] + u[2] * v[2];
    return {
      text: `Dans un repère orthonormé de l'espace, $\\vec{u}(${u.join(" ; ")})$ et $\\vec{v}(${v.join(" ; ")})$. Calculer $\\vec{u} \\cdot \\vec{v}$.`,
      format: "short",
      expected: accepte(p),
      explanation: `$\\vec{u} \\cdot \\vec{v} = xx' + yy' + zz'$.\n$${u.map((c, i) => `${c < 0 ? `(${c})` : c} \\times ${v[i] < 0 ? `(${v[i]})` : v[i]}`).join(" + ")} = ${p}$.`,
    };
  }
  if (cas === 2) {
    const [a, b, c, n] = pick([[1, 2, 2, 3], [2, 3, 6, 7], [2, 6, 9, 11], [1, 4, 8, 9], [4, 4, 7, 9], [2, 1, 2, 3], [3, 4, 12, 13]] as const);
    const s = [pick([1, -1] as const), pick([1, -1] as const), pick([1, -1] as const)];
    return {
      text: `Dans un repère orthonormé, calculer la norme du vecteur $\\vec{w}(${a * s[0]} ; ${b * s[1]} ; ${c * s[2]})$.`,
      format: "short",
      expected: accepte(n),
      explanation: `$\\|\\vec{w}\\| = \\sqrt{x^2 + y^2 + z^2} = \\sqrt{${a * a} + ${b * b} + ${c * c}} = \\sqrt{${n * n}} = ${n}$.`,
    };
  }
  const u = [nonNul(-3, 3), nonNul(-3, 3), nonNul(-3, 3)];
  const vx = entre(-3, 3), vy = entre(-3, 3);
  const reste = -(u[0] * vx + u[1] * vy);
  if (reste % u[2] !== 0) return espace();
  const z = reste / u[2];
  return {
    text: `$\\vec{u}(${u.join(" ; ")})$ et $\\vec{v}(${vx} ; ${vy} ; z)$ sont orthogonaux. Que vaut $z$ ?`,
    format: "short",
    expected: accepte(z),
    explanation: `Orthogonaux ⇔ produit scalaire nul : $${u[0] * vx} + ${u[1] * vy < 0 ? `(${u[1] * vy})` : u[1] * vy} + ${coefX(u[2], "z")} = 0$.\n$z = ${z}$.`,
  };
}

/* ═══════════════ ÉQUATIONS DIFFÉRENTIELLES ═══════════════ */

function equaDiff(): AutoQuestion {
  if (Math.random() < 0.5) {
    const a = nonNul(-4, 4), y0 = nonNul(-6, 8);
    return {
      text: `$y' = ${a}y$ et $y(0) = ${y0}$. La solution s'écrit $y(x) = C\\,e^{${coefX(a)}}$ : donner $C$.`,
      format: "short",
      expected: accepte(y0),
      explanation: `Les solutions de $y' = ay$ sont $x \\mapsto C e^{ax}$. En $x = 0$ : $y(0) = C \\times e^0 = C$.\n$C = ${y0}$.`,
    };
  }
  const a = pick([2, 3, 4, 5, -2, -3] as const).valueOf(), s = entre(-5, 5);
  const b = -a * s;
  return {
    text: `Quelle est la solution constante de l'équation $y' = ${coefX(a, "y")} ${sg(b)}$ ?`,
    format: "short",
    expected: accepte(s),
    explanation: `Une fonction constante a une dérivée nulle : $0 = ${coefX(a, "y")} ${sg(b)}$.\n$y = \\dfrac{${-b}}{${a}} = ${s}$.`,
  };
}

/* ═══════════════ LES SIX NOTIONS QUI MANQUAIENT (Frédéric : « tu dois
   proposer toutes les notions ») ═══════════════ */

function limitesSuites(): AutoQuestion {
  const cas = entre(1, 2);
  if (cas === 1) {
    const a = nonNul(-5, 5), b = entre(-6, 6), c = pick([1, 2, 3, 4] as const).valueOf(), d = entre(1, 6);
    return {
      text: `Quelle est la limite de $u_n = \\dfrac{${coefX(a, "n")} ${sg(b)}}{${coefX(c, "n")} + ${d}}$ quand $n$ tend vers $+\\infty$ ?`,
      format: "short",
      expected: [...accepte(a / c), `${a}/${c}`],
      explanation: `On factorise par $n$ en haut et en bas : les termes dominants l'emportent.\n$\\dfrac{${a}}{${c}} = ${fr(a / c)}$.`,
    };
  }
  const q = pick([
    { t: "\\dfrac{1}{n^2}", v: 0 as const, e: "$n^2$ tend vers $+\\infty$, donc son inverse tend vers 0." },
    { t: "n^2 - 3n", v: "plus" as const, e: "Le terme dominant $n^2$ l'emporte : $+\\infty$." },
    { t: "3 - \\dfrac{2}{n}", v: 3, e: "$\\dfrac{2}{n}$ tend vers 0 : il reste 3." },
    { t: "\\sqrt{n}", v: "plus" as const, e: "$\\sqrt{n}$ grandit sans limite : $+\\infty$." },
    { t: "-2n + 5", v: "moins" as const, e: "Le coefficient de $n$ est négatif : $-\\infty$." },
    { t: "\\dfrac{(-1)^n}{n}", v: 0, e: "$|u_n| \\leqslant \\dfrac{1}{n}$, qui tend vers 0 : par encadrement (gendarmes), $u_n$ tend vers 0." },
    { t: "e^{-n}", v: 0, e: "$e^{-n} = \\dfrac{1}{e^n}$ tend vers 0." },
    { t: "\\ln(n)", v: "plus" as const, e: "$\\ln$ tend vers $+\\infty$ en $+\\infty$, lentement mais sûrement." },
  ]);
  return { text: `Quelle est la limite de $${q.t}$ quand $n$ tend vers $+\\infty$ ? (Écrire +inf ou -inf pour l'infini.)`, format: "short", expected: limite(q.v), explanation: q.e };
}

/** « (x − 2) », et « x » tout seul quand la racine est 0 — pas « (x + 0) ». */
function facteur(r: number): string {
  return r === 0 ? "x" : `(x ${sg(-r)})`;
}

function derivationVariations(): AutoQuestion {
  const a = pick([1, -1] as const).valueOf(), r1 = entre(-4, 1), r2 = entre(r1 + 1, 5);
  // f'(x) = 3a(x − r1)(x − r2) : f a un extremum en r1 et r2.
  const q = pick(["max", "min", "croissante"] as const);
  const max = a > 0 ? r1 : r2, min = a > 0 ? r2 : r1;
  if (q === "croissante") {
    const x = pick([r1 - 1, Math.floor((r1 + r2) / 2) === r1 ? r2 : Math.floor((r1 + r2) / 2), r2 + 1].filter((v) => v !== r1 && v !== r2));
    const signe = a * (x - r1) * (x - r2) > 0;
    return {
      text: `On sait que $f'(x) = ${a > 0 ? "" : "-"}3${facteur(r1)}${facteur(r2)}$. Au voisinage de $x = ${x}$, $f$ est-elle croissante ou décroissante ?`,
      format: "short",
      expected: signe ? ["croissante"] : ["décroissante", "decroissante"],
      explanation: `On lit le SIGNE de $f'$ : il est ${signe ? "positif" : "négatif"} en ${x} (${a > 0 ? "positif à l'extérieur des racines, négatif entre" : "négatif à l'extérieur des racines, positif entre"}).\nDonc $f$ est ${signe ? "croissante" : "décroissante"}.`,
    };
  }
  return {
    text: `On sait que $f'(x) = ${a > 0 ? "" : "-"}3${facteur(r1)}${facteur(r2)}$. En quelle valeur de $x$ la fonction $f$ admet-elle un ${q === "max" ? "maximum" : "minimum"} local ?`,
    format: "short",
    expected: accepte(q === "max" ? max : min),
    explanation: `Un extremum local est là où $f'$ s'annule EN CHANGEANT DE SIGNE. $f'$ passe de + à − en ${max} (maximum), de − à + en ${min} (minimum).`,
  };
}

function variablesAleatoires(): AutoQuestion {
  const cas = entre(1, 2);
  if (cas === 1) {
    const ex = entre(-3, 8), a = nonNul(-4, 5), b = entre(-6, 6);
    return {
      text: `$E(X) = ${ex}$. Calculer $E(${coefX(a, "X")} ${sg(b)})$.`,
      format: "short",
      expected: accepte(a * ex + b),
      explanation: `Linéarité de l'espérance : $E(aX + b) = a\\,E(X) + b$.\n$${a} \\times ${ex} ${sg(b)} = ${a * ex + b}$.`,
    };
  }
  const vx = pick([1, 2, 3, 4, 5] as const).valueOf(), a = nonNul(-3, 3), b = entre(-5, 5);
  return {
    text: `$V(X) = ${vx}$. Calculer $V(${coefX(a, "X")} ${sg(b)})$.`,
    format: "short",
    expected: accepte(a * a * vx),
    explanation: `$V(aX + b) = a^2\\,V(X)$ : le décalage $b$ ne change pas la dispersion, et le facteur passe au CARRÉ.\n$${a * a} \\times ${vx} = ${a * a * vx}$.`,
  };
}

function python(): AutoQuestion {
  if (Math.random() < 0.5) {
    const u0 = entre(1, 5), a = pick([2, 3] as const).valueOf(), n = entre(2, 4);
    let u = u0;
    for (let i = 0; i < n; i++) u = a * u + 1;
    return {
      text: `Quel nombre ce programme affiche-t-il ?\n\n\`\`\`python\nu = ${u0}\nfor i in range(${n}):\n    u = ${a} * u + 1\nprint(u)\n\`\`\``,
      format: "short",
      expected: accepte(u),
      explanation: `\`range(${n})\` fait ${n} tours : on calcule $u_{${n}}$ de la suite $u_{n+1} = ${a}u_n + 1$, $u_0 = ${u0}$.\nRésultat : ${u}.`,
    };
  }
  const s = pick([50, 100, 200, 500] as const).valueOf(), q = pick([2, 3] as const).valueOf(), u0 = pick([1, 2, 3] as const).valueOf();
  let u = u0, n = 0;
  while (u <= s) { u *= q; n++; }
  return {
    text: `Quel nombre ce programme affiche-t-il ?\n\n\`\`\`python\nu = ${u0}\nn = 0\nwhile u <= ${s}:\n    u = ${q} * u\n    n = n + 1\nprint(n)\n\`\`\``,
    format: "short",
    expected: accepte(n),
    explanation: `C'est un algorithme de SEUIL : il compte les tours jusqu'à ce que $u$ dépasse ${s}.\n$${u0} \\times ${q}^{${n}} = ${u} > ${s}$ alors que le terme précédent ne dépassait pas : n = ${n}.`,
  };
}

function concentration(): AutoQuestion {
  if (Math.random() < 0.5) {
    const v = pick([1, 2, 4, 5, 9] as const).valueOf(), d = pick([1, 2, 3, 5, 10] as const).valueOf();
    const borne = Math.round((v / (d * d)) * 1e6) / 1e6;
    if (borne >= 1) return concentration();
    return {
      text: `$V(X) = ${v}$. D'après l'inégalité de Bienaymé-Tchebychev, $P(|X - E(X)| \\geqslant ${d}) \\leqslant$ … Donner cette borne.`,
      format: "short",
      expected: accepte(borne),
      explanation: `$P(|X - E(X)| \\geqslant \\delta) \\leqslant \\dfrac{V(X)}{\\delta^2}$.\n$\\dfrac{${v}}{${d}^2} = ${fr(borne)}$.`,
    };
  }
  const vx = pick([2, 4, 5, 10] as const).valueOf(), n = pick([10, 20, 50, 100] as const).valueOf();
  return {
    text: `$X_1, \\ldots, X_{${n}}$ sont indépendantes, de même loi que $X$, avec $V(X) = ${vx}$. Quelle est la variance de la moyenne $M_{${n}} = \\dfrac{X_1 + \\ldots + X_{${n}}}{${n}}$ ?`,
    format: "short",
    expected: accepte(vx / n),
    explanation: `$V(M_n) = \\dfrac{V(X)}{n}$ : la moyenne est de moins en moins dispersée quand $n$ grandit (loi des grands nombres).\n$\\dfrac{${vx}}{${n}} = ${fr(vx / n)}$.`,
  };
}

function geometrieEspace(): AutoQuestion {
  // Représentation paramétrique d'une droite : un point, un vecteur directeur.
  const A = [entre(-3, 3), entre(-3, 3), entre(-3, 3)], u = [nonNul(-3, 3), entre(-3, 3), entre(-3, 3)];
  const t = nonNul(-3, 3);
  const P = A.map((c, i) => c + t * u[i]);
  if (Math.random() < 0.5) {
    return {
      text: `La droite $d$ a pour représentation paramétrique $x = ${A[0]} ${sg(u[0])}t$, $y = ${A[1]} ${sg(u[1])}t$, $z = ${A[2]} ${sg(u[2])}t$. Pour quelle valeur de $t$ obtient-on le point d'abscisse $x = ${P[0]}$ ?`,
      format: "short",
      expected: accepte(t),
      explanation: `On résout $${A[0]} ${sg(u[0])}t = ${P[0]}$ : $t = \\dfrac{${P[0] - A[0]}}{${u[0]}} = ${t}$.`,
    };
  }
  return {
    text: `La droite $d$ passe par $A(${A.join(" ; ")})$ et a pour vecteur directeur $\\vec{u}(${u.join(" ; ")})$. Donner la cote $z$ du point de $d$ obtenu pour $t = ${t}$.`,
    format: "short",
    expected: accepte(P[2]),
    explanation: `$M = A + t\\,\\vec{u}$ : $z = ${A[2]} + (${t}) \\times (${u[2]}) = ${P[2]}$.`,
  };
}

/* ═══════════════ LES QCM, LÀ OÙ L'ÉCRITURE EST IMPOSSIBLE AU CLAVIER ═══════════════ */
//
// ⭐ Frédéric, 24/09 (en relisant les sujets du bac) : « les QCM ont disparu,
// mais on peut en laisser lorsque l'écriture devient compliquée — un élève ne
// peut pas taper le signe intégrale ». La règle n'est donc PAS un ratio : une
// question dont la réponse est un NOMBRE se tape ; une question dont la
// réponse est une EXPRESSION (primitive, dérivée, solution d'équation
// différentielle, intégrale exacte, vecteur) se choisit.

function qcmExpression(text: string, bonne: string, fausses: string[], explanation: string): AutoQuestion {
  // Jamais deux fois la même proposition (un piège peut coïncider avec un autre).
  const distincts = Array.from(new Set(fausses)).filter((f) => f !== bonne);
  const choix = [bonne, ...distincts.slice(0, 3)].sort(() => Math.random() - 0.5);
  return { text, format: "qcm", choices: choix, expected: [bonne], explanation };
}

function primitiveQcm(): AutoQuestion {
  const k = pick([2, 3, 4, 5, -2, -3] as const).valueOf();
  const cas = pick(["exp", "puissance", "inverse"] as const);
  if (cas === "exp") {
    return qcmExpression(
      `Une primitive de $f(x) = e^{${k}x}$ sur $\\mathbb{R}$ est :`,
      // « −1/3 » et non « 1/(−3) » (aperçu du 24/09).
      `$${k < 0 ? "-" : ""}\\dfrac{1}{${Math.abs(k)}}e^{${k}x}$`,
      [`$${k}e^{${k}x}$`, `$e^{${k}x}$`, `$\\dfrac{e^{${k}x + 1}}{${k}x + 1}$`],
      `Une primitive de $e^{ax}$ est $\\dfrac{1}{a}e^{ax}$ : on vérifie en dérivant, $\\left(${k < 0 ? "-" : ""}\\dfrac{1}{${Math.abs(k)}}e^{${k}x}\\right)' = e^{${k}x}$.`,
    );
  }
  if (cas === "puissance") {
    const n = pick([2, 3, 4] as const).valueOf();
    return qcmExpression(
      `Une primitive de $f(x) = x^{${n}}$ est :`,
      `$\\dfrac{x^{${n + 1}}}{${n + 1}}$`,
      [`$${n}x^{${n - 1}}$`, `$x^{${n + 1}}$`, `$\\dfrac{x^{${n - 1}}}{${n - 1}}$`],
      `Une primitive de $x^n$ est $\\dfrac{x^{n+1}}{n+1}$ — on MONTE l'exposant et on divise (l'inverse de la dérivation).`,
    );
  }
  const a = pick([1, 2, 3] as const).valueOf();
  return qcmExpression(
    `Une primitive de $f(x) = \\dfrac{${a}}{x}$ sur $]0 ; +\\infty[$ est :`,
    `$${a === 1 ? "" : a}\\ln x$`,
    [`$-\\dfrac{${a}}{x^2}$`, `$${a === 1 ? "" : a}e^{x}$`, `$\\dfrac{${a}}{2x^2}$`],
    `$(\\ln x)' = \\dfrac{1}{x}$, donc une primitive de $\\dfrac{${a}}{x}$ est $${a === 1 ? "" : a}\\ln x$.`,
  );
}

function deriveeQcm(): AutoQuestion {
  const cas = pick(["ln", "exp", "quotient"] as const);
  // Tirages libres dans chaque cas : la première version n'avait que 8 énoncés.
  if (cas === "ln") {
    const c = entre(1, 9);
    return qcmExpression(
      `La dérivée de $f(x) = \\ln(x^2 + ${c})$ est :`,
      `$\\dfrac{2x}{x^2 + ${c}}$`,
      [`$\\dfrac{1}{x^2 + ${c}}$`, `$2x\\ln(x^2 + ${c})$`, `$\\dfrac{1}{2x}$`],
      `$(\\ln u)' = \\dfrac{u'}{u}$ avec $u = x^2 + ${c}$ et $u' = 2x$.`,
    );
  }
  if (cas === "exp") {
    const a = entre(-4, 4);
    const u = a === 0 ? "x" : `(x ${sg(a)})`;
    return qcmExpression(
      `La dérivée de $f(x) = ${u}\\,e^{x}$ est :`,
      `$(x ${sg(a + 1)})e^{x}$`,
      [`$e^{x}$`, `$${u}\\,e^{x}$`, `$(x ${sg(a - 1)})e^{x}$`],
      `Produit : $(uv)' = u'v + uv'$, soit $1 \\times e^x + ${u} \\times e^x = (x ${sg(a + 1)})e^x$.`,
    );
  }
  const a = entre(1, 6), b = entre(1, 5);
  return qcmExpression(
    `La dérivée de $f(x) = \\dfrac{${a}}{x + ${b}}$ sur $]-${b} ; +\\infty[$ est :`,
    `$-\\dfrac{${a}}{(x + ${b})^2}$`,
    [`$\\dfrac{${a}}{(x + ${b})^2}$`, `$${a}\\ln(x + ${b})$`, `$-\\dfrac{${a}}{x + ${b}}$`],
    `$\\left(\\dfrac{1}{u}\\right)' = -\\dfrac{u'}{u^2}$ avec $u = x + ${b}$, $u' = 1$.`,
  );
}

function integraleQcm(): AutoQuestion {
  const cas = pick(["exp", "inverse", "lin"] as const);
  if (cas === "exp") {
    const a = entre(0, 2), b = entre(a + 1, 4);
    const ea = a === 0 ? "1" : a === 1 ? "e" : `e^{${a}}`;
    return qcmExpression(
      `La valeur exacte de $\\displaystyle\\int_{${a}}^{${b}} e^x\\,dx$ est :`,
      `$e^{${b}} - ${ea}$`,
      [`$e^{${b}}$`, `$e^{${b}} + ${ea}$`, `$e^{${b - a}}$`],
      `Une primitive de $e^x$ est $e^x$ : $\\left[e^x\\right]_{${a}}^{${b}} = e^{${b}} - e^{${a}}$${a === 0 ? " $= e^{" + b + "} - 1$" : ""}.`,
    );
  }
  if (cas === "inverse") {
    const b = entre(2, 12);
    return qcmExpression(
      `La valeur exacte de $\\displaystyle\\int_1^{${b}} \\dfrac{1}{x}\\,dx$ est :`,
      `$\\ln ${b}$`,
      [`$\\ln ${b} - 1$`, `$\\dfrac{1}{${b}}$`, `$-\\dfrac{1}{${b * b}} + 1$`],
      `Une primitive de $\\dfrac{1}{x}$ est $\\ln x$ : $\\ln ${b} - \\ln 1 = \\ln ${b}$.`,
    );
  }
  const k = entre(2, 9);
  return qcmExpression(
    `La valeur moyenne de $f(x) = ${k}x$ sur $[0 ; 2]$ est :`,
    `$${k}$`,
    [`$${2 * k}$`, `$${4 * k}$`, `$\\dfrac{${k}}{2}$`],
    `Valeur moyenne $= \\dfrac{1}{b - a}\\displaystyle\\int_a^b f(x)\\,dx = \\dfrac{1}{2}\\left[\\dfrac{${k}x^2}{2}\\right]_0^2 = \\dfrac{1}{2} \\times ${2 * k} = ${k}$.`,
  );
}

function equaDiffQcm(): AutoQuestion {
  const a = pick([2, 3, -2, -1] as const).valueOf(), s = pick([1, 2, -2, 3] as const).valueOf();
  const b = -a * s;
  return qcmExpression(
    `Les solutions de l'équation $y' = ${coefX(a, "y")} ${sg(b)}$ sont les fonctions $x \\mapsto$ … ($C$ réel quelconque)`,
    `$Ce^{${a}x} ${sg(s)}$`,
    [`$Ce^{${a}x} ${sg(-s)}$`, `$Ce^{${-a}x} ${sg(s)}$`, `$Ce^{${b}x}$`],
    `Solution générale = solutions de $y' = ${a}y$ ($Ce^{${a}x}$) + la solution constante ($y = ${s}$, car $0 = ${a} \\times ${s} ${sg(b)}$).`,
  );
}

function vecteurNormalQcm(): AutoQuestion {
  const a = nonNul(-4, 4), b = nonNul(-4, 4), c = nonNul(-4, 4), d = nonNul(-6, 6);
  // « + y » et non « + 1y » (vu au vérificateur, 24/09).
  const terme = (k: number, v: string) => `${k < 0 ? "-" : "+"} ${Math.abs(k) === 1 ? "" : Math.abs(k)}${v}`;
  return qcmExpression(
    `Un vecteur normal au plan d'équation $${coefX(a)} ${terme(b, "y")} ${terme(c, "z")} ${sg(d)} = 0$ est :`,
    `$\\vec{n}(${a} ; ${b} ; ${c})$`,
    [`$\\vec{n}(${b} ; ${c} ; ${d})$`, `$\\vec{n}(${-b} ; ${a} ; ${c})$`, `$\\vec{n}(${a} ; ${b} ; ${d})$`],
    `Pour un plan $ax + by + cz + d = 0$, le vecteur $\\vec{n}(a ; b ; c)$ est normal : on lit les coefficients de $x$, $y$, $z$ — pas la constante.`,
  );
}

// ⛔ 24/09 : un premier jet tirait 25 % de QCM au hasard (« avecQcm ») ; retiré à la
// demande de Frédéric — un nombre se tape, seule une expression se choisit.

/* ═══════════════ LE NIVEAU ═══════════════ */

export const automatismesTerminaleSpe: AutoNiveau = {
  classe: "terminale-spe",
  label: "Terminale spé",
  duree: 20,
  examen: "Pas d'épreuve d'automatismes en terminale : les réflexes qui doivent être automatiques le jour du bac, et des questions flash pour le début d'heure",
  nbQuestions: 10,
  // ⭐ LES 18 NOTIONS DU COACH DE TERMINALE SPÉ, une par thème, dans l'ordre du
  // programme. Réponse tapée quand c'est un nombre ; QCM seulement quand la
  // réponse est une expression qu'on ne tape pas (primitive, dérivée, intégrale
  // exacte, solution d'équation différentielle, vecteur normal).
  themes: [
    { id: "suites", label: "Suites numériques", generateurs: [suites] },
    { id: "limites-suites", label: "Limites de suites", generateurs: [limitesSuites] },
    { id: "limites", label: "Limites de fonctions", generateurs: [limites] },
    { id: "tvi", label: "Continuité, valeurs intermédiaires", generateurs: [tvi] },
    { id: "derivees", label: "Dérivées de fonctions composées", generateurs: [derivees, deriveeQcm] },
    { id: "variations", label: "Dérivation et variations", generateurs: [derivationVariations] },
    { id: "convexite", label: "Convexité", generateurs: [convexite] },
    { id: "exp", label: "Fonction exponentielle", generateurs: [() => expLnCas("exp")] },
    { id: "ln", label: "Fonction logarithme népérien", generateurs: [() => expLnCas("ln")] },
    { id: "integrales", label: "Primitives et intégrales", generateurs: [integrales, primitiveQcm, integraleQcm] },
    { id: "denombrement", label: "Dénombrement et combinatoire", generateurs: [denombrement] },
    { id: "espace", label: "Géométrie dans l'espace", generateurs: [geometrieEspace, vecteurNormalQcm] },
    { id: "produit-scalaire", label: "Produit scalaire dans l'espace", generateurs: [espace] },
    { id: "probas", label: "Probabilités conditionnelles", generateurs: [() => probabilites([1, 2, 5])] },
    { id: "variables", label: "Variables aléatoires", generateurs: [variablesAleatoires] },
    { id: "binomiale", label: "Loi binomiale", generateurs: [binomiale] },
    { id: "python", label: "Algorithmique et Python", generateurs: [python] },
    { id: "equa-diff", label: "Équations différentielles", generateurs: [equaDiff, equaDiffQcm] },
    { id: "concentration", label: "Concentration, loi des grands nombres", generateurs: [concentration] },
  ],
};
