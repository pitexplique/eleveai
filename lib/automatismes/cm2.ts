// lib/automatismes/cm2.ts
//
// Automatismes de CM2 (et les générateurs que le CM1 reprend) — 26/09/2026.
//
// ⭐ RÉFÉRENCE : le programme de mathématiques du cycle 3 (BO n° 16 du
// 17 avril 2025 ; au CM1 depuis la rentrée 2025, au CM2 depuis la rentrée
// 2026). Il le dit en toutes lettres : « Au cours moyen, les automatismes
// concernent principalement les faits numériques et les procédures de calcul
// que tout élève est tenu de maîtriser. Ils sont notamment explicités dans la
// rubrique "Calcul mental" ». On colle STRICTEMENT à cette rubrique, niveau
// par niveau (Frédéric, 26/09 : « on colle strictement la liste »).
//
// CM2, « Calcul mental » :
// - mémoriser : faits numériques usuels (entiers), moitié des impairs
//   jusqu'à 15, relations entre fractions usuelles, leur écriture décimale ;
// - numération : ajouter ou soustraire un entier à un décimal sans retenue,
//   ajouter un entier à un décimal avec retenue, × et ÷ 10, 100, 1 000 ;
// - procédures : ajouter deux décimaux < 10 à une décimale ; ± 8, 9, 18,
//   19… 98, 99 ; 30 × 400 ; distributivité simple ; double et moitié d'un
//   décimal ; ÷ 4 et ÷ 8 ; × 5 et × 50 d'un décimal.
//
// Format : 10 questions, 10 minutes, de tête, PAS de question à rédiger (une
// exigence du brevet). Tout se tape : ce ne sont que des nombres.
// ⛔ Pas de calcul faux par la machine : on calcule en ENTIERS (dixièmes,
// centièmes), jamais 0,1 + 0,2 en flottants.

import type { AutoNiveau, AutoQuestion } from "./types";

export type CoursMoyen = "cm1" | "cm2";

/* ─────────────────────────── outils ─────────────────────────── */

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function entre(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Un nombre à l'écrit : « 12 000 000 », « 3,25 ». */
function nb(n: number): string {
  const r = Math.round(n * 1e6) / 1e6;
  const [e, d] = String(Math.abs(r)).split(".");
  const ent = e.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${r < 0 ? "-" : ""}${ent}${d ? `,${d}` : ""}`;
}

/**
 * Les écritures acceptées : « 80 400 » en premier (c'est celle que le bilan
 * affiche), puis « 80400 », « 3.5 ». Les espaces sont ignorés à la correction.
 */
function accepte(n: number): string[] {
  const s = nb(n).replace(/ /g, "");
  return Array.from(new Set([nb(n), s, s.replace(",", ".")]));
}

/* ═══════════════ MÉMORISER DES FAITS NUMÉRIQUES ═══════════════ */

export function tables(): AutoQuestion {
  const a = entre(2, 10), b = entre(2, 10);
  const cas = entre(1, 3);
  if (cas === 1) {
    return { text: `Calculer ${a} × ${b}.`, format: "short", expected: accepte(a * b), explanation: `C'est la table de ${a}.\n${a} × ${b} = ${a * b}.` };
  }
  if (cas === 2) {
    return { text: `Compléter : ${a} × … = ${a * b}.`, format: "short", expected: accepte(b), explanation: `Dans la table de ${a}, on cherche ${a * b}.\n${a} × ${b} = ${a * b}.` };
  }
  return { text: `Combien de fois ${a} dans ${a * b} ?`, format: "short", expected: accepte(b), explanation: `On cherche ${a * b} dans la table de ${a}.\n${a} × ${b} = ${a * b} : ${b} fois.` };
}

/** Faits numériques usuels avec des entiers ; au CM2, la moitié des impairs jusqu'à 15. */
export function faitsNumeriques(niv: CoursMoyen): () => AutoQuestion {
  return () => {
    const cas = entre(1, niv === "cm2" ? 6 : 5);
    if (cas === 1) {
      const n = entre(3, 97);
      return { text: `Combien faut-il ajouter à ${n} pour obtenir 100 ?`, format: "short", expected: accepte(100 - n), explanation: `On complète d'abord à la dizaine suivante, puis à 100.\n${n} + ${100 - n} = 100.` };
    }
    if (cas === 2) {
      const n = entre(1, 19) * 50;
      return { text: `Combien faut-il ajouter à ${nb(n)} pour obtenir 1 000 ?`, format: "short", expected: accepte(1000 - n), explanation: `On complète à la centaine, puis à 1 000.\n${nb(n)} + ${nb(1000 - n)} = 1 000.` };
    }
    if (cas === 3) {
      const n = entre(11, 99);
      return { text: `Quel est le double de ${n} ?`, format: "short", expected: accepte(2 * n), explanation: `Le double, c'est deux fois le nombre : on double les dizaines, puis les unités.\n${n} + ${n} = ${2 * n}.` };
    }
    if (cas === 4) {
      const n = 2 * entre(6, 99);
      return { text: `Quelle est la moitié de ${n} ?`, format: "short", expected: accepte(n / 2), explanation: `La moitié, c'est partager en deux parts égales.\n${n / 2} + ${n / 2} = ${n}.` };
    }
    if (cas === 5) {
      const f = pick([[25, 4, 100], [50, 2, 100], [20, 5, 100], [125, 8, 1000], [250, 4, 1000], [200, 5, 1000], [500, 2, 1000], [25, 40, 1000], [4, 25, 100], [5, 20, 100], [2, 50, 100], [8, 125, 1000]] as const);
      const trouA = Math.random() < 0.5;
      return {
        text: trouA ? `Compléter : … × ${f[1]} = ${nb(f[2])}.` : `Compléter : ${f[0]} × … = ${nb(f[2])}.`,
        format: "short",
        expected: accepte(trouA ? f[0] : f[1]),
        explanation: `C'est un fait à connaître par cœur : ${f[0]} × ${f[1]} = ${nb(f[2])}.`,
      };
    }
    const n = pick([1, 3, 5, 7, 9, 11, 13, 15] as const).valueOf();
    return { text: `Quelle est la moitié de ${n} ?`, format: "short", expected: accepte(n / 2), explanation: `${n} = ${n - 1} + 1 : la moitié de ${n - 1} est ${(n - 1) / 2}, la moitié de 1 est 0,5.\nLa moitié de ${n} est ${nb(n / 2)}.` };
  };
}

/** Relations entre fractions usuelles, et leur écriture décimale. */
export function fractionsUsuelles(niv: CoursMoyen): () => AutoQuestion {
  const decimales = [[1, 2, 0.5], [1, 4, 0.25], [3, 4, 0.75], [1, 10, 0.1], [3, 10, 0.3], [7, 10, 0.7], [1, 100, 0.01], [25, 100, 0.25], [3, 2, 1.5], [5, 2, 2.5], ...(niv === "cm2" ? [[1, 5, 0.2], [5, 4, 1.25], [9, 10, 0.9], [7, 100, 0.07], [1, 1000, 0.001]] : [])] as const;
  return () => {
    const cas = entre(1, 3);
    if (cas === 1) {
      const [n, d, v] = pick(decimales);
      return { text: `Donner l'écriture décimale de la fraction ${n}/${d}.`, format: "short", expected: accepte(v), explanation: `${n}/${d}, c'est ${n} partagé en ${d} : ${n}/${d} = ${nb(v)}.\nÀ connaître par cœur.` };
    }
    if (cas === 2) {
      const [n, d, v] = pick(decimales);
      return { text: `Compléter : ${nb(v)} = …/${d}.`, format: "short", expected: accepte(n), explanation: `${nb(v)} = ${n}/${d}.\nÀ connaître par cœur.` };
    }
    const r = pick([
      { t: "1/2 = …/4", r: 2, e: "Un demi, c'est deux quarts." },
      { t: "1/2 = …/10", r: 5, e: "Un demi, c'est cinq dixièmes." },
      { t: "1/2 = …/100", r: 50, e: "Un demi, c'est cinquante centièmes." },
      { t: "1/4 = …/100", r: 25, e: "Un quart, c'est vingt-cinq centièmes." },
      { t: "3/4 = …/100", r: 75, e: "Trois quarts, c'est soixante-quinze centièmes." },
      { t: "1/10 = …/100", r: 10, e: "Un dixième, c'est dix centièmes." },
      { t: "1 = …/4", r: 4, e: "Une unité, c'est quatre quarts." },
      { t: "1 = …/10", r: 10, e: "Une unité, c'est dix dixièmes." },
      { t: "1/4 + 1/4 = …/2", r: 1, e: "Deux quarts font un demi." },
      { t: "1/2 + 1/4 = …/4", r: 3, e: "Un demi, c'est deux quarts ; plus un quart : trois quarts." },
      { t: "Combien de quarts dans 3 unités ?", r: 12, e: "Une unité, c'est 4 quarts : 3 unités, 12 quarts." },
      { t: "Combien de dixièmes dans 2 unités ?", r: 20, e: "Une unité, c'est 10 dixièmes : 2 unités, 20 dixièmes." },
      { t: "Combien de demis dans 5 unités ?", r: 10, e: "Une unité, c'est 2 demis : 5 unités, 10 demis." },
      ...(niv === "cm2"
        ? [
            { t: "1/10 = …/1 000", r: 100, e: "Un dixième, c'est cent millièmes." },
            { t: "1/100 = …/1 000", r: 10, e: "Un centième, c'est dix millièmes." },
            { t: "Combien de centièmes dans 3 unités ?", r: 300, e: "Une unité, c'est 100 centièmes : 3 unités, 300 centièmes." },
            { t: "1/5 = …/10", r: 2, e: "Un cinquième, c'est deux dixièmes." },
          ]
        : []),
    ]);
    return { text: r.t.includes("?") ? r.t : `Compléter : ${r.t}.`, format: "short", expected: accepte(r.r), explanation: `${r.e}\nRéponse : ${nb(r.r)}.` };
  };
}

/* ═══════════════ UTILISER LA NUMÉRATION ═══════════════ */

const RANGS = [
  { nom: "centièmes", p: -2 },
  { nom: "dixièmes", p: -1 },
  { nom: "unités", p: 0 },
  { nom: "dizaines", p: 1 },
  { nom: "centaines", p: 2 },
] as const;

/**
 * Ajouter ou soustraire, SANS retenue, un nombre d'unités, de dizaines, de
 * centaines, de dixièmes ou de centièmes à un décimal ; au CM2, ajouter un
 * entier AVEC retenue.
 */
export function ajouterAuDecimal(niv: CoursMoyen): () => AutoQuestion {
  return () => {
    // Le nombre en centièmes : chiffres c d u , t h
    const chiffres = [entre(1, 9), entre(0, 9), entre(0, 9), entre(1, 9), entre(0, 9)]; // c d u t h
    const valeur = (ch: number[]) => ch[0] * 10000 + ch[1] * 1000 + ch[2] * 100 + ch[3] * 10 + ch[4];
    const avecRetenue = niv === "cm2" && Math.random() < 0.3;
    if (avecRetenue) {
      const u = entre(3, 9);
      chiffres[2] = u;
      const k = entre(10 - u, 9);
      const n = valeur(chiffres);
      return {
        text: `Calculer ${nb(n / 100)} + ${k}.`,
        format: "short",
        expected: accepte((n + k * 100) / 100),
        explanation: `On ajoute ${k} aux unités : ${u} + ${k} = ${u + k}, on retient 1 dizaine. Les chiffres après la virgule ne bougent pas.\n${nb(n / 100)} + ${k} = ${nb((n + k * 100) / 100)}.`,
      };
    }
    const rang = pick(RANGS);
    const idx = { 2: 0, 1: 1, 0: 2, [-1]: 3, [-2]: 4 }[rang.p]!;
    const plus = Math.random() < 0.5;
    const x = chiffres[idx];
    if ((plus && x === 9) || (!plus && x === 0)) return ajouterAuDecimal(niv)();
    const k = plus ? entre(1, 9 - x) : entre(1, x);
    const n = valeur(chiffres);
    const ajout = k * 10 ** (rang.p + 2); // en centièmes
    const r = plus ? n + ajout : n - ajout;
    return {
      text: `Calculer ${nb(n / 100)} ${plus ? "+" : "−"} ${nb(ajout / 100)}.`,
      format: "short",
      expected: accepte(r / 100),
      explanation: `${nb(ajout / 100)}, c'est ${k} ${k === 1 ? rang.nom.replace(/s$/, "") : rang.nom} : seul le chiffre des ${rang.nom} change, ${x} ${plus ? "+" : "−"} ${k} = ${plus ? x + k : x - k}.\n${nb(n / 100)} ${plus ? "+" : "−"} ${nb(ajout / 100)} = ${nb(r / 100)}.`,
    };
  };
}

/** × et ÷ par 10, 100, 1 000 — au CM1 : un entier × 10, 100, 1 000, un décimal × et ÷ 10. */
export function fois10(niv: CoursMoyen): () => AutoQuestion {
  return () => {
    if (niv === "cm1" && Math.random() < 0.5) {
      const n = entre(2, 999), p = pick([10, 100, 1000] as const).valueOf();
      return { text: `Calculer ${nb(n)} × ${nb(p)}.`, format: "short", expected: accepte(n * p), explanation: `Multiplier par ${nb(p)} : chaque chiffre devient ${nb(p)} fois plus grand, on écrit ${String(p).length - 1} zéro${p > 10 ? "s" : ""} à droite.\n${nb(n)} × ${nb(p)} = ${nb(n * p)}.` };
    }
    const p = niv === "cm1" ? 10 : pick([10, 100, 1000] as const).valueOf();
    const fois = Math.random() < 0.5;
    // ⛔ Le CM1 s'arrête aux centièmes, le CM2 aux millièmes (« 8,07 ÷ 1 000 =
    // 0,00807 » sortait au premier jet) : le quotient ne dépasse pas ce rang.
    const maxDec = niv === "cm1" ? 2 : 3;
    const rangsP = String(p).length - 1;
    const dec = fois ? entre(1, 2) : entre(1, Math.max(1, maxDec - rangsP));
    if (!fois && dec + rangsP > maxDec) return fois10(niv)();
    const m = entre(11, 9999);
    if (m % 10 === 0) return fois10(niv)();
    const v = m / 10 ** dec;
    const r = fois ? (m * p) / 10 ** dec : m / (10 ** dec * p);
    const rangs = String(p).length - 1;
    return {
      text: `Calculer ${nb(v)} ${fois ? "×" : "÷"} ${nb(p)}.`,
      format: "short",
      expected: accepte(r),
      explanation: `${fois ? "Multiplier" : "Diviser"} par ${nb(p)} : chaque chiffre devient ${nb(p)} fois plus ${fois ? "grand" : "petit"}, il avance de ${rangs} rang${rangs > 1 ? "s" : ""} vers la ${fois ? "gauche" : "droite"}.\n${nb(v)} ${fois ? "×" : "÷"} ${nb(p)} = ${nb(r)}.`,
    };
  };
}

/* ═══════════════ PROCÉDURES DE CALCUL MENTAL ═══════════════ */

/** CM2 : deux décimaux inférieurs à 10, avec au plus un chiffre après la virgule. */
export function additionDecimaux(): AutoQuestion {
  const a = entre(11, 89), b = entre(11, 89);
  if (a % 10 === 0 && b % 10 === 0) return additionDecimaux();
  return {
    text: `Calculer ${nb(a / 10)} + ${nb(b / 10)}.`,
    format: "short",
    expected: accepte((a + b) / 10),
    explanation: `On ajoute les unités, puis les dixièmes : ${Math.floor(a / 10)} + ${Math.floor(b / 10)} = ${Math.floor(a / 10) + Math.floor(b / 10)} et ${a % 10} + ${b % 10} = ${(a % 10) + (b % 10)} dixièmes${(a % 10) + (b % 10) >= 10 ? ", soit 1 unité de plus" : ""}.\n${nb(a / 10)} + ${nb(b / 10)} = ${nb((a + b) / 10)}.`,
  };
}

/** ± 8, 9, 18, 19… : au CM1 jusqu'à 39, au CM2 jusqu'à 99. */
export function plusNeuf(niv: CoursMoyen): () => AutoQuestion {
  return () => {
    const dizaines = niv === "cm1" ? [0, 1, 2, 3] : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const k = pick(dizaines) * 10 + pick([8, 9] as const);
    const rond = k + (k % 10 === 9 ? 1 : 2);
    const n = entre(niv === "cm1" ? 100 : 150, niv === "cm1" ? 999 : 9999);
    const plus = Math.random() < 0.5;
    const r = plus ? n + k : n - k;
    return {
      text: `Calculer ${nb(n)} ${plus ? "+" : "−"} ${k}.`,
      format: "short",
      expected: accepte(r),
      explanation: `${plus ? "Ajouter" : "Soustraire"} ${k}, c'est ${plus ? "ajouter" : "soustraire"} ${rond}, puis ${plus ? "retirer" : "rajouter"} ${rond - k}.\n${nb(n)} ${plus ? "+" : "−"} ${rond} = ${nb(plus ? n + rond : n - rond)}, puis ${nb(r)}.`,
    };
  };
}

/** CM1 : un chiffre × des dizaines ou des centaines ; CM2 : 30 × 400. */
export function dizainesCentaines(niv: CoursMoyen): () => AutoQuestion {
  return () => {
    const a = entre(2, 9), b = entre(2, 9);
    const i = niv === "cm1" ? 0 : entre(1, 3);
    const j = entre(1, niv === "cm1" ? 2 : 3);
    const A = a * 10 ** i, B = b * 10 ** j;
    const zeros = i + j;
    return {
      text: `Calculer ${nb(A)} × ${nb(B)}.`,
      format: "short",
      expected: accepte(A * B),
      explanation: `On multiplie les chiffres, ${a} × ${b} = ${a * b}, puis on écrit les ${zeros} zéro${zeros > 1 ? "s" : ""}.\n${nb(A)} × ${nb(B)} = ${nb(A * B)}.`,
    };
  };
}

export function distributivite(): AutoQuestion {
  const a = entre(3, 9), d = pick([10, 20, 100] as const).valueOf(), u = entre(1, 9);
  const b = d + u;
  if (Math.random() < 0.5) {
    return {
      text: `Calculer ${a} × ${b}.`,
      format: "short",
      expected: accepte(a * b),
      explanation: `${b} = ${d} + ${u} : on multiplie chaque morceau par ${a}.\n${a} × ${d} + ${a} × ${u} = ${a * d} + ${a * u} = ${a * b}.`,
    };
  }
  return {
    text: `Compléter : ${a} × ${b} = ${a} × ${d} + ${a} × … .`,
    format: "short",
    expected: accepte(u),
    explanation: `${b} = ${d} + ${u}, donc ${a} × ${b} = ${a} × ${d} + ${a} × ${u}.\nLa réponse est ${u}.`,
  };
}

/** CM2 : double et moitié d'un décimal, dans des cas simples. */
export function doubleMoitieDecimal(): AutoQuestion {
  if (Math.random() < 0.5) {
    const x = entre(11, 49);
    if (x % 10 === 0) return doubleMoitieDecimal();
    return { text: `Quel est le double de ${nb(x / 10)} ?`, format: "short", expected: accepte((2 * x) / 10), explanation: `On double les unités, puis les dixièmes.\n${nb(x / 10)} + ${nb(x / 10)} = ${nb((2 * x) / 10)}.` };
  }
  const x = 2 * entre(6, 49);
  if (x % 10 === 0) return doubleMoitieDecimal();
  return { text: `Quelle est la moitié de ${nb(x / 10)} ?`, format: "short", expected: accepte(x / 20), explanation: `${nb(x / 10)}, c'est ${x} dixièmes ; la moitié, ${x / 2} dixièmes.\nLa moitié de ${nb(x / 10)} est ${nb(x / 20)}.` };
}

/** CM2 : diviser un entier par 4 ou par 8 ; CM1 : multiplier un entier par 4 ou par 8. */
export function quatreHuit(niv: CoursMoyen): () => AutoQuestion {
  return () => {
    const d = pick([4, 8] as const).valueOf();
    const fois = d === 4 ? "le double du double" : "le double du double du double";
    if (niv === "cm1") {
      const n = entre(11, 60);
      return { text: `Calculer ${n} × ${d}.`, format: "short", expected: accepte(n * d), explanation: `Multiplier par ${d}, c'est prendre ${fois}.\n${d === 4 ? `${n} → ${2 * n} → ${4 * n}` : `${n} → ${2 * n} → ${4 * n} → ${8 * n}`}.` };
    }
    const q = entre(11, 60);
    const n = q * d;
    const moitie = d === 4 ? "la moitié de la moitié" : "la moitié de la moitié de la moitié";
    return { text: `Calculer ${n} ÷ ${d}.`, format: "short", expected: accepte(q), explanation: `Diviser par ${d}, c'est prendre ${moitie}.\n${d === 4 ? `${n} → ${n / 2} → ${q}` : `${n} → ${n / 2} → ${n / 4} → ${q}`}.` };
  };
}

/** × 5 (CM1 : un entier ; CM2 : un décimal) et × 50 (CM2). */
export function foisCinq(niv: CoursMoyen): () => AutoQuestion {
  return () => {
    if (niv === "cm1") {
      const n = entre(12, 98);
      return { text: `Calculer ${n} × 5.`, format: "short", expected: accepte(n * 5), explanation: `Multiplier par 5, c'est multiplier par 10 puis prendre la moitié.\n${n} × 10 = ${n * 10}, et la moitié de ${n * 10} est ${n * 5}.` };
    }
    const cinquante = Math.random() < 0.5;
    const x = entre(11, 99); // en dixièmes
    const v = x / 10;
    const k = cinquante ? 50 : 5;
    const r = (x * k) / 10;
    return {
      text: `Calculer ${nb(v)} × ${k}.`,
      format: "short",
      expected: accepte(r),
      explanation: `Multiplier par ${k}, c'est multiplier par ${k * 2} puis prendre la moitié.\n${nb(v)} × ${k * 2} = ${nb((x * k * 2) / 10)}, et la moitié est ${nb(r)}.`,
    };
  };
}

/* ═══════════════ LE NIVEAU ═══════════════ */

export const automatismesCm2: AutoNiveau = {
  classe: "cm2",
  label: "CM2",
  duree: 10,
  examen: "Pas d'épreuve en CM2 : le calcul mental que le programme demande (faits numériques et procédures), de tête, sans calculatrice",
  nbQuestions: 10,
  themes: [
    // Mémoriser des faits numériques
    { id: "tables", label: "Tables de multiplication", generateurs: [tables] },
    { id: "faits", label: "Doubles, moitiés, compléments", generateurs: [faitsNumeriques("cm2")] },
    { id: "fractions", label: "Fractions usuelles", generateurs: [fractionsUsuelles("cm2")] },
    // Utiliser la numération
    { id: "numeration", label: "Ajouter un entier à un décimal", generateurs: [ajouterAuDecimal("cm2")] },
    { id: "fois10", label: "× et ÷ par 10, 100, 1 000", generateurs: [fois10("cm2")] },
    // Procédures
    { id: "decimaux", label: "Ajouter deux décimaux", generateurs: [additionDecimaux] },
    { id: "plus9", label: "Ajouter, soustraire 9, 19… 99", generateurs: [plusNeuf("cm2")] },
    { id: "zeros", label: "Multiplier des dizaines, des centaines", generateurs: [dizainesCentaines("cm2")] },
    { id: "distributivite", label: "Décomposer pour multiplier", generateurs: [distributivite] },
    { id: "doublemoitie", label: "Double et moitié d'un décimal", generateurs: [doubleMoitieDecimal] },
    { id: "quatrehuit", label: "Diviser par 4 ou par 8", generateurs: [quatreHuit("cm2")] },
    { id: "cinq", label: "Multiplier par 5 ou par 50", generateurs: [foisCinq("cm2")] },
  ],
};
