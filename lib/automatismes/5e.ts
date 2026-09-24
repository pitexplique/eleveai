// lib/automatismes/5e.ts
//
// Automatismes de 5e — 24/09/2026.
//
// ⚠️ LA 5e NE SUIT PAS LE PROGRAMME DE 4e-3e : sa référence est l'annexe 1 du
// BO n° 10 du 5 mars 2026, rubriques « Cinquième », telle que le coach de 5e la
// porte (knowledge/maths/5e). Ce qui N'Y EST PAS, et qu'on ne pose donc pas :
// Pythagore, Thalès, cosinus, puissances, notation scientifique, équations,
// médiane — et la MULTIPLICATION des relatifs (la 5e additionne et soustrait).
//
// Repris de 3e/4e, parce que conformes au programme de 5e : fraction d'un
// nombre, pourcentages simples, proportionnalité, ratios, durées, conversions,
// somme des angles, angles supplémentaires, périmètres, aires, solides et
// volumes (cube, pavé, prisme, cylindre : tous au programme), moyenne,
// fréquence, probabilités, graphiques, repère, Scratch.
// Écrit ici : relatifs, fractions (simplifier, comparer, additionner,
// multiplier), diviseurs, calcul littéral de 5e, triangle constructible,
// parallélogramme, et des questions à rédiger à la mesure de la 5e.

import type { AutoNiveau, AutoQuestion } from "./types";
import {
  aires,
  anglesVocabulaire,
  conversions,
  convertirDurees,
  coordonnees,
  divisibilite,
  droiteGraduee,
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
  solides,
  sommeAngles,
  volumes,
} from "./3e";
import { ratios } from "./4e";

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

function fractions5e(): AutoQuestion {
  const cas = entre(1, 4);
  if (cas === 1) {
    const [n, d] = pick([[1, 2], [2, 3], [3, 4], [2, 5], [3, 5], [4, 5], [5, 6], [3, 7], [5, 8], [7, 9]] as const);
    const k = entre(2, 9);
    return {
      text: `Simplifier $\\dfrac{${n * k}}{${d * k}}$ au maximum.`,
      format: "short",
      expected: [`${n}/${d}`],
      explanation: `${n * k} et ${d * k} sont tous les deux divisibles par ${k}.\n$\\dfrac{${n * k}}{${d * k}} = \\dfrac{${n * k} \\div ${k}}{${d * k} \\div ${k}} = \\dfrac{${n}}{${d}}$.`,
    };
  }
  if (cas === 2) {
    const d = pick([3, 4, 5, 6] as const).valueOf(), k = pick([2, 3] as const).valueOf();
    const a = entre(1, d - 1), b = entre(1, d * k - 1);
    const s = a * k + b, D = d * k;
    const g = pgcd(s, D);
    return {
      text: `Calculer $\\dfrac{${a}}{${d}} + \\dfrac{${b}}{${D}}$. Donner le résultat sous forme de fraction simplifiée.`,
      format: "short",
      expected: [g === D ? `${s / g}` : `${s / g}/${D / g}`],
      explanation: `On met au même dénominateur : $\\dfrac{${a}}{${d}} = \\dfrac{${a * k}}{${D}}$.\n$\\dfrac{${a * k}}{${D}} + \\dfrac{${b}}{${D}} = \\dfrac{${s}}{${D}}$${g > 1 ? ` $= \\dfrac{${s / g}}{${D / g}}$` : ""}.`,
    };
  }
  if (cas === 3) {
    const [a, b] = pick([[2, 3], [3, 4], [1, 2], [2, 5], [3, 5]] as const);
    const [c, d] = pick([[3, 4], [5, 6], [2, 3], [1, 3], [4, 7]] as const);
    const n = a * c, D = b * d, g = pgcd(n, D);
    return {
      text: `Calculer $\\dfrac{${a}}{${b}} \\times \\dfrac{${c}}{${d}}$. Donner le résultat sous forme de fraction simplifiée.`,
      format: "short",
      expected: [D / g === 1 ? `${n / g}` : `${n / g}/${D / g}`],
      explanation: `On multiplie les numérateurs entre eux, les dénominateurs entre eux.\n$\\dfrac{${a} \\times ${c}}{${b} \\times ${d}} = \\dfrac{${n}}{${D}}$${g > 1 ? ` $= \\dfrac{${n / g}}{${D / g}}$` : ""}.`,
    };
  }
  const paires = pick([[[3, 4], [5, 8]], [[2, 3], [7, 12]], [[3, 5], [7, 10]], [[5, 6], [2, 3]], [[1, 2], [3, 8]], [[4, 9], [1, 3]]] as const);
  const [[a, b], [c, d]] = paires;
  const grand = a / b > c / d ? `${a}/${b}` : `${c}/${d}`;
  const D = (b * d) / pgcd(b, d);
  return {
    text: `Quelle est la plus grande des deux fractions $\\dfrac{${a}}{${b}}$ et $\\dfrac{${c}}{${d}}$ ? (Écrire la fraction.)`,
    format: "short",
    expected: [grand],
    explanation: `On les écrit avec le même dénominateur, ${D} : $\\dfrac{${a}}{${b}} = \\dfrac{${(a * D) / b}}{${D}}$ et $\\dfrac{${c}}{${d}} = \\dfrac{${(c * D) / d}}{${D}}$.\nLa plus grande est $\\dfrac{${grand.split("/")[0]}}{${grand.split("/")[1]}}$.`,
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

/* ═══════════════ LE NIVEAU ═══════════════ */

export const automatismes5e: AutoNiveau = {
  classe: "5e",
  label: "5e",
  duree: 15,
  examen: "Pas d'épreuve en 5e : les automatismes du programme de 5e, de tête, pour arriver prêt au brevet",
  nbQuestions: 10,
  toujours: ["rediger"],
  themes: [
    { id: "relatifs", label: "Nombres relatifs", generateurs: [relatifs] },
    { id: "fractions", label: "Fractions", generateurs: [fractions5e, fractionDe, droiteGraduee] },
    { id: "diviseurs", label: "Multiples et diviseurs", generateurs: [divisibilite, diviseurs] },
    { id: "litteral", label: "Calcul littéral", generateurs: [litteral5e] },
    { id: "proportionnalite", label: "Proportionnalité et ratios", generateurs: [proportionnalite, ratios] },
    { id: "pourcentages", label: "Pourcentages", generateurs: [pctEffectif, pctComplement, pctProportion] },
    { id: "durees", label: "Durées et conversions", generateurs: [convertirDurees, conversions] },
    { id: "angles", label: "Angles et triangles", generateurs: [sommeAngles, anglesVocabulaire, triangleConstructible] },
    { id: "parallelogramme", label: "Parallélogrammes", generateurs: [parallelogramme] },
    { id: "mesures", label: "Périmètres et aires", generateurs: [perimetres, aires] },
    { id: "solides", label: "Solides et volumes", generateurs: [solides, volumes] },
    { id: "repere", label: "Repère", generateurs: [coordonnees] },
    { id: "graphique", label: "Lire un graphique", generateurs: [lireValeur, lireVariation, lireInstant] },
    { id: "stats", label: "Moyenne et fréquence", generateurs: [moyenne, frequence] },
    { id: "probas", label: "Probabilités", generateurs: [probabilites] },
    { id: "scratch", label: "Scratch", generateurs: [programmeCalcul, polygone] },
    { id: "rediger", label: "Rédiger une réponse", generateurs: [redigerConstructible, redigerDivisible, redigerProportionnalite] },
  ],
};
