// lib/tutor-v4/questionBank/ce1/maths/outils-nombres-ce1.ts
//
// Les outils communs aux trois banques « nombres » du CE1 : nombres entiers,
// suites de nombres, monnaie (10/11/2026).
//
// ⛔ LES SQUELETTES. Le coach sert l'étoile EXACTE de l'élève : chaque gabarit
// tire donc une FAMILLE (prendre la question par un autre bout), une SITUATION
// (un monde d'enfant) et une TOURNURE. Mesure :
//   npx --yes tsx@4 scripts/mesurer-squelettes-coach.ts ce1 nombre_entier suite_nombre monnaie
//
// ⭐ L'ÂGE : 7 ans. Phrases courtes (≤ 20 mots), nombres jusqu'à 1 000, la
// troupe du site (Nina, Téo, Zoé, Ravi, Pic le paille-en-queue) et des prénoms
// variés. La Réunion : un contexte sur vingt-cinq environ, pas plus.
//
// ⭐ LES DESSINS. `base_dix` (plaques, barres, cubes), `number_line` (sans
// jamais écrire la valeur cherchée), `suite`, `monnaie` (euros entiers au CE1,
// sauf les deux micros qui portent sur les centimes), `objets` (une file).

import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import type {
  BaseDixCanvasData,
  CanvasFigure,
  MonnaieCanvasData,
  MonnaieElement,
  MonnaieValeur,
  NumberLineCanvasData,
  ObjetId,
  ObjetsCanvasData,
  SuiteCanvasData,
} from "@/lib/tutor-v4/types_canvas";

export type Q = TutorGeneratedQuestionV4;
export type Famille = () => Q;

export function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export function shuffle<T>(items: readonly T[]): T[] {
  const t = [...items];
  for (let i = t.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [t[i], t[j]] = [t[j], t[i]];
  }
  return t;
}

/** La bonne réponse et trois leurres DIFFÉRENTS d'elle et entre eux, au hasard. */
/** ⛔ 14/11/2026 — la VALEUR d'un choix : « 2,1 € » et « 2,10 € », « 280 € » et
 *  « 280,00 € », « 5/10 » et « 4/8 » sont le même choix. Sans ce tri, un piège
 *  pouvait valoir la bonne réponse (deux réponses justes) ou doubler un autre piège. */
export function valeurDuChoix(s: string): string {
  const t = s.trim().replace(/\s+/g, " ");
  const f = /^(\d+)\/(\d+)\s*(.*)$/.exec(t);
  if (f && Number(f[2]) !== 0 && !/\d/.test(f[3])) return `${(Number(f[1]) / Number(f[2])).toFixed(6)}|${f[3]}`;
  const d = /^(\d+(?:[.,]\d+)?)\s*(.*)$/.exec(t);
  if (d && !/\d/.test(d[2])) return `${Number(d[1].replace(",", ".")).toFixed(6)}|${d[2]}`;
  return t;
}
/** Les pièges distincts par leur valeur, et différents de la bonne réponse. */
export function piegesDistincts(correct: string, pieges: readonly string[]): string[] {
  const vus = new Set([valeurDuChoix(correct)]);
  const out: string[] = [];
  for (const p of pieges) {
    if (!p || !p.trim()) continue;
    const v = valeurDuChoix(p);
    if (vus.has(v)) continue;
    vus.add(v);
    out.push(p);
  }
  return out;
}

export function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(piegesDistincts(correct, wrongs)).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

export function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

/** Une réponse courte (un nombre). */
export function court(text: string, reponse: number, explanation: string, canvas?: CanvasFigure): Q {
  return {
    text,
    format: "short",
    expected: [String(reponse)],
    comparator: "number_equal",
    explanation,
    ...(canvas ? { canvas } : {}),
  };
}

/** Un QCM : la bonne réponse une seule fois, des leurres plausibles, au hasard. */
export function qcm(text: string, bonne: string, leurres: readonly string[], explanation: string, canvas?: CanvasFigure): Q {
  return {
    text,
    format: "qcm",
    choices: makeChoices(bonne, leurres),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation,
    ...(canvas ? { canvas } : {}),
  };
}

/** Tire une famille de questions, puis la question elle-même. */
export const tirer = (familles: readonly Famille[]): Q => randomChoice(familles)();

/** Comme `tirer`, mais une fois sur trois (`part`) on retire jusqu'à tomber sur
 *  une famille DESSINÉE : les dessins pèsent plus, les familles en mots restent. */
export function tirerDessin(familles: readonly Famille[], part = 0.3): Q {
  const veutDessin = Math.random() < part;
  let q = tirer(familles);
  for (let k = 0; k < 12 && veutDessin && !q.canvas; k++) q = tirer(familles);
  return q;
}

/** « 1 barre », « 3 barres ». */
export const pl = (n: number, sg: string, plu: string) => (n === 1 ? sg : plu);

/** « de billes », « d'images ». */
export const de = (mot: string) => (/^[aeiouàâéèêëîïôœh]/i.test(mot) ? `d'${mot}` : `de ${mot}`);

/** « que Téo », « qu'Inès ». */
export const que = (mot: string) => (/^[aeiouàâéèêëîïôœh]/i.test(mot) ? `qu'${mot}` : `que ${mot}`);

export const maj = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Deux nombres différents dans [min, max]. */
export function deuxDifferents(min: number, max: number): [number, number] {
  const a = randomInt(min, max);
  let b = randomInt(min, max - 1);
  if (b >= a) b += 1;
  return [a, b];
}

/** Trois chiffres tous différents, de 1 à 9. */
export function troisChiffres(): [number, number, number] {
  const t = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 3);
  return [t[0], t[1], t[2]];
}

/* =========================================================
   LES PERSONNAGES
========================================================= */

export type Personne = { nom: string; il: "il" | "elle"; e: "" | "e" };
const P = (nom: string, il: "il" | "elle"): Personne => ({ nom, il, e: il === "elle" ? "e" : "" });

/** La troupe du site. Pic, le paille-en-queue, est à part : c'est un oiseau. */
export const TROUPE: readonly Personne[] = [P("Nina", "elle"), P("Téo", "il"), P("Zoé", "elle"), P("Ravi", "il")];

export const ENFANTS: readonly Personne[] = [
  ...TROUPE,
  P("Lou", "elle"),
  P("Malo", "il"),
  P("Inès", "elle"),
  P("Sacha", "il"),
  P("Jade", "elle"),
  P("Amir", "il"),
  P("Naïa", "elle"),
  P("Tom", "il"),
  P("Lina", "elle"),
  P("Yanis", "il"),
  P("Mia", "elle"),
  P("Léo", "il"),
  P("Emma", "elle"),
  P("Noé", "il"),
];

export const quelquun = () => randomChoice(ENFANTS);

export function deuxEnfants(): [Personne, Personne] {
  const [i, j] = deuxDifferents(0, ENFANTS.length - 1);
  return [ENFANTS[i], ENFANTS[j]];
}

export function plusieursEnfants(n: number): Personne[] {
  return shuffle(ENFANTS).slice(0, n);
}

/* =========================================================
   LES NOMBRES EN LETTRES (orthographe traditionnelle)
========================================================= */

const UNITES = ["zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf"];
const DIX_A_SEIZE = ["dix", "onze", "douze", "treize", "quatorze", "quinze", "seize"];
const DIZAINES = ["", "dix", "vingt", "trente", "quarante", "cinquante", "soixante"];

function moinsDeCent(n: number): string {
  if (n < 10) return UNITES[n];
  if (n < 17) return DIX_A_SEIZE[n - 10];
  if (n < 20) return `dix-${UNITES[n - 10]}`;
  const d = Math.floor(n / 10);
  const u = n % 10;
  if (d <= 6) {
    if (u === 0) return DIZAINES[d];
    if (u === 1) return `${DIZAINES[d]} et un`;
    return `${DIZAINES[d]}-${UNITES[u]}`;
  }
  if (d === 7) {
    if (u === 1) return "soixante et onze";
    return `soixante-${moinsDeCent(10 + u)}`;
  }
  if (d === 8) return u === 0 ? "quatre-vingts" : `quatre-vingt-${UNITES[u]}`;
  return `quatre-vingt-${moinsDeCent(10 + u)}`;
}

/** 0 à 1 000, en toutes lettres : « trois cent quarante-deux », « deux cents ». */
export function enLettres(n: number): string {
  if (n === 1000) return "mille";
  if (n < 100) return moinsDeCent(n);
  const c = Math.floor(n / 100);
  const reste = n % 100;
  const tete = c === 1 ? "cent" : `${UNITES[c]} cent${reste === 0 ? "s" : ""}`;
  return reste === 0 ? tete : `${tete} ${moinsDeCent(reste)}`;
}

/** Le rang en lettres : « premier » (seul), « vingt et unième », « centième ». */
export function ordinal(n: number, feminin = false): string {
  if (n === 1) return feminin ? "première" : "premier";
  let mot = enLettres(n);
  if (mot.endsWith("quatre-vingts")) mot = mot.slice(0, -1);
  if (mot.endsWith("cents")) mot = mot.slice(0, -1);
  if (mot.endsWith("cinq")) return `${mot}uième`;
  if (mot.endsWith("neuf")) return `${mot.slice(0, -1)}vième`;
  if (mot.endsWith("e")) return `${mot.slice(0, -1)}ième`;
  return `${mot}ième`;
}

/* =========================================================
   LES DESSINS
========================================================= */

/** Le matériel de numération. Le dessin n'écrit jamais le nombre. */
export function baseDix(
  c: number,
  d: number,
  u: number,
  options: Partial<Pick<BaseDixCanvasData, "etiquettes" | "echange" | "consigne" | "mode">> = {},
): BaseDixCanvasData {
  return {
    kind: "base_dix",
    ...(c ? { centaines: c } : {}),
    ...(d ? { dizaines: d } : {}),
    ...(u ? { unites: u } : {}),
    ...options,
  };
}

export function droite(data: Omit<NumberLineCanvasData, "kind">): NumberLineCanvasData {
  return { kind: "number_line", size: { width: 360, height: 100 }, ...data };
}

export function suite(data: Omit<SuiteCanvasData, "kind">): SuiteCanvasData {
  return { kind: "suite", ...data };
}

export function objets(elements: ObjetsCanvasData["elements"], extra: Partial<ObjetsCanvasData> = {}): ObjetsCanvasData {
  // Une FILE se lit sur une seule ligne : sans largeur, le canvas (250 px) passe à la ligne
  // après 3 objets et « le 4e en partant de la gauche » ne veut plus rien dire.
  return { kind: "objets", mode: "couleur", elements, colonnes: elements.length, size: { width: Math.max(250, elements.length * 70 + 16) }, ...extra };
}

export const OBJETS_FILE: readonly { quoi: ObjetId; nom: string; f: boolean }[] = [
  { quoi: "pomme", nom: "pomme", f: true },
  { quoi: "banane", nom: "banane", f: true },
  { quoi: "ballon", nom: "ballon", f: false },
  { quoi: "voiture", nom: "voiture", f: true },
  { quoi: "fleur", nom: "fleur", f: true },
  { quoi: "etoile", nom: "étoile", f: true },
  { quoi: "poisson", nom: "poisson", f: false },
  { quoi: "chat", nom: "chat", f: false },
  { quoi: "livre", nom: "livre", f: false },
  { quoi: "bateau", nom: "bateau", f: false },
  { quoi: "papillon", nom: "papillon", f: false },
  { quoi: "chapeau", nom: "chapeau", f: false },
  { quoi: "soleil", nom: "soleil", f: false },
  { quoi: "tasse", nom: "tasse", f: true },
];

/** « la pomme », « le ballon ». */
const voyelle = (mot: string) => /^[aeiouàâéèêëîïôœ]/i.test(mot);
export const leLa = (o: { nom: string; f: boolean }) => (voyelle(o.nom) ? `l'${o.nom}` : `${o.f ? "la" : "le"} ${o.nom}`);
/** « de la pomme », « du ballon », « de l'étoile ». */
export const duDeLa = (o: { nom: string; f: boolean }) => (voyelle(o.nom) ? `de l'${o.nom}` : o.f ? `de la ${o.nom}` : `du ${o.nom}`);
export const unUne = (o: { nom: string; f: boolean }) => `${o.f ? "une" : "un"} ${o.nom}`;

/* ---------------------------------------------------------
   La monnaie : une liste de valeurs (en euros, ou « 20c ») →
   des pièces et billets regroupés, du plus grand au plus petit.
--------------------------------------------------------- */

export type Valeur = MonnaieValeur;

/** 5 → « 5e » ; « 20c » reste « 20c ». */
export const v = (x: number | Valeur): Valeur => (typeof x === "number" ? (`${x}e` as Valeur) : x);

const CENTIMES: Record<string, number> = {
  "1c": 1, "2c": 2, "5c": 5, "10c": 10, "20c": 20, "50c": 50,
  "1e": 100, "2e": 200, "5e": 500, "10e": 1000, "20e": 2000, "50e": 5000, "100e": 10000,
};
export const enCentimes = (x: Valeur) => CENTIMES[x];

/** Regroupe les valeurs identiques (« 2e », nombre 3). `trier` : du plus grand au plus petit. */
export function tas(valeurs: readonly (number | Valeur)[], trier = true): MonnaieElement[] {
  const vs = valeurs.map(v);
  const ordre = trier ? [...vs].sort((a, b) => enCentimes(b) - enCentimes(a)) : vs;
  const out: MonnaieElement[] = [];
  for (const x of ordre) {
    const der = out[out.length - 1];
    if (der && der.valeur === x && (der.nombre ?? 1) < 10) der.nombre = (der.nombre ?? 1) + 1;
    else out.push({ valeur: x });
  }
  return out;
}

export function monnaie(elements: MonnaieElement[], extra: Partial<MonnaieCanvasData> = {}): MonnaieCanvasData {
  return { kind: "monnaie", elements, ...extra };
}

export function porteMonnaies(groupes: { nom: string; valeurs: readonly (number | Valeur)[] }[]): MonnaieCanvasData {
  return { kind: "monnaie", groupes: groupes.map((g) => ({ nom: g.nom, elements: tas(g.valeurs) })) };
}

export const BILLETS = [5, 10, 20, 50] as const;
export const PIECES = [1, 2] as const;

/** Une somme en euros entiers décomposée avec le moins de billets et pièces. */
export function rendreMinimal(somme: number): number[] {
  const out: number[] = [];
  let r = somme;
  for (const x of [100, 50, 20, 10, 5, 2, 1]) {
    while (r >= x) {
      out.push(x);
      r -= x;
    }
  }
  return out;
}

/** Une somme tirée au hasard en billets et pièces (euros entiers), de 2 à `n` objets. */
export function tasAuHasard(n: number, avecBillets = true, billetsMax = 20): number[] {
  const billets = BILLETS.filter((b) => b <= billetsMax);
  const out: number[] = [];
  const nbBillets = avecBillets ? randomInt(1, Math.min(2, n - 1)) : 0;
  for (let i = 0; i < nbBillets; i++) out.push(randomChoice(billets));
  while (out.length < n) out.push(randomChoice(PIECES));
  return out;
}

export const somme = (t: readonly number[]) => t.reduce((a, b) => a + b, 0);

/** « un billet de 10 € et deux pièces de 2 € » (euros entiers). */
export function direTas(valeurs: readonly number[]): string {
  const groupes = tas(valeurs);
  const mots = ["", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix"];
  const parts = groupes.map((g) => {
    const n = g.nombre ?? 1;
    const e = enCentimes(g.valeur) / 100;
    const billet = e >= 5;
    const nombre = billet ? (n === 1 ? "un" : mots[n]) : n === 1 ? "une" : mots[n];
    return `${nombre} ${billet ? pl(n, "billet", "billets") : pl(n, "pièce", "pièces")} de ${e} €`;
  });
  return parts.length === 1 ? parts[0] : `${parts.slice(0, -1).join(", ")} et ${parts[parts.length - 1]}`;
}
