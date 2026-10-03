// lib/tutor-v4/question-banks/maths/4e/volumes.bank.ts

/**
 * =========================================================
 * VOLUMES.BANK.TS
 * =========================================================
 *
 * Banque de questions Tutor V4 - Mathématiques 4e
 * Notion : Volumes
 *
 * Micro-compétences :
 * - volume_comprendre
 * - volume_lien_aire
 * - volume_pave
 * - volume_prisme
 * - volume_cylindre
 * - volume_unites
 * - volume_defis
 *
 * Choix pédagogiques :
 * - progression du simple vers le complexe ;
 * - priorité aux templates ;
 * - usage du Solide3DCanvas ;
 * - base colorée pour ancrer l'idée :
 *      Volume = aire de base × hauteur
 * - défis contextualisés et courts.
 *
 * ⛔⛔ 03/10/2026 — « DES QUESTIONS REVIENNENT SOUVENT ». Mesuré avant :
 * 5 à 10 squelettes d'énoncé par micro, 14 à 19 répétitions sur une série de
 * 20. Chaque gabarit compose désormais une SITUATION (tables ci-dessous :
 * aquarium, piscine, brique de jus, citerne, silo, bougie, boîte de conserve,
 * tente, barre chocolatée…) × une TOURNURE (3 à 6 façons de poser la même
 * question). Mesure : scripts/mesurer-squelettes-coach.ts 4e volume_solide.
 * La Réunion reste UN contexte parmi d'autres, pas le décor.
 *
 * ⛔ 03/10/2026 — une réponse en π (« 50π ») ne se corrige plus par
 * `contains_keyword` (« 507π » passait pour 50π) : `exact_text` avec ses
 * écritures admises (piAttendus). Contrôle :
 * scripts/verifier-corrections-indulgentes.ts 4e volume_solide.
 */

import type {
  TutorBankItemV4,
  Solide3DCanvasData,
} from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function formatNumber(n: number) {
  return Number.isInteger(n) ? String(n) : String(Math.round(n * 100) / 100);
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  // Jamais deux fois la même ligne. Un gabarit dont le piège coïncide avec la
  // bonne réponse (les coordonnées inversées quand x = y, un arrondi égal à la
  // valeur de départ…) affichait la même proposition deux fois, et l'élève
  // voyait deux réponses justes. Dédupliquer AVANT de couper à quatre laisse
  // aussi une chance aux distracteurs surnuméraires de prendre la place.
  // ⚠️ 04/08/2026 — la bonne réponse était jetée dans le même chapeau que les
  // pièges : à cinq pièges écrits, le mélange pouvait la laisser au fond et
  // le découpage à quatre l'emportait. L'élève voyait alors quatre pièges et
  // rien d'autre. On la met de côté, on tire trois distracteurs, on mélange.
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function solideCanvas(params: Omit<Solide3DCanvasData, "kind">): Solide3DCanvasData {
  return {
    kind: "solide_3d",
    ...params,
  };
}

/* ---------------------------------------------------------------------------
   Écriture des nombres et petite grammaire
--------------------------------------------------------------------------- */

/** Valeur pour `expected` : point décimal, pas d'espace (le comparateur tolère la virgule). */
function num(n: number): string {
  return String(Math.round(n * 1000) / 1000);
}

/** Écriture française dans le texte : virgule décimale, espace des milliers à partir de 10 000. */
function fr(n: number): string {
  const [ent, dec] = num(n).split(".");
  const entier = ent.length > 4 ? ent.replace(/\B(?=(\d{3})+(?!\d))/g, " ") : ent;
  return dec ? `${entier},${dec}` : entier;
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** « un aquarium » → « d’un aquarium », « une cuve » → « d’une cuve ». */
function de(gn: string): string {
  if (/^une? /.test(gn)) return "d’" + gn;
  if (gn.startsWith("le ")) return "du " + gn.slice(3);
  return "de " + gn;
}

const VOYELLE = /^[aeiouyàâéèêëîïôöûüœ]/i;
/** « un aquarium » → « l’aquarium », « une cuve » → « la cuve », « un hangar » → « le hangar ». */
function le(gn: string): string {
  const m = gn.match(/^(une?) (.*)$/);
  if (!m) return gn;
  if (VOYELLE.test(m[2])) return "l’" + m[2];
  return (m[1] === "un" ? "le " : "la ") + m[2];
}
/** « un aquarium » → « de l’aquarium », « un pot » → « du pot ». Pour les conclusions. */
const du = (gn: string) => de(le(gn));
/** « que une cuve » → « qu’une cuve ». */
const que = (s: string) => (VOYELLE.test(s) ? "qu’" + s : "que " + s);
/** « de Emma » → « d’Emma ». */
const deP = (p: string) => (VOYELLE.test(p) ? "d’" + p : "de " + p);

/**
 * Les écritures admises d'un volume exact « aπ » : 50π, 50 pi, 50 × π, avec ou
 * sans l'unité — jamais le coefficient seul.
 * ⛔ Comparaison EXACTE (exact_text) : « 507π » ne passe plus pour 50π.
 */
function piAttendus(c: number, u: string): string[] {
  const a = num(c);
  // ⛔ 03/10 (décision de Frédéric) : le coefficient seul (« 50 ») n'est PAS
  // accepté — 50 cm³ n'est pas 50π cm³.
  // ⚠️ « 50 pi » SANS unité n'est pas dans la liste : lib/answerMatch.ts y lit
  // le nombre 50 suivi de l'unité « pi », et tolère l'unité omise — « 50 »
  // passerait. « 50 pi cm³ » (deux mots après le nombre) n'a pas ce défaut.
  const formes = [`${a}π`, `${a} × π`, `${a} * π`];
  return [
    ...formes,
    ...[...formes, `${a} pi`].flatMap((f) => [`${f} ${u}³`, `${f} ${u}3`]),
  ];
}

type Unite = "cm" | "dm" | "m";
type Plage = [number, number, number?];
type Il = "il" | "elle";

function tirer(p: Plage): number {
  const pas = p[2] ?? 1;
  return p[0] + pas * randomInt(0, Math.floor((p[1] - p[0]) / pas));
}

const PRENOMS = [
  "Léa", "Noah", "Inès", "Malo", "Jade", "Yanis", "Chloé", "Adam",
  "Sarah", "Lucas", "Maëlys", "Kylian", "Zoé", "Rayan", "Emma", "Hugo",
];

function deuxPrenoms(): [string, string] {
  const a = randomChoice(PRENOMS);
  let b = randomChoice(PRENOMS);
  while (b === a) b = randomChoice(PRENOMS);
  return [a, b];
}

/* ---------------------------------------------------------------------------
   Tables de situations
--------------------------------------------------------------------------- */

/** Objets en forme de pavé droit, dimensions plausibles dans leur unité. */
type ObjetPave = { un: string; il: Il; u: Unite; L: Plage; l: Plage; h: Plage };
const PAVES: ObjetPave[] = [
  { un: "un aquarium", il: "il", u: "dm", L: [4, 9], l: [2, 4], h: [3, 5] },
  { un: "une piscine", il: "elle", u: "m", L: [8, 15], l: [4, 6], h: [1, 2] },
  { un: "une boîte à chaussures", il: "elle", u: "cm", L: [25, 35, 5], l: [15, 20, 5], h: [10, 12] },
  { un: "un carton de déménagement", il: "il", u: "dm", L: [5, 6], l: [3, 4], h: [3, 4] },
  { un: "une brique de jus de fruits", il: "elle", u: "cm", L: [6, 8], l: [4, 5], h: [10, 15] },
  { un: "une cuve de récupération d’eau de pluie", il: "elle", u: "dm", L: [8, 12], l: [5, 8], h: [8, 12] },
  { un: "un bac à sable", il: "il", u: "dm", L: [10, 15], l: [8, 12], h: [2, 3] },
  { un: "un conteneur de transport", il: "il", u: "m", L: [6, 12, 6], l: [2, 3], h: [2, 3] },
  { un: "une boîte d’allumettes", il: "elle", u: "cm", L: [5, 6], l: [3, 4], h: [1, 2] },
  { un: "un réfrigérateur", il: "il", u: "dm", L: [5, 6], l: [5, 6], h: [14, 18] },
  { un: "une jardinière", il: "elle", u: "dm", L: [6, 10], l: [2, 3], h: [2, 3] },
  { un: "une salle de classe", il: "elle", u: "m", L: [8, 10], l: [6, 8], h: [3, 3] },
  { un: "une benne de chantier", il: "elle", u: "m", L: [4, 6], l: [2, 2], h: [1, 2] },
  { un: "un bassin de jardin à Saint-Pierre de La Réunion", il: "il", u: "dm", L: [15, 25, 5], l: [10, 15, 5], h: [4, 6] },
  { un: "une valise cabine", il: "elle", u: "dm", L: [5, 5], l: [3, 4], h: [2, 2] },
  { un: "une boîte de céréales", il: "elle", u: "cm", L: [20, 24, 2], l: [6, 8], h: [25, 30, 5] },
  { un: "un coffre de voiture", il: "il", u: "dm", L: [8, 10], l: [6, 9], h: [4, 6] },
  { un: "un tiroir de bureau", il: "il", u: "cm", L: [30, 40, 10], l: [20, 30, 10], h: [8, 10] },
  { un: "une caisse de pommes", il: "elle", u: "cm", L: [40, 50, 10], l: [30, 30], h: [20, 30, 10] },
  { un: "une boîte de mouchoirs", il: "elle", u: "cm", L: [22, 24, 2], l: [11, 12], h: [8, 10] },
  { un: "un terrarium", il: "il", u: "cm", L: [40, 60, 10], l: [30, 30], h: [30, 40, 10] },
];

/** Objets cubiques (le mot « cubique » est ajouté par la tournure). */
type ObjetCube = { un: string; il: Il; u: Unite; a: Plage };
const CUBES: ObjetCube[] = [
  { un: "un dé en mousse", il: "il", u: "cm", a: [5, 10] },
  { un: "un glaçon", il: "il", u: "cm", a: [2, 4] },
  { un: "un casse-tête", il: "il", u: "cm", a: [5, 7] },
  { un: "une boîte de rangement", il: "elle", u: "dm", a: [3, 4] },
  { un: "un pouf", il: "il", u: "dm", a: [4, 5] },
  { un: "un coffre à jouets", il: "il", u: "dm", a: [4, 6] },
  { un: "un bloc de béton", il: "il", u: "dm", a: [2, 5] },
  { un: "un carton", il: "il", u: "dm", a: [3, 6] },
  { un: "un aquarium", il: "il", u: "dm", a: [3, 6] },
  { un: "un bloc de bois", il: "il", u: "cm", a: [3, 8] },
  { un: "une caisse de transport", il: "elle", u: "m", a: [1, 2] },
  { un: "une boîte cadeau", il: "elle", u: "cm", a: [10, 20, 5] },
  { un: "une lampe", il: "elle", u: "cm", a: [10, 20, 5] },
  { un: "une jardinière", il: "elle", u: "dm", a: [3, 5] },
  { un: "une boîte à bijoux", il: "elle", u: "cm", a: [6, 9] },
  { un: "un bloc de glace pour une sculpture", il: "il", u: "dm", a: [5, 8] },
];

/** Objets cylindriques : rayon et hauteur entiers. */
type ObjetCyl = { un: string; il: Il; u: Unite; r: Plage; h: Plage };
const CYLINDRES: ObjetCyl[] = [
  { un: "une boîte de conserve", il: "elle", u: "cm", r: [3, 5], h: [8, 12] },
  { un: "une canette", il: "elle", u: "cm", r: [3, 3], h: [11, 12] },
  { un: "une bougie", il: "elle", u: "cm", r: [2, 5], h: [5, 15] },
  { un: "un silo à grains", il: "il", u: "m", r: [3, 6], h: [10, 20] },
  { un: "une citerne", il: "elle", u: "m", r: [1, 3], h: [2, 5] },
  { un: "un verre", il: "il", u: "cm", r: [3, 4], h: [8, 12] },
  { un: "un pot de peinture", il: "il", u: "cm", r: [8, 10], h: [15, 20] },
  { un: "une bûche", il: "elle", u: "dm", r: [1, 3], h: [5, 10] },
  { un: "un puits", il: "il", u: "m", r: [1, 2], h: [5, 15] },
  { un: "une colonne en pierre", il: "elle", u: "dm", r: [2, 4], h: [20, 40, 5] },
  { un: "une boîte de chips", il: "elle", u: "cm", r: [3, 4], h: [20, 25] },
  { un: "une piscine hors-sol ronde", il: "elle", u: "m", r: [2, 3], h: [1, 2] },
  { un: "un ballon d’eau chaude", il: "il", u: "dm", r: [2, 3], h: [10, 15] },
  { un: "un tambour", il: "il", u: "cm", r: [15, 25, 5], h: [20, 30, 5] },
  { un: "un pot de yaourt", il: "il", u: "cm", r: [3, 4], h: [6, 8] },
  { un: "un réservoir d’eau", il: "il", u: "m", r: [2, 4], h: [3, 6] },
  { un: "une boîte à thé", il: "elle", u: "cm", r: [4, 5], h: [10, 15] },
  { un: "une cuve d’eau de pluie à Cilaos", il: "elle", u: "dm", r: [5, 8], h: [10, 15] },
  { un: "un rouleau à pâtisserie", il: "il", u: "cm", r: [2, 3], h: [30, 40, 5] },
];

/** Prismes droits : forme de la base, aire de base et hauteur entières. */
type ObjetPrisme = {
  un: string; il: Il; u: Unite;
  base: string; // « un triangle », « un hexagone »…
  duBase: string; // « du triangle », « de l’hexagone »…
  pl: string; // « triangles »
  A: Plage; h: Plage;
};
const TRI = { base: "un triangle", duBase: "du triangle", pl: "triangles" };
const TRAP = { base: "un trapèze", duBase: "du trapèze", pl: "trapèzes" };
const HEX = { base: "un hexagone", duBase: "de l’hexagone", pl: "hexagones" };
const PENT = { base: "un pentagone", duBase: "du pentagone", pl: "pentagones" };
const RECT = { base: "un rectangle", duBase: "du rectangle", pl: "rectangles" };
const PRISMES: ObjetPrisme[] = [
  { un: "une tente canadienne", il: "elle", u: "m", ...TRI, A: [2, 4], h: [2, 3] },
  { un: "une barre chocolatée", il: "elle", u: "cm", ...TRI, A: [4, 9], h: [15, 25, 5] },
  { un: "une part de gâteau", il: "elle", u: "cm", ...TRI, A: [30, 60, 5], h: [4, 8] },
  { un: "un toit de cabane", il: "il", u: "m", ...TRI, A: [3, 8], h: [3, 6] },
  { un: "une rampe de skate", il: "elle", u: "m", ...TRI, A: [2, 5], h: [2, 4] },
  { un: "une cale de porte", il: "elle", u: "cm", ...TRI, A: [10, 24, 2], h: [3, 5] },
  { un: "une boîte de chocolats", il: "elle", u: "cm", ...HEX, A: [40, 80, 10], h: [3, 6] },
  { un: "un abri de jardin", il: "il", u: "m", ...PENT, A: [5, 9], h: [2, 4] },
  { un: "une piscine à fond incliné", il: "elle", u: "m", ...TRAP, A: [15, 30, 5], h: [4, 6] },
  { un: "un nichoir", il: "il", u: "dm", ...PENT, A: [4, 8], h: [2, 3] },
  { un: "une serre de jardin", il: "elle", u: "m", ...PENT, A: [6, 10], h: [3, 6] },
  { un: "une poutre en bois", il: "elle", u: "dm", ...RECT, A: [2, 6], h: [30, 50, 10] },
  { un: "un pied de lampe", il: "il", u: "cm", ...HEX, A: [20, 40, 5], h: [20, 30, 5] },
  { un: "un bloc de mousse en biseau", il: "il", u: "dm", ...TRI, A: [3, 8], h: [4, 6] },
  { un: "une jardinière évasée", il: "elle", u: "dm", ...TRAP, A: [4, 10], h: [6, 10] },
  { un: "une gouttière", il: "elle", u: "cm", ...TRAP, A: [40, 80, 10], h: [100, 300, 100] },
  { un: "un prisme en verre pour une expérience d’optique", il: "il", u: "cm", ...TRI, A: [6, 15], h: [4, 10] },
  { un: "un écrou géant de sculpture", il: "il", u: "dm", ...HEX, A: [6, 12], h: [2, 4] },
];

/** Prismes à base triangulaire : côté b et hauteur ht du triangle (b pair). */
type ObjetPrismeTri = { un: string; il: Il; u: Unite; b: Plage; ht: Plage; h: Plage };
const PRISMES_TRI: ObjetPrismeTri[] = [
  { un: "une tente canadienne", il: "elle", u: "dm", b: [14, 20, 2], ht: [10, 14, 2], h: [20, 25, 5] },
  { un: "une barre chocolatée", il: "elle", u: "cm", b: [2, 4, 2], ht: [2, 3], h: [15, 25, 5] },
  { un: "une part de gâteau", il: "elle", u: "cm", b: [8, 12, 2], ht: [10, 14, 2], h: [4, 8] },
  { un: "un toit de cabane", il: "il", u: "m", b: [2, 4, 2], ht: [1, 2], h: [3, 6] },
  { un: "une rampe de skate", il: "elle", u: "dm", b: [10, 20, 2], ht: [4, 8, 2], h: [10, 20, 5] },
  { un: "une cale de porte", il: "elle", u: "cm", b: [6, 10, 2], ht: [2, 4], h: [3, 5] },
  { un: "un prisme en verre", il: "il", u: "cm", b: [4, 6, 2], ht: [3, 5], h: [4, 10] },
  { un: "un bloc de mousse en biseau", il: "il", u: "dm", b: [4, 8, 2], ht: [2, 4], h: [4, 6] },
  { un: "une part de fromage", il: "elle", u: "cm", b: [6, 10, 2], ht: [8, 12, 2], h: [3, 6] },
  { un: "une tente de randonnée", il: "elle", u: "dm", b: [12, 16, 2], ht: [8, 10, 2], h: [20, 22, 2] },
  { un: "un serre-livres en bois", il: "il", u: "cm", b: [10, 14, 2], ht: [10, 14, 2], h: [8, 12, 2] },
  { un: "un chevalet de table", il: "il", u: "cm", b: [10, 14, 2], ht: [16, 20, 2], h: [20, 30, 5] },
  { un: "une rampe d’accès pour fauteuil roulant", il: "elle", u: "dm", b: [20, 30, 10], ht: [2, 3], h: [8, 10] },
  { un: "un abri pour hérissons", il: "il", u: "dm", b: [4, 6, 2], ht: [3, 4], h: [4, 6] },
  { un: "un présentoir de vitrine", il: "il", u: "cm", b: [20, 30, 10], ht: [10, 15, 5], h: [40, 60, 10] },
];

/** Prismes à base rectangulaire présentés par leur section. */
type ObjetSection = { un: string; il: Il; u: Unite; L: Plage; l: Plage; h: Plage };
const SECTIONS_RECT: ObjetSection[] = [
  { un: "une poutre", il: "elle", u: "dm", L: [2, 3], l: [1, 2], h: [30, 50, 10] },
  { un: "une planche", il: "elle", u: "cm", L: [15, 25, 5], l: [2, 3], h: [100, 200, 50] },
  { un: "un lingot", il: "il", u: "cm", L: [4, 6], l: [2, 3], h: [10, 15] },
  { un: "un pain de savon", il: "il", u: "cm", L: [6, 8], l: [4, 5], h: [2, 3] },
  { un: "une brique de construction", il: "elle", u: "cm", L: [10, 12, 2], l: [5, 6], h: [20, 22, 2] },
  { un: "une tablette de chocolat", il: "elle", u: "cm", L: [7, 8], l: [1, 1], h: [15, 16] },
  { un: "une plaquette de beurre", il: "elle", u: "cm", L: [6, 7], l: [3, 4], h: [10, 12] },
  { un: "une gomme", il: "elle", u: "cm", L: [2, 3], l: [1, 1], h: [4, 6] },
  { un: "un matelas", il: "il", u: "dm", L: [14, 16, 2], l: [2, 3], h: [19, 20] },
  { un: "un moule à cake", il: "il", u: "cm", L: [8, 10], l: [6, 8], h: [25, 30, 5] },
  { un: "une éponge", il: "elle", u: "cm", L: [7, 9], l: [3, 4], h: [10, 12] },
  { un: "un pavé de pâte à modeler", il: "il", u: "cm", L: [3, 5], l: [2, 3], h: [8, 10] },
  { un: "un rail de béton", il: "il", u: "dm", L: [2, 4], l: [2, 3], h: [20, 40, 10] },
  { un: "un livre", il: "il", u: "cm", L: [15, 20, 5], l: [2, 4], h: [20, 25, 5] },
];

/** Solides dont on donne l'aire de base (prisme, pavé, cylindre). */
type ObjetBase = { un: string; il: Il; u: Unite; solide: string; A: Plage; h: Plage };
const BASES: ObjetBase[] = [
  { un: "une boîte de conserve", il: "elle", u: "cm", solide: "un cylindre", A: [40, 60, 5], h: [8, 12] },
  { un: "une bougie", il: "elle", u: "cm", solide: "un cylindre", A: [20, 40, 5], h: [5, 15] },
  { un: "une tente canadienne", il: "elle", u: "m", solide: "un prisme droit", A: [2, 4], h: [2, 3] },
  { un: "une barre chocolatée", il: "elle", u: "cm", solide: "un prisme droit", A: [4, 9], h: [15, 25, 5] },
  { un: "un silo à grains", il: "il", u: "m", solide: "un cylindre", A: [30, 80, 10], h: [10, 20] },
  { un: "un aquarium", il: "il", u: "dm", solide: "un pavé droit", A: [12, 24, 2], h: [3, 5] },
  { un: "une piscine", il: "elle", u: "m", solide: "un pavé droit", A: [32, 60, 4], h: [1, 2] },
  { un: "une part de gâteau", il: "elle", u: "cm", solide: "un prisme droit", A: [30, 60, 5], h: [4, 8] },
  { un: "une boîte de chocolats hexagonale", il: "elle", u: "cm", solide: "un prisme droit", A: [40, 80, 10], h: [3, 6] },
  { un: "un abri de jardin", il: "il", u: "m", solide: "un prisme droit", A: [5, 9], h: [2, 4] },
  { un: "une piscine à fond incliné", il: "elle", u: "m", solide: "un prisme droit", A: [15, 30, 5], h: [4, 6] },
  { un: "un nichoir", il: "il", u: "dm", solide: "un prisme droit", A: [4, 8], h: [2, 3] },
  { un: "une serre de jardin", il: "elle", u: "m", solide: "un prisme droit", A: [6, 10], h: [3, 6] },
  { un: "un pot de peinture", il: "il", u: "cm", solide: "un cylindre", A: [200, 300, 50], h: [15, 20] },
  { un: "un verre", il: "il", u: "cm", solide: "un cylindre", A: [25, 40, 5], h: [8, 12] },
  { un: "une citerne", il: "elle", u: "m", solide: "un cylindre", A: [3, 12, 3], h: [2, 5] },
  { un: "une poutre en bois", il: "elle", u: "dm", solide: "un prisme droit", A: [2, 6], h: [30, 50, 10] },
  { un: "une colonne en pierre", il: "elle", u: "dm", solide: "un cylindre", A: [12, 40, 4], h: [20, 40, 5] },
  { un: "une jardinière", il: "elle", u: "dm", solide: "un pavé droit", A: [12, 30, 6], h: [2, 3] },
  { un: "une boîte à fromage ronde", il: "elle", u: "cm", solide: "un cylindre", A: [60, 100, 10], h: [3, 5] },
];

/** Objets à base carrée (côté ≠ 4 : sinon périmètre et aire coïncident). */
type ObjetCarre = { un: string; il: Il; u: Unite; c: Plage; h: Plage };
const CARRES: ObjetCarre[] = [
  { un: "un poteau en bois", il: "il", u: "cm", c: [8, 12], h: [100, 200, 50] },
  { un: "une tour en briques", il: "elle", u: "m", c: [3, 6], h: [8, 15] },
  { un: "un pied de table", il: "il", u: "cm", c: [5, 8], h: [70, 75, 5] },
  { un: "une colonne de rangement", il: "elle", u: "dm", c: [3, 5], h: [10, 18] },
  { un: "un aquarium", il: "il", u: "dm", c: [3, 6], h: [3, 6] },
  { un: "une jardinière", il: "elle", u: "dm", c: [3, 6], h: [3, 5] },
  { un: "un carton", il: "il", u: "dm", c: [3, 6], h: [2, 6] },
  { un: "une bougie", il: "elle", u: "cm", c: [5, 8], h: [8, 15] },
  { un: "un vase", il: "il", u: "cm", c: [6, 10], h: [20, 30, 5] },
  { un: "une boîte à thé", il: "elle", u: "cm", c: [6, 9], h: [10, 15] },
  { un: "un pilier en béton", il: "il", u: "dm", c: [3, 6], h: [25, 30] },
  { un: "une cheminée en briques", il: "elle", u: "dm", c: [5, 8], h: [30, 60, 10] },
  { un: "une tour de bureaux", il: "elle", u: "m", c: [20, 30, 5], h: [60, 120, 20] },
];

/** Cylindres dont on donne l'aire du disque de base (sans π). */
const CYL_AIRES: ObjetBase[] = [
  { un: "une boîte de conserve", il: "elle", u: "cm", solide: "un cylindre", A: [40, 60, 5], h: [8, 12] },
  { un: "une bougie", il: "elle", u: "cm", solide: "un cylindre", A: [20, 40, 5], h: [5, 15] },
  { un: "un silo à grains", il: "il", u: "m", solide: "un cylindre", A: [30, 80, 10], h: [10, 20] },
  { un: "une citerne", il: "elle", u: "m", solide: "un cylindre", A: [3, 12, 3], h: [2, 5] },
  { un: "un verre", il: "il", u: "cm", solide: "un cylindre", A: [25, 40, 5], h: [8, 12] },
  { un: "un pot de peinture", il: "il", u: "cm", solide: "un cylindre", A: [200, 300, 50], h: [15, 20] },
  { un: "une boîte à fromage ronde", il: "elle", u: "cm", solide: "un cylindre", A: [60, 100, 10], h: [3, 5] },
  { un: "une colonne en pierre", il: "elle", u: "dm", solide: "un cylindre", A: [12, 40, 4], h: [20, 40, 5] },
  { un: "un tambour", il: "il", u: "cm", solide: "un cylindre", A: [700, 1500, 100], h: [20, 30, 5] },
  { un: "une canette", il: "elle", u: "cm", solide: "un cylindre", A: [30, 35], h: [11, 12] },
  { un: "une boîte de chips", il: "elle", u: "cm", solide: "un cylindre", A: [40, 50, 5], h: [20, 25] },
  { un: "une bûche", il: "elle", u: "dm", solide: "un cylindre", A: [3, 12, 3], h: [5, 10] },
  { un: "un réservoir d’eau", il: "il", u: "m", solide: "un cylindre", A: [12, 48, 6], h: [3, 6] },
  { un: "un puits", il: "il", u: "m", solide: "un cylindre", A: [3, 12, 3], h: [5, 15] },
  { un: "un pot de yaourt", il: "il", u: "cm", solide: "un cylindre", A: [30, 40, 5], h: [6, 8] },
  { un: "un ballon d’eau chaude", il: "il", u: "dm", solide: "un cylindre", A: [12, 28, 4], h: [10, 15] },
];

/** Petits objets comptés comme cubes unités. */
type Brique = { sg: string; pl: string; f: boolean };
const BRIQUES: Brique[] = [
  { sg: "cube en bois", pl: "cubes en bois", f: false },
  { sg: "morceau de sucre", pl: "morceaux de sucre", f: false },
  { sg: "dé", pl: "dés", f: false },
  { sg: "cube de construction", pl: "cubes de construction", f: false },
  { sg: "glaçon cubique", pl: "glaçons cubiques", f: false },
  { sg: "boîte cubique", pl: "boîtes cubiques", f: true },
  { sg: "bloc de mousse cubique", pl: "blocs de mousse cubiques", f: false },
  { sg: "caisse cubique", pl: "caisses cubiques", f: true },
  { sg: "cube emboîtable", pl: "cubes emboîtables", f: false },
  { sg: "brique cubique", pl: "briques cubiques", f: true },
  { sg: "cube de bouillon", pl: "cubes de bouillon", f: false },
  { sg: "petit carton cubique", pl: "petits cartons cubiques", f: false },
  { sg: "savon cubique", pl: "savons cubiques", f: false },
  { sg: "bloc de pierre cubique", pl: "blocs de pierre cubiques", f: false },
];
const unB = (b: Brique) => (b.f ? "une " : "un ") + b.sg;

/** Contenants de liquide, contenance entière en litres. */
type Contenant = { un: string; il: Il; liq: string; L: Plage };
const LIQUIDES: Contenant[] = [
  { un: "une bouteille", il: "elle", liq: "d’eau", L: [1, 2] },
  { un: "un bidon d’huile", il: "il", liq: "d’huile", L: [2, 5] },
  { un: "un arrosoir", il: "il", liq: "d’eau", L: [5, 10] },
  { un: "un seau", il: "il", liq: "d’eau", L: [8, 12] },
  { un: "une casserole", il: "elle", liq: "de soupe", L: [2, 4] },
  { un: "un jerricane", il: "il", liq: "d’essence", L: [10, 20, 5] },
  { un: "une carafe", il: "elle", liq: "de jus d’orange", L: [1, 2] },
  { un: "une théière", il: "elle", liq: "de thé", L: [1, 2] },
  { un: "une bouillotte", il: "elle", liq: "d’eau chaude", L: [1, 2] },
  { un: "un pot de peinture", il: "il", liq: "de peinture", L: [2, 5] },
  { un: "un réservoir de tondeuse", il: "il", liq: "d’essence", L: [1, 3] },
  { un: "une gourde", il: "elle", liq: "d’eau", L: [1, 1] },
  { un: "un aquarium", il: "il", liq: "d’eau", L: [20, 60, 10] },
  { un: "une marmite", il: "elle", liq: "de bouillon", L: [5, 8] },
  { un: "un bidon de lait", il: "il", liq: "de lait", L: [5, 20, 5] },
  { un: "une fontaine à eau", il: "elle", liq: "d’eau", L: [10, 20, 5] },
];

/** Grands contenants, volume entier en m³. */
type Grand = { un: string; il: Il; liq: string; m3: Plage };
const GRANDS: Grand[] = [
  { un: "une piscine", il: "elle", liq: "d’eau", m3: [30, 90, 5] },
  { un: "une citerne", il: "elle", liq: "d’eau", m3: [2, 10] },
  { un: "une cuve à vin", il: "elle", liq: "de vin", m3: [5, 20] },
  { un: "un château d’eau", il: "il", liq: "d’eau", m3: [200, 500, 50] },
  { un: "un bassin de jardin", il: "il", liq: "d’eau", m3: [3, 12] },
  { un: "un camion-citerne", il: "il", liq: "de lait", m3: [20, 35] },
  { un: "l’aquarium géant d’un zoo", il: "il", liq: "d’eau de mer", m3: [100, 400, 50] },
  { un: "une cuve de fioul", il: "elle", liq: "de fioul", m3: [2, 6] },
  { un: "une piscine municipale", il: "elle", liq: "d’eau", m3: [300, 600, 50] },
  { un: "un bassin de retenue à La Réunion", il: "il", liq: "d’eau", m3: [800, 2000, 200] },
  { un: "une fosse de plongée", il: "elle", liq: "d’eau", m3: [100, 300, 50] },
  { un: "un jacuzzi", il: "il", liq: "d’eau", m3: [1, 3] },
  { un: "une cuve de récupération d’eau de pluie", il: "elle", liq: "d’eau", m3: [1, 5] },
  { un: "un réservoir d’arrosage agricole", il: "il", liq: "d’eau", m3: [20, 80, 10] },
];

/* ---------------------------------------------------------------------------
   Explications communes
--------------------------------------------------------------------------- */
function explPave(L: number, l: number, h: number, u: string, sujet: string) {
  const v = L * l * h;
  return (
    `Définition : le volume d’un pavé droit est longueur × largeur × hauteur (aire de base × hauteur).\n\n` +
    `Méthode : on multiplie les trois dimensions, toutes dans la même unité (${u}).\n\n` +
    `Calcul : ${fr(L)} × ${fr(l)} = ${fr(L * l)}, puis ${fr(L * l)} × ${fr(h)} = ${fr(v)}.\n\n` +
    `Conclusion : le volume ${sujet} est ${fr(v)} ${u}³.`
  );
}

function explAireBase(A: number, h: number, u: string, sujet: string) {
  return (
    `Définition : pour un prisme droit, un pavé droit ou un cylindre, Volume = aire de base × hauteur.\n\n` +
    `Méthode : on multiplie l’aire de la base (${u}²) par la hauteur (${u}) ; le résultat est en ${u}³.\n\n` +
    `Calcul : ${fr(A)} × ${fr(h)} = ${fr(A * h)}.\n\n` +
    `Conclusion : le volume ${sujet} est ${fr(A * h)} ${u}³.`
  );
}

export const volumesBank: TutorBankItemV4[] = [
  /* =========================
     VOLUME_COMPRENDRE
  ========================= */

  {
    kind: "fixed",
    id: "volume_comprendre_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Que mesure un volume ?",
    format: "qcm",
    choices: [
      "la place occupée par un solide",
      "la longueur d’un contour",
      "la surface d’une figure",
      "la masse d’un objet",
    ],
    expected: ["la place occupée par un solide"],
    comparator: "mcq_exact",
    hint: "Le volume concerne un objet en 3 dimensions.",
    explanation:
      "Définition : un volume mesure la place occupée par un solide dans l’espace.\n\n" +
      "Méthode : on repère qu’il s’agit d’une grandeur en trois dimensions.\n\n" +
      "Calcul : aucun calcul n’est nécessaire.\n\n" +
      "Conclusion : un volume mesure la place occupée.",
    tags: ["volume", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "volume_comprendre_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Un solide est formé de 6 cubes unités. Quel est son volume ?",
    format: "qcm",
    choices: ["3 unités de volume", "6 unités de volume", "12 unités de volume", "36 unités de volume"],
    expected: ["6 unités de volume"],
    comparator: "mcq_exact",
    hint: "Chaque petit cube compte pour 1 unité de volume.",
    explanation:
      "Définition : un cube unité représente 1 unité de volume.\n\n" +
      "Méthode : on compte tous les cubes unités du solide.\n\n" +
      "Calcul : il y a 6 cubes unités.\n\n" +
      "Conclusion : le volume est 6 unités de volume.",
    canvas: solideCanvas({
      solide: "assemblage_cubes",
      cubes: [
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 0, z: 0 },
        { x: 0, y: 1, z: 0 },
        { x: 1, y: 1, z: 0 },
        { x: 0, y: 0, z: 1 },
        { x: 1, y: 0, z: 1 },
      ],
      display: { showLabels: true },
    }),
    tags: ["volume", "cubes_unite", "canvas"],
  },

  {
    kind: "template",
    id: "volume_comprendre_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_comprendre",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte les cubes unités.",
    tags: ["volume", "cubes_unite", "template", "canvas"],
    generate: () => {
      const n = randomInt(4, 10);
      const cubes = Array.from({ length: n }, (_, i) => ({
        x: i % 3,
        y: Math.floor(i / 3) % 2,
        z: Math.floor(i / 6),
      }));
      const b = randomChoice(BRIQUES);
      const p = randomChoice(PRENOMS);
      const text = randomChoice([
        `Ce solide est construit avec des ${b.pl} identiques. En prenant ${unB(b)} comme unité de volume, quel est son volume ?`,
        `${p} empile des ${b.pl} pour former ce solide. Combien d’unités de volume occupe-t-il, si ${unB(b)} vaut une unité ?`,
        `Chaque ${b.sg} représente une unité de volume. Quel est le volume du solide dessiné ?`,
        `Quel est le volume, en unités, de cet assemblage de ${b.pl} ? (${cap(unB(b))} = 1 unité de volume.)`,
      ]);

      return {
        text,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation:
          `Définition : ${unB(b)} représente 1 unité de volume.\n\n` +
          `Méthode : on compte les ${b.pl} du solide étage par étage, y compris ceux qu’on voit à peine.\n\n` +
          `Calcul : il y a ${n} ${b.pl}.\n\n` +
          `Conclusion : le volume est ${n} unités de volume.`,
        canvas: solideCanvas({
          solide: "assemblage_cubes",
          cubes,
          display: { showLabels: true },
        }),
      };
    },
  },

  /* =========================
     VOLUME_LIEN_AIRE
  ========================= */

  {
    kind: "fixed",
    id: "volume_lien_aire_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_lien_aire",
    difficulty: 1,
    theme: "neutral",
    text: "Pour calculer le volume d’un prisme ou d’un cylindre, on utilise souvent la formule…",
    format: "qcm",
    choices: [
      "Volume = aire de base × hauteur",
      "Volume = périmètre × hauteur",
      "Volume = longueur + largeur + hauteur",
      "Volume = aire de base + hauteur",
    ],
    expected: ["Volume = aire de base × hauteur"],
    comparator: "mcq_exact",
    hint: "On empile une base sur une certaine hauteur.",
    explanation:
      "Définition : pour un prisme droit ou un cylindre, le volume est l’aire de base multipliée par la hauteur.\n\n" +
      "Méthode : on utilise la formule Volume = aire de base × hauteur.\n\n" +
      "Calcul : aucun calcul n’est nécessaire ici.\n\n" +
      "Conclusion : la bonne formule est Volume = aire de base × hauteur.",
    tags: ["volume", "aire_base", "formule"],
  },

  {
    kind: "template",
    id: "volume_lien_aire_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_lien_aire",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplie l’aire de la base par la hauteur.",
    tags: ["volume", "aire_base", "template", "canvas"],
    generate: () => {
      const o = randomChoice(BASES);
      const aireBase = tirer(o.A);
      const hauteur = tirer(o.h);
      const volume = aireBase * hauteur;
      const u = o.u;
      const text = randomChoice([
        `${cap(o.un)} a la forme ${de(o.solide)}. L’aire de sa base est ${fr(aireBase)} ${u}² et sa hauteur ${hauteur} ${u}. Quel est son volume, en ${u}³ ?`,
        `La base ${de(o.un)} a une aire de ${fr(aireBase)} ${u}². Sa hauteur est ${hauteur} ${u}. Calcule son volume en ${u}³.`,
        `Quel est le volume, en ${u}³, ${de(o.un)} de ${hauteur} ${u} de hauteur dont la base mesure ${fr(aireBase)} ${u}² ?`,
        `On assimile ${o.un} à ${o.solide} : base de ${fr(aireBase)} ${u}², hauteur de ${hauteur} ${u}. Combien de ${u}³ occupe-t-${o.il} ?`,
      ]);

      return {
        text,
        format: "short",
        expected: [num(volume)],
        comparator: "number_equal",
        explanation: explAireBase(aireBase, hauteur, u, du(o.un)),
        ...(o.solide === "un cylindre"
          ? {}
          : {
              canvas: solideCanvas({
                solide: "prisme",
                dimensions: { aireBase, hauteur },
                labels: {
                  aireBase: `${fr(aireBase)} ${u}²`,
                  hauteur: `${hauteur} ${u}`,
                },
                highlight: { base: true, hauteur: true },
                display: { showLabels: true, showDimensions: true, showFormulaHint: true },
              }),
            }),
      };
    },
  },

  {
    kind: "template",
    id: "volume_lien_aire_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_lien_aire",
    difficulty: 3,
    theme: "neutral",
    hint: "Le volume, c’est l’aire de base MULTIPLIÉE par la hauteur.",
    tags: ["volume", "aire_base", "piege", "template"],
    generate: () => {
      const o = randomChoice(BASES);
      const aireBase = tirer(o.A);
      const hauteur = tirer(o.h);
      const volume = aireBase * hauteur;
      const u = o.u;
      const juste = Math.random() < 0.35;
      const propose = juste ? volume : aireBase + hauteur;
      const p = randomChoice(PRENOMS);
      const text = randomChoice([
        `${p} affirme : « La base ${de(o.un)} a une aire de ${fr(aireBase)} ${u}² et sa hauteur vaut ${hauteur} ${u}, donc son volume vaut ${fr(propose)} ${u}³. » Est-ce juste ?`,
        `Un camarade calcule le volume ${de(o.un)} (aire de base ${fr(aireBase)} ${u}², hauteur ${hauteur} ${u}) et trouve ${fr(propose)} ${u}³. Son résultat est-il juste ?`,
        `${cap(o.un)} a une base de ${fr(aireBase)} ${u}² et une hauteur de ${hauteur} ${u}. Sur sa copie, ${p} écrit : volume = ${fr(propose)} ${u}³. Est-ce correct ?`,
        `Volume ${de(o.un)} : ${p} trouve ${fr(propose)} ${u}³, sachant que l’aire de la base vaut ${fr(aireBase)} ${u}² et la hauteur ${hauteur} ${u}. Ce volume est-il correct ?`,
      ]);

      return {
        text,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [juste ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          `Définition : le volume se calcule par aire de base × hauteur.\n\n` +
          `Méthode : on multiplie, on n’additionne pas.\n\n` +
          `Calcul : ${fr(aireBase)} × ${hauteur} = ${fr(volume)}.\n\n` +
          `Conclusion : ${juste ? "oui, le résultat est juste" : `non, ${fr(aireBase)} + ${hauteur} n’est pas un volume`} : le volume est ${fr(volume)} ${u}³.`,
      };
    },
  },

  /* =========================
     VOLUME_PAVE
  ========================= */

  {
    kind: "fixed",
    id: "volume_pave_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_pave",
    difficulty: 2,
    theme: "neutral",
    text: "Un pavé droit mesure 4 cm de longueur, 3 cm de largeur et 5 cm de hauteur. Quel est son volume ?",
    format: "qcm",
    choices: ["12 cm³", "20 cm³", "60 cm³", "45 cm³"],
    expected: ["60 cm³"],
    comparator: "mcq_exact",
    hint: "Volume = longueur × largeur × hauteur.",
    explanation:
      "Définition : le volume d’un pavé droit est longueur × largeur × hauteur.\n\n" +
      "Méthode : on multiplie les trois dimensions.\n\n" +
      "Calcul : 4 × 3 × 5 = 60.\n\n" +
      "Conclusion : le volume est 60 cm³.",
    canvas: solideCanvas({
      solide: "pave_droit",
      dimensions: { longueur: 4, largeur: 3, hauteur: 5 },
      labels: {
        longueur: "4 cm",
        largeur: "3 cm",
        hauteur: "5 cm",
        aireBase: "12 cm²",
      },
      highlight: { base: true, hauteur: true },
      display: { showLabels: true, showDimensions: true },
    }),
    tags: ["volume", "pave_droit", "canvas"],
  },

  {
    kind: "template",
    id: "volume_pave_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_pave",
    difficulty: 2,
    theme: "neutral",
    hint: "Calcule longueur × largeur × hauteur.",
    tags: ["volume", "pave_droit", "template", "canvas"],
    generate: () => {
      const o = randomChoice(PAVES);
      const longueur = tirer(o.L);
      const largeur = tirer(o.l);
      const hauteur = tirer(o.h);
      const aireBase = longueur * largeur;
      const volume = aireBase * hauteur;
      const u = o.u;
      const text = randomChoice([
        `${cap(o.un)} a la forme d’un pavé droit de ${longueur} ${u} de long, ${largeur} ${u} de large et ${hauteur} ${u} de haut. Quel est son volume, en ${u}³ ?`,
        `On modélise ${o.un} par le pavé droit dessiné. Calcule son volume en ${u}³.`,
        `Longueur : ${longueur} ${u}. Largeur : ${largeur} ${u}. Hauteur : ${hauteur} ${u}. Quel volume occupe ${o.un} de ces dimensions ?`,
        `Quel est, en ${u}³, le volume ${de(o.un)} de ${longueur} ${u} × ${largeur} ${u} × ${hauteur} ${u} ?`,
      ]);

      return {
        text,
        format: "short",
        expected: [num(volume)],
        comparator: "number_equal",
        explanation: explPave(longueur, largeur, hauteur, u, du(o.un)),
        canvas: solideCanvas({
          solide: "pave_droit",
          dimensions: { longueur, largeur, hauteur, aireBase, volume },
          labels: {
            longueur: `${longueur} ${u}`,
            largeur: `${largeur} ${u}`,
            hauteur: `${hauteur} ${u}`,
            aireBase: `${fr(aireBase)} ${u}²`,
          },
          highlight: { base: true, hauteur: true },
          display: { showLabels: true, showDimensions: true, showFormulaHint: true },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "volume_pave_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_pave",
    difficulty: 3,
    theme: "neutral",
    hint: "Commence par calculer l’aire de la base.",
    tags: ["volume", "pave_droit", "aire_base", "template"],
    generate: () => {
      const o = randomChoice(PAVES);
      const longueur = tirer(o.L);
      const largeur = tirer(o.l);
      const hauteur = tirer(o.h);
      const aireBase = longueur * largeur;
      const volume = aireBase * hauteur;
      const u = o.u;
      const text = randomChoice([
        `La base ${de(o.un)} est un rectangle de ${longueur} ${u} sur ${largeur} ${u}. Sa hauteur est ${hauteur} ${u}. Quel est son volume ?`,
        `${cap(o.un)} a un fond rectangulaire de ${longueur} ${u} sur ${largeur} ${u} et mesure ${hauteur} ${u} de haut. Calcule l’aire du fond, puis son volume en ${u}³.`,
        `Aire du fond, puis volume : ${o.un} a un fond de ${longueur} ${u} × ${largeur} ${u} et une hauteur de ${hauteur} ${u}. Quel est son volume ?`,
        `Le fond ${de(o.un)} mesure ${largeur} ${u} sur ${longueur} ${u}, et sa hauteur ${hauteur} ${u}. Quel volume, en ${u}³, occupe-t-${o.il} ?`,
      ]);

      return {
        text,
        format: "short",
        expected: [num(volume)],
        comparator: "number_equal",
        explanation: explPave(longueur, largeur, hauteur, u, du(o.un)),
        canvas: solideCanvas({
          solide: "pave_droit",
          dimensions: { longueur, largeur, hauteur },
          labels: {
            longueur: `${longueur} ${u}`,
            largeur: `${largeur} ${u}`,
            hauteur: `${hauteur} ${u}`,
            aireBase: `${fr(aireBase)} ${u}²`,
          },
          highlight: { base: true, hauteur: true },
          display: { showLabels: true, showDimensions: true },
        }),
      };
    },
  },

  /* =========================
     VOLUME_PRISME
  ========================= */

  {
    kind: "fixed",
    id: "volume_prisme_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_prisme",
    difficulty: 2,
    theme: "neutral",
    text: "Un prisme droit a une aire de base de 18 cm² et une hauteur de 7 cm. Quel est son volume ?",
    format: "qcm",
    choices: ["25 cm³", "126 cm³", "63 cm³", "36 cm³"],
    expected: ["126 cm³"],
    comparator: "mcq_exact",
    hint: "Volume = aire de base × hauteur.",
    explanation:
      "Définition : le volume d’un prisme droit est aire de base × hauteur.\n\n" +
      "Méthode : on multiplie l’aire de base par la hauteur.\n\n" +
      "Calcul : 18 × 7 = 126.\n\n" +
      "Conclusion : le volume est 126 cm³.",
    canvas: solideCanvas({
      solide: "prisme",
      dimensions: { aireBase: 18, hauteur: 7 },
      labels: { aireBase: "18 cm²", hauteur: "7 cm" },
      highlight: { base: true, hauteur: true },
      display: { showLabels: true, showDimensions: true, showFormulaHint: true },
    }),
    tags: ["volume", "prisme", "canvas"],
  },

  {
    kind: "template",
    id: "volume_prisme_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_prisme",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplie l’aire de la base par la hauteur.",
    tags: ["volume", "prisme", "template", "canvas"],
    generate: () => {
      const o = randomChoice(PRISMES);
      const aireBase = tirer(o.A);
      const hauteur = tirer(o.h);
      const volume = aireBase * hauteur;
      const u = o.u;
      const text = randomChoice([
        `${cap(o.un)} est un prisme droit dont la base, ${o.base}, a une aire de ${fr(aireBase)} ${u}². Sa hauteur est ${hauteur} ${u}. Quel est son volume ?`,
        `Base : ${o.base} de ${fr(aireBase)} ${u}². Hauteur du prisme : ${hauteur} ${u}. Calcule le volume ${de(o.un)}.`,
        `On modélise ${o.un} par un prisme droit de hauteur ${hauteur} ${u} ; l’aire de sa base vaut ${fr(aireBase)} ${u}². Quel est son volume, en ${u}³ ?`,
        `Quel est le volume ${de(o.un)} (prisme droit, aire de base ${fr(aireBase)} ${u}², hauteur ${hauteur} ${u}) ?`,
      ]);

      return {
        text,
        format: "short",
        expected: [num(volume)],
        comparator: "number_equal",
        explanation:
          `Définition : le volume d’un prisme droit est aire de base × hauteur.\n\n` +
          `Méthode : la base est ${o.base} ; on multiplie son aire par la hauteur du prisme.\n\n` +
          `Calcul : ${fr(aireBase)} × ${hauteur} = ${fr(volume)}.\n\n` +
          `Conclusion : le volume ${du(o.un)} est ${fr(volume)} ${u}³.`,
        canvas: solideCanvas({
          solide: "prisme",
          dimensions: { aireBase, hauteur, volume },
          labels: {
            aireBase: `${fr(aireBase)} ${u}²`,
            hauteur: `${hauteur} ${u}`,
          },
          highlight: { base: true, hauteur: true },
          display: { showLabels: true, showDimensions: true, showFormulaHint: true },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "volume_prisme_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_prisme",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule d’abord l’aire du triangle de base.",
    tags: ["volume", "prisme", "triangle_base", "template"],
    generate: () => {
      const o = randomChoice(PRISMES_TRI);
      const base = tirer(o.b);
      const hauteurTriangle = tirer(o.ht);
      const hauteurPrisme = tirer(o.h);
      const aireBase = (base * hauteurTriangle) / 2;
      const volume = aireBase * hauteurPrisme;
      const u = o.u;
      const text = randomChoice([
        `La base ${de(o.un)} est un triangle de base ${base} ${u} et de hauteur ${hauteurTriangle} ${u}. La hauteur du prisme est ${hauteurPrisme} ${u}. Quel est son volume ?`,
        `${cap(o.un)} a la forme d’un prisme droit à base triangulaire : le triangle a un côté de ${base} ${u}, et la hauteur relative à ce côté mesure ${hauteurTriangle} ${u}. Le prisme est long de ${hauteurPrisme} ${u}. Calcule son volume.`,
        `Triangle de base : côté ${base} ${u}, hauteur ${hauteurTriangle} ${u}. Longueur du prisme : ${hauteurPrisme} ${u}. Quel volume occupe ${o.un} ?`,
        `Calcule le volume ${de(o.un)} en forme de prisme droit : sa face triangulaire a une base de ${base} ${u} et une hauteur de ${hauteurTriangle} ${u}, et le prisme mesure ${hauteurPrisme} ${u}.`,
      ]);

      return {
        text,
        format: "short",
        expected: [num(volume)],
        comparator: "number_equal",
        explanation:
          `Définition : le volume d’un prisme droit est aire de base × hauteur.\n\n` +
          `Méthode : on calcule d’abord l’aire de la base triangulaire (base × hauteur ÷ 2), puis on multiplie par la hauteur du prisme.\n\n` +
          `Calcul : ${base} × ${hauteurTriangle} ÷ 2 = ${fr(aireBase)}, puis ${fr(aireBase)} × ${hauteurPrisme} = ${fr(volume)}.\n\n` +
          `Conclusion : le volume ${du(o.un)} est ${fr(volume)} ${u}³.`,
        canvas: solideCanvas({
          solide: "prisme",
          dimensions: { aireBase, hauteur: hauteurPrisme, volume },
          labels: {
            aireBase: `${fr(aireBase)} ${u}²`,
            hauteur: `${hauteurPrisme} ${u}`,
          },
          highlight: { base: true, hauteur: true },
          display: { showLabels: true, showDimensions: true },
        }),
      };
    },
  },

  /* =========================
     VOLUME_CYLINDRE
  ========================= */

  {
    kind: "fixed",
    id: "volume_cylindre_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_cylindre",
    difficulty: 2,
    theme: "neutral",
    text: "Un cylindre a une aire de base de 25π cm² et une hauteur de 4 cm. Quel est son volume ?",
    format: "qcm",
    choices: ["29π cm³", "100π cm³", "50π cm³", "25π cm³"],
    expected: ["100π cm³"],
    comparator: "mcq_exact",
    hint: "Volume = aire de base × hauteur.",
    explanation:
      "Définition : le volume d’un cylindre est aire de base × hauteur.\n\n" +
      "Méthode : on multiplie l’aire du disque de base par la hauteur.\n\n" +
      "Calcul : 25π × 4 = 100π.\n\n" +
      "Conclusion : le volume est 100π cm³.",
    canvas: solideCanvas({
      solide: "cylindre",
      dimensions: { rayon: 5, hauteur: 4 },
      labels: {
        rayon: "5 cm",
        hauteur: "4 cm",
        aireBase: "25π cm²",
      },
      highlight: { base: true, hauteur: true },
      display: { showLabels: true, showDimensions: true, showFormulaHint: true },
    }),
    tags: ["volume", "cylindre", "pi", "canvas"],
  },

  {
    kind: "template",
    id: "volume_cylindre_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_cylindre",
    difficulty: 3,
    theme: "neutral",
    hint: "Aire de base d’un disque : π × r².",
    tags: ["volume", "cylindre", "template", "canvas"],
    generate: () => {
      const o = randomChoice(CYLINDRES);
      const rayon = tirer(o.r);
      const hauteur = tirer(o.h);
      const r2 = rayon * rayon;
      const coeff = r2 * hauteur;
      const u = o.u;
      const text = randomChoice([
        `${cap(o.un)} a la forme d’un cylindre de rayon ${rayon} ${u} et de hauteur ${hauteur} ${u}. Donne son volume sous la forme aπ.`,
        `Quel est le volume exact ${de(o.un)} cylindrique de ${rayon} ${u} de rayon et ${hauteur} ${u} de haut ? Écris-le sous la forme aπ ${u}³.`,
        `Rayon : ${rayon} ${u}. Hauteur : ${hauteur} ${u}. Calcule le volume ${de(o.un)} en valeur exacte, sous la forme aπ.`,
        `On modélise ${o.un} par un cylindre (rayon ${rayon} ${u}, hauteur ${hauteur} ${u}). Quel est son volume, sous la forme aπ ?`,
      ]);

      return {
        text,
        format: "short",
        expected: piAttendus(coeff, u),
        comparator: "exact_text",
        explanation:
          `Définition : le volume d’un cylindre est aire de base × hauteur, soit π × r² × h.\n\n` +
          `Méthode : on calcule l’aire du disque de base, puis on multiplie par la hauteur.\n\n` +
          `Calcul : π × ${rayon}² = ${r2}π, puis ${r2}π × ${hauteur} = ${coeff}π.\n\n` +
          `Conclusion : le volume ${du(o.un)} est ${coeff}π ${u}³.`,
        canvas: solideCanvas({
          solide: "cylindre",
          dimensions: { rayon, hauteur },
          labels: {
            rayon: `${rayon} ${u}`,
            hauteur: `${hauteur} ${u}`,
            aireBase: `${r2}π ${u}²`,
          },
          highlight: { base: true, hauteur: true },
          display: { showLabels: true, showDimensions: true, showFormulaHint: true },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "volume_cylindre_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_cylindre",
    difficulty: 4,
    theme: "neutral",
    hint: "Attention : le rayon n’est pas le diamètre.",
    tags: ["volume", "cylindre", "diametre", "piege", "template"],
    generate: () => {
      const o = randomChoice(CYLINDRES);
      const rayon = tirer(o.r);
      const diametre = rayon * 2;
      const hauteur = tirer(o.h);
      const coeff = rayon * rayon * hauteur;
      const u = o.u;
      const text = randomChoice([
        `${cap(o.un)} a un diamètre de ${diametre} ${u} et une hauteur de ${hauteur} ${u}. Donne son volume sous la forme aπ.`,
        `Diamètre du fond ${de(o.un)} : ${diametre} ${u}. Hauteur : ${hauteur} ${u}. Quel est son volume exact, sous la forme aπ ?`,
        `On mesure ${o.un} : ${diametre} ${u} de diamètre, ${hauteur} ${u} de haut. Calcule son volume sous la forme aπ.`,
        `Quel est le volume ${de(o.un)} cylindrique de ${hauteur} ${u} de hauteur et de ${diametre} ${u} de diamètre ? Écris-le sous la forme aπ.`,
      ]);

      return {
        text,
        format: "short",
        expected: piAttendus(coeff, u),
        comparator: "exact_text",
        explanation:
          `Définition : le volume d’un cylindre est π × rayon² × hauteur.\n\n` +
          `Méthode : on trouve d’abord le rayon (la moitié du diamètre), puis on applique la formule.\n\n` +
          `Calcul : ${diametre} ÷ 2 = ${rayon}, puis π × ${rayon}² × ${hauteur} = ${coeff}π.\n\n` +
          `Conclusion : le volume ${du(o.un)} est ${coeff}π ${u}³.`,
        canvas: solideCanvas({
          solide: "cylindre",
          dimensions: { rayon, hauteur },
          labels: {
            rayon: `${rayon} ${u}`,
            hauteur: `${hauteur} ${u}`,
            aireBase: `${rayon * rayon}π ${u}²`,
          },
          highlight: { base: true, hauteur: true },
          display: { showLabels: true, showDimensions: true },
        }),
      };
    },
  },

  /* =========================
     VOLUME_UNITES
  ========================= */

  {
    kind: "fixed",
    id: "volume_unite_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_unite",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle unité est une unité de volume ?",
    format: "qcm",
    choices: ["cm", "cm²", "cm³", "kg"],
    expected: ["cm³"],
    comparator: "mcq_exact",
    hint: "Un volume se mesure avec une unité au cube.",
    explanation:
      "Définition : une unité de volume est une unité au cube.\n\n" +
      "Méthode : on cherche l’unité écrite avec un exposant 3.\n\n" +
      "Calcul : cm³ signifie centimètre cube.\n\n" +
      "Conclusion : cm³ est une unité de volume.",
    tags: ["volume", "unite"],
  },

  {
    kind: "fixed",
    id: "volume_unite_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_unite",
    difficulty: 2,
    theme: "neutral",
    text: "1 dm³ correspond à combien de cm³ ?",
    format: "qcm",
    choices: ["10 cm³", "100 cm³", "1 000 cm³", "10 000 cm³"],
    expected: ["1 000 cm³"],
    comparator: "mcq_exact",
    hint: "1 dm = 10 cm, donc 1 dm³ = 10 × 10 × 10 cm³.",
    explanation:
      "Définition : convertir un volume demande de convertir les trois dimensions.\n\n" +
      "Méthode : comme 1 dm = 10 cm, alors 1 dm³ = 10 × 10 × 10 cm³.\n\n" +
      "Calcul : 10³ = 1 000.\n\n" +
      "Conclusion : 1 dm³ = 1 000 cm³.",
    tags: ["volume", "conversion", "unite"],
  },

  {
    kind: "template",
    id: "volume_unite_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_unite",
    difficulty: 3,
    theme: "neutral",
    hint: "1 m³ = 1 000 dm³ = 1 000 L.",
    tags: ["volume", "litre", "conversion", "template"],
    generate: () => {
      const o = randomChoice(GRANDS);
      const m3 = tirer(o.m3);
      const litres = m3 * 1000;
      const versLitres = Math.random() < 0.6;
      const text = versLitres
        ? randomChoice([
            `${cap(o.un)} contient ${fr(m3)} m³ ${o.liq}. Combien de litres cela représente-t-il ?`,
            `Le volume ${de(o.un)} est de ${fr(m3)} m³. Exprime-le en litres.`,
            `Convertis en litres : ${o.un} de ${fr(m3)} m³.`,
            `Combien de litres ${o.liq} faut-il pour remplir ${o.un} de ${fr(m3)} m³ ?`,
          ])
        : randomChoice([
            `${cap(o.un)} contient ${fr(litres)} L ${o.liq}. Combien de m³ cela fait-il ?`,
            `Exprime en m³ la contenance ${de(o.un)}, qui est de ${fr(litres)} litres.`,
            `On a versé ${fr(litres)} L ${o.liq} dans ${o.un}. Quel volume est-ce, en m³ ?`,
          ]);
      const rep = versLitres ? litres : m3;

      return {
        text,
        format: "short",
        expected: [num(rep)],
        comparator: "number_equal",
        explanation:
          `Définition : 1 m³ = 1 000 dm³ et 1 dm³ = 1 L, donc 1 m³ = 1 000 L.\n\n` +
          `Méthode : ${versLitres ? "on multiplie le nombre de m³ par 1 000" : "on divise le nombre de litres par 1 000"}.\n\n` +
          `Calcul : ${versLitres ? `${fr(m3)} × 1 000 = ${fr(litres)}` : `${fr(litres)} ÷ 1 000 = ${fr(m3)}`}.\n\n` +
          `Conclusion : ${fr(m3)} m³ = ${fr(litres)} L.`,
      };
    },
  },

  {
    kind: "template",
    id: "volume_unite_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_unite",
    difficulty: 4,
    theme: "neutral",
    hint: "1 L = 1 dm³ = 1 000 cm³, et 1 m³ = 1 000 L.",
    tags: ["volume", "conversion", "decimal", "template"],
    generate: () => {
      // Conversions avec des décimaux, dans un sens ou dans l'autre. Chaque
      // objet porte SA contenance (en L) : pas de canette de 2,5 L.
      const petits: [string, number][] = [
        ["une canette de soda", 0.33], ["une bouteille de lait", 1], ["un pot de crème", 0.25],
        ["une brique de soupe", 0.5], ["un flacon de shampoing", 0.25], ["un bidon de lessive", 2.5],
        ["une gourde", 0.75], ["un bocal de confiture", 0.5], ["une bouteille de jus de goyave", 1.5],
        ["une boîte de glace", 0.75], ["un pot de peinture", 2.5], ["un biberon", 0.25],
        ["une carafe", 1.25], ["une bouteille de sirop", 0.75], ["une bouteille d’eau", 1.5],
      ];
      const grands: [string, number][] = [
        ["une cuve à mazout", 1.2], ["un jacuzzi", 0.8], ["une cuve de récupération d’eau de pluie", 0.5],
        ["un réservoir de camping-car", 0.15], ["une baignoire", 0.25], ["une citerne souple", 2.5],
        ["un bassin de jardin", 3.5], ["un aquarium de restaurant", 0.4], ["une cuve à vin", 4.5],
        ["un réservoir de fioul", 1.5], ["une piscine gonflable", 1.8],
      ];
      const sens = randomChoice(["L>cm³", "cm³>L", "dm³>cm³", "cm³>dm³", "m³>L", "L>m³"]);
      const [sujet, litresObjet] = randomChoice(sens === "m³>L" || sens === "L>m³" ? grands : petits);
      const cas =
        sens === "L>cm³" ? { de: "L", vers: "cm³", x: litresObjet, f: 1000 }
        : sens === "cm³>L" ? { de: "cm³", vers: "L", x: litresObjet * 1000, f: 0.001 }
        : sens === "dm³>cm³" ? { de: "dm³", vers: "cm³", x: litresObjet, f: 1000 }
        : sens === "cm³>dm³" ? { de: "cm³", vers: "dm³", x: litresObjet * 1000, f: 0.001 }
        : sens === "m³>L" ? { de: "m³", vers: "L", x: litresObjet, f: 1000 }
        : { de: "L", vers: "m³", x: litresObjet * 1000, f: 0.001 };
      const x = Math.round(cas.x * 1000) / 1000;
      const y = Math.round(x * cas.f * 1000) / 1000;
      const vers = cas.vers === "L" ? "litres" : cas.vers;
      const text = randomChoice([
        `${cap(sujet)} contient ${fr(x)} ${cas.de}. Combien cela fait-il de ${vers} ?`,
        `Convertis en ${vers} le volume ${de(sujet)} : ${fr(x)} ${cas.de}.`,
        `Sur l’étiquette ${de(sujet)}, on lit ${fr(x)} ${cas.de}. Quelle est cette contenance en ${vers} ?`,
        `${fr(x)} ${cas.de} : c’est la contenance ${de(sujet)}. Exprime-la en ${vers}.`,
      ]);

      return {
        text,
        format: "short",
        expected: [num(y)],
        comparator: "number_equal",
        explanation:
          `Définition : 1 L = 1 dm³ = 1 000 cm³ et 1 m³ = 1 000 dm³ = 1 000 L.\n\n` +
          `Méthode : pour passer des ${cas.de === "L" ? "litres" : cas.de} aux ${vers}, on ${cas.f > 1 ? "multiplie par 1 000" : "divise par 1 000"}.\n\n` +
          `Calcul : ${fr(x)} ${cas.f > 1 ? "×" : "÷"} 1 000 = ${fr(y)}.\n\n` +
          `Conclusion : ${fr(x)} ${cas.de} = ${fr(y)} ${cas.vers}.`,
      };
    },
  },

  /* =========================
     VOLUME_DEFIS
  ========================= */

  {
    kind: "fixed",
    id: "volume_defi_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève calcule le volume d’un pavé droit de dimensions 5 cm, 4 cm et 3 cm. Il écrit : 5 + 4 + 3 = 12 cm³. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Pour un volume de pavé droit, on multiplie les trois dimensions.",
    explanation:
      "Définition : le volume d’un pavé droit est le produit de ses trois dimensions.\n\n" +
      "Méthode : on multiplie les dimensions, on ne les additionne pas.\n\n" +
      "Calcul : 5 × 4 × 3 = 60.\n\n" +
      "Conclusion : l’élève a tort, le volume est 60 cm³.",
    tags: ["volume", "defi", "erreur"],
  },

  {
    kind: "template",
    id: "volume_defi_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Modélise l’objet par un pavé droit, puis pense à 1 m³ = 1 000 L si on demande des litres.",
    tags: ["volume", "defi", "pave", "litre", "template"],
    generate: () => {
      const o = randomChoice([
        { un: "une réserve d’eau agricole à La Réunion", L: [4, 9], l: [2, 5], h: [2, 6] },
        { un: "une piscine", L: [8, 12], l: [4, 5], h: [1, 2] },
        { un: "une benne de chantier", L: [4, 6], l: [2, 2], h: [1, 2] },
        { un: "un conteneur maritime", L: [6, 12, 6], l: [2, 2], h: [2, 3] },
        { un: "une cuve de fioul", L: [2, 3], l: [1, 2], h: [1, 2] },
        { un: "une piscine municipale", L: [25, 25], l: [10, 15, 5], h: [2, 2] },
        { un: "une remorque de camion", L: [10, 13], l: [2, 2], h: [2, 3] },
        { un: "un garage", L: [5, 6], l: [3, 4], h: [2, 3] },
        { un: "un hangar", L: [20, 30, 5], l: [10, 15, 5], h: [5, 8] },
        { un: "une serre", L: [6, 10], l: [3, 4], h: [2, 3] },
        { un: "une tranchée", L: [10, 20, 5], l: [1, 1], h: [1, 2] },
        { un: "une cabine d’ascenseur", L: [2, 2], l: [1, 2], h: [2, 3] },
        { un: "une chambre froide", L: [3, 5], l: [2, 3], h: [2, 3] },
        { un: "un bassin d’élevage de poissons", L: [5, 10], l: [3, 4], h: [1, 2] },
      ] as { un: string; L: Plage; l: Plage; h: Plage }[]);
      const longueur = tirer(o.L);
      const largeur = tirer(o.l);
      const hauteur = tirer(o.h);
      const volume = longueur * largeur * hauteur;
      const enLitres = Math.random() < 0.4;
      const question = enLitres ? "Quel est son volume en litres ?" : "Quel est son volume en m³ ?";
      const text = randomChoice([
        `${cap(o.un)} a la forme d’un pavé droit de ${longueur} m de long, ${largeur} m de large et ${hauteur} m de haut. ${question}`,
        `On assimile ${o.un} à un pavé droit : ${longueur} m × ${largeur} m × ${hauteur} m. ${question}`,
        `Dimensions intérieures ${de(o.un)} : longueur ${longueur} m, largeur ${largeur} m, hauteur ${hauteur} m. ${question}`,
        `${cap(o.un)} mesure ${hauteur} m de haut, ${largeur} m de large et ${longueur} m de long. ${question}`,
      ]);
      const rep = enLitres ? volume * 1000 : volume;

      return {
        text,
        format: "short",
        expected: [num(rep)],
        comparator: "number_equal",
        explanation:
          `Définition : le volume d’un pavé droit est longueur × largeur × hauteur, et 1 m³ = 1 000 L.\n\n` +
          `Méthode : on multiplie les trois dimensions${enLitres ? ", puis on convertit les m³ en litres" : ""}.\n\n` +
          `Calcul : ${longueur} × ${largeur} × ${hauteur} = ${fr(volume)} m³${enLitres ? `, puis ${fr(volume)} × 1 000 = ${fr(rep)} L` : ""}.\n\n` +
          `Conclusion : le volume ${du(o.un)} est ${enLitres ? `${fr(rep)} L` : `${fr(volume)} m³`}.`,
        canvas: solideCanvas({
          solide: "pave_droit",
          dimensions: { longueur, largeur, hauteur, volume },
          labels: {
            longueur: `${longueur} m`,
            largeur: `${largeur} m`,
            hauteur: `${hauteur} m`,
            aireBase: `${fr(longueur * largeur)} m²`,
          },
          highlight: { base: true, hauteur: true },
          display: { showLabels: true, showDimensions: true },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "volume_defi_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Compare les volumes, pas seulement les hauteurs.",
    tags: ["volume", "defi", "comparaison", "template"],
    generate: () => {
      const o = randomChoice([
        { nom: "vase", le: "le vase", u: "cm", A: [40, 120, 10], h: [10, 30, 5] },
        { nom: "bocal", le: "le bocal", u: "cm", A: [40, 100, 10], h: [8, 20, 2] },
        { nom: "boîte", le: "la boîte", u: "cm", A: [50, 200, 25], h: [4, 12] },
        { nom: "réservoir", le: "le réservoir", u: "m", A: [4, 20, 2], h: [2, 6] },
        { nom: "piscine", le: "la piscine", u: "m", A: [20, 60, 5], h: [1, 3] },
        { nom: "aquarium", le: "l’aquarium", u: "dm", A: [12, 40, 4], h: [3, 6] },
        { nom: "silo", le: "le silo", u: "m", A: [20, 60, 10], h: [8, 16, 2] },
        { nom: "bougie", le: "la bougie", u: "cm", A: [10, 40, 5], h: [5, 15] },
        { nom: "jardinière", le: "la jardinière", u: "dm", A: [6, 20, 2], h: [2, 4] },
        { nom: "cuve", le: "la cuve", u: "m", A: [2, 8], h: [1, 4] },
        { nom: "moule à gâteau", le: "le moule", u: "cm", A: [200, 400, 50], h: [4, 8] },
        { nom: "casserole", le: "la casserole", u: "cm", A: [150, 300, 50], h: [8, 15] },
        { nom: "coffre", le: "le coffre", u: "dm", A: [20, 40, 5], h: [3, 6] },
        { nom: "citerne", le: "la citerne", u: "m", A: [3, 12, 3], h: [2, 5] },
        { nom: "pot de fleurs", le: "le pot de fleurs", u: "cm", A: [100, 300, 50], h: [10, 25, 5] },
      ] as { nom: string; le: string; u: Unite; A: Plage; h: Plage }[]);
      const u = o.u;
      const aireA = tirer(o.A);
      const hA = tirer(o.h);
      let aireB = tirer(o.A);
      let hB = tirer(o.h);
      if (Math.random() < 0.15) {
        // De temps en temps, deux formes différentes pour un même volume.
        aireB = aireA * 2;
        hB = hA / 2;
        if (!Number.isInteger(hB)) {
          aireB = tirer(o.A);
          hB = tirer(o.h);
        }
      }
      const vA = aireA * hA;
      const vB = aireB * hB;
      const leA = `${o.le} A`;
      const leB = `${o.le} B`;
      const egal = "les deux ont le même volume";
      const correct = vA > vB ? leA : vB > vA ? leB : egal;
      const lequel = o.le.startsWith("la ") ? "Laquelle" : "Lequel";
      const text = randomChoice([
        `${cap(leA)} a une base de ${fr(aireA)} ${u}² et une hauteur de ${fr(hA)} ${u}. ${cap(leB)} a une base de ${fr(aireB)} ${u}² et une hauteur de ${fr(hB)} ${u}. ${lequel} contient le plus ?`,
        `On compare deux modèles de ${o.nom}. Modèle A : aire de base ${fr(aireA)} ${u}², hauteur ${fr(hA)} ${u}. Modèle B : aire de base ${fr(aireB)} ${u}², hauteur ${fr(hB)} ${u}. Lequel a le plus grand volume ?`,
        `Le plus haut est-il forcément le plus grand ? ${cap(leA)} : base ${fr(aireA)} ${u}², hauteur ${fr(hA)} ${u}. ${cap(leB)} : base ${fr(aireB)} ${u}², hauteur ${fr(hB)} ${u}. ${lequel} a le plus grand volume ?`,
        `Pour stocker le plus possible, faut-il choisir ${leA} (${fr(aireA)} ${u}² de base, ${fr(hA)} ${u} de haut) ou ${leB} (${fr(aireB)} ${u}² de base, ${fr(hB)} ${u} de haut) ?`,
      ]);

      return {
        text,
        format: "qcm",
        choices: [leA, leB, egal],
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          `Définition : pour comparer deux contenants, on compare leurs volumes.\n\n` +
          `Méthode : on calcule chaque volume avec aire de base × hauteur.\n\n` +
          `Calcul : A : ${fr(aireA)} × ${fr(hA)} = ${fr(vA)} ${u}³ ; B : ${fr(aireB)} × ${fr(hB)} = ${fr(vB)} ${u}³.\n\n` +
          `Conclusion : ${correct === egal ? "les deux ont le même volume" : `le plus grand volume est celui de ${correct}`}.`,
      };
    },
  },

  {
    kind: "template",
    id: "volume_defi_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Attention : il faut d’abord trouver le rayon.",
    tags: ["volume", "defi", "cylindre", "diametre", "template"],
    generate: () => {
      const o = randomChoice([
        { un: "un réservoir cylindrique", u: "m", r: [2, 4], h: [5, 10] },
        { un: "un silo à grains", u: "m", r: [3, 6], h: [10, 20] },
        { un: "une citerne enterrée", u: "m", r: [1, 2], h: [3, 6] },
        { un: "un puits", u: "m", r: [1, 2], h: [8, 20, 2] },
        { un: "un château d’eau", u: "m", r: [4, 8], h: [6, 10] },
        { un: "une piscine hors-sol", u: "m", r: [2, 3], h: [1, 2] },
        { un: "une cuve de méthanisation", u: "m", r: [5, 10], h: [6, 8] },
        { un: "un bassin rond", u: "m", r: [2, 5], h: [1, 2] },
        { un: "une tour de refroidissement miniature", u: "m", r: [2, 3], h: [10, 15] },
        { un: "une colonne de forage", u: "dm", r: [1, 3], h: [50, 100, 10] },
        { un: "un ballon d’eau chaude", u: "dm", r: [2, 3], h: [10, 15] },
        { un: "un fût de chêne", u: "dm", r: [3, 4], h: [8, 10] },
        { un: "une cuve à vin", u: "m", r: [1, 2], h: [3, 5] },
        { un: "un aquarium cylindrique géant", u: "m", r: [2, 4], h: [5, 8] },
      ] as { un: string; u: Unite; r: Plage; h: Plage }[]);
      const u = o.u;
      const rayon = tirer(o.r);
      const diametre = rayon * 2;
      const hauteur = tirer(o.h);
      const coeff = rayon * rayon * hauteur;
      const text = randomChoice([
        `${cap(o.un)} a un diamètre de ${diametre} ${u} et une hauteur de ${hauteur} ${u}. Donne son volume sous la forme aπ.`,
        `Pour un plan de chantier, on veut le volume exact ${de(o.un)} : ${diametre} ${u} de diamètre, ${hauteur} ${u} de hauteur. Écris-le sous la forme aπ.`,
        `Quel volume (sous la forme aπ ${u}³) peut contenir ${o.un} de ${hauteur} ${u} de haut, dont le diamètre mesure ${diametre} ${u} ?`,
        `Un technicien mesure ${o.un} : hauteur ${hauteur} ${u}, diamètre ${diametre} ${u}. Quel est son volume exact, sous la forme aπ ?`,
      ]);

      return {
        text,
        format: "short",
        expected: piAttendus(coeff, u),
        comparator: "exact_text",
        explanation:
          `Définition : le volume d’un cylindre est π × rayon² × hauteur.\n\n` +
          `Méthode : on utilise le rayon, pas le diamètre, puis on applique la formule.\n\n` +
          `Calcul : ${diametre} ÷ 2 = ${rayon}, puis π × ${rayon}² × ${hauteur} = ${coeff}π.\n\n` +
          `Conclusion : le volume ${du(o.un)} est ${coeff}π ${u}³.`,
        canvas: solideCanvas({
          solide: "cylindre",
          dimensions: { rayon, hauteur },
          labels: {
            rayon: `${rayon} ${u}`,
            hauteur: `${hauteur} ${u}`,
            aireBase: `${rayon * rayon}π ${u}²`,
          },
          highlight: { base: true, hauteur: true },
          display: { showLabels: true, showDimensions: true },
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "volume_defi_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi la formule Volume = aire de base × hauteur fonctionne pour un prisme droit.",
    format: "open",
    expected: ["base", "hauteur", "empile", "aire"],
    comparator: "contains_keyword",
    hint: "Imagine que l’on empile la même base plusieurs fois.",
    explanation:
      "Définition : un prisme droit garde la même base tout le long de sa hauteur.\n\n" +
      "Méthode : on imagine la base empilée régulièrement sur la hauteur.\n\n" +
      "Calcul : aire de base × hauteur donne la place occupée par l’empilement.\n\n" +
      "Conclusion : la formule Volume = aire de base × hauteur fonctionne pour un prisme droit.",
    tags: ["volume", "defi", "open", "raisonnement"],
  },

  /* =========================================================
     COMPLÉMENTS (top-up ~10 items / microSkill)
  ========================================================= */

  /* ---------- VOLUME_COMPRENDRE ---------- */

  {
    kind: "fixed",
    id: "volume_comprendre_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Deux solides occupent exactement la même place dans l’espace. Que peut-on dire ?",
    format: "qcm",
    choices: [
      "Ils ont le même volume.",
      "Ils ont la même masse.",
      "Ils ont le même périmètre.",
      "Ils ont la même couleur.",
    ],
    expected: ["Ils ont le même volume."],
    comparator: "mcq_exact",
    hint: "Le volume mesure la place occupée dans l’espace.",
    explanation:
      "Définition : le volume mesure la place occupée par un solide.\n\n" +
      "Méthode : si deux solides occupent la même place, ils ont le même volume.\n\n" +
      "Calcul : aucun calcul n’est nécessaire.\n\n" +
      "Conclusion : ils ont le même volume.",
    tags: ["volume", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "volume_comprendre_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "Une boîte est remplie par 4 rangées de 3 cubes unités, sur 2 étages. Combien de cubes unités contient-elle ?",
    format: "short",
    expected: ["24"],
    comparator: "number_equal",
    hint: "On calcule le nombre de cubes par étage, puis on multiplie par le nombre d’étages.",
    explanation:
      "Définition : le volume en cubes unités est le nombre total de cubes.\n\n" +
      "Méthode : on compte les cubes d’un étage, puis on multiplie par le nombre d’étages.\n\n" +
      "Calcul : $4 \\times 3 = 12$ cubes par étage, puis $12 \\times 2 = 24$.\n\n" +
      "Conclusion : la boîte contient 24 cubes unités.",
    tags: ["volume", "cubes_unite"],
  },

  {
    kind: "fixed",
    id: "volume_comprendre_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "Un solide est formé de 5 cubes unités. On le démonte et on range les 5 cubes autrement. Que devient son volume ?",
    format: "qcm",
    choices: [
      "Il reste égal à 5 unités de volume.",
      "Il augmente si les cubes sont plus étalés.",
      "Il diminue si les cubes sont plus serrés.",
      "Il dépend de la forme obtenue à la fin.",
    ],
    expected: ["Il reste égal à 5 unités de volume."],
    comparator: "mcq_exact",
    hint: "Le nombre de cubes n’a pas changé.",
    explanation:
      "Définition : le volume dépend du nombre de cubes unités, pas de leur disposition.\n\n" +
      "Méthode : on compte les cubes : il y en a toujours 5.\n\n" +
      "Calcul : 5 cubes restent 5 cubes.\n\n" +
      "Conclusion : le volume reste égal à 5 unités de volume.",
    tags: ["volume", "cubes_unite", "qcm"],
  },

  {
    kind: "fixed",
    id: "volume_comprendre_fixed_6",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Pour mesurer un volume, on choisit comme unité…",
    format: "qcm",
    choices: ["un cube", "un carré", "un segment", "un point"],
    expected: ["un cube"],
    comparator: "mcq_exact",
    hint: "Un volume est une grandeur en trois dimensions.",
    explanation:
      "Définition : un volume se mesure avec une unité en trois dimensions.\n\n" +
      "Méthode : on choisit un petit cube comme unité de volume.\n\n" +
      "Calcul : aucun calcul n’est nécessaire.\n\n" +
      "Conclusion : l’unité de volume est un cube.",
    tags: ["volume", "definition", "qcm"],
  },

  {
    kind: "template",
    id: "volume_comprendre_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_comprendre",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte les cubes unités de la couche.",
    tags: ["volume", "cubes_unite", "template", "canvas"],
    generate: () => {
      const cols = randomInt(2, 4);
      const rows = randomInt(2, 3);
      const n = cols * rows;
      const cubes: { x: number; y: number; z: number }[] = [];
      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          cubes.push({ x, y, z: 0 });
        }
      }
      const b = randomChoice(BRIQUES);
      const text = randomChoice([
        `Une seule couche de ${b.pl} est posée sur la table. Chaque ${b.sg} compte pour une unité de volume. Quel est le volume de la couche ?`,
        `Sur un plateau, on aligne des ${b.pl} en rangées, sur une seule épaisseur. Quel volume occupent-ils, si ${unB(b)} vaut une unité ?`,
        `Combien d’unités de volume compte cette plaque de ${b.pl} ? On prend ${unB(b)} comme unité.`,
        `Ce dallage de ${b.pl} n’a qu’un étage. Quel est son volume, en prenant ${unB(b)} comme unité ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation:
          `Définition : ${unB(b)} représente 1 unité de volume.\n\n` +
          `Méthode : on compte les rangées et le nombre de ${b.pl} par rangée.\n\n` +
          `Calcul : $${cols} \\times ${rows} = ${n}$.\n\n` +
          `Conclusion : le volume est ${n} unités de volume.`,
        canvas: solideCanvas({
          solide: "assemblage_cubes",
          cubes,
          display: { showLabels: true },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "volume_comprendre_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_comprendre",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les cubes par étage, puis multiplie par le nombre d’étages.",
    tags: ["volume", "cubes_unite", "template", "canvas"],
    generate: () => {
      const cols = randomInt(2, 3);
      const rows = randomInt(2, 3);
      const layers = randomInt(2, 3);
      const n = cols * rows * layers;
      const cubes: { x: number; y: number; z: number }[] = [];
      for (let z = 0; z < layers; z++) {
        for (let x = 0; x < cols; x++) {
          for (let y = 0; y < rows; y++) {
            cubes.push({ x, y, z });
          }
        }
      }
      const b = randomChoice(BRIQUES);
      const text = randomChoice([
        `Ce bloc de ${b.pl} compte ${layers} étages identiques. Quel est son volume, ${unB(b)} valant une unité ?`,
        `Pour trouver le volume de ce bloc de ${b.pl}, compte ceux d’un étage, puis multiplie par le nombre d’étages. Quel volume trouves-tu ?`,
        `On empile des ${b.pl} en un bloc régulier. Combien d’unités de volume occupe ce bloc, si ${unB(b)} vaut une unité ?`,
        `Quel est le volume de ce pavé formé de ${b.pl} ? (${cap(unB(b))} = 1 unité de volume.)`,
        `Un magasin range des ${b.pl} en un bloc de ${layers} étages. Combien en contient le bloc ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation:
          `Définition : le volume en cubes unités est le nombre total de cubes.\n\n` +
          `Méthode : on compte les cubes d’un étage, puis on multiplie par le nombre d’étages.\n\n` +
          `Calcul : $${cols} \\times ${rows} = ${cols * rows}$ par étage, puis $${cols * rows} \\times ${layers} = ${n}$.\n\n` +
          `Conclusion : le volume est ${n} unités de volume.`,
        canvas: solideCanvas({
          solide: "assemblage_cubes",
          cubes,
          display: { showLabels: true },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "volume_comprendre_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_comprendre",
    difficulty: 3,
    theme: "neutral",
    hint: "Le plus grand volume correspond au plus grand nombre de cubes.",
    tags: ["volume", "cubes_unite", "comparaison", "template"],
    generate: () => {
      const s = randomChoice([
        { un: "une tour", le: "la tour" },
        { un: "un mur", le: "le mur" },
        { un: "un escalier", le: "l’escalier" },
        { un: "un château", le: "le château" },
        { un: "un pont", le: "le pont" },
        { un: "une pyramide", le: "la pyramide" },
        { un: "une maison", le: "la maison" },
      ]);
      const b = randomChoice(BRIQUES);
      const [p1, p2] = deuxPrenoms();
      const nA = randomInt(5, 24);
      let nB = Math.random() < 0.15 ? nA : randomInt(5, 24);
      if (nB === nA && Math.random() < 0.5) nB = nA + randomInt(1, 4);
      const c1 = `${s.le} ${deP(p1)}`;
      const c2 = `${s.le} ${deP(p2)}`;
      const egal = "les deux ont le même volume";
      const correct = nA > nB ? c1 : nB > nA ? c2 : egal;
      const text = randomChoice([
        `${p1} construit ${s.un} avec ${nA} ${b.pl}. ${p2} construit ${s.un} avec ${nB} ${b.pl} identiques. Quelle construction a le plus grand volume ?`,
        `Quelle construction occupe le plus de place : ${c1} (${nA} ${b.pl}) ou ${c2} (${nB} ${b.pl}) ? Chaque ${b.sg} a le même volume.`,
        `On compare deux constructions en ${b.pl} identiques : ${c1} en compte ${nA}, ${c2} en compte ${nB}. Laquelle a le plus grand volume ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: [c1, c2, egal],
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          `Définition : quand l’unité est ${unB(b)}, le volume est le nombre de ${b.pl}.\n\n` +
          `Méthode : on compare les deux nombres de ${b.pl}.\n\n` +
          `Calcul : on compare ${nA} et ${nB}.\n\n` +
          `Conclusion : ${correct === egal ? "les deux constructions ont le même volume" : `${correct} a le plus grand volume`}.`,
      };
    },
  },

  {
    kind: "template",
    id: "volume_comprendre_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_comprendre",
    difficulty: 1,
    theme: "neutral",
    hint: "Un volume a trois dimensions, une aire deux, une longueur une seule.",
    tags: ["volume", "definition", "grandeur", "qcm", "template"],
    generate: () => {
      const g = randomChoice([
        { s: "la quantité d’eau que peut contenir une piscine", g: "un volume" },
        { s: "la place occupée par un carton dans un camion", g: "un volume" },
        { s: "la contenance d’une bouteille", g: "un volume" },
        { s: "la quantité de sable contenue dans une benne", g: "un volume" },
        { s: "la quantité d’air contenue dans un ballon", g: "un volume" },
        { s: "l’espace qu’occupe une armoire dans une chambre", g: "un volume" },
        { s: "la quantité de lait dans une brique", g: "un volume" },
        { s: "la capacité du réservoir d’une voiture", g: "un volume" },
        { s: "la quantité de béton nécessaire pour couler un pilier", g: "un volume" },
        { s: "la quantité de terre qui remplit une jardinière", g: "un volume" },
        { s: "la quantité d’eau de pluie stockée dans une citerne", g: "un volume" },
        { s: "la surface d’un mur à repeindre", g: "une aire" },
        { s: "la surface d’une nappe", g: "une aire" },
        { s: "la surface de l’écran d’un téléphone", g: "une aire" },
        { s: "la surface d’une pelouse à tondre", g: "une aire" },
        { s: "la place que prend un tapis sur le sol", g: "une aire" },
        { s: "la surface d’un champ de cannes à sucre", g: "une aire" },
        { s: "le tour d’une piste d’athlétisme", g: "une longueur" },
        { s: "la hauteur d’un arbre", g: "une longueur" },
        { s: "la distance entre deux villes", g: "une longueur" },
        { s: "la longueur de grillage pour clôturer un jardin", g: "une longueur" },
        { s: "la profondeur d’un puits", g: "une longueur" },
        { s: "ce que pèse un sac de pommes de terre", g: "une masse" },
        { s: "la masse d’un colis à envoyer", g: "une masse" },
        { s: "ce qu’indique une balance quand on pèse de la farine", g: "une masse" },
      ]);
      const text = randomChoice([
        `On veut connaître ${g.s}. Quelle grandeur mesure-t-on ?`,
        `${cap(g.s)} : de quelle grandeur s’agit-il ?`,
        `Pour décrire ${g.s}, quelle grandeur faut-il mesurer ?`,
        `Un élève cherche ${g.s}. Quelle grandeur calcule-t-il ?`,
      ]);
      const def: Record<string, string> = {
        "un volume": "un volume mesure une place occupée dans l’espace (trois dimensions) ; il s’exprime en cm³, dm³, m³ ou en litres",
        "une aire": "une aire mesure une surface (deux dimensions) ; elle s’exprime en cm², m²…",
        "une longueur": "une longueur se mesure dans une seule dimension, en cm, m, km…",
        "une masse": "une masse dit ce que pèse un objet, en g, kg…",
      };
      return {
        text,
        format: "qcm",
        choices: ["un volume", "une aire", "une longueur", "une masse"],
        expected: [g.g],
        comparator: "mcq_exact",
        explanation:
          `Définition : ${def[g.g]}.\n\n` +
          `Méthode : on se demande si l’on remplit un espace, si l’on couvre une surface, si l’on mesure une distance ou si l’on pèse.\n\n` +
          `Calcul : aucun calcul n’est nécessaire.\n\n` +
          `Conclusion : ${g.s}, c’est ${g.g}.`,
      };
    },
  },

  /* ---------- VOLUME_LIEN_AIRE ---------- */

  {
    kind: "fixed",
    id: "volume_lien_aire_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_lien_aire",
    difficulty: 1,
    theme: "neutral",
    text: "Dans la formule Volume = aire de base × hauteur, que représente l’aire de base ?",
    format: "qcm",
    choices: [
      "l’aire de la face sur laquelle repose le solide",
      "le périmètre de la face sur laquelle repose le solide",
      "l’aire de toutes les faces du solide additionnées",
      "l’aire de la face la plus grande du solide entier",
    ],
    expected: ["l’aire de la face sur laquelle repose le solide"],
    comparator: "mcq_exact",
    hint: "La base est la face du dessous, qui se répète tout le long de la hauteur.",
    explanation:
      "Définition : l’aire de base est l’aire de la face sur laquelle repose le solide.\n\n" +
      "Méthode : on identifie la base, puis on calcule son aire.\n\n" +
      "Calcul : aucun calcul n’est nécessaire ici.\n\n" +
      "Conclusion : l’aire de base est l’aire de la face d’appui du solide.",
    tags: ["volume", "aire_base", "qcm"],
  },

  {
    kind: "fixed",
    id: "volume_lien_aire_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_lien_aire",
    difficulty: 2,
    theme: "neutral",
    text: "L’aire de base d’un solide est 20 cm² et sa hauteur 5 cm. Quel est son volume ?",
    format: "qcm",
    choices: [
      "$100 \\text{ cm}^3$",
      "$25 \\text{ cm}^3$",
      "$4 \\text{ cm}^3$",
      "$15 \\text{ cm}^3$",
    ],
    expected: ["$100 \\text{ cm}^3$"],
    comparator: "mcq_exact",
    hint: "Volume = aire de base × hauteur.",
    explanation:
      "Définition : le volume vaut aire de base × hauteur.\n\n" +
      "Méthode : on multiplie l’aire de base par la hauteur.\n\n" +
      "Calcul : $20 \\times 5 = 100$.\n\n" +
      "Conclusion : le volume est $100 \\text{ cm}^3$.",
    tags: ["volume", "aire_base", "qcm"],
  },

  {
    kind: "fixed",
    id: "volume_lien_aire_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_lien_aire",
    difficulty: 1,
    theme: "neutral",
    text: "Si l’aire de base est en cm² et la hauteur en cm, dans quelle unité s’exprime le volume ?",
    format: "qcm",
    choices: [
      "$\\text{cm}^3$",
      "$\\text{cm}^2$",
      "$\\text{cm}$",
      "$\\text{L}$",
    ],
    expected: ["$\\text{cm}^3$"],
    comparator: "mcq_exact",
    hint: "On multiplie une aire (cm²) par une longueur (cm).",
    explanation:
      "Définition : multiplier une aire par une longueur donne un volume.\n\n" +
      "Méthode : $\\text{cm}^2 \\times \\text{cm} = \\text{cm}^3$.\n\n" +
      "Calcul : les unités se multiplient comme les nombres.\n\n" +
      "Conclusion : le volume est en $\\text{cm}^3$.",
    tags: ["volume", "aire_base", "unite", "qcm"],
  },

  {
    kind: "template",
    id: "volume_lien_aire_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_lien_aire",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplie l’aire de base par la hauteur.",
    tags: ["volume", "aire_base", "template"],
    generate: () => {
      const o = randomChoice(BASES);
      const aireBase = tirer(o.A);
      const hauteur = tirer(o.h);
      const volume = aireBase * hauteur;
      const u = o.u;
      const text = randomChoice([
        `Aire de la base : ${fr(aireBase)} ${u}². Hauteur : ${hauteur} ${u}. Donne le volume ${de(o.un)}, en ${u}³.`,
        `${cap(o.un)} mesure ${hauteur} ${u} de haut et sa base a une aire de ${fr(aireBase)} ${u}². Quel volume occupe-t-${o.il} ?`,
        `Pour ${o.un}, on sait que la base a une aire de ${fr(aireBase)} ${u}² et que la hauteur vaut ${hauteur} ${u}. Calcule son volume.`,
        `Combien de ${u}³ occupe ${o.un} dont la base a une aire de ${fr(aireBase)} ${u}² et dont la hauteur vaut ${hauteur} ${u} ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [num(volume)],
        comparator: "number_equal",
        explanation: explAireBase(aireBase, hauteur, u, du(o.un)),
      };
    },
  },

  {
    kind: "template",
    id: "volume_lien_aire_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_lien_aire",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour retrouver l’aire de base, on divise le volume par la hauteur.",
    tags: ["volume", "aire_base", "inverse", "template"],
    generate: () => {
      const o = randomChoice(BASES);
      const aireBase = tirer(o.A);
      const hauteur = tirer(o.h);
      const volume = aireBase * hauteur;
      const u = o.u;
      const text = randomChoice([
        `${cap(o.un)} a un volume de ${fr(volume)} ${u}³ et une hauteur de ${hauteur} ${u}. Quelle est l’aire de sa base, en ${u}² ?`,
        `Le volume ${de(o.un)} est ${fr(volume)} ${u}³. Sa hauteur mesure ${hauteur} ${u}. Calcule l’aire de sa base.`,
        `On sait ${que(o.un)} de ${hauteur} ${u} de hauteur occupe ${fr(volume)} ${u}³. Quelle est l’aire de sa base ?`,
        `Volume : ${fr(volume)} ${u}³. Hauteur : ${hauteur} ${u}. Retrouve l’aire de la base ${de(o.un)}, en ${u}².`,
      ]);
      return {
        text,
        format: "short",
        expected: [num(aireBase)],
        comparator: "number_equal",
        explanation:
          `Définition : comme Volume = aire de base × hauteur, on a aire de base = volume ÷ hauteur.\n\n` +
          `Méthode : on divise le volume par la hauteur.\n\n` +
          `Calcul : ${fr(volume)} ÷ ${hauteur} = ${fr(aireBase)}.\n\n` +
          `Conclusion : l’aire de la base ${du(o.un)} est ${fr(aireBase)} ${u}².`,
      };
    },
  },

  {
    kind: "template",
    id: "volume_lien_aire_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_lien_aire",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour retrouver la hauteur, on divise le volume par l’aire de base.",
    tags: ["volume", "aire_base", "inverse", "template"],
    generate: () => {
      const o = randomChoice(BASES);
      const aireBase = tirer(o.A);
      const hauteur = tirer(o.h);
      const volume = aireBase * hauteur;
      const u = o.u;
      const text = randomChoice([
        `${cap(o.un)} a un volume de ${fr(volume)} ${u}³ et une aire de base de ${fr(aireBase)} ${u}². Quelle est sa hauteur ?`,
        `La base ${de(o.un)} a une aire de ${fr(aireBase)} ${u}² et son volume est ${fr(volume)} ${u}³. Calcule sa hauteur en ${u}.`,
        `Quelle hauteur faut-il donner à ${o.un} dont la base mesure ${fr(aireBase)} ${u}² pour obtenir un volume de ${fr(volume)} ${u}³ ?`,
        `Volume : ${fr(volume)} ${u}³. Aire de la base : ${fr(aireBase)} ${u}². Retrouve la hauteur ${de(o.un)}.`,
      ]);
      return {
        text,
        format: "short",
        expected: [num(hauteur)],
        comparator: "number_equal",
        explanation:
          `Définition : comme Volume = aire de base × hauteur, on a hauteur = volume ÷ aire de base.\n\n` +
          `Méthode : on divise le volume par l’aire de base.\n\n` +
          `Calcul : ${fr(volume)} ÷ ${fr(aireBase)} = ${hauteur}.\n\n` +
          `Conclusion : la hauteur ${du(o.un)} est ${hauteur} ${u}.`,
      };
    },
  },

  {
    kind: "template",
    id: "volume_lien_aire_tpl_6",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_lien_aire",
    difficulty: 4,
    theme: "neutral",
    hint: "On utilise l’aire de la base, pas son périmètre.",
    tags: ["volume", "aire_base", "piege", "template"],
    generate: () => {
      const o = randomChoice(CARRES);
      let cote = tirer(o.c);
      while (cote === 4) cote = tirer(o.c);
      const hauteur = tirer(o.h);
      const u = o.u;
      const aireBase = cote * cote;
      const perimetre = cote * 4;
      const volume = aireBase * hauteur;
      const juste = Math.random() < 0.3;
      const x = juste ? aireBase : perimetre;
      const text = randomChoice([
        `Pour ${o.un} à base carrée (côté ${cote} ${u}, hauteur ${hauteur} ${u}), un élève calcule ${x} × ${hauteur} = ${fr(x * hauteur)}. A-t-il bien calculé le volume ?`,
        `${cap(o.un)} a une base carrée de ${cote} ${u} de côté et mesure ${hauteur} ${u} de haut. Une élève écrit : V = ${x} × ${hauteur} = ${fr(x * hauteur)} ${u}³. Son calcul est-il juste ?`,
        `Volume ${de(o.un)} à base carrée de côté ${cote} ${u} et de hauteur ${hauteur} ${u} : on propose ${x} × ${hauteur} = ${fr(x * hauteur)} ${u}³. Est-ce le bon volume ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [juste ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          `Définition : le volume vaut aire de base × hauteur, et non périmètre × hauteur.\n\n` +
          `Méthode : on calcule d’abord l’aire de la base carrée : côté × côté.\n\n` +
          `Calcul : aire de base = ${cote} × ${cote} = ${aireBase}, puis ${aireBase} × ${hauteur} = ${fr(volume)}.\n\n` +
          `Conclusion : ${juste ? "oui, le calcul utilise bien l’aire de la base" : `non, ${perimetre} est le périmètre de la base`} ; le volume est ${fr(volume)} ${u}³.`,
      };
    },
  },

  {
    kind: "template",
    id: "volume_lien_aire_tpl_7",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_lien_aire",
    difficulty: 1,
    theme: "neutral",
    hint: "Volume = aire de base × hauteur.",
    tags: ["volume", "aire_base", "formule", "qcm", "template"],
    generate: () => {
      const o = randomChoice(BASES);
      const A = tirer(o.A);
      const h = tirer(o.h);
      const u = o.u;
      const text = randomChoice([
        `${cap(o.un)} a la forme ${de(o.solide)} : l’aire de sa base est ${fr(A)} ${u}² et sa hauteur ${h} ${u}. Quel calcul donne son volume ?`,
        `On connaît l’aire de la base ${de(o.un)} (${fr(A)} ${u}²) et sa hauteur (${h} ${u}). Pour obtenir son volume, on calcule…`,
        `Pour ${o.un} de hauteur ${h} ${u}, dont la base a une aire de ${fr(A)} ${u}², quelle opération donne le volume ?`,
        `Hauteur : ${h} ${u}. Aire de la base : ${fr(A)} ${u}². Quel calcul permet de trouver le volume ${de(o.un)} ?`,
      ]);
      const correct = `${fr(A)} × ${h}`;
      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, [`${fr(A)} + ${h}`, `${fr(A)} × ${h} × ${h}`, `${fr(A)} ÷ ${h}`]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          `Définition : pour un prisme droit, un pavé droit ou un cylindre, Volume = aire de base × hauteur.\n\n` +
          `Méthode : on multiplie l’aire de la base par la hauteur.\n\n` +
          `Calcul : ${fr(A)} × ${h} = ${fr(A * h)}.\n\n` +
          `Conclusion : le bon calcul est ${correct}, soit ${fr(A * h)} ${u}³.`,
      };
    },
  },

  /* ---------- VOLUME_PAVE ---------- */

  {
    kind: "fixed",
    id: "volume_pave_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_pave",
    difficulty: 1,
    theme: "neutral",
    text: "Le volume d’un pavé droit se calcule par…",
    format: "qcm",
    choices: [
      "longueur × largeur × hauteur",
      "longueur + largeur + hauteur",
      "2 × (longueur + largeur)",
      "longueur × largeur",
    ],
    expected: ["longueur × largeur × hauteur"],
    comparator: "mcq_exact",
    hint: "On multiplie les trois dimensions.",
    explanation:
      "Définition : le volume d’un pavé droit est le produit de ses trois dimensions.\n\n" +
      "Méthode : on multiplie longueur, largeur et hauteur.\n\n" +
      "Calcul : aucun calcul n’est nécessaire ici.\n\n" +
      "Conclusion : Volume = longueur × largeur × hauteur.",
    tags: ["volume", "pave_droit", "formule", "qcm"],
  },

  {
    kind: "fixed",
    id: "volume_pave_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_pave",
    difficulty: 2,
    theme: "neutral",
    text: "Un cube a une arête de 3 cm. Quel est son volume ?",
    format: "qcm",
    choices: [
      "$27 \\text{ cm}^3$",
      "$9 \\text{ cm}^3$",
      "$18 \\text{ cm}^3$",
      "$12 \\text{ cm}^3$",
    ],
    expected: ["$27 \\text{ cm}^3$"],
    comparator: "mcq_exact",
    hint: "Un cube a ses trois dimensions égales.",
    explanation:
      "Définition : un cube est un pavé droit dont les trois dimensions sont égales.\n\n" +
      "Méthode : on multiplie l’arête par elle-même trois fois.\n\n" +
      "Calcul : $3 \\times 3 \\times 3 = 27$.\n\n" +
      "Conclusion : le volume est $27 \\text{ cm}^3$.",
    canvas: solideCanvas({
      solide: "pave_droit",
      dimensions: { longueur: 3, largeur: 3, hauteur: 3 },
      labels: { longueur: "3 cm", largeur: "3 cm", hauteur: "3 cm" },
      highlight: { base: true, hauteur: true },
      display: { showLabels: true, showDimensions: true },
    }),
    tags: ["volume", "cube", "canvas", "qcm"],
  },

  {
    kind: "fixed",
    id: "volume_pave_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_pave",
    difficulty: 2,
    theme: "neutral",
    text: "Une boîte cubique a une arête de 10 cm. Quel est son volume ?",
    format: "qcm",
    choices: [
      "$1000 \\text{ cm}^3$",
      "$100 \\text{ cm}^3$",
      "$300 \\text{ cm}^3$",
      "$30 \\text{ cm}^3$",
    ],
    expected: ["$1000 \\text{ cm}^3$"],
    comparator: "mcq_exact",
    hint: "Volume d’un cube = arête × arête × arête.",
    explanation:
      "Définition : le volume d’un cube est arête × arête × arête.\n\n" +
      "Méthode : on multiplie l’arête trois fois.\n\n" +
      "Calcul : $10 \\times 10 \\times 10 = 1000$.\n\n" +
      "Conclusion : le volume est $1000 \\text{ cm}^3$.",
    tags: ["volume", "cube", "qcm"],
  },

  {
    kind: "template",
    id: "volume_pave_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_pave",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplie l’arête par elle-même trois fois.",
    tags: ["volume", "cube", "template", "canvas"],
    generate: () => {
      const o = randomChoice(CUBES);
      const a = tirer(o.a);
      const volume = a * a * a;
      const u = o.u;
      const text = randomChoice([
        `${cap(o.un)} a la forme d’un cube de ${a} ${u} d’arête. Quel est son volume, en ${u}³ ?`,
        `Chaque arête ${de(o.un)} cubique mesure ${a} ${u}. Quel volume occupe-t-${o.il} ?`,
        `Quel est le volume ${de(o.un)} cubique de ${a} ${u} de côté ?`,
        `${cap(o.un)} cubique a des arêtes de ${a} ${u}. Combien de ${u}³ occupe-t-${o.il} ?`,
        `Calcule, en ${u}³, le volume ${de(o.un)} en forme de cube d’arête ${a} ${u}.`,
      ]);
      return {
        text,
        format: "short",
        expected: [num(volume)],
        comparator: "number_equal",
        explanation:
          `Définition : le volume d’un cube est arête × arête × arête.\n\n` +
          `Méthode : on multiplie l’arête trois fois par elle-même.\n\n` +
          `Calcul : ${a} × ${a} × ${a} = ${fr(volume)}.\n\n` +
          `Conclusion : le volume ${du(o.un)} est ${fr(volume)} ${u}³.`,
        canvas: solideCanvas({
          solide: "pave_droit",
          dimensions: { longueur: a, largeur: a, hauteur: a },
          labels: { longueur: `${a} ${u}`, largeur: `${a} ${u}`, hauteur: `${a} ${u}` },
          highlight: { base: true, hauteur: true },
          display: { showLabels: true, showDimensions: true },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "volume_pave_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_pave",
    difficulty: 3,
    theme: "neutral",
    hint: "Volume = longueur × largeur × hauteur.",
    tags: ["volume", "pave_droit", "template"],
    generate: () => {
      const o = randomChoice(PAVES);
      const longueur = tirer(o.L);
      const largeur = tirer(o.l);
      const hauteur = tirer(o.h);
      const volume = longueur * largeur * hauteur;
      const u = o.u;
      const text = randomChoice([
        `${cap(o.un)} mesure ${longueur} ${u} de long, ${largeur} ${u} de large et ${hauteur} ${u} de haut. Quel est son volume en ${u}³ ?`,
        `Dimensions ${de(o.un)} en forme de pavé droit : ${hauteur} ${u} de haut, ${longueur} ${u} de long, ${largeur} ${u} de large. Calcule son volume.`,
        `Quel est le volume ${de(o.un)} de ${longueur} ${u} de longueur, ${largeur} ${u} de largeur et ${hauteur} ${u} de hauteur ?`,
        `Un catalogue annonce les dimensions ${de(o.un)} : ${longueur} ${u} × ${largeur} ${u} × ${hauteur} ${u}. Quel est son volume ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [num(volume)],
        comparator: "number_equal",
        explanation: explPave(longueur, largeur, hauteur, u, du(o.un)),
      };
    },
  },

  {
    kind: "template",
    id: "volume_pave_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_pave",
    difficulty: 4,
    theme: "neutral",
    hint: "Pour retrouver une dimension, divise le volume par le produit des deux autres.",
    tags: ["volume", "pave_droit", "inverse", "template"],
    generate: () => {
      const o = randomChoice(PAVES);
      const longueur = tirer(o.L);
      const largeur = tirer(o.l);
      const hauteur = tirer(o.h);
      const volume = longueur * largeur * hauteur;
      const u = o.u;
      const chercheHauteur = Math.random() < 0.6;
      const connu1 = longueur;
      const connu2 = chercheHauteur ? largeur : hauteur;
      const rep = chercheHauteur ? hauteur : largeur;
      const mot = chercheHauteur ? "hauteur" : "largeur";
      const autre = chercheHauteur ? `${longueur} ${u} de long et ${largeur} ${u} de large` : `${longueur} ${u} de long et ${hauteur} ${u} de haut`;
      const text = randomChoice([
        `${cap(o.un)} a un volume de ${fr(volume)} ${u}³. ${o.il === "il" ? "Il" : "Elle"} mesure ${autre}. Quelle est sa ${mot} ?`,
        `Le volume ${de(o.un)} vaut ${fr(volume)} ${u}³ ; ${o.il} mesure ${autre}. Calcule sa ${mot}, en ${u}.`,
        `On sait ${que(o.un)} de ${autre} a un volume de ${fr(volume)} ${u}³. Retrouve sa ${mot}.`,
        `Volume ${de(o.un)} : ${fr(volume)} ${u}³ ; ${o.il} mesure ${autre}. Quelle est sa ${mot}, en ${u} ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [num(rep)],
        comparator: "number_equal",
        explanation:
          `Définition : le volume d’un pavé droit est le produit de ses trois dimensions, donc une dimension = volume ÷ (produit des deux autres).\n\n` +
          `Méthode : on multiplie les deux dimensions connues, puis on divise le volume par ce produit.\n\n` +
          `Calcul : ${connu1} × ${connu2} = ${fr(connu1 * connu2)}, puis ${fr(volume)} ÷ ${fr(connu1 * connu2)} = ${rep}.\n\n` +
          `Conclusion : la ${mot} ${du(o.un)} est ${rep} ${u}.`,
      };
    },
  },

  {
    kind: "template",
    id: "volume_pave_tpl_6",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_pave",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour un volume, on multiplie les trois dimensions (pas seulement deux).",
    tags: ["volume", "pave_droit", "piege", "template"],
    generate: () => {
      const o = randomChoice(PAVES);
      const longueur = tirer(o.L);
      const largeur = tirer(o.l);
      const hauteur = tirer(o.h);
      const volume = longueur * largeur * hauteur;
      const u = o.u;
      const cas = randomChoice(["oubli", "oubli", "somme", "juste"]);
      const propose = cas === "oubli" ? longueur * largeur : cas === "somme" ? longueur + largeur + hauteur : volume;
      const juste = propose === volume;
      const p = randomChoice(PRENOMS);
      const text = randomChoice([
        `Pour ${o.un} de ${longueur} ${u} sur ${largeur} ${u} et de ${hauteur} ${u} de hauteur, ${p} répond ${fr(propose)} ${u}³. Ce volume est-il juste ?`,
        `${cap(o.un)} mesure ${longueur} ${u} × ${largeur} ${u} × ${hauteur} ${u}. Un élève annonce un volume de ${fr(propose)} ${u}³. Est-ce juste ?`,
        `${p} calcule le volume ${de(o.un)} (longueur ${longueur} ${u}, largeur ${largeur} ${u}, hauteur ${hauteur} ${u}) et trouve ${fr(propose)} ${u}³. Son résultat est-il correct ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [juste ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          `Définition : le volume d’un pavé droit est longueur × largeur × hauteur.\n\n` +
          `Méthode : ${cas === "oubli" ? "ici, la hauteur a été oubliée" : cas === "somme" ? "ici, les dimensions ont été additionnées au lieu d’être multipliées" : "on vérifie en multipliant les trois dimensions"}.\n\n` +
          `Calcul : ${longueur} × ${largeur} × ${hauteur} = ${fr(volume)}.\n\n` +
          `Conclusion : le bon volume est ${fr(volume)} ${u}³ ; ${juste ? "le résultat est juste" : "le résultat proposé est faux"}.`,
      };
    },
  },

  {
    kind: "template",
    id: "volume_pave_tpl_7",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_pave",
    difficulty: 1,
    theme: "neutral",
    hint: "On multiplie les trois dimensions.",
    tags: ["volume", "pave_droit", "formule", "qcm", "template"],
    generate: () => {
      const o = randomChoice(PAVES);
      const L = tirer(o.L);
      const l = tirer(o.l);
      const h = tirer(o.h);
      const u = o.u;
      const text = randomChoice([
        `${cap(o.un)} a la forme d’un pavé droit de ${L} ${u} sur ${l} ${u}, et de ${h} ${u} de hauteur. Quel calcul donne son volume ?`,
        `Quel calcul donne le volume ${de(o.un)} de ${L} ${u} de long, ${l} ${u} de large et ${h} ${u} de haut ?`,
        `Longueur ${L} ${u}, largeur ${l} ${u}, hauteur ${h} ${u} : ce sont les dimensions ${de(o.un)}. Pour trouver son volume, on calcule…`,
        `On modélise ${o.un} par un pavé droit (${L} ${u} × ${l} ${u} × ${h} ${u}). Quelle opération donne son volume ?`,
      ]);
      const correct = `${L} × ${l} × ${h}`;
      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, [`${L} + ${l} + ${h}`, `${L} × ${l}`, `2 × (${L} + ${l}) × ${h}`]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          `Définition : le volume d’un pavé droit est longueur × largeur × hauteur.\n\n` +
          `Méthode : on multiplie les trois dimensions, on ne les additionne pas.\n\n` +
          `Calcul : ${L} × ${l} × ${h} = ${fr(L * l * h)}.\n\n` +
          `Conclusion : le bon calcul est ${correct}, soit ${fr(L * l * h)} ${u}³.`,
      };
    },
  },

  /* ---------- VOLUME_PRISME ---------- */

  {
    kind: "fixed",
    id: "volume_prisme_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_prisme",
    difficulty: 1,
    theme: "neutral",
    text: "Un prisme droit a deux bases identiques. Son volume se calcule par…",
    format: "qcm",
    choices: [
      "aire de base × hauteur",
      "périmètre de base × hauteur",
      "aire de base + hauteur",
      "aire de base × aire de base",
    ],
    expected: ["aire de base × hauteur"],
    comparator: "mcq_exact",
    hint: "On empile la base sur toute la hauteur.",
    explanation:
      "Définition : un prisme droit garde la même base le long de sa hauteur.\n\n" +
      "Méthode : on multiplie l’aire de cette base par la hauteur.\n\n" +
      "Calcul : aucun calcul n’est nécessaire ici.\n\n" +
      "Conclusion : Volume = aire de base × hauteur.",
    tags: ["volume", "prisme", "formule", "qcm"],
  },

  {
    kind: "fixed",
    id: "volume_prisme_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_prisme",
    difficulty: 2,
    theme: "neutral",
    text: "Un prisme droit a une base triangulaire d’aire 12 cm² et une hauteur de 5 cm. Quel est son volume ?",
    format: "qcm",
    choices: [
      "$60 \\text{ cm}^3$",
      "$17 \\text{ cm}^3$",
      "$30 \\text{ cm}^3$",
      "$120 \\text{ cm}^3$",
    ],
    expected: ["$60 \\text{ cm}^3$"],
    comparator: "mcq_exact",
    hint: "Volume = aire de base × hauteur.",
    explanation:
      "Définition : le volume d’un prisme droit est aire de base × hauteur.\n\n" +
      "Méthode : on multiplie l’aire de la base triangulaire par la hauteur.\n\n" +
      "Calcul : $12 \\times 5 = 60$.\n\n" +
      "Conclusion : le volume est $60 \\text{ cm}^3$.",
    tags: ["volume", "prisme", "triangle_base", "qcm"],
  },

  {
    kind: "fixed",
    id: "volume_prisme_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_prisme",
    difficulty: 3,
    theme: "neutral",
    text: "La base d’un prisme droit est un triangle rectangle dont les côtés de l’angle droit mesurent 3 cm et 4 cm. La hauteur du prisme est 10 cm. Quel est son volume ?",
    format: "qcm",
    choices: [
      "$60 \\text{ cm}^3$",
      "$120 \\text{ cm}^3$",
      "$70 \\text{ cm}^3$",
      "$30 \\text{ cm}^3$",
    ],
    expected: ["$60 \\text{ cm}^3$"],
    comparator: "mcq_exact",
    hint: "Aire d’un triangle rectangle = (côté × côté) ÷ 2.",
    explanation:
      "Définition : le volume d’un prisme droit est aire de base × hauteur.\n\n" +
      "Méthode : on calcule l’aire du triangle rectangle, puis on multiplie par la hauteur.\n\n" +
      "Calcul : aire $= (3 \\times 4) \\div 2 = 6$, puis $6 \\times 10 = 60$.\n\n" +
      "Conclusion : le volume est $60 \\text{ cm}^3$.",
    tags: ["volume", "prisme", "triangle_base", "qcm"],
  },

  {
    kind: "template",
    id: "volume_prisme_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_prisme",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplie l’aire de base par la hauteur.",
    tags: ["volume", "prisme", "template"],
    generate: () => {
      const o = randomChoice(PRISMES);
      const aireBase = tirer(o.A);
      const hauteur = tirer(o.h);
      const volume = aireBase * hauteur;
      const u = o.u;
      const text = randomChoice([
        `${cap(o.un)} a la forme d’un prisme droit. Sa base est ${o.base} d’aire ${fr(aireBase)} ${u}², et la distance entre ses deux bases est ${hauteur} ${u}. Calcule son volume.`,
        `Combien de ${u}³ occupe ${o.un}, prisme droit de ${hauteur} ${u} de hauteur dont la base a une aire de ${fr(aireBase)} ${u}² ?`,
        `La base ${de(o.un)} est ${o.base} de ${fr(aireBase)} ${u}² ; le prisme mesure ${hauteur} ${u} de hauteur. Donne son volume en ${u}³.`,
        `Aire de la base ${de(o.un)} : ${fr(aireBase)} ${u}². Hauteur du prisme : ${hauteur} ${u}. Quel est son volume ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [num(volume)],
        comparator: "number_equal",
        explanation:
          `Définition : le volume d’un prisme droit est aire de base × hauteur.\n\n` +
          `Méthode : l’aire ${o.duBase} est donnée ; on la multiplie par la hauteur du prisme.\n\n` +
          `Calcul : ${fr(aireBase)} × ${hauteur} = ${fr(volume)}.\n\n` +
          `Conclusion : le volume ${du(o.un)} est ${fr(volume)} ${u}³.`,
      };
    },
  },

  {
    kind: "template",
    id: "volume_prisme_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_prisme",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule d’abord l’aire du triangle de base.",
    tags: ["volume", "prisme", "triangle_base", "template"],
    generate: () => {
      const o = randomChoice(PRISMES_TRI);
      const base = tirer(o.b);
      const hauteurTriangle = tirer(o.ht);
      const hauteurPrisme = tirer(o.h);
      const aireBase = (base * hauteurTriangle) / 2;
      const volume = aireBase * hauteurPrisme;
      const u = o.u;
      const text = randomChoice([
        `${cap(o.un)} est un prisme droit. Sa base est un triangle dont un côté mesure ${base} ${u} et la hauteur correspondante ${hauteurTriangle} ${u}. Sa hauteur est ${hauteurPrisme} ${u}. Quel est son volume en ${u}³ ?`,
        `Quel est le volume ${de(o.un)} dont la section est un triangle (base ${base} ${u}, hauteur ${hauteurTriangle} ${u}) et la longueur ${hauteurPrisme} ${u} ?`,
        `On veut le volume ${de(o.un)}. Sa face avant est un triangle de ${base} ${u} de base et ${hauteurTriangle} ${u} de hauteur ; ${o.il} mesure ${hauteurPrisme} ${u} de profondeur. Calcule ce volume.`,
        `Aire du triangle, puis volume : ${o.un} a une base triangulaire (côté ${base} ${u}, hauteur ${hauteurTriangle} ${u}) et une hauteur de ${hauteurPrisme} ${u}. Quel est son volume ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [num(volume)],
        comparator: "number_equal",
        explanation:
          `Définition : le volume d’un prisme droit est aire de base × hauteur.\n\n` +
          `Méthode : on calcule l’aire du triangle de base (base × hauteur ÷ 2), puis on multiplie par la hauteur du prisme.\n\n` +
          `Calcul : aire = ${base} × ${hauteurTriangle} ÷ 2 = ${fr(aireBase)}, puis ${fr(aireBase)} × ${hauteurPrisme} = ${fr(volume)}.\n\n` +
          `Conclusion : le volume ${du(o.un)} est ${fr(volume)} ${u}³.`,
      };
    },
  },

  {
    kind: "template",
    id: "volume_prisme_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_prisme",
    difficulty: 3,
    theme: "neutral",
    hint: "La base est un rectangle : aire = longueur × largeur.",
    tags: ["volume", "prisme", "rectangle_base", "template"],
    generate: () => {
      const o = randomChoice(SECTIONS_RECT);
      const longueur = tirer(o.L);
      const largeur = tirer(o.l);
      const hauteur = tirer(o.h);
      const aireBase = longueur * largeur;
      const volume = aireBase * hauteur;
      const u = o.u;
      const text = randomChoice([
        `${cap(o.un)} est un prisme droit dont la base est un rectangle de ${longueur} ${u} sur ${largeur} ${u}. Sa hauteur est ${hauteur} ${u}. Quel est son volume ?`,
        `La section ${de(o.un)} est un rectangle de ${longueur} ${u} × ${largeur} ${u}, et ${o.il} mesure ${hauteur} ${u} de long. Calcule son volume.`,
        `Base rectangulaire de ${longueur} ${u} sur ${largeur} ${u}, hauteur de ${hauteur} ${u} : quel est le volume ${de(o.un)} ?`,
        `On coupe ${o.un} perpendiculairement à sa longueur : la coupe est un rectangle de ${longueur} ${u} sur ${largeur} ${u}. ${cap(o.il)} mesure ${hauteur} ${u} de long. Quel est son volume, en ${u}³ ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [num(volume)],
        comparator: "number_equal",
        explanation:
          `Définition : le volume d’un prisme droit est aire de base × hauteur.\n\n` +
          `Méthode : on calcule l’aire du rectangle de base, puis on multiplie par la hauteur (la longueur de l’objet).\n\n` +
          `Calcul : aire = ${longueur} × ${largeur} = ${fr(aireBase)}, puis ${fr(aireBase)} × ${hauteur} = ${fr(volume)}.\n\n` +
          `Conclusion : le volume ${du(o.un)} est ${fr(volume)} ${u}³.`,
      };
    },
  },

  {
    kind: "template",
    id: "volume_prisme_tpl_6",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_prisme",
    difficulty: 4,
    theme: "neutral",
    hint: "Volume = aire de base × hauteur : on retrouve l’inconnue par une division.",
    tags: ["volume", "prisme", "inverse", "template"],
    generate: () => {
      const o = randomChoice(PRISMES);
      const aireBase = tirer(o.A);
      const hauteur = tirer(o.h);
      const volume = aireBase * hauteur;
      const u = o.u;
      const chercheH = Math.random() < 0.6;
      const text = chercheH
        ? randomChoice([
            `${cap(o.un)} est un prisme droit de volume ${fr(volume)} ${u}³ ; sa base, ${o.base}, a une aire de ${fr(aireBase)} ${u}². Quelle est sa hauteur ?`,
            `Le volume ${de(o.un)} vaut ${fr(volume)} ${u}³ et l’aire ${o.duBase} de base vaut ${fr(aireBase)} ${u}². Calcule la hauteur du prisme.`,
            `Quelle hauteur faut-il pour ${que(o.un)}, prisme droit dont la base mesure ${fr(aireBase)} ${u}², ait un volume de ${fr(volume)} ${u}³ ?`,
          ])
        : randomChoice([
            `${cap(o.un)} est un prisme droit de ${hauteur} ${u} de hauteur et de volume ${fr(volume)} ${u}³. Quelle est l’aire de sa base ?`,
            `Le volume ${de(o.un)} vaut ${fr(volume)} ${u}³ pour une hauteur de ${hauteur} ${u}. Quelle est l’aire ${o.duBase} de base, en ${u}² ?`,
            `Retrouve l’aire de la base ${de(o.un)} : volume ${fr(volume)} ${u}³, hauteur du prisme ${hauteur} ${u}.`,
          ]);
      const rep = chercheH ? hauteur : aireBase;
      return {
        text,
        format: "short",
        expected: [num(rep)],
        comparator: "number_equal",
        explanation:
          `Définition : Volume = aire de base × hauteur, donc ${chercheH ? "hauteur = volume ÷ aire de base" : "aire de base = volume ÷ hauteur"}.\n\n` +
          `Méthode : on divise le volume par ${chercheH ? "l’aire de base" : "la hauteur"}.\n\n` +
          `Calcul : ${fr(volume)} ÷ ${chercheH ? fr(aireBase) : hauteur} = ${fr(rep)}.\n\n` +
          `Conclusion : ${chercheH ? `la hauteur est ${hauteur} ${u}` : `l’aire de la base est ${fr(aireBase)} ${u}²`}.`,
      };
    },
  },

  {
    kind: "template",
    id: "volume_prisme_tpl_7",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_prisme",
    difficulty: 1,
    theme: "neutral",
    hint: "Volume d’un prisme droit = aire de base × hauteur.",
    tags: ["volume", "prisme", "formule", "qcm", "template"],
    generate: () => {
      const o = randomChoice(PRISMES);
      const text = randomChoice([
        `${cap(o.un)} a la forme d’un prisme droit dont la base est ${o.base}. Son volume s’obtient en calculant…`,
        `${cap(o.un)} est un prisme droit ; sa base est ${o.base}. Quelle méthode donne son volume ?`,
        `Quelle méthode permet de calculer le volume ${de(o.un)}, prisme droit dont les deux bases sont des ${o.pl} identiques ?`,
        `On veut le volume ${de(o.un)}, un prisme droit à base en forme de ${o.base.replace(/^une? /, "")}. Que faut-il calculer ?`,
      ]);
      const correct = `l’aire ${o.duBase} multipliée par la hauteur du prisme`;
      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, [
          `le périmètre ${o.duBase} multiplié par la hauteur du prisme`,
          `l’aire ${o.duBase} ajoutée à la hauteur du prisme`,
          `l’aire ${o.duBase} multipliée par 2`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          `Définition : un prisme droit garde la même base tout le long de sa hauteur, donc Volume = aire de base × hauteur.\n\n` +
          `Méthode : ici la base est ${o.base} : on calcule son aire, puis on la multiplie par la hauteur du prisme.\n\n` +
          `Calcul : aucun calcul n’est nécessaire ici.\n\n` +
          `Conclusion : le volume ${du(o.un)} s’obtient avec ${correct}.`,
      };
    },
  },

  /* ---------- VOLUME_CYLINDRE ---------- */

  {
    kind: "fixed",
    id: "volume_cylindre_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_cylindre",
    difficulty: 1,
    theme: "neutral",
    text: "L’aire de base d’un cylindre (un disque) se calcule par…",
    format: "qcm",
    choices: [
      "$\\pi \\times r^2$",
      "$2 \\times \\pi \\times r$",
      "$\\pi \\times r$",
      "$r^2$",
    ],
    expected: ["$\\pi \\times r^2$"],
    comparator: "mcq_exact",
    hint: "L’aire d’un disque de rayon r est π × r².",
    explanation:
      "Définition : la base d’un cylindre est un disque.\n\n" +
      "Méthode : l’aire d’un disque de rayon $r$ est $\\pi \\times r^2$.\n\n" +
      "Calcul : aucun calcul n’est nécessaire ici.\n\n" +
      "Conclusion : l’aire de base est $\\pi \\times r^2$.",
    tags: ["volume", "cylindre", "aire_base", "qcm"],
  },

  {
    kind: "fixed",
    id: "volume_cylindre_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_cylindre",
    difficulty: 2,
    theme: "neutral",
    text: "Un cylindre a une aire de base de 9π cm² et une hauteur de 2 cm. Quel est son volume ?",
    format: "qcm",
    choices: [
      "$18\\pi \\text{ cm}^3$",
      "$11\\pi \\text{ cm}^3$",
      "$9\\pi \\text{ cm}^3$",
      "$36\\pi \\text{ cm}^3$",
    ],
    expected: ["$18\\pi \\text{ cm}^3$"],
    comparator: "mcq_exact",
    hint: "Volume = aire de base × hauteur.",
    explanation:
      "Définition : le volume d’un cylindre est aire de base × hauteur.\n\n" +
      "Méthode : on multiplie l’aire du disque par la hauteur.\n\n" +
      "Calcul : $9\\pi \\times 2 = 18\\pi$.\n\n" +
      "Conclusion : le volume est $18\\pi \\text{ cm}^3$.",
    tags: ["volume", "cylindre", "pi", "qcm"],
  },

  {
    kind: "fixed",
    id: "volume_cylindre_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_cylindre",
    difficulty: 2,
    theme: "neutral",
    text: "Un cylindre a une aire de base de 16π cm² et une hauteur de 5 cm. Quel est son volume ?",
    format: "qcm",
    choices: [
      "$80\\pi \\text{ cm}^3$",
      "$21\\pi \\text{ cm}^3$",
      "$16\\pi \\text{ cm}^3$",
      "$40\\pi \\text{ cm}^3$",
    ],
    expected: ["$80\\pi \\text{ cm}^3$"],
    comparator: "mcq_exact",
    hint: "Volume = aire de base × hauteur.",
    explanation:
      "Définition : le volume d’un cylindre est aire de base × hauteur.\n\n" +
      "Méthode : on multiplie l’aire du disque par la hauteur.\n\n" +
      "Calcul : $16\\pi \\times 5 = 80\\pi$.\n\n" +
      "Conclusion : le volume est $80\\pi \\text{ cm}^3$.",
    tags: ["volume", "cylindre", "pi", "qcm"],
  },

  {
    kind: "template",
    id: "volume_cylindre_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_cylindre",
    difficulty: 3,
    theme: "neutral",
    hint: "Aire de base = π × r², puis on multiplie par la hauteur.",
    tags: ["volume", "cylindre", "pi", "template", "canvas"],
    generate: () => {
      const o = randomChoice(CYLINDRES);
      const rayon = tirer(o.r);
      const hauteur = tirer(o.h);
      const r2 = rayon * rayon;
      const coeff = r2 * hauteur;
      const u = o.u;
      const text = randomChoice([
        `Le fond ${de(o.un)} est un disque de rayon ${rayon} ${u} ; ${o.il} mesure ${hauteur} ${u} de haut. Donne son volume exact sous la forme aπ.`,
        `Calcule l’aire de la base, puis le volume ${de(o.un)} : rayon ${rayon} ${u}, hauteur ${hauteur} ${u}. Réponds sous la forme aπ.`,
        `Quel volume occupe ${o.un} de ${hauteur} ${u} de hauteur et de ${rayon} ${u} de rayon ? Donne la valeur exacte, sous la forme aπ.`,
        `${cap(o.un)} : cylindre de hauteur ${hauteur} ${u}, rayon de la base ${rayon} ${u}. Quel est son volume, sous la forme aπ ?`,
      ]);
      return {
        text,
        format: "short",
        expected: piAttendus(coeff, u),
        comparator: "exact_text",
        explanation:
          `Définition : le volume d’un cylindre est π × rayon² × hauteur.\n\n` +
          `Méthode : on calcule l’aire du disque, puis on multiplie par la hauteur.\n\n` +
          `Calcul : π × ${rayon}² = ${r2}π, puis ${r2}π × ${hauteur} = ${coeff}π.\n\n` +
          `Conclusion : le volume ${du(o.un)} est ${coeff}π ${u}³.`,
        canvas: solideCanvas({
          solide: "cylindre",
          dimensions: { rayon, hauteur },
          labels: {
            rayon: `${rayon} ${u}`,
            hauteur: `${hauteur} ${u}`,
            aireBase: `${r2}π ${u}²`,
          },
          highlight: { base: true, hauteur: true },
          display: { showLabels: true, showDimensions: true, showFormulaHint: true },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "volume_cylindre_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_cylindre",
    difficulty: 3,
    theme: "neutral",
    hint: "Volume = π × r² × h : le rayon est au carré, pas la hauteur.",
    tags: ["volume", "cylindre", "pi", "qcm", "template"],
    generate: () => {
      const o = randomChoice(CYLINDRES);
      const rayon = Math.max(2, tirer(o.r));
      const hauteur = tirer(o.h);
      const u = o.u;
      const v = rayon * rayon * hauteur;
      const ecr = (k: number) => `${k}π ${u}³`;
      const correct = ecr(v);
      const text = randomChoice([
        `${cap(o.un)} a un rayon de ${rayon} ${u} et une hauteur de ${hauteur} ${u}. Quel est son volume exact ?`,
        `Quel est le volume ${de(o.un)} cylindrique de ${rayon} ${u} de rayon et de ${hauteur} ${u} de hauteur ?`,
        `Rayon de la base : ${rayon} ${u}. Hauteur : ${hauteur} ${u}. Parmi ces valeurs, laquelle est le volume ${de(o.un)} ?`,
        `On assimile ${o.un} à un cylindre de rayon ${rayon} ${u} et de hauteur ${hauteur} ${u}. Quel volume occupe-t-${o.il} ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, [
          ecr(2 * rayon * hauteur),
          ecr(rayon * hauteur),
          ecr(rayon * rayon + hauteur),
          ecr(4 * rayon * rayon * hauteur),
          ecr(rayon * hauteur * hauteur),
          ecr(2 * v),
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          `Définition : le volume d’un cylindre est aire de base × hauteur, soit π × r² × h.\n\n` +
          `Méthode : on calcule l’aire du disque (π × r²), puis on multiplie par la hauteur.\n\n` +
          `Calcul : π × ${rayon}² = ${rayon * rayon}π, puis ${rayon * rayon}π × ${hauteur} = ${v}π.\n\n` +
          `Conclusion : le volume ${du(o.un)} est ${v}π ${u}³.`,
      };
    },
  },

  {
    kind: "template",
    id: "volume_cylindre_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_cylindre",
    difficulty: 4,
    theme: "neutral",
    hint: "Volume = π × r² × hauteur, avec π ≈ 3,14.",
    tags: ["volume", "cylindre", "valeur_approchee", "template"],
    generate: () => {
      const o = randomChoice(CYLINDRES);
      const rayon = tirer(o.r);
      const hauteur = tirer(o.h);
      const u = o.u;
      const v = Math.round(3.14 * rayon * rayon * hauteur * 100) / 100;
      const text = randomChoice([
        `${cap(o.un)} a la forme d’un cylindre de rayon ${rayon} ${u} et de hauteur ${hauteur} ${u}. Calcule son volume en ${u}³ (prends π ≈ 3,14).`,
        `En prenant π ≈ 3,14, quel est le volume ${de(o.un)} de ${rayon} ${u} de rayon et ${hauteur} ${u} de hauteur ?`,
        `Rayon ${rayon} ${u}, hauteur ${hauteur} ${u} : donne une valeur approchée du volume ${de(o.un)}, avec π ≈ 3,14.`,
        `Quel volume, en ${u}³, occupe ${o.un} cylindrique de ${hauteur} ${u} de haut et de ${rayon} ${u} de rayon ? Utilise π ≈ 3,14.`,
      ]);
      return {
        text,
        format: "short",
        expected: [num(v), fr(v).replace(/ /g, "")],
        comparator: "number_equal",
        explanation:
          `Définition : le volume d’un cylindre est π × rayon² × hauteur.\n\n` +
          `Méthode : on remplace π par 3,14 et on calcule.\n\n` +
          `Calcul : 3,14 × ${rayon}² × ${hauteur} = 3,14 × ${rayon * rayon} × ${hauteur} = ${fr(v)}.\n\n` +
          `Conclusion : le volume ${du(o.un)} est environ ${fr(v)} ${u}³.`,
      };
    },
  },

  {
    kind: "template",
    id: "volume_cylindre_tpl_6",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_cylindre",
    difficulty: 4,
    theme: "neutral",
    hint: "Attention : on donne le diamètre, pas le rayon.",
    tags: ["volume", "cylindre", "diametre", "piege", "template"],
    generate: () => {
      const o = randomChoice(CYLINDRES);
      const rayon = tirer(o.r);
      const diametre = rayon * 2;
      const hauteur = tirer(o.h);
      const coeff = rayon * rayon * hauteur;
      const u = o.u;
      const text = randomChoice([
        `La base ${de(o.un)} est un disque de ${diametre} ${u} de diamètre ; ${o.il} mesure ${hauteur} ${u} de haut. Donne son volume exact, sous la forme aπ.`,
        `Sur un plan, ${o.un} est représenté par un cylindre de ${diametre} ${u} de diamètre et de ${hauteur} ${u} de hauteur. Quel est son volume, sous la forme aπ ?`,
        `Hauteur ${hauteur} ${u}, diamètre ${diametre} ${u} : calcule le volume exact ${de(o.un)}, sous la forme aπ.`,
        `${cap(o.un)} cylindrique mesure ${diametre} ${u} de large (son diamètre) et ${hauteur} ${u} de haut. Quel est son volume, sous la forme aπ ?`,
      ]);
      return {
        text,
        format: "short",
        expected: piAttendus(coeff, u),
        comparator: "exact_text",
        explanation:
          `Définition : le volume d’un cylindre est π × rayon² × hauteur.\n\n` +
          `Méthode : on trouve d’abord le rayon (la moitié du diamètre), puis on applique la formule.\n\n` +
          `Calcul : ${diametre} ÷ 2 = ${rayon}, puis π × ${rayon}² × ${hauteur} = ${coeff}π.\n\n` +
          `Conclusion : le volume ${du(o.un)} est ${coeff}π ${u}³.`,
      };
    },
  },

  {
    kind: "template",
    id: "volume_cylindre_tpl_7",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_cylindre",
    difficulty: 1,
    theme: "neutral",
    hint: "L’aire d’un disque de rayon r est π × r².",
    tags: ["volume", "cylindre", "aire_base", "pi", "qcm", "template"],
    generate: () => {
      // r ≥ 3 : à r = 2, 2r et r² coïncident et le QCM perdrait une ligne.
      const o = randomChoice(CYLINDRES.filter((c) => c.r[1] >= 3));
      const rayon = Math.max(3, tirer(o.r));
      const u = o.u;
      const correct = `${rayon * rayon}π ${u}²`;
      const text = randomChoice([
        `Le fond ${de(o.un)} est un disque de ${rayon} ${u} de rayon. Quelle est l’aire de cette base ?`,
        `${cap(o.un)} a la forme d’un cylindre de rayon ${rayon} ${u}. Quelle est l’aire de son disque de base ?`,
        `Quelle est l’aire de la base ${de(o.un)} cylindrique dont le rayon mesure ${rayon} ${u} ?`,
        `Pour calculer le volume ${de(o.un)}, on commence par l’aire de sa base, un disque de rayon ${rayon} ${u}. Que vaut cette aire ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, [
          `${2 * rayon}π ${u}²`,
          `${rayon}π ${u}²`,
          `${rayon * rayon} ${u}²`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          `Définition : la base d’un cylindre est un disque ; l’aire d’un disque de rayon r est π × r².\n\n` +
          `Méthode : on élève le rayon au carré, puis on multiplie par π.\n\n` +
          `Calcul : π × ${rayon}² = π × ${rayon * rayon} = ${rayon * rayon}π.\n\n` +
          `Conclusion : l’aire de la base ${du(o.un)} est ${rayon * rayon}π ${u}².`,
      };
    },
  },

  {
    kind: "template",
    id: "volume_cylindre_tpl_8",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_cylindre",
    difficulty: 2,
    theme: "neutral",
    hint: "Volume = aire de base × hauteur.",
    tags: ["volume", "cylindre", "pi", "qcm", "template"],
    generate: () => {
      const o = randomChoice(CYLINDRES);
      const rayon = Math.max(2, tirer(o.r));
      const hauteur = tirer(o.h);
      const u = o.u;
      const a = rayon * rayon;
      const v = a * hauteur;
      const ecr = (k: number) => `${k}π ${u}³`;
      const correct = ecr(v);
      const text = randomChoice([
        `La base ${de(o.un)} est un disque d’aire ${a}π ${u}², et sa hauteur est ${hauteur} ${u}. Quel est son volume ?`,
        `${cap(o.un)} cylindrique a une base d’aire ${a}π ${u}² et mesure ${hauteur} ${u} de haut. Quel volume occupe-t-${o.il} ?`,
        `Aire du disque de base : ${a}π ${u}². Hauteur : ${hauteur} ${u}. Quel est le volume ${de(o.un)} ?`,
        `Le volume ${de(o.un)} s’obtient en multipliant l’aire de sa base, ${a}π ${u}², par sa hauteur, ${hauteur} ${u}. Que vaut ce volume ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, [ecr(a + hauteur), ecr(a), ecr(2 * v), ecr(rayon * hauteur)]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          `Définition : le volume d’un cylindre est aire de base × hauteur.\n\n` +
          `Méthode : on multiplie l’aire du disque par la hauteur.\n\n` +
          `Calcul : ${a}π × ${hauteur} = ${v}π.\n\n` +
          `Conclusion : le volume ${du(o.un)} est ${v}π ${u}³.`,
      };
    },
  },

  {
    kind: "template",
    id: "volume_cylindre_tpl_9",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_cylindre",
    difficulty: 2,
    theme: "neutral",
    hint: "Volume = aire de base × hauteur.",
    tags: ["volume", "cylindre", "aire_base", "template"],
    generate: () => {
      const o = randomChoice(CYL_AIRES);
      const A = tirer(o.A);
      const h = tirer(o.h);
      const u = o.u;
      const text = randomChoice([
        `La base ${de(o.un)} a une aire de ${fr(A)} ${u}². Sa hauteur est ${h} ${u}. Quel est son volume, en ${u}³ ?`,
        `${cap(o.un)} a la forme d’un cylindre : disque de base de ${fr(A)} ${u}², hauteur de ${h} ${u}. Calcule son volume.`,
        `Quel volume, en ${u}³, occupe ${o.un} de ${h} ${u} de haut dont le fond a une aire de ${fr(A)} ${u}² ?`,
        `On connaît l’aire du disque de base ${de(o.un)} : ${fr(A)} ${u}². Sa hauteur vaut ${h} ${u}. Donne son volume.`,
      ]);
      return {
        text,
        format: "short",
        expected: [num(A * h)],
        comparator: "number_equal",
        explanation: explAireBase(A, h, u, du(o.un)),
      };
    },
  },

  /* ---------- VOLUME_UNITE ---------- */

  {
    kind: "fixed",
    id: "volume_unite_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_unite",
    difficulty: 2,
    theme: "neutral",
    text: "1 L correspond à…",
    format: "qcm",
    choices: ["1 dm³", "1 cm³", "1 m³", "10 dm³"],
    expected: ["1 dm³"],
    comparator: "mcq_exact",
    hint: "Le litre est l’unité de contenance liée au dm³.",
    explanation:
      "Définition : 1 litre correspond à 1 dm³.\n\n" +
      "Méthode : on retient l’égalité 1 L = 1 dm³.\n\n" +
      "Calcul : aucun calcul n’est nécessaire.\n\n" +
      "Conclusion : 1 L = 1 dm³.",
    tags: ["volume", "litre", "unite", "qcm"],
  },

  {
    kind: "fixed",
    id: "volume_unite_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_unite",
    difficulty: 3,
    theme: "neutral",
    text: "1 m³ correspond à combien de dm³ ?",
    format: "qcm",
    choices: ["1 000 dm³", "100 dm³", "10 dm³", "10 000 dm³"],
    expected: ["1 000 dm³"],
    comparator: "mcq_exact",
    hint: "1 m = 10 dm, donc 1 m³ = 10 × 10 × 10 dm³.",
    explanation:
      "Définition : convertir un volume demande de convertir les trois dimensions.\n\n" +
      "Méthode : comme 1 m = 10 dm, alors 1 m³ = 10 × 10 × 10 dm³.\n\n" +
      "Calcul : $10^3 = 1\\,000$.\n\n" +
      "Conclusion : 1 m³ = 1 000 dm³.",
    tags: ["volume", "conversion", "unite", "qcm"],
  },

  {
    kind: "template",
    id: "volume_unite_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_unite",
    difficulty: 2,
    theme: "neutral",
    hint: "1 L = 1 000 cm³.",
    tags: ["volume", "litre", "conversion", "template"],
    generate: () => {
      const o = randomChoice(LIQUIDES);
      const litres = tirer(o.L);
      const cm3 = litres * 1000;
      const versCm3 = Math.random() < 0.5;
      const text = versCm3
        ? randomChoice([
            `${cap(o.un)} contient ${litres} L ${o.liq}. Combien de cm³ cela représente-t-il ?`,
            `La contenance ${de(o.un)} est de ${litres} L. Exprime-la en cm³.`,
            `Convertis en cm³ le volume ${de(o.un)} : ${litres} L.`,
          ])
        : randomChoice([
            `${cap(o.un)} contient ${fr(cm3)} cm³ ${o.liq}. Combien de litres cela fait-il ?`,
            `Exprime en litres la contenance ${de(o.un)}, qui est de ${fr(cm3)} cm³.`,
            `${fr(cm3)} cm³ : c’est le volume ${o.liq} dans ${o.un}. Combien de litres ?`,
          ]);
      return {
        text,
        format: "short",
        expected: [num(versCm3 ? cm3 : litres)],
        comparator: "number_equal",
        explanation:
          `Définition : 1 L = 1 dm³ = 1 000 cm³.\n\n` +
          `Méthode : ${versCm3 ? "on multiplie le nombre de litres par 1 000" : "on divise le nombre de cm³ par 1 000"}.\n\n` +
          `Calcul : ${versCm3 ? `${litres} × 1 000 = ${fr(cm3)}` : `${fr(cm3)} ÷ 1 000 = ${litres}`}.\n\n` +
          `Conclusion : ${litres} L = ${fr(cm3)} cm³.`,
      };
    },
  },

  {
    kind: "template",
    id: "volume_unite_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_unite",
    difficulty: 3,
    theme: "neutral",
    hint: "1 dm³ = 1 000 cm³.",
    tags: ["volume", "conversion", "template"],
    generate: () => {
      // Chaque objet porte des volumes plausibles (en dm³).
      const [sujet, volumes] = randomChoice([
        ["une brique de lait", [1]], ["un carton à chaussures", [6, 7.5, 9]], ["une boîte de céréales", [4, 4.5, 5]],
        ["un bocal", [0.5, 0.75, 1]], ["un ballon de baudruche gonflé", [2, 3, 4.5]], ["une boîte de mouchoirs", [2, 2.5, 3]],
        ["un pot de fleurs", [2, 3, 4]], ["une bouteille de sirop", [0.75, 1]], ["une citrouille", [3, 5, 8]],
        ["un melon", [1.5, 2]], ["un dictionnaire", [1.5, 2, 2.5]], ["un sac de riz", [1, 2]],
        ["une boîte à outils", [8, 10, 12]], ["un pot de miel de letchi", [0.5, 1]],
      ] as [string, number[]][]);
      const dm3 = randomChoice(volumes);
      const cm3 = dm3 * 1000;
      const versDm3 = Math.random() < 0.5;
      const text = versDm3
        ? randomChoice([
            `Le volume ${de(sujet)} est de ${fr(cm3)} cm³. Combien de dm³ cela fait-il ?`,
            `${cap(sujet)} occupe ${fr(cm3)} cm³. Exprime ce volume en dm³.`,
            `Convertis en dm³ : ${sujet} de ${fr(cm3)} cm³.`,
          ])
        : randomChoice([
            `Le volume ${de(sujet)} est de ${fr(dm3)} dm³. Combien de cm³ cela fait-il ?`,
            `${cap(sujet)} occupe ${fr(dm3)} dm³. Exprime ce volume en cm³.`,
            `Convertis en cm³ : ${sujet} de ${fr(dm3)} dm³.`,
          ]);
      return {
        text,
        format: "short",
        expected: [num(versDm3 ? dm3 : cm3)],
        comparator: "number_equal",
        explanation:
          `Définition : 1 dm = 10 cm, donc 1 dm³ = 10 × 10 × 10 cm³ = 1 000 cm³.\n\n` +
          `Méthode : ${versDm3 ? "on divise le nombre de cm³ par 1 000" : "on multiplie le nombre de dm³ par 1 000"}.\n\n` +
          `Calcul : ${versDm3 ? `${fr(cm3)} ÷ 1 000 = ${fr(dm3)}` : `${fr(dm3)} × 1 000 = ${fr(cm3)}`}.\n\n` +
          `Conclusion : ${fr(dm3)} dm³ = ${fr(cm3)} cm³.`,
      };
    },
  },

  {
    kind: "template",
    id: "volume_unite_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_unite",
    difficulty: 3,
    theme: "neutral",
    hint: "1 m³ = 1 000 dm³.",
    tags: ["volume", "conversion", "template"],
    generate: () => {
      const o = randomChoice([
        { un: "une salle de classe", m3: [150, 240, 10] },
        { un: "un camion de déménagement", m3: [12, 30, 2] },
        { un: "une benne à gravats", m3: [6, 15] },
        { un: "un conteneur maritime", m3: [33, 67, 34] },
        { un: "une chambre", m3: [25, 40, 5] },
        { un: "un garage", m3: [40, 60, 5] },
        { un: "un tas de compost", m3: [2, 5] },
        { un: "une remorque de bois", m3: [3, 8] },
        { un: "un ascenseur", m3: [5, 9] },
        { un: "une serre de jardin", m3: [10, 25, 5] },
        { un: "un silo à grains", m3: [100, 400, 50] },
        { un: "une cave à vin", m3: [20, 50, 10] },
        { un: "un tas de sable de chantier", m3: [3, 9] },
        { un: "une tente de réception", m3: [60, 150, 10] },
      ] as { un: string; m3: Plage }[]);
      const m3 = tirer(o.m3);
      const dm3 = m3 * 1000;
      const versDm3 = Math.random() < 0.6;
      const text = versDm3
        ? randomChoice([
            `Le volume ${de(o.un)} est de ${fr(m3)} m³. Combien de dm³ cela fait-il ?`,
            `${cap(o.un)} occupe ${fr(m3)} m³. Exprime ce volume en dm³.`,
            `Convertis en dm³ le volume ${de(o.un)} : ${fr(m3)} m³.`,
          ])
        : randomChoice([
            `Le volume ${de(o.un)} est de ${fr(dm3)} dm³. Combien de m³ cela fait-il ?`,
            `${cap(o.un)} occupe ${fr(dm3)} dm³. Exprime ce volume en m³.`,
            `Convertis en m³ le volume ${de(o.un)} : ${fr(dm3)} dm³.`,
          ]);
      return {
        text,
        format: "short",
        expected: [num(versDm3 ? dm3 : m3)],
        comparator: "number_equal",
        explanation:
          `Définition : 1 m = 10 dm, donc 1 m³ = 10 × 10 × 10 dm³ = 1 000 dm³.\n\n` +
          `Méthode : ${versDm3 ? "on multiplie le nombre de m³ par 1 000" : "on divise le nombre de dm³ par 1 000"}.\n\n` +
          `Calcul : ${versDm3 ? `${fr(m3)} × 1 000 = ${fr(dm3)}` : `${fr(dm3)} ÷ 1 000 = ${fr(m3)}`}.\n\n` +
          `Conclusion : ${fr(m3)} m³ = ${fr(dm3)} dm³.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "volume_unite_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_unite",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève affirme : « 1 dm³ = 100 cm³ ». A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Pour un volume, on convertit les trois dimensions : 1 dm = 10 cm.",
    explanation:
      "Définition : convertir un volume demande de convertir les trois dimensions.\n\n" +
      "Méthode : comme 1 dm = 10 cm, alors 1 dm³ = 10 × 10 × 10 cm³.\n\n" +
      "Calcul : $10^3 = 1\\,000$, pas 100.\n\n" +
      "Conclusion : l’élève a tort, 1 dm³ = 1 000 cm³.",
    tags: ["volume", "conversion", "piege", "qcm"],
  },

  {
    kind: "template",
    id: "volume_unite_tpl_6",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_unite",
    difficulty: 1,
    theme: "neutral",
    hint: "Une unité de volume porte un exposant 3.",
    tags: ["volume", "unite", "qcm", "template"],
    generate: () => {
      const o = randomChoice([
        { d: "le volume d’une piscine", u: "m", m: "t" },
        { d: "le volume d’un dé à jouer", u: "cm", m: "g" },
        { d: "le volume d’une salle de classe", u: "m", m: "kg" },
        { d: "le volume d’une boîte d’allumettes", u: "cm", m: "g" },
        { d: "le volume d’un aquarium", u: "dm", m: "kg" },
        { d: "le volume d’un carton de déménagement", u: "dm", m: "kg" },
        { d: "le volume d’un morceau de sucre", u: "cm", m: "g" },
        { d: "le volume d’un conteneur", u: "m", m: "t" },
        { d: "le volume d’une gomme", u: "cm", m: "g" },
        { d: "le volume d’un silo à grains", u: "m", m: "t" },
        { d: "le volume d’un réfrigérateur", u: "dm", m: "kg" },
        { d: "le volume d’une valise", u: "dm", m: "kg" },
        { d: "le volume d’une benne de chantier", u: "m", m: "t" },
        { d: "le volume d’un glaçon", u: "cm", m: "g" },
        { d: "le volume d’une citerne", u: "m", m: "t" },
        { d: "le volume d’une brique de jus", u: "cm", m: "g" },
        { d: "le volume d’un four à micro-ondes", u: "dm", m: "kg" },
        { d: "le volume d’un hangar", u: "m", m: "t" },
        { d: "le volume d’un bloc de pâte à modeler", u: "cm", m: "g" },
        { d: "le volume d’une niche pour chien", u: "dm", m: "kg" },
      ]);
      const text = randomChoice([
        `Pour exprimer ${o.d}, quelle unité convient ?`,
        `On veut donner ${o.d}. Dans quelle unité l’écrire ?`,
        `Parmi ces unités, laquelle permet d’exprimer ${o.d} ?`,
        `${cap(o.d)} s’exprime en…`,
      ]);
      const correct = `${o.u}³`;
      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, [`${o.u}²`, o.u, o.m]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          `Définition : un volume s’exprime dans une unité « au cube » (cm³, dm³, m³) ou en litres.\n\n` +
          `Méthode : ${o.u}² mesure une aire, ${o.u} une longueur, ${o.m} une masse ; seule ${o.u}³ mesure un volume.\n\n` +
          `Calcul : aucun calcul n’est nécessaire.\n\n` +
          `Conclusion : ${o.d} s’exprime en ${o.u}³.`,
      };
    },
  },

  {
    kind: "template",
    id: "volume_unite_tpl_7",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_unite",
    difficulty: 2,
    theme: "neutral",
    hint: "1 L = 1 dm³ : le nombre ne change pas.",
    tags: ["volume", "litre", "conversion", "template"],
    generate: () => {
      const o = randomChoice(LIQUIDES);
      const litres = tirer(o.L);
      const versDm3 = Math.random() < 0.5;
      const text = versDm3
        ? randomChoice([
            `${cap(o.un)} peut contenir ${litres} L. Quelle est sa contenance en dm³ ?`,
            `On verse ${litres} L ${o.liq} dans ${o.un}. Combien de dm³ cela représente-t-il ?`,
            `Exprime en dm³ la contenance ${de(o.un)} : ${litres} litres.`,
          ])
        : randomChoice([
            `Le volume intérieur ${de(o.un)} est de ${litres} dm³. Combien de litres ${o.liq} peut-${o.il} contenir ?`,
            `${cap(o.un)} a un volume intérieur de ${litres} dm³. Quelle est sa contenance en litres ?`,
            `${litres} dm³ : c’est le volume intérieur ${de(o.un)}. Combien de litres cela fait-il ?`,
          ]);
      return {
        text,
        format: "short",
        expected: [num(litres)],
        comparator: "number_equal",
        explanation:
          `Définition : 1 litre correspond exactement à 1 dm³.\n\n` +
          `Méthode : on remplace chaque litre par un dm³ (ou l’inverse) : le nombre ne change pas.\n\n` +
          `Calcul : ${litres} L = ${litres} dm³.\n\n` +
          `Conclusion : la réponse est ${litres}.`,
      };
    },
  },

  {
    kind: "template",
    id: "volume_unite_tpl_8",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_unite",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule le volume, puis convertis : 1 L = 1 dm³ = 1 000 cm³ et 1 m³ = 1 000 L.",
    tags: ["volume", "conversion", "litre", "pave", "template"],
    generate: () => {
      const o = randomChoice(PAVES.filter((p) => !/salle|allumettes/.test(p.un)));
      const L = tirer(o.L);
      const l = tirer(o.l);
      const h = tirer(o.h);
      const u = o.u;
      const v = L * l * h;
      const litres = u === "cm" ? v / 1000 : u === "dm" ? v : v * 1000;
      const text = randomChoice([
        `${cap(o.un)} mesure ${L} ${u} × ${l} ${u} × ${h} ${u} (dimensions intérieures). Quelle est sa contenance en litres ?`,
        `Combien de litres peut contenir ${o.un} de ${L} ${u} de long, ${l} ${u} de large et ${h} ${u} de haut ?`,
        `Les dimensions intérieures ${de(o.un)} sont ${L} ${u}, ${l} ${u} et ${h} ${u}. Calcule son volume, puis donne-le en litres.`,
        `Contenance ${de(o.un)}, en litres : longueur ${L} ${u}, largeur ${l} ${u}, hauteur ${h} ${u}.`,
      ]);
      const conv =
        u === "cm"
          ? `${fr(v)} cm³ = ${fr(v)} ÷ 1 000 L = ${fr(litres)} L`
          : u === "dm"
            ? `${fr(v)} dm³ = ${fr(litres)} L`
            : `${fr(v)} m³ = ${fr(v)} × 1 000 L = ${fr(litres)} L`;
      return {
        text,
        format: "short",
        expected: [num(litres)],
        comparator: "number_equal",
        explanation:
          `Définition : volume d’un pavé droit = longueur × largeur × hauteur ; 1 L = 1 dm³ = 1 000 cm³ et 1 m³ = 1 000 L.\n\n` +
          `Méthode : on calcule le volume en ${u}³, puis on convertit en litres.\n\n` +
          `Calcul : ${L} × ${l} × ${h} = ${fr(v)}, et ${conv}.\n\n` +
          `Conclusion : la contenance ${du(o.un)} est ${fr(litres)} L.`,
      };
    },
  },

  /* ---------- VOLUME_DEFIS ---------- */

  {
    kind: "fixed",
    id: "volume_defi_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un cube a une arête de 4 cm. Un pavé droit mesure 8 cm sur 4 cm et 2 cm de haut. Lequel a le plus grand volume ?",
    format: "qcm",
    choices: ["le cube", "le pavé", "ils ont le même volume", "impossible à dire"],
    expected: ["ils ont le même volume"],
    comparator: "mcq_exact",
    hint: "Calcule les deux volumes avant de comparer.",
    explanation:
      "Définition : on compare deux volumes en les calculant.\n\n" +
      "Méthode : volume d’un pavé droit = produit des trois dimensions.\n\n" +
      "Calcul : cube $= 4 \\times 4 \\times 4 = 64$ ; pavé $= 8 \\times 4 \\times 2 = 64$.\n\n" +
      "Conclusion : les deux ont le même volume, 64 cm³.",
    tags: ["volume", "defi", "comparaison", "qcm"],
  },

  {
    kind: "template",
    id: "volume_defi_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "1 L = 1 dm³ : le volume en dm³ donne directement le nombre de litres.",
    tags: ["volume", "defi", "litre", "pave", "template"],
    generate: () => {
      const o = randomChoice([
        { un: "un aquarium", L: [4, 9], l: [2, 4], h: [3, 5] },
        { un: "une baignoire", L: [14, 16], l: [6, 7], h: [4, 5] },
        { un: "une glacière", L: [4, 5], l: [3, 3], h: [3, 4] },
        { un: "un bac de rangement", L: [4, 6], l: [3, 4], h: [2, 3] },
        { un: "un vivarium", L: [6, 10], l: [3, 4], h: [3, 5] },
        { un: "une cuve de récupération d’eau de pluie", L: [8, 12], l: [5, 8], h: [8, 12] },
        { un: "un bac à fleurs", L: [6, 10], l: [2, 3], h: [2, 3] },
        { un: "un abreuvoir pour chevaux", L: [10, 15], l: [4, 5], h: [3, 4] },
        { un: "une piscine pour enfants", L: [15, 20], l: [10, 12], h: [2, 3] },
        { un: "un évier", L: [4, 5], l: [3, 4], h: [2, 2] },
        { un: "un bassin à poissons rouges", L: [8, 12], l: [5, 6], h: [3, 4] },
        { un: "un réservoir de chasse d’eau", L: [3, 4], l: [1, 2], h: [3, 3] },
        { un: "une auge de jardin", L: [6, 8], l: [3, 4], h: [2, 3] },
        { un: "un bac de lavage", L: [5, 6], l: [4, 4], h: [3, 4] },
        { un: "une cuve à fioul", L: [10, 15], l: [6, 8], h: [10, 12] },
      ] as { un: string; L: Plage; l: Plage; h: Plage }[]);
      const longueur = tirer(o.L);
      const largeur = tirer(o.l);
      const hauteur = tirer(o.h);
      const volume = longueur * largeur * hauteur;
      const seau = [10, 5, 2].find((s) => volume % s === 0 && volume / s >= 3);
      const avecSeaux = seau !== undefined && Math.random() < 0.4;
      const il = o.un.startsWith("une ") ? "elle" : "il";
      const q = avecSeaux
        ? `Combien de seaux de ${seau} L faut-il pour ${il === "elle" ? "la" : "le"} remplir ?`
        : `Combien de litres d’eau peut-${il} contenir ?`;
      const text = randomChoice([
        `${cap(o.un)} en forme de pavé droit mesure ${longueur} dm de long, ${largeur} dm de large et ${hauteur} dm de haut. ${q}`,
        `Dimensions intérieures ${de(o.un)} : ${longueur} dm × ${largeur} dm × ${hauteur} dm. ${q}`,
        `On veut remplir ${o.un} de ${hauteur} dm de profondeur, ${longueur} dm de longueur et ${largeur} dm de largeur. ${q}`,
        `${cap(o.un)} a un fond de ${longueur} dm sur ${largeur} dm et une hauteur de ${hauteur} dm. ${q}`,
      ]);
      const rep = avecSeaux ? volume / (seau as number) : volume;
      return {
        text,
        format: "short",
        expected: [num(rep)],
        comparator: "number_equal",
        explanation:
          `Définition : le volume d’un pavé droit est longueur × largeur × hauteur, et 1 dm³ = 1 L.\n\n` +
          `Méthode : on calcule le volume en dm³, qui donne directement le nombre de litres${avecSeaux ? ", puis on divise par la contenance d’un seau" : ""}.\n\n` +
          `Calcul : ${longueur} × ${largeur} × ${hauteur} = ${fr(volume)} dm³ = ${fr(volume)} L${avecSeaux ? `, puis ${fr(volume)} ÷ ${seau} = ${fr(rep)}` : ""}.\n\n` +
          `Conclusion : ${avecSeaux ? `il faut ${fr(rep)} seaux de ${seau} L` : `${le(o.un)} peut contenir ${fr(volume)} litres`}.`,
        canvas: solideCanvas({
          solide: "pave_droit",
          dimensions: { longueur, largeur, hauteur, volume },
          labels: {
            longueur: `${longueur} dm`,
            largeur: `${largeur} dm`,
            hauteur: `${hauteur} dm`,
            aireBase: `${fr(longueur * largeur)} dm²`,
          },
          highlight: { base: true, hauteur: true },
          display: { showLabels: true, showDimensions: true },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "volume_defi_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Volume d’un cylindre = π × r² × hauteur, avec π ≈ 3,14 ; puis 1 L = 1 000 cm³.",
    tags: ["volume", "defi", "cylindre", "valeur_approchee", "litre", "template"],
    generate: () => {
      const o = randomChoice([
        { un: "un seau", r: [10, 15], h: [20, 30] },
        { un: "une casserole", r: [10, 10], h: [10, 20] },
        { un: "un pot de fleurs", r: [10, 15], h: [20, 30] },
        { un: "une marmite", r: [15, 20], h: [20, 30] },
        { un: "une poubelle de cuisine", r: [15, 20], h: [30, 40] },
        { un: "un vase", r: [5, 10], h: [20, 30] },
        { un: "une carafe cylindrique", r: [5, 5], h: [20, 30] },
        { un: "un bocal", r: [5, 10], h: [10, 20] },
        { un: "un arrosoir cylindrique", r: [10, 10], h: [30, 40] },
        { un: "un bidon", r: [10, 15], h: [30, 40] },
        { un: "un aquarium cylindrique", r: [15, 20], h: [30, 40] },
        { un: "un fût de jardin", r: [20, 20], h: [40, 40] },
        { un: "une bouilloire", r: [5, 10], h: [20, 20] },
        { un: "un faitout", r: [10, 15], h: [10, 20] },
      ] as { un: string; r: [number, number]; h: [number, number] }[]);
      // On ne garde que les couples qui tombent au centième de litre près :
      // 3,14 × 15² × 30 = 21 195 cm³ donnerait 21,195 L, trop de chiffres.
      const couples = [o.r[0], o.r[1]]
        .flatMap((r) => [o.h[0], o.h[1]].map((h) => [r, h] as [number, number]))
        .filter(([r, h]) => (314 * r * r * h) % 1000 === 0);
      const [rayon, hauteur] = couples.length ? randomChoice(couples) : [10, 20];
      const cm3 = (314 * rayon * rayon * hauteur) / 100;
      const litres = cm3 / 1000;
      const text = randomChoice([
        `${cap(o.un)} a la forme d’un cylindre de rayon ${rayon} cm et de hauteur ${hauteur} cm. Combien de litres peut-il contenir ? (Prends π ≈ 3,14.)`,
        `Avec π ≈ 3,14, calcule la contenance en litres ${de(o.un)} cylindrique de ${rayon} cm de rayon et de ${hauteur} cm de haut.`,
        `On remplit ${o.un} cylindrique : rayon ${rayon} cm, hauteur ${hauteur} cm. Quel volume d’eau, en litres, faut-il ? (π ≈ 3,14)`,
        `Rayon ${rayon} cm, hauteur ${hauteur} cm : ce sont les dimensions intérieures ${de(o.un)}. Quelle est sa contenance en litres, avec π ≈ 3,14 ?`,
      ]).replace("peut-il", o.un.startsWith("une ") ? "peut-elle" : "peut-il");
      return {
        text,
        format: "short",
        expected: [num(litres)],
        comparator: "number_equal",
        explanation:
          `Définition : le volume d’un cylindre est π × rayon² × hauteur, et 1 L = 1 dm³ = 1 000 cm³.\n\n` +
          `Méthode : on calcule le volume en cm³ avec π ≈ 3,14, puis on divise par 1 000 pour l’avoir en litres.\n\n` +
          `Calcul : 3,14 × ${rayon}² × ${hauteur} = 3,14 × ${rayon * rayon} × ${hauteur} = ${fr(cm3)} cm³, puis ${fr(cm3)} ÷ 1 000 = ${fr(litres)} L.\n\n` +
          `Conclusion : ${le(o.un)} contient environ ${fr(litres)} L.`,
      };
    },
  },

  {
    kind: "template",
    id: "volume_defi_tpl_6",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Combien de petits cubes tiennent sur la longueur, la largeur et la hauteur ?",
    tags: ["volume", "defi", "denombrement", "template"],
    generate: () => {
      const o = randomChoice([
        { petits: "des dés", a: [2, 2], grand: "une boîte" },
        { petits: "des cubes de bouillon", a: [2, 2], grand: "un carton" },
        { petits: "des morceaux de sucre", a: [1, 1], grand: "une boîte en métal" },
        { petits: "des cubes en bois", a: [3, 3], grand: "une boîte à jouets" },
        { petits: "des boîtes cubiques", a: [10, 10], grand: "un meuble de rangement" },
        { petits: "des glaçons cubiques", a: [2, 2], grand: "un bac de congélation" },
        { petits: "des caisses cubiques", a: [50, 50], grand: "une remorque" },
        { petits: "des savons cubiques", a: [5, 5], grand: "un carton d’expédition" },
        { petits: "des cubes de construction", a: [4, 4], grand: "une petite malle" },
        { petits: "des briques de lait cubiques", a: [10, 10], grand: "une palette filmée" },
        { petits: "des blocs de mousse cubiques", a: [20, 20], grand: "un chariot de salle de sport" },
        { petits: "des cubes de fromage", a: [1, 1], grand: "une barquette" },
        { petits: "des cubes de sucre de canne réunionnais", a: [2, 2], grand: "une boîte" },
      ] as { petits: string; a: [number, number]; grand: string }[]);
      const a = o.a[0];
      const nL = randomInt(2, 6);
      const nl = randomInt(2, 4);
      const nh = randomInt(2, 4);
      const longueur = nL * a;
      const largeur = nl * a;
      const hauteur = nh * a;
      const total = nL * nl * nh;
      const text = randomChoice([
        `On range ${o.petits} de ${a} cm d’arête dans ${o.grand} en forme de pavé droit de ${longueur} cm × ${largeur} cm × ${hauteur} cm. Combien peut-on en ranger au maximum ?`,
        `${cap(o.grand)} mesure intérieurement ${longueur} cm de long, ${largeur} cm de large et ${hauteur} cm de haut. Combien peut-on y placer ${o.petits.replace(/^des /, "de ")} de ${a} cm d’arête ?`,
        `Pour remplir ${o.grand} (${longueur} cm sur ${largeur} cm, ${hauteur} cm de haut) avec ${o.petits} de ${a} cm de côté, combien en faut-il ?`,
        `Combien ${o.petits.replace(/^des /, "de ")} de ${a} cm d’arête tiennent dans ${o.grand} de ${hauteur} cm de haut, ${largeur} cm de large et ${longueur} cm de long ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation:
          `Définition : on compte combien de petits cubes tiennent dans chaque direction.\n\n` +
          `Méthode : on divise chaque dimension par l’arête du cube, puis on multiplie les résultats.\n\n` +
          `Calcul : ${longueur} ÷ ${a} = ${nL}, ${largeur} ÷ ${a} = ${nl}, ${hauteur} ÷ ${a} = ${nh}, puis ${nL} × ${nl} × ${nh} = ${total}.\n\n` +
          `Conclusion : on peut en ranger ${total}.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "volume_defi_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique comment passer d’un volume exprimé en dm³ à un volume exprimé en litres, et donne un exemple.",
    format: "open",
    expected: ["litre", "dm", "égal", "1"],
    comparator: "contains_keyword",
    hint: "Pense à l’égalité entre le litre et le dm³.",
    explanation:
      "Définition : le litre est l’unité de contenance liée au dm³.\n\n" +
      "Méthode : comme 1 L = 1 dm³, un volume en dm³ donne directement le même nombre de litres.\n\n" +
      "Calcul : par exemple, 5 dm³ = 5 L.\n\n" +
      "Conclusion : pour passer des dm³ aux litres, on garde le même nombre car 1 dm³ = 1 L.",
    tags: ["volume", "defi", "open", "litre"],
  },
];
