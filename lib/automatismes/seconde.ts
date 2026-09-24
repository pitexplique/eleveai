// lib/automatismes/seconde.ts
//
// Automatismes de Seconde — 24/09/2026.
//
// ⚠️ IL N'Y A PAS DE LISTE OFFICIELLE d'automatismes de seconde (Frédéric,
// 24/09 : « pas de liste officielle je crois »), et pas d'épreuve en fin de
// seconde. La référence est donc le PROGRAMME de seconde, celui sur lequel le
// coach est aligné (lib/tutor-v4/knowledge/maths/seconde/notions.ts, 22 notions).
// ⭐ Et c'est la bonne préparation : l'EAM de première évalue « les automatismes
// des nouveaux programmes de seconde ET de première » (message de l'IPR). Même
// règle donc : réponses courtes, au clavier, SANS QCM.
//
// Les générateurs communs à la première (fractions, puissances, racines,
// développer-factoriser, équations, inéquations, fonctions, affines, droites,
// pourcentages, évolutions, probabilités, statistiques) sont REPRIS de
// premiere.ts — ils portent sur des contenus de seconde. Ce fichier écrit ce qui
// n'existe qu'en seconde : réels et intervalles, valeur absolue, ensembles de
// nombres, arithmétique, fonctions de référence, vecteurs et repère, Python.

import type { AutoNiveau, AutoQuestion } from "./types";
import {
  affines,
  developperFactoriser,
  droites,
  equations,
  evolutions,
  fonctions,
  fractionDeFraction,
  fractionsCalcul,
  inequations,
  probabilites,
  proportions,
  puissances,
  racines,
  statistiques,
} from "./premiere";

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

/** Un couple de coordonnées, sous les écritures qu'un élève tape. */
function couple(x: number, y: number): string[] {
  return [`(${x};${y})`, `(${x} ; ${y})`, `(${x},${y})`, `${x};${y}`];
}

/* ═══════════════ RÉELS, INTERVALLES, VALEUR ABSOLUE, ENSEMBLES ═══════════════ */

function reels(): AutoQuestion {
  const cas = entre(1, 4);
  if (cas === 1) {
    const a = entre(-6, 3), b = entre(a + 3, 9);
    const gOuvert = Math.random() < 0.5, dOuvert = Math.random() < 0.5;
    const plusPetit = Math.random() < 0.5;
    const rep = plusPetit ? (gOuvert ? a + 1 : a) : dOuvert ? b - 1 : b;
    const itv = `${gOuvert ? "]" : "["}${a} ; ${b}${dOuvert ? "[" : "]"}`;
    return {
      text: `Quel est le ${plusPetit ? "plus petit" : "plus grand"} nombre ENTIER de l'intervalle $${itv}$ ?`,
      format: "short",
      expected: accepte(rep),
      explanation: `Un crochet tourné vers l'extérieur exclut la borne ; tourné vers l'intérieur, il l'inclut.\n${plusPetit ? `${a} est ${gOuvert ? "exclu" : "inclus"}` : `${b} est ${dOuvert ? "exclu" : "inclus"}`} : la réponse est ${rep}.`,
    };
  }
  if (cas === 2) {
    const a = nonNul(-9, 9), b = entre(-5, 5), c = entre(-5, 5);
    const rep = Math.abs(a) + Math.abs(b - c);
    return {
      text: `Calculer $|${a}| + |${b} - ${c < 0 ? `(${c})` : c}|$.`,
      format: "short",
      expected: accepte(rep),
      explanation: `La valeur absolue d'un nombre est sa distance à zéro : elle n'est jamais négative.\n$|${a}| = ${Math.abs(a)}$ et $|${b - c}| = ${Math.abs(b - c)}$, donc ${rep}.`,
    };
  }
  if (cas === 3) {
    const a = entre(-4, 5), r = entre(1, 5);
    return {
      text: `Résoudre $|x - ${a < 0 ? `(${a})` : a}| = ${r}$. Donner les deux solutions, séparées par « ; ».`,
      format: "short",
      expected: [`${a - r};${a + r}`],
      compare: "ensemble",
      explanation: `$|x - ${a}|$ est la DISTANCE entre $x$ et ${a}. Les nombres à distance ${r} de ${a} sont ${a} − ${r} et ${a} + ${r}.\nSolutions : ${a - r} et ${a + r}.`,
    };
  }
  const n = pick([
    { t: "$-7$", r: "Z", pourquoi: "un entier négatif : il est dans ℤ, pas dans ℕ" },
    { t: "$12$", r: "N", pourquoi: "un entier positif : il est déjà dans ℕ" },
    { t: "$-\\dfrac{3}{4}$", r: "D", pourquoi: "$-\\dfrac{3}{4} = -0,75$ : un nombre décimal, dans 𝔻" },
    { t: "$\\dfrac{1}{3}$", r: "Q", pourquoi: "$\\dfrac{1}{3} = 0,333\\ldots$ ne s'écrit pas avec un nombre fini de décimales : il est dans ℚ, pas dans 𝔻" },
    { t: "$\\sqrt{2}$", r: "R", pourquoi: "$\\sqrt{2}$ n'est pas un quotient d'entiers : il n'est que dans ℝ" },
    { t: "$\\pi$", r: "R", pourquoi: "π n'est pas rationnel : il n'est que dans ℝ" },
    { t: "$\\dfrac{12}{4}$", r: "N", pourquoi: "$\\dfrac{12}{4} = 3$ : un entier naturel, malgré son écriture" },
    { t: "$2,5$", r: "D", pourquoi: "un nombre décimal, pas entier : dans 𝔻" },
    { t: "$\\dfrac{2}{7}$", r: "Q", pourquoi: "$\\dfrac{2}{7}$ a une écriture décimale illimitée : dans ℚ, pas dans 𝔻" },
    { t: "$\\sqrt{16}$", r: "N", pourquoi: "$\\sqrt{16} = 4$ : un entier naturel" },
  ]);
  const lettres: Record<string, string[]> = {
    N: ["N", "ℕ", "n"], Z: ["Z", "ℤ", "z"], D: ["D", "𝔻", "d"], Q: ["Q", "ℚ", "q"], R: ["R", "ℝ", "r"],
  };
  return {
    text: `Quel est le plus petit ensemble — N, Z, D, Q ou R — qui contient ${n.t} ? (Répondre par une lettre.)`,
    format: "short",
    expected: lettres[n.r],
    explanation: `ℕ ⊂ ℤ ⊂ 𝔻 ⊂ ℚ ⊂ ℝ. Ici, ${n.pourquoi}.\nRéponse : ${n.r}.`,
  };
}

/* ═══════════════ ARITHMÉTIQUE ═══════════════ */

function arithmetique(): AutoQuestion {
  const cas = entre(1, 3);
  if (cas === 1) {
    const [n, p] = pick([[91, 7], [77, 7], [119, 7], [143, 11], [221, 13], [187, 11], [133, 7], [209, 11], [161, 7], [247, 13]] as const);
    return {
      text: `Quel est le plus petit diviseur premier de ${n} ?`,
      format: "short",
      expected: accepte(p),
      explanation: `On essaie les nombres premiers dans l'ordre : 2 (${n} est impair), 3 (somme des chiffres ${String(n).split("").reduce((s, c) => s + +c, 0)}, pas un multiple de 3), 5 (ne finit ni par 0 ni par 5)${p > 7 ? ", 7" : ""}…\n$${n} = ${p} \\times ${n / p}$ : c'est ${p}.`,
    };
  }
  if (cas === 2) {
    const n = pick([12, 18, 20, 28, 30, 36, 45, 50] as const).valueOf();
    const d = Array.from({ length: n }, (_, i) => i + 1).filter((k) => n % k === 0);
    return {
      text: `Combien le nombre ${n} a-t-il de diviseurs positifs ?`,
      format: "short",
      expected: accepte(d.length),
      explanation: `On les cherche par paires : ${d.slice(0, Math.ceil(d.length / 2)).map((k) => `${k} × ${n / k}`).join(", ")}.\nSes diviseurs sont ${d.join(", ")} : il y en a ${d.length}.`,
    };
  }
  const a = entre(2, 9) * entre(3, 12);
  const b = pick([3, 4, 6, 7, 8, 9] as const).valueOf();
  const oui = a % b === 0;
  return {
    text: `Le nombre ${a} est-il un multiple de ${b} ? Répondre par oui ou par non.`,
    format: "short",
    expected: oui ? ["oui", "Oui"] : ["non", "Non"],
    explanation: oui
      ? `Oui : $${a} = ${b} \\times ${a / b}$.`
      : `Non : $${a} = ${b} \\times ${Math.floor(a / b)} + ${a % b}$, le reste n'est pas nul.`,
  };
}

/* ═══════════════ FONCTIONS DE RÉFÉRENCE ═══════════════ */

function reference(): AutoQuestion {
  const cas = entre(1, 3);
  if (cas === 1) {
    const q = pick([
      () => { const x = nonNul(-9, 9); return { t: `$f(x) = x^2$. Calculer $f(${x})$.`, r: x * x, e: `$(${x})^2 = ${x * x}$ : un carré est toujours positif.` }; },
      () => { const x = pick([2, 4, 5, 10, 0.5, 0.25] as const).valueOf(); return { t: `$g(x) = \\dfrac{1}{x}$. Calculer $g(${fr(x)})$.`, r: 1 / x, e: `L'inverse de ${fr(x)} est $\\dfrac{1}{${fr(x)}} = ${fr(1 / x)}$.` }; },
      () => { const k = entre(2, 12); return { t: `$h(x) = \\sqrt{x}$. Calculer $h(${k * k})$.`, r: k, e: `$\\sqrt{${k * k}} = ${k}$, car $${k}^2 = ${k * k}$ et ${k} est positif.` }; },
      () => { const x = nonNul(-4, 4); return { t: `$u(x) = x^3$. Calculer $u(${x})$.`, r: x ** 3, e: `$(${x})^3 = ${x} \\times ${x} \\times ${x} = ${x ** 3}$ : le cube garde le signe.` }; },
    ]);
    const { t, r, e } = q();
    return { text: t, format: "short", expected: accepte(r), explanation: e };
  }
  if (cas === 2) {
    const a = entre(2, 9), b = entre(2, 9);
    if (a === b) return reference();
    const sa = -a, sb = -b;
    const grand = Math.max(a * a, b * b);
    return {
      text: `Sans calculatrice, donner le plus grand des deux nombres $(${sa})^2$ et $(${sb})^2$.`,
      format: "short",
      expected: accepte(grand),
      explanation: `La fonction carré est DÉCROISSANTE sur $]-\\infty ; 0]$ : plus un négatif est petit, plus son carré est grand.\n$(${Math.min(sa, sb)})^2 = ${grand}$ est le plus grand.`,
    };
  }
  const k = pick([2, 4, 5, 10, -2, -4] as const).valueOf();
  return {
    text: `Résoudre $\\dfrac{1}{x} = ${k}$. Donner $x$ (nombre décimal).`,
    format: "short",
    expected: [...accepte(1 / k), `1/${k}`],
    explanation: `$\\dfrac{1}{x} = ${k}$ équivaut à $x = \\dfrac{1}{${k}}$.\n$x = ${fr(1 / k)}$.`,
  };
}

/* ═══════════════ VECTEURS ET REPÈRE ═══════════════ */

function vecteurs(): AutoQuestion {
  const cas = entre(1, 4);
  const xA = entre(-5, 4), yA = entre(-5, 4);
  if (cas === 1) {
    const xB = entre(-5, 5), yB = entre(-5, 5);
    return {
      text: `Dans un repère, $A(${xA} ; ${yA})$ et $B(${xB} ; ${yB})$. Donner les coordonnées du vecteur $\\overrightarrow{AB}$, sous la forme (x ; y).`,
      format: "short",
      expected: couple(xB - xA, yB - yA),
      explanation: `$\\overrightarrow{AB}(x_B - x_A ; y_B - y_A)$ : l'ARRIVÉE moins le DÉPART.\n$(${xB} - (${xA}) ; ${yB} - (${yA})) = (${xB - xA} ; ${yB - yA})$.`,
    };
  }
  if (cas === 2) {
    const xB = xA + 2 * entre(-3, 3), yB = yA + 2 * entre(-3, 3);
    const mx = (xA + xB) / 2, my = (yA + yB) / 2;
    return {
      text: `Dans un repère, $A(${xA} ; ${yA})$ et $B(${xB} ; ${yB})$. Donner les coordonnées du milieu $I$ de $[AB]$, sous la forme (x ; y).`,
      format: "short",
      expected: couple(mx, my),
      explanation: `Le milieu a pour coordonnées les MOYENNES : $\\left(\\dfrac{x_A + x_B}{2} ; \\dfrac{y_A + y_B}{2}\\right)$.\n$\\left(\\dfrac{${xA + xB}}{2} ; \\dfrac{${yA + yB}}{2}\\right) = (${mx} ; ${my})$.`,
    };
  }
  if (cas === 3) {
    const [dx, dy, d] = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [4, 3, 5], [8, 6, 10], [12, 5, 13]] as const);
    const sx = pick([1, -1] as const), sy = pick([1, -1] as const);
    const xB = xA + sx * dx, yB = yA + sy * dy;
    return {
      text: `Dans un repère orthonormé, $A(${xA} ; ${yA})$ et $B(${xB} ; ${yB})$. Calculer la distance $AB$.`,
      format: "short",
      expected: accepte(d),
      explanation: `$AB = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}$ — c'est Pythagore.\n$\\sqrt{${sx * dx}^2 + ${sy * dy}^2} = \\sqrt{${dx * dx} + ${dy * dy}} = \\sqrt{${d * d}} = ${d}$.`,
    };
  }
  const ux = entre(-5, 5), uy = entre(-5, 5), vx = entre(-5, 5), vy = entre(-5, 5);
  const k = pick([1, 2, 3] as const).valueOf();
  return {
    text: `On donne $\\vec{u}(${ux} ; ${uy})$ et $\\vec{v}(${vx} ; ${vy})$. Donner les coordonnées de $${k === 1 ? "" : k}\\vec{u} + \\vec{v}$, sous la forme (x ; y).`,
    format: "short",
    expected: couple(k * ux + vx, k * uy + vy),
    explanation: `On calcule coordonnée par coordonnée${k > 1 ? `, après avoir multiplié celles de $\\vec{u}$ par ${k}` : ""}.\n$(${k * ux} + (${vx}) ; ${k * uy} + (${vy})) = (${k * ux + vx} ; ${k * uy + vy})$.`,
  };
}

/* ═══════════════ PYTHON ═══════════════ */

function python(): AutoQuestion {
  const cas = entre(1, 3);
  if (cas === 1) {
    const n = entre(3, 7);
    const pasDeux = Math.random() < 0.4;
    const valeurs = Array.from({ length: n }, (_, i) => (pasDeux ? 2 * (i + 1) : i + 1));
    const s = valeurs.reduce((a, b) => a + b, 0);
    return {
      text:
        "Quel nombre ce programme affiche-t-il ?\n\n```python\ns = 0\n" +
        (pasDeux ? `for i in range(1, ${n + 1}):\n    s = s + 2 * i\n` : `for i in range(1, ${n + 1}):\n    s = s + i\n`) +
        "print(s)\n```",
      format: "short",
      expected: accepte(s),
      explanation: `\`range(1, ${n + 1})\` donne les entiers de 1 à ${n} (la borne ${n + 1} est EXCLUE).\n$s = ${valeurs.join(" + ")} = ${s}$.`,
    };
  }
  if (cas === 2) {
    const a = nonNul(-4, 5), b = entre(-6, 6), x = entre(-3, 5);
    return {
      text:
        "Quel nombre ce programme affiche-t-il ?\n\n```python\ndef f(x):\n" +
        `    return ${a} * x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}\n\nprint(f(${x}))\n` +
        "```",
      format: "short",
      expected: accepte(a * x + b),
      explanation: `\`f(${x})\` remplace x par ${x} : $${a} \\times (${x}) ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = ${a * x + b}$.`,
    };
  }
  const seuil = entre(8, 15), x = entre(3, 20);
  const rep = x > seuil ? x - seuil : 2 * x;
  return {
    text:
      "Quel nombre ce programme affiche-t-il ?\n\n```python\n" +
      `x = ${x}\nif x > ${seuil}:\n    y = x - ${seuil}\nelse:\n    y = 2 * x\nprint(y)\n` +
      "```",
    format: "short",
    expected: accepte(rep),
    explanation: `${x} > ${seuil} est ${x > seuil ? "VRAI" : "FAUX"} : on passe dans ${x > seuil ? `le \`if\`, y = ${x} − ${seuil}` : `le \`else\`, y = 2 × ${x}`}.\nLe programme affiche ${rep}.`,
  };
}

/* ═══════════════ LE NIVEAU ═══════════════ */

export const automatismesSeconde: AutoNiveau = {
  classe: "seconde",
  label: "Seconde",
  duree: 20,
  examen: "Pas d'épreuve en seconde : ce sont les automatismes que l'épreuve anticipée de première évaluera. Réponses courtes, sans calculatrice",
  nbQuestions: 10,
  themes: [
    { id: "reels", label: "Réels, intervalles, valeur absolue", generateurs: [reels] },
    { id: "arithmetique", label: "Multiples, diviseurs, premiers", generateurs: [arithmetique] },
    { id: "fractions", label: "Fractions", generateurs: [fractionsCalcul, fractionDeFraction] },
    { id: "puissances", label: "Puissances", generateurs: [puissances] },
    { id: "racines", label: "Racines carrées", generateurs: [racines] },
    { id: "devfac", label: "Développer, factoriser", generateurs: [developperFactoriser] },
    { id: "equations", label: "Équations", generateurs: [equations] },
    { id: "inequations", label: "Inéquations et signes", generateurs: [inequations] },
    { id: "fonctions", label: "Fonctions : généralités", generateurs: [fonctions] },
    { id: "reference", label: "Fonctions de référence", generateurs: [reference] },
    { id: "affines", label: "Fonctions affines", generateurs: [affines] },
    { id: "droites", label: "Droites du plan", generateurs: [droites] },
    { id: "vecteurs", label: "Vecteurs et repère", generateurs: [vecteurs] },
    { id: "pourcentages", label: "Pourcentages et évolutions", generateurs: [proportions, evolutions] },
    { id: "stats", label: "Statistiques", generateurs: [statistiques] },
    { id: "probas", label: "Probabilités", generateurs: [probabilites] },
    { id: "python", label: "Python", generateurs: [python] },
  ],
};
