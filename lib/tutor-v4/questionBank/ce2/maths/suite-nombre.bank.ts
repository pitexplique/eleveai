// lib/tutor-v4/questionBank/ce2/maths/suite-nombre.bank.ts
//
// Les suites de nombres du CE2, écrites à la main.
//
// ⚠️ HORS ATTENDUS DE FIN DE CE2 — RÉVISION DU CE1.
// Relu sur le texte lui-même le 09/08/2026 (BO n° 41 du 31 octobre 2024,
// applicable à la rentrée 2025) : les suites de nombres sont accrochées aux
// nombres ordinaux, et cet objectif s'arrête au CE1. Gardées — feu vert de
// Frédéric. Une suite qu'on prolonge, c'est du calcul mental déguisé en jeu.
//
// CE QU'ON Y TRAVAILLE : continuer une suite, trouver sa règle, reconnaître si
// elle croît ou décroît. Les nombres restent sous 10 000, les règles sont des
// additions ou des soustractions répétées (de 2 en 2, de 5 en 5, de 10 en 10,
// de 20, 25, 50, 100, 1 000 en …). ⛔ Pas de suite géométrique, sauf le
// doublement (« on double à chaque fois ») et la moitié, aux défis.
//
// LES PIÈGES : deviner la règle sur le PREMIER écart sans la vérifier ensuite
// (2, 4, 6, 10) ; et les suites qui descendent, où l'on cherche ce qu'on
// ajoute au lieu de ce qu'on enlève.
//
// ⛔ RÉÉCRITE LE 10/11/2026 (robustesse du coach, cycle 2) : 5 à 6 squelettes
// par micro, 14 à 19 répétitions sur 20. Chaque micro a désormais un
// générateur par étoile (familles × situations × tournures) ; les items figés
// sont devenus des gabarits de même idée, sous le même id.
// ⭐ LE DESSIN : la frise `suite` (sans ses étiquettes « terme 1 » et SANS la
// règle, qui était la réponse des questions « quelle est la règle ? ») ou la
// droite graduée où Pic saute de nombre en nombre.

// ⚠️ `SuiteCanvasData` n'est PAS réexporté par `types.ts`. On va le chercher à la source.
import type { NumberLineCanvasData, TutorBankItemV4 } from "@/lib/tutor-v4/types";
import type { SuiteCanvasData } from "@/lib/tutor-v4/types_canvas";
import { type Etoile, type Q, choix, exp, fmt, gabarit, pick, quelquun, rint, shuffle, tirer } from "./outils-nombres-ce2";

const NOTION = "suite_nombre";

/** La frise des termes, sans étiquette « terme 1 » ni règle écrite. */
function frise(termes: Array<number | string>): SuiteCanvasData {
  return {
    kind: "suite",
    theme: "nombre",
    terms: termes.map((t) => (typeof t === "number" ? fmt(t) : t)),
    display: { showArrows: false, showRule: false, showLabels: false, showIcons: false },
  };
}

/** Une droite muette où les termes sont posés : on voit les sauts réguliers. */
function droiteDesSauts(termes: number[], inconnu: number, pas: number): NumberLineCanvasData {
  const tous = [...termes, inconnu];
  const min = Math.min(...tous) - pas;
  const max = Math.max(...tous) + pas;
  return {
    kind: "number_line",
    min,
    max,
    step: pas,
    valeursEcrites: [],
    points: [
      ...termes.map((t) => ({ value: t, label: fmt(t), color: "#2563eb" })),
      { value: inconnu, label: "?", color: "#ef4444" },
    ],
    size: { width: 340, height: 110 },
    display: { showTicks: true, showValues: false, showPoints: true, showPointLabels: true },
  };
}

/** Le dessin d'une suite à compléter : la frise, ou la droite quand les labels tiennent. */
function dessin(termes: number[], affiches: Array<number | string>, inconnu: number, pas: number) {
  const tient = Math.max(...termes.map((t) => fmt(t).length)) <= 3 && termes.length <= 5;
  return tient && Math.random() < 0.4 ? droiteDesSauts(termes, inconnu, pas) : frise(affiches);
}

const PAS_SIMPLES = [2, 5, 10, 100] as const;
const PAS_CE2 = [2, 5, 10, 20, 25, 50, 100, 1000] as const;

/** Une suite de `n` termes, de pas `pas`, qui reste entre 0 et 10 000. */
function suite(pas: number, n: number, descend: boolean): number[] {
  const etendue = pas * (n + 3);
  const plafond = Math.min(10000 - etendue, pas >= 100 ? 9000 : pas >= 20 ? 2000 : 500);
  const multiple = Math.random() < 0.6;
  let depart = rint(0, Math.max(1, Math.floor(plafond / pas))) * pas;
  if (!multiple && pas < 100) depart += rint(1, pas - 1 || 1);
  if (descend) depart += etendue;
  return Array.from({ length: n }, (_, i) => depart + (descend ? -1 : 1) * i * pas);
}

/** Les mondes où une suite vit — ceux qui marchent dans les deux sens, ou dans un seul. */
type Monde = { intro: (liste: string) => string; sens: "monte" | "descend" | "les2"; max: number };
const MONDES: readonly Monde[] = [
  { intro: (l) => `Pic le paille-en-queue saute de nombre en nombre : ${l}…`, sens: "les2", max: 10000 },
  { intro: (l) => `Les maisons de la rue des Lilas portent les numéros ${l}…`, sens: "les2", max: 400 },
  { intro: (l) => `Avant le décollage, l'astronaute compte : ${l}…`, sens: "descend", max: 1000 },
  { intro: (l) => `Le kangourou du zoo fait des bonds réguliers : ${l}…`, sens: "les2", max: 10000 },
  { intro: (l) => `La maîtresse a écrit au tableau : ${l}…`, sens: "les2", max: 10000 },
  { intro: (l) => `Chaque semaine, Lou note la taille de son haricot magique, en cm : ${l}…`, sens: "monte", max: 400 },
  { intro: (l) => `Mois après mois, Zoé compte les euros de sa tirelire : ${l}…`, sens: "monte", max: 1000 },
  { intro: (l) => `Les places du cirque sont numérotées ${l}…`, sens: "les2", max: 2000 },
  { intro: (l) => `Au jeu de piste, les balises portent les nombres ${l}…`, sens: "les2", max: 10000 },
  { intro: (l) => `Le petit train passe devant les bornes ${l}…`, sens: "les2", max: 10000 },
  { intro: (l) => `Le dragon recompte ses pièces d'or : ${l}…`, sens: "les2", max: 10000 },
  { intro: (l) => `Jour après jour, le bonhomme de neige fond. Sa taille en cm : ${l}…`, sens: "descend", max: 200 },
  { intro: (l) => `Dans le grand livre de contes, Ravi lit les pages ${l}…`, sens: "monte", max: 900 },
  { intro: (l) => `La boulangère a compté ses croissants : ${l}…`, sens: "les2", max: 2000 },
  { intro: (l) => `Le pirate compte ses pas sur la carte au trésor : ${l}…`, sens: "monte", max: 10000 },
  { intro: (l) => `La grenouille saute sur les nénuphars numérotés ${l}…`, sens: "les2", max: 500 },
  { intro: (l) => `Jour après jour, les bonbons du bocal disparaissent : ${l}…`, sens: "descend", max: 500 },
  { intro: (l) => `Le score du jeu vidéo de Téo passe à ${l}…`, sens: "monte", max: 10000 },
];

function monde(descend: boolean, plusGrand: number): Monde {
  const ok = MONDES.filter((m) => (m.sens === "les2" || m.sens === (descend ? "descend" : "monte")) && plusGrand <= m.max);
  return pick(ok.length ? ok : MONDES.filter((m) => m.max === 10000 && m.sens === "les2"));
}

const liste = (termes: Array<number | string>) => termes.map((t) => (typeof t === "number" ? fmt(t) : t)).join(", ");

/** Une phrase d'introduction : la suite nue, une personne qui la récite, ou un monde. */
function introSuite(termes: Array<number | string>, descend: boolean): string {
  const p = quelquun();
  const l = liste(termes);
  const plusGrand = Math.max(...termes.filter((t): t is number => typeof t === "number"));
  return pick([
    `Voici une suite : ${l}…`,
    `${p.nom} récite une suite : ${l}…`,
    `${p.nom} a écrit sur son ardoise : ${l}…`,
    monde(descend, plusGrand).intro(l),
    monde(descend, plusGrand).intro(l),
    monde(descend, plusGrand).intro(l),
  ]);
}

const sensMot = (descend: boolean) => (descend ? "on enlève" : "on ajoute");

// ============================================================
// ce2_suite_continuer — Continuer une suite
// ============================================================

function suivant(d: Etoile): Q {
  const descend = d >= 3 && Math.random() < 0.45;
  const pas = d <= 2 ? pick(PAS_SIMPLES) : pick(PAS_CE2);
  const n = rint(4, 5);
  const t = suite(pas, n + 1, descend);
  const montres = t.slice(0, n);
  const reponse = t[n];
  const correct = fmt(reponse);
  const text = `${introSuite(montres, descend)} ${pick([
    "Quel nombre vient ensuite ?",
    "Quel est le nombre suivant ?",
    "Continue : quel nombre faut-il écrire après ?",
    "Quel nombre viendra juste après ?",
  ])}`;
  return {
    text,
    format: "qcm",
    choices: choix(correct, [fmt(reponse + (descend ? 2 : -2) * pas), fmt(montres[n - 1] + (descend ? pas : -pas)), fmt(reponse + 1), fmt(reponse + (descend ? -10 : 10)), fmt(reponse + (descend ? -pas : pas))].filter((x) => !x.startsWith("-"))),
    expected: [correct],
    comparator: "mcq_exact",
    canvas: dessin(montres, [...montres, "?"], reponse, pas),
    explanation: exp(
      `Dans une suite régulière, ${sensMot(descend)} toujours le même nombre.`,
      "On calcule l'écart entre deux nombres voisins, on vérifie qu'il est toujours le même, puis on continue.",
      `L'écart est ${fmt(pas)} : ${fmt(montres[n - 1])} ${descend ? "−" : "+"} ${fmt(pas)} = ${correct}.`,
      `Le nombre suivant est ${correct}.`,
    ),
  };
}

function trou(d: Etoile): Q {
  const descend = Math.random() < (d >= 4 ? 0.5 : 0.35);
  const pas = pick(d >= 4 ? PAS_CE2 : PAS_SIMPLES);
  const n = 5;
  const t = suite(pas, n, descend);
  const k = rint(1, n - 2);
  const affiches: Array<number | string> = t.map((x, i) => (i === k ? "?" : x));
  const correct = fmt(t[k]);
  const text = `${introSuite(affiches, descend)} ${pick([
    "Quel nombre a été effacé ?",
    "Quel nombre manque ?",
    "Par quel nombre faut-il remplacer le « ? » ?",
    "Pic a caché un nombre. Lequel ?",
  ])}`.replace("…", ".");
  return {
    text,
    format: "qcm",
    choices: choix(correct, [fmt(t[k] + 1), fmt(t[k] - 1), fmt(t[k] + pas), fmt(t[k] - pas), fmt(t[k] + 10)].filter((x) => !x.startsWith("-"))),
    expected: [correct],
    comparator: "mcq_exact",
    canvas: frise(affiches),
    explanation: exp(
      "Une suite régulière avance toujours du même écart.",
      "On trouve l'écart avec deux nombres voisins connus, puis on remplit le trou.",
      `L'écart est ${fmt(pas)} : ${fmt(t[k - 1])} ${descend ? "−" : "+"} ${fmt(pas)} = ${correct}.`,
      `Le nombre qui manque est ${correct}.`,
    ),
  };
}

function deuxSuivants(): Q {
  const descend = Math.random() < 0.4;
  const pas = pick(PAS_CE2);
  const t = suite(pas, 6, descend);
  const montres = t.slice(0, 4);
  const correct = `${fmt(t[4])} ; ${fmt(t[5])}`;
  const text = `${introSuite(montres, descend)} ${pick([
    "Quels sont les deux nombres suivants ?",
    "Quels nombres faut-il écrire dans les deux cases vides ?",
    "Continue la suite avec deux nombres.",
  ])}`;
  const pieges = [
    `${fmt(t[4])} ; ${fmt(t[4] + (descend ? -1 : 1))}`,
    `${fmt(t[4])} ; ${fmt(t[5] + (descend ? -pas : pas))}`,
    `${fmt(t[4] + (descend ? -10 : 10))} ; ${fmt(t[5] + (descend ? -20 : 20))}`,
    `${fmt(t[3])} ; ${fmt(t[4])}`,
  ].filter((x) => !/-/.test(x));
  return {
    text,
    format: "qcm",
    choices: choix(correct, pieges),
    expected: [correct],
    comparator: "mcq_exact",
    canvas: frise([...montres, "?", "?"]),
    explanation: exp(
      `Dans une suite régulière, ${sensMot(descend)} toujours le même nombre.`,
      "On trouve l'écart, puis on l'applique deux fois.",
      `${fmt(t[3])} ${descend ? "−" : "+"} ${fmt(pas)} = ${fmt(t[4])}, puis ${fmt(t[4])} ${descend ? "−" : "+"} ${fmt(pas)} = ${fmt(t[5])}.`,
      `Les deux nombres suivants sont ${correct}.`,
    ),
  };
}

/** Le piège : la règle devinée sur le premier écart seulement. */
function regleMalVerifiee(): Q {
  const pas = pick([2, 5, 10]);
  const a = rint(1, 9) * pas;
  const t = [a, a + pas, a + 2 * pas, a + 4 * pas];
  const p = quelquun();
  const correct = "non, l'écart n'est pas toujours le même";
  const text = pick([
    `${p.nom} voit la suite ${liste(t)} et dit : « c'est + ${pas}, donc le suivant est ${fmt(t[3] + pas)} ». La suite est-elle vraiment régulière ?`,
    `Est-ce que la suite ${liste(t)} avance toujours de ${pas} en ${pas} ?`,
    `${p.nom} pense que la suite ${liste(t)} avance de ${pas} en ${pas}. A-t-${p.il} raison ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: choix(correct, ["oui, elle avance toujours pareil", `oui, car ${fmt(a + pas)} − ${fmt(a)} = ${pas}`, "on ne peut pas savoir"]),
    expected: [correct],
    comparator: "mcq_exact",
    canvas: frise(t),
    explanation: exp(
      "Une règle se vérifie sur TOUS les écarts, pas sur le premier seulement.",
      "On calcule chaque écart entre deux nombres voisins.",
      `+ ${pas}, + ${pas}, puis + ${2 * pas} : le dernier écart n'est pas le même.`,
      "La suite n'avance pas toujours du même écart.",
    ),
  };
}

function genContinuer(d: Etoile): Q {
  if (d <= 2) return tirer([() => suivant(2), () => suivant(2), () => trou(2)]);
  if (d === 3) return tirer([() => suivant(3), () => trou(3), () => suivant(3)]);
  return tirer([() => trou(4), deuxSuivants, regleMalVerifiee, () => suivant(4)]);
}

// ============================================================
// ce2_suite_regle — Trouver la règle
// ============================================================

function regle(d: Etoile): Q {
  const descend = d >= 3 && Math.random() < 0.5;
  const pas = d <= 2 ? pick([2, 5, 10, 100]) : pick(PAS_CE2);
  const t = suite(pas, 4, descend);
  const correct = `${sensMot(descend)} ${fmt(pas)}`;
  const autres = PAS_CE2.filter((x) => x !== pas);
  const pieges = [
    `${sensMot(!descend)} ${fmt(pas)}`,
    `${sensMot(descend)} ${fmt(pick(autres))}`,
    `${sensMot(descend)} ${fmt(pas === 10 ? 1 : pas * 10 <= 1000 ? pas * 10 : pas / 10)}`,
    "on double à chaque fois",
  ];
  const text = `${introSuite(t, descend)} ${pick([
    "Quelle est la règle de cette suite ?",
    "Comment passe-t-on d'un nombre au suivant ?",
    "Quelle règle suit cette suite ?",
    "Que fait-on pour passer d'un nombre au suivant ?",
  ])}`;
  return {
    text,
    format: "qcm",
    choices: choix(correct, pieges),
    expected: [correct],
    comparator: "mcq_exact",
    canvas: frise(t),
    explanation: exp(
      "La règle d'une suite dit comment on passe d'un nombre au suivant.",
      "On calcule l'écart entre deux voisins et on vérifie qu'il est le même partout.",
      `${liste(t)} : ${descend ? "−" : "+"} ${fmt(pas)} à chaque fois.`,
      `La règle est : ${correct}.`,
    ),
  };
}

function ecart(d: Etoile): Q {
  const descend = Math.random() < 0.5;
  const pas = pick(d >= 4 ? PAS_CE2 : [2, 5, 10, 20, 25, 50, 100]);
  const t = suite(pas, 4, descend);
  const correct = fmt(pas);
  const text = `${introSuite(t, descend)} ${pick([
    `De combien ${descend ? "diminue" : "augmente"}-t-on à chaque étape ?`,
    `Combien ${descend ? "enlève" : "ajoute"}-t-on à chaque fois ?`,
    "Quel est l'écart entre deux nombres qui se suivent ?",
    `De combien en combien ${descend ? "descend" : "monte"} cette suite ?`,
  ])}`;
  return {
    text,
    format: "qcm",
    choices: choix(correct, [fmt(pas * 2), fmt(pas + 1), fmt(pas * 10), fmt(t[0] % 1000 || pas + 5), fmt(pas === 25 ? 20 : pas + 5)]),
    expected: [correct],
    comparator: "mcq_exact",
    canvas: frise(t),
    explanation: exp(
      "L'écart, c'est la différence entre deux nombres qui se suivent.",
      "On soustrait le plus petit du plus grand, et on vérifie sur une autre paire.",
      `${fmt(Math.max(t[0], t[1]))} − ${fmt(Math.min(t[0], t[1]))} = ${correct}.`,
      `La suite ${descend ? "diminue" : "augmente"} de ${correct} à chaque étape.`,
    ),
  };
}

function suiteQuiSuitLaRegle(): Q {
  const descend = Math.random() < 0.4;
  const pas = pick([5, 10, 20, 25, 50, 100]);
  const t = suite(pas, 4, descend);
  const s = descend ? -1 : 1;
  const mauvaise1 = [t[0], t[0] + s * pas, t[0] + s * 2 * pas, t[0] + s * 4 * pas];
  const mauvaise2 = [t[0], t[0] + s * (pas + 1), t[0] + s * 2 * (pas + 1), t[0] + s * 3 * (pas + 1)];
  const mauvaise3 = [t[0], t[0] - s * pas, t[0] - s * 2 * pas, t[0] - s * 3 * pas];
  const correct = liste(t);
  const p = quelquun();
  const text = pick([
    `Quelle suite suit la règle « ${sensMot(descend)} ${fmt(pas)} » ?`,
    `${p.nom} doit écrire une suite où ${sensMot(descend)} ${fmt(pas)} à chaque fois. Quelle suite est juste ?`,
    `La règle du jeu de Pic : « ${sensMot(descend)} ${fmt(pas)} ». Quelle suite la respecte ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: choix(correct, [mauvaise1, mauvaise2, mauvaise3].filter((m) => m.every((x) => x >= 0)).map(liste)),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      "Une suite suit sa règle à CHAQUE étape.",
      "On vérifie chaque écart, du premier au dernier.",
      `${correct} : ${descend ? "−" : "+"} ${fmt(pas)} à chaque fois.`,
      `C'est la suite ${correct}.`,
    ),
  };
}

function doubleOuAjoute(): Q {
  const a = rint(2, 9);
  const double = Math.random() < 0.5;
  const t = double ? [a, a * 2, a * 4, a * 8] : [a, a + a, a + 2 * a, a + 3 * a];
  const correct = double ? "on double à chaque fois" : `on ajoute ${a}`;
  const text = `${introSuite(t, false)} ${pick(["Quelle est la règle ?", "Comment passe-t-on d'un nombre au suivant ?", "Quelle règle suit cette suite ?"])}`;
  return {
    text,
    format: "qcm",
    choices: choix(correct, double ? [`on ajoute ${a}`, `on ajoute ${a * 2}`, "on ajoute toujours le même nombre"] : ["on double à chaque fois", `on ajoute ${a * 2}`, `on ajoute ${a + 1}`]),
    expected: [correct],
    comparator: "mcq_exact",
    canvas: frise(t),
    explanation: exp(
      "Si les écarts ne sont pas égaux, la règle n'est pas une addition.",
      "On calcule les écarts ; s'ils grandissent, on essaie de doubler.",
      double ? `${a} × 2 = ${a * 2}, ${a * 2} × 2 = ${a * 4}, ${a * 4} × 2 = ${a * 8}.` : `+ ${a}, + ${a}, + ${a} : l'écart est toujours ${a}.`,
      `La règle est : ${correct}.`,
    ),
  };
}

function genRegle(d: Etoile): Q {
  if (d <= 2) return tirer([() => regle(2), () => ecart(2)]);
  if (d === 3) return tirer([() => regle(3), () => ecart(3), suiteQuiSuitLaRegle]);
  return tirer([doubleOuAjoute, suiteQuiSuitLaRegle, () => regle(4), () => ecart(4)]);
}

// ============================================================
// ce2_suite_croissante_decroissante
// ============================================================

function croissanteOuNon(d: Etoile): Q {
  const descend = Math.random() < 0.5;
  const pas = d <= 1 ? pick([2, 5, 10]) : pick(PAS_CE2);
  const t = suite(pas, 4, descend);
  const correct = descend ? "décroissante" : "croissante";
  const text = `${introSuite(t, descend)} ${pick([
    "Cette suite est-elle croissante ou décroissante ?",
    "Les nombres montent-ils ou descendent-ils ? La suite est…",
    "Est-ce une suite croissante ou décroissante ?",
  ])}`;
  return {
    text,
    format: "qcm",
    choices: shuffle(["croissante", "décroissante", "ni l'une ni l'autre"]),
    expected: [correct],
    comparator: "mcq_exact",
    canvas: frise(t),
    explanation: exp(
      "Une suite croissante monte : chaque nombre est plus grand que le précédent. Une suite décroissante descend.",
      "On compare chaque nombre au précédent.",
      `${liste(t)} : ${descend ? "chaque nombre est plus petit" : "chaque nombre est plus grand"} que celui d'avant.`,
      `La suite est ${correct}.`,
    ),
  };
}

function laquelleCroissante(): Q {
  const veut = Math.random() < 0.5 ? "croissante" : "décroissante";
  const pas = pick([2, 5, 10, 100]);
  const bonne = suite(pas, 4, veut === "décroissante");
  const inverse = [...bonne].reverse();
  const melee = [bonne[1], bonne[0], bonne[2], bonne[3]];
  const melee2 = [bonne[0], bonne[2], bonne[1], bonne[3]];
  const correct = liste(bonne);
  const p = quelquun();
  const text = pick([
    `Quelle suite est ${veut} ?`,
    `${p.nom} cherche la suite ${veut}. Laquelle choisir ?`,
    `Parmi ces suites, laquelle est ${veut} ?`,
    `Pic ne garde que la suite ${veut}. Laquelle garde-t-il ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: choix(correct, [liste(inverse), liste(melee), liste(melee2)]),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      "Croissante : les nombres montent du début à la fin. Décroissante : ils descendent du début à la fin.",
      "Pour chaque suite, on compare chaque nombre au précédent.",
      `${correct} ${veut === "croissante" ? "monte" : "descend"} à chaque étape.`,
      `La suite ${veut} est ${correct}.`,
    ),
  };
}

function operationDuSens(): Q {
  const descend = Math.random() < 0.5;
  const p = quelquun();
  const correct = descend ? "une soustraction, à chaque étape" : "une addition, à chaque étape";
  const text = pick([
    `Pour continuer une suite ${descend ? "décroissante" : "croissante"} régulière, quelle opération fait-on ?`,
    `${p.nom} continue une suite qui ${descend ? "descend" : "monte"} toujours du même écart. Que fait-${p.il} à chaque étape ?`,
    `Une suite régulière ${descend ? "décroissante" : "croissante"} avance en faisant quelle opération ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: choix(correct, [descend ? "une addition, à chaque étape" : "une soustraction, à chaque étape", "une multiplication par 10", "aucune, les nombres ne changent pas"]),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      "Une suite régulière croissante ajoute toujours le même nombre ; une décroissante enlève toujours le même nombre.",
      "On regarde si les nombres montent ou descendent.",
      descend ? "Les nombres descendent : on enlève." : "Les nombres montent : on ajoute.",
      `C'est ${correct}.`,
    ),
  };
}

function monteEtDescend(): Q {
  const pas = pick([5, 10, 20, 50, 100]);
  const a = rint(1, 30) * pas;
  const reguliere = Math.random() < 0.4;
  const t = reguliere ? [a, a + pas, a + 2 * pas, a + 3 * pas] : [a, a + pas, a + pas - Math.round(pas / 2), a + 2 * pas];
  const correct = reguliere ? "oui, elle monte à chaque étape" : "non, elle descend à un moment";
  const text = `${introSuite(t, false)} ${pick(["Cette suite est-elle croissante ?", "Est-ce que cette suite monte à chaque étape ?", "Peut-on dire que cette suite est croissante ?"])}`;
  return {
    text,
    format: "qcm",
    choices: choix(correct, [
      reguliere ? "non, elle descend à un moment" : "oui, elle monte à chaque étape",
      "oui, car elle finit plus haut qu'elle ne commence",
      "on ne peut pas savoir",
    ]),
    expected: [correct],
    comparator: "mcq_exact",
    canvas: frise(t),
    explanation: exp(
      "Une suite est croissante si CHAQUE nombre est plus grand que celui d'avant.",
      "On compare chaque nombre au précédent, du premier au dernier.",
      reguliere ? `+ ${pas} à chaque étape.` : `De ${fmt(t[1])} à ${fmt(t[2])}, la suite descend.`,
      reguliere ? "Elle est croissante." : "Une seule descente suffit : elle n'est pas croissante.",
    ),
  };
}

function nombreQuiGardeLOrdre(): Q {
  const pas = pick([10, 20, 25, 50, 100]);
  const t = suite(pas, 5, false);
  const k = 2;
  const avant = t[k - 1];
  const apres = t[k + 1];
  const correct = fmt(rint(avant + 1, apres - 1));
  const p = quelquun();
  const affiches = t.map((x, i) => (i === k ? "?" : x));
  const text = pick([
    `On veut garder la suite croissante : ${liste(affiches)}. Quel nombre peut remplacer le « ? » ?`,
    `${p.nom} a effacé un nombre de sa suite croissante : ${liste(affiches)}. Quel nombre peut-il y avoir ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: choix(correct, [fmt(avant - pas), fmt(apres + pas), fmt(Math.max(0, avant - 1)), fmt(apres + 1)]),
    expected: [correct],
    comparator: "mcq_exact",
    canvas: frise(affiches),
    explanation: exp(
      "Dans une suite croissante, chaque nombre est plus grand que celui d'avant et plus petit que celui d'après.",
      `Le nombre caché doit être entre ${fmt(avant)} et ${fmt(apres)}.`,
      `${fmt(avant)} < ${correct} < ${fmt(apres)}.`,
      `${correct} convient.`,
    ),
  };
}

function genCroissante(d: Etoile): Q {
  if (d <= 1) return tirer([() => croissanteOuNon(1), laquelleCroissante]);
  if (d <= 3) return tirer([() => croissanteOuNon(2), laquelleCroissante, operationDuSens]);
  return tirer([monteEtDescend, nombreQuiGardeLOrdre, laquelleCroissante]);
}

// ============================================================
// ce2_suite_defi — Les défis
// ============================================================

function doublement(): Q {
  const a = rint(2, 12);
  const moitie = Math.random() < 0.35;
  const t = moitie ? [a * 16, a * 8, a * 4, a * 2] : [a, a * 2, a * 4, a * 8];
  const rep = moitie ? a : a * 16;
  const correct = fmt(rep);
  const text = `${introSuite(t, moitie)} ${pick(["Quel nombre vient ensuite ?", "Les écarts changent ! Quel est le nombre suivant ?", "Quel nombre faut-il écrire après ?"])}`;
  const dernier = t[3];
  const ecartFin = Math.abs(t[3] - t[2]);
  return {
    text,
    format: "qcm",
    choices: choix(correct, [fmt(moitie ? dernier - ecartFin : dernier + ecartFin), fmt(moitie ? Math.max(1, rep - 1) : rep + 1), fmt(moitie ? dernier - 2 : dernier * 3), fmt(moitie ? rep * 3 : rep + a)]),
    expected: [correct],
    comparator: "mcq_exact",
    canvas: frise([...t, "?"]),
    explanation: exp(
      "Quand les écarts ne sont pas égaux, la règle n'est pas une addition.",
      moitie ? "On essaie de prendre la moitié à chaque fois." : "On essaie de doubler à chaque fois.",
      moitie ? `${fmt(dernier)} ÷ 2 = ${correct}.` : `${fmt(dernier)} × 2 = ${correct}.`,
      `Le nombre suivant est ${correct}.`,
    ),
  };
}

function plusLoin(): Q {
  const pas = pick([2, 5, 10, 20, 25, 50, 100]);
  const t = suite(pas, 3, false);
  const k = rint(3, 6);
  const rep = t[2] + k * pas;
  const correct = fmt(rep);
  const text = `${introSuite(t, false)} ${pick([
    `Quel nombre viendra ${k} étapes après ${fmt(t[2])} ?`,
    `Si on continue, quel sera le nombre ${k} cases plus loin que ${fmt(t[2])} ?`,
    `On fait encore ${k} sauts. Sur quel nombre arrive-t-on ?`,
  ])}`;
  return {
    text,
    format: "qcm",
    choices: choix(correct, [fmt(rep - pas), fmt(rep + pas), fmt(t[2] + k), fmt(t[2] + k * 10 === rep ? rep + 2 * pas : t[2] + k * 10)]),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      "Avancer d'une étape, c'est ajouter l'écart de la suite.",
      `L'écart est ${fmt(pas)} ; on l'ajoute ${k} fois.`,
      `${fmt(t[2])} + ${k} × ${fmt(pas)} = ${correct}.`,
      `On arrive à ${correct}.`,
    ),
  };
}

type Croissance = { quoi: string; verbe: string; unite: string; parQuand: string; quand: string };
const CROISSANCES: readonly Croissance[] = [
  { quoi: "Le tournesol de Nina", verbe: "grandit de", unite: "cm", parQuand: "par semaine", quand: "semaines" },
  { quoi: "Le haricot magique", verbe: "grandit de", unite: "cm", parQuand: "par jour", quand: "jours" },
  { quoi: "Dans sa tirelire, Téo", verbe: "met", unite: "€", parQuand: "par mois", quand: "mois" },
  { quoi: "Zoé", verbe: "gagne", unite: "points", parQuand: "par partie", quand: "parties" },
  { quoi: "La bibliothèque", verbe: "reçoit", unite: "livres", parQuand: "par jour", quand: "jours" },
  { quoi: "Le chiot de la vétérinaire", verbe: "prend", unite: "g", parQuand: "par semaine", quand: "semaines" },
  { quoi: "Ravi", verbe: "ajoute à sa collection", unite: "cartes", parQuand: "par semaine", quand: "semaines" },
  { quoi: "Le bonhomme de neige", verbe: "perd", unite: "cm", parQuand: "par jour", quand: "jours" },
];

function croissance(): Q {
  const c = pick(CROISSANCES);
  const fond = c.quoi === "Le bonhomme de neige";
  const pas = fond ? pick([2, 5, 10]) : pick([5, 10, 20, 25, 50]);
  const k = rint(3, 6);
  const depart = fond ? rint(k + 2, 15) * pas : rint(1, 20) * 10;
  const rep = fond ? depart - k * pas : depart + k * pas;
  const correct = `${fmt(rep)} ${c.unite}`;
  const text = pick([
    `${c.quoi} ${c.verbe} ${pas} ${c.unite} ${c.parQuand}. Aujourd'hui, on en est à ${fmt(depart)} ${c.unite}. Combien dans ${k} ${c.quand} ?`,
    `Aujourd'hui : ${fmt(depart)} ${c.unite}. ${c.quoi} ${c.verbe} ${pas} ${c.unite} ${c.parQuand}. Où en sera-t-on dans ${k} ${c.quand} ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: choix(correct, [rep + (fond ? pas : -pas), fond ? depart - pas : depart + pas, fond ? depart - k : depart + k, depart * k].filter((x) => x > 0).map((x) => `${fmt(x)} ${c.unite}`)),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      `Chaque fois, on ${fond ? "enlève" : "ajoute"} ${pas} ${c.unite} : c'est une suite régulière.`,
      `On ${fond ? "enlève" : "ajoute"} ${pas} autant de fois qu'il y a de ${c.quand}.`,
      `${fmt(depart)} ${fond ? "−" : "+"} ${k} × ${pas} = ${fmt(rep)}.`,
      `Dans ${k} ${c.quand} : ${correct}.`,
    ),
  };
}

function premierTerme(): Q {
  const pas = pick([5, 10, 25, 50, 100]);
  const t = suite(pas, 5, false);
  const affiches: Array<number | string> = ["?", ...t.slice(1)];
  const correct = fmt(t[0]);
  const p = quelquun();
  const text = pick([
    `${p.nom} a effacé le PREMIER nombre de sa suite : ${liste(affiches)}. Quel était-il ?`,
    `Le premier nombre de la suite a disparu : ${liste(affiches)}. Lequel était-ce ?`,
    `Pic a caché le début de la suite : ${liste(affiches)}. Quel nombre a-t-il caché ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: choix(correct, [fmt(t[1] + pas), fmt(t[0] + 1), fmt(t[0] - pas), fmt(t[1] - 1)].filter((x) => !x.startsWith("-"))),
    expected: [correct],
    comparator: "mcq_exact",
    canvas: frise(affiches),
    explanation: exp(
      "Pour remonter une suite croissante, on fait le chemin à l'envers : on enlève l'écart.",
      "On trouve l'écart avec deux nombres connus, puis on l'enlève au deuxième nombre.",
      `L'écart est ${fmt(pas)} : ${fmt(t[1])} − ${fmt(pas)} = ${correct}.`,
      `Le premier nombre était ${correct}.`,
    ),
  };
}

function genDefiSuite(): Q {
  return tirer([doublement, plusLoin, croissance, premierTerme]);
}

// ============================================================
// LA BANQUE — mêmes ids, mêmes micros, mêmes étoiles qu'avant.
// ============================================================

const item = (id: string, microId: string, difficulty: Etoile, hint: string, gen: (d: Etoile) => Q, tags: string[]): TutorBankItemV4 =>
  gabarit({ id, notionId: NOTION, microId, difficulty, hint, tags }, () => gen(difficulty));

export const suiteNombreBank: TutorBankItemV4[] = [
  item("ce2_suite_continuer_fixed_1", "ce2_suite_continuer", 2, "Calcule l'écart entre deux nombres voisins.", genContinuer, ["continuer"]),
  item("ce2_suite_continuer_fixed_2", "ce2_suite_continuer", 4, "Vérifie l'écart sur TOUS les nombres, pas seulement les premiers.", genContinuer, ["continuer", "piege"]),
  item("ce2_suite_continuer_fixed_3", "ce2_suite_continuer", 3, "Les nombres montent ou descendent ? Cherche ce qu'on ajoute, ou ce qu'on enlève.", genContinuer, ["continuer"]),
  item("ce2_suite_continuer_tpl_1", "ce2_suite_continuer", 3, "Calcule l'écart entre deux nombres voisins, puis continue.", genContinuer, ["continuer"]),
  item("ce2_suite_continuer_tpl_2", "ce2_suite_continuer", 4, "Trouve l'écart avec deux nombres voisins connus.", genContinuer, ["continuer"]),

  item("ce2_suite_regle_fixed_1", "ce2_suite_regle", 2, "Regarde ce qui change d'un nombre au suivant.", genRegle, ["regle"]),
  item("ce2_suite_regle_fixed_2", "ce2_suite_regle", 4, "Si les écarts grandissent, essaie de doubler.", genRegle, ["regle"]),
  item("ce2_suite_regle_fixed_3", "ce2_suite_regle", 3, "Soustrais deux nombres voisins.", genRegle, ["regle"]),
  item("ce2_suite_regle_tpl_1", "ce2_suite_regle", 3, "Les nombres montent ou descendent ?", genRegle, ["regle"]),
  item("ce2_suite_regle_tpl_2", "ce2_suite_regle", 3, "Soustrais deux nombres voisins, puis vérifie sur une autre paire.", genRegle, ["regle"]),

  item("ce2_suite_croissante_decroissante_fixed_1", "ce2_suite_croissante_decroissante", 1, "Les nombres montent-ils ou descendent-ils ?", genCroissante, ["croissante"]),
  item("ce2_suite_croissante_decroissante_fixed_2", "ce2_suite_croissante_decroissante", 4, "Compare CHAQUE nombre à celui d'avant.", genCroissante, ["croissante", "piege"]),
  item("ce2_suite_croissante_decroissante_fixed_3", "ce2_suite_croissante_decroissante", 2, "Monter, c'est ajouter ; descendre, c'est enlever.", genCroissante, ["croissante"]),
  item("ce2_suite_croissante_decroissante_tpl_1", "ce2_suite_croissante_decroissante", 2, "Compare chaque nombre au précédent.", genCroissante, ["croissante"]),
  item("ce2_suite_croissante_decroissante_tpl_2", "ce2_suite_croissante_decroissante", 4, "Une seule descente suffit pour qu'une suite ne soit pas croissante.", genCroissante, ["croissante"]),

  item("ce2_suite_defi_fixed_1", "ce2_suite_defi", 5, "Les écarts grandissent : essaie de doubler.", () => genDefiSuite(), ["defi"]),
  item("ce2_suite_defi_fixed_2", "ce2_suite_defi", 5, "Ajoute l'écart autant de fois qu'il le faut.", () => genDefiSuite(), ["defi"]),
  item("ce2_suite_defi_tpl_1", "ce2_suite_defi", 5, "Trouve l'écart, puis compte les étapes.", () => genDefiSuite(), ["defi"]),
  item("ce2_suite_defi_tpl_2", "ce2_suite_defi", 5, "Une suite régulière ajoute toujours la même chose.", () => genDefiSuite(), ["defi"]),
];

