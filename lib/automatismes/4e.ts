// lib/automatismes/4e.ts
//
// Automatismes de 4e — 24/09/2026.
//
// Pas d'épreuve en 4e, mais la première partie du brevet porte sur « l'ensemble
// du programme de cycle 4 » : la 4e s'y prépare avec le même format que la 3e
// (10 questions, 20 min, sans calculatrice, une question à rédiger).
//
// ⚠️ LE PROGRAMME DE 4e EST LARGE : le coach de 4e (knowledge/maths/4e) porte
// déjà Pythagore et sa réciproque, Thalès, le cosinus, les identités
// remarquables, la factorisation, les probabilités. Presque tous les
// générateurs de 3e y sont donc à leur place : ils sont REPRIS de 3e.ts.
// Ce fichier ajoute ce que la 4e travaille en propre : la division euclidienne,
// la décomposition en facteurs premiers, les ordres de grandeur et les
// préfixes, les ratios, l'agrandissement-réduction.

import type { AutoNiveau, AutoQuestion } from "./types";
import {
  aires,
  anglesVocabulaire,
  carres,
  conversions,
  convertirDurees,
  coordonnees,
  cosinusLongueur,
  divisibilite,
  droiteGraduee,
  ecritures,
  equationQuelCalcul,
  equationResoudre,
  equationsSimples,
  evolutionPct,
  expressionsDeN,
  fractionDe,
  frequence,
  lireInstant,
  lireValeur,
  lireVariation,
  mediane,
  moyenne,
  notationScientifique,
  pctComplement,
  pctEffectif,
  pctProportion,
  perimetres,
  polygone,
  priorites,
  probabilites,
  programmeCalcul,
  proportionnalite,
  pythagore,
  redigerMediane,
  redigerPourcentages,
  redigerPremier,
  redigerPythagore,
  simplifierDevelopper,
  solides,
  sommeAngles,
  symetries,
  thalesEgalite,
  thalesLongueur,
  trigoQuelCalcul,
  valeurExpression,
  vitesseDistance,
  vitesseDuree,
  volumes,
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

/* ═══════════════ DIVISION EUCLIDIENNE, FACTEURS PREMIERS ═══════════════ */

function divisionEuclidienne(): AutoQuestion {
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

function decomposition(): AutoQuestion {
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

/* ═══════════════ ORDRES DE GRANDEUR ET PRÉFIXES ═══════════════ */

function prefixes(): AutoQuestion {
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

/* ═══════════════ RATIOS, AGRANDISSEMENT, RÉDUCTION ═══════════════ */

function ratios(): AutoQuestion {
  const [a, b] = pick([[2, 3], [1, 4], [3, 5], [2, 5], [1, 2], [3, 4], [4, 5]] as const);
  // k ≥ 4 : « une classe de 10 élèves » sortait à l'aperçu (24/09).
  const k = entre(4, 12);
  const total = (a + b) * k;
  const ctx = pick([
    { t: `On partage ${total} € entre Léa et Sami dans le ratio ${a} : ${b}.`, qui: "Léa", quiB: "Sami", u: "€" },
    { t: `Une peinture mélange du bleu et du jaune dans le ratio ${a} : ${b}, pour ${total} L en tout.`, qui: "le bleu", quiB: "le jaune", u: "L" },
    { t: `Une classe de ${total} élèves compte des externes et des demi-pensionnaires dans le ratio ${a} : ${b}.`, qui: "les externes", quiB: "les demi-pensionnaires", u: "" },
  ]);
  const premier = Math.random() < 0.5;
  const rep = (premier ? a : b) * k;
  return {
    text: `${ctx.t} Quelle part revient à ${premier ? ctx.qui : ctx.quiB}${ctx.u ? `, en ${ctx.u}` : ""} ?`,
    format: "short",
    expected: accepte(rep),
    explanation: `Un ratio ${a} : ${b}, c'est ${a + b} parts égales en tout.\nUne part vaut $${total} \\div ${a + b} = ${k}$ ; ${premier ? ctx.qui : ctx.quiB} en reçoit ${premier ? a : b}, soit ${rep}.`,
  };
}

function echelles(): AutoQuestion {
  const cas = entre(1, 3);
  if (cas === 1) {
    const e = pick([100, 1000, 10000, 25000, 50000] as const).valueOf();
    const cm = entre(2, 9);
    const reelCm = cm * e;
    const km = reelCm / 100000;
    const enKm = km >= 1;
    return {
      text: `Sur une carte à l'échelle 1/${e.toLocaleString("fr-FR").replace(/ | /g, " ")}, deux points sont à ${cm} cm. Quelle est la distance réelle, en ${enKm ? "km" : "m"} ?`,
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
  examen: "Pas d'épreuve en 4e, mais le brevet porte sur tout le cycle 4 : même format qu'en 3e, 20 minutes, sans calculatrice",
  nbQuestions: 10,
  toujours: ["rediger"],
  themes: [
    { id: "fractions", label: "Fractions et écritures", generateurs: [fractionDe, ecritures, droiteGraduee] },
    { id: "calcul", label: "Calcul mental et relatifs", generateurs: [priorites, carres, notationScientifique] },
    { id: "entiers", label: "Diviseurs, division, premiers", generateurs: [divisibilite, divisionEuclidienne, decomposition, expressionsDeN] },
    { id: "litteral", label: "Calcul littéral", generateurs: [simplifierDevelopper, valeurExpression] },
    { id: "equations", label: "Équations", generateurs: [equationQuelCalcul, equationResoudre, equationsSimples] },
    { id: "pourcentages", label: "Pourcentages", generateurs: [pctEffectif, pctComplement, pctProportion, evolutionPct] },
    { id: "proportionnalite", label: "Proportionnalité, ratios, échelles", generateurs: [proportionnalite, ratios, echelles] },
    { id: "graphique", label: "Lire un graphique", generateurs: [lireValeur, lireVariation, lireInstant] },
    { id: "durees", label: "Durées et vitesses", generateurs: [convertirDurees, vitesseDuree, vitesseDistance] },
    { id: "unites", label: "Unités et préfixes", generateurs: [conversions, prefixes] },
    { id: "repere", label: "Repère et transformations", generateurs: [coordonnees, symetries] },
    { id: "angles", label: "Angles", generateurs: [sommeAngles, anglesVocabulaire] },
    { id: "mesures", label: "Périmètres et aires", generateurs: [perimetres, aires] },
    { id: "solides", label: "Solides et volumes", generateurs: [solides, volumes] },
    { id: "pythagore", label: "Pythagore et cosinus", generateurs: [pythagore, trigoQuelCalcul, cosinusLongueur] },
    { id: "thales", label: "Thalès", generateurs: [thalesEgalite, thalesLongueur] },
    { id: "stats", label: "Moyenne, médiane, fréquence", generateurs: [moyenne, mediane, frequence] },
    { id: "probas", label: "Probabilités", generateurs: [probabilites] },
    { id: "scratch", label: "Scratch", generateurs: [programmeCalcul, polygone] },
    { id: "rediger", label: "Rédiger une réponse", generateurs: [redigerPythagore, redigerPremier, redigerPourcentages, redigerMediane] },
  ],
};
