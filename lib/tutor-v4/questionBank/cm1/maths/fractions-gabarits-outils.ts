// Outils des GÉNÉRATEURS de fractions du CM1 (25/10/2026).
//
// ⛔⛔ POURQUOI (hub-robustesse-du-coach, mesure des SQUELETTES) : les gabarits
// de fractions.bank.ts ne variaient que les NOMBRES. L'élève reconnaît la
// PHRASE : 6 à 14 squelettes par micro, 11 à 18 répétitions sur 20. Chaque
// générateur tire ici un PERSONNAGE × un OBJET × une SITUATION × une TOURNURE.
// Mesure : npx --yes tsx@4 scripts/mesurer-squelettes-coach.ts cm1 fraction
//
// Règles tenues : un QCM n'a jamais deux choix de même VALEUR (2/4 et 1/2) et la
// bonne réponse y figure au texte exact ; une question ouverte = un cas chiffré,
// une réponse, avec les écritures équivalentes raisonnables dans `expected`.

import type { TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";

export const tirer = <T,>(t: readonly T[]): T => t[Math.floor(Math.random() * t.length)];
export const entier = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
export const melanger = <T,>(t: readonly T[]): T[] => [...t].sort(() => Math.random() - 0.5);
export const pgcd = (a: number, b: number): number => (b ? pgcd(b, a % b) : Math.abs(a));

export type Enfant = { p: string; f: boolean };
export const ENFANTS: Enfant[] = [
  ["Léa", 1], ["Hugo", 0], ["Inès", 1], ["Nathan", 0], ["Aïcha", 1], ["Yanis", 0], ["Chloé", 1], ["Malik", 0],
  ["Zoé", 1], ["Lucas", 0], ["Jade", 1], ["Rayan", 0], ["Emma", 1], ["Noah", 0], ["Lina", 1], ["Adam", 0],
  ["Manon", 1], ["Sacha", 0], ["Camille", 1], ["Tom", 0], ["Maëlys", 1], ["Ethan", 0], ["Sofia", 1], ["Liam", 0],
  ["Nour", 1], ["Gabriel", 0], ["Anaïs", 1], ["Théo", 0], ["Clara", 1], ["Kenzo", 0], ["Louise", 1], ["Mathis", 0],
  ["Yasmine", 1], ["Arthur", 0], ["Alice", 1], ["Bilal", 0], ["Rose", 1], ["Enzo", 0], ["Mila", 1], ["Timéo", 0],
].map(([p, f]) => ({ p: p as string, f: f === 1 }));
export const enfant = () => tirer(ENFANTS);
export function deuxEnfants(): [Enfant, Enfant] {
  const a = enfant();
  let b = enfant();
  while (b.p === a.p) b = enfant();
  return [a, b];
}
export const il = (e: Enfant) => (e.f ? "elle" : "il");
export const Il = (e: Enfant) => (e.f ? "Elle" : "Il");
/** « a-t-il », « doit-elle » : le trait d'union et le t euphonique. */
export const tIl = (e: Enfant) => (e.f ? "t-elle" : "t-il");

/** Un objet qu'on partage. `rond` : dessiné en disque ; sinon en bande. */
export type Objet = { le: string; un: string; du: string; entier: string; parts: string; unePart: string; rond: boolean };
const o = (le: string, un: string, du: string, entier: string, parts: string, unePart: string, rond: boolean): Objet => ({ le, un, du, entier, parts, unePart, rond });
export const OBJETS: Objet[] = [
  o("la pizza", "une pizza", "de la pizza", "la pizza entière", "parts", "une part", true),
  o("la tarte aux pommes", "une tarte aux pommes", "de la tarte aux pommes", "la tarte entière", "parts", "une part", true),
  o("la galette", "une galette", "de la galette", "la galette entière", "parts", "une part", true),
  o("le gâteau au chocolat", "un gâteau au chocolat", "du gâteau au chocolat", "le gâteau entier", "parts", "une part", true),
  o("la crêpe géante", "une crêpe géante", "de la crêpe géante", "la crêpe entière", "parts", "une part", true),
  o("la pastèque", "une pastèque", "de la pastèque", "la pastèque entière", "tranches", "une tranche", true),
  o("le fromage rond", "un fromage rond", "du fromage rond", "le fromage entier", "parts", "une part", true),
  o("la tablette de chocolat", "une tablette de chocolat", "de la tablette de chocolat", "la tablette entière", "carrés", "un carré", false),
  o("la bande de papier", "une bande de papier", "de la bande de papier", "la bande entière", "cases", "une case", false),
  o("le ruban", "un ruban", "du ruban", "le ruban entier", "morceaux", "un morceau", false),
  o("la baguette", "une baguette", "de la baguette", "la baguette entière", "morceaux", "un morceau", false),
  o("la planche de bois", "une planche de bois", "de la planche de bois", "la planche entière", "morceaux", "un morceau", false),
  o("le cake", "un cake", "du cake", "le cake entier", "tranches", "une tranche", false),
  o("la barre de céréales", "une barre de céréales", "de la barre de céréales", "la barre entière", "morceaux", "un morceau", false),
  o("la frise de la classe", "une frise", "de la frise", "la frise entière", "cases", "une case", false),
  o("le potager de l’école", "un potager", "du potager", "le potager entier", "parcelles", "une parcelle", false),
  o("la piste d’athlétisme", "une piste", "de la piste", "la piste entière", "tronçons", "un tronçon", false),
  o("le mur du préau", "un mur", "du mur", "le mur entier", "panneaux", "un panneau", false),
];
/** L'accord : « coupée » pour la pizza, « coupé » pour le gâteau. */
export const e = (x: Objet) => (x.un.startsWith("une ") ? "e" : "");
/** « 8 parts égales », « 8 morceaux égaux ». */
export const egaux = (x: Objet) => (x.unePart.startsWith("une ") ? "égales" : "égaux");
/** « les parts coloriées », « les morceaux coloriés ». */
export const accordParts = (x: Objet, mot: string) => (x.unePart.startsWith("une ") ? `${mot}es` : `${mot}s`);
export const objet = (rond?: boolean) => tirer(rond === undefined ? OBJETS : OBJETS.filter((x) => x.rond === rond));

export const MOMENTS = [
  "Au goûter", "À l’anniversaire de sa cousine", "Au pique-nique du dimanche", "Après le match de foot",
  "Pendant la sortie scolaire", "À la kermesse de l’école", "Mercredi après-midi", "En rentrant de la piscine",
  "Pour la fête de l’école", "Chez sa grand-mère", "Au centre de loisirs", "Avant le cours de danse",
  "Après la répétition de musique", "Pendant les vacances", "Au retour de la randonnée", "Le jour de la fête du quartier",
];
export const moment = () => tirer(MOMENTS);
/** « Au goûter, » en début de phrase, ou rien : une tournure de plus. */
export const debut = () => (Math.random() < 0.6 ? `${moment()}, ` : "");

const UNITES = ["", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix", "onze", "douze", "treize", "quatorze", "quinze", "seize", "dix-sept", "dix-huit", "dix-neuf", "vingt"];
const NOMS: Record<number, string> = { 2: "demi", 3: "tiers", 4: "quart", 5: "cinquième", 6: "sixième", 7: "septième", 8: "huitième", 9: "neuvième", 10: "dixième", 12: "douzième", 100: "centième" };
/** Le nom des parts : quart(s), tiers, dixième(s)… */
export const nomParts = (d: number, pluriel: boolean) => {
  const n = NOMS[d];
  return pluriel && !n.endsWith("s") ? `${n}s` : n;
};
export const enLettres = (n: number) => UNITES[n];
/** 3/4 → « trois quarts » ; 1/3 → « un tiers ». */
export const lire = (n: number, d: number) => `${UNITES[n]} ${nomParts(d, n > 1)}`;
export const fr = (n: number, d: number) => `${n}/${d}`;
/** 0,7 écrit à la française. */
export const virgule = (x: number) => String(Math.round(x * 1000) / 1000).replace(".", ",");

/** La valeur d'un choix (« 3/4 », « 0,75 », « 2 ») ; null pour du texte. */
export function valeur(s: string): number | null {
  const f = s.trim().match(/^(\d+)\/(\d+)$/);
  if (f) return Number(f[1]) / Number(f[2]);
  const d = s.trim().match(/^\d+(,\d+)?$/);
  return d ? Number(s.replace(",", ".")) : null;
}

/** Quatre choix au plus, la bonne réponse dedans, jamais deux de même VALEUR. */
export function choix(bon: string, leurres: readonly string[], n = 4): string[] {
  const vb = valeur(bon);
  const pris: string[] = [];
  const valeurs = new Set<number>(vb === null ? [] : [vb]);
  for (const l of melanger([...new Set(leurres)])) {
    if (l === bon || pris.length >= n - 1) continue;
    const v = valeur(l);
    if (v !== null) {
      if ([...valeurs].some((w) => Math.abs(w - v) < 1e-9)) continue;
      valeurs.add(v);
    }
    pris.push(l);
  }
  return melanger([bon, ...pris]);
}

/** Les écritures acceptées d'une fraction : elle-même et ses simplifications. */
export function ecrituresEgales(n: number, d: number): string[] {
  const t = [fr(n, d)];
  for (let k = 2; k <= Math.min(n, d); k++) if (n % k === 0 && d % k === 0) t.push(fr(n / k, d / k));
  return t;
}

export const exp = (definition: string, methode: string, calcul: string, conclusion: string) =>
  `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;

// ---------- Figures (canvas existants : FractionCanvasData, droite graduée) ----------

export const barre = (n: number, d: number, rond = false) => ({
  kind: "fraction" as const,
  model: rond ? ("circle" as const) : ("bar" as const),
  fraction: { numerator: n, denominator: d },
  display: { showFraction: false, showLabel: true, showParts: true, unequalParts: false },
});
export const deuxBarres = (a: [number, number], b: [number, number], etiquettes?: [string, string]) => ({
  kind: "fraction" as const,
  model: "compare" as const,
  fractions: [
    { numerator: a[0], denominator: a[1], label: etiquettes?.[0] },
    { numerator: b[0], denominator: b[1], label: etiquettes?.[1] },
  ],
  display: { showFraction: false, showLabel: true, showParts: true },
});
export const grille = (rows: number, cols: number, shaded: number) => ({
  kind: "fraction" as const,
  model: "grid" as const,
  grid: { rows, cols, shaded },
  display: { showFraction: false, showLabel: true, showParts: true },
});
/**
 * Droite graduée de 0 à `max`, l'unité partagée en `d`. ⚠️ Les valeurs des
 * graduations NE SONT PAS écrites : le rendu écrirait « 0,3333333333 » pour
 * un tiers, et 0,75 souffle la réponse. Les entiers sont posés en repères gris.
 */
export function droite(d: number, points: { n: number; label: string }[], max = 1) {
  const reperes = Array.from({ length: max + 1 }, (_, k) => ({ value: k, label: String(k), color: "#475569" }));
  return {
    kind: "number_line" as const,
    min: 0,
    max,
    step: 1 / d,
    points: [...reperes, ...points.map((p) => ({ value: p.n / d, label: p.label, color: "#2563eb" }))],
    display: { showTicks: true, showValues: false, showPoints: true, showPointLabels: true, showZero: true },
    size: { width: 320, height: 120 },
  };
}

// ---------- La fabrique des gabarits ----------

export function gabarit(
  id: string,
  microId: string,
  difficulty: 1 | 2 | 3 | 4 | 5,
  hint: string,
  tags: string[],
  generate: () => TutorGeneratedQuestionV4,
): TutorBankItemV4 {
  return {
    kind: "template",
    id,
    niveau: "cm1",
    matiere: "maths",
    notionId: "fraction",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["cm1", "fraction", "template", ...tags],
    generate: () => {
      const q = generate();
      return { ...q, text: cadrer(q.text) };
    },
  } as TutorBankItemV4;
}

/** Une tournure au hasard, avec deux enfants tirés (x, y) : pour faire varier la PHRASE des anciens gabarits. */
export function tournure(...t: ((x: Enfant, y: Enfant) => string)[]): string {
  const [x, y] = deuxEnfants();
  return cadrer(tirer(t)(x, y));
}

/**
 * ⭐ Une tournure SANS personnage (« Complète : 3/4 = …/8. ») est un squelette
 * unique : tirée une fois sur trois, elle revient plusieurs fois par série. On
 * lui donne, trois fois sur quatre, un cadre avec un enfant (mesuré le 25/10).
 */
const CADRES = [
  (x: Enfant) => `Au tableau, c’est au tour de ${x.p}.`,
  (x: Enfant) => `${x.p} s’entraîne pour l’évaluation.`,
  (x: Enfant) => `Défi du jour pour ${x.p}.`,
  (x: Enfant) => `${x.p} fait ses devoirs.`,
  (x: Enfant) => `Ti Margo pose une question à ${x.p}.`,
  (x: Enfant) => `${x.p} révise avec sa grand-mère.`,
  (x: Enfant) => `${x.p} joue au quiz des fractions.`,
  (x: Enfant) => `Sur l’ardoise de ${x.p} :`,
  (x: Enfant) => `${x.p} aide son petit frère.`,
  (x: Enfant) => `Question de la maîtresse à ${x.p}.`,
  (x: Enfant) => `${x.p} prépare le rallye maths.`,
  (x: Enfant) => `Dans le cahier de ${x.p} :`,
];
export function cadrer(texte: string): string {
  if (ENFANTS.some((x) => texte.includes(x.p)) || Math.random() < 0.25) return elider(texte);
  return elider(`${tirer(CADRES)(enfant())} ${texte}`);
}
/** « de Anaïs » → « d’Anaïs », « que Emma » → « qu’Emma ». */
export const elider = (t: string) => t.replace(/(^|[\s(«])(de|que) ([AEIOUÉÈÎÏÂ][a-zà-ÿ])/g, (_m, avant: string, m: string, l: string) => `${avant}${m === "de" ? "d" : "qu"}’${l}`);
/** « 1er trait », « 3e trait ». */
export const rang = (n: number) => (n === 1 ? "1er" : `${n}e`);
export const MAJ = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** « pizza », « gâteau au chocolat » : le nom sans article (« Chaque pizza… »). */
export const nomSeul = (x: Objet) => x.un.replace(/^une? /, "");

/** Les rectangles lignes × colonnes possibles pour d parts (2 × 4 = 8…). */
const RECTANGLES: Record<number, [number, number][]> = {
  4: [[2, 2]], 6: [[2, 3]], 8: [[2, 4]], 9: [[3, 3]], 10: [[2, 5]], 12: [[3, 4], [2, 6]], 15: [[3, 5]], 16: [[4, 4]], 20: [[4, 5]],
};
/**
 * Une figure au hasard pour n/d : disque (camembert), barre, ou RECTANGLE
 * partagé en lignes × colonnes (le modèle `grid`). Toujours n parts coloriées sur d.
 */
export function figure(n: number, d: number, permis: ("disque" | "barre" | "rectangle")[] = ["disque", "barre", "rectangle"]) {
  const possibles = permis.filter((f) => (f === "rectangle" ? !!RECTANGLES[d] : f === "disque" ? d <= 12 : true));
  const f = tirer(possibles.length ? possibles : ["barre" as const]);
  if (f === "rectangle") {
    const [r, c] = tirer(RECTANGLES[d]);
    return grille(r, c, n);
  }
  return barre(n, d, f === "disque");
}
/** Un objet qui se MANGE (pour « il en mange 5 »). */
export const aliment = (rond?: boolean) =>
  tirer(OBJETS.filter((x) => /pizza|tarte|galette|gâteau|crêpe|pastèque|fromage|tablette|baguette|cake|céréales/.test(x.le) && (rond === undefined || x.rond === rond)));
/** « une », « un ». */
export const art = (x: Objet) => x.un.split(" ")[0];
