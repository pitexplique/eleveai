// Banque de questions Tutor V4 - Mathématiques 3e
// Notion : proba_experience — les probabilités, l'année du BREVET.
//
// Micros : proba_vocabulaire, proba_issue, proba_equiprobabilite,
// proba_evenement, proba_calculer, proba_evenement_contraire,
// proba_deux_epreuve, proba_defi.

import type {
  CanvasProbabilitesData,
  DifficultyLevel,
  TutorBankItemV4,
  TutorGeneratedQuestionV4,
} from "@/lib/tutor-v4/types";
import type { ArbreProbaNoeud, ArbreProbabilitesCanvasData } from "@/lib/tutor-v4/types_canvas";
import { PRENOMS, de, type Prenom } from "@/lib/tutor-v4/questionBank/6e/maths/entiers.bank";

/* =========================================================================
   ⛔⛔ 14/10/2026 — « DES QUESTIONS REVIENNENT », LES PROBABILITÉS DE 3e.
   Mesuré avant (scripts/mesurer-squelettes-coach.ts 3e proba_experience) :
   les 8 micros sous le seuil, 9 à 30 squelettes par micro, 9 à 18
   répétitions sur une série de 20 à la même étoile. Les gabarits tiraient des
   NOMBRES dans une phrase fixe (« Un sac contient # billes rouges et # billes
   bleues… ») : l'élève reconnaissait la phrase.
   Même méthode que Pythagore 3e (d8203652) et la 5e (e935b398) : chaque
   gabarit compose
     · une SITUATION : seize « urnes » (sac de billes, bonbons coco du marché
       de Saint-Paul, barquette de letchis, samoussas du pique-nique, tombola
       de la kermesse, cartes Pokémon, playlist maloya/séga, glaces du snack,
       graines du jardin créole, dossards du trail de Cilaos…) et quatorze
       expériences NUMÉROTÉES (dé, dé de jeu de rôle, roue de kermesse, loto
       de Saint-Gilles, tombola, places du car jaune, chambres du gîte de
       Cilaos…) ;
     · un ÉVÉNEMENT tiré (pair, multiple, premier, diviseur, « strictement
       supérieur à », « au moins », « A et B », « A ou B »…) ;
     · une TOURNURE (trois ou quatre façons de poser la même question).
   Le cran de 3e : la probabilité est une FRACTION (seule exception à la règle
   « ÷ »), écrite aussi en décimal ou en pourcentage ; la somme des
   probabilités vaut 1 ; p(non A) = 1 − p(A) ; deux épreuves (arbre, tableau,
   AVEC et SANS remise) ; équiprobabilité ou pas (dé truqué, roue aux
   secteurs inégaux) ; le vocabulaire (issue, événement, certain,
   impossible, incompatibles).
   ⭐ Réponses libres : `ecritures(a, b)` donne TOUTES les écritures acceptées
   (3/6, 1/2, 0,5, 50 %…) — le correcteur `fraction_decimal_equivalent` ne
   simplifie pas lui-même.
   ⭐ QCM : `qcmF` écarte les leurres de même VALEUR (jamais 2/4 à côté de
   1/2) ; les leurres sont de vraies erreurs (oublier le « 1 − », additionner
   au lieu de multiplier, confondre avec et sans remise, compter les couleurs
   au lieu des objets…).
========================================================================= */

type Q = TutorGeneratedQuestionV4;

/* =========================
   OUTILS
========================= */

const ri = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
const pick = <T,>(arr: readonly T[]): T => arr[Math.floor(Math.random() * arr.length)];
function melange<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
const maj = (s: string): string => (s.startsWith("« ") ? `« ${maj(s.slice(2))}` : s.charAt(0).toUpperCase() + s.slice(1));
const ilElle = (p: Prenom) => (p.f ? "elle" : "il");
/** « a », « a et b », « a, b et c ». */
const listeFr = (xs: string[]) => (xs.length <= 1 ? xs.join("") : `${xs.slice(0, -1).join(", ")} et ${xs[xs.length - 1]}`);
/** « a », « a ou b », « a, b ou c ». */
const listeOu = (xs: string[]) => (xs.length <= 1 ? xs.join("") : `${xs.slice(0, -1).join(", ")} ou ${xs[xs.length - 1]}`);
const range = (a: number, b: number) => Array.from({ length: Math.max(0, b - a + 1) }, (_, i) => a + i);
/** « de prendre », « d’attraper ». */
const deV = (s: string) => (/^[aeiouéèêh]/i.test(s) ? `d’${s}` : `de ${s}`);
/** « de billes », « d’attaquants ». */
const deN = (s: string) => (/^[aeiouéèêh]/i.test(s) ? `d’${s}` : `de ${s}`);
/** « le rouge », « l’orange ». */
const leC = (s: string) => (/^[aeiouéèêh]/i.test(s) ? `l’${s}` : `le ${s}`);
/** « que la bille », « qu’il », « qu’un ». */
const queV = (s: string) => (/^[aeiouéèêh]/i.test(s) ? `qu’${s}` : `que ${s}`);
function pgcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : pgcd(b, a % b);
}
const estPremier = (n: number) => n >= 2 && range(2, Math.floor(Math.sqrt(n))).every((d) => n % d !== 0);
/** 0.35 → « 0,35 ». */
function fr(x: number): string {
  const r = Math.round(x * 10000) / 10000;
  return String(r).replace(".", ",");
}

/* ---------- Les fractions ---------- */
type Fr = [number, number];
const red = (a: number, b: number): Fr => (a === 0 ? [0, 1] : [a / pgcd(a, b), b / pgcd(a, b)]);
/** Une fraction écrite pour l'écran : « $\dfrac{3}{8}$ », « $0$ », « $1$ » (si b = 1). */
const tf = (a: number, b: number) => (a === 0 ? "$0$" : b === 1 ? `$${a}$` : `$\\dfrac{${a}}{${b}}$`);
/** L'écriture décimale exacte de a/b, ou null si elle ne tombe pas juste (1/3…). */
function decimale(a: number, b: number): string | null {
  let d = red(a, b)[1];
  while (d % 2 === 0) d /= 2;
  while (d % 5 === 0) d /= 5;
  return d === 1 ? fr(a / b) : null;
}
/** « 37,5 % », ou null si le pourcentage ne tombe pas juste au centième. */
function pourcent(a: number, b: number): string | null {
  const v = (100 * a) / b;
  const r = Math.round(v * 100) / 100;
  return Math.abs(v - r) < 1e-9 ? `${fr(r)} %` : null;
}
/** « $\dfrac{6}{8}$ = $\dfrac{3}{4}$ = 0,75 = 75 % » : les égalités de l'explication. */
function egalites(a: number, b: number): string {
  const [n, d] = red(a, b);
  const t = [tf(a, b)];
  if (n !== a && d !== 1) t.push(tf(n, d));
  if (d === 1 && b !== 1) t.push(`$${n}$`);
  const dec = decimale(a, b);
  if (dec !== null && d !== 1) t.push(dec);
  const pc = pourcent(a, b);
  if (pc !== null && d !== 1) t.push(pc);
  return t.join(" = ");
}
/**
 * Toutes les écritures acceptées d'une probabilité a/b : la fraction
 * irréductible d'abord, puis les fractions égales (dont celle de l'énoncé),
 * le décimal (virgule et point) et le pourcentage quand ils tombent juste.
 */
function ecritures(a: number, b: number): string[] {
  const [n, d] = red(a, b);
  const out: string[] = [n === 0 ? "0" : n === d ? "1" : `${n}/${d}`];
  for (let m = 1; m <= 30 && d * m <= Math.max(b, 100); m++) if (d * m > 1) out.push(`${n * m}/${d * m}`);
  out.push(`${a}/${b}`);
  const dec = decimale(a, b);
  if (dec !== null) out.push(dec, dec.replace(",", "."));
  const pc = pourcent(a, b);
  if (pc !== null) out.push(pc, pc.replace(" ", ""));
  return [...new Set(out)];
}

/** Bonne réponse + trois leurres DISTINCTS au texte. */
function qcm(correct: string, leurres: string[]): string[] {
  const d = melange([...new Set(leurres)].filter((w) => w !== correct)).slice(0, 3);
  return melange([correct, ...d]);
}
/**
 * Un QCM de probabilités : la bonne fraction et trois leurres distincts EN
 * VALEUR (jamais 2/4 à côté de 1/2 : deux choix justes). Les pièges écrits
 * passent d'abord ; des voisins de secours complètent s'ils se recoupent.
 */
function qcmF(bon: Fr, pieges: Fr[], garder = 0): { choices: string[]; expected: string[] } {
  const v = (f: Fr) => f[0] / f[1];
  const secours: Fr[] = [
    [bon[0] + 1, bon[1]],
    [bon[0], bon[1] + 1],
    [bon[0] + 2, bon[1]],
    [bon[0], bon[1] + 2],
    [Math.max(bon[0] - 1, 1), bon[1] + 3],
  ];
  const pris: Fr[] = [];
  // Les `garder` premiers pièges (l'erreur que la question vise) passent toujours.
  for (const f of [...pieges.slice(0, garder), ...melange(pieges.slice(garder)), ...secours]) {
    if (pris.length === 3) break;
    if (!(f[1] > 0) || f[0] < 0 || !Number.isInteger(f[0]) || !Number.isInteger(f[1])) continue;
    if ([bon, ...pris].some((g) => Math.abs(v(g) - v(f)) < 1e-9)) continue;
    pris.push(f);
  }
  const c = tf(bon[0], bon[1]);
  return { choices: melange([c, ...pris.map((f) => tf(f[0], f[1]))]), expected: [c] };
}

const OUI_NON = ["oui", "non"];

function gab(
  id: string,
  microId: string,
  difficulty: DifficultyLevel,
  hint: string,
  tags: string[],
  generate: () => Q,
  theme: "neutral" | "reunion" = "neutral",
): TutorBankItemV4 {
  return {
    kind: "template",
    id,
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId,
    difficulty,
    theme,
    hint,
    tags: ["proba_experience", ...tags, "template"],
    generate,
  };
}

/* ---------- Les dessins ---------- */
const HEX = {
  rouge: "#ef4444",
  bleu: "#3b82f6",
  vert: "#22c55e",
  jaune: "#eab308",
  violet: "#a855f7",
  orange: "#f97316",
  rose: "#ec4899",
  noir: "#1f2937",
  blanc: "#d1d5db",
  marron: "#92400e",
  gris: "#6b7280",
} as const;

type DiceFace = 1 | 2 | 3 | 4 | 5 | 6;
const isDiceFace = (n: number): n is DiceFace => Number.isInteger(n) && n >= 1 && n <= 6;
function deCanvas(surligne?: number[]): CanvasProbabilitesData {
  return { kind: "probabilites", variant: "de", de: { faces: [1, 2, 3, 4, 5, 6], surligne: surligne?.filter(isDiceFace) } };
}
function roueCanvas(segments: { label: string; poids: number; couleur?: string }[]): CanvasProbabilitesData {
  return { kind: "probabilites", variant: "roue", roue: { segments } };
}
/** Pour les items figés : un sac dessiné, un rond par bille. */
function billesCanvas(elements: { label?: string; couleur: string }[]): CanvasProbabilitesData {
  return { kind: "probabilites", variant: "billes", billes: { elements } };
}
const couleurs = HEX;
function tableauCanvas(entetes: string[], lignes: string[][], casesSurlignees?: Array<[number, number]>): CanvasProbabilitesData {
  return { kind: "probabilites", variant: "tableau", tableau: { entetes, lignes, casesSurlignees } };
}
const roueNum = (N: number, surl: number[] = []) =>
  roueCanvas(range(1, N).map((i) => ({ label: String(i), poids: 1, couleur: surl.includes(i) ? HEX.jaune : undefined })));
function arbre(n1: { label: string; enfants: string[] }[]): ArbreProbabilitesCanvasData {
  const racineEnfants: ArbreProbaNoeud[] = n1.map((x) => ({ label: x.label, enfants: x.enfants.map((l) => ({ label: l })) }));
  return { kind: "arbre_proba", racineEnfants };
}

/* =========================================================================
   LES URNES : on tire UN objet au hasard ; il y en a de plusieurs SORTES.
   Une sorte sait s'écrire de toutes les façons dont l'énoncé a besoin :
     nom  : l'issue quand on note la sorte (« rouge », « letchi », « thon ») ;
     un   : « une bille rouge », « un letchi », « un samoussa au thon » ;
     des  : « 3 billes rouges », « 1 letchi » ;
     attr : ce qui suit « est » (« la bille tirée est rouge », « le fruit pris
            est un letchi », « le morceau choisi est du séga »).
========================================================================= */
type Objet = { s: string; p: string; f: boolean };
type Sorte = { nom: string; un: string; des: (n: number) => string; attr: string; c: string; l: string; marque?: string };
type CtxUrne = {
  o: Objet;
  sortes: Sorte[];
  pose: (p: Prenom, contenu: string) => string;
  tire: (p: Prenom) => string;
  /** Le verbe de l'événement : « tirer une bille rouge ». */
  verbe: string;
  /** Le sujet de l'événement : « la bille tirée est rouge ». */
  sujet: string;
  /** Ce que l'on note : « la couleur de la bille ». */
  note: string;
  /** Le contenant, pour comparer deux urnes : [nom, féminin]. */
  boite: [string, boolean];
  /** Deux tirages successifs ont-ils un sens (avec ou sans remise) ? */
  deuxTirages: boolean;
};

const ACC = {
  rouge: ["rouge", "rouge", "rouges", "rouges"],
  bleu: ["bleu", "bleue", "bleus", "bleues"],
  vert: ["vert", "verte", "verts", "vertes"],
  jaune: ["jaune", "jaune", "jaunes", "jaunes"],
  violet: ["violet", "violette", "violets", "violettes"],
  orange: ["orange", "orange", "orange", "orange"],
  rose: ["rose", "rose", "roses", "roses"],
  noir: ["noir", "noire", "noirs", "noires"],
  blanc: ["blanc", "blanche", "blancs", "blanches"],
} as const;
type Coul = keyof typeof ACC;
const art = (f: boolean) => (f ? "une" : "un");
function enCouleurs(o: Objet, cs: Coul[]): Sorte[] {
  return cs.map((c) => {
    const [ms, fs, mp, fp] = ACC[c];
    const sg = o.f ? fs : ms;
    const pl = o.f ? fp : mp;
    return {
      nom: sg,
      un: `${art(o.f)} ${o.s} ${sg}`,
      des: (n: number) => `${n} ${n > 1 ? o.p : o.s} ${n > 1 ? pl : sg}`,
      attr: sg,
      c: HEX[c],
      l: c === "blanc" ? "W" : c === "rose" ? "P" : c.charAt(0).toUpperCase(),
    };
  });
}
function enNoms(xs: [string, string, boolean, string][]): Sorte[] {
  return xs.map(([sg, pl, f, c]) => ({
    nom: sg,
    un: `${art(f)} ${sg}`,
    des: (n: number) => `${n} ${n > 1 ? pl : sg}`,
    attr: `${art(f)} ${sg}`,
    c,
    l: sg.charAt(0).toUpperCase(),
    marque: sg.charAt(0).toUpperCase(),
  }));
}
function enQualites(o: Objet, xs: { q: string; nom: string; c: string; attr?: string }[]): Sorte[] {
  return xs.map(({ q, nom, c, attr }) => ({
    nom,
    un: `${art(o.f)} ${o.s} ${q}`,
    des: (n: number) => `${n} ${n > 1 ? o.p : o.s} ${q}`,
    attr: attr ?? q,
    c,
    l: nom.charAt(0).toUpperCase(),
    marque: nom.charAt(0).toUpperCase(),
  }));
}

const O = {
  bille: { s: "bille", p: "billes", f: true },
  bonbon: { s: "bonbon coco", p: "bonbons coco", f: false },
  fruit: { s: "fruit", p: "fruits", f: false },
  samoussa: { s: "samoussa", p: "samoussas", f: false },
  ticket: { s: "ticket", p: "tickets", f: false },
  carte: { s: "carte", p: "cartes", f: true },
  morceau: { s: "morceau", p: "morceaux", f: false },
  joueur: { s: "joueur", p: "joueurs", f: false },
  jeton: { s: "jeton", p: "jetons", f: false },
  stylo: { s: "stylo", p: "stylos", f: false },
  glace: { s: "glace", p: "glaces", f: true },
  perle: { s: "perle", p: "perles", f: true },
  graine: { s: "graine", p: "graines", f: true },
  dossard: { s: "dossard", p: "dossards", f: false },
  ballon: { s: "ballon", p: "ballons", f: false },
} satisfies Record<string, Objet>;

const CTX_URNES: CtxUrne[] = [
  {
    o: O.bille,
    sortes: enCouleurs(O.bille, ["rouge", "bleu", "vert", "jaune", "noir", "blanc"]),
    pose: (p, c) => `Dans le sac ${de(p.nom)}, il y a ${c}.`,
    tire: (p) => `${p.nom} tire une bille au hasard.`,
    verbe: "tirer",
    sujet: "la bille tirée",
    note: "la couleur de la bille",
    boite: ["sac", false],
    deuxTirages: true,
  },
  {
    o: O.bonbon,
    sortes: enCouleurs(O.bonbon, ["rose", "blanc", "jaune", "vert"]),
    pose: (p, c) => `Au marché forain de Saint-Paul, ${p.nom} achète une boîte qui contient ${c}.`,
    tire: (p) => `${maj(ilElle(p))} en prend un au hasard, les yeux fermés.`,
    verbe: "prendre",
    sujet: "le bonbon pris",
    note: "la couleur du bonbon",
    boite: ["boîte", true],
    deuxTirages: true,
  },
  {
    o: O.fruit,
    sortes: enNoms([
      ["letchi", "letchis", false, "#be123c"],
      ["mangue", "mangues", true, HEX.jaune],
      ["ramboutan", "ramboutans", false, HEX.rouge],
      ["carambole", "caramboles", true, "#facc15"],
      ["goyavier", "goyaviers", false, HEX.violet],
    ]),
    pose: (_p, c) => `Au marché de Saint-Pierre, une barquette contient ${c}.`,
    tire: (p) => `${p.nom} prend un fruit au hasard.`,
    verbe: "prendre",
    sujet: "le fruit pris",
    note: "la sorte de fruit",
    boite: ["barquette", true],
    deuxTirages: true,
  },
  {
    o: O.samoussa,
    sortes: enQualites(O.samoussa, [
      { q: "au poulet", nom: "poulet", c: HEX.orange },
      { q: "au thon", nom: "thon", c: HEX.bleu },
      { q: "au fromage", nom: "fromage", c: HEX.jaune },
      { q: "aux légumes", nom: "légumes", c: HEX.vert },
    ]),
    pose: (_p, c) => `Pour le pique-nique de la classe, un sachet contient ${c}.`,
    tire: (p) => `${p.nom} prend un samoussa au hasard.`,
    verbe: "prendre",
    sujet: "le samoussa pris",
    note: "la garniture du samoussa",
    boite: ["sachet", false],
    deuxTirages: true,
  },
  {
    o: O.ticket,
    sortes: enCouleurs(O.ticket, ["vert", "jaune", "rose", "bleu", "blanc"]),
    pose: (_p, c) => `À la tombola de la kermesse, l’urne contient ${c}.`,
    tire: (p) => `${p.nom} tire un ticket au hasard.`,
    verbe: "tirer",
    sujet: "le ticket tiré",
    note: "la couleur du ticket",
    boite: ["urne", true],
    deuxTirages: true,
  },
  {
    o: O.carte,
    sortes: enQualites(O.carte, [
      { q: "de type Feu", nom: "Feu", c: HEX.rouge },
      { q: "de type Eau", nom: "Eau", c: HEX.bleu },
      { q: "de type Plante", nom: "Plante", c: HEX.vert },
      { q: "de type Électrik", nom: "Électrik", c: HEX.jaune },
      { q: "de type Psy", nom: "Psy", c: HEX.violet },
    ]),
    pose: (p, c) => `La pioche de cartes Pokémon ${de(p.nom)} contient ${c}.`,
    tire: (p) => `${maj(ilElle(p))} pioche une carte au hasard.`,
    verbe: "piocher",
    sujet: "la carte piochée",
    note: "le type de la carte",
    boite: ["pioche", true],
    deuxTirages: true,
  },
  {
    o: O.morceau,
    sortes: enQualites(O.morceau, [
      { q: "de maloya", nom: "maloya", c: HEX.marron, attr: "du maloya" },
      { q: "de séga", nom: "séga", c: HEX.orange, attr: "du séga" },
      { q: "de rap", nom: "rap", c: HEX.noir, attr: "du rap" },
      { q: "de dancehall", nom: "dancehall", c: HEX.vert, attr: "du dancehall" },
    ]),
    pose: (p, c) => `La playlist ${de(p.nom)} contient ${c}.`,
    tire: (p) => `${maj(ilElle(p))} lance la lecture aléatoire : un morceau est choisi au hasard.`,
    verbe: "tomber sur",
    sujet: "le morceau choisi",
    note: "le style du morceau",
    boite: ["playlist", true],
    deuxTirages: false,
  },
  {
    o: O.joueur,
    sortes: enNoms([
      ["gardien", "gardiens", false, HEX.jaune],
      ["défenseur", "défenseurs", false, HEX.bleu],
      ["milieu", "milieux", false, HEX.vert],
      ["attaquant", "attaquants", false, HEX.rouge],
    ]),
    pose: (_p, c) => `L’équipe de foot de Saint-André compte ${c}.`,
    tire: () => `L’entraîneur tire au sort le capitaine parmi eux.`,
    verbe: "désigner",
    sujet: "le capitaine",
    note: "le poste du capitaine",
    boite: ["équipe", true],
    deuxTirages: false,
  },
  {
    o: O.jeton,
    sortes: enCouleurs(O.jeton, ["rouge", "bleu", "vert", "jaune", "noir", "blanc"]),
    pose: (_p, c) => `À la kermesse de l’école, un bocal contient ${c}.`,
    tire: (p) => `${p.nom} pioche un jeton au hasard.`,
    verbe: "piocher",
    sujet: "le jeton pioché",
    note: "la couleur du jeton",
    boite: ["bocal", false],
    deuxTirages: true,
  },
  {
    o: O.stylo,
    sortes: enCouleurs(O.stylo, ["rouge", "bleu", "vert", "noir", "violet"]),
    pose: (p, c) => `Dans la trousse ${de(p.nom)}, il y a ${c}.`,
    tire: (p) => `${maj(ilElle(p))} attrape un stylo au hasard, sans regarder.`,
    verbe: "attraper",
    sujet: "le stylo attrapé",
    note: "la couleur du stylo",
    boite: ["trousse", true],
    deuxTirages: true,
  },
  {
    o: O.glace,
    sortes: enQualites(O.glace, [
      { q: "à la noix de coco", nom: "noix de coco", c: HEX.blanc },
      { q: "à la vanille", nom: "vanille", c: HEX.jaune },
      { q: "à la mangue", nom: "mangue", c: HEX.orange },
      { q: "au chocolat", nom: "chocolat", c: HEX.marron },
      { q: "au tamarin", nom: "tamarin", c: HEX.rouge },
    ]),
    pose: (_p, c) => `La glacière du snack de la plage de l’Hermitage contient ${c}.`,
    tire: (p) => `${p.nom} prend une glace au hasard.`,
    verbe: "prendre",
    sujet: "la glace prise",
    note: "le parfum de la glace",
    boite: ["glacière", true],
    deuxTirages: true,
  },
  {
    o: O.carte,
    sortes: enNoms([
      ["cœur", "cœurs", false, HEX.rouge],
      ["carreau", "carreaux", false, HEX.orange],
      ["pique", "piques", false, HEX.noir],
      ["trèfle", "trèfles", false, HEX.vert],
    ]),
    pose: (p, c) => `Pour un tour de magie, ${p.nom} garde seulement ${c}.`,
    tire: (p) => `${maj(ilElle(p))} fait tirer une carte au hasard à un ami.`,
    verbe: "tirer",
    sujet: "la carte tirée",
    note: "la couleur de la carte (cœur, carreau, pique ou trèfle)",
    boite: ["paquet", false],
    // « Elle la garde » n'a pas de sens : c'est l'ami qui tire.
    deuxTirages: false,
  },
  {
    o: O.perle,
    sortes: enCouleurs(O.perle, ["rouge", "bleu", "vert", "jaune", "violet", "blanc", "noir"]),
    pose: (p, c) => `Pour fabriquer un bracelet, ${p.nom} a une boîte avec ${c}.`,
    tire: (p) => `${maj(ilElle(p))} prend une perle au hasard.`,
    verbe: "prendre",
    sujet: "la perle prise",
    note: "la couleur de la perle",
    boite: ["boîte", true],
    deuxTirages: true,
  },
  {
    o: O.graine,
    sortes: enQualites(O.graine, [
      { q: "de piment", nom: "piment", c: HEX.rouge, attr: "une graine de piment" },
      { q: "de tomate", nom: "tomate", c: HEX.orange, attr: "une graine de tomate" },
      { q: "de brède", nom: "brède", c: HEX.vert, attr: "une graine de brède" },
      { q: "de citrouille", nom: "citrouille", c: HEX.jaune, attr: "une graine de citrouille" },
    ]),
    pose: (p, c) => `Dans le jardin créole de sa grand-mère, ${p.nom} trouve un sachet avec ${c}, toutes mélangées.`,
    tire: (p) => `${maj(ilElle(p))} en prend une au hasard pour la semer.`,
    verbe: "prendre",
    sujet: "la graine prise",
    note: "la plante que donnera la graine",
    boite: ["sachet", false],
    deuxTirages: true,
  },
  {
    o: O.dossard,
    sortes: enCouleurs(O.dossard, ["rouge", "bleu", "vert", "jaune", "orange", "blanc"]),
    pose: (_p, c) => `Avant le trail des jeunes à Cilaos, un sac contient ${c}.`,
    tire: (p) => `${p.nom} prend un dossard au hasard.`,
    verbe: "prendre",
    sujet: "le dossard pris",
    note: "la couleur du dossard",
    boite: ["sac", false],
    deuxTirages: true,
  },
  {
    o: O.ballon,
    sortes: enCouleurs(O.ballon, ["orange", "rouge", "bleu", "vert", "blanc"]),
    pose: (_p, c) => `Au club de basket de Saint-Benoît, un chariot contient ${c}.`,
    tire: (p) => `${p.nom} attrape un ballon au hasard.`,
    verbe: "attraper",
    sujet: "le ballon attrapé",
    note: "la couleur du ballon",
    boite: ["chariot", false],
    deuxTirages: true,
  },
];

type Urne = { ctx: CtxUrne; p: Prenom; s: Sorte[]; n: number[] };
/** Une urne de k sortes, de nMin à nMax objets chacune (ou les effectifs `ns`). */
function urne(k: number, nMin: number, nMax: number, opts: { ns?: number[]; minSortes?: number; deux?: boolean; distinctes?: boolean } = {}): Urne {
  const ctx = pick(
    CTX_URNES.filter(
      (c) =>
        c.sortes.length >= (opts.minSortes ?? k) &&
        (!opts.deux || c.deuxTirages) &&
        (!opts.distinctes || new Set(c.sortes.map((x) => x.l)).size === c.sortes.length),
    ),
  );
  const s = melange(ctx.sortes).slice(0, k);
  const n = opts.ns ?? s.map(() => ri(nMin, nMax));
  return { ctx, p: pick(PRENOMS), s, n };
}
const tot = (u: Urne) => u.n.reduce((a, b) => a + b, 0);
const contenu = (u: Urne) => listeFr(u.s.map((s, i) => s.des(u.n[i])));
const situation = (u: Urne) => `${u.ctx.pose(u.p, contenu(u))} ${u.ctx.tire(u.p)}`;
/** « billes rouges », « letchis », « samoussas au thon ». */
const plur = (s: Sorte) => s.des(2).replace(/^2 /, "");
/** « des billes rouges, des billes bleues et des billes vertes ». */
const desSortes = (ss: Sorte[]) => listeFr(ss.map((s) => `des ${plur(s)}`));
const evtTirer = (u: Urne, s: Sorte) => `${u.ctx.verbe} ${s.un}`;
const evtEst = (u: Urne, s: Sorte) => `${u.ctx.sujet} est ${s.attr}`;
/** L'événement, sous l'une de ses deux formes. */
const evtU = (u: Urne, s: Sorte) => (Math.random() < 0.5 ? evtTirer(u, s) : evtEst(u, s));
/** Le sac dessiné : un rond par objet (24 au plus). */
function canvasUrne(u: Urne): CanvasProbabilitesData | undefined {
  if (tot(u) > 24) return undefined;
  return {
    kind: "probabilites",
    variant: "billes",
    billes: { elements: u.s.flatMap((s, i) => Array.from({ length: u.n[i] }, () => ({ couleur: s.c, label: s.marque }))) },
  };
}

/* =========================================================================
   LES EXPÉRIENCES NUMÉROTÉES : N issues de 1 à N, équiprobables.
========================================================================= */
type CtxNum = {
  Ns: number[];
  m: "nombre" | "numéro";
  pose: (p: Prenom, N: number) => string;
  sujet: string;
  /** Pourquoi les issues sont équiprobables. */
  equi: string;
  canvas?: (N: number, surl?: number[]) => CanvasProbabilitesData;
};
const CTX_NUM: CtxNum[] = [
  { Ns: [6], m: "nombre", pose: (p) => `${p.nom} lance un dé équilibré à 6 faces, numérotées de 1 à 6.`, sujet: "le nombre obtenu", equi: "le dé est équilibré", canvas: (_N, s) => deCanvas(s) },
  { Ns: [4, 8, 10, 12, 20], m: "nombre", pose: (p, N) => `Pour un jeu de rôle, ${p.nom} lance un dé équilibré à ${N} faces, numérotées de 1 à ${N}.`, sujet: "le nombre obtenu", equi: "le dé est équilibré" },
  { Ns: [5, 6, 8, 10, 12], m: "nombre", pose: (p, N) => `À la kermesse du collège, une roue a ${N} secteurs de même taille, numérotés de 1 à ${N}. ${p.nom} la fait tourner.`, sujet: "le nombre obtenu", equi: "les secteurs ont tous la même taille", canvas: roueNum },
  { Ns: [10, 12, 15, 20, 25, 30], m: "numéro", pose: (p, N) => `Au loto de la fête de Saint-Gilles, un sac contient ${N} boules numérotées de 1 à ${N}. ${p.nom} en tire une au hasard.`, sujet: "le numéro tiré", equi: "les boules sont identiques au toucher" },
  { Ns: [20, 30, 40, 50], m: "numéro", pose: (p, N) => `Pour la tombola du collège, ${N} tickets numérotés de 1 à ${N} sont dans une urne. ${p.nom} en tire un au hasard.`, sujet: "le numéro tiré", equi: "les tickets sont identiques et bien mélangés" },
  { Ns: [8, 10, 12, 15, 20], m: "nombre", pose: (p, N) => `${p.nom} mélange ${N} cartes numérotées de 1 à ${N}, puis en tire une au hasard.`, sujet: "le nombre tiré", equi: "les cartes sont bien mélangées" },
  { Ns: [11, 12, 14, 15, 16, 18], m: "numéro", pose: (p, N) => `Au club de handball du Port, ${N} maillots numérotés de 1 à ${N} sont dans un sac. ${p.nom} en prend un au hasard.`, sujet: "le numéro du maillot", equi: "chaque maillot a la même chance d’être pris" },
  { Ns: [10, 12, 15, 16, 20], m: "numéro", pose: (p, N) => `En classe découverte à Cilaos, les ${N} chambres du gîte sont numérotées de 1 à ${N}. ${p.nom} reçoit une chambre tirée au sort.`, sujet: "le numéro de la chambre", equi: "le tirage au sort ne favorise aucune chambre" },
  { Ns: [24, 25, 28, 30], m: "numéro", pose: (_p, N) => `Les ${N} élèves de la 3e B ont chacun un numéro, de 1 à ${N}. Pour l’oral blanc, le professeur tire un numéro au hasard.`, sujet: "le numéro tiré", equi: "le tirage au sort ne favorise aucun élève" },
  { Ns: [10, 12, 15, 20, 30], m: "numéro", pose: (p, N) => `Une application de quiz choisit au hasard une question parmi ${N}, numérotées de 1 à ${N}. ${p.nom} lance une partie.`, sujet: "le numéro de la question", equi: "l’application ne favorise aucune question" },
  { Ns: [30, 35, 40, 45, 50], m: "numéro", pose: (p, N) => `Pour une sortie scolaire en car jaune, les ${N} places sont numérotées de 1 à ${N}. La place ${de(p.nom)} est tirée au sort.`, sujet: "le numéro de la place", equi: "le tirage au sort ne favorise aucune place" },
  { Ns: [12, 15, 16, 20, 24], m: "numéro", pose: (p, N) => `Au collège, les ${N} casiers d’un couloir sont numérotés de 1 à ${N}. ${p.nom} reçoit un casier tiré au sort.`, sujet: "le numéro du casier", equi: "le tirage au sort ne favorise aucun casier" },
  { Ns: [20, 25, 30, 40], m: "numéro", pose: (p, N) => `Au cross du collège, ${N} dossards numérotés de 1 à ${N} sont mélangés dans une caisse. ${p.nom} en tire un au hasard.`, sujet: "le numéro du dossard", equi: "les dossards sont bien mélangés" },
  { Ns: [6, 8, 10], m: "nombre", pose: (p, N) => `${p.nom} fait tourner une toupie équilibrée à ${N} faces, numérotées de 1 à ${N}.`, sujet: "le nombre obtenu", equi: "la toupie est équilibrée" },
];
type Num = { ctx: CtxNum; p: Prenom; N: number };
function num(filtre: (N: number) => boolean = () => true): Num {
  const ctx = pick(CTX_NUM.filter((c) => c.Ns.some(filtre)));
  return { ctx, p: pick(PRENOMS), N: pick(ctx.Ns.filter(filtre)) };
}
const sitNum = (x: Num) => x.ctx.pose(x.p, x.N);
const canvasNum = (x: Num, surl: number[] = []) => (x.ctx.canvas ? x.ctx.canvas(x.N, surl) : undefined);
/** Une liste de nombres, abrégée au-delà de douze. */
const listeNum = (xs: number[]) =>
  xs.length === 0 ? "aucun" : xs.length <= 12 ? listeFr(xs.map(String)) : `${xs.slice(0, 4).join(", ")}, …, ${xs[xs.length - 1]}`;

type EvtNum = {
  /** « obtenir un nombre pair » */
  lib: string;
  /** ce qui suit « un nombre » : « pair », « multiple de 3 » (pour « A et B ») */
  adj: string;
  ok: (v: number) => boolean;
  /** « 4 est pair », « 7 n’est pas pair » */
  juge: (v: number) => string;
  /** l'événement contraire, bien écrit */
  contraire: string;
  /** des contraires FAUX, qui sont de vraies erreurs */
  pieges: string[];
  /** autorisé dans « A et B » / « A ou B » */
  combinable: boolean;
};
/** Les événements possibles pour des issues de 1 à N, ni impossibles ni certains. */
function evenementsNum(N: number, m: string): EvtNum[] {
  const un = `un ${m}`;
  const L: EvtNum[] = [];
  const est = (ok: boolean, v: number, adj: string) => `${v} ${ok ? "est" : "n’est pas"} ${adj}`;
  L.push({
    lib: `obtenir ${un} pair`, adj: "pair", ok: (v) => v % 2 === 0, juge: (v) => est(v % 2 === 0, v, "pair"),
    contraire: `obtenir ${un} impair`, pieges: ["ne pas obtenir 2", "obtenir 1", `obtenir ${un} pair ou impair`], combinable: true,
  });
  L.push({
    lib: `obtenir ${un} impair`, adj: "impair", ok: (v) => v % 2 === 1, juge: (v) => est(v % 2 === 1, v, "impair"),
    contraire: `obtenir ${un} pair`, pieges: ["ne pas obtenir 1", "obtenir 2", `obtenir ${un} pair ou impair`], combinable: true,
  });
  for (const k of [3, 4, 5]) {
    if (2 * k > N) continue;
    L.push({
      lib: `obtenir un multiple de ${k}`, adj: `multiple de ${k}`, ok: (v) => v % k === 0, juge: (v) => est(v % k === 0, v, `un multiple de ${k}`),
      contraire: `obtenir ${un} qui n’est pas un multiple de ${k}`, pieges: [`obtenir un diviseur de ${k}`, `ne pas obtenir ${k}`, `obtenir un multiple de ${k + 1}`], combinable: true,
    });
  }
  const k1 = ri(2, N - 2);
  L.push({
    lib: `obtenir ${un} strictement supérieur à ${k1}`, adj: `strictement supérieur à ${k1}`, ok: (v) => v > k1, juge: (v) => est(v > k1, v, `strictement supérieur à ${k1}`),
    contraire: `obtenir ${un} inférieur ou égal à ${k1}`,
    pieges: [`obtenir ${un} strictement inférieur à ${k1}`, `obtenir ${un} supérieur ou égal à ${k1}`, `ne pas obtenir ${k1}`], combinable: true,
  });
  const k2 = ri(2, N - 1);
  L.push({
    lib: `obtenir ${un} supérieur ou égal à ${k2}`, adj: `supérieur ou égal à ${k2}`, ok: (v) => v >= k2, juge: (v) => est(v >= k2, v, `supérieur ou égal à ${k2}`),
    contraire: `obtenir ${un} strictement inférieur à ${k2}`,
    pieges: [`obtenir ${un} inférieur ou égal à ${k2}`, `obtenir ${un} strictement supérieur à ${k2}`, `ne pas obtenir ${k2}`], combinable: true,
  });
  const k3 = ri(2, N - 1);
  L.push({
    lib: `obtenir ${un} strictement inférieur à ${k3}`, adj: `strictement inférieur à ${k3}`, ok: (v) => v < k3, juge: (v) => est(v < k3, v, `strictement inférieur à ${k3}`),
    contraire: `obtenir ${un} supérieur ou égal à ${k3}`,
    pieges: [`obtenir ${un} strictement supérieur à ${k3}`, `obtenir ${un} inférieur ou égal à ${k3}`, `obtenir ${k3}`], combinable: true,
  });
  const k4 = ri(2, N - 2);
  L.push({
    lib: `obtenir ${un} inférieur ou égal à ${k4}`, adj: `inférieur ou égal à ${k4}`, ok: (v) => v <= k4, juge: (v) => est(v <= k4, v, `inférieur ou égal à ${k4}`),
    contraire: `obtenir ${un} strictement supérieur à ${k4}`,
    pieges: [`obtenir ${un} supérieur ou égal à ${k4}`, `obtenir ${un} strictement inférieur à ${k4}`, `obtenir ${k4}`], combinable: true,
  });
  if (N >= 5) {
    L.push({
      lib: `obtenir ${un} premier`, adj: "premier", ok: estPremier, juge: (v) => est(estPremier(v), v, "premier"),
      contraire: `obtenir ${un} qui n’est pas premier`, pieges: [`obtenir ${un} pair`, "obtenir 1", "ne pas obtenir 2"], combinable: true,
    });
  }
  const D = pick([N, 12, 24, 30, 36].filter((d) => d >= 4));
  L.push({
    lib: `obtenir un diviseur de ${D}`, adj: `diviseur de ${D}`, ok: (v) => D % v === 0, juge: (v) => est(D % v === 0, v, `un diviseur de ${D}`),
    contraire: `obtenir ${un} qui n’est pas un diviseur de ${D}`, pieges: [`obtenir un multiple de ${D}`, `ne pas obtenir ${D}`, `obtenir 1 ou ${D}`], combinable: true,
  });
  if (N >= 6) {
    const a = ri(2, N - 3);
    const b = ri(a + 1, N - 1);
    L.push({
      lib: `obtenir ${un} compris entre ${a} et ${b} (inclus)`, adj: `compris entre ${a} et ${b} (inclus)`, ok: (v) => v >= a && v <= b,
      juge: (v) => est(v >= a && v <= b, v, `compris entre ${a} et ${b}`),
      contraire: `obtenir ${un} strictement inférieur à ${a} ou strictement supérieur à ${b}`,
      pieges: [`obtenir ${un} strictement compris entre ${a} et ${b}`, `obtenir ${un} strictement supérieur à ${b}`, `obtenir ${a} ou ${b}`], combinable: false,
    });
  }
  if (N >= 20) {
    const u = ri(0, 9);
    L.push({
      lib: `obtenir ${un} dont le chiffre des unités est ${u}`, adj: "", ok: (v) => v % 10 === u,
      juge: (v) => `le chiffre des unités de ${v} ${v % 10 === u ? "est" : "n’est pas"} ${u}`,
      contraire: `obtenir ${un} dont le chiffre des unités n’est pas ${u}`,
      pieges: [`obtenir ${un} dont le chiffre des unités est ${(u + 1) % 10}`, `ne pas obtenir ${u === 0 ? 10 : u}`, `obtenir ${un} dont le chiffre des dizaines est ${u}`], combinable: false,
    });
  }
  return L.filter((e) => {
    const f = range(1, N).filter(e.ok).length;
    return f > 0 && f < N;
  });
}
const favNum = (N: number, e: EvtNum) => range(1, N).filter(e.ok);

/* =========================================================================
   PROBA_VOCABULAIRE
========================================================================= */

const Q_CERTAIN = "certain";
const Q_IMPOSSIBLE = "impossible";
const Q_POSSIBLE = "possible, mais pas certain";

/** ★1 — Certain, impossible, ou ni l'un ni l'autre ? */
function vocCertainImpossible(): Q {
  const kind = pick([Q_CERTAIN, Q_IMPOSSIBLE, Q_POSSIBLE]);
  let sit = "";
  let e = "";
  let calcul = "";
  if (Math.random() < 0.5) {
    const k = ri(2, 3);
    const u = urne(k, 1, 6, { minSortes: k + 1 });
    sit = situation(u);
    const absente = pick(u.ctx.sortes.filter((s) => !u.s.includes(s)));
    const aucun = `${u.ctx.o.f ? "aucune" : "aucun"} ${u.ctx.o.s}`;
    if (kind === Q_IMPOSSIBLE) {
      e = evtU(u, absente);
      calcul = `${maj(aucun)} n’est ${absente.attr} : aucune issue ne réalise cet événement. Sa probabilité est 0.`;
    } else if (kind === Q_CERTAIN) {
      if (Math.random() < 0.5) {
        e = `${u.ctx.sujet} est ${listeOu(u.s.map((s) => s.attr))}`;
        calcul = `Les issues sont ${listeFr(u.s.map((s) => s.nom))} : chacune réalise cet événement. Sa probabilité est 1.`;
      } else {
        e = `${u.ctx.sujet} n’est pas ${absente.attr}`;
        calcul = `${maj(aucun)} n’est ${absente.attr} : quel que soit le résultat, l’événement est réalisé. Sa probabilité est 1.`;
      }
    } else {
      const s = pick(u.s);
      const autre = pick(u.s.filter((x) => x !== s));
      e = evtU(u, s);
      calcul = `L’issue « ${s.nom} » réalise cet événement, mais l’issue « ${autre.nom} » ne le réalise pas : il peut se produire, sans que ce soit sûr.`;
    }
  } else {
    const x = num();
    const un = `un ${x.ctx.m}`;
    sit = sitNum(x);
    if (kind === Q_IMPOSSIBLE) {
      e = pick([`obtenir ${x.N + ri(1, 5)}`, "obtenir 0", `obtenir ${un} strictement supérieur à ${x.N}`, `obtenir un multiple de ${x.N + 1}`]);
      calcul = `Les issues vont de 1 à ${x.N} : aucune ne réalise cet événement. Sa probabilité est 0.`;
    } else if (kind === Q_CERTAIN) {
      e = pick([`obtenir ${un} inférieur ou égal à ${x.N}`, `obtenir ${un} compris entre 1 et ${x.N}`, `obtenir ${un} pair ou impair`, `obtenir ${un} strictement inférieur à ${x.N + ri(1, 5)}`]);
      calcul = `Les ${x.N} issues, de 1 à ${x.N}, réalisent toutes cet événement. Sa probabilité est 1.`;
    } else {
      const ev = pick(evenementsNum(x.N, x.ctx.m));
      const f = favNum(x.N, ev);
      const non = range(1, x.N).find((v) => !ev.ok(v)) as number;
      e = ev.lib;
      calcul = `${maj(ev.juge(f[0]))} : l’issue ${f[0]} réalise l’événement. Mais ${ev.juge(non)} : il peut se produire, sans que ce soit sûr.`;
    }
  }
  const T = pick([
    `L’événement « ${e} » est :`,
    `Comment qualifier l’événement « ${e} » ?`,
    `Que peut-on dire de l’événement « ${e} » ?`,
    `Parmi ces mots, lequel décrit l’événement « ${e} » ?`,
  ]);
  return {
    text: `${sit} ${T}`,
    format: "qcm",
    choices: qcm(kind, [Q_CERTAIN, Q_IMPOSSIBLE, Q_POSSIBLE, "équiprobable"]),
    expected: [kind],
    comparator: "mcq_exact",
    explanation:
      `Méthode : on cherche quelles issues réalisent « ${e} ».\n\n` +
      `Calcul : ${calcul.charAt(0).toLowerCase() + calcul.slice(1)}\n\n` +
      `Conclusion : l’événement « ${e} » est ${kind}.`,
  };
}

const ANNONCES: ((p: Prenom, v: string) => string)[] = [
  (_p, v) => `La météo annonce une probabilité de pluie de ${v} pour demain à Saint-Denis.`,
  (p, v) => `${p.nom} a calculé ${v} pour la probabilité de gagner à la tombola de la kermesse.`,
  (_p, v) => `Un jeu vidéo affiche : « probabilité de trouver un objet rare : ${v} ».`,
  (_p, v) => `Un journal donne une probabilité de victoire de ${v} à l’équipe de foot de Saint-Pierre pour dimanche.`,
  (p, v) => `Sur sa copie, ${p.nom} écrit que la probabilité de tirer une bille rouge vaut ${v}.`,
  (_p, v) => `Une application annonce une probabilité de ${v} que le car jaune arrive à l’heure.`,
  (p, v) => `D’après ${p.nom}, la probabilité qu’il y ait de la houle demain à Saint-Leu est de ${v}.`,
  (_p, v) => `Un météorologue estime à ${v} la probabilité qu’un cyclone passe près de l’île en février.`,
  (p, v) => `Dans son exercice, ${p.nom} trouve ${v} pour la probabilité d’obtenir un 6 avec un dé.`,
  (_p, v) => `Au stand de la fête de Saint-Gilles, une affiche indique : « probabilité de gagner un lot : ${v} ».`,
  (p, v) => `${p.nom} estime à ${v} la probabilité de voir des baleines lors de la sortie en mer.`,
  (_p, v) => `Un logiciel donne ${v} pour la probabilité qu’une graine de piment germe.`,
];

/** ★1 — Une probabilité est comprise entre 0 et 1. */
function vocBornes(): Q {
  const sorte = pick(["dec", "frac", "pct", "neg", "zero", "un", "trop"] as const);
  let v = "";
  let valeur = 0;
  switch (sorte) {
    case "dec": {
      const valide = Math.random() < 0.5;
      valeur = valide ? ri(1, 99) / 100 : ri(101, 180) / 100;
      v = fr(valeur);
      break;
    }
    case "frac": {
      const d = ri(3, 12);
      const n = Math.random() < 0.5 ? ri(1, d - 1) : ri(d + 1, 2 * d);
      valeur = n / d;
      v = tf(n, d);
      break;
    }
    case "pct": {
      const x = Math.random() < 0.5 ? ri(1, 99) : ri(105, 200);
      valeur = x / 100;
      v = `${x} %`;
      break;
    }
    case "neg": {
      valeur = -ri(1, 9) / 10;
      v = `−${fr(-valeur)}`;
      break;
    }
    case "zero":
      valeur = 0;
      v = "0";
      break;
    case "un":
      valeur = 1;
      v = "1";
      break;
    case "trop": {
      valeur = ri(2, 5);
      v = String(valeur);
      break;
    }
  }
  const OUI = "oui, ce nombre est compris entre 0 et 1";
  const TROP = "non, une probabilité ne dépasse jamais 1";
  const NEG = "non, une probabilité n’est jamais négative";
  const BORD = valeur === 1 ? "non, une probabilité ne peut pas valoir 1" : "non, une probabilité ne peut pas valoir 0";
  const rep = valeur < 0 ? NEG : valeur > 1 ? TROP : OUI;
  const p = pick(PRENOMS);
  const T = pick(["Ce nombre peut-il être une probabilité ?", "Est-ce possible ?", "Cette valeur est-elle possible pour une probabilité ?", "Cette annonce est-elle possible ?"]);
  const lu = sorte === "pct" ? `${v} = ${fr(valeur)}` : sorte === "frac" ? `${v} ≈ ${fr(Math.round(valeur * 100) / 100)}` : v;
  const calcul =
    valeur < 0
      ? `${v} est un nombre négatif : c’est impossible pour une probabilité.`
      : valeur > 1
        ? `${lu}, plus grand que 1 : même un événement certain n’a qu’une probabilité de 1.`
        : valeur === 0
          ? "0 est permis : c’est la probabilité d’un événement impossible."
          : valeur === 1
            ? "1 est permis : c’est la probabilité d’un événement certain."
            : `${lu} est bien entre 0 et 1.`;
  return {
    text: `${pick(ANNONCES)(p, v)} ${T}`,
    format: "qcm",
    choices: qcm(rep, [OUI, TROP, NEG, BORD]),
    expected: [rep],
    comparator: "mcq_exact",
    explanation:
      "Définition : une probabilité est toujours comprise entre 0 (événement impossible) et 1 (événement certain).\n\n" +
      `Calcul : ${calcul.charAt(0).toLowerCase() + calcul.slice(1)}\n\n` +
      `Conclusion : ${rep}.`,
  };
}

/** ★2 — Issue, événement, liste des issues ou probabilité ? */
function vocNommer(): Q {
  const x = num((N) => N <= 12);
  const sit = sitNum(x);
  const ISSUE = "une issue";
  const EVT = "un événement qui regroupe plusieurs issues";
  const LISTE = "la liste de toutes les issues";
  const PROBA = "une probabilité";
  const cas = pick(["issue", "evt", "liste", "proba"] as const);
  let quoi = "";
  let rep = "";
  let pourquoi = "";
  if (cas === "issue") {
    const v = ri(1, x.N);
    quoi = `« obtenir ${v} »`;
    rep = ISSUE;
    pourquoi = `c’est UN seul résultat possible de l’expérience`;
  } else if (cas === "evt") {
    const ev = pick(evenementsNum(x.N, x.ctx.m).filter((e) => favNum(x.N, e).length >= 2));
    quoi = `« ${ev.lib} »`;
    rep = EVT;
    pourquoi = `il est réalisé par plusieurs issues : ${listeNum(favNum(x.N, ev))}`;
  } else if (cas === "liste") {
    quoi = `la liste « ${range(1, x.N).join(", ")} »`;
    rep = LISTE;
    pourquoi = `elle contient chacun des ${x.N} résultats possibles`;
  } else {
    const f = ri(1, x.N - 1);
    quoi = `le nombre ${tf(f, x.N)}`;
    rep = PROBA;
    pourquoi = `c’est un nombre entre 0 et 1 qui mesure la chance d’un événement ; ce n’est pas un résultat de l’expérience`;
  }
  const T = pick([`Comment appelle-t-on ${quoi} ?`, `Que représente ${quoi} ?`, `${maj(quoi)} : de quoi s’agit-il ?`]);
  return {
    text: `${sit} ${T}`,
    format: "qcm",
    choices: qcm(rep, [ISSUE, EVT, LISTE, PROBA]),
    expected: [rep],
    comparator: "mcq_exact",
    explanation:
      "Définition : une issue est UN résultat possible ; un événement regroupe une ou plusieurs issues ; une probabilité est un nombre entre 0 et 1.\n\n" +
      `Calcul : ici, pour ${quoi}, ${pourquoi}.\n\n` +
      `Conclusion : c’est ${rep}.`,
    canvas: canvasNum(x),
  };
}

/** ★2 — Deux événements incompatibles ? */
function vocIncompatibles(): Q {
  const x = num((N) => N >= 6 && N <= 20);
  const veutInc = Math.random() < 0.5;
  let a: EvtNum | undefined;
  let b: EvtNum | undefined;
  for (let t = 0; t < 80; t++) {
    const L = evenementsNum(x.N, x.ctx.m);
    const [e1, e2] = melange(L);
    if (!e1 || !e2 || e1.lib === e2.lib) continue;
    const inter = favNum(x.N, e1).filter(e2.ok);
    if ((inter.length === 0) === veutInc || t === 79) {
      a = e1;
      b = e2;
      break;
    }
  }
  if (!a || !b) return vocCertainImpossible();
  const fa = favNum(x.N, a);
  const fb = favNum(x.N, b);
  const inter = fa.filter(b.ok);
  const inc = inter.length === 0;
  const p = x.p;
  const t = pick([0, 1, 2]);
  const T = [
    "Les événements A et B sont-ils incompatibles ?",
    "A et B peuvent-ils se réaliser en même temps ?",
    `${p.nom} affirme que A et B sont incompatibles. A-t-${ilElle(p)} raison ?`,
  ][t];
  const rep = t === 1 ? (inc ? "non" : "oui") : inc ? "oui" : "non";
  return {
    text: `${sitNum(x)} On considère les événements A : « ${a.lib} » et B : « ${b.lib} ». ${T}`,
    format: "qcm",
    choices: [...OUI_NON],
    expected: [rep],
    comparator: "mcq_exact",
    explanation:
      "Définition : deux événements sont incompatibles quand aucune issue ne les réalise en même temps.\n\n" +
      `Calcul : A est réalisé par ${listeNum(fa)} ; B est réalisé par ${listeNum(fb)}. ` +
      (inc ? "Aucun nombre n’est dans les deux listes." : `${maj(inter.length > 1 ? `les issues ${listeNum(inter)} réalisent` : `l’issue ${inter[0]} réalise`)} A et B à la fois.`) +
      `\n\nConclusion : A et B ${inc ? "sont incompatibles" : "ne sont pas incompatibles"}, donc la réponse est « ${rep} ».`,
  };
}

const SITUATIONS_ALEA: { s: string; alea: boolean; pourquoi: string }[] = [
  { s: "lancer un dé et noter le résultat", alea: true, pourquoi: "on ne peut pas savoir quelle face sortira" },
  { s: "tirer une carte Pokémon au hasard dans sa pioche", alea: true, pourquoi: "on ne sait pas quelle carte viendra" },
  { s: "faire tourner la roue de la kermesse", alea: true, pourquoi: "le secteur d’arrivée n’est pas prévisible" },
  { s: "tirer une boule au loto de la fête de Saint-Gilles", alea: true, pourquoi: "personne ne sait quel numéro sortira" },
  { s: "prendre un bonbon coco dans la boîte, les yeux fermés", alea: true, pourquoi: "on ne choisit pas lequel on attrape" },
  { s: "lancer une pièce pour savoir quelle équipe engage", alea: true, pourquoi: "pile ou face ne se prévoit pas" },
  { s: "tirer au sort l’ordre de passage à l’oral", alea: true, pourquoi: "l’ordre obtenu dépend du hasard" },
  { s: "laisser la lecture aléatoire choisir un morceau de la playlist", alea: true, pourquoi: "on ne sait pas quel morceau va passer" },
  { s: "piocher une bille dans un sac sans regarder", alea: true, pourquoi: "on ne voit pas la bille qu’on prend" },
  { s: "tirer au sort les équipes de volley", alea: true, pourquoi: "la composition des équipes dépend du tirage" },
  { s: "prendre au hasard un samoussa dans le sachet du pique-nique", alea: true, pourquoi: "on ne sait pas quelle garniture on aura" },
  { s: "gratter un ticket de tombola", alea: true, pourquoi: "on ne sait pas à l’avance s’il est gagnant" },
  { s: "calculer 17 × 4", alea: false, pourquoi: "le résultat est toujours 68" },
  { s: "mesurer la longueur de sa table avec un mètre", alea: false, pourquoi: "la table a une longueur fixe, on retrouve la même à chaque fois" },
  { s: "compter les élèves présents dans la classe", alea: false, pourquoi: "il suffit de compter : le nombre est ce qu’il est" },
  { s: "peser un ananas Victoria sur une balance", alea: false, pourquoi: "la masse de l’ananas ne change pas d’une pesée à l’autre" },
  { s: "lire l’heure de départ du car jaune sur la fiche horaire", alea: false, pourquoi: "l’heure est écrite, elle ne dépend pas du hasard" },
  { s: "convertir 2 km en mètres", alea: false, pourquoi: "on trouve toujours 2 000 m" },
  { s: "compter les faces d’un dé", alea: false, pourquoi: "un dé a toujours 6 faces" },
  { s: "trouver le jour qui suit un lundi", alea: false, pourquoi: "c’est toujours un mardi" },
  { s: "calculer le périmètre d’un carré de 5 cm de côté", alea: false, pourquoi: "on trouve toujours 20 cm" },
  { s: "ranger les nombres 7, 3 et 12 dans l’ordre croissant", alea: false, pourquoi: "on obtient toujours 3, 7, 12" },
];

/** ★3 — Est-ce une expérience aléatoire ? */
function vocAleatoire(): Q {
  const c = pick(SITUATIONS_ALEA);
  const p = pick(PRENOMS);
  const t = pick([0, 1, 2, 3]);
  let text = "";
  let choices: string[] = [...OUI_NON];
  let rep = "";
  if (t === 0) {
    text = `« ${maj(c.s)} » : est-ce une expérience aléatoire ?`;
    choices = ["oui, c’est une expérience aléatoire", "non, le résultat est prévisible"];
    rep = c.alea ? choices[0] : choices[1];
  } else if (t === 1) {
    text = `${p.nom} veut ${c.s}. S’agit-il d’une expérience aléatoire ?`;
    rep = c.alea ? "oui" : "non";
  } else if (t === 2) {
    text = `Peut-on prévoir à l’avance le résultat de l’action « ${c.s} » ?`;
    choices = ["oui, le résultat est toujours le même", "non, le résultat dépend du hasard"];
    rep = c.alea ? choices[1] : choices[0];
  } else {
    text = `${p.nom} dit : « ${maj(c.s)}, c’est une expérience aléatoire. » A-t-${ilElle(p)} raison ?`;
    rep = c.alea ? "oui" : "non";
  }
  return {
    text,
    format: "qcm",
    choices: melange(choices),
    expected: [rep],
    comparator: "mcq_exact",
    explanation:
      "Définition : une expérience est ALÉATOIRE quand on ne peut pas prévoir son résultat, même en connaissant parfaitement les conditions.\n\n" +
      `Calcul : ici, ${c.pourquoi}.\n\n` +
      (c.alea
        ? `Conclusion : « ${c.s} » est une expérience aléatoire ; la réponse est « ${rep} ».`
        : `Conclusion : « ${c.s} » n’est pas une expérience aléatoire ; la réponse est « ${rep} ».`),
  };
}

const ECHELLE_EVTS: string[] = [
  "qu’il pleuve demain à Cilaos",
  "que le car jaune soit à l’heure ce matin",
  "de gagner un lot à la tombola de la kermesse",
  "de tirer une bille rouge dans le sac",
  "qu’une graine de piment germe",
  "de voir des baleines lors de la sortie en mer",
  "que l’équipe de handball gagne son match",
  "d’obtenir un 6 avec ce dé",
  "de piocher une carte de type Feu",
  "que la lecture aléatoire lance un morceau de maloya",
];
/** ★3 — Lire une probabilité : impossible, peu probable, une chance sur deux… */
function vocEchelle(): Q {
  const IMP = "impossible";
  const PEU = "possible, mais peu probable";
  const MOIT = "une chance sur deux";
  const TRES = "très probable, mais pas certain";
  const CERT = "certain";
  const rep = pick([IMP, PEU, MOIT, TRES, CERT]);
  let v = "";
  let lu = "";
  if (rep === IMP) {
    const d = ri(4, 12);
    v = pick(["0", "0 %", tf(0, d).replace("$0$", `$\\dfrac{0}{${d}}$`)]);
    lu = "elle vaut 0";
  } else if (rep === PEU) {
    const t = pick([0, 1, 2]);
    if (t === 0) { const x = ri(1, 9); v = fr(x / 100); lu = `${v} est très proche de 0, sans être 0`; }
    else if (t === 1) { const x = ri(1, 12); v = `${x} %`; lu = `${v} = ${fr(x / 100)}, très proche de 0, sans être 0`; }
    else { const d = ri(10, 50); v = tf(1, d); lu = `${v} ≈ ${fr(Math.round(100 / d) / 100)}, très proche de 0, sans être 0`; }
  } else if (rep === MOIT) {
    const k = ri(2, 10);
    v = pick(["0,5", "50 %", tf(k, 2 * k)]);
    lu = `${v} = 0,5 : l’événement a autant de chances de se produire que de ne pas se produire`;
  } else if (rep === TRES) {
    const t = pick([0, 1, 2]);
    if (t === 0) { const x = ri(91, 99); v = fr(x / 100); lu = `${v} est très proche de 1, sans être 1`; }
    else if (t === 1) { const x = ri(88, 99); v = `${x} %`; lu = `${v} = ${fr(x / 100)}, très proche de 1, sans être 1`; }
    else { const d = ri(10, 40); v = tf(d - 1, d); lu = `${v} est très proche de 1, sans être 1`; }
  } else {
    const d = ri(4, 12);
    v = pick(["1", "100 %", tf(d, d).replace(`$${d}$`, `$\\dfrac{${d}}{${d}}$`)]);
    lu = "elle vaut 1";
  }
  const e = pick(ECHELLE_EVTS);
  const T = pick(["Comment qualifier cet événement ?", "Quelle expression décrit le mieux cet événement ?", "Que peut-on dire de cet événement ?"]);
  return {
    text: `La probabilité ${e} est ${v}. ${T}`,
    format: "qcm",
    choices: qcm(rep, [IMP, PEU, MOIT, TRES, CERT]),
    expected: [rep],
    comparator: "mcq_exact",
    explanation:
      "Définition : une probabilité va de 0 (impossible) à 1 (certain) ; 0,5 veut dire une chance sur deux.\n\n" +
      `Calcul : ici, ${lu}.\n\n` +
      (rep === MOIT ? "Conclusion : l’événement a une chance sur deux de se produire." : `Conclusion : l’événement est ${rep}.`) +
      (rep === PEU ? " ⚠️ Peu probable n’est pas impossible : il peut arriver." : rep === TRES ? " ⚠️ Très probable n’est pas certain : il peut ne pas arriver." : ""),
  };
}

/* =========================================================================
   PROBA_ISSUE
========================================================================= */

/** ★1 — La liste des issues quand on note la sorte. */
function issueListe(): Q {
  const k = ri(2, 4);
  const u = urne(k, 1, 6, { minSortes: k + 1 });
  const noms = u.s.map((s) => s.nom);
  const absente = pick(u.ctx.sortes.filter((s) => !u.s.includes(s)));
  const bon = listeFr(noms);
  const leurres = [
    listeFr([...noms, absente.nom]),
    listeFr(u.n.map(String)),
    listeFr(noms.slice(0, -1)) || absente.nom,
    `${tot(u)} ${u.ctx.o.p}`,
  ];
  const T = pick(["Quelles sont les issues possibles ?", "Quelle liste donne toutes les issues de cette expérience ?", "Quels résultats peut-on obtenir ?"]);
  return {
    text: `${situation(u)} On note ${u.ctx.note}. ${T}`,
    format: "qcm",
    choices: qcm(bon, leurres),
    expected: [bon],
    comparator: "mcq_exact",
    explanation:
      `Méthode : on note ${u.ctx.note} : une issue est donc une SORTE possible, pas un objet précis.\n\n` +
      `Calcul : il y a ${tot(u)} ${u.ctx.o.p}, mais seulement ${k} sortes : ${bon}.\n\n` +
      `Conclusion : les issues sont ${bon}.`,
    canvas: canvasUrne(u),
  };
}

/** ★1 — Combien d'issues pour une expérience numérotée ? */
function issueNombre(): Q {
  const x = num();
  const T = pick(["Combien y a-t-il d’issues possibles ?", "Combien de résultats différents peut-on obtenir ?", "Combien cette expérience a-t-elle d’issues ?"]);
  return {
    text: `${sitNum(x)} ${T}`,
    format: "short",
    expected: [String(x.N)],
    comparator: "number_equal",
    explanation:
      "Définition : les issues sont tous les résultats possibles de l’expérience.\n\n" +
      `Calcul : on peut obtenir chaque ${x.ctx.m} de 1 à ${x.N}, et rien d’autre.\n\n` +
      `Conclusion : il y a ${x.N} issues.`,
    canvas: canvasNum(x),
  };
}

const OBJETS_COLORES: { pose: (p: Prenom, N: number, parts: string) => string; Ns: number[]; f: boolean; mot: [string, string]; roue: boolean }[] = [
  { pose: (p, _N, parts) => `${p.nom} lance un dé équilibré à 6 faces : ${parts}. ${maj(ilElle(p))} note la couleur de la face du dessus.`, Ns: [6], f: true, mot: ["face", "faces"], roue: false },
  { pose: (p, N, parts) => `Pour un jeu de société, ${p.nom} lance un dé équilibré à ${N} faces : ${parts}. ${maj(ilElle(p))} note la couleur obtenue.`, Ns: [8, 12], f: true, mot: ["face", "faces"], roue: false },
  { pose: (p, N, parts) => `À la kermesse, une roue a ${N} secteurs de même taille : ${parts}. ${p.nom} la fait tourner et note la couleur obtenue.`, Ns: [6, 8, 10, 12], f: false, mot: ["secteur", "secteurs"], roue: true },
  { pose: (p, N, parts) => `${p.nom} fait tourner une toupie équilibrée à ${N} faces : ${parts}. ${maj(ilElle(p))} note la couleur de la face sur laquelle elle s’arrête.`, Ns: [6, 8], f: true, mot: ["face", "faces"], roue: false },
  { pose: (p, N, parts) => `À la fête foraine du Port, la roue de la loterie compte ${N} secteurs identiques : ${parts}. ${p.nom} joue et note la couleur obtenue.`, Ns: [8, 10, 12], f: false, mot: ["secteur", "secteurs"], roue: true },
];
/** Un objet coloré : N faces/secteurs répartis entre k couleurs. */
function objetColore(kMin = 2) {
  const o = pick(OBJETS_COLORES);
  const N = pick(o.Ns);
  const k = ri(kMin, Math.min(4, N - 1));
  const cs = melange(["rouge", "bleu", "vert", "jaune", "noir", "blanc"] as Coul[]).slice(0, k);
  // une répartition de N en k parts non nulles
  const ns = Array(k).fill(1);
  for (let i = k; i < N; i++) ns[ri(0, k - 1)]++;
  const coul = (c: Coul, n: number) => ACC[c][(o.f ? 1 : 0) + (n > 1 ? 2 : 0)];
  const parts = listeFr(cs.map((c, i) => `${ns[i]} ${ns[i] > 1 ? o.mot[1] : o.mot[0]} ${coul(c, ns[i])}`));
  const p = pick(PRENOMS);
  const canvas = o.roue
    ? roueCanvas(cs.flatMap((c, i) => Array.from({ length: ns[i] }, () => ({ label: "", poids: 1, couleur: HEX[c] }))))
    : undefined;
  return { o, N, k, cs, ns, p, text: o.pose(p, N, parts), noms: cs.map((c) => ACC[c][o.f ? 1 : 0]), canvas };
}

/** ★2 — On note la couleur : combien d'issues ? */
function issueCouleurs(): Q {
  const c = objetColore();
  const T = pick(["Combien y a-t-il d’issues possibles ?", "Combien d’issues cette expérience a-t-elle ?", `Combien de résultats différents ${c.p.nom} peut-${ilElle(c.p)} noter ?`]);
  return {
    text: `${c.text} ${T}`,
    format: "short",
    expected: [String(c.k)],
    comparator: "number_equal",
    explanation:
      "Méthode : on note une COULEUR, donc les issues sont les couleurs, pas les " + `${c.o.mot[1]}.\n\n` +
      `Calcul : il y a ${c.N} ${c.o.mot[1]}, mais seulement ${c.k} couleurs : ${listeFr(c.noms)}.\n\n` +
      `Conclusion : il y a ${c.k} issues.`,
    canvas: c.canvas,
  };
}

const MOTS_LETTRES = [
  "CILAOS", "SALAZIE", "MAFATE", "PITON", "LETCHI", "SAMOUSSA", "MALOYA", "CARI", "ROUGAIL", "BICHIQUE",
  "TAMARIN", "VANILLE", "PAPANGUE", "MANGUE", "GOYAVIER", "LAGON", "BOUCHON", "CANNE", "DODO", "FOURNAISE",
  "CHOUCHOU", "ZEMBROCAL", "MARMAILLE", "KABAR",
];
const SUPPORTS_LETTRES: ((p: Prenom, W: string) => string)[] = [
  (p, W) => `On écrit chaque lettre du mot ${W} sur une carte. ${p.nom} mélange les cartes, en tire une au hasard et note la lettre obtenue.`,
  (p, W) => `Chaque lettre du mot ${W} est peinte sur un jeton en bois. ${p.nom} met les jetons dans un sac, en tire un au hasard et note la lettre.`,
  (p, W) => `${p.nom} découpe les lettres du mot ${W} et met chaque lettre dans un chapeau. ${maj(ilElle(p))} en tire une au hasard et note la lettre.`,
  (p, W) => `Pour un jeu de lettres, on écrit le mot ${W} en mettant chaque lettre sur une étiquette. ${p.nom} tire une étiquette au hasard et note la lettre.`,
];
/** ★2 — Les lettres d'un mot : les lettres répétées ne font qu'une issue. */
function issueLettres(): Q {
  const W = pick(MOTS_LETTRES);
  const distinctes = [...new Set(W.split(""))];
  const p = pick(PRENOMS);
  const T = pick(["Combien y a-t-il d’issues possibles ?", `Combien de lettres différentes ${p.nom} peut-${ilElle(p)} obtenir ?`, "Combien cette expérience a-t-elle d’issues ?"]);
  const repetees = distinctes.filter((l) => W.split(l).length - 1 > 1);
  return {
    text: `${pick(SUPPORTS_LETTRES)(p, W)} ${T}`,
    format: "short",
    expected: [String(distinctes.length)],
    comparator: "number_equal",
    explanation:
      "Méthode : on note une LETTRE ; une lettre écrite deux fois reste une seule issue.\n\n" +
      (repetees.length
        ? `Calcul : le mot ${W} a ${W.length} lettres, mais ${listeFr(repetees)} ${repetees.length > 1 ? "y apparaissent" : "y apparaît"} plusieurs fois. Les lettres différentes sont ${listeFr(distinctes)}.\n\n`
        : `Calcul : les ${W.length} lettres du mot ${W} sont toutes différentes : ${listeFr(distinctes)}.\n\n`) +
      `Conclusion : il y a ${distinctes.length} issues.` +
      (repetees.length ? " ⚠️ Elles ne sont pas équiprobables : une lettre répétée a plus de chances de sortir." : ""),
  };
}

/** ★2 — Une urne : on note la sorte, combien d'issues ? */
function issueSortes(): Q {
  const k = ri(2, 4);
  const u = urne(k, 2, 7);
  const T = pick(["Combien y a-t-il d’issues possibles ?", "Combien cette expérience a-t-elle d’issues ?", "Combien de résultats différents peut-on noter ?"]);
  return {
    text: `${situation(u)} On note ${u.ctx.note}. ${T}`,
    format: "short",
    expected: [String(k)],
    comparator: "number_equal",
    explanation:
      `Méthode : on note ${u.ctx.note} : les issues sont les sortes, pas les ${u.ctx.o.p}.\n\n` +
      `Calcul : il y a ${tot(u)} ${u.ctx.o.p}, mais seulement ${k} sortes : ${listeFr(u.s.map((s) => s.nom))}.\n\n` +
      `Conclusion : il y a ${k} issues.`,
    canvas: canvasUrne(u),
  };
}

/** ★2 — Les issues dépendent de ce qu'on NOTE. */
function issueCeQuOnNote(): Q {
  const x = num((N) => N >= 6);
  const m = x.ctx.m;
  const N = x.N;
  const choix: { note: string; n: number; issues: string }[] = [
    { note: `si le ${m} obtenu est pair ou impair`, n: 2, issues: "« pair » et « impair »" },
    { note: `le reste de la division du ${m} obtenu par 3`, n: 3, issues: "0, 1 et 2" },
    { note: `le reste de la division du ${m} obtenu par 4`, n: 4, issues: "0, 1, 2 et 3" },
    { note: `si le ${m} obtenu est premier ou non`, n: 2, issues: "« premier » et « pas premier »" },
    { note: `si l’on obtient ${ri(1, N)} ou non`, n: 2, issues: "« oui » et « non »" },
  ];
  if (N >= 10) {
    choix.push({ note: `le chiffre des unités du ${m} obtenu`, n: 10, issues: "les chiffres de 0 à 9" });
    const diz = [...new Set(range(1, N).map((v) => Math.floor(v / 10)))];
    choix.push({ note: `le chiffre des dizaines du ${m} obtenu`, n: diz.length, issues: listeFr(diz.map(String)) });
  }
  const c = pick(choix);
  const T = pick(["Combien y a-t-il d’issues ?", "Combien cette expérience a-t-elle d’issues ?", "Combien de résultats différents peut-on noter ?"]);
  return {
    text: `${sitNum(x)} On ne note pas le ${m} lui-même, mais ${c.note}. ${T}`,
    format: "short",
    expected: [String(c.n)],
    comparator: "number_equal",
    explanation:
      `Méthode : les issues dépendent de ce que l’on NOTE, pas seulement de l’objet : il y a ${N} ${m}s possibles, mais on ne les note pas.\n\n` +
      `Calcul : on note ${c.note} ; les résultats possibles sont ${c.issues}.\n\n` +
      `Conclusion : il y a ${c.n} issues.`,
  };
}

/* =========================================================================
   PROBA_EQUIPROBABILITE
========================================================================= */

/** ★2 — Les issues sont-elles équiprobables ? */
function eqSituations(): Q {
  const p = pick(PRENOMS);
  const cas = pick(["num", "urne", "truque", "angles", "somme", "piece", "parite", "lettres", "colore"] as const);
  let sit = "";
  let oui = true;
  let pourquoi = "";
  if (cas === "num") {
    const x = num();
    sit = `${sitNum(x)} On note le ${x.ctx.m} obtenu.`;
    pourquoi = `il y a ${x.N} issues et ${x.ctx.equi} : aucune n’est favorisée`;
  } else if (cas === "urne") {
    const k = ri(2, 3);
    const egal = Math.random() < 0.5;
    const n0 = ri(2, 6);
    const ns = egal ? Array(k).fill(n0) : (() => { let t: number[]; do { t = Array.from({ length: k }, () => ri(1, 7)); } while (new Set(t).size === 1); return t; })();
    const u = urne(k, 1, 7, { ns });
    sit = `${situation(u)} On note ${u.ctx.note}.`;
    oui = egal;
    pourquoi = egal
      ? `il y a autant de ${u.ctx.o.p} de chaque sorte (${n0}) : chaque issue a la même chance`
      : `il y a ${contenu(u)} : les sortes les plus nombreuses ont plus de chances de sortir`;
  } else if (cas === "truque") {
    const f = ri(1, 6);
    sit = `${p.nom} utilise un dé truqué : le ${f} sort deux fois plus souvent que chacune des autres faces. On note le nombre obtenu.`;
    oui = false;
    pourquoi = `le ${f} est favorisé`;
  } else if (cas === "angles") {
    const k = pick([3, 4]);
    const egal = Math.random() < 0.5;
    const angles = egal ? Array(k).fill(360 / k) : k === 3 ? pick([[180, 90, 90], [120, 150, 90], [60, 120, 180]]) : pick([[90, 90, 120, 60], [180, 60, 60, 60], [150, 90, 60, 60]]);
    const cs = melange(["rouge", "bleu", "vert", "jaune"] as Coul[]).slice(0, k);
    sit = `Une roue de loterie a ${k} secteurs : ${listeFr(cs.map((c, i) => `un secteur ${c} de ${angles[i]}°`))}. On note la couleur obtenue.`;
    oui = egal;
    pourquoi = egal ? `les ${k} secteurs ont le même angle (${angles[0]}°)` : "les secteurs n’ont pas tous le même angle : les plus grands sont favorisés";
  } else if (cas === "somme") {
    sit = `${p.nom} lance deux dés équilibrés et note la somme des deux nombres.`;
    oui = false;
    pourquoi = "la somme 7 s’obtient de 6 façons (1 + 6, 2 + 5…), la somme 2 d’une seule (1 + 1)";
  } else if (cas === "piece") {
    const tordue = Math.random() < 0.5;
    const x = ri(6, 8);
    sit = tordue
      ? `${p.nom} a une pièce tordue : elle tombe sur pile ${x} fois sur 10 en moyenne. On note pile ou face.`
      : `${p.nom} lance une pièce équilibrée et note pile ou face.`;
    oui = !tordue;
    pourquoi = tordue ? "pile est favorisé" : "pile et face ont chacun une chance sur deux";
  } else if (cas === "parite") {
    const x = num((N) => N >= 5 && N <= 15);
    sit = `${sitNum(x)} On note seulement si le ${x.ctx.m} obtenu est pair ou impair.`;
    const pairs = Math.floor(x.N / 2);
    oui = x.N % 2 === 0;
    pourquoi = oui ? `de 1 à ${x.N}, il y a ${pairs} ${x.ctx.m}s pairs et ${pairs} impairs` : `de 1 à ${x.N}, il y a ${pairs} ${x.ctx.m}s pairs mais ${x.N - pairs} impairs`;
  } else if (cas === "lettres") {
    const W = pick(MOTS_LETTRES);
    const d = [...new Set(W.split(""))];
    sit = `On écrit chaque lettre du mot ${W} sur une carte, puis ${p.nom} tire une carte au hasard et note la lettre.`;
    oui = d.length === W.length;
    pourquoi = oui ? `les ${W.length} lettres sont toutes différentes` : `certaines lettres sont écrites plusieurs fois (${listeFr(d.filter((l) => W.split(l).length > 2))}) : elles ont plus de chances de sortir`;
  } else {
    let c = objetColore();
    while (new Set(c.ns).size === 1) c = objetColore();
    sit = c.text;
    oui = false;
    pourquoi = `les couleurs n’ont pas toutes le même nombre de ${c.o.mot[1]}`;
  }
  const T = pick([
    "Les issues sont-elles équiprobables ?",
    "Est-ce une situation d’équiprobabilité ?",
    "Toutes les issues ont-elles la même probabilité ?",
    "Chaque issue a-t-elle autant de chances que les autres ?",
  ]);
  const rep = oui ? "oui" : "non";
  return {
    text: `${sit} ${T}`,
    format: "qcm",
    choices: [...OUI_NON],
    expected: [rep],
    comparator: "mcq_exact",
    explanation:
      "Définition : une situation est équiprobable quand toutes les issues ont la même probabilité.\n\n" +
      `Calcul : ici, ${pourquoi}.\n\n` +
      `Conclusion : ${oui ? "oui, c’est une situation d’équiprobabilité" : "non, ce n’est pas une situation d’équiprobabilité"}.`,
  };
}

/** ★2 — En équiprobabilité, chaque issue vaut 1/N. */
function eqChaque(): Q {
  if (Math.random() < 0.7) {
    const x = num((N) => N >= 4);
    const v = ri(1, x.N);
    const T = pick([
      "Quelle est la probabilité de chaque issue ?",
      `Quelle est la probabilité d’obtenir ${v} ?`,
      "Les issues sont équiprobables. Quelle est la probabilité de chacune ?",
    ]);
    const { choices, expected } = qcmF([1, x.N], [[x.N, 1], [1, 2], [1, x.N - 1], [x.N - 1, x.N], [1, 10]]);
    return {
      text: `${sitNum(x)} ${T}`,
      format: "qcm",
      choices,
      expected,
      comparator: "mcq_exact",
      explanation:
        `Définition : il y a ${x.N} issues équiprobables (${x.ctx.equi}).\n\n` +
        `Calcul : chaque issue a donc une chance sur ${x.N} : ${tf(1, x.N)}.\n\n` +
        `Conclusion : la probabilité de chaque issue est ${tf(1, x.N)}. ⚠️ Pas ${tf(1, 2)} : « ça arrive ou pas » ne fait pas deux issues équiprobables.`,
      canvas: canvasNum(x),
    };
  }
  const k = ri(2, 4);
  const n0 = ri(2, 5);
  const u = urne(k, 1, 1, { ns: Array(k).fill(n0) });
  const s = pick(u.s);
  const { choices, expected } = qcmF([1, k], [[1, n0 * k], [n0, 1], [1, 2], [k, 1], [n0, k]]);
  return {
    text: `${situation(u)} On note ${u.ctx.note}. Quelle est la probabilité de l’issue « ${s.nom} » ?`,
    format: "qcm",
    choices,
    expected,
    comparator: "mcq_exact",
    explanation:
      `Méthode : il y a ${n0} ${u.ctx.o.p} de chaque sorte : les ${k} issues (${listeFr(u.s.map((x) => x.nom))}) sont équiprobables.\n\n` +
      `Calcul : ${n0} ${u.ctx.o.p} sur ${n0 * k}, soit ${egalites(n0, n0 * k)}.\n\n` +
      `Conclusion : la probabilité de l’issue « ${s.nom} » est ${tf(1, k)}.`,
    canvas: canvasUrne(u),
  };
}

/** ★3 — Lequel de deux événements est le plus probable ? */
function eqComparer(): Q {
  const k = ri(2, 3);
  const egal = Math.random() < 0.25;
  let ns: number[];
  do {
    ns = Array.from({ length: k }, () => ri(1, 8));
    if (egal) ns[1] = ns[0];
  } while (!egal && ns[0] === ns[1]);
  const u = urne(k, 1, 8, { ns });
  const [A, B] = u.s;
  const forme = Math.random() < 0.5 ? evtTirer : evtEst;
  const eA = forme(u, A);
  const eB = forme(u, B);
  const EQ = "les deux sont équiprobables";
  const rep = ns[0] === ns[1] ? EQ : ns[0] > ns[1] ? eA : eB;
  const T = pick([
    `Entre « ${eA} » et « ${eB} », quel événement est le plus probable ?`,
    `Lequel de ces deux événements a le plus de chances de se produire : « ${eA} » ou « ${eB} » ?`,
    `${u.p.nom} parie sur « ${eA} » ou sur « ${eB} ». Quel est le meilleur choix ?`,
  ]);
  const T0 = tot(u);
  return {
    text: `${situation(u)} ${T}`,
    format: "qcm",
    choices: melange([eA, eB, EQ, "on ne peut pas savoir, c’est le hasard"]),
    expected: [rep],
    comparator: "mcq_exact",
    explanation:
      "Méthode : on compare les probabilités, c’est-à-dire le nombre de cas favorables sur le même total.\n\n" +
      `Calcul : P(« ${eA} ») = ${tf(ns[0], T0)} et P(« ${eB} ») = ${tf(ns[1], T0)}.\n\n` +
      (rep === EQ ? "Conclusion : les deux probabilités sont égales : les deux événements sont équiprobables." : `Conclusion : le plus probable est « ${rep} ». Le hasard ne se prévoit pas, mais il se mesure.`),
    canvas: canvasUrne(u),
  };
}

/** ★3 — Combien en ajouter pour rendre deux issues équiprobables ? */
function eqAjouter(): Q {
  let a = ri(1, 7);
  let b = ri(1, 9);
  while (a === b) b = ri(1, 9);
  if (a > b) [a, b] = [b, a];
  const u = urne(2, 1, 1, { ns: [a, b] });
  const [A, B] = u.s;
  const t = pick([0, 1, 2]);
  const p = u.p;
  const text = [
    `Combien ${deN(plur(A))} faut-il ajouter pour que « ${evtTirer(u, A)} » et « ${evtTirer(u, B)} » soient équiprobables ?`,
    `Combien ${deN(plur(B))} faut-il enlever pour que les deux issues deviennent équiprobables ?`,
    `${p.nom} veut avoir autant de chances ${deV(evtTirer(u, A))} que ${deV(evtTirer(u, B))}. Combien ${deN(plur(A))} doit-${ilElle(p)} ajouter ?`,
  ][t];
  const rep = b - a;
  return {
    text: `${situation(u)} ${text}`,
    format: "short",
    expected: [String(rep)],
    comparator: "number_equal",
    explanation:
      "Méthode : deux issues sont équiprobables quand il y a AUTANT d’objets de chaque sorte.\n\n" +
      (t === 1
        ? `Calcul : il y a ${A.des(a)} et ${B.des(b)} ; en enlevant ${b} − ${a} = ${rep} ${plur(B)}, il en reste ${a} de chaque.\n\n`
        : `Calcul : il y a ${A.des(a)} et ${B.des(b)} ; en ajoutant ${b} − ${a} = ${rep} ${plur(A)}, il y en a ${b} de chaque.\n\n`) +
      `Conclusion : il faut ${t === 1 ? "en enlever" : "en ajouter"} ${rep} ; chaque issue a alors une probabilité de ${tf(1, 2)}.`,
    canvas: canvasUrne(u),
  };
}

const ROUES_ANGLES: ((p: Prenom) => string)[] = [
  () => "À la kermesse, la roue est partagée en secteurs",
  () => "À la fête foraine du Port, la roue de la loterie a des secteurs",
  () => "Dans un jeu télévisé, la grande roue a des secteurs",
  () => "Au marché de Saint-Paul, la roue d’un stand de loterie a des secteurs",
  (p) => `Dans le jeu de société ${de(p.nom)}, la roue a des secteurs`,
  () => "Pour la fête de l’école, une roue de la fortune a des secteurs",
];
const DECOUPES: Record<number, number[][]> = {
  3: [[180, 90, 90], [120, 150, 90], [60, 120, 180], [240, 60, 60], [150, 150, 60]],
  4: [[90, 90, 120, 60], [180, 60, 60, 60], [150, 90, 60, 60], [120, 120, 60, 60], [135, 45, 90, 90]],
};
/** ★3 — Une roue aux secteurs inégaux : ce n'est PAS 1/k. */
function eqRoueAngles(): Q {
  const k = pick([3, 4]);
  const cs = melange(["rouge", "bleu", "vert", "jaune", "orange"] as Coul[]).slice(0, k);
  const p = pick(PRENOMS);
  const ouiNon = Math.random() < 0.5;
  const egal = ouiNon && Math.random() < 0.4;
  const angles = egal ? Array(k).fill(360 / k) : melange(pick(DECOUPES[k]));
  const parts = listeFr(cs.map((c, i) => `un secteur ${c} de ${angles[i]}°`));
  const canvas = roueCanvas(cs.map((c, i) => ({ label: maj(c), poids: angles[i], couleur: HEX[c] })));
  const sit = `${pick(ROUES_ANGLES)(p)} de couleurs : ${parts}.`;
  if (ouiNon) {
    const T = pick([
      `Peut-on dire que chaque couleur a une probabilité de ${tf(1, k)} ?`,
      `${p.nom} affirme que chaque couleur a une chance sur ${k}. A-t-${ilElle(p)} raison ?`,
    ]);
    return {
      text: `${sit} ${T}`,
      format: "qcm",
      choices: [...OUI_NON],
      expected: [egal ? "oui" : "non"],
      comparator: "mcq_exact",
      explanation:
        "Méthode : sur une roue, la probabilité d’un secteur est proportionnelle à son angle : angle ÷ 360°.\n\n" +
        (egal
          ? `Calcul : les ${k} secteurs mesurent ${angles[0]}° : chacun vaut ${tf(angles[0], 360)} = ${tf(1, k)}.\n\n`
          : `Calcul : les secteurs n’ont pas le même angle ; par exemple ${leC(cs[0])} vaut ${egalites(angles[0], 360)}.\n\n`) +
        `Conclusion : ${egal ? "oui" : "non"}${egal ? "" : " : compter les couleurs ne suffit pas quand les secteurs sont inégaux"}.`,
      canvas,
    };
  }
  const i = ri(0, k - 1);
  const [n, d] = red(angles[i], 360);
  const { choices, expected } = qcmF([n, d], [[1, k], [angles[i], 100], red(360 - angles[i], 360), [1, 2]], 1);
  return {
    text: `${sit} Quelle est la probabilité d’obtenir ${leC(cs[i])} ?`,
    format: "qcm",
    choices,
    expected,
    comparator: "mcq_exact",
    explanation:
      "Méthode : les secteurs n’ont pas tous la même taille ; la probabilité d’un secteur est son angle sur 360°.\n\n" +
      `Calcul : ${egalites(angles[i], 360)}.\n\n` +
      `Conclusion : la probabilité d’obtenir ${leC(cs[i])} est ${tf(n, d)}. ⚠️ Pas ${tf(1, k)} : il y a ${k} couleurs, mais elles ne sont pas équiprobables.`,
    canvas,
  };
}

/* =========================================================================
   PROBA_EVENEMENT
========================================================================= */

const T_ISSUES_EVT = (e: string) =>
  pick([
    `Quelles issues réalisent l’événement « ${e} » ?`,
    `Quels résultats rendent vrai l’événement « ${e} » ?`,
    `L’événement « ${e} » est réalisé par quelles issues ?`,
  ]);
const T_COMPTE_EVT = (e: string) =>
  pick([
    `Combien d’issues réalisent l’événement « ${e} » ?`,
    `Combien de résultats rendent vrai l’événement « ${e} » ?`,
    `Par combien d’issues l’événement « ${e} » est-il réalisé ?`,
  ]);

/** ★1 — La liste des issues qui réalisent un événement (numéroté). */
function evtListe(): Q {
  const x = num((N) => N <= 12);
  const ev = pick(evenementsNum(x.N, x.ctx.m).filter((e) => favNum(x.N, e).length <= 6));
  const f = favNum(x.N, ev);
  const comp = range(1, x.N).filter((v) => !ev.ok(v));
  const extra = pick(comp);
  const fmt = (xs: number[]) => listeFr(xs.map(String));
  const bon = fmt(f);
  const leurres = [
    comp.length <= 8 ? fmt(comp) : fmt(comp.slice(0, 5)),
    f.length >= 2 ? fmt(f.slice(0, -1)) : fmt([...f, extra].sort((a, b) => a - b)),
    fmt([...f, extra].sort((a, b) => a - b)),
    fmt([...f, ...comp.filter((v) => v !== extra)].sort((a, b) => a - b).slice(0, f.length + 2)),
    fmt(range(1, x.N)),
  ];
  return {
    text: `${sitNum(x)} ${T_ISSUES_EVT(ev.lib)}`,
    format: "qcm",
    choices: qcm(bon, leurres),
    expected: [bon],
    comparator: "mcq_exact",
    explanation:
      `Méthode : on passe en revue les issues de 1 à ${x.N} et on garde celles qui rendent vrai « ${ev.lib} ».\n\n` +
      `Calcul : ${ev.juge(f[0])}, mais ${ev.juge(extra)}. Les issues qui conviennent sont ${bon}.\n\n` +
      `Conclusion : l’événement est réalisé par ${bon}.`,
    canvas: canvasNum(x, f),
  };
}

/** ★1 — Une urne : quelles sortes réalisent « n'est pas A » ou « A ou B » ? */
function evtListeUrne(): Q {
  const k = ri(3, 4);
  const u = urne(k, 1, 6);
  const [A, B] = u.s;
  const noms = u.s.map((s) => s.nom);
  const pas = Math.random() < 0.5;
  const e = pas ? `${u.ctx.sujet} n’est pas ${A.attr}` : `${u.ctx.sujet} est ${A.attr} ou ${B.attr}`;
  const bonNoms = pas ? noms.slice(1) : [A.nom, B.nom];
  const bon = listeFr(bonNoms);
  const leurres = [A.nom, listeFr(noms), pas ? listeFr([A.nom, B.nom]) : listeFr(noms.slice(2)), B.nom, listeFr(noms.slice(1, 3))];
  return {
    text: `${situation(u)} On note ${u.ctx.note}. ${T_ISSUES_EVT(e)}`,
    format: "qcm",
    choices: qcm(bon, leurres),
    expected: [bon],
    comparator: "mcq_exact",
    explanation:
      `Méthode : les issues sont ${listeFr(noms)} ; on garde celles qui rendent vrai « ${e} ».\n\n` +
      (pas ? `Calcul : toutes les issues sauf « ${A.nom} » conviennent.\n\n` : `Calcul : seules « ${A.nom} » et « ${B.nom} » conviennent ; « ou » veut dire l’une OU l’autre.\n\n`) +
      `Conclusion : l’événement est réalisé par ${bon}.`,
    canvas: canvasUrne(u),
  };
}

/** Un événement numéroté parmi certaines sortes (par le début de son libellé). */
function evtParmi(N: number, m: string, motif: RegExp): EvtNum {
  const L = evenementsNum(N, m);
  const ok = L.filter((e) => motif.test(e.lib));
  return pick(ok.length ? ok : L);
}

/** ★2 — Compter les issues d'un événement « supérieur / inférieur ». */
function evtCompter(): Q {
  const x = num((N) => N <= 30);
  const ev = evtParmi(x.N, x.ctx.m, /supérieur|inférieur|compris/);
  const f = favNum(x.N, ev);
  return {
    text: `${sitNum(x)} ${T_COMPTE_EVT(ev.lib)}`,
    format: "short",
    expected: [String(f.length)],
    comparator: "number_equal",
    explanation:
      `Méthode : on liste les issues de 1 à ${x.N} qui rendent vrai « ${ev.lib} » ; attention à « strictement » (la borne n’est pas comprise) et à « ou égal » (elle l’est).\n\n` +
      `Calcul : ce sont ${listeNum(f)}, soit ${f.length} issue${f.length > 1 ? "s" : ""}.\n\n` +
      `Conclusion : ${f.length} issue${f.length > 1 ? "s réalisent" : " réalise"} cet événement.`,
    canvas: canvasNum(x, f),
  };
}

/** ★2 — Cette issue réalise-t-elle l'événement ? */
function evtAppartient(): Q {
  const x = num();
  const ev = pick(evenementsNum(x.N, x.ctx.m));
  const f = favNum(x.N, ev);
  const non = range(1, x.N).filter((v) => !ev.ok(v));
  const dedans = Math.random() < 0.5;
  const v = dedans ? pick(f) : pick(non);
  const T = pick([
    `L’événement « ${ev.lib} » est-il réalisé ?`,
    `Cette issue réalise-t-elle l’événement « ${ev.lib} » ?`,
    `${x.p.nom} pensait à l’événement « ${ev.lib} ». Est-il réalisé ?`,
  ]);
  const rep = dedans ? "oui" : "non";
  return {
    text: `${sitNum(x)} Résultat : ${x.ctx.sujet} est ${v}. ${T}`,
    format: "qcm",
    choices: [...OUI_NON],
    expected: [rep],
    comparator: "mcq_exact",
    explanation:
      "Méthode : un événement est réalisé quand l’issue obtenue fait partie de ses issues.\n\n" +
      `Calcul : ${ev.juge(v)}.\n\n` +
      `Conclusion : ${rep}, l’événement « ${ev.lib} » ${dedans ? "est" : "n’est pas"} réalisé.`,
  };
}

/** ★3 — Compter les issues d'un événement arithmétique (multiple, premier, diviseur…). */
function evtArith(): Q {
  const x = num((N) => N >= 8);
  const ev = evtParmi(x.N, x.ctx.m, /multiple|premier|diviseur|unités|pair|impair/);
  const f = favNum(x.N, ev);
  return {
    text: `${sitNum(x)} ${T_COMPTE_EVT(ev.lib)}`,
    format: "short",
    expected: [String(f.length)],
    comparator: "number_equal",
    explanation:
      `Méthode : on cherche, parmi les ${x.ctx.m}s de 1 à ${x.N}, ceux qui rendent vrai « ${ev.lib} ».\n\n` +
      `Calcul : ce sont ${listeNum(f)}, soit ${f.length} issue${f.length > 1 ? "s" : ""}.` +
      (/premier/.test(ev.lib) ? " ⚠️ 1 n’est pas un nombre premier." : "") +
      `\n\nConclusion : ${f.length} issue${f.length > 1 ? "s réalisent" : " réalise"} cet événement.`,
  };
}

/** ★3 — Une urne : combien d'objets réalisent « n'est pas A » ou « A ou B » ? */
function evtUrneCompter(): Q {
  const k = ri(3, 4);
  const u = urne(k, 1, 7);
  const [A, B] = u.s;
  const pas = Math.random() < 0.5;
  const e = pas ? `${u.ctx.sujet} n’est pas ${A.attr}` : `${u.ctx.sujet} est ${A.attr} ou ${B.attr}`;
  const idx = pas ? range(1, k - 1) : [0, 1];
  const r = idx.reduce((a, i) => a + u.n[i], 0);
  const T = pick([
    `Combien de ${u.ctx.o.p} réalisent l’événement « ${e} » ?`,
    `Parmi les ${tot(u)} ${u.ctx.o.p}, combien rendent vrai l’événement « ${e} » ?`,
    `Combien de cas favorables compte l’événement « ${e} » ?`,
  ]);
  return {
    text: `${situation(u)} ${T}`,
    format: "short",
    expected: [String(r)],
    comparator: "number_equal",
    explanation:
      (pas ? `Méthode : « n’est pas ${A.attr} » regroupe toutes les autres sortes.\n\n` : `Méthode : « ou » regroupe les deux sortes.\n\n`) +
      `Calcul : ${idx.map((i) => u.n[i]).join(" + ")} = ${r}.\n\n` +
      `Conclusion : ${r} ${u.ctx.o.p} réalisent cet événement.`,
    canvas: canvasUrne(u),
  };
}

/** ★4 — Quel événement correspond à cette liste d'issues ? */
function evtDecrire(): Q {
  const x = num((N) => N >= 6 && N <= 20);
  const L = evenementsNum(x.N, x.ctx.m).filter((e) => favNum(x.N, e).length >= 2 && favNum(x.N, e).length <= 8);
  const ev = pick(L.length ? L : evenementsNum(x.N, x.ctx.m));
  const f = favNum(x.N, ev);
  const cle = (e: EvtNum) => favNum(x.N, e).join(",");
  const autres = evenementsNum(x.N, x.ctx.m).concat(evenementsNum(x.N, x.ctx.m)).filter((e) => cle(e) !== cle(ev));
  const leurres = [...new Set(autres.map((e) => e.lib))];
  const T = pick([
    `Un événement est réalisé exactement par les issues ${listeNum(f)}. Lequel ?`,
    `Quel événement est réalisé par les issues ${listeNum(f)}, et seulement par elles ?`,
    `${x.p.nom} a entouré les issues ${listeNum(f)}. Quel événement a-t-${ilElle(x.p)} représenté ?`,
  ]);
  return {
    text: `${sitNum(x)} ${T}`,
    format: "qcm",
    choices: qcm(ev.lib, leurres),
    expected: [ev.lib],
    comparator: "mcq_exact",
    explanation:
      "Méthode : pour chaque proposition, on liste ses issues et on compare à la liste donnée.\n\n" +
      `Calcul : « ${ev.lib} » est réalisé par ${listeNum(f)} : c’est exactement la liste.\n\n` +
      `Conclusion : l’événement est « ${ev.lib} ».`,
  };
}

/** ★4 — « A et B », « A ou B » : compter. */
function evtEtOu(): Q {
  const x = num((N) => N >= 8 && N <= 30);
  const L = evenementsNum(x.N, x.ctx.m).filter((e) => e.combinable);
  let a = pick(L);
  let b = pick(L);
  let t = 0;
  while ((a.adj === b.adj || /supérieur|inférieur/.test(a.adj) === /supérieur|inférieur/.test(b.adj)) && t++ < 40) {
    a = pick(L);
    b = pick(L);
  }
  if (a.adj === b.adj) b = L.find((e) => e.adj !== a.adj) ?? b;
  const fa = favNum(x.N, a);
  const fb = favNum(x.N, b);
  const et = Math.random() < 0.55;
  const r = et ? fa.filter(b.ok) : range(1, x.N).filter((v) => a.ok(v) || b.ok(v));
  const e = `obtenir un ${x.ctx.m} ${a.adj} ${et ? "et" : "ou"} ${b.adj}`;
  return {
    text: `${sitNum(x)} ${T_COMPTE_EVT(e)}`,
    format: "short",
    expected: [String(r.length)],
    comparator: "number_equal",
    explanation:
      `Méthode : « ${et ? "et" : "ou"} » veut dire ${et ? "les deux conditions À LA FOIS" : "l’une OU l’autre (ou les deux)"}.\n\n` +
      `Calcul : ${a.adj} : ${listeNum(fa)} ; ${b.adj} : ${listeNum(fb)}. ${et ? "Dans les deux listes" : "Dans au moins une des listes"} : ${listeNum(r)}.\n\n` +
      `Conclusion : ${r.length} issue${r.length > 1 ? "s réalisent" : " réalise"} l’événement.`,
  };
}

/* =========================================================================
   PROBA_CALCULER
========================================================================= */

const T_PROBA_FMT = () =>
  pick([
    "",
    " Donne le résultat sous forme d’une fraction.",
    " Donne le résultat sous forme d’une fraction irréductible.",
    " Tu peux répondre par une fraction, un décimal ou un pourcentage.",
  ]);

/** ★2 — Une urne : P(sorte) en QCM. */
function calcUrne(): Q {
  const k = ri(2, 4);
  const u = urne(k, 1, 8);
  const i = ri(0, k - 1);
  const s = u.s[i];
  const T0 = tot(u);
  const ni = u.n[i];
  const { choices, expected } = qcmF([ni, T0], [[1, k], [T0 - ni, T0], [T0, ni], [ni, T0 - ni], [1, T0]], 1);
  const T = pick([
    `Quelle est la probabilité de l’événement « ${evtTirer(u, s)} » ?`,
    `Quelle est la probabilité ${queV(u.ctx.sujet)} soit ${s.attr} ?`,
    `Quelle est la probabilité ${deV(evtTirer(u, s))} ?`,
  ]);
  return {
    text: `${situation(u)} ${T}`,
    format: "qcm",
    choices,
    expected,
    comparator: "mcq_exact",
    explanation:
      "Définition : en situation d’équiprobabilité, probabilité = nombre de cas favorables ÷ nombre de cas possibles, écrite en fraction.\n\n" +
      `Calcul : il y a ${u.n.join(" + ")} = ${T0} ${u.ctx.o.p}, dont ${s.des(ni)} : ${egalites(ni, T0)}.\n\n` +
      `Conclusion : la probabilité est ${tf(ni, T0)}. ⚠️ Pas ${tf(1, k)} : les ${k} sortes n’ont pas le même nombre d’objets.`,
    canvas: canvasUrne(u),
  };
}

/** ★2 — Une expérience numérotée : P(événement), réponse libre. */
function calcNum(): Q {
  const x = num();
  const ev = pick(evenementsNum(x.N, x.ctx.m));
  const f = favNum(x.N, ev);
  const T = pick([
    `Quelle est la probabilité de l’événement « ${ev.lib} » ?`,
    `Calcule la probabilité ${deV(ev.lib)}.`,
    `Quelle est la probabilité ${deV(ev.lib)} ?`,
  ]);
  return {
    text: `${sitNum(x)} ${T}${T_PROBA_FMT()}`,
    format: "short",
    expected: ecritures(f.length, x.N),
    comparator: "fraction_decimal_equivalent",
    explanation:
      `Méthode : les ${x.N} issues sont équiprobables (${x.ctx.equi}) ; on compte les issues favorables.\n\n` +
      `Calcul : « ${ev.lib} » est réalisé par ${listeNum(f)}, soit ${f.length} issue${f.length > 1 ? "s" : ""} sur ${x.N} : ${egalites(f.length, x.N)}.\n\n` +
      `Conclusion : la probabilité est ${tf(...red(f.length, x.N))}.`,
    canvas: canvasNum(x, f),
  };
}

type EvtCarte = { lib: string; n32: number; n52: number; calc32: string; calc52: string };
const EVTS_CARTES: EvtCarte[] = [
  { lib: "tirer un roi", n32: 4, n52: 4, calc32: "un roi par couleur : 4", calc52: "un roi par couleur : 4" },
  { lib: "tirer un cœur", n32: 8, n52: 13, calc32: "8 cartes par couleur", calc52: "13 cartes par couleur" },
  { lib: "tirer une figure (valet, dame ou roi)", n32: 12, n52: 12, calc32: "3 figures × 4 couleurs = 12", calc52: "3 figures × 4 couleurs = 12" },
  { lib: "tirer une carte rouge", n32: 16, n52: 26, calc32: "cœurs et carreaux : 8 + 8 = 16", calc52: "cœurs et carreaux : 13 + 13 = 26" },
  { lib: "tirer un as rouge", n32: 2, n52: 2, calc32: "l’as de cœur et l’as de carreau : 2", calc52: "l’as de cœur et l’as de carreau : 2" },
  { lib: "tirer un as ou un roi", n32: 8, n52: 8, calc32: "4 as + 4 rois = 8", calc52: "4 as + 4 rois = 8" },
  { lib: "tirer la dame de pique", n32: 1, n52: 1, calc32: "une seule carte", calc52: "une seule carte" },
  { lib: "tirer une figure rouge", n32: 6, n52: 6, calc32: "3 figures × 2 couleurs rouges = 6", calc52: "3 figures × 2 couleurs rouges = 6" },
  { lib: "tirer un pique qui n’est pas une figure", n32: 5, n52: 10, calc32: "8 piques − 3 figures = 5", calc52: "13 piques − 3 figures = 10" },
  { lib: "tirer un 10", n32: 4, n52: 4, calc32: "un 10 par couleur : 4", calc52: "un 10 par couleur : 4" },
];
/** ★3 — Le jeu de 32 ou 52 cartes (le classique du brevet). */
function calcCartes(): Q {
  const j32 = Math.random() < 0.5;
  const T0 = j32 ? 32 : 52;
  const e = pick(EVTS_CARTES);
  const n = j32 ? e.n32 : e.n52;
  const p = pick(PRENOMS);
  const intro = j32
    ? "Un jeu de 32 cartes a 4 couleurs (cœur, carreau, pique, trèfle) ; chaque couleur compte 8 cartes : 7, 8, 9, 10, valet, dame, roi et as."
    : "Un jeu de 52 cartes a 4 couleurs (cœur, carreau, pique, trèfle) ; chaque couleur compte 13 cartes : de l’as au 10, puis valet, dame et roi.";
  const T = pick([
    `Quelle est la probabilité de ${e.lib} ?`,
    `Quelle est la probabilité de l’événement « ${e.lib} » ?`,
    `${maj(ilElle(p))} espère ${e.lib}. Avec quelle probabilité ?`,
  ]);
  const { choices, expected } = qcmF([n, T0], [[1, T0], [n, T0 - n], [1, 4], [T0, n], [n, j32 ? 52 : 32]]);
  return {
    text: `${intro} Les cœurs et les carreaux sont rouges, les piques et les trèfles sont noirs. ${p.nom} tire une carte au hasard. ${T}`,
    format: "qcm",
    choices,
    expected,
    comparator: "mcq_exact",
    explanation:
      `Méthode : les ${T0} cartes sont équiprobables ; on compte les cartes favorables.\n\n` +
      `Calcul : ${j32 ? e.calc32 : e.calc52} carte${n > 1 ? "s" : ""} favorable${n > 1 ? "s" : ""} sur ${T0} : ${egalites(n, T0)}.\n\n` +
      `Conclusion : la probabilité est ${tf(n, T0)}.`,
  };
}

/** ★3 — Une urne : P(A ou B), réponse libre. */
function calcOu(): Q {
  const k = ri(3, 4);
  const u = urne(k, 1, 7);
  const [A, B] = u.s;
  const T0 = tot(u);
  const f = u.n[0] + u.n[1];
  const e = pick([`${u.ctx.sujet} est ${A.attr} ou ${B.attr}`, `${evtTirer(u, A)} ou ${B.un}`]);
  return {
    text: `${situation(u)} Quelle est la probabilité de l’événement « ${e} » ?${T_PROBA_FMT()}`,
    format: "short",
    expected: ecritures(f, T0),
    comparator: "fraction_decimal_equivalent",
    explanation:
      "Méthode : « ou » regroupe les deux sortes ; on additionne leurs objets, puis on divise par le total.\n\n" +
      `Calcul : ${u.n[0]} + ${u.n[1]} = ${f} cas favorables sur ${T0} : ${egalites(f, T0)}.\n\n` +
      `Conclusion : la probabilité est ${tf(...red(f, T0))}.`,
    canvas: canvasUrne(u),
  };
}

type CtxTab = {
  intro: (T: number) => string;
  tire: string;
  lignes: [string, string][];
  cols: [string, string][];
  cell: (r: number, c: number) => string;
};
const CTX_TABLEAUX: CtxTab[] = [
  {
    intro: (T) => `Dans une classe de 3e d’un collège de Saint-Louis, il y a ${T} élèves. Le tableau donne leur répartition.`,
    tire: "On tire au sort un élève.",
    lignes: [["Filles", "une fille"], ["Garçons", "un garçon"]],
    cols: [["Demi-pensionnaires", "un élève demi-pensionnaire"], ["Externes", "un élève externe"]],
    cell: (r, c) => `${["une fille", "un garçon"][r]} ${["demi-pensionnaire", "externe"][c]}`,
  },
  {
    intro: (T) => `Dans un collège de Saint-Joseph, on a demandé à ${T} élèves comment ils viennent le matin. Voici les résultats.`,
    tire: "On choisit un de ces élèves au hasard.",
    lignes: [["4e", "un élève de 4e"], ["3e", "un élève de 3e"]],
    cols: [["En car jaune", "un élève qui vient en car jaune"], ["À pied", "un élève qui vient à pied"]],
    cell: (r, c) => `un élève de ${["4e", "3e"][r]} qui vient ${["en car jaune", "à pied"][c]}`,
  },
  {
    intro: (T) => `Au club de vacances de Saint-Leu, ${T} jeunes sont inscrits. Le tableau indique qui fait du surf.`,
    tire: "Le moniteur tire au sort un jeune.",
    lignes: [["Filles", "une fille"], ["Garçons", "un garçon"]],
    cols: [["Surf", "un jeune qui fait du surf"], ["Pas de surf", "un jeune qui ne fait pas de surf"]],
    cell: (r, c) => `${["une fille", "un garçon"][r]} qui ${["fait", "ne fait pas"][c]} du surf`,
  },
  {
    intro: (T) => `Au collège, ${T} élèves de 4e et de 3e ont répondu à une enquête sur l’UNSS.`,
    tire: "On interroge l’un d’eux au hasard.",
    lignes: [["Inscrits à l’UNSS", "un élève inscrit à l’UNSS"], ["Non inscrits", "un élève non inscrit à l’UNSS"]],
    cols: [["4e", "un élève de 4e"], ["3e", "un élève de 3e"]],
    cell: (r, c) => `un élève de ${["4e", "3e"][c]} ${["inscrit", "non inscrit"][r]} à l’UNSS`,
  },
  {
    intro: (T) => `Pour la journée créole, ${T} élèves ont choisi leur plat. Le tableau donne leurs choix.`,
    tire: "On tire au sort un élève.",
    lignes: [["Élèves de 5e", "un élève de 5e"], ["Élèves de 6e", "un élève de 6e"]],
    cols: [["Cari poulet", "un élève qui a choisi le cari poulet"], ["Rougail saucisses", "un élève qui a choisi le rougail saucisses"]],
    cell: (r, c) => `un élève de ${["5e", "6e"][r]} qui a choisi ${["le cari poulet", "le rougail saucisses"][c]}`,
  },
];
/** ★3 — Un tableau à double entrée : P en fraction, décimal ou pourcentage. */
function calcTableau(): Q {
  const c = pick(CTX_TABLEAUX);
  const T0 = pick([20, 25, 40, 50]);
  const v = [1, 1, 1, 1];
  for (let i = 4; i < T0; i++) v[ri(0, 3)]++;
  const [a, b, cc, d] = v;
  const lignes = [
    [c.lignes[0][0], String(a), String(b), String(a + b)],
    [c.lignes[1][0], String(cc), String(d), String(cc + d)],
    ["Total", String(a + cc), String(b + d), String(T0)],
  ];
  const sorte = pick(["cell", "ligne", "col"] as const);
  let desc = "";
  let n = 0;
  let calc = "";
  if (sorte === "cell") {
    const r = ri(0, 1);
    const k = ri(0, 1);
    desc = c.cell(r, k);
    n = v[2 * r + k];
    calc = `on lit la case « ${c.lignes[r][0]} / ${c.cols[k][0]} » : ${n}`;
  } else if (sorte === "ligne") {
    const r = ri(0, 1);
    desc = c.lignes[r][1];
    n = v[2 * r] + v[2 * r + 1];
    calc = `on lit le total de la ligne « ${c.lignes[r][0]} » : ${v[2 * r]} + ${v[2 * r + 1]} = ${n}`;
  } else {
    const k = ri(0, 1);
    desc = c.cols[k][1];
    n = v[k] + v[2 + k];
    calc = `on lit le total de la colonne « ${c.cols[k][0]} » : ${v[k]} + ${v[2 + k]} = ${n}`;
  }
  const fmt = pick(["", " Donne le résultat en pourcentage.", " Donne le résultat sous forme décimale.", " Donne le résultat sous forme d’une fraction."]);
  return {
    text: `${c.intro(T0)} ${c.tire} Quelle est la probabilité que ce soit ${desc} ?${fmt}`,
    format: "short",
    expected: ecritures(n, T0),
    comparator: "fraction_decimal_equivalent",
    explanation:
      `Méthode : les ${T0} personnes ont toutes la même chance d’être tirées ; ${calc}.\n\n` +
      `Calcul : ${egalites(n, T0)}.\n\n` +
      `Conclusion : la probabilité est ${tf(...red(n, T0))}, soit ${pourcent(n, T0)}.`,
    canvas: tableauCanvas(["", c.cols[0][0], c.cols[1][0], "Total"], lignes),
  };
}

/** ★3 — La somme des probabilités vaut 1 : trouver celle qui manque. */
function calcSomme1(): Q {
  const p = pick(PRENOMS);
  const cas = pick(["de", "roue", "playlist", "bonbons"] as const);
  let issues: string[] = [];
  let intro = "";
  let quoi = "";
  if (cas === "de") {
    issues = ["1", "2", "3", "4", "5", "6"];
    intro = `${p.nom} a un dé truqué. Le tableau donne la probabilité de chaque face, sauf celle du ${"6"}.`;
    quoi = "d’obtenir 6";
  } else if (cas === "roue") {
    issues = melange(["Rouge", "Bleu", "Vert", "Jaune", "Orange"]).slice(0, 4);
    intro = `À la fête foraine du Port, une roue truquée a quatre couleurs. On connaît la probabilité de trois couleurs.`;
    quoi = `d’obtenir ${leC(issues[3].toLowerCase())}`;
  } else if (cas === "playlist") {
    issues = melange(["Maloya", "Séga", "Rap", "Dancehall", "Zouk"]).slice(0, 4);
    intro = `L’application musicale ${de(p.nom)} choisit le style du prochain morceau. On connaît la probabilité de trois styles.`;
    quoi = `que le morceau soit du ${issues[3].toLowerCase()}`;
  } else {
    issues = melange(["Rose", "Blanc", "Jaune", "Vert"]).slice(0, 3);
    intro = `Une boîte de bonbons coco contient des bonbons de trois couleurs. On en prend un au hasard et on connaît deux probabilités.`;
    quoi = `de prendre un bonbon ${issues[2].toLowerCase()}`;
  }
  const k = issues.length;
  const D = cas === "bonbons" ? pick([12, 20, 24, 30]) : 100;
  const unite = cas === "bonbons" ? 1 : 5;
  const vals = Array(k).fill(unite);
  for (let s = unite * k; s < D; s += unite) vals[ri(0, k - 1)] += unite;
  const affiche = (x: number) => (cas === "bonbons" ? tf(...red(x, D)) : fr(x / 100));
  const connus = vals.slice(0, -1);
  const x = vals[k - 1];
  const lignes = [["Probabilité", ...connus.map(affiche), "?"]];
  const enTexte = issues.slice(0, -1).map((is, i) => `P(${is}) = ${affiche(connus[i])}`).join(" ; ");
  return {
    text: `${intro} ${enTexte}. Quelle est la probabilité ${quoi} ?`,
    format: "short",
    expected: ecritures(x, D),
    comparator: "fraction_decimal_equivalent",
    explanation:
      "Définition : la somme des probabilités de toutes les issues vaut 1.\n\n" +
      (cas === "bonbons"
        ? `Calcul : en ${D}e : ${connus.map((c) => tf(c, D)).join(" + ")} = ${tf(D - x, D)}, donc il reste ${tf(D, D)} − ${tf(D - x, D)} = ${tf(x, D)}.\n\n`
        : `Calcul : ${connus.map((c) => fr(c / 100)).join(" + ")} = ${fr((D - x) / 100)}, donc 1 − ${fr((D - x) / 100)} = ${fr(x / 100)}.\n\n`) +
      `Conclusion : la probabilité ${quoi} est ${cas === "bonbons" ? tf(...red(x, D)) : fr(x / 100)}.`,
    canvas: tableauCanvas(["Issue", ...issues], lignes),
  };
}

/* =========================================================================
   PROBA_EVENEMENT_CONTRAIRE
========================================================================= */

/** ★2 — Écrire l'événement contraire (les vraies erreurs : < au lieu de ≤…). */
function ctrNommer(): Q {
  const T = (e: string) =>
    pick([
      `Quel est l’événement contraire de « ${e} » ?`,
      `Quel événement est réalisé exactement quand « ${e} » ne l’est pas ?`,
      `Comment s’écrit le contraire de l’événement « ${e} » ?`,
    ]);
  if (Math.random() < 0.6) {
    const x = num();
    const ev = pick(evenementsNum(x.N, x.ctx.m));
    const f = favNum(x.N, ev);
    const nf = range(1, x.N).filter((v) => !ev.ok(v));
    return {
      text: `${sitNum(x)} ${T(ev.lib)}`,
      format: "qcm",
      choices: qcm(ev.contraire, ev.pieges),
      expected: [ev.contraire],
      comparator: "mcq_exact",
      explanation:
        "Définition : le contraire de A est réalisé par TOUTES les issues qui ne réalisent pas A.\n\n" +
        `Calcul : « ${ev.lib} » est réalisé par ${listeNum(f)} ; il reste ${listeNum(nf)}, c’est-à-dire « ${ev.contraire} ».\n\n` +
        `Conclusion : le contraire est « ${ev.contraire} ».` +
        (/strictement|ou égal/.test(ev.lib) ? " ⚠️ Attention à la borne : elle passe d’un côté à l’autre." : ""),
    };
  }
  const u = urne(3, 1, 6);
  const [A, B, C] = u.s;
  const bon = Math.random() < 0.5 ? `${u.ctx.sujet} n’est pas ${A.attr}` : `${u.ctx.sujet} est ${B.attr} ou ${C.attr}`;
  const leurres = [`${u.ctx.sujet} est ${B.attr}`, `${u.ctx.sujet} est ${C.attr}`, `${u.ctx.sujet} est ${A.attr} ou ${B.attr}`];
  const e = evtU(u, A);
  return {
    text: `${situation(u)} ${T(e)}`,
    format: "qcm",
    choices: qcm(bon, leurres),
    expected: [bon],
    comparator: "mcq_exact",
    explanation:
      "Définition : le contraire de A est réalisé par TOUTES les issues qui ne réalisent pas A.\n\n" +
      `Calcul : les issues sont ${listeFr(u.s.map((s) => s.nom))} ; sans « ${A.nom} », il reste « ${B.nom} » et « ${C.nom} », les DEUX.\n\n` +
      `Conclusion : le contraire est « ${bon} ».`,
    canvas: canvasUrne(u),
  };
}

type SitC = { pose: (p: Prenom, v: string) => string; non: (p: Prenom) => string; note?: string };
const SITS_CONTRAIRE: SitC[] = [
  { pose: (_p, v) => `La probabilité que le car jaune soit en retard ce matin est ${v}.`, non: () => "que le car jaune ne soit pas en retard" },
  { pose: (_p, v) => `La probabilité qu’il pleuve dimanche à Salazie est ${v}.`, non: () => "qu’il ne pleuve pas dimanche à Salazie" },
  { pose: (p, v) => `${p.nom} réussit un penalty avec une probabilité de ${v}.`, non: (p) => queV(`${p.nom} rate son penalty`) },
  { pose: (_p, v) => `La probabilité de gagner un lot à la tombola de la kermesse est ${v}.`, non: () => "de ne pas gagner de lot" },
  { pose: (_p, v) => `La probabilité qu’une graine de piment germe est ${v}.`, non: () => "qu’elle ne germe pas" },
  { pose: (_p, v) => `Des volcanologues estiment à ${v} la probabilité que le Piton de la Fournaise entre en éruption ce mois-ci.`, non: () => "qu’il n’entre pas en éruption ce mois-ci" },
  { pose: (_p, v) => `Lors d’une sortie en mer à Saint-Gilles, la probabilité de voir des baleines est ${v}.`, non: () => "de ne pas en voir" },
  { pose: (p, v) => `La probabilité ${queV(p.nom)} pioche une carte de type Feu est ${v}.`, non: (p) => `${queV(ilElle(p))} ne pioche pas de carte de type Feu` },
  { pose: (_p, v) => `Une application estime à ${v} la probabilité que la route du littoral soit fermée demain.`, non: () => "qu’elle soit ouverte demain" },
  { pose: (p, v) => `La probabilité que l’équipe de handball ${de(p.nom)} gagne son match est ${v}.`, non: () => "qu’elle ne gagne pas", note: " ⚠️ « Ne pas gagner » comprend la défaite ET le match nul : ce n’est pas « perdre »." },
  { pose: (_p, v) => `La probabilité que la lecture aléatoire lance un morceau de maloya est ${v}.`, non: () => "qu’elle lance un morceau d’un autre style" },
  { pose: (_p, v) => `La probabilité qu’un letchi de la barquette soit abîmé est ${v}.`, non: () => "qu’il ne soit pas abîmé" },
  { pose: (p, v) => `${p.nom} arrive à l’heure au collège avec une probabilité de ${v}.`, non: (p) => `${queV(ilElle(p))} arrive en retard` },
  { pose: (_p, v) => `La probabilité qu’un ticket de la tombola soit gagnant est ${v}.`, non: () => "qu’il soit perdant" },
];
const T_NON = (non: string) => pick([`Quelle est la probabilité ${non} ?`, `Que vaut la probabilité ${non} ?`, `Calcule la probabilité ${non}.`]);

/** ★2 — P(A) en fraction → P(non A), QCM. */
function ctrFraction(): Q {
  const b = ri(3, 12);
  let a = ri(1, b - 1);
  while (2 * a === b) a = ri(1, b - 1);
  const s = pick(SITS_CONTRAIRE);
  const p = pick(PRENOMS);
  const { choices, expected } = qcmF([b - a, b], [[a, b], [b, a], [b - a, a], [a, b - a], [1, b]], 1);
  return {
    text: `${s.pose(p, tf(a, b))} ${T_NON(s.non(p))}`,
    format: "qcm",
    choices,
    expected,
    comparator: "mcq_exact",
    explanation:
      "Définition : p(non A) = 1 − p(A), car un événement et son contraire se partagent toutes les issues.\n\n" +
      `Calcul : 1 − ${tf(a, b)} = ${tf(b, b)} − ${tf(a, b)} = ${tf(b - a, b)}.\n\n` +
      `Conclusion : la probabilité ${s.non(p)} est ${tf(b - a, b)}.${s.note ?? ""}`,
  };
}

/** ★3 — P(A) en décimal ou en pourcentage → P(non A), réponse libre. */
function ctrDecimal(): Q {
  let x = ri(5, 95);
  while (x === 50) x = ri(5, 95);
  const pct = Math.random() < 0.5;
  const v = pct ? `${x} %` : fr(x / 100);
  const s = pick(SITS_CONTRAIRE);
  const p = pick(PRENOMS);
  const fmt = pick(["", pct ? " Donne le résultat en pourcentage." : " Donne le résultat sous forme décimale."]);
  return {
    text: `${s.pose(p, v)} ${T_NON(s.non(p))}${fmt}`,
    format: "short",
    expected: ecritures(100 - x, 100),
    comparator: "fraction_decimal_equivalent",
    explanation:
      "Définition : p(non A) = 1 − p(A) (ou 100 % − p(A) en pourcentage).\n\n" +
      (pct ? `Calcul : 100 % − ${x} % = ${100 - x} %.\n\n` : `Calcul : 1 − ${v} = ${fr((100 - x) / 100)}.\n\n`) +
      `Conclusion : la probabilité ${s.non(p)} est ${pct ? `${100 - x} %` : fr((100 - x) / 100)}.${s.note ?? ""}`,
  };
}

/** ★3 — Une urne : P(n'est pas A), réponse libre. */
function ctrUrne(): Q {
  const k = ri(2, 4);
  const u = urne(k, 1, 8);
  const A = u.s[0];
  const T0 = tot(u);
  const nA = u.n[0];
  const T = pick([
    `Quelle est la probabilité de l’événement « ${u.ctx.sujet} n’est pas ${A.attr} » ?`,
    `Quelle est la probabilité de l’événement contraire de « ${evtTirer(u, A)} » ?`,
    `Quelle est la probabilité ${queV(u.ctx.sujet)} ne soit pas ${A.attr} ?`,
  ]);
  return {
    text: `${situation(u)} ${T}${T_PROBA_FMT()}`,
    format: "short",
    expected: ecritures(T0 - nA, T0),
    comparator: "fraction_decimal_equivalent",
    explanation:
      "Définition : p(non A) = 1 − p(A).\n\n" +
      `Calcul : p(A) = ${tf(nA, T0)}, donc p(non A) = 1 − ${tf(nA, T0)} = ${egalites(T0 - nA, T0)}. On le vérifie : il y a ${T0} − ${nA} = ${T0 - nA} ${u.ctx.o.p} qui ne sont pas des ${plur(A)}.\n\n` +
      `Conclusion : la probabilité est ${tf(...red(T0 - nA, T0))}.`,
    canvas: canvasUrne(u),
  };
}

/** ★3 — Numéroté : P(contraire), réponse libre. */
function ctrNum(): Q {
  const x = num();
  const ev = pick(evenementsNum(x.N, x.ctx.m));
  const f = favNum(x.N, ev).length;
  const t = pick([0, 1, 2]);
  const T = [
    `Quelle est la probabilité de l’événement contraire de « ${ev.lib} » ?`,
    `Quelle est la probabilité de l’événement « ${ev.contraire} » ?`,
    `La probabilité ${deV(ev.lib)} est ${tf(f, x.N)}. Quelle est la probabilité de l’événement contraire ?`,
  ][t];
  return {
    text: `${sitNum(x)} ${T}`,
    format: "short",
    expected: ecritures(x.N - f, x.N),
    comparator: "fraction_decimal_equivalent",
    explanation:
      `Définition : le contraire de « ${ev.lib} » est « ${ev.contraire} », et p(non A) = 1 − p(A).\n\n` +
      `Calcul : p(A) = ${tf(f, x.N)}, donc p(non A) = 1 − ${tf(f, x.N)} = ${egalites(x.N - f, x.N)}.\n\n` +
      `Conclusion : la probabilité est ${tf(...red(x.N - f, x.N))}.`,
  };
}

/** ★4 — Trois sortes, deux probabilités connues : la troisième. */
function ctrPartition(): Q {
  const T0 = pick([12, 20, 24, 30, 40]);
  let nA = 0;
  let nB = 0;
  do {
    nA = ri(1, T0 - 2);
    nB = ri(1, T0 - nA - 1);
  } while (red(nA, T0)[1] === 1 || red(nB, T0)[1] === 1);
  const nC = T0 - nA - nB;
  const u = urne(3, 1, 1, { ns: [nA, nB, nC] });
  const [A, B, C] = u.s;
  const T = pick([
    `Quelle est la probabilité ${deV(evtTirer(u, C))} ?`,
    `Quelle est la probabilité ${queV(u.ctx.sujet)} soit ${C.attr} ?`,
    `Quelle est la probabilité de l’événement « ${u.ctx.sujet} est ${C.attr} » ?`,
  ]);
  const pa = red(nA, T0);
  const pb = red(nB, T0);
  const { choices, expected } = qcmF([nC, T0], [[nA + nB, T0], [1, 3], [T0 - nA, T0], [T0 - nB, T0]], 1);
  return {
    text: `${u.ctx.pose(u.p, desSortes(u.s))} ${u.ctx.tire(u.p)} La probabilité ${deV(evtTirer(u, A))} est ${tf(...pa)} et celle ${deV(evtTirer(u, B))} est ${tf(...pb)}. ${T}`,
    format: "qcm",
    choices,
    expected,
    comparator: "mcq_exact",
    explanation:
      "Définition : les trois sortes se partagent toutes les issues, donc la somme des trois probabilités vaut 1.\n\n" +
      `Calcul : on écrit tout en ${T0}e : ${[[pa, nA], [pb, nB]].filter(([f]) => (f as Fr)[1] !== T0).map(([f, n]) => `${tf(...(f as Fr))} = ${tf(n as number, T0)}`).join(" et ") || "c’est déjà fait"}. Donc ${tf(T0, T0)} − ${tf(nA, T0)} − ${tf(nB, T0)} = ${tf(nC, T0)}.\n\n` +
      `Conclusion : la probabilité est ${tf(nC, T0)}. ⚠️ Ne pas oublier le « 1 − » : ${tf(nA + nB, T0)} est la probabilité du contraire.`,
  };
}

/** ★4 — « Au moins un » : par le contraire « aucun ». */
function ctrAuMoins(): Q {
  const p = pick(PRENOMS);
  const cas = pick(["pieces", "des", "roue", "urne"] as const);
  let text = "";
  let num0 = 0;
  let den = 0;
  let calc = "";
  if (cas === "pieces") {
    const n = pick([2, 3]);
    const cote = pick(["pile", "face"]);
    const autre = cote === "pile" ? "face" : "pile";
    den = 2 ** n;
    num0 = den - 1;
    text = `${p.nom} lance ${n} fois une pièce équilibrée. Quelle est la probabilité d’obtenir au moins une fois ${cote} ?`;
    calc = `le contraire est « ${autre} à chaque lancer », de probabilité ${Array(n).fill(tf(1, 2)).join(" × ")} = ${tf(1, den)}. Donc 1 − ${tf(1, den)} = ${tf(num0, den)}`;
  } else if (cas === "des") {
    const N = pick([4, 6, 8]);
    const v = ri(1, N);
    den = N * N;
    num0 = den - (N - 1) ** 2;
    text = `${p.nom} lance deux dés équilibrés à ${N} faces, numérotées de 1 à ${N}. Quelle est la probabilité d’obtenir au moins un ${v} ?`;
    calc = `le contraire est « aucun ${v} » : ${tf(N - 1, N)} × ${tf(N - 1, N)} = ${tf((N - 1) ** 2, den)}. Donc 1 − ${tf((N - 1) ** 2, den)} = ${tf(num0, den)}`;
  } else if (cas === "roue") {
    const n = pick([4, 5, 6, 8]);
    const r = ri(1, n - 1);
    den = n * n;
    num0 = den - (n - r) ** 2;
    text = `À la kermesse, une roue a ${n} secteurs identiques dont ${r} rouge${r > 1 ? "s" : ""}. ${p.nom} la fait tourner deux fois. Quelle est la probabilité d’obtenir au moins une fois le rouge ?`;
    calc = `le contraire est « jamais rouge » : ${tf(n - r, n)} × ${tf(n - r, n)} = ${tf((n - r) ** 2, den)}. Donc 1 − ${tf((n - r) ** 2, den)} = ${tf(num0, den)}`;
  } else {
    const u = urne(2, 1, 6, { deux: true });
    const [A] = u.s;
    const T0 = tot(u);
    const nb = T0 - u.n[0];
    den = T0 * T0;
    num0 = den - nb * nb;
    text = `${situation(u)} ${maj(ilElle(u.p))} note ${u.ctx.note}, ${u.ctx.o.f ? "la" : "le"} remet avec les autres, puis recommence une seconde fois. Quelle est la probabilité ${deV(`${u.ctx.verbe} au moins une fois ${A.un}`)} ?`;
    calc = `le contraire est « aucun${u.ctx.o.f ? "e" : ""} ${A.nom} sur les deux tirages » : ${tf(nb, T0)} × ${tf(nb, T0)} = ${tf(nb * nb, den)}. Donc 1 − ${tf(nb * nb, den)} = ${tf(num0, den)}`;
  }
  return {
    text,
    format: "short",
    expected: ecritures(num0, den),
    comparator: "fraction_decimal_equivalent",
    explanation:
      "Méthode : le contraire de « au moins un » est « aucun » ; on calcule p(aucun) sur l’arbre, puis 1 − p(aucun).\n\n" +
      `Calcul : ${calc}.\n\n` +
      `Conclusion : la probabilité est ${tf(...red(num0, den))}.`,
  };
}

/* =========================================================================
   PROBA_DEUX_EPREUVE
========================================================================= */

const CARIS = ["cari poulet", "rougail saucisses", "cari ti-jacques", "cari bichiques", "civet zourite", "rougail boucané"];
const DESSERTS = ["gâteau patate", "flan coco", "salade de letchis", "gâteau ti-son", "banane flambée"];
const DESTINATIONS = ["Cilaos", "Salazie", "le Maïdo", "Grand Bassin", "l’Étang-Salé", "Saint-Gilles"];
const JOURS = ["lundi", "mardi", "jeudi", "vendredi"];

/** ★2 — Compter les issues de deux épreuves (principe multiplicatif). */
function deCompter(): Q {
  const p = pick(PRENOMS);
  const cas = pick(["piece_de", "deux_des", "roue_piece", "snack", "sortie", "cadenas", "urne"] as const);
  let sit = "";
  let n1 = 0;
  let n2 = 0;
  if (cas === "piece_de") {
    n1 = 2;
    n2 = pick([4, 6, 8, 10, 12]);
    sit = `${p.nom} lance une pièce, puis un dé à ${n2} faces numérotées de 1 à ${n2}.`;
  } else if (cas === "deux_des") {
    n1 = pick([4, 6, 8]);
    n2 = pick([4, 6, 10, 12]);
    sit = `${p.nom} lance un dé à ${n1} faces puis un dé à ${n2} faces, chacun numéroté à partir de 1.`;
  } else if (cas === "roue_piece") {
    n1 = pick([3, 4, 5, 6, 8]);
    n2 = 2;
    sit = `À la kermesse, ${p.nom} fait tourner une roue de ${n1} secteurs numérotés, puis lance une pièce.`;
  } else if (cas === "snack") {
    n1 = ri(2, 5);
    n2 = ri(2, 4);
    sit = `Pour le menu surprise, le snack tire au sort un plat parmi ${n1} (${listeFr(melange(CARIS).slice(0, n1))}), puis un dessert parmi ${n2} (${listeFr(melange(DESSERTS).slice(0, n2))}).`;
  } else if (cas === "sortie") {
    n1 = ri(2, 5);
    n2 = ri(2, 4);
    sit = `Pour la sortie de fin d’année, on tire au sort une destination parmi ${n1} (${listeFr(melange(DESTINATIONS).slice(0, n1))}), puis un jour parmi ${n2} (${listeFr(JOURS.slice(0, n2))}).`;
  } else if (cas === "cadenas") {
    n1 = pick([4, 5, 6, 10]);
    n2 = n1;
    sit = `Le cadenas du casier ${de(p.nom)} a deux molettes, chacune portant ${n1 === 10 ? "les chiffres de 0 à 9" : `les chiffres de 1 à ${n1}`}. On règle les deux molettes au hasard.`;
  } else {
    const k = ri(2, 4);
    const u = urne(k, 1, 6, { deux: true });
    n1 = k;
    n2 = k;
    sit = `${situation(u)} ${maj(ilElle(u.p))} note ${u.ctx.note}, ${u.ctx.o.f ? "la" : "le"} remet avec les autres, puis recommence et note à nouveau.`;
  }
  const T = pick([
    "Combien y a-t-il d’issues possibles ?",
    "Combien de résultats différents peut-on obtenir ?",
    "Combien de chemins complets compte l’arbre de cette expérience ?",
    "Combien de cases compte le tableau à double entrée de cette expérience ?",
  ]);
  return {
    text: `${sit} ${T}`,
    format: "short",
    expected: [String(n1 * n2)],
    comparator: "number_equal",
    explanation:
      "Méthode : chaque résultat de la première épreuve se combine avec chaque résultat de la seconde (une branche, ou une case, par couple).\n\n" +
      `Calcul : ${n1} × ${n2} = ${n1 * n2}.\n\n` +
      `Conclusion : il y a ${n1 * n2} issues. ⚠️ Pas ${n1} + ${n2} : on multiplie.`,
  };
}

/** ★2 — Toutes les issues d'une expérience à deux épreuves. */
function deListe(): Q {
  const p = pick(PRENOMS);
  const cas = pick(["piece_roue", "urne", "roue2"] as const);
  let e1: [string, string][] = [];
  let e2: [string, string][] = [];
  let sit = "";
  if (cas === "piece_roue") {
    e1 = [["P", "pile"], ["F", "face"]];
    const cs = melange(["rouge", "bleu", "vert", "jaune"] as Coul[]).slice(0, ri(2, 3));
    e2 = cs.map((c) => [c.charAt(0).toUpperCase(), c]);
    sit = `${p.nom} lance une pièce (P pour pile, F pour face), puis fait tourner une roue ${listeFr(cs)} (${listeFr(e2.map((x) => `${x[0]} pour ${x[1]}`))}).`;
  } else if (cas === "urne") {
    const u = urne(2, 1, 5, { deux: true, distinctes: true });
    e1 = u.s.map((s) => [s.l, s.nom]);
    e2 = e1;
    sit = `${situation(u)} ${maj(ilElle(u.p))} note ${u.ctx.note} (${listeFr(e1.map((x) => `${x[0]} pour ${x[1]}`))}), ${u.ctx.o.f ? "la" : "le"} remet avec les autres, puis recommence.`;
  } else {
    const cs = melange(["rouge", "bleu", "vert", "jaune"] as Coul[]).slice(0, 2);
    e1 = cs.map((c) => [c.charAt(0).toUpperCase(), c]);
    e2 = e1;
    sit = `${p.nom} fait tourner deux fois une roue ${cs[0]} et ${cs[1]} (${listeFr(e1.map((x) => `${x[0]} pour ${x[1]}`))}) et note les deux couleurs dans l’ordre.`;
  }
  const tout = e1.flatMap((a) => e2.map((b) => a[0] + b[0]));
  const bon = tout.join(", ");
  const sansOrdre = tout.filter((c, i) => tout.findIndex((d) => [...d].sort().join("") === [...c].sort().join("")) === i);
  const leurres = [
    sansOrdre.length < tout.length ? sansOrdre.join(", ") : tout.slice(0, -1).join(", "),
    [...e1.map((x) => x[0]), ...e2.map((x) => x[0])].filter((c, i, a) => a.indexOf(c) === i).join(", "),
    e1.map((a, i) => a[0] + e2[i % e2.length][0]).join(", "),
    tout.slice(1).join(", "),
  ];
  const T = pick(["Quelle liste donne toutes les issues ?", "Quelles sont toutes les issues possibles ?", "Quelle liste est complète ?"]);
  return {
    text: `${sit} ${T}`,
    format: "qcm",
    choices: qcm(bon, leurres),
    expected: [bon],
    comparator: "mcq_exact",
    explanation:
      "Méthode : chaque résultat de la première épreuve est suivi de chaque résultat de la seconde ; l’ordre compte.\n\n" +
      `Calcul : ${e1.length} × ${e2.length} = ${tout.length} issues : ${bon}.\n\n` +
      `Conclusion : la liste complète est ${bon}.`,
    canvas: arbre(e1.map((a) => ({ label: a[0], enfants: e2.map((b) => b[0]) }))),
  };
}

/** ★3 — Deux dés (ou roues) : tableau à double entrée. */
function deTableau(): Q {
  const p = pick(PRENOMS);
  const N = pick([4, 6]);
  const M = pick([4, 6]);
  const sit = pick([
    `${p.nom} lance deux dés équilibrés, l’un à ${N} faces et l’autre à ${M} faces (numérotées à partir de 1).`,
    `À la kermesse, ${p.nom} fait tourner deux roues : l’une a ${N} secteurs identiques numérotés de 1 à ${N}, l’autre ${M} secteurs numérotés de 1 à ${M}.`,
    `Pour un jeu de plateau, ${p.nom} lance un dé à ${N} faces puis un dé à ${M} faces, tous deux équilibrés.`,
  ]);
  const couples = range(1, N).flatMap((a) => range(1, M).map((b) => [a, b] as [number, number]));
  const s = ri(4, N + M - 1);
  const d = ri(1, Math.min(N, M) - 1);
  const evts: { lib: string; ok: (a: number, b: number) => boolean; op: (a: number, b: number) => number; nomOp: string }[] = [
    { lib: `la somme des deux nombres soit égale à ${s}`, ok: (a, b) => a + b === s, op: (a, b) => a + b, nomOp: "+" },
    { lib: `la somme des deux nombres soit supérieure ou égale à ${s}`, ok: (a, b) => a + b >= s, op: (a, b) => a + b, nomOp: "+" },
    { lib: "le produit des deux nombres soit pair", ok: (a, b) => (a * b) % 2 === 0, op: (a, b) => a * b, nomOp: "×" },
    { lib: "les deux nombres soient égaux", ok: (a, b) => a === b, op: (a, b) => a + b, nomOp: "+" },
    { lib: `l’écart entre les deux nombres soit égal à ${d}`, ok: (a, b) => Math.abs(a - b) === d, op: (a, b) => Math.abs(a - b), nomOp: "écart" },
    { lib: "le produit des deux nombres soit un multiple de 3", ok: (a, b) => (a * b) % 3 === 0, op: (a, b) => a * b, nomOp: "×" },
  ];
  const e = pick(evts);
  const f = couples.filter(([a, b]) => e.ok(a, b)).length;
  const lignes = range(1, N).map((a) => [String(a), ...range(1, M).map((b) => String(e.op(a, b)))]);
  const surl: Array<[number, number]> = [];
  range(1, N).forEach((a, i) => range(1, M).forEach((b, j) => e.ok(a, b) && surl.push([i, j + 1])));
  return {
    text: `${sit} Quelle est la probabilité que ${e.lib} ?${T_PROBA_FMT()}`,
    format: "short",
    expected: ecritures(f, N * M),
    comparator: "fraction_decimal_equivalent",
    explanation:
      `Méthode : on fait un tableau à double entrée : ${N} lignes × ${M} colonnes = ${N * M} cases équiprobables.\n\n` +
      `Calcul : ${f} case${f > 1 ? "s" : ""} sur ${N * M} conviennent : ${egalites(f, N * M)}.\n\n` +
      `Conclusion : la probabilité est ${tf(...red(f, N * M))}.`,
    canvas: tableauCanvas([e.nomOp, ...range(1, M).map(String)], lignes, surl),
  };
}

/** ★3 — Deux épreuves indépendantes : on MULTIPLIE le long des branches. */
function deIndep(): Q {
  const p = pick(PRENOMS);
  type Ep = { desc: string; ev: string; a: number; b: number };
  const piece = (): Ep => ({ desc: "lance une pièce équilibrée", ev: pick(["pile", "face"]), a: 1, b: 2 });
  const deN = (): Ep => {
    const N = pick([4, 6, 8]);
    const ev = pick(evenementsNum(N, "nombre"));
    return { desc: `lance un dé équilibré à ${N} faces`, ev: ev.lib.replace(/^obtenir /, ""), a: favNum(N, ev).length, b: N };
  };
  const roue = (): Ep => {
    const n = pick([4, 5, 6, 8, 10]);
    const r = ri(1, n - 1);
    return { desc: `fait tourner une roue de ${n} secteurs identiques, dont ${r} rouge${r > 1 ? "s" : ""}`, ev: "le rouge", a: r, b: n };
  };
  const sac = (): Ep => {
    const u = urne(2, 1, 6);
    return { desc: `prend au hasard un objet dans un lot de ${contenu(u)}`, ev: u.s[0].un, a: u.n[0], b: tot(u) };
  };
  const gens = [piece, deN, roue, sac];
  const g1 = pick(gens);
  let g2 = pick(gens);
  while (g2 === g1 && g1 === piece) g2 = pick(gens);
  const E1 = g1();
  const E2 = g2();
  const bon: Fr = [E1.a * E2.a, E1.b * E2.b];
  const { choices, expected } = qcmF(bon, [
    [E1.a * E2.b + E2.a * E1.b, E1.b * E2.b],
    [E1.a, E1.b],
    [E2.a, E2.b],
    [1, E1.b * E2.b],
    [E1.a + E2.a, E1.b + E2.b],
  ], 1);
  const T = pick([
    `Quelle est la probabilité d’obtenir ${E1.ev}, puis ${E2.ev} ?`,
    `Quelle est la probabilité de l’issue « ${E1.ev}, puis ${E2.ev} » ?`,
    `${maj(ilElle(p))} gagne s’${ilElle(p)} obtient ${E1.ev}, puis ${E2.ev}. Quelle est la probabilité de gagner ?`,
  ]);
  return {
    text: `${p.nom} ${E1.desc}, puis ${E2.desc}. ${T}`,
    format: "qcm",
    choices,
    expected,
    comparator: "mcq_exact",
    explanation:
      "Méthode : sur l’arbre, la probabilité d’un chemin est le PRODUIT des probabilités de ses branches.\n\n" +
      `Calcul : p(${E1.ev}) = ${tf(E1.a, E1.b)} et p(${E2.ev}) = ${tf(E2.a, E2.b)}, donc ${tf(E1.a, E1.b)} × ${tf(E2.a, E2.b)} = ${egalites(bon[0], bon[1])}.\n\n` +
      `Conclusion : la probabilité est ${tf(bon[0], bon[1])}. ⚠️ On multiplie, on n’additionne pas.`,
  };
}

/** Deux tirages successifs dans une urne à deux sortes. */
function deuxTirages(remise: boolean, kMin = 2, kMax = 6) {
  const u = urne(2, kMin, kMax, { deux: true });
  const [A, B] = u.s;
  const [a, b] = u.n;
  const T0 = a + b;
  const pr = u.ctx.o.f ? "la" : "le";
  const suite = remise
    ? `${maj(ilElle(u.p))} note ${u.ctx.note}, ${pr} remet avec les autres, puis ${u.ctx.verbe === "tirer" ? "en tire" : "en prend"} ${u.ctx.o.f ? "une seconde" : "un second"} au hasard.`
    : `${maj(ilElle(u.p))} ${pr} garde, puis en prend ${u.ctx.o.f ? "une seconde" : "un second"} au hasard parmi ${u.ctx.o.f ? "celles" : "ceux"} qui restent.`;
  return { u, A, B, a, b, T0, text: `${situation(u)} ${suite}` };
}
/** « de la même couleur », « de parfums différents » : tiré de ce que l'on note. */
function motNote(ctx: CtxUrne) {
  const [art0, w] = ctx.note.split(" ");
  const f = art0 === "la";
  return { meme: f ? `de la même ${w}` : `du même ${w}`, diff: `de ${w}s ${f ? "différentes" : "différents"}` };
}
const arbreAB = (A: Sorte, B: Sorte) => arbre([A, B].map((x) => ({ label: x.nom, enfants: [A.nom, B.nom] })));

/** ★4 — Deux tirages AVEC remise. */
function deAvecRemise(): Q {
  const t = deuxTirages(true);
  const { A, B, a, b, T0 } = t;
  const deuxA = Math.random() < 0.6;
  const bon: Fr = deuxA ? [a * a, T0 * T0] : [a * b, T0 * T0];
  const ev = deuxA ? `obtenir deux fois ${A.un}` : `obtenir ${A.un} puis ${B.un}`;
  const { choices, expected } = qcmF(bon, deuxA
    ? [[a * (a - 1), T0 * (T0 - 1)], [2 * a, T0], [a, T0], [a * a, T0]]
    : [[a * b, T0 * (T0 - 1)], [a + b, T0], [2 * a * b, T0 * T0], [a, T0]], 1);
  return {
    text: `${t.text} Quelle est la probabilité ${deV(ev)} ?`,
    format: "qcm",
    choices,
    expected,
    comparator: "mcq_exact",
    explanation:
      `Méthode : AVEC remise, la composition ne change pas : chaque tirage a les mêmes probabilités ; on multiplie le long du chemin.\n\n` +
      `Calcul : ${tf(deuxA ? a : a, T0)} × ${tf(deuxA ? a : b, T0)} = ${egalites(bon[0], bon[1])}.\n\n` +
      `Conclusion : la probabilité est ${tf(bon[0], bon[1])}.`,
    canvas: arbreAB(A, B),
  };
}

/** ★4 — Deux tirages SANS remise (dont le tirage au sort de deux délégués). */
function deSansRemise(): Q {
  if (Math.random() < 0.25) {
    const f = ri(5, 16);
    const g = ri(5, 16);
    const T0 = f + g;
    const filles = Math.random() < 0.5;
    const n = filles ? f : g;
    const bon: Fr = [n * (n - 1), T0 * (T0 - 1)];
    const { choices, expected } = qcmF(bon, [[n * n, T0 * T0], [2 * n, T0], [n * (n - 1), T0 * T0], [n, T0]], 1);
    return {
      text: `Dans la 3e B du collège de Saint-Louis, il y a ${f} filles et ${g} garçons. Le professeur tire au sort le délégué, puis le suppléant parmi les élèves restants. Quelle est la probabilité que les deux soient des ${filles ? "filles" : "garçons"} ?`,
      format: "qcm",
      choices,
      expected,
      comparator: "mcq_exact",
      explanation:
        `Méthode : SANS remise, le second tirage se fait parmi ${T0 - 1} élèves, dont ${n - 1} ${filles ? "filles" : "garçons"} : la probabilité change.\n\n` +
        `Calcul : ${tf(n, T0)} × ${tf(n - 1, T0 - 1)} = ${egalites(bon[0], bon[1])}.\n\n` +
        `Conclusion : la probabilité est ${tf(bon[0], bon[1])}.`,
    };
  }
  const t = deuxTirages(false);
  const { A, B, a, b, T0 } = t;
  const deuxA = Math.random() < 0.6;
  const bon: Fr = deuxA ? [a * (a - 1), T0 * (T0 - 1)] : [a * b, T0 * (T0 - 1)];
  const ev = deuxA ? `obtenir deux fois ${A.un}` : `obtenir ${A.un} puis ${B.un}`;
  const { choices, expected } = qcmF(bon, deuxA
    ? [[a * a, T0 * T0], [2 * a, T0], [a * (a - 1), T0 * T0], [a, T0]]
    : [[a * b, T0 * T0], [a + b, T0], [a * (b - 1), T0 * (T0 - 1)], [a, T0]], 1);
  return {
    text: `${t.text} Quelle est la probabilité ${deV(ev)} ?`,
    format: "qcm",
    choices,
    expected,
    comparator: "mcq_exact",
    explanation:
      `Méthode : SANS remise, au second tirage il ne reste que ${T0 - 1} ${t.u.ctx.o.p}${deuxA ? `, dont ${A.des(a - 1)}` : `, dont toujours ${B.des(b)}`}.\n\n` +
      `Calcul : ${tf(a, T0)} × ${tf(deuxA ? a - 1 : b, T0 - 1)} = ${egalites(bon[0], bon[1])}.\n\n` +
      `Conclusion : la probabilité est ${tf(bon[0], bon[1])}.`,
    canvas: arbreAB(A, B),
  };
}

/** ★5 — Une de chaque sorte (deux chemins), avec ou sans remise. */
function deUneDeChaque(): Q {
  const remise = Math.random() < 0.5;
  const t = deuxTirages(remise);
  const { A, B, a, b, T0 } = t;
  const den = remise ? T0 * T0 : T0 * (T0 - 1);
  const n0 = 2 * a * b;
  const T = pick([
    `Quelle est la probabilité d’obtenir ${A.un} et ${B.un}, dans n’importe quel ordre ?`,
    `Quelle est la probabilité que les deux ${t.u.ctx.o.p} soient ${motNote(t.u.ctx).diff} ?`,
    `Quelle est la probabilité d’avoir une fois « ${A.nom} » et une fois « ${B.nom} » ?`,
  ]);
  const d2 = remise ? T0 : T0 - 1;
  return {
    text: `${t.text} ${T}`,
    format: "short",
    expected: ecritures(n0, den),
    comparator: "fraction_decimal_equivalent",
    explanation:
      `Méthode : deux chemins de l’arbre conviennent : « ${A.nom} puis ${B.nom} » et « ${B.nom} puis ${A.nom} » ; on les additionne (${remise ? "avec" : "sans"} remise).\n\n` +
      `Calcul : ${tf(a, T0)} × ${tf(b, d2)} + ${tf(b, T0)} × ${tf(a, d2)} = ${tf(a * b, den)} + ${tf(a * b, den)} = ${egalites(n0, den)}.\n\n` +
      `Conclusion : la probabilité est ${tf(...red(n0, den))}.`,
    canvas: arbreAB(A, B),
  };
}

/** ★5 — Deux fois la même sorte, avec ou sans remise. */
function deMeme(): Q {
  const remise = Math.random() < 0.5;
  const t = deuxTirages(remise);
  const { A, B, a, b, T0 } = t;
  const den = remise ? T0 * T0 : T0 * (T0 - 1);
  const n0 = remise ? a * a + b * b : a * (a - 1) + b * (b - 1);
  const T = pick([
    `Quelle est la probabilité que les deux ${t.u.ctx.o.p} soient ${motNote(t.u.ctx).meme} ?`,
    `Quelle est la probabilité d’obtenir deux fois la même issue ?`,
    `${t.u.p.nom} gagne si les deux tirages donnent la même chose. Quelle est la probabilité qu’${ilElle(t.u.p)} gagne ?`,
  ]);
  return {
    text: `${t.text} ${T}`,
    format: "short",
    expected: ecritures(n0, den),
    comparator: "fraction_decimal_equivalent",
    explanation:
      `Méthode : deux chemins conviennent : « ${A.nom} puis ${A.nom} » et « ${B.nom} puis ${B.nom} » (${remise ? "avec" : "sans"} remise).\n\n` +
      (remise
        ? `Calcul : ${tf(a, T0)} × ${tf(a, T0)} + ${tf(b, T0)} × ${tf(b, T0)} = ${tf(a * a, den)} + ${tf(b * b, den)} = ${egalites(n0, den)}.\n\n`
        : `Calcul : ${tf(a, T0)} × ${tf(a - 1, T0 - 1)} + ${tf(b, T0)} × ${tf(b - 1, T0 - 1)} = ${tf(a * (a - 1), den)} + ${tf(b * (b - 1), den)} = ${egalites(n0, den)}.\n\n`) +
      `Conclusion : la probabilité est ${tf(...red(n0, den))}.`,
    canvas: arbreAB(A, B),
  };
}

/* =========================================================================
   PROBA_DEFI
========================================================================= */

const CIBLES: Fr[] = [[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [2, 5], [3, 5], [1, 5]];

/** ★4 — Combien en ajouter pour atteindre une probabilité donnée ? */
function defAjouter(): Q {
  const [p, q] = pick(CIBLES);
  let m = ri(1, 4);
  if (p * m < 2) m = 2;
  const b = (q - p) * m;
  const a = ri(Math.max(1, p * m - 8), p * m - 1);
  const x = p * m - a;
  const u = urne(2, 1, 1, { ns: [a, b] });
  const [A, B] = u.s;
  const contenuTxt = contenu(u);
  const ev = evtTirer(u, A);
  const T = pick([
    `Combien ${deN(plur(A))} faut-il ajouter pour que la probabilité ${deV(ev)} soit égale à ${tf(p, q)} ?`,
    `${u.p.nom} veut que la probabilité ${deV(ev)} devienne ${tf(p, q)}. Combien ${deN(plur(A))} doit-${ilElle(u.p)} ajouter ?`,
    `On ajoute seulement des ${plur(A)}. Combien en faut-il pour que la probabilité ${deV(ev)} vaille ${tf(p, q)} ?`,
  ]);
  return {
    text: `${u.ctx.pose(u.p, contenuTxt)} ${u.ctx.tire(u.p)} ${T}`,
    format: "short",
    expected: [String(x)],
    comparator: "number_equal",
    explanation:
      `Méthode : les ${b} ${plur(B)} ne bougent pas ; leur part devra être ${tf(q - p, q)} du total.\n\n` +
      `Calcul : le total doit être ${b} × ${q} ÷ ${q - p} = ${q * m}, dont ${p * m} ${plur(A)}. Il y en a ${a} : on en ajoute ${p * m} − ${a} = ${x}. Vérification : ${tf(p * m, q * m)} = ${tf(p, q)}.\n\n` +
      `Conclusion : il faut ajouter ${x} ${x > 1 ? plur(A) : A.des(1).replace(/^1 /, "")}.`,
  };
}

/** ★4 — Retrouver un effectif à partir d'une probabilité. */
function defEffectif(): Q {
  const [p, q] = pick(CIBLES);
  const m = ri(2, 6);
  const nA = p * m;
  const T0 = q * m;
  const u = urne(2, 1, 1, { ns: [nA, T0 - nA] });
  const [A, B] = u.s;
  const dec = decimale(p, q);
  const pv = pick([tf(p, q), dec ?? tf(p, q), pourcent(p, q) ?? tf(p, q)]);
  const mode = pick(["total", "nA", "nB"] as const);
  const ev = evtTirer(u, A);
  const intro = `${u.ctx.pose(u.p, desSortes(u.s))} ${u.ctx.tire(u.p)}`;
  let text = "";
  let rep = 0;
  let calc = "";
  if (mode === "total") {
    text = `${intro} Il y a ${A.des(nA)}, et la probabilité ${deV(ev)} est ${pv}. Combien y a-t-il de ${u.ctx.o.p} en tout ?`;
    rep = T0;
    calc = `${pv === tf(p, q) ? "" : `${pv} = ${tf(p, q)} ; `}sur ${q} ${u.ctx.o.p}, ${p} ${p > 1 ? `sont des ${plur(A)}` : `est ${A.un}`}. Comme ${nA} = ${p} × ${m}, le total est ${q} × ${m} = ${T0}`;
  } else if (mode === "nA") {
    text = `${intro} Il y a ${T0} ${u.ctx.o.p} en tout, et la probabilité ${deV(ev)} est ${pv}. Combien y a-t-il ${deN(plur(A))} ?`;
    rep = nA;
    calc = `${tf(p, q)} de ${T0} : ${T0} ÷ ${q} × ${p} = ${nA}`;
  } else {
    text = `${intro} Il y a ${T0} ${u.ctx.o.p} en tout, et la probabilité ${deV(ev)} est ${pv}. Combien y a-t-il ${deN(plur(B))} ?`;
    rep = T0 - nA;
    calc = `${plur(A)} : ${T0} ÷ ${q} × ${p} = ${nA} ; il reste ${T0} − ${nA} = ${T0 - nA} ${plur(B)}`;
  }
  return {
    text,
    format: "short",
    expected: [String(rep)],
    comparator: "number_equal",
    explanation:
      "Méthode : probabilité = favorables ÷ total ; on connaît deux des trois nombres, on retrouve le troisième.\n\n" +
      `Calcul : ${calc}.\n\n` +
      `Conclusion : la réponse est ${rep}.`,
  };
}

type Jeu = { desc: string; a: number; b: number };
function jeuAuHasard(): Jeu {
  const t = pick(["roue", "urne", "de", "cartes"] as const);
  if (t === "roue") {
    const n = pick([5, 6, 8, 10, 12]);
    const r = ri(1, n - 1);
    return { desc: `on fait tourner une roue de ${n} secteurs identiques, dont ${r} gagnant${r > 1 ? "s" : ""}`, a: r, b: n };
  }
  if (t === "urne") {
    const g = ri(1, 8);
    const pe = ri(2, 12);
    return { desc: `on tire un ticket dans une urne de ${g} ticket${g > 1 ? "s" : ""} gagnant${g > 1 ? "s" : ""} et ${pe} perdants`, a: g, b: g + pe };
  }
  if (t === "de") {
    const N = pick([6, 8, 10, 12]);
    const k = ri(2, N - 1);
    return { desc: `on lance un dé équilibré à ${N} faces et on gagne avec un nombre supérieur ou égal à ${k}`, a: N - k + 1, b: N };
  }
  const e = pick(EVTS_CARTES.filter((x) => x.n32 >= 4));
  return { desc: `on tire une carte d’un jeu de 32 et on gagne si l’on parvient à ${e.lib}`, a: e.n32, b: 32 };
}
/** ★5 — Deux stands : où a-t-on le plus de chances de gagner ? */
function defJeux(): Q {
  let A = jeuAuHasard();
  let B = jeuAuHasard();
  const egal = Math.random() < 0.2;
  for (let t = 0; t < 200; t++) {
    const d = A.a / A.b - B.a / B.b;
    if (A.desc !== B.desc && (egal ? Math.abs(d) < 1e-9 : Math.abs(d) > 1e-9 && Math.abs(d) < 0.2)) break;
    A = jeuAuHasard();
    B = jeuAuHasard();
  }
  const pA = A.a / A.b;
  const pB = B.a / B.b;
  const SA = "le stand A";
  const SB = "le stand B";
  const EQ = "les deux stands se valent";
  const rep = Math.abs(pA - pB) < 1e-9 ? EQ : pA > pB ? SA : SB;
  const p = pick(PRENOMS);
  const lieu = pick(["À la kermesse du collège", "À la fête de Saint-Gilles", "Au marché forain de Saint-Paul", "À la fête de l’école"]);
  const T = pick([
    "Où a-t-on le plus de chances de gagner ?",
    `Quel stand ${p.nom} doit-${ilElle(p)} choisir pour avoir le plus de chances de gagner ?`,
    "Quel jeu donne la plus grande probabilité de gagner ?",
  ]);
  return {
    text: `${lieu}, deux stands proposent un jeu. Au stand A, ${A.desc}. Au stand B, ${B.desc}. ${T}`,
    format: "qcm",
    choices: melange([SA, SB, EQ, "on ne peut pas savoir, c’est le hasard"]),
    expected: [rep],
    comparator: "mcq_exact",
    explanation:
      "Méthode : on calcule la probabilité de gagner à chaque stand, puis on compare (en décimal ou au même dénominateur).\n\n" +
      `Calcul : stand A : ${tf(A.a, A.b)} ≈ ${fr(Math.round(pA * 1000) / 1000)} ; stand B : ${tf(B.a, B.b)} ≈ ${fr(Math.round(pB * 1000) / 1000)}.\n\n` +
      `Conclusion : ${rep === EQ ? "les deux probabilités sont égales" : `${rep} donne la plus grande probabilité`}. ⚠️ Le nombre de cas gagnants seul ne suffit pas : il faut le rapporter au total.`,
  };
}

/** ★5 — Un dé truqué : trouver P(6), puis l'utiliser. */
function defTruque(): Q {
  const p = pick(PRENOMS);
  const vals = Array(6).fill(5);
  for (let s = 30; s < 100; s += 5) vals[ri(0, 5)] += 5;
  const objet = pick([
    `${p.nom} a un dé truqué à 6 faces.`,
    `${p.nom} fabrique une toupie à 6 faces mal équilibrée.`,
    "À la fête foraine, une roue truquée a 6 secteurs numérotés de 1 à 6.",
  ]);
  const connus = vals.slice(0, 5).map((v, i) => `P(${i + 1}) = ${fr(v / 100)}`).join(" ; ");
  const q = pick(["six", "pair", "non6", "sup4"] as const);
  let lib = "";
  let n0 = 0;
  let calc = "";
  const p6 = vals[5];
  const debut = `P(6) = 1 − (${vals.slice(0, 5).map((v) => fr(v / 100)).join(" + ")}) = 1 − ${fr((100 - p6) / 100)} = ${fr(p6 / 100)}`;
  if (q === "six") {
    lib = "d’obtenir 6";
    n0 = p6;
    calc = debut;
  } else if (q === "pair") {
    lib = "d’obtenir un nombre pair";
    n0 = vals[1] + vals[3] + vals[5];
    calc = `${debut}, puis P(pair) = P(2) + P(4) + P(6) = ${fr(vals[1] / 100)} + ${fr(vals[3] / 100)} + ${fr(p6 / 100)} = ${fr(n0 / 100)}`;
  } else if (q === "non6") {
    lib = "de ne pas obtenir 6";
    n0 = 100 - p6;
    calc = `${debut}, puis P(non 6) = 1 − ${fr(p6 / 100)} = ${fr(n0 / 100)}`;
  } else {
    lib = "d’obtenir un nombre supérieur ou égal à 4";
    n0 = vals[3] + vals[4] + vals[5];
    calc = `${debut}, puis P(4) + P(5) + P(6) = ${fr(vals[3] / 100)} + ${fr(vals[4] / 100)} + ${fr(p6 / 100)} = ${fr(n0 / 100)}`;
  }
  return {
    text: `${objet} On connaît : ${connus}. Quelle est la probabilité ${lib} ?`,
    format: "short",
    expected: ecritures(n0, 100),
    comparator: "fraction_decimal_equivalent",
    explanation:
      "Méthode : la somme des probabilités des six issues vaut 1 ; on trouve d’abord P(6).\n\n" +
      `Calcul : ${calc}.\n\n` +
      `Conclusion : la probabilité ${lib} est ${fr(n0 / 100)}.`,
    canvas: tableauCanvas(["Issue", "1", "2", "3", "4", "5", "6"], [["Probabilité", ...vals.slice(0, 5).map((v) => fr(v / 100)), "?"]]),
  };
}

/** ★5 — Deux urnes : plus d'objets favorables ne veut pas dire plus probable. */
function defComparerSacs(): Q {
  const ctx = pick(CTX_URNES.filter((c) => c.deuxTirages));
  const [X, Y] = melange(ctx.sortes).slice(0, 2);
  let x1 = 0, y1 = 0, x2 = 0, y2 = 0;
  // Le plus souvent, le piège : plus d'objets favorables dans A, mais une probabilité plus faible.
  const sorte = pick(["egal", "piege", "piege", "proche"] as const);
  for (let t = 0; t < 400; t++) {
    x1 = ri(1, 9); y1 = ri(1, 9); x2 = ri(1, 9); y2 = ri(1, 9);
    const d = x1 / (x1 + y1) - x2 / (x2 + y2);
    const ok =
      sorte === "egal" ? Math.abs(d) < 1e-9 && x1 !== x2
      : sorte === "piege" ? x1 > x2 && d < -1e-9
      : Math.abs(d) > 1e-9 && Math.abs(d) < 0.15 && x1 !== x2;
    if (ok) break;
  }
  const [bn, bf] = ctx.boite;
  const le = /^[aeiouéè]/i.test(bn) ? "l’" : bf ? "la " : "le ";
  const LA = `${le}${bn} A`;
  const LB = `${le}${bn} B`;
  const EQ = "autant de chances avec les deux";
  const pA = x1 / (x1 + y1);
  const pB = x2 / (x2 + y2);
  const rep = Math.abs(pA - pB) < 1e-9 ? EQ : pA > pB ? LA : LB;
  const p = pick(PRENOMS);
  const T = pick([
    `Dans quel${bf ? "le" : ""} ${bn} ${p.nom} a-t-${ilElle(p)} le plus de chances ${deV(`${ctx.verbe} ${X.un}`)} ?`,
    `Pour ${ctx.verbe} ${X.un}, vaut-il mieux choisir ${LA} ou ${LB} ?`,
    `Où la probabilité ${deV(`${ctx.verbe} ${X.un}`)} est-elle la plus grande ?`,
  ]);
  return {
    text: `${p.nom} doit prendre ${art(ctx.o.f)} ${ctx.o.s} au hasard dans ${art(bf)} ${bn} de son choix. ${maj(LA)} contient ${listeFr([X.des(x1), Y.des(y1)])} ; ${LB} contient ${listeFr([X.des(x2), Y.des(y2)])}. ${T}`,
    format: "qcm",
    choices: melange([LA, LB, EQ, "on ne peut pas savoir, c’est le hasard"]),
    expected: [rep],
    comparator: "mcq_exact",
    explanation:
      "Méthode : on compare les PROBABILITÉS, pas les nombres d’objets.\n\n" +
      `Calcul : ${le}${bn} A : ${tf(x1, x1 + y1)} ≈ ${fr(Math.round(pA * 1000) / 1000)} ; ${le}${bn} B : ${tf(x2, x2 + y2)} ≈ ${fr(Math.round(pB * 1000) / 1000)}.\n\n` +
      `Conclusion : ${rep === EQ ? "les deux probabilités sont égales" : `c’est ${rep}`}.`,
  };
}

/* =========================================================================
   LES GABARITS — ids gardés ; chaque étoile présente a au moins deux gabarits.
========================================================================= */
const V = "proba_vocabulaire";
const I = "proba_issue";
const E = "proba_equiprobabilite";
const C = "proba_calculer";
const D = "proba_defi";
const EV = "proba_evenement";
const CT = "proba_evenement_contraire";
const DE = "proba_deux_epreuve";

const GABARITS: TutorBankItemV4[] = [
  // VOCABULAIRE
  gab("3e_proba_vocabulaire_tpl_3_certain_impossible", V, 1, "Cherche les issues qui réalisent l’événement : toutes, aucune, ou seulement certaines ?", ["vocabulaire", "certain", "impossible", "qcm"], vocCertainImpossible),
  gab("3e_proba_vocabulaire_tpl_4_bornes", V, 1, "Une probabilité est toujours comprise entre 0 et 1.", ["vocabulaire", "bornes", "qcm"], vocBornes),
  gab("3e_proba_vocabulaire_tpl_1_nommer", V, 2, "Une ISSUE est un seul résultat ; un ÉVÉNEMENT en regroupe plusieurs.", ["vocabulaire", "qcm"], vocNommer),
  gab("3e_proba_vocabulaire_tpl_5_incompatibles", V, 2, "Incompatibles : aucune issue ne réalise les deux événements à la fois.", ["vocabulaire", "incompatibles", "qcm"], vocIncompatibles),
  gab("3e_proba_vocabulaire_tpl_2_aleatoire", V, 3, "Aléatoire veut dire qu’on ne peut pas prévoir le résultat.", ["vocabulaire", "aleatoire", "qcm"], vocAleatoire),
  gab("3e_proba_vocabulaire_tpl_6_echelle", V, 3, "0 : impossible ; 0,5 : une chance sur deux ; 1 : certain.", ["vocabulaire", "echelle", "qcm"], vocEchelle),
  // ISSUES
  gab("3e_proba_issue_tpl_1", I, 1, "Regarde ce que l’on NOTE : ce sont les sortes possibles.", ["issue", "qcm", "canvas"], issueListe),
  gab("3e_proba_issue_tpl_6_nombre", I, 1, "Compte tous les résultats possibles.", ["issue", "short"], issueNombre),
  gab("3e_proba_issue_tpl_2", I, 2, "On note une couleur : compte les couleurs, pas les faces.", ["issue", "roue", "short", "canvas"], issueCouleurs),
  gab("3e_proba_issue_tpl_3_carte", I, 2, "Une lettre écrite deux fois ne compte qu’une fois comme issue.", ["issue", "lettres", "short"], issueLettres, "reunion"),
  gab("3e_proba_issue_tpl_4_billes_couleurs", I, 2, "On note la sorte : compte les sortes, pas les objets.", ["issue", "billes", "short", "canvas"], issueSortes),
  gab("3e_proba_issue_tpl_5_roue", I, 2, "Les issues dépendent de ce qu’on note.", ["issue", "short"], issueCeQuOnNote),
  // ÉQUIPROBABILITÉ
  gab("3e_proba_equiprobabilite_tpl_1", E, 2, "Une issue est-elle favorisée ?", ["equiprobabilite", "qcm"], eqSituations),
  gab("3e_proba_equiprobabilite_tpl_5_chaque", E, 2, "N issues équiprobables : chacune a une chance sur N.", ["equiprobabilite", "qcm"], eqChaque),
  gab("3e_proba_equiprobabilite_tpl_2", E, 3, "Compare le nombre d’objets de chaque sorte.", ["equiprobabilite", "billes", "qcm", "canvas"], eqComparer),
  gab("3e_proba_equiprobabilite_tpl_3_billes", E, 3, "Équiprobables : autant d’objets de chaque sorte.", ["equiprobabilite", "billes", "short", "canvas"], eqAjouter),
  gab("3e_proba_equiprobabilite_tpl_4_roue", E, 3, "Sur une roue, la probabilité d’un secteur est son angle sur 360°.", ["equiprobabilite", "roue", "canvas"], eqRoueAngles),
  // CALCULER
  gab("3e_proba_calculer_tpl_1", C, 2, "Probabilité = cas favorables ÷ cas possibles, en fraction.", ["calculer", "billes", "qcm", "canvas"], calcUrne),
  gab("3e_proba_calculer_tpl_4_de", C, 2, "Liste les issues favorables, puis divise par le nombre d’issues.", ["calculer", "short"], calcNum),
  gab("3e_proba_calculer_tpl_2", C, 3, "Compte les cartes favorables sur le nombre total de cartes.", ["calculer", "cartes", "qcm"], calcCartes),
  gab("3e_proba_calculer_tpl_3", C, 3, "« A ou B » : additionne les objets des deux sortes.", ["calculer", "short", "canvas"], calcOu),
  gab("3e_proba_calculer_tpl_5_billes_decimal", C, 3, "Lis la bonne case (ou le bon total) du tableau, puis divise par l’effectif total.", ["calculer", "tableau", "short", "canvas"], calcTableau, "reunion"),
  gab("3e_proba_calculer_tpl_6_roue", C, 3, "La somme des probabilités de toutes les issues vaut 1.", ["calculer", "somme", "short", "canvas"], calcSomme1),
  // ÉVÉNEMENT
  gab("3e_proba_evenement_tpl_6_liste", EV, 1, "Passe en revue chaque issue : rend-elle l’événement vrai ?", ["evenement", "qcm", "canvas"], evtListe),
  gab("3e_proba_evenement_tpl_7_liste_urne", EV, 1, "« Ou » : l’une ou l’autre ; « n’est pas » : toutes les autres.", ["evenement", "qcm", "canvas"], evtListeUrne),
  gab("3e_proba_evenement_tpl_1_de_superieur", EV, 2, "« Strictement » : la borne n’est pas comprise ; « ou égal » : elle l’est.", ["evenement", "short", "canvas"], evtCompter),
  gab("3e_proba_evenement_tpl_8_appartient", EV, 2, "L’issue obtenue rend-elle l’événement vrai ?", ["evenement", "qcm"], evtAppartient),
  gab("3e_proba_evenement_tpl_2_de_multiple", EV, 3, "Liste les issues qui conviennent, puis compte-les.", ["evenement", "short"], evtArith),
  gab("3e_proba_evenement_tpl_3_billes", EV, 3, "Additionne les objets de toutes les sortes qui conviennent.", ["evenement", "billes", "short", "canvas"], evtUrneCompter),
  gab("3e_proba_evenement_tpl_4_roue", EV, 4, "Pour chaque proposition, liste ses issues et compare.", ["evenement", "qcm"], evtDecrire),
  gab("3e_proba_evenement_tpl_5_entre", EV, 4, "« Et » : les deux à la fois ; « ou » : au moins l’une des deux.", ["evenement", "short"], evtEtOu),
  // CONTRAIRE
  gab("3e_proba_evenement_contraire_tpl_5_nommer", CT, 2, "Le contraire regroupe TOUTES les autres issues.", ["evenement_contraire", "qcm"], ctrNommer),
  gab("3e_proba_evenement_contraire_tpl_6_fraction", CT, 2, "p(non A) = 1 − p(A).", ["evenement_contraire", "fraction", "qcm"], ctrFraction, "reunion"),
  gab("3e_proba_evenement_contraire_tpl_1_billes", CT, 3, "p(non A) = 1 − p(A).", ["evenement_contraire", "billes", "short", "canvas"], ctrUrne),
  gab("3e_proba_evenement_contraire_tpl_2_decimal", CT, 3, "p(non A) = 1 − p(A), ou 100 % − p(A).", ["evenement_contraire", "decimal", "short"], ctrDecimal, "reunion"),
  gab("3e_proba_evenement_contraire_tpl_3_de", CT, 3, "Calcule p(A), puis 1 − p(A).", ["evenement_contraire", "short"], ctrNum),
  gab("3e_proba_evenement_contraire_tpl_4_choix", CT, 4, "La somme des trois probabilités vaut 1.", ["evenement_contraire", "fraction", "qcm"], ctrPartition),
  gab("3e_proba_evenement_contraire_tpl_7_au_moins", CT, 4, "Le contraire de « au moins un » est « aucun ».", ["evenement_contraire", "au_moins_un", "short"], ctrAuMoins),
  // DEUX ÉPREUVES
  gab("3e_proba_deux_epreuve_tpl_1_produit", DE, 2, "Multiplie le nombre d’issues de chaque épreuve.", ["deux_epreuve", "denombrement", "short"], deCompter, "reunion"),
  gab("3e_proba_deux_epreuve_tpl_5_liste", DE, 2, "Chaque résultat de la 1re épreuve suivi de chaque résultat de la 2de ; l’ordre compte.", ["deux_epreuve", "liste", "qcm", "canvas"], deListe),
  gab("3e_proba_deux_epreuve_tpl_2_tableau", DE, 3, "Fais le tableau à double entrée et compte les cases qui conviennent.", ["deux_epreuve", "tableau", "short", "canvas"], deTableau),
  gab("3e_proba_deux_epreuve_tpl_6_independantes", DE, 3, "Sur un chemin de l’arbre, on multiplie les probabilités.", ["deux_epreuve", "arbre", "qcm"], deIndep),
  gab("3e_proba_deux_epreuve_tpl_3_proba_couple", DE, 4, "Avec remise : les probabilités restent les mêmes au second tirage.", ["deux_epreuve", "avec_remise", "qcm", "canvas"], deAvecRemise),
  gab("3e_proba_deux_epreuve_tpl_7_sans_remise", DE, 4, "Sans remise : au second tirage, il y a un objet de moins.", ["deux_epreuve", "sans_remise", "qcm", "canvas"], deSansRemise),
  gab("3e_proba_deux_epreuve_tpl_4_favorables", DE, 5, "Deux chemins de l’arbre conviennent : additionne leurs probabilités.", ["deux_epreuve", "defi", "short", "canvas"], deUneDeChaque),
  gab("3e_proba_deux_epreuve_tpl_8_meme", DE, 5, "Deux chemins conviennent : AA et BB.", ["deux_epreuve", "defi", "short", "canvas"], deMeme),
  // DÉFIS
  gab("3e_proba_defi_tpl_1", D, 4, "Les objets de l’autre sorte ne bougent pas : quel doit être le total ?", ["defi", "short"], defAjouter, "reunion"),
  gab("3e_proba_defi_tpl_4_billes", D, 4, "Probabilité = favorables ÷ total : retrouve le nombre qui manque.", ["defi", "short"], defEffectif),
  gab("3e_proba_defi_tpl_2", D, 5, "Calcule la probabilité de gagner à chaque stand, puis compare.", ["defi", "comparaison", "qcm"], defJeux, "reunion"),
  gab("3e_proba_defi_tpl_3", D, 5, "Trouve d’abord P(6) : la somme des probabilités vaut 1.", ["defi", "tableau", "short", "canvas"], defTruque),
  gab("3e_proba_defi_tpl_5_comparer", D, 5, "Compare les probabilités, pas le nombre d’objets.", ["defi", "comparaison", "qcm"], defComparerSacs),
];

/* =========================================================================
   LES ITEMS FIGÉS (gardés tels quels, sauf deux QCM qui avaient deux choix
   de même valeur — voir leurs commentaires du 15/10/2026).
========================================================================= */
const FIXES: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "3e_proba_vocabulaire_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Une expérience aléatoire est une expérience dont le résultat...",
    format: "qcm",
    choices: [
      "est connu à l’avance",
      "n’est pas connu à l’avance",
      "est toujours impossible",
      "est toujours égal à 1",
    ],
    expected: ["n’est pas connu à l’avance"],
    comparator: "mcq_exact",
    hint: "Aléatoire signifie qu’on ne connaît pas le résultat avant l’expérience.",
    explanation:
      "Définition : une expérience aléatoire est une expérience dont on ne peut pas prévoir le résultat avec certitude.\n\n" +
      "Méthode : on se demande si le résultat est connu avant de faire l’expérience.\n\n" +
      "Calcul : ici, il n’y a pas de calcul ; il faut reconnaître le vocabulaire.\n\n" +
      "Conclusion : une expérience aléatoire a un résultat qui n’est pas connu à l’avance.",
    tags: ["proba_experience", "vocabulaire", "experience_aleatoire"],
  },
  {
    kind: "fixed",
    id: "3e_proba_vocabulaire_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Lorsqu’on lance un dé, obtenir 4 est...",
    format: "qcm",
    choices: ["une issue", "une moyenne", "une fréquence", "une unité"],
    expected: ["une issue"],
    comparator: "mcq_exact",
    hint: "Une issue est un résultat possible d’une expérience.",
    explanation:
      "Définition : une issue est un résultat possible d’une expérience aléatoire.\n\n" +
      "Méthode : on regarde si « obtenir 4 » peut être un résultat du lancer de dé.\n\n" +
      "Calcul : un dé peut donner 1, 2, 3, 4, 5 ou 6 ; donc 4 est bien un résultat possible.\n\n" +
      "Conclusion : obtenir 4 est une issue.",
    canvas: deCanvas([4]),
    tags: ["proba_experience", "vocabulaire", "issue", "de", "canvas"],
  },
  {
    kind: "fixed",
    id: "3e_proba_vocabulaire_fixed_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Un événement est...",
    format: "qcm",
    choices: [
      "un ensemble d’issues",
      "toujours une seule issue",
      "un calcul de moyenne",
      "une unité de longueur",
    ],
    expected: ["un ensemble d’issues"],
    comparator: "mcq_exact",
    hint: "Un événement peut contenir une ou plusieurs issues.",
    explanation:
      "Définition : un événement est un ensemble d’issues d’une expérience aléatoire.\n\n" +
      "Méthode : on repère quelles issues réalisent l’événement.\n\n" +
      "Calcul : par exemple, « obtenir un nombre pair » contient les issues 2, 4 et 6.\n\n" +
      "Conclusion : un événement peut regrouper plusieurs issues.",
    canvas: deCanvas([2, 4, 6]),
    tags: ["proba_experience", "vocabulaire", "evenement", "de", "canvas"],
  },
  {
    kind: "fixed",
    id: "3e_proba_vocabulaire_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique avec tes mots ce qu’est une expérience aléatoire ».
    text: "Laquelle de ces expériences est aléatoire ?",
    format: "qcm",
    choices: [
      "tirer une carte sans regarder",
      "compter les élèves de la classe",
      "mesurer la longueur de sa table",
      "calculer 7 × 8",
    ],
    expected: ["tirer une carte sans regarder"],
    comparator: "mcq_exact",
    hint: "Aléatoire : on ne peut pas savoir le résultat à l’avance.",
    explanation:
      "Définition : une expérience aléatoire est une expérience dont on ne connaît pas le résultat à l’avance.\n\n" +
      "Méthode : on se demande si on peut prévoir le résultat.\n\n" +
      "Calcul : quand on tire une carte sans regarder, on ne sait pas laquelle on aura. Compter, mesurer ou calculer donne toujours le même résultat.\n\n" +
      "Conclusion : tirer une carte sans regarder est une expérience aléatoire.",
    tags: ["proba_experience", "vocabulaire", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_proba_issue_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 1,
    theme: "neutral",
    text: "Combien y a-t-il d’issues possibles lorsqu’on lance un dé équilibré à 6 faces ?",
    format: "qcm",
    choices: ["2", "4", "6", "12"],
    expected: ["6"],
    comparator: "mcq_exact",
    hint: "Un dé classique possède 6 faces.",
    explanation:
      "Définition : les issues sont tous les résultats possibles d’une expérience aléatoire.\n\n" +
      "Méthode : on liste les résultats possibles du dé.\n\n" +
      "Calcul : les issues sont 1, 2, 3, 4, 5 et 6 ; il y en a donc 6.\n\n" +
      "Conclusion : il y a 6 issues possibles.",
    canvas: deCanvas(),
    tags: ["proba_experience", "issue", "de", "canvas"],
  },
  {
    kind: "fixed",
    id: "3e_proba_issue_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 2,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « On lance un dé. Explique pourquoi il y a 6 issues possibles ».
    text: "On lance une pièce (Pile ou Face), puis un dé à 6 faces. Combien y a-t-il d’issues possibles ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    // Frédéric (08/10) : plus de tableau à l'écran, il donnait la réponse.
    hint: "Fais un tableau : Pile ou Face sur une ligne, les 6 faces du dé sur l’autre.",
    explanation:
      "Définition : une issue est un résultat possible d’une expérience aléatoire.\n\n" +
      "Méthode : on liste toutes les issues dans un tableau.\n\n" +
      "Calcul : avec Pile, il y a 6 issues (P1, P2, P3, P4, P5, P6). Avec Face, il y en a 6 aussi. 6 + 6 = 12.\n\n" +
      "Conclusion : il y a 12 issues possibles.",
    tags: ["proba_experience", "issue", "short"],
  },
  {
    kind: "fixed",
    id: "3e_proba_equiprobabilite_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_equiprobabilite",
    difficulty: 2,
    theme: "neutral",
    text: "Avec un dé équilibré, les 6 faces ont-elles la même probabilité d’apparaître ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Un dé équilibré ne favorise aucune face.",
    explanation:
      "Définition : une situation est équiprobable lorsque toutes les issues ont la même probabilité.\n\n" +
      "Méthode : on vérifie si aucune issue n’est favorisée.\n\n" +
      "Calcul : avec un dé équilibré, chaque face a la même chance d’apparaître.\n\n" +
      "Conclusion : la situation est équiprobable.",
    canvas: deCanvas(),
    tags: ["proba_experience", "equiprobabilite", "de", "canvas"],
  },
  {
    kind: "fixed",
    id: "3e_proba_equiprobabilite_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_equiprobabilite",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique pourquoi un dé équilibré correspond à une situation d’équiprobabilité ».
    text: "On lance un dé équilibré. Quelle face a le plus de chances de sortir ?",
    format: "qcm",
    choices: ["le 6", "le 1", "le 3", "toutes autant"],
    expected: ["toutes autant"],
    comparator: "mcq_exact",
    hint: "Équilibré : aucune face n’est favorisée.",
    explanation:
      "Définition : une situation est équiprobable lorsque toutes les issues ont la même probabilité.\n\n" +
      "Méthode : on regarde si une face est favorisée.\n\n" +
      "Calcul : le dé est équilibré, donc chaque face a la même probabilité : 1/6.\n\n" +
      "Conclusion : toutes les faces ont autant de chances de sortir. Le 6 n’est pas plus rare que les autres.",
    canvas: deCanvas(),
    tags: ["proba_experience", "equiprobabilite", "qcm", "de", "canvas"],
  },
  {
    kind: "fixed",
    id: "3e_proba_calculer_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_calculer",
    difficulty: 2,
    theme: "neutral",
    text: "On lance un dé équilibré. Quelle est la probabilité d’obtenir un nombre pair ?",
    format: "qcm",
    choices: ["1/6", "2/6", "3/6", "6/3"],
    expected: ["3/6"],
    comparator: "mcq_exact",
    hint: "Les nombres pairs du dé sont 2, 4 et 6.",
    explanation:
      "Définition : en situation d’équiprobabilité, une probabilité se calcule par cas favorables / cas possibles.\n\n" +
      "Méthode : on compte les issues favorables, puis toutes les issues possibles.\n\n" +
      "Calcul : les issues favorables sont 2, 4 et 6, soit 3 issues sur 6.\n\n" +
      "Conclusion : la probabilité est 3/6.",
    canvas: deCanvas([2, 4, 6]),
    tags: ["proba_experience", "calculer", "fraction", "de", "canvas"],
  },
  {
    kind: "fixed",
    id: "3e_proba_calculer_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_calculer",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique pourquoi P(nombre pair) = 3/6 » (déjà demandé par 3e_proba_calculer_fixed_1).
    text: "On lance un dé équilibré. Quelle est la probabilité d’obtenir un multiple de 3 ?",
    format: "short",
    expected: ["2/6", "1/3"],
    comparator: "fraction_decimal_equivalent",
    hint: "Écris les multiples de 3 du dé, puis compte toutes les issues.",
    explanation:
      "Définition : une probabilité se calcule en comparant les cas favorables aux cas possibles.\n\n" +
      "Méthode : on liste d’abord les multiples de 3 du dé.\n\n" +
      "Calcul : les multiples de 3 sont 3 et 6 : il y a 2 cas favorables sur 6 issues possibles.\n\n" +
      "Conclusion : la probabilité est 2/6 = 1/3.",
    canvas: deCanvas([3, 6]),
    tags: ["proba_experience", "calculer", "short", "de", "canvas"],
  },
  {
    kind: "fixed",
    id: "3e_proba_defi_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Une probabilité peut-elle être supérieure à 1 ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Une probabilité est toujours comprise entre 0 et 1.",
    explanation:
      "Définition : une probabilité est un nombre compris entre 0 et 1.\n\n" +
      "Méthode : on vérifie si une probabilité peut dépasser le cas certain.\n\n" +
      "Calcul : l’événement certain a une probabilité égale à 1.\n\n" +
      "Conclusion : une probabilité ne peut pas être supérieure à 1.",
    tags: ["proba_experience", "defi", "bornes"],
  },
  {
    kind: "fixed",
    id: "3e_proba_defi_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : « S’il y a 3 billes rouges et 5 billes bleues, la probabilité de tirer rouge est 3/5. » A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le dénominateur doit être le nombre total de billes.",
    explanation:
      "Définition : une probabilité se calcule par cas favorables / cas possibles.\n\n" +
      "Méthode : on vérifie le numérateur et le dénominateur.\n\n" +
      "Calcul : il y a 3 billes rouges sur 3 + 5 = 8 billes au total, donc la probabilité est 3/8.\n\n" +
      "Conclusion : l’élève a tort.",
    canvas: billesCanvas([
      ...Array.from({ length: 3 }, () => ({ couleur: couleurs.rouge })),
      ...Array.from({ length: 5 }, () => ({ couleur: couleurs.bleu })),
    ]),
    tags: ["proba_experience", "defi", "erreur", "billes", "canvas"],
  },
  {
    kind: "fixed",
    id: "3e_proba_defi_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 5,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique pourquoi une probabilité égale à 0 correspond à un événement impossible ».
    text: "On lance un dé équilibré à 6 faces. Quelle est la probabilité d’obtenir 7 ?",
    format: "short",
    expected: ["0", "0/6"],
    comparator: "fraction_decimal_equivalent",
    hint: "Combien de faces portent le nombre 7 ?",
    explanation:
      "Définition : un événement impossible a une probabilité égale à 0.\n\n" +
      "Méthode : on compte les cas favorables.\n\n" +
      "Calcul : aucune face ne porte le nombre 7 : 0 cas favorable sur 6. 0 ÷ 6 = 0.\n\n" +
      "Conclusion : obtenir 7 est impossible, sa probabilité est 0.",
    canvas: deCanvas(),
    tags: ["proba_experience", "defi", "short", "impossible", "canvas"],
  },
  {
    kind: "fixed",
    id: "3e_proba_evenement_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_evenement",
    difficulty: 1,
    theme: "neutral",
    text: "On lance un dé. L’événement « obtenir un nombre pair » est réalisé par quelles issues ?",
    format: "qcm",
    choices: ["$2$, $4$ et $6$", "$1$, $3$ et $5$", "seulement $6$", "$1$ à $6$"],
    expected: ["$2$, $4$ et $6$"],
    comparator: "mcq_exact",
    hint: "Les nombres pairs entre $1$ et $6$ sont $2$, $4$ et $6$.",
    explanation:
      "Définition : un événement est un ensemble d’issues qui le réalisent.\n\n" +
      "Méthode : on liste les issues du dé qui sont des nombres pairs.\n\n" +
      "Calcul : parmi $1, 2, 3, 4, 5, 6$, les nombres pairs sont $2$, $4$ et $6$.\n\n" +
      "Conclusion : l’événement est réalisé par les issues $2$, $4$ et $6$.",
    canvas: deCanvas([2, 4, 6]),
    tags: ["proba_experience", "evenement", "de", "canvas"],
  },
  {
    kind: "fixed",
    id: "3e_proba_evenement_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_evenement",
    difficulty: 2,
    theme: "neutral",
    text: "On lance un dé. Quelles issues réalisent l’événement « obtenir au moins $5$ » ?",
    format: "qcm",
    choices: ["$5$ et $6$", "$4$, $5$ et $6$", "seulement $5$", "$1$ à $5$"],
    expected: ["$5$ et $6$"],
    comparator: "mcq_exact",
    hint: "« Au moins $5$ » signifie $5$ ou plus.",
    explanation:
      "Définition : un événement regroupe les issues qui le réalisent.\n\n" +
      "Méthode : « au moins $5$ » veut dire supérieur ou égal à $5$.\n\n" +
      "Calcul : les issues $\\geq 5$ sont $5$ et $6$.\n\n" +
      "Conclusion : l’événement est réalisé par $5$ et $6$.",
    canvas: deCanvas([5, 6]),
    tags: ["proba_experience", "evenement", "de", "canvas"],
  },
  {
    kind: "fixed",
    id: "3e_proba_evenement_fixed_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_evenement",
    difficulty: 2,
    theme: "neutral",
    text: "Un événement réalisé par une seule issue s’appelle…",
    format: "qcm",
    choices: [
      "un événement élémentaire",
      "un événement certain",
      "un événement impossible",
      "un événement contraire",
    ],
    expected: ["un événement élémentaire"],
    comparator: "mcq_exact",
    hint: "« Élémentaire » signifie composé d’une seule issue.",
    explanation:
      "Définition : un événement élémentaire est un événement réalisé par exactement une issue.\n\n" +
      "Méthode : on compte le nombre d’issues qui réalisent l’événement.\n\n" +
      "Calcul : s’il n’y a qu’une seule issue, l’événement est élémentaire.\n\n" +
      "Conclusion : c’est un événement élémentaire.",
    tags: ["proba_experience", "evenement", "vocabulaire", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_proba_evenement_fixed_4_impossible",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_evenement",
    difficulty: 3,
    theme: "neutral",
    text: "On lance un dé à $6$ faces. L’événement « obtenir $7$ » est…",
    format: "qcm",
    choices: [
      "impossible",
      "certain",
      "élémentaire",
      "très probable",
    ],
    expected: ["impossible"],
    comparator: "mcq_exact",
    hint: "Aucune face du dé ne porte le nombre $7$.",
    explanation:
      "Définition : un événement impossible n’est réalisé par aucune issue.\n\n" +
      "Méthode : on cherche s’il existe une issue qui réalise l’événement.\n\n" +
      "Calcul : les faces vont de $1$ à $6$, aucune ne vaut $7$.\n\n" +
      "Conclusion : l’événement « obtenir $7$ » est impossible.",
    canvas: deCanvas(),
    tags: ["proba_experience", "evenement", "impossible", "de", "canvas"],
  },
  {
    kind: "fixed",
    id: "3e_proba_evenement_fixed_5_certain",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_evenement",
    difficulty: 3,
    theme: "neutral",
    text: "On lance un dé. L’événement « obtenir un nombre entre $1$ et $6$ » est…",
    format: "qcm",
    choices: ["certain", "impossible", "élémentaire", "peu probable"],
    expected: ["certain"],
    comparator: "mcq_exact",
    hint: "Toutes les issues du dé réalisent cet événement.",
    explanation:
      "Définition : un événement certain est réalisé par toutes les issues.\n\n" +
      "Méthode : on vérifie si chaque issue réalise l’événement.\n\n" +
      "Calcul : toutes les faces, de $1$ à $6$, conviennent.\n\n" +
      "Conclusion : l’événement est certain.",
    canvas: deCanvas([1, 2, 3, 4, 5, 6]),
    tags: ["proba_experience", "evenement", "certain", "de", "canvas"],
  },
  {
    kind: "fixed",
    id: "3e_proba_evenement_contraire_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_evenement_contraire",
    difficulty: 2,
    theme: "neutral",
    text: "On lance un dé. Quel est l’événement contraire de « obtenir $6$ » ?",
    format: "qcm",
    choices: [
      "« ne pas obtenir $6$ »",
      "« obtenir $1$ »",
      "« obtenir un nombre pair »",
      "« obtenir $6$ deux fois »",
    ],
    expected: ["« ne pas obtenir $6$ »"],
    comparator: "mcq_exact",
    hint: "L’événement contraire regroupe toutes les autres issues.",
    explanation:
      "Définition : l’événement contraire de $A$ est réalisé exactement quand $A$ ne l’est pas.\n\n" +
      "Méthode : on prend toutes les issues qui ne réalisent pas l’événement.\n\n" +
      "Calcul : le contraire de « obtenir $6$ » est « obtenir $1, 2, 3, 4$ ou $5$ », c’est-à-dire « ne pas obtenir $6$ ».\n\n" +
      "Conclusion : le contraire est « ne pas obtenir $6$ ».",
    tags: ["proba_experience", "evenement_contraire", "de", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_proba_evenement_contraire_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_evenement_contraire",
    difficulty: 2,
    theme: "neutral",
    text: "Si $P(A) = \\dfrac{1}{4}$, quelle est la probabilité de l’événement contraire $\\overline{A}$ ?",
    format: "qcm",
    choices: ["$\\dfrac{3}{4}$", "$\\dfrac{1}{4}$", "$\\dfrac{4}{4}$", "$\\dfrac{1}{3}$"],
    expected: ["$\\dfrac{3}{4}$"],
    comparator: "mcq_exact",
    hint: "$P(\\overline{A}) = 1 - P(A)$.",
    explanation:
      "Définition : la probabilité de l’événement contraire vérifie $P(\\overline{A}) = 1 - P(A)$.\n\n" +
      "Méthode : on soustrait $P(A)$ à $1$.\n\n" +
      "Calcul : $1 - \\dfrac{1}{4} = \\dfrac{3}{4}$.\n\n" +
      "Conclusion : $P(\\overline{A}) = \\dfrac{3}{4}$.",
    tags: ["proba_experience", "evenement_contraire", "fraction", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_proba_evenement_contraire_fixed_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_evenement_contraire",
    difficulty: 2,
    theme: "neutral",
    text: "Que vaut toujours la somme $P(A) + P(\\overline{A})$ ?",
    format: "qcm",
    choices: ["$1$", "$0$", "$2$", "cela dépend de $A$"],
    expected: ["$1$"],
    comparator: "mcq_exact",
    hint: "Un événement et son contraire couvrent toutes les issues.",
    explanation:
      "Définition : un événement et son contraire se partagent toutes les issues possibles.\n\n" +
      "Méthode : on additionne les deux probabilités.\n\n" +
      "Calcul : ensemble, ils représentent la totalité, donc la somme vaut $1$.\n\n" +
      "Conclusion : $P(A) + P(\\overline{A}) = 1$.",
    tags: ["proba_experience", "evenement_contraire", "relation", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_proba_evenement_contraire_fixed_4_aucun",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_evenement_contraire",
    difficulty: 4,
    theme: "neutral",
    text: "Quel est l’événement contraire de « obtenir au moins une fois pile » lorsqu’on lance deux pièces ?",
    format: "qcm",
    choices: [
      "« n’obtenir aucune fois pile »",
      "« obtenir deux fois pile »",
      "« obtenir au moins une fois face »",
      "« obtenir exactement une fois pile »",
    ],
    expected: ["« n’obtenir aucune fois pile »"],
    comparator: "mcq_exact",
    hint: "Le contraire de « au moins un » est « aucun ».",
    explanation:
      "Définition : le contraire d’un événement est réalisé exactement quand l’événement ne l’est pas.\n\n" +
      "Méthode : on nie l’expression « au moins une fois pile ».\n\n" +
      "Calcul : ne pas avoir « au moins un pile » signifie « aucun pile ».\n\n" +
      "Conclusion : le contraire est « n’obtenir aucune fois pile ».",
    tags: ["proba_experience", "evenement_contraire", "au_moins_un", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_proba_evenement_contraire_fixed_5_erreur",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_evenement_contraire",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève affirme : « Si $P(A) = 0{,}3$, alors $P(\\overline{A}) = 0{,}3$ aussi. » A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Utilise $P(\\overline{A}) = 1 - P(A)$.",
    explanation:
      "Définition : la probabilité du contraire vérifie $P(\\overline{A}) = 1 - P(A)$.\n\n" +
      "Méthode : on calcule $1 - P(A)$.\n\n" +
      "Calcul : $1 - 0{,}3 = 0{,}7 \\neq 0{,}3$.\n\n" +
      "Conclusion : l’élève a tort, $P(\\overline{A}) = 0{,}7$.",
    tags: ["proba_experience", "evenement_contraire", "erreur", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_proba_deux_epreuve_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_deux_epreuve",
    difficulty: 2,
    theme: "neutral",
    text: "On lance deux fois une pièce. Combien y a-t-il d’issues possibles ?",
    format: "qcm",
    choices: ["$4$", "$2$", "$3$", "$6$"],
    expected: ["$4$"],
    comparator: "mcq_exact",
    hint: "À chaque lancer, $2$ résultats possibles : $2 \\times 2$.",
    explanation:
      "Définition : pour deux épreuves successives, on combine les issues de chaque épreuve.\n\n" +
      "Méthode : on multiplie le nombre d’issues de la première par celui de la seconde.\n\n" +
      "Calcul : $2 \\times 2 = 4$. Les issues sont PP, PF, FP, FF.\n\n" +
      "Conclusion : il y a $4$ issues possibles.",
    tags: ["proba_experience", "deux_epreuve", "denombrement", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_proba_deux_epreuve_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_deux_epreuve",
    difficulty: 3,
    theme: "neutral",
    text: "On lance deux fois une pièce équilibrée. Quelle est la probabilité d’obtenir « pile puis pile » ?",
    format: "qcm",
    // 15/10/2026 : « 2/4 » valait « 1/2 » (deux choix de même valeur). Leurre remplacé par « 1 » (1/2 + 1/2 : additionner au lieu de multiplier).
    choices: ["$\\dfrac{1}{4}$", "$\\dfrac{1}{2}$", "$1$", "$\\dfrac{1}{3}$"],
    expected: ["$\\dfrac{1}{4}$"],
    comparator: "mcq_exact",
    hint: "Une issue favorable (PP) sur $4$ issues possibles.",
    explanation:
      "Définition : en situation d’équiprobabilité, $P = \\dfrac{\\text{cas favorables}}{\\text{cas possibles}}$.\n\n" +
      "Méthode : on compte les issues favorables et toutes les issues.\n\n" +
      "Calcul : il y a $4$ issues (PP, PF, FP, FF) et une seule favorable (PP), soit $\\dfrac{1}{4}$.\n\n" +
      "Conclusion : la probabilité est $\\dfrac{1}{4}$.",
    tags: ["proba_experience", "deux_epreuve", "fraction", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_proba_deux_epreuve_fixed_3_liste",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_deux_epreuve",
    difficulty: 2,
    theme: "neutral",
    text: "On lance deux fois une pièce (P pour pile, F pour face). Quelle liste donne toutes les issues ?",
    format: "qcm",
    choices: [
      "PP, PF, FP, FF",
      "PP, FF",
      "P, F",
      "PP, PF, FF",
    ],
    expected: ["PP, PF, FP, FF"],
    comparator: "mcq_exact",
    hint: "Il faut distinguer l’ordre : PF est différent de FP.",
    explanation:
      "Définition : une issue d’une expérience à deux épreuves décrit le résultat des deux étapes dans l’ordre.\n\n" +
      "Méthode : on combine chaque résultat du premier lancer avec chaque résultat du second.\n\n" +
      "Calcul : P puis P/F, et F puis P/F donnent PP, PF, FP, FF.\n\n" +
      "Conclusion : les $4$ issues sont PP, PF, FP, FF.",
    tags: ["proba_experience", "deux_epreuve", "liste", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_proba_deux_epreuve_fixed_4_arbre",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_deux_epreuve",
    difficulty: 4,
    theme: "neutral",
    text: "On représente une expérience à deux épreuves par un arbre. Si chaque épreuve a $3$ issues, combien de branches complètes (chemins) l’arbre comporte-t-il ?",
    format: "qcm",
    choices: ["$9$", "$6$", "$3$", "$12$"],
    expected: ["$9$"],
    comparator: "mcq_exact",
    hint: "Nombre de chemins $= 3 \\times 3$.",
    explanation:
      "Définition : dans un arbre, chaque chemin complet correspond à une issue de l’expérience.\n\n" +
      "Méthode : on multiplie le nombre d’issues de chaque épreuve.\n\n" +
      "Calcul : $3 \\times 3 = 9$ chemins.\n\n" +
      "Conclusion : l’arbre comporte $9$ branches complètes.",
    tags: ["proba_experience", "deux_epreuve", "arbre", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_proba_deux_epreuve_fixed_5_defi",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_deux_epreuve",
    difficulty: 5,
    theme: "neutral",
    text: "On lance deux fois une pièce. Quelle est la probabilité d’obtenir « exactement une fois pile » ?",
    format: "qcm",
    // 15/10/2026 : « 1/2 » valait la bonne réponse « 2/4 ». Leurre remplacé par « 1/3 » (PF et FP comptés comme une seule issue).
    choices: ["$\\dfrac{2}{4}$", "$\\dfrac{1}{4}$", "$\\dfrac{3}{4}$", "$\\dfrac{1}{3}$"],
    expected: ["$\\dfrac{2}{4}$"],
    comparator: "mcq_exact",
    hint: "Repère parmi PP, PF, FP, FF les issues avec un seul pile.",
    explanation:
      "Définition : on compte les issues favorables parmi toutes les issues.\n\n" +
      "Méthode : on liste les $4$ issues PP, PF, FP, FF et on garde celles avec exactement un pile.\n\n" +
      "Calcul : les issues favorables sont PF et FP, soit $2$ sur $4$ : $\\dfrac{2}{4}$.\n\n" +
      "Conclusion : la probabilité est $\\dfrac{2}{4}$.",
    tags: ["proba_experience", "deux_epreuve", "defi", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_proba_vocabulaire_fixed_4",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Une probabilité est toujours un nombre compris entre…",
    format: "qcm",
    choices: ["$0$ et $1$", "$1$ et $10$", "$-1$ et $1$", "$0$ et $100$"],
    expected: ["$0$ et $1$"],
    comparator: "mcq_exact",
    hint: "$0$ = impossible, $1$ = certain.",
    explanation:
      "Définition : une probabilité mesure la chance qu’un événement se produise.\n\n" +
      "Méthode : on encadre la valeur possible d’une probabilité.\n\n" +
      "Calcul : l’impossible vaut $0$, le certain vaut $1$.\n\n" +
      "Conclusion : une probabilité est comprise entre $0$ et $1$.",
    tags: ["proba_experience", "vocabulaire", "bornes", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_proba_vocabulaire_fixed_5_certain",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Un événement certain a une probabilité égale à…",
    format: "qcm",
    choices: ["$1$", "$0$", "$0{,}5$", "$2$"],
    expected: ["$1$"],
    comparator: "mcq_exact",
    hint: "Il se produit à coup sûr.",
    explanation:
      "Définition : un événement certain se réalise toujours.\n\n" +
      "Méthode : on associe « toujours » à la probabilité maximale.\n\n" +
      "Calcul : la probabilité d’un événement certain est $1$.\n\n" +
      "Conclusion : elle vaut $1$.",
    tags: ["proba_experience", "vocabulaire", "certain", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_proba_vocabulaire_fixed_6_impossible",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "On lance un dé à $6$ faces. « Obtenir $8$ » est un événement…",
    format: "qcm",
    choices: ["impossible", "certain", "probable", "équiprobable"],
    expected: ["impossible"],
    comparator: "mcq_exact",
    hint: "Aucune face ne porte le $8$.",
    explanation:
      "Définition : un événement impossible ne peut pas se produire.\n\n" +
      "Méthode : on vérifie si une issue le réalise.\n\n" +
      "Calcul : un dé va de $1$ à $6$, aucune face ne donne $8$.\n\n" +
      "Conclusion : « obtenir $8$ » est impossible (probabilité $0$).",
    canvas: deCanvas(),
    tags: ["proba_experience", "vocabulaire", "impossible", "de", "canvas"],
  },
  {
    kind: "fixed",
    id: "3e_proba_vocabulaire_fixed_7_certitude",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Une probabilité de $0{,}5$ correspond à…",
    format: "qcm",
    choices: ["une chance sur deux", "un événement impossible", "un événement certain", "deux chances sur trois"],
    expected: ["une chance sur deux"],
    comparator: "mcq_exact",
    hint: "$0{,}5 = \\dfrac{1}{2}$.",
    explanation:
      "Définition : une probabilité de $0{,}5$ vaut $\\dfrac{1}{2}$.\n\n" +
      "Méthode : on interprète la fraction.\n\n" +
      "Calcul : $\\dfrac{1}{2}$ correspond à une chance sur deux.\n\n" +
      "Conclusion : c’est une chance sur deux.",
    tags: ["proba_experience", "vocabulaire", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_proba_vocabulaire_fixed_8_evenement",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "« Obtenir un nombre pair » avec un dé est…",
    format: "qcm",
    choices: ["un événement", "une issue unique", "une probabilité", "une moyenne"],
    expected: ["un événement"],
    comparator: "mcq_exact",
    hint: "Il regroupe plusieurs issues ($2$, $4$, $6$).",
    explanation:
      "Définition : un événement regroupe une ou plusieurs issues.\n\n" +
      "Méthode : on regarde s’il correspond à plusieurs résultats.\n\n" +
      "Calcul : « pair » regroupe $2$, $4$ et $6$.\n\n" +
      "Conclusion : c’est un événement.",
    canvas: deCanvas([2, 4, 6]),
    tags: ["proba_experience", "vocabulaire", "evenement", "de", "canvas"],
  },
  {
    kind: "fixed",
    id: "3e_proba_vocabulaire_fixed_9_plus_probable",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_vocabulaire",
    difficulty: 3,
    theme: "neutral",
    text: "Plus la probabilité d’un événement est proche de $1$, plus l’événement est…",
    format: "qcm",
    choices: ["probable", "impossible", "rare", "équiprobable"],
    expected: ["probable"],
    comparator: "mcq_exact",
    hint: "$1$ = certain.",
    explanation:
      "Définition : la probabilité mesure la chance d’un événement.\n\n" +
      "Méthode : on relie la valeur à la fréquence attendue.\n\n" +
      "Calcul : proche de $1$, l’événement se produit presque toujours.\n\n" +
      "Conclusion : il est très probable.",
    tags: ["proba_experience", "vocabulaire", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_proba_issue_fixed_2_piece",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 1,
    theme: "neutral",
    text: "Combien y a-t-il d’issues possibles quand on lance une pièce ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Pile ou face.",
    explanation:
      "Définition : les issues sont les résultats possibles.\n\n" +
      "Méthode : on liste les résultats d’une pièce.\n\n" +
      "Calcul : pile et face, soit $2$ issues.\n\n" +
      "Conclusion : il y a $2$ issues.",
    tags: ["proba_experience", "issue", "piece", "short"],
  },
  {
    kind: "fixed",
    id: "3e_proba_issue_fixed_3_evenement_vs_issue",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 2,
    theme: "neutral",
    text: "Avec un dé, combien d’issues réalisent l’événement « obtenir $3$ » ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Une seule face porte le $3$.",
    explanation:
      "Définition : une issue est un résultat élémentaire.\n\n" +
      "Méthode : on compte les faces qui donnent $3$.\n\n" +
      "Calcul : une seule face porte $3$.\n\n" +
      "Conclusion : $1$ issue réalise cet événement.",
    canvas: deCanvas([3]),
    tags: ["proba_experience", "issue", "de", "canvas"],
  },
  {
    kind: "fixed",
    id: "3e_proba_issue_fixed_4_de",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_issue",
    difficulty: 2,
    theme: "neutral",
    text: "Combien d’issues réalisent « obtenir un nombre pair » avec un dé à $6$ faces ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Les pairs sont $2$, $4$, $6$.",
    explanation:
      "Définition : on compte les issues favorables.\n\n" +
      "Méthode : on liste les nombres pairs du dé.\n\n" +
      "Calcul : $2$, $4$ et $6$, soit $3$ issues.\n\n" +
      "Conclusion : $3$ issues.",
    canvas: deCanvas([2, 4, 6]),
    tags: ["proba_experience", "issue", "de", "canvas"],
  },
  {
    kind: "fixed",
    id: "3e_proba_equiprobabilite_fixed_2_def",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_equiprobabilite",
    difficulty: 2,
    theme: "neutral",
    text: "Une situation est dite d’équiprobabilité quand…",
    format: "qcm",
    choices: [
      "toutes les issues ont la même probabilité",
      "il n’y a qu’une seule issue",
      "une issue est plus probable que les autres",
      "il n’y a aucune issue",
    ],
    expected: ["toutes les issues ont la même probabilité"],
    comparator: "mcq_exact",
    hint: "Aucune issue n’est favorisée.",
    explanation:
      "Définition : en équiprobabilité, toutes les issues ont la même chance.\n\n" +
      "Méthode : on vérifie qu’aucune issue n’est favorisée.\n\n" +
      "Calcul : par exemple, un dé équilibré.\n\n" +
      "Conclusion : toutes les issues ont la même probabilité.",
    tags: ["proba_experience", "equiprobabilite", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_proba_equiprobabilite_fixed_3_de_pipe",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_equiprobabilite",
    difficulty: 2,
    theme: "neutral",
    text: "Un dé truqué qui tombe plus souvent sur $6$ correspond-il à une situation d’équiprobabilité ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Une face est favorisée.",
    explanation:
      "Définition : l’équiprobabilité suppose qu’aucune issue n’est favorisée.\n\n" +
      "Méthode : on vérifie si une face revient plus souvent.\n\n" +
      "Calcul : ici le $6$ est favorisé.\n\n" +
      "Conclusion : non, ce n’est pas équiprobable.",
    tags: ["proba_experience", "equiprobabilite", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_proba_equiprobabilite_fixed_4_piece",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_equiprobabilite",
    difficulty: 2,
    theme: "neutral",
    text: "Avec une pièce équilibrée, pile et face sont-ils équiprobables ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Aucune face n’est favorisée.",
    explanation:
      "Définition : une pièce équilibrée ne favorise aucune face.\n\n" +
      "Méthode : on compare les chances de pile et de face.\n\n" +
      "Calcul : chacune a une probabilité de $\\dfrac{1}{2}$.\n\n" +
      "Conclusion : oui, pile et face sont équiprobables.",
    tags: ["proba_experience", "equiprobabilite", "piece", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_proba_equiprobabilite_fixed_5_consequence",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_equiprobabilite",
    difficulty: 3,
    theme: "neutral",
    text: "En situation d’équiprobabilité avec $5$ issues, quelle est la probabilité de chaque issue ?",
    format: "qcm",
    choices: ["$\\dfrac{1}{5}$", "$\\dfrac{1}{2}$", "$\\dfrac{5}{1}$", "$1$"],
    expected: ["$\\dfrac{1}{5}$"],
    comparator: "mcq_exact",
    hint: "Une issue sur $5$.",
    explanation:
      "Définition : en équiprobabilité, chaque issue a la même probabilité.\n\n" +
      "Méthode : on divise $1$ par le nombre d’issues.\n\n" +
      "Calcul : $\\dfrac{1}{5}$.\n\n" +
      "Conclusion : chaque issue a une probabilité de $\\dfrac{1}{5}$.",
    tags: ["proba_experience", "equiprobabilite", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_proba_calculer_fixed_2_certain",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_calculer",
    difficulty: 2,
    theme: "neutral",
    text: "On lance un dé. Quelle est la probabilité d’obtenir un nombre entre $1$ et $6$ ?",
    format: "qcm",
    choices: ["$1$", "$\\dfrac{1}{6}$", "$\\dfrac{6}{1}$", "$0$"],
    expected: ["$1$"],
    comparator: "mcq_exact",
    hint: "Toutes les faces conviennent : événement certain.",
    explanation:
      "Définition : un événement certain a une probabilité de $1$.\n\n" +
      "Méthode : on compte les issues favorables.\n\n" +
      "Calcul : $6$ favorables sur $6$ : $\\dfrac{6}{6} = 1$.\n\n" +
      "Conclusion : la probabilité est $1$.",
    canvas: deCanvas([1, 2, 3, 4, 5, 6]),
    tags: ["proba_experience", "calculer", "certain", "de", "canvas"],
  },
  {
    kind: "fixed",
    id: "3e_proba_calculer_fixed_3_impossible",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_calculer",
    difficulty: 3,
    theme: "neutral",
    text: "Un sac ne contient que des billes bleues. Quelle est la probabilité de tirer une bille rouge ?",
    format: "qcm",
    choices: ["$0$", "$1$", "$\\dfrac{1}{2}$", "on ne peut pas savoir"],
    expected: ["$0$"],
    comparator: "mcq_exact",
    hint: "Aucune bille rouge : événement impossible.",
    explanation:
      "Définition : un événement impossible a une probabilité de $0$.\n\n" +
      "Méthode : on compte les billes rouges.\n\n" +
      "Calcul : il y a $0$ bille rouge.\n\n" +
      "Conclusion : la probabilité est $0$.",
    tags: ["proba_experience", "calculer", "impossible", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_proba_defi_fixed_3_contraire",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 5,
    theme: "neutral",
    text: "La probabilité de gagner à un jeu est $0{,}3$. Quelle est la probabilité de perdre ?",
    format: "short",
    expected: ["0,7", "0.7"],
    comparator: "number_equal",
    hint: "$1 - P(\\text{gagner})$.",
    explanation:
      "Définition : « perdre » est l’événement contraire de « gagner ».\n\n" +
      "Méthode : on calcule $1 - 0{,}3$.\n\n" +
      "Calcul : $1 - 0{,}3 = 0{,}7$.\n\n" +
      "Conclusion : la probabilité de perdre est $0{,}7$.",
    tags: ["proba_experience", "defi", "contraire", "short"],
  },
  {
    kind: "fixed",
    id: "3e_proba_defi_fixed_4_brevet",
    niveau: "3e",
    matiere: "maths",
    notionId: "proba_experience",
    microId: "proba_defi",
    difficulty: 5,
    theme: "neutral",
    text: "On tire une carte parmi $10$ cartes numérotées de $1$ à $10$. Quelle est la probabilité d’obtenir un nombre pair ?",
    format: "qcm",
    choices: ["$\\dfrac{5}{10}$", "$\\dfrac{1}{10}$", "$\\dfrac{2}{10}$", "$\\dfrac{10}{5}$"],
    expected: ["$\\dfrac{5}{10}$"],
    comparator: "mcq_exact",
    hint: "Les pairs de $1$ à $10$ : $2,4,6,8,10$.",
    explanation:
      "Définition : probabilité $= \\dfrac{\\text{favorables}}{\\text{total}}$.\n\n" +
      "Méthode : on compte les nombres pairs de $1$ à $10$.\n\n" +
      "Calcul : $2,4,6,8,10$ soit $5$ sur $10$ : $\\dfrac{5}{10}$.\n\n" +
      "Conclusion : la probabilité est $\\dfrac{5}{10}$.",
    tags: ["proba_experience", "defi", "brevet", "qcm"],
  },
];

export const probabilitesBank: TutorBankItemV4[] = [...FIXES, ...GABARITS];
