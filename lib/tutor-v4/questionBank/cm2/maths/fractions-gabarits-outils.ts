// ─── Outils des gabarits de la notion « fraction » du CM2 (25/10/2026) ─────────
//
// ⛔⛔ POURQUOI. Mesuré le 25/10 (scripts/mesurer-squelettes-coach.ts cm2 fraction) :
// les 7 micros étaient rouges, 4 à 12 squelettes, 14 à 18 phrases déjà vues sur
// 20. Chaque gabarit tire ici un PRÉNOM × un OBJET (ou une situation) × une
// TOURNURE, et ses leurres sont les erreurs que Frédéric voit sur ses copies :
// ne pas savoir simplifier (ajouter le même nombre en haut et en bas), passer
// fraction → décimal → pourcentage de travers (3/4 = 3,4 ; 1/4 = 4 %).
//
// ⛔ UN QCM NE MONTRE JAMAIS DEUX CHOIX DE MÊME VALEUR (qcm-corriges-au-texte-exact) :
// `choix()` lit la valeur de chaque proposition (2/4 = 1/2 = 0,5 = 50 %) et
// écarte un leurre qui vaudrait la bonne réponse ou un autre leurre.
// Ces outils sont propres à la notion « fraction » : les fichiers des notions
// fraction_calcul et fraction_mixte ont les leurs (autre session).

import type { TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";

export type Prenom = { p: string; f: boolean };
export const PRENOMS: Prenom[] = [
  { p: "Inès", f: true }, { p: "Tom", f: false }, { p: "Léa", f: true }, { p: "Yanis", f: false },
  { p: "Chloé", f: true }, { p: "Mamadou", f: false }, { p: "Sofia", f: true }, { p: "Lucas", f: false },
  { p: "Aïcha", f: true }, { p: "Noah", f: false }, { p: "Jade", f: true }, { p: "Karim", f: false },
  { p: "Maëlys", f: true }, { p: "Théo", f: false }, { p: "Zoé", f: true }, { p: "Adam", f: false },
  { p: "Lina", f: true }, { p: "Nathan", f: false }, { p: "Fatou", f: true }, { p: "Enzo", f: false },
  { p: "Mei", f: true }, { p: "Rayan", f: false }, { p: "Manon", f: true }, { p: "Hugo", f: false },
  { p: "Nour", f: true }, { p: "Malik", f: false }, { p: "Louise", f: true }, { p: "Ibrahim", f: false },
];

export const tirer = <T,>(t: readonly T[]): T => t[Math.floor(Math.random() * t.length)];
export const entre = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
export const melanger = <T,>(t: readonly T[]): T[] => [...t].sort(() => Math.random() - 0.5);
export function deuxPrenoms(): [Prenom, Prenom] {
  const a = tirer(PRENOMS);
  let b = tirer(PRENOMS);
  while (b.p === a.p) b = tirer(PRENOMS);
  return [a, b];
}
const voyelle = (p: string) => /^[AEIOUÉÈÊÂÎÔ]/.test(p); // « de Yanis » : pas d'élision devant Y
/** « de Tom », « d’Inès ». */
export const deP = (x: Prenom | string) => { const p = typeof x === "string" ? x : x.p; return voyelle(p) ? `d’${p}` : `de ${p}`; };
/** « que Tom », « qu’Inès ». */
export const queP = (x: Prenom | string) => { const p = typeof x === "string" ? x : x.p; return voyelle(p) ? `qu’${p}` : `que ${p}`; };
export const il = (x: Prenom) => (x.f ? "elle" : "il");
export const Il = (x: Prenom) => (x.f ? "Elle" : "Il");
export const pgcd = (a: number, b: number): number => (b ? pgcd(b, a % b) : Math.abs(a));
export const virgule = (x: number) => String(Math.round(x * 1e6) / 1e6).replace(".", ",");

/** Un tout que l'on partage en parts égales (objets de la vie d'un enfant de 10 ans). */
export type Objet = {
  un: string; le: string; du: string; parts: string; egales: string;
  modele: "bar" | "circle"; verbe: string; pc: string; pp: string;
};
const o = (un: string, le: string, du: string, parts: string, egales: string, modele: "bar" | "circle", verbe: string, pc: string, pp: string): Objet =>
  ({ un, le, du, parts, egales, modele, verbe, pc, pp });
export const OBJETS: Objet[] = [
  o("une pizza", "la pizza", "de la pizza", "parts", "égales", "circle", "mange", "a mangé", "mangée"),
  o("une tarte aux pommes", "la tarte", "de la tarte", "parts", "égales", "circle", "mange", "a mangé", "mangée"),
  o("une galette des rois", "la galette", "de la galette", "parts", "égales", "circle", "mange", "a mangé", "mangée"),
  o("un gâteau d’anniversaire", "le gâteau", "du gâteau", "parts", "égales", "circle", "mange", "a mangé", "mangée"),
  o("une crêpe géante", "la crêpe", "de la crêpe", "parts", "égales", "circle", "mange", "a mangé", "mangée"),
  o("une tablette de chocolat", "la tablette", "de la tablette", "carreaux", "égaux", "bar", "mange", "a mangé", "mangée"),
  o("une bande de papier", "la bande", "de la bande", "cases", "égales", "bar", "colorie", "a colorié", "coloriée"),
  o("un ruban", "le ruban", "du ruban", "morceaux", "égaux", "bar", "utilise", "a utilisé", "utilisée"),
  o("un drapeau à rayures", "le drapeau", "du drapeau", "bandes", "égales", "bar", "peint", "a peint", "peinte"),
  o("un potager", "le potager", "du potager", "parcelles", "égales", "bar", "arrose", "a arrosé", "arrosée"),
  o("une fresque", "la fresque", "de la fresque", "panneaux", "égaux", "bar", "peint", "a peint", "peinte"),
  o("une baguette", "la baguette", "de la baguette", "morceaux", "égaux", "bar", "mange", "a mangé", "mangée"),
  o("une frise de la classe", "la frise", "de la frise", "cases", "égales", "bar", "décore", "a décoré", "décorée"),
  o("une couverture en patchwork", "la couverture", "de la couverture", "carrés", "égaux", "bar", "coud", "a cousu", "cousue"),
  o("une mosaïque", "la mosaïque", "de la mosaïque", "carreaux", "égaux", "bar", "pose", "a posé", "posée"),
  o("un terrain de jeu", "le terrain", "du terrain", "zones", "égales", "bar", "nettoie", "a nettoyé", "nettoyée"),
];

const PLURIELS: Record<string, string> = {
  "la pizza": "pizzas", "la tarte": "tartes aux pommes", "la galette": "galettes des rois", "le gâteau": "gâteaux d’anniversaire",
  "la crêpe": "crêpes géantes", "la tablette": "tablettes de chocolat", "la bande": "bandes de papier", "le ruban": "rubans",
  "le drapeau": "drapeaux à rayures", "le potager": "potagers", "la fresque": "fresques", "la baguette": "baguettes",
  "la frise": "frises", "la couverture": "couvertures en patchwork", "la mosaïque": "mosaïques", "le terrain": "terrains de jeu",
};
/** « des pizzas », « des gâteaux d’anniversaire ». */
export const pluriel = (O: Objet) => PLURIELS[O.le];
const INFINITIFS: Record<string, string> = {
  mange: "manger", colorie: "colorier", utilise: "utiliser", peint: "peindre", arrose: "arroser",
  "décore": "décorer", coud: "coudre", pose: "poser", nettoie: "nettoyer",
};
export const infinitif = (O: Objet) => INFINITIFS[O.verbe];
/** Accord avec le nom des parts : « parts coloriées », « carreaux coloriés ». */
export const accord = (O: Objet, fem: string, masc: string) => (O.egales === "égales" ? fem : masc);
/** Le nom sans article : « pizza », « gâteau d’anniversaire ». */
export const nom = (O: Objet) => O.un.replace(/^une? /, "");

const UNITES = ["", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix", "onze", "douze"];
const NOMS: Record<number, [string, string]> = {
  2: ["demi", "demis"], 3: ["tiers", "tiers"], 4: ["quart", "quarts"], 5: ["cinquième", "cinquièmes"],
  6: ["sixième", "sixièmes"], 7: ["septième", "septièmes"], 8: ["huitième", "huitièmes"],
  9: ["neuvième", "neuvièmes"], 10: ["dixième", "dixièmes"], 12: ["douzième", "douzièmes"],
  100: ["centième", "centièmes"], 1000: ["millième", "millièmes"],
};
export const nombreEnMots = (n: number) => UNITES[n] ?? String(n);
/** 3/4 → « trois quarts » ; 1/2 → « un demi ». */
export const fractionEnMots = (n: number, d: number) => `${nombreEnMots(n)} ${NOMS[d][n > 1 ? 1 : 0]}`;
export const aUnNom = (d: number) => d in NOMS;
/** Leurre de lecture : 3/4 → « trois quatrièmes » ; pour d ≥ 5 (le nom est déjà l’ordinal), 4/5 → « cinq cinquièmes » (le bas lu deux fois). */
export const ordinalFaux = (n: number, d: number) =>
  d <= 4 ? `${nombreEnMots(n)} ${{ 2: "deuxième", 3: "troisième", 4: "quatrième" }[d]}${n > 1 ? "s" : ""}` : `${nombreEnMots(d)} ${NOMS[d][1]}`;

/** Valeur d'une proposition : « 3/4 », « 0,75 », « 75 % », « 18 élèves ». NaN sinon. */
export function valeur(s: string): number {
  const t = s.trim();
  let m = t.match(/^(\d+) ?\/ ?(\d+)$/);
  if (m) return Number(m[1]) / Number(m[2]);
  m = t.match(/^(\d+(?:,\d+)?) ?%$/);
  if (m) return Number(m[1].replace(",", ".")) / 100;
  m = t.match(/^(\d+(?:,\d+)?)(?: [\p{L}€’' ]+)?$/u);
  if (m) return Number(m[1].replace(",", "."));
  return NaN;
}
const memeValeur = (a: string, b: string) => {
  const x = valeur(a), y = valeur(b);
  return Number.isNaN(x) || Number.isNaN(y) ? a === b : Math.abs(x - y) < 1e-9;
};
/** La bonne réponse + 3 leurres au plus, tous de valeurs différentes, mélangés. */
export function choix(bonne: string, leurres: readonly string[], n = 3): string[] {
  const garde: string[] = [];
  for (const l of melanger(leurres)) {
    if (garde.length >= n) break;
    // Un leurre « 0/4 », « 3/0 » ou négatif (enlever le même nombre en haut et en bas) ne se montre pas.
    if (/(^|\D)0 ?\/|\/ ?0(\D|$)|-\d/.test(l)) continue;
    if (memeValeur(l, bonne) || garde.some((g) => memeValeur(g, l))) continue;
    garde.push(l);
  }
  return melanger([bonne, ...garde]);
}

export const exp = (definition: string, methode: string, calcul: string, conclusion: string) =>
  `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;

/** Un QCM prêt à servir. */
export const qcm = (text: string, bonne: string, leurres: readonly string[], explanation: string, extra: Partial<TutorGeneratedQuestionV4> = {}): TutorGeneratedQuestionV4 =>
  ({ text, format: "qcm", choices: choix(bonne, leurres), expected: [bonne], comparator: "mcq_exact", explanation, ...extra }) as TutorGeneratedQuestionV4;

/** Un gabarit de la notion « fraction » du CM2. */
export function gabarit(id: string, microId: string, difficulty: number, hint: string, tags: string[], generate: () => TutorGeneratedQuestionV4): TutorBankItemV4 {
  return {
    kind: "template", id, niveau: "cm2", matiere: "maths", notionId: "fraction", microId,
    difficulty, theme: "neutral", hint, tags: ["cm2", "fraction", ...tags, "template"], generate,
  } as TutorBankItemV4;
}

/** Rectangles « lignes × colonnes » possibles pour d parts (Frédéric : « ou rectangle partagé »). */
const RECTANGLES: Record<number, [number, number][]> = {
  4: [[2, 2]], 6: [[2, 3]], 8: [[2, 4]], 9: [[3, 3]], 10: [[2, 5]], 12: [[3, 4], [2, 6]], 15: [[3, 5]], 16: [[4, 4], [2, 8]], 20: [[4, 5]], 24: [[4, 6]], 100: [[10, 10]],
};
/** Un rectangle partagé en lignes × colonnes, n cases coloriées, sans l'écriture n/d. */
export const rectangle = (n: number, d: number) => {
  const [rows, cols] = tirer(RECTANGLES[d]);
  return { kind: "fraction", model: "grid", grid: { rows, cols, shaded: n }, display: { showFraction: false } } as const;
};
export const aUnRectangle = (d: number) => d in RECTANGLES;
/** Disque, barre ou (une fois sur deux pour une barre) rectangle partagé, sans l'écriture de la fraction. */
export const figure = (modele: "bar" | "circle", n: number, d: number) =>
  modele === "bar" && aUnRectangle(d) && Math.random() < 0.5
    ? rectangle(n, d)
    : ({ kind: "fraction", model: modele, fraction: { numerator: n, denominator: d }, display: { showFraction: false } } as const);

/** Droite graduée en 1/d, entiers écrits, valeurs décimales cachées (1/3 = 0,333… illisible). */
export function droite(d: number, max: number, points: { value: number; label: string }[]) {
  const reperes = Array.from({ length: max + 1 }, (_, k) => ({ value: k, label: String(k), color: "#64748b" }));
  return {
    kind: "number_line" as const, min: 0, max, step: 1 / d,
    points: [...reperes, ...points.map((p) => ({ ...p, color: "#dc2626" }))],
    display: { showTicks: true, showValues: false, showPoints: true, showPointLabels: true, showZero: true },
  };
}

/** Deux barres l'une sous l'autre (modèle « compare »), chacune avec son étiquette. */
export const deuxBarres = (a: [number, number, string], b: [number, number, string]) =>
  ({
    kind: "fraction", model: "compare",
    fractions: [
      { numerator: a[0], denominator: a[1], label: a[2] },
      { numerator: b[0], denominator: b[1], label: b[2], color: "#f59e0b" },
    ],
  }) as any;

/** Une question « nue » (« Quel nombre décimal est égal à 3/10 ? ») posée, trois fois
 *  sur quatre, dans une petite scène : sans cela, sa phrase revenait à chaque tirage. */
export function cadre(P: Prenom, question: string): string {
  if (Math.random() < 0.25) return question;
  const scene = tirer([
    `${P.p} révise ses fractions.`, `Défi du jour pour ${P.p} :`, `Au tableau, ${P.p} doit répondre.`,
    `En classe, la maîtresse interroge ${P.p}.`, `${P.p} fait le quiz de fractions de la classe.`,
    `Dans son cahier d’exercices, ${P.p} lit cette question.`, `${P.p} aide son petit frère à faire ses devoirs.`,
    `${P.p} aide sa grande sœur à réviser.`, `Au jeu des cartes-fractions, ${P.p} tire une carte.`,
    `Sur l’ardoise ${deP(P)}, le maître a écrit une question.`, `${P.p} prépare l’évaluation de vendredi.`,
    `Pendant l’aide aux devoirs, ${P.p} bloque sur cette question.`,
  ]);
  return `${scene} ${question}`;
}
